Clazz.declarePackage ("J.render");
Clazz.load (["J.api.JmolRepaintManager", "JU.BS"], "J.render.RepaintManager", ["java.lang.NullPointerException", "$.Thread", "J.api.Interface", "JU.Logger", "JV.JC", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.shapeManager = null;
this.renderers = null;
this.bsTranslucent = null;
this.holdRepaint = 0;
this.repaintPending = false;
Clazz.instantialize (this, arguments);
}, J.render, "RepaintManager", null, J.api.JmolRepaintManager);
Clazz.prepareFields (c$, function () {
this.bsTranslucent = JU.BS.newN (37);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (vwr, shapeManager) {
this.vwr = vwr;
this.shapeManager = shapeManager;
}, "JV.Viewer,JV.ShapeManager");
Clazz.overrideMethod (c$, "isRepaintPending", 
function () {
return this.repaintPending;
});
Clazz.overrideMethod (c$, "pushHoldRepaint", 
function (why) {
++this.holdRepaint;
}, "~S");
Clazz.overrideMethod (c$, "popHoldRepaint", 
function (andRepaint, why) {
--this.holdRepaint;
if (this.holdRepaint <= 0) {
this.holdRepaint = 0;
if (andRepaint) {
this.repaintPending = true;
this.repaintNow (why);
}}}, "~B,~S");
Clazz.overrideMethod (c$, "requestRepaintAndWait", 
function (why) {
var jmol = null;
if (JV.Viewer.isJS && !JV.Viewer.isSwingJS) {
{
jmol = (self.Jmol && Jmol.repaint ? Jmol : null)
}}if (jmol == null) {
try {
this.repaintNow (why);
if (!JV.Viewer.isJS) this.wait (this.vwr.g.repaintWaitMs);
if (this.repaintPending) {
JU.Logger.error ("repaintManager requestRepaintAndWait timeout");
this.repaintDone ();
}} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
System.out.println ("repaintManager requestRepaintAndWait interrupted thread=" + Thread.currentThread ().getName ());
} else {
throw e;
}
}
} else {
jmol.repaint (this.vwr.html5Applet, false);
this.repaintDone ();
}}, "~S");
Clazz.overrideMethod (c$, "repaintIfReady", 
function (why) {
if (this.repaintPending) return false;
this.repaintPending = true;
if (this.holdRepaint == 0) this.repaintNow (why);
return true;
}, "~S");
Clazz.defineMethod (c$, "repaintNow", 
 function (why) {
if (!this.vwr.haveDisplay) return;
this.vwr.apiPlatform.repaint (this.vwr.display);
}, "~S");
Clazz.overrideMethod (c$, "repaintDone", 
function () {
this.repaintPending = false;
{
}});
Clazz.overrideMethod (c$, "clear", 
function (iShape) {
if (this.renderers == null) return;
if (iShape >= 0) this.renderers[iShape] = null;
 else for (var i = 0; i < 37; ++i) this.renderers[i] = null;

}, "~N");
Clazz.defineMethod (c$, "getRenderer", 
 function (shapeID) {
if (this.renderers[shapeID] != null) return this.renderers[shapeID];
var className = JV.JC.getShapeClassName (shapeID, true) + "Renderer";
var renderer;
if ((renderer = J.api.Interface.getInterface (className, this.vwr, "render")) == null) return null;
renderer.setViewerG3dShapeID (this.vwr, shapeID);
return this.renderers[shapeID] = renderer;
}, "~N");
Clazz.overrideMethod (c$, "render", 
function (gdata, modelSet, isFirstPass, navMinMax) {
var g3d = gdata;
if (this.renderers == null) this.renderers =  new Array (37);
this.getAllRenderers ();
try {
var logTime = this.vwr.getBoolean (603979934);
g3d.renderBackground (null);
if (isFirstPass) {
this.bsTranslucent.clearAll ();
if (navMinMax != null) g3d.renderCrossHairs (navMinMax, this.vwr.getScreenWidth (), this.vwr.getScreenHeight (), this.vwr.tm.getNavigationOffset (), this.vwr.tm.navigationDepthPercent);
var band = this.vwr.getRubberBandSelection ();
if (band != null && g3d.setC (this.vwr.cm.colixRubberband)) g3d.drawRect (band.x, band.y, 0, 0, band.width, band.height);
this.vwr.noFrankEcho = true;
}var msg = null;
for (var i = 0; i < 37 && gdata.currentlyRendering; ++i) {
var shape = this.shapeManager.getShape (i);
if (shape == null) continue;
if (logTime) {
msg = "rendering " + JV.JC.getShapeClassName (i, false);
JU.Logger.startTimer (msg);
}if ((isFirstPass || this.bsTranslucent.get (i)) && this.getRenderer (i).renderShape (g3d, modelSet, shape)) this.bsTranslucent.set (i);
if (logTime) JU.Logger.checkTimer (msg, false);
}
g3d.renderAllStrings (null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
if (this.vwr.async && "Interface".equals (e.getMessage ())) throw  new NullPointerException ();
JU.Logger.error ("rendering error? " + e);
} else {
throw e;
}
}
}, "JU.GData,JM.ModelSet,~B,~A");
Clazz.defineMethod (c$, "getAllRenderers", 
 function () {
var isOK = true;
for (var i = 0; i < 37; ++i) {
if (this.shapeManager.getShape (i) == null || this.getRenderer (i) != null) continue;
isOK = this.repaintPending = !this.vwr.async;
}
if (!isOK) throw  new NullPointerException ();
});
Clazz.overrideMethod (c$, "renderExport", 
function (gdata, modelSet, params) {
var isOK;
this.shapeManager.finalizeAtoms (null, true);
var exporter3D = this.vwr.initializeExporter (params);
isOK = (exporter3D != null);
if (!isOK) {
JU.Logger.error ("Cannot export " + params.get ("type"));
return null;
}if (this.renderers == null) this.renderers =  new Array (37);
this.getAllRenderers ();
var msg = null;
try {
var logTime = this.vwr.getBoolean (603979934);
exporter3D.renderBackground (exporter3D);
for (var i = 0; i < 37; ++i) {
var shape = this.shapeManager.getShape (i);
if (shape == null) continue;
if (logTime) {
msg = "rendering " + JV.JC.getShapeClassName (i, false);
JU.Logger.startTimer (msg);
}this.getRenderer (i).renderShape (exporter3D, modelSet, shape);
if (logTime) JU.Logger.checkTimer (msg, false);
}
exporter3D.renderAllStrings (exporter3D);
msg = exporter3D.finalizeOutput ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
JU.Logger.error ("rendering error? " + e);
} else {
throw e;
}
}
return msg;
}, "JU.GData,JM.ModelSet,java.util.Map");
});
