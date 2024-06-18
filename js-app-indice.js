!(async function () {
  const converter = new showdown.Converter();
  const rawData = await data_download();
  const {scoresList, filters} = data_setup(rawData);

  const CONST = {
    els: {
      search: function() { return document.getElementById('search')},
      anniInput: function() { return document.querySelectorAll('#filtro-anno input[name="filter-date"]')},
    },
    css: {
      hidden: 'hidden',
    },
    attrs: {
      dataFilter: 'data-filter',
      filterText: 'data-filter-text',
      filterDate: 'data-filter-date',
      sfidaId: 'sfida-{id}',
    }
  };

  window.scorezone = CONST;

  initNav(scoresList, document.querySelector('nav'));
  initFilters(filters, document.querySelector('#filters'));
  initIndice(scoresList, document.querySelector('main'));
  Utils_syncFilter();
  Utils_goToSfida(window.location.hash.substring(1));

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
      date: {
        '*': [...rawScoresList],
      },
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
    const outHtml = `
      <div class="nes-container with-title mt2">
        <h2 class="title">
          <i class="nes-icon coin"></i>
          Risultati
        </h2>
        ${listHtml}
      </div>
    `;
    parentEl.innerHTML = outHtml;
  }

  function initFilters(filters, parentEl) {
    parentEl.innerHTML = `${HtmlTemplate_Filters(filters)}`;
  };

  function HtmlTemplate_NavItem(scoreItem) {
    return `
      <a class="nes-badge" href="#${CONST.attrs.sfidaId.replace('{id}', scoreItem.id)}" ${CONST.attrs.dataFilter}="${new Date(scoreItem.data).getFullYear()}">
        <!--  <span class="is-dark">${scoreItem.pos_01_pts || 0}</span> -->
        <span class="is-success">${scoreItem.titolo}</span>
      </a>
    `;
  }

  function HtmlTemplate_Sfida(scoreItem) {
    return `
      <section
        id="${CONST.attrs.sfidaId.replace('{id}', scoreItem.id)}"
        class="scheda mt2 mb2 nes-container with-title is-rounded" ${CONST.attrs.dataFilter}="${new Date(scoreItem.data).getFullYear()}"
        style="
          background-image: url('assets/webp/${scoreItem.id}-cover.webp');
          background-size: cover;
          background-position: center;
        "
      >
        <h3 class="title">
            <a href="#${CONST.attrs.sfidaId.replace('{id}', scoreItem.id)}" onclick="Utils_onClickSfidaBtn(this)">
              <small class="nes-btn is-normal">
                #${scoreItem['sfida n.']}
                ${scoreItem.titolo}
              </small>
            </a>
        </h3>

        <header class="text-center">
          <img class="scoreitem-img"
            src="assets/webp/${scoreItem.id}-title.webp" onerror="onImageLoadError(this)" loading="lazy" alt= " " />
        </header>

        <div class="body mt1">
            <div>
              <dl>
                <dt class="text-light nes-text is-disabled">sfida numero</dt>
                  <dd class="nes-text is-primary">${scoreItem['sfida n.']}</dd>
                <dt class="text-light nes-text is-disabled">giocato</dt>
                  <dd class="nes-text is-primary">${Utils_dateFormater(scoreItem.data).toLowerCase()}</dd>
                <dt class="text-light nes-text is-disabled">romset</dt>
                  <dd class="nes-text is-primary">${scoreItem.romset ? converter.makeHtml(scoreItem.romset) : 'sconosciuto'}</dd>
                <dt class="text-light nes-text is-disabled">regole</dt>
                  <dd class="nes-text is-primary regole">${converter.makeHtml(scoreItem.regole || 'tutto consentito')}</dd>
                <dt class="text-light nes-text is-disabled">vincitore</dt>
                  <dd class="nes-text is-primary">${scoreItem.pos_01_name ?
                      `<i class="nes-icon trophy is-small"></i> ${scoreItem.pos_01_name}`
                      : '-n.a.-'}</dd>
              </dl>
            </div>
            <div>
              ${HtmlTemplate_Sfida_Classifica(scoreItem)}
            </div>
        </div>

        <footer class="text-center mt1">
          <img class="scoreitem-img"
            src="assets/webp/${scoreItem.id}-screen.webp" onerror="onImageLoadError(this)" loading="lazy" alt= " " />
        </footer>
      </section>
    `
  }

  function HtmlTemplate_Sfida_Classifica(scoreItem) {
    const positions = buildPositions(scoreItem);
    return `<div class="">
      <table class="">
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
        <td class="text-right nes-text is-success">${player.pos}.&nbsp;</td>
        <td  class="text-right nes-text is-warning">${player.pts}&nbsp;</td>
        <td class="nes-text is-primary">${player.name}</td>
        <td class="nowrap">
          ${player.pos === 1 ? '': ''}
          ${player.pos === 2 ? '' : ''}
          ${player.pos === 3 ? '' : ''}
        </td>
      </tr>
    `;
  }

  function HtmlTemplate_Filters(filters) {
    const dateKeys = Object.keys(filters.date);
    dateKeys.sort().reverse();

    return `
      <h3 class="title">Ricerca per testo</h3>

      <div class="nes-field is-inline">
        <input
          class="nes-input is-dark mr1"
          id="search"
          onchange="onSearchFilter(this.value, event);"
          placeholder="ricerca in titoli, giocatori, date, ovunque..."
          type="search"
          >
        <div>
          <label for="search" style="flex-grow: 2; text-align: left;">
            <span class="nes-btn">
              <img
                src="assets/search.png"
                width="16"
                height="16"
                class="dib"
                style="vertical-align: -3px;"
                />
              Cerca
            </span>&nbsp;
          </label>
          <span class="nes-text is-small" onclick="Utils_syncFilter({resetHash: true});">&times;Reset</span>
        </div>
      </div>

      <h3 class="mt1 title">Filtra per anno</h3>
      <ul class="mp0 dib list-simple" id="filtro-anno">
        ${dateKeys.map((key, index) => {
          const filterLabel = key === '*' ? 'tutti' : key;
          const scores = filters.date[key].length;
          const filterValue = `[${CONST.attrs.dataFilter}${key === '*' ? '' : `="${key}"`}]`;
          return `
            <li class="mp0 mr1 dib list-simple">
              <label>
                <input
                  class="nes-checkbox is-dark"
                  name="filter-date"
                  value="${encodeURIComponent(filterValue)}"
                  ${key === '*' ? 'checked' : ''}
                  onChange="onChangeFilterDate(this, event);"
                  type="radio"
                /><span>${filterLabel} (${scores})</span></label>
            </li>
          `
        }).join('\n')}
    `
  }

  function Utils_goToSfida(elementSfidaId) {
    if (!elementSfidaId) return;
    const id = `#${elementSfidaId.substring(6)}`; // sfida-187
    window.scorezone.els.search().value = id;
    window.scorezone.els.anniInput().forEach(el => {
      el.checked = true
      onChangeFilterDate(el, null);
    });
    onSearchFilter(id, null);
  }

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

})();


function Utils_syncFilter({resetHash = false} = {}) {
  window.scorezone.els.search().value = '';
  const els = window.scorezone.els.anniInput();
  els.forEach(el => onChangeFilterDate(el, null));
  onSearchFilter(window.scorezone.els.search().value, null);
  if (resetHash) {
    window.location.hash = '';
  }
}

function onSearchFilter(value, evt) {
  evt ? evt.preventDefault() : null;
  const filterValue = `${value}`.trim();
  const elements = document.querySelectorAll(`[${window.scorezone.attrs.dataFilter}]`);
  elements.forEach(currentEl => {
    const text = currentEl.innerText;
    const show = filterValue.length == 0 || (text.toLowerCase().includes(filterValue.toLowerCase()))
    currentEl.setAttribute(window.scorezone.attrs.filterText, (show ? 'true' : 'false'));
  });
}

function onChangeFilterDate(el, evt) {
  evt ? evt.preventDefault() : null;
  const filterValue = decodeURIComponent(el.value);
  const show = el.checked;
  const elements = document.querySelectorAll(`${filterValue}`);
  document.querySelectorAll(`[${window.scorezone.attrs.dataFilter}]`).forEach(el => el.setAttribute(window.scorezone.attrs.filterDate, 'false'));
  elements.forEach(el => { el.setAttribute(window.scorezone.attrs.filterDate, (show ? 'true' : 'false'))});
}

function onImageLoadError(el) {
  el.style.display = 'none';
  // console.log('img missing', el.getAttribute('src'));
}

function Utils_onClickSfidaBtn(el) {
  var success = false;
  try {
    // copy to clipboard
    var text = window.location.toString().split('#')[0] + el.getAttribute('href');
    navigator.clipboard.writeText(text);
    success = true;
  } catch (e) {
    success = false;
    console.error('error', e);
  }
  if (success) {
    Toastify({
      text: `${el.innerText}, link copiato negli appunti`,
      duration: 2000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#d4c816",
        color: "#000",
      },
      onClick: function(){
        console.log('tapped');
      }
    }).showToast();
  }
}
