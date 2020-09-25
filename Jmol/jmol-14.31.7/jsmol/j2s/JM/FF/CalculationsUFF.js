Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculations"], "JM.FF.CalculationsUFF", ["JU.Lst", "JM.FF.UFFAngleCalc", "$.UFFDistanceCalc", "$.UFFOOPCalc", "$.UFFTorsionCalc", "$.UFFVDWCalc"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bondCalc = null;
this.angleCalc = null;
this.torsionCalc = null;
this.oopCalc = null;
this.vdwCalc = null;
Clazz.instantialize (this, arguments);
}, JM.FF, "CalculationsUFF", JM.FF.Calculations);
Clazz.makeConstructor (c$, 
function (ff, ffParams, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints) {
Clazz.superConstructor (this, JM.FF.CalculationsUFF, [ff, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints]);
this.ffParams = ffParams;
this.bondCalc =  new JM.FF.UFFDistanceCalc ().set (this);
this.angleCalc =  new JM.FF.UFFAngleCalc ().set (this);
this.torsionCalc =  new JM.FF.UFFTorsionCalc ().set (this);
this.oopCalc =  new JM.FF.UFFOOPCalc ().set (this);
this.vdwCalc =  new JM.FF.UFFVDWCalc ().set (this);
}, "JM.FF.ForceField,java.util.Map,~A,~A,~A,~A,~A,JU.Lst");
Clazz.overrideMethod (c$, "getUnits", 
function () {
return "kJ";
});
Clazz.overrideMethod (c$, "setupCalculations", 
function () {
var calc;
var distanceCalc =  new JM.FF.UFFDistanceCalc ().set (this);
calc = this.calculations[0] =  new JU.Lst ();
for (var i = 0; i < this.bondCount; i++) {
var bond = this.minBonds[i];
var bondOrder = bond.order;
if (bond.isAromatic) bondOrder = 1.5;
if (bond.isAmide) bondOrder = 1.41;
distanceCalc.setData (calc, bond.data[0], bond.data[1], bondOrder);
}
calc = this.calculations[1] =  new JU.Lst ();
var angleCalc =  new JM.FF.UFFAngleCalc ().set (this);
for (var i = this.minAngles.length; --i >= 0; ) angleCalc.setData (calc, this.minAngles[i].data);

calc = this.calculations[2] =  new JU.Lst ();
var torsionCalc =  new JM.FF.UFFTorsionCalc ().set (this);
for (var i = this.minTorsions.length; --i >= 0; ) torsionCalc.setData (calc, this.minTorsions[i].data);

calc = this.calculations[4] =  new JU.Lst ();
var oopCalc =  new JM.FF.UFFOOPCalc ().set (this);
var elemNo;
for (var i = 0; i < this.ac; i++) {
var a = this.minAtoms[i];
if (a.nBonds == 3 && JM.FF.CalculationsUFF.isInvertible (elemNo = a.atom.getElementNumber ())) oopCalc.setData (calc, i, elemNo, 0);
}
this.pairSearch (this.calculations[5] =  new JU.Lst (),  new JM.FF.UFFVDWCalc ().set (this), null, null);
return true;
});
c$.isInvertible = Clazz.defineMethod (c$, "isInvertible", 
 function (n) {
switch (n) {
case 6:
case 7:
case 8:
case 15:
case 33:
case 51:
case 83:
return true;
default:
return false;
}
}, "~N");
c$.calculateR0 = Clazz.defineMethod (c$, "calculateR0", 
function (ri, rj, chiI, chiJ, bondorder) {
var rbo = -0.1332 * (ri + rj) * Math.log (bondorder);
var dchi = Math.sqrt (chiI) - Math.sqrt (chiJ);
var ren = ri * rj * dchi * dchi / (chiI * ri + chiJ * rj);
return (ri + rj + rbo - ren);
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "compute", 
function (iType, dataIn) {
switch (iType) {
case 0:
return this.bondCalc.compute (dataIn);
case 1:
return this.angleCalc.compute (dataIn);
case 2:
return this.torsionCalc.compute (dataIn);
case 4:
return this.oopCalc.compute (dataIn);
case 5:
return this.vdwCalc.compute (dataIn);
}
return 0.0;
}, "~N,~A");
Clazz.overrideMethod (c$, "getDebugHeader", 
function (iType) {
switch (iType) {
case -1:
return "Universal Force Field -- Rappe, A. K., et. al.; J. Am. Chem. Soc. (1992) 114(25) p. 10024-10035\n";
default:
return this.getDebugHeader2 (iType);
}
}, "~N");
Clazz.overrideMethod (c$, "getParameterObj", 
function (o) {
return null;
}, "JM.MinObject");
Clazz.defineStatics (c$,
"KCAL332", 1390.2842991599998,
"KCAL644", 2696.8016159999997,
"KCAL6", 25.1208,
"KCAL22", 92.1096,
"KCAL44", 184.2192,
"PAR_R", 0,
"PAR_THETA", 1,
"PAR_X", 2,
"PAR_D", 3,
"PAR_ZETA", 4,
"PAR_Z", 5,
"PAR_V", 6,
"PAR_U", 7,
"PAR_XI", 8,
"PAR_HARD", 9,
"PAR_RADIUS", 10);
});
