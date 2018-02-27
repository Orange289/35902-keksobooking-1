'use strict';

(function () {
  window.nfAddress = window.util.nf.elements.address;
  var nfTitle = window.util.nf.elements.title;
  var nfType = window.util.nf.elements.type;
  var nfPrice = window.util.nf.elements.price;
  var nfTimeIn = window.util.nf.elements.timein;
  var nfTimeOut = window.util.nf.elements.timeout;
  var nfRooms = window.util.nf.elements.room_number;
  var nfCapacity = window.util.nf.elements.capacity;
  var nfSubmitBtn = window.util.nf.querySelector('.form__submit');
  var nfReset = window.util.nf.querySelector('.form__reset');

  // VALIDATION

  window.nfAddress.style.cursor = 'default';

  nfReset.addEventListener('click', function () {
    window.util.map.classList.add('map--faded');
    window.resetPage();
    window.setFormAddress(window.util.pinMain);
    window.removePins();
    window.removeDialog();

    window.util.pinMain.addEventListener('mouseup', window.onPinMainMouseup);
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

  var successHandler = function () {
    window.resetPage();
  };

  var onSubmitClick = function (evt) {
    nfTitle.addEventListener('invalid', setTitleValidation());
    nfPrice.addEventListener('invalid', setPriceValidation());

    window.backend.upload(new FormData(window.nf), successHandler, window.backend.onError);
    evt.preventDefault();
  };

  nfSubmitBtn.addEventListener('click', onSubmitClick);

})();
