Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.dialog.DialogManager"], "JSV.js2d.JsDialogManager", ["JU.PT", "JSV.js2d.DialogTableModel", "$.JsDialog", "JS.Dimension", "$.JDialog", "$.JEditorPane", "$.JLabel", "$.JScrollPane", "$.JTable"], function () {
c$ = Clazz.declareType (JSV.js2d, "JsDialogManager", JSV.dialog.DialogManager);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.js2d.JsDialogManager, []);
});
Clazz.overrideMethod (c$, "getDialog", 
function (jsvDialog) {
return  new JSV.js2d.JsDialog (this, jsvDialog, this.registerDialog (jsvDialog));
}, "JSV.dialog.JSVDialog");
Clazz.overrideMethod (c$, "getDialogInput", 
function (parentComponent, phrase, title, msgType, icon, objects, defaultStr) {
{
return prompt(phrase, defaultStr);
}}, "~O,~S,~S,~N,~O,~A,~S");
Clazz.overrideMethod (c$, "showMessageDialog", 
function (parentComponent, msg, title, msgType) {
{
alert(msg);
}}, "~O,~S,~S,~N");
Clazz.overrideMethod (c$, "getLocationOnScreen", 
function (component) {
return  Clazz.newIntArray (2, 0);
}, "~O");
Clazz.overrideMethod (c$, "getOptionFromDialog", 
function (frame, items, jsvp, dialogName, labelName) {
return this.vwr.html5Applet.getOption (items, dialogName, labelName);
}, "~O,~A,JSV.api.JSVPanel,~S,~S");
Clazz.overrideMethod (c$, "showProperties", 
function (frame, spectrum) {
var dialog =  new JS.JDialog ();
dialog.setTitle ("Header Information");
var rowData = spectrum.getHeaderRowDataAsArray ();
var columnNames =  Clazz.newArray (-1, ["Label", "Description"]);
var tableModel =  new JSV.js2d.DialogTableModel (columnNames, rowData, false, true);
var table =  new JS.JTable (tableModel);
table.setPreferredScrollableViewportSize ( new JS.Dimension (400, 195));
var scrollPane =  new JS.JScrollPane (table);
dialog.getContentPane ().add (scrollPane);
dialog.pack ();
dialog.setVisible (true);
dialog.toFront ();
}, "~O,JSV.common.Spectrum");
Clazz.overrideMethod (c$, "showMessage", 
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
Clazz.defineMethod (c$, "actionPerformed", 
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
