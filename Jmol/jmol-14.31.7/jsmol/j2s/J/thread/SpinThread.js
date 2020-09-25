Clazz.declarePackage ("J.thread");
Clazz.load (["J.thread.JmolThread"], "J.thread.SpinThread", ["JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.transformManager = null;
this.endDegrees = 0;
this.endPositions = null;
this.dihedralList = null;
this.nDegrees = 0;
this.bsAtoms = null;
this.isNav = false;
this.isGesture = false;
this.myFps = 0;
this.angle = 0;
this.haveNotified = false;
this.index = 0;
this.bsBranches = null;
this.isDone = false;
this.m4 = null;
Clazz.instantialize (this, arguments);
}, J.thread, "SpinThread", J.thread.JmolThread);
Clazz.overrideMethod (c$, "setManager", 
function (manager, vwr, params) {
this.transformManager = manager;
this.setViewer (vwr, "SpinThread");
var options = params;
if (options == null) {
this.isNav = true;
} else {
this.endDegrees = (options[0]).floatValue ();
this.endPositions = options[1];
this.dihedralList = options[2];
if (this.dihedralList != null) this.bsBranches = vwr.ms.getBsBranches (this.dihedralList);
this.bsAtoms = options[3];
this.isGesture = (options[4] != null);
}return 0;
}, "~O,JV.Viewer,~O");
Clazz.overrideMethod (c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
this.myFps = (this.isNav ? this.transformManager.navFps : this.transformManager.spinFps);
this.vwr.g.setB (this.isNav ? "_navigating" : "_spinning", true);
this.haveReference = true;
this.vwr.startHoverWatcher (false);
mode = 0;
break;
case 0:
if (this.isReset || this.checkInterrupted (this.transformManager.spinThread)) {
mode = -2;
break;
}if (this.isNav && this.myFps != this.transformManager.navFps) {
this.myFps = this.transformManager.navFps;
this.index = 0;
this.startTime = System.currentTimeMillis ();
} else if (!this.isNav && this.myFps != this.transformManager.spinFps && this.bsAtoms == null) {
this.myFps = this.transformManager.spinFps;
this.index = 0;
this.startTime = System.currentTimeMillis ();
}if (this.myFps == 0 || !(this.isNav ? this.transformManager.navOn : this.transformManager.spinOn)) {
mode = -2;
break;
}var refreshNeeded = (this.endDegrees >= 1e10 ? true : this.isNav ? this.transformManager.navX != 0 || this.transformManager.navY != 0 || this.transformManager.navZ != 0 : this.transformManager.isSpinInternal && this.transformManager.internalRotationAxis.angle != 0 || this.transformManager.isSpinFixed && this.transformManager.fixedRotationAxis.angle != 0 || !this.transformManager.isSpinFixed && !this.transformManager.isSpinInternal && (this.transformManager.spinX != 0 || this.transformManager.spinY != 0 || this.transformManager.spinZ != 0));
this.targetTime = Clazz.floatToLong (++this.index * 1000 / this.myFps);
this.currentTime = System.currentTimeMillis () - this.startTime;
this.sleepTime = (this.targetTime - this.currentTime);
if (this.sleepTime < 0) {
if (!this.haveNotified) JU.Logger.info ("spinFPS is set too fast (" + this.myFps + ") -- can't keep up!");
this.haveNotified = true;
this.startTime -= this.sleepTime;
this.sleepTime = 0;
}var isInMotion = (this.bsAtoms == null && this.vwr.getInMotion (false));
if (isInMotion) {
if (this.isGesture) {
mode = -2;
break;
}this.sleepTime += 1000;
}if (refreshNeeded && !isInMotion && (this.transformManager.spinOn || this.transformManager.navOn)) this.doTransform ();
mode = 1;
break;
case 1:
while (!this.checkInterrupted (this.transformManager.spinThread) && !this.vwr.getRefreshing ()) if (!this.runSleep (10, 1)) return;

if (this.bsAtoms != null || this.vwr.g.waitForMoveTo && this.endDegrees != 3.4028235E38) this.vwr.requestRepaintAndWait ("spin thread");
 else this.vwr.refresh (1, "SpinThread");
if (this.endDegrees >= 1e10 ? this.nDegrees / this.endDegrees > 0.99 : !this.isNav && this.endDegrees >= 0 ? this.nDegrees >= this.endDegrees - 0.001 : -this.nDegrees <= this.endDegrees + 0.001) {
this.isDone = true;
this.transformManager.setSpinOff ();
}if (!this.runSleep (this.sleepTime, 0)) return;
mode = 0;
break;
case -2:
if (this.dihedralList != null) {
this.vwr.setDihedrals (this.dihedralList, this.bsBranches, 0);
} else if (this.bsAtoms != null && this.endPositions != null) {
this.vwr.setAtomCoords (this.bsAtoms, 1145047050, this.endPositions);
this.bsAtoms = null;
this.endPositions = null;
}if (!this.isReset) {
this.transformManager.setSpinOff ();
this.vwr.startHoverWatcher (true);
}this.stopped = !this.isDone;
this.resumeEval ();
this.stopped = true;
return;
}

}, "~N");
Clazz.defineMethod (c$, "doTransform", 
 function () {
if (this.dihedralList != null) {
var f = 1 / this.myFps / this.endDegrees;
this.vwr.setDihedrals (this.dihedralList, this.bsBranches, f);
this.nDegrees += 1 / this.myFps;
} else if (this.isNav) {
this.transformManager.setNavigationOffsetRelative ();
} else if (this.transformManager.isSpinInternal || this.transformManager.isSpinFixed) {
this.angle = (this.transformManager.isSpinInternal ? this.transformManager.internalRotationAxis : this.transformManager.fixedRotationAxis).angle / this.myFps;
if (this.transformManager.isSpinInternal) {
this.transformManager.rotateAxisAngleRadiansInternal (this.angle, this.bsAtoms, this.m4);
} else {
this.transformManager.rotateAxisAngleRadiansFixed (this.angle, this.bsAtoms);
}this.nDegrees += Math.abs (this.angle * 57.29577951308232);
} else {
if (this.transformManager.spinX != 0) {
this.transformManager.rotateXRadians (this.transformManager.spinX * 0.017453292 / this.myFps, null);
}if (this.transformManager.spinY != 0) {
this.transformManager.rotateYRadians (this.transformManager.spinY * 0.017453292 / this.myFps, null);
}if (this.transformManager.spinZ != 0) {
this.transformManager.rotateZRadians (this.transformManager.spinZ * 0.017453292 / this.myFps);
}}});
});
