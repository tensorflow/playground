Clazz.declarePackage ("JM.FF");
Clazz.load (["JU.AU", "$.SB", "$.V3d"], "JM.FF.Calculations", ["java.lang.Float", "JU.Lst", "$.PT", "JM.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parA = null;
this.parB = null;
this.parC = null;
this.ff = null;
this.calculations = null;
this.ffParams = null;
this.ac = 0;
this.bondCount = 0;
this.angleCount = 0;
this.torsionCount = 0;
this.minAtoms = null;
this.minBonds = null;
this.minAngles = null;
this.minTorsions = null;
this.minPositions = null;
this.constraintsByType = null;
this.haveConstraints = false;
this.isPreliminary = false;
this.gradients = false;
this.silent = false;
this.logData = null;
this.logging = false;
this.loggingEnabled = false;
this.da = null;
this.db = null;
this.dc = null;
this.dd = null;
this.ia = 0;
this.ib = 0;
this.ic = 0;
this.id = 0;
this.v1 = null;
this.v2 = null;
this.v3 = null;
Clazz.instantialize (this, arguments);
}, JM.FF, "Calculations");
Clazz.prepareFields (c$, function () {
this.calculations = JU.AU.createArrayOfArrayList (7);
this.logData =  new JU.SB ();
this.da =  new JU.V3d ();
this.db =  new JU.V3d ();
this.dc =  new JU.V3d ();
this.dd =  new JU.V3d ();
this.v1 =  new JU.V3d ();
this.v2 =  new JU.V3d ();
this.v3 =  new JU.V3d ();
});
Clazz.defineMethod (c$, "getParameter", 
function (o) {
return this.ffParams.get (o);
}, "~O");
Clazz.makeConstructor (c$, 
function (ff, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints) {
this.ff = ff;
this.minAtoms = minAtoms;
this.minBonds = minBonds;
this.minAngles = minAngles;
this.minTorsions = minTorsions;
this.minPositions = minPositions;
this.ac = minAtoms.length;
this.bondCount = minBonds.length;
this.angleCount = minAngles.length;
this.torsionCount = minTorsions.length;
this.setConstraints (constraints);
}, "JM.FF.ForceField,~A,~A,~A,~A,~A,JU.Lst");
Clazz.defineMethod (c$, "setConstraints", 
function (constraints) {
if (constraints == null || constraints.isEmpty ()) return;
this.constraintsByType =  Clazz.newArray (-1, [null, null, null]);
this.haveConstraints = true;
var lists =  new Array (3);
for (var i = 0, n = constraints.size (); i < n; i++) {
var c = constraints.get (i);
if (lists[c.type] == null) lists[c.type] =  new JU.Lst ();
lists[c.type].addLast (c);
}
for (var type = 0; type <= 2; type++) {
var list = lists[type];
if (list != null) this.constraintsByType[type] = list.toArray ( new Array (list.size ()));
}
}, "JU.Lst");
Clazz.defineMethod (c$, "addForce", 
function (v, i, dE) {
this.minAtoms[i].force[0] += v.x * dE;
this.minAtoms[i].force[1] += v.y * dE;
this.minAtoms[i].force[2] += v.z * dE;
}, "JU.V3d,~N,~N");
Clazz.defineMethod (c$, "setSilent", 
function (TF) {
this.silent = TF;
}, "~B");
Clazz.defineMethod (c$, "getLogData", 
function () {
return this.logData.toString ();
});
Clazz.defineMethod (c$, "appendLogData", 
function (s) {
this.logData.append (s).append ("\n");
}, "~S");
Clazz.defineMethod (c$, "setLoggingEnabled", 
function (TF) {
this.loggingEnabled = TF;
if (this.loggingEnabled) this.logData =  new JU.SB ();
}, "~B");
Clazz.defineMethod (c$, "setPreliminary", 
function (TF) {
this.isPreliminary = TF;
}, "~B");
Clazz.defineMethod (c$, "pairSearch", 
function (calc1, pc1, calc2, pc2) {
for (var i = 0; i < this.ac - 1; i++) {
var bsVdw = this.minAtoms[i].bsVdw;
for (var j = bsVdw.nextSetBit (0); j >= 0; j = bsVdw.nextSetBit (j + 1)) {
pc1.setData (calc1, i, j, 0);
if (pc2 != null) pc2.setData (calc2, i, j, 0);
}
}
}, "JU.Lst,JM.FF.Calculation,JU.Lst,JM.FF.Calculation");
Clazz.defineMethod (c$, "calc", 
 function (iType, gradients, canConstrain) {
this.logging = this.loggingEnabled && !this.silent;
this.gradients = gradients;
var calcs = this.calculations[iType];
var nCalc;
var energy = 0;
if (calcs == null || (nCalc = calcs.size ()) == 0) return 0;
if (this.logging) this.appendLogData (this.getDebugHeader (iType));
for (var ii = 0; ii < nCalc; ii++) energy += this.compute (iType, this.calculations[iType].get (ii));

if (this.logging) this.appendLogData (this.getDebugFooter (iType, energy));
if (canConstrain && this.haveConstraints && this.constraintsByType[iType] != null) energy += this.constraintEnergy (iType);
return energy;
}, "~N,~B,~B");
Clazz.defineMethod (c$, "energyStrBnd", 
function (gradients) {
return 0.0;
}, "~B");
Clazz.defineMethod (c$, "energyBond", 
function (gradients) {
return this.calc (0, gradients, true);
}, "~B");
Clazz.defineMethod (c$, "energyAngle", 
function (gradients) {
return this.calc (1, gradients, true);
}, "~B");
Clazz.defineMethod (c$, "energyTorsion", 
function (gradients) {
return this.calc (2, gradients, true);
}, "~B");
Clazz.defineMethod (c$, "energyStretchBend", 
function (gradients) {
return this.calc (3, gradients, false);
}, "~B");
Clazz.defineMethod (c$, "energyOOP", 
function (gradients) {
return this.calc (4, gradients, false);
}, "~B");
Clazz.defineMethod (c$, "energyVDW", 
function (gradients) {
return this.calc (5, gradients, false);
}, "~B");
Clazz.defineMethod (c$, "energyES", 
function (gradients) {
return this.calc (6, gradients, false);
}, "~B");
Clazz.defineMethod (c$, "constraintEnergy", 
 function (iType) {
var constraints = this.constraintsByType[iType];
var value = 0;
var k = 0;
var energy = 0;
for (var i = constraints.length; --i >= 0; ) {
var c = constraints[i];
var minList = c.minList;
var targetValue = c.value;
switch (iType) {
case 2:
this.id = minList[3];
if (this.gradients) this.dd.setA (this.minAtoms[this.id].coord);
case 1:
this.ic = minList[2];
if (this.gradients) this.dc.setA (this.minAtoms[this.ic].coord);
case 0:
this.ib = minList[1];
this.ia = minList[0];
if (this.gradients) {
this.db.setA (this.minAtoms[this.ib].coord);
this.da.setA (this.minAtoms[this.ia].coord);
}break;
}
k = 10000.0;
switch (iType) {
case 2:
targetValue *= 0.017453292519943295;
value = (this.gradients ? JM.Util.restorativeForceAndTorsionAngleRadians (this.da, this.db, this.dc, this.dd) : JM.Util.getTorsionAngleRadians (this.minAtoms[this.ia].coord, this.minAtoms[this.ib].coord, this.minAtoms[this.ic].coord, this.minAtoms[this.id].coord, this.v1, this.v2, this.v3));
if (value < 0 && targetValue >= 1.5707963267948966) value += 6.283185307179586;
 else if (value > 0 && targetValue <= -1.5707963267948966) targetValue += 6.283185307179586;
break;
case 1:
targetValue *= 0.017453292519943295;
value = (this.gradients ? JM.Util.restorativeForceAndAngleRadians (this.da, this.db, this.dc) : JM.Util.getAngleRadiansABC (this.minAtoms[this.ia].coord, this.minAtoms[this.ib].coord, this.minAtoms[this.ic].coord));
break;
case 0:
value = (this.gradients ? JM.Util.restorativeForceAndDistance (this.da, this.db, this.dc) : Math.sqrt (JM.Util.distance2 (this.minAtoms[this.ia].coord, this.minAtoms[this.ib].coord)));
break;
}
energy += this.constrainQuadratic (value, targetValue, k, iType);
}
return energy;
}, "~N");
Clazz.defineMethod (c$, "constrainQuadratic", 
 function (value, targetValue, k, iType) {
if (!JM.Util.isFinite (value)) return 0;
var delta = value - targetValue;
if (this.gradients) {
var dE = 2.0 * k * delta;
switch (iType) {
case 2:
this.addForce (this.dd, this.id, dE);
case 1:
this.addForce (this.dc, this.ic, dE);
case 0:
this.addForce (this.db, this.ib, dE);
this.addForce (this.da, this.ia, dE);
}
}return k * delta * delta;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getConstraintList", 
function () {
if (this.constraintsByType == null) return;
this.appendLogData ("C O N S T R A I N T S\n---------------------");
for (var type = 0; type <= 2; type++) {
var constraints = this.constraintsByType[type];
if (constraints == null) continue;
for (var i = 0, n = constraints.length; i < n; i++) {
var c = constraints[i];
var minList = c.minList;
var targetValue = c.value;
switch (c.type) {
case 2:
this.id = minList[3];
case 1:
this.ic = minList[2];
case 0:
this.ib = minList[1];
this.ia = minList[0];
}
switch (c.type) {
case 0:
this.appendLogData (JU.PT.sprintf ("%3d %3d  %-5s %-5s  %12.6f", "ssFI",  Clazz.newArray (-1, [this.minAtoms[this.ia].atom.getAtomName (), this.minAtoms[this.ib].atom.getAtomName (),  Clazz.newFloatArray (-1, [targetValue]),  Clazz.newIntArray (-1, [this.minAtoms[this.ia].atom.getAtomNumber (), this.minAtoms[this.ib].atom.getAtomNumber ()])])));
break;
case 1:
this.appendLogData (JU.PT.sprintf ("%3d %3d %3d  %-5s %-5s %-5s  %12.6f", "sssFI",  Clazz.newArray (-1, [this.minAtoms[this.ia].atom.getAtomName (), this.minAtoms[this.ib].atom.getAtomName (), this.minAtoms[this.ic].atom.getAtomName (),  Clazz.newFloatArray (-1, [targetValue]),  Clazz.newIntArray (-1, [this.minAtoms[this.ia].atom.getAtomNumber (), this.minAtoms[this.ib].atom.getAtomNumber (), this.minAtoms[this.ic].atom.getAtomNumber ()])])));
break;
case 2:
this.appendLogData (JU.PT.sprintf ("%3d %3d %3d %3d  %-5s %-5s %-5s %-5s  %3d %8.3f     %8.3f     %8.3f     %8.3f", "ssssFI",  Clazz.newArray (-1, [this.minAtoms[this.ia].atom.getAtomName (), this.minAtoms[this.ib].atom.getAtomName (), this.minAtoms[this.ic].atom.getAtomName (), this.minAtoms[this.id].atom.getAtomName (),  Clazz.newFloatArray (-1, [targetValue]),  Clazz.newIntArray (-1, [this.minAtoms[this.ia].atom.getAtomNumber (), this.minAtoms[this.ib].atom.getAtomNumber (), this.minAtoms[this.ic].atom.getAtomNumber (), this.minAtoms[this.id].atom.getAtomNumber ()])])));
break;
}
}
}
this.appendLogData ("---------------------\n");
});
Clazz.defineMethod (c$, "getAtomList", 
function (title) {
var trailer = "--------------------------------------------------------------------------------------------------\n";
var sb =  new JU.SB ();
sb.append ("\n" + title + "\n\n" + " ATOM    X        Y        Z    TYPE       GRADX    GRADY    GRADZ  " + "---------BONDED ATOMS--------\n" + trailer);
for (var i = 0; i < this.ac; i++) {
var atom = this.minAtoms[i];
var others = atom.getBondedAtomIndexes ();
var iVal =  Clazz.newIntArray (others.length + 2, 0);
iVal[0] = atom.atom.getAtomNumber ();
iVal[1] = (atom.ffAtomType == null ? 0 : atom.ffAtomType.mmType);
var s = "   ";
for (var j = 0; j < others.length; j++) {
s += " %3d";
iVal[j + 2] = this.minAtoms[others[j]].atom.getAtomNumber ();
}
sb.append (JU.PT.sprintf ("%3d %8.3f %8.3f %8.3f %-5s %2d %8.3f %8.3f %8.3f" + s + "\n", "sFI",  Clazz.newArray (-1, [atom.sType,  Clazz.newFloatArray (-1, [atom.coord[0], atom.coord[1], atom.coord[2], atom.force[0], atom.force[1], atom.force[2]]), iVal])));
}
sb.append (trailer + "\n\n");
return sb.toString ();
}, "~S");
Clazz.defineMethod (c$, "getDebugHeader2", 
function (iType) {
switch (iType) {
case -1:
break;
case 0:
return "\nB O N D   S T R E T C H I N G (" + this.bondCount + " bonds)\n\n" + "  ATOMS  ATOM TYPES   BOND    BOND       IDEAL      FORCE\n" + "  I   J   I     J     TYPE   LENGTH     LENGTH    CONSTANT      DELTA     ENERGY\n" + "--------------------------------------------------------------------------------";
case 1:
return "\nA N G L E   B E N D I N G (" + this.minAngles.length + " angles)\n\n" + "    ATOMS      ATOM TYPES        VALENCE    IDEAL        FORCE\n" + "  I   J   K   I     J     K       ANGLE     ANGLE      CONSTANT     ENERGY\n" + "--------------------------------------------------------------------------";
case 3:
return "\nS T R E T C H   B E N D I N G (" + (this.minAngles.length * 2) + " angles)\n\n" + "    ATOMS      ATOM TYPES        VALENCE    IDEAL        FORCE\n" + "  I   J   K   I     J     K       ANGLE     ANGLE      CONSTANT     ENERGY\n" + "--------------------------------------------------------------------------";
case 2:
return "\nT O R S I O N A L (" + this.minTorsions.length + " torsions)\n\n" + "      ATOMS           ATOM TYPES            n    COS          FORCE      TORSION\n" + "  I   J   K   L   I     J     K     L          (n phi0)      CONSTANT     ANGLE        ENERGY\n" + "---------------------------------------------------------------------------------------------";
case 4:
return "\nO U T - O F - P L A N E   B E N D I N G\n\n      ATOMS           ATOM TYPES             OOP        FORCE \n  I   J   K   L   I     J     K     L       ANGLE     CONSTANT      ENERGY\n--------------------------------------------------------------------------";
case 5:
return "\nV A N   D E R   W A A L S  (partial list)\n\n  ATOMS  ATOM TYPES\n  I   J   I     J      Rij       kij     ENERGY\n-----------------------------------------------";
case 6:
return "\nE L E C T R O S T A T I C   I N T E R A C T I O N S  (partial list)\n\n  ATOMS  ATOM TYPES \n  I   J   I     J      Rij      f          Qi          Qj    ENERGY\n-------------------------------------------------------------------";
}
return "";
}, "~N");
Clazz.defineMethod (c$, "getDebugLine", 
function (iType, c) {
return this.getDebugLineC (iType, c);
}, "~N,JM.FF.Calculation");
Clazz.defineMethod (c$, "getDebugLineC", 
function (iType, c) {
var energy = this.ff.toUserUnits (c.energy);
switch (iType) {
case 0:
return JU.PT.sprintf ("%3d %3d  %-5s %-5s  %4.2f%8.3f   %8.3f     %8.3f   %8.3f   %8.3f", "ssFI",  Clazz.newArray (-1, [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType,  Clazz.newFloatArray (-1, [0, c.rab, c.dData[1], c.dData[0], c.delta, energy]),  Clazz.newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber ()])]));
case 1:
case 3:
return JU.PT.sprintf ("%3d %3d %3d  %-5s %-5s %-5s  %8.3f  %8.3f     %8.3f   %8.3f", "sssFI",  Clazz.newArray (-1, [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType,  Clazz.newFloatArray (-1, [(c.theta * 57.29577951308232), c.dData[1], c.dData[0], energy]),  Clazz.newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber ()])]));
case 2:
return JU.PT.sprintf ("%3d %3d %3d %3d  %-5s %-5s %-5s %-5s  %3d %8.3f     %8.3f     %8.3f     %8.3f", "ssssFI",  Clazz.newArray (-1, [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, this.minAtoms[c.id].sType,  Clazz.newFloatArray (-1, [c.dData[1], c.dData[0], (c.theta * 57.29577951308232), energy]),  Clazz.newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber (), this.minAtoms[c.id].atom.getAtomNumber (), c.iData[4]])]));
case 4:
return JU.PT.sprintf ("%3d %3d %3d %3d  %-5s %-5s %-5s %-5s  %8.3f   %8.3f     %8.3f", "ssssFI",  Clazz.newArray (-1, [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, this.minAtoms[c.id].sType,  Clazz.newFloatArray (-1, [(c.theta * 57.29577951308232), c.dData[0], energy]),  Clazz.newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber (), this.minAtoms[c.id].atom.getAtomNumber ()])]));
case 5:
return JU.PT.sprintf ("%3d %3d  %-5s %-5s %6.3f  %8.3f  %8.3f", "ssFI",  Clazz.newArray (-1, [this.minAtoms[c.iData[0]].sType, this.minAtoms[c.iData[1]].sType,  Clazz.newFloatArray (-1, [c.rab, c.dData[0], energy]),  Clazz.newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber ()])]));
case 6:
return JU.PT.sprintf ("%3d %3d  %-5s %-5s %6.3f  %8.3f  %8.3f  %8.3f  %8.3f", "ssFI",  Clazz.newArray (-1, [this.minAtoms[c.iData[0]].sType, this.minAtoms[c.iData[1]].sType,  Clazz.newFloatArray (-1, [c.rab, c.dData[0], c.dData[1], c.dData[2], energy]),  Clazz.newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber ()])]));
}
return "";
}, "~N,JM.FF.Calculation");
Clazz.defineMethod (c$, "getDebugFooter", 
function (iType, energy) {
var s = "";
switch (iType) {
case 0:
s = "BOND STRETCHING";
break;
case 1:
s = "ANGLE BENDING";
break;
case 2:
s = "TORSIONAL";
break;
case 4:
s = "OUT-OF-PLANE BENDING";
break;
case 3:
s = "STRETCH BENDING";
break;
case 5:
s = "VAN DER WAALS";
break;
case 6:
s = "ELECTROSTATIC ENERGY";
break;
}
return JU.PT.sprintf ("\n     TOTAL %s ENERGY = %8.3f %s/mol\n", "sfs",  Clazz.newArray (-1, [s, Float.$valueOf (this.ff.toUserUnits (energy)), this.ff.minimizer.units]));
}, "~N,~N");
Clazz.defineMethod (c$, "setPairVariables", 
function (c) {
if (this.gradients) {
this.setCoords (c, 2);
c.rab = JM.Util.restorativeForceAndDistance (this.da, this.db, this.dc);
} else {
c.rab = Math.sqrt (JM.Util.distance2 (this.minAtoms[c.ia].coord, this.minAtoms[c.ib].coord));
}if (JM.Util.isNearZero2 (c.rab, 1.0e-3)) c.rab = 1.0e-3;
}, "JM.FF.Calculation");
Clazz.defineMethod (c$, "setAngleVariables", 
function (c) {
if (this.gradients) {
this.setCoords (c, 3);
c.theta = JM.Util.restorativeForceAndAngleRadians (this.da, this.db, this.dc);
} else {
c.theta = JM.Util.getAngleRadiansABC (this.minAtoms[c.ia].coord, this.minAtoms[c.ib].coord, this.minAtoms[c.ic].coord);
}if (!JM.Util.isFinite (c.theta)) c.theta = 0.0;
}, "JM.FF.Calculation");
Clazz.defineMethod (c$, "setOopVariables", 
function (c, fixTheta) {
this.setCoords (c, 4);
if (this.gradients) {
c.theta = JM.Util.restorativeForceAndOutOfPlaneAngleRadians (this.da, this.db, this.dc, this.dd, this.v1, this.v2, this.v3);
} else {
c.theta = JM.Util.pointPlaneAngleRadians (this.da, this.db, this.dc, this.dd, this.v1, this.v2, this.v3, fixTheta);
}if (!JM.Util.isFinite (c.theta)) c.theta = 0.0;
}, "JM.FF.Calculation,~B");
Clazz.defineMethod (c$, "setTorsionVariables", 
function (c) {
if (this.gradients) {
this.setCoords (c, 4);
c.theta = JM.Util.restorativeForceAndTorsionAngleRadians (this.da, this.db, this.dc, this.dd);
if (!JM.Util.isFinite (c.theta)) c.theta = 1.7453292519943296E-5;
} else {
c.theta = JM.Util.getTorsionAngleRadians (this.minAtoms[c.ia].coord, this.minAtoms[c.ib].coord, this.minAtoms[c.ic].coord, this.minAtoms[c.id].coord, this.v1, this.v2, this.v3);
}}, "JM.FF.Calculation");
Clazz.defineMethod (c$, "setCoords", 
function (c, n) {
switch (n) {
case 4:
this.da.setA (this.minAtoms[c.ia].coord);
case 3:
this.db.setA (this.minAtoms[c.ib].coord);
case 2:
this.dc.setA (this.minAtoms[c.ic].coord);
case 1:
this.dd.setA (this.minAtoms[c.id].coord);
}
}, "JM.FF.Calculation,~N");
Clazz.defineMethod (c$, "addForces", 
function (c, n) {
switch (n) {
case 4:
this.addForce (this.dd, c.id, c.dE);
case 3:
this.addForce (this.dc, c.ic, c.dE);
case 2:
this.addForce (this.db, c.ib, c.dE);
case 1:
this.addForce (this.da, c.ia, c.dE);
}
}, "JM.FF.Calculation,~N");
Clazz.defineMethod (c$, "isLinear", 
function (i) {
return false;
}, "~N");
Clazz.defineStatics (c$,
"RAD_TO_DEG", (57.29577951308232),
"DEG_TO_RAD", (0.017453292519943295),
"KCAL_TO_KJ", 4.1868,
"CALC_DISTANCE", 0,
"CALC_ANGLE", 1,
"CALC_TORSION", 2,
"CALC_STRETCH_BEND", 3,
"CALC_OOP", 4,
"CALC_VDW", 5,
"CALC_ES", 6,
"CALC_MAX", 7,
"PI_OVER_2", 1.5707963267948966,
"TWO_PI", 6.283185307179586);
});
