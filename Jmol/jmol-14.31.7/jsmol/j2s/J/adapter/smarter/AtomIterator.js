Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["J.api.JmolAdapterAtomIterator"], "J.adapter.smarter.AtomIterator", ["java.lang.Float", "J.api.JmolAdapter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.iatom = 0;
this.atom = null;
this.ac = 0;
this.atoms = null;
this.bsAtoms = null;
Clazz.instantialize (this, arguments);
}, J.adapter.smarter, "AtomIterator", null, J.api.JmolAdapterAtomIterator);
Clazz.makeConstructor (c$, 
function (asc) {
this.ac = asc.ac;
this.atoms = asc.atoms;
this.bsAtoms = asc.bsAtoms;
this.iatom = 0;
}, "J.adapter.smarter.AtomSetCollection");
Clazz.overrideMethod (c$, "hasNext", 
function () {
if (this.iatom == this.ac) return false;
while ((this.atom = this.atoms[this.iatom++]) == null || (this.bsAtoms != null && !this.bsAtoms.get (this.atom.index))) if (this.iatom == this.ac) return false;

this.atoms[this.iatom - 1] = null;
return true;
});
Clazz.overrideMethod (c$, "getAtomSetIndex", 
function () {
return this.atom.atomSetIndex;
});
Clazz.overrideMethod (c$, "getSymmetry", 
function () {
return this.atom.bsSymmetry;
});
Clazz.overrideMethod (c$, "getAtomSite", 
function () {
return this.atom.atomSite + 1;
});
Clazz.overrideMethod (c$, "getUniqueID", 
function () {
return Integer.$valueOf (this.atom.index);
});
Clazz.overrideMethod (c$, "getElementNumber", 
function () {
return (this.atom.elementNumber > 0 ? this.atom.elementNumber : J.api.JmolAdapter.getElementNumber (this.atom.getElementSymbol ()));
});
Clazz.overrideMethod (c$, "getAtomName", 
function () {
return this.atom.atomName;
});
Clazz.overrideMethod (c$, "getFormalCharge", 
function () {
return this.atom.formalCharge;
});
Clazz.overrideMethod (c$, "getPartialCharge", 
function () {
return this.atom.partialCharge;
});
Clazz.overrideMethod (c$, "getTensors", 
function () {
return this.atom.tensors;
});
Clazz.overrideMethod (c$, "getRadius", 
function () {
return this.atom.radius;
});
Clazz.overrideMethod (c$, "getVib", 
function () {
return (this.atom.vib == null || Float.isNaN (this.atom.vib.z) ? null : this.atom.vib);
});
Clazz.overrideMethod (c$, "getSeqID", 
function () {
return (this.atom.vib == null || !Float.isNaN (this.atom.vib.y) || this.atom.vib.z != 1094713365 ? 0 : Clazz.floatToInt (this.atom.vib.x));
});
Clazz.overrideMethod (c$, "getBfactor", 
function () {
return this.atom.bfactor;
});
Clazz.overrideMethod (c$, "getOccupancy", 
function () {
return this.atom.foccupancy * 100;
});
Clazz.overrideMethod (c$, "getIsHetero", 
function () {
return this.atom.isHetero;
});
Clazz.overrideMethod (c$, "getSerial", 
function () {
return this.atom.atomSerial;
});
Clazz.overrideMethod (c$, "getChainID", 
function () {
return this.atom.chainID;
});
Clazz.overrideMethod (c$, "getAltLoc", 
function () {
return J.api.JmolAdapter.canonizeAlternateLocationID (this.atom.altLoc);
});
Clazz.overrideMethod (c$, "getGroup3", 
function () {
return this.atom.group3;
});
Clazz.overrideMethod (c$, "getSequenceNumber", 
function () {
return this.atom.sequenceNumber;
});
Clazz.overrideMethod (c$, "getInsertionCode", 
function () {
return J.api.JmolAdapter.canonizeInsertionCode (this.atom.insertionCode);
});
Clazz.overrideMethod (c$, "getXYZ", 
function () {
return this.atom;
});
});
