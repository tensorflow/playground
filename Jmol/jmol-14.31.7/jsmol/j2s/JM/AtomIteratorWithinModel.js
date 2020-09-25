Clazz.declarePackage ("JM");
Clazz.load (["J.api.AtomIndexIterator"], "JM.AtomIteratorWithinModel", ["J.atomdata.RadiusData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cubeIterator = null;
this.bspf = null;
this.threadSafe = false;
this.hemisphereOnly = false;
this.isZeroBased = false;
this.modelIndex = 2147483647;
this.atomIndex = -1;
this.zeroBase = 0;
this.distanceSquared = 0;
this.bsSelected = null;
this.isGreaterOnly = false;
this.checkGreater = false;
this.radiusData = null;
this.vdw1 = 0;
this.isVdw = false;
this.atoms = null;
this.vwr = null;
this.iNext = 0;
Clazz.instantialize (this, arguments);
}, JM, "AtomIteratorWithinModel", null, J.api.AtomIndexIterator);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "initialize", 
function (bspf, bsSelected, isGreaterOnly, isZeroBased, hemisphereOnly, threadSafe) {
this.bspf = bspf;
this.bsSelected = bsSelected;
this.isGreaterOnly = isGreaterOnly;
this.isZeroBased = isZeroBased;
this.hemisphereOnly = hemisphereOnly;
this.threadSafe = threadSafe;
this.cubeIterator = null;
}, "J.bspt.Bspf,JU.BS,~B,~B,~B,~B");
Clazz.overrideMethod (c$, "setModel", 
function (modelSet, modelIndex, firstModelAtom, atomIndex, center, distance, rd) {
if (this.threadSafe) modelIndex = -1 - modelIndex;
if (modelIndex != this.modelIndex || this.cubeIterator == null) {
this.cubeIterator = this.bspf.getCubeIterator (modelIndex);
this.modelIndex = modelIndex;
}this.zeroBase = (this.isZeroBased ? firstModelAtom : 0);
if (distance == -2147483648) return;
this.atomIndex = (distance < 0 ? -1 : atomIndex);
this.isVdw = (rd != null);
if (this.isVdw) {
this.radiusData = rd;
this.atoms = modelSet.at;
this.vwr = modelSet.vwr;
distance = (rd.factorType === J.atomdata.RadiusData.EnumType.OFFSET ? 5 + rd.value : 5 * rd.value);
this.vdw1 = this.atoms[atomIndex].getVanderwaalsRadiusFloat (this.vwr, rd.vdwType);
}this.checkGreater = (this.isGreaterOnly && atomIndex != 2147483647);
this.setCenter (center, distance);
}, "JM.ModelSet,~N,~N,~N,JU.T3,~N,J.atomdata.RadiusData");
Clazz.overrideMethod (c$, "setCenter", 
function (center, distance) {
this.setCenter2 (center, distance);
}, "JU.T3,~N");
Clazz.defineMethod (c$, "setCenter2", 
function (center, distance) {
if (this.cubeIterator == null) return;
this.cubeIterator.initialize (center, distance, this.hemisphereOnly);
this.distanceSquared = distance * distance;
}, "JU.T3,~N");
Clazz.overrideMethod (c$, "hasNext", 
function () {
return this.hasNext2 ();
});
Clazz.defineMethod (c$, "hasNext2", 
function () {
if (this.atomIndex >= 0) while (this.cubeIterator.hasMoreElements ()) {
var a = this.cubeIterator.nextElement ();
if ((this.iNext = a.i) != this.atomIndex && (!this.checkGreater || this.iNext > this.atomIndex) && (this.bsSelected == null || this.bsSelected.get (this.iNext))) {
return true;
}}
 else if (this.cubeIterator.hasMoreElements ()) {
var a = this.cubeIterator.nextElement ();
this.iNext = a.i;
return true;
}this.iNext = -1;
return false;
});
Clazz.overrideMethod (c$, "next", 
function () {
return this.iNext - this.zeroBase;
});
Clazz.overrideMethod (c$, "foundDistance2", 
function () {
return (this.cubeIterator == null ? -1 : this.cubeIterator.foundDistance2 ());
});
Clazz.overrideMethod (c$, "addAtoms", 
function (bsResult) {
var iAtom;
while (this.hasNext ()) if ((iAtom = this.next ()) >= 0) {
var d;
if (this.isVdw) {
d = this.atoms[iAtom].getVanderwaalsRadiusFloat (this.vwr, this.radiusData.vdwType) + this.vdw1;
switch (this.radiusData.factorType) {
case J.atomdata.RadiusData.EnumType.OFFSET:
d += this.radiusData.value * 2;
break;
case J.atomdata.RadiusData.EnumType.FACTOR:
d *= this.radiusData.value;
break;
}
d *= d;
} else {
d = this.distanceSquared;
}if (this.foundDistance2 () <= d) bsResult.set (iAtom);
}
}, "JU.BS");
Clazz.overrideMethod (c$, "release", 
function () {
if (this.cubeIterator != null) {
this.cubeIterator.release ();
this.cubeIterator = null;
}});
Clazz.overrideMethod (c$, "getPosition", 
function () {
return null;
});
});
