'use strict';

(function () {

  window.isPageActive = false;

  window.resetPage = function () {
    window.isPageActive = false;
    window.nf.classList.add('notice__form--disabled');

    for (var i = 0; i < window.nfFieldset.length; i++) {
      window.nfFieldset[i].setAttribute('disabled', '');
    }

    window.nf.reset();
  };

  window.resetPage();

  window.setPageActive = function () {
    document.querySelector('.map').classList.remove('map--faded');

    window.drawPins(window.offers);
    window.fillDialog(0);

    window.nf.classList.remove('notice__form--disabled');

    for (var i = 0; i < window.nfFieldset.length; i++) {
      window.nfFieldset[i].removeAttribute('disabled');
    }

    window.isPageActive = true;
  };

})();
