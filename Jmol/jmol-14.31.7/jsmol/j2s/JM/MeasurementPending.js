Clazz.declarePackage ("JM");
Clazz.load (["JM.Measurement"], "JM.MeasurementPending", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.haveTarget = false;
this.haveModified = false;
this.numSet = 0;
this.lastIndex = -1;
Clazz.instantialize (this, arguments);
}, JM, "MeasurementPending", JM.Measurement);
Clazz.defineMethod (c$, "set", 
function (modelSet) {
return this.setM (modelSet, null, NaN, 0, null, 0);
}, "JM.ModelSet");
Clazz.defineMethod (c$, "checkPoint", 
 function (ptClicked) {
for (var i = 1; i <= this.numSet; i++) if (this.countPlusIndices[i] == -1 - i && this.pts[i - 1].distance (ptClicked) < 0.01) return false;

return true;
}, "JU.Point3fi");
Clazz.defineMethod (c$, "getIndexOf", 
function (atomIndex) {
for (var i = 1; i <= this.numSet; i++) if (this.countPlusIndices[i] == atomIndex) return i;

return 0;
}, "~N");
Clazz.overrideMethod (c$, "setCount", 
function (count) {
this.setCountM (count);
this.numSet = count;
}, "~N");
Clazz.defineMethod (c$, "addPoint", 
function (atomIndex, ptClicked, doSet) {
this.haveModified = (atomIndex != this.lastIndex);
this.lastIndex = atomIndex;
if (ptClicked == null) {
if (this.getIndexOf (atomIndex) > 0) {
if (doSet) this.numSet = this.count;
return this.count;
}this.haveTarget = (atomIndex >= 0);
if (!this.haveTarget) return this.count = this.numSet;
this.count = this.numSet + 1;
this.countPlusIndices[this.count] = atomIndex;
} else {
if (!this.checkPoint (ptClicked)) {
if (doSet) this.numSet = this.count;
return this.count;
}var pt = this.numSet;
this.haveModified = this.haveTarget = true;
this.count = this.numSet + 1;
this.pts[pt] = ptClicked;
this.countPlusIndices[this.count] = -2 - pt;
}this.countPlusIndices[0] = this.count;
if (doSet) this.numSet = this.count;
this.value = this.getMeasurement (null);
this.strFormat = null;
this.formatMeasurement (null);
return this.count;
}, "~N,JU.Point3fi,~B");
});
