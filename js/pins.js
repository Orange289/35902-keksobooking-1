'use strict';

(function () {
  window.PIN_WIDTH = 62;
  window.PIN_HEIGHT = 84;
  window.START_PIN_HEIGHT = 62;
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


  ////

  var mapFilters = window.util.map.querySelector('.map__filters');
  var filterSelects = mapFilters.querySelectorAll('select');
  var typeFilter = mapFilters.querySelector('#housing-type');
  var priceFilter = mapFilters.querySelector('#housing-price');
  var roomsFilter = mapFilters.querySelector('#housing-rooms');
  var guestsFilter = mapFilters.querySelector('#housing-guests');
  var featuresFilter = mapFilters.querySelector('#housing-features');

  var onFilterSelect = function (mas) {

    var sameTypeOffers = mas.filter(function (el) {
      return el.offer.type === typeFilter.options[typeFilter.selectedIndex].text;
    });

    window.removePins(mas);
    window.drawPins(sameTypeOffers);
    // return sameTypeOffers;
  };

  console.log(window.offers);
  typeFilter.addEventListener('change',
  // function () {
  //   console.log(1);
  // }
  onFilterSelect(window.offers)
);




})();
