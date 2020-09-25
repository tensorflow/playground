Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JS.AbstractTableModel"], "JSV.js2d.DialogTableModel", ["javajs.api.GenericColor", "JU.CU"], function () {
c$ = Clazz.decorateAsClass (function () {
this.columnNames = null;
this.data = null;
this.asString = false;
this.widths = null;
this.thisCol = 0;
this.tableCellAlignLeft = false;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "DialogTableModel", null, JS.AbstractTableModel);
Clazz.makeConstructor (c$, 
function (columnNames, data, asString, tableCellAlignLeft) {
this.columnNames = columnNames;
this.data = data;
this.asString = asString;
this.widths = (data.length == 0 ?  Clazz.newIntArray (0, 0) :  Clazz.newIntArray (data[0].length, 0));
this.tableCellAlignLeft = tableCellAlignLeft;
}, "~A,~A,~B,~B");
Clazz.defineMethod (c$, "getColumnCount", 
function () {
return this.columnNames.length;
});
Clazz.defineMethod (c$, "getRowCount", 
function () {
return this.data.length;
});
Clazz.defineMethod (c$, "getColumnName", 
function (col) {
return this.columnNames[col];
}, "~N");
Clazz.defineMethod (c$, "getValueAt", 
function (row, col) {
var o = this.data[row][col];
return (this.asString ? " " + o + " " : o);
}, "~N,~N");
Clazz.overrideMethod (c$, "getColumn", 
function (i) {
this.thisCol = i;
return this;
}, "~N");
Clazz.overrideMethod (c$, "setPreferredWidth", 
function (n) {
this.widths[this.thisCol] = n;
}, "~N");
Clazz.overrideMethod (c$, "toHTML", 
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
Clazz.defineMethod (c$, "getCellHtml", 
 function (sb, id, iRow, iCol, o, isSelected) {
var style = this.getCellStyle (id, iRow, iCol, o, isSelected);
sb.append ("<td id='" + id + "'" + style + " onclick=SwingController.click(this)>" + o + "</td>");
}, "JU.SB,~S,~N,~N,~O,~B");
Clazz.defineMethod (c$, "getCellStyle", 
 function (id, iRow, iCol, o, isSelected) {
var style = "padding:1px 1px 1px 1px";
if (iRow < 0) {
style += ";font-weight:bold";
} else {
if (Clazz.instanceOf (o, javajs.api.GenericColor)) {
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
