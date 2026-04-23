sap.ui.define([], function () {
  "use strict";

  return {

    statusText: function (status) {
      if (!status) return "";

      switch (status) {
        case "Approved":
          return "Approved";
        case "Rejected":
          return "Rejected";
        case "Submitted":
          return "Pending";
        case "Draft":
          return "Draft";
        default:
          return status;
      }
    },

    statusState: function (status) {
      switch (status) {
        case "Approved":
          return "Success";
        case "Rejected":
          return "Error";
        case "Submitted":
          return "Warning";
        default:
          return "None";
      }
    }

  };
});