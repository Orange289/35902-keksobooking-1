'use strict';

(function () {

  window.data = {

    successHandler: function (offersLoaded) {
      window.data.offers = offersLoaded.slice(0);
      window.pins.drawPins(offersLoaded);
    }

  };

})();
