Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.Calculations"], "JM.FF.CalculationsMMFF", ["JU.Lst", "$.PT", "JM.MinAtom", "$.MinObject", "JM.FF.MMFFAngleCalc", "$.MMFFDistanceCalc", "$.MMFFESCalc", "$.MMFFOOPCalc", "$.MMFFSBCalc", "$.MMFFTorsionCalc", "$.MMFFVDWCalc"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bondCalc = null;
this.angleCalc = null;
this.torsionCalc = null;
this.oopCalc = null;
this.vdwCalc = null;
this.esCalc = null;
this.sbCalc = null;
this.mmff = null;
Clazz.instantialize (this, arguments);
}, JM.FF, "CalculationsMMFF", JM.FF.Calculations);
Clazz.makeConstructor (c$, 
function (ff, ffParams, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints) {
Clazz.superConstructor (this, JM.FF.CalculationsMMFF, [ff, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints]);
this.mmff = ff;
this.ffParams = ffParams;
this.bondCalc =  new JM.FF.MMFFDistanceCalc ().set (this);
this.angleCalc =  new JM.FF.MMFFAngleCalc ().set (this);
this.sbCalc =  new JM.FF.MMFFSBCalc ().set (this);
this.torsionCalc =  new JM.FF.MMFFTorsionCalc ().set (this);
this.oopCalc =  new JM.FF.MMFFOOPCalc ().set (this);
this.vdwCalc =  new JM.FF.MMFFVDWCalc ().set (this);
this.esCalc =  new JM.FF.MMFFESCalc ().set (this);
}, "JM.FF.ForceField,java.util.Map,~A,~A,~A,~A,~A,JU.Lst");
Clazz.overrideMethod (c$, "getUnits", 
function () {
return "kcal";
});
Clazz.overrideMethod (c$, "setupCalculations", 
function () {
var calc;
var distanceCalc =  new JM.FF.MMFFDistanceCalc ().set (this);
calc = this.calculations[0] =  new JU.Lst ();
for (var i = 0; i < this.bondCount; i++) distanceCalc.setData (calc, this.minBonds[i]);

calc = this.calculations[1] =  new JU.Lst ();
var angleCalc =  new JM.FF.MMFFAngleCalc ().set (this);
for (var i = 0; i < this.angleCount; i++) angleCalc.setData (calc, this.minAngles[i]);

calc = this.calculations[3] =  new JU.Lst ();
var sbCalc =  new JM.FF.MMFFSBCalc ().set (this);
for (var i = 0; i < this.angleCount; i++) sbCalc.setData (calc, this.minAngles[i]);

calc = this.calculations[2] =  new JU.Lst ();
var torsionCalc =  new JM.FF.MMFFTorsionCalc ().set (this);
for (var i = 0; i < this.torsionCount; i++) torsionCalc.setData (calc, this.minTorsions[i]);

calc = this.calculations[4] =  new JU.Lst ();
var oopCalc =  new JM.FF.MMFFOOPCalc ().set (this);
for (var i = 0; i < this.ac; i++) if (JM.FF.CalculationsMMFF.isInvertible (this.minAtoms[i])) oopCalc.setData (calc, i);

this.pairSearch (this.calculations[5] =  new JU.Lst (),  new JM.FF.MMFFVDWCalc ().set (this), this.calculations[6] =  new JU.Lst (),  new JM.FF.MMFFESCalc ().set (this));
return true;
});
Clazz.overrideMethod (c$, "isLinear", 
function (i) {
return JM.MinAtom.isLinear (this.minAtoms[i]);
}, "~N");
c$.isInvertible = Clazz.defineMethod (c$, "isInvertible", 
 function (a) {
switch (a.ffType) {
default:
return false;
case 2:
case 3:
case 10:
case 30:
case 37:
case 39:
case 40:
case 41:
case 45:
case 49:
case 54:
case 55:
case 56:
case 57:
case 58:
case 63:
case 64:
case 67:
case 69:
case 78:
case 80:
case 81:
return true;
}
}, "JM.MinAtom");
Clazz.overrideMethod (c$, "compute", 
function (iType, dataIn) {
switch (iType) {
case 0:
return this.bondCalc.compute (dataIn);
case 1:
return this.angleCalc.compute (dataIn);
case 3:
return this.sbCalc.compute (dataIn);
case 2:
return this.torsionCalc.compute (dataIn);
case 4:
return this.oopCalc.compute (dataIn);
case 5:
return this.vdwCalc.compute (dataIn);
case 6:
return this.esCalc.compute (dataIn);
}
return 0.0;
}, "~N,~A");
Clazz.overrideMethod (c$, "getParameterObj", 
function (a) {
return (a.key == null || a.ddata != null ? a.ddata : this.ffParams.get (a.key));
}, "JM.MinObject");
Clazz.overrideMethod (c$, "getDebugHeader", 
function (iType) {
switch (iType) {
case -1:
return "MMFF94 Force Field -- T. A. Halgren, J. Comp. Chem. 5 & 6 490-519ff (1996).\n";
case 2:
return "\nT O R S I O N A L (" + this.minTorsions.length + " torsions)\n\n" + "      ATOMS           ATOM TYPES          TORSION\n" + "  I   J   K   L   I     J     K     L      ANGLE       V1       V2       V3     ENERGY\n" + "--------------------------------------------------------------------------------------\n";
default:
return this.getDebugHeader2 (iType);
}
}, "~N");
Clazz.overrideMethod (c$, "getDebugLine", 
function (iType, c) {
var energy = this.ff.toUserUnits (c.energy);
switch (iType) {
case 1:
case 3:
return JU.PT.sprintf ("%11s  %-5s %-5s %-5s  %8.3f  %8.3f     %8.3f   %8.3f", "ssssFI",  Clazz.newArray (-1, [JM.MinObject.decodeKey (c.key), this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType,  Clazz.newFloatArray (-1, [(c.theta * 57.29577951308232), c.dData[1], c.dData[0], energy]),  Clazz.newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber ()])]));
case 2:
return JU.PT.sprintf ("%15s  %-5s %-5s %-5s %-5s  %8.3f %8.3f %8.3f %8.3f %8.3f", "sssssF",  Clazz.newArray (-1, [JM.MinObject.decodeKey (c.key), this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, this.minAtoms[c.id].sType,  Clazz.newFloatArray (-1, [(c.theta * 57.29577951308232), c.dData[0], c.dData[1], c.dData[2], energy])]));
default:
return this.getDebugLineC (iType, c);
}
}, "~N,JM.FF.Calculation");
Clazz.defineStatics (c$,
"FPAR", 143.9325,
"DA_D", 'D',
"DA_DA", 133);
});
