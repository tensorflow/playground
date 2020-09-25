Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.UFFVDWCalc", null, function () {
c$ = Clazz.declareType (JM.FF, "UFFVDWCalc", JM.FF.Calculation);
Clazz.overrideMethod (c$, "setData", 
function (calc, ia, ib, dd) {
this.a = this.calcs.minAtoms[ia];
this.b = this.calcs.minAtoms[ib];
var parA = this.calcs.getParameter (this.a.sType);
var parB = this.calcs.getParameter (this.b.sType);
var Xa = parA.dVal[2];
var Da = parA.dVal[3];
if (parB == null || parB.dVal == null) System.out.println ("OHOH");
var Xb = parB.dVal[2];
var Db = parB.dVal[3];
var Dab = 4.1868 * Math.sqrt (Da * Db);
var Xab = Math.sqrt (Xa * Xb);
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [ia, ib]),  Clazz.newDoubleArray (-1, [Xab, Dab])]));
}, "JU.Lst,~N,~N,~N");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
var Xab = this.dData[0];
var Dab = this.dData[1];
this.calcs.setPairVariables (this);
var term = Xab / this.rab;
var term6 = term * term * term;
term6 *= term6;
this.energy = Dab * term6 * (term6 - 2.0);
if (this.calcs.gradients) {
this.dE = Dab * 12.0 * (1.0 - term6) * term6 * term / Xab;
this.calcs.addForces (this, 2);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (5, this));
return this.energy;
}, "~A");
});
