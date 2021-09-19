sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(
    Controller,
    JSONModel
){
    "use strict";
    
	return Controller.extend("z.lrop.ex.ext.controller.SubSectionExtension", {
		onInit: function(){
            var oModel = new JSONModel();
            var oView = this.getView();
            var sPath = sap.ui.require.toUrl("z/lrop/ex/localService/mockdata/TimeLineData.json")

            oModel.loadData(sPath);
            oView.setModel(oModel, "time")
        },

        onAfterRendering: function(){

        }
    });

}, true);