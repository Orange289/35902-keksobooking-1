'use strict';

(function () {
  window.fillDialog = function (index) {
    var template = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);

    var lodgeAva = template.querySelector('.popup__avatar');
    var lodgeTitle = template.querySelector('h3');
    var lodgeAddress = template.querySelector('small');
    var lodgePrice = template.querySelector('.popup__price');
    var lodgeType = template.querySelector('h4');
    var lodgeRoomsGuests = template.querySelector('.popup__roomsguests');
    var lodgeCheck = template.querySelector('.popup__check');
    var lodgeFeatures = template.querySelector('.popup__features');
    var lodgeDescr = template.querySelector('.popup__description');
    var lodgePhotos = template.querySelector('.popup__pictures');

    lodgeTitle.textContent = window.offers[index].offer.title;
    lodgeAddress.textContent = window.offers[index].offer.address;
    lodgePrice.innerHTML = window.offers[index].offer.price + '&#x20bd;/ночь';

    switch (window.offers[index].offer.type) {
      case 'flat':
        lodgeType.textContent = 'Квартира';
        break;
      case 'bungalo':
        lodgeType.textContent = 'Бунгало';
        break;
      default:
        lodgeType.textContent = 'Дом';
    }

    var guestsVal;
    var roomsVal;

    switch (window.offers[index].offer.guests) {
      case 1:
        guestsVal = ' гостя';
        break;
      default:
        guestsVal = ' гостей';
    }

    switch (window.offers[index].offer.rooms) {
      case 1:
        roomsVal = ' комната для ';
        break;
      case 5:
        roomsVal = ' комнат для ';
        break;
      default:
        roomsVal = ' комнаты для ';
    }

    lodgeRoomsGuests.textContent = window.offers[index].offer.rooms + roomsVal + window.offers[index].offer.guests + guestsVal;

    lodgeCheck.textContent = 'Заезд после ' + window.offers[index].offer.checkin + ', выезд до ' + window.offers[index].offer.checkout + '';

    lodgeFeatures.innerHTML = '';

    for (var j = 0; j < window.offers[index].offer.features.length; j++) {
      var feature = '<span class="feature__image feature__image--' + window.offers[index].offer.features[j] + '"></span>';
      lodgeFeatures.innerHTML += feature;
    }

    lodgeDescr.textContent = window.offers[index].offer.description;

    for (var n = 0; n < window.offers[index].offer.photos.length; n++) {
      var photo = lodgePhotos.children[0].cloneNode();
      photo.innerHTML = '<img src="' + window.offers[index].offer.photos[n] + '" width="40" height="40">';
      lodgePhotos.appendChild(photo);
    }

    var lodgePhotosEls = lodgePhotos.querySelectorAll('li');
    lodgePhotos.removeChild(lodgePhotosEls[0]);

    lodgeAva.setAttribute('src', window.offers[index].author.avatar);

    window.util.mapPins.insertAdjacentElement('afterend', template);
  };

})();
