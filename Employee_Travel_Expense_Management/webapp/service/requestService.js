sap.ui.define([], function () {
  "use strict";

  return {

    createRequest: function (oModel, data) {
      return new Promise(function (resolve, reject) {
        oModel.create("/Requests", data, {
          success: resolve,
          error: reject
        });
      });
    },

    updateRequest: function (oModel, path, data) {
      return new Promise(function (resolve, reject) {
        oModel.update(path, data, {
          success: resolve,
          error: reject
        });
      });
    }

  };
});