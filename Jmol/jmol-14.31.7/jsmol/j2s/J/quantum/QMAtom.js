Clazz.declarePackage ("J.quantum");
Clazz.load (["JU.P3"], "J.quantum.QMAtom", ["JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.myX = null;
this.myY = null;
this.myZ = null;
this.myX2 = null;
this.myY2 = null;
this.myZ2 = null;
this.atom = null;
this.index = 0;
this.znuc = 0;
this.iMolecule = 0;
Clazz.instantialize (this, arguments);
}, J.quantum, "QMAtom", JU.P3);
Clazz.overrideConstructor (c$, 
function (i, xyzAng, atom, X, Y, Z, X2, Y2, Z2, unitFactor) {
this.index = i;
this.myX = X;
this.myY = Y;
this.myZ = Z;
this.myX2 = X2;
this.myY2 = Y2;
this.myZ2 = Z2;
this.atom = atom;
this.setT (xyzAng);
this.scale (unitFactor);
this.znuc = atom.getElementNumber ();
}, "~N,JU.T3,JM.Atom,~A,~A,~A,~A,~A,~A,~N");
Clazz.defineMethod (c$, "setXYZ", 
function (qc, setMinMax) {
var i;
try {
if (setMinMax) {
if (qc.points != null) {
qc.xMin = qc.yMin = qc.zMin = 0;
qc.xMax = qc.yMax = qc.zMax = qc.points.length;
} else {
i = Clazz.doubleToInt (Math.floor ((this.x - qc.xBohr[0] - qc.rangeBohrOrAngstroms) / qc.stepBohr[0]));
qc.xMin = (i < 0 ? 0 : i);
i = Clazz.doubleToInt (Math.floor (1 + (this.x - qc.xBohr[0] + qc.rangeBohrOrAngstroms) / qc.stepBohr[0]));
qc.xMax = (i >= qc.nX ? qc.nX : i + 1);
i = Clazz.doubleToInt (Math.floor ((this.y - qc.yBohr[0] - qc.rangeBohrOrAngstroms) / qc.stepBohr[1]));
qc.yMin = (i < 0 ? 0 : i);
i = Clazz.doubleToInt (Math.floor (1 + (this.y - qc.yBohr[0] + qc.rangeBohrOrAngstroms) / qc.stepBohr[1]));
qc.yMax = (i >= qc.nY ? qc.nY : i + 1);
i = Clazz.doubleToInt (Math.floor ((this.z - qc.zBohr[0] - qc.rangeBohrOrAngstroms) / qc.stepBohr[2]));
qc.zMin = (i < 0 ? 0 : i);
i = Clazz.doubleToInt (Math.floor (1 + (this.z - qc.zBohr[0] + qc.rangeBohrOrAngstroms) / qc.stepBohr[2]));
qc.zMax = (i >= qc.nZ ? qc.nZ : i + 1);
}}for (i = qc.xMax; --i >= qc.xMin; ) {
this.myX2[i] = this.myX[i] = qc.xBohr[i] - this.x;
this.myX2[i] *= this.myX[i];
}
for (i = qc.yMax; --i >= qc.yMin; ) {
this.myY2[i] = this.myY[i] = qc.yBohr[i] - this.y;
this.myY2[i] *= this.myY[i];
}
for (i = qc.zMax; --i >= qc.zMin; ) {
this.myZ2[i] = this.myZ[i] = qc.zBohr[i] - this.z;
this.myZ2[i] *= this.myZ[i];
}
if (qc.points != null) {
qc.yMax = qc.zMax = 1;
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Error in QuantumCalculation setting bounds");
} else {
throw e;
}
}
}, "J.quantum.QuantumCalculation,~B");
});
