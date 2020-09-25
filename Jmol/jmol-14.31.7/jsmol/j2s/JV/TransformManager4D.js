Clazz.declarePackage ("JV");
Clazz.load (["JV.TransformManager", "JU.M4", "$.P4", "$.V3"], "JV.TransformManager4D", ["JU.T4"], function () {
c$ = Clazz.decorateAsClass (function () {
this.is4D = false;
this.mouseMode = 3;
this.m2_rotate = null;
this.m3_toScreen = null;
this.zOffset = 0;
this.v1 = null;
this.m4 = null;
this.p4 = null;
this.zero = null;
Clazz.instantialize (this, arguments);
}, JV, "TransformManager4D", JV.TransformManager);
Clazz.prepareFields (c$, function () {
this.m3_toScreen =  new JU.M4 ();
this.v1 =  new JU.V3 ();
this.m4 =  new JU.M4 ();
this.p4 =  new JU.P4 ();
this.zero =  new JU.V3 ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JV.TransformManager4D, []);
});
Clazz.overrideMethod (c$, "resetRotation", 
function () {
if (this.m2_rotate != null) this.m2_rotate.setIdentity ();
this.matrixRotate.setScale (1);
});
Clazz.overrideMethod (c$, "rotateXYBy", 
function (xDelta, yDelta, bsAtoms) {
this.rotate3DBall (xDelta, yDelta, bsAtoms);
switch (this.is4D && bsAtoms == null ? this.mouseMode : 0) {
case 0:
this.m2_rotate = null;
break;
case 1:
this.checkM2 ();
this.rotate4DBall (0, xDelta, yDelta);
break;
case 2:
this.checkM2 ();
this.rotate4DBall (xDelta, 0, yDelta);
break;
case 3:
this.checkM2 ();
this.rotate4DBall (xDelta, yDelta, 0);
break;
}
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "rotate4DBall", 
function (xDelta, yDelta, zDelta) {
var scale = 50;
this.setAsBallRotation (this.m4, scale, xDelta, yDelta, zDelta);
this.m2_rotate.mul2 (this.m4, this.m2_rotate);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setAsBallRotation", 
function (m, scale, dx, dy, dz) {
var dxyz2 = dx * dx + dy * dy + dz * dz;
var sxyz = Math.sqrt (dxyz2);
var th = sxyz / scale;
var c = Math.cos (th);
var s = Math.sin (th);
var nx = dx / sxyz;
var ny = dy / sxyz;
var nz = dz / sxyz;
var c1 = c - 1;
m.m00 = 1 + c1 * nx * nx;
m.m11 = 1 + c1 * ny * ny;
m.m22 = 1 + c1 * nz * nz;
m.m33 = c;
m.m01 = m.m10 = c1 * nx * ny;
m.m02 = m.m20 = c1 * nx * nz;
m.m12 = m.m21 = c1 * ny * nz;
m.m30 = -(m.m03 = s * nx);
m.m31 = -(m.m13 = s * ny);
m.m32 = -(m.m23 = s * nz);
}, "JU.M4,~N,~N,~N,~N");
Clazz.defineMethod (c$, "checkM2", 
 function () {
if (this.m2_rotate == null) this.m2_rotate = JU.M4.newMV (this.matrixRotate, this.zero);
});
Clazz.defineMethod (c$, "calcTransformMatrix", 
function () {
Clazz.superCall (this, JV.TransformManager4D, "calcTransformMatrix", []);
this.doTransform4D = (this.is4D && !this.stereoFrame && this.mode != 1);
if (!this.doTransform4D) return;
this.v1.sub2 (this.frameOffset, this.fixedRotationCenter);
this.checkM2 ();
this.m3_toScreen.setIdentity ();
this.m3_toScreen.m00 = this.m3_toScreen.m11 = this.m3_toScreen.m22 = this.scalePixelsPerAngstrom;
this.m3_toScreen.m11 = this.m3_toScreen.m22 = -this.scalePixelsPerAngstrom;
System.out.println (this.m2_rotate);
this.zOffset = this.modelCenterOffset;
});
Clazz.overrideMethod (c$, "getScreenTemp", 
function (ptXYZ) {
if (this.doTransform4D && Clazz.instanceOf (ptXYZ, JU.T4)) {
this.p4.add2 (ptXYZ, this.v1);
this.m2_rotate.rotate (this.p4);
this.fScrPt.setT (this.p4);
this.m3_toScreen.rotTrans (this.fScrPt);
this.fScrPt.z += this.zOffset;
} else {
this.matrixTransform.rotTrans2 (ptXYZ, this.fScrPt);
}}, "JU.T3");
Clazz.defineStatics (c$,
"MODE_3D", 0,
"MODE_4D_WX", 1,
"MODE_4D_WY", 2,
"MODE_4D_WZ", 3);
});
