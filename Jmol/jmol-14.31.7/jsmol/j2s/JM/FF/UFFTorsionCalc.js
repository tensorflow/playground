Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculation"], "JM.FF.UFFTorsionCalc", ["JM.Util"], function () {
c$ = Clazz.declareType (JM.FF, "UFFTorsionCalc", JM.FF.Calculation);
Clazz.defineMethod (c$, "setData", 
function (calc, t) {
var cosNPhi0 = -1;
var n = 0;
var V = 0;
this.a = this.calcs.minAtoms[this.ia = t[0]];
this.b = this.calcs.minAtoms[this.ib = t[1]];
this.c = this.calcs.minAtoms[this.ic = t[2]];
this.d = this.calcs.minAtoms[this.id = t[3]];
var bc = this.c.getBondTo (this.ib);
var bondOrder = bc.order;
if (bc.isAromatic) bondOrder = 1.5;
if (bc.isAmide) bondOrder = 1.41;
this.calcs.parB = this.calcs.getParameter (this.b.sType);
this.calcs.parC = this.calcs.getParameter (this.c.sType);
switch (this.calcs.parB.iVal[0] * this.calcs.parC.iVal[0]) {
case 9:
n = 3;
var vi = this.calcs.parB.dVal[6];
var vj = this.calcs.parC.dVal[6];
var viNew = 0;
switch (this.b.atom.getElementNumber ()) {
case 8:
viNew = 2.0;
break;
case 16:
case 34:
case 52:
case 84:
viNew = 6.8;
}
if (viNew != 0) switch (this.c.atom.getElementNumber ()) {
case 8:
vi = viNew;
vj = 2.0;
n = 2;
break;
case 16:
case 34:
case 52:
case 84:
vi = viNew;
vj = 6.8;
n = 2;
}
V = 0.5 * 4.1868 * Math.sqrt (vi * vj);
break;
case 4:
cosNPhi0 = 1;
n = 2;
V = 0.5 * 4.1868 * 5.0 * Math.sqrt (this.calcs.parB.dVal[7] * this.calcs.parC.dVal[7]) * (1.0 + 4.18 * Math.log (bondOrder));
break;
case 6:
cosNPhi0 = 1;
n = 6;
var sp3C = (this.calcs.parC.iVal[0] == 3);
switch ((sp3C ? this.c : this.b).atom.getElementNumber ()) {
case 8:
case 16:
case 34:
case 52:
case 84:
switch ((sp3C ? this.b : this.c).atom.getElementNumber ()) {
case 8:
case 16:
case 34:
case 52:
case 84:
break;
default:
n = 2;
cosNPhi0 = -1;
}
break;
}
V = 2.0934;
}
if (JM.Util.isNearZero (V)) return;
calc.addLast ( Clazz.newArray (-1, [ Clazz.newIntArray (-1, [this.ia, this.ib, this.ic, this.id, n]),  Clazz.newDoubleArray (-1, [V, cosNPhi0])]));
}, "JU.Lst,~A");
Clazz.overrideMethod (c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
var n = this.iData[4];
var V = this.dData[0];
var cosNPhi0 = this.dData[1];
this.calcs.setTorsionVariables (this);
this.energy = V * (1.0 - cosNPhi0 * Math.cos (this.theta * n));
if (this.calcs.gradients) {
this.dE = V * n * cosNPhi0 * Math.sin (n * this.theta);
this.calcs.addForces (this, 4);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (2, this));
return this.energy;
}, "~A");
});
