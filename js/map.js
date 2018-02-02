'use strict';

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getRandomOrder = function (mas) {
  mas.sort(function () {
    return 0.5 - Math.random();
  });
  return mas;
};

var fillData = function () {
  var getAddress = function (x, y) {
    var addr = '' + x + ', ' + y + '';
    return addr;
  };

  var getAvatar = function (num) {
    var ava = 'img/avatars/user0' + num + '.png';
    return ava;
  };

  var avatars = [];

  for (var k = 0; k < 8; k++) {
    avatars.push(getAvatar(k + 1));
  }

  var getFeatures = function (mas) {
    var masLength = getRandom(1, mas.length);
    var a = [];
    for (var t = 0; t < masLength; t++) {
      a.push(mas[t]);
    }
    return a;
  };

  var TITLE = ['Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде', 'Некрасивый негостеприимный домик', 'Красивый гостевой домик', 'Маленький ужасный дворец', 'Огромный прекрасный дворец', 'Маленькая неуютная квартира', 'Большая уютная квартира'];
  var PRICE = getRandom(1000, 1000000);
  var TYPE = ['bungalo', 'house', 'flat'];
  var ROOMS = getRandom(1, 5);
  var GUESTS = getRandom(1, 10);
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = '';
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var offers = [];

  for (var index = 0; index < 8; index++) {

    var locationX = getRandom(300, 900);
    var locationY = getRandom(150, 500);
    var typeIndex = getRandom(0, 2);
    var chechinIndex = getRandom(0, 2);
    var checkoutIndex = getRandom(0, 2);

    offers.push({
      author: {
        avatar: avatars[index]
      },
      offer: {
        title: TITLE[index],
        address: getAddress(locationX, locationY),
        price: PRICE,
        type: TYPE[typeIndex],
        rooms: ROOMS,
        guests: GUESTS,
        checkin: CHECKIN[chechinIndex],
        checkout: CHECKOUT[checkoutIndex],
        features: getFeatures(FEATURES),
        description: DESCRIPTION,
        photos: getRandomOrder(PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return offers;

};


var fragment = document.createDocumentFragment();
var map = document.querySelector('.map__pins');

var drawPin = function (mas) {
  for (var i = 0; i < mas.length; i++) {
    var newPin = document.createElement('button');
    var EL_WIDTH = 50;
    var EL_HEIGHT = 70;
    var elX = mas[i].location.x - EL_WIDTH / 2;
    var elY = mas[i].location.y - EL_HEIGHT;
    var elAva = mas[i].author.avatar;

    newPin.className = 'map__pin';
    newPin.setAttribute('style', 'left:' + elX + 'px; top:' + elY + 'px;');
    newPin.innerHTML = '<img src=' + elAva + ' width="40" height="40" draggable="false">';

    fragment.appendChild(newPin);
  }

  map.appendChild(fragment);
};

var fillDialog = function (index) {
  var template = document.querySelector('template').content.querySelector('.map__card');

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


  lodgeTitle.textContent = offers[index].offer.title;
  lodgeAddress.textContent = offers[index].offer.address;
  lodgePrice.innerHTML = offers[index].offer.price + '&#x20bd;/ночь';

  if (offers[index].offer.type === 'flat') {
    lodgeType.textContent = 'Квартира';
  } else if (offers[index].offer.type === 'bungalo') {
    lodgeType.textContent = 'Бунгало';
  } else {
    lodgeType.textContent = 'Дом';
  }

  if ((offers[index].offer.guests === 1) && (offers[index].offer.rooms === 1)) {
    lodgeRoomsGuests.textContent = offers[index].offer.rooms + ' комната для ' + offers[index].offer.guests + ' гостя';
  } else if (offers[index].offer.guests === 1) {
    lodgeRoomsGuests.textContent = offers[index].offer.rooms + ' комнаты для ' + offers[index].offer.guests + ' гостя';
  } else if (offers[index].offer.rooms === 1) {
    lodgeRoomsGuests.textContent = offers[index].offer.rooms + ' комната для ' + offers[index].offer.guests + ' гостей';
  } else {
    lodgeRoomsGuests.textContent = offers[index].offer.rooms + ' комнаты для ' + offers[index].offer.guests + ' гостей';
  }

  lodgeCheck.textContent = 'Заезд после ' + offers[index].offer.checkin + ', выезд до ' + offers[index].offer.checkout + '';

  lodgeFeatures.innerHTML = '';

  for (var j = 0; j < offers[index].offer.features.length; j++) {
    var feature = '<span class="feature__image feature__image--' + offers[index].offer.features[j] + '"></span>';
    lodgeFeatures.innerHTML += feature;
  }

  lodgeDescr.textContent = offers[index].offer.description;

  for (var n = 0; n < offers[index].offer.photos.length; n++) {
    var photo = lodgePhotos.children[0].cloneNode();
    photo.innerHTML = '<img src="' + offers[index].offer.photos[n] + '"></li>';
    lodgePhotos.appendChild(photo);
  }

  var lodgePhotosEls = lodgePhotos.querySelectorAll('li');
  lodgePhotos.removeChild(lodgePhotosEls[0]);

  lodgeAva.setAttribute('src', offers[index].author.avatar);

  map.insertAdjacentElement('afterend', template);
};


var offers = fillData();

drawPin(offers);

fillDialog(0);
