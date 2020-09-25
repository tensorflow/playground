Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.MoldenReader"], "J.adapter.readers.quantum.QCJSONReader", ["java.lang.Double", "$.Float", "java.util.Arrays", "$.Hashtable", "JU.AU", "$.Lst", "$.SB", "J.adapter.readers.quantum.BasisFunctionReader", "J.api.JmolAdapter", "JU.Logger", "org.qcschema.QCSchemaUnits"], function () {
c$ = Clazz.decorateAsClass (function () {
this.job = null;
this.jobCount = 0;
this.modelCount = 0;
this.$haveEnergy = true;
this.lastBasisID = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "QCJSONReader", J.adapter.readers.quantum.MoldenReader);
Clazz.defineMethod (c$, "initializeReader", 
function () {
Clazz.superCall (this, J.adapter.readers.quantum.QCJSONReader, "initializeReader", []);
var sb =  new JU.SB ();
try {
while (this.rd () != null) sb.append (this.line);

var json = this.vwr.parseJSONArray (sb.toString ());
JU.Logger.info (json.get (0).toString ());
this.jobCount = json.size () - 2;
for (var i = 0; i < this.jobCount; i++) this.processJob (json.get (i + 2));

} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.continuing = false;
});
Clazz.defineMethod (c$, "processJob", 
 function (job) {
this.job = job;
this.readSteps ();
}, "java.util.Map");
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.finalizeReaderASCR ();
});
Clazz.defineMethod (c$, "readSteps", 
 function () {
var steps = org.qcschema.QCSchemaUnits.getList (this.job, "steps");
var nSteps = steps.size ();
for (var iStep = 0; iStep < nSteps; iStep++) {
if (!this.doGetModel (++this.modelCount, null)) {
if (!this.checkLastModel ()) return;
continue;
}this.asc.newAtomSet ();
var step = steps.get (iStep);
var topology = J.adapter.readers.quantum.QCJSONReader.getMapSafely (step, "topology");
var atoms = J.adapter.readers.quantum.QCJSONReader.getMapSafely (topology, "atoms");
var symbols = org.qcschema.QCSchemaUnits.getStringArray (atoms, "symbol");
var atomNumbers = org.qcschema.QCSchemaUnits.getIntArray (atoms, "atom_number");
var atom_names = org.qcschema.QCSchemaUnits.getStringArray (atoms, "atom_names");
var coords = org.qcschema.QCSchemaUnits.getDoubleArray (atoms, "coords");
this.modelAtomCount = Clazz.doubleToInt (coords.length / 3);
var f = org.qcschema.QCSchemaUnits.getConversionFactor (atoms, "coords", "angstroms");
var isFractional = (f == 0);
this.setFractionalCoordinates (isFractional);
if (isFractional) {
f = org.qcschema.QCSchemaUnits.getConversionFactor (atoms, "unit_cell", "angstroms");
var cell = org.qcschema.QCSchemaUnits.getDoubleArray (atoms, "unit_cell");
if (cell == null) {
JU.Logger.error ("topology.unit_cell is missing even though atoms are listed as fractional");
} else {
for (var i = 0; i < 6; i++) {
switch (i) {
case 3:
f = 1;
default:
this.setUnitCellItem (i, (cell[i] * f));
break;
}
}
}}for (var i = 0, pt = 0; i < this.modelAtomCount; i++) {
var atom = this.asc.addNewAtom ();
this.setAtomCoordXYZ (atom, (coords[pt++] * f), (coords[pt++] * f), (coords[pt++] * f));
var sym = (symbols == null ? J.api.JmolAdapter.getElementSymbol (atomNumbers[i]) : symbols[i]);
atom.atomName = (atom_names == null ? sym : atom_names[i]);
atom.elementNumber = (atomNumbers == null ? J.api.JmolAdapter.getElementNumber (sym) : atomNumbers[i]);
}
if (this.doReadMolecularOrbitals) {
this.readMolecularOrbitals (J.adapter.readers.quantum.QCJSONReader.getMapSafely (step, "molecular_orbitals"));
this.clearOrbitals ();
}this.applySymmetryAndSetTrajectory ();
if (this.loadVibrations) {
this.readFreqsAndModes (org.qcschema.QCSchemaUnits.getList (step, "vibrations"));
}}
});
Clazz.defineMethod (c$, "readFreqsAndModes", 
 function (vibrations) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
if (vibrations != null) {
var n = vibrations.size ();
for (var i = 0; i < n; i++) {
if (!this.doGetVibration (++this.vibrationNumber)) continue;
var vib = vibrations.get (i);
var freq = org.qcschema.QCSchemaUnits.getDouble (vib, "frequency", "cm-1");
var vectors = org.qcschema.QCSchemaUnits.getDoubleArray (vib, "vectors");
if (i > 0) this.asc.cloneLastAtomSet ();
this.asc.setAtomSetFrequency (this.vibrationNumber, null, null, "" + freq, "cm-1");
var i0 = this.asc.getLastAtomSetAtomIndex ();
for (var j = 0, pt = 0; j < this.modelAtomCount; j++) {
this.asc.addVibrationVector (j + i0, (vectors[pt++] * 0.5291772), (vectors[pt++] * 0.5291772), (vectors[pt++] * 0.5291772));
}
}
}return true;
}, "java.util.ArrayList");
Clazz.defineMethod (c$, "readMolecularOrbitals", 
 function (molecular_orbitals) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
if (molecular_orbitals == null) return false;
var moBasisID = molecular_orbitals.get ("basis_id").toString ();
if (!this.readBasis (moBasisID)) return false;
var isNormalized = molecular_orbitals.get ("__jmol_normalized");
if (isNormalized != null && isNormalized.booleanValue ()) this.moData.put ("isNormalized", isNormalized);
this.calculationType = molecular_orbitals.get ("__jmol_calculation_type");
if (this.calculationType == null) this.calculationType = "?";
this.moData.put ("calculationType", this.calculationType);
var mos = org.qcschema.QCSchemaUnits.getList (molecular_orbitals, "orbitals");
var n = mos.size ();
for (var i = 0; i < n; i++) {
var thisMO = mos.get (i);
var energy = org.qcschema.QCSchemaUnits.getDouble (thisMO, "energy", "ev");
var occupancy = org.qcschema.QCSchemaUnits.getDouble (thisMO, "occupancy", null);
var symmetry = thisMO.get ("symmetry");
var spin = thisMO.get ("type");
if (spin != null) {
if (spin.indexOf ("beta") >= 0) this.alphaBeta = "beta";
 else if (spin.indexOf ("alpha") >= 0) this.alphaBeta = "alpha";
}var coefs = this.toFloatArray (org.qcschema.QCSchemaUnits.getDoubleArray (thisMO, "coefficients"));
this.line = "" + symmetry;
if (this.filterMO ()) {
var mo =  new java.util.Hashtable ();
mo.put ("coefficients", coefs);
if (Double.isNaN (energy)) {
this.$haveEnergy = false;
} else {
mo.put ("energy", Float.$valueOf (energy));
}if (!Double.isNaN (occupancy)) mo.put ("occupancy", Float.$valueOf (occupancy));
if (symmetry != null) mo.put ("symmetry", symmetry);
if (this.alphaBeta.length > 0) mo.put ("type", this.alphaBeta);
this.setMO (mo);
if (this.debugging) {
JU.Logger.debug (coefs.length + " coefficients in MO " + this.orbitals.size ());
}}}
if (this.debugging) JU.Logger.debug ("read " + this.orbitals.size () + " MOs");
var units = org.qcschema.QCSchemaUnits.getList (molecular_orbitals, "orbitals_energy_units");
var sunits = (units == null ? null : units.get (0).toString ());
this.setMOs (sunits == null || sunits.equals ("?") ? "?" : sunits);
if (this.$haveEnergy && this.doSort) this.sortMOs ();
return false;
}, "java.util.Map");
Clazz.defineMethod (c$, "toFloatArray", 
 function (da) {
var fa =  Clazz.newFloatArray (da.length, 0);
for (var j = da.length; --j >= 0; ) fa[j] = da[j];

return fa;
}, "~A");
Clazz.defineMethod (c$, "readBasis", 
 function (moBasisID) {
var moBasisData = J.adapter.readers.quantum.QCJSONReader.getMapSafely (this.job, "mo_bases");
var moBasis = J.adapter.readers.quantum.QCJSONReader.getMapSafely (moBasisData, moBasisID);
if (moBasis == null) {
JU.Logger.error ("No job.mo_bases entry for " + moBasisID);
return false;
}if (moBasisID === this.lastBasisID) return true;
this.lastBasisID = moBasisID;
var listG = org.qcschema.QCSchemaUnits.getList (moBasis, "gaussians");
var listS = org.qcschema.QCSchemaUnits.getList (moBasis, "shells");
if (listG == null && listS == null) {
listG = listS = org.qcschema.QCSchemaUnits.getList (moBasis, "slaters");
}if ((listG == null) != (listS == null)) {
JU.Logger.error ("gaussians/shells or slaters missing");
return false;
}if (listG === listS) {
this.readSlaterBasis (listS);
} else {
this.readGaussianBasis (listG, listS);
}return true;
}, "~S");
Clazz.defineMethod (c$, "readSlaterBasis", 
function (listS) {
this.nCoef = listS.size ();
for (var i = 0; i < this.nCoef; i++) {
var a = org.qcschema.QCSchemaUnits.getDoubleArray (listS.get (i), null);
this.addSlater (Clazz.doubleToInt (a[0]), Clazz.doubleToInt (a[1]), Clazz.doubleToInt (a[2]), Clazz.doubleToInt (a[3]), Clazz.doubleToInt (a[4]), a[5], a[6]);
}
this.setSlaters (false, false);
return true;
}, "java.util.ArrayList");
Clazz.defineMethod (c$, "readGaussianBasis", 
 function (listG, listS) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
this.shells =  new JU.Lst ();
for (var i = 0; i < listS.size (); i++) this.shells.addLast (org.qcschema.QCSchemaUnits.getIntArray (listS.get (i), null));

var gaussianPtr = listG.size ();
var garray = JU.AU.newFloat2 (gaussianPtr);
for (var i = 0; i < gaussianPtr; i++) garray[i] = this.toFloatArray (org.qcschema.QCSchemaUnits.getDoubleArray (listG.get (i), null));

this.moData.put ("shells", this.shells);
this.moData.put ("gaussians", garray);
JU.Logger.info (this.shells.size () + " slater shells read");
JU.Logger.info (garray.length + " gaussian primitives read");
this.asc.setCurrentModelInfo ("moData", this.moData);
return false;
}, "java.util.ArrayList,java.util.ArrayList");
Clazz.defineMethod (c$, "sortMOs", 
 function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var list = this.orbitals.toArray ( new Array (this.orbitals.size ()));
java.util.Arrays.sort (list, Clazz.innerTypeInstance (J.adapter.readers.quantum.BasisFunctionReader.MOEnergySorter, this, null));
this.orbitals.clear ();
for (var i = 0; i < list.length; i++) this.orbitals.addLast (list[i]);

});
c$.getMapSafely = Clazz.defineMethod (c$, "getMapSafely", 
 function (map, key) {
return (map == null ? null : map.get (key));
}, "java.util.Map,~S");
});
