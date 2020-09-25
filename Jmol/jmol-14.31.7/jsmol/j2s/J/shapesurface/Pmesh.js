Clazz.declarePackage ("J.shapesurface");
Clazz.load (["J.shapesurface.Isosurface"], "J.shapesurface.Pmesh", ["java.util.Hashtable", "JU.Measure", "$.P3", "$.V3"], function () {
c$ = Clazz.declareType (J.shapesurface, "Pmesh", J.shapesurface.Isosurface);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapesurface.Pmesh, "initShape", []);
this.myType = "pmesh";
});
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
if (property === "face") {
var m = this.currentMesh;
if (index >= 0 && (index >= this.meshCount || (m = this.meshes[index]) == null)) return null;
return m == null ? null : this.getFace (m);
}return this.getPropI (property, index);
}, "~S,~N");
Clazz.defineMethod (c$, "getFace", 
 function (m) {
if (m.haveQuads) return null;
var vs = m.vs;
var htEdges =  new java.util.Hashtable ();
var v1 = 0;
var v0;
var v01;
var n = 0;
var edge0 = null;
for (var i = m.pc; --i >= 0; ) {
if (m.bsSlabDisplay != null && !m.bsSlabDisplay.get (i)) continue;
var triangle = m.pis[i];
var mask = triangle[3];
for (var j = 0; j < 3; j++) if ((mask & (1 << j)) != 0) {
v1 = triangle[j];
var v2 = triangle[(j + 1) % 3];
var key = v2 + "_" + v1;
if (htEdges.containsKey (key)) {
htEdges.remove (key);
n--;
} else {
n++;
edge0 =  Clazz.newIntArray (-1, [v1, v2]);
htEdges.put (v1 + "_" + v2, edge0);
htEdges.put ("" + v1, edge0);
}}
}
if (n == 0) return null;
var a =  Clazz.newIntArray (n, 2, 0);
a[0] = edge0;
var vectorBA =  new JU.V3 ();
var vectorBC =  new JU.V3 ();
v01 = v0 = a[0][0];
v1 = a[0][1];
var pt = 0;
var min = 0.0001;
while (v1 != v0) {
var edge = htEdges.get ("" + v1);
if (edge == null) break;
var angle = JU.Measure.computeAngle (vs[v01], vs[v1], vs[edge[1]], vectorBA, vectorBC, true);
var d2 = vs[v1].distanceSquared (vs[edge[1]]);
v1 = edge[1];
if (angle < 179 && d2 > min) {
a[++pt] = edge;
v01 = edge[0];
} else {
a[pt][1] = v1;
}}
if (JU.Measure.computeAngle (vs[v01], vs[v1], vs[a[0][1]], vectorBA, vectorBC, true) >= 179 || vs[v1].distanceSquared (vs[a[0][1]]) <= min) {
a[0][0] = a[pt--][0];
}n = (pt < 0 ? 1 : ++pt);
var pts =  new Array (n);
for (var i = 0; i < n; i++) pts[i] = JU.P3.newP (vs[a[i][0]]);

return pts;
}, "J.shape.Mesh");
});
