Clazz.declarePackage ("JSV.dialog");
Clazz.load (null, "JSV.dialog.DialogManager", ["java.util.Hashtable", "JU.PT", "JSV.common.JSVFileManager", "$.JSViewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.htSelectors = null;
this.htDialogs = null;
this.options = null;
Clazz.instantialize (this, arguments);
}, JSV.dialog, "DialogManager");
Clazz.defineMethod (c$, "set", 
function (viewer) {
this.vwr = viewer;
this.htSelectors =  new java.util.Hashtable ();
this.htDialogs =  new java.util.Hashtable ();
return this;
}, "JSV.common.JSViewer");
Clazz.defineMethod (c$, "registerDialog", 
function (jsvDialog) {
var id = jsvDialog.optionKey;
if (!id.endsWith ("!")) id += " " + ("" + Math.random ()).substring (3);
if (this.htDialogs.containsKey (id)) this.htDialogs.get (id).dispose ();
this.htDialogs.put (id, jsvDialog);
return id;
}, "JSV.dialog.JSVDialog");
Clazz.defineMethod (c$, "registerSelector", 
function (selectorName, columnSelector) {
this.htSelectors.put (columnSelector, selectorName);
}, "~S,~O");
Clazz.defineMethod (c$, "getSelectorName", 
function (selector) {
return this.htSelectors.get (selector);
}, "~O");
Clazz.defineMethod (c$, "showSourceErrors", 
function (frame, currentSource) {
if (currentSource == null) {
this.showMessageDialog (frame, "Please Select a Spectrum.", "Select Spectrum", 2);
return;
}var errorLog = currentSource.getErrorLog ();
if (errorLog != null && errorLog.length > 0) this.showMessage (frame, errorLog, JSV.dialog.DialogManager.fixTitle (currentSource.getFilePath ()));
 else this.showMessageDialog (frame, "No errors found.", "Error Log", 1);
}, "~O,JSV.source.JDXSource");
Clazz.defineMethod (c$, "showSource", 
function (frame, spec) {
var filePath = spec.getFilePath ();
if (filePath == null) {
this.showMessageDialog (frame, "Please Select a Spectrum", "Select Spectrum", 2);
return;
}if (filePath === "[inline]") {
this.showMessage (null, spec.getInlineData (), "Inline data");
return;
}try {
var s = JSV.common.JSVFileManager.getFileAsString (filePath);
if (JSV.common.JSViewer.isJS) s = JU.PT.rep (s, "<", "&lt;");
this.showMessage (null, s, JSV.dialog.DialogManager.fixTitle (filePath));
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.showMessageDialog (frame, "File Not Found", "SHOWSOURCE", 0);
} else {
throw ex;
}
}
}, "~O,JSV.common.Spectrum");
Clazz.defineMethod (c$, "processClick", 
function (eventId) {
var pt = eventId.lastIndexOf ("/");
var id = eventId.substring (pt + 1);
var dialog = eventId.substring (0, pt);
this.dialogCallback (dialog, id, null);
}, "~S");
Clazz.defineMethod (c$, "processTableEvent", 
function (eventId, index1, index2, adjusting) {
var pt = eventId.lastIndexOf ("/");
var dialog = eventId.substring (0, pt);
var selector = eventId.substring (pt + 1);
var msg = "&selector=" + selector + "&index=" + index1 + (index2 < 0 ? "&adjusting=" + adjusting : "&index2=" + index2);
this.dialogCallback (dialog, "tableSelect", msg);
}, "~S,~N,~N,~B");
Clazz.defineMethod (c$, "processWindowClosing", 
function (dialogId) {
this.dialogCallback (dialogId, "windowClosing", null);
this.htDialogs.remove (dialogId);
}, "~S");
Clazz.defineMethod (c$, "dialogCallback", 
 function (dialogId, id, msg) {
var jsvDialog = this.htDialogs.get (dialogId);
if (jsvDialog != null) jsvDialog.callback (id, msg);
}, "~S,~S,~S");
Clazz.defineMethod (c$, "getDialogOptions", 
function () {
if (this.options == null) this.options =  new java.util.Hashtable ();
return this.options;
});
c$.fixTitle = Clazz.defineMethod (c$, "fixTitle", 
function (title) {
return (title.length > 50 ? title.substring (0, 50) + "..." : title);
}, "~S");
Clazz.defineStatics (c$,
"PLAIN_MESSAGE", -1,
"ERROR_MESSAGE", 0,
"INFORMATION_MESSAGE", 1,
"WARNING_MESSAGE", 2,
"QUESTION_MESSAGE", 3);
});
