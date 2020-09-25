Clazz.declarePackage ("J.thread");
Clazz.load (["J.thread.JmolThread"], "J.thread.AnimationThread", ["JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.am = null;
this.framePointer1 = 0;
this.framePointer2 = 0;
this.intThread = 0;
this.isFirst = false;
Clazz.instantialize (this, arguments);
}, J.thread, "AnimationThread", J.thread.JmolThread);
Clazz.overrideMethod (c$, "setManager", 
function (manager, vwr, params) {
var options = params;
this.framePointer1 = options[0];
this.framePointer2 = options[1];
this.intThread = options[2];
this.am = manager;
this.setViewer (vwr, "AnimationThread");
vwr.startHoverWatcher (false);
return 0;
}, "~O,JV.Viewer,~O");
Clazz.defineMethod (c$, "interrupt", 
function () {
if (this.stopped) return;
this.stopped = true;
if (JU.Logger.debugging) JU.Logger.debug ("animation thread interrupted!");
try {
this.am.setAnimationOn (false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
Clazz.superCall (this, J.thread.AnimationThread, "interrupt", []);
});
Clazz.overrideMethod (c$, "run1", 
function (mode) {
while (true) {
switch (mode) {
case -1:
if (JU.Logger.debugging) JU.Logger.debug ("animation thread " + this.intThread + " running");
this.vwr.requestRepaintAndWait ("animationThread");
this.vwr.startHoverWatcher (false);
this.haveReference = true;
this.isFirst = true;
mode = 0;
break;
case 0:
if (!this.am.animationOn || this.checkInterrupted (this.am.animationThread)) {
mode = -2;
break;
}if (this.am.currentFrameIs (this.framePointer1)) {
this.targetTime += this.am.firstFrameDelayMs;
this.sleepTime = (this.targetTime - (System.currentTimeMillis () - this.startTime));
if (!this.runSleep (this.sleepTime, 1)) return;
}mode = 1;
break;
case 1:
if (this.am.currentFrameIs (this.framePointer2)) {
this.targetTime += this.am.lastFrameDelayMs;
this.sleepTime = (this.targetTime - (System.currentTimeMillis () - this.startTime));
if (!this.runSleep (this.sleepTime, 2)) return;
}mode = 2;
break;
case 2:
if (!this.isFirst && this.am.currentIsLast () && !this.am.setAnimationNext ()) {
mode = -2;
break;
}this.isFirst = false;
this.targetTime += Clazz.floatToInt ((1000 / this.am.animationFps) + this.vwr.ms.getFrameDelayMs (this.am.cmi));
mode = 3;
break;
case 3:
while (this.am.animationOn && !this.checkInterrupted (this.am.animationThread) && !this.vwr.getRefreshing ()) {
if (!this.runSleep (10, 3)) return;
}
if (!this.vwr.tm.spinOn) this.vwr.refresh (1, "animationThread");
this.sleepTime = (this.targetTime - (System.currentTimeMillis () - this.startTime));
if (!this.runSleep (this.sleepTime, 0)) return;
mode = 0;
break;
case -2:
if (JU.Logger.debugging) JU.Logger.debug ("animation thread " + this.intThread + " exiting");
this.am.stopThread (false);
return;
}
}
}, "~N");
});
