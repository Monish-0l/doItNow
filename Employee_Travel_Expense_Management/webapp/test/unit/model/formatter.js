sap.ui.define([
  "ui5/walkthrough/model/formatter"
], function (formatter) {
  "use strict";

  QUnit.module("Formatter Tests");

  QUnit.test("Status Text Test", function (assert) {
    assert.strictEqual(formatter.statusText("Approved"), "Approved", "Approved works");
    assert.strictEqual(formatter.statusText("Rejected"), "Rejected", "Rejected works");
    assert.strictEqual(formatter.statusText("Submitted"), "Pending", "Submitted → Pending works");
    assert.strictEqual(formatter.statusText("Draft"), "Draft", "Draft works");
  });

  QUnit.test("Status State Test", function (assert) {
    assert.strictEqual(formatter.statusState("Approved"), "Success", "Approved → Success");
    assert.strictEqual(formatter.statusState("Rejected"), "Error", "Rejected → Error");
    assert.strictEqual(formatter.statusState("Submitted"), "Warning", "Submitted → Warning");
    assert.strictEqual(formatter.statusState("Draft"), "None", "Draft → None");
  });

});