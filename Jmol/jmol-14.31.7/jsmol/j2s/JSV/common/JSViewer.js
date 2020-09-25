Clazz.declarePackage ("JSV.common");
Clazz.load (["javajs.api.BytePoster", "J.api.PlatformViewer", "JSV.common.Spectrum"], "JSV.common.JSViewer", ["java.io.File", "java.lang.Boolean", "$.Character", "$.Double", "$.Float", "$.Thread", "java.net.URL", "java.util.Arrays", "$.Hashtable", "JU.CU", "$.Lst", "$.OC", "$.PT", "$.SB", "JSV.common.Annotation", "$.ExportType", "$.JSVFileManager", "$.PanelData", "$.PanelNode", "$.Parameters", "$.PeakInfo", "$.PrintLayout", "$.RepaintManager", "$.ScriptToken", "$.ScriptTokenizer", "JSV.source.JDXReader", "$.JDXSource", "JSV.tree.SimpleTree", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.si = null;
this.g2d = null;
this.spectraTree = null;
this.currentSource = null;
this.panelNodes = null;
this.parameters = null;
this.repaintManager = null;
this.selectedPanel = null;
this.mainPanel = null;
this.properties = null;
this.scriptQueue = null;
this.fileHelper = null;
this.jsvpPopupMenu = null;
this.dialogManager = null;
this.viewDialog = null;
this.overlayLegendDialog = null;
this.irMode = null;
this.loadImaginary = false;
this.interfaceOverlaid = false;
this.autoIntegrate = false;
this.autoShowLegend = false;
this.obscureTitleFromUser = null;
this.allowMenu = true;
this.initialStartIndex = -1;
this.initialEndIndex = -1;
this.isSingleThreaded = false;
this.isApplet = false;
this.isSigned = false;
this.recentScript = "";
this.appletName = null;
this.fullName = null;
this.syncID = null;
this.html5Applet = null;
this.display = null;
this.maximumSize = 2147483647;
this.screenHeight = 0;
this.screenWidth = 0;
this.fileCount = 0;
this.nViews = 0;
this.scriptLevelCount = 0;
this.returnFromJmolModel = null;
this.integrationRatios = null;
this.apiPlatform = null;
this.popupAllowMenu = true;
this.popupZoomEnabled = true;
this.defaultLoadScript = null;
this.nmrMaxY = NaN;
this.overlayLegendVisible = false;
this.recentStackPercent = 5;
this.lastPrintLayout = null;
this.offWindowFrame = null;
this.recentOpenURL = "http://";
this.recentURL = null;
this.recentSimulation = "tylenol";
Clazz.instantialize (this, arguments);
}, JSV.common, "JSViewer", null, [J.api.PlatformViewer, javajs.api.BytePoster]);
Clazz.prepareFields (c$, function () {
this.irMode = JSV.common.Spectrum.IRMode.NO_CONVERT;
});
Clazz.defineMethod (c$, "setProperty", 
function (key, value) {
if (this.properties != null) this.properties.setProperty (key, value);
}, "~S,~S");
Clazz.defineMethod (c$, "setNode", 
function (node) {
if (node.jsvp !== this.selectedPanel) this.si.siSetSelectedPanel (node.jsvp);
this.si.siSendPanelChange ();
this.si.siNodeSet (node);
}, "JSV.common.PanelNode");
Clazz.makeConstructor (c$, 
function (si, isApplet, isJSApplet) {
this.si = si;
this.isApplet = isApplet;
JSV.common.JSViewer.isJS = isApplet && isJSApplet;
var jmol = null;
{
self.Jmol && (jmol = Jmol);
}JSV.common.JSViewer.jmolObject = jmol;
this.isSigned = si.isSigned ();
this.apiPlatform = this.getPlatformInterface ("Platform");
this.apiPlatform.setViewer (this, this.display);
this.g2d = this.getPlatformInterface ("G2D");
this.spectraTree =  new JSV.tree.SimpleTree (this);
this.parameters = this.getPlatformInterface ("Parameters");
this.parameters.setName ("applet");
this.fileHelper = (this.getPlatformInterface ("FileHelper")).set (this);
this.isSingleThreaded = this.apiPlatform.isSingleThreaded ();
this.panelNodes =  new JU.Lst ();
this.repaintManager =  new JSV.common.RepaintManager (this);
if (!isApplet) this.setPopupMenu (true, true);
}, "JSV.api.ScriptInterface,~B,~B");
Clazz.defineMethod (c$, "setPopupMenu", 
function (allowMenu, zoomEnabled) {
this.popupAllowMenu = allowMenu;
this.popupZoomEnabled = zoomEnabled;
}, "~B,~B");
Clazz.defineMethod (c$, "showMenu", 
function (x, y) {
if (!this.popupAllowMenu) return;
if (this.jsvpPopupMenu == null) {
try {
this.jsvpPopupMenu = this.getPlatformInterface ("Popup");
this.jsvpPopupMenu.jpiInitialize (this, this.isApplet ? "appletMenu" : "appMenu");
this.jsvpPopupMenu.setEnabled (this.popupAllowMenu, this.popupZoomEnabled);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error (e + " initializing popup menu");
return;
} else {
throw e;
}
}
}this.jsvpPopupMenu.jpiShow (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "runScriptNow", 
function (script) {
System.out.println (this.checkScript (script));
this.scriptLevelCount++;
if (script == null) script = "";
script = script.trim ();
if (script.startsWith ("!")) script = script.substring (1).trim ();
 else if (script.startsWith (">")) {
JU.Logger.error (script);
return true;
}if (script.indexOf ("<PeakData") >= 0) {
this.syncScript (script);
return true;
}JU.Logger.info ("RUNSCRIPT " + script);
var isOK = true;
var nErrorsLeft = 10;
var commandTokens =  new JSV.common.ScriptTokenizer (script, true);
var msg = null;
while (commandTokens != null && commandTokens.hasMoreTokens () && nErrorsLeft > 0 && isOK) {
var token = commandTokens.nextToken ();
var eachParam =  new JSV.common.ScriptTokenizer (token, false);
var key = JSV.common.ScriptToken.getKey (eachParam);
if (key == null) continue;
var st = JSV.common.ScriptToken.getScriptToken (key);
var value = JSV.common.ScriptToken.getValue (st, eachParam, token);
try {
switch (st) {
case JSV.common.ScriptToken.UNKNOWN:
JU.Logger.info ("Unrecognized parameter: " + key);
--nErrorsLeft;
break;
default:
if (this.selectedPanel == null) break;
this.parameters.set (this.pd (), st, value);
this.si.siUpdateBoolean (st, JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
this.si.siExecSetCallback (st, value);
break;
case JSV.common.ScriptToken.DEFAULTLOADSCRIPT:
value = JU.PT.rep (value, "''", "\"");
this.defaultLoadScript = (value.length > 0 ? value : null);
break;
case JSV.common.ScriptToken.DEFAULTNMRNORMALIZATION:
this.nmrMaxY = JU.PT.parseFloat (value);
break;
case JSV.common.ScriptToken.AUTOINTEGRATE:
this.autoIntegrate = JSV.common.Parameters.isTrue (value);
break;
case JSV.common.ScriptToken.CLOSE:
this.execClose (value);
break;
case JSV.common.ScriptToken.DEBUG:
JU.Logger.setLogLevel (value.toLowerCase ().equals ("high") ? 6 : JSV.common.Parameters.isTrue (value) ? 5 : 4);
break;
case JSV.common.ScriptToken.GETPROPERTY:
var info = (this.selectedPanel == null ? null : this.getPropertyAsJavaObject (value));
if (info != null) this.selectedPanel.showMessage (JU.PT.toJSON (null, info), value);
break;
case JSV.common.ScriptToken.HELP:
this.execHelp (value);
break;
case JSV.common.ScriptToken.HIDDEN:
this.si.siExecHidden (JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.INTEGRATIONRATIOS:
this.integrationRatios = value;
this.execIntegrate (null);
break;
case JSV.common.ScriptToken.INTERFACE:
this.interfaceOverlaid = this.checkOvelayInterface (value);
break;
case JSV.common.ScriptToken.INTEGRALOFFSET:
case JSV.common.ScriptToken.INTEGRALRANGE:
this.execSetIntegralParameter (st, Double.parseDouble (value));
break;
case JSV.common.ScriptToken.INVERTY:
this.execZoom ("invertY");
break;
case JSV.common.ScriptToken.JMOL:
this.si.syncToJmol (value);
break;
case JSV.common.ScriptToken.JSV:
this.syncScript (JU.PT.trimQuotes (value));
break;
case JSV.common.ScriptToken.LOAD:
if (value.length == 0) {
if (this.defaultLoadScript != null) this.runScriptNow (this.defaultLoadScript);
break;
}this.execLoad (value, (this.defaultLoadScript == null ? "" : this.defaultLoadScript + ";") + commandTokens.getRemainingScript ());
msg = (this.selectedPanel == null ? null : this.si.siLoaded (value));
commandTokens = null;
break;
case JSV.common.ScriptToken.LOADIMAGINARY:
this.loadImaginary = JSV.common.Parameters.isTrue (value);
break;
case JSV.common.ScriptToken.PEAK:
this.execPeak (value);
break;
case JSV.common.ScriptToken.PEAKLIST:
this.execPeakList (value);
break;
case JSV.common.ScriptToken.SCALEBY:
this.scaleSelectedBy (this.panelNodes, value);
break;
case JSV.common.ScriptToken.SCRIPT:
if (value.equals ("") || value.toLowerCase ().startsWith ("inline")) {
this.execScriptInline (value);
} else {
var s = JSV.common.JSVFileManager.getFileAsString (value);
if (s != null && this.scriptLevelCount < 100) this.runScriptNow (s);
}break;
case JSV.common.ScriptToken.SELECT:
this.execSelect (value);
break;
case JSV.common.ScriptToken.SPECTRUM:
case JSV.common.ScriptToken.SPECTRUMNUMBER:
if (!this.setSpectrum (value)) isOK = false;
break;
case JSV.common.ScriptToken.STACKOFFSETY:
this.execOverlayOffsetY (JU.PT.parseInt ("" + JU.PT.parseFloat (value)));
break;
case JSV.common.ScriptToken.TEST:
this.si.siExecTest (value);
break;
case JSV.common.ScriptToken.OVERLAY:
case JSV.common.ScriptToken.VIEW:
this.execView (value, true);
break;
case JSV.common.ScriptToken.HIGHLIGHT:
isOK = this.highlight (token);
break;
case JSV.common.ScriptToken.FINDX:
case JSV.common.ScriptToken.GETSOLUTIONCOLOR:
case JSV.common.ScriptToken.INTEGRATION:
case JSV.common.ScriptToken.INTEGRATE:
case JSV.common.ScriptToken.IRMODE:
case JSV.common.ScriptToken.LABEL:
case JSV.common.ScriptToken.LINK:
case JSV.common.ScriptToken.OVERLAYSTACKED:
case JSV.common.ScriptToken.PRINT:
case JSV.common.ScriptToken.SETPEAK:
case JSV.common.ScriptToken.SETX:
case JSV.common.ScriptToken.SHIFTX:
case JSV.common.ScriptToken.SHOWERRORS:
case JSV.common.ScriptToken.SHOWMEASUREMENTS:
case JSV.common.ScriptToken.SHOWMENU:
case JSV.common.ScriptToken.SHOWKEY:
case JSV.common.ScriptToken.SHOWPEAKLIST:
case JSV.common.ScriptToken.SHOWINTEGRATION:
case JSV.common.ScriptToken.SHOWPROPERTIES:
case JSV.common.ScriptToken.SHOWSOURCE:
case JSV.common.ScriptToken.YSCALE:
case JSV.common.ScriptToken.WRITE:
case JSV.common.ScriptToken.ZOOM:
if (this.isClosed ()) {
isOK = false;
break;
}switch (st) {
default:
break;
case JSV.common.ScriptToken.FINDX:
this.pd ().findX (null, Double.parseDouble (value));
break;
case JSV.common.ScriptToken.GETSOLUTIONCOLOR:
this.show ("solutioncolor" + value.toLowerCase ());
break;
case JSV.common.ScriptToken.INTEGRATION:
case JSV.common.ScriptToken.INTEGRATE:
this.execIntegrate (value);
break;
case JSV.common.ScriptToken.IRMODE:
this.execIRMode (value);
break;
case JSV.common.ScriptToken.LABEL:
this.pd ().addAnnotation (JSV.common.ScriptToken.getTokens (value));
break;
case JSV.common.ScriptToken.LINK:
this.pd ().linkSpectra (JSV.common.PanelData.LinkMode.getMode (value));
break;
case JSV.common.ScriptToken.OVERLAYSTACKED:
this.pd ().splitStack (!JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.PRINT:
msg = this.execWrite (null);
break;
case JSV.common.ScriptToken.SETPEAK:
case JSV.common.ScriptToken.SETX:
case JSV.common.ScriptToken.SHIFTX:
this.execShiftSpectrum (st, token);
break;
case JSV.common.ScriptToken.SHOWERRORS:
this.show ("errors");
break;
case JSV.common.ScriptToken.SHOWINTEGRATION:
this.pd ().showAnnotation (JSV.common.Annotation.AType.Integration, JSV.common.Parameters.getTFToggle (value));
break;
case JSV.common.ScriptToken.SHOWKEY:
this.setOverlayLegendVisibility (JSV.common.Parameters.getTFToggle (value), true);
break;
case JSV.common.ScriptToken.SHOWMEASUREMENTS:
this.pd ().showAnnotation (JSV.common.Annotation.AType.Measurements, JSV.common.Parameters.getTFToggle (value));
break;
case JSV.common.ScriptToken.SHOWMENU:
this.showMenu (-2147483648, 0);
break;
case JSV.common.ScriptToken.SHOWPEAKLIST:
this.pd ().showAnnotation (JSV.common.Annotation.AType.PeakList, JSV.common.Parameters.getTFToggle (value));
break;
case JSV.common.ScriptToken.SHOWPROPERTIES:
this.show ("properties");
break;
case JSV.common.ScriptToken.SHOWSOURCE:
this.show ("source");
break;
case JSV.common.ScriptToken.YSCALE:
this.setYScale (value);
break;
case JSV.common.ScriptToken.WINDOW:
this.si.siNewWindow (JSV.common.Parameters.isTrue (value), false);
break;
case JSV.common.ScriptToken.WRITE:
msg = this.execWrite (value);
break;
case JSV.common.ScriptToken.ZOOM:
isOK = this.execZoom (value);
break;
}
break;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
msg = e.toString ();
JU.Logger.error (e.toString ());
isOK = false;
--nErrorsLeft;
} else {
throw e;
}
}
}
this.scriptLevelCount--;
this.si.siExecScriptComplete (msg, true);
return isOK;
}, "~S");
Clazz.defineMethod (c$, "execShiftSpectrum", 
 function (st, script) {
var tokens = JSV.common.ScriptToken.getTokens (script);
var xOld = NaN;
var xNew = NaN;
switch (tokens.size ()) {
case 2:
var value = tokens.get (1);
if (value.equals ("")) value = "?";
xNew = value.equalsIgnoreCase ("NONE") ? 1.7976931348623157E308 : value.equalsIgnoreCase ("?") ? NaN : Double.parseDouble (value);
break;
case 3:
xOld = Double.parseDouble (tokens.get (1));
xNew = Double.parseDouble (tokens.get (2));
break;
default:
Double.parseDouble ("");
}
var mode = 0;
switch (st) {
case JSV.common.ScriptToken.SETPEAK:
mode = 1;
break;
case JSV.common.ScriptToken.SETX:
mode = 2;
break;
case JSV.common.ScriptToken.SHIFTX:
mode = 3;
if (Double.isNaN (xNew)) Double.parseDouble ("");
break;
default:
return;
}
this.pd ().shiftSpectrum (mode, xOld, xNew);
}, "JSV.common.ScriptToken,~S");
Clazz.defineMethod (c$, "execClose", 
 function (value) {
var fromScript = (!value.startsWith ("!"));
if (!fromScript) value = value.substring (1);
this.close (JU.PT.trimQuotes (value));
if (!fromScript || this.panelNodes.size () == 0) this.si.siValidateAndRepaint (true);
}, "~S");
Clazz.defineMethod (c$, "checkOvelayInterface", 
function (value) {
return (value.equalsIgnoreCase ("single") || value.equalsIgnoreCase ("overlay"));
}, "~S");
Clazz.defineMethod (c$, "execPeak", 
 function (value) {
try {
var tokens = JSV.common.ScriptToken.getTokens (JU.PT.rep (value, "#", "INDEX="));
value = " type=\"" + tokens.get (0).toUpperCase () + "\" _match=\"" + JU.PT.trimQuotes (tokens.get (1).toUpperCase ()) + "\"";
if (tokens.size () > 2 && tokens.get (2).equalsIgnoreCase ("all")) value += " title=\"ALL\"";
this.processPeakPickEvent ( new JSV.common.PeakInfo (value), false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "execPeakList", 
 function (value) {
var p = this.parameters;
var b = JSV.common.Parameters.getTFToggle (value);
if (value.indexOf ("=") < 0) {
if (!this.isClosed ()) this.pd ().getPeakListing (null, b);
} else {
var tokens = JSV.common.ScriptToken.getTokens (value);
var threshold = p.peakListThreshold;
var interp = p.peakListInterpolation;
try {
for (var i = tokens.size (); --i >= 0; ) {
var token = tokens.get (i);
var pt = token.indexOf ("=");
if (pt <= 0) continue;
var key = token.substring (0, pt);
value = token.substring (pt + 1);
if (key.startsWith ("thr")) {
threshold = Double.$valueOf (value).doubleValue ();
} else if (key.startsWith ("int")) {
interp = (value.equalsIgnoreCase ("none") ? "NONE" : "parabolic");
}}
p.peakListThreshold = threshold;
p.peakListInterpolation = interp;
if (!this.isClosed ()) this.pd ().getPeakListing (p, Boolean.TRUE);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}}, "~S");
Clazz.defineMethod (c$, "highlight", 
 function (value) {
var tokens = JSV.common.ScriptToken.getTokens (value);
var n = tokens.size ();
switch (n) {
case 3:
case 5:
case 6:
case 7:
break;
case 2:
case 4:
if (tokens.get (n - 1).equalsIgnoreCase ("OFF")) break;
default:
return false;
}
if (!this.isClosed ()) {
var x1 = JU.PT.parseFloat (n > 1 ? tokens.get (1) : "");
var x2 = JU.PT.parseFloat (n > 2 ? tokens.get (2) : "");
var r = this.getRGB (n > 3 ? tokens.get (3) : "100");
var g = this.getRGB (n > 4 ? tokens.get (4) : "100");
var b = this.getRGB (n > 5 ? tokens.get (5) : "100");
var a = this.getRGB (n > 6 ? tokens.get (6) : "100");
if (Float.isNaN (x1) || Float.isNaN (x2)) {
this.pd ().removeAllHighlights ();
} else {
this.pd ().removeHighlight (x1, x2);
if (a < 0) a = 150;
if (r >= 0 && g >= 0 && b >= 0) this.pd ().addHighlight (null, x1, x2, null, r, g, b, a);
}this.repaint (true);
}return true;
}, "~S");
Clazz.defineMethod (c$, "getRGB", 
 function (s) {
var f = JU.PT.parseFloat (s);
return Clazz.floatToInt (Float.isNaN (f) ? -1 : f > 1 ? f : f * 255);
}, "~S");
Clazz.defineMethod (c$, "execZoom", 
 function (value) {
var x1 = 0;
var x2 = 0;
var y1 = 0;
var y2 = 0;
value = JU.PT.rep (value, " - ", " ").$replace (',', ' ');
var tokens = JSV.common.ScriptToken.getTokens (value);
switch (tokens.size ()) {
default:
return false;
case 0:
var v = this.pd ().getCurrentGraphSet ().getCurrentView ();
value = Math.round (v.minXOnScale * 100) / 100 + "," + Math.round (v.maxXOnScale * 100) / 100;
value = this.selectedPanel.getInput ("Enter zoom range x1 x2", "Zoom", value);
return (value == null || this.execZoom (value));
case 1:
value = tokens.get (0);
if (value.equalsIgnoreCase ("next")) {
this.pd ().nextView ();
} else if (value.toLowerCase ().startsWith ("prev")) {
this.pd ().previousView ();
} else if (value.equalsIgnoreCase ("out")) {
this.pd ().resetView ();
} else if (value.equalsIgnoreCase ("clear")) {
this.pd ().clearAllView ();
} else if (value.equalsIgnoreCase ("invertY")) {
this.pd ().getCurrentGraphSet ().invertYAxis ();
}return true;
case 2:
x1 = Double.parseDouble (tokens.get (0));
x2 = Double.parseDouble (tokens.get (1));
break;
case 3:
var xy = tokens.get (0);
if (xy.equalsIgnoreCase ("X")) {
x1 = Double.parseDouble (tokens.get (1));
x2 = Double.parseDouble (tokens.get (2));
} else if (xy.equalsIgnoreCase ("Y")) {
y1 = Double.parseDouble (tokens.get (1));
y2 = Double.parseDouble (tokens.get (2));
}break;
case 4:
x1 = Double.parseDouble (tokens.get (0));
y1 = Double.parseDouble (tokens.get (1));
x2 = Double.parseDouble (tokens.get (2));
y2 = Double.parseDouble (tokens.get (3));
}
this.pd ().setZoom (x1, y1, x2, y2);
return true;
}, "~S");
Clazz.defineMethod (c$, "scaleSelectedBy", 
 function (nodes, value) {
try {
var f = Double.parseDouble (value);
for (var i = nodes.size (); --i >= 0; ) nodes.get (i).pd ().scaleSelectedBy (f);

} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "JU.Lst,~S");
Clazz.defineMethod (c$, "pd", 
function () {
return (this.selectedPanel == null ? null : this.selectedPanel.getPanelData ());
});
Clazz.defineMethod (c$, "isClosed", 
 function () {
return (this.pd () == null);
});
Clazz.defineMethod (c$, "execSelect", 
 function (value) {
if (value.startsWith ("ID ")) {
if (!this.isClosed ()) try {
this.pd ().selectSpectrum (null, "ID", JU.PT.trimQuotes (value.substring (3)), true);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return;
}var nodes = this.panelNodes;
for (var i = nodes.size (); --i >= 0; ) nodes.get (i).pd ().selectFromEntireSet (-2147483648);

var speclist =  new JU.Lst ();
this.fillSpecList (value, speclist, false);
}, "~S");
Clazz.defineMethod (c$, "execView", 
function (value, fromScript) {
if (value.equals ("")) {
this.checkOverlay ();
return;
}var speclist =  new JU.Lst ();
var strlist = this.fillSpecList (value, speclist, true);
if (speclist.size () > 0) this.si.siOpenDataOrFile (null, strlist, speclist, strlist, -1, -1, false, null, null);
if (!fromScript) {
this.si.siValidateAndRepaint (false);
}}, "~S,~B");
Clazz.defineMethod (c$, "execIRMode", 
 function (value) {
var mode = JSV.common.Spectrum.IRMode.getMode (value);
var type = this.pd ().getSpectrum ().dataType;
for (var i = this.panelNodes.size (); --i >= 0; ) this.panelNodes.get (i).pd ().setIRMode (mode, type);

this.setIRmode (value);
}, "~S");
Clazz.defineMethod (c$, "execIntegrate", 
 function (value) {
if (this.isClosed ()) return;
this.pd ().checkIntegral (this.parameters, value);
if (this.integrationRatios != null) this.pd ().setIntegrationRatios (this.integrationRatios);
this.integrationRatios = null;
this.repaint (true);
}, "~S");
Clazz.defineMethod (c$, "repaint", 
 function (andTaintAll) {
this.selectedPanel.doRepaint (andTaintAll);
}, "~B");
Clazz.defineMethod (c$, "execSetIntegralParameter", 
 function (st, value) {
var p = this.parameters;
switch (st) {
case JSV.common.ScriptToken.INTEGRALRANGE:
p.integralRange = value;
break;
case JSV.common.ScriptToken.INTEGRALOFFSET:
p.integralOffset = value;
break;
}
if (!this.isClosed ()) this.pd ().checkIntegral (this.parameters, "update");
}, "JSV.common.ScriptToken,~N");
Clazz.defineMethod (c$, "setYScale", 
 function (value) {
var tokens = JSV.common.ScriptToken.getTokens (value);
var pt = 0;
var isAll = false;
if (tokens.size () > 1 && tokens.get (0).equalsIgnoreCase ("ALL")) {
isAll = true;
pt++;
}var y1 = Double.parseDouble (tokens.get (pt++));
var y2 = Double.parseDouble (tokens.get (pt));
if (isAll) {
var spec = this.pd ().getSpectrum ();
for (var i = this.panelNodes.size (); --i >= 0; ) {
var node = this.panelNodes.get (i);
if (node.source !== this.currentSource) continue;
if (JSV.common.Spectrum.areXScalesCompatible (spec, node.getSpectrum (), false, false)) node.pd ().setZoom (0, y1, 0, y2);
}
} else {
this.pd ().setZoom (0, y1, 0, y2);
}}, "~S");
Clazz.defineMethod (c$, "setOverlayLegendVisibility", 
 function (tftoggle, doSet) {
if (doSet) this.overlayLegendVisible = (tftoggle == null ? !this.overlayLegendVisible : tftoggle === Boolean.TRUE);
var node = JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes);
for (var i = this.panelNodes.size (); --i >= 0; ) this.showOverlayLegend (this.panelNodes.get (i), this.panelNodes.get (i) === node && this.overlayLegendVisible);

}, "Boolean,~B");
Clazz.defineMethod (c$, "showOverlayLegend", 
 function (node, visible) {
var legend = node.legend;
if (legend == null && visible) {
legend = node.setLegend (node.pd ().getNumberOfSpectraInCurrentSet () > 1 && node.pd ().getNumberOfGraphSets () == 1 ? this.getDialog (JSV.common.Annotation.AType.OverlayLegend, null) : null);
}if (legend != null) legend.setVisible (visible);
}, "JSV.common.PanelNode,~B");
Clazz.defineMethod (c$, "syncScript", 
function (peakScript) {
if (peakScript.equals ("TEST")) peakScript = JSV.common.JSViewer.testScript;
JU.Logger.info ("JSViewer.syncScript Jmol>JSV " + peakScript);
if (peakScript.indexOf ("<PeakData") < 0) {
if (peakScript.startsWith ("JSVSTR:")) {
this.si.syncToJmol (peakScript);
return;
}this.runScriptNow (peakScript);
if (peakScript.indexOf ("#SYNC_PEAKS") >= 0) this.syncPeaksAfterSyncScript ();
return;
}JU.Logger.info (">>toJSV>> " + peakScript);
var sourceID = JU.PT.getQuotedAttribute (peakScript, "sourceID");
var type;
var model;
var file;
var jmolSource;
var index;
var atomKey;
if (sourceID == null) {
file = JU.PT.getQuotedAttribute (peakScript, "file");
index = JU.PT.getQuotedAttribute (peakScript, "index");
if (file == null || index == null) return;
file = JU.PT.rep (file, "#molfile", "");
model = JU.PT.getQuotedAttribute (peakScript, "model");
jmolSource = JU.PT.getQuotedAttribute (peakScript, "src");
var modelSent = (jmolSource != null && jmolSource.startsWith ("Jmol") ? null : this.returnFromJmolModel);
if (model != null && modelSent != null && !model.equals (modelSent)) {
JU.Logger.info ("JSV ignoring model " + model + "; should be " + modelSent);
return;
}this.returnFromJmolModel = null;
if (this.panelNodes.size () == 0 || !this.checkFileAlreadyLoaded (file)) {
JU.Logger.info ("file " + file + " not found -- JSViewer closing all and reopening");
this.si.siSyncLoad (file);
}type = JU.PT.getQuotedAttribute (peakScript, "type");
atomKey = null;
} else {
file = null;
index = model = sourceID;
atomKey = "," + JU.PT.getQuotedAttribute (peakScript, "atom") + ",";
type = "ID";
jmolSource = sourceID;
}var pi = this.selectPanelByPeak (file, index, atomKey);
var pd = this.pd ();
pd.selectSpectrum (file, type, model, true);
this.si.siSendPanelChange ();
pd.addPeakHighlight (pi);
this.repaint (true);
if (jmolSource == null || (pi != null && pi.getAtoms () != null)) this.si.syncToJmol (this.jmolSelect (pi));
}, "~S");
Clazz.defineMethod (c$, "syncPeaksAfterSyncScript", 
 function () {
var source = this.currentSource;
if (source == null) return;
try {
var file = "file=" + JU.PT.esc (source.getFilePath ());
var peaks = source.getSpectra ().get (0).getPeakList ();
var sb =  new JU.SB ();
sb.append ("[");
var n = peaks.size ();
for (var i = 0; i < n; i++) {
var s = peaks.get (i).toString ();
s = s + " " + file;
sb.append (JU.PT.esc (s));
if (i > 0) sb.append (",");
}
sb.append ("]");
this.si.syncToJmol ("Peaks: " + sb);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "checkFileAlreadyLoaded", 
 function (fileName) {
if (this.isClosed ()) return false;
if (this.pd ().hasFileLoaded (fileName)) return true;
for (var i = this.panelNodes.size (); --i >= 0; ) if (this.panelNodes.get (i).pd ().hasFileLoaded (fileName)) {
this.si.siSetSelectedPanel (this.panelNodes.get (i).jsvp);
return true;
}
return false;
}, "~S");
Clazz.defineMethod (c$, "selectPanelByPeak", 
 function (file, index, atomKey) {
if (this.panelNodes == null) return null;
var pi = null;
for (var i = this.panelNodes.size (); --i >= 0; ) this.panelNodes.get (i).pd ().addPeakHighlight (null);

pi = this.pd ().selectPeakByFileIndex (file, index, atomKey);
if (pi != null) {
this.setNode (JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes));
} else {
for (var i = this.panelNodes.size (); --i >= 0; ) {
var node = this.panelNodes.get (i);
if ((pi = node.pd ().selectPeakByFileIndex (file, index, atomKey)) != null) {
this.setNode (node);
break;
}}
}return pi;
}, "~S,~S,~S");
Clazz.defineMethod (c$, "processPeakPickEvent", 
function (eventObj, isApp) {
var pi;
if (Clazz.instanceOf (eventObj, JSV.common.PeakInfo)) {
pi = eventObj;
var pi2 = this.pd ().findMatchingPeakInfo (pi);
if (pi2 == null) {
if (!"ALL".equals (pi.getTitle ())) return;
var node = null;
for (var i = 0; i < this.panelNodes.size (); i++) if ((pi2 = this.panelNodes.get (i).pd ().findMatchingPeakInfo (pi)) != null) {
node = this.panelNodes.get (i);
break;
}
if (node == null) return;
this.setNode (node);
}pi = pi2;
} else {
var e = (eventObj);
this.si.siSetSelectedPanel (e.getSource ());
pi = e.getPeakInfo ();
}this.pd ().addPeakHighlight (pi);
this.syncToJmol (pi);
if (pi.isClearAll ()) this.repaint (false);
 else this.pd ().selectSpectrum (pi.getFilePath (), pi.getType (), pi.getModel (), true);
this.si.siCheckCallbacks (pi.getTitle ());
}, "~O,~B");
Clazz.defineMethod (c$, "newStructToJmol", 
function (data) {
JU.Logger.info ("sending new structure to Jmol:\n" + data);
this.si.syncToJmol ("struct:" + data);
}, "~S");
Clazz.defineMethod (c$, "syncToJmol", 
 function (pi) {
this.repaint (true);
this.returnFromJmolModel = pi.getModel ();
this.si.syncToJmol (this.jmolSelect (pi));
}, "JSV.common.PeakInfo");
Clazz.defineMethod (c$, "sendPanelChange", 
function () {
var pd = this.pd ();
var spec = pd.getSpectrum ();
var pi = spec.getSelectedPeak ();
if (pi == null) pi = spec.getModelPeakInfoForAutoSelectOnLoad ();
if (pi == null) pi = spec.getBasePeakInfo ();
pd.addPeakHighlight (pi);
JU.Logger.info (Thread.currentThread () + "JSViewer sendFrameChange " + this.selectedPanel);
this.syncToJmol (pi);
});
Clazz.defineMethod (c$, "jmolSelect", 
 function (pi) {
var script = ("IR".equals (pi.getType ()) || "RAMAN".equals (pi.getType ()) ? "vibration ON; selectionHalos OFF;" : "vibration OFF; selectionhalos " + (pi.getAtoms () == null ? "OFF" : "ON"));
return "Select: " + pi + " script=\"" + script + " \" sourceID=\"" + this.pd ().getSpectrum ().sourceID + "\"";
}, "JSV.common.PeakInfo");
Clazz.defineMethod (c$, "getPropertyAsJavaObject", 
function (key) {
var map =  new java.util.Hashtable ();
if ("SOURCEID".equalsIgnoreCase (key)) {
map.put (key, (this.pd () == null ? "" : this.pd ().getSpectrum ().sourceID));
return map;
}if (key != null && key.startsWith ("DATA_")) {
map.put (key, "" + JSV.common.JSVFileManager.cacheGet (key.substring (5)));
return map;
}var isAll = false;
if (key != null && key.toUpperCase ().startsWith ("ALL ") || "all".equalsIgnoreCase (key)) {
key = key.substring (3).trim ();
isAll = true;
}if ("".equals (key)) key = null;
if ("NAMES".equalsIgnoreCase (key) || "KEYS".equalsIgnoreCase (key)) key = "";
var map0 = this.pd ().getInfo (true, key);
if (!isAll && map0 != null) return map0;
if (map0 != null) map.put ("current", map0);
var info =  new JU.Lst ();
for (var i = 0; i < this.panelNodes.size (); i++) {
var jsvp = this.panelNodes.get (i).jsvp;
if (jsvp == null) continue;
info.addLast (this.panelNodes.get (i).getInfo (key));
}
map.put ("items", info);
return map;
}, "~S");
Clazz.defineMethod (c$, "getCoordinate", 
function () {
if (!this.isClosed ()) {
var coord = this.pd ().getClickedCoordinate ();
if (coord != null) return coord.getXVal () + " " + coord.getYVal ();
}return "";
});
Clazz.defineMethod (c$, "fillSpecList", 
 function (value, speclist, isView) {
var prefix = "1.";
var list;
var list0 = null;
var isNone = (value.equalsIgnoreCase ("NONE"));
if (isNone || value.equalsIgnoreCase ("all")) value = "*";
if (value.indexOf ("*") < 0) {
var tokens = value.$plit (" ");
var sb =  new JU.SB ();
for (var i = 0; i < tokens.length; i++) {
var pt = tokens[i].indexOf ('.');
if (pt != tokens[i].lastIndexOf ('.')) tokens[i] = tokens[i].substring (0, pt + 1) + tokens[i].substring (pt + 1).$replace ('.', '_');
sb.append (tokens[i]).append (" ");
}
value = sb.toString ().trim ();
}if (value.equals ("*")) {
list = JSV.common.ScriptToken.getTokens (JSV.common.PanelNode.getSpectrumListAsString (this.panelNodes));
} else if (value.startsWith ("\"") || value.startsWith ("'")) {
list = JSV.common.ScriptToken.getTokens (value);
} else {
value = JU.PT.rep (value, "_", " _ ");
value = JU.PT.rep (value, "-", " - ");
list = JSV.common.ScriptToken.getTokens (value);
list0 = JSV.common.ScriptToken.getTokens (JSV.common.PanelNode.getSpectrumListAsString (this.panelNodes));
if (list0.size () == 0) return null;
}var id0 = (this.isClosed () ? prefix : JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes).id);
id0 = id0.substring (0, id0.indexOf (".") + 1);
var sb =  new JU.SB ();
var n = list.size ();
var idLast = null;
for (var i = 0; i < n; i++) {
var id = list.get (i);
var userYFactor = NaN;
var isubspec = -1;
if (i + 1 < n && list.get (i + 1).equals ("*")) {
i += 2;
userYFactor = Double.parseDouble (list.get (i));
} else if (i + 1 < n && list.get (i + 1).equals ("_")) {
i += 2;
isubspec = Integer.parseInt (list.get (i));
}if (id.equals ("-")) {
if (idLast == null) idLast = list0.get (0);
id = (i + 1 == n ? list0.get (list0.size () - 1) : list.get (++i));
if (!id.contains (".")) id = id0 + id;
var pt = 0;
while (pt < list0.size () && !list0.get (pt).equals (idLast)) pt++;

pt++;
while (pt < list0.size () && !idLast.equals (id)) {
var node = JSV.common.PanelNode.findNodeById ((idLast = list0.get (pt++)), this.panelNodes);
speclist.addLast (node.pd ().getSpectrumAt (0));
sb.append (",").append (idLast);
}
continue;
}var node;
if (id.startsWith ("'") && id.endsWith ("'")) id = "\"" + JU.PT.trim (id, "'") + "\"";
if (id.startsWith ("\"")) {
id = JU.PT.trim (id, "\"");
var pn = this.panelNodes.size ();
for (var j = 0; j < pn; j++) {
node = this.panelNodes.get (j);
if (node.fileName != null && node.fileName.startsWith (id) || node.frameTitle != null && node.frameTitle.startsWith (id)) {
this.addSpecToList (node.pd (), userYFactor, -1, speclist, isView);
sb.append (",").append (node.id);
}}
continue;
}if (!id.contains (".")) id = id0 + id;
node = JSV.common.PanelNode.findNodeById (id, this.panelNodes);
if (node == null) continue;
idLast = id;
this.addSpecToList (node.pd (), userYFactor, isubspec, speclist, isView);
sb.append (",").append (id);
if (isubspec > 0) sb.append (".").appendI (isubspec);
}
if (isView && speclist.size () > 0) {
var node = JSV.common.PanelNode.findNodeById (sb.substring (1), this.panelNodes);
if (node != null) {
this.setNode (node);
speclist.clear ();
}}return (isNone ? "NONE" : sb.length () > 0 ? sb.toString ().substring (1) : null);
}, "~S,JU.Lst,~B");
Clazz.defineMethod (c$, "addSpecToList", 
 function (pd, userYFactor, isubspec, list, isView) {
if (isView) {
var spec = pd.getSpectrumAt (0);
spec.setUserYFactor (Double.isNaN (userYFactor) ? 1 : userYFactor);
pd.addToList (isubspec - 1, list);
} else {
pd.selectFromEntireSet (isubspec - 1);
}}, "JSV.common.PanelData,~N,~N,JU.Lst,~B");
Clazz.defineMethod (c$, "getSolutionColor", 
function (asFitted) {
var spectrum = this.pd ().getSpectrum ();
var vi = (spectrum.canShowSolutionColor () ? JSV.common.JSViewer.getInterface ("JSV.common.Visible") : null);
return (vi == null ? -1 : vi.getColour (spectrum, asFitted));
}, "~B");
Clazz.defineMethod (c$, "openDataOrFile", 
function (data, name, specs, strUrl, firstSpec, lastSpec, isAppend, id) {
if ("NONE".equals (name)) {
this.close ("View*");
return 0;
}this.si.writeStatus ("");
var filePath = null;
var newPath = null;
var fileName = null;
var isView = false;
if (strUrl != null && strUrl.startsWith ("cache://")) {
{
data = Jmol.Cache.get(name = strUrl);
}}if (data != null) {
try {
fileName = name;
newPath = filePath = JSV.common.JSVFileManager.getFullPathName (name);
} catch (e) {
if (Clazz.exceptionOf (e, JSV.exception.JSVException)) {
} else {
throw e;
}
}
} else if (specs != null) {
isView = true;
newPath = fileName = filePath = "View" + (++this.nViews);
} else if (strUrl != null) {
try {
var u =  new java.net.URL (JSV.common.JSVFileManager.appletDocumentBase, strUrl, null);
filePath = u.toString ();
this.recentURL = filePath;
fileName = JSV.common.JSVFileManager.getTagName (filePath);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
var file = this.apiPlatform.newFile (strUrl);
fileName = file.getName ();
newPath = filePath = file.getFullPath ();
this.recentURL = null;
} else {
throw e;
}
}
}var pt = -1;
if ((pt = JSV.common.PanelNode.isOpen (this.panelNodes, filePath)) >= 0 || (pt = JSV.common.PanelNode.isOpen (this.panelNodes, strUrl)) >= 0) {
if (isView) {
--this.nViews;
this.setNode (this.panelNodes.get (pt));
} else {
this.si.writeStatus (filePath + " is already open");
}return -1;
}if (!isAppend && !isView) this.close ("all");
this.si.setCursor (3);
try {
this.si.siSetCurrentSource (isView ? JSV.source.JDXSource.createView (specs) : JSV.source.JDXReader.createJDXSource (data, filePath, this.obscureTitleFromUser === Boolean.TRUE, this.loadImaginary, firstSpec, lastSpec, this.nmrMaxY));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
{
alert(e.toString())
}this.si.setCursor (0);
if (this.isApplet) {
this.selectedPanel.showMessage (e.toString (), "Error Opening File");
}return -3;
} else {
throw e;
}
}
this.si.setCursor (0);
System.gc ();
if (newPath == null) {
newPath = this.currentSource.getFilePath ();
if (newPath != null) fileName = newPath.substring (newPath.lastIndexOf ("/") + 1);
} else {
this.currentSource.setFilePath (newPath);
}if (id == null && !isView) id = newPath;
if (id != null) this.currentSource.setID (id);
this.si.siSetLoaded (fileName, newPath);
var spec = this.currentSource.getJDXSpectrum (0);
if (spec == null) {
return -4;
}specs = this.currentSource.getSpectra ();
JSV.common.Spectrum.process (specs, this.irMode);
var autoOverlay = this.interfaceOverlaid || spec.isAutoOverlayFromJmolClick ();
var combine = isView || autoOverlay && this.currentSource.isCompoundSource;
if (combine) {
this.combineSpectra ((isView ? strUrl : null));
} else {
this.splitSpectra ();
}this.pd ().setTaintedAll ();
if (!isView) this.si.siUpdateRecentMenus (filePath);
return 0;
}, "~O,~S,JU.Lst,~S,~N,~N,~B,~S");
Clazz.defineMethod (c$, "close", 
function (value) {
var n0 = 0;
var pt = (value == null ? -2 : value.indexOf (">"));
if (pt > 0) {
n0 = JU.PT.parseInt (value.substring (pt + 1).trim ());
value = value.substring (0, pt).trim ();
}if ("*".equals (value)) value = "all";
var isAll = (value === "all");
if (value == null || n0 == 0 && value.equalsIgnoreCase ("all")) {
this.closeSource (null);
return;
}var isViews = value.equalsIgnoreCase ("views");
var list =  new JU.Lst ();
var source;
value = value.$replace ('\\', '/');
var n = this.panelNodes.size ();
var nMax = n - n0;
if (value.endsWith ("*")) {
value = value.substring (0, value.length - 1);
for (var i = n; --i >= 0; ) if (this.panelNodes.get (i).fileName.startsWith (value)) list.addLast (this.panelNodes.get (i).source);

} else if (value.equalsIgnoreCase ("selected")) {
var lastSource = null;
for (var i = n; --i >= 0; ) {
source = this.panelNodes.get (i).source;
if (this.panelNodes.get (i).isSelected && (lastSource == null || lastSource !== source)) list.addLast (source);
lastSource = source;
}
} else if (isAll || isViews || value.equalsIgnoreCase ("simulations")) {
for (var n1 = 0, i = n; --i >= 0 && n1 < nMax; ) if (isAll ? true : isViews ? this.panelNodes.get (i).isView : this.panelNodes.get (i).isSimulation) {
list.addLast (this.panelNodes.get (i).source);
n1++;
}
} else {
source = (value.length == 0 ? this.currentSource : JSV.common.PanelNode.findSourceByNameOrId (value, this.panelNodes));
if (source != null) list.addLast (source);
}for (var i = list.size (); --i >= 0; ) this.closeSource (list.get (i));

if (this.selectedPanel == null && this.panelNodes.size () > 0) this.si.siSetSelectedPanel (JSV.common.PanelNode.getLastFileFirstNode (this.panelNodes));
}, "~S");
Clazz.defineMethod (c$, "execLoad", 
function (value, script) {
var applet = this.html5Applet;
var isID = false;
if (isID) {
applet._search (value);
return;
}var tokens = JSV.common.ScriptToken.getTokens (value);
var filename = tokens.get (0);
var id = null;
var pt = 0;
if (filename.equalsIgnoreCase ("ID")) {
id = JU.PT.trimQuotes (tokens.get (1));
filename = tokens.get (2);
pt = 2;
}var isAppend = filename.equalsIgnoreCase ("APPEND");
var isCheck = filename.equalsIgnoreCase ("CHECK");
if (isAppend || isCheck) pt++;
if (pt > 0) filename = tokens.get (pt);
if (script == null) script = this.defaultLoadScript;
if (filename.equals ("?")) {
this.openFileFromDialog (isAppend, false, null, script);
return;
}if (filename.equals ("http://?")) {
this.openFileFromDialog (isAppend, true, null, null);
return;
}if (filename.equals ("$?") || filename.equals ("$H1?")) {
this.openFileFromDialog (isAppend, true, "H1", null);
return;
}if (filename.equals ("$C13?")) {
this.openFileFromDialog (isAppend, true, "C13", null);
return;
}var isH1 = filename.equalsIgnoreCase ("MOL") || filename.equalsIgnoreCase ("H1");
var isC13 = filename.equalsIgnoreCase ("C13");
if (isH1 || isC13) filename = "http://SIMULATION/" + (isH1 ? "H1/" : "C13/") + "MOL=" + JU.PT.trimQuotes (tokens.get (++pt));
if (!isCheck && !isAppend) {
if (filename.equals ("\"\"") && this.currentSource != null) filename = this.currentSource.getFilePath ();
this.close ("all");
}filename = JU.PT.trimQuotes (filename);
var isSimulation = filename.startsWith ("$");
if (isSimulation) {
if (!filename.startsWith ("$H1") && !filename.startsWith ("$C13")) filename = "$H1/" + filename.substring (1);
filename = "http://SIMULATION/" + filename.substring (1);
}var firstSpec = (pt + 1 < tokens.size () ? Integer.$valueOf (tokens.get (++pt)).intValue () : -1);
var lastSpec = (pt + 1 < tokens.size () ? Integer.$valueOf (tokens.get (++pt)).intValue () : firstSpec);
this.si.siOpenDataOrFile (null, null, null, filename, firstSpec, lastSpec, isAppend, script, id);
if (isSimulation) {
this.close ("views");
this.execView ("*", true);
}}, "~S,~S");
Clazz.defineMethod (c$, "combineSpectra", 
function (name) {
var source = this.currentSource;
var specs = source.getSpectra ();
var haveSimulation = false;
for (var i = specs.size (); --i >= 0; ) if (specs.get (i).isSimulation) {
haveSimulation = true;
break;
}
var jsvp = this.si.siGetNewJSVPanel2 (specs);
jsvp.setTitle (source.getTitle ());
if (jsvp.getTitle ().equals ("")) {
jsvp.getPanelData ().setViewTitle (source.getFilePath ());
jsvp.setTitle (name);
}this.si.siSetPropertiesFromPreferences (jsvp, true);
this.spectraTree.createTree (++this.fileCount, source,  Clazz.newArray (-1, [jsvp])).getPanelNode ().isView = true;
var node = JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes);
node.setFrameTitle (name);
node.isView = true;
if (this.autoShowLegend && this.pd ().getNumberOfGraphSets () == 1) node.setLegend (this.getDialog (JSV.common.Annotation.AType.OverlayLegend, null));
this.si.siSetMenuEnables (node, false);
if (haveSimulation) this.pd ().splitStack (true);
}, "~S");
Clazz.defineMethod (c$, "closeSource", 
function (source) {
var rootNode = this.spectraTree.getRootNode ();
var fileName = (source == null ? null : source.getFilePath ());
var toDelete =  new JU.Lst ();
var enume = rootNode.children ();
while (enume.hasMoreElements ()) {
var node = enume.nextElement ();
if (fileName == null || node.getPanelNode ().source.matchesFilePath (fileName)) {
JU.Logger.info ("Closing " + node.getPanelNode ().source.getFilePath ());
for (var e = node.children (); e.hasMoreElements (); ) {
var childNode = e.nextElement ();
toDelete.addLast (childNode);
this.panelNodes.removeObj (childNode.getPanelNode ());
}
toDelete.addLast (node);
if (fileName != null) break;
}}
this.spectraTree.deleteNodes (toDelete);
if (source == null) {
if (this.currentSource != null) this.currentSource.dispose ();
this.currentSource = null;
if (this.selectedPanel != null) this.selectedPanel.dispose ();
} else {
}if (this.currentSource === source) {
this.si.siSetSelectedPanel (null);
this.si.siSetCurrentSource (null);
}var max = 0;
for (var i = 0; i < this.panelNodes.size (); i++) {
var f = JU.PT.parseFloat (this.panelNodes.get (i).id);
if (f >= max + 1) max = Clazz.doubleToInt (Math.floor (f));
}
this.fileCount = max;
System.gc ();
if (JU.Logger.debugging) JU.Logger.checkMemory ();
this.si.siSourceClosed (source);
}, "JSV.source.JDXSource");
Clazz.defineMethod (c$, "setFrameAndTreeNode", 
function (i) {
if (this.panelNodes == null || i < 0 || i >= this.panelNodes.size ()) return;
this.setNode (this.panelNodes.get (i));
}, "~N");
Clazz.defineMethod (c$, "selectFrameNode", 
function (jsvp) {
var node = JSV.common.PanelNode.findNode (jsvp, this.panelNodes);
if (node == null) return null;
this.spectraTree.setPath (this.spectraTree.newTreePath (node.treeNode.getPath ()));
this.setOverlayLegendVisibility (null, false);
return node;
}, "JSV.api.JSVPanel");
Clazz.defineMethod (c$, "setSpectrum", 
 function (value) {
if (value.indexOf ('.') >= 0) {
var node = JSV.common.PanelNode.findNodeById (value, this.panelNodes);
if (node == null) return false;
this.setNode (node);
} else {
var n = JU.PT.parseInt (value);
if (n <= 0) {
this.checkOverlay ();
return false;
}this.setFrameAndTreeNode (n - 1);
}return true;
}, "~S");
Clazz.defineMethod (c$, "splitSpectra", 
function () {
var source = this.currentSource;
var specs = source.getSpectra ();
var panels =  new Array (specs.size ());
var jsvp = null;
for (var i = 0; i < specs.size (); i++) {
var spec = specs.get (i);
jsvp = this.si.siGetNewJSVPanel (spec);
this.si.siSetPropertiesFromPreferences (jsvp, true);
panels[i] = jsvp;
}
this.spectraTree.createTree (++this.fileCount, source, panels);
this.si.siGetNewJSVPanel (null);
var node = JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes);
this.si.siSetMenuEnables (node, true);
});
Clazz.defineMethod (c$, "selectedTreeNode", 
function (node) {
if (node == null) {
return;
}if (node.isLeaf ()) {
this.setNode (node.getPanelNode ());
} else {
System.out.println ("not a leaf");
}this.si.siSetCurrentSource (node.getPanelNode ().source);
}, "JSV.api.JSVTreeNode");
Clazz.defineMethod (c$, "dispose", 
function () {
this.fileHelper = null;
if (this.viewDialog != null) this.viewDialog.dispose ();
this.viewDialog = null;
if (this.overlayLegendDialog != null) this.overlayLegendDialog.dispose ();
this.overlayLegendDialog = null;
if (this.jsvpPopupMenu != null) {
this.jsvpPopupMenu.jpiDispose ();
this.jsvpPopupMenu = null;
}if (this.panelNodes != null) for (var i = this.panelNodes.size (); --i >= 0; ) {
this.panelNodes.get (i).dispose ();
this.panelNodes.removeItemAt (i);
}
});
Clazz.defineMethod (c$, "runScript", 
function (script) {
if (this.scriptQueue == null) this.si.siProcessCommand (script);
 else this.scriptQueue.addLast (script);
}, "~S");
Clazz.defineMethod (c$, "requestRepaint", 
function () {
if (this.selectedPanel != null) this.repaintManager.refresh ();
});
Clazz.defineMethod (c$, "repaintDone", 
function () {
this.repaintManager.repaintDone ();
});
Clazz.defineMethod (c$, "checkOverlay", 
function () {
if (this.mainPanel != null) this.markSelectedPanels (this.panelNodes, this.mainPanel.getCurrentPanelIndex ());
this.viewDialog = this.getDialog (JSV.common.Annotation.AType.Views, null);
});
Clazz.defineMethod (c$, "markSelectedPanels", 
 function (panelNodes, ip) {
for (var i = panelNodes.size (); --i >= 0; ) panelNodes.get (i).isSelected = (ip == i);

}, "JU.Lst,~N");
Clazz.defineMethod (c$, "execOverlayOffsetY", 
 function (offset) {
if (offset == -2147483648) {
if (this.selectedPanel == null) return;
var soffset = this.selectedPanel.getInput ("Enter a vertical offset in percent for stacked plots", "Overlay", "" + this.recentStackPercent);
var f = JU.PT.parseFloat (soffset);
if (Float.isNaN (f)) return;
offset = Clazz.floatToInt (f);
}this.recentStackPercent = offset;
this.parameters.viewOffset = offset;
if (this.isClosed ()) this.pd ().setYStackOffsetPercent (offset);
}, "~N");
Clazz.defineMethod (c$, "execScriptInline", 
 function (script) {
if (script.length > 0) script = script.substring (6).trim ();
if (script.length == 0) script = this.selectedPanel.getInput ("Enter a JSpecView script", "Script", this.recentScript);
if (script == null) return;
this.recentScript = script;
this.runScriptNow (script);
}, "~S");
Clazz.defineMethod (c$, "setDisplay", 
function (canvas) {
this.apiPlatform.setViewer (this, this.display = canvas);
var wh =  Clazz.newIntArray (2, 0);
this.apiPlatform.getFullScreenDimensions (canvas, wh);
this.setScreenDimension (wh[0], wh[1]);
}, "~O");
Clazz.defineMethod (c$, "setScreenDimension", 
function (width, height) {
height = Math.min (height, this.maximumSize);
width = Math.min (width, this.maximumSize);
if (this.screenWidth == width && this.screenHeight == height) return;
this.resizeImage (width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "resizeImage", 
function (width, height) {
if (width > 0) {
this.screenWidth = width;
this.screenHeight = height;
} else {
width = (this.screenWidth == 0 ? this.screenWidth = 500 : this.screenWidth);
height = (this.screenHeight == 0 ? this.screenHeight = 500 : this.screenHeight);
}this.g2d.setWindowParameters (width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "updateJS", 
function () {
if (this.selectedPanel != null) this.selectedPanel.paintComponent (this.apiPlatform.getGraphics (null));
});
Clazz.defineMethod (c$, "processMouseEvent", 
function (id, x, y, modifiers, time) {
return (this.selectedPanel != null && this.selectedPanel.processMouseEvent (id, x, y, modifiers, time));
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "processTwoPointGesture", 
function (touches) {
if (!this.isClosed ()) this.selectedPanel.processTwoPointGesture (touches);
}, "~A");
Clazz.defineMethod (c$, "getApplet", 
function () {
return this.html5Applet;
});
Clazz.defineMethod (c$, "openFileAsyncSpecial", 
function (fileName, flags) {
var ans = (this.currentSource == null ? "NO" : this.getDialogManager ().getDialogInput (this, "Do you want to append this file? (Answer NO to replace.)", "Drag/Drop Action", 3, null, null, "YES"));
if (ans == null) return;
var pre = (ans.toLowerCase ().startsWith ("y") ? "append" : "");
var post = (pre === "" ? "" : "; view *");
this.runScript ("load " + pre + " \"" + fileName + "\"" + post);
}, "~S,~N");
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.screenHeight;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.screenWidth;
});
Clazz.defineMethod (c$, "getPlatformInterface", 
function (type) {
return JSV.common.JSViewer.getInterface ("JSV." + (JSV.common.JSViewer.isJS ? "js2d.Js" : "java.Awt") + type);
}, "~S");
Clazz.defineMethod (c$, "getDialogManager", 
function () {
if (this.dialogManager != null) return this.dialogManager;
this.dialogManager = this.getPlatformInterface ("DialogManager");
return this.dialogManager.set (this);
});
Clazz.defineMethod (c$, "getDialog", 
function (type, spec) {
var root = "JSV.dialog.";
switch (type) {
case JSV.common.Annotation.AType.Integration:
return (JSV.common.JSViewer.getInterface (root + "IntegrationDialog")).setParams ("Integration for " + spec, this, spec);
case JSV.common.Annotation.AType.Measurements:
return (JSV.common.JSViewer.getInterface (root + "MeasurementsDialog")).setParams ("Measurements for " + spec, this, spec);
case JSV.common.Annotation.AType.PeakList:
return (JSV.common.JSViewer.getInterface (root + "PeakListDialog")).setParams ("Peak List for " + spec, this, spec);
case JSV.common.Annotation.AType.OverlayLegend:
return this.overlayLegendDialog = (JSV.common.JSViewer.getInterface (root + "OverlayLegendDialog")).setParams (this.pd ().getViewTitle (), this, null);
case JSV.common.Annotation.AType.Views:
return this.viewDialog = (JSV.common.JSViewer.getInterface (root + "ViewsDialog")).setParams ("View/Combine/Close Spectra", this, null);
default:
return null;
}
}, "JSV.common.Annotation.AType,JSV.common.Spectrum");
Clazz.defineMethod (c$, "show", 
 function (what) {
this.getDialogManager ();
if (what.equals ("properties")) {
this.dialogManager.showProperties (null, this.pd ().getSpectrum ());
} else if (what.equals ("errors")) {
this.dialogManager.showSourceErrors (null, this.currentSource);
} else if (what.equals ("source")) {
if (this.currentSource == null) {
if (this.panelNodes.size () > 0) this.dialogManager.showMessageDialog (null, "Please Select a Spectrum", "Select Spectrum", 0);
return;
}this.dialogManager.showSource (this, this.pd ().getSpectrum ());
} else if (what.startsWith ("solutioncolorfill")) {
if (what.indexOf ("all") >= 0) {
for (var i = this.panelNodes.size (); --i >= 0; ) this.panelNodes.get (i).pd ().setSolutionColor (what);

} else {
this.pd ().setSolutionColor (what);
}} else if (what.startsWith ("solutioncolor")) {
var msg = this.getSolutionColorStr (what.indexOf ("false") < 0);
msg = "background-color:rgb(" + msg + ")'><br />Predicted Solution Colour- RGB(" + msg + ")<br /><br />";
if (JSV.common.JSViewer.isJS) {
this.dialogManager.showMessage (this, "<div style='width:100%;height:100%;" + msg + "</div>", "Predicted Colour");
} else {
this.selectedPanel.showMessage ("<html><body style='" + msg + "</body></html>", "Predicted Colour");
}}}, "~S");
Clazz.defineMethod (c$, "getDialogPrint", 
function (isJob) {
if (!JSV.common.JSViewer.isJS) try {
var pl = (this.getPlatformInterface ("PrintDialog")).set (this.offWindowFrame, this.lastPrintLayout, isJob).getPrintLayout ();
if (pl != null) this.lastPrintLayout = pl;
return pl;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return  new JSV.common.PrintLayout (this.pd ());
}, "~B");
Clazz.defineMethod (c$, "setIRmode", 
function (mode) {
if (mode.equals ("AtoT")) {
this.irMode = JSV.common.Spectrum.IRMode.TO_TRANS;
} else if (mode.equals ("TtoA")) {
this.irMode = JSV.common.Spectrum.IRMode.TO_ABS;
} else {
this.irMode = JSV.common.Spectrum.IRMode.getMode (mode);
}}, "~S");
Clazz.defineMethod (c$, "getOptionFromDialog", 
function (items, title, label) {
return this.getDialogManager ().getOptionFromDialog (null, items, this.selectedPanel, title, label);
}, "~A,~S,~S");
Clazz.defineMethod (c$, "print", 
function (fileName) {
return this.execWrite ("PDF \"" + fileName + "\"");
}, "~S");
Clazz.defineMethod (c$, "execWrite", 
 function (value) {
if (JSV.common.JSViewer.isJS && value == null) value = "PDF";
var msg = (JSV.common.JSViewer.getInterface ("JSV.export.Exporter")).write (this, value == null ? null : JSV.common.ScriptToken.getTokens (value), false);
this.si.writeStatus (msg);
return msg;
}, "~S");
Clazz.defineMethod (c$, "$export", 
function (type, n) {
if (type == null) type = "XY";
var pd = this.pd ();
var nMax = pd.getNumberOfSpectraInCurrentSet ();
if (n < -1 || n >= nMax) return "Maximum spectrum index (0-based) is " + (nMax - 1) + ".";
var spec = (n < 0 ? pd.getSpectrum () : pd.getSpectrumAt (n));
try {
return (JSV.common.JSViewer.getInterface ("JSV.export.Exporter")).exportTheSpectrum (this, JSV.common.ExportType.getType (type), null, spec, 0, spec.getXYCoords ().length - 1, null, type.equalsIgnoreCase ("PDF"));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error (e.toString ());
return null;
} else {
throw e;
}
}
}, "~S,~N");
Clazz.overrideMethod (c$, "postByteArray", 
function (fileName, bytes) {
return JSV.common.JSVFileManager.postByteArray (fileName, bytes);
}, "~S,~A");
Clazz.defineMethod (c$, "getOutputChannel", 
function (fileName, isBinary) {
var os = null;
{
while (fileName.startsWith("/")) fileName =
fileName.substring(1);
}return  new JU.OC ().setParams (this, fileName, !isBinary, os);
}, "~S,~B");
c$.getInterface = Clazz.defineMethod (c$, "getInterface", 
function (name) {
try {
var x = Clazz._4Name (name);
return (x == null ? null : x.newInstance ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Interface.java Error creating instance for " + name + ": \n" + e);
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "showMessage", 
function (msg) {
if (this.selectedPanel != null && msg != null) this.selectedPanel.showMessage (msg, null);
}, "~S");
Clazz.defineMethod (c$, "openFileFromDialog", 
function (isAppend, isURL, simulationType, script) {
var url = null;
if (simulationType != null) {
url = this.fileHelper.getUrlFromDialog ("Enter the name or identifier of a compound", this.recentSimulation);
if (url == null) return;
this.recentSimulation = url;
url = "$" + simulationType + "/" + url;
} else if (isURL) {
url = this.fileHelper.getUrlFromDialog ("Enter the URL of a JCAMP-DX File", this.recentURL == null ? this.recentOpenURL : this.recentURL);
if (url == null) return;
this.recentOpenURL = url;
} else {
var userData =  Clazz.newArray (-1, [Boolean.$valueOf (isAppend), script]);
var file = this.fileHelper.showFileOpenDialog (this.mainPanel, userData);
if (file != null) url = file.getFullPath ();
}if (url != null) this.runScriptNow ("load " + (isAppend ? "APPEND " : "") + "\"" + url + "\"" + (script == null ? "" : ";" + script));
}, "~B,~B,~S,~S");
Clazz.defineMethod (c$, "openFile", 
function (fileName, closeFirst) {
if (closeFirst && this.panelNodes != null) {
var source = JSV.common.PanelNode.findSourceByNameOrId (( new java.io.File (fileName)).getAbsolutePath (), this.panelNodes);
if (source != null) this.closeSource (source);
}this.si.siOpenDataOrFile (null, null, null, fileName, -1, -1, true, this.defaultLoadScript, null);
}, "~S,~B");
Clazz.defineMethod (c$, "selectPanel", 
function (jsvp, panelNodes) {
var iPanel = -1;
if (panelNodes != null) {
for (var i = panelNodes.size (); --i >= 0; ) {
var j = panelNodes.get (i).jsvp;
if (j === jsvp) {
iPanel = i;
} else {
j.setEnabled (false);
j.setFocusable (false);
j.getPanelData ().closeAllDialogsExcept (JSV.common.Annotation.AType.NONE);
}}
this.markSelectedPanels (panelNodes, iPanel);
}return iPanel;
}, "JSV.api.JSVPanel,JU.Lst");
Clazz.defineMethod (c$, "checkAutoIntegrate", 
function () {
if (this.autoIntegrate) this.pd ().integrateAll (this.parameters);
});
Clazz.defineMethod (c$, "parseInitScript", 
function (params) {
if (params == null) params = "";
var allParamTokens =  new JSV.common.ScriptTokenizer (params, true);
if (JU.Logger.debugging) {
JU.Logger.info ("Running in DEBUG mode");
}while (allParamTokens.hasMoreTokens ()) {
var token = allParamTokens.nextToken ();
var eachParam =  new JSV.common.ScriptTokenizer (token, false);
var key = eachParam.nextToken ();
if (key.equalsIgnoreCase ("SET")) key = eachParam.nextToken ();
key = key.toUpperCase ();
var st = JSV.common.ScriptToken.getScriptToken (key);
var value = JSV.common.ScriptToken.getValue (st, eachParam, token);
JU.Logger.info ("KEY-> " + key + " VALUE-> " + value + " : " + st);
try {
switch (st) {
default:
this.parameters.set (null, st, value);
break;
case JSV.common.ScriptToken.UNKNOWN:
break;
case JSV.common.ScriptToken.APPLETID:
this.fullName = this.appletName + "__" + (this.appletName = value) + "__";
var applet = null;
{
self.Jmol && (applet = Jmol._applets[value]);
}this.html5Applet = applet;
break;
case JSV.common.ScriptToken.AUTOINTEGRATE:
this.autoIntegrate = JSV.common.Parameters.isTrue (value);
break;
case JSV.common.ScriptToken.COMPOUNDMENUON:
break;
case JSV.common.ScriptToken.APPLETREADYCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
this.si.siExecSetCallback (st, value);
break;
case JSV.common.ScriptToken.ENDINDEX:
this.initialEndIndex = Integer.parseInt (value);
break;
case JSV.common.ScriptToken.INTERFACE:
this.checkOvelayInterface (value);
break;
case JSV.common.ScriptToken.IRMODE:
this.setIRmode (value);
break;
case JSV.common.ScriptToken.MENUON:
this.allowMenu = Boolean.parseBoolean (value);
break;
case JSV.common.ScriptToken.OBSCURE:
if (this.obscureTitleFromUser == null) this.obscureTitleFromUser = Boolean.$valueOf (value);
break;
case JSV.common.ScriptToken.STARTINDEX:
this.initialStartIndex = Integer.parseInt (value);
break;
case JSV.common.ScriptToken.SYNCID:
this.fullName = this.appletName + "__" + (this.syncID = value) + "__";
break;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}
}, "~S");
Clazz.defineMethod (c$, "getSolutionColorStr", 
function (asFit) {
var pt = JU.CU.colorPtFromInt (this.getSolutionColor (asFit), null);
return Clazz.floatToInt (pt.x) + "," + Clazz.floatToInt (pt.y) + "," + Clazz.floatToInt (pt.z);
}, "~B");
Clazz.defineMethod (c$, "checkCommandLineForTip", 
function (c, cmd, oneLineOnly) {
var isHelp = (c == '\1');
if (!isHelp && c != '\0') {
if (c != '\t' && (c == '\n' || c.charCodeAt (0) < 32 || c.charCodeAt (0) > 126)) return null;
cmd += (Character.isISOControl (c) ? "" : "" + c);
}var tip;
if (cmd.indexOf (";") >= 0) cmd = cmd.substring (cmd.lastIndexOf (";") + 1);
var ret = null;
while (cmd.startsWith (" ")) cmd = cmd.substring (1);

if (cmd.length == 0 && !isHelp) {
tip = "";
} else {
var tokens = JSV.common.ScriptToken.getTokens (cmd);
if (tokens.size () == 0 && !isHelp) return "";
var isExact = (cmd.endsWith (" ") || tokens.size () > 1 && oneLineOnly);
var list = JSV.common.ScriptToken.getScriptTokenList (tokens.size () == 0 ? null : tokens.get (0), isExact);
switch (list.size ()) {
case 0:
tip = "?";
break;
case 1:
var st = list.get (0);
tip = st.getTip ();
try {
if (tip.indexOf ("TRUE") >= 0) tip = " (" + this.parameters.getBoolean (st) + ")";
 else if (st.name ().indexOf ("COLOR") >= 0) tip = " (" + JU.CU.toRGBHexString (this.parameters.getElementColor (st)) + ")";
 else tip = "";
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
if (c == '\t' || isExact || !oneLineOnly) {
tip = st.name () + " " + st.getTip () + tip + " " + st.getDescription ();
if (c == '\t') ret = st.name () + " ";
break;
}tip = st.name () + " " + tip;
break;
default:
tip = JSV.common.ScriptToken.getNameList (list);
}
}if (oneLineOnly) {
this.si.writeStatus (tip);
} else {
ret = tip;
}return ret;
}, "~S,~S,~B");
Clazz.defineMethod (c$, "checkScript", 
function (script) {
return this.checkCommandLineForTip ('\0', script, false);
}, "~S");
Clazz.defineMethod (c$, "execHelp", 
 function (value) {
var s = this.checkCommandLineForTip ('\1', value, false);
if (s.indexOf (" ") < 0 && s.indexOf (",") > 0) {
var tokens = JU.PT.split (s, ",");
java.util.Arrays.sort (tokens);
s = "";
for (var i = 0; i < tokens.length; i++) {
var st = JSV.common.ScriptToken.getScriptToken (tokens[i]);
s += tokens[i] + " " + st.getTip () + "\n  " + st.getDescription () + "\n\n";
}
this.getDialogManager ().showMessage (null, s, "HELP " + value);
} else {
this.selectedPanel.showMessage (s, "Help " + value);
}System.out.println (s);
}, "~S");
Clazz.defineStatics (c$,
"sourceLabel", "Original...",
"FILE_OPEN_OK", 0,
"FILE_OPEN_ALREADY", -1,
"FILE_OPEN_ERROR", -3,
"FILE_OPEN_NO_DATA", -4,
"OVERLAY_DIALOG", -1,
"OVERLAY_OFFSET", 99,
"PORTRAIT", 1,
"PAGE_EXISTS", 0,
"NO_SUCH_PAGE", 1,
"testScript", "<PeakData  index=\"1\" title=\"\" model=\"~1.1\" type=\"1HNMR\" xMin=\"3.2915\" xMax=\"3.2965\" atoms=\"15,16,17,18,19,20\" multiplicity=\"\" integral=\"1\"> src=\"JPECVIEW\" file=\"http://SIMULATION/$caffeine\"",
"NLEVEL_MAX", 100,
"isJS", false,
"isSwingJS", false,
"jmolObject", null);
});
