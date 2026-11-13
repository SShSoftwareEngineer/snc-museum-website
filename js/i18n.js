/* Перемикач UA / EN. Українські тексти лежать у розмітці, англійські тут.
   Атрибути: data-i18n (текст), data-i18n-alt, data-i18n-aria, data-i18n-content. */
// Працює після підключення спільних частин сторінки (див. include.js)
(window.scmReady || Promise.resolve()).then(function () {
  var EN = {
    'meta.title': 'Software and Computer Museum: courses, tours and exhibits in Kharkiv',
    'meta.description': 'Software and Computer Museum in Kharkiv: free courses, a guided overview tour and exhibits. Book by phone: 067 539 4095.',
    'skip': 'Skip to content',
    'logo.aria': 'Software and Computer Museum: home',
    'nav.aria': 'Sections',
    'nav.home': 'Home', 'nav.courses': 'Courses', 'nav.excursion': 'Excursion', 'nav.exhibits': 'Exhibits',
    'nav.about': 'About', 'nav.news': 'News', 'nav.articles': 'Articles', 'nav.contacts': 'Contacts',
    'menu.aria': 'Menu',
    'call.aria': 'Call: 067 539 4095',
    'newtab': ' (opens in a new tab)',

    'hero.alt': 'Museum hall with display cases and a timeline',
    'hero.title': 'Touch the history of computers',
    'hero.courses': 'Courses', 'hero.courses.meta': 'Free',
    'hero.excursion': 'Excursion', 'hero.excursion.meta': '30 minutes, free',

    'announce.aria': 'Announcement',
    'announce.badge': 'New',
    'announce.text': 'New section: Articles',

    'courses.eyebrow': '01 · Courses',
    'courses.title': 'Three free courses',
    'courses.intro': 'Each course has 90-minute sessions. Sign up by phone: 067 539 4095.',
    'courses.btn': 'Sign up for a course',
    'courses.all': 'All courses and terms',
    'courses.page.title': 'Courses: Software and Computer Museum',
    'courses.page.desc': 'Free courses at Software and Computer Museum in Kharkiv: AI for adults and teenagers, Roblox Studio for children. Book by phone: 067 539 4095.',
    'cp.f1': 'Sessions: 90 minutes', 'cp.f2': 'Price: Free', 'cp.f3': 'Booking: by phone 067 539 4095',
    'c1.tag': 'Adults 30+ · in person and online',
    'c1.title': 'All AI capabilities for work: real tasks and their solutions',
    'c1.text': 'Focused on working with Claude. Minimal prior AI knowledge needed. Lasts about 2–3 months.',
    'c2.tag': 'Teens 14–19 · online',
    'c2.title': 'All AI capabilities for work: real tasks and their solutions',
    'c2.text': 'The same course for teenagers. Online, lasts 2 months.',
    'c3.tag': 'Children 10–12 · online',
    'c3.title': 'Programming in Roblox Studio',
    'c3.text': 'Children create their own games. No prior preparation needed. Lasts six months.',

    'exc.eyebrow': '02 · Excursion',
    'exc.title': 'Guided overview tour',
    'exc.text': 'Visitors view the exhibits. For everyone, 30 minutes, free. Groups up to 10 people. Date and time are agreed when booking.',
    'exc.phone': 'Book by phone: 067 539 4095.',
    'exc.btn': 'Book an excursion',
    'exc.f1': 'Duration: 30 minutes', 'exc.f2': 'Price: Free', 'exc.f3': 'Group: Up to 10 people',

    'ex.eyebrow': '03 · Exhibits',
    'ex.title': 'Museum exhibits',
    'ex.intro': "Six exhibits from the website's home page. The collection holds over 100 exhibits.",
    'ex.btn': 'Open all exhibits on sncmuseum.org',
    'e1.alt': 'Apple MessagePad device on display in the museum',
    'e1.meta': 'Apple · 1993',
    'e1.text': 'Personal digital assistant running Newton OS with a touch screen, long before the word "tablet" appeared.',
    'e2.alt': 'Magnavox Odyssey game console on display in the museum',
    'e2.meta': 'Magnavox · 1972',
    'e2.text': 'The first console that could be connected to a TV.',
    'e3.alt': 'Apple II GS computer on display in the museum',
    'e3.meta': 'Apple · 1986',
    'e3.text': "A model from the Apple II line, the company's first mass-produced computer.",
    'e4.alt': 'Apple QuickTake 100 digital camera on display in the museum',
    'e4.meta': 'Apple with Kodak · 1994',
    'e4.text': 'One of the first digital cameras.',
    'e5.alt': 'Commodore Amiga 600 computer on display in the museum',
    'e5.meta': 'Commodore · 1992',
    'e5.text': 'A full computer built into a keyboard case.',
    'e6.alt': 'Nintendo Famicom game console on display in the museum',
    'e6.meta': 'Nintendo · 1983',
    'e6.text': 'The original console whose clone, Dendy, was known in Ukraine.',

    'h.alt': 'Photo from the museum exhibition',
    'h.eyebrow': '04 · About',
    'h.title': 'Brief history',
    'h.p1': 'Software and Computer Museum was founded in Kharkiv in August 2017 by Anton Trubnikov, Serhiy Tsymbal and Oleksandr Kovalenko.',
    'h.p2': 'The founders are convinced that software drove the development of technology, and they personally collected and restored rare computers, game consoles and even robots. Devices from different eras stand side by side, so you can see how technology changed from the first models to modern ones. Today the collection holds over 100 exhibits.',

    'n.eyebrow': '05 · News',
    'n.title': 'News and announcements',
    'n1.title': 'The museum invites teenagers aged 14–19 to a free online AI course',
    'n2.title': 'The advanced course "All AI capabilities for work: real tasks and their solutions" started on September 29',
    'n3.title': 'Ninth-graders from IT Step Academy visited the museum',

    'ct.eyebrow': '06 · Address and phone',
    'ct.title': 'How to find us',
    'ct.address': '79/1 Hryhorii Skovorody Street, Kharkiv, Kharkiv Oblast, 61000',
    'ct.metro': 'Metro: Yaroslava Mudroho',
    'ct.hours': 'Tuesday–Saturday, 10:00–18:00',
    'ct.phone': 'Phone: ',
    'ct.map': 'Map',
    'ct.map.addr': '79/1 Hryhorii Skovorody Street, Kharkiv. Metro: Yaroslava Mudroho.',
    'ct.map.link': 'Open in Maps',
    'contacts.page.title': 'Contacts: Software and Computer Museum',
    'contacts.page.desc': 'Address, metro, opening hours, phone and email of Software and Computer Museum in Kharkiv.',
    'ct.map.title':'OpenStreetMap: 79/1 Hryhorii Skovorody Street, Kharkiv',

    'exhibits.page.title': 'Exhibits: Software and Computer Museum',
    'exhibits.page.desc': 'Exhibits of Software and Computer Museum in Kharkiv: MessagePad, Magnavox Odyssey, Apple II GS, QuickTake 100, Amiga 600 and Nintendo Famicom.',
    'exhibits.intro': 'Six exhibits from our collection. The collection holds over 100 exhibits.',

    'articles.page.title': 'Articles: Software and Computer Museum',
    'articles.page.desc': 'Articles about the history of computers for visitors of Software and Computer Museum. The articles are in Ukrainian.',
    'articles.title': 'Articles',
    'articles.intro': 'Articles about the history of computers for museum visitors. The articles are written in Ukrainian.',
    'articles.eyebrow': 'Article',
    'articles.read': 'Read →',
    'articles.back': '← All articles',

    'f.logo': 'Software and Computer Museum logo',
    'f.mail': 'Email:',
    'f.social': 'Social media:',
    'f.about': 'About the museum', 'f.exhibits': 'Exhibits on sncmuseum.org', 'f.edu': 'Education',
    'f.blog': 'Museum blog', 'f.support': 'Support the museum', 'f.charity': 'Charitable services agreement',
    'f.privacy': 'Privacy policy', 'f.terms': 'Terms of use'
  };

  var STORE = 'scm-lang';
  var attrs = [
    ['data-i18n-alt', 'alt'],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-title', 'title'],
    ['data-i18n-content', 'content']
  ];

  // Запам'ятовуємо українські тексти з розмітки як словник UK
  var UK = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    UK[el.getAttribute('data-i18n')] = el.textContent;
  });
  attrs.forEach(function (pair) {
    document.querySelectorAll('[' + pair[0] + ']').forEach(function (el) {
      UK[el.getAttribute(pair[0])] = el.getAttribute(pair[1]);
    });
  });

  function apply(lang) {
    var dict = lang === 'en' ? EN : UK;
    document.documentElement.lang = lang === 'en' ? 'en' : 'uk';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key === 'hero.title' && el.dataset.typed === '1') {
        el.setAttribute('aria-label', dict[key]);
        el.textContent = dict[key];
        el.classList.remove('typing');
        return;
      }
      if (dict[key] != null) el.textContent = dict[key];
    });
    attrs.forEach(function (pair) {
      document.querySelectorAll('[' + pair[0] + ']').forEach(function (el) {
        var v = dict[el.getAttribute(pair[0])];
        if (v != null) el.setAttribute(pair[1], v);
      });
    });
    var btn = document.getElementById('lang-switch');
    if (btn) {
      // Кнопка пропонує протилежну мову
      btn.textContent = lang === 'en' ? 'Українська' : 'English';
      btn.lang = lang === 'en' ? 'uk' : 'en';
      btn.setAttribute('aria-label', lang === 'en' ? 'Переключити на українську' : 'Switch to English');
    }
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  window.scmLang = { apply: apply };

  var saved = null;
  try { saved = localStorage.getItem(STORE); } catch (e) {}
  if (saved === 'en') apply('en');

  var btn = document.getElementById('lang-switch');
  if (btn) {
    btn.addEventListener('click', function () {
      apply(document.documentElement.lang === 'en' ? 'uk' : 'en');
    });
  }
});
