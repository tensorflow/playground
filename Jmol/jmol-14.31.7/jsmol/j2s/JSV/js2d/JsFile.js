Clazz.declarePackage ("JSV.js2d");
Clazz.load (["J.api.GenericFileInterface"], "JSV.js2d.JsFile", ["JU.PT", "JSV.common.JSVFileManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.fullName = null;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsFile", null, J.api.GenericFileInterface);
c$.newFile = Clazz.defineMethod (c$, "newFile", 
function (name) {
return  new JSV.js2d.JsFile (name);
}, "~S");
Clazz.makeConstructor (c$, 
function (name) {
this.name = name.$replace ('\\', '/');
this.fullName = name;
if (!this.fullName.startsWith ("/") && JSV.common.JSVFileManager.urlTypeIndex (name) < 0) this.fullName = JSV.common.JSVFileManager.jsDocumentBase + "/" + this.fullName;
this.fullName = JU.PT.rep (this.fullName, "/./", "/");
name = name.substring (name.lastIndexOf ("/") + 1);
}, "~S");
Clazz.overrideMethod (c$, "getParentAsFile", 
function () {
var pt = this.fullName.lastIndexOf ("/");
return (pt < 0 ? null :  new JSV.js2d.JsFile (this.fullName.substring (0, pt)));
});
Clazz.overrideMethod (c$, "getFullPath", 
function () {
return this.fullName;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "isDirectory", 
function () {
return this.fullName.endsWith ("/");
});
Clazz.overrideMethod (c$, "length", 
function () {
return 0;
});
c$.getURLContents = Clazz.defineMethod (c$, "getURLContents", 
function (url, outputBytes, post) {
try {
var conn = url.openConnection ();
if (outputBytes != null) conn.outputBytes (outputBytes);
 else if (post != null) conn.outputString (post);
return conn.getContents ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return e.toString ();
} else {
throw e;
}
}
}, "java.net.URL,~A,~S");
});
