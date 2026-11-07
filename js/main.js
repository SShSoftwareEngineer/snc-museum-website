// Чекаємо на підключені частини сторінки (шапка з меню), див. include.js
(window.scmReady || Promise.resolve()).then(function () {
  // Мобільне меню
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Друк заголовка першого екрана: один раз, без руху при prefers-reduced-motion
  var title = document.getElementById('hero-title');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (title && !reduce) {
    var text = title.textContent;
    title.setAttribute('aria-label', text);
    title.textContent = '';
    title.classList.add('typing');
    title.dataset.typed = '1';
    var i = 0;
    text.split(' ').forEach(function (word, w) {
      if (w > 0) title.appendChild(document.createTextNode(' '));
      var group = document.createElement('span');
      group.className = 'word';
      group.setAttribute('aria-hidden', 'true');
      Array.from(word).forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'ch';
        s.style.setProperty('--i', i++);
        s.textContent = ch;
        group.appendChild(s);
      });
      i++; // пауза на пробіл
      title.appendChild(group);
    });
  }
});
