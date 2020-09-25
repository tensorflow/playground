Clazz.declarePackage ("JS");
Clazz.load (["JS.ColumnSelectionModel", "$.JComponent", "$.ListSelectionModel"], "JS.JTable", ["JU.BS", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tableModel = null;
this.bsSelectedCells = null;
this.bsSelectedRows = null;
this.rowSelectionAllowed = false;
this.cellSelectionEnabled = false;
this.selectionListener = null;
Clazz.instantialize (this, arguments);
}, JS, "JTable", JS.JComponent, [JS.ListSelectionModel, JS.ColumnSelectionModel]);
Clazz.makeConstructor (c$, 
function (tableModel) {
Clazz.superConstructor (this, JS.JTable, ["JT"]);
this.tableModel = tableModel;
this.bsSelectedCells =  new JU.BS ();
this.bsSelectedRows =  new JU.BS ();
}, "JS.AbstractTableModel");
Clazz.overrideMethod (c$, "getSelectionModel", 
function () {
return this;
});
Clazz.defineMethod (c$, "getColumnModel", 
function () {
return this;
});
Clazz.defineMethod (c$, "setPreferredScrollableViewportSize", 
function (dimension) {
this.width = dimension.width;
this.height = dimension.height;
}, "JS.Dimension");
Clazz.defineMethod (c$, "clearSelection", 
function () {
this.bsSelectedCells.clearAll ();
this.bsSelectedRows.clearAll ();
});
Clazz.defineMethod (c$, "setRowSelectionAllowed", 
function (b) {
this.rowSelectionAllowed = b;
}, "~B");
Clazz.defineMethod (c$, "setRowSelectionInterval", 
function (i, j) {
this.bsSelectedRows.clearAll ();
this.bsSelectedRows.setBits (i, j);
this.bsSelectedCells.clearAll ();
}, "~N,~N");
Clazz.defineMethod (c$, "setCellSelectionEnabled", 
function (enabled) {
this.cellSelectionEnabled = enabled;
}, "~B");
Clazz.overrideMethod (c$, "addListSelectionListener", 
function (listener) {
this.selectionListener = listener;
}, "~O");
Clazz.overrideMethod (c$, "getColumn", 
function (i) {
return this.tableModel.getColumn (i);
}, "~N");
Clazz.overrideMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<table id='" + this.id + "_table' class='JTable' >");
this.tableModel.toHTML (sb, this.id, this.bsSelectedRows);
sb.append ("\n</table>\n");
return sb.toString ();
});
});
