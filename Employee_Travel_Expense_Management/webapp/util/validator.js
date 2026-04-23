sap.ui.define([], function () {
  "use strict";

  return {
    validateForm: function (data) {

      if (!data.destination) return "Destination required";
      if (!data.amount || data.amount <= 0) return "Invalid amount";
      if (!data.purpose) return "Purpose required";

      return null;
    }
  };
});