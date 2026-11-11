#!/usr/bin/env python3
"""Створює HTML-сторінки статей із Markdown-файлів папки articles/ і сторінку articles.html.

Запуск з кореня проєкту:  python tools/build_articles.py
Файл test.md пропускається. Статті сортуються за номером на початку назви (01-..., 02-...).
Сторінка кожної статті лежить у корені як article-<назва файлу>.html: так працюють
відносні шляхи до css/js/partials, як на решті сторінок сайту.
Підтримується обмежений Markdown: # заголовок, ## розділи, абзаци, списки з «- »,
[текст](url), **жирний**. Розділ «Джерела»: рядок «Назва: https://...» стає посиланням.
"""
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "articles"
SKIP = {"test.md"}

HEAD = """<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title{title_attr}>{title}</title>
  <meta name="description" content="{desc}"{desc_attr}>
  <script>document.documentElement.classList.add('js');</script>
  <link rel="preload" href="assets/fonts/nunito-cyrillic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/unbounded-cyrillic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="css/fonts.css">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <div data-include="partials/header.html"><a href="index.html">Software and Computer Museum</a> · <a href="tel:+380675394095">067 539 4095</a></div>

  <main id="main">
{main}
  </main>

  <div data-include="partials/footer.html"><a href="mailto:contact@sncmuseum.org">contact@sncmuseum.org</a> · <a href="tel:+380675394095">067 539 4095</a></div>
  <div data-include="partials/call-button.html"></div>

  <script src="js/include.js"></script>
  <script src="js/i18n.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
"""

NEWTAB = '<span class="visually-hidden" data-i18n="newtab"> (відкриється в новій вкладці)</span>'


def link(url, label):
    external = url.startswith("http")
    attrs = ' target="_blank" rel="noopener"' if external else ""
    tail = NEWTAB if external else ""
    return f'<a href="{html.escape(url, quote=True)}"{attrs}>{label}{tail}</a>'


def inline(text):
    """Екранує HTML і застосовує посилання та жирний шрифт."""
    out = html.escape(text, quote=False)
    out = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+|[^)\s]+)\)",
                 lambda m: link(html.unescape(m.group(2)), m.group(1)), out)
    out = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", out)
    # Голі адреси, що лишилися поза тегами
    out = re.sub(r'(?<![">])(https?://[^\s<]+)',
                 lambda m: link(html.unescape(m.group(1)), m.group(1)), out)
    return out


def source_item(text):
    """«Назва: https://...» → посилання з назвою як текстом."""
    m = re.match(r"^(.*?):\s*(https?://\S+)$", text)
    if m:
        return link(html.unescape(m.group(2)), html.escape(m.group(1), quote=False))
    return inline(text)


def parse(md):
    """Повертає (заголовок, перший абзац, html тіла)."""
    title, first, body = "", "", []
    para, items, in_sources = [], [], False

    def flush_para():
        nonlocal first
        if para:
            text = " ".join(para)
            if not first:
                first = text
            body.append(f"<p>{inline(text)}</p>")
            para.clear()

    def flush_list():
        if items:
            fmt = source_item if in_sources else inline
            body.append("<ul>\n" + "\n".join(f"  <li>{fmt(i)}</li>" for i in items) + "\n</ul>")
            items.clear()

    for raw in md.splitlines():
        line = raw.rstrip()
        if line.startswith("# ") and not title:
            flush_para(); flush_list()
            title = line[2:].strip()
        elif line.startswith("## "):
            flush_para(); flush_list()
            name = line[3:].strip()
            in_sources = name.lower() == "джерела"
            body.append(f"<h2>{inline(name)}</h2>")
        elif line.startswith("- "):
            flush_para()
            items.append(line[2:].strip())
        elif not line.strip():
            flush_para(); flush_list()
        else:
            flush_list()
            para.append(line.strip())
    flush_para(); flush_list()
    return title, first, "\n".join(body)


def shorten(text, limit=170):
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text).replace("**", "")
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0].rstrip(",;:—-")
    return cut + "…"


def indent(text, n):
    pad = " " * n
    return "\n".join(pad + l if l else l for l in text.splitlines())


def build():
    files = sorted(p for p in SRC.glob("*.md") if p.name not in SKIP)
    if not files:
        sys.exit("У папці articles немає статей (*.md).")
    cards = []
    for path in files:
        title, first, body = parse(path.read_text(encoding="utf-8"))
        num = re.match(r"(\d+)", path.stem)
        number = num.group(1) if num else ""
        page = f"article-{path.stem}.html"
        excerpt = shorten(first)

        main = f"""    <article class="section" aria-labelledby="article-title">
      <div class="container container--narrow">
        <p class="eyebrow"><span data-i18n="articles.eyebrow">Стаття</span> {number}</p>
        <h1 class="page-title" id="article-title" lang="uk">{html.escape(title, quote=False)}</h1>
        <div class="prose" lang="uk">
{indent(body, 10)}
        </div>
        <div class="section-actions">
          <a class="btn btn--blue" href="articles.html" data-i18n="articles.back">← Усі статті</a>
        </div>
      </div>
    </article>"""
        (ROOT / page).write_text(
            HEAD.format(title=html.escape(title, quote=False) + ": Software and Computer Museum",
                        title_attr="", desc=html.escape(excerpt, quote=True), desc_attr="", main=main),
            encoding="utf-8", newline="\n")
        cards.append(f"""          <a class="card card--link" href="{page}">
            <span class="tag"><span data-i18n="articles.eyebrow">Стаття</span> {number}</span>
            <h2 class="card__title" lang="uk">{html.escape(title, quote=False)}</h2>
            <p class="card__text" lang="uk">{html.escape(excerpt, quote=False)}</p>
            <span class="meta" data-i18n="articles.read">Читати →</span>
          </a>""")
        print("створено", page)

    main = """    <section class="section" aria-labelledby="articles-title">
      <div class="container">
        <p class="eyebrow" data-i18n="nav.articles">Статті</p>
        <h1 class="page-title" id="articles-title" data-i18n="articles.title">Статті</h1>
        <p class="muted lead-text" data-i18n="articles.intro">Матеріали про історію комп'ютерів для відвідувачів музею. Статті написані українською.</p>
        <div class="grid-3">
""" + "\n".join(cards) + """
        </div>
      </div>
    </section>"""
    (ROOT / "articles.html").write_text(
        HEAD.format(title="Статті: Software and Computer Museum", title_attr=' data-i18n="articles.page.title"',
                    desc="Матеріали про історію комп'ютерів для відвідувачів Software and Computer Museum. Статті написані українською.",
                    desc_attr=' data-i18n-content="articles.page.desc"', main=main),
        encoding="utf-8", newline="\n")
    print("створено articles.html")


if __name__ == "__main__":
    build()
