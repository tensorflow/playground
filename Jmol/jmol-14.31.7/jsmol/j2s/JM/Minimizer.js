Clazz.declarePackage ("JM");
Clazz.load (null, "JM.Minimizer", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "J.i18n.GT", "JM.MMConstraint", "$.MinAngle", "$.MinAtom", "$.MinBond", "$.MinTorsion", "$.MinimizationThread", "JM.FF.ForceFieldMMFF", "$.ForceFieldUFF", "JU.BSUtil", "$.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
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
Clazz.instantialize (this, arguments);
}, JM, "Minimizer");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setProperty", 
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
Clazz.defineMethod (c$, "getProperty", 
function (propertyName, param) {
if (propertyName.equals ("log")) {
return (this.pFF == null ? "" : this.pFF.getLogData ());
}return null;
}, "~S,~N");
Clazz.defineMethod (c$, "addConstraint", 
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
Clazz.defineMethod (c$, "clear", 
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
Clazz.defineMethod (c$, "minimize", 
function (steps, crit, bsSelected, bsFixed, haveFixed, forceSilent, ff) {
this.isSilent = (forceSilent || this.vwr.getBooleanProperty ("minimizationSilent"));
var val;
this.setEnergyUnits ();
if (steps == 2147483647) {
val = this.vwr.getP ("minimizationSteps");
if (val != null && Clazz.instanceOf (val, Integer)) steps = (val).intValue ();
}this.steps = steps;
if (!haveFixed && this.bsFixedDefault != null) bsFixed.and (this.bsFixedDefault);
if (crit <= 0) {
val = this.vwr.getP ("minimizationCriterion");
if (val != null && Clazz.instanceOf (val, Float)) crit = (val).floatValue ();
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
Clazz.defineMethod (c$, "setEnergyUnits", 
 function () {
var s = this.vwr.g.energyUnits;
this.units = (s.equalsIgnoreCase ("kcal") ? "kcal" : "kJ");
});
Clazz.defineMethod (c$, "setupMinimization", 
 function () {
this.coordSaved = null;
this.atomMap =  Clazz.newIntArray (this.atoms.length, 0);
this.minAtoms =  new Array (this.ac);
this.elemnoMax = 0;
var bsElements =  new JU.BS ();
for (var i = this.bsAtoms.nextSetBit (0), pt = 0; i >= 0; i = this.bsAtoms.nextSetBit (i + 1), pt++) {
var atom = this.atoms[i];
this.atomMap[i] = pt;
var atomicNo = this.atoms[i].getElementNumber ();
this.elemnoMax = Math.max (this.elemnoMax, atomicNo);
bsElements.set (atomicNo);
this.minAtoms[pt] =  new JM.MinAtom (pt, atom,  Clazz.newDoubleArray (-1, [atom.x, atom.y, atom.z]), this.ac);
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
Clazz.defineMethod (c$, "setModel", 
 function (bsElements) {
if (!this.pFF.setModel (bsElements, this.elemnoMax)) {
JU.Logger.error (J.i18n.GT.o (J.i18n.GT.$ ("could not setup force field {0}"), this.ff));
if (this.ff.equals ("MMFF")) {
this.getForceField ("UFF");
return this.setModel (bsElements);
}return false;
}return true;
}, "JU.BS");
Clazz.defineMethod (c$, "setAtomPositions", 
 function () {
for (var i = 0; i < this.ac; i++) this.minAtoms[i].set ();

this.bsMinFixed = null;
if (this.bsFixed != null) {
this.bsMinFixed =  new JU.BS ();
for (var i = this.bsAtoms.nextSetBit (0), pt = 0; i >= 0; i = this.bsAtoms.nextSetBit (i + 1), pt++) if (this.bsFixed.get (i)) this.bsMinFixed.set (pt);

}});
Clazz.defineMethod (c$, "getBonds", 
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
Clazz.defineMethod (c$, "getAngles", 
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
vAngles.addLast ( new JM.MinAngle ( Clazz.newIntArray (-1, [ia, ib, ic, i, this.minAtoms[ib].getBondIndex (j)])));
this.minAtoms[ia].bsVdw.clear (ic);
}
}if (this.minAtoms[ia].nBonds > 1) {
atomList = this.minAtoms[ia].getBondedAtomIndexes ();
for (var j = atomList.length; --j >= 0; ) if ((ic = atomList[j]) < ib && ic > ia) {
vAngles.addLast ( new JM.MinAngle ( Clazz.newIntArray (-1, [ic, ia, ib, this.minAtoms[ia].getBondIndex (j), i])));
this.minAtoms[ic].bsVdw.clear (ib);
}
}}
this.minAngles = vAngles.toArray ( new Array (vAngles.size ()));
JU.Logger.info (this.minAngles.length + " angles");
});
Clazz.defineMethod (c$, "getTorsions", 
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
vTorsions.addLast ( new JM.MinTorsion ( Clazz.newIntArray (-1, [ia, ib, ic, id, angle[3], angle[4], this.minAtoms[ic].getBondIndex (j)])));
this.minAtoms[Math.min (ia, id)].bs14.set (Math.max (ia, id));
}}
}if (ia > ib && this.minAtoms[ia].nBonds != 1) {
atomList = this.minAtoms[ia].getBondedAtomIndexes ();
for (var j = 0; j < atomList.length; j++) {
id = atomList[j];
if (id != ic && id != ib) {
vTorsions.addLast ( new JM.MinTorsion ( Clazz.newIntArray (-1, [ic, ib, ia, id, angle[4], angle[3], this.minAtoms[ia].getBondIndex (j)])));
this.minAtoms[Math.min (ic, id)].bs14.set (Math.max (ic, id));
}}
}}
this.minTorsions = vTorsions.toArray ( new Array (vTorsions.size ()));
JU.Logger.info (this.minTorsions.length + " torsions");
});
Clazz.defineMethod (c$, "getForceField", 
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
Clazz.defineMethod (c$, "minimizationOn", 
function () {
return this.$minimizationOn;
});
Clazz.defineMethod (c$, "getThread", 
function () {
return this.minimizationThread;
});
Clazz.defineMethod (c$, "setMinimizationOn", 
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
Clazz.defineMethod (c$, "getEnergyOnly", 
 function () {
if (this.pFF == null || this.vwr == null) return;
this.pFF.steepestDescentInitialize (this.steps, this.crit);
this.vwr.setFloatProperty ("_minimizationEnergyDiff", 0);
this.reportEnergy ();
this.vwr.setStringProperty ("_minimizationStatus", "calculate");
this.vwr.notifyMinimizationStatus ();
});
Clazz.defineMethod (c$, "reportEnergy", 
 function () {
this.vwr.setFloatProperty ("_minimizationEnergy", this.pFF.toUserUnits (this.pFF.getEnergy ()));
});
Clazz.defineMethod (c$, "startMinimization", 
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
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("minimization error vwr=" + this.vwr + " pFF = " + this.pFF);
return false;
} else {
throw e;
}
}
this.$minimizationOn = true;
return true;
});
Clazz.defineMethod (c$, "stepMinimization", 
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
Clazz.defineMethod (c$, "endMinimization", 
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
Clazz.defineMethod (c$, "saveCoordinates", 
 function () {
if (this.coordSaved == null) this.coordSaved =  Clazz.newDoubleArray (this.ac, 3, 0);
for (var i = 0; i < this.ac; i++) for (var j = 0; j < 3; j++) this.coordSaved[i][j] = this.minAtoms[i].coord[j];


});
Clazz.defineMethod (c$, "restoreCoordinates", 
 function () {
if (this.coordSaved == null) return;
for (var i = 0; i < this.ac; i++) for (var j = 0; j < 3; j++) this.minAtoms[i].coord[j] = this.coordSaved[i][j];


this.updateAtomXYZ ();
});
Clazz.defineMethod (c$, "stopMinimization", 
function (coordAreOK) {
if (!this.$minimizationOn) return;
this.setMinimizationOn (false);
if (coordAreOK) this.endMinimization ();
 else this.restoreCoordinates ();
}, "~B");
Clazz.defineMethod (c$, "updateAtomXYZ", 
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
Clazz.defineMethod (c$, "minimizeWithoutThread", 
 function () {
if (!this.startMinimization ()) return;
while (this.stepMinimization ()) {
}
this.endMinimization ();
});
Clazz.defineMethod (c$, "report", 
function (msg, isEcho) {
if (this.isSilent) JU.Logger.info (msg);
 else if (isEcho) this.vwr.showString (msg, false);
 else this.vwr.scriptEcho (msg);
}, "~S,~B");
Clazz.defineMethod (c$, "calculatePartialCharges", 
function (ms, bsAtoms, bsReport) {
var ff =  new JM.FF.ForceFieldMMFF (this);
ff.setArrays (ms.at, bsAtoms, ms.bo, ms.bondCount, true, true);
this.vwr.setAtomProperty (bsAtoms, 1086326785, 0, 0, null, null, ff.getAtomTypeDescriptions ());
this.vwr.setAtomProperty (bsReport == null ? bsAtoms : bsReport, 1111492619, 0, 0, null, ff.getPartialCharges (), null);
}, "JM.ModelSet,JU.BS,JU.BS");
});
