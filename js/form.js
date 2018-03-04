'use strict';

(function () {
  window.formAddress = window.util.noticeForm.elements.address;
  var formTitle = window.util.noticeForm.elements.title;
  var formType = window.util.noticeForm.elements.type;
  var formPrice = window.util.noticeForm.elements.price;
  var formTimeIn = window.util.noticeForm.elements.timein;
  var formTimeOut = window.util.noticeForm.elements.timeout;
  var formRooms = window.util.noticeForm.elements.room_number;
  var formCapacity = window.util.noticeForm.elements.capacity;
  var formSubmitBtn = window.util.noticeForm.querySelector('.form__submit');
  var formReset = window.util.noticeForm.querySelector('.form__reset');

  // VALIDATION

  window.formAddress.style.cursor = 'default';

  var onResetClick = function () {
    window.util.map.classList.add('map--faded');
    window.state.resetPage();
    window.setFormAddress(window.util.pinMain);
    window.pins.removePins();
    window.removeDialog();

    window.util.pinMain.addEventListener('mouseup', window.onPinMainMouseup);
  };

  formReset.addEventListener('click', onResetClick);

  var minPrice = [0, 1000, 5000, 10000];
  var roomsGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var getTimeOut = function () {
    var timeSelIndex = formTimeIn.selectedIndex;
    formTimeOut.selectedIndex = timeSelIndex;
  };

  var getTimeIn = function () {
    var timeSelIndex = formTimeOut.selectedIndex;
    formTimeIn.selectedIndex = timeSelIndex;
  };

  formTimeIn.onchange = getTimeOut;
  formTimeOut.onchange = getTimeIn;

  var getMinPrice = function () {
    var typeSelIndex = formType.selectedIndex;
    formPrice.setAttribute('min', minPrice[typeSelIndex]);
    formPrice.setAttribute('placeholder', minPrice[typeSelIndex]);
  };

  formType.onchange = getMinPrice;

  var getGuestsNumber = function () {
    for (var key in roomsGuests) {
      if (formRooms.value === key) {

        for (var i = 0; i < formCapacity.options.length; i++) {
          formCapacity.options[i].removeAttribute('disabled');
          if (roomsGuests[key].indexOf(formCapacity.options[i].value) === -1) {
            formCapacity.options[i].setAttribute('disabled', '');
            formCapacity.value = roomsGuests[key][0];
          }
        }

      }
    }
  };

  getGuestsNumber();
  formRooms.onchange = getGuestsNumber;

  var setInvalidBorder = function (element) {
    element.setAttribute('style', 'border: 2px solid red;');
  };

  var setNormalBorder = function (element) {
    element.setAttribute('style', 'border: 1px solid #d9d9d3;');
  };

  var isTitleValid = false;
  var isPriceValid = false;

  var onTitleValidate = function () {
    isTitleValid = false;
    if (formTitle.validity.valueMissing) {
      formTitle.setCustomValidity('Не забудьте ввести название!');
      setInvalidBorder(formTitle);
    } else if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity('Слишком короткое название, наберите хотя бы 30 символов!');
      setInvalidBorder(formTitle);
    } else {
      isTitleValid = true;
      formTitle.setCustomValidity('');
      setNormalBorder(formTitle);
    }

  };

  var onPriceValidate = function () {
    isPriceValid = false;
    if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity('Не забудьте ввести цену!');
      setInvalidBorder(formPrice);
    } else if (formPrice.validity.rangeUnderflow) {
      formPrice.setCustomValidity('Для этого типа жилья цена должна быть больше');
      setInvalidBorder(formPrice);
    } else if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity('Ну Вы размахнулись! Максимальная цена - всего лишь млн :)');
      setInvalidBorder(formPrice);
    } else {
      isPriceValid = true;
      formPrice.setCustomValidity('');
      setNormalBorder(formPrice);
    }

  };

  var successHandler = function () {
    window.state.resetPage();
    window.pins.removePins();
  };

  var validate = function () {
    onTitleValidate();
    onPriceValidate();
  };

  formTitle.addEventListener('invalid', onTitleValidate);
  formPrice.addEventListener('invalid', onPriceValidate);

  var onSubmitClick = function (evt) {
    validate();
    if (isTitleValid && isPriceValid) {
      window.backend.upload(new FormData(window.util.noticeForm), successHandler, window.backend.onError);
      evt.preventDefault();
    }

  };

  formSubmitBtn.addEventListener('click', onSubmitClick);

})();
