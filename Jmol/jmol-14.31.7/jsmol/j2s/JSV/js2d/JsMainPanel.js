Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.api.JSVMainPanel"], "JSV.js2d.JsMainPanel", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.selectedPanel = null;
this.currentPanelIndex = 0;
this.title = null;
this.visible = false;
this.focusable = false;
this.enabled = false;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsMainPanel", null, JSV.api.JSVMainPanel);
Clazz.overrideMethod (c$, "getCurrentPanelIndex", 
function () {
return this.currentPanelIndex;
});
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.overrideMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz.overrideMethod (c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
Clazz.overrideMethod (c$, "setSelectedPanel", 
function (viewer, jsvp, panelNodes) {
if (jsvp !== this.selectedPanel) this.selectedPanel = jsvp;
var i = viewer.selectPanel (jsvp, panelNodes);
if (i >= 0) this.currentPanelIndex = i;
this.visible = true;
}, "JSV.common.JSViewer,JSV.api.JSVPanel,JU.Lst");
Clazz.defineMethod (c$, "getHeight", 
function () {
return (this.selectedPanel == null ? 0 : this.selectedPanel.getHeight ());
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return (this.selectedPanel == null ? 0 : this.selectedPanel.getWidth ());
});
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz.overrideMethod (c$, "isFocusable", 
function () {
return this.focusable;
});
Clazz.overrideMethod (c$, "isVisible", 
function () {
return this.visible;
});
Clazz.overrideMethod (c$, "setEnabled", 
function (b) {
this.enabled = b;
}, "~B");
Clazz.overrideMethod (c$, "setFocusable", 
function (b) {
this.focusable = b;
}, "~B");
});
