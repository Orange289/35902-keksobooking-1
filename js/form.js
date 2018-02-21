'use strict';

(function () {
  window.nf = document.querySelector('.notice__form');

  window.nfAddress = window.nf.elements.address;
  window.nfFieldset = window.nf.querySelectorAll('fieldset');
  var nfTitle = window.nf.elements.title;
  var nfType = window.nf.elements.type;
  var nfPrice = window.nf.elements.price;
  var nfTimeIn = window.nf.elements.timein;
  var nfTimeOut = window.nf.elements.timeout;
  var nfRooms = window.nf.elements.room_number;
  var nfCapacity = window.nf.elements.capacity;
  var nfSubmitBtn = window.nf.querySelector('.form__submit');
  var nfReset = window.nf.querySelector('.form__reset');

  // VALIDATION


  nfReset.addEventListener('click', function () {
    var dialog = window.util.map.querySelector('.map__card');
    window.util.map.classList.add('map--faded');
    window.resetPage();
    window.setFormAddress(window.pinMain);
    window.removePins(window.offers);

    if (dialog) {
      dialog.remove();
    }
    window.pinMain.addEventListener('mouseup', window.onPinMainMouseup);
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
    } else {
      nfTitle.setCustomValidity('');
      setNormalBorder(nfTitle);
    }

  };

  var setPriceValidation = function () {

    if (nfPrice.validity.valueMissing) {
      nfPrice.setCustomValidity('Не забудьте ввести цену!');
      setInvalidBorder(nfPrice);
    } else if (nfPrice.validity.rangeUnderflow) {
      nfPrice.setCustomValidity('Для этого типа жилья цена должна быть больше');
      setInvalidBorder(nfPrice);
    } else if (nfPrice.validity.rangeOverflow) {
      nfPrice.setCustomValidity('Ну Вы размахнулись! Максимальная цена - всего лишь млн :)');
      setInvalidBorder(nfPrice);
    } else {
      nfPrice.setCustomValidity('');
      setNormalBorder(nfPrice);
    }

  };

  nfSubmitBtn.addEventListener('click', function (evt) {
    nfTitle.addEventListener('invalid', setTitleValidation());
    nfPrice.addEventListener('invalid', setPriceValidation());

    window.upload(new FormData(window.nf), function () {
      window.nf.reset();
    });

    evt.preventDefault();

  });

})();
