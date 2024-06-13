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

      var swiper = initSlider(scoresList);


      initCurrentSlide(swiper);
    })
    .catch((err) => {
      console.log('error', err);
    });

  function scoreItemToSlide(scoreItem, index) {
    return `
    <div
      ${PARAM_ATTRIBUTE_NAME_ID}="${scoreItem.id}"
      class="
        swiper-slide
        ${getSlidePattern(index)}
      "
      style="${getSlideStiles(scoreItem.id)}"
    >
      <header>
        🆔 Sfida ${scoreItem.id} &emsp; &emsp; 🗓 ${dateFormater(scoreItem.data)}
      </header>
      <blockquote>
        <h1>${scoreItem.titolo}</h1>
        <small>
          ${scoreItem.romset ? 'romset ' + scoreItem.romset + '. ' : ''}${converter.makeHtml(scoreItem.regole || '')}
        </small>
        <img src="assets/webp/${scoreItem.id}-title.webp"  loading="lazy" alt= "">
        <div class="body">
         ${getPlayersHtml(scoreItem)}
        <p>
          <img style="display: inline-block; height: 6rem; margin: 0.5rem;" src="assets/webp/${scoreItem.id}-cover.webp"  loading="lazy" alt= "">
          <img style="display: inline-block; height: 6rem; margin: 0.5rem;" src="assets/webp/${scoreItem.id}-screen.webp"  loading="lazy" alt= "">
        </p>
        </div>
        ${scoreItem.quote ? `<footer>— ${scoreItem.quote}</footer>` : ''}
      </blockquote>
    </div>
  `;
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

  function getSlidePattern(index) {
    var list = [
      'pattern-checks-lg',
      'pattern-cross-dots-lg',
      'pattern-diagonal-lines-lg',
      'pattern-diagonal-stripes-lg',
      'pattern-dots-lg',
      'pattern-grid-lg',
      'pattern-horizontal-lines-lg',
      'pattern-horizontal-stripes-lg',
      'pattern-triangles-lg',
      'pattern-vertical-lines-lg',
      'pattern-vertical-stripes-lg',
      'pattern-zigzag-lg',
      'pattern-checks-md',
      'pattern-cross-dots-md',
      'pattern-diagonal-lines-md',
      'pattern-diagonal-stripes-md',
      'pattern-dots-md',
      'pattern-grid-md',
      'pattern-horizontal-lines-md',
      'pattern-horizontal-stripes-md',
      'pattern-triangles-md',
      'pattern-vertical-lines-md',
      'pattern-vertical-stripes-md',
      'pattern-zigzag-md',
    ];
    return list[index % list.length];
  }

  function getSlideStiles(scoreItemId) {
    var r = Math.random();
    var c1 = ~~(360 * r);
    var c2 = ~~(-180 * r);
    return `
      color: hsla(${c1},70%,70%,1);
      background-color: hsla(${c2},70%,30%,1);
    `;
  }

  function invertHex(hex) {
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  }


  function initData() {
    var gsheetData = window.gsheetData || {};
    var documentId = gsheetData.documentId || '';
    var sheetName = gsheetData.sheetName || '';
    var cache = gsheetData.cache || false;

    var doc = gsheetjs.downloadSheet({
      documentId: documentId,
      sheetName: sheetName,
      cache: cache,
    });

    return doc;
  }

  function initSlider(list) {
    var swiper = new Swiper('.swiper-container', {
      on: {
        slideChange: function () {
          //add(this);
          var url = new URL(window.location.href);
          const indexValue = this.slides[this.activeIndex].getAttribute(PARAM_ATTRIBUTE_NAME_ID); // this.activeIndex
          url.searchParams.set(PARAM_NAME_SEARCH, indexValue);
          window.history.replaceState(PARAM_NAME_HISTORY, indexValue, url.toString());
        }
      }
    });
    swiper.appendSlide(
      list.map(scoreItemToSlide)
    );
    swiper.update();

    document.onkeydown = function checkKey(e) {
      e = e || window.event;
      if (e.keyCode == '38') {
        // up arrow
        swiper.slideNext();
      } else if (e.keyCode == '40') {
        // down arrow
        swiper.slidePrev();
      } else if (e.keyCode == '37') {
        // left arrow
        swiper.slidePrev();
      } else if (e.keyCode == '39') {
        // right arrow
        swiper.slideNext();
      }
    };
    return swiper;
  }

  function initCurrentSlide(slider) {
    var scoreId = new URL(window.location.href).searchParams.get(PARAM_NAME_SEARCH);
    // if (/^\d+$/g.test(scoreId)) {
    if (scoreId && scoreId.length > 0) {
      let slideIndex = 0;
      for (let a = 0; a < slider.slides.length; a++) {
        let current = slider.slides[a];
        if (current.getAttribute(PARAM_ATTRIBUTE_NAME_ID) == scoreId) {
          slideIndex = a;
          break;
        }
      }
      slider.slideTo(slideIndex);
    }
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
