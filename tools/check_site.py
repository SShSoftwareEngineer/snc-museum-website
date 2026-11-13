#!/usr/bin/env python3
"""Перевірка сайту: биті внутрішні посилання, відсутні зображення, стилі, скрипти й шрифти.

Запуск з кореня проєкту: python tools/check_site.py
Код виходу 0: помилок немає; 1: є помилки (перелік друкується).
Лише стандартна бібліотека Python, до мережі скрипт не звертається.
"""
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")  # щоб українські повідомлення читались і на Windows
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
# Що перевіряємо: HTML у корені й у partials/, CSS у css/. Папки prototype/ і tools/ не частина сайту.
HTML_FILES = sorted(ROOT.glob("*.html")) + sorted((ROOT / "partials").glob("*.html"))
CSS_FILES = sorted((ROOT / "css").glob("*.css"))
EXTERNAL = ("http:", "https:", "mailto:", "tel:", "data:", "javascript:", "//")


class Collector(HTMLParser):
    """Збирає всі посилання на файли та всі id зі сторінки."""

    def __init__(self):
        super().__init__()
        self.refs = []   # (атрибут, значення, рядок)
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        line = self.getpos()[0]
        if a.get("id"):
            self.ids.add(a["id"])
        if a.get("name"):
            self.ids.add(a["name"])
        for key in ("href", "src", "poster", "data-include"):
            if a.get(key):
                self.refs.append((key, a[key], line))
        if a.get("srcset"):
            for part in a["srcset"].split(","):
                if part.strip():
                    self.refs.append(("srcset", part.strip().split()[0], line))


def parse(path):
    c = Collector()
    c.feed(path.read_text(encoding="utf-8"))
    return c


def rel(path):
    return path.relative_to(ROOT).as_posix()


pages = {p: parse(p) for p in HTML_FILES}
errors = []

# Частини з partials/ підключаються в сторінки з кореня, тому їхні шляхи рахуємо від кореня сайту.
for path, info in pages.items():
    base = ROOT if path.parent.name == "partials" else path.parent
    for attr, value, line in info.refs:
        value = value.strip()
        if not value or value.startswith(EXTERNAL):
            continue
        parts = urlsplit(value)
        target_path = unquote(parts.path)
        if not target_path and (not parts.fragment or path.parent.name == "partials"):
            continue  # порожнє посилання, або якір (#main) у частині сторінки: він стосується сторінки, куди її вставлено
        target = path if not target_path else (base / target_path)
        if not target.exists():
            errors.append(f"{rel(path)}:{line}: файл не знайдено: {value}  ({attr})")
            continue
        # Перевірка якоря (#id) у цільовій сторінці
        if parts.fragment and target.suffix == ".html":
            ids = pages[target].ids if target in pages else parse(target).ids
            if parts.fragment not in ids:
                errors.append(f"{rel(path)}:{line}: на сторінці {rel(target)} немає якоря #{parts.fragment}")

# CSS: url(...) у стилях і шрифтах
for path in CSS_FILES:
    text = path.read_text(encoding="utf-8")
    for m in re.finditer(r"url\(\s*['\"]?([^'\")]+?)['\"]?\s*\)", text):
        value = m.group(1).strip()
        if value.startswith(EXTERNAL):
            continue
        target = path.parent / unquote(urlsplit(value).path)
        if not target.exists():
            line = text.count("\n", 0, m.start()) + 1
            errors.append(f"{rel(path)}:{line}: файл не знайдено: {value}  (url у CSS)")

if errors:
    print(f"Знайдено помилок: {len(errors)}")
    for e in errors:
        print("  -", e)
        if os.environ.get("GITHUB_ACTIONS"):
            # Рядок-анотація: GitHub підсвітить помилку в журналі запуску й на сторінці PR
            file, line, msg = e.split(":", 2)
            print(f"::error file={file.strip()},line={line.strip()}::{msg.strip()}")
    sys.exit(1)

print(f"Перевірено: HTML {len(HTML_FILES)}, CSS {len(CSS_FILES)}. Помилок немає.")
