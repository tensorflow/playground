Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.dialog.JSVDialog"], "JSV.dialog.MeasurementsDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz.declareType (JSV.dialog, "MeasurementsDialog", JSV.dialog.JSVDialog);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.dialog.MeasurementsDialog, []);
this.type = JSV.common.Annotation.AType.Measurements;
});
Clazz.defineMethod (c$, "addUniqueControls", 
function () {
});
Clazz.overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.MeasurementsDialog.posXY;
});
Clazz.overrideMethod (c$, "callback", 
function (id, msg) {
return this.callbackAD (id, msg);
}, "~S,~S");
Clazz.defineStatics (c$,
"posXY",  Clazz.newIntArray (-1, [-2147483648, 0]));
});
