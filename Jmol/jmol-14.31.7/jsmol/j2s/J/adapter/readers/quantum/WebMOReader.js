Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.MopacSlaterReader"], "J.adapter.readers.quantum.WebMOReader", ["java.lang.Boolean", "$.Exception", "$.Float", "java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "J.adapter.readers.quantum.BasisFunctionReader", "J.adapter.smarter.Bond", "JU.Logger"], function () {
c$ = Clazz.declareType (J.adapter.readers.quantum, "WebMOReader", J.adapter.readers.quantum.MopacSlaterReader);
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.equals ("[HEADER]")) {
this.readHeader ();
return true;
}if (this.line.equals ("[ATOMS]")) {
this.readAtoms ();
return false;
}if (this.line.equals ("[BONDS]")) {
this.readBonds ();
return false;
}if (!this.doReadMolecularOrbitals) return true;
if (this.line.equals ("[AO_ORDER]")) {
this.readAtomicOrbitalOrder ();
return false;
}if (this.line.equals ("[GTO]")) {
this.readGaussianBasis ();
return false;
}if (this.line.equals ("[STO]")) {
this.readSlaterBasis ();
return false;
}if (this.line.indexOf ("[MO") == 0) {
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.readMolecularOrbital ();
return false;
}return true;
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.finalizeReaderASCR ();
if (this.nOrbitals > 0) this.setMOs ("eV");
if (this.debugging) JU.Logger.debug (this.orbitals.size () + " molecular orbitals read");
});
Clazz.defineMethod (c$, "readHeader", 
function () {
this.moData.put ("isNormalized", Boolean.TRUE);
while (this.rd () != null && this.line.length > 0) {
this.moData.put ("calculationType", "?");
var tokens = this.getTokens ();
tokens[0] = tokens[0].substring (0, 1).toLowerCase () + tokens[0].substring (1, tokens[0].length);
var str = "";
for (var i = 1; i < tokens.length; i++) str += (i == 1 ? "" : " ") + tokens[i].toLowerCase ();

this.moData.put (tokens[0], str);
}
});
Clazz.defineMethod (c$, "readAtoms", 
function () {
while (this.getLine ()) {
var tokens = this.getTokens ();
if (tokens.length == 0) continue;
var sym = tokens[0];
var atNo = this.parseIntStr (sym);
this.setAtomCoordScaled (null, tokens, 1, 0.5291772).elementSymbol = (atNo == -2147483648 ? sym : J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (atNo));
}
});
Clazz.defineMethod (c$, "readBonds", 
function () {
while (this.getLine ()) {
var tokens = this.getTokens ();
if (tokens.length == 0) continue;
var atomIndex1 = this.parseIntStr (tokens[0]);
var atomIndex2 = this.parseIntStr (tokens[1]);
var order = this.parseIntStr (tokens[2]);
this.asc.addBond ( new J.adapter.smarter.Bond (atomIndex1 - 1, atomIndex2 - 1, order));
}
});
Clazz.defineMethod (c$, "readAtomicOrbitalOrder", 
function () {
while (this.getLine ()) {
var tokens = this.getTokens ();
if (tokens.length == 0) continue;
var data = this.line.substring (9).trim ().toLowerCase ();
var isOK = false;
switch (tokens.length - 1) {
case 3:
case 4:
isOK = true;
break;
case 5:
isOK = (tokens[0].equals ("DOrbitals") && this.getDFMap ("DS", data, 3, J.adapter.readers.quantum.WebMOReader.DS_LIST, 99));
break;
case 6:
isOK = (tokens[0].equals ("DOrbitals") && this.getDFMap ("DC", data, 4, J.adapter.readers.quantum.WebMOReader.DC_LIST, 2));
break;
case 7:
isOK = (tokens[0].equals ("FOrbitals") && this.getDFMap ("FS", data, 5, J.adapter.readers.quantum.WebMOReader.FS_LIST, 99));
break;
case 10:
isOK = (tokens[0].equals ("FOrbitals") && this.getDFMap ("FC", data, 6, J.adapter.readers.quantum.WebMOReader.FC_LIST, 3));
break;
}
if (!isOK) {
JU.Logger.error ("atomic orbital order is unrecognized -- skipping reading of MOs due to line: " + this.line);
this.orbitals = null;
}}
});
Clazz.defineMethod (c$, "getLine", 
 function () {
return (this.rd () != null && (this.line.length == 0 || this.line.charAt (0) != '['));
});
Clazz.defineMethod (c$, "readGaussianBasis", 
function () {
var sdata =  new JU.Lst ();
var gdata =  new JU.Lst ();
var atomNo = 1;
var gaussianPtr = 0;
while (this.getLine ()) {
var tokens = this.getTokens ();
if (tokens.length == 0) continue;
if (tokens.length != 1) throw  new Exception ("Error reading GTOs: missing atom index");
var slater =  Clazz.newIntArray (4, 0);
atomNo = this.parseIntStr (tokens[0]);
tokens = JU.PT.getTokens (this.rd ());
var nGaussians = this.parseIntStr (tokens[1]);
slater[0] = atomNo;
slater[1] = J.adapter.readers.quantum.BasisFunctionReader.getQuantumShellTagID (tokens[0]);
slater[2] = gaussianPtr + 1;
slater[3] = nGaussians;
for (var i = 0; i < nGaussians; i++) {
var strData = JU.PT.getTokens (this.rd ());
var nData = strData.length;
var data =  Clazz.newFloatArray (nData, 0);
for (var d = 0; d < nData; d++) {
data[d] = this.parseFloatStr (strData[d]);
}
gdata.addLast (data);
gaussianPtr++;
}
sdata.addLast (slater);
}
var garray = JU.AU.newFloat2 (gaussianPtr);
for (var i = 0; i < gaussianPtr; i++) {
garray[i] = gdata.get (i);
}
this.moData.put ("shells", sdata);
this.moData.put ("gaussians", garray);
if (this.debugging) {
JU.Logger.debug (sdata.size () + " slater shells read");
JU.Logger.debug (garray.length + " gaussian primitives read");
}this.asc.setCurrentModelInfo ("moData", this.moData);
});
Clazz.defineMethod (c$, "readSlaterBasis", 
function () {
while (this.getLine ()) {
var tokens = this.getTokens ();
if (tokens.length < 7) continue;
this.addSlater (this.parseIntStr (tokens[0]), this.parseIntStr (tokens[1]), this.parseIntStr (tokens[2]), this.parseIntStr (tokens[3]), this.parseIntStr (tokens[4]), this.parseFloatStr (tokens[5]), this.parseFloatStr (tokens[6]));
}
this.setSlaters (false, false);
});
Clazz.defineMethod (c$, "readMolecularOrbital", 
function () {
if (this.orbitals == null) {
JU.Logger.error ("MOLECULAR ORBITALS SKIPPED");
while (this.getLine ()) {
}
return;
}var mo =  new java.util.Hashtable ();
var data =  new JU.Lst ();
var energy = this.parseFloatStr (this.rd ());
var occupancy = this.parseFloatStr (this.rd ());
while (this.getLine ()) {
var tokens = this.getTokens ();
if (tokens.length == 0) {
continue;
}data.addLast (tokens[1]);
}
var coefs =  Clazz.newFloatArray (data.size (), 0);
for (var i = data.size (); --i >= 0; ) {
coefs[i] = this.parseFloatStr (data.get (i));
}
mo.put ("energy", Float.$valueOf (energy));
mo.put ("occupancy", Float.$valueOf (occupancy));
mo.put ("coefficients", coefs);
this.orbitals.addLast (mo);
this.nOrbitals++;
if (occupancy > 0) this.moData.put ("HOMO", Integer.$valueOf (this.nOrbitals));
});
Clazz.defineStatics (c$,
"DS_LIST", "NOT IMPLEMENTED IN THIS READER",
"DC_LIST", "xx    yy    zz    xy    xz    yz",
"FS_LIST", "NOT IMPLEMENTED IN THIS READER",
"FC_LIST", "xxx   yyy   zzz   yyx   xxy   xxz   zzx   zzy   yyz   xyz");
});
