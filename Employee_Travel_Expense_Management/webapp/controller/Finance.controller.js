sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
     "ui5/walkthrough/model/formatter"
], function (Controller, Filter, FilterOperator, MessageToast,formatter) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.Finance", {
formatter: formatter,
        onInit: function () {
             
            // Wait until table is rendered, then apply filter
            this.getView().addEventDelegate({
                onAfterRendering: this._applyApprovedFilter.bind(this)
            });
        },

        // 🔒 Only Approved
        _applyApprovedFilter: function () {
            var oTable = this.byId("financeTable");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                var oFilter = new Filter("status", FilterOperator.EQ, "Approved");
                oBinding.filter([oFilter]);
            }
        },

        // 🔍 Filter
        onFilter: function () {

            var oView = this.getView();
            var oBinding = this.byId("financeTable").getBinding("items");

            if (!oBinding) {
                MessageToast.show("Table not ready");
                return;
            }

            var aFilters = [];

            var fromDate = oView.byId("fromDate").getValue();
            var toDate = oView.byId("toDate").getValue();
            var empId = oView.byId("empIdFilter").getValue();
            var amount = oView.byId("amountFilter").getValue();

            if (empId) {
                aFilters.push(new Filter("empId", FilterOperator.EQ, empId));
            }

            if (amount) {
                aFilters.push(new Filter("amount", FilterOperator.EQ, amount));
            }

            if (fromDate && toDate) {
                aFilters.push(new Filter("date", FilterOperator.BT, fromDate, toDate));
            }

            // ALWAYS Approved
            aFilters.push(new Filter("status", FilterOperator.EQ, "Approved"));

            oBinding.filter(aFilters);

            MessageToast.show("Filters applied");
        },

        // 🔄 Reset
        onReset: function () {

            var oView = this.getView();

            oView.byId("fromDate").setValue("");
            oView.byId("toDate").setValue("");
            oView.byId("empIdFilter").setValue("");
            oView.byId("amountFilter").setValue("");

            this._applyApprovedFilter();

            MessageToast.show("Filters reset");
        }

    });
});