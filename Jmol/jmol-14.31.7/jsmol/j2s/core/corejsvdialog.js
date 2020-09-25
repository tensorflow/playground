(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.IntegrationDialog", ["java.lang.Double", "JU.DF", "JSV.common.Annotation"], function () {
c$ = Clazz_declareType (JSV.dialog, "IntegrationDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.IntegrationDialog, []);
this.type = JSV.common.Annotation.AType.Integration;
});
Clazz_overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.IntegrationDialog.posXY;
});
Clazz_defineMethod (c$, "addUniqueControls", 
function () {
this.txt1 = this.dialog.addTextField ("txtBaselineOffset", "Baseline Offset", null, "%", "" + this.vwr.parameters.integralOffset, true);
this.txt2 = this.dialog.addTextField ("txtScale", "Scale", null, "%", "" + this.vwr.parameters.integralRange, true);
this.dialog.addButton ("btnApply", "Apply");
this.addApplyBtn = false;
this.dialog.addButton ("btnAuto", "Auto");
this.dialog.addButton ("btnDelete", "Delete");
this.dialog.addButton ("btnNormalize", "Normalize");
});
Clazz_overrideMethod (c$, "applyFromFields", 
function () {
this.apply ( Clazz_newArray (-1, [this.dialog.getText (this.txt1), this.dialog.getText (this.txt2)]));
});
Clazz_overrideMethod (c$, "callback", 
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
if (Clazz_exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
return true;
}, "~S,~S");
Clazz_defineMethod (c$, "checkSelectedIntegral", 
 function () {
if (this.iSelected < 0) {
this.showMessage ("Select a line on the table first, then click this button.", "Integration", 1);
return false;
}return true;
});
Clazz_defineMethod (c$, "deleteIntegral", 
 function () {
if (!this.checkSelectedIntegral ()) return;
this.xyData.removeItemAt (this.iSelected);
this.iSelected = -1;
this.iRowColSelected = -1;
this.applyFromFields ();
});
Clazz_defineStatics (c$,
"posXY",  Clazz_newIntArray (-1, [-2147483648, 0]));
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.PeakListDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz_declareType (JSV.dialog, "PeakListDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.PeakListDialog, []);
this.type = JSV.common.Annotation.AType.PeakList;
});
Clazz_overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.PeakListDialog.posXY;
});
Clazz_defineMethod (c$, "addUniqueControls", 
function () {
this.txt1 = this.dialog.addTextField ("txtThreshold", "Threshold", null, "", "", true);
this.dialog.setPreferredSize (780, 350);
this.setThreshold (NaN);
this.combo1 = this.dialog.addSelectOption ("cmbInterpolation", "Interpolation",  Clazz_newArray (-1, ["parabolic", "none"]), 0, true);
});
Clazz_overrideMethod (c$, "callback", 
function (id, msg) {
if (id.equals ("cmbInterpolation") || id.equals ("txtThreshold")) id = "btnApply";
return this.callbackAD (id, msg);
}, "~S,~S");
Clazz_defineStatics (c$,
"posXY",  Clazz_newIntArray (-1, [-2147483648, 0]));
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.MeasurementsDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz_declareType (JSV.dialog, "MeasurementsDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.MeasurementsDialog, []);
this.type = JSV.common.Annotation.AType.Measurements;
});
Clazz_defineMethod (c$, "addUniqueControls", 
function () {
});
Clazz_overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.MeasurementsDialog.posXY;
});
Clazz_overrideMethod (c$, "callback", 
function (id, msg) {
return this.callbackAD (id, msg);
}, "~S,~S");
Clazz_defineStatics (c$,
"posXY",  Clazz_newIntArray (-1, [-2147483648, 0]));
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.OverlayLegendDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz_declareType (JSV.dialog, "OverlayLegendDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.OverlayLegendDialog, []);
this.type = JSV.common.Annotation.AType.OverlayLegend;
});
Clazz_overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.OverlayLegendDialog.posXY;
});
Clazz_defineMethod (c$, "addUniqueControls", 
function () {
});
Clazz_overrideMethod (c$, "callback", 
function (id, msg) {
return false;
}, "~S,~S");
Clazz_defineStatics (c$,
"posXY",  Clazz_newIntArray (-1, [-2147483648, 0]));
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.ViewsDialog", ["JU.Lst", "$.PT", "$.SB", "JSV.common.Annotation"], function () {
c$ = Clazz_decorateAsClass (function () {
this.treeNodes = null;
this.checkBoxes = null;
this.closeSelectedButton = null;
this.combineSelectedButton = null;
this.viewSelectedButton = null;
this.checking = false;
Clazz_instantialize (this, arguments);
}, JSV.dialog, "ViewsDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.ViewsDialog, []);
this.type = JSV.common.Annotation.AType.Views;
});
Clazz_overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.ViewsDialog.posXY;
});
Clazz_defineMethod (c$, "addUniqueControls", 
function () {
this.checkBoxes =  new JU.Lst ();
this.treeNodes =  new JU.Lst ();
this.dialog.addButton ("btnSelectAll", "Select All");
this.dialog.addButton ("btnSelectNone", "Select None");
this.txt2 = this.dialog.addTextField ("txtOffset", "Offset", "" + this.vwr.parameters.viewOffset, "%", null, true);
this.viewSelectedButton = this.dialog.addButton ("btnViewSelected", "View Selected");
this.combineSelectedButton = this.dialog.addButton ("btnCombineSelected", "Combine Selected");
this.closeSelectedButton = this.dialog.addButton ("btnCloseSelected", "Close Selected");
this.dialog.addButton ("btnDone", "Done");
this.dialog.setPreferredSize (800, 350);
this.txt1 = this.dialog.addCheckBox (null, null, 0, false);
this.addCheckBoxes (this.vwr.spectraTree.getRootNode (), 0, true);
this.addCheckBoxes (this.vwr.spectraTree.getRootNode (), 0, false);
});
Clazz_defineMethod (c$, "addCheckBoxes", 
 function (rootNode, level, isViews) {
var enume = rootNode.children ();
while (enume.hasMoreElements ()) {
var treeNode = enume.nextElement ();
var node = treeNode.getPanelNode ();
if (node.isView != isViews) continue;
var title = node.toString ();
if (title.indexOf ("\n") >= 0) title = title.substring (0, title.indexOf ('\n'));
var name = "chkBox" + this.treeNodes.size ();
var cb = this.dialog.addCheckBox (name, title, level, node.isSelected);
treeNode.setIndex (this.treeNodes.size ());
this.treeNodes.addLast (treeNode);
this.checkBoxes.addLast (cb);
this.addCheckBoxes (treeNode, level + 1, isViews);
}
}, "JSV.api.JSVTreeNode,~N,~B");
Clazz_overrideMethod (c$, "checkEnables", 
function () {
var n = 0;
for (var i = 0; i < this.checkBoxes.size (); i++) {
if (this.dialog.isSelected (this.checkBoxes.get (i)) && this.treeNodes.get (i).getPanelNode ().jsvp != null) {
n++;
}}
System.out.println ("viewsdialog n=" + n);
this.dialog.setEnabled (this.closeSelectedButton, n > 0);
this.dialog.setEnabled (this.combineSelectedButton, n > 1);
this.dialog.setEnabled (this.viewSelectedButton, n == 1);
});
Clazz_defineMethod (c$, "check", 
function (name) {
var i = JU.PT.parseInt (name.substring (name.indexOf ("_") + 1));
var node = this.treeNodes.get (i);
var cb = this.checkBoxes.get (i);
var isSelected = this.dialog.isSelected (cb);
if (node.getPanelNode ().jsvp == null) {
if (!this.checking && isSelected && this.dialog.getText (cb).startsWith ("Overlay")) {
this.checking = true;
this.selectAll (false);
this.dialog.setSelected (cb, true);
node.getPanelNode ().isSelected = true;
this.checking = false;
}var enume = node.children ();
while (enume.hasMoreElements ()) {
var treeNode = enume.nextElement ();
this.dialog.setSelected (this.checkBoxes.get (treeNode.getIndex ()), isSelected);
treeNode.getPanelNode ().isSelected = isSelected;
node.getPanelNode ().isSelected = isSelected;
}
} else {
node.getPanelNode ().isSelected = isSelected;
}if (isSelected) for (i = this.treeNodes.size (); --i >= 0; ) if (this.treeNodes.get (i).getPanelNode ().isView != node.getPanelNode ().isView) {
this.dialog.setSelected (this.checkBoxes.get (this.treeNodes.get (i).getIndex ()), false);
this.treeNodes.get (i).getPanelNode ().isSelected = false;
}
this.checkEnables ();
}, "~S");
Clazz_defineMethod (c$, "selectAll", 
function (mode) {
for (var i = this.checkBoxes.size (); --i >= 0; ) {
this.dialog.setSelected (this.checkBoxes.get (i), mode);
this.treeNodes.get (i).getPanelNode ().isSelected = mode;
}
this.checkEnables ();
}, "~B");
Clazz_defineMethod (c$, "combineSelected", 
function () {
});
Clazz_defineMethod (c$, "viewSelected", 
function () {
var sb =  new JU.SB ();
var thisNode = null;
var n = 0;
for (var i = 0; i < this.checkBoxes.size (); i++) {
var cb = this.checkBoxes.get (i);
var node = this.treeNodes.get (i).getPanelNode ();
if (this.dialog.isSelected (cb) && node.jsvp != null) {
if (node.isView) {
thisNode = node;
n = 2;
break;
}n++;
var label = this.dialog.getText (cb);
sb.append (" ").append (label.substring (0, label.indexOf (":")));
}}
var script = null;
if (n > 1) {
this.eventApply ();
script = "STACKOFFSETY " + this.vwr.parameters.viewOffset;
}if (thisNode == null) {
this.vwr.execView (sb.toString ().trim (), false);
this.layoutDialog ();
} else {
this.vwr.setNode (thisNode);
}if (script != null) this.vwr.runScript (script);
});
Clazz_defineMethod (c$, "closeSelected", 
function () {
this.vwr.runScript ("close !selected");
this.layoutDialog ();
});
Clazz_overrideMethod (c$, "callback", 
function (id, msg) {
if (id.equals ("btnSelectAll")) {
this.selectAll (true);
} else if (id.equals ("btnSelectNone")) {
this.selectAll (false);
} else if (id.equals ("btnViewSelected")) {
this.viewSelected ();
} else if (id.equals ("btnCombineSelected")) {
this.viewSelected ();
} else if (id.equals ("btnCloseSelected")) {
this.closeSelected ();
} else if (id.equals ("btnDone")) {
this.viewSelected ();
this.dispose ();
this.done ();
} else if (id.equals ("txtOffset")) {
this.eventApply ();
this.viewSelected ();
} else if (id.startsWith ("chk")) {
this.checkEnables ();
} else {
return this.callbackAD (id, msg);
}return true;
}, "~S,~S");
Clazz_overrideMethod (c$, "applyFromFields", 
function () {
this.apply ( Clazz_newArray (-1, [this.dialog.getText (this.txt2)]));
});
Clazz_defineStatics (c$,
"posXY",  Clazz_newIntArray (-1, [-2147483648, 0]));
});
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["JSV.dialog.DialogManager"], "JSV.js2d.JsDialogManager", ["JU.PT", "JSV.js2d.DialogTableModel", "$.JsDialog", "JS.Dimension", "$.JDialog", "$.JEditorPane", "$.JLabel", "$.JScrollPane", "$.JTable"], function () {
c$ = Clazz_declareType (JSV.js2d, "JsDialogManager", JSV.dialog.DialogManager);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.js2d.JsDialogManager, []);
});
Clazz_overrideMethod (c$, "getDialog", 
function (jsvDialog) {
return  new JSV.js2d.JsDialog (this, jsvDialog, this.registerDialog (jsvDialog));
}, "JSV.dialog.JSVDialog");
Clazz_overrideMethod (c$, "getDialogInput", 
function (parentComponent, phrase, title, msgType, icon, objects, defaultStr) {
{
return prompt(phrase, defaultStr);
}}, "~O,~S,~S,~N,~O,~A,~S");
Clazz_overrideMethod (c$, "showMessageDialog", 
function (parentComponent, msg, title, msgType) {
{
alert(msg);
}}, "~O,~S,~S,~N");
Clazz_overrideMethod (c$, "getLocationOnScreen", 
function (component) {
return  Clazz_newIntArray (2, 0);
}, "~O");
Clazz_overrideMethod (c$, "getOptionFromDialog", 
function (frame, items, jsvp, dialogName, labelName) {
return this.vwr.html5Applet.getOption (items, dialogName, labelName);
}, "~O,~A,JSV.api.JSVPanel,~S,~S");
Clazz_overrideMethod (c$, "showProperties", 
function (frame, spectrum) {
var dialog =  new JS.JDialog ();
dialog.setTitle ("Header Information");
var rowData = spectrum.getHeaderRowDataAsArray ();
var columnNames =  Clazz_newArray (-1, ["Label", "Description"]);
var tableModel =  new JSV.js2d.DialogTableModel (columnNames, rowData, false, true);
var table =  new JS.JTable (tableModel);
table.setPreferredScrollableViewportSize ( new JS.Dimension (400, 195));
var scrollPane =  new JS.JScrollPane (table);
dialog.getContentPane ().add (scrollPane);
dialog.pack ();
dialog.setVisible (true);
dialog.toFront ();
}, "~O,JSV.common.Spectrum");
Clazz_overrideMethod (c$, "showMessage", 
function (frame, text, title) {
var dialog =  new JS.JDialog ();
{
dialog.manager = this;
}dialog.setTitle (title);
var pane;
if (text.indexOf ("</div>") >= 0) {
pane =  new JS.JLabel (text);
} else {
pane =  new JS.JEditorPane ();
pane.setText (text);
}dialog.getContentPane ().add (pane);
dialog.pack ();
dialog.setVisible (true);
dialog.toFront ();
}, "~O,~S,~S");
Clazz_defineMethod (c$, "actionPerformed", 
function (eventId) {
var pt = eventId.indexOf ("/JT");
if (pt >= 0) {
var pt2 = eventId.lastIndexOf ("_");
var pt1 = eventId.lastIndexOf ("_", pt2 - 1);
var irow = JU.PT.parseInt (eventId.substring (pt1 + 1, pt2));
var icol = JU.PT.parseInt (eventId.substring (pt2 + 1));
this.processTableEvent (eventId.substring (0, pt) + "/ROWCOL", irow, icol, false);
return;
}this.processClick (eventId);
}, "~S");
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (null, "JSV.dialog.DialogManager", ["java.util.Hashtable", "JU.PT", "JSV.common.JSVFileManager", "$.JSViewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.htSelectors = null;
this.htDialogs = null;
this.options = null;
Clazz_instantialize (this, arguments);
}, JSV.dialog, "DialogManager");
Clazz_defineMethod (c$, "set", 
function (viewer) {
this.vwr = viewer;
this.htSelectors =  new java.util.Hashtable ();
this.htDialogs =  new java.util.Hashtable ();
return this;
}, "JSV.common.JSViewer");
Clazz_defineMethod (c$, "registerDialog", 
function (jsvDialog) {
var id = jsvDialog.optionKey;
if (!id.endsWith ("!")) id += " " + ("" + Math.random ()).substring (3);
if (this.htDialogs.containsKey (id)) this.htDialogs.get (id).dispose ();
this.htDialogs.put (id, jsvDialog);
return id;
}, "JSV.dialog.JSVDialog");
Clazz_defineMethod (c$, "registerSelector", 
function (selectorName, columnSelector) {
this.htSelectors.put (columnSelector, selectorName);
}, "~S,~O");
Clazz_defineMethod (c$, "getSelectorName", 
function (selector) {
return this.htSelectors.get (selector);
}, "~O");
Clazz_defineMethod (c$, "showSourceErrors", 
function (frame, currentSource) {
if (currentSource == null) {
this.showMessageDialog (frame, "Please Select a Spectrum.", "Select Spectrum", 2);
return;
}var errorLog = currentSource.getErrorLog ();
if (errorLog != null && errorLog.length > 0) this.showMessage (frame, errorLog, JSV.dialog.DialogManager.fixTitle (currentSource.getFilePath ()));
 else this.showMessageDialog (frame, "No errors found.", "Error Log", 1);
}, "~O,JSV.source.JDXSource");
Clazz_defineMethod (c$, "showSource", 
function (frame, spec) {
var filePath = spec.getFilePath ();
if (filePath == null) {
this.showMessageDialog (frame, "Please Select a Spectrum", "Select Spectrum", 2);
return;
}if (filePath === "[inline]") {
this.showMessage (null, spec.getInlineData (), "Inline data");
return;
}try {
var s = JSV.common.JSVFileManager.getFileAsString (filePath);
if (JSV.common.JSViewer.isJS) s = JU.PT.rep (s, "<", "&lt;");
this.showMessage (null, s, JSV.dialog.DialogManager.fixTitle (filePath));
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
this.showMessageDialog (frame, "File Not Found", "SHOWSOURCE", 0);
} else {
throw ex;
}
}
}, "~O,JSV.common.Spectrum");
Clazz_defineMethod (c$, "processClick", 
function (eventId) {
var pt = eventId.lastIndexOf ("/");
var id = eventId.substring (pt + 1);
var dialog = eventId.substring (0, pt);
this.dialogCallback (dialog, id, null);
}, "~S");
Clazz_defineMethod (c$, "processTableEvent", 
function (eventId, index1, index2, adjusting) {
var pt = eventId.lastIndexOf ("/");
var dialog = eventId.substring (0, pt);
var selector = eventId.substring (pt + 1);
var msg = "&selector=" + selector + "&index=" + index1 + (index2 < 0 ? "&adjusting=" + adjusting : "&index2=" + index2);
this.dialogCallback (dialog, "tableSelect", msg);
}, "~S,~N,~N,~B");
Clazz_defineMethod (c$, "processWindowClosing", 
function (dialogId) {
this.dialogCallback (dialogId, "windowClosing", null);
this.htDialogs.remove (dialogId);
}, "~S");
Clazz_defineMethod (c$, "dialogCallback", 
 function (dialogId, id, msg) {
var jsvDialog = this.htDialogs.get (dialogId);
if (jsvDialog != null) jsvDialog.callback (id, msg);
}, "~S,~S,~S");
Clazz_defineMethod (c$, "getDialogOptions", 
function () {
if (this.options == null) this.options =  new java.util.Hashtable ();
return this.options;
});
c$.fixTitle = Clazz_defineMethod (c$, "fixTitle", 
function (title) {
return (title.length > 50 ? title.substring (0, 50) + "..." : title);
}, "~S");
Clazz_defineStatics (c$,
"PLAIN_MESSAGE", -1,
"ERROR_MESSAGE", 0,
"INFORMATION_MESSAGE", 1,
"WARNING_MESSAGE", 2,
"QUESTION_MESSAGE", 3);
});
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["JS.AbstractTableModel"], "JSV.js2d.DialogTableModel", ["javajs.api.GenericColor", "JU.CU"], function () {
c$ = Clazz_decorateAsClass (function () {
this.columnNames = null;
this.data = null;
this.asString = false;
this.widths = null;
this.thisCol = 0;
this.tableCellAlignLeft = false;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "DialogTableModel", null, JS.AbstractTableModel);
Clazz_makeConstructor (c$, 
function (columnNames, data, asString, tableCellAlignLeft) {
this.columnNames = columnNames;
this.data = data;
this.asString = asString;
this.widths = (data.length == 0 ?  Clazz_newIntArray (0, 0) :  Clazz_newIntArray (data[0].length, 0));
this.tableCellAlignLeft = tableCellAlignLeft;
}, "~A,~A,~B,~B");
Clazz_defineMethod (c$, "getColumnCount", 
function () {
return this.columnNames.length;
});
Clazz_defineMethod (c$, "getRowCount", 
function () {
return this.data.length;
});
Clazz_defineMethod (c$, "getColumnName", 
function (col) {
return this.columnNames[col];
}, "~N");
Clazz_defineMethod (c$, "getValueAt", 
function (row, col) {
var o = this.data[row][col];
return (this.asString ? " " + o + " " : o);
}, "~N,~N");
Clazz_overrideMethod (c$, "getColumn", 
function (i) {
this.thisCol = i;
return this;
}, "~N");
Clazz_overrideMethod (c$, "setPreferredWidth", 
function (n) {
this.widths[this.thisCol] = n;
}, "~N");
Clazz_overrideMethod (c$, "toHTML", 
function (sb, id, selectedRows) {
if (this.data == null || this.data[0] == null || this.data[0].length == 0) return;
var nrows = this.data.length;
var ncols = this.columnNames.length;
for (var i = -1; i < nrows; i++) {
var rowid = id + "_" + i;
sb.append ("\n<tr id='" + rowid + "' class='JTable_" + (i == -1 ? "header" : "row") + "' style='height:25px'>");
for (var j = 0; j < ncols; j++) {
if (i == -1) this.getCellHtml (sb, id + "_h" + j, i, j, this.columnNames[j], false);
 else this.getCellHtml (sb, rowid + "_" + j, i, j, this.data[i][j], selectedRows.get (i));
}
sb.append ("</tr>");
}
}, "JU.SB,~S,JU.BS");
Clazz_defineMethod (c$, "getCellHtml", 
 function (sb, id, iRow, iCol, o, isSelected) {
var style = this.getCellStyle (id, iRow, iCol, o, isSelected);
sb.append ("<td id='" + id + "'" + style + " onclick=SwingController.click(this)>" + o + "</td>");
}, "JU.SB,~S,~N,~N,~O,~B");
Clazz_defineMethod (c$, "getCellStyle", 
 function (id, iRow, iCol, o, isSelected) {
var style = "padding:1px 1px 1px 1px";
if (iRow < 0) {
style += ";font-weight:bold";
} else {
if (Clazz_instanceOf (o, javajs.api.GenericColor)) {
style += ";background-color:" + JU.CU.toCSSString (o);
} else {
if (this.asString) o = " " + o + " ";
style += ";text-align:";
if (this.tableCellAlignLeft) style += "left";
 else if (iCol == 0) style += "center";
 else style += "right";
style += ";border:" + (isSelected ? 3 : 1) + "px solid #000";
}}return " style='" + style + "'";
}, "~S,~N,~N,~O,~B");
});
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["JSV.api.PlatformDialog", "JS.JDialog", "$.Insets"], "JSV.js2d.JsDialog", ["java.util.Hashtable", "JSV.common.Annotation", "JSV.js2d.DialogTableModel", "JS.Color", "$.Dimension", "$.FlowLayout", "$.GridBagConstraints", "$.GridBagLayout", "$.JButton", "$.JCheckBox", "$.JComboBox", "$.JLabel", "$.JPanel", "$.JScrollPane", "$.JSplitPane", "$.JTable", "$.JTextField"], function () {
c$ = Clazz_decorateAsClass (function () {
this.optionKey = null;
this.registryKey = null;
this.options = null;
this.manager = null;
this.type = null;
this.leftPanel = null;
this.mainSplitPane = null;
this.rightPanel = null;
this.thisPanel = null;
this.dataTable = null;
this.iRow = 0;
this.haveColors = false;
this.tableCellAlignLeft = false;
this.haveTwoPanels = true;
this.buttonInsets = null;
this.panelInsets = null;
this.selectedRow = -1;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "JsDialog", JS.JDialog, JSV.api.PlatformDialog);
Clazz_prepareFields (c$, function () {
this.buttonInsets =  new JS.Insets (5, 5, 5, 5);
this.panelInsets =  new JS.Insets (0, 0, 2, 2);
});
Clazz_makeConstructor (c$, 
function (manager, jsvDialog, registryKey) {
Clazz_superConstructor (this, JSV.js2d.JsDialog);
this.defaultHeight = 350;
this.manager = manager;
this.registryKey = registryKey;
this.optionKey = jsvDialog.optionKey;
this.type = jsvDialog.getAType ();
this.options = jsvDialog.options;
if (this.options == null) this.options =  new java.util.Hashtable ();
this.getContentPane ().setBackground (JS.Color.get3 (230, 230, 230));
this.toFront ();
}, "JSV.dialog.DialogManager,JSV.dialog.JSVDialog,~S");
Clazz_defineMethod (c$, "onFocus", 
function () {
this.toFront ();
});
Clazz_overrideMethod (c$, "setFocus", 
function (tf) {
if (tf) {
this.toFront ();
}}, "~B");
Clazz_overrideMethod (c$, "addButton", 
function (name, text) {
var btn =  new JS.JButton ();
btn.setPreferredSize ( new JS.Dimension (120, 25));
btn.setText (text);
btn.setName (this.registryKey + "/" + name);
btn.addActionListener (this.manager);
this.thisPanel.add (btn,  new JS.GridBagConstraints (0, this.iRow++, 3, 1, 0.0, 0.0, 10, 0, this.buttonInsets, 0, 0));
return btn;
}, "~S,~S");
Clazz_overrideMethod (c$, "addCheckBox", 
function (name, title, level, isSelected) {
if (name == null) {
this.iRow = 0;
this.thisPanel = this.rightPanel;
return null;
}var cb =  new JS.JCheckBox ();
cb.setSelected (isSelected);
cb.setText (title);
cb.setName (this.registryKey + "/" + name);
cb.addActionListener (this.manager);
var insets =  new JS.Insets (0, 20 * level, 2, 2);
this.thisPanel.add (cb,  new JS.GridBagConstraints (0, this.iRow++, 1, 1, 0.0, 0.0, 17, 0, insets, 0, 0));
return cb;
}, "~S,~S,~N,~B");
Clazz_defineMethod (c$, "addPanelLine", 
 function (name, label, obj, units) {
this.thisPanel.add ( new JS.JLabel (label == null ? name : label),  new JS.GridBagConstraints (0, this.iRow, 1, 1, 0.0, 0.0, 13, 0, this.panelInsets, 0, 0));
if (units == null) {
this.thisPanel.add (obj,  new JS.GridBagConstraints (1, this.iRow, 2, 1, 0.0, 0.0, 17, 0, this.panelInsets, 0, 0));
} else {
this.thisPanel.add (obj,  new JS.GridBagConstraints (1, this.iRow, 1, 1, 0.0, 0.0, 10, 0, this.panelInsets, 0, 0));
this.thisPanel.add ( new JS.JLabel (units),  new JS.GridBagConstraints (2, this.iRow, 1, 1, 0.0, 0.0, 17, 0, this.panelInsets, 0, 0));
}this.iRow++;
}, "~S,~S,JS.JComponent,~S");
Clazz_overrideMethod (c$, "addSelectOption", 
function (name, label, info, iPt, visible) {
var combo =  new JS.JComboBox (info);
combo.setSelectedIndex (iPt);
combo.setName (this.registryKey + "/" + name);
if (visible) {
combo.addActionListener (this.manager);
this.addPanelLine (name, label, combo, null);
}return combo;
}, "~S,~S,~A,~N,~B");
Clazz_overrideMethod (c$, "addTextField", 
function (name, label, value, units, defaultValue, visible) {
var key = this.optionKey + "_" + name;
if (value == null) {
value = this.options.get (key);
if (value == null) this.options.put (key, (value = defaultValue));
}var obj =  new JS.JTextField (value);
obj.setName (this.registryKey + "/" + name);
if (visible) {
obj.setPreferredSize ( new JS.Dimension (45, 15));
obj.addActionListener (this.manager);
this.addPanelLine (name, label, obj, units);
}return obj;
}, "~S,~S,~S,~S,~S,~B");
Clazz_overrideMethod (c$, "createTable", 
function (data, header, widths) {
try {
var scrollPane =  new JS.JScrollPane (this.dataTable = this.getDataTable (data, header, widths, (this.leftPanel == null ? this.defaultHeight : this.leftPanel.getHeight () - 50)));
if (this.mainSplitPane == null) {
this.getContentPane ().add (scrollPane);
} else {
this.mainSplitPane.setRightComponent (scrollPane);
}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.validate ();
this.repaint ();
}, "~A,~A,~A");
Clazz_overrideMethod (c$, "endLayout", 
function () {
this.getContentPane ().removeAll ();
this.getContentPane ().add (this.mainSplitPane);
this.pack ();
});
Clazz_defineMethod (c$, "getDataTable", 
 function (data, columnNames, columnWidths, height) {
this.selectedRow = -1;
var tableModel =  new JSV.js2d.DialogTableModel (columnNames, data, !this.haveColors, this.tableCellAlignLeft);
var table =  new JS.JTable (tableModel);
var selector = table.getSelectionModel ();
selector.addListSelectionListener (this.manager);
this.manager.registerSelector (this.registryKey + "/ROW", selector);
selector = table.getColumnModel ().getSelectionModel ();
selector.addListSelectionListener (this.manager);
this.manager.registerSelector (this.registryKey + "/COLUMN", selector);
var n = 0;
for (var i = 0; i < columnNames.length; i++) {
table.getColumnModel ().getColumn (i).setPreferredWidth (columnWidths[i]);
n += columnWidths[i];
}
return table;
}, "~A,~A,~A,~N");
Clazz_overrideMethod (c$, "getSelectedIndex", 
function (c) {
return (c).getSelectedIndex ();
}, "~O");
Clazz_overrideMethod (c$, "getSelectedItem", 
function (combo) {
return (combo).getSelectedItem ();
}, "~O");
Clazz_defineMethod (c$, "getText", 
function (o) {
return (o).getText ();
}, "~O");
Clazz_overrideMethod (c$, "isSelected", 
function (chkbox) {
return (chkbox).isSelected ();
}, "~O");
Clazz_overrideMethod (c$, "selectTableRow", 
function (i) {
this.selectedRow = i;
this.dataTable.clearSelection ();
if (this.selectedRow >= 0) {
this.dataTable.setRowSelectionAllowed (true);
this.dataTable.setRowSelectionInterval (this.selectedRow, this.selectedRow + 1);
this.repaint ();
}}, "~N");
Clazz_overrideMethod (c$, "setCellSelectionEnabled", 
function (enabled) {
this.dataTable.setCellSelectionEnabled (enabled);
}, "~B");
Clazz_defineMethod (c$, "setEnabled", 
function (btn, b) {
(btn).setEnabled (b);
}, "~O,~B");
Clazz_overrideMethod (c$, "setIntLocation", 
function (loc) {
var d =  new JS.Dimension (0, 0);
{
SwingController.getScreenDimensions(d);
}loc[0] = Math.min (d.width - 50, loc[0]);
loc[1] = Math.min (d.height - 50, loc[1]);
this.setLocation (loc);
}, "~A");
Clazz_defineMethod (c$, "setPreferredSize", 
function (width, height) {
this.setPreferredSize ( new JS.Dimension (width, height));
}, "~N,~N");
Clazz_overrideMethod (c$, "setSelected", 
function (chkbox, b) {
(chkbox).setSelected (b);
}, "~O,~B");
Clazz_overrideMethod (c$, "setSelectedIndex", 
function (combo, i) {
(combo).setSelectedIndex (i);
}, "~O,~N");
Clazz_defineMethod (c$, "setText", 
function (o, text) {
(o).setText (text);
}, "~O,~S");
Clazz_overrideMethod (c$, "startLayout", 
function () {
this.setPreferredSize ( new JS.Dimension (600, 370));
this.getContentPane ().removeAll ();
this.thisPanel = this.rightPanel =  new JS.JPanel ( new JS.FlowLayout ());
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
case JSV.common.Annotation.AType.Measurements:
case JSV.common.Annotation.AType.PeakList:
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.OverlayLegend:
this.tableCellAlignLeft = true;
this.haveColors = true;
this.haveTwoPanels = false;
break;
case JSV.common.Annotation.AType.Views:
this.rightPanel =  new JS.JPanel ( new JS.GridBagLayout ());
}
if (this.haveTwoPanels) {
this.thisPanel = this.leftPanel =  new JS.JPanel ( new JS.GridBagLayout ());
this.leftPanel.setMinimumSize ( new JS.Dimension (200, 300));
this.mainSplitPane =  new JS.JSplitPane (1);
this.mainSplitPane.setLeftComponent (this.leftPanel);
this.mainSplitPane.setRightComponent ( new JS.JScrollPane (this.rightPanel));
}});
Clazz_defineMethod (c$, "getColumnCentering", 
function (column) {
return this.tableCellAlignLeft ? 2 : column == 0 ? 0 : 4;
}, "~N");
});
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "PlatformDialog");
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
