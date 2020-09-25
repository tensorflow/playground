Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.popup.JSVGenericPopup"], "JSV.js2d.JsPopup", ["JSV.popup.JSVPopupResourceBundle", "J.awtjs2d.JSPopupHelper"], function () {
c$ = Clazz.declareType (JSV.js2d, "JsPopup", JSV.popup.JSVGenericPopup);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.js2d.JsPopup, []);
this.helper =  new J.awtjs2d.JSPopupHelper (this);
});
Clazz.overrideMethod (c$, "jpiInitialize", 
function (viewer, menu) {
var bundle =  new JSV.popup.JSVPopupResourceBundle ();
this.initialize (viewer, bundle, menu);
}, "J.api.PlatformViewer,~S");
Clazz.overrideMethod (c$, "menuShowPopup", 
function (popup, x, y) {
try {
(popup).show (this.isTainted ? this.vwr.getApplet () : null, x, y);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "J.api.SC,~N,~N");
Clazz.overrideMethod (c$, "getImageIcon", 
function (fileName) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "menuFocusCallback", 
function (name, actionCommand, b) {
}, "~S,~S,~B");
});
