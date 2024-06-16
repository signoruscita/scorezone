!(async function () {
  const converter = new showdown.Converter();
  const rawData = await data_download();
  const {scoresList, filters} = data_setup(rawData);

  const CONST = {
    els: {
      search: function() { return document.getElementById('search')},
    },
    css: {
      hidden: 'hidden',
    },
    attrs: {
      dataFilter: 'data-filter',
      filterText: 'data-filter-text',
      filterDate: 'data-filter-date',
    }
  };

  window.scorezone = CONST;

  initNav(scoresList, document.querySelector('nav'));
  initFilters(filters, document.querySelector('#filters'));
  initIndice(scoresList, document.querySelector('main'));



  Utils_syncFilter();

  function data_download() {
    var gsheetData = window.gsheetData || {};
    var documentId = gsheetData.documentId || '';
    var sheetName = gsheetData.sheetName || '';
    var cache = gsheetData.cache || true;

    var doc = gsheetjs.downloadSheet({
      documentId: documentId,
      sheetName: sheetName,
      cache: cache,
    });

    return doc;
  }

  function data_setup(rawScoresList) {
    const filters = {
      date: {},
    }
    const scoresList = rawScoresList.sort((a, b) => {
      let y = 'unknown';
      try {
        const dateA = new Date(a.data)
        y = dateA.getFullYear();
      } catch(e) {
        // ok
      }
      filters.date[y] = filters.date[y] || [];
      filters.date[y].push(a);
      if (a.id >= b.id) return -1;
      return 1;
    })
    return {scoresList, filters};
  }

  function initNav(scoresList, parentEl) {
    const outHtml = scoresList.reduce((acc, scoreItem) => {
      acc.push(HtmlTemplate_NavItem(scoreItem))
      return acc;
    }, []).join('\n');
    parentEl.innerHTML = outHtml;
  }

  function initIndice(scoresList, parentEl) {
    const listHtml = scoresList.map(HtmlTemplate_Sfida).join('\n');
    const outHtml = `<h2>Risultati</h2> ${listHtml}`;
    parentEl.innerHTML = outHtml;
  }

  function initFilters(filters, parentEl) {
    parentEl.innerHTML = `${HtmlTemplate_Filters(filters)}`;
  };

  function Utils_dateFormater(date) {
    if (!date) { return '' }
    try {
      const event = new Date(date);
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      return event.toLocaleDateString(undefined, options);
    } catch (e) {
      return date;
    }
  }

  function HtmlTemplate_NavItem(scoreItem) {
    return `
      <a class="nes-btn is-primary" href="#sfida-${scoreItem.id}" ${CONST.attrs.dataFilter}="${new Date(scoreItem.data).getFullYear()}">
        <small>${scoreItem.titolo}</small>
      </a>
    `;
  }

  function HtmlTemplate_Sfida(scoreItem) {
    return `
      <section class="scheda nes-container with-title is-dark" ${CONST.attrs.dataFilter}="${new Date(scoreItem.data).getFullYear()}">
        <header>
          <h3 class="title" id="sfida-${scoreItem.id}">#${scoreItem['sfida n.']} ${scoreItem.titolo}</h3>
        </header>

        <div>
          <img class="img-title"
            src="assets/webp/${scoreItem.id}-title.webp" onerror="this.style.display='none'" loading="lazy" alt= " " />
        </div>

        <div>
          <dl>
            <dt>sfida numero</dt>
              <dd>${scoreItem['sfida n.']}</dd>
            <dt>giocato</dt>
              <dd>${Utils_dateFormater(scoreItem.data)}</dd>
            <dt>romset</dt>
              <dd>${scoreItem.romset ? converter.makeHtml(scoreItem.romset) : 'sconosciuto'}</dd>
            <dt>regole</dt>
              <dd>${converter.makeHtml(scoreItem.regole || 'tutto consentito')}</dd>
            <dt>Vincitore</dt>
              <dd>${scoreItem.pos_01_name}</dd>
          </div>
        </div>
        <div>
          ${HtmlTemplate_Sfida_Classifica(scoreItem)}
        </div>

        <footer>
          <p>
            <img class="img-additional"
                src="assets/webp/${scoreItem.id}-cover.webp" onerror="this.style.display='none'" loading="lazy" alt= " " />
              <img class="img-additional"
                src="assets/webp/${scoreItem.id}-screen.webp" onerror="this.style.display='none'" loading="lazy" alt= " " />
          </p>
        </footer>
      </section>
    `
  }

  function HtmlTemplate_Sfida_Classifica(scoreItem) {
    const positions = buildPositions(scoreItem);
    return `<div class="nes-table-responsive">
      <table class="nes-table is-bordered is-dark">
        <tbody>
          ${ positions.map((s) => HtmlTemplate_Sfida_Classifica_Giocatore(s)).join('\n')}
        </tbody>
      </table>
    </div>`

    function buildPositions(scoreItem) {
      return [
        ['pos_01_name', 'pos_01_pts'],
        ['pos_02_name', 'pos_02_pts'],
        ['pos_03_name', 'pos_03_pts'],
        ['pos_04_name', 'pos_04_pts'],
        ['pos_05_name', 'pos_05_pts'],
        ['pos_06_name', 'pos_06_pts'],
        ['pos_07_name', 'pos_07_pts'],
        ['pos_08_name', 'pos_08_pts'],
        ['pos_09_name', 'pos_09_pts'],
        ['pos_10_name', 'pos_10_pts'],
        ['pos_11_name', 'pos_11_pts'],
        ['pos_12_name', 'pos_12_pts'],
        ['pos_13_name', 'pos_13_pts'],
        ['pos_14_name', 'pos_14_pts'],
        ['pos_15_name', 'pos_15_pts'],
      ].map((keysNameRef, index) => {
        const name = scoreItem[keysNameRef[0]];
        const pts = scoreItem[keysNameRef[1]];
        if (!!name && !!pts) {
          return { name, pts, pos: index + 1 };
        }
        return null;
      }).filter((item) => !!item);
    }
  }

  function HtmlTemplate_Sfida_Classifica_Giocatore(player) {
    return `
      <tr>
        <td class="text-right">${player.pos}</td>
        <td  class="text-right">${player.pts}</td>
        <td>${player.name}</td>
        <td class="nowrap">
          ${player.pos === 1 ? '<i class="nes-icon star"></i>&nbsp;<i class="nes-icon star"></i>&nbsp;<i class="nes-icon star"></i>' : ''}
          ${player.pos === 2 ? '<i class="nes-icon star"></i>&nbsp;<i class="nes-icon star"></i>' : ''}
          ${player.pos === 3 ? '<i class="nes-icon star"></i>' : ''}
        </td>
      </tr>
    `;
  }

  function HtmlTemplate_Filters(filters) {
    const dateKeys = Object.keys(filters.date);
    dateKeys.sort().reverse();

    return `
      <h3>Ricerca</h3>
      <p>
        <input type="search" id="search" placeholder="Ricerca ovunque..." onchange="onSearchFilter(this, event);">
        <button onclick="onSearchFilter(document.getElementById('search'), event);">Cerca</button>
      </p>

      <h3>Filtra per anno</h3>
      <ul>
        ${dateKeys.map((key, index) => {
          const year = key;
          const scores = filters.date[key].length;
          const filterValue = `[${CONST.attrs.dataFilter}="${year}"]`;
          return `
            <li>
              <label>
                <input
                  ${index == 0 ? 'checked' : ''}
                  onChange="onchangeFilterDate(this, event);"
                  type="checkbox"
                  name="filter-date" value="${encodeURIComponent(filterValue)}" ${index == 0 ? 'checked' : ''}
                  />
                ${year} (${scores})
              </label>
            </li>
          `
        }).join('\n')}
    `
  }

})();


function Utils_syncFilter() {
  window.scorezone.els.search().value = '';
  const els = document.querySelectorAll('input[name="filter-date"]');
  els.forEach(el => onchangeFilterDate(el, null));
  onSearchFilter(window.scorezone.els.search(), null);
}

function onSearchFilter(el, evt) {
  evt ? evt.preventDefault() : null;
  const filterValue = `${el.value}`.trim();
  const elements = document.querySelectorAll(`[${window.scorezone.attrs.dataFilter}]`);
  elements.forEach(el => {
    const text = el.innerText;
    const show = filterValue.length == 0 || (text.toLowerCase().includes(filterValue.toLowerCase()))
    el.setAttribute(window.scorezone.attrs.filterText, (show ? 'true' : 'false'));
  });
}

function onchangeFilterDate(el, evt) {
  // window.scorezone.els.search().value = '';
  evt ? evt.preventDefault() : null;
  const filterValue = decodeURIComponent(el.value);
  const show = el.checked;
  const elements = document.querySelectorAll(`${filterValue}`);
  elements.forEach(el => { el.setAttribute(window.scorezone.attrs.filterDate, (show ? 'true' : 'false'))});
}
