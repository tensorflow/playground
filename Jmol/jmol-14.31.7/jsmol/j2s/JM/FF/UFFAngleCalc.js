Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.UFFAngleCalc", ["JM.FF.CalculationsUFF"], function () {
c$ = Clazz.declareType (JM.FF, "UFFAngleCalc", JM.FF.Calculation);
Clazz.defineMethod (c$, "setData", 
function (calc, angle) {
this.a = this.calcs.minAtoms[this.ia = angle[0]];
this.b = this.calcs.minAtoms[this.ib = angle[1]];
this.c = this.calcs.minAtoms[this.ic = angle[2]];
var preliminaryMagnification = (this.a.sType === "H_" && this.c.sType === "H_" ? 10 : 1);
this.calcs.parA = this.calcs.getParameter (this.a.sType);
this.calcs.parB = this.calcs.getParameter (this.b.sType);
this.calcs.parC = this.calcs.getParameter (this.c.sType);
var coordination = this.calcs.parB.iVal[0];
var zi = this.calcs.parA.dVal[5];
var zk = this.calcs.parC.dVal[5];
var theta0 = this.calcs.parB.dVal[1];
var cosT0 = Math.cos (theta0);
var sinT0 = Math.sin (theta0);
var c0;
var c1;
var c2;
switch (coordination) {
case 1:
case 2:
case 4:
case 6:
c0 = c1 = c2 = 0;
break;
default:
c2 = 1.0 / (4.0 * sinT0 * sinT0);
c1 = -4.0 * c2 * cosT0;
c0 = c2 * (2.0 * cosT0 * cosT0 + 1.0);
}
var bond = this.a.getBondTo (this.ib);
var bondorder = bond.order;
if (bond.isAromatic) bondorder = 1.5;
if (bond.isAmide) bondorder = 1.41;
this.rab = JM.FF.CalculationsUFF.calculateR0 (this.calcs.parA.dVal[0], this.calcs.parB.dVal[0], this.calcs.parA.dVal[8], this.calcs.parB.dVal[8], bondorder);
bond = this.c.getBondTo (this.ib);
bondorder = bond.order;
if (bond.isAromatic) bondorder = 1.5;
if (bond.isAmide) bondorder = 1.41;
var rbc = JM.FF.CalculationsUFF.calculateR0 (this.calcs.parB.dVal[0], this.calcs.parC.dVal[0], this.calcs.parB.dVal[8], this.calcs.parC.dVal[8], bondorder);
var rac = Math.sqrt (this.rab * this.rab + rbc * rbc - 2.0 * this.rab * rbc * cosT0);
var ka = (2696.8016159999997) * (zi * zk / (Math.pow (rac, 5.0))) * (3.0 * this.rab * rbc * (1.0 - cosT0 * cosT0) - rac * rac * cosT0);
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [this.ia, this.ib, this.ic, coordination]),  Clazz.newDoubleArray (-1, [ka, theta0 * 57.29577951308232, c0 - c2, c1, 2 * c2, preliminaryMagnification * ka])]));
}, "JU.Lst,~A");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
var coordination = this.iData[3];
var ka = (this.calcs.isPreliminary ? this.dData[5] : this.dData[0]);
var a0 = this.dData[2];
var a1 = this.dData[3];
var a2 = this.dData[4];
this.calcs.setAngleVariables (this);
if ((coordination == 4 || coordination == 6) && (this.theta > 2.35619 || this.theta < 0.785398)) coordination = 1;
var cosT = Math.cos (this.theta);
var sinT = Math.sin (this.theta);
switch (coordination) {
case 0:
case 1:
this.energy = ka * (1.0 + cosT) * (1.0 + cosT) / 4.0;
break;
case 2:
this.energy = ka * (1.0 + (4.0 * cosT) * (1.0 + cosT)) / 9.0;
break;
case 4:
case 6:
this.energy = ka * cosT * cosT;
break;
default:
this.energy = ka * (a0 + a1 * cosT + a2 * cosT * cosT);
}
if (this.calcs.gradients) {
switch (coordination) {
case 0:
case 1:
this.dE = -0.5 * ka * sinT * (1 + cosT);
break;
case 2:
this.dE = -4.0 * sinT * ka * (1.0 - 2.0 * cosT) / 9.0;
break;
case 4:
case 6:
this.dE = -ka * sinT * cosT;
break;
default:
this.dE = -ka * (a1 * sinT - 2.0 * a2 * cosT * sinT);
}
this.calcs.addForces (this, 3);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (1, this));
return this.energy;
}, "~A");
});
