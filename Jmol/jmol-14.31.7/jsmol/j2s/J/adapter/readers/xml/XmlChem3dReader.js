Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.readers.xml.XmlReader", "JU.Lst"], "J.adapter.readers.xml.XmlChem3dReader", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.PT", "J.adapter.smarter.Atom", "J.api.Interface", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.orbitals = null;
this.moData = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xml, "XmlChem3dReader", J.adapter.readers.xml.XmlReader);
Clazz.prepareFields (c$, function () {
this.orbitals =  new JU.Lst ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.xml.XmlChem3dReader, []);
});
Clazz.overrideMethod (c$, "processXml", 
function (parent, saxReader) {
this.processXml2 (parent, saxReader);
this.finalizeMOData (this.moData);
}, "J.adapter.readers.xml.XmlReader,~O");
Clazz.overrideMethod (c$, "processStartElement", 
function (localName, nodeName) {
var tokens;
if ("model".equals (localName)) {
this.asc.newAtomSet ();
return;
}if ("atom".equals (localName)) {
this.atom =  new J.adapter.smarter.Atom ();
this.atom.atomName = this.atts.get ("id");
this.atom.elementSymbol = this.atts.get ("symbol");
if (this.atts.containsKey ("cartcoords")) {
var xyz = this.atts.get ("cartcoords");
tokens = JU.PT.getTokens (xyz);
this.atom.set (this.parseFloatStr (tokens[0]), this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]));
}return;
}if ("bond".equals (localName)) {
var atom1 = this.atts.get ("bondatom1");
var atom2 = this.atts.get ("bondatom2");
var order = 1;
if (this.atts.containsKey ("bondorder")) order = this.parseIntStr (this.atts.get ("bondorder"));
this.asc.addNewBondFromNames (atom1, atom2, order);
return;
}if ("electronicstructurecalculation".equals (localName)) {
tokens = JU.PT.getTokens (this.atts.get ("calcpartialcharges"));
var tokens2 = JU.PT.getTokens (this.atts.get ("calcatoms"));
for (var i = this.parseIntStr (tokens[0]); --i >= 0; ) this.asc.mapPartialCharge (tokens2[i + 1], this.parseFloatStr (tokens[i + 1]));

}if ("griddata".equals (localName)) {
var nPointsX = this.parseIntStr (this.atts.get ("griddatxdim"));
var nPointsY = this.parseIntStr (this.atts.get ("griddatydim"));
var nPointsZ = this.parseIntStr (this.atts.get ("griddatzdim"));
var xStep = this.parseFloatStr (this.atts.get ("griddatxsize")) / (nPointsX);
var yStep = this.parseFloatStr (this.atts.get ("griddatysize")) / (nPointsY);
var zStep = this.parseFloatStr (this.atts.get ("griddatzsize")) / (nPointsZ);
tokens = JU.PT.getTokens (this.atts.get ("griddatorigin"));
var ox = this.parseFloatStr (tokens[0]);
var oy = this.parseFloatStr (tokens[1]);
var oz = this.parseFloatStr (tokens[2]);
tokens = JU.PT.getTokens (this.atts.get ("griddatdata"));
var pt = 1;
var voxelData =  Clazz.newFloatArray (nPointsX, nPointsY, nPointsZ, 0);
var sum = 0;
for (var z = 0; z < nPointsZ; z++) for (var y = 0; y < nPointsY; y++) for (var x = 0; x < nPointsX; x++) {
var f = this.parseFloatStr (tokens[pt++]);
voxelData[x][y][z] = f;
sum += f * f;
}


sum = (1 / Math.sqrt (sum));
for (var z = 0; z < nPointsZ; z++) for (var y = 0; y < nPointsY; y++) for (var x = 0; x < nPointsX; x++) {
voxelData[x][y][z] *= sum;
}


var vd = J.api.Interface.getOption ("jvxl.data.VolumeData", this.vwr, "file");
vd.setVoxelCounts (nPointsX, nPointsY, nPointsZ);
vd.setVolumetricVector (0, xStep, 0, 0);
vd.setVolumetricVector (1, 0, yStep, 0);
vd.setVolumetricVector (2, 0, 0, zStep);
vd.setVolumetricOrigin (ox, oy, oz);
vd.setVoxelDataAsArray (voxelData);
if (this.moData == null) {
this.moData =  new java.util.Hashtable ();
this.moData.put ("defaultCutoff", Float.$valueOf (0.01));
this.moData.put ("haveVolumeData", Boolean.TRUE);
this.moData.put ("calculationType", "Chem3D");
this.orbitals =  new JU.Lst ();
this.moData.put ("mos", this.orbitals);
}var mo =  new java.util.Hashtable ();
mo.put ("volumeData", vd);
this.orbitals.addLast (mo);
JU.Logger.info ("Chem3D molecular orbital data displayable using ISOSURFACE MO " + this.orbitals.size ());
return;
}}, "~S,~S");
Clazz.overrideMethod (c$, "processEndElement", 
function (localName) {
if ("atom".equals (localName)) {
if (this.atom.elementSymbol != null && !Float.isNaN (this.atom.z)) {
this.parent.setAtomCoord (this.atom);
this.asc.addAtomWithMappedName (this.atom);
}this.atom = null;
return;
}this.setKeepChars (false);
}, "~S");
});
