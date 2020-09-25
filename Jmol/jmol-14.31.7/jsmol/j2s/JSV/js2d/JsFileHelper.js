Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.api.JSVFileHelper"], "JSV.js2d.JsFileHelper", ["JU.PT", "JSV.common.JSViewer", "JSV.js2d.JsFile"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsFileHelper", null, JSV.api.JSVFileHelper);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (viewer) {
this.vwr = viewer;
return this;
}, "JSV.common.JSViewer");
Clazz.overrideMethod (c$, "getFile", 
function (fileName, panelOrFrame, isSave) {
var f = null;
fileName = JU.PT.rep (fileName, "=", "_");
{
f = prompt("Enter a file name:", fileName);
}return (f == null ? null :  new JSV.js2d.JsFile (f));
}, "~S,~O,~B");
Clazz.overrideMethod (c$, "setDirLastExported", 
function (name) {
return name;
}, "~S");
Clazz.overrideMethod (c$, "setFileChooser", 
function (pdf) {
}, "JSV.common.ExportType");
Clazz.overrideMethod (c$, "showFileOpenDialog", 
function (panelOrFrame, userData) {
JSV.common.JSViewer.jmolObject.loadFileAsynchronously (this, this.vwr.html5Applet, "?", userData);
return null;
}, "~O,~A");
Clazz.defineMethod (c$, "setData", 
function (fileName, data, userInfo) {
if (fileName == null) return;
if (data == null) {
this.vwr.selectedPanel.showMessage (fileName, "File Open Error");
return;
}var script = (userInfo == null ? null : "");
var isAppend = false;
{
isAppend = userInfo[0];
script = userInfo[1];
}this.vwr.si.siOpenDataOrFile ( String.instantialize (data), "cache://" + fileName, null, null, -1, -1, isAppend, null, null);
if (script != null) this.vwr.runScript (script);
}, "~S,~O,~A");
Clazz.overrideMethod (c$, "getUrlFromDialog", 
function (info, msg) {
{
return prompt(info, msg);
}}, "~S,~S");
});
