Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.readers.xml.XmlReader"], "J.adapter.readers.xml.XmlQEReader", ["JU.PT", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.a = 0;
this.b = 0;
this.c = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xml, "XmlQEReader", J.adapter.readers.xml.XmlReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.xml.XmlQEReader, []);
});
Clazz.overrideMethod (c$, "processXml", 
function (parent, saxReader) {
parent.doProcessLines = true;
this.processXml2 (parent, saxReader);
}, "J.adapter.readers.xml.XmlReader,~O");
Clazz.overrideMethod (c$, "processStartElement", 
function (localName, nodeName) {
if (this.debugging) JU.Logger.debug ("xmlqe: start " + localName);
if (!this.parent.continuing) return;
if ("number_of_atoms".equals (localName) || "cell_dimensions".equals (localName) || "at".equals (localName)) {
this.setKeepChars (true);
return;
}if (localName.startsWith ("atom.")) {
this.parent.setAtomCoordScaled (null, JU.PT.getTokens (this.atts.get ("tau")), 0, 0.5291772).elementSymbol = this.atts.get ("species").trim ();
}if ("structure".equals (localName)) {
if (!this.parent.doGetModel (++this.parent.modelNumber, null)) {
this.parent.checkLastModel ();
return;
}this.parent.setFractionalCoordinates (true);
this.asc.doFixPeriodic = true;
this.asc.newAtomSet ();
return;
}if (!this.parent.doProcessLines) return;
}, "~S,~S");
Clazz.overrideMethod (c$, "processEndElement", 
function (localName) {
if (this.debugging) JU.Logger.debug ("xmlqe: end " + localName);
while (true) {
if (!this.parent.doProcessLines) break;
if ("cell_dimensions".equals (localName)) {
this.parent.setFractionalCoordinates (true);
var data = J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (this.chars.toString (), null, 6);
this.a = data[0];
this.b = (data[1] == 0 ? this.a : data[1]);
this.c = (data[2] == 0 ? this.a : data[2]);
break;
}if ("at".equals (localName)) {
var m = J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (this.chars.toString (), null, 9);
for (var i = 0; i < 9; i += 3) {
m[i] *= this.a;
m[i + 1] *= this.b;
m[i + 2] *= this.c;
}
this.parent.addExplicitLatticeVector (0, m, 0);
this.parent.addExplicitLatticeVector (1, m, 3);
this.parent.addExplicitLatticeVector (2, m, 6);
break;
}if ("geometry_info".equals (localName)) {
try {
this.parent.applySymmetryAndSetTrajectory ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
break;
}return;
}
this.setKeepChars (false);
}, "~S");
});
