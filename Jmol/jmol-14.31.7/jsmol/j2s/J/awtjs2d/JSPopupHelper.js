Clazz.declarePackage ("J.awtjs2d");
Clazz.load (["J.popup.PopupHelper"], "J.awtjs2d.JSPopupHelper", ["JS.ButtonGroup", "$.JCheckBoxMenuItem", "$.JMenu", "$.JMenuItem", "$.JPopupMenu", "$.JRadioButtonMenuItem"], function () {
c$ = Clazz.decorateAsClass (function () {
this.popup = null;
this.buttonGroup = null;
Clazz.instantialize (this, arguments);
}, J.awtjs2d, "JSPopupHelper", null, J.popup.PopupHelper);
Clazz.makeConstructor (c$, 
function (popup) {
this.popup = popup;
}, "J.popup.GenericPopup");
Clazz.overrideMethod (c$, "menuCreatePopup", 
function (name, applet) {
var j =  new JS.JPopupMenu (name);
j.setInvoker (applet);
return j;
}, "~S,~O");
Clazz.overrideMethod (c$, "getMenu", 
function (name) {
var jm =  new JS.JMenu ();
jm.setName (name);
return jm;
}, "~S");
Clazz.overrideMethod (c$, "getMenuItem", 
function (text) {
return  new JS.JMenuItem (text);
}, "~S");
Clazz.overrideMethod (c$, "getRadio", 
function (name) {
return  new JS.JRadioButtonMenuItem ();
}, "~S");
Clazz.overrideMethod (c$, "getCheckBox", 
function (name) {
return  new JS.JCheckBoxMenuItem ();
}, "~S");
Clazz.overrideMethod (c$, "menuAddButtonGroup", 
function (item) {
if (item == null) {
this.buttonGroup = null;
return;
}if (this.buttonGroup == null) this.buttonGroup =  new JS.ButtonGroup ();
this.buttonGroup.add (item);
}, "J.api.SC");
Clazz.overrideMethod (c$, "getItemType", 
function (m) {
return (m).btnType;
}, "J.api.SC");
Clazz.overrideMethod (c$, "menuInsertSubMenu", 
function (menu, subMenu, index) {
(subMenu).setParent (menu);
}, "J.api.SC,J.api.SC,~N");
Clazz.overrideMethod (c$, "getSwingComponent", 
function (component) {
return component;
}, "~O");
Clazz.overrideMethod (c$, "menuClearListeners", 
function (menu) {
if (menu != null) (menu).disposeMenu ();
}, "J.api.SC");
Clazz.defineMethod (c$, "itemStateChanged", 
function (e) {
this.popup.menuCheckBoxCallback (e.getSource ());
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "actionPerformed", 
function (e) {
this.popup.menuClickCallback (e.getSource (), e.getActionCommand ());
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "getButtonGroup", 
function () {
return this.buttonGroup;
});
Clazz.defineMethod (c$, "handleEvent", 
function (e) {
var type = "" + e.getID ();
if (type === "mouseenter") this.mouseEntered (e);
 else if (type === "mouseleave") this.mouseExited (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseEntered", 
function (e) {
var jmi = e.getSource ();
this.popup.menuFocusCallback (jmi.getName (), jmi.getActionCommand (), true);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseExited", 
function (e) {
var jmi = e.getSource ();
this.popup.menuFocusCallback (jmi.getName (), jmi.getActionCommand (), false);
}, "java.awt.event.MouseEvent");
});
