sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
    Controller
){
    "use strict";
    
	return Controller.extend("z.lrop.ex.ext.controller.Example", {
		onInit: function(){

        },
        
        onTestPress: function(oEvent){
            console.log(oEvent);
        }
    });

}, true);