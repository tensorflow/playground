Clazz.declarePackage ("JSV.app");
Clazz.load (["JSV.api.JSVAppInterface", "$.PanelListener"], "JSV.app.JSVApp", ["java.lang.Double", "JU.Lst", "$.PT", "JSV.common.Coordinate", "$.JSVFileManager", "$.JSVersion", "$.JSViewer", "$.PeakPickEvent", "$.ScriptToken", "$.SubSpecChangeEvent", "$.ZoomEvent", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.appletFrame = null;
this.isNewWindow = false;
this.appletReadyCallbackFunctionName = null;
this.coordCallbackFunctionName = null;
this.loadFileCallbackFunctionName = null;
this.peakCallbackFunctionName = null;
this.syncCallbackFunctionName = null;
this.vwr = null;
this.prevPanel = null;
Clazz.instantialize (this, arguments);
}, JSV.app, "JSVApp", null, [JSV.api.PanelListener, JSV.api.JSVAppInterface]);
Clazz.makeConstructor (c$, 
function (appletFrame, isJS) {
this.appletFrame = appletFrame;
this.initViewer (isJS);
this.initParams (appletFrame.getParameter ("script"));
}, "JSV.api.AppletFrame,~B");
Clazz.defineMethod (c$, "initViewer", 
 function (isJS) {
this.vwr =  new JSV.common.JSViewer (this, true, isJS);
this.appletFrame.setDropTargetListener (this.isSigned (), this.vwr);
var path = this.appletFrame.getDocumentBase ();
JSV.common.JSVFileManager.setDocumentBase (this.vwr, path);
}, "~B");
Clazz.overrideMethod (c$, "isPro", 
function () {
return this.isSigned ();
});
Clazz.overrideMethod (c$, "isSigned", 
function () {
{
return true;
}});
Clazz.defineMethod (c$, "getAppletFrame", 
function () {
return this.appletFrame;
});
Clazz.defineMethod (c$, "dispose", 
function () {
try {
this.vwr.dispose ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getPropertyAsJavaObject", 
function (key) {
return this.vwr.getPropertyAsJavaObject (key);
}, "~S");
Clazz.overrideMethod (c$, "getPropertyAsJSON", 
function (key) {
return JU.PT.toJSON (null, this.getPropertyAsJavaObject (key));
}, "~S");
Clazz.overrideMethod (c$, "getCoordinate", 
function () {
return this.vwr.getCoordinate ();
});
Clazz.overrideMethod (c$, "loadInline", 
function (data) {
this.siOpenDataOrFile (data, "[inline]", null, null, -1, -1, true, null, null);
this.appletFrame.validateContent (3);
}, "~S");
Clazz.overrideMethod (c$, "exportSpectrum", 
function (type, n) {
return this.vwr.$export (type, n);
}, "~S,~N");
Clazz.overrideMethod (c$, "setFilePath", 
function (tmpFilePath) {
this.runScript ("load " + JU.PT.esc (tmpFilePath));
}, "~S");
Clazz.overrideMethod (c$, "setSpectrumNumber", 
function (n) {
this.runScript (JSV.common.ScriptToken.SPECTRUMNUMBER + " " + n);
}, "~N");
Clazz.overrideMethod (c$, "reversePlot", 
function () {
this.toggle (JSV.common.ScriptToken.REVERSEPLOT);
});
Clazz.overrideMethod (c$, "toggleGrid", 
function () {
this.toggle (JSV.common.ScriptToken.GRIDON);
});
Clazz.overrideMethod (c$, "toggleCoordinate", 
function () {
this.toggle (JSV.common.ScriptToken.COORDINATESON);
});
Clazz.overrideMethod (c$, "togglePointsOnly", 
function () {
this.toggle (JSV.common.ScriptToken.POINTSONLY);
});
Clazz.overrideMethod (c$, "toggleIntegration", 
function () {
this.toggle (JSV.common.ScriptToken.INTEGRATE);
});
Clazz.defineMethod (c$, "toggle", 
 function (st) {
if (this.vwr.selectedPanel != null) this.runScript (st + " TOGGLE");
}, "JSV.common.ScriptToken");
Clazz.overrideMethod (c$, "addHighlight", 
function (x1, x2, r, g, b, a) {
this.runScript ("HIGHLIGHT " + x1 + " " + x2 + " " + r + " " + g + " " + b + " " + a);
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "removeHighlight", 
function (x1, x2) {
this.runScript ("HIGHLIGHT " + x1 + " " + x2 + " OFF");
}, "~N,~N");
Clazz.overrideMethod (c$, "removeAllHighlights", 
function () {
this.runScript ("HIGHLIGHT OFF");
});
Clazz.overrideMethod (c$, "syncScript", 
function (peakScript) {
this.vwr.syncScript (peakScript);
}, "~S");
Clazz.overrideMethod (c$, "writeStatus", 
function (msg) {
JU.Logger.info (msg);
}, "~S");
Clazz.defineMethod (c$, "initParams", 
function (params) {
this.vwr.parseInitScript (params);
this.newAppletPanel ();
this.vwr.setPopupMenu (this.vwr.allowMenu, this.vwr.parameters.getBoolean (JSV.common.ScriptToken.ENABLEZOOM));
if (this.vwr.allowMenu) {
this.vwr.closeSource (null);
}this.runScriptNow (params);
}, "~S");
Clazz.defineMethod (c$, "newAppletPanel", 
 function () {
JU.Logger.info ("newAppletPanel");
this.appletFrame.createMainPanel (this.vwr);
});
Clazz.overrideMethod (c$, "repaint", 
function () {
var applet = (this.vwr == null ? null : this.vwr.html5Applet);
if (JSV.common.JSViewer.jmolObject == null) {
this.appletFrame.repaint ();
} else if (applet != null) {
JSV.common.JSViewer.jmolObject.repaint (applet, true);
}});
Clazz.defineMethod (c$, "updateJS", 
function (width, height) {
}, "~N,~N");
Clazz.overrideMethod (c$, "runScriptNow", 
function (params) {
return this.vwr.runScriptNow (params);
}, "~S");
Clazz.defineMethod (c$, "checkCallbacks", 
 function () {
if (this.coordCallbackFunctionName == null && this.peakCallbackFunctionName == null) return;
var coord =  new JSV.common.Coordinate ();
var actualCoord = (this.peakCallbackFunctionName == null ? null :  new JSV.common.Coordinate ());
if (!this.vwr.pd ().getPickedCoordinates (coord, actualCoord)) return;
var iSpec = this.vwr.mainPanel.getCurrentPanelIndex ();
if (actualCoord == null) this.appletFrame.callToJavaScript (this.coordCallbackFunctionName,  Clazz.newArray (-1, [Double.$valueOf (coord.getXVal ()), Double.$valueOf (coord.getYVal ()), Integer.$valueOf (iSpec + 1)]));
 else this.appletFrame.callToJavaScript (this.peakCallbackFunctionName,  Clazz.newArray (-1, [Double.$valueOf (coord.getXVal ()), Double.$valueOf (coord.getYVal ()), Double.$valueOf (actualCoord.getXVal ()), Double.$valueOf (actualCoord.getYVal ()), Integer.$valueOf (iSpec + 1)]));
});
Clazz.defineMethod (c$, "doAdvanced", 
function (filePath) {
}, "~S");
Clazz.overrideMethod (c$, "panelEvent", 
function (eventObj) {
if (Clazz.instanceOf (eventObj, JSV.common.PeakPickEvent)) {
this.vwr.processPeakPickEvent (eventObj, false);
} else if (Clazz.instanceOf (eventObj, JSV.common.ZoomEvent)) {
} else if (Clazz.instanceOf (eventObj, JSV.common.SubSpecChangeEvent)) {
}}, "~O");
Clazz.overrideMethod (c$, "getSolnColour", 
function () {
return this.vwr.getSolutionColorStr (true);
});
Clazz.defineMethod (c$, "updateJSView", 
 function (msg) {
var applet = this.vwr.html5Applet;
var panel = (applet == null ? null : this.vwr.selectedPanel);
{
applet && applet._viewSet != null && applet._updateView(panel, msg);
}applet._updateView (panel, msg);
}, "~S");
Clazz.overrideMethod (c$, "syncToJmol", 
function (msg) {
this.updateJSView (msg);
if (this.syncCallbackFunctionName == null) return;
JU.Logger.info ("JSVApp.syncToJmol JSV>Jmol " + msg);
this.appletFrame.callToJavaScript (this.syncCallbackFunctionName,  Clazz.newArray (-1, [this.vwr.fullName, msg]));
}, "~S");
Clazz.overrideMethod (c$, "setVisible", 
function (b) {
this.appletFrame.setPanelVisible (b);
}, "~B");
Clazz.overrideMethod (c$, "setCursor", 
function (id) {
this.vwr.apiPlatform.setCursor (id, this.appletFrame);
}, "~N");
Clazz.overrideMethod (c$, "runScript", 
function (script) {
this.vwr.runScript (script);
}, "~S");
Clazz.overrideMethod (c$, "getScriptQueue", 
function () {
return this.vwr.scriptQueue;
});
Clazz.overrideMethod (c$, "siSetCurrentSource", 
function (source) {
this.vwr.currentSource = source;
}, "JSV.source.JDXSource");
Clazz.overrideMethod (c$, "siSendPanelChange", 
function () {
if (this.vwr.selectedPanel === this.prevPanel) return;
this.prevPanel = this.vwr.selectedPanel;
this.vwr.sendPanelChange ();
});
Clazz.overrideMethod (c$, "siNewWindow", 
function (isSelected, fromFrame) {
this.isNewWindow = isSelected;
if (fromFrame) {
if (this.vwr.jsvpPopupMenu != null) this.vwr.jsvpPopupMenu.setSelected ("Window", false);
} else {
this.appletFrame.newWindow (isSelected);
}}, "~B,~B");
Clazz.overrideMethod (c$, "siValidateAndRepaint", 
function (isAll) {
var pd = this.vwr.pd ();
if (pd != null) pd.setTaintedAll ();
this.appletFrame.validate ();
this.repaint ();
}, "~B");
Clazz.overrideMethod (c$, "siSyncLoad", 
function (filePath) {
this.newAppletPanel ();
JU.Logger.info ("JSVP syncLoad reading " + filePath);
this.siOpenDataOrFile (null, null, null, filePath, -1, -1, false, null, null);
this.appletFrame.validateContent (3);
}, "~S");
Clazz.overrideMethod (c$, "siOpenDataOrFile", 
function (data, name, specs, url, firstSpec, lastSpec, isAppend, script, id) {
switch (this.vwr.openDataOrFile (data, name, specs, url, firstSpec, lastSpec, isAppend, id)) {
case 0:
if (script != null) this.runScript (script);
break;
case -1:
return;
default:
this.siSetSelectedPanel (null);
return;
}
JU.Logger.info (this.appletFrame.getAppletInfo () + " File " + this.vwr.currentSource.getFilePath () + " Loaded Successfully");
}, "~O,~S,JU.Lst,~S,~N,~N,~B,~S,~S");
Clazz.overrideMethod (c$, "siProcessCommand", 
function (scriptItem) {
this.vwr.runScriptNow (scriptItem);
}, "~S");
Clazz.overrideMethod (c$, "siSetSelectedPanel", 
function (jsvp) {
this.vwr.mainPanel.setSelectedPanel (this.vwr, jsvp, this.vwr.panelNodes);
this.vwr.selectedPanel = jsvp;
this.vwr.spectraTree.setSelectedPanel (this, jsvp);
if (jsvp == null) {
this.vwr.selectedPanel = jsvp = this.appletFrame.getJSVPanel (this.vwr, null);
this.vwr.mainPanel.setSelectedPanel (this.vwr, jsvp, null);
}this.appletFrame.validate ();
if (jsvp != null) {
jsvp.setEnabled (true);
jsvp.setFocusable (true);
}}, "JSV.api.JSVPanel");
Clazz.overrideMethod (c$, "siExecSetCallback", 
function (st, value) {
switch (st) {
case JSV.common.ScriptToken.APPLETREADYCALLBACKFUNCTIONNAME:
this.appletReadyCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
this.loadFileCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
this.peakCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
this.syncCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
this.coordCallbackFunctionName = value;
break;
}
}, "JSV.common.ScriptToken,~S");
Clazz.overrideMethod (c$, "siLoaded", 
function (value) {
if (this.loadFileCallbackFunctionName != null) this.appletFrame.callToJavaScript (this.loadFileCallbackFunctionName,  Clazz.newArray (-1, [this.vwr.appletName, value]));
this.updateJSView (null);
return null;
}, "~S");
Clazz.overrideMethod (c$, "siExecHidden", 
function (b) {
}, "~B");
Clazz.overrideMethod (c$, "siExecScriptComplete", 
function (msg, isOK) {
if (!isOK) this.vwr.showMessage (msg);
this.siValidateAndRepaint (false);
}, "~S,~B");
Clazz.overrideMethod (c$, "siUpdateBoolean", 
function (st, TF) {
}, "JSV.common.ScriptToken,~B");
Clazz.overrideMethod (c$, "siCheckCallbacks", 
function (title) {
this.checkCallbacks ();
}, "~S");
Clazz.overrideMethod (c$, "siNodeSet", 
function (panelNode) {
this.appletFrame.validateContent (2);
this.siValidateAndRepaint (false);
}, "JSV.common.PanelNode");
Clazz.overrideMethod (c$, "siSourceClosed", 
function (source) {
}, "JSV.source.JDXSource");
Clazz.overrideMethod (c$, "siGetNewJSVPanel", 
function (spec) {
if (spec == null) {
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
return null;
}var specs =  new JU.Lst ();
specs.addLast (spec);
var jsvp = this.appletFrame.getJSVPanel (this.vwr, specs);
jsvp.getPanelData ().addListener (this);
this.vwr.parameters.setFor (jsvp, null, true);
return jsvp;
}, "JSV.common.Spectrum");
Clazz.overrideMethod (c$, "siGetNewJSVPanel2", 
function (specs) {
if (specs == null) {
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
return this.appletFrame.getJSVPanel (this.vwr, null);
}var jsvp = this.appletFrame.getJSVPanel (this.vwr, specs);
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
jsvp.getPanelData ().addListener (this);
this.vwr.parameters.setFor (jsvp, null, true);
return jsvp;
}, "JU.Lst");
Clazz.overrideMethod (c$, "siSetPropertiesFromPreferences", 
function (jsvp, includeMeasures) {
this.vwr.checkAutoIntegrate ();
}, "JSV.api.JSVPanel,~B");
Clazz.overrideMethod (c$, "siSetLoaded", 
function (fileName, filePath) {
}, "~S,~S");
Clazz.overrideMethod (c$, "siSetMenuEnables", 
function (node, isSplit) {
}, "JSV.common.PanelNode,~B");
Clazz.overrideMethod (c$, "siUpdateRecentMenus", 
function (filePath) {
}, "~S");
Clazz.overrideMethod (c$, "siExecTest", 
function (value) {
var data = "";
this.loadInline (data);
}, "~S");
Clazz.overrideMethod (c$, "print", 
function (fileName) {
return this.vwr.print (fileName);
}, "~S");
Clazz.overrideMethod (c$, "checkScript", 
function (script) {
return this.vwr.checkScript (script);
}, "~S");
c$.getAppletInfo = Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "JSpecView Applet " + JSV.common.JSVersion.VERSION + "\n\n" + "Authors:\nProf. Robert M. Hanson,\nD. Facey, K. Bryan, C. Walters, Prof. Robert J. Lancashire and\nvolunteer developers through sourceforge.";
});
Clazz.defineStatics (c$,
"CREDITS", "Authors:\nProf. Robert M. Hanson,\nD. Facey, K. Bryan, C. Walters, Prof. Robert J. Lancashire and\nvolunteer developers through sourceforge.");
});
