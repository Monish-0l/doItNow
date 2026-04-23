// sap.ui.define([
//   "sap/ui/core/mvc/Controller",
//   "sap/m/MessageToast"
// ], function (Controller, MessageToast) {
//   "use strict";

//   return Controller.extend("ui5.walkthrough.controller.Manager", {

//     onInit: function () {},

//     // ✅ APPROVE
//     onApprove: function (oEvent) {
//       this._selectedContext = oEvent.getSource()
//         .getParent()
//         .getParent()
//         .getBindingContext();

//       this._actionType = "Approved";
//       this._openDialog();
//     },

//     // ✅ REJECT
//     onReject: function (oEvent) {
//       this._selectedContext = oEvent.getSource()
//         .getParent()
//         .getParent()
//         .getBindingContext();

//       this._actionType = "Rejected";
//       this._openDialog();
//     },

//     // ✅ OPEN DIALOG
//     _openDialog: function () {
//       if (!this._dialog) {
//         this._dialog = sap.ui.xmlfragment(
//           "ui5.walkthrough.view.fragment.RemarkDialog",
//           this
//         );
//         this.getView().addDependent(this._dialog);
//       }
//       this._dialog.open();
//     },

//     // ✅ CLOSE DIALOG
//     onCloseDialog: function () {
//       this._dialog.close();
//     },

//     // 🔥 MAIN FIXED FUNCTION
//   onConfirmAction: function () {

//   var oModel = this.getOwnerComponent().getModel();
//   var remarks = sap.ui.getCore().byId("remarkInput").getValue();

//   var oContext = this._selectedContext;
//   var sPath = oContext.getPath();

//   // 🔥 GET FULL EXISTING DATA
//   var oExistingData = oContext.getObject();

//   // 🔥 MERGE DATA (IMPORTANT)
//   var oData = {
//     empId: oExistingData.empId,
//     startdate: oExistingData.startdate,
//     enddate: oExistingData.enddate,
//     amount: oExistingData.amount,
//     destination: oExistingData.destination,
//     status: this._actionType,
//     remarks: remarks
//   };

//   var that = this;

//   oModel.update(sPath, oData, {
//     success: function () {
//       MessageToast.show(that._actionType + " successful");

//       oModel.refresh(true);

//       sap.ui.getCore().byId("remarkInput").setValue("");

//       that._dialog.close();

//       that.getOwnerComponent().getRouter().navTo("dashboard");
//     },
//     error: function () {
//       MessageToast.show("Update failed");
//     }
//   });
// },

//     // ✅ BULK APPROVE
//     onBulkApprove: function () {
//       var items = this.byId("list").getSelectedItems();

//       items.forEach(function (item) {
//         var obj = item.getBindingContext().getObject();
//         obj.status = "Approved";
//       });

//       this.getOwnerComponent().getModel().refresh();
//     },

//     // ✅ SHOW ONLY PENDING
//     onAfterRendering: function () {
//       var oBinding = this.byId("list").getBinding("items");

//       if (oBinding) {
//         var oFilter = new sap.ui.model.Filter(
//           "status",
//           sap.ui.model.FilterOperator.EQ,
//           "Submitted"
//         );
//         oBinding.filter([oFilter]);
//       }
//     }

//   });
// });

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
 "ui5/walkthrough/model/formatter"
], function (Controller, MessageToast, Filter, FilterOperator,formatter) {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.Manager", {
 formatter: formatter,
    onInit: function () {
      this._applyFilter(); // apply filter on load
    },

    // 🔍 FILTER ONLY SUBMITTED REQUESTS
    _applyFilter: function () {
      var oList = this.byId("list");

      if (oList) {
        var oBinding = oList.getBinding("items");

        if (oBinding) {
          var oFilter = new Filter("status", FilterOperator.EQ, "Submitted");
          oBinding.filter([oFilter]);
        }
      }
    },

    // ✅ APPROVE
    onApprove: function (oEvent) {
      this._setContext(oEvent);
      this._actionType = "Approved";
      this._openDialog();
    },

    // ❌ REJECT
    onReject: function (oEvent) {
      this._setContext(oEvent);
      this._actionType = "Rejected";
      this._openDialog();
    },

    // 📌 GET CONTEXT SAFELY
    _setContext: function (oEvent) {
      this._selectedContext = oEvent.getSource()
        .getParent()
        .getParent()
        .getBindingContext();
    },

    // 💬 OPEN DIALOG
    _openDialog: function () {
      if (!this._dialog) {
        this._dialog = sap.ui.xmlfragment(
          "ui5.walkthrough.view.fragment.RemarkDialog",
          this
        );
        this.getView().addDependent(this._dialog);
      }
      this._dialog.open();
    },

    // ❌ CLOSE DIALOG
    onCloseDialog: function () {
      this._dialog.close();
    },

    // 🚀 CONFIRM APPROVE / REJECT
    onConfirmAction: function () {

      var oModel = this.getOwnerComponent().getModel();
      var remarks = sap.ui.getCore().byId("remarkInput").getValue();

      var oContext = this._selectedContext;
      var sPath = oContext.getPath();

      // 🔥 GET FULL DATA (IMPORTANT)
      var oExistingData = oContext.getObject();

      // 🔥 MERGE DATA (DO NOT LOSE FIELDS)
      var oUpdatedData = {
        empId: oExistingData.empId,
        startdate: oExistingData.startdate,
        enddate: oExistingData.enddate,
        amount: oExistingData.amount,
        destination: oExistingData.destination,
        status: this._actionType,
        remarks: remarks
      };

      var that = this;

      oModel.update(sPath, oUpdatedData, {
        success: function () {
          MessageToast.show(that._actionType + " successful");

          oModel.refresh(true);

          // clear remark field
          sap.ui.getCore().byId("remarkInput").setValue("");

          that._dialog.close();

          // 🔥 reapply filter after update
          that._applyFilter();

          // navigate back
          that.getOwnerComponent().getRouter().navTo("dashboard");
        },
        error: function () {
          MessageToast.show("Update failed");
        }
      });
    },

    // ✅ BULK APPROVE (IMPROVED)
    onBulkApprove: function () {

      var oModel = this.getOwnerComponent().getModel();
      var aItems = this.byId("list").getSelectedItems();
      var that = this;

      aItems.forEach(function (item) {

        var oContext = item.getBindingContext();
        var sPath = oContext.getPath();
        var oData = oContext.getObject();

        var oUpdatedData = {
          empId: oData.empId,
          startdate: oData.startdate,
          enddate: oData.enddate,
          amount: oData.amount,
          destination: oData.destination,
          status: "Approved",
          remarks: oData.remarks || ""
        };

        oModel.update(sPath, oUpdatedData);
      });

      oModel.refresh(true);
      MessageToast.show("Bulk Approved");

      this._applyFilter();
    }

  });
});