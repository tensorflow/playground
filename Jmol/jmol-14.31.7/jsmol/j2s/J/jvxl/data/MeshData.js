Clazz.declarePackage ("J.jvxl.data");
Clazz.load (["JU.MeshSurface"], "J.jvxl.data.MeshData", ["java.lang.Float", "java.util.Arrays", "JU.AU", "$.BS", "$.V3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.setsSuccessful = false;
this.vertexIncrement = 1;
this.polygonColorData = null;
if (!Clazz.isClassDefined ("J.jvxl.data.MeshData.SSet")) {
J.jvxl.data.MeshData.$MeshData$SSet$ ();
}
if (!Clazz.isClassDefined ("J.jvxl.data.MeshData.SortSet")) {
J.jvxl.data.MeshData.$MeshData$SortSet$ ();
}
Clazz.instantialize (this, arguments);
}, J.jvxl.data, "MeshData", JU.MeshSurface);
Clazz.defineMethod (c$, "addVertexCopy", 
function (vertex, value, assocVertex, asCopy) {
if (assocVertex < 0) this.vertexIncrement = -assocVertex;
return this.addVCVal (vertex, value, asCopy);
}, "JU.T3,~N,~N,~B");
Clazz.defineMethod (c$, "getSurfaceSet", 
function () {
return (this.surfaceSet == null ? this.getSurfaceSetForLevel (0) : this.surfaceSet);
});
Clazz.defineMethod (c$, "getSurfaceSetForLevel", 
 function (level) {
if (level == 0) {
this.surfaceSet =  new Array (100);
this.nSets = 0;
}this.setsSuccessful = true;
for (var i = 0; i < this.pc; i++) if (this.pis[i] != null) {
if (this.bsSlabDisplay != null && !this.bsSlabDisplay.get (i)) continue;
var p = this.pis[i];
var pt0 = this.findSet (p[0]);
var pt1 = this.findSet (p[1]);
var pt2 = this.findSet (p[2]);
if (pt0 < 0 && pt1 < 0 && pt2 < 0) {
this.createSet (p[0], p[1], p[2]);
continue;
}if (pt0 == pt1 && pt1 == pt2) continue;
if (pt0 >= 0) {
this.surfaceSet[pt0].set (p[1]);
this.surfaceSet[pt0].set (p[2]);
if (pt1 >= 0 && pt1 != pt0) this.mergeSets (pt0, pt1);
if (pt2 >= 0 && pt2 != pt0 && pt2 != pt1) this.mergeSets (pt0, pt2);
continue;
}if (pt1 >= 0) {
this.surfaceSet[pt1].set (p[0]);
this.surfaceSet[pt1].set (p[2]);
if (pt2 >= 0 && pt2 != pt1) this.mergeSets (pt1, pt2);
continue;
}this.surfaceSet[pt2].set (p[0]);
this.surfaceSet[pt2].set (p[1]);
}
var n = 0;
for (var i = 0; i < this.nSets; i++) if (this.surfaceSet[i] != null) n++;

var temp =  new Array (this.surfaceSet.length);
n = 0;
for (var i = 0; i < this.nSets; i++) if (this.surfaceSet[i] != null) temp[n++] = this.surfaceSet[i];

this.nSets = n;
this.surfaceSet = temp;
if (!this.setsSuccessful && level < 2) this.getSurfaceSetForLevel (level + 1);
if (level == 0) {
var sets =  new Array (this.nSets);
for (var i = 0; i < this.nSets; i++) sets[i] = Clazz.innerTypeInstance (J.jvxl.data.MeshData.SSet, this, null, this.surfaceSet[i]);

java.util.Arrays.sort (sets, Clazz.innerTypeInstance (J.jvxl.data.MeshData.SortSet, this, null));
for (var i = 0; i < this.nSets; i++) this.surfaceSet[i] = sets[i].bs;

this.setVertexSets (false);
}return this.surfaceSet;
}, "~N");
Clazz.defineMethod (c$, "setVertexSets", 
function (onlyIfNull) {
if (this.surfaceSet == null) return;
var nNull = 0;
for (var i = 0; i < this.nSets; i++) {
if (this.surfaceSet[i] != null && this.surfaceSet[i].nextSetBit (0) < 0) this.surfaceSet[i] = null;
if (this.surfaceSet[i] == null) nNull++;
}
if (nNull > 0) {
var bsNew =  new Array (this.nSets - nNull);
for (var i = 0, n = 0; i < this.nSets; i++) if (this.surfaceSet[i] != null) bsNew[n++] = this.surfaceSet[i];

this.surfaceSet = bsNew;
this.nSets -= nNull;
} else if (onlyIfNull) {
return;
}this.vertexSets =  Clazz.newIntArray (this.vc, 0);
for (var i = 0; i < this.nSets; i++) for (var j = this.surfaceSet[i].nextSetBit (0); j >= 0; j = this.surfaceSet[i].nextSetBit (j + 1)) this.vertexSets[j] = i;


}, "~B");
Clazz.defineMethod (c$, "findSet", 
 function (vertex) {
for (var i = 0; i < this.nSets; i++) if (this.surfaceSet[i] != null && this.surfaceSet[i].get (vertex)) return i;

return -1;
}, "~N");
Clazz.defineMethod (c$, "createSet", 
 function (v1, v2, v3) {
var i;
for (i = 0; i < this.nSets; i++) if (this.surfaceSet[i] == null) break;

if (i == this.surfaceSet.length) this.surfaceSet = JU.AU.ensureLength (this.surfaceSet, this.surfaceSet.length + 100);
this.surfaceSet[i] =  new JU.BS ();
this.surfaceSet[i].set (v1);
this.surfaceSet[i].set (v2);
this.surfaceSet[i].set (v3);
if (i == this.nSets) this.nSets++;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "mergeSets", 
 function (a, b) {
this.surfaceSet[a].or (this.surfaceSet[b]);
this.surfaceSet[b] = null;
}, "~N,~N");
Clazz.defineMethod (c$, "invalidateSurfaceSet", 
function (i) {
for (var j = this.surfaceSet[i].nextSetBit (0); j >= 0; j = this.surfaceSet[i].nextSetBit (j + 1)) this.vvs[j] = NaN;

this.surfaceSet[i] = null;
}, "~N");
c$.checkCutoff = Clazz.defineMethod (c$, "checkCutoff", 
function (iA, iB, iC, vertexValues) {
if (iA < 0 || iB < 0 || iC < 0) return false;
var val1 = vertexValues[iA];
var val2 = vertexValues[iB];
var val3 = vertexValues[iC];
return (val1 >= 0 && val2 >= 0 && val3 >= 0 || val1 <= 0 && val2 <= 0 && val3 <= 0);
}, "~N,~N,~N,~A");
c$.calculateVolumeOrArea = Clazz.defineMethod (c$, "calculateVolumeOrArea", 
function (m, thisSet, isArea, getSets) {
if (getSets || m.nSets <= 0) m.getSurfaceSet ();
var justOne = (thisSet >= -1);
var n = (justOne || m.nSets <= 0 ? 1 : m.nSets);
var v =  Clazz.newDoubleArray (n, 0);
var vAB =  new JU.V3 ();
var vAC =  new JU.V3 ();
var vTemp =  new JU.V3 ();
for (var i = m.pc; --i >= 0; ) {
if (m.setABC (i) == null) continue;
var iSet = (m.nSets <= 0 ? 0 : m.vertexSets[m.iA]);
if (thisSet >= 0 && iSet != thisSet) continue;
if (isArea) {
vAB.sub2 (m.vs[m.iB], m.vs[m.iA]);
vAC.sub2 (m.vs[m.iC], m.vs[m.iA]);
vTemp.cross (vAB, vAC);
v[justOne ? 0 : iSet] += vTemp.length ();
} else {
vAB.setT (m.vs[m.iB]);
vAC.setT (m.vs[m.iC]);
vTemp.cross (vAB, vAC);
vAC.setT (m.vs[m.iA]);
v[justOne ? 0 : iSet] += vAC.dot (vTemp);
}}
var factor = (isArea ? 2 : 6);
for (var i = 0; i < n; i++) v[i] /= factor;

if (justOne) return Float.$valueOf (v[0]);
return v;
}, "J.jvxl.data.MeshData,~N,~B,~B");
Clazz.defineMethod (c$, "updateInvalidatedVertices", 
function (bs) {
bs.clearAll ();
for (var i = 0; i < this.vc; i += this.vertexIncrement) if (Float.isNaN (this.vvs[i])) bs.set (i);

}, "JU.BS");
Clazz.defineMethod (c$, "invalidateVertices", 
function (bsInvalid) {
for (var i = bsInvalid.nextSetBit (0); i >= 0; i = bsInvalid.nextSetBit (i + 1)) this.vvs[i] = NaN;

}, "JU.BS");
c$.$MeshData$SSet$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.bs = null;
this.n = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.data.MeshData, "SSet");
Clazz.makeConstructor (c$, 
function (a) {
this.bs = a;
this.n = a.cardinality ();
}, "JU.BS");
c$ = Clazz.p0p ();
};
c$.$MeshData$SortSet$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, J.jvxl.data.MeshData, "SortSet", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (a.n > b.n ? -1 : a.n < b.n ? 1 : 0);
}, "J.jvxl.data.MeshData.SSet,J.jvxl.data.MeshData.SSet");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"MODE_GET_VERTICES", 1,
"MODE_GET_COLOR_INDEXES", 2,
"MODE_PUT_SETS", 3,
"MODE_PUT_VERTICES", 4);
});
