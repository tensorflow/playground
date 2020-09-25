Clazz.declarePackage ("J.popup");
Clazz.load (["J.popup.GenericPopup", "java.util.Properties"], "J.popup.JmolGenericPopup", ["J.i18n.GT", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.frankPopup = null;
this.nFrankList = 0;
this.vwr = null;
this.menuText = null;
Clazz.instantialize (this, arguments);
}, J.popup, "JmolGenericPopup", J.popup.GenericPopup);
Clazz.prepareFields (c$, function () {
this.menuText =  new java.util.Properties ();
});
Clazz.overrideMethod (c$, "jpiInitialize", 
function (vwr, menu) {
var doTranslate = J.i18n.GT.setDoTranslate (true);
var bundle = this.getBundle (menu);
this.initialize (vwr, bundle, bundle.getMenuName ());
J.i18n.GT.setDoTranslate (doTranslate);
}, "J.api.PlatformViewer,~S");
Clazz.defineMethod (c$, "initialize", 
function (vwr, bundle, title) {
this.vwr = vwr;
this.initSwing (title, bundle, vwr.html5Applet, JV.Viewer.isJSNoAWT, vwr.getBooleanProperty ("_signedApplet"), JV.Viewer.isWebGL);
}, "JV.Viewer,J.popup.PopupResource,~S");
Clazz.overrideMethod (c$, "jpiShow", 
function (x, y) {
if (!this.vwr.haveDisplay) return;
this.thisx = x;
this.thisy = y;
this.show (x, y, false);
if (x < 0 && this.showFrankMenu ()) return;
this.appRestorePopupMenu ();
this.menuShowPopup (this.popupMenu, this.thisx, this.thisy);
}, "~N,~N");
Clazz.defineMethod (c$, "showFrankMenu", 
function () {
return true;
});
Clazz.overrideMethod (c$, "jpiDispose", 
function () {
this.helper.menuClearListeners (this.popupMenu);
this.popupMenu = this.thisPopup = null;
});
Clazz.overrideMethod (c$, "jpiGetMenuAsObject", 
function () {
return this.popupMenu;
});
Clazz.overrideMethod (c$, "appFixLabel", 
function (label) {
return label;
}, "~S");
Clazz.overrideMethod (c$, "appGetBooleanProperty", 
function (name) {
return this.vwr.getBooleanProperty (name);
}, "~S");
Clazz.overrideMethod (c$, "appRunSpecialCheckBox", 
function (item, basename, script, TF) {
if (this.appGetBooleanProperty (basename) == TF) return true;
if (basename.indexOf ("mk") < 0 && !basename.endsWith ("P!")) return false;
if (basename.indexOf ("mk") >= 0 || basename.indexOf ("??") >= 0) {
script = this.getUnknownCheckBoxScriptToRun (item, basename, script, TF);
} else {
if (!TF) return true;
script = "set picking " + basename.substring (0, basename.length - 2);
}if (script != null) this.appRunScript (script);
return true;
}, "J.api.SC,~S,~S,~B");
Clazz.overrideMethod (c$, "appRestorePopupMenu", 
function () {
this.thisPopup = this.popupMenu;
});
Clazz.overrideMethod (c$, "appRunScript", 
function (script) {
this.vwr.evalStringQuiet (script);
}, "~S");
});
