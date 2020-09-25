Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.AbinitReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.znucl = null;
this.inputOnly = false;
this.nAtom = 0;
this.nType = 0;
this.typeArray = null;
this.cellLattice = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "AbinitReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.setSpaceGroupName ("P1");
this.doApplySymmetry = true;
this.setFractionalCoordinates (false);
this.inputOnly = this.checkFilterKey ("INPUT");
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.contains ("natom")) {
this.readNoatom ();
} else if (this.line.contains ("ntypat") || this.line.contains ("ntype")) {
this.readNotypes ();
} else if (this.line.contains ("typat") || this.line.contains ("type")) {
this.readTypesequence ();
} else if (this.line.contains ("Pseudopotential")) {
this.readAtomSpecies ();
} else if (this.line.contains ("Symmetries :")) {
this.readSpaceGroup ();
} else if (this.line.contains ("Real(R)+Recip(G)")) {
this.readIntiallattice ();
if (this.inputOnly) this.continuing = false;
} else if (this.line.contains ("xcart")) {
this.readAtoms ();
}return true;
});
Clazz.defineMethod (c$, "readNoatom", 
 function () {
var tokens = this.getTokens ();
if (tokens.length <= 2) this.nAtom = this.parseIntStr (tokens[1]);
});
Clazz.defineMethod (c$, "readNotypes", 
 function () {
var tokens = this.getTokens ();
if (tokens.length <= 2) this.nType = this.parseIntStr (tokens[1]);
});
Clazz.defineMethod (c$, "readTypesequence", 
 function () {
this.fillFloatArray (this.line.substring (12), 0, this.typeArray =  Clazz.newFloatArray (this.nAtom, 0));
});
Clazz.defineMethod (c$, "readAtomSpecies", 
 function () {
this.znucl =  Clazz.newFloatArray (this.nType, 0);
for (var i = 0; i < this.nType; i++) {
this.discardLinesUntilContains ("zion");
var tokens = this.getTokens ();
this.znucl[i] = this.parseFloatStr (tokens[tokens[0] === "-" ? 1 : 0]);
}
});
Clazz.defineMethod (c$, "readSpaceGroup", 
 function () {
});
Clazz.defineMethod (c$, "readIntiallattice", 
 function () {
var f = 0;
this.cellLattice =  Clazz.newFloatArray (9, 0);
for (var i = 0; i < 9; i++) {
if (i % 3 == 0) {
this.line = this.rd ().substring (6);
f = this.parseFloatStr (this.line);
}this.cellLattice[i] = f * 0.5291772;
f = this.parseFloat ();
}
this.applySymmetry ();
});
Clazz.defineMethod (c$, "applySymmetry", 
 function () {
if (this.cellLattice == null) return;
this.setSpaceGroupName ("P1");
for (var i = 0; i < 3; i++) this.addExplicitLatticeVector (i, this.cellLattice, i * 3);

var atoms = this.asc.atoms;
var i0 = this.asc.getAtomSetAtomIndex (this.asc.iSet);
if (!this.iHaveFractionalCoordinates) for (var i = this.asc.ac; --i >= i0; ) this.setAtomCoord (atoms[i]);

this.applySymmetryAndSetTrajectory ();
});
Clazz.defineMethod (c$, "readAtoms", 
 function () {
this.asc.newAtomSet ();
this.iHaveFractionalCoordinates = false;
var i0 = this.asc.ac;
this.line = this.line.substring (12);
while (this.line != null && !this.line.contains ("x")) {
var atom = this.asc.addNewAtom ();
this.setAtomCoordScaled (atom, this.getTokens (), 0, 0.5291772);
this.rd ();
}
this.discardLinesUntilContains ("z");
if (this.znucl == null) this.fillFloatArray (this.line.substring (12), 0, this.znucl =  Clazz.newFloatArray (this.nType, 0));
var atoms = this.asc.atoms;
for (var i = 0; i < this.nAtom; i++) atoms[i + i0].elementNumber = Clazz.floatToShort (this.znucl[Clazz.floatToInt (this.typeArray[i]) - 1]);

this.applySymmetry ();
});
});
