Clazz.declarePackage ("JSV.export");
Clazz.load (["JSV.api.JSVExporter", "JSV.export.FormContext"], "JSV.export.FormExporter", ["java.io.IOException", "JSV.common.JSVFileManager", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
this.errMsg = null;
this.currentTime = null;
this.out = null;
this.vwr = null;
Clazz.instantialize (this, arguments);
}, JSV["export"], "FormExporter", null, JSV.api.JSVExporter);
Clazz.prepareFields (c$, function () {
this.context =  new JSV["export"].FormContext ();
});
Clazz.defineMethod (c$, "initForm", 
function (viewer, out) {
this.vwr = viewer;
this.out = out;
this.currentTime = viewer.apiPlatform.getDateFormat (null);
}, "JSV.common.JSViewer,JU.OC");
Clazz.defineMethod (c$, "writeForm", 
function (templateFile) {
var error =  new Array (1);
var template = JSV.common.JSVFileManager.getResourceString (this, "resources/" + templateFile, error);
if (template == null) {
JU.Logger.error (error[0]);
return error[0];
}this.errMsg = this.context.setTemplate (template);
if (this.errMsg != null) {
JU.Logger.error (this.errMsg);
return this.errMsg;
}this.errMsg = this.context.merge (this.out);
if (this.out == null) return this.errMsg;
if (this.errMsg != null) {
JU.Logger.error (this.errMsg);
throw  new java.io.IOException (this.errMsg);
}this.out.closeChannel ();
return "OK " + this.out.getByteCount () + " bytes";
}, "~S");
});
