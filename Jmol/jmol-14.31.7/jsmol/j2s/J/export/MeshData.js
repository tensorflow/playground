Clazz.declarePackage ("J.export");
Clazz.load (null, "J.export.MeshData", ["JU.AU", "$.P3", "$.V3", "JU.MeshSurface"], function () {
c$ = Clazz.declareType (J["export"], "MeshData");
c$.getCircleData = Clazz.defineMethod (c$, "getCircleData", 
function () {
var ndeg = 10;
var n = Clazz.doubleToInt (360 / ndeg);
var vertexCount = n + 1;
var faces = JU.AU.newInt2 (n);
for (var i = 0; i < n; i++) {
faces[i] =  Clazz.newIntArray (-1, [i, (i + 1) % n, n]);
}
var vertexes =  new Array (vertexCount);
var normals =  new Array (vertexCount);
for (var i = 0; i < n; i++) {
var x = (Math.cos (i * ndeg / 180. * 3.141592653589793));
var y = (Math.sin (i * ndeg / 180. * 3.141592653589793));
vertexes[i] = JU.P3.new3 (x, y, 0);
normals[i] = JU.P3.new3 (0, 0, 1);
}
vertexes[n] = JU.P3.new3 (0, 0, 0);
normals[n] = JU.P3.new3 (0, 0, 1);
return JU.MeshSurface.newMesh (false, vertexes, 0, faces, normals, 0);
});
c$.getTriangleData = Clazz.defineMethod (c$, "getTriangleData", 
function (pt1, pt2, pt3) {
var vertexes =  Clazz.newArray (-1, [pt1, pt2, pt3]);
var v1 = JU.V3.newVsub (pt3, pt1);
var v2 = JU.V3.newVsub (pt2, pt1);
v2.cross (v2, v1);
v2.normalize ();
var normals =  Clazz.newArray (-1, [v2, v2, v2]);
var faces =  Clazz.newArray (-1, [ Clazz.newIntArray (-1, [0, 1, 2])]);
return JU.MeshSurface.newMesh (false, vertexes, 0, faces, normals, 0);
}, "JU.T3,JU.T3,JU.T3");
c$.getConeData = Clazz.defineMethod (c$, "getConeData", 
function () {
var ndeg = 10;
var n = Clazz.doubleToInt (360 / ndeg);
var vertices =  new Array (n + 1);
var faces = JU.AU.newInt2 (n);
for (var i = 0; i < n; i++) faces[i] =  Clazz.newIntArray (-1, [i, (i + 1) % n, n]);

var d = ndeg / 180. * 3.141592653589793;
for (var i = 0; i < n; i++) {
var x = (Math.cos (i * d));
var y = (Math.sin (i * d));
vertices[i] = JU.P3.new3 (x, y, 0);
}
vertices[n] = JU.P3.new3 (0, 0, 1);
return JU.MeshSurface.newMesh (false, vertices, 0, faces, vertices, 0);
});
c$.getCylinderData = Clazz.defineMethod (c$, "getCylinderData", 
function (inSide) {
var ndeg = 10;
var vertexCount = Clazz.doubleToInt (360 / ndeg) * 2;
var n = Clazz.doubleToInt (vertexCount / 2);
var faces = JU.AU.newInt2 (vertexCount);
var fpt = -1;
for (var i = 0; i < n; i++) {
if (inSide) {
faces[++fpt] =  Clazz.newIntArray (-1, [i + n, (i + 1) % n, i]);
faces[++fpt] =  Clazz.newIntArray (-1, [i + n, (i + 1) % n + n, (i + 1) % n]);
} else {
faces[++fpt] =  Clazz.newIntArray (-1, [i, (i + 1) % n, i + n]);
faces[++fpt] =  Clazz.newIntArray (-1, [(i + 1) % n, (i + 1) % n + n, i + n]);
}}
var vertexes =  new Array (vertexCount);
var normals =  new Array (vertexCount);
for (var i = 0; i < n; i++) {
var x = (Math.cos (i * ndeg / 180. * 3.141592653589793));
var y = (Math.sin (i * ndeg / 180. * 3.141592653589793));
vertexes[i] = JU.P3.new3 (x, y, 0);
normals[i] = JU.P3.new3 (x, y, 0);
}
for (var i = 0; i < n; i++) {
var x = (Math.cos ((i + 0.5) * ndeg / 180 * 3.141592653589793));
var y = (Math.sin ((i + 0.5) * ndeg / 180 * 3.141592653589793));
vertexes[i + n] = JU.P3.new3 (x, y, 1);
normals[i + n] = normals[i];
}
if (inSide) for (var i = 0; i < n; i++) normals[i].scale (-1);

return JU.MeshSurface.newMesh (false, vertexes, 0, faces, normals, 0);
}, "~B");
});
