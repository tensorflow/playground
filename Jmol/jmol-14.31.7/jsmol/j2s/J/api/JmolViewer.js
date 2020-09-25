Clazz.declarePackage ("J.api");
Clazz.load (null, "J.api.JmolViewer", ["java.lang.Boolean", "java.util.Hashtable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.menuStructure = null;
this.apiPlatform = null;
Clazz.instantialize (this, arguments);
}, J.api, "JmolViewer");
c$.allocateViewer = Clazz.defineMethod (c$, "allocateViewer", 
function (display, modelAdapter, fullName, documentBase, codeBase, commandOptions, statusListener, implementedPlatform) {
var info =  new java.util.Hashtable ();
if (display != null) info.put ("display", display);
if (modelAdapter != null) info.put ("adapter", modelAdapter);
if (statusListener != null) info.put ("statuslistener", statusListener);
if (implementedPlatform != null) info.put ("platform", implementedPlatform);
if (commandOptions != null) info.put ("options", commandOptions);
if (fullName != null) info.put ("fullname", fullName);
if (documentBase != null) info.put ("documentbase", documentBase);
if (codeBase != null) info.put ("codebase", codeBase);
info.put ("isApp", Boolean.TRUE);
return  new JV.Viewer (info);
}, "~O,J.api.JmolAdapter,~S,java.net.URL,java.net.URL,~S,J.api.JmolStatusListener,J.api.GenericPlatform");
c$.allocateViewer = Clazz.defineMethod (c$, "allocateViewer", 
function (container, jmolAdapter) {
return J.api.JmolViewer.allocateViewer (container, jmolAdapter, null, null, null, null, null, null);
}, "~O,J.api.JmolAdapter");
c$.allocateViewer = Clazz.defineMethod (c$, "allocateViewer", 
function (display, modelAdapter, fullName, documentBase, codeBase, commandOptions, statusListener) {
return J.api.JmolViewer.allocateViewer (display, modelAdapter, fullName, documentBase, codeBase, commandOptions, statusListener, null);
}, "~O,J.api.JmolAdapter,~S,java.net.URL,java.net.URL,~S,J.api.JmolStatusListener");
Clazz.defineMethod (c$, "setConsole", 
function (console) {
this.getProperty ("DATA_API", "getAppConsole", console);
}, "J.api.JmolAppConsoleInterface");
c$.getJmolVersion = Clazz.defineMethod (c$, "getJmolVersion", 
function () {
return JV.Viewer.getJmolVersion ();
});
Clazz.defineMethod (c$, "openReader", 
function (fullPathName, reader) {
return this.openReader (fullPathName == null ? "String" : fullPathName, null, reader);
}, "~S,~O");
Clazz.defineMethod (c$, "openFileAsync", 
function (fileName) {
this.openFileAsyncSpecial (fileName, 0);
}, "~S");
Clazz.defineMethod (c$, "renderScreenImage", 
function (g, currentSize, rectClip) {
this.apiPlatform.renderScreenImage (g, currentSize);
}, "~O,~O,~O");
Clazz.defineMethod (c$, "runScriptCautiously", 
function (script) {
return null;
}, "~S");
Clazz.defineMethod (c$, "dispose", 
function () {
});
{
}{
}});
