(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Clazz_declarePackage ("JM");
Clazz_load (null, "JM.Minimizer", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "J.i18n.GT", "JM.MMConstraint", "$.MinAngle", "$.MinAtom", "$.MinBond", "$.MinTorsion", "$.MinimizationThread", "JM.FF.ForceFieldMMFF", "$.ForceFieldUFF", "JU.BSUtil", "$.Escape", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.atoms = null;
this.bonds = null;
this.rawBondCount = 0;
this.minAtoms = null;
this.minBonds = null;
this.minAngles = null;
this.minTorsions = null;
this.minPositions = null;
this.bsMinFixed = null;
this.ac = 0;
this.bondCount = 0;
this.atomMap = null;
this.partialCharges = null;
this.steps = 50;
this.crit = 1e-3;
this.units = "kJ/mol";
this.pFF = null;
this.ff = "UFF";
this.bsTaint = null;
this.bsSelected = null;
this.bsAtoms = null;
this.bsFixedDefault = null;
this.bsFixed = null;
this.constraints = null;
this.isSilent = false;
this.constraintMap = null;
this.elemnoMax = 0;
this.$minimizationOn = false;
this.minimizationThread = null;
this.coordSaved = null;
Clazz_instantialize (this, arguments);
}, JM, "Minimizer");
Clazz_makeConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "setProperty", 
function (propertyName, value) {
switch (("ff        cancel    clear     constraintfixed     stop      vwr    ").indexOf (propertyName)) {
case 0:
if (!this.ff.equals (value)) {
this.setProperty ("clear", null);
this.ff = value;
}break;
case 10:
this.stopMinimization (false);
break;
case 20:
if (this.minAtoms != null) {
this.stopMinimization (false);
this.clear ();
}break;
case 30:
this.addConstraint (value);
break;
case 40:
this.bsFixedDefault = value;
break;
case 50:
this.stopMinimization (true);
break;
case 60:
this.vwr = value;
break;
}
return this;
}, "~S,~O");
Clazz_defineMethod (c$, "getProperty", 
function (propertyName, param) {
if (propertyName.equals ("log")) {
return (this.pFF == null ? "" : this.pFF.getLogData ());
}return null;
}, "~S,~N");
Clazz_defineMethod (c$, "addConstraint", 
 function (o) {
if (o == null) return;
var indexes = o[0];
var nAtoms = indexes[0];
if (nAtoms == 0) {
this.constraints = null;
return;
}var value = (o[1]).doubleValue ();
if (this.constraints == null) {
this.constraints =  new JU.Lst ();
this.constraintMap =  new java.util.Hashtable ();
}if (indexes[1] > indexes[nAtoms]) {
JU.AU.swapInt (indexes, 1, nAtoms);
if (nAtoms == 4) JU.AU.swapInt (indexes, 2, 3);
}var id = JU.Escape.eAI (indexes);
var c = this.constraintMap.get (id);
if (c == null) {
c =  new JM.MMConstraint (indexes, value);
} else {
c.value = value;
return;
}this.constraintMap.put (id, c);
this.constraints.addLast (c);
}, "~A");
Clazz_defineMethod (c$, "clear", 
 function () {
this.setMinimizationOn (false);
this.ac = 0;
this.bondCount = 0;
this.atoms = null;
this.bonds = null;
this.rawBondCount = 0;
this.minAtoms = null;
this.minBonds = null;
this.minAngles = null;
this.minTorsions = null;
this.partialCharges = null;
this.coordSaved = null;
this.atomMap = null;
this.bsTaint = null;
this.bsAtoms = null;
this.bsFixed = null;
this.bsFixedDefault = null;
this.bsMinFixed = null;
this.bsSelected = null;
this.constraints = null;
this.constraintMap = null;
this.pFF = null;
});
Clazz_defineMethod (c$, "minimize", 
function (steps, crit, bsSelected, bsFixed, haveFixed, forceSilent, ff) {
this.isSilent = (forceSilent || this.vwr.getBooleanProperty ("minimizationSilent"));
var val;
this.setEnergyUnits ();
if (steps == 2147483647) {
val = this.vwr.getP ("minimizationSteps");
if (val != null && Clazz_instanceOf (val, Integer)) steps = (val).intValue ();
}this.steps = steps;
if (!haveFixed && this.bsFixedDefault != null) bsFixed.and (this.bsFixedDefault);
if (crit <= 0) {
val = this.vwr.getP ("minimizationCriterion");
if (val != null && Clazz_instanceOf (val, Float)) crit = (val).floatValue ();
}this.crit = Math.max (crit, 0.0001);
if (this.$minimizationOn) return false;
var pFF0 = this.pFF;
this.getForceField (ff);
if (this.pFF == null) {
JU.Logger.error (J.i18n.GT.o (J.i18n.GT.$ ("Could not get class for force field {0}"), ff));
return false;
}JU.Logger.info ("minimize: initializing " + this.pFF.name + " (steps = " + steps + " criterion = " + crit + ") ...");
if (bsSelected.nextSetBit (0) < 0) {
JU.Logger.error (J.i18n.GT.$ ("No atoms selected -- nothing to do!"));
return false;
}this.atoms = this.vwr.ms.at;
this.bsAtoms = JU.BSUtil.copy (bsSelected);
for (var i = this.bsAtoms.nextSetBit (0); i >= 0; i = this.bsAtoms.nextSetBit (i + 1)) if (this.atoms[i].getElementNumber () == 0) this.bsAtoms.clear (i);

if (bsFixed != null) this.bsAtoms.or (bsFixed);
this.ac = this.bsAtoms.cardinality ();
var sameAtoms = JU.BSUtil.areEqual (bsSelected, this.bsSelected);
this.bsSelected = bsSelected;
if (pFF0 != null && this.pFF !== pFF0) sameAtoms = false;
if (!sameAtoms) this.pFF.clear ();
if ((!sameAtoms || !JU.BSUtil.areEqual (bsFixed, this.bsFixed)) && !this.setupMinimization ()) {
this.clear ();
return false;
}if (steps > 0) {
this.bsTaint = JU.BSUtil.copy (this.bsAtoms);
JU.BSUtil.andNot (this.bsTaint, bsFixed);
this.vwr.ms.setTaintedAtoms (this.bsTaint, 2);
}if (bsFixed != null) this.bsFixed = bsFixed;
this.setAtomPositions ();
if (this.constraints != null) {
for (var i = this.constraints.size (); --i >= 0; ) {
var constraint = this.constraints.get (i);
var aList = constraint.indexes;
var minList = constraint.minList;
var nAtoms = aList[0] = Math.abs (aList[0]);
for (var j = 1; j <= nAtoms; j++) {
if (steps <= 0 || !this.bsAtoms.get (aList[j])) {
aList[0] = -nAtoms;
break;
}minList[j - 1] = this.atomMap[aList[j]];
}
}
}this.pFF.setConstraints (this);
if (steps <= 0) this.getEnergyOnly ();
 else if (this.isSilent || !this.vwr.useMinimizationThread ()) this.minimizeWithoutThread ();
 else this.setMinimizationOn (true);
return true;
}, "~N,~N,JU.BS,JU.BS,~B,~B,~S");
Clazz_defineMethod (c$, "setEnergyUnits", 
 function () {
var s = this.vwr.g.energyUnits;
this.units = (s.equalsIgnoreCase ("kcal") ? "kcal" : "kJ");
});
Clazz_defineMethod (c$, "setupMinimization", 
 function () {
this.coordSaved = null;
this.atomMap =  Clazz_newIntArray (this.atoms.length, 0);
this.minAtoms =  new Array (this.ac);
this.elemnoMax = 0;
var bsElements =  new JU.BS ();
for (var i = this.bsAtoms.nextSetBit (0), pt = 0; i >= 0; i = this.bsAtoms.nextSetBit (i + 1), pt++) {
var atom = this.atoms[i];
this.atomMap[i] = pt;
var atomicNo = this.atoms[i].getElementNumber ();
this.elemnoMax = Math.max (this.elemnoMax, atomicNo);
bsElements.set (atomicNo);
this.minAtoms[pt] =  new JM.MinAtom (pt, atom,  Clazz_newDoubleArray (-1, [atom.x, atom.y, atom.z]), this.ac);
this.minAtoms[pt].sType = atom.getAtomName ();
}
JU.Logger.info (J.i18n.GT.i (J.i18n.GT.$ ("{0} atoms will be minimized."), this.ac));
JU.Logger.info ("minimize: getting bonds...");
this.bonds = this.vwr.ms.bo;
this.rawBondCount = this.vwr.ms.bondCount;
this.getBonds ();
JU.Logger.info ("minimize: getting angles...");
this.getAngles ();
JU.Logger.info ("minimize: getting torsions...");
this.getTorsions ();
return this.setModel (bsElements);
});
Clazz_defineMethod (c$, "setModel", 
 function (bsElements) {
if (!this.pFF.setModel (bsElements, this.elemnoMax)) {
JU.Logger.error (J.i18n.GT.o (J.i18n.GT.$ ("could not setup force field {0}"), this.ff));
if (this.ff.equals ("MMFF")) {
this.getForceField ("UFF");
return this.setModel (bsElements);
}return false;
}return true;
}, "JU.BS");
Clazz_defineMethod (c$, "setAtomPositions", 
 function () {
for (var i = 0; i < this.ac; i++) this.minAtoms[i].set ();

this.bsMinFixed = null;
if (this.bsFixed != null) {
this.bsMinFixed =  new JU.BS ();
for (var i = this.bsAtoms.nextSetBit (0), pt = 0; i >= 0; i = this.bsAtoms.nextSetBit (i + 1), pt++) if (this.bsFixed.get (i)) this.bsMinFixed.set (pt);

}});
Clazz_defineMethod (c$, "getBonds", 
 function () {
var bondInfo =  new JU.Lst ();
this.bondCount = 0;
var i1;
var i2;
for (var i = 0; i < this.rawBondCount; i++) {
var bond = this.bonds[i];
if (!this.bsAtoms.get (i1 = bond.atom1.i) || !this.bsAtoms.get (i2 = bond.atom2.i)) continue;
if (i2 < i1) {
var ii = i1;
i1 = i2;
i2 = ii;
}var bondOrder = bond.getCovalentOrder ();
switch (bondOrder) {
case 0:
continue;
case 1:
case 2:
case 3:
break;
case 515:
bondOrder = 5;
break;
default:
bondOrder = 1;
}
bondInfo.addLast ( new JM.MinBond (i, this.bondCount++, this.atomMap[i1], this.atomMap[i2], bondOrder, 0, null));
}
this.minBonds =  new Array (this.bondCount);
for (var i = 0; i < this.bondCount; i++) {
var bond = this.minBonds[i] = bondInfo.get (i);
var atom1 = bond.data[0];
var atom2 = bond.data[1];
this.minAtoms[atom1].addBond (bond, atom2);
this.minAtoms[atom2].addBond (bond, atom1);
}
for (var i = 0; i < this.ac; i++) this.minAtoms[i].getBondedAtomIndexes ();

});
Clazz_defineMethod (c$, "getAngles", 
function () {
var vAngles =  new JU.Lst ();
var atomList;
var ic;
for (var i = 0; i < this.bondCount; i++) {
var bond = this.minBonds[i];
var ia = bond.data[0];
var ib = bond.data[1];
if (this.minAtoms[ib].nBonds > 1) {
atomList = this.minAtoms[ib].getBondedAtomIndexes ();
for (var j = atomList.length; --j >= 0; ) if ((ic = atomList[j]) > ia) {
vAngles.addLast ( new JM.MinAngle ( Clazz_newIntArray (-1, [ia, ib, ic, i, this.minAtoms[ib].getBondIndex (j)])));
this.minAtoms[ia].bsVdw.clear (ic);
}
}if (this.minAtoms[ia].nBonds > 1) {
atomList = this.minAtoms[ia].getBondedAtomIndexes ();
for (var j = atomList.length; --j >= 0; ) if ((ic = atomList[j]) < ib && ic > ia) {
vAngles.addLast ( new JM.MinAngle ( Clazz_newIntArray (-1, [ic, ia, ib, this.minAtoms[ia].getBondIndex (j), i])));
this.minAtoms[ic].bsVdw.clear (ib);
}
}}
this.minAngles = vAngles.toArray ( new Array (vAngles.size ()));
JU.Logger.info (this.minAngles.length + " angles");
});
Clazz_defineMethod (c$, "getTorsions", 
function () {
var vTorsions =  new JU.Lst ();
var id;
for (var i = this.minAngles.length; --i >= 0; ) {
var angle = this.minAngles[i].data;
var ia = angle[0];
var ib = angle[1];
var ic = angle[2];
var atomList;
if (ic > ib && this.minAtoms[ic].nBonds > 1) {
atomList = this.minAtoms[ic].getBondedAtomIndexes ();
for (var j = 0; j < atomList.length; j++) {
id = atomList[j];
if (id != ia && id != ib) {
vTorsions.addLast ( new JM.MinTorsion ( Clazz_newIntArray (-1, [ia, ib, ic, id, angle[3], angle[4], this.minAtoms[ic].getBondIndex (j)])));
this.minAtoms[Math.min (ia, id)].bs14.set (Math.max (ia, id));
}}
}if (ia > ib && this.minAtoms[ia].nBonds != 1) {
atomList = this.minAtoms[ia].getBondedAtomIndexes ();
for (var j = 0; j < atomList.length; j++) {
id = atomList[j];
if (id != ic && id != ib) {
vTorsions.addLast ( new JM.MinTorsion ( Clazz_newIntArray (-1, [ic, ib, ia, id, angle[4], angle[3], this.minAtoms[ia].getBondIndex (j)])));
this.minAtoms[Math.min (ic, id)].bs14.set (Math.max (ic, id));
}}
}}
this.minTorsions = vTorsions.toArray ( new Array (vTorsions.size ()));
JU.Logger.info (this.minTorsions.length + " torsions");
});
Clazz_defineMethod (c$, "getForceField", 
function (ff) {
if (ff.startsWith ("MMFF")) ff = "MMFF";
if (this.pFF == null || !ff.equals (this.ff)) {
if (ff.equals ("UFF")) {
this.pFF =  new JM.FF.ForceFieldUFF (this);
} else if (ff.equals ("MMFF")) {
this.pFF =  new JM.FF.ForceFieldMMFF (this);
} else {
this.pFF =  new JM.FF.ForceFieldUFF (this);
ff = "UFF";
}this.ff = ff;
this.vwr.setStringProperty ("_minimizationForceField", ff);
}return this.pFF;
}, "~S");
Clazz_defineMethod (c$, "minimizationOn", 
function () {
return this.$minimizationOn;
});
Clazz_defineMethod (c$, "getThread", 
function () {
return this.minimizationThread;
});
Clazz_defineMethod (c$, "setMinimizationOn", 
 function (minimizationOn) {
this.$minimizationOn = minimizationOn;
if (!minimizationOn) {
if (this.minimizationThread != null) {
this.minimizationThread = null;
}return;
}if (this.minimizationThread == null) {
this.minimizationThread =  new JM.MinimizationThread ();
this.minimizationThread.setManager (this, this.vwr, null);
this.minimizationThread.start ();
}}, "~B");
Clazz_defineMethod (c$, "getEnergyOnly", 
 function () {
if (this.pFF == null || this.vwr == null) return;
this.pFF.steepestDescentInitialize (this.steps, this.crit);
this.vwr.setFloatProperty ("_minimizationEnergyDiff", 0);
this.reportEnergy ();
this.vwr.setStringProperty ("_minimizationStatus", "calculate");
this.vwr.notifyMinimizationStatus ();
});
Clazz_defineMethod (c$, "reportEnergy", 
 function () {
this.vwr.setFloatProperty ("_minimizationEnergy", this.pFF.toUserUnits (this.pFF.getEnergy ()));
});
Clazz_defineMethod (c$, "startMinimization", 
function () {
try {
JU.Logger.info ("minimizer: startMinimization");
this.vwr.setIntProperty ("_minimizationStep", 0);
this.vwr.setStringProperty ("_minimizationStatus", "starting");
this.vwr.setFloatProperty ("_minimizationEnergy", 0);
this.vwr.setFloatProperty ("_minimizationEnergyDiff", 0);
this.vwr.notifyMinimizationStatus ();
this.vwr.stm.saveCoordinates ("minimize", this.bsTaint);
this.pFF.steepestDescentInitialize (this.steps, this.crit);
this.reportEnergy ();
this.saveCoordinates ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.error ("minimization error vwr=" + this.vwr + " pFF = " + this.pFF);
return false;
} else {
throw e;
}
}
this.$minimizationOn = true;
return true;
});
Clazz_defineMethod (c$, "stepMinimization", 
function () {
if (!this.$minimizationOn) return false;
var doRefresh = (!this.isSilent && this.vwr.getBooleanProperty ("minimizationRefresh"));
this.vwr.setStringProperty ("_minimizationStatus", "running");
var going = this.pFF.steepestDescentTakeNSteps (1);
var currentStep = this.pFF.getCurrentStep ();
this.vwr.setIntProperty ("_minimizationStep", currentStep);
this.reportEnergy ();
this.vwr.setFloatProperty ("_minimizationEnergyDiff", this.pFF.toUserUnits (this.pFF.getEnergyDiff ()));
this.vwr.notifyMinimizationStatus ();
if (doRefresh) {
this.updateAtomXYZ ();
this.vwr.refresh (3, "minimization step " + currentStep);
}return going;
});
Clazz_defineMethod (c$, "endMinimization", 
function () {
this.updateAtomXYZ ();
this.setMinimizationOn (false);
if (this.pFF == null) {
System.out.println ("pFF was null");
} else {
var failed = this.pFF.detectExplosion ();
if (failed) this.restoreCoordinates ();
this.vwr.setIntProperty ("_minimizationStep", this.pFF.getCurrentStep ());
this.reportEnergy ();
this.vwr.setStringProperty ("_minimizationStatus", (failed ? "failed" : "done"));
this.vwr.notifyMinimizationStatus ();
this.vwr.refresh (3, "Minimizer:done" + (failed ? " EXPLODED" : "OK"));
}JU.Logger.info ("minimizer: endMinimization");
});
Clazz_defineMethod (c$, "saveCoordinates", 
 function () {
if (this.coordSaved == null) this.coordSaved =  Clazz_newDoubleArray (this.ac, 3, 0);
for (var i = 0; i < this.ac; i++) for (var j = 0; j < 3; j++) this.coordSaved[i][j] = this.minAtoms[i].coord[j];


});
Clazz_defineMethod (c$, "restoreCoordinates", 
 function () {
if (this.coordSaved == null) return;
for (var i = 0; i < this.ac; i++) for (var j = 0; j < 3; j++) this.minAtoms[i].coord[j] = this.coordSaved[i][j];


this.updateAtomXYZ ();
});
Clazz_defineMethod (c$, "stopMinimization", 
function (coordAreOK) {
if (!this.$minimizationOn) return;
this.setMinimizationOn (false);
if (coordAreOK) this.endMinimization ();
 else this.restoreCoordinates ();
}, "~B");
Clazz_defineMethod (c$, "updateAtomXYZ", 
function () {
if (this.steps <= 0) return;
for (var i = 0; i < this.ac; i++) {
var minAtom = this.minAtoms[i];
var atom = minAtom.atom;
atom.x = minAtom.coord[0];
atom.y = minAtom.coord[1];
atom.z = minAtom.coord[2];
}
this.vwr.refreshMeasures (false);
});
Clazz_defineMethod (c$, "minimizeWithoutThread", 
 function () {
if (!this.startMinimization ()) return;
while (this.stepMinimization ()) {
}
this.endMinimization ();
});
Clazz_defineMethod (c$, "report", 
function (msg, isEcho) {
if (this.isSilent) JU.Logger.info (msg);
 else if (isEcho) this.vwr.showString (msg, false);
 else this.vwr.scriptEcho (msg);
}, "~S,~B");
Clazz_defineMethod (c$, "calculatePartialCharges", 
function (ms, bsAtoms, bsReport) {
var ff =  new JM.FF.ForceFieldMMFF (this);
ff.setArrays (ms.at, bsAtoms, ms.bo, ms.bondCount, true, true);
this.vwr.setAtomProperty (bsAtoms, 1086326785, 0, 0, null, null, ff.getAtomTypeDescriptions ());
this.vwr.setAtomProperty (bsReport == null ? bsAtoms : bsReport, 1111492619, 0, 0, null, ff.getPartialCharges (), null);
}, "JM.ModelSet,JU.BS,JU.BS");
});
Clazz_declarePackage ("JM");
c$ = Clazz_decorateAsClass (function () {
this.data = null;
this.type = 0;
this.key = null;
this.ddata = null;
Clazz_instantialize (this, arguments);
}, JM, "MinObject");
Clazz_overrideMethod (c$, "toString", 
function () {
return this.type + " " + this.data[0] + "," + this.data[1] + (this.data.length > 2 ? "," + this.data[2] + "," + this.data[3] : "") + " " + JM.MinObject.decodeKey (this.key);
});
c$.getKey = Clazz_defineMethod (c$, "getKey", 
function (type, a1, a2, a3, a4) {
return Integer.$valueOf ((((((((a4 << 7) + a3) << 7) + a2) << 7) + a1) << 4) + type);
}, "~N,~N,~N,~N,~N");
c$.decodeKey = Clazz_defineMethod (c$, "decodeKey", 
function (key) {
if (key == null) return null;
var i = key.intValue ();
var type = i & 0xF;
i >>= 4;
var a = i & 0x7F;
i >>= 7;
var b = i & 0x7F;
i >>= 7;
var c = i & 0x7F;
i >>= 7;
var d = i & 0x7F;
return (type < 0 ? type + ": " : "") + (a < 10 ? "  " : " ") + a + (b < 10 ? "  " : " ") + b + (c < 10 ? "  " : " ") + c + (d > 120 ? "" : (d < 10 ? "  " : " ") + d);
}, "Integer");
Clazz_declarePackage ("JM");
Clazz_load (["JM.MinObject"], "JM.MinAngle", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.sbType = 0;
this.sbKey = null;
this.ka = 0;
this.theta0 = NaN;
Clazz_instantialize (this, arguments);
}, JM, "MinAngle", JM.MinObject);
Clazz_makeConstructor (c$, 
function (data) {
Clazz_superConstructor (this, JM.MinAngle, []);
this.data = data;
}, "~A");
});
Clazz_declarePackage ("JM");
Clazz_load (["JU.BS", "$.Lst"], "JM.MinAtom", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.index = 0;
this.sType = null;
this.atom = null;
this.ffAtomType = null;
this.ffType = 0;
this.vdwKey = null;
this.coord = null;
this.force = null;
this.bonds = null;
this.nBonds = 0;
this.hCount = 0;
this.partialCharge = 0;
this.bsVdw = null;
this.bs14 = null;
this.bondedAtoms = null;
Clazz_instantialize (this, arguments);
}, JM, "MinAtom");
Clazz_prepareFields (c$, function () {
this.coord =  Clazz_newDoubleArray (3, 0);
this.force =  Clazz_newDoubleArray (3, 0);
this.bonds =  new JU.Lst ();
this.bsVdw =  new JU.BS ();
this.bs14 =  new JU.BS ();
});
Clazz_overrideMethod (c$, "toString", 
function () {
return "#" + this.index + " " + this.sType;
});
Clazz_makeConstructor (c$, 
function (index, atom, coord, ac) {
this.index = index;
this.atom = atom;
this.coord = coord;
this.bsVdw.setBits (index + 1, ac);
this.bsVdw.clear (index);
this.hCount = atom.getCovalentHydrogenCount ();
}, "~N,JM.Atom,~A,~N");
Clazz_defineMethod (c$, "set", 
function () {
this.coord[0] = this.atom.x;
this.coord[1] = this.atom.y;
this.coord[2] = this.atom.z;
});
Clazz_defineMethod (c$, "getBondTo", 
function (iAtom) {
this.getBondedAtomIndexes ();
for (var i = 0; i < this.nBonds; i++) if (this.bondedAtoms[i] == iAtom) return this.bonds.get (i);

return null;
}, "~N");
Clazz_defineMethod (c$, "getBondedAtomIndexes", 
function () {
if (this.bondedAtoms == null) {
this.bondedAtoms =  Clazz_newIntArray (this.nBonds, 0);
for (var i = this.nBonds; --i >= 0; ) this.bondedAtoms[i] = this.bonds.get (i).getOtherAtom (this.index);

}return this.bondedAtoms;
});
Clazz_defineMethod (c$, "getIdentity", 
function () {
return this.atom.getInfo ();
});
Clazz_defineMethod (c$, "addBond", 
function (bond, i) {
this.bonds.addLast (bond);
this.nBonds++;
this.bsVdw.clear (i);
}, "JM.MinBond,~N");
Clazz_defineMethod (c$, "getBondIndex", 
function (j) {
return this.bonds.get (j).index;
}, "~N");
c$.isLinear = Clazz_defineMethod (c$, "isLinear", 
function (minAtom) {
switch (minAtom.ffType) {
case 4:
case 53:
case 61:
return true;
}
return false;
}, "JM.MinAtom");
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.MinObject"], "JM.MinBond", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.rawIndex = 0;
this.index = 0;
this.order = 0;
this.isAromatic = false;
this.isAmide = false;
Clazz_instantialize (this, arguments);
}, JM, "MinBond", JM.MinObject);
Clazz_makeConstructor (c$, 
function (rawIndex, index, atomIndex1, atomIndex2, order, type, key) {
Clazz_superConstructor (this, JM.MinBond, []);
this.rawIndex = rawIndex;
this.index = index;
this.type = type;
this.data =  Clazz_newIntArray (-1, [atomIndex1, atomIndex2]);
this.order = order;
this.key = key;
}, "~N,~N,~N,~N,~N,~N,Integer");
Clazz_defineMethod (c$, "getOtherAtom", 
function (index) {
return this.data[this.data[0] == index ? 1 : 0];
}, "~N");
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.MinObject"], "JM.MinTorsion", null, function () {
c$ = Clazz_declareType (JM, "MinTorsion", JM.MinObject);
Clazz_makeConstructor (c$, 
function (data) {
Clazz_superConstructor (this, JM.MinTorsion, []);
this.data = data;
}, "~A");
});
Clazz_declarePackage ("JM");
Clazz_load (null, "JM.Util", ["java.lang.Double", "java.util.Random"], function () {
c$ = Clazz_declareType (JM, "Util");
c$.sub = Clazz_defineMethod (c$, "sub", 
function (a, b, result) {
result.set (a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}, "~A,~A,JU.V3d");
c$.putCoord = Clazz_defineMethod (c$, "putCoord", 
function (v, c) {
c[0] = v.x;
c[1] = v.y;
c[2] = v.z;
}, "JU.V3d,~A");
c$.distance2 = Clazz_defineMethod (c$, "distance2", 
function (a, b) {
var dx = a[0] - b[0];
var dy = a[1] - b[1];
var dz = a[2] - b[2];
return (dx * dx + dy * dy + dz * dz);
}, "~A,~A");
c$.distance2V = Clazz_defineMethod (c$, "distance2V", 
function (a, b) {
var dx = a.x - b.x;
var dy = a.y - b.y;
var dz = a.z - b.z;
return (dx * dx + dy * dy + dz * dz);
}, "JU.V3d,JU.V3d");
c$.getAngleRadiansABC = Clazz_defineMethod (c$, "getAngleRadiansABC", 
function (a, b, c) {
var ab2 = JM.Util.distance2 (a, b);
var bc2 = JM.Util.distance2 (b, c);
var ac2 = JM.Util.distance2 (a, c);
return (JM.Util.isNearZero2 (ab2, 1e-3) || JM.Util.isNearZero2 (bc2, 1e-3) ? 0 : Math.acos ((ab2 + bc2 - ac2) / 2 / Math.sqrt (ab2 * bc2)));
}, "~A,~A,~A");
c$.isApprox = Clazz_defineMethod (c$, "isApprox", 
function (a, b, precision) {
return (JM.Util.distance2V (a, b) <= precision * precision * Math.min (a.lengthSquared (), b.lengthSquared ()));
}, "JU.V3d,JU.V3d,~N");
c$.canBeSquared = Clazz_defineMethod (c$, "canBeSquared", 
function (x) {
if (x == 0) return true;
return ((x = Math.abs (x)) < 1.0E150 && x > 1.0E-150);
}, "~N");
c$.isNegligible = Clazz_defineMethod (c$, "isNegligible", 
function (a, b) {
return JM.Util.isNegligible3 (a, b, 1e-11);
}, "~N,~N");
c$.isFinite = Clazz_defineMethod (c$, "isFinite", 
function (a) {
return !Double.isInfinite (a) && !Double.isNaN (a);
}, "~N");
c$.isNegligible3 = Clazz_defineMethod (c$, "isNegligible3", 
function (a, b, precision) {
return (Math.abs (a) <= precision * Math.abs (b));
}, "~N,~N,~N");
c$.isNear = Clazz_defineMethod (c$, "isNear", 
function (a, b) {
return JM.Util.isNear3 (a, b, 2e-6);
}, "~N,~N");
c$.isNear3 = Clazz_defineMethod (c$, "isNear3", 
function (a, b, epsilon) {
return (Math.abs (a - b) < epsilon);
}, "~N,~N,~N");
c$.isNearZero = Clazz_defineMethod (c$, "isNearZero", 
function (a) {
return JM.Util.isNearZero2 (a, 2e-6);
}, "~N");
c$.isNearZero2 = Clazz_defineMethod (c$, "isNearZero2", 
function (a, epsilon) {
return (Math.abs (a) < epsilon);
}, "~N,~N");
c$.canBeNormalized = Clazz_defineMethod (c$, "canBeNormalized", 
function (a) {
if (a.x == 0.0 && a.y == 0.0 && a.z == 0.0) return false;
return (JM.Util.canBeSquared (a.x) && JM.Util.canBeSquared (a.y) && JM.Util.canBeSquared (a.z));
}, "JU.V3d");
c$.pointPlaneAngleRadians = Clazz_defineMethod (c$, "pointPlaneAngleRadians", 
function (a, b, c, d, v1, v2, norm, fixTheta) {
v1.sub2 (b, c);
v2.sub2 (b, d);
norm.cross (v1, v2);
v2.add (v1);
v1.sub2 (b, a);
var angleA_CD = (fixTheta ? JM.Util.vectorAngleRadians (v2, v1) : 3.141592653589793);
var angleNorm = JM.Util.vectorAngleRadians (norm, v1);
if (angleNorm > 1.5707963267948966) angleNorm = 3.141592653589793 - angleNorm;
var val = 1.5707963267948966 + (angleA_CD > 1.5707963267948966 ? -angleNorm : angleNorm);
return val;
}, "JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,~B");
c$.vectorAngleRadians = Clazz_defineMethod (c$, "vectorAngleRadians", 
 function (v1, v2) {
var l1 = v1.length ();
var l2 = v2.length ();
return (JM.Util.isNearZero (l1) || JM.Util.isNearZero (l2) ? 0 : Math.acos (v1.dot (v2) / (l1 * l2)));
}, "JU.V3d,JU.V3d");
c$.getTorsionAngleRadians = Clazz_defineMethod (c$, "getTorsionAngleRadians", 
function (a, b, c, d, r1, r2, r3) {
JM.Util.sub (b, a, r1);
JM.Util.sub (c, b, r2);
r2.normalize ();
r1.cross (r1, r2);
JM.Util.sub (d, c, r3);
r3.cross (r2, r3);
var p1dotp2 = r1.dot (r3);
r1.cross (r3, r1);
var theta = Math.atan2 (-r2.dot (r1), p1dotp2);
return theta;
}, "~A,~A,~A,~A,JU.V3d,JU.V3d,JU.V3d");
c$.restorativeForceAndDistance = Clazz_defineMethod (c$, "restorativeForceAndDistance", 
function (a, b, vab) {
vab.sub2 (a, b);
var rab = vab.length ();
if (rab < 0.1) {
JM.Util.randomizeUnitVector (vab);
rab = 0.1;
}vab.normalize ();
a.setT (vab);
a.scale (-1);
b.setT (vab);
return rab;
}, "JU.V3d,JU.V3d,JU.V3d");
c$.randomizeUnitVector = Clazz_defineMethod (c$, "randomizeUnitVector", 
 function (v) {
var ptr =  new java.util.Random ();
var l;
do {
v.set (ptr.nextFloat () - 0.5, ptr.nextFloat () - 0.5, ptr.nextFloat () - 0.5);
l = v.lengthSquared ();
} while ((l > 1.0) || (l < 1e-4));
v.normalize ();
}, "JU.V3d");
c$.restorativeForceAndAngleRadians = Clazz_defineMethod (c$, "restorativeForceAndAngleRadians", 
function (i, j, k) {
i.sub (j);
k.sub (j);
var length1 = i.length ();
var length2 = k.length ();
if (JM.Util.isNearZero (length1) || JM.Util.isNearZero (length2)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
return 0.0;
}var inverse_length_v1 = 1.0 / length1;
var inverse_length_v2 = 1.0 / length2;
i.scale (inverse_length_v1);
k.scale (inverse_length_v2);
j.cross (i, k);
var length = j.length ();
if (JM.Util.isNearZero (length)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
return 0.0;
}j.scale (1 / length);
var costheta = i.dot (k);
var theta;
if (costheta > 1.0) {
theta = 0.0;
costheta = 1.0;
} else if (costheta < -1.0) {
theta = 3.141592653589793;
costheta = -1.0;
} else {
theta = Math.acos (costheta);
}i.cross (i, j);
i.normalize ();
j.cross (k, j);
j.normalize ();
i.scale (-inverse_length_v1);
j.scale (inverse_length_v2);
k.setT (j);
j.add (i);
j.scale (-1);
return theta;
}, "JU.V3d,JU.V3d,JU.V3d");
c$.restorativeForceAndOutOfPlaneAngleRadians = Clazz_defineMethod (c$, "restorativeForceAndOutOfPlaneAngleRadians", 
function (i, j, k, l, an, bn, cn) {
i.sub2 (i, j);
k.sub2 (k, j);
l.sub2 (l, j);
var length_ji = i.length ();
var length_jk = k.length ();
var length_jl = l.length ();
if (JM.Util.isNearZero (length_ji) || JM.Util.isNearZero (length_jk) || JM.Util.isNearZero (length_jl)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return 0.0;
}i.normalize ();
k.normalize ();
l.normalize ();
var cos_theta = i.dot (k);
var theta = Math.acos (cos_theta);
if (JM.Util.isNearZero (theta) || JM.Util.isNearZero (Math.abs (theta - 3.141592653589793))) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return 0.0;
}var csc_theta = 1 / Math.sin (theta);
an.cross (i, k);
bn.cross (k, l);
cn.cross (l, i);
var sin_dl = an.dot (l) * csc_theta;
var dl = Math.asin (sin_dl);
var cos_dl = Math.cos (dl);
if (cos_dl < 0.0001 || JM.Util.isNearZero (dl) || JM.Util.isNearZero (Math.abs (dl - 3.141592653589793))) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return dl;
}l.scaleAdd (-sin_dl / csc_theta, l, an);
l.scale (csc_theta / length_jl);
j.setT (i);
i.scaleAdd (-cos_theta, k, i);
i.scaleAdd (-sin_dl * csc_theta, i, bn);
i.scale (csc_theta / length_ji);
k.scaleAdd (-cos_theta, j, k);
k.scaleAdd (-sin_dl * csc_theta, k, cn);
k.scale (csc_theta / length_jk);
j.setT (i);
j.add (k);
j.add (l);
j.scale (-1);
return dl;
}, "JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d");
c$.restorativeForceAndTorsionAngleRadians = Clazz_defineMethod (c$, "restorativeForceAndTorsionAngleRadians", 
function (i, j, k, l) {
i.sub2 (j, i);
j.sub2 (k, j);
k.sub2 (l, k);
var len_ij = i.length ();
var len_jk = j.length ();
var len_kl = k.length ();
if (JM.Util.isNearZero (len_ij) || JM.Util.isNearZero (len_jk) || JM.Util.isNearZero (len_kl)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return 0.0;
}var ang = JM.Util.vectorAngleRadians (i, j);
var sin_j = Math.sin (ang);
var cos_j = Math.cos (ang);
ang = JM.Util.vectorAngleRadians (j, k);
var sin_k = Math.sin (ang);
var cos_k = Math.cos (ang);
i.normalize ();
j.normalize ();
k.normalize ();
i.cross (i, j);
l.cross (j, k);
k.cross (i, l);
var theta = -Math.atan2 (k.dot (j), i.dot (l));
i.scale (1. / len_ij / sin_j / sin_j);
l.scale (-1.0 / len_kl / sin_k / sin_k);
j.setT (i);
j.scale (-len_ij / len_jk * cos_j - 1.);
k.setT (l);
k.scale (-len_kl / len_jk * cos_k);
j.sub (k);
k.setT (i);
k.add (j);
k.add (l);
k.scale (-1);
return theta;
}, "JU.V3d,JU.V3d,JU.V3d,JU.V3d");
Clazz_defineStatics (c$,
"RAD_TO_DEG", (57.29577951308232),
"DEG_TO_RAD", (0.017453292519943295),
"max_squarable_double", 1e150,
"min_squarable_double", 1e-150);
});
Clazz_declarePackage ("JM.FF");
c$ = Clazz_decorateAsClass (function () {
this.elemNo = 0;
this.descr = null;
this.smartsCode = null;
this.mmType = 0;
this.hType = 0;
this.formalCharge = 0;
this.fcadj = 0;
this.sbmb = false;
this.arom = false;
this.pilp = false;
this.mltb = 0;
this.val = 0;
Clazz_instantialize (this, arguments);
}, JM.FF, "AtomType");
Clazz_makeConstructor (c$, 
function (elemNo, mmType, hType, formalCharge, val, descr, smartsCode) {
this.elemNo = elemNo;
this.mmType = mmType;
this.hType = hType;
this.formalCharge = formalCharge;
this.val = val;
this.descr = descr;
this.smartsCode = smartsCode;
}, "~N,~N,~N,~N,~N,~S,~S");
Clazz_declarePackage ("JM.FF");
Clazz_load (null, "JM.FF.ForceField", ["java.lang.Float", "JU.PT", "JM.Util", "JU.Logger", "JV.FileManager", "$.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.name = null;
this.calc = null;
this.criterion = 0;
this.e0 = 0;
this.dE = 0;
this.currentStep = 0;
this.stepMax = 0;
this.coordSaved = null;
this.minAtomCount = 0;
this.minBondCount = 0;
this.minAtoms = null;
this.minBonds = null;
this.minAngles = null;
this.minTorsions = null;
this.minPositions = null;
this.bsFixed = null;
this.minimizer = null;
Clazz_instantialize (this, arguments);
}, JM.FF, "ForceField");
Clazz_defineMethod (c$, "setModelFields", 
function () {
this.minAtoms = this.minimizer.minAtoms;
this.minBonds = this.minimizer.minBonds;
this.minAngles = this.minimizer.minAngles;
this.minTorsions = this.minimizer.minTorsions;
this.bsFixed = this.minimizer.bsMinFixed;
this.minAtomCount = this.minAtoms.length;
this.minBondCount = this.minBonds.length;
});
Clazz_defineMethod (c$, "setConstraints", 
function (m) {
this.bsFixed = m.bsMinFixed;
this.calc.setConstraints (m.constraints);
this.coordSaved = null;
}, "JM.Minimizer");
Clazz_defineMethod (c$, "steepestDescentInitialize", 
function (stepMax, criterion) {
this.stepMax = stepMax;
this.criterion = criterion / this.toUserUnits (1);
this.currentStep = 0;
this.clearForces ();
this.calc.setLoggingEnabled (true);
this.calc.setLoggingEnabled (stepMax == 0 || JU.Logger.isActiveLevel (6));
var s = this.name + " " + this.calc.getDebugHeader (-1) + "Jmol Minimization Version " + JV.Viewer.getJmolVersion () + "\n";
this.calc.appendLogData (s);
JU.Logger.info (s);
this.calc.getConstraintList ();
if (this.calc.loggingEnabled) this.calc.appendLogData (this.calc.getAtomList ("S T E E P E S T   D E S C E N T"));
this.dE = 0;
this.calc.setPreliminary (stepMax > 0);
this.e0 = this.energyFull (false, false);
s = JU.PT.sprintf (" Initial " + this.name + " E = %10.3f " + this.minimizer.units + " criterion = %8.6f max steps = " + stepMax, "ff",  Clazz_newArray (-1, [Float.$valueOf (this.toUserUnits (this.e0)), Float.$valueOf (this.toUserUnits (criterion))]));
this.minimizer.report (s, false);
this.calc.appendLogData (s);
}, "~N,~N");
Clazz_defineMethod (c$, "clearForces", 
 function () {
for (var i = 0; i < this.minAtomCount; i++) this.minAtoms[i].force[0] = this.minAtoms[i].force[1] = this.minAtoms[i].force[2] = 0;

});
Clazz_defineMethod (c$, "steepestDescentTakeNSteps", 
function (n) {
if (this.stepMax == 0) return false;
var isPreliminary = true;
for (var iStep = 1; iStep <= n; iStep++) {
this.currentStep++;
this.calc.setSilent (true);
for (var i = 0; i < this.minAtomCount; i++) if (this.bsFixed == null || !this.bsFixed.get (i)) this.setForcesUsingNumericalDerivative (this.minAtoms[i], 1);

this.linearSearch ();
this.calc.setSilent (false);
if (this.calc.loggingEnabled) this.calc.appendLogData (this.calc.getAtomList ("S T E P    " + this.currentStep));
var e1 = this.energyFull (false, false);
this.dE = e1 - this.e0;
var done = JM.Util.isNear3 (e1, this.e0, this.criterion);
if (done || this.currentStep % 10 == 0 || this.stepMax <= this.currentStep) {
var s = JU.PT.sprintf (this.name + " Step %-4d E = %10.6f    dE = %8.6f ", "Fi",  Clazz_newArray (-1, [ Clazz_newFloatArray (-1, [e1, (this.dE), this.criterion]), Integer.$valueOf (this.currentStep)]));
this.minimizer.report (s, false);
this.calc.appendLogData (s);
}this.e0 = e1;
if (done || this.stepMax <= this.currentStep) {
if (this.calc.loggingEnabled) this.calc.appendLogData (this.calc.getAtomList ("F I N A L  G E O M E T R Y"));
if (done) {
var s = JU.PT.formatStringF ("\n    " + this.name + " STEEPEST DESCENT HAS CONVERGED: E = %8.5f " + this.minimizer.units + " after " + this.currentStep + " steps", "f", this.toUserUnits (e1));
this.calc.appendLogData (s);
this.minimizer.report (s, true);
JU.Logger.info (s);
}return false;
}if (isPreliminary && this.getNormalizedDE () >= 2) {
this.calc.setPreliminary (isPreliminary = false);
this.e0 = this.energyFull (false, false);
}}
return true;
}, "~N");
Clazz_defineMethod (c$, "getEnergies", 
 function (terms, gradients) {
if ((terms & 1) != 0) return this.energyFull (gradients, true);
var e = 0.0;
if ((terms & 2) != 0) e += this.energyBond (gradients);
if ((terms & 4) != 0) e += this.energyAngle (gradients);
if ((terms & 8) != 0) e += this.energyStretchBend (gradients);
if ((terms & 32) != 0) e += this.energyOOP (gradients);
if ((terms & 16) != 0) e += this.energyTorsion (gradients);
if ((terms & 64) != 0) e += this.energyVDW (gradients);
if ((terms & 128) != 0) e += this.energyES (gradients);
return e;
}, "~N,~B");
Clazz_defineMethod (c$, "setForcesUsingNumericalDerivative", 
 function (atom, terms) {
var delta = 1.0e-5;
atom.force[0] = -this.getDE (atom, terms, 0, delta);
atom.force[1] = -this.getDE (atom, terms, 1, delta);
atom.force[2] = -this.getDE (atom, terms, 2, delta);
return;
}, "JM.MinAtom,~N");
Clazz_defineMethod (c$, "getDE", 
 function (atom, terms, i, delta) {
atom.coord[i] += delta;
var e = this.getEnergies (terms, false);
atom.coord[i] -= delta;
return (e - this.e0) / delta;
}, "JM.MinAtom,~N,~N,~N");
Clazz_defineMethod (c$, "energyFull", 
function (gradients, isSilent) {
var energy;
if (gradients) this.clearForces ();
energy = this.energyBond (gradients) + this.energyAngle (gradients) + this.energyTorsion (gradients) + this.energyStretchBend (gradients) + this.energyOOP (gradients) + this.energyVDW (gradients) + this.energyES (gradients);
if (!isSilent && this.calc.loggingEnabled) this.calc.appendLogData (JU.PT.sprintf ("\nTOTAL %s ENERGY = %8.3f %s/mol\n", "sfs",  Clazz_newArray (-1, [this.name, Float.$valueOf (this.toUserUnits (energy)), this.minimizer.units])));
return energy;
}, "~B,~B");
Clazz_defineMethod (c$, "energyStretchBend", 
function (gradients) {
return this.calc.energyStretchBend (gradients);
}, "~B");
Clazz_defineMethod (c$, "energyBond", 
function (gradients) {
return this.calc.energyBond (gradients);
}, "~B");
Clazz_defineMethod (c$, "energyAngle", 
function (gradients) {
return this.calc.energyAngle (gradients);
}, "~B");
Clazz_defineMethod (c$, "energyTorsion", 
function (gradients) {
return this.calc.energyTorsion (gradients);
}, "~B");
Clazz_defineMethod (c$, "energyOOP", 
function (gradients) {
return this.calc.energyOOP (gradients);
}, "~B");
Clazz_defineMethod (c$, "energyVDW", 
function (gradients) {
return this.calc.energyVDW (gradients);
}, "~B");
Clazz_defineMethod (c$, "energyES", 
function (gradients) {
return this.calc.energyES (gradients);
}, "~B");
Clazz_defineMethod (c$, "linearSearch", 
 function () {
var step = 0.23;
var trustRadius = 0.3;
var trustRadius2 = trustRadius * trustRadius;
var e1 = this.energyFull (false, true);
for (var iStep = 0; iStep < 10; iStep++) {
this.saveCoordinates ();
for (var i = 0; i < this.minAtomCount; ++i) if (this.bsFixed == null || !this.bsFixed.get (i)) {
var force = this.minAtoms[i].force;
var coord = this.minAtoms[i].coord;
var f2 = (force[0] * force[0] + force[1] * force[1] + force[2] * force[2]);
if (f2 > trustRadius2 / step / step) {
f2 = trustRadius / Math.sqrt (f2) / step;
force[0] *= f2;
force[1] *= f2;
force[2] *= f2;
}for (var j = 0; j < 3; ++j) {
if (JM.Util.isFinite (force[j])) {
var tempStep = force[j] * step;
if (tempStep > trustRadius) coord[j] += trustRadius;
 else if (tempStep < -trustRadius) coord[j] -= trustRadius;
 else coord[j] += tempStep;
}}
}
var e2 = this.energyFull (false, true);
if (JM.Util.isNear3 (e2, e1, 1.0e-3)) break;
if (e2 > e1) {
step *= 0.1;
this.restoreCoordinates ();
} else if (e2 < e1) {
e1 = e2;
step *= 2.15;
if (step > 1.0) step = 1.0;
}}
});
Clazz_defineMethod (c$, "saveCoordinates", 
 function () {
if (this.coordSaved == null) this.coordSaved =  Clazz_newDoubleArray (this.minAtomCount, 3, 0);
for (var i = 0; i < this.minAtomCount; i++) for (var j = 0; j < 3; j++) this.coordSaved[i][j] = this.minAtoms[i].coord[j];


});
Clazz_defineMethod (c$, "restoreCoordinates", 
 function () {
for (var i = 0; i < this.minAtomCount; i++) for (var j = 0; j < 3; j++) this.minAtoms[i].coord[j] = this.coordSaved[i][j];


});
Clazz_defineMethod (c$, "detectExplosion", 
function () {
for (var i = 0; i < this.minAtomCount; i++) {
var atom = this.minAtoms[i];
for (var j = 0; j < 3; j++) if (!JM.Util.isFinite (atom.coord[j])) return true;

}
for (var i = 0; i < this.minBondCount; i++) {
var bond = this.minBonds[i];
if (JM.Util.distance2 (this.minAtoms[bond.data[0]].coord, this.minAtoms[bond.data[1]].coord) > 900.0) return true;
}
return false;
});
Clazz_defineMethod (c$, "getCurrentStep", 
function () {
return this.currentStep;
});
Clazz_defineMethod (c$, "getEnergy", 
function () {
return this.e0;
});
Clazz_defineMethod (c$, "getAtomList", 
function (title) {
return this.calc.getAtomList (title);
}, "~S");
Clazz_defineMethod (c$, "getEnergyDiff", 
function () {
return this.dE;
});
Clazz_defineMethod (c$, "getLogData", 
function () {
return this.calc.getLogData ();
});
Clazz_defineMethod (c$, "getNormalizedDE", 
function () {
return Math.abs (this.dE / this.criterion);
});
Clazz_defineMethod (c$, "toUserUnits", 
function (energy) {
return this.toUnits (energy, this.calc.getUnits ());
}, "~N");
Clazz_defineMethod (c$, "toUnits", 
 function (energy, units) {
return (units.equalsIgnoreCase (this.minimizer.units) ? energy : energy * (this.minimizer.units.equals ("kJ") ? 4.1868 : 0.23884589662749595));
}, "~N,~S");
Clazz_defineMethod (c$, "log", 
function (s) {
this.calc.appendLogData (s);
}, "~S");
Clazz_defineMethod (c$, "getBufferedReader", 
function (resourceName) {
return JV.FileManager.getBufferedReaderForResource (this.minimizer.vwr, this, "JM/FF/", "data/" + resourceName);
}, "~S");
Clazz_defineStatics (c$,
"ENERGY", (1),
"EBOND", (2),
"EANGLE", (4),
"ESTRBND", (8),
"ETORSION", (16),
"EOOP", (32),
"EVDW", (64),
"EELECTROSTATIC", (128),
"ABI_IJ", 3,
"ABI_JK", 4,
"TBI_AB", 4,
"TBI_BC", 5,
"TBI_CD", 6,
"R3", 0,
"R4", 1,
"R5", 2,
"Raromatic", 3);
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.ForceField"], "JM.FF.ForceFieldMMFF", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.PT", "JM.MinAtom", "$.MinObject", "JM.FF.AtomType", "$.CalculationsMMFF", "JU.BSUtil", "$.Elements", "$.Escape", "$.Logger", "JV.JmolAsyncException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.rawAtomTypes = null;
this.rawBondTypes = null;
this.rawMMFF94Charges = null;
this.vRings = null;
this.line = null;
this.typeData = null;
Clazz_instantialize (this, arguments);
}, JM.FF, "ForceFieldMMFF", JM.FF.ForceField);
Clazz_prepareFields (c$, function () {
this.typeData =  Clazz_newIntArray (4, 0);
});
Clazz_defineMethod (c$, "getAtomTypeDescriptions", 
function () {
return JM.FF.ForceFieldMMFF.getAtomTypeDescs (this.rawAtomTypes);
});
Clazz_defineMethod (c$, "getPartialCharges", 
function () {
return this.rawMMFF94Charges;
});
Clazz_makeConstructor (c$, 
function (m) {
Clazz_superConstructor (this, JM.FF.ForceFieldMMFF, []);
this.minimizer = m;
this.name = "MMFF";
this.getParameters ();
}, "JM.Minimizer");
Clazz_overrideMethod (c$, "clear", 
function () {
});
Clazz_overrideMethod (c$, "setModel", 
function (bsElements, elemnoMax) {
var m = this.minimizer;
if (!this.setArrays (m.atoms, m.bsAtoms, m.bonds, m.rawBondCount, false, false)) return false;
this.setModelFields ();
if (!this.fixTypes ()) return false;
this.calc =  new JM.FF.CalculationsMMFF (this, JM.FF.ForceFieldMMFF.ffParams, this.minAtoms, this.minBonds, this.minAngles, this.minTorsions, this.minPositions, this.minimizer.constraints);
this.calc.setLoggingEnabled (true);
return this.calc.setupCalculations ();
}, "JU.BS,~N");
Clazz_defineMethod (c$, "setArrays", 
function (atoms, bsAtoms, bonds, rawBondCount, doRound, allowUnknowns) {
var m = this.minimizer;
this.vRings = JU.AU.createArrayOfArrayList (4);
this.rawAtomTypes = JM.FF.ForceFieldMMFF.setAtomTypes (atoms, bsAtoms, m.vwr.getSmilesMatcher (), this.vRings, allowUnknowns);
if (this.rawAtomTypes == null) return false;
this.rawBondTypes = this.setBondTypes (bonds, rawBondCount, bsAtoms);
this.rawMMFF94Charges = JM.FF.ForceFieldMMFF.calculatePartialCharges (bonds, this.rawBondTypes, atoms, this.rawAtomTypes, bsAtoms, doRound);
return true;
}, "~A,JU.BS,~A,~N,~B,~B");
Clazz_defineMethod (c$, "getParameters", 
 function () {
if (JM.FF.ForceFieldMMFF.ffParams != null) return;
this.getAtomTypes ();
var data =  new java.util.Hashtable ();
var resourceName = "mmff94.par.txt";
if (JU.Logger.debugging) JU.Logger.debug ("reading data from " + resourceName);
var br = null;
var line = null;
try {
br = this.getBufferedReader (resourceName);
var pt = 0;
var dataType = 0;
while (true) {
while ((pt = (line = br.readLine ()).indexOf (".PAR")) < 0) {
}
if ((dataType = JM.FF.ForceFieldMMFF.types[Clazz_doubleToInt ("END.BCI.CHG.ANG.NDK.OND.OOP.TBN.FSB.TOR.VDW.".indexOf (line.substring (pt - 3, pt + 1)) / 4)]) < 1) break;
this.readParams (br, dataType, data);
}
br.close ();
} catch (e$$) {
if (Clazz_exceptionOf (e$$, JV.JmolAsyncException)) {
var e = e$$;
{
throw  new JV.JmolAsyncException (e.getFileName ());
}
} else if (Clazz_exceptionOf (e$$, Exception)) {
var e = e$$;
{
System.err.println ("Exception " + e.toString () + " in getResource " + resourceName + " line=" + line);
}
} else {
throw e$$;
}
} finally {
try {
br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}
JM.FF.ForceFieldMMFF.ffParams = data;
});
Clazz_defineMethod (c$, "readParams", 
 function (br, dataType, data) {
var value = null;
var a1 = 0;
var a2 = 127;
var a3 = 127;
var a4 = 127;
var type = 0;
switch (dataType) {
case 3:
case 5:
case 9:
break;
case 34:
a4 = 124;
break;
case 21:
a4 = 125;
break;
case 546:
a4 = 123;
type = 0;
break;
case 13:
type = 6;
break;
case 1:
type = 0;
break;
case 37:
a4 = 126;
type = 0;
break;
case 17:
a4 = 122;
type = 0;
break;
}
while (!br.readLine ().startsWith ("*")) {
}
while ((this.line = br.readLine ()).startsWith ("*")) {
}
do {
switch (dataType) {
case 546:
case 13:
case 1:
case 37:
break;
case 17:
if (this.line.charAt (5) != ' ') continue;
break;
case 34:
if (this.line.charAt (0) == '4') continue;
case 5:
case 3:
case 21:
case 9:
type = this.line.charCodeAt (0) - 48;
break;
}
switch (dataType) {
case 13:
case 9:
a4 = this.ival (18, 20);
case 5:
case 21:
case 37:
a3 = this.ival (13, 15);
case 546:
case 3:
case 34:
a2 = this.ival (8, 10);
case 1:
case 17:
a1 = this.ival (3, 5);
break;
}
switch (dataType) {
case 546:
value =  Clazz_newDoubleArray (-1, [this.dval (19, 25), this.dval (13, 18)]);
break;
case 3:
value =  Clazz_newDoubleArray (-1, [this.dval (14, 20), this.dval (25, 31)]);
break;
case 5:
case 21:
value =  Clazz_newDoubleArray (-1, [this.dval (19, 25), this.dval (28, 35)]);
break;
case 34:
value = Float.$valueOf (this.fval (10, 20));
break;
case 13:
value =  Clazz_newDoubleArray (-1, [this.dval (24, 30)]);
break;
case 1:
value = Float.$valueOf (this.fval (5, 15));
break;
case 37:
var v1 = this.dval (19, 25);
var v2 = this.dval (28, 35);
value =  Clazz_newDoubleArray (-1, [v1, v2]);
var key = JM.MinObject.getKey (type, a1, a2, a3, a4);
data.put (key, value);
value =  Clazz_newDoubleArray (-1, [v2, v1]);
var a = a1;
a1 = a3;
a3 = a;
break;
case 9:
value =  Clazz_newDoubleArray (-1, [this.dval (22, 28), this.dval (30, 36), this.dval (38, 44)]);
break;
case 17:
value =  Clazz_newDoubleArray (-1, [this.dval (10, 15), this.dval (20, 25), this.dval (30, 35), this.dval (40, 45), this.line.charAt (46)]);
break;
}
var key = JM.MinObject.getKey (type, a1, a2, a3, a4);
data.put (key, value);
if (JU.Logger.debugging) JU.Logger.debug (JM.MinObject.decodeKey (key) + " " + (Clazz_instanceOf (value, Float) ? value : JU.Escape.eAD (value)));
} while (!(this.line = br.readLine ()).startsWith ("$"));
}, "java.io.BufferedReader,~N,java.util.Map");
Clazz_defineMethod (c$, "ival", 
 function (i, j) {
return JU.PT.parseInt (this.line.substring (i, j).trim ());
}, "~N,~N");
Clazz_defineMethod (c$, "fval", 
 function (i, j) {
return JU.PT.fVal (this.line.substring (i, j).trim ());
}, "~N,~N");
Clazz_defineMethod (c$, "dval", 
 function (i, j) {
return JU.PT.dVal (this.line.substring (i, j).trim ());
}, "~N,~N");
Clazz_defineMethod (c$, "getAtomTypes", 
 function () {
var resourceName = "MMFF94-smarts.txt";
var types =  new JU.Lst ();
try {
var br = this.getBufferedReader (resourceName);
var at;
types.addLast ( new JM.FF.AtomType (0, 0, 0, 0, 1, "H or NOT FOUND", ""));
while ((this.line = br.readLine ()) != null) {
if (this.line.length == 0 || this.line.startsWith ("#")) continue;
var elemNo = this.ival (3, 5);
var mmType = this.ival (6, 8);
var hType = this.ival (9, 11);
var formalCharge = this.fval (12, 15) / 12;
var val = this.ival (16, 18);
var desc = this.line.substring (19, 44).trim ();
var smarts = this.line.substring (45).trim ();
types.addLast (at =  new JM.FF.AtomType (elemNo, mmType, hType, formalCharge, val, desc, smarts));
JM.FF.ForceFieldMMFF.setFlags (at);
}
br.close ();
} catch (e$$) {
if (Clazz_exceptionOf (e$$, JV.JmolAsyncException)) {
var e = e$$;
{
throw  new JV.JmolAsyncException (e.getFileName ());
}
} else if (Clazz_exceptionOf (e$$, Exception)) {
var e = e$$;
{
System.err.println ("Exception " + e.toString () + " in getResource " + resourceName + " line=" + this.line);
}
} else {
throw e$$;
}
}
JU.Logger.info ((types.size () - 1) + " SMARTS-based atom types read");
JM.FF.ForceFieldMMFF.atomTypes = types;
});
c$.setFlags = Clazz_defineMethod (c$, "setFlags", 
 function (at) {
switch (at.mmType) {
case 32:
case 35:
case 72:
at.fcadj = 0.5;
break;
case 62:
case 76:
at.fcadj = 0.25;
break;
}
switch (at.mmType) {
case 37:
case 38:
case 39:
case 44:
case 58:
case 59:
case 63:
case 64:
case 65:
case 66:
case 69:
case 78:
case 79:
case 81:
case 82:
at.arom = true;
}
switch (at.mmType) {
case 2:
case 3:
case 4:
case 9:
case 30:
case 37:
case 39:
case 54:
case 57:
case 58:
case 63:
case 64:
case 67:
case 75:
case 78:
case 80:
case 81:
at.sbmb = true;
}
switch (at.mmType) {
case 6:
case 8:
case 10:
case 11:
case 12:
case 13:
case 14:
case 15:
case 26:
case 32:
case 35:
case 39:
case 40:
case 43:
case 44:
case 59:
case 62:
case 70:
case 72:
case 76:
at.pilp = true;
}
switch (at.mmType) {
case 10:
case 32:
case 35:
case 39:
case 41:
case 44:
case 55:
case 56:
case 58:
case 59:
case 69:
case 72:
case 81:
case 82:
at.mltb = 1;
break;
case 2:
case 3:
case 7:
case 9:
case 16:
case 17:
case 30:
case 37:
case 38:
case 45:
case 46:
case 47:
case 51:
case 53:
case 54:
case 57:
case 63:
case 64:
case 65:
case 66:
case 67:
case 74:
case 75:
case 78:
case 79:
case 80:
at.mltb = 2;
break;
case 4:
case 42:
case 60:
case 61:
at.mltb = 3;
break;
}
}, "JM.FF.AtomType");
c$.calculatePartialCharges = Clazz_defineMethod (c$, "calculatePartialCharges", 
function (bonds, bTypes, atoms, aTypes, bsAtoms, doRound) {
var partialCharges =  Clazz_newFloatArray (atoms.length, 0);
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) partialCharges[i] = JM.FF.ForceFieldMMFF.atomTypes.get (Math.max (0, aTypes[i])).formalCharge;

var a1 = null;
for (var i = bTypes.length; --i >= 0; ) {
a1 = bonds[i].atom1;
var a2 = bonds[i].atom2;
var ok1 = bsAtoms.get (a1.i);
var ok2 = bsAtoms.get (a2.i);
if (!ok1 && !ok2) continue;
var it = aTypes[a1.i];
var at1 = JM.FF.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
var type1 = (it < 0 ? -it : at1.mmType);
it = aTypes[a2.i];
var at2 = JM.FF.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
var type2 = (it < 0 ? -it : at2.mmType);
var dq;
try {
var bondType = bTypes[i];
var bFactor = (type1 < type2 ? -1 : 1);
var key = JM.MinObject.getKey (bondType, bFactor == 1 ? type2 : type1, bFactor == 1 ? type1 : type2, 127, 124);
var bciValue = JM.FF.ForceFieldMMFF.ffParams.get (key);
var bci;
var msg = (JU.Logger.debugging ? a1 + "/" + a2 + " mmTypes=" + type1 + "/" + type2 + " formalCharges=" + at1.formalCharge + "/" + at2.formalCharge + " bci = " : null);
if (bciValue == null) {
var pa = (JM.FF.ForceFieldMMFF.ffParams.get (JM.MinObject.getKey (0, type1, 127, 127, 127))).floatValue ();
var pb = (JM.FF.ForceFieldMMFF.ffParams.get (JM.MinObject.getKey (0, type2, 127, 127, 127))).floatValue ();
bci = pa - pb;
if (JU.Logger.debugging) msg += pa + " - " + pb + " = ";
} else {
bci = bFactor * bciValue.floatValue ();
}if (JU.Logger.debugging) {
msg += bci;
JU.Logger.debug (msg);
}dq = at2.fcadj * at2.formalCharge - at1.fcadj * at1.formalCharge + bci;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
dq = NaN;
} else {
throw e;
}
}
if (ok1) partialCharges[a1.i] += dq;
if (ok2) partialCharges[a2.i] -= dq;
}
if (doRound) {
var abscharge = 0;
for (var i = partialCharges.length; --i >= 0; ) {
partialCharges[i] = (Math.round (partialCharges[i] * 1000)) / 1000;
abscharge += Math.abs (partialCharges[i]);
}
if (abscharge == 0 && a1 != null) {
partialCharges[a1.i] = -0.0;
}}return partialCharges;
}, "~A,~A,~A,~A,JU.BS,~B");
c$.isBondType1 = Clazz_defineMethod (c$, "isBondType1", 
 function (at1, at2) {
return at1.sbmb && at2.sbmb || at1.arom && at2.arom;
}, "JM.FF.AtomType,JM.FF.AtomType");
Clazz_defineMethod (c$, "getBondType", 
 function (bond, at1, at2, index1, index2) {
return (JM.FF.ForceFieldMMFF.isBondType1 (at1, at2) && bond.getCovalentOrder () == 1 && !this.isAromaticBond (index1, index2) ? 1 : 0);
}, "JM.Bond,JM.FF.AtomType,JM.FF.AtomType,~N,~N");
Clazz_defineMethod (c$, "isAromaticBond", 
 function (a1, a2) {
if (this.vRings[3] != null) for (var i = this.vRings[3].size (); --i >= 0; ) {
var bsRing = this.vRings[3].get (i);
if (bsRing.get (a1) && bsRing.get (a2)) return true;
}
return false;
}, "~N,~N");
c$.getAtomTypeDescs = Clazz_defineMethod (c$, "getAtomTypeDescs", 
function (types) {
var stypes =  new Array (types.length);
for (var i = types.length; --i >= 0; ) {
stypes[i] = String.valueOf (types[i] < 0 ? -types[i] : JM.FF.ForceFieldMMFF.atomTypes.get (types[i]).mmType);
}
return stypes;
}, "~A");
c$.setAtomTypes = Clazz_defineMethod (c$, "setAtomTypes", 
 function (atoms, bsAtoms, smartsMatcher, vRings, allowUnknowns) {
var bitSets =  new JU.Lst ();
var smarts =  new Array (JM.FF.ForceFieldMMFF.atomTypes.size ());
var types =  Clazz_newIntArray (atoms.length, 0);
var bsElements =  new JU.BS ();
var bsHydrogen =  new JU.BS ();
var bsConnected = JU.BSUtil.copy (bsAtoms);
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var a = atoms[i];
var bonds = a.bonds;
if (bonds != null) for (var j = bonds.length; --j >= 0; ) if (bonds[j].isCovalent ()) bsConnected.set (bonds[j].getOtherAtom (a).i);

}
for (var i = bsConnected.nextSetBit (0); i >= 0; i = bsConnected.nextSetBit (i + 1)) {
var n = atoms[i].getElementNumber ();
switch (n) {
case 1:
bsHydrogen.set (i);
break;
default:
bsElements.set (n);
}
}
var nUsed = 0;
for (var i = 1; i < JM.FF.ForceFieldMMFF.atomTypes.size (); i++) {
var at = JM.FF.ForceFieldMMFF.atomTypes.get (i);
if (!bsElements.get (at.elemNo)) continue;
smarts[i] = at.smartsCode;
nUsed++;
}
JU.Logger.info (nUsed + " SMARTS matches used");
try {
smartsMatcher.getMMFF94AtomTypes (smarts, atoms, atoms.length, bsConnected, bitSets, vRings);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.error (e.toString ());
} else {
throw e;
}
}
var bsDone =  new JU.BS ();
for (var j = 0; j < bitSets.size (); j++) {
var bs = bitSets.get (j);
if (bs == null) continue;
bs.andNot (bsDone);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) types[i] = j;

bsDone.or (bs);
}
for (var i = bsHydrogen.nextSetBit (0); i >= 0; i = bsHydrogen.nextSetBit (i + 1)) {
var bonds = atoms[i].bonds;
if (bonds != null) {
var j = types[bonds[0].getOtherAtom (atoms[i]).i];
if (j != 0) bsDone.set (i);
types[i] = -JM.FF.ForceFieldMMFF.atomTypes.get (j).hType;
}}
if (JU.Logger.debugging) for (var i = bsConnected.nextSetBit (0); i >= 0; i = bsConnected.nextSetBit (i + 1)) JU.Logger.debug ("atom " + atoms[i] + "\ttype " + (types[i] < 0 ? "" + -types[i] : (JM.FF.ForceFieldMMFF.atomTypes.get (types[i]).mmType + "\t" + JM.FF.ForceFieldMMFF.atomTypes.get (types[i]).smartsCode + "\t" + JM.FF.ForceFieldMMFF.atomTypes.get (types[i]).descr)));

if (!allowUnknowns && bsDone.cardinality () != bsConnected.cardinality ()) return null;
return types;
}, "~A,JU.BS,J.api.SmilesMatcherInterface,~A,~B");
Clazz_defineMethod (c$, "setBondTypes", 
 function (bonds, bondCount, bsAtoms) {
var bTypes =  Clazz_newIntArray (bondCount, 0);
for (var i = bondCount; --i >= 0; ) {
var a1 = bonds[i].atom1;
var a2 = bonds[i].atom2;
var ok1 = bsAtoms.get (a1.i);
var ok2 = bsAtoms.get (a2.i);
if (!ok1 && !ok2) continue;
var it = this.rawAtomTypes[a1.i];
var at1 = JM.FF.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
it = this.rawAtomTypes[a2.i];
var at2 = JM.FF.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
bTypes[i] = this.getBondType (bonds[i], at1, at2, a1.i, a2.i);
}
return bTypes;
}, "~A,~N,JU.BS");
Clazz_defineMethod (c$, "fixTypes", 
 function () {
for (var i = this.minAtomCount; --i >= 0; ) {
var a = this.minAtoms[i];
var rawIndex = a.atom.i;
var it = this.rawAtomTypes[rawIndex];
a.ffAtomType = JM.FF.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
var type = (it < 0 ? -it : JM.FF.ForceFieldMMFF.atomTypes.get (it).mmType);
a.ffType = type;
a.vdwKey = JM.MinObject.getKey (0, type, 127, 127, 122);
a.partialCharge = this.rawMMFF94Charges[rawIndex];
}
for (var i = this.minBonds.length; --i >= 0; ) {
var bond = this.minBonds[i];
bond.type = this.rawBondTypes[bond.rawIndex];
bond.key = this.getKey (bond, bond.type, 3);
if (bond.key == null) return false;
}
for (var i = this.minAngles.length; --i >= 0; ) {
var angle = this.minAngles[i];
angle.key = this.getKey (angle, angle.type, 5);
angle.sbKey = this.getKey (angle, angle.sbType, 21);
}
for (var i = this.minTorsions.length; --i >= 0; ) {
var torsion = this.minTorsions[i];
torsion.key = this.getKey (torsion, torsion.type, 9);
}
return true;
});
Clazz_defineMethod (c$, "setAngleType", 
 function (angle) {
angle.type = this.minBonds[angle.data[3]].type + this.minBonds[angle.data[4]].type;
if (this.checkRings (this.vRings[0], angle.data, 3)) {
angle.type += (angle.type == 0 ? 3 : 4);
} else if (this.checkRings (this.vRings[1], angle.data, 3)) {
angle.type += (angle.type == 0 ? 4 : 6);
}angle.sbType = JM.FF.ForceFieldMMFF.sbMap[angle.type];
switch (angle.type) {
case 1:
case 5:
case 7:
angle.sbType += this.minBonds[angle.data[4]].type;
break;
}
return angle.type;
}, "JM.MinAngle");
Clazz_defineMethod (c$, "setTorsionType", 
 function (t) {
if (this.checkRings (this.vRings[1], t.data, 4)) return (t.type = 4);
t.type = (this.minBonds[t.data[5]].type == 1 ? 1 : this.minBonds[t.data[4]].type == 0 && this.minBonds[t.data[6]].type == 0 ? 0 : 2);
if (t.type == 0 && this.checkRings (this.vRings[2], t.data, 4)) {
t.type = 5;
}return t.type;
}, "JM.MinTorsion");
Clazz_defineMethod (c$, "typeOf", 
 function (iAtom) {
return this.minAtoms[iAtom].ffType;
}, "~N");
Clazz_defineMethod (c$, "checkRings", 
 function (v, minlist, n) {
if (v != null) for (var i = v.size (); --i >= 0; ) {
var bs = v.get (i);
if (bs.get (this.minAtoms[minlist[0]].atom.i) && bs.get (this.minAtoms[minlist[1]].atom.i) && (n < 3 || bs.get (this.minAtoms[minlist[2]].atom.i)) && (n < 4 || bs.get (this.minAtoms[minlist[3]].atom.i))) return true;
}
return false;
}, "JU.Lst,~A,~N");
Clazz_defineMethod (c$, "getKey", 
 function (obj, type, ktype) {
var o = (Clazz_instanceOf (obj, JM.MinObject) ? obj : null);
var data = (o == null ? obj : o.data);
var n = 4;
switch (ktype) {
case 3:
this.fixOrder (data, 0, 1);
n = 2;
break;
case 5:
if (this.fixOrder (data, 0, 2) == -1) JM.FF.ForceFieldMMFF.swap (data, 3, 4);
type = this.setAngleType (o);
n = 3;
break;
case 21:
n = 3;
break;
case 9:
switch (this.fixOrder (data, 1, 2)) {
case 1:
break;
case -1:
JM.FF.ForceFieldMMFF.swap (data, 0, 3);
JM.FF.ForceFieldMMFF.swap (data, 4, 6);
break;
case 0:
if (this.fixOrder (data, 0, 3) == -1) JM.FF.ForceFieldMMFF.swap (data, 4, 6);
break;
}
type = this.setTorsionType (o);
}
var key = null;
for (var i = 0; i < 4; i++) this.typeData[i] = (i < n ? this.typeOf (data[i]) : 127);

switch (ktype) {
case 21:
this.typeData[3] = 125;
break;
case 13:
JM.FF.ForceFieldMMFF.sortOop (this.typeData);
break;
}
key = JM.MinObject.getKey (type, this.typeData[0], this.typeData[1], this.typeData[2], this.typeData[3]);
var ddata = JM.FF.ForceFieldMMFF.ffParams.get (key);
switch (ktype) {
case 3:
return (ddata != null && ddata[0] > 0 ? key : this.applyEmpiricalRules (o, ddata, 3));
case 5:
if (ddata != null && ddata[0] != 0) return key;
break;
case 9:
if (ddata == null) {
if (!JM.FF.ForceFieldMMFF.ffParams.containsKey (key = this.getTorsionKey (type, 0, 2)) && !JM.FF.ForceFieldMMFF.ffParams.containsKey (key = this.getTorsionKey (type, 2, 0)) && !JM.FF.ForceFieldMMFF.ffParams.containsKey (key = this.getTorsionKey (type, 2, 2))) key = this.getTorsionKey (0, 2, 2);
ddata = JM.FF.ForceFieldMMFF.ffParams.get (key);
}return (ddata != null ? key : this.applyEmpiricalRules (o, ddata, 9));
case 21:
if (ddata != null) return key;
var r1 = this.getRowFor (data[0]);
var r2 = this.getRowFor (data[1]);
var r3 = this.getRowFor (data[2]);
return JM.MinObject.getKey (0, r1, r2, r3, 126);
case 13:
if (ddata != null) return key;
}
var isSwapped = false;
var haveKey = false;
for (var i = 0; i < 3 && !haveKey; i++) {
for (var j = 0, bit = 1; j < n; j++, bit <<= 1) if ((ktype & bit) == bit) this.typeData[j] = JM.FF.ForceFieldMMFF.getEquivalentType (this.typeOf (data[j]), i);

switch (ktype) {
case 3:
isSwapped = (JM.FF.ForceFieldMMFF.fixTypeOrder (this.typeData, 0, 1));
break;
case 5:
isSwapped = (JM.FF.ForceFieldMMFF.fixTypeOrder (this.typeData, 0, 2));
break;
case 13:
JM.FF.ForceFieldMMFF.sortOop (this.typeData);
break;
}
key = JM.MinObject.getKey (type, this.typeData[0], this.typeData[1], this.typeData[2], this.typeData[3]);
haveKey = JM.FF.ForceFieldMMFF.ffParams.containsKey (key);
}
if (haveKey) {
if (isSwapped) switch (ktype) {
case 5:
JM.FF.ForceFieldMMFF.swap (data, 0, 2);
JM.FF.ForceFieldMMFF.swap (data, 3, 4);
this.setAngleType (o);
break;
}
} else if (type != 0 && ktype == 5) {
key = Integer.$valueOf (key.intValue () ^ 0xFF);
}ddata = JM.FF.ForceFieldMMFF.ffParams.get (key);
switch (ktype) {
case 5:
return (ddata != null && ddata[0] != 0 ? key : this.applyEmpiricalRules (o, ddata, 5));
}
return key;
}, "~O,~N,~N");
Clazz_defineMethod (c$, "getTorsionKey", 
 function (type, i, j) {
return JM.MinObject.getKey (type, JM.FF.ForceFieldMMFF.getEquivalentType (this.typeData[0], i), this.typeData[1], this.typeData[2], JM.FF.ForceFieldMMFF.getEquivalentType (this.typeData[3], j));
}, "~N,~N,~N");
Clazz_defineMethod (c$, "applyEmpiricalRules", 
 function (o, ddata, ktype) {
var rr;
var rr2;
var beta = 0;
var a;
var b;
var c;
switch (ktype) {
case 3:
a = this.minAtoms[o.data[0]];
b = this.minAtoms[o.data[1]];
var elemno1 = a.atom.getElementNumber ();
var elemno2 = b.atom.getElementNumber ();
var key = JM.MinObject.getKey (0, Math.min (elemno1, elemno2), Math.max (elemno1, elemno2), 127, 123);
ddata = JM.FF.ForceFieldMMFF.ffParams.get (key);
if (ddata == null) return null;
var kbref = ddata[0];
var r0ref = ddata[1];
var r0 = JM.FF.ForceFieldMMFF.getRuleBondLength (a, b, (o).order, this.isAromaticBond (o.data[0], o.data[1]));
if (r0 == 0) return null;
rr = r0ref / r0;
rr2 = rr * rr;
var rr4 = rr2 * rr2;
var rr6 = rr4 * rr2;
var kb = kbref * rr6;
o.ddata =  Clazz_newDoubleArray (-1, [kb, r0]);
return Integer.$valueOf (-1);
case 5:
var theta0;
if (ddata == null || (theta0 = ddata[1]) == 0) {
b = this.minAtoms[o.data[1]];
var atom = b.atom;
var elemno = atom.getElementNumber ();
switch (o.type) {
case 3:
case 5:
case 6:
theta0 = 60;
beta *= 0.05;
break;
case 4:
case 7:
case 8:
theta0 = 90;
break;
default:
theta0 = 120;
var crd = atom.getCovalentBondCount ();
switch (crd) {
case 2:
if (JM.MinAtom.isLinear (b)) theta0 = 180;
 else if (elemno == 8) theta0 = 105;
 else if (elemno > 10) theta0 = 95.0;
break;
case 3:
if (b.ffAtomType.mltb == 0 && b.ffAtomType.val == 3) theta0 = (elemno == 7 ? 107 : 92);
break;
case 4:
theta0 = 109.45;
break;
}
}
}beta = 1.75;
switch (o.type) {
case 3:
case 5:
case 6:
beta *= 0.05;
break;
case 4:
case 7:
case 8:
beta *= 0.85;
break;
}
var za = JM.FF.ForceFieldMMFF.getZParam (this.minAtoms[o.data[0]].atom.getElementNumber ());
var cb = JM.FF.ForceFieldMMFF.getCParam (this.minAtoms[o.data[1]].atom.getElementNumber ());
var zc = JM.FF.ForceFieldMMFF.getZParam (this.minAtoms[o.data[2]].atom.getElementNumber ());
var r0ab = JM.FF.ForceFieldMMFF.getR0 (this.minBonds[o.data[3]]);
var r0bc = JM.FF.ForceFieldMMFF.getR0 (this.minBonds[o.data[4]]);
rr = r0ab + r0bc;
rr2 = rr * rr;
var D = (r0ab - r0bc) / rr2;
var theta2 = theta0 * 0.017453292519943295;
theta2 *= theta2;
var ka = (beta * za * cb * zc * Math.exp (-2 * D)) / (rr * theta2);
o.ddata =  Clazz_newDoubleArray (-1, [ka, theta0]);
return Integer.$valueOf (-1);
case 9:
var ib = o.data[1];
var ic = o.data[2];
b = this.minAtoms[ib];
c = this.minAtoms[ic];
if (JM.MinAtom.isLinear (b) || JM.MinAtom.isLinear (c)) return null;
var bondBC = this.minBonds[o.data[5]];
var elemnoB = b.atom.getElementNumber ();
var elemnoC = c.atom.getElementNumber ();
var ub = JM.FF.ForceFieldMMFF.getUParam (elemnoB);
var uc = JM.FF.ForceFieldMMFF.getUParam (elemnoC);
var vb = JM.FF.ForceFieldMMFF.getVParam (elemnoB);
var vc = JM.FF.ForceFieldMMFF.getVParam (elemnoC);
var v1 = 0;
var v2 = 0;
var v3 = 0;
var pi_bc = -1;
var n_bc = -1;
var wb = -1;
var wc = 0;
var valB = b.ffAtomType.val;
var valC = c.ffAtomType.val;
var pilpB = b.ffAtomType.pilp;
var pilpC = c.ffAtomType.pilp;
var mltbB = b.ffAtomType.mltb;
var mltbC = c.ffAtomType.mltb;
out : while (true) {
if (this.isAromaticBond (ib, ic)) {
pi_bc = (pilpB || pilpC ? 0.3 : 0.5);
beta = (valB + valC == 7 ? 3 : 6);
break out;
}if (bondBC.order == 2) {
beta = 6;
pi_bc = (mltbB == 2 && mltbC == 2 ? 1.0 : 0.4);
break out;
}var crdB = b.atom.getCovalentBondCount ();
var crdC = c.atom.getCovalentBondCount ();
if (crdB == 4 && crdC == 4) {
vb = JM.FF.ForceFieldMMFF.getVParam (elemnoB);
vc = JM.FF.ForceFieldMMFF.getVParam (elemnoC);
n_bc = 9;
break out;
}if (crdB != 4 && (valB > crdB || mltbB > 0) || crdC != 4 && (valC > crdC || mltbC > 0)) return null;
var case2 = (pilpB && mltbC > 0);
var case3 = (pilpC && mltbB > 0);
if (bondBC.order == 1 && (mltbB > 0 && mltbC > 0 || case2 || case3)) {
if (pilpB && pilpC) return null;
beta = 6;
if (case2) {
pi_bc = (mltbC == 1 ? 0.5 : elemnoB <= 10 && elemnoC <= 10 ? 0.3 : 0.15);
break out;
}if (case3) {
pi_bc = (mltbB == 1 ? 0.5 : elemnoB <= 10 && elemnoC <= 10 ? 0.3 : 0.15);
break out;
}if ((mltbB == 1 || mltbC == 1) && (elemnoB == 6 || elemnoC == 6)) {
pi_bc = 0.4;
break out;
}pi_bc = 0.15;
break out;
}switch (elemnoB << 8 + elemnoC) {
case 0x808:
wb = wc = 2;
break out;
case 0x810:
wb = 2;
wc = 8;
break out;
case 0x1008:
wb = 8;
wc = 2;
break out;
case 0x1010:
wb = wc = 8;
break out;
}
n_bc = crdB * crdC;
break out;
}
if (pi_bc > 0) v2 = beta * pi_bc * Math.sqrt (ub * uc);
 else if (n_bc > 0) v3 = Math.sqrt (vb * vc) / n_bc;
 else if (wb != 0) v2 = -Math.sqrt (wb * wc);
o.ddata =  Clazz_newDoubleArray (-1, [v1, v2, v3]);
return Integer.$valueOf (-1);
default:
return null;
}
}, "JM.MinObject,~A,~N");
c$.getR0 = Clazz_defineMethod (c$, "getR0", 
 function (b) {
return (b.ddata == null ? (JM.FF.ForceFieldMMFF.ffParams.get (b.key)) : b.ddata)[1];
}, "JM.MinBond");
Clazz_defineMethod (c$, "getRowFor", 
 function (i) {
var elemno = this.minAtoms[i].atom.getElementNumber ();
return (elemno < 3 ? 0 : elemno < 11 ? 1 : elemno < 19 ? 2 : elemno < 37 ? 3 : 4);
}, "~N");
Clazz_defineMethod (c$, "getOutOfPlaneParameter", 
function (data) {
var ddata = JM.FF.ForceFieldMMFF.ffParams.get (this.getKey (data, 6, 13));
return (ddata == null ? 0 : ddata[0]);
}, "~A");
c$.sortOop = Clazz_defineMethod (c$, "sortOop", 
 function (typeData) {
JM.FF.ForceFieldMMFF.fixTypeOrder (typeData, 0, 2);
JM.FF.ForceFieldMMFF.fixTypeOrder (typeData, 0, 3);
JM.FF.ForceFieldMMFF.fixTypeOrder (typeData, 2, 3);
}, "~A");
c$.fixTypeOrder = Clazz_defineMethod (c$, "fixTypeOrder", 
 function (a, i, j) {
if (a[i] > a[j]) {
JM.FF.ForceFieldMMFF.swap (a, i, j);
return true;
}return false;
}, "~A,~N,~N");
Clazz_defineMethod (c$, "fixOrder", 
 function (a, i, j) {
var test = this.typeOf (a[j]) - this.typeOf (a[i]);
if (test < 0) JM.FF.ForceFieldMMFF.swap (a, i, j);
return (test < 0 ? -1 : test > 0 ? 1 : 0);
}, "~A,~N,~N");
c$.swap = Clazz_defineMethod (c$, "swap", 
 function (a, i, j) {
var t = a[i];
a[i] = a[j];
a[j] = t;
}, "~A,~N,~N");
c$.getEquivalentType = Clazz_defineMethod (c$, "getEquivalentType", 
 function (type, level) {
return (type == 0 ? 0 : type == 70 || type > 82 ? type : level == 2 ? 0 : JM.FF.ForceFieldMMFF.equivalentTypes[((type - 1) << 1) + level]);
}, "~N,~N");
c$.getZParam = Clazz_defineMethod (c$, "getZParam", 
 function (elemno) {
switch (elemno) {
case 1:
return 1.395;
case 6:
return 2.494;
case 7:
return 2.711;
case 8:
return 3.045;
case 9:
return 2.847;
case 14:
return 2.350;
case 15:
return 2.350;
case 16:
return 2.980;
case 17:
return 2.909;
case 35:
return 3.017;
case 53:
return 3.086;
}
return 0.0;
}, "~N");
c$.getCParam = Clazz_defineMethod (c$, "getCParam", 
 function (elemno) {
switch (elemno) {
case 5:
return 0.704;
case 6:
return 1.016;
case 7:
return 1.113;
case 8:
return 1.337;
case 14:
return 0.811;
case 15:
return 1.068;
case 16:
return 1.249;
case 17:
return 1.078;
case 33:
return 0.825;
}
return 0.0;
}, "~N");
c$.getUParam = Clazz_defineMethod (c$, "getUParam", 
 function (elemno) {
switch (elemno) {
case 6:
case 7:
case 8:
return 2.0;
case 14:
case 15:
case 16:
return 1.25;
}
return 0.0;
}, "~N");
c$.getVParam = Clazz_defineMethod (c$, "getVParam", 
 function (elemno) {
switch (elemno) {
case 6:
return 2.12;
case 7:
return 1.5;
case 8:
return 0.2;
case 14:
return 1.22;
case 15:
return 2.4;
case 16:
return 0.49;
}
return 0.0;
}, "~N");
c$.getCovalentRadius = Clazz_defineMethod (c$, "getCovalentRadius", 
 function (elemno) {
switch (elemno) {
case 1:
return 0.33;
case 5:
return 0.81;
case 6:
return 0.77;
case 7:
return 0.73;
case 8:
return 0.72;
case 9:
return 0.74;
case 13:
return 1.22;
case 14:
return 1.15;
case 15:
return 1.09;
case 16:
return 1.03;
case 17:
return 1.01;
case 31:
return 1.19;
case 32:
return 1.20;
case 33:
return 1.20;
case 34:
return 1.16;
case 35:
return 1.15;
case 44:
return 1.46;
case 50:
return 1.40;
case 51:
return 1.41;
case 52:
return 1.35;
case 53:
return 1.33;
case 81:
return 1.51;
case 82:
return 1.53;
case 83:
return 1.55;
default:
return JU.Elements.getBondingRadius (elemno, 0);
}
}, "~N");
c$.getRuleBondLength = Clazz_defineMethod (c$, "getRuleBondLength", 
 function (a, b, boAB, isAromatic) {
switch (boAB) {
case 1:
case 2:
case 3:
break;
case 5:
break;
default:
return 0;
}
var elemnoA = a.atom.getElementNumber ();
var elemnoB = b.atom.getElementNumber ();
var r0a = JM.FF.ForceFieldMMFF.getCovalentRadius (elemnoA);
var r0b = JM.FF.ForceFieldMMFF.getCovalentRadius (elemnoB);
var Xa = JU.Elements.getAllredRochowElectroNeg (elemnoA);
var Xb = JU.Elements.getAllredRochowElectroNeg (elemnoB);
var c = (elemnoA == 1 || elemnoB == 1 ? 0.05 : 0.085);
var n = 1.4;
var r = r0a + r0b;
if (isAromatic) boAB = (a.ffAtomType.pilp || b.ffAtomType.pilp ? 5 : 4);
 else switch (a.ffAtomType.mltb << 4 + b.ffAtomType.mltb) {
case 0x11:
boAB = 4;
break;
case 0x12:
case 0x21:
boAB = 5;
break;
}
switch (boAB) {
case 1:
switch (a.ffAtomType.mltb) {
case 0:
break;
case 1:
case 2:
break;
case 3:
break;
}
switch (b.ffAtomType.mltb) {
case 0:
break;
case 1:
case 2:
break;
case 3:
break;
}
break;
default:
break;
}
r -= c * Math.pow (Math.abs (Xa - Xb), n);
return r;
}, "JM.MinAtom,JM.MinAtom,~N,~B");
Clazz_defineStatics (c$,
"A4_VDW", 122,
"A4_BNDK", 123,
"A4_CHRG", 124,
"A4_SB", 125,
"A4_SBDEF", 126,
"KEY_SBDEF", 0,
"KEY_PBCI", 0,
"KEY_VDW", 0,
"KEY_BNDK", 0,
"KEY_OOP", 6,
"TYPE_PBCI", 0x1,
"TYPE_VDW", 0x11,
"TYPE_BNDK", 0x222,
"TYPE_CHRG", 0x22,
"TYPE_BOND", 0x3,
"TYPE_ANGLE", 0x5,
"TYPE_SB", 0x15,
"TYPE_SBDEF", 0x25,
"TYPE_TORSION", 0x9,
"TYPE_OOP", 0xD,
"atomTypes", null,
"ffParams", null,
"names", "END.BCI.CHG.ANG.NDK.OND.OOP.TBN.FSB.TOR.VDW.",
"types",  Clazz_newIntArray (-1, [0, 1, 34, 5, 546, 3, 13, 21, 37, 9, 17]),
"sbMap",  Clazz_newIntArray (-1, [0, 1, 3, 5, 4, 6, 8, 9, 11]),
"equivalentTypes",  Clazz_newIntArray (-1, [1, 1, 2, 1, 3, 1, 4, 1, 5, 5, 6, 6, 7, 6, 8, 8, 9, 8, 10, 8, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 15, 17, 15, 18, 15, 19, 19, 1, 1, 21, 5, 22, 1, 23, 5, 24, 5, 25, 25, 26, 25, 28, 5, 28, 5, 29, 5, 2, 1, 31, 31, 7, 6, 21, 5, 8, 8, 6, 6, 36, 5, 2, 1, 9, 8, 10, 8, 10, 8, 3, 1, 42, 8, 10, 8, 16, 15, 10, 8, 9, 8, 42, 8, 9, 8, 6, 6, 21, 5, 7, 6, 21, 5, 42, 8, 9, 8, 10, 8, 10, 8, 2, 1, 10, 8, 6, 6, 4, 1, 42, 8, 10, 8, 2, 1, 2, 1, 9, 8, 9, 8, 9, 8, 8, 8, 9, 8, 70, 70, 5, 5, 16, 15, 18, 15, 17, 15, 26, 25, 9, 8, 12, 12, 2, 1, 9, 8, 2, 1, 10, 8, 9, 8]));
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.ForceField", "JS.T"], "JM.FF.ForceFieldUFF", ["java.util.Hashtable", "JU.BS", "$.Lst", "$.PT", "JM.FF.CalculationsUFF", "$.FFParam", "JU.Elements", "$.Logger", "JV.JmolAsyncException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bsAromatic = null;
Clazz_instantialize (this, arguments);
}, JM.FF, "ForceFieldUFF", JM.FF.ForceField);
Clazz_makeConstructor (c$, 
function (minimizer) {
Clazz_superConstructor (this, JM.FF.ForceFieldUFF, []);
this.minimizer = minimizer;
this.name = "UFF";
}, "JM.Minimizer");
Clazz_overrideMethod (c$, "clear", 
function () {
this.bsAromatic = null;
});
Clazz_overrideMethod (c$, "setModel", 
function (bsElements, elemnoMax) {
this.setModelFields ();
JU.Logger.info ("minimize: setting atom types...");
if (JM.FF.ForceFieldUFF.atomTypes == null && (JM.FF.ForceFieldUFF.atomTypes = this.getAtomTypes ()) == null) return false;
if (JM.FF.ForceFieldUFF.ffParams == null && (JM.FF.ForceFieldUFF.ffParams = this.getFFParameters ()) == null) return false;
this.setAtomTypes (bsElements, elemnoMax);
this.calc =  new JM.FF.CalculationsUFF (this, JM.FF.ForceFieldUFF.ffParams, this.minAtoms, this.minBonds, this.minAngles, this.minTorsions, this.minPositions, this.minimizer.constraints);
return this.calc.setupCalculations ();
}, "JU.BS,~N");
Clazz_defineMethod (c$, "setAtomTypes", 
 function (bsElements, elemnoMax) {
var nTypes = JM.FF.ForceFieldUFF.atomTypes.size ();
bsElements.clear (0);
for (var i = 0; i < nTypes; i++) {
var data = JM.FF.ForceFieldUFF.atomTypes.get (i);
var smarts = data[0];
if (smarts == null) continue;
var search = this.getSearch (smarts, elemnoMax, bsElements);
if (bsElements.get (0)) bsElements.clear (0);
 else if (search == null) break;
 else for (var j = this.minimizer.bsAtoms.nextSetBit (0), pt = 0; j < this.minimizer.atoms.length && j >= 0; j = this.minimizer.bsAtoms.nextSetBit (j + 1), pt++) if (search.get (j)) this.minAtoms[pt].sType = data[1].intern ();

}
}, "JU.BS,~N");
Clazz_defineMethod (c$, "getSearch", 
 function (smarts, elemnoMax, bsElements) {
var search = null;
var len = smarts.length;
search = JM.FF.ForceFieldUFF.tokenTypes[0];
var n = smarts.charCodeAt (len - 2) - 48;
var elemNo = 0;
if (n >= 10) n = 0;
var isAromatic = false;
if (smarts.charAt (1) == '#') {
elemNo = JU.PT.parseInt (smarts.substring (2, len - 1));
} else {
var s = smarts.substring (1, (n > 0 ? len - 3 : len - 1));
if (s.equals (s.toLowerCase ())) {
s = s.toUpperCase ();
isAromatic = true;
}elemNo = JU.Elements.elementNumberFromSymbol (s, false);
}if (elemNo > elemnoMax) return null;
if (!bsElements.get (elemNo)) {
bsElements.set (0);
return null;
}switch (smarts.charAt (len - 3)) {
case 'D':
search = JM.FF.ForceFieldUFF.tokenTypes[2];
search[6].intValue = n;
break;
case '^':
search = JM.FF.ForceFieldUFF.tokenTypes[4 + (n - 1)];
break;
case '+':
search = JM.FF.ForceFieldUFF.tokenTypes[1];
search[5].intValue = n;
break;
case '-':
search = JM.FF.ForceFieldUFF.tokenTypes[1];
search[5].intValue = -n;
break;
case 'A':
search = JM.FF.ForceFieldUFF.tokenTypes[6];
break;
}
search[2].intValue = elemNo;
var v = this.minimizer.vwr.evaluateExpression (search);
if (!(Clazz_instanceOf (v, JU.BS))) return null;
var bs = v;
if (isAromatic && bs.nextSetBit (0) >= 0) {
if (this.bsAromatic == null) this.bsAromatic = this.minimizer.vwr.evaluateExpression (JM.FF.ForceFieldUFF.tokenTypes[3]);
bs.and (this.bsAromatic);
}if (JU.Logger.debugging && bs.nextSetBit (0) >= 0) JU.Logger.debug (smarts + " minimize atoms=" + bs);
return bs;
}, "~S,~N,JU.BS");
Clazz_defineMethod (c$, "getFFParameters", 
 function () {
var ffParam;
var temp =  new java.util.Hashtable ();
var resourceName = "UFF.txt";
var br = null;
try {
br = this.getBufferedReader (resourceName);
var line;
while ((line = br.readLine ()) != null) {
var vs = JU.PT.getTokens (line);
if (vs.length < 13) continue;
if (JU.Logger.debugging) JU.Logger.debug (line);
if (line.substring (0, 5).equals ("param")) {
ffParam =  new JM.FF.FFParam ();
temp.put (vs[1], ffParam);
ffParam.dVal =  Clazz_newDoubleArray (11, 0);
ffParam.sVal =  new Array (1);
ffParam.sVal[0] = vs[1];
ffParam.dVal[0] = JU.PT.parseFloat (vs[2]);
ffParam.dVal[1] = JU.PT.parseFloat (vs[3]) * 0.017453292519943295;
ffParam.dVal[2] = JU.PT.parseFloat (vs[4]);
ffParam.dVal[3] = JU.PT.parseFloat (vs[5]);
ffParam.dVal[4] = JU.PT.parseFloat (vs[6]);
ffParam.dVal[5] = JU.PT.parseFloat (vs[7]);
ffParam.dVal[6] = JU.PT.parseFloat (vs[8]);
ffParam.dVal[7] = JU.PT.parseFloat (vs[9]);
ffParam.dVal[8] = JU.PT.parseFloat (vs[10]);
ffParam.dVal[9] = JU.PT.parseFloat (vs[11]);
ffParam.dVal[10] = JU.PT.parseFloat (vs[12]);
ffParam.iVal =  Clazz_newIntArray (1, 0);
var coord = (vs[1].length > 2 ? vs[1].charAt (2) : '1');
switch (coord) {
case 'R':
coord = '2';
break;
default:
coord = '1';
break;
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
break;
}
ffParam.iVal[0] = coord.charCodeAt (0) - 48;
}}
br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + resourceName);
try {
br.close ();
} catch (ee) {
if (Clazz_exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
return null;
} else {
throw e;
}
}
JU.Logger.info (temp.size () + " atom types read from " + resourceName);
return temp;
});
Clazz_defineMethod (c$, "getAtomTypes", 
 function () {
var types =  new JU.Lst ();
var fileName = "UFF.txt";
try {
var br = this.getBufferedReader (fileName);
var line;
while ((line = br.readLine ()) != null) {
if (line.length > 4 && line.substring (0, 4).equals ("atom")) {
var vs = JU.PT.getTokens (line);
var info =  Clazz_newArray (-1, [vs[1], vs[2]]);
types.addLast (info);
}}
br.close ();
} catch (e$$) {
if (Clazz_exceptionOf (e$$, JV.JmolAsyncException)) {
var e = e$$;
{
throw  new JV.JmolAsyncException (e.getFileName ());
}
} else if (Clazz_exceptionOf (e$$, Exception)) {
var e = e$$;
{
System.err.println ("Exception " + e.toString () + " in getResource " + fileName);
}
} else {
throw e$$;
}
}
JU.Logger.info (types.size () + " UFF parameters read");
return (types.size () > 0 ? types : null);
});
Clazz_defineStatics (c$,
"atomTypes", null,
"ffParams", null,
"TOKEN_ELEMENT_ONLY", 0,
"TOKEN_ELEMENT_CHARGED", 1,
"TOKEN_ELEMENT_CONNECTED", 2,
"TOKEN_AROMATIC", 3,
"TOKEN_ELEMENT_SP", 4,
"TOKEN_ELEMENT_ALLYLIC", 6,
"PT_ELEMENT", 2,
"PT_CHARGE", 5,
"PT_CONNECT", 6);
c$.tokenTypes = c$.prototype.tokenTypes =  Clazz_newArray (-1, [ Clazz_newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenExpressionEnd]),  Clazz_newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.n (268435860, 1631586315), JS.T.i (0), JS.T.tokenExpressionEnd]),  Clazz_newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.i (0), JS.T.tokenRightParen, JS.T.tokenExpressionEnd]),  Clazz_newArray (-1, [JS.T.tokenExpressionBegin, JS.T.o (1073741824, "flatring"), JS.T.tokenExpressionEnd]),  Clazz_newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.tokenLeftParen, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.i (1), JS.T.tokenComma, JS.T.o (4, "triple"), JS.T.tokenRightParen, JS.T.tokenOr, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.i (2), JS.T.tokenComma, JS.T.o (4, "double"), JS.T.tokenRightParen, JS.T.tokenRightParen, JS.T.tokenExpressionEnd]),  Clazz_newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.o (134217736, "connected"), JS.T.tokenLeftParen, JS.T.i (1), JS.T.tokenComma, JS.T.o (4, "double"), JS.T.tokenRightParen, JS.T.tokenExpressionEnd]),  Clazz_newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.i (3), JS.T.tokenRightParen, JS.T.tokenAnd, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.o (4, "double"), JS.T.tokenRightParen, JS.T.tokenRightParen, JS.T.tokenExpressionEnd])]);
});
Clazz_declarePackage ("JM.FF");
c$ = Clazz_decorateAsClass (function () {
this.key = null;
this.dE = 0;
this.a = null;
this.b = null;
this.c = null;
this.d = null;
this.ia = 0;
this.ib = 0;
this.ic = 0;
this.id = 0;
this.iData = null;
this.dData = null;
this.delta = 0;
this.rab = 0;
this.theta = 0;
this.energy = 0;
this.calcs = null;
Clazz_instantialize (this, arguments);
}, JM.FF, "Calculation");
Clazz_defineMethod (c$, "set", 
function (calcs) {
this.calcs = calcs;
return this;
}, "JM.FF.Calculations");
Clazz_defineMethod (c$, "setData", 
function (calc, ia, ib, d) {
}, "JU.Lst,~N,~N,~N");
Clazz_defineMethod (c$, "getEnergy", 
function () {
return this.energy;
});
Clazz_defineMethod (c$, "getPointers", 
function (dataIn) {
this.dData = dataIn[1];
this.iData = dataIn[0];
switch (this.iData.length) {
default:
this.id = this.iData[3];
case 3:
this.ic = this.iData[2];
case 2:
this.ib = this.iData[1];
case 1:
this.ia = this.iData[0];
case 0:
break;
}
}, "~A");
Clazz_declarePackage ("JM.FF");
Clazz_load (["JU.AU", "$.SB", "$.V3d"], "JM.FF.Calculations", ["java.lang.Float", "JU.Lst", "$.PT", "JM.Util"], function () {
c$ = Clazz_decorateAsClass (function () {
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
Clazz_instantialize (this, arguments);
}, JM.FF, "Calculations");
Clazz_prepareFields (c$, function () {
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
Clazz_defineMethod (c$, "getParameter", 
function (o) {
return this.ffParams.get (o);
}, "~O");
Clazz_makeConstructor (c$, 
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
Clazz_defineMethod (c$, "setConstraints", 
function (constraints) {
if (constraints == null || constraints.isEmpty ()) return;
this.constraintsByType =  Clazz_newArray (-1, [null, null, null]);
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
Clazz_defineMethod (c$, "addForce", 
function (v, i, dE) {
this.minAtoms[i].force[0] += v.x * dE;
this.minAtoms[i].force[1] += v.y * dE;
this.minAtoms[i].force[2] += v.z * dE;
}, "JU.V3d,~N,~N");
Clazz_defineMethod (c$, "setSilent", 
function (TF) {
this.silent = TF;
}, "~B");
Clazz_defineMethod (c$, "getLogData", 
function () {
return this.logData.toString ();
});
Clazz_defineMethod (c$, "appendLogData", 
function (s) {
this.logData.append (s).append ("\n");
}, "~S");
Clazz_defineMethod (c$, "setLoggingEnabled", 
function (TF) {
this.loggingEnabled = TF;
if (this.loggingEnabled) this.logData =  new JU.SB ();
}, "~B");
Clazz_defineMethod (c$, "setPreliminary", 
function (TF) {
this.isPreliminary = TF;
}, "~B");
Clazz_defineMethod (c$, "pairSearch", 
function (calc1, pc1, calc2, pc2) {
for (var i = 0; i < this.ac - 1; i++) {
var bsVdw = this.minAtoms[i].bsVdw;
for (var j = bsVdw.nextSetBit (0); j >= 0; j = bsVdw.nextSetBit (j + 1)) {
pc1.setData (calc1, i, j, 0);
if (pc2 != null) pc2.setData (calc2, i, j, 0);
}
}
}, "JU.Lst,JM.FF.Calculation,JU.Lst,JM.FF.Calculation");
Clazz_defineMethod (c$, "calc", 
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
Clazz_defineMethod (c$, "energyStrBnd", 
function (gradients) {
return 0.0;
}, "~B");
Clazz_defineMethod (c$, "energyBond", 
function (gradients) {
return this.calc (0, gradients, true);
}, "~B");
Clazz_defineMethod (c$, "energyAngle", 
function (gradients) {
return this.calc (1, gradients, true);
}, "~B");
Clazz_defineMethod (c$, "energyTorsion", 
function (gradients) {
return this.calc (2, gradients, true);
}, "~B");
Clazz_defineMethod (c$, "energyStretchBend", 
function (gradients) {
return this.calc (3, gradients, false);
}, "~B");
Clazz_defineMethod (c$, "energyOOP", 
function (gradients) {
return this.calc (4, gradients, false);
}, "~B");
Clazz_defineMethod (c$, "energyVDW", 
function (gradients) {
return this.calc (5, gradients, false);
}, "~B");
Clazz_defineMethod (c$, "energyES", 
function (gradients) {
return this.calc (6, gradients, false);
}, "~B");
Clazz_defineMethod (c$, "constraintEnergy", 
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
Clazz_defineMethod (c$, "constrainQuadratic", 
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
Clazz_defineMethod (c$, "getConstraintList", 
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
this.appendLogData (JU.PT.sprintf ("%3d %3d  %-5s %-5s  %12.6f", "ssFI",  Clazz_newArray (-1, [this.minAtoms[this.ia].atom.getAtomName (), this.minAtoms[this.ib].atom.getAtomName (),  Clazz_newFloatArray (-1, [targetValue]),  Clazz_newIntArray (-1, [this.minAtoms[this.ia].atom.getAtomNumber (), this.minAtoms[this.ib].atom.getAtomNumber ()])])));
break;
case 1:
this.appendLogData (JU.PT.sprintf ("%3d %3d %3d  %-5s %-5s %-5s  %12.6f", "sssFI",  Clazz_newArray (-1, [this.minAtoms[this.ia].atom.getAtomName (), this.minAtoms[this.ib].atom.getAtomName (), this.minAtoms[this.ic].atom.getAtomName (),  Clazz_newFloatArray (-1, [targetValue]),  Clazz_newIntArray (-1, [this.minAtoms[this.ia].atom.getAtomNumber (), this.minAtoms[this.ib].atom.getAtomNumber (), this.minAtoms[this.ic].atom.getAtomNumber ()])])));
break;
case 2:
this.appendLogData (JU.PT.sprintf ("%3d %3d %3d %3d  %-5s %-5s %-5s %-5s  %3d %8.3f     %8.3f     %8.3f     %8.3f", "ssssFI",  Clazz_newArray (-1, [this.minAtoms[this.ia].atom.getAtomName (), this.minAtoms[this.ib].atom.getAtomName (), this.minAtoms[this.ic].atom.getAtomName (), this.minAtoms[this.id].atom.getAtomName (),  Clazz_newFloatArray (-1, [targetValue]),  Clazz_newIntArray (-1, [this.minAtoms[this.ia].atom.getAtomNumber (), this.minAtoms[this.ib].atom.getAtomNumber (), this.minAtoms[this.ic].atom.getAtomNumber (), this.minAtoms[this.id].atom.getAtomNumber ()])])));
break;
}
}
}
this.appendLogData ("---------------------\n");
});
Clazz_defineMethod (c$, "getAtomList", 
function (title) {
var trailer = "--------------------------------------------------------------------------------------------------\n";
var sb =  new JU.SB ();
sb.append ("\n" + title + "\n\n" + " ATOM    X        Y        Z    TYPE       GRADX    GRADY    GRADZ  " + "---------BONDED ATOMS--------\n" + trailer);
for (var i = 0; i < this.ac; i++) {
var atom = this.minAtoms[i];
var others = atom.getBondedAtomIndexes ();
var iVal =  Clazz_newIntArray (others.length + 2, 0);
iVal[0] = atom.atom.getAtomNumber ();
iVal[1] = (atom.ffAtomType == null ? 0 : atom.ffAtomType.mmType);
var s = "   ";
for (var j = 0; j < others.length; j++) {
s += " %3d";
iVal[j + 2] = this.minAtoms[others[j]].atom.getAtomNumber ();
}
sb.append (JU.PT.sprintf ("%3d %8.3f %8.3f %8.3f %-5s %2d %8.3f %8.3f %8.3f" + s + "\n", "sFI",  Clazz_newArray (-1, [atom.sType,  Clazz_newFloatArray (-1, [atom.coord[0], atom.coord[1], atom.coord[2], atom.force[0], atom.force[1], atom.force[2]]), iVal])));
}
sb.append (trailer + "\n\n");
return sb.toString ();
}, "~S");
Clazz_defineMethod (c$, "getDebugHeader2", 
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
Clazz_defineMethod (c$, "getDebugLine", 
function (iType, c) {
return this.getDebugLineC (iType, c);
}, "~N,JM.FF.Calculation");
Clazz_defineMethod (c$, "getDebugLineC", 
function (iType, c) {
var energy = this.ff.toUserUnits (c.energy);
switch (iType) {
case 0:
return JU.PT.sprintf ("%3d %3d  %-5s %-5s  %4.2f%8.3f   %8.3f     %8.3f   %8.3f   %8.3f", "ssFI",  Clazz_newArray (-1, [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType,  Clazz_newFloatArray (-1, [0, c.rab, c.dData[1], c.dData[0], c.delta, energy]),  Clazz_newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber ()])]));
case 1:
case 3:
return JU.PT.sprintf ("%3d %3d %3d  %-5s %-5s %-5s  %8.3f  %8.3f     %8.3f   %8.3f", "sssFI",  Clazz_newArray (-1, [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType,  Clazz_newFloatArray (-1, [(c.theta * 57.29577951308232), c.dData[1], c.dData[0], energy]),  Clazz_newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber ()])]));
case 2:
return JU.PT.sprintf ("%3d %3d %3d %3d  %-5s %-5s %-5s %-5s  %3d %8.3f     %8.3f     %8.3f     %8.3f", "ssssFI",  Clazz_newArray (-1, [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, this.minAtoms[c.id].sType,  Clazz_newFloatArray (-1, [c.dData[1], c.dData[0], (c.theta * 57.29577951308232), energy]),  Clazz_newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber (), this.minAtoms[c.id].atom.getAtomNumber (), c.iData[4]])]));
case 4:
return JU.PT.sprintf ("%3d %3d %3d %3d  %-5s %-5s %-5s %-5s  %8.3f   %8.3f     %8.3f", "ssssFI",  Clazz_newArray (-1, [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, this.minAtoms[c.id].sType,  Clazz_newFloatArray (-1, [(c.theta * 57.29577951308232), c.dData[0], energy]),  Clazz_newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber (), this.minAtoms[c.id].atom.getAtomNumber ()])]));
case 5:
return JU.PT.sprintf ("%3d %3d  %-5s %-5s %6.3f  %8.3f  %8.3f", "ssFI",  Clazz_newArray (-1, [this.minAtoms[c.iData[0]].sType, this.minAtoms[c.iData[1]].sType,  Clazz_newFloatArray (-1, [c.rab, c.dData[0], energy]),  Clazz_newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber ()])]));
case 6:
return JU.PT.sprintf ("%3d %3d  %-5s %-5s %6.3f  %8.3f  %8.3f  %8.3f  %8.3f", "ssFI",  Clazz_newArray (-1, [this.minAtoms[c.iData[0]].sType, this.minAtoms[c.iData[1]].sType,  Clazz_newFloatArray (-1, [c.rab, c.dData[0], c.dData[1], c.dData[2], energy]),  Clazz_newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber ()])]));
}
return "";
}, "~N,JM.FF.Calculation");
Clazz_defineMethod (c$, "getDebugFooter", 
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
return JU.PT.sprintf ("\n     TOTAL %s ENERGY = %8.3f %s/mol\n", "sfs",  Clazz_newArray (-1, [s, Float.$valueOf (this.ff.toUserUnits (energy)), this.ff.minimizer.units]));
}, "~N,~N");
Clazz_defineMethod (c$, "setPairVariables", 
function (c) {
if (this.gradients) {
this.setCoords (c, 2);
c.rab = JM.Util.restorativeForceAndDistance (this.da, this.db, this.dc);
} else {
c.rab = Math.sqrt (JM.Util.distance2 (this.minAtoms[c.ia].coord, this.minAtoms[c.ib].coord));
}if (JM.Util.isNearZero2 (c.rab, 1.0e-3)) c.rab = 1.0e-3;
}, "JM.FF.Calculation");
Clazz_defineMethod (c$, "setAngleVariables", 
function (c) {
if (this.gradients) {
this.setCoords (c, 3);
c.theta = JM.Util.restorativeForceAndAngleRadians (this.da, this.db, this.dc);
} else {
c.theta = JM.Util.getAngleRadiansABC (this.minAtoms[c.ia].coord, this.minAtoms[c.ib].coord, this.minAtoms[c.ic].coord);
}if (!JM.Util.isFinite (c.theta)) c.theta = 0.0;
}, "JM.FF.Calculation");
Clazz_defineMethod (c$, "setOopVariables", 
function (c, fixTheta) {
this.setCoords (c, 4);
if (this.gradients) {
c.theta = JM.Util.restorativeForceAndOutOfPlaneAngleRadians (this.da, this.db, this.dc, this.dd, this.v1, this.v2, this.v3);
} else {
c.theta = JM.Util.pointPlaneAngleRadians (this.da, this.db, this.dc, this.dd, this.v1, this.v2, this.v3, fixTheta);
}if (!JM.Util.isFinite (c.theta)) c.theta = 0.0;
}, "JM.FF.Calculation,~B");
Clazz_defineMethod (c$, "setTorsionVariables", 
function (c) {
if (this.gradients) {
this.setCoords (c, 4);
c.theta = JM.Util.restorativeForceAndTorsionAngleRadians (this.da, this.db, this.dc, this.dd);
if (!JM.Util.isFinite (c.theta)) c.theta = 1.7453292519943296E-5;
} else {
c.theta = JM.Util.getTorsionAngleRadians (this.minAtoms[c.ia].coord, this.minAtoms[c.ib].coord, this.minAtoms[c.ic].coord, this.minAtoms[c.id].coord, this.v1, this.v2, this.v3);
}}, "JM.FF.Calculation");
Clazz_defineMethod (c$, "setCoords", 
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
Clazz_defineMethod (c$, "addForces", 
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
Clazz_defineMethod (c$, "isLinear", 
function (i) {
return false;
}, "~N");
Clazz_defineStatics (c$,
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
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculations"], "JM.FF.CalculationsMMFF", ["JU.Lst", "$.PT", "JM.MinAtom", "$.MinObject", "JM.FF.MMFFAngleCalc", "$.MMFFDistanceCalc", "$.MMFFESCalc", "$.MMFFOOPCalc", "$.MMFFSBCalc", "$.MMFFTorsionCalc", "$.MMFFVDWCalc"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bondCalc = null;
this.angleCalc = null;
this.torsionCalc = null;
this.oopCalc = null;
this.vdwCalc = null;
this.esCalc = null;
this.sbCalc = null;
this.mmff = null;
Clazz_instantialize (this, arguments);
}, JM.FF, "CalculationsMMFF", JM.FF.Calculations);
Clazz_makeConstructor (c$, 
function (ff, ffParams, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints) {
Clazz_superConstructor (this, JM.FF.CalculationsMMFF, [ff, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints]);
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
Clazz_overrideMethod (c$, "getUnits", 
function () {
return "kcal";
});
Clazz_overrideMethod (c$, "setupCalculations", 
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
Clazz_overrideMethod (c$, "isLinear", 
function (i) {
return JM.MinAtom.isLinear (this.minAtoms[i]);
}, "~N");
c$.isInvertible = Clazz_defineMethod (c$, "isInvertible", 
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
Clazz_overrideMethod (c$, "compute", 
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
Clazz_overrideMethod (c$, "getParameterObj", 
function (a) {
return (a.key == null || a.ddata != null ? a.ddata : this.ffParams.get (a.key));
}, "JM.MinObject");
Clazz_overrideMethod (c$, "getDebugHeader", 
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
Clazz_overrideMethod (c$, "getDebugLine", 
function (iType, c) {
var energy = this.ff.toUserUnits (c.energy);
switch (iType) {
case 1:
case 3:
return JU.PT.sprintf ("%11s  %-5s %-5s %-5s  %8.3f  %8.3f     %8.3f   %8.3f", "ssssFI",  Clazz_newArray (-1, [JM.MinObject.decodeKey (c.key), this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType,  Clazz_newFloatArray (-1, [(c.theta * 57.29577951308232), c.dData[1], c.dData[0], energy]),  Clazz_newIntArray (-1, [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber ()])]));
case 2:
return JU.PT.sprintf ("%15s  %-5s %-5s %-5s %-5s  %8.3f %8.3f %8.3f %8.3f %8.3f", "sssssF",  Clazz_newArray (-1, [JM.MinObject.decodeKey (c.key), this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, this.minAtoms[c.id].sType,  Clazz_newFloatArray (-1, [(c.theta * 57.29577951308232), c.dData[0], c.dData[1], c.dData[2], energy])]));
default:
return this.getDebugLineC (iType, c);
}
}, "~N,JM.FF.Calculation");
Clazz_defineStatics (c$,
"FPAR", 143.9325,
"DA_D", 'D',
"DA_DA", 133);
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculations"], "JM.FF.CalculationsUFF", ["JU.Lst", "JM.FF.UFFAngleCalc", "$.UFFDistanceCalc", "$.UFFOOPCalc", "$.UFFTorsionCalc", "$.UFFVDWCalc"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bondCalc = null;
this.angleCalc = null;
this.torsionCalc = null;
this.oopCalc = null;
this.vdwCalc = null;
Clazz_instantialize (this, arguments);
}, JM.FF, "CalculationsUFF", JM.FF.Calculations);
Clazz_makeConstructor (c$, 
function (ff, ffParams, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints) {
Clazz_superConstructor (this, JM.FF.CalculationsUFF, [ff, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints]);
this.ffParams = ffParams;
this.bondCalc =  new JM.FF.UFFDistanceCalc ().set (this);
this.angleCalc =  new JM.FF.UFFAngleCalc ().set (this);
this.torsionCalc =  new JM.FF.UFFTorsionCalc ().set (this);
this.oopCalc =  new JM.FF.UFFOOPCalc ().set (this);
this.vdwCalc =  new JM.FF.UFFVDWCalc ().set (this);
}, "JM.FF.ForceField,java.util.Map,~A,~A,~A,~A,~A,JU.Lst");
Clazz_overrideMethod (c$, "getUnits", 
function () {
return "kJ";
});
Clazz_overrideMethod (c$, "setupCalculations", 
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
c$.isInvertible = Clazz_defineMethod (c$, "isInvertible", 
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
c$.calculateR0 = Clazz_defineMethod (c$, "calculateR0", 
function (ri, rj, chiI, chiJ, bondorder) {
var rbo = -0.1332 * (ri + rj) * Math.log (bondorder);
var dchi = Math.sqrt (chiI) - Math.sqrt (chiJ);
var ren = ri * rj * dchi * dchi / (chiI * ri + chiJ * rj);
return (ri + rj + rbo - ren);
}, "~N,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "compute", 
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
Clazz_overrideMethod (c$, "getDebugHeader", 
function (iType) {
switch (iType) {
case -1:
return "Universal Force Field -- Rappe, A. K., et. al.; J. Am. Chem. Soc. (1992) 114(25) p. 10024-10035\n";
default:
return this.getDebugHeader2 (iType);
}
}, "~N");
Clazz_overrideMethod (c$, "getParameterObj", 
function (o) {
return null;
}, "JM.MinObject");
Clazz_defineStatics (c$,
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
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.MMFFAngleCalc", null, function () {
c$ = Clazz_declareType (JM.FF, "MMFFAngleCalc", JM.FF.Calculation);
Clazz_defineMethod (c$, "setData", 
function (calc, angle) {
var data = this.calcs.getParameterObj (angle);
if (data == null) return;
calc.addLast ( Clazz_newArray (-1, [angle.data, data, angle.key]));
}, "JU.Lst,JM.MinAngle");
Clazz_overrideMethod (c$, "compute", 
function (dataIn) {
this.key = dataIn[2];
this.getPointers (dataIn);
var ka = this.dData[0];
var t0 = this.dData[1];
this.calcs.setAngleVariables (this);
var dt = (this.theta * 57.29577951308232 - t0);
if (t0 == 180) {
this.energy = 143.9325 * ka * (1 + Math.cos (this.theta));
if (this.calcs.gradients) this.dE = -143.9325 * ka * Math.sin (this.theta);
} else {
this.energy = 0.021922 * ka * Math.pow (dt, 2) * (1 + -0.006981317007977318 * dt);
if (this.calcs.gradients) this.dE = 0.021922 * ka * dt * (2 + 3 * -0.006981317007977318 * dt);
}if (this.calcs.gradients) this.calcs.addForces (this, 3);
if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (1, this));
return this.energy;
}, "~A");
Clazz_defineStatics (c$,
"CB", -0.006981317007977318);
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.MMFFDistanceCalc", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.r0 = 0;
this.kb = 0;
this.delta2 = 0;
Clazz_instantialize (this, arguments);
}, JM.FF, "MMFFDistanceCalc", JM.FF.Calculation);
Clazz_defineMethod (c$, "setData", 
function (calc, bond) {
this.ia = bond.data[0];
this.ib = bond.data[1];
var data = this.calcs.getParameterObj (bond);
if (data == null) return;
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [this.ia, this.ib]), data]));
}, "JU.Lst,JM.MinBond");
Clazz_overrideMethod (c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
this.kb = this.dData[0];
this.r0 = this.dData[1];
this.calcs.setPairVariables (this);
this.delta = this.rab - this.r0;
this.delta2 = this.delta * this.delta;
this.energy = 71.96625 * this.kb * this.delta2 * (1 + -2.0 * this.delta + 2.3333333333333335 * (this.delta2));
if (this.calcs.gradients) {
this.dE = 71.96625 * this.kb * this.delta * (2 + 3 * -2.0 * this.delta + 4 * 2.3333333333333335 * this.delta2);
this.calcs.addForces (this, 2);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (0, this));
return this.energy;
}, "~A");
Clazz_defineStatics (c$,
"FSTRETCH", 71.96625,
"CS", -2.0,
"CS2", (2.3333333333333335));
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.MMFFESCalc", null, function () {
c$ = Clazz_declareType (JM.FF, "MMFFESCalc", JM.FF.Calculation);
Clazz_overrideMethod (c$, "setData", 
function (calc, ia, ib, d) {
if (this.calcs.minAtoms[ia].partialCharge == 0 || this.calcs.minAtoms[ib].partialCharge == 0) return;
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [ia, ib]),  Clazz_newDoubleArray (-1, [this.calcs.minAtoms[ia].partialCharge, this.calcs.minAtoms[ib].partialCharge, (this.calcs.minAtoms[ia].bs14.get (ib) ? 249.0537 : 332.0716)])]));
}, "JU.Lst,~N,~N,~N");
Clazz_overrideMethod (c$, "compute", 
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
Clazz_defineStatics (c$,
"BUFF", 0.05);
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.MMFFOOPCalc", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.list = null;
Clazz_instantialize (this, arguments);
}, JM.FF, "MMFFOOPCalc", JM.FF.Calculation);
Clazz_prepareFields (c$, function () {
this.list =  Clazz_newIntArray (4, 0);
});
Clazz_defineMethod (c$, "setData", 
function (calc, i) {
if (this.calcs.minAtoms[i].nBonds != 3) return;
var indices = this.calcs.minAtoms[i].getBondedAtomIndexes ();
this.list[0] = indices[2];
this.list[1] = i;
this.list[2] = indices[1];
this.list[3] = indices[0];
var koop = (this.calcs).mmff.getOutOfPlaneParameter (this.list);
if (koop == 0) return;
var dk =  Clazz_newDoubleArray (-1, [koop]);
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [indices[0], i, indices[1], indices[2]]), dk]));
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [indices[1], i, indices[2], indices[0]]), dk]));
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [indices[2], i, indices[0], indices[1]]), dk]));
}, "JU.Lst,~N");
Clazz_overrideMethod (c$, "compute", 
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
Clazz_defineStatics (c$,
"FOOPD", 2.5120761569715815,
"FOOP", 71.96568080495746);
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.MMFFSBCalc", null, function () {
c$ = Clazz_declareType (JM.FF, "MMFFSBCalc", JM.FF.Calculation);
Clazz_defineMethod (c$, "setData", 
function (calc, angle) {
if (this.calcs.isLinear (angle.data[1])) return;
var data = this.calcs.getParameter (angle.sbKey);
var datakat0 = this.calcs.getParameterObj (angle);
var dataij = this.calcs.getParameter (this.calcs.minBonds[angle.data[3]]);
var datajk = this.calcs.getParameter (this.calcs.minBonds[angle.data[4]]);
if (data == null || datakat0 == null || dataij == null || datajk == null) return;
var theta0 = datakat0[1];
var r0ij = dataij[1];
var r0jk = datajk[1];
calc.addLast ( Clazz_newArray (-1, [angle.data,  Clazz_newDoubleArray (-1, [data[0], theta0, r0ij]), angle.sbKey]));
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [angle.data[2], angle.data[1], angle.data[0]]),  Clazz_newDoubleArray (-1, [data[1], theta0, r0jk]), angle.sbKey]));
}, "JU.Lst,JM.MinAngle");
Clazz_overrideMethod (c$, "compute", 
function (dataIn) {
this.key = dataIn[2];
this.getPointers (dataIn);
var k = 2.51210 * this.dData[0];
var t0 = this.dData[1];
var r0_ab = this.dData[2];
this.calcs.setPairVariables (this);
this.calcs.setAngleVariables (this);
var dr_ab = this.rab - r0_ab;
this.delta = this.theta * 57.29577951308232 - t0;
this.energy = k * dr_ab * this.delta;
if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (3, this));
if (this.calcs.gradients) {
this.dE = k * dr_ab;
this.calcs.addForces (this, 3);
this.calcs.setPairVariables (this);
this.dE = k * this.delta;
this.calcs.addForces (this, 2);
}return this.energy;
}, "~A");
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.MMFFTorsionCalc", null, function () {
c$ = Clazz_declareType (JM.FF, "MMFFTorsionCalc", JM.FF.Calculation);
Clazz_defineMethod (c$, "setData", 
function (calc, t) {
if (this.calcs.isLinear (t.data[1]) || this.calcs.isLinear (t.data[2])) return;
var data = this.calcs.getParameterObj (t);
if (data == null) return;
calc.addLast ( Clazz_newArray (-1, [t.data, data, t.key]));
}, "JU.Lst,JM.MinTorsion");
Clazz_overrideMethod (c$, "compute", 
function (dataIn) {
this.key = dataIn[2];
this.getPointers (dataIn);
var v1 = this.dData[0];
var v2 = this.dData[1];
var v3 = this.dData[2];
this.calcs.setTorsionVariables (this);
var cosTheta = Math.cos (this.theta);
var cosTheta2 = cosTheta * cosTheta;
this.energy = 0.5 * (v1 * (1 + cosTheta) + v2 * (2 - 2 * cosTheta2) + v3 * (1 + cosTheta * (4 * cosTheta2 - 3)));
if (this.calcs.gradients) {
var sinTheta = Math.sin (this.theta);
this.dE = 0.5 * (-v1 * sinTheta + 4 * v2 * sinTheta * cosTheta + 3 * v3 * sinTheta * (1 - 4 * cosTheta2));
this.calcs.addForces (this, 4);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (2, this));
return this.energy;
}, "~A");
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.MMFFVDWCalc", null, function () {
c$ = Clazz_declareType (JM.FF, "MMFFVDWCalc", JM.FF.Calculation);
Clazz_overrideMethod (c$, "setData", 
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
var DA_a = Clazz_doubleToInt (dataA[4]);
var alpha_b = dataB[0];
var N_b = dataB[1];
var A_b = dataB[2];
var G_b = dataB[3];
var DA_b = Clazz_doubleToInt (dataB[4]);
var rs_aa = A_a * Math.pow (alpha_a, 0.25);
var rs_bb = A_b * Math.pow (alpha_b, 0.25);
var gamma = (rs_aa - rs_bb) / (rs_aa + rs_bb);
var rs = 0.5 * (rs_aa + rs_bb);
if (DA_a != 68 && DA_b != 68) rs *= (1.0 + 0.2 * (1.0 - Math.exp (-12.0 * gamma * gamma)));
var eps = ((181.16 * G_a * G_b * alpha_a * alpha_b) / (Math.sqrt (alpha_a / N_a) + Math.sqrt (alpha_b / N_b))) * Math.pow (rs, -6.0);
if (DA_a + DA_b == 133) {
rs *= 0.8;
eps *= 0.5;
}calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [ia, ib]),  Clazz_newDoubleArray (-1, [rs, eps])]));
}, "JU.Lst,~N,~N,~N");
Clazz_overrideMethod (c$, "compute", 
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
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.UFFAngleCalc", ["JM.FF.CalculationsUFF"], function () {
c$ = Clazz_declareType (JM.FF, "UFFAngleCalc", JM.FF.Calculation);
Clazz_defineMethod (c$, "setData", 
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
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [this.ia, this.ib, this.ic, coordination]),  Clazz_newDoubleArray (-1, [ka, theta0 * 57.29577951308232, c0 - c2, c1, 2 * c2, preliminaryMagnification * ka])]));
}, "JU.Lst,~A");
Clazz_overrideMethod (c$, "compute", 
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
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.UFFDistanceCalc", ["JM.FF.CalculationsUFF"], function () {
c$ = Clazz_decorateAsClass (function () {
this.r0 = 0;
this.kb = 0;
Clazz_instantialize (this, arguments);
}, JM.FF, "UFFDistanceCalc", JM.FF.Calculation);
Clazz_overrideMethod (c$, "setData", 
function (calc, ia, ib, bondOrder) {
this.calcs.parA = this.calcs.getParameter (this.calcs.minAtoms[ia].sType);
this.calcs.parB = this.calcs.getParameter (this.calcs.minAtoms[ib].sType);
this.r0 = JM.FF.CalculationsUFF.calculateR0 (this.calcs.parA.dVal[0], this.calcs.parB.dVal[0], this.calcs.parA.dVal[8], this.calcs.parB.dVal[8], bondOrder);
this.kb = 1390.2842991599998 * this.calcs.parA.dVal[5] * this.calcs.parB.dVal[5] / (this.r0 * this.r0 * this.r0);
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [ia, ib]),  Clazz_newDoubleArray (-1, [this.r0, this.kb, bondOrder])]));
}, "JU.Lst,~N,~N,~N");
Clazz_overrideMethod (c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
this.r0 = this.dData[0];
this.kb = this.dData[1];
this.calcs.setPairVariables (this);
this.delta = this.rab - this.r0;
this.energy = this.kb * this.delta * this.delta;
if (this.calcs.gradients) {
this.dE = 2.0 * this.kb * this.delta;
this.calcs.addForces (this, 2);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (0, this));
return this.energy;
}, "~A");
});
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.UFFOOPCalc", null, function () {
c$ = Clazz_declareType (JM.FF, "UFFOOPCalc", JM.FF.Calculation);
Clazz_overrideMethod (c$, "setData", 
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
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [this.ia, ib, this.ic, this.id]),  Clazz_newDoubleArray (-1, [koop, a0, a1, a2, koop * 10])]));
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [this.ic, ib, this.id, this.ia]),  Clazz_newDoubleArray (-1, [koop, a0, a1, a2, koop * 10])]));
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [this.id, ib, this.ia, this.ic]),  Clazz_newDoubleArray (-1, [koop, a0, a1, a2, koop * 10])]));
}, "JU.Lst,~N,~N,~N");
Clazz_overrideMethod (c$, "compute", 
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
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.UFFTorsionCalc", ["JM.Util"], function () {
c$ = Clazz_declareType (JM.FF, "UFFTorsionCalc", JM.FF.Calculation);
Clazz_defineMethod (c$, "setData", 
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
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [this.ia, this.ib, this.ic, this.id, n]),  Clazz_newDoubleArray (-1, [V, cosNPhi0])]));
}, "JU.Lst,~A");
Clazz_overrideMethod (c$, "compute", 
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
Clazz_declarePackage ("JM.FF");
Clazz_load (["JM.FF.Calculation"], "JM.FF.UFFVDWCalc", null, function () {
c$ = Clazz_declareType (JM.FF, "UFFVDWCalc", JM.FF.Calculation);
Clazz_overrideMethod (c$, "setData", 
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
calc.addLast ( Clazz_newArray (-1, [ Clazz_newIntArray (-1, [ia, ib]),  Clazz_newDoubleArray (-1, [Xab, Dab])]));
}, "JU.Lst,~N,~N,~N");
Clazz_overrideMethod (c$, "compute", 
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
Clazz_declarePackage ("JM.FF");
c$ = Clazz_decorateAsClass (function () {
this.iVal = null;
this.dVal = null;
this.sVal = null;
Clazz_instantialize (this, arguments);
}, JM.FF, "FFParam");
Clazz_declarePackage ("JM");
Clazz_load (["J.thread.JmolThread"], "JM.MinimizationThread", ["JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.minimizer = null;
Clazz_instantialize (this, arguments);
}, JM, "MinimizationThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JM.MinimizationThread, []);
});
Clazz_overrideMethod (c$, "setManager", 
function (manager, vwr, options) {
this.minimizer = manager;
this.setViewer (vwr, "MinimizationThread");
return 0;
}, "~O,JV.Viewer,~O");
Clazz_overrideMethod (c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
this.lastRepaintTime = this.startTime;
this.haveReference = true;
if (!this.minimizer.startMinimization ()) return;
this.vwr.startHoverWatcher (false);
mode = 0;
break;
case 0:
if (!this.minimizer.minimizationOn () || this.checkInterrupted (this.minimizer.getThread ())) {
mode = -2;
break;
}this.currentTime = System.currentTimeMillis ();
var elapsed = (this.currentTime - this.lastRepaintTime);
var sleepTime = 33 - elapsed;
if (!this.runSleep (sleepTime, 1)) return;
mode = 1;
break;
case 1:
this.lastRepaintTime = this.currentTime = System.currentTimeMillis ();
mode = (this.minimizer.stepMinimization () ? 0 : -2);
break;
case -2:
this.minimizer.endMinimization ();
this.vwr.startHoverWatcher (true);
return;
}

}, "~N");
Clazz_overrideMethod (c$, "oops", 
function (e) {
if (this.minimizer.minimizationOn ()) JU.Logger.error (e.toString ());
}, "Exception");
});
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
