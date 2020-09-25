Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.readers.xml.XmlCmlReader"], "J.adapter.readers.xml.XmlMOReader", ["java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "J.adapter.readers.quantum.MOReader", "J.adapter.smarter.Resolver", "J.quantum.QS", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.moReader = null;
this.skipMOs = false;
this.htSlaterIDs = null;
this.basisData = null;
this.basisId = null;
this.isSpherical = false;
this.minL = 0;
this.maxL = 0;
this.basisIds = null;
this.basisAtoms = null;
this.orbOcc = 0;
this.orbEnergy = 0;
this.gaussianCount = 0;
this.slaterCount = 0;
this.coefCount = 0;
this.groupCount = 0;
this.lstGaussians = null;
this.moCount = 0;
this.calcType = null;
this.iModelMO = 0;
this.dclist = null;
this.dslist = null;
this.fclist = null;
this.fslist = null;
this.iHaveCoefMaps = false;
this.maxContraction = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xml, "XmlMOReader", J.adapter.readers.xml.XmlCmlReader);
Clazz.overrideMethod (c$, "processXml", 
function (parent, saxReader) {
this.htModelAtomMap =  new java.util.Hashtable ();
this.processXml2 (parent, saxReader);
}, "J.adapter.readers.xml.XmlReader,~O");
Clazz.defineMethod (c$, "processStartMO", 
function (localName) {
if (!this.parent.doReadMolecularOrbitals) return false;
if (localName.equals ("molecule")) {
var method = this.atts.get ("method");
if (method != null) this.calcType = method + "(" + this.atts.get ("basis") + ")";
return true;
}if (localName.equals ("basisset")) {
this.iModelMO = this.asc.iSet;
this.lstGaussians =  new JU.Lst ();
this.htSlaterIDs =  new java.util.Hashtable ();
this.coefCount = this.groupCount = this.gaussianCount = this.slaterCount = 0;
if (this.moReader == null && !this.skipMOs) {
var rdr = J.adapter.smarter.Resolver.getReader ("MO", this.parent.htParams);
if ((Clazz.instanceOf (rdr, String))) {
this.skipMOs = true;
} else {
this.moReader = rdr;
this.moReader.asc = this.asc;
if (this.iHaveCoefMaps) {
var m = this.moReader.getDfCoefMaps ();
if (this.dclist != null) J.quantum.QS.createDFMap (m[4], this.dclist, "DXX   DYY   DZZ   DXY   DXZ   DYZ", 2);
if (this.dslist != null) J.quantum.QS.createDFMap (m[3], this.dslist, "d0    d1+   d1-   d2+   d2-", 2);
if (this.fclist != null) J.quantum.QS.createDFMap (m[6], this.fclist, "XXX   YYY   ZZZ   XYY   XXY   XXZ   XZZ   YZZ   YYZ   XYZ", 2);
if (this.fslist != null) J.quantum.QS.createDFMap (m[5], this.fslist, "f0    f1+   f1-   f2+   f2-   f3+   f3-", 2);
}}}if (this.moReader != null) this.moReader.calculationType = this.calcType;
return true;
}if (this.moReader != null) {
if (localName.equals ("basisgroup")) {
this.groupCount++;
this.basisId = this.atts.get ("id");
this.isSpherical = "spherical".equalsIgnoreCase (this.atts.get ("angular"));
this.minL = JU.PT.parseInt (this.atts.get ("minl"));
this.maxL = JU.PT.parseInt (this.atts.get ("maxl"));
var nContractions = JU.PT.parseInt (this.atts.get ("contractions"));
var n = nContractions * (this.isSpherical ? this.minL * 2 + 1 : Clazz.doubleToInt (this.minL * (this.minL + 3) / 2) + 1);
this.htModelAtomMap.put (this.basisId + "_count", Integer.$valueOf (n));
return true;
}if (localName.equals ("basisexponents") || localName.equals ("basiscontraction")) {
this.setKeepChars (true);
return true;
}if (localName.equals ("orbital") && this.gaussianCount > 0) {
this.orbOcc = JU.PT.parseFloat (this.atts.get ("occupation"));
this.orbEnergy = JU.PT.parseFloat (this.atts.get ("energy"));
this.setKeepChars (true);
return true;
}}return false;
}, "~S");
Clazz.defineMethod (c$, "processEndMO", 
function (localName) {
if (this.moReader != null) {
if (localName.equals ("basisexponents")) {
this.basisData =  new JU.Lst ();
this.basisData.addLast (JU.PT.parseFloatArray (this.chars.toString ()));
this.setKeepChars (false);
return true;
}if (localName.equals ("basiscontraction")) {
var data = JU.PT.parseFloatArray (this.chars.toString ());
this.basisData.addLast (data);
if (this.basisData.size () > this.maxContraction) this.maxContraction = this.basisData.size ();
this.setKeepChars (false);
return true;
}if (localName.equals ("basisgroup")) {
var otype;
switch (this.minL) {
case 0:
otype = (this.maxL == 1 ? "L" : "S");
break;
case 1:
otype = "P";
break;
default:
otype = (this.minL <= 7 ? "SPDFGHI".substring (this.minL, this.minL + 1) : "?");
if (this.isSpherical) otype = (2 * (this.minL) + 1) + otype;
}
this.lstGaussians.addLast (this.basisData);
var nPrimitives = this.basisData.get (0).length;
for (var i = 1, n = this.basisData.size (); i < n; i++) {
this.htSlaterIDs.put (this.basisId + "_" + i,  Clazz.newIntArray (-1, [-1, this.moReader.getQuantumShellTagID (otype), this.gaussianCount + 1, nPrimitives]));
this.gaussianCount += nPrimitives;
}
return true;
}if (localName.equals ("basisset")) {
this.buildSlaters ();
return true;
}if (localName.equals ("orbital")) {
if (this.gaussianCount == 0) return true;
var coef = JU.PT.parseFloatArray (this.chars.toString ());
if (this.moCount == 0) {
if (coef.length != this.coefCount) {
JU.Logger.error ("Number of orbital coefficients (" + coef.length + ") does not agree with expected number (" + this.coefCount + ")");
this.moReader = null;
return this.skipMOs = true;
}JU.Logger.info (this.coefCount + " coefficients found");
}this.moReader.addCoef ( new java.util.Hashtable (), coef, null, this.orbEnergy, this.orbOcc, this.moCount++);
this.setKeepChars (false);
return true;
}if (localName.equals ("orbitals")) {
this.moReader.setMOData (true);
JU.Logger.info ("XmlMOReader created\n " + this.gaussianCount + " gaussians\n " + this.slaterCount + " slaters\n " + this.groupCount + " groups\n " + this.coefCount + " orbital coefficients\n " + this.moCount + " orbitals");
return true;
}if (this.state == 19) {
if (localName.equals ("bases")) {
this.basisIds = this.getXlink (this.atts.get ("href"), "basisGroup", false);
} else if (localName.equals ("atoms")) {
this.basisAtoms = this.getXlink (this.atts.get ("href"), "atom", true);
} else if (localName.equals ("association")) {
this.state = 6;
for (var i = this.basisAtoms.length; --i >= 0; ) {
var a = this.htModelAtomMap.get (this.basisAtoms[i]);
if (a == null) {
JU.Logger.error ("XmlMOReader atom not found; orbitals skipped: " + a);
this.moReader = null;
return this.skipMOs = true;
}this.htModelAtomMap.put (this.basisAtoms[i] + "_basis", this.basisIds);
}
this.slaterCount += this.basisIds.length * this.basisAtoms.length;
}return true;
}}return false;
}, "~S");
Clazz.defineMethod (c$, "buildSlaters", 
 function () {
var gaussians = JU.AU.newFloat2 (this.gaussianCount);
for (var i = 0, p = 0, n = this.lstGaussians.size (); i < n; i++) {
this.basisData = this.lstGaussians.get (i);
var exp = this.basisData.get (0);
for (var ii = 1, nn = this.basisData.size (); ii < nn; ii++) {
var coef = this.basisData.get (ii);
for (var j = 0; j < exp.length; j++) gaussians[p++] =  Clazz.newFloatArray (-1, [exp[j], coef[j], 0]);

}
}
this.moReader.gaussians = gaussians;
var slaters =  new JU.Lst ();
var modelID = this.htModelAtomMap.get ("" + this.iModelMO);
var i0 = this.asc.getAtomSetAtomIndex (this.iModelMO);
for (var i = 0, n = this.asc.getAtomSetAtomCount (this.iModelMO); i < n; i++) {
var ids = this.htModelAtomMap.get (modelID + this.asc.atoms[i0 + i].atomName + "_basis");
if (ids == null) continue;
for (var k = 0; k < ids.length; k++) {
var key = ids[k] + "_count";
this.coefCount += (this.htModelAtomMap.get (key)).intValue ();
for (var kk = 1; kk < this.maxContraction; kk++) {
var slater = this.htSlaterIDs.get (ids[k] + "_" + kk);
if (slater == null) break;
slater = JU.AU.arrayCopyI (slater, -1);
this.moReader.shells = slaters;
slater[0] = i + 1;
slaters.addLast (slater);
}
}
}
});
Clazz.defineMethod (c$, "getXlink", 
 function (href, key, addMoleculeID) {
var p = href.indexOf (key + "[") + 1;
var tokens = JU.PT.split (href.substring (p), "'");
var data =  new Array (Clazz.doubleToInt (tokens.length / 2));
var molID = (addMoleculeID ? JU.PT.getQuotedAttribute (href.substring (0, p).$replace ('\'', '"'), "molecule[@id") : "");
for (var i = 1, pt = 0; i < tokens.length; i += 2) data[pt++] = molID + tokens[i];

return data;
}, "~S,~S,~B");
});
