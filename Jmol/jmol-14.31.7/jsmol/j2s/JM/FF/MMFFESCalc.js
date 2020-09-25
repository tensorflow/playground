Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.MMFFESCalc", null, function () {
c$ = Clazz.declareType (JM.FF, "MMFFESCalc", JM.FF.Calculation);
Clazz.overrideMethod (c$, "setData", 
function (calc, ia, ib, d) {
if (this.calcs.minAtoms[ia].partialCharge == 0 || this.calcs.minAtoms[ib].partialCharge == 0) return;
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [ia, ib]),  Clazz.newDoubleArray (-1, [this.calcs.minAtoms[ia].partialCharge, this.calcs.minAtoms[ib].partialCharge, (this.calcs.minAtoms[ia].bs14.get (ib) ? 249.0537 : 332.0716)])]));
}, "JU.Lst,~N,~N,~N");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
var f = this.dData[0] * this.dData[1] * this.dData[2];
this.calcs.setPairVariables (this);
var d = this.rab + 0.05;
this.energy = f / d;
if (this.calcs.gradients) {
this.dE = -this.energy / d;
this.calcs.addForces (this, 2);
}if (this.calcs.logging && Math.abs (this.energy) > 20) this.calcs.appendLogData (this.calcs.getDebugLine (6, this));
return this.energy;
}, "~A");
Clazz.defineStatics (c$,
"BUFF", 0.05);
});
