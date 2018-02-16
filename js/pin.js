'use strict';

(function () {
  window.PIN_WIDTH = 62;
  window.PIN_HEIGHT = 84;
  window.START_PIN_HEIGHT = 62;
  window.util.mapPins = window.util.map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  window.drawPins = function (mas) {
    for (var i = 0; i < mas.length; i++) {
      var newPin = document.createElement('button');
      var elX = mas[i].location.x - window.PIN_WIDTH / 2;
      var elY = mas[i].location.y - window.PIN_HEIGHT;
      var elAva = mas[i].author.avatar;

      newPin.className = 'map__pin map__pin--similar';
      newPin.setAttribute('style', 'left:' + elX + 'px; top:' + elY + 'px;');
      newPin.setAttribute('data-index', i);
      newPin.innerHTML = '<img src=' + elAva + ' width="40" height="40" draggable="false">';

      fragment.appendChild(newPin);
    }

    window.util.mapPins.appendChild(fragment);
  };

  window.removePins = function (mas) {
    var pin = window.util.mapPins.querySelectorAll('.map__pin--similar');

    for (var i = 0; i < mas.length; i++) {
      window.util.mapPins.removeChild(pin[i]);
    }
  };
})();
