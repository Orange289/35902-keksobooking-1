'use strict';

(function () {
  window.PIN_WIDTH = 62;
  window.PIN_HEIGHT = 84;
  window.START_PIN_HEIGHT = 62;
  var fragment = document.createDocumentFragment();

  window.pins = {
    removePins: function () {
      var pin = window.util.mapPins.querySelectorAll('.map__pin--similar');
      var pinLength = pin.length;

      for (var i = 0; i < pinLength; i++) {
        window.util.mapPins.removeChild(pin[i]);
      }
    },

    drawPins: function (mas) {
      window.pins.removePins();

      mas = mas.slice(0, 5);

      for (var i = 0; i < mas.length; i++) {
        var newPin = document.createElement('button');
        var pinX = mas[i].location.x - window.PIN_WIDTH / 2;
        var pinY = mas[i].location.y - window.PIN_HEIGHT;
        var pinAva = mas[i].author.avatar;

        newPin.className = 'map__pin map__pin--similar';
        newPin.setAttribute('style', 'left:' + pinX + 'px; top:' + pinY + 'px;');
        newPin.setAttribute('data-index', i);
        newPin.innerHTML = '<img src=' + pinAva + ' width="40" height="40" draggable="false">';

        fragment.appendChild(newPin);
      }

      window.util.mapPins.appendChild(fragment);
    }

  };

})();
