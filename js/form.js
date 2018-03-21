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

  var resetPage = function () {
    window.util.map.classList.add('map--faded');
    window.state.setPageInactive();
    window.setFormAddress(window.util.pinMain);
    window.pins.removePins();
    window.removeDialog();

    window.util.pinMain.addEventListener('mouseup', window.onPinMainMouseup);
  };

  var onResetClick = function () {
    resetPage();
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
    resetPage();
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

  // Photos uploading

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avaChooser = window.util.noticeForm.elements.avatar;
  var avaPreview = window.util.noticeForm.querySelector('.notice__preview img');
  var offersChooser = window.util.noticeForm.elements.images;
  var offersContainer = window.util.noticeForm.querySelector('.form__photo-container');



  var onImageChange = function (evt) {
    var file;
    var reader;
    var fileName;
    var fileNames = [];

    switch (evt.target) {
      case avaChooser:
        file = avaChooser.files[0];
        fileName = file.name.toLowerCase();
        break;
      case offersChooser:
        var files = offersChooser.files;
        for (var i = 0; i < files.length; i++) {
          file = files[i];
          fileName = file.name.toLowerCase();
          fileNames.push(fileName);
        }
        break;
    }


    var matches = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    if (evt.target === avaChooser) {
      if (matches) {
        reader = new FileReader();

        reader.addEventListener('load', function () {
          avaPreview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    } else if (evt.target === offersChooser) {
      for (var j = 0; j < files.length; j++) {
        if (matches) {
          reader = new FileReader();

          var offerPreviewDiv = document.createElement('img');
          offerPreviewDiv.className = 'form__photo';

          offersContainer.insertAdjacentElement('beforeend', offerPreviewDiv);
          reader.addEventListener('load', function () {
            offerPreviewDiv.src = reader.result;
          });

          reader.readAsDataURL(files[j]);

        }
      }
    }

  };

  avaChooser.addEventListener('change', onImageChange);
  offersChooser.addEventListener('change', onImageChange);

})();
