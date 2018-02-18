'use strict';

(function () {
  window.pinMain = window.util.mapPins.querySelector('.map__pin--main');

  window.setFormAddress = function (el) {
    var x;
    var y;

    if (window.isPageActive) {
      x = el.offsetLeft + window.PIN_WIDTH / 2;
      y = el.offsetTop + window.PIN_HEIGHT;
    } else {
      x = el.offsetLeft + window.PIN_WIDTH / 2;
      y = el.offsetTop + window.START_PIN_HEIGHT / 2;
    }

    window.nfAddress.value = x + ', ' + y;
  };

  window.setFormAddress(window.pinMain);

  window.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      window.setPageActive();
      window.setFormAddress(window.pinMain);

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pinMain.style.top = (window.pinMain.offsetTop - shift.y) + 'px';
      window.pinMain.style.left = (window.pinMain.offsetLeft - shift.x) + 'px';
    };

    var onPinMainMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.setPageActive();
      window.setFormAddress(window.pinMain);
      document.removeEventListener('mousemove', onPinMainMouseMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
      document.addEventListener('keydown', onEscPress);
    };

    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);

  });

  var onPinClick = function (evt) {
    var clickedElement = null;

    if (evt.target.classList.contains('map__pin--similar')) {
      clickedElement = evt.target;
    } else if (evt.target.parentElement.classList.contains('map__pin--similar')) {
      clickedElement = evt.target.parentElement;
    } else {
      return;
    }

    var oldMapCard = window.util.map.querySelector('.map__card');

    if (oldMapCard) {
      window.util.map.removeChild(oldMapCard);
    }

    window.fillDialog(clickedElement.dataset.index);

    document.addEventListener('keydown', onEscPress);
  };

  window.util.mapPins.addEventListener('click', onPinClick);

  var onEscPress = function (evt) {
    if (evt.keyCode === window.util.KEY_ESC) {
      closeDialog();
    }
  };

  var closeDialog = function () {
    var dialog = window.util.map.querySelector('.map__card');

    window.util.map.removeChild(dialog);
    document.removeEventListener('keydown', onEscPress);
  };

  var closeDialogOnClick = function (evt) {

    if ((evt.target.className === 'popup__close') || (evt.target.children.className === 'popup__close')) {
      closeDialog();
    }

  };

  window.util.map.addEventListener('click', closeDialogOnClick);

  window.util.map.addEventListener('keydown', function (evt) {
    var dialog = window.util.map.querySelector('.map__card');

    if (evt.keykode === window.util.KEY_ENTER) {
      window.util.map.removeChild(dialog);
      document.removeEventListener('keydown', onEscPress);
    }
  });

})();
