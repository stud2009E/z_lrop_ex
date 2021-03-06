$.sap.require("sap/ui/model/Filter");
$.sap.require("sap/ui/model/FilterOperator");

var Filter = sap.ui.require("sap/ui/model/Filter");
var FilterOperator = sap.ui.require("sap/ui/model/FilterOperator");

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
		var oSmartTable = oEvent.getSource();
		var oBindingParams = oEvent.getParameter("bindingParams");

		if(oSmartTable.getEntitySet() === "HeaderSet"){
			var oSmartFilterBar = this.byId("listReportFilter");
			var oRating = oSmartFilterBar.getControlByKey("ratingFilter");
			var fValue = oRating.getValue();

			if(fValue){
				oBindingParams.filters.push(
					new Filter({
						path: "Criticality",
						value1: fValue,
						operator: FilterOperator.EQ
					})
				);
			}
		}
	},

	
	onListNavigationExtension: function(oEvent){
		var oSource = oEvent.getSource();
		var oBindingContext = oSource.getBindingContext();
		var oObject = oBindingContext.getObject();
		var oExtAPI = this.extensionAPI;
		var oNavigationController = oExtAPI.getNavigationController();
		var oModel = oBindingContext.getModel();


		if(oObject.Boolean){
			var sPath = oModel.createKey("/FileSet", {
				FileId: "001",
				Guid: oObject.Guid
			});
			var fnNavigate = function(){
				return new Promise(function(fnResolve){
					oModel.createBindingContext(sPath, null, {}, function(oTarget){
						oNavigationController.navigateInternal(oTarget);
						fnResolve();
					});
				});
			};

			oExtAPI.securedExecution(fnNavigate, {
				busy: {
					check: false
				},
				dataloss: {
					popup: false
				}
			});

			return true;
		}

		return false;
	},

	
	onGlobalActionPress: console.log,

	onHeaderActionLRPress: function(oEvent){
		var aCtxs = this.extensionAPI.getSelectedContexts();

		console.table(aCtxs.map(ctx => ctx.getObject()));
	},

	onHeaderDeterminigLRActionPress: function(oEvent){
		var aCtxs = this.extensionAPI.getSelectedContexts();

		console.table(aCtxs.map(ctx => ctx.getObject()));
	}

});