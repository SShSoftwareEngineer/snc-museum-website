/* Підключення спільних частин сторінки (шапка, підвал, кнопка дзвінка).
   Місце вставки: <div data-include="partials/header.html">запасний вміст</div>.
   Запасний вміст лишається, якщо файл не вдалося завантажити.
   Решта скриптів чекає на window.scmReady, щоб працювати вже з готовою розміткою. */
(function () {
  var slots = Array.prototype.slice.call(document.querySelectorAll('[data-include]'));

  function load(slot) {
    return fetch(slot.getAttribute('data-include'))
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        return res.text();
      })
      .then(function (html) {
        slot.replaceWith(document.createRange().createContextualFragment(html));
      })
      .catch(function (err) {
        console.warn('Не вдалося підключити ' + slot.getAttribute('data-include') + ':', err);
      });
  }

  // Позначає пункт меню поточної сторінки
  function markCurrent() {
    var file = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__list a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href.indexOf('#') === -1 && href === file) a.setAttribute('aria-current', 'page');
    });
  }

  window.scmReady = Promise.all(slots.map(load)).then(markCurrent);
})();
