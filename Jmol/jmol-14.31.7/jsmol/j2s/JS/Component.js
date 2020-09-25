Clazz.declarePackage ("JS");
Clazz.load (null, "JS.Component", ["JU.CU"], function () {
c$ = Clazz.decorateAsClass (function () {
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
Clazz.instantialize (this, arguments);
}, JS, "Component");
Clazz.defineMethod (c$, "setParent", 
function (p) {
this.parent = p;
}, "~O");
Clazz.makeConstructor (c$, 
function (type) {
this.id = JS.Component.newID (type);
if (type == null) return;
{
SwingController.register(this, type);
}}, "~S");
c$.newID = Clazz.defineMethod (c$, "newID", 
function (type) {
return type + ("" + Math.random ()).substring (3, 10);
}, "~S");
Clazz.defineMethod (c$, "setBackground", 
function (color) {
this.bgcolor = color;
}, "javajs.api.GenericColor");
Clazz.defineMethod (c$, "setText", 
function (text) {
this.text = text;
{
SwingController.setText(this);
}}, "~S");
Clazz.defineMethod (c$, "setName", 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "setPreferredSize", 
function (dimension) {
this.width = dimension.width;
this.height = dimension.height;
}, "JS.Dimension");
Clazz.defineMethod (c$, "addMouseListener", 
function (listener) {
this.mouseListener = listener;
}, "~O");
Clazz.defineMethod (c$, "getText", 
function () {
return this.text;
});
Clazz.defineMethod (c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz.defineMethod (c$, "setEnabled", 
function (enabled) {
this.enabled = enabled;
{
SwingController.setEnabled(this);
}}, "~B");
Clazz.defineMethod (c$, "isVisible", 
function () {
return this._visible;
});
Clazz.defineMethod (c$, "setVisible", 
function (visible) {
this._visible = visible;
{
SwingController.setVisible(this);
}}, "~B");
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "setMinimumSize", 
function (d) {
this.minWidth = d.width;
this.minHeight = d.height;
}, "JS.Dimension");
Clazz.defineMethod (c$, "getSubcomponentWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getSubcomponentHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getCSSstyle", 
function (defaultPercentW, defaultPercentH) {
var width = (this.renderWidth > 0 ? this.renderWidth : this.getSubcomponentWidth ());
var height = (this.renderHeight > 0 ? this.renderHeight : this.getSubcomponentHeight ());
return (width > 0 ? "width:" + width + "px;" : defaultPercentW > 0 ? "width:" + defaultPercentW + "%;" : "") + (height > 0 ? "height:" + height + "px;" : defaultPercentH > 0 ? "height:" + defaultPercentH + "%;" : "") + (this.bgcolor == null ? "" : "background-color:" + JU.CU.toCSSString (this.bgcolor) + ";");
}, "~N,~N");
Clazz.defineMethod (c$, "repaint", 
function () {
});
});
