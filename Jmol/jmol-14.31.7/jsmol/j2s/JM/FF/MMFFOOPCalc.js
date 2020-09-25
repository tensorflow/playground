Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.MMFFOOPCalc", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.list = null;
Clazz.instantialize (this, arguments);
}, JM.FF, "MMFFOOPCalc", JM.FF.Calculation);
Clazz.prepareFields (c$, function () {
this.list =  Clazz.newIntArray (4, 0);
});
Clazz.defineMethod (c$, "setData", 
function (calc, i) {
if (this.calcs.minAtoms[i].nBonds != 3) return;
var indices = this.calcs.minAtoms[i].getBondedAtomIndexes ();
this.list[0] = indices[2];
this.list[1] = i;
this.list[2] = indices[1];
this.list[3] = indices[0];
var koop = (this.calcs).mmff.getOutOfPlaneParameter (this.list);
if (koop == 0) return;
var dk =  Clazz.newDoubleArray (-1, [koop]);
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [indices[0], i, indices[1], indices[2]]), dk]));
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [indices[1], i, indices[2], indices[0]]), dk]));
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [indices[2], i, indices[0], indices[1]]), dk]));
}, "JU.Lst,~N");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
this.calcs.setOopVariables (this, false);
var koop = this.dData[0];
this.energy = 71.96568080495746 * koop * this.theta * this.theta;
if (this.calcs.gradients) {
this.dE = 2.5120761569715815 * koop * this.theta;
this.calcs.addForces (this, 4);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (4, this));
return this.energy;
}, "~A");
Clazz.defineStatics (c$,
"FOOPD", 2.5120761569715815,
"FOOP", 71.96568080495746);
});
