Clazz.declarePackage ("J.export");
Clazz.load (["J.export.__CartesianExporter"], "J.export._MayaExporter", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.nBalls = 0;
this.nCyl = 0;
this.name = null;
this.id = null;
Clazz.instantialize (this, arguments);
}, J["export"], "_MayaExporter", J["export"].__CartesianExporter);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J["export"]._MayaExporter, []);
this.commentChar = "// ";
});
Clazz.overrideMethod (c$, "outputHeader", 
function () {
this.output ("//  Maya ASCII 8.5 scene\n");
this.output ("//  Name: ball_stripped.ma\n");
this.output ("//  Last modified: Thu, Jul 5, 2007 10:25:55 PM\n");
this.output ("//  Codeset: UTF-8\n");
this.output ("requires maya \"8.5\";\n");
this.output ("currentUnit -l centimeter -a degree -t film;\n");
this.output ("fileInfo \"application\" \"maya\";\n");
this.output ("fileInfo \"product\" \"Maya Unlimited 8.5\";\n");
this.output ("fileInfo \"version\" \"8.5\";\n");
this.output ("fileInfo \"cutIdentifier\" \"200612170012-692032\";\n");
this.output ("fileInfo \"osv\" \"Mac OS X 10.4.9\";  \n");
});
Clazz.defineMethod (c$, "addAttr", 
 function () {
this.output (" setAttr -k off \".v\";\n");
this.output (" setAttr \".vir\" yes;\n");
this.output (" setAttr \".vif\" yes;\n");
this.output (" setAttr \".tw\" yes;\n");
this.output (" setAttr \".covm[0]\"  0 1 1;\n");
this.output (" setAttr \".cdvm[0]\"  0 1 1;\n");
});
Clazz.defineMethod (c$, "addConnect", 
 function () {
this.output (" connectAttr \"make" + this.name + ".os\" \"" + this.id + ".cr\";\n");
this.output ("connectAttr \"" + this.id + ".iog\" \":initialShadingGroup.dsm\" -na;\n");
});
Clazz.defineMethod (c$, "setAttr", 
 function (attr, val) {
this.output (" setAttr \"." + attr + "\" " + val + ";\n");
}, "~S,~N");
Clazz.defineMethod (c$, "setAttr", 
 function (attr, val) {
this.output (" setAttr \"." + attr + "\" " + val + ";\n");
}, "~S,~N");
Clazz.defineMethod (c$, "setAttr", 
 function (attr, pt) {
this.output (" setAttr \"." + attr + "\" -type \"double3\" " + pt.x + " " + pt.y + " " + pt.z + ";\n");
}, "~S,JU.T3");
Clazz.overrideMethod (c$, "outputCylinder", 
function (ptCenter, pt1, pt2, colix, endcaps, radius, ptX, ptY, checkRadius) {
if (ptX != null) return false;
this.nCyl++;
this.name = "nurbsCylinder" + this.nCyl;
this.id = "nurbsCylinderShape" + this.nCyl;
this.output (" createNode transform -n \"" + this.name + "\";\n");
var length = pt1.distance (pt2);
this.tempV1.ave (pt2, pt1);
this.setAttr ("t", this.tempV1);
this.tempV1.sub (pt1);
this.tempV2.setT (this.tempV1);
this.tempV2.normalize ();
var r = this.tempV1.length ();
var rX = Math.acos (this.tempV1.y / r) * 57.29578;
if (this.tempV1.x < 0) rX += 180;
var rY = Math.atan2 (this.tempV1.x, this.tempV1.z) * 57.29578;
this.tempV2.set (rX, rY, 0);
this.setAttr ("r", this.tempV2);
this.output (" createNode nurbsSurface -n \"" + this.id + "\" -p \"" + this.name + "\";\n");
this.addAttr ();
this.output ("createNode makeNurbCylinder -n \"make" + this.name + "\";\n");
this.output (" setAttr \".ax\" -type \"double3\" 0 1 0;\n");
this.setAttr ("r", radius);
this.setAttr ("s", 4);
this.setAttr ("hr", length / radius);
this.addConnect ();
return true;
}, "JU.P3,JU.P3,JU.P3,~N,~N,~N,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "outputSphere", 
function (pt, radius, colix, checkRadius) {
this.nBalls++;
this.name = "nurbsSphere" + this.nBalls;
this.id = "nurbsSphereShape" + this.nBalls;
this.output ("createNode transform -n \"" + this.name + "\";\n");
this.setAttr ("t", pt);
this.output ("createNode nurbsSurface -n \"" + this.id + "\" -p \"" + this.name + "\";\n");
this.addAttr ();
this.output ("createNode makeNurbSphere -n \"make" + this.name + "\";\n");
this.output (" setAttr \".ax\" -type \"double3\" 0 1 0;\n");
this.setAttr ("r", radius);
this.setAttr ("s", 4);
this.setAttr ("nsp", 3);
this.addConnect ();
}, "JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "drawTextPixel", 
function (argb, x, y, z) {
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "outputTextPixel", 
function (pt, argb) {
}, "JU.P3,~N");
Clazz.overrideMethod (c$, "outputSurface", 
function (vertices, normals, colixes, indices, polygonColixes, nVertices, nPolygons, nTriangles, bsPolygons, faceVertexMax, colix, colorList, htColixes, offset) {
}, "~A,~A,~A,~A,~A,~N,~N,~N,JU.BS,~N,~N,JU.Lst,java.util.Map,JU.P3");
Clazz.overrideMethod (c$, "outputTriangle", 
function (pt1, pt2, pt3, colix) {
}, "JU.T3,JU.T3,JU.T3,~N");
Clazz.overrideMethod (c$, "outputCircle", 
function (pt1, pt2, radius, colix, doFill) {
}, "JU.P3,JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCone", 
function (ptBase, ptTip, radius, colix) {
}, "JU.P3,JU.P3,~N,~N");
Clazz.overrideMethod (c$, "outputEllipsoid", 
function (center, points, colix) {
}, "JU.P3,~A,~N");
Clazz.overrideMethod (c$, "outputFace", 
function (is, coordMap, faceVertexMax) {
}, "~A,~A,~N");
Clazz.defineMethod (c$, "output", 
function (pt) {
}, "JU.T3");
});
