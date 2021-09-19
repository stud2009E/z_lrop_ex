sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/suite/ui/generic/template/extensionAPI/ReuseComponentSupport",
	"sap/m/upload/UploadSetItem"
], function(
	UIComponent,
	ReuseComponentSupport,
	UploadSetItem
) {
	"use strict";

	/* Definition of the reuse component */
	return UIComponent.extend("z.lrop.ex.reuse.Component", {
		metadata: {
			manifest: "json",   
			properties: {
				/* Standard properties for reuse components */

				uiMode: {
					type: "string",
					group: "standard"
				},
				semanticObject: {
					type: "string",
					group: "standard"
				},
				stIsAreaVisible: {
					type: "boolean",
					group: "standard"
				},

				/* Component specific properties */
				navProperty: {
					type: "string",
					group: "specific",
					defaultValue: ""
				},

				hidden:{
					type: "boolean",
					group: "specific",
					defaultValue: true
				}
			}
		},

		// Standard life time event of a component. Used to transform this component into a reuse component for Fiori Elements
		init: function(){
			//Transform this component into a reuse component for Fiori Elements:
			ReuseComponentSupport.mixInto(this);    
			// Defensive call of init of the super class:
			(UIComponent.prototype.init || jQuery.noop).apply(this, arguments);
		},


		stStart: function(oModel, oBindingContext, oExtensionAPI){
			var oView = this.getRootControl();
			var oUploadSet = oView.byId("fileUploadSet");
			var sPath = this.getNavProperty();

			this.extensionAPI = oExtensionAPI;
			
			oUploadSet.bindAggregation("items", {
				path: sPath,
				template: new UploadSetItem({
					fileName: "{FileName}",
					mediaType: "{MimeType}"
				})
			});
		},

		stRefresh: function(oModel, oBindingContext, oExtensionAPI){

		},

		setHidden: function(bValue){
			bValue = !!bValue;

			if(this.extensionAPI){
				this.extensionAPI.setSectionHidden(bValue);
			}

			if(this.getProperty("hidden") !== bValue){
				this.setProperty("hidden", bValue);
			}
		}
	});
}, true);