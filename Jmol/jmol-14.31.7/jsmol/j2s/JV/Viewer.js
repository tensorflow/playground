Clazz.declarePackage ("JV");
Clazz.load (["java.lang.Enum", "J.api.JmolViewer", "$.PlatformViewer", "J.atomdata.AtomDataServer", "java.util.Hashtable"], "JV.Viewer", ["java.io.BufferedInputStream", "$.BufferedReader", "$.Reader", "java.lang.Boolean", "$.Character", "$.Float", "$.NullPointerException", "java.util.Arrays", "JU.AU", "$.BS", "$.CU", "$.DF", "$.Lst", "$.P3", "$.P3i", "$.PT", "$.Quat", "$.Rdr", "$.SB", "J.adapter.smarter.SmarterJmolAdapter", "J.api.Interface", "$.JmolAppConsoleInterface", "J.atomdata.RadiusData", "J.c.FIL", "$.STER", "$.VDW", "J.i18n.GT", "JM.ModelSet", "JS.SV", "$.T", "J.thread.TimeoutThread", "JU.BSUtil", "$.C", "$.CommandHistory", "$.Elements", "$.Escape", "$.GData", "$.JmolMolecule", "$.Logger", "$.Parser", "$.TempArray", "JV.ActionManager", "$.AnimationManager", "$.ColorManager", "$.FileManager", "$.GlobalSettings", "$.JC", "$.ModelManager", "$.SelectionManager", "$.ShapeManager", "$.StateManager", "$.StatusManager", "$.TransformManager", "JV.binding.Binding"], function () {
c$ = Clazz.decorateAsClass (function () {
this.testAsync = false;
this.autoExit = false;
this.haveDisplay = false;
this.isSingleThreaded = false;
this.queueOnHold = false;
this.fullName = "";
this.compiler = null;
this.definedAtomSets = null;
this.ms = null;
this.fm = null;
this.isApplet = false;
this.isJNLP = false;
this.isSyntaxAndFileCheck = false;
this.isSyntaxCheck = false;
this.listCommands = false;
this.mustRender = false;
this.htmlName = "";
this.appletName = "";
this.tryPt = 0;
this.insertedCommand = "";
this.gdata = null;
this.html5Applet = null;
this.acm = null;
this.am = null;
this.cm = null;
this.dm = null;
this.shm = null;
this.slm = null;
this.rm = null;
this.g = null;
this.sm = null;
this.tm = null;
this.syncId = "";
this.logFilePath = "";
this.allowScripting = false;
this.isPrintOnly = false;
this.isSignedApplet = false;
this.isSignedAppletLocal = false;
this.isSilent = false;
this.multiTouch = false;
this.noGraphicsAllowed = false;
this.useCommandThread = false;
this.commandOptions = null;
this.vwrOptions = null;
this.display = null;
this.modelAdapter = null;
this.access = null;
this.commandHistory = null;
this.mm = null;
this.stm = null;
this.scm = null;
this.eval = null;
this.tempArray = null;
this.allowArrayDotNotation = false;
this.async = false;
this.executor = null;
this.screenWidth = 0;
this.screenHeight = 0;
this.actionStates = null;
this.actionStatesRedo = null;
this.defaultVdw = null;
this.rd = null;
this.chainMap = null;
this.chainList = null;
this.errorMessage = null;
this.errorMessageUntranslated = null;
this.privateKey = 0;
this.dataOnly = false;
this.isPreviewOnly = false;
this.headless = false;
this.movableBitSet = null;
this.mouse = null;
this.ligandModels = null;
this.ligandModelSet = null;
this.annotationParser = null;
this.dssrParser = null;
this.minimizer = null;
this.smilesMatcher = null;
this.jsc = null;
this.lastData = null;
this.motionEventNumber = 0;
this.inMotion = false;
this.refreshing = true;
this.axesAreTainted = false;
this.maximumSize = 2147483647;
this.gRight = null;
this.isStereoSlave = false;
this.imageFontScaling = 1;
this.captureParams = null;
this.jsParams = null;
this.antialiased = false;
this.hoverAtomIndex = -1;
this.hoverText = null;
this.hoverLabel = "%U";
this.hoverEnabled = true;
this.currentCursor = 0;
this.ptTemp = null;
this.prevFrame = -2147483648;
this.prevMorphModel = 0;
this.haveJDX = false;
this.jsv = null;
this.selectionHalosEnabled = false;
this.frankOn = true;
this.noFrankEcho = true;
this.scriptEditorVisible = false;
this.appConsole = null;
this.scriptEditor = null;
this.jmolpopup = null;
this.modelkit = null;
this.headlessImageParams = null;
this.pm = null;
this.isTainted = true;
this.movingSelected = false;
this.showSelected = false;
this.atomHighlighted = -1;
this.creatingImage = false;
this.outputManager = null;
this.bsUserVdws = null;
this.userVdws = null;
this.userVdwMars = null;
this.currentShapeID = -1;
this.currentShapeState = null;
this.localFunctions = null;
this.$isKiosk = false;
this.displayLoadErrors = true;
this.$isParallel = false;
this.stateScriptVersionInt = 0;
this.jsExporter3D = null;
this.timeouts = null;
this.chainCaseSpecified = false;
this.nmrCalculation = null;
this.logFileName = null;
this.jzt = null;
this.jbr = null;
this.jcm = null;
this.jsonParser = null;
this.triangulator = null;
this.nboParser = null;
this.macros = null;
Clazz.instantialize (this, arguments);
}, JV, "Viewer", J.api.JmolViewer, [J.atomdata.AtomDataServer, J.api.PlatformViewer]);
Clazz.defineMethod (c$, "finalize", 
function () {
if (JU.Logger.debugging) JU.Logger.debug ("vwr finalize " + this);
Clazz.superCall (this, JV.Viewer, "finalize", []);
});
Clazz.defineMethod (c$, "setInsertedCommand", 
function (strScript) {
this.insertedCommand = strScript;
}, "~S");
c$.getJmolVersion = Clazz.overrideMethod (c$, "getJmolVersion", 
function () {
return (JV.Viewer.version_date == null ? JV.Viewer.version_date = JV.JC.version + "  " + JV.JC.date : JV.Viewer.version_date);
});
c$.allocateViewer = Clazz.defineMethod (c$, "allocateViewer", 
function (display, modelAdapter, fullName, documentBase, codeBase, commandOptions, statusListener, implementedPlatform) {
var info =  new java.util.Hashtable ();
info.put ("display", display);
info.put ("adapter", modelAdapter);
info.put ("statusListener", statusListener);
info.put ("platform", implementedPlatform);
info.put ("options", commandOptions);
info.put ("fullName", fullName);
info.put ("documentBase", documentBase);
info.put ("codeBase", codeBase);
return  new JV.Viewer (info);
}, "~O,J.api.JmolAdapter,~S,java.net.URL,java.net.URL,~S,J.api.JmolStatusListener,J.api.GenericPlatform");
Clazz.makeConstructor (c$, 
function (info) {
Clazz.superConstructor (this, JV.Viewer, []);
this.commandHistory =  new JU.CommandHistory ();
this.rd =  new J.atomdata.RadiusData (null, 0, null, null);
this.defaultVdw = J.c.VDW.JMOL;
this.localFunctions =  new java.util.Hashtable ();
this.privateKey = Math.random ();
this.actionStates =  new JU.Lst ();
this.actionStatesRedo =  new JU.Lst ();
this.chainMap =  new java.util.Hashtable ();
this.chainList =  new JU.Lst ();
this.setOptions (info);
}, "java.util.Map");
Clazz.defineMethod (c$, "haveAccess", 
function (a) {
return this.access === a;
}, "JV.Viewer.ACCESS");
Clazz.overrideMethod (c$, "getModelAdapter", 
function () {
return (this.modelAdapter == null ? this.modelAdapter =  new J.adapter.smarter.SmarterJmolAdapter () : this.modelAdapter);
});
Clazz.overrideMethod (c$, "getSmartsMatch", 
function (smarts, bsSelected) {
if (bsSelected == null) bsSelected = this.bsA ();
return this.getSmilesMatcher ().getSubstructureSet (smarts, this.ms.at, this.ms.ac, bsSelected, 2);
}, "~S,JU.BS");
Clazz.defineMethod (c$, "getSmartsMatchForNodes", 
function (smarts, atoms) {
return this.getSmilesMatcher ().getSubstructureSet (smarts, atoms, atoms.length, null, 2);
}, "~S,~A");
Clazz.defineMethod (c$, "getSmartsMap", 
function (smilesOrSmarts, bsSelected, flags) {
if (bsSelected == null) bsSelected = this.bsA ();
if (flags == 0) flags = 2;
return this.getSmilesMatcher ().getCorrelationMaps (smilesOrSmarts, this.ms.at, this.ms.ac, bsSelected, flags);
}, "~S,JU.BS,~N");
Clazz.defineMethod (c$, "setOptions", 
function (info) {
this.vwrOptions = info;
if (JU.Logger.debugging) {
JU.Logger.debug ("Viewer constructor " + this);
}this.modelAdapter = info.get ("adapter");
var statusListener = info.get ("statusListener");
this.fullName = info.get ("fullName");
if (this.fullName == null) this.fullName = "";
var o = info.get ("codePath");
if (o == null) o = "../java/";
JV.Viewer.appletCodeBase = o.toString ();
JV.Viewer.appletIdiomaBase = JV.Viewer.appletCodeBase.substring (0, JV.Viewer.appletCodeBase.lastIndexOf ("/", JV.Viewer.appletCodeBase.length - 2) + 1) + "idioma";
o = info.get ("documentBase");
JV.Viewer.appletDocumentBase = (o == null ? "" : o.toString ());
o = info.get ("options");
this.commandOptions = (o == null ? "" : o.toString ());
if (info.containsKey ("debug") || this.commandOptions.indexOf ("-debug") >= 0) JU.Logger.setLogLevel (5);
if (this.isApplet && info.containsKey ("maximumSize")) this.setMaximumSize ((info.get ("maximumSize")).intValue ());
this.isJNLP = this.checkOption2 ("isJNLP", "-jnlp");
if (this.isJNLP) JU.Logger.info ("setting JNLP mode TRUE");
this.isSignedApplet = this.isJNLP || this.checkOption2 ("signedApplet", "-signed");
this.isApplet = this.isSignedApplet || this.checkOption2 ("applet", "-applet");
this.allowScripting = !this.checkOption2 ("noscripting", "-noscripting");
var i = this.fullName.indexOf ("__");
this.htmlName = (i < 0 ? this.fullName : this.fullName.substring (0, i));
this.appletName = JU.PT.split (this.htmlName + "_", "_")[0];
this.syncId = (i < 0 ? "" : this.fullName.substring (i + 2, this.fullName.length - 2));
this.access = (this.checkOption2 ("access:READSPT", "-r") ? JV.Viewer.ACCESS.READSPT : this.checkOption2 ("access:NONE", "-R") ? JV.Viewer.ACCESS.NONE : JV.Viewer.ACCESS.ALL);
this.isPreviewOnly = info.containsKey ("previewOnly");
if (this.isPreviewOnly) info.remove ("previewOnly");
this.isPrintOnly = this.checkOption2 ("printOnly", "-p");
this.dataOnly = this.checkOption2 ("isDataOnly", "\0");
this.autoExit = this.checkOption2 ("exit", "-x");
o = info.get ("platform");
var platform = "unknown";
if (o == null) {
o = (this.commandOptions.contains ("platform=") ? this.commandOptions.substring (this.commandOptions.indexOf ("platform=") + 9) : "J.awt.Platform");
}if (Clazz.instanceOf (o, String)) {
platform = o;
JV.Viewer.isWebGL = (platform.indexOf (".awtjs.") >= 0);
JV.Viewer.isJS = JV.Viewer.isJSNoAWT = JV.Viewer.isWebGL || (platform.indexOf (".awtjs2d.") >= 0);
this.async = !this.dataOnly && !this.autoExit && (this.testAsync || JV.Viewer.isJS && info.containsKey ("async"));
var applet = null;
var jmol = null;
var javaver = "?";
{
if(self.Jmol) {
jmol = Jmol;
applet =
Jmol._applets[this.htmlName.split("_object")[0]]; javaver =
Jmol._version; }
}if (javaver != null) {
this.html5Applet = applet;
JV.Viewer.jmolObject = jmol;
JV.Viewer.strJavaVersion = javaver;
JV.Viewer.strJavaVendor = "Java2Script " + ((this, JV.Viewer).isWebGL ? "(WebGL)" : "(HTML5)");
}o = J.api.Interface.getInterface (platform, this, "setOptions");
}this.apiPlatform = o;
this.display = info.get ("display");
this.isSingleThreaded = this.apiPlatform.isSingleThreaded ();
this.noGraphicsAllowed = this.checkOption2 ("noDisplay", "-n");
this.headless = this.apiPlatform.isHeadless ();
this.haveDisplay = (JV.Viewer.isWebGL || this.display != null && !this.noGraphicsAllowed && !this.headless && !this.dataOnly);
this.noGraphicsAllowed = new Boolean (this.noGraphicsAllowed & (this.display == null)).valueOf ();
this.headless = new Boolean (this.headless | this.noGraphicsAllowed).valueOf ();
if (this.haveDisplay) {
this.mustRender = true;
this.multiTouch = this.checkOption2 ("multiTouch", "-multitouch");
{
if (!this.isWebGL) this.display =
document.getElementById(this.display);
}} else {
this.display = null;
}this.apiPlatform.setViewer (this, this.display);
o = info.get ("graphicsAdapter");
if (o == null && !JV.Viewer.isWebGL) o = J.api.Interface.getOption ("g3d.Graphics3D", this, "setOptions");
this.gdata = (o == null && (JV.Viewer.isWebGL || !JV.Viewer.isJS) ?  new JU.GData () : o);
this.gdata.initialize (this, this.apiPlatform);
this.stm =  new JV.StateManager (this);
this.cm =  new JV.ColorManager (this, this.gdata);
this.sm =  new JV.StatusManager (this);
var is4D = info.containsKey ("4DMouse");
this.tm = JV.TransformManager.getTransformManager (this, 2147483647, 0, is4D);
this.slm =  new JV.SelectionManager (this);
if (this.haveDisplay) {
this.acm = (this.multiTouch ? J.api.Interface.getOption ("multitouch.ActionManagerMT", null, null) :  new JV.ActionManager ());
this.acm.setViewer (this, this.commandOptions + "-multitouch-" + info.get ("multiTouch"));
this.mouse = this.apiPlatform.getMouseManager (this.privateKey, this.display);
if (this.multiTouch && !this.checkOption2 ("-simulated", "-simulated")) this.apiPlatform.setTransparentCursor (this.display);
}this.mm =  new JV.ModelManager (this);
this.shm =  new JV.ShapeManager (this);
this.tempArray =  new JU.TempArray ();
this.am =  new JV.AnimationManager (this);
o = info.get ("repaintManager");
if (o == null) o = J.api.Interface.getOption ("render.RepaintManager", this, "setOptions");
if (JV.Viewer.isJS || o != null && !o.equals ("")) (this.rm = o).set (this, this.shm);
this.ms =  new JM.ModelSet (this, null);
this.initialize (true, false);
this.fm =  new JV.FileManager (this);
this.definedAtomSets =  new java.util.Hashtable ();
this.setJmolStatusListener (statusListener);
if (this.isApplet) {
JU.Logger.info ("vwrOptions: \n" + JU.Escape.escapeMap (this.vwrOptions));
var path = this.vwrOptions.get ("documentLocation");
if (!JV.Viewer.isJS && path != null && path.startsWith ("file:/")) {
path = path.substring (0, path.substring (0, (path + "?").indexOf ("?")).lastIndexOf ("/"));
JU.Logger.info ("setting current directory to " + path);
this.cd (path);
}path = JV.Viewer.appletDocumentBase;
i = path.indexOf ("#");
if (i >= 0) path = path.substring (0, i);
i = path.lastIndexOf ("?");
if (i >= 0) path = path.substring (0, i);
i = path.lastIndexOf ("/");
if (i >= 0) path = path.substring (0, i);
JV.Viewer.jsDocumentBase = path;
this.fm.setAppletContext (JV.Viewer.appletDocumentBase);
var appletProxy = info.get ("appletProxy");
if (appletProxy != null) this.setStringProperty ("appletProxy", appletProxy);
if (this.isSignedApplet) {
this.logFilePath = JU.PT.rep (JV.Viewer.appletCodeBase, "file://", "");
this.logFilePath = JU.PT.rep (this.logFilePath, "file:/", "");
if (this.logFilePath.indexOf ("//") >= 0) this.logFilePath = null;
 else this.isSignedAppletLocal = true;
} else if (!JV.Viewer.isJS) {
this.logFilePath = null;
} new J.i18n.GT (this, info.get ("language"));
if (JV.Viewer.isJS) this.acm.createActions ();
} else {
this.gdata.setBackgroundTransparent (this.checkOption2 ("backgroundTransparent", "-b"));
this.isSilent = this.checkOption2 ("silent", "-i");
if (this.isSilent) JU.Logger.setLogLevel (3);
if (this.headless && !this.isSilent) JU.Logger.info ("Operating headless display=" + this.display + " nographicsallowed=" + this.noGraphicsAllowed);
this.isSyntaxAndFileCheck = this.checkOption2 ("checkLoad", "-C");
this.isSyntaxCheck = this.isSyntaxAndFileCheck || this.checkOption2 ("check", "-c");
this.listCommands = this.checkOption2 ("listCommands", "-l");
this.cd (".");
if (this.headless) {
this.headlessImageParams = info.get ("headlessImage");
o = info.get ("headlistMaxTimeMs");
if (o == null) o = Integer.$valueOf (60000);
this.setTimeout ("" + Math.random (), (o).intValue (), "exitJmol");
}}this.useCommandThread = !this.headless && this.checkOption2 ("useCommandThread", "-threaded");
this.setStartupBooleans ();
this.setIntProperty ("_nProcessors", JV.Viewer.nProcessors);
if (!this.isSilent) {
JU.Logger.info ("(C) 2015 Jmol Development" + "\nJmol Version: " + JV.Viewer.getJmolVersion () + "\njava.vendor: " + JV.Viewer.strJavaVendor + "\njava.version: " + JV.Viewer.strJavaVersion + "\nos.name: " + JV.Viewer.strOSName + "\nAccess: " + this.access + "\nmemory: " + this.getP ("_memory") + "\nprocessors available: " + JV.Viewer.nProcessors + "\nuseCommandThread: " + this.useCommandThread + (!this.isApplet ? "" : "\nappletId:" + this.htmlName + (this.isSignedApplet ? " (signed)" : "")));
}if (this.allowScripting) this.getScriptManager ();
this.zap (false, true, false);
this.g.setO ("language", J.i18n.GT.getLanguage ());
this.g.setO ("_hoverLabel", this.hoverLabel);
this.stm.setJmolDefaults ();
JU.Elements.covalentVersion = 1;
this.allowArrayDotNotation = true;
}, "java.util.Map");
Clazz.defineMethod (c$, "setDisplay", 
function (canvas) {
this.display = canvas;
this.apiPlatform.setViewer (this, canvas);
}, "~O");
Clazz.defineMethod (c$, "newMeasurementData", 
function (id, points) {
return (J.api.Interface.getInterface ("JM.MeasurementData", this, "script")).init (id, this, points);
}, "~S,JU.Lst");
Clazz.defineMethod (c$, "getDataManager", 
 function () {
return (this.dm == null ? (this.dm = (J.api.Interface.getInterface ("JV.DataManager", this, "script")).set (this)) : this.dm);
});
Clazz.defineMethod (c$, "getScriptManager", 
 function () {
if (this.allowScripting && this.scm == null) {
this.scm = J.api.Interface.getInterface ("JS.ScriptManager", this, "setOptions");
if (JV.Viewer.isJS && this.scm == null) throw  new NullPointerException ();
if (this.scm == null) {
this.allowScripting = false;
return null;
}this.eval = this.scm.setViewer (this);
if (this.useCommandThread) this.scm.startCommandWatcher (true);
}return this.scm;
});
Clazz.defineMethod (c$, "checkOption2", 
 function (key1, key2) {
return (this.vwrOptions.containsKey (key1) || this.commandOptions.indexOf (key2) >= 0);
}, "~S,~S");
Clazz.defineMethod (c$, "setStartupBooleans", 
 function () {
this.setBooleanProperty ("_applet", this.isApplet);
this.setBooleanProperty ("_JSpecView".toLowerCase (), false);
this.setBooleanProperty ("_signedApplet", this.isSignedApplet);
this.setBooleanProperty ("_headless", this.headless);
this.setStringProperty ("_restrict", "\"" + this.access + "\"");
this.setBooleanProperty ("_useCommandThread", this.useCommandThread);
});
Clazz.defineMethod (c$, "getExportDriverList", 
function () {
return (this.haveAccess (JV.Viewer.ACCESS.ALL) ? this.g.getParameter ("exportDrivers", true) : "");
});
Clazz.overrideMethod (c$, "dispose", 
function () {
this.gRight = null;
if (this.mouse != null) {
this.acm.dispose ();
this.mouse.dispose ();
this.mouse = null;
}this.clearScriptQueue ();
this.clearThreads ();
this.haltScriptExecution ();
if (this.scm != null) this.scm.clear (true);
this.gdata.destroy ();
if (this.jmolpopup != null) this.jmolpopup.jpiDispose ();
if (this.modelkit != null) this.modelkit.jpiDispose ();
try {
if (this.appConsole != null) {
this.appConsole.dispose ();
this.appConsole = null;
}if (this.scriptEditor != null) {
this.scriptEditor.dispose ();
this.scriptEditor = null;
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "reset", 
function (includingSpin) {
this.ms.calcBoundBoxDimensions (null, 1);
this.axesAreTainted = true;
this.tm.homePosition (includingSpin);
if (this.ms.setCrystallographicDefaults ()) this.stm.setCrystallographicDefaults ();
 else this.setAxesMode (603979809);
this.prevFrame = -2147483648;
if (!this.tm.spinOn) this.setSync ();
}, "~B");
Clazz.overrideMethod (c$, "homePosition", 
function () {
this.evalString ("reset spin");
});
Clazz.defineMethod (c$, "initialize", 
function (clearUserVariables, isPyMOL) {
this.g =  new JV.GlobalSettings (this, this.g, clearUserVariables);
this.setStartupBooleans ();
this.setWidthHeightVar ();
if (this.haveDisplay) {
this.g.setB ("_is2D", JV.Viewer.isJS && !JV.Viewer.isWebGL);
this.g.setB ("_multiTouchClient", this.acm.isMTClient ());
this.g.setB ("_multiTouchServer", this.acm.isMTServer ());
}this.cm.setDefaultColors (false);
this.setObjectColor ("background", "black");
this.setObjectColor ("axis1", "red");
this.setObjectColor ("axis2", "green");
this.setObjectColor ("axis3", "blue");
this.am.setAnimationOn (false);
this.am.setAnimationFps (this.g.animationFps);
this.sm.playAudio (null);
this.sm.allowStatusReporting = this.g.statusReporting;
this.setBooleanProperty ("antialiasDisplay", (isPyMOL ? true : this.g.antialiasDisplay));
this.stm.resetLighting ();
this.tm.setDefaultPerspective ();
}, "~B,~B");
Clazz.defineMethod (c$, "setWidthHeightVar", 
function () {
this.g.setI ("_width", this.screenWidth);
this.g.setI ("_height", this.screenHeight);
});
Clazz.defineMethod (c$, "saveModelOrientation", 
function () {
this.ms.saveModelOrientation (this.am.cmi, this.stm.getOrientation ());
});
Clazz.defineMethod (c$, "restoreModelOrientation", 
function (modelIndex) {
var o = this.ms.getModelOrientation (modelIndex);
if (o != null) o.restore (-1, true);
}, "~N");
Clazz.defineMethod (c$, "restoreModelRotation", 
function (modelIndex) {
var o = this.ms.getModelOrientation (modelIndex);
if (o != null) o.restore (-1, false);
}, "~N");
Clazz.defineMethod (c$, "getGLmolView", 
function () {
var tm = this.tm;
var center = tm.fixedRotationCenter;
var q = tm.getRotationQ ();
var xtrans = tm.xTranslationFraction;
var ytrans = tm.yTranslationFraction;
var scale = tm.scalePixelsPerAngstrom;
var zoom = tm.zmPctSet;
var cd = tm.cameraDistance;
var pc = tm.screenPixelCount;
var pd = tm.perspectiveDepth;
var width = tm.width;
var height = tm.height;
{
return {
center:center,
quaternion:q,
xtrans:xtrans,
ytrans:ytrans,
scale:scale,
zoom:zoom,
cameraDistance:cd,
pixelCount:pc,
perspective:pd,
width:width,
height:height
};
}});
Clazz.defineMethod (c$, "setRotationRadius", 
function (angstroms, doAll) {
if (doAll) angstroms = this.tm.setRotationRadius (angstroms, false);
if (this.ms.setRotationRadius (this.am.cmi, angstroms)) this.g.setF ("rotationRadius", angstroms);
}, "~N,~B");
Clazz.defineMethod (c$, "setCenterBitSet", 
function (bsCenter, doScale) {
if (this.isJmolDataFrame ()) return;
this.tm.setNewRotationCenter ((JU.BSUtil.cardinalityOf (bsCenter) > 0 ? this.ms.getAtomSetCenter (bsCenter) : null), doScale);
}, "JU.BS,~B");
Clazz.defineMethod (c$, "setNewRotationCenter", 
function (center) {
if (!this.isJmolDataFrame ()) this.tm.setNewRotationCenter (center, true);
}, "JU.P3");
Clazz.defineMethod (c$, "navigate", 
function (keyWhere, modifiers) {
if (this.isJmolDataFrame ()) return;
this.tm.navigateKey (keyWhere, modifiers);
if (!this.tm.vibrationOn && keyWhere != 0) this.refresh (1, "Viewer:navigate()");
}, "~N,~N");
Clazz.defineMethod (c$, "move", 
function (eval, dRot, dZoom, dTrans, dSlab, floatSecondsTotal, fps) {
this.tm.move (eval, dRot, dZoom, dTrans, dSlab, floatSecondsTotal, fps);
this.moveUpdate (floatSecondsTotal);
}, "J.api.JmolScriptEvaluator,JU.V3,~N,JU.V3,~N,~N,~N");
Clazz.defineMethod (c$, "moveTo", 
function (eval, floatSecondsTotal, center, rotAxis, degrees, rotationMatrix, zoom, xTrans, yTrans, rotationRadius, navCenter, xNav, yNav, navDepth, cameraDepth, cameraX, cameraY) {
if (!this.haveDisplay) floatSecondsTotal = 0;
this.setTainted (true);
this.tm.moveTo (eval, floatSecondsTotal, center, rotAxis, degrees, rotationMatrix, zoom, xTrans, yTrans, rotationRadius, navCenter, xNav, yNav, navDepth, cameraDepth, cameraX, cameraY);
}, "J.api.JmolScriptEvaluator,~N,JU.P3,JU.V3,~N,JU.M3,~N,~N,~N,~N,JU.P3,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "moveUpdate", 
function (floatSecondsTotal) {
if (floatSecondsTotal > 0) this.requestRepaintAndWait ("moveUpdate");
 else if (floatSecondsTotal == 0) this.setSync ();
}, "~N");
Clazz.defineMethod (c$, "navigatePt", 
function (center) {
this.tm.setNavigatePt (center);
this.setSync ();
}, "JU.P3");
Clazz.defineMethod (c$, "navigateAxis", 
function (rotAxis, degrees) {
this.tm.navigateAxis (rotAxis, degrees);
this.setSync ();
}, "JU.V3,~N");
Clazz.defineMethod (c$, "navTranslatePercent", 
function (x, y) {
if (this.isJmolDataFrame ()) return;
this.tm.navTranslatePercentOrTo (0, x, y);
this.setSync ();
}, "~N,~N");
Clazz.defineMethod (c$, "zoomBy", 
function (pixels) {
this.tm.zoomBy (pixels);
this.refresh (2, this.sm.syncingMouse ? "Mouse: zoomBy " + pixels : "");
}, "~N");
Clazz.defineMethod (c$, "zoomByFactor", 
function (factor, x, y) {
this.tm.zoomByFactor (factor, x, y);
this.refresh (2, !this.sm.syncingMouse ? "" : "Mouse: zoomByFactor " + factor + (x == 2147483647 ? "" : " " + x + " " + y));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "rotateXYBy", 
function (degX, degY) {
this.tm.rotateXYBy (degX, degY, null);
this.refresh (2, this.sm.syncingMouse ? "Mouse: rotateXYBy " + degX + " " + degY : "");
}, "~N,~N");
Clazz.defineMethod (c$, "spinXYBy", 
function (xDelta, yDelta, speed) {
this.tm.spinXYBy (xDelta, yDelta, speed);
if (xDelta == 0 && yDelta == 0) return;
this.refresh (2, this.sm.syncingMouse ? "Mouse: spinXYBy " + xDelta + " " + yDelta + " " + speed : "");
}, "~N,~N,~N");
Clazz.defineMethod (c$, "rotateZBy", 
function (zDelta, x, y) {
this.tm.rotateZBy (zDelta, x, y);
this.refresh (2, this.sm.syncingMouse ? "Mouse: rotateZBy " + zDelta + (x == 2147483647 ? "" : " " + x + " " + y) : "");
}, "~N,~N,~N");
Clazz.defineMethod (c$, "rotateSelected", 
function (deltaX, deltaY, bsSelected) {
if (this.isJmolDataFrame ()) return;
this.tm.rotateXYBy (deltaX, deltaY, this.setMovableBitSet (bsSelected, true));
this.refreshMeasures (true);
this.refresh (2, this.sm.syncingMouse ? "Mouse: rotateMolecule " + deltaX + " " + deltaY : "");
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "setMovableBitSet", 
 function (bsSelected, checkMolecule) {
if (bsSelected == null) bsSelected = this.bsA ();
bsSelected = JU.BSUtil.copy (bsSelected);
JU.BSUtil.andNot (bsSelected, this.getMotionFixedAtoms ());
if (checkMolecule && !this.g.allowMoveAtoms) bsSelected = this.ms.getMoleculeBitSet (bsSelected);
return this.movableBitSet = bsSelected;
}, "JU.BS,~B");
Clazz.defineMethod (c$, "translateXYBy", 
function (xDelta, yDelta) {
this.tm.translateXYBy (xDelta, yDelta);
this.refresh (2, this.sm.syncingMouse ? "Mouse: translateXYBy " + xDelta + " " + yDelta : "");
}, "~N,~N");
Clazz.overrideMethod (c$, "rotateFront", 
function () {
this.tm.resetRotation ();
this.refresh (1, "Viewer:rotateFront()");
});
Clazz.defineMethod (c$, "translate", 
function (xyz, x, type, bsAtoms) {
var xy = (type == '\0' ? Clazz.floatToInt (x) : type == '%' ? this.tm.percentToPixels (xyz, x) : this.tm.angstromsToPixels (x * (type == 'n' ? 10 : 1)));
if (bsAtoms != null) {
if (xy == 0) return;
this.tm.setSelectedTranslation (bsAtoms, xyz, xy);
} else {
switch (xyz) {
case 'X':
case 'x':
if (type == '\0') this.tm.translateToPercent ('x', x);
 else this.tm.translateXYBy (xy, 0);
break;
case 'Y':
case 'y':
if (type == '\0') this.tm.translateToPercent ('y', x);
 else this.tm.translateXYBy (0, xy);
break;
case 'Z':
case 'z':
if (type == '\0') this.tm.translateToPercent ('z', x);
 else this.tm.translateZBy (xy);
break;
}
}this.refresh (1, "Viewer:translate()");
}, "~S,~N,~S,JU.BS");
Clazz.defineMethod (c$, "slabByPixels", 
function (pixels) {
this.tm.slabByPercentagePoints (pixels);
this.refresh (3, "slabByPixels");
}, "~N");
Clazz.defineMethod (c$, "depthByPixels", 
function (pixels) {
this.tm.depthByPercentagePoints (pixels);
this.refresh (3, "depthByPixels");
}, "~N");
Clazz.defineMethod (c$, "slabDepthByPixels", 
function (pixels) {
this.tm.slabDepthByPercentagePoints (pixels);
this.refresh (3, "slabDepthByPixels");
}, "~N");
Clazz.defineMethod (c$, "finalizeTransformParameters", 
function () {
this.tm.finalizeTransformParameters ();
this.gdata.setSlabAndZShade (this.tm.slabValue, this.tm.depthValue, (this.tm.zShadeEnabled ? this.tm.zSlabValue : 2147483647), this.tm.zDepthValue, this.g.zShadePower);
});
Clazz.defineMethod (c$, "getScalePixelsPerAngstrom", 
function (asAntialiased) {
return this.tm.scalePixelsPerAngstrom * (asAntialiased || !this.antialiased ? 1 : 0.5);
}, "~B");
Clazz.defineMethod (c$, "setSpin", 
function (key, value) {
if (!JU.PT.isOneOf (key, ";x;y;z;fps;X;Y;Z;FPS;")) return;
var i = "x;y;z;fps;X;Y;Z;FPS".indexOf (key);
switch (i) {
case 0:
this.tm.setSpinXYZ (value, NaN, NaN);
break;
case 2:
this.tm.setSpinXYZ (NaN, value, NaN);
break;
case 4:
this.tm.setSpinXYZ (NaN, NaN, value);
break;
case 6:
default:
this.tm.setSpinFps (value);
break;
case 10:
this.tm.setNavXYZ (value, NaN, NaN);
break;
case 12:
this.tm.setNavXYZ (NaN, value, NaN);
break;
case 14:
this.tm.setNavXYZ (NaN, NaN, value);
break;
case 16:
this.tm.setNavFps (value);
break;
}
this.g.setI ((i < 10 ? "spin" : "nav") + key, value);
}, "~S,~N");
Clazz.defineMethod (c$, "getSpinState", 
function () {
return this.getStateCreator ().getSpinState (false);
});
Clazz.defineMethod (c$, "getOrientationText", 
function (type, name, bs) {
switch (type) {
case 1312817669:
case 1814695966:
case 1073741864:
case 1111492629:
case 1111492630:
case 1111492631:
case 134221850:
if (bs == null) bs = this.bsA ();
if (bs.isEmpty ()) return (type == 1312817669 ? "0" : type == 1814695966 ? null :  new JU.Quat ());
var q = this.ms.getBoundBoxOrientation (type, bs);
return (name === "best" && type != 1312817669 ? (q).div (this.tm.getRotationQ ()) : q);
case 1073742034:
return this.stm.getSavedOrientationText (name);
default:
return this.tm.getOrientationText (type, name === "best");
}
}, "~N,~S,JU.BS");
Clazz.defineMethod (c$, "getCurrentColorRange", 
function () {
return this.cm.getPropertyColorRange ();
});
Clazz.defineMethod (c$, "setDefaultColors", 
 function (isRasmol) {
this.cm.setDefaultColors (isRasmol);
this.g.setB ("colorRasmol", isRasmol);
this.g.setO ("defaultColorScheme", (isRasmol ? "rasmol" : "jmol"));
}, "~B");
Clazz.defineMethod (c$, "setElementArgb", 
function (elementNumber, argb) {
this.g.setO ("=color " + JU.Elements.elementNameFromNumber (elementNumber), JU.Escape.escapeColor (argb));
this.cm.setElementArgb (elementNumber, argb);
}, "~N,~N");
Clazz.overrideMethod (c$, "setVectorScale", 
function (scale) {
this.g.setF ("vectorScale", scale);
this.g.vectorScale = scale;
}, "~N");
Clazz.overrideMethod (c$, "setVibrationScale", 
function (scale) {
this.tm.setVibrationScale (scale);
this.g.vibrationScale = scale;
this.g.setF ("vibrationScale", scale);
}, "~N");
Clazz.overrideMethod (c$, "setVibrationPeriod", 
function (period) {
this.tm.setVibrationPeriod (period);
period = Math.abs (period);
this.g.vibrationPeriod = period;
this.g.setF ("vibrationPeriod", period);
}, "~N");
Clazz.defineMethod (c$, "setObjectColor", 
function (name, colorName) {
if (colorName == null || colorName.length == 0) return;
this.setObjectArgb (name, JU.CU.getArgbFromString (colorName));
}, "~S,~S");
Clazz.defineMethod (c$, "setObjectVisibility", 
function (name, b) {
var objId = JV.StateManager.getObjectIdFromName (name);
if (objId >= 0) {
this.setShapeProperty (objId, "display", b ? Boolean.TRUE : Boolean.FALSE);
}}, "~S,~B");
Clazz.defineMethod (c$, "setObjectArgb", 
function (name, argb) {
var objId = JV.StateManager.getObjectIdFromName (name);
if (objId < 0) {
if (name.equalsIgnoreCase ("axes")) {
this.setObjectArgb ("axis1", argb);
this.setObjectArgb ("axis2", argb);
this.setObjectArgb ("axis3", argb);
}return;
}this.g.objColors[objId] = argb;
switch (objId) {
case 0:
this.gdata.setBackgroundArgb (argb);
this.cm.setColixBackgroundContrast (argb);
break;
}
this.g.setO (name + "Color", JU.Escape.escapeColor (argb));
}, "~S,~N");
Clazz.defineMethod (c$, "setBackgroundImage", 
function (fileName, image) {
this.g.backgroundImageFileName = fileName;
this.gdata.setBackgroundImage (image);
}, "~S,~O");
Clazz.defineMethod (c$, "getObjectColix", 
function (objId) {
var argb = this.g.objColors[objId];
return (argb == 0 ? this.cm.colixBackgroundContrast : JU.C.getColix (argb));
}, "~N");
Clazz.overrideMethod (c$, "setColorBackground", 
function (colorName) {
this.setObjectColor ("background", colorName);
}, "~S");
Clazz.overrideMethod (c$, "getBackgroundArgb", 
function () {
return this.g.objColors[(0)];
});
Clazz.defineMethod (c$, "setObjectMad10", 
function (iShape, name, mad10) {
var objId = JV.StateManager.getObjectIdFromName (name.equalsIgnoreCase ("axes") ? "axis" : name);
if (objId < 0) return;
if (mad10 == -2 || mad10 == -4) {
var m = mad10 + 3;
mad10 = this.getObjectMad10 (objId);
if (mad10 == 0) mad10 = m;
}this.g.setB ("show" + name, mad10 != 0);
this.g.objStateOn[objId] = (mad10 != 0);
if (mad10 == 0) return;
this.g.objMad10[objId] = mad10;
this.setShapeSize (iShape, mad10, null);
}, "~N,~S,~N");
Clazz.defineMethod (c$, "getObjectMad10", 
function (objId) {
return (this.g.objStateOn[objId] ? this.g.objMad10[objId] : 0);
}, "~N");
Clazz.defineMethod (c$, "setPropertyColorScheme", 
function (scheme, isTranslucent, isOverloaded) {
this.g.propertyColorScheme = scheme;
if (scheme.startsWith ("translucent ")) {
isTranslucent = true;
scheme = scheme.substring (12).trim ();
}this.cm.setPropertyColorScheme (scheme, isTranslucent, isOverloaded);
}, "~S,~B,~B");
Clazz.defineMethod (c$, "getLightingState", 
function () {
return this.getStateCreator ().getLightingState (true);
});
Clazz.defineMethod (c$, "getColorPointForPropertyValue", 
function (val) {
return JU.CU.colorPtFromInt (this.gdata.getColorArgbOrGray (this.cm.ce.getColorIndex (val)), null);
}, "~N");
Clazz.defineMethod (c$, "select", 
function (bs, isGroup, addRemove, isQuiet) {
if (isGroup) bs = this.getUndeletedGroupAtomBits (bs);
this.slm.select (bs, addRemove, isQuiet);
this.shm.setShapeSizeBs (1, 2147483647, null, null);
}, "JU.BS,~B,~N,~B");
Clazz.overrideMethod (c$, "setSelectionSet", 
function (set) {
this.select (set, false, 0, true);
}, "JU.BS");
Clazz.defineMethod (c$, "selectBonds", 
function (bs) {
this.shm.setShapeSizeBs (1, 2147483647, null, bs);
}, "JU.BS");
Clazz.defineMethod (c$, "displayAtoms", 
function (bs, isDisplay, isGroup, addRemove, isQuiet) {
if (isGroup) bs = this.getUndeletedGroupAtomBits (bs);
if (isDisplay) this.slm.display (this.ms, bs, addRemove, isQuiet);
 else this.slm.hide (this.ms, bs, addRemove, isQuiet);
}, "JU.BS,~B,~B,~N,~B");
Clazz.defineMethod (c$, "getUndeletedGroupAtomBits", 
 function (bs) {
bs = this.ms.getAtoms (1086324742, bs);
JU.BSUtil.andNot (bs, this.slm.bsDeleted);
return bs;
}, "JU.BS");
Clazz.defineMethod (c$, "reportSelection", 
function (msg) {
if (this.selectionHalosEnabled) this.setTainted (true);
if (this.isScriptQueued () || this.g.debugScript) this.scriptStatus (msg);
}, "~S");
Clazz.defineMethod (c$, "clearAtomSets", 
 function () {
this.slm.setSelectionSubset (null);
this.definedAtomSets.clear ();
if (this.haveDisplay) this.acm.exitMeasurementMode ("clearAtomSets");
});
Clazz.defineMethod (c$, "getDefinedAtomSet", 
function (name) {
var o = this.definedAtomSets.get (name.toLowerCase ());
return (Clazz.instanceOf (o, JU.BS) ? o :  new JU.BS ());
}, "~S");
Clazz.overrideMethod (c$, "selectAll", 
function () {
this.slm.selectAll (false);
});
Clazz.overrideMethod (c$, "clearSelection", 
function () {
this.slm.clearSelection (true);
this.g.setB ("hideNotSelected", false);
});
Clazz.defineMethod (c$, "bsA", 
function () {
return this.slm.getSelectedAtoms ();
});
Clazz.overrideMethod (c$, "addSelectionListener", 
function (listener) {
this.slm.addListener (listener);
}, "J.api.JmolSelectionListener");
Clazz.overrideMethod (c$, "removeSelectionListener", 
function (listener) {
this.slm.addListener (listener);
}, "J.api.JmolSelectionListener");
Clazz.defineMethod (c$, "getAtomBitSetEval", 
function (eval, atomExpression) {
return (this.allowScripting ? this.getScriptManager ().getAtomBitSetEval (eval, atomExpression) :  new JU.BS ());
}, "J.api.JmolScriptEvaluator,~O");
Clazz.defineMethod (c$, "processTwoPointGesture", 
function (touches) {
this.mouse.processTwoPointGesture (touches);
}, "~A");
Clazz.defineMethod (c$, "processMouseEvent", 
function (id, x, y, modifiers, time) {
return this.mouse.processEvent (id, x, y, modifiers, time);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getRubberBandSelection", 
function () {
return (this.haveDisplay ? this.acm.getRubberBand () : null);
});
Clazz.defineMethod (c$, "isBound", 
function (mouseAction, jmolAction) {
return (this.haveDisplay && this.acm.bnd (mouseAction, [jmolAction]));
}, "~N,~N");
Clazz.defineMethod (c$, "getCursorX", 
function () {
return (this.haveDisplay ? this.acm.getCurrentX () : 0);
});
Clazz.defineMethod (c$, "getCursorY", 
function () {
return (this.haveDisplay ? this.acm.getCurrentY () : 0);
});
Clazz.defineMethod (c$, "getDefaultDirectory", 
function () {
return this.g.defaultDirectory;
});
Clazz.defineMethod (c$, "getLocalUrl", 
function (fileName) {
return this.apiPlatform.getLocalUrl (fileName);
}, "~S");
Clazz.defineMethod (c$, "getFileAsString", 
function (fileName) {
return this.getAsciiFileOrNull (fileName);
}, "~S");
Clazz.overrideMethod (c$, "getBufferedInputStream", 
function (fullPathName) {
return this.fm.getBufferedInputStream (fullPathName);
}, "~S");
Clazz.defineMethod (c$, "setLoadParameters", 
function (htParams, isAppend) {
if (htParams == null) htParams =  new java.util.Hashtable ();
htParams.put ("vwr", this);
if (this.g.atomTypes.length > 0) htParams.put ("atomTypes", this.g.atomTypes);
if (!htParams.containsKey ("lattice")) htParams.put ("lattice", this.g.ptDefaultLattice);
if (this.g.applySymmetryToBonds) htParams.put ("applySymmetryToBonds", Boolean.TRUE);
if (this.g.pdbGetHeader) htParams.put ("getHeader", Boolean.TRUE);
if (this.g.pdbSequential) htParams.put ("isSequential", Boolean.TRUE);
if (this.g.legacyJavaFloat) htParams.put ("legacyJavaFloat", Boolean.TRUE);
htParams.put ("stateScriptVersionInt", Integer.$valueOf (this.stateScriptVersionInt));
if (!htParams.containsKey ("filter")) {
var filter = this.g.defaultLoadFilter;
if (filter.length > 0) htParams.put ("filter", filter);
}var merging = (isAppend && !this.g.appendNew && this.ms.ac > 0);
htParams.put ("baseAtomIndex", Integer.$valueOf (isAppend ? this.ms.ac : 0));
htParams.put ("baseModelIndex", Integer.$valueOf (this.ms.ac == 0 ? 0 : this.ms.mc + (merging ? -1 : 0)));
if (merging) htParams.put ("merging", Boolean.TRUE);
return htParams;
}, "java.util.Map,~B");
Clazz.overrideMethod (c$, "openFileAsyncSpecial", 
function (fileName, flags) {
this.getScriptManager ().openFileAsync (fileName, flags);
}, "~S,~N");
Clazz.overrideMethod (c$, "openFile", 
function (fileName) {
this.zap (true, true, false);
return this.loadModelFromFileRepaint (null, fileName, null, null);
}, "~S");
Clazz.overrideMethod (c$, "openFiles", 
function (fileNames) {
this.zap (true, true, false);
return this.loadModelFromFileRepaint (null, null, fileNames, null);
}, "~A");
Clazz.defineMethod (c$, "openReader", 
function (fullPathName, fileName, reader) {
this.zap (true, true, false);
return this.loadModelFromFileRepaint (fullPathName, fileName, null, reader);
}, "~S,~S,~O");
Clazz.overrideMethod (c$, "openDOM", 
function (DOMNode) {
this.zap (true, true, false);
return this.loadModelFromFileRepaint ("?", "?", null, DOMNode);
}, "~O");
Clazz.defineMethod (c$, "loadModelFromFileRepaint", 
 function (fullPathName, fileName, fileNames, reader) {
var ret = this.loadModelFromFile (fullPathName, fileName, fileNames, reader, false, null, null, null, 0, " ");
this.refresh (1, "loadModelFromFileRepaint");
return ret;
}, "~S,~S,~A,~O");
Clazz.defineMethod (c$, "loadModelFromFile", 
function (fullPathName, fileName, fileNames, reader, isAppend, htParams, loadScript, sOptions, tokType, filecat) {
if (htParams == null) htParams = this.setLoadParameters (null, isAppend);
if (tokType != 0) htParams.put ("dataType", JS.T.nameOf (tokType));
if (filecat !== " ") htParams.put ("concatenate", Boolean.TRUE);
var atomSetCollection;
var saveInfo = this.fm.getFileInfo ();
if (fileNames != null) {
if (loadScript == null) {
loadScript =  new JU.SB ().append ("load files");
for (var i = 0; i < fileNames.length; i++) loadScript.append (i == 0 || filecat == null ? " " : filecat).append ("/*file*/$FILENAME" + (i + 1) + "$");

if (sOptions.length () > 0) loadScript.append (" /*options*/ ").append (sOptions.toString ());
}var timeBegin = System.currentTimeMillis ();
atomSetCollection = this.fm.createAtomSetCollectionFromFiles (fileNames, this.setLoadParameters (htParams, isAppend), isAppend);
var ms = System.currentTimeMillis () - timeBegin;
JU.Logger.info ("openFiles(" + fileNames.length + ") " + ms + " ms");
fileNames = htParams.get ("fullPathNames");
var fileTypes = htParams.get ("fileTypes");
var s = loadScript.toString ();
for (var i = 0; i < fileNames.length; i++) {
var fname = fileNames[i];
if (fileTypes != null && fileTypes[i] != null) fname = fileTypes[i] + "::" + fname;
s = JU.PT.rep (s, "$FILENAME" + (i + 1) + "$", JU.PT.esc (JV.FileManager.fixDOSName (fname)));
}
loadScript =  new JU.SB ().append (s);
} else if (reader == null) {
if (loadScript == null) loadScript =  new JU.SB ().append ("load /*file*/$FILENAME$");
atomSetCollection = this.openFileFull (fileName, isAppend, htParams, loadScript);
} else if (Clazz.instanceOf (reader, java.io.Reader) || Clazz.instanceOf (reader, java.io.BufferedInputStream) || JU.AU.isAB (reader)) {
atomSetCollection = this.fm.createAtomSetCollectionFromReader (fullPathName, fileName, reader, this.setLoadParameters (htParams, isAppend));
} else {
atomSetCollection = this.fm.createAtomSetCollectionFromDOM (reader, this.setLoadParameters (htParams, isAppend));
}if (tokType != 0) {
this.fm.setFileInfo (saveInfo);
return this.loadAtomDataAndReturnError (atomSetCollection, tokType);
}if (htParams.containsKey ("isData")) return atomSetCollection;
if (loadScript != null && !(Clazz.instanceOf (atomSetCollection, String))) {
var fname = htParams.get ("fullPathName");
if (fname == null) fname = "";
if (htParams.containsKey ("loadScript")) loadScript = htParams.get ("loadScript");
htParams.put ("loadScript", loadScript =  new JU.SB ().append (JU.PT.rep (loadScript.toString (), "$FILENAME$", JU.PT.esc (JV.FileManager.fixDOSName (fname)))));
}return this.createModelSetAndReturnError (atomSetCollection, isAppend, loadScript, htParams);
}, "~S,~S,~A,~O,~B,java.util.Map,JU.SB,JU.SB,~N,~S");
Clazz.defineMethod (c$, "setLigandModel", 
function (key, data) {
if (this.ligandModels == null) this.ligandModels =  new java.util.Hashtable ();
this.ligandModels.put (key, data);
}, "~S,~S");
Clazz.defineMethod (c$, "getLigandModel", 
function (id, prefix, suffix, terminator) {
if (id == null) {
if (this.ligandModelSet != null) {
var e = this.ligandModels.entrySet ().iterator ();
while (e.hasNext ()) {
var entry = e.next ();
if (Clazz.instanceOf (entry.getValue (), Boolean)) e.remove ();
}
}return null;
}id = id.$replace ('\\', '/');
var isLigand = prefix.equals ("ligand_");
id = (id.indexOf ("/cif") >= 0 ? id : isLigand ? id.toUpperCase () : id.substring (id.lastIndexOf ("/") + 1));
if (this.ligandModelSet == null) this.ligandModelSet =  new java.util.Hashtable ();
this.ligandModelSet.put (id, Boolean.TRUE);
if (this.ligandModels == null) this.ligandModels =  new java.util.Hashtable ();
var pngPt = id.indexOf ("|");
if (pngPt >= 0) id = id.substring (id.indexOf ("|") + 1);
var model = (terminator == null ? this.ligandModels.get (id) : null);
var data;
var fname = null;
if (Clazz.instanceOf (model, Boolean)) return null;
if (model == null && (terminator == null || pngPt >= 0)) model = this.ligandModels.get (id + suffix);
var isError = false;
var isNew = (model == null);
if (isNew) {
var s;
if (isLigand) {
fname = this.setLoadFormat ("#" + id, '#', false);
if (fname.length == 0) return null;
this.scriptEcho ("fetching " + fname);
s = this.getFileAsString3 (fname, false, null);
} else {
this.scriptEcho ("fetching " + prefix);
s = this.getFileAsString3 (prefix, false, null);
var pt = (terminator == null ? -1 : s.indexOf (terminator));
if (pt >= 0) s = s.substring (0, pt);
}isError = (s.indexOf ("java.") == 0);
model = s;
if (!isError) this.ligandModels.put (id + suffix, model);
}if (!isLigand) {
if (!isNew) this.scriptEcho (prefix + " loaded from cache");
return model;
}if (!isError && Clazz.instanceOf (model, String)) {
data = model;
if (data.length != 0) {
var htParams =  new java.util.Hashtable ();
htParams.put ("modelOnly", Boolean.TRUE);
model = this.getModelAdapter ().getAtomSetCollectionReader ("ligand", null, JU.Rdr.getBR (data), htParams);
isError = (Clazz.instanceOf (model, String));
if (!isError) {
model = this.getModelAdapter ().getAtomSetCollection (model);
isError = (Clazz.instanceOf (model, String));
if (fname != null && !isError) this.scriptEcho (this.getModelAdapter ().getAtomSetCollectionAuxiliaryInfo (model).get ("modelLoadNote"));
}}}if (isError) {
this.scriptEcho (model.toString ());
this.ligandModels.put (id, Boolean.FALSE);
return null;
}return model;
}, "~S,~S,~S,~S");
Clazz.defineMethod (c$, "openFileFull", 
 function (fileName, isAppend, htParams, loadScript) {
if (fileName == null) return null;
if (fileName.equals ("String[]")) {
return null;
}var atomSetCollection;
var msg = "openFile(" + fileName + ")";
JU.Logger.startTimer (msg);
htParams = this.setLoadParameters (htParams, isAppend);
var isLoadVariable = fileName.startsWith ("@");
var haveFileData = (htParams.containsKey ("fileData"));
if (fileName.indexOf ('$') == 0) htParams.put ("smilesString", fileName.substring (1));
var isString = (fileName.equals ("string") || fileName.equals ("Jmol Model Kit"));
var strModel = null;
if (haveFileData) {
strModel = htParams.get ("fileData");
if (htParams.containsKey ("isData")) {
var o = this.loadInlineScript (strModel, '\0', isAppend, htParams);
this.lastData = (this.g.preserveState ? this.getDataManager ().createFileData (strModel) : null);
return o;
}} else if (isString) {
strModel = this.ms.getInlineData (-1);
if (strModel == null) if (this.g.modelKitMode) strModel = "5\n\nC 0 0 0\nH .63 .63 .63\nH -.63 -.63 .63\nH -.63 .63 -.63\nH .63 -.63 -.63";
 else return "cannot find string data";
if (loadScript != null) htParams.put ("loadScript", loadScript =  new JU.SB ().append (JU.PT.rep (loadScript.toString (), "/*file*/$FILENAME$", "/*data*/data \"model inline\"\n" + strModel + "end \"model inline\"")));
}if (strModel != null) {
if (!isAppend) this.zap (true, false, false);
if (!isLoadVariable && (!haveFileData || isString)) this.getStateCreator ().getInlineData (loadScript, strModel, isAppend, this.g.defaultLoadFilter);
atomSetCollection = this.fm.createAtomSetCollectionFromString (strModel, htParams, isAppend);
} else {
atomSetCollection = this.fm.createAtomSetCollectionFromFile (fileName, htParams, isAppend);
}JU.Logger.checkTimer (msg, false);
return atomSetCollection;
}, "~S,~B,java.util.Map,JU.SB");
Clazz.overrideMethod (c$, "openStringInline", 
function (strModel) {
var ret = this.openStringInlineParamsAppend (strModel, null, false);
this.refresh (1, "openStringInline");
return ret;
}, "~S");
Clazz.defineMethod (c$, "loadInline", 
function (strModel) {
return this.loadInlineScriptRepaint (strModel, this.g.inlineNewlineChar, false);
}, "~S");
Clazz.defineMethod (c$, "loadInline", 
function (strModel, newLine) {
return this.loadInlineScriptRepaint (strModel, newLine, false);
}, "~S,~S");
Clazz.overrideMethod (c$, "loadInlineAppend", 
function (strModel, isAppend) {
return this.loadInlineScriptRepaint (strModel, '\0', isAppend);
}, "~S,~B");
Clazz.defineMethod (c$, "loadInlineScriptRepaint", 
 function (strModel, newLine, isAppend) {
var ret = this.loadInlineScript (strModel, newLine, isAppend, null);
this.refresh (1, "loadInlineScript");
return ret;
}, "~S,~S,~B");
Clazz.defineMethod (c$, "loadInline", 
function (arrayModels) {
return this.loadInline (arrayModels, false);
}, "~A");
Clazz.defineMethod (c$, "loadInline", 
function (arrayModels, isAppend) {
if (arrayModels == null || arrayModels.length == 0) return null;
var ret = this.openStringsInlineParamsAppend (arrayModels,  new java.util.Hashtable (), isAppend);
this.refresh (1, "loadInline String[]");
return ret;
}, "~A,~B");
Clazz.defineMethod (c$, "loadInline", 
function (arrayData, isAppend) {
if (arrayData == null || arrayData.size () == 0) return null;
if (!isAppend) this.zap (true, false, false);
var list =  new JU.Lst ();
for (var i = 0; i < arrayData.size (); i++) list.addLast (arrayData.get (i));

var atomSetCollection = this.fm.createAtomSeCollectionFromArrayData (list, this.setLoadParameters (null, isAppend), isAppend);
var ret = this.createModelSetAndReturnError (atomSetCollection, isAppend, null,  new java.util.Hashtable ());
this.refresh (1, "loadInline");
return ret;
}, "java.util.List,~B");
Clazz.defineMethod (c$, "loadInlineScript", 
 function (strModel, newLine, isAppend, htParams) {
if (strModel == null || strModel.length == 0) return null;
strModel = JV.Viewer.fixInlineString (strModel, newLine);
if (newLine.charCodeAt (0) != 0) JU.Logger.info ("loading model inline, " + strModel.length + " bytes, with newLine character " + (newLine).charCodeAt (0) + " isAppend=" + isAppend);
if (JU.Logger.debugging) JU.Logger.debug (strModel);
var datasep = this.getDataSeparator ();
var i;
if (datasep != null && datasep !== "" && (i = strModel.indexOf (datasep)) >= 0 && strModel.indexOf ("# Jmol state") < 0) {
var n = 2;
while ((i = strModel.indexOf (datasep, i + 1)) >= 0) n++;

var strModels =  new Array (n);
var pt = 0;
var pt0 = 0;
for (i = 0; i < n; i++) {
pt = strModel.indexOf (datasep, pt0);
if (pt < 0) pt = strModel.length;
strModels[i] = strModel.substring (pt0, pt);
pt0 = pt + datasep.length;
}
return this.openStringsInlineParamsAppend (strModels, htParams, isAppend);
}return this.openStringInlineParamsAppend (strModel, htParams, isAppend);
}, "~S,~S,~B,java.util.Map");
c$.fixInlineString = Clazz.defineMethod (c$, "fixInlineString", 
function (strModel, newLine) {
var i;
if (strModel.indexOf ("\\/n") >= 0) {
strModel = JU.PT.rep (strModel, "\n", "");
strModel = JU.PT.rep (strModel, "\\/n", "\n");
newLine = String.fromCharCode ( 0);
}if (newLine.charCodeAt (0) != 0 && newLine != '\n') {
var repEmpty = (strModel.indexOf ('\n') >= 0);
var len = strModel.length;
for (i = 0; i < len && strModel.charAt (i) == ' '; ++i) {
}
if (i < len && strModel.charAt (i) == newLine) strModel = strModel.substring (i + 1);
if (repEmpty) strModel = JU.PT.rep (strModel, "" + newLine, "");
 else strModel = strModel.$replace (newLine, '\n');
}return strModel;
}, "~S,~S");
Clazz.defineMethod (c$, "openStringInlineParamsAppend", 
function (strModel, htParams, isAppend) {
var type = this.getModelAdapter ().getFileTypeName (JU.Rdr.getBR (strModel));
if (type == null) return "unknown file type";
if (type.equals ("spt")) {
return "cannot open script inline";
}htParams = this.setLoadParameters (htParams, isAppend);
var loadScript = htParams.get ("loadScript");
var isLoadCommand = htParams.containsKey ("isData");
if (loadScript == null) loadScript =  new JU.SB ();
if (!isAppend) this.zap (true, false, false);
if (!isLoadCommand) this.getStateCreator ().getInlineData (loadScript, strModel, isAppend, this.g.defaultLoadFilter);
var atomSetCollection = this.fm.createAtomSetCollectionFromString (strModel, htParams, isAppend);
return this.createModelSetAndReturnError (atomSetCollection, isAppend, loadScript, htParams);
}, "~S,java.util.Map,~B");
Clazz.defineMethod (c$, "openStringsInlineParamsAppend", 
 function (arrayModels, htParams, isAppend) {
var loadScript =  new JU.SB ();
if (!isAppend) this.zap (true, false, false);
var atomSetCollection = this.fm.createAtomSeCollectionFromStrings (arrayModels, loadScript, this.setLoadParameters (htParams, isAppend), isAppend);
return this.createModelSetAndReturnError (atomSetCollection, isAppend, loadScript, htParams);
}, "~A,java.util.Map,~B");
Clazz.defineMethod (c$, "getInlineChar", 
function () {
return this.g.inlineNewlineChar;
});
Clazz.defineMethod (c$, "getDataSeparator", 
function () {
return this.g.getParameter ("dataseparator", true);
});
Clazz.defineMethod (c$, "createModelSetAndReturnError", 
 function (atomSetCollection, isAppend, loadScript, htParams) {
JU.Logger.startTimer ("creating model");
var fullPathName = this.fm.getFullPathName (false);
var fileName = this.fm.getFileName ();
var errMsg;
if (loadScript == null) {
this.setBooleanProperty ("preserveState", false);
loadScript =  new JU.SB ().append ("load \"???\"");
}if (Clazz.instanceOf (atomSetCollection, String)) {
errMsg = atomSetCollection;
this.setFileLoadStatus (J.c.FIL.NOT_LOADED, fullPathName, null, null, errMsg, null);
if (this.displayLoadErrors && !isAppend && !errMsg.equals ("#CANCELED#") && !errMsg.startsWith (JV.JC.READER_NOT_FOUND)) this.zapMsg (errMsg);
return errMsg;
}if (isAppend) this.clearAtomSets ();
 else if (this.g.modelKitMode && !fileName.equals ("Jmol Model Kit")) this.setModelKitMode (false);
this.setFileLoadStatus (J.c.FIL.CREATING_MODELSET, fullPathName, fileName, null, null, null);
this.pushHoldRepaintWhy ("createModelSet");
this.setErrorMessage (null, null);
try {
var bsNew =  new JU.BS ();
this.mm.createModelSet (fullPathName, fileName, loadScript, atomSetCollection, bsNew, isAppend);
if (bsNew.cardinality () > 0) {
var jmolScript = this.ms.getInfoM ("jmolscript");
if (this.ms.getMSInfoB ("doMinimize")) try {
var eval = htParams.get ("eval");
this.minimize (eval, 2147483647, 0, bsNew, null, 0, true, true, true, true);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
 else this.addHydrogens (bsNew, false, true);
if (jmolScript != null) this.ms.msInfo.put ("jmolscript", jmolScript);
}this.initializeModel (isAppend);
} catch (er) {
if (Clazz.exceptionOf (er, Error)) {
this.handleError (er, true);
errMsg = this.getShapeErrorState ();
errMsg = ("ERROR creating model: " + er + (errMsg.length == 0 ? "" : "|" + errMsg));
this.zapMsg (errMsg);
this.setErrorMessage (errMsg, null);
} else {
throw er;
}
}
this.popHoldRepaint ("createModelSet \u0001## REPAINT_IGNORE ##");
errMsg = this.getErrorMessage ();
this.setFileLoadStatus (J.c.FIL.CREATED, fullPathName, fileName, this.ms.modelSetName, errMsg, htParams.get ("async"));
if (isAppend) {
this.selectAll ();
this.setTainted (true);
this.axesAreTainted = true;
}atomSetCollection = null;
JU.Logger.checkTimer ("creating model", false);
System.gc ();
return errMsg;
}, "~O,~B,JU.SB,java.util.Map");
Clazz.defineMethod (c$, "loadAtomDataAndReturnError", 
 function (atomSetCollection, tokType) {
if (Clazz.instanceOf (atomSetCollection, String)) return atomSetCollection;
this.setErrorMessage (null, null);
try {
var script = this.mm.createAtomDataSet (atomSetCollection, tokType);
switch (tokType) {
case 1145047050:
if (script != null) this.runScriptCautiously (script);
break;
case 4166:
this.setStatusFrameChanged (true, false);
break;
case 1648363544:
this.shm.deleteVdwDependentShapes (null);
break;
}
} catch (er) {
if (Clazz.exceptionOf (er, Error)) {
this.handleError (er, true);
var errMsg = this.getShapeErrorState ();
errMsg = ("ERROR adding atom data: " + er + (errMsg.length == 0 ? "" : "|" + errMsg));
this.zapMsg (errMsg);
this.setErrorMessage (errMsg, null);
this.setParallel (false);
} else {
throw er;
}
}
return this.getErrorMessage ();
}, "~O,~N");
Clazz.defineMethod (c$, "getCurrentFileAsString", 
function (state) {
var filename = this.fm.getFullPathName (false);
if (filename.equals ("string") || filename.equals ("Jmol Model Kit")) return this.ms.getInlineData (this.am.cmi);
if (filename.equals ("String[]")) return filename;
if (filename === "JSNode") return "<DOM NODE>";
return this.getFileAsString4 (filename, -1, true, false, false, state);
}, "~S");
Clazz.defineMethod (c$, "getFullPathNameOrError", 
function (filename) {
var data =  new Array (2);
this.fm.getFullPathNameOrError (filename, false, data);
return data;
}, "~S");
Clazz.defineMethod (c$, "getFileAsString3", 
function (name, checkProtected, state) {
return this.getFileAsString4 (name, -1, false, false, checkProtected, state);
}, "~S,~B,~S");
Clazz.defineMethod (c$, "getFileAsString4", 
function (name, nBytesMax, doSpecialLoad, allowBinary, checkProtected, state) {
if (name == null) return this.getCurrentFileAsString (state);
var data =  Clazz.newArray (-1, [name, null]);
this.fm.getFileDataAsString (data, nBytesMax, doSpecialLoad, allowBinary, checkProtected);
return data[1];
}, "~S,~N,~B,~B,~B,~S");
Clazz.defineMethod (c$, "getAsciiFileOrNull", 
function (name) {
var data =  Clazz.newArray (-1, [name, null]);
return (this.fm.getFileDataAsString (data, -1, false, false, false) ? data[1] : null);
}, "~S");
Clazz.defineMethod (c$, "autoCalculate", 
function (tokProperty, dataType) {
switch (tokProperty) {
case 1111490575:
this.ms.getSurfaceDistanceMax ();
break;
case 1111490574:
this.ms.calculateStraightnessAll ();
break;
case 1111490587:
this.ms.calculateDssrProperty (dataType);
}
}, "~N,~S");
Clazz.defineMethod (c$, "calculateStraightness", 
function () {
this.ms.haveStraightness = false;
this.ms.calculateStraightnessAll ();
});
Clazz.defineMethod (c$, "calculateSurface", 
function (bsSelected, envelopeRadius) {
if (bsSelected == null) bsSelected = this.bsA ();
if (envelopeRadius == 3.4028235E38 || envelopeRadius == -1) this.ms.addStateScript ("calculate surfaceDistance " + (envelopeRadius == 3.4028235E38 ? "FROM" : "WITHIN"), null, bsSelected, null, "", false, true);
return this.ms.calculateSurface (bsSelected, envelopeRadius);
}, "JU.BS,~N");
Clazz.defineMethod (c$, "getStructureList", 
function () {
return this.g.getStructureList ();
});
Clazz.defineMethod (c$, "setStructureList", 
function (list, type) {
this.g.setStructureList (list, type);
this.ms.setStructureList (this.getStructureList ());
}, "~A,J.c.STR");
Clazz.defineMethod (c$, "calculateStructures", 
function (bsAtoms, asDSSP, setStructure, version) {
if (bsAtoms == null) bsAtoms = this.bsA ();
return this.ms.calculateStructures (bsAtoms, asDSSP, !this.am.animationOn, this.g.dsspCalcHydrogen, setStructure, version);
}, "JU.BS,~B,~B,~N");
Clazz.defineMethod (c$, "getAnnotationParser", 
function (isDSSR) {
return (isDSSR ? (this.dssrParser == null ? (this.dssrParser = J.api.Interface.getOption ("dssx.DSSR1", this, "script")) : this.dssrParser) : (this.annotationParser == null ? (this.annotationParser = J.api.Interface.getOption ("dssx.AnnotationParser", this, "script")) : this.annotationParser));
}, "~B");
Clazz.overrideMethod (c$, "getSelectedAtomIterator", 
function (bsSelected, isGreaterOnly, modelZeroBased, isMultiModel) {
return this.ms.getSelectedAtomIterator (bsSelected, isGreaterOnly, modelZeroBased, false, isMultiModel);
}, "JU.BS,~B,~B,~B");
Clazz.overrideMethod (c$, "setIteratorForAtom", 
function (iterator, atomIndex, distance) {
this.ms.setIteratorForAtom (iterator, -1, atomIndex, distance, null);
}, "J.api.AtomIndexIterator,~N,~N");
Clazz.overrideMethod (c$, "setIteratorForPoint", 
function (iterator, modelIndex, pt, distance) {
this.ms.setIteratorForPoint (iterator, modelIndex, pt, distance);
}, "J.api.AtomIndexIterator,~N,JU.T3,~N");
Clazz.overrideMethod (c$, "fillAtomData", 
function (atomData, mode) {
atomData.programInfo = "Jmol Version " + JV.Viewer.getJmolVersion ();
atomData.fileName = this.fm.getFileName ();
this.ms.fillAtomData (atomData, mode);
}, "J.atomdata.AtomData,~N");
Clazz.defineMethod (c$, "addStateScript", 
function (script, addFrameNumber, postDefinitions) {
return this.ms.addStateScript (script, null, null, null, null, addFrameNumber, postDefinitions);
}, "~S,~B,~B");
Clazz.defineMethod (c$, "getMinimizer", 
function (createNew) {
return (this.minimizer == null && createNew ? (this.minimizer = J.api.Interface.getInterface ("JM.Minimizer", this, "script")).setProperty ("vwr", this) : this.minimizer);
}, "~B");
Clazz.defineMethod (c$, "getSmilesMatcher", 
function () {
return (this.smilesMatcher == null ? (this.smilesMatcher = J.api.Interface.getInterface ("JS.SmilesMatcher", this, "script")) : this.smilesMatcher);
});
Clazz.defineMethod (c$, "clearModelDependentObjects", 
function () {
this.setFrameOffsets (null, false);
this.stopMinimization ();
this.minimizer = null;
this.smilesMatcher = null;
});
Clazz.defineMethod (c$, "zap", 
function (notify, resetUndo, zapModelKit) {
this.clearThreads ();
if (this.mm.modelSet == null) {
this.mm.zap ();
} else {
this.ligandModelSet = null;
this.clearModelDependentObjects ();
this.fm.clear ();
this.clearRepaintManager (-1);
this.am.clear ();
this.tm.clear ();
this.slm.clear ();
this.clearAllMeasurements ();
this.clearMinimization ();
this.gdata.clear ();
this.mm.zap ();
if (this.scm != null) this.scm.clear (false);
if (this.nmrCalculation != null) this.getNMRCalculation ().setChemicalShiftReference (null, 0);
if (this.haveDisplay) {
this.mouse.clear ();
this.clearTimeouts ();
this.acm.clear ();
}this.stm.clear (this.g);
this.tempArray.clear ();
this.chainMap.clear ();
this.chainList.clear ();
this.chainCaseSpecified = false;
this.definedAtomSets.clear ();
this.lastData = null;
if (this.dm != null) this.dm.clear ();
this.setBooleanProperty ("legacyjavafloat", false);
if (resetUndo) {
if (zapModelKit) this.g.removeParam ("_pngjFile");
if (zapModelKit && this.g.modelKitMode) {
this.openStringInlineParamsAppend ("5\n\nC 0 0 0\nH .63 .63 .63\nH -.63 -.63 .63\nH -.63 .63 -.63\nH .63 -.63 -.63", null, true);
this.setRotationRadius (5.0, true);
this.setStringProperty ("picking", "assignAtom_C");
this.setStringProperty ("picking", "assignBond_p");
}this.undoClear ();
}System.gc ();
}this.initializeModel (false);
if (notify) {
this.setFileLoadStatus (J.c.FIL.ZAPPED, null, (resetUndo ? "resetUndo" : this.getZapName ()), null, null, null);
}if (JU.Logger.debugging) JU.Logger.checkMemory ();
}, "~B,~B,~B");
Clazz.defineMethod (c$, "zapMsg", 
 function (msg) {
this.zap (true, true, false);
this.echoMessage (msg);
}, "~S");
Clazz.defineMethod (c$, "echoMessage", 
function (msg) {
var iShape = 31;
this.shm.loadShape (iShape);
this.setShapeProperty (iShape, "font", this.getFont3D ("SansSerif", "Plain", 20));
this.setShapeProperty (iShape, "target", "error");
this.setShapeProperty (iShape, "text", msg);
}, "~S");
Clazz.defineMethod (c$, "initializeModel", 
 function (isAppend) {
this.clearThreads ();
if (isAppend) {
this.am.initializePointers (1);
return;
}this.reset (true);
this.selectAll ();
if (this.modelkit != null) this.modelkit.initializeForModel ();
this.movingSelected = false;
this.slm.noneSelected = Boolean.FALSE;
this.setHoverEnabled (true);
this.setSelectionHalosEnabled (false);
this.tm.setCenter ();
this.am.initializePointers (1);
this.setBooleanProperty ("multipleBondBananas", false);
if (!this.ms.getMSInfoB ("isPyMOL")) {
this.clearAtomSets ();
this.setCurrentModelIndex (0);
}this.setBackgroundModelIndex (-1);
this.setFrankOn (this.getShowFrank ());
this.startHoverWatcher (true);
this.setTainted (true);
this.finalizeTransformParameters ();
}, "~B");
Clazz.defineMethod (c$, "startHoverWatcher", 
function (tf) {
if (tf && this.inMotion || !this.haveDisplay || tf && (!this.hoverEnabled && !this.sm.haveHoverCallback () || this.am.animationOn)) return;
this.acm.startHoverWatcher (tf);
}, "~B");
Clazz.overrideMethod (c$, "getModelSetPathName", 
function () {
return this.mm.modelSetPathName;
});
Clazz.overrideMethod (c$, "getModelSetFileName", 
function () {
return (this.mm.fileName == null ? this.getZapName () : this.mm.fileName);
});
Clazz.defineMethod (c$, "getUnitCellInfoText", 
function () {
var c = this.getCurrentUnitCell ();
return (c == null ? "not applicable" : c.getUnitCellInfo ());
});
Clazz.defineMethod (c$, "getUnitCellInfo", 
function (infoType) {
var symmetry = this.getCurrentUnitCell ();
return (symmetry == null ? NaN : symmetry.getUnitCellInfoType (infoType));
}, "~N");
Clazz.defineMethod (c$, "getV0abc", 
function (def) {
var uc = this.getCurrentUnitCell ();
return (uc == null ? null : uc.getV0abc (def));
}, "~O");
Clazz.defineMethod (c$, "getPolymerPointsAndVectors", 
function (bs, vList) {
this.ms.getPolymerPointsAndVectors (bs, vList, this.g.traceAlpha, this.g.sheetSmoothing);
}, "JU.BS,JU.Lst");
Clazz.defineMethod (c$, "getHybridizationAndAxes", 
function (atomIndex, z, x, lcaoType) {
return this.ms.getHybridizationAndAxes (atomIndex, 0, z, x, lcaoType, true, true);
}, "~N,JU.V3,JU.V3,~S");
Clazz.defineMethod (c$, "getAllAtoms", 
function () {
return this.getModelUndeletedAtomsBitSet (-1);
});
Clazz.defineMethod (c$, "getModelUndeletedAtomsBitSet", 
function (modelIndex) {
return this.slm.excludeAtoms (this.ms.getModelAtomBitSetIncludingDeleted (modelIndex, true), false);
}, "~N");
Clazz.defineMethod (c$, "getModelUndeletedAtomsBitSetBs", 
function (bsModels) {
return this.slm.excludeAtoms (this.ms.getModelAtomBitSetIncludingDeletedBs (bsModels), false);
}, "JU.BS");
Clazz.overrideMethod (c$, "getBoundBoxCenter", 
function () {
return this.ms.getBoundBoxCenter (this.am.cmi);
});
Clazz.defineMethod (c$, "calcBoundBoxDimensions", 
function (bs, scale) {
this.ms.calcBoundBoxDimensions (bs, scale);
this.axesAreTainted = true;
}, "JU.BS,~N");
Clazz.overrideMethod (c$, "getBoundBoxCornerVector", 
function () {
return this.ms.getBoundBoxCornerVector ();
});
Clazz.defineMethod (c$, "getBoundBoxCenterX", 
function () {
return Clazz.doubleToInt (this.screenWidth / 2);
});
Clazz.defineMethod (c$, "getBoundBoxCenterY", 
function () {
return Clazz.doubleToInt (this.screenHeight / 2);
});
Clazz.overrideMethod (c$, "getModelSetProperties", 
function () {
return this.ms.modelSetProperties;
});
Clazz.overrideMethod (c$, "getModelProperties", 
function (modelIndex) {
return this.ms.am[modelIndex].properties;
}, "~N");
Clazz.overrideMethod (c$, "getModelSetAuxiliaryInfo", 
function () {
return this.ms.getAuxiliaryInfo (null);
});
Clazz.overrideMethod (c$, "getModelNumber", 
function (modelIndex) {
return (modelIndex < 0 ? modelIndex : this.ms.getModelNumber (modelIndex));
}, "~N");
Clazz.defineMethod (c$, "getModelFileNumber", 
function (modelIndex) {
return (modelIndex < 0 ? 0 : this.ms.modelFileNumbers[modelIndex]);
}, "~N");
Clazz.overrideMethod (c$, "getModelNumberDotted", 
function (modelIndex) {
return modelIndex < 0 ? "0" : this.ms.getModelNumberDotted (modelIndex);
}, "~N");
Clazz.overrideMethod (c$, "getModelName", 
function (modelIndex) {
return this.ms.getModelName (modelIndex);
}, "~N");
Clazz.defineMethod (c$, "modelHasVibrationVectors", 
function (modelIndex) {
return (this.ms.getLastVibrationVector (modelIndex, 4166) >= 0);
}, "~N");
Clazz.defineMethod (c$, "getBondsForSelectedAtoms", 
function (bsAtoms) {
return this.ms.getBondsForSelectedAtoms (bsAtoms, this.g.bondModeOr || JU.BSUtil.cardinalityOf (bsAtoms) == 1);
}, "JU.BS");
Clazz.defineMethod (c$, "frankClicked", 
function (x, y) {
return !this.g.disablePopupMenu && this.getShowFrank () && this.shm.checkFrankclicked (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "frankClickedModelKit", 
function (x, y) {
return !this.g.disablePopupMenu && this.g.modelKitMode && x >= 0 && y >= 0 && x < 40 && y < 80;
}, "~N,~N");
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (x, y) {
return this.findNearestAtomIndexMovable (x, y, false);
}, "~N,~N");
Clazz.defineMethod (c$, "findNearestAtomIndexMovable", 
function (x, y, mustBeMovable) {
return (!this.g.atomPicking ? -1 : this.ms.findNearestAtomIndex (x, y, mustBeMovable ? this.slm.getMotionFixedAtoms () : null, this.g.minPixelSelRadius));
}, "~N,~N,~B");
Clazz.defineMethod (c$, "toCartesian", 
function (pt, ignoreOffset) {
var unitCell = this.getCurrentUnitCell ();
if (unitCell != null) {
unitCell.toCartesian (pt, ignoreOffset);
if (!this.g.legacyJavaFloat) JU.PT.fixPtFloats (pt, 10000.0);
}}, "JU.T3,~B");
Clazz.defineMethod (c$, "toFractional", 
function (pt, ignoreOffset) {
var unitCell = this.getCurrentUnitCell ();
if (unitCell != null) {
unitCell.toFractional (pt, ignoreOffset);
if (!this.g.legacyJavaFloat) JU.PT.fixPtFloats (pt, 100000.0);
}}, "JU.T3,~B");
Clazz.defineMethod (c$, "toUnitCell", 
function (pt, offset) {
var unitCell = this.getCurrentUnitCell ();
if (unitCell != null) unitCell.toUnitCell (pt, offset);
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "setCurrentCage", 
function (isosurfaceId) {
var data =  Clazz.newArray (-1, [isosurfaceId, null]);
this.shm.getShapePropertyData (24, "unitCell", data);
this.ms.setModelCage (this.am.cmi, data[1]);
}, "~S");
Clazz.defineMethod (c$, "addUnitCellOffset", 
function (pt) {
var unitCell = this.getCurrentUnitCell ();
if (unitCell == null) return;
pt.add (unitCell.getCartesianOffset ());
}, "JU.P3");
Clazz.defineMethod (c$, "setAtomData", 
function (type, name, coordinateData, isDefault) {
this.ms.setAtomData (type, name, coordinateData, isDefault);
if (type == 2) this.checkCoordinatesChanged ();
this.refreshMeasures (true);
}, "~N,~S,~S,~B");
Clazz.overrideMethod (c$, "setCenterSelected", 
function () {
this.setCenterBitSet (this.bsA (), true);
});
Clazz.defineMethod (c$, "setApplySymmetryToBonds", 
function (TF) {
this.g.applySymmetryToBonds = TF;
}, "~B");
Clazz.overrideMethod (c$, "setBondTolerance", 
function (bondTolerance) {
this.g.setF ("bondTolerance", bondTolerance);
this.g.bondTolerance = bondTolerance;
}, "~N");
Clazz.overrideMethod (c$, "setMinBondDistance", 
function (minBondDistance) {
this.g.setF ("minBondDistance", minBondDistance);
this.g.minBondDistance = minBondDistance;
}, "~N");
Clazz.defineMethod (c$, "getAtomsNearPt", 
function (distance, coord) {
var bs =  new JU.BS ();
this.ms.getAtomsWithin (distance, coord, bs, -1);
return bs;
}, "~N,JU.P3");
Clazz.defineMethod (c$, "getBranchBitSet", 
function (atomIndex, atomIndexNot, allowCyclic) {
if (atomIndex < 0 || atomIndex >= this.ms.ac) return  new JU.BS ();
return JU.JmolMolecule.getBranchBitSet (this.ms.at, atomIndex, this.getModelUndeletedAtomsBitSet (this.ms.at[atomIndex].mi), null, atomIndexNot, allowCyclic, true);
}, "~N,~N,~B");
Clazz.overrideMethod (c$, "getElementsPresentBitSet", 
function (modelIndex) {
return this.ms.getElementsPresentBitSet (modelIndex);
}, "~N");
Clazz.defineMethod (c$, "getFileHeader", 
function () {
return this.ms.getFileHeader (this.am.cmi);
});
Clazz.defineMethod (c$, "getFileData", 
function () {
return this.ms.getFileData (this.am.cmi);
});
Clazz.defineMethod (c$, "getCifData", 
function (modelIndex) {
return this.readCifData (this.ms.getModelFileName (modelIndex), this.ms.getModelFileType (modelIndex).toUpperCase ());
}, "~N");
Clazz.defineMethod (c$, "readCifData", 
function (fileName, type) {
var fname = (fileName == null ? this.ms.getModelFileName (this.am.cmi) : fileName);
if (type == null && fname != null && fname.toUpperCase ().indexOf ("BCIF") >= 0) {
var is = this.fm.getBufferedInputStream (fname);
try {
return (J.api.Interface.getInterface ("JU.MessagePackReader", this, "script")).getMapForStream (is);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
return  new java.util.Hashtable ();
} else {
throw e;
}
}
}var data = (fileName == null || fileName.length == 0 ? this.getCurrentFileAsString ("script") : this.getFileAsString3 (fileName, false, null));
if (data == null || data.length < 2) return null;
var rdr = JU.Rdr.getBR (data);
if (type == null) type = this.getModelAdapter ().getFileTypeName (rdr);
return (type == null ? null : this.readCifData (null, rdr, type));
}, "~S,~S");
Clazz.defineMethod (c$, "readCifData", 
function (fileName, rdrOrStringData, type) {
if (rdrOrStringData == null) rdrOrStringData = this.getFileAsString (fileName);
var rdr = (Clazz.instanceOf (rdrOrStringData, java.io.BufferedReader) ? rdrOrStringData : JU.Rdr.getBR (rdrOrStringData));
return JU.Rdr.readCifData (J.api.Interface.getInterface (("Cif2".equals (type) ? "J.adapter.readers.cif.Cif2DataParser" : "JU.CifDataParser"), this, "script"), rdr);
}, "~S,~O,~S");
Clazz.defineMethod (c$, "getStateCreator", 
function () {
if (this.jsc == null) (this.jsc = J.api.Interface.getInterface ("JV.StateCreator", this, "script")).setViewer (this);
return this.jsc;
});
Clazz.defineMethod (c$, "getWrappedStateScript", 
function () {
return this.getOutputManager ().getWrappedState (null, null, null, null);
});
Clazz.overrideMethod (c$, "getStateInfo", 
function () {
return this.getStateInfo3 (null, 0, 0);
});
Clazz.defineMethod (c$, "getStateInfo3", 
function (type, width, height) {
return (this.g.preserveState ? this.getStateCreator ().getStateScript (type, width, height) : "");
}, "~S,~N,~N");
Clazz.defineMethod (c$, "getStructureState", 
function () {
return this.getStateCreator ().getModelState (null, false, true);
});
Clazz.defineMethod (c$, "getCoordinateState", 
function (bsSelected) {
return this.getStateCreator ().getAtomicPropertyState (2, bsSelected);
}, "JU.BS");
Clazz.defineMethod (c$, "setCurrentColorRange", 
function (label) {
var data = this.getDataObj (label, null, 1);
var bs = (data == null ? null : (this.getDataObj (label, null, -1))[2]);
if (bs != null && this.g.rangeSelected) bs.and (this.bsA ());
this.cm.setPropertyColorRangeData (data, bs);
}, "~S");
Clazz.defineMethod (c$, "setData", 
function (key, data, dataType, matchField, matchFieldColumnCount, dataField, dataFieldColumnCount) {
this.getDataManager ().setData (key, this.lastData = data, dataType, this.ms.ac, matchField, matchFieldColumnCount, dataField, dataFieldColumnCount);
}, "~S,~A,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getDataObj", 
function (key, bsSelected, dataType) {
return (key == null && dataType == -2 ? this.lastData : this.getDataManager ().getData (key, bsSelected, dataType));
}, "~S,JU.BS,~N");
Clazz.defineMethod (c$, "autoHbond", 
function (bsFrom, bsTo, onlyIfHaveCalculated) {
if (bsFrom == null) bsFrom = bsTo = this.bsA ();
return this.ms.autoHbond (bsFrom, bsTo, onlyIfHaveCalculated);
}, "JU.BS,JU.BS,~B");
Clazz.defineMethod (c$, "getCurrentUnitCell", 
function () {
if (this.am.cai >= 0) return this.ms.getUnitCellForAtom (this.am.cai);
var m = this.am.cmi;
if (m >= 0) return this.ms.getUnitCell (m);
var models = this.getVisibleFramesBitSet ();
var ucLast = null;
for (var i = models.nextSetBit (0); i >= 0; i = models.nextSetBit (i + 1)) {
var uc = this.ms.getUnitCell (i);
if (uc == null) continue;
if (ucLast == null) {
ucLast = uc;
continue;
}if (!ucLast.unitCellEquals (uc)) return null;
}
return ucLast;
});
Clazz.defineMethod (c$, "getDefaultMeasurementLabel", 
function (nPoints) {
switch (nPoints) {
case 2:
return this.g.defaultDistanceLabel;
case 3:
return this.g.defaultAngleLabel;
default:
return this.g.defaultTorsionLabel;
}
}, "~N");
Clazz.overrideMethod (c$, "getMeasurementCount", 
function () {
var count = this.getShapePropertyAsInt (6, "count");
return count <= 0 ? 0 : count;
});
Clazz.overrideMethod (c$, "getMeasurementStringValue", 
function (i) {
return "" + this.shm.getShapePropertyIndex (6, "stringValue", i);
}, "~N");
Clazz.defineMethod (c$, "getMeasurementInfoAsString", 
function () {
return this.getShapeProperty (6, "infostring");
});
Clazz.overrideMethod (c$, "getMeasurementCountPlusIndices", 
function (i) {
return this.shm.getShapePropertyIndex (6, "countPlusIndices", i);
}, "~N");
Clazz.defineMethod (c$, "setPendingMeasurement", 
function (mp) {
this.shm.loadShape (6);
this.setShapeProperty (6, "pending", mp);
}, "JM.MeasurementPending");
Clazz.defineMethod (c$, "getPendingMeasurement", 
function () {
return this.getShapeProperty (6, "pending");
});
Clazz.defineMethod (c$, "clearAllMeasurements", 
function () {
this.setShapeProperty (6, "clear", null);
});
Clazz.overrideMethod (c$, "clearMeasurements", 
function () {
this.evalString ("measures delete");
});
Clazz.defineMethod (c$, "setAnimation", 
function (tok) {
switch (tok) {
case 1073742098:
this.am.reverseAnimation ();
case 1073742096:
case 4143:
if (!this.am.animationOn) this.am.resumeAnimation ();
return;
case 20487:
if (this.am.animationOn && !this.am.animationPaused) this.am.pauseAnimation ();
return;
case 1073742037:
this.am.setAnimationNext ();
return;
case 1073742108:
this.am.setAnimationPrevious ();
return;
case 1073741942:
case 1073742125:
this.am.rewindAnimation ();
return;
case 1073741993:
this.am.setAnimationLast ();
return;
}
}, "~N");
Clazz.overrideMethod (c$, "setAnimationFps", 
function (fps) {
this.am.setAnimationFps (fps);
}, "~N");
Clazz.defineMethod (c$, "setAnimationMode", 
 function (mode) {
if (mode.equalsIgnoreCase ("once")) {
this.am.setAnimationReplayMode (1073742070, 0, 0);
} else if (mode.equalsIgnoreCase ("loop")) {
this.am.setAnimationReplayMode (528411, 1, 1);
} else if (mode.startsWith ("pal")) {
this.am.setAnimationReplayMode (1073742082, 1, 1);
}}, "~S");
Clazz.defineMethod (c$, "setAnimationOn", 
function (animationOn) {
var wasAnimating = this.am.animationOn;
if (animationOn == wasAnimating) return;
this.am.setAnimationOn (animationOn);
}, "~B");
Clazz.defineMethod (c$, "setAnimationRange", 
function (modelIndex1, modelIndex2) {
this.am.setAnimationRange (modelIndex1, modelIndex2);
}, "~N,~N");
Clazz.overrideMethod (c$, "getVisibleFramesBitSet", 
function () {
var bs = JU.BSUtil.copy (this.am.bsVisibleModels);
if (this.ms.trajectory != null) this.ms.trajectory.selectDisplayed (bs);
return bs;
});
Clazz.defineMethod (c$, "getFrameAtoms", 
function () {
return this.getModelUndeletedAtomsBitSetBs (this.getVisibleFramesBitSet ());
});
Clazz.defineMethod (c$, "defineAtomSets", 
function (info) {
this.definedAtomSets.putAll (info);
}, "java.util.Map");
Clazz.defineMethod (c$, "setAnimDisplay", 
function (bs) {
this.am.setDisplay (bs);
if (!this.am.animationOn) this.am.morph (this.am.currentMorphModel + 1);
}, "JU.BS");
Clazz.defineMethod (c$, "setCurrentModelIndex", 
function (modelIndex) {
if (modelIndex == -2147483648) {
this.prevFrame = -2147483648;
this.setCurrentModelIndexClear (this.am.cmi, true);
return;
}this.am.setModel (modelIndex, true);
}, "~N");
Clazz.defineMethod (c$, "getTrajectoryState", 
function () {
return (this.ms.trajectory == null ? "" : this.ms.trajectory.getState ());
});
Clazz.defineMethod (c$, "setFrameOffsets", 
function (bsAtoms, isFull) {
this.tm.bsFrameOffsets = null;
if (isFull) this.clearModelDependentObjects ();
 else this.tm.bsFrameOffsets = bsAtoms;
this.tm.frameOffsets = this.ms.getFrameOffsets (bsAtoms, isFull);
}, "JU.BS,~B");
Clazz.defineMethod (c$, "setCurrentModelIndexClear", 
function (modelIndex, clearBackground) {
this.am.setModel (modelIndex, clearBackground);
}, "~N,~B");
Clazz.defineMethod (c$, "haveFileSet", 
function () {
return (this.ms.mc > 1 && this.getModelNumber (2147483647) > 2000000);
});
Clazz.defineMethod (c$, "setBackgroundModelIndex", 
function (modelIndex) {
this.am.setBackgroundModelIndex (modelIndex);
this.g.setO ("backgroundModel", this.ms.getModelNumberDotted (modelIndex));
}, "~N");
Clazz.defineMethod (c$, "setFrameVariables", 
function () {
this.g.setO ("animationMode", JS.T.nameOf (this.am.animationReplayMode));
this.g.setI ("animationFps", this.am.animationFps);
this.g.setO ("_firstFrame", this.am.getModelSpecial (-1));
this.g.setO ("_lastFrame", this.am.getModelSpecial (1));
this.g.setF ("_animTimeSec", this.am.getAnimRunTimeSeconds ());
this.g.setB ("_animMovie", this.am.isMovie);
});
Clazz.defineMethod (c$, "getInMotion", 
function (includeAnim) {
return (this.inMotion || includeAnim && this.am.animationOn);
}, "~B");
Clazz.overrideMethod (c$, "getMotionEventNumber", 
function () {
return this.motionEventNumber;
});
Clazz.overrideMethod (c$, "setInMotion", 
function (inMotion) {
if ( new Boolean (this.inMotion ^ inMotion).valueOf ()) {
this.inMotion = inMotion;
this.resizeImage (0, 0, false, false, true);
if (inMotion) {
this.startHoverWatcher (false);
++this.motionEventNumber;
} else {
this.startHoverWatcher (true);
this.refresh (3, "vwr setInMotion " + inMotion);
}}}, "~B");
Clazz.defineMethod (c$, "setRefreshing", 
 function (TF) {
this.refreshing = TF;
}, "~B");
Clazz.defineMethod (c$, "getRefreshing", 
function () {
return this.refreshing;
});
Clazz.overrideMethod (c$, "pushHoldRepaint", 
function () {
this.pushHoldRepaintWhy (null);
});
Clazz.defineMethod (c$, "pushHoldRepaintWhy", 
function (why) {
if (this.rm != null) this.rm.pushHoldRepaint (why);
}, "~S");
Clazz.overrideMethod (c$, "popHoldRepaint", 
function (why) {
if (this.rm != null) {
this.rm.popHoldRepaint (why.indexOf ("\u0001## REPAINT_IGNORE ##") < 0, why);
}}, "~S");
Clazz.overrideMethod (c$, "refresh", 
function (mode, strWhy) {
if (this.rm == null || !this.refreshing || mode == 6 && this.getInMotion (true) || !JV.Viewer.isWebGL && mode == 7) return;
if (JV.Viewer.isWebGL) {
switch (mode) {
case 1:
case 2:
case 7:
this.tm.finalizeTransformParameters ();
if (this.html5Applet == null) return;
this.html5Applet._refresh ();
if (mode == 7) return;
break;
}
} else {
this.rm.repaintIfReady ("refresh " + mode + " " + strWhy);
}if (this.sm.doSync ()) this.sm.setSync (mode == 2 ? strWhy : null);
}, "~N,~S");
Clazz.defineMethod (c$, "requestRepaintAndWait", 
function (why) {
if (this.rm == null) return;
if (!this.haveDisplay) {
this.setModelVisibility ();
this.shm.finalizeAtoms (null, true);
return;
}this.rm.requestRepaintAndWait (why);
this.setSync ();
}, "~S");
Clazz.defineMethod (c$, "clearShapeRenderers", 
function () {
this.clearRepaintManager (-1);
});
Clazz.defineMethod (c$, "isRepaintPending", 
function () {
return (this.rm == null ? false : this.rm.isRepaintPending ());
});
Clazz.overrideMethod (c$, "notifyViewerRepaintDone", 
function () {
if (this.rm != null) this.rm.repaintDone ();
this.am.repaintDone ();
});
Clazz.defineMethod (c$, "areAxesTainted", 
function () {
var TF = this.axesAreTainted;
this.axesAreTainted = false;
return TF;
});
Clazz.defineMethod (c$, "setMaximumSize", 
 function (x) {
this.maximumSize = Math.max (x, 100);
}, "~N");
Clazz.overrideMethod (c$, "setScreenDimension", 
function (width, height) {
height = Math.min (height, this.maximumSize);
width = Math.min (width, this.maximumSize);
if (this.tm.stereoDoubleFull) width = Clazz.doubleToInt ((width + 1) / 2);
if (this.screenWidth == width && this.screenHeight == height) return;
this.resizeImage (width, height, false, false, true);
}, "~N,~N");
Clazz.defineMethod (c$, "setStereo", 
function (isStereoSlave, gRight) {
this.isStereoSlave = isStereoSlave;
this.gRight = gRight;
}, "~B,~O");
Clazz.defineMethod (c$, "resizeImage", 
function (width, height, isImageWrite, isExport, isReset) {
if (!isImageWrite && this.creatingImage) return;
var wasAntialiased = this.antialiased;
this.antialiased = (isReset ? this.g.antialiasDisplay && this.checkMotionRendering (603979786) : isImageWrite && !isExport ? this.g.antialiasImages : false);
if (!isExport && !isImageWrite && (width > 0 || wasAntialiased != this.antialiased)) this.setShapeProperty (5, "clearBoxes", null);
this.imageFontScaling = (this.antialiased ? 2 : 1) * (isReset || this.tm.scale3D || width <= 0 ? 1 : (this.g.zoomLarge == (height > width) ? height : width) * 1 / this.getScreenDim ());
if (width > 0) {
this.screenWidth = width;
this.screenHeight = height;
if (!isImageWrite) {
this.g.setI ("_width", width);
this.g.setI ("_height", height);
}} else {
width = (this.screenWidth == 0 ? this.screenWidth = 500 : this.screenWidth);
height = (this.screenHeight == 0 ? this.screenHeight = 500 : this.screenHeight);
}this.tm.setScreenParameters (width, height, isImageWrite || isReset ? this.g.zoomLarge : false, this.antialiased, false, false);
this.gdata.setWindowParameters (width, height, this.antialiased);
if (width > 0 && !isImageWrite) this.setStatusResized (width, height);
}, "~N,~N,~B,~B,~B");
Clazz.overrideMethod (c$, "getScreenWidth", 
function () {
return this.screenWidth;
});
Clazz.overrideMethod (c$, "getScreenHeight", 
function () {
return this.screenHeight;
});
Clazz.defineMethod (c$, "getScreenDim", 
function () {
return (this.g.zoomLarge == (this.screenHeight > this.screenWidth) ? this.screenHeight : this.screenWidth);
});
Clazz.overrideMethod (c$, "generateOutputForExport", 
function (params) {
return (this.noGraphicsAllowed || this.rm == null ? null : this.getOutputManager ().getOutputFromExport (params));
}, "java.util.Map");
Clazz.defineMethod (c$, "clearRepaintManager", 
 function (iShape) {
if (this.rm != null) this.rm.clear (iShape);
}, "~N");
Clazz.defineMethod (c$, "renderScreenImageStereo", 
function (gLeft, checkStereoSlave, width, height) {
if (this.updateWindow (width, height)) {
if (!checkStereoSlave || this.gRight == null) {
this.getScreenImageBuffer (gLeft, false);
} else {
this.drawImage (this.gRight, this.getImage (true, false), 0, 0, this.tm.stereoDoubleDTI);
this.drawImage (gLeft, this.getImage (false, false), 0, 0, this.tm.stereoDoubleDTI);
}}if (this.captureParams != null && Boolean.FALSE !== this.captureParams.get ("captureEnabled")) {
var t = (this.captureParams.get ("endTime")).longValue ();
if (t > 0 && System.currentTimeMillis () + 50 > t) this.captureParams.put ("captureMode", "end");
this.processWriteOrCapture (this.captureParams);
}this.notifyViewerRepaintDone ();
}, "~O,~B,~N,~N");
Clazz.defineMethod (c$, "updateJS", 
function () {
if (JV.Viewer.isWebGL) {
if (this.jsParams == null) {
this.jsParams =  new java.util.Hashtable ();
this.jsParams.put ("type", "JS");
}if (this.updateWindow (0, 0)) this.render ();
this.notifyViewerRepaintDone ();
} else {
if (this.isStereoSlave) return;
this.renderScreenImageStereo (this.apiPlatform.getGraphics (null), true, 0, 0);
}});
Clazz.defineMethod (c$, "updateJSView", 
 function (imodel, iatom) {
if (this.html5Applet == null) return;
var applet = this.html5Applet;
var doViewPick = true;
{
doViewPick = (applet._viewSet != null);
}if (doViewPick) this.html5Applet._atomPickedCallback (imodel, iatom);
}, "~N,~N");
Clazz.defineMethod (c$, "updateWindow", 
 function (width, height) {
if (!this.refreshing || this.creatingImage) return (this.refreshing ? false : !JV.Viewer.isJS);
if (this.isTainted || this.tm.slabEnabled) this.setModelVisibility ();
this.isTainted = false;
if (this.rm != null) {
if (width != 0) this.setScreenDimension (width, height);
}return true;
}, "~N,~N");
Clazz.defineMethod (c$, "renderScreenImage", 
function (g, width, height) {
this.renderScreenImageStereo (g, false, width, height);
}, "~O,~N,~N");
Clazz.defineMethod (c$, "getImage", 
 function (isDouble, isImageWrite) {
var image = null;
try {
this.beginRendering (isDouble, isImageWrite);
this.render ();
this.gdata.endRendering ();
image = this.gdata.getScreenImage (isImageWrite);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
this.gdata.getScreenImage (isImageWrite);
this.handleError (er, false);
this.setErrorMessage ("Error during rendering: " + er, null);
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
System.out.println ("render error" + e);
if (!JV.Viewer.isJS) e.printStackTrace ();
}
} else {
throw e$$;
}
}
return image;
}, "~B,~B");
Clazz.defineMethod (c$, "beginRendering", 
 function (isDouble, isImageWrite) {
this.gdata.beginRendering (this.tm.getStereoRotationMatrix (isDouble), this.g.translucent, isImageWrite, !this.checkMotionRendering (603979967));
}, "~B,~B");
Clazz.defineMethod (c$, "render", 
 function () {
if (this.mm.modelSet == null || !this.mustRender || !this.refreshing && !this.creatingImage || this.rm == null) return;
var antialias2 = this.antialiased && this.g.antialiasTranslucent;
var navMinMax = this.shm.finalizeAtoms (this.tm.bsSelectedAtoms, true);
if (JV.Viewer.isWebGL) {
this.rm.renderExport (this.gdata, this.ms, this.jsParams);
this.notifyViewerRepaintDone ();
return;
}this.rm.render (this.gdata, this.ms, true, navMinMax);
if (this.gdata.setPass2 (antialias2)) {
this.tm.setAntialias (antialias2);
this.rm.render (this.gdata, this.ms, false, null);
this.tm.setAntialias (this.antialiased);
}});
Clazz.defineMethod (c$, "drawImage", 
 function (graphic, img, x, y, isDTI) {
if (graphic != null && img != null) {
this.apiPlatform.drawImage (graphic, img, x, y, this.screenWidth, this.screenHeight, isDTI);
}this.gdata.releaseScreenImage ();
}, "~O,~O,~N,~N,~B");
Clazz.defineMethod (c$, "getScreenImage", 
function () {
return this.getScreenImageBuffer (null, true);
});
Clazz.overrideMethod (c$, "getScreenImageBuffer", 
function (graphic, isImageWrite) {
if (JV.Viewer.isWebGL) return (isImageWrite ? this.apiPlatform.allocateRgbImage (0, 0, null, 0, false, true) : null);
var isDouble = this.tm.stereoDoubleFull || this.tm.stereoDoubleDTI;
var mergeImages = (graphic == null && isDouble);
var imageBuffer;
if (this.tm.stereoMode.isBiColor ()) {
this.beginRendering (true, isImageWrite);
this.render ();
this.gdata.endRendering ();
this.gdata.snapshotAnaglyphChannelBytes ();
this.beginRendering (false, isImageWrite);
this.render ();
this.gdata.endRendering ();
this.gdata.applyAnaglygh (this.tm.stereoMode, this.tm.stereoColors);
imageBuffer = this.gdata.getScreenImage (isImageWrite);
} else {
imageBuffer = this.getImage (isDouble, isImageWrite);
}var imageBuffer2 = null;
if (mergeImages) {
imageBuffer2 = this.apiPlatform.newBufferedImage (imageBuffer, (this.tm.stereoDoubleDTI ? this.screenWidth : this.screenWidth << 1), this.screenHeight);
graphic = this.apiPlatform.getGraphics (imageBuffer2);
}if (graphic != null) {
if (isDouble) {
if (this.tm.stereoMode === J.c.STER.DTI) {
this.drawImage (graphic, imageBuffer, this.screenWidth >> 1, 0, true);
imageBuffer = this.getImage (false, false);
this.drawImage (graphic, imageBuffer, 0, 0, true);
graphic = null;
} else {
this.drawImage (graphic, imageBuffer, this.screenWidth, 0, false);
imageBuffer = this.getImage (false, false);
}}if (graphic != null) this.drawImage (graphic, imageBuffer, 0, 0, false);
}return (mergeImages ? imageBuffer2 : imageBuffer);
}, "~O,~B");
Clazz.overrideMethod (c$, "getImageAsBytes", 
function (type, width, height, quality, errMsg) {
return this.getOutputManager ().getImageAsBytes (type, width, height, quality, errMsg);
}, "~S,~N,~N,~N,~A");
Clazz.overrideMethod (c$, "releaseScreenImage", 
function () {
this.gdata.releaseScreenImage ();
});
Clazz.overrideMethod (c$, "evalFile", 
function (strFilename) {
return (this.allowScripting && this.getScriptManager () != null ? this.scm.evalFile (strFilename) : null);
}, "~S");
Clazz.defineMethod (c$, "getInsertedCommand", 
function () {
var s = this.insertedCommand;
this.insertedCommand = "";
if (JU.Logger.debugging && s !== "") JU.Logger.debug ("inserting: " + s);
return s;
});
Clazz.overrideMethod (c$, "script", 
function (strScript) {
return this.evalStringQuietSync (strScript, false, true);
}, "~S");
Clazz.overrideMethod (c$, "evalString", 
function (strScript) {
return this.evalStringQuietSync (strScript, false, true);
}, "~S");
Clazz.overrideMethod (c$, "evalStringQuiet", 
function (strScript) {
return this.evalStringQuietSync (strScript, true, true);
}, "~S");
Clazz.defineMethod (c$, "evalStringQuietSync", 
function (strScript, isQuiet, allowSyncScript) {
return (this.getScriptManager () == null ? null : this.scm.evalStringQuietSync (strScript, isQuiet, allowSyncScript));
}, "~S,~B,~B");
Clazz.defineMethod (c$, "clearScriptQueue", 
function () {
if (this.scm != null) this.scm.clearQueue ();
});
Clazz.defineMethod (c$, "setScriptQueue", 
 function (TF) {
this.g.useScriptQueue = TF;
if (!TF) this.clearScriptQueue ();
}, "~B");
Clazz.overrideMethod (c$, "checkHalt", 
function (str, isInsert) {
return (this.scm != null && this.scm.checkHalt (str, isInsert));
}, "~S,~B");
Clazz.overrideMethod (c$, "scriptWait", 
function (strScript) {
return this.evalWait ("JSON", strScript, "+scriptStarted,+scriptStatus,+scriptEcho,+scriptTerminated");
}, "~S");
Clazz.overrideMethod (c$, "scriptWaitStatus", 
function (strScript, statusList) {
return this.evalWait ("object", strScript, statusList);
}, "~S,~S");
Clazz.defineMethod (c$, "evalWait", 
 function (returnType, strScript, statusList) {
if (this.getScriptManager () == null) return null;
this.scm.waitForQueue ();
var doTranslateTemp = J.i18n.GT.setDoTranslate (false);
var ret = this.evalStringWaitStatusQueued (returnType, strScript, statusList, false, false);
J.i18n.GT.setDoTranslate (doTranslateTemp);
return ret;
}, "~S,~S,~S");
Clazz.defineMethod (c$, "evalStringWaitStatusQueued", 
function (returnType, strScript, statusList, isQuiet, isQueued) {
{
if (strScript.indexOf("JSCONSOLE") == 0) {
this.html5Applet._showInfo(strScript.indexOf("CLOSE")<0); if
(strScript.indexOf("CLEAR") >= 0)
this.html5Applet._clearConsole(); return null; }
}return (this.getScriptManager () == null ? null : this.scm.evalStringWaitStatusQueued (returnType, strScript, statusList, isQuiet, isQueued));
}, "~S,~S,~S,~B,~B");
Clazz.defineMethod (c$, "exitJmol", 
function () {
if (this.isApplet && !this.isJNLP) return;
if (this.headlessImageParams != null) {
try {
if (this.headless) this.outputToFile (this.headlessImageParams);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}if (JU.Logger.debugging) JU.Logger.debug ("exitJmol -- exiting");
System.out.flush ();
System.exit (0);
});
Clazz.defineMethod (c$, "scriptCheckRet", 
 function (strScript, returnContext) {
return (this.getScriptManager () == null ? null : this.scm.scriptCheckRet (strScript, returnContext));
}, "~S,~B");
Clazz.overrideMethod (c$, "scriptCheck", 
function (strScript) {
return (this.getScriptManager () == null ? null : this.scriptCheckRet (strScript, false));
}, "~S");
Clazz.overrideMethod (c$, "isScriptExecuting", 
function () {
return (this.eval != null && this.eval.isExecuting ());
});
Clazz.overrideMethod (c$, "haltScriptExecution", 
function () {
if (this.eval != null) {
this.eval.haltExecution ();
this.eval.stopScriptThreads ();
}this.setStringPropertyTok ("pathForAllFiles", 545259572, "");
this.clearTimeouts ();
});
Clazz.defineMethod (c$, "pauseScriptExecution", 
function () {
if (this.eval != null) this.eval.pauseExecution (true);
});
Clazz.defineMethod (c$, "resolveDatabaseFormat", 
function (fileName) {
if (JV.Viewer.hasDatabasePrefix (fileName)) fileName = this.setLoadFormat (fileName, fileName.charAt (0), false);
return fileName;
}, "~S");
c$.hasDatabasePrefix = Clazz.defineMethod (c$, "hasDatabasePrefix", 
function (fileName) {
return (fileName.length != 0 && JV.Viewer.isDatabaseCode (fileName.charAt (0)));
}, "~S");
c$.isDatabaseCode = Clazz.defineMethod (c$, "isDatabaseCode", 
function (ch) {
return (ch == '*' || ch == '$' || ch == '=' || ch == ':');
}, "~S");
Clazz.defineMethod (c$, "setLoadFormat", 
function (name, type, withPrefix) {
var format = null;
var id = name.substring (1);
switch (type) {
case '=':
if (name.startsWith ("==")) {
id = id.substring (1);
type = '#';
} else if (id.indexOf ("/") > 0) {
try {
var pt = id.indexOf ("/");
var database = id.substring (0, pt);
id = JV.JC.resolveDataBase (database, id.substring (pt + 1), null);
if (id != null && id.startsWith ("'")) id = this.evaluateExpression (id).toString ();
return (id == null || id.length == 0 ? name : id);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return name;
} else {
throw e;
}
}
} else {
if (id.endsWith (".mmtf")) {
id = id.substring (0, id.indexOf (".mmtf"));
return JV.JC.resolveDataBase ("mmtf", id.toUpperCase (), null);
}format = this.g.loadFormat;
}case '#':
if (format == null) format = this.g.pdbLoadLigandFormat;
return JV.JC.resolveDataBase (null, id, format);
case '*':
var pt = name.lastIndexOf ("/");
if (name.startsWith ("*dom/")) {
id = name.substring (pt + 1);
format = (pt > 4 ? name.substring (5) : "mappings");
return JU.PT.rep (JV.JC.resolveDataBase ("map", id, null), "%TYPE", format);
} else if (name.startsWith ("*val/")) {
id = name.substring (pt + 1);
format = (pt > 4 ? name.substring (5) : "validation/outliers/all");
return JU.PT.rep (JV.JC.resolveDataBase ("map", id, null), "%TYPE", format);
} else if (name.startsWith ("*rna3d/")) {
id = name.substring (pt + 1);
format = (pt > 6 ? name.substring (6) : "loops");
return JU.PT.rep (JV.JC.resolveDataBase ("rna3d", id, null), "%TYPE", format);
} else if (name.startsWith ("*dssr--")) {
id = name.substring (pt + 1);
id = JV.JC.resolveDataBase ("dssr", id, null);
return id + "%20" + JU.PT.rep (name.substring (5, pt), " ", "%20");
} else if (name.startsWith ("*dssr/")) {
id = name.substring (pt + 1);
return JV.JC.resolveDataBase ("dssr", id, null);
} else if (name.startsWith ("*dssr1/")) {
id = name.substring (pt + 1);
return JV.JC.resolveDataBase ("dssr1", id, null);
}var pdbe = "pdbe";
if (id.length == 5 && id.charAt (4) == '*') {
pdbe = "pdbe2";
id = id.substring (0, 4);
}return JV.JC.resolveDataBase (pdbe, id, null);
case ':':
format = this.g.pubChemFormat;
if (id.equals ("")) {
try {
id = "smiles:" + this.getOpenSmiles (this.bsA ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}var fl = id.toLowerCase ();
var fi = -2147483648;
try {
fi = Integer.parseInt (id);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (fi != -2147483648) {
id = "cid/" + fi;
} else {
if (fl.startsWith ("smiles:")) {
format += "?POST?smiles=" + id.substring (7);
id = "smiles";
} else if (id.startsWith ("cid:") || id.startsWith ("inchikey:") || id.startsWith ("cas:")) {
id = id.$replace (':', '/');
} else {
if (fl.startsWith ("name:")) id = id.substring (5);
id = "name/" + JU.PT.escapeUrl (id);
}}return JU.PT.formatStringS (format, "FILE", id);
case '$':
if (name.startsWith ("$$")) {
id = id.substring (1);
format = JU.PT.rep (this.g.smilesUrlFormat, "&get3d=True", "");
return JU.PT.formatStringS (format, "FILE", JU.PT.escapeUrl (id));
}if (name.equals ("$")) try {
id = this.getOpenSmiles (this.bsA ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
case 'M':
case 'N':
case '2':
case 'I':
case 'K':
case 'S':
case 'T':
case '/':
id = JU.PT.escapeUrl (id);
switch (type) {
case 'M':
case 'N':
format = this.g.nihResolverFormat + "/names";
break;
case '2':
format = this.g.nihResolverFormat + "/image";
break;
case 'I':
case 'T':
format = this.g.nihResolverFormat + "/stdinchi";
break;
case 'K':
format = this.g.nihResolverFormat + "/inchikey";
break;
case 'S':
format = this.g.nihResolverFormat + "/stdinchikey";
break;
case '/':
format = this.g.nihResolverFormat + "/";
break;
default:
format = this.g.smilesUrlFormat;
break;
}
return (withPrefix ? "MOL3D::" : "") + JU.PT.formatStringS (format, "FILE", id);
case '-':
case '_':
var isDiff = id.startsWith ("*") || id.startsWith ("=");
if (isDiff) id = id.substring (1);
var ciftype = null;
pt = id.indexOf (".");
if (pt >= 0) {
ciftype = id.substring (pt + 1);
id = id.substring (0, pt);
}id = JV.JC.resolveDataBase ((isDiff ? "pdbemapdiff" : "pdbemap") + (type == '-' ? "server" : ""), id, null);
if ("cif".equals (ciftype)) {
id = id.$replace ("bcif", "cif");
}break;
}
return id;
}, "~S,~S,~B");
Clazz.defineMethod (c$, "getStandardLabelFormat", 
function (type) {
switch (type) {
default:
case 0:
return "%[identify]";
case 1:
return this.g.defaultLabelXYZ;
case 2:
return this.g.defaultLabelPDB;
}
}, "~N");
Clazz.defineMethod (c$, "getAdditionalHydrogens", 
function (bsAtoms, doAll, justCarbon, vConnections) {
if (bsAtoms == null) bsAtoms = this.bsA ();
var nTotal =  Clazz.newIntArray (1, 0);
var pts = this.ms.calculateHydrogens (bsAtoms, nTotal, doAll, justCarbon, vConnections);
var points =  new Array (nTotal[0]);
for (var i = 0, pt = 0; i < pts.length; i++) if (pts[i] != null) for (var j = 0; j < pts[i].length; j++) points[pt++] = pts[i][j];


return points;
}, "JU.BS,~B,~B,JU.Lst");
Clazz.overrideMethod (c$, "setMarBond", 
function (marBond) {
this.g.bondRadiusMilliAngstroms = marBond;
this.g.setI ("bondRadiusMilliAngstroms", marBond);
this.setShapeSize (1, marBond * 2, JU.BSUtil.setAll (this.ms.ac));
}, "~N");
Clazz.defineMethod (c$, "setHoverLabel", 
function (strLabel) {
this.shm.loadShape (35);
this.setShapeProperty (35, "label", strLabel);
this.setHoverEnabled (strLabel != null);
this.g.setO ("_hoverLabel", this.hoverLabel = strLabel);
if (!this.hoverEnabled && !this.sm.haveHoverCallback ()) this.startHoverWatcher (false);
}, "~S");
Clazz.defineMethod (c$, "setHoverEnabled", 
 function (tf) {
this.hoverEnabled = tf;
this.g.setB ("_hoverEnabled", tf);
}, "~B");
Clazz.defineMethod (c$, "hoverOn", 
function (atomIndex, isLabel) {
this.g.removeParam ("_objecthovered");
this.g.setI ("_atomhovered", atomIndex);
this.g.setO ("_hoverLabel", this.hoverLabel);
this.g.setUserVariable ("hovered", JS.SV.getVariable (JU.BSUtil.newAndSetBit (atomIndex)));
if (this.sm.haveHoverCallback ()) this.sm.setStatusAtomHovered (atomIndex, this.getAtomInfoXYZ (atomIndex, false));
if (!this.hoverEnabled || this.eval != null && this.isScriptExecuting () || atomIndex == this.hoverAtomIndex || this.g.hoverDelayMs == 0 || !this.slm.isInSelectionSubset (atomIndex)) return;
var label = (isLabel ? J.i18n.GT.$ ("Drag to move label") : this.g.modelKitMode && this.modelkit != null ? this.modelkit.setProperty ("hoverLabel", Integer.$valueOf (atomIndex)) : null);
this.shm.loadShape (35);
if (label != null && (!isLabel || this.ms.at[atomIndex].isVisible (512))) {
this.setShapeProperty (35, "specialLabel", label);
}this.setShapeProperty (35, "text", this.hoverText = null);
this.setShapeProperty (35, "target", Integer.$valueOf (this.hoverAtomIndex = atomIndex));
this.refresh (3, "hover on atom");
}, "~N,~B");
Clazz.defineMethod (c$, "hoverOnPt", 
function (x, y, text, id, pt) {
if (this.eval != null && this.isScriptExecuting ()) return;
this.g.setO ("_hoverLabel", text);
if (id != null && pt != null) {
this.g.setO ("_objecthovered", id);
this.g.setI ("_atomhovered", -1);
this.g.setUserVariable ("hovered", JS.SV.getVariable (pt));
if (this.sm.haveHoverCallback ()) this.sm.setStatusObjectHovered (id, text, pt);
}if (!this.hoverEnabled) return;
this.shm.loadShape (35);
this.setShapeProperty (35, "xy", JU.P3i.new3 (x, y, 0));
this.setShapeProperty (35, "target", null);
this.setShapeProperty (35, "specialLabel", null);
this.setShapeProperty (35, "text", text);
this.hoverAtomIndex = -1;
this.hoverText = text;
this.refresh (3, "hover on point");
}, "~N,~N,~S,~S,JU.T3");
Clazz.defineMethod (c$, "hoverOff", 
function () {
try {
if (this.g.modelKitMode && this.acm.getBondPickingMode () != 34) this.highlight (null);
if (!this.hoverEnabled) return;
var isHover = (this.hoverText != null || this.hoverAtomIndex >= 0);
if (this.hoverAtomIndex >= 0) {
this.setShapeProperty (35, "target", null);
this.hoverAtomIndex = -1;
}if (this.hoverText != null) {
this.setShapeProperty (35, "text", null);
this.hoverText = null;
}this.setShapeProperty (35, "specialLabel", null);
if (isHover) this.refresh (3, "hover off");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "setDebugScript", 
function (debugScript) {
this.g.debugScript = debugScript;
this.g.setB ("debugScript", debugScript);
if (this.eval != null) this.eval.setDebugging ();
}, "~B");
Clazz.defineMethod (c$, "clearClickCount", 
function () {
this.setTainted (true);
});
Clazz.defineMethod (c$, "setCursor", 
function (cursor) {
if (this.$isKiosk || this.currentCursor == cursor || this.multiTouch || !this.haveDisplay) return;
this.apiPlatform.setCursor (this.currentCursor = cursor, this.display);
}, "~N");
Clazz.defineMethod (c$, "setPickingMode", 
function (strMode, pickingMode) {
if (!this.haveDisplay) return;
this.showSelected = false;
var option = null;
if (strMode != null) {
var pt = strMode.indexOf ("_");
if (pt >= 0) {
option = strMode.substring (pt + 1);
strMode = strMode.substring (0, pt);
}pickingMode = JV.ActionManager.getPickingMode (strMode);
}if (pickingMode < 0) pickingMode = 1;
this.acm.setPickingMode (pickingMode);
this.g.setO ("picking", JV.ActionManager.getPickingModeName (this.acm.getAtomPickingMode ()));
if (option == null || option.length == 0) return;
option = Character.toUpperCase (option.charAt (0)) + (option.length == 1 ? "" : option.substring (1, 2));
switch (pickingMode) {
case 32:
this.getModelkit (false).setProperty ("atomType", option);
break;
case 33:
this.getModelkit (false).setProperty ("bondType", option);
break;
default:
JU.Logger.error ("Bad picking mode: " + strMode + "_" + option);
}
}, "~S,~N");
Clazz.defineMethod (c$, "getPickingMode", 
function () {
return (this.haveDisplay ? this.acm.getAtomPickingMode () : 0);
});
Clazz.defineMethod (c$, "setPickingStyle", 
function (style, pickingStyle) {
if (!this.haveDisplay) return;
if (style != null) pickingStyle = JV.ActionManager.getPickingStyleIndex (style);
if (pickingStyle < 0) pickingStyle = 0;
this.acm.setPickingStyle (pickingStyle);
this.g.setO ("pickingStyle", JV.ActionManager.getPickingStyleName (this.acm.getPickingStyle ()));
}, "~S,~N");
Clazz.defineMethod (c$, "getDrawHover", 
function () {
return this.haveDisplay && this.g.drawHover;
});
Clazz.defineMethod (c$, "getAtomInfo", 
function (atomOrPointIndex) {
if (this.ptTemp == null) this.ptTemp =  new JU.P3 ();
return (atomOrPointIndex >= 0 ? this.ms.getAtomInfo (atomOrPointIndex, null, this.ptTemp) : this.shm.getShapePropertyIndex (6, "pointInfo", -atomOrPointIndex));
}, "~N");
Clazz.defineMethod (c$, "getAtomInfoXYZ", 
 function (atomIndex, useChimeFormat) {
var atom = this.ms.at[atomIndex];
if (useChimeFormat) return this.getChimeMessenger ().getInfoXYZ (atom);
if (this.ptTemp == null) this.ptTemp =  new JU.P3 ();
return atom.getIdentityXYZ (true, this.ptTemp);
}, "~N,~B");
Clazz.defineMethod (c$, "setSync", 
 function () {
if (this.sm.doSync ()) this.sm.setSync (null);
});
Clazz.overrideMethod (c$, "setJmolCallbackListener", 
function (listener) {
this.sm.cbl = listener;
}, "J.api.JmolCallbackListener");
Clazz.overrideMethod (c$, "setJmolStatusListener", 
function (listener) {
this.sm.cbl = this.sm.jsl = listener;
}, "J.api.JmolStatusListener");
Clazz.defineMethod (c$, "getStatusChanged", 
function (statusNameList) {
return (statusNameList == null ? null : this.sm.getStatusChanged (statusNameList));
}, "~S");
Clazz.defineMethod (c$, "menuEnabled", 
function () {
return (!this.g.disablePopupMenu && this.getPopupMenu () != null);
});
Clazz.defineMethod (c$, "popupMenu", 
function (x, y, type) {
if (!this.haveDisplay || !this.refreshing || this.isPreviewOnly || this.g.disablePopupMenu) return;
switch (type) {
case 'j':
try {
this.getPopupMenu ();
this.jmolpopup.jpiShow (x, y);
} catch (e) {
JU.Logger.info (e.toString ());
this.g.disablePopupMenu = true;
}
break;
case 'a':
case 'b':
case 'm':
if (this.getModelkit (false) == null) {
return;
}this.modelkit.jpiShow (x, y);
break;
}
}, "~N,~N,~S");
Clazz.defineMethod (c$, "setRotateBondIndex", 
function (i) {
if (this.modelkit != null) this.modelkit.setProperty ("rotateBondIndex", Integer.$valueOf (i));
}, "~N");
Clazz.defineMethod (c$, "getMenu", 
function (type) {
this.getPopupMenu ();
if (type.equals ("\0")) {
this.popupMenu (this.screenWidth - 120, 0, 'j');
return "OK";
}return (this.jmolpopup == null ? "" : this.jmolpopup.jpiGetMenuAsString ("Jmol version " + JV.Viewer.getJmolVersion () + "|_GET_MENU|" + type));
}, "~S");
Clazz.defineMethod (c$, "getPopupMenu", 
 function () {
if (this.g.disablePopupMenu) return null;
if (this.jmolpopup == null) {
this.jmolpopup = (this.allowScripting ? this.apiPlatform.getMenuPopup (this.menuStructure, 'j') : null);
if (this.jmolpopup == null && !this.async) {
this.g.disablePopupMenu = true;
return null;
}}return this.jmolpopup.jpiGetMenuAsObject ();
});
Clazz.overrideMethod (c$, "setMenu", 
function (fileOrText, isFile) {
if (isFile) JU.Logger.info ("Setting menu " + (fileOrText.length == 0 ? "to Jmol defaults" : "from file " + fileOrText));
if (fileOrText.length == 0) fileOrText = null;
 else if (isFile) fileOrText = this.getFileAsString3 (fileOrText, false, null);
this.getProperty ("DATA_API", "setMenu", fileOrText);
this.sm.setCallbackFunction ("menu", fileOrText);
}, "~S,~B");
Clazz.defineMethod (c$, "setStatusFrameChanged", 
function (isVib, doNotify) {
if (isVib) {
this.prevFrame = -2147483648;
}this.tm.setVibrationPeriod (NaN);
var firstIndex = this.am.firstFrameIndex;
var lastIndex = this.am.lastFrameIndex;
var isMovie = this.am.isMovie;
var modelIndex = this.am.cmi;
if (firstIndex == lastIndex && !isMovie) modelIndex = firstIndex;
var frameID = this.getModelFileNumber (modelIndex);
var currentFrame = this.am.cmi;
var fileNo = frameID;
var modelNo = frameID % 1000000;
var firstNo = (isMovie ? firstIndex : this.getModelFileNumber (firstIndex));
var lastNo = (isMovie ? lastIndex : this.getModelFileNumber (lastIndex));
var strModelNo;
if (isMovie) {
strModelNo = "" + (currentFrame + 1);
} else if (fileNo == 0) {
strModelNo = this.getModelNumberDotted (firstIndex);
if (firstIndex != lastIndex) strModelNo += " - " + this.getModelNumberDotted (lastIndex);
if (Clazz.doubleToInt (firstNo / 1000000) == Clazz.doubleToInt (lastNo / 1000000)) fileNo = firstNo;
} else {
strModelNo = this.getModelNumberDotted (modelIndex);
}if (fileNo != 0) fileNo = (fileNo < 1000000 ? 1 : Clazz.doubleToInt (fileNo / 1000000));
if (!isMovie) {
this.g.setI ("_currentFileNumber", fileNo);
this.g.setI ("_currentModelNumberInFile", modelNo);
}var currentMorphModel = this.am.currentMorphModel;
this.g.setI ("_currentFrame", currentFrame);
this.g.setI ("_morphCount", this.am.morphCount);
this.g.setF ("_currentMorphFrame", currentMorphModel);
this.g.setI ("_frameID", frameID);
this.g.setI ("_modelIndex", modelIndex);
this.g.setO ("_modelNumber", strModelNo);
this.g.setO ("_modelName", (modelIndex < 0 ? "" : this.getModelName (modelIndex)));
var title = (modelIndex < 0 ? "" : this.ms.getModelTitle (modelIndex));
this.g.setO ("_modelTitle", title == null ? "" : title);
this.g.setO ("_modelFile", (modelIndex < 0 ? "" : this.ms.getModelFileName (modelIndex)));
this.g.setO ("_modelType", (modelIndex < 0 ? "" : this.ms.getModelFileType (modelIndex)));
if (currentFrame == this.prevFrame && currentMorphModel == this.prevMorphModel) return;
this.prevFrame = currentFrame;
this.prevMorphModel = currentMorphModel;
var entryName = this.getModelName (currentFrame);
if (isMovie) {
entryName = "" + (entryName === "" ? currentFrame + 1 : this.am.caf + 1) + ": " + entryName;
} else {
var script = "" + this.getModelNumberDotted (currentFrame);
if (!entryName.equals (script)) entryName = script + ": " + entryName;
}this.sm.setStatusFrameChanged (fileNo, modelNo, (this.am.animationDirection < 0 ? -firstNo : firstNo), (this.am.currentDirection < 0 ? -lastNo : lastNo), currentFrame, currentMorphModel, entryName);
if (this.doHaveJDX ()) this.getJSV ().setModel (modelIndex);
if (JV.Viewer.isJS) this.updateJSView (modelIndex, -1);
}, "~B,~B");
Clazz.defineMethod (c$, "doHaveJDX", 
 function () {
return (this.haveJDX || (this.haveJDX = this.getBooleanProperty ("_JSpecView".toLowerCase ())));
});
Clazz.defineMethod (c$, "getJSV", 
function () {
if (this.jsv == null) {
this.jsv = J.api.Interface.getOption ("jsv.JSpecView", this, "script");
this.jsv.setViewer (this);
}return this.jsv;
});
Clazz.defineMethod (c$, "getJDXBaseModelIndex", 
function (modelIndex) {
if (!this.doHaveJDX ()) return modelIndex;
return this.getJSV ().getBaseModelIndex (modelIndex);
}, "~N");
Clazz.defineMethod (c$, "getJspecViewProperties", 
function (myParam) {
var o = this.sm.getJspecViewProperties ("" + myParam);
if (o != null) this.haveJDX = true;
return o;
}, "~O");
Clazz.defineMethod (c$, "scriptEcho", 
function (strEcho) {
if (!JU.Logger.isActiveLevel (4)) return;
{
System.out.println(strEcho);
}this.sm.setScriptEcho (strEcho, this.isScriptQueued ());
if (this.listCommands && strEcho != null && strEcho.indexOf ("$[") == 0) JU.Logger.info (strEcho);
}, "~S");
Clazz.defineMethod (c$, "isScriptQueued", 
 function () {
return this.scm != null && this.scm.isScriptQueued ();
});
Clazz.defineMethod (c$, "notifyError", 
function (errType, errMsg, errMsgUntranslated) {
this.g.setO ("_errormessage", errMsgUntranslated);
this.sm.notifyError (errType, errMsg, errMsgUntranslated);
}, "~S,~S,~S");
Clazz.defineMethod (c$, "jsEval", 
function (strEval) {
return "" + this.sm.jsEval (strEval);
}, "~S");
Clazz.defineMethod (c$, "jsEvalSV", 
function (strEval) {
return JS.SV.getVariable (JV.Viewer.isJS ? this.sm.jsEval (strEval) : this.jsEval (strEval));
}, "~S");
Clazz.defineMethod (c$, "setFileLoadStatus", 
 function (ptLoad, fullPathName, fileName, modelName, strError, isAsync) {
this.setErrorMessage (strError, null);
this.g.setI ("_loadPoint", ptLoad.getCode ());
var doCallback = (ptLoad !== J.c.FIL.CREATING_MODELSET);
if (doCallback) this.setStatusFrameChanged (false, false);
this.sm.setFileLoadStatus (fullPathName, fileName, modelName, strError, ptLoad.getCode (), doCallback, isAsync);
if (doCallback) {
if (this.doHaveJDX ()) this.getJSV ().setModel (this.am.cmi);
if (JV.Viewer.isJS) this.updateJSView (this.am.cmi, -2);
}}, "J.c.FIL,~S,~S,~S,~S,Boolean");
Clazz.defineMethod (c$, "getZapName", 
function () {
return (this.g.modelKitMode ? "Jmol Model Kit" : "zapped");
});
Clazz.defineMethod (c$, "setStatusMeasuring", 
function (status, intInfo, strMeasure, value) {
this.sm.setStatusMeasuring (status, intInfo, strMeasure, value);
}, "~S,~N,~S,~N");
Clazz.defineMethod (c$, "notifyMinimizationStatus", 
function () {
var step = this.getP ("_minimizationStep");
var ff = this.getP ("_minimizationForceField");
this.sm.notifyMinimizationStatus (this.getP ("_minimizationStatus"), Clazz.instanceOf (step, String) ? Integer.$valueOf (0) : step, this.getP ("_minimizationEnergy"), (step.toString ().equals ("0") ? Float.$valueOf (0) : this.getP ("_minimizationEnergyDiff")), ff);
});
Clazz.defineMethod (c$, "setStatusAtomPicked", 
function (atomIndex, info, map, andSelect) {
if (andSelect) this.setSelectionSet (JU.BSUtil.newAndSetBit (atomIndex));
if (info == null) {
info = this.g.pickLabel;
info = (info.length == 0 ? this.getAtomInfoXYZ (atomIndex, this.g.messageStyleChime) : this.ms.getAtomInfo (atomIndex, info, this.ptTemp));
}this.setPicked (atomIndex, false);
if (atomIndex < 0) {
var m = this.getPendingMeasurement ();
if (m != null) info = info.substring (0, info.length - 1) + ",\"" + m.getString () + "\"]";
}this.g.setO ("_pickinfo", info);
this.sm.setStatusAtomPicked (atomIndex, info, map);
if (atomIndex < 0) return;
var syncMode = this.sm.getSyncMode ();
if (syncMode == 1 && this.doHaveJDX ()) this.getJSV ().atomPicked (atomIndex);
if (JV.Viewer.isJS) this.updateJSView (this.ms.at[atomIndex].mi, atomIndex);
}, "~N,~S,java.util.Map,~B");
Clazz.defineMethod (c$, "setStatusDragDropped", 
function (mode, x, y, fileName) {
if (mode == 0) {
this.g.setO ("_fileDropped", fileName);
this.g.setUserVariable ("doDrop", JS.SV.vT);
}var handled = this.sm.setStatusDragDropped (mode, x, y, fileName);
return (!handled || this.getP ("doDrop").toString ().equals ("true"));
}, "~N,~N,~N,~S");
Clazz.defineMethod (c$, "setStatusResized", 
function (width, height) {
this.sm.setStatusResized (width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "scriptStatus", 
function (strStatus) {
this.setScriptStatus (strStatus, "", 0, null);
}, "~S");
Clazz.defineMethod (c$, "scriptStatusMsg", 
function (strStatus, statusMessage) {
this.setScriptStatus (strStatus, statusMessage, 0, null);
}, "~S,~S");
Clazz.defineMethod (c$, "setScriptStatus", 
function (strStatus, statusMessage, msWalltime, strErrorMessageUntranslated) {
this.sm.setScriptStatus (strStatus, statusMessage, msWalltime, strErrorMessageUntranslated);
}, "~S,~S,~N,~S");
Clazz.overrideMethod (c$, "showUrl", 
function (urlString) {
if (urlString == null) return;
if (urlString.indexOf (":") < 0) {
var base = this.fm.getAppletDocumentBase ();
if (base === "") base = this.fm.getFullPathName (false);
if (base.indexOf ("/") >= 0) {
base = base.substring (0, base.lastIndexOf ("/") + 1);
} else if (base.indexOf ("\\") >= 0) {
base = base.substring (0, base.lastIndexOf ("\\") + 1);
}urlString = base + urlString;
}JU.Logger.info ("showUrl:" + urlString);
this.sm.showUrl (urlString);
}, "~S");
Clazz.defineMethod (c$, "setMeshCreator", 
function (meshCreator) {
this.shm.loadShape (24);
this.setShapeProperty (24, "meshCreator", meshCreator);
}, "~O");
Clazz.defineMethod (c$, "showConsole", 
function (showConsole) {
if (!this.haveDisplay) return;
try {
if (this.appConsole == null && showConsole) this.getConsole ();
this.appConsole.setVisible (true);
} catch (e) {
}
}, "~B");
Clazz.defineMethod (c$, "getConsole", 
function () {
this.getProperty ("DATA_API", "getAppConsole", Boolean.TRUE);
return this.appConsole;
});
Clazz.overrideMethod (c$, "getParameter", 
function (key) {
return this.getP (key);
}, "~S");
Clazz.defineMethod (c$, "getP", 
function (key) {
return this.g.getParameter (key, true);
}, "~S");
Clazz.defineMethod (c$, "getPOrNull", 
function (key) {
return this.g.getParameter (key, false);
}, "~S");
Clazz.defineMethod (c$, "unsetProperty", 
function (key) {
key = key.toLowerCase ();
if (key.equals ("all") || key.equals ("variables")) this.fm.setPathForAllFiles ("");
this.g.unsetUserVariable (key);
}, "~S");
Clazz.overrideMethod (c$, "notifyStatusReady", 
function (isReady) {
System.out.println ("Jmol applet " + this.fullName + (isReady ? " ready" : " destroyed"));
if (!isReady) this.dispose ();
this.sm.setStatusAppletReady (this.fullName, isReady);
}, "~B");
Clazz.overrideMethod (c$, "getBooleanProperty", 
function (key) {
key = key.toLowerCase ();
if (this.g.htBooleanParameterFlags.containsKey (key)) return this.g.htBooleanParameterFlags.get (key).booleanValue ();
if (key.endsWith ("p!")) {
if (this.acm == null) return false;
var s = this.acm.getPickingState ().toLowerCase ();
key = key.substring (0, key.length - 2) + ";";
return (s.indexOf (key) >= 0);
}if (key.equalsIgnoreCase ("executionPaused")) return (this.eval != null && this.eval.isPaused ());
if (key.equalsIgnoreCase ("executionStepping")) return (this.eval != null && this.eval.isStepping ());
if (key.equalsIgnoreCase ("haveBFactors")) return (this.ms.getBFactors () != null);
if (key.equalsIgnoreCase ("colorRasmol")) return this.cm.isDefaultColorRasmol;
if (key.equalsIgnoreCase ("frank")) return this.getShowFrank ();
if (key.equalsIgnoreCase ("spinOn")) return this.tm.spinOn;
if (key.equalsIgnoreCase ("isNavigating")) return this.tm.isNavigating ();
if (key.equalsIgnoreCase ("showSelections")) return this.selectionHalosEnabled;
if (this.g.htUserVariables.containsKey (key)) {
var t = this.g.getUserVariable (key);
if (t.tok == 1073742335) return true;
if (t.tok == 1073742334) return false;
}JU.Logger.error ("vwr.getBooleanProperty(" + key + ") - unrecognized");
return false;
}, "~S");
Clazz.overrideMethod (c$, "getInt", 
function (tok) {
switch (tok) {
case 553648147:
return this.g.infoFontSize;
case 553648132:
return this.am.animationFps;
case 553648141:
return this.g.dotDensity;
case 553648142:
return this.g.dotScale;
case 553648144:
return this.g.helixStep;
case 553648150:
return this.g.meshScale;
case 553648153:
return this.g.minPixelSelRadius;
case 553648154:
return this.g.percentVdwAtom;
case 553648157:
return this.g.pickingSpinRate;
case 553648166:
return this.g.ribbonAspectRatio;
case 536870922:
return this.g.scriptDelay;
case 553648152:
return this.g.minimizationMaxAtoms;
case 553648170:
return this.g.smallMoleculeMaxAtoms;
case 553648184:
return this.g.strutSpacing;
case 553648185:
return this.g.vectorTrail;
}
JU.Logger.error ("viewer.getInt(" + JS.T.nameOf (tok) + ") - not listed");
return 0;
}, "~N");
Clazz.defineMethod (c$, "getDelayMaximumMs", 
function () {
return (this.haveDisplay ? this.g.delayMaximumMs : 1);
});
Clazz.defineMethod (c$, "getHermiteLevel", 
function () {
return (this.tm.spinOn && this.g.hermiteLevel > 0 ? 0 : this.g.hermiteLevel);
});
Clazz.defineMethod (c$, "getHoverDelay", 
function () {
return (this.g.modelKitMode ? 20 : this.g.hoverDelayMs);
});
Clazz.overrideMethod (c$, "getBoolean", 
function (tok) {
switch (tok) {
case 603979891:
return this.g.nboCharges;
case 603979856:
return this.g.hiddenLinesDashed;
case 1073742086:
return this.ms.getMSInfoB ("isPDB");
case 603979802:
return this.g.autoplayMovie;
case 603979797:
return !this.headless && this.g.allowAudio;
case 603979780:
return this.g.allowGestures;
case 603979784:
return this.g.allowMultiTouch;
case 603979785:
return this.g.allowRotateSelected;
case 603979792:
return this.g.appendNew;
case 603979794:
return this.g.applySymmetryToBonds;
case 603979796:
return this.g.atomPicking;
case 603979798:
return this.g.autoBond;
case 603979800:
return this.g.autoFps;
case 603979806:
return this.g.axesOrientationRasmol;
case 603979811:
return this.g.cartoonSteps;
case 603979810:
return this.g.cartoonBlocks;
case 603979812:
return this.g.bondModeOr;
case 603979816:
return this.g.cartoonBaseEdges;
case 603979817:
return this.g.cartoonFancy;
case 603979818:
return this.g.cartoonLadders;
case 603979819:
return this.g.cartoonRibose;
case 603979820:
return this.g.cartoonRockets;
case 603979822:
return this.g.chainCaseSensitive || this.chainCaseSpecified;
case 603979823:
return this.g.cipRule6Full;
case 603979825:
return this.g.debugScript;
case 603979826:
return this.g.defaultStructureDSSP;
case 603979827:
return this.g.disablePopupMenu;
case 603979828:
return this.g.displayCellParameters;
case 603979830:
return this.g.dotSurface;
case 603979829:
return this.g.dotsSelectedOnly;
case 603979833:
return this.g.drawPicking;
case 603979844:
return this.g.fontCaching;
case 603979845:
return this.g.fontScaling;
case 603979846:
return this.g.forceAutoBond;
case 603979848:
return false;
case 603979850:
return this.g.greyscaleRendering;
case 603979852:
return this.g.hbondsBackbone;
case 603979853:
return this.g.hbondsRasmol;
case 603979854:
return this.g.hbondsSolid;
case 1612709894:
return this.g.rasmolHeteroSetting;
case 603979858:
return this.g.hideNameInPopup;
case 603979864:
return this.g.highResolutionFlag;
case 1612709900:
return this.g.rasmolHydrogenSetting;
case 603979867:
return this.g.isosurfaceKey;
case 603979869:
return this.g.jmolInJSpecView;
case 603979870:
return this.g.justifyMeasurements;
case 603979872:
return this.g.legacyAutoBonding;
case 603979873:
return this.g.legacyHAddition;
case 603979874:
return this.g.legacyJavaFloat;
case 603979876:
return this.g.logGestures;
case 603979877:
return this.g.measureAllModels;
case 603979878:
return this.g.measurementLabels;
case 603979879:
return this.g.messageStyleChime;
case 603983903:
return this.g.modelKitMode;
case 603979886:
return this.g.multipleBondBananas;
case 603979889:
return this.g.navigationMode;
case 603979890:
return this.g.navigationPeriodic;
case 603979893:
return this.g.partialDots;
case 603979896:
return this.g.pdbSequential;
case 603979898:
return this.g.preserveState;
case 603979900:
return this.refreshing;
case 603979901:
return this.g.ribbonBorder;
case 603979902:
return this.g.rocketBarrels;
case 603979892:
return this.g.noDelay;
case 603979906:
return this.g.selectAllModels;
case 603979920:
return this.g.showHiddenSelectionHalos;
case 603979922:
return this.g.showHydrogens;
case 603979926:
return this.g.showMeasurements;
case 603979927:
return this.g.showModVecs;
case 603979928:
return this.g.showMultipleBonds;
case 603979934:
return this.g.showTiming;
case 603979937:
return this.g.showUnitCellDetails;
case 603979939:
return this.g.slabByAtom;
case 603979940:
return this.g.slabByMolecule;
case 603979944:
return this.g.smartAromatic;
case 1612709912:
return this.g.solventOn;
case 603979952:
return this.g.ssbondsBackbone;
case 603979955:
return this.g.strutsMultiple;
case 603979960:
return this.g.testFlag1;
case 603979962:
return this.g.testFlag2;
case 603979964:
return this.g.testFlag3;
case 603979965:
return this.g.testFlag4;
case 603979966:
return this.g.traceAlpha;
case 603979967:
return this.g.translucent;
case 603979968:
return this.g.twistedSheets;
case 603979972:
return this.g.vectorsCentered;
case 603979973:
return this.g.vectorSymmetry;
case 603979975:
return this.g.waitForMoveTo;
case 603979978:
return this.g.zeroBasedXyzRasmol;
}
JU.Logger.error ("viewer.getBoolean(" + JS.T.nameOf (tok) + ") - not listed");
return false;
}, "~N");
Clazz.defineMethod (c$, "allowEmbeddedScripts", 
function () {
return (this.g.allowEmbeddedScripts && !this.isPreviewOnly);
});
Clazz.defineMethod (c$, "getDragSelected", 
function () {
return (this.g.dragSelected && !this.g.modelKitMode);
});
Clazz.defineMethod (c$, "getBondsPickable", 
function () {
return (this.g.bondPicking || this.g.modelKitMode && this.getModelkitProperty ("isMolecular") === Boolean.TRUE);
});
Clazz.defineMethod (c$, "useMinimizationThread", 
function () {
return (this.g.useMinimizationThread && !this.autoExit);
});
Clazz.overrideMethod (c$, "getFloat", 
function (tok) {
switch (tok) {
case 1140850689:
return this.g.particleRadius;
case 570425345:
return this.g.axesOffset;
case 570425346:
return this.g.axesScale;
case 570425348:
return this.g.bondTolerance;
case 570425354:
return this.g.defaultTranslucent;
case 570425352:
return this.g.defaultDrawArrowScale;
case 570425355:
return this.g.dipoleScale;
case 570425356:
return this.g.drawFontSize;
case 570425358:
return this.g.exportScale;
case 570425360:
return this.g.hbondsAngleMinimum;
case 570425361:
return this.g.hbondsDistanceMaximum;
case 570425363:
return this.g.loadAtomDataTolerance;
case 570425364:
return this.g.minBondDistance;
case 1275072532:
return this.g.modulationScale;
case 570425370:
return this.g.multipleBondSpacing;
case 570425369:
return this.g.multipleBondRadiusFactor;
case 570425374:
return this.g.navigationSpeed;
case 570425382:
return this.g.pointGroupDistanceTolerance;
case 570425384:
return this.g.pointGroupLinearTolerance;
case 570425388:
return this.tm.modelRadius;
case 570425392:
return this.g.sheetSmoothing;
case 570425394:
return this.g.solventProbeRadius;
case 570425403:
return this.g.starWidth;
case 570425406:
return this.g.strutDefaultRadius;
case 570425408:
return this.g.strutLengthMaximum;
case 1648361473:
return this.g.vectorScale;
case 570425412:
return this.g.vibrationPeriod;
case 570425347:
return this.g.cartoonBlockHeight;
}
JU.Logger.error ("viewer.getFloat(" + JS.T.nameOf (tok) + ") - not listed");
return 0;
}, "~N");
Clazz.overrideMethod (c$, "setStringProperty", 
function (key, value) {
if (value == null || key == null || key.length == 0) return;
if (key.charAt (0) == '_') {
this.g.setO (key, value);
return;
}var tok = JS.T.getTokFromName (key);
switch (JS.T.getParamType (tok)) {
case 603979776:
this.setBooleanPropertyTok (key, tok, JS.SV.newV (4, value).asBoolean ());
break;
case 553648128:
this.setIntPropertyTok (key, tok, JS.SV.newV (4, value).asInt ());
break;
case 570425344:
this.setFloatPropertyTok (key, tok, JU.PT.parseFloat (value));
break;
default:
this.setStringPropertyTok (key, tok, value);
}
}, "~S,~S");
Clazz.defineMethod (c$, "setStringPropertyTok", 
 function (key, tok, value) {
switch (tok) {
case 545259567:
this.g.macroDirectory = value = (value == null || value.length == 0 ? "https://chemapps.stolaf.edu/jmol/macros" : value);
this.macros = null;
break;
case 545259570:
this.g.nihResolverFormat = value;
break;
case 545259521:
this.setAnimationMode (value);
return;
case 545259569:
this.g.nmrPredictFormat = value;
break;
case 545259548:
this.g.defaultDropScript = value;
break;
case 545259572:
value = this.fm.setPathForAllFiles (value);
break;
case 545259558:
this.setUnits (value, false);
return;
case 545259560:
this.g.forceField = value = ("UFF".equalsIgnoreCase (value) ? "UFF" : "MMFF");
this.minimizer = null;
break;
case 545259571:
this.g.nmrUrlFormat = value;
break;
case 545259568:
this.setUnits (value, true);
return;
case 545259565:
this.g.pdbLoadLigandFormat = value;
break;
case 545259543:
this.g.defaultLabelPDB = value;
break;
case 545259544:
this.g.defaultLabelXYZ = value;
break;
case 545259549:
this.g.defaultLoadFilter = value;
break;
case 545259566:
value = this.getOutputManager ().setLogFile (value);
if (value == null) return;
break;
case 545259559:
break;
case 545259524:
this.g.atomTypes = value;
break;
case 545259538:
break;
case 545259576:
this.g.pickLabel = value;
break;
case 545259580:
if (value.length == 2 && value.startsWith ("R")) this.g.quaternionFrame = value.substring (0, 2);
 else this.g.quaternionFrame = "" + (value.toLowerCase () + "p").charAt (0);
if (!JU.PT.isOneOf (this.g.quaternionFrame, "RC;RP;a;b;c;n;p;q;x;")) this.g.quaternionFrame = "p";
this.ms.haveStraightness = false;
break;
case 545259555:
this.setVdwStr (value);
return;
case 545259563:
 new J.i18n.GT (this, value);
var language = J.i18n.GT.getLanguage ();
this.modelkit = null;
if (this.jmolpopup != null) {
this.jmolpopup.jpiDispose ();
this.jmolpopup = null;
this.getPopupMenu ();
}this.sm.setCallbackFunction ("language", language);
value = J.i18n.GT.getLanguage ();
break;
case 545259564:
this.g.loadFormat = value;
break;
case 545259534:
this.setObjectColor ("background", value);
return;
case 545259528:
this.setObjectColor ("axis1", value);
return;
case 545259530:
this.setObjectColor ("axis2", value);
return;
case 545259532:
this.setObjectColor ("axis3", value);
return;
case 545259536:
this.setObjectColor ("boundbox", value);
return;
case 545259586:
this.setObjectColor ("unitcell", value);
return;
case 545259578:
this.setPropertyColorScheme (value, false, false);
break;
case 545259562:
this.shm.loadShape (35);
this.setShapeProperty (35, "atomLabel", value);
break;
case 545259547:
this.g.defaultDistanceLabel = value;
break;
case 545259542:
this.g.defaultAngleLabel = value;
break;
case 545259554:
this.g.defaultTorsionLabel = value;
break;
case 545259550:
this.g.defaultLoadScript = value;
break;
case 545259522:
this.fm.setAppletProxy (value);
break;
case 545259546:
if (value == null) value = "";
value = value.$replace ('\\', '/');
this.g.defaultDirectory = value;
break;
case 545259561:
this.g.helpPath = value;
break;
case 545259552:
if (!value.equalsIgnoreCase ("RasMol") && !value.equalsIgnoreCase ("PyMOL")) value = "Jmol";
this.setDefaultsType (value);
break;
case 545259545:
this.setDefaultColors (value.equalsIgnoreCase ("rasmol"));
return;
case 545259573:
this.setPickingMode (value, 0);
return;
case 545259574:
this.setPickingStyle (value, 0);
return;
case 545259540:
break;
default:
if (key.toLowerCase ().endsWith ("callback")) {
this.sm.setCallbackFunction (key, (value.length == 0 || value.equalsIgnoreCase ("none") ? null : value));
break;
}if (!this.g.htNonbooleanParameterValues.containsKey (key.toLowerCase ())) {
this.g.setUserVariable (key, JS.SV.newV (4, value));
return;
}break;
}
this.g.setO (key, value);
}, "~S,~N,~S");
Clazz.overrideMethod (c$, "setFloatProperty", 
function (key, value) {
if (Float.isNaN (value) || key == null || key.length == 0) return;
if (key.charAt (0) == '_') {
this.g.setF (key, value);
return;
}var tok = JS.T.getTokFromName (key);
switch (JS.T.getParamType (tok)) {
case 545259520:
this.setStringPropertyTok (key, tok, "" + value);
break;
case 603979776:
this.setBooleanPropertyTok (key, tok, value != 0);
break;
case 553648128:
this.setIntPropertyTok (key, tok, Clazz.floatToInt (value));
break;
default:
this.setFloatPropertyTok (key, tok, value);
}
}, "~S,~N");
Clazz.defineMethod (c$, "setFloatPropertyTok", 
 function (key, tok, value) {
switch (tok) {
case 570425347:
this.g.cartoonBlockHeight = value;
break;
case 570425366:
this.ms.setModulation (null, false, null, false);
this.g.modulationScale = value = Math.max (0.1, value);
this.ms.setModulation (null, true, null, false);
break;
case 570425381:
this.g.particleRadius = Math.abs (value);
break;
case 570425356:
this.g.drawFontSize = value;
break;
case 570425358:
this.g.exportScale = value;
break;
case 570425403:
this.g.starWidth = value;
break;
case 570425369:
this.g.multipleBondRadiusFactor = value;
break;
case 570425370:
this.g.multipleBondSpacing = value;
break;
case 570425393:
this.tm.setSlabRange (value);
break;
case 570425365:
this.g.minimizationCriterion = value;
break;
case 570425359:
if (this.haveDisplay) this.acm.setGestureSwipeFactor (value);
break;
case 570425367:
if (this.haveDisplay) this.acm.setMouseDragFactor (value);
break;
case 570425368:
if (this.haveDisplay) this.acm.setMouseWheelFactor (value);
break;
case 570425408:
this.g.strutLengthMaximum = value;
break;
case 570425406:
this.g.strutDefaultRadius = value;
break;
case 570425376:
this.setSpin ("X", Clazz.floatToInt (value));
break;
case 570425378:
this.setSpin ("Y", Clazz.floatToInt (value));
break;
case 570425380:
this.setSpin ("Z", Clazz.floatToInt (value));
break;
case 570425371:
if (Float.isNaN (value)) return;
this.setSpin ("FPS", Clazz.floatToInt (value));
break;
case 570425363:
this.g.loadAtomDataTolerance = value;
break;
case 570425360:
this.g.hbondsAngleMinimum = value;
break;
case 570425361:
this.g.hbondsDistanceMaximum = value;
break;
case 570425382:
this.g.pointGroupDistanceTolerance = value;
break;
case 570425384:
this.g.pointGroupLinearTolerance = value;
break;
case 570425357:
this.g.ellipsoidAxisDiameter = value;
break;
case 570425398:
this.setSpin ("x", Clazz.floatToInt (value));
break;
case 570425400:
this.setSpin ("y", Clazz.floatToInt (value));
break;
case 570425402:
this.setSpin ("z", Clazz.floatToInt (value));
break;
case 570425396:
this.setSpin ("fps", Clazz.floatToInt (value));
break;
case 570425352:
this.g.defaultDrawArrowScale = value;
break;
case 570425354:
this.g.defaultTranslucent = value;
break;
case 570425345:
this.setAxesScale (tok, value);
break;
case 570425346:
this.setAxesScale (tok, value);
break;
case 570425416:
this.tm.visualRangeAngstroms = value;
this.refresh (1, "set visualRange");
break;
case 570425372:
this.setNavigationDepthPercent (value);
break;
case 570425374:
this.g.navigationSpeed = value;
break;
case 570425373:
this.tm.setNavigationSlabOffsetPercent (value);
break;
case 570425350:
this.tm.setCameraDepthPercent (value, false);
this.refresh (1, "set cameraDepth");
return;
case 570425388:
this.setRotationRadius (value, true);
return;
case 570425362:
this.g.hoverDelayMs = Clazz.floatToInt (value * 1000);
break;
case 570425392:
this.g.sheetSmoothing = value;
break;
case 570425355:
value = JV.Viewer.checkFloatRange (value, -10, 10);
this.g.dipoleScale = value;
break;
case 570425404:
this.tm.setStereoDegrees (value);
break;
case 1648361473:
this.setVectorScale (value);
return;
case 570425412:
this.setVibrationPeriod (value);
return;
case 570425414:
this.setVibrationScale (value);
return;
case 570425348:
this.setBondTolerance (value);
return;
case 570425364:
this.setMinBondDistance (value);
return;
case 570425390:
this.tm.setScaleAngstromsPerInch (value);
break;
case 570425394:
value = JV.Viewer.checkFloatRange (value, 0, 10);
this.g.solventProbeRadius = value;
break;
default:
if (!this.g.htNonbooleanParameterValues.containsKey (key.toLowerCase ())) {
this.g.setUserVariable (key, JS.SV.newF (value));
return;
}}
this.g.setF (key, value);
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "setIntProperty", 
function (key, value) {
if (value == -2147483648 || key == null || key.length == 0) return;
if (key.charAt (0) == '_') {
this.g.setI (key, value);
return;
}var tok = JS.T.getTokFromName (key);
switch (JS.T.getParamType (tok)) {
case 545259520:
this.setStringPropertyTok (key, tok, "" + value);
break;
case 603979776:
this.setBooleanPropertyTok (key, tok, value != 0);
break;
case 570425344:
this.setFloatPropertyTok (key, tok, value);
break;
default:
this.setIntPropertyTok (key, tok, value);
}
}, "~S,~N");
Clazz.defineMethod (c$, "setIntPropertyTok", 
 function (key, tok, value) {
switch (tok) {
case 553648152:
this.g.minimizationMaxAtoms = value;
break;
case 553648147:
this.g.infoFontSize = Math.max (0, value);
break;
case 553648167:
case 553648146:
case 553648168:
value = this.eval.setStatic (tok, value);
break;
case 553648185:
this.g.vectorTrail = value;
break;
case 553648138:
value = (value == 0 ? 0 : 1);
this.g.bondingVersion = JU.Elements.bondingVersion = value;
break;
case 553648137:
this.gdata.setCelPower (value);
break;
case 553648129:
this.gdata.setAmbientOcclusion (value);
break;
case 553648158:
this.g.platformSpeed = Math.min (Math.max (value, 0), 10);
break;
case 553648150:
this.g.meshScale = value;
break;
case 553648153:
this.g.minPixelSelRadius = value;
break;
case 553648148:
this.g.isosurfacePropertySmoothingPower = value;
break;
case 553648165:
this.g.repaintWaitMs = value;
break;
case 553648170:
this.g.smallMoleculeMaxAtoms = value;
break;
case 553648151:
this.g.minimizationSteps = value;
break;
case 553648184:
this.g.strutSpacing = value;
break;
case 553648156:
value = JV.Viewer.checkIntRange (value, 0, 1000);
this.gdata.setPhongExponent (value);
break;
case 553648144:
this.g.helixStep = value;
this.ms.haveStraightness = false;
break;
case 553648142:
this.g.dotScale = value;
break;
case 553648141:
this.g.dotDensity = value;
break;
case 553648139:
this.g.delayMaximumMs = value;
break;
case 553648149:
JU.Logger.setLogLevel (value);
JU.Logger.info ("logging level set to " + value);
this.g.setI ("logLevel", value);
if (this.eval != null) this.eval.setDebugging ();
return;
case 553648134:
this.setAxesMode (value == 2 ? 603979808 : value == 1 ? 603979804 : 603979809);
return;
case 553648178:
this.setStrandCount (0, value);
return;
case 553648182:
this.setStrandCount (12, value);
return;
case 553648180:
this.setStrandCount (13, value);
return;
case 553648155:
return;
case 536870922:
this.g.scriptDelay = value;
break;
case 553648176:
if (value < 0) value = JV.Viewer.checkIntRange (value, -10, -1);
 else value = JV.Viewer.checkIntRange (value, 0, 100);
this.gdata.setSpecularPower (value);
break;
case 553648172:
value = JV.Viewer.checkIntRange (-value, -10, -1);
this.gdata.setSpecularPower (value);
break;
case 553648136:
this.setMarBond (value);
return;
case 536870924:
this.setBooleanPropertyTok (key, tok, value == 1);
return;
case 553648174:
value = JV.Viewer.checkIntRange (value, 0, 100);
this.gdata.setSpecularPercent (value);
break;
case 553648140:
value = JV.Viewer.checkIntRange (value, 0, 100);
this.gdata.setDiffusePercent (value);
break;
case 553648130:
value = JV.Viewer.checkIntRange (value, 0, 100);
this.gdata.setAmbientPercent (value);
break;
case 553648186:
this.tm.zDepthToPercent (value);
break;
case 553648188:
this.tm.zSlabToPercent (value);
break;
case 554176526:
this.tm.depthToPercent (value);
break;
case 554176565:
this.tm.slabToPercent (value);
break;
case 553648190:
this.g.zShadePower = value = Math.max (value, 0);
break;
case 553648166:
this.g.ribbonAspectRatio = value;
break;
case 553648157:
this.g.pickingSpinRate = (value < 1 ? 1 : value);
break;
case 553648132:
this.setAnimationFps (value);
return;
case 553648154:
this.setPercentVdwAtom (value);
break;
case 553648145:
this.g.hermiteLevel = value;
break;
case 553648143:
case 553648160:
case 553648159:
case 553648162:
case 553648164:
break;
default:
if (!this.g.htNonbooleanParameterValues.containsKey (key)) {
this.g.setUserVariable (key, JS.SV.newI (value));
return;
}}
this.g.setI (key, value);
}, "~S,~N,~N");
c$.checkIntRange = Clazz.defineMethod (c$, "checkIntRange", 
 function (value, min, max) {
return (value < min ? min : value > max ? max : value);
}, "~N,~N,~N");
c$.checkFloatRange = Clazz.defineMethod (c$, "checkFloatRange", 
 function (value, min, max) {
return (value < min ? min : value > max ? max : value);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "setBooleanProperty", 
function (key, value) {
if (key == null || key.length == 0) return;
if (key.charAt (0) == '_') {
this.g.setB (key, value);
return;
}var tok = JS.T.getTokFromName (key);
switch (JS.T.getParamType (tok)) {
case 545259520:
this.setStringPropertyTok (key, tok, "");
break;
case 553648128:
this.setIntPropertyTok (key, tok, value ? 1 : 0);
break;
case 570425344:
this.setFloatPropertyTok (key, tok, value ? 1 : 0);
break;
default:
this.setBooleanPropertyTok (key, tok, value);
}
}, "~S,~B");
Clazz.defineMethod (c$, "setBooleanPropertyTok", 
 function (key, tok, value) {
var doRepaint = true;
switch (tok) {
case 603979823:
this.g.cipRule6Full = value;
break;
case 603979802:
this.g.autoplayMovie = value;
break;
case 603979797:
value = false;
this.g.allowAudio = value;
break;
case 603979892:
this.g.noDelay = value;
break;
case 603979891:
this.g.nboCharges = value;
break;
case 603979856:
this.g.hiddenLinesDashed = value;
break;
case 603979886:
this.g.multipleBondBananas = value;
break;
case 603979884:
this.g.modulateOccupancy = value;
break;
case 603979874:
this.g.legacyJavaFloat = value;
break;
case 603979927:
this.g.showModVecs = value;
break;
case 603979937:
this.g.showUnitCellDetails = value;
break;
case 603979848:
doRepaint = false;
break;
case 603979972:
this.g.vectorsCentered = value;
break;
case 603979810:
this.g.cartoonBlocks = value;
break;
case 603979811:
this.g.cartoonSteps = value;
break;
case 603979819:
this.g.cartoonRibose = value;
break;
case 603979837:
this.g.ellipsoidArrows = value;
break;
case 603979967:
this.g.translucent = value;
break;
case 603979818:
this.g.cartoonLadders = value;
break;
case 603979968:
var b = this.g.twistedSheets;
this.g.twistedSheets = value;
if (b != value) this.checkCoordinatesChanged ();
break;
case 603979821:
this.gdata.setCel (value);
break;
case 603979817:
this.g.cartoonFancy = value;
break;
case 603979934:
this.g.showTiming = value;
break;
case 603979973:
this.g.vectorSymmetry = value;
break;
case 603979867:
this.g.isosurfaceKey = value;
break;
case 603979893:
this.g.partialDots = value;
break;
case 603979872:
this.g.legacyAutoBonding = value;
break;
case 603979826:
this.g.defaultStructureDSSP = value;
break;
case 603979834:
this.g.dsspCalcHydrogen = value;
break;
case 603979782:
this.g.allowModelkit = value;
if (!value) this.setModelKitMode (false);
break;
case 603983903:
this.setModelKitMode (value);
break;
case 603979887:
this.g.multiProcessor = value && (JV.Viewer.nProcessors > 1);
break;
case 603979885:
this.g.monitorEnergy = value;
break;
case 603979853:
this.g.hbondsRasmol = value;
break;
case 603979880:
this.g.minimizationRefresh = value;
break;
case 603979881:
this.g.minimizationSilent = value;
break;
case 603979866:
if (value) {
this.$isKiosk = true;
this.g.disablePopupMenu = true;
if (this.display != null) this.apiPlatform.setTransparentCursor (this.display);
}break;
case 603979975:
this.g.waitForMoveTo = value;
break;
case 603979875:
this.g.logCommands = true;
break;
case 603979876:
this.g.logGestures = true;
break;
case 603979784:
this.g.allowMultiTouch = value;
break;
case 603979898:
this.g.preserveState = value;
this.ms.setPreserveState (value);
this.undoClear ();
break;
case 603979955:
this.g.strutsMultiple = value;
break;
case 603979842:
break;
case 603979939:
this.g.slabByAtom = value;
break;
case 603979940:
this.g.slabByMolecule = value;
break;
case 603979903:
this.g.saveProteinStructureState = value;
break;
case 603979780:
this.g.allowGestures = value;
break;
case 603979865:
this.g.imageState = value;
break;
case 603979970:
this.g.useMinimizationThread = value;
break;
case 603979781:
this.g.allowKeyStrokes = value;
break;
case 603979831:
this.g.dragSelected = value;
this.showSelected = false;
break;
case 603979924:
this.g.showKeyStrokes = value;
break;
case 603979844:
this.g.fontCaching = value;
break;
case 603979796:
this.g.atomPicking = value;
break;
case 603979814:
this.highlight (null);
this.g.bondPicking = value;
break;
case 603979906:
this.g.selectAllModels = value;
if (value) this.slm.setSelectionSubset (null);
 else this.am.setSelectAllSubset (false);
break;
case 603979879:
this.g.messageStyleChime = value;
break;
case 603979896:
this.g.pdbSequential = value;
break;
case 603979894:
this.g.pdbAddHydrogens = value;
break;
case 603979895:
this.g.pdbGetHeader = value;
break;
case 603979838:
this.g.ellipsoidAxes = value;
break;
case 603979836:
this.g.ellipsoidArcs = value;
break;
case 603979839:
this.g.ellipsoidBall = value;
break;
case 603979840:
this.g.ellipsoidDots = value;
break;
case 603979841:
this.g.ellipsoidFill = value;
break;
case 603979845:
this.g.fontScaling = value;
break;
case 603979956:
this.setSyncTarget (0, value);
break;
case 603979958:
this.setSyncTarget (1, value);
break;
case 603979977:
this.g.wireframeRotation = value;
break;
case 603979868:
this.g.isosurfacePropertySmoothing = value;
break;
case 603979833:
this.g.drawPicking = value;
break;
case 603979786:
case 603979790:
case 603979788:
this.setAntialias (tok, value);
break;
case 603979944:
this.g.smartAromatic = value;
break;
case 603979794:
this.setApplySymmetryToBonds (value);
break;
case 603979792:
this.g.appendNew = value;
break;
case 603979800:
this.g.autoFps = value;
break;
case 603979971:
JU.DF.setUseNumberLocalization (this.g.useNumberLocalization = value);
break;
case 603979918:
case 1611272202:
key = "showFrank";
this.setFrankOn (value);
break;
case 1612709912:
key = "solventProbe";
this.g.solventOn = value;
break;
case 603979948:
this.g.solventOn = value;
break;
case 603979785:
this.g.allowRotateSelected = value;
break;
case 603979783:
this.g.allowMoveAtoms = value;
this.showSelected = false;
break;
case 536870922:
this.setIntPropertyTok ("showScript", tok, value ? 1 : 0);
return;
case 603979778:
this.g.allowEmbeddedScripts = value;
break;
case 603979890:
this.g.navigationPeriodic = value;
break;
case 603979984:
this.tm.setZShadeEnabled (value);
return;
case 603979832:
if (this.haveDisplay) this.g.drawHover = value;
break;
case 603979889:
this.setNavigationMode (value);
break;
case 603979888:
return;
case 603979860:
this.g.hideNavigationPoint = value;
break;
case 603979930:
this.g.showNavigationPointAlways = value;
break;
case 603979900:
this.setRefreshing (value);
break;
case 603979869:
this.g.jmolInJSpecView = value;
break;
case 603979870:
this.g.justifyMeasurements = value;
break;
case 603979952:
this.g.ssbondsBackbone = value;
break;
case 603979852:
this.g.hbondsBackbone = value;
break;
case 603979854:
this.g.hbondsSolid = value;
break;
case 536870924:
this.gdata.setSpecular (value);
break;
case 603979942:
this.tm.setSlabEnabled (value);
return;
case 603979980:
this.tm.setZoomEnabled (value);
return;
case 603979864:
this.g.highResolutionFlag = value;
break;
case 603979966:
this.g.traceAlpha = value;
break;
case 603979983:
this.g.zoomLarge = value;
this.tm.setZoomHeight (this.g.zoomHeight, value);
break;
case 603979982:
this.g.zoomHeight = value;
this.tm.setZoomHeight (value, this.g.zoomLarge);
break;
case 603979871:
J.i18n.GT.setDoTranslate (value);
break;
case 603979862:
this.slm.setHideNotSelected (value);
break;
case 603979904:
this.setScriptQueue (value);
break;
case 603979830:
this.g.dotSurface = value;
break;
case 603979829:
this.g.dotsSelectedOnly = value;
break;
case 1611141171:
this.setSelectionHalosEnabled (value);
break;
case 603979910:
this.g.rasmolHydrogenSetting = value;
break;
case 603979908:
this.g.rasmolHeteroSetting = value;
break;
case 603979928:
this.g.showMultipleBonds = value;
break;
case 603979920:
this.g.showHiddenSelectionHalos = value;
break;
case 603979976:
this.tm.setWindowCentered (value);
break;
case 603979828:
this.g.displayCellParameters = value;
break;
case 603979960:
this.g.testFlag1 = value;
break;
case 603979962:
this.g.testFlag2 = value;
break;
case 603979964:
this.g.testFlag3 = value;
break;
case 603979965:
this.jmolTest ();
this.g.testFlag4 = value;
break;
case 603979901:
this.g.ribbonBorder = value;
break;
case 603979816:
this.g.cartoonBaseEdges = value;
break;
case 603979820:
this.g.cartoonRockets = value;
break;
case 603979902:
this.g.rocketBarrels = value;
break;
case 603979850:
this.gdata.setGreyscaleMode (this.g.greyscaleRendering = value);
break;
case 603979878:
this.g.measurementLabels = value;
break;
case 603979809:
case 603979804:
case 603979808:
this.setAxesMode (tok);
return;
case 603979806:
this.setAxesOrientationRasmol (value);
return;
case 603979824:
this.setStringPropertyTok ("defaultcolorscheme", 545259545, value ? "rasmol" : "jmol");
return;
case 603979825:
this.setDebugScript (value);
return;
case 603979897:
this.setPerspectiveDepth (value);
return;
case 603979798:
this.setAutoBond (value);
return;
case 603979914:
this.setShowAxes (value);
return;
case 603979916:
this.setShowBbcage (value);
return;
case 603979922:
this.setShowHydrogens (value);
return;
case 603979926:
this.setShowMeasurements (value);
return;
case 603979936:
this.setShowUnitCell (value);
return;
case 603979812:
doRepaint = false;
this.g.bondModeOr = value;
break;
case 603979978:
doRepaint = false;
this.g.zeroBasedXyzRasmol = value;
this.reset (true);
break;
case 603979899:
doRepaint = false;
this.g.rangeSelected = value;
break;
case 603979877:
doRepaint = false;
this.g.measureAllModels = value;
break;
case 603979954:
doRepaint = false;
this.sm.allowStatusReporting = value;
break;
case 603979822:
doRepaint = false;
this.g.chainCaseSensitive = value;
break;
case 603979858:
doRepaint = false;
this.g.hideNameInPopup = value;
break;
case 603979827:
doRepaint = false;
this.g.disablePopupMenu = value;
break;
case 603979846:
doRepaint = false;
this.g.forceAutoBond = value;
break;
default:
if (!this.g.htBooleanParameterFlags.containsKey (key.toLowerCase ())) {
this.g.setUserVariable (key, JS.SV.getBoolean (value));
return;
}}
this.g.setB (key, value);
if (doRepaint) this.setTainted (true);
}, "~S,~N,~B");
Clazz.defineMethod (c$, "setModelKitMode", 
 function (value) {
if (this.acm == null || !this.allowScripting) return;
if (value || this.g.modelKitMode) {
this.setPickingMode (null, value ? 33 : 1);
this.setPickingMode (null, value ? 32 : 1);
}var isChange = (this.g.modelKitMode != value);
this.g.modelKitMode = value;
this.highlight (null);
if (value) {
this.setNavigationMode (false);
this.selectAll ();
this.getModelkit (false).setProperty ("atomType", "C");
this.getModelkit (false).setProperty ("bondType", "p");
if (!this.isApplet) this.popupMenu (0, 0, 'm');
if (isChange) this.sm.setCallbackFunction ("modelkit", "ON");
this.g.modelKitMode = true;
if (this.ms.ac == 0) this.zap (false, true, true);
} else {
this.acm.setPickingMode (-1);
this.setStringProperty ("pickingStyle", "toggle");
this.setBooleanProperty ("bondPicking", false);
if (isChange) this.sm.setCallbackFunction ("modelkit", "OFF");
}}, "~B");
Clazz.defineMethod (c$, "setSmilesString", 
function (s) {
if (s == null) this.g.removeParam ("_smilesString");
 else this.g.setO ("_smilesString", s);
}, "~S");
Clazz.defineMethod (c$, "removeUserVariable", 
function (key) {
this.g.removeUserVariable (key);
if (key.endsWith ("callback")) this.sm.setCallbackFunction (key, null);
}, "~S");
Clazz.defineMethod (c$, "jmolTest", 
 function () {
});
Clazz.defineMethod (c$, "showParameter", 
function (key, ifNotSet, nMax) {
var sv = "" + this.g.getParameterEscaped (key, nMax);
if (ifNotSet || sv.indexOf ("<not defined>") < 0) this.showString (key + " = " + sv, false);
}, "~S,~B,~N");
Clazz.defineMethod (c$, "showString", 
function (str, isPrint) {
if (!JV.Viewer.isJS && this.isScriptQueued () && (!this.isSilent || isPrint) && !"\0".equals (str)) {
JU.Logger.warn (str);
}this.scriptEcho (str);
}, "~S,~B");
Clazz.defineMethod (c$, "getAllSettings", 
function (prefix) {
return this.getStateCreator ().getAllSettings (prefix);
}, "~S");
Clazz.defineMethod (c$, "getBindingInfo", 
function (qualifiers) {
return (this.haveDisplay ? this.acm.getBindingInfo (qualifiers) : "");
}, "~S");
Clazz.defineMethod (c$, "getIsosurfacePropertySmoothing", 
function (asPower) {
return (asPower ? this.g.isosurfacePropertySmoothingPower : this.g.isosurfacePropertySmoothing ? 1 : 0);
}, "~B");
Clazz.defineMethod (c$, "setNavigationDepthPercent", 
function (percent) {
this.tm.setNavigationDepthPercent (percent);
this.refresh (1, "set navigationDepth");
}, "~N");
Clazz.defineMethod (c$, "getShowNavigationPoint", 
function () {
if (!this.g.navigationMode) return false;
return (this.tm.isNavigating () && !this.g.hideNavigationPoint || this.g.showNavigationPointAlways || this.getInMotion (true));
});
Clazz.defineMethod (c$, "getCurrentSolventProbeRadius", 
function () {
return this.g.solventOn ? this.g.solventProbeRadius : 0;
});
Clazz.overrideMethod (c$, "setPerspectiveDepth", 
function (perspectiveDepth) {
this.tm.setPerspectiveDepth (perspectiveDepth);
}, "~B");
Clazz.overrideMethod (c$, "setAxesOrientationRasmol", 
function (TF) {
this.g.setB ("axesOrientationRasmol", TF);
this.g.axesOrientationRasmol = TF;
this.reset (true);
}, "~B");
Clazz.defineMethod (c$, "setAxesScale", 
 function (tok, val) {
val = JV.Viewer.checkFloatRange (val, -100, 100);
if (tok == 570425345) this.g.axesOffset = val;
 else this.g.axesScale = val;
this.axesAreTainted = true;
}, "~N,~N");
Clazz.defineMethod (c$, "setAxesMode", 
function (mode) {
this.g.axesMode = mode;
this.axesAreTainted = true;
switch (mode) {
case 603979808:
this.g.removeParam ("axesmolecular");
this.g.removeParam ("axeswindow");
this.g.setB ("axesUnitcell", true);
mode = 2;
break;
case 603979804:
this.g.removeParam ("axesunitcell");
this.g.removeParam ("axeswindow");
this.g.setB ("axesMolecular", true);
mode = 1;
break;
case 603979809:
this.g.removeParam ("axesunitcell");
this.g.removeParam ("axesmolecular");
this.g.setB ("axesWindow", true);
mode = 0;
}
this.g.setI ("axesMode", mode);
}, "~N");
Clazz.defineMethod (c$, "getSelectionHalosEnabled", 
function () {
return this.selectionHalosEnabled;
});
Clazz.defineMethod (c$, "setSelectionHalosEnabled", 
function (TF) {
if (this.selectionHalosEnabled == TF) return;
this.g.setB ("selectionHalos", TF);
this.shm.loadShape (8);
this.selectionHalosEnabled = TF;
}, "~B");
Clazz.defineMethod (c$, "getShowSelectedOnce", 
function () {
var flag = this.showSelected;
this.showSelected = false;
return flag;
});
Clazz.defineMethod (c$, "setStrandCount", 
 function (type, value) {
value = JV.Viewer.checkIntRange (value, 0, 20);
switch (type) {
case 12:
this.g.strandCountForStrands = value;
break;
case 13:
this.g.strandCountForMeshRibbon = value;
break;
default:
this.g.strandCountForStrands = value;
this.g.strandCountForMeshRibbon = value;
break;
}
this.g.setI ("strandCount", value);
this.g.setI ("strandCountForStrands", this.g.strandCountForStrands);
this.g.setI ("strandCountForMeshRibbon", this.g.strandCountForMeshRibbon);
}, "~N,~N");
Clazz.defineMethod (c$, "getStrandCount", 
function (type) {
return (type == 12 ? this.g.strandCountForStrands : this.g.strandCountForMeshRibbon);
}, "~N");
Clazz.defineMethod (c$, "setNavigationMode", 
function (TF) {
this.g.navigationMode = TF;
this.tm.setNavigationMode (TF);
}, "~B");
Clazz.overrideMethod (c$, "setAutoBond", 
function (TF) {
this.g.setB ("autobond", TF);
this.g.autoBond = TF;
}, "~B");
Clazz.defineMethod (c$, "makeConnections", 
function (minDistance, maxDistance, order, connectOperation, bsA, bsB, bsBonds, isBonds, addGroup, energy) {
this.clearModelDependentObjects ();
this.clearMinimization ();
return this.ms.makeConnections (minDistance, maxDistance, order, connectOperation, bsA, bsB, bsBonds, isBonds, addGroup, energy);
}, "~N,~N,~N,~N,JU.BS,JU.BS,JU.BS,~B,~B,~N");
Clazz.overrideMethod (c$, "rebond", 
function () {
this.rebondState (false);
});
Clazz.defineMethod (c$, "rebondState", 
function (isStateScript) {
this.clearModelDependentObjects ();
this.ms.deleteAllBonds ();
var isLegacy = isStateScript && this.g.legacyAutoBonding;
this.ms.autoBondBs4 (null, null, null, null, this.getMadBond (), isLegacy);
this.addStateScript ((isLegacy ? "set legacyAutoBonding TRUE;connect;set legacyAutoBonding FALSE;" : "connect;"), false, true);
}, "~B");
Clazz.overrideMethod (c$, "setPercentVdwAtom", 
function (value) {
this.g.setI ("percentVdwAtom", value);
this.g.percentVdwAtom = value;
this.rd.value = value / 100;
this.rd.factorType = J.atomdata.RadiusData.EnumType.FACTOR;
this.rd.vdwType = J.c.VDW.AUTO;
this.shm.setShapeSizeBs (0, 0, this.rd, null);
}, "~N");
Clazz.overrideMethod (c$, "getMadBond", 
function () {
return (this.g.bondRadiusMilliAngstroms * 2);
});
Clazz.overrideMethod (c$, "setShowHydrogens", 
function (TF) {
this.g.setB ("showHydrogens", TF);
this.g.showHydrogens = TF;
}, "~B");
Clazz.defineMethod (c$, "setShowBbcage", 
function (value) {
this.setObjectMad10 (32, "boundbox", (value ? -4 : 0));
this.g.setB ("showBoundBox", value);
}, "~B");
Clazz.defineMethod (c$, "getShowBbcage", 
function () {
return this.getObjectMad10 (4) != 0;
});
Clazz.defineMethod (c$, "setShowUnitCell", 
function (value) {
this.setObjectMad10 (33, "unitcell", (value ? -2 : 0));
this.g.setB ("showUnitCell", value);
}, "~B");
Clazz.defineMethod (c$, "getShowUnitCell", 
function () {
return this.getObjectMad10 (5) != 0;
});
Clazz.defineMethod (c$, "setShowAxes", 
function (value) {
this.setObjectMad10 (34, "axes", (value ? -2 : 0));
this.g.setB ("showAxes", value);
}, "~B");
Clazz.defineMethod (c$, "getShowAxes", 
function () {
return this.getObjectMad10 (1) != 0;
});
Clazz.overrideMethod (c$, "setFrankOn", 
function (TF) {
if (this.isPreviewOnly) TF = false;
this.frankOn = TF;
this.setObjectMad10 (36, "frank", (TF ? 1 : 0));
}, "~B");
Clazz.defineMethod (c$, "getShowFrank", 
function () {
if (this.isPreviewOnly || this.isApplet && this.creatingImage) return false;
return (this.isSignedApplet && !this.isSignedAppletLocal && !JV.Viewer.isJS || this.frankOn);
});
Clazz.overrideMethod (c$, "setShowMeasurements", 
function (TF) {
this.g.setB ("showMeasurements", TF);
this.g.showMeasurements = TF;
}, "~B");
Clazz.defineMethod (c$, "setUnits", 
function (units, isDistance) {
this.g.setUnits (units);
if (isDistance) {
this.g.setUnits (units);
this.setShapeProperty (6, "reformatDistances", null);
} else {
}}, "~S,~B");
Clazz.overrideMethod (c$, "setRasmolDefaults", 
function () {
this.setDefaultsType ("RasMol");
});
Clazz.overrideMethod (c$, "setJmolDefaults", 
function () {
this.setDefaultsType ("Jmol");
});
Clazz.defineMethod (c$, "setDefaultsType", 
 function (type) {
if (type.equalsIgnoreCase ("RasMol")) {
this.stm.setRasMolDefaults ();
return;
}if (type.equalsIgnoreCase ("PyMOL")) {
this.stm.setPyMOLDefaults ();
return;
}this.stm.setJmolDefaults ();
this.setIntProperty ("bondingVersion", 0);
this.shm.setShapeSizeBs (0, 0, this.rd, this.getAllAtoms ());
}, "~S");
Clazz.defineMethod (c$, "setAntialias", 
 function (tok, TF) {
var isChanged = false;
switch (tok) {
case 603979786:
isChanged = (this.g.antialiasDisplay != TF);
this.g.antialiasDisplay = TF;
break;
case 603979790:
isChanged = (this.g.antialiasTranslucent != TF);
this.g.antialiasTranslucent = TF;
break;
case 603979788:
this.g.antialiasImages = TF;
return;
}
if (isChanged) {
this.resizeImage (0, 0, false, false, true);
this.refresh (3, "Viewer:setAntialias()");
}}, "~N,~B");
Clazz.defineMethod (c$, "allocTempPoints", 
function (size) {
return this.tempArray.allocTempPoints (size);
}, "~N");
Clazz.defineMethod (c$, "freeTempPoints", 
function (tempPoints) {
this.tempArray.freeTempPoints (tempPoints);
}, "~A");
Clazz.defineMethod (c$, "allocTempScreens", 
function (size) {
return this.tempArray.allocTempScreens (size);
}, "~N");
Clazz.defineMethod (c$, "freeTempScreens", 
function (tempScreens) {
this.tempArray.freeTempScreens (tempScreens);
}, "~A");
Clazz.defineMethod (c$, "allocTempEnum", 
function (size) {
return this.tempArray.allocTempEnum (size);
}, "~N");
Clazz.defineMethod (c$, "freeTempEnum", 
function (temp) {
this.tempArray.freeTempEnum (temp);
}, "~A");
Clazz.defineMethod (c$, "getFont3D", 
function (fontFace, fontStyle, fontSize) {
return this.gdata.getFont3DFSS (fontFace, fontStyle, fontSize);
}, "~S,~S,~N");
Clazz.defineMethod (c$, "getAtomGroupQuaternions", 
function (bsAtoms, nMax) {
return this.ms.getAtomGroupQuaternions (bsAtoms, nMax, this.getQuaternionFrame ());
}, "JU.BS,~N");
Clazz.defineMethod (c$, "setStereoMode", 
function (twoColors, stereoMode, degrees) {
this.setFloatProperty ("stereoDegrees", degrees);
this.setBooleanProperty ("greyscaleRendering", stereoMode.isBiColor ());
if (twoColors != null) this.tm.setStereoMode2 (twoColors);
 else this.tm.setStereoMode (stereoMode);
}, "~A,J.c.STER,~N");
Clazz.defineMethod (c$, "getChimeInfo", 
function (tok) {
return this.getPropertyManager ().getChimeInfo (tok, this.bsA ());
}, "~N");
Clazz.defineMethod (c$, "getModelFileInfo", 
function () {
return this.getPropertyManager ().getModelFileInfo (this.getVisibleFramesBitSet ());
});
Clazz.defineMethod (c$, "getModelFileInfoAll", 
function () {
return this.getPropertyManager ().getModelFileInfo (null);
});
Clazz.overrideMethod (c$, "getProperty", 
function (returnType, infoType, paramInfo) {
if (!"DATA_API".equals (returnType)) return this.getPropertyManager ().getProperty (returnType, infoType, paramInfo);
switch (("scriptCheck.........consoleText.........scriptEditor........scriptEditorState...getAppConsole.......getScriptEditor.....setMenu.............spaceGroupInfo......disablePopupMenu....defaultDirectory....getPopupMenu........shapeManager........getPreference.......").indexOf (infoType)) {
case 0:
return this.scriptCheckRet (paramInfo, true);
case 20:
return (this.appConsole == null ? "" : this.appConsole.getText ());
case 40:
this.showEditor (paramInfo);
return null;
case 60:
this.scriptEditorVisible = (paramInfo).booleanValue ();
return null;
case 80:
if (this.$isKiosk) {
this.appConsole = null;
} else if (Clazz.instanceOf (paramInfo, J.api.JmolAppConsoleInterface)) {
this.appConsole = paramInfo;
} else if (paramInfo != null && !(paramInfo).booleanValue ()) {
this.appConsole = null;
} else if (this.appConsole == null && paramInfo != null && (paramInfo).booleanValue ()) {
if (JV.Viewer.isJS) {
this.appConsole = J.api.Interface.getOption ("consolejs.AppletConsole", this, "script");
}{
}if (this.appConsole != null) this.appConsole.start (this);
}this.scriptEditor = (JV.Viewer.isJS || this.appConsole == null ? null : this.appConsole.getScriptEditor ());
return this.appConsole;
case 100:
if (this.appConsole == null && paramInfo != null && (paramInfo).booleanValue ()) {
this.getProperty ("DATA_API", "getAppConsole", Boolean.TRUE);
this.scriptEditor = (this.appConsole == null ? null : this.appConsole.getScriptEditor ());
}return this.scriptEditor;
case 120:
if (this.jmolpopup != null) this.jmolpopup.jpiDispose ();
this.jmolpopup = null;
return this.menuStructure = paramInfo;
case 140:
return this.getSymTemp ().getSpaceGroupInfo (this.ms, null, -1, false, null);
case 160:
this.g.disablePopupMenu = true;
return null;
case 180:
return this.g.defaultDirectory;
case 200:
if (Clazz.instanceOf (paramInfo, String)) return this.getMenu (paramInfo);
return this.getPopupMenu ();
case 220:
return this.shm.getProperty (paramInfo);
case 240:
return this.sm.syncSend ("getPreference", paramInfo, 1);
}
JU.Logger.error ("ERROR in getProperty DATA_API: " + infoType);
return null;
}, "~S,~S,~O");
Clazz.defineMethod (c$, "showEditor", 
function (file_text) {
var scriptEditor = this.getProperty ("DATA_API", "getScriptEditor", Boolean.TRUE);
if (scriptEditor == null) return;
scriptEditor.show (file_text);
}, "~A");
Clazz.defineMethod (c$, "getPropertyManager", 
 function () {
if (this.pm == null) (this.pm = J.api.Interface.getInterface ("JV.PropertyManager", this, "prop")).setViewer (this);
return this.pm;
});
Clazz.defineMethod (c$, "setTainted", 
function (TF) {
this.isTainted = this.axesAreTainted = (TF && (this.refreshing || this.creatingImage));
}, "~B");
Clazz.defineMethod (c$, "notifyMouseClicked", 
function (x, y, action, mode) {
var modifiers = JV.binding.Binding.getButtonMods (action);
var clickCount = JV.binding.Binding.getClickCount (action);
this.g.setI ("_mouseX", x);
this.g.setI ("_mouseY", this.screenHeight - y);
this.g.setI ("_mouseAction", action);
this.g.setI ("_mouseModifiers", modifiers);
this.g.setI ("_clickCount", clickCount);
return this.sm.setStatusClicked (x, this.screenHeight - y, action, clickCount, mode);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "checkObjectClicked", 
function (x, y, modifiers) {
return this.shm.checkObjectClicked (x, y, modifiers, this.getVisibleFramesBitSet (), this.g.drawPicking);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "checkObjectHovered", 
function (x, y) {
return (x >= 0 && this.shm != null && this.shm.checkObjectHovered (x, y, this.getVisibleFramesBitSet (), this.getBondsPickable ()));
}, "~N,~N");
Clazz.defineMethod (c$, "checkObjectDragged", 
function (prevX, prevY, x, y, action) {
var iShape = 0;
switch (this.getPickingMode ()) {
case 2:
iShape = 5;
break;
case 4:
iShape = 22;
break;
}
if (this.shm.checkObjectDragged (prevX, prevY, x, y, action, this.getVisibleFramesBitSet (), iShape)) {
this.refresh (1, "checkObjectDragged");
if (iShape == 22) this.scriptEcho (this.getShapeProperty (22, "command"));
return true;
}return false;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "rotateAxisAngleAtCenter", 
function (eval, rotCenter, rotAxis, degreesPerSecond, endDegrees, isSpin, bsSelected) {
var isOK = this.tm.rotateAxisAngleAtCenter (eval, rotCenter, rotAxis, degreesPerSecond, endDegrees, isSpin, bsSelected);
if (isOK) this.setSync ();
return isOK;
}, "J.api.JmolScriptEvaluator,JU.P3,JU.V3,~N,~N,~B,JU.BS");
Clazz.defineMethod (c$, "rotateAboutPointsInternal", 
function (eval, point1, point2, degreesPerSecond, endDegrees, isSpin, bsSelected, translation, finalPoints, dihedralList, m4) {
if (eval == null) eval = this.eval;
if (this.headless) {
if (isSpin && endDegrees == 3.4028235E38) return false;
isSpin = false;
}var isOK = this.tm.rotateAboutPointsInternal (eval, point1, point2, degreesPerSecond, endDegrees, false, isSpin, bsSelected, false, translation, finalPoints, dihedralList, m4);
if (isOK) this.setSync ();
return isOK;
}, "J.api.JmolScriptEvaluator,JU.P3,JU.P3,~N,~N,~B,JU.BS,JU.V3,JU.Lst,~A,JU.M4");
Clazz.defineMethod (c$, "startSpinningAxis", 
function (pt1, pt2, isClockwise) {
if (this.tm.spinOn || this.tm.navOn) {
this.tm.setSpinOff ();
this.tm.setNavOn (false);
return;
}this.tm.rotateAboutPointsInternal (null, pt1, pt2, this.g.pickingSpinRate, 3.4028235E38, isClockwise, true, null, false, null, null, null, null);
}, "JU.T3,JU.T3,~B");
Clazz.defineMethod (c$, "getModelDipole", 
function () {
return this.ms.getModelDipole (this.am.cmi);
});
Clazz.defineMethod (c$, "calculateMolecularDipole", 
function (bsAtoms) {
try {
return this.ms.calculateMolecularDipole (this.am.cmi, bsAtoms);
} catch (e) {
if (Clazz.exceptionOf (e, JV.JmolAsyncException)) {
if (this.eval != null) this.eval.loadFileResourceAsync (e.getFileName ());
return null;
} else {
throw e;
}
}
}, "JU.BS");
Clazz.defineMethod (c$, "setDefaultLattice", 
function (p) {
if (!Float.isNaN (p.x + p.y + p.z)) this.g.ptDefaultLattice.setT (p);
this.g.setO ("defaultLattice", JU.Escape.eP (p));
}, "JU.P3");
Clazz.defineMethod (c$, "getDefaultLattice", 
function () {
return this.g.ptDefaultLattice;
});
Clazz.defineMethod (c$, "getModelExtract", 
function (atomExpression, doTransform, isModelKit, type) {
return this.getPropertyManager ().getModelExtract (this.getAtomBitSet (atomExpression), doTransform, isModelKit, type, false);
}, "~O,~B,~B,~S");
Clazz.overrideMethod (c$, "getData", 
function (atomExpression, type) {
return this.getModelFileData (atomExpression, type, true);
}, "~S,~S");
Clazz.defineMethod (c$, "getModelFileData", 
function (atomExpression, type, allTrajectories) {
return this.getPropertyManager ().getAtomData (atomExpression, type, allTrajectories);
}, "~S,~S,~B");
Clazz.defineMethod (c$, "getModelCml", 
function (bs, nAtomsMax, addBonds, doTransform) {
return this.getPropertyManager ().getModelCml (bs, nAtomsMax, addBonds, doTransform, false);
}, "JU.BS,~N,~B,~B");
Clazz.defineMethod (c$, "getPdbAtomData", 
function (bs, out, asPQR, doTransform) {
return this.getPropertyManager ().getPdbAtomData (bs == null ? this.bsA () : bs, out, asPQR, doTransform, false);
}, "JU.BS,JU.OC,~B,~B");
Clazz.defineMethod (c$, "isJmolDataFrame", 
function () {
return this.ms.isJmolDataFrameForModel (this.am.cmi);
});
Clazz.defineMethod (c$, "setFrameTitle", 
function (modelIndex, title) {
this.ms.setFrameTitle (JU.BSUtil.newAndSetBit (modelIndex), title);
}, "~N,~S");
Clazz.defineMethod (c$, "setFrameTitleObj", 
function (title) {
this.shm.loadShape (31);
this.ms.setFrameTitle (this.getVisibleFramesBitSet (), title);
}, "~O");
Clazz.defineMethod (c$, "getFrameTitle", 
function () {
return this.ms.getFrameTitle (this.am.cmi);
});
Clazz.defineMethod (c$, "setAtomProperty", 
function (bs, tok, iValue, fValue, sValue, values, list) {
if (tok == 1648363544) this.shm.deleteVdwDependentShapes (bs);
this.clearMinimization ();
this.ms.setAtomProperty (bs, tok, iValue, fValue, sValue, values, list);
switch (tok) {
case 1111492609:
case 1111492610:
case 1111492611:
case 1111492612:
case 1111492613:
case 1111492614:
case 1111490577:
case 1111490578:
case 1111490579:
case 1086326789:
this.refreshMeasures (true);
}
}, "JU.BS,~N,~N,~N,~S,~A,~A");
Clazz.defineMethod (c$, "checkCoordinatesChanged", 
function () {
this.ms.recalculatePositionDependentQuantities (null, null);
this.refreshMeasures (true);
});
Clazz.defineMethod (c$, "setAtomCoords", 
function (bs, tokType, xyzValues) {
if (bs.isEmpty ()) return;
this.ms.setAtomCoords (bs, tokType, xyzValues);
this.checkMinimization ();
this.sm.setStatusAtomMoved (bs);
}, "JU.BS,~N,~O");
Clazz.defineMethod (c$, "setAtomCoordsRelative", 
function (offset, bs) {
if (bs == null) bs = this.bsA ();
if (bs.isEmpty ()) return;
this.ms.setAtomCoordsRelative (offset, bs);
this.checkMinimization ();
this.sm.setStatusAtomMoved (bs);
}, "JU.T3,JU.BS");
Clazz.defineMethod (c$, "invertAtomCoordPt", 
function (pt, bs) {
this.ms.invertSelected (pt, null, -1, bs);
this.checkMinimization ();
this.sm.setStatusAtomMoved (bs);
}, "JU.P3,JU.BS");
Clazz.defineMethod (c$, "invertAtomCoordPlane", 
function (plane, bs) {
this.ms.invertSelected (null, plane, -1, bs);
this.checkMinimization ();
this.sm.setStatusAtomMoved (bs);
}, "JU.P4,JU.BS");
Clazz.defineMethod (c$, "invertRingAt", 
function (atomIndex, isClick) {
var bs = this.getAtomBitSet ("connected(atomIndex=" + atomIndex + ") and !within(SMARTS,'[r50,R]')");
var nb = bs.cardinality ();
switch (nb) {
case 0:
case 1:
return;
case 2:
break;
case 3:
case 4:
var lengths =  Clazz.newIntArray (nb, 0);
var points =  Clazz.newIntArray (nb, 0);
var ni = 0;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1), ni++) {
lengths[ni] = this.getBranchBitSet (i, atomIndex, true).cardinality ();
points[ni] = i;
}
for (var j = 0; j < nb - 2; j++) {
var max = -2147483648;
var imax = 0;
for (var i = 0; i < nb; i++) if (lengths[i] >= max && bs.get (points[i])) {
imax = points[i];
max = lengths[i];
}
bs.clear (imax);
}
}
if (isClick) this.undoMoveActionClear (atomIndex, 2, true);
this.invertSelected (null, null, atomIndex, bs);
if (isClick) this.setStatusAtomPicked (atomIndex, "inverted: " + JU.Escape.eBS (bs), null, false);
}, "~N,~B");
Clazz.defineMethod (c$, "invertSelected", 
function (pt, plane, iAtom, bsAtoms) {
if (bsAtoms == null) bsAtoms = this.bsA ();
if (bsAtoms.cardinality () == 0) return;
this.ms.invertSelected (pt, plane, iAtom, bsAtoms);
this.checkMinimization ();
this.sm.setStatusAtomMoved (bsAtoms);
}, "JU.P3,JU.P4,~N,JU.BS");
Clazz.defineMethod (c$, "moveAtoms", 
function (m4, mNew, rotation, translation, center, isInternal, bsAtoms, translationOnly) {
if (bsAtoms.isEmpty ()) return;
this.ms.moveAtoms (m4, mNew, rotation, translation, bsAtoms, center, isInternal, translationOnly);
this.checkMinimization ();
this.sm.setStatusAtomMoved (bsAtoms);
}, "JU.M4,JU.M3,JU.M3,JU.V3,JU.P3,~B,JU.BS,~B");
Clazz.defineMethod (c$, "moveSelected", 
function (deltaX, deltaY, deltaZ, x, y, bsSelected, isTranslation, asAtoms, modifiers) {
if (deltaZ == 0) return;
if (x == -2147483648) this.setModelKitRotateBondIndex (-2147483648);
if (this.isJmolDataFrame ()) return;
if (deltaX == -2147483648) {
this.showSelected = true;
this.movableBitSet = this.setMovableBitSet (null, !asAtoms);
this.shm.loadShape (8);
this.refresh (6, "moveSelected");
return;
}if (deltaX == 2147483647) {
if (!this.showSelected) return;
this.showSelected = false;
this.movableBitSet = null;
this.refresh (6, "moveSelected");
return;
}if (this.movingSelected) return;
this.movingSelected = true;
this.stopMinimization ();
if (x != -2147483648 && this.modelkit != null && this.modelkit.getProperty ("rotateBondIndex") != null) {
this.modelkit.actionRotateBond (deltaX, deltaY, x, y, (modifiers & 16) != 0);
} else {
bsSelected = this.setMovableBitSet (bsSelected, !asAtoms);
if (!bsSelected.isEmpty ()) {
if (isTranslation) {
var ptCenter = this.ms.getAtomSetCenter (bsSelected);
this.tm.finalizeTransformParameters ();
var f = (this.g.antialiasDisplay ? 2 : 1);
var ptScreen = this.tm.transformPt (ptCenter);
var ptScreenNew;
if (deltaZ != -2147483648) ptScreenNew = JU.P3.new3 (ptScreen.x, ptScreen.y, ptScreen.z + deltaZ + 0.5);
 else ptScreenNew = JU.P3.new3 (ptScreen.x + deltaX * f + 0.5, ptScreen.y + deltaY * f + 0.5, ptScreen.z);
var ptNew =  new JU.P3 ();
this.tm.unTransformPoint (ptScreenNew, ptNew);
ptNew.sub (ptCenter);
this.setAtomCoordsRelative (ptNew, bsSelected);
} else {
this.tm.rotateXYBy (deltaX, deltaY, bsSelected);
}}}this.refresh (2, "");
this.movingSelected = false;
}, "~N,~N,~N,~N,~N,JU.BS,~B,~B,~N");
Clazz.defineMethod (c$, "highlightBond", 
function (index, closestAtomIndex, x, y) {
if (!this.hoverEnabled) return;
var bs = null;
if (index >= 0) {
var b = this.ms.bo[index];
var i = b.atom2.i;
if (!this.ms.isAtomInLastModel (i)) return;
bs = JU.BSUtil.newAndSetBit (i);
bs.set (b.atom1.i);
}this.highlight (bs);
this.setModelkitProperty ("bondIndex", Integer.$valueOf (index));
this.setModelkitProperty ("screenXY",  Clazz.newIntArray (-1, [x, y]));
var text = this.setModelkitProperty ("hoverLabel", Integer.$valueOf (-2 - index));
if (text != null) this.hoverOnPt (x, y, text, null, null);
this.refresh (3, "highlightBond");
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "highlight", 
function (bs) {
this.atomHighlighted = (bs != null && bs.cardinality () == 1 ? bs.nextSetBit (0) : -1);
if (bs == null) {
this.setCursor (0);
} else {
this.shm.loadShape (8);
this.setCursor (12);
}this.setModelkitProperty ("highlight", bs);
this.setShapeProperty (8, "highlight", bs);
}, "JU.BS");
Clazz.defineMethod (c$, "refreshMeasures", 
function (andStopMinimization) {
this.setShapeProperty (6, "refresh", null);
if (andStopMinimization) this.stopMinimization ();
}, "~B");
Clazz.defineMethod (c$, "functionXY", 
function (functionName, nX, nY) {
var data = null;
if (functionName.indexOf ("file:") == 0) data = this.getFileAsString3 (functionName.substring (5), false, null);
 else if (functionName.indexOf ("data2d_") != 0) return this.sm.functionXY (functionName, nX, nY);
nX = Math.abs (nX);
nY = Math.abs (nY);
var fdata;
if (data == null) {
fdata = this.getDataObj (functionName, null, 2);
if (fdata != null) return fdata;
data = "";
}fdata =  Clazz.newFloatArray (nX, nY, 0);
var f =  Clazz.newFloatArray (nX * nY, 0);
JU.Parser.parseStringInfestedFloatArray (data, null, f);
for (var i = 0, n = 0; i < nX; i++) for (var j = 0; j < nY; j++) fdata[i][j] = f[n++];


return fdata;
}, "~S,~N,~N");
Clazz.defineMethod (c$, "functionXYZ", 
function (functionName, nX, nY, nZ) {
var data = null;
if (functionName.indexOf ("file:") == 0) data = this.getFileAsString3 (functionName.substring (5), false, null);
 else if (functionName.indexOf ("data3d_") != 0) return this.sm.functionXYZ (functionName, nX, nY, nZ);
nX = Math.abs (nX);
nY = Math.abs (nY);
nZ = Math.abs (nZ);
var xyzdata;
if (data == null) {
xyzdata = this.getDataObj (functionName, null, 2);
if (xyzdata != null) return xyzdata;
data = "";
}xyzdata =  Clazz.newFloatArray (nX, nY, nZ, 0);
var f =  Clazz.newFloatArray (nX * nY * nZ, 0);
JU.Parser.parseStringInfestedFloatArray (data, null, f);
for (var i = 0, n = 0; i < nX; i++) for (var j = 0; j < nY; j++) for (var k = 0; k < nZ; k++) xyzdata[i][j][k] = f[n++];



return xyzdata;
}, "~S,~N,~N,~N");
Clazz.overrideMethod (c$, "extractMolData", 
function (what) {
if (what == null) {
var i = this.am.cmi;
if (i < 0 || this.ms.ac == 0) return null;
what = this.getModelNumberDotted (i);
}return this.getModelExtract (what, true, false, "V2000");
}, "~S");
Clazz.defineMethod (c$, "getNMRPredict", 
function (type) {
type = type.toUpperCase ();
if (type.equals ("H") || type.equals ("1H") || type.equals ("")) type = "H1";
 else if (type.equals ("C") || type.equals ("13C")) type = "C13";
if (!type.equals ("NONE")) {
if (!type.equals ("C13") && !type.equals ("H1")) return "Type must be H1 or C13";
var molFile = this.getModelExtract ("selected", true, false, "V2000");
var pt = molFile.indexOf ("\n");
if (pt < 0) return null;
molFile = "Jmol " + JV.Viewer.version_date + molFile.substring (pt);
if (this.isApplet) {
{
}this.showUrl (this.g.nmrUrlFormat + molFile);
return "opening " + this.g.nmrUrlFormat;
}}this.syncScript ("true", "*", 0);
this.syncScript (type + "Simulate:", ".", 0);
return "sending request to JSpecView";
}, "~S");
Clazz.defineMethod (c$, "getHelp", 
function (what) {
if (this.g.helpPath.indexOf ("?") < 0) {
if (what.length > 0 && what.indexOf ("?") != 0) what = "?search=" + JU.PT.rep (what, " ", "%20");
what += (what.length == 0 ? "?ver=" : "&ver=") + JV.JC.majorVersion;
} else {
what = "&" + what;
}this.showUrl (this.g.helpPath + what);
}, "~S");
Clazz.defineMethod (c$, "getChemicalInfo", 
function (smiles, info, bsAtoms) {
info = info.toLowerCase ();
var type = '/';
switch (";inchi;inchikey;stdinchi;stdinchikey;name;image;drawing;names;".indexOf (";" + info + ";")) {
case 0:
type = 'I';
break;
case 6:
type = 'K';
break;
case 15:
type = 'T';
break;
case 24:
type = 'S';
break;
case 36:
type = 'M';
break;
case 41:
case 47:
type = '2';
break;
case 55:
type = 'N';
break;
}
var s = this.setLoadFormat ("_" + smiles, type, false);
if (type == '2') {
this.fm.loadImage (s, "\1" + smiles, false);
return s;
}if (type == '/') {
if (JU.PT.isOneOf (info, ";alc;cdxml;cerius;charmm;cif;cml;ctx;gjf;gromacs;hyperchem;jme;maestro;mol;mol2;sybyl2;mrv;pdb;sdf;sdf3000;sln;smiles;xyz")) s += "file?format=" + info;
 else s += JU.PT.rep (info, " ", "%20");
}s = this.getFileAsString4 (s, -1, false, false, false, "file");
if (type == 'M' && s.indexOf ("\n") > 0) s = s.substring (0, s.indexOf ("\n"));
 else if (info.equals ("jme")) s = this.getPropertyManager ().fixJMEFormalCharges (bsAtoms, s);
return s;
}, "~S,~S,JU.BS");
Clazz.defineMethod (c$, "addCommand", 
function (command) {
if (this.autoExit || !this.haveDisplay || !this.getPreserveState ()) return;
this.commandHistory.addCommand (JU.PT.replaceAllCharacters (command, "\r\n\t", " "));
}, "~S");
Clazz.defineMethod (c$, "pushState", 
function () {
if (this.autoExit || !this.haveDisplay || !this.getPreserveState ()) return;
this.commandHistory.pushState (this.getStateInfo ());
});
Clazz.defineMethod (c$, "popState", 
function () {
if (this.autoExit || !this.haveDisplay || !this.getPreserveState ()) return;
var state = this.commandHistory.popState ();
if (state != null) this.evalStringQuiet (state);
});
Clazz.defineMethod (c$, "removeCommand", 
function () {
return this.commandHistory.removeCommand ();
});
Clazz.overrideMethod (c$, "getSetHistory", 
function (howFarBack) {
return this.commandHistory.getSetHistory (howFarBack);
}, "~N");
Clazz.defineMethod (c$, "historyFind", 
function (cmd, dir) {
return this.commandHistory.find (cmd, dir);
}, "~S,~N");
Clazz.defineMethod (c$, "setHistory", 
function (fileName) {
this.commandHistory.getSetHistory (-2147483648);
this.commandHistory.addCommand (this.getFileAsString4 (fileName, -1, false, false, true, null));
}, "~S");
Clazz.defineMethod (c$, "getOutputChannel", 
function (localName, fullPath) {
return this.getOutputManager ().getOutputChannel (localName, fullPath);
}, "~S,~A");
Clazz.overrideMethod (c$, "writeTextFile", 
function (fileName, data) {
var params =  new java.util.Hashtable ();
params.put ("fileName", fileName);
params.put ("type", "txt");
params.put ("text", data);
return this.outputToFile (params);
}, "~S,~S");
Clazz.overrideMethod (c$, "clipImageOrPasteText", 
function (text) {
if (!this.haveAccess (JV.Viewer.ACCESS.ALL)) return "no";
return this.getOutputManager ().clipImageOrPasteText (text);
}, "~S");
Clazz.overrideMethod (c$, "getClipboardText", 
function () {
if (!this.haveAccess (JV.Viewer.ACCESS.ALL)) return "no";
try {
return this.getOutputManager ().getClipboardText ();
} catch (er) {
if (Clazz.exceptionOf (er, Error)) {
return J.i18n.GT.$ ("clipboard is not accessible -- use signed applet");
} else {
throw er;
}
}
});
Clazz.defineMethod (c$, "processWriteOrCapture", 
function (params) {
return this.getOutputManager ().processWriteOrCapture (params);
}, "java.util.Map");
Clazz.defineMethod (c$, "createZip", 
function (fileName, type, params) {
var state = this.getStateInfo ();
var data = params.get ("data");
if (fileName != null) params.put ("fileName", fileName);
params.put ("type", type);
params.put ("text", state);
if (Clazz.instanceOf (data, Array)) params.put ("scripts", data);
 else if (Clazz.instanceOf (data, JU.Lst)) params.put ("imageData", data);
return this.getOutputManager ().outputToFile (params);
}, "~S,~S,java.util.Map");
Clazz.overrideMethod (c$, "outputToFile", 
function (params) {
return this.getOutputManager ().outputToFile (params);
}, "java.util.Map");
Clazz.defineMethod (c$, "getOutputManager", 
 function () {
if (this.outputManager != null) return this.outputManager;
return (this.outputManager = J.api.Interface.getInterface ("JV.OutputManager" + (JV.Viewer.isJS ? "JS" : "Awt"), this, "file")).setViewer (this, this.privateKey);
});
Clazz.defineMethod (c$, "setSyncTarget", 
 function (mode, TF) {
switch (mode) {
case 0:
this.sm.syncingMouse = TF;
break;
case 1:
this.sm.syncingScripts = TF;
break;
case 2:
this.sm.syncSend (TF ? "GET_GRAPHICS" : "SET_GRAPHICS_OFF", "*", 0);
if (Float.isNaN (this.tm.stereoDegrees)) this.setFloatProperty ("stereoDegrees", -5);
if (TF) {
this.setBooleanProperty ("_syncMouse", false);
this.setBooleanProperty ("_syncScript", false);
}return;
}
if (!this.sm.syncingScripts && !this.sm.syncingMouse) this.setSync ();
}, "~N,~B");
Clazz.overrideMethod (c$, "syncScript", 
function (script, applet, port) {
this.sm.syncScript (script, applet, port);
}, "~S,~S,~N");
Clazz.overrideMethod (c$, "getModelIndexFromId", 
function (id) {
return this.ms.getModelIndexFromId (id);
}, "~S");
Clazz.defineMethod (c$, "setSyncDriver", 
function (mode) {
this.sm.setSyncDriver (mode);
}, "~N");
Clazz.defineMethod (c$, "setProteinType", 
function (type, bs) {
this.ms.setProteinType (bs == null ? this.bsA () : bs, type);
}, "J.c.STR,JU.BS");
Clazz.defineMethod (c$, "getVanderwaalsMar", 
function (i) {
return (this.defaultVdw === J.c.VDW.USER ? this.userVdwMars[i] : JU.Elements.getVanderwaalsMar (i, this.defaultVdw));
}, "~N");
Clazz.defineMethod (c$, "getVanderwaalsMarType", 
function (atomicAndIsotopeNumber, type) {
if (type == null) type = this.defaultVdw;
 else switch (type) {
case J.c.VDW.AUTO:
case J.c.VDW.AUTO_BABEL:
case J.c.VDW.AUTO_JMOL:
case J.c.VDW.AUTO_RASMOL:
if (this.defaultVdw !== J.c.VDW.AUTO) type = this.defaultVdw;
break;
default:
break;
}
if (type === J.c.VDW.USER && this.bsUserVdws == null) type = J.c.VDW.JMOL;
return (type === J.c.VDW.USER ? this.userVdwMars[atomicAndIsotopeNumber & 127] : JU.Elements.getVanderwaalsMar (atomicAndIsotopeNumber, type));
}, "~N,J.c.VDW");
Clazz.defineMethod (c$, "setVdwStr", 
function (name) {
var type = J.c.VDW.getVdwType (name);
if (type == null) type = J.c.VDW.AUTO;
switch (type) {
case J.c.VDW.JMOL:
case J.c.VDW.BABEL:
case J.c.VDW.RASMOL:
case J.c.VDW.AUTO:
case J.c.VDW.USER:
break;
default:
type = J.c.VDW.JMOL;
}
if (type !== this.defaultVdw && type === J.c.VDW.USER && this.bsUserVdws == null) this.setUserVdw (this.defaultVdw);
this.defaultVdw = type;
this.g.setO ("defaultVDW", type.getVdwLabel ());
}, "~S");
Clazz.defineMethod (c$, "setUserVdw", 
function (mode) {
this.userVdwMars =  Clazz.newIntArray (JU.Elements.elementNumberMax, 0);
this.userVdws =  Clazz.newFloatArray (JU.Elements.elementNumberMax, 0);
this.bsUserVdws =  new JU.BS ();
if (mode === J.c.VDW.USER) mode = J.c.VDW.JMOL;
for (var i = 1; i < JU.Elements.elementNumberMax; i++) {
this.userVdwMars[i] = JU.Elements.getVanderwaalsMar (i, mode);
this.userVdws[i] = this.userVdwMars[i] / 1000;
}
}, "J.c.VDW");
Clazz.defineMethod (c$, "getDefaultVdwNameOrData", 
function (mode, type, bs) {
switch (mode) {
case -2147483648:
return this.defaultVdw.getVdwLabel ();
case 2147483647:
if ((bs = this.bsUserVdws) == null) return "";
type = J.c.VDW.USER;
break;
}
if (type == null || type === J.c.VDW.AUTO) type = this.defaultVdw;
if (type === J.c.VDW.USER && this.bsUserVdws == null) this.setUserVdw (this.defaultVdw);
return this.getDataManager ().getDefaultVdwNameOrData (type, bs);
}, "~N,J.c.VDW,JU.BS");
Clazz.defineMethod (c$, "deleteAtoms", 
function (bsAtoms, fullModels) {
var atomIndex = (bsAtoms == null ? -1 : bsAtoms.nextSetBit (0));
if (atomIndex < 0) return 0;
this.clearModelDependentObjects ();
if (!fullModels) {
this.sm.modifySend (atomIndex, this.ms.at[atomIndex].mi, 4, "deleting atom " + this.ms.at[atomIndex].getAtomName ());
this.ms.deleteAtoms (bsAtoms);
var n = this.slm.deleteAtoms (bsAtoms);
this.setTainted (true);
this.sm.modifySend (atomIndex, this.ms.at[atomIndex].mi, -4, "OK");
return n;
}return this.deleteModels (this.ms.at[atomIndex].mi, bsAtoms);
}, "JU.BS,~B");
Clazz.defineMethod (c$, "deleteModels", 
function (modelIndex, bsAtoms) {
this.clearModelDependentObjects ();
this.sm.modifySend (-1, modelIndex, 5, "deleting model " + this.getModelNumberDotted (modelIndex));
this.setCurrentModelIndexClear (0, false);
this.am.setAnimationOn (false);
var bsD0 = JU.BSUtil.copy (this.slm.bsDeleted);
var bsModels = (bsAtoms == null ? JU.BSUtil.newAndSetBit (modelIndex) : this.ms.getModelBS (bsAtoms, false));
var bsDeleted = this.ms.deleteModels (bsModels);
this.slm.processDeletedModelAtoms (bsDeleted);
if (this.eval != null) this.eval.deleteAtomsInVariables (bsDeleted);
this.setAnimationRange (0, 0);
this.clearRepaintManager (-1);
this.am.clear ();
this.am.initializePointers (1);
this.setCurrentModelIndexClear (this.ms.mc > 1 ? -1 : 0, this.ms.mc > 1);
this.hoverAtomIndex = -1;
this.setFileLoadStatus (J.c.FIL.DELETED, null, null, null, null, null);
this.refreshMeasures (true);
if (bsD0 != null) bsDeleted.andNot (bsD0);
this.sm.modifySend (-1, modelIndex, -5, "OK");
return JU.BSUtil.cardinalityOf (bsDeleted);
}, "~N,JU.BS");
Clazz.defineMethod (c$, "deleteBonds", 
function (bsDeleted) {
var modelIndex = this.ms.bo[bsDeleted.nextSetBit (0)].atom1.mi;
this.sm.modifySend (-1, modelIndex, 2, "delete bonds " + JU.Escape.eBond (bsDeleted));
this.ms.deleteBonds (bsDeleted, false);
this.sm.modifySend (-1, modelIndex, -2, "OK");
}, "JU.BS");
Clazz.defineMethod (c$, "deleteModelAtoms", 
function (modelIndex, firstAtomIndex, nAtoms, bsModelAtoms) {
this.sm.modifySend (-1, modelIndex, 1, "delete atoms " + JU.Escape.eBS (bsModelAtoms));
JU.BSUtil.deleteBits (this.tm.bsFrameOffsets, bsModelAtoms);
this.getDataManager ().deleteModelAtoms (firstAtomIndex, nAtoms, bsModelAtoms);
this.sm.modifySend (-1, modelIndex, -1, "OK");
}, "~N,~N,~N,JU.BS");
Clazz.defineMethod (c$, "getQuaternionFrame", 
function () {
return this.g.quaternionFrame.charAt (this.g.quaternionFrame.length == 2 ? 1 : 0);
});
Clazz.defineMethod (c$, "loadImageData", 
function (image, nameOrError, echoName, sc) {
if (image == null && nameOrError != null) this.scriptEcho (nameOrError);
if (echoName == null) {
this.setBackgroundImage ((image == null ? null : nameOrError), image);
} else if (echoName.startsWith ("\1")) {
this.sm.showImage (echoName, image);
} else if (echoName.startsWith ("\0")) {
if (image != null) {
this.setWindowDimensions ( Clazz.newFloatArray (-1, [this.apiPlatform.getImageWidth (image), this.apiPlatform.getImageHeight (image)]));
}} else {
this.shm.loadShape (31);
this.setShapeProperty (31, "text", nameOrError);
if (image != null) this.setShapeProperty (31, "image", image);
}if (JV.Viewer.isJS && sc != null) {
sc.mustResumeEval = true;
this.eval.resumeEval (sc);
}return false;
}, "~O,~S,~S,JS.ScriptContext");
Clazz.defineMethod (c$, "cd", 
function (dir) {
if (dir == null) {
dir = ".";
} else if (dir.length == 0) {
this.setStringProperty ("defaultDirectory", "");
dir = ".";
}dir = this.fm.getDefaultDirectory (dir + (dir.equals ("=") ? "" : dir.endsWith ("/") ? "X.spt" : "/X.spt"));
if (dir.length > 0) this.setStringProperty ("defaultDirectory", dir);
var path = this.fm.getFilePath (dir + "/", true, false);
if (path.startsWith ("file:/")) JV.FileManager.setLocalPath (this, dir, false);
return dir;
}, "~S");
Clazz.defineMethod (c$, "setErrorMessage", 
function (errMsg, errMsgUntranslated) {
this.errorMessageUntranslated = errMsgUntranslated;
if (errMsg != null) this.eval.stopScriptThreads ();
return (this.errorMessage = errMsg);
}, "~S,~S");
Clazz.overrideMethod (c$, "getErrorMessage", 
function () {
return this.errorMessage;
});
Clazz.overrideMethod (c$, "getErrorMessageUn", 
function () {
return this.errorMessageUntranslated == null ? this.errorMessage : this.errorMessageUntranslated;
});
Clazz.defineMethod (c$, "setShapeErrorState", 
function (shapeID, state) {
this.currentShapeID = shapeID;
this.currentShapeState = state;
}, "~N,~S");
Clazz.defineMethod (c$, "getShapeErrorState", 
function () {
if (this.currentShapeID < 0) return "";
this.shm.releaseShape (this.currentShapeID);
this.clearRepaintManager (this.currentShapeID);
return JV.JC.getShapeClassName (this.currentShapeID, false) + " " + this.currentShapeState;
});
Clazz.defineMethod (c$, "handleError", 
function (er, doClear) {
try {
if (doClear) this.zapMsg ("" + er);
this.undoClear ();
if (JU.Logger.getLogLevel () == 0) JU.Logger.setLogLevel (4);
this.setCursor (0);
this.setBooleanProperty ("refreshing", true);
this.fm.setPathForAllFiles ("");
JU.Logger.error ("vwr handling error condition: " + er + "  ");
if (!JV.Viewer.isJS) er.printStackTrace ();
this.notifyError ("Error", "doClear=" + doClear + "; " + er, "" + er);
} catch (e1) {
try {
JU.Logger.error ("Could not notify error " + er + ": due to " + e1);
} catch (er2) {
}
}
}, "Error,~B");
Clazz.defineMethod (c$, "getFunctions", 
function (isStatic) {
return (isStatic ? JV.Viewer.staticFunctions : this.localFunctions);
}, "~B");
Clazz.defineMethod (c$, "removeFunction", 
function (name) {
name = name.toLowerCase ();
var $function = this.getFunction (name);
if ($function == null) return;
JV.Viewer.staticFunctions.remove (name);
this.localFunctions.remove (name);
}, "~S");
Clazz.defineMethod (c$, "getFunction", 
function (name) {
if (name == null) return null;
var $function = (JV.Viewer.isStaticFunction (name) ? JV.Viewer.staticFunctions : this.localFunctions).get (name);
return ($function == null || $function.geTokens () == null ? null : $function);
}, "~S");
c$.isStaticFunction = Clazz.defineMethod (c$, "isStaticFunction", 
 function (name) {
return name.startsWith ("static_");
}, "~S");
Clazz.defineMethod (c$, "isFunction", 
function (name) {
return (JV.Viewer.isStaticFunction (name) ? JV.Viewer.staticFunctions : this.localFunctions).containsKey (name);
}, "~S");
Clazz.defineMethod (c$, "clearFunctions", 
function () {
JV.Viewer.staticFunctions.clear ();
this.localFunctions.clear ();
});
Clazz.defineMethod (c$, "addFunction", 
function ($function) {
var name = $function.getName ();
(JV.Viewer.isStaticFunction (name) ? JV.Viewer.staticFunctions : this.localFunctions).put (name, $function);
}, "J.api.JmolScriptFunction");
Clazz.defineMethod (c$, "getFunctionCalls", 
function (selectedFunction) {
return this.getStateCreator ().getFunctionCalls (selectedFunction);
}, "~S");
Clazz.defineMethod (c$, "checkPrivateKey", 
function (privateKey) {
return privateKey == this.privateKey;
}, "~N");
Clazz.defineMethod (c$, "bindAction", 
function (desc, name) {
if (this.haveDisplay) this.acm.bind (desc, name);
}, "~S,~S");
Clazz.defineMethod (c$, "unBindAction", 
function (desc, name) {
if (this.haveDisplay) this.acm.unbindAction (desc, name);
}, "~S,~S");
Clazz.defineMethod (c$, "calculateStruts", 
function (bs1, bs2) {
return this.ms.calculateStruts (bs1 == null ? this.bsA () : bs1, bs2 == null ? this.bsA () : bs2);
}, "JU.BS,JU.BS");
Clazz.defineMethod (c$, "getPreserveState", 
function () {
return (this.g.preserveState && this.scm != null);
});
Clazz.defineMethod (c$, "isKiosk", 
function () {
return this.$isKiosk;
});
Clazz.defineMethod (c$, "hasFocus", 
function () {
return (this.haveDisplay && (this.$isKiosk || this.apiPlatform.hasFocus (this.display)));
});
Clazz.defineMethod (c$, "setFocus", 
function () {
if (this.haveDisplay && !this.apiPlatform.hasFocus (this.display)) this.apiPlatform.requestFocusInWindow (this.display);
});
Clazz.defineMethod (c$, "stopMinimization", 
function () {
if (this.minimizer != null) {
this.minimizer.setProperty ("stop", null);
}});
Clazz.defineMethod (c$, "clearMinimization", 
function () {
if (this.minimizer != null) this.minimizer.setProperty ("clear", null);
});
Clazz.defineMethod (c$, "getMinimizationInfo", 
function () {
return (this.minimizer == null ? "" : this.minimizer.getProperty ("log", 0));
});
Clazz.defineMethod (c$, "checkMinimization", 
 function () {
this.refreshMeasures (true);
if (!this.g.monitorEnergy) return;
try {
this.minimize (null, 0, 0, this.getAllAtoms (), null, 0, false, false, true, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.echoMessage (this.getP ("_minimizationForceField") + " Energy = " + this.getP ("_minimizationEnergy"));
});
Clazz.defineMethod (c$, "minimize", 
function (eval, steps, crit, bsSelected, bsFixed, rangeFixed, addHydrogen, isOnly, isSilent, isLoad2D) {
var ff = this.g.forceField;
var bsInFrame = this.getFrameAtoms ();
if (bsSelected == null) bsSelected = this.getModelUndeletedAtomsBitSet (this.getVisibleFramesBitSet ().length () - 1);
 else bsSelected.and (bsInFrame);
if (rangeFixed <= 0) rangeFixed = 5.0;
var bsMotionFixed = JU.BSUtil.copy (bsFixed == null ? this.slm.getMotionFixedAtoms () : bsFixed);
var haveFixed = (bsMotionFixed.cardinality () > 0);
if (haveFixed) bsSelected.andNot (bsMotionFixed);
var bsNearby = (isOnly ?  new JU.BS () : this.ms.getAtomsWithinRadius (rangeFixed, bsSelected, true, null));
bsNearby.andNot (bsSelected);
if (haveFixed) {
bsMotionFixed.and (bsNearby);
} else {
bsMotionFixed = bsNearby;
}bsMotionFixed.and (bsInFrame);
if (addHydrogen) bsSelected.or (this.addHydrogens (bsSelected, isLoad2D, isSilent));
var n = bsSelected.cardinality ();
if (ff.equals ("MMFF") && n > this.g.minimizationMaxAtoms) {
this.scriptStatusMsg ("Too many atoms for minimization (" + n + ">" + this.g.minimizationMaxAtoms + "); use 'set minimizationMaxAtoms' to increase this limit", "minimization: too many atoms");
return;
}try {
if (!isSilent) JU.Logger.info ("Minimizing " + bsSelected.cardinality () + " atoms");
this.getMinimizer (true).minimize (steps, crit, bsSelected, bsMotionFixed, haveFixed, isSilent, ff);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, JV.JmolAsyncException)) {
var e = e$$;
{
if (eval != null) eval.loadFileResourceAsync (e.getFileName ());
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
JU.Logger.error ("Minimization error: " + e.toString ());
if (!JV.Viewer.isJS) e.printStackTrace ();
}
} else {
throw e$$;
}
}
}, "J.api.JmolScriptEvaluator,~N,~N,JU.BS,JU.BS,~N,~B,~B,~B,~B");
Clazz.defineMethod (c$, "setMotionFixedAtoms", 
function (bs) {
this.slm.setMotionFixedAtoms (bs);
}, "JU.BS");
Clazz.defineMethod (c$, "getMotionFixedAtoms", 
function () {
return this.slm.getMotionFixedAtoms ();
});
Clazz.defineMethod (c$, "getAtomicPropertyState", 
function (commands, type, bs, name, data) {
this.getStateCreator ().getAtomicPropertyStateBuffer (commands, type, bs, name, data);
}, "JU.SB,~N,JU.BS,~S,~A");
Clazz.defineMethod (c$, "getCenterAndPoints", 
function (atomSets, addCenter) {
return this.ms.getCenterAndPoints (atomSets, addCenter);
}, "JU.Lst,~B");
Clazz.defineMethod (c$, "writeFileData", 
function (fileName, type, modelIndex, parameters) {
return this.getOutputManager ().writeFileData (fileName, type, modelIndex, parameters);
}, "~S,~S,~N,~A");
Clazz.defineMethod (c$, "getPdbData", 
function (modelIndex, type, bsAtoms, parameters, oc, getStructure) {
return this.getPropertyManager ().getPdbData (modelIndex, type, bsAtoms == null ? this.bsA () : bsAtoms, parameters, oc, getStructure);
}, "~N,~S,JU.BS,~A,JU.OC,~B");
Clazz.defineMethod (c$, "getGroupsWithin", 
function (nResidues, bs) {
return this.ms.getGroupsWithin (nResidues, bs);
}, "~N,JU.BS");
Clazz.defineMethod (c$, "setShapeSize", 
function (shapeID, madOrMad10, bsSelected) {
if (bsSelected == null) bsSelected = this.bsA ();
this.shm.setShapeSizeBs (shapeID, madOrMad10, null, bsSelected);
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "setShapeProperty", 
function (shapeID, propertyName, value) {
if (shapeID >= 0) this.shm.setShapePropertyBs (shapeID, propertyName, value, null);
}, "~N,~S,~O");
Clazz.defineMethod (c$, "getShapeProperty", 
function (shapeType, propertyName) {
return this.shm.getShapePropertyIndex (shapeType, propertyName, -2147483648);
}, "~N,~S");
Clazz.defineMethod (c$, "getShapePropertyAsInt", 
 function (shapeID, propertyName) {
var value = this.getShapeProperty (shapeID, propertyName);
return value == null || !(Clazz.instanceOf (value, Integer)) ? -2147483648 : (value).intValue ();
}, "~N,~S");
Clazz.defineMethod (c$, "setModelVisibility", 
function () {
if (this.shm != null) this.shm.setModelVisibility ();
});
Clazz.defineMethod (c$, "resetShapes", 
function (andCreateNew) {
this.shm.resetShapes ();
if (andCreateNew) {
this.shm.loadDefaultShapes (this.ms);
this.clearRepaintManager (-1);
}}, "~B");
Clazz.defineMethod (c$, "setParallel", 
function (TF) {
return (this.$isParallel = this.g.multiProcessor && TF);
}, "~B");
Clazz.defineMethod (c$, "isParallel", 
function () {
return this.g.multiProcessor && this.$isParallel;
});
Clazz.defineMethod (c$, "undoClear", 
function () {
this.actionStates.clear ();
this.actionStatesRedo.clear ();
});
Clazz.defineMethod (c$, "undoMoveAction", 
function (action, n) {
this.getStateCreator ().undoMoveAction (action, n);
}, "~N,~N");
Clazz.defineMethod (c$, "undoMoveActionClear", 
function (taintedAtom, type, clearRedo) {
if (this.g.preserveState) this.getStateCreator ().undoMoveActionClear (taintedAtom, type, clearRedo);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "moveAtomWithHydrogens", 
function (atomIndex, deltaX, deltaY, deltaZ, bsAtoms) {
this.stopMinimization ();
if (bsAtoms == null) {
var atom = this.ms.at[atomIndex];
bsAtoms = JU.BSUtil.newAndSetBit (atomIndex);
var bonds = atom.bonds;
if (bonds != null) for (var i = 0; i < bonds.length; i++) {
var atom2 = bonds[i].getOtherAtom (atom);
if (atom2.getElementNumber () == 1) bsAtoms.set (atom2.i);
}
}this.moveSelected (deltaX, deltaY, deltaZ, -2147483648, -2147483648, bsAtoms, true, true, 0);
}, "~N,~N,~N,~N,JU.BS");
Clazz.defineMethod (c$, "isModelPDB", 
function (i) {
return this.ms.am[i].isBioModel;
}, "~N");
Clazz.overrideMethod (c$, "deleteMeasurement", 
function (i) {
this.setShapeProperty (6, "delete", Integer.$valueOf (i));
}, "~N");
Clazz.overrideMethod (c$, "getSmiles", 
function (bs) {
var is2D = ("2D".equals (this.ms.getInfoM ("dimension")));
return this.getSmilesOpt (bs, -1, -1, (bs == null && JU.Logger.debugging ? 131072 : 0) | (is2D ? 32 : 0), null);
}, "JU.BS");
Clazz.overrideMethod (c$, "getOpenSmiles", 
function (bs) {
return this.getSmilesOpt (bs, -1, -1, 5 | (bs == null && JU.Logger.debugging ? 131072 : 0), "/openstrict///");
}, "JU.BS");
Clazz.defineMethod (c$, "getBioSmiles", 
function (bs) {
return this.getSmilesOpt (bs, -1, -1, 3145728 | 5242880 | 17825792 | (JU.Logger.debugging ? 131072 : 0), null);
}, "JU.BS");
Clazz.defineMethod (c$, "getSmilesOpt", 
function (bsSelected, index1, index2, flags, options) {
var bioComment = ((flags & 17825792) == 17825792 ? JV.Viewer.getJmolVersion () + " " + this.getModelName (this.am.cmi) : options);
var atoms = this.ms.at;
if (bsSelected == null) {
if (index1 < 0 || index2 < 0) {
bsSelected = this.bsA ();
} else {
if ((flags & 1048576) == 1048576) {
if (index1 > index2) {
var i = index1;
index1 = index2;
index2 = i;
}index1 = atoms[index1].group.firstAtomIndex;
index2 = atoms[index2].group.lastAtomIndex;
}bsSelected =  new JU.BS ();
bsSelected.setBits (index1, index2 + 1);
}}var sm = this.getSmilesMatcher ();
if (JV.JC.isSmilesCanonical (options)) {
var smiles = sm.getSmiles (atoms, this.ms.ac, bsSelected, "/noAromatic/", flags);
return this.getChemicalInfo (smiles, "smiles", null).trim ();
}return sm.getSmiles (atoms, this.ms.ac, bsSelected, bioComment, flags);
}, "JU.BS,~N,~N,~N,~S");
Clazz.defineMethod (c$, "alert", 
function (msg) {
this.prompt (msg, null, null, true);
}, "~S");
Clazz.defineMethod (c$, "prompt", 
function (label, data, list, asButtons) {
return (this.$isKiosk ? "null" : this.apiPlatform.prompt (label, data, list, asButtons));
}, "~S,~S,~A,~B");
Clazz.defineMethod (c$, "dialogAsk", 
function (type, fileName, params) {
{
return prompt(type, fileName);
}}, "~S,~S,java.util.Map");
Clazz.defineMethod (c$, "initializeExporter", 
function (params) {
var isJS = params.get ("type").equals ("JS");
if (isJS) {
if (this.jsExporter3D != null) {
this.jsExporter3D.initializeOutput (this, this.privateKey, params);
return this.jsExporter3D;
}} else {
var fileName = params.get ("fileName");
var fullPath = params.get ("fullPath");
var out = this.getOutputChannel (fileName, fullPath);
if (out == null) return null;
params.put ("outputChannel", out);
}var export3D = J.api.Interface.getOption ("export.Export3D", this, "export");
if (export3D == null) return null;
var exporter = export3D.initializeExporter (this, this.privateKey, this.gdata, params);
if (isJS && exporter != null) this.jsExporter3D = export3D;
return (exporter == null ? null : export3D);
}, "java.util.Map");
Clazz.defineMethod (c$, "getMouseEnabled", 
function () {
return this.refreshing && !this.creatingImage;
});
Clazz.overrideMethod (c$, "calcAtomsMinMax", 
function (bs, boxInfo) {
this.ms.calcAtomsMinMax (bs, boxInfo);
}, "JU.BS,JU.BoxInfo");
Clazz.defineMethod (c$, "getObjectMap", 
function (map, c) {
switch (c) {
case '{':
if (this.getScriptManager () != null) {
var m = map;
if (this.definedAtomSets != null) m.putAll (this.definedAtomSets);
JS.T.getTokensType (m, 2097152);
}return;
case '$':
case '0':
this.shm.getObjectMap (map, c == '$');
return;
}
}, "java.util.Map,~S");
Clazz.defineMethod (c$, "setPicked", 
function (atomIndex, andReset) {
var pickedSet = null;
var pickedList = null;
if (atomIndex >= 0) {
if (andReset) this.setPicked (-1, false);
this.g.setI ("_atompicked", atomIndex);
pickedSet = this.g.getParam ("picked", true);
pickedList = this.g.getParam ("pickedList", true);
}if (pickedSet == null || pickedSet.tok != 10) {
pickedSet = JS.SV.newV (10,  new JU.BS ());
pickedList = JS.SV.getVariableList ( new JU.Lst ());
this.g.setUserVariable ("picked", pickedSet);
this.g.setUserVariable ("pickedList", pickedList);
}if (atomIndex < 0) return;
JS.SV.getBitSet (pickedSet, false).set (atomIndex);
var p = pickedList.pushPop (null, null);
if (p.tok == 10) pickedList.pushPop (null, p);
if (p.tok != 10 || !(p.value).get (atomIndex)) pickedList.pushPop (null, JS.SV.newV (10, JU.BSUtil.newAndSetBit (atomIndex)));
}, "~N,~B");
Clazz.overrideMethod (c$, "runScript", 
function (script) {
return "" + this.evaluateExpression ( Clazz.newArray (-1, [ Clazz.newArray (-1, [JS.T.t (134222850), JS.T.t (268435472), JS.SV.newS (script), JS.T.t (268435473)])]));
}, "~S");
Clazz.overrideMethod (c$, "runScriptCautiously", 
function (script) {
var outputBuffer =  new JU.SB ();
try {
if (this.getScriptManager () == null) return null;
this.eval.runScriptBuffer (script, outputBuffer, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return this.eval.getErrorMessage ();
} else {
throw e;
}
}
return outputBuffer.toString ();
}, "~S");
Clazz.defineMethod (c$, "setFrameDelayMs", 
function (millis) {
this.ms.setFrameDelayMs (millis, this.getVisibleFramesBitSet ());
}, "~N");
Clazz.defineMethod (c$, "getBaseModelBitSet", 
function () {
return this.ms.getModelAtomBitSetIncludingDeleted (this.getJDXBaseModelIndex (this.am.cmi), true);
});
Clazz.defineMethod (c$, "clearTimeouts", 
function () {
if (this.timeouts != null) J.thread.TimeoutThread.clear (this.timeouts);
});
Clazz.defineMethod (c$, "setTimeout", 
function (name, mSec, script) {
if (!this.haveDisplay || this.headless || this.autoExit) return;
if (name == null) {
this.clearTimeouts ();
return;
}if (this.timeouts == null) {
this.timeouts =  new java.util.Hashtable ();
}J.thread.TimeoutThread.setTimeout (this, this.timeouts, name, mSec, script);
}, "~S,~N,~S");
Clazz.defineMethod (c$, "triggerTimeout", 
function (name) {
if (!this.haveDisplay || this.timeouts == null) return;
J.thread.TimeoutThread.trigger (this.timeouts, name);
}, "~S");
Clazz.defineMethod (c$, "clearTimeout", 
function (name) {
this.setTimeout (name, 0, null);
}, "~S");
Clazz.defineMethod (c$, "showTimeout", 
function (name) {
return (this.haveDisplay ? J.thread.TimeoutThread.showTimeout (this.timeouts, name) : "");
}, "~S");
Clazz.defineMethod (c$, "getOrCalcPartialCharges", 
function (bsSelected, bsIgnore) {
if (bsSelected == null) bsSelected = this.bsA ();
bsSelected = JU.BSUtil.copy (bsSelected);
JU.BSUtil.andNot (bsSelected, bsIgnore);
JU.BSUtil.andNot (bsSelected, this.ms.bsPartialCharges);
if (!bsSelected.isEmpty ()) this.calculatePartialCharges (bsSelected);
return this.ms.getPartialCharges ();
}, "JU.BS,JU.BS");
Clazz.defineMethod (c$, "calculatePartialCharges", 
function (bsSelected) {
if (bsSelected == null || bsSelected.isEmpty ()) bsSelected = this.getModelUndeletedAtomsBitSetBs (this.getVisibleFramesBitSet ());
if (bsSelected.isEmpty ()) return;
JU.Logger.info ("Calculating MMFF94 partial charges for " + bsSelected.cardinality () + " atoms");
this.getMinimizer (true).calculatePartialCharges (this.ms, bsSelected, null);
}, "JU.BS");
Clazz.defineMethod (c$, "setCurrentModelID", 
function (id) {
var modelIndex = this.am.cmi;
if (modelIndex >= 0) this.ms.setInfo (modelIndex, "modelID", id);
}, "~S");
Clazz.defineMethod (c$, "cacheClear", 
function () {
this.fm.cacheClear ();
this.ligandModelSet = null;
this.ligandModels = null;
this.ms.clearCache ();
});
Clazz.defineMethod (c$, "cachePut", 
function (key, data) {
JU.Logger.info ("Viewer cachePut " + key);
this.fm.cachePut (key, data);
}, "~S,~O");
Clazz.defineMethod (c$, "cacheFileByName", 
function (fileName, isAdd) {
if (fileName == null) {
this.cacheClear ();
return -1;
}return this.fm.cacheFileByNameAdd (fileName, isAdd);
}, "~S,~B");
Clazz.defineMethod (c$, "clearThreads", 
function () {
if (this.eval != null) this.eval.stopScriptThreads ();
this.stopMinimization ();
this.tm.clearThreads ();
this.setAnimationOn (false);
});
Clazz.defineMethod (c$, "getEvalContextAndHoldQueue", 
function (eval) {
if (eval == null || !JV.Viewer.isJS && !this.testAsync) return null;
eval.pushContextDown ("getEvalContextAndHoldQueue");
var sc = eval.getThisContext ();
sc.setMustResume ();
sc.isJSThread = true;
this.queueOnHold = true;
return sc;
}, "J.api.JmolScriptEvaluator");
Clazz.overrideMethod (c$, "resizeInnerPanel", 
function (width, height) {
if (!this.autoExit && this.haveDisplay) return this.sm.resizeInnerPanel (width, height);
this.setScreenDimension (width, height);
return  Clazz.newIntArray (-1, [this.screenWidth, this.screenHeight]);
}, "~N,~N");
Clazz.defineMethod (c$, "getDefaultPropertyParam", 
function (propertyID) {
return this.getPropertyManager ().getDefaultPropertyParam (propertyID);
}, "~N");
Clazz.defineMethod (c$, "getPropertyNumber", 
function (name) {
return this.getPropertyManager ().getPropertyNumber (name);
}, "~S");
Clazz.defineMethod (c$, "checkPropertyParameter", 
function (name) {
return this.getPropertyManager ().checkPropertyParameter (name);
}, "~S");
Clazz.defineMethod (c$, "extractProperty", 
function (property, args, pt) {
return this.getPropertyManager ().extractProperty (property, args, pt, null, false);
}, "~O,~O,~N");
Clazz.defineMethod (c$, "addHydrogens", 
function (bsAtoms, is2DLoad, isSilent) {
var doAll = (bsAtoms == null);
if (bsAtoms == null) bsAtoms = this.getModelUndeletedAtomsBitSet (this.getVisibleFramesBitSet ().length () - 1);
var bsB =  new JU.BS ();
if (bsAtoms.isEmpty ()) return bsB;
var modelIndex = this.ms.at[bsAtoms.nextSetBit (0)].mi;
if (modelIndex != this.ms.mc - 1) return bsB;
var vConnections =  new JU.Lst ();
var pts = this.getAdditionalHydrogens (bsAtoms, doAll, false, vConnections);
var wasAppendNew = false;
wasAppendNew = this.g.appendNew;
if (pts.length > 0) {
this.clearModelDependentObjects ();
try {
bsB = (is2DLoad ? this.ms.addHydrogens (vConnections, pts) : this.addHydrogensInline (bsAtoms, vConnections, pts));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
if (wasAppendNew) this.g.appendNew = true;
}if (!isSilent) this.scriptStatus (J.i18n.GT.i (J.i18n.GT.$ ("{0} hydrogens added"), pts.length));
return bsB;
}, "JU.BS,~B,~B");
Clazz.defineMethod (c$, "addHydrogensInline", 
function (bsAtoms, vConnections, pts) {
if (this.getScriptManager () == null) return null;
return this.scm.addHydrogensInline (bsAtoms, vConnections, pts);
}, "JU.BS,JU.Lst,~A");
Clazz.overrideMethod (c$, "evalFunctionFloat", 
function (func, params, values) {
return (this.getScriptManager () == null ? 0 : this.eval.evalFunctionFloat (func, params, values));
}, "~O,~O,~A");
Clazz.defineMethod (c$, "evalParallel", 
function (context, shapeManager) {
this.displayLoadErrors = false;
var isOK = this.getScriptManager () != null && this.eval.evalParallel (context, (shapeManager == null ? this.shm : shapeManager));
this.displayLoadErrors = true;
return isOK;
}, "JS.ScriptContext,JV.ShapeManager");
Clazz.overrideMethod (c$, "evaluateExpression", 
function (stringOrTokens) {
return (this.getScriptManager () == null ? null : this.eval.evaluateExpression (stringOrTokens, false, false));
}, "~O");
Clazz.defineMethod (c$, "evaluateExpressionAsVariable", 
function (stringOrTokens) {
return (this.getScriptManager () == null ? null : this.eval.evaluateExpression (stringOrTokens, true, false));
}, "~O");
Clazz.defineMethod (c$, "getAtomBitSet", 
function (atomExpression) {
if (Clazz.instanceOf (atomExpression, JU.BS)) return this.slm.excludeAtoms (atomExpression, false);
this.getScriptManager ();
return this.getAtomBitSetEval (this.eval, atomExpression);
}, "~O");
Clazz.defineMethod (c$, "getScriptContext", 
function (why) {
return (this.getScriptManager () == null ? null : this.eval.getScriptContext (why));
}, "~S");
Clazz.defineMethod (c$, "getAtomDefs", 
function (names) {
var keys =  new JU.Lst ();
for (var e, $e = names.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (Clazz.instanceOf (e.getValue (), JU.BS)) keys.addLast ("{" + e.getKey () + "} <" + (e.getValue ()).cardinality () + " atoms>\n");

var n = keys.size ();
var k =  new Array (n);
keys.toArray (k);
java.util.Arrays.sort (k);
var sb =  new JU.SB ();
for (var i = 0; i < n; i++) sb.append (k[i]);

return sb.append ("\n").toString ();
}, "java.util.Map");
Clazz.defineMethod (c$, "setCGO", 
function (info) {
this.shm.loadShape (23);
this.shm.setShapePropertyBs (23, "setCGO", info, null);
}, "JU.Lst");
Clazz.defineMethod (c$, "setModelSet", 
function (modelSet) {
this.ms = this.mm.modelSet = modelSet;
}, "JM.ModelSet");
Clazz.defineMethod (c$, "setObjectProp", 
function (id, tokCommand) {
this.getScriptManager ();
if (id == null) id = "*";
return (this.eval == null ? null : this.eval.setObjectPropSafe (id, tokCommand));
}, "~S,~N");
Clazz.defineMethod (c$, "setDihedrals", 
function (dihedralList, bsBranches, rate) {
if (bsBranches == null) bsBranches = this.ms.getBsBranches (dihedralList);
this.ms.setDihedrals (dihedralList, bsBranches, rate);
}, "~A,~A,~N");
Clazz.defineMethod (c$, "getChainID", 
function (id, isAssign) {
var iboxed = this.chainMap.get (id);
if (iboxed != null) return iboxed.intValue ();
var i = id.charCodeAt (0);
if (id.length > 1) {
i = 300 + this.chainList.size ();
} else if (isAssign && 97 <= i && i <= 122) {
i += 159;
}if (i >= 256) {
this.chainCaseSpecified = new Boolean (this.chainCaseSpecified | isAssign).valueOf ();
this.chainList.addLast (id);
}iboxed = Integer.$valueOf (i);
this.chainMap.put (iboxed, id);
this.chainMap.put (id, iboxed);
return i;
}, "~S,~B");
Clazz.defineMethod (c$, "getChainIDStr", 
function (id) {
return this.chainMap.get (Integer.$valueOf (id));
}, "~N");
Clazz.defineMethod (c$, "getScriptQueueInfo", 
function () {
return (this.scm != null && this.scm.isQueueProcessing () ? Boolean.TRUE : Boolean.FALSE);
});
Clazz.defineMethod (c$, "getNMRCalculation", 
function () {
return (this.nmrCalculation == null ? (this.nmrCalculation = J.api.Interface.getOption ("quantum.NMRCalculation", this, "script")).setViewer (this) : this.nmrCalculation);
});
Clazz.defineMethod (c$, "getDistanceUnits", 
function (s) {
if (s == null) s = this.getDefaultMeasurementLabel (2);
var pt = s.indexOf ("//");
return (pt < 0 ? this.g.measureDistanceUnits : s.substring (pt + 2));
}, "~S");
Clazz.defineMethod (c$, "calculateFormalCharges", 
function (bs) {
return this.ms.fixFormalCharges (bs == null ? this.bsA () : bs);
}, "JU.BS");
Clazz.defineMethod (c$, "setModulation", 
function (bs, isOn, t1, isQ) {
if (isQ) this.g.setO ("_modt", JU.Escape.eP (t1));
this.ms.setModulation (bs == null ? this.getAllAtoms () : bs, isOn, t1, isQ);
this.refreshMeasures (true);
}, "JU.BS,~B,JU.P3,~B");
Clazz.defineMethod (c$, "checkInMotion", 
function (state) {
switch (state) {
case 0:
this.setTimeout ("_SET_IN_MOTION_", 0, null);
break;
case 1:
if (!this.inMotion) this.setTimeout ("_SET_IN_MOTION_", this.g.hoverDelayMs * 2, "!setInMotion");
break;
case 2:
this.setInMotion (true);
this.refresh (3, "timeoutThread set in motion");
break;
}
}, "~N");
Clazz.defineMethod (c$, "checkMotionRendering", 
function (tok) {
if (!this.getInMotion (true) && !this.tm.spinOn && !this.tm.vibrationOn && !this.am.animationOn) return true;
if (this.g.wireframeRotation) return false;
var n = 0;
switch (tok) {
case 1677721602:
case 1140850689:
n = 2;
break;
case 1112150020:
n = 3;
break;
case 1112150021:
n = 4;
break;
case 1112152066:
n = 5;
break;
case 1073742018:
n = 6;
break;
case 603979967:
n = 7;
break;
case 603979786:
n = 8;
break;
}
return this.g.platformSpeed >= n;
}, "~N");
Clazz.defineMethod (c$, "openExportChannel", 
function (privateKey, fileName, asWriter) {
return this.getOutputManager ().openOutputChannel (privateKey, fileName, asWriter, false);
}, "~N,~S,~B");
Clazz.overrideMethod (c$, "log", 
function (data) {
if (data != null) this.getOutputManager ().logToFile (data);
}, "~S");
Clazz.defineMethod (c$, "getLogFileName", 
function () {
return (this.logFileName == null ? "" : this.logFileName);
});
Clazz.defineMethod (c$, "getCommands", 
function (htDefine, htMore, select) {
return this.getStateCreator ().getCommands (htDefine, htMore, select);
}, "java.util.Map,java.util.Map,~S");
Clazz.defineMethod (c$, "allowCapture", 
function () {
return !this.isApplet || this.isSignedApplet;
});
Clazz.defineMethod (c$, "compileExpr", 
function (expr) {
var o = (this.getScriptManager () == null ? null : this.eval.evaluateExpression (expr, false, true));
return (Clazz.instanceOf (o, Array) ? o :  Clazz.newArray (-1, [JS.T.o (4, expr)]));
}, "~S");
Clazz.defineMethod (c$, "checkSelect", 
function (h, value) {
return this.getScriptManager () != null && this.eval.checkSelect (h, value);
}, "java.util.Map,~A");
Clazz.defineMethod (c$, "getAnnotationInfo", 
function (d, match, type) {
return this.getAnnotationParser (type == 1111490587).getAnnotationInfo (this, d, match, type, this.am.cmi);
}, "JS.SV,~S,~N");
Clazz.defineMethod (c$, "getAtomValidation", 
function (type, atom) {
return this.getAnnotationParser (false).getAtomValidation (this, type, atom);
}, "~S,JM.Atom");
Clazz.defineMethod (c$, "getJzt", 
function () {
return (this.jzt == null ? this.jzt = J.api.Interface.getInterface ("JU.ZipTools", this, "zip") : this.jzt);
});
Clazz.defineMethod (c$, "dragMinimizeAtom", 
function (iAtom) {
this.stopMinimization ();
var bs = (this.getMotionFixedAtoms ().isEmpty () ? this.ms.getAtoms ((this.ms.isAtomPDB (iAtom) ? 1086324742 : 1094713360), JU.BSUtil.newAndSetBit (iAtom)) : JU.BSUtil.setAll (this.ms.ac));
try {
this.minimize (null, 2147483647, 0, bs, null, 0, false, false, false, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (!this.async) return;
{
var me = this; setTimeout(function()
{me.dragMinimizeAtom(iAtom)}, 100);
}} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "getJBR", 
function () {
return (this.jbr == null ? this.jbr = (J.api.Interface.getInterface ("JM.BioResolver", this, "file")).setViewer (this) : this.jbr);
});
Clazz.defineMethod (c$, "checkMenuUpdate", 
function () {
if (this.jmolpopup != null) this.jmolpopup.jpiUpdateComputedMenus ();
});
Clazz.defineMethod (c$, "getChimeMessenger", 
function () {
return (this.jcm == null ? this.jcm = (J.api.Interface.getInterface ("JV.ChimeMessenger", this, "script")).set (this) : this.jcm);
});
Clazz.defineMethod (c$, "getAuxiliaryInfoForAtoms", 
function (atomExpression) {
return this.ms.getAuxiliaryInfo (this.ms.getModelBS (this.getAtomBitSet (atomExpression), false));
}, "~O");
Clazz.defineMethod (c$, "getJSJSONParser", 
 function () {
return (this.jsonParser == null ? this.jsonParser = J.api.Interface.getInterface ("JU.JSJSONParser", this, "script") : this.jsonParser);
});
Clazz.defineMethod (c$, "parseJSON", 
function (str) {
return (str == null ? null : str.startsWith ("{") ? this.parseJSONMap (str) : this.parseJSONArray (str));
}, "~S");
Clazz.defineMethod (c$, "parseJSONMap", 
function (jsonMap) {
return this.getJSJSONParser ().parseMap (jsonMap, true);
}, "~S");
Clazz.defineMethod (c$, "parseJSONArray", 
function (jsonArray) {
return this.getJSJSONParser ().parse (jsonArray, true);
}, "~S");
Clazz.defineMethod (c$, "getSymTemp", 
function () {
return J.api.Interface.getSymmetry (this, "ms");
});
Clazz.defineMethod (c$, "setWindowDimensions", 
function (dims) {
this.resizeInnerPanel (Clazz.floatToInt (dims[0]), Clazz.floatToInt (dims[1]));
}, "~A");
Clazz.defineMethod (c$, "getTriangulator", 
function () {
return (this.triangulator == null ? (this.triangulator = J.api.Interface.getUtil ("Triangulator", this, "script")) : this.triangulator);
});
Clazz.defineMethod (c$, "getCurrentModelAuxInfo", 
function () {
return (this.am.cmi >= 0 ? this.ms.getModelAuxiliaryInfo (this.am.cmi) : null);
});
Clazz.defineMethod (c$, "startNBO", 
function (options) {
var htParams =  new java.util.Hashtable ();
htParams.put ("service", "nbo");
htParams.put ("action", "showPanel");
htParams.put ("options", options);
this.sm.processService (htParams);
}, "~S");
Clazz.defineMethod (c$, "startPlugin", 
function (plugin) {
if ("nbo".equalsIgnoreCase (plugin)) this.startNBO ("all");
}, "~S");
Clazz.defineMethod (c$, "connectNBO", 
function (type) {
if (this.am.cmi < 0) return;
this.getNBOParser ().connectNBO (this.am.cmi, type);
}, "~S");
Clazz.defineMethod (c$, "getNBOParser", 
 function () {
return (this.nboParser == null ? this.nboParser = (J.api.Interface.getInterface ("J.adapter.readers.quantum.NBOParser", this, "script")).set (this) : this.nboParser);
});
Clazz.defineMethod (c$, "getNBOAtomLabel", 
function (atom) {
return this.getNBOParser ().getNBOAtomLabel (atom);
}, "JM.Atom");
Clazz.defineMethod (c$, "calculateChirality", 
function (bsAtoms) {
if (bsAtoms == null) bsAtoms = this.bsA ();
return this.ms.calculateChiralityForAtoms (bsAtoms, true);
}, "JU.BS");
Clazz.defineMethod (c$, "getSubstructureSetArray", 
function (pattern, bsSelected, flags) {
return this.getSmilesMatcher ().getSubstructureSetArray (pattern, this.ms.at, this.ms.ac, bsSelected, null, flags);
}, "~S,JU.BS,~N");
Clazz.defineMethod (c$, "getSubstructureSetArrayForNodes", 
function (pattern, nodes, flags) {
return this.getSmilesMatcher ().getSubstructureSetArray (pattern, nodes, nodes.length, null, null, flags);
}, "~S,~A,~N");
Clazz.defineMethod (c$, "getPdbID", 
function () {
return (this.ms.getInfo (this.am.cmi, "isPDB") === Boolean.TRUE ? this.ms.getInfo (this.am.cmi, "pdbID") : null);
});
Clazz.defineMethod (c$, "getModelInfo", 
function (key) {
return this.ms.getInfo (this.am.cmi, key);
}, "~S");
Clazz.defineMethod (c$, "getSmilesAtoms", 
function (smiles) {
return this.getSmilesMatcher ().getAtoms (smiles);
}, "~S");
Clazz.defineMethod (c$, "calculateChiralityForSmiles", 
function (smiles) {
try {
return J.api.Interface.getSymmetry (this, "ms").calculateCIPChiralityForSmiles (this, smiles);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "getModelForAtomIndex", 
function (iatom) {
return this.ms.am[this.ms.at[iatom].mi];
}, "~N");
Clazz.defineMethod (c$, "assignAtom", 
function (atomIndex, element, ptNew) {
if (atomIndex < 0) atomIndex = this.atomHighlighted;
if (this.ms.isAtomInLastModel (atomIndex)) {
this.script ("assign atom ({" + atomIndex + "}) \"" + element + "\" " + (ptNew == null ? "" : JU.Escape.eP (ptNew)));
}}, "~N,~S,JU.P3");
Clazz.defineMethod (c$, "getModelkit", 
function (andShow) {
if (this.modelkit == null) {
this.modelkit = this.apiPlatform.getMenuPopup (null, 'm');
} else if (andShow) {
this.modelkit.jpiUpdateComputedMenus ();
}return this.modelkit;
}, "~B");
Clazz.defineMethod (c$, "notifyScriptEditor", 
function (msWalltime, data) {
if (this.scriptEditor != null) {
this.scriptEditor.notify (msWalltime, data);
}}, "~N,~A");
Clazz.defineMethod (c$, "sendConsoleMessage", 
function (msg) {
if (this.appConsole != null) this.appConsole.sendConsoleMessage (msg);
}, "~S");
Clazz.defineMethod (c$, "getModelkitProperty", 
function (nameOrData) {
return (this.modelkit == null ? null : this.modelkit.getProperty (nameOrData));
}, "~O");
Clazz.defineMethod (c$, "setModelkitProperty", 
function (key, value) {
return (this.modelkit == null ? null : this.modelkit.setProperty (key, value));
}, "~S,~O");
Clazz.defineMethod (c$, "getSymmetryInfo", 
function (iatom, xyz, iOp, pt1, pt2, type, desc, scaleFactor, nth, options) {
try {
return this.getSymTemp ().getSymmetryInfoAtom (this.ms, iatom, xyz, iOp, pt1, pt2, desc, type, scaleFactor, nth, options);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("Exception in Viewer.getSymmetryInfo: " + e);
return null;
} else {
throw e;
}
}
}, "~N,~S,~N,JU.P3,JU.P3,~N,~S,~N,~N,~N");
Clazz.defineMethod (c$, "setModelKitRotateBondIndex", 
function (i) {
if (this.modelkit != null) {
this.modelkit.setProperty ("rotateBondIndex", Integer.$valueOf (i));
}}, "~N");
Clazz.defineMethod (c$, "getMacro", 
function (key) {
if (this.macros == null || this.macros.isEmpty ()) {
try {
var s = this.getAsciiFileOrNull (this.g.macroDirectory + "/macros.json");
this.macros = this.parseJSON (s);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.macros =  new java.util.Hashtable ();
} else {
throw e;
}
}
}if (key == null) {
var s =  new JU.SB ();
for (var k, $k = this.macros.keySet ().iterator (); $k.hasNext () && ((k = $k.next ()) || true);) {
var a = this.macros.get (k);
s.append (k).append ("\t").appendO (a).append ("\n");
}
return s.toString ();
}key = key.toLowerCase ();
return this.macros.containsKey (key) ? (this.macros.get (key)).get ("path").toString () : null;
}, "~S");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (JV.Viewer, "ACCESS", Enum);
Clazz.defineEnumConstant (c$, "NONE", 0, []);
Clazz.defineEnumConstant (c$, "READSPT", 1, []);
Clazz.defineEnumConstant (c$, "ALL", 2, []);
c$ = Clazz.p0p ();
{
{
self.Jmol && Jmol.extend && Jmol.extend("vwr",
JV.Viewer.prototype);
}}Clazz.defineStatics (c$,
"isJS", false,
"isJSNoAWT", false,
"isSwingJS", false,
"isWebGL", false,
"appletDocumentBase", "",
"appletCodeBase", "",
"appletIdiomaBase", null,
"jsDocumentBase", "",
"jmolObject", null);
c$.strJavaVendor = c$.prototype.strJavaVendor = "Java: " + System.getProperty ("java.vendor", "j2s");
c$.strOSName = c$.prototype.strOSName = System.getProperty ("os.name", "");
c$.strJavaVersion = c$.prototype.strJavaVersion = "Java " + System.getProperty ("java.version", "");
Clazz.defineStatics (c$,
"version_date", null,
"REFRESH_REPAINT", 1,
"REFRESH_SYNC", 2,
"REFRESH_SYNC_MASK", 3,
"REFRESH_REPAINT_NO_MOTION_ONLY", 6,
"REFRESH_SEND_WEBGL_NEW_ORIENTATION", 7,
"SYNC_GRAPHICS_MESSAGE", "GET_GRAPHICS",
"SYNC_NO_GRAPHICS_MESSAGE", "SET_GRAPHICS_OFF");
c$.staticFunctions = c$.prototype.staticFunctions =  new java.util.Hashtable ();
Clazz.defineStatics (c$,
"nProcessors", 1);
{
{
}}});
