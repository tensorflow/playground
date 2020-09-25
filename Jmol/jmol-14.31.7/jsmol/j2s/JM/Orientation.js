Clazz.declarePackage ("JM");
Clazz.load (["JU.M3", "$.P3"], "JM.Orientation", ["JU.PT", "JU.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.saveName = null;
this.rotationMatrix = null;
this.xTrans = 0;
this.yTrans = 0;
this.zoom = 0;
this.rotationRadius = 0;
this.center = null;
this.navCenter = null;
this.xNav = NaN;
this.yNav = NaN;
this.navDepth = NaN;
this.cameraDepth = NaN;
this.cameraX = NaN;
this.cameraY = NaN;
this.windowCenteredFlag = false;
this.navigationMode = false;
this.moveToText = null;
this.pymolView = null;
this.vwr = null;
Clazz.instantialize (this, arguments);
}, JM, "Orientation");
Clazz.prepareFields (c$, function () {
this.rotationMatrix =  new JU.M3 ();
this.center =  new JU.P3 ();
this.navCenter =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function (vwr, asDefault, pymolView) {
this.vwr = vwr;
if (pymolView != null) {
this.pymolView = pymolView;
this.moveToText = "moveTo -1.0 PyMOL " + JU.Escape.eAF (pymolView);
return;
}vwr.finalizeTransformParameters ();
if (asDefault) {
var rot = vwr.ms.getInfoM ("defaultOrientationMatrix");
if (rot == null) this.rotationMatrix.setScale (1);
 else this.rotationMatrix.setM3 (rot);
} else {
vwr.tm.getRotation (this.rotationMatrix);
}this.xTrans = vwr.tm.getTranslationXPercent ();
this.yTrans = vwr.tm.getTranslationYPercent ();
this.zoom = vwr.tm.getZoomSetting ();
this.center.setT (vwr.tm.fixedRotationCenter);
this.windowCenteredFlag = vwr.tm.isWindowCentered ();
this.rotationRadius = vwr.getFloat (570425388);
this.navigationMode = vwr.getBoolean (603979889);
this.moveToText = vwr.tm.getMoveToText (-1, false);
if (this.navigationMode) {
this.xNav = vwr.tm.getNavigationOffsetPercent ('X');
this.yNav = vwr.tm.getNavigationOffsetPercent ('Y');
this.navDepth = vwr.tm.navigationDepthPercent;
this.navCenter = JU.P3.newP (vwr.tm.navigationCenter);
}if (vwr.tm.camera.z != 0) {
this.cameraDepth = vwr.tm.getCameraDepth ();
this.cameraX = vwr.tm.camera.x;
this.cameraY = vwr.tm.camera.y;
}}, "JV.Viewer,~B,~A");
Clazz.defineMethod (c$, "getMoveToText", 
function (asCommand) {
return (asCommand ? "   " + this.moveToText + "\n  save orientation " + JU.PT.esc (this.saveName.substring (12)) + ";\n" : this.moveToText);
}, "~B");
Clazz.defineMethod (c$, "restore", 
function (timeSeconds, isAll) {
if (isAll) {
this.vwr.setBooleanProperty ("windowCentered", this.windowCenteredFlag);
this.vwr.setBooleanProperty ("navigationMode", this.navigationMode);
if (this.pymolView == null) this.vwr.moveTo (this.vwr.eval, timeSeconds, this.center, null, NaN, this.rotationMatrix, this.zoom, this.xTrans, this.yTrans, this.rotationRadius, this.navCenter, this.xNav, this.yNav, this.navDepth, this.cameraDepth, this.cameraX, this.cameraY);
 else this.vwr.tm.moveToPyMOL (this.vwr.eval, timeSeconds, this.pymolView);
} else {
this.vwr.tm.setRotation (this.rotationMatrix);
}return true;
}, "~N,~B");
});
