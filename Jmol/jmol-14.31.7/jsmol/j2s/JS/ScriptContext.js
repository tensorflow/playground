Clazz.declarePackage ("JS");
Clazz.load (null, "JS.ScriptContext", ["java.util.Hashtable", "JS.SV"], function () {
c$ = Clazz.decorateAsClass (function () {
this.aatoken = null;
this.allowJSThreads = false;
this.chk = false;
this.contextPath = " >> ";
this.vars = null;
this.displayLoadErrorsSave = false;
this.errorMessage = null;
this.errorMessageUntranslated = null;
this.errorType = null;
this.executionPaused = false;
this.executionStepping = false;
this.functionName = null;
this.iCommandError = -1;
this.id = 0;
this.isComplete = true;
this.isFunction = false;
this.isJSThread = false;
this.isStateScript = false;
this.isTryCatch = false;
this.forVars = null;
this.iToken = 0;
this.lineEnd = 2147483647;
this.lineIndices = null;
this.lineNumbers = null;
this.mustResumeEval = false;
this.outputBuffer = null;
this.parallelProcessor = null;
this.parentContext = null;
this.pc = 0;
this.pc0 = 0;
this.pcEnd = 2147483647;
this.script = null;
this.scriptExtensions = null;
this.scriptFileName = null;
this.scriptLevel = 0;
this.statement = null;
this.htFileCache = null;
this.statementLength = 0;
this.token = null;
this.tryPt = 0;
this.theToken = null;
this.theTok = 0;
this.pointers = null;
Clazz.instantialize (this, arguments);
}, JS, "ScriptContext");
Clazz.makeConstructor (c$, 
function () {
this.id = ++JS.ScriptContext.contextCount;
});
Clazz.defineMethod (c$, "setMustResume", 
function () {
var sc = this;
while (sc != null) {
sc.mustResumeEval = true;
sc.pc = sc.pc0;
sc = sc.parentContext;
}
});
Clazz.defineMethod (c$, "getVariable", 
function ($var) {
var context = this;
while (context != null && !context.isFunction) {
if (context.vars != null && context.vars.containsKey ($var)) return context.vars.get ($var);
context = context.parentContext;
}
return null;
}, "~S");
Clazz.defineMethod (c$, "getFullMap", 
function () {
var ht =  new java.util.Hashtable ();
var context = this;
if (this.contextPath != null) ht.put ("_path", JS.SV.newS (this.contextPath));
while (context != null && !context.isFunction) {
if (context.vars != null) for (var key, $key = context.vars.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) if (!ht.containsKey (key)) {
var val = context.vars.get (key);
if (val.tok != 2 || val.intValue != 2147483647) ht.put (key, val);
}
context = context.parentContext;
}
return ht;
});
Clazz.defineMethod (c$, "saveTokens", 
function (aa) {
this.aatoken = aa;
if (aa == null) {
this.pointers = null;
return;
}this.pointers =  Clazz.newIntArray (aa.length, 0);
for (var i = this.pointers.length; --i >= 0; ) this.pointers[i] = (aa[i] == null ? -1 : aa[i][0].intValue);

}, "~A");
Clazz.defineMethod (c$, "restoreTokens", 
function () {
if (this.pointers != null) for (var i = this.pointers.length; --i >= 0; ) if (this.aatoken[i] != null) this.aatoken[i][0].intValue = this.pointers[i];

return this.aatoken;
});
Clazz.defineMethod (c$, "getTokenCount", 
function () {
return (this.aatoken == null ? -1 : this.aatoken.length);
});
Clazz.defineMethod (c$, "getToken", 
function (i) {
return this.aatoken[i];
}, "~N");
Clazz.defineStatics (c$,
"contextCount", 0);
});
