sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], (Controller, JSONModel) => {

    "use strict";


    return Controller.extend("ui5.walkthrough.controller.tempData", {

        onInit: function () {

            // old way --> 1  --> using variable (object)
            // var oData = {
            //     name: "Messi",
            //     country: "Argentina"
            // };

            // var oModel = new JSONModel(oData);

            //new Way --> 2 --> using Json file

            var oModel = new JSONModel();
            oModel.loadData("model/data.json")

            this.getView().setModel(oModel, "data");
        }

    });


})





//  <Text text="{data>/employees/0/name}" />
//                 <Text text="{data>/employees/0/country}" />

//                 <Text text="--------------------------"/>

//                 <Text text="{data>/employees/1/name}" />
//                 <Text text="{data>/employees/1/country}" />

//                 <Text text="--------------------------"/>


//                 <List items="{data>/employees}">
//                     <items>
//                         <StandardListItem title="{data>name}" description="{data>country}" />
//                     </items>
//                 </List> 