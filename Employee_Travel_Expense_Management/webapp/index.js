sap.ui.define(["sap/ui/core/mvc/XMLView"],(XMLView) => {
    XMLView.create({
        viewName:"ui5.walkthrough.view.App"
    }).then((oView)=>{
         oView.placeAt("content")
    });
   

});