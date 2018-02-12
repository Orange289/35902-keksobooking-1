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
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var PIN_WIDTH = 62;
var PIN_HEIGHT = 84;
var START_PIN_HEIGHT = 62;

var drawPins = function (mas) {
  for (var i = 0; i < mas.length; i++) {
    var newPin = document.createElement('button');
    var elX = mas[i].location.x - PIN_WIDTH / 2;
    var elY = mas[i].location.y - PIN_HEIGHT;
    var elAva = mas[i].author.avatar;

    newPin.className = 'map__pin map__pin--similar';
    newPin.setAttribute('style', 'left:' + elX + 'px; top:' + elY + 'px;');
    newPin.setAttribute('data-index', i);
    newPin.innerHTML = '<img src=' + elAva + ' width="40" height="40" draggable="false">';

    fragment.appendChild(newPin);
  }

  mapPins.appendChild(fragment);
};

var fillDialog = function (index) {
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


  lodgeTitle.textContent = offers[index].offer.title;
  lodgeAddress.textContent = offers[index].offer.address;
  lodgePrice.innerHTML = offers[index].offer.price + '&#x20bd;/ночь';


  switch (offers[index].offer.type) {
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

  switch (offers[index].offer.guests) {
    case 1:
      guestsVal = ' гостя';
      break;
    default:
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

  mapPins.insertAdjacentElement('afterend', template);
};


var nf = document.querySelector('.notice__form');
var nfFieldset = document.querySelectorAll('fieldset');
var nfTitle = nf.elements.title;
var nfAddress = nf.elements.address;
var nfType = nf.elements.type;
var nfPrice = nf.elements.price;
var nfTimeIn = nf.elements.timein;
var nfTimeOut = nf.elements.timeout;
var nfRooms = nf.elements.room_number;
var nfCapacity = nf.elements.capacity;
var nfSubmitBtn = nf.querySelector('.form__submit');
var nfReset = nf.querySelector('.form__reset');

var isPageActive = false;

var resetPage = function () {
  isPageActive = false;
  nf.classList.add('notice__form--disabled');

  for (var i = 0; i < nfFieldset.length; i++) {
    nfFieldset[i].setAttribute('disabled', '');
  }

  nf.reset();
};

resetPage();

var pinMain = mapPins.querySelector('.map__pin--main');
var offers = fillData();

var setPageActive = function () {
  document.querySelector('.map').classList.remove('map--faded');

  drawPins(offers);
  fillDialog(0);

  nf.classList.remove('notice__form--disabled');

  for (var i = 0; i < nfFieldset.length; i++) {
    nfFieldset[i].removeAttribute('disabled');
  }

  isPageActive = true;
};


var setFormAddress = function (el) {
  var x;
  var y;

  if (isPageActive) {
    x = el.offsetLeft + PIN_WIDTH / 2;
    y = el.offsetTop + PIN_HEIGHT;
  } else {
    x = el.offsetLeft + PIN_WIDTH / 2;
    y = el.offsetTop + START_PIN_HEIGHT / 2;
  }

  nfAddress.value = x + ', ' + y;
};

setFormAddress(pinMain);

var onPinMainMouseup = function () {
  setPageActive();
  setFormAddress(pinMain);
  pinMain.removeEventListener('mouseup', onPinMainMouseup);
  document.addEventListener('keydown', onEscPress);
};

pinMain.addEventListener('mouseup', onPinMainMouseup);

var onPinClick = function (evt) {
  var clickedElement = null;

  if (evt.target.classList.contains('map__pin--similar')) {
    clickedElement = evt.target;
  } else if (evt.target.parentElement.classList.contains('map__pin--similar')) {
    clickedElement = evt.target.parentElement;
  } else {
    return;
  }

  var oldMapCard = map.querySelector('.map__card');
  if (oldMapCard) {
    map.removeChild(oldMapCard);
  }
  fillDialog(clickedElement.dataset.index);

  document.addEventListener('keydown', onEscPress);
};

mapPins.addEventListener('click', onPinClick);

// VALIDATION

var removePins = function (mas) {
  var pin = mapPins.querySelectorAll('.map__pin--similar');

  for (var i = 0; i < mas.length; i++) {
    mapPins.removeChild(pin[i]);
  }
};

nfReset.addEventListener('click', function () {
  var dialog = map.querySelector('.map__card');
  map.classList.add('map--faded');
  resetPage();
  setFormAddress(pinMain);
  removePins(offers);

  if (dialog) {
    dialog.remove();
  }
  pinMain.addEventListener('mouseup', onPinMainMouseup);
});

var minPrice = [0, 1000, 5000, 10000];
var roomsGuests = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var getTimeOut = function () {
  var timeSelIndex = nfTimeIn.selectedIndex;
  nfTimeOut.selectedIndex = timeSelIndex;
};

var getTimeIn = function () {
  var timeSelIndex = nfTimeOut.selectedIndex;
  nfTimeIn.selectedIndex = timeSelIndex;
};

nfTimeIn.onchange = getTimeOut;
nfTimeOut.onchange = getTimeIn;

var getMinPrice = function () {
  var typeSelIndex = nfType.selectedIndex;
  nfPrice.setAttribute('min', minPrice[typeSelIndex]);
  nfPrice.setAttribute('placeholder', minPrice[typeSelIndex]);
};

nfType.onchange = getMinPrice;

var getGuestsNumber = function () {
  for (var key in roomsGuests) {
    if (nfRooms.value === key) {
      nfCapacity.value = roomsGuests[key][0];

      for (var i = 0; i < nfCapacity.options.length; i++) {
        nfCapacity.options[i].removeAttribute('disabled');
        if (roomsGuests[key].indexOf(nfCapacity.options[i].value) === -1) {
          nfCapacity.options[i].setAttribute('disabled', '');
        }
      }

    }
  }
};

var getRoomsNumber = function () {
  for (var key in roomsGuests) {
    if (roomsGuests[key].indexOf(nfCapacity.value) > -1) {
      nfRooms.value = key;
    }
  }
};

nfRooms.onchange = getGuestsNumber;
nfCapacity.onchange = getRoomsNumber;

var setInvalidBorder = function (el) {
  el.setAttribute('style', 'border: 2px solid red;');
};

var setNormalBorder = function (el) {
  el.setAttribute('style', 'border: 1px solid #d9d9d3;');
};

var setTitleValidation = function () {

  if (nfTitle.validity.valueMissing) {
    nfTitle.setCustomValidity('Не забудьте ввести название!');
    setInvalidBorder(nfTitle);
  } else if (nfTitle.validity.tooShort) {
    nfTitle.setCustomValidity('Слишком короткое название, наберите хотя бы 30 символов!');
    setInvalidBorder(nfTitle);
  } else if (nfTitle.validity.tooLong) {
    nfTitle.setCustomValidity('Ну Вы размахнулись! Давайте сократим до 100 символов :)');
    setInvalidBorder(nfTitle);
  } else {
    nfTitle.setCustomValidity('');
    setNormalBorder(nfTitle);
  }

};

var setPriceValidation = function () {

  if (nfPrice.validity.valueMissing) {
    nfPrice.setCustomValidity('Не забудьте ввести цену!');
    setInvalidBorder(nfPrice);
  } else if (nfPrice.validity.tooShort) {
    nfPrice.setCustomValidity('Для этого типа жилья цена должна быть больше');
    setInvalidBorder(nfPrice);
  } else if (nfPrice.validity.tooLong) {
    nfPrice.setCustomValidity('Ну Вы размахнулись! Максимальная цена - всего лишь млн :)');
    setInvalidBorder(nfPrice);
  } else {
    nfPrice.setCustomValidity('');
    setNormalBorder(nfPrice);
  }

};

nfSubmitBtn.addEventListener('click', function () {
  nfTitle.addEventListener('invalid', setTitleValidation());
  nfPrice.addEventListener('invalid', setPriceValidation());
});

// close dialog

var KEY_ENTER = 13;
var KEY_ESC = 27;

var closeDialog = function () {
  var dialog = map.querySelector('.map__card');

  map.removeChild(dialog);
  document.removeEventListener('keydown', onEscPress);
};

var closeDialogOnClick = function (evt) {

  if ((evt.target.className === 'popup__close') || (evt.target.children.className === 'popup__close')) {
    closeDialog();
  }

};

map.addEventListener('click', closeDialogOnClick);

var onEscPress = function (evt) {
  if (evt.keyCode === KEY_ESC) {
    closeDialog();
  }
};

map.addEventListener('keydown', function (evt) {
  var dialog = map.querySelector('.map__card');

  if (evt.keykode === KEY_ENTER) {
    map.removeChild(dialog);
    document.removeEventListener('keydown', onEscPress);
  }
});

