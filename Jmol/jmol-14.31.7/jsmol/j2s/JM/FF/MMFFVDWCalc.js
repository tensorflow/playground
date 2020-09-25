Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.MMFFVDWCalc", null, function () {
c$ = Clazz.declareType (JM.FF, "MMFFVDWCalc", JM.FF.Calculation);
Clazz.overrideMethod (c$, "setData", 
function (calc, ia, ib, dd) {
this.a = this.calcs.minAtoms[ia];
this.b = this.calcs.minAtoms[ib];
var dataA = this.calcs.getParameter (this.a.vdwKey);
var dataB = this.calcs.getParameter (this.b.vdwKey);
if (dataA == null || dataB == null) return;
var alpha_a = dataA[0];
var N_a = dataA[1];
var A_a = dataA[2];
var G_a = dataA[3];
var DA_a = Clazz.doubleToInt (dataA[4]);
var alpha_b = dataB[0];
var N_b = dataB[1];
var A_b = dataB[2];
var G_b = dataB[3];
var DA_b = Clazz.doubleToInt (dataB[4]);
var rs_aa = A_a * Math.pow (alpha_a, 0.25);
var rs_bb = A_b * Math.pow (alpha_b, 0.25);
var gamma = (rs_aa - rs_bb) / (rs_aa + rs_bb);
var rs = 0.5 * (rs_aa + rs_bb);
if (DA_a != 68 && DA_b != 68) rs *= (1.0 + 0.2 * (1.0 - Math.exp (-12.0 * gamma * gamma)));
var eps = ((181.16 * G_a * G_b * alpha_a * alpha_b) / (Math.sqrt (alpha_a / N_a) + Math.sqrt (alpha_b / N_b))) * Math.pow (rs, -6.0);
if (DA_a + DA_b == 133) {
rs *= 0.8;
eps *= 0.5;
}calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [ia, ib]),  Clazz.newDoubleArray (-1, [rs, eps])]));
}, "JU.Lst,~N,~N,~N");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
this.calcs.setPairVariables (this);
var rs = this.dData[0];
var eps = this.dData[1];
var r_rs = this.rab / rs;
var f1 = 1.07 / (r_rs + 0.07);
var f2 = 1.12 / (Math.pow (r_rs, 7) + 0.12);
this.energy = eps * Math.pow (f1, 7) * (f2 - 2);
if (this.calcs.gradients) {
this.dE = -7 * eps * Math.pow (f1, 7) / rs * (f1 / 1.07 * (f2 - 2) + f2 * f2 * Math.pow (r_rs, 6));
this.calcs.addForces (this, 2);
}if (this.calcs.logging && Math.abs (this.energy) > 0.1) this.calcs.appendLogData (this.calcs.getDebugLine (5, this));
return this.energy;
}, "~A");
});
