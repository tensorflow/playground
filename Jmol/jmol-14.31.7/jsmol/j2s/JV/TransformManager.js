Clazz.declarePackage ("JV");
Clazz.load (["JU.A4", "$.M3", "$.M4", "$.P3", "$.P3i", "$.V3", "J.c.STER", "JU.Point3fi"], "JV.TransformManager", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.P4", "$.Quat", "$.SB", "J.api.Interface", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.movetoThread = null;
this.vibrationThread = null;
this.spinThread = null;
this.perspectiveModel = 11;
this.cameraScaleFactor = 0;
this.referencePlaneOffset = 0;
this.aperatureAngle = 0;
this.cameraDistanceFromCenter = 0;
this.modelCenterOffset = 0;
this.modelRadius = 0;
this.modelRadiusPixels = 0;
this.navigationCenter = null;
this.navigationOffset = null;
this.navigationShiftXY = null;
this.navigationDepthPercent = 0;
this.matrixTemp = null;
this.vectorTemp = null;
this.haveNotifiedNaN = false;
this.spinX = 0;
this.spinY = 30;
this.spinZ = 0;
this.spinFps = 30;
this.navX = 0;
this.navY = 0;
this.navZ = 0;
this.navFps = NaN;
this.isSpinInternal = false;
this.isSpinFixed = false;
this.isSpinSelected = false;
this.doTransform4D = false;
this.fixedRotationOffset = null;
this.fixedRotationCenter = null;
this.perspectiveOffset = null;
this.perspectiveShiftXY = null;
this.rotationCenterDefault = null;
this.rotationRadiusDefault = 0;
this.fixedRotationAxis = null;
this.internalRotationAxis = null;
this.internalTranslation = null;
this.internalRotationCenter = null;
this.internalRotationAngle = 0;
this.matrixRotate = null;
this.matrixTemp3 = null;
this.matrixTemp4 = null;
this.axisangleT = null;
this.vectorT = null;
this.vectorT2 = null;
this.pointT2 = null;
this.rotationAxis = null;
this.rotationRate = 0;
this.fixedTranslation = null;
this.camera = null;
this.cameraSetting = null;
this.xTranslationFraction = 0.5;
this.yTranslationFraction = 0.5;
this.prevZoomSetting = 0;
this.previousX = 0;
this.previousY = 0;
this.zoomEnabled = true;
this.zmPct = 100;
this.zmPctSet = 100;
this.zoomRatio = 0;
this.slabEnabled = false;
this.zShadeEnabled = false;
this.internalSlab = false;
this.slabPercentSetting = 0;
this.depthPercentSetting = 0;
this.slabValue = 0;
this.depthValue = 0;
this.zSlabPercentSetting = 50;
this.zDepthPercentSetting = 0;
this.zSlabPoint = null;
this.zSlabValue = 0;
this.zDepthValue = 0;
this.slabRange = 0;
this.slabPlane = null;
this.depthPlane = null;
this.perspectiveDepth = true;
this.scale3D = false;
this.cameraDepth = 3;
this.cameraDepthSetting = 3;
this.visualRangeAngstroms = 0;
this.cameraDistance = 1000;
this.width = 0;
this.height = 0;
this.screenPixelCount = 0;
this.scalePixelsPerAngstrom = 0;
this.scaleDefaultPixelsPerAngstrom = 0;
this.scale3DAngstromsPerInch = 0;
this.antialias = false;
this.useZoomLarge = false;
this.zoomHeight = false;
this.screenWidth = 0;
this.screenHeight = 0;
this.matrixTransform = null;
this.matrixTransformInv = null;
this.fScrPt = null;
this.iScrPt = null;
this.ptVibTemp = null;
this.navigating = false;
this.mode = 0;
this.defaultMode = 0;
this.untransformedPoint = null;
this.ptTest1 = null;
this.ptTest2 = null;
this.ptTest3 = null;
this.aaTest1 = null;
this.matrixTest = null;
this.spinOn = false;
this.navOn = false;
this.spinIsGesture = false;
this.vibrationOn = false;
this.vibrationPeriod = 0;
this.vibrationPeriodMs = 0;
this.vibrationScale = 0;
this.vibrationT = null;
this.stereoMode = null;
this.stereoColors = null;
this.stereoDoubleDTI = false;
this.stereoDoubleFull = false;
this.stereoDegrees = NaN;
this.stereoRadians = 0;
this.stereoFrame = false;
this.matrixStereo = null;
this.windowCentered = false;
this.frameOffset = null;
this.frameOffsets = null;
this.bsFrameOffsets = null;
this.bsSelectedAtoms = null;
this.ptOffset = null;
this.navMode = 1;
this.zoomFactor = 3.4028235E38;
this.navigationSlabOffset = 0;
this.nav = null;
Clazz.instantialize (this, arguments);
}, JV, "TransformManager");
Clazz.prepareFields (c$, function () {
this.navigationCenter =  new JU.P3 ();
this.navigationOffset =  new JU.P3 ();
this.navigationShiftXY =  new JU.P3 ();
this.matrixTemp =  new JU.M4 ();
this.vectorTemp =  new JU.V3 ();
this.fixedRotationOffset =  new JU.P3 ();
this.fixedRotationCenter =  new JU.P3 ();
this.perspectiveOffset =  new JU.P3 ();
this.perspectiveShiftXY =  new JU.P3 ();
this.rotationCenterDefault =  new JU.P3 ();
this.fixedRotationAxis =  new JU.A4 ();
this.internalRotationAxis =  new JU.A4 ();
this.internalRotationCenter = JU.P3.new3 (0, 0, 0);
this.matrixRotate =  new JU.M3 ();
this.matrixTemp3 =  new JU.M3 ();
this.matrixTemp4 =  new JU.M4 ();
this.axisangleT =  new JU.A4 ();
this.vectorT =  new JU.V3 ();
this.vectorT2 =  new JU.V3 ();
this.pointT2 =  new JU.P3 ();
this.rotationAxis =  new JU.V3 ();
this.fixedTranslation =  new JU.P3 ();
this.camera =  new JU.P3 ();
this.cameraSetting =  new JU.P3 ();
this.matrixTransform =  new JU.M4 ();
this.matrixTransformInv =  new JU.M4 ();
this.fScrPt =  new JU.P3 ();
this.iScrPt =  new JU.P3i ();
this.ptVibTemp =  new JU.Point3fi ();
this.untransformedPoint =  new JU.P3 ();
this.ptTest1 =  new JU.P3 ();
this.ptTest2 =  new JU.P3 ();
this.ptTest3 =  new JU.P3 ();
this.aaTest1 =  new JU.A4 ();
this.matrixTest =  new JU.M3 ();
this.vibrationT =  new JU.P3 ();
this.stereoMode = J.c.STER.NONE;
this.matrixStereo =  new JU.M3 ();
this.frameOffset =  new JU.P3 ();
this.ptOffset =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
});
c$.getTransformManager = Clazz.defineMethod (c$, "getTransformManager", 
function (vwr, width, height, is4D) {
var me = (is4D ? J.api.Interface.getInterface ("JV.TransformManager4D", vwr, "tm") :  new JV.TransformManager ());
me.vwr = vwr;
me.setScreenParameters (width, height, true, false, true, true);
return me;
}, "JV.Viewer,~N,~N,~B");
Clazz.defineMethod (c$, "setDefaultPerspective", 
function () {
this.setCameraDepthPercent (3.0, true);
this.setPerspectiveDepth (true);
this.setStereoDegrees (-5);
this.visualRangeAngstroms = 5.0;
this.setSpinOff ();
this.setVibrationPeriod (0);
});
Clazz.defineMethod (c$, "homePosition", 
function (resetSpin) {
if (resetSpin) this.setSpinOff ();
this.setNavOn (false);
this.navFps = 10;
this.navX = this.navY = this.navZ = 0;
this.rotationCenterDefault.setT (this.vwr.getBoundBoxCenter ());
this.setFixedRotationCenter (this.rotationCenterDefault);
this.rotationRadiusDefault = this.setRotationRadius (0, true);
this.windowCentered = true;
this.setRotationCenterAndRadiusXYZ (null, true);
this.resetRotation ();
var m = this.vwr.ms.getInfoM ("defaultOrientationMatrix");
if (m != null) this.setRotation (m);
this.setZoomEnabled (true);
this.zoomToPercent (this.vwr.g.modelKitMode ? 50 : 100);
this.zmPct = this.zmPctSet;
this.slabReset ();
this.resetFitToScreen (true);
if (this.vwr.isJmolDataFrame ()) {
this.fixedRotationCenter.set (0, 0, 0);
} else {
if (this.vwr.g.axesOrientationRasmol) this.matrixRotate.setAsXRotation (3.141592653589793);
}this.vwr.stm.saveOrientation ("default", null);
if (this.mode == 1) this.setNavigationMode (true);
}, "~B");
Clazz.defineMethod (c$, "setRotation", 
function (m) {
if (m.isRotation ()) this.matrixRotate.setM3 (m);
 else this.resetRotation ();
}, "JU.M3");
Clazz.defineMethod (c$, "resetRotation", 
function () {
this.matrixRotate.setScale (1);
});
Clazz.defineMethod (c$, "clearThreads", 
function () {
this.clearVibration ();
this.clearSpin ();
this.setNavOn (false);
this.stopMotion ();
});
Clazz.defineMethod (c$, "clear", 
function () {
this.fixedRotationCenter.set (0, 0, 0);
this.navigating = false;
this.slabPlane = null;
this.depthPlane = null;
this.zSlabPoint = null;
this.resetNavigationPoint (true);
});
Clazz.defineMethod (c$, "setFixedRotationCenter", 
 function (center) {
if (center == null) return;
this.fixedRotationCenter.setT (center);
}, "JU.T3");
Clazz.defineMethod (c$, "setRotationPointXY", 
function (center) {
var newCenterScreen = this.transformPt (center);
this.fixedTranslation.set (newCenterScreen.x, newCenterScreen.y, 0);
}, "JU.P3");
Clazz.defineMethod (c$, "spinXYBy", 
function (xDelta, yDelta, speed) {
if (xDelta == 0 && yDelta == 0) {
if (this.spinThread != null && this.spinIsGesture) this.clearSpin ();
return;
}this.clearSpin ();
var pt1 = JU.P3.newP (this.fixedRotationCenter);
var ptScreen =  new JU.P3 ();
this.transformPt3f (pt1, ptScreen);
var pt2 = JU.P3.new3 (-yDelta, xDelta, 0);
pt2.add (ptScreen);
this.unTransformPoint (pt2, pt2);
this.vwr.setInMotion (false);
this.rotateAboutPointsInternal (null, pt2, pt1, 10 * speed, NaN, false, true, null, true, null, null, null, null);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "rotateXYBy", 
function (degX, degY, bsAtoms) {
this.rotate3DBall (degX, degY, bsAtoms);
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "rotateZBy", 
function (zDelta, x, y) {
if (x != 2147483647 && y != 2147483647) this.resetXYCenter (x, y);
this.rotateZRadians ((zDelta / 57.29577951308232));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "applyRotation", 
 function (mNew, isInternal, bsAtoms, translation, translationOnly, m4) {
if (bsAtoms == null) {
this.matrixRotate.mul2 (mNew, this.matrixRotate);
return;
}this.vwr.moveAtoms (m4, mNew, this.matrixRotate, translation, this.internalRotationCenter, isInternal, bsAtoms, translationOnly);
if (translation != null) {
this.internalRotationCenter.add (translation);
}}, "JU.M3,~B,JU.BS,JU.V3,~B,JU.M4");
Clazz.defineMethod (c$, "rotate3DBall", 
function (xDeg, yDeg, bsAtoms) {
if (this.matrixTemp3.setAsBallRotation (0.017453292, -yDeg, -xDeg)) this.applyRotation (this.matrixTemp3, false, bsAtoms, null, false, null);
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "rotateXRadians", 
function (angleRadians, bsAtoms) {
this.applyRotation (this.matrixTemp3.setAsXRotation (angleRadians), false, bsAtoms, null, false, null);
}, "~N,JU.BS");
Clazz.defineMethod (c$, "rotateYRadians", 
function (angleRadians, bsAtoms) {
this.applyRotation (this.matrixTemp3.setAsYRotation (angleRadians), false, bsAtoms, null, false, null);
}, "~N,JU.BS");
Clazz.defineMethod (c$, "rotateZRadians", 
function (angleRadians) {
this.applyRotation (this.matrixTemp3.setAsZRotation (angleRadians), false, null, null, false, null);
}, "~N");
Clazz.defineMethod (c$, "rotateAxisAngle", 
function (rotAxis, radians) {
this.axisangleT.setVA (rotAxis, radians);
this.rotateAxisAngle2 (this.axisangleT, null);
}, "JU.V3,~N");
Clazz.defineMethod (c$, "rotateAxisAngle2", 
 function (axisAngle, bsAtoms) {
this.applyRotation (this.matrixTemp3.setAA (axisAngle), false, bsAtoms, null, false, null);
}, "JU.A4,JU.BS");
Clazz.defineMethod (c$, "rotateAxisAngleAtCenter", 
function (eval, rotCenter, rotAxis, degreesPerSecond, endDegrees, isSpin, bsAtoms) {
if (rotCenter != null) this.moveRotationCenter (rotCenter, true);
if (isSpin) this.setSpinOff ();
this.setNavOn (false);
if (this.vwr.headless) {
if (isSpin && endDegrees == 3.4028235E38) return false;
isSpin = false;
}if (Float.isNaN (degreesPerSecond) || degreesPerSecond == 0 || endDegrees == 0) return false;
if (rotCenter != null) {
this.setRotationPointXY (rotCenter);
}this.setFixedRotationCenter (rotCenter);
this.rotationAxis.setT (rotAxis);
this.rotationRate = degreesPerSecond;
if (isSpin) {
this.fixedRotationAxis.setVA (rotAxis, degreesPerSecond * 0.017453292);
this.isSpinInternal = false;
this.isSpinFixed = true;
this.isSpinSelected = (bsAtoms != null);
this.setSpin (eval, true, endDegrees, null, null, bsAtoms, false);
return (endDegrees != 3.4028235E38);
}var radians = endDegrees * 0.017453292;
this.fixedRotationAxis.setVA (rotAxis, endDegrees);
this.rotateAxisAngleRadiansFixed (radians, bsAtoms);
return true;
}, "J.api.JmolScriptEvaluator,JU.P3,JU.V3,~N,~N,~B,JU.BS");
Clazz.defineMethod (c$, "rotateAxisAngleRadiansFixed", 
function (angleRadians, bsAtoms) {
this.axisangleT.setAA (this.fixedRotationAxis);
this.axisangleT.angle = angleRadians;
this.rotateAxisAngle2 (this.axisangleT, bsAtoms);
}, "~N,JU.BS");
Clazz.defineMethod (c$, "rotateAboutPointsInternal", 
function (eval, point1, point2, degreesPerSecond, endDegrees, isClockwise, isSpin, bsAtoms, isGesture, translation, finalPoints, dihedralList, m4) {
if (isSpin) this.setSpinOff ();
this.setNavOn (false);
if (dihedralList == null && (translation == null || translation.length () < 0.001) && (isSpin ? Float.isNaN (degreesPerSecond) || degreesPerSecond == 0 : endDegrees == 0)) return false;
var axis = null;
if (dihedralList == null) {
axis = JU.V3.newVsub (point2, point1);
if (isClockwise) axis.scale (-1.0);
this.internalRotationCenter.setT (point1);
this.rotationAxis.setT (axis);
this.internalTranslation = (translation == null ? null : JU.V3.newV (translation));
}var isSelected = (bsAtoms != null);
if (isSpin) {
if (dihedralList == null) {
if (endDegrees == 0) endDegrees = NaN;
if (Float.isNaN (endDegrees)) {
this.rotationRate = degreesPerSecond;
} else {
var nFrames = Clazz.doubleToInt (Math.abs (endDegrees) / Math.abs (degreesPerSecond) * this.spinFps + 0.5);
this.rotationRate = degreesPerSecond = endDegrees / nFrames * this.spinFps;
if (translation != null) this.internalTranslation.scale (1 / nFrames);
}this.internalRotationAxis.setVA (axis, (Float.isNaN (this.rotationRate) ? 0 : this.rotationRate) * 0.017453292);
this.isSpinInternal = true;
this.isSpinFixed = false;
this.isSpinSelected = isSelected;
} else {
endDegrees = degreesPerSecond;
}this.setSpin (eval, true, endDegrees, finalPoints, dihedralList, bsAtoms, isGesture);
return !Float.isNaN (endDegrees);
}var radians = endDegrees * 0.017453292;
this.internalRotationAxis.setVA (axis, radians);
this.rotateAxisAngleRadiansInternal (radians, bsAtoms, m4);
return false;
}, "J.api.JmolScriptEvaluator,JU.T3,JU.T3,~N,~N,~B,~B,JU.BS,~B,JU.V3,JU.Lst,~A,JU.M4");
Clazz.defineMethod (c$, "rotateAxisAngleRadiansInternal", 
function (radians, bsAtoms, m4) {
this.internalRotationAngle = radians;
this.vectorT.set (this.internalRotationAxis.x, this.internalRotationAxis.y, this.internalRotationAxis.z);
this.matrixRotate.rotate2 (this.vectorT, this.vectorT2);
this.axisangleT.setVA (this.vectorT2, radians);
this.applyRotation (this.matrixTemp3.setAA (this.axisangleT), true, bsAtoms, this.internalTranslation, radians > 1e6, m4);
if (bsAtoms == null) this.getNewFixedRotationCenter ();
}, "~N,JU.BS,JU.M4");
Clazz.defineMethod (c$, "getNewFixedRotationCenter", 
function () {
this.axisangleT.setAA (this.internalRotationAxis);
this.axisangleT.angle = -this.internalRotationAngle;
this.matrixTemp4.setToAA (this.axisangleT);
this.vectorT.setT (this.internalRotationCenter);
this.pointT2.sub2 (this.fixedRotationCenter, this.vectorT);
var pt = this.matrixTemp4.rotTrans2 (this.pointT2,  new JU.P3 ());
pt.add (this.vectorT);
this.setRotationCenterAndRadiusXYZ (pt, false);
});
Clazz.defineMethod (c$, "setTranslationFractions", 
function () {
this.xTranslationFraction = this.fixedTranslation.x / this.width;
this.yTranslationFraction = this.fixedTranslation.y / this.height;
});
Clazz.defineMethod (c$, "centerAt", 
function (x, y, pt) {
if (pt == null) {
this.translateXYBy (x, y);
return;
}if (this.windowCentered) this.vwr.setBooleanProperty ("windowCentered", false);
this.fixedTranslation.x = x;
this.fixedTranslation.y = y;
this.setFixedRotationCenter (pt);
}, "~N,~N,JU.P3");
Clazz.defineMethod (c$, "percentToPixels", 
function (xyz, percent) {
switch (xyz) {
case 'x':
return Clazz.doubleToInt (Math.floor (percent / 100 * this.width));
case 'y':
return Clazz.doubleToInt (Math.floor (percent / 100 * this.height));
case 'z':
return Clazz.doubleToInt (Math.floor (percent / 100 * this.screenPixelCount));
}
return 0;
}, "~S,~N");
Clazz.defineMethod (c$, "angstromsToPixels", 
function (distance) {
return Clazz.doubleToInt (Math.floor (this.scalePixelsPerAngstrom * distance));
}, "~N");
Clazz.defineMethod (c$, "translateXYBy", 
function (xDelta, yDelta) {
this.fixedTranslation.x += xDelta;
this.fixedTranslation.y += yDelta;
this.setTranslationFractions ();
}, "~N,~N");
Clazz.defineMethod (c$, "setCamera", 
function (x, y) {
this.cameraSetting.set (x, y, (x == 0 && y == 0 ? 0 : 1));
}, "~N,~N");
Clazz.defineMethod (c$, "translateToPercent", 
function (type, percent) {
switch (type) {
case 'x':
this.xTranslationFraction = 0.5 + percent / 100;
this.fixedTranslation.x = this.width * this.xTranslationFraction;
return;
case 'y':
this.yTranslationFraction = 0.5 + percent / 100;
this.fixedTranslation.y = this.height * this.yTranslationFraction;
return;
case 'z':
if (this.mode == 1) this.setNavigationDepthPercent (percent);
return;
}
}, "~S,~N");
Clazz.defineMethod (c$, "getTranslationXPercent", 
function () {
return (this.width == 0 ? 0 : (this.fixedTranslation.x - this.width / 2) * 100 / this.width);
});
Clazz.defineMethod (c$, "getTranslationYPercent", 
function () {
return (this.height == 0 ? 0 : (this.fixedTranslation.y - this.height / 2) * 100 / this.height);
});
Clazz.defineMethod (c$, "getTranslationScript", 
function () {
var info = "";
var f = this.getTranslationXPercent ();
if (f != 0.0) info += "translate x " + f + ";";
f = this.getTranslationYPercent ();
if (f != 0.0) info += "translate y " + f + ";";
return info;
});
Clazz.defineMethod (c$, "getOrientationText", 
function (type, isBest) {
switch (type) {
case 4129:
return this.getMoveToText (1, false);
case 1073742132:
var q = this.getRotationQ ();
if (isBest) q = q.inv ();
return q.toString ();
case 1073742178:
var sb =  new JU.SB ();
var d = this.getTranslationXPercent ();
JV.TransformManager.truncate2 (sb, (isBest ? -d : d));
d = this.getTranslationYPercent ();
JV.TransformManager.truncate2 (sb, (isBest ? -d : d));
return sb.toString ();
default:
return this.getMoveToText (1, true) + "\n#OR\n" + this.getRotateZyzText (true);
}
}, "~N,~B");
Clazz.defineMethod (c$, "getRotationQ", 
function () {
return JU.Quat.newM (this.matrixRotate);
});
Clazz.defineMethod (c$, "getOrientationInfo", 
function () {
var info =  new java.util.Hashtable ();
info.put ("moveTo", this.getMoveToText (1, false));
info.put ("center", "center " + this.getCenterText ());
info.put ("centerPt", this.fixedRotationCenter);
var aa =  new JU.A4 ();
aa.setM (this.matrixRotate);
info.put ("axisAngle", aa);
info.put ("quaternion", this.getRotationQ ().toPoint4f ());
info.put ("rotationMatrix", this.matrixRotate);
info.put ("rotateZYZ", this.getRotateZyzText (false));
info.put ("rotateXYZ", this.getRotateXyzText ());
info.put ("transXPercent", Float.$valueOf (this.getTranslationXPercent ()));
info.put ("transYPercent", Float.$valueOf (this.getTranslationYPercent ()));
info.put ("zoom", Float.$valueOf (this.zmPct));
info.put ("modelRadius", Float.$valueOf (this.modelRadius));
if (this.mode == 1) {
info.put ("navigationCenter", "navigate center " + JU.Escape.eP (this.navigationCenter));
info.put ("navigationOffsetXPercent", Float.$valueOf (this.getNavigationOffsetPercent ('X')));
info.put ("navigationOffsetYPercent", Float.$valueOf (this.getNavigationOffsetPercent ('Y')));
info.put ("navigationDepthPercent", Float.$valueOf (this.navigationDepthPercent));
}return info;
});
Clazz.defineMethod (c$, "getRotation", 
function (m) {
m.setM3 (this.matrixRotate);
}, "JU.M3");
Clazz.defineMethod (c$, "setZoomHeight", 
function (zoomHeight, zoomLarge) {
this.zoomHeight = zoomHeight;
this.scaleFitToScreen (false, zoomLarge, false, true);
}, "~B,~B");
Clazz.defineMethod (c$, "zoomBy", 
function (pixels) {
if (pixels > 20) pixels = 20;
 else if (pixels < -20) pixels = -20;
var deltaPercent = pixels * this.zmPctSet / 50;
if (deltaPercent == 0) deltaPercent = (pixels > 0 ? 1 : (deltaPercent < 0 ? -1 : 0));
this.zoomRatio = (deltaPercent + this.zmPctSet) / this.zmPctSet;
this.zmPctSet += deltaPercent;
}, "~N");
Clazz.defineMethod (c$, "zoomByFactor", 
function (factor, x, y) {
if (factor <= 0 || !this.zoomEnabled) return;
if (this.mode != 1) {
this.zoomRatio = factor;
this.zmPctSet *= factor;
this.resetXYCenter (x, y);
} else if (this.getNav ()) {
this.nav.zoomByFactor (factor, x, y);
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "zoomToPercent", 
function (percentZoom) {
this.zmPctSet = percentZoom;
this.zoomRatio = 0;
}, "~N");
Clazz.defineMethod (c$, "translateZBy", 
function (pixels) {
if (pixels >= this.screenPixelCount) return;
var sppa = this.scalePixelsPerAngstrom / (1 - pixels * 1.0 / this.screenPixelCount);
if (sppa >= this.screenPixelCount) return;
var newZoomPercent = sppa / this.scaleDefaultPixelsPerAngstrom * 100;
this.zoomRatio = newZoomPercent / this.zmPctSet;
this.zmPctSet = newZoomPercent;
}, "~N");
Clazz.defineMethod (c$, "resetXYCenter", 
 function (x, y) {
if (x == 2147483647 || y == 2147483647) return;
if (this.windowCentered) this.vwr.setBooleanProperty ("windowCentered", false);
var pt =  new JU.P3 ();
this.transformPt3f (this.fixedRotationCenter, pt);
pt.set (x, y, pt.z);
this.unTransformPoint (pt, pt);
this.fixedTranslation.set (x, y, 0);
this.setFixedRotationCenter (pt);
}, "~N,~N");
Clazz.defineMethod (c$, "zoomByPercent", 
function (percentZoom) {
var deltaPercent = percentZoom * this.zmPctSet / 100;
if (deltaPercent == 0) deltaPercent = (percentZoom < 0) ? -1 : 1;
this.zoomRatio = (deltaPercent + this.zmPctSet) / this.zmPctSet;
this.zmPctSet += deltaPercent;
}, "~N");
Clazz.defineMethod (c$, "setScaleAngstromsPerInch", 
function (angstromsPerInch) {
this.scale3D = (angstromsPerInch > 0);
if (this.scale3D) this.scale3DAngstromsPerInch = angstromsPerInch;
this.perspectiveDepth = !this.scale3D;
}, "~N");
Clazz.defineMethod (c$, "setSlabRange", 
function (value) {
this.slabRange = value;
}, "~N");
Clazz.defineMethod (c$, "setSlabEnabled", 
function (slabEnabled) {
this.vwr.g.setB ("slabEnabled", this.slabEnabled = slabEnabled);
}, "~B");
Clazz.defineMethod (c$, "setZShadeEnabled", 
function (zShadeEnabled) {
this.zShadeEnabled = zShadeEnabled;
this.vwr.g.setB ("zShade", zShadeEnabled);
}, "~B");
Clazz.defineMethod (c$, "setZoomEnabled", 
function (zoomEnabled) {
this.zoomEnabled = zoomEnabled;
this.vwr.g.setB ("zoomEnabled", zoomEnabled);
}, "~B");
Clazz.defineMethod (c$, "slabReset", 
function () {
this.slabToPercent (100);
this.depthToPercent (0);
this.depthPlane = null;
this.slabPlane = null;
this.setSlabEnabled (false);
this.setZShadeEnabled (false);
this.slabDepthChanged ();
});
Clazz.defineMethod (c$, "getSlabPercentSetting", 
function () {
return this.slabPercentSetting;
});
Clazz.defineMethod (c$, "slabDepthChanged", 
 function () {
this.vwr.g.setI ("slab", this.slabPercentSetting);
this.vwr.g.setI ("depth", this.depthPercentSetting);
this.finalizeTransformParameters ();
});
Clazz.defineMethod (c$, "slabByPercentagePoints", 
function (percentage) {
this.slabPlane = null;
if (percentage < 0 ? this.slabPercentSetting <= Math.max (0, this.depthPercentSetting) : this.slabPercentSetting >= 100) return;
this.slabPercentSetting += percentage;
this.slabDepthChanged ();
if (this.depthPercentSetting >= this.slabPercentSetting) this.depthPercentSetting = this.slabPercentSetting - 1;
}, "~N");
Clazz.defineMethod (c$, "depthByPercentagePoints", 
function (percentage) {
this.depthPlane = null;
if (percentage < 0 ? this.depthPercentSetting <= 0 : this.depthPercentSetting >= Math.min (100, this.slabPercentSetting)) return;
this.depthPercentSetting += percentage;
if (this.slabPercentSetting <= this.depthPercentSetting) this.slabPercentSetting = this.depthPercentSetting + 1;
this.slabDepthChanged ();
}, "~N");
Clazz.defineMethod (c$, "slabDepthByPercentagePoints", 
function (percentage) {
this.slabPlane = null;
this.depthPlane = null;
if (percentage < 0 ? this.slabPercentSetting <= Math.max (0, this.depthPercentSetting) : this.depthPercentSetting >= Math.min (100, this.slabPercentSetting)) return;
this.slabPercentSetting += percentage;
this.depthPercentSetting += percentage;
this.slabDepthChanged ();
}, "~N");
Clazz.defineMethod (c$, "slabToPercent", 
function (percentSlab) {
this.slabPlane = null;
this.vwr.setFloatProperty ("slabRange", 0);
this.slabPercentSetting = percentSlab;
if (this.depthPercentSetting >= this.slabPercentSetting) this.depthPercentSetting = this.slabPercentSetting - 1;
this.slabDepthChanged ();
}, "~N");
Clazz.defineMethod (c$, "depthToPercent", 
function (percentDepth) {
this.depthPlane = null;
this.vwr.g.setI ("depth", percentDepth);
this.depthPercentSetting = percentDepth;
if (this.slabPercentSetting <= this.depthPercentSetting) this.slabPercentSetting = this.depthPercentSetting + 1;
this.slabDepthChanged ();
}, "~N");
Clazz.defineMethod (c$, "zSlabToPercent", 
function (percentSlab) {
this.zSlabPercentSetting = percentSlab;
if (this.zDepthPercentSetting > this.zSlabPercentSetting) this.zDepthPercentSetting = percentSlab;
}, "~N");
Clazz.defineMethod (c$, "zDepthToPercent", 
function (percentDepth) {
this.zDepthPercentSetting = percentDepth;
if (this.zDepthPercentSetting > this.zSlabPercentSetting) this.zSlabPercentSetting = percentDepth;
}, "~N");
Clazz.defineMethod (c$, "slabInternal", 
function (plane, isDepth) {
if (isDepth) {
this.depthPlane = plane;
this.depthPercentSetting = 0;
} else {
this.slabPlane = plane;
this.slabPercentSetting = 100;
}this.slabDepthChanged ();
}, "JU.P4,~B");
Clazz.defineMethod (c$, "setSlabDepthInternal", 
function (isDepth) {
if (isDepth) this.depthPlane = null;
 else this.slabPlane = null;
this.finalizeTransformParameters ();
this.slabInternal (this.getSlabDepthPlane (isDepth), isDepth);
}, "~B");
Clazz.defineMethod (c$, "getSlabDepthPlane", 
 function (isDepth) {
if (isDepth) {
if (this.depthPlane != null) return this.depthPlane;
} else if (this.slabPlane != null) {
return this.slabPlane;
}var m = this.matrixTransform;
var plane = JU.P4.new4 (-m.m20, -m.m21, -m.m22, -m.m23 + (isDepth ? this.depthValue : this.slabValue));
return plane;
}, "~B");
Clazz.defineMethod (c$, "getCameraFactors", 
function () {
this.aperatureAngle = (Math.atan2 (this.screenPixelCount / 2, this.referencePlaneOffset) * 2 * 180 / 3.141592653589793);
this.cameraDistanceFromCenter = this.referencePlaneOffset / this.scalePixelsPerAngstrom;
var ptRef = JU.P3.new3 (Clazz.doubleToInt (this.screenWidth / 2), Clazz.doubleToInt (this.screenHeight / 2), this.referencePlaneOffset);
this.unTransformPoint (ptRef, ptRef);
var ptCamera = JU.P3.new3 (Clazz.doubleToInt (this.screenWidth / 2), Clazz.doubleToInt (this.screenHeight / 2), 0);
this.unTransformPoint (ptCamera, ptCamera);
ptCamera.sub (this.fixedRotationCenter);
var pt = JU.P3.new3 (Clazz.doubleToInt (this.screenWidth / 2), Clazz.doubleToInt (this.screenHeight / 2), this.cameraDistanceFromCenter * this.scalePixelsPerAngstrom);
this.unTransformPoint (pt, pt);
pt.sub (this.fixedRotationCenter);
ptCamera.add (pt);
return  Clazz.newArray (-1, [ptRef, ptCamera, this.fixedRotationCenter, JU.P3.new3 (this.cameraDistanceFromCenter, this.aperatureAngle, this.scalePixelsPerAngstrom)]);
});
Clazz.defineMethod (c$, "setPerspectiveDepth", 
function (perspectiveDepth) {
if (this.perspectiveDepth == perspectiveDepth) return;
this.perspectiveDepth = perspectiveDepth;
this.vwr.g.setB ("perspectiveDepth", perspectiveDepth);
this.resetFitToScreen (false);
}, "~B");
Clazz.defineMethod (c$, "getPerspectiveDepth", 
function () {
return this.perspectiveDepth;
});
Clazz.defineMethod (c$, "setCameraDepthPercent", 
function (percent, resetSlab) {
this.resetNavigationPoint (resetSlab);
var screenMultiples = (percent < 0 ? -percent / 100 : percent);
if (screenMultiples == 0) return;
this.cameraDepthSetting = screenMultiples;
this.vwr.g.setF ("cameraDepth", this.cameraDepthSetting);
this.cameraDepth = NaN;
}, "~N,~B");
Clazz.defineMethod (c$, "getCameraDepth", 
function () {
return this.cameraDepthSetting;
});
Clazz.defineMethod (c$, "setScreenParameters0", 
 function (screenWidth, screenHeight, useZoomLarge, antialias, resetSlab, resetZoom) {
if (screenWidth == 2147483647) return;
this.screenWidth = screenWidth;
this.screenHeight = screenHeight;
this.useZoomLarge = useZoomLarge;
this.antialias = antialias;
this.width = (antialias ? screenWidth * 2 : screenWidth);
this.height = (antialias ? screenHeight * 2 : screenHeight);
this.scaleFitToScreen (false, useZoomLarge, resetSlab, resetZoom);
}, "~N,~N,~B,~B,~B,~B");
Clazz.defineMethod (c$, "setAntialias", 
function (TF) {
var isNew = (this.antialias != TF);
this.antialias = TF;
this.width = (this.antialias ? this.screenWidth * 2 : this.screenWidth);
this.height = (this.antialias ? this.screenHeight * 2 : this.screenHeight);
if (isNew) this.scaleFitToScreen (false, this.useZoomLarge, false, false);
}, "~B");
Clazz.defineMethod (c$, "defaultScaleToScreen", 
function (radius) {
return this.screenPixelCount / 2 / radius;
}, "~N");
Clazz.defineMethod (c$, "resetFitToScreen", 
 function (andCenter) {
this.scaleFitToScreen (andCenter, this.vwr.g.zoomLarge, true, true);
}, "~B");
Clazz.defineMethod (c$, "scaleFitToScreen", 
function (andCenter, zoomLarge, resetSlab, resetZoom) {
if (this.width == 0 || this.height == 0) {
this.screenPixelCount = 1;
} else {
this.fixedTranslation.set (this.width * (andCenter ? 0.5 : this.xTranslationFraction), this.height * (andCenter ? 0.5 : this.yTranslationFraction), 0);
this.setTranslationFractions ();
if (andCenter) this.camera.set (0, 0, 0);
if (resetZoom) this.resetNavigationPoint (resetSlab);
if (this.zoomHeight) zoomLarge = (this.height > this.width);
this.screenPixelCount = (zoomLarge == (this.height > this.width) ? this.height : this.width);
}if (this.screenPixelCount > 2) this.screenPixelCount -= 2;
this.scaleDefaultPixelsPerAngstrom = this.defaultScaleToScreen (this.modelRadius);
}, "~B,~B,~B,~B");
Clazz.defineMethod (c$, "scaleToScreen", 
function (z, milliAngstroms) {
if (milliAngstroms == 0 || z < 2) return 0;
var pixelSize = this.scaleToPerspective (z, milliAngstroms * this.scalePixelsPerAngstrom / 1000);
return (pixelSize > 0 ? pixelSize : 1);
}, "~N,~N");
Clazz.defineMethod (c$, "unscaleToScreen", 
function (z, screenDistance) {
var d = screenDistance / this.scalePixelsPerAngstrom;
return (this.perspectiveDepth ? d / this.getPerspectiveFactor (z) : d);
}, "~N,~N");
Clazz.defineMethod (c$, "scaleToPerspective", 
function (z, sizeAngstroms) {
return (this.perspectiveDepth ? sizeAngstroms * this.getPerspectiveFactor (z) : sizeAngstroms);
}, "~N,~N");
Clazz.defineMethod (c$, "setNavigationMode", 
function (TF) {
this.mode = (TF ? 1 : this.defaultMode);
this.resetNavigationPoint (true);
}, "~B");
Clazz.defineMethod (c$, "isNavigating", 
function () {
return this.navigating || this.navOn;
});
Clazz.defineMethod (c$, "finalizeTransformParameters", 
function () {
this.haveNotifiedNaN = false;
this.fixedRotationOffset.setT (this.fixedTranslation);
this.camera.setT (this.cameraSetting);
this.internalSlab = this.slabEnabled && (this.slabPlane != null || this.depthPlane != null);
var newZoom = this.getZoomSetting ();
if (this.zmPct != newZoom) {
this.zmPct = newZoom;
if (!this.vwr.g.fontCaching) this.vwr.gdata.clearFontCache ();
}this.calcCameraFactors ();
this.calcTransformMatrix ();
if (this.mode == 1) this.calcNavigationPoint ();
 else this.calcSlabAndDepthValues ();
});
Clazz.defineMethod (c$, "getZoomSetting", 
function () {
if (this.zmPctSet < 5) this.zmPctSet = 5;
if (this.zmPctSet > 200000) this.zmPctSet = 200000;
return (this.zoomEnabled || this.mode == 1 ? this.zmPctSet : 100);
});
Clazz.defineMethod (c$, "calcSlabAndDepthValues", 
function () {
if (this.slabRange < 1) this.slabValue = this.zValueFromPercent (this.slabPercentSetting);
 else this.slabValue = Clazz.doubleToInt (Math.floor (this.modelCenterOffset * this.slabRange / (2 * this.modelRadius) * (this.zmPctSet / 100)));
this.depthValue = this.zValueFromPercent (this.depthPercentSetting);
if (this.zSlabPercentSetting == this.zDepthPercentSetting) {
this.zSlabValue = this.slabValue;
this.zDepthValue = this.depthValue;
} else {
this.zSlabValue = this.zValueFromPercent (this.zSlabPercentSetting);
this.zDepthValue = this.zValueFromPercent (this.zDepthPercentSetting);
}if (this.zSlabPoint != null) {
try {
this.transformPt3f (this.zSlabPoint, this.pointT2);
this.zSlabValue = Clazz.floatToInt (this.pointT2.z);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}this.vwr.g.setO ("_slabPlane", JU.Escape.eP4 (this.getSlabDepthPlane (false)));
this.vwr.g.setO ("_depthPlane", JU.Escape.eP4 (this.getSlabDepthPlane (true)));
if (this.slabEnabled) return;
this.slabValue = 0;
this.depthValue = 2147483647;
});
Clazz.defineMethod (c$, "zValueFromPercent", 
function (zPercent) {
return Clazz.doubleToInt (Math.floor ((1 - zPercent / 50) * this.modelRadiusPixels + this.modelCenterOffset));
}, "~N");
Clazz.defineMethod (c$, "calcTransformMatrix", 
function () {
this.matrixTransform.setIdentity ();
this.vectorTemp.sub2 (this.frameOffset, this.fixedRotationCenter);
this.matrixTransform.setTranslation (this.vectorTemp);
this.matrixTemp.setToM3 (this.stereoFrame ? this.matrixStereo : this.matrixRotate);
this.matrixTransform.mul2 (this.matrixTemp, this.matrixTransform);
this.matrixTemp.setIdentity ();
this.matrixTemp.m00 = this.matrixTemp.m11 = this.matrixTemp.m22 = this.scalePixelsPerAngstrom;
this.matrixTemp.m11 = this.matrixTemp.m22 = -this.scalePixelsPerAngstrom;
this.matrixTransform.mul2 (this.matrixTemp, this.matrixTransform);
this.matrixTransform.m23 += this.modelCenterOffset;
try {
this.matrixTransformInv.setM4 (this.matrixTransform).invert ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("ERROR INVERTING matrixTransform!");
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "rotatePoint", 
function (pt, ptRot) {
this.matrixRotate.rotate2 (pt, ptRot);
ptRot.y = -ptRot.y;
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "getScreenTemp", 
function (ptXYZ) {
this.matrixTransform.rotTrans2 (ptXYZ, this.fScrPt);
}, "JU.T3");
Clazz.defineMethod (c$, "transformPtScr", 
function (ptXYZ, pointScreen) {
pointScreen.setT (this.transformPt (ptXYZ));
}, "JU.T3,JU.P3i");
Clazz.defineMethod (c$, "transformPtScrT3", 
function (ptXYZ, pointScreen) {
this.transformPt (ptXYZ);
pointScreen.setT (this.fScrPt);
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "transformPt3f", 
function (ptXYZ, screen) {
this.applyPerspective (ptXYZ, ptXYZ);
screen.setT (this.fScrPt);
}, "JU.T3,JU.P3");
Clazz.defineMethod (c$, "transformPtNoClip", 
function (ptXYZ, pointScreen) {
this.applyPerspective (ptXYZ, null);
pointScreen.setT (this.fScrPt);
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "transformPt", 
function (ptXYZ) {
return this.applyPerspective (ptXYZ, this.internalSlab ? ptXYZ : null);
}, "JU.T3");
Clazz.defineMethod (c$, "transformPtVib", 
function (ptXYZ, v) {
this.ptVibTemp.setT (ptXYZ);
return this.applyPerspective (this.getVibrationPoint (v, this.ptVibTemp, NaN), ptXYZ);
}, "JU.P3,JU.Vibration");
Clazz.defineMethod (c$, "getVibrationPoint", 
function (v, pt, scale) {
return v.setCalcPoint (pt, this.vibrationT, (Float.isNaN (scale) ? this.vibrationScale : scale), this.vwr.g.modulationScale);
}, "JU.Vibration,JU.T3,~N");
Clazz.defineMethod (c$, "transformPt2D", 
function (ptXyp) {
if (ptXyp.z == -3.4028235E38) {
this.iScrPt.x = Clazz.doubleToInt (Math.floor (ptXyp.x / 100 * this.screenWidth));
this.iScrPt.y = Clazz.doubleToInt (Math.floor ((1 - ptXyp.y / 100) * this.screenHeight));
} else {
this.iScrPt.x = Clazz.floatToInt (ptXyp.x);
this.iScrPt.y = (this.screenHeight - Clazz.floatToInt (ptXyp.y));
}if (this.antialias) {
this.iScrPt.x <<= 1;
this.iScrPt.y <<= 1;
}this.matrixTransform.rotTrans2 (this.fixedRotationCenter, this.fScrPt);
this.iScrPt.z = Clazz.floatToInt (this.fScrPt.z);
return this.iScrPt;
}, "JU.T3");
Clazz.defineMethod (c$, "applyPerspective", 
 function (ptXYZ, ptRef) {
this.getScreenTemp (ptXYZ);
var z = this.fScrPt.z;
if (Float.isNaN (z)) {
if (!this.haveNotifiedNaN && JU.Logger.debugging) JU.Logger.debug ("NaN seen in TransformPoint");
this.haveNotifiedNaN = true;
z = this.fScrPt.z = 1;
} else if (z <= 0) {
z = this.fScrPt.z = 1;
}switch (this.mode) {
case 1:
this.fScrPt.x -= this.navigationShiftXY.x;
this.fScrPt.y -= this.navigationShiftXY.y;
break;
case 2:
this.fScrPt.x += this.perspectiveShiftXY.x;
this.fScrPt.y += this.perspectiveShiftXY.y;
break;
}
if (this.perspectiveDepth) {
var factor = this.getPerspectiveFactor (z);
this.fScrPt.x *= factor;
this.fScrPt.y *= factor;
}switch (this.mode) {
case 1:
this.fScrPt.x += this.navigationOffset.x;
this.fScrPt.y += this.navigationOffset.y;
break;
case 2:
this.fScrPt.x -= this.perspectiveShiftXY.x;
this.fScrPt.y -= this.perspectiveShiftXY.y;
case 0:
this.fScrPt.x += this.fixedRotationOffset.x;
this.fScrPt.y += this.fixedRotationOffset.y;
break;
}
if (Float.isNaN (this.fScrPt.x) && !this.haveNotifiedNaN) {
if (JU.Logger.debugging) JU.Logger.debug ("NaN found in transformPoint ");
this.haveNotifiedNaN = true;
}this.iScrPt.set (Clazz.floatToInt (this.fScrPt.x), Clazz.floatToInt (this.fScrPt.y), Clazz.floatToInt (this.fScrPt.z));
if (ptRef != null && this.xyzIsSlabbedInternal (ptRef)) this.fScrPt.z = this.iScrPt.z = 1;
return this.iScrPt;
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "xyzIsSlabbedInternal", 
function (ptRef) {
return (this.slabPlane != null && ptRef.x * this.slabPlane.x + ptRef.y * this.slabPlane.y + ptRef.z * this.slabPlane.z + this.slabPlane.w > 0 || this.depthPlane != null && ptRef.x * this.depthPlane.x + ptRef.y * this.depthPlane.y + ptRef.z * this.depthPlane.z + this.depthPlane.w < 0);
}, "JU.T3");
Clazz.defineMethod (c$, "move", 
function (eval, dRot, dZoom, dTrans, dSlab, floatSecondsTotal, fps) {
this.movetoThread = J.api.Interface.getOption ("thread.MoveToThread", this.vwr, "tm");
this.movetoThread.setManager (this, this.vwr,  Clazz.newArray (-1, [dRot, dTrans,  Clazz.newFloatArray (-1, [dZoom, dSlab, floatSecondsTotal, fps])]));
if (floatSecondsTotal > 0) this.movetoThread.setEval (eval);
this.movetoThread.run ();
}, "J.api.JmolScriptEvaluator,JU.V3,~N,JU.V3,~N,~N,~N");
Clazz.defineMethod (c$, "isInPosition", 
function (axis, degrees) {
if (Float.isNaN (degrees)) return true;
this.aaTest1.setVA (axis, (degrees / 57.29577951308232));
this.ptTest1.set (4.321, 1.23456, 3.14159);
this.getRotation (this.matrixTest);
this.matrixTest.rotate2 (this.ptTest1, this.ptTest2);
this.matrixTest.setAA (this.aaTest1).rotate2 (this.ptTest1, this.ptTest3);
return (this.ptTest3.distance (this.ptTest2) < 0.1);
}, "JU.V3,~N");
Clazz.defineMethod (c$, "moveToPyMOL", 
function (eval, floatSecondsTotal, pymolView) {
var m3 = JU.M3.newA9 (pymolView);
m3.invert ();
var cameraX = pymolView[9];
var cameraY = -pymolView[10];
var pymolDistanceToCenter = -pymolView[11];
var center = JU.P3.new3 (pymolView[12], pymolView[13], pymolView[14]);
var pymolDistanceToSlab = pymolView[15];
var pymolDistanceToDepth = pymolView[16];
var fov = pymolView[17];
var isOrtho = (fov >= 0);
this.setPerspectiveDepth (!isOrtho);
var theta = Math.abs (fov) / 2;
var tan = Math.tan (theta * 3.141592653589793 / 180);
var rotationRadius = pymolDistanceToCenter * tan;
var jmolCameraToCenter = 0.5 / tan;
var cameraDepth = jmolCameraToCenter - 0.5;
var f = 50 / rotationRadius;
if (pymolDistanceToSlab > 0) {
var slab = 50 + Clazz.floatToInt ((pymolDistanceToCenter - pymolDistanceToSlab) * f);
var depth = 50 + Clazz.floatToInt ((pymolDistanceToCenter - pymolDistanceToDepth) * f);
this.setSlabEnabled (true);
this.slabToPercent (slab);
this.depthToPercent (depth);
if (pymolView.length == 21) {
var depthCue = (pymolView[18] != 0);
var fog = (pymolView[19] != 0);
var fogStart = pymolView[20];
this.setZShadeEnabled (depthCue);
if (depthCue) {
if (fog) {
this.vwr.setIntProperty ("zSlab", Clazz.floatToInt (Math.min (100, slab + fogStart * (depth - slab))));
} else {
this.vwr.setIntProperty ("zSlab", Clazz.floatToInt ((slab + depth) / 2));
}this.vwr.setIntProperty ("zDepth", depth);
}}}this.moveTo (eval, floatSecondsTotal, center, null, 0, m3, 100, NaN, NaN, rotationRadius, null, NaN, NaN, NaN, cameraDepth, cameraX, cameraY);
return true;
}, "J.api.JmolScriptEvaluator,~N,~A");
Clazz.defineMethod (c$, "moveTo", 
function (eval, floatSecondsTotal, center, rotAxis, degrees, matrixEnd, zoom, xTrans, yTrans, newRotationRadius, navCenter, xNav, yNav, navDepth, cameraDepth, cameraX, cameraY) {
if (matrixEnd == null) {
matrixEnd =  new JU.M3 ();
var axis = JU.V3.newV (rotAxis);
if (Float.isNaN (degrees)) {
matrixEnd.m00 = NaN;
} else if (degrees < 0.01 && degrees > -0.01) {
matrixEnd.setScale (1);
} else {
if (axis.x == 0 && axis.y == 0 && axis.z == 0) {
return;
}var aaMoveTo =  new JU.A4 ();
aaMoveTo.setVA (axis, (degrees / 57.29577951308232));
matrixEnd.setAA (aaMoveTo);
}}if (cameraX == this.cameraSetting.x) cameraX = NaN;
if (cameraY == this.cameraSetting.y) cameraY = NaN;
if (cameraDepth == this.cameraDepth) cameraDepth = NaN;
if (!Float.isNaN (cameraX)) xTrans = cameraX * 50 / newRotationRadius / this.width * this.screenPixelCount;
if (!Float.isNaN (cameraY)) yTrans = cameraY * 50 / newRotationRadius / this.height * this.screenPixelCount;
var pixelScale = (center == null ? this.scaleDefaultPixelsPerAngstrom : this.defaultScaleToScreen (newRotationRadius));
if (floatSecondsTotal <= 0) {
this.setAll (center, matrixEnd, navCenter, zoom, xTrans, yTrans, newRotationRadius, pixelScale, navDepth, xNav, yNav, cameraDepth, cameraX, cameraY);
this.vwr.moveUpdate (floatSecondsTotal);
this.vwr.finalizeTransformParameters ();
return;
}try {
if (this.movetoThread == null) this.movetoThread = J.api.Interface.getOption ("thread.MoveToThread", this.vwr, "tm");
var nSteps = this.movetoThread.setManager (this, this.vwr,  Clazz.newArray (-1, [center, matrixEnd, navCenter,  Clazz.newFloatArray (-1, [floatSecondsTotal, zoom, xTrans, yTrans, newRotationRadius, pixelScale, navDepth, xNav, yNav, cameraDepth, cameraX, cameraY])]));
if (nSteps <= 0 || this.vwr.g.waitForMoveTo) {
if (nSteps > 0) this.movetoThread.setEval (eval);
this.movetoThread.run ();
if (!this.vwr.isSingleThreaded) this.movetoThread = null;
} else {
this.movetoThread.start ();
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "J.api.JmolScriptEvaluator,~N,JU.P3,JU.T3,~N,JU.M3,~N,~N,~N,~N,JU.P3,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAll", 
function (center, m, navCenter, zoom, xTrans, yTrans, rotationRadius, pixelScale, navDepth, xNav, yNav, cameraDepth, cameraX, cameraY) {
if (!Float.isNaN (m.m00)) this.setRotation (m);
if (center != null) this.moveRotationCenter (center, !this.windowCentered);
if (navCenter != null && this.mode == 1) this.navigationCenter.setT (navCenter);
if (!Float.isNaN (cameraDepth)) this.setCameraDepthPercent (cameraDepth, false);
if (!Float.isNaN (cameraX) && !Float.isNaN (cameraY)) this.setCamera (cameraX, cameraY);
if (!Float.isNaN (zoom)) this.zoomToPercent (zoom);
if (!Float.isNaN (rotationRadius)) this.modelRadius = rotationRadius;
if (!Float.isNaN (pixelScale)) this.scaleDefaultPixelsPerAngstrom = pixelScale;
if (!Float.isNaN (xTrans) && !Float.isNaN (yTrans)) {
this.translateToPercent ('x', xTrans);
this.translateToPercent ('y', yTrans);
}if (this.mode == 1) {
if (!Float.isNaN (xNav) && !Float.isNaN (yNav)) this.navTranslatePercentOrTo (0, xNav, yNav);
if (!Float.isNaN (navDepth)) this.setNavigationDepthPercent (navDepth);
}}, "JU.P3,JU.M3,JU.P3,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "stopMotion", 
function () {
this.movetoThread = null;
});
Clazz.defineMethod (c$, "getRotationText", 
function () {
this.axisangleT.setM (this.matrixRotate);
var degrees = (this.axisangleT.angle * 57.29577951308232);
var sb =  new JU.SB ();
this.vectorT.set (this.axisangleT.x, this.axisangleT.y, this.axisangleT.z);
if (degrees < 0.01) return "{0 0 1 0}";
this.vectorT.normalize ();
this.vectorT.scale (1000);
sb.append ("{");
JV.TransformManager.truncate0 (sb, this.vectorT.x);
JV.TransformManager.truncate0 (sb, this.vectorT.y);
JV.TransformManager.truncate0 (sb, this.vectorT.z);
JV.TransformManager.truncate2 (sb, degrees);
sb.append ("}");
return sb.toString ();
});
Clazz.defineMethod (c$, "getMoveToText", 
function (timespan, addComments) {
this.finalizeTransformParameters ();
var sb =  new JU.SB ();
sb.append ("moveto ");
if (addComments) sb.append ("/* time, axisAngle */ ");
sb.appendF (timespan);
sb.append (" ").append (this.getRotationText ());
if (addComments) sb.append (" /* zoom, translation */ ");
JV.TransformManager.truncate2 (sb, this.zmPctSet);
JV.TransformManager.truncate2 (sb, this.getTranslationXPercent ());
JV.TransformManager.truncate2 (sb, this.getTranslationYPercent ());
sb.append (" ");
if (addComments) sb.append (" /* center, rotationRadius */ ");
sb.append (this.getCenterText ());
sb.append (" ").appendF (this.modelRadius);
sb.append (this.getNavigationText (addComments));
if (addComments) sb.append (" /* cameraDepth, cameraX, cameraY */ ");
JV.TransformManager.truncate2 (sb, this.cameraDepth);
JV.TransformManager.truncate2 (sb, this.cameraSetting.x);
JV.TransformManager.truncate2 (sb, this.cameraSetting.y);
sb.append (";");
return sb.toString ();
}, "~N,~B");
Clazz.defineMethod (c$, "getCenterText", 
 function () {
return JU.Escape.eP (this.fixedRotationCenter);
});
Clazz.defineMethod (c$, "getRotateXyzText", 
 function () {
var sb =  new JU.SB ();
var m20 = this.matrixRotate.m20;
var rY = -(Math.asin (m20) * 57.29577951308232);
var rX;
var rZ;
if (m20 > .999 || m20 < -0.999) {
rX = -(Math.atan2 (this.matrixRotate.m12, this.matrixRotate.m11) * 57.29577951308232);
rZ = 0;
} else {
rX = (Math.atan2 (this.matrixRotate.m21, this.matrixRotate.m22) * 57.29577951308232);
rZ = (Math.atan2 (this.matrixRotate.m10, this.matrixRotate.m00) * 57.29577951308232);
}sb.append ("reset");
sb.append (";center ").append (this.getCenterText ());
if (rX != 0) {
sb.append ("; rotate x");
JV.TransformManager.truncate2 (sb, rX);
}if (rY != 0) {
sb.append ("; rotate y");
JV.TransformManager.truncate2 (sb, rY);
}if (rZ != 0) {
sb.append ("; rotate z");
JV.TransformManager.truncate2 (sb, rZ);
}sb.append (";");
this.addZoomTranslationNavigationText (sb);
return sb.toString ();
});
Clazz.defineMethod (c$, "addZoomTranslationNavigationText", 
 function (sb) {
if (this.zmPct != 100) {
sb.append (" zoom");
JV.TransformManager.truncate2 (sb, this.zmPct);
sb.append (";");
}var tX = this.getTranslationXPercent ();
if (tX != 0) {
sb.append (" translate x");
JV.TransformManager.truncate2 (sb, tX);
sb.append (";");
}var tY = this.getTranslationYPercent ();
if (tY != 0) {
sb.append (" translate y");
JV.TransformManager.truncate2 (sb, tY);
sb.append (";");
}if (this.modelRadius != this.rotationRadiusDefault || this.modelRadius == 10) {
sb.append (" set rotationRadius");
JV.TransformManager.truncate2 (sb, this.modelRadius);
sb.append (";");
}if (this.mode == 1) {
sb.append ("navigate 0 center ").append (JU.Escape.eP (this.navigationCenter));
sb.append (";navigate 0 translate");
JV.TransformManager.truncate2 (sb, this.getNavigationOffsetPercent ('X'));
JV.TransformManager.truncate2 (sb, this.getNavigationOffsetPercent ('Y'));
sb.append (";navigate 0 depth ");
JV.TransformManager.truncate2 (sb, this.navigationDepthPercent);
sb.append (";");
}}, "JU.SB");
Clazz.defineMethod (c$, "getRotateZyzText", 
 function (iAddComment) {
var sb =  new JU.SB ();
var m = this.vwr.ms.getInfoM ("defaultOrientationMatrix");
if (m == null) {
m = this.matrixRotate;
} else {
m = JU.M3.newM3 (m);
m.invert ();
m.mul2 (this.matrixRotate, m);
}var m22 = m.m22;
var rY = (Math.acos (m22) * 57.29577951308232);
var rZ1;
var rZ2;
if (m22 > .999 || m22 < -0.999) {
rZ1 = (Math.atan2 (m.m10, m.m11) * 57.29577951308232);
rZ2 = 0;
} else {
rZ1 = (Math.atan2 (m.m21, -m.m20) * 57.29577951308232);
rZ2 = (Math.atan2 (m.m12, m.m02) * 57.29577951308232);
}if (rZ1 != 0 && rY != 0 && rZ2 != 0 && iAddComment) sb.append ("#Follows Z-Y-Z convention for Euler angles\n");
sb.append ("reset");
sb.append (";center ").append (this.getCenterText ());
if (rZ1 != 0) {
sb.append ("; rotate z");
JV.TransformManager.truncate2 (sb, rZ1);
}if (rY != 0) {
sb.append ("; rotate y");
JV.TransformManager.truncate2 (sb, rY);
}if (rZ2 != 0) {
sb.append ("; rotate z");
JV.TransformManager.truncate2 (sb, rZ2);
}sb.append (";");
this.addZoomTranslationNavigationText (sb);
return sb.toString ();
}, "~B");
c$.truncate0 = Clazz.defineMethod (c$, "truncate0", 
 function (sb, val) {
sb.appendC (' ');
sb.appendI (Math.round (val));
}, "JU.SB,~N");
c$.truncate2 = Clazz.defineMethod (c$, "truncate2", 
 function (sb, val) {
sb.appendC (' ');
sb.appendF (Math.round (val * 100) / 100);
}, "JU.SB,~N");
Clazz.defineMethod (c$, "setSpinXYZ", 
function (x, y, z) {
if (!Float.isNaN (x)) this.spinX = x;
if (!Float.isNaN (y)) this.spinY = y;
if (!Float.isNaN (z)) this.spinZ = z;
if (this.isSpinInternal || this.isSpinFixed) this.clearSpin ();
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setSpinFps", 
function (value) {
if (value <= 0) value = 1;
 else if (value > 50) value = 50;
this.spinFps = value;
}, "~N");
Clazz.defineMethod (c$, "setNavXYZ", 
function (x, y, z) {
if (!Float.isNaN (x)) this.navX = x;
if (!Float.isNaN (y)) this.navY = y;
if (!Float.isNaN (z)) this.navZ = z;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "clearSpin", 
 function () {
this.setSpinOff ();
this.setNavOn (false);
this.isSpinInternal = false;
this.isSpinFixed = false;
});
Clazz.defineMethod (c$, "setSpinOn", 
function () {
this.setSpin (null, true, 3.4028235E38, null, null, null, false);
});
Clazz.defineMethod (c$, "setSpinOff", 
function () {
this.setSpin (null, false, 3.4028235E38, null, null, null, false);
});
Clazz.defineMethod (c$, "setSpin", 
 function (eval, spinOn, endDegrees, endPositions, dihedralList, bsAtoms, isGesture) {
if (this.navOn && spinOn) this.setNavOn (false);
if (this.spinOn == spinOn) return;
this.spinOn = spinOn;
this.vwr.g.setB ("_spinning", spinOn);
if (spinOn) {
if (this.spinThread == null) {
this.spinThread = J.api.Interface.getOption ("thread.SpinThread", this.vwr, "tm");
this.spinThread.setManager (this, this.vwr,  Clazz.newArray (-1, [Float.$valueOf (endDegrees), endPositions, dihedralList, bsAtoms, isGesture ? Boolean.TRUE : null]));
this.spinIsGesture = isGesture;
if ((Float.isNaN (endDegrees) || endDegrees == 3.4028235E38 || !this.vwr.g.waitForMoveTo)) {
this.spinThread.start ();
} else {
this.spinThread.setEval (eval);
this.spinThread.run ();
}}} else if (this.spinThread != null) {
this.spinThread.reset ();
this.spinThread = null;
}}, "J.api.JmolScriptEvaluator,~B,~N,JU.Lst,~A,JU.BS,~B");
Clazz.defineMethod (c$, "setNavOn", 
function (navOn) {
if (Float.isNaN (this.navFps)) return;
var wasOn = this.navOn;
if (navOn && this.spinOn) this.setSpin (null, false, 0, null, null, null, false);
this.navOn = navOn;
this.vwr.g.setB ("_navigating", navOn);
if (!navOn) this.navInterrupt ();
if (navOn) {
if (this.navX == 0 && this.navY == 0 && this.navZ == 0) this.navZ = 1;
if (this.navFps == 0) this.navFps = 10;
if (this.spinThread == null) {
this.spinThread = J.api.Interface.getOption ("thread.SpinThread", this.vwr, "tm");
this.spinThread.setManager (this, this.vwr, null);
this.spinThread.start ();
}} else if (wasOn) {
if (this.spinThread != null) {
this.spinThread.interrupt ();
this.spinThread = null;
}}}, "~B");
Clazz.defineMethod (c$, "setVibrationScale", 
function (scale) {
this.vibrationScale = scale;
}, "~N");
Clazz.defineMethod (c$, "setVibrationPeriod", 
function (period) {
if (Float.isNaN (period)) {
period = this.vibrationPeriod;
} else if (period == 0) {
this.vibrationPeriod = 0;
this.vibrationPeriodMs = 0;
} else {
this.vibrationPeriod = Math.abs (period);
this.vibrationPeriodMs = Clazz.floatToInt (this.vibrationPeriod * 1000);
if (period > 0) return;
period = -period;
}this.setVibrationOn (period > 0 && (this.vwr.ms.getLastVibrationVector (this.vwr.am.cmi, 0) >= 0));
}, "~N");
Clazz.defineMethod (c$, "setVibrationT", 
function (t) {
this.vibrationT.x = t;
if (this.vibrationScale == 0) this.vibrationScale = this.vwr.g.vibrationScale;
}, "~N");
Clazz.defineMethod (c$, "isVibrationOn", 
function () {
return this.vibrationOn;
});
Clazz.defineMethod (c$, "setVibrationOn", 
 function (vibrationOn) {
if (!vibrationOn) {
if (this.vibrationThread != null) {
this.vibrationThread.interrupt ();
this.vibrationThread = null;
}this.vibrationOn = false;
this.vibrationT.x = 0;
return;
}if (this.vwr.ms.mc < 1) {
this.vibrationOn = false;
this.vibrationT.x = 0;
return;
}if (this.vibrationThread == null) {
this.vibrationThread = J.api.Interface.getOption ("thread.VibrationThread", this.vwr, "tm");
this.vibrationThread.setManager (this, this.vwr, null);
this.vibrationThread.start ();
}this.vibrationOn = true;
}, "~B");
Clazz.defineMethod (c$, "clearVibration", 
 function () {
this.setVibrationOn (false);
this.vibrationScale = 0;
});
Clazz.defineMethod (c$, "setStereoMode2", 
function (twoColors) {
this.stereoMode = J.c.STER.CUSTOM;
this.stereoColors = twoColors;
}, "~A");
Clazz.defineMethod (c$, "setStereoMode", 
function (stereoMode) {
this.stereoColors = null;
this.stereoMode = stereoMode;
this.stereoDoubleDTI = (stereoMode === J.c.STER.DTI);
this.stereoDoubleFull = (stereoMode === J.c.STER.DOUBLE);
}, "J.c.STER");
Clazz.defineMethod (c$, "setStereoDegrees", 
function (stereoDegrees) {
this.stereoDegrees = stereoDegrees;
this.stereoRadians = stereoDegrees * 0.017453292;
}, "~N");
Clazz.defineMethod (c$, "getStereoRotationMatrix", 
function (stereoFrame) {
this.stereoFrame = stereoFrame;
if (!stereoFrame) return this.matrixRotate;
this.matrixTemp3.setAsYRotation (-this.stereoRadians);
this.matrixStereo.mul2 (this.matrixTemp3, this.matrixRotate);
return this.matrixStereo;
}, "~B");
Clazz.defineMethod (c$, "isWindowCentered", 
function () {
return this.windowCentered;
});
Clazz.defineMethod (c$, "setWindowCentered", 
function (TF) {
this.windowCentered = TF;
this.resetNavigationPoint (true);
}, "~B");
Clazz.defineMethod (c$, "setRotationRadius", 
function (angstroms, doAll) {
angstroms = (this.modelRadius = (angstroms <= 0 ? this.vwr.ms.calcRotationRadius (this.vwr.am.cmi, this.fixedRotationCenter, true) : angstroms));
if (doAll) this.vwr.setRotationRadius (angstroms, false);
return angstroms;
}, "~N,~B");
Clazz.defineMethod (c$, "setRotationCenterAndRadiusXYZ", 
 function (newCenterOfRotation, andRadius) {
this.resetNavigationPoint (false);
if (newCenterOfRotation == null) {
this.setFixedRotationCenter (this.rotationCenterDefault);
this.modelRadius = this.rotationRadiusDefault;
return;
}this.setFixedRotationCenter (newCenterOfRotation);
if (andRadius && this.windowCentered) this.modelRadius = this.vwr.ms.calcRotationRadius (this.vwr.am.cmi, this.fixedRotationCenter, true);
}, "JU.T3,~B");
Clazz.defineMethod (c$, "setNewRotationCenter", 
function (center, doScale) {
if (center == null) center = this.rotationCenterDefault;
if (this.windowCentered) {
this.translateToPercent ('x', 0);
this.translateToPercent ('y', 0);
this.setRotationCenterAndRadiusXYZ (center, true);
if (doScale) this.resetFitToScreen (true);
} else {
this.moveRotationCenter (center, true);
}}, "JU.P3,~B");
Clazz.defineMethod (c$, "moveRotationCenter", 
function (center, toXY) {
this.setRotationCenterAndRadiusXYZ (center, false);
if (toXY) this.setRotationPointXY (this.fixedRotationCenter);
}, "JU.P3,~B");
Clazz.defineMethod (c$, "setCenter", 
function () {
this.setRotationCenterAndRadiusXYZ (this.fixedRotationCenter, true);
});
Clazz.defineMethod (c$, "setCenterAt", 
function (relativeTo, pt) {
var pt1 = JU.P3.newP (pt);
switch (relativeTo) {
case 1073741826:
break;
case 96:
pt1.add (this.vwr.ms.getAverageAtomPoint ());
break;
case 1678381065:
pt1.add (this.vwr.getBoundBoxCenter ());
break;
default:
pt1.setT (this.rotationCenterDefault);
break;
}
this.setRotationCenterAndRadiusXYZ (pt1, true);
this.resetFitToScreen (true);
}, "~N,JU.P3");
Clazz.defineMethod (c$, "setFrameOffset", 
function (modelIndex) {
if (this.frameOffsets == null || modelIndex < 0 || modelIndex >= this.frameOffsets.length) this.frameOffset.set (0, 0, 0);
 else this.frameOffset.setT (this.frameOffsets[modelIndex]);
}, "~N");
Clazz.defineMethod (c$, "setSelectedTranslation", 
function (bsAtoms, xyz, xy) {
this.bsSelectedAtoms = bsAtoms;
switch (xyz) {
case 'X':
case 'x':
this.ptOffset.x += xy;
break;
case 'Y':
case 'y':
this.ptOffset.y += xy;
break;
case 'Z':
case 'z':
this.ptOffset.z += xy;
break;
}
}, "JU.BS,~S,~N");
Clazz.defineMethod (c$, "setNavFps", 
function (navFps) {
this.navFps = navFps;
}, "~N");
Clazz.defineMethod (c$, "calcCameraFactors", 
function () {
if (Float.isNaN (this.cameraDepth)) {
this.cameraDepth = this.cameraDepthSetting;
this.zoomFactor = 3.4028235E38;
}this.cameraDistance = this.cameraDepth * this.screenPixelCount;
this.referencePlaneOffset = this.cameraDistance + this.screenPixelCount / 2;
this.scalePixelsPerAngstrom = (this.scale3D && !this.perspectiveDepth && this.mode != 1 ? 72 / this.scale3DAngstromsPerInch * (this.antialias ? 2 : 1) : this.screenPixelCount / this.visualRangeAngstroms);
if (this.mode != 1) this.mode = (this.camera.z == 0 ? 0 : 2);
this.perspectiveShiftXY.set (this.camera.z == 0 ? 0 : this.camera.x * this.scalePixelsPerAngstrom / this.screenWidth * 100, this.camera.z == 0 ? 0 : this.camera.y * this.scalePixelsPerAngstrom / this.screenHeight * 100, 0);
this.modelRadiusPixels = this.modelRadius * this.scalePixelsPerAngstrom;
var offset100 = (2 * this.modelRadius) / this.visualRangeAngstroms * this.referencePlaneOffset;
if (this.mode == 1) {
this.calcNavCameraFactors (offset100);
return;
}this.zoomFactor = 3.4028235E38;
this.modelCenterOffset = this.referencePlaneOffset;
if (!this.scale3D || this.perspectiveDepth) this.scalePixelsPerAngstrom *= (this.modelCenterOffset / offset100) * this.zmPct / 100;
this.modelRadiusPixels = this.modelRadius * this.scalePixelsPerAngstrom;
});
Clazz.defineMethod (c$, "calcNavCameraFactors", 
 function (offset100) {
if (this.zoomFactor == 3.4028235E38) {
if (this.zmPct > 10000) this.zmPct = 10000;
this.modelCenterOffset = offset100 * 100 / this.zmPct;
} else if (this.prevZoomSetting != this.zmPctSet) {
if (this.zoomRatio == 0) this.modelCenterOffset = offset100 * 100 / this.zmPctSet;
 else this.modelCenterOffset += (1 - this.zoomRatio) * this.referencePlaneOffset;
this.navMode = -1;
}this.prevZoomSetting = this.zmPctSet;
this.zoomFactor = this.modelCenterOffset / this.referencePlaneOffset;
this.zmPct = (this.zoomFactor == 0 ? 10000 : offset100 / this.modelCenterOffset * 100);
}, "~N");
Clazz.defineMethod (c$, "getPerspectiveFactor", 
function (z) {
return (z <= 0 ? this.referencePlaneOffset : this.referencePlaneOffset / z);
}, "~N");
Clazz.defineMethod (c$, "unTransformPoint", 
function (screenPt, coordPt) {
this.untransformedPoint.setT (screenPt);
switch (this.mode) {
case 1:
this.untransformedPoint.x -= this.navigationOffset.x;
this.untransformedPoint.y -= this.navigationOffset.y;
break;
case 2:
this.fScrPt.x += this.perspectiveShiftXY.x;
this.fScrPt.y += this.perspectiveShiftXY.y;
case 0:
this.untransformedPoint.x -= this.fixedRotationOffset.x;
this.untransformedPoint.y -= this.fixedRotationOffset.y;
}
if (this.perspectiveDepth) {
var factor = this.getPerspectiveFactor (this.untransformedPoint.z);
this.untransformedPoint.x /= factor;
this.untransformedPoint.y /= factor;
}switch (this.mode) {
case 1:
this.untransformedPoint.x += this.navigationShiftXY.x;
this.untransformedPoint.y += this.navigationShiftXY.y;
break;
case 2:
this.untransformedPoint.x -= this.perspectiveShiftXY.x;
this.untransformedPoint.y -= this.perspectiveShiftXY.y;
break;
}
this.matrixTransformInv.rotTrans2 (this.untransformedPoint, coordPt);
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "resetNavigationPoint", 
function (doResetSlab) {
if (this.zmPct < 5 && this.mode != 1) {
this.perspectiveDepth = true;
this.mode = 1;
return;
}if (this.mode == 1) {
this.navMode = 1;
this.slabPercentSetting = 0;
this.perspectiveDepth = true;
} else if (doResetSlab) {
this.slabPercentSetting = 100;
}this.vwr.setFloatProperty ("slabRange", 0);
if (doResetSlab) {
this.setSlabEnabled (this.mode == 1);
}this.zoomFactor = 3.4028235E38;
this.zmPctSet = this.zmPct;
}, "~B");
Clazz.defineMethod (c$, "setNavigatePt", 
function (pt) {
this.navigationCenter.setT (pt);
this.navMode = 3;
this.navigating = true;
this.finalizeTransformParameters ();
this.navigating = false;
}, "JU.P3");
Clazz.defineMethod (c$, "setNavigationSlabOffsetPercent", 
function (percent) {
this.vwr.g.setF ("navigationSlab", percent);
this.calcCameraFactors ();
this.navigationSlabOffset = percent / 50 * this.modelRadiusPixels;
}, "~N");
Clazz.defineMethod (c$, "getNavigationOffset", 
function () {
this.transformPt3f (this.navigationCenter, this.navigationOffset);
return this.navigationOffset;
});
Clazz.defineMethod (c$, "getNavPtHeight", 
function () {
return this.height / 2;
});
Clazz.defineMethod (c$, "getNavigationOffsetPercent", 
function (XorY) {
this.getNavigationOffset ();
if (this.width == 0 || this.height == 0) return 0;
return (XorY == 'X' ? (this.navigationOffset.x - this.width / 2) * 100 / this.width : (this.navigationOffset.y - this.getNavPtHeight ()) * 100 / this.height);
}, "~S");
Clazz.defineMethod (c$, "getNavigationText", 
function (addComments) {
var s = (addComments ? " /* navigation center, translation, depth */ " : " ");
if (this.mode != 1) return s + "{0 0 0} 0 0 0";
this.getNavigationOffset ();
return s + JU.Escape.eP (this.navigationCenter) + " " + this.getNavigationOffsetPercent ('X') + " " + this.getNavigationOffsetPercent ('Y') + " " + this.navigationDepthPercent;
}, "~B");
Clazz.defineMethod (c$, "setScreenParameters", 
function (screenWidth, screenHeight, useZoomLarge, antialias, resetSlab, resetZoom) {
var pt = (this.mode == 1 ? JU.P3.newP (this.navigationCenter) : null);
var ptoff = JU.P3.newP (this.navigationOffset);
ptoff.x = ptoff.x / this.width;
ptoff.y = ptoff.y / this.height;
this.setScreenParameters0 (screenWidth, screenHeight, useZoomLarge, antialias, resetSlab, resetZoom);
if (pt != null) {
this.navigationCenter.setT (pt);
this.navTranslatePercentOrTo (-1, ptoff.x * this.width, ptoff.y * this.height);
this.setNavigatePt (pt);
}}, "~N,~N,~B,~B,~B,~B");
Clazz.defineMethod (c$, "navInterrupt", 
 function () {
if (this.nav != null) this.nav.interrupt ();
});
Clazz.defineMethod (c$, "getNav", 
 function () {
if (this.nav != null) return true;
this.nav = J.api.Interface.getOption ("navigate.Navigator", this.vwr, "tm");
if (this.nav == null) return false;
this.nav.set (this, this.vwr);
return true;
});
Clazz.defineMethod (c$, "navigateList", 
function (eval, list) {
if (this.getNav ()) this.nav.navigateList (eval, list);
}, "J.api.JmolScriptEvaluator,JU.Lst");
Clazz.defineMethod (c$, "navigateAxis", 
function (rotAxis, degrees) {
if (this.getNav ()) this.nav.navigateAxis (rotAxis, degrees);
}, "JU.V3,~N");
Clazz.defineMethod (c$, "setNavigationOffsetRelative", 
function () {
if (this.getNav ()) this.nav.setNavigationOffsetRelative ();
});
Clazz.defineMethod (c$, "navigateKey", 
function (keyCode, modifiers) {
if (this.getNav ()) this.nav.navigateKey (keyCode, modifiers);
}, "~N,~N");
Clazz.defineMethod (c$, "setNavigationDepthPercent", 
function (percent) {
if (this.getNav ()) this.nav.setNavigationDepthPercent (percent);
}, "~N");
Clazz.defineMethod (c$, "navTranslatePercentOrTo", 
function (seconds, x, y) {
if (this.getNav ()) this.nav.navTranslatePercentOrTo (seconds, x, y);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "calcNavigationPoint", 
function () {
if (this.getNav ()) this.nav.calcNavigationPoint ();
});
Clazz.defineMethod (c$, "getNavigationState", 
function () {
return (this.mode == 1 && this.getNav () ? this.nav.getNavigationState () : "");
});
Clazz.defineStatics (c$,
"DEFAULT_SPIN_Y", 30,
"DEFAULT_SPIN_FPS", 30,
"DEFAULT_NAV_FPS", 10,
"DEFAULT_VISUAL_RANGE", 5,
"DEFAULT_STEREO_DEGREES", -5,
"MODE_STANDARD", 0,
"MODE_NAVIGATION", 1,
"MODE_PERSPECTIVE_PYMOL", 2,
"DEFAULT_PERSPECTIVE_MODEL", 11,
"DEFAULT_PERSPECTIVE_DEPTH", true,
"DEFAULT_CAMERA_DEPTH", 3.0,
"degreesPerRadian", 57.29577951308232,
"MAXIMUM_ZOOM_PERCENTAGE", 200000,
"MAXIMUM_ZOOM_PERSPECTIVE_DEPTH", 10000,
"NAV_MODE_IGNORE", -2,
"NAV_MODE_ZOOMED", -1,
"NAV_MODE_NONE", 0,
"NAV_MODE_RESET", 1,
"NAV_MODE_NEWXY", 2,
"NAV_MODE_NEWXYZ", 3,
"NAV_MODE_NEWZ", 4);
});
