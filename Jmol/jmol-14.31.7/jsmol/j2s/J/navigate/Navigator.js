Clazz.declarePackage ("J.navigate");
Clazz.load (["J.api.JmolNavigatorInterface", "J.thread.JmolThread"], "J.navigate.Navigator", ["java.lang.Float", "JU.P3", "$.V3", "JU.Escape", "$.GData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tm = null;
this.nHits = 0;
this.multiplier = 1;
this.isPathGuide = false;
this.points = null;
this.pointGuides = null;
this.frameTimeMillis = 0;
this.floatSecondsTotal = 0;
this.axis = null;
this.degrees = 0;
this.center = null;
this.depthPercent = 0;
this.xTrans = 0;
this.yTrans = 0;
this.depthStart = 0;
this.depthDelta = 0;
this.xTransStart = 0;
this.xTransDelta = 0;
this.yTransStart = 0;
this.yTransDelta = 0;
this.degreeStep = 0;
this.centerStart = null;
this.totalSteps = 0;
this.aaStepCenter = null;
this.isNavTo = false;
this.iStep = 0;
this.navigationList = null;
this.iList = 0;
this.isStep = false;
Clazz.instantialize (this, arguments);
}, J.navigate, "Navigator", J.thread.JmolThread, J.api.JmolNavigatorInterface);
Clazz.overrideMethod (c$, "set", 
function (tm, vwr) {
this.tm = tm;
this.setViewer (vwr, "navigator");
}, "JV.TransformManager,JV.Viewer");
Clazz.overrideMethod (c$, "navigateList", 
function (eval, list) {
this.setEval (eval);
this.navigationList = list;
this.iList = 0;
this.isStep = false;
this.stopped = false;
if (this.isJS) this.useTimeout = true;
this.run ();
}, "J.api.JmolScriptEvaluator,JU.Lst");
Clazz.overrideMethod (c$, "run1", 
function (mode) {
var ptTemp =  new JU.P3 ();
while (this.isJS || this.vwr.isScriptExecuting ()) switch (mode) {
case -1:
if (this.isStep) {
this.targetTime = this.startTime;
this.iStep = 0;
mode = (this.totalSteps <= 0 && this.isNavTo ? 1 : 0);
break;
}mode = 2;
break;
case 2:
this.nextList (this.navigationList.get (this.iList), ptTemp);
return;
case 0:
if (this.stopped || this.iStep >= this.totalSteps) {
mode = -2;
break;
}this.doNavStep (this.iStep++);
this.vwr.requestRepaintAndWait ("navigatorThread");
var sleepTime = (this.targetTime - System.currentTimeMillis ());
if (!this.runSleep (sleepTime, 0)) return;
mode = 0;
break;
case 1:
if (!this.runSleep (Clazz.floatToInt (this.floatSecondsTotal * 1000) - 30, -2)) return;
mode = -2;
break;
case -2:
if (this.isNavTo) {
if (!Float.isNaN (this.xTrans) || !Float.isNaN (this.yTrans)) this.navTranslatePercentOrTo (-1, this.xTrans, this.yTrans);
if (!Float.isNaN (this.depthPercent)) this.setNavigationDepthPercent (this.depthPercent);
}this.vwr.setInMotion (false);
this.vwr.moveUpdate (this.floatSecondsTotal);
if (!this.stopped && ++this.iList < this.navigationList.size ()) {
mode = 2;
break;
}this.resumeEval ();
return;
}

}, "~N");
Clazz.defineMethod (c$, "nextList", 
 function (o, ptTemp) {
var tok = (o[0]).intValue ();
var seconds = (o[1]).floatValue ();
switch (tok) {
case 134217751:
var pt = o[2];
if (seconds == 0) {
this.tm.setNavigatePt (pt);
this.vwr.moveUpdate (0);
return;
}this.navigateTo (seconds, null, NaN, pt, NaN, NaN, NaN);
break;
case 1073742084:
var path = o[2];
var theta = o[3];
var indexStart = (o[4])[0];
var indexEnd = (o[4])[1];
this.navigate (seconds, null, path, theta, indexStart, indexEnd);
break;
case 1112152078:
var pathGuide = (o[2]);
this.navigate (seconds, pathGuide, null, null, 0, 2147483647);
break;
case 528432:
var rotAxis = o[2];
var degrees = (o[3]).floatValue ();
if (seconds == 0) {
this.navigateAxis (rotAxis, degrees);
this.vwr.moveUpdate (0);
return;
}this.navigateTo (seconds, rotAxis, degrees, null, NaN, NaN, NaN);
break;
case 4160:
case 268435634:
if (tok == 4160) {
this.tm.transformPt3f (o[2], ptTemp);
} else {
ptTemp.x = (o[2]).floatValue ();
ptTemp.y = (o[3]).floatValue ();
this.setNavPercent (ptTemp);
}if (seconds == 0) {
this.navTranslatePercentOrTo (-1, ptTemp.x, ptTemp.y);
this.vwr.moveUpdate (0);
return;
}this.navigateTo (seconds, null, NaN, null, NaN, ptTemp.x, ptTemp.y);
break;
case 554176526:
var percent = (o[2]).floatValue ();
this.navigateTo (seconds, null, NaN, null, percent, NaN, NaN);
break;
}
}, "~A,JU.P3");
Clazz.defineMethod (c$, "navigate", 
 function (seconds, pathGuide, path, theta, indexStart, indexEnd) {
this.floatSecondsTotal = seconds;
this.setupNav (seconds, pathGuide, path, indexStart, indexEnd);
this.isStep = true;
this.run ();
}, "~N,~A,~A,~A,~N,~N");
Clazz.defineMethod (c$, "navigateTo", 
 function (seconds, axis, degrees, center, depthPercent, xTrans, yTrans) {
this.floatSecondsTotal = seconds;
this.axis = axis;
this.degrees = degrees;
this.center = center;
this.depthPercent = depthPercent;
this.xTrans = xTrans;
this.yTrans = yTrans;
this.setupNavTo ();
this.isStep = true;
this.run ();
}, "~N,JU.V3,~N,JU.P3,~N,~N,~N");
Clazz.defineMethod (c$, "setNavPercent", 
 function (pt1) {
this.tm.transformPt3f (this.tm.navigationCenter, this.tm.navigationOffset);
var x = pt1.x;
var y = pt1.y;
if (!Float.isNaN (x)) x = this.tm.width * x / 100 + (Float.isNaN (y) ? this.tm.navigationOffset.x : (this.tm.width / 2));
if (!Float.isNaN (y)) y = this.tm.height * y / 100 + (Float.isNaN (x) ? this.tm.navigationOffset.y : this.tm.getNavPtHeight ());
pt1.x = x;
pt1.y = y;
}, "JU.P3");
Clazz.defineMethod (c$, "doNavStep", 
 function (iStep) {
if (!this.isNavTo) {
this.tm.setNavigatePt (this.points[iStep]);
if (this.isPathGuide) {
this.alignZX (this.points[iStep], this.points[iStep + 1], this.pointGuides[iStep]);
}this.targetTime += this.frameTimeMillis;
return;
}this.tm.navigating = true;
var fStep = (iStep + 1) / this.totalSteps;
if (!Float.isNaN (this.degrees)) this.tm.navigateAxis (this.axis, this.degreeStep);
if (this.center != null) {
this.centerStart.add (this.aaStepCenter);
this.tm.setNavigatePt (this.centerStart);
}if (!Float.isNaN (this.xTrans) || !Float.isNaN (this.yTrans)) {
var x = NaN;
var y = NaN;
if (!Float.isNaN (this.xTrans)) x = this.xTransStart + this.xTransDelta * fStep;
if (!Float.isNaN (this.yTrans)) y = this.yTransStart + this.yTransDelta * fStep;
this.navTranslatePercentOrTo (-1, x, y);
}if (!Float.isNaN (this.depthPercent)) {
this.setNavigationDepthPercent (this.depthStart + this.depthDelta * fStep);
}this.tm.navigating = false;
this.targetTime += this.frameTimeMillis;
}, "~N");
Clazz.defineMethod (c$, "setupNavTo", 
 function () {
this.isNavTo = true;
if (!this.vwr.haveDisplay) this.floatSecondsTotal = 0;
var fps = 30;
this.totalSteps = Clazz.floatToInt (this.floatSecondsTotal * fps) - 1;
if (this.floatSecondsTotal > 0) this.vwr.setInMotion (true);
if (this.degrees == 0) this.degrees = NaN;
if (this.totalSteps > 0) {
this.frameTimeMillis = Clazz.doubleToInt (1000 / fps);
this.depthStart = this.tm.navigationDepthPercent;
this.depthDelta = this.depthPercent - this.depthStart;
this.xTransStart = this.tm.navigationOffset.x;
this.xTransDelta = this.xTrans - this.xTransStart;
this.yTransStart = this.tm.navigationOffset.y;
this.yTransDelta = this.yTrans - this.yTransStart;
this.degreeStep = this.degrees / (this.totalSteps + 1);
this.aaStepCenter = JU.V3.newVsub (this.center == null ? this.tm.navigationCenter : this.center, this.tm.navigationCenter);
this.aaStepCenter.scale (1 / (this.totalSteps + 1));
this.centerStart = JU.P3.newP (this.tm.navigationCenter);
}});
Clazz.defineMethod (c$, "setupNav", 
 function (seconds, pathGuide, path, indexStart, indexEnd) {
this.isNavTo = false;
if (seconds <= 0) seconds = 2;
if (!this.vwr.haveDisplay) seconds = 0;
this.isPathGuide = (pathGuide != null);
var nSegments = Math.min ((this.isPathGuide ? pathGuide.length : path.length) - 1, indexEnd);
if (!this.isPathGuide) while (nSegments > 0 && path[nSegments] == null) nSegments--;

nSegments -= indexStart;
if (nSegments < 1) return;
var nPer = Clazz.doubleToInt (Math.floor (10 * seconds));
var nSteps = nSegments * nPer + 1;
this.points =  new Array (nSteps + 2);
this.pointGuides =  new Array (this.isPathGuide ? nSteps + 2 : 0);
for (var i = 0; i < nSegments; i++) {
var iPrev = Math.max (i - 1, 0) + indexStart;
var pt = i + indexStart;
var iNext = Math.min (i + 1, nSegments) + indexStart;
var iNext2 = Math.min (i + 2, nSegments) + indexStart;
var iNext3 = Math.min (i + 3, nSegments) + indexStart;
if (this.isPathGuide) {
JU.GData.getHermiteList (7, pathGuide[iPrev][0], pathGuide[pt][0], pathGuide[iNext][0], pathGuide[iNext2][0], pathGuide[iNext3][0], this.points, i * nPer, nPer + 1, true);
JU.GData.getHermiteList (7, pathGuide[iPrev][1], pathGuide[pt][1], pathGuide[iNext][1], pathGuide[iNext2][1], pathGuide[iNext3][1], this.pointGuides, i * nPer, nPer + 1, true);
} else {
JU.GData.getHermiteList (7, path[iPrev], path[pt], path[iNext], path[iNext2], path[iNext3], this.points, i * nPer, nPer + 1, true);
}}
this.vwr.setInMotion (true);
this.frameTimeMillis = Clazz.floatToInt (1000 / this.tm.navFps);
this.totalSteps = nSteps;
}, "~N,~A,~A,~N,~N");
Clazz.defineMethod (c$, "alignZX", 
 function (pt0, pt1, ptVectorWing) {
var pt0s =  new JU.P3 ();
var pt1s =  new JU.P3 ();
var m = this.tm.matrixRotate;
m.rotate2 (pt0, pt0s);
m.rotate2 (pt1, pt1s);
var vPath = JU.V3.newVsub (pt0s, pt1s);
var v = JU.V3.new3 (0, 0, 1);
var angle = vPath.angle (v);
v.cross (vPath, v);
if (angle != 0) this.tm.navigateAxis (v, (angle * 57.29577951308232));
m.rotate2 (pt0, pt0s);
var pt2 = JU.P3.newP (ptVectorWing);
pt2.add (pt0);
var pt2s =  new JU.P3 ();
m.rotate2 (pt2, pt2s);
vPath.sub2 (pt2s, pt0s);
vPath.z = 0;
v.set (-1, 0, 0);
angle = vPath.angle (v);
if (vPath.y < 0) angle = -angle;
v.set (0, 0, 1);
if (angle != 0) this.tm.navigateAxis (v, (angle * 57.29577951308232));
m.rotate2 (pt0, pt0s);
m.rotate2 (pt1, pt1s);
m.rotate2 (ptVectorWing, pt2s);
}, "JU.P3,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "zoomByFactor", 
function (factor, x, y) {
var navZ = this.tm.navZ;
if (navZ > 0) {
navZ /= factor;
if (navZ < 5) navZ = -5;
 else if (navZ > 200) navZ = 200;
} else if (navZ == 0) {
navZ = (factor < 1 ? 5 : -5);
} else {
navZ *= factor;
if (navZ > -5) navZ = 5;
 else if (navZ < -200) navZ = -200;
}this.tm.navZ = navZ;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "calcNavigationPoint", 
function () {
this.calcNavigationDepthPercent ();
if (!this.tm.navigating && this.tm.navMode != 1) {
if (this.tm.navigationDepthPercent < 100 && this.tm.navigationDepthPercent > 0 && !Float.isNaN (this.tm.previousX) && this.tm.previousX == this.tm.fixedTranslation.x && this.tm.previousY == this.tm.fixedTranslation.y && this.tm.navMode != -1) this.tm.navMode = 3;
 else this.tm.navMode = 0;
}switch (this.tm.navMode) {
case 1:
this.tm.navigationOffset.set (this.tm.width / 2, this.tm.getNavPtHeight (), this.tm.referencePlaneOffset);
this.tm.zoomFactor = 3.4028235E38;
this.tm.calcCameraFactors ();
this.tm.calcTransformMatrix ();
this.newNavigationCenter ();
break;
case 0:
case -1:
this.tm.fixedRotationOffset.setT (this.tm.fixedTranslation);
this.newNavigationCenter ();
break;
case 2:
this.newNavigationCenter ();
break;
case -2:
case 3:
var pt1 = this.tm.matrixTransform.rotTrans2 (this.tm.navigationCenter,  new JU.P3 ());
var z = pt1.z;
this.tm.matrixTransform.rotTrans2 (this.tm.fixedRotationCenter, pt1);
this.tm.modelCenterOffset = this.tm.referencePlaneOffset + (pt1.z - z);
this.tm.calcCameraFactors ();
this.tm.calcTransformMatrix ();
break;
case 4:
this.tm.navigationOffset.z = this.tm.referencePlaneOffset;
this.tm.unTransformPoint (this.tm.navigationOffset, this.tm.navigationCenter);
break;
}
this.tm.matrixTransform.rotTrans2 (this.tm.navigationCenter, this.tm.navigationShiftXY);
if (this.vwr.getBoolean (603979890)) {
var pt = JU.P3.newP (this.tm.navigationCenter);
this.vwr.toUnitCell (this.tm.navigationCenter, null);
if (pt.distance (this.tm.navigationCenter) > 0.01) {
this.tm.matrixTransform.rotTrans2 (this.tm.navigationCenter, pt);
var dz = this.tm.navigationShiftXY.z - pt.z;
this.tm.modelCenterOffset += dz;
this.tm.calcCameraFactors ();
this.tm.calcTransformMatrix ();
this.tm.matrixTransform.rotTrans2 (this.tm.navigationCenter, this.tm.navigationShiftXY);
}}this.tm.transformPt3f (this.tm.fixedRotationCenter, this.tm.fixedTranslation);
this.tm.fixedRotationOffset.setT (this.tm.fixedTranslation);
this.tm.previousX = this.tm.fixedTranslation.x;
this.tm.previousY = this.tm.fixedTranslation.y;
this.tm.transformPt3f (this.tm.navigationCenter, this.tm.navigationOffset);
this.tm.navigationOffset.z = this.tm.referencePlaneOffset;
this.tm.navMode = 0;
this.calcNavSlabAndDepthValues ();
});
Clazz.defineMethod (c$, "calcNavSlabAndDepthValues", 
 function () {
this.tm.calcSlabAndDepthValues ();
if (this.tm.slabEnabled) {
this.tm.slabValue = (this.tm.mode == 1 ? -100 : 0) + Clazz.floatToInt (this.tm.referencePlaneOffset - this.tm.navigationSlabOffset);
if (this.tm.zSlabPercentSetting == this.tm.zDepthPercentSetting) this.tm.zSlabValue = this.tm.slabValue;
}});
Clazz.defineMethod (c$, "newNavigationCenter", 
 function () {
this.tm.mode = this.tm.defaultMode;
var pt =  new JU.P3 ();
this.tm.transformPt3f (this.tm.fixedRotationCenter, pt);
pt.x -= this.tm.navigationOffset.x;
pt.y -= this.tm.navigationOffset.y;
var f = -this.tm.getPerspectiveFactor (pt.z);
pt.x /= f;
pt.y /= f;
pt.z = this.tm.referencePlaneOffset;
this.tm.matrixTransformInv.rotTrans2 (pt, this.tm.navigationCenter);
this.tm.mode = 1;
});
Clazz.overrideMethod (c$, "setNavigationOffsetRelative", 
function () {
if (this.tm.navigationDepthPercent < 0 && this.tm.navZ > 0 || this.tm.navigationDepthPercent > 100 && this.tm.navZ < 0) {
this.tm.navZ = 0;
}this.tm.rotateXRadians (0.017453292 * -0.02 * this.tm.navY, null);
this.tm.rotateYRadians (0.017453292 * .02 * this.tm.navX, null);
var pt = this.tm.navigationCenter;
var pts =  new JU.P3 ();
this.tm.transformPt3f (pt, pts);
pts.z += this.tm.navZ;
this.tm.unTransformPoint (pts, pt);
this.tm.setNavigatePt (pt);
});
Clazz.overrideMethod (c$, "navigateKey", 
function (keyCode, modifiers) {
var key = null;
var value = 0;
if (this.tm.mode != 1) return;
if (keyCode == 0) {
this.nHits = 0;
this.multiplier = 1;
if (!this.tm.navigating) return;
this.tm.navigating = false;
return;
}this.nHits++;
if (this.nHits % 10 == 0) this.multiplier *= (this.multiplier == 4 ? 1 : 2);
var isShiftKey = ((modifiers & 1) > 0);
var isAltKey = ((modifiers & 8) > 0);
var isCtrlKey = ((modifiers & 2) > 0);
var speed = this.vwr.getFloat (570425374) * (isCtrlKey ? 10 : 1);
switch (keyCode) {
case 46:
this.tm.navX = this.tm.navY = this.tm.navZ = 0;
this.tm.homePosition (true);
return;
case 32:
if (!this.tm.navOn) return;
this.tm.navX = this.tm.navY = this.tm.navZ = 0;
return;
case 38:
if (this.tm.navOn) {
if (isAltKey) {
this.tm.navY += this.multiplier;
value = this.tm.navY;
key = "navY";
} else {
this.tm.navZ += this.multiplier;
value = this.tm.navZ;
key = "navZ";
}break;
}if (isShiftKey) {
this.tm.navigationOffset.y -= 2 * this.multiplier;
this.tm.navMode = 2;
break;
}if (isAltKey) {
this.tm.rotateXRadians (0.017453292 * -0.2 * this.multiplier, null);
this.tm.navMode = 3;
break;
}this.tm.modelCenterOffset -= speed * (this.vwr.getBoolean (603979890) ? 1 : this.multiplier);
this.tm.navMode = 4;
break;
case 40:
if (this.tm.navOn) {
if (isAltKey) {
this.tm.navY -= this.multiplier;
value = this.tm.navY;
key = "navY";
} else {
this.tm.navZ -= this.multiplier;
value = this.tm.navZ;
key = "navZ";
}break;
}if (isShiftKey) {
this.tm.navigationOffset.y += 2 * this.multiplier;
this.tm.navMode = 2;
break;
}if (isAltKey) {
this.tm.rotateXRadians (0.017453292 * .2 * this.multiplier, null);
this.tm.navMode = 3;
break;
}this.tm.modelCenterOffset += speed * (this.vwr.getBoolean (603979890) ? 1 : this.multiplier);
this.tm.navMode = 4;
break;
case 37:
if (this.tm.navOn) {
this.tm.navX -= this.multiplier;
value = this.tm.navX;
key = "navX";
break;
}if (isShiftKey) {
this.tm.navigationOffset.x -= 2 * this.multiplier;
this.tm.navMode = 2;
break;
}this.tm.rotateYRadians (0.017453292 * 3 * -0.2 * this.multiplier, null);
this.tm.navMode = 3;
break;
case 39:
if (this.tm.navOn) {
this.tm.navX += this.multiplier;
value = this.tm.navX;
key = "navX";
break;
}if (isShiftKey) {
this.tm.navigationOffset.x += 2 * this.multiplier;
this.tm.navMode = 2;
break;
}this.tm.rotateYRadians (0.017453292 * 3 * .2 * this.multiplier, null);
this.tm.navMode = 3;
break;
default:
this.tm.navigating = false;
this.tm.navMode = 0;
return;
}
if (key != null) this.vwr.g.setF (key, value);
this.tm.navigating = true;
this.tm.finalizeTransformParameters ();
}, "~N,~N");
Clazz.overrideMethod (c$, "setNavigationDepthPercent", 
function (percent) {
this.vwr.g.setF ("navigationDepth", percent);
this.tm.calcCameraFactors ();
this.tm.modelCenterOffset = this.tm.referencePlaneOffset - (1 - percent / 50) * this.tm.modelRadiusPixels;
this.tm.calcCameraFactors ();
this.tm.navMode = -1;
}, "~N");
Clazz.defineMethod (c$, "calcNavigationDepthPercent", 
 function () {
this.tm.calcCameraFactors ();
this.tm.navigationDepthPercent = (this.tm.modelRadiusPixels == 0 ? 50 : 50 * (1 + (this.tm.modelCenterOffset - this.tm.referencePlaneOffset) / this.tm.modelRadiusPixels));
});
Clazz.overrideMethod (c$, "getNavigationState", 
function () {
return "# navigation state;\nnavigate 0 center " + JU.Escape.eP (this.tm.navigationCenter) + ";\nnavigate 0 translate " + this.tm.getNavigationOffsetPercent ('X') + " " + this.tm.getNavigationOffsetPercent ('Y') + ";\nset navigationDepth " + this.tm.navigationDepthPercent + ";\nset navigationSlab " + this.getNavigationSlabOffsetPercent () + ";\n\n";
});
Clazz.defineMethod (c$, "getNavigationSlabOffsetPercent", 
 function () {
this.tm.calcCameraFactors ();
return 50 * this.tm.navigationSlabOffset / this.tm.modelRadiusPixels;
});
Clazz.overrideMethod (c$, "navigateAxis", 
function (rotAxis, degrees) {
if (degrees == 0) return;
this.tm.rotateAxisAngle (rotAxis, (degrees / 57.29577951308232));
this.tm.navMode = 3;
this.tm.navigating = true;
this.tm.finalizeTransformParameters ();
this.tm.navigating = false;
}, "JU.V3,~N");
Clazz.overrideMethod (c$, "navTranslatePercentOrTo", 
function (seconds, x, y) {
var pt1 = JU.P3.new3 (x, y, 0);
if (seconds >= 0) this.setNavPercent (pt1);
if (!Float.isNaN (pt1.x)) this.tm.navigationOffset.x = pt1.x;
if (!Float.isNaN (pt1.y)) this.tm.navigationOffset.y = pt1.y;
this.tm.navMode = 2;
this.tm.navigating = true;
this.tm.finalizeTransformParameters ();
this.tm.navigating = false;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "oops", 
function (e) {
Clazz.superCall (this, J.navigate.Navigator, "oops", [e]);
this.tm.navigating = false;
}, "Exception");
});
