Clazz.declarePackage ("J.geodesic");
Clazz.load (["J.api.JmolEnvCalc", "JU.P3", "J.atomdata.AtomData"], "J.geodesic.EnvelopeCalculation", ["JU.AU", "$.BS", "$.V3", "J.atomdata.RadiusData", "JU.BSUtil", "$.Geodesic", "$.Normix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.geodesicMap = null;
this.mapT = null;
this.mads = null;
this.atomData = null;
this.vwr = null;
this.ac = 0;
this.maxRadius = 0;
this.modelZeroBased = false;
this.disregardNeighbors = false;
this.bsMySelected = null;
this.dotsConvexMaps = null;
this.dotsConvexMax = 0;
this.geodesicCount = 0;
this.bsSurface = null;
this.radiusP = 0;
this.diameterP = 0;
this.bsTemp = null;
this.bsIgnore = null;
this.onlySelectedDots = false;
this.isSurface = false;
this.multiModel = false;
this.currentPoints = null;
this.indexI = 0;
this.centerI = null;
this.radiusI = 0;
this.radiiIP2 = 0;
this.pointT = null;
this.centerT = null;
this.vertexTest = null;
this.neighborCount = 0;
this.neighborIndices = null;
this.neighborCenters = null;
this.neighborPlusProbeRadii2 = null;
this.neighborRadii2 = null;
Clazz.instantialize (this, arguments);
}, J.geodesic, "EnvelopeCalculation", null, J.api.JmolEnvCalc);
Clazz.prepareFields (c$, function () {
this.atomData =  new J.atomdata.AtomData ();
this.pointT =  new JU.P3 ();
this.vertexTest =  new Array (12);
{
for (var i = 0; i < 12; i++) this.vertexTest[i] =  new JU.P3 ();

}this.neighborIndices =  Clazz.newIntArray (16, 0);
this.neighborCenters =  new Array (16);
this.neighborPlusProbeRadii2 =  Clazz.newFloatArray (16, 0);
this.neighborRadii2 =  Clazz.newFloatArray (16, 0);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (vwr, ac, mads) {
this.vwr = vwr;
this.ac = ac;
this.mads = mads;
this.geodesicCount = JU.Geodesic.getVertexCount (3);
this.geodesicMap = JU.BS.newN (this.geodesicCount);
this.mapT = JU.BS.newN (this.geodesicCount);
J.geodesic.EnvelopeCalculation.EMPTY_SET = JU.BSUtil.emptySet;
return this;
}, "J.atomdata.AtomDataServer,~N,~A");
Clazz.defineMethod (c$, "getDotsConvexMaps", 
function () {
return this.dotsConvexMaps;
});
Clazz.defineMethod (c$, "getDotsConvexMax", 
function () {
return this.dotsConvexMax;
});
Clazz.defineMethod (c$, "allocDotsConvexMaps", 
function (max) {
if (this.dotsConvexMax >= max) return;
this.dotsConvexMax = max;
this.dotsConvexMaps =  new Array (max);
}, "~N");
Clazz.overrideMethod (c$, "getBsSurfaceClone", 
function () {
return JU.BSUtil.copy (this.bsSurface);
});
Clazz.defineMethod (c$, "setMads", 
function (mads) {
this.mads = mads;
}, "~A");
Clazz.defineMethod (c$, "setFromBits", 
function (index, bs) {
this.geodesicMap.setBits (0, this.geodesicCount);
for (var iDot = this.geodesicCount; --iDot >= 0; ) if (!bs.get (iDot)) this.geodesicMap.clear (iDot);

if (this.dotsConvexMaps == null) this.dotsConvexMaps =  new Array (this.ac);
var map;
if (this.geodesicMap.isEmpty ()) map = J.geodesic.EnvelopeCalculation.EMPTY_SET;
 else map = JU.BSUtil.copy (this.geodesicMap);
if (index >= this.dotsConvexMaps.length) return;
this.dotsConvexMaps[index] = map;
this.dotsConvexMax = Math.max (this.dotsConvexMax, index);
}, "~N,JU.BS");
Clazz.defineMethod (c$, "newSet", 
function () {
this.dotsConvexMax = 0;
this.dotsConvexMaps = null;
this.radiusP = this.diameterP = 0;
this.mads = null;
});
Clazz.defineMethod (c$, "reCalculate", 
function (bs, m) {
if (this.atomData.radiusData != null) {
this.calculate (null, this.maxRadius, bs, this.bsIgnore, this.disregardNeighbors, this.onlySelectedDots, this.isSurface, this.multiModel);
return;
}if (this.dotsConvexMaps == null || this.dotsConvexMax == 0) return;
var pt =  new JU.V3 ();
if (this.bsTemp == null) this.bsTemp = JU.Normix.newVertexBitSet ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (i >= this.dotsConvexMax) return;
var map = this.dotsConvexMaps[i];
if (map == null || map.isEmpty ()) continue;
var bsNew =  new JU.BS ();
for (var j = map.nextSetBit (0); j >= 0; j = map.nextSetBit (j + 1)) {
pt.setT (JU.Geodesic.getVertexVector (j));
m.rotate (pt);
bsNew.set (JU.Normix.getNormixV (pt, this.bsTemp));
}
this.dotsConvexMaps[i] = bsNew;
}
}, "JU.BS,JU.M3");
Clazz.overrideMethod (c$, "calculate", 
function (rd, maxRadius, bsSelected, bsIgnore, disregardNeighbors, onlySelectedDots, isSurface, multiModel) {
if (rd == null) {
rd = this.atomData.radiusData;
if (rd == null) return;
} else {
this.atomData.radiusData = rd;
this.bsIgnore = bsIgnore;
this.onlySelectedDots = onlySelectedDots;
this.multiModel = multiModel;
this.isSurface = isSurface;
}if (rd.value == 3.4028235E38) rd.value = 3.0;
this.atomData.modelIndex = (multiModel ? -1 : 0);
this.modelZeroBased = !multiModel;
this.vwr.fillAtomData (this.atomData, 1 | (this.mads == null ? 2 : 0));
this.ac = this.atomData.ac;
if (this.mads != null) for (var i = 0; i < this.ac; i++) this.atomData.atomRadius[i] = this.mads[i] / 1000;

this.bsMySelected = (onlySelectedDots && bsSelected != null ? JU.BSUtil.copy (bsSelected) : bsIgnore != null ? JU.BSUtil.setAll (this.ac) : null);
JU.BSUtil.andNot (this.bsMySelected, bsIgnore);
this.disregardNeighbors = disregardNeighbors;
this.maxRadius = maxRadius;
this.bsSurface =  new JU.BS ();
var isAll = (bsSelected == null);
var iter = this.vwr.getSelectedAtomIterator (this.bsMySelected, false, this.modelZeroBased, false);
this.checkNewDotsArray ();
var i0 = (isAll ? this.ac - 1 : bsSelected.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsSelected.nextSetBit (i + 1))) if (bsIgnore == null || !bsIgnore.get (i)) {
this.setAtomI (i);
this.getNeighbors (iter);
this.calcConvexMap (isSurface);
}
iter.release ();
this.currentPoints = null;
this.setDotsConvexMax ();
}, "J.atomdata.RadiusData,~N,JU.BS,JU.BS,~B,~B,~B,~B");
Clazz.defineMethod (c$, "getRadius", 
function (atomIndex) {
return this.atomData.atomRadius[atomIndex];
}, "~N");
Clazz.overrideMethod (c$, "getPoints", 
function () {
if (this.dotsConvexMaps == null) {
this.calculate ( new J.atomdata.RadiusData (null, 3.0, J.atomdata.RadiusData.EnumType.ABSOLUTE, null), 3.4028235E38, this.bsMySelected, null, false, false, false, false);
}if (this.currentPoints != null) return this.currentPoints;
var nPoints = 0;
var dotCount = 42;
for (var i = this.dotsConvexMax; --i >= 0; ) if (this.dotsConvexMaps[i] != null) nPoints += this.dotsConvexMaps[i].cardinalityN (dotCount);

var points =  new Array (nPoints);
if (nPoints == 0) return points;
nPoints = 0;
for (var i = this.dotsConvexMax; --i >= 0; ) if (this.dotsConvexMaps[i] != null) {
var iDot = this.dotsConvexMaps[i].size ();
if (iDot > dotCount) iDot = dotCount;
while (--iDot >= 0) if (this.dotsConvexMaps[i].get (iDot)) {
var pt =  new JU.P3 ();
pt.scaleAdd2 (this.atomData.atomRadius[i], JU.Geodesic.getVertexVector (iDot), this.atomData.xyz[i]);
points[nPoints++] = pt;
}
}
this.currentPoints = points;
return points;
});
Clazz.defineMethod (c$, "setDotsConvexMax", 
 function () {
if (this.dotsConvexMaps == null) this.dotsConvexMax = 0;
 else {
var i;
for (i = this.ac; --i >= 0 && this.dotsConvexMaps[i] == null; ) {
}
this.dotsConvexMax = i + 1;
}});
Clazz.defineMethod (c$, "getAppropriateRadius", 
function (atomIndex) {
return (this.mads != null ? (atomIndex >= this.mads.length ? 0 : this.mads[atomIndex] / 1000) : this.atomData.atomRadius[atomIndex]);
}, "~N");
Clazz.defineMethod (c$, "setAtomI", 
 function (indexI) {
this.indexI = indexI;
this.centerI = this.atomData.xyz[indexI];
this.radiusI = this.atomData.atomRadius[indexI];
this.radiiIP2 = this.radiusI + this.radiusP;
this.radiiIP2 *= this.radiiIP2;
}, "~N");
Clazz.defineMethod (c$, "calcConvexMap", 
 function (isSurface) {
this.calcConvexBits ();
var map;
if (this.geodesicMap.isEmpty ()) map = J.geodesic.EnvelopeCalculation.EMPTY_SET;
 else {
this.bsSurface.set (this.indexI);
if (isSurface) {
this.addIncompleteFaces (this.geodesicMap);
this.addIncompleteFaces (this.geodesicMap);
}map = JU.BSUtil.copy (this.geodesicMap);
}this.dotsConvexMaps[this.indexI] = map;
}, "~B");
Clazz.defineMethod (c$, "addIncompleteFaces", 
 function (points) {
this.mapT.clearAll ();
var faces = JU.Geodesic.getFaceVertexes (3);
var len = faces.length;
var maxPt = -1;
for (var f = 0; f < len; ) {
var p1 = faces[f++];
var p2 = faces[f++];
var p3 = faces[f++];
var ok1 = points.get (p1);
var ok2 = points.get (p2);
var ok3 = points.get (p3);
if (!(ok1 || ok2 || ok3) || ok1 && ok2 && ok3) continue;
if (!ok1) {
this.mapT.set (p1);
if (maxPt < p1) maxPt = p1;
}if (!ok2) {
this.mapT.set (p2);
if (maxPt < p2) maxPt = p2;
}if (!ok3) {
this.mapT.set (p3);
if (maxPt < p3) maxPt = p3;
}}
for (var i = 0; i <= maxPt; i++) {
if (this.mapT.get (i)) points.set (i);
}
}, "JU.BS");
Clazz.defineMethod (c$, "calcConvexBits", 
 function () {
this.geodesicMap.setBits (0, this.geodesicCount);
var combinedRadii = this.radiusI + this.radiusP;
if (this.neighborCount == 0) return;
var faceTest;
var p1;
var p2;
var p3;
var faces = JU.Geodesic.getFaceVertexes (3);
var p4 = J.geodesic.EnvelopeCalculation.power4[2];
var ok1;
var ok2;
var ok3;
this.mapT.clearAll ();
for (var i = 0; i < 12; i++) {
this.vertexTest[i].scaleAdd2 (combinedRadii, JU.Geodesic.getVertexVector (i), this.centerI);
}
for (var f = 0; f < 20; f++) {
faceTest = 0;
p1 = faces[3 * p4 * (4 * f + 0)];
p2 = faces[3 * p4 * (4 * f + 1)];
p3 = faces[3 * p4 * (4 * f + 2)];
for (var j = 0; j < this.neighborCount; j++) {
var maxDist = this.neighborPlusProbeRadii2[j];
this.centerT = this.neighborCenters[j];
ok1 = this.vertexTest[p1].distanceSquared (this.centerT) >= maxDist;
ok2 = this.vertexTest[p2].distanceSquared (this.centerT) >= maxDist;
ok3 = this.vertexTest[p3].distanceSquared (this.centerT) >= maxDist;
if (!ok1) this.geodesicMap.clear (p1);
if (!ok2) this.geodesicMap.clear (p2);
if (!ok3) this.geodesicMap.clear (p3);
if (!ok1 && !ok2 && !ok3) {
faceTest = -1;
break;
}}
var kFirst = f * 12 * p4;
var kLast = kFirst + 12 * p4;
for (var k = kFirst; k < kLast; k++) {
var vect = faces[k];
if (this.mapT.get (vect) || !this.geodesicMap.get (vect)) continue;
switch (faceTest) {
case -1:
this.geodesicMap.clear (vect);
break;
case 0:
for (var j = 0; j < this.neighborCount; j++) {
var maxDist = this.neighborPlusProbeRadii2[j];
this.centerT = this.neighborCenters[j];
this.pointT.scaleAdd2 (combinedRadii, JU.Geodesic.getVertexVector (vect), this.centerI);
if (this.pointT.distanceSquared (this.centerT) < maxDist) this.geodesicMap.clear (vect);
}
break;
case 1:
}
this.mapT.set (vect);
}
}
});
Clazz.defineMethod (c$, "checkNewDotsArray", 
 function () {
if (this.dotsConvexMaps == null) {
this.dotsConvexMaps =  new Array (this.ac);
} else if (this.dotsConvexMaps.length != this.ac) {
var a =  new Array (this.ac);
for (var i = 0; i < this.ac && i < this.dotsConvexMaps.length; i++) a[i] = this.dotsConvexMaps[i];

this.dotsConvexMaps = a;
}});
Clazz.defineMethod (c$, "getNeighbors", 
 function (iter) {
this.neighborCount = 0;
if (this.disregardNeighbors) return null;
this.vwr.setIteratorForAtom (iter, this.indexI, this.radiusI + this.diameterP + this.maxRadius);
while (iter.hasNext ()) {
var indexN = iter.next ();
var neighborRadius = this.atomData.atomRadius[indexN];
if (this.centerI.distance (this.atomData.xyz[indexN]) > this.radiusI + this.radiusP + this.radiusP + neighborRadius) continue;
if (this.neighborCount == this.neighborIndices.length) {
this.neighborIndices = JU.AU.doubleLengthI (this.neighborIndices);
this.neighborCenters = JU.AU.doubleLength (this.neighborCenters);
this.neighborPlusProbeRadii2 = JU.AU.doubleLengthF (this.neighborPlusProbeRadii2);
this.neighborRadii2 = JU.AU.doubleLengthF (this.neighborRadii2);
}this.neighborCenters[this.neighborCount] = this.atomData.xyz[indexN];
this.neighborIndices[this.neighborCount] = indexN;
var r = neighborRadius + this.radiusP;
this.neighborPlusProbeRadii2[this.neighborCount] = r * r;
this.neighborRadii2[this.neighborCount] = neighborRadius * neighborRadius;
++this.neighborCount;
}
return iter;
}, "J.api.AtomIndexIterator");
Clazz.defineMethod (c$, "deleteAtoms", 
function (firstAtomDeleted, nAtomsDeleted) {
this.dotsConvexMaps = JU.AU.deleteElements (this.dotsConvexMaps, firstAtomDeleted, nAtomsDeleted);
this.dotsConvexMax = this.dotsConvexMaps.length;
if (this.mads != null) this.mads = JU.AU.deleteElements (this.mads, firstAtomDeleted, nAtomsDeleted);
this.atomData.atomRadius = JU.AU.deleteElements (this.atomData.atomRadius, firstAtomDeleted, nAtomsDeleted);
this.atomData.xyz = JU.AU.deleteElements (this.atomData.xyz, firstAtomDeleted, nAtomsDeleted);
this.atomData.ac -= nAtomsDeleted;
this.ac = this.atomData.ac;
}, "~N,~N");
Clazz.defineStatics (c$,
"EMPTY_SET", null);
Clazz.defineStatics (c$,
"power4",  Clazz.newIntArray (-1, [1, 4, 16, 64, 256]));
});
