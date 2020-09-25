Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.simple.HyperChemReader", ["java.lang.Exception"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atomIndex = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.simple, "HyperChemReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.length == 0 || this.line.charAt (0) == ';') return true;
if (this.line.startsWith ("mol ")) {
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.processMol ();
return true;
}if (!this.doProcessLines) return true;
if (this.line.startsWith ("atom ")) {
this.processAtom ();
return true;
}if (this.line.startsWith ("endmol ")) {
this.applySymmetryAndSetTrajectory ();
return true;
}return true;
});
Clazz.defineMethod (c$, "processMol", 
 function () {
this.asc.newAtomSet ();
var molName = this.getMolName ();
this.asc.setAtomSetName (molName);
this.atomIndex = 0;
this.baseAtomIndex = this.asc.ac;
});
Clazz.defineMethod (c$, "getMolName", 
 function () {
this.parseTokenStr (this.line);
this.parseToken ();
return this.parseToken ();
});
Clazz.defineMethod (c$, "processAtom", 
 function () {
var fileAtomNumber = this.parseIntAt (this.line, 5);
if (fileAtomNumber - 1 != this.atomIndex) {
throw  new Exception ("bad atom number sequence ... expected:" + (this.atomIndex + 1) + " found:" + fileAtomNumber);
}var atom = this.asc.addNewAtom ();
this.parseToken ();
atom.elementSymbol = this.parseToken ();
this.parseToken ();
this.parseToken ();
atom.partialCharge = this.parseFloat ();
this.setAtomCoordXYZ (atom, this.parseFloat (), this.parseFloat (), this.parseFloat ());
var bondCount = this.parseInt ();
for (var i = 0; i < bondCount; ++i) {
var otherAtomNumber = this.parseInt ();
var bondTypeToken = this.parseToken ();
if (otherAtomNumber > this.atomIndex) continue;
var bondOrder;
switch (bondTypeToken.charAt (0)) {
case 's':
bondOrder = 1;
break;
case 'd':
bondOrder = 2;
break;
case 't':
bondOrder = 3;
break;
case 'a':
bondOrder = 515;
break;
default:
throw  new Exception ("unrecognized bond type:" + bondTypeToken + " atom #" + fileAtomNumber);
}
this.asc.addNewBondWithOrder (this.baseAtomIndex + this.atomIndex, this.baseAtomIndex + otherAtomNumber - 1, bondOrder);
}
++this.atomIndex;
});
});
