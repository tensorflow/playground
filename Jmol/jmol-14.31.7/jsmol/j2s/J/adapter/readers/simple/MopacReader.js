Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.simple.MopacReader", ["java.lang.Exception", "$.Float", "JU.BS", "$.PT", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.chargesFound = false;
this.haveHeader = false;
this.mopacVersion = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.simple, "MopacReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
while (this.mopacVersion == 0) {
this.discardLinesUntilContains ("MOPAC");
if (this.line.indexOf ("2009") >= 0) this.mopacVersion = 2009;
 else if (this.line.indexOf ("6.") >= 0) this.mopacVersion = 6;
 else if (this.line.indexOf ("7.") >= 0) this.mopacVersion = 7;
 else if (this.line.indexOf ("93") >= 0) this.mopacVersion = 93;
 else if (this.line.indexOf ("2002") >= 0) this.mopacVersion = 2002;
 else if (this.line.indexOf ("MOPAC2") >= 0) this.mopacVersion = JU.PT.parseInt (this.line.substring (this.line.indexOf ("MOPAC2") + 5));
}
JU.Logger.info ("MOPAC version " + this.mopacVersion);
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (!this.haveHeader) {
if (this.line.trim ().equals ("CARTESIAN COORDINATES")) {
this.processCoordinates ();
this.asc.setAtomSetName ("Input Structure");
return true;
}this.haveHeader = this.line.startsWith (" ---");
return true;
}if (this.line.indexOf ("TOTAL ENERGY") >= 0) {
this.processTotalEnergy ();
return true;
}if (this.line.indexOf ("ATOMIC CHARGES") >= 0) {
this.processAtomicCharges ();
return true;
}if (this.line.trim ().equals ("CARTESIAN COORDINATES")) {
this.processCoordinates ();
return true;
}if (this.line.indexOf ("ORIENTATION OF MOLECULE IN FORCE") >= 0) {
this.processCoordinates ();
this.asc.setAtomSetName ("Orientation in Force Field");
return true;
}if (this.line.indexOf ("NORMAL COORDINATE ANALYSIS") >= 0) {
this.readFrequencies ();
return true;
}return true;
});
Clazz.defineMethod (c$, "processTotalEnergy", 
function () {
});
Clazz.defineMethod (c$, "processAtomicCharges", 
function () {
this.readLines (2);
this.asc.newAtomSet ();
this.baseAtomIndex = this.asc.ac;
var expectedAtomNumber = 0;
while (this.rd () != null) {
var atomNumber = this.parseIntStr (this.line);
if (atomNumber == -2147483648) break;
++expectedAtomNumber;
if (atomNumber != expectedAtomNumber) throw  new Exception ("unexpected atom number in atomic charges");
var atom = this.asc.addNewAtom ();
atom.elementSymbol = this.parseToken ();
atom.partialCharge = this.parseFloat ();
}
this.chargesFound = true;
});
Clazz.defineMethod (c$, "processCoordinates", 
function () {
if (!this.chargesFound) {
this.asc.newAtomSet ();
this.baseAtomIndex = this.asc.ac;
} else {
this.chargesFound = false;
}var atoms = this.asc.atoms;
var atomNumber;
while (this.rd ().trim ().length == 0 || this.line.indexOf ("ATOM") >= 0) {
}
while (this.line != null) {
var tokens = this.getTokens ();
if (tokens.length == 0 || (atomNumber = this.parseIntStr (tokens[0])) == -2147483648) break;
var atom = atoms[this.baseAtomIndex + atomNumber - 1];
if (atom == null) atom = this.asc.addNewAtom ();
atom.atomSerial = atomNumber;
this.setAtomCoordTokens (atom, tokens, 2);
var elementSymbol = tokens[1];
var atno = this.parseIntStr (elementSymbol);
if (atno != -2147483648) elementSymbol = J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (atno);
atom.elementSymbol = elementSymbol;
this.rd ();
}
});
Clazz.defineMethod (c$, "readFrequencies", 
 function () {
var bsOK =  new JU.BS ();
var n0 = this.asc.iSet + 1;
var tokens;
var done = false;
while (!done && this.rd () != null && this.line.indexOf ("DESCRIPTION") < 0 && this.line.indexOf ("MASS-WEIGHTED") < 0) if (this.line.toUpperCase ().indexOf ("ROOT") >= 0) {
this.discardLinesUntilNonBlank ();
tokens = this.getTokens ();
if (Float.isNaN (JU.PT.parseFloatStrict (tokens[tokens.length - 1]))) {
this.discardLinesUntilNonBlank ();
tokens = this.getTokens ();
}var frequencyCount = tokens.length;
this.rd ();
var iAtom0 = this.asc.ac;
var ac = this.asc.getLastAtomSetAtomCount ();
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
var freq1 = JU.PT.parseFloatStrict (tokens[0]);
var ignoreNegative = (freq1 < 0);
for (var i = 0; i < frequencyCount; ++i) {
ignore[i] = done || (done = (!ignoreNegative && JU.PT.parseFloatStrict (tokens[i]) < 1)) || !this.doGetVibration (++this.vibrationNumber);
if (ignore[i]) continue;
bsOK.set (this.vibrationNumber - 1);
this.asc.cloneLastAtomSet ();
}
this.fillFrequencyData (iAtom0, ac, ac, ignore, false, 0, 0, null, 2, null);
}
var info =  new Array (this.vibrationNumber);
if (this.line.indexOf ("DESCRIPTION") < 0) this.discardLinesUntilContains ("DESCRIPTION");
while (this.discardLinesUntilContains ("VIBRATION") != null) {
tokens = this.getTokens ();
var freqNo = this.parseIntStr (tokens[1]);
tokens[0] = JU.PT.getTokens (this.rd ())[1];
if (tokens[2].equals ("ATOM")) tokens[2] = null;
info[freqNo - 1] = tokens;
if (freqNo == this.vibrationNumber) break;
}
for (var i = this.vibrationNumber - 1; --i >= 0; ) if (info[i] == null) info[i] = info[i + 1];

for (var i = 0, n = n0; i < this.vibrationNumber; i++) {
if (!bsOK.get (i)) continue;
this.asc.iSet = n++;
this.asc.setAtomSetFrequency (this.vibrationNumber, null, info[i][2], info[i][0], null);
}
});
});
