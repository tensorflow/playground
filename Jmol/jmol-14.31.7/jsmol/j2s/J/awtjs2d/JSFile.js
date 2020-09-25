Clazz.declarePackage ("J.awtjs2d");
Clazz.load (["J.api.GenericFileInterface"], "J.awtjs2d.JSFile", ["JU.OC", "$.PT", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.fullName = null;
Clazz.instantialize (this, arguments);
}, J.awtjs2d, "JSFile", null, J.api.GenericFileInterface);
c$.newFile = Clazz.defineMethod (c$, "newFile", 
function (name) {
return  new J.awtjs2d.JSFile (name);
}, "~S");
Clazz.makeConstructor (c$, 
function (name) {
this.name = name.$replace ('\\', '/');
this.fullName = name;
if (!this.fullName.startsWith ("/") && JU.OC.urlTypeIndex (name) < 0) this.fullName = JV.Viewer.jsDocumentBase + "/" + this.fullName;
this.fullName = JU.PT.rep (this.fullName, "/./", "/");
name = name.substring (name.lastIndexOf ("/") + 1);
}, "~S");
Clazz.overrideMethod (c$, "getParentAsFile", 
function () {
var pt = this.fullName.lastIndexOf ("/");
return (pt < 0 ? null :  new J.awtjs2d.JSFile (this.fullName.substring (0, pt)));
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
