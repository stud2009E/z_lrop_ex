sap.ui.define(function(){
	"use strict";

	var oModule = {
		
		/**
		 * Workspace call this method with mockserver instance.
		 * Mockserver use server model from manifest.json.  
		 * @param {sap.ui.core.util.Mockserver} mockserver 
		 * @public
		 * @see {@link /workspace/mockservers/mockserver.js}
		 */
		apply: function(mockserver){

			var aRequests = mockserver.getRequests();
			
			aRequests.push({
				method: "POST",
				path: new RegExp("ProcessHeader.*"),
				response: function(oXhr){
					var oGuidRegexp = /([0-9A-Fa-f]{8}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{12})/;
					var sGuid = oGuidRegexp.exec(oXhr.url);
					var sRootUri = mockserver.getRootUri();
					if(sGuid){
						sGuid = sGuid[0];
					}else{
						oXhr.respond(500);
						return true;
					}

					var aHeaderItem = mockserver._oMockdata.HeaderSet.find(item => item.Guid === sGuid);

					jQuery.ajax({
						url: `${sRootUri}HeaderSet(guid'${sGuid}')`,
						dataType : 'json',
						async: false,
						success : function(oData) {
							if(oData && oData.d && oData.d.Decimal){
								oData.d.Decimal *= 2;
								aHeaderItem.Decimal = oData.d.Decimal;
							}
							oXhr.respondJSON(200, {}, JSON.stringify(oData));
						}
					});

					return true;
				}
			});

			mockserver.setRequests(aRequests);
		}
	};

	return oModule;
});