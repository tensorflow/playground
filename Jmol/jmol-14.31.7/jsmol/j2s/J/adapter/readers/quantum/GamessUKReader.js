Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.GamessReader"], "J.adapter.readers.quantum.GamessUKReader", ["java.lang.Float", "JU.Lst", "$.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.symmetries = null;
this.occupancies = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "GamessUKReader", J.adapter.readers.quantum.GamessReader);
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.indexOf ("BASIS OPTIONS") >= 0) {
this.readBasisInfo ();
return true;
}if (this.line.indexOf ("$CONTRL OPTIONS") >= 0) {
this.readControlInfo ();
return true;
}if (this.line.indexOf ("contracted primitive functions") >= 0) {
this.readGaussianBasis ("======================================================", "======");
return false;
}if (this.line.indexOf ("molecular geometry") >= 0) {
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.atomNames =  new JU.Lst ();
this.readAtomsInBohrCoordinates ();
return true;
}if (!this.doProcessLines) return true;
if (this.line.indexOf ("FREQUENCY_INFO_WOULD_BE_HERE") >= 0) {
return true;
}if (this.line.indexOf ("SYMMETRY ASSIGNMENT") >= 0) {
this.readOrbitalSymmetryAndOccupancy ();
return false;
}if (this.line.indexOf ("- ALPHA SET -") >= 0) this.alphaBeta = "alpha";
 else if (this.line.indexOf ("- BETA SET -") >= 0) this.alphaBeta = "beta";
 else if (this.line.indexOf ("eigenvectors") >= 0) {
this.readMolecularOrbitals (3);
this.setOrbitalSymmetryAndOccupancy ();
return false;
}return this.checkNboLine ();
});
Clazz.overrideMethod (c$, "readAtomsInBohrCoordinates", 
function () {
this.discardLinesUntilContains ("*****");
this.discardLinesUntilContains ("atom");
this.discardLinesUntilContains ("*****");
this.asc.newAtomSet ();
while (this.rd () != null && this.line.indexOf ("*****") < 0) {
if (this.line.charAt (14) == ' ') continue;
var tokens = this.getTokens ();
var atomicNumber = Clazz.floatToInt (this.parseFloatStr (tokens[2]));
var atom = this.setAtomCoordScaled (null, tokens, 3, 0.5291772);
atom.elementSymbol = J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (atomicNumber);
this.atomNames.addLast (atom.atomName = tokens[1]);
}
});
Clazz.overrideMethod (c$, "fixShellTag", 
function (tag) {
return tag.substring (1).toUpperCase ();
}, "~S");
Clazz.defineMethod (c$, "readOrbitalSymmetryAndOccupancy", 
 function () {
this.readLines (4);
this.symmetries =  new JU.Lst ();
this.occupancies =  new JU.Lst ();
while (this.rd () != null && this.line.indexOf ("====") < 0) {
var tokens = JU.PT.getTokens (this.line.substring (20));
this.symmetries.addLast (tokens[0] + " " + tokens[1]);
this.occupancies.addLast (Float.$valueOf (this.parseFloatStr (tokens[5])));
}
});
Clazz.defineMethod (c$, "setOrbitalSymmetryAndOccupancy", 
 function () {
if (this.symmetries.size () < this.orbitals.size ()) return;
for (var i = this.orbitals.size (); --i >= 0; ) {
var mo = this.orbitals.get (i);
mo.put ("symmetry", this.symmetries.get (i));
mo.put ("occupancy", this.occupancies.get (i));
}
});
});
