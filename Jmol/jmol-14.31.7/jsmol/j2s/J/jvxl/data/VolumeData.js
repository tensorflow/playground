Clazz.declarePackage ("J.jvxl.data");
Clazz.load (["JU.M3", "$.P3", "$.V3"], "J.jvxl.data.VolumeData", ["java.lang.Float", "java.util.Hashtable", "JU.SB", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sr = null;
this.doIterate = true;
this.volumetricOrigin = null;
this.origin = null;
this.volumetricVectors = null;
this.voxelCounts = null;
this.nPoints = 0;
this.voxelData = null;
this.voxelMap = null;
this.volumetricVectorLengths = null;
this.maxVectorLength = 0;
this.minToPlaneDistance = 0;
this.yzCount = 0;
this.unitVolumetricVectors = null;
this.volumetricMatrix = null;
this.inverseMatrix = null;
this.thePlane = null;
this.thePlaneNormalMag = 0;
this.ptXyzTemp = null;
this.xmlData = null;
this.mappingPlane = null;
this.mappingPlaneNormalMag = 0;
this.minGrid = 0;
this.maxGrid = 0;
this.voxelVolume = 0;
this.oabc = null;
this.isPeriodic = false;
this.isSquared = false;
this.edgeVector = null;
this.ptTemp = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.data, "VolumeData");
Clazz.prepareFields (c$, function () {
this.volumetricOrigin =  new JU.P3 ();
this.origin =  Clazz.newFloatArray (3, 0);
this.volumetricVectors =  new Array (3);
this.voxelCounts =  Clazz.newIntArray (3, 0);
this.volumetricVectorLengths =  Clazz.newFloatArray (3, 0);
this.unitVolumetricVectors =  new Array (3);
this.volumetricMatrix =  new JU.M3 ();
this.inverseMatrix =  new JU.M3 ();
this.ptXyzTemp =  new JU.P3 ();
this.edgeVector =  new JU.V3 ();
this.ptTemp =  new JU.P3 ();
});
Clazz.defineMethod (c$, "getVoxelData", 
function () {
return this.voxelData;
});
Clazz.defineMethod (c$, "setVoxelDataAsArray", 
function (voxelData) {
this.voxelData = voxelData;
if (voxelData != null) this.sr = null;
}, "~A");
Clazz.defineMethod (c$, "hasPlane", 
function () {
return (this.thePlane != null);
});
Clazz.makeConstructor (c$, 
function () {
this.volumetricVectors[0] =  new JU.V3 ();
this.volumetricVectors[1] =  new JU.V3 ();
this.volumetricVectors[2] =  new JU.V3 ();
this.unitVolumetricVectors[0] =  new JU.V3 ();
this.unitVolumetricVectors[1] =  new JU.V3 ();
this.unitVolumetricVectors[2] =  new JU.V3 ();
});
Clazz.defineMethod (c$, "setMappingPlane", 
function (plane) {
this.mappingPlane = plane;
if (plane == null) return;
this.mappingPlaneNormalMag = Math.sqrt (plane.x * plane.x + plane.y * plane.y + plane.z * plane.z);
}, "JU.P4");
Clazz.defineMethod (c$, "distanceToMappingPlane", 
function (pt) {
return (this.mappingPlane.x * pt.x + this.mappingPlane.y * pt.y + this.mappingPlane.z * pt.z + this.mappingPlane.w) / this.mappingPlaneNormalMag;
}, "JU.T3");
Clazz.defineMethod (c$, "setVolumetricOrigin", 
function (x, y, z) {
this.volumetricOrigin.set (x, y, z);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getOriginFloat", 
function () {
return this.origin;
});
Clazz.defineMethod (c$, "getYzCount", 
function () {
this.minGrid = this.volumetricVectors[0].length ();
this.minGrid = Math.min (this.minGrid, this.volumetricVectors[1].length ());
this.minGrid = Math.min (this.minGrid, this.volumetricVectors[2].length ());
this.maxGrid = this.volumetricVectors[0].length ();
this.maxGrid = Math.max (this.maxGrid, this.volumetricVectors[1].length ());
this.maxGrid = Math.max (this.maxGrid, this.volumetricVectors[2].length ());
this.nPoints = this.voxelCounts[0] * this.voxelCounts[1] * this.voxelCounts[2];
return this.yzCount = this.voxelCounts[1] * this.voxelCounts[2];
});
Clazz.defineMethod (c$, "getVolumetricVectorLengths", 
function () {
return this.volumetricVectorLengths;
});
Clazz.defineMethod (c$, "setVolumetricVector", 
function (i, x, y, z) {
this.volumetricVectors[i].x = x;
this.volumetricVectors[i].y = y;
this.volumetricVectors[i].z = z;
this.setUnitVectors ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getVoxelCounts", 
function () {
return this.voxelCounts;
});
Clazz.defineMethod (c$, "setVoxelCounts", 
function (nPointsX, nPointsY, nPointsZ) {
this.voxelCounts[0] = nPointsX;
this.voxelCounts[1] = nPointsY;
this.voxelCounts[2] = nPointsZ;
return nPointsX * nPointsY * nPointsZ;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getVoxelDataAt", 
function (pt) {
var ix = Clazz.doubleToInt (pt / this.yzCount);
pt -= ix * this.yzCount;
var iy = Clazz.doubleToInt (pt / this.voxelCounts[2]);
var iz = pt - iy * this.voxelCounts[2];
return this.voxelData[ix][iy][iz];
}, "~N");
Clazz.defineMethod (c$, "getPointIndex", 
function (x, y, z) {
return x * this.yzCount + y * this.voxelCounts[2] + z;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getPoint", 
function (ipt, pt) {
var ix = Clazz.doubleToInt (ipt / this.yzCount);
ipt -= ix * this.yzCount;
var iy = Clazz.doubleToInt (ipt / this.voxelCounts[2]);
var iz = ipt - iy * this.voxelCounts[2];
this.voxelPtToXYZ (ix, iy, iz, pt);
}, "~N,JU.P3");
Clazz.defineMethod (c$, "setVoxelData", 
function (pt, value) {
var ix = Clazz.doubleToInt (pt / this.yzCount);
pt -= ix * this.yzCount;
var iy = Clazz.doubleToInt (pt / this.voxelCounts[2]);
var iz = pt - iy * this.voxelCounts[2];
this.voxelData[ix][iy][iz] = value;
}, "~N,~N");
Clazz.defineMethod (c$, "setVoxelMap", 
function () {
this.voxelMap =  new java.util.Hashtable ();
this.getYzCount ();
});
Clazz.defineMethod (c$, "setMatrix", 
 function () {
for (var i = 0; i < 3; i++) this.volumetricMatrix.setColumnV (i, this.volumetricVectors[i]);

try {
this.inverseMatrix.invertM (this.volumetricMatrix);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("VolumeData error setting matrix -- bad unit vectors? ");
return false;
} else {
throw e;
}
}
return true;
});
Clazz.defineMethod (c$, "transform", 
function (v1, v2) {
this.volumetricMatrix.rotate2 (v1, v2);
}, "JU.V3,JU.V3");
Clazz.defineMethod (c$, "setPlaneParameters", 
function (plane) {
this.thePlane = plane;
this.thePlaneNormalMag = Math.sqrt (plane.x * plane.x + plane.y * plane.y + plane.z * plane.z);
}, "JU.P4");
Clazz.defineMethod (c$, "calcVoxelPlaneDistance", 
function (x, y, z) {
this.voxelPtToXYZ (x, y, z, this.ptXyzTemp);
return this.distancePointToPlane (this.ptXyzTemp);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getToPlaneParameter", 
function () {
return (Math.sqrt (this.thePlane.x * this.thePlane.x + this.thePlane.y * this.thePlane.y + this.thePlane.z * this.thePlane.z) * this.minToPlaneDistance);
});
Clazz.defineMethod (c$, "isNearPlane", 
function (x, y, z, toPlaneParameter) {
this.voxelPtToXYZ (x, y, z, this.ptXyzTemp);
return ((this.thePlane.x * this.ptXyzTemp.x + this.thePlane.y * this.ptXyzTemp.y + this.thePlane.z * this.ptXyzTemp.z + this.thePlane.w) < toPlaneParameter);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "distancePointToPlane", 
function (pt) {
return (this.thePlane.x * pt.x + this.thePlane.y * pt.y + this.thePlane.z * pt.z + this.thePlane.w) / this.thePlaneNormalMag;
}, "JU.T3");
Clazz.defineMethod (c$, "voxelPtToXYZ", 
function (x, y, z, pt) {
pt.scaleAdd2 (x, this.volumetricVectors[0], this.volumetricOrigin);
pt.scaleAdd2 (y, this.volumetricVectors[1], pt);
pt.scaleAdd2 (z, this.volumetricVectors[2], pt);
}, "~N,~N,~N,JU.T3");
Clazz.defineMethod (c$, "setUnitVectors", 
function () {
this.maxVectorLength = 0;
this.voxelVolume = 1;
for (var i = 0; i < 3; i++) {
var d = this.volumetricVectorLengths[i] = this.volumetricVectors[i].length ();
if (d == 0) return false;
if (d > this.maxVectorLength) this.maxVectorLength = d;
this.voxelVolume *= d;
this.unitVolumetricVectors[i].setT (this.volumetricVectors[i]);
this.unitVolumetricVectors[i].normalize ();
}
this.minToPlaneDistance = this.maxVectorLength * 2;
this.origin[0] = this.volumetricOrigin.x;
this.origin[1] = this.volumetricOrigin.y;
this.origin[2] = this.volumetricOrigin.z;
this.oabc =  new Array (4);
this.oabc[0] = JU.V3.newV (this.volumetricOrigin);
for (var i = 0; i < 3; i++) {
var v = this.oabc[i + 1] =  new JU.V3 ();
v.scaleAdd2 (this.voxelCounts[i] - 1, this.volumetricVectors[i], v);
}
return this.setMatrix ();
});
Clazz.defineMethod (c$, "xyzToVoxelPt", 
function (x, y, z, pt3i) {
this.ptXyzTemp.set (x, y, z);
this.ptXyzTemp.sub (this.volumetricOrigin);
this.inverseMatrix.rotate (this.ptXyzTemp);
pt3i.set (Math.round (this.ptXyzTemp.x), Math.round (this.ptXyzTemp.y), Math.round (this.ptXyzTemp.z));
}, "~N,~N,~N,JU.T3i");
Clazz.defineMethod (c$, "lookupInterpolatedVoxelValue", 
function (point, getSource) {
if (this.mappingPlane != null) return this.distanceToMappingPlane (point);
if (this.sr != null) {
var v = this.sr.getValueAtPoint (point, getSource);
return (this.isSquared ? v * v : v);
}this.ptXyzTemp.sub2 (point, this.volumetricOrigin);
this.inverseMatrix.rotate (this.ptXyzTemp);
var iMax;
var xLower = this.indexLower (this.ptXyzTemp.x, iMax = this.voxelCounts[0] - 1);
var xUpper = this.indexUpper (this.ptXyzTemp.x, xLower, iMax);
var yLower = this.indexLower (this.ptXyzTemp.y, iMax = this.voxelCounts[1] - 1);
var yUpper = this.indexUpper (this.ptXyzTemp.y, yLower, iMax);
var zLower = this.indexLower (this.ptXyzTemp.z, iMax = this.voxelCounts[2] - 1);
var zUpper = this.indexUpper (this.ptXyzTemp.z, zLower, iMax);
var v1 = J.jvxl.data.VolumeData.getFractional2DValue (this.mantissa (this.ptXyzTemp.x - xLower), this.mantissa (this.ptXyzTemp.y - yLower), this.getVoxelValue (xLower, yLower, zLower), this.getVoxelValue (xUpper, yLower, zLower), this.getVoxelValue (xLower, yUpper, zLower), this.getVoxelValue (xUpper, yUpper, zLower));
var v2 = J.jvxl.data.VolumeData.getFractional2DValue (this.mantissa (this.ptXyzTemp.x - xLower), this.mantissa (this.ptXyzTemp.y - yLower), this.getVoxelValue (xLower, yLower, zUpper), this.getVoxelValue (xUpper, yLower, zUpper), this.getVoxelValue (xLower, yUpper, zUpper), this.getVoxelValue (xUpper, yUpper, zUpper));
return v1 + this.mantissa (this.ptXyzTemp.z - zLower) * (v2 - v1);
}, "JU.T3,~B");
Clazz.defineMethod (c$, "mantissa", 
 function (f) {
return (this.isPeriodic ? f - Math.floor (f) : f);
}, "~N");
Clazz.defineMethod (c$, "getVoxelValue", 
function (x, y, z) {
if (this.voxelMap == null) return this.voxelData[x][y][z];
var f = this.voxelMap.get (Integer.$valueOf (this.getPointIndex (x, y, z)));
return (f == null ? NaN : f.floatValue ());
}, "~N,~N,~N");
c$.getFractional2DValue = Clazz.defineMethod (c$, "getFractional2DValue", 
function (fx, fy, x11, x12, x21, x22) {
var v1 = x11 + fx * (x12 - x11);
var v2 = x21 + fx * (x22 - x21);
return v1 + fy * (v2 - v1);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "indexLower", 
 function (x, xMax) {
if (this.isPeriodic && xMax > 0) {
while (x < 0) x += xMax;

while (x >= xMax) x -= xMax;

return Clazz.doubleToInt (Math.floor (x));
}if (x < 0) return 0;
var floor = Clazz.doubleToInt (Math.floor (x));
return (floor > xMax ? xMax : floor);
}, "~N,~N");
Clazz.defineMethod (c$, "indexUpper", 
 function (x, xLower, xMax) {
return (!this.isPeriodic && x < 0 || xLower == xMax ? xLower : xLower + 1);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "offsetCenter", 
function (center) {
var pt =  new JU.P3 ();
pt.scaleAdd2 ((this.voxelCounts[0] - 1) / 2, this.volumetricVectors[0], pt);
pt.scaleAdd2 ((this.voxelCounts[1] - 1) / 2, this.volumetricVectors[1], pt);
pt.scaleAdd2 ((this.voxelCounts[2] - 1) / 2, this.volumetricVectors[2], pt);
this.volumetricOrigin.sub2 (center, pt);
}, "JU.P3");
Clazz.defineMethod (c$, "setDataDistanceToPlane", 
function (plane) {
this.setPlaneParameters (plane);
var nx = this.voxelCounts[0];
var ny = this.voxelCounts[1];
var nz = this.voxelCounts[2];
this.voxelData =  Clazz.newFloatArray (nx, ny, nz, 0);
for (var x = 0; x < nx; x++) for (var y = 0; y < ny; y++) for (var z = 0; z < nz; z++) this.voxelData[x][y][z] = this.calcVoxelPlaneDistance (x, y, z);



}, "JU.P4");
Clazz.defineMethod (c$, "filterData", 
function (isSquared, invertCutoff) {
var doInvert = (!Float.isNaN (invertCutoff));
if (this.sr != null) {
this.isSquared = isSquared;
return;
}var nx = this.voxelCounts[0];
var ny = this.voxelCounts[1];
var nz = this.voxelCounts[2];
if (isSquared) for (var x = 0; x < nx; x++) for (var y = 0; y < ny; y++) for (var z = 0; z < nz; z++) this.voxelData[x][y][z] *= this.voxelData[x][y][z];



if (doInvert) for (var x = 0; x < nx; x++) for (var y = 0; y < ny; y++) for (var z = 0; z < nz; z++) this.voxelData[x][y][z] = invertCutoff - this.voxelData[x][y][z];



}, "~B,~N");
Clazz.defineMethod (c$, "capData", 
function (plane, cutoff) {
if (this.voxelData == null) return;
var nx = this.voxelCounts[0];
var ny = this.voxelCounts[1];
var nz = this.voxelCounts[2];
var normal = JU.V3.new3 (plane.x, plane.y, plane.z);
normal.normalize ();
var f = 1;
for (var x = 0; x < nx; x++) for (var y = 0; y < ny; y++) for (var z = 0; z < nz; z++) {
var value = this.voxelData[x][y][z] - cutoff;
this.voxelPtToXYZ (x, y, z, this.ptXyzTemp);
var d = (this.ptXyzTemp.x * normal.x + this.ptXyzTemp.y * normal.y + this.ptXyzTemp.z * normal.z + plane.w - cutoff) / f;
if (d >= 0 || d > value) this.voxelData[x][y][z] = d;
}


}, "JU.P4,~N");
Clazz.defineMethod (c$, "setVolumetricXml", 
function () {
var sb =  new JU.SB ();
if (this.voxelCounts[0] == 0) {
sb.append ("<jvxlVolumeData>\n");
} else {
sb.append ("<jvxlVolumeData origin=\"" + JU.Escape.eP (this.volumetricOrigin) + "\">\n");
for (var i = 0; i < 3; i++) sb.append ("<jvxlVolumeVector type=\"" + i + "\" count=\"" + this.voxelCounts[i] + "\" vector=\"" + JU.Escape.eP (this.volumetricVectors[i]) + "\"></jvxlVolumeVector>\n");

}sb.append ("</jvxlVolumeData>\n");
return this.xmlData = sb.toString ();
});
Clazz.defineMethod (c$, "setVoxelMapValue", 
function (x, y, z, v) {
if (this.voxelMap == null) return;
this.voxelMap.put (Integer.$valueOf (this.getPointIndex (x, y, z)), Float.$valueOf (v));
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "calculateFractionalPoint", 
function (cutoff, pointA, pointB, valueA, valueB, pt) {
var d = (valueB - valueA);
var fraction = (cutoff - valueA) / d;
this.edgeVector.sub2 (pointB, pointA);
pt.scaleAdd2 (fraction, this.edgeVector, pointA);
if (this.sr == null || !this.doIterate || valueB == valueA || fraction < 0.01 || fraction > 0.99 || (this.edgeVector.length ()) < 0.01) return cutoff;
var n = 0;
this.ptTemp.setT (pt);
var v = this.lookupInterpolatedVoxelValue (this.ptTemp, false);
var v0 = NaN;
while (++n < 10) {
var fnew = (v - valueA) / d;
if (fnew < 0 || fnew > 1) break;
var diff = (cutoff - v) / d / 2;
fraction += diff;
if (fraction < 0 || fraction > 1) break;
pt.setT (this.ptTemp);
v0 = v;
if (Math.abs (diff) < 0.005) break;
this.ptTemp.scaleAdd2 (diff, this.edgeVector, pt);
v = this.lookupInterpolatedVoxelValue (this.ptTemp, false);
}
return v0;
}, "~N,JU.P3,JU.P3,~N,~N,JU.P3");
});
