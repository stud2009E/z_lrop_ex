jQuery.sap.require("sap/ui/generic/app/util/MessageUtil");
jQuery.sap.require("sap/ui/core/Fragment");
jQuery.sap.require("sap/ui/table/VisibleRowCountMode");

var MessageUtil = sap.ui.require("sap/ui/generic/app/util/MessageUtil");
var Fragment = sap.ui.require("sap/ui/core/Fragment");
var VisibleRowCountMode = sap.ui.require("sap/ui/table/VisibleRowCountMode");

"use strict";

sap.ui.controller("z.lrop.ex.ext.controller.ObjectPageExt", {
	
	_oCtx: null,

	onInit: function () {	
		this.extensionAPI.attachPageDataLoaded(this.attachPageDataLoaded.bind(this));

		this._setupUI();
	},

	_setupUI: function(){
		var oObjectPageLayout = this.byId("objectPage");
		// oObjectPageLayout.setUseIconTabBar(true);

		var oSmartFileTable = this.byId("fileOP::Table");
		if(oSmartFileTable){

			function setupTable(){
				var oTable = oSmartFileTable.getTable();
				oTable.setVisibleRowCountMode(VisibleRowCountMode.Fixed);
			}

			if(oSmartFileTable.isInitialised()){
				setupTable()
			}else{
				oSmartFileTable.attachInitialise(setupTable);
			}
		}
		var oLineModel = this.getOwnerComponent().getModel("lines");
		var oMicroChart = this.byId("microChart");
		oMicroChart.setModel(oLineModel, "lines");
		oMicroChart.bindElement({
			model:"lines",
			path: "/"
		});
	},

	attachPageDataLoaded: function(oCtxWrapper){
		this._oCtx = oCtxWrapper.context;
	},
	
	onRebindFileTable: function(oEvent){
		this.extensionAPI.rebind("fileOP::Table");
	},

	onBeforeRebindTableExtension: function(oEvent){
		var oBindingParams = oEvent.getParameter("bindingParams");
		var oSmartTable = oEvent.getSource();

		if(oSmartTable.getEntitySet() === "FileSet"){
			oBindingParams.events.dataReceived = function(oEvent){
				var oTable = oSmartTable.getTable();
				var oData = oEvent.getParameter("data");
				var iCount = (oData.results || []).length;
				
				if(iCount > 5){
					iCount = 5;
				}

				oTable.setVisibleRowCount(iCount || 1);
			};
		}
	},

	onShowCustomDialog: function(oEvent){
		var oExtAPI = this.extensionAPI;
		var oView = this.getView();

		oView.setBusy(true);
		Fragment.load({
			name: "z.lrop.ex.ext.fragment.CustomDialog",
			controller: this
		}).then(function(oDialog){

			oExtAPI.attachToView(oDialog);

			oDialog.attachAfterClose(function(){
				oDialog.destroy();
				oDialog = null;
			});

			oDialog.open();

		}).finally(function(){
			oView.setBusy(false);
		});

	},

	onCloseDialog: function(oEvent){
		var oDialog = oEvent.getSource().getParent();
		oDialog.close();
	},

	getResourceBundle: function () {
		return this.getOwnerComponent().getModel("@i18n").getResourceBundle();
	},
	
	/**
	 * get i18n text
	 */ 
	i18n: function(){
		var oBundle = this.getResourceBundle();
		return oBundle && oBundle.getText.apply(oBundle, arguments);
	},
	
	/**
	 * handle backend transient messages
	 */
	handleMessage: function(){
		var oView = this.getView();
		var that = this;
		
		function getMessageDialogForView(oThisView, sName, oFragmentController) {
			var sViewId = oThisView.getId();
			var	oFragment;
			
			if(!that[sName]){
				oFragment = sap.ui.xmlfragment(sViewId, sName, oFragmentController);
				oThisView.addDependent(oFragment);
				
				that[sName] = oFragment;
			}else{
				oFragment = that[sName];
			}
			
			return oFragment;
		}
		
		MessageUtil.handleTransientMessages(getMessageDialogForView.bind(null, oView));
	},


	setLoaclModel: function(){

	}

});