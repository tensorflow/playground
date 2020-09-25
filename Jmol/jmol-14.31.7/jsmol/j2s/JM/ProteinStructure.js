Clazz.declarePackage ("JM");
Clazz.load (["JM.Structure"], "JM.ProteinStructure", ["java.util.Hashtable", "JU.P3", "$.V3", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.subtype = null;
this.structureID = null;
this.strucNo = 0;
this.serialID = 0;
this.strandCount = 1;
this.nRes = 0;
this.apolymer = null;
this.monomerIndexFirst = 0;
this.monomerIndexLast = 0;
this.axisA = null;
this.axisB = null;
this.axisUnitVector = null;
this.vectorProjection = null;
this.segments = null;
this.resMap = null;
Clazz.instantialize (this, arguments);
}, JM, "ProteinStructure", null, JM.Structure);
Clazz.defineMethod (c$, "setupPS", 
function (apolymer, type, monomerIndex, monomerCount) {
this.strucNo = ++JM.ProteinStructure.globalStrucNo;
this.apolymer = apolymer;
this.type = type;
this.vectorProjection =  new JU.V3 ();
this.monomerIndexFirst = monomerIndex;
this.addMonomer (monomerIndex + monomerCount - 1);
if (JU.Logger.debugging) JU.Logger.info ("Creating ProteinStructure " + this.strucNo + " " + type.getBioStructureTypeName (false) + " from " + apolymer.monomers[this.monomerIndexFirst] + " through " + apolymer.monomers[this.monomerIndexLast] + " in polymer " + apolymer);
}, "JM.AlphaPolymer,J.c.STR,~N,~N");
Clazz.defineMethod (c$, "addMonomer", 
function (index) {
this.resMap = null;
this.resetAxes ();
this.monomerIndexFirst = Math.min (this.monomerIndexFirst, index);
this.monomerIndexLast = Math.max (this.monomerIndexLast, index);
this.nRes = this.monomerIndexLast - this.monomerIndexFirst + 1;
}, "~N");
Clazz.defineMethod (c$, "removeMonomer", 
function (index) {
this.resMap = null;
this.resetAxes ();
if (index > this.monomerIndexLast || index < this.monomerIndexFirst) return;
if (index == this.monomerIndexFirst) {
this.monomerIndexFirst++;
this.nRes--;
} else if (index == this.monomerIndexLast) {
this.monomerIndexLast--;
this.nRes--;
} else {
var n = this.monomerIndexLast - index;
this.monomerIndexLast = index - 1;
this.nRes = index - this.monomerIndexFirst;
var monomers = this.apolymer.monomers;
var type = monomers[++index].getProteinStructureType ();
var mLast = -1;
for (var i = 0, pt = index; i < n; i++, pt++) {
(monomers[pt]).setStructure (null);
mLast = monomers[pt].setProteinStructureType (type, mLast);
}
}}, "~N");
Clazz.defineMethod (c$, "calcAxis", 
function () {
});
Clazz.defineMethod (c$, "isWithin", 
function (monomerIndex) {
return (monomerIndex > this.monomerIndexFirst && monomerIndex < this.monomerIndexLast);
}, "~N");
Clazz.defineMethod (c$, "getIndex", 
function (monomer) {
if (this.resMap == null) {
this.resMap =  new java.util.Hashtable ();
for (var i = this.nRes; --i >= 0; ) this.resMap.put (this.apolymer.monomers[this.monomerIndexFirst + i], Integer.$valueOf (i));

}var ii = this.resMap.get (monomer);
return (ii == null ? -1 : ii.intValue ());
}, "JM.Monomer");
Clazz.defineMethod (c$, "getSegments", 
function () {
if (this.segments == null) this.calcSegments ();
return this.segments;
});
Clazz.defineMethod (c$, "getStructureMidPoint", 
function (index) {
if (this.segments == null) this.calcSegments ();
return this.segments[index];
}, "~N");
Clazz.defineMethod (c$, "calcSegments", 
 function () {
if (this.segments != null) return;
this.calcAxis ();
this.segments =  new Array (this.nRes + 1);
this.segments[this.nRes] = this.axisB;
this.segments[0] = this.axisA;
var axis = JU.V3.newV (this.axisUnitVector);
axis.scale (this.axisB.distance (this.axisA) / this.nRes);
for (var i = 1; i < this.nRes; i++) {
var point = this.segments[i] =  new JU.P3 ();
point.add2 (this.segments[i - 1], axis);
}
});
Clazz.defineMethod (c$, "getAxisStartPoint", 
function () {
this.calcAxis ();
return this.axisA;
});
Clazz.defineMethod (c$, "getAxisEndPoint", 
function () {
this.calcAxis ();
return this.axisB;
});
Clazz.defineMethod (c$, "resetAxes", 
function () {
this.axisA = null;
this.segments = null;
});
Clazz.overrideMethod (c$, "setAtomBits", 
function (bs) {
var ms = this.apolymer.monomers;
for (var i = this.monomerIndexFirst; i <= this.monomerIndexLast; i++) ms[i].setAtomBits (bs);

}, "JU.BS");
Clazz.overrideMethod (c$, "setAtomBitsAndClear", 
function (bs, bsOut) {
var ms = this.apolymer.monomers;
for (var i = this.monomerIndexFirst; i <= this.monomerIndexLast; i++) ms[i].setAtomBitsAndClear (bs, bsOut);

}, "JU.BS,JU.BS");
Clazz.defineMethod (c$, "findMonomer", 
function (bsAtoms, isFirst) {
var ms = this.apolymer.monomers;
if (isFirst) {
for (var i = this.monomerIndexFirst; i <= this.monomerIndexLast; i++) if (bsAtoms == null || bsAtoms.get (ms[i].leadAtomIndex)) return ms[i];

} else {
for (var i = this.monomerIndexLast; i >= this.monomerIndexFirst; --i) if (bsAtoms == null || bsAtoms.get (ms[i].leadAtomIndex)) return ms[i];

}return null;
}, "JU.BS,~B");
Clazz.defineStatics (c$,
"globalStrucNo", 1000);
});
