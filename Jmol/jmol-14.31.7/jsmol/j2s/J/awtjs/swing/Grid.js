Clazz.declarePackage ("JS");
Clazz.load (null, "JS.Grid", ["JU.AU", "$.SB", "JS.Cell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nrows = 0;
this.ncols = 0;
this.grid = null;
this.renderer = null;
Clazz.instantialize (this, arguments);
}, JS, "Grid");
Clazz.makeConstructor (c$, 
function (rows, cols) {
this.grid =  Clazz.newArray (0, 0, null);
}, "~N,~N");
Clazz.defineMethod (c$, "add", 
function (btn, c) {
if (c.gridx >= this.ncols) {
this.ncols = c.gridx + 1;
for (var i = 0; i < this.nrows; i++) {
this.grid[i] = JU.AU.ensureLength (this.grid[i], this.ncols * 2);
}
}if (c.gridy >= this.nrows) {
var g =  new Array (c.gridy * 2 + 1);
for (var i = 0; i < this.nrows; i++) g[i] = this.grid[i];

for (var i = g.length; --i >= this.nrows; ) g[i] =  new Array (this.ncols * 2 + 1);

this.grid = g;
this.nrows = c.gridy + 1;
}this.grid[c.gridy][c.gridx] =  new JS.Cell (btn, c);
}, "JS.JComponent,JS.GridBagConstraints");
Clazz.defineMethod (c$, "toHTML", 
function (id) {
var sb =  new JU.SB ();
id += "_grid";
sb.append ("\n<table id='" + id + "' class='Grid' style='width:100%;height:100%'><tr><td style='height:20%;width:20%'></td></tr>");
for (var i = 0; i < this.nrows; i++) {
var rowid = id + "_" + i;
sb.append ("\n<tr id='" + rowid + "'><td></td>");
for (var j = 0; j < this.ncols; j++) if (this.grid[i][j] != null) sb.append (this.grid[i][j].toHTML (rowid + "_" + j));

sb.append ("</tr>");
}
sb.append ("\n<tr><td style='height:20%;width:20%'></td></tr></table>\n");
return sb.toString ();
}, "~S");
});
