'use strict';

(function () {

  window.setFormAddress = function (pinElement) {
    var x;
    var y;

    if (window.isPageActive) {
      x = pinElement.offsetLeft + window.PIN_WIDTH / 2;
      y = pinElement.offsetTop + window.PIN_HEIGHT;
    } else {
      x = pinElement.offsetLeft + window.PIN_WIDTH / 2;
      y = pinElement.offsetTop + window.START_PIN_HEIGHT / 2;
    }

    window.formAddress.value = x + ', ' + y;
  };

  window.setFormAddress(window.util.pinMain);

  window.util.pinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onPinMainMouseMove = function (moveEvt) {
      var MAP_START_X = window.util.map.offsetLeft + window.PIN_WIDTH / 2;
      var MAP_END_X = window.util.map.offsetLeft + window.util.map.clientWidth - window.PIN_WIDTH / 2;
      var MAP_START_Y = 150 - window.PIN_HEIGHT;
      var MAP_END_Y = 500 - window.PIN_HEIGHT;

      window.setFormAddress(window.util.pinMain);

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      if ((moveEvt.pageX >= MAP_START_X)
        && (moveEvt.pageX <= MAP_END_X)
        && (moveEvt.pageY >= MAP_START_Y)
        && (moveEvt.pageY <= MAP_END_Y)) {

        startCoords = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        window.util.pinMain.style.top = (window.util.pinMain.offsetTop - shift.y) + 'px';
        window.util.pinMain.style.left = (window.util.pinMain.offsetLeft - shift.x) + 'px';
      }

    };

    var onPinMainMouseUp = function () {

      if (window.isPageActive === false) {
        window.setPageActive();
      }

      window.setFormAddress(window.util.pinMain);
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

    if (window.isFiltered) {
      window.fillDialog(window.filteredArray, clickedElement.dataset.index);
    } else {
      window.fillDialog(window.offers, clickedElement.dataset.index);
    }

    document.addEventListener('keydown', onEscPress);
  };

  window.util.mapPins.addEventListener('click', onPinClick);

  var onEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCodes.KEY_ESC) {
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

    if (evt.keykode === window.util.KeyCodes.KEY_ENTER) {
      window.util.map.removeChild(dialog);
      document.removeEventListener('keydown', onEscPress);
    }
  });

})();
