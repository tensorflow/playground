Clazz.declarePackage ("J.popup");
Clazz.load (["J.api.GenericMenuInterface", "java.util.Hashtable", "JU.Lst"], "J.popup.GenericPopup", ["java.util.StringTokenizer", "JU.PT", "$.SB", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.helper = null;
this.strMenuStructure = null;
this.allowSignedFeatures = false;
this.isJS = false;
this.isApplet = false;
this.isSigned = false;
this.isWebGL = false;
this.thisx = 0;
this.thisy = 0;
this.isTainted = true;
this.menuName = null;
this.popupMenu = null;
this.thisPopup = null;
this.htCheckbox = null;
this.buttonGroup = null;
this.currentMenuItemId = null;
this.htMenus = null;
this.SignedOnly = null;
this.updatingForShow = false;
Clazz.instantialize (this, arguments);
}, J.popup, "GenericPopup", null, J.api.GenericMenuInterface);
Clazz.prepareFields (c$, function () {
this.htCheckbox =  new java.util.Hashtable ();
this.htMenus =  new java.util.Hashtable ();
this.SignedOnly =  new JU.Lst ();
});
Clazz.defineMethod (c$, "appCheckItem", 
function (item, newMenu) {
}, "~S,J.api.SC");
Clazz.defineMethod (c$, "appCheckSpecialMenu", 
function (item, subMenu, word) {
}, "~S,J.api.SC,~S");
Clazz.defineMethod (c$, "initSwing", 
function (title, bundle, applet, isJS, isSigned, isWebGL) {
this.isJS = isJS;
this.isApplet = (applet != null);
this.isSigned = isSigned;
this.isWebGL = isWebGL;
this.allowSignedFeatures = (!this.isApplet || isSigned);
this.menuName = title;
this.popupMenu = this.helper.menuCreatePopup (title, applet);
this.thisPopup = this.popupMenu;
this.htMenus.put (title, this.popupMenu);
this.addMenuItems ("", title, this.popupMenu, bundle);
try {
this.jpiUpdateComputedMenus ();
} catch (e) {
if (Clazz.exceptionOf (e, NullPointerException)) {
} else {
throw e;
}
}
}, "~S,J.popup.PopupResource,~O,~B,~B,~B");
Clazz.defineMethod (c$, "addMenuItems", 
function (parentId, key, menu, popupResourceBundle) {
var id = parentId + "." + key;
var value = popupResourceBundle.getStructure (key);
if (JU.Logger.debugging) JU.Logger.debug (id + " --- " + value);
if (value == null) {
this.menuCreateItem (menu, "#" + key, "", "");
return;
}var st =  new java.util.StringTokenizer (value);
var item;
while (value.indexOf ("@") >= 0) {
var s = "";
while (st.hasMoreTokens ()) s += " " + ((item = st.nextToken ()).startsWith ("@") ? popupResourceBundle.getStructure (item) : item);

value = s.substring (1);
st =  new java.util.StringTokenizer (value);
}
while (st.hasMoreTokens ()) {
item = st.nextToken ();
if (!this.checkKey (item)) continue;
if ("-".equals (item)) {
this.menuAddSeparator (menu);
this.helper.menuAddButtonGroup (null);
continue;
}var label = popupResourceBundle.getWord (item);
var newItem = null;
var script = "";
var isCB = false;
label = this.appFixLabel (label == null ? item : label);
if (label.equals ("null")) {
continue;
}if (item.indexOf ("Menu") >= 0) {
if (item.indexOf ("more") < 0) this.helper.menuAddButtonGroup (null);
var subMenu = this.menuNewSubMenu (label, id + "." + item);
this.menuAddSubMenu (menu, subMenu);
if (item.indexOf ("Computed") < 0) this.addMenuItems (id, item, subMenu, popupResourceBundle);
this.appCheckSpecialMenu (item, subMenu, label);
newItem = subMenu;
} else if (item.endsWith ("Checkbox") || (isCB = (item.endsWith ("CB") || item.endsWith ("RD")))) {
script = popupResourceBundle.getStructure (item);
var basename = item.substring (0, item.length - (!isCB ? 8 : 2));
var isRadio = (isCB && item.endsWith ("RD"));
if (script == null || script.length == 0 && !isRadio) script = "set " + basename + " T/F";
newItem = this.menuCreateCheckboxItem (menu, label, basename + ":" + script, id + "." + item, false, isRadio);
this.rememberCheckbox (basename, newItem);
if (isRadio) this.helper.menuAddButtonGroup (newItem);
} else {
script = popupResourceBundle.getStructure (item);
if (script == null) script = item;
newItem = this.menuCreateItem (menu, label, script, id + "." + item);
}this.htMenus.put (item, newItem);
if (item.startsWith ("SIGNED")) {
this.SignedOnly.addLast (newItem);
if (!this.allowSignedFeatures) this.menuEnable (newItem, false);
}this.appCheckItem (item, newItem);
}
}, "~S,~S,J.api.SC,J.popup.PopupResource");
Clazz.defineMethod (c$, "updateSignedAppletItems", 
function () {
for (var i = this.SignedOnly.size (); --i >= 0; ) this.menuEnable (this.SignedOnly.get (i), this.allowSignedFeatures);

});
Clazz.defineMethod (c$, "checkKey", 
 function (key) {
return (key.indexOf (this.isApplet ? "JAVA" : "APPLET") < 0 && (!this.isWebGL || key.indexOf ("NOGL") < 0));
}, "~S");
Clazz.defineMethod (c$, "rememberCheckbox", 
 function (key, checkboxMenuItem) {
this.htCheckbox.put (key + "::" + this.htCheckbox.size (), checkboxMenuItem);
}, "~S,J.api.SC");
Clazz.defineMethod (c$, "updateButton", 
function (b, entry, script) {
var ret =  Clazz.newArray (-1, [entry]);
var icon = this.getEntryIcon (ret);
entry = ret[0];
b.init (entry, icon, script, this.thisPopup);
this.isTainted = true;
}, "J.api.SC,~S,~S");
Clazz.defineMethod (c$, "getEntryIcon", 
function (ret) {
var entry = ret[0];
if (!entry.startsWith ("<")) return null;
var pt = entry.indexOf (">");
ret[0] = entry.substring (pt + 1);
var fileName = entry.substring (1, pt);
return this.getImageIcon (fileName);
}, "~A");
Clazz.defineMethod (c$, "addMenuItem", 
function (menuItem, entry) {
return this.menuCreateItem (menuItem, entry, "", null);
}, "J.api.SC,~S");
Clazz.defineMethod (c$, "menuSetLabel", 
function (m, entry) {
m.setText (entry);
this.isTainted = true;
}, "J.api.SC,~S");
Clazz.defineMethod (c$, "menuClickCallback", 
function (source, script) {
this.doMenuClickCallback (source, script);
}, "J.api.SC,~S");
Clazz.defineMethod (c$, "doMenuClickCallback", 
function (source, script) {
this.appRestorePopupMenu ();
if (script == null || script.length == 0) return;
if (script.equals ("MAIN")) {
this.show (this.thisx, this.thisy, true);
return;
}var id = this.menuGetId (source);
if (id != null) {
script = this.getScriptForCallback (source, id, script);
this.currentMenuItemId = id;
}if (script != null) this.appRunScript (script);
}, "J.api.SC,~S");
Clazz.defineMethod (c$, "menuCheckBoxCallback", 
function (source) {
this.doMenuCheckBoxCallback (source);
}, "J.api.SC");
Clazz.defineMethod (c$, "doMenuCheckBoxCallback", 
function (source) {
this.appRestorePopupMenu ();
var isSelected = source.isSelected ();
var what = source.getActionCommand ();
this.runCheckBoxScript (source, what, isSelected);
this.appUpdateSpecialCheckBoxValue (source, what, isSelected);
this.isTainted = true;
var id = this.menuGetId (source);
if (id != null) {
this.currentMenuItemId = id;
}}, "J.api.SC");
Clazz.defineMethod (c$, "runCheckBoxScript", 
 function (item, what, TF) {
if (!item.isEnabled ()) return;
if (what.indexOf ("##") < 0) {
var pt = what.indexOf (":");
if (pt < 0) {
JU.Logger.error ("check box " + item + " IS " + what);
return;
}var basename = what.substring (0, pt);
if (this.appRunSpecialCheckBox (item, basename, what, TF)) return;
what = what.substring (pt + 1);
if ((pt = what.indexOf ("|")) >= 0) what = (TF ? what.substring (0, pt) : what.substring (pt + 1)).trim ();
what = JU.PT.rep (what, "T/F", (TF ? " TRUE" : " FALSE"));
}this.appRunScript (what);
}, "J.api.SC,~S,~B");
Clazz.defineMethod (c$, "menuCreateItem", 
function (menu, entry, script, id) {
var item = this.helper.getMenuItem (entry);
item.addActionListener (this.helper);
return this.newMenuItem (item, menu, entry, script, id);
}, "J.api.SC,~S,~S,~S");
Clazz.defineMethod (c$, "menuCreateCheckboxItem", 
function (menu, entry, basename, id, state, isRadio) {
var jmi = (isRadio ? this.helper.getRadio (entry) : this.helper.getCheckBox (entry));
jmi.setSelected (state);
jmi.addItemListener (this.helper);
return this.newMenuItem (jmi, menu, entry, basename, id);
}, "J.api.SC,~S,~S,~S,~B,~B");
Clazz.defineMethod (c$, "menuAddSeparator", 
function (menu) {
menu.add (this.helper.getMenuItem (null));
this.isTainted = true;
}, "J.api.SC");
Clazz.defineMethod (c$, "menuNewSubMenu", 
function (entry, id) {
var jm = this.helper.getMenu (entry);
jm.addMouseListener (this.helper);
this.updateButton (jm, entry, null);
jm.setName (id);
jm.setAutoscrolls (true);
return jm;
}, "~S,~S");
Clazz.defineMethod (c$, "menuRemoveAll", 
function (menu, indexFrom) {
if (indexFrom <= 0) menu.removeAll ();
 else for (var i = menu.getComponentCount (); --i >= indexFrom; ) menu.remove (i);

this.isTainted = true;
}, "J.api.SC,~N");
Clazz.defineMethod (c$, "newMenuItem", 
 function (item, menu, text, script, id) {
this.updateButton (item, text, script);
item.addMouseListener (this.helper);
item.setName (id == null ? menu.getName () + "." : id);
this.menuAddItem (menu, item);
return item;
}, "J.api.SC,J.api.SC,~S,~S,~S");
Clazz.defineMethod (c$, "setText", 
function (item, text) {
var m = this.htMenus.get (item);
if (m != null) m.setText (text);
return m;
}, "~S,~S");
Clazz.defineMethod (c$, "menuAddItem", 
 function (menu, item) {
menu.add (item);
this.isTainted = true;
}, "J.api.SC,J.api.SC");
Clazz.defineMethod (c$, "menuAddSubMenu", 
function (menu, subMenu) {
subMenu.addMouseListener (this.helper);
this.menuAddItem (menu, subMenu);
}, "J.api.SC,J.api.SC");
Clazz.defineMethod (c$, "menuEnable", 
function (component, enable) {
if (component == null || component.isEnabled () == enable) return;
component.setEnabled (enable);
}, "J.api.SC,~B");
Clazz.defineMethod (c$, "menuGetId", 
function (menu) {
return menu.getName ();
}, "J.api.SC");
Clazz.defineMethod (c$, "menuSetAutoscrolls", 
function (menu) {
menu.setAutoscrolls (true);
this.isTainted = true;
}, "J.api.SC");
Clazz.defineMethod (c$, "menuGetListPosition", 
function (item) {
var p = item.getParent ();
var i;
for (i = p.getComponentCount (); --i >= 0; ) if (this.helper.getSwingComponent (p.getComponent (i)) === item) break;

return i;
}, "J.api.SC");
Clazz.defineMethod (c$, "show", 
function (x, y, doPopup) {
this.appUpdateForShow ();
this.updateCheckBoxesForShow ();
if (doPopup) this.menuShowPopup (this.popupMenu, this.thisx, this.thisy);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "updateCheckBoxesForShow", 
 function () {
for (var entry, $entry = this.htCheckbox.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var item = entry.getValue ();
var basename = key.substring (0, key.indexOf (":"));
var b = this.appGetBooleanProperty (basename);
this.updatingForShow = true;
if (item.isSelected () != b) {
item.setSelected (b);
this.isTainted = true;
}this.updatingForShow = false;
}
});
Clazz.overrideMethod (c$, "jpiGetMenuAsString", 
function (title) {
this.appUpdateForShow ();
var pt = title.indexOf ("|");
if (pt >= 0) {
var type = title.substring (pt);
title = title.substring (0, pt);
if (type.indexOf ("current") >= 0) {
var sb =  new JU.SB ();
var menu = this.htMenus.get (this.menuName);
this.menuGetAsText (sb, 0, menu, "PopupMenu");
return sb.toString ();
}}return this.appGetMenuAsString (title);
}, "~S");
Clazz.defineMethod (c$, "appGetMenuAsString", 
function (title) {
return null;
}, "~S");
Clazz.defineMethod (c$, "menuGetAsText", 
 function (sb, level, menu, menuName) {
var name = menuName;
var subMenus = menu.getComponents ();
var flags = null;
var script = null;
var text = null;
var key = 'S';
for (var i = 0; i < subMenus.length; i++) {
var source = this.helper.getSwingComponent (subMenus[i]);
var type = this.helper.getItemType (source);
switch (type) {
case 4:
key = 'M';
name = source.getName ();
flags = "enabled:" + source.isEnabled ();
text = source.getText ();
script = null;
break;
case 0:
key = 'S';
flags = script = text = null;
break;
default:
key = 'I';
flags = "enabled:" + source.isEnabled ();
if (type == 2 || type == 3) flags += ";checked:" + source.isSelected ();
script = this.getScriptForCallback (source, source.getName (), source.getActionCommand ());
name = source.getName ();
text = source.getText ();
break;
}
J.popup.GenericPopup.addItemText (sb, key, level, name, text, script, flags);
if (type == 2) this.menuGetAsText (sb, level + 1, this.helper.getSwingComponent (source.getPopupMenu ()), name);
}
}, "JU.SB,~N,J.api.SC,~S");
c$.addItemText = Clazz.defineMethod (c$, "addItemText", 
 function (sb, type, level, name, label, script, flags) {
sb.appendC (type).appendI (level).appendC ('\t').append (name);
if (label == null) {
sb.append (".\n");
return;
}sb.append ("\t").append (label).append ("\t").append (script == null || script.length == 0 ? "-" : script).append ("\t").append (flags).append ("\n");
}, "JU.SB,~S,~N,~S,~S,~S,~S");
c$.convertToMegabytes = Clazz.defineMethod (c$, "convertToMegabytes", 
function (num) {
if (num <= 9223372036854251519) num += 524288;
return (Clazz.doubleToInt (num / (1048576)));
}, "~N");
});
