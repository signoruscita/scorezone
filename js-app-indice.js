!(function () {
  const converter = new showdown.Converter();

  initData()
    .then((scoresList) => {
      scoresList.sort((a, b) => {
        if (a.id >= b.id) return -1;
        return 1;
      })
      initNav(scoresList, document.querySelector('nav'));
      initIndice(scoresList, document.querySelector('main'));
    })
    .catch((err) => {
      console.log('error', err);
    });


  function initNav(scoresList, parentEl) {
    const out = scoresList.reduce((acc, scoreItem) => {
      acc.push(scorezoneNavItem(scoreItem))
      return acc;
    }, []).join('\n');
    parentEl.innerHTML = out;
  }
  function initIndice(scoresList, parentEl) {
    const outhtml = scoresList.map((item, _index) => {
      return scorezoneItem(item);
    }).join('\n');
    parentEl.innerHTML = outhtml;
  }

  function getPlayersHtml(scoreItem) {
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
    ].reduce((acc, keys, index) => {
        const name = scoreItem[keys[0]];
        const pts = scoreItem[keys[1]];
        if (!!name && !!pts) {
          acc = `${acc}\n${scorezonePlayer({ name, pts, pos: index + 1 })}`
        }
        return acc;
      }, '');
  }

  function initData() {
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

  function dateFormater(date) {
    if (!date) { return '' }
    try {
      const event = date;
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return event.toLocaleDateString(undefined, options);
    } catch (e) {
      return date;
    }
  }

  function scorezoneNavItem(scoreItem) {
    return `
      <a class="nes-btn is-primary" href="#sfida-${scoreItem.id}"><small>${scoreItem.titolo}</small></a>
    `;
  }

  function scorezoneItem(scoreItem) {
    return `
      <section class="scheda nes-container with-title is-dark">
        <h3 class="title" id="sfida-${scoreItem.id}">#${scoreItem['sfida n.']} ${scoreItem.titolo} ${dateFormater(scoreItem.data)}</h3>
        <div class="nes-container is-rounded is-centered is-dark">
          <img class="img-title"
            src="assets/webp/${scoreItem.id}-title.webp" onerror="this.style.display='none'" loading="lazy" alt= " " />

          ${scoreItem.romset ? converter.makeHtml('romset:' + scoreItem.romset) : ''}

          <div>
            ${converter.makeHtml(scoreItem.regole || '')}
          </div>

          </div>
        <div class="nes-table-responsive">
          <table class="nes-table is-bordered is-dark">
            <tbody>
              ${getPlayersHtml(scoreItem)}
            </tbody>
          </table>
        </div>
        <p>
          <img class="img-additional"
              src="assets/webp/${scoreItem.id}-cover.webp" onerror="this.style.display='none'" loading="lazy" alt= " " />
            <img class="img-additional"
              src="assets/webp/${scoreItem.id}-screen.webp" onerror="this.style.display='none'" loading="lazy" alt= " " />
        </p>
      </section>
    `
  }

  function scorezonePlayer(player) {
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

})();
