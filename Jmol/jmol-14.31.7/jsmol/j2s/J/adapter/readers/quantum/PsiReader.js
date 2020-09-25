Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.MOReader", "java.util.Hashtable", "JU.Lst"], "J.adapter.readers.quantum.PsiReader", ["java.lang.Float", "JU.AU", "$.PT", "J.adapter.readers.quantum.BasisFunctionReader", "J.api.JmolAdapter", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atomNames = null;
this.shellsByUniqueAtom = null;
this.uniqueAtomMap = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "PsiReader", J.adapter.readers.quantum.MOReader);
Clazz.prepareFields (c$, function () {
this.atomNames =  new JU.Lst ();
this.shellsByUniqueAtom =  new JU.Lst ();
this.uniqueAtomMap =  new java.util.Hashtable ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.indexOf ("-Geometry after Center-of-Mass shift and reorientation (a.u.):") >= 0) {
this.readAtoms (true);
this.doProcessLines = true;
return true;
}if (this.line.indexOf ("-Unique atoms in the canonical coordinate system (a.u.):") >= 0) {
this.readUniqueAtoms ();
this.doProcessLines = true;
return true;
}if (!this.doProcessLines) return true;
if (this.line.indexOf ("New Cartesian Geometry in a.u.") >= 0) {
this.readAtoms (false);
return true;
}if (this.line.startsWith ("  label        = ")) {
this.moData.put ("calculationType", this.calculationType = this.line.substring (17).trim ());
return true;
}if (this.line.startsWith ("molecular orbitals for ")) {
this.moData.put ("energyUnits", "");
return true;
}if (this.line.startsWith ("  -BASIS SETS:")) {
this.readBasis ();
return true;
}if (this.line.indexOf ("Molecular Orbital Coefficients") >= 0) {
if (this.filterMO ()) this.readPsiMolecularOrbitals ();
return true;
}if (this.line.indexOf ("SCF total energy   =") >= 0) {
this.readSCFDone ();
return true;
}if (this.line.indexOf ("Normal Modes") >= 0) {
this.readFrequencies ();
return true;
}return this.checkNboLine ();
});
Clazz.defineMethod (c$, "readSCFDone", 
 function () {
this.asc.setAtomSetName (this.line);
});
Clazz.defineMethod (c$, "readAtoms", 
 function (isInitial) {
if (isInitial) {
this.asc.newAtomSet ();
this.asc.setAtomSetName ("");
this.discardLinesUntilContains ("----");
}var atomPt = 0;
while (this.rd () != null && this.line.length > 0) {
var tokens = this.getTokens ();
var atom = (isInitial ? this.asc.addNewAtom () : this.asc.atoms[atomPt++]);
if (isInitial) {
this.atomNames.addLast (tokens[0]);
if (tokens[0].length <= 2) atom.elementNumber = J.api.JmolAdapter.getElementNumber (tokens[0]);
} else {
atom.elementNumber = this.parseIntStr (tokens[0]);
}if (atom.elementNumber < 0) atom.elementNumber = 0;
this.setAtomCoordScaled (atom, tokens, 1, 0.5291772);
}
}, "~B");
Clazz.defineMethod (c$, "readBasis", 
function () {
var gdata =  new JU.Lst ();
this.gaussianCount = 0;
this.shellCount = 0;
var tokens;
var slater = null;
var slatersByUniqueAtom = null;
this.rd ();
while (this.rd () != null && this.line.startsWith ("   -Basis set on")) {
slatersByUniqueAtom =  new JU.Lst ();
var nGaussians = 0;
while (this.rd () != null && !this.line.startsWith ("       )")) {
this.line = this.line.$replace ('(', ' ').$replace (')', ' ');
tokens = this.getTokens ();
var ipt = 0;
switch (tokens.length) {
case 3:
if (slater != null) {
slatersByUniqueAtom.addLast (slater);
}ipt = 1;
slater =  Clazz.newIntArray (3, 0);
slater[0] = J.adapter.readers.quantum.BasisFunctionReader.getQuantumShellTagID (tokens[0]);
slater[1] = this.gaussianCount;
this.shellCount++;
break;
case 2:
break;
}
nGaussians++;
gdata.addLast ( Clazz.newArray (-1, [tokens[ipt], tokens[ipt + 1]]));
slater[2] = nGaussians;
}
if (slater != null) {
slatersByUniqueAtom.addLast (slater);
}this.shellsByUniqueAtom.addLast (slatersByUniqueAtom);
this.gaussianCount += nGaussians;
this.rd ();
}
var garray = JU.AU.newFloat2 (this.gaussianCount);
for (var i = 0; i < this.gaussianCount; i++) {
tokens = gdata.get (i);
garray[i] =  Clazz.newFloatArray (tokens.length, 0);
for (var j = 0; j < tokens.length; j++) garray[i][j] = this.parseFloatStr (tokens[j]);

}
this.moData.put ("gaussians", garray);
if (this.debugging) {
JU.Logger.debug (this.shellCount + " slater shells read");
JU.Logger.debug (this.gaussianCount + " gaussian primitives read");
}});
Clazz.defineMethod (c$, "readUniqueAtoms", 
 function () {
var sdata =  new JU.Lst ();
this.discardLinesUntilContains ("----");
var n = 0;
while (this.rd () != null && this.line.length > 0) {
var tokens = this.getTokens ();
this.uniqueAtomMap.put (tokens[0], Integer.$valueOf (n++));
}
var ac = this.atomNames.size ();
for (var i = 0; i < ac; i++) {
var atomType = this.atomNames.get (i);
var iUnique = this.uniqueAtomMap.get (atomType).intValue ();
var slaters = this.shellsByUniqueAtom.get (iUnique);
if (slaters == null) {
JU.Logger.error ("slater for atom " + i + " atomType " + atomType + " was not found in listing. Ignoring molecular orbitals");
return;
}for (var j = 0; j < slaters.size (); j++) {
var slater = slaters.get (j);
sdata.addLast ( Clazz.newIntArray (-1, [i + 1, slater[0], slater[1], slater[2]]));
}
}
this.moData.put ("shells", sdata);
});
Clazz.defineMethod (c$, "readPsiMolecularOrbitals", 
function () {
var mos = JU.AU.createArrayOfHashtable (5);
var data = JU.AU.createArrayOfArrayList (5);
var nThisLine = 0;
while (this.rd () != null && this.line.toUpperCase ().indexOf ("DENS") < 0) {
var tokens = this.getTokens ();
var ptData = (this.line.charAt (5) == ' ' ? 2 : 4);
if (this.line.indexOf ("                    ") == 0) {
this.addMOData (nThisLine, data, mos);
nThisLine = tokens.length;
tokens = JU.PT.getTokens (this.rd ());
for (var i = 0; i < nThisLine; i++) {
mos[i] =  new java.util.Hashtable ();
data[i] =  new JU.Lst ();
mos[i].put ("symmetry", tokens[i]);
}
tokens = J.adapter.smarter.AtomSetCollectionReader.getStrings (this.rd ().substring (21), nThisLine, 10);
for (var i = 0; i < nThisLine; i++) {
mos[i].put ("energy", Float.$valueOf (tokens[i]));
}
continue;
}try {
for (var i = 0; i < nThisLine; i++) {
data[i].addLast (tokens[i + ptData]);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Error reading Psi3 file molecular orbitals at line: " + this.line);
break;
} else {
throw e;
}
}
}
this.addMOData (nThisLine, data, mos);
this.moData.put ("mos", this.orbitals);
this.finalizeMOData (this.moData);
});
Clazz.defineMethod (c$, "readFrequencies", 
 function () {
this.rd ();
var ac = this.asc.getLastAtomSetAtomCount ();
var tokens;
while (this.rd () != null && this.line.indexOf ("Frequency") >= 0) {
tokens = this.getTokens ();
var iAtom0 = this.asc.ac;
var ignore =  Clazz.newBooleanArray (1, false);
if (!this.doGetVibration (++this.vibrationNumber)) continue;
this.asc.cloneLastAtomSet ();
this.asc.setAtomSetFrequency (this.vibrationNumber, null, null, tokens[1], null);
this.readLines (2);
this.fillFrequencyData (iAtom0, ac, ac, ignore, true, 0, 0, null, 0, null);
this.rd ();
}
});
});
