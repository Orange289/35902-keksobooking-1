'use strict';

(function () {
  window.offers = [];

  var successHandler = function (offers) {
    for (var i = 0; i < offers.length; i++) {
      window.offers[i] = offers[i];
    }
  };

  window.backend.load(successHandler, window.backend.onError);

})();
