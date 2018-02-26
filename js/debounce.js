'use strict';

(function () {
  var DEBOUNCE_TIME = 100;

  var lastTimeOut;
  window.debounce = function (action) {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }
    lastTimeOut = window.setTimeout(action, DEBOUNCE_TIME);
  };
})();
