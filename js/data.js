'use strict';

(function () {
  window.offers = [];
  window.offersFilters = [];

  var successHandler = function (offers) {
    offers.forEach(function (el, index, array) {
      if (index !== (array.length)) {
        window.offers.push(el);
        window.offersFilters.push(el);
      }
    });
  };

  window.backend.load(successHandler, window.backend.onError);

})();
