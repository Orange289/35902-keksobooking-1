'use strict';

(function () {
  var typeFilter = window.util.mapFilters.querySelector('#housing-type');
  var priceFilter = window.util.mapFilters.querySelector('#housing-price');
  var roomsFilter = window.util.mapFilters.querySelector('#housing-rooms');
  var guestsFilter = window.util.mapFilters.querySelector('#housing-guests');
  var featuresFilter = window.util.mapFilters.querySelector('#housing-features');
  var featuresItems = featuresFilter.querySelectorAll('input[type="checkbox"]');

  console.log(window.offers);

  window.isFiltered = false;

  var onFilterChange = function () {

    window.isFiltered = true;
    var offersStart = window.offersFilters.slice(0);

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
    var compareFeatures = function (el) {
      return featuresMas.every(function (item) {
        return el.includes(item);
      });
    };

    window.offersFilters = window.offersFilters
        .filter(function (el) {
          return typeFilter.options[typeFilter.selectedIndex].value === 'any' ||
            el.offer.type === typeFilter.options[typeFilter.selectedIndex].value;
        })
        .filter(function (el) {
          return roomsFilter.options[roomsFilter.selectedIndex].value === 'any' ||
            el.offer.rooms === Number(roomsFilter.options[roomsFilter.selectedIndex].value);
        })
        .filter(function (el) {
          return guestsFilter.options[guestsFilter.selectedIndex].value === 'any' ||
            el.offer.guests === Number(guestsFilter.options[guestsFilter.selectedIndex].value);
        })
        .filter(function (el) {
          return priceFilter.options[priceFilter.selectedIndex].value === 'any' ||
            comparePrice(el.offer.price, priceFilter.options[priceFilter.selectedIndex].value);
        })
        .filter(function (el) {
          return compareFeatures(el.offer.features);
        });

    window.debounce(window.drawPins(window.offersFilters));
    if (window.offersFilters.length) {
      window.debounce(window.fillDialog(window.offersFilters, 0));
    } else {
      window.removeDialog();
    }

    window.offersFiltersTotal = window.offersFilters.slice(0);

    window.offersFilters = offersStart;

  };

  window.util.mapFilters.addEventListener('change', onFilterChange);
})();
