Clazz.declarePackage ("JU");
Clazz.load (null, "JU.MeshSlicer", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.Measure", "$.P3", "$.P4", "$.SB", "$.V3", "J.api.Interface", "JU.BSUtil", "$.BoxInfo", "$.C", "$.Escape", "$.MeshSurface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.m = null;
this.doCap = false;
this.doClear = false;
this.doGhost = false;
this.iD = 0;
this.iE = 0;
this.sources = null;
this.pts = null;
this.norm = null;
this.dPlane = 0;
this.values = null;
this.fracs = null;
this.capper = null;
this.wPlane = 0;
Clazz.instantialize (this, arguments);
}, JU, "MeshSlicer");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (meshSurface) {
this.m = meshSurface;
this.values =  Clazz.newFloatArray (2, 0);
this.fracs =  Clazz.newFloatArray (2, 0);
this.sources =  Clazz.newIntArray (3, 0);
return this;
}, "JU.MeshSurface");
Clazz.defineMethod (c$, "slabPolygons", 
function (slabObject, allowCap) {
if (this.m.polygonCount0 < 0) return false;
var m = this.m;
var slabType = (slabObject[0]).intValue ();
if (slabType == 1073742333 || slabType == 1073741872) {
if (m.bsSlabDisplay != null && (m.polygonCount0 != 0 || m.vertexCount0 != 0)) {
m.pc = m.polygonCount0;
m.vc = m.vertexCount0;
m.polygonCount0 = m.vertexCount0 = 0;
m.normixCount = (m.isDrawPolygon ? m.pc : m.vc);
m.bsSlabDisplay.setBits (0, (m.pc == 0 ? m.vc : m.pc));
m.slabOptions =  new JU.SB ().append (m.meshType + " slab none");
m.bsSlabGhost = null;
m.slabMeshType = 1073742333;
}if (slabType == 1073742333) {
return false;
}}var slabbingObject = slabObject[1];
var andCap = (slabObject[2]).booleanValue () && !(slabType == 1073741872);
if (andCap && !allowCap) return false;
var colorData = slabObject[3];
var isGhost = (colorData != null);
if (m.bsSlabDisplay == null || m.polygonCount0 == 0 && m.vertexCount0 == 0) {
m.polygonCount0 = m.pc;
m.vertexCount0 = m.vc;
m.bsSlabDisplay = JU.BSUtil.setAll (m.pc == 0 ? m.vc : m.pc);
m.bsSlabGhost = null;
if (m.pc == 0 && m.vc == 0) return false;
} else if (m.isMerged) {
if (m.pc == 0) m.bsSlabDisplay.setBits (m.mergeVertexCount0, m.vc);
 else m.bsSlabDisplay.setBits (m.mergePolygonCount0, m.pc);
}if (isGhost) {
if (m.bsSlabGhost == null) m.bsSlabGhost =  new JU.BS ();
m.slabMeshType = (colorData[0]).intValue ();
m.slabColix = (colorData[1]).shortValue ();
andCap = false;
m.colix = JU.C.getColixTranslucent3 (m.colix, false, 0);
}var sb =  new JU.SB ();
sb.append (andCap ? " cap " : " slab ");
if (isGhost) {
sb.append (JU.C.getColixTranslucencyLabel (m.slabColix)).append (" ");
var s = JU.C.getHexCode (m.slabColix);
if (s != null) sb.append (s).append (" ");
if (m.slabMeshType == 1073742018) sb.append ("mesh ");
}switch (slabType) {
case 1073741872:
sb.append ("brillouin");
this.slabBrillouin (slabbingObject);
break;
case 3:
this.getIntersection (0, null, null, null, null, slabbingObject, null, andCap, false, 3, isGhost);
break;
case 134217750:
var plane = slabbingObject;
sb.append (JU.Escape.eP4 (plane));
this.getIntersection (0, plane, null, null, null, null, null, andCap, false, 134217750, isGhost);
break;
case 1814695966:
case 1678381065:
var box = slabbingObject;
sb.append ("within ").append (JU.Escape.eAP (box));
var faces = this.getBoxFacesFromOABC (box);
for (var i = 0; i < faces.length; i++) {
this.getIntersection (0, faces[i], null, null, null, null, null, andCap, false, 134217750, isGhost);
}
break;
case 134221834:
this.getIntersection (0, null, null, null, slabbingObject, null, null, false, false, 32, isGhost);
break;
case 134217759:
case 1073742114:
case 1073742018:
var o = slabbingObject;
var distance = (o[0]).floatValue ();
switch (slabType) {
case 134217759:
var points = o[1];
var bs = o[2];
sb.append ("within ").appendF (distance).append (bs == null ? JU.Escape.e (points) : JU.Escape.e (bs));
this.getIntersection (distance, null, points, null, null, null, null, andCap, false, 1275069443, isGhost);
break;
case 1073742114:
if (m.vvs == null) return false;
var distanceMax = (o[1]).floatValue ();
sb.append ("within range ").appendF (distance).append (" ").appendF (distanceMax);
bs = (distanceMax < distance ? JU.BSUtil.copy (m.bsSlabDisplay) : null);
this.getIntersection (distance, null, null, null, null, null, null, andCap, false, 32, isGhost);
var bsA = (bs == null ? null : JU.BSUtil.copy (m.bsSlabDisplay));
JU.BSUtil.copy2 (bs, m.bsSlabDisplay);
this.getIntersection (distanceMax, null, null, null, null, null, null, andCap, false, 64, isGhost);
if (bsA != null) m.bsSlabDisplay.or (bsA);
break;
case 1073742018:
var mesh = o[1];
this.getIntersection (0, null, null, null, null, null, mesh, andCap, false, distance < 0 ? 32 : 64, isGhost);
break;
}
break;
}
var newOptions = sb.toString ();
if (m.slabOptions == null) m.slabOptions =  new JU.SB ();
if (m.slabOptions.indexOf (newOptions) < 0) m.slabOptions.append (m.slabOptions.length () > 0 ? "; " : "").append (m.meshType).append (newOptions);
return true;
}, "~A,~B");
Clazz.defineMethod (c$, "getBoxFacesFromOABC", 
 function (oabc) {
var faces =  new Array (6);
var vNorm =  new JU.V3 ();
var vAB =  new JU.V3 ();
var pta =  new JU.P3 ();
var ptb =  new JU.P3 ();
var ptc =  new JU.P3 ();
var vertices = JU.BoxInfo.getVerticesFromOABC (oabc);
for (var i = 0; i < 6; i++) {
pta.setT (vertices[JU.BoxInfo.facePoints[i][0]]);
ptb.setT (vertices[JU.BoxInfo.facePoints[i][1]]);
ptc.setT (vertices[JU.BoxInfo.facePoints[i][2]]);
faces[i] = JU.Measure.getPlaneThroughPoints (pta, ptb, ptc, vNorm, vAB,  new JU.P4 ());
}
return faces;
}, "~A");
Clazz.defineMethod (c$, "getIntersection", 
function (distance, plane, ptCenters, vData, fData, bsSource, meshSurface, andCap, doClean, tokType, isGhost) {
var m = this.m;
var isSlab = (vData == null);
var p = null;
this.pts = ptCenters;
if (plane != null) {
this.norm = JU.V3.newV (plane);
this.dPlane = Math.sqrt (this.norm.dot (this.norm));
this.wPlane = plane.w;
if (this.dPlane == 0) {
this.norm.z = this.dPlane = 1;
this.wPlane = 0;
}}if (fData == null) {
if (tokType == 3 && bsSource != null) {
if (m.vertexSource == null) return;
fData =  Clazz.newFloatArray (m.vc, 0);
for (var i = 0; i < m.vc; i++) {
fData[i] = m.vertexSource[i];
if (fData[i] == -1) System.out.println ("meshsurface hmm");
}
} else {
fData = m.vvs;
}}if (m.pc == 0) {
for (var i = m.mergeVertexCount0; i < m.vc; i++) {
if (Float.isNaN (fData[i]) || this.checkSlab (tokType, m.vs[i], fData[i], distance, bsSource) > 0) m.bsSlabDisplay.clear (i);
}
return;
}if (ptCenters != null || isGhost) andCap = false;
if (andCap && this.capper == null) this.capper = (J.api.Interface.getInterface ("JU.MeshCapper", m.vwr, "script")).set (this);
if (this.capper != null) this.capper.clear ();
var absD = Math.abs (distance);
var mapEdge =  new java.util.Hashtable ();
var bsD = JU.BS.newN (m.vc);
var d =  Clazz.newFloatArray (m.vc, 0);
var d1 = 0;
var d2 = 0;
var d3 = 0;
var valA;
var valB;
var valC;
for (var i = m.mergePolygonCount0, iLast = m.pc; i < iLast; i++) {
var face = m.setABC (i);
if (face == null) continue;
var bsSlab = (m.bsSlabGhost != null && m.bsSlabGhost.get (i) ? m.bsSlabGhost : m.bsSlabDisplay);
var check1 = face[3];
var iContour = (m.dataOnly ? 0 : face[4]);
var ia = m.iA;
var ib = m.iB;
var ic = m.iC;
var vA = m.vs[ia];
var vB = m.vs[ib];
var vC = m.vs[ic];
valA = fData[ia];
valB = fData[ib];
valC = fData[ic];
if (m.vertexSource != null) {
this.sources[0] = m.vertexSource[ia];
this.sources[1] = m.vertexSource[ib];
this.sources[2] = m.vertexSource[ic];
}if (!bsD.get (ia)) {
bsD.set (ia);
d[ia] = this.checkSlab (tokType, vA, valA, (bsSource == null ? distance : this.sources[0]), bsSource);
}if (!bsD.get (ib)) {
bsD.set (ib);
d[ib] = this.checkSlab (tokType, vB, valB, (bsSource == null ? distance : this.sources[1]), bsSource);
}if (!bsD.get (ic)) {
bsD.set (ic);
d[ic] = this.checkSlab (tokType, vC, valC, (bsSource == null ? distance : this.sources[2]), bsSource);
}d1 = d[ia];
d2 = d[ib];
d3 = d[ic];
var test1 = (d1 != 0 && d1 < 0 ? 1 : 0) + (d2 != 0 && d2 < 0 ? 2 : 0) + (d3 != 0 && d3 < 0 ? 4 : 0);
var thisSet = (m.vertexSets == null ? 0 : m.vertexSets[ia]);
switch (test1) {
default:
case 7:
case 0:
break;
case 1:
case 6:
if (ptCenters == null) p =  Clazz.newArray (-1, [this.interpolatePoint (vA, vB, -d1, d2, valA, valB, 0), this.interpolatePoint (vA, vC, -d1, d3, valA, valC, 1)]);
 else p =  Clazz.newArray (-1, [this.interpolateSphere (vA, vB, -d1, -d2, absD, valA, valB, 0), this.interpolateSphere (vA, vC, -d1, -d3, absD, valA, valC, 1)]);
break;
case 2:
case 5:
if (ptCenters == null) p =  Clazz.newArray (-1, [this.interpolatePoint (vB, vA, -d2, d1, valB, valA, 1), this.interpolatePoint (vB, vC, -d2, d3, valB, valC, 0)]);
 else p =  Clazz.newArray (-1, [this.interpolateSphere (vB, vA, -d2, -d1, absD, valB, valA, 1), this.interpolateSphere (vB, vC, -d2, -d3, absD, valB, valC, 0)]);
break;
case 3:
case 4:
if (ptCenters == null) p =  Clazz.newArray (-1, [this.interpolatePoint (vC, vA, -d3, d1, valC, valA, 0), this.interpolatePoint (vC, vB, -d3, d2, valC, valB, 1)]);
 else p =  Clazz.newArray (-1, [this.interpolateSphere (vC, vA, -d3, -d1, absD, valC, valA, 0), this.interpolateSphere (vC, vB, -d3, -d2, absD, valC, valB, 1)]);
break;
}
this.doClear = true;
this.doGhost = isGhost;
this.doCap = andCap;
var bs;
if (isSlab) {
switch (test1) {
case 0:
this.doCap = false;
break;
case 7:
continue;
case 1:
case 6:
var tossBC = (test1 == 1);
if (tossBC || isGhost) {
if (!this.getDE (this.fracs, 0, ia, ib, ic, tossBC)) break;
if (this.iD < 0) this.iD = this.addIntersectionVertex (p[0], this.values[0], this.sources[0], thisSet, mapEdge, ia, ib);
if (this.iE < 0) this.iE = this.addIntersectionVertex (p[1], this.values[1], this.sources[0], thisSet, mapEdge, ia, ic);
bs = (tossBC ? bsSlab : m.bsSlabGhost);
m.addPolygonV3 (ia, this.iD, this.iE, check1 & 5 | 2, iContour, 0, bs);
if (!isGhost) break;
}if (!this.getDE (this.fracs, 1, ia, ic, ib, tossBC)) break;
bs = (tossBC ? m.bsSlabGhost : bsSlab);
if (this.iE < 0) {
this.iE = this.addIntersectionVertex (p[0], this.values[0], this.sources[1], thisSet, mapEdge, ia, ib);
m.addPolygonV3 (this.iE, ib, ic, check1 & 3, iContour, 0, bs);
}if (this.iD < 0) {
this.iD = this.addIntersectionVertex (p[1], this.values[1], this.sources[2], thisSet, mapEdge, ia, ic);
m.addPolygonV3 (this.iD, this.iE, ic, check1 & 4 | 1, iContour, 0, bs);
}break;
case 5:
case 2:
var tossAC = (test1 == 2);
if (tossAC || isGhost) {
if (!this.getDE (this.fracs, 0, ib, ic, ia, tossAC)) break;
bs = (tossAC ? bsSlab : m.bsSlabGhost);
if (this.iE < 0) this.iE = this.addIntersectionVertex (p[0], this.values[0], this.sources[1], thisSet, mapEdge, ib, ia);
if (this.iD < 0) this.iD = this.addIntersectionVertex (p[1], this.values[1], this.sources[1], thisSet, mapEdge, ib, ic);
m.addPolygonV3 (this.iE, ib, this.iD, check1 & 3 | 4, iContour, 0, bs);
if (!isGhost) break;
}if (!this.getDE (this.fracs, 1, ib, ia, ic, tossAC)) break;
bs = (tossAC ? m.bsSlabGhost : bsSlab);
if (this.iD < 0) {
this.iD = this.addIntersectionVertex (p[0], this.values[0], this.sources[0], thisSet, mapEdge, ib, ia);
m.addPolygonV3 (ia, this.iD, ic, check1 & 5, iContour, 0, bs);
}if (this.iE < 0) {
this.iE = this.addIntersectionVertex (p[1], this.values[1], this.sources[2], thisSet, mapEdge, ib, ic);
m.addPolygonV3 (this.iD, this.iE, ic, check1 & 2 | 1, iContour, 0, bs);
}break;
case 4:
case 3:
var tossAB = (test1 == 4);
if (tossAB || isGhost) {
if (!this.getDE (this.fracs, 0, ic, ia, ib, tossAB)) break;
if (this.iD < 0) this.iD = this.addIntersectionVertex (p[0], this.values[0], this.sources[2], thisSet, mapEdge, ia, ic);
if (this.iE < 0) this.iE = this.addIntersectionVertex (p[1], this.values[1], this.sources[2], thisSet, mapEdge, ib, ic);
bs = (tossAB ? bsSlab : m.bsSlabGhost);
m.addPolygonV3 (this.iD, this.iE, ic, check1 & 6 | 1, iContour, 0, bs);
if (!isGhost) break;
}if (!this.getDE (this.fracs, 1, ic, ib, ia, tossAB)) break;
bs = (tossAB ? m.bsSlabGhost : bsSlab);
if (this.iE < 0) {
this.iE = this.addIntersectionVertex (p[0], this.values[0], this.sources[0], thisSet, mapEdge, ia, ic);
m.addPolygonV3 (ia, ib, this.iE, check1 & 5, iContour, 0, bs);
}if (this.iD < 0) {
this.iD = this.addIntersectionVertex (p[1], this.values[1], this.sources[1], thisSet, mapEdge, ib, ic);
m.addPolygonV3 (this.iE, ib, this.iD, check1 & 2 | 4, iContour, 0, bs);
}break;
}
if (this.doClear) {
bsSlab.clear (i);
if (this.doGhost) m.bsSlabGhost.set (i);
}if (this.doCap) this.capper.addEdge (this.iE, this.iD, thisSet);
} else if (p != null) {
vData.addLast (p);
}}
if (andCap) this.capper.createCap (this.norm);
if (!doClean) return;
var bsv =  new JU.BS ();
var bsp =  new JU.BS ();
for (var i = 0; i < m.pc; i++) {
if (m.pis[i] == null) continue;
bsp.set (i);
for (var j = 0; j < 3; j++) bsv.set (m.pis[i][j]);

}
var n = 0;
var nPoly = bsp.cardinality ();
if (nPoly != m.pc) {
var map =  Clazz.newIntArray (m.vc, 0);
for (var i = 0; i < m.vc; i++) if (bsv.get (i)) map[i] = n++;

var vTemp =  new Array (n);
n = 0;
for (var i = 0; i < m.vc; i++) if (bsv.get (i)) vTemp[n++] = m.vs[i];

var pTemp = JU.AU.newInt2 (nPoly);
nPoly = 0;
for (var i = 0; i < m.pc; i++) if (m.pis[i] != null) {
for (var j = 0; j < 3; j++) m.pis[i][j] = map[m.pis[i][j]];

pTemp[nPoly++] = m.pis[i];
}
m.vs = vTemp;
m.vc = n;
m.pis = pTemp;
m.pc = nPoly;
}}, "~N,JU.P4,~A,JU.Lst,~A,JU.BS,JU.MeshSurface,~B,~B,~N,~B");
Clazz.defineMethod (c$, "getDE", 
 function (fracs, fD, i1, i2, i3, toss23) {
this.iD = JU.MeshSlicer.setPoint (fracs, fD, i1, i2);
this.iE = JU.MeshSlicer.setPoint (fracs, 1 - fD, i1, i3);
if (this.iD == i1 && this.iE == i1) {
this.doClear = toss23;
this.doCap = false;
return false;
}if (this.iD == i2 && this.iE == i3) {
this.doClear = !toss23;
return !this.doClear;
}if (this.iD == i1 || this.iE == i1) {
this.doClear = toss23;
if (this.iD < 0) {
this.iD = (toss23 ? i2 : i3);
} else if (this.iE < 0) {
this.iE = (toss23 ? i3 : i2);
}return this.doCap;
}this.doGhost = false;
return true;
}, "~A,~N,~N,~N,~N,~B");
c$.setPoint = Clazz.defineMethod (c$, "setPoint", 
 function (fracs, i, i0, i1) {
return (fracs[i] == 0 ? i0 : fracs[i] == 1 ? i1 : -1);
}, "~A,~N,~N,~N");
Clazz.defineMethod (c$, "checkSlab", 
 function (tokType, v, val, distance, bs) {
var d;
switch (tokType) {
case 3:
return (val >= 0 && bs.get (Clazz.floatToInt (val)) ? 1 : -1);
case 32:
d = distance - val;
break;
case 64:
d = val - distance;
break;
case 134217750:
d = (v.dot (this.norm) + this.wPlane) / this.dPlane;
break;
default:
var dmin = 2147483647;
for (var i = this.pts.length; --i >= 0; ) {
d = this.pts[i].distance (v);
if (d < dmin) dmin = d;
}
d = (distance > 0 ? dmin - distance : -distance - dmin);
break;
}
return (Math.abs (d) < 0.0001 ? 0 : d);
}, "~N,JU.T3,~N,~N,JU.BS");
Clazz.defineMethod (c$, "interpolateSphere", 
 function (v1, v2, d1, d2, absD, val1, val2, i) {
return this.interpolateFraction (v1, v2, JU.MeshSurface.getSphericalInterpolationFraction (absD, d1, d2, v1.distance (v2)), val1, val2, i);
}, "JU.T3,JU.T3,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "interpolatePoint", 
 function (v1, v2, d1, d2, val1, val2, i) {
return this.interpolateFraction (v1, v2, d1 / (d1 + d2), val1, val2, i);
}, "JU.T3,JU.T3,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "interpolateFraction", 
 function (v1, v2, f, val1, val2, i) {
if (f < 0.0001) f = 0;
 else if (f > 0.9999) f = 1;
this.fracs[i] = f;
this.values[i] = (val2 - val1) * f + val1;
return JU.P3.new3 (v1.x + (v2.x - v1.x) * f, v1.y + (v2.y - v1.y) * f, v1.z + (v2.z - v1.z) * f);
}, "JU.T3,JU.T3,~N,~N,~N,~N");
Clazz.defineMethod (c$, "slabBrillouin", 
function (unitCellPoints) {
var m = this.m;
var vectors = (unitCellPoints == null ? m.oabc : unitCellPoints);
if (vectors == null) return;
var pts =  new Array (27);
pts[0] = JU.P3.newP (vectors[0]);
var pt = 0;
for (var i = -1; i <= 1; i++) for (var j = -1; j <= 1; j++) for (var k = -1; k <= 1; k++) if (i != 0 || j != 0 || k != 0) {
pts[++pt] = JU.P3.newP (pts[0]);
pts[pt].scaleAdd2 (i, vectors[1], pts[pt]);
pts[pt].scaleAdd2 (j, vectors[2], pts[pt]);
pts[pt].scaleAdd2 (k, vectors[3], pts[pt]);
}


var ptTemp =  new JU.P3 ();
var planeGammaK =  new JU.P4 ();
var vGammaToKPoint =  new JU.V3 ();
var vTemp =  new JU.V3 ();
var bsMoved =  new JU.BS ();
var mapEdge =  new java.util.Hashtable ();
m.bsSlabGhost =  new JU.BS ();
for (var i = 1; i < 27; i++) {
vGammaToKPoint.setT (pts[i]);
JU.Measure.getBisectingPlane (pts[0], vGammaToKPoint, ptTemp, vTemp, planeGammaK);
this.getIntersection (1, planeGammaK, null, null, null, null, null, false, false, 134217750, true);
bsMoved.clearAll ();
mapEdge.clear ();
for (var j = m.bsSlabGhost.nextSetBit (0); j >= 0; j = m.bsSlabGhost.nextSetBit (j + 1)) {
if (m.setABC (j) == null) continue;
var p = JU.AU.arrayCopyRangeI (m.pis[j], 0, -1);
for (var k = 0; k < 3; k++) {
var pk = p[k];
p[k] = this.addIntersectionVertex (m.vs[pk], m.vvs[pk], m.vertexSource == null ? 0 : m.vertexSource[pk], m.vertexSets == null ? 0 : m.vertexSets[pk], mapEdge, 0, pk);
if (pk != p[k] && bsMoved.get (pk)) bsMoved.set (p[k]);
}
m.addPolygon (p, m.bsSlabDisplay);
for (var k = 0; k < 3; k++) if (!bsMoved.get (p[k])) {
bsMoved.set (p[k]);
m.vs[p[k]].sub (vGammaToKPoint);
}
}
if (m.bsSlabGhost.nextSetBit (0) >= 0) {
m.bsSlabGhost.clearAll ();
i = 0;
}}
m.bsSlabGhost = null;
var bi =  new JU.BoxInfo ();
if (m.pc == 0) {
for (var i = m.vc; --i >= 0; ) bi.addBoundBoxPoint (m.vs[i]);

} else {
var bsDone =  new JU.BS ();
for (var i = m.pc; --i >= 0; ) {
var f = m.setABC (i);
if (f != null) for (var j = 3; --j >= 0; ) if (!bsDone.get (f[j])) {
bi.addBoundBoxPoint (m.vs[f[j]]);
bsDone.set (f[j]);
}
}
}m.setBoundingBox (bi.getBoundBoxPoints (false));
}, "~A");
Clazz.defineMethod (c$, "addIntersectionVertex", 
function (vertex, value, source, set, mapEdge, i1, i2) {
var key = this.getKey (i1, i2);
if (key.length > 0) {
var v = mapEdge.get (key);
if (v != null) return v.intValue ();
}if (this.m.vertexSource != null) {
if (this.m.vc >= this.m.vertexSource.length) this.m.vertexSource = JU.AU.doubleLengthI (this.m.vertexSource);
this.m.vertexSource[this.m.vc] = source;
}if (this.m.vertexSets != null) {
if (this.m.vc >= this.m.vertexSets.length) this.m.vertexSets = JU.AU.doubleLengthI (this.m.vertexSets);
this.m.vertexSets[this.m.vc] = set;
}var i = this.m.addVCVal (vertex, value, true);
if (key.length > 0) mapEdge.put (key, Integer.$valueOf (i));
return i;
}, "JU.T3,~N,~N,~N,java.util.Map,~N,~N");
Clazz.defineMethod (c$, "getKey", 
function (i1, i2) {
return (i1 < 0 ? "" : i1 > i2 ? i2 + "_" + i1 : i1 + "_" + i2);
}, "~N,~N");
Clazz.defineMethod (c$, "addTriangle", 
function (ipt1, ipt2, ipt3) {
this.m.addPolygonV3 (ipt1, ipt2, ipt3, 0, 0, 0, this.m.bsSlabDisplay);
}, "~N,~N,~N");
});
