Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.readers.xml.XmlMOReader"], "J.adapter.readers.xml.XmlMolproReader", ["JU.PT"], function () {
c$ = Clazz.declareType (J.adapter.readers.xml, "XmlMolproReader", J.adapter.readers.xml.XmlMOReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.xml.XmlMolproReader, []);
this.dslist = "d0 d2- d1+ d2+ d1-";
this.fclist = "XXX YYY ZZZ XXY XXZ XYY YYZ XZZ YZZ XYZ";
this.fslist = "f1+ f1- f0 f3+ f2- f3- f2+";
this.iHaveCoefMaps = true;
});
Clazz.overrideMethod (c$, "processStartElement", 
function (localName, nodeName) {
if (!this.processing) return;
this.processStart2 (localName);
if (!this.processStartMO (localName)) {
if (localName.equals ("normalcoordinate")) {
this.setKeepChars (false);
if (!this.parent.doGetVibration (++this.vibrationNumber)) return;
try {
this.asc.cloneLastAtomSet ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("" + e);
this.asc.errorMessage = "Error processing normalCoordinate: " + e.getMessage ();
this.vibrationNumber = 0;
return;
} else {
throw e;
}
}
if (this.atts.containsKey ("wavenumber")) {
var wavenumber = this.atts.get ("wavenumber");
var units = "cm^-1";
if (this.atts.containsKey ("units")) {
units = this.atts.get ("units");
if (units.startsWith ("inverseCent")) units = "cm^-1";
}this.asc.setAtomSetFrequency (this.vibrationNumber, null, null, wavenumber, units);
this.setKeepChars (true);
}return;
}if (localName.equals ("vibrations")) {
this.vibrationNumber = 0;
return;
}}}, "~S,~S");
Clazz.overrideMethod (c$, "processEndElement", 
function (localName) {
if (!this.processEndMO (localName)) {
if (localName.equals ("normalcoordinate")) {
if (!this.keepChars) return;
var ac = this.asc.getLastAtomSetAtomCount ();
var baseAtomIndex = this.asc.getLastAtomSetAtomIndex ();
this.tokens = JU.PT.getTokens (this.chars.toString ());
for (var offset = this.tokens.length - ac * 3, i = 0; i < ac; i++) {
this.asc.addVibrationVector (i + baseAtomIndex, this.parseFloatStr (this.tokens[offset++]), this.parseFloatStr (this.tokens[offset++]), this.parseFloatStr (this.tokens[offset++]));
}
this.setKeepChars (false);
}}this.processEnd2 (localName);
}, "~S");
});
