Clazz.declarePackage ("J.adapter.readers.pdb");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "java.util.Hashtable"], "J.adapter.readers.pdb.PdbReader", ["java.lang.Boolean", "$.Float", "JU.Lst", "$.M4", "$.P3", "$.PT", "$.SB", "J.adapter.smarter.Atom", "$.Structure", "J.api.JmolAdapter", "J.c.STR", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.serMode = 0;
this.seqMode = 0;
this.serial = 0;
this.lineLength = 0;
this.pdbHeader = null;
this.applySymmetry = false;
this.getTlsGroups = false;
this.isMultiModel = false;
this.haveMappedSerials = false;
this.isConnectStateBug = false;
this.isLegacyModelType = false;
this.gromacsWideFormat = false;
this.htFormul = null;
this.htHetero = null;
this.htSites = null;
this.htElementsInCurrentGroup = null;
this.htMolIds = null;
this.vCompnds = null;
this.vBiomolecules = null;
this.vTlsModels = null;
this.sbTlsErrors = null;
this.biomtChainAtomCounts = null;
this.sbIgnored = null;
this.sbSelected = null;
this.sbConect = null;
this.sb = null;
this.ac = 0;
this.maxSerial = 0;
this.nUNK = 0;
this.nRes = 0;
this.currentCompnd = null;
this.currentGroup3 = null;
this.currentKey = null;
this.currentResno = -2147483648;
this.configurationPtr = -2147483648;
this.resetKey = true;
this.$compnd = null;
this.conformationIndex = 0;
this.fileAtomIndex = 0;
this.lastAltLoc = '\0';
this.lastGroup = -2147483648;
this.lastInsertion = '\0';
this.lastSourceSerial = -2147483648;
this.lastTargetSerial = -2147483648;
this.tlsGroupID = 0;
this.atomTypePt0 = 0;
this.atomTypeLen = 0;
this.isCourseGrained = false;
this.isbiomol = false;
this.htGroup1 = null;
this.maxLength = 80;
this.pdbID = null;
this.haveDoubleBonds = false;
this.$cryst1 = 0;
this.fileSgName = null;
this.dataT = null;
this.tlsU = null;
this.vConnect = null;
this.connectNextAtomIndex = 0;
this.connectNextAtomSet = 0;
this.connectLast = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.pdb, "PdbReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.htFormul =  new java.util.Hashtable ();
this.dataT =  Clazz.newFloatArray (8, 0);
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.allowPDBFilter = true;
this.pdbHeader = (this.getHeader ?  new JU.SB () : null);
this.applySymmetry = !this.checkFilterKey ("NOSYMMETRY");
if (this.isDSSP1) this.asc.setInfo ("isDSSP1", Boolean.TRUE);
this.getTlsGroups = this.checkFilterKey ("TLS");
if (this.checkFilterKey ("ASSEMBLY")) this.filter = JU.PT.rep (this.filter, "ASSEMBLY", "BIOMOLECULE");
this.isbiomol = this.checkFilterKey ("BIOMOLECULE");
if (this.isbiomol) this.filter = this.filter.$replace (':', ' ');
var byChain = this.isbiomol && this.checkFilterKey ("BYCHAIN");
var bySymop = this.isbiomol && this.checkFilterKey ("BYSYMOP");
this.isCourseGrained = byChain || bySymop;
if (!this.isCourseGrained) this.setIsPDB ();
this.isConcatenated = new Boolean (this.isConcatenated | this.filePath.endsWith (".dssr")).valueOf ();
if (this.htParams.containsKey ("vTlsModels")) {
this.vTlsModels = this.htParams.remove ("vTlsModels");
}var s = this.getFilter ("TYPE ");
if (s != null) {
var tokens = JU.PT.getTokens (s.$replace (',', ' '));
this.atomTypePt0 = Integer.parseInt (tokens[0]) - 1;
var pt = tokens[1].indexOf ("=");
if (pt >= 0) {
this.setFilterAtomTypeStr (tokens[1].substring (pt + 1).toUpperCase ());
} else {
pt = tokens[1].length;
}this.atomTypeLen = Integer.parseInt (tokens[1].substring (0, pt));
}var conf = this.getFilter ("CONF ");
if (conf != null) {
this.configurationPtr = this.parseIntStr (conf);
this.sbIgnored =  new JU.SB ();
this.sbSelected =  new JU.SB ();
}this.isLegacyModelType = (this.stateScriptVersionInt < 120000);
this.isConnectStateBug = (this.stateScriptVersionInt >= 120151 && this.stateScriptVersionInt <= 120220 || this.stateScriptVersionInt >= 120300 && this.stateScriptVersionInt <= 120320);
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
var ptOption = ((this.lineLength = this.line.length) < 6 ? -1 : "ATOM    HETATM  MODEL   CONECT  HELIX   SHEET   TURN    HET     HETNAM  ANISOU  SITE    CRYST1  SCALE1  SCALE2  SCALE3  EXPDTA  FORMUL  REMARK  HEADER  COMPND  SOURCE  TITLE   SEQADV  ".indexOf (this.line.substring (0, 6))) >> 3;
var isAtom = (ptOption == 0 || ptOption == 1);
var isModel = (ptOption == 2);
this.serial = (isAtom ? this.getSerial (6, 11) : 0);
var forceNewModel = ((this.isTrajectory || this.isSequential) && !this.isMultiModel && isAtom && this.serial == 1);
if (this.getHeader) {
if (isAtom || isModel) this.getHeader = false;
 else this.readHeader (false);
}if (isModel || forceNewModel) {
this.isMultiModel = isModel;
this.getHeader = false;
var modelNo = (forceNewModel ? this.modelNumber + 1 : this.getModelNumber ());
this.modelNumber = (this.useFileModelNumbers ? modelNo : this.modelNumber + 1);
if (!this.doGetModel (this.modelNumber, null)) {
this.handleTlsMissingModels ();
var isOK = this.checkLastModel ();
if (!isOK && this.isConcatenated) isOK = this.continuing = true;
return isOK;
}if (!this.isCourseGrained) this.connectAll (this.maxSerial, this.isConnectStateBug);
if (this.ac > 0) this.applySymmetryAndSetTrajectory ();
this.model (modelNo);
if (this.isLegacyModelType || !isAtom) return true;
}if (this.isMultiModel && !this.doProcessLines) {
return true;
}if (isAtom) {
this.getHeader = false;
this.atom ();
return true;
}switch (ptOption) {
case 3:
this.conect ();
return true;
case 4:
case 5:
case 6:
if (!this.ignoreStructure) this.structure ();
return true;
case 7:
this.het ();
return true;
case 8:
this.hetnam ();
return true;
case 9:
this.anisou ();
return true;
case 10:
this.site ();
return true;
case 11:
this.cryst1 ();
return true;
case 12:
case 13:
case 14:
this.scale (ptOption - 11);
return true;
case 15:
this.expdta ();
return true;
case 16:
this.formul ();
return true;
case 17:
if (this.line.startsWith ("REMARK 285")) return this.remark285 ();
if (this.line.startsWith ("REMARK 350")) return this.remark350 ();
if (this.line.startsWith ("REMARK 290")) return this.remark290 ();
if (this.line.contains ("This file does not adhere to the PDB standard")) {
this.gromacsWideFormat = true;
}if (this.getTlsGroups) {
if (this.line.indexOf ("TLS DETAILS") > 0) return this.remarkTls ();
}this.checkRemark ();
return true;
case 18:
this.header ();
return true;
case 19:
case 20:
this.compnd (ptOption == 20);
return true;
case 21:
this.title ();
return true;
case 22:
this.seqAdv ();
return true;
}
return true;
});
Clazz.defineMethod (c$, "checkRemark", 
function () {
this.checkCurrentLineForScript ();
});
Clazz.defineMethod (c$, "seqAdv", 
 function () {
var g1 = this.line.substring (39, 42).trim ().toLowerCase ();
if (g1.length != 1) return;
if (this.htGroup1 == null) this.asc.setInfo ("htGroup1", this.htGroup1 =  new java.util.Hashtable ());
var g3 = this.line.substring (12, 15).trim ();
this.htGroup1.put (g3, g1);
});
Clazz.defineMethod (c$, "readHeader", 
 function (getLine) {
if (getLine) {
this.rd ();
if (!this.getHeader) return this.line;
}this.pdbHeader.append (this.line).appendC ('\n');
return this.line;
}, "~B");
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.finalizeReaderPDB ();
});
Clazz.defineMethod (c$, "finalizeReaderPDB", 
function () {
this.checkNotPDB ();
if (this.pdbID != null) {
this.asc.setAtomSetName (this.pdbID);
this.asc.setCurrentModelInfo ("pdbID", this.pdbID);
}this.checkUnitCellParams ();
if (!this.isCourseGrained) this.connectAll (this.maxSerial, this.isConnectStateBug);
var symmetry;
if (this.vBiomolecules != null && this.vBiomolecules.size () > 0 && this.asc.ac > 0) {
this.asc.setCurrentModelInfo ("biomolecules", this.vBiomolecules);
this.setBiomoleculeAtomCounts ();
if (this.thisBiomolecule != null && this.applySymmetry) {
this.asc.getXSymmetry ().applySymmetryBio (this.thisBiomolecule, this.applySymmetryToBonds, this.filter);
this.vTlsModels = null;
this.asc.xtalSymmetry = null;
}}if (this.vTlsModels != null) {
symmetry = this.getInterface ("JS.Symmetry");
var n = this.asc.atomSetCount;
if (n == this.vTlsModels.size ()) {
for (var i = n; --i >= 0; ) this.setTlsGroups (i, i, symmetry);

} else {
JU.Logger.info (n + " models but " + this.vTlsModels.size () + " TLS descriptions");
if (this.vTlsModels.size () == 1) {
JU.Logger.info (" -- assuming all models have the same TLS description -- check REMARK 3 for details.");
for (var i = n; --i >= 0; ) this.setTlsGroups (0, i, symmetry);

}}this.checkForResidualBFactors (symmetry);
}if (this.sbTlsErrors != null) {
this.asc.setInfo ("tlsErrors", this.sbTlsErrors.toString ());
this.appendLoadNote (this.sbTlsErrors.toString ());
}this.doCheckUnitCell = new Boolean (this.doCheckUnitCell & (this.iHaveUnitCell && this.doApplySymmetry)).valueOf ();
if (this.doCheckUnitCell && this.isbiomol) {
this.ignoreFileSpaceGroupName = true;
this.sgName = this.fileSgName;
this.fractionalizeCoordinates (true);
this.asc.setModelInfoForSet ("biosymmetry", null, this.asc.iSet);
this.asc.checkSpecial = false;
}if (this.latticeCells != null && this.latticeCells[0] != 0) this.addJmolScript ("unitcell;axes on;axes unitcell;");
this.finalizeReaderASCR ();
if (this.vCompnds != null) {
this.asc.setInfo ("compoundSource", this.vCompnds);
for (var i = this.asc.iSet + 1; --i >= 0; ) this.asc.setModelInfoForSet ("compoundSource", this.vCompnds, i);

}if (this.htSites != null) {
this.addSites (this.htSites);
}if (this.pdbHeader != null) this.asc.setInfo ("fileHeader", this.pdbHeader.toString ());
if (this.configurationPtr > 0) {
JU.Logger.info (this.sbSelected.toString ());
JU.Logger.info (this.sbIgnored.toString ());
}});
Clazz.defineMethod (c$, "checkUnitCellParams", 
 function () {
if (this.iHaveUnitCell) {
this.asc.setCurrentModelInfo ("unitCellParams", this.unitCellParams);
if (this.sgName != null) this.asc.setCurrentModelInfo ("spaceGroup", this.sgName);
}});
Clazz.defineMethod (c$, "checkForResidualBFactors", 
 function (symmetry) {
var atoms = this.asc.atoms;
var isResidual = false;
for (var i = this.asc.ac; --i >= 0; ) {
var anisou = this.tlsU.get (atoms[i]);
if (anisou == null) continue;
var resid = anisou[7] - (anisou[0] + anisou[1] + anisou[2]) / 3;
if (resid < 0 || Float.isNaN (resid)) {
isResidual = true;
break;
}}
JU.Logger.info ("TLS analysis suggests Bfactors are " + (isResidual ? "" : "NOT") + " residuals");
for (var entry, $entry = this.tlsU.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var anisou = entry.getValue ();
var resid = anisou[7];
if (resid == 0) continue;
if (!isResidual) resid -= (anisou[0] + anisou[1] + anisou[2]) / 3;
anisou[0] += resid;
anisou[1] += resid;
anisou[2] += resid;
entry.getKey ().addTensor (symmetry.getTensor (this.vwr, anisou).setType (null), "TLS-R", false);
JU.Logger.info ("TLS-U:  " + JU.Escape.eAF (anisou));
anisou = (entry.getKey ().anisoBorU);
if (anisou != null) JU.Logger.info ("ANISOU: " + JU.Escape.eAF (anisou));
}
this.tlsU = null;
}, "J.api.SymmetryInterface");
Clazz.defineMethod (c$, "header", 
 function () {
if (this.lineLength < 8) return;
this.appendLoadNote (this.line.substring (7).trim ());
if (this.lineLength == 80) this.maxLength = 72;
this.pdbID = (this.lineLength >= 66 ? this.line.substring (62, 66).trim () : "");
if (this.pdbID.length == 4) {
this.asc.setCollectionName (this.pdbID);
this.asc.setInfo ("havePDBHeaderName", Boolean.TRUE);
}if (this.lineLength > 50) this.line = this.line.substring (0, 50);
this.asc.setInfo ("CLASSIFICATION", this.line.substring (7).trim ());
});
Clazz.defineMethod (c$, "title", 
 function () {
if (this.lineLength > 10) this.appendLoadNote (this.line.substring (10, Math.min (this.maxLength, this.line.length)).trim ());
});
Clazz.defineMethod (c$, "compnd", 
 function (isSource) {
if (!isSource) {
if (this.$compnd == null) this.$compnd = "";
 else this.$compnd += " ";
var s = this.line;
if (this.lineLength > 62) s = s.substring (0, 62);
this.$compnd += s.substring (10).trim ();
this.asc.setInfo ("COMPND", this.$compnd);
}if (this.vCompnds == null) {
if (isSource) return;
this.vCompnds =  new JU.Lst ();
this.htMolIds =  new java.util.Hashtable ();
this.currentCompnd =  new java.util.Hashtable ();
this.currentCompnd.put ("select", "(*)");
this.currentKey = "MOLECULE";
this.htMolIds.put ("", this.currentCompnd);
}if (isSource && this.resetKey) {
this.resetKey = false;
this.currentKey = "SOURCE";
this.currentCompnd = this.htMolIds.get ("");
}this.line = this.line.substring (10, Math.min (this.lineLength, 72)).trim ();
var pt = this.line.indexOf (":");
if (pt < 0 || pt > 0 && this.line.charAt (pt - 1) == '\\') pt = this.line.length;
var key = this.line.substring (0, pt).trim ();
var value = (pt < this.line.length ? this.line.substring (pt + 1).trim () : null);
if (key.equals ("MOL_ID")) {
if (value == null) return;
if (isSource) {
this.currentCompnd = this.htMolIds.remove (value);
return;
}this.currentCompnd =  new java.util.Hashtable ();
this.vCompnds.addLast (this.currentCompnd);
this.htMolIds.put (value, this.currentCompnd);
}if (this.currentCompnd == null) return;
if (value == null) {
value = this.currentCompnd.get (this.currentKey);
if (value == null) value = "";
value += key;
if (this.vCompnds.size () == 0) this.vCompnds.addLast (this.currentCompnd);
} else {
this.currentKey = key;
}if (value.endsWith (";")) value = value.substring (0, value.length - 1);
this.currentCompnd.put (this.currentKey, value);
if (this.currentKey.equals ("CHAIN")) this.currentCompnd.put ("select", "(:" + JU.PT.rep (JU.PT.rep (value, ", ", ",:"), " ", "") + ")");
}, "~B");
Clazz.defineMethod (c$, "setBiomoleculeAtomCounts", 
 function () {
for (var i = this.vBiomolecules.size (); --i >= 0; ) {
var biomolecule = this.vBiomolecules.get (i);
var biomts = biomolecule.get ("biomts");
var biomtchains = biomolecule.get ("chains");
var nTransforms = biomts.size ();
var nAtoms = 0;
for (var k = nTransforms; --k >= 0; ) {
var chains = biomtchains.get (k);
for (var j = chains.length - 1; --j >= 0; ) if (chains.charAt (j) == ':') nAtoms += this.biomtChainAtomCounts[0 + chains.charCodeAt (j + 1)];

}
biomolecule.put ("atomCount", Integer.$valueOf (nAtoms));
}
});
Clazz.defineMethod (c$, "remark350", 
 function () {
var biomts = null;
var biomtchains = null;
this.vBiomolecules =  new JU.Lst ();
this.biomtChainAtomCounts =  Clazz.newIntArray (255, 0);
var title = "";
var chainlist = "";
var id = "";
var needLine = true;
var info = null;
var nBiomt = 0;
var mIdent = JU.M4.newM4 (null);
while (true) {
if (needLine) this.readHeader (true);
 else needLine = true;
if (this.line == null || !this.line.startsWith ("REMARK 350")) break;
try {
if (this.line.startsWith ("REMARK 350 BIOMOLECULE:")) {
if (nBiomt > 0) JU.Logger.info ("biomolecule " + id + ": number of transforms: " + nBiomt);
info =  new java.util.Hashtable ();
id = this.line.substring (this.line.indexOf (":") + 1).trim ();
title = this.line.trim ();
info.put ("name", "biomolecule " + id);
info.put ("molecule", id.length == 3 ? id : Integer.$valueOf (this.parseIntStr (id)));
info.put ("title", title);
info.put ("chains", biomtchains =  new JU.Lst ());
info.put ("biomts", biomts =  new JU.Lst ());
this.vBiomolecules.addLast (info);
nBiomt = 0;
}if (this.line.indexOf ("APPLY THE FOLLOWING TO CHAINS:") >= 0) {
if (info == null) {
needLine = false;
this.line = "REMARK 350 BIOMOLECULE: 1  APPLY THE FOLLOWING TO CHAINS:";
continue;
}var list = this.line.substring (41).trim ();
this.appendLoadNote ("found biomolecule " + id + ": " + list);
chainlist = ":" + list.$replace (',', ';').$replace (' ', ':');
needLine = false;
while (this.readHeader (true) != null && this.line.indexOf ("BIOMT") < 0 && this.line.indexOf ("350") == 7) chainlist += ":" + this.line.substring (11).trim ().$replace (',', ';').$replace (' ', ':');

chainlist += ";";
if (this.checkFilterKey ("BIOMOLECULE " + id + ";") || this.checkFilterKey ("BIOMOLECULE=" + id + ";")) {
this.setFilter (this.filter + chainlist);
JU.Logger.info ("filter set to \"" + this.filter + "\"");
this.thisBiomolecule = info;
}continue;
}if (this.line.startsWith ("REMARK 350   BIOMT1 ")) {
nBiomt++;
var mat =  Clazz.newFloatArray (16, 0);
for (var i = 0; i < 12; ) {
var tokens = this.getTokens ();
mat[i++] = this.parseFloatStr (tokens[4]);
mat[i++] = this.parseFloatStr (tokens[5]);
mat[i++] = this.parseFloatStr (tokens[6]);
mat[i++] = this.parseFloatStr (tokens[7]);
if (i == 4 || i == 8) this.readHeader (true);
}
mat[15] = 1;
var m4 =  new JU.M4 ();
m4.setA (mat);
if (m4.equals (mIdent)) {
biomts.add (0, m4);
biomtchains.add (0, chainlist);
} else {
biomts.addLast (m4);
biomtchains.addLast (chainlist);
}continue;
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.thisBiomolecule = null;
this.vBiomolecules = null;
return false;
} else {
throw e;
}
}
}
if (nBiomt > 0) JU.Logger.info ("biomolecule " + id + ": number of transforms: " + nBiomt);
return false;
});
Clazz.defineMethod (c$, "remark285", 
 function () {
return true;
});
Clazz.defineMethod (c$, "remark290", 
 function () {
while (this.readHeader (true) != null && this.line.startsWith ("REMARK 290")) {
if (this.line.indexOf ("NNNMMM   OPERATOR") >= 0) {
while (this.readHeader (true) != null) {
var tokens = this.getTokens ();
if (tokens.length < 4) break;
if (this.doApplySymmetry || this.isbiomol) this.setSymmetryOperator (tokens[3]);
}
}}
return false;
});
Clazz.defineMethod (c$, "getSerial", 
 function (i, j) {
var c = this.line.charAt (i);
var isBase10 = (c == ' ' || this.line.charAt (j - 1) == ' ');
switch (this.serMode) {
default:
case 0:
if (isBase10) return this.parseIntRange (this.line, i, j);
try {
return this.serial = Integer.parseInt (this.line.substring (i, j));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.serMode = (JU.PT.isDigit (c) ? 1 : 2);
return this.getSerial (i, j);
} else {
throw e;
}
}
case 2:
return (isBase10 || JU.PT.isDigit (c) ? this.parseIntRange (this.line, i, j) : JU.PT.parseIntRadix (this.line.substring (i, j), 36) + (JU.PT.isUpperCase (c) ? -16696160 : 26973856));
case 1:
if (!isBase10) return this.serial = JU.PT.parseIntRadix (this.line.substring (i, j), 16);
this.serMode = 0;
return this.getSerial (i, j);
}
}, "~N,~N");
Clazz.defineMethod (c$, "getSeqNo", 
 function (i, j) {
var c = this.line.charAt (i);
var isBase10 = (c == ' ' || this.line.charAt (j - 1) == ' ');
switch (this.seqMode) {
default:
case 0:
if (isBase10) return this.parseIntRange (this.line, i, j);
try {
return Integer.parseInt (this.line.substring (i, j));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.seqMode = (JU.PT.isDigit (c) ? 1 : 2);
return this.getSeqNo (i, j);
} else {
throw e;
}
}
case 2:
return (isBase10 || JU.PT.isDigit (c) ? this.parseIntRange (this.line, i, j) : JU.PT.parseIntRadix (this.line.substring (i, j), 36) + (JU.PT.isUpperCase (c) ? -456560 : 756496));
case 1:
if (!isBase10) return JU.PT.parseIntRadix (this.line.substring (i, j), 16);
this.seqMode = 0;
return this.getSeqNo (i, j);
}
}, "~N,~N");
Clazz.defineMethod (c$, "processAtom", 
function (atom, name, altID, group3, chainID, seqNo, insCode, isHetero, sym) {
atom.atomName = name;
if (altID != ' ') atom.altLoc = altID;
atom.group3 = (group3 == null ? "UNK" : group3);
atom.chainID = chainID;
if (this.biomtChainAtomCounts != null) this.biomtChainAtomCounts[chainID % 256]++;
atom.sequenceNumber = seqNo;
atom.insertionCode = J.api.JmolAdapter.canonizeInsertionCode (insCode);
atom.isHetero = isHetero;
atom.elementSymbol = sym;
return atom;
}, "J.adapter.smarter.Atom,~S,~S,~S,~N,~N,~S,~B,~S");
Clazz.defineMethod (c$, "processAtom2", 
function (atom, serial, x, y, z, charge) {
atom.atomSerial = serial;
if (serial > this.maxSerial) this.maxSerial = serial;
if (atom.group3 == null) {
if (this.currentGroup3 != null) {
this.currentGroup3 = null;
this.currentResno = -2147483648;
this.htElementsInCurrentGroup = null;
}} else if (!atom.group3.equals (this.currentGroup3) || atom.sequenceNumber != this.currentResno) {
this.currentGroup3 = atom.group3;
this.currentResno = atom.sequenceNumber;
this.htElementsInCurrentGroup = this.htFormul.get (atom.group3);
this.nRes++;
if (atom.group3.equals ("UNK")) this.nUNK++;
}this.setAtomCoordXYZ (atom, x, y, z);
atom.formalCharge = charge;
this.setAdditionalAtomParameters (atom);
if (this.haveMappedSerials) this.asc.addAtomWithMappedSerialNumber (atom);
 else this.asc.addAtom (atom);
if (this.ac++ == 0 && !this.isCourseGrained) this.setModelPDB (true);
if (atom.isHetero) {
if (this.htHetero != null) {
this.asc.setCurrentModelInfo ("hetNames", this.htHetero);
this.htHetero = null;
}}}, "J.adapter.smarter.Atom,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "atom", 
 function () {
var isHetero = this.line.startsWith ("HETATM");
var atom = this.processAtom ( new J.adapter.smarter.Atom (), this.line.substring (12, 16).trim (), this.line.charAt (16), this.parseTokenRange (this.line, 17, 20), this.vwr.getChainID (this.line.substring (21, 22), true), this.getSeqNo (22, 26), this.line.charAt (26), isHetero, this.deduceElementSymbol (isHetero));
if (this.atomTypeLen > 0) {
var s = this.line.substring (this.atomTypePt0, this.atomTypePt0 + this.atomTypeLen).trim ();
if (s.length > 0) atom.atomName += "\0" + s;
}if (!this.filterPDBAtom (atom, this.fileAtomIndex++)) return;
var charge = 0;
var x;
var y;
var z;
if (this.gromacsWideFormat) {
x = this.parseFloatRange (this.line, 30, 40);
y = this.parseFloatRange (this.line, 40, 50);
z = this.parseFloatRange (this.line, 50, 60);
} else {
if (this.lineLength >= 80) {
var chMagnitude = this.line.charAt (78);
var chSign = this.line.charAt (79);
if (chSign >= '0' && chSign <= '7') {
var chT = chSign;
chSign = chMagnitude;
chMagnitude = chT;
}if ((chSign == '+' || chSign == '-' || chSign == ' ') && chMagnitude >= '0' && chMagnitude <= '7') {
charge = chMagnitude.charCodeAt (0) - 48;
if (chSign == '-') charge = -charge;
}}x = this.parseFloatRange (this.line, 30, 38);
y = this.parseFloatRange (this.line, 38, 46);
z = this.parseFloatRange (this.line, 46, 54);
}this.processAtom2 (atom, this.serial, x, y, z, charge);
});
Clazz.defineMethod (c$, "filterPDBAtom", 
function (atom, iAtom) {
if (!this.filterAtom (atom, iAtom)) return false;
if (this.configurationPtr > 0) {
if (atom.sequenceNumber != this.lastGroup || atom.insertionCode != this.lastInsertion) {
this.conformationIndex = this.configurationPtr - 1;
this.lastGroup = atom.sequenceNumber;
this.lastInsertion = atom.insertionCode;
this.lastAltLoc = '\0';
}if (atom.altLoc != '\0') {
var msg = " atom [" + atom.group3 + "]" + atom.sequenceNumber + (atom.insertionCode == '\0' ? "" : "^" + atom.insertionCode) + (atom.chainID == 0 ? "" : ":" + this.vwr.getChainIDStr (atom.chainID)) + "." + atom.atomName + "%" + atom.altLoc + "\n";
if (this.conformationIndex >= 0 && atom.altLoc != this.lastAltLoc) {
this.lastAltLoc = atom.altLoc;
this.conformationIndex--;
}if (this.conformationIndex < 0 && atom.altLoc != this.lastAltLoc) {
this.sbIgnored.append ("ignoring").append (msg);
return false;
}this.sbSelected.append ("loading").append (msg);
}}return true;
}, "J.adapter.smarter.Atom,~N");
Clazz.defineMethod (c$, "setAdditionalAtomParameters", 
function (atom) {
var floatOccupancy;
if (this.gromacsWideFormat) {
floatOccupancy = this.parseFloatRange (this.line, 60, 68);
atom.bfactor = J.adapter.readers.pdb.PdbReader.fixRadius (this.parseFloatRange (this.line, 68, 76));
} else {
floatOccupancy = this.parseFloatRange (this.line, 54, 60);
atom.bfactor = this.parseFloatRange (this.line, 60, 66);
}atom.foccupancy = (Float.isNaN (floatOccupancy) ? 1 : floatOccupancy);
}, "J.adapter.smarter.Atom");
Clazz.defineMethod (c$, "deduceElementSymbol", 
function (isHetero) {
if (this.lineLength >= 78) {
var ch76 = this.line.charAt (76);
var ch77 = this.line.charAt (77);
if (ch76 == ' ' && J.adapter.smarter.Atom.isValidSym1 (ch77)) return "" + ch77;
if (J.adapter.smarter.Atom.isValidSymNoCase (ch76, ch77)) return "" + ch76 + ch77;
}var ch12 = this.line.charAt (12);
var ch13 = this.line.charAt (13);
if ((this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get (this.line.substring (12, 14)) != null) && J.adapter.smarter.Atom.isValidSymNoCase (ch12, ch13)) return (isHetero || ch12 != 'H' ? "" + ch12 + ch13 : "H");
if (ch12 == 'H') return "H";
if ((this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get ("" + ch13) != null) && J.adapter.smarter.Atom.isValidSym1 (ch13)) return "" + ch13;
if (ch12 != ' ' && (this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get ("" + ch12) != null) && J.adapter.smarter.Atom.isValidSym1 (ch12)) return "" + ch12;
var ch14 = this.line.charAt (14);
if (ch12 == ' ' && ch13 != 'X' && (this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get (this.line.substring (13, 15)) != null) && J.adapter.smarter.Atom.isValidSymNoCase (ch13, ch14)) return "" + ch13 + ch14;
return "Xx";
}, "~B");
Clazz.defineMethod (c$, "conect", 
 function () {
if (this.sbConect == null) {
this.sbConect =  new JU.SB ();
this.sb =  new JU.SB ();
} else {
this.sb.setLength (0);
}var sourceSerial = this.getSerial (6, 11);
if (sourceSerial < 0) return;
var order = 1;
var pt1 = this.line.trim ().length;
if (pt1 > 56) pt1 = this.line.substring (0, 56).trim ().length;
for (var pt = 11; pt < pt1; pt += 5) {
switch (pt) {
case 31:
order = 2048;
break;
case 41:
continue;
}
var targetSerial = this.getSerial (pt, pt + 5);
if (targetSerial < 0) continue;
var isDoubleBond = (sourceSerial == this.lastSourceSerial && targetSerial == this.lastTargetSerial);
if (isDoubleBond) this.haveDoubleBonds = true;
this.lastSourceSerial = sourceSerial;
this.lastTargetSerial = targetSerial;
var isSwapped = (targetSerial < sourceSerial);
var i1;
if (isSwapped) {
i1 = targetSerial;
targetSerial = sourceSerial;
} else {
i1 = sourceSerial;
}var st = ";" + i1 + " " + targetSerial + ";";
if (this.sbConect.indexOf (st) >= 0 && !isDoubleBond) continue;
if (this.haveDoubleBonds) {
var st1 = "--" + st;
if (this.sbConect.indexOf (st1) >= 0) continue;
this.sb.append (st1);
}this.sbConect.append (st);
this.addConnection ( Clazz.newIntArray (-1, [i1, targetSerial, order]));
}
this.sbConect.appendSB (this.sb);
});
Clazz.defineMethod (c$, "structure", 
 function () {
var structureType = J.c.STR.NONE;
var substructureType = J.c.STR.NONE;
var startChainIDIndex;
var startIndex;
var endChainIDIndex;
var endIndex;
var strandCount = 0;
if (this.line.startsWith ("HELIX ")) {
structureType = J.c.STR.HELIX;
startChainIDIndex = 19;
startIndex = 21;
endChainIDIndex = 31;
endIndex = 33;
if (this.line.length >= 40) substructureType = J.adapter.smarter.Structure.getHelixType (this.parseIntRange (this.line, 38, 40));
} else if (this.line.startsWith ("SHEET ")) {
structureType = J.c.STR.SHEET;
startChainIDIndex = 21;
startIndex = 22;
endChainIDIndex = 32;
endIndex = 33;
strandCount = this.parseIntRange (this.line, 14, 16);
} else if (this.line.startsWith ("TURN  ")) {
structureType = J.c.STR.TURN;
startChainIDIndex = 19;
startIndex = 20;
endChainIDIndex = 30;
endIndex = 31;
} else return;
if (this.lineLength < endIndex + 4) return;
var structureID = this.line.substring (11, 15).trim ();
var serialID = this.parseIntRange (this.line, 7, 10);
var startChainID = this.vwr.getChainID (this.line.substring (startChainIDIndex, startChainIDIndex + 1), true);
var startSequenceNumber = this.parseIntRange (this.line, startIndex, startIndex + 4);
var startInsertionCode = this.line.charAt (startIndex + 4);
var endChainID = this.vwr.getChainID (this.line.substring (endChainIDIndex, endChainIDIndex + 1), true);
var endSequenceNumber = this.parseIntRange (this.line, endIndex, endIndex + 4);
var endInsertionCode = ' ';
if (this.lineLength > endIndex + 4) endInsertionCode = this.line.charAt (endIndex + 4);
if (substructureType === J.c.STR.NONE) substructureType = structureType;
var structure =  new J.adapter.smarter.Structure (-1, structureType, substructureType, structureID, serialID, strandCount, null);
structure.set (startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode, -2147483648, 2147483647);
this.asc.addStructure (structure);
});
Clazz.defineMethod (c$, "getModelNumber", 
 function () {
var startModelColumn = 6;
var endModelColumn = 14;
if (endModelColumn > this.lineLength) endModelColumn = this.lineLength;
var iModel = this.parseIntRange (this.line, startModelColumn, endModelColumn);
return (iModel == -2147483648 ? 0 : iModel);
});
Clazz.defineMethod (c$, "model", 
function (modelNumber) {
this.checkNotPDB ();
this.haveMappedSerials = false;
this.sbConect = null;
this.asc.newAtomSet ();
this.asc.setCurrentModelInfo ("pdbID", this.pdbID);
if (this.asc.iSet == 0 || this.isTrajectory) this.asc.setAtomSetName (this.pdbID);
 else this.asc.setCurrentModelInfo ("name", this.pdbID);
this.checkUnitCellParams ();
if (!this.isCourseGrained) this.setModelPDB (true);
this.asc.setCurrentAtomSetNumber (modelNumber);
if (this.isCourseGrained) this.asc.setCurrentModelInfo ("courseGrained", Boolean.TRUE);
}, "~N");
Clazz.defineMethod (c$, "checkNotPDB", 
 function () {
var isPDB = (!this.isCourseGrained && (this.nRes == 0 || this.nUNK != this.nRes));
this.asc.checkSpecial = !isPDB;
this.setModelPDB (isPDB);
this.nUNK = this.nRes = 0;
this.currentGroup3 = null;
});
Clazz.defineMethod (c$, "cryst1", 
 function () {
var a = this.$cryst1 = this.getFloat (6, 9);
if (a == 1) a = NaN;
this.setUnitCell (a, this.getFloat (15, 9), this.getFloat (24, 9), this.getFloat (33, 7), this.getFloat (40, 7), this.getFloat (47, 7));
if (this.isbiomol) this.doConvertToFractional = false;
if (this.sgName == null || this.sgName.equals ("unspecified!")) this.setSpaceGroupName (JU.PT.parseTrimmedRange (this.line, 55, 66));
this.fileSgName = this.sgName;
});
Clazz.defineMethod (c$, "getFloat", 
 function (ich, cch) {
return this.parseFloatRange (this.line, ich, ich + cch);
}, "~N,~N");
Clazz.defineMethod (c$, "scale", 
 function (n) {
if (this.unitCellParams == null) return;
var pt = n * 4 + 2;
this.unitCellParams[0] = this.$cryst1;
this.setUnitCellItem (pt++, this.getFloat (10, 10));
this.setUnitCellItem (pt++, this.getFloat (20, 10));
this.setUnitCellItem (pt++, this.getFloat (30, 10));
this.setUnitCellItem (pt++, this.getFloat (45, 10));
if (this.isbiomol) this.doConvertToFractional = false;
}, "~N");
Clazz.defineMethod (c$, "expdta", 
 function () {
if (this.line.toUpperCase ().indexOf ("NMR") >= 0) this.asc.setInfo ("isNMRdata", "true");
});
Clazz.defineMethod (c$, "formul", 
 function () {
var groupName = this.parseTokenRange (this.line, 12, 15);
var formula = JU.PT.parseTrimmedRange (this.line, 19, 70);
var ichLeftParen = formula.indexOf ('(');
if (ichLeftParen >= 0) {
var ichRightParen = formula.indexOf (')');
if (ichRightParen < 0 || ichLeftParen >= ichRightParen || ichLeftParen + 1 == ichRightParen) return;
formula = JU.PT.parseTrimmedRange (formula, ichLeftParen + 1, ichRightParen);
}var htElementsInGroup = this.htFormul.get (groupName);
if (htElementsInGroup == null) this.htFormul.put (groupName, htElementsInGroup =  new java.util.Hashtable ());
this.next[0] = 0;
var elementWithCount;
while ((elementWithCount = this.parseTokenNext (formula)) != null) {
if (elementWithCount.length < 2) continue;
var chFirst = elementWithCount.charAt (0);
var chSecond = elementWithCount.charAt (1);
if (J.adapter.smarter.Atom.isValidSymNoCase (chFirst, chSecond)) htElementsInGroup.put ("" + chFirst + chSecond, Boolean.TRUE);
 else if (J.adapter.smarter.Atom.isValidSym1 (chFirst)) htElementsInGroup.put ("" + chFirst, Boolean.TRUE);
}
});
Clazz.defineMethod (c$, "het", 
 function () {
if (this.line.length < 30) {
return;
}if (this.htHetero == null) {
this.htHetero =  new java.util.Hashtable ();
}var groupName = this.parseTokenRange (this.line, 7, 10);
if (this.htHetero.containsKey (groupName)) {
return;
}var hetName = JU.PT.parseTrimmedRange (this.line, 30, 70);
this.htHetero.put (groupName, hetName);
});
Clazz.defineMethod (c$, "hetnam", 
 function () {
if (this.htHetero == null) {
this.htHetero =  new java.util.Hashtable ();
}var groupName = this.parseTokenRange (this.line, 11, 14);
var hetName = JU.PT.parseTrimmedRange (this.line, 15, 70);
if (groupName == null) {
JU.Logger.error ("ERROR: HETNAM record does not contain a group name: " + this.line);
return;
}var htName = this.htHetero.get (groupName);
if (htName != null) {
hetName = htName + hetName;
}this.htHetero.put (groupName, hetName);
this.appendLoadNote (groupName + " = " + hetName);
});
Clazz.defineMethod (c$, "anisou", 
 function () {
var data =  Clazz.newFloatArray (8, 0);
data[6] = 1;
var serial = this.line.substring (6, 11).trim ();
if (!this.haveMappedSerials && this.asc.ac > 0) {
for (var i = this.asc.getAtomSetAtomIndex (this.asc.iSet); i < this.asc.ac; i++) {
var atomSerial = this.asc.atoms[i].atomSerial;
if (atomSerial != -2147483648) this.asc.atomSymbolicMap.put ("" + atomSerial, this.asc.atoms[i]);
}
this.haveMappedSerials = true;
}var atom = this.asc.getAtomFromName (serial);
if (atom == null) {
return;
}for (var i = 28, pt = 0; i < 70; i += 7, pt++) data[pt] = this.parseFloatRange (this.line, i, i + 7);

for (var i = 0; i < 6; i++) {
if (Float.isNaN (data[i])) {
JU.Logger.error ("Bad ANISOU record: " + this.line);
return;
}data[i] /= 10000;
}
this.asc.setAnisoBorU (atom, data, 12);
});
Clazz.defineMethod (c$, "site", 
 function () {
if (this.htSites == null) {
this.htSites =  new java.util.Hashtable ();
}var nResidues = this.parseIntRange (this.line, 15, 17);
var siteID = JU.PT.parseTrimmedRange (this.line, 11, 14);
var htSite = this.htSites.get (siteID);
if (htSite == null) {
htSite =  new java.util.Hashtable ();
htSite.put ("nResidues", Integer.$valueOf (nResidues));
htSite.put ("groups", "");
this.htSites.put (siteID, htSite);
}var groups = htSite.get ("groups");
for (var i = 0; i < 4; i++) {
var pt = 18 + i * 11;
var resName = JU.PT.parseTrimmedRange (this.line, pt, pt + 3);
if (resName.length == 0) break;
var chainID = JU.PT.parseTrimmedRange (this.line, pt + 4, pt + 5);
var seq = JU.PT.parseTrimmedRange (this.line, pt + 5, pt + 9);
var iCode = JU.PT.parseTrimmedRange (this.line, pt + 9, pt + 10);
groups += (groups.length == 0 ? "" : ",") + "[" + resName + "]" + seq;
if (iCode.length > 0) groups += "^" + iCode;
if (chainID.length > 0) groups += ":" + chainID;
htSite.put ("groups", groups);
}
});
Clazz.defineMethod (c$, "remarkTls", 
 function () {
var nGroups = 0;
var iGroup = 0;
var components = null;
var tlsGroups = null;
var tlsGroup = null;
var ranges = null;
var range = null;
var remark = this.line.substring (0, 11);
while (this.readHeader (true) != null && this.line.startsWith (remark)) {
try {
var tokens = JU.PT.getTokens (this.line.substring (10).$replace (':', ' '));
if (tokens.length < 2) continue;
JU.Logger.info (this.line);
if (tokens[1].equalsIgnoreCase ("GROUP")) {
tlsGroup =  new java.util.Hashtable ();
ranges =  new JU.Lst ();
tlsGroup.put ("ranges", ranges);
tlsGroups.addLast (tlsGroup);
this.tlsGroupID = this.parseIntStr (tokens[tokens.length - 1]);
tlsGroup.put ("id", Integer.$valueOf (this.tlsGroupID));
} else if (tokens[0].equalsIgnoreCase ("NUMBER")) {
if (tokens[2].equalsIgnoreCase ("COMPONENTS")) {
} else {
nGroups = this.parseIntStr (tokens[tokens.length - 1]);
if (nGroups < 1) break;
if (this.vTlsModels == null) this.vTlsModels =  new JU.Lst ();
tlsGroups =  new JU.Lst ();
this.appendLoadNote (this.line.substring (11).trim ());
}} else if (tokens[0].equalsIgnoreCase ("COMPONENTS")) {
components = this.line;
} else if (tokens[0].equalsIgnoreCase ("RESIDUE")) {
range =  new java.util.Hashtable ();
var chain1;
var chain2;
var res1;
var res2;
if (tokens.length == 6) {
chain1 = tokens[2].charAt (0);
chain2 = tokens[4].charAt (0);
res1 = this.parseIntStr (tokens[3]);
res2 = this.parseIntStr (tokens[5]);
} else {
var toC = components.indexOf (" C ");
var fromC = components.indexOf (" C ", toC + 4);
chain1 = this.line.charAt (fromC);
chain2 = this.line.charAt (toC);
res1 = this.parseIntRange (this.line, fromC + 1, toC);
res2 = this.parseIntStr (this.line.substring (toC + 1));
}if (chain1 == chain2) {
range.put ("chains", "" + chain1 + chain2);
if (res1 <= res2) {
range.put ("residues",  Clazz.newIntArray (-1, [res1, res2]));
ranges.addLast (range);
} else {
this.tlsAddError (" TLS group residues are not in order (range ignored)");
}} else {
this.tlsAddError (" TLS group chains are different (range ignored)");
}} else if (tokens[0].equalsIgnoreCase ("SELECTION")) {
var chain = '\u0000';
for (var i = 1; i < tokens.length; i++) {
if (tokens[i].toUpperCase ().indexOf ("CHAIN") >= 0) {
chain = tokens[++i].charAt (0);
continue;
}var resno = this.parseIntStr (tokens[i]);
if (resno == -2147483648) continue;
range =  new java.util.Hashtable ();
range.put ("residues",  Clazz.newIntArray (-1, [resno, this.parseIntStr (tokens[++i])]));
if (chain != '\0') range.put ("chains", "" + chain + chain);
ranges.addLast (range);
}
} else if (tokens[0].equalsIgnoreCase ("ORIGIN")) {
var origin =  new JU.P3 ();
tlsGroup.put ("origin", origin);
if (tokens.length == 8) {
origin.set (this.parseFloatStr (tokens[5]), this.parseFloatStr (tokens[6]), this.parseFloatStr (tokens[7]));
} else {
var n = this.line.length;
origin.set (this.parseFloatRange (this.line, n - 27, n - 18), this.parseFloatRange (this.line, n - 18, n - 9), this.parseFloatRange (this.line, n - 9, n));
}if (Float.isNaN (origin.x) || Float.isNaN (origin.y) || Float.isNaN (origin.z)) {
origin.set (NaN, NaN, NaN);
this.tlsAddError ("invalid origin: " + this.line);
}} else if (tokens[1].equalsIgnoreCase ("TENSOR")) {
var tensorType = tokens[0].charAt (0);
var s = (this.readHeader (true).substring (10) + this.readHeader (true).substring (10) + this.readHeader (true).substring (10)).$replace (tensorType, ' ').$replace (':', ' ');
tokens = JU.PT.getTokens (s);
var data =  Clazz.newFloatArray (3, 3, 0);
tlsGroup.put ("t" + tensorType, data);
for (var i = 0; i < tokens.length; i++) {
var ti = tokens[i].charCodeAt (0) - 49;
var tj = tokens[i].charCodeAt (1) - 49;
data[ti][tj] = this.parseFloatStr (tokens[++i]);
if (ti < tj) data[tj][ti] = data[ti][tj];
}
for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) if (Float.isNaN (data[i][j])) this.tlsAddError ("invalid tensor: " + JU.Escape.escapeFloatAA (data, false));


if (tensorType == 'S' && ++iGroup == nGroups) {
JU.Logger.info (nGroups + " TLS groups read");
this.readHeader (true);
break;
}}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error (this.line + "\nError in TLS parser: ");
System.out.println (e.getMessage ());
tlsGroups = null;
break;
} else {
throw e;
}
}
}
if (tlsGroups != null) {
var tlsModel =  new java.util.Hashtable ();
tlsModel.put ("groupCount", Integer.$valueOf (nGroups));
tlsModel.put ("groups", tlsGroups);
this.vTlsModels.addLast (tlsModel);
}return (nGroups < 1);
});
Clazz.defineMethod (c$, "handleTlsMissingModels", 
 function () {
this.vTlsModels = null;
});
Clazz.defineMethod (c$, "setTlsGroups", 
 function (iGroup, iModel, symmetry) {
JU.Logger.info ("TLS model " + (iModel + 1) + " set " + (iGroup + 1));
var tlsGroupInfo = this.vTlsModels.get (iGroup);
var groups = tlsGroupInfo.get ("groups");
var index0 = this.asc.getAtomSetAtomIndex (iModel);
var data =  Clazz.newFloatArray (this.asc.getAtomSetAtomCount (iModel), 0);
var indexMax = index0 + data.length;
var atoms = this.asc.atoms;
var nGroups = groups.size ();
for (var i = 0; i < nGroups; i++) {
var group = groups.get (i);
var ranges = group.get ("ranges");
this.tlsGroupID = (group.get ("id")).intValue ();
for (var j = ranges.size (); --j >= 0; ) {
var chains = ranges.get (j).get ("chains");
var residues = ranges.get (j).get ("residues");
var chain0 = 0 + chains.charCodeAt (0);
var chain1 = 0 + chains.charCodeAt (1);
var res0 = residues[0];
var res1 = residues[1];
var index1 = this.findAtomForRange (index0, indexMax, chain0, res0, false);
var index2 = (index1 >= 0 ? this.findAtomForRange (index1, indexMax, chain1, res1, false) : -1);
if (index2 < 0) {
JU.Logger.info ("TLS processing terminated");
return;
}JU.Logger.info ("TLS ID=" + this.tlsGroupID + " model atom index range " + index1 + "-" + index2);
var isSameChain = (chain0 == chain1);
for (var iAtom = index0; iAtom < indexMax; iAtom++) {
var atom = atoms[iAtom];
if (isSameChain ? atom.sequenceNumber >= res0 && atom.sequenceNumber <= res1 : atom.chainID > chain0 && atom.chainID < chain1 || atom.chainID == chain0 && atom.sequenceNumber >= res0 || atom.chainID == chain1 && atom.sequenceNumber <= res1) {
data[iAtom - index0] = this.tlsGroupID;
this.setTlsTensor (atom, group, symmetry);
}}
}
}
this.asc.setAtomProperties ("tlsGroup", data, iModel, true);
this.asc.setModelInfoForSet ("TLS", tlsGroupInfo, iModel);
this.asc.setTensors ();
}, "~N,~N,J.api.SymmetryInterface");
Clazz.defineMethod (c$, "findAtomForRange", 
 function (atom1, atom2, chain, resno, isLast) {
var iAtom = this.findAtom (atom1, atom2, chain, resno, true);
return (isLast && iAtom >= 0 ? this.findAtom (iAtom, atom2, chain, resno, false) : iAtom);
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "findAtom", 
 function (atom1, atom2, chain, resno, isTrue) {
var atoms = this.asc.atoms;
for (var i = atom1; i < atom2; i++) {
var atom = atoms[i];
if ((atom.chainID == chain && atom.sequenceNumber == resno) == isTrue) return i;
}
if (isTrue) {
JU.Logger.warn ("PdbReader findAtom chain=" + chain + " resno=" + resno + " not found");
this.tlsAddError ("atom not found: chain=" + chain + " resno=" + resno);
}return (isTrue ? -1 : atom2);
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "setTlsTensor", 
 function (atom, group, symmetry) {
var origin = group.get ("origin");
if (Float.isNaN (origin.x)) return;
var T = group.get ("tT");
var L = group.get ("tL");
var S = group.get ("tS");
if (T == null || L == null || S == null) return;
var x = (atom.x - origin.x) * 0.017453292;
var y = (atom.y - origin.y) * 0.017453292;
var z = (atom.z - origin.z) * 0.017453292;
var xx = x * x;
var yy = y * y;
var zz = z * z;
var xy = x * y;
var xz = x * z;
var yz = y * z;
this.dataT[0] = T[0][0];
this.dataT[1] = T[1][1];
this.dataT[2] = T[2][2];
this.dataT[3] = T[0][1];
this.dataT[4] = T[0][2];
this.dataT[5] = T[1][2];
this.dataT[6] = 12;
var anisou =  Clazz.newFloatArray (8, 0);
var bresidual = (Float.isNaN (atom.bfactor) ? 0 : atom.bfactor / 78.95683);
anisou[0] = this.dataT[0] + L[1][1] * zz + L[2][2] * yy - 2 * L[1][2] * yz + 2 * S[1][0] * z - 2 * S[2][0] * y;
anisou[1] = this.dataT[1] + L[0][0] * zz + L[2][2] * xx - 2 * L[2][0] * xz - 2 * S[0][1] * z + 2 * S[2][1] * x;
anisou[2] = this.dataT[2] + L[0][0] * yy + L[1][1] * xx - 2 * L[0][1] * xy - 2 * S[1][2] * x + 2 * S[0][2] * y;
anisou[3] = this.dataT[3] - L[2][2] * xy + L[1][2] * xz + L[2][0] * yz - L[0][1] * zz - S[0][0] * z + S[1][1] * z + S[2][0] * x - S[2][1] * y;
anisou[4] = this.dataT[4] - L[1][1] * xz + L[1][2] * xy - L[2][0] * yy + L[0][1] * yz + S[0][0] * y - S[2][2] * y + S[1][2] * z - S[1][0] * x;
anisou[5] = this.dataT[5] - L[0][0] * yz - L[1][2] * xx + L[2][0] * xy + L[0][1] * xz - S[1][1] * x + S[2][2] * x + S[0][1] * y - S[0][2] * z;
anisou[6] = 12;
anisou[7] = bresidual;
if (this.tlsU == null) this.tlsU =  new java.util.Hashtable ();
this.tlsU.put (atom, anisou);
atom.addTensor (symmetry.getTensor (this.vwr, this.dataT).setType (null), "TLS-U", false);
}, "J.adapter.smarter.Atom,java.util.Map,J.api.SymmetryInterface");
Clazz.defineMethod (c$, "tlsAddError", 
 function (error) {
if (this.sbTlsErrors == null) this.sbTlsErrors =  new JU.SB ();
this.sbTlsErrors.append (this.fileName).appendC ('\t').append ("TLS group ").appendI (this.tlsGroupID).appendC ('\t').append (error).appendC ('\n');
}, "~S");
c$.fixRadius = Clazz.defineMethod (c$, "fixRadius", 
function (r) {
return (r < 0.9 ? 1 : r);
}, "~N");
Clazz.defineMethod (c$, "addConnection", 
 function (is) {
if (this.vConnect == null) {
this.connectLast = null;
this.vConnect =  new JU.Lst ();
}if (this.connectLast != null) {
if (is[0] == this.connectLast[0] && is[1] == this.connectLast[1] && is[2] != 2048) {
this.connectLast[2]++;
return;
}}this.vConnect.addLast (this.connectLast = is);
}, "~A");
Clazz.defineMethod (c$, "connectAllBad", 
 function (maxSerial) {
var firstAtom = this.connectNextAtomIndex;
for (var i = this.connectNextAtomSet; i < this.asc.atomSetCount; i++) {
var count = this.asc.getAtomSetAtomCount (i);
this.asc.setModelInfoForSet ("PDB_CONECT_firstAtom_count_max",  Clazz.newIntArray (-1, [firstAtom, count, maxSerial]), i);
if (this.vConnect != null) {
this.asc.setModelInfoForSet ("PDB_CONECT_bonds", this.vConnect, i);
this.asc.setGlobalBoolean (3);
}firstAtom += count;
}
this.vConnect = null;
this.connectNextAtomSet = this.asc.iSet + 1;
this.connectNextAtomIndex = firstAtom;
}, "~N");
Clazz.defineMethod (c$, "connectAll", 
 function (maxSerial, isConnectStateBug) {
var a = this.asc;
var index = a.iSet;
if (index < 0) return;
if (isConnectStateBug) {
this.connectAllBad (maxSerial);
return;
}a.setCurrentModelInfo ("PDB_CONECT_firstAtom_count_max",  Clazz.newIntArray (-1, [a.getAtomSetAtomIndex (index), a.getAtomSetAtomCount (index), maxSerial]));
if (this.vConnect == null) return;
var firstAtom = this.connectNextAtomIndex;
for (var i = a.atomSetCount; --i >= this.connectNextAtomSet; ) {
a.setModelInfoForSet ("PDB_CONECT_bonds", this.vConnect, i);
a.setGlobalBoolean (3);
firstAtom += a.getAtomSetAtomCount (i);
}
this.vConnect = null;
this.connectNextAtomSet = index + 1;
this.connectNextAtomIndex = firstAtom;
}, "~N,~B");
Clazz.defineStatics (c$,
"MODE_PDB", 0,
"MODE_HEX", 1,
"MODE_HYBRID36", 2,
"lineOptions", "ATOM    HETATM  MODEL   CONECT  HELIX   SHEET   TURN    HET     HETNAM  ANISOU  SITE    CRYST1  SCALE1  SCALE2  SCALE3  EXPDTA  FORMUL  REMARK  HEADER  COMPND  SOURCE  TITLE   SEQADV  ",
"RAD_PER_DEG", (0.017453292519943295),
"_8PI2_", (78.95683520871486));
});
