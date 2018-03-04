'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/';

  var requestFunction = function (type, url, data, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open(type, url);

    var onContentLoad = function () {
      switch (xhr.status) {
        case window.util.StatusCodes.SUCCESS:
          success(xhr.response);
          break;
        case window.util.StatusCodes.WRONG_REQUEST:
          error('Неправильный запрос');
          break;
        case window.util.StatusCodes.NOT_FOUND:
          error('Запрашиваемый ресурс не найден');
          break;
        case window.util.StatusCodes.MOVED_PERMANENTLY:
          error('Ресурс переехал НАВСЕГДА');
          break;
        case window.util.StatusCodes.MOVED_TEMPORARY:
          error('Ресурс временно переехал');
          break;
        default:
          error('Неизвестная ошибка!');
      }
    };

    var onContentConnectionError = function () {
      error('Произошла ошибка соединения');
    };

    xhr.timeout = 10000;


    var onContentTimeoutError = function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    };


    xhr.addEventListener('load', onContentLoad);

    xhr.addEventListener('error', onContentConnectionError);

    xhr.addEventListener('timeout', onContentTimeoutError);

    xhr.send(data);

  };

  window.backend = {

    load: function (onLoad, onError) {
      requestFunction('GET', URL + 'data', '', onLoad, onError);
    },

    upload: function (data, onLoad, onError) {
      requestFunction('POST', URL, data, onLoad, onError);
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
