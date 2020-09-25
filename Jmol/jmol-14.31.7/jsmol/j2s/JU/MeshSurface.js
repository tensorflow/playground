Clazz.declarePackage ("JU");
Clazz.load (null, "JU.MeshSurface", ["java.lang.Float", "JU.AU", "$.P3", "J.api.Interface", "JU.BoxInfo", "$.C", "$.Geodesic", "$.TempArray"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.slicer = null;
this.oabc = null;
this.meshType = null;
this.vc = 0;
this.vs = null;
this.vvs = null;
this.vertexSource = null;
this.surfaceAtoms = null;
this.pc = 0;
this.pis = null;
this.colorsExplicit = false;
this.isDrawPolygon = false;
this.haveQuads = false;
this.colix = 0;
this.colixBack = 0;
this.isColorSolid = true;
this.offset = null;
this.altVertices = null;
this.pcs = null;
this.vcs = null;
this.normals = null;
this.normalsTemp = null;
this.normalCount = 0;
this.normixCount = 0;
this.bsPolygons = null;
this.mat4 = null;
this.surfaceSet = null;
this.vertexSets = null;
this.nSets = 0;
this.dataOnly = false;
this.lastColor = 0;
this.lastColix = 0;
this.iA = 0;
this.iB = 0;
this.iC = 0;
this.polygonCount0 = 0;
this.vertexCount0 = 0;
this.bsSlabDisplay = null;
this.bsSlabGhost = null;
this.slabMeshType = 0;
this.slabColix = 0;
this.bsDisplay = null;
this.slabOptions = null;
this.mergeVertexCount0 = 0;
this.mergePolygonCount0 = 0;
this.isMerged = false;
Clazz.instantialize (this, arguments);
}, JU, "MeshSurface");
Clazz.defineMethod (c$, "getMeshSlicer", 
function () {
return (this.slicer == null ? this.slicer = (J.api.Interface.getInterface ("JU.MeshSlicer", this.vwr, "script")).set (this) : this.slicer);
});
c$.newMesh = Clazz.defineMethod (c$, "newMesh", 
function (isAlt, vertices, vertexCount, polygonIndexes, normals, nNormals) {
var ms =  new JU.MeshSurface ();
ms.pis = polygonIndexes;
if (isAlt) ms.altVertices = vertices;
 else ms.vs = vertices;
ms.vc = (vertexCount == 0 ? vertices.length : vertexCount);
ms.normals = normals;
ms.normalCount = (nNormals == 0 && normals != null ? normals.length : nNormals);
return ms;
}, "~B,~A,~N,~A,~A,~N");
Clazz.defineMethod (c$, "getVertices", 
function () {
return (this.altVertices == null ? this.vs : this.altVertices);
});
Clazz.defineMethod (c$, "getFaces", 
function () {
return this.pis;
});
Clazz.defineMethod (c$, "setColix", 
function (colix) {
this.colix = colix;
}, "~N");
Clazz.defineMethod (c$, "setColixBack", 
function (colix) {
this.colixBack = colix;
}, "~N");
Clazz.defineMethod (c$, "addV", 
function (vertex, asCopy) {
if (this.vc == 0) this.vs =  new Array (25);
 else if (this.vc == this.vs.length) this.vs = JU.AU.doubleLength (this.vs);
this.vs[this.vc] = (asCopy ? JU.P3.newP (vertex) : vertex);
return this.vc++;
}, "JU.T3,~B");
Clazz.defineMethod (c$, "addTriangle", 
function (vertexA, vertexB, vertexC) {
this.addPolygon ( Clazz.newIntArray (-1, [vertexA, vertexB, vertexC]), null);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "addQuad", 
function (vertexA, vertexB, vertexC, vertexD) {
this.haveQuads = true;
this.addPolygon ( Clazz.newIntArray (-1, [vertexA, vertexB, vertexC, vertexD]), null);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setPolygonCount", 
function (polygonCount) {
this.pc = polygonCount;
if (polygonCount < 0) return;
if (this.pis == null || polygonCount > this.pis.length) this.pis = JU.AU.newInt2 (polygonCount);
}, "~N");
Clazz.defineMethod (c$, "addVCVal", 
function (vertex, value, asCopy) {
if (this.vc == 0) this.vvs =  Clazz.newFloatArray (25, 0);
 else if (this.vc >= this.vvs.length) this.vvs = JU.AU.doubleLengthF (this.vvs);
this.vvs[this.vc] = value;
return this.addV (vertex, asCopy);
}, "JU.T3,~N,~B");
Clazz.defineMethod (c$, "addTriangleCheck", 
function (vertexA, vertexB, vertexC, check, iContour, color) {
return (this.vs == null || this.vvs != null && (Float.isNaN (this.vvs[vertexA]) || Float.isNaN (this.vvs[vertexB]) || Float.isNaN (this.vvs[vertexC])) || Float.isNaN (this.vs[vertexA].x) || Float.isNaN (this.vs[vertexB].x) || Float.isNaN (this.vs[vertexC].x) ? -1 : this.addPolygonV3 (vertexA, vertexB, vertexC, check, iContour, color, null));
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addPolygonV3", 
function (vertexA, vertexB, vertexC, check, iContour, color, bs) {
return (this.dataOnly ? this.addPolygon ( Clazz.newIntArray (-1, [vertexA, vertexB, vertexC, check]), bs) : this.addPolygonC ( Clazz.newIntArray (-1, [vertexA, vertexB, vertexC, check, iContour]), color, bs, (iContour < 0)));
}, "~N,~N,~N,~N,~N,~N,JU.BS");
Clazz.defineMethod (c$, "addPolygonC", 
function (polygon, color, bs, isExplicit) {
if (color != 0) {
if (this.pcs == null || this.pc == 0) this.lastColor = 0;
if (isExplicit) {
this.colorsExplicit = true;
} else {
if (this.pcs == null) {
this.pcs =  Clazz.newShortArray (25, 0);
} else if (this.pc >= this.pcs.length) {
this.pcs = JU.AU.doubleLengthShort (this.pcs);
}this.pcs[this.pc] = (isExplicit ? 2047 : color == this.lastColor ? this.lastColix : (this.lastColix = JU.C.getColix (this.lastColor = color)));
}}return this.addPolygon (polygon, bs);
}, "~A,~N,JU.BS,~B");
Clazz.defineMethod (c$, "addPolygon", 
function (polygon, bs) {
var n = this.pc;
if (n == 0) this.pis = JU.AU.newInt2 (25);
 else if (n == this.pis.length) this.pis = JU.AU.doubleLength (this.pis);
if (bs != null) bs.set (n);
this.pis[this.pc++] = polygon;
return n;
}, "~A,JU.BS");
Clazz.defineMethod (c$, "invalidatePolygons", 
function () {
for (var i = this.pc; --i >= this.mergePolygonCount0; ) if ((this.bsSlabDisplay == null || this.bsSlabDisplay.get (i)) && this.setABC (i) == null) this.pis[i] = null;

});
Clazz.defineMethod (c$, "setABC", 
function (i) {
if (this.bsSlabDisplay != null && !this.bsSlabDisplay.get (i) && (this.bsSlabGhost == null || !this.bsSlabGhost.get (i))) return null;
var polygon = this.pis[i];
if (polygon == null || polygon.length < 3) return null;
this.iA = polygon[0];
this.iB = polygon[1];
this.iC = polygon[2];
return (this.vvs == null || !Float.isNaN (this.vvs[this.iA]) && !Float.isNaN (this.vvs[this.iB]) && !Float.isNaN (this.vvs[this.iC]) ? polygon : null);
}, "~N");
Clazz.defineMethod (c$, "setTranslucentVertices", 
function (bsVertices) {
}, "JU.BS");
Clazz.defineMethod (c$, "getSlabColor", 
function () {
return (this.bsSlabGhost == null ? null : JU.C.getHexCode (this.slabColix));
});
Clazz.defineMethod (c$, "getSlabType", 
function () {
return (this.bsSlabGhost != null && this.slabMeshType == 1073742018 ? "mesh" : null);
});
Clazz.defineMethod (c$, "resetSlab", 
function () {
if (this.slicer != null) this.slicer.slabPolygons (JU.TempArray.getSlabObjectType (1073742333, null, false, null), false);
});
Clazz.defineMethod (c$, "slabPolygonsList", 
function (slabInfo, allowCap) {
this.getMeshSlicer ();
for (var i = 0; i < slabInfo.size (); i++) if (!this.slicer.slabPolygons (slabInfo.get (i), allowCap)) break;

}, "JU.Lst,~B");
Clazz.defineMethod (c$, "slabBrillouin", 
function (unitCellVectors) {
return;
}, "~A");
Clazz.defineMethod (c$, "getResolution", 
function () {
return 0;
});
c$.getSphereData = Clazz.defineMethod (c$, "getSphereData", 
function (lvl) {
JU.Geodesic.createGeodesic (lvl);
var vertexCount = JU.Geodesic.getVertexCount (lvl);
var f = JU.Geodesic.getFaceVertexes (lvl);
var nFaces = Clazz.doubleToInt (f.length / 3);
var faces = JU.AU.newInt2 (nFaces);
for (var i = 0, fpt = 0; i < nFaces; i++) {
faces[i] =  Clazz.newIntArray (-1, [f[fpt++], f[fpt++], f[fpt++]]);
}
var vectors =  new Array (vertexCount);
for (var i = 0; i < vertexCount; i++) vectors[i] = JU.Geodesic.getVertexVector (i);

return JU.MeshSurface.newMesh (true, vectors, 0, faces, vectors, 0);
}, "~N");
Clazz.defineMethod (c$, "setBox", 
function (xyzMin, xyzMax) {
xyzMin.set (3.4028235E38, 3.4028235E38, 3.4028235E38);
xyzMax.set (-3.4028235E38, -3.4028235E38, -3.4028235E38);
for (var i = 0; i < this.vc; i++) {
var p = this.vs[i];
if (!Float.isNaN (p.x)) JU.BoxInfo.addPoint (p, xyzMin, xyzMax, 0);
}
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "setBoundingBox", 
function (boundBoxPoints) {
}, "~A");
c$.getSphericalInterpolationFraction = Clazz.defineMethod (c$, "getSphericalInterpolationFraction", 
function (r, valueA, valueB, d) {
var ra = Math.abs (r + valueA) / d;
var rb = Math.abs (r + valueB) / d;
r /= d;
var ra2 = ra * ra;
var q = ra2 - rb * rb + 1;
var p = 4 * (r * r - ra2);
var factor = (ra < rb ? 1 : -1);
return (((q) + factor * Math.sqrt (q * q + p)) / 2);
}, "~N,~N,~N,~N");
Clazz.defineStatics (c$,
"SEED_COUNT", 25,
"P_CHECK", 3,
"P_CONTOUR", 4,
"P_EXPLICIT_COLOR", 4);
});
