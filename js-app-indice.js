!(function () {
  const converter = new showdown.Converter();

  const PARAM_NAME_SEARCH = 'sfida';
  const PARAM_NAME_HISTORY = 'score';
  const PARAM_ATTRIBUTE_NAME_ID = 'data-id';

  initData()
    .then((scoresList) => {

      scoresList.sort((a, b) => {
        if (a.id >= b.id) {
          return -1;
        }
        return 1;
      })
      const parent = document.querySelector('main');
      initIndice(scoresList, parent);
    })
    .catch((err) => {
      console.log('error', err);
    });

  function initIndice(scoresList, parentEl) {
    const outhtml = `
      <table style="width: 1000px; margin: 0 auto;">
          ${scoresList.map((scoreItem, index) => {
            return `
              <tr>
                <td>
                  <small>${scoreItem.id} ${dateFormater(scoreItem.data)}</small>
                </td>
                <td>
                  <h2>${scoreItem.titolo}</h2>
                  <small>
                    ${scoreItem.romset ? 'romset ' + scoreItem.romset + '. ' : ''}${converter.makeHtml(scoreItem.regole || '')}
                  </small>
                </td>
                <td>
                  <img style="display: inline-block; height: 6rem; margin: 0.5rem;" src="assets/webp/${scoreItem.id}-title.webp"  loading="lazy" alt= "" />
                  <img style="display: inline-block; height: 6rem; margin: 0.5rem;" src="assets/webp/${scoreItem.id}-cover.webp"  loading="lazy" alt= "" />
                  <img style="display: inline-block; height: 6rem; margin: 0.5rem;" src="assets/webp/${scoreItem.id}-screen.webp"  loading="lazy" alt= "" />
                </td>
                <td>
                  ${getPlayersHtml(scoreItem)}
                </td>
                <td>
                  ${scoreItem.quote ? `— ${scoreItem.quote}` : ''}
                </td>
              </tr>
            `;
          }).join('\n')}
      </table>
    `;
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
      return `${acc}\n<p>${player.pos} - ${player.pts} - ${player.name}</p>`
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
