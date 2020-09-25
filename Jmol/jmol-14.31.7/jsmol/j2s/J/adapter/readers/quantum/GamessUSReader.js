Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.GamessReader"], "J.adapter.readers.quantum.GamessUSReader", ["java.lang.Float", "JU.Lst", "$.PT", "$.V3", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lowdenCharges = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "GamessUSReader", J.adapter.readers.quantum.GamessReader);
Clazz.defineMethod (c$, "initializeReader", 
function () {
this.lowdenCharges = this.checkAndRemoveFilterKey ("CHARGE=LOW");
Clazz.superCall (this, J.adapter.readers.quantum.GamessUSReader, "initializeReader", []);
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.startsWith (" $DATA")) return this.readInputDeck ();
if (this.line.indexOf ("***************") >= 0) JU.Logger.info (this.rd ());
var isBohr;
if (this.line.indexOf ("FINAL ENERGY IS") >= 0 || this.line.indexOf ("TOTAL ENERGY = ") >= 0 || this.line.indexOf ("FINAL RHF ENERGY IS") >= 0) this.readEnergy ();
if (this.line.indexOf ("BASIS OPTIONS") >= 0) {
this.readBasisInfo ();
return true;
}if (this.line.indexOf ("$CONTRL OPTIONS") >= 0) {
this.readControlInfo ();
return true;
}if (this.line.indexOf ("ATOMIC BASIS SET") >= 0) {
this.readGaussianBasis ("SHELL TYPE", "TOTAL");
return false;
}if ((isBohr = this.line.indexOf ("COORDINATES (BOHR)") >= 0) || this.line.indexOf ("COORDINATES OF ALL ATOMS ARE (ANGS)") >= 0) {
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.atomNames =  new JU.Lst ();
if (isBohr) this.readAtomsInBohrCoordinates ();
 else this.readAtomsInAngstromCoordinates ();
return true;
}if (!this.doProcessLines) return true;
if (this.line.indexOf ("FREQUENCIES IN CM") >= 0) {
this.readFrequencies ();
return true;
}if (this.line.indexOf ("SUMMARY OF THE EFFECTIVE FRAGMENT") >= 0) {
this.readEFPInBohrCoordinates ();
return false;
}if (this.line.indexOf ("  TOTAL MULLIKEN AND LOWDIN ATOMIC POPULATIONS") >= 0) {
this.readPartialCharges ();
return false;
}if (this.line.indexOf ("ELECTROSTATIC MOMENTS") >= 0) {
this.readDipoleMoment ();
return true;
}if (this.line.indexOf ("- ALPHA SET -") >= 0) this.alphaBeta = "alpha";
 else if (this.line.indexOf ("- BETA SET -") >= 0) this.alphaBeta = "beta";
 else if (this.line.indexOf ("  EIGENVECTORS") >= 0 || this.line.indexOf ("  INITIAL GUESS ORBITALS") >= 0 || this.line.indexOf ("  MCSCF OPTIMIZED ORBITALS") >= 0 || this.line.indexOf ("  MCSCF NATURAL ORBITALS") >= 0 || this.line.indexOf ("  MOLECULAR ORBITALS") >= 0 && this.line.indexOf ("  MOLECULAR ORBITALS LOCALIZED BY THE POPULATION METHOD") < 0) {
if (!this.filterMO ()) return true;
this.readMolecularOrbitals (1);
return false;
}if (this.line.indexOf ("EDMISTON-RUEDENBERG ENERGY LOCALIZED ORBITALS") >= 0 || this.line.indexOf ("  THE PIPEK-MEZEY POPULATION LOCALIZED ORBITALS ARE") >= 0) {
if (!this.filterMO ()) return true;
this.readMolecularOrbitals (0);
return false;
}if (this.line.indexOf ("  NATURAL ORBITALS IN ATOMIC ORBITAL BASIS") >= 0) {
if (!this.filterMO ()) return true;
this.readMolecularOrbitals (2);
return false;
}return this.checkNboLine ();
});
Clazz.defineMethod (c$, "readInputDeck", 
 function () {
this.readLines (2);
this.asc.newAtomSet ();
while (this.rd ().indexOf ("$END") < 0) {
var tokens = this.getTokens ();
if (tokens.length > 4) this.addAtomXYZSymName (tokens, 2, tokens[0], null).elementNumber = this.parseIntStr (tokens[1]);
}
return (this.continuing = false);
});
Clazz.defineMethod (c$, "readMolecularOrbitals", 
function (headerType) {
this.setCalculationType ();
Clazz.superCall (this, J.adapter.readers.quantum.GamessUSReader, "readMolecularOrbitals", [headerType]);
}, "~N");
Clazz.defineMethod (c$, "readEFPInBohrCoordinates", 
function () {
var acInFirstModel = this.asc.ac;
this.discardLinesUntilContains ("MULTIPOLE COORDINATES");
this.rd ();
this.rd ();
while (this.rd () != null && this.line.length >= 72) {
var atomName = this.line.substring (1, 2);
if (atomName.charAt (0) == 'Z') atomName = this.line.substring (2, 3);
 else if (this.parseFloatRange (this.line, 67, 73) == 0) continue;
var x = this.parseFloatRange (this.line, 8, 25);
var y = this.parseFloatRange (this.line, 25, 40);
var z = this.parseFloatRange (this.line, 40, 56);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) break;
var atom = this.asc.addNewAtom ();
atom.atomName = atomName + (++acInFirstModel);
this.setAtomCoordXYZ (atom, x * 0.5291772, y * 0.5291772, z * 0.5291772);
this.atomNames.addLast (atomName);
}
});
Clazz.overrideMethod (c$, "readAtomsInBohrCoordinates", 
function () {
this.rd ();
var atomName;
this.asc.newAtomSet ();
var n = 0;
while (this.rd () != null && (atomName = this.parseTokenRange (this.line, 1, 11)) != null) {
var x = this.parseFloatRange (this.line, 17, 37);
var y = this.parseFloatRange (this.line, 37, 57);
var z = this.parseFloatRange (this.line, 57, 77);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) break;
var atom = this.asc.addNewAtom ();
atom.elementSymbol = J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (this.parseIntRange (this.line, 11, 14));
atom.atomName = atom.elementSymbol + (++n);
this.setAtomCoordXYZ (atom, x * 0.5291772, y * 0.5291772, z * 0.5291772);
this.atomNames.addLast (atomName);
}
});
Clazz.defineMethod (c$, "readAtomsInAngstromCoordinates", 
 function () {
this.rd ();
this.rd ();
var atomName;
this.asc.newAtomSet ();
var n = 0;
while (this.rd () != null && (atomName = this.parseTokenRange (this.line, 1, 11)) != null) {
var x = this.parseFloatRange (this.line, 16, 31);
var y = this.parseFloatRange (this.line, 31, 46);
var z = this.parseFloatRange (this.line, 46, 61);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) break;
var atom = this.asc.addNewAtom ();
this.setAtomCoordXYZ (atom, x, y, z);
atom.elementSymbol = J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (this.parseIntRange (this.line, 11, 14));
atom.atomName = atom.elementSymbol + (++n);
this.atomNames.addLast (atomName);
}
if (this.line.indexOf ("COORDINATES OF FRAGMENT MULTIPOLE CENTERS (ANGS)") >= 0) {
this.rd ();
this.rd ();
this.rd ();
while (this.rd () != null && (atomName = this.parseTokenRange (this.line, 1, 2)) != null) {
if (this.parseTokenRange (this.line, 1, 2).equals ("Z")) atomName = this.parseTokenRange (this.line, 2, 3);
 else if (this.parseTokenRange (this.line, 1, 9).equals ("FRAGNAME")) continue;
 else atomName = this.parseTokenRange (this.line, 1, 2);
var x = this.parseFloatRange (this.line, 16, 31);
var y = this.parseFloatRange (this.line, 31, 46);
var z = this.parseFloatRange (this.line, 46, 61);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) break;
var atom = this.asc.addNewAtom ();
atom.atomName = atomName + (++n);
this.setAtomCoordXYZ (atom, x, y, z);
this.atomNames.addLast (atomName);
}
}});
Clazz.overrideMethod (c$, "fixShellTag", 
function (tag) {
return tag;
}, "~S");
Clazz.defineMethod (c$, "readPartialCharges", 
function () {
var tokens = null;
var searchstr = (this.lowdenCharges ? "LOW.POP." : "MULL.POP.");
while (this.rd () != null && ("".equals (this.line.trim ()) || this.line.indexOf ("ATOM") >= 0)) {
tokens = this.getTokens ();
}
var poploc = 0;
for (; ++poploc < tokens.length; ) if (searchstr.equals (tokens[poploc])) break;

if (++poploc >= tokens.length || !"CHARGE".equals (tokens[poploc++])) return;
var atoms = this.asc.atoms;
var startAtom = this.asc.getLastAtomSetAtomIndex ();
var endAtom = this.asc.ac;
for (var i = startAtom; i < endAtom && this.rd () != null; ++i) atoms[i].partialCharge = this.parseFloatStr (JU.PT.getTokens (this.prevline)[poploc]);

});
Clazz.defineMethod (c$, "readDipoleMoment", 
function () {
var tokens = null;
this.rd ();
while (this.line != null && ("".equals (this.line.trim ()) || this.line.indexOf ("DX") < 0)) {
this.rd ();
}
tokens = this.getTokens ();
if (tokens.length != 5) return;
if ("DX".equals (tokens[0]) && "DY".equals (tokens[1]) && "DZ".equals (tokens[2])) {
tokens = JU.PT.getTokens (this.rd ());
var dipole = JU.V3.new3 (this.parseFloatStr (tokens[0]), this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]));
JU.Logger.info ("Molecular dipole for model " + this.asc.atomSetCount + " = " + dipole);
this.asc.setCurrentModelInfo ("dipole", dipole);
}});
});
