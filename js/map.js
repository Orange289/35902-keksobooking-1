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
    return x + ', ' + y;
  };

  var getAvatar = function (num) {
    return (num > 9) ? 'img/avatars/user' + num + '.png' : 'img/avatars/user0' + num + '.png';
  };

  var avatars = [];

  for (var k = 0; k < 8; k++) {
    avatars.push(getAvatar(k + 1));
  }

  var getFeatures = function (mas) {
    var randomMas = getRandomOrder(mas);
    var masLength = getRandom(1, mas.length);
    var a = [];
    for (var t = 0; t < masLength; t++) {
      a.push(randomMas[t]);
    }
    return a;
  };

  var TITLES = ['Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде', 'Некрасивый негостеприимный домик', 'Красивый гостевой домик', 'Маленький ужасный дворец', 'Огромный прекрасный дворец', 'Маленькая неуютная квартира', 'Большая уютная квартира'];
  var randomTitles = getRandomOrder(TITLES);
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var TYPES = ['bungalo', 'house', 'flat'];
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
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
    var titleIndex = getRandom(0, 7);
    var checkinIndex = getRandom(0, 2);
    var checkoutIndex = getRandom(0, 2);

    offers.push({
      author: {
        avatar: avatars[index]
      },
      offer: {
        title: randomTitles[titleIndex],
        address: getAddress(locationX, locationY),
        price: getRandom(PRICE_MIN, PRICE_MAX),
        type: TYPES[typeIndex],
        rooms: getRandom(ROOMS_MIN, ROOMS_MAX),
        guests: getRandom(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECKIN[checkinIndex],
        checkout: CHECKOUT[checkoutIndex],
        features: getFeatures(FEATURES),
        description: DESCRIPTION,
        photos: [].concat(getRandomOrder(PHOTOS))
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


  switch (offers[index].offer.type) {
    case 'flat' :
      lodgeType.textContent = 'Квартира';
      break;
    case 'bungalo' :
      lodgeType.textContent = 'Бунгало';
      break;
    default :
      lodgeType.textContent = 'Дом';
  }

  var guestsVal;
  var roomsVal;

  switch (offers[index].offer.guests) {
    case 1 :
      guestsVal = ' гостя';
      break;
    default :
      guestsVal = ' гостей';
  }

  switch (offers[index].offer.rooms) {
    case 1:
      roomsVal = ' комната для ';
      break;
    case 5:
      roomsVal = ' комнат для ';
      break;
    default:
      roomsVal = ' комнаты для ';
  }

  lodgeRoomsGuests.textContent = offers[index].offer.rooms + roomsVal + offers[index].offer.guests + guestsVal;

  lodgeCheck.textContent = 'Заезд после ' + offers[index].offer.checkin + ', выезд до ' + offers[index].offer.checkout + '';

  lodgeFeatures.innerHTML = '';

  for (var j = 0; j < offers[index].offer.features.length; j++) {
    var feature = '<span class="feature__image feature__image--' + offers[index].offer.features[j] + '"></span>';
    lodgeFeatures.innerHTML += feature;
  }

  lodgeDescr.textContent = offers[index].offer.description;

  for (var n = 0; n < offers[index].offer.photos.length; n++) {
    var photo = lodgePhotos.children[0].cloneNode();
    photo.innerHTML = '<img src="' + offers[index].offer.photos[n] + '" width="40" height="40">';
    lodgePhotos.appendChild(photo);
  }

  var lodgePhotosEls = lodgePhotos.querySelectorAll('li');
  lodgePhotos.removeChild(lodgePhotosEls[0]);

  lodgeAva.setAttribute('src', offers[index].author.avatar);

  map.insertAdjacentElement('afterend', template);
};


var offers = fillData();

document.querySelector('.map').classList.remove('map--faded');

drawPin(offers);

fillDialog(0);
