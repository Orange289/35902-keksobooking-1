'use strict';

(function () {

  var pinMainStartX = window.util.pinMain.offsetLeft;
  var pinMainStartY = window.util.pinMain.offsetTop;

  window.isPageActive = false;

  window.resetPage = function () {
    window.isPageActive = false;
    window.util.pinMain.style.left = (pinMainStartX) + 'px';
    window.util.pinMain.style.top = (pinMainStartY) + 'px';
    window.util.nf.classList.add('notice__form--disabled');
    window.isFiltered = false;

    for (var i = 0; i < window.util.nfFieldset.length; i++) {
      window.util.nfFieldset[i].setAttribute('disabled', '');
    }

    window.util.nf.reset();
    window.util.mapFilters.reset();
  };

  window.resetPage();

  window.setPageActive = function () {
    document.querySelector('.map').classList.remove('map--faded');

    window.drawPins(window.offers);

    window.util.nf.classList.remove('notice__form--disabled');

    for (var i = 0; i < window.util.nfFieldset.length; i++) {
      window.util.nfFieldset[i].removeAttribute('disabled');
    }

    window.isPageActive = true;
  };

})();
