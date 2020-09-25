Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.MMFFSBCalc", null, function () {
c$ = Clazz.declareType (JM.FF, "MMFFSBCalc", JM.FF.Calculation);
Clazz.defineMethod (c$, "setData", 
function (calc, angle) {
if (this.calcs.isLinear (angle.data[1])) return;
var data = this.calcs.getParameter (angle.sbKey);
var datakat0 = this.calcs.getParameterObj (angle);
var dataij = this.calcs.getParameter (this.calcs.minBonds[angle.data[3]]);
var datajk = this.calcs.getParameter (this.calcs.minBonds[angle.data[4]]);
if (data == null || datakat0 == null || dataij == null || datajk == null) return;
var theta0 = datakat0[1];
var r0ij = dataij[1];
var r0jk = datajk[1];
calc.addLast ( Clazz.newArray (-1, [angle.data,  Clazz.newDoubleArray (-1, [data[0], theta0, r0ij]), angle.sbKey]));
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [angle.data[2], angle.data[1], angle.data[0]]),  Clazz.newDoubleArray (-1, [data[1], theta0, r0jk]), angle.sbKey]));
}, "JU.Lst,JM.MinAngle");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.key = dataIn[2];
this.getPointers (dataIn);
var k = 2.51210 * this.dData[0];
var t0 = this.dData[1];
var r0_ab = this.dData[2];
this.calcs.setPairVariables (this);
this.calcs.setAngleVariables (this);
var dr_ab = this.rab - r0_ab;
this.delta = this.theta * 57.29577951308232 - t0;
this.energy = k * dr_ab * this.delta;
if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (3, this));
if (this.calcs.gradients) {
this.dE = k * dr_ab;
this.calcs.addForces (this, 3);
this.calcs.setPairVariables (this);
this.dE = k * this.delta;
this.calcs.addForces (this, 2);
}return this.energy;
}, "~A");
});
