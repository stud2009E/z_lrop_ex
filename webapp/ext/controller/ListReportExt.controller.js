sap.ui.controller("z.lrop.ex.ext.controller.ListReportExt", {
	onInit: function(){

		this._setupUI();
	},

	_setupUI: function(){
		var oSmartHeadTable = this.byId("listReport-header");

		function setupColumnWidth(oSmartTable){
			var oTable = oSmartTable.getTable();
			var aColumns = oTable.getColumns();

			aColumns.forEach(function(oColumn, i){
				if(i < 4){
					oColumn.setWidth("20rem");
				}
			});
		}

		if(oSmartHeadTable.isInitialised()){
			setupColumnWidth(oSmartHeadTable)
		}else{
			oSmartHeadTable.attachInitialise(function(oEvent){
				setupColumnWidth(oSmartHeadTable);
			});
		}
	},

	onBeforeRebindTableExtension: function(oEvent){
		
	}

});