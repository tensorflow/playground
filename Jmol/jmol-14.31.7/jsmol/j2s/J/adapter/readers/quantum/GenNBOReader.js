Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.MOReader"], "J.adapter.readers.quantum.GenNBOReader", ["java.lang.Boolean", "$.Exception", "$.Float", "java.util.Hashtable", "JU.AU", "$.Lst", "$.P3", "$.PT", "$.Rdr", "$.SB", "J.adapter.readers.quantum.NBOParser", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isOutputFile = false;
this.nboType = "";
this.nOrbitals0 = 0;
this.is47File = false;
this.isOpenShell = false;
this.alphaOnly = false;
this.betaOnly = false;
this.nAOs = 0;
this.nNOs = 0;
this.topoType = "A";
this.nStructures = 0;
this.nboParser = null;
this.addBetaSet = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "GenNBOReader", J.adapter.readers.quantum.MOReader);
Clazz.defineMethod (c$, "initializeReader", 
function () {
var line1 = this.rd ().trim ().toUpperCase ();
this.is47File = (line1.indexOf ("$GENNBO") >= 0 || line1.indexOf ("$NBO") >= 0);
if (this.is47File) {
if (line1.indexOf ("BOHR") >= 0) {
this.fileOffset =  new JU.P3 ();
this.fileScaling = JU.P3.new3 (0.5291772, 0.5291772, 0.5291772);
}this.readData47 ();
return;
}this.alphaOnly = this.checkFilterKey ("ALPHA");
this.betaOnly = this.checkFilterKey ("BETA");
var isOK;
var line2 = this.rd ();
this.line = line1 + line2;
this.isOutputFile = (line2.indexOf ("****") >= 0);
if (this.isOutputFile) {
isOK = this.getFile31 ();
Clazz.superCall (this, J.adapter.readers.quantum.GenNBOReader, "initializeReader", []);
} else if (line2.indexOf ("s in the AO basis:") >= 0) {
this.nboType = line2.substring (1, line2.indexOf ("s"));
this.asc.setCollectionName (line1 + ": " + this.nboType + "s");
isOK = this.getFile31 ();
} else {
this.nboType = "AO";
this.asc.setCollectionName (line1 + ": " + this.nboType + "s");
isOK = this.readData31 (line1);
}if (!isOK) JU.Logger.error ("Unimplemented shell type -- no orbitals available: " + this.line);
if (this.isOutputFile) return;
if (isOK) this.readMOs ();
this.continuing = false;
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.appendLoadNote ("NBO type " + this.nboType);
if (this.isOpenShell) this.asc.setCurrentModelInfo ("isOpenShell", Boolean.TRUE);
this.finalizeReaderASCR ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.indexOf ("SECOND ORDER PERTURBATION THEORY ANALYSIS") >= 0 && !this.orbitalsRead) {
this.nboType = "NBO";
var data = this.getFileData (".37");
if (data == null) return true;
var readerSave = this.reader;
this.reader = JU.Rdr.getBR (data);
this.rd ();
this.rd ();
this.readMOs ();
this.reader = readerSave;
this.orbitalsRead = false;
return true;
}if (this.line.indexOf ("$NRTSTRA") >= 0) {
this.getStructures ("NRTSTRA");
return true;
}if (this.line.indexOf ("$NRTSTRB") >= 0) {
this.getStructures ("NRTSTRB");
return true;
}if (this.line.indexOf ("$NRTSTR") >= 0) {
this.getStructures ("NRTSTR");
return true;
}if (this.line.indexOf (" TOPO ") >= 0) {
this.getStructures ("TOPO" + this.topoType);
this.topoType = "B";
return true;
}if (this.line.indexOf ("$CHOOSE") >= 0) {
this.getStructures ("CHOOSE");
return true;
}return this.checkNboLine ();
});
Clazz.defineMethod (c$, "getStructures", 
 function (type) {
if (this.nboParser == null) this.nboParser =  new J.adapter.readers.quantum.NBOParser ();
var structures = this.getStructureList ();
var sb =  new JU.SB ();
while (!this.rd ().trim ().equals ("$END")) sb.append (this.line).append ("\n");

this.nStructures = this.nboParser.getStructures (sb.toString (), type, structures);
this.appendLoadNote (this.nStructures + " NBO " + type + " resonance structures");
}, "~S");
Clazz.defineMethod (c$, "getStructureList", 
 function () {
var structures = this.asc.getAtomSetAuxiliaryInfo (this.asc.iSet).get ("nboStructures");
if (structures == null) this.asc.setCurrentModelInfo ("nboStructures", structures =  new JU.Lst ());
return structures;
});
Clazz.defineMethod (c$, "getFileData", 
 function (ext) {
var fileName = this.htParams.get ("fullPathName");
var pt = fileName.lastIndexOf (".");
if (pt < 0) pt = fileName.length;
fileName = fileName.substring (0, pt);
this.moData.put ("nboRoot", fileName);
fileName += ext;
var data = this.vwr.getFileAsString3 (fileName, false, null);
JU.Logger.info (data.length + " bytes read from " + fileName);
var isError = (data.indexOf ("java.io.") >= 0);
if (data.length == 0 || isError && this.nboType !== "AO") throw  new Exception (" supplemental file " + fileName + " was not found");
return (isError ? null : data);
}, "~S");
Clazz.defineMethod (c$, "getFile31", 
 function () {
try {
var data = this.getFileData (".31");
if (data == null) return false;
var readerSave = this.reader;
this.reader = JU.Rdr.getBR (data);
return (this.readData31 (null) && (this.reader = readerSave) != null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "getFile46", 
 function () {
var data = this.getFileData (".46");
if (data == null) return;
var readerSave = this.reader;
this.reader = JU.Rdr.getBR (data);
this.readData46 ();
this.reader = readerSave;
});
Clazz.defineMethod (c$, "readData47", 
 function () {
this.allowNoOrbitals = true;
this.discardLinesUntilContains ("$COORD");
this.asc.newAtomSet ();
this.asc.setAtomSetName (this.rd ().trim ());
while (this.rd ().indexOf ("$END") < 0) {
var tokens = this.getTokens ();
this.addAtomXYZSymName (tokens, 2, null, null).elementNumber = this.parseIntStr (tokens[0]);
}
if (this.doReadMolecularOrbitals && !this.getFile31 ()) {
this.alphaOnly = true;
this.betaOnly = false;
this.discardLinesUntilContains ("$BASIS");
this.appendLoadNote ("basis AOs are unnormalized");
var centers = this.getIntData ();
var labels = this.getIntData ();
this.discardLinesUntilContains ("NSHELL =");
this.shellCount = this.parseIntAt (this.line, 10);
this.gaussianCount = this.parseIntAt (this.rd (), 10);
this.rd ();
var ncomp = this.getIntData ();
var nprim = this.getIntData ();
var nptr = this.getIntData ();
this.shells =  new JU.Lst ();
this.gaussians = JU.AU.newFloat2 (this.gaussianCount);
for (var i = 0; i < this.gaussianCount; i++) this.gaussians[i] =  Clazz.newFloatArray (6, 0);

this.nOrbitals = 0;
var ptCenter = 0;
var l = this.line;
for (var i = 0; i < this.shellCount; i++) {
var slater =  Clazz.newIntArray (4, 0);
var nc = ncomp[i];
slater[0] = centers[ptCenter];
this.line = "";
for (var ii = 0; ii < nc; ii++) this.line += labels[ptCenter++] + " ";

if (!this.fillSlater (slater, nc, nptr[i] - 1, nprim[i])) return;
}
this.line = l;
this.getAlphasAndExponents ();
this.nboType = "AO";
this.readMOs ();
}this.continuing = false;
});
Clazz.defineMethod (c$, "getIntData", 
 function () {
while (this.line.indexOf ("=") < 0) this.rd ();

var s = this.line.substring (this.line.indexOf ("=") + 1);
this.line = "";
while (this.rd ().indexOf ("=") < 0 && this.line.indexOf ("$") < 0) s += this.line;

var tokens = JU.PT.getTokens (s);
var f =  Clazz.newIntArray (tokens.length, 0);
for (var i = f.length; --i >= 0; ) f[i] = this.parseIntStr (tokens[i]);

return f;
});
Clazz.defineMethod (c$, "fillSlater", 
 function (slater, n, pt, ng) {
this.nOrbitals += n;
switch (n) {
case 1:
slater[1] = 0;
break;
case 3:
if (!this.getDFMap ("P", this.line, 1, J.adapter.readers.quantum.GenNBOReader.$P_LIST, 3)) return false;
slater[1] = 1;
break;
case 4:
if (!this.getDFMap ("SP", this.line, 2, J.adapter.readers.quantum.GenNBOReader.SP_LIST, 1)) return false;
slater[1] = 2;
break;
case 5:
if (!this.getDFMap ("DS", this.line, 3, J.adapter.readers.quantum.GenNBOReader.$DS_LIST, 3)) return false;
slater[1] = 3;
break;
case 6:
if (!this.getDFMap ("DC", this.line, 4, J.adapter.readers.quantum.GenNBOReader.$DC_LIST, 3)) return false;
slater[1] = 4;
break;
case 7:
if (!this.getDFMap ("FS", this.line, 5, J.adapter.readers.quantum.GenNBOReader.$FS_LIST, 3)) return false;
slater[1] = 5;
break;
case 10:
if (!this.getDFMap ("FC", this.line, 6, J.adapter.readers.quantum.GenNBOReader.$FC_LIST, 3)) return false;
slater[1] = 6;
break;
case 9:
if (!this.getDFMap ("GS", this.line, 7, J.adapter.readers.quantum.GenNBOReader.GS_LIST, 3)) return false;
slater[1] = 7;
break;
case 15:
if (!this.getDFMap ("GC", this.line, 8, J.adapter.readers.quantum.GenNBOReader.GC_LIST, 3)) return false;
slater[1] = 8;
break;
case 11:
if (!this.getDFMap ("HS", this.line, 9, J.adapter.readers.quantum.GenNBOReader.HS_LIST, 3)) return false;
slater[1] = 9;
break;
case 21:
if (!this.getDFMap ("HC", this.line, 10, J.adapter.readers.quantum.GenNBOReader.HC_LIST, 3)) return false;
slater[1] = 10;
break;
case 13:
if (!this.getDFMap ("IS", this.line, 11, J.adapter.readers.quantum.GenNBOReader.IS_LIST, 3)) return false;
slater[1] = 11;
break;
case 28:
if (!this.getDFMap ("IC", this.line, 12, J.adapter.readers.quantum.GenNBOReader.IC_LIST, 3)) return false;
slater[1] = 12;
break;
default:
JU.Logger.error ("Unrecognized orbital slater count: " + n);
break;
}
slater[2] = pt + 1;
slater[3] = ng;
this.shells.addLast (slater);
return true;
}, "~A,~N,~N,~N");
Clazz.defineMethod (c$, "getAlphasAndExponents", 
 function () {
for (var j = 0; j < 5; j++) {
if (this.line.indexOf ("=") < 0) this.rd ();
if (this.line.indexOf ("$END") >= 0) break;
this.line = this.line.substring (this.line.indexOf ("=") + 1);
var temp = this.fillFloatArray (this.line, 0,  Clazz.newFloatArray (this.gaussianCount, 0));
for (var i = 0; i < this.gaussianCount; i++) {
this.gaussians[i][j] = temp[i];
if (j > 1) this.gaussians[i][5] += temp[i];
}
}
for (var i = 0; i < this.gaussianCount; i++) {
if (this.gaussians[i][1] == 0) this.gaussians[i][1] = this.gaussians[i][5];
}
if (this.debugging) {
JU.Logger.debug (this.shells.size () + " slater shells read");
JU.Logger.debug (this.gaussians.length + " gaussian primitives read");
}});
Clazz.defineMethod (c$, "readData31", 
 function (line1) {
if (line1 == null) {
line1 = this.rd ();
this.rd ();
}this.rd ();
var tokens = JU.PT.getTokens (this.rd ());
var ac = this.parseIntStr (tokens[0]);
this.shellCount = this.parseIntStr (tokens[1]);
this.gaussianCount = this.parseIntStr (tokens[2]);
if (tokens.length < 4) JU.Logger.error ("NOTE! .31 file is old; d orbitals are not normalized");
this.rd ();
this.asc.newAtomSet ();
this.asc.setAtomSetName (this.nboType + "s: " + line1.trim ());
this.asc.setCurrentModelInfo ("nboType", this.nboType);
for (var i = 0; i < ac; i++) {
tokens = JU.PT.getTokens (this.rd ());
var z = this.parseIntStr (tokens[0]);
if (z < 0) continue;
var atom = this.asc.addNewAtom ();
atom.elementNumber = z;
this.setAtomCoordTokens (atom, tokens, 1);
}
this.shells =  new JU.Lst ();
this.gaussians = JU.AU.newFloat2 (this.gaussianCount);
for (var i = 0; i < this.gaussianCount; i++) this.gaussians[i] =  Clazz.newFloatArray (6, 0);

this.rd ();
this.nOrbitals = 0;
for (var i = 0; i < this.shellCount; i++) {
tokens = JU.PT.getTokens (this.rd ());
var slater =  Clazz.newIntArray (4, 0);
slater[0] = this.parseIntStr (tokens[0]);
var n = this.parseIntStr (tokens[1]);
var pt = this.parseIntStr (tokens[2]) - 1;
var ng = this.parseIntStr (tokens[3]);
this.line = this.rd ();
for (var j = Clazz.doubleToInt ((n - 1) / 10); --j >= 0; ) this.line += this.rd ().substring (1);

this.line = this.line.trim ();
System.out.println (this.line);
if (!this.fillSlater (slater, n, pt, ng)) return false;
}
this.rd ();
this.getAlphasAndExponents ();
return true;
}, "~S");
Clazz.defineMethod (c$, "readData46", 
 function () {
var map =  new java.util.Hashtable ();
var tokens =  new Array (0);
this.rd ();
var nNOs = this.nNOs = this.nAOs = this.nOrbitals;
var labelKey = J.adapter.readers.quantum.GenNBOReader.getLabelKey (this.nboType);
while (this.line != null && this.line.length > 0) {
tokens = JU.PT.getTokens (this.line);
var type = tokens[0];
this.isOpenShell = (tokens.length == 3);
var ab = (this.isOpenShell ? tokens[1] : "");
var count = tokens[tokens.length - 1];
var key = (ab.equals ("BETA") ? "beta_" : "") + type;
if (this.parseIntStr (count) != this.nOrbitals) {
JU.Logger.error ("file 46 number of orbitals for " + this.line + " (" + count + ") does not match nOrbitals: " + this.nOrbitals + "\n");
nNOs = this.parseIntStr (count);
}if (type.equals (labelKey)) this.nNOs = nNOs;
var sb =  new JU.SB ();
while (this.rd () != null && this.line.length > 4 && " NA NB AO NH".indexOf (this.line.substring (1, 4)) < 0) sb.append (this.line.substring (1));

System.out.println (sb.length ());
tokens =  new Array (Clazz.doubleToInt (sb.length () / 10));
for (var i = 0, pt = 0; i < tokens.length; i++, pt += 10) tokens[i] = JU.PT.rep (sb.substring2 (pt, pt + 10), " ", "");

map.put (key, tokens);
}
tokens = map.get ((this.betaOnly ? "beta_" : "") + labelKey);
this.moData.put ("nboLabelMap", map);
if (tokens == null) {
tokens =  new Array (nNOs);
for (var i = 0; i < nNOs; i++) tokens[i] = this.nboType + (i + 1);

map.put (labelKey, tokens);
if (this.isOpenShell) map.put ("beta_" + labelKey, tokens);
}this.moData.put ("nboLabels", tokens);
this.addBetaSet = (this.isOpenShell && !this.betaOnly && !this.is47File);
if (this.addBetaSet) this.nOrbitals *= 2;
for (var i = 0; i < this.nOrbitals; i++) this.setMO ( new java.util.Hashtable ());

J.adapter.readers.quantum.GenNBOReader.setNboLabels (tokens, nNOs, this.orbitals, this.nOrbitals0, this.nboType);
if (this.addBetaSet) {
this.moData.put ("firstBeta", Integer.$valueOf (nNOs));
J.adapter.readers.quantum.GenNBOReader.setNboLabels (map.get ("beta_" + labelKey), nNOs, this.orbitals, this.nOrbitals0 + nNOs, this.nboType);
}var structures = this.getStructureList ();
J.adapter.readers.quantum.NBOParser.getStructures46 (map.get ("NBO"), "alpha", structures, this.asc.ac);
J.adapter.readers.quantum.NBOParser.getStructures46 (map.get ("beta_NBO"), "beta", structures, this.asc.ac);
});
c$.getLabelKey = Clazz.defineMethod (c$, "getLabelKey", 
 function (labelKey) {
if (labelKey.startsWith ("P")) labelKey = labelKey.substring (1);
if (labelKey.equals ("NLMO")) labelKey = "NBO";
if (labelKey.equals ("MO")) labelKey = "NO";
return labelKey;
}, "~S");
c$.readNBOCoefficients = Clazz.defineMethod (c$, "readNBOCoefficients", 
function (moData, nboType, vwr) {
var ext = ";AO;  ;PNAO;;NAO; ;PNHO;;NHO; ;PNBO;;NBO; ;PNLMO;NLMO;;MO;  ;NO;".indexOf (";" + nboType + ";");
ext = Clazz.doubleToInt (ext / 6) + 31;
var isAO = nboType.equals ("AO");
var isNBO = nboType.equals ("NBO");
var hasNoBeta = JU.PT.isOneOf (nboType, ";AO;PNAO;NAO;");
var map = moData.get ("nboLabelMap");
var nAOs = map.get ("AO").length;
var labelKey = J.adapter.readers.quantum.GenNBOReader.getLabelKey (nboType);
var nboLabels = map.get (labelKey);
if (nboLabels == null) {
nboLabels =  new Array (nAOs);
for (var i = 0; i < nAOs; i++) nboLabels[i] = nboType + (i + 1);

labelKey = nboType;
map.put (labelKey, nboLabels);
if (!hasNoBeta) map.put ("beta_" + labelKey, nboLabels);
}var nMOs = nboLabels.length;
try {
var orbitals = moData.get (nboType + "_coefs");
if (orbitals == null) {
var data = null;
if (!isAO) {
var fileName = moData.get ("nboRoot") + "." + ext;
if ((data = vwr.getFileAsString3 (fileName, true, null)) == null) return false;
data = data.substring (data.indexOf ("--\n") + 3).toLowerCase ();
if (ext == 33) data = data.substring (0, data.indexOf ("--\n") + 3);
}orbitals = moData.get ("mos");
var dfCoefMaps = orbitals.get (0).get ("dfCoefMaps");
orbitals =  new JU.Lst ();
var len = 0;
var next = null;
var nOrbitals = nMOs;
if (!isAO) {
if (data.indexOf ("alpha") >= 0) {
nOrbitals *= 2;
data = data.substring (data.indexOf ("alpha") + 10);
}len = data.length;
next =  Clazz.newIntArray (1, 0);
}for (var i = nOrbitals; --i >= 0; ) {
var mo =  new java.util.Hashtable ();
orbitals.addLast (mo);
if (dfCoefMaps != null) mo.put ("dfCoefMaps", dfCoefMaps);
}
J.adapter.readers.quantum.GenNBOReader.setNboLabels (nboLabels, nMOs, orbitals, 0, nboType);
for (var i = 0; i < nOrbitals; i++) {
if (!isAO && i == nMOs) {
if (isNBO) J.adapter.readers.quantum.GenNBOReader.getNBOOccupanciesStatic (orbitals, nMOs, 0, data, len, next);
nboLabels = map.get ("beta_" + labelKey);
next[0] = (hasNoBeta ? 0 : data.indexOf ("beta  spin") + 12);
}var mo = orbitals.get (i);
var coefs =  Clazz.newFloatArray (nAOs, 0);
if (isAO) {
coefs[i % nAOs] = 1;
} else if (i >= nAOs && hasNoBeta) {
coefs = orbitals.get (i % nAOs).get ("coefficients");
} else {
for (var j = 0; j < nAOs; j++) {
coefs[j] = JU.PT.parseFloatChecked (data, len, next, false);
if (Float.isNaN (coefs[j])) System.out.println ("oops = IsoExt ");
}
}mo.put ("coefficients", coefs);
}
if (isNBO) J.adapter.readers.quantum.GenNBOReader.getNBOOccupanciesStatic (orbitals, nMOs, nOrbitals - nMOs, data, len, next);
moData.put (nboType + "_coefs", orbitals);
}moData.put ("nboType", nboType);
moData.put ("nboLabels", nboLabels);
moData.put ("mos", orbitals);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
return false;
} else {
throw e;
}
}
return true;
}, "java.util.Map,~S,JV.Viewer");
c$.getNBOOccupanciesStatic = Clazz.defineMethod (c$, "getNBOOccupanciesStatic", 
 function (orbitals, nAOs, pt, data, len, next) {
var occupancies =  Clazz.newFloatArray (nAOs, 0);
for (var j = 0; j < nAOs; j++) occupancies[j] = JU.PT.parseFloatChecked (data, len, next, false);

for (var i = 0; i < nAOs; i++) {
var mo = orbitals.get (pt + i);
mo.put ("occupancy", Float.$valueOf (occupancies[i]));
}
}, "JU.Lst,~N,~N,~S,~N,~A");
Clazz.defineMethod (c$, "readMOs", 
 function () {
var isAO = this.nboType.equals ("AO");
var isNBO = this.nboType.equals ("NBO");
var discardExtra = JU.PT.isOneOf (this.nboType, ";NBO;NLMO;");
var hasNoBeta = JU.PT.isOneOf (this.nboType, ";AO;PNAO;NAO;");
this.nOrbitals0 = this.orbitals.size ();
this.getFile46 ();
if (this.betaOnly) {
this.discardLinesUntilContains ("BETA");
this.filterMO ();
}this.nOrbitals = this.orbitals.size ();
if (this.nOrbitals == 0) return;
this.line = null;
var pt = 0;
for (var i = this.nOrbitals0, n = this.nOrbitals0 + this.nOrbitals; i < n; i++, pt++) {
if (pt == this.nNOs) {
if (isNBO) {
this.readNBO37Occupancies (pt);
}if (discardExtra) this.discardLinesUntilContains2 ("BETA", "beta");
}var mo = this.orbitals.get (i);
var coefs =  Clazz.newFloatArray (this.nAOs, 0);
if (isAO) {
coefs[pt % this.nAOs] = 1;
} else if (pt >= this.nNOs && hasNoBeta) {
coefs = this.orbitals.get (pt % this.nNOs).get ("coefficients");
} else {
if (this.line == null) {
while (this.rd () != null && Float.isNaN (this.parseFloatStr (this.line))) {
this.filterMO ();
}
} else {
this.line = null;
}this.fillFloatArray (this.line, 0, coefs);
this.line = null;
}mo.put ("coefficients", coefs);
}
if (isNBO) this.readNBO37Occupancies (pt);
this.moData.put (this.nboType + "_coefs", this.orbitals);
this.setMOData (false);
this.moData.put ("nboType", this.nboType);
JU.Logger.info ((this.orbitals.size () - this.nOrbitals0) + " orbitals read");
});
Clazz.defineMethod (c$, "readNBO37Occupancies", 
 function (pt) {
var occupancies =  Clazz.newFloatArray (this.nNOs, 0);
this.fillFloatArray (null, 0, occupancies);
for (var i = 0; i < this.nNOs; i++) {
var mo = this.orbitals.get (this.nOrbitals0 + pt - this.nNOs + i);
mo.put ("occupancy", Float.$valueOf (occupancies[i]));
}
}, "~N");
c$.setNboLabels = Clazz.defineMethod (c$, "setNboLabels", 
function (tokens, nLabels, orbitals, nOrbitals0, moType) {
var alphaBeta = (orbitals.size () == nLabels * 2);
var addOccupancy = !JU.PT.isOneOf (moType, ";AO;NAO;PNAO;MO;NO;");
var ab = (!alphaBeta ? "" : nOrbitals0 == 0 ? " alpha" : " beta");
for (var j = 0; j < nLabels; j++) {
var mo = orbitals.get (j + nOrbitals0);
var type = tokens[j];
mo.put ("type", moType + " " + type + ab);
if (addOccupancy) mo.put ("occupancy", Float.$valueOf (alphaBeta ? 1 : type.indexOf ("*") >= 0 || type.indexOf ("(ry)") >= 0 ? 0 : 2));
}
}, "~A,~N,JU.Lst,~N,~S");
Clazz.defineStatics (c$,
"$P_LIST", "101   102   103",
"SP_LIST", "1     101   102   103",
"$DS_LIST", "255   252   253   254   251",
"$DC_LIST", "201   204   206   202   203   205",
"$FS_LIST", "351   352   353   354   355   356   357",
"$FC_LIST", "301   307   310   304   302   303   306   309   308   305",
"GS_LIST", "451   452   453   454   455   456   457   458   459",
"GC_LIST", "415   414   413   412   411   410   409   408   407   406   405   404   403   402   401",
"HS_LIST", "551   552   553   554   555   556   557   558   559   560   561",
"HC_LIST", "521   520   519   518   517   516   515   514   513   512   511   510   509   508   507   506   505   504   503   502   501",
"IS_LIST", "651   652   653   654   655   656   657   658   659   660   661   662   663",
"IC_LIST", "628   627   626   625   624   623   622   621   620   619   618   617   616   615   614   613   612   611   610   609   608   607   606   605   604   603   602   601");
});
