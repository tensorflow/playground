Clazz.declarePackage ("JSV.popup");
Clazz.load (["J.popup.GenericPopup"], "JSV.popup.JSVGenericPopup", ["JU.PT", "JSV.common.JSVersion", "$.JSViewer", "JSV.popup.JSVPopupResourceBundle"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.updateMode = 0;
this.cnmrPeaks = null;
this.hnmrPeaks = null;
this.aboutComputedMenuBaseCount = 0;
this.allowMenu = false;
this.zoomEnabled = false;
this.pd = null;
this.thisJsvp = null;
Clazz.instantialize (this, arguments);
}, JSV.popup, "JSVGenericPopup", J.popup.GenericPopup);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.popup.JSVGenericPopup, []);
});
Clazz.defineMethod (c$, "initialize", 
function (viewer, bundle, title) {
this.vwr = viewer;
this.initSwing (title, bundle, viewer.getApplet (), JSV.common.JSViewer.isJS, viewer.isSigned, false);
}, "JSV.common.JSViewer,J.popup.PopupResource,~S");
Clazz.overrideMethod (c$, "jpiDispose", 
function () {
this.helper.menuClearListeners (this.popupMenu);
this.popupMenu = this.thisPopup = null;
});
Clazz.overrideMethod (c$, "jpiGetMenuAsObject", 
function () {
return this.popupMenu;
});
Clazz.overrideMethod (c$, "jpiShow", 
function (x, y) {
this.show (x, y, false);
this.appRestorePopupMenu ();
this.menuShowPopup (this.popupMenu, this.thisx, this.thisy);
}, "~N,~N");
Clazz.overrideMethod (c$, "jpiUpdateComputedMenus", 
function () {
if (this.updateMode == -1) return;
this.updateMode = 0;
this.getViewerData ();
this.updateFileMenu ();
this.updateFileTypeDependentMenus ();
this.updateMode = 1;
this.updateAboutSubmenu ();
});
Clazz.overrideMethod (c$, "appCheckItem", 
function (item, newMenu) {
}, "~S,J.api.SC");
Clazz.overrideMethod (c$, "appFixLabel", 
function (label) {
if (label.startsWith ("_")) label = label.substring (label.indexOf ("_", 2) + 1);
 else if (label.equals ("VERSION")) label = JSV.common.JSVersion.VERSION;
label = JU.PT.rep (label, "JAVA", "");
label = JU.PT.rep (label, "CB", "");
label = JU.PT.rep (label, "Menu", "");
label = JU.PT.rep (label, "_", " ");
return label;
}, "~S");
Clazz.overrideMethod (c$, "getScriptForCallback", 
function (source, id, script) {
return script;
}, "J.api.SC,~S,~S");
Clazz.overrideMethod (c$, "appGetMenuAsString", 
function (title) {
return ( new JSV.popup.JSVPopupResourceBundle ()).getMenuAsText (title);
}, "~S");
Clazz.overrideMethod (c$, "appGetBooleanProperty", 
function (name) {
return false;
}, "~S");
Clazz.overrideMethod (c$, "appRunSpecialCheckBox", 
function (item, basename, what, TF) {
return false;
}, "J.api.SC,~S,~S,~B");
Clazz.overrideMethod (c$, "appRestorePopupMenu", 
function () {
this.thisPopup = this.popupMenu;
});
Clazz.overrideMethod (c$, "appRunScript", 
function (script) {
this.vwr.runScript (script);
}, "~S");
Clazz.overrideMethod (c$, "appUpdateForShow", 
function () {
this.thisJsvp = this.vwr.selectedPanel;
this.setEnables (this.thisJsvp);
if (this.updateMode == -1) return;
this.getViewerData ();
this.updateMode = 2;
this.updateSpectraMenu ();
this.updateAboutSubmenu ();
});
Clazz.overrideMethod (c$, "appUpdateSpecialCheckBoxValue", 
function (item, what, TF) {
}, "J.api.SC,~S,~B");
Clazz.defineMethod (c$, "getViewerData", 
 function () {
});
Clazz.defineMethod (c$, "updateFileTypeDependentMenus", 
 function () {
});
Clazz.defineMethod (c$, "updateFileMenu", 
 function () {
var menu = this.htMenus.get ("fileMenu");
if (menu == null) return;
});
Clazz.defineMethod (c$, "updateSpectraMenu", 
 function () {
var menuh = this.htMenus.get ("hnmrMenu");
var menuc = this.htMenus.get ("cnmrMenu");
if (menuh != null) this.menuRemoveAll (menuh, 0);
if (menuc != null) this.menuRemoveAll (menuc, 0);
var menu = this.htMenus.get ("spectraMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
var isOK =  new Boolean (this.setSpectraMenu (menuh, this.hnmrPeaks) | this.setSpectraMenu (menuc, this.cnmrPeaks)).valueOf ();
if (isOK) {
if (menuh != null) this.menuAddSubMenu (menu, menuh);
if (menuc != null) this.menuAddSubMenu (menu, menuc);
}this.menuEnable (menu, isOK);
});
Clazz.defineMethod (c$, "setSpectraMenu", 
 function (menu, peaks) {
if (menu == null) return false;
this.menuEnable (menu, false);
var n = (peaks == null ? 0 : peaks.size ());
if (n == 0) return false;
for (var i = 0; i < n; i++) {
var peak = peaks.get (i);
var title = JU.PT.getQuotedAttribute (peak, "title");
var atoms = JU.PT.getQuotedAttribute (peak, "atoms");
if (atoms != null) this.menuCreateItem (menu, title, "select visible & (@" + JU.PT.rep (atoms, ",", " or @") + ")", "Focus" + i);
}
this.menuEnable (menu, true);
return true;
}, "J.api.SC,JU.Lst");
Clazz.defineMethod (c$, "updateAboutSubmenu", 
 function () {
var menu = this.htMenus.get ("aboutComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, this.aboutComputedMenuBaseCount);
});
Clazz.defineMethod (c$, "setEnabled", 
function (allowMenu, zoomEnabled) {
this.allowMenu = allowMenu;
this.zoomEnabled = zoomEnabled;
this.enableMenus ();
}, "~B,~B");
Clazz.defineMethod (c$, "enableMenus", 
 function () {
this.setItemEnabled ("_SIGNED_FileMenu", this.allowMenu);
this.setItemEnabled ("ViewMenu", this.pd != null && this.allowMenu);
this.setItemEnabled ("Open_File...", this.allowMenu);
this.setItemEnabled ("Open_Simulation...", this.allowMenu);
this.setItemEnabled ("Open_URL...", this.allowMenu);
this.setItemEnabled ("Save_AsMenu", this.pd != null && this.allowMenu);
this.setItemEnabled ("Export_AsMenu", this.pd != null && this.allowMenu);
this.setItemEnabled ("Append_File...", this.pd != null && this.allowMenu);
this.setItemEnabled ("Append_Simulation...", this.pd != null && this.allowMenu);
this.setItemEnabled ("Append_URL...", this.pd != null && this.allowMenu);
this.setItemEnabled ("Views...", this.pd != null && this.allowMenu);
this.setItemEnabled ("Script", this.allowMenu);
this.setItemEnabled ("Print...", this.pd != null && this.allowMenu);
this.setItemEnabled ("ZoomMenu", this.pd != null && this.zoomEnabled);
});
Clazz.defineMethod (c$, "setEnables", 
 function (jsvp) {
this.pd = (jsvp == null ? null : jsvp.getPanelData ());
var spec0 = (this.pd == null ? null : this.pd.getSpectrum ());
var isOverlaid = this.pd != null && this.pd.isShowAllStacked ();
var isSingle = this.pd != null && this.pd.haveSelectedSpectrum ();
this.setItemEnabled ("Integration", this.pd != null && this.pd.getSpectrum ().canIntegrate ());
this.setItemEnabled ("Measurements", true);
this.setItemEnabled ("Peaks", this.pd != null && this.pd.getSpectrum ().is1D ());
this.setItemEnabled ("Predicted_Solution_Colour_(fitted)", isSingle && spec0.canShowSolutionColor ());
this.setItemEnabled ("Predicted_Solution_Colour_(interpolated)", isSingle && spec0.canShowSolutionColor ());
this.setItemEnabled ("Toggle_Trans/Abs", isSingle && spec0.canConvertTransAbs ());
this.setItemEnabled ("Show_Overlay_Key", isOverlaid && this.pd.getNumberOfGraphSets () == 1);
this.setItemEnabled ("Overlay_Offset...", isOverlaid);
this.setItemEnabled ("JDXMenu", this.pd != null && spec0.canSaveAsJDX ());
this.setItemEnabled ("Export_AsMenu", this.pd != null);
this.enableMenus ();
}, "JSV.api.JSVPanel");
Clazz.defineMethod (c$, "setItemEnabled", 
 function (key, TF) {
this.menuEnable (this.htMenus.get (key), TF);
}, "~S,~B");
Clazz.defineMethod (c$, "setSelected", 
function (key, TF) {
var item = this.htMenus.get (key);
if (item == null || item.isSelected () == TF) return;
this.menuEnable (item, false);
item.setSelected (TF);
this.menuEnable (item, true);
}, "~S,~B");
Clazz.overrideMethod (c$, "getUnknownCheckBoxScriptToRun", 
function (item, name, what, TF) {
return null;
}, "J.api.SC,~S,~S,~B");
Clazz.defineStatics (c$,
"dumpList", false,
"UPDATE_NEVER", -1,
"UPDATE_ALL", 0,
"UPDATE_CONFIG", 1,
"UPDATE_SHOW", 2);
});
