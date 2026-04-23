sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.Dashboard", {

    onInit: function () {

      var oRouter = this.getOwnerComponent().getRouter();

      // Trigger when dashboard loads
      oRouter.getRoute("dashboard").attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function () {
      this.updateKPI();
    },

    // 🔥 FIXED KPI LOGIC (OData)
    updateKPI: function () {

      var oModel = this.getOwnerComponent().getModel();

      var that = this;

      oModel.read("/Requests", {
        success: function (oData) {

          var requests = oData.results || [];

          var total = requests.length;
          var pending = 0;
          var approved = 0;
          var rejected = 0;

          requests.forEach(function (req) {
            if (req.status === "Submitted") pending++;
            else if (req.status === "Approved") approved++;
            else if (req.status === "Rejected") rejected++;
          });

          // 🔥 Set KPI to view model
          var oViewModel = new sap.ui.model.json.JSONModel({
            total: total,
            pending: pending,
            approved: approved,
            rejected: rejected
          });

          that.getView().setModel(oViewModel, "kpi");
        },
        error: function () {
          console.log("Failed to load KPI data");
        }
      });
    },

    onEmployee: function () {
      this.getOwnerComponent().getRouter().navTo("employee");
    },

    onManager: function () {
      this.getOwnerComponent().getRouter().navTo("manager");
    },

    onFinance: function () {
      this.getOwnerComponent().getRouter().navTo("finance");
    }

  });
});