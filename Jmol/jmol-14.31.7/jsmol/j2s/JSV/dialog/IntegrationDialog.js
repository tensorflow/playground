Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.dialog.JSVDialog"], "JSV.dialog.IntegrationDialog", ["java.lang.Double", "JU.DF", "JSV.common.Annotation"], function () {
c$ = Clazz.declareType (JSV.dialog, "IntegrationDialog", JSV.dialog.JSVDialog);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.dialog.IntegrationDialog, []);
this.type = JSV.common.Annotation.AType.Integration;
});
Clazz.overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.IntegrationDialog.posXY;
});
Clazz.defineMethod (c$, "addUniqueControls", 
function () {
this.txt1 = this.dialog.addTextField ("txtBaselineOffset", "Baseline Offset", null, "%", "" + this.vwr.parameters.integralOffset, true);
this.txt2 = this.dialog.addTextField ("txtScale", "Scale", null, "%", "" + this.vwr.parameters.integralRange, true);
this.dialog.addButton ("btnApply", "Apply");
this.addApplyBtn = false;
this.dialog.addButton ("btnAuto", "Auto");
this.dialog.addButton ("btnDelete", "Delete");
this.dialog.addButton ("btnNormalize", "Normalize");
});
Clazz.overrideMethod (c$, "applyFromFields", 
function () {
this.apply ( Clazz.newArray (-1, [this.dialog.getText (this.txt1), this.dialog.getText (this.txt2)]));
});
Clazz.overrideMethod (c$, "callback", 
function (id, msg) {
var val;
try {
if (id.equals ("SHOWSELECTION")) {
for (var i = 0; i < this.xyData.size (); i++) if (JU.DF.formatDecimalDbl (this.xyData.get (i).getXVal (), 2).equals (msg)) {
this.iSelected = i;
this.jsvp.getPanelData ().setXPointers (this.$spec, this.xyData.get (i).getXVal (), this.$spec, this.xyData.get (i).getXVal2 ());
this.jsvp.doRepaint (true);
break;
}
return true;
}if (!id.equals ("windowClosing") && !id.equals ("FOCUS")) {
if (id.equals ("btnAuto") || this.xyData == null || this.xyData.size () == 0) {
this.vwr.runScript ("integrate auto");
this.eventApply ();
return true;
}this.setFocus (true);
}if (id.equals ("btnDelete")) {
this.deleteIntegral ();
} else if (id.equals ("btnNormalize")) {
if (!this.checkSelectedIntegral ()) return true;
var ret = this.manager.getDialogInput (this.dialog, "Enter a normalization factor", "Normalize", 3, null, null, "" + this.lastNorm);
val = Double.parseDouble (ret);
if (val > 0) (this.xyData).setSelectedIntegral (this.xyData.get (this.iSelected), this.lastNorm = val);
this.eventApply ();
} else {
return this.callbackAD (id, msg);
}} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
return true;
}, "~S,~S");
Clazz.defineMethod (c$, "checkSelectedIntegral", 
 function () {
if (this.iSelected < 0) {
this.showMessage ("Select a line on the table first, then click this button.", "Integration", 1);
return false;
}return true;
});
Clazz.defineMethod (c$, "deleteIntegral", 
 function () {
if (!this.checkSelectedIntegral ()) return;
this.xyData.removeItemAt (this.iSelected);
this.iSelected = -1;
this.iRowColSelected = -1;
this.applyFromFields ();
});
Clazz.defineStatics (c$,
"posXY",  Clazz.newIntArray (-1, [-2147483648, 0]));
});
