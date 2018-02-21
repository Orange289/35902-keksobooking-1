'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/';

  var requestFunction = function (type, url, data, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open(type, url);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          success(xhr.response);
          break;
        case 400:
          error('Неправильный запрос');
          break;
        case 404:
          error('Запрашиваемый ресурс не найден');
          break;
        case 301:
          error('Ресурс переехал НАВСЕГДА');
          break;
        case 307:
          error('Ресурс временно переехал');
          break;
        default:
          error('Неизвестная ошибка!');
      }
    });

    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });

    xhr.timeout = 0;

    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за' + xhr.timeout + 'мс');
    });

    xhr.send(data);

  };

  window.backend = {

    load: function (onLoad, onError) {
      requestFunction('GET', URL + 'data', '', onLoad, onError);
    },

    upload: function (data, onLoad, onError) {
      requestFunction('GET', URL, data, onLoad, onError);
    },

    onError: function (errorMessage) {
      var node = document.createElement('div');
      node.className = 'error-msg';
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; padding: 10px;';
      node.style.position = 'fixed';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '16px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);

      setTimeout(function () {
        document.querySelector('.error-msg').style.display = 'none';
      }, 2000);
    }

  };

})();
