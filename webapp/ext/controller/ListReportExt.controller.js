sap.ui.controller("z.lrop.ex.ext.controller.ListReportExt", {
	onInit: function(){
		
		//here goes your code

	},


	onBeforeRebindTableExtension: function(oEvent){
		
	},


	getPredefinedValuesForCreateExtension: function(oSmartFilterBar){
		return {
			String: "Test",
			Status: "00",
			Int16: null,
			Decimal: null,
			Int32: null
		};
	}

});