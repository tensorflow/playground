Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "JU.SB"], "J.adapter.readers.xml.XmlReader", ["java.io.BufferedInputStream", "java.util.Hashtable", "JU.Rdr", "J.adapter.smarter.AtomSetCollection", "$.Resolver", "J.api.Interface", "JU.Logger", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atom = null;
this.bond = null;
this.parent = null;
this.atts = null;
this.keepChars = false;
this.chars = null;
this.domObj = null;
this.attribs = null;
this.attArgs = null;
this.nullObj = null;
if (!Clazz.isClassDefined ("J.adapter.readers.xml.XmlReader.NVPair")) {
J.adapter.readers.xml.XmlReader.$XmlReader$NVPair$ ();
}
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xml, "XmlReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.chars = JU.SB.newN (2000);
this.domObj =  new Array (1);
this.nullObj =  new Array (0);
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.initCML ();
});
Clazz.defineMethod (c$, "initCML", 
function () {
this.atts =  new java.util.Hashtable ();
this.setMyError (this.parseXML ());
this.continuing = false;
});
Clazz.defineMethod (c$, "setMyError", 
 function (err) {
if (err != null && (this.asc == null || this.asc.errorMessage == null)) {
this.asc =  new J.adapter.smarter.AtomSetCollection ("xml", this, null, null);
this.asc.errorMessage = err;
}}, "~S");
Clazz.defineMethod (c$, "parseXML", 
 function () {
var saxReader = null;
{
}return this.selectReaderAndGo (saxReader);
});
Clazz.defineMethod (c$, "selectReaderAndGo", 
 function (saxReader) {
this.asc =  new J.adapter.smarter.AtomSetCollection (this.readerName, this, null, null);
var className = null;
var thisReader = null;
var pt = this.readerName.indexOf ("(");
var name = (pt < 0 ? this.readerName : this.readerName.substring (0, pt));
className = J.adapter.smarter.Resolver.getReaderClassBase (name);
if ((thisReader = this.getInterface (className)) == null) return "File reader was not found: " + className;
try {
thisReader.processXml (this, saxReader);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return "Error reading XML: " + (((this.parent == null ? this.vwr : this.parent.vwr), JV.Viewer).isJS ? e : e.getMessage ());
} else {
throw e;
}
}
return null;
}, "~O");
Clazz.defineMethod (c$, "processXml", 
function (parent, saxReader) {
this.processXml2 (parent, saxReader);
}, "J.adapter.readers.xml.XmlReader,~O");
Clazz.defineMethod (c$, "processXml2", 
function (parent, saxReader) {
this.parent = parent;
this.asc = parent.asc;
this.reader = parent.reader;
this.atts = parent.atts;
if (saxReader == null) {
this.attribs =  new Array (1);
this.attArgs =  new Array (1);
this.domObj =  new Array (1);
var o = "";
var data = null;
{
o = this.reader.lock.lock; if (o.$in) data = o.$in.buf;
}if (Clazz.instanceOf (o, java.io.BufferedInputStream)) o = JU.Rdr.streamToUTF8String (JU.Rdr.getBIS (data));
var isjs = false;
{
isjs = true;
}if (isjs) {
this.domObj[0] = this.createDomNodeJS ("xmlReader", o);
this.walkDOMTree ();
this.createDomNodeJS ("xmlReader", null);
}} else {
(J.api.Interface.getOption ("adapter.readers.xml.XmlHandler", this.vwr, "file")).parseXML (this, saxReader, this.reader);
}}, "J.adapter.readers.xml.XmlReader,~O");
Clazz.defineMethod (c$, "createDomNodeJS", 
function (id, data) {
var applet = this.parent.vwr.html5Applet;
var d = null;
{
if (!data)
return null;
if (data.indexOf("<?") == 0)
data = data.substring(data.indexOf("<", 1));
if (data.indexOf("/>") >= 0) {
var D = data.split("/>");
for (var i = D.length - 1; --i >= 0;) {
var s = D[i];
var pt = s.lastIndexOf("<") + 1;
var pt2 = pt;
var len = s.length;
var name = "";
while (++pt2 < len) {
if (" \t\n\r".indexOf(s.charAt(pt2))>= 0) {
var name = s.substring(pt, pt2);
D[i] = s + "></"+name+">";
break;
}
}
}
data = D.join('');
}
d = document.createElement("_xml");
d.innerHTML = data;
}return d;
}, "~S,~O");
Clazz.overrideMethod (c$, "applySymmetryAndSetTrajectory", 
function () {
try {
if (this.parent == null) this.applySymTrajASCR ();
 else this.parent.applySymmetryAndSetTrajectory ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (((this.parent == null ? this : this.parent).vwr, JV.Viewer).isJS ? e : e.getMessage ());
JU.Logger.error ("applySymmetry failed: " + e);
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "processDOM", 
function (DOMNode) {
this.domObj =  Clazz.newArray (-1, [DOMNode]);
this.setMyError (this.selectReaderAndGo (null));
}, "~O");
Clazz.defineMethod (c$, "processStartElement", 
function (localName, nodeName) {
}, "~S,~S");
Clazz.defineMethod (c$, "setKeepChars", 
function (TF) {
this.keepChars = TF;
this.chars.setLength (0);
}, "~B");
Clazz.defineMethod (c$, "processEndElement", 
function (localName) {
}, "~S");
Clazz.defineMethod (c$, "walkDOMTree", 
 function () {
var localName;
{
localName = "nodeName";
}var nodeName = (this.jsObjectGetMember (this.domObj, localName));
localName = this.fixLocal (nodeName);
if (localName == null) return;
if (localName.equals ("#text")) {
if (this.keepChars) this.chars.append (this.jsObjectGetMember (this.domObj, "data"));
return;
}localName = localName.toLowerCase ();
nodeName = nodeName.toLowerCase ();
this.attribs[0] = this.jsObjectGetMember (this.domObj, "attributes");
this.getDOMAttributesA (this.attribs);
this.processStartElement (localName, nodeName);
var haveChildren;
{
haveChildren = this.domObj[0].hasChildNodes;
}if (haveChildren) {
var nextNode = this.jsObjectGetMember (this.domObj, "firstChild");
while (nextNode != null) {
this.domObj[0] = nextNode;
this.walkDOMTree ();
this.domObj[0] = nextNode;
nextNode = this.jsObjectGetMember (this.domObj, "nextSibling");
}
}this.processEndElement (localName);
});
Clazz.defineMethod (c$, "fixLocal", 
 function (name) {
{
var pt = (name== null ? -1 : name.indexOf(":")); return (pt >=
0 ? name.substring(pt+1) : name);
}}, "~S");
Clazz.defineMethod (c$, "getDOMAttributesA", 
 function (attributes) {
this.atts.clear ();
if (attributes == null) return;
var nodes = null;
{
nodes = attributes[0];
}for (var i = nodes.length; --i >= 0; ) this.atts.put (this.fixLocal (nodes[i].name).toLowerCase (), nodes[i].value);

}, "~A");
Clazz.defineMethod (c$, "jsObjectGetMember", 
 function (jsObject, name) {
{
return jsObject[0][name];
}}, "~A,~S");
Clazz.defineMethod (c$, "endDocument", 
function () {
});
c$.$XmlReader$NVPair$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.name = null;
this.value = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xml.XmlReader, "NVPair");
c$ = Clazz.p0p ();
};
});
