(function init() {
  injectScript('https://apis.google.com/js/auth.js?onload=init');

  window.gsheetjs = { downloadSheet };

  function downloadSheet({ documentId, sheetName, cache }) {
    var cacheKey = `gsheetjs_${documentId}_${sheetName}`;
    log('downloadSheet', { documentId, sheetName, cache: `${cache ? cacheKey : 'no'}` });

    return Promise
      .resolve(true)
      .then(async () => {
        if (cache) {
          return await downloadLocalStorage({ cacheKey });
        }
        return { data: null, error: false };
      })
      .then(async (result) => {
        if (result.data && result.data != null) {
          return result.data;
        }
        var downloadedData = await downloadFromNet({ documentId, sheetName });
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: new Date().toISOString(), data: downloadedData }));
        return downloadedData;
      }).catch((e) => {
        log('downloadSheet', 'error', e);
      })
  }

  function downloadLocalStorage({ cacheKey }) {
    return new Promise((resolve, _reject) => {
      try {
        log('downloadLocalStorage', cacheKey);
        var value = JSON.parse(localStorage.getItem(cacheKey));
        if (value) {
          var now = new Date().getTime();
          var oldtz = new Date(value.timestamp).getTime();
          // diff in minutes
          var diffMins = Math.round(((now - oldtz % 86_400_000) % 3_600_000) / 60000);
          if (diffMins > 10) {
            throw new Error('cache expired');
          }
          var data = value.data;
          return resolve(
            { data, error: null }
          );
        }
        throw new Error('no data');
      } catch (e) {
        log('downloadLocalStorage', 'error', e);
        return resolve({ data: null, error: e });
      }
    })
  }

  function downloadFromNet({ documentId, sheetName }) {
    return new Promise(function (resolve, _reject) {
      var handlerName = `gdoc_h_${Math.random()}`.replace(/[^a-z0-9_]/ig, '');
      log('handlerName', handlerName);
      window[handlerName] = (response) => {
        const map = normalizeSheetData({ json: response, documentId, sheetName });
        resolve(map);
        window[handlerName] = undefined;
      };
      // Note: The below spreadsheet is "Public on the web" and will work
      // with or without an OAuth token.  For a better test, replace this
      // URL with a private spreadsheet.
      var id = documentId;
      var sheet = sheetName
      var tqUrl = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?sheet=${sheet}&tqx=responseHandler:${handlerName}`;
      log('tqUrl', tqUrl);
      injectScript(tqUrl);
    });
  }

  function normalizeSheetData({ json }) {
    log('normalizeSheetData', json);
    var data = [];
    json.table.rows.forEach((row, rowIndex) => {
      log('row', rowIndex, row);
      const values = row.c;
      const obj = {};
      log('row values init', rowIndex, values, obj);
      values.forEach((cell, index) => {
        const colname = getColName(json, index);
        const value = (cell && cell.v) || null;
        const type = getColType(json, index);
        const pattern = getColPattern(json, index);
        obj[colname] = getColValue(value, type, pattern);
        log('cell', index, colname, value);
      });
      data.push(obj);
      log('row values done', rowIndex, obj);
    });
    log('data normalised', data);
    return data;
  }
  function getColName(json, index) {
    const col = json.table.cols[index];
    const colname = `${col.label || col.id || index}`.trim();
    log('getColName', index, col);
    return colname;
  }
  function getColType(json, index) {
    const col = json.table.cols[index];
    const coltype = col.type || 'string';
    log('getColType', index, col);
    return coltype;
  }
  function getColPattern(json, index) {
    const col = json.table.cols[index];
    const colpattern = col.pattern || null;
    log('getColPattern', index, col);
    return colpattern;
  }

  function getColValue(value, type, _pattern) {
    log('getColValue', value, type);
    if (type === 'number') {
      return Number(value);
    }
    if (type === 'date') {
      try {
        const temp = `${value}`.substring(5, value.length - 1);
        const [y, m, d] = temp.split(',');
        return new Date(y, m, d);
      } catch (e) {
        log('getColValue', 'error cannot parse date', {value, type, pattern}, e);
        return value;
      }
    }
    return value;
  }

  function injectScript(url) {
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
    return script;
  }

  function log(...logArgs) {
    (window.gsheetData && window.gsheetData.debug === true) && console.log(...logArgs);
  }

})()

