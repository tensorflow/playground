Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.api.AnnotationData", "JSV.common.Annotation"], "JSV.dialog.JSVDialog", ["java.lang.Double", "JU.DF", "$.PT", "JSV.common.IntegralData", "$.PeakData", "JSV.dialog.DialogManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.optionKey = null;
this.options = null;
this.type = null;
this.title = null;
this.vwr = null;
this.$spec = null;
this.manager = null;
this.dialog = null;
this.jsvp = null;
this.txt1 = null;
this.txt2 = null;
this.txt3 = null;
this.combo1 = null;
this.xyData = null;
this.myParams = null;
this.precision = 1;
this.loc = null;
this.showHideButton = null;
this.addClearBtn = false;
this.addCombo1 = false;
this.addApplyBtn = false;
this.isNumeric = false;
this.defaultVisible = false;
this.subType = null;
this.graphSetKey = null;
this.tableData = null;
this.addUnits = false;
this.unitOptions = null;
this.formatOptions = null;
this.unitPtr = null;
this.isON = true;
this.lastNorm = 1;
this.iRowColSelected = -1;
this.iSelected = -1;
this.skipCreate = false;
this.iRowSelected = -1;
this.iColSelected = -1;
Clazz.instantialize (this, arguments);
}, JSV.dialog, "JSVDialog", JSV.common.Annotation, JSV.api.AnnotationData);
Clazz.overrideMethod (c$, "isDialog", 
function () {
return true;
});
Clazz.defineMethod (c$, "setParams", 
function (title, viewer, spec) {
title = JSV.dialog.DialogManager.fixTitle (title);
this.title = title;
this.vwr = viewer;
this.$spec = spec;
this.manager = viewer.getDialogManager ();
this.jsvp = viewer.selectedPanel;
this.myParams = (viewer.getPlatformInterface ("Parameters")).setName ("dialogParams");
this.subType = (spec == null ? "!" : spec.getTypeLabel ());
this.optionKey = this.type + "_" + this.subType;
this.options = this.manager.getDialogOptions ();
if (spec != null) {
var specOptions = spec.getDefaultAnnotationInfo (this.type);
this.options.put (this.optionKey, specOptions);
this.unitOptions = specOptions[0];
this.formatOptions = specOptions[1];
this.unitPtr = this.options.get (this.optionKey + "_unitPtr");
if (this.unitPtr == null) this.unitPtr = specOptions[2];
}switch (this.type) {
case JSV.common.Annotation.AType.Integration:
this.isNumeric = true;
this.addClearBtn = true;
this.defaultVisible = true;
this.addApplyBtn = true;
break;
case JSV.common.Annotation.AType.Measurements:
this.isNumeric = true;
this.addClearBtn = true;
this.addCombo1 = true;
this.defaultVisible = true;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.PeakList:
this.isNumeric = true;
this.addApplyBtn = true;
this.defaultVisible = true;
break;
case JSV.common.Annotation.AType.Views:
this.defaultVisible = true;
break;
case JSV.common.Annotation.AType.NONE:
break;
}
this.initDialog ();
return this;
}, "~S,JSV.common.JSViewer,JSV.common.Spectrum");
Clazz.defineMethod (c$, "initDialog", 
 function () {
this.dialog = this.manager.getDialog (this);
this.restoreDialogPosition (this.jsvp, this.getPosXY ());
this.dialog.setTitle (this.title);
this.layoutDialog ();
});
Clazz.defineMethod (c$, "layoutDialog", 
function () {
this.dialog.startLayout ();
this.addUniqueControls ();
if (this.isNumeric) {
this.getUnitOptions ();
if (this.addCombo1) this.combo1 = this.dialog.addSelectOption ("cmbUnits", "Units", this.unitOptions, this.unitPtr.intValue (), this.addUnits);
if (this.addApplyBtn) this.dialog.addButton ("btnApply", "Apply");
this.showHideButton = this.dialog.addButton ("btnShow", "Show");
if (this.addClearBtn) this.dialog.addButton ("btnClear", "Clear");
}this.dialog.endLayout ();
this.checkEnables ();
this.dialog.setVisible (this.defaultVisible);
});
Clazz.defineMethod (c$, "callbackAD", 
function (id, msg) {
if (id.equals ("FOCUS")) {
this.eventFocus ();
} else if (id.equals ("tableSelect")) {
this.tableSelect (msg);
} else if (id.equals ("btnClear")) {
this.clear ();
} else if (id.equals ("btnApply")) {
this.eventApply ();
} else if (id.equals ("btnShow")) {
var label = this.dialog.getText (this.showHideButton);
this.eventShowHide (label.equals ("Show"));
} else if (id.equals ("cmbUnits")) {
this.setPrecision (this.dialog.getSelectedIndex (this.combo1));
} else if (id.startsWith ("txt")) {
this.eventApply ();
} else if (id.equals ("windowClosing")) {
this.done ();
return true;
}if (this.jsvp != null) this.jsvp.doRepaint (true);
return true;
}, "~S,~S");
Clazz.defineMethod (c$, "addUniqueControls", 
function (dialogHelper) {
}, "JSV.dialog.DialogManager");
Clazz.overrideMethod (c$, "getAType", 
function () {
return this.type;
});
Clazz.overrideMethod (c$, "getGraphSetKey", 
function () {
return this.graphSetKey;
});
Clazz.overrideMethod (c$, "setGraphSetKey", 
function (key) {
this.graphSetKey = key;
}, "~S");
Clazz.overrideMethod (c$, "getSpectrum", 
function () {
return this.$spec;
});
Clazz.overrideMethod (c$, "getState", 
function () {
return this.isON;
});
Clazz.overrideMethod (c$, "setState", 
function (b) {
this.isON = b;
}, "~B");
Clazz.defineMethod (c$, "checkEnables", 
function () {
var isShow = this.checkVisible ();
this.dialog.setText (this.showHideButton, isShow ? "Hide" : "Show");
});
Clazz.defineMethod (c$, "createTable", 
function (data, header, widths) {
this.tableData = data;
this.dialog.createTable (data, header, widths);
}, "~A,~A,~A");
Clazz.defineMethod (c$, "setTableSelectionEnabled", 
function (enabled) {
this.dialog.setCellSelectionEnabled (enabled);
}, "~B");
Clazz.defineMethod (c$, "getParameters", 
function () {
return this.myParams;
});
Clazz.defineMethod (c$, "showMessage", 
function (msg, title, msgType) {
this.manager.showMessageDialog (this.dialog, msg, title, msgType);
}, "~S,~S,~N");
Clazz.defineMethod (c$, "setThreshold", 
function (y) {
this.dialog.setText (this.txt1, this.getThreasholdText (y));
}, "~N");
Clazz.defineMethod (c$, "setComboSelected", 
function (i) {
this.dialog.setSelectedIndex (this.combo1, i);
}, "~N");
Clazz.defineMethod (c$, "applyFromFields", 
function () {
this.apply (null);
});
Clazz.defineMethod (c$, "reEnable", 
function () {
this.paramsReEnable ();
return this;
});
Clazz.defineMethod (c$, "dispose", 
function () {
this.dialog.dispose ();
});
Clazz.defineMethod (c$, "setVisible", 
function (visible) {
this.dialog.setVisible (visible);
}, "~B");
Clazz.overrideMethod (c$, "isVisible", 
function () {
return this.dialog.isVisible ();
});
Clazz.defineMethod (c$, "selectTableRow", 
function (i) {
this.dialog.selectTableRow (i);
}, "~N");
Clazz.defineMethod (c$, "repaint", 
function () {
this.dialog.repaint ();
});
Clazz.defineMethod (c$, "setFields", 
function () {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
this.myParams = this.xyData.getParameters ();
this.setThreshold (this.myParams.peakListThreshold);
this.setComboSelected (this.myParams.peakListInterpolation.equals ("none") ? 1 : 0);
this.createData ();
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
});
Clazz.defineMethod (c$, "setFocus", 
function (tf) {
this.dialog.setFocus (tf);
}, "~B");
Clazz.defineMethod (c$, "update", 
function (clicked, xRange, yOffset) {
this.selectTableRow (-1);
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
this.loadData ();
this.checkEnables ();
break;
case JSV.common.Annotation.AType.Measurements:
this.loadData ();
this.checkEnables ();
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
if (yOffset > 20) this.applyFromFields ();
if (this.xyData == null || clicked == null || yOffset > 20) return;
var ipt = 0;
var dx0 = 1e100;
var xval = clicked.getXVal ();
var md = this.xyData;
var min = Math.abs (xRange / 20);
for (var i = md.size (); --i >= 0; ) {
var dx = Math.abs (xval - md.get (i).getXVal ());
if (dx < dx0) {
dx0 = dx;
ipt = i;
}}
if (dx0 < min) {
this.selectTableRow (md.size () - 2 - ipt);
this.repaint ();
}break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
}, "JSV.common.Coordinate,~N,~N");
Clazz.defineMethod (c$, "getPeakData", 
function () {
var md =  new JSV.common.PeakData (JSV.common.Annotation.AType.PeakList, this.$spec);
md.setPeakList (this.myParams, this.precision, this.jsvp.getPanelData ().getView ());
this.xyData = md;
return null;
});
Clazz.overrideMethod (c$, "getData", 
function () {
if (this.xyData == null) this.createData ();
return this.xyData;
});
Clazz.defineMethod (c$, "setData", 
function (data) {
this.myParams = data.getParameters ();
this.xyData = data;
}, "JSV.api.AnnotationData");
Clazz.overrideMethod (c$, "setSpecShift", 
function (dx) {
if (this.xyData != null) this.xyData.setSpecShift (dx);
}, "~N");
Clazz.defineMethod (c$, "setType", 
function (type) {
this.type = type;
switch (type) {
case JSV.common.Annotation.AType.Measurements:
this.addUnits = true;
break;
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.PeakList:
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
case JSV.common.Annotation.AType.NONE:
break;
}
}, "JSV.common.Annotation.AType");
Clazz.defineMethod (c$, "apply", 
function (objects) {
try {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
var offset = Double.parseDouble (objects[0]);
var scale = Double.parseDouble (objects[1]);
this.myParams.integralOffset = offset;
this.myParams.integralRange = scale;
this.myParams.integralDrawAll = false;
(this.getData ()).update (this.myParams);
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
return;
case JSV.common.Annotation.AType.PeakList:
if (!this.skipCreate) {
this.setThreshold (NaN);
this.createData ();
}this.skipCreate = false;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
this.vwr.parameters.viewOffset = Double.parseDouble (objects[0]);
break;
}
this.loadData ();
this.checkEnables ();
this.jsvp.doRepaint (true);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~A");
Clazz.defineMethod (c$, "done", 
function () {
if (this.jsvp != null && this.$spec != null) this.jsvp.getPanelData ().removeDialog (this);
if (this.xyData != null) this.xyData.setState (this.isON);
this.saveDialogPosition (this.getPosXY ());
this.dispose ();
this.jsvp.doRepaint (true);
});
Clazz.defineMethod (c$, "restoreDialogPosition", 
 function (panel, posXY) {
if (panel != null) {
if (posXY[0] == -2147483648) {
posXY[0] = 0;
posXY[1] = -20;
}var pt = this.manager.getLocationOnScreen (panel);
var height = panel.getHeight ();
this.loc =  Clazz.newIntArray (-1, [Math.max (0, pt[0] + posXY[0]), Math.max (0, pt[1] + height + posXY[1])]);
this.dialog.setIntLocation (this.loc);
}}, "JSV.api.JSVPanel,~A");
Clazz.defineMethod (c$, "saveDialogPosition", 
 function (posXY) {
try {
var pt = this.manager.getLocationOnScreen (this.dialog);
posXY[0] += pt[0] - this.loc[0];
posXY[1] += pt[1] - this.loc[1];
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~A");
Clazz.defineMethod (c$, "getThreasholdText", 
 function (y) {
if (Double.isNaN (y)) {
var pd = this.jsvp.getPanelData ();
var f = (pd.getSpectrum ().isInverted () ? 0.1 : 0.9);
var c = pd.getClickedCoordinate ();
y = (c == null ? (pd.getView ().minYOnScale * f + pd.getView ().maxYOnScale) * (1 - f) : c.getYVal ());
}var sy = JU.DF.formatDecimalDbl (y, y < 1000 ? 2 : -2);
return " " + sy;
}, "~N");
Clazz.defineMethod (c$, "checkVisible", 
 function () {
return this.vwr.pd ().getShowAnnotation (this.type);
});
Clazz.defineMethod (c$, "getUnitOptions", 
 function () {
var key = this.optionKey + "_format";
var format = this.options.get (key);
if (format == null) this.options.put (key, format = Integer.$valueOf (this.formatOptions[this.unitPtr == null ? 0 : this.unitPtr.intValue ()]));
});
Clazz.defineMethod (c$, "eventFocus", 
function () {
if (this.$spec != null) this.jsvp.getPanelData ().jumpToSpectrum (this.$spec);
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
if (this.iRowSelected >= 0) {
this.iRowSelected++;
this.tableCellSelect (-1, -1);
}break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
this.createData ();
this.skipCreate = true;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
});
Clazz.defineMethod (c$, "eventApply", 
function () {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
this.createData ();
this.skipCreate = true;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
this.applyFromFields ();
});
Clazz.defineMethod (c$, "eventShowHide", 
 function (isShow) {
this.isON = isShow;
if (isShow) this.eventApply ();
this.jsvp.doRepaint (true);
this.checkEnables ();
}, "~B");
Clazz.defineMethod (c$, "clear", 
 function () {
this.setState (true);
if (this.xyData != null) {
this.xyData.clear ();
this.applyFromFields ();
}});
Clazz.defineMethod (c$, "paramsReEnable", 
 function () {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
this.skipCreate = true;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
this.setVisible (true);
this.isON = true;
this.applyFromFields ();
});
Clazz.defineMethod (c$, "tableCellSelect", 
 function (iRow, iCol) {
System.out.println (iRow + " jSVDial " + iCol);
if (iRow < 0) {
iRow = Clazz.doubleToInt (this.iRowColSelected / 1000);
iCol = this.iRowColSelected % 1000;
this.iRowColSelected = -1;
}var value = this.tableData[iRow][1];
var icolrow = iRow * 1000 + iCol;
if (icolrow == this.iRowColSelected) return;
this.iRowColSelected = icolrow;
System.out.println ("Setting rc = " + this.iRowColSelected + " " + this.$spec);
this.selectTableRow (this.iRowSelected);
try {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
this.callback ("SHOWSELECTION", value.toString ());
this.checkEnables ();
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
try {
switch (iCol) {
case 6:
case 5:
case 4:
var x1 = Double.parseDouble (value);
var x2 = Double.parseDouble (this.tableData[iRow + 3 - iCol][1]);
this.jsvp.getPanelData ().setXPointers (this.$spec, x1, this.$spec, x2);
break;
default:
this.jsvp.getPanelData ().findX (this.$spec, Double.parseDouble (value));
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.jsvp.getPanelData ().findX (this.$spec, 1E100);
} else {
throw e;
}
}
this.jsvp.doRepaint (false);
break;
case JSV.common.Annotation.AType.OverlayLegend:
this.jsvp.getPanelData ().setSpectrum (iRow, false);
break;
case JSV.common.Annotation.AType.Views:
break;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~N,~N");
Clazz.defineMethod (c$, "loadData", 
function () {
var data;
var header;
var widths;
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
if (this.xyData == null) this.createData ();
this.iSelected = -1;
data = (this.xyData).getMeasurementListArray (null);
header = this.xyData.getDataHeader ();
widths =  Clazz.newIntArray (-1, [40, 65, 65, 50]);
this.createTable (data, header, widths);
break;
case JSV.common.Annotation.AType.Measurements:
if (this.xyData == null) return;
data = this.xyData.getMeasurementListArray (this.dialog.getSelectedItem (this.combo1).toString ());
header = this.xyData.getDataHeader ();
widths =  Clazz.newIntArray (-1, [40, 65, 65, 50]);
this.createTable (data, header, widths);
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
if (this.xyData == null) this.createData ();
data = (this.xyData).getMeasurementListArray (null);
header = (this.xyData).getDataHeader ();
widths =  Clazz.newIntArray (-1, [40, 65, 50, 50, 50, 50, 50]);
this.createTable (data, header, widths);
this.setTableSelectionEnabled (true);
break;
case JSV.common.Annotation.AType.OverlayLegend:
header =  Clazz.newArray (-1, ["No.", "Plot Color", "Title"]);
data = this.vwr.selectedPanel.getPanelData ().getOverlayLegendData ();
widths =  Clazz.newIntArray (-1, [30, 60, 250]);
this.createTable (data, header, widths);
this.setTableSelectionEnabled (true);
break;
case JSV.common.Annotation.AType.Views:
break;
}
});
Clazz.defineMethod (c$, "createData", 
 function () {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
this.xyData =  new JSV.common.IntegralData (this.$spec, this.myParams);
this.iSelected = -1;
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
try {
var thresh = Double.parseDouble (this.dialog.getText (this.txt1));
this.myParams.peakListThreshold = thresh;
this.myParams.peakListInterpolation = this.dialog.getSelectedItem (this.combo1).toString ();
this.myParams.precision = this.precision;
var md =  new JSV.common.PeakData (JSV.common.Annotation.AType.PeakList, this.$spec);
md.setPeakList (this.myParams, this.precision, this.jsvp.getPanelData ().getView ());
this.xyData = md;
this.loadData ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
});
Clazz.defineMethod (c$, "setPrecision", 
 function (i) {
this.precision = this.formatOptions[i];
}, "~N");
Clazz.defineMethod (c$, "tableSelect", 
 function (url) {
var isAdjusting = "true".equals (this.getField (url, "adjusting"));
if (isAdjusting) {
this.iColSelected = this.iRowSelected = -1;
System.out.println ("adjusting" + url);
return;
}var index = JU.PT.parseInt (this.getField (url, "index"));
switch ("ROW COL ROWCOL".indexOf (this.getField (url, "selector"))) {
case 8:
this.iColSelected = JU.PT.parseInt (this.getField (url, "index2"));
case 0:
this.iRowSelected = index;
System.out.println ("r set to " + index);
break;
case 4:
this.iColSelected = index;
System.out.println ("c set to " + index);
break;
}
if (this.iColSelected >= 0 && this.iRowSelected >= 0) {
this.tableCellSelect (this.iRowSelected, this.iColSelected);
}}, "~S");
Clazz.defineMethod (c$, "getField", 
 function (url, name) {
url += "&";
var key = "&" + name + "=";
var pt = url.indexOf (key);
return (pt < 0 ? null : url.substring (pt + key.length, url.indexOf ("&", pt + 1)));
}, "~S,~S");
});
