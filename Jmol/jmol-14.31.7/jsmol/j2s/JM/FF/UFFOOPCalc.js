Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.UFFOOPCalc", null, function () {
c$ = Clazz.declareType (JM.FF, "UFFOOPCalc", JM.FF.Calculation);
Clazz.overrideMethod (c$, "setData", 
function (calc, ib, elemNo, dd) {
this.b = this.calcs.minAtoms[ib];
var atomList = this.b.getBondedAtomIndexes ();
this.a = this.calcs.minAtoms[this.ia = atomList[0]];
this.c = this.calcs.minAtoms[this.ic = atomList[1]];
this.d = this.calcs.minAtoms[this.id = atomList[2]];
var a0 = 1.0;
var a1 = -1.0;
var a2 = 0.0;
var koop = 25.1208;
switch (elemNo) {
case 6:
if (this.b.sType === "C_2" && this.b.hCount > 1 || this.b.sType === "C_2+" || this.a.sType === "O_2" || this.c.sType === "O_2" || this.d.sType === "O_2") {
koop += 184.2192;
break;
}break;
case 7:
case 8:
break;
default:
koop = 92.1096;
var phi = 0.017453292519943295;
switch (elemNo) {
case 15:
phi *= 84.4339;
break;
case 33:
phi *= 86.9735;
break;
case 51:
phi *= 87.7047;
break;
case 83:
phi *= 90.0;
break;
}
var cosPhi = Math.cos (phi);
a0 = cosPhi * cosPhi;
a1 = -2.0 * cosPhi;
a2 = 1.0;
}
koop /= 3.0;
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [this.ia, ib, this.ic, this.id]),  Clazz.newDoubleArray (-1, [koop, a0, a1, a2, koop * 10])]));
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [this.ic, ib, this.id, this.ia]),  Clazz.newDoubleArray (-1, [koop, a0, a1, a2, koop * 10])]));
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [this.id, ib, this.ia, this.ic]),  Clazz.newDoubleArray (-1, [koop, a0, a1, a2, koop * 10])]));
}, "JU.Lst,~N,~N,~N");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
var koop = (this.calcs.isPreliminary ? this.dData[4] : this.dData[0]);
var a0 = this.dData[1];
var a1 = this.dData[2];
var a2 = this.dData[3];
this.calcs.setOopVariables (this, true);
var cosTheta = Math.cos (this.theta);
this.energy = koop * (a0 + a1 * cosTheta + a2 * cosTheta * cosTheta);
if (this.calcs.gradients) {
this.dE = koop * (a1 * Math.sin (this.theta) + a2 * 2.0 * Math.sin (this.theta) * cosTheta);
this.calcs.addForces (this, 4);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (4, this));
return this.energy;
}, "~A");
});
