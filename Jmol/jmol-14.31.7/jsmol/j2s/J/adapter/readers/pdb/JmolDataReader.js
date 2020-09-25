Clazz.declarePackage ("J.adapter.readers.pdb");
Clazz.load (["J.adapter.readers.pdb.PdbReader"], "J.adapter.readers.pdb.JmolDataReader", ["java.util.Hashtable", "JU.P3", "JU.Logger", "$.Parser"], function () {
c$ = Clazz.decorateAsClass (function () {
this.props = null;
this.residueNames = null;
this.atomNames = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.pdb, "JmolDataReader", J.adapter.readers.pdb.PdbReader);
Clazz.overrideMethod (c$, "checkRemark", 
function () {
while (true) {
if (this.line.length < 30 || this.line.indexOf ("Jmol") != 11) break;
switch ("Ppard".indexOf (this.line.substring (16, 17))) {
case 0:
this.props =  new java.util.Hashtable ();
this.asc.setInfo ("jmolData", this.line);
if (!this.line.endsWith ("#noautobond")) this.line += "#noautobond";
break;
case 1:
var pt1 = this.line.indexOf ("[");
var pt2 = this.line.indexOf ("]");
if (pt1 < 25 || pt2 <= pt1) return;
var name = this.line.substring (25, pt1).trim ();
this.line = this.line.substring (pt1 + 1, pt2).$replace (',', ' ');
var tokens = this.getTokens ();
JU.Logger.info ("reading " + name + " " + tokens.length);
var prop =  Clazz.newFloatArray (tokens.length, 0);
for (var i = prop.length; --i >= 0; ) prop[i] = this.parseFloatStr (tokens[i]);

this.props.put (name, prop);
break;
case 2:
this.line = this.line.substring (27);
this.atomNames = this.getTokens ();
JU.Logger.info ("reading atom names " + this.atomNames.length);
break;
case 3:
this.line = this.line.substring (30);
this.residueNames = this.getTokens ();
JU.Logger.info ("reading residue names " + this.residueNames.length);
break;
case 4:
JU.Logger.info (this.line);
var data =  Clazz.newFloatArray (15, 0);
JU.Parser.parseStringInfestedFloatArray (this.line.substring (10).$replace ('=', ' ').$replace ('{', ' ').$replace ('}', ' '), null, data);
var minXYZ = JU.P3.new3 (data[0], data[1], data[2]);
var maxXYZ = JU.P3.new3 (data[3], data[4], data[5]);
this.fileScaling = JU.P3.new3 (data[6], data[7], data[8]);
this.fileOffset = JU.P3.new3 (data[9], data[10], data[11]);
var plotScale = JU.P3.new3 (data[12], data[13], data[14]);
if (plotScale.x <= 0) plotScale.x = 100;
if (plotScale.y <= 0) plotScale.y = 100;
if (plotScale.z <= 0) plotScale.z = 100;
if (this.fileScaling.y == 0) this.fileScaling.y = 1;
if (this.fileScaling.z == 0) this.fileScaling.z = 1;
this.setFractionalCoordinates (true);
this.latticeCells =  Clazz.newIntArray (4, 0);
this.asc.xtalSymmetry = null;
this.setUnitCell (plotScale.x * 2 / (maxXYZ.x - minXYZ.x), plotScale.y * 2 / (maxXYZ.y - minXYZ.y), plotScale.z * 2 / (maxXYZ.z == minXYZ.z ? 1 : maxXYZ.z - minXYZ.z), 90, 90, 90);
this.unitCellOffset = JU.P3.newP (plotScale);
this.unitCellOffset.scale (-1);
this.getSymmetry ();
this.symmetry.toFractional (this.unitCellOffset, false);
this.unitCellOffset.scaleAdd2 (-1.0, minXYZ, this.unitCellOffset);
this.symmetry.setOffsetPt (this.unitCellOffset);
this.asc.setInfo ("jmolDataScaling",  Clazz.newArray (-1, [minXYZ, maxXYZ, plotScale]));
this.doApplySymmetry = true;
break;
}
break;
}
this.checkCurrentLineForScript ();
});
Clazz.overrideMethod (c$, "setAdditionalAtomParameters", 
function (atom) {
if (this.residueNames != null && atom.index < this.residueNames.length) atom.group3 = this.residueNames[atom.index];
if (this.atomNames != null && atom.index < this.atomNames.length) atom.atomName = this.atomNames[atom.index];
}, "J.adapter.smarter.Atom");
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.asc.setCurrentModelInfo ("jmolDataProperties", this.props);
this.finalizeReaderPDB ();
});
});
