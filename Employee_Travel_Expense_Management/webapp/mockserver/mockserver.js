sap.ui.define([
  "sap/ui/core/util/MockServer"
], function (MockServer) {
  "use strict";

  return {
    init: function () {

      var oMockServer = new MockServer({
        rootUri: "/mock/"
      });

      oMockServer.simulate("mockserver/metadata.xml", {
        sMockdataBaseUrl: "mockserver/",
        bGenerateMissingMockData: false
      });

      oMockServer.start();

      console.log("MockServer started");
    }
  };
});