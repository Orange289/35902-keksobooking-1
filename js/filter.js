'use strict';

(function () {
  var typeFilter = window.util.mapFilters.querySelector('#housing-type');
  var priceFilter = window.util.mapFilters.querySelector('#housing-price');
  var roomsFilter = window.util.mapFilters.querySelector('#housing-rooms');
  var guestsFilter = window.util.mapFilters.querySelector('#housing-guests');
  var featuresFilter = window.util.mapFilters.querySelector('#housing-features');
  var featuresItems = featuresFilter.querySelectorAll('input[type="checkbox"]');

  window.isFiltered = false;

  var onFilterChange = function () {

    window.isFiltered = true;
    var offersStart = window.data.offers.slice(0);

    var comparePrice = function (el, selectVal) {
      switch (selectVal) {
        case 'low':
          return (el < 10000);
        case 'middle':
          return ((el >= 10000) && (el < 50000));
        case 'high':
          return (el >= 50000);
      }
      return true;
    };

    var featuresMas = [];
    for (var i = 0; i < featuresItems.length; i++) {
      if (featuresItems[i].checked) {
        featuresMas.push(featuresItems[i].value);
      }
    }
    var compareFeatures = function (element) {
      return featuresMas.every(function (item) {
        return element.includes(item);
      });
    };

    window.offersFiltered = offersStart
        .filter(function (element) {
          return typeFilter.options[typeFilter.selectedIndex].value === 'any' ||
            element.offer.type === typeFilter.options[typeFilter.selectedIndex].value;
        })
        .filter(function (element) {
          return roomsFilter.options[roomsFilter.selectedIndex].value === 'any' ||
            element.offer.rooms === Number(roomsFilter.options[roomsFilter.selectedIndex].value);
        })
        .filter(function (element) {
          return guestsFilter.options[guestsFilter.selectedIndex].value === 'any' ||
            element.offer.guests === Number(guestsFilter.options[guestsFilter.selectedIndex].value);
        })
        .filter(function (element) {
          return priceFilter.options[priceFilter.selectedIndex].value === 'any' ||
            comparePrice(element.offer.price, priceFilter.options[priceFilter.selectedIndex].value);
        })
        .filter(function (element) {
          return compareFeatures(element.offer.features);
        });


    var renderFilter = function () {
      window.pins.drawPins(window.offersFiltered);
      window.removeDialog();
    };

    window.debounce(renderFilter);

  };

  window.util.mapFilters.addEventListener('change', onFilterChange);
})();
