Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.dialog.JSVDialog"], "JSV.dialog.OverlayLegendDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz.declareType (JSV.dialog, "OverlayLegendDialog", JSV.dialog.JSVDialog);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.dialog.OverlayLegendDialog, []);
this.type = JSV.common.Annotation.AType.OverlayLegend;
});
Clazz.overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.OverlayLegendDialog.posXY;
});
Clazz.defineMethod (c$, "addUniqueControls", 
function () {
});
Clazz.overrideMethod (c$, "callback", 
function (id, msg) {
return false;
}, "~S,~S");
Clazz.defineStatics (c$,
"posXY",  Clazz.newIntArray (-1, [-2147483648, 0]));
});
