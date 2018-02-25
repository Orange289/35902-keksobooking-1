'use strict';

(function () {

  window.isPageActive = false;

  window.resetPage = function () {
    window.isPageActive = false;
    window.util.nf.classList.add('notice__form--disabled');
    window.isFiltered = false;

    for (var i = 0; i < window.nfFieldset.length; i++) {
      window.nfFieldset[i].setAttribute('disabled', '');
    }

    window.util.nf.reset();
    window.util.mapFilters.reset();
  };

  window.resetPage();

  window.setPageActive = function () {
    document.querySelector('.map').classList.remove('map--faded');

    window.drawPins(window.offers);
    window.fillDialog(window.offers, 0);

    window.util.nf.classList.remove('notice__form--disabled');

    for (var i = 0; i < window.nfFieldset.length; i++) {
      window.nfFieldset[i].removeAttribute('disabled');
    }

    window.isPageActive = true;
  };

})();
