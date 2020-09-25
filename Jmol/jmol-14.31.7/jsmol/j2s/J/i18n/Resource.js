Clazz.declarePackage ("J.i18n");
Clazz.load (null, "J.i18n.Resource", ["java.util.Hashtable", "JU.PT", "$.Rdr", "J.translation.PO", "JU.Logger", "JV.FileManager", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resource = null;
this.resourceMap = null;
Clazz.instantialize (this, arguments);
}, J.i18n, "Resource");
Clazz.makeConstructor (c$, 
 function (resource, className) {
if (className == null) this.resourceMap = resource;
 else this.resource = resource;
}, "~O,~S");
c$.getResource = Clazz.defineMethod (c$, "getResource", 
function (vwr, className, name) {
var poData = null;
if (vwr != null && vwr.isApplet) {
var fname = JV.Viewer.appletIdiomaBase + "/" + name + ".po";
JU.Logger.info ("Loading language resource " + fname);
poData = vwr.getFileAsString3 (fname, false, "gt");
} else {
try {
var br = JV.FileManager.getBufferedReaderForResource (vwr,  new J.translation.PO (), "J/translation/", (className.indexOf ("Applet") >= 0 ? "JmolApplet/" : "Jmol/") + name + ".po");
var data =  new Array (1);
JU.Rdr.readAllAsString (br, 2147483647, false, data, 0);
poData = data[0];
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}return J.i18n.Resource.getResourceFromPO (poData);
}, "JV.Viewer,~S,~S");
Clazz.defineMethod (c$, "getString", 
function (string) {
try {
return (this.resource == null ? this.resourceMap.get (string) : this.resource.getString (string));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "~S");
c$.getLanguage = Clazz.defineMethod (c$, "getLanguage", 
function () {
var language = null;
{
language = Jmol.featureDetection.getDefaultLanguage().replace(/-/g,'_');
}return language;
});
c$.getResourceFromPO = Clazz.defineMethod (c$, "getResourceFromPO", 
function (data) {
if (data == null || data.length == 0) return null;
var map =  new java.util.Hashtable ();
try {
var lines = JU.PT.split (data, "\n");
var mode = 0;
var msgstr = "";
var msgid = "";
for (var i = 0; i < lines.length; i++) {
var line = lines[i];
if (line.length <= 2) {
if (mode == 2 && msgstr.length != 0 && msgid.length != 0) map.put (msgid, msgstr);
mode = 0;
} else if (line.indexOf ("msgid") == 0) {
mode = 1;
msgid = J.i18n.Resource.fix (line);
} else if (line.indexOf ("msgstr") == 0) {
mode = 2;
msgstr = J.i18n.Resource.fix (line);
} else if (mode == 1) {
msgid += J.i18n.Resource.fix (line);
} else if (mode == 2) {
msgstr += J.i18n.Resource.fix (line);
}}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
JU.Logger.info (map.size () + " translations loaded");
return (map.size () == 0 ? null :  new J.i18n.Resource (map, null));
}, "~S");
c$.fix = Clazz.defineMethod (c$, "fix", 
function (line) {
if (line.indexOf ("\\\"") >= 0) line = JU.PT.rep (line, "\\\"", "\"");
return JU.PT.rep (line.substring (line.indexOf ("\"") + 1, line.lastIndexOf ("\"")), "\\n", "\n");
}, "~S");
});
