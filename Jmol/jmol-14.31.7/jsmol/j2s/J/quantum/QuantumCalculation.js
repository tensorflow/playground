Clazz.declarePackage ("J.quantum");
Clazz.load (null, "J.quantum.QuantumCalculation", ["JU.P3", "J.quantum.QMAtom", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.doDebug = false;
this.bsExcluded = null;
this.integration = NaN;
this.voxelData = null;
this.voxelDataTemp = null;
this.countsXYZ = null;
this.points = null;
this.xMin = 0;
this.xMax = 0;
this.yMin = 0;
this.yMax = 0;
this.zMin = 0;
this.zMax = 0;
this.qmAtoms = null;
this.atomIndex = 0;
this.thisAtom = null;
this.firstAtomOffset = 0;
this.xBohr = null;
this.yBohr = null;
this.zBohr = null;
this.originBohr = null;
this.stepBohr = null;
this.nX = 0;
this.nY = 0;
this.nZ = 0;
this.X = null;
this.Y = null;
this.Z = null;
this.X2 = null;
this.Y2 = null;
this.Z2 = null;
this.rangeBohrOrAngstroms = 10;
this.unitFactor = 1.8897161;
this.volume = 1;
Clazz.instantialize (this, arguments);
}, J.quantum, "QuantumCalculation");
Clazz.prepareFields (c$, function () {
this.originBohr =  Clazz.newFloatArray (3, 0);
this.stepBohr =  Clazz.newFloatArray (3, 0);
});
Clazz.defineMethod (c$, "getIntegration", 
function () {
return this.integration;
});
Clazz.defineMethod (c$, "initialize", 
function (nX, nY, nZ, points) {
this.initialize0 (nX, nY, nZ, points);
}, "~N,~N,~N,~A");
Clazz.defineMethod (c$, "initialize0", 
function (nX, nY, nZ, points) {
if (points != null) {
this.points = points;
nX = nY = nZ = points.length;
}this.nX = this.xMax = nX;
this.nY = this.yMax = nY;
this.nZ = this.zMax = nZ;
if (this.xBohr != null && this.xBohr.length >= nX) return;
this.xBohr =  Clazz.newFloatArray (nX, 0);
this.yBohr =  Clazz.newFloatArray (nY, 0);
this.zBohr =  Clazz.newFloatArray (nZ, 0);
this.X =  Clazz.newFloatArray (nX, 0);
this.Y =  Clazz.newFloatArray (nY, 0);
this.Z =  Clazz.newFloatArray (nZ, 0);
this.X2 =  Clazz.newFloatArray (nX, 0);
this.Y2 =  Clazz.newFloatArray (nY, 0);
this.Z2 =  Clazz.newFloatArray (nZ, 0);
}, "~N,~N,~N,~A");
Clazz.defineMethod (c$, "setupCoordinates", 
function (originXYZ, stepsXYZ, bsSelected, xyz, atoms, points, renumber) {
if (atoms == null) atoms = xyz;
if (points == null) {
this.volume = 1;
for (var i = 3; --i >= 0; ) {
this.originBohr[i] = originXYZ[i] * this.unitFactor;
this.stepBohr[i] = stepsXYZ[i] * this.unitFactor;
this.volume *= this.stepBohr[i];
}
JU.Logger.info ("QuantumCalculation:\n origin = " + JU.Escape.eAF (originXYZ) + "\n steps = " + JU.Escape.eAF (stepsXYZ) + "\n origin(Bohr)= " + JU.Escape.eAF (this.originBohr) + "\n steps(Bohr)= " + JU.Escape.eAF (this.stepBohr) + "\n counts= " + this.nX + " " + this.nY + " " + this.nZ);
}this.qmAtoms =  new Array (renumber ? bsSelected.cardinality () : xyz.length);
var isAll = (bsSelected == null);
var i0 = (isAll ? this.qmAtoms.length - 1 : bsSelected.nextSetBit (0));
for (var i = i0, j = 0; i >= 0; i = (isAll ? i - 1 : bsSelected.nextSetBit (i + 1))) this.qmAtoms[renumber ? j++ : i] =  new J.quantum.QMAtom (i, xyz[i], atoms[i], this.X, this.Y, this.Z, this.X2, this.Y2, this.Z2, this.unitFactor);

}, "~A,~A,JU.BS,~A,~A,~A,~B");
Clazz.defineMethod (c$, "processPt", 
function (pt) {
this.doDebug = false;
if (this.points == null || this.nX != 1) this.initializeOnePoint ();
this.points[0].setT (pt);
this.voxelData[0][0][0] = this.voxelDataTemp[0][0][0] = 0;
this.setXYZBohr (this.points);
this.processPoints ();
return this.voxelData[0][0][0];
}, "JU.T3");
Clazz.defineMethod (c$, "processPoints", 
function () {
this.process ();
});
Clazz.defineMethod (c$, "initializeOnePoint", 
function () {
this.initializeOnePointQC ();
});
Clazz.defineMethod (c$, "initializeOnePointQC", 
function () {
this.points =  new Array (1);
this.points[0] =  new JU.P3 ();
if (this.voxelData == null || this.voxelData === this.voxelDataTemp) {
this.voxelData = this.voxelDataTemp =  Clazz.newFloatArray (1, 1, 1, 0);
} else {
this.voxelData =  Clazz.newFloatArray (1, 1, 1, 0);
this.voxelDataTemp =  Clazz.newFloatArray (1, 1, 1, 0);
}this.xMin = this.yMin = this.zMin = 0;
this.initialize (1, 1, 1, this.points);
});
Clazz.defineMethod (c$, "setXYZBohr", 
function (points) {
this.setXYZBohrI (this.xBohr, 0, this.nX, points);
this.setXYZBohrI (this.yBohr, 1, this.nY, points);
this.setXYZBohrI (this.zBohr, 2, this.nZ, points);
}, "~A");
Clazz.defineMethod (c$, "setXYZBohrI", 
 function (bohr, i, n, points) {
if (points != null) {
var x = 0;
for (var j = 0; j < n; j++) {
switch (i) {
case 0:
x = points[j].x;
break;
case 1:
x = points[j].y;
break;
case 2:
x = points[j].z;
break;
}
bohr[j] = x * this.unitFactor;
}
return;
}bohr[0] = this.originBohr[i];
var inc = this.stepBohr[i];
for (var j = 0; ++j < n; ) bohr[j] = bohr[j - 1] + inc;

}, "~A,~N,~N,~A");
Clazz.defineMethod (c$, "setMinMax", 
function (ix) {
this.yMax = this.zMax = (ix < 0 ? this.xMax : ix + 1);
this.yMin = this.zMin = (ix < 0 ? 0 : ix);
}, "~N");
Clazz.defineStatics (c$,
"bohr_per_angstrom", 1.8897161);
});
