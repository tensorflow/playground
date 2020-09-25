Clazz.declarePackage ("J.adapter.readers.more");
Clazz.load (["J.adapter.readers.more.ForceFieldReader"], "J.adapter.readers.more.Mol2Reader", ["java.lang.Character", "JU.PT", "J.adapter.smarter.Bond"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nAtoms = 0;
this.ac = 0;
this.isPDB = false;
this.lastSequenceNumber = 2147483647;
this.chainID = 64;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.more, "Mol2Reader", J.adapter.readers.more.ForceFieldReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.setUserAtomTypes ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.equals ("@<TRIPOS>MOLECULE")) {
if (!this.processMolecule ()) {
return true;
}this.continuing = !this.isLastModel (this.modelNumber);
return false;
}if (this.line.length != 0 && this.line.charAt (0) == '#') {
this.checkCurrentLineForScript ();
}return true;
});
Clazz.defineMethod (c$, "processMolecule", 
 function () {
this.isPDB = false;
var thisDataSetName = this.rd ().trim ();
if (!this.doGetModel (++this.modelNumber, thisDataSetName)) {
return false;
}this.lastSequenceNumber = 2147483647;
this.chainID = 64;
this.rd ();
this.line += " 0 0 0 0 0 0";
this.ac = this.parseIntStr (this.line);
var bondCount = this.parseInt ();
if (bondCount == 0) this.asc.setNoAutoBond ();
var resCount = this.parseInt ();
this.rd ();
this.rd ();
if (this.rd () != null && (this.line.length == 0 || this.line.charAt (0) != '@')) {
if (this.rd () != null && this.line.length != 0 && this.line.charAt (0) != '@') {
if (this.line.indexOf ("jmolscript:") >= 0) {
this.checkCurrentLineForScript ();
if (this.line.equals ("#")) {
this.line = "";
}}if (this.line.length != 0) {
thisDataSetName += ": " + this.line.trim ();
}}}this.newAtomSet (thisDataSetName);
while (this.line != null && !this.line.equals ("@<TRIPOS>MOLECULE")) {
if (this.line.equals ("@<TRIPOS>ATOM")) {
this.readAtoms (this.ac);
this.asc.setAtomSetName (thisDataSetName);
} else if (this.line.equals ("@<TRIPOS>BOND")) {
this.readBonds (bondCount);
} else if (this.line.equals ("@<TRIPOS>SUBSTRUCTURE")) {
this.readResInfo (resCount);
} else if (this.line.equals ("@<TRIPOS>CRYSIN")) {
this.readCrystalInfo ();
}this.rd ();
}
this.nAtoms += this.ac;
if (this.isPDB) {
this.setIsPDB ();
this.setModelPDB (true);
}this.applySymmetryAndSetTrajectory ();
return true;
});
Clazz.defineMethod (c$, "readAtoms", 
 function (ac) {
if (ac == 0) return;
var i0 = this.asc.ac;
for (var i = 0; i < ac; ++i) {
var atom = this.asc.addNewAtom ();
var tokens = JU.PT.getTokens (this.rd ());
var atomType = tokens[5];
var name = tokens[1];
var pt = atomType.indexOf (".");
if (pt >= 0) {
atom.elementSymbol = atomType.substring (0, pt);
} else {
atom.atomName = name;
atom.elementSymbol = atom.getElementSymbol ();
}atom.atomName = name + '\0' + atomType;
atom.set (this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]));
if (tokens.length > 6) {
atom.sequenceNumber = this.parseIntStr (tokens[6]);
if (atom.sequenceNumber < this.lastSequenceNumber) {
if (this.chainID == 90) this.chainID = 96;
this.chainID++;
}this.lastSequenceNumber = atom.sequenceNumber;
this.setChainID (atom, "" + String.fromCharCode (this.chainID));
}if (tokens.length > 7) atom.group3 = tokens[7];
if (tokens.length > 8) {
atom.partialCharge = this.parseFloatStr (tokens[8]);
if (atom.partialCharge == Clazz.floatToInt (atom.partialCharge)) atom.formalCharge = Clazz.floatToInt (atom.partialCharge);
}}
var atoms = this.asc.atoms;
var g3 = atoms[i0].group3;
if (g3 == null) return;
var isPDB = false;
if (!g3.equals ("UNK") && !g3.startsWith ("RES")) {
for (var i = this.asc.ac; --i >= i0; ) if (!g3.equals (atoms[this.asc.ac - 1].group3)) {
isPDB = true;
break;
}
if (isPDB) {
isPDB = false;
for (var i = this.asc.ac; --i >= i0; ) {
var pt = this.getPDBGroupLength (atoms[i].group3);
if (pt == 0 || pt > 3) break;
if (this.vwr.getJBR ().isKnownPDBGroup (g3.substring (0, pt), 2147483647)) {
isPDB = this.isPDB = true;
break;
}}
}}for (var i = this.asc.ac; --i >= i0; ) {
if (isPDB) {
g3 = atoms[i].group3;
g3 = g3.substring (0, this.getPDBGroupLength (g3));
atoms[i].isHetero = this.vwr.getJBR ().isHetero (g3);
} else {
g3 = null;
}atoms[i].group3 = g3;
}
}, "~N");
Clazz.defineMethod (c$, "getPDBGroupLength", 
 function (g3) {
var pt0 = g3.length;
var pt = pt0;
while (--pt > 0 && Character.isDigit (g3.charAt (pt))) {
}
return ++pt;
}, "~S");
Clazz.defineMethod (c$, "readBonds", 
 function (bondCount) {
for (var i = 0; i < bondCount; ++i) {
var tokens = JU.PT.getTokens (this.rd ());
var atomIndex1 = this.parseIntStr (tokens[1]);
var atomIndex2 = this.parseIntStr (tokens[2]);
var order = this.parseIntStr (tokens[3]);
if (order == -2147483648) order = (tokens[3].equals ("ar") ? 515 : tokens[3].equals ("am") ? 1 : 17);
this.asc.addBond ( new J.adapter.smarter.Bond (this.nAtoms + atomIndex1 - 1, this.nAtoms + atomIndex2 - 1, order));
}
}, "~N");
Clazz.defineMethod (c$, "readResInfo", 
 function (resCount) {
for (var i = 0; i < resCount; ++i) {
this.rd ();
}
}, "~N");
Clazz.defineMethod (c$, "readCrystalInfo", 
 function () {
this.rd ();
var tokens = this.getTokens ();
if (tokens.length < 6) return;
var name = "";
for (var i = 6; i < tokens.length; i++) name += " " + tokens[i];

if (name === "") name = " P1";
 else name += " *";
name = name.substring (1);
this.setSpaceGroupName (name);
if (this.ignoreFileUnitCell) return;
for (var i = 0; i < 6; i++) this.setUnitCellItem (i, this.parseFloatStr (tokens[i]));

var atoms = this.asc.atoms;
for (var i = 0; i < this.ac; ++i) this.setAtomCoord (atoms[this.nAtoms + i]);

});
});
