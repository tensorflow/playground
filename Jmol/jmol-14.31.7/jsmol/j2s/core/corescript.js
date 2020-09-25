(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolParallelProcessor");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolScriptEvaluator");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolScriptFunction");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolScriptManager");
Clazz_declarePackage ("JS");
Clazz_load (["J.thread.JmolThread"], "JS.CommandWatcherThread", ["java.lang.Thread", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.scriptManager = null;
Clazz_instantialize (this, arguments);
}, JS, "CommandWatcherThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.CommandWatcherThread, []);
});
Clazz_overrideMethod (c$, "setManager", 
function (manager, vwr, params) {
this.scriptManager = manager;
this.setViewer (vwr, "CommmandWatcherThread");
return 0;
}, "~O,JV.Viewer,~O");
Clazz_overrideMethod (c$, "run", 
function () {
Thread.currentThread ().setPriority (1);
while (!this.stopped) {
try {
Thread.sleep (50);
if (!this.stopped) {
this.scriptManager.runScriptNow ();
}} catch (e$$) {
if (Clazz_exceptionOf (e$$, InterruptedException)) {
var ie = e$$;
{
JU.Logger.warn ("CommandWatcher InterruptedException! " + this);
break;
}
} else if (Clazz_exceptionOf (e$$, Exception)) {
var ie = e$$;
{
var s = "script processing ERROR:\n\n" + ie.toString ();
{
}JU.Logger.warn ("CommandWatcher Exception! " + s);
break;
}
} else {
throw e$$;
}
}
}
});
Clazz_overrideMethod (c$, "run1", 
function (mode) {
}, "~N");
Clazz_defineStatics (c$,
"commandDelay", 50);
});
Clazz_declarePackage ("JS");
Clazz_load (["J.thread.JmolThread"], "JS.FileLoadThread", ["JV.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.fileName = null;
this.cacheName = null;
this.key = null;
Clazz_instantialize (this, arguments);
}, JS, "FileLoadThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function (eval, vwr, fileName, key, cacheName) {
this.setViewer (vwr, "FileLoadThread");
this.fileName = fileName;
this.key = key;
this.cacheName = cacheName;
this.setEval (eval);
this.sc.pc--;
}, "J.api.JmolScriptEvaluator,JV.Viewer,~S,~S,~S");
Clazz_overrideMethod (c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
mode = 0;
break;
case 0:
if (this.stopped || !this.vwr.testAsync && this.eval.isStopped ()) {
mode = -2;
break;
}if (JV.Viewer.jmolObject != null) JV.Viewer.jmolObject.loadFileAsynchronously (this, this.vwr.html5Applet, this.fileName, null);
{
}return;
case 1:
var data = this.vwr.fm.getFileAsBytes (this.fileName, null);
this.setData (this.fileName, this.fileName, data, null);
return;
case -2:
this.resumeEval ();
return;
}

}, "~N");
Clazz_defineMethod (c$, "setData", 
function (fileName, fileName0, data, myData) {
var isCanceled = fileName.equals ("#CANCELED#");
this.sc.parentContext.htFileCache.put (this.key, (isCanceled ? fileName : (this.cacheName = this.cacheName.substring (0, this.cacheName.lastIndexOf ("_") + 1) + fileName)));
this.vwr.cachePut (this.cacheName, data);
if (fileName0 != null) {
this.vwr.cachePut (this.vwr.fm.getFilePath (fileName, true, false), data);
}this.run1 (-2);
}, "~S,~S,~O,~O");
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.ScriptTokenParser", "JU.Lst"], "JS.ScriptCompiler", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.M34", "$.M4", "$.PT", "$.SB", "J.api.Interface", "J.i18n.GT", "JM.BondSet", "$.Group", "JS.ContextToken", "$.SV", "$.ScriptContext", "$.ScriptError", "$.ScriptFlowContext", "$.ScriptFunction", "$.ScriptManager", "$.ScriptParam", "$.T", "JU.Escape", "$.Logger", "JV.FileManager", "$.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.filename = null;
this.isSilent = false;
this.contextVariables = null;
this.aatokenCompiled = null;
this.lineNumbers = null;
this.lineIndices = null;
this.lnLength = 8;
this.preDefining = false;
this.isShowScriptOutput = false;
this.isCheckOnly = false;
this.haveComments = false;
this.scriptExtensions = null;
this.thisFunction = null;
this.flowContext = null;
this.ltoken = null;
this.lltoken = null;
this.vBraces = null;
this.ichBrace = 0;
this.cchToken = 0;
this.cchScript = 0;
this.nSemiSkip = 0;
this.parenCount = 0;
this.braceCount = 0;
this.setBraceCount = 0;
this.bracketCount = 0;
this.ptSemi = 0;
this.forPoint3 = 0;
this.setEqualPt = 0;
this.iBrace = 0;
this.iHaveQuotedString = false;
this.isEndOfCommand = false;
this.needRightParen = false;
this.endOfLine = false;
this.comment = null;
this.tokLastMath = 0;
this.checkImpliedScriptCmd = false;
this.vFunctionStack = null;
this.allowMissingEnd = false;
this.isShowCommand = false;
this.isComment = false;
this.isUserToken = false;
this.implicitString = false;
this.tokInitialPlusPlus = 0;
this.afterWhite = 0;
this.isDotDot = false;
this.ident = null;
this.identLC = null;
this.vPush = null;
this.pushCount = 0;
this.forceFlowContext = null;
this.haveENDIF = false;
this.chFirst = '\0';
this.afterMath = 0;
Clazz_instantialize (this, arguments);
}, JS, "ScriptCompiler", JS.ScriptTokenParser);
Clazz_prepareFields (c$, function () {
this.vPush =  new JU.Lst ();
});
Clazz_makeConstructor (c$, 
function (vwr) {
this.vwr = vwr;
}, "JV.Viewer");
Clazz_defineMethod (c$, "compile", 
function (filename, script, isPredefining, isSilent, debugScript, isCheckOnly) {
this.isCheckOnly = isCheckOnly;
this.filename = filename;
this.isSilent = isSilent;
this.script = script;
this.logMessages = (!isSilent && !isPredefining && debugScript);
this.preDefining = (filename === "#predefine");
var doFull = true;
var isOK = this.compile0 (doFull);
this.atokenInfix = null;
if (!isOK) this.handleError ();
var sc =  new JS.ScriptContext ();
isOK = (this.iBrace == 0 && this.parenCount == 0 && this.braceCount == 0 && this.bracketCount == 0);
sc.isComplete = isOK;
sc.script = script;
sc.scriptExtensions = this.scriptExtensions;
sc.errorType = this.errorType;
if (this.errorType != null) {
sc.iCommandError = this.iCommand;
this.setAaTokenCompiled ();
}sc.saveTokens (this.aatokenCompiled);
sc.errorMessage = this.errorMessage;
sc.errorMessageUntranslated = (this.errorMessageUntranslated == null ? this.errorMessage : this.errorMessageUntranslated);
if (this.allowMissingEnd && sc.errorMessage != null && sc.errorMessageUntranslated.indexOf ("missing END") >= 0) sc.errorMessage = sc.errorMessageUntranslated;
sc.lineIndices = this.lineIndices;
sc.lineNumbers = this.lineNumbers;
sc.vars = this.contextVariables;
return sc;
}, "~S,~S,~B,~B,~B,~B");
Clazz_defineMethod (c$, "newContextVariable", 
 function (ident) {
this.theToken = JS.T.o (1073741824, ident);
if (this.pushCount > 0) {
var ct = this.vPush.get (this.pushCount - 1);
ct.addName (ident);
if (ct.tok != 364558) return;
}if (this.thisFunction == null) {
if (this.contextVariables == null) this.contextVariables =  new java.util.Hashtable ();
JS.ScriptCompiler.addContextVariable (this.contextVariables, ident);
} else {
this.thisFunction.addVariable (ident, false);
}}, "~S");
c$.addContextVariable = Clazz_defineMethod (c$, "addContextVariable", 
function (contextVariables, name) {
contextVariables.put (name, JS.SV.newS ("").setName (name));
}, "java.util.Map,~S");
Clazz_defineMethod (c$, "isContextVariable", 
 function (ident) {
for (var i = this.vPush.size (); --i >= 0; ) {
var ct = this.vPush.get (i);
if (ct.contextVariables != null && ct.contextVariables.containsKey (ident)) return true;
}
return (this.thisFunction != null ? this.thisFunction.isVariable (ident) : this.contextVariables != null && this.contextVariables.containsKey (ident));
}, "~S");
Clazz_defineMethod (c$, "cleanScriptComments", 
 function (script) {
if (script.indexOf ('\u201C') >= 0) script = script.$replace ('\u201C', '"');
if (script.indexOf ('\u201D') >= 0) script = script.$replace ('\u201D', '"');
if (script.indexOf ('\uFEFF') >= 0) script = script.$replace ('\uFEFF', ' ');
var pt = (script.indexOf ("\1##"));
if (pt >= 0) {
this.scriptExtensions = script.substring (pt + 1);
script = script.substring (0, pt);
this.allowMissingEnd = (this.scriptExtensions.indexOf ("##noendcheck") >= 0);
}this.haveComments = (script.indexOf ("#") >= 0);
return JV.FileManager.getEmbeddedScript (script);
}, "~S");
Clazz_defineMethod (c$, "addTokenToPrefix", 
 function (token) {
if (this.logMessages) JU.Logger.info ("addTokenToPrefix" + this.lineCurrent + " " + this.iCommand + " " + token);
this.ltoken.addLast (token);
if (token.tok != 0) this.lastToken = token;
}, "JS.T");
Clazz_defineMethod (c$, "compile0", 
 function (isFull) {
this.haveENDIF = false;
this.script = this.cleanScriptComments (this.script);
this.ichToken = this.script.indexOf ("# Jmol state version ");
this.isStateScript = (this.ichToken >= 0);
if (this.isStateScript) {
this.ptSemi = this.script.indexOf (";", this.ichToken);
if (this.ptSemi >= this.ichToken) JS.ScriptManager.setStateScriptVersion (this.vwr, this.script.substring (this.ichToken + "# Jmol state version ".length, this.ptSemi).trim ());
}this.cchScript = this.script.length;
main : while (true) {
this.vFunctionStack =  new JU.Lst ();
this.htUserFunctions =  new java.util.Hashtable ();
this.contextVariables = null;
this.lineNumbers = null;
this.lineIndices = null;
this.aatokenCompiled = null;
this.thisFunction = null;
this.flowContext = null;
this.errorType = null;
this.errorMessage = null;
this.errorMessageUntranslated = null;
this.errorLine = null;
this.nSemiSkip = 0;
this.ichToken = 0;
this.ichCurrentCommand = 0;
this.ichComment = 0;
this.ichBrace = 0;
this.lineCurrent = 1;
this.iCommand = 0;
this.tokLastMath = 0;
this.lastToken = JS.T.tokenOff;
this.vBraces =  new JU.Lst ();
this.vPush =  new JU.Lst ();
this.pushCount = 0;
this.iBrace = 0;
this.braceCount = 0;
this.parenCount = 0;
this.isDotDot = false;
this.ptSemi = -10;
this.cchToken = 0;
this.lnLength = 8;
this.lineNumbers =  Clazz_newShortArray (this.lnLength, 0);
this.lineIndices =  Clazz_newIntArray (this.lnLength, 2, 0);
this.isNewSet = this.isSetBrace = false;
this.ptNewSetModifier = 1;
this.isShowScriptOutput = false;
this.iHaveQuotedString = false;
this.checkImpliedScriptCmd = false;
this.lltoken =  new JU.Lst ();
this.ltoken =  new JU.Lst ();
this.tokCommand = 0;
this.lastFlowCommand = null;
this.tokenAndEquals = null;
this.tokInitialPlusPlus = 0;
this.setBraceCount = 0;
this.bracketCount = 0;
this.forPoint3 = -1;
this.setEqualPt = 2147483647;
this.endOfLine = false;
this.comment = null;
this.isEndOfCommand = false;
this.needRightParen = false;
this.lastFlowCommand = null;
this.forceFlowContext = null;
this.theTok = 0;
var iLine = 1;
for (; true; this.ichToken += this.cchToken) {
if ((this.nTokens = this.ltoken.size ()) == 0) {
if (this.thisFunction != null && this.thisFunction.chpt0 == 0) this.thisFunction.chpt0 = this.ichToken;
this.ichCurrentCommand = this.ichToken;
iLine = this.lineCurrent;
}if (this.lookingAtLeadingWhitespace ()) continue;
this.endOfLine = false;
if (!this.isEndOfCommand) {
this.endOfLine = this.lookingAtEndOfLine ();
switch (this.endOfLine ? 0 : this.lookingAtComment ()) {
case 2:
continue;
case 3:
this.isEndOfCommand = true;
continue;
case 1:
this.isEndOfCommand = true;
this.comment = this.script.substring (this.ichToken, this.ichToken + this.cchToken).trim ();
break;
}
this.isEndOfCommand = this.isEndOfCommand || this.endOfLine || this.lookingAtTerminator ();
}if (this.isEndOfCommand) {
this.isEndOfCommand = false;
switch (this.processTokenList (iLine, isFull)) {
case 2:
continue;
case 4:
return false;
}
this.checkImpliedScriptCmd = false;
if (this.ichToken < this.cchScript) continue;
if (this.flowContext != null) {
this.ichCurrentCommand = this.ichToken = this.cchScript;
while (this.flowContext != null) {
this.fixFlowAddLine (this.flowContext);
if (!this.haveENDIF && this.flowContext.checkForceEndIf (0)) {
this.forceFlowEnd (this.flowContext.token);
this.processTokenList (iLine, isFull);
} else {
this.lineCurrent = this.flowContext.lineStart;
this.iCommand = this.flowContext.pt0;
this.ichCurrentCommand = this.lineIndices[this.iCommand][0];
this.ichToken = this.ichEnd = this.lineIndices[this.iCommand][1];
return this.errorStr (11, (this.flowContext.$function == null ? JS.T.nameOf (this.flowContext.token.tok) : this.flowContext.$function.getSignature ()));
}}
this.lltoken.addLast ( Clazz_newArray (-1, [JS.T.o (0, "// end of script")]));
}this.setAaTokenCompiled ();
return true;
}if (this.nTokens > 0 && !this.isDotDot) {
switch (this.checkSpecialParameterSyntax ()) {
case 2:
continue;
case 4:
return false;
}
}if (this.lookingAtLookupToken (this.ichToken)) {
switch (this.parseKnownToken ()) {
case 2:
continue;
case 4:
return false;
case 5:
this.haveENDIF = true;
continue main;
}
switch (this.parseCommandParameter (iLine, isFull)) {
case 2:
continue;
case 4:
return false;
case 5:
this.haveENDIF = true;
continue main;
}
this.addTokenToPrefix (this.theToken);
continue;
}if (this.nTokens == 0 || (this.isNewSet || this.isSetBrace) && this.nTokens == this.ptNewSetModifier) {
if (this.nTokens == 0) {
if (this.lookingAtString (true)) {
this.addTokenToPrefix (this.setCommand (JS.T.tokenScript));
this.cchToken = 0;
continue;
}if (this.lookingAtImpliedString (true, true, true)) this.ichEnd = this.ichToken + this.cchToken;
}return this.commandExpected ();
}return this.errorStr (19, this.script.substring (this.ichToken, this.ichToken + 1));
}
}
}, "~B");
Clazz_defineMethod (c$, "setAaTokenCompiled", 
 function () {
this.aatokenCompiled = this.lltoken.toArray ( new Array (this.lltoken.size ()));
});
Clazz_defineMethod (c$, "lookingAtLeadingWhitespace", 
 function () {
var ichT = this.ichToken;
while (JS.ScriptCompiler.isSpaceOrTab (this.charAt (ichT))) ++ichT;

if (this.isLineContinuation (ichT, true)) ichT += 1 + this.nCharNewLine (ichT + 1);
this.cchToken = ichT - this.ichToken;
if (this.cchToken == 0) return false;
this.afterWhite = ichT;
return true;
});
Clazz_defineMethod (c$, "isLineContinuation", 
 function (ichT, checkMathop) {
var isEscaped = (ichT + 2 < this.cchScript && this.script.charAt (ichT) == '\\' && this.nCharNewLine (ichT + 1) > 0 || !this.isShowScriptOutput && checkMathop && this.lookingAtMathContinuation (ichT));
if (isEscaped) this.lineCurrent++;
return isEscaped;
}, "~N,~B");
Clazz_defineMethod (c$, "lookingAtMathContinuation", 
 function (ichT) {
var n;
if ((n = this.nCharNewLine (ichT)) == 0 || this.lastToken.tok == 1073742332) return false;
if (this.parenCount > 0 || this.bracketCount > 0) return true;
switch (this.tokCommand) {
case 134320141:
case 102436:
this.flowContext.forceEndIf = false;
return false;
case 134320648:
case 102406:
case 134320649:
case 364547:
case 102402:
if (!this.haveENDIF) {
this.flowContext.addLine = 1;
this.flowContext.forceEndIf = true;
}return false;
case 36867:
if (this.nTokens > 1 && this.ltoken.get (1).tok == 537022465) return false;
case 36865:
case 36869:
break;
default:
return false;
}
if (this.lastToken.tok == this.tokLastMath) return true;
ichT += n;
while (JS.ScriptCompiler.isSpaceOrTab (this.charAt (ichT))) ++ichT;

return (this.lookingAtLookupToken (ichT) && this.tokLastMath == 1);
}, "~N");
Clazz_defineMethod (c$, "lookingAtEndOfLine", 
 function () {
if (this.ichToken >= this.cchScript) {
this.ichEnd = this.cchScript;
return true;
}return ((this.cchToken = this.nCharNewLine (this.ichEnd = this.ichToken)) > 0);
});
Clazz_defineMethod (c$, "nCharNewLine", 
 function (ichT) {
var ch;
return ((ch = this.charAt (ichT)) != '\r' ? (ch == '\n' ? 1 : 0) : this.charAt (++ichT) == '\n' ? 2 : 1);
}, "~N");
Clazz_defineMethod (c$, "lookingAtTerminator", 
 function () {
var isSemi = (this.script.charAt (this.ichToken) == ';');
if (isSemi && this.nTokens > 0) this.ptSemi = this.nTokens;
if (!isSemi || this.nSemiSkip-- > 0) return false;
this.cchToken = 1;
return true;
});
Clazz_defineMethod (c$, "lookingAtComment", 
 function () {
var ch = this.script.charAt (this.ichToken);
var ichT = this.ichToken;
var ichFirstSharp = -1;
if (this.ichToken == this.ichCurrentCommand && ch == '$' && (this.isShowScriptOutput || this.ichToken == 0)) {
this.isShowScriptOutput = true;
this.isShowCommand = true;
if (this.charAt (++ichT) == '[') while (ch != ']' && !this.eol (ch = this.charAt (ichT))) ++ichT;

this.cchToken = ichT - this.ichToken;
return 2;
} else if (this.isShowScriptOutput && !this.isShowCommand) {
ichFirstSharp = ichT;
}if (ch == '/' && ichT + 1 < this.cchScript) switch (this.script.charAt (++ichT)) {
case '/':
ichFirstSharp = this.ichToken;
this.ichEnd = ichT - 1;
break;
case '*':
this.ichEnd = ichT - 1;
var terminator = ((ch = this.charAt (++ichT)) == '*' ? "**/" : "*/");
ichT = this.script.indexOf (terminator, this.ichToken + 2);
if (ichT < 0) {
this.ichToken = this.cchScript;
return 3;
}this.incrementLineCount (this.script.substring (this.ichToken, ichT));
this.cchToken = ichT + (ch == '*' ? 3 : 2) - this.ichToken;
return 2;
default:
return 0;
}
var isSharp = (ichFirstSharp < 0);
if (isSharp && !this.haveComments) return 0;
if (this.ichComment > ichT) ichT = this.ichComment;
for (; ichT < this.cchScript; ichT++) {
if (this.eol (ch = this.script.charAt (ichT))) {
this.ichEnd = ichT;
if (ichT > 0 && this.isLineContinuation (ichT - 1, false)) {
ichT += this.nCharNewLine (ichT);
continue;
}if (!isSharp && ch == ';') continue;
break;
}if (ichFirstSharp >= 0) continue;
if (ch == '#') ichFirstSharp = ichT;
}
if (ichFirstSharp < 0) return 0;
this.ichComment = ichFirstSharp;
if (isSharp && this.nTokens == 0 && this.cchScript - ichFirstSharp >= 3 && this.script.charAt (ichFirstSharp + 1) == 'j' && this.script.charAt (ichFirstSharp + 2) == 'c') {
this.cchToken = ichT - this.ichToken;
return 2;
}if (ichFirstSharp != this.ichToken) return 0;
if (isSharp && this.cchScript > this.ichToken + 3 && this.script.charAt (this.ichToken + 1) == 'j' && this.script.charAt (this.ichToken + 2) == 'x' && JS.ScriptCompiler.isSpaceOrTab (this.script.charAt (this.ichToken + 3))) {
this.cchToken = 4;
return 2;
}if (ichT == this.ichToken) return 0;
this.cchToken = ichT - this.ichToken;
return (this.nTokens == 0 ? 1 : 2);
});
Clazz_defineMethod (c$, "charAt", 
 function (i) {
return (i < this.cchScript ? this.script.charAt (i) : '\0');
}, "~N");
Clazz_defineMethod (c$, "processTokenList", 
 function (iLine, doCompile) {
var n = this.ltoken.size ();
if (n > 0 || this.comment != null) {
if (n == 0) {
this.ichCurrentCommand = this.ichToken;
if (this.comment != null) {
this.isComment = true;
this.addTokenToPrefix (JS.T.o (0, this.comment));
}} else if (this.setBraceCount > 0 && this.endOfLine && this.ichToken < this.cchScript) {
return 2;
}if (this.wasImpliedScript ()) return 2;
if (this.isNewSet && n > 2 && this.tokAt (2) == 1073742336 && (this.tokAt (3) == 1275068444 || this.tokAt (3) == 1140850693 || this.tokAt (3) == 1275335685 || this.tokAt (3) == 1275334681)) {
this.ltoken.set (0, JS.T.tokenSet);
this.ltoken.add (1, this.tokAt (3) == 1275334681 ? JS.T.tokenAll : this.ltoken.get (1));
} else if (this.tokInitialPlusPlus != 0) {
if (!this.isNewSet) this.checkNewSetCommand ();
this.tokenizePlusPlus (this.tokInitialPlusPlus, true);
this.ichCurrentCommand -= 2;
}this.iCommand = this.lltoken.size ();
if (this.thisFunction != null && this.thisFunction.cmdpt0 < 0) {
this.thisFunction.cmdpt0 = this.iCommand;
}if (n == 1 && this.braceCount == 1) {
if (this.lastFlowCommand == null) {
this.parenCount = this.setBraceCount = this.braceCount = 0;
this.ltoken.removeItemAt (0);
var t = JS.ContextToken.newContext (true);
this.addTokenToPrefix (this.setCommand (t));
this.pushContext (t);
this.addBrace (this.tokenCommand);
} else {
this.parenCount = this.setBraceCount = 0;
this.setCommand (this.lastFlowCommand);
if (this.lastFlowCommand.tok != 102439 && (this.tokAt (0) == 1073742332)) this.ltoken.removeItemAt (0);
this.lastFlowCommand = null;
this.forceFlowContext = this.flowContext;
}}if (this.bracketCount > 0 || this.setBraceCount > 0 || this.parenCount > 0 || this.braceCount == 1 && !this.checkFlowStartBrace (true)) {
this.error (n == 1 ? 2 : 4);
return 4;
}if (this.needRightParen) {
this.addTokenToPrefix (JS.T.tokenRightParen);
this.needRightParen = false;
}if (this.tokAt (1) == 1073741974 && JS.T.tokAttr (this.tokCommand, 135168)) {
switch (this.tokAt (2)) {
case 0:
case 4:
case 12290:
break;
default:
var t = this.ltoken.removeItemAt (2);
this.ltoken.add (2, JS.T.o (4, t.tok == 2 ? "" + t.intValue : t.value.toString ()));
}
}if (this.ltoken.size () > 0) {
if (doCompile && !this.compileCommand ()) return 4;
if (this.logMessages) {
JU.Logger.info ("-------------------------------------");
}var doEval = true;
switch (this.tokCommand) {
case 364558:
case 102436:
case 134320141:
case 102409:
doEval = (this.atokenInfix.length > 0 && this.atokenInfix[0].intValue != 2147483647);
break;
}
if (doEval) {
if (this.iCommand == this.lnLength) {
this.lineNumbers = JU.AU.doubleLengthShort (this.lineNumbers);
var lnI =  Clazz_newIntArray (this.lnLength * 2, 2, 0);
System.arraycopy (this.lineIndices, 0, lnI, 0, this.lnLength);
this.lineIndices = lnI;
this.lnLength *= 2;
}this.lineNumbers[this.iCommand] = this.lineNumbers[this.lineNumbers.length - 1] = iLine;
this.lineIndices[this.iCommand][0] = this.ichCurrentCommand;
this.lineIndices[this.iCommand][1] = Math.max (this.ichCurrentCommand, Math.min (this.cchScript, this.ichEnd == this.ichCurrentCommand ? this.ichToken : this.ichEnd));
this.lltoken.addLast (this.atokenInfix);
this.iCommand = this.lltoken.size ();
}if (this.tokCommand == 36867) this.lastFlowCommand = null;
}this.setCommand (null);
this.comment = null;
this.iHaveQuotedString = this.isNewSet = this.isSetBrace = this.needRightParen = false;
this.ptNewSetModifier = 1;
this.ltoken.clear ();
this.nTokens = this.nSemiSkip = 0;
this.tokInitialPlusPlus = 0;
this.tokenAndEquals = null;
this.ptSemi = -10;
this.forPoint3 = -1;
this.setEqualPt = 2147483647;
}var isOneLine = (this.flowContext != null && this.flowContext.addLine == 0);
var isEndFlow = ((this.endOfLine || !isOneLine) && !this.haveENDIF && this.flowContext != null && this.flowContext.checkForceEndIf (-1));
if (this.endOfLine) {
if (isEndFlow) {
if (this.isComment) {
if (!isOneLine) {
this.flowContext.addLine++;
this.flowContext.forceEndIf = true;
}} else if (n > 0 && !this.haveENDIF || isOneLine) {
this.forceFlowEnd (this.flowContext.token);
if (!isOneLine) {
this.forceFlowContext.forceEndIf = true;
}}this.isEndOfCommand = true;
this.cchToken = 0;
this.ichCurrentCommand = this.ichToken;
return 2;
}this.isComment = false;
this.isShowCommand = false;
++this.lineCurrent;
} else if (isEndFlow) {
this.forceFlowEnd (this.flowContext.token);
this.forceFlowContext.forceEndIf = true;
}if (this.ichToken >= this.cchScript) {
this.setCommand (JS.T.tokenAll);
this.theTok = 0;
switch (this.checkFlowEndBrace ()) {
case 4:
return 4;
case 2:
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}
this.ichToken = this.cchScript;
return 0;
}return 0;
}, "~N,~B");
Clazz_defineMethod (c$, "addBrace", 
 function (t) {
this.vBraces.addLast (t);
this.iBrace++;
}, "JS.T");
Clazz_defineMethod (c$, "pushContext", 
 function (t) {
this.pushCount++;
this.vPush.addLast (t);
}, "JS.T");
Clazz_defineMethod (c$, "wasImpliedScript", 
 function () {
if (this.checkImpliedScriptCmd && this.nTokens >= 2 && (this.tokCommand == 134222850 || this.tokCommand == 4124)) {
var s = (this.nTokens == 2 ? this.lastToken.value.toString ().toUpperCase () : null);
if (this.nTokens > 2 ? !(this.tokAt (2) == 268435472 && this.ltoken.get (1).value.toString ().endsWith (".spt")) : s.endsWith (".SORT") || s.endsWith (".REVERSE") || s.endsWith (".POP") || s.indexOf (".SORT(") >= 0 || s.indexOf (".REVERSE(") >= 0 || s.indexOf (".POP(") >= 0 || s.indexOf (".PUSH(") >= 0 || s.endsWith ("++") || s.endsWith ("--") || s.endsWith ("=") || this.tokInitialPlusPlus != 0) {
this.ichToken = this.ichCurrentCommand;
this.nTokens = 0;
this.ltoken.clear ();
this.cchToken = 0;
this.tokCommand = 0;
return true;
}}return false;
});
Clazz_defineMethod (c$, "compileCommand", 
 function () {
switch (this.ltoken.size ()) {
case 0:
this.atokenInfix =  new Array (0);
return true;
case 4:
if (this.isNewSet && this.tokenAt (2).value.equals (".") && this.tokenAt (3).value.equals ("spt")) {
var fname = this.tokenAt (1).value + "." + this.tokenAt (3).value;
this.ltoken.clear ();
this.addTokenToPrefix (JS.T.tokenScript);
this.addTokenToPrefix (JS.T.o (4, fname));
this.isNewSet = false;
}}
this.setCommand (this.tokenAt (0));
var size = this.ltoken.size ();
if (size == 1 && JS.T.tokAttr (this.tokCommand, 524288)) this.addTokenToPrefix (JS.T.tokenOn);
if (this.tokenAndEquals != null) {
var j;
var i = 0;
for (i = 1; i < size; i++) {
if ((j = this.tokAt (i)) == 268435666) break;
}
size = i;
i++;
if (this.ltoken.size () < i) {
JU.Logger.error ("COMPILER ERROR! - andEquals ");
} else {
for (j = 1; j < size; j++, i++) this.ltoken.add (i, this.tokenAt (j));

this.ltoken.set (size, JS.T.tokenEquals);
this.ltoken.add (i, this.tokenAndEquals);
this.ltoken.add (++i, JS.T.tokenLeftParen);
this.addTokenToPrefix (JS.T.tokenRightParen);
}}this.atokenInfix = this.ltoken.toArray ( new Array (size = this.ltoken.size ()));
return this.compileExpressions ();
});
Clazz_defineMethod (c$, "tokenAt", 
 function (i) {
return this.ltoken.get (i);
}, "~N");
Clazz_overrideMethod (c$, "tokAt", 
function (i) {
return (i < this.ltoken.size () ? this.tokenAt (i).tok : 0);
}, "~N");
Clazz_defineMethod (c$, "setCommand", 
 function (token) {
this.tokenCommand = token;
if (token == null) {
this.tokCommand = 0;
} else {
this.tokCommand = this.tokenCommand.tok;
this.isMathExpressionCommand = (this.tokCommand == 1073741824 || JS.T.tokAttr (this.tokCommand, 36864));
this.isSetOrDefine = (this.tokCommand == 36867 || this.tokCommand == 12290);
this.isCommaAsOrAllowed = JS.T.tokAttr (this.tokCommand, 12288);
this.implicitString = JS.T.tokAttr (this.tokCommand, 20480);
}return token;
}, "JS.T");
Clazz_defineMethod (c$, "replaceCommand", 
 function (token) {
this.ltoken.removeItemAt (0);
this.ltoken.add (0, this.setCommand (token));
}, "JS.T");
Clazz_defineMethod (c$, "getPrefixToken", 
 function () {
this.ident = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
this.identLC = this.ident.toLowerCase ();
var isUserVar = this.lastToken.tok != 1073742336 && !this.isDotDot && this.isContextVariable (this.identLC);
var myName = this.ident;
var preserveCase = null;
if (this.nTokens == 0) this.isUserToken = isUserVar;
if (this.nTokens == 1 && (this.tokCommand == 134320141 || this.tokCommand == 102436 || this.tokCommand == 36868) || this.nTokens != 0 && isUserVar || !this.isDotDot && this.isUserFunction (this.identLC) && ((preserveCase = this.ident) != null) && (this.thisFunction == null || !this.thisFunction.name.equals (this.identLC))) {
this.ident = (preserveCase == null ? this.identLC : preserveCase);
this.theToken = null;
} else if (this.ident.length == 1 || this.lastToken.tok == 268435490) {
if ((this.theToken = JS.T.getTokenFromName (this.ident)) == null && (this.theToken = JS.T.getTokenFromName (this.identLC)) != null) this.theToken = JS.T.tv (this.theToken.tok, this.theToken.intValue, this.ident);
} else {
this.theToken = JS.T.getTokenFromName (this.identLC);
if (isUserVar && this.theToken != null && !this.theToken.value.toString ().equalsIgnoreCase (this.identLC)) {
this.theToken = null;
}if (this.theToken != null) switch (this.lastToken.tok) {
case 1073742336:
case 268435520:
case 268435504:
this.theToken = JS.T.o (this.theToken.tok, this.ident);
}
}if (this.theToken == null) {
this.theToken = JS.SV.newSV ((this.identLC.indexOf ("property_") == 0 ? 1715472409 : 1073741824), 2147483647, this.ident).setName (myName);
}return this.theTok = this.theToken.tok;
});
Clazz_defineMethod (c$, "checkSpecialParameterSyntax", 
 function () {
if (this.lookingAtString (!this.implicitString)) {
if (this.cchToken < 0) return this.ERROR (4);
var str = this.getUnescapedStringLiteral (this.lastToken != null && !this.iHaveQuotedString && this.lastToken.tok != 1073741984 && (this.tokCommand == 36867 && this.nTokens == 2 && this.lastToken.tok == 545259546 || this.tokCommand == 134222849 || this.tokCommand == 1610616835 || this.tokCommand == 134222850 || this.tokCommand == 4124));
this.iHaveQuotedString = true;
if ((this.tokCommand == 134222849 || this.tokCommand == 135174) && this.lastToken.tok == 134221834 || this.tokCommand == 134221834 && str.indexOf ("@") < 0) {
if (!this.getData (str)) {
return this.ERROR (11, "data");
}} else {
this.addTokenToPrefix (JS.T.o (4, str));
if (this.implicitString) {
this.ichEnd = this.ichToken + this.cchToken;
this.isEndOfCommand = true;
}}return 2;
}var ch;
if (this.nTokens == this.ptNewSetModifier) {
ch = this.script.charAt (this.ichToken);
var isAndEquals = ("+-\\*/&|=".indexOf (ch) >= 0);
var isOperation = (isAndEquals || ch == '.' || ch == '[');
var ch2 = this.charAt (this.ichToken + 1);
if (!this.isNewSet && this.isUserToken && isOperation && (ch == '=' || ch2 == ch || ch2 == '=')) {
this.isNewSet = true;
}if (this.isNewSet || this.tokCommand == 36867 || JS.T.tokAttr (this.tokCommand, 536870912)) {
if (ch == '=') this.setEqualPt = this.ichToken;
if (JS.T.tokAttr (this.tokCommand, 536870912) && ch == '=' || (this.isNewSet || this.isSetBrace) && isOperation) {
this.setCommand (isAndEquals ? JS.T.tokenSet : ch == '[' && !this.isSetBrace || ch == '.' && ch2 == '.' ? JS.T.tokenSetArray : JS.T.tokenSetProperty);
this.ltoken.add (0, this.tokenCommand);
this.cchToken = 1;
switch (ch) {
case '[':
this.tokLastMath = 1;
this.addTokenToPrefix (JS.T.tokenArrayOpen);
this.bracketCount++;
return 2;
case '.':
if (ch2 == '.') {
this.addTokenToPrefix (JS.T.tokenArrayOpen);
this.cchToken = 2;
this.isDotDot = true;
return 2;
}this.addTokenToPrefix (JS.T.o (1073742336, "."));
return 2;
case '-':
case '+':
case '*':
case '/':
case '\\':
case '&':
case '|':
if (ch2.charCodeAt (0) == 0) return this.ERROR (4);
if (ch2 != ch && ch2 != '=') return this.ERROR (1, "\"" + ch + "\"");
break;
default:
this.lastToken = JS.T.tokenMinus;
return 2;
}
}}}out : switch (this.tokCommand) {
case 134222350:
switch (this.lastToken.tok) {
case 4120:
case 1296041986:
case 1715472409:
case 1073877010:
if (this.nTokens == 2) this.iHaveQuotedString = true;
break;
case 1073741925:
case 1073742189:
break;
default:
if (!this.iHaveQuotedString && this.nTokens != 2) return 0;
break;
}
case 134222849:
case 134222850:
case 4124:
case 1275072526:
if (this.script.charAt (this.ichToken) == '@') {
this.iHaveQuotedString = true;
return 0;
}switch (this.tokCommand) {
case 4124:
this.haveMacro = true;
break out;
case 134222849:
if (this.nTokens == 1 || this.nTokens == 2 && (this.tokAt (1) == 1073741839)) {
var isDataBase = JV.Viewer.isDatabaseCode (this.charAt (this.ichToken));
if (this.lookingAtLoadFormat (isDataBase)) {
var strFormat = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
var token = JS.T.getTokenFromName (strFormat.toLowerCase ());
switch (token == null ? 0 : token.tok) {
case 36868:
case 1073742015:
case 1073742077:
case 1073741839:
case 1610616855:
case 4130:
case 1073877011:
if (this.nTokens != 1) return 4;
case 134221834:
case 1228935687:
case 1073741984:
case 1094717454:
case 134218757:
case 536870926:
case 1073741849:
case 1073741851:
this.addTokenToPrefix (token);
break;
default:
var tok = (isDataBase ? 4 : JU.PT.isOneOf (strFormat = strFormat.toLowerCase (), ";xyz;vxyz;vibration;temperature;occupancy;partialcharge;") ? 1073741824 : 0);
if (tok != 0) {
this.addTokenToPrefix (JS.T.o (tok, strFormat));
this.iHaveQuotedString = (tok == 4);
}}
return 2;
}break;
}var bs;
if (this.script.charAt (this.ichToken) == '{' || this.parenCount > 0) break out;
if ((bs = this.lookingAtBitset ()) != null) {
this.addTokenToPrefix (JS.T.o (10, bs));
return 2;
}}
if (!this.iHaveQuotedString && this.lookingAtImpliedString (this.tokCommand == 134222350, this.tokCommand == 134222849, this.nTokens > 1 || this.tokCommand != 134222850 && this.tokCommand != 4124)) {
var str = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
if (this.tokCommand == 134222850) {
if (str.startsWith ("javascript:")) {
this.lookingAtImpliedString (true, true, true);
str = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
} else if (str.toUpperCase ().indexOf (".PUSH(") >= 0) {
this.cchToken = 0;
this.iHaveQuotedString = true;
return 2;
}}this.iHaveQuotedString = true;
this.addTokenToPrefix (JS.T.o (4, str));
return 2;
}break;
case 4156:
if (this.nTokens == 1 && this.lookForSyncID ()) {
var ident = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
var iident = JU.PT.parseInt (ident);
if (iident == -2147483648 || Math.abs (iident) < 1000) this.addTokenToPrefix (JS.T.o (1073741824, ident));
 else this.addTokenToPrefix (JS.T.i (iident));
return 2;
}break;
case 134221856:
if (this.nTokens == 2 && this.lastToken.tok == 4115) this.iHaveQuotedString = true;
if (!this.iHaveQuotedString) {
if (this.script.charAt (this.ichToken) == '@') {
this.iHaveQuotedString = true;
return 0;
}if (this.lookingAtImpliedString (true, true, true)) {
var str = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
var pt = str.indexOf (" as ");
if (pt > 0) str = str.substring (0, this.cchToken = pt);
if (str.indexOf (" ") < 0 && str.indexOf (".") >= 0) {
this.addTokenToPrefix (JS.T.o (4, str));
this.iHaveQuotedString = true;
return 2;
}}}break;
}
this.implicitString = new Boolean (this.implicitString & (this.nTokens == 1)).valueOf ();
if (this.implicitString && !((this.tokCommand == 134222850 || this.tokCommand == 4124) && this.iHaveQuotedString) && this.lookingAtImpliedString (true, true, true)) {
var str = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
if (this.tokCommand == 1825200146 && JU.PT.isOneOf (str.toLowerCase (), ";on;off;hide;display;")) this.addTokenToPrefix (JS.T.getTokenFromName (str.toLowerCase ()));
 else this.addTokenToPrefix (JS.T.o (4, str));
return 2;
}if (this.lookingAtObjectID ()) {
this.addTokenToPrefix (JS.T.getTokenFromName ("$"));
this.addTokenToPrefix (JS.T.o (1073741824, this.script.substring (this.ichToken, this.ichToken + this.cchToken)));
return 2;
}var value;
if (!Float.isNaN (value = this.lookingAtExponential ())) {
this.addNumber (3, 2147483647, Float.$valueOf (value));
return 2;
}if (this.lookingAtDecimal ()) {
value = JU.PT.fVal (this.script.substring (this.ichToken, this.ichToken + this.cchToken));
var intValue = (JS.ScriptParam.getFloatEncodedInt (this.script.substring (this.ichToken, this.ichToken + this.cchToken)));
this.addNumber (3, intValue, Float.$valueOf (value));
return 2;
}if (this.lookingAtSeqcode ()) {
ch = this.script.charAt (this.ichToken);
try {
var seqNum = (ch == '*' || ch == '^' ? 2147483647 : Integer.parseInt (this.script.substring (this.ichToken, this.ichToken + this.cchToken - 2)));
var insertionCode = this.script.charAt (this.ichToken + this.cchToken - 1);
if (insertionCode == '^') insertionCode = ' ';
if (seqNum < 0) {
seqNum = -seqNum;
this.addTokenToPrefix (JS.T.tokenMinus);
}var seqcode = JM.Group.getSeqcodeFor (seqNum, insertionCode);
this.addTokenToPrefix (JS.T.tv (5, seqcode, "seqcode"));
} catch (nfe) {
if (Clazz_exceptionOf (nfe, NumberFormatException)) {
return this.ERROR (9, "" + ch);
} else {
throw nfe;
}
}
return 2;
}var val = this.lookingAtInteger ();
if (val != 2147483647) {
var intString = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
if (this.tokCommand == 102407 || this.tokCommand == 102408) {
if (this.nTokens != 1) return this.ERROR (0);
var f = (this.flowContext == null ? null : this.flowContext.getBreakableContext (val = Math.abs (val)));
if (f == null) return this.ERROR (1, this.tokenCommand.value);
this.tokenAt (0).intValue = f.pt0;
}this.addNumber (2, val, intString);
return 2;
}if (!this.isMathExpressionCommand && this.parenCount == 0 || this.lastToken.tok != 1073741824 && !JS.ScriptTokenParser.tokenAttr (this.lastToken, 134217728)) {
var isBondOrMatrix = (this.script.charAt (this.ichToken) == '[');
var bs = this.lookingAtBitset ();
if (bs != null) {
this.addTokenToPrefix (JS.T.o (10, isBondOrMatrix ? JM.BondSet.newBS (bs, null) : bs));
return 2;
}if (isBondOrMatrix) {
var m = this.lookingAtMatrix ();
if (Clazz_instanceOf (m, JU.M34)) {
this.addTokenToPrefix (JS.T.o ((Clazz_instanceOf (m, JU.M4) ? 12 : 11), m));
return 2;
}}}return 0;
});
Clazz_defineMethod (c$, "addNumber", 
 function (tok, i, v) {
this.addTokenToPrefix (this.afterWhite == this.ichToken ? JS.SV.newSV (tok, i, v) : JS.T.tv (tok, i, v));
}, "~N,~N,~O");
Clazz_defineMethod (c$, "lookingAtMatrix", 
 function () {
var ipt;
var m;
if (this.ichToken + 4 >= this.cchScript || this.script.charAt (this.ichToken) != '[' || this.script.charAt (this.ichToken + 1) != '[' || (ipt = this.script.indexOf ("]]", this.ichToken)) < 0 || (m = JU.Escape.unescapeMatrix (this.script.substring (this.ichToken, ipt + 2))) == null) return null;
this.cchToken = ipt + 2 - this.ichToken;
return m;
});
Clazz_defineMethod (c$, "parseKnownToken", 
 function () {
var tok = this.getPrefixToken ();
var token;
if (this.isDotDot) {
if (tok == 268435520) {
this.bracketCount++;
} else {
this.addTokenToPrefix (JS.T.o (4, this.ident));
this.addTokenToPrefix (JS.T.tokenArrayClose);
}this.isDotDot = false;
return 2;
}if (this.tokLastMath != 0) this.tokLastMath = tok;
if (this.flowContext != null && this.flowContext.token.tok == 102410 && this.flowContext.$var != null && tok != 102411 && tok != 102413 && this.lastToken.tok != 102410) return this.ERROR (1, this.ident);
if (this.lastToken.tok == 12290 && tok != 1073742332 && this.nTokens != 1) {
this.addTokenToPrefix (tok == 12290 ? this.lastToken : JS.T.o (4, this.ident));
return 2;
}switch (tok) {
case 1073741824:
if (this.nTokens == 0 && !this.checkImpliedScriptCmd) {
if (this.ident.charAt (0) == '\'') {
this.addTokenToPrefix (this.setCommand (JS.T.tokenScript));
this.cchToken = 0;
return 2;
}if (this.charAt (this.ichToken + this.cchToken) == '.') {
this.addTokenToPrefix (this.setCommand (JS.T.tokenScript));
this.nTokens = 1;
this.cchToken = 0;
this.checkImpliedScriptCmd = true;
return 2;
}}break;
case 268435666:
if (this.nSemiSkip == this.forPoint3 && this.nTokens == this.ptSemi + 2) {
token = this.lastToken;
this.addTokenToPrefix (JS.T.tokenEquals);
this.addTokenToPrefix (token);
token = JS.T.getTokenFromName (this.ident.substring (0, 1));
this.addTokenToPrefix (token);
this.addTokenToPrefix (JS.T.tokenLeftParen);
this.needRightParen = true;
return 2;
}this.checkNewSetCommand ();
if (this.tokCommand == 36867) {
this.tokenAndEquals = JS.T.getTokenFromName (this.ident.substring (0, 1));
this.setEqualPt = this.ichToken;
return 0;
}if (this.tokCommand == 554176565 || this.tokCommand == 554176526) {
this.addTokenToPrefix (this.tokenCommand);
this.replaceCommand (JS.T.tokenSet);
this.tokenAndEquals = JS.T.getTokenFromName (this.ident.substring (0, 1));
this.setEqualPt = this.ichToken;
return 0;
}return 2;
case 268435649:
case 268435650:
if (this.afterWhite == this.ichToken || this.afterMath == this.ichToken) this.theToken = JS.T.tv (this.theToken.tok, -1, this.theToken.value);
if (!this.isNewSet && this.nTokens == 1) this.checkNewSetCommand ();
if (this.isNewSet && this.parenCount == 0 && this.bracketCount == 0 && this.ichToken <= this.setEqualPt) {
this.tokenizePlusPlus (tok, false);
return 2;
} else if (this.nSemiSkip == this.forPoint3 && this.nTokens == this.ptSemi + 2) {
token = this.lastToken;
this.addTokenToPrefix (JS.T.tokenEquals);
this.addTokenToPrefix (token);
this.addTokenToPrefix (tok == 268435649 ? JS.T.tokenMinus : JS.T.tokenPlus);
this.addTokenToPrefix (JS.T.i (1));
return 2;
}break;
case 268435860:
if (this.parenCount == 0 && this.bracketCount == 0) this.setEqualPt = this.ichToken;
break;
case 1073742336:
if (this.tokCommand == 36867 && this.parenCount == 0 && this.bracketCount == 0 && this.ichToken < this.setEqualPt && this.ltoken.size () > 1 && this.ltoken.get (1).tok == 1073742332) {
this.ltoken.set (0, JS.T.tokenSetProperty);
this.ltoken.add (1, JS.T.tokenExpressionBegin);
this.addTokenToPrefix (JS.T.tokenExpressionEnd);
this.setEqualPt = 0;
}break;
case 1073742332:
if (++this.braceCount == 1 && this.parenCount == 0 && this.checkFlowStartBrace (false)) {
this.isEndOfCommand = true;
var f = (this.flowContext != null && this.flowContext.addLine == 0 || this.forceFlowContext == null ? this.flowContext : this.forceFlowContext);
if (f != null) {
f.addLine = 0;
f.forceEndIf = false;
this.lastToken = JS.T.tokenLeftBrace;
this.forceFlowContext = f;
}return 2;
}this.parenCount++;
break;
case 268435472:
this.parenCount++;
if (this.nTokens > 1 && (this.lastToken.tok == 1275082245 || this.lastToken.tok == 134320648 || this.lastToken.tok == 134320649)) this.nSemiSkip += 2;
break;
case 1073742338:
if (this.iBrace > 0 && this.parenCount == 0 && this.braceCount == 0) {
this.ichBrace = this.ichToken;
if (this.nTokens == 0) {
this.braceCount = this.parenCount = 1;
} else {
if (!this.wasImpliedScript ()) {
this.braceCount = this.parenCount = this.nSemiSkip = 0;
this.addBrace (this.theToken);
this.isEndOfCommand = true;
this.ichEnd = this.ichToken;
}return 2;
}}this.braceCount--;
case 268435473:
if (--this.parenCount < 0) return this.ERROR (16, this.ident);
if (this.parenCount == 0) this.nSemiSkip = 0;
if (this.needRightParen) {
this.addTokenToPrefix (JS.T.tokenRightParen);
this.needRightParen = false;
}break;
case 268435520:
if (this.ichToken > 0 && JU.PT.isWhitespace (this.script.charAt (this.ichToken - 1))) this.addTokenToPrefix (JS.T.tokenSpaceBeforeSquare);
this.bracketCount++;
break;
case 268435521:
this.bracketCount--;
if (this.bracketCount < 0) return this.ERROR (16, "]");
break;
case 1073742337:
this.isDotDot = true;
this.addTokenToPrefix (JS.T.tokenArrayOpen);
return 2;
}
switch (this.lastToken.tok) {
case 1073742336:
case 1073742337:
case 268435504:
case 268435520:
return 0;
}
switch (tok) {
case 102409:
if (this.tokCommand == 135174 || this.tokCommand == 4103 && this.nTokens == 1) return 0;
if (!this.haveENDIF) return 5;
case 364548:
if (this.flowContext != null) this.flowContext.forceEndIf = false;
case 364547:
if (this.nTokens > 0) {
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}break;
case 134320648:
case 102411:
case 102413:
case 102402:
case 134320649:
case 102410:
case 102406:
case 102412:
if (this.nTokens > 1 && this.tokCommand != 36867 && this.nSemiSkip == 0) {
this.isEndOfCommand = true;
if (this.flowContext != null) this.flowContext.forceEndIf = true;
this.cchToken = 0;
return 2;
}break;
}
return 0;
});
Clazz_defineMethod (c$, "tokenizePlusPlus", 
 function (tok, isPlusPlusX) {
if (isPlusPlusX) {
this.setCommand (JS.T.tokenSet);
if (this.nTokens == 1) this.ltoken.add (0, this.tokenCommand);
}this.nTokens = this.ltoken.size ();
this.addTokenToPrefix (JS.T.tokenEquals);
this.setEqualPt = 0;
for (var i = 1; i < this.nTokens; i++) this.addTokenToPrefix (this.ltoken.get (i));

this.addTokenToPrefix (tok == 268435649 ? JS.T.tokenMinus : JS.T.tokenPlus);
this.addTokenToPrefix (JS.T.i (1));
}, "~N,~B");
Clazz_defineMethod (c$, "checkNewSetCommand", 
 function () {
var name = this.ltoken.get (0).value.toString ();
if (!this.isContextVariable (name.toLowerCase ())) return false;
var t = this.setNewSetCommand (false, name);
this.setCommand (JS.T.tokenSet);
this.ltoken.add (0, this.tokenCommand);
this.ltoken.set (1, t);
return true;
});
Clazz_defineMethod (c$, "parseCommandParameter", 
 function (iLine, isFull) {
this.nTokens = this.ltoken.size ();
switch (this.tokCommand) {
case 0:
this.lastToken = JS.T.tokenOff;
this.ichCurrentCommand = this.ichEnd = this.ichToken;
this.setCommand (this.theToken);
if (this.logMessages) JU.Logger.info ("compiling " + this.theToken);
var isFlowCmd = JS.T.tokAttr (this.tokCommand, 102400);
if (isFlowCmd) {
this.lastFlowCommand = this.tokenCommand;
}var ret = this.checkFlowEndBrace ();
if (ret == 4) return 4;
 else if (ret == 2) {
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}switch (this.theTok) {
case 1073742332:
break;
case 268435490:
this.braceCount++;
this.isEndOfCommand = true;
return 0;
case 102409:
return 0;
case 364547:
case 102402:
this.fixFlowAddLine (this.flowContext);
if (this.lltoken.get (this.iCommand - 1)[0].tok == 102409 && this.forceFlowContext != null && this.forceFlowContext.forceEndIf && this.forceFlowContext.addLine > 0 && this.isFlowIfContextOK (this.forceFlowContext)) {
this.flowContext = this.forceFlowContext;
this.flowContext.forceEndIf = true;
this.lltoken.removeItemAt (--this.iCommand);
} else if (this.flowContext != null && this.flowContext.addLine > 0) {
while (this.flowContext != null && !this.isFlowIfContextOK (this.flowContext)) {
if (this.flowContext.checkForceEndIf (0)) {
this.forceFlowEnd (this.flowContext.token);
this.processTokenList (iLine, isFull);
this.fixFlowAddLine (this.flowContext);
this.setCommand (this.theToken);
this.theTok = this.theToken.tok;
} else {
break;
}}
}default:
if (isFlowCmd) {
switch (this.checkFlowCommand (this.tokenCommand.value)) {
case 4:
return 4;
case 2:
return 2;
case 5:
return 5;
case 0:
this.theToken = this.tokenCommand;
if (this.theTok == 102411) {
this.addTokenToPrefix (this.tokenCommand);
this.theToken = JS.T.tokenLeftParen;
}return 0;
}
}if (this.flowContext != null && !this.haveENDIF && this.flowContext.addLine > 0) {
this.fixFlowAddLine (this.flowContext);
while (this.flowContext != null) {
if (this.flowContext.checkForceEndIf (0)) {
this.forceFlowEnd (this.flowContext.token);
this.processTokenList (iLine, isFull);
this.setCommand (this.theToken);
this.theTok = this.theToken.tok;
} else {
break;
}}
}if (this.theTok == 1073742338) {
this.forceFlowContext = null;
this.addBrace (this.tokenCommand);
this.tokCommand = 0;
return 2;
}this.lastFlowCommand = null;
}
if (this.theTok == 268435552) {
this.setCommand (this.theToken = JS.T.o (4143, "resume"));
this.addTokenToPrefix (this.theToken);
this.theToken = JS.T.o (14, "context");
return 0;
}if (JS.T.tokAttr (this.tokCommand, 4096)) break;
this.isSetBrace = (this.theTok == 1073742332);
if (this.isSetBrace) {
if (!this.lookingAtSetBraceSyntax ()) {
this.isEndOfCommand = true;
if (this.flowContext != null) this.flowContext.forceEndIf = false;
}} else {
switch (this.theTok) {
case 268435650:
case 268435649:
this.tokInitialPlusPlus = this.theTok;
this.tokCommand = 0;
return 2;
case 1073741824:
case 36868:
case 12290:
case 268435472:
break;
default:
if (!JS.T.tokAttr (this.theTok, 1073741824) && !JS.T.tokAttr (this.theTok, 536870912) && !this.isContextVariable (this.identLC)) {
this.commandExpected ();
return 4;
}}
}this.theToken = this.setNewSetCommand (this.isSetBrace, this.ident);
break;
case 102412:
switch (this.nTokens) {
case 1:
if (this.theTok != 268435472) return this.ERROR (15, "(");
break;
case 2:
if (this.theTok != 268435473) (this.tokenCommand).name0 = this.ident;
this.newContextVariable (this.ident);
break;
case 3:
if (this.theTok != 268435473) return this.ERROR (15, ")");
this.isEndOfCommand = true;
this.ichEnd = this.ichToken + 1;
this.flowContext.setLine ();
break;
default:
return this.ERROR (0);
}
break;
case 102436:
case 134320141:
if (this.tokenCommand.intValue == 0) {
if (this.nTokens != 1) break;
this.tokenCommand.value = this.ident;
return 2;
}if (this.nTokens == 1) {
if (this.thisFunction != null) this.vFunctionStack.add (0, this.thisFunction);
this.thisFunction = (this.tokCommand == 102436 ? J.api.Interface.getInterface ("JS.ScriptParallelProcessor", null, null) :  new JS.ScriptFunction (this.ident, this.tokCommand));
this.thisFunction.set (this.ident, this.tokCommand);
this.htUserFunctions.put (this.ident, Boolean.TRUE);
this.flowContext.setFunction (this.thisFunction);
break;
}if (this.nTokens == 2) {
if (this.theTok != 268435472) return this.ERROR (15, "(");
break;
}if (this.nTokens == 3 && this.theTok == 268435473) break;
if (this.nTokens % 2 == 0) {
if (this.theTok != 268435504 && this.theTok != 268435473) return this.ERROR (15, ")");
break;
}this.thisFunction.addVariable (this.ident, true);
break;
case 102411:
if (this.nTokens > 1 && this.parenCount == 0 && this.braceCount == 0 && this.theTok == 268435490) {
this.addTokenToPrefix (JS.T.tokenRightParen);
this.braceCount = 1;
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}break;
case 102413:
if (this.nTokens > 1) {
this.braceCount = 1;
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}break;
case 364547:
if (this.nTokens == 1 && this.theTok != 134320649) {
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}if (this.nTokens != 1 || this.theTok != 134320649 && this.theTok != 1073742332) return this.ERROR (0);
this.replaceCommand (this.flowContext.token = JS.ContextToken.newCmd (102402, "elseif"));
this.tokCommand = 102402;
return 2;
case 102409:
if (this.nTokens != 1) return this.ERROR (0);
if (!this.checkFlowEnd (this.theTok, this.ident, this.ichCurrentCommand, true)) return 4;
if (this.theTok == 134320141 || this.theTok == 102436) {
return 2;
}break;
case 134320648:
if (this.nTokens == 1) {
if (this.theTok != 268435472) return this.ERROR (19, this.ident);
this.forPoint3 = this.nSemiSkip = 0;
this.nSemiSkip += 2;
break;
}if (this.nTokens == 3 && this.tokAt (2) == 36868) {
this.newContextVariable (this.ident);
break;
}if ((this.nTokens == 3 || this.nTokens == 4) && this.theTok == 1275068432) {
this.nSemiSkip -= 2;
this.forPoint3 = 2;
this.addTokenToPrefix (this.theToken);
this.theToken = JS.T.tokenLeftParen;
break;
}case 102410:
case 102406:
case 102402:
case 134320649:
if (this.nTokens <= 2 || this.braceCount != 0 || this.parenCount != 0) break;
case 102439:
this.isEndOfCommand = true;
this.ichEnd = this.ichToken + 1;
this.flowContext.setLine ();
break;
case 36868:
if (this.nTokens == 1) {
this.replaceCommand (JS.T.tokenSetVar);
this.newContextVariable (this.ident);
break;
} else if (this.ident.equals (",")) {
return 2;
} else if (!JU.PT.isLetter (this.ident.charAt (0))) {
if (this.nTokens != 2 || this.ident.equals ("[")) return this.ERROR (0);
this.replaceCommand (JS.T.tokenSet);
} else {
this.newContextVariable (this.ident);
break;
}case 36867:
if (this.theTok == 1073742332) this.setBraceCount++;
 else if (this.theTok == 1073742338) {
this.setBraceCount--;
if (this.isSetBrace && this.setBraceCount == 0 && this.ptNewSetModifier == 2147483647) this.ptNewSetModifier = this.nTokens + 1;
}if (this.nTokens == this.ptNewSetModifier) {
var token = this.tokenAt (0);
if (this.theTok == 268435472 || this.isUserFunction (token.value.toString ())) {
this.ltoken.set (0, this.setCommand (JS.T.tv (1073741824, 0, token.value)));
this.setBraceCount = 0;
break;
}if (this.theTok != 1073741824 && this.theTok != 268435666 && this.theTok != 12290 && (!JS.T.tokAttr (this.theTok, 536870912))) {
if (this.isNewSet) this.commandExpected ();
 else this.errorIntStr2 (18, "SET", ": " + this.ident);
return 4;
}if (this.nTokens == 1 && (this.lastToken.tok == 268435650 || this.lastToken.tok == 268435649)) {
this.replaceCommand (JS.T.tokenSet);
this.addTokenToPrefix (this.lastToken);
break;
}}break;
case 134222849:
if (this.theTok == 12290 && (this.nTokens == 1 || this.lastToken.tok == 1073741940 || this.lastToken.tok == 134217764)) {
this.addTokenToPrefix (JS.T.tokenDefineString);
return 2;
}if (this.theTok == 1073741848) this.iHaveQuotedString = false;
break;
case 12290:
if (this.nTokens == 1) {
if (this.theTok != 1073741824) {
if (this.preDefining) {
if (!JS.T.tokAttr (this.theTok, 2097152)) {
this.errorStr2 ("ERROR IN Token.java or JmolConstants.java -- the following term was used in JmolConstants.java but not listed as predefinedset in Token.java: " + this.ident, null);
return 4;
}} else if (JS.T.tokAttr (this.theTok, 2097152)) {
JU.Logger.warn ("WARNING: predefined term '" + this.ident + "' has been redefined by the user until the next file load.");
} else if (!this.isCheckOnly && this.ident.length > 1) {
JU.Logger.warn ("WARNING: redefining " + this.ident + "; was " + this.theToken + "not all commands may continue to be functional for the life of the applet!");
this.theTok = this.theToken.tok = 1073741824;
JS.T.addToken (this.ident, this.theToken);
}}this.addTokenToPrefix (this.theToken);
this.lastToken = JS.T.tokenComma;
return 2;
}if (this.nTokens == 2) {
if (this.theTok == 268435860) {
this.ltoken.add (0, JS.T.tokenSet);
return 2;
}}break;
case 135190:
case 135188:
case 135180:
var ch = this.charAt (this.ichToken + this.cchToken);
if (this.parenCount == 0 && this.bracketCount == 0 && ".:/\\+-!?".indexOf (ch) >= 0 && !(ch == '-' && this.ident.equals ("="))) this.checkUnquotedFileName ();
break;
}
return 0;
}, "~N,~B");
Clazz_defineMethod (c$, "setNewSetCommand", 
 function (isSetBrace, ident) {
this.tokCommand = 36867;
this.isNewSet = (!isSetBrace && !this.isUserFunction (ident));
this.setBraceCount = (isSetBrace ? 1 : 0);
this.bracketCount = 0;
this.setEqualPt = 2147483647;
this.ptNewSetModifier = (this.isNewSet ? (ident.equals ("(") ? 2 : 1) : 2147483647);
return ((isSetBrace || this.theToken.tok == 268435472 || this.theToken.tok == 536870918 || this.theToken.tok == 268435650 || this.theToken.tok == 268435649) ? this.theToken : JS.T.o (1073741824, ident));
}, "~B,~S");
Clazz_defineMethod (c$, "checkUnquotedFileName", 
 function () {
var ichT = this.ichToken;
var ch;
while (++ichT < this.cchScript && !JU.PT.isWhitespace (ch = this.script.charAt (ichT)) && ch != '#' && ch != ';' && ch != '}') {
}
var name = this.script.substring (this.ichToken, ichT).$replace ('\\', '/');
this.cchToken = ichT - this.ichToken;
this.theToken = JS.T.o (4, name);
});
Clazz_defineMethod (c$, "checkFlowStartBrace", 
 function (atEnd) {
var tok = this.tokCommand;
switch (tok) {
default:
if (JS.T.tokAttr (tok, 102400)) {
if (atEnd) {
switch (tok) {
case 102411:
case 102413:
break;
default:
this.flowContext.addLine = 0;
this.addBrace (this.tokenCommand);
this.lastFlowCommand = null;
break;
}
this.parenCount = this.braceCount = 0;
}return true;
}case 102407:
case 102408:
return false;
}
}, "~B");
Clazz_defineMethod (c$, "checkFlowEndBrace", 
 function () {
if (this.iBrace <= 0 || this.vBraces.get (this.iBrace - 1).tok != 1073742338) return 0;
this.vBraces.removeItemAt (--this.iBrace);
var token = this.vBraces.removeItemAt (--this.iBrace);
if (this.theTok == 1073742332) {
this.braceCount--;
this.parenCount--;
}if (token.tok == 1275335685) {
this.vPush.removeItemAt (--this.pushCount);
this.addTokenToPrefix (this.setCommand (JS.ContextToken.newContext (false)));
this.isEndOfCommand = true;
return 2;
}switch (this.flowContext == null ? 0 : this.flowContext.token.tok) {
case 134320649:
case 102402:
case 364547:
if (this.tokCommand == 364547 || this.tokCommand == 102402) return 0;
break;
case 102410:
case 102411:
case 102413:
if (this.tokCommand == 102411 || this.tokCommand == 102413) return 0;
}
return this.forceFlowEnd (token);
});
Clazz_defineMethod (c$, "forceFlowEnd", 
 function (token) {
var t0 = this.tokenCommand;
this.forceFlowContext = this.flowContext;
token = this.flowStart (token);
if (!this.checkFlowEnd (token.tok, token.value, this.ichBrace, false)) return 4;
switch (token.tok) {
case 134320141:
case 102436:
case 364558:
break;
default:
this.addTokenToPrefix (token);
}
this.setCommand (t0);
return 2;
}, "JS.T");
Clazz_defineMethod (c$, "flowStart", 
 function (token) {
switch (token.tok) {
case 134320649:
case 364547:
case 102402:
return JS.T.tokenIf;
case 102413:
case 102411:
return JS.T.tokenSwitch;
default:
return JS.T.getTokenFromName (token.value);
}
}, "JS.T");
c$.isBreakableContext = Clazz_defineMethod (c$, "isBreakableContext", 
function (tok) {
return tok == 134320648 || tok == 102439 || tok == 102406 || tok == 102411 || tok == 102413;
}, "~N");
Clazz_defineMethod (c$, "checkFlowCommand", 
 function (ident) {
var pt = this.lltoken.size ();
switch (this.tokCommand) {
case 364548:
if (!this.isFlowIfContextOK (this.flowContext)) {
if (!this.haveENDIF) return 5;
this.errorStr (1, ident);
return 4;
}this.flowContext.token.intValue = this.flowContext.setPt0 (pt, false);
this.setFlowEnd (this.tokCommand, ident);
this.flowContext = this.flowContext.parent;
return 0;
case 102407:
case 102408:
var f = (this.flowContext == null ? null : this.flowContext.getBreakableContext (0));
if (this.tokCommand == 102408) while (f != null && f.token.tok != 134320648 && f.token.tok != 102406) f = f.parent;

if (f == null) {
this.errorStr (1, ident);
return 4;
}this.setCommand (JS.T.tv (this.tokCommand, f.pt0, ident));
this.theToken = this.tokenCommand;
return 1;
case 134320141:
case 102436:
if (this.flowContext != null) {
this.errorStr (1, JS.T.nameOf (this.tokCommand));
return 4;
}break;
case 134320649:
case 364558:
case 102412:
case 134320648:
case 102439:
case 102410:
case 102406:
break;
case 102402:
case 364547:
if (this.flowContext != null && !this.isFlowIfContextOK (this.flowContext)) {
this.flowContext = this.flowContext.parent;
}if (!this.isFlowIfContextOK (this.flowContext)) {
if (!this.haveENDIF) return 5;
this.errorStr (1, ident);
return 4;
}this.flowContext.token.intValue = this.flowContext.setPt0 (pt, false);
break;
case 102411:
case 102413:
if (this.flowContext == null || this.flowContext.token.tok != 102410 && this.flowContext.token.tok != 102411 && (this.tokCommand == 102413 ? this.flowContext.ptDefault > 0 : this.flowContext.token.tok != 102413)) {
this.errorStr (1, ident);
return 4;
}this.flowContext.token.intValue = this.flowContext.setPt0 (pt, this.tokCommand == 102413);
break;
}
var ct = JS.ContextToken.newCmd (this.tokCommand, this.tokenCommand.value);
if (this.tokCommand == 102410) ct.addName ("_var");
this.setCommand (ct);
switch (this.tokCommand) {
case 364558:
this.flowContext =  new JS.ScriptFlowContext (this, ct, pt, this.flowContext, this.ichCurrentCommand, this.lineCurrent);
if (this.thisFunction != null) this.vFunctionStack.add (0, this.thisFunction);
this.thisFunction =  new JS.ScriptFunction ("", 364558);
this.flowContext.setFunction (this.thisFunction);
this.pushContext (ct);
break;
case 102411:
case 102413:
ct.contextVariables = this.flowContext.token.contextVariables;
case 364547:
case 102402:
this.flowContext.token = ct;
break;
case 102439:
case 134320648:
case 102406:
case 102412:
this.pushContext (ct);
case 134320649:
case 102410:
default:
this.flowContext =  new JS.ScriptFlowContext (this, ct, pt, this.flowContext, this.ichCurrentCommand, this.lineCurrent);
}
return 0;
}, "~S");
Clazz_defineMethod (c$, "setFlowEnd", 
 function (tokCommand, ident) {
this.setCommand (JS.T.tv (tokCommand, (this.flowContext.ptDefault > 0 ? this.flowContext.ptDefault : -this.flowContext.pt0), ident));
}, "~N,~S");
Clazz_defineMethod (c$, "isFlowIfContextOK", 
 function (f) {
switch (f == null ? 0 : f.token.tok) {
case 134320649:
case 102402:
return true;
case 364547:
return this.tokCommand != 364547;
}
return false;
}, "JS.ScriptFlowContext");
Clazz_defineMethod (c$, "checkFlowEnd", 
 function (tok, ident, pt1, isExplicitEnd) {
if (isExplicitEnd) {
if (this.flowContext == null) return this.errorStr (1, "end " + ident);
this.flowContext.addLine = 0;
this.flowContext.forceEndIf = false;
switch (this.flowContext.token.tok) {
case 134320141:
case 102436:
case 364558:
break;
default:
this.setFlowEnd (102409, "end");
this.ltoken.set (0, this.tokenCommand);
}
} else {
this.setFlowEnd (102409, "end");
this.addTokenToPrefix (this.tokenCommand);
}if (this.flowContext == null || tok != this.flowContext.tok0) return this.errorStr (1, "end " + ident);
var pt = this.lltoken.size ();
this.flowContext.token.intValue = (this.tokCommand == 102412 ? -pt : pt);
switch (tok) {
case 134320649:
case 102410:
break;
case 102412:
case 134320648:
case 102439:
case 102406:
if (!isExplicitEnd) this.vPush.removeItemAt (--this.pushCount);
break;
case 102436:
case 134320141:
case 364558:
if (!this.isCheckOnly) {
this.addTokenToPrefix (JS.T.o (tok, this.thisFunction));
JS.ScriptFunction.setFunction (this.thisFunction, this.script, pt1, this.lltoken.size (), this.lineNumbers, this.lineIndices, this.lltoken);
}this.thisFunction = (this.vFunctionStack.size () == 0 ? null : this.vFunctionStack.removeItemAt (0));
this.tokenCommand.intValue = 0;
if (tok == 364558) this.vPush.removeItemAt (--this.pushCount);
break;
default:
return this.errorStr (19, "end " + ident);
}
this.flowContext = this.flowContext.parent;
this.fixFlowAddLine (this.flowContext);
return true;
}, "~N,~S,~N,~B");
Clazz_defineMethod (c$, "fixFlowAddLine", 
 function (flowContext) {
while (flowContext != null) {
if (flowContext.addLine > 0 || flowContext.forceEndIf) {
flowContext.addLine = this.lineCurrent - flowContext.ptLine;
flowContext.forceEndIf = true;
}flowContext = flowContext.parent;
}
}, "JS.ScriptFlowContext");
Clazz_defineMethod (c$, "getData", 
 function (key) {
this.addTokenToPrefix (JS.T.o (4, key));
this.ichToken += key.length + 2;
if (this.charAt (this.ichToken) == '\r') {
this.lineCurrent++;
this.ichToken++;
}if (this.charAt (this.ichToken) == '\n') {
this.lineCurrent++;
this.ichToken++;
}var i = this.script.indexOf (this.chFirst + key + this.chFirst, this.ichToken) - 4;
if (i < 0 || !this.script.substring (i, i + 4).equalsIgnoreCase ("END ")) return false;
var str = this.script.substring (this.ichToken, i);
this.incrementLineCount (str);
this.addTokenToPrefix (JS.T.o (134221834, str));
this.addTokenToPrefix (JS.T.o (1073741824, "end"));
this.addTokenToPrefix (JS.T.o (4, key));
this.cchToken = i - this.ichToken + key.length + 6;
return true;
}, "~S");
Clazz_defineMethod (c$, "incrementLineCount", 
 function (str) {
var ch;
var pt = str.indexOf ('\r');
var pt2 = str.indexOf ('\n');
if (pt < 0 && pt2 < 0) return 0;
var n = this.lineCurrent;
if (pt < 0 || pt2 < pt) pt = pt2;
for (var i = str.length; --i >= pt; ) {
if ((ch = str.charAt (i)) == '\n' || ch == '\r') this.lineCurrent++;
}
return this.lineCurrent - n;
}, "~S");
c$.isSpaceOrTab = Clazz_defineMethod (c$, "isSpaceOrTab", 
 function (ch) {
return ch == ' ' || ch == '\t';
}, "~S");
Clazz_defineMethod (c$, "eol", 
 function (ch) {
return (ch == '\0' || ch == '\r' || ch == '\n' || ch == ';' && this.nSemiSkip <= 0);
}, "~S");
Clazz_defineMethod (c$, "lookingAtSetBraceSyntax", 
 function () {
var ichT = this.ichToken;
var nParen = 1;
while (++ichT < this.cchScript && nParen > 0) {
switch (this.script.charAt (ichT)) {
case '{':
nParen++;
break;
case '}':
nParen--;
break;
}
}
if (this.charAt (ichT) == '[' && ++nParen == 1) while (++ichT < this.cchScript && nParen > 0) {
switch (this.script.charAt (ichT)) {
case '[':
nParen++;
break;
case ']':
if (this.charAt (ichT + 1) == '[') ichT++;
 else nParen--;
break;
}
}
if (this.charAt (ichT) == '.' && nParen == 0) {
return true;
}return false;
});
Clazz_defineMethod (c$, "lookingAtString", 
 function (allowPrime) {
if (this.ichToken + 2 > this.cchScript) return false;
this.chFirst = this.script.charAt (this.ichToken);
if (this.chFirst != '"' && (!allowPrime || this.chFirst != '\'')) return false;
var ichT = this.ichToken;
var ch;
var previousCharBackslash = false;
while (++ichT < this.cchScript) {
ch = this.script.charAt (ichT);
if (ch == this.chFirst && !previousCharBackslash) break;
previousCharBackslash = (ch == '\\' ? !previousCharBackslash : false);
}
if (ichT == this.cchScript) {
this.cchToken = -1;
this.ichEnd = this.cchScript;
} else {
this.cchToken = ++ichT - this.ichToken;
}return true;
}, "~B");
Clazz_defineMethod (c$, "getUnescapedStringLiteral", 
 function (isFileName) {
if (isFileName) {
var s = this.script.substring (this.ichToken + 1, this.ichToken + this.cchToken - 1);
if (s.indexOf ("\\u") >= 0) s = JU.Escape.unescapeUnicode (s);
if (s.indexOf (";base64,") != 0) return s;
}return JS.ScriptCompiler.unescapeString (this.script, this.ichToken + 1, this.cchToken - 2);
}, "~B");
c$.unescapeString = Clazz_defineMethod (c$, "unescapeString", 
function (script, ich, nChar) {
var sb = JU.SB.newN (nChar);
var ichMax = ich + nChar;
while (ich < ichMax) {
var ch = script.charAt (ich++);
if (ch == '\\' && ich < ichMax) {
ch = script.charAt (ich++);
switch (ch) {
case 'n':
ch = '\n';
break;
case 't':
ch = '\t';
break;
case 'r':
ch = '\r';
case '"':
case '\\':
case '\'':
break;
case 'x':
case 'u':
var digitCount = ch == 'x' ? 2 : 4;
if (ich < ichMax) {
var unicode = 0;
for (var k = digitCount; --k >= 0 && ich < ichMax; ) {
var chT = script.charAt (ich);
var hexit = JU.Escape.getHexitValue (chT);
if (hexit < 0) break;
unicode <<= 4;
unicode += hexit;
++ich;
}
ch = String.fromCharCode (unicode);
}}
}sb.appendC (ch);
}
return sb.toString ();
}, "~S,~N,~N");
Clazz_defineMethod (c$, "lookingAtLoadFormat", 
 function (allchar) {
var ichT = this.ichToken;
var ch;
while ((JU.PT.isLetterOrDigit (ch = this.charAt (ichT)) && (allchar || JU.PT.isLetter (ch)) || allchar && (!this.eol (ch) && !JU.PT.isWhitespace (ch)))) ++ichT;

if (!allchar && ichT == this.ichToken || !JS.ScriptCompiler.isSpaceOrTab (ch)) return false;
this.cchToken = ichT - this.ichToken;
return true;
}, "~B");
Clazz_defineMethod (c$, "lookingAtImpliedString", 
 function (allowSpace, allowEquals, allowSptParen) {
var ichT = this.ichToken;
var ch = this.script.charAt (ichT);
var isID = (this.lastToken.tok == 1073741974);
var passVariableToString = (JS.T.tokAttr (this.tokCommand, 20480) && (this.tokCommand & 1) == 1);
var isVariable = (ch == '@');
var isMath = (isVariable && ichT + 3 < this.cchScript && this.script.charAt (ichT + 1) == '{');
if (isMath && (isID || !passVariableToString)) return false;
var ptSpace = -1;
var ptLastChar = -1;
var isOK = true;
var parenpt = 0;
while (isOK && !this.eol (ch = this.charAt (ichT))) {
switch (ch) {
case '(':
if (!allowSptParen) {
if (this.tokCommand == 4124 || ichT >= 5 && (this.script.substring (ichT - 4, ichT).equals (".spt") || this.script.substring (ichT - 4, ichT).equals (".png") || this.script.substring (ichT - 5, ichT).equals (".pngj"))) {
isOK = false;
continue;
}}break;
case '=':
if (!allowEquals) {
isOK = false;
continue;
}break;
case '{':
parenpt++;
break;
case '}':
parenpt--;
if (parenpt < 0 && (this.braceCount > 0 || this.iBrace > 0)) {
isOK = false;
continue;
}default:
if (JU.PT.isWhitespace (ch)) {
if (ptSpace < 0) ptSpace = ichT;
} else {
ptLastChar = ichT;
}break;
}
++ichT;
}
if (allowSpace) ichT = ptLastChar + 1;
 else if (ptSpace > 0) ichT = ptSpace;
if (isVariable && (!allowSpace || ptSpace < 0 && parenpt <= 0 && ichT - this.ichToken > 1)) {
return false;
}return (this.cchToken = ichT - this.ichToken) > 0;
}, "~B,~B,~B");
Clazz_defineMethod (c$, "lookingAtExponential", 
 function () {
if (this.ichToken == this.cchScript) return NaN;
var ichT = this.ichToken;
var pt0 = ichT;
if (this.script.charAt (ichT) == '-') ++ichT;
var isOK = false;
var ch = 'X';
while (JU.PT.isDigit (ch = this.charAt (ichT))) {
++ichT;
isOK = true;
}
if (ichT < this.cchScript && ch == '.') ++ichT;
while (JU.PT.isDigit (ch = this.charAt (ichT))) {
++ichT;
isOK = true;
}
if (ichT == this.cchScript || !isOK) return NaN;
isOK = (ch != 'E' && ch != 'e');
if (isOK || ++ichT == this.cchScript) return NaN;
ch = this.script.charAt (ichT);
if (ch == '-' || ch == '+') ichT++;
while (JU.PT.isDigit (this.charAt (ichT))) {
ichT++;
isOK = true;
}
if (!isOK) return NaN;
this.cchToken = ichT - this.ichToken;
return JU.PT.dVal (this.script.substring (pt0, ichT));
});
Clazz_defineMethod (c$, "lookingAtDecimal", 
 function () {
if (this.ichToken == this.cchScript) return false;
var ichT = this.ichToken;
if (this.script.charAt (ichT) == '-') ++ichT;
var digitSeen = false;
var ch;
while (JU.PT.isDigit (ch = this.charAt (ichT++))) digitSeen = true;

if (ch != '.') return false;
var ch1 = this.charAt (ichT);
if (!JS.ScriptCompiler.isSpaceOrTab (ch1) && !this.eol (ch1)) {
if (JU.PT.isLetter (ch1) || ch1 == '?' || ch1 == '*' || ch1 == '_') return false;
if (JU.PT.isLetter (ch1 = this.charAt (ichT + 1)) || ch1 == '?') return false;
}while (JU.PT.isDigit (this.charAt (ichT))) {
++ichT;
digitSeen = true;
}
this.cchToken = ichT - this.ichToken;
return digitSeen;
});
Clazz_defineMethod (c$, "lookingAtSeqcode", 
 function () {
var ichT = this.ichToken;
var ch;
if (this.charAt (ichT + 1) == '^' && this.script.charAt (ichT) == '*') {
ch = '^';
++ichT;
} else {
if (this.script.charAt (ichT) == '-') ++ichT;
while (JU.PT.isDigit (ch = this.charAt (ichT))) ++ichT;

}if (ch != '^') return false;
ichT++;
if (ichT == this.cchScript) ch = ' ';
 else ch = this.script.charAt (ichT++);
if (ch != ' ' && ch != '*' && ch != '?' && !JU.PT.isLetter (ch)) return false;
this.cchToken = ichT - this.ichToken;
return true;
});
Clazz_defineMethod (c$, "lookingAtInteger", 
 function () {
if (this.ichToken == this.cchScript) return 2147483647;
var ichT = this.ichToken;
if (this.script.charAt (this.ichToken) == '-') ++ichT;
var ichBeginDigits = ichT;
while (JU.PT.isDigit (this.charAt (ichT))) ++ichT;

if (ichBeginDigits == ichT) return 2147483647;
this.cchToken = ichT - this.ichToken;
try {
var val = Integer.parseInt (this.ident = this.script.substring (this.ichToken, ichT));
return val;
} catch (e) {
if (Clazz_exceptionOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return 2147483647;
});
Clazz_defineMethod (c$, "lookingAtBitset", 
function () {
if (this.script.indexOf ("({null})", this.ichToken) == this.ichToken) {
this.cchToken = 8;
return  new JU.BS ();
}var ichT;
if (this.ichToken + 4 > this.cchScript || this.script.charAt (this.ichToken + 1) != '{' || (ichT = this.script.indexOf ("}", this.ichToken)) < 0 || ichT + 1 == this.cchScript) return null;
var bs = JU.BS.unescape (this.script.substring (this.ichToken, ichT + 2));
if (bs != null) this.cchToken = ichT + 2 - this.ichToken;
return bs;
});
Clazz_defineMethod (c$, "lookingAtObjectID", 
 function () {
var allowWildID = (this.nTokens == 1);
var ichT = this.ichToken;
if (this.charAt (ichT) != '$') return false;
if (this.charAt (++ichT) == '"') return false;
while (ichT < this.cchScript) {
var ch;
if (JU.PT.isWhitespace (ch = this.script.charAt (ichT))) {
if (ichT == this.ichToken + 1) return false;
break;
}if (!JU.PT.isLetterOrDigit (ch)) {
switch (ch) {
default:
return false;
case '*':
if (!allowWildID) return false;
break;
case '~':
case '_':
break;
}
}ichT++;
}
this.cchToken = ichT - (++this.ichToken);
return true;
});
Clazz_defineMethod (c$, "lookingAtLookupToken", 
 function (ichT) {
if (ichT == this.cchScript) return false;
var ichT0 = ichT;
this.afterMath = (this.tokLastMath != 0 ? ichT : 0);
this.tokLastMath = 0;
var ch;
switch (ch = this.script.charAt (ichT++)) {
case '-':
case '+':
case '&':
case '|':
case '*':
if (ichT < this.cchScript) {
if (this.script.charAt (ichT) == ch) {
++ichT;
if (ch == '-' || ch == '+') break;
if (ch == '&' && this.charAt (ichT) == ch) ++ichT;
} else if (this.script.charAt (ichT) == '=') {
++ichT;
}}this.tokLastMath = 1;
break;
case '/':
if (this.charAt (ichT) == '/') break;
case '\\':
case '!':
if (this.charAt (ichT) == '=') ++ichT;
this.tokLastMath = 1;
break;
case ')':
case ']':
case '}':
break;
case '.':
if (this.charAt (ichT) == '.') ++ichT;
this.tokLastMath = 1;
break;
case '@':
case '{':
this.tokLastMath = 2;
break;
case ':':
this.tokLastMath = 1;
break;
case '(':
case ',':
case '$':
case ';':
case '[':
case '%':
this.tokLastMath = 1;
break;
case '<':
case '=':
case '>':
if ((ch = this.charAt (ichT)) == '<' || ch == '=' || ch == '>') ++ichT;
this.tokLastMath = 1;
break;
default:
if (!JU.PT.isLetter (ch) && !this.isDotDot) return false;
case '~':
case '_':
case '\'':
case '?':
if (ch == '?') this.tokLastMath = 1;
while (JU.PT.isLetterOrDigit (ch = this.charAt (ichT)) || ch == '_' || ch == '*' && this.charAt (ichT - 1) == '?' || ch == '?' || ch == '~' || ch == '\'' || ch == '\\' && this.charAt (ichT + 1) == '?' || ch == '^' && ichT > ichT0 && JU.PT.isDigit (this.charAt (ichT - 1))) ++ichT;

break;
}
this.cchToken = ichT - ichT0;
return true;
}, "~N");
Clazz_defineMethod (c$, "lookForSyncID", 
 function () {
var ch;
if ((ch = this.charAt (this.ichToken)) == '"' || ch == '@' || ch == '\0') return false;
var ichT = this.ichToken;
while (!JS.ScriptCompiler.isSpaceOrTab (ch = this.charAt (ichT)) && ch != '#' && ch != '}' && !this.eol (ch)) ++ichT;

this.cchToken = ichT - this.ichToken;
return true;
});
Clazz_defineMethod (c$, "ERROR", 
 function (error) {
this.errorIntStr2 (error, null, null);
return 4;
}, "~N");
Clazz_defineMethod (c$, "ERROR", 
 function (error, value) {
this.errorStr (error, value);
return 4;
}, "~N,~S");
Clazz_defineMethod (c$, "handleError", 
 function () {
this.errorType = this.errorMessage;
this.errorLine = this.script.substring (this.ichCurrentCommand, this.ichEnd <= this.ichCurrentCommand ? this.ichToken + this.cchToken : this.ichEnd);
var lineInfo = (this.ichToken < this.ichEnd ? this.errorLine.substring (0, this.ichToken - this.ichCurrentCommand) + " >>>> " + this.errorLine.substring (this.ichToken - this.ichCurrentCommand) : this.errorLine) + " <<<<";
this.errorMessage = J.i18n.GT.$ ("script compiler ERROR: ") + this.errorMessage + JS.ScriptError.getErrorLineMessage (null, this.filename, this.lineCurrent, this.iCommand, lineInfo);
if (!this.isSilent) {
this.ichToken = Math.max (this.ichEnd, this.ichToken);
while (!this.lookingAtEndOfLine () && !this.lookingAtTerminator ()) this.ichToken++;

this.errorLine = this.script.substring (this.ichCurrentCommand, this.ichToken);
this.vwr.addCommand (this.errorLine + "#??");
JU.Logger.error (this.errorMessage);
}return false;
});
Clazz_defineStatics (c$,
"OK", 0,
"OK2", 1,
"CONTINUE", 2,
"EOL", 3,
"$ERROR", 4,
"RESTART", 5);
});
Clazz_declarePackage ("JS");
Clazz_load (["J.thread.JmolThread"], "JS.ScriptDelayThread", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.millis = 0;
this.seconds = 0;
this.doPopPush = false;
this.isPauseDelay = false;
Clazz_instantialize (this, arguments);
}, JS, "ScriptDelayThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function (eval, vwr, millis) {
Clazz_superConstructor (this, JS.ScriptDelayThread, []);
this.setViewer (vwr, "ScriptDelayThread");
this.millis = millis;
this.setEval (eval);
}, "J.api.JmolScriptEvaluator,JV.Viewer,~N");
Clazz_overrideMethod (c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
var delayMax;
this.doPopPush = (this.millis > 0);
this.isPauseDelay = (this.millis == -100);
if (!this.doPopPush) this.millis = -this.millis;
 else if ((delayMax = this.vwr.getDelayMaximumMs ()) > 0 && this.millis > delayMax) this.millis = delayMax;
this.millis -= System.currentTimeMillis () - this.startTime;
if (this.isJS) {
this.seconds = 0;
} else {
this.seconds = Clazz_doubleToInt (this.millis / 1000);
this.millis -= this.seconds * 1000;
if (this.millis <= 0) this.millis = 1;
}if (this.doPopPush) this.vwr.popHoldRepaint ("scriptDelayThread INIT");
mode = 0;
break;
case 0:
if (this.stopped || this.eval.isStopped ()) {
mode = -2;
break;
}if (!this.runSleep (this.seconds-- > 0 ? 1000 : this.millis, -2)) return;
if (this.seconds < 0) this.millis = 0;
mode = (this.seconds > 0 || this.millis > 0 ? 0 : -2);
break;
case -2:
if (this.doPopPush) this.vwr.pushHoldRepaintWhy ("delay FINISH");
if (this.isPauseDelay) this.eval.notifyResumeStatus ();
this.resumeEval ();
return;
}

}, "~N");
Clazz_defineStatics (c$,
"PAUSE_DELAY", -100);
});
Clazz_declarePackage ("JS");
Clazz_load (["J.api.JmolScriptEvaluator"], "JS.ScriptError", ["java.lang.NullPointerException", "JU.PT", "J.i18n.GT", "JS.ScriptException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.chk = false;
this.ignoreError = false;
this.$error = false;
this.errorMessage = null;
this.errorMessageUntranslated = null;
this.errorType = null;
this.iCommandError = 0;
Clazz_instantialize (this, arguments);
}, JS, "ScriptError", null, J.api.JmolScriptEvaluator);
Clazz_overrideMethod (c$, "getErrorMessage", 
function () {
return this.errorMessage;
});
Clazz_overrideMethod (c$, "getErrorMessageUntranslated", 
function () {
return this.errorMessageUntranslated == null ? this.errorMessage : this.errorMessageUntranslated;
});
Clazz_defineMethod (c$, "invArg", 
function () {
this.error (22);
});
Clazz_defineMethod (c$, "bad", 
function () {
this.error (2);
});
Clazz_defineMethod (c$, "integerOutOfRange", 
function (min, max) {
this.errorOrWarn (21, "" + min, "" + max, null, true);
}, "~N,~N");
Clazz_defineMethod (c$, "numberOutOfRange", 
function (min, max) {
this.errorOrWarn (36, "" + min, "" + max, null, true);
}, "~N,~N");
Clazz_defineMethod (c$, "error", 
function (iError) {
this.errorOrWarn (iError, null, null, null, false);
}, "~N");
Clazz_defineMethod (c$, "errorStr", 
function (iError, value) {
this.errorOrWarn (iError, value, null, null, false);
}, "~N,~S");
Clazz_defineMethod (c$, "errorStr2", 
function (iError, value, more) {
this.errorOrWarn (iError, value, more, null, false);
}, "~N,~S,~S");
Clazz_defineMethod (c$, "errorMore", 
function (iError, value, more, more2) {
this.errorOrWarn (iError, value, more, more2, false);
}, "~N,~S,~S,~S");
Clazz_defineMethod (c$, "warning", 
function (iError, value, more) {
this.errorOrWarn (iError, value, more, null, true);
}, "~N,~S,~S");
Clazz_defineMethod (c$, "errorOrWarn", 
 function (iError, value, more, more2, warningOnly) {
var strError = (this.ignoreError ? null : JS.ScriptError.errorString (iError, value, more, more2, true));
var strUntranslated = (this.ignoreError || !J.i18n.GT.getDoTranslate () ? null : JS.ScriptError.errorString (iError, value, more, more2, false));
if (!warningOnly) this.evalError (strError, strUntranslated);
this.showStringPrint (strError, true);
}, "~N,~S,~S,~S,~B");
Clazz_defineMethod (c$, "evalError", 
function (message, strUntranslated) {
if (this.ignoreError) throw  new NullPointerException ();
if (strUntranslated == null) strUntranslated = message;
if (!this.chk) {
this.setCursorWait (false);
this.vwr.setBooleanProperty ("refreshing", true);
this.vwr.setStringProperty ("_errormessage", strUntranslated);
}throw  new JS.ScriptException (this, message, strUntranslated, true);
}, "~S,~S");
Clazz_defineMethod (c$, "setCursorWait", 
function (TF) {
if (!this.chk) this.vwr.setCursor (TF ? 3 : 0);
}, "~B");
c$.errorString = Clazz_defineMethod (c$, "errorString", 
function (iError, value, more, more2, translated) {
var doTranslate = false;
if (!translated && (doTranslate = J.i18n.GT.getDoTranslate ()) == true) J.i18n.GT.setDoTranslate (false);
var msg;
switch (iError) {
default:
msg = "Unknown error message number: " + iError;
break;
case 0:
msg = J.i18n.GT.$ ("x y z axis expected");
break;
case 1:
msg = J.i18n.GT.$ ("{0} not allowed with background model displayed");
break;
case 2:
msg = J.i18n.GT.$ ("bad argument count");
break;
case 3:
msg = J.i18n.GT.$ ("Miller indices cannot all be zero.");
break;
case 4:
msg = J.i18n.GT.$ ("bad [R,G,B] color");
break;
case 5:
msg = J.i18n.GT.$ ("boolean expected");
break;
case 6:
msg = J.i18n.GT.$ ("boolean or number expected");
break;
case 7:
msg = J.i18n.GT.$ ("boolean, number, or {0} expected");
break;
case 56:
msg = J.i18n.GT.$ ("cannot set value");
break;
case 8:
msg = J.i18n.GT.$ ("color expected");
break;
case 9:
msg = J.i18n.GT.$ ("a color or palette name (Jmol, Rasmol) is required");
break;
case 10:
msg = J.i18n.GT.$ ("command expected");
break;
case 11:
msg = J.i18n.GT.$ ("{x y z} or $name or (atom expression) required");
break;
case 12:
msg = J.i18n.GT.$ ("draw object not defined");
break;
case 13:
msg = J.i18n.GT.$ ("unexpected end of script command");
break;
case 14:
msg = J.i18n.GT.$ ("valid (atom expression) expected");
break;
case 15:
msg = J.i18n.GT.$ ("(atom expression) or integer expected");
break;
case 16:
msg = J.i18n.GT.$ ("filename expected");
break;
case 17:
msg = J.i18n.GT.$ ("file not found");
break;
case 18:
msg = J.i18n.GT.$ ("incompatible arguments");
break;
case 19:
msg = J.i18n.GT.$ ("insufficient arguments");
break;
case 20:
msg = J.i18n.GT.$ ("integer expected");
break;
case 21:
msg = J.i18n.GT.$ ("integer out of range ({0} - {1})");
break;
case 22:
msg = J.i18n.GT.$ ("invalid argument");
break;
case 23:
msg = J.i18n.GT.$ ("invalid parameter order");
break;
case 24:
msg = J.i18n.GT.$ ("keyword expected");
break;
case 25:
msg = J.i18n.GT.$ ("no MO coefficient data available");
break;
case 26:
msg = J.i18n.GT.$ ("An MO index from 1 to {0} is required");
break;
case 27:
msg = J.i18n.GT.$ ("no MO basis/coefficient data available for this frame");
break;
case 28:
msg = J.i18n.GT.$ ("no MO occupancy data available");
break;
case 29:
msg = J.i18n.GT.$ ("Only one molecular orbital is available in this file");
break;
case 30:
msg = J.i18n.GT.$ ("{0} require that only one model be displayed");
break;
case 55:
msg = J.i18n.GT.$ ("{0} requires that only one model be loaded");
break;
case 31:
msg = J.i18n.GT.$ ("No data available");
break;
case 32:
msg = J.i18n.GT.$ ("No partial charges were read from the file; Jmol needs these to render the MEP data.");
break;
case 33:
msg = J.i18n.GT.$ ("No unit cell");
break;
case 34:
msg = J.i18n.GT.$ ("number expected");
break;
case 35:
msg = J.i18n.GT.$ ("number must be ({0} or {1})");
break;
case 36:
msg = J.i18n.GT.$ ("decimal number out of range ({0} - {1})");
break;
case 37:
msg = J.i18n.GT.$ ("object name expected after '$'");
break;
case 38:
msg = J.i18n.GT.$ ("plane expected -- either three points or atom expressions or {0} or {1} or {2}");
break;
case 39:
msg = J.i18n.GT.$ ("property name expected");
break;
case 40:
msg = J.i18n.GT.$ ("space group {0} was not found.");
break;
case 41:
msg = J.i18n.GT.$ ("quoted string expected");
break;
case 42:
msg = J.i18n.GT.$ ("quoted string or identifier expected");
break;
case 43:
msg = J.i18n.GT.$ ("too many rotation points were specified");
break;
case 44:
msg = J.i18n.GT.$ ("too many script levels");
break;
case 45:
msg = J.i18n.GT.$ ("unrecognized atom property");
break;
case 46:
msg = J.i18n.GT.$ ("unrecognized bond property");
break;
case 47:
msg = J.i18n.GT.$ ("unrecognized command");
break;
case 48:
msg = J.i18n.GT.$ ("runtime unrecognized expression");
break;
case 49:
msg = J.i18n.GT.$ ("unrecognized object");
break;
case 50:
msg = J.i18n.GT.$ ("unrecognized {0} parameter");
break;
case 51:
msg = J.i18n.GT.$ ("unrecognized {0} parameter in Jmol state script (set anyway)");
break;
case 52:
msg = J.i18n.GT.$ ("unrecognized SHOW parameter --  use {0}");
break;
case 53:
msg = "{0}";
break;
case 54:
msg = J.i18n.GT.$ ("write what? {0} or {1} \"filename\"");
break;
}
if (msg.indexOf ("{0}") < 0) {
if (value != null) msg += ": " + value;
} else {
msg = JU.PT.rep (msg, "{0}", value);
if (msg.indexOf ("{1}") >= 0) msg = JU.PT.rep (msg, "{1}", more);
 else if (more != null) msg += ": " + more;
if (msg.indexOf ("{2}") >= 0) msg = JU.PT.rep (msg, "{2}", more);
}if (doTranslate) J.i18n.GT.setDoTranslate (true);
return msg;
}, "~N,~S,~S,~S,~B");
c$.getErrorLineMessage = Clazz_defineMethod (c$, "getErrorLineMessage", 
function (functionName, filename, lineCurrent, pcCurrent, lineInfo) {
var err = "\n----";
if (filename != null || functionName != null) err += "line " + lineCurrent + " command " + (pcCurrent + 1) + " of " + (functionName == null ? filename : functionName.equals ("try") ? "try" : "function " + functionName) + ":";
err += "\n         " + lineInfo;
return err;
}, "~S,~S,~N,~N,~S");
Clazz_defineMethod (c$, "setErrorMessage", 
function (err) {
this.errorMessageUntranslated = null;
if (err == null) {
this.$error = false;
this.errorType = null;
this.errorMessage = null;
this.iCommandError = -1;
return;
}this.$error = true;
if (this.errorMessage == null) this.errorMessage = J.i18n.GT.$ ("script ERROR: ");
this.errorMessage += err;
}, "~S");
Clazz_defineStatics (c$,
"ERROR_axisExpected", 0,
"ERROR_backgroundModelError", 1,
"ERROR_badArgumentCount", 2,
"ERROR_badMillerIndices", 3,
"ERROR_badRGBColor", 4,
"ERROR_booleanExpected", 5,
"ERROR_booleanOrNumberExpected", 6,
"ERROR_booleanOrWhateverExpected", 7,
"ERROR_colorExpected", 8,
"ERROR_colorOrPaletteRequired", 9,
"ERROR_commandExpected", 10,
"ERROR_coordinateOrNameOrExpressionRequired", 11,
"ERROR_drawObjectNotDefined", 12,
"ERROR_endOfStatementUnexpected", 13,
"ERROR_expressionExpected", 14,
"ERROR_expressionOrIntegerExpected", 15,
"ERROR_filenameExpected", 16,
"ERROR_fileNotFoundException", 17,
"ERROR_incompatibleArguments", 18,
"ERROR_insufficientArguments", 19,
"ERROR_integerExpected", 20,
"ERROR_integerOutOfRange", 21,
"ERROR_invalidArgument", 22,
"ERROR_invalidParameterOrder", 23,
"ERROR_keywordExpected", 24,
"ERROR_moCoefficients", 25,
"ERROR_moIndex", 26,
"ERROR_moModelError", 27,
"ERROR_moOccupancy", 28,
"ERROR_moOnlyOne", 29,
"ERROR_multipleModelsDisplayedNotOK", 30,
"ERROR_noData", 31,
"ERROR_noPartialCharges", 32,
"ERROR_noUnitCell", 33,
"ERROR_numberExpected", 34,
"ERROR_numberMustBe", 35,
"ERROR_numberOutOfRange", 36,
"ERROR_objectNameExpected", 37,
"ERROR_planeExpected", 38,
"ERROR_propertyNameExpected", 39,
"ERROR_spaceGroupNotFound", 40,
"ERROR_stringExpected", 41,
"ERROR_stringOrIdentifierExpected", 42,
"ERROR_tooManyPoints", 43,
"ERROR_tooManyScriptLevels", 44,
"ERROR_unrecognizedAtomProperty", 45,
"ERROR_unrecognizedBondProperty", 46,
"ERROR_unrecognizedCommand", 47,
"ERROR_unrecognizedExpression", 48,
"ERROR_unrecognizedObject", 49,
"ERROR_unrecognizedParameter", 50,
"ERROR_unrecognizedParameterWarning", 51,
"ERROR_unrecognizedShowParameter", 52,
"ERROR_what", 53,
"ERROR_writeWhat", 54,
"ERROR_multipleModelsNotOK", 55,
"ERROR_cannotSet", 56);
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.ScriptExpr"], "JS.ScriptEval", ["java.lang.Boolean", "$.Float", "$.NullPointerException", "$.Thread", "java.util.Arrays", "$.Hashtable", "$.Map", "JU.AU", "$.BArray", "$.BS", "$.Base64", "$.Lst", "$.M3", "$.M4", "$.Measure", "$.P3", "$.P4", "$.PT", "$.Quat", "$.SB", "$.V3", "J.api.Interface", "$.JmolParallelProcessor", "J.atomdata.RadiusData", "J.c.PAL", "$.STR", "$.VDW", "J.i18n.GT", "JM.BondSet", "$.Group", "JS.FileLoadThread", "$.SV", "$.ScriptCompiler", "$.ScriptContext", "$.ScriptDelayThread", "$.ScriptInterruption", "$.ScriptManager", "$.ScriptMathProcessor", "$.T", "JU.BSUtil", "$.ColorEncoder", "$.Edge", "$.Elements", "$.Escape", "$.Font", "$.Logger", "$.Parser", "$.SimpleUnitCell", "$.Txt", "JV.ActionManager", "$.FileManager", "$.JC", "$.StateManager", "$.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
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
Clazz_instantialize (this, arguments);
}, JS, "ScriptEval", JS.ScriptExpr);
Clazz_overrideMethod (c$, "getAllowJSThreads", 
function () {
return this.allowJSThreads;
});
Clazz_defineMethod (c$, "setAllowJSThreads", 
function (b) {
this.allowJSThreads = b;
}, "~B");
Clazz_defineMethod (c$, "doReport", 
function () {
return (!this.tQuiet && this.scriptLevel <= JS.ScriptEval.scriptReportingLevel);
});
Clazz_overrideMethod (c$, "isStateScript", 
function () {
return this.$isStateScript;
});
Clazz_overrideMethod (c$, "setStatic", 
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
Clazz_overrideMethod (c$, "getScript", 
function () {
return this.script;
});
Clazz_makeConstructor (c$, 
function () {
this.currentThread = Thread.currentThread ();
});
Clazz_overrideMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
this.compiler = (this.compiler == null ? vwr.compiler : this.compiler);
this.isJS = vwr.isSingleThreaded;
return this;
}, "JV.Viewer");
Clazz_overrideMethod (c$, "setCompiler", 
function () {
this.vwr.compiler = this.compiler =  new JS.ScriptCompiler (this.vwr);
});
Clazz_overrideMethod (c$, "compileScriptString", 
function (script, tQuiet) {
this.clearState (tQuiet);
this.contextPath = "[script]";
return this.compileScript (null, script, this.debugScript);
}, "~S,~B");
Clazz_overrideMethod (c$, "compileScriptFile", 
function (filename, tQuiet) {
this.clearState (tQuiet);
this.contextPath = filename;
return this.compileScriptFileInternal (filename, null, null, null);
}, "~S,~B");
Clazz_overrideMethod (c$, "evaluateCompiledScript", 
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
Clazz_defineMethod (c$, "useThreads", 
function () {
return (!this.chk && !this.vwr.headless && !this.vwr.autoExit && this.vwr.haveDisplay && this.outputBuffer == null && this.allowJSThreads);
});
Clazz_defineMethod (c$, "executeCommands", 
 function (isTry, reportCompletion) {
var haveError = false;
try {
if (!this.dispatchCommands (false, false, isTry)) return;
} catch (e$$) {
if (Clazz_exceptionOf (e$$, Error)) {
var er = e$$;
{
this.vwr.handleError (er, false);
this.setErrorMessage ("" + er + " " + this.vwr.getShapeErrorState ());
this.errorMessageUntranslated = "" + er;
this.report (this.errorMessage, true);
haveError = true;
}
} else if (Clazz_exceptionOf (e$$, JS.ScriptException)) {
var e = e$$;
{
if (Clazz_instanceOf (e, JS.ScriptInterruption) && (!isTry || !e.isError)) {
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
Clazz_overrideMethod (c$, "resumeEval", 
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
Clazz_defineMethod (c$, "resumeViewer", 
 function (why) {
this.vwr.setTainted (true);
this.vwr.popHoldRepaint (why + (this.chk ? "\u0001## REPAINT_IGNORE ##" : ""));
this.vwr.queueOnHold = false;
}, "~S");
Clazz_overrideMethod (c$, "runScript", 
function (script) {
if (!this.vwr.isPreviewOnly) this.runScriptBuffer (script, this.outputBuffer, false);
}, "~S");
Clazz_overrideMethod (c$, "runScriptBuffer", 
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
Clazz_overrideMethod (c$, "checkScriptSilent", 
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
if (Clazz_exceptionOf (e, JS.ScriptException)) {
this.setErrorMessage (e.toString ());
sc = this.getScriptContext ("checkScriptSilent");
} else {
throw e;
}
}
this.chk = false;
return sc;
}, "~S");
c$.getContextTrace = Clazz_defineMethod (c$, "getContextTrace", 
function (vwr, sc, sb, isTop) {
if (sb == null) sb =  new JU.SB ();
var pc = Math.min (sc.pc, sc.lineNumbers[sc.lineNumbers.length - 1]);
sb.append (JS.ScriptError.getErrorLineMessage (sc.functionName, sc.scriptFileName, sc.lineNumbers[pc], pc, JS.ScriptEval.statementAsString (vwr, sc.statement, (isTop ? sc.iToken : 9999), false)));
if (sc.parentContext != null) JS.ScriptEval.getContextTrace (vwr, sc.parentContext, sb, false);
return sb;
}, "JV.Viewer,JS.ScriptContext,JU.SB,~B");
Clazz_overrideMethod (c$, "setDebugging", 
function () {
this.debugScript = this.vwr.getBoolean (603979825);
this.debugHigh = (this.debugScript && JU.Logger.debugging);
});
Clazz_overrideMethod (c$, "haltExecution", 
function () {
if (this.isEmbedded) {
this.vwr.setBooleanProperty ("allowEmbeddedScripts", true);
this.isEmbedded = false;
}this.resumePausedExecution ();
this.executionStopped = true;
});
Clazz_overrideMethod (c$, "pauseExecution", 
function (withDelay) {
if (this.chk || this.vwr.headless) return;
if (withDelay && !this.isJS) this.delayScript (-100);
this.vwr.popHoldRepaint ("pauseExecution " + withDelay);
this.executionStepping = false;
this.executionPaused = true;
}, "~B");
Clazz_overrideMethod (c$, "stepPausedExecution", 
function () {
this.executionStepping = true;
this.executionPaused = false;
});
Clazz_overrideMethod (c$, "resumePausedExecution", 
function () {
this.executionPaused = false;
this.executionStepping = false;
});
Clazz_overrideMethod (c$, "isExecuting", 
function () {
return this.executing && !this.executionStopped;
});
Clazz_overrideMethod (c$, "isPaused", 
function () {
return this.executionPaused;
});
Clazz_overrideMethod (c$, "isStepping", 
function () {
return this.executionStepping;
});
Clazz_overrideMethod (c$, "isStopped", 
function () {
return this.executionStopped || !this.isJS && this.currentThread !== Thread.currentThread ();
});
Clazz_overrideMethod (c$, "getNextStatement", 
function () {
return (this.pc < this.aatoken.length ? JS.ScriptError.getErrorLineMessage (this.functionName, this.scriptFileName, this.getLinenumber (null), this.pc, JS.ScriptEval.statementAsString (this.vwr, this.aatoken[this.pc], -9999, this.debugHigh)) : "");
});
Clazz_defineMethod (c$, "getCommand", 
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
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.error ("darn problem in Eval getCommand: ichBegin=" + ichBegin + " ichEnd=" + ichEnd + " len = " + this.script.length + "\n" + e);
} else {
throw e;
}
}
return s;
}, "~N,~B,~B");
Clazz_defineMethod (c$, "logDebugScript", 
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
Clazz_overrideMethod (c$, "evaluateExpression", 
function (expr, asVariable, compileOnly) {
var e = ( new JS.ScriptEval ()).setViewer (this.vwr);
try {
e.thisContext = this.thisContext;
e.contextVariables = this.contextVariables;
e.pushContext (null, "evalExp");
e.setAllowJSThreads (false);
} catch (e1) {
if (Clazz_exceptionOf (e1, JS.ScriptException)) {
} else {
throw e1;
}
}
var exec0 = this.executing;
var o = (e.evaluate (expr, asVariable, compileOnly));
this.executing = exec0;
return o;
}, "~O,~B,~B");
Clazz_defineMethod (c$, "runBufferedSafely", 
function (script, outputBuffer) {
if (outputBuffer == null) outputBuffer = this.outputBuffer;
var e = ( new JS.ScriptEval ()).setViewer (this.vwr);
var exec0 = this.executing;
try {
e.runScriptBuffer (script, outputBuffer, false);
} catch (e1) {
if (Clazz_exceptionOf (e1, JS.ScriptException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
this.executing = exec0;
}, "~S,JU.SB");
c$.runUserAction = Clazz_defineMethod (c$, "runUserAction", 
function (functionName, params, vwr) {
var ev = ( new JS.ScriptEval ()).setViewer (vwr);
var func = vwr.getFunction (functionName.toLowerCase ());
if (func == null) return null;
try {
var svparams = JS.SV.getVariableAO (params).getList ();
ev.restoreFunction (func, svparams, null);
ev.dispatchCommands (false, true, false);
} catch (e) {
if (Clazz_exceptionOf (e, JS.ScriptException)) {
return null;
} else {
throw e;
}
}
var ret = ev.getContextVariableAsVariable ("_retval", false);
return (ret == null ? JS.SV.vT : ret);
}, "~S,~A,JV.Viewer");
Clazz_defineMethod (c$, "evaluate", 
 function (expr, asVariable, compileOnly) {
try {
if (Clazz_instanceOf (expr, String)) {
if (this.compileScript (null, "e_x_p_r_e_s_s_i_o_n = " + expr, false)) {
if (compileOnly) return this.aatoken[0];
this.setStatement (this.aatoken[0], 1);
return (asVariable ? this.parameterExpressionList (2, -1, false).get (0) : this.parameterExpressionString (2, 0));
}} else if (Clazz_instanceOf (expr, Array)) {
var bs = this.atomExpression (expr, 0, 0, true, false, null, false);
return (asVariable ? JS.SV.newV (10, bs) : bs);
} else if (Clazz_instanceOf (expr, Array)) {
this.setStatement ((expr)[0], 1);
return (asVariable ? this.parameterExpressionList (0, -1, false).get (0) : this.parameterExpressionString (0, -1));
}} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
JU.Logger.error ("Error evaluating: " + expr + "\n" + ex);
} else {
throw ex;
}
}
return (asVariable ? JS.SV.getVariable ("ERROR") : "ERROR");
}, "~O,~B,~B");
Clazz_overrideMethod (c$, "checkSelect", 
function (h, where) {
var ok = false;
try {
this.pushContext (null, "checkSelect");
ok = this.parameterExpressionSelect (h, where);
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
JU.Logger.error ("checkSelect " + ex);
} else {
throw ex;
}
}
this.popContext (false, false);
return ok;
}, "java.util.Map,~A");
Clazz_overrideMethod (c$, "getAtomBitSet", 
function (atomExpression) {
if (Clazz_instanceOf (atomExpression, JU.BS)) return atomExpression;
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
if (Clazz_exceptionOf (ex, Exception)) {
JU.Logger.error ("getAtomBitSet " + atomExpression + "\n" + ex);
} else {
throw ex;
}
}
this.executing = executing;
return bs;
}, "~O");
Clazz_defineMethod (c$, "compileScript", 
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
Clazz_defineMethod (c$, "fixScriptPath", 
 function (strScript, filename) {
if (filename != null && strScript.indexOf ("$SCRIPT_PATH$") >= 0) {
var path = filename;
var pt = Math.max (filename.lastIndexOf ("|"), filename.lastIndexOf ("/"));
path = path.substring (0, pt + 1);
strScript = JU.PT.rep (strScript, "$SCRIPT_PATH$/", path);
strScript = JU.PT.rep (strScript, "$SCRIPT_PATH$", path);
}return strScript;
}, "~S,~S");
Clazz_defineMethod (c$, "setScriptExtensions", 
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
Clazz_defineMethod (c$, "compileScriptFileInternal", 
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
Clazz_overrideMethod (c$, "evalFunctionFloat", 
function (func, params, values) {
try {
var p = params;
for (var i = 0; i < values.length; i++) p.get (i).value = Float.$valueOf (values[i]);

var f = func;
return JS.SV.fValue (this.runFunctionAndRet (f, f.name, p, null, true, false, false));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return NaN;
} else {
throw e;
}
}
}, "~O,~O,~A");
Clazz_defineMethod (c$, "getUserFunctionResult", 
function (name, params, tokenAtom) {
return this.runFunctionAndRet (null, name, params, tokenAtom, true, true, false);
}, "~S,JU.Lst,JS.SV");
Clazz_defineMethod (c$, "runFunctionAndRet", 
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
} else if (Clazz_instanceOf ($function, J.api.JmolParallelProcessor)) {
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
Clazz_defineMethod (c$, "processTry", 
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
Clazz_defineMethod (c$, "breakAt", 
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
Clazz_defineMethod (c$, "restoreFunction", 
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
Clazz_defineMethod (c$, "clearDefinedVariableAtomSets", 
function () {
this.vwr.definedAtomSets.remove ("# variable");
});
Clazz_defineMethod (c$, "defineSets", 
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
Clazz_defineMethod (c$, "defineAtomSet", 
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
Clazz_defineMethod (c$, "lookupIdentifierValue", 
function (identifier) {
var bs = this.lookupValue (identifier, false);
if (bs != null) return JU.BSUtil.copy (bs);
bs = this.getAtomBits (1073741824, identifier);
return (bs == null ?  new JU.BS () : bs);
}, "~S");
Clazz_defineMethod (c$, "lookupValue", 
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
}if (Clazz_instanceOf (value, JU.BS)) return value;
if (Clazz_instanceOf (value, Array)) {
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
Clazz_overrideMethod (c$, "deleteAtomsInVariables", 
function (bsDeleted) {
for (var entry, $entry = this.vwr.definedAtomSets.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var value = entry.getValue ();
if (Clazz_instanceOf (value, JU.BS)) {
JU.BSUtil.deleteBits (value, bsDeleted);
if (!entry.getKey ().startsWith ("!")) this.vwr.g.setUserVariable ("@" + entry.getKey (), JS.SV.newV (10, value));
}}
}, "JU.BS");
Clazz_overrideMethod (c$, "getThisContext", 
function () {
return this.thisContext;
});
Clazz_defineMethod (c$, "clearState", 
 function (tQuiet) {
this.thisContext = null;
this.scriptLevel = 0;
this.setErrorMessage (null);
this.contextPath = "";
this.tQuiet = tQuiet;
}, "~B");
Clazz_overrideMethod (c$, "pushContextDown", 
function (why) {
this.scriptLevel--;
this.pushContext2 (null, why);
}, "~S");
Clazz_defineMethod (c$, "pushContext", 
 function (token, why) {
if (this.scriptLevel == JS.ScriptEval.contextDepthMax) this.error (44);
this.pushContext2 (token, why);
}, "JS.ContextToken,~S");
Clazz_defineMethod (c$, "pushContext2", 
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
Clazz_overrideMethod (c$, "getScriptContext", 
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
Clazz_defineMethod (c$, "popContext", 
function (isFlowCommand, statementOnly) {
if (this.thisContext == null) return;
if (this.thisContext.scriptLevel > 0) this.scriptLevel = this.thisContext.scriptLevel - 1;
var scTemp = (isFlowCommand ? this.getScriptContext ("popFlow") : null);
this.restoreScriptContext (this.thisContext, true, isFlowCommand, statementOnly);
if (scTemp != null) this.restoreScriptContext (scTemp, true, false, true);
if (this.debugHigh || this.isCmdLine_c_or_C_Option) JU.Logger.info ("--<<------------".substring (0, Math.min (15, this.scriptLevel + 5)) + (this.scriptLevel + 1) + " " + this.scriptFileName + " isFlow " + isFlowCommand + " thisContext=" + (this.thisContext == null ? "" : "" + this.thisContext.id) + " pc=" + this.pc + "-->" + this.pc + " path=" + (this.thisContext == null ? "" : this.thisContext.contextPath));
}, "~B,~B");
Clazz_defineMethod (c$, "restoreScriptContext", 
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
Clazz_defineMethod (c$, "setException", 
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
c$.statementAsString = Clazz_defineMethod (c$, "statementAsString", 
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
if (Clazz_instanceOf (token.value, JU.P3)) {
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
Clazz_overrideMethod (c$, "setObjectPropSafe", 
function (id, tokCommand) {
try {
return this.setObjectProp (id, tokCommand, -1);
} catch (e) {
if (Clazz_exceptionOf (e, JS.ScriptException)) {
return null;
} else {
throw e;
}
}
}, "~S,~N");
Clazz_defineMethod (c$, "setAtomProp", 
function (prop, value, bs) {
this.setShapePropertyBs (0, prop, value, bs);
}, "~S,~O,JU.BS");
Clazz_defineMethod (c$, "restrictSelected", 
function (isBond, doInvert) {
if (!this.chk) this.sm.restrictSelected (isBond, doInvert);
}, "~B,~B");
Clazz_defineMethod (c$, "showString", 
function (str) {
this.showStringPrint (str, false);
}, "~S");
Clazz_overrideMethod (c$, "showStringPrint", 
function (s, mustDo) {
if (this.chk || s == null) return;
if (this.outputBuffer == null) this.vwr.showString (s, mustDo);
 else this.appendBuffer (s, mustDo);
}, "~S,~B");
Clazz_defineMethod (c$, "report", 
function (s, isError) {
if (this.chk) return;
if (this.outputBuffer == null) this.vwr.scriptStatus (s);
 else this.appendBuffer (s, isError);
}, "~S,~B");
Clazz_defineMethod (c$, "appendBuffer", 
 function (str, mustDo) {
if (mustDo || this.isFuncReturn || JU.Logger.isActiveLevel (4)) this.outputBuffer.append (str).appendC ('\n');
}, "~S,~B");
Clazz_defineMethod (c$, "addProcess", 
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
Clazz_defineMethod (c$, "checkContinue", 
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
if (Clazz_exceptionOf (e$$, Exception)) {
var e = e$$;
{
this.setErrorMessage ("" + e);
}
} else if (Clazz_exceptionOf (e$$, Error)) {
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
Clazz_defineMethod (c$, "delayScript", 
function (millis) {
if (this.vwr.autoExit) return;
this.stopScriptThreads ();
if (this.vwr.captureParams != null && millis > 0) {
this.vwr.captureParams.put ("captureDelayMS", Integer.$valueOf (millis));
}this.scriptDelayThread =  new JS.ScriptDelayThread (this, this.vwr, millis);
this.scriptDelayThread.run ();
}, "~N");
Clazz_defineMethod (c$, "doDelay", 
 function (millis) {
if (!this.useThreads ()) return;
if (this.isJS) throw  new JS.ScriptInterruption (this, "delay", millis);
this.delayScript (millis);
}, "~N");
Clazz_overrideMethod (c$, "evalParallel", 
function (context, shapeManager) {
return this.getCmdExt ().evalParallel (context, shapeManager);
}, "JS.ScriptContext,JV.ShapeManager");
Clazz_defineMethod (c$, "isCommandDisplayable", 
 function (i) {
if (i >= this.aatoken.length || i >= this.pcEnd || this.aatoken[i] == null) return false;
return (this.lineIndices[i][1] > this.lineIndices[i][0]);
}, "~N");
Clazz_overrideMethod (c$, "loadFileResourceAsync", 
function (fileName) {
this.loadFileAsync (null, fileName, -Math.abs (fileName.hashCode ()), false);
}, "~S");
Clazz_defineMethod (c$, "loadFileAsync", 
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
Clazz_defineMethod (c$, "logLoadInfo", 
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
Clazz_overrideMethod (c$, "notifyResumeStatus", 
function () {
if (!this.chk && !this.executionStopped && !this.executionStepping && !this.executionPaused) {
this.vwr.scriptStatus ("script execution " + (this.$error || this.executionStopped ? "interrupted" : "resumed"));
}if (JU.Logger.debugging) JU.Logger.debug ("script execution resumed");
});
Clazz_defineMethod (c$, "refresh", 
function (doDelay) {
if (this.chk) return;
this.vwr.setTainted (true);
this.vwr.requestRepaintAndWait ("refresh cmd");
if (this.isJS && doDelay) this.doDelay (10);
}, "~B");
Clazz_overrideMethod (c$, "stopScriptThreads", 
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
Clazz_defineMethod (c$, "getErrorLineMessage2", 
function () {
return JS.ScriptError.getErrorLineMessage (this.functionName, this.scriptFileName, this.getLinenumber (null), this.pc, JS.ScriptEval.statementAsString (this.vwr, this.st, -9999, this.debugHigh));
});
Clazz_defineMethod (c$, "getLinenumber", 
function (c) {
return (c == null ? this.lineNumbers[this.pc] : c.lineNumbers[c.pc]);
}, "JS.ScriptContext");
Clazz_defineMethod (c$, "dispatchCommands", 
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
Clazz_defineMethod (c$, "commandLoop", 
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
Clazz_defineMethod (c$, "processCommand", 
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
Clazz_defineMethod (c$, "checkExtension", 
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
Clazz_defineMethod (c$, "processShapeCommand", 
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
Clazz_defineMethod (c$, "cmdAnimation", 
 function () {
var animate = false;
switch (this.getToken (1).tok) {
case 1073742335:
animate = true;
case 1073742334:
if (!this.chk) this.vwr.setAnimationOn (animate);
break;
case 1073742029:
var morphCount = Clazz_floatToInt (this.floatParameter (2));
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
Clazz_defineMethod (c$, "setFrameSet", 
 function (i) {
var frames = this.expandFloatArray (this.floatParameterSet (i, 0, 2147483647), 1);
this.checkLength (this.iToken + 1);
if (this.chk) return;
var movie =  new java.util.Hashtable ();
if (frames.length > 0) movie.put ("frames", frames);
movie.put ("currentFrame", Integer.$valueOf (0));
this.vwr.am.setMovie (movie);
}, "~N");
Clazz_defineMethod (c$, "cmdAxes", 
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
this.setShapeProperty (34, "labels",  Clazz_newArray (-1, [this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index)]));
break;
case 5:
sOrigin = this.paramAsStr (index + 4);
case 4:
this.setShapeProperty (34, "labels",  Clazz_newArray (-1, [this.paramAsStr (++index), this.paramAsStr (++index), this.paramAsStr (++index), sOrigin]));
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
Clazz_defineMethod (c$, "cmdBackground", 
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
Clazz_defineMethod (c$, "cmdBind", 
 function () {
var mouseAction = this.stringParameter (1);
var name = this.paramAsStr (2);
this.checkLength (3);
if (!this.chk) this.vwr.bindAction (mouseAction, name);
});
Clazz_defineMethod (c$, "cmdBondorder", 
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
Clazz_defineMethod (c$, "cmdBoundbox", 
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
} else if (ret[0] != null && Clazz_instanceOf (ret[0], JU.BS)) {
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
Clazz_defineMethod (c$, "cmdCD", 
 function () {
if (this.chk) return;
var dir = (this.slen == 1 ? null : this.paramAsStr (1));
this.showString (this.vwr.cd (dir));
});
Clazz_defineMethod (c$, "cmdCenter", 
 function (i) {
if (this.slen == 1) {
this.vwr.setNewRotationCenter (null);
return;
}var center = this.centerParameter (i, null);
if (center == null) this.invArg ();
if (!this.chk) this.vwr.setNewRotationCenter (center);
}, "~N");
Clazz_defineMethod (c$, "cmdColor", 
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
Clazz_defineMethod (c$, "cmdDefine", 
 function () {
if (this.slen < 3 || !(Clazz_instanceOf (this.getToken (1).value, String))) this.invArg ();
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
Clazz_defineMethod (c$, "cmdDelay", 
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
millis = Clazz_floatToInt (this.floatParameter (1) * 1000);
break;
default:
this.error (34);
}
this.refresh (false);
this.doDelay (Math.abs (millis));
});
Clazz_defineMethod (c$, "cmdDelete", 
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
Clazz_defineMethod (c$, "cmdDisplay", 
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
if (Clazz_instanceOf (bs, JM.BondSet)) {
this.vwr.ms.displayBonds (bs, isDisplay);
return;
}this.vwr.displayAtoms (bs, isDisplay, isGroup, addRemove, this.tQuiet);
}, "~B");
Clazz_defineMethod (c$, "cmdDots", 
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
Clazz_defineMethod (c$, "cmdEcho", 
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
Clazz_defineMethod (c$, "cmdFile", 
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
Clazz_defineMethod (c$, "cmdFixed", 
 function () {
var bs = (this.slen == 1 ? null : this.atomExpressionAt (1));
if (this.chk) return;
this.vwr.setMotionFixedAtoms (bs);
});
Clazz_defineMethod (c$, "cmdFor", 
 function (tok, isForCheck) {
var cmdToken = this.theToken;
var pt = this.st[0].intValue;
var forVars = cmdToken.forVars;
var pts =  Clazz_newIntArray (2, 0);
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
this.isBondSet = Clazz_instanceOf (bsOrList, JM.BondSet);
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
var i12 =  Clazz_newIntArray (-1, [JS.SV.iValue (v.get (0)), JS.SV.iValue (v.get (j - 1))]);
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
Clazz_defineMethod (c$, "cmdFlow", 
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
Clazz_defineMethod (c$, "cmdFlowSwitch", 
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
Clazz_defineMethod (c$, "cmdFont", 
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
Clazz_defineMethod (c$, "cmdFrank", 
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
Clazz_defineMethod (c$, "cmdFunc", 
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
Clazz_defineMethod (c$, "cmdGetProperty", 
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
if (property.equalsIgnoreCase ("bondInfo") && this.isAtomExpression (++this.iToken)) param =  Clazz_newArray (-1, [param, this.atomExpressionAt (this.iToken)]);
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
Clazz_defineMethod (c$, "cmdGoto", 
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
Clazz_defineMethod (c$, "cmdHbond", 
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
Clazz_defineMethod (c$, "cmdHelp", 
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
Clazz_defineMethod (c$, "cmdHistory", 
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
Clazz_defineMethod (c$, "cmdHover", 
 function () {
if (this.chk) return;
var strLabel = (this.slen == 1 ? "on" : this.paramAsStr (1));
if (strLabel.equalsIgnoreCase ("on")) strLabel = "%U";
 else if (strLabel.equalsIgnoreCase ("off")) strLabel = null;
this.vwr.setHoverLabel (strLabel);
});
Clazz_defineMethod (c$, "cmdLabel", 
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
Clazz_defineMethod (c$, "cmdLoad", 
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
if (Clazz_instanceOf (o, java.util.Map)) {
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
htParams.put ("firstLastStep",  Clazz_newIntArray (-1, [Clazz_floatToInt (pt.x), Clazz_floatToInt (pt.y), Clazz_floatToInt (pt.z)]));
loadScript.append (" " + JU.Escape.eP (pt));
} else {
switch (this.tokAt (i)) {
case 10:
bsModels = this.getToken (i++).value;
htParams.put ("bsModels", bsModels);
loadScript.append (" " + JU.Escape.eBS (bsModels));
break;
default:
htParams.put ("firstLastStep",  Clazz_newIntArray (-1, [0, -1, 1]));
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
if (Clazz_instanceOf (o, java.util.Map)) {
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
var fullPath =  Clazz_newArray (-1, [localName]);
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
filenames = (ext.equals ("all") ?  Clazz_newArray (-1, [filename, "*dom/" + id, "*val/" + id]) :  Clazz_newArray (-1, [filename, "*" + ext + "/" + id]));
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
this.vwr.fm.setFileInfo ( Clazz_newArray (-1, [localName]));
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
Clazz_defineMethod (c$, "checkFileExists", 
function (prefix, isAsync, filename, i, doClear) {
if (this.chk || filename.startsWith ("cache://")) return filename;
if ((this.vwr.testAsync || JV.Viewer.isJS) && (isAsync || filename.startsWith ("?")) || this.vwr.apiPlatform.forceAsyncLoad (filename)) {
filename = this.loadFileAsync (prefix, filename, i, doClear);
}var fullPathNameOrError = this.vwr.getFullPathNameOrError (filename);
filename = fullPathNameOrError[0];
if (fullPathNameOrError[1] != null) this.errorStr (17, filename + ":" + fullPathNameOrError[1]);
return filename;
}, "~S,~B,~S,~N,~B");
Clazz_defineMethod (c$, "addFilterAttribute", 
 function (htParams, filter, key) {
var val = JU.PT.getQuotedOrUnquotedAttribute (filter, key);
if (val != null && val.length > 0) htParams.put (key, val);
}, "java.util.Map,~S,~S");
Clazz_defineMethod (c$, "addLoadData", 
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
Clazz_defineMethod (c$, "loadPNGJVar", 
 function (varName, o, htParams) {
var av =  Clazz_newArray (-1, [JS.SV.newV (6, o)]);
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
Clazz_defineMethod (c$, "getLoadFilesList", 
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
firstLastSteps.addLast ( Clazz_newIntArray (-1, [Clazz_floatToInt (pt.x), Clazz_floatToInt (pt.y), Clazz_floatToInt (pt.z)]));
loadScript.append (" COORD " + JU.Escape.eP (pt));
} else if (bs != null) {
firstLastSteps.addLast (bs);
loadScript.append (" COORD " + JU.Escape.eBS (bs));
}loadScript.append (" /*file*/$FILENAME" + fNames.size () + "$");
}
if (firstLastSteps != null) htParams.put ("firstLastSteps", firstLastSteps);
return filter;
}, "~N,JU.SB,JU.SB,java.util.Map,JU.Lst");
Clazz_defineMethod (c$, "isLoadOption", 
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
Clazz_defineMethod (c$, "getLoadModelIndex", 
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
var iArray =  Clazz_newIntArray (data.length, 0);
for (var j = 0; j < data.length; j++) {
n = Clazz_floatToInt (data[j]);
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
Clazz_defineMethod (c$, "finalizeLoad", 
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
Clazz_defineMethod (c$, "cmdLog", 
 function () {
if (this.slen == 1) this.bad ();
if (this.chk) return;
var s = this.parameterExpressionString (1, 0);
if (this.tokAt (1) == 1073742334) this.setStringProperty ("logFile", "");
 else this.vwr.log (s);
});
Clazz_defineMethod (c$, "cmdLoop", 
 function () {
if (this.vwr.headless) return;
if (!this.chk) this.pc = -1;
this.cmdDelay ();
});
Clazz_defineMethod (c$, "cmdMessage", 
 function () {
var text = this.paramAsStr (this.checkLast (1));
if (this.chk) return;
var s = JU.Txt.formatText (this.vwr, text);
if (this.outputBuffer == null && !this.vwr.isPrintOnly) JU.Logger.warn (s);
if (!s.startsWith ("_")) this.report (s, false);
});
Clazz_defineMethod (c$, "cmdModel", 
 function (offset) {
var isFrame = (this.theTok == 4115 || this.vwr.ms.mc > 1);
var frameList =  Clazz_newIntArray (-1, [-1, -1]);
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
millis = Clazz_floatToLong (this.floatParameter (2) * 1000);
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
}if (this.theTok == 3 && haveFileSet && fFrame == Clazz_floatToInt (fFrame)) iFrame = Clazz_floatToInt (fFrame) * 1000000;
if (iFrame == 2147483647) {
useModelNumber = false;
frameList[nFrames++] = (this.chk || i != 1 ? 0 : this.vwr.getModelIndexFromId (this.theToken.value.toString ()));
break;
}if (iFrame == -1) {
this.checkLength (offset + 1);
if (!this.chk) this.vwr.setAnimation (1073742108);
return;
}if (iFrame >= 1000 && iFrame < 1000000 && haveFileSet) iFrame = (Clazz_doubleToInt (iFrame / 1000)) * 1000000 + (iFrame % 1000);
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
Clazz_defineMethod (c$, "loadDssr", 
 function (modelIndex, data) {
if (modelIndex < 0 && (modelIndex = this.vwr.am.cmi) < 0) this.errorStr (30, "load <dssr file>");
if (!data.startsWith ("{")) data = this.vwr.getFileAsString3 (data, true, "script");
this.clearDefinedVariableAtomSets ();
var map = this.vwr.parseJSONMap (data);
this.showString (this.vwr.getAnnotationParser (true).fixDSSRJSONMap (map));
this.vwr.ms.setInfo (modelIndex, "dssr", map);
}, "~N,~S");
Clazz_defineMethod (c$, "cmdMove", 
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
Clazz_defineMethod (c$, "cmdMoveto", 
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
if (!(Clazz_instanceOf (ret[0], JU.BS))) this.invArg ();
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
uc.setUnitCell ( Clazz_newFloatArray (-1, [1, 1, 1, 90, 90, 90]), false);
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
if (Clazz_instanceOf (ret[0], JU.BS)) bsCenter = ret[0];
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
Clazz_defineMethod (c$, "isAtomExpression", 
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
Clazz_defineMethod (c$, "cmdPause", 
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
Clazz_defineMethod (c$, "cmdPrint", 
 function () {
if (this.slen == 1) {
if (!this.chk) this.showStringPrint ("\0", true);
return;
}this.showStringPrint (this.parameterExpressionString (1, 0), true);
});
Clazz_defineMethod (c$, "cmdPrompt", 
 function () {
var msg = null;
if (this.slen == 1) {
if (!this.chk) msg = JS.ScriptEval.getContextTrace (this.vwr, this.getScriptContext ("prompt"), null, true).toString ();
} else {
msg = this.parameterExpressionString (1, 0);
}if (!this.chk) this.vwr.prompt (msg, null, null, true);
});
Clazz_defineMethod (c$, "cmdReset", 
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
this.vwr.setData ("element_vdw",  Clazz_newArray (-1, [null, ""]), 0, 0, 0, 0, 0);
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
Clazz_defineMethod (c$, "resetError", 
 function () {
this.vwr.g.removeParam ("_errormessage");
});
Clazz_defineMethod (c$, "cmdRestrict", 
 function () {
var isBond = (this.tokAt (1) == 1677721602);
this.cmdSelect (isBond ? 2 : 1);
this.restrictSelected (isBond, true);
});
Clazz_defineMethod (c$, "cmdReturn", 
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
Clazz_defineMethod (c$, "cmdRotate", 
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
var data =  Clazz_newArray (-1, [this.objectNameParameter (++i), Integer.$valueOf (this.vwr.am.cmi), null]);
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
Clazz_defineMethod (c$, "cmdRestore", 
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
Clazz_defineMethod (c$, "cmdSave", 
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
Clazz_defineMethod (c$, "cmdScript", 
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
this.contextVariables.put ("_arguments", (params == null ? JS.SV.getVariableAI ( Clazz_newIntArray (-1, [])) : JS.SV.getVariableList (params)));
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
Clazz_defineMethod (c$, "cmdSelect", 
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
if (Clazz_instanceOf (this.getToken (2).value, JM.BondSet) || this.tokAt (2) == 1677721602 && this.getToken (3).tok == 10) {
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
if (!(Clazz_instanceOf (v, JU.BS))) this.invArg ();
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
Clazz_defineMethod (c$, "cmdSelectionHalos", 
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
Clazz_defineMethod (c$, "cmdSet", 
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
var o = (this.isArrayParameter (2) ? this.floatParameterSet (2, 2, 2) : this.tokAt (2) == 2 ?  Clazz_newFloatArray (-1, [this.intParameter (2), this.intParameter (3)]) : this.stringParameter (2));
this.checkLast (this.iToken);
if (this.chk) return;
if (Clazz_instanceOf (o, String)) {
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
if (mad10 != 2147483647) this.setShapeSizeBs (6, tok == 3 ? Clazz_doubleToInt (mad10 / 10) : mad10, null);
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
var scale =  Clazz_newIntArray (n, 0);
for (var i = n; --i >= 0; ) scale[i] = v.get (i).intValue ();

this.vwr.cm.ce.setUserScale (scale);
return;
case 553648188:
if (this.isFloatParameter (2)) {
this.checkLength (3);
this.setIntProperty ("zSlab", Clazz_floatToInt (this.floatParameter (2)));
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
if (!this.chk) this.vwr.setSpin (sval, Clazz_floatToInt (this.floatParameter (this.checkLast (3))));
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
Clazz_defineMethod (c$, "cmdSetEcho", 
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
propertyValue = Integer.$valueOf (Clazz_floatToInt (this.floatParameter (pt++)));
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
propertyValue =  Clazz_newFloatArray (-1, [-1, pt3.x, pt3.y, pt3.z, 0, 0, 0]);
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
Clazz_defineMethod (c$, "cmdSetLabel", 
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
propertyValue =  Clazz_newFloatArray (-1, [-1, pt.x, pt.y, pt.z, 0, 0, 0]);
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
Clazz_defineMethod (c$, "cmdSetPicking", 
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
Clazz_defineMethod (c$, "cmdSetPickingStyle", 
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
Clazz_defineMethod (c$, "cmdSlab", 
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
Clazz_defineMethod (c$, "cmdSsbond", 
 function () {
var mad = this.getMadParameter ();
if (mad == 2147483647) return;
this.setShapeProperty (1, "type", Integer.$valueOf (256));
this.setShapeSizeBs (1, mad, null);
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
});
Clazz_defineMethod (c$, "cmdStructure", 
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
Clazz_defineMethod (c$, "cmdSubset", 
 function () {
var bs = null;
if (!this.chk) this.vwr.slm.setSelectionSubset (null);
if (this.slen != 1 && (this.slen != 4 || !this.getToken (2).value.equals ("off"))) bs = this.atomExpressionAt (1);
if (!this.chk) this.vwr.slm.setSelectionSubset (bs);
});
Clazz_defineMethod (c$, "cmdSync", 
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
Clazz_defineMethod (c$, "cmdThrow", 
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
Clazz_defineMethod (c$, "saveContext", 
 function (saveName) {
var sc = this.getScriptContext ("Context_" + saveName);
this.vwr.stm.saveContext (saveName, sc);
this.vwr.g.setUserVariable (saveName, JS.SV.newV (14, sc));
return sc;
}, "~S");
Clazz_defineMethod (c$, "cmdTimeout", 
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
Clazz_defineMethod (c$, "cmdTranslate", 
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
Clazz_defineMethod (c$, "cmdUnbind", 
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
Clazz_defineMethod (c$, "cmdUndoRedoMove", 
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
Clazz_defineMethod (c$, "setCurrentCagePts", 
function (originABC, name) {
var sym = J.api.Interface.getSymmetry (this.vwr, "eval");
if (sym == null && this.vwr.async) throw  new NullPointerException ();
try {
this.vwr.ms.setModelCage (this.vwr.am.cmi, originABC == null ? null : sym.getUnitCell (originABC, false, name));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~A,~S");
Clazz_defineMethod (c$, "cmdUnitcell", 
 function (i) {
this.getCmdExt ().dispatch (1814695966, i == 2, null);
}, "~N");
Clazz_defineMethod (c$, "cmdVector", 
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
Clazz_defineMethod (c$, "cmdVibration", 
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
Clazz_defineMethod (c$, "cmdWireframe", 
 function () {
var mad = -2147483648;
if (this.tokAt (1) == 4141) this.checkLast (1);
 else mad = this.getMadParameter ();
if (this.chk || mad == 2147483647) return;
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
this.setShapeSizeBs (1, mad == -2147483648 ? 300 : mad, null);
});
Clazz_defineMethod (c$, "cmdZap", 
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
Clazz_defineMethod (c$, "cmdZoom", 
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
if (Clazz_instanceOf (ret[0], JU.BS)) bsCenter = ret[0];
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
Clazz_defineMethod (c$, "colorShape", 
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
if (Clazz_instanceOf (this.theToken.value, JM.BondSet)) {
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
data =  Clazz_newFloatArray (this.vwr.ms.ac, 0);
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
if (colorvalue1 != null && (isIsosurface || shapeType == 11 || shapeType == 14 || shapeType == 21)) this.setShapeProperty (shapeType, "colorPhase",  Clazz_newArray (-1, [colorvalue1, colorvalue]));
 else if (bs == null) this.setShapeProperty (shapeType, prefix + "color", colorvalue);
 else this.setShapePropertyBs (shapeType, prefix + "color", colorvalue, bs);
}if (translucency != null) this.setShapeTranslucency (shapeType, prefix, translucency, translucentLevel, bs);
if (typeMask != 0) this.setShapeProperty (1, "type", Integer.$valueOf (1023));
if (doClearBondSet) this.vwr.selectBonds (null);
if (shapeType == 0) this.vwr.shm.checkInheritedShapes ();
}, "~N,~N,~B");
Clazz_defineMethod (c$, "getPartialCharges", 
function (bs) {
try {
this.vwr.getOrCalcPartialCharges (bs, null);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JS.ScriptInterruption (this, "partialcharge", 1);
} else {
throw e;
}
}
}, "JU.BS");
Clazz_defineMethod (c$, "encodeRadiusParameter", 
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
Clazz_defineMethod (c$, "expandFloatArray", 
function (a, min) {
var n = a.length;
var haveNeg = false;
try {
for (var i = 0; i < a.length; i++) if (a[i] < 0) {
n += Math.abs (a[i - 1] + a[i]) - 1;
haveNeg = true;
}
if (haveNeg) {
var b =  Clazz_newFloatArray (n, 0);
for (var pt = 0, i = 0; i < a.length; i++) {
n = Clazz_floatToInt (a[i]);
if (n >= 0) {
if (n < min) this.invArg ();
b[pt++] = n;
} else {
var dif = Clazz_floatToInt (a[i - 1] + n);
var dir = (dif < 0 ? 1 : -1);
for (var j = Clazz_floatToInt (a[i - 1]); j != -a[i]; j += dir, pt++) b[pt] = b[pt - 1] + dir;

}}
a = b;
n = a.length;
}var ia =  Clazz_newIntArray (n, 0);
for (var i = n; --i >= 0; ) ia[i] = Clazz_floatToInt (a[i]);

return ia;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
this.invArg ();
return null;
} else {
throw e;
}
}
}, "~A,~N");
Clazz_defineMethod (c$, "frameControl", 
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
Clazz_defineMethod (c$, "getColorRange", 
function (i) {
var color1 = this.getArgbParam (i);
if (this.tokAt (++this.iToken) != 1073742170) this.invArg ();
var color2 = this.getArgbParam (++this.iToken);
var nColors = (this.tokAt (this.iToken + 1) == 2 ? this.intParameter (++this.iToken) : 0);
return JU.ColorEncoder.getColorSchemeList (JU.ColorEncoder.getPaletteAtoB (color1, color2, nColors));
}, "~N");
Clazz_defineMethod (c$, "getFullPathName", 
function () {
var filename = (!this.chk || this.isCmdLine_C_Option ? this.vwr.fm.getFullPathName (true) : "test.xyz");
if (filename == null) this.invArg ();
return filename;
});
Clazz_defineMethod (c$, "getObjectBoundingBox", 
 function (id) {
var data =  Clazz_newArray (-1, [id, null, null]);
return (this.getShapePropertyData (24, "getBoundingBox", data) || this.getShapePropertyData (29, "getBoundingBox", data) || this.getShapePropertyData (25, "getBoundingBox", data) || this.getShapePropertyData (28, "getBoundingBox", data) || this.getShapePropertyData (27, "getBoundingBox", data) ? data[2] : null);
}, "~S");
Clazz_defineMethod (c$, "getObjectCenter", 
function (axisID, index, modelIndex) {
var data =  Clazz_newArray (-1, [axisID, Integer.$valueOf (index), Integer.$valueOf (modelIndex)]);
return (this.getShapePropertyData (22, "getCenter", data) || this.getShapePropertyData (24, "getCenter", data) || this.getShapePropertyData (29, "getCenter", data) || this.getShapePropertyData (25, "getCenter", data) || this.getShapePropertyData (28, "getCenter", data) || this.getShapePropertyData (27, "getCenter", data) ? data[2] : null);
}, "~S,~N,~N");
Clazz_defineMethod (c$, "getPlaneForObject", 
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
Clazz_defineMethod (c$, "getQuaternionArray", 
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
Clazz_defineMethod (c$, "getSetAxesTypeMad10", 
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
return (Float.isNaN (angstroms) ? 2147483647 : Clazz_doubleToInt (Math.floor (angstroms * 10000 * 2)));
}
if (!this.chk) this.errorStr (7, "\"DOTTED\"");
return 0;
}, "~N");
Clazz_defineMethod (c$, "getSettingFloat", 
 function (pt) {
return (pt >= this.slen ? NaN : JS.SV.fValue (this.parameterExpressionToken (pt)));
}, "~N");
Clazz_defineMethod (c$, "getSettingInt", 
 function (pt) {
return (pt >= this.slen ? -2147483648 : this.parameterExpressionToken (pt).asInt ());
}, "~N");
Clazz_defineMethod (c$, "getSettingStr", 
 function (pt, isJmolSet) {
return (isJmolSet && this.slen == pt + 1 ? this.paramAsStr (pt) : this.parameterExpressionToken (pt).asString ());
}, "~N,~B");
Clazz_defineMethod (c$, "getShapeProperty", 
function (shapeType, propertyName) {
return this.sm.getShapePropertyIndex (shapeType, propertyName, -2147483648);
}, "~N,~S");
Clazz_defineMethod (c$, "getShapePropertyData", 
function (shapeType, propertyName, data) {
return this.sm.getShapePropertyData (shapeType, propertyName, data);
}, "~N,~S,~A");
Clazz_defineMethod (c$, "getShapeType", 
 function (tok) {
var iShape = JV.JC.shapeTokenIndex (tok);
if (iShape < 0) this.error (49);
return iShape;
}, "~N");
Clazz_defineMethod (c$, "getTranslucentLevel", 
function (i) {
var f = this.floatParameter (i);
return (this.theTok == 2 && f > 0 && f < 9 ? f + 1 : f);
}, "~N");
Clazz_defineMethod (c$, "getZoom", 
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
Clazz_defineMethod (c$, "setElementColor", 
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
Clazz_defineMethod (c$, "setMeshDisplayProperty", 
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
Clazz_defineMethod (c$, "setObjectArgb", 
 function (str, argb) {
if (this.chk) return;
this.vwr.setObjectArgb (str, argb);
}, "~S,~N");
Clazz_defineMethod (c$, "setObjectMad10", 
function (iShape, name, mad10) {
if (!this.chk) this.vwr.setObjectMad10 (iShape, name, mad10);
}, "~N,~S,~N");
Clazz_defineMethod (c$, "setObjectProp", 
 function (id, tokCommand, ptColor) {
var data =  Clazz_newArray (-1, [id, null]);
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
Clazz_defineMethod (c$, "setObjectProperty", 
function () {
var id = this.setShapeNameParameter (2);
return (this.chk ? "" : this.setObjectProp (id, this.tokAt (0), this.iToken));
});
Clazz_defineMethod (c$, "setShapeNameParameter", 
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
Clazz_defineMethod (c$, "setShapeProperty", 
function (shapeType, propertyName, propertyValue) {
if (!this.chk) this.sm.setShapePropertyBs (shapeType, propertyName, propertyValue, null);
}, "~N,~S,~O");
Clazz_defineMethod (c$, "setShapePropertyBs", 
function (iShape, propertyName, propertyValue, bs) {
if (!this.chk) this.sm.setShapePropertyBs (iShape, propertyName, propertyValue, bs);
}, "~N,~S,~O,JU.BS");
Clazz_defineMethod (c$, "setShapeSize", 
 function (shapeType, rd) {
if (!this.chk) this.sm.setShapeSizeBs (shapeType, 0, rd, null);
}, "~N,J.atomdata.RadiusData");
Clazz_defineMethod (c$, "setShapeSizeBs", 
function (shapeType, size, bs) {
if (!this.chk) this.sm.setShapeSizeBs (shapeType, size, null, bs);
}, "~N,~N,JU.BS");
Clazz_defineMethod (c$, "setShapeTranslucency", 
function (shapeType, prefix, translucency, translucentLevel, bs) {
if (translucentLevel == 3.4028235E38) translucentLevel = this.vwr.getFloat (570425354);
this.setShapeProperty (shapeType, "translucentLevel", Float.$valueOf (translucentLevel));
if (prefix == null) return;
if (bs == null) this.setShapeProperty (shapeType, prefix + "translucency", translucency);
 else if (!this.chk) this.setShapePropertyBs (shapeType, prefix + "translucency", translucency, bs);
}, "~N,~S,~S,~N,JU.BS");
Clazz_defineMethod (c$, "setSize", 
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
Clazz_defineMethod (c$, "setSizeBio", 
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
Clazz_defineMethod (c$, "setUnits", 
 function (units, tok) {
if (tok == 545259568 && (units.toLowerCase ().endsWith ("hz") || JU.PT.isOneOf (units.toLowerCase (), ";angstroms;au;bohr;nanometers;nm;picometers;pm;vanderwaals;vdw;"))) {
if (!this.chk) this.vwr.setUnits (units, true);
} else if (tok == 545259558 && JU.PT.isOneOf (units.toLowerCase (), ";kcal;kj;")) {
if (!this.chk) this.vwr.setUnits (units, false);
} else {
this.errorStr2 (50, "set " + JS.T.nameOf (tok), units);
}return true;
}, "~S,~N");
Clazz_defineMethod (c$, "toString", 
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
Clazz_defineStatics (c$,
"saveList", "bonds? context? coordinates? orientation? rotation? selection? state? structure?",
"iProcess", 0,
"commandHistoryLevelMax", 0,
"contextDepthMax", 100,
"scriptReportingLevel", 0);
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.ScriptParam"], "JS.ScriptExpr", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "$.Map", "JU.BArray", "$.BS", "$.CU", "$.Lst", "$.M34", "$.M4", "$.Measure", "$.P3", "$.P4", "$.PT", "$.SB", "J.api.Interface", "JM.BondSet", "$.Group", "$.ModelSet", "JS.SV", "$.ScriptContext", "$.ScriptMathProcessor", "$.T", "JU.BSUtil", "$.Elements", "$.Escape"], function () {
c$ = Clazz_decorateAsClass (function () {
this.debugHigh = false;
this.cmdExt = null;
this.isoExt = null;
this.mathExt = null;
this.smilesExt = null;
this.tempStatement = null;
this.ptTemp = null;
Clazz_instantialize (this, arguments);
}, JS, "ScriptExpr", JS.ScriptParam);
Clazz_defineMethod (c$, "getCmdExt", 
function () {
return (this.cmdExt == null ? this.cmdExt = (this.getExt ("Cmd")).init (this) : this.cmdExt);
});
Clazz_defineMethod (c$, "getIsoExt", 
function () {
return (this.isoExt == null ? this.isoExt = (this.getExt ("Iso")).init (this) : this.isoExt);
});
Clazz_defineMethod (c$, "getMathExt", 
function () {
return (this.mathExt == null ? (this.mathExt = this.getExt ("Math")).init (this) : this.mathExt);
});
Clazz_defineMethod (c$, "getSmilesExt", 
function () {
return (this.smilesExt == null ? (this.smilesExt = this.getExt ("Smiles")).init (this) : this.smilesExt);
});
Clazz_defineMethod (c$, "getExt", 
 function (type) {
return J.api.Interface.getInterface ("JS." + type + "Ext", this.vwr, "script");
}, "~S");
Clazz_defineMethod (c$, "parameterExpressionList", 
function (pt, ptAtom, isArrayItem) {
return this.parameterExpression (pt, -1, null, true, true, ptAtom, isArrayItem, null, null, false);
}, "~N,~N,~B");
Clazz_defineMethod (c$, "parameterExpressionString", 
function (pt, ptMax) {
return this.parameterExpression (pt, ptMax, "", true, false, -1, false, null, null, false);
}, "~N,~N");
Clazz_defineMethod (c$, "parameterExpressionBoolean", 
function (pt, ptMax) {
return (this.parameterExpression (pt, ptMax, null, true, false, -1, false, null, null, false)).booleanValue ();
}, "~N,~N");
Clazz_defineMethod (c$, "parameterExpressionToken", 
function (pt) {
var result = this.parameterExpressionList (pt, -1, false);
return (result.size () > 0 ? result.get (0) : JS.SV.newS (""));
}, "~N");
Clazz_defineMethod (c$, "parameterExpressionSelect", 
function (h, where) {
this.st = where;
this.slen = this.st.length;
return (this.parameterExpression (2, -2147483648, null, true, false, -1, false, h, null, false)).booleanValue ();
}, "java.util.Map,~A");
Clazz_defineMethod (c$, "parameterExpression", 
 function (pt, ptMax, key, ignoreComma, asVector, ptAtom, isArrayItem, localVars, localVar, isSpecialAssignment) {
var isImplicitAtomProperty = (localVar != null);
var isWhere = (localVar == null && localVars != null);
var isOneExpressionOnly = (pt < 0);
var returnBoolean = (!asVector && key == null);
var returnString = (!asVector && key != null && key.length == 0);
if (isOneExpressionOnly) pt = -pt;
var allContext = (localVars == null || ptMax != -2147483648);
if (ptMax < pt) ptMax = this.slen;
var ptEq = (isSpecialAssignment ? 0 : 1);
var ptWithin = -1;
var rpn =  new JS.ScriptMathProcessor (this, isSpecialAssignment, isArrayItem, asVector, false, false, key);
var v;
var res;
var nSquare = 0;
var nParen = 0;
var topLevel = true;
out : for (var i = pt; i < ptMax; i++) {
v = null;
var tok = this.getToken (i).tok;
if (isImplicitAtomProperty && this.tokAt (i + 1) != 1073742336) {
var token = (localVars != null && localVars.containsKey (this.theToken.value) ? null : this.getBitsetPropertySelector (i, 10));
if (token != null) {
rpn.addX (localVars.get (localVar));
if (!rpn.addOpAllowMath (token, (this.tokAt (i + 1) == 268435472), 0)) this.invArg ();
if ((token.intValue == 134320141 || token.intValue == 102436) && this.tokAt (this.iToken + 1) != 268435472) {
rpn.addOp (JS.T.tokenLeftParen);
rpn.addOp (JS.T.tokenRightParen);
}i = this.iToken;
continue;
}}switch (tok) {
case 268435521:
case 1073742338:
if (!ignoreComma && topLevel) break out;
if (tok == 1073742338) this.invArg ();
if (isSpecialAssignment && nSquare == 1 && this.tokAt (i + 1) == 268435860) isSpecialAssignment = rpn.endAssignment ();
}
switch (tok) {
case 12290:
if ((tok = this.tokAt (++i)) == 1073742325) {
v = this.parameterExpressionToken (++i);
i = this.iToken;
} else if (tok == 2) {
v = this.vwr.ms.getAtoms (1094715393, Integer.$valueOf (this.st[i].intValue));
break;
} else if (tok == 12290 && this.tokAt (i + 1) == 2) {
v = this.vwr.ms.getAtomsFromAtomNumberInFrame (this.st[++i].intValue);
break;
} else {
v = this.getParameter (JS.SV.sValue (this.st[i]), 1073742190, true);
}v = this.getParameter ((v).asString (), 1073742190, true);
break;
case 134320649:
if (this.getToken (++i).tok != 268435472) this.invArg ();
if (localVars == null) localVars =  new java.util.Hashtable ();
res = this.parameterExpression (++i, -1, null, ignoreComma, false, -1, false, localVars, localVar, false);
var TF = (res).booleanValue ();
var iT = this.iToken;
if (this.getToken (iT++).tok != 1073742339) this.invArg ();
this.parameterExpressionBoolean (iT, -1);
var iF = this.iToken;
if (this.tokAt (iF++) != 1073742339) this.invArg ();
this.parameterExpression (-iF, -1, null, ignoreComma, false, 1, false, localVars, localVar, false);
var iEnd = this.iToken;
if (this.tokAt (iEnd) != 268435473) this.invArg ();
v = this.parameterExpression (TF ? iT : iF, TF ? iF : iEnd, "XXX", ignoreComma, false, 1, false, localVars, localVar, false);
i = this.iToken = iEnd;
break;
case 134320648:
case 1275082245:
var isFunctionOfX = (pt > 0);
var isFor = (isFunctionOfX && tok == 134320648);
var dummy;
if (isFunctionOfX) {
if (this.getToken (++i).tok != 268435472 || !JS.T.tokAttr (this.getToken (++i).tok, 1073741824)) this.invArg ();
dummy = this.paramAsStr (i);
if (this.getToken (++i).tok != 1073742339) this.invArg ();
} else {
dummy = "_x";
}v = this.parameterExpressionToken (-(++i)).value;
if (!(Clazz_instanceOf (v, JU.BS))) this.invArg ();
var bsAtoms = v;
i = this.iToken;
if (isFunctionOfX && this.getToken (i++).tok != 1073742339) this.invArg ();
var bsSelect =  new JU.BS ();
var bsX =  new JU.BS ();
var sout = (isFor ?  new Array (bsAtoms.cardinality ()) : null);
if (localVars == null) localVars =  new java.util.Hashtable ();
bsX.set (0);
var t = JS.SV.newV (10, bsX);
t.index = 0;
localVars.put (dummy, t.setName (dummy));
var pt2 = -1;
if (isFunctionOfX) {
pt2 = i - 1;
var np = 0;
var tok2;
while (np >= 0 && ++pt2 < ptMax) {
if ((tok2 = this.tokAt (pt2)) == 268435473) np--;
 else if (tok2 == 268435472) np++;
}
}var p = 0;
var jlast = 0;
var j = bsAtoms.nextSetBit (0);
if (j < 0 || this.chk) {
this.iToken = pt2 - 1;
} else {
for (; j >= 0; j = bsAtoms.nextSetBit (j + 1)) {
if (jlast >= 0) bsX.clear (jlast);
jlast = j;
bsX.set (j);
t.index = j;
res = this.parameterExpression (i, pt2, (isFor ? "XXX" : null), ignoreComma, isFor, j, false, localVars, isFunctionOfX ? null : dummy, false);
if (isFor) {
if (res == null || (res).size () == 0) this.invArg ();
sout[p++] = ((res).get (0)).asString ();
} else if ((res).booleanValue ()) {
bsSelect.set (j);
}}
}if (isFor) {
v = sout;
} else if (isFunctionOfX) {
v = bsSelect;
} else {
return this.listBS (bsSelect);
}i = this.iToken + 1;
break;
case 1073742339:
break out;
case 2:
if (this.tokAt (this.iToken + 1) == 1073742336 && ((tok = this.tokAt (this.iToken + 2)) == 805306401 || tok == 268435633)) {
this.theToken.value = Float.$valueOf (this.theToken.intValue);
this.theToken.tok = 3;
this.theToken.intValue = 2147483647;
i++;
}case 3:
case 1073742362:
rpn.addXNum (this.theToken);
break;
case 134217750:
if (this.tokAt (this.iToken + 1) == 268435472) {
if (!rpn.addOpAllowMath (this.theToken, true, 0)) this.invArg ();
break;
}case 1073742335:
case 1073742334:
case 4:
case 8:
case 9:
case 11:
case 12:
case 7:
case 10:
case 6:
case 14:
rpn.addX (JS.SV.newT (this.theToken));
break;
case 1073742330:
if (this.tokAt (i + 2) == 1073742336 && this.tokAt (i + 3) == 1275072526) {
rpn.addXStr ("$" + this.paramAsStr (++i));
} else {
this.ignoreError = true;
var ptc;
try {
ptc = this.centerParameter (i, null);
rpn.addX (JS.SV.newV (8, ptc));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
rpn.addXStr ("");
} else {
throw e;
}
}
this.ignoreError = false;
i = this.iToken;
}break;
case 1073742332:
if (this.tokAt (i + 1) == 4) {
if (this.tokAt (i + 2) == 1073742338) {
v = (this.chk ?  new JU.BS () : this.getAtomBitSet (this.stringParameter (i + 1)));
i += 2;
break;
}v = this.getAssocArray (i);
} else {
v = this.getPointOrPlane (i, false, true, true, false, 3, 4, true);
}i = this.iToken;
break;
case 1073742325:
if (this.tokAt (i + 1) == 1073742326) {
v =  new java.util.Hashtable ();
i++;
break;
} else if (this.tokAt (i + 1) == 1073742327 && this.tokAt (i + 2) == 1073742326) {
tok = 1073742327;
this.iToken += 2;
}case 1073742327:
if (tok == 1073742327) v = this.vwr.getAllAtoms ();
 else v = this.atomExpression (this.st, i, 0, true, true, null, true);
i = this.iToken;
if (nParen == 0 && isOneExpressionOnly) {
this.iToken++;
return this.listBS (v);
}break;
case 1073742195:
rpn.addOp (this.theToken);
continue;
case 1073742326:
i++;
break out;
case 268435504:
if (!ignoreComma && topLevel) break out;
if (!rpn.addOp (this.theToken)) this.invArg ();
break;
case 1073742337:
case 1073742336:
if (isSpecialAssignment && topLevel && this.tokAt (i + 2) == 268435860) isSpecialAssignment = rpn.endAssignment ();
if (ptEq == 0 && topLevel) {
switch (this.tokAt (i + 1)) {
case 0:
break;
case 1275335685:
case 1275334681:
case 1140850694:
case 1140850706:
case 1140850696:
case 1275068418:
if (tok == 1073742336) break;
default:
rpn.addOp (JS.T.tokenArrayOpen);
rpn.addXStr (this.optParameterAsString (++i));
rpn.addOp (JS.T.tokenArrayClose);
continue;
}
}var $var = this.getBitsetPropertySelector (i + 1, rpn.getXTok ());
var isUserFunction = ($var.intValue == 134320141);
var allowMathFunc = true;
var tok2 = this.tokAt (this.iToken + 2);
if (this.tokAt (this.iToken + 1) == 1073742336) {
switch (tok2) {
case 1073742327:
tok2 = 480;
if (this.tokAt (this.iToken + 3) == 1073742336 && this.tokAt (this.iToken + 4) == 1275068420) tok2 = 224;
case 32:
case 64:
case 192:
case 128:
case 160:
case 96:
allowMathFunc = (isUserFunction || $var.intValue == 1275069443 || tok2 == 480 || tok2 == 224);
$var.intValue |= tok2;
this.getToken (this.iToken + 2);
}
}var tokNext = this.tokAt (this.iToken + 1);
allowMathFunc = new Boolean (allowMathFunc & (tokNext == 268435472 || isUserFunction)).valueOf ();
if (!rpn.addOpAllowMath ($var, allowMathFunc, isUserFunction ? tokNext : 0)) this.invArg ();
i = this.iToken;
if ($var.intValue == 134320141 && tokNext != 268435472) {
rpn.addOp (JS.T.tokenLeftParen);
rpn.addOp (JS.T.tokenRightParen);
}break;
case 1086326786:
case 1086326785:
case 1073742328:
case 1678381065:
case 1086326788:
case 1073742329:
case 1111490587:
case 1086326789:
case 1086324742:
case 1094717454:
case 1094713360:
case 1073742128:
case 134218756:
case 1086324744:
case 1094713366:
case 134218757:
case 1237320707:
case 1639976963:
if (!isWhere && i == ptWithin && this.tokAt (i + 1) == 268435504) {
rpn.addX (JS.SV.newT (this.theToken));
break;
}default:
if (this.theTok == 268435520 && this.tokAt (i + 2) == 268435490) {
v = this.getAssocArray (i);
i = this.iToken;
break;
}if (JS.T.tokAttr (this.theTok, 268435456) || JS.T.tokAttr (this.theTok, 134217728) && this.tokAt (this.iToken + 1) == 268435472) {
if (!rpn.addOp (this.theToken)) {
if (ptAtom >= 0) {
break out;
}this.invArg ();
}switch (this.theTok) {
case 134217759:
ptWithin = i + 2;
break;
case 268435860:
if (topLevel) ptEq = i;
break;
case 268435472:
nParen++;
topLevel = false;
break;
case 268435473:
if (--nParen <= 0 && nSquare == 0) {
if (isOneExpressionOnly) {
this.iToken++;
break out;
}topLevel = true;
}break;
case 268435520:
nSquare++;
topLevel = false;
break;
case 268435521:
if (--nSquare == 0 && nParen == 0) {
if (isOneExpressionOnly) {
this.iToken++;
break out;
}topLevel = true;
}break;
}
} else {
var name = this.paramAsStr (i).toLowerCase ();
var haveParens = (this.tokAt (i + 1) == 268435472);
if (!haveParens) if (this.chk) {
v = name;
} else if (localVars == null || (v = JU.PT.getMapValueNoCase (localVars, name)) == null && allContext) {
if (name.startsWith ("_")) {
v = (name.equals ("_") ? this.vwr.ms.getAuxiliaryInfo (null) : name.equals ("_m") ? this.vwr.getCurrentModelAuxInfo () : null);
}if (v == null) v = this.getContextVariableAsVariable (name, false);
 else if (ptEq == 0) this.invArg ();
}if (v == null) {
if (JS.T.tokAttr (this.theTok, 1073741824) && this.vwr.isFunction (name)) {
if (!rpn.addOp (JS.SV.newV (134320141, this.theToken.value))) this.invArg ();
if (!haveParens) {
rpn.addOp (JS.T.tokenLeftParen);
rpn.addOp (JS.T.tokenRightParen);
}} else {
$var = this.vwr.g.getAndSetNewVariable (name, false);
switch ($var.tok) {
case 2:
case 3:
if (this.noCopy (i, -1) || this.noCopy (i, 1)) break;
rpn.addXCopy ($var);
continue;
default:
}
rpn.addX ($var);
}}}}
if (v != null) {
if (Clazz_instanceOf (v, JU.BS)) rpn.addXBs (v);
 else rpn.addXObj (v);
}}
var result = rpn.getResult ();
if (result == null) {
if (!this.chk) rpn.dumpStacks ("null result");
this.error (13);
}if (result.tok == 135198) {
if (isSpecialAssignment && ptEq == 0) {
var rv =  new JU.Lst ();
rv.addLast ( new JS.SV ());
return rv;
}return result.value;
}if (this.chk) {
if (returnBoolean) return Boolean.TRUE;
if (returnString) return "";
} else {
if (returnBoolean) return Boolean.$valueOf (result.asBoolean ());
if (returnString) {
if (result.tok == 4) result.intValue = 2147483647;
return result.asString ();
}}switch (result.tok) {
case 1073742335:
case 1073742334:
return Boolean.$valueOf (result.intValue == 1);
case 2:
return Integer.$valueOf (result.intValue);
case 10:
case 3:
case 4:
case 8:
default:
return result.value;
}
}, "~N,~N,~S,~B,~B,~N,~B,java.util.Map,~S,~B");
Clazz_defineMethod (c$, "atomExpressionAt", 
function (index) {
if (!this.checkToken (index)) {
this.iToken = index;
this.bad ();
}return this.atomExpression (this.st, index, 0, true, false, null, true);
}, "~N");
Clazz_defineMethod (c$, "atomExpression", 
function (code, pcStart, pcStop, allowRefresh, allowUnderflow, ret, andNotDeleted) {
this.isBondSet = false;
if (code !== this.st) {
this.tempStatement = this.st;
this.st = code;
}var rpn =  new JS.ScriptMathProcessor (this, false, false, false, ret == null, allowUnderflow, null);
var val;
var refreshed = false;
this.iToken = 1000;
var ignoreSubset = (pcStart < 0);
var isInMath = false;
var bs;
var nExpress = 0;
var ac = this.vwr.ms.ac;
var ptWithin = -10;
if (ignoreSubset) pcStart = -pcStart;
ignoreSubset = new Boolean (ignoreSubset | this.chk).valueOf ();
if (pcStop == 0 && code.length > pcStart) pcStop = pcStart + 1;
expression_loop : for (var pc = pcStart; pc < pcStop; ++pc) {
this.iToken = pc;
var instruction = code[pc];
if (instruction == null) break;
var value = instruction.value;
switch (instruction.tok) {
case 1073742325:
pcStart = pc;
pcStop = code.length;
nExpress++;
break;
case 1073742326:
nExpress--;
if (nExpress > 0) continue;
break expression_loop;
case 1073742332:
if (this.isPoint3f (pc)) {
var pt = this.getPoint3f (pc, true, true);
if (pt != null) {
rpn.addXPt (pt);
pc = this.iToken;
break;
}}break;
case 1073742338:
if (pc > 0 && code[pc - 1].tok == 1073742332) rpn.addXBs ( new JU.BS ());
break;
case 268435520:
isInMath = true;
rpn.addOp (instruction);
break;
case 268435521:
isInMath = false;
rpn.addOp (instruction);
break;
case 12290:
rpn.addXBs (this.getAtomBitSet (value));
break;
case 7:
bs = JS.SV.getBitSet (instruction, false);
if (bs != null) {
rpn.addXBs (bs);
break;
}case 6:
rpn.addXBs (this.vwr.ms.getAtoms (1086324744, (instruction).asString ()));
break;
case 134219265:
rpn.addX (JS.SV.newT (instruction));
rpn.addX (JS.SV.newV (9, this.hklParameter (pc + 2)));
pc = this.iToken;
break;
case 134217750:
rpn.addX (JS.SV.newT (instruction));
rpn.addX (JS.SV.newV (9, this.planeParameter (pc + 2)));
pc = this.iToken;
break;
case 1073742329:
rpn.addX (JS.SV.newT (instruction));
rpn.addXPt (this.getPoint3f (pc + 2, true, true));
pc = this.iToken;
break;
case 4:
var s = value;
if (s.indexOf ("({") == 0) {
bs = JU.BS.unescape (s);
if (bs != null) {
rpn.addXBs (bs);
break;
}} else if (s.indexOf ("|") >= 0 && ptWithin != pc - 4) {
rpn.addXBs (this.vwr.ms.getAtoms (1086324744, s));
break;
}rpn.addX (JS.SV.newT (instruction));
if (s.equals ("hkl")) {
rpn.addX (JS.SV.newV (9, this.hklParameter (pc + 2)));
pc = this.iToken;
}break;
case 134217759:
ptWithin = pc;
case 134218757:
case 134218756:
case 1237320707:
case 134353926:
case 134217736:
case 268435504:
case 1275203608:
rpn.addOp (instruction);
break;
case 1073742327:
rpn.addXBs (this.vwr.getAllAtoms ());
break;
case 1073742333:
rpn.addXBs ( new JU.BS ());
break;
case 1073742335:
case 1073742334:
rpn.addX (JS.SV.newT (instruction));
break;
case 1113589787:
rpn.addXBs (JU.BSUtil.copy (this.vwr.bsA ()));
break;
case 2097194:
rpn.addXBs (JU.BSUtil.copy (this.vwr.slm.getHiddenSet ()));
break;
case 12293:
rpn.addXBs (JU.BSUtil.copy (this.vwr.getMotionFixedAtoms ()));
break;
case 2097192:
rpn.addXBs (JU.BSUtil.copyInvert (this.vwr.slm.getHiddenSet (), ac));
break;
case 2097200:
rpn.addXBs (this.vwr.getBaseModelBitSet ());
break;
case 2097198:
rpn.addXBs (this.chk ?  new JU.BS () : JU.BSUtil.copy (this.vwr.ms.getVisibleSet (!refreshed)));
refreshed = true;
break;
case 2097190:
if (!this.chk && allowRefresh) (this).refresh (false);
rpn.addXBs (this.chk ?  new JU.BS () : this.vwr.ms.getClickableSet (!allowRefresh));
allowRefresh = false;
break;
case 1073742356:
if (this.vwr.ms.mc != 1 || this.vwr.ms.haveBioModels) {
var atomID = instruction.intValue;
if (atomID > 0) {
bs = this.compareInt (1094713346, 268435860, atomID);
if (atomID == 2) bs.or (this.compareInt (1086326789, 268435860, 20));
rpn.addXBs (bs);
} else {
rpn.addXBs (this.getAtomBits (instruction.tok, value));
}} else {
rpn.addXBs ((this).lookupIdentifierValue ("_" + value));
}break;
case 2097155:
case 2097188:
case 2097156:
case 1612709894:
case 1073742331:
case 2097166:
case 2097165:
case 2097168:
case 2097170:
case 2097172:
case 2097174:
case 1073742360:
case 1073742355:
case 2097196:
case 1088421903:
case 1814695966:
rpn.addXBs (this.getAtomBits (instruction.tok, value));
break;
case 1073742358:
case 1073742359:
var iModel = instruction.intValue;
if (iModel == 2147483647 && Clazz_instanceOf (value, Integer)) {
iModel = (value).intValue ();
if (!this.vwr.haveFileSet ()) {
rpn.addXBs (this.getAtomBits (1073742358, Integer.$valueOf (iModel)));
break;
}if (iModel <= 2147) iModel = iModel * 1000000;
}rpn.addXBs (this.bitSetForModelFileNumber (iModel));
break;
case 1073742361:
case 1073742357:
rpn.addXBs (this.getAtomBits (instruction.tok, Integer.$valueOf (instruction.intValue)));
break;
case 1073742362:
if (isInMath) rpn.addXNum (instruction);
 else rpn.addXBs (this.getAtomBits (1073742362, Integer.$valueOf (JS.ScriptExpr.getSeqCode (instruction))));
break;
case 1073742363:
if (isInMath) {
rpn.addXNum (instruction);
rpn.addOp (JS.T.tokenMinus);
rpn.addXNum (code[++pc]);
break;
}var chainID = (pc + 3 < code.length && code[pc + 2].tok == 268435584 && code[pc + 3].tok == 1073742357 ? code[pc + 3].intValue : -1);
rpn.addXBs (this.getAtomBits (1073742363,  Clazz_newIntArray (-1, [JS.ScriptExpr.getSeqCode (instruction), JS.ScriptExpr.getSeqCode (code[++pc]), chainID])));
if (chainID != -1) pc += 2;
break;
case 1094713350:
case 1094713349:
var pt = value;
rpn.addXBs (this.getAtomBits (instruction.tok,  Clazz_newIntArray (-1, [Clazz_doubleToInt (Math.floor (pt.x * 1000)), Clazz_doubleToInt (Math.floor (pt.y * 1000)), Clazz_doubleToInt (Math.floor (pt.z * 1000))])));
break;
case 2097182:
rpn.addXBs (this.vwr.am.cmi < 0 ? this.vwr.getFrameAtoms () : this.vwr.getModelUndeletedAtomsBitSet (this.vwr.am.cmi));
break;
case 1612709900:
case 2097154:
case 1114249217:
case 1612709912:
case 136314895:
case 2097159:
case 2097160:
case 2097162:
case 2097178:
case 2097180:
rpn.addXBs ((this).lookupIdentifierValue (value));
break;
case 268435859:
case 268435858:
case 268435857:
case 268435856:
case 268435860:
case 268435861:
case 268435862:
var tok = instruction.tok;
var tokWhat = instruction.intValue;
if ((tokWhat == 1094717448) && tok != 268435860) this.invArg ();
var data = null;
if (tokWhat == 1715472409) {
if (pc + 2 == code.length) this.invArg ();
if (!this.chk) data = this.vwr.getDataObj (code[++pc].value, null, 1);
}if (++pc == code.length) this.invArg ();
rpn.addXBs (this.chk ?  new JU.BS () : this.getComparison (code[pc], tokWhat, tok, value, data));
break;
case 3:
case 2:
rpn.addXNum (instruction);
break;
case 10:
var bs1 = JU.BSUtil.copy (value);
rpn.addXBs (bs1);
break;
case 8:
rpn.addXPt (value);
break;
default:
if (JS.T.tokAttr (instruction.tok, 268435456)) {
if (!rpn.addOp (instruction)) this.invArg ();
break;
}if (!(Clazz_instanceOf (value, String))) {
rpn.addXObj (value);
break;
}val = this.getParameter (value, 0, true);
if (isInMath) {
rpn.addXObj (val);
break;
}if (Clazz_instanceOf (val, String) || Clazz_instanceOf (val, JU.Lst)) val = this.getStringObjectAsVariable (val);
if (Clazz_instanceOf (val, String)) val = (this).lookupIdentifierValue (value);
rpn.addXObj (val);
break;
}
}
var expressionResult = rpn.getResult ();
if (expressionResult == null) {
if (allowUnderflow) return null;
if (!this.chk) rpn.dumpStacks ("after getResult");
this.error (13);
}var exp = expressionResult.value;
if (Clazz_instanceOf (exp, String) && (ret == null || (exp).startsWith ("({"))) {
exp = (this.chk ?  new JU.BS () : this.getAtomBitSet (exp));
}if (ret != null && !(Clazz_instanceOf (exp, JU.BS))) {
ret[0] = exp;
return null;
}bs = (Clazz_instanceOf (exp, JU.BS) ? exp :  new JU.BS ());
this.isBondSet = (Clazz_instanceOf (exp, JM.BondSet));
if (!this.isBondSet && (bs = this.vwr.slm.excludeAtoms (bs, ignoreSubset)).length () > this.vwr.ms.ac) bs.clearAll ();
if (this.tempStatement != null) {
this.st = this.tempStatement;
this.tempStatement = null;
}return bs;
}, "~A,~N,~N,~B,~B,~A,~B");
Clazz_defineMethod (c$, "getComparison", 
 function (t, tokWhat, tokOp, strOp, data) {
var tokValue = t.tok;
if (tokValue == 7) {
var bs =  new JU.BS ();
if (tokOp != 268435860) bs.setBits (0, this.vwr.ms.ac);
var lst = (t).getList ();
for (var i = lst.size (); --i >= 0; ) {
var res = this.getComparison (lst.get (i), tokWhat, tokOp, strOp, data);
if (tokOp == 268435860) bs.or (res);
 else bs.and (res);
}
return bs;
}var comparisonInt = t.intValue;
var comparisonFloat = NaN;
var isModel = (tokWhat == 1094717454);
var isIntProperty = JS.T.tokAttr (tokWhat, 1094713344);
var isFloatProperty = (JS.T.tokAttr (tokWhat, 1111490560) || (tokWhat & 1136656384) == 1077936128);
var isIntOrFloat = isIntProperty && isFloatProperty;
var isStringProperty = !isIntProperty && JS.T.tokAttr (tokWhat, 1086324736);
if (tokWhat == 1086326789) isIntProperty = !(isStringProperty = false);
var val = t.value;
if (JS.T.tokAttr (tokValue, 1073741824)) {
if ("_modelNumber".equalsIgnoreCase (val)) {
var modelIndex = this.vwr.am.cmi;
val = Integer.$valueOf (comparisonInt = (modelIndex < 0 ? 0 : this.vwr.getModelFileNumber (modelIndex)));
} else {
var v = this.getParameter (val, 1073742190, false);
if (v != null) {
if (v.tok == 7) return this.getComparison (v, tokWhat, tokOp, strOp, data);
comparisonInt = v.intValue;
val = (isStringProperty ? JS.SV.sValue (v) : JS.SV.nValue (v));
}}}if (Clazz_instanceOf (val, JU.P3)) {
if (tokWhat == 1765808134) {
comparisonInt = JU.CU.colorPtToFFRGB (val);
tokValue = 2;
isIntProperty = true;
}} else if (Clazz_instanceOf (val, String)) {
if (tokWhat == 1765808134) {
comparisonInt = JU.CU.getArgbFromString (val);
if (comparisonInt == 0 && JS.T.tokAttr (tokValue, 1073741824)) {
val = this.getVarParameter (val, true);
if ((val).startsWith ("{")) {
val = JU.Escape.uP (val);
if (Clazz_instanceOf (val, JU.P3)) comparisonInt = JU.CU.colorPtToFFRGB (val);
 else comparisonInt = 0;
} else {
comparisonInt = JU.CU.getArgbFromString (val);
}}tokValue = 2;
isIntProperty = true;
} else if (!isStringProperty) {
if (tokWhat == 1639976963 || tokWhat == 1237320707 || tokWhat == 1086326789) isStringProperty = !(isIntProperty = (comparisonInt != 2147483647));
 else val = JS.SV.nValue (t);
if (Clazz_instanceOf (val, Integer)) comparisonFloat = comparisonInt = (val).intValue ();
 else if (Clazz_instanceOf (val, Float) && isModel) comparisonInt = JM.ModelSet.modelFileNumberFromFloat ((val).floatValue ());
}}if (isStringProperty && !(Clazz_instanceOf (val, String))) {
val = "" + val;
}if (Clazz_instanceOf (val, Integer) || tokValue == 2) {
if (isModel) {
if (comparisonInt >= 1000000) tokWhat = -1094717454;
} else if (isIntOrFloat) {
isFloatProperty = false;
} else if (isFloatProperty) {
comparisonFloat = comparisonInt;
}} else if (Clazz_instanceOf (val, Float)) {
if (isModel) {
tokWhat = -1094717454;
} else {
comparisonFloat = (val).floatValue ();
if (isIntOrFloat) {
isIntProperty = false;
} else if (isIntProperty) {
comparisonInt = Clazz_floatToInt (comparisonFloat);
}}} else if (!isStringProperty) {
this.iToken++;
this.invArg ();
}if (isModel && comparisonInt >= 1000000 && comparisonInt % 1000000 == 0) {
comparisonInt /= 1000000;
tokWhat = 1228935687;
isModel = false;
}if (tokWhat == -1094717454 && tokOp == 268435860) {
return this.bitSetForModelFileNumber (comparisonInt);
}if (strOp != null && strOp.indexOf ("-") >= 0) {
if (isIntProperty) comparisonInt = -comparisonInt;
 else if (!Float.isNaN (comparisonFloat)) comparisonFloat = -comparisonFloat;
}return (isIntProperty ? this.compareInt (tokWhat, tokOp, comparisonInt) : isStringProperty ? this.compareString (tokWhat, tokOp, val) : this.compareFloatData (tokWhat, data, tokOp, comparisonFloat));
}, "JS.T,~N,~N,~S,~A");
Clazz_defineMethod (c$, "noCopy", 
function (i, dir) {
switch (this.tokAt (i + dir)) {
case 268435650:
case 268435649:
return ((this.st[i + dir].intValue == -1) == (dir == -1));
default:
return false;
}
}, "~N,~N");
Clazz_defineMethod (c$, "getAssocArray", 
function (i) {
var ht =  new java.util.Hashtable ();
var closer = (this.tokAt (i) == 1073742332 ? 1073742338 : 268435521);
for (i = i + 1; i < this.slen; i++) {
var tok = this.tokAt (i);
if (tok == closer) break;
var key = null;
if (Clazz_instanceOf (this.st[i], JS.SV)) key = (this.st[i]).myName;
if (key == null) key = JS.SV.sValue (this.st[i]);
i++;
if (this.tokAt (i++) != 268435490) this.invArg ();
var v = this.parameterExpression (i, 0, null, false, true, -1, false, null, null, false);
if (v.size () == 0) this.invArg ();
ht.put (key, v.get (0));
i = this.iToken;
if (this.tokAt (i) != 268435504) break;
}
this.iToken = i;
if (this.tokAt (i) != closer) this.invArg ();
return ht;
}, "~N");
Clazz_defineMethod (c$, "listBS", 
function (bs) {
var l =  new JU.Lst ();
l.addLast (JS.SV.newV (10, bs));
return l;
}, "JU.BS");
Clazz_defineMethod (c$, "compareFloatData", 
function (tokWhat, data, tokOperator, comparisonFloat) {
var bs =  new JU.BS ();
var ac = this.vwr.ms.ac;
var modelSet = this.vwr.ms;
var atoms = modelSet.at;
var propertyFloat = 0;
this.vwr.autoCalculate (tokWhat, null);
var isProp = (tokWhat == 1715472409);
if (!isProp && this.ptTemp == null) this.ptTemp =  new JU.P3 ();
for (var i = ac; --i >= 0; ) {
var match = false;
var atom = atoms[i];
if (isProp) {
if (data == null || data.length <= i) continue;
propertyFloat = data[i];
} else {
propertyFloat = atom.atomPropertyFloat (this.vwr, tokWhat, this.ptTemp);
}match = this.compareFloat (tokOperator, propertyFloat, comparisonFloat);
if (match) bs.set (i);
}
return bs;
}, "~N,~A,~N,~N");
Clazz_defineMethod (c$, "compareFloat", 
function (tokOperator, a, b) {
switch (tokOperator) {
case 268435859:
return a < b;
case 268435858:
return a <= b;
case 268435857:
return a >= b;
case 268435856:
return a > b;
case 268435860:
return a == b;
case 268435861:
return a != b && !Float.isNaN (a);
}
return false;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "compareString", 
 function (tokWhat, tokOperator, comparisonString) {
var bs =  new JU.BS ();
var atoms = this.vwr.ms.at;
var ac = this.vwr.ms.ac;
var isCaseSensitive = (tokOperator == 268435862 || tokWhat == 1086326788 && this.vwr.getBoolean (603979822));
if (!isCaseSensitive) comparisonString = comparisonString.toLowerCase ();
for (var i = ac; --i >= 0; ) {
var propertyString = atoms[i].atomPropertyString (this.vwr, tokWhat);
if (!isCaseSensitive) propertyString = propertyString.toLowerCase ();
if (this.compareStringValues (tokOperator, propertyString, comparisonString)) bs.set (i);
}
return bs;
}, "~N,~N,~S");
Clazz_defineMethod (c$, "compareStringValues", 
 function (tokOperator, propertyValue, comparisonValue) {
switch (tokOperator) {
case 268435860:
case 268435861:
return (JU.PT.isMatch (propertyValue, comparisonValue, true, true) == (tokOperator == 268435860));
case 268435862:
return JU.PT.isLike (propertyValue, comparisonValue);
default:
this.invArg ();
}
return false;
}, "~N,~S,~S");
Clazz_defineMethod (c$, "compareInt", 
 function (tokWhat, tokOperator, ival) {
var ia = 2147483647;
var propertyBitSet = null;
var bitsetComparator = tokOperator;
var bitsetBaseValue = ival;
var modelSet = this.vwr.ms;
var atoms = modelSet.at;
var ac = modelSet.ac;
var imax = -1;
var imin = 0;
var iModel = -1;
var cellRange = null;
var nOps = 0;
var bs;
switch (tokWhat) {
case 1296041986:
switch (bitsetComparator) {
case 268435857:
case 268435856:
imax = 2147483647;
break;
}
break;
case 1094713347:
try {
switch (tokOperator) {
case 268435859:
return JU.BSUtil.newBitSet2 (0, ival);
case 268435858:
return JU.BSUtil.newBitSet2 (0, ival + 1);
case 268435857:
return JU.BSUtil.newBitSet2 (ival, ac);
case 268435856:
return JU.BSUtil.newBitSet2 (ival + 1, ac);
case 268435860:
return (ival < ac ? JU.BSUtil.newBitSet2 (ival, ival + 1) :  new JU.BS ());
case 268435861:
default:
bs = JU.BSUtil.setAll (ac);
if (ival >= 0) bs.clear (ival);
return bs;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return  new JU.BS ();
} else {
throw e;
}
}
}
bs = JU.BS.newN (ac);
for (var i = 0; i < ac; ++i) {
var match = false;
var atom = atoms[i];
switch (tokWhat) {
default:
ia = atom.atomPropertyInt (tokWhat);
break;
case 1094713368:
case 1094717448:
return JU.BSUtil.copy (this.vwr.ms.getConformation (-1, ival - 1, false, null));
case 1296041986:
propertyBitSet = atom.atomSymmetry;
if (propertyBitSet == null) continue;
if (atom.mi != iModel) {
iModel = atom.mi;
cellRange = modelSet.getModelCellRange (iModel);
nOps = modelSet.getModelSymmetryCount (iModel);
}if (bitsetBaseValue >= 200) {
if (cellRange == null) continue;
ival = bitsetBaseValue % 1000;
var symop = Clazz_doubleToInt (bitsetBaseValue / 1000) - 1;
if (symop < 0) {
match = true;
} else if (nOps == 0 || symop >= 0 && !(match = propertyBitSet.get (symop))) {
continue;
}bitsetComparator = 1073742333;
if (symop < 0) ia = atom.getCellTranslation (ival, cellRange, nOps);
 else ia = atom.getSymmetryTranslation (symop, cellRange, nOps);
} else if (nOps > 0) {
if (ival > nOps) {
if (bitsetComparator != 268435859 && bitsetComparator != 268435858) continue;
}if (bitsetComparator == 268435861) {
if (ival > 0 && ival <= nOps && !propertyBitSet.get (ival)) {
bs.set (i);
}continue;
}var bs1 = JU.BSUtil.copy (propertyBitSet);
bs1.clearBits (nOps, bs1.length ());
propertyBitSet = bs1;
}switch (bitsetComparator) {
case 268435859:
imax = ival - 1;
break;
case 268435858:
imax = ival;
break;
case 268435857:
imin = ival - 1;
break;
case 268435856:
imin = ival;
break;
case 268435860:
imax = ival;
imin = ival - 1;
break;
case 268435861:
match = !propertyBitSet.get (ival);
break;
}
if (imin < 0) imin = 0;
if (imin < imax) {
var pt = propertyBitSet.nextSetBit (imin);
if (pt >= 0 && pt < imax) match = true;
}if (!match || ia == 2147483647) tokOperator = 1073742333;
}
switch (tokOperator) {
case 1073742333:
break;
case 268435859:
match = (ia < ival);
break;
case 268435858:
match = (ia <= ival);
break;
case 268435857:
match = (ia >= ival);
break;
case 268435856:
match = (ia > ival);
break;
case 268435860:
match = (ia == ival);
break;
case 268435861:
match = (ia != ival);
break;
}
if (match) bs.set (i);
}
return bs;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "getBitsetPropertySelector", 
 function (i, xTok) {
var tok = this.getToken (i).tok;
switch (tok) {
case 32:
case 64:
case 96:
case 192:
case 128:
case 160:
case 1715472409:
break;
default:
if (JS.T.tokAttrOr (tok, 1077936128, 1140850688) || xTok == 6) break;
if (tok != 805306401 && !JS.T.tokAttr (tok, 1073741824)) break;
var name = this.paramAsStr (i);
if (this.vwr.isFunction (name.toLowerCase ())) {
tok = 134320141;
break;
}}
return JS.SV.newSV (268435665, tok, this.paramAsStr (i));
}, "~N,~N");
Clazz_defineMethod (c$, "getBitsetProperty", 
function (bs, pts, tok, ptRef, planeRef, tokenValue, opValue, useAtomMap, index, asVectorIfAll) {
var haveIndex = (index != 2147483647);
var isAtoms = haveIndex || !(Clazz_instanceOf (tokenValue, JM.BondSet));
var minmaxtype = tok & 480;
var selectedFloat = (minmaxtype == 224);
var ac = this.vwr.ms.ac;
var fout = (minmaxtype == 256 ?  Clazz_newFloatArray (ac, 0) : null);
var isExplicitlyAll = (minmaxtype == 480 || selectedFloat);
tok &= -481;
var info = null;
if (tok == 0) tok = (isAtoms ? 1140850689 : 1677721602);
var isPt = false;
var isHash = false;
var isInt = false;
var isString = false;
switch (tok) {
case 1275068449:
return (this.vwr.getAuxiliaryInfoForAtoms (bs)).get ("models");
case 1145047050:
case 1145047055:
case 1145047051:
case 1145047053:
case 1145045008:
case 1145045006:
case 1765808134:
case 1145047052:
isPt = true;
break;
case 1275203608:
isHash = true;
info =  Clazz_newArray (-1, [null, null]);
break;
case 134320141:
case 1275069443:
break;
default:
isInt = JS.T.tokAttr (tok, 1094713344) && !JS.T.tokAttr (tok, 1111490560);
isString = !isInt && JS.T.tokAttr (tok, 1086324736);
}
var pt = (isPt || !isAtoms ?  new JU.P3 () : null);
if (isExplicitlyAll || isString && !haveIndex && minmaxtype != 256 && minmaxtype != 32) minmaxtype = 1073742327;
var vout = (minmaxtype == 1073742327 ?  new JU.Lst () : null);
var bsNew = null;
var userFunction = null;
var params = null;
var bsAtom = null;
var tokenAtom = null;
var ptT = null;
var data = null;
var ffdata = null;
switch (tok) {
case 1140850689:
case 1677721602:
if (this.chk) return bs;
bsNew = (tok == 1140850689 ? (isAtoms ? bs : this.vwr.ms.getAtoms (1677721602, bs)) : (isAtoms ? JM.BondSet.newBS (this.vwr.getBondsForSelectedAtoms (bs), null) : bs));
var i;
switch (minmaxtype) {
case 32:
i = bsNew.nextSetBit (0);
break;
case 64:
i = bsNew.length () - 1;
break;
case 192:
case 128:
case 160:
return Float.$valueOf (NaN);
default:
return bsNew;
}
bsNew.clearAll ();
if (i >= 0) bsNew.set (i);
return bsNew;
case 1086324745:
switch (minmaxtype) {
case 0:
case 1073742327:
return this.getCmdExt ().getBitsetIdent (bs, null, tokenValue, useAtomMap, index, isExplicitlyAll);
}
return "";
case 134320141:
userFunction = (opValue)[0];
params = (opValue)[1];
bsAtom = JU.BS.newN (ac);
tokenAtom = JS.SV.newV (10, bsAtom);
break;
case 1111490587:
for (var j = fout.length; --j >= 0; ) fout[j] = NaN;

case 1111490574:
case 1111490575:
this.vwr.autoCalculate (tok, tokenValue);
break;
case 1275069443:
if (ptRef == null && planeRef == null) return  new JU.P3 ();
break;
case 1765808134:
ptT =  new JU.P3 ();
break;
case 1715472409:
data = this.vwr.getDataObj (opValue, null, 1);
if (data == null) ffdata = this.vwr.getDataObj (opValue, null, 2);
if (ffdata != null) {
minmaxtype = 1073742327;
vout =  new JU.Lst ();
}break;
}
var n = 0;
var ivMinMax = 0;
var fvMinMax = 0;
var sum = 0;
var sum2 = 0;
switch (minmaxtype) {
case 32:
ivMinMax = 2147483647;
fvMinMax = 3.4028235E38;
break;
case 64:
ivMinMax = -2147483648;
fvMinMax = -3.4028235E38;
break;
}
var modelSet = this.vwr.ms;
var mode = (ffdata != null ? 5 : isHash ? 4 : isPt ? 3 : isString ? 2 : isInt ? 1 : 0);
if (isAtoms) {
var haveBitSet = (bs != null);
var i0;
var i1;
if (pts != null) {
i0 = 0;
i1 = pts.size ();
} else if (haveIndex) {
i0 = index;
i1 = index + 1;
} else if (haveBitSet) {
i0 = bs.nextSetBit (0);
i1 = Math.min (ac, bs.length ());
} else {
i0 = 0;
i1 = ac;
}if (this.chk) i1 = 0;
for (var i = i0; i >= 0 && i < i1; i = (haveBitSet ? bs.nextSetBit (i + 1) : i + 1)) {
n++;
var atom = (pts == null ? modelSet.at[i] : null);
switch (mode) {
case 0:
var fv = 3.4028235E38;
switch (tok) {
case 134320141:
bsAtom.set (i);
fv = JS.SV.fValue ((this).getUserFunctionResult (userFunction, params, tokenAtom));
bsAtom.clear (i);
break;
case 1715472409:
fv = (data == null ? 0 : data[i]);
break;
case 1275069443:
if (planeRef != null) fv = JU.Measure.distanceToPlane (planeRef, atom);
 else fv = (pts != null ? JS.SV.ptValue (pts.get (i)).distance (ptRef) : atom !== ptRef || minmaxtype != 32 ? atom.distance (ptRef) : NaN);
break;
default:
fv = atom.atomPropertyFloat (this.vwr, tok, this.ptTemp);
}
if (fv == 3.4028235E38 || Float.isNaN (fv) && minmaxtype != 1073742327) {
n--;
continue;
}switch (minmaxtype) {
case 32:
if (fv < fvMinMax) fvMinMax = fv;
break;
case 64:
if (fv > fvMinMax) fvMinMax = fv;
break;
case 256:
fout[i] = fv;
break;
case 1073742327:
vout.addLast (Float.$valueOf (fv));
break;
case 160:
case 192:
sum2 += (fv) * fv;
case 128:
default:
sum += fv;
}
break;
case 1:
var iv = 0;
switch (tok) {
case 1094717448:
case 1094713349:
this.errorStr (45, JS.T.nameOf (tok));
break;
default:
iv = atom.atomPropertyInt (tok);
}
switch (minmaxtype) {
case 32:
if (iv < ivMinMax) ivMinMax = iv;
break;
case 64:
if (iv > ivMinMax) ivMinMax = iv;
break;
case 256:
fout[i] = iv;
break;
case 1073742327:
vout.addLast (Integer.$valueOf (iv));
break;
case 160:
case 192:
sum2 += (iv) * iv;
case 128:
default:
sum += iv;
}
break;
case 2:
var s = atom.atomPropertyString (this.vwr, tok);
switch (minmaxtype) {
case 256:
fout[i] = JU.PT.parseFloat (s);
break;
default:
if (vout == null) return s;
vout.addLast (s);
}
break;
case 3:
var t = atom.atomPropertyTuple (this.vwr, tok, this.ptTemp);
switch (minmaxtype) {
case 256:
fout[i] = (pt == null ? -1 : t == null ? 0 : t.length ());
break;
case 1073742327:
vout.addLast (t == null ? Integer.$valueOf (-1) : JU.P3.newP (t));
break;
default:
if (t == null) n--;
 else pt.add (t);
}
break;
case 4:
switch (tok) {
case 1275203608:
info[0] = Integer.$valueOf (i);
info[1] = "";
this.vwr.shm.getShapePropertyData (21, "info", info);
if (info[1] != null) {
if (vout == null) return info[1];
vout.addLast (info[1]);
}break;
}
break;
case 5:
vout.addLast (ffdata[i]);
break;
}
if (haveIndex) break;
}
} else {
var isAll = (bs == null);
var i0 = (isAll ? 0 : bs.nextSetBit (0));
var i1 = this.vwr.ms.bondCount;
for (var i = i0; i >= 0 && i < i1; i = (isAll ? i + 1 : bs.nextSetBit (i + 1))) {
n++;
var bond = modelSet.bo[i];
switch (tok) {
case 1140850691:
var fv = bond.atom1.distance (bond.atom2);
switch (minmaxtype) {
case 32:
if (fv < fvMinMax) fvMinMax = fv;
break;
case 64:
if (fv > fvMinMax) fvMinMax = fv;
break;
case 1073742327:
vout.addLast (Float.$valueOf (fv));
break;
case 160:
case 192:
sum2 += fv * fv;
case 128:
default:
sum += fv;
}
break;
case 1145047050:
switch (minmaxtype) {
case 1073742327:
pt.ave (bond.atom1, bond.atom2);
vout.addLast (JU.P3.newP (pt));
break;
default:
pt.add (bond.atom1);
pt.add (bond.atom2);
n++;
}
break;
case 1765808134:
JU.CU.colorPtFromInt (this.vwr.gdata.getColorArgbOrGray (bond.colix), ptT);
switch (minmaxtype) {
case 1073742327:
vout.addLast (JU.P3.newP (ptT));
break;
default:
pt.add (ptT);
}
break;
default:
this.errorStr (46, JS.T.nameOf (tok));
}
}
}if (minmaxtype == 256) return fout;
if (minmaxtype == 1073742327) {
if (asVectorIfAll) return vout;
var len = vout.size ();
if ((isString || isHash) && !isExplicitlyAll && len == 1) return vout.get (0);
if (selectedFloat) {
fout =  Clazz_newFloatArray (len, 0);
for (var i = len; --i >= 0; ) {
var v = vout.get (i);
switch (mode) {
case 0:
fout[i] = (v).floatValue ();
break;
case 1:
fout[i] = (v).floatValue ();
break;
case 2:
fout[i] = JU.PT.parseFloat (v);
break;
case 3:
fout[i] = (v == null ? -1 : (v).length ());
break;
}
}
return fout;
}if (tok == 1086324744) {
var sb =  new JU.SB ();
for (var i = 0; i < len; i++) sb.append (vout.get (i));

return sb.toString ();
}var sout =  new Array (len);
for (var i = len; --i >= 0; ) {
var v = vout.get (i);
if (Clazz_instanceOf (v, JU.P3)) sout[i] = JU.Escape.eP (v);
 else sout[i] = "" + vout.get (i);
}
return sout;
}if (isPt) return (n == 0 ? Integer.$valueOf (-1) : JU.P3.new3 (pt.x / n, pt.y / n, pt.z / n));
if (isHash) return  new java.util.Hashtable ();
if (n == 0 || n == 1 && minmaxtype == 192) return Float.$valueOf (NaN);
if (isInt) {
switch (minmaxtype) {
case 32:
case 64:
return Integer.$valueOf (ivMinMax);
case 160:
case 192:
break;
case 128:
return Integer.$valueOf (Clazz_doubleToInt (sum));
default:
if (sum / n == Clazz_doubleToInt (sum / n)) return Integer.$valueOf (Clazz_doubleToInt (sum / n));
return Float.$valueOf ((sum / n));
}
}switch (minmaxtype) {
case 32:
case 64:
sum = fvMinMax;
break;
case 128:
break;
case 160:
sum = sum2;
break;
case 192:
sum = Math.sqrt ((sum2 - sum * sum / n) / (n - 1));
break;
default:
sum /= n;
break;
}
return Float.$valueOf (sum);
}, "JU.BS,JU.Lst,~N,JU.P3,JU.P4,~O,~O,~B,~N,~B");
Clazz_defineMethod (c$, "bitSetForModelFileNumber", 
 function (m) {
var bs = JU.BS.newN (this.vwr.ms.ac);
if (this.chk) return bs;
var modelCount = this.vwr.ms.mc;
var haveFileSet = this.vwr.haveFileSet ();
if (m < 1000000 && haveFileSet) m *= 1000000;
var pt = m % 1000000;
if (pt == 0) {
var model1 = this.vwr.ms.getModelNumberIndex (m + 1, false, false);
if (model1 < 0) return bs;
var model2 = (m == 0 ? modelCount : this.vwr.ms.getModelNumberIndex (m + 1000001, false, false));
if (model1 < 0) model1 = 0;
if (model2 < 0) model2 = modelCount;
if (this.vwr.ms.isTrajectory (model1)) model2 = model1 + 1;
for (var j = model1; j < model2; j++) bs.or (this.vwr.getModelUndeletedAtomsBitSet (j));

} else {
var modelIndex = this.vwr.ms.getModelNumberIndex (m, false, true);
if (modelIndex >= 0) bs.or (this.vwr.getModelUndeletedAtomsBitSet (modelIndex));
}return bs;
}, "~N");
Clazz_defineMethod (c$, "getStringObjectAsVariable", 
 function (obj) {
if (obj == null) return obj;
if (Clazz_instanceOf (obj, String)) {
var s = obj;
if (s.length == 0) return s;
return JS.SV.unescapePointOrBitsetAsVariable (s);
}var lst = obj;
if (lst.size () == 0) return "";
if (lst.get (0).asString ().contains ("|")) return this.vwr.ms.getAtoms (1086324744, JS.SV.newV (7, lst).asString ());
var bs = JS.SV.unEscapeBitSetArray (lst, true);
return (bs == null ? "" : bs);
}, "~O");
Clazz_defineMethod (c$, "getAtomBits", 
function (tokType, specInfo) {
return (this.chk ?  new JU.BS () : this.vwr.ms.getAtoms (tokType, specInfo));
}, "~N,~O");
c$.getSeqCode = Clazz_defineMethod (c$, "getSeqCode", 
function (instruction) {
return (instruction.intValue == 2147483647 ? (instruction.value).intValue () : JM.Group.getSeqcodeFor (instruction.intValue, ' '));
}, "JS.T");
Clazz_defineMethod (c$, "setVariable", 
function (pt, ptMax, key, isSet) {
var bs = null;
var propertyName = "";
var settingData = key.startsWith ("property_");
var isThrown = key.equals ("thrown_value");
var isExpression = (this.tokAt (1) == 1073742325 || this.tokAt (1) == 268435472);
var t = (settingData ? null : key.length == 0 ?  new JS.SV () : this.getContextVariableAsVariable (key, false));
if (isSet && !isExpression) {
switch (this.tokAt (2)) {
default:
pt = 2;
break;
case 268435860:
pt = 3;
break;
case 1073742195:
case 268435520:
if (this.st[0].intValue == 61) {
pt = 2;
break;
}case 1073742336:
case 1073742337:
key = null;
break;
}
}var nv = 0;
var v = this.parameterExpression (pt, ptMax, key, true, true, -1, false, null, null, isSet && pt == 1);
nv = v.size ();
if (nv == 0) this.invArg ();
if (this.chk || v.get (0).tok == 0) return null;
var tv = JS.SV.selectItemVar (JS.SV.newS ("").setv (v.get (nv - 1)));
if (nv > 1) {
var sel = (nv > 2 ? v.get (1) : null);
t = v.get (0);
var selectOne = false;
switch (t.tok) {
case 6:
case 14:
if (nv > 3) this.invArg ();
t.mapPut (sel.asString (), tv);
break;
case 7:
if (nv > 2 + (sel == null ? 0 : 1)) this.invArg ();
if (sel == null) {
sel = t;
} else {
t = JS.SV.selectItemVar (t);
}selectOne = true;
break;
case 4:
if (sel.tok != 2) {
t.value = JU.PT.rep (t.asString (), sel.asString (), tv.asString ());
t.intValue = 2147483647;
break;
}case 11:
case 12:
if (t.intValue == 2147483647) selectOne = true;
 else t.setSelectedValue (t.intValue, sel.asInt (), tv);
break;
case 8:
var p = (t.value = JU.P3.newP (t.value));
var f = tv.asFloat ();
switch (JS.T.getTokFromName (sel.asString ())) {
case 1111492629:
p.x = f;
break;
case 1111492630:
p.y = f;
break;
case 1111492631:
p.z = f;
break;
}
break;
case 10:
bs = JS.SV.getBitSet (t, true);
var nAtoms = this.vwr.ms.ac;
var nbs = bs.cardinality ();
propertyName = sel.asString ();
var tok = JS.T.getTokFromName (propertyName);
switch (tok) {
case 0:
if (propertyName.startsWith ("property_")) {
var obj;
if (tv.tok == 7) {
var nmin = (tv.getList ().size () == nbs ? nbs : nAtoms);
obj = (JS.SV.getArrayDepth (tv) > 1 ? JS.SV.fflistValue (tv, nmin) : JS.SV.flistValue (tv, nmin));
} else {
obj = tv.asString ();
}this.vwr.setData (propertyName,  Clazz_newArray (-1, [propertyName, obj, JU.BSUtil.copy (bs), Integer.$valueOf (-1)]), nAtoms, 0, 0, tv.tok == 7 ? 2147483647 : -2147483648, 0);
break;
}this.iToken = pt;
this.error (56);
break;
case 1825200146:
case 1287653388:
this.vwr.shm.loadShape (5);
default:
this.setBitsetProperty (bs, tok, tv.asInt (), tv.asFloat (), tv);
break;
}
break;
}
if (selectOne) t.setSelectedValue (sel.intValue, 2147483647, tv);
return null;
}var needVariable = (!settingData && t == null && (isThrown || !(Clazz_instanceOf (tv.value, String) || tv.tok == 2 || Clazz_instanceOf (tv.value, Integer) || Clazz_instanceOf (tv.value, Float) || Clazz_instanceOf (tv.value, Boolean))));
if (needVariable && key != null) {
if (key.startsWith ("_") || (t = this.vwr.g.getAndSetNewVariable (key, true)) == null) this.errorStr (22, key);
}if (t != null) return t.setv (tv);
var vv = JS.SV.oValue (tv);
if (settingData) {
if (tv.tok == 7) vv = tv.asString ();
this.vwr.setData (key,  Clazz_newArray (-1, [key, "" + vv, JU.BSUtil.copy (this.vwr.bsA ()), Integer.$valueOf (0)]), this.vwr.ms.ac, 0, 0, -2147483648, 0);
return null;
}if (Clazz_instanceOf (vv, Boolean)) {
this.setBooleanProperty (key, (vv).booleanValue ());
} else if (Clazz_instanceOf (vv, Integer)) {
this.setIntProperty (key, (vv).intValue ());
} else if (Clazz_instanceOf (vv, Float)) {
this.setFloatProperty (key, (vv).floatValue ());
} else if (Clazz_instanceOf (vv, String)) {
this.setStringProperty (key, vv);
} else {
}return tv;
}, "~N,~N,~S,~B");
Clazz_defineMethod (c$, "setBitsetProperty", 
 function (bs, tok, iValue, fValue, tokenValue) {
if (this.chk || bs.cardinality () == 0) return;
var list = null;
var sValue = null;
var fvalues = null;
var pt;
var sv = null;
var nValues = 0;
var isStrProperty = JS.T.tokAttr (tok, 1086324736);
if (tokenValue.tok == 7) {
sv = (tokenValue).getList ();
if ((nValues = sv.size ()) == 0) return;
}switch (tok) {
case 1145047050:
case 1145047051:
case 1145047053:
case 1145047055:
switch (tokenValue.tok) {
case 8:
this.vwr.setAtomCoords (bs, tok, tokenValue.value);
break;
case 7:
this.theToken = tokenValue;
this.vwr.setAtomCoords (bs, tok, this.getPointArray (-1, nValues, true));
break;
}
return;
case 1765808134:
var value = null;
var prop = "color";
switch (tokenValue.tok) {
case 7:
var values =  Clazz_newIntArray (nValues, 0);
for (var i = nValues; --i >= 0; ) {
var svi = sv.get (i);
pt = JS.SV.ptValue (svi);
if (pt != null) {
values[i] = JU.CU.colorPtToFFRGB (pt);
} else if (svi.tok == 2) {
values[i] = svi.intValue;
} else {
values[i] = JU.CU.getArgbFromString (svi.asString ());
if (values[i] == 0) values[i] = svi.asInt ();
}if (values[i] == 0) this.errorStr2 (50, "ARRAY", svi.asString ());
}
value = values;
prop = "colorValues";
break;
case 8:
value = Integer.$valueOf (JU.CU.colorPtToFFRGB (tokenValue.value));
break;
case 4:
value = tokenValue.value;
break;
default:
value = Integer.$valueOf (JS.SV.iValue (tokenValue));
break;
}
(this).setAtomProp (prop, value, bs);
return;
case 1825200146:
case 1287653388:
if (tokenValue.tok != 7) sValue = JS.SV.sValue (tokenValue);
break;
case 1086326789:
case 1094715402:
(this).clearDefinedVariableAtomSets ();
isStrProperty = false;
break;
}
switch (tokenValue.tok) {
case 7:
if (isStrProperty) list = JS.SV.strListValue (tokenValue);
 else fvalues = JS.SV.flistValue (tokenValue, nValues);
break;
case 4:
if (sValue == null) list = JU.PT.getTokens (JS.SV.sValue (tokenValue));
break;
}
if (list != null) {
nValues = list.length;
if (!isStrProperty) {
fvalues =  Clazz_newFloatArray (nValues, 0);
for (var i = nValues; --i >= 0; ) fvalues[i] = (tok == 1086326789 ? JU.Elements.elementNumberFromSymbol (list[i], false) : JU.PT.parseFloat (list[i]));

}if (tokenValue.tok != 7 && nValues == 1) {
if (isStrProperty) sValue = list[0];
 else fValue = fvalues[0];
iValue = Clazz_floatToInt (fValue);
list = null;
fvalues = null;
}}if (!JS.T.tokAttr (tok, 2048)) this.error (56);
this.vwr.setAtomProperty (bs, tok, iValue, fValue, sValue, fvalues, list);
}, "JU.BS,~N,~N,~N,JS.T");
Clazz_defineMethod (c$, "setStatement", 
function (st0, pt0) {
this.st = st0;
this.slen = this.st.length;
if (this.slen == 0) return true;
var fixed;
var i;
var tok;
for (i = pt0; i < this.slen; i++) {
if (this.st[i] == null) {
this.slen = i;
return true;
}if (this.st[i].tok == 12290) break;
}
if (i == this.slen) return i == this.slen;
switch (this.st[0].tok) {
case 102436:
case 134320141:
case 1073741824:
if (this.tokAt (1) == 268435472) return true;
}
fixed =  new Array (this.slen);
fixed[0] = this.st[0];
var isExpression = false;
var j = pt0;
for (i = pt0; i < this.slen; i++) {
if (this.st[i] == null) continue;
switch (tok = this.getToken (i).tok) {
default:
fixed[j] = this.st[i];
break;
case 1073742325:
case 1073742326:
isExpression = (tok == 1073742325);
fixed[j] = this.st[i];
break;
case 12290:
if (++i == this.slen) this.invArg ();
var v;
var forceString = (this.theToken.intValue == 4);
var s;
var $var = this.paramAsStr (i);
var isClauseDefine = (this.tokAt (i) == 1073742325);
var isSetAt = (pt0 == 1 && j == 1 && this.st[0] === JS.T.tokenSetCmd);
if (isClauseDefine) {
var vt = this.parameterExpressionToken (++i);
if (this.chk) {
v = null;
} else if (vt.tok != 7) {
v = JS.SV.oValue (vt);
} else if (!isExpression) {
v = vt;
} else {
var bs = JS.SV.getBitSet (vt, true);
if (bs == null) {
var sv = JS.SV.sValue (vt);
v = (sv.indexOf ("|") < 0 ? this.getAtomBitSet (sv) : sv);
} else {
v = bs;
}}i = this.iToken;
} else if (this.chk) {
v =  new JU.BS ();
} else {
if (this.tokAt (i) == 2) {
v = this.vwr.ms.getAtoms (1094715393, Integer.$valueOf (this.st[i].intValue));
} else if (this.tokAt (i) == 12290 && this.tokAt (i + 1) == 2) {
v = this.vwr.ms.getAtomsFromAtomNumberInFrame (this.st[++i].intValue);
} else {
v = this.getParameter ($var, 0, true);
}if (!isExpression && !isSetAt) isClauseDefine = true;
}tok = this.tokAt (0);
forceString = new Boolean (forceString | (JS.T.tokAttr (tok, 20480) || tok == 134222850)).valueOf ();
if (v == null) {
fixed[j] = JS.T.tokenAll;
} else if (Clazz_instanceOf (v, JS.SV)) {
fixed[j] = v;
} else if (Clazz_instanceOf (v, Boolean)) {
fixed[j] = ((v).booleanValue () ? JS.T.tokenOn : JS.T.tokenOff);
} else if (Clazz_instanceOf (v, Integer)) {
fixed[j] = JS.T.tv (2, (v).intValue (), v);
} else if (Clazz_instanceOf (v, Float)) {
fixed[j] = JS.T.tv (3, JS.ScriptParam.getFloatEncodedInt ("" + v), v);
} else if (Clazz_instanceOf (v, String)) {
if (!forceString && !isExpression) {
if ((tok != 36867 || j > 1 && this.st[1].tok != 537022465 && !"labelfor".equalsIgnoreCase (this.st[1].value.toString ())) && JS.T.tokAttr (tok, 36864)) {
v = this.getParameter (v, 1073742190, true);
}if (Clazz_instanceOf (v, String)) {
v = this.getStringObjectAsVariable (v);
}}if (Clazz_instanceOf (v, JS.SV)) {
fixed[j] = v;
} else {
s = v;
if (isExpression && !forceString) {
fixed[j] = (s.indexOf ("|") >= 0 || JS.T.tokAttr (fixed[j - 1].tok, 268435712) ? JS.T.o (4, s) : JS.T.o (10, this.getAtomBitSet (s)));
} else {
tok = (isSetAt ? JS.T.getTokFromName (s) : isClauseDefine || forceString || s.length == 0 || s.indexOf (".") >= 0 || s.indexOf (" ") >= 0 || s.indexOf ("=") >= 0 || s.indexOf (";") >= 0 || s.indexOf ("[") >= 0 || s.indexOf ("{") >= 0 ? 4 : 1073741824);
fixed[j] = JS.T.o (tok, v);
}}} else if (Clazz_instanceOf (v, JU.BArray)) {
fixed[j] = JS.SV.newV (15, v);
} else if (Clazz_instanceOf (v, JU.BS)) {
fixed[j] = JS.SV.newV (10, v);
} else if (Clazz_instanceOf (v, JU.P3)) {
fixed[j] = JS.SV.newV (8, v);
} else if (Clazz_instanceOf (v, JU.P4)) {
fixed[j] = JS.SV.newV (9, v);
} else if (Clazz_instanceOf (v, JU.M34)) {
fixed[j] = JS.SV.newV (Clazz_instanceOf (v, JU.M4) ? 12 : 11, v);
} else if (Clazz_instanceOf (v, java.util.Map) || Clazz_instanceOf (v, JS.ScriptContext) && (v = (v).getFullMap ()) != null) {
fixed[j] = JS.SV.newV (6, (isExpression ? v : JS.SV.deepCopy (v, true, true)));
} else if (Clazz_instanceOf (v, JU.Lst)) {
if (!isExpression) {
fixed[j] = JS.SV.newV (7, JS.SV.deepCopy (v, false, true));
break;
}var sv = v;
var bs = null;
for (var k = 0; k < sv.size (); k++) {
var svk = sv.get (k);
if (svk.tok != 10) {
bs = null;
break;
}if (bs == null) bs =  new JU.BS ();
bs.or (svk.value);
}
fixed[j] = (bs == null ? JS.SV.getVariable (v) : JS.T.o (10, bs));
} else {
var center = (this).getObjectCenter ($var, -2147483648, -2147483648);
if (center == null) this.invArg ();
fixed[j] = JS.T.o (8, center);
}if (isSetAt && !JS.T.tokAttr (fixed[j].tok, 536870912)) this.invArg ();
break;
}
j++;
}
this.st = fixed;
for (i = j; i < this.st.length; i++) this.st[i] = null;

this.slen = j;
return true;
}, "~A,~N");
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.ScriptFlowContext", ["JS.ScriptCompiler"], function () {
c$ = Clazz_decorateAsClass (function () {
this.compiler = null;
this.token = null;
this.pt0 = 0;
this.ptDefault = 0;
this.$function = null;
this.$var = null;
this.parent = null;
this.lineStart = 0;
this.commandStart = 0;
this.ptLine = 0;
this.ptCommand = 0;
this.forceEndIf = true;
this.ident = null;
this.addLine = 0;
this.tok0 = 0;
this.ichCommand = 0;
this.line0 = 0;
Clazz_instantialize (this, arguments);
}, JS, "ScriptFlowContext");
Clazz_makeConstructor (c$, 
function (compiler, token, pt0, parent, ich, line0) {
this.compiler = compiler;
this.token = token;
this.tok0 = token.tok;
this.ident = token.value;
this.pt0 = pt0;
this.line0 = line0;
this.parent = parent;
this.ichCommand = ich;
this.lineStart = this.ptLine = this.compiler.lineCurrent;
this.commandStart = this.ptCommand = this.compiler.iCommand;
}, "JS.ScriptCompiler,JS.ContextToken,~N,JS.ScriptFlowContext,~N,~N");
Clazz_defineMethod (c$, "getBreakableContext", 
function (nLevelsUp) {
var f = this;
while (f != null && (!JS.ScriptCompiler.isBreakableContext (f.token.tok) || nLevelsUp-- > 0)) f = f.parent;

return f;
}, "~N");
Clazz_defineMethod (c$, "checkForceEndIf", 
function (offset) {
if (this.ptCommand == this.compiler.iCommand && this.addLine > 0) this.addLine++;
var test = this.forceEndIf && this.ptCommand < this.compiler.iCommand && this.ptLine + (this.addLine == 0 ? 0 : this.addLine + offset) == this.compiler.lineCurrent;
if (test) this.forceEndIf = false;
return test;
}, "~N");
Clazz_defineMethod (c$, "setPt0", 
function (pt0, isDefault) {
this.pt0 = pt0;
if (isDefault) this.ptDefault = pt0;
this.setLine ();
return pt0;
}, "~N,~B");
Clazz_defineMethod (c$, "setLine", 
function () {
this.ptLine = this.compiler.lineCurrent;
this.ptCommand = this.compiler.iCommand + 1;
});
Clazz_overrideMethod (c$, "toString", 
function () {
return "ident " + this.ident + " line " + this.lineStart + " command " + this.commandStart;
});
Clazz_defineMethod (c$, "path", 
function () {
var s = "";
var f = this;
while (f != null) {
s = f.ident + "-" + s;
f = f.parent;
}
return "[" + s + "]";
});
Clazz_defineMethod (c$, "setFunction", 
function ($function) {
this.$function = $function;
}, "JS.ScriptFunction");
});
Clazz_declarePackage ("JS");
Clazz_load (["J.api.JmolScriptFunction", "java.util.Hashtable", "JU.Lst"], "JS.ScriptFunction", ["JU.AU", "$.SB", "JS.SV", "$.T"], function () {
c$ = Clazz_decorateAsClass (function () {
this.pt0 = 0;
this.chpt0 = 0;
this.cmdpt0 = -1;
this.typeName = null;
this.name = null;
this.nParameters = 0;
this.names = null;
this.tok = 0;
this.variables = null;
this.returnValue = null;
this.aatoken = null;
this.lineIndices = null;
this.lineNumbers = null;
this.script = null;
Clazz_instantialize (this, arguments);
}, JS, "ScriptFunction", null, J.api.JmolScriptFunction);
Clazz_prepareFields (c$, function () {
this.names =  new JU.Lst ();
this.variables =  new java.util.Hashtable ();
});
Clazz_defineMethod (c$, "isVariable", 
function (ident) {
return this.variables.containsKey (ident);
}, "~S");
Clazz_makeConstructor (c$, 
function () {
});
Clazz_makeConstructor (c$, 
function (name, tok) {
this.set (name, tok);
this.typeName = JS.T.nameOf (tok);
}, "~S,~N");
Clazz_defineMethod (c$, "set", 
function (name, tok) {
this.name = name;
this.tok = tok;
}, "~S,~N");
Clazz_defineMethod (c$, "setVariables", 
function (contextVariables, params) {
var nParams = (params == null ? 0 : params.size ());
for (var i = this.names.size (); --i >= 0; ) {
var name = this.names.get (i).toLowerCase ();
var $var = (i < this.nParameters && i < nParams ? params.get (i) : null);
if ($var != null && $var.tok != 7) $var = JS.SV.newT ($var);
contextVariables.put (name, ($var == null ? JS.SV.newS ("").setName (name) : $var));
}
if (this.tok != 364558) {
contextVariables.put ("_argcount", JS.SV.newI (params == null ? 0 : params.size ()));
contextVariables.put ("_arguments", (params == null ? JS.SV.getVariableAI ( Clazz_newIntArray (-1, [])) : JS.SV.getVariableList (params)));
}contextVariables.put ("_retval", JS.SV.newI (this.tok == 364558 ? 2147483647 : 0));
}, "java.util.Map,JU.Lst");
Clazz_defineMethod (c$, "unsetVariables", 
function (contextVariables, params) {
var nParams = (params == null ? 0 : params.size ());
var nNames = this.names.size ();
if (nParams == 0 || nNames == 0) return;
for (var i = 0; i < nNames && i < nParams; i++) {
var global = params.get (i);
if (global.tok != 7) continue;
var local = contextVariables.get (this.names.get (i).toLowerCase ());
if (local.tok != 7) continue;
global.value = local.value;
}
}, "java.util.Map,JU.Lst");
Clazz_defineMethod (c$, "addVariable", 
function (name, isParameter) {
this.variables.put (name, name);
this.names.addLast (name);
if (isParameter) this.nParameters++;
}, "~S,~B");
c$.setFunction = Clazz_defineMethod (c$, "setFunction", 
function ($function, script, ichCurrentCommand, pt, lineNumbers, lineIndices, lltoken) {
var cmdpt0 = $function.cmdpt0;
var chpt0 = $function.chpt0;
var nCommands = pt - cmdpt0;
$function.setScript (script.substring (chpt0, ichCurrentCommand));
var aatoken = $function.aatoken =  new Array (nCommands);
$function.lineIndices = JU.AU.newInt2 (nCommands);
$function.lineNumbers =  Clazz_newShortArray (nCommands, 0);
var line0 = (lineNumbers[cmdpt0] - 1);
for (var i = 0; i < nCommands; i++) {
$function.lineNumbers[i] = (lineNumbers[cmdpt0 + i] - line0);
$function.lineIndices[i] =  Clazz_newIntArray (-1, [lineIndices[cmdpt0 + i][0] - chpt0, lineIndices[cmdpt0 + i][1] - chpt0]);
aatoken[i] = lltoken.get (cmdpt0 + i);
if (aatoken[i].length > 0) {
var tokenCommand = aatoken[i][0];
if (JS.T.tokAttr (tokenCommand.tok, 102400)) tokenCommand.intValue -= (tokenCommand.intValue < 0 ? -cmdpt0 : cmdpt0);
}}
for (var i = pt; --i >= cmdpt0; ) {
lltoken.removeItemAt (i);
lineIndices[i][0] = lineIndices[i][1] = 0;
}
}, "JS.ScriptFunction,~S,~N,~N,~A,~A,JU.Lst");
Clazz_defineMethod (c$, "setScript", 
 function (s) {
this.script = s;
if (this.script != null && this.script !== "" && !this.script.endsWith ("\n")) this.script += "\n";
}, "~S");
Clazz_overrideMethod (c$, "toString", 
function () {
var s =  new JU.SB ().append ("/*\n * ").append (this.name).append ("\n */\n").append (this.getSignature ()).append (" {\n");
if (this.script != null) s.append (this.script);
s.append ("}\n");
return s.toString ();
});
Clazz_overrideMethod (c$, "getSignature", 
function () {
if (this.typeName == null) return JS.T.nameOf (this.tok);
var s =  new JU.SB ().append (this.typeName).append (" ").append (this.name).append ("(");
for (var i = 0; i < this.nParameters; i++) {
if (i > 0) s.append (", ");
s.append (this.names.get (i));
}
s.append (")");
return s.toString ();
});
Clazz_overrideMethod (c$, "geTokens", 
function () {
return this.aatoken;
});
Clazz_overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz_overrideMethod (c$, "getTok", 
function () {
return this.tok;
});
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.ScriptException"], "JS.ScriptInterruption", null, function () {
c$ = Clazz_declareType (JS, "ScriptInterruption", JS.ScriptException);
Clazz_makeConstructor (c$, 
function (eval, why, millis) {
Clazz_superConstructor (this, JS.ScriptInterruption, [eval, why, "!", millis == -2147483648 || eval.vwr.autoExit]);
if (why.equals ("delay")) eval.delayScript (millis);
}, "JS.ScriptEval,~S,~N");
});
Clazz_declarePackage ("JS");
Clazz_load (["J.api.JmolScriptManager", "JU.Lst"], "JS.ScriptManager", ["java.io.BufferedInputStream", "$.BufferedReader", "java.lang.Boolean", "$.Thread", "javajs.api.ZInputStream", "JU.AU", "$.BS", "$.PT", "$.Rdr", "$.SB", "J.api.Interface", "JS.ScriptQueueThread", "JU.Elements", "$.Logger", "JV.FileManager"], function () {
c$ = Clazz_decorateAsClass (function () {
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
Clazz_instantialize (this, arguments);
}, JS, "ScriptManager", null, J.api.JmolScriptManager);
Clazz_prepareFields (c$, function () {
this.queueThreads =  new Array (2);
this.scriptQueueRunning =  Clazz_newBooleanArray (2, false);
this.scriptQueue =  new JU.Lst ();
});
Clazz_overrideMethod (c$, "getScriptQueue", 
function () {
return this.scriptQueue;
});
Clazz_overrideMethod (c$, "isScriptQueued", 
function () {
return this.$isScriptQueued;
});
Clazz_makeConstructor (c$, 
function () {
});
Clazz_overrideMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
this.eval = this.newScriptEvaluator ();
this.eval.setCompiler ();
return this.eval;
}, "JV.Viewer");
Clazz_defineMethod (c$, "newScriptEvaluator", 
 function () {
return (J.api.Interface.getInterface ("JS.ScriptEval", this.vwr, "setOptions")).setViewer (this.vwr);
});
Clazz_overrideMethod (c$, "clear", 
function (isAll) {
if (!isAll) {
this.evalTemp = null;
return;
}this.startCommandWatcher (false);
this.interruptQueueThreads ();
}, "~B");
Clazz_overrideMethod (c$, "addScript", 
function (strScript, isQuiet) {
return this.addScr ("String", strScript, "", isQuiet);
}, "~S,~B");
Clazz_defineMethod (c$, "addScr", 
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
Clazz_overrideMethod (c$, "clearQueue", 
function () {
this.scriptQueue.clear ();
});
Clazz_overrideMethod (c$, "waitForQueue", 
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
if (Clazz_exceptionOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
});
Clazz_overrideMethod (c$, "isQueueProcessing", 
function () {
return this.queueThreads[0] != null || this.queueThreads[1] != null;
});
Clazz_defineMethod (c$, "flushQueue", 
 function (command) {
for (var i = this.scriptQueue.size (); --i >= 0; ) {
var strScript = (this.scriptQueue.get (i).get (0));
if (strScript.indexOf (command) == 0) {
this.scriptQueue.removeItemAt (i);
if (JU.Logger.debugging) JU.Logger.debug (this.scriptQueue.size () + " scripts; removed: " + strScript);
}}
}, "~S");
Clazz_defineMethod (c$, "startScriptQueue", 
 function (startedByCommandWatcher) {
var pt = (startedByCommandWatcher ? 1 : 0);
if (this.scriptQueueRunning[pt]) return;
this.scriptQueueRunning[pt] = true;
this.queueThreads[pt] =  new JS.ScriptQueueThread (this, this.vwr, startedByCommandWatcher, pt);
this.queueThreads[pt].start ();
}, "~B");
Clazz_overrideMethod (c$, "getScriptItem", 
function (watching, isByCommandWatcher) {
if (this.vwr.isSingleThreaded && this.vwr.queueOnHold) return null;
var scriptItem = this.scriptQueue.get (0);
var flag = ((scriptItem.get (4)).intValue ());
var isOK = (watching ? flag < 0 : isByCommandWatcher ? flag == 0 : flag == 1);
return (isOK ? scriptItem : null);
}, "~B,~B");
Clazz_overrideMethod (c$, "startCommandWatcher", 
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
Clazz_defineMethod (c$, "interruptQueueThreads", 
function () {
for (var i = 0; i < this.queueThreads.length; i++) {
if (this.queueThreads[i] != null) this.queueThreads[i].interrupt ();
}
});
Clazz_defineMethod (c$, "clearCommandWatcherThread", 
function () {
if (this.commandWatcherThread == null) return;
this.commandWatcherThread.interrupt ();
this.commandWatcherThread = null;
});
Clazz_overrideMethod (c$, "queueThreadFinished", 
function (pt) {
this.queueThreads[pt].interrupt ();
this.scriptQueueRunning[pt] = false;
this.queueThreads[pt] = null;
this.vwr.setSyncDriver (4);
this.vwr.queueOnHold = false;
}, "~N");
Clazz_defineMethod (c$, "runScriptNow", 
function () {
if (this.scriptQueue.size () > 0) {
var scriptItem = this.getScriptItem (true, true);
if (scriptItem != null) {
scriptItem.set (4, Integer.$valueOf (0));
this.startScriptQueue (true);
}}});
Clazz_overrideMethod (c$, "evalFile", 
function (strFilename) {
var ptWait = strFilename.indexOf (" -noqueue");
if (ptWait >= 0) {
return this.evalStringWaitStatusQueued ("String", "script " + JU.PT.esc (strFilename.substring (0, ptWait)), "", false, false);
}return this.addScript ("script " + JU.PT.esc (strFilename), false);
}, "~S");
Clazz_overrideMethod (c$, "evalStringWaitStatusQueued", 
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
Clazz_defineMethod (c$, "checkScriptExecution", 
 function (strScript, isInsert) {
var str = strScript;
if (str.indexOf ("\1##") >= 0) str = str.substring (0, str.indexOf ("\1##"));
if (this.checkResume (str)) return "script processing resumed";
if (this.checkStepping (str)) return "script processing stepped";
if (this.checkHalt (str, isInsert)) return "script execution halted";
return null;
}, "~S,~B");
Clazz_defineMethod (c$, "checkResume", 
 function (str) {
if (str.equalsIgnoreCase ("resume")) {
this.vwr.scriptStatusMsg ("", "execution resumed");
this.eval.resumePausedExecution ();
return true;
}return false;
}, "~S");
Clazz_defineMethod (c$, "checkStepping", 
 function (str) {
if (str.equalsIgnoreCase ("step")) {
this.eval.stepPausedExecution ();
return true;
}if (str.equalsIgnoreCase ("?")) {
this.vwr.scriptStatus (this.eval.getNextStatement ());
return true;
}return false;
}, "~S");
Clazz_overrideMethod (c$, "evalStringQuietSync", 
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
Clazz_overrideMethod (c$, "checkHalt", 
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
Clazz_overrideMethod (c$, "getAtomBitSetEval", 
function (eval, atomExpression) {
if (eval == null) {
eval = this.evalTemp;
if (eval == null) eval = this.evalTemp = this.newScriptEvaluator ();
}return this.vwr.slm.excludeAtoms (eval.getAtomBitSet (atomExpression), false);
}, "J.api.JmolScriptEvaluator,~O");
Clazz_overrideMethod (c$, "scriptCheckRet", 
function (strScript, returnContext) {
if (strScript.indexOf (")") == 0 || strScript.indexOf ("!") == 0) strScript = strScript.substring (1);
var sc = this.newScriptEvaluator ().checkScriptSilent (strScript);
return (returnContext || sc.errorMessage == null ? sc : sc.errorMessage);
}, "~S,~B");
Clazz_overrideMethod (c$, "openFileAsync", 
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
}}if (cmd == null && !noScript && this.vwr.scriptEditorVisible) this.vwr.showEditor ( Clazz_newArray (-1, [fileName, this.vwr.getFileAsString3 (fileName, true, null)]));
 else cmd = (cmd == null ? "script " : cmd) + JU.PT.esc (fileName);
} finally {
if (cmd != null) this.vwr.evalString (cmd + (noAutoPlay ? "#!NOAUTOPLAY" : ""));
}
}, "~S,~N");
Clazz_defineMethod (c$, "getDragDropFileTypeName", 
 function (fileName) {
var pt = fileName.indexOf ("::");
if (pt >= 0) return fileName.substring (0, pt);
if (fileName.startsWith ("=")) return "pdb";
if (fileName.endsWith (".dssr")) return "dssr";
var br = this.vwr.fm.getUnzippedReaderOrStreamFromName (fileName, null, true, false, true, true, null);
if (Clazz_instanceOf (br, javajs.api.ZInputStream)) {
var zipDirectory = this.getZipDirectoryAsString (fileName);
if (zipDirectory.indexOf ("JmolManifest") >= 0) return "Jmol";
return this.vwr.getModelAdapter ().getFileTypeName (JU.Rdr.getBR (zipDirectory));
}if (Clazz_instanceOf (br, java.io.BufferedReader) || Clazz_instanceOf (br, java.io.BufferedInputStream)) return this.vwr.getModelAdapter ().getFileTypeName (br);
if (JU.AU.isAS (br)) {
return (br)[0];
}return null;
}, "~S");
Clazz_defineMethod (c$, "getZipDirectoryAsString", 
 function (fileName) {
var t = this.vwr.fm.getBufferedInputStreamOrErrorMessageFromName (fileName, fileName, false, false, null, false, true);
return this.vwr.getJzt ().getZipDirectoryAsStringAndClose (t);
}, "~S");
c$.setStateScriptVersion = Clazz_defineMethod (c$, "setStateScriptVersion", 
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
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}vwr.setIntProperty ("bondingVersion", JS.ScriptManager.prevCovalentVersion);
vwr.setBooleanProperty ("legacyautobonding", false);
vwr.g.legacyHAddition = false;
vwr.stateScriptVersionInt = 2147483647;
}, "JV.Viewer,~S");
Clazz_overrideMethod (c$, "addHydrogensInline", 
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
Clazz_defineStatics (c$,
"prevCovalentVersion", 1);
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.ScriptMathProcessor", ["java.lang.Float", "java.util.Hashtable", "JU.A4", "$.AU", "$.BS", "$.CU", "$.DF", "$.Lst", "$.M3", "$.M4", "$.P3", "$.P4", "$.PT", "$.Quat", "$.V3", "JM.BondSet", "JS.SV", "$.T", "JU.BSUtil", "$.Escape", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.wasX = false;
this.asBitSet = false;
this.oPt = -1;
this.chk = false;
this.wasSyntaxCheck = false;
this.debugHigh = false;
this.eval = null;
this.vwr = null;
this.oStack = null;
this.xStack = null;
this.ifStack = null;
this.ifPt = -1;
this.xPt = -1;
this.parenCount = 0;
this.squareCount = 0;
this.braceCount = 0;
this.isArrayItem = false;
this.asVector = false;
this.haveSpaceBeforeSquare = false;
this.equalCount = 0;
this.ptid = 0;
this.ptx = 2147483647;
this.pto = 2147483647;
this.isSpecialAssignment = false;
this.doSelections = true;
this.assignLeft = false;
this.allowUnderflow = false;
this.isAssignment = false;
this.skipping = false;
this.lastAssignedString = null;
Clazz_instantialize (this, arguments);
}, JS, "ScriptMathProcessor");
Clazz_prepareFields (c$, function () {
this.oStack =  new Array (8);
this.xStack =  new Array (8);
this.ifStack =  Clazz_newCharArray (8, '\0');
});
Clazz_makeConstructor (c$, 
function (eval, isSpecialAssignment, isArrayItem, asVector, asBitSet, allowUnderflow, key) {
this.eval = eval;
this.isSpecialAssignment = this.assignLeft = isSpecialAssignment;
this.isAssignment = (isSpecialAssignment || key != null);
this.vwr = eval.vwr;
this.debugHigh = eval.debugHigh;
this.chk = this.wasSyntaxCheck = eval.chk;
this.isArrayItem = isArrayItem;
this.asVector = asVector || isArrayItem;
this.asBitSet = asBitSet;
this.allowUnderflow = allowUnderflow;
this.wasX = isArrayItem;
if (this.debugHigh) JU.Logger.debug ("initialize RPN");
}, "JS.ScriptExpr,~B,~B,~B,~B,~B,~S");
Clazz_defineMethod (c$, "endAssignment", 
function () {
this.assignLeft = false;
return (this.doSelections = false);
});
Clazz_defineMethod (c$, "getResult", 
function () {
var isOK = true;
while (isOK && this.oPt >= 0 && this.oStack[this.oPt] != null) isOK = this.operate ();

if (isOK) {
if (this.asVector) {
if (this.isAssignment && (this.xPt > 0 && this.oPt < 0 || this.oPt >= 0 && (this.oStack[this.oPt] != null))) this.eval.invArg ();
var result =  new JU.Lst ();
for (var i = 0; i <= this.xPt; i++) result.addLast (this.isSpecialAssignment ? this.xStack[i] : JS.SV.selectItemVar (this.xStack[i]));

if (this.lastAssignedString != null) {
result.removeItemAt (0);
result.add (0, this.lastAssignedString);
this.lastAssignedString.intValue = this.xStack[0].intValue;
}return JS.SV.newV (135198, result);
}if (this.xPt == 0) {
var x = this.xStack[0];
if (this.chk) {
if (this.asBitSet) return JS.SV.newV (10,  new JU.BS ());
return x;
}if (x.tok == 10 || x.tok == 7 || x.tok == 15 || x.tok == 4 || x.tok == 11 || x.tok == 12) x = JS.SV.selectItemVar (x);
if (this.asBitSet && x.tok == 7) x = JS.SV.newV (10, JS.SV.unEscapeBitSetArray (x.value, false));
return x;
}}if (!this.allowUnderflow && (this.xPt >= 0 || this.oPt >= 0)) this.eval.invArg ();
return null;
});
Clazz_defineMethod (c$, "putX", 
 function (x) {
if (this.skipping) return;
if (this.wasX) {
try {
this.addOp (JS.T.tokenComma);
} catch (e) {
if (Clazz_exceptionOf (e, JS.ScriptException)) {
} else {
throw e;
}
}
}if (++this.xPt == this.xStack.length) this.xStack = JU.AU.doubleLength (this.xStack);
if (this.xPt < 0) System.out.println ("testing scriptemaafe");
this.xStack[this.xPt] = x;
this.ptx = ++this.ptid;
if (this.debugHigh) {
JU.Logger.debug ("\nputx= " + x + " ptx=" + this.ptid);
}}, "JS.SV");
Clazz_defineMethod (c$, "putOp", 
 function (op) {
if (++this.oPt >= this.oStack.length) this.oStack = JU.AU.doubleLength (this.oStack);
this.oStack[this.oPt] = op;
this.pto = ++this.ptid;
if (this.debugHigh) {
JU.Logger.debug ("\nputop=" + op + " pto=" + this.ptid);
}}, "JS.T");
Clazz_defineMethod (c$, "putIf", 
 function (c) {
if (++this.ifPt >= this.ifStack.length) this.ifStack = JU.AU.doubleLength (this.ifStack);
this.ifStack[this.ifPt] = c;
}, "~S");
Clazz_defineMethod (c$, "addXCopy", 
function (x) {
switch (x.tok) {
case 2:
x = JS.SV.newI (x.intValue);
break;
case 3:
x = JS.SV.newV (3, x.value);
break;
}
return this.addX (x);
}, "JS.SV");
Clazz_defineMethod (c$, "addX", 
function (x) {
this.putX (x);
return this.wasX = true;
}, "JS.SV");
Clazz_defineMethod (c$, "addXObj", 
function (x) {
var v = JS.SV.getVariable (x);
if (v == null) return false;
this.putX (v);
return this.wasX = true;
}, "~O");
Clazz_defineMethod (c$, "addXStr", 
function (x) {
this.putX (JS.SV.newS (x));
return this.wasX = true;
}, "~S");
Clazz_defineMethod (c$, "addXBool", 
function (x) {
this.putX (JS.SV.getBoolean (x));
return this.wasX = true;
}, "~B");
Clazz_defineMethod (c$, "addXInt", 
function (x) {
this.putX (JS.SV.newI (x));
return this.wasX = true;
}, "~N");
Clazz_defineMethod (c$, "addXList", 
function (x) {
this.putX (JS.SV.getVariableList (x));
return this.wasX = true;
}, "JU.Lst");
Clazz_defineMethod (c$, "addXMap", 
function (x) {
this.putX (JS.SV.getVariableMap (x));
return this.wasX = true;
}, "java.util.Map");
Clazz_defineMethod (c$, "addXM3", 
function (x) {
this.putX (JS.SV.newV (11, x));
return this.wasX = true;
}, "JU.M3");
Clazz_defineMethod (c$, "addXM4", 
function (x) {
this.putX (JS.SV.newV (12, x));
return this.wasX = true;
}, "JU.M4");
Clazz_defineMethod (c$, "addXFloat", 
function (x) {
if (Float.isNaN (x)) return this.addXStr ("NaN");
this.putX (JS.SV.newF (x));
return this.wasX = true;
}, "~N");
Clazz_defineMethod (c$, "addXBs", 
function (bs) {
this.putX (JS.SV.newV (10, bs));
return this.wasX = true;
}, "JU.BS");
Clazz_defineMethod (c$, "addXPt", 
function (pt) {
this.putX (JS.SV.newV (8, pt));
return this.wasX = true;
}, "JU.P3");
Clazz_defineMethod (c$, "addXPt4", 
function (pt) {
this.putX (JS.SV.newV (9, pt));
return this.wasX = true;
}, "JU.P4");
Clazz_defineMethod (c$, "addXNum", 
function (x) {
var v;
if (Clazz_instanceOf (x, JS.SV)) {
v = x;
} else {
switch (x.tok) {
case 3:
if (this.wasX) {
var f = (x.value).floatValue ();
if (f < 0 || f == 0 && 1 / f == -Infinity) {
this.addOp (JS.T.tokenMinus);
v = JS.SV.newF (-f);
break;
}}v = JS.SV.newV (3, x.value);
break;
default:
var iv = x.intValue;
if (this.wasX && iv < 0) {
this.addOp (JS.T.tokenMinus);
iv = -iv;
}v = JS.SV.newI (iv);
break;
}
}this.putX (v);
return this.wasX = true;
}, "JS.T");
Clazz_defineMethod (c$, "addXAV", 
function (x) {
this.putX (JS.SV.getVariableAV (x));
return this.wasX = true;
}, "~A");
Clazz_defineMethod (c$, "addXAD", 
function (x) {
this.putX (JS.SV.getVariableAD (x));
return this.wasX = true;
}, "~A");
Clazz_defineMethod (c$, "addXAS", 
function (x) {
this.putX (JS.SV.getVariableAS (x));
return this.wasX = true;
}, "~A");
Clazz_defineMethod (c$, "addXAI", 
function (x) {
this.putX (JS.SV.getVariableAI (x));
return this.wasX = true;
}, "~A");
Clazz_defineMethod (c$, "addXAII", 
function (x) {
this.putX (JS.SV.getVariableAII (x));
return this.wasX = true;
}, "~A");
Clazz_defineMethod (c$, "addXAF", 
function (x) {
this.putX (JS.SV.getVariableAF (x));
return this.wasX = true;
}, "~A");
Clazz_defineMethod (c$, "addXAFF", 
function (x) {
this.putX (JS.SV.getVariableAFF (x));
return this.wasX = true;
}, "~A");
c$.isOpFunc = Clazz_defineMethod (c$, "isOpFunc", 
 function (op) {
return (op != null && (JS.T.tokAttr (op.tok, 134217728) && op !== JS.T.tokenArraySquare || op.tok == 268435665 && JS.T.tokAttr (op.intValue, 134217728)));
}, "JS.T");
Clazz_defineMethod (c$, "addOp", 
function (op) {
return this.addOpAllowMath (op, true, 0);
}, "JS.T");
Clazz_defineMethod (c$, "addOpAllowMath", 
function (op, allowMathFunc, tokNext) {
if (this.debugHigh) {
this.dumpStacks ("adding " + op + " wasx=" + this.wasX);
}var tok0 = (this.oPt >= 0 && this.oStack[this.oPt] != null ? this.oStack[this.oPt].tok : 0);
this.skipping = (this.ifPt >= 0 && (this.ifStack[this.ifPt] == 'F' || this.ifStack[this.ifPt] == 'X'));
if (this.skipping) return this.checkSkip (op, tok0);
var tok;
var isDotSelector = (op.tok == 268435665);
if (isDotSelector && !this.wasX) return false;
var isMathFunc = (allowMathFunc && JS.ScriptMathProcessor.isOpFunc (op));
if (this.oPt >= 1 && op.tok != 268435472 && tok0 == 134217750) tok0 = this.oStack[--this.oPt].tok;
var newOp = null;
var isLeftOp = false;
switch (op.tok) {
case 1073742195:
this.haveSpaceBeforeSquare = true;
return true;
case 268435504:
if (!this.wasX) return false;
break;
case 268435649:
case 268435650:
if (this.wasX && op.intValue == -1 && this.addOp (JS.T.tokenComma)) return this.addOp (op);
break;
case 268435521:
break;
case 268435473:
if (!this.wasX && this.oPt >= 1 && tok0 == 268435472 && !JS.ScriptMathProcessor.isOpFunc (this.oStack[this.oPt - 1])) return false;
break;
case 268435616:
if (!this.wasX) op = JS.SV.newV (268435648, "-");
break;
case 32:
case 64:
case 96:
case 128:
case 160:
case 192:
case 480:
tok = (this.oPt < 0 ? 0 : tok0);
if (!this.wasX || !(tok == 268435665 || tok == 1677721602 || tok == 1140850689)) return false;
this.oStack[this.oPt].intValue |= op.tok;
return true;
case 268435520:
isLeftOp = true;
if (!this.wasX || this.haveSpaceBeforeSquare) {
this.squareCount++;
op = newOp = JS.T.tokenArraySquare;
this.haveSpaceBeforeSquare = false;
}break;
case 268435568:
case 268435472:
isLeftOp = true;
default:
if (isMathFunc) {
var isArgument = (this.oPt >= 1 && tok0 == 268435472);
if (isDotSelector) {
if (tokNext == 268435472) {
if (this.xStack[this.xPt].tok == 6) return false;
}} else if (this.wasX && !isArgument) {
return false;
}newOp = op;
isLeftOp = true;
break;
}if (this.wasX == isLeftOp && tok0 != 268435665) {
if (!this.wasX || !allowMathFunc) return false;
if (this.addOp (JS.T.tokenComma)) return this.addOp (op);
}break;
}
while (this.oPt >= 0 && tok0 != 268435490 && (op.tok != 268435649 && op.tok != 268435650 || this.wasX) && (!isLeftOp || tok0 == 268435665 && (op.tok == 268435665 || op.tok == 268435520)) && JS.T.getPrecedence (tok0) >= JS.T.getPrecedence (op.tok) && (tok0 != 268435648 || op.tok != 268435648)) {
if (op.tok == 268435473 && tok0 == 268435472) {
if (this.xPt >= 0) this.xStack[this.xPt] = JS.SV.selectItemVar (this.xStack[this.xPt]);
this.wasX = true;
break;
}if (op.tok == 268435521 && tok0 == 1275068418) {
break;
}if (op.tok == 268435521 && tok0 == 268435520) {
if (this.isArrayItem && this.squareCount == 1 && this.equalCount == 0) {
this.wasX = false;
this.addX (JS.SV.newT (JS.T.tokenArrayOpen));
break;
}if (!this.doSelection ()) return false;
this.wasX = true;
break;
}if (!this.operate ()) return false;
tok0 = (this.oPt >= 0 && this.oStack[this.oPt] != null ? this.oStack[this.oPt].tok : 0);
}
if (newOp != null) {
this.wasX = false;
this.addX (JS.SV.newV (268435860, newOp));
}switch (op.tok) {
case 268435472:
this.parenCount++;
this.wasX = false;
break;
case 805306401:
var isFirst = this.getX ().asBoolean ();
if (tok0 == 268435490) this.ifPt--;
 else this.putOp (JS.T.tokenColon);
this.putIf (isFirst ? 'T' : 'F');
this.skipping = !isFirst;
this.wasX = false;
return true;
case 268435490:
if (tok0 != 268435490) return false;
if (this.ifPt < 0) return false;
this.ifStack[this.ifPt] = 'X';
this.wasX = false;
this.skipping = true;
return true;
case 268435473:
this.wasX = true;
if (this.parenCount-- <= 0) return false;
if (tok0 == 268435490) {
this.ifPt--;
this.oPt--;
}this.oPt--;
if (this.oPt < 0) return true;
if (JS.ScriptMathProcessor.isOpFunc (this.oStack[this.oPt])) {
this.wasX = false;
if (!this.evaluateFunction (0)) return false;
}this.skipping = (this.ifPt >= 0 && this.ifStack[this.ifPt] == 'X');
return true;
case 268435504:
this.wasX = false;
return true;
case 268435520:
this.squareCount++;
this.wasX = false;
break;
case 268435521:
this.wasX = true;
if (this.squareCount-- <= 0 || this.oPt < 0 || !this.doSelections) return !this.doSelections;
if (this.oStack[this.oPt].tok == 1275068418) return this.evaluateFunction (268435520);
this.oPt--;
return true;
case 268435665:
this.wasX = (!allowMathFunc || !JS.T.tokAttr (op.intValue, 134217728));
break;
case 1073742332:
this.braceCount++;
this.wasX = false;
break;
case 1073742338:
if (this.braceCount-- <= 0) return false;
this.wasX = false;
break;
case 268435552:
case 268435536:
if (!this.wasSyntaxCheck && this.xPt < 0) return false;
if (!this.wasSyntaxCheck && this.xStack[this.xPt].tok != 10 && this.xStack[this.xPt].tok != 7) {
var tf = this.getX ().asBoolean ();
this.addX (JS.SV.getBoolean (tf));
if (tf == (op.tok == 268435536)) {
this.chk = true;
op = (op.tok == 268435536 ? JS.T.tokenOrTRUE : JS.T.tokenAndFALSE);
}}this.wasX = false;
break;
case 268435650:
case 268435649:
break;
case 268435860:
if (this.squareCount == 0) {
this.doSelections = true;
this.assignLeft = false;
this.equalCount++;
}this.wasX = false;
break;
default:
this.wasX = false;
}
this.putOp (op);
switch (op.tok) {
case 268435665:
return (((op.intValue & -481) == 134320141 && op.intValue != 134320141) ? this.evaluateFunction (0) : true);
case 268435650:
case 268435649:
return (this.wasX ? this.operate () : true);
}
return true;
}, "JS.T,~B,~N");
Clazz_defineMethod (c$, "checkSkip", 
 function (op, tok0) {
switch (op.tok) {
case 268435472:
this.putOp (op);
break;
case 268435490:
if (tok0 != 268435490 || this.ifStack[this.ifPt] == 'X') break;
this.ifStack[this.ifPt] = 'T';
this.wasX = false;
this.skipping = false;
break;
case 268435473:
if (tok0 == 268435472) {
this.oPt--;
break;
}if (tok0 != 268435490) {
this.putOp (op);
break;
}this.wasX = true;
this.ifPt--;
this.oPt -= 2;
this.skipping = false;
break;
}
return true;
}, "JS.T,~N");
Clazz_defineMethod (c$, "doSelection", 
 function () {
if (this.xPt < 0 || this.xPt == 0 && !this.isArrayItem) {
return false;
}var var1 = this.xStack[this.xPt--];
var $var = this.xStack[this.xPt];
if (($var.tok == 7 || $var.tok == 15) && $var.intValue != 2147483647) if (var1.tok == 4 || this.assignLeft && this.squareCount == 1) {
this.xStack[this.xPt] = $var = JS.SV.selectItemTok ($var, -2147483648);
}if (this.assignLeft && $var.tok != 4) this.lastAssignedString = null;
switch ($var.tok) {
case 6:
case 14:
if (this.doSelections) {
var v = $var.mapValue (JS.SV.sValue (var1));
this.xStack[this.xPt] = (v == null ? JS.SV.newS ("") : v);
} else {
this.xPt++;
this.putOp (null);
}return true;
default:
$var = JS.SV.newS (JS.SV.sValue ($var));
case 10:
case 15:
case 7:
case 4:
case 11:
case 12:
if (this.doSelections || $var.tok == 7 && $var.intValue == 2147483647) {
this.xStack[this.xPt] = JS.SV.selectItemTok ($var, var1.asInt ());
if (this.assignLeft && $var.tok == 4 && this.squareCount == 1) this.lastAssignedString = $var;
} else {
this.xPt++;
}if (!this.doSelections) this.putOp (null);
break;
}
return true;
});
Clazz_defineMethod (c$, "dumpStacks", 
function (message) {
JU.Logger.debug ("\n\n------------------\nRPN stacks: " + message + "\n");
for (var i = 0; i <= this.xPt; i++) JU.Logger.debug ("x[" + i + "]: " + this.xStack[i]);

JU.Logger.debug ("\n");
for (var i = 0; i <= this.oPt; i++) JU.Logger.debug ("o[" + i + "]: " + this.oStack[i] + " prec=" + (this.oStack[i] == null ? "--" : "" + JS.T.getPrecedence (this.oStack[i].tok)));

JU.Logger.debug (" ifStack = " + ( String.instantialize (this.ifStack)).substring (0, this.ifPt + 1));
}, "~S");
Clazz_defineMethod (c$, "getX", 
function () {
if (this.xPt < 0) this.eval.error (13);
var v = JS.SV.selectItemVar (this.xStack[this.xPt]);
this.xStack[this.xPt--] = null;
this.wasX = false;
return v;
});
Clazz_defineMethod (c$, "getXTok", 
function () {
return (this.xPt < 0 ? 0 : this.xStack[this.xPt].tok);
});
Clazz_defineMethod (c$, "evaluateFunction", 
 function (tok) {
var op = this.oStack[this.oPt--];
if (tok == 0) tok = (op.tok == 268435665 ? op.intValue & -481 : op.tok);
var nParamMax = JS.T.getMaxMathParams (tok);
var nParam = 0;
var pt = this.xPt;
while (pt >= 0 && this.xStack[pt--].value !== op) nParam++;

if (nParamMax > 0 && nParam > nParamMax) return false;
var args =  new Array (nParam);
for (var i = nParam; --i >= 0; ) args[i] = this.getX ();

this.xPt--;
if (!this.chk) return this.eval.getMathExt ().evaluate (this, op, args, tok);
if (op.tok == 268435665) this.xPt--;
if (this.xPt < 0) this.xPt = 0;
switch (tok) {
case 134217736:
case 1275203608:
case 134218756:
case 134218757:
case 134217759:
case 134353926:
return this.addXBs ( new JU.BS ());
}
return this.addXBool (true);
}, "~N");
Clazz_defineMethod (c$, "operate", 
 function () {
var op = this.oStack[this.oPt--];
var pt;
var m;
var m4;
var s;
var x1;
if (this.debugHigh) {
this.dumpStacks ("operate: " + op);
}if (op.tok == 268435860 && (this.isArrayItem && this.squareCount == 0 && this.equalCount == 1 && this.oPt < 0 || this.oPt >= 0 && this.oStack[this.oPt] == null)) return true;
var x2;
switch (op.tok) {
case 268435649:
case 268435650:
if (this.xPt >= 0 && this.xStack[this.xPt].canIncrement ()) {
x2 = this.xStack[this.xPt--];
this.wasX = false;
break;
}default:
x2 = this.getX ();
break;
}
if (x2 === JS.T.tokenArrayOpen) return false;
switch (op.tok) {
case 268435649:
case 268435650:
x1 = x2;
if (!this.chk) {
if (this.ptx < this.pto) {
x1 = JS.SV.newS ("").setv (x2);
}if (!x2.increment (op.tok == 268435650 ? 1 : -1)) return false;
if (this.ptx > this.pto) {
x1 = JS.SV.newS ("").setv (x2);
}}this.wasX = false;
this.putX (x1);
this.wasX = true;
return true;
case 268435648:
switch (x2.tok) {
case 2:
return this.addXInt (-x2.asInt ());
case 8:
pt = JU.P3.newP (x2.value);
pt.scale (-1.0);
return this.addXPt (pt);
case 9:
var pt4 = JU.P4.newPt (x2.value);
pt4.scale4 (-1.0);
return this.addXPt4 (pt4);
case 11:
m = JU.M3.newM3 (x2.value);
m.invert ();
return this.addXM3 (m);
case 12:
m4 = JU.M4.newM4 (x2.value);
m4.invert ();
return this.addXM4 (m4);
case 10:
return this.addXBs (JU.BSUtil.copyInvert (x2.value, (Clazz_instanceOf (x2.value, JM.BondSet) ? this.vwr.ms.bondCount : this.vwr.ms.ac)));
}
return this.addXFloat (-x2.asFloat ());
case 268435568:
if (this.chk) return this.addXBool (true);
switch (x2.tok) {
case 9:
return this.addXPt4 ((JU.Quat.newP4 (x2.value)).inv ().toPoint4f ());
case 11:
m = JU.M3.newM3 (x2.value);
m.invert ();
return this.addXM3 (m);
case 12:
return this.addXM4 (JU.M4.newM4 (x2.value).invert ());
case 10:
return this.addXBs (JU.BSUtil.copyInvert (x2.value, (Clazz_instanceOf (x2.value, JM.BondSet) ? this.vwr.ms.bondCount : this.vwr.ms.ac)));
default:
return this.addXBool (!x2.asBoolean ());
}
case 268435665:
var iv = (op.intValue == 805306401 ? 805306401 : op.intValue & -481);
if (this.chk) return this.addXObj (JS.SV.newS (""));
if (this.vwr.allowArrayDotNotation) switch (x2.tok) {
case 6:
case 14:
switch (iv) {
case 1275068418:
case 1140850706:
case 1140850694:
case 1140850696:
break;
default:
var ret = x2.mapValue (op.value);
return this.addXObj (ret == null ? JS.SV.newS ("") : ret);
}
break;
}
switch (iv) {
case 1275068418:
return this.addX (x2.toArray ());
case 805306401:
case 1073741824:
return (x2.tok == 10 && (this.chk ? this.addXStr ("") : this.getAllProperties (x2, op.value)));
case 1140850696:
return this.addXStr (JS.ScriptMathProcessor.typeOf (x2));
case 1140850706:
var keys = x2.getKeys ((op.intValue & 480) == 480);
return (keys == null ? this.addXStr ("") : this.addXAS (keys));
case 1140850691:
case 1275068425:
case 1140850694:
if (iv == 1140850691 && Clazz_instanceOf (x2.value, JM.BondSet)) break;
return this.addXInt (JS.SV.sizeOf (x2));
case 1140850692:
switch (x2.tok) {
case 11:
case 12:
s = JS.SV.sValue (x2);
s = JU.PT.rep (s.substring (1, s.length - 1), "],[", "]\n[");
break;
case 4:
s = x2.value;
break;
default:
s = JS.SV.sValue (x2);
}
s = JU.PT.rep (s, "\n\r", "\n").$replace ('\r', '\n');
return this.addXAS (JU.PT.split (s, "\n"));
case 1765808134:
switch (x2.tok) {
case 4:
case 7:
return this.addXPt (JU.CU.colorPtFromString (JS.SV.sValue (x2)));
case 2:
case 3:
return this.addXPt (this.vwr.getColorPointForPropertyValue (JS.SV.fValue (x2)));
case 8:
return this.addXStr (JU.Escape.escapeColor (JU.CU.colorPtToFFRGB (x2.value)));
default:
}
break;
case 1678381065:
return (this.chk ? this.addXStr ("x") : this.getBoundBox (x2));
}
if (this.chk) return this.addXStr (JS.SV.sValue (x2));
if (x2.tok == 4) {
var v = JS.SV.unescapePointOrBitsetAsVariable (JS.SV.sValue (x2));
if (!(Clazz_instanceOf (v, JS.SV))) return false;
x2 = v;
}if (op.tok == x2.tok) x2 = this.getX ();
return this.getPointOrBitsetOperation (op, x2);
}
x1 = this.getX ();
if (this.chk) {
if (op === JS.T.tokenAndFALSE || op === JS.T.tokenOrTRUE) this.chk = false;
return this.addX (JS.SV.newT (x1));
}return this.binaryOp (op, x1, x2);
});
Clazz_defineMethod (c$, "binaryOp", 
function (op, x1, x2) {
var pt;
var pt4;
var m;
var s;
var f;
switch (op.tok) {
case 268435584:
case 268435552:
switch (x1.tok) {
case 10:
var bs = x1.value;
switch (x2.tok) {
case 2:
var x = x2.asInt ();
return (this.addXBool (x < 0 ? false : bs.get (x)));
case 10:
bs = JU.BSUtil.copy (bs);
bs.and (x2.value);
return this.addXBs (bs);
}
break;
}
return this.addXBool (x1.asBoolean () && x2.asBoolean ());
case 268435536:
switch (x1.tok) {
case 10:
var bs = JU.BSUtil.copy (x1.value);
switch (x2.tok) {
case 10:
bs.or (x2.value);
return this.addXBs (bs);
case 2:
var x = x2.asInt ();
if (x < 0) break;
bs.set (x);
return this.addXBs (bs);
case 7:
var sv = x2.value;
for (var i = sv.size (); --i >= 0; ) {
var b = sv.get (i).asInt ();
if (b >= 0) bs.set (b);
}
return this.addXBs (bs);
}
break;
case 7:
return this.addX (JS.SV.concatList (x1, x2, false));
}
return this.addXBool (x1.asBoolean () || x2.asBoolean ());
case 268435537:
if (x1.tok == 10 && x2.tok == 10) {
var bs = JU.BSUtil.copy (x1.value);
bs.xor (x2.value);
return this.addXBs (bs);
}var a = x1.asBoolean ();
var b = x2.asBoolean ();
return this.addXBool (a && !b || b && !a);
case 268435538:
if (x1.tok != 10 || x2.tok != 10) return false;
return this.addXBs (JU.BSUtil.toggleInPlace (JU.BSUtil.copy (x1.value), x2.value));
case 268435858:
return this.addXBool (x1.asFloat () <= x2.asFloat ());
case 268435857:
return this.addXBool (x1.asFloat () >= x2.asFloat ());
case 268435856:
return this.addXBool (x1.asFloat () > x2.asFloat ());
case 268435859:
return this.addXBool (x1.asFloat () < x2.asFloat ());
case 268435860:
return this.addXBool (JS.SV.areEqual (x1, x2));
case 268435861:
return this.addXBool (!JS.SV.areEqual (x1, x2));
case 268435862:
return this.addXBool (JS.SV.isLike (x1, x2));
case 268435617:
switch (x1.tok) {
case 6:
var ht =  new java.util.Hashtable (x1.value);
var map = x2.getMap ();
if (map != null) ht.putAll (map);
return this.addX (JS.SV.getVariableMap (ht));
case 2:
if (!this.isDecimal (x2)) return this.addXInt (x1.intValue + x2.asInt ());
break;
case 4:
return this.addX (JS.SV.newS (JS.SV.sValue (x1) + JS.SV.sValue (x2)));
case 8:
pt = JU.P3.newP (x1.value);
switch (x2.tok) {
case 8:
pt.add (x2.value);
return this.addXPt (pt);
case 9:
pt4 = x2.value;
pt.add (JU.P3.new3 (pt4.x, pt4.y, pt4.z));
return this.addXPt (pt);
default:
f = x2.asFloat ();
return this.addXPt (JU.P3.new3 (pt.x + f, pt.y + f, pt.z + f));
}
case 11:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () + x2.asFloat ());
case 11:
m = JU.M3.newM3 (x1.value);
m.add (x2.value);
return this.addXM3 (m);
case 8:
return this.addXM4 (JS.ScriptMathProcessor.getMatrix4f (x1.value, x2.value));
}
case 9:
var q1 = JU.Quat.newP4 (x1.value);
switch (x2.tok) {
default:
return this.addXPt4 (q1.add (x2.asFloat ()).toPoint4f ());
case 9:
return this.addXPt4 (q1.mulQ (JU.Quat.newP4 (x2.value)).toPoint4f ());
}
case 7:
return this.addX (JS.SV.concatList (x1, x2, true));
}
return this.addXFloat (x1.asFloat () + x2.asFloat ());
case 268435616:
switch (x1.tok) {
case 2:
if (!this.isDecimal (x2)) return this.addXInt (x1.intValue - x2.asInt ());
break;
case 4:
if (!this.isDecimal (x2) && !this.isDecimal (x1)) return this.addXInt (x1.asInt () - x2.asInt ());
break;
case 6:
var ht =  new java.util.Hashtable (x1.value);
ht.remove (JS.SV.sValue (x2));
return this.addX (JS.SV.getVariableMap (ht));
case 11:
if (x2.tok != 11) break;
m = JU.M3.newM3 (x1.value);
m.sub (x2.value);
return this.addXM3 (m);
case 12:
if (x2.tok != 12) break;
var m4 = JU.M4.newM4 (x1.value);
m4.sub (x2.value);
return this.addXM4 (m4);
case 8:
pt = JU.P3.newP (x1.value);
switch (x2.tok) {
case 8:
pt.sub (x2.value);
return this.addXPt (pt);
case 9:
pt4 = x2.value;
pt.sub (JU.P3.new3 (pt4.x, pt4.y, pt4.z));
return this.addXPt (pt);
}
f = x2.asFloat ();
return this.addXPt (JU.P3.new3 (pt.x - f, pt.y - f, pt.z - f));
case 9:
var q1 = JU.Quat.newP4 (x1.value);
if (x2.tok == 9) {
var q2 = JU.Quat.newP4 (x2.value);
return this.addXPt4 (q2.mulQ (q1.inv ()).toPoint4f ());
}return this.addXPt4 (q1.add (-x2.asFloat ()).toPoint4f ());
}
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 1275068930:
if (x1.tok == 8 && x2.tok == 8) {
pt = x1.value;
var pt2 = x2.value;
return this.addXPt (JU.P3.new3 (pt.x * pt2.x, pt.y * pt2.y, pt.z * pt2.z));
}case 268435633:
switch (x1.tok) {
case 2:
return (this.isDecimal (x2) ? this.addXFloat (x1.intValue * x2.asFloat ()) : this.addXInt (x1.intValue * x2.asInt ()));
case 4:
return (this.isDecimal (x2) || this.isDecimal (x1) ? this.addXFloat (x1.asFloat () * x2.asFloat ()) : this.addXInt (x1.asInt () * x2.asInt ()));
}
pt = (x1.tok == 11 || x1.tok == 12 ? this.ptValue (x2, null) : x2.tok == 11 ? this.ptValue (x1, null) : null);
pt4 = (x1.tok == 12 ? this.planeValue (x2) : x2.tok == 12 ? this.planeValue (x1) : null);
switch (x2.tok) {
case 11:
if (pt != null) {
var m3b = JU.M3.newM3 (x2.value);
m3b.transpose ();
var pt1 = JU.P3.newP (pt);
m3b.rotate (pt1);
return (x1.tok == 7 ? this.addX (JS.SV.getVariableAF ( Clazz_newFloatArray (-1, [pt1.x, pt1.y, pt1.z]))) : this.addXPt (pt1));
}if (pt4 != null) return this.addXPt4 ((JU.Quat.newP4 (pt4).mulQ (JU.Quat.newM (x2.value))).toPoint4f ());
break;
case 12:
if (pt4 != null) {
var m4b = JU.M4.newM4 (x2.value);
m4b.transpose ();
var pt41 = JU.P4.newPt (pt4);
m4b.transform (pt41);
return (x1.tok == 7 ? this.addX (JS.SV.getVariableAF ( Clazz_newFloatArray (-1, [pt41.x, pt41.y, pt41.z, pt41.w]))) : this.addXPt4 (pt41));
}break;
}
switch (x1.tok) {
case 11:
var m3 = x1.value;
if (pt != null) {
var pt1 = JU.P3.newP (pt);
m3.rotate (pt1);
return (x2.tok == 7 ? this.addX (JS.SV.getVariableAF ( Clazz_newFloatArray (-1, [pt1.x, pt1.y, pt1.z]))) : this.addXPt (pt1));
}switch (x2.tok) {
case 11:
m = JU.M3.newM3 (x2.value);
m.mul2 (m3, m);
return this.addXM3 (m);
case 9:
return this.addXM3 (JU.Quat.newM (m3).mulQ (JU.Quat.newP4 (x2.value)).getMatrix ());
}
f = x2.asFloat ();
var aa =  new JU.A4 ();
aa.setM (m3);
aa.angle *= f;
return this.addXM3 ( new JU.M3 ().setAA (aa));
case 12:
var m4 = x1.value;
if (pt != null) {
var pt1 = JU.P3.newP (pt);
m4.rotTrans (pt1);
return (x2.tok == 7 ? this.addX (JS.SV.getVariableAF ( Clazz_newFloatArray (-1, [pt1.x, pt1.y, pt1.z]))) : this.addXPt (pt1));
}if (pt4 != null) {
m4.transform (pt4);
return (x2.tok == 7 ? this.addX (JS.SV.getVariableAF ( Clazz_newFloatArray (-1, [pt4.x, pt4.y, pt4.z, pt4.w]))) : this.addXPt4 (pt4));
}if (x2.tok == 12) {
var m4b = JU.M4.newM4 (x2.value);
m4b.mul2 (m4, m4b);
return this.addXM4 (m4b);
}return this.addXStr ("NaN");
case 8:
pt = JU.P3.newP (x1.value);
switch (x2.tok) {
case 8:
var pt2 = (x2.value);
return this.addXFloat (pt.x * pt2.x + pt.y * pt2.y + pt.z * pt2.z);
}
f = x2.asFloat ();
return this.addXPt (JU.P3.new3 (pt.x * f, pt.y * f, pt.z * f));
case 9:
if (x2.tok == 9) return this.addXPt4 (JU.Quat.newP4 (x1.value).mulQ (JU.Quat.newP4 (x2.value)).toPoint4f ());
return this.addXPt4 (JU.Quat.newP4 (x1.value).mul (x2.asFloat ()).toPoint4f ());
}
return this.addXFloat (x1.asFloat () * x2.asFloat ());
case 268435632:
var f2;
switch (x1.tok) {
case 2:
if (x2.tok == 2 && x2.intValue != 0) return this.addXInt (Clazz_doubleToInt (x1.intValue / x2.intValue));
var n = (this.isDecimal (x2) ? 0 : x2.asInt ());
if (n != 0) return this.addXInt (Clazz_doubleToInt (x1.intValue / n));
break;
case 4:
var i2;
if (!this.isDecimal (x1) && !this.isDecimal (x2) && (i2 = x2.asInt ()) != 0) return this.addXInt (Clazz_doubleToInt (x1.asInt () / i2));
break;
case 8:
pt = JU.P3.newP (x1.value);
return this.addXPt ((f2 = x2.asFloat ()) == 0 ? JU.P3.new3 (NaN, NaN, NaN) : JU.P3.new3 (pt.x / f2, pt.y / f2, pt.z / f2));
case 9:
return this.addXPt4 (x2.tok == 9 ? JU.Quat.newP4 (x1.value).div (JU.Quat.newP4 (x2.value)).toPoint4f () : (f2 = x2.asFloat ()) == 0 ? JU.P4.new4 (NaN, NaN, NaN, NaN) : JU.Quat.newP4 (x1.value).mul (1 / f2).toPoint4f ());
}
return this.addXFloat (x1.asFloat () / x2.asFloat ());
case 268435635:
f = x2.asFloat ();
if (x1.tok == 9) {
return (f == 0 ? this.addXPt4 (JU.P4.new4 (NaN, NaN, NaN, NaN)) : x2.tok == 9 ? this.addXPt4 (JU.Quat.newP4 (x1.value).divLeft (JU.Quat.newP4 (x2.value)).toPoint4f ()) : this.addXPt4 (JU.Quat.newP4 (x1.value).mul (1 / f).toPoint4f ()));
}return this.addXInt (f == 0 ? 0 : Clazz_doubleToInt (Math.floor (x1.asFloat () / x2.asFloat ())));
case 268435651:
f = Math.pow (x1.asFloat (), x2.asFloat ());
return (x1.tok == 2 && x2.tok == 2 ? this.addXInt (Clazz_floatToInt (f)) : this.addXFloat (f));
case 268435634:
s = null;
var n = x2.asInt ();
switch (x1.tok) {
case 1073742335:
case 1073742334:
case 2:
default:
break;
case 3:
f = x1.asFloat ();
if (n == 0) return this.addXInt (Math.round (f));
s = JU.DF.formatDecimal (f, n);
return this.addXStr (s);
case 4:
s = x1.value;
return this.addXStr (n == 0 ? JU.PT.trim (s, "\n\t ") : n == 9999 ? s.toUpperCase () : n == -9999 ? s.toLowerCase () : n > 0 ? JU.PT.formatS (s, n, n, false, false) : JU.PT.formatS (s, n, n - 1, true, false));
case 7:
var list = JS.SV.strListValue (x1);
for (var i = 0; i < list.length; i++) {
if (n == 0) list[i] = list[i].trim ();
 else if (n > 0) list[i] = JU.PT.formatS (list[i], n, n, true, false);
 else list[i] = JU.PT.formatS (s, -n, n, false, false);
}
return this.addXAS (list);
case 8:
pt = JU.P3.newP (x1.value);
this.vwr.toUnitCell (pt, JU.P3.new3 (n, n, n));
return this.addXPt (pt);
case 9:
pt4 = x1.value;
if (x2.tok == 8) return this.addXPt ((JU.Quat.newP4 (pt4)).transform2 (x2.value,  new JU.P3 ()));
if (x2.tok == 9) {
var v4 = JU.P4.newPt (x2.value);
(JU.Quat.newP4 (pt4)).getThetaDirected (v4);
return this.addXPt4 (v4);
}if (n == 0 && x2.tok == 4) {
s = " " + x2.value.toString ().trim ().toLowerCase () + ":";
var i = " w:0 x:1 y:2 z:3 normal:4 eulerzxz:5 eulerzyz:6 vector:-1 theta:-2 axisx:-3 axisy:-4 axisz:-5 axisangle:-6 matrix:-9".indexOf (s);
n = (i >= 0 ? JU.PT.parseInt (" w:0 x:1 y:2 z:3 normal:4 eulerzxz:5 eulerzyz:6 vector:-1 theta:-2 axisx:-3 axisy:-4 axisz:-5 axisangle:-6 matrix:-9".substring (i + s.length)) : -99);
}switch (n) {
case 0:
return this.addXFloat (pt4.w);
case 1:
return this.addXFloat (pt4.x);
case 2:
return this.addXFloat (pt4.y);
case 3:
return this.addXFloat (pt4.z);
}
var q = JU.Quat.newP4 (pt4);
switch (n) {
case 4:
return this.addXPt (JU.P3.newP (q.getNormal ()));
case 5:
return this.addXAF (q.getEulerZXZ ());
case 6:
return this.addXAF (q.getEulerZYZ ());
case -1:
return this.addXPt (JU.P3.newP (q.getVector (-1)));
case -2:
return this.addXFloat (q.getTheta ());
case -3:
return this.addXPt (JU.P3.newP (q.getVector (0)));
case -4:
return this.addXPt (JU.P3.newP (q.getVector (1)));
case -5:
return this.addXPt (JU.P3.newP (q.getVector (2)));
case -6:
var ax = q.toAxisAngle4f ();
return this.addXPt4 (JU.P4.new4 (ax.x, ax.y, ax.z, (ax.angle * 180 / 3.141592653589793)));
case -9:
return this.addXM3 (q.getMatrix ());
default:
return this.addXStr ("NaN");
}
case 12:
var m4 = x1.value;
switch (n) {
case 1:
var m3 =  new JU.M3 ();
m4.getRotationScale (m3);
return this.addXM3 (m3);
case 2:
var v3 =  new JU.V3 ();
m4.getTranslation (v3);
return this.addXPt (JU.P3.newP (v3));
default:
return false;
}
case 10:
return this.addXBs (JS.SV.bsSelectRange (x1, n));
}
return this.addXInt (n == 0 ? x1.asInt () : x1.asInt () % n);
}
return true;
}, "JS.T,JS.SV,JS.SV");
Clazz_defineMethod (c$, "isDecimal", 
 function (x) {
var s;
return (x.tok == 3 || x.tok == 4 && ((s = JS.SV.sValue (x).trim ()).indexOf (".") >= 0 || s.indexOf ("+") > 0 || s.lastIndexOf ("-") > 0));
}, "JS.SV");
Clazz_defineMethod (c$, "ptValue", 
function (x, bsRestrict) {
var pt;
switch (x.tok) {
case 8:
return x.value;
case 10:
var bs = x.value;
if (bs.isEmpty ()) break;
if (bsRestrict != null) {
bs = JU.BSUtil.copy (bs);
bs.and (bsRestrict);
}return this.eval.getBitsetProperty (bs, null, 1145047050, null, null, x.value, null, false, 2147483647, false);
case 4:
pt = JU.Escape.uP (JS.SV.sValue (x));
if (Clazz_instanceOf (pt, JU.P3)) return pt;
break;
case 7:
pt = JU.Escape.uP ("{" + JS.SV.sValue (x).$replace (']', ' ').$replace ('[', ' ') + "}");
if (Clazz_instanceOf (pt, JU.P3)) return pt;
break;
}
return null;
}, "JS.SV,JU.BS");
Clazz_defineMethod (c$, "planeValue", 
function (x) {
switch (x.tok) {
case 9:
return x.value;
case 7:
case 4:
var pt = JU.Escape.uP (JS.SV.sValue (x));
return (Clazz_instanceOf (pt, JU.P4) ? pt : null);
case 10:
break;
}
return null;
}, "JS.T");
c$.typeOf = Clazz_defineMethod (c$, "typeOf", 
 function (x) {
var tok = (x == null ? 0 : x.tok);
switch (tok) {
case 1073742335:
case 1073742334:
return "boolean";
case 10:
return (Clazz_instanceOf (x.value, JM.BondSet) ? "bondset" : "bitset");
case 2:
case 3:
case 8:
case 9:
case 4:
case 7:
case 6:
case 15:
case 11:
case 12:
case 14:
return JS.T.astrType[tok];
}
return "?";
}, "JS.SV");
Clazz_defineMethod (c$, "getAllProperties", 
 function (x2, abbr) {
var bs = x2.value;
var tokens;
var n = bs.cardinality ();
if (n == 0 || !abbr.endsWith ("?") || (tokens = JS.T.getAtomPropertiesLike (abbr.substring (0, abbr.length - 1))) == null) return this.addXStr ("");
var ht =  new java.util.Hashtable ();
var index = (n == 1 ? bs.nextSetBit (0) : 2147483647);
for (var i = tokens.size (); --i >= 0; ) {
var t = tokens.get (i);
var tok = t.tok;
switch (tok) {
case 1094717448:
case 1094713349:
continue;
default:
if (index == 2147483647) tok |= 480;
ht.put (t.value, JS.SV.getVariable (this.eval.getBitsetProperty (bs, null, tok, null, null, null, null, false, index, true)));
}
}
return this.addXMap (ht);
}, "JS.SV,~S");
c$.getMatrix4f = Clazz_defineMethod (c$, "getMatrix4f", 
function (matRotate, vTranslate) {
return JU.M4.newMV (matRotate, vTranslate == null ?  new JU.V3 () : JU.V3.newV (vTranslate));
}, "JU.M3,JU.T3");
Clazz_defineMethod (c$, "getBoundBox", 
 function (x2) {
if (x2.tok != 10) return false;
var b = this.vwr.ms.getBoxInfo (x2.value, 1);
var pts = b.getBoundBoxPoints (true);
var list =  new JU.Lst ();
for (var i = 0; i < 4; i++) list.addLast (pts[i]);

return this.addXList (list);
}, "JS.SV");
Clazz_defineMethod (c$, "getPointOrBitsetOperation", 
 function (op, x2) {
switch (x2.tok) {
case 7:
switch (op.intValue) {
case 32:
case 64:
case 96:
case 192:
case 128:
case 160:
case 1275068437:
return this.addXObj (this.eval.getMathExt ().getMinMax (x2.getList (), op.intValue));
case 1275334681:
return this.addX (x2.pushPop (null, null));
case 1275068444:
case 1140850693:
return this.addX (x2.sortOrReverse (op.intValue == 1140850693 ? -2147483648 : 1));
}
var list2 =  new Array (x2.getList ().size ());
for (var i = 0; i < list2.length; i++) {
var v = JS.SV.unescapePointOrBitsetAsVariable (x2.getList ().get (i));
if (!(Clazz_instanceOf (v, JS.SV)) || !this.getPointOrBitsetOperation (op, v)) return false;
list2[i] = this.xStack[this.xPt--];
}
return this.addXAV (list2);
case 8:
switch (op.intValue) {
case 1111492609:
case 1111492629:
return this.addXFloat ((x2.value).x);
case 1111492610:
case 1111492630:
return this.addXFloat ((x2.value).y);
case 1111492611:
case 1111492631:
return this.addXFloat ((x2.value).z);
case 1145047050:
var pt = JU.P3.newP (x2.value);
this.vwr.toCartesian (pt, false);
return this.addXPt (pt);
case 1111492612:
case 1111492613:
case 1111492614:
case 1145047051:
var ptf = JU.P3.newP (x2.value);
this.vwr.toFractional (ptf, false);
return (op.intValue == 1145047051 ? this.addXPt (ptf) : this.addXFloat (op.intValue == 1111492612 ? ptf.x : op.intValue == 1111492613 ? ptf.y : ptf.z));
case 1111492615:
case 1111492616:
case 1111492617:
case 1145047053:
var ptfu = JU.P3.newP (x2.value);
this.vwr.toFractional (ptfu, false);
return (op.intValue == 1145047053 ? this.addXPt (ptfu) : this.addXFloat (op.intValue == 1111492615 ? ptfu.x : op.intValue == 1111492616 ? ptfu.y : ptfu.z));
case 1111490577:
case 1111490578:
case 1111490579:
case 1145045006:
var ptu = JU.P3.newP (x2.value);
this.vwr.toUnitCell (ptu, null);
this.vwr.toFractional (ptu, false);
return (op.intValue == 1145045006 ? this.addXPt (ptu) : this.addXFloat (op.intValue == 1111490577 ? ptu.x : op.intValue == 1111490578 ? ptu.y : ptu.z));
}
break;
case 9:
switch (op.intValue) {
case 1111492609:
case 1111492629:
return this.addXFloat ((x2.value).x);
case 1111492610:
case 1111492630:
return this.addXFloat ((x2.value).y);
case 1111492611:
case 1111492631:
return this.addXFloat ((x2.value).z);
case 1140850705:
return this.addXFloat ((x2.value).w);
}
break;
case 10:
var isAtoms = (op.intValue != 1677721602);
if (!isAtoms && Clazz_instanceOf (x2.value, JM.BondSet)) return this.addX (x2);
var bs = x2.value;
if (isAtoms && bs.cardinality () == 1 && (op.intValue & 480) == 0) op.intValue |= 32;
var val = this.eval.getBitsetProperty (bs, null, op.intValue, null, null, x2.value, op.value, false, x2.index, true);
return (isAtoms ? this.addXObj (val) : this.addX (JS.SV.newV (10, JM.BondSet.newBS (val, this.vwr.ms.getAtomIndices (bs)))));
}
return false;
}, "JS.T,JS.SV");
Clazz_defineStatics (c$,
"qMods", " w:0 x:1 y:2 z:3 normal:4 eulerzxz:5 eulerzyz:6 vector:-1 theta:-2 axisx:-3 axisy:-4 axisz:-5 axisangle:-6 matrix:-9");
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.ScriptError"], "JS.ScriptParam", ["java.lang.Float", "java.util.Hashtable", "JU.BS", "$.CU", "$.Lst", "$.Measure", "$.P3", "$.P4", "$.PT", "$.Quat", "$.SB", "$.V3", "JM.TickInfo", "JS.SV", "$.T", "JU.BSUtil", "$.Edge", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.contextVariables = null;
this.thisContext = null;
this.iToken = 0;
this.theTok = 0;
this.theToken = null;
this.st = null;
this.slen = 0;
this.fractionalPoint = null;
this.coordinatesAreFractional = false;
this.isBondSet = false;
this.pt1 = null;
this.pt2 = null;
this.pt3 = null;
Clazz_instantialize (this, arguments);
}, JS, "ScriptParam", JS.ScriptError);
Clazz_defineMethod (c$, "getToken", 
function (i) {
if (!this.checkToken (i)) this.error (13);
this.theToken = this.st[i];
this.theTok = this.theToken.tok;
return this.theToken;
}, "~N");
Clazz_defineMethod (c$, "tokAt", 
function (i) {
return (i < this.slen && this.st[i] != null ? this.st[i].tok : 0);
}, "~N");
Clazz_defineMethod (c$, "checkToken", 
function (i) {
return (this.iToken = i) < this.slen;
}, "~N");
Clazz_defineMethod (c$, "getParameter", 
function (key, tokType, nullAsString) {
var v = this.getContextVariableAsVariable (key, false);
if (v == null) {
if (nullAsString) v = this.vwr.getP (key);
 else if ((v = this.vwr.getPOrNull (key)) == null) return null;
}switch (tokType) {
case 1073742190:
return JS.SV.getVariable (v);
case 4:
if (!(Clazz_instanceOf (v, JU.Lst))) break;
var sv = v;
var sb =  new JU.SB ();
for (var i = 0; i < sv.size (); i++) sb.append (sv.get (i).asString ()).appendC ('\n');

return sb.toString ();
}
return JS.SV.oValue (v);
}, "~S,~N,~B");
Clazz_defineMethod (c$, "getVarParameter", 
function ($var, orReturnName) {
var v = this.getContextVariableAsVariable ($var, false);
if (v != null) return (orReturnName ? v.asString () : JS.SV.oValue (v));
var val = this.vwr.getP ($var);
return (orReturnName && ("" + val).length == 0 ? $var : val);
}, "~S,~B");
Clazz_defineMethod (c$, "getContextVariableAsVariable", 
function ($var, isLocal) {
if ($var.equals ("expressionBegin")) return null;
if ($var.equalsIgnoreCase ("_caller")) {
var sc = this.thisContext;
while (sc != null) {
if (sc.isFunction) return JS.SV.newV (6, sc.vars);
sc = sc.parentContext;
}
return JS.SV.newV (6,  new java.util.Hashtable ());
}$var = $var.toLowerCase ();
return (this.contextVariables != null && this.contextVariables.containsKey ($var) ? this.contextVariables.get ($var) : isLocal || this.thisContext == null ? null : this.thisContext.getVariable ($var));
}, "~S,~B");
Clazz_defineMethod (c$, "paramAsStr", 
function (i) {
this.getToken (i);
if (this.theToken == null) this.error (13);
return JS.SV.sValue (this.theToken);
}, "~N");
Clazz_defineMethod (c$, "stringParameter", 
function (index) {
if (!this.checkToken (index) || this.getToken (index).tok != 4) this.error (41);
return this.theToken.value;
}, "~N");
Clazz_defineMethod (c$, "stringParameterSet", 
function (i) {
switch (this.tokAt (i)) {
case 4:
var s = this.stringParameter (i);
if (s.startsWith ("[\"")) {
var o = this.vwr.evaluateExpression (s);
if (Clazz_instanceOf (o, String)) return JU.PT.split (o, "\n");
}return  Clazz_newArray (-1, [s]);
case 1073742195:
i += 2;
break;
case 268435520:
++i;
break;
case 7:
return JS.SV.strListValue (this.getToken (i));
default:
this.invArg ();
}
var tok;
var v =  new JU.Lst ();
while ((tok = this.tokAt (i)) != 268435521) {
switch (tok) {
case 268435504:
break;
case 4:
v.addLast (this.stringParameter (i));
break;
default:
case 0:
this.invArg ();
}
i++;
}
this.iToken = i;
var n = v.size ();
var sParams =  new Array (n);
for (var j = 0; j < n; j++) {
sParams[j] = v.get (j);
}
return sParams;
}, "~N");
Clazz_defineMethod (c$, "objectNameParameter", 
function (index) {
if (!this.checkToken (index)) this.error (37);
return this.paramAsStr (index);
}, "~N");
Clazz_defineMethod (c$, "atomCenterOrCoordinateParameter", 
function (i, ret) {
switch (this.getToken (i).tok) {
case 10:
case 1073742325:
var bs = (this).atomExpression (this.st, i, 0, true, false, ret, true);
if (bs == null) {
if (ret == null || !(Clazz_instanceOf (ret[0], JU.P3))) this.invArg ();
return ret[0];
}if (ret != null) {
if (ret.length == 2 && Clazz_instanceOf (ret[1], JU.BS)) {
bs = JU.BSUtil.copy (bs);
bs.and (ret[1]);
}ret[0] = bs;
}return (bs.cardinality () == 1 ? this.vwr.ms.at[bs.nextSetBit (0)] : this.vwr.ms.getAtomSetCenter (bs));
case 1073742332:
case 8:
return this.getPoint3f (i, true, true);
}
this.invArg ();
return null;
}, "~N,~A");
Clazz_defineMethod (c$, "isCenterParameter", 
function (i) {
var tok = this.tokAt (i);
return (tok == 1073742330 || tok == 1073742332 || tok == 1073742325 || tok == 8 || tok == 10);
}, "~N");
Clazz_defineMethod (c$, "centerParameter", 
function (i, ret) {
return this.centerParameterForModel (i, -2147483648, ret);
}, "~N,~A");
Clazz_defineMethod (c$, "centerParameterForModel", 
function (i, modelIndex, ret) {
var center = null;
if (this.checkToken (i)) {
switch (this.getToken (i).tok) {
case 1073742330:
var id = this.objectNameParameter (++i);
var index = -2147483648;
if (this.tokAt (i + 1) == 268435520) {
index = (this).parameterExpressionList (-i - 1, -1, true).get (0).asInt ();
if (this.getToken (--this.iToken).tok != 268435521) this.invArg ();
}if (this.chk) return  new JU.P3 ();
if (this.tokAt (i + 1) == 1073742336 && (this.tokAt (i + 2) == 1140850691 || this.tokAt (i + 2) == 1140850694)) {
index = 2147483647;
this.iToken = i + 2;
}if ((center = (this).getObjectCenter (id, index, modelIndex)) == null) this.errorStr (12, id);
break;
case 10:
case 1073742325:
case 1073742332:
case 8:
if (ret == null) ret =  new Array (1);
center = this.atomCenterOrCoordinateParameter (i, ret);
break;
}
}if (center == null) this.error (11);
return center;
}, "~N,~N,~A");
Clazz_defineMethod (c$, "planeParameter", 
function (i) {
var vTemp =  new JU.V3 ();
var vTemp2 =  new JU.V3 ();
var plane = null;
var norm = null;
if (this.tokAt (i) == 134217750) i++;
var isNegated = (this.tokAt (i) == 268435616);
if (isNegated) i++;
if (i < this.slen) {
switch (this.getToken (i).tok) {
case 9:
plane = JU.P4.newPt (this.theToken.value);
break;
case 1073742330:
var id = this.objectNameParameter (++i);
if (this.chk) return  new JU.P4 ();
plane = (this).getPlaneForObject (id, vTemp);
break;
case 1111492629:
if (!this.checkToken (++i) || this.getToken (i++).tok != 268435860) this.evalError ("x=?", null);
plane = JU.P4.new4 (1, 0, 0, -this.floatParameter (i));
break;
case 1111492630:
if (!this.checkToken (++i) || this.getToken (i++).tok != 268435860) this.evalError ("y=?", null);
plane = JU.P4.new4 (0, 1, 0, -this.floatParameter (i));
break;
case 1111492631:
if (!this.checkToken (++i) || this.getToken (i++).tok != 268435860) this.evalError ("z=?", null);
plane = JU.P4.new4 (0, 0, 1, -this.floatParameter (i));
break;
case 1073741824:
case 4:
var str = this.paramAsStr (i);
if (str.equalsIgnoreCase ("xy")) plane = JU.P4.new4 (0, 0, isNegated ? -1 : 1, 0);
 else if (str.equalsIgnoreCase ("xz")) plane = JU.P4.new4 (0, isNegated ? -1 : 1, 0, 0);
 else if (str.equalsIgnoreCase ("yz")) plane = JU.P4.new4 (isNegated ? -1 : 1, 0, 0, 0);
break;
case 1073742332:
case 8:
if (!this.isPoint3f (i)) {
plane = this.getPoint4f (i);
break;
}case 10:
case 1073742325:
this.pt1 = this.atomCenterOrCoordinateParameter (i, null);
if (this.getToken (++this.iToken).tok == 268435504) ++this.iToken;
this.pt2 = this.atomCenterOrCoordinateParameter (this.iToken, null);
if (this.getToken (++this.iToken).tok == 268435504) ++this.iToken;
if (this.isFloatParameter (this.iToken)) {
var frac = this.floatParameter (this.iToken);
plane =  new JU.P4 ();
vTemp.sub2 (this.pt2, this.pt1);
vTemp.scale (frac * 2);
JU.Measure.getBisectingPlane (this.pt1, vTemp, vTemp2, vTemp, plane);
} else {
this.pt3 = this.atomCenterOrCoordinateParameter (this.iToken, null);
i = this.iToken;
norm =  new JU.V3 ();
}break;
default:
if (this.isArrayParameter (i)) {
var list = this.getPointOrCenterVector (this.getToken (i));
if (list.size () != 3) this.invArg ();
this.pt1 = list.get (0);
this.pt2 = list.get (1);
this.pt3 = list.get (2);
norm =  new JU.V3 ();
}}
if (norm != null) {
var w = JU.Measure.getNormalThroughPoints (this.pt1, this.pt2, this.pt3, norm, vTemp);
plane =  new JU.P4 ();
plane.set4 (norm.x, norm.y, norm.z, w);
}if (!this.chk && JU.Logger.debugging) JU.Logger.debug (" defined plane: " + plane);
}if (plane == null) this.errorMore (38, "{a b c d}", "\"xy\" \"xz\" \"yz\" \"x=...\" \"y=...\" \"z=...\"", "$xxxxx");
if (isNegated) {
plane.scale4 (-1);
}return plane;
}, "~N");
Clazz_defineMethod (c$, "getPointOrCenterVector", 
function (t) {
var data =  new JU.Lst ();
var pt;
var bs;
var pts = (t).getList ();
if (pts == null) this.invArg ();
for (var j = 0; j < pts.size (); j++) {
if ((pt = JS.SV.ptValue (pts.get (j))) != null) {
data.addLast (pt);
} else if ((bs = JS.SV.getBitSet (pts.get (j), true)) != null) {
data.addLast (bs.cardinality () == 1 ? JU.P3.newP (this.vwr.ms.at[bs.nextSetBit (0)]) : this.vwr.ms.getAtomSetCenter (bs));
} else {
this.invArg ();
}}
return data;
}, "JS.T");
Clazz_defineMethod (c$, "hklParameter", 
function (i) {
if (!this.chk && this.vwr.getCurrentUnitCell () == null) this.error (33);
var pt = this.getPointOrPlane (i, false, true, false, true, 3, 3, true);
var p = this.getHklPlane (pt);
if (p == null) this.error (3);
if (!this.chk && JU.Logger.debugging) JU.Logger.debug ("defined plane: " + p);
return p;
}, "~N");
Clazz_defineMethod (c$, "getHklPlane", 
function (pt) {
this.pt1 = JU.P3.new3 (pt.x == 0 ? 1 : 1 / pt.x, 0, 0);
this.pt2 = JU.P3.new3 (0, pt.y == 0 ? 1 : 1 / pt.y, 0);
this.pt3 = JU.P3.new3 (0, 0, pt.z == 0 ? 1 : 1 / pt.z);
if (pt.x == 0 && pt.y == 0 && pt.z == 0) {
return null;
} else if (pt.x == 0 && pt.y == 0) {
this.pt1.set (1, 0, this.pt3.z);
this.pt2.set (0, 1, this.pt3.z);
} else if (pt.y == 0 && pt.z == 0) {
this.pt2.set (this.pt1.x, 0, 1);
this.pt3.set (this.pt1.x, 1, 0);
} else if (pt.z == 0 && pt.x == 0) {
this.pt3.set (0, this.pt2.y, 1);
this.pt1.set (1, this.pt2.y, 0);
} else if (pt.x == 0) {
this.pt1.set (1, this.pt2.y, 0);
} else if (pt.y == 0) {
this.pt2.set (0, 1, this.pt3.z);
} else if (pt.z == 0) {
this.pt3.set (this.pt1.x, 0, 1);
}this.vwr.toCartesian (this.pt1, false);
this.vwr.toCartesian (this.pt2, false);
this.vwr.toCartesian (this.pt3, false);
return JU.Measure.getPlaneThroughPoints (this.pt1, this.pt2, this.pt3,  new JU.V3 (),  new JU.V3 (),  new JU.P4 ());
}, "JU.P3");
Clazz_defineMethod (c$, "getPointOrPlane", 
function (index, integerOnly, allowFractional, doConvert, implicitFractional, minDim, maxDim, throwE) {
var coord =  Clazz_newFloatArray (6, 0);
var code555 =  Clazz_newIntArray (6, 0);
var useCell555P4 = false;
var n = 0;
var isOK = true;
try {
this.coordinatesAreFractional = implicitFractional;
if (this.tokAt (index) == 8) {
if (minDim <= 3 && maxDim >= 3) return this.getToken (index).value;
isOK = false;
return null;
}if (this.tokAt (index) == 9) {
if (minDim <= 4 && maxDim >= 4) return this.getToken (index).value;
isOK = false;
return null;
}var multiplier = 1;
out : for (var i = index; i < this.slen; i++) {
switch (this.getToken (i).tok) {
case 1073742332:
case 268435504:
case 268435552:
case 268435584:
break;
case 1073742338:
break out;
case 268435616:
multiplier = -1;
break;
case 1073742363:
if (n == 6) {
isOK = false;
return null;
}coord[n++] = this.theToken.intValue;
multiplier = -1;
break;
case 2:
case 1073742362:
if (n == 6) this.invArg ();
if (implicitFractional && this.theToken.intValue > 999999999) useCell555P4 = true;
code555[n] = this.theToken.intValue;
coord[n++] = this.theToken.intValue * multiplier;
multiplier = 1;
break;
case 268435632:
case 1073742358:
if (!allowFractional) {
isOK = false;
return null;
}if (this.theTok == 268435632) this.getToken (++i);
n--;
if (n < 0 || integerOnly) {
isOK = false;
return null;
}if (Clazz_instanceOf (this.theToken.value, Integer) || this.theTok == 2) {
coord[n++] /= (this.theToken.intValue == 2147483647 ? (this.theToken.value).intValue () : this.theToken.intValue);
} else if (Clazz_instanceOf (this.theToken.value, Float)) {
coord[n++] /= (this.theToken.value).floatValue ();
}this.coordinatesAreFractional = true;
break;
case 1073742357:
case 1073741824:
coord[n++] = NaN;
break;
case 3:
case 1073742359:
if (integerOnly) {
isOK = false;
return null;
}if (n == 6) {
isOK = false;
return null;
}coord[n++] = (this.theToken.value).floatValue ();
break;
default:
isOK = false;
return null;
}
}
if (n < minDim || n > maxDim) {
isOK = false;
return null;
}if (n == 3) {
if (useCell555P4) {
return JU.P4.new4 (coord[0], coord[1], coord[2], (code555[0] % 1000) * 1000 + (code555[1] % 1000) + 1000000);
}var pt = JU.P3.new3 (coord[0], coord[1], coord[2]);
if (this.coordinatesAreFractional && doConvert) {
this.fractionalPoint = JU.P3.newP (pt);
if (!this.chk) this.vwr.toCartesian (pt, false);
}return pt;
}if (n == 4) {
if (this.coordinatesAreFractional) {
isOK = false;
return null;
}var plane = JU.P4.new4 (coord[0], coord[1], coord[2], coord[3]);
return plane;
}return coord;
} finally {
if (!isOK && throwE) this.invArg ();
}
}, "~N,~B,~B,~B,~B,~N,~N,~B");
Clazz_defineMethod (c$, "isPoint3f", 
function (i) {
var itok = this.tokAt (i);
if (itok == 0) return false;
var isOK;
if ((isOK = (itok == 8)) || itok == 9 || this.isFloatParameter (i + 1) && this.isFloatParameter (i + 2) && this.isFloatParameter (i + 3) && this.isFloatParameter (i + 4)) return isOK;
this.ignoreError = true;
var t = this.iToken;
isOK = true;
try {
if (this.getPoint3f (i, true, false) == null) isOK = false;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
isOK = false;
} else {
throw e;
}
}
this.ignoreError = false;
this.iToken = t;
return isOK;
}, "~N");
Clazz_defineMethod (c$, "getPoint3f", 
function (i, allowFractional, throwE) {
return this.getPointOrPlane (i, false, allowFractional, true, false, 3, 3, throwE);
}, "~N,~B,~B");
Clazz_defineMethod (c$, "getPoint4f", 
function (i) {
return this.getPointOrPlane (i, false, false, false, false, 4, 4, true);
}, "~N");
Clazz_defineMethod (c$, "xypParameter", 
function (index) {
var tok = this.tokAt (index);
if (tok == 1073742195) tok = this.tokAt (++index);
if (tok != 268435520 || !this.isFloatParameter (++index)) return null;
var pt =  new JU.P3 ();
pt.x = this.floatParameter (index);
if (this.tokAt (++index) == 268435504) index++;
if (!this.isFloatParameter (index)) return null;
pt.y = this.floatParameter (index);
var isPercent = (this.tokAt (++index) == 268435634);
if (isPercent) ++index;
if (this.tokAt (index) != 268435521) return null;
this.iToken = index;
pt.z = (isPercent ? -1 : 1) * 3.4028235E38;
return pt;
}, "~N");
Clazz_defineMethod (c$, "xyzpParameter", 
function (index) {
var tok = this.tokAt (index);
if (tok == 1073742195) tok = this.tokAt (++index);
if (tok != 268435520 || !this.isFloatParameter (++index)) return null;
var pt =  new JU.P4 ();
pt.x = this.floatParameter (index);
if (this.tokAt (++index) == 268435504) index++;
if (!this.isFloatParameter (index)) return null;
pt.y = this.floatParameter (index);
if (this.tokAt (++index) == 268435504) index++;
if (!this.isFloatParameter (index)) return null;
pt.z = this.floatParameter (index);
var isPercent = (this.tokAt (++index) == 268435634);
if (isPercent) ++index;
if (this.tokAt (index) != 268435521) return null;
this.iToken = index;
pt.w = (isPercent ? -1 : 1) * 3.4028235E38;
return pt;
}, "~N");
Clazz_defineMethod (c$, "optParameterAsString", 
function (i) {
return (i >= this.slen ? "" : this.paramAsStr (i));
}, "~N");
Clazz_defineMethod (c$, "intParameter", 
function (index) {
if (this.checkToken (index)) if (this.getToken (index).tok == 2) return this.theToken.intValue;
this.error (20);
return 0;
}, "~N");
Clazz_defineMethod (c$, "isFloatParameter", 
function (index) {
switch (this.tokAt (index)) {
case 2:
case 3:
return true;
}
return false;
}, "~N");
Clazz_defineMethod (c$, "floatParameter", 
function (index) {
if (this.checkToken (index)) {
this.getToken (index);
switch (this.theTok) {
case 1073742363:
return -this.theToken.intValue;
case 1073742362:
case 2:
return this.theToken.intValue;
case 1073742359:
case 3:
return (this.theToken.value).floatValue ();
}
}this.error (34);
return 0;
}, "~N");
Clazz_defineMethod (c$, "getPointArray", 
function (i, nPoints, allowNull) {
if (nPoints == 2147483647) nPoints = -1;
var points = (nPoints < 0 ? null :  new Array (nPoints));
var vp = (nPoints < 0 ?  new JU.Lst () : null);
var tok = (i < 0 ? 7 : this.getToken (i++).tok);
switch (tok) {
case 7:
var v = (this.theToken).getList ();
if (nPoints >= 0 && v.size () != nPoints) this.invArg ();
nPoints = v.size ();
if (points == null) points =  new Array (nPoints);
for (var j = 0; j < nPoints; j++) if ((points[j] = JS.SV.ptValue (v.get (j))) == null && !allowNull) this.invArg ();

return points;
case 1073742195:
tok = this.tokAt (i++);
break;
}
if (tok != 268435520) this.invArg ();
var n = 0;
while (tok != 268435521 && tok != 0) {
tok = this.getToken (i).tok;
switch (tok) {
case 0:
case 268435521:
break;
case 268435504:
i++;
break;
default:
if (nPoints >= 0 && n == nPoints) {
tok = 0;
break;
}var pt = this.centerParameter (i, null);
if (points == null) vp.addLast (pt);
 else points[n] = pt;
n++;
i = this.iToken + 1;
}
}
if (tok != 268435521) this.invArg ();
if (points == null) points = vp.toArray ( new Array (vp.size ()));
if (nPoints > 0 && points[nPoints - 1] == null) this.invArg ();
return points;
}, "~N,~N,~B");
Clazz_defineMethod (c$, "listParameter", 
function (i, nMin, nMax) {
return this.listParameter4 (i, nMin, nMax, false);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "listParameter4", 
function (i, nMin, nMax, allowString) {
var v =  new JU.Lst ();
var tok = this.tokAt (i);
if (tok == 1073742195) tok = this.tokAt (++i);
var haveBrace = (tok == 1073742332);
var haveSquare = (tok == 268435520);
if (haveBrace || haveSquare) i++;
var n = 0;
while (n < nMax) {
tok = this.tokAt (i);
if (haveBrace && tok == 1073742338 || haveSquare && tok == 268435521) break;
switch (tok) {
case 268435504:
case 268435616:
case 1073742332:
case 1073742338:
break;
case 4:
if (allowString) v.addLast (this.stringParameter (i));
break;
case 9:
var pt4 = this.getPoint4f (i);
v.addLast (Float.$valueOf (pt4.x));
v.addLast (Float.$valueOf (pt4.y));
v.addLast (Float.$valueOf (pt4.z));
v.addLast (Float.$valueOf (pt4.w));
n += 4;
break;
default:
if (this.isCenterParameter (i)) {
var pt = this.centerParameter (i, null);
i = this.iToken;
v.addLast (Float.$valueOf (pt.x));
v.addLast (Float.$valueOf (pt.y));
v.addLast (Float.$valueOf (pt.z));
n += 3;
break;
}v.addLast (Float.$valueOf (this.floatParameter (i)));
n++;
}
i += (n == nMax && haveSquare && this.tokAt (i + 1) == 1073742338 ? 2 : 1);
}
if (haveBrace && this.tokAt (i++) != 1073742338 || haveSquare && this.tokAt (i++) != 268435521 || n < nMin || n > nMax) this.invArg ();
this.iToken = i - 1;
return v;
}, "~N,~N,~N,~B");
Clazz_defineMethod (c$, "floatParameterSet", 
function (i, nMin, nMax) {
var v = null;
var fparams = null;
var n = 0;
var s = null;
this.iToken = i;
switch (this.tokAt (i)) {
case 4:
s = JS.SV.sValue (this.st[i]);
s = JU.PT.replaceWithCharacter (s, "{},[]\"'", ' ');
fparams = JU.PT.parseFloatArray (s);
n = fparams.length;
break;
case 7:
fparams = JS.SV.flistValue (this.st[i], 0);
n = fparams.length;
break;
default:
v = this.listParameter (i, nMin, nMax);
n = v.size ();
}
if (n < nMin || n > nMax) this.invArg ();
if (fparams == null) {
fparams =  Clazz_newFloatArray (n, 0);
for (var j = 0; j < n; j++) fparams[j] = (v.get (j)).floatValue ();

}return fparams;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "isArrayParameter", 
function (i) {
switch (this.tokAt (i)) {
case 7:
case 11:
case 12:
case 1073742195:
case 268435520:
return true;
}
return false;
}, "~N");
Clazz_defineMethod (c$, "getQuaternionParameter", 
function (i, bsAtoms, divideByCurrent) {
switch (this.tokAt (i)) {
case 7:
var sv = (this.getToken (i)).getList ();
var p4 = null;
if (sv.size () == 0 || (p4 = JS.SV.pt4Value (sv.get (0))) == null) this.invArg ();
return JU.Quat.newP4 (p4);
case 1073741864:
return (this.chk ? null : this.vwr.getOrientationText (1073741864, (divideByCurrent ? "best" : ""), bsAtoms));
default:
return JU.Quat.newP4 (this.getPoint4f (i));
}
}, "~N,JU.BS,~B");
Clazz_defineMethod (c$, "checkLast", 
function (i) {
return this.checkLength (i + 1) - 1;
}, "~N");
Clazz_defineMethod (c$, "checkLength", 
function (length) {
if (length >= 0) return this.checkLengthErrorPt (length, 0);
if (this.slen > -length) {
this.iToken = -length;
this.bad ();
}return this.slen;
}, "~N");
Clazz_defineMethod (c$, "checkLengthErrorPt", 
function (length, errorPt) {
if (this.slen != length) {
this.iToken = errorPt > 0 ? errorPt : this.slen;
if (errorPt > 0) this.invArg ();
 else this.bad ();
}return this.slen;
}, "~N,~N");
Clazz_defineMethod (c$, "checkLength23", 
function () {
this.iToken = this.slen;
if (this.slen != 2 && this.slen != 3) this.bad ();
return this.slen;
});
Clazz_defineMethod (c$, "checkLength34", 
function () {
this.iToken = this.slen;
if (this.slen != 3 && this.slen != 4) this.bad ();
return this.slen;
});
Clazz_defineMethod (c$, "modelNumberParameter", 
function (index) {
var iFrame = 0;
var useModelNumber = false;
switch (this.tokAt (index)) {
case 2:
useModelNumber = true;
case 3:
iFrame = this.getToken (index).intValue;
break;
case 4:
iFrame = JS.ScriptParam.getFloatEncodedInt (this.stringParameter (index));
break;
default:
this.invArg ();
}
return this.vwr.ms.getModelNumberIndex (iFrame, useModelNumber, true);
}, "~N");
Clazz_defineMethod (c$, "getMadParameter", 
function () {
var mad = 1;
switch (this.getToken (1).tok) {
case 1073742072:
(this).restrictSelected (false, false);
case 1073742335:
break;
case 1073742334:
mad = 0;
break;
case 2:
var radiusRasMol = this.intParameterRange (1, 0, 750);
mad = radiusRasMol * 4 * 2;
break;
case 3:
var f = this.floatParameterRange (1, -3, 3);
mad = (Float.isNaN (f) ? 2147483647 : Clazz_doubleToInt (Math.floor (f * 1000 * 2)));
if (mad < 0) {
(this).restrictSelected (false, false);
mad = -mad;
}break;
default:
this.error (6);
}
return mad;
});
Clazz_defineMethod (c$, "intParameterRange", 
function (i, min, max) {
var val = this.intParameter (i);
if (val < min || val > max) {
this.integerOutOfRange (min, max);
return 2147483647;
}return val;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "floatParameterRange", 
function (i, min, max) {
var val = this.floatParameter (i);
if (val < min || val > max) {
this.numberOutOfRange (min, max);
return NaN;
}return val;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "getPointVector", 
function (t, i) {
switch (t.tok) {
case 10:
return this.vwr.ms.getAtomPointVector (t.value);
case 7:
var data =  new JU.Lst ();
var pt;
var pts = (t).getList ();
for (var j = 0; j < pts.size (); j++) if ((pt = JS.SV.ptValue (pts.get (j))) != null) data.addLast (pt);
 else return null;

return data;
}
if (i > 0) return this.vwr.ms.getAtomPointVector ((this).atomExpressionAt (i));
return null;
}, "JS.T,~N");
c$.getFloatEncodedInt = Clazz_defineMethod (c$, "getFloatEncodedInt", 
function (strDecimal) {
var pt = strDecimal.indexOf (".");
if (pt < 1 || strDecimal.charAt (0) == '-' || strDecimal.endsWith (".") || strDecimal.contains (".0")) return 2147483647;
var i = 0;
var j = 0;
if (pt > 0) {
try {
i = Integer.parseInt (strDecimal.substring (0, pt));
if (i < 0) i = -i;
} catch (e) {
if (Clazz_exceptionOf (e, NumberFormatException)) {
i = -1;
} else {
throw e;
}
}
}if (pt < strDecimal.length - 1) try {
j = Integer.parseInt (strDecimal.substring (pt + 1));
} catch (e) {
if (Clazz_exceptionOf (e, NumberFormatException)) {
} else {
throw e;
}
}
i = i * 1000000 + j;
return (i < 0 ? 2147483647 : i);
}, "~S");
c$.getPartialBondOrderFromFloatEncodedInt = Clazz_defineMethod (c$, "getPartialBondOrderFromFloatEncodedInt", 
function (bondOrderInteger) {
return (((Clazz_doubleToInt (bondOrderInteger / 1000000)) % 7) << 5) + ((bondOrderInteger % 1000000) & 0x1F);
}, "~N");
c$.getBondOrderFromString = Clazz_defineMethod (c$, "getBondOrderFromString", 
function (s) {
return (s.indexOf (' ') < 0 ? JU.Edge.getBondOrderFromString (s) : s.toLowerCase ().indexOf ("partial ") == 0 ? JS.ScriptParam.getPartialBondOrderFromString (s.substring (8).trim ()) : 131071);
}, "~S");
c$.getPartialBondOrderFromString = Clazz_defineMethod (c$, "getPartialBondOrderFromString", 
 function (s) {
return JS.ScriptParam.getPartialBondOrderFromFloatEncodedInt (JS.ScriptParam.getFloatEncodedInt (s));
}, "~S");
Clazz_defineMethod (c$, "isColorParam", 
function (i) {
var tok = this.tokAt (i);
return tok != 0 && (tok == 570425378 || tok == 1073742195 || tok == 268435520 || tok == 7 || tok == 8 || this.isPoint3f (i) || (tok == 4 || JS.T.tokAttr (tok, 1073741824)) && JU.CU.getArgbFromString (this.st[i].value) != 0);
}, "~N");
Clazz_defineMethod (c$, "getArgbParam", 
function (index) {
return this.getArgbParamOrNone (index, false);
}, "~N");
Clazz_defineMethod (c$, "getArgbParamLast", 
function (index, allowNone) {
var icolor = this.getArgbParamOrNone (index, allowNone);
this.checkLast (this.iToken);
return icolor;
}, "~N,~B");
Clazz_defineMethod (c$, "getArgbParamOrNone", 
function (index, allowNone) {
var pt = null;
if (this.checkToken (index)) {
switch (this.getToken (index).tok) {
default:
if (!JS.T.tokAttr (this.theTok, 1073741824)) break;
case 570425378:
case 4:
return JU.CU.getArgbFromString (this.paramAsStr (index));
case 1073742195:
return this.getColorTriad (index + 2);
case 268435520:
return this.getColorTriad (++index);
case 7:
var rgb = JS.SV.flistValue (this.theToken, 3);
if (rgb != null && rgb.length != 3) pt = JU.P3.new3 (rgb[0], rgb[1], rgb[2]);
break;
case 8:
pt = this.theToken.value;
break;
case 1073742332:
pt = this.getPoint3f (index, false, true);
break;
case 1073742333:
if (allowNone) return 0;
}
}if (pt == null) this.error (8);
return JU.CU.colorPtToFFRGB (pt);
}, "~N,~B");
Clazz_defineMethod (c$, "getColorTriad", 
 function (i) {
var colors =  Clazz_newFloatArray (3, 0);
var n = 0;
var hex = "";
this.getToken (i);
var pt = null;
var val = 0;
out : switch (this.theTok) {
case 2:
case 1073742362:
case 3:
for (; i < this.slen; i++) {
switch (this.getToken (i).tok) {
case 268435504:
continue;
case 1073741824:
if (n != 1 || colors[0] != 0) this.error (4);
hex = "0" + this.paramAsStr (i);
break out;
case 3:
if (n > 2) this.error (4);
val = this.floatParameter (i);
break;
case 2:
if (n > 2) this.error (4);
val = this.theToken.intValue;
break;
case 1073742362:
if (n > 2) this.error (4);
val = (this.theToken.value).intValue () % 256;
break;
case 268435521:
if (n != 3) this.error (4);
--i;
pt = JU.P3.new3 (colors[0], colors[1], colors[2]);
break out;
default:
this.error (4);
}
colors[n++] = val;
}
this.error (4);
break;
case 8:
pt = this.theToken.value;
break;
case 1073741824:
hex = this.paramAsStr (i);
break;
default:
this.error (4);
}
if (this.getToken (++i).tok != 268435521) this.error (4);
if (pt != null) return JU.CU.colorPtToFFRGB (pt);
if ((n = JU.CU.getArgbFromString ("[" + hex + "]")) == 0) this.error (4);
return n;
}, "~N");
Clazz_defineMethod (c$, "tickParamAsStr", 
function (index, allowUnitCell, allowScale, allowFirst) {
this.iToken = index - 1;
if (this.tokAt (index) != 1073742164) return null;
var tickInfo;
var str = " ";
switch (this.tokAt (index + 1)) {
case 1111492629:
case 1111492630:
case 1111492631:
str = this.paramAsStr (++index).toLowerCase ();
break;
case 1073741824:
this.invArg ();
}
if (this.tokAt (++index) == 1073742333) {
tickInfo =  new JM.TickInfo (null);
tickInfo.type = str;
this.iToken = index;
return tickInfo;
}tickInfo =  new JM.TickInfo (this.getPointOrPlane (index, false, true, false, false, 3, 3, true));
if (this.coordinatesAreFractional || this.tokAt (this.iToken + 1) == 1814695966) {
tickInfo.scale = JU.P3.new3 (NaN, NaN, NaN);
allowScale = false;
}if (this.tokAt (this.iToken + 1) == 1814695966) this.iToken++;
tickInfo.type = str;
if (this.tokAt (this.iToken + 1) == 1287653388) tickInfo.tickLabelFormats = this.stringParameterSet (this.iToken + 2);
if (!allowScale) return tickInfo;
if (this.tokAt (this.iToken + 1) == 1073742138) {
if (this.isFloatParameter (this.iToken + 2)) {
var f = this.floatParameter (this.iToken + 2);
tickInfo.scale = JU.P3.new3 (f, f, f);
} else {
tickInfo.scale = this.getPoint3f (this.iToken + 2, true, true);
}}if (allowFirst) if (this.tokAt (this.iToken + 1) == 1073741942) tickInfo.first = this.floatParameter (this.iToken + 2);
return tickInfo;
}, "~N,~B,~B,~B");
Clazz_defineMethod (c$, "setBooleanProperty", 
function (key, value) {
if (!this.chk) this.vwr.setBooleanProperty (key, value);
}, "~S,~B");
Clazz_defineMethod (c$, "setIntProperty", 
function (key, value) {
if (!this.chk) this.vwr.setIntProperty (key, value);
return true;
}, "~S,~N");
Clazz_defineMethod (c$, "setFloatProperty", 
function (key, value) {
if (!this.chk) this.vwr.setFloatProperty (key, value);
return true;
}, "~S,~N");
Clazz_defineMethod (c$, "setStringProperty", 
function (key, value) {
if (!this.chk) this.vwr.setStringProperty (key, value);
}, "~S,~S");
});
Clazz_declarePackage ("JS");
c$ = Clazz_decorateAsClass (function () {
this.processName = null;
this.context = null;
Clazz_instantialize (this, arguments);
}, JS, "ScriptProcess");
Clazz_makeConstructor (c$, 
function (name, context) {
this.processName = name;
this.context = context;
}, "~S,JS.ScriptContext");
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.ScriptProcessRunnable", ["JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.parallelProcessor = null;
this.process = null;
this.processLock = null;
this.shapeManager = null;
Clazz_instantialize (this, arguments);
}, JS, "ScriptProcessRunnable", null, Runnable);
Clazz_makeConstructor (c$, 
function (parallelProcessor, process, lock, shapeManager) {
this.parallelProcessor = parallelProcessor;
this.process = process;
this.processLock = lock;
this.shapeManager = shapeManager;
}, "JS.ScriptParallelProcessor,JS.ScriptProcess,~O,JV.ShapeManager");
Clazz_overrideMethod (c$, "run", 
function () {
try {
if (this.parallelProcessor.error == null) {
if (JU.Logger.debugging) JU.Logger.debug ("Running process " + this.process.processName + " " + this.process.context.pc + " - " + (this.process.context.pcEnd - 1));
this.parallelProcessor.eval (this.process.context, this.shapeManager);
if (JU.Logger.debugging) JU.Logger.debug ("Process " + this.process.processName + " complete");
}} catch (e$$) {
if (Clazz_exceptionOf (e$$, Exception)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz_exceptionOf (e$$, Error)) {
var er = e$$;
{
this.parallelProcessor.clearShapeManager (er);
}
} else {
throw e$$;
}
} finally {
{
--this.parallelProcessor.counter;
this.processLock.notifyAll ();
}}
});
});
Clazz_declarePackage ("JS");
Clazz_load (["J.thread.JmolThread"], "JS.ScriptQueueThread", ["JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.scriptManager = null;
this.startedByCommandThread = false;
this.pt = 0;
Clazz_instantialize (this, arguments);
}, JS, "ScriptQueueThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function (scriptManager, vwr, startedByCommandThread, pt) {
this.setViewer (vwr, "QueueThread" + pt);
this.scriptManager = scriptManager;
this.vwr = vwr;
this.startedByCommandThread = startedByCommandThread;
this.pt = pt;
}, "JS.ScriptManager,JV.Viewer,~B,~N");
Clazz_overrideMethod (c$, "run1", 
function (mode) {
while (true) {
switch (mode) {
case -1:
mode = 0;
break;
case 0:
if (this.stopped || this.scriptManager.getScriptQueue ().size () == 0) {
mode = -2;
break;
}if (!this.runNextScript () && !this.runSleep (100, 0)) {
return;
}break;
case -2:
this.scriptManager.queueThreadFinished (this.pt);
return;
}
}
}, "~N");
Clazz_defineMethod (c$, "runNextScript", 
 function () {
var queue = this.scriptManager.getScriptQueue ();
if (queue.size () == 0) {
return false;
}var scriptItem = this.scriptManager.getScriptItem (false, this.startedByCommandThread);
if (scriptItem == null) {
return false;
}var script = scriptItem.get (0);
var statusList = scriptItem.get (1);
var returnType = scriptItem.get (2);
var isQuiet = (scriptItem.get (3)).booleanValue ();
if (JU.Logger.debugging) {
JU.Logger.debug ("Queue[" + this.pt + "][" + queue.size () + "] scripts; running: " + script);
}queue.removeItemAt (0);
this.vwr.evalStringWaitStatusQueued (returnType, script, statusList, isQuiet, true);
if (queue.size () == 0) {
return false;
}return true;
});
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.ScriptTokenParser", ["java.lang.Boolean", "$.Float", "JU.Lst", "$.P3", "$.PT", "J.i18n.GT", "JS.ScriptParam", "$.T", "JU.Logger", "$.SimpleUnitCell"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.script = null;
this.isStateScript = false;
this.lineCurrent = 0;
this.iCommand = 0;
this.ichCurrentCommand = 0;
this.ichComment = 0;
this.ichEnd = 0;
this.ichToken = 0;
this.theToken = null;
this.lastFlowCommand = null;
this.tokenCommand = null;
this.lastToken = null;
this.tokenAndEquals = null;
this.theTok = 0;
this.nTokens = 0;
this.tokCommand = 0;
this.ptNewSetModifier = 0;
this.isNewSet = false;
this.haveMacro = false;
this.logMessages = true;
this.atokenInfix = null;
this.itokenInfix = 0;
this.isSetBrace = false;
this.isMathExpressionCommand = false;
this.isSetOrDefine = false;
this.ltokenPostfix = null;
this.isEmbeddedExpression = false;
this.isCommaAsOrAllowed = false;
this.theValue = null;
this.htUserFunctions = null;
this.haveString = false;
this.residueSpecCodeGenerated = false;
this.errorMessage = null;
this.errorMessageUntranslated = null;
this.errorLine = null;
this.errorType = null;
Clazz_instantialize (this, arguments);
}, JS, "ScriptTokenParser");
Clazz_defineMethod (c$, "compileExpressions", 
function () {
var isScriptExpression = ((this.tokCommand == 134222850 || this.tokCommand == 4124) && this.tokAt (2) == 268435472);
this.isEmbeddedExpression = (isScriptExpression || (this.tokCommand != 0 && (this.tokCommand != 134320141 && this.tokCommand != 102436 && this.tokCommand != 364558 && this.tokCommand != 102412 || this.tokenCommand.intValue != 2147483647) && this.tokCommand != 102409 && !JS.T.tokAttr (this.tokCommand, 12288) && (this.nTokens > 2 || !JS.T.tokAttr (this.tokCommand, 20480))));
this.isMathExpressionCommand = (this.tokCommand == 1073741824 || isScriptExpression || JS.T.tokAttr (this.tokCommand, 36864));
var checkExpression = this.isEmbeddedExpression || (JS.T.tokAttr (this.tokCommand, 12288));
if (this.tokAt (1) == 1073742330 && JS.T.tokAttr (this.tokCommand, 12288)) checkExpression = false;
if (checkExpression && !this.compileExpression ()) return false;
var size = this.atokenInfix.length;
var nDefined = 0;
for (var i = 1; i < size; i++) {
if (this.tokAt (i) == 12290) nDefined++;
}
size -= nDefined;
if (this.isNewSet) {
if (size == 1) {
this.atokenInfix[0] = JS.T.tv (134320141, 0, this.atokenInfix[0].value);
this.isNewSet = false;
}}if ((this.isNewSet || this.isSetBrace) && this.ptNewSetModifier != 2147483647 && size < this.ptNewSetModifier + 2) {
if (!this.isNewSet || !this.haveMacro) return this.commandExpected ();
this.htUserFunctions.put (this.atokenInfix[0].value, Boolean.TRUE);
}return (size == 1 || !JS.T.tokAttr (this.tokCommand, 262144) ? true : this.error (0));
});
Clazz_defineMethod (c$, "compileExpression", 
function () {
var firstToken = (this.isSetOrDefine && !this.isSetBrace ? 2 : 1);
this.ltokenPostfix =  new JU.Lst ();
this.itokenInfix = 0;
var tokenBegin = null;
var tok = this.tokAt (1);
switch (this.tokCommand) {
case 12290:
var i = (this.tokAt (1) == 12290 ? 2 : 1);
if (this.tokAt (i) == 2 && this.tokAt (i + 1) == 1073742336 && this.tokAt (i + 3) == 268435860) {
this.tokCommand = 36867;
this.isSetBrace = true;
this.ptNewSetModifier = i + 3;
this.isMathExpressionCommand = true;
this.isEmbeddedExpression = true;
this.addTokenToPostfixToken (JS.T.tokenSetProperty);
this.addTokenToPostfixToken (JS.T.tokenExpressionBegin);
for (var j = 0; j++ <= i; ) this.addNextToken ();

this.addTokenToPostfixToken (JS.T.tokenExpressionEnd);
firstToken = 0;
}break;
case 12295:
if (tok == 1677721602) firstToken = 2;
break;
case 1275082245:
switch (tok) {
case 1073742335:
case 1073742334:
tok = this.tokAt (++firstToken);
break;
}
case 12294:
case 1610625028:
switch (tok) {
case 1275069441:
case 1073742119:
tok = this.tokAt (++firstToken);
break;
}
if (tok == 1086324742 && !JS.T.tokAttr (this.tokAt (firstToken + 1), 268435456)) firstToken++;
}
for (var i = 0; i < firstToken && this.addNextToken (); i++) {
}
while (this.moreTokens ()) {
if (this.isEmbeddedExpression) {
while (!this.isExpressionNext ()) {
if (this.tokPeekIs (1073741824) && !(this.tokCommand == 134222849 && this.itokenInfix == 1)) {
var name = this.atokenInfix[this.itokenInfix].value;
var t = JS.T.getTokenFromName (name);
if (t != null) if (!this.isMathExpressionCommand && this.lastToken.tok != 12290 || (this.lastToken.tok == 1073742336 || this.tokAt (this.itokenInfix + 1) == 268435472) && !this.isUserFunction (name)) {
this.atokenInfix[this.itokenInfix] = t;
}}if (!this.addNextToken ()) break;
}
if (!this.moreTokens ()) break;
}if (this.lastToken.tok == 12290) {
if (!this.clauseDefine (true, false)) return false;
continue;
}if (!this.isMathExpressionCommand) this.addTokenToPostfixToken (tokenBegin = JS.T.o (1073742325, "implicitExpressionBegin"));
if (!this.clauseOr (this.isCommaAsOrAllowed || !this.isMathExpressionCommand && this.tokPeekIs (268435472))) return false;
if (!this.isMathExpressionCommand && !(this.isEmbeddedExpression && this.lastToken === JS.T.tokenCoordinateEnd)) {
this.addTokenToPostfixToken (JS.T.tokenExpressionEnd);
}if (this.moreTokens ()) {
if (this.tokCommand != 1275082245 && this.tokCommand != 12291 && !this.isEmbeddedExpression) return this.error (5);
if (this.tokCommand == 1275082245) {
tokenBegin.intValue = 0;
this.tokCommand = 0;
this.isEmbeddedExpression = true;
this.isMathExpressionCommand = true;
this.isCommaAsOrAllowed = false;
}}}
this.atokenInfix = this.ltokenPostfix.toArray ( new Array (this.ltokenPostfix.size ()));
return true;
});
Clazz_defineMethod (c$, "isUserFunction", 
function (name) {
name = name.toLowerCase ();
return (!this.isStateScript && (this.vwr.isFunction (name) || this.htUserFunctions.containsKey (name)));
}, "~S");
Clazz_defineMethod (c$, "isExpressionNext", 
 function () {
return this.tokPeekIs (1073742332) && !(this.tokAt (this.itokenInfix + 1) == 4 && this.tokAt (this.itokenInfix + 2) == 268435490) || !this.isMathExpressionCommand && this.tokPeekIs (268435472);
});
c$.tokenAttr = Clazz_defineMethod (c$, "tokenAttr", 
function (token, tok) {
return token != null && JS.T.tokAttr (token.tok, tok);
}, "JS.T,~N");
Clazz_defineMethod (c$, "moreTokens", 
 function () {
return (this.itokenInfix < this.atokenInfix.length);
});
Clazz_defineMethod (c$, "tokAt", 
function (i) {
return (i < this.atokenInfix.length ? this.atokenInfix[i].tok : 0);
}, "~N");
Clazz_defineMethod (c$, "tokPeek", 
 function () {
return (this.itokenInfix >= this.atokenInfix.length ? 0 : this.atokenInfix[this.itokenInfix].tok);
});
Clazz_defineMethod (c$, "tokPeekIs", 
 function (tok) {
return (this.tokAt (this.itokenInfix) == tok);
}, "~N");
Clazz_defineMethod (c$, "intPeek", 
 function () {
return (this.itokenInfix >= this.atokenInfix.length ? 2147483647 : this.atokenInfix[this.itokenInfix].intValue);
});
Clazz_defineMethod (c$, "valuePeek", 
 function () {
return (this.moreTokens () ? this.atokenInfix[this.itokenInfix].value : "");
});
Clazz_defineMethod (c$, "tokenNext", 
 function () {
return (this.itokenInfix >= this.atokenInfix.length ? null : this.atokenInfix[this.itokenInfix++]);
});
Clazz_defineMethod (c$, "tokenNextTok", 
 function (tok) {
var token = this.tokenNext ();
return (token != null && token.tok == tok);
}, "~N");
Clazz_defineMethod (c$, "returnToken", 
 function () {
this.itokenInfix--;
return false;
});
Clazz_defineMethod (c$, "getToken", 
 function () {
this.theValue = ((this.theToken = this.tokenNext ()) == null ? null : this.theToken.value);
return this.theToken;
});
Clazz_defineMethod (c$, "getNumericalToken", 
 function () {
return (this.getToken () != null && (this.theToken.tok == 2 || this.theToken.tok == 3));
});
Clazz_defineMethod (c$, "floatValue", 
 function () {
switch (this.theToken.tok) {
case 2:
return this.theToken.intValue;
case 3:
return (this.theValue).floatValue ();
}
return 0;
});
Clazz_defineMethod (c$, "addTokenToPostfix", 
 function (tok, value) {
return this.addTokenToPostfixToken (JS.T.o (tok, value));
}, "~N,~O");
Clazz_defineMethod (c$, "addTokenToPostfixInt", 
 function (tok, intValue, value) {
return this.addTokenToPostfixToken (JS.T.tv (tok, intValue, value));
}, "~N,~N,~O");
Clazz_defineMethod (c$, "addTokenToPostfixToken", 
 function (token) {
if (token == null) return false;
if (this.logMessages) JU.Logger.debug ("addTokenToPostfix" + token);
if (token.tok == 268435520 && (this.lastToken.tok == 1073742336 || this.lastToken.tok == 1073742337)) {
var ipt = this.ltokenPostfix.size () - 1;
this.ltokenPostfix.removeItemAt (ipt);
this.ltokenPostfix.addLast (JS.T.tokenRightParen);
var pcount = 0;
var tok;
for (var i = this.ltokenPostfix.size (); --i >= 0 && pcount >= 0; ) {
switch (tok = this.ltokenPostfix.get (i).tok) {
case 268435473:
case 268435521:
pcount++;
break;
case 268435472:
case 268435520:
pcount--;
var tok2;
if (pcount == 1 && (tok2 = this.ltokenPostfix.get (i - 1).tok) != 268435473 && tok2 != 268435521) {
ipt = (tok == 268435520 ? i - 1 : i);
pcount = -10;
}break;
default:
tok2 = (i == 0 ? 0 : this.ltokenPostfix.get (i - 1).tok);
if (tok2 == 1073742336 || tok2 == 1073742337) {
ipt = i - 1;
break;
}if (i == ipt - 1) {
ipt = i;
pcount = -10;
}break;
}
}
if (pcount == -10) {
this.ltokenPostfix.add (ipt, JS.T.tokenLeftParen);
}}this.ltokenPostfix.addLast (token);
this.lastToken = token;
return true;
}, "JS.T");
Clazz_defineMethod (c$, "addNextToken", 
 function () {
return this.addTokenToPostfixToken (this.tokenNext ());
});
Clazz_defineMethod (c$, "addNextTokenIf", 
 function (tok) {
return (this.tokPeekIs (tok) && this.addNextToken ());
}, "~N");
Clazz_defineMethod (c$, "addSubstituteTokenIf", 
 function (tok, token) {
if (!this.tokPeekIs (tok)) return false;
this.itokenInfix++;
return this.addTokenToPostfixToken (token);
}, "~N,JS.T");
Clazz_defineMethod (c$, "clauseOr", 
 function (allowCommaAsOr) {
this.haveString = false;
if (!this.clauseAnd ()) return false;
if (this.isEmbeddedExpression && this.lastToken.tok == 1073742326) return true;
var tok;
while ((tok = this.tokPeek ()) == 268435536 || tok == 268435537 || tok == 268435538 || allowCommaAsOr && tok == 268435504) {
if (tok == 268435504 && !this.haveString) this.addSubstituteTokenIf (268435504, JS.T.tokenOr);
 else this.addNextToken ();
if (!this.clauseAnd ()) return false;
if (allowCommaAsOr && (this.lastToken.tok == 1073742338 || this.lastToken.tok == 10)) this.haveString = true;
}
return true;
}, "~B");
Clazz_defineMethod (c$, "clauseAnd", 
 function () {
if (!this.clauseNot ()) return false;
if (this.isEmbeddedExpression && this.lastToken.tok == 1073742326) return true;
while (this.tokPeekIs (268435552)) {
this.addNextToken ();
if (!this.clauseNot ()) return false;
}
return true;
});
Clazz_defineMethod (c$, "clauseNot", 
 function () {
if (this.tokPeekIs (268435568)) {
this.addNextToken ();
return this.clauseNot ();
}return (this.clausePrimitive ());
});
Clazz_defineMethod (c$, "clausePrimitive", 
 function () {
var tok = this.tokPeek ();
switch (tok) {
case 1073742195:
this.itokenInfix++;
return this.clausePrimitive ();
case 0:
return this.error (4);
case 1073742327:
case 10:
case 268435632:
case 136314895:
case 2097160:
case 2097159:
case 2097162:
case 1073742331:
case 1073742333:
case 2097184:
return this.addNextToken ();
case 4:
this.haveString = true;
return this.addNextToken ();
case 3:
return this.addTokenToPostfixInt (1073742359, this.fixModelSpec (this.getToken ()), this.theValue);
case 1094713349:
case 1094713350:
return this.clauseCell (tok);
case 134217736:
case 1275203608:
return this.clauseConnected (tok == 1275203608);
case 134218756:
case 134218757:
return this.clauseSubstructure ();
case 134217759:
case 134353926:
return this.clauseWithin (tok == 134217759);
case 12290:
return this.clauseDefine (false, false);
case 1677721602:
case 1745489939:
this.addNextToken ();
if (this.tokPeekIs (10)) this.addNextToken ();
 else if (this.tokPeekIs (12290)) return this.clauseDefine (false, false);
return true;
case 268435472:
this.addNextToken ();
if (!this.clauseOr (true)) return false;
if (!this.addNextTokenIf (268435473)) return this.errorStr (15, ")");
return this.checkForItemSelector (true);
case 1073742332:
return this.checkForCoordinate (this.isMathExpressionCommand);
default:
if (this.clauseResidueSpec ()) return true;
if (this.isError ()) return false;
if (JS.T.tokAttr (tok, 1077936128)) {
var itemp = this.itokenInfix;
var isOK = this.clauseComparator (true);
if (isOK || this.itokenInfix != itemp) return isOK;
if (tok == 1237320707) {
return this.clauseSubstructure ();
}}return this.addNextToken ();
}
});
Clazz_defineMethod (c$, "checkForCoordinate", 
 function (isImplicitExpression) {
var isCoordinate = false;
var pt = this.ltokenPostfix.size ();
if (isImplicitExpression) {
this.addTokenToPostfixToken (JS.T.tokenExpressionBegin);
this.tokenNext ();
} else if (this.isEmbeddedExpression) {
this.tokenNext ();
pt--;
} else {
this.addNextToken ();
}var isHash = this.tokPeekIs (4);
if (isHash) {
isImplicitExpression = false;
this.returnToken ();
this.ltokenPostfix.removeItemAt (this.ltokenPostfix.size () - 1);
this.addNextToken ();
var nBrace = 1;
while (nBrace != 0) {
if (this.tokPeekIs (1073742332)) {
if (this.isExpressionNext ()) {
this.addTokenToPostfixToken (JS.T.o (1073742325, "implicitExpressionBegin"));
if (!this.clauseOr (false)) return false;
if (this.lastToken !== JS.T.tokenCoordinateEnd) {
this.addTokenToPostfixToken (JS.T.tokenExpressionEnd);
}} else {
nBrace++;
}}if (this.tokPeekIs (1073742338)) nBrace--;
this.addNextToken ();
}
} else {
if (!this.tokPeekIs (1073742338) && !this.clauseOr (false)) return false;
var n = 1;
while (!this.tokPeekIs (1073742338)) {
var haveComma = this.addNextTokenIf (268435504);
if (!this.clauseOr (false)) return (haveComma || n < 3 ? false : this.errorStr (15, "}"));
n++;
}
isCoordinate = (n >= 2);
}if (isCoordinate && (isImplicitExpression || this.isEmbeddedExpression)) {
this.ltokenPostfix.set (pt, JS.T.tokenCoordinateBegin);
this.addTokenToPostfixToken (JS.T.tokenCoordinateEnd);
this.tokenNext ();
} else if (isImplicitExpression) {
this.addTokenToPostfixToken (JS.T.tokenExpressionEnd);
this.tokenNext ();
} else if (this.isEmbeddedExpression) {
if (!isHash) this.tokenNext ();
} else {
this.addNextToken ();
}return this.checkForItemSelector (!isHash);
}, "~B");
Clazz_defineMethod (c$, "checkForItemSelector", 
 function (allowNumeric) {
var tok;
if ((tok = this.tokAt (this.itokenInfix + 1)) == 268435520 || allowNumeric && tok == 1073742332) return true;
while (true) {
if (!this.addNextTokenIf (268435520)) break;
if (!this.clauseItemSelector ()) return false;
if (!this.addNextTokenIf (268435521)) return this.errorStr (15, "]");
}
return true;
}, "~B");
Clazz_defineMethod (c$, "clauseWithin", 
 function (isWithin) {
this.addNextToken ();
if (!this.addNextTokenIf (268435472)) return false;
if (this.getToken () == null) return false;
var distance = 3.4028235E38;
var key = null;
var allowComma = isWithin;
var tok;
var tok0 = this.theToken.tok;
if (!isWithin) {
tok = -1;
for (var i = this.itokenInfix; tok != 0; i++) {
switch (tok = this.tokAt (i)) {
case 268435504:
tok = 0;
break;
case 1073742332:
case 268435472:
case 268435473:
distance = 100;
this.returnToken ();
tok0 = tok = 0;
break;
}
}
}switch (tok0) {
case 268435616:
if (this.getToken () == null) return false;
if (this.theToken.tok != 2) return this.error (12);
distance = -this.theToken.intValue;
break;
case 2:
case 3:
distance = this.floatValue ();
break;
case 12290:
this.addTokenToPostfixToken (this.theToken);
if (!this.clauseDefine (true, false)) return false;
key = "";
allowComma = false;
break;
}
if (isWithin && distance == 3.4028235E38) switch (tok0) {
case 12290:
break;
case 1111490587:
case 1073742128:
case 134218756:
case 134218757:
case 1237320707:
case 1073741925:
case 1073742189:
this.addTokenToPostfix (4, this.theValue);
if (!this.addNextTokenIf (268435504)) return false;
allowComma = false;
tok = this.tokPeek ();
switch (tok) {
case 0:
return false;
case 4:
this.addNextToken ();
key = "";
break;
case 12290:
if (!this.clauseDefine (false, true)) return false;
key = "";
break;
default:
return false;
}
break;
case 1073742328:
allowComma = false;
case 1086326785:
case 1086326786:
case 1073741863:
case 1678381065:
case 1086326788:
case 1073742329:
case 1086326789:
case 1086324742:
case 1814695966:
case 136314895:
case 1094717454:
case 1094713360:
case 134217750:
case 134219265:
case 1094713362:
case 1086324744:
case 2097184:
case 1094713366:
case 1639976963:
case 4:
case 1648363544:
key = this.theValue;
break;
default:
key = (this.theValue).toLowerCase ();
break;
}
if (key == null) this.addTokenToPostfix (3, Float.$valueOf (distance));
 else if (key.length > 0) this.addTokenToPostfix (4, key);
var done = false;
while (!done) {
if (tok0 != 0 && !this.addNextTokenIf (268435504)) break;
if (tok0 == 0) tok0 = 134353926;
var isCoordOrPlane = false;
tok = this.tokPeek ();
if (isWithin) {
switch (tok0) {
case 2:
case 3:
if (tok == 1073742335 || tok == 1073742334) {
this.addTokenToPostfixToken (this.getToken ());
if (!this.addNextTokenIf (268435504)) break;
tok = this.tokPeek ();
}break;
}
if (key == null) {
switch (tok) {
case 134219265:
case 1073742329:
case 134217750:
isCoordOrPlane = true;
this.addNextToken ();
break;
case 1073742330:
this.getToken ();
this.getToken ();
this.addTokenToPostfix (4, "$" + this.theValue);
done = true;
break;
case 1086324742:
case 1648363544:
case 1814695966:
this.getToken ();
this.addTokenToPostfix (4, JS.T.nameOf (tok));
break;
case 1073742332:
this.returnToken ();
isCoordOrPlane = true;
this.addTokenToPostfixToken (JS.T.getTokenFromName (distance == 3.4028235E38 ? "plane" : "coord"));
}
if (!done) this.addNextTokenIf (268435504);
}}tok = this.tokPeek ();
if (done) break;
if (isCoordOrPlane) {
while (!this.tokPeekIs (268435473)) {
switch (this.tokPeek ()) {
case 0:
return this.error (4);
case 268435472:
this.addTokenToPostfixToken (JS.T.tokenExpressionBegin);
this.addNextToken ();
if (!this.clauseOr (false)) return this.errorIntStr2 (18, "WITHIN", ": ?");
if (!this.addNextTokenIf (268435473)) return this.errorStr (15, ", / )");
this.addTokenToPostfixToken (JS.T.tokenExpressionEnd);
break;
case 12290:
if (!this.clauseDefine (false, false)) return false;
break;
default:
this.addTokenToPostfixToken (this.getToken ());
}
}
} else if (!this.clauseOr (allowComma)) {
}}
if (!this.addNextTokenIf (268435473)) return this.errorStr (15, ")");
return true;
}, "~B");
Clazz_defineMethod (c$, "clauseConnected", 
 function (isPolyhedra) {
this.addNextToken ();
if (!this.addNextTokenIf (268435472)) {
this.addTokenToPostfixToken (JS.T.tokenLeftParen);
this.addTokenToPostfixToken (JS.T.tokenRightParen);
return true;
}while (true) {
if (this.addNextTokenIf (2)) {
if (!this.addNextTokenIf (268435504)) {
break;
}if (isPolyhedra) {
this.returnToken ();
break;
}} else if (isPolyhedra && (this.addNextTokenIf (4) || this.addNextTokenIf (1073741824))) {
break;
}if (this.addNextTokenIf (2)) if (!this.addNextTokenIf (268435504)) break;
if (this.addNextTokenIf (3)) if (!this.addNextTokenIf (268435504)) break;
if (this.addNextTokenIf (3)) if (!this.addNextTokenIf (268435504)) break;
var o = this.getToken ().value;
var strOrder = (Clazz_instanceOf (o, String) ? o : " ");
var intType = JS.ScriptParam.getBondOrderFromString (strOrder);
if (intType == 131071) {
this.returnToken ();
} else {
this.addTokenToPostfix (4, strOrder);
if (!this.addNextTokenIf (268435504)) break;
}if (this.addNextTokenIf (268435473)) return true;
if (!this.clauseOr (this.tokPeekIs (268435472))) return false;
if (this.addNextTokenIf (268435473)) return true;
if (!this.addNextTokenIf (268435504)) return false;
if (!this.clauseOr (this.tokPeekIs (268435472))) return false;
break;
}
if (!this.addNextTokenIf (268435473)) return this.errorStr (15, ")");
return true;
}, "~B");
Clazz_defineMethod (c$, "clauseSubstructure", 
 function () {
this.addNextToken ();
if (!this.addNextTokenIf (268435472)) return false;
if (this.tokPeekIs (12290)) {
if (!this.clauseDefine (false, true)) return false;
} else if (!this.addNextTokenIf (4)) {
return this.errorStr (15, "\"...\"");
}if (this.addNextTokenIf (268435504)) if (!this.clauseOr (this.tokPeekIs (268435472))) return false;
if (!this.addNextTokenIf (268435473)) return this.errorStr (15, ")");
return true;
});
Clazz_defineMethod (c$, "clauseItemSelector", 
 function () {
var tok;
var nparen = 0;
while ((tok = this.tokPeek ()) != 0 && tok != 268435521) {
this.addNextToken ();
if (tok == 268435520) nparen++;
if (this.tokPeek () == 268435521 && nparen-- > 0) this.addNextToken ();
}
return true;
});
Clazz_defineMethod (c$, "clauseComparator", 
 function (isOptional) {
var tokenAtomProperty = this.tokenNext ();
var tokenComparator = this.tokenNext ();
if (!JS.ScriptTokenParser.tokenAttr (tokenComparator, 268435712)) {
if (!isOptional) return this.errorStr (15, "== != < > <= >=");
if (tokenComparator != null) this.returnToken ();
this.returnToken ();
return false;
}if (JS.ScriptTokenParser.tokenAttr (tokenAtomProperty, 1086324736) && tokenComparator.tok != 268435860 && tokenComparator.tok != 268435862 && tokenComparator.tok != 268435861) return this.errorStr (15, "== !=");
if (this.tokPeek () == 268435520) {
this.getToken ();
this.addTokenToPostfixToken (JS.T.tokenLeftParen);
while (true) {
if (!this.addCompare (tokenAtomProperty, tokenComparator)) return false;
if (this.tokPeek () == 268435504) this.getToken ();
 else if (this.tokPeek () == 268435521) break;
this.addTokenToPostfixToken (tokenComparator.tok == 268435861 ? JS.T.tokenAnd : JS.T.tokenOr);
}
this.getToken ();
this.addTokenToPostfixToken (JS.T.tokenRightParen);
return true;
}return this.addCompare (tokenAtomProperty, tokenComparator);
}, "~B");
Clazz_defineMethod (c$, "addCompare", 
 function (tokenAtomProperty, tokenComparator) {
if (this.getToken () == null) return this.errorStr (17, "" + this.valuePeek ());
var isNegative = (this.theToken.tok == 268435616);
if (isNegative && this.getToken () == null) return this.error (12);
switch (this.theToken.tok) {
case 2:
case 3:
case 1073741824:
case 4:
case 1073742332:
case 12290:
break;
default:
if (!JS.T.tokAttr (this.theToken.tok, 1073741824)) return this.error (13);
}
this.addTokenToPostfixInt (tokenComparator.tok, tokenAtomProperty.tok, tokenComparator.value + (isNegative ? " -" : ""));
if (tokenAtomProperty.tok == 1715472409) this.addTokenToPostfixToken (tokenAtomProperty);
if (this.theToken.tok == 1073742332) {
this.returnToken ();
return this.clausePrimitive ();
}this.addTokenToPostfixToken (this.theToken);
if (this.theToken.tok == 12290) return this.clauseDefine (true, false);
return true;
}, "JS.T,JS.T");
Clazz_defineMethod (c$, "clauseCell", 
 function (tok) {
var cell =  new JU.P3 ();
this.tokenNext ();
if (!this.tokenNextTok (268435860)) return this.errorStr (15, "=");
if (this.getToken () == null) return this.error (3);
if (this.theToken.tok == 2) {
JU.SimpleUnitCell.ijkToPoint3f (this.theToken.intValue, cell, 1, 0);
return this.addTokenToPostfix (tok, cell);
}if (this.theToken.tok != 1073742332 || !this.getNumericalToken ()) return this.error (3);
cell.x = this.floatValue ();
if (this.tokPeekIs (268435504)) this.tokenNext ();
if (!this.getNumericalToken ()) return this.error (3);
cell.y = this.floatValue ();
if (this.tokPeekIs (268435504)) this.tokenNext ();
if (!this.getNumericalToken () || !this.tokenNextTok (1073742338)) return this.error (3);
cell.z = this.floatValue ();
return this.addTokenToPostfix (tok, cell);
}, "~N");
Clazz_defineMethod (c$, "clauseDefine", 
 function (haveToken, forceString) {
if (!haveToken) {
var token = this.tokenNext ();
if (forceString) token = JS.T.tokenDefineString;
this.addTokenToPostfixToken (token);
}if (this.tokPeekIs (0)) return this.error (4);
if (!this.addSubstituteTokenIf (1073742332, JS.T.tokenExpressionBegin)) {
if (this.tokPeek () == 12290) this.addNextToken ();
return this.addNextToken () && this.checkForItemSelector (true);
}while (this.moreTokens () && !this.tokPeekIs (1073742338)) {
if (this.tokPeekIs (1073742332)) {
if (!this.checkForCoordinate (true)) return false;
} else {
this.addNextToken ();
}}
return this.addSubstituteTokenIf (1073742338, JS.T.tokenExpressionEnd) && this.checkForItemSelector (true);
}, "~B,~B");
Clazz_defineMethod (c$, "generateResidueSpecCode", 
 function (token) {
if (this.residueSpecCodeGenerated) this.addTokenToPostfixToken (JS.T.tokenAndSpec);
this.addTokenToPostfixToken (token);
this.residueSpecCodeGenerated = true;
return true;
}, "JS.T");
Clazz_defineMethod (c$, "clauseResidueSpec", 
 function () {
var tok = this.tokPeek ();
this.residueSpecCodeGenerated = false;
var checkResNameSpec = false;
switch (tok) {
case 0:
case 2097156:
case 2097174:
return false;
case 2:
case 268435490:
case 268435634:
case 5:
break;
case 268435633:
case 268435520:
case 1073741824:
checkResNameSpec = true;
break;
default:
if (JS.T.tokAttr (tok, 268435712)) return false;
var str = "" + this.valuePeek ();
checkResNameSpec = (str.length == 2 || str.length == 3);
if (!checkResNameSpec) return false;
}
var specSeen = false;
if (checkResNameSpec) {
if (!this.clauseResNameSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
}if (tok == 2 || tok == 268435633 || tok == 5) {
if (!this.clauseSequenceSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
}if (tok == 268435490) {
if (!this.clauseChainSpec (tok)) return false;
specSeen = true;
tok = this.tokPeek ();
}if (tok == 1073742336) {
if (!this.clauseAtomSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
}if (tok == 268435634) {
if (!this.clauseAlternateSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
}if (tok == 268435632) {
if (!this.clauseModelSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
}if (!specSeen) return this.error (14);
if (!this.residueSpecCodeGenerated) {
this.addTokenToPostfixToken (JS.T.tokenAll);
}return true;
});
Clazz_defineMethod (c$, "clauseResNameSpec", 
 function () {
this.getToken ();
var tok = this.tokPeek ();
switch (this.theToken.tok) {
case 268435633:
return true;
case 268435520:
var strSpec = "";
while (this.getToken () != null && this.theToken.tok != 268435521) strSpec += this.theValue;

if (this.theToken == null) return false;
if (strSpec === "") return true;
var pt;
return (strSpec.length > 0 && (pt = strSpec.indexOf ("*")) >= 0 && pt != strSpec.length - 1 ? this.error (14) : this.generateResidueSpecCode (JS.T.o (1073742360, strSpec.toUpperCase ())));
default:
if (JS.T.tokAttr (tok, 268435712)) {
this.returnToken ();
return false;
}var res = this.theValue;
if (tok == 268435633) {
res = this.theValue + "*";
this.getToken ();
}return this.generateResidueSpecCode (JS.T.o (1073741824, res));
}
});
Clazz_defineMethod (c$, "clauseSequenceSpec", 
 function () {
if (this.tokPeek () == 268435633) return (this.getToken () != null);
var seqToken = this.getSequenceCode (false);
if (seqToken == null) return false;
var tok = this.tokPeek ();
if (tok == 268435616 || tok == 2 && this.intPeek () < 0) {
if (tok == 268435616) {
this.tokenNext ();
} else {
var i = -this.intPeek ();
this.tokenNext ().intValue = i;
this.returnToken ();
}seqToken.tok = 1073742363;
this.generateResidueSpecCode (seqToken);
return this.addTokenToPostfixToken (this.getSequenceCode (true));
}return this.generateResidueSpecCode (seqToken);
});
Clazz_defineMethod (c$, "getSequenceCode", 
 function (isSecond) {
var seqcode = 2147483647;
var seqvalue = 2147483647;
switch (this.tokPeek ()) {
case 5:
seqcode = this.tokenNext ().intValue;
break;
case 2:
seqvalue = this.tokenNext ().intValue;
break;
default:
if (!isSecond) return null;
}
return JS.T.tv (1073742362, seqvalue, Integer.$valueOf (seqcode));
}, "~B");
Clazz_defineMethod (c$, "clauseChainSpec", 
 function (tok) {
this.tokenNext ();
tok = this.tokPeek ();
var strChain;
if (this.isTerminator (tok)) {
strChain = " ";
} else {
switch (tok) {
case 268435633:
return (this.getToken () != null);
case 2:
this.getToken ();
var val = this.theToken.intValue;
if (val < 0 || val > 9999) return this.error (8);
strChain = "" + val;
break;
case 4:
this.vwr.getChainID ("a", true);
default:
strChain = "" + this.getToken ().value;
break;
}
if (strChain.length == 0) strChain = " ";
 else if (strChain.equals ("?")) return true;
}var chain = this.vwr.getChainID (strChain, false);
return this.generateResidueSpecCode (JS.T.tv (1073742357, chain, "spec_chain"));
}, "~N");
Clazz_defineMethod (c$, "clauseAlternateSpec", 
 function () {
this.tokenNext ();
if (this.isTerminator (this.tokPeek ())) return this.generateResidueSpecCode (JS.T.o (1073742355, null));
switch (this.getToken ().tok) {
case 268435633:
case 4:
case 2:
case 1073741824:
case 805306401:
case 1111492629:
case 1111492630:
case 1111492631:
case 1140850705:
break;
default:
return this.error (10);
}
return this.generateResidueSpecCode (JS.T.o (1073742355, this.theToken.value));
});
Clazz_defineMethod (c$, "isTerminator", 
 function (tok) {
switch (tok) {
case 0:
case 268435632:
case 268435552:
case 268435536:
case 268435568:
case 268435504:
case 268435473:
case 1073742338:
return true;
default:
return false;
}
}, "~N");
Clazz_defineMethod (c$, "clauseModelSpec", 
 function () {
this.getToken ();
switch (this.tokPeek ()) {
case 268435633:
this.getToken ();
return true;
case 2:
return this.generateResidueSpecCode (JS.T.o (1073742358, Integer.$valueOf (this.getToken ().intValue)));
case 3:
return this.generateResidueSpecCode (JS.T.tv (1073742358, this.fixModelSpec (this.getToken ()), this.theValue));
case 268435504:
case 1073742338:
case 0:
return this.generateResidueSpecCode (JS.T.o (1073742358, Integer.$valueOf (1)));
}
return this.error (10);
});
Clazz_defineMethod (c$, "fixModelSpec", 
 function (token) {
var ival = token.intValue;
if (ival == 2147483647) {
var f = (this.theValue).floatValue ();
if (f == Clazz_floatToInt (f)) ival = (Clazz_floatToInt (f)) * 1000000;
if (ival < 0) ival = 2147483647;
}return ival;
}, "JS.T");
Clazz_defineMethod (c$, "clauseAtomSpec", 
 function () {
if (!this.tokenNextTok (1073742336)) return this.error (7);
if (this.getToken () == null) return true;
var atomSpec = "";
if (this.theToken.tok == 2) {
atomSpec += "" + this.theToken.intValue;
if (this.getToken () == null) return this.error (7);
}if (this.theToken.tok == 268435633) return true;
atomSpec += "" + this.theToken.value;
if (this.tokPeekIs (268435633)) {
this.tokenNext ();
atomSpec += "'";
}return this.generateResidueSpecCode (JS.T.tv (1073742356, this.vwr.getJBR ().lookupSpecialAtomID (atomSpec.toUpperCase ()), atomSpec));
});
c$.errorString = Clazz_defineMethod (c$, "errorString", 
function (iError, value, more, translated) {
var doTranslate = false;
if (!translated && (doTranslate = J.i18n.GT.getDoTranslate ()) == true) J.i18n.GT.setDoTranslate (false);
var msg;
switch (iError) {
default:
msg = "Unknown compiler error message number: " + iError;
break;
case 0:
msg = J.i18n.GT.$ ("bad argument count");
break;
case 1:
msg = J.i18n.GT.$ ("invalid context for {0}");
break;
case 2:
msg = J.i18n.GT.$ ("command expected");
break;
case 3:
msg = J.i18n.GT.$ ("{ number number number } expected");
break;
case 4:
msg = J.i18n.GT.$ ("unexpected end of script command");
break;
case 5:
msg = J.i18n.GT.$ ("end of expression expected");
break;
case 6:
msg = J.i18n.GT.$ ("identifier or residue specification expected");
break;
case 7:
msg = J.i18n.GT.$ ("invalid atom specification");
break;
case 8:
msg = J.i18n.GT.$ ("invalid chain specification");
break;
case 9:
msg = J.i18n.GT.$ ("invalid expression token: {0}");
break;
case 10:
msg = J.i18n.GT.$ ("invalid model specification");
break;
case 11:
msg = J.i18n.GT.$ ("missing END for {0}");
break;
case 12:
msg = J.i18n.GT.$ ("number expected");
break;
case 13:
msg = J.i18n.GT.$ ("number or variable name expected");
break;
case 14:
msg = J.i18n.GT.$ ("residue specification (ALA, AL?, A*) expected");
break;
case 15:
msg = J.i18n.GT.$ ("{0} expected");
break;
case 16:
msg = J.i18n.GT.$ ("{0} unexpected");
break;
case 17:
msg = J.i18n.GT.$ ("unrecognized expression token: {0}");
break;
case 18:
msg = J.i18n.GT.$ ("unrecognized {0} parameter");
break;
case 19:
msg = J.i18n.GT.$ ("unrecognized token: {0}");
break;
}
if (msg.indexOf ("{0}") < 0) {
if (value != null) msg += ": " + value;
} else {
msg = JU.PT.rep (msg, "{0}", value);
if (msg.indexOf ("{1}") >= 0) msg = JU.PT.rep (msg, "{1}", more);
 else if (more != null) msg += ": " + more;
}if (!translated) J.i18n.GT.setDoTranslate (doTranslate);
return msg;
}, "~N,~S,~S,~B");
Clazz_defineMethod (c$, "commandExpected", 
function () {
this.ichToken = this.ichCurrentCommand;
return this.error (2);
});
Clazz_defineMethod (c$, "error", 
function (error) {
return this.errorIntStr2 (error, null, null);
}, "~N");
Clazz_defineMethod (c$, "errorStr", 
function (error, value) {
return this.errorIntStr2 (error, value, null);
}, "~N,~S");
Clazz_defineMethod (c$, "errorIntStr2", 
function (iError, value, more) {
var strError = JS.ScriptTokenParser.errorString (iError, value, more, true);
var strUntranslated = (J.i18n.GT.getDoTranslate () ? JS.ScriptTokenParser.errorString (iError, value, more, false) : null);
return this.errorStr2 (strError, strUntranslated);
}, "~N,~S,~S");
Clazz_defineMethod (c$, "isError", 
 function () {
return this.errorMessage != null;
});
Clazz_defineMethod (c$, "errorStr2", 
function (errorMessage, strUntranslated) {
this.errorMessage = errorMessage;
this.errorMessageUntranslated = strUntranslated;
return false;
}, "~S,~S");
Clazz_defineStatics (c$,
"ERROR_badArgumentCount", 0,
"ERROR_badContext", 1,
"ERROR_commandExpected", 2,
"ERROR_endOfCommandUnexpected", 4,
"ERROR_invalidExpressionToken", 9,
"ERROR_missingEnd", 11,
"ERROR_tokenExpected", 15,
"ERROR_tokenUnexpected", 16,
"ERROR_unrecognizedParameter", 18,
"ERROR_unrecognizedToken", 19,
"ERROR_coordinateExpected", 3,
"ERROR_endOfExpressionExpected", 5,
"ERROR_identifierOrResidueSpecificationExpected", 6,
"ERROR_invalidAtomSpecification", 7,
"ERROR_invalidChainSpecification", 8,
"ERROR_invalidModelSpecification", 10,
"ERROR_numberExpected", 12,
"ERROR_numberOrVariableNameExpected", 13,
"ERROR_residueSpecificationExpected", 14,
"ERROR_unrecognizedExpressionToken", 17);
});
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
