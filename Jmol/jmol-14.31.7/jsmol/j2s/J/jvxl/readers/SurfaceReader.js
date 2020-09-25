Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.api.VertexDataServer", "JU.P3"], "J.jvxl.readers.SurfaceReader", ["java.lang.Float", "JU.AU", "$.BS", "J.jvxl.calc.MarchingCubes", "$.MarchingSquares", "J.jvxl.data.JvxlCoder", "$.MeshData", "JU.BoxInfo", "$.C", "$.ColorEncoder", "$.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sg = null;
this.meshDataServer = null;
this.params = null;
this.meshData = null;
this.jvxlData = null;
this.volumeData = null;
this.edgeData = null;
this.haveSurfaceAtoms = false;
this.allowSigma = false;
this.isProgressive = false;
this.isXLowToHigh = false;
this.assocCutoff = 0.3;
this.isQuiet = false;
this.isPeriodic = false;
this.vertexDataOnly = false;
this.hasColorData = false;
this.dataMin = 3.4028235E38;
this.dataMax = -3.4028235E38;
this.dataMean = 0;
this.xyzMin = null;
this.xyzMax = null;
this.center = null;
this.anisotropy = null;
this.isAnisotropic = false;
this.eccentricityMatrix = null;
this.eccentricityMatrixInverse = null;
this.isEccentric = false;
this.eccentricityScale = 0;
this.eccentricityRatio = 0;
this.edgeCount = 0;
this.volumetricOrigin = null;
this.volumetricVectors = null;
this.voxelCounts = null;
this.voxelData = null;
this.nBytes = 0;
this.nDataPoints = 0;
this.nPointsX = 0;
this.nPointsY = 0;
this.nPointsZ = 0;
this.isJvxl = false;
this.edgeFractionBase = 0;
this.edgeFractionRange = 0;
this.colorFractionBase = 0;
this.colorFractionRange = 0;
this.jvxlFileHeaderBuffer = null;
this.fractionData = null;
this.jvxlEdgeDataRead = "";
this.jvxlColorDataRead = "";
this.jvxlVoxelBitSet = null;
this.jvxlDataIsColorMapped = false;
this.jvxlDataIsPrecisionColor = false;
this.jvxlDataIs2dContour = false;
this.jvxlDataIsColorDensity = false;
this.jvxlCutoff = 0;
this.jvxlNSurfaceInts = 0;
this.cJvxlEdgeNaN = '\0';
this.contourVertexCount = 0;
this.marchingSquares = null;
this.marchingCubes = null;
this.yzPlanes = null;
this.yzCount = 0;
this.qpc = null;
this.ptTemp = null;
this.minMax = null;
this.haveSetAnisotropy = false;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "SurfaceReader", null, J.jvxl.api.VertexDataServer);
Clazz.prepareFields (c$, function () {
this.ptTemp =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "initSR", 
function (sg) {
this.sg = sg;
this.params = sg.params;
this.assocCutoff = this.params.assocCutoff;
this.isXLowToHigh = this.params.isXLowToHigh;
this.center = this.params.center;
this.anisotropy = this.params.anisotropy;
this.isAnisotropic = this.params.isAnisotropic;
this.eccentricityMatrix = this.params.eccentricityMatrix;
this.eccentricityMatrixInverse = this.params.eccentricityMatrixInverse;
this.isEccentric = this.params.isEccentric;
this.eccentricityScale = this.params.eccentricityScale;
this.eccentricityRatio = this.params.eccentricityRatio;
this.marchingSquares = sg.marchingSquares;
this.meshData = sg.meshData;
this.jvxlData = sg.jvxlData;
this.setVolumeDataV (sg.volumeDataTemp);
this.meshDataServer = sg.meshDataServer;
this.cJvxlEdgeNaN = String.fromCharCode (125);
}, "J.jvxl.readers.SurfaceGenerator");
Clazz.defineMethod (c$, "setOutputChannel", 
function (out) {
}, "JU.OC");
Clazz.defineMethod (c$, "newVoxelDataCube", 
function () {
this.volumeData.setVoxelDataAsArray (this.voxelData =  Clazz.newFloatArray (this.nPointsX, this.nPointsY, this.nPointsZ, 0));
});
Clazz.defineMethod (c$, "setVolumeDataV", 
function (v) {
this.nBytes = 0;
this.volumetricOrigin = v.volumetricOrigin;
this.volumetricVectors = v.volumetricVectors;
this.voxelCounts = v.voxelCounts;
this.voxelData = v.getVoxelData ();
this.volumeData = v;
}, "J.jvxl.data.VolumeData");
Clazz.defineMethod (c$, "jvxlUpdateInfo", 
function () {
this.jvxlData.jvxlUpdateInfo (this.params.title, this.nBytes);
});
Clazz.defineMethod (c$, "readAndSetVolumeParameters", 
function (isMapData) {
if (!this.readVolumeParameters (isMapData)) return false;
if (this.vertexDataOnly) return true;
return (this.volumeData.setUnitVectors ());
}, "~B");
Clazz.defineMethod (c$, "createIsosurface", 
function (justForPlane) {
this.resetIsosurface ();
if (this.params.showTiming) JU.Logger.startTimer ("isosurface creation");
this.jvxlData.cutoff = NaN;
if (!this.readAndSetVolumeParameters (justForPlane)) return false;
if (!justForPlane && !Float.isNaN (this.params.sigma) && !this.allowSigma) {
if (this.params.sigma > 0) JU.Logger.error ("Reader does not support SIGMA option -- using cutoff 1.6");
this.params.cutoff = 1.6;
}if (this.params.sigma < 0) this.params.sigma = -this.params.sigma;
this.nPointsX = this.voxelCounts[0];
this.nPointsY = this.voxelCounts[1];
this.nPointsZ = this.voxelCounts[2];
this.jvxlData.isSlabbable = ((this.params.dataType & 1024) != 0);
this.jvxlData.insideOut = this.params.isInsideOut ();
this.jvxlData.isBicolorMap = this.params.isBicolorMap;
this.jvxlData.nPointsX = this.nPointsX;
this.jvxlData.nPointsY = this.nPointsY;
this.jvxlData.nPointsZ = this.nPointsZ;
this.jvxlData.jvxlVolumeDataXml = this.volumeData.xmlData;
this.jvxlData.voxelVolume = this.volumeData.voxelVolume;
if (justForPlane) {
this.volumeData.setMappingPlane (this.params.thePlane);
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.params.setMapRanges (this, false);
this.generateSurfaceData ();
this.volumeData.setMappingPlane (null);
} else {
if (!this.readVolumeData (false)) return false;
this.generateSurfaceData ();
}if (this.jvxlFileHeaderBuffer == null) {
this.jvxlData.jvxlFileTitle = "";
} else {
var s = this.jvxlFileHeaderBuffer.toString ();
var i = s.indexOf ('\n', s.indexOf ('\n', s.indexOf ('\n') + 1) + 1) + 1;
this.jvxlData.jvxlFileTitle = s.substring (0, i);
}if (this.params.contactPair == null) this.setBBoxAll ();
this.jvxlData.isValid = (this.xyzMin.x != 3.4028235E38);
if (!this.params.isSilent) {
if (!this.jvxlData.isValid) JU.Logger.error ("no isosurface points were found!");
 else JU.Logger.info ("boundbox corners " + JU.Escape.eP (this.xyzMin) + " " + JU.Escape.eP (this.xyzMax));
}this.jvxlData.boundingBox =  Clazz.newArray (-1, [this.xyzMin, this.xyzMax]);
this.jvxlData.dataMin = this.dataMin;
this.jvxlData.dataMax = this.dataMax;
this.jvxlData.cutoff = (this.isJvxl ? this.jvxlCutoff : this.params.cutoff);
this.jvxlData.isCutoffAbsolute = this.params.isCutoffAbsolute;
this.jvxlData.isModelConnected = this.params.isModelConnected;
this.jvxlData.pointsPerAngstrom = 1 / this.volumeData.volumetricVectorLengths[0];
this.jvxlData.jvxlColorData = "";
this.jvxlData.jvxlPlane = this.params.thePlane;
this.jvxlData.jvxlEdgeData = this.edgeData;
this.jvxlData.isBicolorMap = this.params.isBicolorMap;
this.jvxlData.isContoured = this.params.isContoured;
this.jvxlData.colorDensity = this.params.colorDensity;
this.jvxlData.pointSize = this.params.pointSize;
if (this.jvxlData.vContours != null) this.params.nContours = this.jvxlData.vContours.length;
this.jvxlData.nContours = (this.params.contourFromZero ? this.params.nContours : -1 - this.params.nContours);
this.jvxlData.thisContour = this.params.thisContour;
this.jvxlData.nEdges = this.edgeCount;
this.jvxlData.edgeFractionBase = this.edgeFractionBase;
this.jvxlData.edgeFractionRange = this.edgeFractionRange;
this.jvxlData.colorFractionBase = this.colorFractionBase;
this.jvxlData.colorFractionRange = this.colorFractionRange;
this.jvxlData.jvxlDataIs2dContour = this.jvxlDataIs2dContour;
this.jvxlData.jvxlDataIsColorMapped = this.jvxlDataIsColorMapped;
this.jvxlData.jvxlDataIsColorDensity = this.jvxlDataIsColorDensity;
this.jvxlData.isXLowToHigh = this.isXLowToHigh;
this.jvxlData.vertexDataOnly = this.vertexDataOnly;
this.jvxlData.saveVertexCount = 0;
if (this.jvxlDataIsColorMapped || this.jvxlData.nVertexColors > 0) {
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshDataServer.fillMeshData (this.meshData, 2, null);
}this.jvxlData.jvxlColorData = this.readColorData ();
this.updateSurfaceData ();
if (this.meshDataServer != null) this.meshDataServer.notifySurfaceMappingCompleted ();
}if (this.params.showTiming) JU.Logger.checkTimer ("isosurface creation", false);
return true;
}, "~B");
Clazz.defineMethod (c$, "resetIsosurface", 
function () {
this.meshData =  new J.jvxl.data.MeshData ();
this.xyzMin = this.xyzMax = null;
this.jvxlData.isBicolorMap = this.params.isBicolorMap;
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (null, 0, null);
this.contourVertexCount = 0;
if (this.params.cutoff == 3.4028235E38) this.params.cutoff = 0.02;
this.jvxlData.jvxlSurfaceData = "";
this.jvxlData.jvxlEdgeData = "";
this.jvxlData.jvxlColorData = "";
this.edgeCount = 0;
this.edgeFractionBase = 35;
this.edgeFractionRange = 90;
this.colorFractionBase = 35;
this.colorFractionRange = 90;
this.params.mappedDataMin = 3.4028235E38;
});
Clazz.defineMethod (c$, "discardTempData", 
function (discardAll) {
this.discardTempDataSR (discardAll);
}, "~B");
Clazz.defineMethod (c$, "discardTempDataSR", 
function (discardAll) {
if (!discardAll) return;
this.voxelData = null;
this.sg.marchingSquares = this.marchingSquares = null;
this.marchingCubes = null;
}, "~B");
Clazz.defineMethod (c$, "initializeVolumetricData", 
function () {
this.nPointsX = this.voxelCounts[0];
this.nPointsY = this.voxelCounts[1];
this.nPointsZ = this.voxelCounts[2];
this.setVolumeDataV (this.volumeData);
});
Clazz.defineMethod (c$, "gotoAndReadVoxelData", 
function (isMapData) {
this.initializeVolumetricData ();
if (this.nPointsX > 0 && this.nPointsY > 0 && this.nPointsZ > 0) try {
this.gotoData (this.params.fileIndex - 1, this.nPointsX * this.nPointsY * this.nPointsZ);
this.readSurfaceData (isMapData);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error (e.toString ());
return false;
} else {
throw e;
}
}
return true;
}, "~B");
Clazz.defineMethod (c$, "gotoData", 
function (n, nPoints) {
}, "~N,~N");
Clazz.defineMethod (c$, "readColorData", 
function () {
if (this.jvxlData.vertexColors == null) return "";
var vertexCount = this.jvxlData.vertexCount;
var colixes = this.meshData.vcs;
var vertexValues = this.meshData.vvs;
if (colixes == null || colixes.length < vertexCount) this.meshData.vcs = colixes =  Clazz.newShortArray (vertexCount, 0);
if (vertexValues == null || vertexValues.length < vertexCount) this.meshData.vvs = vertexValues =  Clazz.newFloatArray (vertexCount, 0);
for (var i = 0; i < vertexCount; i++) colixes[i] = JU.C.getColix (this.jvxlData.vertexColors[i]);

return "-";
});
Clazz.overrideMethod (c$, "getPlane", 
function (x) {
return this.getPlaneSR (x);
}, "~N");
Clazz.defineMethod (c$, "getPlaneSR", 
function (x) {
if (this.yzCount == 0) this.initPlanes ();
if (this.qpc != null) this.qpc.getPlane (x, this.yzPlanes[x % 2]);
return this.yzPlanes[x % 2];
}, "~N");
Clazz.defineMethod (c$, "initPlanes", 
function () {
this.yzCount = this.nPointsY * this.nPointsZ;
if (!this.isQuiet) JU.Logger.info ("reading data progressively -- yzCount = " + this.yzCount);
this.yzPlanes = JU.AU.newFloat2 (2);
this.yzPlanes[0] =  Clazz.newFloatArray (this.yzCount, 0);
this.yzPlanes[1] =  Clazz.newFloatArray (this.yzCount, 0);
});
Clazz.overrideMethod (c$, "getValue", 
function (x, y, z, ptyz) {
return this.getValue2 (x, y, z, ptyz);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getValue2", 
function (x, y, z, ptyz) {
return (this.yzPlanes == null ? this.voxelData[x][y][z] : this.yzPlanes[x % 2][ptyz]);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "generateSurfaceData", 
 function () {
this.edgeData = "";
if (this.vertexDataOnly) {
try {
this.readSurfaceData (false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
JU.Logger.error ("Exception in SurfaceReader::readSurfaceData: " + e.toString ());
} else {
throw e;
}
}
return;
}this.contourVertexCount = 0;
var contourType = -1;
this.marchingSquares = null;
if (this.params.thePlane != null || this.params.isContoured) {
this.marchingSquares =  new J.jvxl.calc.MarchingSquares (this, this.volumeData, this.params.thePlane, this.params.contoursDiscrete, this.params.nContours, this.params.thisContour, this.params.contourFromZero);
contourType = this.marchingSquares.contourType;
this.marchingSquares.setMinMax (this.params.valueMappedToRed, this.params.valueMappedToBlue);
}this.params.contourType = contourType;
this.params.isXLowToHigh = this.isXLowToHigh;
this.marchingCubes =  new J.jvxl.calc.MarchingCubes (this, this.volumeData, this.params, this.jvxlVoxelBitSet);
var data = this.marchingCubes.getEdgeData ();
if (this.params.thePlane == null) this.edgeData = data;
this.jvxlData.setSurfaceInfoFromBitSetPts (this.marchingCubes.bsVoxels, this.params.thePlane, this.params.mapLattice);
this.jvxlData.jvxlExcluded = this.params.bsExcluded;
if (this.isJvxl) this.edgeData = this.jvxlEdgeDataRead;
this.postProcessVertices ();
});
Clazz.defineMethod (c$, "postProcessVertices", 
function () {
});
Clazz.overrideMethod (c$, "getSurfacePointIndexAndFraction", 
function (cutoff, isCutoffAbsolute, x, y, z, offset, vA, vB, valueA, valueB, pointA, edgeVector, isContourType, fReturn) {
var thisValue = this.getSurfacePointAndFraction (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, this.ptTemp);
if (this.marchingSquares != null && this.params.isContoured) return this.marchingSquares.addContourVertex (this.ptTemp, cutoff);
var assocVertex = (this.assocCutoff > 0 ? (fReturn[0] < this.assocCutoff ? vA : fReturn[0] > 1 - this.assocCutoff ? vB : -1) : -1);
if (assocVertex >= 0) assocVertex = this.marchingCubes.getLinearOffset (x, y, z, assocVertex);
var n = this.addVertexCopy (this.ptTemp, thisValue, assocVertex, true);
if (n >= 0 && this.params.iAddGridPoints) {
this.marchingCubes.calcVertexPoint (x, y, z, vB, this.ptTemp);
this.addVertexCopy (valueA < valueB ? pointA : this.ptTemp, Math.min (valueA, valueB), -3, true);
this.addVertexCopy (valueA < valueB ? this.ptTemp : pointA, Math.max (valueA, valueB), -3, true);
}return n;
}, "~N,~B,~N,~N,~N,JU.P3i,~N,~N,~N,~N,JU.T3,JU.V3,~B,~A");
Clazz.defineMethod (c$, "getSurfacePointAndFraction", 
function (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn) {
return this.getSPF (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn);
}, "~N,~B,~N,~N,JU.T3,JU.V3,~N,~N,~N,~N,~N,~A,JU.T3");
Clazz.defineMethod (c$, "getSPF", 
function (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn) {
var diff = valueB - valueA;
var fraction = (cutoff - valueA) / diff;
if (isCutoffAbsolute && (fraction < 0 || fraction > 1)) fraction = (-cutoff - valueA) / diff;
if (fraction < 0 || fraction > 1) {
fraction = NaN;
}fReturn[0] = fraction;
ptReturn.scaleAdd2 (fraction, edgeVector, pointA);
return valueA + fraction * diff;
}, "~N,~B,~N,~N,JU.T3,JU.V3,~N,~N,~N,~N,~N,~A,JU.T3");
Clazz.defineMethod (c$, "addVertexCopy", 
function (vertexXYZ, value, assocVertex, asCopy) {
return this.addVC (vertexXYZ, value, assocVertex, asCopy);
}, "JU.T3,~N,~N,~B");
Clazz.defineMethod (c$, "addVC", 
function (vertexXYZ, value, assocVertex, asCopy) {
return (Float.isNaN (value) && assocVertex != -3 ? -1 : this.meshDataServer == null ? this.meshData.addVertexCopy (vertexXYZ, value, assocVertex, asCopy) : this.meshDataServer.addVertexCopy (vertexXYZ, value, assocVertex, asCopy));
}, "JU.T3,~N,~N,~B");
Clazz.defineMethod (c$, "addTriangleCheck", 
function (iA, iB, iC, check, iContour, isAbsolute, color) {
if (this.marchingSquares != null && this.params.isContoured) {
if (color == 0) return this.marchingSquares.addTriangle (iA, iB, iC, check, iContour);
color = 0;
}return (this.meshDataServer != null ? this.meshDataServer.addTriangleCheck (iA, iB, iC, check, iContour, isAbsolute, color) : isAbsolute && !J.jvxl.data.MeshData.checkCutoff (iA, iB, iC, this.meshData.vvs) ? -1 : this.meshData.addTriangleCheck (iA, iB, iC, check, iContour, color));
}, "~N,~N,~N,~N,~N,~B,~N");
Clazz.defineMethod (c$, "colorIsosurface", 
function () {
if (this.params.isSquared && this.volumeData != null) this.volumeData.filterData (true, NaN);
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 1, null);
}this.jvxlData.saveVertexCount = 0;
if (this.params.isContoured && this.marchingSquares != null) {
this.initializeMapping ();
this.params.setMapRanges (this, false);
this.marchingSquares.setMinMax (this.params.valueMappedToRed, this.params.valueMappedToBlue);
this.jvxlData.saveVertexCount = this.marchingSquares.contourVertexCount;
this.contourVertexCount = this.marchingSquares.generateContourData (this.jvxlDataIs2dContour, (this.params.isSquared ? 1e-8 : 1e-4));
this.jvxlData.contourValuesUsed = this.marchingSquares.contourValuesUsed;
this.minMax = this.marchingSquares.getMinMax ();
if (this.meshDataServer != null) this.meshDataServer.notifySurfaceGenerationCompleted ();
this.finalizeMapping ();
}this.applyColorScale ();
this.jvxlData.nContours = (this.params.contourFromZero ? this.params.nContours : -1 - this.params.nContours);
this.jvxlData.thisContour = this.params.thisContour;
this.jvxlData.jvxlFileMessage = "mapped: min = " + this.params.valueMappedToRed + "; max = " + this.params.valueMappedToBlue;
});
Clazz.defineMethod (c$, "applyColorScale", 
function () {
this.colorFractionBase = this.jvxlData.colorFractionBase = 35;
this.colorFractionRange = this.jvxlData.colorFractionRange = 90;
if (this.params.colorPhase == 0) this.params.colorPhase = 1;
if (this.meshDataServer == null) {
this.meshData.vcs =  Clazz.newShortArray (this.meshData.vc, 0);
} else {
this.meshDataServer.fillMeshData (this.meshData, 1, null);
if (this.params.contactPair == null) this.meshDataServer.fillMeshData (this.meshData, 2, null);
}var saveColorData = (this.params.colorDensity || this.params.isBicolorMap || this.params.colorBySign || !this.params.colorByPhase);
if (this.params.contactPair != null) saveColorData = false;
this.jvxlData.isJvxlPrecisionColor = true;
this.jvxlData.vertexCount = (this.contourVertexCount > 0 ? this.contourVertexCount : this.meshData.vc);
this.jvxlData.minColorIndex = -1;
this.jvxlData.maxColorIndex = 0;
this.jvxlData.contourValues = this.params.contoursDiscrete;
this.jvxlData.isColorReversed = this.params.isColorReversed;
if (!this.params.colorDensity) if (this.params.isBicolorMap && !this.params.isContoured || this.params.colorBySign) {
this.jvxlData.minColorIndex = JU.C.getColixTranslucent3 (JU.C.getColix (this.params.isColorReversed ? this.params.colorPos : this.params.colorNeg), this.jvxlData.translucency != 0, this.jvxlData.translucency);
this.jvxlData.maxColorIndex = JU.C.getColixTranslucent3 (JU.C.getColix (this.params.isColorReversed ? this.params.colorNeg : this.params.colorPos), this.jvxlData.translucency != 0, this.jvxlData.translucency);
}this.jvxlData.isTruncated = (this.jvxlData.minColorIndex >= 0 && !this.params.isContoured);
var useMeshDataValues = this.jvxlDataIs2dContour || this.hasColorData || this.vertexDataOnly || this.params.colorDensity || this.params.isBicolorMap && !this.params.isContoured;
if (!useMeshDataValues) {
if (this.haveSurfaceAtoms && this.meshData.vertexSource == null) this.meshData.vertexSource =  Clazz.newIntArray (this.meshData.vc, 0);
var min = 3.4028235E38;
var max = -3.4028235E38;
var value;
this.initializeMapping ();
for (var i = this.meshData.vc; --i >= this.meshData.mergeVertexCount0; ) {
if (this.params.colorBySets) {
value = this.meshData.vertexSets[i];
} else if (this.params.colorByPhase) {
value = this.getPhase (this.meshData.vs[i]);
} else {
var needSource = this.haveSurfaceAtoms;
value = this.volumeData.lookupInterpolatedVoxelValue (this.meshData.vs[i], needSource);
if (needSource) this.meshData.vertexSource[i] = this.getSurfaceAtomIndex ();
}if (value < min) min = value;
if (value > max && value != 3.4028235E38) max = value;
this.meshData.vvs[i] = value;
}
if (this.params.rangeSelected && this.minMax == null) this.minMax =  Clazz.newFloatArray (-1, [min, max]);
this.finalizeMapping ();
}this.params.setMapRanges (this, true);
this.jvxlData.mappedDataMin = this.params.mappedDataMin;
this.jvxlData.mappedDataMax = this.params.mappedDataMax;
this.jvxlData.valueMappedToRed = this.params.valueMappedToRed;
this.jvxlData.valueMappedToBlue = this.params.valueMappedToBlue;
if (this.params.contactPair == null && this.jvxlData.vertexColors == null) this.colorData ();
J.jvxl.data.JvxlCoder.jvxlCreateColorData (this.jvxlData, (saveColorData ? this.meshData.vvs : null));
if (this.haveSurfaceAtoms && this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 4, null);
if (this.meshDataServer != null && this.params.colorBySets) this.meshDataServer.fillMeshData (this.meshData, 3, null);
});
Clazz.defineMethod (c$, "colorData", 
 function () {
var vertexValues = this.meshData.vvs;
var vertexColixes = this.meshData.vcs;
this.meshData.pcs = null;
var valueBlue = this.jvxlData.valueMappedToBlue;
var valueRed = this.jvxlData.valueMappedToRed;
var minColorIndex = this.jvxlData.minColorIndex;
var maxColorIndex = this.jvxlData.maxColorIndex;
if (this.params.colorEncoder == null) this.params.colorEncoder =  new JU.ColorEncoder (null, null);
this.params.colorEncoder.setRange (this.params.valueMappedToRed, this.params.valueMappedToBlue, this.params.isColorReversed);
for (var i = this.meshData.vc; --i >= 0; ) {
var value = vertexValues[i];
if (minColorIndex >= 0) {
if (value <= 0) vertexColixes[i] = minColorIndex;
 else if (value > 0) vertexColixes[i] = maxColorIndex;
} else {
if (value <= valueRed) value = valueRed;
if (value >= valueBlue) value = valueBlue;
vertexColixes[i] = this.params.colorEncoder.getColorIndex (value);
}}
if ((this.params.nContours > 0 || this.jvxlData.contourValues != null) && this.jvxlData.contourColixes == null) {
var n = (this.jvxlData.contourValues == null ? this.params.nContours : this.jvxlData.contourValues.length);
var colors = this.jvxlData.contourColixes =  Clazz.newShortArray (n, 0);
var values = this.jvxlData.contourValues;
if (values == null) values = this.jvxlData.contourValuesUsed;
if (this.jvxlData.contourValuesUsed == null) this.jvxlData.contourValuesUsed = (values == null ?  Clazz.newFloatArray (n, 0) : values);
var dv = (valueBlue - valueRed) / (n + 1);
this.params.colorEncoder.setRange (this.params.valueMappedToRed, this.params.valueMappedToBlue, this.params.isColorReversed);
for (var i = 0; i < n; i++) {
var v = (values == null ? valueRed + (i + 1) * dv : values[i]);
this.jvxlData.contourValuesUsed[i] = v;
colors[i] = JU.C.getColixTranslucent (this.params.colorEncoder.getArgb (v));
}
this.jvxlData.contourColors = JU.C.getHexCodes (colors);
}});
c$.getColorPhaseIndex = Clazz.defineMethod (c$, "getColorPhaseIndex", 
function (color) {
var colorPhase = -1;
for (var i = 0; i < J.jvxl.readers.SurfaceReader.colorPhases.length; i++) if (color.equalsIgnoreCase (J.jvxl.readers.SurfaceReader.colorPhases[i])) {
colorPhase = i;
break;
}
return colorPhase;
}, "~S");
Clazz.defineMethod (c$, "getPhase", 
 function (pt) {
switch (this.params.colorPhase) {
case 0:
case -1:
case 1:
return (pt.x > 0 ? 1 : -1);
case 2:
return (pt.y > 0 ? 1 : -1);
case 3:
return (pt.z > 0 ? 1 : -1);
case 4:
return (pt.x * pt.y > 0 ? 1 : -1);
case 5:
return (pt.y * pt.z > 0 ? 1 : -1);
case 6:
return (pt.x * pt.z > 0 ? 1 : -1);
case 7:
return (pt.x * pt.x - pt.y * pt.y > 0 ? 1 : -1);
case 8:
return (pt.z * pt.z * 2 - pt.x * pt.x - pt.y * pt.y > 0 ? 1 : -1);
}
return 1;
}, "JU.T3");
Clazz.defineMethod (c$, "getMinMaxMappedValues", 
function (haveData) {
if (this.minMax != null && this.minMax[0] != 3.4028235E38) return this.minMax;
if (this.params.colorBySets) return (this.minMax =  Clazz.newFloatArray (-1, [0, Math.max (this.meshData.nSets - 1, 0)]));
var min = 3.4028235E38;
var max = -3.4028235E38;
if (this.params.usePropertyForColorRange && this.params.theProperty != null) {
for (var i = this.params.theProperty.length; --i >= 0; ) {
if (this.params.rangeSelected && !this.params.bsSelected.get (i)) continue;
var p = this.params.theProperty[i];
if (Float.isNaN (p)) continue;
if (p < min) min = p;
if (p > max) max = p;
}
return (this.minMax =  Clazz.newFloatArray (-1, [min, max]));
}var vertexCount = (this.contourVertexCount > 0 ? this.contourVertexCount : this.meshData.vc);
var vertexes = this.meshData.vs;
var useVertexValue = (haveData || this.jvxlDataIs2dContour || this.vertexDataOnly || this.params.colorDensity);
for (var i = this.meshData.mergeVertexCount0; i < vertexCount; i++) {
var v;
if (useVertexValue) v = this.meshData.vvs[i];
 else v = this.volumeData.lookupInterpolatedVoxelValue (vertexes[i], false);
if (v < min) min = v;
if (v > max && v != 3.4028235E38) max = v;
}
return (this.minMax =  Clazz.newFloatArray (-1, [min, max]));
}, "~B");
Clazz.defineMethod (c$, "updateTriangles", 
function () {
if (this.meshDataServer == null) {
this.meshData.invalidatePolygons ();
} else {
this.meshDataServer.invalidateTriangles ();
}});
Clazz.defineMethod (c$, "updateSurfaceData", 
function () {
this.meshData.setVertexSets (true);
this.updateTriangles ();
if (this.params.bsExcluded[1] == null) this.params.bsExcluded[1] =  new JU.BS ();
this.meshData.updateInvalidatedVertices (this.params.bsExcluded[1]);
});
Clazz.defineMethod (c$, "selectPocket", 
function (doExclude) {
}, "~B");
Clazz.defineMethod (c$, "excludeMinimumSet", 
function () {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.getSurfaceSet ();
var bs;
for (var i = this.meshData.nSets; --i >= 0; ) if ((bs = this.meshData.surfaceSet[i]) != null && bs.cardinality () < this.params.minSet) this.meshData.invalidateSurfaceSet (i);

this.updateSurfaceData ();
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 3, null);
});
Clazz.defineMethod (c$, "excludeMaximumSet", 
function () {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.getSurfaceSet ();
var bs;
for (var i = this.meshData.nSets; --i >= 0; ) if ((bs = this.meshData.surfaceSet[i]) != null && bs.cardinality () > this.params.maxSet) this.meshData.invalidateSurfaceSet (i);

this.updateSurfaceData ();
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 3, null);
});
Clazz.defineMethod (c$, "slabIsosurface", 
function (slabInfo) {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.slabPolygonsList (slabInfo, true);
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 4, null);
}, "JU.Lst");
Clazz.defineMethod (c$, "setVertexAnisotropy", 
function (pt) {
pt.x *= this.anisotropy[0];
pt.y *= this.anisotropy[1];
pt.z *= this.anisotropy[2];
pt.add (this.center);
}, "JU.T3");
Clazz.defineMethod (c$, "setVectorAnisotropy", 
function (v) {
this.haveSetAnisotropy = true;
v.x *= this.anisotropy[0];
v.y *= this.anisotropy[1];
v.z *= this.anisotropy[2];
}, "JU.T3");
Clazz.defineMethod (c$, "setVolumetricAnisotropy", 
function () {
if (this.haveSetAnisotropy) return;
this.setVolumetricOriginAnisotropy ();
this.setVectorAnisotropy (this.volumetricVectors[0]);
this.setVectorAnisotropy (this.volumetricVectors[1]);
this.setVectorAnisotropy (this.volumetricVectors[2]);
});
Clazz.defineMethod (c$, "setVolumetricOriginAnisotropy", 
function () {
this.volumetricOrigin.setT (this.center);
});
Clazz.defineMethod (c$, "setBBoxAll", 
 function () {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.xyzMin =  new JU.P3 ();
this.xyzMax =  new JU.P3 ();
this.meshData.setBox (this.xyzMin, this.xyzMax);
});
Clazz.defineMethod (c$, "setBBox", 
function (pt, margin) {
if (this.xyzMin == null) {
this.xyzMin = JU.P3.new3 (3.4028235E38, 3.4028235E38, 3.4028235E38);
this.xyzMax = JU.P3.new3 (-3.4028235E38, -3.4028235E38, -3.4028235E38);
}JU.BoxInfo.addPoint (pt, this.xyzMin, this.xyzMax, margin);
}, "JU.T3,~N");
Clazz.defineMethod (c$, "getValueAtPoint", 
function (pt, getSource) {
return 0;
}, "JU.T3,~B");
Clazz.defineMethod (c$, "initializeMapping", 
function () {
});
Clazz.defineMethod (c$, "finalizeMapping", 
function () {
});
Clazz.defineMethod (c$, "getSurfaceAtomIndex", 
function () {
return -1;
});
Clazz.defineStatics (c$,
"ANGSTROMS_PER_BOHR", 0.5291772,
"defaultMappedDataMin", 0,
"defaultMappedDataMax", 1.0,
"defaultCutoff", 0.02,
"colorPhases",  Clazz.newArray (-1, ["_orb", "x", "y", "z", "xy", "yz", "xz", "x2-y2", "z2"]));
});
