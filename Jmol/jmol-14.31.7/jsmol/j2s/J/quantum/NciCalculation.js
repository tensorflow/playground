Clazz.declarePackage ("J.quantum");
Clazz.load (["J.quantum.QuantumPlaneCalculation", "JU.AU"], "J.quantum.NciCalculation", ["java.lang.Double", "JU.BS", "$.Eigen", "JU.BSUtil", "$.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.havePoints = false;
this.isReducedDensity = false;
this.DEFAULT_RHOPLOT_SCF = 0.05;
this.DEFAULT_RHOPLOT_PRO = 0.07;
this.DEFAULT_RHOPARAM = 0.95;
this.rhoMin = 0;
this.rhoPlot = 0;
this.rhoParam = 0;
this.dataScaling = 1;
this.dataIsReducedDensity = false;
this.eigen = null;
this.rhoMolecules = null;
this.type = 0;
this.nMolecules = 0;
this.isPromolecular = false;
this.bsOK = null;
this.noValuesAtAll = false;
this.useAbsolute = false;
this.hess = null;
this.grad = 0;
this.gxTemp = 0;
this.gyTemp = 0;
this.gzTemp = 0;
this.gxxTemp = 0;
this.gyyTemp = 0;
this.gzzTemp = 0;
this.gxyTemp = 0;
this.gyzTemp = 0;
this.gxzTemp = 0;
this.eigenValues = null;
this.test1 = 0;
this.yzPlanesRaw = null;
this.yzCount = 0;
this.yzPlanesRho = null;
this.p0 = null;
this.p1 = null;
this.p2 = null;
Clazz.instantialize (this, arguments);
}, J.quantum, "NciCalculation", J.quantum.QuantumPlaneCalculation);
Clazz.prepareFields (c$, function () {
this.eigenValues =  Clazz.newFloatArray (3, 0);
this.yzPlanesRho = JU.AU.newFloat2 (2);
});
Clazz.overrideMethod (c$, "getNoValue", 
function () {
return 100.0;
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.quantum.NciCalculation, []);
});
Clazz.defineMethod (c$, "setupCalculation", 
function (volumeData, bsSelected, bsExcluded, bsMolecules, atomCoordAngstroms, firstAtomOffset, isReducedDensity, points, parameters, testFlags) {
this.useAbsolute = (testFlags == 2);
this.bsExcluded = bsExcluded;
var bsLigand =  new JU.BS ();
bsLigand.or (bsSelected);
if (bsExcluded != null) {
bsLigand.andNot (bsExcluded);
}this.isPromolecular = (firstAtomOffset >= 0);
this.havePoints = (points != null);
this.isReducedDensity = isReducedDensity;
if (parameters != null) JU.Logger.info ("NCI calculation parameters = " + JU.Escape.eAF (parameters));
this.type = Clazz.doubleToInt (J.quantum.NciCalculation.getParameter (parameters, 1, 0, "type"));
if (this.type != 0 && bsMolecules == null) this.type = 0;
this.rhoMin = J.quantum.NciCalculation.getParameter (parameters, 2, 1e-5, "rhoMin");
this.rhoPlot = J.quantum.NciCalculation.getParameter (parameters, 3, (this.isPromolecular ? this.DEFAULT_RHOPLOT_PRO : this.DEFAULT_RHOPLOT_SCF), "rhoPlot");
this.rhoParam = J.quantum.NciCalculation.getParameter (parameters, 4, this.DEFAULT_RHOPARAM, "rhoParam");
this.dataScaling = J.quantum.NciCalculation.getParameter (parameters, 5, 1, "dataScaling");
this.dataIsReducedDensity = (this.type < 0);
var stype;
switch (this.type) {
case 0:
default:
this.type = 0;
stype = "all";
bsMolecules = null;
break;
case -1:
case 1:
this.type = 1;
stype = "intramolecular";
break;
case -2:
case 2:
this.type = 2;
stype = "intermolecular";
break;
case 3:
stype = "ligand";
break;
}
this.nMolecules = 0;
if (!this.isPromolecular && this.type == 0) atomCoordAngstroms = null;
JU.Logger.info ("NCI calculation type = " + (this.isPromolecular ? "promolecular " : "SCF(CUBE) ") + stype);
this.voxelData = volumeData.getVoxelData ();
this.countsXYZ = volumeData.getVoxelCounts ();
this.initialize (this.countsXYZ[0], this.countsXYZ[1], this.countsXYZ[2], points);
if (this.havePoints) {
this.xMin = this.yMin = this.zMin = 0;
this.xMax = this.yMax = this.zMax = points.length;
}this.setupCoordinates (volumeData.getOriginFloat (), volumeData.getVolumetricVectorLengths (), bsSelected, atomCoordAngstroms, null, points, true);
if (this.qmAtoms != null) {
var qmMap =  Clazz.newIntArray (bsSelected.length (), 0);
for (var i = this.qmAtoms.length; --i >= 0; ) {
qmMap[this.qmAtoms[i].index] = i;
if (this.qmAtoms[i].znuc < 1) {
this.qmAtoms[i] = null;
} else if (this.qmAtoms[i].znuc > 18) {
this.qmAtoms[i].znuc = 18;
JU.Logger.info ("NCI calculation just setting nuclear charge for " + this.qmAtoms[i].atom + " to 18 (argon)");
}}
this.nMolecules = 0;
if (this.type != 0) {
for (var i = 0; i < bsMolecules.length; i++) {
var bs = JU.BSUtil.copy (bsMolecules[i]);
bs.and (bsSelected);
if (bs.nextSetBit (0) < 0) continue;
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) this.qmAtoms[qmMap[j]].iMolecule = this.nMolecules;

this.nMolecules++;
JU.Logger.info ("Molecule " + (this.nMolecules) + " (" + bs.cardinality () + " atoms): " + JU.Escape.eBS (bs));
}
this.rhoMolecules =  Clazz.newDoubleArray (this.nMolecules, 0);
}if (this.nMolecules == 0) this.nMolecules = 1;
if (this.nMolecules == 1) {
this.noValuesAtAll = (this.type != 0 && this.type != 1);
this.type = 0;
}if (!this.isPromolecular) this.getBsOK ();
}if (!isReducedDensity || !this.isPromolecular) this.initializeEigen ();
this.doDebug = (JU.Logger.debugging);
return true;
}, "J.jvxl.data.VolumeData,JU.BS,JU.BS,~A,~A,~N,~B,~A,~A,~N");
c$.getParameter = Clazz.defineMethod (c$, "getParameter", 
 function (parameters, i, def, name) {
var param = (parameters == null || parameters.length < i + 1 ? 0 : parameters[i]);
if (param == 0) param = def;
JU.Logger.info ("NCI calculation parameters[" + i + "] (" + name + ") = " + param);
return param;
}, "~A,~N,~N,~S");
Clazz.defineMethod (c$, "getBsOK", 
 function () {
if (this.noValuesAtAll || this.nMolecules == 1) return;
this.bsOK = JU.BS.newN (this.nX * this.nY * this.nZ);
this.setXYZBohr (null);
for (var ix = 0, index = 0; ix < this.countsXYZ[0]; ix++) for (var iy = 0; iy < this.countsXYZ[1]; iy++) for (var iz = 0; iz < this.countsXYZ[2]; index++, iz++) this.processAtoms (ix, iy, iz, index);



JU.Logger.info ("NCI calculation SCF " + (this.type == 1 ? "intra" : "inter") + "molecular grid points = " + this.bsOK.cardinality ());
});
Clazz.overrideMethod (c$, "createCube", 
function () {
this.setXYZBohr (this.points);
this.process ();
});
Clazz.overrideMethod (c$, "initializeOnePoint", 
function () {
if (this.eigen == null) this.initializeEigen ();
this.isReducedDensity = false;
this.initializeOnePointQC ();
});
Clazz.defineMethod (c$, "initializeEigen", 
 function () {
this.eigen =  new JU.Eigen ().set (3);
this.hess =  Clazz.newDoubleArray (3, 3, 0);
});
Clazz.overrideMethod (c$, "getPlane", 
function (ix, yzPlane) {
if (this.noValuesAtAll) {
for (var j = 0; j < this.yzCount; j++) yzPlane[j] = NaN;

return;
}this.isReducedDensity = true;
this.initialize (this.countsXYZ[0], this.countsXYZ[1], this.countsXYZ[2], null);
this.setXYZBohr (null);
var index = ix * this.yzCount;
for (var iy = 0, i = 0; iy < this.countsXYZ[1]; iy++) for (var iz = 0; iz < this.countsXYZ[2]; i++, iz++) if (this.bsOK == null || this.bsOK.get (index + i)) yzPlane[i] = this.getValue (this.processAtoms (ix, iy, iz, -1), this.isReducedDensity);
 else yzPlane[i] = NaN;


}, "~N,~A");
Clazz.defineMethod (c$, "process", 
function () {
if (this.noValuesAtAll) return;
for (var ix = this.xMax; --ix >= this.xMin; ) {
for (var iy = this.yMin; iy < this.yMax; iy++) {
var vd = this.voxelData[ix][(this.havePoints ? 0 : iy)];
for (var iz = this.zMin; iz < this.zMax; iz++) vd[(this.havePoints ? 0 : iz)] = this.getValue (this.processAtoms (ix, iy, iz, -1), this.isReducedDensity);

}
}
});
Clazz.defineMethod (c$, "getValue", 
 function (rho, isReducedDensity) {
var s;
if (rho == 100.0) return NaN;
if (isReducedDensity) {
s = J.quantum.NciCalculation.c * this.grad * Math.pow (rho, J.quantum.NciCalculation.rpower);
} else if (this.useAbsolute) {
s = rho;
} else {
this.hess[0][0] = this.gxxTemp;
this.hess[1][0] = this.hess[0][1] = this.gxyTemp;
this.hess[2][0] = this.hess[0][2] = this.gxzTemp;
this.hess[1][1] = this.gyyTemp;
this.hess[1][2] = this.hess[2][1] = this.gyzTemp;
this.hess[2][2] = this.gzzTemp;
this.eigen.calc (this.hess);
this.eigen.fillFloatArrays (null, this.eigenValues);
s = (this.eigenValues[1] < 0 ? -rho : rho);
}return s;
}, "~N,~B");
Clazz.defineMethod (c$, "processAtoms", 
 function (ix, iy, iz, index) {
var rho = 0;
if (this.isReducedDensity) {
if (this.isPromolecular) this.gxTemp = this.gyTemp = this.gzTemp = 0;
if (this.type != 0) for (var i = this.nMolecules; --i >= 0; ) this.rhoMolecules[i] = 0;

} else {
this.gxxTemp = this.gyyTemp = this.gzzTemp = this.gxyTemp = this.gyzTemp = this.gxzTemp = 0;
}for (var i = this.qmAtoms.length; --i >= 0; ) {
var znuc = this.qmAtoms[i].znuc;
var x = this.xBohr[ix] - this.qmAtoms[i].x;
var y = this.yBohr[iy] - this.qmAtoms[i].y;
var z = this.zBohr[iz] - this.qmAtoms[i].z;
if (Math.abs (x) > J.quantum.NciCalculation.dMax[znuc] || Math.abs (y) > J.quantum.NciCalculation.dMax[znuc] || Math.abs (z) > J.quantum.NciCalculation.dMax[znuc]) continue;
var r = Math.sqrt (x * x + y * y + z * z);
var z1 = J.quantum.NciCalculation.zeta1[znuc];
var z2 = J.quantum.NciCalculation.zeta2[znuc];
var z3 = J.quantum.NciCalculation.zeta3[znuc];
var ce1 = J.quantum.NciCalculation.coef1[znuc] * Math.exp (-r / z1);
var ce2 = J.quantum.NciCalculation.coef2[znuc] * Math.exp (-r / z2);
var ce3 = J.quantum.NciCalculation.coef3[znuc] * Math.exp (-r / z3);
var rhoAtom = ce1 + ce2 + ce3;
rho += rhoAtom;
if (rho > this.rhoPlot || rho < this.rhoMin) return 100.0;
if (this.isReducedDensity) {
if (this.type != 0) this.rhoMolecules[this.qmAtoms[i].iMolecule] += rhoAtom;
if (this.isPromolecular) {
var fac1r = (ce1 / z1 + ce2 / z2 + ce3 / z3) / r;
this.gxTemp -= fac1r * x;
this.gyTemp -= fac1r * y;
this.gzTemp -= fac1r * z;
}} else {
x /= r;
y /= r;
z /= r;
var fac1r = (ce1 / z1 + ce2 / z2 + ce3 / z3) / r;
var fr2 = fac1r + (ce1 / z1 / z1 + ce2 / z2 / z2 + ce3 / z3 / z3);
this.gxxTemp += fr2 * x * x - fac1r;
this.gyyTemp += fr2 * y * y - fac1r;
this.gzzTemp += fr2 * z * z - fac1r;
this.gxyTemp += fr2 * x * y;
this.gxzTemp += fr2 * x * z;
this.gyzTemp += fr2 * y * z;
}}
if (this.isReducedDensity) {
switch (this.type) {
case 1:
case 2:
var isIntra = false;
var rhocut2 = this.rhoParam * rho;
for (var i = 0; i < this.nMolecules; i++) if (this.rhoMolecules[i] >= rhocut2) {
isIntra = true;
break;
}
if ((this.type == 1) != isIntra) return 100.0;
if (index >= 0) {
this.bsOK.set (index);
return 0;
}break;
case 3:
break;
default:
break;
}
if (this.useAbsolute) this.grad = this.gxTemp + this.gyTemp + this.gzTemp;
 else this.grad = Math.sqrt (this.gxTemp * this.gxTemp + this.gyTemp * this.gyTemp + this.gzTemp * this.gzTemp);
}return rho;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "setPlanes", 
function (planes) {
this.yzPlanesRaw = planes;
this.yzCount = this.nY * this.nZ;
}, "~A");
Clazz.overrideMethod (c$, "calcPlane", 
function (x, plane) {
this.yzPlanesRho[0] = this.yzPlanesRho[1];
this.yzPlanesRho[1] = plane;
if (this.noValuesAtAll) {
for (var j = 0; j < this.yzCount; j++) plane[j] = NaN;

return;
}var i0 = 0;
if (this.dataIsReducedDensity) {
this.p1 = plane;
} else {
i0 = (this.yzPlanesRho[0] == null ? 0 : 1);
this.p0 = this.yzPlanesRaw[i0++];
this.p1 = this.yzPlanesRaw[i0++];
this.p2 = this.yzPlanesRaw[i0++];
for (var i = (i0 == 4 ? 3 : 0); i < i0; i++) for (var j = 0; j < this.yzCount; j++) this.yzPlanesRaw[i][j] = Math.abs (this.yzPlanesRaw[i][j] * this.dataScaling);


}var index = x * this.yzCount;
for (var y = 0, i = 0; y < this.nY; y++) for (var z = 0; z < this.nZ; z++, i++) {
var rho = this.p1[i];
if (this.bsOK != null && !this.bsOK.get (index + i)) {
plane[i] = NaN;
} else if (this.dataIsReducedDensity) {
continue;
} else if (rho == 0) {
plane[i] = 0;
} else if (rho > this.rhoPlot || rho < this.rhoMin || y == 0 || y == this.nY - 1 || z == 0 || z == this.nZ - 1) {
plane[i] = NaN;
} else {
this.gxTemp = (this.p2[i] - this.p0[i]) / (2 * this.stepBohr[0]);
this.gyTemp = (this.p1[i + this.nZ] - this.p1[i - this.nZ]) / (2 * this.stepBohr[1]);
this.gzTemp = (this.p1[i + 1] - this.p1[i - 1]) / (2 * this.stepBohr[2]);
this.grad = Math.sqrt (this.gxTemp * this.gxTemp + this.gyTemp * this.gyTemp + this.gzTemp * this.gzTemp);
plane[i] = this.getValue (rho, true);
}}

}, "~N,~A");
Clazz.defineMethod (c$, "process", 
function (vA, vB, f) {
var valueA = this.getPlaneValue (vA);
var valueB = this.getPlaneValue (vB);
return (valueA + f * (valueB - valueA));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getPlaneValue", 
 function (vA) {
var i = (vA % this.yzCount);
var x = Clazz.doubleToInt (vA / this.yzCount);
var y = Clazz.doubleToInt (i / this.nZ);
var z = i % this.nZ;
if (x == 0 || x == this.nX - 1 || y == 0 || y == this.nY - 1 || z == 0 || z == this.nZ - 1) return 100.0;
var iPlane = x % 2;
var p0 = this.yzPlanesRaw[iPlane++];
var p1 = this.yzPlanesRaw[iPlane++];
var p2 = this.yzPlanesRaw[iPlane++];
var rho = p1[i];
if (rho > this.rhoPlot || rho < this.rhoMin) return 100.0;
var dx = this.stepBohr[0];
var dy = this.stepBohr[1];
var dz = this.stepBohr[2];
this.gxxTemp = (p2[i] - 2 * rho + p0[i]) / (dx * dx);
this.gyyTemp = (p1[i + this.nZ] - 2 * rho + p1[i - this.nZ]) / (dy * dy);
this.gzzTemp = (p1[i + 1] - 2 * rho + p1[i - 1]) / (dz * dz);
this.gxyTemp = ((p2[i + this.nZ] - p2[i - this.nZ]) - (p0[i + this.nZ] - p0[i - this.nZ])) / (4 * dx * dy);
this.gxzTemp = ((p2[i + 1] - p2[i - 1]) - (p0[i + 1] - p0[i - 1])) / (4 * dx * dz);
this.gyzTemp = ((p1[i + this.nZ + 1] - p1[i - this.nZ + 1]) - (p1[i + this.nZ - 1] - p1[i - this.nZ - 1])) / (4 * dy * dz);
if (Double.isNaN (this.gxxTemp) || Double.isNaN (this.gyyTemp) || Double.isNaN (this.gzzTemp) || Double.isNaN (this.gxyTemp) || Double.isNaN (this.gxzTemp) || Double.isNaN (this.gyzTemp)) return NaN;
return this.getValue (rho, false);
}, "~N");
Clazz.defineStatics (c$,
"TYPE_ALL", 0,
"TYPE_INTRA", 1,
"TYPE_INTER", 2,
"TYPE_LIGAND", 3,
"NO_VALUE", 100);
c$.c = c$.prototype.c = (1 / (2 * Math.pow (29.608813203268074, 0.3333333333333333)));
Clazz.defineStatics (c$,
"rpower", -1.3333333333333333,
"coef1",  Clazz.newDoubleArray (-1, [0, 0.2815, 2.437, 11.84, 31.34, 67.82, 120.2, 190.9, 289.5, 406.3, 561.3, 760.8, 1016., 1319., 1658., 2042., 2501., 3024., 3625.]),
"coef2",  Clazz.newDoubleArray (-1, [0, 0., 0., 0.06332, 0.3694, 0.8527, 1.172, 2.247, 2.879, 3.049, 6.984, 22.42, 37.17, 57.95, 87.16, 115.7, 158.0, 205.5, 260.0]),
"coef3",  Clazz.newDoubleArray (-1, [0, 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.06358, 0.3331, 0.8878, 0.7888, 1.465, 2.170, 3.369, 5.211]),
"zeta1",  Clazz.newDoubleArray (-1, [0, 0.5288, 0.3379, 0.1912, 0.1390, 0.1059, 0.0884, 0.0767, 0.0669, 0.0608, 0.0549, 0.0496, 0.0449, 0.0411, 0.0382, 0.0358, 0.0335, 0.0315, 0.0296]),
"zeta2",  Clazz.newDoubleArray (-1, [0, 1., 1., 0.9992, 0.6945, 0.5300, 0.5480, 0.4532, 0.3974, 0.3994, 0.3447, 0.2511, 0.2150, 0.1874, 0.1654, 0.1509, 0.1369, 0.1259, 0.1168]),
"zeta3",  Clazz.newDoubleArray (-1, [0, 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1.0236, 0.7753, 0.5962, 0.6995, 0.5851, 0.5149, 0.4974, 0.4412]),
"dMax",  Clazz.newDoubleArray (-1, [0, 2.982502423, 2.635120936, 4.144887422, 4.105800759, 3.576656363, 3.872424373, 3.497503547, 3.165369971, 3.204214082, 3.051069564, 4.251312809, 4.503309314, 4.047465141, 4.666024968, 4.265151411, 3.955710076, 4.040067606, 3.776022242]));
});
