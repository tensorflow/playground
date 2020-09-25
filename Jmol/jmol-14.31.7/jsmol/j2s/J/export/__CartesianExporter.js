Clazz.declarePackage ("J.export");
Clazz.load (["J.export.___Exporter", "JU.A4", "$.M4"], "J.export.__CartesianExporter", ["java.lang.Float", "java.util.Hashtable", "JU.M3", "$.P3", "JU.C", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewpoint = null;
this.canCapCylinders = false;
this.noColor = false;
this.sphereMatrix = null;
Clazz.instantialize (this, arguments);
}, J["export"], "__CartesianExporter", J["export"].___Exporter);
Clazz.prepareFields (c$, function () {
this.viewpoint =  new JU.A4 ();
this.sphereMatrix =  new JU.M4 ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J["export"].__CartesianExporter, []);
this.exportType = 1;
this.lineWidthMad = 100;
});
Clazz.defineMethod (c$, "getModelCenter", 
function () {
return this.referenceCenter;
});
Clazz.defineMethod (c$, "getCameraPosition", 
function () {
var ptCamera =  new JU.P3 ();
var pt = JU.P3.new3 (Clazz.doubleToInt (this.screenWidth / 2), Clazz.doubleToInt (this.screenHeight / 2), 0);
this.tm.unTransformPoint (pt, ptCamera);
ptCamera.sub (this.center);
this.tempP3.set (Clazz.doubleToInt (this.screenWidth / 2), Clazz.doubleToInt (this.screenHeight / 2), this.cameraDistance * this.scalePixelsPerAngstrom);
this.tm.unTransformPoint (this.tempP3, this.tempP3);
this.tempP3.sub (this.center);
ptCamera.add (this.tempP3);
return this.cameraPosition;
});
Clazz.defineMethod (c$, "setTempPoints", 
 function (ptA, ptB, isCartesian) {
if (isCartesian) {
this.tempP1.setT (ptA);
this.tempP2.setT (ptB);
} else {
this.tm.unTransformPoint (ptA, this.tempP1);
this.tm.unTransformPoint (ptB, this.tempP2);
}}, "JU.P3,JU.P3,~B");
Clazz.defineMethod (c$, "getCoordinateMap", 
function (vertices, coordMap, bsValid) {
var n = 0;
for (var i = 0; i < coordMap.length; i++) {
if (bsValid != null && !bsValid.get (i) || Float.isNaN (vertices[i].x)) {
if (bsValid != null) bsValid.clear (i);
continue;
}coordMap[i] = n++;
}
return n;
}, "~A,~A,JU.BS");
Clazz.defineMethod (c$, "getNormalMap", 
function (normals, nNormals, bsValid, vNormals) {
var htNormals =  new java.util.Hashtable ();
var normalMap =  Clazz.newIntArray (nNormals, 0);
for (var i = 0; i < nNormals; i++) {
var s;
if (bsValid != null && !bsValid.get (i) || Float.isNaN (normals[i].x)) {
if (bsValid != null) bsValid.clear (i);
continue;
}s = this.getTriad (normals[i]) + "\n";
if (htNormals.containsKey (s)) {
normalMap[i] = htNormals.get (s).intValue ();
} else {
normalMap[i] = vNormals.size ();
vNormals.addLast (s);
htNormals.put (s, Integer.$valueOf (normalMap[i]));
}}
return normalMap;
}, "~A,~N,JU.BS,JU.Lst");
Clazz.defineMethod (c$, "outputIndices", 
function (indices, map, nPolygons, bsPolygons, faceVertexMax) {
var isAll = (bsPolygons == null);
var i0 = (isAll ? nPolygons - 1 : bsPolygons.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsPolygons.nextSetBit (i + 1))) this.outputFace (indices[i], map, faceVertexMax);

}, "~A,~A,~N,JU.BS,~N");
Clazz.overrideMethod (c$, "plotText", 
function (x, y, z, colix, text, font3d) {
this.gdata.plotText (x, y, z, this.gdata.getColorArgbOrGray (colix), 0, text, font3d, this.export3D);
}, "~N,~N,~N,~N,~S,JU.Font");
Clazz.overrideMethod (c$, "plotImage", 
function (x, y, z, image, bgcolix, width, height) {
}, "~N,~N,~N,~O,~N,~N,~N");
Clazz.overrideMethod (c$, "drawAtom", 
function (atom, radius) {
if (JU.Logger.debugging) this.outputComment ("atom " + atom);
var colix = atom.colixAtom;
this.outputSphere (atom, radius == 0 ? atom.madAtom / 2000 : radius, colix, JU.C.isColixTranslucent (colix));
}, "JM.Atom,~N");
Clazz.overrideMethod (c$, "drawCircle", 
function (x, y, z, diameter, colix, doFill) {
this.tempP3.set (x, y, z);
this.tm.unTransformPoint (this.tempP3, this.tempP1);
var radius = this.vwr.tm.unscaleToScreen (z, diameter) / 2;
this.tempP3.set (x, y, z + 1);
this.tm.unTransformPoint (this.tempP3, this.tempP3);
this.outputCircle (this.tempP1, this.tempP3, radius, colix, doFill);
}, "~N,~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "drawEllipse", 
function (ptCenter, ptX, ptY, colix, doFill) {
this.tempV1.sub2 (ptX, ptCenter);
this.tempV2.sub2 (ptY, ptCenter);
this.tempV2.cross (this.tempV1, this.tempV2);
this.tempV2.normalize ();
this.tempV2.scale (doFill ? 0.002 : 0.005);
this.tempP1.sub2 (ptCenter, this.tempV2);
this.tempP2.add2 (ptCenter, this.tempV2);
return this.outputCylinder (ptCenter, this.tempP1, this.tempP2, colix, doFill ? 2 : 0, 1.01, ptX, ptY, true);
}, "JU.P3,JU.P3,JU.P3,~N,~B");
Clazz.overrideMethod (c$, "drawPixel", 
function (colix, x, y, z, scale) {
this.tempP3.set (x, y, z);
this.tm.unTransformPoint (this.tempP3, this.tempP1);
this.outputSphere (this.tempP1, 0.02 * scale, colix, true);
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawTextPixel", 
function (argb, x, y, z) {
this.tempP3.set (x, y, z);
this.tm.unTransformPoint (this.tempP3, this.tempP1);
this.outputTextPixel (this.tempP1, argb);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillConeScreen", 
function (colix, endcap, screenDiameter, screenBase, screenTip, isBarb) {
this.tm.unTransformPoint (screenBase, this.tempP1);
this.tm.unTransformPoint (screenTip, this.tempP2);
var radius = this.vwr.tm.unscaleToScreen (screenBase.z, screenDiameter) / 2;
if (radius < 0.05) radius = 0.05;
this.outputCone (this.tempP1, this.tempP2, radius, colix);
}, "~N,~N,~N,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "drawCylinder", 
function (ptA, ptB, colix1, colix2, endcaps, mad, bondOrder) {
this.setTempPoints (ptA, ptB, bondOrder < 0);
var radius = mad / 2000;
if (JU.Logger.debugging) this.outputComment ("bond " + ptA + " " + ptB);
if (colix1 == colix2 || this.noColor) {
this.outputCylinder (null, this.tempP1, this.tempP2, colix1, endcaps, radius, null, null, bondOrder != -1);
} else {
this.tempV2.ave (this.tempP2, this.tempP1);
this.tempP3.setT (this.tempV2);
if (this.solidOnly && endcaps == 0) endcaps = 2;
 else if (this.canCapCylinders && endcaps == 3) endcaps = (this.solidOnly ? 5 : 4);
this.outputCylinder (null, this.tempP3, this.tempP1, colix1, (endcaps == 3 ? 0 : endcaps), radius, null, null, true);
this.outputCylinder (null, this.tempP3, this.tempP2, colix2, (endcaps == 3 ? 0 : endcaps), radius, null, null, true);
if (endcaps == 3) {
this.outputSphere (this.tempP1, radius * 1.01, colix1, bondOrder != -2);
this.outputSphere (this.tempP2, radius * 1.01, colix2, bondOrder != -2);
}}}, "JU.P3,JU.P3,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillCylinderScreenMad", 
function (colix, endcaps, mad, screenA, screenB) {
var radius = mad / 2000;
this.setTempPoints (screenA, screenB, false);
this.outputCylinder (null, this.tempP1, this.tempP2, colix, endcaps, radius, null, null, true);
}, "~N,~N,~N,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "fillCylinderScreen", 
function (colix, endcaps, screenDiameter, screenA, screenB, ptA, ptB, radius) {
if (ptA != null) {
this.drawCylinder (ptA, ptB, colix, colix, endcaps, Math.round (radius * 2000), -1);
return;
}var mad = Math.round (this.vwr.tm.unscaleToScreen ((screenA.z + screenB.z) / 2, screenDiameter) * 1000);
this.fillCylinderScreenMad (colix, endcaps, mad, screenA, screenB);
}, "~N,~N,~N,JU.P3,JU.P3,JU.P3,JU.P3,~N");
Clazz.overrideMethod (c$, "fillEllipsoid", 
function (center, points, colix, x, y, z, diameter, toEllipsoidal, coef, deriv, octantPoints) {
this.outputEllipsoid (center, points, colix);
}, "JU.P3,~A,~N,~N,~N,~N,~N,JU.M3,~A,JU.M4,~A");
Clazz.overrideMethod (c$, "fillSphere", 
function (colix, diameter, pt) {
this.tm.unTransformPoint (pt, this.tempP1);
this.outputSphere (this.tempP1, this.vwr.tm.unscaleToScreen (pt.z, diameter) / 2, colix, true);
}, "~N,~N,JU.P3");
Clazz.overrideMethod (c$, "fillTriangle", 
function (colix, ptA, ptB, ptC, twoSided) {
this.tm.unTransformPoint (ptA, this.tempP1);
this.tm.unTransformPoint (ptB, this.tempP2);
this.tm.unTransformPoint (ptC, this.tempP3);
if (this.solidOnly) {
this.outputSolidPlate (this.tempP1, this.tempP2, this.tempP3, colix);
} else {
this.outputTriangle (this.tempP1, this.tempP2, this.tempP3, colix);
if (twoSided) this.outputTriangle (this.tempP1, this.tempP3, this.tempP2, colix);
}}, "~N,JU.T3,JU.T3,JU.T3,~B");
Clazz.defineMethod (c$, "outputSolidPlate", 
function (tempP1, tempP2, tempP3, colix) {
}, "JU.P3,JU.P3,JU.P3,~N");
Clazz.defineMethod (c$, "setSphereMatrix", 
function (center, rx, ry, rz, a, sphereMatrix) {
if (a != null) {
var m =  new JU.M3 ();
m.m00 = rx;
m.m11 = ry;
m.m22 = rz;
var mq =  new JU.M3 ().setAA (a);
mq.mul (m);
sphereMatrix.setToM3 (mq);
} else {
sphereMatrix.setIdentity ();
sphereMatrix.m00 = rx;
sphereMatrix.m11 = ry;
sphereMatrix.m22 = rz;
}sphereMatrix.m03 = center.x;
sphereMatrix.m13 = center.y;
sphereMatrix.m23 = center.z;
sphereMatrix.m33 = 1;
}, "JU.T3,~N,~N,~N,JU.A4,JU.M4");
});
