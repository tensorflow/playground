Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["JU.P3", "J.jvxl.readers.AtomDataReader", "JU.P4", "$.V3"], "J.jvxl.readers.IsoSolventReader", ["java.lang.Float", "java.util.Hashtable", "JU.BS", "$.Lst", "$.Measure", "J.jvxl.data.MeshData", "JU.BSUtil", "$.Logger", "$.MeshSurface", "$.TempArray"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cavityRadius = 0;
this.envelopeRadius = 0;
this.dots = null;
this.doCalculateTroughs = false;
this.isCavity = false;
this.isPocket = false;
this.iter = null;
this.bsSurfacePoints = null;
this.bsSurfaceDone = null;
this.bsLocale = null;
this.htEdges = null;
this.vEdges = null;
this.vFaces = null;
this.ptS1 = null;
this.ptS2 = null;
this.vTemp = null;
this.plane = null;
this.ptTemp2 = null;
this.vTemp2 = null;
this.p = null;
this.bsAtomMinMax = null;
this.isSurfacePoint = false;
this.iAtomSurface = 0;
this.nTest = 0;
if (!Clazz.isClassDefined ("J.jvxl.readers.IsoSolventReader.Edge")) {
J.jvxl.readers.IsoSolventReader.$IsoSolventReader$Edge$ ();
}
if (!Clazz.isClassDefined ("J.jvxl.readers.IsoSolventReader.Face")) {
J.jvxl.readers.IsoSolventReader.$IsoSolventReader$Face$ ();
}
this.rAS = 0;
this.rBS = 0;
this.rAS2 = 0;
this.rBS2 = 0;
this.dAB = 0;
this.dAB2 = 0;
this.ecosASB2 = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "IsoSolventReader", J.jvxl.readers.AtomDataReader);
Clazz.prepareFields (c$, function () {
this.ptS1 =  new JU.P3 ();
this.ptS2 =  new JU.P3 ();
this.vTemp =  new JU.V3 ();
this.plane =  new JU.P4 ();
this.ptTemp2 =  new JU.P3 ();
this.vTemp2 =  new JU.V3 ();
this.p =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.IsoSolventReader, []);
});
Clazz.overrideMethod (c$, "init", 
function (sg) {
this.initADR (sg);
}, "J.jvxl.readers.SurfaceGenerator");
Clazz.overrideMethod (c$, "readVolumeParameters", 
function (isMapData) {
this.setup (isMapData);
this.initializeVolumetricData ();
this.volumeData.setUnitVectors ();
this.vl0 = this.volumeData.volumetricVectorLengths[0];
this.vl1 = this.volumeData.volumetricVectorLengths[1];
this.vl2 = this.volumeData.volumetricVectorLengths[2];
if (this.isProgressive) {
this.volumeData.getYzCount ();
this.bsAtomMinMax =  new Array (this.nPointsX);
this.getAtomMinMax (null, this.bsAtomMinMax);
this.voxelSource =  Clazz.newIntArray (this.volumeData.nPoints, 0);
}return true;
}, "~B");
Clazz.overrideMethod (c$, "setup", 
function (isMapData) {
this.setup2 ();
if (this.contactPair == null) {
this.cavityRadius = this.params.cavityRadius;
this.envelopeRadius = this.params.envelopeRadius;
this.sr = this.params.solventRadius;
this.point = this.params.point;
this.isCavity = (this.params.isCavity && this.meshDataServer != null);
this.isPocket = (this.params.pocket != null && this.meshDataServer != null);
this.doCalculateTroughs = (!isMapData && this.sg.atomDataServer != null && !this.isCavity && this.sr > 0 && (this.dataType == 1195 || this.dataType == 1203));
this.doUseIterator = this.doCalculateTroughs;
this.getAtoms (this.params.bsSelected, this.doAddHydrogens, true, false, false, true, false, NaN, null);
if (this.isCavity || this.isPocket) this.dots = this.meshDataServer.calculateGeodesicSurface (this.bsMySelected, this.envelopeRadius);
this.setHeader ("solvent/molecular surface", this.params.calculationType);
if (this.havePlane || !isMapData) {
var minPtsPerAng = 0;
this.setRanges (this.params.solvent_ptsPerAngstrom, this.params.solvent_gridMax, minPtsPerAng);
this.volumeData.getYzCount ();
this.margin = this.volumeData.maxGrid * 2.0;
}if (this.bsNearby != null) this.bsMySelected.or (this.bsNearby);
} else if (!isMapData) {
this.setVolumeData ();
}if (!this.doCalculateTroughs) {
if (isMapData) {
this.precalculateVoxelData = false;
this.volumeData.sr = this;
} else if (!this.isCavity) {
this.isProgressive = this.isXLowToHigh = true;
}}if (this.thisAtomSet == null) this.thisAtomSet = JU.BSUtil.setAll (this.myAtomCount);
}, "~B");
Clazz.overrideMethod (c$, "generateCube", 
function () {
if (this.isCavity && this.params.theProperty != null) return;
if (this.isCavity && this.dataType != 1207 && this.dataType != 1208) {
this.params.vertexSource = null;
this.newVoxelDataCube ();
this.resetVoxelData (3.4028235E38);
this.markSphereVoxels (this.cavityRadius, this.params.distance);
this.generateSolventCavity ();
this.resetVoxelData (3.4028235E38);
this.markSphereVoxels (0, NaN);
} else {
this.voxelSource =  Clazz.newIntArray (this.volumeData.nPoints, 0);
this.generateSolventCube ();
}this.unsetVoxelData ();
var info = this.params.slabInfo;
if (info != null) for (var i = 0; i < info.size (); i++) if ((info.get (i)[2]).booleanValue () && Clazz.instanceOf (info.get (i)[0], JU.P4)) {
this.volumeData.capData (info.get (i)[0], this.params.cutoff);
info.removeItemAt (i--);
}
});
Clazz.overrideMethod (c$, "getSurfacePointAndFraction", 
function (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA0, vB0, fReturn, ptReturn) {
var vA = this.marchingCubes.getLinearOffset (x, y, z, vA0);
var vB = this.marchingCubes.getLinearOffset (x, y, z, vB0);
this.isSurfacePoint = (this.bsSurfaceVoxels != null && (this.bsSurfaceVoxels.get (vA) || this.bsSurfaceVoxels.get (vB)));
if (this.voxelSource != null) {
var vs = Math.abs (Float.isNaN (valueB) || valueA < valueB ? this.voxelSource[vA] : this.voxelSource[vB]);
if (vs > 0) this.iAtomSurface = this.atomIndex[vs - 1];
}if (J.jvxl.readers.IsoSolventReader.testLinear || this.voxelSource == null || this.voxelSource[vA] == 0 || this.voxelSource[vA] != this.voxelSource[vB]) return this.getSPF (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn);
var fraction = fReturn[0] = JU.MeshSurface.getSphericalInterpolationFraction ((this.voxelSource[vA] < 0 ? this.sr : this.atomRadius[this.voxelSource[vA] - 1]), valueA, valueB, edgeVector.length ());
ptReturn.scaleAdd2 (fraction, edgeVector, pointA);
var diff = valueB - valueA;
return valueA + fraction * diff;
}, "~N,~B,~N,~N,JU.T3,JU.V3,~N,~N,~N,~N,~N,~A,JU.T3");
Clazz.overrideMethod (c$, "addVertexCopy", 
function (vertexXYZ, value, assocVertex, asCopy) {
var i = this.addVC (vertexXYZ, value, assocVertex, asCopy);
if (i < 0) return i;
if (this.isSurfacePoint) this.bsSurfacePoints.set (i);
if (this.params.vertexSource != null) this.params.vertexSource[i] = this.iAtomSurface;
return i;
}, "JU.T3,~N,~N,~B");
Clazz.overrideMethod (c$, "selectPocket", 
function (doExclude) {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
var v = this.meshData.vs;
var nVertices = this.meshData.vc;
var vv = this.meshData.vvs;
var nDots = this.dots.length;
for (var i = 0; i < nVertices; i++) {
for (var j = 0; j < nDots; j++) {
if (this.dots[j].distance (v[i]) < this.envelopeRadius) {
vv[i] = NaN;
continue;
}}
}
this.meshData.getSurfaceSet ();
var nSets = this.meshData.nSets;
var pocketSet = JU.BS.newN (nSets);
var ss;
for (var i = 0; i < nSets; i++) if ((ss = this.meshData.surfaceSet[i]) != null) for (var j = ss.nextSetBit (0); j >= 0; j = ss.nextSetBit (j + 1)) if (Float.isNaN (this.meshData.vvs[j])) {
pocketSet.set (i);
break;
}

for (var i = 0; i < nSets; i++) if (this.meshData.surfaceSet[i] != null && pocketSet.get (i) == doExclude) this.meshData.invalidateSurfaceSet (i);

this.updateSurfaceData ();
if (!doExclude) this.meshData.surfaceSet = null;
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 3, null);
this.meshData =  new J.jvxl.data.MeshData ();
}}, "~B");
Clazz.overrideMethod (c$, "postProcessVertices", 
function () {
this.setVertexSource ();
if (this.doCalculateTroughs && this.bsSurfacePoints != null) {
var bsAll =  new JU.BS ();
var bsSurfaces = this.meshData.getSurfaceSet ();
var bsSources = null;
var volumes = (this.isPocket ? null : J.jvxl.data.MeshData.calculateVolumeOrArea (this.meshData, -2147483648, false, false));
var minVolume = (this.isCavity ? (1.5 * 3.141592653589793 * Math.pow (this.sr, 3)) : 0);
var maxVolume = 0;
var maxIsNegative = false;
if (volumes != null && !this.isCavity) for (var i = 0; i < this.meshData.nSets; i++) {
var v = volumes[i];
if (Math.abs (v) > maxVolume) {
maxVolume = Math.abs (v);
maxIsNegative = (v < 0);
}}
var factor = (maxIsNegative ? -1 : 1);
for (var i = 0; i < this.meshData.nSets; i++) {
var bss = bsSurfaces[i];
if (bss.intersects (this.bsSurfacePoints)) {
if (volumes == null || volumes[i] * factor > minVolume) if (this.params.vertexSource != null) {
var bs =  new JU.BS ();
if (bsSources == null) bsSources =  new Array (bsSurfaces.length);
for (var j = bss.nextSetBit (0); j >= 0; j = bss.nextSetBit (j + 1)) {
var iatom = this.params.vertexSource[j];
if (iatom < 0) continue;
if (bsAll.get (iatom)) {
this.meshData.invalidateSurfaceSet (i);
break;
}bs.set (iatom);
}
bsAll.or (bs);
continue;
}}this.meshData.invalidateSurfaceSet (i);
}
this.updateSurfaceData ();
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 3, null);
this.meshData =  new J.jvxl.data.MeshData ();
}}if (this.params.thePlane != null && this.params.slabInfo == null) this.params.addSlabInfo (JU.TempArray.getSlabWithinRange (-100, 0));
});
Clazz.defineMethod (c$, "generateSolventCavity", 
 function () {
var bs = JU.BS.newN (this.nPointsX * this.nPointsY * this.nPointsZ);
var i = 0;
var nDots = this.dots.length;
var n = 0;
var d;
var r2 = this.envelopeRadius;
for (var x = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) {
out : for (var z = 0; z < this.nPointsZ; ++z, ++i) if ((d = this.voxelData[x][y][z]) < 3.4028235E38 && d >= this.cavityRadius) {
this.volumeData.voxelPtToXYZ (x, y, z, this.ptV);
for (var j = 0; j < nDots; j++) {
if (this.dots[j].distance (this.ptV) < r2) continue out;
}
bs.set (i);
n++;
}
}

JU.Logger.info ("cavities include " + n + " voxel points");
this.atomRadius =  Clazz.newFloatArray (n, 0);
this.atomXyzTruncated =  new Array (n);
for (var x = 0, ipt = 0, apt = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) if (bs.get (ipt++)) {
this.volumeData.voxelPtToXYZ (x, y, z, (this.atomXyzTruncated[apt] =  new JU.P3 ()));
this.atomRadius[apt++] = this.voxelData[x][y][z];
}


this.myAtomCount = this.firstNearbyAtom = n;
this.thisAtomSet = JU.BSUtil.setAll (this.myAtomCount);
this.rs = null;
this.setRadii ();
});
Clazz.defineMethod (c$, "generateSolventCube", 
 function () {
if (this.dataType == 1207) return;
this.params.vertexSource =  Clazz.newIntArray (this.volumeData.nPoints, 0);
this.bsSurfaceDone =  new JU.BS ();
this.bsSurfaceVoxels =  new JU.BS ();
this.bsSurfacePoints =  new JU.BS ();
if (this.doCalculateTroughs) {
this.iter = this.sg.atomDataServer.getSelectedAtomIterator (this.bsMySelected, true, false, false);
this.vEdges =  new JU.Lst ();
this.bsLocale =  new Array (this.myAtomCount);
this.htEdges =  new java.util.Hashtable ();
this.getEdges ();
JU.Logger.info (this.vEdges.size () + " edges");
this.vFaces =  new JU.Lst ();
this.getFaces ();
JU.Logger.info (this.vFaces.size () + " faces");
this.bsLocale = null;
this.htEdges = null;
this.iter.release ();
this.iter = null;
this.newVoxelDataCube ();
this.resetVoxelData (3.4028235E38);
this.markFaceVoxels (true);
this.markToroidVoxels ();
this.validSpheres.or (this.noFaceSpheres);
this.vEdges = null;
this.markFaceVoxels (false);
this.vFaces = null;
} else {
this.newVoxelDataCube ();
this.resetVoxelData (3.4028235E38);
}this.markSphereVoxels (0, this.doCalculateTroughs ? 3.4028235E38 : this.params.distance);
this.noFaceSpheres = null;
this.validSpheres = null;
});
Clazz.defineMethod (c$, "getEdges", 
 function () {
for (var iatomA = 0; iatomA < this.myAtomCount; iatomA++) this.bsLocale[iatomA] =  new JU.BS ();

for (var iatomA = 0; iatomA < this.myAtomCount; iatomA++) {
var ptA = this.atomXyzTruncated[iatomA];
var rA = this.rs[iatomA];
this.sg.atomDataServer.setIteratorForAtom (this.iter, this.atomIndex[iatomA], rA + this.maxRS);
while (this.iter.hasNext ()) {
var iB = this.iter.next ();
var iatomB = this.myIndex[iB];
if (iatomA >= this.firstNearbyAtom && iatomB >= this.firstNearbyAtom) continue;
var ptB = this.atomXyzTruncated[iatomB];
var rB = this.rs[iatomB];
var dAB = ptA.distance (ptB);
if (dAB >= rA + rB) continue;
var edge = Clazz.innerTypeInstance (J.jvxl.readers.IsoSolventReader.Edge, this, null, this, iatomA, iatomB, dAB);
this.vEdges.addLast (edge);
this.bsLocale[iatomA].set (iatomB);
this.bsLocale[iatomB].set (iatomA);
this.htEdges.put (edge.toString (), edge);
}
}
});
Clazz.defineMethod (c$, "findEdge", 
function (i, j) {
return this.htEdges.get (i < j ? i + "_" + j : j + "_" + i);
}, "~N,~N");
Clazz.defineMethod (c$, "getFaces", 
 function () {
var bs =  new JU.BS ();
this.params.surfaceAtoms = this.validSpheres =  new JU.BS ();
this.noFaceSpheres = JU.BSUtil.setAll (this.myAtomCount);
for (var i = this.vEdges.size (); --i >= 0; ) {
var edge = this.vEdges.get (i);
var ia = edge.ia;
var ib = edge.ib;
bs.clearAll ();
bs.or (this.bsLocale[ia]);
bs.and (this.bsLocale[ib]);
for (var ic = bs.nextSetBit (ib + 1); ic >= 0; ic = bs.nextSetBit (ic + 1)) {
if (this.getSolventPoints (edge, ia, ib, ic)) {
var f;
var isOK = false;
if ((f = this.validateFace (ia, ib, ic, edge, this.ptS1)) != null) {
this.vFaces.addLast (f);
isOK = true;
}if ((f = this.validateFace (ia, ib, ic, edge, this.ptS2)) != null) {
this.vFaces.addLast (f);
isOK = true;
}if (isOK) {
this.noFaceSpheres.clear (ia);
this.noFaceSpheres.clear (ib);
this.noFaceSpheres.clear (ic);
}}}
}
});
Clazz.defineMethod (c$, "validateFace", 
 function (ia, ib, ic, edge, ptS) {
this.sg.atomDataServer.setIteratorForPoint (this.iter, this.modelIndex, ptS, this.maxRS);
var isValid = true;
while (this.iter.hasNext ()) {
var iia = this.iter.next ();
var iatom = this.myIndex[iia];
if (iatom == ia || iatom == ib || iatom == ic) continue;
var d = this.atomData.atoms[iia].distance (ptS);
if (d < this.atomData.atomRadius[iia] + this.sr) {
isValid = false;
break;
}}
var bc = this.findEdge (ib, ic);
var ca = this.findEdge (ia, ic);
var f = (isValid ? Clazz.innerTypeInstance (J.jvxl.readers.IsoSolventReader.Face, this, null, ia, ib, ic, ptS) : null);
edge.addFace (f);
bc.addFace (f);
ca.addFace (f);
if (!isValid) return null;
this.validSpheres.set (ia);
this.validSpheres.set (ib);
this.validSpheres.set (ic);
return f;
}, "~N,~N,~N,J.jvxl.readers.IsoSolventReader.Edge,JU.P3");
Clazz.defineMethod (c$, "markFaceVoxels", 
 function (firstPass) {
var bsThisPass =  new JU.BS ();
var v0 = this.volumetricVectors[0];
var v1 = this.volumetricVectors[1];
var v2 = this.volumetricVectors[2];
for (var fi = this.vFaces.size (); --fi >= 0; ) {
var f = this.vFaces.get (fi);
var ptA = this.atomXyzTruncated[f.ia];
var ptB = this.atomXyzTruncated[f.ib];
var ptC = this.atomXyzTruncated[f.ic];
var ptS = f.pS;
this.setGridLimitsForAtom (ptS, this.sr, this.pt0, this.pt1);
this.volumeData.voxelPtToXYZ (this.pt0.x, this.pt0.y, this.pt0.z, this.ptV);
for (var i = this.pt0.x; i < this.pt1.x; i++, this.ptV.add2 (v0, this.ptY0)) {
this.ptY0.setT (this.ptV);
for (var j = this.pt0.y; j < this.pt1.y; j++, this.ptV.add2 (v1, this.ptZ0)) {
this.ptZ0.setT (this.ptV);
for (var k = this.pt0.z; k < this.pt1.z; k++, this.ptV.add (v2)) {
var value = this.sr - this.ptV.distance (ptS);
var v = this.voxelData[i][j][k];
var ipt = this.volumeData.getPointIndex (i, j, k);
if (firstPass && value > 0) this.bsSurfaceDone.set (ipt);
if (JU.Measure.isInTetrahedron (this.ptV, ptA, ptB, ptC, ptS, this.plane, this.vTemp, this.vTemp2, false)) {
if (!firstPass ? !this.bsSurfaceDone.get (ipt) && value < 0 && value > -this.volumeData.maxGrid * 1.8 && (value > v) == bsThisPass.get (ipt) : (value > 0 && (v < 0 || v == 3.4028235E38 || (value > v) == bsThisPass.get (ipt)))) {
bsThisPass.set (ipt);
this.setVoxel (i, j, k, ipt, value);
if (this.voxelSource != null) this.voxelSource[ipt] = -1 - f.ia;
if (value > 0) {
this.bsSurfaceVoxels.set (ipt);
}}}}
}
}
}
}, "~B");
Clazz.defineMethod (c$, "markToroidVoxels", 
 function () {
var v0 = this.volumetricVectors[0];
var v1 = this.volumetricVectors[1];
var v2 = this.volumetricVectors[2];
for (var ei = this.vEdges.size (); --ei >= 0; ) {
var edge = this.vEdges.get (ei);
if (!edge.isValid ()) continue;
var ia = edge.ia;
var ib = edge.ib;
var ptA = this.atomXyzTruncated[ia];
var ptB = this.atomXyzTruncated[ib];
this.rAS = this.rs[ia];
this.rBS = this.rs[ib];
this.rAS2 = this.rs2[ia];
this.rBS2 = this.rs2[ib];
this.dAB = edge.d;
this.dAB2 = edge.d2;
this.ecosASB2 = edge.cosASB2;
this.setGridLimitsForAtom (edge, edge.maxr, this.pt0, this.pt1);
this.volumeData.voxelPtToXYZ (this.pt0.x, this.pt0.y, this.pt0.z, this.ptV);
for (var i = this.pt0.x; i < this.pt1.x; i++, this.ptV.add2 (v0, this.ptY0)) {
this.ptY0.setT (this.ptV);
for (var j = this.pt0.y; j < this.pt1.y; j++, this.ptV.add2 (v1, this.ptZ0)) {
this.ptZ0.setT (this.ptV);
for (var k = this.pt0.z; k < this.pt1.z; k++, this.ptV.add (v2)) {
var dVS = this.checkSpecialVoxel (ptA, ptB, this.ptV);
if (Float.isNaN (dVS)) continue;
var value = this.sr - dVS;
if (value < this.voxelData[i][j][k]) {
var ipt = this.volumeData.getPointIndex (i, j, k);
this.setVoxel (i, j, k, ipt, value);
if (this.voxelSource != null) this.voxelSource[ipt] = -1 - ia;
}}
}
}
}
});
Clazz.overrideMethod (c$, "unsetVoxelData", 
function () {
if (!this.havePlane) {
this.unsetVoxelData2 ();
return;
}if (this.isProgressive) for (var i = 0; i < this.yzCount; i++) {
if (this.thisPlane[i] < 0.001) {
} else {
this.thisPlane[i] = 0.001;
}}
 else for (var x = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) if (this.voxelData[x][y][z] < 0.001) {
} else {
this.voxelData[x][y][z] = 0.001;
}


});
Clazz.defineMethod (c$, "getSolventPoints", 
 function (edge, ia, ib, ic) {
var rAS = this.rs[ia];
var v = edge.v;
var cosAngleBAS = (edge.d2 + this.rs2[ia] - this.rs2[ib]) / (2 * edge.d * rAS);
var angleBAS = Math.acos (cosAngleBAS);
this.p.scaleAdd2 (cosAngleBAS * rAS, v, this.atomXyzTruncated[ia]);
JU.Measure.getPlaneThroughPoint (this.p, v, this.plane);
var dPS = (Math.sin (angleBAS) * rAS);
var ptC = this.atomXyzTruncated[ic];
var rCS = this.rs[ic];
var dCT = JU.Measure.distanceToPlane (this.plane, ptC);
if (Math.abs (dCT) >= rCS * 0.9) return false;
this.ptTemp.scaleAdd2 (-dCT, v, ptC);
var dpT = this.p.distance (this.ptTemp);
var dsp2 = dPS * dPS;
var dST2 = this.rs2[ic] - dCT * dCT;
var cosTheta = (dsp2 + dpT * dpT - dST2) / (2 * dPS * dpT);
if (Math.abs (cosTheta) >= 0.99) return false;
var vXS = this.vTemp2;
vXS.sub2 (this.ptTemp, this.p);
vXS.normalize ();
this.ptTemp.scaleAdd2 (dPS * cosTheta, vXS, this.p);
vXS.cross (v, vXS);
vXS.normalize ();
vXS.scale ((Math.sqrt (1 - cosTheta * cosTheta) * dPS));
this.ptS1.add2 (this.ptTemp, vXS);
this.ptS2.sub2 (this.ptTemp, vXS);
return true;
}, "J.jvxl.readers.IsoSolventReader.Edge,~N,~N,~N");
Clazz.defineMethod (c$, "checkSpecialVoxel", 
 function (ptA, ptB, ptV) {
var dAV = ptA.distance (ptV);
var dAV2 = ptA.distanceSquared (ptV);
var f = this.rAS / dAV;
if (f > 1) {
this.p.set (ptA.x + (ptV.x - ptA.x) * f, ptA.y + (ptV.y - ptA.y) * f, ptA.z + (ptV.z - ptA.z) * f);
return (ptB.distanceSquared (this.p) >= this.rBS2 ? NaN : this.solventDistance (this.rAS, this.rAS2, this.rBS2, dAV, dAV2, ptB.distanceSquared (ptV)));
}var dBV = ptB.distance (ptV);
if ((f = this.rBS / dBV) > 1) {
this.p.set (ptB.x + (ptV.x - ptB.x) * f, ptB.y + (ptV.y - ptB.y) * f, ptB.z + (ptV.z - ptB.z) * f);
return (ptA.distanceSquared (this.p) >= this.rAS2 ? NaN : this.solventDistance (this.rBS, this.rBS2, this.rAS2, dBV, dBV * dBV, dAV2));
}return NaN;
}, "JU.P3,JU.P3,JU.P3");
Clazz.defineMethod (c$, "solventDistance", 
 function (rAS, rAS2, rBS2, dAV, dAV2, dBV2) {
var angleVAB = Math.acos ((dAV2 + this.dAB2 - dBV2) / (2 * dAV * this.dAB));
var angleSAB = Math.acos ((rAS2 + this.dAB2 - rBS2) / (2 * rAS * this.dAB));
var dVS2 = (rAS2 + dAV2 - 2 * rAS * dAV * Math.cos (angleSAB - angleVAB));
var dVS = Math.sqrt (dVS2);
return (this.ecosASB2 < (rAS2 + dVS2 - dAV * dAV) / (dVS * rAS) ? dVS : NaN);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "dumpLine", 
function (pt1, pt2, label, color) {
this.sg.log ("draw ID \"x" + label + (this.nTest++) + "\" " + JU.P3.newP (pt1) + " " + JU.P3.newP (pt2) + " color " + color);
}, "JU.P3,JU.T3,~S,~S");
Clazz.defineMethod (c$, "dumpLine2", 
function (pt1, pt2, label, d, color1, color2) {
var pt =  new JU.V3 ();
pt.setT (pt2);
pt.sub (pt1);
pt.normalize ();
pt.scale (d);
pt.add (pt1);
this.sg.log ("draw ID \"" + label + (this.nTest++) + "\" " + JU.P3.newP (pt1) + " " + JU.P3.newP (pt) + " color " + color1);
this.sg.log ("draw ID \"" + label + (this.nTest++) + "\"" + JU.P3.newP (pt) + " " + JU.P3.newP (pt2) + " color " + color2 + "\"" + label + "\"");
}, "JU.P3,JU.P3,~S,~N,~S,~S");
Clazz.defineMethod (c$, "dumpPoint", 
function (pt, label, color) {
this.sg.log ("draw ID \"" + label + (this.nTest++) + "\"" + JU.P3.newP (pt) + " color " + color);
}, "JU.P3,~S,~S");
Clazz.overrideMethod (c$, "getValueAtPoint", 
function (pt, getSource) {
if (this.contactPair != null) return pt.distance (this.contactPair.myAtoms[1]) - this.contactPair.radii[1];
var value = 3.4028235E38;
for (var iAtom = 0; iAtom < this.firstNearbyAtom; iAtom++) {
var r = pt.distance (this.atomXyzTruncated[iAtom]) - this.rs[iAtom];
if (r < value) value = r;
}
return (value == 3.4028235E38 ? NaN : value);
}, "JU.T3,~B");
Clazz.overrideMethod (c$, "discardTempData", 
function (discardAll) {
this.rs = null;
this.rs2 = null;
this.discardTempDataSR (discardAll);
}, "~B");
Clazz.overrideMethod (c$, "getPlane", 
function (x) {
if (this.yzCount == 0) {
this.initPlanes ();
}this.thisX = x;
this.thisPlane = this.yzPlanes[x % 2];
if (this.contactPair == null) {
this.resetPlane (3.4028235E38);
this.thisAtomSet = this.bsAtomMinMax[x];
this.markSphereVoxels (0, this.params.distance);
this.unsetVoxelData ();
} else {
this.markPlaneVoxels (this.contactPair.myAtoms[0], this.contactPair.radii[0]);
}return this.thisPlane;
}, "~N");
c$.$IsoSolventReader$Edge$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ia = 0;
this.ib = 0;
this.nFaces = 0;
this.nInvalid = 0;
this.d = 0;
this.d2 = 0;
this.maxr = 0;
this.cosASB2 = 0;
this.v = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers.IsoSolventReader, "Edge", JU.P3);
Clazz.overrideConstructor (c$, 
function (a, b, c, d) {
this.ia = Math.min (b, c);
this.ib = Math.max (b, c);
this.d = d;
this.d2 = d * d;
this.maxr = Math.sqrt (this.d2 / 4 + Math.max (a.rs2[b], a.rs2[c]));
this.ave (a.atomXyzTruncated[b], a.atomXyzTruncated[c]);
this.cosASB2 = (a.rs2[b] + a.rs2[c] - this.d2) / (a.rs[c] * a.rs[b]);
this.v = JU.V3.newVsub (a.atomXyzTruncated[c], a.atomXyzTruncated[b]);
this.v.normalize ();
}, "J.jvxl.readers.IsoSolventReader,~N,~N,~N");
Clazz.defineMethod (c$, "addFace", 
function (a) {
this.nFaces++;
if (a == null) {
this.nInvalid++;
return;
}}, "J.jvxl.readers.IsoSolventReader.Face");
Clazz.defineMethod (c$, "isValid", 
function () {
return (this.nFaces == 0 || this.nInvalid != this.nFaces);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.ia + "_" + this.ib;
});
c$ = Clazz.p0p ();
};
c$.$IsoSolventReader$Face$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ia = 0;
this.ib = 0;
this.ic = 0;
this.pS = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers.IsoSolventReader, "Face");
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
this.ia = a;
this.ib = b;
this.ic = c;
this.pS = JU.P3.newP (d);
}, "~N,~N,~N,JU.P3");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.ia + "_" + this.ib + "_" + this.ic + "_" + this.pS;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"testLinear", false);
});
