Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.BasisFunctionReader"], "J.adapter.readers.quantum.MOReader", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "J.quantum.QS", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.shellCount = 0;
this.gaussianCount = 0;
this.gaussians = null;
this.energyUnits = "";
this.moTypes = null;
this.getNBOs = false;
this.getNBOCharges = false;
this.haveNboCharges = false;
this.haveNboOrbitals = false;
this.orbitalsRead = false;
this.lastMoData = null;
this.allowNoOrbitals = false;
this.HEADER_GAMESS_UK_MO = 3;
this.HEADER_GAMESS_OCCUPANCIES = 2;
this.HEADER_GAMESS_ORIGINAL = 1;
this.HEADER_NONE = 0;
this.haveCoeffMap = false;
this.iMo0 = 1;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "MOReader", J.adapter.readers.quantum.BasisFunctionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.line = "\nNBOs";
this.getNBOs = (this.filter != null && this.filterMO ());
this.line = "\nNBOCHARGES";
this.getNBOCharges = (this.filter != null && this.filterMO ());
this.checkAndRemoveFilterKey ("NBOCHARGES");
});
Clazz.defineMethod (c$, "checkAndRemoveFilterKey", 
function (key) {
if (!this.checkFilterKey (key)) return false;
this.filter = JU.PT.rep (this.filter, key, "");
if (this.filter.length < 3) this.filter = null;
return true;
}, "~S");
Clazz.defineMethod (c$, "checkNboLine", 
function () {
if (this.getNBOs) {
if (this.line.indexOf ("(Occupancy)   Bond orbital/ Coefficients/ Hybrids") >= 0) {
this.getNboTypes ();
return false;
}if (this.line.indexOf ("NBOs in the AO basis:") >= 0) {
this.readMolecularOrbitals (0);
return false;
}if (this.line.indexOf (" SECOND ORDER PERTURBATION THEORY ANALYSIS") >= 0) {
this.readSecondOrderData ();
return false;
}}if (this.getNBOCharges && this.line.indexOf ("Summary of Natural Population Analysis:") >= 0) {
this.getNboCharges ();
return true;
}return true;
});
Clazz.defineMethod (c$, "getNboCharges", 
 function () {
if (this.haveNboCharges) return;
this.discardLinesUntilContains ("----");
this.discardLinesUntilContains ("----");
this.haveNboCharges = true;
var ac = this.asc.ac;
var i0 = this.asc.getLastAtomSetAtomIndex ();
var atoms = this.asc.atoms;
for (var i = i0; i < ac; ++i) {
while (atoms[i].elementNumber == 0) ++i;

var tokens = JU.PT.getTokens (this.rd ());
var charge;
if (tokens == null || tokens.length < 3 || Float.isNaN (charge = this.parseFloatStr (tokens[2]))) {
JU.Logger.info ("Error reading NBO charges: " + this.line);
return;
}atoms[i].partialCharge = charge;
if (this.debugging) JU.Logger.debug ("Atom " + i + " using NBOcharge: " + charge);
}
JU.Logger.info ("Using NBO charges for Model " + this.asc.atomSetCount);
});
Clazz.defineMethod (c$, "getNboTypes", 
function () {
this.moTypes =  new JU.Lst ();
this.iMo0 = (this.orbitals == null ? 0 : this.orbitals.size ()) + 1;
this.rd ();
this.rd ();
var n = 0;
var pt = 0;
while (this.line != null && (pt = this.line.indexOf (".")) >= 0 && pt < 10) {
if (this.parseIntRange (this.line, 0, pt) != n + 1) break;
this.moTypes.add (n++, this.line.substring (pt + 1, Math.min (40, this.line.length)).trim ());
while (this.rd () != null && this.line.startsWith ("       ")) {
}
}
JU.Logger.info (n + " natural bond AO basis functions found");
});
Clazz.defineMethod (c$, "readMolecularOrbitals", 
function (headerType) {
if (this.ignoreMOs) {
this.rd ();
return;
}this.dfCoefMaps = null;
if (this.haveNboOrbitals) {
this.orbitals =  new JU.Lst ();
this.alphaBeta = "";
}this.haveNboOrbitals = true;
this.orbitalsRead = true;
var mos = null;
var data = null;
var dCoeffLabels = "";
var fCoeffLabels = "";
var pCoeffLabels = "";
var ptOffset = -1;
var fieldSize = 0;
var nThisLine = 0;
this.rd ();
var moCount = 0;
var nBlank = 0;
var haveMOs = false;
if (this.line.indexOf ("---") >= 0) this.rd ();
while (this.rd () != null) {
var tokens = this.getTokens ();
if (this.debugging) {
JU.Logger.debug (tokens.length + " --- " + this.line);
}if (this.line.indexOf ("end") >= 0) break;
if (this.line.indexOf (" ALPHA SET ") >= 0) {
this.alphaBeta = "alpha";
if (this.rd () == null) break;
} else if (this.line.indexOf (" BETA SET ") >= 0) {
if (haveMOs) break;
this.alphaBeta = "beta";
if (this.rd () == null) break;
}var str = this.line.toUpperCase ();
if (str.length == 0 || str.indexOf ("--") >= 0 || str.indexOf (".....") >= 0 || str.indexOf ("NBO BASIS") >= 0 || str.indexOf ("CI EIGENVECTORS WILL BE LABELED") >= 0 || str.indexOf ("LZ VALUE") >= 0 || str.indexOf ("   THIS LOCALIZATION HAD") >= 0) {
if (!this.haveCoeffMap) {
this.haveCoeffMap = true;
var isOK = true;
if (pCoeffLabels.length > 0) isOK = this.getDFMap ("P", pCoeffLabels, 1, "(PX)  (PY)  (PZ)", 4);
if (dCoeffLabels.length > 0) {
if (dCoeffLabels.indexOf ("X") >= 0) isOK = this.getDFMap ("DC", dCoeffLabels, 4, "DXX   DYY   DZZ   DXY   DXZ   DYZ", 2);
 else if (dCoeffLabels.indexOf ("(D6)") >= 0) isOK = this.getDFMap ("DC", dCoeffLabels, 4, "(D1)  (D4)  (D6)  (D2)  (D3)  (D5)", 4);
 else isOK = this.getDFMap ("DS", dCoeffLabels, 3, "(D5)  (D2)  (D3)  (D4)  (D1)", 4);
}if (fCoeffLabels.length > 0) {
if (fCoeffLabels.indexOf ("X") >= 0) isOK = this.getDFMap ("FC", fCoeffLabels, 6, "XXX   YYY   ZZZ   XYY   XXY   XXZ   XZZ   YZZ   YYZ   XYZ", 2);
 else if (fCoeffLabels.indexOf ("(F10)") >= 0) isOK = this.getDFMap ("FC", fCoeffLabels, 6, J.adapter.readers.quantum.MOReader.FC_LIST, 5);
 else isOK = this.getDFMap ("FS", fCoeffLabels, 5, "(F1)  (F2)  (F3)  (F4)  (F5)  (F6)  (F7)", 4);
}if (!isOK) {
}}if (str.length == 0) nBlank++;
 else nBlank = 0;
if (nBlank == 2) break;
if (str.indexOf ("LZ VALUE") >= 0) this.discardLinesUntilBlank ();
for (var iMo = 0; iMo < nThisLine; iMo++) {
var coefs =  Clazz.newFloatArray (data[iMo].size (), 0);
var iCoeff = 0;
while (iCoeff < coefs.length) {
coefs[iCoeff] = this.parseFloatStr (data[iMo].get (iCoeff));
iCoeff++;
}
haveMOs = true;
this.addCoef (mos[iMo], coefs, null, NaN, NaN, moCount++);
}
nThisLine = 0;
if (this.line.length == 0) continue;
break;
}nBlank = 0;
if (nThisLine == 0) {
nThisLine = tokens.length;
if (tokens[0].equals ("AO")) {
nThisLine--;
ptOffset = 16;
fieldSize = 8;
}if (mos == null || nThisLine > mos.length) {
mos = JU.AU.createArrayOfHashtable (nThisLine);
data = JU.AU.createArrayOfArrayList (nThisLine);
}for (var i = 0; i < nThisLine; i++) {
mos[i] =  new java.util.Hashtable ();
data[i] =  new JU.Lst ();
}
this.getMOHeader (headerType, tokens, mos, nThisLine);
continue;
}var nSkip = tokens.length - nThisLine;
var type = tokens[nSkip - 1];
var ch;
if (type.charAt (0) == '(') {
ch = type.charAt (1);
if (!this.haveCoeffMap) {
switch (ch) {
case 'p':
pCoeffLabels += " " + type.toUpperCase ();
break;
case 'd':
dCoeffLabels += " " + J.adapter.readers.quantum.BasisFunctionReader.canonicalizeQuantumSubshellTag (type.toUpperCase ());
break;
case 'f':
fCoeffLabels += " " + J.adapter.readers.quantum.BasisFunctionReader.canonicalizeQuantumSubshellTag (type.toUpperCase ());
break;
case 's':
}
}} else {
var nChar = type.length;
ch = (nChar < 4 ? 'S' : nChar == 4 ? 'G' : nChar == 5 ? 'H' : '?');
if (!this.haveCoeffMap && nChar == 3) fCoeffLabels += " " + J.adapter.readers.quantum.BasisFunctionReader.canonicalizeQuantumSubshellTag (type.toUpperCase ());
 else if (!this.haveCoeffMap && nChar == 2) dCoeffLabels += " " + J.adapter.readers.quantum.BasisFunctionReader.canonicalizeQuantumSubshellTag (type.toUpperCase ());
}if (J.quantum.QS.isQuantumBasisSupported (ch)) {
if (ptOffset < 0) {
for (var i = 0; i < nThisLine; i++) data[i].addLast (tokens[i + nSkip]);

} else {
var pt = ptOffset;
for (var i = 0; i < nThisLine; i++, pt += fieldSize) data[i].addLast (this.line.substring (pt, pt + fieldSize).trim ());

}}this.line = "";
}
this.energyUnits = "a.u.";
this.setMOData (!this.alphaBeta.equals ("alpha"));
this.haveCoeffMap = false;
this.dfCoefMaps = null;
}, "~N");
Clazz.defineMethod (c$, "addCoef", 
function (mo, coefs, type, energy, occ, moCount) {
mo.put ("coefficients", coefs);
if (this.moTypes != null) {
type = this.moTypes.get (moCount % this.moTypes.size ());
occ = (type.indexOf ("*") >= 0 ? 0 : 2);
} else if (this.alphaBeta.length > 0) {
type = this.alphaBeta;
}if (type != null) mo.put ("type", type);
if (!Float.isNaN (energy)) mo.put ("energy", Float.$valueOf (energy));
if (!Float.isNaN (occ)) mo.put ("occupancy", Float.$valueOf (occ));
this.setMO (mo);
}, "java.util.Map,~A,~S,~N,~N,~N");
Clazz.defineMethod (c$, "getMOHeader", 
function (headerType, tokens, mos, nThisLine) {
this.rd ();
switch (headerType) {
default:
case 0:
return;
case 3:
for (var i = 0; i < nThisLine; i++) mos[i].put ("energy", Float.$valueOf (tokens[i]));

this.readLines (5);
return;
case 1:
tokens = this.getTokens ();
if (tokens.length == 0) tokens = JU.PT.getTokens (this.rd ());
for (var i = 0; i < nThisLine; i++) {
mos[i].put ("energy", Float.$valueOf (tokens[i]));
}
this.rd ();
break;
case 2:
var haveSymmetry = (this.line.length > 0 || this.rd () != null);
tokens = this.getTokens ();
for (var i = 0; i < nThisLine; i++) mos[i].put ("occupancy", Float.$valueOf (tokens[i].charAt (0) == '-' ? 2.0 : this.parseFloatStr (tokens[i])));

this.rd ();
if (!haveSymmetry) return;
}
if (this.line.length > 0) {
tokens = this.getTokens ();
for (var i = 0; i < nThisLine; i++) mos[i].put ("symmetry", tokens[i]);

}}, "~N,~A,~A,~N");
Clazz.defineMethod (c$, "addMOData", 
function (nColumns, data, mos) {
for (var i = 0; i < nColumns; i++) {
var coefs =  Clazz.newFloatArray (data[i].size (), 0);
for (var j = coefs.length; --j >= 0; ) coefs[j] = this.parseFloatStr (data[i].get (j));

mos[i].put ("coefficients", coefs);
this.setMO (mos[i]);
}
}, "~N,~A,~A");
Clazz.defineMethod (c$, "setMOData", 
function (clearOrbitals) {
if (this.shells != null && this.gaussians != null && (this.allowNoOrbitals || this.orbitals.size () != 0)) {
this.moData.put ("calculationType", this.calculationType);
this.moData.put ("energyUnits", this.energyUnits);
this.moData.put ("shells", this.shells);
this.moData.put ("gaussians", this.gaussians);
this.moData.put ("mos", this.orbitals);
this.finalizeMOData (this.lastMoData = this.moData);
}if (clearOrbitals) {
this.clearOrbitals ();
}}, "~B");
Clazz.defineMethod (c$, "readSecondOrderData", 
 function () {
this.readLines (5);
if (this.lastMoData == null || this.moTypes == null) return;
var ht =  new java.util.Hashtable ();
for (var i = this.moTypes.size (); --i >= 0; ) ht.put (JU.PT.rep (this.moTypes.get (i).substring (10), " ", ""), Integer.$valueOf (i + this.iMo0));

var strSecondOrderData =  new JU.Lst ();
while (this.rd () != null && this.line.indexOf ("NBO") < 0) {
if (this.line.length < 5 || this.line.charAt (4) != '.') continue;
strSecondOrderData.addLast ( Clazz.newArray (-1, [JU.PT.rep (this.line.substring (5, 27).trim (), " ", ""), JU.PT.rep (this.line.substring (32, 54).trim (), " ", ""), this.line.substring (55, 62).trim (), this.line.substring (71).trim ()]));
}
var secondOrderData =  Clazz.newFloatArray (strSecondOrderData.size (), 4, 0);
this.lastMoData.put ("secondOrderData", secondOrderData);
this.lastMoData = null;
var IMO;
for (var i = strSecondOrderData.size (); --i >= 0; ) {
var a = strSecondOrderData.get (i);
IMO = ht.get (a[0]);
if (IMO != null) secondOrderData[i][0] = IMO.intValue ();
IMO = ht.get (a[1]);
if (IMO != null) secondOrderData[i][1] = IMO.intValue ();
secondOrderData[i][2] = this.parseFloatStr (a[2]);
secondOrderData[i][3] = this.parseFloatStr (a[3]);
}
});
Clazz.defineStatics (c$,
"P_LIST", "(PX)  (PY)  (PZ)",
"DS_LIST", "(D5)  (D2)  (D3)  (D4)  (D1)",
"DC_LIST", "(D1)  (D4)  (D6)  (D2)  (D3)  (D5)",
"FS_LIST", "(F1)  (F2)  (F3)  (F4)  (F5)  (F6)  (F7)",
"FC_LIST", "(F1)  (F2)  (F10) (F4)  (F2)  (F3)  (F6)  (F9)  (F8)  (F5)");
});
