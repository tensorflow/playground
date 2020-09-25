Clazz.declarePackage ("JM");
Clazz.load (["J.thread.JmolThread"], "JM.MinimizationThread", ["JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.minimizer = null;
Clazz.instantialize (this, arguments);
}, JM, "MinimizationThread", J.thread.JmolThread);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JM.MinimizationThread, []);
});
Clazz.overrideMethod (c$, "setManager", 
function (manager, vwr, options) {
this.minimizer = manager;
this.setViewer (vwr, "MinimizationThread");
return 0;
}, "~O,JV.Viewer,~O");
Clazz.overrideMethod (c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
this.lastRepaintTime = this.startTime;
this.haveReference = true;
if (!this.minimizer.startMinimization ()) return;
this.vwr.startHoverWatcher (false);
mode = 0;
break;
case 0:
if (!this.minimizer.minimizationOn () || this.checkInterrupted (this.minimizer.getThread ())) {
mode = -2;
break;
}this.currentTime = System.currentTimeMillis ();
var elapsed = (this.currentTime - this.lastRepaintTime);
var sleepTime = 33 - elapsed;
if (!this.runSleep (sleepTime, 1)) return;
mode = 1;
break;
case 1:
this.lastRepaintTime = this.currentTime = System.currentTimeMillis ();
mode = (this.minimizer.stepMinimization () ? 0 : -2);
break;
case -2:
this.minimizer.endMinimization ();
this.vwr.startHoverWatcher (true);
return;
}

}, "~N");
Clazz.overrideMethod (c$, "oops", 
function (e) {
if (this.minimizer.minimizationOn ()) JU.Logger.error (e.toString ());
}, "Exception");
});
