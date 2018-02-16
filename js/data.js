'use strict';

(function () {
  window.offers = [];

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
    var randomMas = window.util.getRandomOrder(mas);
    var masLength = window.util.getRandom(1, mas.length);
    var a = [];
    for (var t = 0; t < masLength; t++) {
      a.push(randomMas[t]);
    }
    return a;
  };

  var TITLES = ['Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде', 'Некрасивый негостеприимный домик', 'Красивый гостевой домик', 'Маленький ужасный дворец', 'Огромный прекрасный дворец', 'Маленькая неуютная квартира', 'Большая уютная квартира'];
  var randomTitles = window.util.getRandomOrder(TITLES);
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

  for (var index = 0; index < 8; index++) {

    var locationX = window.util.getRandom(300, 900);
    var locationY = window.util.getRandom(150, 500);
    var typeIndex = window.util.getRandom(0, 2);
    var titleIndex = window.util.getRandom(0, 7);
    var checkinIndex = window.util.getRandom(0, 2);
    var checkoutIndex = window.util.getRandom(0, 2);

    window.offers.push({
      author: {
        avatar: avatars[index]
      },
      offer: {
        title: randomTitles[titleIndex],
        address: getAddress(locationX, locationY),
        price: window.util.getRandom(PRICE_MIN, PRICE_MAX),
        type: TYPES[typeIndex],
        rooms: window.util.getRandom(ROOMS_MIN, ROOMS_MAX),
        guests: window.util.getRandom(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECKIN[checkinIndex],
        checkout: CHECKOUT[checkoutIndex],
        features: getFeatures(FEATURES),
        description: DESCRIPTION,
        photos: [].concat(window.util.getRandomOrder(PHOTOS))
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

})();
