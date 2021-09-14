jQuery.sap.require("sap/ui/generic/app/util/MessageUtil");
jQuery.sap.require("sap/ui/core/Fragment");

var MessageUtil = sap.ui.require("sap/ui/generic/app/util/MessageUtil");
var Fragment = sap.ui.require("sap/ui/core/Fragment");

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
	},

	attachPageDataLoaded: function(oCtxWrapper){
		this._oCtx = oCtxWrapper.context;
	},
	
	onRebindFileTable: function(oEvent){
		this.extensionAPI.rebind("fileOP::Table");
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
	}

});