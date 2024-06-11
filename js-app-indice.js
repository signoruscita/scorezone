!(function () {
  const converter = new showdown.Converter();

  initData()
    .then((scoresList) => {

      scoresList.sort((a, b) => {
        if (a.id >= b.id) {
          return -1;
        }
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
      acc.push(
        `<a class="nes-btn is-primary" href="#sfida-${scoreItem.id}"><small>${scoreItem.titolo}</small></a>`
      );
      return acc;
    }, []).join('\n');
    parentEl.innerHTML = out;
  }
  function initIndice(scoresList, parentEl) {
    const outhtml = scoresList.map((scoreItem, _index) => {
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
    `;
  }).join('\n');
    parentEl.innerHTML = outhtml;
  }

  function getPlayersHtml(scoreItem) {
    const pos = [
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
    ];
    return pos.reduce((acc, keys, index) => {
      const name = scoreItem[keys[0]];
      const pts = scoreItem[keys[1]];
      if (!!name && !!pts) {
        acc.push({name, pts, pos: index+1});
      }
      return acc;
    }, []).reduce((acc, player) => {
      return `${acc}\n
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
        `
    }, '');
  }

  function initData() {
    var gsheetData = window.gsheetData || {};
    var documentId = gsheetData.documentId || '';
    var sheetName = gsheetData.sheetName || '';

    var doc = gsheetjs.downloadSheet({
      documentId: documentId,
      sheetName: sheetName,
    });

    return doc;
  }

  function dateFormater(date) {
    if (!date)  { return '' }
    try {
      const event = date;
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const formatted = event.toLocaleDateString(undefined, options);
      return formatted
    } catch(e) {
      return date;
    }
  }

})();

/**
{
    "id": 1,
    "sfida n.": 1,
    "data": "2000-01-02T03:04:05.006Z",
    "titolo": "Titolo",
    "regole": "some markdown text",
    "romset": "romsetname",
    "pos_01_pts": 0,
    "pos_01_name": null,
    "pos_02_pts": 0,
    "pos_02_name": null,
    "pos_03_pts": 0,
    "pos_03_name": null,
    "pos_04_pts": 0,
    "pos_04_name": null,
    "pos_05_pts": 0,
    "pos_05_name": null,
    "pos_06_pts": 0,
    "pos_06_name": null,
    "pos_07_pts": 0,
    "pos_07_name": null,
    "pos_08_pts": 0,
    "pos_08_name": null,
    "pos_09_pts": 0,
    "pos_09_name": null,
    "pos_10_pts": 0,
    "pos_10_name": null,
    "pos_11_pts": 0,
    "pos_11_name": null,
    "pos_12_pts": 0,
    "pos_12_name": null,
    "pos_13_pts": 0,
    "pos_13_name": null,
    "pos_14_pts": 0,
    "pos_14_name": null,
    "pos_15_pts": 0,
    "pos_15_name": null
}
*/
