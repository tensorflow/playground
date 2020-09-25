Clazz.declarePackage ("J.appletjs");
Clazz.load (["javajs.api.JSInterface", "JU.GenericApplet"], "J.appletjs.Jmol", ["java.util.Hashtable", "JU.PT", "J.awtjs2d.Platform", "JU.Logger", "$.Parser"], function () {
c$ = Clazz.decorateAsClass (function () {
this.htParams = null;
Clazz.instantialize (this, arguments);
}, J.appletjs, "Jmol", JU.GenericApplet, javajs.api.JSInterface);
Clazz.makeConstructor (c$, 
function (vwrOptions) {
Clazz.superConstructor (this, J.appletjs.Jmol, []);
this.htParams =  new java.util.Hashtable ();
if (vwrOptions == null) vwrOptions =  new java.util.Hashtable ();
this.vwrOptions = vwrOptions;
for (var entry, $entry = vwrOptions.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.htParams.put (entry.getKey ().toLowerCase (), entry.getValue ());

this.documentBase = "" + vwrOptions.get ("documentBase");
this.codeBase = "" + vwrOptions.get ("codePath");
this.isJS = true;
this.init (this);
}, "java.util.Map");
Clazz.overrideMethod (c$, "setStereoGraphics", 
function (isStereo) {
{
if (isStereo)
return vwr.apiPlatform.context;
}return null;
}, "~B");
Clazz.overrideMethod (c$, "initOptions", 
function () {
this.vwrOptions.remove ("debug");
this.vwrOptions.put ("fullName", this.fullName);
this.haveDocumentAccess = "true".equalsIgnoreCase ("" + this.getValue ("allowjavascript", "true"));
this.mayScript = true;
});
Clazz.overrideMethod (c$, "getJmolParameter", 
function (paramName) {
var o = this.htParams.get (paramName.toLowerCase ());
return (o == null ? null : "" + o);
}, "~S");
Clazz.overrideMethod (c$, "doSendJsTextStatus", 
function (message) {
System.out.println (message);
}, "~S");
Clazz.overrideMethod (c$, "doSendJsTextareaStatus", 
function (message) {
System.out.println (message);
}, "~S");
Clazz.overrideMethod (c$, "doFunctionXY", 
function (functionName, nX, nY) {
var fxy =  Clazz.newFloatArray (Math.abs (nX), Math.abs (nY), 0);
if (!this.mayScript || !this.haveDocumentAccess || nX == 0 || nY == 0) return fxy;
try {
if (nX > 0 && nY > 0) {
for (var i = 0; i < nX; i++) for (var j = 0; j < nY; j++) {
{
fxy[i][j] = window.eval(functionName)(this.htmlName, i, j);
}}

} else if (nY > 0) {
var data;
{
data = window.eval(functionName)(this.htmlName, nX, nY);
}nX = Math.abs (nX);
var fdata =  Clazz.newFloatArray (nX * nY, 0);
JU.Parser.parseStringInfestedFloatArray (data, null, fdata);
for (var i = 0, ipt = 0; i < nX; i++) {
for (var j = 0; j < nY; j++, ipt++) {
fxy[i][j] = fdata[ipt];
}
}
} else {
{
data = window.eval(functionName)(this.htmlName, nX, nY, fxy);
}}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Exception " + e + " with nX, nY: " + nX + " " + nY);
} else {
throw e;
}
}
return fxy;
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "doFunctionXYZ", 
function (functionName, nX, nY, nZ) {
var fxyz =  Clazz.newFloatArray (Math.abs (nX), Math.abs (nY), Math.abs (nZ), 0);
if (!this.mayScript || !this.haveDocumentAccess || nX == 0 || nY == 0 || nZ == 0) return fxyz;
try {
{
window.eval(functionName)(this.htmlName, nX, nY, nZ, fxyz);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Exception " + e + " for " + functionName + " with nX, nY, nZ: " + nX + " " + nY + " " + nZ);
} else {
throw e;
}
}
return fxyz;
}, "~S,~N,~N,~N");
Clazz.overrideMethod (c$, "doShowDocument", 
function (url) {
var surl = JU.PT.split (url.toString (), "?POST?");
if (surl.length == 1) {
{
window.open(surl[0]);
}return;
}var f = "<form id=f method=POST action='" + surl[0] + "'>";
f += "<input type='hidden' name='name' value='nmr-1h-prediction' id='name'>";
f += "<input type='submit' value='working...'>";
var fields = surl[1].$plit ("&");
for (var i = 0; i < fields.length; i++) {
var field = fields[i];
var pt = field.indexOf ("=");
var name = field.substring (0, pt);
var value = field.substring (pt);
if (value.indexOf ("\n") >= 0) {
f += "<textarea style='display:none' name=" + name + ">" + value + "</textarea>";
} else {
f += "<input type=hidden name=" + name + " value=\"" + value + "\">";
}}
f += "</form>";
{
var w=window.open("");w.document.write(f);w.document.getElementById("f").submit();
}}, "java.net.URL");
Clazz.overrideMethod (c$, "doSendCallback", 
function (callback, data, strInfo) {
if (callback == null || callback.length == 0) {
} else if (callback.equals ("alert")) {
{
alert(strInfo); return "";
}} else {
var tokens = JU.PT.split (callback, ".");
{
try{
var o = window[tokens[0]];
for (var i = 1; i < tokens.length; i++)
o = o[tokens[i]];
for (var i = 0; i < data.length; i++)
data[i] && data[i].booleanValue && (data[i] = data[i].booleanValue());
return o.apply(null,data)
} catch (e) { System.out.println(callback + " failed " + e); }
}}return "";
}, "~S,~A,~S");
Clazz.overrideMethod (c$, "doEval", 
function (strEval) {
try {
{
return window.eval(strEval);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("# error evaluating " + strEval + ":" + e.toString ());
} else {
throw e;
}
}
return "";
}, "~S");
Clazz.overrideMethod (c$, "doShowStatus", 
function (message) {
try {
System.out.println (message);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "getGLmolView", 
function () {
return this.viewer.getGLmolView ();
});
Clazz.defineMethod (c$, "openFile", 
function (fileName) {
return this.viewer.openFile (fileName);
}, "~S");
Clazz.overrideMethod (c$, "cacheFileByName", 
function (fileName, isAdd) {
return this.viewer.cacheFileByName (fileName, isAdd);
}, "~S,~B");
Clazz.overrideMethod (c$, "cachePut", 
function (key, data) {
this.viewer.cachePut (key, data);
}, "~S,~O");
Clazz.overrideMethod (c$, "getFullName", 
function () {
return this.fullName;
});
Clazz.overrideMethod (c$, "processMouseEvent", 
function (id, x, y, modifiers, time) {
return this.viewer.processMouseEvent (id, x, y, modifiers, time);
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "setDisplay", 
function (canvas) {
this.viewer.setDisplay (canvas);
}, "~O");
Clazz.overrideMethod (c$, "setStatusDragDropped", 
function (mode, x, y, fileName) {
return this.viewer.setStatusDragDropped (mode, x, y, fileName);
}, "~N,~N,~N,~S");
Clazz.overrideMethod (c$, "startHoverWatcher", 
function (enable) {
this.viewer.startHoverWatcher (enable);
}, "~B");
Clazz.overrideMethod (c$, "update", 
function () {
this.viewer.updateJS ();
});
Clazz.overrideMethod (c$, "openFileAsyncSpecial", 
function (fileName, flags) {
this.viewer.openFileAsyncSpecial (fileName, flags);
}, "~S,~N");
Clazz.overrideMethod (c$, "processTwoPointGesture", 
function (touches) {
this.viewer.processTwoPointGesture (touches);
}, "~A");
Clazz.overrideMethod (c$, "setScreenDimension", 
function (width, height) {
this.viewer.setScreenDimension (width, height);
}, "~N,~N");
Clazz.overrideMethod (c$, "resizeInnerPanel", 
function (data) {
var dims =  Clazz.newFloatArray (2, 0);
JU.Parser.parseStringInfestedFloatArray (data, null, dims);
this.resizeDisplay (Clazz.floatToInt (dims[0]), Clazz.floatToInt (dims[1]));
return  Clazz.newIntArray (-1, [Clazz.floatToInt (dims[0]), Clazz.floatToInt (dims[1])]);
}, "~S");
Clazz.defineMethod (c$, "resizeDisplay", 
function (width, height) {
var jmol = J.awtjs2d.Platform.Jmol ();
jmol.resizeApplet (this.viewer.html5Applet,  Clazz.newIntArray (-1, [width, height]));
}, "~N,~N");
});
