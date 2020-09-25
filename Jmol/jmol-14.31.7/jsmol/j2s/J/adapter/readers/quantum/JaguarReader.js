Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.MOReader"], "J.adapter.readers.quantum.JaguarReader", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "J.adapter.readers.quantum.BasisFunctionReader", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.moCount = 0;
this.lumoEnergy = 3.4028235E38;
this.haveLine = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "JaguarReader", J.adapter.readers.quantum.MOReader);
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.startsWith (" Input geometry:") || this.line.startsWith (" Symmetrized geometry:") || this.line.startsWith ("  final geometry:")) {
this.readAtoms ();
return true;
}if (this.line.startsWith ("  Atomic charges from electrostatic potential:")) {
this.readCharges ();
return true;
}if (this.line.startsWith ("  number of basis functions....")) {
this.moCount = this.parseIntAt (this.line, 32);
return true;
}if (this.line.startsWith ("  basis set:")) {
this.moData.put ("energyUnits", "");
this.moData.put ("calculationType", this.calculationType = this.line.substring (13).trim ());
if ("sto-3g".equals (this.calculationType)) {
JU.Logger.error ("STO-3G not supported for Jaguar -- unusual SP basis definition.");
}return true;
}if (this.line.indexOf ("XXXXXShell information") >= 0) {
this.readUnnormalizedBasis ();
return true;
}if (this.line.indexOf ("Normalized coefficients") >= 0) {
if (!"sto-3g".equals (this.calculationType)) this.readBasisNormalized ();
return true;
}if (this.line.startsWith (" LUMO energy:")) {
this.lumoEnergy = this.parseFloatStr (this.line.substring (13));
return true;
}if (this.line.indexOf ("final wvfn") >= 0) {
if (this.shells != null) this.readJaguarMolecularOrbitals ();
return true;
}if (this.line.startsWith ("  harmonic frequencies in")) {
this.readFrequencies ();
this.continuing = false;
return false;
}return this.checkNboLine ();
});
Clazz.defineMethod (c$, "readAtoms", 
 function () {
this.discardPreviousAtoms ();
this.readLines (2);
while (this.rd () != null && this.line.length >= 60 && this.line.charAt (2) != ' ') {
var tokens = this.getTokens ();
var atomName = tokens[0];
if (atomName.length < 2) return;
var ch2 = atomName.charAt (1);
var elementSymbol = (ch2 >= 'a' && ch2 <= 'z' ? atomName.substring (0, 2) : atomName.substring (0, 1));
this.addAtomXYZSymName (tokens, 1, elementSymbol, atomName);
}
});
Clazz.defineMethod (c$, "readCharges", 
 function () {
var iAtom = 0;
while (this.rd () != null && this.line.indexOf ("sum") < 0) {
if (this.line.indexOf ("Charge") < 0) continue;
var tokens = this.getTokens ();
for (var i = 1; i < tokens.length; i++) this.asc.atoms[iAtom++].partialCharge = this.parseFloatStr (tokens[i]);

}
});
Clazz.defineMethod (c$, "readUnnormalizedBasis", 
 function () {
var lastAtom = "";
var iAtom = 0;
var sdata =  Clazz.newIntArray (this.moCount, 4, 0);
var sgdata = JU.AU.createArrayOfArrayList (this.moCount);
var tokens;
this.gaussianCount = 0;
this.discardLinesUntilContains ("--------");
while (this.rd () != null && (tokens = this.getTokens ()).length == 9) {
var jCont = this.parseIntStr (tokens[2]);
if (jCont > 0) {
if (!tokens[0].equals (lastAtom)) iAtom++;
lastAtom = tokens[0];
var iFunc = this.parseIntStr (tokens[5]);
var iType = this.parseIntStr (tokens[4]);
if (iType <= 2) iType--;
if (sgdata[iFunc] == null) {
sdata[iFunc][0] = iAtom;
sdata[iFunc][1] = iType;
sdata[iFunc][2] = 0;
sdata[iFunc][3] = 0;
sgdata[iFunc] =  new JU.Lst ();
}var factor = 1;
sgdata[iFunc].addLast ( Clazz.newFloatArray (-1, [this.parseFloatStr (tokens[6]), this.parseFloatStr (tokens[8]) * factor]));
this.gaussianCount += jCont;
for (var i = jCont - 1; --i >= 0; ) {
tokens = JU.PT.getTokens (this.rd ());
sgdata[iFunc].addLast ( Clazz.newFloatArray (-1, [this.parseFloatStr (tokens[6]), this.parseFloatStr (tokens[8]) * factor]));
}
}}
var garray = JU.AU.newFloat2 (this.gaussianCount);
var sarray =  new JU.Lst ();
this.gaussianCount = 0;
for (var i = 0; i < this.moCount; i++) if (sgdata[i] != null) {
var n = sgdata[i].size ();
sdata[i][2] = this.gaussianCount;
sdata[i][3] = n;
for (var j = 0; j < n; j++) {
garray[this.gaussianCount++] = sgdata[i].get (j);
}
sarray.addLast (sdata[i]);
}
this.moData.put ("shells", sarray);
this.moData.put ("gaussians", garray);
if (this.debugging) {
JU.Logger.debug (sarray.size () + " slater shells read");
JU.Logger.debug (this.gaussianCount + " gaussian primitives read");
}});
Clazz.defineMethod (c$, "readBasisNormalized", 
 function () {
var lastAtom = "";
var iAtom = 0;
var id;
var iFunc = 0;
var iFuncLast = -1;
var sarray =  new JU.Lst ();
var gdata =  new JU.Lst ();
this.gaussianCount = 0;
var sdata = null;
this.discardLinesUntilContains ("--------");
while (this.rd () != null && this.line.length > 3) {
var tokens = this.getTokens ();
if (tokens.length == 4) {
id = tokens[0];
continue;
}if (!tokens[0].equals (lastAtom)) iAtom++;
lastAtom = tokens[0];
id = tokens[2];
var iType = J.adapter.readers.quantum.BasisFunctionReader.getQuantumShellTagID (id);
iFunc = this.parseIntStr (tokens[3]) - 1;
var gPtr = gdata.size ();
if (iFunc == iFuncLast) {
sdata[3]++;
} else if (iFunc < iFuncLast) {
for (var i = gdata.size (); --i >= 0; ) {
if (gdata.get (i)[2] == iFunc) {
gPtr = i + 1;
break;
}}
for (var i = sarray.size (); --i >= 0; ) {
if (sarray.get (i)[4] == iFunc) {
sarray.get (i)[3]++;
while (++i < sarray.size ()) {
sarray.get (i)[2]++;
}
break;
}}
} else {
sdata =  Clazz.newIntArray (-1, [iAtom, iType, this.gaussianCount + 1, 1, iFunc]);
sarray.addLast (sdata);
iFuncLast = iFunc;
}this.gaussianCount++;
var z = this.parseFloatStr (tokens[4]);
var rCoef = this.parseFloatStr (tokens[5]);
if (id.equals ("XX")) rCoef *= 1.7320508;
gdata.add (gPtr,  Clazz.newFloatArray (-1, [z, rCoef, iFunc]));
}
var garray = JU.AU.newFloat2 (this.gaussianCount);
for (var i = gdata.size (); --i >= 0; ) garray[i] = gdata.get (i);

this.moData.put ("shells", this.shells = sarray);
this.moData.put ("gaussians", garray);
if (this.debugging) {
JU.Logger.debug (sarray.size () + " slater shells read");
JU.Logger.debug (this.gaussianCount + " gaussian primitives read");
}this.moData.put ("isNormalized", Boolean.TRUE);
});
Clazz.defineMethod (c$, "readJaguarMolecularOrbitals", 
 function () {
var dataBlock =  new Array (this.moCount);
this.rd ();
this.rd ();
this.rd ();
var nMo = 0;
while (this.line != null) {
this.rd ();
this.rd ();
this.rd ();
if (this.line == null || this.line.indexOf ("eigenvalues-") < 0) break;
var eigenValues = this.getTokens ();
var n = eigenValues.length - 1;
this.fillDataBlock (dataBlock, 0);
var occ = 2;
for (var iOrb = 0; iOrb < n; iOrb++) {
var coefs =  Clazz.newFloatArray (this.moCount, 0);
var mo =  new java.util.Hashtable ();
var energy = this.parseFloatStr (eigenValues[iOrb + 1]);
mo.put ("energy", Float.$valueOf (energy));
if (Math.abs (energy - this.lumoEnergy) < 0.0001) {
this.moData.put ("HOMO", Integer.$valueOf (nMo));
this.lumoEnergy = 3.4028235E38;
occ = 0;
}mo.put ("occupancy", Float.$valueOf (occ));
nMo++;
for (var i = 0, pt = 0; i < this.moCount; i++) {
coefs[pt++] = this.parseFloatStr (dataBlock[i][iOrb + 3]);
}
mo.put ("coefficients", coefs);
this.setMO (mo);
}
}
this.moData.put ("mos", this.orbitals);
this.finalizeMOData (this.moData);
});
Clazz.defineMethod (c$, "readFrequencies", 
 function () {
var ac = this.asc.getLastAtomSetAtomCount ();
this.discardLinesUntilStartsWith ("  frequencies ");
while (this.line != null && this.line.startsWith ("  frequencies ")) {
var iAtom0 = this.asc.ac;
var frequencies = this.getTokens ();
var frequencyCount = frequencies.length - 1;
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
var symmetries = null;
var intensities = null;
while (this.line != null && this.line.charAt (2) != ' ') {
if (this.line.indexOf ("symmetries") >= 0) symmetries = this.getTokens ();
 else if (this.line.indexOf ("intensities") >= 0) intensities = this.getTokens ();
this.rd ();
}
for (var i = 0; i < frequencyCount; i++) {
ignore[i] = !this.doGetVibration (++this.vibrationNumber);
if (ignore[i]) continue;
this.asc.cloneFirstAtomSet (0);
this.asc.setAtomSetFrequency (this.vibrationNumber, null, symmetries == null ? null : symmetries[i + 1], frequencies[i + 1], null);
if (intensities != null) this.asc.setAtomSetModelProperty ("IRIntensity", intensities[i + 1] + " km/mol");
}
this.haveLine = true;
this.fillFrequencyData (iAtom0, ac, ac, ignore, false, 0, 0, null, 0, null);
this.rd ();
this.rd ();
}
});
Clazz.defineMethod (c$, "rd", 
function () {
if (!this.haveLine) return Clazz.superCall (this, J.adapter.readers.quantum.JaguarReader, "rd", []);
this.haveLine = false;
return this.line;
});
Clazz.defineStatics (c$,
"ROOT3", 1.73205080756887729);
});
