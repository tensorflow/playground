Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.RepaintManager", ["JSV.common.JSViewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.repaintPending = false;
this.vwr = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "RepaintManager");
Clazz.makeConstructor (c$, 
function (viewer) {
this.vwr = viewer;
}, "JSV.common.JSViewer");
Clazz.defineMethod (c$, "refresh", 
function () {
if (this.repaintPending) {
return false;
}this.repaintPending = true;
var applet = this.vwr.html5Applet;
var jmol = (JSV.common.JSViewer.isJS && !JSV.common.JSViewer.isSwingJS ? JSV.common.JSViewer.jmolObject : null);
if (jmol == null) {
this.vwr.selectedPanel.repaint ();
} else {
jmol.repaint (applet, false);
this.repaintDone ();
}return true;
});
Clazz.defineMethod (c$, "repaintDone", 
function () {
this.repaintPending = false;
this.notify ();
});
});
