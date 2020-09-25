Clazz.declarePackage ("JM");
Clazz.load (null, "JM.Trajectory", ["JU.BS", "$.P3", "$.V3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.ms = null;
this.steps = null;
this.isFractional = true;
Clazz.instantialize (this, arguments);
}, JM, "Trajectory");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (vwr, ms, steps) {
this.vwr = vwr;
this.ms = ms;
this.steps = steps;
return this;
}, "JV.Viewer,JM.ModelSet,JU.Lst");
Clazz.defineMethod (c$, "setUnitCell", 
function (imodel) {
var c = this.ms.getUnitCell (imodel);
if (c != null && c.getCoordinatesAreFractional () && c.isSupercell ()) {
var list = this.ms.trajectory.steps.get (imodel);
for (var i = list.length; --i >= 0; ) if (list[i] != null) c.toSupercell (list[i]);

}}, "~N");
Clazz.defineMethod (c$, "setModel", 
function (modelIndex) {
var am = this.ms.am;
var baseModelIndex = am[modelIndex].trajectoryBaseIndex;
am[baseModelIndex].selectedTrajectory = modelIndex;
this.isFractional = !this.ms.getMSInfoB ("ignoreUnitCell");
this.setAtomPositions (baseModelIndex, modelIndex, this.steps.get (modelIndex), null, 0, (this.ms.vibrationSteps == null ? null : this.ms.vibrationSteps.get (modelIndex)), this.isFractional);
var currentModelIndex = this.vwr.am.cmi;
if (currentModelIndex >= 0 && currentModelIndex != modelIndex && am[currentModelIndex].fileIndex == am[modelIndex].fileIndex) this.vwr.setCurrentModelIndexClear (modelIndex, false);
}, "~N");
Clazz.defineMethod (c$, "setAtomPositions", 
 function (baseModelIndex, modelIndex, t1, t2, f, vibs, isFractional) {
var bs =  new JU.BS ();
var vib =  new JU.V3 ();
var am = this.ms.am;
var at = this.ms.at;
var iFirst = am[baseModelIndex].firstAtomIndex;
var iMax = iFirst + this.ms.getAtomCountInModel (baseModelIndex);
if (f == 0) {
for (var pt = 0, i = iFirst; i < iMax && pt < t1.length; i++, pt++) {
at[i].mi = modelIndex;
if (t1[pt] == null) continue;
if (isFractional) at[i].setFractionalCoordTo (t1[pt], true);
 else at[i].setT (t1[pt]);
if (this.ms.vibrationSteps != null) {
if (vibs != null && vibs[pt] != null) vib = vibs[pt];
this.ms.setVibrationVector (i, vib);
}bs.set (i);
}
} else {
var p =  new JU.P3 ();
var n = Math.min (t1.length, t2.length);
for (var pt = 0, i = iFirst; i < iMax && pt < n; i++, pt++) {
at[i].mi = modelIndex;
if (t1[pt] == null || t2[pt] == null) continue;
p.sub2 (t2[pt], t1[pt]);
p.scaleAdd2 (f, p, t1[pt]);
if (isFractional) at[i].setFractionalCoordTo (p, true);
 else at[i].setT (p);
bs.set (i);
}
}this.ms.initializeBspf ();
this.ms.validateBspfForModel (baseModelIndex, false);
this.ms.recalculateLeadMidpointsAndWingVectors (baseModelIndex);
this.ms.sm.notifyAtomPositionsChanged (baseModelIndex, bs, null);
if (am[baseModelIndex].hasRasmolHBonds) (am[baseModelIndex]).resetRasmolBonds (bs, 2);
}, "~N,~N,~A,~A,~N,~A,~B");
Clazz.defineMethod (c$, "getModelsSelected", 
function () {
var bsModels =  new JU.BS ();
for (var i = this.ms.mc; --i >= 0; ) {
var t = this.ms.am[i].selectedTrajectory;
if (t >= 0) {
bsModels.set (t);
i = this.ms.am[i].trajectoryBaseIndex;
}}
return bsModels;
});
Clazz.defineMethod (c$, "morph", 
function (m1, m2, f) {
if (f == 0) {
this.ms.setTrajectory (m1);
return;
}if (f == 1) {
this.ms.setTrajectory (m2);
return;
}var baseModelIndex = this.ms.am[m1].trajectoryBaseIndex;
this.ms.am[baseModelIndex].selectedTrajectory = m1;
this.setAtomPositions (baseModelIndex, m1, this.steps.get (m1), this.steps.get (m2), f, (this.ms.vibrationSteps == null ? null : this.ms.vibrationSteps.get (m1)), true);
var m = this.vwr.am.cmi;
if (m >= 0 && m != m1 && this.ms.am[m].fileIndex == this.ms.am[m1].fileIndex) this.vwr.setCurrentModelIndexClear (m1, false);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "fixAtom", 
function (a) {
var m = a.mi;
var isFrac = (this.ms.unitCells != null && this.ms.unitCells[m].getCoordinatesAreFractional ());
var pt = this.steps.get (m)[a.i - this.ms.am[m].firstAtomIndex];
pt.set (a.x, a.y, a.z);
if (isFrac) this.ms.unitCells[m].toFractional (pt, true);
}, "JM.Atom");
Clazz.defineMethod (c$, "getFractional", 
function (a, ptTemp) {
a.setFractionalCoordPt (ptTemp, this.steps.get (a.mi)[a.i - this.ms.am[a.mi].firstAtomIndex], true);
}, "JM.Atom,JU.P3");
Clazz.defineMethod (c$, "getState", 
function () {
var s = "";
for (var i = this.ms.mc; --i >= 0; ) {
var t = this.ms.am[i].selectedTrajectory;
if (t >= 0) {
s = " or " + this.ms.getModelNumberDotted (t) + s;
i = this.ms.am[i].trajectoryBaseIndex;
}}
return (s.length > 0 ? s = "set trajectory {" + s.substring (4) + "}" : "");
});
Clazz.defineMethod (c$, "hasMeasure", 
function (measure) {
if (measure != null) {
var atomIndex;
for (var i = 1, count = measure[0]; i <= count; i++) if ((atomIndex = measure[i]) >= 0 && this.ms.am[this.ms.at[atomIndex].mi].isTrajectory) return true;

}return false;
}, "~A");
Clazz.defineMethod (c$, "selectDisplayed", 
function (bs) {
for (var i = this.ms.mc; --i >= 0; ) {
if (this.ms.am[i].isTrajectory && this.ms.at[this.ms.am[i].firstAtomIndex].mi != i) bs.clear (i);
}
}, "JU.BS");
Clazz.defineMethod (c$, "getModelBS", 
function (modelIndex, bs) {
var iBase = this.ms.am[modelIndex].trajectoryBaseIndex;
for (var i = this.ms.mc; --i >= iBase; ) if (this.ms.am[i].trajectoryBaseIndex == iBase) bs.set (i);

}, "~N,JU.BS");
Clazz.defineMethod (c$, "setBaseModels", 
function (bsModels) {
for (var i = this.ms.mc; --i >= 0; ) if (bsModels.get (i) && this.ms.am[i].isTrajectory) bsModels.set (this.ms.am[i].trajectoryBaseIndex);

}, "JU.BS");
});
