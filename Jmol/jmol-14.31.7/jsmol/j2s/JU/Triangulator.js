Clazz.declarePackage ("JU");
Clazz.load (["JU.TriangleData"], "JU.Triangulator", ["JU.AU", "$.BS", "$.Lst", "$.P3"], function () {
c$ = Clazz.declareType (JU, "Triangulator", JU.TriangleData);
Clazz.defineMethod (c$, "intersectPlane", 
function (plane, vertices, flags) {
var v =  new JU.Lst ();
var edgePoints =  new Array (12);
var insideMask = 0;
var values =  Clazz.newFloatArray (8, 0);
for (var i = 0; i < 8; i++) {
values[i] = plane.x * vertices[i].x + plane.y * vertices[i].y + plane.z * vertices[i].z + plane.w;
if (values[i] < 0) insideMask |= JU.TriangleData.Pwr2[i];
}
var triangles = JU.TriangleData.triangleTable2[insideMask];
if (triangles == null) return null;
for (var i = 0; i < 24; i += 2) {
var v1 = JU.TriangleData.edgeVertexes[i];
var v2 = JU.TriangleData.edgeVertexes[i + 1];
var result = JU.P3.newP (vertices[v2]);
result.sub (vertices[v1]);
result.scale (values[v1] / (values[v1] - values[v2]));
result.add (vertices[v1]);
edgePoints[i >> 1] = result;
}
if (flags == 0) {
var bsPoints =  new JU.BS ();
for (var i = 0; i < triangles.length; i++) {
bsPoints.set (triangles[i]);
if (i % 4 == 2) i++;
}
var nPoints = bsPoints.cardinality ();
var pts =  new Array (nPoints);
v.addLast (pts);
var list =  Clazz.newIntArray (12, 0);
var ptList = 0;
for (var i = 0; i < triangles.length; i++) {
var pt = triangles[i];
if (bsPoints.get (pt)) {
bsPoints.clear (pt);
pts[ptList] = edgePoints[pt];
list[pt] = ptList++;
}if (i % 4 == 2) i++;
}
var polygons = JU.AU.newInt2 (triangles.length >> 2);
v.addLast (polygons);
for (var i = 0; i < triangles.length; i++) polygons[i >> 2] =  Clazz.newIntArray (-1, [list[triangles[i++]], list[triangles[i++]], list[triangles[i++]], triangles[i]]);

return v;
}for (var i = 0; i < triangles.length; i++) {
var pt1 = edgePoints[triangles[i++]];
var pt2 = edgePoints[triangles[i++]];
var pt3 = edgePoints[triangles[i++]];
if ((flags & 1) == 1) v.addLast ( Clazz.newArray (-1, [pt1, pt2, pt3]));
if ((flags & 2) == 2) {
var b = triangles[i];
if ((b & 1) == 1) v.addLast ( Clazz.newArray (-1, [pt1, pt2]));
if ((b & 2) == 2) v.addLast ( Clazz.newArray (-1, [pt2, pt3]));
if ((b & 4) == 4) v.addLast ( Clazz.newArray (-1, [pt1, pt3]));
}}
return v;
}, "JU.P4,~A,~N");
Clazz.defineStatics (c$,
"fullCubePolygon",  Clazz.newArray (-1, [ Clazz.newIntArray (-1, [0, 4, 5, 3]),  Clazz.newIntArray (-1, [5, 1, 0, 3]),  Clazz.newIntArray (-1, [1, 5, 6, 2]),  Clazz.newIntArray (-1, [6, 2, 1, 3]),  Clazz.newIntArray (-1, [2, 6, 7, 2]),  Clazz.newIntArray (-1, [7, 3, 2, 3]),  Clazz.newIntArray (-1, [3, 7, 4, 2]),  Clazz.newIntArray (-1, [4, 0, 3, 2]),  Clazz.newIntArray (-1, [6, 5, 4, 0]),  Clazz.newIntArray (-1, [4, 7, 6, 0]),  Clazz.newIntArray (-1, [0, 1, 2, 0]),  Clazz.newIntArray (-1, [2, 3, 0, 0])]));
});
