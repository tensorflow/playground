Clazz.declarePackage ("JU");
Clazz.load (["JU.AU"], "JU.Geodesic", ["java.lang.NullPointerException", "$.Short", "java.util.Hashtable", "JU.V3"], function () {
c$ = Clazz.declareType (JU, "Geodesic");
c$.getNeighborVertexesArrays = Clazz.defineMethod (c$, "getNeighborVertexesArrays", 
function () {
if (JU.Geodesic.vertexCounts == null) JU.Geodesic.createGeodesic (3);
return JU.Geodesic.neighborVertexesArrays;
});
c$.getVertexCount = Clazz.defineMethod (c$, "getVertexCount", 
function (level) {
if (JU.Geodesic.vertexCounts == null) JU.Geodesic.createGeodesic (3);
return JU.Geodesic.vertexCounts[level];
}, "~N");
c$.getVertexVectors = Clazz.defineMethod (c$, "getVertexVectors", 
function () {
if (JU.Geodesic.vertexCounts == null) JU.Geodesic.createGeodesic (3);
return JU.Geodesic.vertexVectors;
});
c$.getVertexVector = Clazz.defineMethod (c$, "getVertexVector", 
function (i) {
return JU.Geodesic.vertexVectors[i];
}, "~N");
c$.getFaceVertexes = Clazz.defineMethod (c$, "getFaceVertexes", 
function (level) {
return JU.Geodesic.faceVertexesArrays[level];
}, "~N");
c$.createGeodesic = Clazz.defineMethod (c$, "createGeodesic", 
function (lvl) {
if (lvl < JU.Geodesic.currentLevel) return;
JU.Geodesic.currentLevel = lvl;
var v =  Clazz.newShortArray (lvl + 1, 0);
JU.Geodesic.neighborVertexesArrays = JU.AU.newShort2 (lvl + 1);
JU.Geodesic.faceVertexesArrays = JU.AU.newShort2 (lvl + 1);
JU.Geodesic.vertexVectors =  new Array (12);
JU.Geodesic.vertexVectors[0] = JU.V3.new3 (0, 0, JU.Geodesic.halfRoot5);
for (var i = 0; i < 5; ++i) {
JU.Geodesic.vertexVectors[i + 1] = JU.V3.new3 (Math.cos (i * 1.2566371), Math.sin (i * 1.2566371), 0.5);
JU.Geodesic.vertexVectors[i + 6] = JU.V3.new3 (Math.cos (i * 1.2566371 + 0.62831855), Math.sin (i * 1.2566371 + 0.62831855), -0.5);
}
JU.Geodesic.vertexVectors[11] = JU.V3.new3 (0, 0, -JU.Geodesic.halfRoot5);
for (var i = 12; --i >= 0; ) JU.Geodesic.vertexVectors[i].normalize ();

JU.Geodesic.faceVertexesArrays[0] = JU.Geodesic.faceVertexesIcosahedron;
JU.Geodesic.neighborVertexesArrays[0] = JU.Geodesic.neighborVertexesIcosahedron;
v[0] = 12;
for (var i = 0; i < lvl; ++i) JU.Geodesic.quadruple (i, v);

JU.Geodesic.vertexCounts = v;
}, "~N");
c$.quadruple = Clazz.defineMethod (c$, "quadruple", 
 function (level, counts) {
JU.Geodesic.htVertex =  new java.util.Hashtable ();
var oldVertexCount = JU.Geodesic.vertexVectors.length;
var oldFaceVertexes = JU.Geodesic.faceVertexesArrays[level];
var oldFaceVertexesLength = oldFaceVertexes.length;
var oldFaceCount = Clazz.doubleToInt (oldFaceVertexesLength / 3);
var oldEdgesCount = oldVertexCount + oldFaceCount - 2;
var newVertexCount = oldVertexCount + oldEdgesCount;
var newFaceCount = 4 * oldFaceCount;
JU.Geodesic.vertexVectors = JU.AU.arrayCopyObject (JU.Geodesic.vertexVectors, newVertexCount);
var newFacesVertexes =  Clazz.newShortArray (3 * newFaceCount, 0);
JU.Geodesic.faceVertexesArrays[level + 1] = newFacesVertexes;
var neighborVertexes =  Clazz.newShortArray (6 * newVertexCount, 0);
JU.Geodesic.neighborVertexesArrays[level + 1] = neighborVertexes;
for (var i = neighborVertexes.length; --i >= 0; ) neighborVertexes[i] = -1;

counts[level + 1] = newVertexCount;
JU.Geodesic.vertexNext = oldVertexCount;
var iFaceNew = 0;
for (var i = 0; i < oldFaceVertexesLength; ) {
var iA = oldFaceVertexes[i++];
var iB = oldFaceVertexes[i++];
var iC = oldFaceVertexes[i++];
var iAB = JU.Geodesic.getVertex (iA, iB);
var iBC = JU.Geodesic.getVertex (iB, iC);
var iCA = JU.Geodesic.getVertex (iC, iA);
newFacesVertexes[iFaceNew++] = iA;
newFacesVertexes[iFaceNew++] = iAB;
newFacesVertexes[iFaceNew++] = iCA;
newFacesVertexes[iFaceNew++] = iB;
newFacesVertexes[iFaceNew++] = iBC;
newFacesVertexes[iFaceNew++] = iAB;
newFacesVertexes[iFaceNew++] = iC;
newFacesVertexes[iFaceNew++] = iCA;
newFacesVertexes[iFaceNew++] = iBC;
newFacesVertexes[iFaceNew++] = iCA;
newFacesVertexes[iFaceNew++] = iAB;
newFacesVertexes[iFaceNew++] = iBC;
JU.Geodesic.addNeighboringVertexes (neighborVertexes, iAB, iA);
JU.Geodesic.addNeighboringVertexes (neighborVertexes, iAB, iCA);
JU.Geodesic.addNeighboringVertexes (neighborVertexes, iAB, iBC);
JU.Geodesic.addNeighboringVertexes (neighborVertexes, iAB, iB);
JU.Geodesic.addNeighboringVertexes (neighborVertexes, iBC, iB);
JU.Geodesic.addNeighboringVertexes (neighborVertexes, iBC, iCA);
JU.Geodesic.addNeighboringVertexes (neighborVertexes, iBC, iC);
JU.Geodesic.addNeighboringVertexes (neighborVertexes, iCA, iC);
JU.Geodesic.addNeighboringVertexes (neighborVertexes, iCA, iA);
}
if (true) {
var vertexCount = JU.Geodesic.vertexVectors.length;
if (iFaceNew != newFacesVertexes.length) throw  new NullPointerException ();
if (JU.Geodesic.vertexNext != newVertexCount) throw  new NullPointerException ();
for (var i = 0; i < 12; ++i) {
for (var j = 0; j < 5; ++j) {
var neighbor = neighborVertexes[i * 6 + j];
if (neighbor < 0) throw  new NullPointerException ();
if (neighbor >= vertexCount) throw  new NullPointerException ();
if (neighborVertexes[i * 6 + 5] != -1) throw  new NullPointerException ();
}
}
for (var i = 72; i < neighborVertexes.length; ++i) {
var neighbor = neighborVertexes[i];
if (neighbor < 0) throw  new NullPointerException ();
if (neighbor >= vertexCount) throw  new NullPointerException ();
}
for (var i = 0; i < newVertexCount; ++i) {
var neighborCount = 0;
for (var j = neighborVertexes.length; --j >= 0; ) if (neighborVertexes[j] == i) ++neighborCount;

if ((i < 12 && neighborCount != 5) || (i >= 12 && neighborCount != 6)) throw  new NullPointerException ();
var faceCount = 0;
for (var j = newFacesVertexes.length; --j >= 0; ) if (newFacesVertexes[j] == i) ++faceCount;

if ((i < 12 && faceCount != 5) || (i >= 12 && faceCount != 6)) throw  new NullPointerException ();
}
}JU.Geodesic.htVertex = null;
}, "~N,~A");
c$.addNeighboringVertexes = Clazz.defineMethod (c$, "addNeighboringVertexes", 
 function (neighborVertexes, v1, v2) {
for (var i = v1 * 6, iMax = i + 6; i < iMax; ++i) {
if (neighborVertexes[i] == v2) return;
if (neighborVertexes[i] < 0) {
neighborVertexes[i] = v2;
for (var j = v2 * 6, jMax = j + 6; j < jMax; ++j) {
if (neighborVertexes[j] == v1) return;
if (neighborVertexes[j] < 0) {
neighborVertexes[j] = v1;
return;
}}
}}
throw  new NullPointerException ();
}, "~A,~N,~N");
c$.getVertex = Clazz.defineMethod (c$, "getVertex", 
 function (v1, v2) {
if (v1 > v2) {
var t = v1;
v1 = v2;
v2 = t;
}var hashKey = Integer.$valueOf ((v1 << 16) + v2);
var iv = JU.Geodesic.htVertex.get (hashKey);
if (iv != null) {
return iv.shortValue ();
}var newVertexVector = JU.Geodesic.vertexVectors[JU.Geodesic.vertexNext] =  new JU.V3 ();
newVertexVector.add2 (JU.Geodesic.vertexVectors[v1], JU.Geodesic.vertexVectors[v2]);
newVertexVector.normalize ();
JU.Geodesic.htVertex.put (hashKey, Short.$valueOf (JU.Geodesic.vertexNext));
return JU.Geodesic.vertexNext++;
}, "~N,~N");
c$.halfRoot5 = c$.prototype.halfRoot5 = (0.5 * Math.sqrt (5));
Clazz.defineStatics (c$,
"oneFifth", 1.2566371,
"oneTenth", 0.62831855,
"faceVertexesIcosahedron",  Clazz.newShortArray (-1, [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 1, 1, 6, 2, 2, 7, 3, 3, 8, 4, 4, 9, 5, 5, 10, 1, 6, 1, 10, 7, 2, 6, 8, 3, 7, 9, 4, 8, 10, 5, 9, 11, 6, 10, 11, 7, 6, 11, 8, 7, 11, 9, 8, 11, 10, 9]),
"neighborVertexesIcosahedron",  Clazz.newShortArray (-1, [1, 2, 3, 4, 5, -1, 0, 5, 10, 6, 2, -1, 0, 1, 6, 7, 3, -1, 0, 2, 7, 8, 4, -1, 0, 3, 8, 9, 5, -1, 0, 4, 9, 10, 1, -1, 1, 10, 11, 7, 2, -1, 2, 6, 11, 8, 3, -1, 3, 7, 11, 9, 4, -1, 4, 8, 11, 10, 5, -1, 5, 9, 11, 6, 1, -1, 6, 7, 8, 9, 10, -1]),
"standardLevel", 3,
"maxLevel", 3,
"vertexCounts", null,
"vertexVectors", null,
"faceVertexesArrays", null,
"neighborVertexesArrays", null,
"currentLevel", 0,
"vertexNext", 0,
"htVertex", null,
"VALIDATE", true);
});
