Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.simple.AmpacReader", ["JU.P3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ac = 0;
this.freqAtom0 = -1;
this.partialCharges = null;
this.atomPositions = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.simple, "AmpacReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.indexOf ("CARTESIAN COORDINATES") >= 0) {
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.readCoordinates ();
return true;
}if (!this.doProcessLines) return true;
if (this.line.indexOf ("NET ATOMIC CHARGES") >= 0) {
this.readPartialCharges ();
return true;
}if (this.line.indexOf ("VIBRATIONAL FREQUENCIES") >= 0) {
this.readFrequencies ();
return true;
}return true;
});
Clazz.defineMethod (c$, "readCoordinates", 
 function () {
var haveFreq = (this.freqAtom0 >= 0);
if (haveFreq) {
this.atomPositions =  new Array (this.ac);
} else {
this.asc.newAtomSet ();
}this.rd ();
this.ac = 0;
while (this.rd () != null) {
var tokens = this.getTokens ();
if (tokens.length < 5) break;
if (haveFreq) {
this.atomPositions[this.ac] = JU.P3.new3 (this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]));
} else {
this.addAtomXYZSymName (tokens, 2, tokens[1], null);
}this.ac++;
}
if (haveFreq) this.setPositions ();
});
Clazz.defineMethod (c$, "setPositions", 
 function () {
var maxAtom = this.asc.ac;
var atoms = this.asc.atoms;
for (var i = this.freqAtom0; i < maxAtom; i++) {
atoms[i].setT (this.atomPositions[i % this.ac]);
atoms[i].partialCharge = this.partialCharges[i % this.ac];
}
});
Clazz.defineMethod (c$, "readPartialCharges", 
 function () {
this.rd ();
this.partialCharges =  Clazz.newFloatArray (this.ac, 0);
var tokens;
for (var i = 0; i < this.ac; i++) {
if (this.rd () == null || (tokens = this.getTokens ()).length < 4) break;
this.partialCharges[i] = this.parseFloatStr (tokens[2]);
}
});
Clazz.defineMethod (c$, "readFrequencies", 
 function () {
while (this.rd () != null && this.line.indexOf ("FREQ  :") < 0) {
}
while (this.line != null && this.line.indexOf ("FREQ  :") >= 0) {
var frequencies = this.getTokens ();
while (this.rd () != null && this.line.indexOf ("IR I") < 0) {
}
var iAtom0 = this.asc.ac;
if (this.vibrationNumber == 0) this.freqAtom0 = iAtom0;
var frequencyCount = frequencies.length - 2;
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
for (var i = 0; i < frequencyCount; ++i) {
ignore[i] = !this.doGetVibration (++this.vibrationNumber);
if (ignore[i]) continue;
this.asc.cloneLastAtomSet ();
this.asc.setAtomSetName (frequencies[i + 2] + " cm^-1");
this.asc.setAtomSetModelProperty ("Frequency", frequencies[i + 2] + " cm^-1");
this.asc.setAtomSetModelProperty (".PATH", "Frequencies");
}
this.fillFrequencyData (iAtom0, this.ac, this.ac, ignore, false, 8, 9, null, 0, null);
this.rd ();
this.rd ();
}
});
});
