Clazz.declarePackage ("JS");
Clazz.load (["J.thread.JmolThread"], "JS.ScriptQueueThread", ["JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.scriptManager = null;
this.startedByCommandThread = false;
this.pt = 0;
Clazz.instantialize (this, arguments);
}, JS, "ScriptQueueThread", J.thread.JmolThread);
Clazz.makeConstructor (c$, 
function (scriptManager, vwr, startedByCommandThread, pt) {
this.setViewer (vwr, "QueueThread" + pt);
this.scriptManager = scriptManager;
this.vwr = vwr;
this.startedByCommandThread = startedByCommandThread;
this.pt = pt;
}, "JS.ScriptManager,JV.Viewer,~B,~N");
Clazz.overrideMethod (c$, "run1", 
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
Clazz.defineMethod (c$, "runNextScript", 
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
