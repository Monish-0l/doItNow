sap.ui.define([
  "ui5/walkthrough/controller/Employee.controller"
], function (Controller) {
  "use strict";

  QUnit.module("Employee Controller Test");

  QUnit.test("Check Form Data Creation", function (assert) {

    var oController = new Controller();

  
    oController.byId = function (id) {
      return {
        getValue: function () {
          return "test";
        }
      };
    };

    var result = oController._getFormData("Submitted");

    assert.ok(result, "Data object created");
    assert.strictEqual(result.status, "Submitted", "Status is correct");
    assert.strictEqual(result.empId, "test", "empId is fetched");

  });

});