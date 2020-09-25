Clazz.declarePackage ("JS");
Clazz.load (["JS.ScriptExpr"], "JS.ScriptEval", ["java.lang.Boolean", "$.Float", "$.NullPointerException", "$.Thread", "java.util.Arrays", "$.Hashtable", "$.Map", "JU.AU", "$.BArray", "$.BS", "$.Base64", "$.Lst", "$.M3", "$.M4", "$.Measure", "$.P3", "$.P4", "$.PT", "$.Quat", "$.SB", "$.V3", "J.api.Interface", "$.JmolParallelProcessor", "J.atomdata.RadiusData", "J.c.PAL", "$.STR", "$.VDW", "J.i18n.GT", "JM.BondSet", "$.Group", "JS.FileLoadThread", "$.SV", "$.ScriptCompiler", "$.ScriptContext", "$.ScriptDelayThread", "$.ScriptInterruption", "$.ScriptManager", "$.ScriptMathProcessor", "$.T", "JU.BSUtil", "$.ColorEncoder", "$.Edge", "$.Elements", "$.Escape", "$.Font", "$.Logger", "$.Parser", "$.SimpleUnitCell", "$.Txt", "JV.ActionManager", "$.FileManager", "$.JC", "$.StateManager", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sm = null;
this.isJS = false;
this.scriptDelayThread = null;
this.fileLoadThread = null;
this.allowJSThreads = true;
this.isFuncReturn = false;
this.historyDisabled = false;
this.debugScript = false;
this.isCmdLine_C_Option = false;
this.isCmdLine_c_or_C_Option = false;
this.listCommands = false;
this.tQuiet = false;
this.executionStopped = false;
this.executionPaused = false;
this.executionStepping = false;
this.executing = false;
this.timeBeginExecution = 0;
this.timeEndExecution = 0;
this.mustResumeEval = false;
this.currentThread = null;
this.compiler = null;
this.outputBuffer = null;
this.contextPath = "";
this.scriptFileName = null;
this.functionName = null;
this.$isStateScript = false;
this.scriptLevel = 0;
this.aatoken = null;
this.lineNumbers = null;
this.lineIndices = null;
this.script = null;
this.scriptExtensions = null;
this.pc = 0;
this.thisCommand = null;
this.fullCommand = null;
this.lineEnd = 0;
this.pcEnd = 0;
this.forceNoAddHydrogens = false;
this.parallelProcessor = null;
this.pcResume = -1;
this.isEmbedded = false;
Clazz.instantialize (this, arguments);
}, JS, "ScriptEval", JS.ScriptExpr);
Clazz.overrideMethod (c$, "getAllowJSThreads", 
function () {
return this.allowJSThreads;
});
Clazz.defineMethod (c$, "setAllowJSThreads", 
function (b) {
this.allowJSThreads = b;
}, "~B");
Clazz.defineMethod (c$, "doReport", 
function () {
return (!this.tQuiet && this.scriptLevel <= JS.ScriptEval.scriptReportingLevel);
});
Clazz.overrideMethod (c$, "isStateScript", 
function () {
return this.$isStateScript;
});
Clazz.overrideMethod (c$, "setStatic", 
function (tok, ival) {
switch (tok) {
case 553648167:
if (ival >= 10) JS.ScriptEval.contextDepthMax = ival;
return JS.ScriptEval.contextDepthMax;
case 553648146:
if (ival >= 0) JS.ScriptEval.commandHistoryLevelMax = ival;
return JS.ScriptEval.commandHistoryLevelMax;
case 553648168:
if (ival >= 0) JS.ScriptEval.scriptReportingLevel = ival;
return JS.ScriptEval.scriptReportingLevel;
}
return 0;
}, "~N,~N");
Clazz.overrideMethod (c$, "getScript", 
function () {
return this.script;
});
Clazz.makeConstructor (c$, 
function () {
this.currentThread = Thread.currentThread ();
});
Clazz.overrideMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
this.compiler = (this.compiler == null ? vwr.compiler : this.compiler);
this.isJS = vwr.isSingleThreaded;
return this;
}, "JV.Viewer");
Clazz.overrideMethod (c$, "setCompiler", 
function () {
this.vwr.compiler = this.compiler =  new JS.ScriptCompiler (this.vwr);
});
Clazz.overrideMethod (c$, "compileScriptString", 
function (script, tQuiet) {
this.clearState (tQuiet);
this.contextPath = "[script]";
return this.compileScript (null, script, this.debugScript);
}, "~S,~B");
Clazz.overrideMethod (c$, "compileScriptFile", 
function (filename, tQuiet) {
this.clearState (tQuiet);
this.contextPath = filename;
return this.compileScriptFileInternal (filename, null, null, null);
}, "~S,~B");
Clazz.overrideMethod (c$, "evaluateCompiledScript", 
function (isCmdLine_c_or_C_Option, isCmdLine_C_Option, historyDisabled, listCommands, outputBuffer, allowThreads) {
var tempOpen = this.isCmdLine_C_Option;
this.isCmdLine_C_Option = isCmdLine_C_Option;
this.chk = this.isCmdLine_c_or_C_Option = isCmdLine_c_or_C_Option;
this.historyDisabled = historyDisabled;
this.outputBuffer = outputBuffer;
this.currentThread = Thread.currentThread ();
this.setAllowJSThreads ( new Boolean (allowThreads & !this.vwr.getBoolean (603979892)).valueOf ());
this.listCommands = listCommands;
this.timeBeginExecution = System.currentTimeMillis ();
this.executionStopped = this.executionPaused = false;
this.executionStepping = false;
this.executing = true;
this.vwr.pushHoldRepaintWhy ("runEval");
this.setScriptExtensions ();
this.executeCommands (false, true);
this.isCmdLine_C_Option = tempOpen;
if (this.$isStateScript) JS.ScriptManager.setStateScriptVersion (this.vwr, null);
}, "~B,~B,~B,~B,JU.SB,~B");
Clazz.defineMethod (c$, "useThreads", 
function () {
return (!this.chk && !this.vwr.headless && !this.vwr.autoExit && this.vwr.haveDisplay && this.outputBuffer == null && this.allowJSThreads);
});
Clazz.defineMethod (c$, "executeCommands", 
 function (isTry, reportCompletion) {
var haveError = false;
try {
if (!this.dispatchCommands (false, false, isTry)) return;
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
this.vwr.handleError (er, false);
this.setErrorMessage ("" + er + " " + this.vwr.getShapeErrorState ());
this.errorMessageUntranslated = "" + er;
this.report (this.errorMessage, true);
haveError = true;
}
} else if (Clazz.exceptionOf (e$$, JS.ScriptException)) {
var e = e$$;
{
if (Clazz.instanceOf (e, JS.ScriptInterruption) && (!isTry || !e.isError)) {
return;
}if (isTry) {
this.vwr.setStringProperty ("_errormessage", "" + e);
return;
}this.setErrorMessage (e.toString ());
this.errorMessageUntranslated = e.getErrorMessageUntranslated ();
this.report (this.errorMessage, true);
this.vwr.notifyError ((this.errorMessage != null && this.errorMessage.indexOf ("java.lang.OutOfMemoryError") >= 0 ? "Error" : "ScriptException"), this.errorMessage, this.errorMessageUntranslated);
haveError = true;
}
} else {
throw e$$;
}
}
if (haveError || !this.isJS || !this.allowJSThreads) {
this.vwr.setTainted (true);
this.vwr.popHoldRepaint ("executeCommands" + " " + (this.scriptLevel > 0 ? "\u0001## REPAINT_IGNORE ##" : ""));
}this.timeEndExecution = System.currentTimeMillis ();
if (this.errorMessage == null && this.executionStopped) this.setErrorMessage ("execution interrupted");
 else if (!this.tQuiet && reportCompletion) this.vwr.scriptStatus ("Script completed");
this.executing = this.chk = this.isCmdLine_c_or_C_Option = this.historyDisabled = false;
var msg = this.getErrorMessageUntranslated ();
this.vwr.setErrorMessage (this.errorMessage, msg);
if (!this.tQuiet && reportCompletion) this.vwr.setScriptStatus ("Jmol script terminated", this.errorMessage, 1 + (this.timeEndExecution - this.timeBeginExecution), msg);
}, "~B,~B");
Clazz.overrideMethod (c$, "resumeEval", 
function (sco) {
var sc = sco;
this.setErrorMessage (null);
if (this.executionStopped || sc == null || !sc.mustResumeEval) {
this.resumeViewer ("resumeEval");
return;
}if (!this.executionPaused) sc.pc++;
this.thisContext = sc;
if (sc.scriptLevel > 0) this.scriptLevel = sc.scriptLevel - 1;
this.restoreScriptContext (sc, true, false, false);
this.pcResume = sc.pc;
this.executeCommands (sc.isTryCatch, this.scriptLevel <= 0);
this.pcResume = -1;
}, "~O");
Clazz.defineMethod (c$, "resumeViewer", 
 function (why) {
this.vwr.setTainted (true);
this.vwr.popHoldRepaint (why + (this.chk ? "\u0001## REPAINT_IGNORE ##" : ""));
this.vwr.queueOnHold = false;
}, "~S");
Clazz.overrideMethod (c$, "runScript", 
function (script) {
if (!this.vwr.isPreviewOnly) this.runScriptBuffer (script, this.outputBuffer, false);
}, "~S");
Clazz.overrideMethod (c$, "runScriptBuffer", 
function (script, outputBuffer, isFuncReturn) {
this.pushContext (null, "runScriptBuffer");
this.contextPath += " >> script() ";
this.outputBuffer = outputBuffer;
this.setAllowJSThreads (false);
var fret = this.isFuncReturn;
this.isFuncReturn = new Boolean (this.isFuncReturn | isFuncReturn).valueOf ();
if (this.compileScript (null, script + "\u0001## EDITOR_IGNORE ##" + "\u0001## REPAINT_IGNORE ##", false)) this.dispatchCommands (false, false, false);
this.popContext (false, false);
this.isFuncReturn = fret;
}, "~S,JU.SB,~B");
Clazz.overrideMethod (c$, "checkScriptSilent", 
function (script) {
var sc = this.compiler.compile (null, script, false, true, false, true);
if (sc.errorType != null) return sc;
this.restoreScriptContext (sc, false, false, false);
this.chk = true;
this.isCmdLine_c_or_C_Option = this.isCmdLine_C_Option = false;
this.pc = 0;
try {
this.dispatchCommands (false, false, false);
} catch (e) {
if (Clazz.exceptionOf (e, JS.ScriptException)) {
this.setErrorMessage (e.toString ());
sc = this.getScriptContext ("checkScriptSilent");
} else {
throw e;
}
}
this.chk = false;
return sc;
}, "~S");
c$.getContextTrace = Clazz.defineMethod (c$, "getContextTrace", 
function (vwr, sc, sb, isTop) {
if (sb == null) sb =  new JU.SB ();
var pc = Math.min (sc.pc, sc.lineNumbers[sc.lineNumbers.length - 1]);
sb.append (JS.ScriptError.getErrorLineMessage (sc.functionName, sc.scriptFileName, sc.lineNumbers[pc], pc, JS.ScriptEval.statementAsString (vwr, sc.statement, (isTop ? sc.iToken : 9999), false)));
if (sc.parentContext != null) JS.ScriptEval.getContextTrace (vwr, sc.parentContext, sb, false);
return sb;
}, "JV.Viewer,JS.ScriptContext,JU.SB,~B");
Clazz.overrideMethod (c$, "setDebugging", 
function () {
this.debugScript = this.vwr.getBoolean (603979825);
this.debugHigh = (this.debugScript && JU.Logger.debugging);
});
Clazz.overrideMethod (c$, "haltExecution", 
function () {
if (this.isEmbedded) {
this.vwr.setBooleanProperty ("allowEmbeddedScripts", true);
this.isEmbedded = false;
}this.resumePausedExecution ();
this.executionStopped = true;
});
Clazz.overrideMethod (c$, "pauseExecution", 
function (withDelay) {
if (this.chk || this.vwr.headless) return;
if (withDelay && !this.isJS) this.delayScript (-100);
this.vwr.popHoldRepaint ("pauseExecution " + withDelay);
this.executionStepping = false;
this.executionPaused = true;
}, "~B");
Clazz.overrideMethod (c$, "stepPausedExecution", 
function () {
this.executionStepping = true;
this.executionPaused = false;
});
Clazz.overrideMethod (c$, "resumePausedExecution", 
function () {
this.executionPaused = false;
this.executionStepping = false;
});
Clazz.overrideMethod (c$, "isExecuting", 
function () {
return this.executing && !this.executionStopped;
});
Clazz.overrideMethod (c$, "isPaused", 
function () {
return this.executionPaused;
});
Clazz.overrideMethod (c$, "isStepping", 
function () {
return this.executionStepping;
});
Clazz.overrideMethod (c$, "isStopped", 
function () {
return this.executionStopped || !this.isJS && this.currentThread !== Thread.currentThread ();
});
Clazz.overrideMethod (c$, "getNextStatement", 
function () {
return (this.pc < this.aatoken.length ? JS.ScriptError.getErrorLineMessage (this.functionName, this.scriptFileName, this.getLinenumber (null), this.pc, JS.ScriptEval.statementAsString (this.vwr, this.aatoken[this.pc], -9999, this.debugHigh)) : "");
});
Clazz.defineMethod (c$, "getCommand", 
 function (pc, allThisLine, addSemi) {
if (pc >= this.lineIndices.length) return "";
if (allThisLine) {
var pt0 = -1;
var pt1 = this.script.length;
for (var i = 0; i < this.lineNumbers.length; i++) if (this.lineNumbers[i] == this.lineNumbers[pc]) {
if (pt0 < 0) pt0 = this.lineIndices[i][0];
pt1 = this.lineIndices[i][1];
} else if (this.lineNumbers[i] == 0 || this.lineNumbers[i] > this.lineNumbers[pc]) {
break;
}
var s = this.script;
if (s.indexOf ('\1') >= 0) s = s.substring (0, s.indexOf ('\1'));
if (pt1 == s.length - 1 && s.endsWith ("}")) pt1++;
return (pt0 == s.length || pt1 < pt0 ? "" : s.substring (Math.max (pt0, 0), Math.min (s.length, pt1)));
}var ichBegin = this.lineIndices[pc][0];
var ichEnd = this.lineIndices[pc][1];
var s = "";
if (ichBegin < 0 || ichEnd <= ichBegin || ichEnd > this.script.length) return "";
try {
s = this.script.substring (ichBegin, ichEnd);
if (s.indexOf ("\\\n") >= 0) s = JU.PT.rep (s, "\\\n", "  ");
if (s.indexOf ("\\\r") >= 0) s = JU.PT.rep (s, "\\\r", "  ");
if (s.length > 0 && !s.endsWith (";")) s += ";";
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("darn problem in Eval getCommand: ichBegin=" + ichBegin + " ichEnd=" + ichEnd + " len = " + this.script.length + "\n" + e);
} else {
throw e;
}
}
return s;
}, "~N,~B,~B");
Clazz.defineMethod (c$, "logDebugScript", 
 function (st, ifLevel) {
this.iToken = -9999;
if (this.debugHigh) {
if (st.length > 0) JU.Logger.debug (st[0].toString ());
for (var i = 1; i < st.length; ++i) if (st[i] != null) JU.Logger.debug (st[i].toString ());

var strbufLog =  new JU.SB ();
var s = (ifLevel > 0 ? "                          ".substring (0, ifLevel * 2) : "");
strbufLog.append (s).append (JS.ScriptEval.statementAsString (this.vwr, st, this.iToken, this.debugHigh));
this.vwr.scriptStatus (strbufLog.toString ());
} else {
var cmd = this.getCommand (this.pc, false, false);
if (cmd !== "") this.vwr.scriptStatus (cmd);
}}, "~A,~N");
Clazz.overrideMethod (c$, "evaluateExpression", 
function (expr, asVariable, compileOnly) {
var e = ( new JS.ScriptEval ()).setViewer (this.vwr);
try {
e.thisContext = this.thisContext;
e.contextVariables = this.contextVariables;
e.pushContext (null, "evalExp");
e.setAllowJSThreads (false);
} catch (e1) {
if (Clazz.exceptionOf (e1, JS.ScriptException)) {
} else {
throw e1;
}
}
var exec0 = this.executing;
var o = (e.evaluate (expr, asVariable, compileOnly));
this.executing = exec0;
return o;
}, "~O,~B,~B");
Clazz.defineMethod (c$, "runBufferedSafely", 
function (script, outputBuffer) {
if (outputBuffer == null) outputBuffer = this.outputBuffer;
var e = ( new JS.ScriptEval ()).setViewer (this.vwr);
var exec0 = this.executing;
try {
e.runScriptBuffer (script, outputBuffer, false);
} catch (e1) {
if (Clazz.exceptionOf (e1, JS.ScriptException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
this.executing = exec0;
}, "~S,JU.SB");
c$.runUserAction = Clazz.defineMethod (c$, "runUserAction", 
function (functionName, params, vwr) {
var ev = ( new JS.ScriptEval ()).setViewer (vwr);
var func = vwr.getFunction (functionName.toLowerCase ());
if (func == null) return null;
try {
var svparams = JS.SV.getVariableAO (params).getList ();
ev.restoreFunction (func, svparams, null);
ev.dispatchCommands (false, true, false);
} catch (e) {
if (Clazz.exceptionOf (e, JS.ScriptException)) {
return null;
} else {
throw e;
}
}
var ret = ev.getContextVariableAsVariable ("_retval", false);
return (ret == null ? JS.SV.vT : ret);
}, "~S,~A,JV.Viewer");
Clazz.defineMethod (c$, "evaluate", 
 function (expr, asVariable, compileOnly) {
try {
if (Clazz.instanceOf (expr, String)) {
if (this.compileScript (null, "e_x_p_r_e_s_s_i_o_n = " + expr, false)) {
if (compileOnly) return this.aatoken[0];
this.setStatement (this.aatoken[0], 1);
return (asVariable ? this.parameterExpressionList (2, -1, false).get (0) : this.parameterExpressionString (2, 0));
}} else if (Clazz.instanceOf (expr, Array)) {
var bs = this.atomExpression (expr, 0, 0, true, false, null, false);
return (asVariable ? JS.SV.newV (10, bs) : bs);
} else if (Clazz.instanceOf (expr, Array)) {
this.setStatement ((expr)[0], 1);
return (asVariable ? this.parameterExpressionList (0, -1, false).get (0) : this.parameterExpressionString (0, -1));
}} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
JU.Logger.error ("Error evaluating: " + expr + "\n" + ex);
} else {
throw ex;
}
}
return (asVariable ? JS.SV.getVariable ("ERROR") : "ERROR");
}, "~O,~B,~B");
Clazz.overrideMethod (c$, "checkSelect", 
function (h, where) {
var ok = false;
try {
this.pushContext (null, "checkSelect");
ok = this.parameterExpressionSelect (h, where);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
JU.Logger.error ("checkSelect " + ex);
} else {
throw ex;
}
}
this.popContext (false, false);
return ok;
}, "java.util.Map,~A");
Clazz.overrideMethod (c$, "getAtomBitSet", 
function (atomExpression) {
if (Clazz.instanceOf (atomExpression, JU.BS)) return atomExpression;
var bs =  new JU.BS ();
var executing = this.executing;
try {
this.pushContext (null, "getAtomBitSet");
var scr = "select (" + atomExpression + ")";
scr = JU.PT.replaceAllCharacters (scr, "\n\r", "),(");
scr = JU.PT.rep (scr, "()", "(none)");
if (this.compileScript (null, scr, false)) {
this.st = this.aatoken[0];
this.setStatement (this.st, 0);
bs = this.atomExpression (this.st, 1, 0, false, false, null, true);
}this.popContext (false, false);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
JU.Logger.error ("getAtomBitSet " + atomExpression + "\n" + ex);
} else {
throw ex;
}
}
this.executing = executing;
return bs;
}, "~O");
Clazz.defineMethod (c$, "compileScript", 
function (filename, strScript, debugCompiler) {
this.scriptFileName = filename;
strScript = this.fixScriptPath (strScript, filename);
this.restoreScriptContext (this.compiler.compile (filename, strScript, false, false, debugCompiler && JU.Logger.debugging, false), false, false, false);
this.$isStateScript = this.compiler.isStateScript;
this.forceNoAddHydrogens = (this.$isStateScript && this.script.indexOf ("pdbAddHydrogens") < 0);
var s = this.script;
this.pc = this.setScriptExtensions ();
if (!this.chk && this.vwr.scriptEditorVisible && strScript.indexOf ("\u0001## EDITOR_IGNORE ##") < 0) this.vwr.scriptStatus ("");
this.script = s;
return !this.$error;
}, "~S,~S,~B");
Clazz.defineMethod (c$, "fixScriptPath", 
 function (strScript, filename) {
if (filename != null && strScript.indexOf ("$SCRIPT_PATH$") >= 0) {
var path = filename;
var pt = Math.max (filename.lastIndexOf ("|"), filename.lastIndexOf ("/"));
path = path.substring (0, pt + 1);
strScript = JU.PT.rep (strScript, "$SCRIPT_PATH$/", path);
strScript = JU.PT.rep (strScript, "$SCRIPT_PATH$", path);
}return strScript;
}, "~S,~S");
Clazz.defineMethod (c$, "setScriptExtensions", 
 function () {
var extensions = this.scriptExtensions;
if (extensions == null) return 0;
var pt = extensions.indexOf ("##SCRIPT_STEP");
if (pt >= 0) {
this.executionStepping = true;
}pt = extensions.indexOf ("##SCRIPT_START=");
if (pt < 0) return 0;
pt = JU.PT.parseInt (extensions.substring (pt + 15));
if (pt == -2147483648) return 0;
for (this.pc = 0; this.pc < this.lineIndices.length; this.pc++) {
if (this.lineIndices[this.pc][0] > pt || this.lineIndices[this.pc][1] >= pt) break;
}
if (this.pc > 0 && this.pc < this.lineIndices.length && this.lineIndices[this.pc][0] > pt) --this.pc;
return this.pc;
});
Clazz.defineMethod (c$, "compileScriptFileInternal", 
 function (filename, localPath, remotePath, scriptPath) {
if (filename.toLowerCase ().indexOf ("javascript:") == 0) return this.compileScript (filename, this.vwr.jsEval (filename.substring (11)), this.debugScript);
var data =  new Array (2);
data[0] = filename;
if (!this.vwr.fm.getFileDataAsString (data, -1, false, true, false)) {
this.setErrorMessage ("io error reading " + data[0] + ": " + data[1]);
return false;
}var movieScript = "";
if (("\n" + data[1]).indexOf ("\nJmolManifest.txt\n") >= 0) {
var path;
if (filename.endsWith (".all.pngj") || filename.endsWith (".all.png")) {
path = "|state.spt";
filename += "|";
} else {
if (data[1].indexOf ("movie.spt") >= 0) {
data[0] = filename + "|movie.spt";
if (this.vwr.fm.getFileDataAsString (data, -1, false, true, false)) {
movieScript = data[1];
}}filename += "|JmolManifest.txt";
data[0] = filename;
if (!this.vwr.fm.getFileDataAsString (data, -1, false, true, false)) {
this.setErrorMessage ("io error reading " + data[0] + ": " + data[1]);
return false;
}path = JV.FileManager.getManifestScriptPath (data[1]);
}if (path != null && path.length > 0) {
data[0] = filename = filename.substring (0, filename.lastIndexOf ("|")) + path;
if (!this.vwr.fm.getFileDataAsString (data, -1, false, true, false)) {
this.setErrorMessage ("io error reading " + data[0] + ": " + data[1]);
return false;
}}if (filename.endsWith ("|state.spt")) {
this.vwr.g.setO ("_pngjFile", filename.substring (0, filename.length - 10) + "?");
}}this.scriptFileName = filename;
data[1] = JV.FileManager.getEmbeddedScript (data[1]);
var script = this.fixScriptPath (data[1], data[0]);
if (scriptPath == null) {
scriptPath = this.vwr.fm.getFilePath (filename, false, false);
scriptPath = scriptPath.substring (0, Math.max (scriptPath.lastIndexOf ("|"), scriptPath.lastIndexOf ("/")));
}script = JV.FileManager.setScriptFileReferences (script, localPath, remotePath, scriptPath);
return this.compileScript (filename, script + movieScript, this.debugScript);
}, "~S,~S,~S,~S");
Clazz.overrideMethod (c$, "evalFunctionFloat", 
function (func, params, values) {
try {
var p = params;
for (var i = 0; i < values.length; i++) p.get (i).value = Float.$valueOf (values[i]);

var f = func;
return JS.SV.fValue (this.runFunctionAndRet (f, f.name, p, null, true, false, false));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return NaN;
} else {
throw e;
}
}
}, "~O,~O,~A");
Clazz.defineMethod (c$, "getUserFunctionResult", 
function (name, params, tokenAtom) {
return this.runFunctionAndRet (null, name, params, tokenAtom, true, true, false);
}, "~S,JU.Lst,JS.SV");
Clazz.defineMethod (c$, "runFunctionAndRet", 
 function ($function, name, params, tokenAtom, getReturn, setContextPath, allowThreads) {
if ($function == null) {
name = name.toLowerCase ();
$function = this.vwr.getFunction (name);
if ($function == null) return null;
if (setContextPath) this.contextPath += " >> function " + name;
} else if (setContextPath) {
this.contextPath += " >> " + name;
}this.pushContext (null, "runFunctionAndRet ");
if (this.allowJSThreads) this.setAllowJSThreads (allowThreads);
var isTry = ($function.getTok () == 364558);
this.thisContext.isTryCatch = isTry;
this.thisContext.isFunction = !isTry;
this.functionName = name;
if (isTry) {
this.resetError ();
this.thisContext.displayLoadErrorsSave = this.vwr.displayLoadErrors;
this.thisContext.tryPt = ++this.vwr.tryPt;
this.vwr.displayLoadErrors = false;
this.restoreFunction ($function, params, tokenAtom);
this.contextVariables.put ("_breakval", JS.SV.newI (2147483647));
this.contextVariables.put ("_errorval", JS.SV.newS (""));
var cv = this.contextVariables;
this.executeCommands (true, false);
while (this.thisContext.tryPt > this.vwr.tryPt) this.popContext (false, false);

this.processTry (cv);
return null;
} else if (Clazz.instanceOf ($function, J.api.JmolParallelProcessor)) {
{
this.parallelProcessor = $function;
this.restoreFunction ($function, params, tokenAtom);
this.dispatchCommands (false, true, false);
($function).runAllProcesses (this.vwr);
}} else {
this.restoreFunction ($function, params, tokenAtom);
this.dispatchCommands (false, true, false);
}var v = (getReturn ? this.getContextVariableAsVariable ("_retval", false) : null);
this.popContext (false, false);
return v;
}, "J.api.JmolScriptFunction,~S,JU.Lst,JS.SV,~B,~B,~B");
Clazz.defineMethod (c$, "processTry", 
 function (cv) {
this.vwr.displayLoadErrors = this.thisContext.displayLoadErrorsSave;
this.popContext (false, false);
var err = this.vwr.getP ("_errormessage");
if (err.length > 0) {
cv.put ("_errorval", JS.SV.newS (err));
this.resetError ();
}cv.put ("_tryret", cv.get ("_retval"));
var ret = cv.get ("_tryret");
if (ret.value != null || ret.intValue != 2147483647) {
this.cmdReturn (ret);
return;
}var errMsg = (cv.get ("_errorval")).value;
if (errMsg.length == 0) {
var iBreak = (cv.get ("_breakval")).intValue;
if (iBreak != 2147483647) {
this.breakAt (this.pc - iBreak);
return;
}}if (this.pc + 1 < this.aatoken.length && this.aatoken[this.pc + 1][0].tok == 102412) {
var ct = this.aatoken[this.pc + 1][0];
if (ct.contextVariables != null && ct.name0 != null) ct.contextVariables.put (ct.name0, JS.SV.newS (errMsg));
ct.intValue = (errMsg.length > 0 ? 1 : -1) * Math.abs (ct.intValue);
}}, "java.util.Map");
Clazz.defineMethod (c$, "breakAt", 
 function (pt) {
if (pt < 0) {
this.getContextVariableAsVariable ("_breakval", false).intValue = -pt;
this.pcEnd = this.pc;
return;
}var ptEnd = Math.abs (this.aatoken[pt][0].intValue);
var tok = this.aatoken[pt][0].tok;
if (tok == 102411 || tok == 102413) {
this.theToken = this.aatoken[ptEnd--][0];
var ptNext = Math.abs (this.theToken.intValue);
if (this.theToken.tok != 102409) this.theToken.intValue = -ptNext;
} else {
this.pc = -1;
while (this.pc != pt && this.thisContext != null) {
while (this.thisContext != null && !JS.ScriptCompiler.isBreakableContext (this.thisContext.token.tok)) this.popContext (true, false);

this.pc = this.thisContext.pc;
this.popContext (true, false);
}
}this.pc = ptEnd;
}, "~N");
Clazz.defineMethod (c$, "restoreFunction", 
 function (f, params, tokenAtom) {
var $function = f;
this.aatoken = $function.aatoken;
this.lineNumbers = $function.lineNumbers;
this.lineIndices = $function.lineIndices;
this.script = $function.script;
this.pc = 0;
if ($function.names != null) {
this.contextVariables =  new java.util.Hashtable ();
$function.setVariables (this.contextVariables, params);
}if (tokenAtom != null) this.contextVariables.put ("_x", tokenAtom);
}, "J.api.JmolScriptFunction,JU.Lst,JS.SV");
Clazz.defineMethod (c$, "clearDefinedVariableAtomSets", 
function () {
this.vwr.definedAtomSets.remove ("# variable");
});
Clazz.defineMethod (c$, "defineSets", 
 function () {
if (!this.vwr.definedAtomSets.containsKey ("# static")) {
for (var i = 0; i < JV.JC.predefinedStatic.length; i++) this.defineAtomSet (JV.JC.predefinedStatic[i]);

this.defineAtomSet ("# static");
}if (this.vwr.definedAtomSets.containsKey ("# variable")) return;
for (var i = 0; i < JV.JC.predefinedVariable.length; i++) this.defineAtomSet (JV.JC.predefinedVariable[i]);

for (var i = JU.Elements.elementNumberMax; --i >= 0; ) {
var definition = " elemno=" + i;
this.defineAtomSet ("@" + JU.Elements.elementNameFromNumber (i) + definition);
this.defineAtomSet ("@_" + JU.Elements.elementSymbolFromNumber (i) + definition);
}
for (var i = 4; --i >= 0; ) {
var definition = "@" + JU.Elements.altElementNameFromIndex (i) + " _e=" + JU.Elements.altElementNumberFromIndex (i);
this.defineAtomSet (definition);
}
for (var i = JU.Elements.altElementMax; --i >= 4; ) {
var ei = JU.Elements.altElementNumberFromIndex (i);
var def = " _e=" + ei;
var definition = "@_" + JU.Elements.altElementSymbolFromIndex (i);
this.defineAtomSet (definition + def);
definition = "@_" + JU.Elements.altIsotopeSymbolFromIndex (i);
this.defineAtomSet (definition + def);
definition = "@_" + JU.Elements.altIsotopeSymbolFromIndex2 (i);
this.defineAtomSet (definition + def);
definition = "@" + JU.Elements.altElementNameFromIndex (i);
if (definition.length > 1) this.defineAtomSet (definition + def);
var e = JU.Elements.getElementNumber (ei);
ei = JU.Elements.getNaturalIsotope (e);
if (ei > 0) {
def = JU.Elements.elementSymbolFromNumber (e);
this.defineAtomSet ("@_" + def + ei + " _e=" + e);
this.defineAtomSet ("@_" + ei + def + " _e=" + e);
}}
this.defineAtomSet ("# variable");
});
Clazz.defineMethod (c$, "defineAtomSet", 
 function (script) {
if (script.indexOf ("#") == 0) {
this.vwr.definedAtomSets.put (script, Boolean.TRUE);
return;
}var sc = this.compiler.compile ("#predefine", script, true, false, false, false);
if (sc.errorType != null) {
this.vwr.scriptStatus ("JmolConstants.java ERROR: predefined set compile error:" + script + "\ncompile error:" + sc.errorMessageUntranslated);
return;
}if (sc.getTokenCount () != 1) {
this.vwr.scriptStatus ("JmolConstants.java ERROR: predefinition does not have exactly 1 command:" + script);
return;
}var statement = sc.getToken (0);
if (statement.length <= 2) {
this.vwr.scriptStatus ("JmolConstants.java ERROR: bad predefinition length:" + script);
return;
}var tok = statement[1].tok;
if (!JS.T.tokAttr (tok, 1073741824) && !JS.T.tokAttr (tok, 2097152)) {
this.vwr.scriptStatus ("JmolConstants.java ERROR: invalid variable name:" + script);
return;
}var name = (statement[1].value).toLowerCase ();
if (name.startsWith ("dynamic_")) name = "!" + name.substring (8);
this.vwr.definedAtomSets.put (name, statement);
}, "~S");
Clazz.defineMethod (c$, "lookupIdentifierValue", 
function (identifier) {
var bs = this.lookupValue (identifier, false);
if (bs != null) return JU.BSUtil.copy (bs);
bs = this.getAtomBits (1073741824, identifier);
return (bs == null ?  new JU.BS () : bs);
}, "~S");
Clazz.defineMethod (c$, "lookupValue", 
 function (setName, plurals) {
if (this.chk) {
return  new JU.BS ();
}this.defineSets ();
setName = setName.toLowerCase ();
var value = this.vwr.definedAtomSets.get (setName);
var isDynamic = false;
if (value == null) {
value = this.vwr.definedAtomSets.get ("!" + setName);
isDynamic = (value != null);
}if (Clazz.instanceOf (value, JU.BS)) return value;
if (Clazz.instanceOf (value, Array)) {
this.pushContext (null, "lookupValue");
var bs = this.atomExpression (value, -2, 0, true, false, null, true);
this.popContext (false, false);
if (!isDynamic) this.vwr.definedAtomSets.put (setName, bs);
return bs;
}if (setName.equals ("water")) {
var bs = this.vwr.ms.getAtoms (1612709912, null);
if (!isDynamic) this.vwr.definedAtomSets.put (setName, bs);
return bs;
}if (plurals) return null;
var len = setName.length;
if (len < 5) return null;
if (setName.charAt (len - 1) != 's') return null;
if (setName.endsWith ("ies")) setName = setName.substring (0, len - 3) + 'y';
 else setName = setName.substring (0, len - 1);
return this.lookupValue (setName, true);
}, "~S,~B");
Clazz.overrideMethod (c$, "deleteAtomsInVariables", 
function (bsDeleted) {
for (var entry, $entry = this.vwr.definedAtomSets.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var value = entry.getValue ();
if (Clazz.instanceOf (value, JU.BS)) {
JU.BSUtil.deleteBits (value, bsDeleted);
if (!entry.getKey ().startsWith ("!")) this.vwr.g.setUserVariable ("@" + entry.getKey (), JS.SV.newV (10, value));
}}
}, "JU.BS");
Clazz.overrideMethod (c$, "getThisContext", 
function () {
return this.thisContext;
});
Clazz.defineMethod (c$, "clearState", 
 function (tQuiet) {
this.thisContext = null;
this.scriptLevel = 0;
this.setErrorMessage (null);
this.contextPath = "";
this.tQuiet = tQuiet;
}, "~B");
Clazz.overrideMethod (c$, "pushContextDown", 
function (why) {
this.scriptLevel--;
this.pushContext2 (null, why);
}, "~S");
Clazz.defineMethod (c$, "pushContext", 
 function (token, why) {
if (this.scriptLevel == JS.ScriptEval.contextDepthMax) this.error (44);
this.pushContext2 (token, why);
}, "JS.ContextToken,~S");
Clazz.defineMethod (c$, "pushContext2", 
 function (token, why) {
this.thisContext = this.getScriptContext (why);
this.thisContext.token = token;
if (token == null) {
this.scriptLevel = ++this.thisContext.scriptLevel;
} else {
this.thisContext.scriptLevel = -1;
this.contextVariables =  new java.util.Hashtable ();
if (token.contextVariables != null) for (var key, $key = token.contextVariables.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) JS.ScriptCompiler.addContextVariable (this.contextVariables, key);

}if (this.debugHigh || this.isCmdLine_c_or_C_Option) JU.Logger.info ("-->>----------------------".substring (0, Math.min (15, this.scriptLevel + 5)) + this.scriptLevel + " " + this.scriptFileName + " " + token + " " + this.thisContext.id + " " + why + " path=" + this.thisContext.contextPath);
}, "JS.ContextToken,~S");
Clazz.overrideMethod (c$, "getScriptContext", 
function (why) {
var context =  new JS.ScriptContext ();
if (this.debugHigh) JU.Logger.info ("creating context " + context.id + " for " + why + " path=" + this.contextPath);
context.scriptLevel = this.scriptLevel;
context.parentContext = this.thisContext;
context.contextPath = this.contextPath;
context.scriptFileName = this.scriptFileName;
context.parallelProcessor = this.parallelProcessor;
context.functionName = this.functionName;
context.script = this.script;
context.lineNumbers = this.lineNumbers;
context.lineIndices = this.lineIndices;
context.saveTokens (this.aatoken);
context.statement = this.st;
context.statementLength = this.slen;
context.pc = context.pc0 = this.pc;
context.lineEnd = this.lineEnd;
context.pcEnd = this.pcEnd;
context.iToken = this.iToken;
context.theToken = this.theToken;
context.theTok = this.theTok;
context.outputBuffer = this.outputBuffer;
context.vars = this.contextVariables;
context.isStateScript = this.$isStateScript;
context.errorMessage = this.errorMessage;
context.errorType = this.errorType;
context.iCommandError = this.iCommandError;
context.chk = this.chk;
context.executionStepping = this.executionStepping;
context.executionPaused = this.executionPaused;
context.scriptExtensions = this.scriptExtensions;
context.mustResumeEval = this.mustResumeEval;
context.allowJSThreads = this.allowJSThreads;
return context;
}, "~S");
Clazz.defineMethod (c$, "popContext", 
function (isFlowCommand, statementOnly) {
if (this.thisContext == null) return;
if (this.thisContext.scriptLevel > 0) this.scriptLevel = this.thisContext.scriptLevel - 1;
var scTemp = (isFlowCommand ? this.getScriptContext ("popFlow") : null);
this.restoreScriptContext (this.thisContext, true, isFlowCommand, statementOnly);
if (scTemp != null) this.restoreScriptContext (scTemp, true, false, true);
if (this.debugHigh || this.isCmdLine_c_or_C_Option) JU.Logger.info ("--<<------------".substring (0, Math.min (15, this.scriptLevel + 5)) + (this.scriptLevel + 1) + " " + this.scriptFileName + " isFlow " + isFlowCommand + " thisContext=" + (this.thisContext == null ? "" : "" + this.thisContext.id) + " pc=" + this.pc + "-->" + this.pc + " path=" + (this.thisContext == null ? "" : this.thisContext.contextPath));
}, "~B,~B");
Clazz.defineMethod (c$, "restoreScriptContext", 
function (context, isPopContext, isFlowCommand, statementOnly) {
this.executing = !this.chk;
if (context == null) return;
if (!isFlowCommand) {
this.st = context.statement;
this.slen = context.statementLength;
this.pc = context.pc;
this.lineEnd = context.lineEnd;
this.pcEnd = context.pcEnd;
if (statementOnly) return;
}this.mustResumeEval = context.mustResumeEval;
this.script = context.script;
this.lineNumbers = context.lineNumbers;
this.lineIndices = context.lineIndices;
this.aatoken = context.restoreTokens ();
this.contextVariables = context.vars;
this.scriptExtensions = context.scriptExtensions;
if (isPopContext) {
this.contextPath = context.contextPath;
var pt = (this.contextPath == null ? -1 : this.contextPath.indexOf (" >> "));
if (pt >= 0) this.contextPath = this.contextPath.substring (0, pt);
this.scriptFileName = context.scriptFileName;
this.parallelProcessor = context.parallelProcessor;
this.functionName = context.functionName;
this.iToken = context.iToken;
this.theToken = context.theToken;
this.theTok = context.theTok;
this.outputBuffer = context.outputBuffer;
this.$isStateScript = context.isStateScript;
this.thisContext = context.parentContext;
this.allowJSThreads = context.allowJSThreads;
if (this.debugHigh || this.isCmdLine_c_or_C_Option) JU.Logger.info ("--r------------".substring (0, Math.min (15, this.scriptLevel + 5)) + this.scriptLevel + " " + this.scriptFileName + " isPop " + isPopContext + " isFlow " + isFlowCommand + " context.id=" + context.id + " pc=" + this.pc + "-->" + context.pc + " " + this.contextPath);
} else {
this.$error = (context.errorType != null);
this.errorMessage = context.errorMessage;
this.errorMessageUntranslated = context.errorMessageUntranslated;
this.iCommandError = context.iCommandError;
this.errorType = context.errorType;
}}, "JS.ScriptContext,~B,~B,~B");
Clazz.defineMethod (c$, "setException", 
function (sx, msg, untranslated) {
sx.untranslated = (untranslated == null ? msg : untranslated);
var isThrown = "!".equals (untranslated);
this.errorType = msg;
this.iCommandError = this.pc;
if (sx.message == null) {
sx.message = "";
return;
}var s = JS.ScriptEval.getContextTrace (this.vwr, this.getScriptContext ("setException"), null, true).toString ();
while (this.thisContext != null && !this.thisContext.isTryCatch) this.popContext (false, false);

if (sx.message.indexOf (s) < 0) {
sx.message += s;
sx.untranslated += s;
}this.resumeViewer (isThrown ? "throw context" : "scriptException");
if (isThrown || this.thisContext != null || this.chk || msg.indexOf ("NOTE: file recognized as a script file: ") >= 0) return;
JU.Logger.error ("eval ERROR: " + s + "\n" + this.toString ());
if (this.vwr.autoExit) this.vwr.exitJmol ();
}, "JS.ScriptException,~S,~S");
c$.statementAsString = Clazz.defineMethod (c$, "statementAsString", 
function (vwr, statement, iTok, doLogMessages) {
if (statement.length == 0) return "";
var sb =  new JU.SB ();
var tok = statement[0].tok;
switch (tok) {
case 0:
return statement[0].value;
case 102409:
if (statement.length == 2 && (statement[1].tok == 134320141 || statement[1].tok == 102436)) return ((statement[1].value)).toString ();
}
var useBraces = true;
var inBrace = false;
var inClauseDefine = false;
var setEquals = (statement.length > 1 && tok == 36867 && statement[0].value.equals ("") && (statement[0].intValue == 61 || statement[0].intValue == 35) && statement[1].tok != 1073742325);
var len = statement.length;
for (var i = 0; i < len; ++i) {
var token = statement[i];
if (token == null) {
len = i;
break;
}if (iTok == i - 1) sb.append (" <<");
if (i != 0) sb.appendC (' ');
if (i == 2 && setEquals) {
if ((setEquals = (token.tok != 268435860)) || statement[0].intValue == 35) {
sb.append (setEquals ? "= " : "== ");
if (!setEquals) continue;
}}if (iTok == i && token.tok != 1073742326) sb.append ("<<<<");
switch (token.tok) {
case 1073742325:
if (useBraces) sb.append ("{");
continue;
case 1073742326:
if (inClauseDefine && i == statement.length - 1) useBraces = false;
if (useBraces) sb.append ("}");
continue;
case 268435520:
case 268435521:
break;
case 1073742332:
case 1073742338:
inBrace = (token.tok == 1073742332);
break;
case 12290:
if (i > 0 && (token.value).equals ("define")) {
sb.append ("@");
if (i + 1 < statement.length && statement[i + 1].tok == 1073742325) {
if (!useBraces) inClauseDefine = true;
useBraces = true;
}continue;
}break;
case 1073742335:
sb.append ("true");
continue;
case 1073742334:
sb.append ("false");
continue;
case 1275082245:
break;
case 2:
sb.appendI (token.intValue);
continue;
case 8:
case 9:
case 10:
sb.append (JS.SV.sValue (token));
continue;
case 6:
if (Boolean.TRUE === (token.value).get ("$_BINARY_$")) {
sb.append ("<BINARY DATA>");
continue;
}case 7:
sb.append ((token).escape ());
continue;
case 5:
sb.appendC ('^');
continue;
case 1073742363:
if (token.intValue != 2147483647) sb.appendI (token.intValue);
 else sb.append (JM.Group.getSeqcodeStringFor (JS.ScriptExpr.getSeqCode (token)));
token = statement[++i];
sb.appendC (' ');
sb.append (inBrace ? "-" : "- ");
case 1073742362:
if (token.intValue != 2147483647) sb.appendI (token.intValue);
 else sb.append (JM.Group.getSeqcodeStringFor (JS.ScriptExpr.getSeqCode (token)));
continue;
case 1073742357:
sb.append ("*:");
sb.append (vwr.getChainIDStr (token.intValue));
continue;
case 1073742355:
sb.append ("*%");
if (token.value != null) sb.append (token.value.toString ());
continue;
case 1073742358:
sb.append ("*/");
case 1073742359:
case 3:
if (token.intValue < 2147483647) {
sb.append (JU.Escape.escapeModelFileNumber (token.intValue));
} else {
sb.append ("" + token.value);
}continue;
case 1073742361:
sb.appendC ('[');
var ptr = token.intValue * 6 + 1;
sb.append (JM.Group.standardGroupList.substring (ptr, ptr + 3).trim ());
sb.appendC (']');
continue;
case 1073742360:
sb.appendC ('[');
sb.appendO (token.value);
sb.appendC (']');
continue;
case 1073742356:
sb.append ("*.");
break;
case 1094713349:
if (Clazz.instanceOf (token.value, JU.P3)) {
var pt = token.value;
sb.append ("cell=").append (JU.Escape.eP (pt));
continue;
}break;
case 4:
sb.append ("\"").appendO (token.value).append ("\"");
continue;
case 268435860:
case 268435858:
case 268435857:
case 268435856:
case 268435859:
case 268435861:
if (token.intValue == 1715472409) {
sb.append (statement[++i].value).append (" ");
} else if (token.intValue != 2147483647) sb.append (JS.T.nameOf (token.intValue)).append (" ");
break;
case 364558:
continue;
case 102409:
sb.append ("end");
continue;
default:
if (JS.T.tokAttr (token.tok, 1073741824) || !doLogMessages) break;
sb.appendC ('\n').append (token.toString ()).appendC ('\n');
continue;
}
if (token.value != null) sb.append (token.value.toString ());
}
return sb.toString ();
}, "JV.Viewer,~A,~N,~B");
Clazz.overrideMethod (c$, "setObjectPropSafe", 
function (id, tokCommand) {
try {
return this.setObjectProp (id, tokCommand, -1);
} catch (e) {
if (Clazz.exceptionOf (e, JS.ScriptException)) {
return null;
} else {
throw e;
}
}
}, "~S,~N");
Clazz.defineMethod (c$, "setAtomProp", 
function (prop, value, bs) {
this.setShapePropertyBs (0, prop, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "restrictSelected", 
function (isBond, doInvert) {
if (!this.chk) this.sm.restrictSelected (isBond, doInvert);
}, "~B,~B");
Clazz.defineMethod (c$, "showString", 
function (str) {
this.showStringPrint (str, false);
}, "~S");
Clazz.overrideMethod (c$, "showStringPrint", 
function (s, mustDo) {
if (this.chk || s == null) return;
if (this.outputBuffer == null) this.vwr.showString (s, mustDo);
 else this.appendBuffer (s, mustDo);
}, "~S,~B");
Clazz.defineMethod (c$, "report", 
function (s, isError) {
if (this.chk) return;
if (this.outputBuffer == null) this.vwr.scriptStatus (s);
 else this.appendBuffer (s, isError);
}, "~S,~B");
Clazz.defineMethod (c$, "appendBuffer", 
 function (str, mustDo) {
if (mustDo || this.isFuncReturn || JU.Logger.isActiveLevel (4)) this.outputBuffer.append (str).appendC ('\n');
}, "~S,~B");
Clazz.defineMethod (c$, "addProcess", 
 function (vProcess, pc, pt) {
if (this.parallelProcessor == null) return;
var statements =  new Array (pt);
for (var i = 0; i < vProcess.size (); i++) statements[i + 1 - pc] = vProcess.get (i);

var context = this.getScriptContext ("addProcess");
context.saveTokens (statements);
context.pc = 1 - pc;
context.pcEnd = pt;
this.parallelProcessor.addProcess ("p" + (++JS.ScriptEval.iProcess), context);
}, "JU.Lst,~N,~N");
Clazz.defineMethod (c$, "checkContinue", 
 function () {
if (this.executionStopped) return false;
if (this.executionStepping && this.isCommandDisplayable (this.pc)) {
this.vwr.scriptStatusMsg ("Next: " + this.getNextStatement (), "stepping -- type RESUME to continue");
this.executionPaused = true;
} else if (!this.executionPaused) {
return true;
}if (JU.Logger.debugging) {
JU.Logger.debug ("script execution paused at command " + (this.pc + 1) + " level " + this.scriptLevel + ": " + this.thisCommand);
}this.refresh (false);
while (this.executionPaused) {
this.vwr.popHoldRepaint ("pause \u0001## REPAINT_IGNORE ##");
var script = this.vwr.getInsertedCommand ();
if (script.length > 0) {
this.resumePausedExecution ();
this.setErrorMessage (null);
var scSave = this.getScriptContext ("script insertion");
this.pc--;
try {
this.runScript (script);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
this.setErrorMessage ("" + e);
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
this.setErrorMessage ("" + er);
}
} else {
throw e$$;
}
}
if (this.$error) {
this.report (this.errorMessage, true);
this.setErrorMessage (null);
}this.restoreScriptContext (scSave, true, false, false);
this.pauseExecution (false);
}this.doDelay (-100);
this.vwr.pushHoldRepaintWhy ("pause");
}
this.notifyResumeStatus ();
return !this.$error && !this.executionStopped;
});
Clazz.defineMethod (c$, "delayScript", 
function (millis) {
if (this.vwr.autoExit) return;
this.stopScriptThreads ();
if (this.vwr.captureParams != null && millis > 0) {
this.vwr.captureParams.put ("captureDelayMS", Integer.$valueOf (millis));
}this.scriptDelayThread =  new JS.ScriptDelayThread (this, this.vwr, millis);
this.scriptDelayThread.run ();
}, "~N");
Clazz.defineMethod (c$, "doDelay", 
 function (millis) {
if (!this.useThreads ()) return;
if (this.isJS) throw  new JS.ScriptInterruption (this, "delay", millis);
this.delayScript (millis);
}, "~N");
Clazz.overrideMethod (c$, "evalParallel", 
function (context, shapeManager) {
return this.getCmdExt ().evalParallel (context, shapeManager);
}, "JS.ScriptContext,JV.ShapeManager");
Clazz.defineMethod (c$, "isCommandDisplayable", 
 function (i) {
if (i >= this.aatoken.length || i >= this.pcEnd || this.aatoken[i] == null) return false;
return (this.lineIndices[i][1] > this.lineIndices[i][0]);
}, "~N");
Clazz.overrideMethod (c$, "loadFileResourceAsync", 
function (fileName) {
this.loadFileAsync (null, fileName, -Math.abs (fileName.hashCode ()), false);
}, "~S");
Clazz.defineMethod (c$, "loadFileAsync", 
function (prefix, filename, i, doClear) {
if (this.vwr.fm.cacheGet (filename, false) != null) return filename;
if (prefix != null) prefix = "cache://local" + prefix;
var key = this.pc + "_" + i + "_" + filename;
var cacheName;
if (this.thisContext == null) {
this.pushContext (null, "loadFileAsync");
}if (this.thisContext.htFileCache == null) {
this.thisContext.htFileCache =  new java.util.Hashtable ();
}cacheName = this.thisContext.htFileCache.get (key);
if (cacheName != null && cacheName.length > 0) {
this.fileLoadThread = null;
this.vwr.queueOnHold = false;
if ("#CANCELED#".equals (cacheName) || "#CANCELED#".equals (this.vwr.fm.cacheGet (cacheName, false))) this.evalError ("#CANCELED#", null);
return cacheName;
}this.thisContext.htFileCache.put (key, cacheName = prefix + System.currentTimeMillis ());
if (doClear) this.vwr.cacheFileByName (prefix + "*", false);
this.fileLoadThread =  new JS.FileLoadThread (this, this.vwr, filename, key, cacheName);
if (this.vwr.testAsync) this.fileLoadThread.start ();
 else this.fileLoadThread.run ();
if (i < 0) this.fileLoadThread = null;
throw  new JS.ScriptInterruption (this, "load", 1);
}, "~S,~S,~N,~B");
Clazz.defineMethod (c$, "logLoadInfo", 
 function (msg) {
if (msg.length > 0) JU.Logger.info (msg);
var sb =  new JU.SB ();
var modelCount = this.vwr.ms.mc;
if (modelCount > 1) sb.append ((this.vwr.am.isMovie ? this.vwr.am.getFrameCount () + " frames" : modelCount + " models") + "\n");
for (var i = 0; i < modelCount; i++) {
var moData = this.vwr.ms.getInfo (i, "moData");
if (moData == null || !moData.containsKey ("mos")) continue;
sb.appendI ((moData.get ("mos")).size ()).append (" molecular orbitals in model ").append (this.vwr.getModelNumberDotted (i)).append ("\n");
}
if (sb.length () > 0) this.vwr.showString (sb.toString (), false);
}, "~S");
Clazz.overrideMethod (c$, "notifyResumeStatus", 
function () {
if (!this.chk && !this.executionStopped && !this.executionStepping && !this.executionPaused) {
this.vwr.scriptStatus ("script execution " + (this.$error || this.executionStopped ? "interrupted" : "resumed"));
}if (JU.Logger.debugging) JU.Logger.debug ("script execution resumed");
});
Clazz.defineMethod (c$, "refresh", 
function (doDelay) {
if (this.chk) return;
this.vwr.setTainted (true);
this.vwr.requestRepaintAndWait ("refresh cmd");
if (this.isJS && doDelay) this.doDelay (10);
}, "~B");
Clazz.overrideMethod (c$, "stopScriptThreads", 
function () {
if (this.scriptDelayThread != null) {
this.scriptDelayThread.interrupt ();
this.scriptDelayThread = null;
}if (this.fileLoadThread != null) {
this.fileLoadThread.interrupt ();
this.fileLoadThread.resumeEval ();
if (this.thisContext != null) this.popContext (false, false);
this.fileLoadThread = null;
}});
Clazz.defineMethod (c$, "getErrorLineMessage2", 
function () {
return JS.ScriptError.getErrorLineMessage (this.functionName, this.scriptFileName, this.getLinenumber (null), this.pc, JS.ScriptEval.statementAsString (this.vwr, this.st, -9999, this.debugHigh));
});
Clazz.defineMethod (c$, "getLinenumber", 
function (c) {
return (c == null ? this.lineNumbers[this.pc] : c.lineNumbers[c.pc]);
}, "JS.ScriptContext");
Clazz.defineMethod (c$, "dispatchCommands", 
function (isSpt, fromFunc, isTry) {
if (this.sm == null) this.sm = this.vwr.shm;
this.debugScript = this.debugHigh = false;
if (!this.chk) this.setDebugging ();
if (this.pcEnd == 0) this.pcEnd = 2147483647;
if (this.lineEnd == 0) this.lineEnd = 2147483647;
if (this.aatoken == null) return true;
if (!this.tQuiet) {
this.tQuiet = (this.vwr.getInt (536870922) < 0);
}var allowJSInterrupt = (this.isJS && !fromFunc && this.useThreads () && this.vwr.getInt (536870922) >= 0);
this.commandLoop (allowJSInterrupt);
if (this.chk) return true;
var script = this.vwr.getInsertedCommand ();
if (!"".equals (script)) this.runScriptBuffer (script, null, false);
 else if (isSpt && this.debugScript && this.vwr.getBoolean (603979879)) this.vwr.getChimeMessenger ().update (null);
if (!this.mustResumeEval && !allowJSInterrupt || fromFunc) return true;
if (!isTry && this.mustResumeEval || this.thisContext == null) {
var done = (this.thisContext == null);
this.resumeEval (this.thisContext);
this.mustResumeEval = false;
return done;
}return true;
}, "~B,~B,~B");
Clazz.defineMethod (c$, "commandLoop", 
 function (allowJSInterrupt) {
var lastCommand = "";
var isForCheck = false;
var vProcess = null;
var lastTime = System.currentTimeMillis ();
if (this.debugScript && this.debugHigh && !this.chk) {
for (var i = this.pc; i < this.aatoken.length && i < this.pcEnd; i++) {
JU.Logger.info ("Command " + i);
if (this.debugScript) this.logDebugScript (this.aatoken[i], 0);
}
JU.Logger.info ("-----");
}for (; this.pc < this.aatoken.length && this.pc < this.pcEnd; this.pc++) {
if (allowJSInterrupt) {
if (!this.executionPaused && System.currentTimeMillis () - lastTime > 1000) {
this.pc--;
this.doDelay (-1);
}lastTime = System.currentTimeMillis ();
}if (!this.chk && !this.checkContinue ()) break;
if (this.pc >= this.lineNumbers.length || this.lineNumbers[this.pc] > this.lineEnd) break;
if (this.debugHigh) {
var timeBegin = 0;
timeBegin = System.currentTimeMillis ();
this.vwr.scriptStatus ("Eval.dispatchCommands():" + timeBegin);
this.vwr.scriptStatus (this.script);
}if (this.debugScript && !this.chk) JU.Logger.info ("Command " + this.pc + (this.thisContext == null ? "" : " path=" + this.thisContext.contextPath));
this.theToken = (this.aatoken[this.pc].length == 0 ? null : this.aatoken[this.pc][0]);
if (!this.historyDisabled && !this.chk && this.scriptLevel <= JS.ScriptEval.commandHistoryLevelMax && !this.tQuiet) {
var cmdLine = this.getCommand (this.pc, true, true);
if (this.theToken != null && cmdLine.length > 0 && !cmdLine.equals (lastCommand) && (this.theToken.tok == 134320141 || this.theToken.tok == 102436 || !JS.T.tokAttr (this.theToken.tok, 102400))) this.vwr.addCommand (lastCommand = cmdLine);
}if (!this.chk && allowJSInterrupt) {
var script = this.vwr.getInsertedCommand ();
if (!"".equals (script)) this.runScript (script);
}if (!this.setStatement (this.aatoken[this.pc], 1)) {
JU.Logger.info (this.getCommand (this.pc, true, false) + " -- STATEMENT CONTAINING @{} SKIPPED");
continue;
}this.thisCommand = this.getCommand (this.pc, false, true);
if (this.debugHigh || this.debugScript) JU.Logger.info (this.thisCommand);
var nextCommand = this.getCommand (this.pc + 1, false, true);
this.fullCommand = this.thisCommand + (nextCommand.startsWith ("#") ? nextCommand : "");
this.getToken (0);
this.iToken = 0;
if ((this.listCommands || !this.chk && this.scriptLevel > 0) && !this.isJS) {
var milliSecDelay = this.vwr.getInt (536870922);
if (this.listCommands || milliSecDelay > 0) {
if (milliSecDelay > 0) this.delayScript (-milliSecDelay);
this.vwr.scriptEcho ("$[" + this.scriptLevel + "." + this.lineNumbers[this.pc] + "." + (this.pc + 1) + "] " + this.thisCommand);
}}if (vProcess != null && (this.theTok != 102409 || this.slen < 2 || this.st[1].tok != 102439)) {
vProcess.addLast (this.st);
continue;
}if (this.chk) {
if (this.isCmdLine_c_or_C_Option) JU.Logger.info (this.thisCommand);
if (this.slen == 1 && this.st[0].tok != 134320141 && this.st[0].tok != 102436) continue;
} else {
if (this.debugScript) this.logDebugScript (this.st, 0);
if (this.scriptLevel == 0 && this.vwr.g.logCommands) this.vwr.log (this.thisCommand);
if (this.debugHigh && this.theToken != null) JU.Logger.debug (this.theToken.toString ());
}if (this.theToken == null) continue;
var tok = this.theToken.tok;
switch (tok) {
case 36867:
this.cmdSet ();
continue;
case 134320648:
isForCheck = this.cmdFor (tok, isForCheck);
continue;
case 102439:
this.pushContext (this.theToken, "PROCESS");
if (this.parallelProcessor != null) vProcess =  new JU.Lst ();
continue;
default:
if (JS.T.tokAttr (tok, 102400)) {
isForCheck = this.cmdFlow (tok, isForCheck, vProcess);
if (this.theTok == 102439) vProcess = null;
continue;
}this.processCommand (tok);
this.setCursorWait (false);
if (this.executionStepping) {
this.executionPaused = (this.isCommandDisplayable (this.pc + 1));
}}
}
}, "~B");
Clazz.defineMethod (c$, "processCommand", 
 function (tok) {
if (JS.T.tokAttr (this.theToken.tok, 135168)) {
this.processShapeCommand (tok);
return;
}switch (tok) {
case 0:
if (!this.chk && this.vwr.getBoolean (603979879)) this.vwr.getChimeMessenger ().showHash (this.outputBuffer, this.theToken.value);
break;
case 1275335685:
this.pushContext (this.theToken, "PUSH");
break;
case 1275334681:
this.popContext (true, false);
break;
case 268435490:
break;
case 4097:
this.cmdAnimation ();
break;
case 1610616835:
this.cmdBackground (1);
break;
case 4100:
this.cmdBind ();
break;
case 4101:
this.cmdBondorder ();
break;
case 20488:
this.cmdCD ();
break;
case 12289:
this.cmdCenter (1);
break;
case 1765808134:
this.cmdColor ();
break;
case 12290:
this.cmdDefine ();
break;
case 528397:
this.cmdDelay ();
break;
case 12291:
this.cmdDelete ();
break;
case 554176526:
this.cmdSlab (true);
break;
case 1610625028:
this.cmdDisplay (true);
break;
case 266255:
case 266281:
if (this.chk) break;
if (this.pc > 0 && this.theToken.tok == 266255 && !this.vwr.autoExit) {
this.vwr.clearScriptQueue ();
}this.executionStopped = (this.pc > 0 || !this.vwr.g.useScriptQueue);
break;
case 266256:
if (this.chk) return;
if (this.outputBuffer != null) JU.Logger.warn (this.outputBuffer.toString ());
this.vwr.exitJmol ();
break;
case 1228935687:
this.cmdFile ();
break;
case 12293:
this.cmdFixed ();
break;
case 4114:
this.cmdFont (-1, 0);
break;
case 4115:
case 1094717454:
this.cmdModel (1);
break;
case 1073741824:
this.cmdFunc ();
break;
case 1275072526:
this.cmdGetProperty ();
break;
case 20500:
if (this.vwr.headless) break;
this.cmdGoto (true);
break;
case 20482:
this.cmdHelp ();
break;
case 12294:
this.cmdDisplay (false);
break;
case 1613238294:
this.cmdHbond ();
break;
case 1610616855:
this.cmdHistory (1);
break;
case 544771:
this.cmdHover ();
break;
case 266265:
if (!this.chk) this.vwr.initialize (!this.$isStateScript, false);
break;
case 134238732:
this.cmdScript (134238732, null, null);
break;
case 134222849:
this.cmdLoad ();
break;
case 36869:
this.cmdLog ();
break;
case 528411:
this.cmdLoop ();
break;
case 20485:
this.cmdMessage ();
break;
case 4128:
this.cmdMove ();
break;
case 4129:
this.cmdMoveto ();
break;
case 20487:
this.cmdPause ();
break;
case 36865:
this.cmdPrint ();
break;
case 134256131:
this.cmdPrompt ();
break;
case 4139:
case 4165:
this.cmdUndoRedoMove ();
break;
case 266284:
this.refresh (true);
break;
case 4141:
this.cmdReset ();
break;
case 12295:
this.cmdRestrict ();
break;
case 4143:
if (this.slen == 0) {
if (!this.chk) this.resumePausedExecution ();
break;
}case 4142:
this.cmdRestore ();
break;
case 36866:
this.cmdReturn (null);
break;
case 528432:
this.cmdRotate (false, false);
break;
case 4145:
this.cmdRotate (false, true);
break;
case 4146:
this.cmdSave ();
break;
case 134222850:
this.cmdScript (134222850, null, null);
break;
case 1275082245:
this.cmdSelect (1);
break;
case 1611141171:
this.cmdSelectionHalos (1);
break;
case 554176565:
this.cmdSlab (false);
break;
case 1611141175:
this.cmdRotate (true, false);
break;
case 1611141176:
this.cmdSsbond ();
break;
case 266298:
if (this.cmdPause ()) this.stepPausedExecution ();
break;
case 1639976963:
this.cmdStructure ();
break;
case 2109448:
this.cmdSubset ();
break;
case 4156:
this.cmdSync ();
break;
case 36870:
this.cmdThrow ();
break;
case 536875070:
this.cmdTimeout (1);
break;
case 4160:
this.cmdTranslate (false);
break;
case 4162:
this.cmdTranslate (true);
break;
case 4164:
this.cmdUnbind ();
break;
case 36868:
break;
case 4166:
this.cmdVibration ();
break;
case 12297:
this.cmdZap (true);
break;
case 4168:
this.cmdZoom (false);
break;
case 4170:
this.cmdZoom (true);
break;
default:
this.checkExtension (this.theToken.tok);
}
}, "~N");
Clazz.defineMethod (c$, "checkExtension", 
 function (tok) {
switch (tok) {
case 4098:
case 134221829:
case 4102:
case 4103:
case 4105:
case 134221831:
case 1094717448:
case 4106:
case 528395:
case 1613238294:
case 4120:
case 4122:
case 528443:
case 4124:
case 4125:
case 4126:
case 603983903:
case 1275072532:
case 4130:
case 134221834:
case 4131:
case 4133:
case 134221850:
case 4138:
case 134222350:
case 134221856:
this.getCmdExt ().dispatch (tok, false, this.st);
break;
default:
System.out.println (JS.T.nameOf (tok) + " is not a command");
this.error (47);
}
}, "~N");
Clazz.defineMethod (c$, "processShapeCommand", 
 function (tok) {
var iShape = 0;
switch (tok) {
case 1611272194:
iShape = 34;
break;
case 1114249217:
iShape = 9;
break;
case 1678381065:
iShape = 32;
break;
case 1112152066:
iShape = 11;
break;
case 135174:
iShape = 23;
break;
case 134353926:
iShape = 25;
break;
case 135175:
iShape = 17;
break;
case 1112150019:
iShape = 16;
break;
case 135176:
iShape = 22;
break;
case 537022465:
iShape = 31;
break;
case 1112150020:
iShape = 20;
break;
case 1611272202:
iShape = 36;
break;
case 1112150021:
iShape = 19;
break;
case 1112152070:
iShape = 8;
break;
case 135180:
iShape = 24;
break;
case 1825200146:
iShape = 5;
break;
case 135182:
iShape = 26;
break;
case 537006096:
case 1745489939:
iShape = 6;
break;
case 1112152071:
iShape = 13;
break;
case 1073877010:
iShape = 27;
break;
case 1073877011:
iShape = 28;
break;
case 135190:
iShape = 30;
break;
case 135188:
iShape = 29;
break;
case 1275203608:
iShape = 21;
break;
case 1112152073:
iShape = 14;
break;
case 1112152074:
iShape = 15;
break;
case 1112152075:
iShape = 0;
break;
case 1112152076:
iShape = 7;
break;
case 1649022989:
iShape = 12;
break;
case 659482:
iShape = 4;
break;
case 1112152078:
iShape = 10;
break;
case 1814695966:
iShape = 33;
break;
case 135198:
iShape = 18;
break;
case 659488:
iShape = 1;
break;
default:
this.error (47);
}
if (this.sm.getShape (iShape) == null && this.slen == 2) {
switch (this.st[1].tok) {
case 1073742334:
case 12291:
case 1073742333:
return;
}
}switch (tok) {
case 1114249217:
case 1112152066:
case 1112152071:
case 1112152073:
case 1112152074:
case 1649022989:
case 1112152078:
this.setSizeBio (iShape);
return;
case 1112150019:
case 1112150021:
this.cmdDots (iShape);
return;
case 1112152070:
case 1112152075:
case 1112152076:
this.setSize (iShape, (tok == 1112152070 ? -1000.0 : 1));
return;
case 1825200146:
this.cmdLabel (1, null);
return;
case 135198:
this.cmdVector ();
return;
case 659488:
this.cmdWireframe ();
return;
}
switch (tok) {
case 1611272194:
this.cmdAxes (1);
return;
case 1678381065:
this.cmdBoundbox (1);
return;
case 537022465:
this.cmdEcho (1);
return;
case 1611272202:
this.cmdFrank (1);
return;
case 1814695966:
this.cmdUnitcell (1);
return;
case 1112150020:
case 537006096:
case 1745489939:
case 1275203608:
case 659482:
this.getCmdExt ().dispatch (iShape, false, this.st);
return;
case 135174:
case 134353926:
case 135175:
case 135176:
case 135180:
case 135182:
case 1073877010:
case 1073877011:
case 135190:
case 135188:
this.getIsoExt ().dispatch (iShape, false, this.st);
return;
}
}, "~N");
Clazz.defineMethod (c$, "cmdAnimation", 
 function () {
var animate = false;
switch (this.getToken (1).tok) {
case 1073742335:
animate = true;
case 1073742334:
if (!this.chk) this.vwr.setAnimationOn (animate);
break;
case 1073742029:
var morphCount = Clazz.floatToInt (this.floatParameter (2));
if (!this.chk) this.vwr.am.setMorphCount (Math.abs (morphCount));
break;
case 1610625028:
this.iToken = 2;
var bs = (this.tokAt (2) == 1073742327 ? null : this.atomExpressionAt (2));
this.checkLength (this.iToken + 1);
if (!this.chk) this.vwr.setAnimDisplay (bs);
return;
case 4115:
if (this.isArrayParameter (2)) this.setFrameSet (2);
 else this.cmdModel (2);
break;
case 1073742024:
var startDelay = 1;
var endDelay = 1;
if (this.slen > 5) this.bad ();
var animationMode = JS.T.getTokFromName (this.paramAsStr (2));
switch (animationMode) {
case 1073742070:
startDelay = endDelay = 0;
break;
case 528411:
case 1073742082:
break;
default:
this.invArg ();
}
if (this.slen >= 4) {
startDelay = endDelay = this.floatParameter (3);
if (this.slen == 5) endDelay = this.floatParameter (4);
}if (!this.chk) this.vwr.am.setAnimationReplayMode (animationMode, startDelay, endDelay);
break;
case 1073741918:
var i = 2;
var direction = 0;
switch (this.tokAt (i)) {
case 268435616:
direction = -this.intParameter (++i);
break;
case 268435617:
direction = this.intParameter (++i);
break;
case 2:
direction = this.intParameter (i);
break;
default:
this.invArg ();
}
this.checkLength (++i);
if (direction != 1 && direction != -1) this.errorStr2 (35, "-1", "1");
if (!this.chk) this.vwr.am.setAnimationDirection (direction);
break;
case 1073741950:
this.setIntProperty ("animationFps", this.intParameter (this.checkLast (2)));
break;
default:
this.frameControl (1);
}
});
Clazz.defineMethod (c$, "setFrameSet", 
 function (i) {
var frames = this.expandFloatArray (this.floatParameterSet (i, 0, 2147483647), 1);
this.checkLength (this.iToken + 1);
if (this.chk) return;
var movie =  new java.util.Hashtable ();
if (frames.length > 0) movie.put ("frames", frames);
movie.put ("currentFrame", Integer.$valueOf (0));
this.vwr.am.setMovie (movie);
}, "~N");
Clazz.defineMethod (c$, "cmdAxes", 
 function (index) {
var tickInfo = this.tickParamAsStr (index, true, true, false);
index = this.iToken + 1;
var tok = this.tokAt (index);
var type = this.optParameterAsString (index).toLowerCase ();
if (this.slen == index + 1 && JU.PT.isOneOf (type, ";window;unitcell;molecular;")) {
this.setBooleanProperty ("axes" + type, true);
return;
}switch (tok) {
case 1073742066:
this.setFloatProperty ("axisOffset", this.floatParameter (++index));
this.checkLast (this.iToken);
return;
case 12289:
this.setShapeProperty (34, "origin", this.centerParameter (index + 1, null));
this.checkLast (this.iToken);
return;
case 1140850696:
var s = this.stringParameter (index + 1);
if (!JU.PT.isOneOf (s, ";a;b;c;ab;ac;bc;abc;")) s = null;
this.setShapeProperty (34, "type", s);
this.checkLast (this.iToken);
return;
case 1073742138:
this.setFloatProperty ("axesScale", this.floatParameter (this.checkLast (++index)));
return;
case 1825200146:
switch (tok = this.tokAt (index + 1)) {
case 1073742334:
case 1073742335:
this.checkLength (index + 2);
this.setShapeProperty (34, "labels" + (tok == 1073742335 ? "On" : "Off"), null);
return;
}
var sOrigin = null;
switch (this.slen - index) {
case 7:
this.setShapeProperty (34, "labels",  Clazz.newArray (-1, [this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index)]));
break;
case 5:
sOrigin = this.paramAsStr (index + 4);
case 4:
this.setShapeProperty (34, "labels",  Clazz.newArray (-1, [this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index), sOrigin]));
break;
default:
this.bad ();
}
return;
}
if (type.equals ("position")) {
var xyp;
if (this.tokAt (++index) == 1073742334) {
xyp =  new JU.P3 ();
} else {
xyp = this.xypParameter (index);
if (xyp == null) this.invArg ();
index = this.iToken;
}this.setShapeProperty (34, "position", xyp);
return;
}var mad10 = this.getSetAxesTypeMad10 (index);
if (this.chk || mad10 == 2147483647) return;
this.setObjectMad10 (34, "axes", mad10);
if (tickInfo != null) this.setShapeProperty (34, "tickInfo", tickInfo);
}, "~N");
Clazz.defineMethod (c$, "cmdBackground", 
 function (i) {
this.getToken (i);
var argb;
if (this.theTok == 4120) {
var o = null;
switch (this.tokAt (++i)) {
case 15:
case 6:
o = this.getToken (i).value;
break;
default:
var file = this.paramAsStr (this.checkLast (i));
if (this.chk) return;
if (file.equalsIgnoreCase ("none") || file.length == 0) {
this.vwr.setBackgroundImage (null, null);
return;
}o = (file.startsWith (";base64,") ?  new JU.BArray (JU.Base64.decodeBase64 (file)) : file);
}
if (this.vwr.fm.loadImage (o, null, !this.useThreads ())) throw  new JS.ScriptInterruption (this, "backgroundImage", 1);
return;
}if (this.theTok == 1073742333 || this.isColorParam (i)) {
argb = this.getArgbParamLast (i, true);
if (this.chk) return;
this.setObjectArgb ("background", argb);
this.vwr.setBackgroundImage (null, null);
return;
}var iShape = this.getShapeType (this.theTok);
this.colorShape (iShape, i + 1, true);
}, "~N");
Clazz.defineMethod (c$, "cmdBind", 
 function () {
var mouseAction = this.stringParameter (1);
var name = this.paramAsStr (2);
this.checkLength (3);
if (!this.chk) this.vwr.bindAction (mouseAction, name);
});
Clazz.defineMethod (c$, "cmdBondorder", 
 function () {
this.checkLength (-3);
var order = 0;
switch (this.getToken (1).tok) {
case 2:
case 3:
if ((order = JU.Edge.getBondOrderFromFloat (this.floatParameter (1))) == 131071) this.invArg ();
break;
default:
if ((order = JS.ScriptParam.getBondOrderFromString (this.paramAsStr (1))) == 131071) this.invArg ();
if (order == 33 && this.tokAt (2) == 3) {
order = JS.ScriptParam.getPartialBondOrderFromFloatEncodedInt (this.st[2].intValue);
}}
this.setShapeProperty (1, "bondOrder", Integer.$valueOf (order));
});
Clazz.defineMethod (c$, "cmdBoundbox", 
 function (index) {
var tickInfo = this.tickParamAsStr (index, false, true, false);
index = this.iToken + 1;
var scale = 1;
if (this.tokAt (index) == 1073742138) {
scale = this.floatParameter (++index);
if (!this.chk && scale == 0) this.invArg ();
index++;
if (index == this.slen) {
if (!this.chk) this.vwr.ms.setBoundBox (null, null, true, scale);
return;
}}var byCorner = (this.tokAt (index) == 1073741902);
if (byCorner) index++;
if (this.isCenterParameter (index)) {
var ret =  new Array (1);
var index0 = index;
var pt1 = this.centerParameter (index, ret);
index = this.iToken + 1;
if (byCorner || this.isCenterParameter (index)) {
var pt2 = (byCorner ? this.centerParameter (index, ret) : this.getPoint3f (index, true, true));
index = this.iToken + 1;
if (!this.chk) this.vwr.ms.setBoundBox (pt1, pt2, byCorner, scale);
} else if (ret[0] != null && Clazz.instanceOf (ret[0], JU.BS)) {
if (!this.chk) this.vwr.calcBoundBoxDimensions (ret[0], scale);
} else if (ret[0] == null && this.tokAt (index0) == 1073742330) {
if (this.chk) return;
var bbox = this.getObjectBoundingBox (this.objectNameParameter (++index0));
if (bbox == null) this.invArg ();
this.vwr.ms.setBoundBox (bbox[0], bbox[1], true, scale);
index = this.iToken + 1;
} else {
this.invArg ();
}if (index == this.slen) return;
}var mad10 = this.getSetAxesTypeMad10 (index);
if (this.chk || mad10 == 2147483647) return;
if (tickInfo != null) this.setShapeProperty (32, "tickInfo", tickInfo);
this.setObjectMad10 (32, "boundbox", mad10);
}, "~N");
Clazz.defineMethod (c$, "cmdCD", 
 function () {
if (this.chk) return;
var dir = (this.slen == 1 ? null : this.paramAsStr (1));
this.showString (this.vwr.cd (dir));
});
Clazz.defineMethod (c$, "cmdCenter", 
 function (i) {
if (this.slen == 1) {
this.vwr.setNewRotationCenter (null);
return;
}var center = this.centerParameter (i, null);
if (center == null) this.invArg ();
if (!this.chk) this.vwr.setNewRotationCenter (center);
}, "~N");
Clazz.defineMethod (c$, "cmdColor", 
 function () {
var i = 1;
var strColor = (this.tokAt (1) == 4 ? this.stringParameter (1) : null);
if (this.isColorParam (1)) {
this.theTok = 1140850689;
} else {
var argb = 0;
i = 2;
var tok = this.getToken (1).tok;
if (tok == 4) {
tok = JS.T.getTokFromName (strColor);
if (tok == 0) tok = 4;
}switch (tok) {
case 1073742330:
this.setObjectProperty ();
return;
case 1086324739:
case 2097154:
case 2097166:
case 1086326788:
case 1073741946:
case 1631586315:
case 1086324742:
case 1113589786:
case 1086324746:
case 1073741991:
case 1094713360:
case 1094713361:
case 1073742333:
case 1073742074:
case 1111492619:
case 1094713362:
case 1715472409:
case 1073742116:
case 1073742110:
case 1112152075:
case 1073742144:
case 1111490574:
case 1639976963:
case 1111490575:
case 1111492620:
case 603979967:
case 1073742186:
case 1648363544:
this.theTok = 1140850689;
i = 1;
break;
case 4:
i = 2;
if (this.isArrayParameter (i)) {
strColor = strColor += "=" + JS.SV.sValue (JS.SV.getVariableAS (this.stringParameterSet (i))).$replace ('\n', ' ');
i = this.iToken + 1;
}var isTranslucent = (this.tokAt (i) == 603979967);
if (!this.chk) this.vwr.setPropertyColorScheme (strColor, isTranslucent, true);
if (isTranslucent) ++i;
if (this.tokAt (i) == 1073742114 || this.tokAt (i) == 1073741826) {
var min = this.floatParameter (++i);
var max = this.floatParameter (++i);
if (!this.chk) this.vwr.cm.setPropertyColorRange (min, max);
}return;
case 1073742114:
case 1073741826:
var min = this.floatParameter (2);
var max = this.floatParameter (this.checkLast (3));
if (!this.chk) this.vwr.cm.setPropertyColorRange (min, max);
return;
case 1610616835:
argb = this.getArgbParamLast (2, true);
if (!this.chk) this.setObjectArgb ("background", argb);
return;
case 12290:
case 10:
case 1073742325:
i = -1;
this.theTok = 1140850689;
break;
case 1073742134:
argb = this.getArgbParamLast (2, false);
if (!this.chk) this.vwr.cm.setRubberbandArgb (argb);
return;
case 536870920:
case 1611141171:
i = 2;
if (this.tokAt (2) == 1073742074) i++;
argb = this.getArgbParamLast (i, true);
if (this.chk) return;
this.sm.loadShape (8);
this.setShapeProperty (8, (tok == 1611141171 ? "argbSelection" : "argbHighlight"), Integer.$valueOf (argb));
return;
case 1611272194:
case 1678381065:
case 1814695966:
case 1073741824:
case 1612709900:
var str = this.paramAsStr (1);
if (this.checkToken (2)) {
argb = this.getToken (2).tok;
switch (argb) {
case 1073742333:
argb = 1073741991;
break;
case 1073741991:
case 1073742116:
case 1073742110:
break;
default:
argb = this.getArgbParam (2);
}
}if (argb == 0) this.error (9);
this.checkLast (this.iToken);
if (str.equalsIgnoreCase ("axes") || JV.StateManager.getObjectIdFromName (str) >= 0) {
this.setObjectArgb (str, argb);
return;
}if (this.setElementColor (str, argb)) return;
this.invArg ();
break;
case 135180:
case 134353926:
this.setShapeProperty (JV.JC.shapeTokenIndex (tok), "thisID", "+PREVIOUS_MESH+");
break;
}
}this.colorShape (this.getShapeType (this.theTok), i, false);
});
Clazz.defineMethod (c$, "cmdDefine", 
 function () {
if (this.slen < 3 || !(Clazz.instanceOf (this.getToken (1).value, String))) this.invArg ();
var setName = (this.getToken (1).value).toLowerCase ();
if (JU.PT.parseInt (setName) != -2147483648) this.invArg ();
if (this.chk) return;
var isSite = setName.startsWith ("site_");
var isDynamic = (setName.indexOf ("dynamic_") == 0);
if (isDynamic || isSite) {
var code =  new Array (this.slen);
for (var i = this.slen; --i >= 0; ) code[i] = this.st[i];

this.vwr.definedAtomSets.put ("!" + (isSite ? setName : setName.substring (8)), code);
} else {
var bs = this.atomExpressionAt (2);
this.vwr.definedAtomSets.put (setName, bs);
if (!this.chk) this.vwr.g.setUserVariable ("@" + setName, JS.SV.newV (10, bs));
}});
Clazz.defineMethod (c$, "cmdDelay", 
 function () {
var millis = 0;
switch (this.getToken (1).tok) {
case 1073742335:
millis = 1;
break;
case 2:
millis = this.intParameter (1) * 1000;
break;
case 3:
millis = Clazz.floatToInt (this.floatParameter (1) * 1000);
break;
default:
this.error (34);
}
this.refresh (false);
this.doDelay (Math.abs (millis));
});
Clazz.defineMethod (c$, "cmdDelete", 
 function () {
if (this.tokAt (1) == 1073742330) {
if (this.slen == 4 && this.optParameterAsString (2).equals ("saved") && this.slen == 4) {
this.vwr.stm.deleteSaved (this.optParameterAsString (3));
if (this.doReport ()) this.report (J.i18n.GT.o (J.i18n.GT.$ ("show saved: {0}"), this.vwr.stm.listSavedStates ()), false);
return;
}this.setObjectProperty ();
return;
}var bs = (this.slen == 1 ? null : this.atomExpression (this.st, 1, 0, true, false, null, false));
if (this.chk) return;
if (bs == null) bs = this.vwr.getAllAtoms ();
var nDeleted = this.vwr.deleteAtoms (bs, false);
if (this.doReport ()) this.report (J.i18n.GT.i (J.i18n.GT.$ ("{0} atoms deleted"), nDeleted), false);
});
Clazz.defineMethod (c$, "cmdDisplay", 
 function (isDisplay) {
var bs = null;
var addRemove = 0;
var i = 1;
var tok;
switch (tok = this.tokAt (1)) {
case 1275069441:
case 1073742119:
addRemove = tok;
tok = this.tokAt (++i);
break;
}
var isGroup = (tok == 1086324742);
if (isGroup) tok = this.tokAt (++i);
switch (tok) {
case 1073742330:
this.setObjectProperty ();
return;
case 0:
break;
default:
if (this.slen == 4 && this.tokAt (2) == 1677721602) bs = JM.BondSet.newBS (JU.BSUtil.newBitSet2 (0, this.vwr.ms.bondCount), null);
 else bs = this.atomExpressionAt (i);
}
if (this.chk) return;
if (Clazz.instanceOf (bs, JM.BondSet)) {
this.vwr.ms.displayBonds (bs, isDisplay);
return;
}this.vwr.displayAtoms (bs, isDisplay, isGroup, addRemove, this.tQuiet);
}, "~B");
Clazz.defineMethod (c$, "cmdDots", 
 function (iShape) {
if (!this.chk) this.sm.loadShape (iShape);
this.setShapeProperty (iShape, "init", null);
var value = NaN;
var type = J.atomdata.RadiusData.EnumType.ABSOLUTE;
var ipt = 1;
while (true) {
switch (this.getToken (ipt).tok) {
case 1073742072:
this.restrictSelected (false, false);
case 1073742335:
value = 1;
type = J.atomdata.RadiusData.EnumType.FACTOR;
break;
case 1073742334:
value = 0;
break;
case 1073741976:
this.setShapeProperty (iShape, "ignore", this.atomExpressionAt (ipt + 1));
ipt = this.iToken + 1;
continue;
case 2:
var dotsParam = this.intParameter (ipt);
if (this.tokAt (ipt + 1) == 1665140738) {
ipt++;
this.setShapeProperty (iShape, "atom", Integer.$valueOf (dotsParam));
this.setShapeProperty (iShape, "radius", Float.$valueOf (this.floatParameter (++ipt)));
if (this.tokAt (++ipt) == 1765808134) {
this.setShapeProperty (iShape, "colorRGB", Integer.$valueOf (this.getArgbParam (++ipt)));
ipt++;
}if (this.getToken (ipt).tok != 10) this.invArg ();
this.setShapeProperty (iShape, "dots", this.st[ipt].value);
return;
}break;
}
break;
}
var rd = (Float.isNaN (value) ? this.encodeRadiusParameter (ipt, false, true) :  new J.atomdata.RadiusData (null, value, type, J.c.VDW.AUTO));
if (rd == null) return;
if (Float.isNaN (rd.value)) this.invArg ();
this.setShapeSize (iShape, rd);
}, "~N");
Clazz.defineMethod (c$, "cmdEcho", 
 function (index) {
if (this.chk) return;
var text = this.optParameterAsString (index);
var doRefresh = true;
if (this.vwr.ms.getEchoStateActive ()) {
if (text.startsWith ("\1")) {
text = text.substring (1);
doRefresh = false;
}if (text != null) this.setShapeProperty (31, "text", text);
}if (doRefresh && this.vwr.getRefreshing ()) this.showString (JU.Txt.formatText (this.vwr, text));
}, "~N");
Clazz.defineMethod (c$, "cmdFile", 
 function () {
var file = this.intParameter (this.checkLast (1));
if (this.chk) return;
var modelIndex = this.vwr.ms.getModelNumberIndex (file * 1000000 + 1, false, false);
var modelIndex2 = -1;
if (modelIndex >= 0) {
modelIndex2 = this.vwr.ms.getModelNumberIndex ((file + 1) * 1000000 + 1, false, false);
if (modelIndex2 < 0) modelIndex2 = this.vwr.ms.mc;
modelIndex2--;
}this.vwr.setAnimationOn (false);
this.vwr.am.setAnimationDirection (1);
this.vwr.setAnimationRange (modelIndex, modelIndex2);
this.vwr.setCurrentModelIndex (-1);
});
Clazz.defineMethod (c$, "cmdFixed", 
 function () {
var bs = (this.slen == 1 ? null : this.atomExpressionAt (1));
if (this.chk) return;
this.vwr.setMotionFixedAtoms (bs);
});
Clazz.defineMethod (c$, "cmdFor", 
 function (tok, isForCheck) {
var cmdToken = this.theToken;
var pt = this.st[0].intValue;
var forVars = cmdToken.forVars;
var pts =  Clazz.newIntArray (2, 0);
var bsOrList = null;
var forVal = null;
var forVar = null;
var inTok = 0;
var isOK = true;
var isMinusMinus = false;
var j = 0;
var key = null;
if (isForCheck && forVars != null) {
tok = 1275068432;
forVar = forVars[0];
forVal = forVars[1];
bsOrList = forVars[1].value;
j = ++forVal.intValue;
if (forVal.tok == 2) {
isMinusMinus = (j < 0);
var i1 = (bsOrList)[0];
var i2 = (bsOrList)[1];
isOK = (i1 != i2 && (i2 < i1) == isMinusMinus);
if (isOK) forVar.intValue = (bsOrList)[0] = i1 + (isMinusMinus ? -1 : 1);
j = -1;
} else if (forVal.tok == 7) {
isOK = (j <= (bsOrList).size ());
if (isOK) forVar.setv (JS.SV.selectItemVar (forVal));
j = -1;
} else {
this.isBondSet = Clazz.instanceOf (bsOrList, JM.BondSet);
j = (bsOrList).nextSetBit (j);
isOK = (j >= 0);
}} else {
var isLocal = false;
for (var i = 1, nSkip = 0; i < this.slen && j < 2; i++) {
switch (tok = this.tokAt (i)) {
case 36868:
isLocal = true;
break;
case 1073742339:
if (nSkip > 0) nSkip--;
 else pts[j++] = i;
break;
case 1275068432:
case 1073741952:
key = this.paramAsStr (i - 1);
nSkip -= 2;
if (this.isAtomExpression (++i)) {
inTok = 10;
bsOrList = this.atomExpressionAt (i);
if (this.isBondSet) bsOrList = JM.BondSet.newBS (bsOrList, null);
isOK = ((bsOrList).nextSetBit (0) >= 0);
} else {
var what = this.parameterExpressionList (-i, 1, false);
if (what == null || what.size () < 1) this.invArg ();
var vl = what.get (0);
switch (inTok = vl.tok) {
case 10:
bsOrList = vl.value;
isOK = !(bsOrList).isEmpty ();
break;
case 7:
var v = vl.getList ();
j = v.size ();
isOK = (j > 0);
if (isOK && tok == 1073741952) {
var i12 =  Clazz.newIntArray (-1, [JS.SV.iValue (v.get (0)), JS.SV.iValue (v.get (j - 1))]);
isMinusMinus = (i12[1] < i12[0]);
bsOrList = i12;
tok = 1275068432;
inTok = 2;
} else {
bsOrList = v;
}break;
case 6:
var m = vl.getMap ();
var n = m.keySet ().size ();
isOK = (n > 0);
if (isOK) {
var keys =  new Array (n);
m.keySet ().toArray (keys);
java.util.Arrays.sort (keys);
bsOrList = keys;
}break;
default:
this.invArg ();
}
}i = this.iToken;
break;
case 1275082245:
nSkip += 2;
break;
}
}
if (!isForCheck) {
this.pushContext (cmdToken, "FOR");
this.thisContext.forVars = forVars;
forVars = null;
}if (key == null) {
if (isForCheck) {
j = (bsOrList == null ? pts[1] + 1 : 2);
} else {
j = 2;
}if (this.tokAt (j) == 36868) j++;
key = this.paramAsStr (j);
isMinusMinus = key.equals ("--") || key.equals ("++");
if (isMinusMinus) key = this.paramAsStr (++j);
}if (isOK) if (tok == 1275068432) {
forVar = this.getContextVariableAsVariable (key, isLocal);
if (forVar == null && !isLocal) forVar = this.vwr.g.getAndSetNewVariable (key, false);
if (forVar == null || forVar.myName == null) {
if (key.startsWith ("_")) this.invArg ();
if (isLocal) this.contextVariables.put (key.toLowerCase (), forVar = JS.SV.newI (0));
 else forVar = this.vwr.g.getAndSetNewVariable (key, true);
}if (inTok == 2) {
forVar.tok = 2;
forVar.intValue = (bsOrList)[0];
forVal = JS.SV.newV (2, bsOrList);
forVal.intValue = (isMinusMinus ? -2147483648 : 0);
j = -1;
} else {
forVal = JS.SV.getVariable (bsOrList);
if (inTok == 10) {
j = (bsOrList).nextSetBit (0);
forVal.intValue = 0;
} else {
forVal.intValue = 1;
forVar.setv (JS.SV.selectItemVar (forVal));
j = -1;
}}if (forVars == null) forVars = cmdToken.forVars =  new Array (2);
forVars[0] = forVar;
forVars[1] = forVal;
} else {
var vtok = this.tokAt (j);
if (vtok != 1073742339 && (JS.T.tokAttr (vtok, 1073741824) || (forVal = this.getContextVariableAsVariable (key, false)) != null)) {
if (!isMinusMinus && this.getToken (++j).tok != 268435860) this.invArg ();
if (isMinusMinus) j -= 2;
this.setVariable (++j, this.slen - 1, key, false);
}isOK = (pts[0] + 1 == pts[1] || this.parameterExpressionBoolean (pts[0] + 1, pts[1]));
}}if (isOK && tok == 1275068432 && j >= 0) {
forVal.intValue = j;
forVar.tok = 10;
if (this.isBondSet) {
forVar.value =  new JM.BondSet ();
(forVar.value).set (j);
} else {
forVar.value = JU.BSUtil.newAndSetBit (j);
}}pt++;
if (!isOK) {
cmdToken.forVars = this.thisContext.forVars;
this.popContext (true, false);
}isForCheck = false;
if (!isOK && !this.chk) this.pc = Math.abs (pt) - 1;
return isForCheck;
}, "~N,~B");
Clazz.defineMethod (c$, "cmdFlow", 
 function (tok, isForCheck, vProcess) {
var ct;
var pt = this.st[0].intValue;
var isDone = (pt < 0 && !this.chk);
var continuing = true;
var ptNext = 0;
switch (tok) {
case 134320141:
case 102436:
this.cmdFunc ();
return isForCheck;
case 364558:
return isForCheck;
case 102412:
ct = this.theToken;
this.pushContext (ct, "CATCH");
if (!isDone && ct.name0 != null) this.contextVariables.put (ct.name0, ct.contextVariables.get (ct.name0));
continuing = !isDone;
this.st[0].intValue = -Math.abs (pt);
break;
case 102410:
case 102413:
case 102411:
ptNext = Math.abs (this.aatoken[Math.abs (pt)][0].intValue);
switch (isDone ? 0 : this.cmdFlowSwitch (this.theToken, tok)) {
case 0:
ptNext = -ptNext;
continuing = false;
break;
case -1:
continuing = false;
break;
case 1:
}
this.aatoken[this.pc][0].intValue = Math.abs (pt);
this.theToken = this.aatoken[Math.abs (pt)][0];
if (this.theToken.tok != 102409) this.theToken.intValue = ptNext;
break;
case 134320649:
case 102402:
continuing = (!isDone && this.parameterExpressionBoolean (1, 0));
if (this.chk) break;
ptNext = Math.abs (this.aatoken[Math.abs (pt)][0].intValue);
ptNext = (isDone || continuing ? -ptNext : ptNext);
this.aatoken[Math.abs (pt)][0].intValue = ptNext;
if (tok == 102412) this.aatoken[this.pc][0].intValue = -pt;
break;
case 364547:
this.checkLength (1);
if (pt < 0 && !this.chk) this.pc = -pt - 1;
break;
case 364548:
this.checkLength (1);
break;
case 102406:
if (!isForCheck) this.pushContext (this.theToken, "WHILE");
isForCheck = false;
if (!this.parameterExpressionBoolean (1, 0) && !this.chk) {
this.pc = pt;
this.popContext (true, false);
}break;
case 102407:
if (!this.chk) {
this.breakAt (pt);
break;
}if (this.slen == 1) break;
var n = this.intParameter (this.checkLast (1));
if (this.chk) break;
for (var i = 0; i < n; i++) this.popContext (true, false);

break;
case 102408:
isForCheck = true;
if (!this.chk) this.pc = pt - 1;
if (this.slen > 1) this.intParameter (this.checkLast (1));
break;
case 102409:
switch (this.getToken (this.checkLast (1)).tok) {
case 364558:
var trycmd = this.getToken (1).value;
if (this.chk) return false;
this.runFunctionAndRet (trycmd, "try", null, null, true, true, true);
return false;
case 134320141:
case 102436:
this.vwr.addFunction (this.theToken.value);
return isForCheck;
case 102412:
this.popContext (true, false);
break;
case 102439:
this.addProcess (vProcess, pt, this.pc);
this.popContext (true, false);
break;
case 102410:
if (pt > 0 && this.cmdFlowSwitch (this.aatoken[pt][0], 0) == -1) {
for (; pt < this.pc; pt++) if ((tok = this.aatoken[pt][0].tok) != 102413 && tok != 102411) break;

continuing = (this.pc == pt);
}break;
case 134320649:
break;
case 134320648:
case 102406:
continuing = false;
isForCheck = true;
break;
}
break;
}
if (!continuing && !this.chk) this.pc = Math.abs (pt) - 1;
return isForCheck;
}, "~N,~B,JU.Lst");
Clazz.defineMethod (c$, "cmdFlowSwitch", 
 function (c, tok) {
if (tok == 102410) c.addName ("_var");
var $var = c.contextVariables.get ("_var");
if ($var == null) return 1;
if (tok == 0) {
c.contextVariables.remove ("_var");
return -1;
}if (tok == 102413) return -1;
var v = this.parameterExpressionToken (1);
if (tok == 102411) {
var isOK = JS.SV.areEqual ($var, v);
if (isOK) c.contextVariables.remove ("_var");
return isOK ? 1 : -1;
}c.contextVariables.put ("_var", v);
return 1;
}, "JS.ContextToken,~N");
Clazz.defineMethod (c$, "cmdFont", 
 function (shapeType, fontsize) {
var fontface = "SansSerif";
var fontstyle = "Plain";
var sizeAdjust = 0;
var scaleAngstromsPerPixel = -1;
switch (this.iToken = this.slen) {
case 6:
scaleAngstromsPerPixel = this.floatParameter (5);
if (scaleAngstromsPerPixel >= 5) scaleAngstromsPerPixel = this.vwr.tm.getZoomSetting () / scaleAngstromsPerPixel / this.vwr.getScalePixelsPerAngstrom (false);
case 5:
if (this.getToken (4).tok != 1073741824) this.invArg ();
fontstyle = this.paramAsStr (4);
case 4:
if (this.getToken (3).tok != 1073741824) this.invArg ();
fontface = this.paramAsStr (3);
if (!this.isFloatParameter (2)) this.error (34);
fontsize = this.floatParameter (2);
shapeType = this.getShapeType (this.getToken (1).tok);
break;
case 3:
if (!this.isFloatParameter (2)) this.error (34);
if (shapeType == -1) {
shapeType = this.getShapeType (this.getToken (1).tok);
fontsize = this.floatParameter (2);
} else {
if (fontsize >= 1) fontsize += (sizeAdjust = 5);
}break;
case 2:
default:
if (shapeType == 5) {
fontsize = 13;
break;
}this.bad ();
}
if (shapeType == 5) {
if (fontsize < 0 || fontsize >= 1 && (fontsize < 6 || fontsize > 63)) {
this.integerOutOfRange (6 - sizeAdjust, 63 - sizeAdjust);
return;
}this.setShapeProperty (5, "setDefaults", this.vwr.slm.noneSelected);
}if (this.chk) return;
if (JU.Font.getFontStyleID (fontface) >= 0) {
fontstyle = fontface;
fontface = "SansSerif";
}var font3d = this.vwr.getFont3D (fontface, fontstyle, fontsize);
this.sm.loadShape (shapeType);
this.setShapeProperty (shapeType, "font", font3d);
if (scaleAngstromsPerPixel >= 0) this.setShapeProperty (shapeType, "scalereference", Float.$valueOf (scaleAngstromsPerPixel));
}, "~N,~N");
Clazz.defineMethod (c$, "cmdFrank", 
 function (i) {
var b = true;
if (this.slen > i) switch (this.getToken (this.checkLast (i)).tok) {
case 1073742335:
break;
case 1073742334:
b = false;
break;
default:
this.error (5);
}
this.setBooleanProperty ("frank", b);
}, "~N");
Clazz.defineMethod (c$, "cmdFunc", 
 function () {
if (this.chk && !this.isCmdLine_c_or_C_Option) return;
var name = (this.getToken (0).value).toLowerCase ();
if (this.tokAt (1) == 268435860 && this.tokAt (2) == 1073742333) {
this.vwr.removeFunction (name);
return;
}if (!this.vwr.isFunction (name)) this.error (10);
var params = (this.slen == 1 || this.slen == 3 && this.tokAt (1) == 268435472 && this.tokAt (2) == 268435473 ? null : this.parameterExpressionList (1, -1, false));
if (this.chk) return;
this.runFunctionAndRet (null, name, params, null, false, true, true);
});
Clazz.defineMethod (c$, "cmdGetProperty", 
 function () {
if (this.chk) return;
var retValue = "";
var property = this.optParameterAsString (1);
var name = property;
if (name.indexOf (".") >= 0) name = name.substring (0, name.indexOf ("."));
if (name.indexOf ("[") >= 0) name = name.substring (0, name.indexOf ("["));
var propertyID = this.vwr.getPropertyNumber (name);
var param = "";
switch (this.tokAt (2)) {
default:
param = this.optParameterAsString (2);
break;
case 12290:
case 1073742325:
case 10:
param = this.atomExpressionAt (2);
if (property.equalsIgnoreCase ("bondInfo") && this.isAtomExpression (++this.iToken)) param =  Clazz.newArray (-1, [param, this.atomExpressionAt (this.iToken)]);
break;
}
if (property.length > 0 && propertyID < 0) {
property = "";
param = "";
} else if (propertyID >= 0 && this.slen < 3) {
if ((param = this.vwr.getDefaultPropertyParam (propertyID)).equals ("(visible)")) param = this.vwr.ms.getVisibleSet (true);
} else if (propertyID == this.vwr.getPropertyNumber ("fileContents")) {
var s = param.toString ();
for (var i = 3; i < this.slen; i++) s += this.paramAsStr (i);

param = s;
}retValue = this.vwr.getProperty ("readable", property, param);
this.showString (retValue);
});
Clazz.defineMethod (c$, "cmdGoto", 
 function (isCmd) {
var strTo = (isCmd ? this.paramAsStr (this.checkLast (1)) : null);
var pcTo = (strTo == null ? this.aatoken.length - 1 : -1);
var s = null;
for (var i = pcTo + 1; i < this.aatoken.length; i++) {
var tokens = this.aatoken[i];
var tok = tokens[0].tok;
switch (tok) {
case 20485:
case 0:
s = tokens[tokens.length - 1].value;
if (tok == 0) s = s.substring (s.startsWith ("#") ? 1 : 2);
break;
default:
continue;
}
if (s.equalsIgnoreCase (strTo)) {
pcTo = i;
break;
}}
if (pcTo < 0) this.invArg ();
if (strTo == null) pcTo = 0;
var di = (pcTo < this.pc ? 1 : -1);
var nPush = 0;
for (var i = pcTo; i != this.pc; i += di) {
switch (this.aatoken[i][0].tok) {
case 1275335685:
case 102439:
case 134320648:
case 102412:
case 102406:
nPush++;
break;
case 1275334681:
nPush--;
break;
case 102409:
switch (this.aatoken[i][1].tok) {
case 102439:
case 134320648:
case 102412:
case 102406:
nPush--;
}
break;
}
}
if (strTo == null) {
pcTo = 2147483647;
for (; nPush > 0; --nPush) this.popContext (false, false);

}if (nPush != 0) this.invArg ();
if (!this.chk) this.pc = pcTo - 1;
}, "~B");
Clazz.defineMethod (c$, "cmdHbond", 
 function () {
if (this.slen == 2 && this.getToken (1).tok == 4102) {
if (this.chk) return;
var n = this.vwr.autoHbond (null, null, false);
this.report (J.i18n.GT.i (J.i18n.GT.$ ("{0} hydrogen bonds"), Math.abs (n)), false);
return;
}if (this.slen == 2 && this.getToken (1).tok == 12291) {
if (this.chk) return;
this.checkExtension (1613238294);
return;
}var mad = this.getMadParameter ();
if (mad == 2147483647) return;
this.setShapeProperty (1, "type", Integer.$valueOf (30720));
this.setShapeSizeBs (1, mad, null);
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
});
Clazz.defineMethod (c$, "cmdHelp", 
 function () {
if (this.chk) return;
var what = this.optParameterAsString (1).toLowerCase ();
var pt = 0;
if (what.startsWith ("mouse") && (pt = what.indexOf (" ")) >= 0 && pt == what.lastIndexOf (" ")) {
this.showString (this.vwr.getBindingInfo (what.substring (pt + 1)));
return;
}if (JS.T.tokAttr (JS.T.getTokFromName (what), 4096)) what = "?command=" + what;
this.vwr.getHelp (what);
});
Clazz.defineMethod (c$, "cmdHistory", 
 function (pt) {
if (this.slen == 1) {
this.showString (this.vwr.getSetHistory (2147483647));
return;
}if (pt == 2) {
var n = this.intParameter (this.checkLast (2));
if (n < 0) this.invArg ();
if (!this.chk) this.vwr.getSetHistory (n == 0 ? 0 : -2 - n);
return;
}switch (this.getToken (this.checkLast (1)).tok) {
case 1073742335:
case 1073741882:
if (!this.chk) this.vwr.getSetHistory (-2147483648);
return;
case 1073742334:
if (!this.chk) this.vwr.getSetHistory (0);
break;
default:
this.errorStr (24, "ON, OFF, CLEAR");
}
}, "~N");
Clazz.defineMethod (c$, "cmdHover", 
 function () {
if (this.chk) return;
var strLabel = (this.slen == 1 ? "on" : this.paramAsStr (1));
if (strLabel.equalsIgnoreCase ("on")) strLabel = "%U";
 else if (strLabel.equalsIgnoreCase ("off")) strLabel = null;
this.vwr.setHoverLabel (strLabel);
});
Clazz.defineMethod (c$, "cmdLabel", 
 function (index, bs) {
if (this.chk) return;
this.sm.loadShape (5);
var strLabel = null;
switch (this.getToken (index).tok) {
case 1073742335:
strLabel = this.vwr.getStandardLabelFormat (0);
break;
case 1073742334:
break;
case 12294:
case 1610625028:
this.setShapeProperty (5, "display", this.theTok == 1610625028 ? Boolean.TRUE : Boolean.FALSE);
return;
case 7:
strLabel = this.theToken.value;
break;
default:
strLabel = this.paramAsStr (index);
}
this.sm.setLabel (strLabel, bs == null ? this.vwr.bsA () : bs);
}, "~N,JU.BS");
Clazz.defineMethod (c$, "cmdLoad", 
function () {
var doLoadFiles = (!this.chk || this.isCmdLine_C_Option);
var isAppend = false;
var isInline = false;
var isSmiles = false;
var isMutate = false;
var isData = false;
var isAsync = this.vwr.async;
var isConcat = false;
var doOrient = false;
var appendNew = this.vwr.getBoolean (603979792);
var isAudio = false;
var filename = null;
var bsModels;
var i = (this.tokAt (0) == 134221834 ? 0 : 1);
var filter = null;
var modelCount0 = this.vwr.ms.mc - (this.vwr.fm.getFileName ().equals ("zapped") ? 1 : 0);
var ac0 = this.vwr.ms.ac;
var loadScript =  new JU.SB ().append ("load");
var nFiles = 1;
var htParams =  new java.util.Hashtable ();
if (this.$isStateScript) {
htParams.put ("isStateScript", Boolean.TRUE);
if (this.forceNoAddHydrogens) htParams.put ("doNotAddHydrogens", Boolean.TRUE);
}var modelName = null;
var filenames = null;
var tempFileInfo = null;
var errMsg = null;
var sOptions =  new JU.SB ();
var tokType = 0;
var tok;
if (this.slen == 1) {
i = 0;
} else {
modelName = this.paramAsStr (i);
if (this.slen == 2 && !this.chk) {
if (modelName.endsWith (".spt") || modelName.endsWith (".png") || modelName.endsWith (".pngj")) {
this.cmdScript (0, modelName, null);
return;
}}tok = this.tokAt (i);
switch (tok) {
case 36868:
var $var = this.paramAsStr (++i);
filename = "@" + $var;
var o = this.getVarParameter ($var, false);
if (Clazz.instanceOf (o, java.util.Map)) {
this.checkLength (3);
this.loadPNGJVar (filename, o, htParams);
return;
}break;
case 1073877011:
case 1610616855:
case 1073742015:
var m = this.paramAsStr (this.checkLast (2));
if (!this.chk) {
switch (tok) {
case 1073877011:
htParams.put ("service", "nbo");
htParams.put ("mode", Integer.$valueOf (1));
htParams.put ("action", "load");
htParams.put ("value", m);
htParams.put ("sync", Boolean.TRUE);
this.vwr.sm.processService (htParams);
this.runScript (htParams.get ("ret"));
break;
case 1610616855:
this.vwr.setHistory (m);
break;
case 1073742015:
this.vwr.setMenu (m, true);
break;
}
}return;
case 4130:
isMutate = isAppend = true;
appendNew = false;
loadScript.append (" mutate");
modelName = this.optParameterAsString (++i);
tok = JS.T.getTokFromName (modelName);
break;
case 1073741839:
isAppend = true;
loadScript.append (" append");
modelName = this.optParameterAsString (++i);
tok = JS.T.getTokFromName (modelName);
break;
case 1073742077:
doOrient = true;
loadScript.append (" orientation");
this.vwr.stm.saveOrientation ("preload", null);
modelName = this.optParameterAsString (++i);
tok = JS.T.getTokFromName (modelName);
break;
case 1073741851:
isAudio = true;
i++;
break;
case 1073741824:
i++;
loadScript.append (" " + modelName);
tokType = (tok == 1073741824 && JU.PT.isOneOf (modelName.toLowerCase (), ";xyz;vxyz;vibration;temperature;occupancy;partialcharge;") ? JS.T.getTokFromName (modelName) : 0);
if (tokType != 0) {
htParams.put ("atomDataOnly", Boolean.TRUE);
htParams.put ("modelNumber", Integer.$valueOf (1));
if (tokType == 4166) tokType = 1145047055;
tempFileInfo = this.vwr.fm.getFileInfo ();
isAppend = true;
}}
switch (tok) {
case 1228935687:
i++;
loadScript.append (" " + modelName);
if (this.optParameterAsString (i).equals ("+")) {
isConcat = true;
i++;
loadScript.append (" +");
}if (this.optParameterAsString (i).equals ("-")) {
isConcat = true;
i++;
loadScript.append (" -");
}if (this.tokAt (i) == 7) {
filenames = this.stringParameterSet (i);
i = this.iToken;
if (i + 1 != this.slen) this.invArg ();
if (filenames != null) nFiles = filenames.length;
}break;
case 1073741984:
isInline = true;
i++;
loadScript.append (" " + modelName);
break;
case 134218757:
isSmiles = true;
i++;
break;
case 1073741849:
isAsync = true;
htParams.put ("async", Boolean.TRUE);
i++;
break;
case 536870926:
case 1094717454:
i++;
loadScript.append (" " + modelName);
if (tok == 536870926) htParams.put ("isTrajectory", Boolean.TRUE);
if (this.isPoint3f (i)) {
var pt = this.getPoint3f (i, false, true);
i = this.iToken + 1;
htParams.put ("firstLastStep",  Clazz.newIntArray (-1, [Clazz.floatToInt (pt.x), Clazz.floatToInt (pt.y), Clazz.floatToInt (pt.z)]));
loadScript.append (" " + JU.Escape.eP (pt));
} else {
switch (this.tokAt (i)) {
case 10:
bsModels = this.getToken (i++).value;
htParams.put ("bsModels", bsModels);
loadScript.append (" " + JU.Escape.eBS (bsModels));
break;
default:
htParams.put ("firstLastStep",  Clazz.newIntArray (-1, [0, -1, 1]));
}
}break;
case 1073741824:
break;
case 134221834:
var key = this.stringParameter (++i).toLowerCase ();
isAppend = key.startsWith ("append");
doOrient = (key.indexOf ("orientation") >= 0);
i = this.addLoadData (loadScript, key, htParams, i);
isData = true;
break;
default:
modelName = "fileset";
}
if (filename == null && filenames == null && this.getToken (i).tok != 4) this.error (16);
}var filePt = i;
var ptAs = i + 1;
var localName = null;
if (this.tokAt (ptAs) == 1073741848) {
localName = this.stringParameter (i = ptAs + 1);
if (this.vwr.fm.getPathForAllFiles () !== "") {
localName = null;
filePt = i;
}}var appendedData = null;
var appendedKey = null;
if (this.slen == i + 1) {
if (filename == null && (i == 0 || filenames == null && (filename = this.paramAsStr (filePt)).length == 0)) filename = this.getFullPathName ();
if (filename == null && filenames == null) {
this.cmdZap (false);
return;
}if (filenames == null && !isInline) {
if (isSmiles) {
filename = "$" + filename;
} else {
if (filename.equals ("String[]")) return;
if (filename.indexOf ("[") == 0) {
filenames = JU.Escape.unescapeStringArray (filename);
if (filenames != null) {
if (i == 1) loadScript.append (" files");
nFiles = filenames.length;
}}}}if (filenames != null) for (var j = 0; j < nFiles; j++) loadScript.append (" /*file*/").append (JU.PT.esc (filenames[j]));

} else if (this.isLoadOption (this.getToken (i + 1).tok)) {
if (filename == null && (filename = this.paramAsStr (filePt)).length == 0 && (filename = this.getFullPathName ()) == null) {
this.cmdZap (false);
return;
}if (filePt == i || localName != null) i++;
if (filename.equals ("String[]")) return;
if ((tok = this.tokAt (i)) == 1073742010) {
var manifest = this.stringParameter (++i);
htParams.put ("manifest", manifest);
sOptions.append (" MANIFEST " + JU.PT.esc (manifest));
tok = this.tokAt (++i);
}switch (tok) {
case 2:
case 7:
case 268435520:
case 1073742195:
i = this.getLoadModelIndex (i, sOptions, htParams);
break;
}
i = this.getCmdExt ().getLoadSymmetryParams (i, sOptions, htParams);
if (this.tokAt (i) == 1073741839) {
if (this.tokAt (++i) == 134221834) {
i += 2;
appendedData = this.getToken (i++).value;
appendedKey = this.stringParameter (++i);
++i;
} else {
appendedKey = this.stringParameter (i++);
appendedData = this.stringParameter (i++);
}htParams.put (appendedKey, appendedData);
}if (this.tokAt (i) == 1073741940) filter = this.stringParameter (++i);
} else {
var fNames =  new JU.Lst ();
if (i == 1) {
if (this.tokAt (i + 1) == 268435617 || this.tokAt (i + 1) == 268435616) {
modelName = "files";
} else {
i++;
}loadScript.append (" " + modelName);
}if (this.tokAt (i + 1) == 268435616) isConcat = true;
filter = this.getLoadFilesList (i, loadScript, sOptions, htParams, fNames);
filenames = fNames.toArray ( new Array (nFiles = fNames.size ()));
if (!isConcat && loadScript.indexOf ("/*concat*/") >= 0) isConcat = true;
}if (!doLoadFiles) return;
if (filenames != null) filename = "fileSet";
if (appendedData != null) {
sOptions.append (" APPEND data \"" + appendedKey + "\"\n" + appendedData + (appendedData.endsWith ("\n") ? "" : "\n") + "end \"" + appendedKey + "\"");
}if (filter == null) filter = this.vwr.g.defaultLoadFilter;
if (filter.length > 0) {
if (filter.toUpperCase ().indexOf ("DOCACHE") >= 0) {
if (!this.$isStateScript && !isAppend) this.vwr.cacheClear ();
}htParams.put ("filter", filter);
if (filter.equalsIgnoreCase ("2d")) filter = "2D-noMin";
sOptions.append (" FILTER " + JU.PT.esc (filter));
}var isVariable = false;
if (filenames == null) {
if (filename.equals ("string") && this.vwr.am.cmi >= 0) {
filename = this.vwr.getCurrentFileAsString (null);
loadScript =  new JU.SB ().append ("load inline ");
isInline = true;
}if (isInline) {
htParams.put ("fileData", filename);
} else if (filename.startsWith ("@") && filename.length > 1) {
var o = this.getVarParameter (filename.substring (1), false);
if (Clazz.instanceOf (o, java.util.Map)) {
this.checkLength (i + 1);
this.loadPNGJVar (filename, o, htParams);
return;
}isVariable = true;
o = "" + o;
loadScript =  new JU.SB ().append ("{\n    var ").append (filename.substring (1)).append (" = ").append (JU.PT.esc (o)).append (";\n    ").appendSB (loadScript);
htParams.put ("fileData", o);
} else if (!isData && !((filename.startsWith ("=") || filename.startsWith ("*")) && filename.indexOf ("/") > 0)) {
var type = "";
var pt = filename.indexOf ("::");
if (pt > 0 && pt < 20) {
type = filename.substring (0, pt + 2);
filename = filename.substring (pt + 2);
}filename = type + this.checkFileExists ("LOAD" + (isAppend ? "_APPEND_" : "_"), isAsync, filename, filePt, !isAppend && this.pc != this.pcResume);
if (filename.startsWith ("cache://")) localName = null;
}}var out = null;
var filecat = null;
if (localName != null) {
if (localName.equals (".")) localName = this.vwr.fm.getFilePath (filename, false, true);
if (localName.length == 0 || this.vwr.fm.getFilePath (localName, false, false).equalsIgnoreCase (this.vwr.fm.getFilePath (filename, false, false))) this.invArg ();
var fullPath =  Clazz.newArray (-1, [localName]);
out = this.vwr.getOutputChannel (localName, fullPath);
if (out == null) JU.Logger.error ("Could not create output stream for " + fullPath[0]);
 else htParams.put ("outputChannel", out);
}if (filenames == null && tokType == 0) {
loadScript.append (" ");
if (isVariable || isInline) {
loadScript.append (filename.indexOf ('\n') >= 0 || isVariable ? JU.PT.esc (filename) : filename);
} else if (!isData) {
if (localName != null) localName = this.vwr.fm.getFilePath (localName, false, false);
if (!filename.equals ("String[]")) loadScript.append ("/*file*/").append ((localName != null ? JU.PT.esc (localName) : "$FILENAME$"));
}if (!isConcat && (filename.startsWith ("=") || filename.startsWith ("*")) && filename.indexOf ("/") > 0) {
isConcat = true;
var pt = filename.indexOf ("/");
var id;
if (pt == 1 && (id = this.vwr.getPdbID ()) != null) {
filename = filename.substring (0, 1) + id + filename.substring (1);
pt = filename.indexOf ("/");
} else {
id = filename.substring (1, pt);
}var ext = filename.substring (pt + 1);
filename = filename.substring (0, pt);
if ((pt = filename.indexOf (".")) >= 0) filename = filename.substring (0, pt);
if (";dssr;rna3d;dom;val;".indexOf (";" + ext + ";") >= 0 || ext.startsWith ("dssr--")) {
if (filename.startsWith ("=")) filename += ".cif";
filenames = (ext.equals ("all") ?  Clazz.newArray (-1, [filename, "*dom/" + id, "*val/" + id]) :  Clazz.newArray (-1, [filename, "*" + ext + "/" + id]));
filename = "fileSet";
loadScript = null;
isVariable = false;
filecat = "-";
} else {
filename += "/" + ext;
}}if (loadScript != null) {
if (sOptions.length () > 0) loadScript.append (" /*options*/ ").append (sOptions.toString ());
if (isVariable) loadScript.append ("\n  }");
htParams.put ("loadScript", loadScript);
}}if (isAudio) {
if (filename != null) htParams.put ("audioFile", filename);
this.addFilterAttribute (htParams, filter, "id");
this.addFilterAttribute (htParams, filter, "pause");
this.addFilterAttribute (htParams, filter, "play");
this.addFilterAttribute (htParams, filter, "ended");
this.addFilterAttribute (htParams, filter, "action");
this.vwr.sm.playAudio (htParams);
return;
}this.setCursorWait (true);
var timeMsg = this.vwr.getBoolean (603979934);
if (timeMsg) JU.Logger.startTimer ("load");
if (!this.$isStateScript && !isAppend) this.vwr.setBooleanProperty ("legacyJavaFloat", false);
if (isMutate) htParams.put ("isMutate", Boolean.TRUE);
htParams.put ("eval", this);
errMsg = this.vwr.loadModelFromFile (null, filename, filenames, null, isAppend, htParams, loadScript, sOptions, tokType, filecat != null ? filecat : isConcat ? "+" : " ");
if (timeMsg) this.showString (JU.Logger.getTimerMsg ("load", 0));
if (out != null) {
this.vwr.fm.setFileInfo ( Clazz.newArray (-1, [localName]));
JU.Logger.info (J.i18n.GT.o (J.i18n.GT.$ ("file {0} created"), localName));
this.showString (this.vwr.fm.getFilePath (localName, false, false) + " created");
out.closeChannel ();
}if (tokType > 0) {
this.vwr.fm.setFileInfo (tempFileInfo);
if (errMsg != null && !this.isCmdLine_c_or_C_Option) this.evalError (errMsg, null);
return;
}if (errMsg != null && !this.isCmdLine_c_or_C_Option) {
if (errMsg.indexOf ("NOTE: file recognized as a script file: ") == 0) {
filename = errMsg.substring ("NOTE: file recognized as a script file: ".length).trim ();
if (filename.indexOf ("png|") >= 0 && filename.endsWith ("pdb|state.spt")) {
filename = filename.substring (0, filename.lastIndexOf ("|"));
filename += filename.substring (filename.lastIndexOf ("|"));
this.runScript ("load \"" + filename + "\"");
return;
}this.cmdScript (0, filename, null);
return;
}if (this.vwr.async && errMsg.startsWith (JV.JC.READER_NOT_FOUND)) {
throw  new JS.ScriptInterruption (this, "async", 1);
}this.evalError (errMsg, null);
}if (this.debugHigh) this.report ("Successfully loaded:" + (filenames == null ? htParams.get ("fullPathName") : modelName), false);
this.finalizeLoad (isAppend, appendNew, isConcat, doOrient, nFiles, ac0, modelCount0);
});
Clazz.defineMethod (c$, "checkFileExists", 
function (prefix, isAsync, filename, i, doClear) {
if (this.chk || filename.startsWith ("cache://")) return filename;
if ((this.vwr.testAsync || JV.Viewer.isJS) && (isAsync || filename.startsWith ("?")) || this.vwr.apiPlatform.forceAsyncLoad (filename)) {
filename = this.loadFileAsync (prefix, filename, i, doClear);
}var fullPathNameOrError = this.vwr.getFullPathNameOrError (filename);
filename = fullPathNameOrError[0];
if (fullPathNameOrError[1] != null) this.errorStr (17, filename + ":" + fullPathNameOrError[1]);
return filename;
}, "~S,~B,~S,~N,~B");
Clazz.defineMethod (c$, "addFilterAttribute", 
 function (htParams, filter, key) {
var val = JU.PT.getQuotedOrUnquotedAttribute (filter, key);
if (val != null && val.length > 0) htParams.put (key, val);
}, "java.util.Map,~S,~S");
Clazz.defineMethod (c$, "addLoadData", 
 function (loadScript, key, htParams, i) {
loadScript.append (" /*data*/ data");
var ptVar = key.indexOf ("@");
if (ptVar >= 0) key = key.$replace ('@', '_');
loadScript.append (" ").append (JU.PT.esc (key));
var strModel = (ptVar >= 0 ? "" + this.getParameter (key.substring (ptVar + 1), 4, true) : this.paramAsStr (++i));
strModel = JV.Viewer.fixInlineString (strModel, this.vwr.getInlineChar ());
htParams.put ("fileData", strModel);
htParams.put ("isData", Boolean.TRUE);
loadScript.appendC ('\n').append (strModel).append (" end ").append (JU.PT.esc (key));
if (ptVar < 0) i += 2;
return i;
}, "JU.SB,~S,java.util.Map,~N");
Clazz.defineMethod (c$, "loadPNGJVar", 
 function (varName, o, htParams) {
var av =  Clazz.newArray (-1, [JS.SV.newV (6, o)]);
this.getCmdExt ().dispatch (1073741866, false, av);
htParams.put ("imageData", av[0].value);
var out = this.vwr.getOutputChannel (null, null);
htParams.put ("outputChannel", out);
this.vwr.createZip ("", "BINARY", htParams);
var modelName = "cache://VAR_" + varName;
this.vwr.cacheFileByName ("cache://VAR_*", false);
this.vwr.cachePut (modelName, out.toByteArray ());
this.cmdScript (0, modelName, null);
}, "~S,~O,java.util.Map");
Clazz.defineMethod (c$, "getLoadFilesList", 
 function (i, loadScript, sOptions, htParams, fNames) {
var firstLastSteps = null;
var filter = null;
var pt = null;
var bs = null;
while (i < this.slen) {
switch (this.tokAt (i)) {
case 268435617:
loadScript.append ("/*concat*/ +");
++i;
continue;
case 268435616:
loadScript.append (" -");
++i;
continue;
case 2:
case 7:
case 268435520:
case 1073742195:
i = this.getLoadModelIndex (i, sOptions, htParams);
continue;
case 1073741940:
filter = this.stringParameter (++i);
++i;
continue;
case 1073742329:
htParams.remove ("isTrajectory");
if (firstLastSteps == null) {
firstLastSteps =  new JU.Lst ();
pt = JU.P3.new3 (0, -1, 1);
}if (this.isPoint3f (++i)) {
pt = this.getPoint3f (i, false, true);
i = this.iToken + 1;
} else if (this.tokAt (i) == 10) {
bs = this.getToken (i).value;
pt = null;
i = this.iToken + 1;
}break;
case 1073741824:
this.invArg ();
}
fNames.addLast (this.paramAsStr (i++));
if (pt != null) {
firstLastSteps.addLast ( Clazz.newIntArray (-1, [Clazz.floatToInt (pt.x), Clazz.floatToInt (pt.y), Clazz.floatToInt (pt.z)]));
loadScript.append (" COORD " + JU.Escape.eP (pt));
} else if (bs != null) {
firstLastSteps.addLast (bs);
loadScript.append (" COORD " + JU.Escape.eBS (bs));
}loadScript.append (" /*file*/$FILENAME" + fNames.size () + "$");
}
if (firstLastSteps != null) htParams.put ("firstLastSteps", firstLastSteps);
return filter;
}, "~N,JU.SB,JU.SB,java.util.Map,JU.Lst");
Clazz.defineMethod (c$, "isLoadOption", 
 function (tok) {
switch (tok) {
case 1073742010:
case 2:
case 7:
case 268435520:
case 1073742195:
case 1073742332:
case 8:
case 1073742080:
case 1094713350:
case 1073742163:
case 1073741938:
case 1073742114:
case 134217764:
case 1814695966:
case 1073742066:
case 134221834:
case 1073741839:
return true;
case 1073741940:
case 1073741824:
return (this.tokAt (this.iToken + 2) != 1073742329);
}
return false;
}, "~N");
Clazz.defineMethod (c$, "getLoadModelIndex", 
 function (i, sOptions, htParams) {
var n;
switch (this.tokAt (i)) {
case 2:
htParams.remove ("firstLastStep");
htParams.remove ("bsModel");
htParams.put ("useFileModelNumbers", Boolean.TRUE);
n = this.intParameter (i);
sOptions.append (" ").appendI (n);
if (n < 0) htParams.put ("vibrationNumber", Integer.$valueOf (-n));
 else htParams.put ("modelNumber", Integer.$valueOf (n));
break;
case 7:
case 268435520:
case 1073742195:
htParams.remove ("firstLastStep");
var data = this.floatParameterSet (i, 1, 2147483647);
var bs =  new JU.BS ();
var iArray =  Clazz.newIntArray (data.length, 0);
for (var j = 0; j < data.length; j++) {
n = Clazz.floatToInt (data[j]);
if (data[j] >= 1 && data[j] == n) bs.set (n - 1);
 else this.invArg ();
iArray[j] = n;
}
sOptions.append (" " + JU.Escape.eAI (iArray));
htParams.put ("bsModels", bs);
htParams.put ("useFileModelNumbers", Boolean.TRUE);
break;
}
return this.iToken + 1;
}, "~N,JU.SB,java.util.Map");
Clazz.defineMethod (c$, "finalizeLoad", 
 function (isAppend, appendNew, isConcat, doOrient, nFiles, ac0, modelCount0) {
if (isAppend && (appendNew || nFiles > 1)) {
this.vwr.setAnimationRange (-1, -1);
this.vwr.setCurrentModelIndex (modelCount0);
}var msg;
if (this.scriptLevel == 0 && !isAppend && (isConcat || nFiles < 2) && (msg = this.vwr.ms.getInfoM ("modelLoadNote")) != null) this.vwr.showString (msg, false);
var centroid = this.vwr.ms.getInfoM ("centroidMinMax");
if (JU.AU.isAI (centroid) && this.vwr.ms.ac > 0) {
var bs = JU.BSUtil.newBitSet2 (isAppend ? ac0 : 0, this.vwr.ms.ac);
this.vwr.ms.setCentroid (bs, centroid);
}var script = this.vwr.g.defaultLoadScript;
msg = "";
if (script.length > 0) msg += "\nUsing defaultLoadScript: " + script;
var embeddedScript;
var info = this.vwr.ms.msInfo;
if (info != null && this.vwr.allowEmbeddedScripts () && (embeddedScript = info.remove ("jmolscript")) != null && embeddedScript.length > 0) {
msg += "\nAdding embedded #jmolscript: " + embeddedScript;
script += ";" + embeddedScript;
this.setStringProperty ("_loadScript", script);
script = "allowEmbeddedScripts = false;try{" + script + "} allowEmbeddedScripts = true;";
this.isEmbedded = !this.isCmdLine_c_or_C_Option;
} else {
this.setStringProperty ("_loadScript", "");
}this.logLoadInfo (msg);
var siteScript = (info == null ? null : info.remove ("sitescript"));
if (siteScript != null) script = siteScript + ";" + script;
if (doOrient) script += ";restore orientation preload";
if (script.length > 0 && !this.isCmdLine_c_or_C_Option) this.runScript (script);
this.isEmbedded = false;
}, "~B,~B,~B,~B,~N,~N,~N");
Clazz.defineMethod (c$, "cmdLog", 
 function () {
if (this.slen == 1) this.bad ();
if (this.chk) return;
var s = this.parameterExpressionString (1, 0);
if (this.tokAt (1) == 1073742334) this.setStringProperty ("logFile", "");
 else this.vwr.log (s);
});
Clazz.defineMethod (c$, "cmdLoop", 
 function () {
if (this.vwr.headless) return;
if (!this.chk) this.pc = -1;
this.cmdDelay ();
});
Clazz.defineMethod (c$, "cmdMessage", 
 function () {
var text = this.paramAsStr (this.checkLast (1));
if (this.chk) return;
var s = JU.Txt.formatText (this.vwr, text);
if (this.outputBuffer == null && !this.vwr.isPrintOnly) JU.Logger.warn (s);
if (!s.startsWith ("_")) this.report (s, false);
});
Clazz.defineMethod (c$, "cmdModel", 
 function (offset) {
var isFrame = (this.theTok == 4115 || this.vwr.ms.mc > 1);
var frameList =  Clazz.newIntArray (-1, [-1, -1]);
var nFrames = 0;
var useModelNumber = true;
var modelIndex = -1;
if (this.slen == 1 && offset == 1) {
modelIndex = this.vwr.am.cmi;
var m;
if (!this.chk && modelIndex >= 0 && (m = this.vwr.ms.getJmolDataSourceFrame (modelIndex)) >= 0) this.vwr.setCurrentModelIndex (m == modelIndex ? -2147483648 : m);
return;
}switch (this.tokAt (1)) {
case 1073877010:
if (!this.chk && isFrame && this.slen == 2) {
while (++modelIndex < this.vwr.ms.mc) {
if (!this.vwr.ms.am[modelIndex].auxiliaryInfo.containsKey ("moData")) continue;
this.vwr.am.setFrame (modelIndex);
this.showString ("Frame set to " + (modelIndex + 1));
return;
}
this.showString ("No molecular orbitals");
}return;
case 2:
if (isFrame && this.slen == 2) {
if (!this.chk) this.vwr.am.setFrame (this.intParameter (1) - 1);
return;
}break;
case 1073742325:
case 10:
modelIndex = this.atomExpressionAt (1).nextSetBit (0);
if (this.chk || modelIndex < 0 || modelIndex >= this.vwr.ms.ac) return;
modelIndex = this.vwr.ms.at[modelIndex].mi;
if (this.iToken + 1 == this.slen) {
this.vwr.setCurrentModelIndex (modelIndex);
return;
}frameList[nFrames++] = modelIndex;
offset = this.iToken + 1;
useModelNumber = false;
break;
case 1073741904:
this.iToken = 1;
var n = (this.tokAt (2) == 2 ? this.intParameter (++this.iToken) : 1);
this.checkLength (this.iToken + 1);
if (!this.chk && n > 0) this.vwr.ms.createModels (n);
return;
case 1073741974:
this.checkLength (3);
var id = this.stringParameter (2);
if (!this.chk) this.vwr.setCurrentModelID (id);
return;
case 528397:
var millis = 0;
this.checkLength (3);
switch (this.getToken (2).tok) {
case 2:
case 3:
millis = Clazz.floatToLong (this.floatParameter (2) * 1000);
break;
default:
this.error (20);
}
if (!this.chk) this.vwr.setFrameDelayMs (millis);
return;
case 1073742166:
if (this.checkLength23 () > 0) if (!this.chk) this.vwr.setFrameTitleObj (this.slen == 2 ? "@{_modelName}" : (this.tokAt (2) == 7 ? JS.SV.strListValue (this.st[2]) : this.paramAsStr (2)));
return;
case 1073742077:
if (this.tokAt (2) == 3 && this.tokAt (3) == 12) {
modelIndex = this.vwr.ms.getModelNumberIndex (this.getToken (2).intValue, false, false);
var mat4 = this.getToken (3).value;
if (modelIndex >= 0) this.vwr.ms.am[modelIndex].mat4 = mat4;
return;
}break;
case 1073741832:
var isNone = (this.tokAt (2) == 1073742333);
var bs = (this.slen == 2 || isNone ? null : this.atomExpressionAt (2));
if (isNone) this.iToken = 2;
var isFixed = (this.tokAt (this.iToken + 1) == 12293);
this.checkLength (this.iToken + (isFixed ? 2 : 1));
if (!this.chk) this.vwr.setFrameOffsets (bs, isFixed);
return;
}
if (this.getToken (offset).tok == 268435616) {
++offset;
if (this.getToken (this.checkLast (offset)).tok != 2 || this.intParameter (offset) != 1) this.invArg ();
if (!this.chk) this.vwr.setAnimation (1073742108);
return;
}var isPlay = false;
var isRange = false;
var propName = null;
var prop = null;
var isAll = false;
var isHyphen = false;
var fFrame = 0;
var frameAlign = null;
var haveFileSet = this.vwr.haveFileSet ();
if (this.isArrayParameter (1)) {
this.setFrameSet (1);
isAll = true;
} else {
for (var i = offset; i < this.slen; i++) {
switch (this.getToken (i).tok) {
case 1073741832:
if (i != 2) this.invArg ();
frameAlign = this.centerParameter (3, null);
this.checkLength (i = this.iToken + 1);
break;
case 1073742327:
case 268435633:
this.checkLength (offset + (isRange ? 2 : 1));
isAll = true;
break;
case 268435616:
if (nFrames != 1) this.invArg ();
isHyphen = true;
break;
case 1073742333:
this.checkLength (offset + 1);
break;
case 3:
useModelNumber = false;
if ((fFrame = this.floatParameter (i)) < 0) {
this.checkLength (i + 1);
if (!this.chk) this.vwr.am.morph (-fFrame);
return;
}case 2:
case 4:
if (nFrames == 2) this.invArg ();
var iFrame = (this.theTok == 4 ? JS.ScriptParam.getFloatEncodedInt (this.theToken.value) : this.theToken.intValue);
if (iFrame < 0 && nFrames == 1) {
isHyphen = true;
iFrame = -iFrame;
if (haveFileSet && iFrame < 1000000) iFrame *= 1000000;
}if (this.theTok == 3 && haveFileSet && fFrame == Clazz.floatToInt (fFrame)) iFrame = Clazz.floatToInt (fFrame) * 1000000;
if (iFrame == 2147483647) {
useModelNumber = false;
frameList[nFrames++] = (this.chk || i != 1 ? 0 : this.vwr.getModelIndexFromId (this.theToken.value.toString ()));
break;
}if (iFrame == -1) {
this.checkLength (offset + 1);
if (!this.chk) this.vwr.setAnimation (1073742108);
return;
}if (iFrame >= 1000 && iFrame < 1000000 && haveFileSet) iFrame = (Clazz.doubleToInt (iFrame / 1000)) * 1000000 + (iFrame % 1000);
if (!useModelNumber && iFrame == 0 && nFrames == 0) isAll = true;
if (iFrame >= 1000000) useModelNumber = false;
frameList[nFrames++] = iFrame;
break;
case 1073742096:
isPlay = true;
break;
case 1073742114:
isRange = true;
break;
case 1715472409:
if (modelIndex < 0 && (modelIndex = this.vwr.am.cmi) < 0) return;
propName = this.paramAsStr (++i);
var sv = this.setVariable (++i, -1, "", false);
if (sv != null && !this.chk) {
if (propName.equalsIgnoreCase ("DSSR")) {
this.loadDssr (modelIndex, sv.value);
return;
}prop = JS.SV.oValue (sv);
}if (!this.chk) this.vwr.ms.setInfo (modelIndex, propName, prop);
return;
default:
this.frameControl (offset);
return;
}
}
}if (this.chk) return;
if (isRange && nFrames == 0) isAll = true;
if (isAll) {
this.vwr.setAnimationOn (false);
this.vwr.setAnimationRange (-1, -1);
if (!isRange) this.vwr.setCurrentModelIndex (-1);
return;
}if (nFrames == 2 && !isRange) isHyphen = true;
if (haveFileSet) useModelNumber = false;
 else if (useModelNumber) for (var i = 0; i < nFrames; i++) if (frameList[i] >= 0) frameList[i] %= 1000000;

modelIndex = this.vwr.ms.getModelNumberIndex (frameList[0], useModelNumber, false);
if (frameAlign != null) {
if (modelIndex >= 0) {
this.vwr.ms.translateModel (modelIndex, null);
this.vwr.ms.translateModel (modelIndex, frameAlign);
}return;
}var modelIndex2 = -1;
if (haveFileSet && modelIndex < 0 && frameList[0] != 0) {
if (frameList[0] < 1000000) frameList[0] *= 1000000;
if (nFrames == 2 && frameList[1] < 1000000) frameList[1] *= 1000000;
if (frameList[0] % 1000000 == 0) {
frameList[0]++;
modelIndex = this.vwr.ms.getModelNumberIndex (frameList[0], false, false);
if (modelIndex >= 0) {
var i2 = (nFrames == 1 ? frameList[0] + 1000000 : frameList[1] == 0 ? -1 : frameList[1] % 1000000 == 0 ? frameList[1] + 1000001 : frameList[1] + 1);
modelIndex2 = this.vwr.ms.getModelNumberIndex (i2, false, false);
if (modelIndex2 < 0) modelIndex2 = this.vwr.ms.mc;
modelIndex2--;
if (isRange) nFrames = 2;
 else if (!isHyphen && modelIndex2 != modelIndex) isHyphen = true;
isRange = isRange || modelIndex == modelIndex2;
}} else {
return;
}}if (!isPlay && !isRange || modelIndex >= 0) this.vwr.setCurrentModelIndexClear (modelIndex, false);
if (isPlay && nFrames == 2 || isRange || isHyphen) {
if (modelIndex2 < 0) modelIndex2 = this.vwr.ms.getModelNumberIndex (frameList[1], useModelNumber, false);
this.vwr.setAnimationOn (false);
this.vwr.am.setAnimationDirection (1);
this.vwr.setAnimationRange (modelIndex, modelIndex2);
this.vwr.setCurrentModelIndexClear (isHyphen && !isRange ? -1 : modelIndex >= 0 ? modelIndex : 0, false);
}if (isPlay) this.vwr.setAnimation (4143);
}, "~N");
Clazz.defineMethod (c$, "loadDssr", 
 function (modelIndex, data) {
if (modelIndex < 0 && (modelIndex = this.vwr.am.cmi) < 0) this.errorStr (30, "load <dssr file>");
if (!data.startsWith ("{")) data = this.vwr.getFileAsString3 (data, true, "script");
this.clearDefinedVariableAtomSets ();
var map = this.vwr.parseJSONMap (data);
this.showString (this.vwr.getAnnotationParser (true).fixDSSRJSONMap (map));
this.vwr.ms.setInfo (modelIndex, "dssr", map);
}, "~N,~S");
Clazz.defineMethod (c$, "cmdMove", 
 function () {
this.checkLength (-11);
var dRot = JU.V3.new3 (this.floatParameter (1), this.floatParameter (2), this.floatParameter (3));
var dZoom = this.floatParameter (4);
var dTrans = JU.V3.new3 (this.intParameter (5), this.intParameter (6), this.intParameter (7));
var dSlab = this.floatParameter (8);
var floatSecondsTotal = this.floatParameter (9);
var fps = (this.slen == 11 ? this.intParameter (10) : 30);
if (this.chk) return;
this.refresh (false);
if (!this.useThreads ()) floatSecondsTotal = 0;
this.vwr.move (this, dRot, dZoom, dTrans, dSlab, floatSecondsTotal, fps);
if (floatSecondsTotal > 0 && this.isJS) throw  new JS.ScriptInterruption (this, "move", 1);
});
Clazz.defineMethod (c$, "cmdMoveto", 
 function () {
if (this.slen == 2 && this.tokAt (1) == 1073742162) {
if (!this.chk) this.vwr.tm.stopMotion ();
return;
}var floatSecondsTotal;
if (this.slen == 2 && this.isFloatParameter (1)) {
floatSecondsTotal = this.floatParameter (1);
if (this.chk) return;
if (!this.useThreads ()) floatSecondsTotal = 0;
if (floatSecondsTotal > 0) this.refresh (false);
this.vwr.moveTo (this, floatSecondsTotal, null, JV.JC.axisZ, 0, null, 100, 0, 0, 0, null, NaN, NaN, NaN, NaN, NaN, NaN);
if (this.isJS && floatSecondsTotal > 0 && this.vwr.g.waitForMoveTo) throw  new JS.ScriptInterruption (this, "moveTo", 1);
return;
}var axis = JU.V3.new3 (NaN, 0, 0);
var center = null;
var i = 1;
floatSecondsTotal = (this.isFloatParameter (i) ? this.floatParameter (i++) : 2.0);
var degrees = 90;
var bsCenter = null;
var isChange = true;
var isMolecular = false;
var xTrans = 0;
var yTrans = 0;
var zoom = NaN;
var rotationRadius = NaN;
var zoom0 = this.vwr.tm.getZoomSetting ();
var navCenter = null;
var xNav = NaN;
var yNav = NaN;
var navDepth = NaN;
var cameraDepth = NaN;
var cameraX = NaN;
var cameraY = NaN;
var pymolView = null;
var q = null;
switch (this.getToken (i).tok) {
case 1073742110:
pymolView = this.floatParameterSet (++i, 18, 21);
i = this.iToken + 1;
if (this.chk && this.checkLength (i) > 0) return;
break;
case 134221850:
if (this.tokAt (++i) == 1073742028) {
isMolecular = true;
i++;
}if (this.isAtomExpression (i)) {
isMolecular = true;
var ret =  new Array (1);
center = this.centerParameter (i, ret);
if (!(Clazz.instanceOf (ret[0], JU.BS))) this.invArg ();
bsCenter = ret[0];
q = (this.chk ?  new JU.Quat () : this.vwr.ms.getQuaternion (bsCenter.nextSetBit (0), this.vwr.getQuaternionFrame ()));
} else {
q = this.getQuaternionParameter (i, null, false);
}i = this.iToken + 1;
if (q == null) this.invArg ();
break;
case 9:
case 8:
case 1073742332:
if (this.isPoint3f (i)) {
axis.setT (this.getPoint3f (i, true, true));
i = this.iToken + 1;
degrees = this.floatParameter (i++);
} else {
var pt4 = this.getPoint4f (i);
i = this.iToken + 1;
axis.set (pt4.x, pt4.y, pt4.z);
degrees = (pt4.x == 0 && pt4.y == 0 && pt4.z == 0 ? NaN : pt4.w);
}break;
case 1073741954:
axis.set (1, 0, 0);
degrees = 0;
this.checkLength (++i);
break;
case 1073741858:
axis.set (0, 1, 0);
degrees = 180;
this.checkLength (++i);
break;
case 1073741996:
axis.set (0, 1, 0);
this.checkLength (++i);
break;
case 1073742126:
axis.set (0, -1, 0);
this.checkLength (++i);
break;
case 1073742172:
axis.set (1, 0, 0);
this.checkLength (++i);
break;
case 1073741871:
axis.set (-1, 0, 0);
this.checkLength (++i);
break;
case 1073741854:
var abc = this.paramAsStr (++i);
if (abc.equals ("-")) abc += this.paramAsStr (++i);
this.checkLength (++i);
switch ("xyz".indexOf (abc)) {
case 0:
q = JU.Quat.new4 (0.5, 0.5, 0.5, -0.5);
break;
case 1:
q = JU.Quat.new4 (0.5, 0.5, 0.5, 0.5);
break;
case 2:
q = JU.Quat.new4 (0, 0, 0, 1);
break;
default:
var uc;
uc = this.vwr.getCurrentUnitCell ();
if (uc == null) {
uc = this.vwr.getSymTemp ();
uc.setUnitCell ( Clazz.newFloatArray (-1, [1, 1, 1, 90, 90, 90]), false);
}q = uc.getQuaternionRotation (abc);
if (q == null) this.invArg ();
}
break;
default:
axis = JU.V3.new3 (this.floatParameter (i++), this.floatParameter (i++), this.floatParameter (i++));
degrees = this.floatParameter (i++);
}
if (q != null) {
var aa;
aa = q.toAxisAngle4f ();
axis.set (aa.x, aa.y, aa.z);
degrees = (isMolecular ? -1 : 1) * (aa.angle * 180.0 / 3.141592653589793);
}if (Float.isNaN (axis.x) || Float.isNaN (axis.y) || Float.isNaN (axis.z)) axis.set (0, 0, 0);
 else if (axis.length () == 0 && degrees == 0) degrees = NaN;
isChange = !this.vwr.tm.isInPosition (axis, degrees);
if (this.isFloatParameter (i)) zoom = this.floatParameter (i++);
if (this.isFloatParameter (i) && !this.isCenterParameter (i)) {
xTrans = this.floatParameter (i++);
yTrans = this.floatParameter (i++);
if (!isChange && Math.abs (xTrans - this.vwr.tm.getTranslationXPercent ()) >= 1) isChange = true;
if (!isChange && Math.abs (yTrans - this.vwr.tm.getTranslationYPercent ()) >= 1) isChange = true;
}if (bsCenter == null && i != this.slen) {
var ret =  new Array (1);
center = this.centerParameter (i, ret);
if (Clazz.instanceOf (ret[0], JU.BS)) bsCenter = ret[0];
i = this.iToken + 1;
}if (center != null) {
if (!isChange && center.distance (this.vwr.tm.fixedRotationCenter) >= 0.1) isChange = true;
if (this.isFloatParameter (i)) rotationRadius = this.floatParameter (i++);
if (!this.isCenterParameter (i)) {
if ((rotationRadius == 0 || Float.isNaN (rotationRadius)) && (zoom == 0 || Float.isNaN (zoom))) {
var newZoom = Math.abs (this.getZoom (0, i, bsCenter, (zoom == 0 ? 0 : zoom0)));
i = this.iToken + 1;
zoom = newZoom;
} else {
if (!isChange && Math.abs (rotationRadius - this.vwr.getFloat (570425388)) >= 0.1) isChange = true;
}}if (zoom == 0 || Float.isNaN (zoom)) zoom = 100;
if (Float.isNaN (rotationRadius)) rotationRadius = 0;
if (!isChange && Math.abs (zoom - zoom0) >= 1) isChange = true;
if (i != this.slen) {
navCenter = this.centerParameter (i, null);
i = this.iToken + 1;
if (i != this.slen) {
xNav = this.floatParameter (i++);
yNav = this.floatParameter (i++);
}if (i != this.slen) navDepth = this.floatParameter (i++);
if (i != this.slen) {
cameraDepth = this.floatParameter (i++);
if (!isChange && Math.abs (cameraDepth - this.vwr.tm.getCameraDepth ()) >= 0.01) isChange = true;
}if (i + 1 < this.slen) {
cameraX = this.floatParameter (i++);
cameraY = this.floatParameter (i++);
if (!isChange && Math.abs (cameraX - this.vwr.tm.camera.x) >= 0.01) isChange = true;
if (!isChange && Math.abs (cameraY - this.vwr.tm.camera.y) >= 0.01) isChange = true;
}}}this.checkLength (i);
if (this.chk) return;
if (!isChange) floatSecondsTotal = 0;
if (floatSecondsTotal > 0) this.refresh (false);
if (!this.useThreads ()) floatSecondsTotal = 0;
if (cameraDepth == 0) {
cameraDepth = cameraX = cameraY = NaN;
}if (pymolView != null) this.vwr.tm.moveToPyMOL (this, floatSecondsTotal, pymolView);
 else this.vwr.moveTo (this, floatSecondsTotal, center, axis, degrees, null, zoom, xTrans, yTrans, rotationRadius, navCenter, xNav, yNav, navDepth, cameraDepth, cameraX, cameraY);
if (this.isJS && floatSecondsTotal > 0 && this.vwr.g.waitForMoveTo) throw  new JS.ScriptInterruption (this, "moveTo", 1);
});
Clazz.defineMethod (c$, "isAtomExpression", 
function (i) {
switch (this.tokAt (i)) {
case 12290:
case 10:
case 1073742325:
return true;
default:
return false;
}
}, "~N");
Clazz.defineMethod (c$, "cmdPause", 
 function () {
if (this.chk || this.isJS && !this.allowJSThreads) return false;
var msg = this.optParameterAsString (1);
if (!this.vwr.getBooleanProperty ("_useCommandThread")) {
}if (this.vwr.autoExit || !this.vwr.haveDisplay && !JV.Viewer.isWebGL) return false;
if (this.scriptLevel == 0 && this.pc == this.aatoken.length - 1) {
this.vwr.scriptStatus ("nothing to pause: " + msg);
return false;
}msg = (msg.length == 0 ? ": RESUME to continue." : ": " + JU.Txt.formatText (this.vwr, msg));
this.pauseExecution (true);
this.vwr.scriptStatusMsg ("script execution paused" + msg, "script paused for RESUME");
return true;
});
Clazz.defineMethod (c$, "cmdPrint", 
 function () {
if (this.slen == 1) {
if (!this.chk) this.showStringPrint ("\0", true);
return;
}this.showStringPrint (this.parameterExpressionString (1, 0), true);
});
Clazz.defineMethod (c$, "cmdPrompt", 
 function () {
var msg = null;
if (this.slen == 1) {
if (!this.chk) msg = JS.ScriptEval.getContextTrace (this.vwr, this.getScriptContext ("prompt"), null, true).toString ();
} else {
msg = this.parameterExpressionString (1, 0);
}if (!this.chk) this.vwr.prompt (msg, null, null, true);
});
Clazz.defineMethod (c$, "cmdReset", 
 function () {
if (this.slen == 3 && this.tokAt (1) == 134320141) {
if (!this.chk) this.vwr.removeFunction (this.stringParameter (2));
return;
}this.checkLength (-2);
if (this.chk) return;
if (this.slen == 1) {
this.vwr.reset (false);
return;
}switch (this.tokAt (1)) {
case 36865:
if (!this.chk && this.outputBuffer != null) this.outputBuffer.setLength (0);
return;
case 134221829:
this.vwr.cacheClear ();
return;
case 1073741936:
this.resetError ();
return;
case 1073741995:
this.vwr.stm.resetLighting ();
return;
case 1086324748:
this.vwr.resetShapes (true);
return;
case 134320141:
this.vwr.clearFunctions ();
return;
case 1639976963:
var bsModified =  new JU.BS ();
this.runScript (this.vwr.ms.getDefaultStructure (this.vwr.bsA (), bsModified));
this.vwr.shm.resetBioshapes (bsModified);
return;
case 1648363544:
this.vwr.setData ("element_vdw",  Clazz.newArray (-1, [null, ""]), 0, 0, 0, 0, 0);
return;
case 1075838996:
this.vwr.ms.resetAromatic ();
return;
case 1611141175:
this.vwr.reset (true);
return;
}
var $var = this.paramAsStr (1);
if ($var.charAt (0) == '_') this.invArg ();
this.vwr.unsetProperty ($var);
});
Clazz.defineMethod (c$, "resetError", 
 function () {
this.vwr.g.removeParam ("_errormessage");
});
Clazz.defineMethod (c$, "cmdRestrict", 
 function () {
var isBond = (this.tokAt (1) == 1677721602);
this.cmdSelect (isBond ? 2 : 1);
this.restrictSelected (isBond, true);
});
Clazz.defineMethod (c$, "cmdReturn", 
 function (tv) {
if (this.chk) return;
var t = this.getContextVariableAsVariable ("_retval", false);
if (t != null) {
var v = (tv != null || this.slen == 1 ? null : this.parameterExpressionToken (1));
if (tv == null) tv = (v == null ? JS.SV.newI (0) : v);
t.value = tv.value;
t.intValue = tv.intValue;
t.tok = tv.tok;
}this.cmdGoto (false);
}, "JS.SV");
Clazz.defineMethod (c$, "cmdRotate", 
function (isSpin, isSelected) {
if (this.slen == 2) switch (this.getToken (1).tok) {
case 1073742335:
if (!this.chk) this.vwr.tm.setSpinOn ();
return;
case 1073742334:
if (!this.chk) this.vwr.tm.setSpinOff ();
return;
}
var bsAtoms = null;
var bsBest = null;
var degreesPerSecond = 1.4E-45;
var nPoints = 0;
var endDegrees = 3.4028235E38;
var isMolecular = false;
var haveRotation = false;
var dihedralList = null;
var ptsA = null;
var points =  new Array (2);
var rotAxis = JU.V3.new3 (0, 1, 0);
var translation = null;
var m4 = null;
var m3 = null;
var is4x4 = false;
var direction = 1;
var tok;
var q = null;
var helicalPath = false;
var isDegreesPerSecond = false;
var isSeconds = false;
var ptsB = null;
var bsCompare = null;
var invPoint = null;
var invPlane = null;
var axesOrientationRasmol = this.vwr.getBoolean (603979806);
for (var i = 1; i < this.slen; ++i) {
switch (tok = this.getToken (i).tok) {
case 528432:
continue;
case 12290:
case 10:
case 1073742325:
bsBest = this.atomExpressionAt (i);
if (translation != null || q != null || nPoints == 2) {
bsAtoms = bsBest;
ptsB = null;
isSelected = true;
break;
}case 1073742332:
case 8:
case 1073742330:
haveRotation = true;
if (nPoints == 2) nPoints = 0;
var pt1 = this.centerParameterForModel (i, this.vwr.am.cmi, null);
if (!this.chk && tok == 1073742330 && this.tokAt (i + 2) != 268435520) {
isMolecular = true;
var data =  Clazz.newArray (-1, [this.objectNameParameter (++i), Integer.$valueOf (this.vwr.am.cmi), null]);
rotAxis = (this.getShapePropertyData (22, "getSpinAxis", data) ? data[2] : null);
}points[nPoints++] = pt1;
break;
case 1611141175:
isSpin = true;
continue;
case 1073741988:
case 1073742028:
isMolecular = true;
continue;
case 1113589787:
isSelected = true;
break;
case 268435504:
continue;
case 2:
case 3:
if (isSpin) {
if (degreesPerSecond == 1.4E-45) {
degreesPerSecond = this.floatParameter (i);
} else if (endDegrees == 3.4028235E38) {
endDegrees = degreesPerSecond;
degreesPerSecond = this.floatParameter (i);
} else {
this.invArg ();
}} else {
if (endDegrees == 3.4028235E38) {
endDegrees = this.floatParameter (i);
} else if (degreesPerSecond == 1.4E-45) {
degreesPerSecond = this.floatParameter (i);
isSpin = true;
} else {
this.invArg ();
}}if (i == this.slen - 2 && (this.tokAt (i + 1) == 1073741824 || this.tokAt (i + 1) == 4)) {
var s = this.paramAsStr (++i).toLowerCase ();
if (s.equals ("dps")) {
isDegreesPerSecond = true;
} else if (s.equals ("sec")) {
isSeconds = true;
}}break;
case 268435616:
direction = -1;
continue;
case 1111492629:
haveRotation = true;
rotAxis.set (direction, 0, 0);
continue;
case 1111492630:
haveRotation = true;
rotAxis.set (0, direction, 0);
continue;
case 1111492631:
haveRotation = true;
rotAxis.set (0, 0, (axesOrientationRasmol && !isMolecular ? -direction : direction));
continue;
case 9:
case 134221850:
case 1073741864:
if (tok == 134221850) i++;
haveRotation = true;
if ((q = this.getQuaternionParameter (i, bsBest, tok == 1073741864)) != null) {
if (q.q0 == 0) q.q0 = 1e-10;
rotAxis.setT (q.getNormal ());
endDegrees = q.getTheta ();
}break;
case 134217750:
var pts;
var n;
if (this.paramAsStr (i + 1).equalsIgnoreCase ("picked")) {
i++;
var lst = this.vwr.getPOrNull ("pickedList");
n = lst.size ();
if (n < 3) return;
pts =  new Array (3);
for (var j = 0; j < 3; j++) pts[j] = this.vwr.ms.getAtomSetCenter (JS.SV.getBitSet (lst.get (n - 3 + j), false));

} else if (this.isArrayParameter (i + 1)) {
pts = this.getPointArray (++i, -1, false);
i = this.iToken;
} else {
pts =  new Array (3);
for (var j = 0; j < 3; j++) {
pts[j] = this.centerParameter (++i, null);
i = this.iToken;
}
}n = pts.length;
if (n < 3) return;
q = JU.Quat.getQuaternionFrame (pts[n - 3], pts[n - 2], pts[n - 1]);
q = JU.Quat.new4 (1, 0, 0, 0).mulQ (q.inv ().div (this.vwr.tm.getRotationQ ()));
rotAxis.setT (q.getNormal ());
endDegrees = q.getTheta ();
break;
case 134217731:
haveRotation = true;
if (this.isPoint3f (++i)) {
rotAxis.setT (this.centerParameter (i, null));
break;
}var p4 = this.getPoint4f (i);
rotAxis.set (p4.x, p4.y, p4.z);
endDegrees = p4.w;
q = JU.Quat.newVA (rotAxis, endDegrees);
break;
case 1073742328:
isSelected = true;
isMolecular = true;
haveRotation = true;
if (this.isArrayParameter (++i)) {
dihedralList = this.floatParameterSet (i, 6, 2147483647);
i = this.iToken;
} else {
var iAtom1 = this.atomExpressionAt (i).nextSetBit (0);
var iAtom2 = this.atomExpressionAt (++this.iToken).nextSetBit (0);
if (iAtom1 < 0 || iAtom2 < 0) return;
bsAtoms = this.vwr.getBranchBitSet (iAtom2, iAtom1, true);
points[0] = this.vwr.ms.at[iAtom1];
points[1] = this.vwr.ms.at[iAtom2];
nPoints = 2;
}break;
case 4160:
translation = JU.V3.newV (this.centerParameter (++i, null));
isMolecular = isSelected = true;
break;
case 136314895:
helicalPath = true;
continue;
case 1296041986:
var symop = this.intParameter (++i);
if (this.chk) continue;
var info = this.vwr.getSymTemp ().getSpaceGroupInfo (this.vwr.ms, null, -1, false, null);
var op = (info == null ? null : info.get ("operations"));
if (symop == 0 || op == null || op.length < Math.abs (symop)) this.invArg ();
op = op[Math.abs (symop) - 1];
translation = op[5];
invPoint = op[6];
points[0] = op[7];
if (op[8] != null) rotAxis = op[8];
endDegrees = (op[9]).intValue ();
if (symop < 0) {
endDegrees = -endDegrees;
if (translation != null) translation.scale (-1);
}if (endDegrees == 0 && points[0] != null) {
rotAxis.normalize ();
JU.Measure.getPlaneThroughPoint (points[0], rotAxis, invPlane =  new JU.P4 ());
}q = JU.Quat.newVA (rotAxis, endDegrees);
nPoints = (points[0] == null ? 0 : 1);
isMolecular = true;
haveRotation = true;
isSelected = true;
continue;
case 134221831:
bsCompare = this.atomExpressionAt (++i);
ptsA = this.vwr.ms.getAtomPointVector (bsCompare);
if (ptsA == null) {
this.iToken = i;
this.invArg ();
}i = this.iToken;
ptsB = this.getPointVector (this.getToken (++i), i);
if (ptsB == null || ptsA.size () != ptsB.size ()) {
this.iToken = i;
this.invArg ();
}m4 =  new JU.M4 ();
points[0] =  new JU.P3 ();
nPoints = 1;
J.api.Interface.getInterface ("JU.Eigen", this.vwr, "script");
var stddev = (this.chk ? 0 : JU.Measure.getTransformMatrix4 (ptsA, ptsB, m4, points[0]));
if (stddev > 0.001) ptsB = null;
case 12:
case 11:
haveRotation = true;
m3 =  new JU.M3 ();
if (tok == 12) {
is4x4 = true;
m4 = this.theToken.value;
}if (m4 != null) {
translation =  new JU.V3 ();
m4.getTranslation (translation);
m4.getRotationScale (m3);
} else {
m3 = this.theToken.value;
}q = (this.chk ?  new JU.Quat () : JU.Quat.newM (m3));
rotAxis.setT (q.getNormal ());
endDegrees = q.getTheta ();
isMolecular = true;
break;
default:
this.invArg ();
}
i = this.iToken;
}
if (this.chk) return;
if (dihedralList != null) {
if (endDegrees != 3.4028235E38) {
isSpin = true;
degreesPerSecond = endDegrees;
}}if (isSelected && bsAtoms == null) bsAtoms = this.vwr.bsA ();
if (bsCompare != null) {
isSelected = true;
if (bsAtoms == null) bsAtoms = bsCompare;
}if (q != null && !isSeconds && !isDegreesPerSecond) {
isDegreesPerSecond = (degreesPerSecond > 0);
isSeconds = !isDegreesPerSecond;
}var rate = (degreesPerSecond == 1.4E-45 ? 10 : endDegrees == 3.4028235E38 ? degreesPerSecond : isDegreesPerSecond ? degreesPerSecond : isSeconds ? (endDegrees < 0 ? -1 : 1) * Math.abs (endDegrees / degreesPerSecond) : (degreesPerSecond < 0) == (q == null ? endDegrees > 0 : true) ? -endDegrees / degreesPerSecond : degreesPerSecond);
if (q == null && endDegrees < 0 && rate > 0) rate = -rate;
if (dihedralList != null) {
if (!isSpin) {
this.vwr.setDihedrals (dihedralList, null, 1);
return;
}translation = null;
}if (q != null) {
if (nPoints == 0 && translation != null && !is4x4) points[0] = this.vwr.ms.getAtomSetCenter (bsAtoms != null ? bsAtoms : isSelected ? this.vwr.bsA () : this.vwr.getAllAtoms ());
if (helicalPath && translation != null) {
points[1] = JU.P3.newP (points[0]);
points[1].add (translation);
var ret = JU.Measure.computeHelicalAxis (points[0], points[1], q);
points[0] = ret[0];
var theta = (ret[3]).x;
if (theta != 0) {
translation = ret[1];
rotAxis = JU.V3.newV (translation);
if (theta < 0) rotAxis.scale (-1);
}m4 = null;
}if (isSpin && m4 == null) m4 = JS.ScriptMathProcessor.getMatrix4f (q.getMatrix (), translation);
if (points[0] != null) nPoints = 1;
}if (invPoint != null) {
this.vwr.invertAtomCoordPt (invPoint, bsAtoms);
if (rotAxis == null) return;
}if (invPlane != null) {
this.vwr.invertAtomCoordPlane (invPlane, bsAtoms);
if (rotAxis == null) return;
}var requiresThread = (isSpin && (!this.vwr.headless || endDegrees == 3.4028235E38));
if (isSpin && !requiresThread) isSpin = false;
if (nPoints < 2 && dihedralList == null) {
if (!isMolecular) {
if (requiresThread && bsAtoms == null && !this.useThreads ()) {
isSpin = false;
if (endDegrees == 3.4028235E38) return;
}if (this.vwr.rotateAxisAngleAtCenter (this, points[0], rotAxis, rate, endDegrees, isSpin, bsAtoms)) {
if (this.isJS && isSpin && bsAtoms == null && this.vwr.g.waitForMoveTo && endDegrees != 3.4028235E38) throw  new JS.ScriptInterruption (this, "rotate", 1);
}return;
}if (nPoints == 0) points[0] =  new JU.P3 ();
points[1] = JU.P3.newP (points[0]);
points[1].add (rotAxis);
nPoints = 2;
}if (nPoints == 0) points[0] =  new JU.P3 ();
if (nPoints < 2 || points[0].distance (points[1]) == 0) {
points[1] = JU.P3.newP (points[0]);
points[1].y += 1.0;
}if (endDegrees == 3.4028235E38) endDegrees = 0;
if (endDegrees != 0 && translation != null && !haveRotation) translation.scale (endDegrees / translation.length ());
if (isSpin && translation != null && (endDegrees == 0 || degreesPerSecond == 0)) {
endDegrees = 0.01;
rate = (degreesPerSecond == 1.4E-45 ? 0.01 : degreesPerSecond < 0 ? -endDegrees / degreesPerSecond : degreesPerSecond * 0.01 / translation.length ());
degreesPerSecond = 0.01;
}if (bsAtoms != null && isSpin && ptsB == null && m4 != null) {
ptsA = this.vwr.ms.getAtomPointVector (bsAtoms);
ptsB = JU.Measure.transformPoints (ptsA, m4, points[0]);
}if (bsAtoms != null && !isSpin && ptsB != null) {
this.vwr.setAtomCoords (bsAtoms, 1145047050, ptsB);
} else {
if (requiresThread && !this.useThreads ()) return;
if (this.vwr.rotateAboutPointsInternal (this, points[0], points[1], rate, endDegrees, isSpin, bsAtoms, translation, ptsB, dihedralList, is4x4 ? m4 : null) && this.isJS && isSpin) throw  new JS.ScriptInterruption (this, "rotate", 1);
}}, "~B,~B");
Clazz.defineMethod (c$, "cmdRestore", 
 function () {
if (this.slen > 1) {
var saveName = this.optParameterAsString (2);
var tok = this.tokAt (1);
switch (tok) {
case 1814695966:
if (!this.chk) this.setCurrentCagePts (null, null);
return;
case 1073742077:
case 1073742132:
case 1073742139:
var floatSecondsTotal = (this.slen > 3 ? this.floatParameter (3) : 0);
if (floatSecondsTotal < 0) this.invArg ();
if (this.chk) return;
var type = "";
switch (tok) {
case 1073742077:
type = "Orientation";
this.vwr.stm.restoreOrientation (saveName, floatSecondsTotal, true);
break;
case 1073742132:
type = "Rotation";
this.vwr.stm.restoreOrientation (saveName, floatSecondsTotal, false);
break;
case 1073742139:
type = "Scene";
this.vwr.stm.restoreScene (saveName, floatSecondsTotal);
break;
}
if (this.isJS && floatSecondsTotal > 0 && this.vwr.g.waitForMoveTo) throw  new JS.ScriptInterruption (this, "restore" + type, 1);
return;
}
this.checkLength23 ();
switch (tok) {
case 1677721602:
if (!this.chk) this.vwr.stm.restoreBonds (saveName);
return;
case 14:
if (this.chk) return;
var sc = this.vwr.stm.getContext (saveName);
if (sc != null) {
this.restoreScriptContext (sc, true, false, false);
if (this.thisContext != null) {
this.thisContext.setMustResume ();
this.mustResumeEval = true;
this.tQuiet = true;
}}return;
case 1073742329:
if (this.chk) return;
var script = this.vwr.stm.getSavedCoordinates (saveName);
if (script == null) this.invArg ();
this.runScript (script);
this.vwr.checkCoordinatesChanged ();
return;
case 1073742140:
if (!this.chk) this.vwr.stm.restoreSelection (saveName);
return;
case 1073742158:
if (this.chk) return;
var state = this.vwr.stm.getSavedState (saveName);
if (state == null) this.invArg ();
this.runScript (state);
return;
case 1639976963:
if (this.chk) return;
var shape = this.vwr.stm.getSavedStructure (saveName);
if (shape == null) this.invArg ();
this.runScript (shape);
return;
}
}this.errorStr2 (53, "RESTORE", "bonds? context? coordinates? orientation? rotation? selection? state? structure?");
});
Clazz.defineMethod (c$, "cmdSave", 
 function () {
if (this.slen > 1) {
var saveName = this.optParameterAsString (2);
switch (this.tokAt (1)) {
case 1677721602:
if (!this.chk) this.vwr.stm.saveBonds (saveName);
return;
case 14:
if (!this.chk) this.saveContext (saveName);
return;
case 1073742329:
if (!this.chk) this.vwr.stm.saveCoordinates (saveName, this.vwr.bsA ());
return;
case 1073742077:
case 1073742132:
if (!this.chk) this.vwr.stm.saveOrientation (saveName, null);
return;
case 1073742140:
if (!this.chk) {
this.vwr.stm.saveSelection (saveName, this.vwr.bsA ());
this.vwr.stm.restoreSelection (saveName);
}return;
case 1073742158:
if (!this.chk) this.vwr.stm.saveState (saveName);
return;
case 1639976963:
if (!this.chk) this.vwr.stm.saveStructure (saveName);
return;
}
}this.errorStr2 (53, "SAVE", "bonds? context? coordinates? orientation? rotation? selection? state? structure?");
});
Clazz.defineMethod (c$, "cmdScript", 
function (tok, filename, theScript) {
if (tok == 134238732) {
this.checkLength (2);
if (!this.chk) this.vwr.jsEval (this.paramAsStr (1));
return;
}var loadCheck = true;
var isCheck = false;
var doStep = false;
var isAsync = this.vwr.async;
var lineNumber = 0;
var pc = 0;
var lineEnd = 0;
var pcEnd = 0;
var i = 1;
var localPath = null;
var remotePath = null;
var scriptPath = null;
var params = null;
if (tok == 4124) {
i = -2;
}if (filename == null && theScript == null) {
tok = this.tokAt (i);
if (tok != 4) this.error (16);
filename = this.paramAsStr (i);
if (filename.equalsIgnoreCase ("async")) {
isAsync = true;
filename = this.paramAsStr (++i);
}if (filename.equalsIgnoreCase ("applet")) {
var appID = this.paramAsStr (++i);
theScript = this.parameterExpressionString (++i, 0);
this.checkLast (this.iToken);
if (this.chk) return;
if (appID.length == 0 || appID.equals ("all")) appID = "*";
if (!appID.equals (".")) {
this.vwr.jsEval (appID + "\1" + theScript);
if (!appID.equals ("*")) return;
}} else {
tok = this.tokAt (this.slen - 1);
doStep = (tok == 266298);
if (filename.equalsIgnoreCase ("inline")) {
theScript = this.parameterExpressionString (++i, (doStep ? this.slen - 1 : 0));
i = this.iToken;
} else {
while (filename.equalsIgnoreCase ("localPath") || filename.equalsIgnoreCase ("remotePath") || filename.equalsIgnoreCase ("scriptPath")) {
if (filename.equalsIgnoreCase ("localPath")) localPath = this.paramAsStr (++i);
 else if (filename.equalsIgnoreCase ("scriptPath")) scriptPath = this.paramAsStr (++i);
 else remotePath = this.paramAsStr (++i);
filename = this.paramAsStr (++i);
}
filename = this.checkFileExists ("SCRIPT_", isAsync, filename, i, true);
}if ((tok = this.tokAt (++i)) == 1073741878) {
isCheck = true;
tok = this.tokAt (++i);
}if (tok == 1073742050) {
loadCheck = false;
tok = this.tokAt (++i);
}if (tok == 1073741998 || tok == 1140850692) {
i++;
lineEnd = lineNumber = Math.max (this.intParameter (i++), 0);
if (this.checkToken (i)) {
if (this.getToken (i).tok == 268435616) lineEnd = (this.checkToken (++i) ? this.intParameter (i++) : 0);
 else lineEnd = -this.intParameter (i++);
if (lineEnd <= 0) this.invArg ();
}} else if (tok == 1073741890 || tok == 1073741892) {
i++;
pc = Math.max (this.intParameter (i++) - 1, 0);
pcEnd = pc + 1;
if (this.checkToken (i)) {
if (this.getToken (i).tok == 268435616) pcEnd = (this.checkToken (++i) ? this.intParameter (i++) : 0);
 else pcEnd = -this.intParameter (i++);
if (pcEnd <= 0) this.invArg ();
}}i = -i;
}} else if (filename != null && isAsync) {
filename = this.checkFileExists ("SCRIPT_", isAsync, filename, i, true);
}if (i < 0) {
if (this.tokAt (i = -i) == 268435472) {
params = this.parameterExpressionList (i, -1, false);
i = this.iToken + 1;
}this.checkLength (doStep ? i + 1 : i);
}if (this.chk && !this.isCmdLine_c_or_C_Option) return;
if (this.isCmdLine_c_or_C_Option) isCheck = true;
var wasSyntaxCheck = this.chk;
var wasScriptCheck = this.isCmdLine_c_or_C_Option;
if (isCheck) this.chk = this.isCmdLine_c_or_C_Option = true;
this.pushContext (null, "SCRIPT");
this.contextPath += " >> " + filename;
if (theScript == null ? this.compileScriptFileInternal (filename, localPath, remotePath, scriptPath) : this.compileScript (null, theScript, false)) {
this.pcEnd = pcEnd;
this.lineEnd = lineEnd;
while (pc < this.lineNumbers.length && this.lineNumbers[pc] < lineNumber) pc++;

this.pc = pc;
var saveLoadCheck = this.isCmdLine_C_Option;
this.isCmdLine_C_Option = new Boolean (this.isCmdLine_C_Option & loadCheck).valueOf ();
this.executionStepping = new Boolean (this.executionStepping | doStep).valueOf ();
if (this.contextVariables == null) this.contextVariables =  new java.util.Hashtable ();
this.contextVariables.put ("_arguments", (params == null ? JS.SV.getVariableAI ( Clazz.newIntArray (-1, [])) : JS.SV.getVariableList (params)));
this.contextVariables.put ("_argcount", JS.SV.newI (params == null ? 0 : params.size ()));
if (isCheck) this.listCommands = true;
var timeMsg = this.vwr.getBoolean (603979934);
if (timeMsg) JU.Logger.startTimer ("script");
this.dispatchCommands (false, false, false);
if (this.$isStateScript) JS.ScriptManager.setStateScriptVersion (this.vwr, null);
if (timeMsg) this.showString (JU.Logger.getTimerMsg ("script", 0));
this.isCmdLine_C_Option = saveLoadCheck;
this.popContext (false, false);
} else {
JU.Logger.error (J.i18n.GT.$ ("script ERROR: ") + this.errorMessage);
this.popContext (false, false);
if (wasScriptCheck) {
this.setErrorMessage (null);
} else {
this.evalError (null, null);
}}this.chk = wasSyntaxCheck;
this.isCmdLine_c_or_C_Option = wasScriptCheck;
}, "~N,~S,~S");
Clazz.defineMethod (c$, "cmdSelect", 
 function (i) {
if (this.slen == 1) {
this.vwr.select (null, false, 0, !this.doReport ());
return;
}if (this.slen == 2 && this.tokAt (1) == 1073742072) return;
var tok = this.tokAt (2);
this.vwr.slm.noneSelected = Boolean.$valueOf (this.slen == 4 && tok == 1073742333);
var bs = null;
switch (tok) {
case 10:
if (Clazz.instanceOf (this.getToken (2).value, JM.BondSet) || this.tokAt (2) == 1677721602 && this.getToken (3).tok == 10) {
if (this.slen != this.iToken + 2) this.invArg ();
if (!this.chk) this.vwr.selectBonds (this.theToken.value);
return;
}break;
case 1745489939:
case 1677721602:
if (this.slen == 5 && this.tokAt (3) == 10) {
bs = this.getToken (3).value;
this.iToken++;
} else if (this.isArrayParameter (4)) {
bs =  new JU.BS ();
var a = this.expandFloatArray (this.floatParameterSet (4, 0, 2147483647), 0);
for (var ii = a.length; --ii >= 0; ) if (a[ii] >= 0) bs.set (a[ii]);

}this.checkLast (this.iToken);
if (this.chk) return;
if (bs == null) this.invArg ();
if (tok == 1745489939) this.setShapeProperty (6, "select", bs);
 else this.vwr.selectBonds (bs);
return;
}
var addRemove = 0;
var isGroup = false;
if (this.getToken (1).intValue == 0 && this.theTok != 1073742334) {
var v = this.parameterExpressionToken (0).value;
if (!(Clazz.instanceOf (v, JU.BS))) this.invArg ();
this.checkLast (this.iToken);
bs = v;
} else {
tok = this.tokAt (i);
switch (tok) {
case 1073742335:
case 1073742334:
if (!this.chk) this.vwr.setSelectionHalosEnabled (tok == 1073742335);
tok = this.tokAt (++i);
if (tok == 0) return;
break;
}
switch (tok) {
case 1275069441:
case 1073742119:
addRemove = tok;
tok = this.tokAt (++i);
}
isGroup = (tok == 1086324742);
if (isGroup) tok = this.tokAt (++i);
bs = this.atomExpressionAt (i);
}if (this.chk) return;
if (this.isBondSet) {
this.vwr.selectBonds (bs);
} else {
if (bs.length () > this.vwr.ms.ac) {
var bs1 = this.vwr.getAllAtoms ();
bs1.and (bs);
bs = bs1;
}this.vwr.select (bs, isGroup, addRemove, !this.doReport ());
}}, "~N");
Clazz.defineMethod (c$, "cmdSelectionHalos", 
 function (pt) {
var showHalo = false;
switch (pt == this.slen ? 1073742335 : this.getToken (pt).tok) {
case 1073742335:
case 1113589787:
showHalo = true;
case 1073742334:
case 1073742333:
case 1073742056:
this.setBooleanProperty ("selectionHalos", showHalo);
break;
default:
this.invArg ();
}
}, "~N");
Clazz.defineMethod (c$, "cmdSet", 
 function () {
if (this.slen == 1) {
this.showString (this.vwr.getAllSettings (null));
return;
}var isJmolSet = (this.paramAsStr (0).equals ("set"));
var key = this.optParameterAsString (1);
if (isJmolSet && this.slen == 2 && key.indexOf ("?") >= 0) {
this.showString (this.vwr.getAllSettings (key.substring (0, key.indexOf ("?"))));
return;
}var tok = this.getToken (1).tok;
var newTok = 0;
var sval;
var ival = 2147483647;
var b;
var pt;
var showing = (!this.chk && this.doReport () && !(this.st[0].value).equals ("var"));
switch (tok) {
case 553648146:
case 603979866:
case 603979903:
case 603979924:
case 603979960:
case 603979962:
case 603979964:
case 603979965:
case 603979970:
if (this.$isStateScript) return;
break;
case 1611272194:
this.cmdAxes (2);
return;
case 1610616835:
this.cmdBackground (2);
return;
case 1678381065:
this.cmdBoundbox (2);
return;
case 1611272202:
this.cmdFrank (2);
return;
case 1610616855:
this.cmdHistory (2);
return;
case 1825200146:
this.cmdLabel (2, null);
return;
case 1814695966:
this.cmdUnitcell (2);
return;
case 536870920:
this.sm.loadShape (8);
this.setShapeProperty (8, "highlight", (this.tokAt (2) == 1073742334 ? null : this.atomExpressionAt (2)));
return;
case 1610625028:
case 1611141171:
this.cmdSelectionHalos (2);
return;
case 536875070:
this.cmdTimeout (2);
return;
case 536870932:
var o = (this.isArrayParameter (2) ? this.floatParameterSet (2, 2, 2) : this.tokAt (2) == 2 ?  Clazz.newFloatArray (-1, [this.intParameter (2), this.intParameter (3)]) : this.stringParameter (2));
this.checkLast (this.iToken);
if (this.chk) return;
if (Clazz.instanceOf (o, String)) {
if (this.vwr.fm.loadImage (o, "\0windowImage", !this.useThreads ())) throw  new JS.ScriptInterruption (this, "windowImage", 1);
} else {
this.vwr.setWindowDimensions (o);
}return;
case 1639976963:
var type = J.c.STR.getProteinStructureType (this.paramAsStr (2));
if (type === J.c.STR.NOT) this.invArg ();
var data = this.floatParameterSet (3, 0, 2147483647);
if (data.length % 4 != 0) this.invArg ();
this.vwr.setStructureList (data, type);
this.checkLast (this.iToken);
return;
case 545259526:
ival = this.getArgbParam (2);
if (!this.chk) this.setObjectArgb ("axes", ival);
return;
case 1610612737:
b = false;
switch (this.getToken (this.checkLast (2)).tok) {
case 268435552:
break;
case 268435536:
b = true;
break;
default:
this.invArg ();
}
this.setBooleanProperty ("bondModeOr", b);
return;
case 536870916:
case 536870917:
if (this.chk) return;
var iLevel = (this.tokAt (2) == 1073742334 || this.tokAt (2) == 2 && this.intParameter (2) == 0 ? 4 : (tok == 536870917 ? 6 : 5));
JU.Logger.setLogLevel (iLevel);
this.setIntProperty ("logLevel", iLevel);
if (iLevel == 4) {
this.vwr.setDebugScript (false);
if (showing) this.vwr.showParameter ("debugScript", true, 80);
}this.setDebugging ();
if (showing) this.vwr.showParameter ("logLevel", true, 80);
return;
case 537022465:
this.cmdSetEcho ();
return;
case 1610612738:
this.cmdFont (5, this.checkLength23 () == 2 ? 0 : this.floatParameter (2));
return;
case 1613238294:
var bool = false;
switch (this.tokAt (this.checkLast (2))) {
case 1114249217:
bool = true;
case 2097178:
this.setBooleanProperty ("hbondsBackbone", bool);
break;
case 1073742150:
bool = true;
case 1073741926:
this.setBooleanProperty ("hbondsSolid", bool);
break;
default:
this.invArg ();
}
return;
case 1745489939:
case 537006096:
switch (tok = this.tokAt (this.checkLast (2))) {
case 1073742335:
case 1073742334:
this.setBooleanProperty ("measurementlabels", tok == 1073742335);
return;
case 1073741926:
case 2:
case 3:
this.vwr.shm.loadShape (6);
var mad10 = this.getSetAxesTypeMad10 (2);
if (mad10 != 2147483647) this.setShapeSizeBs (6, tok == 3 ? Clazz.doubleToInt (mad10 / 10) : mad10, null);
return;
}
this.setUnits (this.paramAsStr (2), 545259568);
return;
case 1611141176:
b = false;
switch (this.tokAt (this.checkLast (2))) {
case 1114249217:
b = true;
break;
case 2097178:
break;
default:
this.invArg ();
}
this.setBooleanProperty ("ssbondsBackbone", b);
return;
case 1610612741:
this.cmdSetLabel ("toggle");
return;
case 536870930:
var v =  new JU.Lst ();
for (var i = 2; i < this.slen; i++) {
var argb = this.getArgbParam (i);
v.addLast (Integer.$valueOf (argb));
i = this.iToken;
}
if (this.chk) return;
var n = v.size ();
var scale =  Clazz.newIntArray (n, 0);
for (var i = n; --i >= 0; ) scale[i] = v.get (i).intValue ();

this.vwr.cm.ce.setUserScale (scale);
return;
case 553648188:
if (this.isFloatParameter (2)) {
this.checkLength (3);
this.setIntProperty ("zSlab", Clazz.floatToInt (this.floatParameter (2)));
pt = null;
} else {
if (!this.isCenterParameter (2)) this.invArg ();
pt = this.centerParameter (2, null);
this.checkLength (this.iToken + 1);
}if (!this.chk) this.vwr.tm.zSlabPoint = (pt == null ? null : JU.P3.newP (pt));
return;
}
var justShow = true;
switch (tok) {
case 536870914:
if (this.slen > 2) {
var modelDotted = this.getSettingStr (2, false);
var modelNumber;
var useModelNumber = false;
if (modelDotted.indexOf (".") < 0) {
modelNumber = JU.PT.parseInt (modelDotted);
useModelNumber = true;
} else {
modelNumber = JS.ScriptParam.getFloatEncodedInt (modelDotted);
}if (this.chk) return;
var modelIndex = this.vwr.ms.getModelNumberIndex (modelNumber, useModelNumber, true);
this.vwr.setBackgroundModelIndex (modelIndex);
return;
}break;
case 1648363544:
if (this.chk) return;
this.vwr.setAtomProperty (this.vwr.getAllAtoms (), 1648363544, -1, NaN, null, null, null);
if (this.slen > 2 && "probe".equalsIgnoreCase (this.getSettingStr (2, false))) {
this.runScript ("#VDW radii for PROBE;{_H}.vdw = 1.0;{_H and connected(_C) and not connected(within(smiles,\'[a]\'))}.vdw = 1.17;{_C}.vdw = 1.75;{_C and connected(3) and connected(_O)}.vdw = 1.65;{_N}.vdw = 1.55;{_O}.vdw = 1.4;{_P}.vdw = 1.8;{_S}.vdw = 1.8;message VDW radii for H, C, N, O, P, and S set according to Word, et al., J. Mol. Biol. (1999) 285, 1711-1733");
return;
}newTok = 545259555;
case 545259555:
if (this.slen > 2) {
sval = this.paramAsStr (2);
if (this.slen == 3 && J.c.VDW.getVdwType (sval) == null && J.c.VDW.getVdwType (sval = this.getSettingStr (2, false)) == null) this.invArg ();
this.setStringProperty (key, sval);
}break;
case 536870918:
if (this.slen > 2) {
var $var = this.parameterExpressionToken (2);
if ($var.tok == 8) pt = $var.value;
 else {
pt =  new JU.P3 ();
var ijk = $var.asInt ();
if (ijk >= 100) JU.SimpleUnitCell.ijkToPoint3f (ijk, pt, -1, 0);
}if (!this.chk) this.vwr.setDefaultLattice (pt);
}break;
case 545259552:
case 545259545:
if (this.slen > 2) {
if ((this.theTok = this.tokAt (2)) == 1073741991 || this.theTok == 1073742116) {
sval = this.paramAsStr (this.checkLast (2));
} else {
sval = this.getSettingStr (2, false);
}this.setStringProperty (key, sval);
}break;
case 1631586315:
ival = this.getSettingInt (2);
if (ival == -2147483648) this.invArg ();
if (!this.chk) this.vwr.ms.setFormalCharges (this.vwr.bsA (), ival);
return;
case 545259563:
if (this.slen > 2) this.setStringProperty (key, this.getSettingStr (2, isJmolSet));
break;
case 545259568:
case 545259558:
if (this.slen > 2) this.setUnits (this.getSettingStr (2, isJmolSet), tok);
break;
case 545259573:
if (!this.chk) this.vwr.setPicked (-1, false);
if (this.slen > 2) {
this.cmdSetPicking ();
return;
}break;
case 545259574:
if (this.slen > 2) {
this.cmdSetPickingStyle ();
return;
}break;
case 1715472409:
break;
case 536870924:
ival = this.getSettingInt (2);
if (ival == -2147483648 || ival == 0 || ival == 1) {
justShow = false;
break;
}tok = 553648174;
key = "specularPercent";
this.setIntProperty (key, ival);
break;
case 1649022989:
tok = 553648178;
key = "strandCount";
this.setIntProperty (key, this.getSettingInt (2));
break;
default:
justShow = false;
}
if (justShow && !showing) return;
var isContextVariable = (!justShow && !isJmolSet && this.getContextVariableAsVariable (key, false) != null);
if (!justShow && !isContextVariable) {
switch (tok) {
case 1677721602:
newTok = 603979928;
break;
case 1612709894:
newTok = 603979908;
break;
case 1612709900:
newTok = 603979910;
break;
case 1610612739:
newTok = 603979878;
break;
case 1665140738:
newTok = 570425394;
this.setFloatProperty ("solventProbeRadius", this.getSettingFloat (2));
justShow = true;
break;
case 1610612740:
newTok = 570425390;
break;
case 1612709912:
newTok = 603979948;
break;
case 1765808134:
newTok = 545259545;
break;
case 1611141175:
sval = this.paramAsStr (2).toLowerCase ();
switch ("x;y;z;fps;".indexOf (sval + ";")) {
case 0:
newTok = 570425398;
break;
case 2:
newTok = 570425400;
break;
case 4:
newTok = 570425402;
break;
case 6:
newTok = 570425396;
break;
default:
this.errorStr2 (50, "set SPIN ", sval);
}
if (!this.chk) this.vwr.setSpin (sval, Clazz.floatToInt (this.floatParameter (this.checkLast (3))));
justShow = true;
break;
}
}if (newTok != 0) {
key = JS.T.nameOf (tok = newTok);
} else if (!justShow && !isContextVariable) {
if (key.length == 0 || key.charAt (0) == '_' && this.tokAt (2) != 268435520) this.error (56);
var lckey = key.toLowerCase ();
if (lckey.indexOf ("label") == 0 && JU.PT.isOneOf (lckey.substring (5), ";front;group;atom;offset;offsetexact;offsetabsolute;pointer;alignment;toggle;scalereference;for;")) {
if (this.cmdSetLabel (lckey.substring (5))) return;
}if (isJmolSet && lckey.indexOf ("shift_") == 0) {
var f = this.floatParameter (2);
this.checkLength (3);
if (!this.chk) this.vwr.getNMRCalculation ().setChemicalShiftReference (lckey.substring (6), f);
return;
}if (lckey.endsWith ("callback")) tok = 536870912;
}if (isJmolSet && !JS.T.tokAttr (tok, 536870912)) {
this.iToken = 1;
if (!this.$isStateScript) this.errorStr2 (50, "SET", key);
this.warning (51, "SET", key);
}if (!justShow && isJmolSet) {
switch (this.slen) {
case 2:
this.setBooleanProperty (key, true);
justShow = true;
break;
case 3:
if (ival != 2147483647) {
this.setIntProperty (key, ival);
justShow = true;
}break;
}
}if (!justShow && !isJmolSet && this.tokAt (2) == 1073742333) {
if (!this.chk) this.vwr.removeUserVariable (key.toLowerCase ());
justShow = true;
}if (!justShow) {
this.setVariable (1, 0, key, true);
if (!isJmolSet) return;
}if (showing) this.vwr.showParameter (key, true, 80);
});
Clazz.defineMethod (c$, "cmdSetEcho", 
 function () {
var propertyName = null;
var propertyValue = null;
var id = null;
var echoShapeActive = true;
var pt = 2;
switch (this.getToken (2).tok) {
case 1073742334:
id = propertyName = "allOff";
this.checkLength (++pt);
break;
case 1073742333:
echoShapeActive = false;
case 1073742327:
id = this.paramAsStr (2);
this.checkLength (++pt);
break;
case 1073741996:
case 12289:
case 1073742126:
case 1073742172:
case 1073742019:
case 1073741871:
case 1073741824:
case 4:
case 1073741974:
if (this.theTok == 1073741974) pt++;
id = this.paramAsStr (pt++);
break;
}
if (!this.chk) {
this.vwr.ms.setEchoStateActive (echoShapeActive);
this.sm.loadShape (31);
if (id != null) this.setShapeProperty (31, propertyName == null ? "target" : propertyName, id);
}if (pt < this.slen) {
switch (this.getToken (pt++).tok) {
case 1073741832:
propertyName = "align";
switch (this.getToken (pt).tok) {
case 1073741996:
case 1073742126:
case 12289:
propertyValue = this.paramAsStr (pt++);
break;
default:
this.invArg ();
}
break;
case 12289:
case 1073741996:
case 1073742126:
propertyName = "align";
propertyValue = this.paramAsStr (pt - 1);
break;
case 554176526:
propertyName = "%zpos";
propertyValue = Integer.$valueOf (Clazz.floatToInt (this.floatParameter (pt++)));
break;
case 1610625028:
case 2097192:
case 1073742335:
propertyName = "hidden";
propertyValue = Boolean.FALSE;
break;
case 12294:
case 2097194:
propertyName = "hidden";
propertyValue = Boolean.TRUE;
break;
case 1094717454:
var modelIndex = (this.chk ? 0 : this.modelNumberParameter (pt++));
if (modelIndex >= this.vwr.ms.mc) this.invArg ();
propertyName = "model";
propertyValue = Integer.$valueOf (modelIndex);
break;
case 268435520:
case 1073742195:
propertyName = "xypos";
propertyValue = this.xypParameter (--pt);
if (propertyValue == null) this.invArg ();
pt = this.iToken + 1;
break;
case 2:
var posx = this.intParameter (pt - 1);
var namex = "xpos";
if (this.tokAt (pt) == 268435634) {
namex = "%xpos";
pt++;
}propertyName = "ypos";
propertyValue = Integer.$valueOf (this.intParameter (pt++));
if (this.tokAt (pt) == 268435634) {
propertyName = "%ypos";
pt++;
}this.checkLength (pt);
this.setShapeProperty (31, namex, Integer.$valueOf (posx));
break;
case 1073742066:
propertyName = "offset";
if (this.isPoint3f (pt)) {
var pt3 = this.getPoint3f (pt, false, true);
propertyValue =  Clazz.newFloatArray (-1, [-1, pt3.x, pt3.y, pt3.z, 0, 0, 0]);
pt = this.iToken + 1;
} else if (this.isArrayParameter (pt)) {
propertyValue = this.floatParameterSet (pt, 7, 7);
pt = this.iToken + 1;
}break;
case 1073742334:
propertyName = "off";
break;
case 1073742138:
propertyName = "scale";
propertyValue = Float.$valueOf (this.floatParameter (pt++));
break;
case 134222850:
propertyName = "script";
propertyValue = this.paramAsStr (pt++);
break;
case 4120:
pt++;
case 4:
var isImage = (this.theTok != 4);
this.checkLength (pt--);
if (isImage) {
if (id == null) {
var data =  new Array (1);
this.getShapePropertyData (31, "currentTarget", data);
id = data[0];
}if (!this.chk && this.vwr.ms.getEchoStateActive () && this.vwr.fm.loadImage (this.getToken (pt).value, id, !this.useThreads ())) throw  new JS.ScriptInterruption (this, "setEchoImage", 1);
return;
}this.cmdEcho (pt);
return;
case 134217751:
propertyName = "point";
propertyValue = (this.isCenterParameter (pt) ? this.centerParameter (pt, null) : null);
pt = this.iToken + 1;
break;
default:
if (this.isCenterParameter (pt - 1)) {
propertyName = "xyz";
propertyValue = this.centerParameter (pt - 1, null);
pt = this.iToken + 1;
break;
}this.invArg ();
}
}this.checkLength (pt);
if (!this.chk && propertyName != null) this.setShapeProperty (31, propertyName, propertyValue);
});
Clazz.defineMethod (c$, "cmdSetLabel", 
 function (str) {
this.sm.loadShape (5);
var propertyValue = null;
this.setShapeProperty (5, "setDefaults", this.vwr.slm.noneSelected);
while (true) {
if (str.equals ("for")) {
var bs = this.atomExpressionAt (2);
this.cmdLabel (this.iToken + 1, bs);
return true;
}if (str.equals ("scalereference")) {
var scaleAngstromsPerPixel = this.floatParameter (2);
if (scaleAngstromsPerPixel >= 5) scaleAngstromsPerPixel = this.vwr.tm.getZoomSetting () / scaleAngstromsPerPixel / this.vwr.getScalePixelsPerAngstrom (false);
propertyValue = Float.$valueOf (scaleAngstromsPerPixel);
break;
}var isAbsolute = false;
if (str.equals ("offset") || (isAbsolute = (str.equals ("offsetabsolute") || str.equals ("offsetexact")))) {
str = "offset";
if (this.isPoint3f (2)) {
var pt = this.getPoint3f (2, false, true);
propertyValue =  Clazz.newFloatArray (-1, [-1, pt.x, pt.y, pt.z, 0, 0, 0]);
} else if (this.isArrayParameter (2)) {
propertyValue = this.floatParameterSet (2, 7, 7);
} else {
var xOffset = this.intParameterRange (2, -500, 500);
var yOffset = this.intParameterRange (3, -500, 500);
if (xOffset == 2147483647 || yOffset == 2147483647) return true;
propertyValue = Integer.$valueOf (JV.JC.getOffset (xOffset, yOffset, isAbsolute));
}break;
}if (str.equals ("alignment")) {
switch (this.getToken (2).tok) {
case 1073741996:
case 1073742126:
case 12289:
str = "align";
propertyValue = this.theToken.value;
break;
default:
this.invArg ();
}
break;
}if (str.equals ("pointer")) {
var flags = 0;
switch (this.getToken (2).tok) {
case 1073742334:
case 1073742333:
break;
case 1610616835:
flags |= 2;
case 1073742335:
flags |= 1;
break;
default:
this.invArg ();
}
propertyValue = Integer.$valueOf (flags);
break;
}if (str.equals ("toggle")) {
this.iToken = 1;
var bs = (this.slen == 2 ? this.vwr.bsA () : this.atomExpressionAt (2));
this.checkLast (this.iToken);
if (this.chk) return true;
this.vwr.shm.loadShape (5);
this.vwr.shm.setShapePropertyBs (5, "toggleLabel", null, bs);
return true;
}this.iToken = 1;
var TF = (this.slen == 2 || this.getToken (2).tok == 1073742335);
if (str.equals ("front") || str.equals ("group")) {
if (!TF && this.tokAt (2) != 1073742334) this.invArg ();
if (!TF) str = "front";
propertyValue = (TF ? Boolean.TRUE : Boolean.FALSE);
break;
}if (str.equals ("atom")) {
if (!TF && this.tokAt (2) != 1073742334) this.invArg ();
str = "front";
propertyValue = (TF ? Boolean.FALSE : Boolean.TRUE);
break;
}return false;
}
var bs = (this.iToken + 1 < this.slen ? this.atomExpressionAt (++this.iToken) : null);
this.checkLast (this.iToken);
if (this.chk) return true;
if (bs == null) this.setShapeProperty (5, str, propertyValue);
 else this.setShapePropertyBs (5, str, propertyValue, bs);
return true;
}, "~S");
Clazz.defineMethod (c$, "cmdSetPicking", 
 function () {
if (this.slen == 2) {
this.setStringProperty ("picking", "identify");
return;
}if (this.slen > 4 || this.tokAt (2) == 4) {
this.setStringProperty ("picking", this.getSettingStr (2, false));
return;
}var i = 2;
var type = "SELECT";
switch (this.getToken (2).tok) {
case 1275082245:
case 1745489939:
case 1611141175:
if (this.checkLength34 () == 4) {
type = this.paramAsStr (2).toUpperCase ();
if (type.equals ("SPIN")) this.setIntProperty ("pickingSpinRate", this.intParameter (3));
 else i = 3;
}break;
case 12291:
break;
default:
this.checkLength (3);
}
var str = this.paramAsStr (i);
switch (this.getToken (i).tok) {
case 1073742335:
case 1073742056:
str = "identify";
break;
case 1073742334:
case 1073742333:
str = "off";
break;
case 1275082245:
str = "atom";
break;
case 1825200146:
str = "label";
break;
case 1677721602:
str = "bond";
break;
case 12291:
this.checkLength (4);
if (this.tokAt (3) != 1677721602) this.invArg ();
str = "deleteBond";
break;
}
var mode = ((mode = str.indexOf ("_")) >= 0 ? mode : str.length);
mode = JV.ActionManager.getPickingMode (str.substring (0, mode));
if (mode < 0) this.errorStr2 (50, "SET PICKING " + type, str);
this.setStringProperty ("picking", str);
});
Clazz.defineMethod (c$, "cmdSetPickingStyle", 
 function () {
if (this.slen > 4 || this.tokAt (2) == 4) {
this.setStringProperty ("pickingStyle", this.getSettingStr (2, false));
return;
}var i = 2;
var isMeasure = false;
var type = "SELECT";
switch (this.getToken (2).tok) {
case 1745489939:
isMeasure = true;
type = "MEASURE";
case 1275082245:
if (this.checkLength34 () == 4) i = 3;
break;
default:
this.checkLength (3);
}
var str = this.paramAsStr (i);
switch (this.getToken (i).tok) {
case 1073742333:
case 1073742334:
str = (isMeasure ? "measureoff" : "toggle");
break;
case 1073742335:
if (isMeasure) str = "measure";
break;
}
if (JV.ActionManager.getPickingStyleIndex (str) < 0) this.errorStr2 (50, "SET PICKINGSTYLE " + type, str);
this.setStringProperty ("pickingStyle", str);
});
Clazz.defineMethod (c$, "cmdSlab", 
 function (isDepth) {
var TF = false;
var plane = null;
var str;
if (this.isCenterParameter (1) || this.tokAt (1) == 9) plane = this.planeParameter (1);
 else switch (this.getToken (1).tok) {
case 2:
var percent = this.intParameter (this.checkLast (1));
if (!this.chk) if (isDepth) this.vwr.tm.depthToPercent (percent);
 else this.vwr.tm.slabToPercent (percent);
return;
case 1073742335:
TF = true;
case 1073742334:
this.checkLength (2);
this.setBooleanProperty ("slabEnabled", TF);
return;
case 4141:
this.checkLength (2);
if (this.chk) return;
this.vwr.tm.slabReset ();
this.setBooleanProperty ("slabEnabled", true);
return;
case 36867:
this.checkLength (2);
if (!this.chk) this.vwr.tm.setSlabDepthInternal (isDepth);
return;
case 268435616:
str = this.paramAsStr (2);
if (str.equalsIgnoreCase ("hkl")) plane = this.hklParameter (3);
 else if (str.equalsIgnoreCase ("plane")) plane = this.planeParameter (2);
if (plane == null) this.invArg ();
plane.scale4 (-1);
break;
case 134217750:
switch (this.getToken (2).tok) {
case 1073742333:
break;
default:
plane = this.planeParameter (1);
}
break;
case 134219265:
plane = (this.getToken (2).tok == 1073742333 ? null : this.hklParameter (2));
break;
case 1073742118:
return;
default:
this.invArg ();
}
if (!this.chk) this.vwr.tm.slabInternal (plane, isDepth);
}, "~B");
Clazz.defineMethod (c$, "cmdSsbond", 
 function () {
var mad = this.getMadParameter ();
if (mad == 2147483647) return;
this.setShapeProperty (1, "type", Integer.$valueOf (256));
this.setShapeSizeBs (1, mad, null);
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
});
Clazz.defineMethod (c$, "cmdStructure", 
 function () {
var type = J.c.STR.getProteinStructureType (this.paramAsStr (1));
if (type === J.c.STR.NOT) this.invArg ();
var bs = null;
switch (this.tokAt (2)) {
case 12290:
case 10:
case 1073742325:
bs = this.atomExpressionAt (2);
this.checkLast (this.iToken);
break;
default:
this.checkLength (2);
}
if (this.chk) return;
this.clearDefinedVariableAtomSets ();
this.vwr.setProteinType (type, bs);
});
Clazz.defineMethod (c$, "cmdSubset", 
 function () {
var bs = null;
if (!this.chk) this.vwr.slm.setSelectionSubset (null);
if (this.slen != 1 && (this.slen != 4 || !this.getToken (2).value.equals ("off"))) bs = this.atomExpressionAt (1);
if (!this.chk) this.vwr.slm.setSelectionSubset (bs);
});
Clazz.defineMethod (c$, "cmdSync", 
 function () {
var text = "";
var applet = "";
var port = JU.PT.parseInt (this.optParameterAsString (1));
if (port == -2147483648) {
this.checkLength (-3);
port = 0;
switch (this.slen) {
case 1:
applet = "*";
text = "ON";
break;
case 2:
applet = this.paramAsStr (1);
if (applet.indexOf ("jmolApplet") == 0 || JU.PT.isOneOf (applet, ";*;.;^;")) {
text = "ON";
if (!this.chk) this.vwr.syncScript (text, applet, 0);
applet = ".";
break;
}text = applet;
applet = "*";
break;
case 3:
applet = this.paramAsStr (1);
text = (this.tokAt (2) == 528443 ? "GET_GRAPHICS" : this.paramAsStr (2));
break;
}
} else {
var v = null;
if (this.slen > 2 && (v = this.setVariable (2, -1, "", false)) == null) return;
text = (this.slen == 2 ? null : v.tok == 6 ? v.toJSON () : v.asString ());
applet = null;
}if (this.chk) return;
this.vwr.syncScript (text, applet, port);
});
Clazz.defineMethod (c$, "cmdThrow", 
 function () {
if (this.chk) return;
var pt = (this.tokAt (1) == 14 ? 2 : 1);
var v = (pt == 1 ? this.setVariable (1, this.slen, "thrown_value", false) : this.vwr.g.setUserVariable ("thrown_value", JS.SV.newS (this.optParameterAsString (2))));
var info = v.asString ();
if (info.length == 0 && (info = this.optParameterAsString (1)).length == 0) info = "context";
if (pt == 2) {
this.saveContext (info);
if (this.doReport ()) this.report (J.i18n.GT.o (J.i18n.GT.$ ("to resume, enter: &{0}"), info), false);
throw  new JS.ScriptInterruption (this, info, -2147483648);
}this.evalError (info, null);
});
Clazz.defineMethod (c$, "saveContext", 
 function (saveName) {
var sc = this.getScriptContext ("Context_" + saveName);
this.vwr.stm.saveContext (saveName, sc);
this.vwr.g.setUserVariable (saveName, JS.SV.newV (14, sc));
return sc;
}, "~S");
Clazz.defineMethod (c$, "cmdTimeout", 
 function (index) {
var name = null;
var script = null;
var mSec = 0;
if (this.slen == index) {
this.showString (this.vwr.showTimeout (null));
return;
}for (var i = index; i < this.slen; i++) switch (this.getToken (i).tok) {
case 1073741974:
name = this.paramAsStr (++i);
if (this.slen == 3) {
if (!this.chk) this.vwr.triggerTimeout (name);
return;
}break;
case 1073742334:
break;
case 2:
mSec = this.intParameter (i);
break;
case 3:
mSec = Math.round (this.floatParameter (i) * 1000);
break;
default:
if (name == null) name = this.paramAsStr (i);
 else if (script == null) script = this.paramAsStr (i);
 else this.invArg ();
break;
}

if (!this.chk) this.vwr.setTimeout (name, mSec, script);
}, "~N");
Clazz.defineMethod (c$, "cmdTranslate", 
 function (isSelected) {
var bs = null;
var i = 1;
var i0 = 0;
if (this.tokAt (1) == 1113589787) {
isSelected = true;
i0 = 1;
i = 2;
}if (this.isPoint3f (i)) {
var pt = this.getPoint3f (i, true, true);
bs = (this.iToken + 1 < this.slen ? this.atomExpressionAt (++this.iToken) : null);
this.checkLast (this.iToken);
if (!this.chk) this.vwr.setAtomCoordsRelative (pt, bs);
return;
}var xyz = (this.paramAsStr (i).toLowerCase () + " ").charAt (0);
if ("xyz".indexOf (xyz) < 0) this.error (0);
var amount = this.floatParameter (++i);
var type;
switch (this.tokAt (++i)) {
case 0:
case 12290:
case 10:
case 1073742325:
type = '\0';
break;
default:
type = (this.optParameterAsString (i).toLowerCase () + '\0').charAt (0);
}
if (amount == 0 && type != '\0') return;
this.iToken = i0 + (type == '\0' ? 2 : 3);
bs = (isSelected ? this.vwr.bsA () : this.iToken + 1 < this.slen ? this.atomExpressionAt (++this.iToken) : null);
this.checkLast (this.iToken);
if (!this.chk) {
this.vwr.translate (xyz, amount, type, bs);
this.refresh (false);
}}, "~B");
Clazz.defineMethod (c$, "cmdUnbind", 
 function () {
if (this.slen != 1) this.checkLength23 ();
var mouseAction = this.optParameterAsString (1);
var name = this.optParameterAsString (2);
if (mouseAction.length == 0 || this.tokAt (1) == 1073742327) mouseAction = null;
if (name.length == 0 || this.tokAt (2) == 1073742327) name = null;
if (name == null && mouseAction != null && JV.ActionManager.getActionFromName (mouseAction) >= 0) {
name = mouseAction;
mouseAction = null;
}if (!this.chk) this.vwr.unBindAction (mouseAction, name);
});
Clazz.defineMethod (c$, "cmdUndoRedoMove", 
 function () {
var n = 1;
var len = 2;
switch (this.tokAt (1)) {
case 0:
len = 1;
break;
case 1073742327:
n = 0;
break;
case 2:
n = this.intParameter (1);
break;
default:
this.invArg ();
}
this.checkLength (len);
if (!this.chk) this.vwr.undoMoveAction (this.tokAt (0), n);
});
Clazz.defineMethod (c$, "setCurrentCagePts", 
function (originABC, name) {
var sym = J.api.Interface.getSymmetry (this.vwr, "eval");
if (sym == null && this.vwr.async) throw  new NullPointerException ();
try {
this.vwr.ms.setModelCage (this.vwr.am.cmi, originABC == null ? null : sym.getUnitCell (originABC, false, name));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~A,~S");
Clazz.defineMethod (c$, "cmdUnitcell", 
 function (i) {
this.getCmdExt ().dispatch (1814695966, i == 2, null);
}, "~N");
Clazz.defineMethod (c$, "cmdVector", 
 function () {
var type = J.atomdata.RadiusData.EnumType.SCREEN;
var value = 1;
this.checkLength (-3);
switch (this.iToken = this.slen) {
case 1:
break;
case 2:
switch (this.getToken (1).tok) {
case 1073742335:
break;
case 1073742334:
value = 0;
break;
case 2:
var d = this.intParameterRange (1, 0, 19);
if (d == 2147483647) return;
value = d;
break;
case 3:
type = J.atomdata.RadiusData.EnumType.ABSOLUTE;
if (Float.isNaN (value = this.floatParameterRange (1, 0, 3))) return;
break;
default:
this.error (6);
}
break;
case 3:
switch (this.tokAt (1)) {
case 1112152078:
this.setIntProperty ("vectorTrace", this.intParameterRange (2, 0, 20));
return;
case 1073742138:
if (!Float.isNaN (value = this.floatParameterRange (2, -100, 100))) this.setFloatProperty ("vectorScale", value);
return;
case 64:
var max = this.floatParameter (2);
if (!this.chk) this.vwr.ms.scaleVectorsToMax (max);
return;
}
break;
}
this.setShapeSize (18,  new J.atomdata.RadiusData (null, value, type, null));
});
Clazz.defineMethod (c$, "cmdVibration", 
 function () {
this.checkLength (-3);
var period = 0;
switch (this.getToken (1).tok) {
case 1073742335:
this.checkLength (2);
period = this.vwr.getFloat (570425412);
break;
case 1073742334:
this.checkLength (2);
period = 0;
break;
case 2:
case 3:
this.checkLength (2);
period = this.floatParameter (1);
break;
case 1073742138:
if (!Float.isNaN (period = this.floatParameterRange (2, -100, 100))) this.setFloatProperty ("vibrationScale", period);
return;
case 64:
var max = this.floatParameter (2);
if (!this.chk) this.vwr.ms.scaleVectorsToMax (max);
break;
case 1073742090:
this.setFloatProperty ("vibrationPeriod", this.floatParameter (2));
return;
case 1073741824:
this.invArg ();
break;
default:
period = -1;
}
if (period < 0) this.invArg ();
if (this.chk) return;
if (period == 0) {
this.vwr.tm.setVibrationPeriod (0);
return;
}this.vwr.setVibrationPeriod (-period);
});
Clazz.defineMethod (c$, "cmdWireframe", 
 function () {
var mad = -2147483648;
if (this.tokAt (1) == 4141) this.checkLast (1);
 else mad = this.getMadParameter ();
if (this.chk || mad == 2147483647) return;
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
this.setShapeSizeBs (1, mad == -2147483648 ? 300 : mad, null);
});
Clazz.defineMethod (c$, "cmdZap", 
 function (isZapCommand) {
if (this.slen == 1 || !isZapCommand) {
var doAll = (isZapCommand && !this.$isStateScript);
if (doAll) this.vwr.cacheFileByName (null, false);
this.vwr.zap (true, doAll, true);
this.refresh (false);
return;
}var bs = this.atomExpressionAt (1);
if (this.chk) return;
if (bs.nextSetBit (0) < 0 && this.slen == 4 && this.tokAt (2) == 1073742359) {
var iModel = this.vwr.ms.getModelNumberIndex (this.getToken (2).intValue, false, true);
if (iModel >= 0) this.vwr.deleteModels (iModel, null);
return;
}var nDeleted = this.vwr.deleteAtoms (bs, true);
var isQuiet = !this.doReport ();
if (!isQuiet) this.report (J.i18n.GT.i (J.i18n.GT.$ ("{0} atoms deleted"), nDeleted), false);
this.vwr.select (null, false, 0, isQuiet);
}, "~B");
Clazz.defineMethod (c$, "cmdZoom", 
 function (isZoomTo) {
if (!isZoomTo) {
var tok = (this.slen > 1 ? this.getToken (1).tok : 1073742335);
switch (tok) {
case 1275068432:
case 1073742079:
break;
case 1073742335:
case 1073742334:
if (this.slen > 2) this.bad ();
if (!this.chk) this.setBooleanProperty ("zoomEnabled", tok == 1073742335);
return;
}
}var center = null;
var i = 1;
var floatSecondsTotal = (isZoomTo ? (this.isFloatParameter (i) ? this.floatParameter (i++) : 1) : 0);
if (floatSecondsTotal < 0) {
i--;
floatSecondsTotal = 0;
}var ptCenter = 0;
var bsCenter = null;
if (this.isCenterParameter (i)) {
ptCenter = i;
var ret =  new Array (1);
center = this.centerParameter (i, ret);
if (Clazz.instanceOf (ret[0], JU.BS)) bsCenter = ret[0];
i = this.iToken + 1;
} else if (this.tokAt (i) == 2 && this.getToken (i).intValue == 0) {
bsCenter = this.vwr.getAtomBitSet ("visible");
center = this.vwr.ms.getAtomSetCenter (bsCenter);
}var isSameAtom = false;
var zoom = this.vwr.tm.getZoomSetting ();
var newZoom = this.getZoom (ptCenter, i, bsCenter, zoom);
i = this.iToken + 1;
var xTrans = NaN;
var yTrans = NaN;
if (i != this.slen) {
xTrans = this.floatParameter (i++);
yTrans = this.floatParameter (i++);
}if (i != this.slen) this.invArg ();
if (newZoom < 0) {
newZoom = -newZoom;
if (isZoomTo) {
if (this.slen == 1 || isSameAtom) newZoom *= 2;
 else if (center == null) newZoom /= 2;
}}var max = 200000;
if (newZoom < 5 || newZoom > max) this.numberOutOfRange (5, max);
if (!this.vwr.tm.isWindowCentered ()) {
if (center != null) {
var bs = this.atomExpressionAt (ptCenter);
if (!this.chk) this.vwr.setCenterBitSet (bs, false);
}center = this.vwr.tm.fixedRotationCenter;
if (Float.isNaN (xTrans)) xTrans = this.vwr.tm.getTranslationXPercent ();
if (Float.isNaN (yTrans)) yTrans = this.vwr.tm.getTranslationYPercent ();
}if (this.chk) return;
if (Float.isNaN (xTrans)) xTrans = 0;
if (Float.isNaN (yTrans)) yTrans = 0;
if (isSameAtom && Math.abs (zoom - newZoom) < 1 || !this.useThreads ()) floatSecondsTotal = 0;
this.vwr.moveTo (this, floatSecondsTotal, center, JV.JC.center, NaN, null, newZoom, xTrans, yTrans, NaN, null, NaN, NaN, NaN, NaN, NaN, NaN);
if (this.isJS && floatSecondsTotal > 0 && this.vwr.g.waitForMoveTo) throw  new JS.ScriptInterruption (this, "zoomTo", 1);
}, "~B");
Clazz.defineMethod (c$, "colorShape", 
 function (shapeType, index, isBackground) {
var translucency = null;
var colorvalue = null;
var colorvalue1 = null;
var bs = null;
var prefix = (index == 2 && this.tokAt (1) == 1073741859 ? "ball" : "");
var isColor = false;
var isIsosurface = (shapeType == 24 || shapeType == 25);
var typeMask = 0;
var doClearBondSet = false;
var translucentLevel = 3.4028235E38;
if (index < 0) {
bs = this.atomExpressionAt (-index);
index = this.iToken + 1;
if (this.isBondSet) {
doClearBondSet = true;
shapeType = 1;
}}var tok = this.getToken (index).tok;
if (isBackground) this.getToken (index);
 else if ((isBackground = (tok == 1610616835)) == true) this.getToken (++index);
if (isBackground) prefix = "bg";
 else if (isIsosurface) {
switch (this.theTok) {
case 1073742018:
this.getToken (++index);
prefix = "mesh";
break;
case 1073742094:
var argb = this.getArgbParamOrNone (++index, false);
colorvalue1 = (argb == 0 ? null : Integer.$valueOf (argb));
this.getToken (index = this.iToken + 1);
break;
case 12290:
case 10:
case 1073742325:
if (Clazz.instanceOf (this.theToken.value, JM.BondSet)) {
bs = this.theToken.value;
prefix = "vertex";
} else {
bs = this.atomExpressionAt (index);
prefix = "atom";
}this.getToken (index = this.iToken + 1);
break;
}
}if (!this.chk && (shapeType == 27 || shapeType == 28) && this.getIsoExt ().dispatch (shapeType, true, this.st) != null) return;
var isTranslucent = (this.theTok == 603979967);
if (isTranslucent || this.theTok == 1073742074) {
if (translucentLevel == 1.4E-45) this.invArg ();
translucency = this.paramAsStr (index++);
if (isTranslucent && this.isFloatParameter (index)) translucentLevel = this.getTranslucentLevel (index++);
}tok = 0;
if (index < this.slen && this.tokAt (index) != 1073742335 && this.tokAt (index) != 1073742334) {
isColor = true;
tok = this.getToken (index).tok;
if ((!isIsosurface || this.tokAt (index + 1) != 1073742170) && this.isColorParam (index)) {
var argb = this.getArgbParamOrNone (index, false);
colorvalue = (argb == 0 ? null : Integer.$valueOf (argb));
if (this.tokAt (index = this.iToken + 1) != 0 && translucency == null) {
this.getToken (index);
isTranslucent = (this.theTok == 603979967);
if (isTranslucent || this.theTok == 1073742074) {
translucency = this.paramAsStr (index++);
if (isTranslucent && this.isFloatParameter (index)) translucentLevel = this.getTranslucentLevel (index++);
}}if (this.isColorParam (index)) {
argb = this.getArgbParamOrNone (index, false);
colorvalue1 = (argb == 0 ? null : Integer.$valueOf (argb));
index = this.iToken + 1;
}this.checkLength (index);
} else if (shapeType == 26) {
this.iToken--;
} else {
var name = this.paramAsStr (index).toLowerCase ();
var isByElement = (name.indexOf ("byelement") == 0);
var isColorIndex = (isByElement || name.indexOf ("byresidue") == 0);
var pal = (isColorIndex || isIsosurface ? J.c.PAL.PROPERTY : tok == 1112152075 ? J.c.PAL.CPK : J.c.PAL.getPalette (name));
if (pal === J.c.PAL.UNKNOWN || (pal === J.c.PAL.TYPE || pal === J.c.PAL.ENERGY) && shapeType != 2) this.invArg ();
var data = null;
var bsSelected = (pal !== J.c.PAL.PROPERTY && pal !== J.c.PAL.VARIABLE || !this.vwr.g.rangeSelected ? null : this.vwr.bsA ());
if (pal === J.c.PAL.PROPERTY) {
if (isColorIndex) {
if (!this.chk) {
data = this.getCmdExt ().getBitsetPropertyFloat (bsSelected, (isByElement ? 1094715402 : 1094713356) | 256, null, NaN, NaN);
}} else {
var isPropertyExplicit = name.equals ("property");
if (isPropertyExplicit && JS.T.tokAttr ((tok = this.getToken (++index).tok), 1077936128) && !JS.T.tokAttr (tok, 1086324736)) {
tok = this.getToken (index).tok;
var type = (tok == 1111490587 ? this.getToken (++index).value.toString () : null);
if (!this.chk) {
data = this.getCmdExt ().getBitsetPropertyFloat (bsSelected, tok | 256, type, NaN, NaN);
}index++;
} else if (!isPropertyExplicit && !isIsosurface) {
index++;
}}} else if (pal === J.c.PAL.VARIABLE) {
index++;
name = this.paramAsStr (index++);
data =  Clazz.newFloatArray (this.vwr.ms.ac, 0);
JU.Parser.parseStringInfestedFloatArray ("" + this.getParameter (name, 4, true), null, data);
pal = J.c.PAL.PROPERTY;
}if (pal === J.c.PAL.PROPERTY) {
var scheme = null;
if (this.tokAt (index) == 4) {
scheme = this.paramAsStr (index++).toLowerCase ();
if (this.isArrayParameter (index)) {
scheme += "=" + JS.SV.sValue (JS.SV.getVariableAS (this.stringParameterSet (index))).$replace ('\n', ' ');
index = this.iToken + 1;
}} else if (isIsosurface && this.isColorParam (index)) {
scheme = this.getColorRange (index);
index = this.iToken + 1;
}if (scheme != null && !isIsosurface) {
this.setStringProperty ("propertyColorScheme", (isTranslucent && translucentLevel == 3.4028235E38 ? "translucent " : "") + scheme);
isColorIndex = (scheme.indexOf ("byelement") == 0 || scheme.indexOf ("byresidue") == 0);
}var min = 0;
var max = 3.4028235E38;
if (!isColorIndex && (this.tokAt (index) == 1073741826 || this.tokAt (index) == 1073742114)) {
min = this.floatParameter (index + 1);
max = this.floatParameter (index + 2);
index += 3;
if (min == max && isIsosurface) {
var range = this.getShapeProperty (shapeType, "dataRange");
if (range != null) {
min = range[0];
max = range[1];
}} else if (min == max) {
max = 3.4028235E38;
}}if (isIsosurface) {
} else if (data == null) {
if (!this.chk) this.vwr.setCurrentColorRange (name);
} else {
if (!this.chk) this.vwr.cm.setPropertyColorRangeData (data, bsSelected);
}if (isIsosurface) {
this.checkLength (index);
if (this.chk) return;
isColor = false;
var ce = (scheme == null ? this.getShapeProperty (shapeType, "colorEncoder") : null);
if (ce == null && (ce = this.vwr.cm.getColorEncoder (scheme)) == null) return;
ce.isTranslucent = (isTranslucent && translucentLevel == 3.4028235E38);
ce.setRange (min, max, min > max);
if (max == 3.4028235E38) ce.hi = max;
this.setShapeProperty (shapeType, "remapColor", ce);
this.showString ((this.getShapeProperty (shapeType, "dataRangeStr")).$replace ('\n', ' '));
if (translucentLevel == 3.4028235E38) return;
} else if (max != 3.4028235E38) {
this.vwr.cm.setPropertyColorRange (min, max);
}} else {
index++;
}this.checkLength (index);
colorvalue = pal;
}}if (this.chk || shapeType < 0) return;
switch (shapeType) {
case 4:
typeMask = 32768;
break;
case 2:
typeMask = 30720;
break;
case 3:
typeMask = 256;
break;
case 1:
typeMask = 1023;
break;
default:
typeMask = 0;
}
if (typeMask == 0) {
this.sm.loadShape (shapeType);
if (shapeType == 5) this.setShapeProperty (5, "setDefaults", this.vwr.slm.noneSelected);
} else {
if (bs != null) {
this.vwr.selectBonds (bs);
bs = null;
}shapeType = 1;
this.setShapeProperty (shapeType, "type", Integer.$valueOf (typeMask));
}if (isColor) {
switch (tok) {
case 1111492619:
this.getPartialCharges (bs);
break;
case 1111490575:
case 1111490574:
this.vwr.autoCalculate (tok, null);
break;
case 1111492620:
if (this.vwr.g.rangeSelected) this.vwr.ms.clearBfactorRange ();
break;
case 1086324742:
this.vwr.ms.calcSelectedGroupsCount ();
break;
case 1094713362:
case 1094713361:
this.vwr.ms.calcSelectedMonomersCount ();
break;
case 1094713360:
this.vwr.ms.calcSelectedMoleculesCount ();
break;
}
if (colorvalue1 != null && (isIsosurface || shapeType == 11 || shapeType == 14 || shapeType == 21)) this.setShapeProperty (shapeType, "colorPhase",  Clazz.newArray (-1, [colorvalue1, colorvalue]));
 else if (bs == null) this.setShapeProperty (shapeType, prefix + "color", colorvalue);
 else this.setShapePropertyBs (shapeType, prefix + "color", colorvalue, bs);
}if (translucency != null) this.setShapeTranslucency (shapeType, prefix, translucency, translucentLevel, bs);
if (typeMask != 0) this.setShapeProperty (1, "type", Integer.$valueOf (1023));
if (doClearBondSet) this.vwr.selectBonds (null);
if (shapeType == 0) this.vwr.shm.checkInheritedShapes ();
}, "~N,~N,~B");
Clazz.defineMethod (c$, "getPartialCharges", 
function (bs) {
try {
this.vwr.getOrCalcPartialCharges (bs, null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new JS.ScriptInterruption (this, "partialcharge", 1);
} else {
throw e;
}
}
}, "JU.BS");
Clazz.defineMethod (c$, "encodeRadiusParameter", 
function (index, isOnly, allowAbsolute) {
var value = NaN;
var factorType = J.atomdata.RadiusData.EnumType.ABSOLUTE;
var vdwType = null;
var tok = (index == -1 ? 1648363544 : this.getToken (index).tok);
switch (tok) {
case 1111490561:
case 1111490562:
case 1111492618:
case 1113589786:
case 1111492620:
case 1648363544:
value = 1;
factorType = J.atomdata.RadiusData.EnumType.FACTOR;
vdwType = (tok == 1648363544 ? null : J.c.VDW.getVdwType2 (JS.T.nameOf (tok)));
tok = this.tokAt (++index);
break;
}
switch (tok) {
case 4141:
return this.vwr.rd;
case 1073741852:
case 1073742116:
case 1073741856:
case 1073741857:
case 1073741991:
value = 1;
factorType = J.atomdata.RadiusData.EnumType.FACTOR;
this.iToken = index - 1;
break;
case 268435617:
case 2:
case 3:
if (tok == 268435617) {
index++;
} else if (this.tokAt (index + 1) == 268435634) {
value = Math.round (this.floatParameter (index));
this.iToken = ++index;
factorType = J.atomdata.RadiusData.EnumType.FACTOR;
if (value < 0 || value > 200) {
this.integerOutOfRange (0, 200);
return null;
}value /= 100;
break;
} else if (tok == 2) {
value = this.intParameter (index);
if (value > 749 || value < -200) {
this.integerOutOfRange (-200, 749);
return null;
}if (value > 0) {
value /= 250;
factorType = J.atomdata.RadiusData.EnumType.ABSOLUTE;
} else {
value /= -100;
factorType = J.atomdata.RadiusData.EnumType.FACTOR;
}break;
}var max;
if (tok == 268435617 || !allowAbsolute) {
factorType = J.atomdata.RadiusData.EnumType.OFFSET;
max = 16;
} else {
factorType = J.atomdata.RadiusData.EnumType.ABSOLUTE;
vdwType = J.c.VDW.NADA;
max = 100;
}value = this.floatParameterRange (index, (isOnly || !allowAbsolute ? -max : 0), max);
if (Float.isNaN (value)) return null;
if (isOnly) value = -value;
if (value > 16) value = 16.1;
break;
default:
if (value == 1) index--;
}
if (vdwType == null) {
vdwType = J.c.VDW.getVdwType (this.optParameterAsString (++this.iToken));
if (vdwType == null) {
this.iToken = index;
vdwType = J.c.VDW.AUTO;
}}return  new J.atomdata.RadiusData (null, value, factorType, vdwType);
}, "~N,~B,~B");
Clazz.defineMethod (c$, "expandFloatArray", 
function (a, min) {
var n = a.length;
var haveNeg = false;
try {
for (var i = 0; i < a.length; i++) if (a[i] < 0) {
n += Math.abs (a[i - 1] + a[i]) - 1;
haveNeg = true;
}
if (haveNeg) {
var b =  Clazz.newFloatArray (n, 0);
for (var pt = 0, i = 0; i < a.length; i++) {
n = Clazz.floatToInt (a[i]);
if (n >= 0) {
if (n < min) this.invArg ();
b[pt++] = n;
} else {
var dif = Clazz.floatToInt (a[i - 1] + n);
var dir = (dif < 0 ? 1 : -1);
for (var j = Clazz.floatToInt (a[i - 1]); j != -a[i]; j += dir, pt++) b[pt] = b[pt - 1] + dir;

}}
a = b;
n = a.length;
}var ia =  Clazz.newIntArray (n, 0);
for (var i = n; --i >= 0; ) ia[i] = Clazz.floatToInt (a[i]);

return ia;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.invArg ();
return null;
} else {
throw e;
}
}
}, "~A,~N");
Clazz.defineMethod (c$, "frameControl", 
 function (i) {
switch (this.getToken (this.checkLast (i)).tok) {
case 1073742098:
case 1073742096:
case 4143:
case 20487:
case 1073742037:
case 1073742108:
case 1073742125:
case 1073741942:
case 1073741993:
if (!this.chk) this.vwr.setAnimation (this.theTok);
return;
}
this.invArg ();
}, "~N");
Clazz.defineMethod (c$, "getColorRange", 
function (i) {
var color1 = this.getArgbParam (i);
if (this.tokAt (++this.iToken) != 1073742170) this.invArg ();
var color2 = this.getArgbParam (++this.iToken);
var nColors = (this.tokAt (this.iToken + 1) == 2 ? this.intParameter (++this.iToken) : 0);
return JU.ColorEncoder.getColorSchemeList (JU.ColorEncoder.getPaletteAtoB (color1, color2, nColors));
}, "~N");
Clazz.defineMethod (c$, "getFullPathName", 
function () {
var filename = (!this.chk || this.isCmdLine_C_Option ? this.vwr.fm.getFullPathName (true) : "test.xyz");
if (filename == null) this.invArg ();
return filename;
});
Clazz.defineMethod (c$, "getObjectBoundingBox", 
 function (id) {
var data =  Clazz.newArray (-1, [id, null, null]);
return (this.getShapePropertyData (24, "getBoundingBox", data) || this.getShapePropertyData (29, "getBoundingBox", data) || this.getShapePropertyData (25, "getBoundingBox", data) || this.getShapePropertyData (28, "getBoundingBox", data) || this.getShapePropertyData (27, "getBoundingBox", data) ? data[2] : null);
}, "~S");
Clazz.defineMethod (c$, "getObjectCenter", 
function (axisID, index, modelIndex) {
var data =  Clazz.newArray (-1, [axisID, Integer.$valueOf (index), Integer.$valueOf (modelIndex)]);
return (this.getShapePropertyData (22, "getCenter", data) || this.getShapePropertyData (24, "getCenter", data) || this.getShapePropertyData (29, "getCenter", data) || this.getShapePropertyData (25, "getCenter", data) || this.getShapePropertyData (28, "getCenter", data) || this.getShapePropertyData (27, "getCenter", data) ? data[2] : null);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "getPlaneForObject", 
function (id, vAB) {
var shapeType = this.sm.getShapeIdFromObjectName (id);
switch (shapeType) {
case 22:
this.setShapeProperty (22, "thisID", id);
var points = this.getShapeProperty (22, "vertices");
if (points == null || points.length < 3 || points[0] == null || points[1] == null || points[2] == null) break;
return JU.Measure.getPlaneThroughPoints (points[0], points[1], points[2],  new JU.V3 (), vAB,  new JU.P4 ());
case 24:
this.setShapeProperty (24, "thisID", id);
return this.getShapeProperty (24, "plane");
}
return null;
}, "~S,JU.V3");
Clazz.defineMethod (c$, "getQuaternionArray", 
function (quaternionOrSVData, itype) {
var data;
switch (itype) {
case 134221850:
data = quaternionOrSVData;
break;
case 9:
var pts = quaternionOrSVData;
data =  new Array (pts.length);
for (var i = 0; i < pts.length; i++) data[i] = JU.Quat.newP4 (pts[i]);

break;
case 1073742001:
var sv = quaternionOrSVData;
data =  new Array (sv.size ());
for (var i = 0; i < sv.size (); i++) {
var pt = JS.SV.pt4Value (sv.get (i));
if (pt == null) return null;
data[i] = JU.Quat.newP4 (pt);
}
break;
default:
return null;
}
return data;
}, "~O,~N");
Clazz.defineMethod (c$, "getSetAxesTypeMad10", 
function (index) {
if (index == this.slen) return 1;
switch (this.getToken (this.checkLast (index)).tok) {
case 1073742335:
return 1;
case 1073742334:
return 0;
case 1073741926:
return -1;
case 2:
return this.intParameterRange (index, -1, 19);
case 3:
var angstroms = this.floatParameterRange (index, 0, 2);
return (Float.isNaN (angstroms) ? 2147483647 : Clazz.doubleToInt (Math.floor (angstroms * 10000 * 2)));
}
if (!this.chk) this.errorStr (7, "\"DOTTED\"");
return 0;
}, "~N");
Clazz.defineMethod (c$, "getSettingFloat", 
 function (pt) {
return (pt >= this.slen ? NaN : JS.SV.fValue (this.parameterExpressionToken (pt)));
}, "~N");
Clazz.defineMethod (c$, "getSettingInt", 
 function (pt) {
return (pt >= this.slen ? -2147483648 : this.parameterExpressionToken (pt).asInt ());
}, "~N");
Clazz.defineMethod (c$, "getSettingStr", 
 function (pt, isJmolSet) {
return (isJmolSet && this.slen == pt + 1 ? this.paramAsStr (pt) : this.parameterExpressionToken (pt).asString ());
}, "~N,~B");
Clazz.defineMethod (c$, "getShapeProperty", 
function (shapeType, propertyName) {
return this.sm.getShapePropertyIndex (shapeType, propertyName, -2147483648);
}, "~N,~S");
Clazz.defineMethod (c$, "getShapePropertyData", 
function (shapeType, propertyName, data) {
return this.sm.getShapePropertyData (shapeType, propertyName, data);
}, "~N,~S,~A");
Clazz.defineMethod (c$, "getShapeType", 
 function (tok) {
var iShape = JV.JC.shapeTokenIndex (tok);
if (iShape < 0) this.error (49);
return iShape;
}, "~N");
Clazz.defineMethod (c$, "getTranslucentLevel", 
function (i) {
var f = this.floatParameter (i);
return (this.theTok == 2 && f > 0 && f < 9 ? f + 1 : f);
}, "~N");
Clazz.defineMethod (c$, "getZoom", 
 function (ptCenter, i, bs, currentZoom) {
var zoom = (this.isFloatParameter (i) ? this.floatParameter (i++) : NaN);
if (zoom == 0 || currentZoom == 0) {
var r = NaN;
if (bs == null) {
if (this.tokAt (ptCenter) == 1073742330) {
var bbox = this.getObjectBoundingBox (this.objectNameParameter (ptCenter + 1));
if (bbox == null || (r = bbox[0].distance (bbox[1]) / 2) == 0) this.invArg ();
}} else {
r = this.vwr.ms.calcRotationRadiusBs (bs);
}if (Float.isNaN (r)) this.invArg ();
currentZoom = this.vwr.getFloat (570425388) / r * 100;
zoom = NaN;
}if (zoom < 0) {
zoom += currentZoom;
} else if (Float.isNaN (zoom)) {
var tok = this.tokAt (i);
switch (tok) {
case 1073742079:
case 1275068432:
zoom = currentZoom * (tok == 1073742079 ? 0.5 : 2);
i++;
break;
case 268435632:
case 268435633:
case 268435617:
var value = this.floatParameter (++i);
i++;
switch (tok) {
case 268435632:
zoom = currentZoom / value;
break;
case 268435633:
zoom = currentZoom * value;
break;
case 268435617:
zoom = currentZoom + value;
break;
}
break;
default:
zoom = (bs == null ? -currentZoom : currentZoom);
}
}this.iToken = i - 1;
return zoom;
}, "~N,~N,JU.BS,~N");
Clazz.defineMethod (c$, "setElementColor", 
 function (str, argb) {
for (var i = JU.Elements.elementNumberMax; --i >= 0; ) {
if (str.equalsIgnoreCase (JU.Elements.elementNameFromNumber (i))) {
if (!this.chk) this.vwr.setElementArgb (i, argb);
return true;
}}
for (var i = JU.Elements.altElementMax; --i >= 0; ) {
if (str.equalsIgnoreCase (JU.Elements.altElementNameFromIndex (i))) {
if (!this.chk) this.vwr.setElementArgb (JU.Elements.altElementNumberFromIndex (i), argb);
return true;
}}
if (str.charAt (0) != '_') return false;
for (var i = JU.Elements.elementNumberMax; --i >= 0; ) {
if (str.equalsIgnoreCase ("_" + JU.Elements.elementSymbolFromNumber (i))) {
if (!this.chk) this.vwr.setElementArgb (i, argb);
return true;
}}
for (var i = JU.Elements.altElementMax; --i >= 4; ) {
if (str.equalsIgnoreCase ("_" + JU.Elements.altElementSymbolFromIndex (i))) {
if (!this.chk) this.vwr.setElementArgb (JU.Elements.altElementNumberFromIndex (i), argb);
return true;
}if (str.equalsIgnoreCase ("_" + JU.Elements.altIsotopeSymbolFromIndex (i))) {
if (!this.chk) this.vwr.setElementArgb (JU.Elements.altElementNumberFromIndex (i), argb);
return true;
}}
return false;
}, "~S,~N");
Clazz.defineMethod (c$, "setMeshDisplayProperty", 
function (shape, i, tok) {
var propertyName = null;
var propertyValue = null;
var allowCOLOR = (shape == 25);
var checkOnly = (i == 0);
if (!checkOnly) tok = this.getToken (i).tok;
switch (tok) {
case 1765808134:
if (allowCOLOR) this.iToken++;
 else break;
case 1073742074:
case 603979967:
if (!checkOnly) this.colorShape (shape, this.iToken, false);
return true;
case 0:
case 12291:
case 1073742335:
case 1073742334:
case 12294:
case 2097194:
case 1610625028:
case 2097192:
if (this.iToken == 1 && shape >= 0 && this.tokAt (2) == 0) this.setShapeProperty (shape, "thisID", null);
if (tok == 0) return (this.iToken == 1);
if (checkOnly) return true;
switch (tok) {
case 12291:
this.setShapeProperty (shape, "delete", null);
return true;
case 2097194:
case 12294:
tok = 1073742334;
break;
case 2097192:
tok = 1073742335;
break;
case 1610625028:
if (i + 1 == this.slen) tok = 1073742335;
break;
}
case 1073741958:
case 1073741861:
case 1073741964:
case 1073741898:
case 1073742039:
case 1112150019:
case 1073742042:
case 1073742018:
case 1073742052:
case 1073741938:
case 1073742046:
case 1073741862:
case 1073742057:
case 1073742182:
case 1073742060:
case 1073741960:
case 1073742058:
propertyName = "token";
propertyValue = Integer.$valueOf (tok);
break;
}
if (propertyName == null) return false;
if (checkOnly) return true;
this.setShapeProperty (shape, propertyName, propertyValue);
if ((this.tokAt (this.iToken + 1)) != 0) {
if (!this.setMeshDisplayProperty (shape, ++this.iToken, 0)) --this.iToken;
}return true;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setObjectArgb", 
 function (str, argb) {
if (this.chk) return;
this.vwr.setObjectArgb (str, argb);
}, "~S,~N");
Clazz.defineMethod (c$, "setObjectMad10", 
function (iShape, name, mad10) {
if (!this.chk) this.vwr.setObjectMad10 (iShape, name, mad10);
}, "~N,~S,~N");
Clazz.defineMethod (c$, "setObjectProp", 
 function (id, tokCommand, ptColor) {
var data =  Clazz.newArray (-1, [id, null]);
var s = "";
var isWild = JU.PT.isWild (id);
for (var iShape = 17; ; ) {
if (this.getShapePropertyData (iShape, "checkID", data)) {
this.setShapeProperty (iShape, "thisID", id);
switch (tokCommand) {
case 12291:
this.setShapeProperty (iShape, "delete", null);
break;
case 12294:
case 1610625028:
this.setShapeProperty (iShape, "hidden", tokCommand == 1610625028 ? Boolean.FALSE : Boolean.TRUE);
break;
case 134222350:
s += this.getShapeProperty (iShape, "command") + "\n";
break;
case 1765808134:
if (ptColor >= 0) this.colorShape (iShape, ptColor + 1, false);
break;
}
if (!isWild) break;
}switch (iShape) {
case 17:
iShape = 20;
continue;
case 20:
iShape = 32;
}
switch (--iShape) {
case 27:
iShape--;
break;
case 28:
iShape -= 2;
break;
}
if (iShape < 21) break;
}
return s;
}, "~S,~N,~N");
Clazz.defineMethod (c$, "setObjectProperty", 
function () {
var id = this.setShapeNameParameter (2);
return (this.chk ? "" : this.setObjectProp (id, this.tokAt (0), this.iToken));
});
Clazz.defineMethod (c$, "setShapeNameParameter", 
function (i) {
var id = this.paramAsStr (i);
var isWild = id.equals ("*");
if (id.length == 0) this.invArg ();
if (isWild) {
switch (this.tokAt (i + 1)) {
case 0:
case 1073742335:
case 1073742334:
case 2097192:
case 2097194:
case 1765808134:
case 12291:
break;
default:
if (this.setMeshDisplayProperty (-1, 0, this.tokAt (i + 1))) break;
id += this.optParameterAsString (++i);
}
}if (this.tokAt (i + 1) == 268435633) id += this.paramAsStr (++i);
this.iToken = i;
return id;
}, "~N");
Clazz.defineMethod (c$, "setShapeProperty", 
function (shapeType, propertyName, propertyValue) {
if (!this.chk) this.sm.setShapePropertyBs (shapeType, propertyName, propertyValue, null);
}, "~N,~S,~O");
Clazz.defineMethod (c$, "setShapePropertyBs", 
function (iShape, propertyName, propertyValue, bs) {
if (!this.chk) this.sm.setShapePropertyBs (iShape, propertyName, propertyValue, bs);
}, "~N,~S,~O,JU.BS");
Clazz.defineMethod (c$, "setShapeSize", 
 function (shapeType, rd) {
if (!this.chk) this.sm.setShapeSizeBs (shapeType, 0, rd, null);
}, "~N,J.atomdata.RadiusData");
Clazz.defineMethod (c$, "setShapeSizeBs", 
function (shapeType, size, bs) {
if (!this.chk) this.sm.setShapeSizeBs (shapeType, size, null, bs);
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "setShapeTranslucency", 
function (shapeType, prefix, translucency, translucentLevel, bs) {
if (translucentLevel == 3.4028235E38) translucentLevel = this.vwr.getFloat (570425354);
this.setShapeProperty (shapeType, "translucentLevel", Float.$valueOf (translucentLevel));
if (prefix == null) return;
if (bs == null) this.setShapeProperty (shapeType, prefix + "translucency", translucency);
 else if (!this.chk) this.setShapePropertyBs (shapeType, prefix + "translucency", translucency, bs);
}, "~N,~S,~S,~N,JU.BS");
Clazz.defineMethod (c$, "setSize", 
 function (shape, scale) {
var rd = null;
var tok = this.tokAt (1);
var isOnly = false;
switch (tok) {
case 1073742072:
this.restrictSelected (false, false);
case 1073742335:
break;
case 1073742334:
scale = 0;
break;
case 3:
isOnly = (this.floatParameter (1) < 0);
case 2:
default:
rd = this.encodeRadiusParameter (1, isOnly, true);
if (rd == null) return;
if (Float.isNaN (rd.value)) this.invArg ();
}
if (rd == null) rd =  new J.atomdata.RadiusData (null, scale, J.atomdata.RadiusData.EnumType.FACTOR, J.c.VDW.AUTO);
if (isOnly) this.restrictSelected (false, false);
this.setShapeSize (shape, rd);
}, "~N,~N");
Clazz.defineMethod (c$, "setSizeBio", 
 function (iShape) {
var mad = 0;
switch (this.getToken (1).tok) {
case 1073742072:
this.restrictSelected (false, false);
case 1073742335:
mad = -1;
break;
case 1073742334:
break;
case 1639976963:
mad = -2;
break;
case 1111492620:
case 1073741922:
mad = -4;
break;
case 2:
if ((mad = (this.intParameterRange (1, 0, 1000) * 8)) == 2147483647) return;
break;
case 3:
mad = Math.round (this.floatParameterRange (1, -4.0, 4.0) * 2000);
if (mad == 2147483647) return;
if (mad < 0) {
this.restrictSelected (false, false);
mad = -mad;
}break;
case 10:
if (!this.chk) this.sm.loadShape (iShape);
this.setShapeProperty (iShape, "bitset", this.theToken.value);
return;
default:
this.error (6);
}
this.setShapeSizeBs (iShape, mad, null);
}, "~N");
Clazz.defineMethod (c$, "setUnits", 
 function (units, tok) {
if (tok == 545259568 && (units.toLowerCase ().endsWith ("hz") || JU.PT.isOneOf (units.toLowerCase (), ";angstroms;au;bohr;nanometers;nm;picometers;pm;vanderwaals;vdw;"))) {
if (!this.chk) this.vwr.setUnits (units, true);
} else if (tok == 545259558 && JU.PT.isOneOf (units.toLowerCase (), ";kcal;kj;")) {
if (!this.chk) this.vwr.setUnits (units, false);
} else {
this.errorStr2 (50, "set " + JS.T.nameOf (tok), units);
}return true;
}, "~S,~N");
Clazz.defineMethod (c$, "toString", 
function () {
var str =  new JU.SB ();
str.append ("Eval\n pc:");
str.appendI (this.pc);
str.append ("\n");
str.appendI (this.aatoken.length);
str.append (" statements\n");
for (var i = 0; i < this.aatoken.length; ++i) {
str.append ("----\n");
var atoken = this.aatoken[i];
for (var j = 0; j < atoken.length; ++j) {
str.appendO (atoken[j]);
str.appendC ('\n');
}
str.appendC ('\n');
}
str.append ("END\n");
return str.toString ();
});
Clazz.defineStatics (c$,
"saveList", "bonds? context? coordinates? orientation? rotation? selection? state? structure?",
"iProcess", 0,
"commandHistoryLevelMax", 0,
"contextDepthMax", 100,
"scriptReportingLevel", 0);
});
