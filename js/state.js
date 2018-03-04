'use strict';

(function () {

  var pinMainStartX = window.util.pinMain.offsetLeft;
  var pinMainStartY = window.util.pinMain.offsetTop;

  window.state = {
    isPageActive: false,

    setPageInactive: function () {
      window.state.isPageActive = false;
      window.util.pinMain.style.left = (pinMainStartX) + 'px';
      window.util.pinMain.style.top = (pinMainStartY) + 'px';
      window.util.noticeForm.classList.add('notice__form--disabled');
      window.isFiltered = false;

      for (var i = 0; i < window.util.formFieldset.length; i++) {
        window.util.formFieldset[i].setAttribute('disabled', '');
      }

      window.util.noticeForm.reset();
      window.util.mapFilters.reset();
    },

    setPageActive: function () {
      window.backend.load(window.data.successHandler, window.backend.onError);

      document.querySelector('.map').classList.remove('map--faded');

      window.util.noticeForm.classList.remove('notice__form--disabled');

      for (var i = 0; i < window.util.formFieldset.length; i++) {
        window.util.formFieldset[i].removeAttribute('disabled');
      }

      window.state.isPageActive = true;
    }


  };

  window.state.setPageInactive();

})();
