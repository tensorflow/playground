Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.SurfaceFileReader"], "J.jvxl.readers.VolumeFileReader", ["java.lang.Float", "JU.AU", "$.PT", "$.SB", "J.api.Interface", "J.atomdata.AtomData", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.endOfData = false;
this.negativeAtomCount = false;
this.ac = 0;
this.nSurfaces = 0;
this.isAngstroms = false;
this.canDownsample = false;
this.downsampleRemainders = null;
this.getNCIPlanes = false;
this.nData = 0;
this.readerClosed = false;
this.downsampleFactor = 0;
this.nSkipX = 0;
this.nSkipY = 0;
this.nSkipZ = 0;
this.yzPlanesRaw = null;
this.iPlaneNCI = 0;
this.boundingBox = null;
this.isScaledAlready = false;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "VolumeFileReader", J.jvxl.readers.SurfaceFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.VolumeFileReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2VFR (sg, br);
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "init2VFR", 
function (sg, br) {
this.init2SFR (sg, br);
this.canDownsample = this.isProgressive = this.isXLowToHigh = true;
this.jvxlData.wasCubic = true;
this.boundingBox = this.params.boundingBox;
if (this.params.qmOrbitalType == 4) {
this.hasColorData = (this.params.parameters == null || this.params.parameters[1] >= 0);
this.getNCIPlanes = true;
this.params.insideOut = !this.params.insideOut;
}}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "recordData", 
function (value) {
if (Float.isNaN (value)) return value;
if (value < this.dataMin) this.dataMin = value;
if (value > this.dataMax) this.dataMax = value;
this.dataMean += value;
this.nData++;
return value;
}, "~N");
Clazz.overrideMethod (c$, "closeReader", 
function () {
if (this.readerClosed) return;
this.readerClosed = true;
this.closeReaderSFR ();
if (this.nData == 0 || this.dataMax == -3.4028235E38) return;
this.dataMean /= this.nData;
JU.Logger.info ("VolumeFileReader closing file: " + this.nData + " points read \ndata min/max/mean = " + this.dataMin + "/" + this.dataMax + "/" + this.dataMean);
});
Clazz.overrideMethod (c$, "readVolumeParameters", 
function (isMapData) {
this.endOfData = false;
this.nSurfaces = this.readVolumetricHeader ();
if (this.nSurfaces == 0) return false;
if (this.nSurfaces < this.params.fileIndex) {
JU.Logger.warn ("not enough surfaces in file -- resetting params.fileIndex to " + this.nSurfaces);
this.params.fileIndex = this.nSurfaces;
}return true;
}, "~B");
Clazz.overrideMethod (c$, "readVolumeData", 
function (isMapData) {
return this.readVolumeDataVFR (isMapData);
}, "~B");
Clazz.defineMethod (c$, "readVolumeDataVFR", 
function (isMapData) {
if (!this.gotoAndReadVoxelData (isMapData)) return false;
if (!this.vertexDataOnly) JU.Logger.info ("JVXL read: " + this.nPointsX + " x " + this.nPointsY + " x " + this.nPointsZ + " data points");
return true;
}, "~B");
Clazz.defineMethod (c$, "readVolumetricHeader", 
 function () {
try {
this.readParameters ();
if (this.ac == -2147483648) return 0;
if (!this.vertexDataOnly) JU.Logger.info ("voxel grid origin:" + this.volumetricOrigin);
var downsampleFactor = this.params.downsampleFactor;
var downsampling = (this.canDownsample && downsampleFactor > 1);
if (downsampleFactor > 1 && !this.canDownsample) this.jvxlData.msg += "\ncannot downsample this file type";
if (downsampling) {
this.downsampleRemainders =  Clazz.newIntArray (3, 0);
JU.Logger.info ("downsample factor = " + downsampleFactor);
for (var i = 0; i < 3; ++i) {
var n = this.voxelCounts[i];
this.downsampleRemainders[i] = n % downsampleFactor;
this.voxelCounts[i] /= downsampleFactor;
if (this.isPeriodic) {
this.voxelCounts[i]++;
this.downsampleRemainders[i]--;
}this.volumetricVectors[i].scale (downsampleFactor);
JU.Logger.info ("downsampling axis " + (i + 1) + " from " + n + " to " + this.voxelCounts[i]);
}
}if (!this.vertexDataOnly) for (var i = 0; i < 3; ++i) {
if (!this.isAngstroms) this.volumetricVectors[i].scale (0.5291772);
this.line = this.voxelCounts[i] + " " + this.volumetricVectors[i].x + " " + this.volumetricVectors[i].y + " " + this.volumetricVectors[i].z;
this.jvxlFileHeaderBuffer.append (this.line).appendC ('\n');
JU.Logger.info ("voxel grid count/vector:" + this.line);
}
this.scaleIsosurface (this.params.scale);
this.volumeData.setVolumetricXml ();
return this.nSurfaces;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error (e.toString ());
return 0;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "skipComments", 
function (allowBlankLines) {
var sb =  new JU.SB ();
while (this.rd () != null && (allowBlankLines && this.line.length == 0 || this.line.indexOf ("#") == 0)) sb.append (this.line).appendC ('\n');

return sb.toString ();
}, "~B");
Clazz.defineMethod (c$, "readVoxelVector", 
function (voxelVectorIndex) {
this.rd ();
var voxelVector = this.volumetricVectors[voxelVectorIndex];
if ((this.voxelCounts[voxelVectorIndex] = this.parseIntStr (this.line)) == -2147483648) this.next[0] = this.line.indexOf (" ");
voxelVector.set (this.parseFloat (), this.parseFloat (), this.parseFloat ());
if (this.isAnisotropic) this.setVectorAnisotropy (voxelVector);
}, "~N");
Clazz.defineMethod (c$, "initializeSurfaceData", 
function () {
this.downsampleFactor = this.params.downsampleFactor;
this.nSkipX = 0;
this.nSkipY = 0;
this.nSkipZ = 0;
if (this.canDownsample && this.downsampleFactor > 0) {
this.nSkipX = this.downsampleFactor - 1;
this.nSkipY = this.downsampleRemainders[2] + (this.downsampleFactor - 1) * (this.nSkipZ = ((this.nPointsZ - (this.isPeriodic ? 1 : 0)) * this.downsampleFactor + this.downsampleRemainders[2]));
this.nSkipZ = this.downsampleRemainders[1] * this.nSkipZ + (this.downsampleFactor - 1) * this.nSkipZ * ((this.nPointsY - (this.isPeriodic ? 1 : 0)) * this.downsampleFactor + this.downsampleRemainders[1]);
}if (this.params.thePlane != null) {
this.params.cutoff = 0;
} else if (this.isJvxl) {
this.params.cutoff = (this.params.isBicolorMap || this.params.colorBySign ? 0.01 : 0.5);
}this.nDataPoints = 0;
this.next[0] = 0;
this.line = "";
this.jvxlNSurfaceInts = 0;
});
Clazz.overrideMethod (c$, "readSurfaceData", 
function (isMapData) {
this.readSurfaceDataVFR (isMapData);
}, "~B");
Clazz.defineMethod (c$, "readSurfaceDataVFR", 
function (isMapData) {
this.initializeSurfaceData ();
if (this.isProgressive && !isMapData || this.isJvxl) {
this.nDataPoints = this.volumeData.setVoxelCounts (this.nPointsX, this.nPointsY, this.nPointsZ);
this.voxelData = null;
if (this.isJvxl) this.jvxlVoxelBitSet = this.getVoxelBitSet (this.nDataPoints);
} else if (isMapData && this.volumeData.hasPlane ()) {
this.volumeData.setVoxelMap ();
var f = this.volumeData.getToPlaneParameter ();
for (var x = 0; x < this.nPointsX; ++x) {
for (var y = 0; y < this.nPointsY; ++y) {
for (var z = 0; z < this.nPointsZ; ++z) {
var v = this.recordData (this.getNextVoxelValue ());
if (this.volumeData.isNearPlane (x, y, z, f)) this.volumeData.setVoxelMapValue (x, y, z, v);
if (this.nSkipX != 0) this.skipVoxels (this.nSkipX);
}
if (this.nSkipY != 0) this.skipVoxels (this.nSkipY);
}
if (this.nSkipZ != 0) this.skipVoxels (this.nSkipZ);
}
} else {
this.voxelData = JU.AU.newFloat3 (this.nPointsX, -1);
for (var x = 0; x < this.nPointsX; ++x) {
var plane = JU.AU.newFloat2 (this.nPointsY);
this.voxelData[x] = plane;
for (var y = 0; y < this.nPointsY; ++y) {
var strip =  Clazz.newFloatArray (this.nPointsZ, 0);
plane[y] = strip;
for (var z = 0; z < this.nPointsZ; ++z) {
strip[z] = this.recordData (this.getNextVoxelValue ());
if (this.nSkipX != 0) this.skipVoxels (this.nSkipX);
}
if (this.nSkipY != 0) this.skipVoxels (this.nSkipY);
}
if (this.nSkipZ != 0) this.skipVoxels (this.nSkipZ);
}
}this.volumeData.setVoxelDataAsArray (this.voxelData);
}, "~B");
Clazz.overrideMethod (c$, "getPlane", 
function (x) {
if (x == 0) this.initPlanes ();
if (this.getNCIPlanes) return this.getPlaneNCI (x);
var plane = this.getPlaneSR (x);
if (this.qpc == null) this.getPlaneVFR (plane, true);
return plane;
}, "~N");
Clazz.defineMethod (c$, "getPlaneNCI", 
function (x) {
var plane;
if (this.iPlaneNCI == 0) {
this.qpc = J.api.Interface.getOption ("quantum.NciCalculation", this.sg.atomDataServer, null);
var atomData =  new J.atomdata.AtomData ();
atomData.modelIndex = -1;
atomData.bsSelected = this.params.bsSelected;
this.sg.fillAtomData (atomData, 1);
(this.qpc).setupCalculation (this.volumeData, this.sg.params.bsSelected, null, null, atomData.atoms, -1, true, null, this.params.parameters, this.params.testFlags);
this.iPlaneNCI = 1;
this.qpc.setPlanes (this.yzPlanesRaw =  Clazz.newFloatArray (4, this.yzCount, 0));
if (this.hasColorData) {
this.getPlaneVFR (this.yzPlanesRaw[0], false);
this.getPlaneVFR (this.yzPlanesRaw[1], false);
plane = this.yzPlanes[0];
for (var i = 0; i < this.yzCount; i++) plane[i] = NaN;

return plane;
}this.iPlaneNCI = -1;
}var nan = this.qpc.getNoValue ();
var x1 = this.nPointsX - 1;
switch (this.iPlaneNCI) {
case -1:
plane = this.yzPlanes[x % 2];
x1++;
break;
case 3:
plane = this.yzPlanesRaw[0];
this.yzPlanesRaw[0] = this.yzPlanesRaw[1];
this.yzPlanesRaw[1] = this.yzPlanesRaw[2];
this.yzPlanesRaw[2] = this.yzPlanesRaw[3];
this.yzPlanesRaw[3] = plane;
plane = this.yzPlanesRaw[this.iPlaneNCI];
break;
default:
this.iPlaneNCI++;
plane = this.yzPlanesRaw[this.iPlaneNCI];
}
if (x < x1) {
this.getPlaneVFR (plane, false);
this.qpc.calcPlane (x, plane = this.yzPlanes[x % 2]);
for (var i = 0; i < this.yzCount; i++) if (plane[i] != nan) this.recordData (plane[i]);

} else {
for (var i = 0; i < this.yzCount; i++) plane[i] = NaN;

}return plane;
}, "~N");
Clazz.defineMethod (c$, "getPlaneVFR", 
 function (plane, doRecord) {
try {
for (var y = 0, ptyz = 0; y < this.nPointsY; ++y) {
for (var z = 0; z < this.nPointsZ; ++z) {
var v = this.getNextVoxelValue ();
if (doRecord) this.recordData (v);
plane[ptyz++] = v;
if (this.nSkipX != 0) this.skipVoxels (this.nSkipX);
}
if (this.nSkipY != 0) this.skipVoxels (this.nSkipY);
}
if (this.nSkipZ != 0) this.skipVoxels (this.nSkipZ);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~A,~B");
Clazz.overrideMethod (c$, "getValue", 
function (x, y, z, ptyz) {
if (this.boundingBox != null) {
this.volumeData.voxelPtToXYZ (x, y, z, this.ptTemp);
if (this.ptTemp.x < this.boundingBox[0].x || this.ptTemp.x > this.boundingBox[1].x || this.ptTemp.y < this.boundingBox[0].y || this.ptTemp.y > this.boundingBox[1].y || this.ptTemp.z < this.boundingBox[0].z || this.ptTemp.z > this.boundingBox[1].z) return NaN;
}return this.getValue2 (x, y, z, ptyz);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "skipVoxels", 
 function (n) {
for (var i = n; --i >= 0; ) this.getNextVoxelValue ();

}, "~N");
Clazz.defineMethod (c$, "getVoxelBitSet", 
function (nPoints) {
return null;
}, "~N");
Clazz.defineMethod (c$, "getNextVoxelValue", 
function () {
var voxelValue = 0;
if (this.nSurfaces > 1 && !this.params.blockCubeData) {
for (var i = 1; i < this.params.fileIndex; i++) this.nextVoxel ();

voxelValue = this.nextVoxel ();
for (var i = this.params.fileIndex; i < this.nSurfaces; i++) this.nextVoxel ();

} else {
voxelValue = this.nextVoxel ();
}return voxelValue;
});
Clazz.defineMethod (c$, "nextVoxel", 
function () {
var voxelValue = this.parseFloat ();
if (Float.isNaN (voxelValue)) {
while (this.rd () != null && Float.isNaN (voxelValue = this.parseFloatStr (this.line))) {
}
if (this.line == null) {
if (!this.endOfData) JU.Logger.warn ("end of file reading cube voxel data? nBytes=" + this.nBytes + " nDataPoints=" + this.nDataPoints + " (line):" + this.line);
this.endOfData = true;
this.line = "0 0 0 0 0 0 0 0 0 0";
}}return voxelValue;
});
Clazz.overrideMethod (c$, "gotoData", 
function (n, nPoints) {
if (!this.params.blockCubeData) return;
if (n > 0) JU.Logger.info ("skipping " + n + " data sets, " + nPoints + " points each");
for (var i = 0; i < n; i++) this.skipData (nPoints);

}, "~N,~N");
Clazz.defineMethod (c$, "skipData", 
function (nPoints) {
this.skipDataVFR (nPoints);
}, "~N");
Clazz.defineMethod (c$, "skipDataVFR", 
function (nPoints) {
var iV = 0;
while (iV < nPoints) iV += this.countData (this.rd ());

}, "~N");
Clazz.defineMethod (c$, "countData", 
 function (str) {
var count = 0;
var ich = 0;
var ichMax = str.length;
var ch;
while (ich < ichMax) {
while (ich < ichMax && ((ch = str.charAt (ich)) == ' ' || ch == '\t')) ++ich;

if (ich < ichMax) ++count;
while (ich < ichMax && ((ch = str.charAt (ich)) != ' ' && ch != '\t')) ++ich;

}
return count;
}, "~S");
c$.checkAtomLine = Clazz.defineMethod (c$, "checkAtomLine", 
function (isXLowToHigh, isAngstroms, strAtomCount, atomLine, bs) {
if (atomLine.indexOf ("ANGSTROMS") >= 0) isAngstroms = true;
var ac = (strAtomCount == null ? 2147483647 : JU.PT.parseInt (strAtomCount));
switch (ac) {
case -2147483648:
ac = 0;
atomLine = " " + atomLine.substring (atomLine.indexOf (" ") + 1);
break;
case 2147483647:
ac = -2147483648;
break;
default:
var s = "" + ac;
atomLine = atomLine.substring (atomLine.indexOf (s) + s.length);
}
if (isAngstroms) {
if (atomLine.indexOf ("ANGSTROM") < 0) atomLine += " ANGSTROMS";
} else {
if (atomLine.indexOf ("BOHR") < 0) atomLine += " BOHR";
}atomLine = (ac == -2147483648 ? "" : (isXLowToHigh ? "+" : "-") + Math.abs (ac)) + atomLine + "\n";
bs.append (atomLine);
return isAngstroms;
}, "~B,~B,~S,~S,JU.SB");
Clazz.overrideMethod (c$, "getSurfacePointAndFraction", 
function (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn) {
return this.getSPFv (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn);
}, "~N,~B,~N,~N,JU.T3,JU.V3,~N,~N,~N,~N,~N,~A,JU.T3");
Clazz.defineMethod (c$, "getSPFv", 
function (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn) {
var zero = this.getSPF (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn);
if (this.qpc == null || Float.isNaN (zero) || !this.hasColorData) return zero;
vA = this.marchingCubes.getLinearOffset (x, y, z, vA);
vB = this.marchingCubes.getLinearOffset (x, y, z, vB);
return this.qpc.process (vA, vB, fReturn[0]);
}, "~N,~B,~N,~N,JU.T3,JU.V3,~N,~N,~N,~N,~N,~A,JU.T3");
Clazz.defineMethod (c$, "scaleIsosurface", 
 function (scale) {
if (this.isScaledAlready) return;
this.isScaledAlready = true;
if (this.isAnisotropic) this.setVolumetricAnisotropy ();
if (Float.isNaN (scale)) return;
JU.Logger.info ("applying scaling factor of " + scale);
this.volumetricOrigin.scaleAdd2 ((1 - scale) / 2, this.volumetricVectors[0], this.volumetricOrigin);
this.volumetricOrigin.scaleAdd2 ((1 - scale) / 2, this.volumetricVectors[1], this.volumetricOrigin);
this.volumetricOrigin.scaleAdd2 ((1 - scale) / 2, this.volumetricVectors[2], this.volumetricOrigin);
this.volumetricVectors[0].scale (scale);
this.volumetricVectors[1].scale (scale);
this.volumetricVectors[2].scale (scale);
}, "~N");
Clazz.defineMethod (c$, "swapXZ", 
function () {
var v = this.volumetricVectors[0];
this.volumetricVectors[0] = this.volumetricVectors[2];
this.volumetricVectors[2] = v;
var n = this.voxelCounts[0];
this.voxelCounts[0] = this.voxelCounts[2];
this.voxelCounts[2] = n;
this.params.insideOut = !this.params.insideOut;
});
});
