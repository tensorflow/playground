Clazz.declarePackage ("J.thread");
Clazz.load (["J.thread.JmolThread"], "J.thread.VibrationThread", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.transformManager = null;
Clazz.instantialize (this, arguments);
}, J.thread, "VibrationThread", J.thread.JmolThread);
Clazz.overrideMethod (c$, "setManager", 
function (manager, vwr, options) {
this.transformManager = manager;
this.setViewer (vwr, "VibrationThread");
return 0;
}, "~O,JV.Viewer,~O");
Clazz.overrideMethod (c$, "run1", 
function (mode) {
var elapsed;
while (true) switch (mode) {
case -1:
this.lastRepaintTime = this.startTime = System.currentTimeMillis ();
this.vwr.startHoverWatcher (false);
this.haveReference = true;
mode = 0;
break;
case 0:
elapsed = (System.currentTimeMillis () - this.lastRepaintTime);
this.sleepTime = 33 - elapsed;
if (!this.runSleep (this.sleepTime, 1)) return;
mode = 1;
break;
case 1:
this.lastRepaintTime = System.currentTimeMillis ();
elapsed = (this.lastRepaintTime - this.startTime);
if (this.transformManager.vibrationPeriodMs == 0) {
mode = -2;
} else {
var t = (elapsed % this.transformManager.vibrationPeriodMs) / this.transformManager.vibrationPeriodMs;
this.transformManager.setVibrationT (t);
this.vwr.refresh (3, "VibrationThread");
mode = (this.checkInterrupted (this.transformManager.vibrationThread) ? -2 : 0);
}break;
case -2:
this.vwr.startHoverWatcher (true);
return;
}

}, "~N");
});
