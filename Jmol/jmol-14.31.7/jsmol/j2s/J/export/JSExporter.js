Clazz.declarePackage ("J.export");
Clazz.load (["J.export.__CartesianExporter", "java.util.Hashtable", "J.export.Export3D", "$.___Exporter"], "J.export.JSExporter", ["java.lang.Boolean", "$.Float", "J.export.UseTable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.htSpheresRendered = null;
this.htObjects = null;
this.html5Applet = null;
this.useTable = null;
this.ret = null;
Clazz.instantialize (this, arguments);
}, J["export"], "JSExporter", J["export"].__CartesianExporter);
Clazz.prepareFields (c$, function () {
this.htSpheresRendered =  new java.util.Hashtable ();
this.htObjects =  new java.util.Hashtable ();
this.ret =  new Array (1);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J["export"].JSExporter, []);
});
Clazz.defineMethod (c$, "jsInitExport", 
 function (applet) {
}, "~O");
Clazz.defineMethod (c$, "jsEndExport", 
 function (applet) {
}, "~O");
Clazz.defineMethod (c$, "jsCylinder", 
 function (applet, id, isNew, pt1, pt2, o) {
}, "~O,~S,~B,JU.P3,JU.P3,~A");
Clazz.defineMethod (c$, "jsSphere", 
 function (applet, id, isNew, pt, o) {
}, "~O,~S,~B,JU.T3,~A");
Clazz.defineMethod (c$, "jsSurface", 
function (applet, vertices, normals, indices, nVertices, nPolygons, nFaces, bsPolygons, faceVertexMax, color, vertexColors, polygonColors) {
}, "~O,~A,~A,~A,~N,~N,~N,JU.BS,~N,~N,~A,~A");
Clazz.defineMethod (c$, "jsTriangle", 
function (applet, color, pt1, pt2, pt3) {
}, "~O,~N,JU.T3,JU.T3,JU.T3");
Clazz.overrideMethod (c$, "outputHeader", 
function () {
this.html5Applet = this.vwr.html5Applet;
this.useTable =  new J["export"].UseTable ("JS");
this.htSpheresRendered.clear ();
this.htObjects.clear ();
this.jsInitExport (this.html5Applet);
});
Clazz.overrideMethod (c$, "outputFooter", 
function () {
this.jsEndExport (this.html5Applet);
this.htSpheresRendered.clear ();
this.htObjects.clear ();
this.useTable = null;
});
Clazz.overrideMethod (c$, "outputSphere", 
function (ptCenter, radius, colix, checkRadius) {
var iRad = Math.round (radius * 100);
var check = J["export"].___Exporter.round (ptCenter) + (checkRadius ? " " + iRad : "");
if (this.htSpheresRendered.get (check) != null) return;
this.htSpheresRendered.put (check, Boolean.TRUE);
var found = this.useTable.getDefRet ("S" + colix + "_" + iRad, this.ret);
var o;
if (found) o = this.htObjects.get (this.ret[0]);
 else this.htObjects.put (this.ret[0], o =  Clazz.newArray (-1, [this.getColor (colix), Float.$valueOf (radius)]));
this.jsSphere (this.html5Applet, this.ret[0], !found, ptCenter, o);
}, "JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCylinder", 
function (ptCenter, pt1, pt2, colix, endcaps, radius, ptX, ptY, checkRadius) {
if (ptX != null) return false;
var length = pt1.distance (pt2);
var found = this.useTable.getDefRet ("C" + colix + "_" + Math.round (length * 100) + "_" + radius + "_" + endcaps, this.ret);
var o;
if (found) o = this.htObjects.get (this.ret[0]);
 else this.htObjects.put (this.ret[0], o =  Clazz.newArray (-1, [this.getColor (colix), Float.$valueOf (length), Float.$valueOf (radius)]));
this.jsCylinder (this.html5Applet, this.ret[0], !found, pt1, pt2, o);
return true;
}, "JU.P3,JU.P3,JU.P3,~N,~N,~N,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "outputCircle", 
function (pt1, pt2, radius, colix, doFill) {
}, "JU.P3,JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputEllipsoid", 
function (center, points, colix) {
}, "JU.P3,~A,~N");
Clazz.overrideMethod (c$, "outputCone", 
function (ptBase, ptTip, radius, colix) {
this.outputCylinder (null, ptBase, ptTip, colix, 0, radius, null, null, false);
}, "JU.P3,JU.P3,~N,~N");
Clazz.defineMethod (c$, "getColor", 
 function (colix) {
return Integer.$valueOf (this.gdata.getColorArgbOrGray (colix));
}, "~N");
Clazz.overrideMethod (c$, "outputSurface", 
function (vertices, normals, vertexColixes, indices, polygonColixes, nVertices, nPolygons, nTriangles, bsPolygons, faceVertexMax, colix, colorList, htColixes, offset) {
var vertexColors = this.getColors (vertexColixes);
var polygonColors = this.getColors (polygonColixes);
this.jsSurface (this.html5Applet, vertices, normals, indices, nVertices, nPolygons, nTriangles, bsPolygons, faceVertexMax, this.gdata.getColorArgbOrGray (colix), vertexColors, polygonColors);
}, "~A,~A,~A,~A,~A,~N,~N,~N,JU.BS,~N,~N,JU.Lst,java.util.Map,JU.P3");
Clazz.overrideMethod (c$, "outputTriangle", 
function (pt1, pt2, pt3, colix) {
this.jsTriangle (this.html5Applet, this.gdata.getColorArgbOrGray (colix), pt1, pt2, pt3);
}, "JU.T3,JU.T3,JU.T3,~N");
Clazz.overrideMethod (c$, "outputTextPixel", 
function (pt, argb) {
}, "JU.P3,~N");
Clazz.overrideMethod (c$, "outputFace", 
function (is, coordMap, faceVertexMax) {
}, "~A,~A,~N");
Clazz.defineMethod (c$, "output", 
function (pt) {
}, "JU.T3");
Clazz.overrideMethod (c$, "plotImage", 
function (x, y, z, image, bgcolix, width, height) {
}, "~N,~N,~N,~O,~N,~N,~N");
Clazz.overrideMethod (c$, "plotText", 
function (x, y, z, colix, text, font3d) {
}, "~N,~N,~N,~N,~S,JU.Font");
Clazz.defineMethod (c$, "getColors", 
 function (colixes) {
if (colixes == null) return null;
var colors =  Clazz.newIntArray (colixes.length, 0);
for (var i = colors.length; --i >= 0; ) {
colors[i] = this.gdata.getColorArgbOrGray (colixes[i]);
}
return colors;
}, "~A");
{
{
Jmol && Jmol.GLmol && Jmol.GLmol.extendJSExporter(J.export.JSExporter.prototype);
}}});
