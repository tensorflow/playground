Clazz.declarePackage ("JU");
Clazz.load (null, "JU.XmlUtil", ["JU.PT"], function () {
c$ = Clazz.declareType (JU, "XmlUtil");
Clazz.makeConstructor (c$, 
function () {
});
c$.openDocument = Clazz.defineMethod (c$, "openDocument", 
function (data) {
data.append ("<?xml version=\"1.0\"?>\n");
}, "JU.SB");
c$.openTag = Clazz.defineMethod (c$, "openTag", 
function (sb, name) {
sb.append ("<").append (name).append (">\n");
}, "JU.SB,~S");
c$.openTagAttr = Clazz.defineMethod (c$, "openTagAttr", 
function (sb, name, attributes) {
JU.XmlUtil.appendTagAll (sb, name, attributes, null, false, false);
sb.append ("\n");
}, "JU.SB,~S,~A");
c$.closeTag = Clazz.defineMethod (c$, "closeTag", 
function (sb, name) {
sb.append ("</").append (name).append (">\n");
}, "JU.SB,~S");
c$.appendTagAll = Clazz.defineMethod (c$, "appendTagAll", 
function (sb, name, attributes, data, isCdata, doClose) {
var closer = ">";
if (name.endsWith ("/")) {
name = name.substring (0, name.length - 1);
if (data == null) {
closer = "/>\n";
doClose = false;
}}sb.append ("<").append (name);
if (attributes != null) for (var i = 0; i < attributes.length; i++) {
var o = attributes[i];
if (o == null) continue;
if (Clazz.instanceOf (o, Array)) for (var j = 0; j < (o).length; j += 2) JU.XmlUtil.appendAttrib (sb, (o)[j], (o)[j + 1]);

 else JU.XmlUtil.appendAttrib (sb, o, attributes[++i]);
}
sb.append (closer);
if (data != null) {
if (isCdata) data = JU.XmlUtil.wrapCdata (data);
sb.appendO (data);
}if (doClose) JU.XmlUtil.closeTag (sb, name);
}, "JU.SB,~S,~A,~O,~B,~B");
c$.wrapCdata = Clazz.defineMethod (c$, "wrapCdata", 
function (data) {
var s = "" + data;
return (s.indexOf ("&") < 0 && s.indexOf ("<") < 0 ? (s.startsWith ("\n") ? "" : "\n") + s : "<![CDATA[" + JU.PT.rep (s, "]]>", "]]]]><![CDATA[>") + "]]>");
}, "~O");
c$.appendTagObj = Clazz.defineMethod (c$, "appendTagObj", 
function (sb, name, attributes, data) {
JU.XmlUtil.appendTagAll (sb, name, attributes, data, false, true);
}, "JU.SB,~S,~A,~O");
c$.appendTag = Clazz.defineMethod (c$, "appendTag", 
function (sb, name, data) {
if (Clazz.instanceOf (data, Array)) JU.XmlUtil.appendTagAll (sb, name, data, null, false, true);
 else JU.XmlUtil.appendTagAll (sb, name, null, data, false, true);
}, "JU.SB,~S,~O");
c$.appendCdata = Clazz.defineMethod (c$, "appendCdata", 
function (sb, name, attributes, data) {
JU.XmlUtil.appendTagAll (sb, name, attributes, data, true, true);
}, "JU.SB,~S,~A,~S");
c$.appendAttrib = Clazz.defineMethod (c$, "appendAttrib", 
function (sb, name, value) {
if (value == null) return;
sb.append (" ").appendO (name).append ("=\"").appendO (value).append ("\"");
}, "JU.SB,~O,~O");
});
