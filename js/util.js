'use strict';

(function () {

  window.util = {
    map: document.querySelector('.map'),

    KEY_ENTER: 13,

    KEY_ESC: 27,

    getRandom: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },

    getRandomOrder: function (mas) {
      mas.sort(function () {
        return 0.5 - Math.random();
      });
      return mas;
    }

  };
})();
