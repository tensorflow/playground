Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.MopacSlaterReader", "java.util.Hashtable"], "J.adapter.readers.quantum.CsfReader", ["java.lang.Float", "JU.AU", "$.Lst", "$.PT", "J.adapter.readers.quantum.BasisFunctionReader", "J.adapter.smarter.Atom", "$.Bond", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nAtoms = 0;
this.strAtomicNumbers = "";
this.fieldCount = 0;
this.nVibrations = 0;
this.nGaussians = 0;
this.nSlaters = 0;
this.htBonds = null;
this.propertyItemCounts = null;
this.fieldTypes = null;
this.connectors = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "CsfReader", J.adapter.readers.quantum.MopacSlaterReader);
Clazz.prepareFields (c$, function () {
this.propertyItemCounts =  new java.util.Hashtable ();
this.fieldTypes =  Clazz.newIntArray (100, 0);
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.equals ("local_transform")) {
this.processLocalTransform ();
return true;
}if (this.line.startsWith ("object_class")) {
if (this.line.equals ("object_class connector")) {
this.processConnectorObject ();
return false;
}if (this.line.equals ("object_class atom")) {
this.processAtomObject ();
return false;
}if (this.line.equals ("object_class bond")) {
this.processBondObject ();
return false;
}if (this.line.equals ("object_class vibrational_level")) {
this.processVibrationObject ();
return false;
}if (this.line.equals ("object_class mol_orbital")) {
this.processMolecularOrbitalObject ();
return false;
}if (this.line.equals ("object_class sto_basis_fxn")) {
this.processBasisObject ("sto");
return false;
}if (this.line.equals ("object_class gto_basis_fxn")) {
this.processBasisObject ("gto");
return false;
}}return true;
});
Clazz.defineMethod (c$, "processLocalTransform", 
 function () {
var tokens = JU.PT.getTokens (this.rd () + " " + this.rd () + " " + this.rd () + " " + this.rd ());
this.setTransform (this.parseFloatStr (tokens[0]), this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[4]), this.parseFloatStr (tokens[5]), this.parseFloatStr (tokens[6]), this.parseFloatStr (tokens[8]), this.parseFloatStr (tokens[9]), this.parseFloatStr (tokens[10]));
});
Clazz.defineMethod (c$, "getPropertyCount", 
 function (what) {
var count = this.propertyItemCounts.get (what);
return (what.equals ("ID") ? 1 : count == null ? 0 : count.intValue ());
}, "~S");
Clazz.defineMethod (c$, "parseLineParameters", 
 function (fields, fieldMap) {
for (var i = 0; i < this.fieldCount; i++) this.fieldTypes[i] = 0;

this.fieldCount = -1;
if (this.line == null || this.line.startsWith ("property_flags:")) this.rd ();
if (this.line == null || this.line.startsWith ("object_class")) return this.fieldCount;
var tokens =  new Array (0);
while (this.line != null) {
tokens = this.getTokens ();
if (this.line.indexOf ("property ") == 0) this.propertyItemCounts.put (tokens[1], Integer.$valueOf ((tokens[6].equals ("STRING") ? 1 : this.parseIntStr (tokens[5]))));
 else if (this.line.indexOf ("ID") == 0) break;
this.rd ();
}
for (var ipt = 0, fpt = 0; ipt < tokens.length; ipt++) {
var field = tokens[ipt];
for (var i = fields.length; --i >= 0; ) if (field.equals (fields[i])) {
this.fieldTypes[fpt] = fieldMap[i];
this.fieldCount = fpt + 1;
break;
}
fpt += this.getPropertyCount (field);
}
return this.fieldCount;
}, "~A,~A");
Clazz.defineMethod (c$, "fillCsfArray", 
 function (property, tokens, i0, f, isInteger) {
var n = this.getPropertyCount (property);
var ioffset = i0;
for (var i = 0; i < n; i++) {
var ipt = ioffset + i;
if (ipt == tokens.length) {
tokens = JU.PT.getTokens (this.rd ());
ioffset -= ipt - i0;
ipt = i0;
}if (isInteger) (f)[i] = this.parseIntStr (tokens[ipt]);
 else (f)[i] = this.parseFloatStr (tokens[ipt]);
}
}, "~S,~A,~N,~O,~B");
Clazz.defineMethod (c$, "processConnectorObject", 
 function () {
this.connectors =  new java.util.Hashtable ();
this.rd ();
this.parseLineParameters (J.adapter.readers.quantum.CsfReader.connectorFields, J.adapter.readers.quantum.CsfReader.connectorFieldMap);
out : for (; this.rd () != null; ) {
if (this.line.startsWith ("property_flags:")) break;
var thisAtomID = null;
var thisBondID = null;
var tokens = this.getTokens ();
var field2 = "";
var isVibration = false;
for (var i = 0; i < this.fieldCount; ++i) {
var field = tokens[i];
switch (this.fieldTypes[i]) {
case 1:
if (!field.equals ("atom")) continue out;
break;
case 3:
field2 = field;
if (field.equals ("sto_basis_fxn")) this.nSlaters++;
 else if (field.equals ("gto_basis_fxn")) this.nGaussians++;
 else if (field.equals ("vibrational_level")) isVibration = true;
 else if (!field.equals ("bond")) continue out;
break;
case 2:
thisAtomID = field;
break;
case 4:
thisBondID = field2 + field;
if (isVibration) this.nVibrations = Math.max (this.nVibrations, this.parseIntStr (field));
break;
default:
}
}
if (thisAtomID != null && thisBondID != null) {
if (this.connectors.containsKey (thisBondID)) {
var connect = this.connectors.get (thisBondID);
connect[1] = thisAtomID;
if (this.htBonds != null) this.setBond (this.htBonds.get (thisBondID), connect);
} else {
var connect =  new Array (2);
connect[0] = thisAtomID;
this.connectors.put (thisBondID, connect);
}}}
});
Clazz.defineMethod (c$, "setBond", 
 function (bond, connect) {
bond.atomIndex1 = this.asc.getAtomIndex (connect[0]);
bond.atomIndex2 = this.asc.getAtomIndex (connect[1]);
this.asc.addBond (bond);
}, "J.adapter.smarter.Bond,~A");
Clazz.defineMethod (c$, "processAtomObject", 
 function () {
this.rd ();
this.parseLineParameters (J.adapter.readers.quantum.CsfReader.atomFields, J.adapter.readers.quantum.CsfReader.atomFieldMap);
this.nAtoms = 0;
for (; this.rd () != null; ) {
if (this.line.startsWith ("property_flags:")) break;
var tokens = this.getTokens ();
var atom =  new J.adapter.smarter.Atom ();
var field;
for (var i = 0; i < this.fieldCount; i++) {
var type = this.fieldTypes[i];
if (type == 0) continue;
if ((field = tokens[i]) == null) JU.Logger.warn ("field == null in " + this.line);
switch (type) {
case -1:
atom.atomSerial = JU.PT.parseInt (field);
break;
case 1:
atom.elementSymbol = field;
atom.atomName = field + atom.atomSerial;
break;
case 2:
this.strAtomicNumbers += field + " ";
break;
case 3:
atom.formalCharge = this.parseIntStr (field);
break;
case 5:
atom.partialCharge = this.parseFloatStr (field);
break;
case 4:
this.setAtomCoordTokens (atom, tokens, i);
i += 2;
break;
}
}
if (Float.isNaN (atom.x) || Float.isNaN (atom.y) || Float.isNaN (atom.z)) {
JU.Logger.warn ("atom " + atom.atomName + " has invalid/unknown coordinates");
} else {
this.nAtoms++;
this.asc.addAtomWithMappedSerialNumber (atom);
}}
});
Clazz.defineMethod (c$, "processBondObject", 
 function () {
this.rd ();
this.parseLineParameters (J.adapter.readers.quantum.CsfReader.bondFields, J.adapter.readers.quantum.CsfReader.bondFieldMap);
for (; this.rd () != null; ) {
if (this.line.startsWith ("property_flags:")) break;
var thisBondID = null;
var tokens = this.getTokens ();
for (var i = 0; i < this.fieldCount; ++i) {
var field = tokens[i];
switch (this.fieldTypes[i]) {
case -1:
thisBondID = "bond" + field;
break;
case 1:
var order = 1;
if (field.equals ("single")) order = 1;
 else if (field.equals ("double")) order = 2;
 else if (field.equals ("triple")) order = 3;
 else JU.Logger.warn ("unknown CSF bond order: " + field);
var bond =  new J.adapter.smarter.Bond (-1, -1, 1);
bond.order = order;
if (this.connectors == null) {
if (this.htBonds == null) this.htBonds =  new java.util.Hashtable ();
this.htBonds.put (thisBondID, bond);
} else {
this.setBond (bond, this.connectors.get (thisBondID));
}break;
}
}
}
});
Clazz.defineMethod (c$, "processVibrationObject", 
 function () {
var vibData =  Clazz.newFloatArray (this.nVibrations, this.nAtoms * 3, 0);
var energies =  new Array (this.nVibrations);
this.rd ();
while (this.line != null && this.parseLineParameters (J.adapter.readers.quantum.CsfReader.vibFields, J.adapter.readers.quantum.CsfReader.vibFieldMap) > 0) {
while (this.rd () != null && !this.line.startsWith ("property_flags:")) {
var tokens = this.getTokens ();
var thisvib = -1;
for (var i = 0; i < this.fieldCount; ++i) {
var field = tokens[i];
switch (this.fieldTypes[i]) {
case -1:
thisvib = this.parseIntStr (field) - 1;
break;
case 1:
this.fillCsfArray ("normalMode", tokens, i, vibData[thisvib], false);
break;
case 2:
energies[thisvib] = field;
break;
}
}
}
}
for (var i = 0; i < this.nVibrations; i++) {
if (!this.doGetVibration (++this.vibrationNumber)) continue;
this.asc.cloneAtomSetWithBonds (false);
this.asc.setAtomSetFrequency (this.vibrationNumber, null, null, energies[i], null);
var ipt = 0;
var baseAtom = this.nAtoms * (i + 1);
for (var iAtom = 0; iAtom < this.nAtoms; iAtom++) this.asc.addVibrationVector (baseAtom + iAtom, vibData[i][ipt++], vibData[i][ipt++], vibData[i][ipt++]);

}
});
Clazz.defineMethod (c$, "processMolecularOrbitalObject", 
 function () {
if (this.nSlaters == 0 && this.nGaussians == 0 || !this.doReadMolecularOrbitals) {
this.rd ();
return;
}this.nOrbitals = (this.nSlaters + this.nGaussians);
JU.Logger.info ("Reading CSF data for " + this.nOrbitals + " molecular orbitals");
var energy =  Clazz.newFloatArray (this.nOrbitals, 0);
var occupancy =  Clazz.newFloatArray (this.nOrbitals, 0);
var list =  Clazz.newFloatArray (this.nOrbitals, this.nOrbitals, 0);
var listCompressed = null;
var coefIndices = null;
var ipt = 0;
var isCompressed = false;
this.rd ();
while (this.line != null && this.parseLineParameters (J.adapter.readers.quantum.CsfReader.moFields, J.adapter.readers.quantum.CsfReader.moFieldMap) > 0) while (this.rd () != null && !this.line.startsWith ("property_flags:")) {
var tokens = this.getTokens ();
for (var i = 0; i < this.fieldCount; ++i) {
switch (this.fieldTypes[i]) {
case -1:
ipt = this.parseIntStr (tokens[i]) - 1;
break;
case 1:
energy[ipt] = this.parseFloatStr (tokens[i]);
break;
case 2:
occupancy[ipt] = this.parseFloatStr (tokens[i]);
break;
case 3:
this.fillCsfArray ("eig_vec", tokens, i, list[ipt], false);
break;
case 4:
isCompressed = true;
if (listCompressed == null) listCompressed =  Clazz.newFloatArray (this.nOrbitals, this.nOrbitals, 0);
this.fillCsfArray ("eig_vec_compressed", tokens, i, listCompressed[ipt], false);
break;
case 5:
if (coefIndices == null) coefIndices =  Clazz.newIntArray (this.nOrbitals, this.nOrbitals, 0);
this.fillCsfArray ("coef_indices", tokens, i, coefIndices[ipt], true);
break;
}
}
}

for (var iMo = 0; iMo < this.nOrbitals; iMo++) {
if (isCompressed) {
for (var i = 0; i < coefIndices[iMo].length; i++) {
var pt = coefIndices[iMo][i] - 1;
if (pt < 0) break;
list[iMo][pt] = listCompressed[iMo][i];
}
}for (var i = 0; i < this.nOrbitals; i++) if (Math.abs (list[iMo][i]) < 1.0E-4) list[iMo][i] = 0;

var mo =  new java.util.Hashtable ();
mo.put ("energy", Float.$valueOf (energy[iMo]));
mo.put ("occupancy", Float.$valueOf (occupancy[iMo]));
mo.put ("coefficients", list[iMo]);
this.setMO (mo);
}
this.setMOs ("eV");
});
Clazz.defineMethod (c$, "processBasisObject", 
 function (sto_gto) {
var atomNos = JU.PT.getTokens (this.strAtomicNumbers);
this.atomicNumbers =  Clazz.newIntArray (atomNos.length, 0);
for (var i = 0; i < this.atomicNumbers.length; i++) this.atomicNumbers[i] = this.parseIntStr (atomNos[i]);

this.nOrbitals = (this.nSlaters + this.nGaussians);
var isGaussian = (sto_gto.equals ("gto"));
var zetas = JU.AU.newFloat2 (this.nOrbitals);
var contractionCoefs = null;
var types =  new Array (this.nOrbitals);
var shells =  Clazz.newIntArray (this.nOrbitals, 0);
var nZetas = 0;
this.rd ();
while (this.line != null && this.parseLineParameters (J.adapter.readers.quantum.CsfReader.moFields, J.adapter.readers.quantum.CsfReader.moFieldMap) > 0) {
if (nZetas == 0) nZetas = this.getPropertyCount (sto_gto + "_exp");
var ipt = 0;
while (this.rd () != null && !this.line.startsWith ("property_flags:")) {
var tokens = this.getTokens ();
for (var i = 0; i < this.fieldCount; ++i) {
var field = tokens[i];
switch (this.fieldTypes[i]) {
case -1:
ipt = this.parseIntStr (field) - 1;
break;
case 6:
types[ipt] = field;
break;
case 7:
case 9:
zetas[ipt] =  Clazz.newFloatArray (nZetas, 0);
this.fillCsfArray (sto_gto + "_exp", tokens, i, zetas[ipt], false);
break;
case 10:
shells[ipt] = this.parseIntStr (field);
break;
case 8:
if (contractionCoefs == null) contractionCoefs =  Clazz.newFloatArray (this.nOrbitals, nZetas, 0);
this.fillCsfArray ("contractions", tokens, i, contractionCoefs[ipt], false);
}
}
}
}
if (isGaussian) {
var sdata =  new JU.Lst ();
var gdata =  new JU.Lst ();
var iShell = 0;
var gaussianCount = 0;
for (var ipt = 0; ipt < this.nGaussians; ipt++) {
if (shells[ipt] != iShell) {
iShell = shells[ipt];
var slater =  Clazz.newIntArray (4, 0);
var iAtom = this.asc.getAtomIndex (this.connectors.get (sto_gto + "_basis_fxn" + (ipt + 1))[0]);
slater[0] = iAtom + 1;
slater[1] = J.adapter.readers.quantum.BasisFunctionReader.getQuantumShellTagID (types[ipt].substring (0, 1));
var nZ = 0;
while (++nZ < nZetas && zetas[ipt][nZ] != 0) {
}
slater[2] = gaussianCount;
slater[3] = nZ;
sdata.addLast (slater);
gaussianCount += nZ;
for (var i = 0; i < nZ; i++) gdata.addLast ( Clazz.newFloatArray (-1, [zetas[ipt][i], contractionCoefs[ipt][i]]));

}}
var garray = JU.AU.newFloat2 (gaussianCount);
for (var i = 0; i < gaussianCount; i++) garray[i] = gdata.get (i);

this.moData.put ("shells", sdata);
this.moData.put ("gaussians", garray);
} else {
for (var ipt = 0; ipt < this.nSlaters; ipt++) {
var iAtom = this.asc.getAtomIndex (this.connectors.get (sto_gto + "_basis_fxn" + (ipt + 1))[0]);
for (var i = 0; i < nZetas; i++) {
if (zetas[ipt][i] == 0) break;
this.createSphericalSlaterByType (iAtom, this.atomicNumbers[iAtom], types[ipt], zetas[ipt][i] * (i == 0 ? 1 : -1), contractionCoefs == null ? 1 : contractionCoefs[ipt][i]);
}
}
this.setSlaters (true, false);
}}, "~S");
Clazz.defineStatics (c$,
"objCls1", 1,
"objID1", 2,
"objCls2", 3,
"objID2", 4,
"connectorFields",  Clazz.newArray (-1, ["objCls1", "objID1", "objCls2", "objID2"]),
"connectorFieldMap",  Clazz.newByteArray (-1, [1, 2, 3, 4]),
"ID", -1,
"SYM", 1,
"ANUM", 2,
"CHRG", 3,
"XYZ", 4,
"PCHRG", 5,
"atomFields",  Clazz.newArray (-1, ["ID", "sym", "anum", "chrg", "xyz_coordinates", "pchrg"]),
"atomFieldMap",  Clazz.newByteArray (-1, [-1, 1, 2, 3, 4, 5]),
"BTYPE", 1,
"bondFields",  Clazz.newArray (-1, ["ID", "type"]),
"bondFieldMap",  Clazz.newByteArray (-1, [-1, 1]),
"NORMAL_MODE", 1,
"VIB_ENERGY", 2,
"DIPOLE", 3,
"vibFields",  Clazz.newArray (-1, ["ID", "normalMode", "Energy", "transitionDipole"]),
"vibFieldMap",  Clazz.newByteArray (-1, [-1, 1, 2, 3]),
"EIG_VAL", 1,
"MO_OCC", 2,
"EIG_VEC", 3,
"EIG_VEC_COMPRESSED", 4,
"COEF_INDICES", 5,
"BFXN_ANGL", 6,
"STO_EXP", 7,
"CONTRACTIONS", 8,
"GTO_EXP", 9,
"SHELL", 10,
"moFields",  Clazz.newArray (-1, ["ID", "eig_val", "mo_occ", "eig_vec", "eig_vec_compressed", "coef_indices", "bfxn_ang", "sto_exp", "contractions", "gto_exp", "shell"]),
"moFieldMap",  Clazz.newByteArray (-1, [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
});
