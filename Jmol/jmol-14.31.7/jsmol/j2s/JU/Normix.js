Clazz.declarePackage ("JU");
Clazz.load (["JU.Geodesic"], "JU.Normix", ["JU.BS"], function () {
c$ = Clazz.declareType (JU, "Normix");
c$.getNormixCount = Clazz.defineMethod (c$, "getNormixCount", 
function () {
return (JU.Normix.normixCount > 1 ? JU.Normix.normixCount : (JU.Normix.normixCount = JU.Geodesic.getVertexCount (3)));
});
c$.newVertexBitSet = Clazz.defineMethod (c$, "newVertexBitSet", 
function () {
return JU.BS.newN (JU.Normix.getNormixCount ());
});
c$.getVertexVectors = Clazz.defineMethod (c$, "getVertexVectors", 
function () {
if (JU.Normix.vertexVectors == null) JU.Normix.vertexVectors = JU.Geodesic.getVertexVectors ();
return JU.Normix.vertexVectors;
});
c$.setInverseNormixes = Clazz.defineMethod (c$, "setInverseNormixes", 
function () {
if (JU.Normix.inverseNormixes != null) return;
JU.Normix.getNormixCount ();
JU.Normix.getVertexVectors ();
JU.Normix.inverseNormixes =  Clazz.newShortArray (JU.Normix.normixCount, 0);
var bsTemp =  new JU.BS ();
for (var n = JU.Normix.normixCount; --n >= 0; ) {
var v = JU.Normix.vertexVectors[n];
JU.Normix.inverseNormixes[n] = JU.Normix.getNormix (-v.x, -v.y, -v.z, 3, bsTemp);
}
});
c$.getInverseNormix = Clazz.defineMethod (c$, "getInverseNormix", 
function (normix) {
return JU.Normix.inverseNormixes[normix];
}, "~N");
c$.getNeighborVertexArrays = Clazz.defineMethod (c$, "getNeighborVertexArrays", 
 function () {
if (JU.Normix.neighborVertexesArrays == null) {
JU.Normix.neighborVertexesArrays = JU.Geodesic.getNeighborVertexesArrays ();
}return JU.Normix.neighborVertexesArrays;
});
c$.getNormixV = Clazz.defineMethod (c$, "getNormixV", 
function (v, bsTemp) {
return JU.Normix.getNormix (v.x, v.y, v.z, 3, bsTemp);
}, "JU.V3,JU.BS");
c$.get2SidedNormix = Clazz.defineMethod (c$, "get2SidedNormix", 
function (v, bsTemp) {
return ~JU.Normix.getNormixV (v, bsTemp);
}, "JU.V3,JU.BS");
c$.getNormix = Clazz.defineMethod (c$, "getNormix", 
 function (x, y, z, geodesicLevel, bsConsidered) {
var champion;
var t;
if (z >= 0) {
champion = 0;
t = z - 1;
} else {
champion = 11;
t = z - (-1);
}bsConsidered.clearAll ();
bsConsidered.set (champion);
JU.Normix.getVertexVectors ();
JU.Normix.getNeighborVertexArrays ();
var championDist2 = x * x + y * y + t * t;
for (var lvl = 0; lvl <= geodesicLevel; ++lvl) {
var neighborVertexes = JU.Normix.neighborVertexesArrays[lvl];
for (var offsetNeighbors = 6 * champion, i = offsetNeighbors + (champion < 12 ? 5 : 6); --i >= offsetNeighbors; ) {
var challenger = neighborVertexes[i];
if (bsConsidered.get (challenger)) continue;
bsConsidered.set (challenger);
var v = JU.Normix.vertexVectors[challenger];
var d;
d = v.x - x;
var d2 = d * d;
if (d2 >= championDist2) continue;
d = v.y - y;
d2 += d * d;
if (d2 >= championDist2) continue;
d = v.z - z;
d2 += d * d;
if (d2 >= championDist2) continue;
champion = challenger;
championDist2 = d2;
}
}
return champion;
}, "~N,~N,~N,~N,JU.BS");
Clazz.defineStatics (c$,
"NORMIX_GEODESIC_LEVEL", 3,
"normixCount", 0,
"vertexVectors", null,
"inverseNormixes", null,
"neighborVertexesArrays", null,
"NORMIX_NULL", 9999);
});
