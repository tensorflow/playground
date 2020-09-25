Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.VaspPoscarReader", ["java.lang.Float", "JU.Lst", "$.M3", "$.PT", "$.SB", "J.api.JmolAdapter", "JU.Logger", "$.Parser"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atomLabels = null;
this.haveAtomLabels = true;
this.atomsLabeledInline = false;
this.scaleFac = 0;
this.ac = 0;
this.title = null;
this.quiet = false;
this.defaultLabels = null;
this.elementLabel = null;
this.radiusPt = -2147483648;
this.elementPt = -2147483648;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "VaspPoscarReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.isPrimitive = true;
this.readStructure (null);
this.continuing = false;
});
Clazz.defineMethod (c$, "readStructure", 
function (titleMsg) {
this.title = this.rd ().trim ();
var pt = this.title.indexOf ("--params");
if ((pt = this.title.indexOf ("& ", pt + 1)) >= 0) {
this.latticeType = this.title.substring (pt + 2, pt + 3);
JU.Logger.info ("AFLOW lattice:" + this.latticeType + " title=" + this.title);
}this.readUnitCellVectors ();
this.readMolecularFormula ();
this.readCoordinates ();
this.asc.setAtomSetName (this.title + (titleMsg == null ? "" : "[" + titleMsg + "]"));
}, "~S");
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
if (!this.haveAtomLabels && !this.atomsLabeledInline) this.appendLoadNote ("VASP POSCAR reader using pseudo atoms Al B C Db...");
this.finalizeReaderASCR ();
});
Clazz.defineMethod (c$, "readUnitCellVectors", 
function () {
this.setSpaceGroupName ("P1");
this.setFractionalCoordinates (true);
this.scaleFac = this.parseFloatStr (this.rdline ().trim ());
var isVolume = (this.scaleFac < 0);
if (isVolume) this.scaleFac = Math.pow (-this.scaleFac, 0.3333333333333333);
var unitCellData =  Clazz.newFloatArray (9, 0);
var s = this.rdline () + " " + this.rdline () + " " + this.rdline ();
JU.Parser.parseStringInfestedFloatArray (s, null, unitCellData);
if (isVolume) {
var m = JU.M3.newA9 (unitCellData);
this.scaleFac /= m.determinant3 ();
}if (this.scaleFac != 1) for (var i = 0; i < unitCellData.length; i++) unitCellData[i] *= this.scaleFac;

this.addExplicitLatticeVector (0, unitCellData, 0);
this.addExplicitLatticeVector (1, unitCellData, 3);
this.addExplicitLatticeVector (2, unitCellData, 6);
});
Clazz.defineMethod (c$, "readMolecularFormula", 
function () {
if (this.elementLabel == null) this.elementLabel = JU.PT.getTokens (this.discardLinesUntilNonBlank ());
var elementCounts;
if (JU.PT.parseInt (this.elementLabel[0]) == -2147483648) {
this.atomsLabeledInline = false;
elementCounts = JU.PT.getTokens (this.rdline ());
while (this.line != null && (elementCounts.length == 0 || this.parseIntStr (elementCounts[0]) == -2147483648)) elementCounts = JU.PT.getTokens (this.rdline ());

} else {
elementCounts = this.elementLabel;
this.elementLabel = JU.PT.split (this.title, " ");
if (this.elementLabel.length != elementCounts.length || this.elementLabel[0].length > 2) {
this.elementLabel = JU.PT.split ("Al B C Db Eu F Ga Hf I K Li Mn N O P Ru S Te U V W Xe Yb Zn", " ");
this.haveAtomLabels = false;
}}var labels = this.elementLabel;
var mf =  new JU.SB ();
this.atomLabels =  new JU.Lst ();
this.ac = 0;
for (var i = 0; i < elementCounts.length; i++) {
var n = Integer.parseInt (elementCounts[i]);
this.ac += n;
var label = labels[i];
mf.append (" ").append (label).appendI (n);
for (var j = n; --j >= 0; ) this.atomLabels.addLast (label);

}
var s = mf.toString ();
if (!this.quiet) this.appendLoadNote (this.ac + " atoms identified for" + s);
this.asc.newAtomSet ();
this.asc.setAtomSetName (s);
});
Clazz.defineMethod (c$, "readCoordinates", 
function () {
var isSelective = this.discardLinesUntilNonBlank ().toLowerCase ().contains ("selective");
if (isSelective) this.rd ();
var isCartesian = (this.line.toLowerCase ().contains ("cartesian"));
if (isCartesian) this.setFractionalCoordinates (false);
for (var i = 0; i < this.ac; i++) {
var radius = NaN;
var tokens = JU.PT.getTokens (this.rdline ());
if (this.radiusPt == -2147483648) {
for (var j = tokens.length; --j > 2; ) if (tokens[j].equals ("radius")) {
this.radiusPt = j + 1;
} else if (this.getElement (tokens[j]) != null) {
this.elementPt = j;
this.atomsLabeledInline = true;
}
}if (this.radiusPt >= 0) radius = this.parseFloatStr (tokens[this.radiusPt]);
var label = (this.atomsLabeledInline ? tokens[this.elementPt] : this.atomLabels.get (i));
if (isCartesian) for (var j = 0; j < 3; j++) tokens[j] = "" + this.parseFloatStr (tokens[j]) * this.scaleFac;

var atom = this.addAtomXYZSymName (tokens, 0, null, label);
if (!Float.isNaN (radius)) atom.radius = radius * this.scaleFac;
if (this.asc.bsAtoms != null) this.asc.bsAtoms.set (atom.index);
}
});
Clazz.defineMethod (c$, "getElement", 
function (token) {
var s = null;
switch (token.length) {
default:
s = (token.length > 2 ? token.substring (0, 2) : null);
if (s != null && J.api.JmolAdapter.getElementNumber (s) >= 0) return s;
case 1:
if (J.api.JmolAdapter.getElementNumber (s = token.substring (0)) >= 0) return s;
case 0:
return null;
}
}, "~S");
Clazz.defineMethod (c$, "rdline", 
function () {
this.rd ();
if (this.line != null && this.line.startsWith ("[")) this.line = this.line.substring (this.line.indexOf ("]") + 1).trim ();
return this.line;
});
});
