Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.MMFFTorsionCalc", null, function () {
c$ = Clazz.declareType (JM.FF, "MMFFTorsionCalc", JM.FF.Calculation);
Clazz.defineMethod (c$, "setData", 
function (calc, t) {
if (this.calcs.isLinear (t.data[1]) || this.calcs.isLinear (t.data[2])) return;
var data = this.calcs.getParameterObj (t);
if (data == null) return;
calc.addLast ( Clazz.newArray (-1, [t.data, data, t.key]));
}, "JU.Lst,JM.MinTorsion");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.key = dataIn[2];
this.getPointers (dataIn);
var v1 = this.dData[0];
var v2 = this.dData[1];
var v3 = this.dData[2];
this.calcs.setTorsionVariables (this);
var cosTheta = Math.cos (this.theta);
var cosTheta2 = cosTheta * cosTheta;
this.energy = 0.5 * (v1 * (1 + cosTheta) + v2 * (2 - 2 * cosTheta2) + v3 * (1 + cosTheta * (4 * cosTheta2 - 3)));
if (this.calcs.gradients) {
var sinTheta = Math.sin (this.theta);
this.dE = 0.5 * (-v1 * sinTheta + 4 * v2 * sinTheta * cosTheta + 3 * v3 * sinTheta * (1 - 4 * cosTheta2));
this.calcs.addForces (this, 4);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (2, this));
return this.energy;
}, "~A");
});
