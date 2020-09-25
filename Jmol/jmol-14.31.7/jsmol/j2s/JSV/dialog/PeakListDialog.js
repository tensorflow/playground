Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.dialog.JSVDialog"], "JSV.dialog.PeakListDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz.declareType (JSV.dialog, "PeakListDialog", JSV.dialog.JSVDialog);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.dialog.PeakListDialog, []);
this.type = JSV.common.Annotation.AType.PeakList;
});
Clazz.overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.PeakListDialog.posXY;
});
Clazz.defineMethod (c$, "addUniqueControls", 
function () {
this.txt1 = this.dialog.addTextField ("txtThreshold", "Threshold", null, "", "", true);
this.dialog.setPreferredSize (780, 350);
this.setThreshold (NaN);
this.combo1 = this.dialog.addSelectOption ("cmbInterpolation", "Interpolation",  Clazz.newArray (-1, ["parabolic", "none"]), 0, true);
});
Clazz.overrideMethod (c$, "callback", 
function (id, msg) {
if (id.equals ("cmbInterpolation") || id.equals ("txtThreshold")) id = "btnApply";
return this.callbackAD (id, msg);
}, "~S,~S");
Clazz.defineStatics (c$,
"posXY",  Clazz.newIntArray (-1, [-2147483648, 0]));
});
