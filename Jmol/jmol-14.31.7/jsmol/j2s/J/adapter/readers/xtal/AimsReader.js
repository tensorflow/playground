Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.AimsReader", ["JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.globalDoApplySymmetry = false;
this.isFractional = false;
this.nLatticeVectors = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "AimsReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.globalDoApplySymmetry = this.doApplySymmetry;
this.doApplySymmetry = true;
this.isFractional = true;
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
var tokens = this.getTokens ();
if (tokens.length == 0) return true;
if (tokens[0].equals ("lattice_vector")) {
this.readLatticeVector (tokens);
return true;
}if (tokens[0].equals ("atom")) {
this.readAtom (tokens, false);
return true;
}if (tokens[0].equals ("atom_frac")) {
this.readAtom (tokens, true);
return true;
}if (tokens[0].equals ("multipole")) {
this.readMultipole (tokens);
return true;
}return true;
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.doApplySymmetry = this.globalDoApplySymmetry;
if (this.nLatticeVectors == 1 || this.nLatticeVectors == 2) {
JU.Logger.warn ("ignoring translation symmetry for more or less than 3 dimensions(which is currently neither supported by FHI-aims");
}this.finalizeReaderASCR ();
});
Clazz.defineMethod (c$, "readLatticeVector", 
 function (tokens) {
if (tokens.length < 4) {
JU.Logger.warn ("cannot read line with FHI-aims lattice vector: " + this.line);
} else if (this.nLatticeVectors == 3) {
JU.Logger.warn ("more than 3 FHI-aims lattice vectors found with line: " + this.line);
} else {
this.addExplicitLatticeVector (this.nLatticeVectors++,  Clazz.newFloatArray (-1, [this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3])]), 0);
this.setFractionalCoordinates (this.nLatticeVectors == 3);
}}, "~A");
Clazz.defineMethod (c$, "readAtom", 
 function (tokens, isFractional) {
if (tokens.length < 5) {
JU.Logger.warn ("cannot read line with FHI-aims line: " + this.line);
return;
}if (this.isFractional != isFractional) this.setFractionalCoordinates (this.isFractional = isFractional);
this.addAtomXYZSymName (tokens, 1, tokens[4], null);
}, "~A,~B");
Clazz.defineMethod (c$, "readMultipole", 
 function (tokens) {
if (tokens.length < 6) {
JU.Logger.warn ("cannot read line with FHI-aims atom data: " + this.line);
return;
}var order = this.parseIntStr (tokens[4]);
if (order > 0) {
JU.Logger.warn ("multipole line ignored since only monopoles are currently supported: " + this.line);
return;
}if (this.isFractional) this.setFractionalCoordinates (this.isFractional = false);
this.addAtomXYZSymName (tokens, 1, null, null).partialCharge = this.parseFloatStr (tokens[5]);
}, "~A");
});
