Clazz.declarePackage ("J.awtjs2d");
Clazz.load (["J.modelkit.ModelKitPopup"], "J.awtjs2d.JSModelKitPopup", ["J.awtjs2d.JSPopupHelper"], function () {
c$ = Clazz.declareType (J.awtjs2d, "JSModelKitPopup", J.modelkit.ModelKitPopup);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.awtjs2d.JSModelKitPopup, []);
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
Clazz.overrideMethod (c$, "getImageIcon", 
function (fileName) {
return "J/modelkit/images/" + fileName;
}, "~S");
Clazz.overrideMethod (c$, "menuClickCallback", 
function (source, script) {
this.doMenuClickCallbackMK (source, script);
}, "J.api.SC,~S");
Clazz.overrideMethod (c$, "menuCheckBoxCallback", 
function (source) {
this.doMenuCheckBoxCallback (source);
}, "J.api.SC");
});
