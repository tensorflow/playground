Clazz.declarePackage ("J.awtjs2d");
Clazz.load (["J.popup.JmolPopup"], "J.awtjs2d.JSJmolPopup", ["J.awtjs2d.JSPopupHelper"], function () {
c$ = Clazz.declareType (J.awtjs2d, "JSJmolPopup", J.popup.JmolPopup);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.awtjs2d.JSJmolPopup, []);
this.helper =  new J.awtjs2d.JSPopupHelper (this);
});
Clazz.overrideMethod (c$, "menuShowPopup", 
function (popup, x, y) {
try {
(popup).show (this.isTainted ? this.vwr.html5Applet : null, x, y);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.isTainted = false;
}, "J.api.SC,~N,~N");
Clazz.overrideMethod (c$, "getUnknownCheckBoxScriptToRun", 
function (item, name, what, TF) {
return null;
}, "J.api.SC,~S,~S,~B");
Clazz.overrideMethod (c$, "getImageIcon", 
function (fileName) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "menuFocusCallback", 
function (name, actionCommand, b) {
}, "~S,~S,~B");
});
