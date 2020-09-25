Clazz.declarePackage ("J.thread");
Clazz.load (["J.thread.JmolThread"], "J.thread.HoverWatcherThread", ["java.lang.Thread"], function () {
c$ = Clazz.decorateAsClass (function () {
this.actionManager = null;
this.current = null;
this.moved = null;
this.hoverDelay = 0;
Clazz.instantialize (this, arguments);
}, J.thread, "HoverWatcherThread", J.thread.JmolThread);
Clazz.makeConstructor (c$, 
function (actionManager, current, moved, vwr) {
this.setViewer (vwr, "HoverWatcher");
this.actionManager = actionManager;
this.current = current;
this.moved = moved;
this.start ();
}, "JV.ActionManager,JV.MouseState,JV.MouseState,JV.Viewer");
Clazz.overrideMethod (c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
if (!this.isJS) Thread.currentThread ().setPriority (1);
mode = 0;
break;
case 0:
this.hoverDelay = this.vwr.getHoverDelay ();
if (this.stopped || this.hoverDelay <= 0 || !this.runSleep (this.hoverDelay, 1)) return;
mode = 1;
break;
case 1:
if (this.moved.is (this.current)) {
this.currentTime = System.currentTimeMillis ();
var howLong = (this.currentTime - this.moved.time);
if (howLong > (this.vwr.acm.zoomTrigger ? 100 : this.hoverDelay) && !this.stopped) {
this.actionManager.checkHover ();
}}mode = 0;
break;
}

}, "~N");
});
