Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.readers.xml.XmlReader"], "J.adapter.readers.xml.XmlMagResReader", ["JU.Logger"], function () {
c$ = Clazz.declareType (J.adapter.readers.xml, "XmlMagResReader", J.adapter.readers.xml.XmlReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.xml.XmlMagResReader, []);
});
Clazz.overrideMethod (c$, "processXml", 
function (parent, saxReader) {
parent.doProcessLines = true;
this.processXml2 (parent, saxReader);
}, "J.adapter.readers.xml.XmlReader,~O");
Clazz.overrideMethod (c$, "processStartElement", 
function (localName, nodeName) {
if (this.debugging) JU.Logger.debug ("xmlmagres: start " + localName);
if (!this.parent.continuing) return;
if ("calculation".equals (localName)) {
this.setKeepChars (true);
return;
}if ("atoms".equals (localName)) {
this.setKeepChars (true);
return;
}}, "~S,~S");
Clazz.overrideMethod (c$, "processEndElement", 
function (localName) {
if (this.debugging) JU.Logger.debug ("xmlmagres: end " + localName);
while (true) {
if ("calculation".equals (localName)) {
break;
}if (!this.parent.doProcessLines) break;
if ("atoms".equals (localName)) {
break;
}return;
}
this.setKeepChars (false);
}, "~S");
});
