

sap.ui.define([
  "sap/ui/core/UIComponent",
 "ui5/walkthrough/mockserver/mockserver"
], function (UIComponent, mockserver) {
  "use strict";

  return UIComponent.extend("ui5.walkthrough.Component", {

    init: function () {

      UIComponent.prototype.init.apply(this, arguments);

      
      mockserver.init();

      
      var oModel = new sap.ui.model.odata.v2.ODataModel("/mock/");
      this.setModel(oModel);

      this.getRouter().initialize();
    }
  });
});