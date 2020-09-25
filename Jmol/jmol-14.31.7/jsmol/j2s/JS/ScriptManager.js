Clazz.declarePackage ("JS");
Clazz.load (["J.api.JmolScriptManager", "JU.Lst"], "JS.ScriptManager", ["java.io.BufferedInputStream", "$.BufferedReader", "java.lang.Boolean", "$.Thread", "javajs.api.ZInputStream", "JU.AU", "$.BS", "$.PT", "$.Rdr", "$.SB", "J.api.Interface", "JS.ScriptQueueThread", "JU.Elements", "$.Logger", "JV.FileManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.eval = null;
this.evalTemp = null;
this.queueThreads = null;
this.scriptQueueRunning = null;
this.commandWatcherThread = null;
this.scriptQueue = null;
this.useCommandWatcherThread = false;
this.scriptIndex = 0;
this.$isScriptQueued = true;
Clazz.instantialize (this, arguments);
}, JS, "ScriptManager", null, J.api.JmolScriptManager);
Clazz.prepareFields (c$, function () {
this.queueThreads =  new Array (2);
this.scriptQueueRunning =  Clazz.newBooleanArray (2, false);
this.scriptQueue =  new JU.Lst ();
});
Clazz.overrideMethod (c$, "getScriptQueue", 
function () {
return this.scriptQueue;
});
Clazz.overrideMethod (c$, "isScriptQueued", 
function () {
return this.$isScriptQueued;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
this.eval = this.newScriptEvaluator ();
this.eval.setCompiler ();
return this.eval;
}, "JV.Viewer");
Clazz.defineMethod (c$, "newScriptEvaluator", 
 function () {
return (J.api.Interface.getInterface ("JS.ScriptEval", this.vwr, "setOptions")).setViewer (this.vwr);
});
Clazz.overrideMethod (c$, "clear", 
function (isAll) {
if (!isAll) {
this.evalTemp = null;
return;
}this.startCommandWatcher (false);
this.interruptQueueThreads ();
}, "~B");
Clazz.overrideMethod (c$, "addScript", 
function (strScript, isQuiet) {
return this.addScr ("String", strScript, "", isQuiet);
}, "~S,~B");
Clazz.defineMethod (c$, "addScr", 
 function (returnType, strScript, statusList, isQuiet) {
{
this.useCommandWatcherThread = false;
}if (!this.vwr.g.useScriptQueue) {
this.clearQueue ();
this.vwr.haltScriptExecution ();
}if (this.commandWatcherThread == null && this.useCommandWatcherThread) this.startCommandWatcher (true);
if (this.commandWatcherThread != null && strScript.indexOf ("/*SPLIT*/") >= 0) {
var scripts = JU.PT.split (strScript, "/*SPLIT*/");
for (var i = 0; i < scripts.length; i++) this.addScr (returnType, scripts[i], statusList, isQuiet);

return "split into " + scripts.length + " sections for processing";
}var useCommandThread = (this.commandWatcherThread != null && (strScript.indexOf ("javascript") < 0 || strScript.indexOf ("#javascript ") >= 0));
var scriptItem =  new JU.Lst ();
scriptItem.addLast (strScript);
scriptItem.addLast (statusList);
scriptItem.addLast (returnType);
scriptItem.addLast (isQuiet ? Boolean.TRUE : Boolean.FALSE);
scriptItem.addLast (Integer.$valueOf (useCommandThread ? -1 : 1));
this.scriptQueue.addLast (scriptItem);
this.startScriptQueue (false);
return "pending";
}, "~S,~S,~S,~B");
Clazz.overrideMethod (c$, "clearQueue", 
function () {
this.scriptQueue.clear ();
});
Clazz.overrideMethod (c$, "waitForQueue", 
function () {
if (this.vwr.isSingleThreaded) return;
var n = 0;
while (this.isQueueProcessing ()) {
try {
Thread.sleep (100);
if (((n++) % 10) == 0) {
if (JU.Logger.debugging) {
JU.Logger.debug ("...scriptManager waiting for queue: " + this.scriptQueue.size () + " thread=" + Thread.currentThread ().getName ());
}}} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
});
Clazz.overrideMethod (c$, "isQueueProcessing", 
function () {
return this.queueThreads[0] != null || this.queueThreads[1] != null;
});
Clazz.defineMethod (c$, "flushQueue", 
 function (command) {
for (var i = this.scriptQueue.size (); --i >= 0; ) {
var strScript = (this.scriptQueue.get (i).get (0));
if (strScript.indexOf (command) == 0) {
this.scriptQueue.removeItemAt (i);
if (JU.Logger.debugging) JU.Logger.debug (this.scriptQueue.size () + " scripts; removed: " + strScript);
}}
}, "~S");
Clazz.defineMethod (c$, "startScriptQueue", 
 function (startedByCommandWatcher) {
var pt = (startedByCommandWatcher ? 1 : 0);
if (this.scriptQueueRunning[pt]) return;
this.scriptQueueRunning[pt] = true;
this.queueThreads[pt] =  new JS.ScriptQueueThread (this, this.vwr, startedByCommandWatcher, pt);
this.queueThreads[pt].start ();
}, "~B");
Clazz.overrideMethod (c$, "getScriptItem", 
function (watching, isByCommandWatcher) {
if (this.vwr.isSingleThreaded && this.vwr.queueOnHold) return null;
var scriptItem = this.scriptQueue.get (0);
var flag = ((scriptItem.get (4)).intValue ());
var isOK = (watching ? flag < 0 : isByCommandWatcher ? flag == 0 : flag == 1);
return (isOK ? scriptItem : null);
}, "~B,~B");
Clazz.overrideMethod (c$, "startCommandWatcher", 
function (isStart) {
this.useCommandWatcherThread = isStart;
if (isStart) {
if (this.commandWatcherThread != null) return;
this.commandWatcherThread = J.api.Interface.getInterface ("JS.CommandWatcherThread", this.vwr, "setOptions");
this.commandWatcherThread.setManager (this, this.vwr, null);
this.commandWatcherThread.start ();
} else {
if (this.commandWatcherThread == null) return;
this.clearCommandWatcherThread ();
}if (JU.Logger.debugging) {
JU.Logger.debug ("command watcher " + (isStart ? "started" : "stopped") + this.commandWatcherThread);
}}, "~B");
Clazz.defineMethod (c$, "interruptQueueThreads", 
function () {
for (var i = 0; i < this.queueThreads.length; i++) {
if (this.queueThreads[i] != null) this.queueThreads[i].interrupt ();
}
});
Clazz.defineMethod (c$, "clearCommandWatcherThread", 
function () {
if (this.commandWatcherThread == null) return;
this.commandWatcherThread.interrupt ();
this.commandWatcherThread = null;
});
Clazz.overrideMethod (c$, "queueThreadFinished", 
function (pt) {
this.queueThreads[pt].interrupt ();
this.scriptQueueRunning[pt] = false;
this.queueThreads[pt] = null;
this.vwr.setSyncDriver (4);
this.vwr.queueOnHold = false;
}, "~N");
Clazz.defineMethod (c$, "runScriptNow", 
function () {
if (this.scriptQueue.size () > 0) {
var scriptItem = this.getScriptItem (true, true);
if (scriptItem != null) {
scriptItem.set (4, Integer.$valueOf (0));
this.startScriptQueue (true);
}}});
Clazz.overrideMethod (c$, "evalFile", 
function (strFilename) {
var ptWait = strFilename.indexOf (" -noqueue");
if (ptWait >= 0) {
return this.evalStringWaitStatusQueued ("String", "script " + JU.PT.esc (strFilename.substring (0, ptWait)), "", false, false);
}return this.addScript ("script " + JU.PT.esc (strFilename), false);
}, "~S");
Clazz.overrideMethod (c$, "evalStringWaitStatusQueued", 
function (returnType, strScript, statusList, isQuiet, isQueued) {
if (strScript == null) return null;
var str = this.checkScriptExecution (strScript, false);
if (str != null) return str;
var outputBuffer = (statusList == null || statusList.equals ("output") ?  new JU.SB () : null);
var oldStatusList = this.vwr.sm.statusList;
this.vwr.getStatusChanged (statusList);
if (this.vwr.isSyntaxCheck) JU.Logger.info ("--checking script:\n" + this.eval.getScript () + "\n----\n");
var historyDisabled = (strScript.indexOf (")") == 0);
if (historyDisabled) strScript = strScript.substring (1);
historyDisabled = historyDisabled || !isQueued;
this.vwr.setErrorMessage (null, null);
var eval = (isQueued ? this.eval : this.newScriptEvaluator ());
var isOK = eval.compileScriptString (strScript, isQuiet);
var strErrorMessage = eval.getErrorMessage ();
var strErrorMessageUntranslated = eval.getErrorMessageUntranslated ();
this.vwr.setErrorMessage (strErrorMessage, strErrorMessageUntranslated);
this.vwr.refresh (7, "script complete");
if (isOK) {
this.$isScriptQueued = isQueued;
if (!isQuiet) this.vwr.setScriptStatus (null, strScript, -2 - (++this.scriptIndex), null);
eval.evaluateCompiledScript (this.vwr.isSyntaxCheck, this.vwr.isSyntaxAndFileCheck, historyDisabled, this.vwr.listCommands, outputBuffer, isQueued || !this.vwr.isSingleThreaded);
} else {
this.vwr.scriptStatus (strErrorMessage);
this.vwr.setScriptStatus ("Jmol script terminated", strErrorMessage, 1, strErrorMessageUntranslated);
if (eval.isStateScript ()) JS.ScriptManager.setStateScriptVersion (this.vwr, null);
}if (strErrorMessage != null && this.vwr.autoExit) this.vwr.exitJmol ();
if (this.vwr.isSyntaxCheck) {
if (strErrorMessage == null) JU.Logger.info ("--script check ok");
 else JU.Logger.error ("--script check error\n" + strErrorMessageUntranslated);
JU.Logger.info ("(use 'exit' to stop checking)");
}this.$isScriptQueued = true;
if (returnType.equalsIgnoreCase ("String")) return strErrorMessageUntranslated;
if (outputBuffer != null) return (strErrorMessageUntranslated == null ? outputBuffer.toString () : strErrorMessageUntranslated);
var info = this.vwr.getProperty (returnType, "jmolStatus", statusList);
this.vwr.getStatusChanged (oldStatusList);
return info;
}, "~S,~S,~S,~B,~B");
Clazz.defineMethod (c$, "checkScriptExecution", 
 function (strScript, isInsert) {
var str = strScript;
if (str.indexOf ("\1##") >= 0) str = str.substring (0, str.indexOf ("\1##"));
if (this.checkResume (str)) return "script processing resumed";
if (this.checkStepping (str)) return "script processing stepped";
if (this.checkHalt (str, isInsert)) return "script execution halted";
return null;
}, "~S,~B");
Clazz.defineMethod (c$, "checkResume", 
 function (str) {
if (str.equalsIgnoreCase ("resume")) {
this.vwr.scriptStatusMsg ("", "execution resumed");
this.eval.resumePausedExecution ();
return true;
}return false;
}, "~S");
Clazz.defineMethod (c$, "checkStepping", 
 function (str) {
if (str.equalsIgnoreCase ("step")) {
this.eval.stepPausedExecution ();
return true;
}if (str.equalsIgnoreCase ("?")) {
this.vwr.scriptStatus (this.eval.getNextStatement ());
return true;
}return false;
}, "~S");
Clazz.overrideMethod (c$, "evalStringQuietSync", 
function (strScript, isQuiet, allowSyncScript) {
if (allowSyncScript && this.vwr.sm.syncingScripts && strScript.indexOf ("#NOSYNC;") < 0) this.vwr.syncScript (strScript + " #NOSYNC;", null, 0);
if (this.eval.isPaused () && strScript.charAt (0) != '!') strScript = '!' + JU.PT.trim (strScript, "\n\r\t ");
var isInsert = (strScript.length > 0 && strScript.charAt (0) == '!');
if (isInsert) strScript = strScript.substring (1);
var msg = this.checkScriptExecution (strScript, isInsert);
if (msg != null) return msg;
if (this.vwr.isScriptExecuting () && (isInsert || this.eval.isPaused ())) {
this.vwr.setInsertedCommand (strScript);
if (strScript.indexOf ("moveto ") == 0) this.flushQueue ("moveto ");
return "!" + strScript;
}this.vwr.setInsertedCommand ("");
if (isQuiet) strScript += "\u0001## EDITOR_IGNORE ##";
return this.addScript (strScript, isQuiet && !this.vwr.getBoolean (603979879));
}, "~S,~B,~B");
Clazz.overrideMethod (c$, "checkHalt", 
function (str, isInsert) {
if (str.equalsIgnoreCase ("pause")) {
this.vwr.pauseScriptExecution ();
if (this.vwr.scriptEditorVisible) this.vwr.scriptStatusMsg ("", "paused -- type RESUME to continue");
return true;
}if (str.equalsIgnoreCase ("menu")) {
this.vwr.getProperty ("DATA_API", "getPopupMenu", "\0");
return true;
}str = str.toLowerCase ();
var exitScript = false;
var haltType = null;
if (str.startsWith ("exit")) {
this.vwr.haltScriptExecution ();
this.vwr.clearScriptQueue ();
this.vwr.clearTimeouts ();
exitScript = str.equals (haltType = "exit");
} else if (str.startsWith ("quit")) {
this.vwr.haltScriptExecution ();
exitScript = str.equals (haltType = "quit");
}if (haltType == null) return false;
if (isInsert) {
this.vwr.clearThreads ();
this.vwr.queueOnHold = false;
}if (isInsert || this.vwr.g.waitForMoveTo) {
this.vwr.tm.stopMotion ();
}JU.Logger.info (this.vwr.isSyntaxCheck ? haltType + " -- stops script checking" : (isInsert ? "!" : "") + haltType + " received");
this.vwr.isSyntaxCheck = false;
return exitScript;
}, "~S,~B");
Clazz.overrideMethod (c$, "getAtomBitSetEval", 
function (eval, atomExpression) {
if (eval == null) {
eval = this.evalTemp;
if (eval == null) eval = this.evalTemp = this.newScriptEvaluator ();
}return this.vwr.slm.excludeAtoms (eval.getAtomBitSet (atomExpression), false);
}, "J.api.JmolScriptEvaluator,~O");
Clazz.overrideMethod (c$, "scriptCheckRet", 
function (strScript, returnContext) {
if (strScript.indexOf (")") == 0 || strScript.indexOf ("!") == 0) strScript = strScript.substring (1);
var sc = this.newScriptEvaluator ().checkScriptSilent (strScript);
return (returnContext || sc.errorMessage == null ? sc : sc.errorMessage);
}, "~S,~B");
Clazz.overrideMethod (c$, "openFileAsync", 
function (fileName, flags) {
var noScript = ((flags & 2) == 2);
var isAppend = ((flags & 4) == 4);
var pdbCartoons = ((flags & 1) == 1 && !isAppend);
var noAutoPlay = ((flags & 8) == 8);
var cmd = null;
fileName = fileName.trim ();
if (fileName.startsWith ("\t")) {
noScript = true;
fileName = fileName.substring (1);
}fileName = fileName.$replace ('\\', '/');
var isCached = fileName.startsWith ("cache://");
if (this.vwr.isApplet && fileName.indexOf ("://") < 0) fileName = "file://" + (fileName.startsWith ("/") ? "" : "/") + fileName;
try {
if (fileName.endsWith (".pse")) {
cmd = (isCached ? "" : "zap;") + "load SYNC " + JU.PT.esc (fileName) + (this.vwr.isApplet ? "" : " filter 'DORESIZE'");
return;
}if (fileName.endsWith ("jvxl")) {
cmd = "isosurface ";
} else if (!fileName.toLowerCase ().endsWith (".spt")) {
var type = this.getDragDropFileTypeName (fileName);
if (type == null) {
type = JV.FileManager.determineSurfaceTypeIs (this.vwr.getBufferedInputStream (fileName));
if (type != null) cmd = "if (_filetype == 'Pdb') { isosurface sigma 1.0 within 2.0 {*} " + JU.PT.esc (fileName) + " mesh nofill }; else; { isosurface " + JU.PT.esc (fileName) + "}";
return;
}if (type.equals ("dssr")) {
cmd = "model {visible} property dssr ";
} else if (type.equals ("Jmol")) {
cmd = "script ";
} else if (type.equals ("Cube")) {
cmd = "isosurface sign red blue ";
} else if (!type.equals ("spt")) {
cmd = this.vwr.g.defaultDropScript;
cmd = JU.PT.rep (cmd, "%FILE", fileName);
cmd = JU.PT.rep (cmd, "%ALLOWCARTOONS", "" + pdbCartoons);
if (cmd.toLowerCase ().startsWith ("zap") && (isCached || isAppend)) cmd = cmd.substring (3);
if (isAppend) {
cmd = JU.PT.rep (cmd, "load SYNC", "load append");
}return;
}}if (cmd == null && !noScript && this.vwr.scriptEditorVisible) this.vwr.showEditor ( Clazz.newArray (-1, [fileName, this.vwr.getFileAsString3 (fileName, true, null)]));
 else cmd = (cmd == null ? "script " : cmd) + JU.PT.esc (fileName);
} finally {
if (cmd != null) this.vwr.evalString (cmd + (noAutoPlay ? "#!NOAUTOPLAY" : ""));
}
}, "~S,~N");
Clazz.defineMethod (c$, "getDragDropFileTypeName", 
 function (fileName) {
var pt = fileName.indexOf ("::");
if (pt >= 0) return fileName.substring (0, pt);
if (fileName.startsWith ("=")) return "pdb";
if (fileName.endsWith (".dssr")) return "dssr";
var br = this.vwr.fm.getUnzippedReaderOrStreamFromName (fileName, null, true, false, true, true, null);
if (Clazz.instanceOf (br, javajs.api.ZInputStream)) {
var zipDirectory = this.getZipDirectoryAsString (fileName);
if (zipDirectory.indexOf ("JmolManifest") >= 0) return "Jmol";
return this.vwr.getModelAdapter ().getFileTypeName (JU.Rdr.getBR (zipDirectory));
}if (Clazz.instanceOf (br, java.io.BufferedReader) || Clazz.instanceOf (br, java.io.BufferedInputStream)) return this.vwr.getModelAdapter ().getFileTypeName (br);
if (JU.AU.isAS (br)) {
return (br)[0];
}return null;
}, "~S");
Clazz.defineMethod (c$, "getZipDirectoryAsString", 
 function (fileName) {
var t = this.vwr.fm.getBufferedInputStreamOrErrorMessageFromName (fileName, fileName, false, false, null, false, true);
return this.vwr.getJzt ().getZipDirectoryAsStringAndClose (t);
}, "~S");
c$.setStateScriptVersion = Clazz.defineMethod (c$, "setStateScriptVersion", 
function (vwr, version) {
if (version != null) {
JS.ScriptManager.prevCovalentVersion = JU.Elements.bondingVersion;
var tokens = JU.PT.getTokens (version.$replace ('.', ' ').$replace ('_', ' '));
try {
var main = JU.PT.parseInt (tokens[0]);
var sub = JU.PT.parseInt (tokens[1]);
var minor = JU.PT.parseInt (tokens[2]);
if (minor == -2147483648) minor = 0;
if (main != -2147483648 && sub != -2147483648) {
var ver = vwr.stateScriptVersionInt = main * 10000 + sub * 100 + minor;
vwr.setBooleanProperty ("legacyautobonding", (ver < 110924));
vwr.g.legacyHAddition = (ver < 130117);
vwr.setBooleanProperty ("legacyjavafloat", (ver < 140206 || ver >= 140300 && ver < 140306));
vwr.setIntProperty ("bondingVersion", ver < 140111 ? 0 : 1);
return;
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}vwr.setIntProperty ("bondingVersion", JS.ScriptManager.prevCovalentVersion);
vwr.setBooleanProperty ("legacyautobonding", false);
vwr.g.legacyHAddition = false;
vwr.stateScriptVersionInt = 2147483647;
}, "JV.Viewer,~S");
Clazz.overrideMethod (c$, "addHydrogensInline", 
function (bsAtoms, vConnections, pts) {
var iatom = bsAtoms.nextSetBit (0);
var modelIndex = (iatom < 0 ? this.vwr.ms.mc - 1 : this.vwr.ms.at[iatom].mi);
if (modelIndex != this.vwr.ms.mc - 1) return  new JU.BS ();
var bsA = this.vwr.getModelUndeletedAtomsBitSet (modelIndex);
this.vwr.g.appendNew = false;
var atomIndex = this.vwr.ms.ac;
var atomno = this.vwr.ms.getAtomCountInModel (modelIndex);
var sbConnect =  new JU.SB ();
for (var i = 0; i < vConnections.size (); i++) {
var a = vConnections.get (i);
sbConnect.append (";  connect 0 100 ").append ("({" + (atomIndex++) + "}) ").append ("({" + a.i + "}) group;");
}
var sb =  new JU.SB ();
sb.appendI (pts.length).append ("\n").append ("Viewer.AddHydrogens").append ("#noautobond").append ("\n");
for (var i = 0; i < pts.length; i++) sb.append ("H ").appendF (pts[i].x).append (" ").appendF (pts[i].y).append (" ").appendF (pts[i].z).append (" - - - - ").appendI (++atomno).appendC ('\n');

this.vwr.openStringInlineParamsAppend (sb.toString (), null, true);
this.eval.runScriptBuffer (sbConnect.toString (), null, false);
var bsB = this.vwr.getModelUndeletedAtomsBitSet (modelIndex);
bsB.andNot (bsA);
return bsB;
}, "JU.BS,JU.Lst,~A");
Clazz.defineStatics (c$,
"prevCovalentVersion", 1);
});
