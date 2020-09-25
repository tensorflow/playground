Clazz.declarePackage ("JV");
Clazz.load (["JU.BS"], "JV.AnimationManager", ["J.api.Interface", "JU.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.animationThread = null;
this.vwr = null;
this.animationOn = false;
this.animationFps = 0;
this.firstFrameDelayMs = 0;
this.lastFrameDelayMs = 0;
this.bsVisibleModels = null;
this.animationReplayMode = 1073742070;
this.bsDisplay = null;
this.animationFrames = null;
this.isMovie = false;
this.animationPaused = false;
this.cmi = 0;
this.caf = 0;
this.morphCount = 0;
this.animationDirection = 1;
this.currentDirection = 1;
this.firstFrameIndex = 0;
this.lastFrameIndex = 0;
this.frameStep = 0;
this.backgroundModelIndex = -1;
this.currentMorphModel = 0;
this.firstFrameDelay = 0;
this.lastFrameDelay = 1;
this.lastFramePainted = 0;
this.lastModelPainted = 0;
this.intAnimThread = 0;
this.cai = -1;
Clazz.instantialize (this, arguments);
}, JV, "AnimationManager");
Clazz.prepareFields (c$, function () {
this.bsVisibleModels =  new JU.BS ();
});
Clazz.makeConstructor (c$, 
function (vwr) {
this.vwr = vwr;
}, "JV.Viewer");
Clazz.defineMethod (c$, "setAnimationOn", 
function (animationOn) {
if (animationOn == this.animationOn) return;
if (!animationOn || this.vwr.headless) {
this.stopThread (false);
return;
}if (!this.vwr.tm.spinOn) this.vwr.refresh (3, "Anim:setAnimationOn");
this.setAnimationRange (-1, -1);
this.resumeAnimation ();
}, "~B");
Clazz.defineMethod (c$, "stopThread", 
function (isPaused) {
var stopped = false;
if (this.animationThread != null) {
this.animationThread.interrupt ();
this.animationThread = null;
stopped = true;
}this.animationPaused = isPaused;
if (stopped && !this.vwr.tm.spinOn) this.vwr.refresh (3, "Viewer:setAnimationOff");
this.animation (false);
this.vwr.setStatusFrameChanged (false, false);
}, "~B");
Clazz.defineMethod (c$, "setAnimationNext", 
function () {
return this.setAnimationRelative (this.animationDirection);
});
Clazz.defineMethod (c$, "currentIsLast", 
function () {
return (this.isMovie ? this.lastFramePainted == this.caf : this.lastModelPainted == this.cmi);
});
Clazz.defineMethod (c$, "currentFrameIs", 
function (f) {
var i = this.cmi;
return (this.morphCount == 0 ? i == f : Math.abs (this.currentMorphModel - f) < 0.001);
}, "~N");
Clazz.defineMethod (c$, "clear", 
function () {
this.setMovie (null);
this.initializePointers (0);
this.setAnimationOn (false);
this.setModel (0, true);
this.currentDirection = 1;
this.cai = -1;
this.setAnimationDirection (1);
this.setAnimationFps (10);
this.setAnimationReplayMode (1073742070, 0, 0);
this.initializePointers (0);
});
Clazz.defineMethod (c$, "getModelSpecial", 
function (i) {
switch (i) {
case -1:
if (this.animationFrames != null) return "1";
i = this.firstFrameIndex;
break;
case 0:
if (this.morphCount > 0) return "-" + (1 + this.currentMorphModel);
i = this.cmi;
break;
case 1:
if (this.animationFrames != null) return "" + this.animationFrames.length;
i = this.lastFrameIndex;
break;
}
return this.vwr.getModelNumberDotted (i);
}, "~N");
Clazz.defineMethod (c$, "setDisplay", 
function (bs) {
this.bsDisplay = (bs == null || bs.isEmpty () ? null : JU.BSUtil.copy (bs));
}, "JU.BS");
Clazz.defineMethod (c$, "setMorphCount", 
function (n) {
this.morphCount = (this.isMovie ? 0 : n);
}, "~N");
Clazz.defineMethod (c$, "morph", 
function (modelIndex) {
var m = Clazz.floatToInt (modelIndex);
if (Math.abs (m - modelIndex) < 0.001) modelIndex = m;
 else if (Math.abs (m - modelIndex) > 0.999) modelIndex = m = m + 1;
var f = modelIndex - m;
m -= 1;
if (f == 0) {
this.currentMorphModel = m;
this.setModel (m, true);
return;
}var m1;
this.setModel (m, true);
m1 = m + 1;
this.currentMorphModel = m + f;
if (m1 == m || m1 < 0 || m < 0) return;
this.vwr.ms.morphTrajectories (m, m1, f);
}, "~N");
Clazz.defineMethod (c$, "setModel", 
function (modelIndex, clearBackgroundModel) {
if (modelIndex < 0) this.stopThread (false);
var formerModelIndex = this.cmi;
var modelSet = this.vwr.ms;
var modelCount = (modelSet == null ? 0 : modelSet.mc);
if (modelCount == 1) this.cmi = modelIndex = 0;
 else if (modelIndex < 0 || modelIndex >= modelCount) modelIndex = -1;
var ids = null;
var isSameSource = false;
if (this.cmi != modelIndex) {
if (modelCount > 0) {
var ms = this.vwr.ms;
var toDataModel = ms.isJmolDataFrameForModel (modelIndex);
var fromDataModel = ms.isJmolDataFrameForModel (this.cmi);
if (fromDataModel) ms.setJmolDataFrame (null, -1, this.cmi);
if (this.cmi != -1) this.vwr.saveModelOrientation ();
if (fromDataModel || toDataModel) {
ids = ms.getJmolFrameType (modelIndex) + " " + modelIndex + " <-- " + " " + this.cmi + " " + ms.getJmolFrameType (this.cmi);
isSameSource = (ms.getJmolDataSourceFrame (modelIndex) == ms.getJmolDataSourceFrame (this.cmi));
}}this.cmi = modelIndex;
if (ids != null) {
if (modelIndex >= 0) this.vwr.restoreModelOrientation (modelIndex);
if (isSameSource && (ids.indexOf ("quaternion") >= 0 || ids.indexOf ("plot") < 0 && ids.indexOf ("ramachandran") < 0 && ids.indexOf (" property ") < 0)) {
this.vwr.restoreModelRotation (formerModelIndex);
}}}this.setViewer (clearBackgroundModel);
}, "~N,~B");
Clazz.defineMethod (c$, "setBackgroundModelIndex", 
function (modelIndex) {
var modelSet = this.vwr.ms;
if (modelSet == null || modelIndex < 0 || modelIndex >= modelSet.mc) modelIndex = -1;
this.backgroundModelIndex = modelIndex;
if (modelIndex >= 0) this.vwr.ms.setTrajectory (modelIndex);
this.vwr.setTainted (true);
this.setFrameRangeVisible ();
}, "~N");
Clazz.defineMethod (c$, "initializePointers", 
function (frameStep) {
this.firstFrameIndex = 0;
this.lastFrameIndex = (frameStep == 0 ? 0 : this.getFrameCount ()) - 1;
this.frameStep = frameStep;
this.vwr.setFrameVariables ();
}, "~N");
Clazz.defineMethod (c$, "setAnimationDirection", 
function (animationDirection) {
this.animationDirection = animationDirection;
}, "~N");
Clazz.defineMethod (c$, "setAnimationFps", 
function (fps) {
if (fps < 1) fps = 1;
if (fps > 50) fps = 50;
this.animationFps = fps;
this.vwr.setFrameVariables ();
}, "~N");
Clazz.defineMethod (c$, "setAnimationReplayMode", 
function (animationReplayMode, firstFrameDelay, lastFrameDelay) {
this.firstFrameDelay = firstFrameDelay > 0 ? firstFrameDelay : 0;
this.firstFrameDelayMs = Clazz.floatToInt (this.firstFrameDelay * 1000);
this.lastFrameDelay = lastFrameDelay > 0 ? lastFrameDelay : 0;
this.lastFrameDelayMs = Clazz.floatToInt (this.lastFrameDelay * 1000);
this.animationReplayMode = animationReplayMode;
this.vwr.setFrameVariables ();
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setAnimationRange", 
function (framePointer, framePointer2) {
var frameCount = this.getFrameCount ();
if (framePointer < 0) framePointer = 0;
if (framePointer2 < 0) framePointer2 = frameCount;
if (framePointer >= frameCount) framePointer = frameCount - 1;
if (framePointer2 >= frameCount) framePointer2 = frameCount - 1;
this.firstFrameIndex = framePointer;
this.currentMorphModel = this.firstFrameIndex;
this.lastFrameIndex = framePointer2;
this.frameStep = (framePointer2 < framePointer ? -1 : 1);
this.rewindAnimation ();
}, "~N,~N");
Clazz.defineMethod (c$, "pauseAnimation", 
function () {
this.stopThread (true);
});
Clazz.defineMethod (c$, "reverseAnimation", 
function () {
this.currentDirection = -this.currentDirection;
if (!this.animationOn) this.resumeAnimation ();
});
Clazz.defineMethod (c$, "repaintDone", 
function () {
this.lastModelPainted = this.cmi;
this.lastFramePainted = this.caf;
});
Clazz.defineMethod (c$, "resumeAnimation", 
function () {
if (this.cmi < 0) this.setAnimationRange (this.firstFrameIndex, this.lastFrameIndex);
if (this.getFrameCount () <= 1) {
this.animation (false);
return;
}this.animation (true);
this.animationPaused = false;
if (this.animationThread == null) {
this.intAnimThread++;
this.animationThread = J.api.Interface.getOption ("thread.AnimationThread", this.vwr, "script");
this.animationThread.setManager (this, this.vwr,  Clazz.newIntArray (-1, [this.firstFrameIndex, this.lastFrameIndex, this.intAnimThread]));
this.animationThread.start ();
}});
Clazz.defineMethod (c$, "setAnimationLast", 
function () {
this.setFrame (this.animationDirection > 0 ? this.lastFrameIndex : this.firstFrameIndex);
});
Clazz.defineMethod (c$, "rewindAnimation", 
function () {
this.setFrame (this.animationDirection > 0 ? this.firstFrameIndex : this.lastFrameIndex);
this.currentDirection = 1;
this.vwr.setFrameVariables ();
});
Clazz.defineMethod (c$, "setAnimationPrevious", 
function () {
return this.setAnimationRelative (-this.animationDirection);
});
Clazz.defineMethod (c$, "getAnimRunTimeSeconds", 
function () {
var frameCount = this.getFrameCount ();
if (this.firstFrameIndex == this.lastFrameIndex || this.lastFrameIndex < 0 || this.firstFrameIndex < 0 || this.lastFrameIndex >= frameCount || this.firstFrameIndex >= frameCount) return 0;
var i0 = Math.min (this.firstFrameIndex, this.lastFrameIndex);
var i1 = Math.max (this.firstFrameIndex, this.lastFrameIndex);
var nsec = 1 * (i1 - i0) / this.animationFps + this.firstFrameDelay + this.lastFrameDelay;
for (var i = i0; i <= i1; i++) nsec += this.vwr.ms.getFrameDelayMs (this.modelIndexForFrame (i)) / 1000;

return nsec;
});
Clazz.defineMethod (c$, "setMovie", 
function (info) {
this.isMovie = (info != null && info.get ("scripts") == null);
if (this.isMovie) {
this.animationFrames = info.get ("frames");
if (this.animationFrames == null || this.animationFrames.length == 0) {
this.isMovie = false;
} else {
this.caf = (info.get ("currentFrame")).intValue ();
if (this.caf < 0 || this.caf >= this.animationFrames.length) this.caf = 0;
}this.setFrame (this.caf);
}if (!this.isMovie) {
this.animationFrames = null;
}this.vwr.setBooleanProperty ("_ismovie", this.isMovie);
this.bsDisplay = null;
this.currentMorphModel = this.morphCount = 0;
this.vwr.setFrameVariables ();
}, "java.util.Map");
Clazz.defineMethod (c$, "modelIndexForFrame", 
function (i) {
return (this.isMovie ? this.animationFrames[i] - 1 : i);
}, "~N");
Clazz.defineMethod (c$, "getFrameCount", 
function () {
return (this.isMovie ? this.animationFrames.length : this.vwr.ms.mc);
});
Clazz.defineMethod (c$, "setFrame", 
function (i) {
try {
if (this.isMovie) {
var iModel = this.modelIndexForFrame (i);
this.caf = i;
i = iModel;
} else {
this.caf = i;
}this.setModel (i, true);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "setViewer", 
 function (clearBackgroundModel) {
this.vwr.ms.setTrajectory (this.cmi);
this.vwr.tm.setFrameOffset (this.cmi);
if (this.cmi == -1 && clearBackgroundModel) this.setBackgroundModelIndex (-1);
this.vwr.setTainted (true);
var nDisplay = this.setFrameRangeVisible ();
this.vwr.setStatusFrameChanged (false, false);
if (!this.vwr.g.selectAllModels) this.setSelectAllSubset (nDisplay < 2);
}, "~B");
Clazz.defineMethod (c$, "setSelectAllSubset", 
function (justOne) {
if (this.vwr.ms != null) this.vwr.slm.setSelectionSubset (justOne ? this.vwr.ms.getModelAtomBitSetIncludingDeleted (this.cmi, true) : this.vwr.ms.getModelAtomBitSetIncludingDeletedBs (this.bsVisibleModels));
}, "~B");
Clazz.defineMethod (c$, "setFrameRangeVisible", 
 function () {
var nDisplayed = 0;
this.bsVisibleModels.clearAll ();
if (this.backgroundModelIndex >= 0) {
this.bsVisibleModels.set (this.backgroundModelIndex);
nDisplayed = 1;
}if (this.cmi >= 0) {
this.bsVisibleModels.set (this.cmi);
return ++nDisplayed;
}if (this.frameStep == 0) return nDisplayed;
var frameDisplayed = 0;
nDisplayed = 0;
for (var iframe = this.firstFrameIndex; iframe != this.lastFrameIndex; iframe += this.frameStep) {
var i = this.modelIndexForFrame (iframe);
if (!this.vwr.ms.isJmolDataFrameForModel (i)) {
this.bsVisibleModels.set (i);
nDisplayed++;
frameDisplayed = iframe;
}}
var i = this.modelIndexForFrame (this.lastFrameIndex);
if (this.firstFrameIndex == this.lastFrameIndex || !this.vwr.ms.isJmolDataFrameForModel (i) || nDisplayed == 0) {
this.bsVisibleModels.set (i);
if (nDisplayed == 0) this.firstFrameIndex = this.lastFrameIndex;
nDisplayed = 0;
}if (nDisplayed == 1 && this.cmi < 0) this.setFrame (frameDisplayed);
return nDisplayed;
});
Clazz.defineMethod (c$, "animation", 
 function (TF) {
this.animationOn = TF;
this.vwr.setBooleanProperty ("_animating", TF);
}, "~B");
Clazz.defineMethod (c$, "setAnimationRelative", 
 function (direction) {
var frameStep = this.getFrameStep (direction);
var thisFrame = (this.isMovie ? this.caf : this.cmi);
var frameNext = thisFrame + frameStep;
var morphStep = 0;
var nextMorphFrame = 0;
var isDone;
if (this.morphCount > 0) {
morphStep = 1 / (this.morphCount + 1);
nextMorphFrame = this.currentMorphModel + frameStep * morphStep;
isDone = this.isNotInRange (nextMorphFrame);
} else {
isDone = this.isNotInRange (frameNext);
}if (isDone) {
switch (this.animationReplayMode) {
case 1073742070:
return false;
case 528411:
nextMorphFrame = frameNext = (this.animationDirection == this.currentDirection ? this.firstFrameIndex : this.lastFrameIndex);
break;
case 1073742082:
this.currentDirection = -this.currentDirection;
frameNext -= 2 * frameStep;
nextMorphFrame -= 2 * frameStep * morphStep;
}
}if (this.morphCount < 1) {
if (frameNext < 0 || frameNext >= this.getFrameCount ()) return false;
this.setFrame (frameNext);
return true;
}this.morph (nextMorphFrame + 1);
return true;
}, "~N");
Clazz.defineMethod (c$, "isNotInRange", 
 function (frameNext) {
var f = frameNext - 0.001;
return (f > this.firstFrameIndex && f > this.lastFrameIndex || (f = frameNext + 0.001) < this.firstFrameIndex && f < this.lastFrameIndex);
}, "~N");
Clazz.defineMethod (c$, "getFrameStep", 
 function (direction) {
return this.frameStep * direction * this.currentDirection;
}, "~N");
Clazz.defineStatics (c$,
"FRAME_FIRST", -1,
"FRAME_LAST", 1,
"MODEL_CURRENT", 0);
});
