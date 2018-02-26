'use strict';

(function () {
  window.removeDialog = function () {
    var dialog = window.util.map.querySelector('.map__card');

    if (dialog) {
      dialog.remove();
    }
  };

  window.fillDialog = function (mas, index) {
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

    window.removeDialog();

    lodgeTitle.textContent = mas[index].offer.title;
    lodgeAddress.textContent = mas[index].offer.address;
    lodgePrice.innerHTML = mas[index].offer.price + '&#x20bd;/ночь';

    switch (mas[index].offer.type) {
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

    switch (mas[index].offer.guests) {
      case 1:
        guestsVal = ' гостя';
        break;
      default:
        guestsVal = ' гостей';
    }

    switch (mas[index].offer.rooms) {
      case 1:
        roomsVal = ' комната для ';
        break;
      case 5:
        roomsVal = ' комнат для ';
        break;
      default:
        roomsVal = ' комнаты для ';
    }

    lodgeRoomsGuests.textContent = mas[index].offer.rooms + roomsVal + mas[index].offer.guests + guestsVal;

    lodgeCheck.textContent = 'Заезд после ' + mas[index].offer.checkin + ', выезд до ' + mas[index].offer.checkout + '';

    lodgeFeatures.innerHTML = '';

    for (var j = 0; j < mas[index].offer.features.length; j++) {
      var feature = '<li class="feature feature--' + mas[index].offer.features[j] + '"></li>';
      lodgeFeatures.innerHTML += feature;
    }

    lodgeDescr.textContent = mas[index].offer.description;

    for (var n = 0; n < mas[index].offer.photos.length; n++) {
      var photo = lodgePhotos.children[0].cloneNode();
      photo.innerHTML = '<img src="' + mas[index].offer.photos[n] + '" width="40" height="40">';
      lodgePhotos.appendChild(photo);
    }

    var lodgePhotosEls = lodgePhotos.querySelectorAll('li');
    lodgePhotos.removeChild(lodgePhotosEls[0]);

    lodgeAva.setAttribute('src', mas[index].author.avatar);

    window.util.mapPins.insertAdjacentElement('afterend', template);
  };

})();
