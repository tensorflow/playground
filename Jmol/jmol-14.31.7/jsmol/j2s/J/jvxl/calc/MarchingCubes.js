Clazz.declarePackage ("J.jvxl.calc");
Clazz.load (["JU.TriangleData", "JU.BS", "$.P3", "$.SB", "$.V3"], "J.jvxl.calc.MarchingCubes", ["java.lang.Float", "J.jvxl.data.JvxlCoder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.surfaceReader = null;
this.volumeData = null;
this.contourType = 0;
this.isContoured = false;
this.cutoff = 0;
this.isCutoffAbsolute = false;
this.isSquared = false;
this.isXLowToHigh = false;
this.cubeCountX = 0;
this.cubeCountY = 0;
this.cubeCountZ = 0;
this.nY = 0;
this.nZ = 0;
this.yzCount = 0;
this.colorDensity = false;
this.integrateSquared = true;
this.bsVoxels = null;
this.bsExcludedVertices = null;
this.bsExcludedTriangles = null;
this.bsExcludedPlanes = null;
this.edgeData = null;
this.excludePartialCubes = true;
this.mode = 0;
this.vertexValues = null;
this.edgeCount = 0;
this.voxelVertexVectors = null;
this.edgeVectors = null;
this.edgePointIndexes = null;
this.isoPointIndexPlanes = null;
this.yzPlanes = null;
this.mappingPlane = null;
this.allInside = false;
this.$isInside = false;
this.offset = null;
this.voxelData = null;
this.nTriangles = 0;
this.bsValues = null;
this.pt0 = null;
this.pointA = null;
this.edgeVertexPointers = null;
this.edgeVertexPlanes = null;
this.fReturn = null;
this.linearOffsets = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.calc, "MarchingCubes", JU.TriangleData);
Clazz.prepareFields (c$, function () {
this.edgeData =  new JU.SB ();
this.vertexValues =  Clazz.newFloatArray (8, 0);
this.voxelVertexVectors =  new Array (8);
this.edgeVectors =  new Array (12);
{
for (var i = 12; --i >= 0; ) this.edgeVectors[i] =  new JU.V3 ();

}this.edgePointIndexes =  Clazz.newIntArray (12, 0);
this.bsValues =  new JU.BS ();
this.pt0 =  new JU.P3 ();
this.pointA =  new JU.P3 ();
this.fReturn =  Clazz.newFloatArray (1, 0);
this.linearOffsets =  Clazz.newIntArray (8, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.calc.MarchingCubes, []);
});
Clazz.makeConstructor (c$, 
function (surfaceReader, volumeData, params, bsVoxels) {
Clazz.superConstructor (this, J.jvxl.calc.MarchingCubes, []);
this.excludePartialCubes = true;
this.surfaceReader = surfaceReader;
this.bsVoxels = bsVoxels;
var bsExcluded = params.bsExcluded;
this.bsExcludedVertices = (bsExcluded[0] == null ? bsExcluded[0] =  new JU.BS () : bsExcluded[0]);
this.bsExcludedPlanes = (bsExcluded[2] == null ? bsExcluded[2] =  new JU.BS () : bsExcluded[2]);
this.bsExcludedTriangles = (bsExcluded[3] == null ? bsExcluded[3] =  new JU.BS () : bsExcluded[3]);
this.mode = (volumeData.getVoxelData () != null || volumeData.mappingPlane != null ? 1 : bsVoxels != null ? 2 : 3);
this.setParameters (volumeData, params);
}, "J.jvxl.api.VertexDataServer,J.jvxl.data.VolumeData,J.jvxl.readers.Parameters,JU.BS");
Clazz.defineMethod (c$, "setParameters", 
function (volumeData, params) {
this.volumeData = volumeData;
this.colorDensity = params.colorDensity;
this.isContoured = params.thePlane == null && params.isContoured && !this.colorDensity;
this.cutoff = params.cutoff;
this.isCutoffAbsolute = params.isCutoffAbsolute;
this.contourType = params.contourType;
this.isSquared = params.isSquared;
this.isXLowToHigh = params.isXLowToHigh;
this.cubeCountX = volumeData.voxelCounts[0] - 1;
this.cubeCountY = volumeData.voxelCounts[1] - 1;
this.cubeCountZ = volumeData.voxelCounts[2] - 1;
volumeData.getYzCount ();
if (params.mapLattice != null) {
this.cubeCountX *= Math.abs (params.mapLattice.x);
this.cubeCountY *= Math.abs (params.mapLattice.y);
this.cubeCountZ *= Math.abs (params.mapLattice.z);
}this.nY = this.cubeCountY + 1;
this.nZ = this.cubeCountZ + 1;
this.yzCount = this.nY * this.nZ;
if (this.bsVoxels == null) this.bsVoxels =  new JU.BS ();
this.edgeVertexPointers = (this.isXLowToHigh ? J.jvxl.calc.MarchingCubes.edgeVertexPointersLowToHigh : J.jvxl.calc.MarchingCubes.edgeVertexPointersHighToLow);
this.edgeVertexPlanes = (this.isXLowToHigh ? J.jvxl.calc.MarchingCubes.edgeVertexPlanesLowToHigh : J.jvxl.calc.MarchingCubes.edgeVertexPlanesHighToLow);
this.isoPointIndexPlanes =  Clazz.newIntArray (2, this.yzCount, 3, 0);
this.yzPlanes = (this.mode == 3 ?  Clazz.newFloatArray (2, this.yzCount, 0) : null);
this.setLinearOffsets ();
this.calcVoxelVertexVectors ();
}, "J.jvxl.data.VolumeData,J.jvxl.readers.Parameters");
Clazz.defineMethod (c$, "calcVoxelVertexVectors", 
function () {
for (var i = 8; --i >= 0; ) this.volumeData.transform (J.jvxl.calc.MarchingCubes.cubeVertexVectors[i], this.voxelVertexVectors[i] =  new JU.V3 ());

for (var i = 12; --i >= 0; ) this.edgeVectors[i].sub2 (this.voxelVertexVectors[JU.TriangleData.edgeVertexes[i + i + 1]], this.voxelVertexVectors[JU.TriangleData.edgeVertexes[i + i]]);

});
Clazz.defineMethod (c$, "resetIndexPlane", 
function (plane) {
for (var i = 0; i < this.yzCount; i++) for (var j = 0; j < 3; j++) plane[i][j] = -2147483648;


return plane;
}, "~A");
Clazz.defineMethod (c$, "getEdgeData", 
function () {
if (this.cubeCountX < 0 || this.cubeCountY < 0 || this.cubeCountZ < 0) return "";
this.mappingPlane = this.volumeData.mappingPlane;
this.edgeCount = 0;
var x0;
var x1;
var xStep;
var ptStep;
var pt;
var ptX;
if (this.isXLowToHigh) {
x0 = 0;
x1 = this.cubeCountX + (this.colorDensity ? 1 : 0);
if (this.colorDensity) {
x1 = this.cubeCountX + 1;
ptX = this.yzCount - 1;
} else {
x1 = this.cubeCountX;
ptX = (this.yzCount - 1) - this.nZ - 1;
}xStep = 1;
ptStep = this.yzCount;
} else {
if (this.colorDensity) {
x0 = this.cubeCountX;
ptX = (this.cubeCountX + 1) * this.yzCount - 1;
} else {
x0 = this.cubeCountX - 1;
ptX = (this.cubeCountX * this.yzCount - 1) - this.nZ - 1;
}x1 = -1;
xStep = -1;
ptStep = -this.yzCount;
}pt = ptX;
this.resetIndexPlane (this.isoPointIndexPlanes[1]);
this.voxelData = null;
var y1 = this.cubeCountY + (this.colorDensity ? 1 : 0);
var z1 = this.cubeCountZ + (this.colorDensity ? 1 : 0);
switch (this.mode) {
case 3:
this.getPlane (x0, false);
break;
case 1:
this.voxelData = this.volumeData.getVoxelData ();
break;
}
this.allInside = (this.colorDensity && (this.cutoff == 0 || this.mode == 2 && this.bsVoxels.nextSetBit (0) < 0));
var colorDensityAll = (this.colorDensity && this.cutoff == 0);
var v = 0;
for (var x = x0; x != x1; x += xStep, ptX += ptStep, pt = ptX) {
if (this.mode == 3) {
if (x + xStep <= x1) this.getPlane (x + xStep, true);
}if (this.bsExcludedPlanes.get (x) && this.bsExcludedPlanes.get (x + xStep)) continue;
if (this.colorDensity) {
for (var y = y1; --y >= 0; ) for (var z = z1; --z >= 0; pt--) {
v = this.getValue (x, y, z, pt, 0);
if (colorDensityAll || this.$isInside) {
this.addVertex (x, y, z, pt, v);
}}

continue;
}var indexPlane = this.isoPointIndexPlanes[0];
this.isoPointIndexPlanes[0] = this.isoPointIndexPlanes[1];
this.isoPointIndexPlanes[1] = this.resetIndexPlane (indexPlane);
var noValues = true;
for (var y = y1; --y >= 0; pt--) {
for (var z = z1; --z >= 0; pt--) {
var insideMask = 0;
for (var i = 8; --i >= 0; ) {
v = this.getValue (x, y, z, pt, i);
if (this.$isInside) insideMask |= JU.TriangleData.Pwr2[i];
}
if (noValues && !Float.isNaN (v)) noValues = false;
if (insideMask == 0) {
continue;
}if (insideMask == 0xFF) {
continue;
}if (this.processOneCubical (insideMask, x, y, z, pt) && !this.isContoured && !this.colorDensity) {
this.processTriangles (insideMask);
}}
}
if (noValues) {
this.bsExcludedPlanes.set (x);
}}
return this.edgeData.toString ();
});
Clazz.defineMethod (c$, "getValue", 
 function (x, y, z, pt, i) {
var v;
this.offset = JU.TriangleData.cubeVertexOffsets[i];
var pti = pt + this.linearOffsets[i];
switch (this.mode) {
case 3:
v = this.vertexValues[i] = this.getValueArray (x + this.offset.x, y + this.offset.y, z + this.offset.z, pti, this.yzPlanes[J.jvxl.calc.MarchingCubes.yzPlanePts[i]]);
this.$isInside = (this.allInside || this.bsVoxels.get (pti));
break;
case 2:
this.$isInside = (this.allInside || this.bsVoxels.get (pti));
v = this.vertexValues[i] = (this.bsExcludedVertices.get (pti) ? NaN : this.$isInside ? 1 : 0);
break;
default:
case 1:
if (this.mappingPlane == null) {
v = this.vertexValues[i] = this.voxelData[x + this.offset.x][y + this.offset.y][z + this.offset.z];
} else {
this.volumeData.voxelPtToXYZ (x + this.offset.x, y + this.offset.y, z + this.offset.z, this.pt0);
v = this.vertexValues[i] = this.volumeData.distanceToMappingPlane (this.pt0);
}if (this.isSquared) this.vertexValues[i] *= this.vertexValues[i];
this.$isInside = (this.allInside ? true : J.jvxl.calc.MarchingCubes.isInside (this.vertexValues[i], this.cutoff, this.isCutoffAbsolute));
if (this.$isInside) this.bsVoxels.set (pti);
}
return v;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getPlane", 
 function (i, andSwap) {
if (i < 0 || i > this.cubeCountX) return;
this.surfaceReader.getPlane (i);
if (andSwap) {
var plane = this.yzPlanes[0];
this.yzPlanes[0] = this.yzPlanes[1];
this.yzPlanes[1] = plane;
}}, "~N,~B");
Clazz.defineMethod (c$, "processTriangles", 
function (insideMask) {
var triangles = JU.TriangleData.triangleTable2[insideMask];
for (var i = triangles.length; (i -= 4) >= 0; ) this.addTriangle (triangles[i], triangles[i + 1], triangles[i + 2], triangles[i + 3]);

}, "~N");
Clazz.defineMethod (c$, "addVertex", 
function (x, y, z, pti, value) {
this.volumeData.voxelPtToXYZ (x, y, z, this.pt0);
if (this.surfaceReader.addVertexCopy (this.pt0, value, -4, true) < 0) this.bsExcludedVertices.set (pti);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addTriangle", 
function (ia, ib, ic, edgeType) {
if (!this.bsExcludedTriangles.get (this.nTriangles) && this.surfaceReader.addTriangleCheck (this.edgePointIndexes[ia], this.edgePointIndexes[ib], this.edgePointIndexes[ic], edgeType, 0, this.isCutoffAbsolute, 0) < 0) {
this.bsExcludedTriangles.set (this.nTriangles);
}this.nTriangles++;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getValueArray", 
function (x, y, z, pt, tempValues) {
var ptyz = pt % this.yzCount;
this.bsValues.set (pt);
var value = this.surfaceReader.getValue (x, y, z, ptyz);
if (this.isSquared) value *= value;
tempValues[ptyz] = value;
if (J.jvxl.calc.MarchingCubes.isInside (value, this.cutoff, this.isCutoffAbsolute)) this.bsVoxels.set (pt);
return value;
}, "~N,~N,~N,~N,~A");
c$.isInside = Clazz.defineMethod (c$, "isInside", 
function (voxelValue, max, isAbsolute) {
return ((max > 0 && (isAbsolute ? Math.abs (voxelValue) : voxelValue) >= max) || (max <= 0 && voxelValue <= max));
}, "~N,~N,~B");
Clazz.defineMethod (c$, "processOneCubical", 
function (insideMask, x, y, z, pt) {
var edgeMask = J.jvxl.calc.MarchingCubes.insideMaskTable[insideMask];
var isNaN = false;
for (var iEdge = 12; --iEdge >= 0; ) {
var xEdge = JU.TriangleData.Pwr2[iEdge];
if ((edgeMask & xEdge) == 0) continue;
var iPlane = this.edgeVertexPlanes[iEdge];
var iPt = (pt + this.linearOffsets[this.edgeVertexPointers[iEdge]]) % this.yzCount;
var iType = J.jvxl.calc.MarchingCubes.edgeTypeTable[iEdge];
var index = this.edgePointIndexes[iEdge] = this.isoPointIndexPlanes[iPlane][iPt][iType];
if (index != -2147483648) {
if (index == -1) isNaN = this.excludePartialCubes;
continue;
}var vertexA = JU.TriangleData.edgeVertexes[iEdge << 1];
var vertexB = JU.TriangleData.edgeVertexes[(iEdge << 1) + 1];
var valueA = this.vertexValues[vertexA];
var valueB = this.vertexValues[vertexB];
this.calcVertexPoint (x, y, z, vertexA, this.pointA);
this.edgeCount++;
var i = this.edgePointIndexes[iEdge] = this.isoPointIndexPlanes[iPlane][iPt][iType] = this.surfaceReader.getSurfacePointIndexAndFraction (this.cutoff, this.isCutoffAbsolute, x, y, z, JU.TriangleData.cubeVertexOffsets[vertexA], vertexA, vertexB, valueA, valueB, this.pointA, this.edgeVectors[iEdge], iType == this.contourType, this.fReturn);
this.addEdgeData (i < 0 ? NaN : this.fReturn[0]);
if (Float.isNaN (this.fReturn[0]) || i < 0) isNaN = this.excludePartialCubes;
}
return !isNaN;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addEdgeData", 
function (f) {
var ch = J.jvxl.data.JvxlCoder.jvxlFractionAsCharacter (f);
this.edgeData.appendC (ch);
}, "~N");
Clazz.defineMethod (c$, "calcVertexPoint", 
function (x, y, z, vertex, pt) {
this.volumeData.voxelPtToXYZ (x, y, z, this.pt0);
pt.add2 (this.pt0, this.voxelVertexVectors[vertex]);
}, "~N,~N,~N,~N,JU.P3");
Clazz.defineMethod (c$, "setLinearOffsets", 
function () {
this.linearOffsets[0] = 0;
this.linearOffsets[1] = this.yzCount;
this.linearOffsets[2] = this.yzCount + 1;
this.linearOffsets[3] = 1;
this.linearOffsets[4] = this.nZ;
this.linearOffsets[5] = this.yzCount + this.nZ;
this.linearOffsets[6] = this.yzCount + this.nZ + 1;
this.linearOffsets[7] = this.nZ + 1;
});
Clazz.defineMethod (c$, "getLinearOffset", 
function (x, y, z, offset) {
return x * this.yzCount + y * this.nZ + z + this.linearOffsets[offset];
}, "~N,~N,~N,~N");
Clazz.defineStatics (c$,
"MODE_CUBE", 1,
"MODE_JVXL", 2,
"MODE_PLANES", 3);
Clazz.defineStatics (c$,
"yzPlanePts",  Clazz.newIntArray (-1, [0, 1, 1, 0, 0, 1, 1, 0]),
"edgeVertexPointersLowToHigh",  Clazz.newIntArray (-1, [1, 1, 2, 0, 5, 5, 6, 4, 0, 1, 2, 3]),
"edgeVertexPointersHighToLow",  Clazz.newIntArray (-1, [0, 1, 3, 0, 4, 5, 7, 4, 0, 1, 2, 3]),
"edgeVertexPlanesLowToHigh",  Clazz.newIntArray (-1, [1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0]),
"edgeVertexPlanesHighToLow",  Clazz.newIntArray (-1, [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1]));
c$.cubeVertexVectors = c$.prototype.cubeVertexVectors =  Clazz.newArray (-1, [JU.V3.new3 (0, 0, 0), JU.V3.new3 (1, 0, 0), JU.V3.new3 (1, 0, 1), JU.V3.new3 (0, 0, 1), JU.V3.new3 (0, 1, 0), JU.V3.new3 (1, 1, 0), JU.V3.new3 (1, 1, 1), JU.V3.new3 (0, 1, 1)]);
Clazz.defineStatics (c$,
"edgeTypeTable",  Clazz.newIntArray (-1, [0, 2, 0, 2, 0, 2, 0, 2, 1, 1, 1, 1]),
"insideMaskTable",  Clazz.newShortArray (-1, [0x0000, 0x0109, 0x0203, 0x030A, 0x0406, 0x050F, 0x0605, 0x070C, 0x080C, 0x0905, 0x0A0F, 0x0B06, 0x0C0A, 0x0D03, 0x0E09, 0x0F00, 0x0190, 0x0099, 0x0393, 0x029A, 0x0596, 0x049F, 0x0795, 0x069C, 0x099C, 0x0895, 0x0B9F, 0x0A96, 0x0D9A, 0x0C93, 0x0F99, 0x0E90, 0x0230, 0x0339, 0x0033, 0x013A, 0x0636, 0x073F, 0x0435, 0x053C, 0x0A3C, 0x0B35, 0x083F, 0x0936, 0x0E3A, 0x0F33, 0x0C39, 0x0D30, 0x03A0, 0x02A9, 0x01A3, 0x00AA, 0x07A6, 0x06AF, 0x05A5, 0x04AC, 0x0BAC, 0x0AA5, 0x09AF, 0x08A6, 0x0FAA, 0x0EA3, 0x0DA9, 0x0CA0, 0x0460, 0x0569, 0x0663, 0x076A, 0x0066, 0x016F, 0x0265, 0x036C, 0x0C6C, 0x0D65, 0x0E6F, 0x0F66, 0x086A, 0x0963, 0x0A69, 0x0B60, 0x05F0, 0x04F9, 0x07F3, 0x06FA, 0x01F6, 0x00FF, 0x03F5, 0x02FC, 0x0DFC, 0x0CF5, 0x0FFF, 0x0EF6, 0x09FA, 0x08F3, 0x0BF9, 0x0AF0, 0x0650, 0x0759, 0x0453, 0x055A, 0x0256, 0x035F, 0x0055, 0x015C, 0x0E5C, 0x0F55, 0x0C5F, 0x0D56, 0x0A5A, 0x0B53, 0x0859, 0x0950, 0x07C0, 0x06C9, 0x05C3, 0x04CA, 0x03C6, 0x02CF, 0x01C5, 0x00CC, 0x0FCC, 0x0EC5, 0x0DCF, 0x0CC6, 0x0BCA, 0x0AC3, 0x09C9, 0x08C0, 0x08C0, 0x09C9, 0x0AC3, 0x0BCA, 0x0CC6, 0x0DCF, 0x0EC5, 0x0FCC, 0x00CC, 0x01C5, 0x02CF, 0x03C6, 0x04CA, 0x05C3, 0x06C9, 0x07C0, 0x0950, 0x0859, 0x0B53, 0x0A5A, 0x0D56, 0x0C5F, 0x0F55, 0x0E5C, 0x015C, 0x0055, 0x035F, 0x0256, 0x055A, 0x0453, 0x0759, 0x0650, 0x0AF0, 0x0BF9, 0x08F3, 0x09FA, 0x0EF6, 0x0FFF, 0x0CF5, 0x0DFC, 0x02FC, 0x03F5, 0x00FF, 0x01F6, 0x06FA, 0x07F3, 0x04F9, 0x05F0, 0x0B60, 0x0A69, 0x0963, 0x086A, 0x0F66, 0x0E6F, 0x0D65, 0x0C6C, 0x036C, 0x0265, 0x016F, 0x0066, 0x076A, 0x0663, 0x0569, 0x0460, 0x0CA0, 0x0DA9, 0x0EA3, 0x0FAA, 0x08A6, 0x09AF, 0x0AA5, 0x0BAC, 0x04AC, 0x05A5, 0x06AF, 0x07A6, 0x00AA, 0x01A3, 0x02A9, 0x03A0, 0x0D30, 0x0C39, 0x0F33, 0x0E3A, 0x0936, 0x083F, 0x0B35, 0x0A3C, 0x053C, 0x0435, 0x073F, 0x0636, 0x013A, 0x0033, 0x0339, 0x0230, 0x0E90, 0x0F99, 0x0C93, 0x0D9A, 0x0A96, 0x0B9F, 0x0895, 0x099C, 0x069C, 0x0795, 0x049F, 0x0596, 0x029A, 0x0393, 0x0099, 0x0190, 0x0F00, 0x0E09, 0x0D03, 0x0C0A, 0x0B06, 0x0A0F, 0x0905, 0x080C, 0x070C, 0x0605, 0x050F, 0x0406, 0x030A, 0x0203, 0x0109, 0x0000]));
});
