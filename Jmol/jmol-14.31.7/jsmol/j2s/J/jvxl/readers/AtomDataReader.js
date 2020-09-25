Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.VolumeDataReader", "JU.BS", "$.P3", "$.P3i", "J.atomdata.AtomData"], "J.jvxl.readers.AtomDataReader", ["java.lang.Float", "java.util.Date", "JU.AU", "$.SB", "$.V3", "J.atomdata.RadiusData", "J.c.VDW", "J.jvxl.data.JvxlCoder", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.maxDistance = 0;
this.contactPair = null;
this.fileName = null;
this.fileDotModel = null;
this.modelIndex = 0;
this.atomData = null;
this.atomXyzTruncated = null;
this.atomRadius = null;
this.atomProp = null;
this.atomNo = null;
this.atomIndex = null;
this.myIndex = null;
this.ac = 0;
this.myAtomCount = 0;
this.nearbyAtomCount = 0;
this.firstNearbyAtom = 0;
this.bsMySelected = null;
this.bsMyIgnored = null;
this.bsNearby = null;
this.doAddHydrogens = false;
this.havePlane = false;
this.doUseIterator = false;
this.theProperty = 0;
this.haveOneProperty = false;
this.minPtsPerAng = 0;
this.sr = 0;
this.rs = null;
this.rs2 = null;
this.maxRS = 0;
this.thisPlane = null;
this.thisAtomSet = null;
this.thisX = 0;
this.margin = 0;
this.vl0 = 0;
this.vl1 = 0;
this.vl2 = 0;
this.bsSurfaceVoxels = null;
this.validSpheres = null;
this.noFaceSpheres = null;
this.voxelSource = null;
this.ptY0 = null;
this.ptZ0 = null;
this.pt0 = null;
this.pt1 = null;
this.ptV = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "AtomDataReader", J.jvxl.readers.VolumeDataReader);
Clazz.prepareFields (c$, function () {
this.atomData =  new J.atomdata.AtomData ();
this.bsMySelected =  new JU.BS ();
this.bsMyIgnored =  new JU.BS ();
this.ptY0 =  new JU.P3 ();
this.ptZ0 =  new JU.P3 ();
this.pt0 =  new JU.P3i ();
this.pt1 =  new JU.P3i ();
this.ptV =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.AtomDataReader, []);
});
Clazz.defineMethod (c$, "initADR", 
function (sg) {
this.initVDR (sg);
this.precalculateVoxelData = true;
}, "J.jvxl.readers.SurfaceGenerator");
Clazz.overrideMethod (c$, "setup", 
function (isMapData) {
this.setup2 ();
}, "~B");
Clazz.defineMethod (c$, "setup2", 
function () {
this.contactPair = this.params.contactPair;
this.doAddHydrogens = (this.sg.atomDataServer != null && this.params.addHydrogens);
this.modelIndex = this.params.modelIndex;
if (this.params.bsIgnore != null) this.bsMyIgnored = this.params.bsIgnore;
if (this.params.volumeData != null) {
this.setVolumeDataV (this.params.volumeData);
this.setBBox (this.volumeData.volumetricOrigin, 0);
this.ptV.setT (this.volumeData.volumetricOrigin);
for (var i = 0; i < 3; i++) this.ptV.scaleAdd2 (this.volumeData.voxelCounts[i] - 1, this.volumeData.volumetricVectors[i], this.ptV);

this.setBBox (this.ptV, 0);
}this.havePlane = (this.params.thePlane != null);
if (this.havePlane) this.volumeData.setPlaneParameters (this.params.thePlane);
});
Clazz.defineMethod (c$, "markPlaneVoxels", 
function (p, r) {
for (var i = 0, pt = this.thisX * this.yzCount, pt1 = pt + this.yzCount; pt < pt1; pt++, i++) {
this.volumeData.getPoint (pt, this.ptV);
this.thisPlane[i] = this.ptV.distance (p) - r;
}
}, "JU.P3,~N");
Clazz.defineMethod (c$, "setVolumeForPlane", 
function () {
if (this.useOriginStepsPoints) {
this.xyzMin = JU.P3.newP (this.params.origin);
this.xyzMax = JU.P3.newP (this.params.origin);
this.xyzMax.add3 ((this.params.points.x - 1) * this.params.steps.x, (this.params.points.y - 1) * this.params.steps.y, (this.params.points.z - 1) * this.params.steps.z);
} else if (this.params.boundingBox == null) {
this.getAtoms (this.params.bsSelected, false, true, false, false, false, false, this.params.mep_marginAngstroms, this.params.modelInvRotation);
if (this.xyzMin == null) {
this.xyzMin = JU.P3.new3 (-10, -10, -10);
this.xyzMax = JU.P3.new3 (10, 10, 10);
}} else {
this.xyzMin = JU.P3.newP (this.params.boundingBox[0]);
this.xyzMax = JU.P3.newP (this.params.boundingBox[1]);
}this.setRanges (this.params.plane_ptsPerAngstrom, this.params.plane_gridMax, 0);
});
Clazz.defineMethod (c$, "getAtoms", 
function (bsSelected, doAddHydrogens, getRadii, getMolecules, getAllModels, addNearbyAtoms, getAtomMinMax, marginAtoms, modelInvRotation) {
if (addNearbyAtoms) getRadii = true;
if (getRadii) {
if (this.params.atomRadiusData == null) this.params.atomRadiusData =  new J.atomdata.RadiusData (null, 1, J.atomdata.RadiusData.EnumType.FACTOR, J.c.VDW.AUTO);
this.atomData.radiusData = this.params.atomRadiusData;
this.atomData.radiusData.valueExtended = this.params.solventExtendedAtomRadius;
if (doAddHydrogens) this.atomData.radiusData.vdwType = J.c.VDW.NOJMOL;
}this.atomData.modelIndex = this.modelIndex;
this.atomData.bsSelected = bsSelected;
this.atomData.bsIgnored = this.bsMyIgnored;
this.sg.fillAtomData (this.atomData, 1 | (getAllModels ? 16 : 0) | (getMolecules ? 4 : 0) | (getRadii ? 2 : 0));
if (this.doUseIterator) this.atomData.bsSelected = null;
this.ac = this.atomData.ac;
this.modelIndex = this.atomData.firstModelIndex;
if (modelInvRotation != null) this.atomData.transformXYZ (modelInvRotation, bsSelected);
var needRadius = false;
for (var i = 0; i < this.ac; i++) {
if ((bsSelected == null || bsSelected.get (i)) && (!this.bsMyIgnored.get (i))) {
if (this.havePlane && Math.abs (this.volumeData.distancePointToPlane (this.atomData.xyz[i])) > 2 * (this.atomData.atomRadius[i] = this.getWorkingRadius (i, marginAtoms))) continue;
this.bsMySelected.set (i);
needRadius = !this.havePlane;
}if (getRadii && (addNearbyAtoms || needRadius)) this.atomData.atomRadius[i] = this.getWorkingRadius (i, marginAtoms);
}
var rH = (getRadii && doAddHydrogens ? this.getWorkingRadius (-1, marginAtoms) : 0);
this.myAtomCount = JU.BSUtil.cardinalityOf (this.bsMySelected);
var atomSet = JU.BSUtil.copy (this.bsMySelected);
var nH = 0;
this.atomProp = null;
this.theProperty = 3.4028235E38;
this.haveOneProperty = false;
var props = this.params.theProperty;
if (this.myAtomCount > 0) {
var hAtoms = null;
if (doAddHydrogens) {
this.atomData.bsSelected = atomSet;
this.sg.atomDataServer.fillAtomData (this.atomData, 8);
hAtoms =  new Array (nH = this.atomData.hydrogenAtomCount);
for (var i = 0; i < this.atomData.hAtoms.length; i++) if (this.atomData.hAtoms[i] != null) for (var j = this.atomData.hAtoms[i].length; --j >= 0; ) hAtoms[--nH] = this.atomData.hAtoms[i][j];


nH = hAtoms.length;
JU.Logger.info (nH + " attached hydrogens added");
}var n = nH + this.myAtomCount;
if (getRadii) this.atomRadius =  Clazz.newFloatArray (n, 0);
this.atomXyzTruncated =  new Array (n);
if (this.params.theProperty != null) this.atomProp =  Clazz.newFloatArray (n, 0);
this.atomNo =  Clazz.newIntArray (n, 0);
this.atomIndex =  Clazz.newIntArray (n, 0);
this.myIndex =  Clazz.newIntArray (this.ac, 0);
for (var i = 0; i < nH; i++) {
if (getRadii) this.atomRadius[i] = rH;
this.atomXyzTruncated[i] = hAtoms[i];
this.atomNo[i] = -1;
if (this.atomProp != null) this.addAtomProp (i, NaN);
}
this.myAtomCount = nH;
for (var i = atomSet.nextSetBit (0); i >= 0; i = atomSet.nextSetBit (i + 1)) {
if (this.atomProp != null) this.addAtomProp (this.myAtomCount, (props != null && i < props.length ? props[i] : NaN));
this.atomXyzTruncated[this.myAtomCount] = this.atomData.xyz[i];
this.atomNo[this.myAtomCount] = this.atomData.atomicNumber[i];
this.atomIndex[this.myAtomCount] = i;
this.myIndex[i] = this.myAtomCount;
if (getRadii) this.atomRadius[this.myAtomCount] = this.atomData.atomRadius[i];
this.myAtomCount++;
}
}this.firstNearbyAtom = this.myAtomCount;
if (!this.isQuiet) JU.Logger.info (this.myAtomCount + " atoms will be used in the surface calculation");
if (this.myAtomCount == 0) {
this.setBBox (JU.P3.new3 (10, 10, 10), 0);
this.setBBox (JU.P3.new3 (-10, -10, -10), 0);
}for (var i = 0; i < this.myAtomCount; i++) this.setBBox (this.atomXyzTruncated[i], getRadii ? this.atomRadius[i] + 0.5 : 0);

if (!Float.isNaN (this.params.scale)) {
var v = JU.V3.newVsub (this.xyzMax, this.xyzMin);
v.scale (0.5);
this.xyzMin.add (v);
v.scale (this.params.scale);
this.xyzMax.add2 (this.xyzMin, v);
this.xyzMin.sub (v);
}if (!addNearbyAtoms || this.myAtomCount == 0) return;
var pt =  new JU.P3 ();
this.bsNearby =  new JU.BS ();
for (var i = 0; i < this.ac; i++) {
if (atomSet.get (i) || this.bsMyIgnored.get (i)) continue;
var rA = this.atomData.atomRadius[i];
if (this.params.thePlane != null && Math.abs (this.volumeData.distancePointToPlane (this.atomData.xyz[i])) > 2 * rA) continue;
if (this.params.theProperty != null) rA += this.maxDistance;
pt = this.atomData.xyz[i];
if (pt.x + rA > this.xyzMin.x && pt.x - rA < this.xyzMax.x && pt.y + rA > this.xyzMin.y && pt.y - rA < this.xyzMax.y && pt.z + rA > this.xyzMin.z && pt.z - rA < this.xyzMax.z) {
this.bsNearby.set (i);
this.nearbyAtomCount++;
}}
var nAtoms = this.myAtomCount;
if (this.nearbyAtomCount != 0) {
nAtoms += this.nearbyAtomCount;
this.atomRadius = JU.AU.arrayCopyF (this.atomRadius, nAtoms);
this.atomXyzTruncated = JU.AU.arrayCopyObject (this.atomXyzTruncated, nAtoms);
if (this.atomIndex != null) this.atomIndex = JU.AU.arrayCopyI (this.atomIndex, nAtoms);
if (props != null) this.atomProp = JU.AU.arrayCopyF (this.atomProp, nAtoms);
for (var i = this.bsNearby.nextSetBit (0); i >= 0; i = this.bsNearby.nextSetBit (i + 1)) {
if (props != null) this.addAtomProp (this.myAtomCount, props[i]);
this.myIndex[i] = this.myAtomCount;
this.atomIndex[this.myAtomCount] = i;
this.atomXyzTruncated[this.myAtomCount] = this.atomData.xyz[i];
this.atomRadius[this.myAtomCount++] = this.atomData.atomRadius[i];
}
}if (getRadii) this.setRadii ();
this.haveOneProperty = (!Float.isNaN (this.theProperty));
}, "JU.BS,~B,~B,~B,~B,~B,~B,~N,JU.M4");
Clazz.defineMethod (c$, "setRadii", 
function () {
if (this.rs != null) return;
this.maxRS = 0;
this.rs =  Clazz.newFloatArray (this.myAtomCount, 0);
this.rs2 =  Clazz.newFloatArray (this.myAtomCount, 0);
for (var i = 0; i < this.myAtomCount; i++) {
var r = this.rs[i] = this.atomRadius[i] + this.sr;
if (r > this.maxRS) this.maxRS = r;
this.rs2[i] = this.rs[i] * this.rs[i];
}
});
Clazz.defineMethod (c$, "addAtomProp", 
 function (i, f) {
this.atomProp[i] = f;
if (!Float.isNaN (this.theProperty)) if (f != this.theProperty) this.theProperty = (this.theProperty == 3.4028235E38 ? f : NaN);
}, "~N,~N");
Clazz.defineMethod (c$, "getWorkingRadius", 
 function (i, marginAtoms) {
var r = (i < 0 ? this.atomData.hAtomRadius : this.atomData.atomRadius[i]);
return (Float.isNaN (marginAtoms) ? Math.max (r, 0.1) : r + marginAtoms);
}, "~N,~N");
Clazz.defineMethod (c$, "setHeader", 
function (calcType, line2) {
this.jvxlFileHeaderBuffer =  new JU.SB ();
if (this.atomData.programInfo != null) this.jvxlFileHeaderBuffer.append ("#created by ").append (this.atomData.programInfo).append (" on ").append ("" +  new java.util.Date ()).append ("\n");
this.jvxlFileHeaderBuffer.append (calcType).append ("\n").append (line2).append ("\n");
}, "~S,~S");
Clazz.defineMethod (c$, "setRanges", 
function (ptsPerAngstrom, maxGrid, minPtsPerAng) {
if (this.xyzMin == null) return;
this.ptsPerAngstrom = ptsPerAngstrom;
this.maxGrid = maxGrid;
this.minPtsPerAng = minPtsPerAng;
this.setVolumeData ();
J.jvxl.data.JvxlCoder.jvxlCreateHeader (this.volumeData, this.jvxlFileHeaderBuffer);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "setVolumeData", 
function () {
this.setVolumeDataADR ();
});
Clazz.defineMethod (c$, "setVolumeDataADR", 
function () {
if (!this.setVolumeDataParams ()) {
this.setVoxelRange (0, this.xyzMin.x, this.xyzMax.x, this.ptsPerAngstrom, this.maxGrid, this.minPtsPerAng);
this.setVoxelRange (1, this.xyzMin.y, this.xyzMax.y, this.ptsPerAngstrom, this.maxGrid, this.minPtsPerAng);
this.setVoxelRange (2, this.xyzMin.z, this.xyzMax.z, this.ptsPerAngstrom, this.maxGrid, this.minPtsPerAng);
}});
Clazz.defineMethod (c$, "setVertexSource", 
function () {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
if (this.params.vertexSource != null) {
this.params.vertexSource = JU.AU.arrayCopyI (this.params.vertexSource, this.meshData.vc);
for (var i = 0; i < this.meshData.vc; i++) this.params.vertexSource[i] = Math.abs (this.params.vertexSource[i]) - 1;

}});
Clazz.defineMethod (c$, "resetPlane", 
function (value) {
for (var i = 0; i < this.yzCount; i++) this.thisPlane[i] = value;

}, "~N");
Clazz.defineMethod (c$, "resetVoxelData", 
function (value) {
for (var x = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) this.voxelData[x][y][z] = value;



}, "~N");
Clazz.defineMethod (c$, "getVoxel", 
 function (i, j, k, ipt) {
return (this.isProgressive ? this.thisPlane[ipt % this.yzCount] : this.voxelData[i][j][k]);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "unsetVoxelData", 
function () {
this.unsetVoxelData2 ();
});
Clazz.defineMethod (c$, "unsetVoxelData2", 
function () {
if (this.isProgressive) for (var i = 0; i < this.yzCount; i++) {
if (this.thisPlane[i] == 3.4028235E38) this.thisPlane[i] = NaN;
}
 else for (var x = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) if (this.voxelData[x][y][z] == 3.4028235E38) this.voxelData[x][y][z] = NaN;



});
Clazz.defineMethod (c$, "setGridLimitsForAtom", 
function (ptA, rA, pt0, pt1) {
rA += this.margin;
this.volumeData.xyzToVoxelPt (ptA.x, ptA.y, ptA.z, pt0);
var x = Clazz.doubleToInt (Math.floor (rA / this.volumeData.volumetricVectorLengths[0]));
var y = Clazz.doubleToInt (Math.floor (rA / this.volumeData.volumetricVectorLengths[1]));
var z = Clazz.doubleToInt (Math.floor (rA / this.volumeData.volumetricVectorLengths[2]));
pt1.set (pt0.x + x, pt0.y + y, pt0.z + z);
pt0.set (pt0.x - x, pt0.y - y, pt0.z - z);
pt0.x = Math.max (pt0.x - 1, 0);
pt0.y = Math.max (pt0.y - 1, 0);
pt0.z = Math.max (pt0.z - 1, 0);
pt1.x = Math.min (pt1.x + 1, this.nPointsX);
pt1.y = Math.min (pt1.y + 1, this.nPointsY);
pt1.z = Math.min (pt1.z + 1, this.nPointsZ);
}, "JU.P3,~N,JU.P3i,JU.P3i");
Clazz.defineMethod (c$, "getAtomMinMax", 
function (bs, bsAtomMinMax) {
for (var i = 0; i < this.nPointsX; i++) bsAtomMinMax[i] =  new JU.BS ();

for (var iAtom = this.myAtomCount; --iAtom >= 0; ) {
if (bs != null && !bs.get (iAtom)) continue;
this.setGridLimitsForAtom (this.atomXyzTruncated[iAtom], this.atomRadius[iAtom], this.pt0, this.pt1);
for (var i = this.pt0.x; i < this.pt1.x; i++) bsAtomMinMax[i].set (iAtom);

}
}, "JU.BS,~A");
Clazz.defineMethod (c$, "markSphereVoxels", 
function (r0, distance) {
var isWithin = (distance != 3.4028235E38 && this.point != null);
var v0 = this.volumetricVectors[0];
var v1 = this.volumetricVectors[1];
var v2 = this.volumetricVectors[2];
for (var iAtom = this.thisAtomSet.nextSetBit (0); iAtom >= 0; iAtom = this.thisAtomSet.nextSetBit (iAtom + 1)) {
if (!this.havePlane && this.validSpheres != null && !this.validSpheres.get (iAtom)) continue;
var isSurface = (this.noFaceSpheres != null && this.noFaceSpheres.get (iAtom));
var isNearby = (iAtom >= this.firstNearbyAtom);
var ptA = this.atomXyzTruncated[iAtom];
var rA = this.atomRadius[iAtom];
if (isWithin && ptA.distance (this.point) > distance + rA + 0.5) continue;
var rA0 = rA + r0;
this.setGridLimitsForAtom (ptA, rA0, this.pt0, this.pt1);
if (this.isProgressive) {
this.pt0.x = this.thisX;
this.pt1.x = this.thisX + 1;
}this.volumeData.voxelPtToXYZ (this.pt0.x, this.pt0.y, this.pt0.z, this.ptV);
for (var i = this.pt0.x; i < this.pt1.x; i++, this.ptV.add2 (v0, this.ptY0)) {
this.ptY0.setT (this.ptV);
for (var j = this.pt0.y; j < this.pt1.y; j++, this.ptV.add2 (v1, this.ptZ0)) {
this.ptZ0.setT (this.ptV);
for (var k = this.pt0.z; k < this.pt1.z; k++, this.ptV.add (v2)) {
var value = this.ptV.distance (ptA) - rA;
var ipt = this.volumeData.getPointIndex (i, j, k);
if ((r0 == 0 || value <= rA0) && value < this.getVoxel (i, j, k, ipt)) {
if (isNearby || isWithin && this.ptV.distance (this.point) > distance) value = NaN;
this.setVoxel (i, j, k, ipt, value);
if (!Float.isNaN (value)) {
if (this.voxelSource != null) this.voxelSource[ipt] = iAtom + 1;
if (value < 0 && isSurface) this.bsSurfaceVoxels.set (ipt);
}}}
}
}
}
}, "~N,~N");
Clazz.defineMethod (c$, "setVoxel", 
function (i, j, k, ipt, value) {
if (this.isProgressive) this.thisPlane[ipt % this.yzCount] = value;
 else this.voxelData[i][j][k] = value;
}, "~N,~N,~N,~N,~N");
});
