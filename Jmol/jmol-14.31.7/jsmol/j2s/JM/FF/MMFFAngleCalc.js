Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.MMFFAngleCalc", null, function () {
c$ = Clazz.declareType (JM.FF, "MMFFAngleCalc", JM.FF.Calculation);
Clazz.defineMethod (c$, "setData", 
function (calc, angle) {
var data = this.calcs.getParameterObj (angle);
if (data == null) return;
calc.addLast ( Clazz.newArray (-1, [angle.data, data, angle.key]));
}, "JU.Lst,JM.MinAngle");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.key = dataIn[2];
this.getPointers (dataIn);
var ka = this.dData[0];
var t0 = this.dData[1];
this.calcs.setAngleVariables (this);
var dt = (this.theta * 57.29577951308232 - t0);
if (t0 == 180) {
this.energy = 143.9325 * ka * (1 + Math.cos (this.theta));
if (this.calcs.gradients) this.dE = -143.9325 * ka * Math.sin (this.theta);
} else {
this.energy = 0.021922 * ka * Math.pow (dt, 2) * (1 + -0.006981317007977318 * dt);
if (this.calcs.gradients) this.dE = 0.021922 * ka * dt * (2 + 3 * -0.006981317007977318 * dt);
}if (this.calcs.gradients) this.calcs.addForces (this, 3);
if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (1, this));
return this.energy;
}, "~A");
Clazz.defineStatics (c$,
"CB", -0.006981317007977318);
});
