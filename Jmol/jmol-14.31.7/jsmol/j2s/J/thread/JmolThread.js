Clazz.declarePackage ("J.thread");
Clazz.load (["java.lang.Thread"], "J.thread.JmolThread", ["JU.Logger", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$name = "JmolThread";
this.vwr = null;
this.eval = null;
this.sc = null;
this.haveReference = false;
this.hoverEnabled = false;
this.startTime = 0;
this.targetTime = 0;
this.lastRepaintTime = 0;
this.currentTime = 0;
this.sleepTime = 0;
this.isJS = false;
this.stopped = false;
this.isReset = false;
this.useTimeout = true;
this.junk = 0;
Clazz.instantialize (this, arguments);
}, J.thread, "JmolThread", Thread);
Clazz.defineMethod (c$, "setManager", 
function (manager, vwr, params) {
return 0;
}, "~O,JV.Viewer,~O");
Clazz.defineMethod (c$, "setViewer", 
function (vwr, name) {
this.setName (name);
this.$name = name + "_" + (++J.thread.JmolThread.threadIndex);
this.vwr = vwr;
this.isJS = vwr.isSingleThreaded;
}, "JV.Viewer,~S");
Clazz.defineMethod (c$, "setEval", 
function (eval) {
this.eval = eval;
this.sc = this.vwr.getEvalContextAndHoldQueue (eval);
if (this.sc != null) this.useTimeout = eval.getAllowJSThreads ();
}, "J.api.JmolScriptEvaluator");
Clazz.defineMethod (c$, "resumeEval", 
function () {
if (this.eval == null || !this.isJS && !this.vwr.testAsync || !this.useTimeout) return;
this.sc.mustResumeEval = !this.stopped;
var eval = this.eval;
var sc = this.sc;
this.eval = null;
this.sc = null;
{
setTimeout(function() { eval.resumeEval(sc); }, 1);
}});
Clazz.defineMethod (c$, "start", 
function () {
if (this.isJS) {
this.run ();
} else {
Clazz.superCall (this, J.thread.JmolThread, "start", []);
}});
Clazz.overrideMethod (c$, "run", 
function () {
this.startTime = System.currentTimeMillis ();
try {
this.run1 (-1);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, InterruptedException)) {
var e = e$$;
{
if (JU.Logger.debugging && !(Clazz.instanceOf (this, J.thread.HoverWatcherThread))) this.oops (e);
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
this.oops (e);
}
} else {
throw e$$;
}
}
});
Clazz.defineMethod (c$, "oops", 
function (e) {
JU.Logger.debug (this.$name + " exception " + e);
if (!JV.Viewer.isJS) e.printStackTrace ();
this.vwr.queueOnHold = false;
}, "Exception");
Clazz.defineMethod (c$, "runSleep", 
function (millis, runPtr) {
if (this.isJS && !this.useTimeout) {
return true;
}{
var me = this;
setTimeout(function(){me.run1(runPtr)}, Math.max(millis, 0));
return false;
}}, "~N,~N");
Clazz.defineMethod (c$, "interrupt", 
function () {
this.stopped = true;
this.vwr.startHoverWatcher (true);
if (!this.isJS) Clazz.superCall (this, J.thread.JmolThread, "interrupt", []);
});
Clazz.defineMethod (c$, "checkInterrupted", 
function (ref) {
if (this.haveReference && (ref == null || !ref.$name.equals (this.$name))) return true;
{
return this.stopped;
}}, "J.thread.JmolThread");
Clazz.defineMethod (c$, "reset", 
function () {
this.isReset = true;
this.interrupt ();
});
Clazz.defineStatics (c$,
"threadIndex", 0,
"INIT", -1,
"MAIN", 0,
"FINISH", -2,
"CHECK1", 1,
"CHECK2", 2,
"CHECK3", 3);
});
