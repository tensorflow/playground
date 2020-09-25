Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.GaussianReader"], "J.adapter.readers.quantum.GaussianFchkReader", ["java.lang.Double", "$.Float", "java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "$.V3", "J.adapter.readers.quantum.BasisFunctionReader", "J.adapter.smarter.Bond", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fileData = null;
this.atomCount = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "GaussianFchkReader", J.adapter.readers.quantum.GaussianReader);
Clazz.defineMethod (c$, "initializeReader", 
function () {
Clazz.superCall (this, J.adapter.readers.quantum.GaussianFchkReader, "initializeReader", []);
this.energyUnits = "";
this.fileData =  new java.util.Hashtable ();
this.fileData.put ("title", this.rd ().trim ());
this.calculationType = JU.PT.rep (this.rd (), "  ", " ");
this.asc.newAtomSet ();
this.asc.setCurrentModelInfo ("fileData", this.fileData);
this.readAllData ();
this.readAtoms ();
this.readBonds ();
this.readDipoleMoment ();
this.readPartialCharges ();
this.readBasis ();
this.readMolecularObitals ();
this.checkForFreq ();
this.continuing = false;
});
Clazz.defineMethod (c$, "checkForFreq", 
 function () {
var n = this.fileData.get ("Vib-NDim");
if (n == null) {
this.readFrequencies ("NumFreq", false);
return;
}try {
var nModes = n.intValue ();
var vibE2 = this.fileData.get ("Vib-E2");
var modes = this.fileData.get ("Vib-Modes");
var frequencies = this.fillFloat (vibE2, 0, nModes);
var red_masses = this.fillFloat (vibE2, nModes, nModes);
var frc_consts = this.fillFloat (vibE2, nModes * 2, nModes);
var intensities = this.fillFloat (vibE2, nModes * 3, nModes);
var ac = this.asc.getLastAtomSetAtomCount ();
var ignore =  Clazz.newBooleanArray (nModes, false);
var fpt = 0;
for (var i = 0; i < nModes; ++i) {
ignore[i] = !this.doGetVibration (++this.vibrationNumber);
if (ignore[i]) continue;
var iAtom0 = this.asc.ac;
this.asc.cloneAtomSetWithBonds (true);
var name = this.asc.setAtomSetFrequency (this.vibrationNumber, "Calculation " + this.calculationNumber, null, "" + frequencies[i], null);
this.appendLoadNote ("model " + this.asc.atomSetCount + ": " + name);
this.namedSets.set (this.asc.iSet);
this.asc.setAtomSetModelProperty ("ReducedMass", red_masses[i] + " AMU");
this.asc.setAtomSetModelProperty ("ForceConstant", frc_consts[i] + " mDyne/A");
this.asc.setAtomSetModelProperty ("IRIntensity", intensities[i] + " KM/Mole");
for (var iAtom = 0; iAtom < ac; iAtom++) {
this.asc.addVibrationVectorWithSymmetry (iAtom0 + iAtom, modes[fpt++], modes[fpt++], modes[fpt++], false);
}
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Could not read Vib-E2 section: " + e.getMessage ());
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "fillFloat", 
 function (f0, i, n) {
var f =  Clazz.newFloatArray (n, 0);
for (var i1 = 0, ilast = i + n; i < ilast; i++, i1++) f[i1] = f0[i];

return f;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "readAllData", 
 function () {
while ((this.line == null ? this.rd () : this.line) != null) {
if (this.line.length < 40) {
if (this.line.indexOf ("NumAtom") == 0) {
return;
}continue;
}var name = JU.PT.rep (this.line.substring (0, 40).trim (), " ", "");
var type = this.line.charAt (43);
var isArray = (this.line.indexOf ("N=") >= 0);
var v = this.line.substring (50).trim ();
JU.Logger.info (name + " = " + v + " " + isArray);
var o = null;
if (isArray) {
switch (type) {
case 'I':
case 'R':
o = this.fillFloatArray (null, 0,  Clazz.newFloatArray (this.parseIntStr (v), 0));
this.line = null;
break;
default:
v = this.rd ().trim ();
while (this.rd () != null && this.line.indexOf ("   N=   ") < 0) v += " " + this.line.trim ();

o = v;
break;
}
} else {
switch (type) {
case 'I':
o = Integer.$valueOf (this.parseIntStr (v));
break;
case 'R':
o = Double.$valueOf (Double.parseDouble (v));
break;
case 'C':
case 'L':
o = v;
break;
}
this.line = null;
}if (o != null) this.fileData.put (name, o);
}
});
Clazz.overrideMethod (c$, "readAtoms", 
function () {
var atomNumbers = this.fileData.get ("Atomicnumbers");
var data = this.fileData.get ("Currentcartesiancoordinates");
var e = "" + this.fileData.get ("TotalEnergy");
this.asc.setAtomSetEnergy (e, this.parseFloatStr (e));
this.atomCount = atomNumbers.length;
var f = 0.5291772;
for (var i = 0, pt = 0; i < this.atomCount; i++) {
var atom = this.asc.addNewAtom ();
atom.elementNumber = Clazz.floatToShort (atomNumbers[i]);
if (atom.elementNumber < 0) atom.elementNumber = 0;
this.setAtomCoordXYZ (atom, data[pt++] * f, data[pt++] * f, data[pt++] * f);
}
});
Clazz.defineMethod (c$, "readBonds", 
function () {
try {
var nBond = this.fileData.get ("NBond");
var iBond = this.fileData.get ("IBond");
if (nBond.length == 0) return;
var rBond = this.fileData.get ("RBond");
var mxBond = Clazz.doubleToInt (rBond.length / nBond.length);
for (var ia = 0, pt = 0; ia < this.atomCount; ia++) for (var j = 0; j < mxBond; j++, pt++) {
var ib = Clazz.floatToInt (iBond[pt]) - 1;
if (ib <= ia) continue;
var order = rBond[pt];
var iorder = (order == 1.5 ? 515 : Clazz.floatToInt (order));
this.asc.addBond ( new J.adapter.smarter.Bond (ia, ib, iorder));
}

this.addJmolScript ("connect 1.1 {_H} {*} ");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.info ("GaussianFchkReader -- bonding ignored");
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "readDipoleMoment", 
function () {
var data = this.fileData.get ("DipoleMoment");
if (data == null) return;
var dipole = JU.V3.new3 (data[0], data[1], data[2]);
JU.Logger.info ("Molecular dipole for model " + this.asc.atomSetCount + " = " + dipole);
this.asc.setCurrentModelInfo ("dipole", dipole);
});
Clazz.overrideMethod (c$, "readPartialCharges", 
function () {
var data = this.fileData.get ("Mulliken Charges");
if (data == null) return;
var atoms = this.asc.atoms;
for (var i = 0; i < this.atomCount; ++i) {
var c = data[i];
atoms[i].partialCharge = c;
if (Math.abs (c) > 0.8) atoms[i].formalCharge = Math.round (c);
}
JU.Logger.info ("Mulliken charges found for Model " + this.asc.atomSetCount);
});
Clazz.overrideMethod (c$, "readBasis", 
function () {
var types = this.fileData.get ("Shelltypes");
this.gaussianCount = 0;
this.shellCount = 0;
if (types == null) return;
this.shellCount = types.length;
this.shells =  new JU.Lst ();
var pps = this.fileData.get ("Numberofprimitivespershell");
var atomMap = this.fileData.get ("Shelltoatommap");
var exps = this.fileData.get ("Primitiveexponents");
var coefs = this.fileData.get ("Contractioncoefficients");
var spcoefs = this.fileData.get ("P(S=P)Contractioncoefficients");
this.gaussians = JU.AU.newFloat2 (exps.length);
for (var i = 0; i < this.shellCount; i++) {
var oType = J.adapter.readers.quantum.GaussianFchkReader.AO_TYPES[Clazz.floatToInt (types[i]) + 3];
var nGaussians = Clazz.floatToInt (pps[i]);
var iatom = Clazz.floatToInt (atomMap[i]);
var slater =  Clazz.newIntArray (4, 0);
slater[0] = iatom;
if (oType.equals ("F7") || oType.equals ("D5")) slater[1] = J.adapter.readers.quantum.BasisFunctionReader.getQuantumShellTagIDSpherical (oType.substring (0, 1));
 else slater[1] = J.adapter.readers.quantum.BasisFunctionReader.getQuantumShellTagID (oType);
slater[2] = this.gaussianCount + 1;
slater[3] = nGaussians;
if (this.debugging) JU.Logger.debug ("Slater " + this.shells.size () + " " + JU.Escape.eAI (slater));
this.shells.addLast (slater);
for (var j = 0; j < nGaussians; j++) {
var g = this.gaussians[this.gaussianCount] =  Clazz.newFloatArray (3, 0);
g[0] = exps[this.gaussianCount];
g[1] = coefs[this.gaussianCount];
if (spcoefs != null) g[2] = spcoefs[this.gaussianCount];
this.gaussianCount++;
}
}
JU.Logger.info (this.shellCount + " slater shells read");
JU.Logger.info (this.gaussianCount + " gaussian primitives read");
});
Clazz.defineMethod (c$, "readMolecularObitals", 
function () {
if (this.shells == null) return;
var nElec = (this.fileData.get ("Numberofelectrons")).intValue ();
var nAlpha = (this.fileData.get ("Numberofalphaelectrons")).intValue ();
var nBeta = (this.fileData.get ("Numberofbetaelectrons")).intValue ();
var aenergies = this.fileData.get ("AlphaOrbitalEnergies");
var benergies = this.fileData.get ("BetaOrbitalEnergies");
var acoefs = this.fileData.get ("AlphaMOcoefficients");
var bcoefs = this.fileData.get ("BetaMOcoefficients");
if (acoefs == null) return;
var occ = (bcoefs == null ? 2 : 1);
var n = (bcoefs == null ? nElec : nAlpha);
this.getOrbitals (aenergies, acoefs, occ, n);
if (bcoefs != null) this.getOrbitals (benergies, bcoefs, occ, nBeta);
this.setMOData (false);
});
Clazz.defineMethod (c$, "getOrbitals", 
 function (e, c, occ, nElec) {
var nOrb = e.length;
var nCoef = c.length;
nCoef /= nOrb;
this.alphaBeta = (occ == 2 ? "" : this.alphaBeta.equals ("alpha") ? "beta" : "alpha");
var pt = 0;
var n = 0;
for (var i = 0; i < nOrb; i++) {
var coefs =  Clazz.newFloatArray (nCoef, 0);
for (var j = 0; j < nCoef; j++) coefs[j] = c[pt++];

var mo =  new java.util.Hashtable ();
mo.put ("coefficients", coefs);
mo.put ("occupancy", Float.$valueOf (occ));
n += occ;
if (n >= nElec) occ = 0;
mo.put ("energy", Float.$valueOf (e[i]));
mo.put ("type", this.alphaBeta);
this.setMO (mo);
}
}, "~A,~A,~N,~N");
Clazz.defineStatics (c$,
"AO_TYPES",  Clazz.newArray (-1, ["F7", "D5", "L", "S", "P", "D", "F", "G", "H"]));
});
