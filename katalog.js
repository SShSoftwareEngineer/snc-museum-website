(() => {
  'use strict';

  const state = { exhibits: [], type: '', decade: '', query: '' };
  const typeFilter = document.querySelector('#type-filter');
  const decadeFilter = document.querySelector('#decade-filter');
  const nameSearch = document.querySelector('#name-search');
  const resultsCount = document.querySelector('#results-count');
  const exhibitsList = document.querySelector('#exhibits-list');
  const emptyState = document.querySelector('#empty-state');
  const resetButton = document.querySelector('#reset-filters');

  const createText = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  };

  const renderTypes = () => {
    [...new Set(state.exhibits.map((exhibit) => exhibit.type))]
      .sort((a, b) => a.localeCompare(b, 'uk'))
      .forEach((type) => typeFilter.append(createText('option', '', type)));
  };

  const matches = (exhibit) => {
    const query = state.query.trim().toLocaleLowerCase('uk');
    return (!state.type || exhibit.type === state.type)
      && (!state.decade || exhibit.decade === state.decade)
      && (!query || exhibit.name.toLocaleLowerCase('uk').includes(query));
  };

  const render = () => {
    const visible = state.exhibits.filter(matches);
    resultsCount.textContent = `Знайдено експонатів: ${visible.length}`;
    exhibitsList.replaceChildren();
    emptyState.hidden = visible.length !== 0;

    visible.forEach((exhibit) => {
      const card = document.createElement('article');
      card.className = 'card exhibit-card';
      const title = createText('h2', '', exhibit.name);
      const meta = createText('p', 'meta exhibit-card__meta', `${exhibit.maker} · ${exhibit.year} · ${exhibit.type}`);
      const decade = createText('p', 'tag', exhibit.decade);
      const description = createText('p', 'exhibit-card__description', exhibit.description);
      card.append(title, meta, decade, description);
      exhibitsList.append(card);
    });
  };

  const update = () => {
    state.type = typeFilter.value;
    state.decade = decadeFilter.value;
    state.query = nameSearch.value;
    render();
  };

  const reset = () => {
    typeFilter.value = '';
    decadeFilter.value = '';
    nameSearch.value = '';
    update();
    typeFilter.focus();
  };

  typeFilter.addEventListener('change', update);
  decadeFilter.addEventListener('change', update);
  nameSearch.addEventListener('input', update);
  resetButton.addEventListener('click', reset);

  fetch('data/eksponaty.json')
    .then((response) => {
      if (!response.ok) throw new Error(`Не вдалося завантажити дані: ${response.status}`);
      return response.json();
    })
    .then((exhibits) => {
      state.exhibits = exhibits;
      renderTypes();
      render();
    })
    .catch(() => {
      resultsCount.textContent = 'Знайдено експонатів: 0';
      emptyState.hidden = false;
      exhibitsList.replaceChildren();
    });
})();
