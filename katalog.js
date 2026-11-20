/* Каталог експонатів: фільтри за типом і десятиліттям, пошук за назвою, лічильник.
   Текст із даних вставляється через textContent. */
(function () {
  var items = [];
  var typeSel = document.getElementById('f-type');
  var decadeSel = document.getElementById('f-decade');
  var searchInp = document.getElementById('f-search');
  var list = document.getElementById('catalog');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var reset = document.getElementById('reset');

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function render() {
    var type = typeSel.value;
    var decade = decadeSel.value;
    var q = searchInp.value.trim().toLowerCase();
    var found = items.filter(function (it) {
      return (!type || it.type === type) &&
             (!decade || it.decade === decade) &&
             (!q || it.name.toLowerCase().indexOf(q) !== -1);
    });

    list.textContent = '';
    found.forEach(function (it) {
      var li = el('li');
      var card = el('article', 'card');
      card.appendChild(el('h2', '', it.name));
      card.appendChild(el('p', 'info', 'Виробник: ' + it.maker));
      card.appendChild(el('p', 'info', 'Рік: ' + it.year));
      card.appendChild(el('p', 'info', 'Тип: ' + it.type));
      card.appendChild(el('p', 'card__text', it.description));
      li.appendChild(card);
      list.appendChild(li);
    });
    count.textContent = 'Знайдено експонатів: ' + found.length;
    empty.hidden = found.length !== 0;
  }

  function resetAll() {
    typeSel.value = '';
    decadeSel.value = '';
    searchInp.value = '';
    render();
    searchInp.focus();
  }

  typeSel.addEventListener('change', render);
  decadeSel.addEventListener('change', render);
  searchInp.addEventListener('input', render);
  reset.addEventListener('click', resetAll);

  fetch('data/eksponaty.json')
    .then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(function (data) {
      items = data;
      var types = [];
      items.forEach(function (it) {
        if (types.indexOf(it.type) === -1) types.push(it.type);
      });
      types.sort(function (a, b) { return a.localeCompare(b, 'uk'); });
      types.forEach(function (t) {
        var o = el('option', '', t);
        o.value = t;
        typeSel.appendChild(o);
      });
      render();
    })
    .catch(function (err) {
      console.warn('Не вдалося завантажити data/eksponaty.json:', err);
    });
})();
