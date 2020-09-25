Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.api.JSVPanel"], "JSV.js2d.JsPanel", ["JSV.common.JSViewer", "$.PanelData", "JU.Font", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.apiPlatform = null;
this.pd = null;
this.mouse = null;
this.vwr = null;
this.name = null;
this.bgcolor = null;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsPanel", null, JSV.api.JSVPanel);
Clazz.overrideMethod (c$, "finalize", 
function () {
JU.Logger.info ("JSVPanel " + this + " finalized");
});
Clazz.overrideMethod (c$, "getApiPlatform", 
function () {
return this.apiPlatform;
});
Clazz.overrideMethod (c$, "getPanelData", 
function () {
return this.pd;
});
c$.getEmptyPanel = Clazz.defineMethod (c$, "getEmptyPanel", 
function (viewer) {
var p =  new JSV.js2d.JsPanel (viewer, false);
p.pd = null;
return p;
}, "JSV.common.JSViewer");
c$.getPanelMany = Clazz.defineMethod (c$, "getPanelMany", 
function (viewer, spectra) {
var p =  new JSV.js2d.JsPanel (viewer, true);
p.pd.initMany (spectra, viewer.initialStartIndex, viewer.initialEndIndex);
return p;
}, "JSV.common.JSViewer,JU.Lst");
Clazz.makeConstructor (c$, 
 function (viewer, withPd) {
this.vwr = viewer;
this.pd = (withPd ?  new JSV.common.PanelData (this, viewer) : null);
this.apiPlatform = viewer.apiPlatform;
this.mouse = this.apiPlatform.getMouseManager (0, this);
}, "JSV.common.JSViewer,~B");
Clazz.overrideMethod (c$, "getTitle", 
function () {
return this.pd.getTitle ();
});
Clazz.overrideMethod (c$, "dispose", 
function () {
if (this.pd != null) this.pd.dispose ();
this.pd = null;
this.mouse.dispose ();
this.mouse = null;
});
Clazz.overrideMethod (c$, "setTitle", 
function (title) {
this.pd.title = title;
this.name = title;
}, "~S");
Clazz.defineMethod (c$, "setColorOrFont", 
function (ds, st) {
this.pd.setColorOrFont (ds, st);
}, "JSV.common.ColorParameters,JSV.common.ScriptToken");
Clazz.overrideMethod (c$, "setBackgroundColor", 
function (color) {
this.bgcolor = color;
}, "javajs.api.GenericColor");
Clazz.overrideMethod (c$, "getInput", 
function (message, title, sval) {
var ret = null;
{
ret = prompt(message, sval);
}this.getFocusNow (true);
return ret;
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "showMessage", 
function (msg, title) {
JU.Logger.info (msg);
var applet = this.vwr.html5Applet;
{
applet._showStatus(msg, title);
}this.getFocusNow (true);
}, "~S,~S");
Clazz.overrideMethod (c$, "getFocusNow", 
function (asThread) {
if (this.pd != null) this.pd.dialogsToFront (null);
}, "~B");
Clazz.overrideMethod (c$, "getFontFaceID", 
function (name) {
return JU.Font.getFontFaceID ("SansSerif");
}, "~S");
Clazz.overrideMethod (c$, "doRepaint", 
function (andTaintAll) {
if (this.pd == null) return;
if (andTaintAll) this.pd.setTaintedAll ();
if (!this.pd.isPrinting) this.vwr.requestRepaint ();
}, "~B");
Clazz.overrideMethod (c$, "paintComponent", 
function (context) {
var contextFront = null;
var contextRear = null;
{
contextFront = context.canvas.frontLayer.getContext("2d");
contextRear = context;
}if (this.vwr == null) return;
if (this.pd == null) {
if (this.bgcolor == null) this.bgcolor = this.vwr.g2d.getColor1 (-1);
this.vwr.g2d.fillBackground (context, this.bgcolor);
this.vwr.g2d.fillBackground (contextRear, this.bgcolor);
this.vwr.g2d.fillBackground (contextFront, this.bgcolor);
return;
}if (this.pd.graphSets == null || this.pd.isPrinting) return;
this.pd.g2d = this.pd.g2d0;
this.pd.drawGraph (context, contextFront, contextRear, this.getWidth (), this.getHeight (), false);
this.vwr.repaintDone ();
}, "~O");
Clazz.overrideMethod (c$, "printPanel", 
function (pl, os, title) {
pl.title = title;
pl.date = this.apiPlatform.getDateFormat ("8824");
this.pd.setPrint (pl, "Helvetica");
try {
(JSV.common.JSViewer.getInterface ("JSV.common.PDFWriter")).createPdfDocument (this, pl, os);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.showMessage (ex.toString (), "creating PDF");
} else {
throw ex;
}
} finally {
this.pd.setPrint (null, null);
}
}, "JSV.common.PrintLayout,java.io.OutputStream,~S");
Clazz.overrideMethod (c$, "saveImage", 
function (type, file, out) {
var fname = file.getName ();
if (out != null) out.cancel ();
JSV.common.JSViewer.jmolObject.saveImage (this.vwr.html5Applet, "png", fname);
return "OK";
}, "~S,J.api.GenericFileInterface,JU.OC");
Clazz.overrideMethod (c$, "hasFocus", 
function () {
return false;
});
Clazz.overrideMethod (c$, "repaint", 
function () {
});
Clazz.overrideMethod (c$, "setToolTipText", 
function (s) {
var x = this.pd.mouseX;
var y = this.pd.mouseY;
var applet = this.vwr.html5Applet;
{
applet._showTooltip && applet._showTooltip(s, x, y);
}}, "~S");
Clazz.overrideMethod (c$, "getHeight", 
function () {
return this.vwr.getHeight ();
});
Clazz.overrideMethod (c$, "getWidth", 
function () {
return this.vwr.getWidth ();
});
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isFocusable", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isVisible", 
function () {
return false;
});
Clazz.overrideMethod (c$, "setEnabled", 
function (b) {
}, "~B");
Clazz.overrideMethod (c$, "setFocusable", 
function (b) {
}, "~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return (this.pd == null ? "<closed>" : "" + this.pd.getSpectrumAt (0));
});
Clazz.overrideMethod (c$, "processMouseEvent", 
function (id, x, y, modifiers, time) {
return this.mouse != null && this.mouse.processEvent (id, x, y, modifiers, time);
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "processTwoPointGesture", 
function (touches) {
if (this.mouse != null) this.mouse.processTwoPointGesture (touches);
}, "~A");
Clazz.overrideMethod (c$, "showMenu", 
function (x, y) {
this.vwr.showMenu (x, y);
}, "~N,~N");
});
