sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "ui5/walkthrough/model/formatter"
], function (Controller, MessageToast, MessageBox, formatter) {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.Employee", {

    formatter: formatter,

    onInit: function () {
      this._editPath = null;
    },

    // 📝 SAVE DRAFT
    onSaveDraft: function () {

      var oModel = this.getOwnerComponent().getModel();
      var oData = this._getFormData("Draft");

      if (this._editPath) {
        // UPDATE existing draft
        oModel.update(this._editPath, oData, {
          success: () => {
            MessageToast.show("Draft Updated");
            this._afterSave();
          },
          error: () => {
            MessageToast.show("Error updating draft");
          }
        });

      } else {
        // CREATE new draft
        oModel.create("/Requests", oData, {
          success: () => {
            MessageToast.show("Draft Saved");
            this._afterSave();
          },
          error: () => {
            MessageToast.show("Error saving draft");
          }
        });
      }
    },

    // 🚀 SUBMIT REQUEST
    onSubmit: function () {

      if (!this._validateForm()) return;

      var oModel = this.getOwnerComponent().getModel();
      var oData = this._getFormData("Submitted");

      if (this._editPath) {
        // UPDATE draft → Submitted
        oModel.update(this._editPath, oData, {
          success: () => {
            MessageToast.show("Request Submitted");
            this._afterSubmit();
          },
          error: () => {
            MessageToast.show("Error submitting request");
          }
        });

      } else {
        // CREATE new request
        oModel.create("/Requests", oData, {
  success: () => {
    MessageToast.show("Request Submitted");
    this.getOwnerComponent().getRouter().navTo("dashboard");
  },
  error: (oError) => {
    var msg = "Something went wrong";

    try {
      var response = JSON.parse(oError.responseText);
      msg = response.error.message.value;
    } catch (e) {}

    sap.m.MessageBox.error(msg);
  }
});
      }
    },

    // ✏️ EDIT (ONLY DRAFT)
    onEdit: function (oEvent) {

      var oContext = oEvent.getSource().getBindingContext();
      var oData = oContext.getObject();
console.log("Clicked status:", oData.status);
      if (oData.status !== "Draft") {
        MessageToast.show("Only Draft can be edited");
        return;
      }

      this._editPath = oContext.getPath();

      // Fill form
      this.byId("empId").setValue(oData.empId);
      this.byId("startdate").setValue(oData.startdate);
      this.byId("enddate").setValue(oData.enddate);
      this.byId("amount").setValue(oData.amount);
      this.byId("destination").setValue(oData.destination);
      this.byId("purpose").setValue(oData.purpose || "");

      MessageToast.show("Editing Draft...");
    },

    // 🔧 COMMON DATA FUNCTION
    _getFormData: function (status) {
      return {
        empId: this.byId("empId").getValue(),
        startdate: this.byId("startdate").getValue(),
        enddate: this.byId("enddate").getValue(),
        amount: this.byId("amount").getValue(),
        destination: this.byId("destination").getValue(),
        purpose: this.byId("purpose").getValue(),
        status: status,
        remarks: ""
      };
    },

    // ✅ VALIDATION
   _validateForm: function () {

  var empId = this.byId("empId").getValue();
  var destination = this.byId("destination").getValue();
  var amount = this.byId("amount").getValue();
  var start = this.byId("startdate").getValue();
  var end = this.byId("enddate").getValue();
  var purpose = this.byId("purpose").getValue();

  if (!empId) {
    sap.m.MessageBox.error("Employee ID is required");
    return false;
  }

  if (!destination) {
    sap.m.MessageBox.error("Destination is required");
    return false;
  }


 

  if (!amount || amount <= 0) {
    sap.m.MessageBox.error("Enter valid amount");
    return false;
  }

  if (!purpose) {
    sap.m.MessageBox.error("Purpose is required");
    return false;
  }

  return true;
},


    // 🔄 AFTER SAVE
    _afterSave: function () {
      this._clearForm();
      this._resetEdit();
    },

    // 🔄 AFTER SUBMIT
    _afterSubmit: function () {
      this._clearForm();
      this._resetEdit();

      // 🔥 Navigation
      this.getOwnerComponent().getRouter().navTo("dashboard");
    },

    // 🧹 CLEAR FORM
    _clearForm: function () {
      this.byId("empId").setValue("");
      this.byId("startdate").setValue("");
      this.byId("enddate").setValue("");
      this.byId("amount").setValue("");
      this.byId("destination").setValue("");
      this.byId("purpose").setValue("");
    },

    // 🔄 RESET EDIT MODE
    _resetEdit: function () {
      this._editPath = null;
    }

  });
});