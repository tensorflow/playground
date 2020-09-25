Clazz.declarePackage ("JM");
Clazz.load (["JU.Edge", "JV.JC"], "JM.Bond", ["JU.C"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atom1 = null;
this.atom2 = null;
this.mad = 0;
this.colix = 0;
this.shapeVisibilityFlags = 0;
Clazz.instantialize (this, arguments);
}, JM, "Bond", JU.Edge);
Clazz.makeConstructor (c$, 
function (atom1, atom2, order, mad, colix) {
this.atom1 = atom1;
this.atom2 = atom2;
this.colix = colix;
this.setOrder (order);
this.setMad (mad);
}, "JM.Atom,JM.Atom,~N,~N,~N");
Clazz.defineMethod (c$, "setMad", 
function (mad) {
this.mad = mad;
this.setShapeVisibility (mad != 0);
}, "~N");
Clazz.defineMethod (c$, "setShapeVisibility", 
function (isVisible) {
var wasVisible = ((this.shapeVisibilityFlags & JM.Bond.myVisibilityFlag) != 0);
if (wasVisible == isVisible) return;
this.atom1.addDisplayedBond (JM.Bond.myVisibilityFlag, isVisible);
this.atom2.addDisplayedBond (JM.Bond.myVisibilityFlag, isVisible);
if (isVisible) this.shapeVisibilityFlags |= JM.Bond.myVisibilityFlag;
 else this.shapeVisibilityFlags &= ~JM.Bond.myVisibilityFlag;
}, "~B");
Clazz.defineMethod (c$, "getIdentity", 
function () {
return (this.index + 1) + " " + JU.Edge.getBondOrderNumberFromOrder (this.order) + " " + this.atom1.getInfo () + " -- " + this.atom2.getInfo () + " " + this.atom1.distance (this.atom2);
});
Clazz.overrideMethod (c$, "isCovalent", 
function () {
return (this.order & 1023) != 0;
});
Clazz.overrideMethod (c$, "isHydrogen", 
function () {
return JU.Edge.isOrderH (this.order);
});
Clazz.defineMethod (c$, "isStereo", 
function () {
return (this.order & 1024) != 0;
});
Clazz.defineMethod (c$, "isPartial", 
function () {
return (this.order & 224) != 0;
});
Clazz.defineMethod (c$, "isAromatic", 
function () {
return (this.order & 512) != 0;
});
Clazz.defineMethod (c$, "getEnergy", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getValence", 
function () {
return (!this.isCovalent () ? 0 : this.isPartial () || this.is (515) ? 1 : this.order & 7);
});
Clazz.defineMethod (c$, "deleteAtomReferences", 
function () {
if (this.atom1 != null) this.atom1.deleteBond (this);
if (this.atom2 != null) this.atom2.deleteBond (this);
this.atom1 = this.atom2 = null;
});
Clazz.defineMethod (c$, "setTranslucent", 
function (isTranslucent, translucentLevel) {
this.colix = JU.C.getColixTranslucent3 (this.colix, isTranslucent, translucentLevel);
}, "~B,~N");
Clazz.defineMethod (c$, "setOrder", 
function (order) {
if (this.atom1.getElementNumber () == 16 && this.atom2.getElementNumber () == 16) order |= 256;
if (order == 512) order = 515;
this.order = order | (this.order & 131072);
}, "~N");
Clazz.overrideMethod (c$, "getAtomIndex1", 
function () {
return this.atom1.i;
});
Clazz.overrideMethod (c$, "getAtomIndex2", 
function () {
return this.atom2.i;
});
Clazz.overrideMethod (c$, "getCovalentOrder", 
function () {
return JU.Edge.getCovalentBondOrder (this.order);
});
Clazz.defineMethod (c$, "getOtherAtom", 
function (thisAtom) {
return (this.atom1 === thisAtom ? this.atom2 : this.atom2 === thisAtom ? this.atom1 : null);
}, "JM.Atom");
Clazz.defineMethod (c$, "is", 
function (bondType) {
return (this.order & -131073) == bondType;
}, "~N");
Clazz.overrideMethod (c$, "getOtherNode", 
function (thisAtom) {
return (this.atom1 === thisAtom ? this.atom2 : this.atom2 === thisAtom || thisAtom == null ? this.atom1 : null);
}, "JU.SimpleNode");
Clazz.defineMethod (c$, "setAtropisomerOptions", 
function (bsA, bsB) {
var isBA = bsB.get (this.atom1.i);
var bs1 = (isBA ? bsB : bsA);
var bs2 = (isBA ? bsA : bsB);
var i1;
var i2 = 2147483647;
var bonds = this.atom1.bonds;
for (i1 = 0; i1 < bonds.length; i1++) {
var a = bonds[i1].getOtherAtom (this.atom1);
if (bs1.get (a.i) && a !== this.atom2) break;
}
if (i1 < bonds.length) {
bonds = this.atom2.bonds;
for (i2 = 0; i2 < bonds.length; i2++) {
var a = bonds[i2].getOtherAtom (this.atom2);
if (bs2.get (a.i) && a !== this.atom1) break;
}
}this.order = (i1 > 2 || i2 >= bonds.length || i2 > 2 ? 1 : JU.Edge.getAtropismOrder (i1 + 1, i2 + 1));
}, "JU.BS,JU.BS");
Clazz.overrideMethod (c$, "getCIPChirality", 
function (doCalculate) {
return "";
}, "~B");
Clazz.overrideMethod (c$, "setCIPChirality", 
function (c) {
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.atom1 + " - " + this.atom2;
});
c$.myVisibilityFlag = c$.prototype.myVisibilityFlag = JV.JC.getShapeVisibilityFlag (1);
});
