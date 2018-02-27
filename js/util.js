'use strict';

(function () {

  window.util = {
    map: document.querySelector('.map'),

    mapPins: document.querySelector('.map__pins'),

    mapFilters: document.querySelector('.map__filters'),

    pinMain: document.querySelector('.map__pin--main'),

    nf: document.querySelector('.notice__form'),

    nfFieldset: document.querySelectorAll('.notice__form fieldset'),

    KeyCodes: {
      KEY_ENTER: 13,
      KEY_ESC: 27
    },

    StatusCodes: {
      SUCCESS: 200,
      WRONG_REQUEST: 400,
      NOT_FOUND: 404,
      MOVED_PERMANENTLY: 301,
      MOVED_TEMPORARY: 307
    }

  };
})();
