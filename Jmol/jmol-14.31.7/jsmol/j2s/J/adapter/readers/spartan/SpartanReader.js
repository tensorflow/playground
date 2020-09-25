Clazz.declarePackage ("J.adapter.readers.spartan");
Clazz.load (["J.adapter.readers.quantum.BasisFunctionReader"], "J.adapter.readers.spartan.SpartanReader", ["java.lang.Float", "java.util.Hashtable", "J.adapter.readers.spartan.SpartanArchive"], function () {
c$ = Clazz.declareType (J.adapter.readers.spartan, "SpartanReader", J.adapter.readers.quantum.BasisFunctionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
var cartesianHeader = "Cartesian Coordinates (Ang";
if (this.isSpartanArchive (cartesianHeader)) {
this.moData =  new java.util.Hashtable ();
var spartanArchive =  new J.adapter.readers.spartan.SpartanArchive (this, "", null, 0);
var ac = spartanArchive.readArchive (this.line, true, 0, true);
if (ac > 0) this.asc.setAtomSetName ("Spartan file");
} else if (this.line.indexOf (cartesianHeader) >= 0) {
this.readAtoms ();
this.discardLinesUntilContains ("Vibrational Frequencies");
if (this.line != null) this.readFrequencies ();
}this.continuing = false;
});
Clazz.defineMethod (c$, "isSpartanArchive", 
 function (strNotArchive) {
var lastLine = "";
while (this.rd () != null) {
if (this.line.equals ("GEOMETRY")) {
this.line = lastLine;
return true;
}if (this.line.indexOf (strNotArchive) >= 0) return false;
lastLine = this.line;
}
return false;
}, "~S");
Clazz.defineMethod (c$, "readAtoms", 
 function () {
this.discardLinesUntilBlank ();
while (this.rd () != null && (this.parseIntRange (this.line, 0, 3)) > 0) {
var atom = this.asc.addNewAtom ();
atom.elementSymbol = this.parseTokenRange (this.line, 4, 6);
atom.atomName = this.parseTokenRange (this.line, 7, 13);
this.setAtomCoordXYZ (atom, this.parseFloatRange (this.line, 17, 30), this.parseFloatRange (this.line, 31, 44), this.parseFloatRange (this.line, 45, 58));
}
});
Clazz.defineMethod (c$, "readFrequencies", 
 function () {
var ac = this.asc.getAtomSetAtomCount (0);
while (true) {
this.discardLinesUntilNonBlank ();
var lineBaseFreqCount = this.vibrationNumber;
this.next[0] = 16;
var lineFreqCount;
var ignore =  Clazz.newBooleanArray (3, false);
for (lineFreqCount = 0; lineFreqCount < 3; ++lineFreqCount) {
var frequency = this.parseFloat ();
if (Float.isNaN (frequency)) break;
ignore[lineFreqCount] = !this.doGetVibration (++this.vibrationNumber);
if (!ignore[lineFreqCount]) {
if (this.vibrationNumber > 1) this.asc.cloneFirstAtomSet (0);
this.asc.setAtomSetFrequency (this.vibrationNumber, null, null, "" + frequency, null);
}}
if (lineFreqCount == 0) return;
this.readLines (2);
for (var i = 0; i < ac; ++i) {
this.rd ();
for (var j = 0; j < lineFreqCount; ++j) {
var ichCoords = j * 23 + 10;
var x = this.parseFloatRange (this.line, ichCoords, ichCoords + 7);
var y = this.parseFloatRange (this.line, ichCoords + 7, ichCoords + 14);
var z = this.parseFloatRange (this.line, ichCoords + 14, ichCoords + 21);
if (!ignore[j]) this.asc.addVibrationVector (i + (lineBaseFreqCount + j) * ac, x, y, z);
}
}
}
});
});
