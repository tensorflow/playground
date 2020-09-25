Clazz.declarePackage ("J.export");
Clazz.load (["J.export.___Exporter"], "J.export.__RayTracerExporter", ["java.lang.Float"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isSlabEnabled = false;
this.minScreenDimension = 0;
this.wasPerspective = false;
Clazz.instantialize (this, arguments);
}, J["export"], "__RayTracerExporter", J["export"].___Exporter);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J["export"].__RayTracerExporter, []);
this.exportType = 2;
this.lineWidthMad = 2;
});
Clazz.defineMethod (c$, "initOutput", 
function (vwr, privateKey, g3d, params) {
this.wasPerspective = vwr.tm.perspectiveDepth;
if (Clazz.superCall (this, J["export"].__RayTracerExporter, "initOutput", [vwr, privateKey, g3d, params])) {
vwr.tm.perspectiveDepth = false;
if (this.wasPerspective) vwr.shm.finalizeAtoms (null, false);
return true;
}return false;
}, "JV.Viewer,~N,JU.GData,java.util.Map");
Clazz.defineMethod (c$, "finalizeOutput2", 
function () {
this.vwr.tm.perspectiveDepth = this.wasPerspective;
return Clazz.superCall (this, J["export"].__RayTracerExporter, "finalizeOutput2", []);
});
Clazz.overrideMethod (c$, "outputVertex", 
function (pt, offset) {
J["export"].___Exporter.setTempVertex (pt, offset, this.tempP1);
this.tm.transformPt3f (this.tempP1, this.tempP1);
this.output (this.tempP1);
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "getScreenNormal", 
function (pt, normal, factor) {
if (Float.isNaN (normal.x)) {
this.tempP3.set (0, 0, 0);
return this.tempP3;
}this.tempP1.add2 (pt, normal);
this.tm.transformPt3f (pt, this.tempP2);
this.tm.transformPt3f (this.tempP1, this.tempP3);
this.tempP3.sub (this.tempP2);
this.tempP3.scale (factor);
return this.tempP3;
}, "JU.T3,JU.T3,~N");
Clazz.defineMethod (c$, "initVars", 
function () {
this.isSlabEnabled = this.tm.slabEnabled;
this.minScreenDimension = Math.min (this.screenWidth, this.screenHeight);
});
Clazz.overrideMethod (c$, "drawAtom", 
function (atom, radius) {
this.outputSphere (atom.sX, atom.sY, atom.sZ, atom.sD / 2, atom.colixAtom);
}, "JM.Atom,~N");
Clazz.overrideMethod (c$, "drawCircle", 
function (x, y, z, diameter, colix, doFill) {
var radius = diameter / 2;
this.outputCircle (x, y, z, radius, colix, doFill);
}, "~N,~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "drawEllipse", 
function (ptAtom, ptX, ptY, colix, doFill) {
return false;
}, "JU.P3,JU.P3,JU.P3,~N,~B");
Clazz.overrideMethod (c$, "drawPixel", 
function (colix, x, y, z, scale) {
this.outputSphere (x, y, z, 0.75 * scale, colix);
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawTextPixel", 
function (argb, x, y, z) {
this.outputTextPixel (x, y, this.fixScreenZ (z), argb);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillConeScreen", 
function (colix, endcap, screenDiameter, screenBase, screenTip, isBarb) {
this.outputCone (screenBase, screenTip, screenDiameter / 2, colix, isBarb);
}, "~N,~N,~N,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "drawCylinder", 
function (screenA, screenB, colix1, colix2, endcaps, madBond, bondOrder) {
if (colix1 == colix2) {
this.fillConicalCylinder (screenA, screenB, madBond, colix1, endcaps);
} else {
this.tempV2.ave (screenB, screenA);
this.tempP1.setT (this.tempV2);
this.fillConicalCylinder (screenA, this.tempP1, madBond, colix1, endcaps);
this.fillConicalCylinder (this.tempP1, screenB, madBond, colix2, endcaps);
}if (endcaps != 3) return;
var radius = this.vwr.tm.scaleToScreen (Clazz.floatToInt (screenA.z), madBond) / 2;
if (radius <= 1) return;
this.outputSphere (screenA.x, screenA.y, screenA.z, radius, colix1);
radius = this.vwr.tm.scaleToScreen (Clazz.floatToInt (screenB.z), madBond) / 2;
if (radius <= 1) return;
this.outputSphere (screenB.x, screenB.y, screenB.z, radius, colix2);
}, "JU.P3,JU.P3,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "fillConicalCylinder", 
function (screenA, screenB, madBond, colix, endcaps) {
var radius1 = this.vwr.tm.scaleToScreen (Clazz.floatToInt (screenA.z), madBond) / 2;
if (radius1 == 0) return;
if (radius1 < 1) radius1 = 1;
if (screenA.distance (screenB) == 0) {
this.outputSphere (screenA.x, screenA.y, screenA.z, radius1, colix);
return;
}var radius2 = this.vwr.tm.scaleToScreen (Clazz.floatToInt (screenB.z), madBond) / 2;
if (radius2 == 0) return;
if (radius2 < 1) radius2 = 1;
this.outputCylinderConical (screenA, screenB, radius1, radius2, colix);
}, "JU.P3,JU.P3,~N,~N,~N");
Clazz.overrideMethod (c$, "fillCylinderScreenMad", 
function (colix, endcaps, diameter, screenA, screenB) {
if (diameter == 0) return;
if (diameter < 1) diameter = 1;
var radius = diameter / 2;
if (screenA.distance (screenB) == 0) {
this.outputSphere (screenA.x, screenA.y, screenA.z, radius, colix);
return;
}this.outputCylinder (screenA, screenB, radius, colix, endcaps == 2);
if (endcaps != 3 || radius <= 1) return;
this.outputSphere (screenA.x, screenA.y, screenA.z, radius, colix);
this.outputSphere (screenB.x, screenB.y, screenB.z, radius, colix);
}, "~N,~N,~N,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "fillCylinderScreen", 
function (colix, endcaps, screenDiameter, screenA, screenB, ptA, ptB, radius) {
this.fillCylinderScreenMad (colix, endcaps, screenDiameter, screenA, screenB);
}, "~N,~N,~N,JU.P3,JU.P3,JU.P3,JU.P3,~N");
Clazz.overrideMethod (c$, "fillSphere", 
function (colix, diameter, pt) {
this.outputSphere (pt.x, pt.y, pt.z, diameter / 2, colix);
}, "~N,~N,JU.P3");
Clazz.overrideMethod (c$, "fillTriangle", 
function (colix, ptA, ptB, ptC, twoSided) {
this.outputTriangle (ptA, ptB, ptC, colix);
}, "~N,JU.T3,JU.T3,JU.T3,~B");
Clazz.overrideMethod (c$, "fillEllipsoid", 
function (center, points, colix, x, y, z, diameter, toEllipsoidal, coef, deriv, octantPoints) {
var radius = diameter / 2;
if (radius == 0) return;
if (radius < 1) radius = 1;
this.outputEllipsoid (center, radius, coef, colix);
}, "JU.P3,~A,~N,~N,~N,~N,~N,JU.M3,~A,JU.M4,~A");
});
