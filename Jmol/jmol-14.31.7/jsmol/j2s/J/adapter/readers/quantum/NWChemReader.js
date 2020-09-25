Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.MOReader", "java.util.Hashtable"], "J.adapter.readers.quantum.NWChemReader", ["java.lang.Character", "$.Float", "JU.AU", "$.BS", "$.Lst", "$.PT", "J.adapter.readers.quantum.BasisFunctionReader", "J.adapter.smarter.SmarterJmolAdapter", "J.api.JmolAdapter", "JU.Elements", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.taskNumber = 1;
this.equivalentAtomSets = 0;
this.energyKey = "";
this.energyValue = "";
this.converged = false;
this.haveEnergy = false;
this.haveAt = false;
this.inInput = false;
this.atomTypes = null;
this.htMOs = null;
this.nBasisFunctions = 0;
this.moCount = 0;
this.purging = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "NWChemReader", J.adapter.readers.quantum.MOReader);
Clazz.prepareFields (c$, function () {
this.htMOs =  new java.util.Hashtable ();
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.calculationType = "(NWCHEM)";
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.trim ().startsWith ("NWChem")) {
this.inInput = (this.line.indexOf ("NWChem Input Module") >= 0);
if (this.inInput) {
this.checkMOs ();
}}if (this.line.startsWith ("          Step")) {
this.init ();
return true;
}if (this.line.indexOf ("  wavefunction    = ") >= 0) {
this.calculationType = this.line.substring (this.line.indexOf ("=") + 1).trim () + "(NWCHEM)";
this.moData.put ("calculationType", this.calculationType);
return true;
}if (this.line.indexOf ("Total") >= 0) {
this.readTotal ();
return true;
}if (this.line.indexOf ("@") >= 0) {
this.readAtSign ();
return true;
}if (this.line.startsWith (" Task  times")) {
this.init ();
this.taskNumber++;
return true;
}if (this.line.startsWith ("      Optimization converged")) {
this.converged = true;
return true;
}if (this.line.startsWith ("      Symmetry information")) {
this.readSymmetry ();
return true;
}if (this.line.indexOf ("Output coordinates in ") >= 0) {
var thisLine = this.line;
if (!this.htMOs.isEmpty ()) this.checkMOs ();
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.equivalentAtomSets++;
this.readAtoms (thisLine);
return true;
}if (this.line.indexOf ("Vibrational analysis") >= 0) {
this.readFrequencies ();
return true;
}if (!this.doProcessLines) return true;
if (this.line.startsWith ("  Mulliken analysis of the total density")) {
if (this.equivalentAtomSets != 0) this.readPartialCharges ();
return true;
}if (this.line.contains ("Basis \"ao basis\"") && this.doReadMolecularOrbitals) {
return this.readBasis ();
}if (this.line.contains ("Molecular Orbital Analysis")) {
if (this.equivalentAtomSets != 0) this.readMOs ();
return true;
}return true;
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.checkMOs ();
this.finalizeReaderASCR ();
});
Clazz.defineMethod (c$, "init", 
 function () {
this.haveEnergy = false;
this.haveAt = false;
this.converged = false;
this.inInput = false;
this.equivalentAtomSets = 0;
});
Clazz.defineMethod (c$, "setEnergies", 
 function (key, value, nAtomSets) {
this.energyKey = key;
this.energyValue = value;
this.setProps (this.energyKey, this.energyValue, this.equivalentAtomSets);
this.setNames (this.energyKey + " = " + this.energyValue, null, this.equivalentAtomSets);
this.asc.setAtomSetEnergy (value, this.parseFloatStr (value));
this.haveEnergy = true;
}, "~S,~S,~N");
Clazz.defineMethod (c$, "setEnergy", 
 function (key, value) {
this.energyKey = key;
this.energyValue = value;
this.asc.setAtomSetModelProperty (this.energyKey, this.energyValue);
this.asc.setAtomSetName (this.energyKey + " = " + this.energyValue);
this.haveEnergy = true;
}, "~S,~S");
Clazz.defineMethod (c$, "readSymmetry", 
 function () {
var tokens = JU.PT.getTokens (this.readLines (3));
this.setProps ("Symmetry group name", tokens[tokens.length - 1], this.equivalentAtomSets);
});
Clazz.defineMethod (c$, "readTotal", 
 function () {
var tokens = this.getTokens ();
try {
if (tokens[2].startsWith ("energy")) {
if (!this.haveAt) this.setEnergies ("E(" + tokens[1] + ")", tokens[tokens.length - 1], this.equivalentAtomSets);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "readAtSign", 
 function () {
if (this.line.charAt (2) == 'S') {
if (this.readLines (2) == null) return;
}var tokens = this.getTokens ();
if (!this.haveEnergy) {
this.setEnergies ("E", tokens[2], this.equivalentAtomSets);
} else {
this.setEnergies (this.energyKey, this.energyValue, this.equivalentAtomSets);
}this.setProps ("Step", tokens[1], this.equivalentAtomSets);
this.haveAt = true;
});
Clazz.defineMethod (c$, "setProps", 
 function (key, value, n) {
for (var i = this.asc.iSet; --n >= 0 && i >= 0; --i) this.asc.setAtomSetModelPropertyForSet (key, value, i);

}, "~S,~S,~N");
Clazz.defineMethod (c$, "setNames", 
 function (atomSetName, namedSets, n) {
for (var i = this.asc.iSet; --n >= 0 && i >= 0; --i) if (namedSets == null || !namedSets.get (i)) this.asc.setModelInfoForSet ("name", atomSetName, i);

}, "~S,JU.BS,~N");
Clazz.defineMethod (c$, "readAtoms", 
 function (thisLine) {
var scale = (thisLine.indexOf ("angstroms") < 0 ? 0.5291772 : 1);
this.readLines (3);
var tokens;
this.haveEnergy = false;
this.asc.newAtomSet ();
this.asc.setAtomSetModelProperty (".PATH", "Task " + this.taskNumber + (this.inInput ? J.adapter.smarter.SmarterJmolAdapter.PATH_SEPARATOR + "Input" : J.adapter.smarter.SmarterJmolAdapter.PATH_SEPARATOR + "Geometry"));
this.atomTypes =  new JU.Lst ();
while (this.rd () != null && this.line.length > 0) {
tokens = this.getTokens ();
if (tokens.length < 6) break;
var name = this.fixTag (tokens[1]);
this.setAtomCoordScaled (null, tokens, 3, scale).atomName = name;
this.atomTypes.addLast (name);
}
if (this.converged) {
this.setEnergy (this.energyKey, this.energyValue);
this.asc.setAtomSetModelProperty ("Step", "converged");
} else if (this.inInput) {
this.asc.setAtomSetName ("Input");
}}, "~S");
Clazz.defineMethod (c$, "readFrequencies", 
 function () {
var firstFrequencyAtomSetIndex = this.asc.atomSetCount;
var firstVibrationNumber = this.vibrationNumber;
var path = "Task " + this.taskNumber + J.adapter.smarter.SmarterJmolAdapter.PATH_SEPARATOR + "Frequencies";
this.discardLinesUntilContains ("Atom information");
this.readLines (2);
this.asc.newAtomSet ();
var tokens;
while (this.rd () != null && this.line.indexOf ("---") < 0) {
tokens = this.getTokens ();
this.setAtomCoordScaled (null, tokens, 2, 0.5291772).atomName = this.fixTag (tokens[0]);
}
this.discardLinesUntilContains ("(Projected Frequencies expressed in cm-1)");
this.readLines (3);
var firstTime = true;
var bsIgnore =  new JU.BS ();
while (this.rd () != null && this.line.indexOf ("P.Frequency") >= 0) {
tokens = JU.PT.getTokensAt (this.line, 12);
var frequencyCount = tokens.length;
var iAtom0 = this.asc.ac;
var ac = this.asc.getLastAtomSetAtomCount ();
if (firstTime) iAtom0 -= ac;
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
for (var i = 0; i < frequencyCount; ++i) {
ignore[i] = (tokens[i].equals ("0.00") || !this.doGetVibration (++this.vibrationNumber));
if (ignore[i]) {
bsIgnore.set (this.vibrationNumber);
continue;
}if (!firstTime) this.asc.cloneLastAtomSet ();
firstTime = false;
this.asc.setAtomSetFrequency (this.vibrationNumber, path, null, tokens[i], null);
}
this.readLines (1);
this.fillFrequencyData (iAtom0, ac, ac, ignore, false, 0, 0, null, 0, null);
this.readLines (3);
}
try {
this.discardLinesUntilContains ("Infra Red Intensities");
this.readLines (2);
var idx = firstFrequencyAtomSetIndex;
for (var i = firstVibrationNumber; i < this.vibrationNumber; ++i) {
if (this.rd () == null) return;
if (bsIgnore.get (i)) continue;
tokens = this.getTokens ();
var iset = this.asc.iSet;
this.asc.iSet = idx++;
this.asc.setAtomSetModelProperty ("IRIntensity", tokens[3] + " au");
this.asc.iSet = iset;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("nwchem infra red issue" + e);
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "readPartialCharges", 
function () {
var tokens;
this.readLines (4);
var ac = this.asc.ac;
var i0 = this.asc.getLastAtomSetAtomIndex ();
var atoms = this.asc.atoms;
for (var i = i0; i < ac; ++i) {
while (atoms[i].elementNumber == 0) ++i;

do {
if (this.rd () == null || this.line.length < 3) return;
tokens = this.getTokens ();
} while (tokens[0].indexOf (".") >= 0);
atoms[i].partialCharge = this.parseIntStr (tokens[2]) - this.parseFloatStr (tokens[3]);
}
});
Clazz.defineMethod (c$, "fixTag", 
 function (tag) {
if (tag.equalsIgnoreCase ("bq")) return "X";
if (tag.toLowerCase ().startsWith ("bq")) tag = tag.substring (2) + "-Bq";
return "" + Character.toUpperCase (tag.charAt (0)) + (tag.length == 1 ? "" : "" + Character.toLowerCase (tag.charAt (1)));
}, "~S");
Clazz.defineMethod (c$, "readBasis", 
 function () {
this.gaussianCount = 0;
this.shellCount = 0;
this.nBasisFunctions = 0;
var isD6F10 = (this.line.indexOf ("cartesian") >= 0);
if (isD6F10) {
this.getDFMap ("DC", J.adapter.readers.quantum.NWChemReader.$DC_LIST, 4, "DXX   DYY   DZZ   DXY   DXZ   DYZ", 3);
this.getDFMap ("FC", J.adapter.readers.quantum.NWChemReader.$FC_LIST, 6, "XXX   YYY   ZZZ   XYY   XXY   XXZ   XZZ   YZZ   YYZ   XYZ", 3);
} else {
this.getDFMap ("DS", J.adapter.readers.quantum.NWChemReader.$DS_LIST, 3, "d0    d1+   d1-   d2+   d2-", 2);
this.getDFMap ("FS", J.adapter.readers.quantum.NWChemReader.$FS_LIST, 5, "f0    f1+   f1-   f2+   f2-   f3+   f3-", 2);
}this.shells =  new JU.Lst ();
var atomInfo =  new java.util.Hashtable ();
var atomSym = null;
var atomData = null;
var shellData = null;
while (this.line != null) {
var nBlankLines = 0;
while (this.line.length < 3 || this.line.charAt (2) == ' ') {
shellData =  new JU.Lst ();
this.rd ();
if (this.line.length < 3) nBlankLines++;
}
if (nBlankLines >= 2) break;
if (this.parseIntStr (this.line) == -2147483648) {
atomSym = this.getTokens ()[0];
if (atomSym.length > 2) atomSym = J.api.JmolAdapter.getElementSymbol (JU.Elements.elementNumberFromName (atomSym));
atomData =  new JU.Lst ();
atomInfo.put (atomSym, atomData);
this.rd ();
this.rd ();
continue;
}while (this.line != null && this.line.length > 3) {
var tokens = this.getTokens ();
var o =  Clazz.newArray (-1, [tokens[1],  Clazz.newFloatArray (-1, [this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3])])]);
shellData.addLast (o);
this.rd ();
}
atomData.addLast (shellData);
}
var nD = (isD6F10 ? 6 : 5);
var nF = (isD6F10 ? 10 : 7);
var gdata =  new JU.Lst ();
for (var i = 0; i < this.atomTypes.size (); i++) {
atomData = atomInfo.get (this.atomTypes.get (i));
var nShells = atomData.size ();
for (var ishell = 0; ishell < nShells; ishell++) {
this.shellCount++;
shellData = atomData.get (ishell);
var nGaussians = shellData.size ();
var type = shellData.get (0)[0];
switch (type.charAt (0)) {
case 'S':
this.nBasisFunctions += 1;
break;
case 'P':
this.nBasisFunctions += 3;
break;
case 'D':
this.nBasisFunctions += nD;
break;
case 'F':
this.nBasisFunctions += nF;
break;
}
var slater =  Clazz.newIntArray (4, 0);
slater[0] = i + 1;
slater[1] = (isD6F10 ? J.adapter.readers.quantum.BasisFunctionReader.getQuantumShellTagID (type) : J.adapter.readers.quantum.BasisFunctionReader.getQuantumShellTagIDSpherical (type));
slater[2] = this.gaussianCount + 1;
slater[3] = nGaussians;
this.shells.addLast (slater);
for (var ifunc = 0; ifunc < nGaussians; ifunc++) gdata.addLast (shellData.get (ifunc)[1]);

this.gaussianCount += nGaussians;
}
}
this.gaussians = JU.AU.newFloat2 (this.gaussianCount);
for (var i = 0; i < this.gaussianCount; i++) this.gaussians[i] = gdata.get (i);

JU.Logger.info (this.gaussianCount + " Gaussians read");
return true;
});
Clazz.defineMethod (c$, "readMOs", 
 function () {
var lines =  new JU.Lst ();
this.htMOs.put (this.line, lines);
lines.addLast (this.line);
var nblank = 0;
while (nblank != 2 && this.rd () != null) {
lines.addLast (this.line);
if (this.line.length < 2) nblank++;
 else nblank = 0;
}
return true;
});
Clazz.defineMethod (c$, "checkMOs", 
 function () {
if (this.shells == null) return;
for (var entry, $entry = this.htMOs.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
this.line = entry.getKey ();
this.alphaBeta = this.line.substring (0, this.line.indexOf ("Final")).trim () + " ";
var moCount = 0;
if (!this.filterMO ()) continue;
var list = entry.getValue ();
var n = list.size ();
JU.Logger.info (this.line);
for (var i = 3; i < n; i++) {
while (i < n && ((this.line = list.get (i)).length < 2 || this.line.charAt (1) != 'V')) i++;

if (i == n) break;
this.line = this.line.$replace ('=', ' ');
var tokens = this.getTokens ();
var occupancy = this.parseFloatStr (tokens[3]);
var energy = this.parseFloatStr (tokens[5]);
var symmetry = (tokens.length > 7 ? tokens[7] : null);
var mo =  new java.util.Hashtable ();
mo.put ("occupancy", Float.$valueOf (occupancy));
mo.put ("energy", Float.$valueOf (energy));
if (symmetry != null) mo.put ("symmetry", symmetry);
var coefs = null;
this.setMO (mo);
mo.put ("type", this.alphaBeta + (++moCount));
coefs =  Clazz.newFloatArray (this.nBasisFunctions, 0);
mo.put ("coefficients", coefs);
i += 3;
while ((this.line = list.get (++i)) != null && this.line.length > 3) {
tokens = this.getTokens ();
coefs[this.parseIntStr (tokens[0]) - 1] = this.parseFloatStr (tokens[1]);
var pt = Clazz.doubleToInt (tokens.length / 2);
if (pt == 5 || pt == 6) coefs[this.parseIntStr (tokens[pt]) - 1] = this.parseFloatStr (tokens[pt + 1]);
}
}
}
this.energyUnits = "a.u.";
this.setMOData (true);
this.htMOs.clear ();
});
Clazz.overrideMethod (c$, "rd", 
function () {
this.RL ();
if (!this.purging && this.line != null && this.line.startsWith ("--")) {
this.purging = true;
if (this.rd ().indexOf ("EAF") == 0) {
this.rd ();
this.discardLinesUntilStartsWith ("--");
this.purging = false;
return this.rd ();
};this.discardLinesUntilStartsWith ("*");
this.rd ();
this.purging = false;
this.RL ();
}return this.line;
});
Clazz.defineStatics (c$,
"$DS_LIST", "d2-   d1-   d0    d1+   d2+",
"$FS_LIST", "f3-   f2-   f1-   f0    f1+   f2+   f3+",
"$DC_LIST", "DXX   DXY   DXZ   DYY   DYZ   DZZ",
"$FC_LIST", "XXX   XXY   XXZ   XYY   XYZ   XZZ   YYY   YYZ   YZZ   ZZZ");
});
