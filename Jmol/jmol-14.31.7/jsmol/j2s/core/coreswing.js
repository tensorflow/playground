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
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "SC");
Clazz_declarePackage ("JS");
Clazz_load (["JS.LayoutManager"], "JS.BorderLayout", null, function () {
c$ = Clazz_declareType (JS, "BorderLayout", JS.LayoutManager);
Clazz_defineStatics (c$,
"CENTER", "Center",
"NORTH", "North",
"SOUTH", "South",
"EAST", "East",
"WEST", "West");
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.Component", ["JU.CU"], function () {
c$ = Clazz_decorateAsClass (function () {
this._visible = false;
this.enabled = true;
this.text = null;
this.name = null;
this.width = 0;
this.height = 0;
this.id = null;
this.parent = null;
this.mouseListener = null;
this.bgcolor = null;
this.minWidth = 30;
this.minHeight = 30;
this.renderWidth = 0;
this.renderHeight = 0;
Clazz_instantialize (this, arguments);
}, JS, "Component");
Clazz_defineMethod (c$, "setParent", 
function (p) {
this.parent = p;
}, "~O");
Clazz_makeConstructor (c$, 
function (type) {
this.id = JS.Component.newID (type);
if (type == null) return;
{
SwingController.register(this, type);
}}, "~S");
c$.newID = Clazz_defineMethod (c$, "newID", 
function (type) {
return type + ("" + Math.random ()).substring (3, 10);
}, "~S");
Clazz_defineMethod (c$, "setBackground", 
function (color) {
this.bgcolor = color;
}, "javajs.api.GenericColor");
Clazz_defineMethod (c$, "setText", 
function (text) {
this.text = text;
{
SwingController.setText(this);
}}, "~S");
Clazz_defineMethod (c$, "setName", 
function (name) {
this.name = name;
}, "~S");
Clazz_defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz_defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz_defineMethod (c$, "setPreferredSize", 
function (dimension) {
this.width = dimension.width;
this.height = dimension.height;
}, "JS.Dimension");
Clazz_defineMethod (c$, "addMouseListener", 
function (listener) {
this.mouseListener = listener;
}, "~O");
Clazz_defineMethod (c$, "getText", 
function () {
return this.text;
});
Clazz_defineMethod (c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz_defineMethod (c$, "setEnabled", 
function (enabled) {
this.enabled = enabled;
{
SwingController.setEnabled(this);
}}, "~B");
Clazz_defineMethod (c$, "isVisible", 
function () {
return this._visible;
});
Clazz_defineMethod (c$, "setVisible", 
function (visible) {
this._visible = visible;
{
SwingController.setVisible(this);
}}, "~B");
Clazz_defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz_defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz_defineMethod (c$, "setMinimumSize", 
function (d) {
this.minWidth = d.width;
this.minHeight = d.height;
}, "JS.Dimension");
Clazz_defineMethod (c$, "getSubcomponentWidth", 
function () {
return this.width;
});
Clazz_defineMethod (c$, "getSubcomponentHeight", 
function () {
return this.height;
});
Clazz_defineMethod (c$, "getCSSstyle", 
function (defaultPercentW, defaultPercentH) {
var width = (this.renderWidth > 0 ? this.renderWidth : this.getSubcomponentWidth ());
var height = (this.renderHeight > 0 ? this.renderHeight : this.getSubcomponentHeight ());
return (width > 0 ? "width:" + width + "px;" : defaultPercentW > 0 ? "width:" + defaultPercentW + "%;" : "") + (height > 0 ? "height:" + height + "px;" : defaultPercentH > 0 ? "height:" + defaultPercentH + "%;" : "") + (this.bgcolor == null ? "" : "background-color:" + JU.CU.toCSSString (this.bgcolor) + ";");
}, "~N,~N");
Clazz_defineMethod (c$, "repaint", 
function () {
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.Component"], "JS.Container", ["JU.Lst"], function () {
c$ = Clazz_decorateAsClass (function () {
this.list = null;
this.cList = null;
Clazz_instantialize (this, arguments);
}, JS, "Container", JS.Component);
Clazz_defineMethod (c$, "getComponent", 
function (i) {
return this.list.get (i);
}, "~N");
Clazz_defineMethod (c$, "getComponentCount", 
function () {
return (this.list == null ? 0 : this.list.size ());
});
Clazz_defineMethod (c$, "getComponents", 
function () {
if (this.cList == null) {
if (this.list == null) return  new Array (0);
this.cList = this.list.toArray ();
}return this.cList;
});
Clazz_defineMethod (c$, "add", 
function (component) {
return this.addComponent (component);
}, "JS.Component");
Clazz_defineMethod (c$, "addComponent", 
function (component) {
if (this.list == null) this.list =  new JU.Lst ();
this.list.addLast (component);
this.cList = null;
component.parent = this;
return component;
}, "JS.Component");
Clazz_defineMethod (c$, "insertComponent", 
function (component, index) {
if (this.list == null) return this.addComponent (component);
this.list.add (index, component);
this.cList = null;
component.parent = this;
return component;
}, "JS.Component,~N");
Clazz_defineMethod (c$, "remove", 
function (i) {
var c = this.list.removeItemAt (i);
c.parent = null;
this.cList = null;
}, "~N");
Clazz_defineMethod (c$, "removeAll", 
function () {
if (this.list != null) {
for (var i = this.list.size (); --i >= 0; ) this.list.get (i).parent = null;

this.list.clear ();
}this.cList = null;
});
Clazz_defineMethod (c$, "getSubcomponentWidth", 
function () {
return (this.list != null && this.list.size () == 1 ? this.list.get (0).getSubcomponentWidth () : 0);
});
Clazz_defineMethod (c$, "getSubcomponentHeight", 
function () {
return (this.list != null && this.list.size () == 1 ? this.list.get (0).getSubcomponentHeight () : 0);
});
});
Clazz_declarePackage ("JS");
c$ = Clazz_declareType (JS, "LayoutManager");
Clazz_declarePackage ("JS");
Clazz_load (["J.api.SC", "JS.JComponent"], "JS.AbstractButton", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.itemListener = null;
this.applet = null;
this.htmlName = null;
this.selected = false;
this.popupMenu = null;
this.icon = null;
Clazz_instantialize (this, arguments);
}, JS, "AbstractButton", JS.JComponent, J.api.SC);
Clazz_makeConstructor (c$, 
function (type) {
Clazz_superConstructor (this, JS.AbstractButton, [type]);
this.enabled = true;
}, "~S");
Clazz_overrideMethod (c$, "setSelected", 
function (selected) {
this.selected = selected;
{
SwingController.setSelected(this);
}}, "~B");
Clazz_overrideMethod (c$, "isSelected", 
function () {
return this.selected;
});
Clazz_overrideMethod (c$, "addItemListener", 
function (listener) {
this.itemListener = listener;
}, "~O");
Clazz_overrideMethod (c$, "getIcon", 
function () {
return this.icon;
});
Clazz_overrideMethod (c$, "setIcon", 
function (icon) {
this.icon = icon;
}, "~O");
Clazz_overrideMethod (c$, "init", 
function (text, icon, actionCommand, popupMenu) {
this.text = text;
this.icon = icon;
this.actionCommand = actionCommand;
this.popupMenu = popupMenu;
{
SwingController.initMenuItem(this);
}}, "~S,~O,~S,J.api.SC");
Clazz_defineMethod (c$, "getTopPopupMenu", 
function () {
return this.popupMenu;
});
Clazz_defineMethod (c$, "add", 
function (item) {
this.addComponent (item);
}, "J.api.SC");
Clazz_overrideMethod (c$, "insert", 
function (subMenu, index) {
this.insertComponent (subMenu, index);
}, "J.api.SC,~N");
Clazz_overrideMethod (c$, "getPopupMenu", 
function () {
return null;
});
Clazz_defineMethod (c$, "getMenuHTML", 
function () {
var label = (this.icon != null ? this.icon : this.text != null ? this.text : null);
var s = (label == null ? "" : "<li><a>" + label + "</a>" + this.htmlMenuOpener ("ul"));
var n = this.getComponentCount ();
if (n > 0) for (var i = 0; i < n; i++) s += this.getComponent (i).toHTML ();

if (label != null) s += "</ul></li>";
return s;
});
Clazz_defineMethod (c$, "htmlMenuOpener", 
function (type) {
return "<" + type + " id=\"" + this.id + "\"" + (this.enabled ? "" : this.getHtmlDisabled ()) + ">";
}, "~S");
Clazz_defineMethod (c$, "getHtmlDisabled", 
function () {
return " disabled=\"disabled\"";
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.TableColumn"], "JS.AbstractTableModel", null, function () {
Clazz_declareInterface (JS, "AbstractTableModel", JS.TableColumn);
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.ButtonGroup", ["JS.Component"], function () {
c$ = Clazz_decorateAsClass (function () {
this.id = null;
Clazz_instantialize (this, arguments);
}, JS, "ButtonGroup");
Clazz_makeConstructor (c$, 
function () {
this.id = JS.Component.newID ("bg");
});
Clazz_defineMethod (c$, "add", 
function (item) {
(item).htmlName = this.id;
}, "J.api.SC");
});
Clazz_declarePackage ("JS");
c$ = Clazz_decorateAsClass (function () {
this.component = null;
this.colspan = 0;
this.rowspan = 0;
this.textAlign = 0;
this.c = null;
Clazz_instantialize (this, arguments);
}, JS, "Cell");
Clazz_makeConstructor (c$, 
function (btn, c) {
this.component = btn;
this.colspan = c.gridwidth;
this.rowspan = c.gridheight;
this.c = c;
}, "JS.JComponent,JS.GridBagConstraints");
Clazz_defineMethod (c$, "toHTML", 
function (id) {
var style = this.c.getStyle (false);
return "<td id='" + id + "' " + (this.colspan < 2 ? "" : "colspan='" + this.colspan + "' ") + style + "><span " + this.c.getStyle (true) + ">" + this.component.toHTML () + "</span></td>";
}, "~S");
Clazz_declarePackage ("JS");
Clazz_declareInterface (JS, "ColumnSelectionModel");
Clazz_declarePackage ("JS");
Clazz_declareInterface (JS, "Document");
Clazz_declarePackage ("JS");
Clazz_load (["JS.LayoutManager"], "JS.FlowLayout", null, function () {
c$ = Clazz_declareType (JS, "FlowLayout", JS.LayoutManager);
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.Grid", ["JU.AU", "$.SB", "JS.Cell"], function () {
c$ = Clazz_decorateAsClass (function () {
this.nrows = 0;
this.ncols = 0;
this.grid = null;
this.renderer = null;
Clazz_instantialize (this, arguments);
}, JS, "Grid");
Clazz_makeConstructor (c$, 
function (rows, cols) {
this.grid =  Clazz_newArray (0, 0, null);
}, "~N,~N");
Clazz_defineMethod (c$, "add", 
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
Clazz_defineMethod (c$, "toHTML", 
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
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.GridBagConstraints", ["JS.Insets"], function () {
c$ = Clazz_decorateAsClass (function () {
this.gridx = 0;
this.gridy = 0;
this.gridwidth = 0;
this.gridheight = 0;
this.weightx = 0;
this.weighty = 0;
this.anchor = 0;
this.fill = 0;
this.insets = null;
this.ipadx = 0;
this.ipady = 0;
Clazz_instantialize (this, arguments);
}, JS, "GridBagConstraints");
Clazz_makeConstructor (c$, 
function (gridx, gridy, gridwidth, gridheight, weightx, weighty, anchor, fill, insets, ipadx, ipady) {
this.gridx = gridx;
this.gridy = gridy;
this.gridwidth = gridwidth;
this.gridheight = gridheight;
this.weightx = weightx;
this.weighty = weighty;
this.anchor = anchor;
this.fill = fill;
if (insets == null) insets =  new JS.Insets (0, 0, 0, 0);
this.insets = insets;
this.ipadx = ipadx;
this.ipady = ipady;
}, "~N,~N,~N,~N,~N,~N,~N,~N,JS.Insets,~N,~N");
Clazz_defineMethod (c$, "getStyle", 
function (margins) {
return "style='" + (margins ? "margin:" + this.insets.top + "px " + (this.ipady + this.insets.right) + "px " + this.insets.bottom + "px " + (this.ipadx + this.insets.left) + "px;" : "text-align:" + (this.anchor == 13 ? "right" : this.anchor == 17 ? "left" : "center")) + "'";
}, "~B");
Clazz_defineStatics (c$,
"NONE", 0,
"CENTER", 10,
"WEST", 17,
"EAST", 13);
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.LayoutManager"], "JS.GridBagLayout", null, function () {
c$ = Clazz_declareType (JS, "GridBagLayout", JS.LayoutManager);
});
Clazz_declarePackage ("JS");
c$ = Clazz_decorateAsClass (function () {
this.top = 0;
this.left = 0;
this.bottom = 0;
this.right = 0;
Clazz_instantialize (this, arguments);
}, JS, "Insets");
Clazz_makeConstructor (c$, 
function (top, left, bottom, right) {
this.top = top;
this.left = left;
this.bottom = bottom;
this.right = right;
}, "~N,~N,~N,~N");
Clazz_declarePackage ("JS");
Clazz_load (["JS.AbstractButton"], "JS.JButton", ["JU.SB"], function () {
c$ = Clazz_declareType (JS, "JButton", JS.AbstractButton);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.JButton, ["btnJB"]);
});
Clazz_overrideMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<input type=button id='" + this.id + "' class='JButton' style='" + this.getCSSstyle (80, 0) + "' onclick='SwingController.click(this)' value='" + this.text + "'/>");
return sb.toString ();
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.AbstractButton"], "JS.JCheckBox", null, function () {
c$ = Clazz_declareType (JS, "JCheckBox", JS.AbstractButton);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.JCheckBox, ["chkJCB"]);
});
Clazz_overrideMethod (c$, "toHTML", 
function () {
var s = "<label><input type=checkbox id='" + this.id + "' class='JCheckBox' style='" + this.getCSSstyle (0, 0) + "' " + (this.selected ? "checked='checked' " : "") + "onclick='SwingController.click(this)'>" + this.text + "</label>";
return s;
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JMenuItem"], "JS.JCheckBoxMenuItem", null, function () {
c$ = Clazz_declareType (JS, "JCheckBoxMenuItem", JS.JMenuItem);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.JCheckBoxMenuItem, ["chk", 2]);
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.AbstractButton"], "JS.JComboBox", ["JU.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.info = null;
this.selectedIndex = 0;
Clazz_instantialize (this, arguments);
}, JS, "JComboBox", JS.AbstractButton);
Clazz_makeConstructor (c$, 
function (info) {
Clazz_superConstructor (this, JS.JComboBox, ["cmbJCB"]);
this.info = info;
}, "~A");
Clazz_defineMethod (c$, "setSelectedIndex", 
function (i) {
this.selectedIndex = i;
{
SwingController.setSelectedIndex(this);
}}, "~N");
Clazz_defineMethod (c$, "getSelectedIndex", 
function () {
return this.selectedIndex;
});
Clazz_defineMethod (c$, "getSelectedItem", 
function () {
return (this.selectedIndex < 0 ? null : this.info[this.selectedIndex]);
});
Clazz_overrideMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<select id='" + this.id + "' class='JComboBox' onchange='SwingController.click(this)'>\n");
for (var i = 0; i < this.info.length; i++) sb.append ("\n<option class='JComboBox_option'" + (i == this.selectedIndex ? "selected" : "") + ">" + this.info[i] + "</option>");

sb.append ("\n</select>\n");
return sb.toString ();
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.Container"], "JS.JComponent", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.autoScrolls = false;
this.actionCommand = null;
this.actionListener = null;
Clazz_instantialize (this, arguments);
}, JS, "JComponent", JS.Container);
Clazz_defineMethod (c$, "setAutoscrolls", 
function (b) {
this.autoScrolls = b;
}, "~B");
Clazz_defineMethod (c$, "addActionListener", 
function (listener) {
this.actionListener = listener;
}, "~O");
Clazz_defineMethod (c$, "getActionCommand", 
function () {
return this.actionCommand;
});
Clazz_defineMethod (c$, "setActionCommand", 
function (actionCommand) {
this.actionCommand = actionCommand;
}, "~S");
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JComponent"], "JS.JComponentImp", null, function () {
c$ = Clazz_declareType (JS, "JComponentImp", JS.JComponent);
Clazz_overrideMethod (c$, "toHTML", 
function () {
return null;
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JComponent"], "JS.JContentPane", ["JU.SB"], function () {
c$ = Clazz_declareType (JS, "JContentPane", JS.JComponent);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.JContentPane, ["JCP"]);
});
Clazz_defineMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JContentPane' style='" + this.getCSSstyle (100, 100) + "'>\n");
if (this.list != null) for (var i = 0; i < this.list.size (); i++) sb.append (this.list.get (i).toHTML ());

sb.append ("\n</div>\n");
return sb.toString ();
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.Container"], "JS.JDialog", ["JU.SB", "JS.Color", "$.JContentPane"], function () {
c$ = Clazz_decorateAsClass (function () {
this.defaultWidth = 600;
this.defaultHeight = 300;
this.contentPane = null;
this.title = null;
this.html = null;
this.zIndex = 9000;
this.loc = null;
Clazz_instantialize (this, arguments);
}, JS, "JDialog", JS.Container);
Clazz_defineMethod (c$, "setZIndex", 
function (zIndex) {
this.zIndex = zIndex;
}, "~N");
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.JDialog, ["JD"]);
this.add (this.contentPane =  new JS.JContentPane ());
this.setBackground (JS.Color.get3 (210, 210, 240));
this.contentPane.setBackground (JS.Color.get3 (230, 230, 230));
});
Clazz_defineMethod (c$, "setLocation", 
function (loc) {
this.loc = loc;
}, "~A");
Clazz_defineMethod (c$, "getContentPane", 
function () {
return this.contentPane;
});
Clazz_defineMethod (c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
Clazz_defineMethod (c$, "pack", 
function () {
this.html = null;
});
Clazz_defineMethod (c$, "validate", 
function () {
this.html = null;
});
Clazz_defineMethod (c$, "setVisible", 
function (tf) {
if (tf && this.html == null) this.setDialog ();
Clazz_superCall (this, JS.JDialog, "setVisible", [tf]);
if (tf) this.toFront ();
}, "~B");
Clazz_defineMethod (c$, "dispose", 
function () {
{
{
SwingController.dispose(this);
}}});
Clazz_overrideMethod (c$, "repaint", 
function () {
this.setDialog ();
});
Clazz_defineMethod (c$, "setDialog", 
 function () {
this.html = this.toHTML ();
{
SwingController.setDialog(this);
}});
Clazz_overrideMethod (c$, "toHTML", 
function () {
this.renderWidth = Math.max (this.width, this.getSubcomponentWidth ());
if (this.renderWidth == 0) this.renderWidth = this.defaultWidth;
this.renderHeight = Math.max (this.height, this.contentPane.getSubcomponentHeight ());
if (this.renderHeight == 0) this.renderHeight = this.defaultHeight;
var h = this.renderHeight - 25;
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JDialog' style='" + this.getCSSstyle (0, 0) + "z-index:" + this.zIndex + ";position:relative;top:0px;left:0px;reize:both;'>\n");
sb.append ("\n<div id='" + this.id + "_title' class='JDialogTitle' style='width:100%;height:25px;padding:5px 5px 5px 5px;height:" + 25 + "px'>" + "<span style='text-align:center;'>" + this.title + "</span><span style='position:absolute;text-align:right;right:1px;'>" + "<input type=button id='" + this.id + "_closer' onclick='SwingController.windowClosing(this)' value='x' /></span></div>\n");
sb.append ("\n<div id='" + this.id + "_body' class='JDialogBody' style='width:100%;height:" + h + "px;" + "position: relative;left:0px;top:0px'>\n");
sb.append (this.contentPane.toHTML ());
sb.append ("\n</div></div>\n");
return sb.toString ();
});
Clazz_defineMethod (c$, "toFront", 
function () {
{
SwingController.setFront(this);
}});
Clazz_defineStatics (c$,
"headerHeight", 25);
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JComponent"], "JS.JEditorPane", ["JU.SB"], function () {
c$ = Clazz_declareType (JS, "JEditorPane", JS.JComponent);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.JEditorPane, ["txtJEP"]);
this.text = "";
});
Clazz_overrideMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<textarea type=text id='" + this.id + "' class='JEditorPane' style='" + this.getCSSstyle (98, 98) + "'>" + this.text + "</textarea>");
return sb.toString ();
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JComponent"], "JS.JLabel", ["JU.SB"], function () {
c$ = Clazz_declareType (JS, "JLabel", JS.JComponent);
Clazz_makeConstructor (c$, 
function (text) {
Clazz_superConstructor (this, JS.JLabel, ["lblJL"]);
this.text = text;
}, "~S");
Clazz_overrideMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<span id='" + this.id + "' class='JLabel' style='" + this.getCSSstyle (0, 0) + "'>");
sb.append (this.text);
sb.append ("</span>");
return sb.toString ();
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JMenuItem"], "JS.JMenu", null, function () {
c$ = Clazz_declareType (JS, "JMenu", JS.JMenuItem);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.JMenu, ["mnu", 4]);
});
Clazz_defineMethod (c$, "getItemCount", 
function () {
return this.getComponentCount ();
});
Clazz_defineMethod (c$, "getItem", 
function (i) {
return this.getComponent (i);
}, "~N");
Clazz_overrideMethod (c$, "getPopupMenu", 
function () {
return this;
});
Clazz_overrideMethod (c$, "toHTML", 
function () {
return this.getMenuHTML ();
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.AbstractButton"], "JS.JMenuItem", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.btnType = 0;
Clazz_instantialize (this, arguments);
}, JS, "JMenuItem", JS.AbstractButton);
Clazz_makeConstructor (c$, 
function (text) {
Clazz_superConstructor (this, JS.JMenuItem, ["btn"]);
this.setText (text);
this.btnType = (text == null ? 0 : 1);
}, "~S");
Clazz_makeConstructor (c$, 
function (type, i) {
Clazz_superConstructor (this, JS.JMenuItem, [type]);
this.btnType = i;
}, "~S,~N");
Clazz_overrideMethod (c$, "toHTML", 
function () {
return this.htmlMenuOpener ("li") + (this.text == null ? "" : "<a>" + this.htmlLabel () + "</a>") + "</li>";
});
Clazz_overrideMethod (c$, "getHtmlDisabled", 
function () {
return " class=\"ui-state-disabled\"";
});
Clazz_defineMethod (c$, "htmlLabel", 
 function () {
return (this.btnType == 1 ? this.text : "<label><input id=\"" + this.id + "-" + (this.btnType == 3 ? "r" : "c") + "b\" type=\"" + (this.btnType == 3 ? "radio\" name=\"" + this.htmlName : "checkbox") + "\" " + (this.selected ? "checked" : "") + " />" + this.text + "</label>");
});
Clazz_defineStatics (c$,
"TYPE_SEPARATOR", 0,
"TYPE_BUTTON", 1,
"TYPE_CHECKBOX", 2,
"TYPE_RADIO", 3,
"TYPE_MENU", 4);
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JComponent"], "JS.JPanel", ["JU.SB", "JS.Grid", "$.GridBagConstraints"], function () {
c$ = Clazz_decorateAsClass (function () {
this.grid = null;
this.nElements = 0;
this.last = null;
Clazz_instantialize (this, arguments);
}, JS, "JPanel", JS.JComponent);
Clazz_makeConstructor (c$, 
function (manager) {
Clazz_superConstructor (this, JS.JPanel, ["JP"]);
this.grid =  new JS.Grid (10, 10);
}, "JS.LayoutManager");
Clazz_defineMethod (c$, "add", 
function (btn, c) {
this.last = (++this.nElements == 1 ? btn : null);
if (Clazz_instanceOf (c, String)) {
if (c.equals ("North")) c =  new JS.GridBagConstraints (0, 0, 3, 1, 0, 0, 10, 0, null, 0, 0);
 else if (c.equals ("South")) c =  new JS.GridBagConstraints (0, 2, 3, 1, 0, 0, 10, 0, null, 0, 0);
 else if (c.equals ("East")) c =  new JS.GridBagConstraints (2, 1, 1, 1, 0, 0, 13, 0, null, 0, 0);
 else if (c.equals ("West")) c =  new JS.GridBagConstraints (0, 1, 1, 1, 0, 0, 17, 0, null, 0, 0);
 else c =  new JS.GridBagConstraints (1, 1, 1, 1, 0, 0, 10, 0, null, 0, 0);
}this.grid.add (btn, c);
}, "JS.JComponent,~O");
Clazz_overrideMethod (c$, "toHTML", 
function () {
if (this.last != null) {
this.grid =  new JS.Grid (1, 1);
this.grid.add (this.last,  new JS.GridBagConstraints (0, 0, 1, 1, 0, 0, 10, 0, null, 0, 0));
this.last = null;
}var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JPanel' style='" + this.getCSSstyle (100, 100) + "'>\n");
sb.append ("\n<span id='" + this.id + "_minimizer' style='width:" + this.minWidth + "px;height:" + this.minHeight + "px;'>");
sb.append (this.grid.toHTML (this.id));
sb.append ("</span>");
sb.append ("\n</div>\n");
return sb.toString ();
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.AbstractButton"], "JS.JPopupMenu", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.tainted = true;
Clazz_instantialize (this, arguments);
}, JS, "JPopupMenu", JS.AbstractButton);
Clazz_makeConstructor (c$, 
function (name) {
Clazz_superConstructor (this, JS.JPopupMenu, ["mnu"]);
this.name = name;
}, "~S");
Clazz_defineMethod (c$, "setInvoker", 
function (applet) {
this.applet = applet;
{
SwingController.setMenu(this);
}}, "~O");
Clazz_defineMethod (c$, "show", 
function (applet, x, y) {
if (applet != null) this.tainted = true;
{
SwingController.showMenu(this, x, y);
}}, "JS.Component,~N,~N");
Clazz_defineMethod (c$, "disposeMenu", 
function () {
{
SwingController.disposeMenu(this);
}});
Clazz_overrideMethod (c$, "toHTML", 
function () {
return this.getMenuHTML ();
});
{
{
SwingController.setDraggable(JS.JPopupMenu);
}}});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JMenuItem"], "JS.JRadioButtonMenuItem", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.isRadio = true;
Clazz_instantialize (this, arguments);
}, JS, "JRadioButtonMenuItem", JS.JMenuItem);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.JRadioButtonMenuItem, ["rad", 3]);
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JComponent"], "JS.JScrollPane", ["JU.SB"], function () {
c$ = Clazz_declareType (JS, "JScrollPane", JS.JComponent);
Clazz_makeConstructor (c$, 
function (component) {
Clazz_superConstructor (this, JS.JScrollPane, ["JScP"]);
this.add (component);
}, "JS.JComponent");
Clazz_defineMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JScrollPane' style='" + this.getCSSstyle (98, 98) + "overflow:auto'>\n");
if (this.list != null) {
var c = this.list.get (0);
sb.append (c.toHTML ());
}sb.append ("\n</div>\n");
return sb.toString ();
});
Clazz_overrideMethod (c$, "setMinimumSize", 
function (dimension) {
}, "JS.Dimension");
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JComponent"], "JS.JSplitPane", ["JU.SB", "JS.JComponentImp"], function () {
c$ = Clazz_decorateAsClass (function () {
this.isH = true;
this.split = 1;
this.right = null;
this.left = null;
Clazz_instantialize (this, arguments);
}, JS, "JSplitPane", JS.JComponent);
Clazz_makeConstructor (c$, 
function (split) {
Clazz_superConstructor (this, JS.JSplitPane, ["JSpP"]);
this.split = split;
this.isH = (split == 1);
}, "~N");
Clazz_defineMethod (c$, "setRightComponent", 
function (r) {
this.right =  new JS.JComponentImp (null);
this.right.add (r);
}, "JS.JComponent");
Clazz_defineMethod (c$, "setLeftComponent", 
function (l) {
this.left =  new JS.JComponentImp (null);
this.left.add (l);
}, "JS.JComponent");
Clazz_defineMethod (c$, "getSubcomponentWidth", 
function () {
var w = this.width;
if (w == 0) {
var wleft = this.left.getSubcomponentWidth ();
var wright = this.right.getSubcomponentWidth ();
if (wleft > 0 && wright > 0) {
if (this.isH) w = wleft + wright;
 else w = Math.max (wleft, wright);
}}return w;
});
Clazz_defineMethod (c$, "getSubcomponentHeight", 
function () {
var h = this.height;
if (h == 0) {
var hleft = this.left.getSubcomponentHeight ();
var hright = this.right.getSubcomponentHeight ();
if (hleft > 0 && hright > 0) {
if (this.isH) h = Math.max (hleft, hright);
 else h = hleft + hright;
}}return h;
});
Clazz_defineMethod (c$, "toHTML", 
function () {
if (this.left == null || this.right == null) return "";
var isH = (this.split == 1);
if (this.width == 0) this.width = this.getSubcomponentWidth ();
if (this.height == 0) this.height = this.getSubcomponentHeight ();
var sb =  new JU.SB ();
sb.append ("<div id='" + this.id + "' class='JSplitPane' style='" + this.getCSSstyle (100, 100) + "'>");
if (isH) sb.append ("<div id='" + this.id + "_left' style='width:50%;height:100%;position:absolute;top:0%;left:0%'>");
 else sb.append ("<div id='" + this.id + "_top' style='width:100%;height:50%;position:absolute;top:0%;left:0%'>");
sb.append (this.left.getComponents ()[0].toHTML ());
if (isH) sb.append ("</div><div id='" + this.id + "_right' style='width:50%;height:100%;position:absolute;top:0%;left:50%'>");
 else sb.append ("</div><div id='" + this.id + "_bottom' style='width:100%;height:50%;position:absolute;top:50%;left:0%'>");
sb.append (this.right.getComponents ()[0].toHTML ());
sb.append ("</div></div>\n");
return sb.toString ();
});
Clazz_defineStatics (c$,
"HORIZONTAL_SPLIT", 1);
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.ColumnSelectionModel", "$.JComponent", "$.ListSelectionModel"], "JS.JTable", ["JU.BS", "$.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.tableModel = null;
this.bsSelectedCells = null;
this.bsSelectedRows = null;
this.rowSelectionAllowed = false;
this.cellSelectionEnabled = false;
this.selectionListener = null;
Clazz_instantialize (this, arguments);
}, JS, "JTable", JS.JComponent, [JS.ListSelectionModel, JS.ColumnSelectionModel]);
Clazz_makeConstructor (c$, 
function (tableModel) {
Clazz_superConstructor (this, JS.JTable, ["JT"]);
this.tableModel = tableModel;
this.bsSelectedCells =  new JU.BS ();
this.bsSelectedRows =  new JU.BS ();
}, "JS.AbstractTableModel");
Clazz_overrideMethod (c$, "getSelectionModel", 
function () {
return this;
});
Clazz_defineMethod (c$, "getColumnModel", 
function () {
return this;
});
Clazz_defineMethod (c$, "setPreferredScrollableViewportSize", 
function (dimension) {
this.width = dimension.width;
this.height = dimension.height;
}, "JS.Dimension");
Clazz_defineMethod (c$, "clearSelection", 
function () {
this.bsSelectedCells.clearAll ();
this.bsSelectedRows.clearAll ();
});
Clazz_defineMethod (c$, "setRowSelectionAllowed", 
function (b) {
this.rowSelectionAllowed = b;
}, "~B");
Clazz_defineMethod (c$, "setRowSelectionInterval", 
function (i, j) {
this.bsSelectedRows.clearAll ();
this.bsSelectedRows.setBits (i, j);
this.bsSelectedCells.clearAll ();
}, "~N,~N");
Clazz_defineMethod (c$, "setCellSelectionEnabled", 
function (enabled) {
this.cellSelectionEnabled = enabled;
}, "~B");
Clazz_overrideMethod (c$, "addListSelectionListener", 
function (listener) {
this.selectionListener = listener;
}, "~O");
Clazz_overrideMethod (c$, "getColumn", 
function (i) {
return this.tableModel.getColumn (i);
}, "~N");
Clazz_overrideMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<table id='" + this.id + "_table' class='JTable' >");
this.tableModel.toHTML (sb, this.id, this.bsSelectedRows);
sb.append ("\n</table>\n");
return sb.toString ();
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.JComponent"], "JS.JTextField", ["JU.SB"], function () {
c$ = Clazz_declareType (JS, "JTextField", JS.JComponent);
Clazz_makeConstructor (c$, 
function (value) {
Clazz_superConstructor (this, JS.JTextField, ["txtJT"]);
this.text = value;
}, "~S");
Clazz_overrideMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<input type=text id='" + this.id + "' class='JTextField' style='" + this.getCSSstyle (0, 0) + "' value='" + this.text + "' onkeyup	=SwingController.click(this,event)	>");
return sb.toString ();
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.Document", "$.JComponent"], "JS.JTextPane", ["JU.SB"], function () {
c$ = Clazz_declareType (JS, "JTextPane", JS.JComponent, JS.Document);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.JTextPane, ["txtJTP"]);
this.text = "";
});
Clazz_defineMethod (c$, "getDocument", 
function () {
return this;
});
Clazz_overrideMethod (c$, "insertString", 
function (i, s, object) {
i = Math.min (i, this.text.length);
this.text = this.text.substring (0, i) + s + this.text.substring (i);
}, "~N,~S,~O");
Clazz_overrideMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<textarea type=text id='" + this.id + "' class='JTextPane' style='" + this.getCSSstyle (98, 98) + "'>" + this.text + "</textarea>");
return sb.toString ();
});
});
Clazz_declarePackage ("JS");
Clazz_declareInterface (JS, "ListSelectionModel");
Clazz_declarePackage ("JS");
c$ = Clazz_declareType (JS, "SwingConstants");
Clazz_defineStatics (c$,
"LEFT", 2,
"CENTER", 0,
"RIGHT", 4);
Clazz_declarePackage ("JS");
Clazz_declareInterface (JS, "TableCellRenderer");
Clazz_declarePackage ("JS");
Clazz_declareInterface (JS, "TableColumn");
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
