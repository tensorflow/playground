(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Clazz_declarePackage ("J.adapter.readers.pdb");
Clazz_load (["J.adapter.smarter.AtomSetCollectionReader", "java.util.Hashtable"], "J.adapter.readers.pdb.PdbReader", ["java.lang.Boolean", "$.Float", "JU.Lst", "$.M4", "$.P3", "$.PT", "$.SB", "J.adapter.smarter.Atom", "$.Structure", "J.api.JmolAdapter", "J.c.STR", "JU.Escape", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
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
Clazz_instantialize (this, arguments);
}, J.adapter.readers.pdb, "PdbReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz_prepareFields (c$, function () {
this.htFormul =  new java.util.Hashtable ();
this.dataT =  Clazz_newFloatArray (8, 0);
});
Clazz_overrideMethod (c$, "initializeReader", 
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
Clazz_overrideMethod (c$, "checkLine", 
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
Clazz_defineMethod (c$, "checkRemark", 
function () {
this.checkCurrentLineForScript ();
});
Clazz_defineMethod (c$, "seqAdv", 
 function () {
var g1 = this.line.substring (39, 42).trim ().toLowerCase ();
if (g1.length != 1) return;
if (this.htGroup1 == null) this.asc.setInfo ("htGroup1", this.htGroup1 =  new java.util.Hashtable ());
var g3 = this.line.substring (12, 15).trim ();
this.htGroup1.put (g3, g1);
});
Clazz_defineMethod (c$, "readHeader", 
 function (getLine) {
if (getLine) {
this.rd ();
if (!this.getHeader) return this.line;
}this.pdbHeader.append (this.line).appendC ('\n');
return this.line;
}, "~B");
Clazz_overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.finalizeReaderPDB ();
});
Clazz_defineMethod (c$, "finalizeReaderPDB", 
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
Clazz_defineMethod (c$, "checkUnitCellParams", 
 function () {
if (this.iHaveUnitCell) {
this.asc.setCurrentModelInfo ("unitCellParams", this.unitCellParams);
if (this.sgName != null) this.asc.setCurrentModelInfo ("spaceGroup", this.sgName);
}});
Clazz_defineMethod (c$, "checkForResidualBFactors", 
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
Clazz_defineMethod (c$, "header", 
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
Clazz_defineMethod (c$, "title", 
 function () {
if (this.lineLength > 10) this.appendLoadNote (this.line.substring (10, Math.min (this.maxLength, this.line.length)).trim ());
});
Clazz_defineMethod (c$, "compnd", 
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
Clazz_defineMethod (c$, "setBiomoleculeAtomCounts", 
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
Clazz_defineMethod (c$, "remark350", 
 function () {
var biomts = null;
var biomtchains = null;
this.vBiomolecules =  new JU.Lst ();
this.biomtChainAtomCounts =  Clazz_newIntArray (255, 0);
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
var mat =  Clazz_newFloatArray (16, 0);
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
if (Clazz_exceptionOf (e, Exception)) {
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
Clazz_defineMethod (c$, "remark285", 
 function () {
return true;
});
Clazz_defineMethod (c$, "remark290", 
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
Clazz_defineMethod (c$, "getSerial", 
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
if (Clazz_exceptionOf (e, Exception)) {
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
Clazz_defineMethod (c$, "getSeqNo", 
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
if (Clazz_exceptionOf (e, Exception)) {
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
Clazz_defineMethod (c$, "processAtom", 
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
Clazz_defineMethod (c$, "processAtom2", 
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
Clazz_defineMethod (c$, "atom", 
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
Clazz_defineMethod (c$, "filterPDBAtom", 
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
Clazz_defineMethod (c$, "setAdditionalAtomParameters", 
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
Clazz_defineMethod (c$, "deduceElementSymbol", 
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
Clazz_defineMethod (c$, "conect", 
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
this.addConnection ( Clazz_newIntArray (-1, [i1, targetSerial, order]));
}
this.sbConect.appendSB (this.sb);
});
Clazz_defineMethod (c$, "structure", 
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
Clazz_defineMethod (c$, "getModelNumber", 
 function () {
var startModelColumn = 6;
var endModelColumn = 14;
if (endModelColumn > this.lineLength) endModelColumn = this.lineLength;
var iModel = this.parseIntRange (this.line, startModelColumn, endModelColumn);
return (iModel == -2147483648 ? 0 : iModel);
});
Clazz_defineMethod (c$, "model", 
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
Clazz_defineMethod (c$, "checkNotPDB", 
 function () {
var isPDB = (!this.isCourseGrained && (this.nRes == 0 || this.nUNK != this.nRes));
this.asc.checkSpecial = !isPDB;
this.setModelPDB (isPDB);
this.nUNK = this.nRes = 0;
this.currentGroup3 = null;
});
Clazz_defineMethod (c$, "cryst1", 
 function () {
var a = this.$cryst1 = this.getFloat (6, 9);
if (a == 1) a = NaN;
this.setUnitCell (a, this.getFloat (15, 9), this.getFloat (24, 9), this.getFloat (33, 7), this.getFloat (40, 7), this.getFloat (47, 7));
if (this.isbiomol) this.doConvertToFractional = false;
if (this.sgName == null || this.sgName.equals ("unspecified!")) this.setSpaceGroupName (JU.PT.parseTrimmedRange (this.line, 55, 66));
this.fileSgName = this.sgName;
});
Clazz_defineMethod (c$, "getFloat", 
 function (ich, cch) {
return this.parseFloatRange (this.line, ich, ich + cch);
}, "~N,~N");
Clazz_defineMethod (c$, "scale", 
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
Clazz_defineMethod (c$, "expdta", 
 function () {
if (this.line.toUpperCase ().indexOf ("NMR") >= 0) this.asc.setInfo ("isNMRdata", "true");
});
Clazz_defineMethod (c$, "formul", 
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
Clazz_defineMethod (c$, "het", 
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
Clazz_defineMethod (c$, "hetnam", 
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
Clazz_defineMethod (c$, "anisou", 
 function () {
var data =  Clazz_newFloatArray (8, 0);
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
Clazz_defineMethod (c$, "site", 
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
Clazz_defineMethod (c$, "remarkTls", 
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
range.put ("residues",  Clazz_newIntArray (-1, [res1, res2]));
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
range.put ("residues",  Clazz_newIntArray (-1, [resno, this.parseIntStr (tokens[++i])]));
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
var data =  Clazz_newFloatArray (3, 3, 0);
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
if (Clazz_exceptionOf (e, Exception)) {
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
Clazz_defineMethod (c$, "handleTlsMissingModels", 
 function () {
this.vTlsModels = null;
});
Clazz_defineMethod (c$, "setTlsGroups", 
 function (iGroup, iModel, symmetry) {
JU.Logger.info ("TLS model " + (iModel + 1) + " set " + (iGroup + 1));
var tlsGroupInfo = this.vTlsModels.get (iGroup);
var groups = tlsGroupInfo.get ("groups");
var index0 = this.asc.getAtomSetAtomIndex (iModel);
var data =  Clazz_newFloatArray (this.asc.getAtomSetAtomCount (iModel), 0);
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
Clazz_defineMethod (c$, "findAtomForRange", 
 function (atom1, atom2, chain, resno, isLast) {
var iAtom = this.findAtom (atom1, atom2, chain, resno, true);
return (isLast && iAtom >= 0 ? this.findAtom (iAtom, atom2, chain, resno, false) : iAtom);
}, "~N,~N,~N,~N,~B");
Clazz_defineMethod (c$, "findAtom", 
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
Clazz_defineMethod (c$, "setTlsTensor", 
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
var anisou =  Clazz_newFloatArray (8, 0);
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
Clazz_defineMethod (c$, "tlsAddError", 
 function (error) {
if (this.sbTlsErrors == null) this.sbTlsErrors =  new JU.SB ();
this.sbTlsErrors.append (this.fileName).appendC ('\t').append ("TLS group ").appendI (this.tlsGroupID).appendC ('\t').append (error).appendC ('\n');
}, "~S");
c$.fixRadius = Clazz_defineMethod (c$, "fixRadius", 
function (r) {
return (r < 0.9 ? 1 : r);
}, "~N");
Clazz_defineMethod (c$, "addConnection", 
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
Clazz_defineMethod (c$, "connectAllBad", 
 function (maxSerial) {
var firstAtom = this.connectNextAtomIndex;
for (var i = this.connectNextAtomSet; i < this.asc.atomSetCount; i++) {
var count = this.asc.getAtomSetAtomCount (i);
this.asc.setModelInfoForSet ("PDB_CONECT_firstAtom_count_max",  Clazz_newIntArray (-1, [firstAtom, count, maxSerial]), i);
if (this.vConnect != null) {
this.asc.setModelInfoForSet ("PDB_CONECT_bonds", this.vConnect, i);
this.asc.setGlobalBoolean (3);
}firstAtom += count;
}
this.vConnect = null;
this.connectNextAtomSet = this.asc.iSet + 1;
this.connectNextAtomIndex = firstAtom;
}, "~N");
Clazz_defineMethod (c$, "connectAll", 
 function (maxSerial, isConnectStateBug) {
var a = this.asc;
var index = a.iSet;
if (index < 0) return;
if (isConnectStateBug) {
this.connectAllBad (maxSerial);
return;
}a.setCurrentModelInfo ("PDB_CONECT_firstAtom_count_max",  Clazz_newIntArray (-1, [a.getAtomSetAtomIndex (index), a.getAtomSetAtomCount (index), maxSerial]));
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
Clazz_defineStatics (c$,
"MODE_PDB", 0,
"MODE_HEX", 1,
"MODE_HYBRID36", 2,
"lineOptions", "ATOM    HETATM  MODEL   CONECT  HELIX   SHEET   TURN    HET     HETNAM  ANISOU  SITE    CRYST1  SCALE1  SCALE2  SCALE3  EXPDTA  FORMUL  REMARK  HEADER  COMPND  SOURCE  TITLE   SEQADV  ",
"RAD_PER_DEG", (0.017453292519943295),
"_8PI2_", (78.95683520871486));
});
Clazz_declarePackage ("J.adapter.smarter");
Clazz_load (null, "J.adapter.smarter.Structure", ["J.c.STR"], function () {
c$ = Clazz_decorateAsClass (function () {
this.structureType = null;
this.substructureType = null;
this.structureID = null;
this.serialID = 0;
this.strandCount = 0;
this.startSequenceNumber = 0;
this.startChainID = 0;
this.startChainStr = null;
this.startInsertionCode = '\0';
this.endSequenceNumber = 0;
this.endChainID = 0;
this.endChainStr = null;
this.endInsertionCode = '\0';
this.atomStartEnd = null;
this.modelStartEnd = null;
this.bsAll = null;
Clazz_instantialize (this, arguments);
}, J.adapter.smarter, "Structure");
Clazz_prepareFields (c$, function () {
this.atomStartEnd =  Clazz_newIntArray (2, 0);
this.modelStartEnd =  Clazz_newIntArray (-1, [-1, -1]);
});
c$.getHelixType = Clazz_defineMethod (c$, "getHelixType", 
function (type) {
switch (type) {
case 1:
return J.c.STR.HELIXALPHA;
case 3:
return J.c.STR.HELIXPI;
case 5:
return J.c.STR.HELIX310;
}
return J.c.STR.HELIX;
}, "~N");
Clazz_makeConstructor (c$, 
function (modelIndex, structureType, substructureType, structureID, serialID, strandCount, bsAll) {
if (bsAll != null) {
this.modelStartEnd =  Clazz_newIntArray (-1, [0, modelIndex]);
this.bsAll = bsAll;
return;
}this.structureType = structureType;
this.substructureType = substructureType;
if (structureID == null) return;
this.modelStartEnd[0] = this.modelStartEnd[1] = modelIndex;
this.structureID = structureID;
this.strandCount = strandCount;
this.serialID = serialID;
}, "~N,J.c.STR,J.c.STR,~S,~N,~N,~A");
Clazz_defineMethod (c$, "set", 
function (startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode, istart, iend) {
this.startChainID = startChainID;
this.startSequenceNumber = startSequenceNumber;
this.startInsertionCode = startInsertionCode;
this.endChainID = endChainID;
this.endSequenceNumber = endSequenceNumber;
this.endInsertionCode = endInsertionCode;
this.atomStartEnd[0] = istart;
this.atomStartEnd[1] = iend;
}, "~N,~N,~S,~N,~N,~S,~N,~N");
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.Group"], "JM.Monomer", ["java.lang.Float", "JU.Measure", "$.P3", "$.Quat", "J.c.STR", "JM.BioResolver", "$.ProteinStructure", "JU.Escape", "$.Logger", "JV.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bioPolymer = null;
this.offsets = null;
this.monomerIndex = -1;
this.phi = NaN;
this.psi = NaN;
this.omega = NaN;
this.straightness = NaN;
this.mu = NaN;
this.theta = NaN;
this.backboneBlockVis = false;
Clazz_instantialize (this, arguments);
}, JM, "Monomer", JM.Group);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JM.Monomer, []);
});
c$.have = Clazz_defineMethod (c$, "have", 
function (offsets, n) {
return (offsets[n] & 0xFF) != 0xFF;
}, "~A,~N");
Clazz_defineMethod (c$, "set2", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, interestingAtomOffsets) {
this.setGroup (chain, group3, seqcode, firstAtomIndex, lastAtomIndex);
this.offsets = interestingAtomOffsets;
this.setLeadAtomIndex ();
return this;
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz_defineMethod (c$, "setLeadAtomIndex", 
function () {
var offset = this.offsets[0] & 0xFF;
if (offset != 255) this.leadAtomIndex = this.firstAtomIndex + offset;
});
Clazz_defineMethod (c$, "setBioPolymer", 
function (polymer, index) {
this.bioPolymer = polymer;
this.monomerIndex = index;
}, "JM.BioPolymer,~N");
Clazz_overrideMethod (c$, "getSelectedMonomerCount", 
function () {
return (this.bioPolymer == null ? 0 : this.bioPolymer.getSelectedMonomerCount ());
});
Clazz_overrideMethod (c$, "getSelectedMonomerIndex", 
function () {
return (this.bioPolymer == null || !this.bioPolymer.isMonomerSelected (this.monomerIndex) ? -1 : this.monomerIndex);
});
Clazz_overrideMethod (c$, "getBioPolymerLength", 
function () {
return (this.bioPolymer == null ? 0 : this.bioPolymer.monomerCount);
});
Clazz_defineMethod (c$, "getMonomerIndex", 
function () {
return this.monomerIndex;
});
Clazz_overrideMethod (c$, "getAtomIndex", 
function (name, offset) {
if (this.bioPolymer != null) {
var groups = this.bioPolymer.monomers;
var ipt = this.monomerIndex + offset;
if (ipt >= 0 && ipt < groups.length) {
var m = groups[ipt];
if (offset == 1 && !m.isConnectedPrevious ()) return -1;
if ("\0".equals (name)) return m.leadAtomIndex;
var atoms = this.chain.model.ms.at;
for (var i = m.firstAtomIndex; i <= m.lastAtomIndex; i++) if (name == null || name.equalsIgnoreCase (atoms[i].getAtomName ())) return i;

}}return -1;
}, "~S,~N");
Clazz_defineMethod (c$, "getBioPolymerIndexInModel", 
function () {
return (this.bioPolymer == null ? -1 : this.bioPolymer.bioPolymerIndexInModel);
});
c$.scanForOffsets = Clazz_defineMethod (c$, "scanForOffsets", 
function (firstAtomIndex, specialAtomIndexes, interestingAtomIDs) {
var interestingCount = interestingAtomIDs.length;
var offsets =  Clazz_newByteArray (interestingCount, 0);
for (var i = interestingCount; --i >= 0; ) {
var atomIndex;
var atomID = interestingAtomIDs[i];
if (atomID < 0) {
atomIndex = specialAtomIndexes[~atomID];
} else {
atomIndex = specialAtomIndexes[atomID];
if (atomIndex < 0) return null;
}var offset;
if (atomIndex < 0) offset = 255;
 else {
offset = atomIndex - firstAtomIndex;
if (offset < 0 || offset > 254) {
JU.Logger.warn ("Monomer.scanForOffsets i=" + i + " atomID=" + atomID + " atomIndex:" + atomIndex + " firstAtomIndex:" + firstAtomIndex + " offset out of 0-254 range. Groups aren't organized correctly. Is this really a protein?: " + offset);
if (atomID < 0) {
offset = 255;
} else {
}}}offsets[i] = offset;
}
return offsets;
}, "~N,~A,~A");
Clazz_overrideMethod (c$, "getProteinStructureType", 
function () {
return J.c.STR.NONE;
});
Clazz_defineMethod (c$, "isHelix", 
function () {
return false;
});
Clazz_defineMethod (c$, "isSheet", 
function () {
return false;
});
Clazz_overrideMethod (c$, "setStrucNo", 
function (id) {
}, "~N");
Clazz_defineMethod (c$, "getAtomFromOffsetIndex", 
function (offsetIndex) {
if (offsetIndex > this.offsets.length) return null;
var offset = this.offsets[offsetIndex] & 0xFF;
return (offset == 255 ? null : this.chain.model.ms.at[this.firstAtomIndex + offset]);
}, "~N");
Clazz_defineMethod (c$, "getSpecialAtom", 
function (interestingIDs, specialAtomID) {
for (var i = interestingIDs.length; --i >= 0; ) {
var interestingID = interestingIDs[i];
if (interestingID < 0) interestingID = -interestingID;
if (specialAtomID == interestingID) {
var offset = this.offsets[i] & 0xFF;
return (offset == 255 ? null : this.chain.model.ms.at[this.firstAtomIndex + offset]);
}}
return null;
}, "~A,~N");
Clazz_defineMethod (c$, "getSpecialAtomPoint", 
function (interestingIDs, specialAtomID) {
for (var i = interestingIDs.length; --i >= 0; ) {
var interestingID = interestingIDs[i];
if (interestingID < 0) interestingID = -interestingID;
if (specialAtomID == interestingID) {
var offset = this.offsets[i] & 0xFF;
return (offset == 255 ? null : this.chain.model.ms.at[this.firstAtomIndex + offset]);
}}
return null;
}, "~A,~N");
Clazz_overrideMethod (c$, "isLeadAtom", 
function (atomIndex) {
return atomIndex == this.leadAtomIndex;
}, "~N");
Clazz_overrideMethod (c$, "getLeadAtom", 
function () {
return this.getAtomFromOffsetIndex (0);
});
Clazz_defineMethod (c$, "getWingAtom", 
function () {
return this.getAtomFromOffsetIndex (1);
});
Clazz_defineMethod (c$, "getInitiatorAtom", 
function () {
return this.getLeadAtom ();
});
Clazz_defineMethod (c$, "getTerminatorAtom", 
function () {
return this.getLeadAtom ();
});
Clazz_defineMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
}, "~N,~N,~A,~N,~N");
Clazz_defineMethod (c$, "getMyInfo", 
function (ptTemp) {
var info = this.getGroupInfo (this.groupIndex, ptTemp);
info.put ("chain", this.chain.getIDStr ());
var seqNum = this.getResno ();
if (seqNum > 0) info.put ("sequenceNumber", Integer.$valueOf (seqNum));
var insCode = this.getInsertionCode ();
if (insCode.charCodeAt (0) != 0) info.put ("insertionCode", "" + insCode);
var f = this.getGroupParameter (1111490569);
if (!Float.isNaN (f)) info.put ("phi", Float.$valueOf (f));
f = this.getGroupParameter (1111490570);
if (!Float.isNaN (f)) info.put ("psi", Float.$valueOf (f));
f = this.getGroupParameter (1111490565);
if (!Float.isNaN (f)) info.put ("mu", Float.$valueOf (f));
f = this.getGroupParameter (1111490576);
if (!Float.isNaN (f)) info.put ("theta", Float.$valueOf (f));
var structure = this.getStructure ();
if (Clazz_instanceOf (structure, JM.ProteinStructure)) {
info.put ("structureId", Integer.$valueOf ((structure).strucNo));
info.put ("structureType", (structure).type.getBioStructureTypeName (false));
}info.put ("shapeVisibilityFlags", Integer.$valueOf (this.shapeVisibilityFlags));
return info;
}, "JU.P3");
Clazz_overrideMethod (c$, "getStructureId", 
function () {
var structure = this.getStructure ();
return (Clazz_instanceOf (structure, JM.ProteinStructure) ? (structure).type.getBioStructureTypeName (false) : "");
});
Clazz_defineMethod (c$, "updateOffsetsForAlternativeLocations", 
function (atoms, bsSelected) {
for (var offsetIndex = this.offsets.length; --offsetIndex >= 0; ) {
var offset = this.offsets[offsetIndex] & 0xFF;
if (offset == 255) continue;
var iThis = this.firstAtomIndex + offset;
var atom = atoms[iThis];
var thisID = atom.atomID;
if (atom.altloc.charCodeAt (0) == 0) continue;
var nScan = this.lastAtomIndex - this.firstAtomIndex;
for (var i = 1; i <= nScan; i++) {
var iNew = iThis + i;
if (iNew > this.lastAtomIndex) iNew -= nScan + 1;
var offsetNew = iNew - this.firstAtomIndex;
if (offsetNew < 0 || offsetNew > 255 || iNew == iThis || !bsSelected.get (iNew)) continue;
var atomID = atoms[iNew].atomID;
if (atomID != thisID || atomID == 0 && !atoms[iNew].getAtomName ().equals (atom.getAtomName ())) continue;
this.offsets[offsetIndex] = offsetNew;
atoms[iNew].nBackbonesDisplayed = atom.nBackbonesDisplayed;
break;
}
}
this.setLeadAtomIndex ();
}, "~A,JU.BS");
Clazz_defineMethod (c$, "getMonomerSequenceAtoms", 
function (bsInclude, bsResult) {
this.setAtomBits (bsResult);
bsResult.and (bsInclude);
}, "JU.BS,JU.BS");
c$.checkOptional = Clazz_defineMethod (c$, "checkOptional", 
function (offsets, atom, firstAtomIndex, index) {
if (JM.Monomer.have (offsets, atom)) return true;
if (index < 0) return false;
offsets[atom] = (index - firstAtomIndex);
return true;
}, "~A,~N,~N,~N");
Clazz_defineMethod (c$, "getQuaternionFrameCenter", 
function (qtype) {
return null;
}, "~S");
Clazz_defineMethod (c$, "getHelixData2", 
function (tokType, qType, mStep) {
if (this.monomerIndex < 0) return null;
var iPrev = this.monomerIndex - mStep;
var prev = (mStep < 1 || this.monomerIndex <= 0 ? null : this.bioPolymer.monomers[iPrev]);
var q2 = this.getQuaternion (qType);
var q1 = (mStep < 1 ? JU.Quat.getQuaternionFrameV (JV.JC.axisX, JV.JC.axisY, JV.JC.axisZ, false) : prev == null ? null : prev.getQuaternion (qType));
if (q1 == null || q2 == null) return this.getHelixData (tokType, qType, mStep);
var a = (mStep < 1 ? JU.P3.new3 (0, 0, 0) : prev.getQuaternionFrameCenter (qType));
var b = this.getQuaternionFrameCenter (qType);
return (a == null || b == null ? this.getHelixData (tokType, qType, mStep) : JU.Escape.escapeHelical ((tokType == 135176 ? "helixaxis" + this.getUniqueID () : null), tokType, a, b, JU.Measure.computeHelicalAxis (a, b, q2.div (q1))));
}, "~N,~S,~N");
Clazz_defineMethod (c$, "getUniqueID", 
function () {
var cid = this.chain.chainID;
var a = this.getLeadAtom ();
var id = (a == null ? "" : "_" + a.mi) + "_" + this.getResno () + (cid == 0 ? "" : "_" + cid);
var aid = (a == null ? '\0' : this.getLeadAtom ().altloc);
if (aid != '\0') id += "_" + aid;
return id;
});
Clazz_overrideMethod (c$, "isCrossLinked", 
function (g) {
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLinkGroup (i, null, g, true, true, false)) return true;

return false;
}, "JM.Group");
Clazz_overrideMethod (c$, "getCrossLinkVector", 
function (vReturn, crosslinkCovalent, crosslinkHBond) {
var isNotCheck = (vReturn == null);
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLinkGroup (i, vReturn, null, crosslinkCovalent, crosslinkHBond, isNotCheck) && isNotCheck) return true;

return !isNotCheck && vReturn.size () > 0;
}, "JU.Lst,~B,~B");
Clazz_defineMethod (c$, "getCrossLinkGroup", 
function (i, vReturn, group, crosslinkCovalent, crosslinkHBond, isNotCheck) {
var atom = this.chain.model.ms.at[i];
var bonds = atom.bonds;
var ibp = this.getBioPolymerIndexInModel ();
if (ibp < 0 || bonds == null) return false;
var haveCrossLink = false;
var checkPrevious = (!isNotCheck && vReturn == null && group == null);
for (var j = 0; j < bonds.length; j++) {
var b = bonds[j];
if (b.isCovalent () ? !crosslinkCovalent : !crosslinkHBond) continue;
var a = b.getOtherAtom (atom);
var g = a.group;
if (group != null && g !== group) continue;
var iPolymer = g.getBioPolymerIndexInModel ();
var igroup = g.getMonomerIndex ();
if (checkPrevious) {
if (iPolymer == ibp && igroup == this.monomerIndex - 1) return true;
} else if (iPolymer >= 0 && igroup >= 0 && (iPolymer != ibp || igroup < this.monomerIndex - 1 || igroup > this.monomerIndex + 1)) {
haveCrossLink = true;
if (group != null || vReturn == null) break;
vReturn.addLast (Integer.$valueOf (i));
vReturn.addLast (Integer.$valueOf (a.i));
vReturn.addLast (Integer.$valueOf (g.leadAtomIndex));
}}
return haveCrossLink;
}, "~N,JU.Lst,JM.Group,~B,~B,~B");
Clazz_defineMethod (c$, "isConnectedPrevious", 
function () {
return true;
});
Clazz_defineMethod (c$, "setGroupParameter", 
function (tok, f) {
switch (tok) {
case 1111490569:
this.phi = f;
break;
case 1111490570:
this.psi = f;
break;
case 1111490568:
this.omega = f;
break;
case 1111490565:
this.mu = f;
break;
case 1111490576:
this.theta = f;
break;
case 1111490574:
this.straightness = f;
break;
}
}, "~N,~N");
Clazz_overrideMethod (c$, "getGroupParameter", 
function (tok) {
if (this.bioPolymer == null) return 0;
if (!this.bioPolymer.haveParameters) this.bioPolymer.calcParameters ();
switch (tok) {
case 1094713361:
return 1;
case 1111490568:
return this.omega;
case 1111490569:
return this.phi;
case 1111490570:
return this.psi;
case 1111490565:
return this.mu;
case 1111490576:
return this.theta;
case 1111490574:
return this.straightness;
}
return NaN;
}, "~N");
Clazz_overrideMethod (c$, "getGroup1", 
function () {
return (this.groupID < JM.BioResolver.predefinedGroup1Names.length ? JM.BioResolver.predefinedGroup1Names[this.groupID] : this.group1.charCodeAt (0) > 1 ? this.group1 : this.group1.charCodeAt (0) == 1 ? '?' : (this.group1 = this.getGroup1b ()));
});
Clazz_defineMethod (c$, "getGroup1b", 
function () {
return '?';
});
Clazz_overrideMethod (c$, "setGroupID", 
function (group3) {
this.groupID = JM.BioResolver.getGroupIdFor (group3);
}, "~S");
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.Monomer"], "JM.AlphaMonomer", ["JU.Quat", "$.V3", "J.c.STR", "JM.Helix", "$.Sheet", "$.Turn"], function () {
c$ = Clazz_decorateAsClass (function () {
this.proteinStructure = null;
this.nitrogenHydrogenPoint = null;
Clazz_instantialize (this, arguments);
}, JM, "AlphaMonomer", JM.Monomer);
Clazz_overrideMethod (c$, "isProtein", 
function () {
return true;
});
c$.validateAndAllocateA = Clazz_defineMethod (c$, "validateAndAllocateA", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
return (firstIndex != lastIndex || specialAtomIndexes[2] != firstIndex ? null :  new JM.AlphaMonomer ().set2 (chain, group3, seqcode, firstIndex, lastIndex, JM.AlphaMonomer.alphaOffsets));
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz_overrideConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "isAlphaMonomer", 
function () {
return true;
});
Clazz_overrideMethod (c$, "getStructure", 
function () {
return this.proteinStructure;
});
Clazz_defineMethod (c$, "setStructure", 
function (ps) {
if ((this.proteinStructure = ps) == null) this.nitrogenHydrogenPoint = null;
}, "JM.ProteinStructure");
Clazz_overrideMethod (c$, "setStrucNo", 
function (n) {
if (this.proteinStructure != null) this.proteinStructure.strucNo = n;
}, "~N");
Clazz_overrideMethod (c$, "getProteinStructureType", 
function () {
return this.proteinStructure == null ? J.c.STR.NONE : this.proteinStructure.type;
});
Clazz_overrideMethod (c$, "getProteinStructureSubType", 
function () {
return this.proteinStructure == null ? J.c.STR.NONE : this.proteinStructure.subtype;
});
Clazz_overrideMethod (c$, "getStrucNo", 
function () {
return this.proteinStructure != null ? this.proteinStructure.strucNo : 0;
});
Clazz_overrideMethod (c$, "isHelix", 
function () {
return this.proteinStructure != null && this.proteinStructure.type === J.c.STR.HELIX;
});
Clazz_overrideMethod (c$, "isSheet", 
function () {
return this.proteinStructure != null && this.proteinStructure.type === J.c.STR.SHEET;
});
Clazz_overrideMethod (c$, "setProteinStructureType", 
function (type, monomerIndexCurrent) {
if (this.proteinStructure != null) this.proteinStructure.removeMonomer (this.monomerIndex);
if (monomerIndexCurrent < 0 || monomerIndexCurrent > 0 && this.monomerIndex == 0) {
switch (type) {
case J.c.STR.HELIX:
case J.c.STR.HELIXALPHA:
case J.c.STR.HELIX310:
case J.c.STR.HELIXPI:
this.setStructure ( new JM.Helix (this.bioPolymer, this.monomerIndex, 1, type));
break;
case J.c.STR.SHEET:
this.setStructure ( new JM.Sheet (this.bioPolymer, this.monomerIndex, 1, type));
break;
case J.c.STR.TURN:
this.setStructure ( new JM.Turn (this.bioPolymer, this.monomerIndex, 1));
break;
case J.c.STR.NONE:
this.setStructure (null);
}
} else {
this.setStructure (this.bioPolymer.getProteinStructure (monomerIndexCurrent));
if (this.proteinStructure != null) this.proteinStructure.addMonomer (this.monomerIndex);
}return this.monomerIndex;
}, "J.c.STR,~N");
Clazz_defineMethod (c$, "getAtom", 
function (specialAtomID) {
return (specialAtomID == 2 ? this.getLeadAtom () : null);
}, "~N");
Clazz_defineMethod (c$, "getAtomPoint", 
function (specialAtomID) {
return (specialAtomID == 2 ? this.getLeadAtom () : null);
}, "~N");
Clazz_overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var atom1 = this.getLeadAtom ();
var atom2 = possiblyPreviousMonomer.getLeadAtom ();
return atom1.isBonded (atom2) || atom1.distance (atom2) <= 4.2;
}, "JM.Monomer");
Clazz_overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
return this.getQuaternionFrameCenterAlpha (qType);
}, "~S");
Clazz_overrideMethod (c$, "isWithinStructure", 
function (type) {
return (this.proteinStructure != null && this.proteinStructure.type === type && this.proteinStructure.isWithin (this.monomerIndex));
}, "J.c.STR");
Clazz_defineMethod (c$, "getQuaternionFrameCenterAlpha", 
function (qType) {
switch (qType) {
case 'b':
case 'c':
case 'C':
case 'x':
return this.getLeadAtom ();
default:
case 'a':
case 'n':
case 'p':
case 'P':
case 'q':
return null;
}
}, "~S");
Clazz_overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz_overrideMethod (c$, "getQuaternion", 
function (qType) {
return this.getQuaternionAlpha (qType);
}, "~S");
Clazz_defineMethod (c$, "getQuaternionAlpha", 
function (qType) {
if (this.monomerIndex < 0) return null;
var vA =  new JU.V3 ();
var vB =  new JU.V3 ();
var vC = null;
switch (qType) {
default:
case 'a':
case 'n':
case 'p':
case 'q':
return null;
case 'b':
case 'c':
case 'x':
if (this.monomerIndex == 0 || this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var ptCa = this.getLeadAtom ();
var ptCaNext = this.bioPolymer.getLeadPoint (this.monomerIndex + 1);
var ptCaPrev = this.bioPolymer.getLeadPoint (this.monomerIndex - 1);
vA.sub2 (ptCaNext, ptCa);
vB.sub2 (ptCaPrev, ptCa);
break;
}
return JU.Quat.getQuaternionFrameV (vA, vB, vC, false);
}, "~S");
Clazz_defineStatics (c$,
"alphaOffsets",  Clazz_newByteArray (-1, [0]));
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.Structure"], "JM.ProteinStructure", ["java.util.Hashtable", "JU.P3", "$.V3", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.type = null;
this.subtype = null;
this.structureID = null;
this.strucNo = 0;
this.serialID = 0;
this.strandCount = 1;
this.nRes = 0;
this.apolymer = null;
this.monomerIndexFirst = 0;
this.monomerIndexLast = 0;
this.axisA = null;
this.axisB = null;
this.axisUnitVector = null;
this.vectorProjection = null;
this.segments = null;
this.resMap = null;
Clazz_instantialize (this, arguments);
}, JM, "ProteinStructure", null, JM.Structure);
Clazz_defineMethod (c$, "setupPS", 
function (apolymer, type, monomerIndex, monomerCount) {
this.strucNo = ++JM.ProteinStructure.globalStrucNo;
this.apolymer = apolymer;
this.type = type;
this.vectorProjection =  new JU.V3 ();
this.monomerIndexFirst = monomerIndex;
this.addMonomer (monomerIndex + monomerCount - 1);
if (JU.Logger.debugging) JU.Logger.info ("Creating ProteinStructure " + this.strucNo + " " + type.getBioStructureTypeName (false) + " from " + apolymer.monomers[this.monomerIndexFirst] + " through " + apolymer.monomers[this.monomerIndexLast] + " in polymer " + apolymer);
}, "JM.AlphaPolymer,J.c.STR,~N,~N");
Clazz_defineMethod (c$, "addMonomer", 
function (index) {
this.resMap = null;
this.resetAxes ();
this.monomerIndexFirst = Math.min (this.monomerIndexFirst, index);
this.monomerIndexLast = Math.max (this.monomerIndexLast, index);
this.nRes = this.monomerIndexLast - this.monomerIndexFirst + 1;
}, "~N");
Clazz_defineMethod (c$, "removeMonomer", 
function (index) {
this.resMap = null;
this.resetAxes ();
if (index > this.monomerIndexLast || index < this.monomerIndexFirst) return;
if (index == this.monomerIndexFirst) {
this.monomerIndexFirst++;
this.nRes--;
} else if (index == this.monomerIndexLast) {
this.monomerIndexLast--;
this.nRes--;
} else {
var n = this.monomerIndexLast - index;
this.monomerIndexLast = index - 1;
this.nRes = index - this.monomerIndexFirst;
var monomers = this.apolymer.monomers;
var type = monomers[++index].getProteinStructureType ();
var mLast = -1;
for (var i = 0, pt = index; i < n; i++, pt++) {
(monomers[pt]).setStructure (null);
mLast = monomers[pt].setProteinStructureType (type, mLast);
}
}}, "~N");
Clazz_defineMethod (c$, "calcAxis", 
function () {
});
Clazz_defineMethod (c$, "isWithin", 
function (monomerIndex) {
return (monomerIndex > this.monomerIndexFirst && monomerIndex < this.monomerIndexLast);
}, "~N");
Clazz_defineMethod (c$, "getIndex", 
function (monomer) {
if (this.resMap == null) {
this.resMap =  new java.util.Hashtable ();
for (var i = this.nRes; --i >= 0; ) this.resMap.put (this.apolymer.monomers[this.monomerIndexFirst + i], Integer.$valueOf (i));

}var ii = this.resMap.get (monomer);
return (ii == null ? -1 : ii.intValue ());
}, "JM.Monomer");
Clazz_defineMethod (c$, "getSegments", 
function () {
if (this.segments == null) this.calcSegments ();
return this.segments;
});
Clazz_defineMethod (c$, "getStructureMidPoint", 
function (index) {
if (this.segments == null) this.calcSegments ();
return this.segments[index];
}, "~N");
Clazz_defineMethod (c$, "calcSegments", 
 function () {
if (this.segments != null) return;
this.calcAxis ();
this.segments =  new Array (this.nRes + 1);
this.segments[this.nRes] = this.axisB;
this.segments[0] = this.axisA;
var axis = JU.V3.newV (this.axisUnitVector);
axis.scale (this.axisB.distance (this.axisA) / this.nRes);
for (var i = 1; i < this.nRes; i++) {
var point = this.segments[i] =  new JU.P3 ();
point.add2 (this.segments[i - 1], axis);
}
});
Clazz_defineMethod (c$, "getAxisStartPoint", 
function () {
this.calcAxis ();
return this.axisA;
});
Clazz_defineMethod (c$, "getAxisEndPoint", 
function () {
this.calcAxis ();
return this.axisB;
});
Clazz_defineMethod (c$, "resetAxes", 
function () {
this.axisA = null;
this.segments = null;
});
Clazz_overrideMethod (c$, "setAtomBits", 
function (bs) {
var ms = this.apolymer.monomers;
for (var i = this.monomerIndexFirst; i <= this.monomerIndexLast; i++) ms[i].setAtomBits (bs);

}, "JU.BS");
Clazz_overrideMethod (c$, "setAtomBitsAndClear", 
function (bs, bsOut) {
var ms = this.apolymer.monomers;
for (var i = this.monomerIndexFirst; i <= this.monomerIndexLast; i++) ms[i].setAtomBitsAndClear (bs, bsOut);

}, "JU.BS,JU.BS");
Clazz_defineMethod (c$, "findMonomer", 
function (bsAtoms, isFirst) {
var ms = this.apolymer.monomers;
if (isFirst) {
for (var i = this.monomerIndexFirst; i <= this.monomerIndexLast; i++) if (bsAtoms == null || bsAtoms.get (ms[i].leadAtomIndex)) return ms[i];

} else {
for (var i = this.monomerIndexLast; i >= this.monomerIndexFirst; --i) if (bsAtoms == null || bsAtoms.get (ms[i].leadAtomIndex)) return ms[i];

}return null;
}, "JU.BS,~B");
Clazz_defineStatics (c$,
"globalStrucNo", 1000);
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.ProteinStructure"], "JM.Helix", ["JU.Measure", "$.P3", "$.V3", "J.c.STR"], function () {
c$ = Clazz_declareType (JM, "Helix", JM.ProteinStructure);
Clazz_overrideConstructor (c$, 
function (apolymer, monomerIndex, monomerCount, subtype) {
this.setupPS (apolymer, J.c.STR.HELIX, monomerIndex, monomerCount);
this.subtype = subtype;
}, "JM.AlphaPolymer,~N,~N,J.c.STR");
Clazz_overrideMethod (c$, "calcAxis", 
function () {
if (this.axisA != null) return;
var points =  new Array (this.nRes + 1);
for (var i = 0; i <= this.nRes; i++) this.apolymer.getLeadMidPoint (this.monomerIndexFirst + i, points[i] =  new JU.P3 ());

this.axisA =  new JU.P3 ();
this.axisUnitVector =  new JU.V3 ();
JU.Measure.calcBestAxisThroughPoints (points, this.axisA, this.axisUnitVector, this.vectorProjection, 4);
this.axisB = JU.P3.newP (points[this.nRes]);
JU.Measure.projectOntoAxis (this.axisB, this.axisA, this.axisUnitVector, this.vectorProjection);
});
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.ProteinStructure"], "JM.Sheet", ["JU.Measure", "$.P3", "$.V3", "J.c.STR", "JM.AminoPolymer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.widthUnitVector = null;
this.heightUnitVector = null;
Clazz_instantialize (this, arguments);
}, JM, "Sheet", JM.ProteinStructure);
Clazz_overrideConstructor (c$, 
function (apolymer, monomerIndex, monomerCount, subtype) {
this.setupPS (apolymer, J.c.STR.SHEET, monomerIndex, monomerCount);
this.subtype = subtype;
}, "JM.AlphaPolymer,~N,~N,J.c.STR");
Clazz_overrideMethod (c$, "calcAxis", 
function () {
if (this.axisA != null) return;
if (this.nRes == 2) {
this.axisA = this.apolymer.getLeadPoint (this.monomerIndexFirst);
this.axisB = this.apolymer.getLeadPoint (this.monomerIndexFirst + 1);
} else {
this.axisA =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst + 1, this.axisA);
this.axisB =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst + this.nRes - 1, this.axisB);
}this.axisUnitVector =  new JU.V3 ();
this.axisUnitVector.sub2 (this.axisB, this.axisA);
this.axisUnitVector.normalize ();
var tempA =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst, tempA);
if (this.notHelixOrSheet (this.monomerIndexFirst - 1)) JU.Measure.projectOntoAxis (tempA, this.axisA, this.axisUnitVector, this.vectorProjection);
var tempB =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst + this.nRes, tempB);
if (this.notHelixOrSheet (this.monomerIndexFirst + this.nRes)) JU.Measure.projectOntoAxis (tempB, this.axisA, this.axisUnitVector, this.vectorProjection);
this.axisA = tempA;
this.axisB = tempB;
});
Clazz_defineMethod (c$, "notHelixOrSheet", 
 function (i) {
return (i < 0 || i >= this.apolymer.monomerCount || !this.apolymer.monomers[i].isHelix () && !this.apolymer.monomers[i].isSheet ());
}, "~N");
Clazz_defineMethod (c$, "calcSheetUnitVectors", 
function () {
if (!(Clazz_instanceOf (this.apolymer, JM.AminoPolymer))) return;
if (this.widthUnitVector == null) {
var vectorCO =  new JU.V3 ();
var vectorCOSum =  new JU.V3 ();
var amino = this.apolymer.monomers[this.monomerIndexFirst];
vectorCOSum.sub2 (amino.getCarbonylOxygenAtom (), amino.getCarbonylCarbonAtom ());
for (var i = this.nRes; --i > this.monomerIndexFirst; ) {
amino = this.apolymer.monomers[i];
vectorCO.sub2 (amino.getCarbonylOxygenAtom (), amino.getCarbonylCarbonAtom ());
if (vectorCOSum.angle (vectorCO) < 1.5707964) vectorCOSum.add (vectorCO);
 else vectorCOSum.sub (vectorCO);
}
this.heightUnitVector = vectorCO;
this.heightUnitVector.cross (this.axisUnitVector, vectorCOSum);
this.heightUnitVector.normalize ();
this.widthUnitVector = vectorCOSum;
this.widthUnitVector.cross (this.axisUnitVector, this.heightUnitVector);
}});
Clazz_defineMethod (c$, "setBox", 
function (w, h, pt, vW, vH, ptC, scale) {
if (this.heightUnitVector == null) this.calcSheetUnitVectors ();
vW.setT (this.widthUnitVector);
vW.scale (scale * w);
vH.setT (this.heightUnitVector);
vH.scale (scale * h);
ptC.ave (vW, vH);
ptC.sub2 (pt, ptC);
}, "~N,~N,JU.P3,JU.V3,JU.V3,JU.P3,~N");
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.ProteinStructure"], "JM.Turn", ["J.c.STR"], function () {
c$ = Clazz_declareType (JM, "Turn", JM.ProteinStructure);
Clazz_overrideConstructor (c$, 
function (apolymer, monomerIndex, monomerCount) {
this.setupPS (apolymer, J.c.STR.TURN, monomerIndex, monomerCount);
this.subtype = J.c.STR.TURN;
}, "JM.AlphaPolymer,~N,~N");
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.Structure", "JU.V3"], "JM.BioPolymer", ["java.lang.Float", "JU.BS", "$.P3"], function () {
c$ = Clazz_decorateAsClass (function () {
this.model = null;
this.monomers = null;
this.hasStructure = false;
this.leadMidpoints = null;
this.leadPoints = null;
this.controlPoints = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.type = 0;
this.bioPolymerIndexInModel = 0;
this.monomerCount = 0;
this.cyclicFlag = 0;
this.invalidLead = false;
this.invalidControl = false;
this.sheetSmoothing = 0;
this.hasWingPoints = false;
this.reversed = null;
this.twistedSheets = false;
this.unitVectorX = null;
this.selectedMonomerCount = 0;
this.bsSelectedMonomers = null;
this.haveParameters = false;
Clazz_instantialize (this, arguments);
}, JM, "BioPolymer", null, JM.Structure);
Clazz_prepareFields (c$, function () {
this.unitVectorX = JU.V3.new3 (1, 0, 0);
});
Clazz_makeConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "set", 
function (monomers) {
this.monomers = monomers;
this.monomerCount = monomers.length;
for (var i = this.monomerCount; --i >= 0; ) monomers[i].setBioPolymer (this, i);

this.model = monomers[0].getModel ();
}, "~A");
Clazz_overrideMethod (c$, "setAtomBits", 
function (bs) {
this.getRange (bs, true);
}, "JU.BS");
Clazz_overrideMethod (c$, "setAtomBitsAndClear", 
function (bs, bsOut) {
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].setAtomBitsAndClear (bs, bsOut);

}, "JU.BS,JU.BS");
Clazz_defineMethod (c$, "getRange", 
function (bs, isMutated) {
if (this.monomerCount == 0) return;
if (isMutated) {
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].setAtomBits (bs);

} else {
bs.setBits (this.monomers[0].firstAtomIndex, this.monomers[this.monomerCount - 1].lastAtomIndex + 1);
}}, "JU.BS,~B");
Clazz_defineMethod (c$, "clearStructures", 
function () {
});
Clazz_defineMethod (c$, "getLeadAtomIndices", 
function () {
if (this.leadAtomIndices == null) {
this.leadAtomIndices =  Clazz_newIntArray (this.monomerCount, 0);
this.invalidLead = true;
}if (this.invalidLead) {
for (var i = this.monomerCount; --i >= 0; ) this.leadAtomIndices[i] = this.monomers[i].leadAtomIndex;

this.invalidLead = false;
}return this.leadAtomIndices;
});
Clazz_defineMethod (c$, "getIndex", 
function (chainID, seqcode, istart, iend) {
var i;
for (i = this.monomerCount; --i >= 0; ) {
var m = this.monomers[i];
if (m.chain.chainID == chainID && m.seqcode == seqcode && (istart < 0 || istart == m.firstAtomIndex || iend == m.lastAtomIndex)) break;
}
return i;
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "getLeadPoint", 
function (monomerIndex) {
return this.monomers[monomerIndex].getLeadAtom ();
}, "~N");
Clazz_defineMethod (c$, "getInitiatorPoint", 
 function () {
return this.monomers[0].getInitiatorAtom ();
});
Clazz_defineMethod (c$, "getTerminatorPoint", 
 function () {
return this.monomers[this.monomerCount - 1].getTerminatorAtom ();
});
Clazz_defineMethod (c$, "getLeadMidPoint", 
function (i, midPoint) {
if (i == this.monomerCount) {
--i;
} else if (i > 0) {
midPoint.ave (this.getLeadPoint (i), this.getLeadPoint (i - 1));
return;
}midPoint.setT (this.getLeadPoint (i));
}, "~N,JU.P3");
Clazz_defineMethod (c$, "getWingPoint", 
function (polymerIndex) {
return this.monomers[polymerIndex].getWingAtom ();
}, "~N");
Clazz_defineMethod (c$, "setConformation", 
function (bsSelected) {
var atoms = this.model.ms.at;
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].updateOffsetsForAlternativeLocations (atoms, bsSelected);

this.recalculateLeadMidpointsAndWingVectors ();
}, "JU.BS");
Clazz_defineMethod (c$, "recalculateLeadMidpointsAndWingVectors", 
function () {
this.invalidLead = this.invalidControl = true;
this.getLeadAtomIndices ();
this.resetHydrogenPoints ();
this.calcLeadMidpointsAndWingVectors ();
});
Clazz_defineMethod (c$, "resetHydrogenPoints", 
function () {
});
Clazz_defineMethod (c$, "getLeadMidpoints", 
function () {
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.leadMidpoints;
});
Clazz_defineMethod (c$, "getLeadPoints", 
function () {
if (this.leadPoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.leadPoints;
});
Clazz_defineMethod (c$, "getControlPoints", 
function (isTraceAlpha, sheetSmoothing, invalidate) {
if (invalidate) this.invalidControl = true;
return (!isTraceAlpha ? this.leadMidpoints : sheetSmoothing == 0 ? this.leadPoints : this.getControlPoints2 (sheetSmoothing));
}, "~B,~N,~B");
Clazz_defineMethod (c$, "getControlPoints2", 
 function (sheetSmoothing) {
if (!this.invalidControl && sheetSmoothing == this.sheetSmoothing) return this.controlPoints;
this.getLeadPoints ();
var v =  new JU.V3 ();
if (this.controlPoints == null) this.controlPoints =  new Array (this.monomerCount + 1);
if (!Float.isNaN (sheetSmoothing)) this.sheetSmoothing = sheetSmoothing;
for (var i = 0; i < this.monomerCount; i++) this.controlPoints[i] = this.getControlPoint (i, v);

this.controlPoints[this.monomerCount] = this.getTerminatorPoint ();
this.invalidControl = false;
return this.controlPoints;
}, "~N");
Clazz_defineMethod (c$, "getControlPoint", 
function (i, v) {
return this.leadPoints[i];
}, "~N,JU.V3");
Clazz_defineMethod (c$, "getWingVectors", 
function () {
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.wingVectors;
});
Clazz_defineMethod (c$, "calcLeadMidpointsAndWingVectors", 
 function () {
if (this.leadMidpoints == null) {
this.leadMidpoints =  new Array (this.monomerCount + 1);
this.leadPoints =  new Array (this.monomerCount + 1);
this.wingVectors =  new Array (this.monomerCount + 1);
this.sheetSmoothing = 1.4E-45;
}if (this.reversed == null) this.reversed = JU.BS.newN (this.monomerCount);
 else this.reversed.clearAll ();
this.twistedSheets = this.model.ms.vwr.getBoolean (603979968);
var vectorA =  new JU.V3 ();
var vectorB =  new JU.V3 ();
var vectorC =  new JU.V3 ();
var vectorD =  new JU.V3 ();
var leadPointPrev;
var leadPoint;
this.leadMidpoints[0] = this.getInitiatorPoint ();
this.leadPoints[0] = leadPoint = this.getLeadPoint (0);
var previousVectorD = null;
for (var i = 1; i < this.monomerCount; ++i) {
leadPointPrev = leadPoint;
this.leadPoints[i] = leadPoint = this.getLeadPoint (i);
var midpoint =  new JU.P3 ();
midpoint.ave (leadPoint, leadPointPrev);
this.leadMidpoints[i] = midpoint;
if (this.hasWingPoints) {
vectorA.sub2 (leadPoint, leadPointPrev);
vectorB.sub2 (leadPointPrev, this.getWingPoint (i - 1));
vectorC.cross (vectorA, vectorB);
vectorD.cross (vectorA, vectorC);
vectorD.normalize ();
if (!this.twistedSheets && previousVectorD != null && previousVectorD.angle (vectorD) > 1.5707963267948966) {
this.reversed.set (i);
vectorD.scale (-1);
}previousVectorD = this.wingVectors[i] = JU.V3.newV (vectorD);
}}
this.leadPoints[this.monomerCount] = this.leadMidpoints[this.monomerCount] = this.getTerminatorPoint ();
if (!this.hasWingPoints) {
if (this.monomerCount < 3) {
this.wingVectors[1] = this.unitVectorX;
} else {
var previousVectorC = null;
for (var i = 1; i < this.monomerCount; ++i) {
vectorA.sub2 (this.leadMidpoints[i], this.leadPoints[i]);
vectorB.sub2 (this.leadPoints[i], this.leadMidpoints[i + 1]);
vectorC.cross (vectorA, vectorB);
vectorC.normalize ();
if (previousVectorC != null && previousVectorC.angle (vectorC) > 1.5707963267948966) vectorC.scale (-1);
previousVectorC = this.wingVectors[i] = JU.V3.newV (vectorC);
}
}}this.wingVectors[0] = this.wingVectors[1];
this.wingVectors[this.monomerCount] = this.wingVectors[this.monomerCount - 1];
});
Clazz_defineMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, mads, myVisibilityFlag, bsNot) {
for (var i = this.monomerCount; --i >= 0; ) {
if ((this.monomers[i].shapeVisibilityFlags & myVisibilityFlag) == 0) continue;
var a = this.monomers[i].getLeadAtom ();
if (!a.checkVisible () || bsNot != null && bsNot.get (a.i)) continue;
if (mads[i] > 0 || mads[i + 1] > 0) this.monomers[i].findNearestAtomIndex (xMouse, yMouse, closest, mads[i], mads[i + 1]);
}
}, "~N,~N,~A,~A,~N,JU.BS");
Clazz_defineMethod (c$, "getSelectedMonomerCount", 
function () {
return this.selectedMonomerCount;
});
Clazz_defineMethod (c$, "calcSelectedMonomersCount", 
function (bsSelected) {
this.selectedMonomerCount = 0;
if (this.bsSelectedMonomers == null) this.bsSelectedMonomers =  new JU.BS ();
this.bsSelectedMonomers.clearAll ();
for (var i = 0; i < this.monomerCount; i++) {
if (this.monomers[i].isSelected (bsSelected)) {
++this.selectedMonomerCount;
this.bsSelectedMonomers.set (i);
}}
}, "JU.BS");
Clazz_defineMethod (c$, "isMonomerSelected", 
function (i) {
return (i >= 0 && this.bsSelectedMonomers.get (i));
}, "~N");
Clazz_defineMethod (c$, "getPolymerPointsAndVectors", 
function (last, bs, vList, isTraceAlpha, sheetSmoothing) {
var points = this.getControlPoints (isTraceAlpha, sheetSmoothing, false);
var vectors = this.getWingVectors ();
var count = this.monomerCount;
for (var j = 0; j < count; j++) if (bs.get (this.monomers[j].leadAtomIndex)) {
vList.addLast ( Clazz_newArray (-1, [points[j], JU.P3.newP (vectors[j])]));
last = j;
} else if (last != 2147483646) {
vList.addLast ( Clazz_newArray (-1, [points[j], JU.P3.newP (vectors[j])]));
last = 2147483646;
}
if (last + 1 < count) vList.addLast ( Clazz_newArray (-1, [points[last + 1], JU.P3.newP (vectors[last + 1])]));
return last;
}, "~N,JU.BS,JU.Lst,~B,~N");
Clazz_defineMethod (c$, "getSequence", 
function () {
var buf =  Clazz_newCharArray (this.monomerCount, '\0');
for (var i = 0; i < this.monomerCount; i++) buf[i] = this.monomers[i].getGroup1 ();

return String.valueOf (buf);
});
Clazz_defineMethod (c$, "getPolymerSequenceAtoms", 
function (group1, nGroups, bsInclude, bsResult) {
for (var i = Math.min (this.monomerCount, group1 + nGroups); --i >= group1; ) this.monomers[i].getMonomerSequenceAtoms (bsInclude, bsResult);

}, "~N,~N,JU.BS,JU.BS");
Clazz_defineMethod (c$, "getProteinStructure", 
function (monomerIndex) {
return null;
}, "~N");
Clazz_defineMethod (c$, "calcParameters", 
function () {
this.haveParameters = true;
return this.calcEtaThetaAngles () || this.calcPhiPsiAngles ();
});
Clazz_defineMethod (c$, "calcEtaThetaAngles", 
function () {
return false;
});
Clazz_defineMethod (c$, "calcPhiPsiAngles", 
function () {
return false;
});
Clazz_defineMethod (c$, "calculateRamachandranHelixAngle", 
function (m, qtype) {
return NaN;
}, "~N,~S");
Clazz_defineMethod (c$, "isNucleic", 
function () {
return (this.monomerCount > 0 && Clazz_instanceOf (this, JM.NucleicPolymer));
});
Clazz_defineMethod (c$, "getRangeGroups", 
function (nResidues, bsAtoms, bsResult) {
var bsTemp =  new JU.BS ();
for (var i = 0; i < this.monomerCount; i++) {
if (!this.monomers[i].isSelected (bsAtoms)) continue;
bsTemp.setBits (Math.max (0, i - nResidues), i + nResidues + 1);
i += nResidues - 1;
}
for (var i = bsTemp.nextSetBit (0); i >= 0 && i < this.monomerCount; i = bsTemp.nextSetBit (i + 1)) this.monomers[i].setAtomBits (bsResult);

}, "~N,JU.BS,JU.BS");
Clazz_defineMethod (c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vHBonds, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
}, "JM.BioPolymer,JU.BS,JU.BS,JU.Lst,~N,~A,~B,~B");
Clazz_defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz_defineMethod (c$, "isCyclic", 
function () {
return ((this.cyclicFlag == 0 ? (this.cyclicFlag = (this.monomerCount >= 4 && this.monomers[0].isConnectedAfter (this.monomers[this.monomerCount - 1])) ? 1 : -1) : this.cyclicFlag) == 1);
});
Clazz_overrideMethod (c$, "toString", 
function () {
return "[Polymer type " + this.type + " n=" + this.monomerCount + " " + (this.monomerCount > 0 ? this.monomers[0] + " " + this.monomers[this.monomerCount - 1] : "") + "]";
});
Clazz_defineStatics (c$,
"TYPE_NOBONDING", 0,
"TYPE_AMINO", 1,
"TYPE_NUCLEIC", 2,
"TYPE_CARBOHYDRATE", 3);
});
Clazz_declarePackage ("JM");
Clazz_load (["java.lang.Enum", "JM.BioPolymer"], "JM.AlphaPolymer", ["JU.Measure", "$.P3", "J.c.STR", "JM.Helix", "$.Sheet", "$.Turn", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.pt0 = 0;
Clazz_instantialize (this, arguments);
}, JM, "AlphaPolymer", JM.BioPolymer);
Clazz_makeConstructor (c$, 
function (monomers, pt0) {
Clazz_superConstructor (this, JM.AlphaPolymer, []);
this.pt0 = pt0;
this.set (monomers);
this.hasStructure = true;
}, "~A,~N");
Clazz_overrideMethod (c$, "getProteinStructure", 
function (monomerIndex) {
return this.monomers[monomerIndex].getStructure ();
}, "~N");
Clazz_overrideMethod (c$, "getControlPoint", 
function (i, v) {
if (!this.monomers[i].isSheet ()) return this.leadPoints[i];
v.sub2 (this.leadMidpoints[i], this.leadPoints[i]);
v.scale (this.sheetSmoothing);
var pt = JU.P3.newP (this.leadPoints[i]);
pt.add (v);
return pt;
}, "~N,JU.V3");
Clazz_defineMethod (c$, "addStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned) {
var i0 = -1;
var i1 = -1;
if (istart < iend) {
if (this.monomers[0].firstAtomIndex > iend || this.monomers[this.monomerCount - 1].lastAtomIndex < istart) return;
i0 = istart;
i1 = iend;
}var indexStart;
var indexEnd;
if ((indexStart = this.getIndex (startChainID, startSeqcode, i0, i1)) == -1 || (indexEnd = this.getIndex (endChainID, endSeqcode, i0, i1)) == -1) return;
if (istart >= 0 && bsAssigned != null) {
var pt = bsAssigned.nextSetBit (this.monomers[indexStart].firstAtomIndex);
if (pt >= 0 && pt < this.monomers[indexEnd].lastAtomIndex) return;
}if (this.addStructureProtected (type, structureID, serialID, strandCount, indexStart, indexEnd) && istart >= 0) bsAssigned.setBits (istart, iend + 1);
}, "J.c.STR,~S,~N,~N,~N,~N,~N,~N,~N,~N,JU.BS");
Clazz_defineMethod (c$, "addStructureProtected", 
function (type, structureID, serialID, strandCount, indexStart, indexEnd) {
if (indexEnd < indexStart) {
JU.Logger.error ("AlphaPolymer:addSecondaryStructure error:  indexStart:" + indexStart + " indexEnd:" + indexEnd);
return false;
}var structureCount = indexEnd - indexStart + 1;
var ps = null;
switch (type) {
case J.c.STR.HELIX:
case J.c.STR.HELIXALPHA:
case J.c.STR.HELIX310:
case J.c.STR.HELIXPI:
ps =  new JM.Helix (this, indexStart, structureCount, type);
break;
case J.c.STR.SHEET:
ps =  new JM.Sheet (this, indexStart, structureCount, type);
break;
case J.c.STR.TURN:
ps =  new JM.Turn (this, indexStart, structureCount);
break;
default:
JU.Logger.error ("unrecognized secondary structure type");
return false;
}
ps.structureID = structureID;
ps.serialID = serialID;
ps.strandCount = strandCount;
for (var i = indexStart; i <= indexEnd; ++i) (this.monomers[i]).setStructure (ps);

return true;
}, "J.c.STR,~S,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "clearStructures", 
function () {
for (var i = 0; i < this.monomerCount; i++) (this.monomers[i]).setStructure (null);

});
Clazz_defineMethod (c$, "calculateStructures", 
function (alphaOnly) {
if (this.monomerCount < 4) return;
var angles = this.calculateAnglesInDegrees ();
var codes = this.calculateCodes (angles);
this.checkBetaSheetAlphaHelixOverlap (codes, angles);
var tags = this.calculateRunsFourOrMore (codes);
this.extendRuns (tags);
this.searchForTurns (codes, angles, tags);
this.addStructuresFromTags (tags);
}, "~B");
Clazz_defineMethod (c$, "calculateAnglesInDegrees", 
 function () {
var angles =  Clazz_newFloatArray (this.monomerCount, 0);
for (var i = this.monomerCount - 1; --i >= 2; ) angles[i] = JU.Measure.computeTorsion (this.monomers[i - 2].getLeadAtom (), this.monomers[i - 1].getLeadAtom (), this.monomers[i].getLeadAtom (), this.monomers[i + 1].getLeadAtom (), true);

return angles;
});
Clazz_defineMethod (c$, "calculateCodes", 
 function (angles) {
var codes =  new Array (this.monomerCount);
for (var i = this.monomerCount - 1; --i >= 2; ) {
var degrees = angles[i];
codes[i] = ((degrees >= 10 && degrees < 120) ? JM.AlphaPolymer.Code.RIGHT_HELIX : ((degrees >= 120 || degrees < -90) ? JM.AlphaPolymer.Code.BETA_SHEET : ((degrees >= -90 && degrees < 0) ? JM.AlphaPolymer.Code.LEFT_HELIX : JM.AlphaPolymer.Code.NADA)));
}
return codes;
}, "~A");
Clazz_defineMethod (c$, "checkBetaSheetAlphaHelixOverlap", 
 function (codes, angles) {
for (var i = this.monomerCount - 2; --i >= 2; ) if (codes[i] === JM.AlphaPolymer.Code.BETA_SHEET && angles[i] <= 140 && codes[i - 2] === JM.AlphaPolymer.Code.RIGHT_HELIX && codes[i - 1] === JM.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 1] === JM.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 2] === JM.AlphaPolymer.Code.RIGHT_HELIX) codes[i] = JM.AlphaPolymer.Code.RIGHT_HELIX;

}, "~A,~A");
Clazz_defineMethod (c$, "calculateRunsFourOrMore", 
 function (codes) {
var tags =  new Array (this.monomerCount);
var tag = J.c.STR.NONE;
var code = JM.AlphaPolymer.Code.NADA;
var runLength = 0;
for (var i = 0; i < this.monomerCount; ++i) {
if (codes[i] === code && code !== JM.AlphaPolymer.Code.NADA && code !== JM.AlphaPolymer.Code.BETA_SHEET) {
++runLength;
if (runLength == 4) {
tag = (code === JM.AlphaPolymer.Code.BETA_SHEET ? J.c.STR.SHEET : J.c.STR.HELIX);
for (var j = 4; --j >= 0; ) tags[i - j] = tag;

} else if (runLength > 4) tags[i] = tag;
} else {
runLength = 1;
code = codes[i];
}}
return tags;
}, "~A");
Clazz_defineMethod (c$, "extendRuns", 
 function (tags) {
for (var i = 1; i < this.monomerCount - 4; ++i) if (tags[i] === J.c.STR.NONE && tags[i + 1] !== J.c.STR.NONE) tags[i] = tags[i + 1];

tags[0] = tags[1];
tags[this.monomerCount - 1] = tags[this.monomerCount - 2];
}, "~A");
Clazz_defineMethod (c$, "searchForTurns", 
 function (codes, angles, tags) {
for (var i = this.monomerCount - 1; --i >= 2; ) {
codes[i] = JM.AlphaPolymer.Code.NADA;
if (tags[i] == null || tags[i] === J.c.STR.NONE) {
var angle = angles[i];
if (angle >= -90 && angle < 0) codes[i] = JM.AlphaPolymer.Code.LEFT_TURN;
 else if (angle >= 0 && angle < 90) codes[i] = JM.AlphaPolymer.Code.RIGHT_TURN;
}}
for (var i = this.monomerCount - 1; --i >= 0; ) {
if (codes[i] !== JM.AlphaPolymer.Code.NADA && codes[i + 1] === codes[i] && tags[i] === J.c.STR.NONE) tags[i] = J.c.STR.TURN;
}
}, "~A,~A,~A");
Clazz_defineMethod (c$, "addStructuresFromTags", 
 function (tags) {
var i = 0;
while (i < this.monomerCount) {
var tag = tags[i];
if (tag == null || tag === J.c.STR.NONE) {
++i;
continue;
}var iMax;
for (iMax = i + 1; iMax < this.monomerCount && tags[iMax] === tag; ++iMax) {
}
this.addStructureProtected (tag, null, 0, 0, i, iMax - 1);
i = iMax;
}
}, "~A");
Clazz_defineMethod (c$, "setStructureBS", 
function (count, dsspType, type, bs, doOffset) {
var offset = (doOffset ? this.pt0 : 0);
for (var pt = 0, i = bs.nextSetBit (offset), i2 = 0, n = this.monomerCount + offset; i >= 0 && i < n; i = bs.nextSetBit (i2 + 1)) {
if ((i2 = bs.nextClearBit (i)) < 0 || i2 > n) i2 = n;
this.addStructureProtected (type, JM.AlphaPolymer.dsspTypes[dsspType] + (++pt), count++, (dsspType == 3 ? 1 : 0), i - offset, i2 - 1 - offset);
}
return count;
}, "~N,~N,J.c.STR,JU.BS,~B");
Clazz_pu$h(self.c$);
c$ = Clazz_declareType (JM.AlphaPolymer, "Code", Enum);
Clazz_defineEnumConstant (c$, "NADA", 0, []);
Clazz_defineEnumConstant (c$, "RIGHT_HELIX", 1, []);
Clazz_defineEnumConstant (c$, "BETA_SHEET", 2, []);
Clazz_defineEnumConstant (c$, "LEFT_HELIX", 3, []);
Clazz_defineEnumConstant (c$, "LEFT_TURN", 4, []);
Clazz_defineEnumConstant (c$, "RIGHT_TURN", 5, []);
c$ = Clazz_p0p ();
Clazz_defineStatics (c$,
"dsspTypes",  Clazz_newArray (-1, ["H", null, "H", "S", "H", null, "T"]));
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.AlphaMonomer"], "JM.AminoMonomer", ["JU.A4", "$.BS", "$.M3", "$.P3", "$.PT", "$.Quat", "$.V3", "J.c.STR", "JU.Escape", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.nhChecked = false;
this.ptTemp = null;
Clazz_instantialize (this, arguments);
}, JM, "AminoMonomer", JM.AlphaMonomer);
Clazz_overrideConstructor (c$, 
function () {
});
c$.validateAndAllocate = Clazz_defineMethod (c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms) {
var offsets = JM.Monomer.scanForOffsets (firstAtomIndex, specialAtomIndexes, JM.AminoMonomer.interestingAminoAtomIDs);
if (offsets == null) return null;
JM.Monomer.checkOptional (offsets, 1, firstAtomIndex, specialAtomIndexes[5]);
if (atoms[firstAtomIndex].isHetero () && !JM.AminoMonomer.isBondedCorrectly (firstAtomIndex, offsets, atoms)) return null;
return  new JM.AminoMonomer ().set2 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
}, "JM.Chain,~S,~N,~N,~N,~A,~A");
c$.isBondedCorrectlyRange = Clazz_defineMethod (c$, "isBondedCorrectlyRange", 
 function (offset1, offset2, firstAtomIndex, offsets, atoms) {
var atomIndex1 = firstAtomIndex + (offsets[offset1] & 0xFF);
var atomIndex2 = firstAtomIndex + (offsets[offset2] & 0xFF);
return (atomIndex1 != atomIndex2 && atoms[atomIndex1].isBonded (atoms[atomIndex2]));
}, "~N,~N,~N,~A,~A");
c$.isBondedCorrectly = Clazz_defineMethod (c$, "isBondedCorrectly", 
 function (firstAtomIndex, offsets, atoms) {
return (JM.AminoMonomer.isBondedCorrectlyRange (2, 0, firstAtomIndex, offsets, atoms) && JM.AminoMonomer.isBondedCorrectlyRange (0, 3, firstAtomIndex, offsets, atoms) && (!JM.Monomer.have (offsets, 1) || JM.AminoMonomer.isBondedCorrectlyRange (3, 1, firstAtomIndex, offsets, atoms)));
}, "~N,~A,~A");
Clazz_defineMethod (c$, "isAminoMonomer", 
function () {
return true;
});
Clazz_overrideMethod (c$, "getNitrogenAtom", 
function () {
return this.getAtomFromOffsetIndex (2);
});
Clazz_defineMethod (c$, "getCarbonylCarbonAtom", 
function () {
return this.getAtomFromOffsetIndex (3);
});
Clazz_overrideMethod (c$, "getCarbonylOxygenAtom", 
function () {
return this.getWingAtom ();
});
Clazz_overrideMethod (c$, "getInitiatorAtom", 
function () {
return this.getNitrogenAtom ();
});
Clazz_overrideMethod (c$, "getTerminatorAtom", 
function () {
return this.getAtomFromOffsetIndex (JM.Monomer.have (this.offsets, 4) ? 4 : 3);
});
Clazz_defineMethod (c$, "hasOAtom", 
function () {
return JM.Monomer.have (this.offsets, 1);
});
Clazz_overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var other = possiblyPreviousMonomer;
return other.getCarbonylCarbonAtom ().isBonded (this.getNitrogenAtom ());
}, "JM.Monomer");
Clazz_overrideMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var nitrogen = this.getNitrogenAtom ();
var marBegin = (Clazz_doubleToInt (madBegin / 2));
if (marBegin < 1200) marBegin = 1200;
if (nitrogen.sZ == 0) return;
var radiusBegin = Clazz_floatToInt (this.scaleToScreen (nitrogen.sZ, marBegin));
if (radiusBegin < 4) radiusBegin = 4;
var ccarbon = this.getCarbonylCarbonAtom ();
var marEnd = (Clazz_doubleToInt (madEnd / 2));
if (marEnd < 1200) marEnd = 1200;
var radiusEnd = Clazz_floatToInt (this.scaleToScreen (nitrogen.sZ, marEnd));
if (radiusEnd < 4) radiusEnd = 4;
var alpha = this.getLeadAtom ();
if (this.isCursorOnTopOf (alpha, x, y, Clazz_doubleToInt ((radiusBegin + radiusEnd) / 2), competitor) || this.isCursorOnTopOf (nitrogen, x, y, radiusBegin, competitor) || this.isCursorOnTopOf (ccarbon, x, y, radiusEnd, competitor)) closest[0] = alpha;
}, "~N,~N,~A,~N,~N");
Clazz_defineMethod (c$, "resetHydrogenPoint", 
function () {
this.nhChecked = false;
this.nitrogenHydrogenPoint = null;
});
Clazz_defineMethod (c$, "getNitrogenHydrogenPoint", 
function () {
if (this.nitrogenHydrogenPoint == null && !this.nhChecked) {
this.nhChecked = true;
this.nitrogenHydrogenPoint = this.getExplicitNH ();
}return this.nitrogenHydrogenPoint;
});
Clazz_defineMethod (c$, "getExplicitNH", 
function () {
var nitrogen = this.getNitrogenAtom ();
var h = null;
var bonds = nitrogen.bonds;
if (bonds != null) for (var i = 0; i < bonds.length; i++) if ((h = bonds[i].getOtherAtom (nitrogen)).getElementNumber () == 1) return h;

return null;
});
Clazz_defineMethod (c$, "getNHPoint", 
function (aminoHydrogenPoint, vNH, jmolHPoint, dsspIgnoreHydrogens) {
if (this.monomerIndex <= 0 || this.groupID == 15) return false;
var nitrogenPoint = this.getNitrogenAtom ();
var nhPoint = this.getNitrogenHydrogenPoint ();
if (nhPoint != null && !dsspIgnoreHydrogens) {
vNH.sub2 (nhPoint, nitrogenPoint);
aminoHydrogenPoint.setT (nhPoint);
return true;
}var prev = this.bioPolymer.monomers[this.monomerIndex - 1];
if (jmolHPoint) {
vNH.sub2 (nitrogenPoint, this.getLeadAtom ());
vNH.normalize ();
var v = JU.V3.newVsub (nitrogenPoint, prev.getCarbonylCarbonAtom ());
v.normalize ();
vNH.add (v);
} else {
var oxygen = prev.getCarbonylOxygenAtom ();
if (oxygen == null) return false;
vNH.sub2 (prev.getCarbonylCarbonAtom (), oxygen);
}vNH.normalize ();
aminoHydrogenPoint.add2 (nitrogenPoint, vNH);
this.nitrogenHydrogenPoint = JU.P3.newP (aminoHydrogenPoint);
if (JU.Logger.debugging) JU.Logger.debug ("draw ID \"pta" + this.monomerIndex + "_" + nitrogenPoint.i + "\" " + JU.Escape.eP (nitrogenPoint) + JU.Escape.eP (aminoHydrogenPoint) + " # " + nitrogenPoint);
return true;
}, "JU.P3,JU.V3,~B,~B");
Clazz_overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
if (this.monomerIndex < 0) return null;
switch (qType) {
default:
case 'a':
case 'b':
case 'c':
case 'C':
return this.getQuaternionFrameCenterAlpha (qType);
case 'n':
return this.getNitrogenAtom ();
case 'p':
case 'P':
return this.getCarbonylCarbonAtom ();
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.monomers[this.monomerIndex + 1]);
var pt =  new JU.P3 ();
pt.ave (this.getCarbonylCarbonAtom (), mNext.getNitrogenAtom ());
return pt;
}
}, "~S");
Clazz_overrideMethod (c$, "getQuaternion", 
function (qType) {
if (this.monomerIndex < 0) return null;
var ptC = this.getCarbonylCarbonAtom ();
var ptCa = this.getLeadAtom ();
var vA =  new JU.V3 ();
var vB =  new JU.V3 ();
var vC = null;
switch (qType) {
case 'a':
case 'n':
if (this.monomerIndex == 0 || this.groupID == 15) return null;
vC =  new JU.V3 ();
if (this.ptTemp == null) this.ptTemp =  new JU.P3 ();
this.getNHPoint (this.ptTemp, vC, true, false);
vB.sub2 (ptCa, this.getNitrogenAtom ());
vB.cross (vC, vB);
 new JU.M3 ().setAA (JU.A4.newVA (vB, -0.29670596)).rotate (vC);
vA.cross (vB, vC);
break;
case 'b':
return this.getQuaternionAlpha ('b');
case 'c':
vA.sub2 (ptC, ptCa);
vB.sub2 (this.getNitrogenAtom (), ptCa);
break;
case 'p':
case 'x':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
vA.sub2 (ptCa, ptC);
vB.sub2 ((this.bioPolymer.monomers[this.monomerIndex + 1]).getNitrogenAtom (), ptC);
break;
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.monomers[this.monomerIndex + 1]);
vB.sub2 (mNext.getLeadAtom (), mNext.getNitrogenAtom ());
vA.sub2 (ptCa, ptC);
break;
default:
return null;
}
return JU.Quat.getQuaternionFrameV (vA, vB, vC, false);
}, "~S");
Clazz_overrideMethod (c$, "getStructureId", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return "";
return this.proteinStructure.structureID;
});
Clazz_overrideMethod (c$, "getProteinStructureTag", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return null;
var tag = "%3N %3ID";
tag = JU.PT.formatStringI (tag, "N", this.proteinStructure.serialID);
tag = JU.PT.formatStringS (tag, "ID", this.proteinStructure.structureID);
if (this.proteinStructure.type === J.c.STR.SHEET) tag += JU.PT.formatStringI ("%2SC", "SC", this.proteinStructure.strandCount);
return tag;
});
Clazz_overrideMethod (c$, "getBSSideChain", 
function () {
var bs =  new JU.BS ();
this.setAtomBits (bs);
this.clear (bs, this.getLeadAtom (), true);
this.clear (bs, this.getCarbonylCarbonAtom (), false);
this.clear (bs, this.getCarbonylOxygenAtom (), false);
this.clear (bs, this.getNitrogenAtom (), true);
return bs;
});
Clazz_defineMethod (c$, "clear", 
 function (bs, a, andH) {
if (a == null) return;
bs.clear (a.i);
if (!andH) return;
var b = a.bonds;
var h;
for (var j = b.length; --j >= 0; ) if ((h = b[j].getOtherAtom (a)).getElementNumber () == 1) bs.clear (h.i);

}, "JU.BS,JM.Atom,~B");
Clazz_defineStatics (c$,
"CA", 0,
"O", 1,
"N", 2,
"C", 3,
"OT", 4,
"interestingAminoAtomIDs",  Clazz_newByteArray (-1, [2, -5, 1, 3, -65]),
"beta", (0.29670597283903605));
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.AlphaPolymer"], "JM.AminoPolymer", ["JU.Measure", "$.P3", "$.V3", "J.c.STR", "JM.HBond", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.structureList = null;
Clazz_instantialize (this, arguments);
}, JM, "AminoPolymer", JM.AlphaPolymer);
Clazz_makeConstructor (c$, 
function (monomers, pt0) {
Clazz_superConstructor (this, JM.AminoPolymer, [monomers, pt0]);
this.type = 1;
for (var i = 0; i < this.monomerCount; ++i) if (!(monomers[i]).hasOAtom ()) return;

this.hasWingPoints = true;
}, "~A,~N");
Clazz_overrideMethod (c$, "resetHydrogenPoints", 
function () {
var ps;
var psLast = null;
for (var i = 0; i < this.monomerCount; i++) {
if ((ps = this.getProteinStructure (i)) != null && ps !== psLast) (psLast = ps).resetAxes ();
(this.monomers[i]).resetHydrogenPoint ();
}
});
Clazz_overrideMethod (c$, "calcPhiPsiAngles", 
function () {
for (var i = 0; i < this.monomerCount - 1; ++i) this.calcPhiPsiAngles2 (this.monomers[i], this.monomers[i + 1]);

return true;
});
Clazz_defineMethod (c$, "calcPhiPsiAngles2", 
 function (residue1, residue2) {
var nitrogen1 = residue1.getNitrogenAtom ();
var alphacarbon1 = residue1.getLeadAtom ();
var carbon1 = residue1.getCarbonylCarbonAtom ();
var nitrogen2 = residue2.getNitrogenAtom ();
var alphacarbon2 = residue2.getLeadAtom ();
var carbon2 = residue2.getCarbonylCarbonAtom ();
residue2.setGroupParameter (1111490569, JU.Measure.computeTorsion (carbon1, nitrogen2, alphacarbon2, carbon2, true));
residue1.setGroupParameter (1111490570, JU.Measure.computeTorsion (nitrogen1, alphacarbon1, carbon1, nitrogen2, true));
residue1.setGroupParameter (1111490568, JU.Measure.computeTorsion (alphacarbon1, carbon1, nitrogen2, alphacarbon2, true));
}, "JM.AminoMonomer,JM.AminoMonomer");
Clazz_overrideMethod (c$, "calculateRamachandranHelixAngle", 
function (m, qtype) {
var psiLast = (m == 0 ? NaN : this.monomers[m - 1].getGroupParameter (1111490570));
var psi = this.monomers[m].getGroupParameter (1111490570);
var phi = this.monomers[m].getGroupParameter (1111490569);
var phiNext = (m == this.monomerCount - 1 ? NaN : this.monomers[m + 1].getGroupParameter (1111490569));
var psiNext = (m == this.monomerCount - 1 ? NaN : this.monomers[m + 1].getGroupParameter (1111490570));
switch (qtype) {
default:
case 'p':
case 'r':
case 'P':
var dPhi = ((phiNext - phi) / 2 * 3.141592653589793 / 180);
var dPsi = ((psiNext - psi) / 2 * 3.141592653589793 / 180);
return (57.29577951308232 * 2 * Math.acos (Math.cos (dPsi) * Math.cos (dPhi) - Math.sin (dPsi) * Math.sin (dPhi) / 3));
case 'c':
case 'C':
return (psi - psiLast + phiNext - phi);
}
}, "~N,~S");
Clazz_overrideMethod (c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vHBonds, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
if (polymer == null) polymer = this;
if (!(Clazz_instanceOf (polymer, JM.AminoPolymer))) return;
var pt =  new JU.P3 ();
var vNH =  new JU.V3 ();
var source;
var min1 = (min == null ?  Clazz_newIntArray (2, 3, 0) : null);
for (var i = 1; i < this.monomerCount; ++i) {
if (min == null) {
min1[0][0] = min1[1][0] = this.bioPolymerIndexInModel;
min1[0][1] = min1[1][1] = -2147483648;
min1[0][2] = min1[1][2] = 0;
} else {
min1 = min[i];
}if ((source = (this.monomers[i])).getNHPoint (pt, vNH, checkDistances, dsspIgnoreHydrogens)) {
var isInA = (bsA == null || bsA.get (source.getNitrogenAtom ().i));
if (!isInA) continue;
if (!checkDistances && source.getCarbonylOxygenAtom () == null) continue;
this.checkRasmolHydrogenBond (source, polymer, i, pt, (isInA ? bsB : bsA), vHBonds, min1, checkDistances);
}}
}, "JM.BioPolymer,JU.BS,JU.BS,JU.Lst,~N,~A,~B,~B");
Clazz_defineMethod (c$, "checkRasmolHydrogenBond", 
 function (source, polymer, indexDonor, hydrogenPoint, bsB, vHBonds, min, checkDistances) {
var sourceAlphaPoint = source.getLeadAtom ();
var sourceNitrogenPoint = source.getNitrogenAtom ();
var nitrogen = source.getNitrogenAtom ();
var m;
for (var i = polymer.monomerCount; --i >= 0; ) {
if (polymer === this && (i == indexDonor || i + 1 == indexDonor)) continue;
var target = polymer.monomers[i];
var oxygen = target.getCarbonylOxygenAtom ();
if (oxygen == null || bsB != null && !bsB.get (oxygen.i)) continue;
var targetAlphaPoint = target.getLeadAtom ();
var dist2 = sourceAlphaPoint.distanceSquared (targetAlphaPoint);
if (dist2 >= 81.0) continue;
var energy = this.calcHbondEnergy (sourceNitrogenPoint, hydrogenPoint, target, checkDistances);
if (energy < min[0][2]) {
m = min[1];
min[1] = min[0];
min[0] = m;
} else if (energy < min[1][2]) {
m = min[1];
} else {
continue;
}m[0] = polymer.bioPolymerIndexInModel;
m[1] = (energy < -500 ? i : -1 - i);
m[2] = energy;
}
if (vHBonds != null) for (var i = 0; i < 2; i++) if (min[i][1] >= 0) this.addResidueHydrogenBond (nitrogen, ((polymer).monomers[min[i][1]]).getCarbonylOxygenAtom (), (polymer === this ? indexDonor : -99), min[i][1], min[i][2] / 1000, vHBonds);

}, "JM.AminoMonomer,JM.BioPolymer,~N,JU.P3,JU.BS,JU.Lst,~A,~B");
Clazz_defineMethod (c$, "calcHbondEnergy", 
 function (nitrogenPoint, hydrogenPoint, target, checkDistances) {
var targetOxygenPoint = target.getCarbonylOxygenAtom ();
if (targetOxygenPoint == null) return 0;
var distON2 = targetOxygenPoint.distanceSquared (nitrogenPoint);
if (distON2 < 0.25) return 0;
var distOH2 = targetOxygenPoint.distanceSquared (hydrogenPoint);
if (distOH2 < 0.25) return 0;
var targetCarbonPoint = target.getCarbonylCarbonAtom ();
var distCH2 = targetCarbonPoint.distanceSquared (hydrogenPoint);
if (distCH2 < 0.25) return 0;
var distCN2 = targetCarbonPoint.distanceSquared (nitrogenPoint);
if (distCN2 < 0.25) return 0;
var distOH = Math.sqrt (distOH2);
var distCH = Math.sqrt (distCH2);
var distCN = Math.sqrt (distCN2);
var distON = Math.sqrt (distON2);
var energy = JM.HBond.getEnergy (distOH, distCH, distCN, distON);
var isHbond = (energy < -500 && (!checkDistances || distCN > distCH && distOH <= 3.0));
return (!isHbond && checkDistances || energy < -9900 ? 0 : energy);
}, "JU.P3,JU.P3,JM.AminoMonomer,~B");
Clazz_defineMethod (c$, "addResidueHydrogenBond", 
 function (nitrogen, oxygen, indexAminoGroup, indexCarbonylGroup, energy, vHBonds) {
var order;
switch (indexAminoGroup - indexCarbonylGroup) {
case 2:
order = 6144;
break;
case 3:
order = 8192;
break;
case 4:
order = 10240;
break;
case 5:
order = 12288;
break;
case -3:
order = 14336;
break;
case -4:
order = 16384;
break;
default:
order = 4096;
}
vHBonds.addLast ( new JM.HBond (nitrogen, oxygen, order, 1, 0, energy));
}, "JM.Atom,JM.Atom,~N,~N,~N,JU.Lst");
Clazz_overrideMethod (c$, "calculateStructures", 
function (alphaOnly) {
if (alphaOnly) return;
if (this.structureList == null) this.structureList = this.model.ms.getStructureList ();
var structureTags =  Clazz_newCharArray (this.monomerCount, '\0');
for (var i = 0; i < this.monomerCount - 1; ++i) {
var leadingResidue = this.monomers[i];
var trailingResidue = this.monomers[i + 1];
var phi = trailingResidue.getGroupParameter (1111490569);
var psi = leadingResidue.getGroupParameter (1111490570);
if (this.isHelix (psi, phi)) {
structureTags[i] = (phi < 0 && psi < 25 ? '4' : '3');
} else if (this.isSheet (psi, phi)) {
structureTags[i] = 's';
} else if (this.isTurn (psi, phi)) {
structureTags[i] = 't';
} else {
structureTags[i] = 'n';
}if (JU.Logger.debugging) JU.Logger.debug ((0 + this.monomers[0].chain.chainID) + " aminopolymer:" + i + " " + trailingResidue.getGroupParameter (1111490569) + "," + leadingResidue.getGroupParameter (1111490570) + " " + structureTags[i]);
}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == '4') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == '4'; ++end) {
}
end--;
if (end >= start + 3) {
this.addStructureProtected (J.c.STR.HELIX, null, 0, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == '3') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == '3'; ++end) {
}
end--;
if (end >= start + 3) {
this.addStructureProtected (J.c.STR.HELIX, null, 0, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == 's') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == 's'; ++end) {
}
end--;
if (end >= start + 2) {
this.addStructureProtected (J.c.STR.SHEET, null, 0, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == 't') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == 't'; ++end) {
}
end--;
if (end >= start + 2) {
this.addStructureProtected (J.c.STR.TURN, null, 0, 0, start, end);
}start = end;
}}
}, "~B");
Clazz_defineMethod (c$, "isTurn", 
 function (psi, phi) {
return JM.AminoPolymer.checkPhiPsi (this.structureList.get (J.c.STR.TURN), psi, phi);
}, "~N,~N");
Clazz_defineMethod (c$, "isSheet", 
 function (psi, phi) {
return JM.AminoPolymer.checkPhiPsi (this.structureList.get (J.c.STR.SHEET), psi, phi);
}, "~N,~N");
Clazz_defineMethod (c$, "isHelix", 
 function (psi, phi) {
return JM.AminoPolymer.checkPhiPsi (this.structureList.get (J.c.STR.HELIX), psi, phi);
}, "~N,~N");
c$.checkPhiPsi = Clazz_defineMethod (c$, "checkPhiPsi", 
 function (list, psi, phi) {
for (var i = 0; i < list.length; i += 4) if (phi >= list[i] && phi <= list[i + 1] && psi >= list[i + 2] && psi <= list[i + 3]) return true;

return false;
}, "~A,~N,~N");
Clazz_defineMethod (c$, "setStructureList", 
function (structureList) {
this.structureList = structureList;
}, "java.util.Map");
Clazz_defineStatics (c$,
"maxHbondAlphaDistance", 9,
"maxHbondAlphaDistance2", 81.0,
"minimumHbondDistance2", 0.25);
});
Clazz_declarePackage ("JM");
Clazz_load (null, "JM.BioModelSet", ["java.lang.Boolean", "$.Character", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.PT", "$.SB", "J.api.Interface", "J.c.STR", "JM.Group", "JM.AlphaMonomer", "$.AminoPolymer", "$.BioResolver", "$.Monomer", "JS.T", "JU.BSUtil", "$.Escape", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.ms = null;
this.ext = null;
this.unitIdSets = null;
Clazz_instantialize (this, arguments);
}, JM, "BioModelSet");
Clazz_defineMethod (c$, "getBioExt", 
function () {
return (this.ext == null ? (this.ext = (J.api.Interface.getInterface ("JM.BioExt", this.vwr, "script"))).set (this.vwr, this.vwr.ms) : this.ext);
});
Clazz_defineMethod (c$, "set", 
function (vwr, ms) {
this.vwr = vwr;
this.ms = ms;
this.unitIdSets = null;
if (this.ext != null) this.ext.set (vwr, ms);
return this;
}, "JV.Viewer,JM.ModelSet");
Clazz_defineMethod (c$, "calcAllRasmolHydrogenBonds", 
function (bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds, dsspVersion) {
var am = this.ms.am;
if (vHBonds == null) {
var bsAtoms = bsA;
if (bsB != null && !bsA.equals (bsB)) (bsAtoms = JU.BSUtil.copy (bsA)).or (bsB);
var bsDelete =  new JU.BS ();
var bsOK =  new JU.BS ();
var models = this.ms.am;
var bonds = this.ms.bo;
for (var i = this.ms.bondCount; --i >= 0; ) {
var bond = bonds[i];
if ((bond.order & 28672) == 0) continue;
if (bsAtoms.get (bond.atom1.i)) bsDelete.set (i);
 else bsOK.set (models[bond.atom1.mi].trajectoryBaseIndex);
}
for (var i = this.ms.mc; --i >= 0; ) if (models[i].isBioModel) models[i].hasRasmolHBonds = bsOK.get (i);

if (bsDelete.nextSetBit (0) >= 0) this.ms.deleteBonds (bsDelete, false);
}for (var i = this.ms.mc; --i >= 0; ) if (am[i].isBioModel && !this.ms.isTrajectorySubFrame (i)) (am[i]).getRasmolHydrogenBonds (bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds, dsspVersion);

}, "JU.BS,JU.BS,JU.Lst,~B,~N,~B,JU.BS,~N");
Clazz_defineMethod (c$, "calcSelectedMonomersCount", 
function () {
var bsSelected = this.vwr.bsA ();
for (var i = this.ms.mc; --i >= 0; ) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
for (var j = m.bioPolymerCount; --j >= 0; ) m.bioPolymers[j].calcSelectedMonomersCount (bsSelected);

}
});
Clazz_defineMethod (c$, "calculateAllPolymers", 
function (groups, groupCount, baseGroupIndex, modelsExcluded) {
var checkConnections = !this.vwr.getBoolean (603979896);
if (groupCount < 0) groupCount = groups.length;
if (modelsExcluded != null) for (var j = 0; j < groupCount; ++j) {
var group = groups[j];
if (Clazz_instanceOf (group, JM.Monomer)) {
if ((group).bioPolymer != null && (!modelsExcluded.get (group.chain.model.modelIndex))) (group).setBioPolymer (null, -1);
}}
for (var i = 0, mc = this.ms.mc; i < mc; i++) if ((modelsExcluded == null || !modelsExcluded.get (i)) && this.ms.am[i].isBioModel) {
for (var pt = 0, j = baseGroupIndex; j < groupCount; ++j, pt++) {
var g = groups[j];
var model = g.getModel ();
if (!model.isBioModel || !(Clazz_instanceOf (g, JM.Monomer))) continue;
var doCheck = checkConnections && !this.ms.isJmolDataFrameForModel (this.ms.at[g.firstAtomIndex].mi);
var bp = ((g).bioPolymer == null ? JM.BioResolver.allocateBioPolymer (groups, j, doCheck, pt) : null);
if (bp == null || bp.monomerCount == 0) continue;
var n = (model).addBioPolymer (bp);
j += n - 1;
pt += n - 1;
}
}
}, "~A,~N,~N,JU.BS");
Clazz_defineMethod (c$, "calculateAllStructuresExcept", 
function (alreadyDefined, asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha, version) {
var ret = "";
var bsModels = JU.BSUtil.copyInvert (alreadyDefined, this.ms.mc);
if (setStructure) this.setAllDefaultStructure (bsModels);
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (this.ms.am[i].isBioModel) ret += (this.ms.am[i]).calculateStructures (asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha, version);

if (setStructure) this.ms.setStructureIndexes ();
return ret;
}, "JU.BS,~B,~B,~B,~B,~B,~N");
Clazz_defineMethod (c$, "calculateAllStuctures", 
function (bsAtoms, asDSSP, doReport, dsspIgnoreHydrogen, setStructure, version) {
var bsAllAtoms =  new JU.BS ();
var bsModelsExcluded = JU.BSUtil.copyInvert (this.modelsOf (bsAtoms, bsAllAtoms), this.ms.mc);
if (!setStructure) return this.ms.calculateStructuresAllExcept (bsModelsExcluded, asDSSP, doReport, dsspIgnoreHydrogen, false, false, version);
this.ms.recalculatePolymers (bsModelsExcluded);
var ret = this.ms.calculateStructuresAllExcept (bsModelsExcluded, asDSSP, doReport, dsspIgnoreHydrogen, true, false, version);
this.vwr.shm.resetBioshapes (bsAllAtoms);
this.ms.setStructureIndexes ();
return ret;
}, "JU.BS,~B,~B,~B,~B,~N");
Clazz_defineMethod (c$, "calculateStraightnessAll", 
function () {
this.getBioExt ().calculateStraightnessAll ();
});
Clazz_defineMethod (c$, "calculateStruts", 
function (bs1, bs2) {
return this.getBioExt ().calculateAllstruts (this.vwr, this.ms, bs1, bs2);
}, "JU.BS,JU.BS");
Clazz_defineMethod (c$, "getAllDefaultStructures", 
function (bsAtoms, bsModified) {
var bsModels = this.modelsOf (bsAtoms, bsModified);
var ret =  new JU.SB ();
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (this.ms.am[i].isBioModel && (this.ms.am[i]).defaultStructure != null) ret.append ((this.ms.am[i]).defaultStructure);

return ret.toString ();
}, "JU.BS,JU.BS");
Clazz_defineMethod (c$, "getAllHeteroList", 
function (modelIndex) {
var htFull =  new java.util.Hashtable ();
var ok = false;
for (var i = this.ms.mc; --i >= 0; ) if (modelIndex < 0 || i == modelIndex) {
var ht = this.ms.getInfo (i, "hetNames");
if (ht == null) continue;
ok = true;
for (var entry, $entry = ht.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
htFull.put (key, entry.getValue ());
}
}
return (ok ? htFull : null);
}, "~N");
Clazz_defineMethod (c$, "getAllPolymerInfo", 
function (bs, info) {
this.getBioExt ().getAllPolymerInfo (bs, info);
}, "JU.BS,java.util.Map");
Clazz_defineMethod (c$, "getAllPolymerPointsAndVectors", 
function (bs, vList, isTraceAlpha, sheetSmoothing) {
for (var i = 0; i < this.ms.mc; ++i) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
var last = 2147483646;
for (var ip = 0; ip < m.bioPolymerCount; ip++) last = m.bioPolymers[ip].getPolymerPointsAndVectors (last, bs, vList, isTraceAlpha, sheetSmoothing);

}
}, "JU.BS,JU.Lst,~B,~N");
Clazz_defineMethod (c$, "getAllSequenceBits", 
function (specInfo, bsAtoms, bsResult) {
if (specInfo.length > 0) {
if (bsAtoms == null) bsAtoms = this.vwr.getAllAtoms ();
if (specInfo.indexOf ('|') < specInfo.lastIndexOf ('|')) return this.getAllUnitIds (specInfo, bsAtoms, bsResult);
var am = this.ms.am;
for (var i = this.ms.mc; --i >= 0; ) if (am[i].isBioModel) {
var m = am[i];
var lenInfo = specInfo.length;
for (var ip = 0; ip < m.bioPolymerCount; ip++) {
var sequence = m.bioPolymers[ip].getSequence ();
var j = -1;
while ((j = sequence.indexOf (specInfo, ++j)) >= 0) m.bioPolymers[ip].getPolymerSequenceAtoms (j, lenInfo, bsAtoms, bsResult);

}
}
}return bsResult;
}, "~S,JU.BS,JU.BS");
Clazz_defineMethod (c$, "getAtomBitsBS", 
function (tokType, bsInfo, bs) {
var at = this.ms.at;
var ac = this.ms.ac;
var i = 0;
var g;
switch (tokType) {
case 136314895:
case 2097184:
var type = (tokType == 136314895 ? J.c.STR.HELIX : J.c.STR.SHEET);
for (i = ac; --i >= 0; ) {
if ((g = at[i].group).isWithinStructure (type)) g.setAtomBits (bs);
i = g.firstAtomIndex;
}
break;
case 2097188:
for (i = ac; --i >= 0; ) {
if ((g = at[i].group).isCarbohydrate ()) g.setAtomBits (bs);
i = g.firstAtomIndex;
}
break;
case 2097156:
for (i = ac; --i >= 0; ) {
if ((g = at[i].group).isDna ()) g.setAtomBits (bs);
i = g.firstAtomIndex;
}
break;
case 2097166:
for (i = ac; --i >= 0; ) {
if ((g = at[i].group).isNucleic ()) g.setAtomBits (bs);
i = g.firstAtomIndex;
}
break;
case 2097168:
for (i = ac; --i >= 0; ) {
if ((g = at[i].group).isProtein ()) g.setAtomBits (bs);
i = g.firstAtomIndex;
}
break;
case 2097170:
for (i = ac; --i >= 0; ) {
if ((g = at[i].group).isPurine ()) g.setAtomBits (bs);
i = g.firstAtomIndex;
}
break;
case 2097172:
for (i = ac; --i >= 0; ) {
if ((g = at[i].group).isPyrimidine ()) g.setAtomBits (bs);
i = g.firstAtomIndex;
}
break;
case 2097174:
for (i = ac; --i >= 0; ) {
if ((g = at[i].group).isRna ()) g.setAtomBits (bs);
i = g.firstAtomIndex;
}
break;
}
if (i < 0) return bs;
var i0 = bsInfo.nextSetBit (0);
if (i0 < 0) return bs;
i = 0;
switch (tokType) {
case 1094713362:
for (i = i0; i >= 0; i = bsInfo.nextSetBit (i + 1)) {
var iPolymer = at[i].group.getBioPolymerIndexInModel ();
if (iPolymer >= 0) (at[i].group).bioPolymer.setAtomBitsAndClear (bs, bsInfo);
}
break;
case 1639976963:
for (i = i0; i >= 0; i = bsInfo.nextSetBit (i + 1)) {
var structure = at[i].group.getStructure ();
if (structure != null) structure.setAtomBitsAndClear (bs, bsInfo);
}
break;
}
if (i == 0) JU.Logger.error ("MISSING getAtomBits entry for " + JS.T.nameOf (tokType));
return bs;
}, "~N,JU.BS,JU.BS");
Clazz_defineMethod (c$, "getAtomBitsStr", 
function (tokType, specInfo, bs) {
switch (tokType) {
default:
return  new JU.BS ();
case 1073741925:
return this.getAnnotationBits ("domains", 1073741925, specInfo);
case 1073742189:
return this.getAnnotationBits ("validation", 1073742189, specInfo);
case 1073742128:
return this.getAnnotationBits ("rna3d", 1073742128, specInfo);
case 1073741863:
var s = specInfo;
bs =  new JU.BS ();
return (s.length % 2 != 0 ? bs : this.ms.getAtomBitsMDa (1086324742, this.getAllBasePairBits (s), bs));
case 1111490587:
return this.getAnnotationBits ("dssr", 1111490587, specInfo);
case 1086324744:
return this.getAllSequenceBits (specInfo, null, bs);
}
}, "~N,~S,JU.BS");
Clazz_defineMethod (c$, "getBioPolymerCountInModel", 
function (modelIndex) {
if (modelIndex < 0) {
var polymerCount = 0;
for (var i = this.ms.mc; --i >= 0; ) if (!this.ms.isTrajectorySubFrame (i) && this.ms.am[i].isBioModel) polymerCount += (this.ms.am[i]).getBioPolymerCount ();

return polymerCount;
}return (this.ms.isTrajectorySubFrame (modelIndex) || !this.ms.am[modelIndex].isBioModel ? 0 : (this.ms.am[modelIndex]).getBioPolymerCount ());
}, "~N");
Clazz_defineMethod (c$, "getFullProteinStructureState", 
function (bsAtoms, mode) {
var taintedOnly = (mode == 1073742327);
if (taintedOnly && !this.ms.proteinStructureTainted) return "";
var scriptMode = (mode == 1073742158 || mode == 1073742327);
var atoms = this.ms.at;
var at0 = (bsAtoms == null ? 0 : bsAtoms.nextSetBit (0));
if (at0 < 0) return "";
if (bsAtoms != null && mode == 4138) {
bsAtoms = JU.BSUtil.copy (bsAtoms);
for (var i = this.ms.ac; --i >= 0; ) if (Float.isNaN (atoms[i].group.getGroupParameter (1111490569)) || Float.isNaN (atoms[i].group.getGroupParameter (1111490570))) bsAtoms.clear (i);

}var at1 = (bsAtoms == null ? this.ms.ac : bsAtoms.length ()) - 1;
var im0 = atoms[at0].mi;
var im1 = atoms[at1].mi;
var lstStr =  new JU.Lst ();
var map =  new java.util.Hashtable ();
var cmd =  new JU.SB ();
for (var im = im0; im <= im1; im++) {
if (!this.ms.am[im].isBioModel) continue;
var m = this.ms.am[im];
if (taintedOnly && !m.structureTainted) continue;
var bsA =  new JU.BS ();
bsA.or (m.bsAtoms);
bsA.andNot (m.bsAtomsDeleted);
var i0 = bsA.nextSetBit (0);
if (i0 < 0) continue;
if (scriptMode) {
cmd.append ("  structure none ").append (JU.Escape.eBS (this.ms.getModelAtomBitSetIncludingDeleted (im, false))).append ("    \t# model=" + this.ms.getModelNumberDotted (im)).append (";\n");
}var ps;
for (var i = i0; i >= 0; i = bsA.nextSetBit (i + 1)) {
var a = atoms[i];
if (!(Clazz_instanceOf (a.group, JM.AlphaMonomer)) || (ps = (a.group).proteinStructure) == null || map.containsKey (ps)) continue;
lstStr.addLast (ps);
map.put (ps, Boolean.TRUE);
}
}
this.getStructureLines (bsAtoms, cmd, lstStr, J.c.STR.HELIX, scriptMode, mode);
this.getStructureLines (bsAtoms, cmd, lstStr, J.c.STR.SHEET, scriptMode, mode);
this.getStructureLines (bsAtoms, cmd, lstStr, J.c.STR.TURN, scriptMode, mode);
return cmd.toString ();
}, "JU.BS,~N");
Clazz_defineMethod (c$, "getGroupsWithinAll", 
function (nResidues, bs) {
var bsResult =  new JU.BS ();
var bsCheck = this.ms.getIterativeModels (false);
for (var iModel = this.ms.mc; --iModel >= 0; ) if (bsCheck.get (iModel) && this.ms.am[iModel].isBioModel) {
var m = this.ms.am[iModel];
for (var i = m.bioPolymerCount; --i >= 0; ) m.bioPolymers[i].getRangeGroups (nResidues, bs, bsResult);

}
return bsResult;
}, "~N,JU.BS");
Clazz_defineMethod (c$, "getIdentifierOrNull", 
function (identifier) {
var len = identifier.length;
var pt = 0;
while (pt < len && JU.PT.isLetter (identifier.charAt (pt))) ++pt;

var bs = this.ms.getSpecNameOrNull (identifier.substring (0, pt), false);
if (pt == len) return bs;
if (bs == null) bs =  new JU.BS ();
var pt0 = pt;
while (pt < len && JU.PT.isDigit (identifier.charAt (pt))) ++pt;

var seqNumber = 0;
try {
seqNumber = Integer.parseInt (identifier.substring (pt0, pt));
} catch (nfe) {
if (Clazz_exceptionOf (nfe, NumberFormatException)) {
return null;
} else {
throw nfe;
}
}
var insertionCode = ' ';
if (pt < len && identifier.charAt (pt) == '^') if (++pt < len) insertionCode = identifier.charAt (pt);
var seqcode = JM.Group.getSeqcodeFor (seqNumber, insertionCode);
var bsInsert = this.ms.getSeqcodeBits (seqcode, false);
if (bsInsert == null) {
if (insertionCode != ' ') bsInsert = this.ms.getSeqcodeBits (Character.toUpperCase (identifier.charAt (pt)).charCodeAt (0), false);
if (bsInsert == null) return null;
pt++;
}bs.and (bsInsert);
if (pt >= len) return bs;
if (pt != len - 1) return null;
bs.and (this.ms.getChainBits (identifier.charCodeAt (pt)));
return bs;
}, "~S");
Clazz_defineMethod (c$, "mutate", 
function (bs, group, sequence) {
return this.getBioExt ().mutate (this.vwr, bs, group, sequence);
}, "JU.BS,~S,~A");
Clazz_defineMethod (c$, "recalculateAllPolymers", 
function (bsModelsExcluded, groups) {
for (var i = 0; i < this.ms.mc; i++) if (this.ms.am[i].isBioModel && !bsModelsExcluded.get (i)) (this.ms.am[i]).clearBioPolymers ();

this.calculateAllPolymers (groups, -1, 0, bsModelsExcluded);
}, "JU.BS,~A");
Clazz_defineMethod (c$, "recalculatePoints", 
function (modelIndex) {
if (modelIndex < 0) {
for (var i = this.ms.mc; --i >= 0; ) if (!this.ms.isTrajectorySubFrame (i) && this.ms.am[i].isBioModel) (this.ms.am[i]).recalculateLeadMidpointsAndWingVectors ();

return;
}if (!this.ms.isTrajectorySubFrame (modelIndex) && this.ms.am[modelIndex].isBioModel) (this.ms.am[modelIndex]).recalculateLeadMidpointsAndWingVectors ();
}, "~N");
Clazz_defineMethod (c$, "setAllConformation", 
function (bsAtoms) {
var bsModels = this.ms.getModelBS (bsAtoms, false);
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
if (m.altLocCount > 0) for (var j = m.bioPolymerCount; --j >= 0; ) m.bioPolymers[j].setConformation (bsAtoms);

}
}, "JU.BS");
Clazz_defineMethod (c$, "setAllProteinType", 
function (bs, type) {
var monomerIndexCurrent = -1;
var iLast = -1;
var bsModels = this.ms.getModelBS (bs, false);
this.setAllDefaultStructure (bsModels);
var at = this.ms.at;
var am = this.ms.am;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var a = at[i];
var g = a.group;
if (g.isAdded (i) || g.getBioPolymerLength () == 0) continue;
monomerIndexCurrent = g.setProteinStructureType (type, iLast == i - 1 ? monomerIndexCurrent : -1);
var modelIndex = a.mi;
this.ms.proteinStructureTainted = am[modelIndex].structureTainted = true;
iLast = i = g.lastAtomIndex;
}
var lastStrucNo =  Clazz_newIntArray (this.ms.mc, 0);
for (var i = 0; i < this.ms.ac; i++) {
var modelIndex = at[i].mi;
if (!bsModels.get (modelIndex)) {
i = am[modelIndex].firstAtomIndex + am[modelIndex].act - 1;
continue;
}var g = at[i].group;
if (!g.isAdded (i)) {
iLast = g.getStrucNo ();
if (iLast < 1000 && iLast > lastStrucNo[modelIndex]) lastStrucNo[modelIndex] = iLast;
i = g.lastAtomIndex;
}}
for (var i = 0; i < this.ms.ac; i++) {
var modelIndex = at[i].mi;
if (!bsModels.get (modelIndex)) {
i = am[modelIndex].firstAtomIndex + am[modelIndex].act - 1;
continue;
}var g = at[i].group;
if (!g.isAdded (i)) {
i = g.lastAtomIndex;
if (g.getStrucNo () > 1000) g.setStrucNo (++lastStrucNo[modelIndex]);
}}
}, "JU.BS,J.c.STR");
Clazz_defineMethod (c$, "setAllStructureList", 
function (structureList) {
for (var iModel = this.ms.mc; --iModel >= 0; ) if (this.ms.am[iModel].isBioModel) {
var m = this.ms.am[iModel];
m.bioPolymers = JU.AU.arrayCopyObject (m.bioPolymers, m.bioPolymerCount);
for (var i = m.bioPolymerCount; --i >= 0; ) {
var bp = m.bioPolymers[i];
if (Clazz_instanceOf (bp, JM.AminoPolymer)) (bp).setStructureList (structureList);
}
}
}, "java.util.Map");
Clazz_defineMethod (c$, "getAllBasePairBits", 
 function (specInfo) {
var bsA = null;
var bsB = null;
var vHBonds =  new JU.Lst ();
if (specInfo.length == 0) {
bsA = bsB = this.vwr.getAllAtoms ();
this.calcAllRasmolHydrogenBonds (bsA, bsB, vHBonds, true, 1, false, null, 0);
} else {
for (var i = 0; i < specInfo.length; ) {
bsA = this.ms.getSequenceBits (specInfo.substring (i, ++i), null,  new JU.BS ());
if (bsA.nextSetBit (0) < 0) continue;
bsB = this.ms.getSequenceBits (specInfo.substring (i, ++i), null,  new JU.BS ());
if (bsB.nextSetBit (0) < 0) continue;
this.calcAllRasmolHydrogenBonds (bsA, bsB, vHBonds, true, 1, false, null, 0);
}
}var bsAtoms =  new JU.BS ();
for (var i = vHBonds.size (); --i >= 0; ) {
var b = vHBonds.get (i);
bsAtoms.set (b.atom1.i);
bsAtoms.set (b.atom2.i);
}
return bsAtoms;
}, "~S");
Clazz_defineMethod (c$, "getAllUnitIds", 
 function (specInfo, bsSelected, bsResult) {
var maps = this.unitIdSets;
if (maps == null) {
maps = this.unitIdSets =  new Array (7);
for (var i = 0; i < 7; i++) maps[i] =  new java.util.Hashtable ();

for (var i = this.ms.mc; --i >= 0; ) {
var m = this.ms.am[i];
if (!m.isBioModel) continue;
if (this.ms.isTrajectory (i)) m = this.ms.am[i = m.trajectoryBaseIndex];
var num = "|" + this.ms.getInfo (i, "modelNumber");
this.checkMap (maps[0], this.ms.getInfo (i, "modelName") + num, m.bsAtoms);
this.checkMap (maps[0], num, m.bsAtoms);
}
}var bsModelChain = null;
var lastModelChain = null;
var bsTemp =  new JU.BS ();
var units = JU.PT.getTokens (JU.PT.replaceAllCharacters (specInfo, ", \t\n[]\"=", " "));
var ptrs =  Clazz_newIntArray (8, 0);
for (var i = units.length; --i >= 0; ) {
var unit = units[i] + "|";
if (unit.length < 5) continue;
var bsPtr = 0;
for (var j = 0, n = 0, pt = unit.lastIndexOf ('|') + 1; j < pt && n < 8; j++) {
if (unit.charAt (j) == '|') ptrs[n++] = j;
 else bsPtr |= 1 << n;
}
if ((bsPtr & 0x16) != 0x16) continue;
bsTemp.clearAll ();
bsTemp.or (bsSelected);
var mchain = unit.substring (0, ptrs[2]);
if (lastModelChain != null && lastModelChain.equals (mchain)) {
bsTemp.and (bsModelChain);
} else {
if (!this.addUnit (1094717454, unit.substring (0, ptrs[1]).toUpperCase (), bsTemp, maps[0]) || !this.addUnit (1073742357, unit.substring (ptrs[1] + 1, ptrs[2]), bsTemp, maps[1])) continue;
bsModelChain = JU.BSUtil.copy (bsTemp);
lastModelChain = mchain;
}var haveAtom = ((bsPtr & (32)) != 0);
var haveAlt = ((bsPtr & (64)) != 0);
if (!this.addUnit (1094715412, unit.substring (ptrs[3] + 1, ptrs[4]), bsTemp, maps[2]) || !this.addUnit (5, ((bsPtr & (128)) == 0 ? "\0" : unit.substring (ptrs[6] + 1, ptrs[7])), bsTemp, maps[3]) || (haveAtom ? !this.addUnit (1086326786, unit.substring (ptrs[4] + 1, ptrs[5]).toUpperCase (), bsTemp, maps[4]) || !this.addUnit (1073742355, unit.substring (ptrs[5] + 1, ptrs[6]), bsTemp, maps[5]) : haveAlt && !this.addUnit (1094717448, unit.substring (ptrs[5] + 1, ptrs[6]), bsTemp, maps[6]))) continue;
bsResult.or (bsTemp);
}
return bsResult;
}, "~S,JU.BS,JU.BS");
Clazz_defineMethod (c$, "checkMap", 
 function (map, key, bsAtoms) {
var bs = JU.BSUtil.copy (bsAtoms);
var bs0 = map.get (key);
if (bs0 == null) map.put (key, bs0 = bs);
 else bs0.or (bs);
return bs0;
}, "java.util.Map,~S,JU.BS");
Clazz_defineMethod (c$, "addUnit", 
 function (tok, key, bsTemp, map) {
var bs = map.get (key);
if (bs == null) {
var o;
switch (tok) {
default:
return false;
case 1073742357:
o = Integer.$valueOf (this.vwr.getChainID (key, false));
break;
case 1094715412:
o = Integer.$valueOf (JU.PT.parseInt (key));
break;
case 5:
o = Integer.$valueOf (key.charCodeAt (0));
break;
case 1094717448:
bs = this.ms.getAtomBitsMDa (tok = 1073742355, null,  new JU.BS ());
case 1086326786:
o = key;
break;
case 1073742355:
o = (key.length == 0 ? null : key);
break;
}
map.put (key, bs = this.ms.getAtomBitsMDa (tok, o, (bs == null ?  new JU.BS () : bs)));
}bsTemp.and (bs);
return (bsTemp.nextSetBit (0) >= 0);
}, "~N,~S,JU.BS,java.util.Map");
Clazz_defineMethod (c$, "getAnnotationBits", 
 function (name, tok, specInfo) {
var bs =  new JU.BS ();
var pa = this.vwr.getAnnotationParser (name.equals ("dssr"));
var ann;
for (var i = this.ms.mc; --i >= 0; ) if ((ann = this.ms.getInfo (i, name)) != null) bs.or (pa.getAtomBits (this.vwr, specInfo, (this.ms.am[i]).getCachedAnnotationMap (name + " V ", ann), this.ms.am[i].dssrCache, tok, i, this.ms.am[i].bsAtoms));

return bs;
}, "~S,~N,~S");
Clazz_defineMethod (c$, "getStructureLines", 
 function (bsAtoms, cmd, lstStr, type, scriptMode, mode) {
var showMode = (mode == 134222350);
var nHelix = 0;
var nSheet = 0;
var nTurn = 0;
var sid = null;
var bs =  new JU.BS ();
var n = 0;
for (var i = 0, ns = lstStr.size (); i < ns; i++) {
var ps = lstStr.get (i);
if (ps.type !== type) continue;
var m1 = ps.findMonomer (bsAtoms, true);
var m2 = ps.findMonomer (bsAtoms, false);
if (m1 == null || m2 == null) continue;
var iModel = ps.apolymer.model.modelIndex;
var comment = (scriptMode ? "    \t# model=" + this.ms.getModelNumberDotted (iModel) : null);
var res1 = m1.getResno ();
var res2 = m2.getResno ();
var subtype = ps.subtype;
switch (type) {
case J.c.STR.HELIX:
case J.c.STR.TURN:
case J.c.STR.SHEET:
n++;
if (scriptMode) {
bs.clearAll ();
ps.setAtomBits (bs);
var stype = subtype.getBioStructureTypeName (false);
cmd.append ("  structure ").append (stype).append (" ").append (JU.Escape.eBS (bs)).append (comment).append (" & (" + res1 + " - " + res2 + ")").append (";\n");
} else {
var str;
var nx;
switch (type) {
case J.c.STR.HELIX:
nx = ++nHelix;
sid = JU.PT.formatStringI ("%3N %3N", "N", nx);
str = "HELIX  %ID %3GROUPA %1CA %4RESA  %3GROUPB %1CB %4RESB";
var stype = null;
switch (subtype) {
case J.c.STR.HELIX:
case J.c.STR.HELIXALPHA:
stype = "  1";
break;
case J.c.STR.HELIX310:
stype = "  5";
break;
case J.c.STR.HELIXPI:
stype = "  3";
break;
}
if (stype != null) str += stype;
break;
case J.c.STR.SHEET:
nx = ++nSheet;
sid = JU.PT.formatStringI ("%3N %3A 0", "N", nx);
sid = JU.PT.formatStringS (sid, "A", "S" + nx);
str = "SHEET  %ID %3GROUPA %1CA%4RESA  %3GROUPB %1CB%4RESB";
break;
case J.c.STR.TURN:
default:
nx = ++nTurn;
sid = JU.PT.formatStringI ("%3N %3N", "N", nx);
str = "TURN   %ID %3GROUPA %1CA%4RESA  %3GROUPB %1CB%4RESB";
break;
}
str = JU.PT.formatStringS (str, "ID", sid);
str = JU.PT.formatStringS (str, "GROUPA", m1.getGroup3 ());
str = JU.PT.formatStringS (str, "CA", m1.getLeadAtom ().getChainIDStr ());
str = JU.PT.formatStringI (str, "RESA", res1);
str = JU.PT.formatStringS (str, "GROUPB", m2.getGroup3 ());
str = JU.PT.formatStringS (str, "CB", m2.getLeadAtom ().getChainIDStr ());
str = JU.PT.formatStringI (str, "RESB", res2);
cmd.append (str);
if (showMode) cmd.append (" strucno= ").appendI (ps.strucNo);
cmd.append ("\n");
}}
}
if (n > 0) cmd.append ("\n");
return n;
}, "JU.BS,JU.SB,JU.Lst,J.c.STR,~B,~N");
Clazz_defineMethod (c$, "modelsOf", 
 function (bsAtoms, bsAtomsRet) {
var bsModels = JU.BS.newN (this.ms.mc);
var isAll = (bsAtoms == null);
var i0 = (isAll ? this.ms.ac - 1 : bsAtoms.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsAtoms.nextSetBit (i + 1))) {
var modelIndex = this.ms.am[this.ms.at[i].mi].trajectoryBaseIndex;
if (this.ms.isJmolDataFrameForModel (modelIndex)) continue;
bsModels.set (modelIndex);
bsAtomsRet.set (i);
}
return bsModels;
}, "JU.BS,JU.BS");
Clazz_defineMethod (c$, "setAllDefaultStructure", 
 function (bsModels) {
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
if (m.defaultStructure == null) m.defaultStructure = this.getFullProteinStructureState (m.bsAtoms, 1073742158);
}
}, "JU.BS");
Clazz_defineMethod (c$, "getAminoAcidValenceAndCharge", 
function (s, atomName, aaRet) {
return this.getBioExt ().getAminoAcidValenceAndCharge (s, atomName, aaRet);
}, "~S,~S,~A");
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.Model"], "JM.BioModel", ["java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.SB", "J.api.Interface", "JM.AlphaPolymer", "$.AminoPolymer", "$.BioModelSet", "JS.SV", "JU.Escape"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.bioPolymerCount = 0;
this.bioPolymers = null;
this.isMutated = false;
this.defaultStructure = null;
Clazz_instantialize (this, arguments);
}, JM, "BioModel", JM.Model);
Clazz_makeConstructor (c$, 
function (modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo) {
Clazz_superConstructor (this, JM.BioModel, []);
this.vwr = modelSet.vwr;
this.set (modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo);
this.isBioModel = true;
if (modelSet.bioModelset == null) modelSet.bioModelset =  new JM.BioModelSet ().set (this.vwr, this.ms);
this.clearBioPolymers ();
modelSet.am[modelIndex] = this;
this.pdbID = auxiliaryInfo.get ("name");
}, "JM.ModelSet,~N,~N,~S,java.util.Properties,java.util.Map");
Clazz_defineMethod (c$, "addBioPolymer", 
function (polymer) {
if (this.bioPolymers.length == 0) this.clearBioPolymers ();
if (this.bioPolymerCount == this.bioPolymers.length) this.bioPolymers = JU.AU.doubleLength (this.bioPolymers);
polymer.bioPolymerIndexInModel = this.bioPolymerCount;
this.bioPolymers[this.bioPolymerCount++] = polymer;
return polymer.monomerCount;
}, "JM.BioPolymer");
Clazz_defineMethod (c$, "addSecondaryStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned) {
for (var i = this.bioPolymerCount; --i >= 0; ) if (Clazz_instanceOf (this.bioPolymers[i], JM.AlphaPolymer)) (this.bioPolymers[i]).addStructure (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned);

}, "J.c.STR,~S,~N,~N,~N,~N,~N,~N,~N,~N,JU.BS");
Clazz_defineMethod (c$, "addStructureByBS", 
function (count, dsspType, type, bs) {
for (var i = this.bioPolymerCount; --i >= 0; ) {
var b = this.bioPolymers[i];
if (Clazz_instanceOf (b, JM.AlphaPolymer)) count = (this.bioPolymers[i]).setStructureBS (++count, dsspType, type, bs, true);
}
}, "~N,~N,J.c.STR,JU.BS");
Clazz_defineMethod (c$, "calculateDssx", 
 function (vHBonds, doReport, dsspIgnoreHydrogen, setStructure, version) {
var haveProt = false;
var haveNucl = false;
for (var i = 0; i < this.bioPolymerCount && !(haveProt && haveNucl); i++) {
if (this.bioPolymers[i].isNucleic ()) haveNucl = true;
 else if (Clazz_instanceOf (this.bioPolymers[i], JM.AminoPolymer)) haveProt = true;
}
var s = "";
if (haveProt) s += (J.api.Interface.getOption ("dssx.DSSP", this.vwr, "ms")).calculateDssp (this.bioPolymers, this.bioPolymerCount, vHBonds, doReport, dsspIgnoreHydrogen, setStructure, version);
if (haveNucl && this.auxiliaryInfo.containsKey ("dssr") && vHBonds != null) s += this.vwr.getAnnotationParser (true).getHBonds (this.ms, this.modelIndex, vHBonds, doReport);
return s;
}, "JU.Lst,~B,~B,~B,~N");
Clazz_defineMethod (c$, "calculateStructures", 
function (asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha, version) {
if (this.bioPolymerCount == 0 || !setStructure && !asDSSP) return "";
this.ms.proteinStructureTainted = this.structureTainted = true;
if (setStructure) for (var i = this.bioPolymerCount; --i >= 0; ) if (!asDSSP || this.bioPolymers[i].monomers[0].getNitrogenAtom () != null) this.bioPolymers[i].clearStructures ();

if (!asDSSP || includeAlpha) for (var i = this.bioPolymerCount; --i >= 0; ) if (Clazz_instanceOf (this.bioPolymers[i], JM.AlphaPolymer)) (this.bioPolymers[i]).calculateStructures (includeAlpha);

return (asDSSP ? this.calculateDssx (null, doReport, dsspIgnoreHydrogen, setStructure, version) : "");
}, "~B,~B,~B,~B,~B,~N");
Clazz_defineMethod (c$, "clearBioPolymers", 
function () {
this.bioPolymers =  new Array (8);
this.bioPolymerCount = 0;
});
Clazz_overrideMethod (c$, "fixIndices", 
function (modelIndex, nAtomsDeleted, bsDeleted) {
this.fixIndicesM (modelIndex, nAtomsDeleted, bsDeleted);
this.recalculateLeadMidpointsAndWingVectors ();
}, "~N,~N,JU.BS");
Clazz_overrideMethod (c$, "freeze", 
function () {
this.freezeM ();
this.bioPolymers = JU.AU.arrayCopyObject (this.bioPolymers, this.bioPolymerCount);
return true;
});
Clazz_defineMethod (c$, "getBioBranches", 
function (biobranches) {
var bsBranch;
for (var j = 0; j < this.bioPolymerCount; j++) {
bsBranch =  new JU.BS ();
this.bioPolymers[j].getRange (bsBranch, this.isMutated);
var iAtom = bsBranch.nextSetBit (0);
if (iAtom >= 0) {
if (biobranches == null) biobranches =  new JU.Lst ();
biobranches.addLast (bsBranch);
}}
return biobranches;
}, "JU.Lst");
Clazz_defineMethod (c$, "getBioPolymerCount", 
function () {
return this.bioPolymerCount;
});
Clazz_defineMethod (c$, "getCachedAnnotationMap", 
function (key, ann) {
var cache = (this.dssrCache == null && ann != null ? this.dssrCache =  new java.util.Hashtable () : this.dssrCache);
if (cache == null) return null;
var annotv = cache.get (key);
if (annotv == null && ann != null) {
annotv = (Clazz_instanceOf (ann, JS.SV) || Clazz_instanceOf (ann, java.util.Hashtable) ? ann : this.vwr.parseJSONMap (ann));
cache.put (key, annotv);
}return (Clazz_instanceOf (annotv, JS.SV) || Clazz_instanceOf (annotv, java.util.Hashtable) ? annotv : null);
}, "~S,~O");
Clazz_defineMethod (c$, "getConformation", 
function (conformationIndex0, doSet, bsAtoms, bsRet) {
if (conformationIndex0 >= 0) {
var nAltLocs = this.altLocCount;
if (nAltLocs > 0) {
var atoms = this.ms.at;
var g = null;
var ch = '\u0000';
var conformationIndex = conformationIndex0;
var bsFound =  new JU.BS ();
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var atom = atoms[i];
var altloc = atom.altloc;
if (altloc == '\0') continue;
if (atom.group !== g) {
g = atom.group;
ch = '\0';
conformationIndex = conformationIndex0;
bsFound.clearAll ();
}if (conformationIndex >= 0 && altloc != ch && !bsFound.get (altloc.charCodeAt (0))) {
ch = altloc;
conformationIndex--;
bsFound.set (altloc.charCodeAt (0));
}if (conformationIndex >= 0 || altloc != ch) bsAtoms.clear (i);
}
}}if (bsAtoms.nextSetBit (0) >= 0) {
bsRet.or (bsAtoms);
if (doSet) for (var j = this.bioPolymerCount; --j >= 0; ) this.bioPolymers[j].setConformation (bsAtoms);

}return true;
}, "~N,~B,JU.BS,JU.BS");
Clazz_defineMethod (c$, "getDefaultLargePDBRendering", 
function (sb, maxAtoms) {
var bs =  new JU.BS ();
if (this.getBondCount () == 0) bs = this.bsAtoms;
if (bs !== this.bsAtoms) for (var i = 0; i < this.bioPolymerCount; i++) this.bioPolymers[i].getRange (bs, this.isMutated);

if (bs.nextSetBit (0) < 0) return;
var bs2 =  new JU.BS ();
if (bs === this.bsAtoms) {
bs2 = bs;
} else {
for (var i = 0; i < this.bioPolymerCount; i++) if (this.bioPolymers[i].getType () == 0) this.bioPolymers[i].getRange (bs2, this.isMutated);

}if (bs2.nextSetBit (0) >= 0) sb.append ("select ").append (JU.Escape.eBS (bs2)).append (";backbone only;");
if (this.act <= maxAtoms) return;
sb.append ("select ").append (JU.Escape.eBS (bs)).append (" & connected; wireframe only;");
if (bs !== this.bsAtoms) {
bs2.clearAll ();
bs2.or (this.bsAtoms);
bs2.andNot (bs);
if (bs2.nextSetBit (0) >= 0) sb.append ("select " + JU.Escape.eBS (bs2) + " & !connected;stars 0.5;spacefill off;");
}}, "JU.SB,~N");
Clazz_defineMethod (c$, "getFullPDBHeader", 
function () {
if (this.modelIndex < 0) return "";
var info = this.auxiliaryInfo.get ("fileHeader");
if (info != null) return info;
return this.ms.bioModelset.getBioExt ().getFullPDBHeader (this.auxiliaryInfo);
});
Clazz_defineMethod (c$, "getPdbData", 
function (type, ctype, isDraw, bsSelected, out, tokens, pdbCONECT, bsWritten) {
this.ms.bioModelset.getBioExt ().getPdbDataM (this, this.vwr, type, ctype, isDraw, bsSelected, out, tokens, pdbCONECT, bsWritten);
}, "~S,~S,~B,JU.BS,JU.OC,~A,JU.SB,JU.BS");
Clazz_defineMethod (c$, "getRasmolHydrogenBonds", 
function (bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds, version) {
var doAdd = (vHBonds == null);
if (doAdd) vHBonds =  new JU.Lst ();
if (nMax < 0) nMax = 2147483647;
var asDSSX = (bsB == null);
var bp;
var bp1;
if (asDSSX && this.bioPolymerCount > 0) {
this.calculateDssx (vHBonds, false, dsspIgnoreHydrogens, false, version);
} else {
for (var i = this.bioPolymerCount; --i >= 0; ) {
bp = this.bioPolymers[i];
if (bp.monomerCount == 0) continue;
var type = bp.getType ();
var isRNA = false;
switch (type) {
case 1:
if (nucleicOnly) continue;
bp.calcRasmolHydrogenBonds (null, bsA, bsB, vHBonds, nMax, null, true, false);
break;
case 2:
isRNA = bp.monomers[0].isRna ();
break;
default:
continue;
}
for (var j = this.bioPolymerCount; --j >= 0; ) {
if ((bp1 = this.bioPolymers[j]) != null && (isRNA || i != j) && type == bp1.getType ()) {
bp1.calcRasmolHydrogenBonds (bp, bsA, bsB, vHBonds, nMax, null, true, false);
}}
}
}if (vHBonds.size () == 0 || !doAdd) return;
this.hasRasmolHBonds = true;
for (var i = 0; i < vHBonds.size (); i++) {
var bond = vHBonds.get (i);
var atom1 = bond.atom1;
var atom2 = bond.atom2;
if (atom1.isBonded (atom2)) continue;
var index = this.ms.addHBond (atom1, atom2, bond.order, bond.getEnergy ());
if (bsHBonds != null) bsHBonds.set (index);
}
}, "JU.BS,JU.BS,JU.Lst,~B,~N,~B,JU.BS,~N");
Clazz_defineMethod (c$, "getUnitID", 
function (atom, flags) {
var sb =  new JU.SB ();
var m = atom.group;
var noTrim = ((flags & 16) != 16);
var ch = ((flags & 8) == 8 ? m.getInsertionCode () : '\0');
var isAll = (ch != '\0');
if ((flags & 1) == 1 && (this.pdbID != null)) sb.append (this.pdbID);
sb.append ("|").appendO (this.ms.getInfo (this.modelIndex, "modelNumber")).append ("|").append (this.vwr.getChainIDStr (m.chain.chainID)).append ("|").append (m.getGroup3 ()).append ("|").appendI (m.getResno ());
if ((flags & 4) == 4) {
sb.append ("|").append (atom.getAtomName ());
if (atom.altloc != '\0') sb.append ("|").appendC (atom.altloc);
 else if (noTrim || isAll) sb.append ("|");
} else if (noTrim || isAll) {
sb.append ("||");
}if (isAll) sb.append ("|").appendC (ch);
 else if (noTrim) sb.append ("|");
if (noTrim) sb.append ("|");
return sb.toString ();
}, "JM.Atom,~N");
Clazz_defineMethod (c$, "recalculateLeadMidpointsAndWingVectors", 
function () {
for (var ip = 0; ip < this.bioPolymerCount; ip++) this.bioPolymers[ip].recalculateLeadMidpointsAndWingVectors ();

});
Clazz_defineMethod (c$, "resetRasmolBonds", 
function (bs, dsspVersion) {
var bsDelete =  new JU.BS ();
this.hasRasmolHBonds = false;
var am = this.ms.am;
var bo = this.ms.bo;
for (var i = this.ms.bondCount; --i >= 0; ) {
var bond = bo[i];
if ((bond.order & 28672) != 0 && am[bond.atom1.mi].trajectoryBaseIndex == this.modelIndex) bsDelete.set (i);
}
if (bsDelete.nextSetBit (0) >= 0) this.ms.deleteBonds (bsDelete, false);
this.getRasmolHydrogenBonds (bs, bs, null, false, 2147483647, false, null, dsspVersion);
}, "JU.BS,~N");
Clazz_defineMethod (c$, "getAtomicDSSRData", 
function (dssrData, dataType) {
if (this.auxiliaryInfo.containsKey ("dssr")) this.vwr.getAnnotationParser (true).getAtomicDSSRData (this.ms, this.modelIndex, dssrData, dataType);
}, "~A,~S");
});
Clazz_declarePackage ("JM");
Clazz_load (["java.util.Hashtable", "J.c.STR"], "JM.BioResolver", ["java.lang.Boolean", "$.Byte", "$.NullPointerException", "$.Short", "java.util.Arrays", "JU.AU", "$.BS", "$.Measure", "$.P3", "$.P4", "$.PT", "$.SB", "$.V3", "JM.Group", "JM.AlphaMonomer", "$.AlphaPolymer", "$.AminoMonomer", "$.AminoPolymer", "$.BioModel", "$.CarbohydrateMonomer", "$.CarbohydratePolymer", "$.Monomer", "$.NucleicMonomer", "$.NucleicPolymer", "$.PhosphorusMonomer", "$.PhosphorusPolymer", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.vAB = null;
this.vNorm = null;
this.plane = null;
this.ml = null;
this.ms = null;
this.bsAddedMask = null;
this.lastSetH = -2147483648;
this.maxSerial = 0;
this.haveHsAlready = false;
this.bsAddedHydrogens = null;
this.bsAtomsForHs = null;
this.htBondMap = null;
this.htGroupBonds = null;
this.hNames = null;
this.baseBondIndex = 0;
this.bsAssigned = null;
Clazz_instantialize (this, arguments);
}, JM, "BioResolver", null, java.util.Comparator);
Clazz_makeConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "setLoader", 
function (modelLoader) {
this.ml = modelLoader;
this.bsAddedMask = null;
this.lastSetH = -2147483648;
this.maxSerial = 0;
this.haveHsAlready = false;
if (modelLoader == null) {
this.ms = null;
this.bsAddedHydrogens = this.bsAtomsForHs = this.bsAssigned = null;
this.htBondMap = null;
this.htGroupBonds = null;
this.hNames = null;
} else {
JM.Group.specialAtomNames = JM.BioResolver.specialAtomNames;
this.ms = modelLoader.ms;
this.vwr = modelLoader.ms.vwr;
modelLoader.specialAtomIndexes =  Clazz_newIntArray (JM.BioResolver.ATOMID_MAX, 0);
}return this;
}, "JM.ModelLoader");
Clazz_defineMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
if (JM.Group.standardGroupList == null) {
var s =  new JU.SB ();
for (var i = 1; i < 42; i++) s.append (",[").append (JM.BioResolver.predefinedGroup3Names[i]).append ("]");

s.append (",[AHR],[ALL],[AMU],[ARA],[ARB],[BDF],[BDR],[BGC],[BMA],[FCA],[FCB],[FRU],[FUC],[FUL],[GAL],[GLA],[GLC],[GXL],[GUP],[LXC],[MAN],[RAM],[RIB],[RIP],[XYP],[XYS],[CBI],[CT3],[CTR],[CTT],[LAT],[MAB],[MAL],[MLR],[MTT],[SUC],[TRE],[GCU],[MTL],[NAG],[NDG],[RHA],[SOR],[SOL],[SOE],[XYL],[A2G],[LBT],[NGA],[SIA],[SLB],[AFL],[AGC],[GLB],[NAN],[RAA]");
JM.BioResolver.group3Count = Clazz_doubleToInt (s.length () / 6);
JM.Group.standardGroupList = s.toString ();
for (var i = 0, n = JM.BioResolver.predefinedGroup3Names.length; i < n; ++i) JM.BioResolver.addGroup3Name (JM.BioResolver.predefinedGroup3Names[i].trim ());

}return this;
}, "JV.Viewer");
Clazz_defineMethod (c$, "getBioModel", 
function (modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo) {
return  new JM.BioModel (this.ms, modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo);
}, "~N,~N,~S,java.util.Properties,java.util.Map");
Clazz_defineMethod (c$, "distinguishAndPropagateGroup", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms) {
var mask = 0;
for (var i = JM.BioResolver.ATOMID_MAX; --i >= 0; ) specialAtomIndexes[i] = -2147483648;

for (var i = lastAtomIndex; i >= firstAtomIndex; --i) {
var specialAtomID = atoms[i].atomID;
if (specialAtomID <= 0) continue;
if (specialAtomID < 14) {
mask |= (1 << specialAtomID);
}specialAtomIndexes[specialAtomID] = i;
}
var m = null;
if ((mask & 14) == 14) m = JM.AminoMonomer.validateAndAllocate (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms);
 else if (mask == 4) m = JM.AlphaMonomer.validateAndAllocateA (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes);
 else if (((mask & 8128) == 8128)) m = JM.NucleicMonomer.validateAndAllocate (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes);
 else if (mask == 8192) m = JM.PhosphorusMonomer.validateAndAllocateP (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes);
 else if (JM.BioResolver.checkCarbohydrate (group3)) m = JM.CarbohydrateMonomer.validateAndAllocate (chain, group3, seqcode, firstAtomIndex, lastAtomIndex);
return (m != null && m.leadAtomIndex >= 0 ? m : null);
}, "JM.Chain,~S,~N,~N,~N,~A,~A");
Clazz_defineMethod (c$, "setHaveHsAlready", 
function (b) {
this.haveHsAlready = b;
}, "~B");
Clazz_defineMethod (c$, "initializeHydrogenAddition", 
function () {
this.baseBondIndex = this.ms.bondCount;
this.bsAddedHydrogens =  new JU.BS ();
this.bsAtomsForHs =  new JU.BS ();
this.htBondMap =  new java.util.Hashtable ();
this.htGroupBonds =  new java.util.Hashtable ();
this.hNames =  new Array (3);
this.vAB =  new JU.V3 ();
this.vNorm =  new JU.V3 ();
this.plane =  new JU.P4 ();
});
Clazz_defineMethod (c$, "addImplicitHydrogenAtoms", 
function (adapter, iGroup, nH) {
var group3 = this.ml.getGroup3 (iGroup);
var nH1;
if (this.haveHsAlready || group3 == null || (nH1 = JM.BioResolver.getStandardPdbHydrogenCount (group3)) == 0) return;
nH = (nH1 < 0 ? -1 : nH1 + nH);
var model = null;
var iFirst = this.ml.getFirstAtomIndex (iGroup);
var ac = this.ms.ac;
if (nH < 0) {
if (ac - iFirst == 1) return;
model = this.vwr.getLigandModel (group3, "ligand_", "_data", null);
if (model == null) return;
nH = adapter.getHydrogenAtomCount (model);
if (nH < 1) return;
}this.getBondInfo (adapter, group3, model);
this.ms.am[this.ms.at[iFirst].mi].isPdbWithMultipleBonds = true;
this.bsAtomsForHs.setBits (iFirst, ac);
this.bsAddedHydrogens.setBits (ac, ac + nH);
var isHetero = this.ms.at[iFirst].isHetero ();
var xyz = JU.P3.new3 (NaN, NaN, NaN);
var a = this.ms.at[iFirst];
for (var i = 0; i < nH; i++) this.ms.addAtom (a.mi, a.group, 1, "H", null, 0, a.getSeqID (), 0, xyz, NaN, null, 0, 0, 1, 0, null, isHetero, 0, null).$delete (null);

}, "J.api.JmolAdapter,~N,~N");
Clazz_defineMethod (c$, "getBondInfo", 
 function (adapter, group3, model) {
if (this.htGroupBonds.get (group3) != null) return;
var bondInfo = (model == null ? this.getPdbBondInfo (group3, this.vwr.g.legacyHAddition) : this.getLigandBondInfo (adapter, model, group3));
if (bondInfo == null) return;
this.htGroupBonds.put (group3, Boolean.TRUE);
for (var i = 0; i < bondInfo.length; i++) {
if (bondInfo[i] == null) continue;
if (bondInfo[i][1].charAt (0) == 'H') this.htBondMap.put (group3 + "." + bondInfo[i][0], bondInfo[i][1]);
 else this.htBondMap.put (group3 + ":" + bondInfo[i][0] + ":" + bondInfo[i][1], bondInfo[i][2]);
}
}, "J.api.JmolAdapter,~S,~O");
Clazz_defineMethod (c$, "getLigandBondInfo", 
 function (adapter, model, group3) {
var dataIn = adapter.getBondList (model);
var htAtoms =  new java.util.Hashtable ();
var iterAtom = adapter.getAtomIterator (model);
while (iterAtom.hasNext ()) htAtoms.put (iterAtom.getAtomName (), iterAtom.getXYZ ());

var bondInfo =  new Array (dataIn.length * 2);
var n = 0;
for (var i = 0; i < dataIn.length; i++) {
var b = dataIn[i];
if (b[0].charAt (0) != 'H') bondInfo[n++] =  Clazz_newArray (-1, [b[0], b[1], b[2], b[1].startsWith ("H") ? "0" : "1"]);
if (b[1].charAt (0) != 'H') bondInfo[n++] =  Clazz_newArray (-1, [b[1], b[0], b[2], b[0].startsWith ("H") ? "0" : "1"]);
}
java.util.Arrays.sort (bondInfo, this);
var t;
for (var i = 0; i < n; ) {
t = bondInfo[i];
var a1 = t[0];
var nH = 0;
var nC = 0;
for (; i < n && (t = bondInfo[i])[0].equals (a1); i++) {
if (t[3].equals ("0")) {
nH++;
continue;
}if (t[3].equals ("1")) nC++;
}
var pt = i - nH - nC;
if (nH == 1) continue;
switch (nC) {
case 1:
var sep = (nH == 2 ? '@' : '|');
for (var j = 1; j < nH; j++) {
bondInfo[pt][1] += sep + bondInfo[pt + j][1];
bondInfo[pt + j] = null;
}
continue;
case 2:
if (nH != 2) continue;
var name = bondInfo[pt][0];
var name1 = bondInfo[pt + nH][1];
var name2 = bondInfo[pt + nH + 1][1];
var factor = name1.compareTo (name2);
JU.Measure.getPlaneThroughPoints (htAtoms.get (name1), htAtoms.get (name), htAtoms.get (name2), this.vNorm, this.vAB, this.plane);
var d = JU.Measure.distanceToPlane (this.plane, htAtoms.get (bondInfo[pt][1])) * factor;
bondInfo[pt][1] = (d > 0 ? bondInfo[pt][1] + "@" + bondInfo[pt + 1][1] : bondInfo[pt + 1][1] + "@" + bondInfo[pt][1]);
bondInfo[pt + 1] = null;
}
}
for (var i = 0; i < n; i++) {
if ((t = bondInfo[i]) != null && t[1].charAt (0) != 'H' && t[0].compareTo (t[1]) > 0) {
bondInfo[i] = null;
continue;
}if (t != null) JU.Logger.info (" ligand " + group3 + ": " + bondInfo[i][0] + " - " + bondInfo[i][1] + " order " + bondInfo[i][2]);
}
return bondInfo;
}, "J.api.JmolAdapter,~O,~S");
Clazz_overrideMethod (c$, "compare", 
function (a, b) {
return (b == null ? (a == null ? 0 : -1) : a == null ? 1 : a[0].compareTo (b[0]) < 0 ? -1 : a[0].compareTo (b[0]) > 0 ? 1 : a[3].compareTo (b[3]) < 0 ? -1 : a[3].compareTo (b[3]) > 0 ? 1 : a[1].compareTo (b[1]) < 0 ? -1 : a[1].compareTo (b[1]) > 0 ? 1 : 0);
}, "~A,~A");
Clazz_defineMethod (c$, "finalizeHydrogens", 
function () {
this.vwr.getLigandModel (null, null, null, null);
this.finalizePdbMultipleBonds ();
this.addHydrogens ();
});
Clazz_defineMethod (c$, "addHydrogens", 
 function () {
if (this.bsAddedHydrogens.nextSetBit (0) < 0) return;
this.bsAddedMask = JU.BSUtil.copy (this.bsAddedHydrogens);
this.finalizePdbCharges ();
var nTotal =  Clazz_newIntArray (1, 0);
var pts = this.ms.calculateHydrogens (this.bsAtomsForHs, nTotal, true, false, null);
var groupLast = null;
var ipt = 0;
for (var i = 0; i < pts.length; i++) {
if (pts[i] == null) continue;
var atom = this.ms.at[i];
var g = atom.group;
if (g !== groupLast) {
groupLast = g;
ipt = g.lastAtomIndex;
while (this.bsAddedHydrogens.get (ipt)) ipt--;

}var gName = atom.getGroup3 (false);
var aName = atom.getAtomName ();
var hName = this.htBondMap.get (gName + "." + aName);
if (hName == null) continue;
var isChiral = hName.contains ("@");
var isMethyl = (hName.endsWith ("?") || hName.indexOf ("|") >= 0);
var n = pts[i].length;
if (n == 3 && !isMethyl && hName.equals ("H@H2")) {
hName = "H|H2|H3";
isMethyl = true;
isChiral = false;
}if (isChiral && n == 3 || isMethyl != (n == 3)) {
JU.Logger.info ("Error adding H atoms to " + gName + g.getResno () + ": " + pts[i].length + " atoms should not be added to " + aName);
continue;
}var pt = hName.indexOf ("@");
switch (pts[i].length) {
case 1:
if (pt > 0) hName = hName.substring (0, pt);
this.setHydrogen (i, ++ipt, hName, pts[i][0]);
break;
case 2:
var hName1;
var hName2;
var d = -1;
var bonds = atom.bonds;
if (bonds != null) switch (bonds.length) {
case 2:
var atom1 = bonds[0].getOtherAtom (atom);
var atom2 = bonds[1].getOtherAtom (atom);
var factor = atom1.getAtomName ().compareTo (atom2.getAtomName ());
d = JU.Measure.distanceToPlane (JU.Measure.getPlaneThroughPoints (atom1, atom, atom2, this.vNorm, this.vAB, this.plane), pts[i][0]) * factor;
break;
}
if (pt < 0) {
JU.Logger.info ("Error adding H atoms to " + gName + g.getResno () + ": expected to only need 1 H but needed 2");
hName1 = hName2 = "H";
} else if (d < 0) {
hName2 = hName.substring (0, pt);
hName1 = hName.substring (pt + 1);
} else {
hName1 = hName.substring (0, pt);
hName2 = hName.substring (pt + 1);
}this.setHydrogen (i, ++ipt, hName1, pts[i][0]);
this.setHydrogen (i, ++ipt, hName2, pts[i][1]);
break;
case 3:
var pt1 = hName.indexOf ('|');
if (pt1 >= 0) {
var pt2 = hName.lastIndexOf ('|');
this.hNames[0] = hName.substring (0, pt1);
this.hNames[1] = hName.substring (pt1 + 1, pt2);
this.hNames[2] = hName.substring (pt2 + 1);
} else {
this.hNames[0] = hName.$replace ('?', '1');
this.hNames[1] = hName.$replace ('?', '2');
this.hNames[2] = hName.$replace ('?', '3');
}this.setHydrogen (i, ++ipt, this.hNames[0], pts[i][0]);
this.setHydrogen (i, ++ipt, this.hNames[1], pts[i][2]);
this.setHydrogen (i, ++ipt, this.hNames[2], pts[i][1]);
break;
}
}
this.deleteUnneededAtoms ();
this.ms.fixFormalCharges (JU.BSUtil.newBitSet2 (this.ml.baseAtomIndex, this.ml.ms.ac));
});
Clazz_defineMethod (c$, "deleteUnneededAtoms", 
 function () {
var bsBondsDeleted =  new JU.BS ();
for (var i = this.bsAtomsForHs.nextSetBit (0); i >= 0; i = this.bsAtomsForHs.nextSetBit (i + 1)) {
var atom = this.ms.at[i];
if (!atom.isHetero () || atom.getElementNumber () != 8 || atom.getFormalCharge () != 0 || atom.getCovalentBondCount () != 2) continue;
var bonds = atom.bonds;
var atom1 = bonds[0].getOtherAtom (atom);
var atomH = bonds[1].getOtherAtom (atom);
if (atom1.getElementNumber () == 1) {
var a = atom1;
atom1 = atomH;
atomH = a;
}if (atomH.getElementNumber () != 1) continue;
var bonds1 = atom1.bonds;
for (var j = 0; j < bonds1.length; j++) {
if (bonds1[j].order == 2) {
var atomO = bonds1[j].getOtherAtom (atom1);
if (atomO.getElementNumber () == 8) {
this.bsAddedHydrogens.set (atomH.i);
atomH.$delete (bsBondsDeleted);
break;
}}}
}
this.ms.deleteBonds (bsBondsDeleted, true);
this.deleteAtoms (this.bsAddedHydrogens);
});
Clazz_defineMethod (c$, "deleteAtoms", 
 function (bsDeletedAtoms) {
var mapOldToNew =  Clazz_newIntArray (this.ms.ac, 0);
var mapNewToOld =  Clazz_newIntArray (this.ms.ac - bsDeletedAtoms.cardinality (), 0);
var n = this.ml.baseAtomIndex;
var models = this.ms.am;
var atoms = this.ms.at;
for (var i = this.ml.baseAtomIndex; i < this.ms.ac; i++) {
models[atoms[i].mi].bsAtoms.clear (i);
models[atoms[i].mi].bsAtomsDeleted.clear (i);
if (bsDeletedAtoms.get (i)) {
mapOldToNew[i] = n - 1;
models[atoms[i].mi].act--;
} else {
mapNewToOld[n] = i;
mapOldToNew[i] = n++;
}}
this.ms.msInfo.put ("bsDeletedAtoms", bsDeletedAtoms);
for (var i = this.ml.baseGroupIndex; i < this.ml.groups.length; i++) {
var g = this.ml.groups[i];
if (g.firstAtomIndex >= this.ml.baseAtomIndex) {
g.firstAtomIndex = mapOldToNew[g.firstAtomIndex];
g.lastAtomIndex = mapOldToNew[g.lastAtomIndex];
if (g.leadAtomIndex >= 0) g.leadAtomIndex = mapOldToNew[g.leadAtomIndex];
}}
this.ms.adjustAtomArrays (mapNewToOld, this.ml.baseAtomIndex, n);
this.ms.calcBoundBoxDimensions (null, 1);
this.ms.resetMolecules ();
this.ms.validateBspf (false);
this.bsAddedMask = JU.BSUtil.deleteBits (this.bsAddedMask, bsDeletedAtoms);
for (var i = this.ml.baseModelIndex; i < this.ms.mc; i++) {
this.fixAnnotations (i, "domains", 1073741925);
this.fixAnnotations (i, "validation", 1073742189);
}
}, "JU.BS");
Clazz_defineMethod (c$, "fixAnnotations", 
 function (i, name, type) {
var o = this.ml.ms.getInfo (i, name);
if (o != null) {
var dbObj = (this.ms.am[i]).getCachedAnnotationMap (name, o);
if (dbObj != null) this.vwr.getAnnotationParser (false).fixAtoms (i, dbObj, this.bsAddedMask, type, 20);
}}, "~N,~S,~N");
Clazz_defineMethod (c$, "finalizePdbCharges", 
 function () {
var atoms = this.ms.at;
for (var i = this.bsAtomsForHs.nextSetBit (0); i >= 0; i = this.bsAtomsForHs.nextSetBit (i + 1)) {
var a = atoms[i];
if (a.group.getNitrogenAtom () === a && a.getCovalentBondCount () == 1) a.setFormalCharge (1);
if ((i = this.bsAtomsForHs.nextClearBit (i + 1)) < 0) break;
}
});
Clazz_defineMethod (c$, "finalizePdbMultipleBonds", 
 function () {
var htKeysUsed =  new java.util.Hashtable ();
var bondCount = this.ms.bondCount;
var bonds = this.ms.bo;
for (var i = this.baseBondIndex; i < bondCount; i++) {
var a1 = bonds[i].atom1;
var a2 = bonds[i].atom2;
var g = a1.group;
if (g !== a2.group) continue;
var key =  new JU.SB ().append (g.getGroup3 ());
key.append (":");
var n1 = a1.getAtomName ();
var n2 = a2.getAtomName ();
if (n1.compareTo (n2) > 0) key.append (n2).append (":").append (n1);
 else key.append (n1).append (":").append (n2);
var skey = key.toString ();
var type = this.htBondMap.get (skey);
if (type == null) continue;
htKeysUsed.put (skey, Boolean.TRUE);
bonds[i].setOrder (JU.PT.parseInt (type));
}
for (var key, $key = this.htBondMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (htKeysUsed.get (key) != null) continue;
if (key.indexOf (":") < 0) {
htKeysUsed.put (key, Boolean.TRUE);
continue;
}var value = this.htBondMap.get (key);
JU.Logger.info ("bond " + key + " was not used; order=" + value);
if (this.htBondMap.get (key).equals ("1")) {
htKeysUsed.put (key, Boolean.TRUE);
continue;
}}
var htKeysBad =  new java.util.Hashtable ();
for (var key, $key = this.htBondMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (htKeysUsed.get (key) != null) continue;
htKeysBad.put (key.substring (0, key.lastIndexOf (":")), this.htBondMap.get (key));
}
if (htKeysBad.isEmpty ()) return;
for (var i = 0; i < bondCount; i++) {
var a1 = bonds[i].atom1;
var a2 = bonds[i].atom2;
if (a1.group === a2.group) continue;
var value;
if ((value = htKeysBad.get (a1.getGroup3 (false) + ":" + a1.getAtomName ())) == null && ((value = htKeysBad.get (a2.getGroup3 (false) + ":" + a2.getAtomName ())) == null)) continue;
bonds[i].setOrder (JU.PT.parseInt (value));
JU.Logger.info ("assigning order " + bonds[i].order + " to bond " + bonds[i]);
}
});
Clazz_defineMethod (c$, "setHydrogen", 
 function (iTo, iAtom, name, pt) {
if (!this.bsAddedHydrogens.get (iAtom)) return;
var atoms = this.ms.at;
if (this.lastSetH == -2147483648 || atoms[iAtom].mi != atoms[this.lastSetH].mi) this.maxSerial = (this.ms.getInfo (atoms[this.lastSetH = iAtom].mi, "PDB_CONECT_firstAtom_count_max"))[2];
this.bsAddedHydrogens.clear (iAtom);
this.ms.setAtomName (iAtom, name, false);
atoms[iAtom].setT (pt);
this.ms.setAtomNumber (iAtom, ++this.maxSerial, false);
atoms[iAtom].atomSymmetry = atoms[iTo].atomSymmetry;
this.ml.undeleteAtom (iAtom);
this.ms.bondAtoms (atoms[iTo], atoms[iAtom], 1, this.ms.getDefaultMadFromOrder (1), null, 0, true, false);
}, "~N,~N,~S,JU.P3");
Clazz_defineMethod (c$, "fixPropertyValue", 
function (bsAtoms, data, toHydrogens) {
var atoms = this.ms.at;
var fData = data;
var newData =  Clazz_newFloatArray (bsAtoms.cardinality (), 0);
var lastData = 0;
for (var pt = 0, iAtom = 0, i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1), iAtom++) {
if (atoms[i].getElementNumber () == 1) {
if (!toHydrogens) continue;
} else {
lastData = fData[pt++];
}newData[iAtom] = lastData;
}
return newData;
}, "JU.BS,~O,~B");
c$.allocateBioPolymer = Clazz_defineMethod (c$, "allocateBioPolymer", 
function (groups, firstGroupIndex, checkConnections, pt0) {
var previous = null;
var count = 0;
for (var i = firstGroupIndex; i < groups.length; ++i) {
var group = groups[i];
var current;
if (!(Clazz_instanceOf (group, JM.Monomer)) || (current = group).bioPolymer != null || previous != null && previous.getClass () !== current.getClass () || checkConnections && !current.isConnectedAfter (previous)) break;
previous = current;
count++;
}
if (count < 2) return null;
var monomers =  new Array (count);
for (var j = 0; j < count; ++j) monomers[j] = groups[firstGroupIndex + j];

if (Clazz_instanceOf (previous, JM.AminoMonomer)) return  new JM.AminoPolymer (monomers, pt0);
if (Clazz_instanceOf (previous, JM.AlphaMonomer)) return  new JM.AlphaPolymer (monomers, pt0);
if (Clazz_instanceOf (previous, JM.NucleicMonomer)) return  new JM.NucleicPolymer (monomers);
if (Clazz_instanceOf (previous, JM.PhosphorusMonomer)) return  new JM.PhosphorusPolymer (monomers);
if (Clazz_instanceOf (previous, JM.CarbohydrateMonomer)) return  new JM.CarbohydratePolymer (monomers);
JU.Logger.error ("Polymer.allocatePolymer() ... no matching polymer for monomor " + previous);
throw  new NullPointerException ();
}, "~A,~N,~B,~N");
Clazz_defineMethod (c$, "iterateOverAllNewStructures", 
function (adapter, atomSetCollection) {
var iterStructure = adapter.getStructureIterator (atomSetCollection);
if (iterStructure == null) return;
var bs = iterStructure.getStructuredModels ();
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.ml.structuresDefinedInFile.set (this.ml.baseModelIndex + i);

while (iterStructure.hasNext ()) if (iterStructure.getStructureType () !== J.c.STR.TURN) this.setStructure (iterStructure);

iterStructure = adapter.getStructureIterator (atomSetCollection);
while (iterStructure.hasNext ()) if (iterStructure.getStructureType () === J.c.STR.TURN) this.setStructure (iterStructure);

}, "J.api.JmolAdapter,~O");
Clazz_defineMethod (c$, "setStructure", 
 function (iterStructure) {
var t = iterStructure.getSubstructureType ();
var id = iterStructure.getStructureID ();
var serID = iterStructure.getSerialID ();
var count = iterStructure.getStrandCount ();
var atomRange = iterStructure.getAtomIndices ();
var modelRange = iterStructure.getModelIndices ();
var bsAll = iterStructure.getBSAll ();
var m0;
var m1;
var models = this.ms.am;
if (this.ml.isTrajectory) {
m0 = m1 = modelRange[0];
} else {
m0 = modelRange[0] + this.ml.baseModelIndex;
m1 = modelRange[1] + this.ml.baseModelIndex;
}this.ml.structuresDefinedInFile.setBits (m0, m1 + 1);
var bs;
var m;
if (bsAll != null) {
for (var i = m0, t0; i <= m1; i++) if (Clazz_instanceOf ((m = models[i]), JM.BioModel)) for (var j = 0; j < 5; j++) if ((bs = bsAll[t0 = JM.BioResolver.mytypes[j]]) != null) (m).addStructureByBS (0, t0, JM.BioResolver.types[j], bs);


return;
}var startChainID = iterStructure.getStartChainID ();
var startSequenceNumber = iterStructure.getStartSequenceNumber ();
var startInsertionCode = iterStructure.getStartInsertionCode ();
var endSequenceNumber = iterStructure.getEndSequenceNumber ();
var endChainID = iterStructure.getEndChainID ();
var endInsertionCode = iterStructure.getEndInsertionCode ();
var type = (t === J.c.STR.NOT ? J.c.STR.NONE : t);
var startSeqCode = JM.Group.getSeqcodeFor (startSequenceNumber, startInsertionCode);
var endSeqCode = JM.Group.getSeqcodeFor (endSequenceNumber, endInsertionCode);
if (this.bsAssigned == null) this.bsAssigned =  new JU.BS ();
for (var i = m0, i0 = 0; i <= m1; i++) if (Clazz_instanceOf ((m = models[i]), JM.BioModel)) (m).addSecondaryStructure (type, id, serID, count, startChainID, startSeqCode, endChainID, endSeqCode, (i0 = m.firstAtomIndex) + atomRange[0], i0 + atomRange[1], this.bsAssigned);

}, "J.api.JmolAdapterStructureIterator");
Clazz_defineMethod (c$, "setGroupLists", 
function (ipt) {
this.ml.group3Lists[ipt + 1] = JM.Group.standardGroupList;
this.ml.group3Counts[ipt + 1] =  Clazz_newIntArray (JM.BioResolver.group3Count + 10, 0);
if (this.ml.group3Lists[0] == null) {
this.ml.group3Lists[0] = JM.Group.standardGroupList;
this.ml.group3Counts[0] =  Clazz_newIntArray (JM.BioResolver.group3Count + 10, 0);
}}, "~N");
Clazz_defineMethod (c$, "isKnownPDBGroup", 
function (g3, max) {
var pt = JM.BioResolver.knownGroupID (g3);
return (pt > 0 ? pt < max : max == 2147483647 && JM.BioResolver.checkCarbohydrate (g3));
}, "~S,~N");
Clazz_defineMethod (c$, "lookupSpecialAtomID", 
function (name) {
if (JM.BioResolver.htSpecialAtoms == null) {
JM.BioResolver.htSpecialAtoms =  new java.util.Hashtable ();
for (var i = JM.BioResolver.specialAtomNames.length; --i >= 0; ) {
var specialAtomName = JM.BioResolver.specialAtomNames[i];
if (specialAtomName != null) JM.BioResolver.htSpecialAtoms.put (specialAtomName, Byte.$valueOf (i));
}
}var boxedAtomID = JM.BioResolver.htSpecialAtoms.get (name);
return (boxedAtomID == null ? 0 : boxedAtomID.byteValue ());
}, "~S");
Clazz_defineMethod (c$, "getPdbBondInfo", 
 function (group3, isLegacy) {
if (JM.BioResolver.htPdbBondInfo == null) JM.BioResolver.htPdbBondInfo =  new java.util.Hashtable ();
var info = JM.BioResolver.htPdbBondInfo.get (group3);
if (info != null) return info;
var pt = JM.BioResolver.knownGroupID (group3);
if (pt < 0 || pt > JM.BioResolver.pdbBondInfo.length) return null;
var s = JM.BioResolver.pdbBondInfo[pt];
if (isLegacy && (pt = s.indexOf ("O3'")) >= 0) s = s.substring (0, pt);
var temp = JU.PT.getTokens (s);
info =  new Array (Clazz_doubleToInt (temp.length / 2));
for (var i = 0, p = 0; i < info.length; i++) {
var source = temp[p++];
var target = temp[p++];
if (target.length == 1) switch (target.charAt (0)) {
case 'N':
target = "H@H2";
break;
case 'B':
target = "HB3@HB2";
break;
case 'D':
target = "HD3@HD2";
break;
case 'G':
target = "HG3@HG2";
break;
case '2':
target = "H2'@H2''";
break;
case '5':
target = "H5''@H5'";
break;
}
if (target.charAt (0) != 'H' && source.compareTo (target) > 0) {
s = target;
target = source;
source = s;
}info[i] =  Clazz_newArray (-1, [source, target, (target.startsWith ("H") ? "1" : "2")]);
}
JM.BioResolver.htPdbBondInfo.put (group3, info);
return info;
}, "~S,~B");
c$.knownGroupID = Clazz_defineMethod (c$, "knownGroupID", 
function (group3) {
if (group3 == null || group3.length == 0) return 0;
var boxedGroupID = JM.BioResolver.htGroup.get (group3);
return (boxedGroupID == null ? -1 : boxedGroupID.shortValue ());
}, "~S");
c$.checkCarbohydrate = Clazz_defineMethod (c$, "checkCarbohydrate", 
 function (group3) {
return (group3 != null && ",[AHR],[ALL],[AMU],[ARA],[ARB],[BDF],[BDR],[BGC],[BMA],[FCA],[FCB],[FRU],[FUC],[FUL],[GAL],[GLA],[GLC],[GXL],[GUP],[LXC],[MAN],[RAM],[RIB],[RIP],[XYP],[XYS],[CBI],[CT3],[CTR],[CTT],[LAT],[MAB],[MAL],[MLR],[MTT],[SUC],[TRE],[GCU],[MTL],[NAG],[NDG],[RHA],[SOR],[SOL],[SOE],[XYL],[A2G],[LBT],[NGA],[SIA],[SLB],[AFL],[AGC],[GLB],[NAN],[RAA]".indexOf ("[" + group3.toUpperCase () + "]") >= 0);
}, "~S");
Clazz_defineMethod (c$, "isHetero", 
function (group3) {
switch (group3.length) {
case 1:
group3 += "  ";
break;
case 2:
group3 += " ";
break;
case 3:
break;
default:
return true;
}
var pt = JM.Group.standardGroupList.indexOf (group3);
return (pt < 0 || Clazz_doubleToInt (pt / 6) + 1 >= 42);
}, "~S");
Clazz_defineMethod (c$, "toStdAmino3", 
function (g1) {
if (g1.length == 0) return "";
var s =  new JU.SB ();
var pt = JM.BioResolver.knownGroupID ("==A");
if (pt < 0) {
for (var i = 1; i <= 20; i++) {
pt = JM.BioResolver.knownGroupID (JM.BioResolver.predefinedGroup3Names[i]);
JM.BioResolver.htGroup.put ("==" + JM.BioResolver.predefinedGroup1Names[i], Short.$valueOf (pt));
}
}for (var i = 0, n = g1.length; i < n; i++) {
var ch = g1.charAt (i);
pt = JM.BioResolver.knownGroupID ("==" + ch);
if (pt < 0) pt = 23;
s.append (" ").append (JM.BioResolver.predefinedGroup3Names[pt]);
}
return s.toString ().substring (1);
}, "~S");
Clazz_defineMethod (c$, "getGroupID", 
function (g3) {
return JM.BioResolver.getGroupIdFor (g3);
}, "~S");
c$.getGroupIdFor = Clazz_defineMethod (c$, "getGroupIdFor", 
function (group3) {
if (group3 != null) group3 = group3.trim ();
var groupID = JM.BioResolver.knownGroupID (group3);
return (groupID == -1 ? JM.BioResolver.addGroup3Name (group3) : groupID);
}, "~S");
c$.addGroup3Name = Clazz_defineMethod (c$, "addGroup3Name", 
 function (group3) {
if (JM.BioResolver.group3NameCount == JM.Group.group3Names.length) JM.Group.group3Names = JU.AU.doubleLengthS (JM.Group.group3Names);
var groupID = JM.BioResolver.group3NameCount++;
JM.Group.group3Names[groupID] = group3;
JM.BioResolver.htGroup.put (group3, Short.$valueOf (groupID));
return groupID;
}, "~S");
c$.getStandardPdbHydrogenCount = Clazz_defineMethod (c$, "getStandardPdbHydrogenCount", 
 function (group3) {
var pt = JM.BioResolver.knownGroupID (group3);
return (pt < 0 || pt >= JM.BioResolver.pdbHydrogenCount.length ? -1 : JM.BioResolver.pdbHydrogenCount[pt]);
}, "~S");
c$.getSpecialAtomName = Clazz_defineMethod (c$, "getSpecialAtomName", 
function (atomID) {
return JM.BioResolver.specialAtomNames[atomID];
}, "~N");
Clazz_defineMethod (c$, "getArgbs", 
function (tok) {
switch (tok) {
case 2097166:
return JM.BioResolver.argbsNucleic;
case 2097154:
return JM.BioResolver.argbsAmino;
case 1073742144:
return JM.BioResolver.argbsShapely;
case 1140850689:
return JM.BioResolver.argbsChainAtom;
case 1612709894:
return JM.BioResolver.argbsChainHetero;
}
return null;
}, "~N");
c$.htGroup = c$.prototype.htGroup =  new java.util.Hashtable ();
c$.types = c$.prototype.types =  Clazz_newArray (-1, [J.c.STR.HELIXPI, J.c.STR.HELIXALPHA, J.c.STR.SHEET, J.c.STR.HELIX310, J.c.STR.TURN]);
Clazz_defineStatics (c$,
"mytypes",  Clazz_newIntArray (-1, [0, 2, 3, 4, 6]),
"htPdbBondInfo", null,
"pdbBondInfo",  Clazz_newArray (-1, ["", "N N CA HA C O CB HB?", "N N CA HA C O CB B CG G CD D NE HE CZ NH1 NH1 HH11@HH12 NH2 HH22@HH21", "N N CA HA C O CB B CG OD1 ND2 HD21@HD22", "N N CA HA C O CB B CG OD1", "N N CA HA C O CB B SG HG", "N N CA HA C O CB B CG G CD OE1 NE2 HE22@HE21", "N N CA HA C O CB B CG G CD OE1", "N N CA HA2@HA3 C O", "N N CA HA C O CB B CG CD2 ND1 CE1 ND1 HD1 CD2 HD2 CE1 HE1 NE2 HE2", "N N CA HA C O CB HB CG1 HG13@HG12 CG2 HG2? CD1 HD1?", "N N CA HA C O CB B CG HG CD1 HD1? CD2 HD2?", "N N CA HA C O CB B CG G CD HD2@HD3 CE HE3@HE2 NZ HZ?", "N N CA HA C O CB B CG G CE HE?", "N N CA HA C O CB B CG CD1 CD1 HD1 CD2 CE2 CD2 HD2 CE1 CZ CE1 HE1 CE2 HE2 CZ HZ", "N H CA HA C O CB B CG G CD D", "N N CA HA C O CB B OG HG", "N N CA HA C O CB HB OG1 HG1 CG2 HG2?", "N N CA HA C O CB B CG CD1 CD1 HD1 CD2 CE2 NE1 HE1 CE3 CZ3 CE3 HE3 CZ2 CH2 CZ2 HZ2 CZ3 HZ3 CH2 HH2", "N N CA HA C O CB B CG CD1 CD1 HD1 CD2 CE2 CD2 HD2 CE1 CZ CE1 HE1 CE2 HE2 OH HH", "N N CA HA C O CB HB CG1 HG1? CG2 HG2?", "N N CA HA C O CB B", "N N CA HA C O CB B CG G", "", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C8 N7 C8 H8 C5 C4 C6 O6 N1 H1 C2 N3 N2 H22@H21 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C2 O2 N3 C4 N4 H41@H42 C5 C6 C5 H5 C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C8 N7 C8 H8 C5 C4 C6 N1 N6 H61@H62 C2 N3 C2 H2 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C2 O2 N3 H3 C4 O4 C5 C6 C7 H7? C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C2 O2 N3 H3 C4 O4 C5 C6 C5 H5 C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C8 N7 C8 H8 C5 C4 C6 O6 N1 H1 C2 N3 C2 H2 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C8 N7 C8 H8 C5 C4 C6 O6 N1 H1 C2 N3 N2 H22@H21 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C2 O2 N3 C4 N4 H41@H42 C5 C6 C5 H5 C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C8 N7 C8 H8 C5 C4 C6 N1 N6 H61@H62 C2 N3 C2 H2 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C2 O2 N3 H3 C4 O4 C5 C6 C7 H7? C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C2 O2 N3 H3 C4 O4 C5 C6 C5 H5 C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C8 N7 C8 H8 C5 C4 C6 O6 N1 H1 C2 N3 C2 H2 O3' HO3' O5' HO5'"]),
"pdbHydrogenCount",  Clazz_newIntArray (-1, [0, 6, 16, 7, 6, 6, 9, 8, 4, 9, 12, 12, 14, 10, 10, 8, 6, 8, 11, 10, 10, 3, 5, 0, 13, 13, 13, -1, 12, 12, 13, 13, 13, 14, 12, 12]),
"allCarbohydrates", ",[AHR],[ALL],[AMU],[ARA],[ARB],[BDF],[BDR],[BGC],[BMA],[FCA],[FCB],[FRU],[FUC],[FUL],[GAL],[GLA],[GLC],[GXL],[GUP],[LXC],[MAN],[RAM],[RIB],[RIP],[XYP],[XYS],[CBI],[CT3],[CTR],[CTT],[LAT],[MAB],[MAL],[MLR],[MTT],[SUC],[TRE],[GCU],[MTL],[NAG],[NDG],[RHA],[SOR],[SOL],[SOE],[XYL],[A2G],[LBT],[NGA],[SIA],[SLB],[AFL],[AGC],[GLB],[NAN],[RAA]",
"group3Count", 0,
"predefinedGroup1Names",  Clazz_newCharArray (-1, ['\0', 'A', 'R', 'N', 'D', 'C', 'Q', 'E', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V', 'A', 'G', '?', 'G', 'C', 'A', 'T', 'U', 'I', 'G', 'C', 'A', 'T', 'U', 'I', 'G', 'C', 'A', 'T', 'U', 'I']),
"group3NameCount", 0,
"predefinedGroup3Names",  Clazz_newArray (-1, ["   ", "ALA", "ARG", "ASN", "ASP", "CYS", "GLN", "GLU", "GLY", "HIS", "ILE", "LEU", "LYS", "MET", "PHE", "PRO", "SER", "THR", "TRP", "TYR", "VAL", "ASX", "GLX", "UNK", "G  ", "C  ", "A  ", "T  ", "U  ", "I  ", "DG ", "DC ", "DA ", "DT ", "DU ", "DI ", "+G ", "+C ", "+A ", "+T ", "+U ", "+I ", "HOH", "DOD", "WAT", "UREA", "PO4", "SO4", "UNL"]),
"specialAtomNames",  Clazz_newArray (-1, [null, "N", "CA", "C", "O", "O1", "O5'", "C5'", "C4'", "C3'", "O3'", "C2'", "C1'", "P", "OD1", "OD2", "OE1", "OE2", "SG", null, null, null, null, null, null, null, null, null, null, null, null, null, "N1", "C2", "N3", "C4", "C5", "C6", "O2", "N7", "C8", "N9", "N4", "N2", "N6", "C5M", "O6", "O4", "S4", "C7", "H1", "H2", "H3", null, null, null, null, null, null, null, null, null, null, null, "OXT", "H", "1H", "2H", "3H", "HA", "1HA", "2HA", "H5T", "O5T", "O1P", "OP1", "O2P", "OP2", "O4'", "O2'", "1H5'", "2H5'", "H4'", "H3'", "1H2'", "2H2'", "2HO'", "H1'", "H3T", "HO3'", "HO5'", "HA2", "HA3", "HA2", "H5'", "H5''", "H2'", "H2''", "HO2'", "O3P", "OP3"]));
c$.ATOMID_MAX = c$.prototype.ATOMID_MAX = JM.BioResolver.specialAtomNames.length;
Clazz_defineStatics (c$,
"htSpecialAtoms", null,
"argbsAmino",  Clazz_newIntArray (-1, [0xFFBEA06E, 0xFFC8C8C8, 0xFF145AFF, 0xFF00DCDC, 0xFFE60A0A, 0xFFE6E600, 0xFF00DCDC, 0xFFE60A0A, 0xFFEBEBEB, 0xFF8282D2, 0xFF0F820F, 0xFF0F820F, 0xFF145AFF, 0xFFE6E600, 0xFF3232AA, 0xFFDC9682, 0xFFFA9600, 0xFFFA9600, 0xFFB45AB4, 0xFF3232AA, 0xFF0F820F, 0xFFFF69B4, 0xFFFF69B4, 0xFFBEA06E]),
"argbsNucleic",  Clazz_newIntArray (-1, [0xFFBEA06E, 0xFFA0A0A0, 0xFF0F820F, 0xFFE6E600, 0xFFE60A0A, 0xFF145AFF, 0xFF00DCDC, 0xFF00DCDC, 0xFF0F820F, 0xFFE6E600, 0xFFE60A0A, 0xFF145AFF, 0xFF00DCDC, 0xFF00DCDC, 0xFF0F820F, 0xFFE6E600, 0xFFE60A0A, 0xFF145AFF, 0xFF00DCDC, 0xFF00DCDC]),
"argbsChainAtom",  Clazz_newIntArray (-1, [0xFFffffff, 0xFFC0D0FF, 0xFFB0FFB0, 0xFFFFC0C8, 0xFFFFFF80, 0xFFFFC0FF, 0xFFB0F0F0, 0xFFFFD070, 0xFFF08080, 0xFFF5DEB3, 0xFF00BFFF, 0xFFCD5C5C, 0xFF66CDAA, 0xFF9ACD32, 0xFFEE82EE, 0xFF00CED1, 0xFF00FF7F, 0xFF3CB371, 0xFF00008B, 0xFFBDB76B, 0xFF006400, 0xFF800000, 0xFF808000, 0xFF800080, 0xFF008080, 0xFFB8860B, 0xFFB22222]),
"argbsChainHetero",  Clazz_newIntArray (-1, [0xFFffffff, -7298865, -8335464, -3174224, -3158160, -3174193, -8339264, -3170208, -4173712, -3821949, -16734257, -4895668, -11094638, -7686870, -4296002, -16730463, -16724113, -13329567, -16777029, -5922981, -16739328, -5242880, -5197824, -5242704, -16731984, -1526253, -4050382]),
"argbsShapely",  Clazz_newIntArray (-1, [0xFFFF00FF, 0xFF00007C, 0xFFFF7C70, 0xFF8CFF8C, 0xFFA00042, 0xFFFFFF70, 0xFFFF4C4C, 0xFF660000, 0xFFFFFFFF, 0xFF7070FF, 0xFF004C00, 0xFF455E45, 0xFF4747B8, 0xFF534C52, 0xFFB8A042, 0xFF525252, 0xFFFF7042, 0xFFB84C00, 0xFF4F4600, 0xFF8C704C, 0xFFFF8CFF, 0xFFFF00FF, 0xFFFF00FF, 0xFFFF00FF, 0xFFFF7070, 0xFFFF8C4B, 0xFFA0A0FF, 0xFFA0FFA0, 0xFFFF8080, 0xFF80FFFF, 0xFFFF7070, 0xFFFF8C4B, 0xFFA0A0FF, 0xFFA0FFA0, 0xFFFF8080, 0xFF80FFFF, 0xFFFF7070, 0xFFFF8C4B, 0xFFA0A0FF, 0xFFA0FFA0, 0xFFFF8080, 0xFF80FFFF]));
{
{
}}});
Clazz_declarePackage ("JM");
Clazz_load (["JM.Monomer"], "JM.CarbohydrateMonomer", ["J.c.STR"], function () {
c$ = Clazz_declareType (JM, "CarbohydrateMonomer", JM.Monomer);
Clazz_overrideConstructor (c$, 
 function () {
});
c$.validateAndAllocate = Clazz_defineMethod (c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstIndex, lastIndex) {
return  new JM.CarbohydrateMonomer ().set2 (chain, group3, seqcode, firstIndex, lastIndex, JM.CarbohydrateMonomer.alphaOffsets);
}, "JM.Chain,~S,~N,~N,~N");
Clazz_overrideMethod (c$, "isCarbohydrate", 
function () {
return true;
});
Clazz_overrideMethod (c$, "getProteinStructureType", 
function () {
return J.c.STR.CARBOHYDRATE;
});
Clazz_overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) for (var j = possiblyPreviousMonomer.firstAtomIndex; j <= possiblyPreviousMonomer.lastAtomIndex; j++) {
var a = this.chain.model.ms.at[i];
var b = this.chain.model.ms.at[j];
if (a.getElementNumber () + b.getElementNumber () == 14 && a.distanceSquared (b) < 3.24) return true;
}

return false;
}, "JM.Monomer");
Clazz_overrideMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var anomericO = this.getLeadAtom ();
var marBegin = (Clazz_doubleToInt (madBegin / 2));
if (marBegin < 1200) marBegin = 1200;
if (anomericO.sZ == 0) return;
var radiusBegin = Clazz_floatToInt (this.scaleToScreen (anomericO.sZ, marBegin));
if (radiusBegin < 4) radiusBegin = 4;
if (this.isCursorOnTopOf (anomericO, x, y, radiusBegin, competitor)) closest[0] = anomericO;
}, "~N,~N,~A,~N,~N");
Clazz_overrideMethod (c$, "isConnectedPrevious", 
function () {
if (this.monomerIndex <= 0) return false;
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLinkGroup (i, null, null, true, false, false)) return true;

return false;
});
Clazz_defineStatics (c$,
"alphaOffsets",  Clazz_newByteArray (-1, [0]));
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.BioPolymer"], "JM.CarbohydratePolymer", null, function () {
c$ = Clazz_declareType (JM, "CarbohydratePolymer", JM.BioPolymer);
Clazz_makeConstructor (c$, 
function (monomers) {
Clazz_superConstructor (this, JM.CarbohydratePolymer, []);
this.set (monomers);
this.type = 3;
}, "~A");
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.Monomer"], "JM.PhosphorusMonomer", ["JU.Quat", "$.V3", "J.c.STR"], function () {
c$ = Clazz_declareType (JM, "PhosphorusMonomer", JM.Monomer);
Clazz_overrideMethod (c$, "isNucleic", 
function () {
return true;
});
Clazz_overrideConstructor (c$, 
function () {
});
c$.validateAndAllocateP = Clazz_defineMethod (c$, "validateAndAllocateP", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
return (firstIndex != lastIndex || specialAtomIndexes[13] != firstIndex ? null :  new JM.PhosphorusMonomer ().set2 (chain, group3, seqcode, firstIndex, lastIndex, JM.PhosphorusMonomer.phosphorusOffsets));
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz_overrideMethod (c$, "isDna", 
function () {
return this.isDnaByID ();
});
Clazz_overrideMethod (c$, "isRna", 
function () {
return this.isRnaByID ();
});
Clazz_overrideMethod (c$, "isPurine", 
function () {
return this.isPurineByID ();
});
Clazz_overrideMethod (c$, "isPyrimidine", 
function () {
return this.isPyrimidineByID ();
});
Clazz_overrideMethod (c$, "getStructure", 
function () {
return this.chain;
});
Clazz_overrideMethod (c$, "getProteinStructureType", 
function () {
return J.c.STR.NONE;
});
Clazz_overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
return this.isCA2 (possiblyPreviousMonomer);
}, "JM.Monomer");
Clazz_defineMethod (c$, "isCA2", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var distance = this.getLeadAtom ().distance (possiblyPreviousMonomer.getLeadAtom ());
return distance <= JM.PhosphorusMonomer.MAX_ADJACENT_PHOSPHORUS_DISTANCE;
}, "JM.Monomer");
Clazz_overrideMethod (c$, "getQuaternion", 
function (qType) {
return this.getQuaternionP ();
}, "~S");
Clazz_defineMethod (c$, "getQuaternionP", 
function () {
var i = this.monomerIndex;
if (i <= 0 || i >= this.bioPolymer.monomerCount - 1) return null;
var ptP = this.bioPolymer.monomers[i].getAtomFromOffsetIndex (0);
var ptA;
var ptB;
ptA = this.bioPolymer.monomers[i + 1].getAtomFromOffsetIndex (0);
ptB = this.bioPolymer.monomers[i - 1].getAtomFromOffsetIndex (0);
if (ptP == null || ptA == null || ptB == null) return null;
var vA =  new JU.V3 ();
var vB =  new JU.V3 ();
vA.sub2 (ptA, ptP);
vB.sub2 (ptB, ptP);
return JU.Quat.getQuaternionFrameV (vA, vB, null, false);
});
Clazz_overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
return this.getAtomFromOffsetIndex (0);
}, "~S");
Clazz_overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz_defineStatics (c$,
"P", 0,
"phosphorusOffsets",  Clazz_newByteArray (-1, [0]),
"MAX_ADJACENT_PHOSPHORUS_DISTANCE", 8.0);
});
Clazz_declarePackage ("JM");
c$ = Clazz_decorateAsClass (function () {
this.info = null;
this.g1 = null;
this.g2 = null;
Clazz_instantialize (this, arguments);
}, JM, "BasePair");
Clazz_makeConstructor (c$, 
 function () {
});
c$.add = Clazz_defineMethod (c$, "add", 
function (info, g1, g2) {
if (g1 == null || g2 == null) return null;
var bp =  new JM.BasePair ();
bp.info = info;
(bp.g1 = g1).addBasePair (bp);
(bp.g2 = g2).addBasePair (bp);
return bp;
}, "java.util.Map,JM.NucleicMonomer,JM.NucleicMonomer");
Clazz_defineMethod (c$, "getPartnerAtom", 
function (g) {
return (g === this.g1 ? this.g2 : this.g1).getLeadAtom ().i;
}, "JM.NucleicMonomer");
Clazz_defineMethod (c$, "toString", 
function () {
return this.info.toString ();
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.PhosphorusMonomer"], "JM.NucleicMonomer", ["java.lang.Character", "JU.A4", "$.Lst", "$.M3", "$.P3", "$.Quat", "$.V3", "J.c.STR", "JM.Group", "JM.NucleicPolymer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.$isPurine = false;
this.$isPyrimidine = false;
this.hasRnaO2Prime = false;
this.baseCenter = null;
this.bps = null;
this.dssrBox = null;
this.dssrBoxHeight = 0;
this.dssrFrame = null;
Clazz_instantialize (this, arguments);
}, JM, "NucleicMonomer", JM.PhosphorusMonomer);
Clazz_overrideConstructor (c$, 
 function () {
});
c$.validateAndAllocate = Clazz_defineMethod (c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes) {
var offsets = JM.Monomer.scanForOffsets (firstAtomIndex, specialAtomIndexes, JM.NucleicMonomer.interestingNucleicAtomIDs);
if (offsets == null) return null;
if (!JM.Monomer.checkOptional (offsets, 19, firstAtomIndex, specialAtomIndexes[73])) return null;
JM.Monomer.checkOptional (offsets, 20, firstAtomIndex, specialAtomIndexes[89]);
JM.Monomer.checkOptional (offsets, 18, firstAtomIndex, specialAtomIndexes[90]);
JM.Monomer.checkOptional (offsets, 23, firstAtomIndex, specialAtomIndexes[75]);
JM.Monomer.checkOptional (offsets, 24, firstAtomIndex, specialAtomIndexes[77]);
return ( new JM.NucleicMonomer ()).set4 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz_defineMethod (c$, "set4", 
 function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets) {
this.set2 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
if (!JM.Monomer.have (offsets, 15)) {
offsets[0] = offsets[19];
this.setLeadAtomIndex ();
}this.hasRnaO2Prime = JM.Monomer.have (offsets, 2);
this.$isPyrimidine = JM.Monomer.have (offsets, 8);
this.$isPurine = JM.Monomer.have (offsets, 9) && JM.Monomer.have (offsets, 10) && JM.Monomer.have (offsets, 11);
return this;
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz_overrideMethod (c$, "isNucleicMonomer", 
function () {
return true;
});
Clazz_overrideMethod (c$, "isDna", 
function () {
return !this.hasRnaO2Prime;
});
Clazz_overrideMethod (c$, "isRna", 
function () {
return this.hasRnaO2Prime;
});
Clazz_overrideMethod (c$, "isPurine", 
function () {
return this.$isPurine || !this.$isPyrimidine && this.isPurineByID ();
});
Clazz_overrideMethod (c$, "isPyrimidine", 
function () {
return this.$isPyrimidine || !this.$isPurine && this.isPyrimidineByID ();
});
Clazz_defineMethod (c$, "isGuanine", 
function () {
return JM.Monomer.have (this.offsets, 17);
});
Clazz_overrideMethod (c$, "getProteinStructureType", 
function () {
return (this.hasRnaO2Prime ? J.c.STR.RNA : J.c.STR.DNA);
});
Clazz_defineMethod (c$, "getP", 
function () {
return this.getAtomFromOffsetIndex (0);
});
Clazz_defineMethod (c$, "getC1P", 
function () {
return this.getAtomFromOffsetIndex (25);
});
Clazz_defineMethod (c$, "getC2", 
function () {
return this.getAtomFromOffsetIndex (5);
});
Clazz_defineMethod (c$, "getC5", 
function () {
return this.getAtomFromOffsetIndex (3);
});
Clazz_defineMethod (c$, "getC6", 
function () {
return this.getAtomFromOffsetIndex (1);
});
Clazz_defineMethod (c$, "getC8", 
function () {
return this.getAtomFromOffsetIndex (10);
});
Clazz_defineMethod (c$, "getC4P", 
function () {
return this.getAtomFromOffsetIndex (27);
});
Clazz_defineMethod (c$, "getN1", 
function () {
return this.getAtomFromOffsetIndex (4);
});
Clazz_defineMethod (c$, "getN3", 
function () {
return this.getAtomFromOffsetIndex (6);
});
Clazz_defineMethod (c$, "getN2", 
function () {
return this.getAtomFromOffsetIndex (17);
});
Clazz_defineMethod (c$, "getN4", 
function () {
return this.getAtomFromOffsetIndex (14);
});
Clazz_defineMethod (c$, "getN6", 
function () {
return this.getAtomFromOffsetIndex (16);
});
Clazz_defineMethod (c$, "getO2", 
function () {
return this.getAtomFromOffsetIndex (8);
});
Clazz_defineMethod (c$, "getO4", 
function () {
return this.getAtomFromOffsetIndex (12);
});
Clazz_defineMethod (c$, "getO6", 
function () {
return this.getAtomFromOffsetIndex (13);
});
Clazz_overrideMethod (c$, "getTerminatorAtom", 
function () {
return this.getAtomFromOffsetIndex (JM.Monomer.have (this.offsets, 20) ? 20 : 21);
});
Clazz_defineMethod (c$, "getBaseRing6Points", 
function (pts) {
this.getPoints (JM.NucleicMonomer.ring6OffsetIndexes, pts);
}, "~A");
Clazz_defineMethod (c$, "getPoints", 
 function (a, pts) {
for (var i = a.length; --i >= 0; ) pts[i] = this.getAtomFromOffsetIndex (a[i]);

}, "~A,~A");
Clazz_defineMethod (c$, "maybeGetBaseRing5Points", 
function (pts) {
if (this.$isPurine) this.getPoints (JM.NucleicMonomer.ring5OffsetIndexes, pts);
return this.$isPurine;
}, "~A");
Clazz_defineMethod (c$, "getRiboseRing5Points", 
function (pts) {
this.getPoints (JM.NucleicMonomer.riboseOffsetIndexes, pts);
}, "~A");
Clazz_overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var myPhosphorusAtom = this.getAtomFromOffsetIndex (15);
if (myPhosphorusAtom == null) return false;
return ((possiblyPreviousMonomer).getAtomFromOffsetIndex (21).isBonded (myPhosphorusAtom) || this.isCA2 (possiblyPreviousMonomer));
}, "JM.Monomer");
Clazz_overrideMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var lead = this.getLeadAtom ();
var o5prime = this.getAtomFromOffsetIndex (19);
var c3prime = this.getAtomFromOffsetIndex (22);
var mar = (Clazz_doubleToInt (madBegin / 2));
if (mar < 1900) mar = 1900;
var radius = Clazz_floatToInt (this.scaleToScreen (lead.sZ, mar));
if (radius < 4) radius = 4;
if (this.isCursorOnTopOf (lead, x, y, radius, competitor) || this.isCursorOnTopOf (o5prime, x, y, radius, competitor) || this.isCursorOnTopOf (c3prime, x, y, radius, competitor)) closest[0] = lead;
}, "~N,~N,~A,~N,~N");
Clazz_defineMethod (c$, "setRingsVisible", 
function (isVisible) {
for (var i = 6; --i >= 0; ) this.getAtomFromOffsetIndex (JM.NucleicMonomer.ring6OffsetIndexes[i]).setShapeVisibility (32768, isVisible);

if (this.$isPurine) for (var i = 4; --i >= 1; ) this.getAtomFromOffsetIndex (JM.NucleicMonomer.ring5OffsetIndexes[i]).setShapeVisibility (32768, isVisible);

}, "~B");
Clazz_defineMethod (c$, "setRingsClickable", 
function () {
for (var i = 6; --i >= 0; ) this.getAtomFromOffsetIndex (JM.NucleicMonomer.ring6OffsetIndexes[i]).setClickable (32768);

if (this.$isPurine) for (var i = 4; --i >= 1; ) this.getAtomFromOffsetIndex (JM.NucleicMonomer.ring5OffsetIndexes[i]).setClickable (32768);

});
Clazz_defineMethod (c$, "getN0", 
function () {
return (this.getAtomFromOffsetIndex (this.$isPurine ? 11 : 4));
});
Clazz_overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz_overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
switch (qType) {
case 'x':
case 'a':
case 'b':
case 'p':
return this.getP ();
case 'c':
if (this.baseCenter == null) {
var n = 0;
this.baseCenter =  new JU.P3 ();
for (var i = 0; i < JM.NucleicMonomer.heavyAtomIndexes.length; i++) {
var a = this.getAtomFromOffsetIndex (JM.NucleicMonomer.heavyAtomIndexes[i]);
if (a == null) continue;
this.baseCenter.add (a);
n++;
}
this.baseCenter.scale (1 / n);
}return this.baseCenter;
case 'n':
default:
return this.getN0 ();
}
}, "~S");
Clazz_overrideMethod (c$, "getQuaternion", 
function (qType) {
if (this.bioPolymer == null) return null;
var ptA = null;
var ptB = null;
var ptNorP;
var yBased = false;
var reverseY = false;
switch (qType) {
case 'a':
ptNorP = this.getP ();
if (this.monomerIndex == 0 || ptNorP == null) return null;
yBased = true;
ptA = (this.bioPolymer.monomers[this.monomerIndex - 1]).getC4P ();
ptB = this.getC4P ();
break;
case 'x':
ptNorP = this.getP ();
if (this.monomerIndex == this.bioPolymer.monomerCount - 1 || ptNorP == null) return null;
ptA = (this.bioPolymer.monomers[this.monomerIndex + 1]).getP ();
ptB = this.getC4P ();
break;
case 'b':
return this.getQuaternionP ();
case 'c':
case 'n':
ptNorP = this.getN0 ();
if (ptNorP == null) return null;
yBased = true;
reverseY = true;
ptA = this.getAtomFromOffsetIndex (5);
ptB = this.getAtomFromOffsetIndex (25);
break;
case 'p':
ptNorP = this.getP ();
if (ptNorP == null) return null;
var p1 = this.getAtomFromOffsetIndex (23);
var p2 = this.getAtomFromOffsetIndex (24);
var bonds = ptNorP.bonds;
if (bonds == null) return null;
var g = ptNorP.group;
for (var i = 0; i < bonds.length; i++) {
var atom = bonds[i].getOtherAtom (ptNorP);
if (p1 != null && atom.i == p1.i) continue;
if (p2 != null && atom.i == p2.i) continue;
if (atom.group === g) ptB = atom;
 else ptA = atom;
}
break;
case 'q':
return null;
default:
ptNorP = this.getN0 ();
if (ptNorP == null) return null;
if (this.$isPurine) {
ptA = this.getAtomFromOffsetIndex (5);
ptB = this.getAtomFromOffsetIndex (9);
} else {
ptA = this.getAtomFromOffsetIndex (6);
ptB = this.getAtomFromOffsetIndex (1);
}break;
}
if (ptA == null || ptB == null) return null;
var vA = JU.V3.newVsub (ptA, ptNorP);
var vB = JU.V3.newVsub (ptB, ptNorP);
if (reverseY) vB.scale (-1);
return JU.Quat.getQuaternionFrameV (vA, vB, null, yBased);
}, "~S");
Clazz_overrideMethod (c$, "isCrossLinked", 
function (g) {
if (!(Clazz_instanceOf (g, JM.NucleicMonomer)) || this.$isPurine == g.isPurine ()) return false;
var otherNucleotide = (this.$isPurine ? g : this);
var myNucleotide = (this.$isPurine ? this : g);
var myN1 = myNucleotide.getN1 ();
var otherN3 = otherNucleotide.getN3 ();
return (myN1.isBonded (otherN3));
}, "JM.Group");
Clazz_overrideMethod (c$, "getCrossLinkVector", 
function (vReturn, crosslinkCovalent, crosslinkHBond) {
if (!crosslinkHBond) return false;
var N = (this.$isPurine ? this.getN1 () : this.getN3 ());
var bonds = N.bonds;
if (bonds == null) return false;
for (var i = 0; i < bonds.length; i++) {
if (bonds[i].isHydrogen ()) {
var N2 = bonds[i].getOtherAtom (N);
var g = N2.group;
if (!(Clazz_instanceOf (g, JM.NucleicMonomer))) continue;
var m = g;
if ((this.$isPurine ? m.getN3 () : m.getN1 ()) === N2) {
if (vReturn == null) return true;
vReturn.addLast (Integer.$valueOf (N.i));
vReturn.addLast (Integer.$valueOf (N2.i));
vReturn.addLast (Integer.$valueOf (m.leadAtomIndex));
}}}
return vReturn != null && vReturn.size () > 0;
}, "JU.Lst,~B,~B");
Clazz_defineMethod (c$, "getEdgePoints", 
function (pts) {
pts[0] = this.getLeadAtom ();
pts[1] = this.getC4P ();
pts[2] = pts[5] = this.getC1P ();
switch (this.getGroup1 ()) {
case 'C':
pts[3] = this.getO2 ();
pts[4] = this.getN4 ();
return true;
case 'A':
pts[3] = this.getC2 ();
pts[4] = this.getN6 ();
return true;
case 'G':
case 'I':
pts[3] = this.getC2 ();
pts[4] = this.getO6 ();
return true;
case 'T':
case 'U':
pts[3] = this.getO2 ();
pts[4] = this.getO4 ();
return true;
default:
return false;
}
}, "~A");
Clazz_defineMethod (c$, "addBasePair", 
function (bp) {
if (this.bps == null) this.bps =  new JU.Lst ();
this.bps.addLast (bp);
}, "JM.BasePair");
Clazz_defineMethod (c$, "setGroup1", 
function (g) {
if (this.group1 == '\0') this.group1 = g;
}, "~S");
Clazz_defineMethod (c$, "getBasePairs", 
function () {
if (this.bioPolymer != null && !(this.bioPolymer).isDssrSet) this.bioPolymer.model.ms.vwr.getAnnotationParser (true).getBasePairs (this.bioPolymer.model.ms.vwr, this.bioPolymer.model.modelIndex);
return this.bps;
});
Clazz_overrideMethod (c$, "getGroup1b", 
function () {
var g3 = JM.Group.group3Names[this.groupID];
var g1 = (JM.NucleicPolymer.htGroup1 == null ? null : JM.NucleicPolymer.htGroup1.get (g3));
return (g1 == null ? Character.toLowerCase (g3.charAt (g3.length - 1)) : g1.charAt (0));
});
Clazz_defineMethod (c$, "getDSSRFrame", 
function (vwr) {
if (this.dssrFrame != null) return this.dssrFrame;
if (this.dssrNT != null) return this.dssrFrame = vwr.getAnnotationParser (true).getDSSRFrame (this.dssrNT);
var oxyz = this.dssrFrame =  new Array (4);
for (var i = 4; --i >= 0; ) oxyz[i] =  new JU.P3 ();

if (this.isPurine ()) {
var v85 = JU.P3.newP (this.getC5 ());
v85.sub (this.getC8 ());
v85.normalize ();
oxyz[2].setT (v85);
oxyz[2].scale (-1);
oxyz[0].scaleAdd2 (4.9, v85, this.getC8 ());
var v89 = JU.P3.newP (this.getN0 ());
v89.sub (this.getC8 ());
oxyz[3].cross (v89, v85);
oxyz[3].normalize ();
} else {
var v61 = JU.P3.newP (this.getN0 ());
v61.sub (this.getC6 ());
var v65 = JU.P3.newP (this.getC5 ());
v65.sub (this.getC6 ());
oxyz[3].cross (v61, v65);
oxyz[3].normalize ();
oxyz[2].setT (v61);
oxyz[2].normalize ();
var aa = JU.A4.new4 (oxyz[3].x, oxyz[3].y, oxyz[3].z, (1.1623892818282233));
var m3 =  new JU.M3 ();
m3.setAA (aa);
m3.rotate (oxyz[2]);
oxyz[0].scaleAdd2 (5.1, oxyz[2], this.getC6 ());
oxyz[2].scale (-1);
}oxyz[1].cross (oxyz[2], oxyz[3]);
return this.dssrFrame;
}, "JV.Viewer");
Clazz_defineStatics (c$,
"C6", 1,
"O2Pr", 2,
"C5", 3,
"N1", 4,
"C2", 5,
"N3", 6,
"C4", 7,
"O2", 8,
"N7", 9,
"C8", 10,
"N9", 11,
"O4", 12,
"O6", 13,
"N4", 14,
"NP", 15,
"N6", 16,
"N2", 17,
"H5T", 18,
"O5P", 19,
"H3T", 20,
"O3P", 21,
"C3P", 22,
"O1P", 23,
"O2P", 24,
"C1P", 25,
"C2P", 26,
"C4P", 27,
"O4P", 28,
"C5P", 29,
"interestingNucleicAtomIDs",  Clazz_newByteArray (-1, [-14, 37, -80, 36, 32, 33, 34, 35, -39, -40, -41, -42, -48, -47, -43, -14, -45, -44, -73, -7, -89, 10, 9, -75, -77, -13, -12, -9, -79, -8]),
"ring6OffsetIndexes",  Clazz_newByteArray (-1, [3, 1, 4, 5, 6, 7]),
"ring5OffsetIndexes",  Clazz_newByteArray (-1, [3, 9, 10, 11, 7]),
"riboseOffsetIndexes",  Clazz_newByteArray (-1, [25, 26, 22, 27, 28, 21, 29, 19, 0]),
"heavyAtomIndexes",  Clazz_newByteArray (-1, [3, 1, 4, 5, 6, 7, 11, 10, 9, 16, 14, 8, 12, 17, 13]));
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.PhosphorusPolymer"], "JM.NucleicPolymer", ["JU.Measure", "$.P4", "$.V3", "JM.HBond"], function () {
c$ = Clazz_decorateAsClass (function () {
this.isDssrSet = false;
Clazz_instantialize (this, arguments);
}, JM, "NucleicPolymer", JM.PhosphorusPolymer);
Clazz_makeConstructor (c$, 
function (monomers) {
Clazz_superConstructor (this, JM.NucleicPolymer, [monomers]);
this.type = 2;
this.hasWingPoints = true;
}, "~A");
Clazz_defineMethod (c$, "getNucleicPhosphorusAtom", 
function (monomerIndex) {
return this.monomers[monomerIndex].getLeadAtom ();
}, "~N");
Clazz_overrideMethod (c$, "calcEtaThetaAngles", 
function () {
var eta = NaN;
for (var i = 0; i < this.monomerCount - 2; ++i) {
var m1 = this.monomers[i];
var m2 = this.monomers[i + 1];
var p1 = m1.getP ();
var c41 = m1.getC4P ();
var p2 = m2.getP ();
var c42 = m2.getC4P ();
if (i > 0) {
var m0 = this.monomers[i - 1];
var c40 = m0.getC4P ();
eta = JU.Measure.computeTorsion (c40, p1, c41, p2, true);
}var theta = JU.Measure.computeTorsion (p1, c41, p2, c42, true);
if (eta < 0) eta += 360;
if (theta < 0) theta += 360;
m1.setGroupParameter (1111490565, eta);
m1.setGroupParameter (1111490576, theta);
}
return true;
});
Clazz_overrideMethod (c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vAtoms, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
var other = polymer;
var vNorm =  new JU.V3 ();
var vAB =  new JU.V3 ();
for (var i = this.monomerCount; --i >= 0; ) {
var myNucleotide = this.monomers[i];
if (!myNucleotide.isPurine ()) continue;
var myN3 = myNucleotide.getN3 ();
var isInA = bsA.get (myN3.i);
if (!isInA && !bsB.get (myN3.i)) continue;
var myN1 = myNucleotide.getN1 ();
var myN9 = myNucleotide.getN0 ();
var plane = JU.Measure.getPlaneThroughPoints (myN3, myN1, myN9, vNorm, vAB,  new JU.P4 ());
var bestN3 = null;
var minDist2 = 25;
var bestNucleotide = null;
for (var j = other.monomerCount; --j >= 0; ) {
var otherNucleotide = other.monomers[j];
if (!otherNucleotide.$isPyrimidine) continue;
var otherN3 = otherNucleotide.getN3 ();
if (isInA ? !bsB.get (otherN3.i) : !bsA.get (otherN3.i)) continue;
var otherN1 = otherNucleotide.getN0 ();
var dist2 = myN1.distanceSquared (otherN3);
if (dist2 < minDist2 && myN9.distanceSquared (otherN1) > 50 && Math.abs (JU.Measure.distanceToPlane (plane, otherN3)) < 1) {
bestNucleotide = otherNucleotide;
bestN3 = otherN3;
minDist2 = dist2;
}}
var n = 0;
if (bestN3 != null) {
n += JM.NucleicPolymer.addHydrogenBond (vAtoms, myN1, bestN3);
if (n >= nMaxPerResidue) continue;
if (myNucleotide.isGuanine ()) {
n += JM.NucleicPolymer.addHydrogenBond (vAtoms, myNucleotide.getN2 (), bestNucleotide.getO2 ());
if (n >= nMaxPerResidue) continue;
n += JM.NucleicPolymer.addHydrogenBond (vAtoms, myNucleotide.getO6 (), bestNucleotide.getN4 ());
if (n >= nMaxPerResidue) continue;
} else {
n += JM.NucleicPolymer.addHydrogenBond (vAtoms, myNucleotide.getN6 (), bestNucleotide.getO4 ());
}}}
}, "JM.BioPolymer,JU.BS,JU.BS,JU.Lst,~N,~A,~B,~B");
c$.addHydrogenBond = Clazz_defineMethod (c$, "addHydrogenBond", 
function (vAtoms, atom1, atom2) {
if (atom1 == null || atom2 == null) return 0;
vAtoms.addLast ( new JM.HBond (atom1, atom2, 18432, 1, 0, 0));
return 1;
}, "JU.Lst,JM.Atom,JM.Atom");
Clazz_defineStatics (c$,
"htGroup1", null);
});
Clazz_declarePackage ("JM");
c$ = Clazz_decorateAsClass (function () {
this.info = null;
this.g1 = null;
this.g2 = null;
Clazz_instantialize (this, arguments);
}, JM, "BasePair");
Clazz_makeConstructor (c$, 
 function () {
});
c$.add = Clazz_defineMethod (c$, "add", 
function (info, g1, g2) {
if (g1 == null || g2 == null) return null;
var bp =  new JM.BasePair ();
bp.info = info;
(bp.g1 = g1).addBasePair (bp);
(bp.g2 = g2).addBasePair (bp);
return bp;
}, "java.util.Map,JM.NucleicMonomer,JM.NucleicMonomer");
Clazz_defineMethod (c$, "getPartnerAtom", 
function (g) {
return (g === this.g1 ? this.g2 : this.g1).getLeadAtom ().i;
}, "JM.NucleicMonomer");
Clazz_defineMethod (c$, "toString", 
function () {
return this.info.toString ();
});
Clazz_declarePackage ("JM");
Clazz_load (["JM.BioPolymer"], "JM.PhosphorusPolymer", null, function () {
c$ = Clazz_declareType (JM, "PhosphorusPolymer", JM.BioPolymer);
Clazz_makeConstructor (c$, 
function (monomers) {
Clazz_superConstructor (this, JM.PhosphorusPolymer, []);
this.set (monomers);
this.hasStructure = true;
}, "~A");
});
Clazz_declarePackage ("J.dssx");
Clazz_load (null, "J.dssx.Bridge", ["java.lang.Boolean", "JU.Escape"], function () {
c$ = Clazz_decorateAsClass (function () {
this.a = null;
this.b = null;
this.ladder = null;
this.isAntiparallel = false;
Clazz_instantialize (this, arguments);
}, J.dssx, "Bridge");
Clazz_makeConstructor (c$, 
function (a, b, htLadders) {
this.a = a;
this.b = b;
this.ladder =  Clazz_newIntArray (2, 2, 0);
this.ladder[0][0] = this.ladder[0][1] = Math.min (a.i, b.i);
this.ladder[1][0] = this.ladder[1][1] = Math.max (a.i, b.i);
this.addLadder (htLadders);
}, "JM.Atom,JM.Atom,java.util.Map");
Clazz_defineMethod (c$, "addBridge", 
function (bridge, htLadders) {
if (bridge.isAntiparallel != this.isAntiparallel || !this.canAdd (bridge) || !bridge.canAdd (this)) return false;
this.extendLadder (bridge.ladder[0][0], bridge.ladder[1][0]);
this.extendLadder (bridge.ladder[0][1], bridge.ladder[1][1]);
bridge.ladder = this.ladder;
if (bridge.ladder !== this.ladder) {
htLadders.remove (bridge.ladder);
this.addLadder (htLadders);
}return true;
}, "J.dssx.Bridge,java.util.Map");
Clazz_defineMethod (c$, "addLadder", 
 function (htLadders) {
htLadders.put (this.ladder, (this.isAntiparallel ? Boolean.TRUE : Boolean.FALSE));
}, "java.util.Map");
Clazz_defineMethod (c$, "canAdd", 
 function (bridge) {
var index1 = bridge.a.i;
var index2 = bridge.b.i;
return (this.isAntiparallel ? (index1 >= this.ladder[0][1] && index2 <= this.ladder[1][0] || index1 <= this.ladder[0][0] && index2 >= this.ladder[1][1]) : (index1 <= this.ladder[0][0] && index2 <= this.ladder[1][0] || index1 >= this.ladder[0][1] && index2 >= this.ladder[1][1]));
}, "J.dssx.Bridge");
Clazz_defineMethod (c$, "extendLadder", 
 function (index1, index2) {
if (this.ladder[0][0] > index1) this.ladder[0][0] = index1;
if (this.ladder[0][1] < index1) this.ladder[0][1] = index1;
if (this.ladder[1][0] > index2) this.ladder[1][0] = index2;
if (this.ladder[1][1] < index2) this.ladder[1][1] = index2;
}, "~N,~N");
Clazz_overrideMethod (c$, "toString", 
function () {
return (this.isAntiparallel ? "a " : "p ") + this.a + " - " + this.b + "\t" + JU.Escape.e (this.ladder);
});
});
Clazz_declarePackage ("J.dssx");
Clazz_load (null, "J.dssx.DSSP", ["java.lang.Boolean", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.PT", "$.SB", "J.c.STR", "J.dssx.Bridge", "J.i18n.GT", "JM.HBond", "JM.AminoPolymer", "JU.Escape", "$.Logger", "JV.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bioPolymers = null;
this.vHBonds = null;
this.done = null;
this.doReport = false;
this.dsspIgnoreHydrogens = false;
this.setStructure = false;
this.labels = null;
this.bsBad = null;
this.bioPolymerCount = 0;
this.htBridges = null;
this.htLadders = null;
this.bridgesA = null;
this.bridgesP = null;
this.isDSSP2 = false;
this.sheetOffsets = null;
Clazz_instantialize (this, arguments);
}, J.dssx, "DSSP");
Clazz_prepareFields (c$, function () {
this.sheetOffsets =  Clazz_newArray (-1, [ Clazz_newIntArray (-1, [0, -1, 1, 0, 1, 0, 0, -1]),  Clazz_newIntArray (-1, [0, 0, 0, 0, 1, -1, 1, -1])]);
});
Clazz_makeConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "calculateDssp", 
function (objBioPolymers, bioPolymerCount, objVHBonds, doReport, dsspIgnoreHydrogens, setStructure, version) {
this.bioPolymers = objBioPolymers;
this.bioPolymerCount = bioPolymerCount;
this.vHBonds = objVHBonds;
this.doReport = doReport;
this.dsspIgnoreHydrogens = dsspIgnoreHydrogens;
this.setStructure = setStructure;
this.isDSSP2 = (version > 1);
var bsAmino =  new JU.BS ();
for (var i = 0; i < bioPolymerCount; i++) if (Clazz_instanceOf (this.bioPolymers[i], JM.AminoPolymer)) bsAmino.set (i);

if (bsAmino.isEmpty ()) return "";
var m = this.bioPolymers[0].model;
var sb =  new JU.SB ();
sb.append ("Jmol ").append (JV.Viewer.getJmolVersion ()).append (" DSSP analysis for model ").append (m.ms.getModelNumberDotted (m.modelIndex)).append (" - ").append (m.ms.getModelTitle (m.modelIndex)).append ("\n");
if (m.modelIndex == 0) sb.append ("\nW. Kabsch and C. Sander, Biopolymers, vol 22, 1983, pp 2577-2637\n\nWe thank Wolfgang Kabsch and Chris Sander for writing the DSSP software,\nand we thank the CMBI for maintaining it to the extent that it was easy to\nre-engineer in Java for our purposes. \n\nSecond generation DSSP 2.0 is ").append (this.isDSSP2 ? "" : "NOT ").append ("used in this analysis. See Int. J. Mol. Sci. 2014, 15, 7841-7864; doi:10.3390/ijms15057841.\n");
if (setStructure && m.modelIndex == 0) sb.append ("\nAll bioshapes have been deleted and must be regenerated.\n");
if (m.altLocCount > 0) sb.append ("\nNote: This model contains alternative locations. Use  'CONFIGURATION 1' to be consistent with CMBI DSSP.\n");
this.labels =  Clazz_newCharArray (bioPolymerCount, '\0');
this.done =  new Array (bioPolymerCount);
this.bsBad =  new JU.BS ();
var haveWarned = false;
for (var i = bsAmino.nextSetBit (0); i >= 0; i = bsAmino.nextSetBit (i + 1)) {
var ap = this.bioPolymers[i];
if (!haveWarned && (ap.monomers[0]).getExplicitNH () != null) {
if (dsspIgnoreHydrogens) sb.append (J.i18n.GT.o (J.i18n.GT.$ ("NOTE: Backbone amide hydrogen positions are present and will be ignored. Their positions will be approximated, as in standard DSSP analysis.\nUse {0} to not use this approximation.\n\n"), "SET dsspCalculateHydrogenAlways FALSE"));
 else sb.append (J.i18n.GT.o (J.i18n.GT.$ ("NOTE: Backbone amide hydrogen positions are present and will be used. Results may differ significantly from standard DSSP analysis.\nUse {0} to ignore these hydrogen positions.\n\n"), "SET dsspCalculateHydrogenAlways TRUE"));
haveWarned = true;
}ap.recalculateLeadMidpointsAndWingVectors ();
var n = ap.monomerCount;
this.labels[i] =  Clazz_newCharArray (n, '\0');
this.done[i] =  new JU.BS ();
for (var j = 0; j < n; j++) if ((ap.monomers[j]).getCarbonylOxygenAtom () == null) this.bsBad.set (ap.monomers[j].leadAtomIndex);

}
var min = this.getDualHydrogenBondArray ();
this.bridgesA =  new JU.Lst ();
this.bridgesP =  new JU.Lst ();
this.htBridges =  new java.util.Hashtable ();
this.htLadders =  new java.util.Hashtable ();
this.getBridges (min);
this.getSheetStructures ();
var reports =  new Array (bioPolymerCount);
for (var i = bsAmino.nextSetBit (0); i >= 0; i = bsAmino.nextSetBit (i + 1)) if (min[i] != null) reports[i] = this.findHelixes (i, min[i]);

if (doReport) {
var sbSummary =  new JU.SB ();
sb.append ("\n------------------------------\n");
for (var i = bsAmino.nextSetBit (0); i >= 0; i = bsAmino.nextSetBit (i + 1)) if (this.labels[i] != null) {
var ap = this.bioPolymers[i];
sbSummary.append (this.dumpSummary (ap, this.labels[i]));
sb.append (reports[i]).append (this.dumpTags (ap, "$.1: " + String.valueOf (this.labels[i]), this.bsBad, 2));
}
if (this.bsBad.nextSetBit (0) >= 0) sb.append ("\nNOTE: '!' indicates a residue that is missing a backbone carbonyl oxygen atom.\n");
sb.append ("\n").append ("SUMMARY:" + sbSummary);
}return sb.toString ();
}, "~A,~N,~O,~B,~B,~B,~N");
Clazz_defineMethod (c$, "getDualHydrogenBondArray", 
 function () {
var min = JU.AU.newInt4 (this.bioPolymerCount);
for (var i = 0; i < this.bioPolymerCount; i++) {
if (!(Clazz_instanceOf (this.bioPolymers[i], JM.AminoPolymer))) continue;
var n = this.bioPolymers[i].monomerCount;
min[i] =  Clazz_newIntArray (n, 2, 3, 0);
for (var j = 0; j < n; ++j) {
min[i][j][0][1] = min[i][j][1][1] = -2147483648;
min[i][j][0][2] = min[i][j][1][2] = 0;
}
}
for (var i = 0; i < this.bioPolymerCount; i++) if (min[i] != null) for (var j = 0; j < this.bioPolymerCount; j++) if (min[j] != null) this.bioPolymers[i].calcRasmolHydrogenBonds (this.bioPolymers[j], null, null, null, 2, min[i], false, this.dsspIgnoreHydrogens);


return min;
});
Clazz_defineMethod (c$, "getBridges", 
 function (min) {
var atoms = this.bioPolymers[0].model.ms.at;
var bridge = null;
var htTemp =  new java.util.Hashtable ();
for (var p1 = 0; p1 < min.length; p1++) if (Clazz_instanceOf (this.bioPolymers[p1], JM.AminoPolymer)) {
var ap1 = (this.bioPolymers[p1]);
var n = min[p1].length - 1;
for (var a = 1; a < n; a++) {
var ia = ap1.monomers[a].leadAtomIndex;
if (this.bsBad.get (ia)) continue;
for (var p2 = p1; p2 < min.length; p2++) if (Clazz_instanceOf (this.bioPolymers[p2], JM.AminoPolymer)) for (var b = (p1 == p2 ? a + 3 : 1); b < min[p2].length - 1; b++) {
var ap2 = this.bioPolymers[p2];
var ib = ap2.monomers[b].leadAtomIndex;
if (this.bsBad.get (ib)) continue;
if ((bridge = this.getBridge (min, p1, a, p2, b, this.bridgesP, atoms[ia], atoms[ib], ap1, ap2, htTemp, false)) != null) {
} else if ((bridge = this.getBridge (min, p1, a, p2, b, this.bridgesA, atoms[ia], atoms[ib], ap1, ap2, htTemp, true)) != null) {
bridge.isAntiparallel = true;
} else {
continue;
}if (JU.Logger.debugging) JU.Logger.debug ("Bridge found " + bridge);
this.done[p1].set (a);
this.done[p2].set (b);
this.htBridges.put (ia + "-" + ib, bridge);
}

}
}
}, "~A");
Clazz_defineMethod (c$, "getBridge", 
 function (min, p1, a, p2, b, bridges, atom1, atom2, ap1, ap2, htTemp, isAntiparallel) {
var b1 = null;
var b2 = null;
var ipt = 0;
var offsets = (isAntiparallel ? this.sheetOffsets[1] : this.sheetOffsets[0]);
if ((b1 = this.isHbonded (a + offsets[0], b + offsets[1], p1, p2, min)) != null && (b2 = this.isHbonded (b + offsets[2], a + offsets[3], p2, p1, min)) != null || (b1 = this.isHbonded (a + offsets[ipt = 4], b + offsets[5], p1, p2, min)) != null && (b2 = this.isHbonded (b + offsets[6], a + offsets[7], p2, p1, min)) != null) {
var bridge =  new J.dssx.Bridge (atom1, atom2, this.htLadders);
bridges.addLast (bridge);
if (this.vHBonds != null) {
var type = (isAntiparallel ? 14336 : 6144);
this.addHbond (ap1.monomers[a + offsets[ipt]], ap2.monomers[b + offsets[++ipt]], b1[2], type, htTemp);
this.addHbond (ap2.monomers[b + offsets[++ipt]], ap1.monomers[a + offsets[++ipt]], b2[2], type, htTemp);
}return bridge;
}return null;
}, "~A,~N,~N,~N,~N,JU.Lst,JM.Atom,JM.Atom,JM.AminoPolymer,JM.AminoPolymer,java.util.Map,~B");
Clazz_defineMethod (c$, "addHbond", 
 function (donor, acceptor, iEnergy, type, htTemp) {
var nitrogen = (donor).getNitrogenAtom ();
var oxygen = (acceptor).getCarbonylOxygenAtom ();
if (htTemp != null) {
var key = nitrogen.i + " " + oxygen.i;
if (htTemp.containsKey (key)) return;
htTemp.put (key, Boolean.TRUE);
}this.vHBonds.addLast ( new JM.HBond (nitrogen, oxygen, type, 1, 0, iEnergy / 1000));
}, "JM.Monomer,JM.Monomer,~N,~N,java.util.Map");
Clazz_defineMethod (c$, "getSheetStructures", 
 function () {
if (this.bridgesA.size () == 0 && this.bridgesP.size () == 0) return;
this.createLadders (this.bridgesA, true);
this.createLadders (this.bridgesP, false);
var bsEEE =  new JU.BS ();
var bsB =  new JU.BS ();
for (var ladder, $ladder = this.htLadders.keySet ().iterator (); $ladder.hasNext () && ((ladder = $ladder.next ()) || true);) {
if (ladder[0][0] == ladder[0][1] && ladder[1][0] == ladder[1][1]) {
bsB.set (ladder[0][0]);
bsB.set (ladder[1][0]);
} else {
bsEEE.setBits (ladder[0][0], ladder[0][1] + 1);
bsEEE.setBits (ladder[1][0], ladder[1][1] + 1);
}}
var bsSheet =  new JU.BS ();
var bsBridge =  new JU.BS ();
for (var i = this.bioPolymers.length; --i >= 0; ) {
if (!(Clazz_instanceOf (this.bioPolymers[i], JM.AminoPolymer))) continue;
bsSheet.clearAll ();
bsBridge.clearAll ();
var ap = this.bioPolymers[i];
for (var iStart = 0; iStart < ap.monomerCount; ) {
var index = ap.monomers[iStart].leadAtomIndex;
if (bsEEE.get (index)) {
var iEnd = iStart + 1;
while (iEnd < ap.monomerCount && bsEEE.get (ap.monomers[iEnd].leadAtomIndex)) iEnd++;

bsSheet.setBits (iStart, iEnd);
iStart = iEnd;
} else {
if (bsB.get (index)) bsBridge.set (iStart);
++iStart;
}}
if (this.doReport) {
this.setTag (this.labels[i], bsBridge, 'B');
this.setTag (this.labels[i], bsSheet, 'E');
}if (this.setStructure) {
ap.setStructureBS (0, 3, J.c.STR.SHEET, bsSheet, false);
}this.done[i].or (bsSheet);
this.done[i].or (bsBridge);
}
});
Clazz_defineMethod (c$, "createLadders", 
 function (bridges, isAntiparallel) {
var dir = (isAntiparallel ? -1 : 1);
var n = bridges.size ();
for (var i = 0; i < n; i++) this.checkBridge (bridges.get (i), isAntiparallel, 1, dir);

for (var i = 0; i < n; i++) this.checkBulge (bridges.get (i), isAntiparallel, 1);

}, "JU.Lst,~B");
Clazz_defineMethod (c$, "checkBridge", 
 function (bridge, isAntiparallel, n1, n2) {
var b = this.htBridges.get (bridge.a.getOffsetResidueAtom ("\0", n1) + "-" + bridge.b.getOffsetResidueAtom ("\0", n2));
return (b != null && bridge.addBridge (b, this.htLadders));
}, "J.dssx.Bridge,~B,~N,~N");
Clazz_defineMethod (c$, "checkBulge", 
 function (bridge, isAntiparallel, dir) {
var dir1 = (isAntiparallel ? -1 : 1);
for (var i = 0; i < 3; i++) for (var j = (i == 0 ? 1 : 0); j < 6; j++) {
this.checkBridge (bridge, isAntiparallel, i * dir, j * dir1);
if (j > i) this.checkBridge (bridge, isAntiparallel, j * dir, i * dir1);
}

}, "J.dssx.Bridge,~B,~N");
Clazz_defineMethod (c$, "dumpSummary", 
 function (ap, labels) {
var a = ap.monomers[0].getLeadAtom ();
var id = a.getChainID ();
var prefix = (id == 0 ? "" : a.getChainIDStr () + ":");
var sb =  new JU.SB ();
var lastChar = '\u0000';
var insCode1 = '\u0000';
var insCode2 = '\u0000';
var firstResno = -1;
var lastResno = -1;
var n = ap.monomerCount;
var m = ap.monomers;
for (var i = 0; i <= n; i++) {
if (i == n || labels[i] != lastChar) {
if (lastChar != '\0') sb.appendC ('\n').appendC (lastChar).append (" : ").append (prefix).appendI (firstResno).append (insCode1 == '\0' ? "" : String.valueOf (insCode1)).append ("_").append (prefix).appendI (lastResno).append (insCode2 == '\0' ? "" : String.valueOf (insCode2));
if (i == n) break;
lastChar = labels[i];
firstResno = m[i].getResno ();
insCode1 = m[i].getInsertionCode ();
}lastResno = m[i].getResno ();
insCode2 = m[i].getInsertionCode ();
}
return sb.toString ();
}, "JM.AminoPolymer,~A");
Clazz_defineMethod (c$, "dumpTags", 
 function (ap, lines, bsBad, mode) {
var prefix = ap.monomers[0].getLeadAtom ().getChainID () + "." + (ap.bioPolymerIndexInModel + 1);
lines = JU.PT.rep (lines, "$", prefix);
var iFirst = ap.monomers[0].getResno ();
var pre = "\n" + prefix;
var sb =  new JU.SB ();
var sb0 =  new JU.SB ().append (pre + ".8: ");
var sb1 =  new JU.SB ().append (pre + ".7: ");
var sb2 =  new JU.SB ().append (pre + ".6: ");
var sb3 =  new JU.SB ().append (pre + ".0: ");
var i = iFirst;
var n = ap.monomerCount;
for (var ii = 0; ii < n; ii++) {
i = ap.monomers[ii].getResno ();
sb0.append (i % 100 == 0 ? "" + ((Clazz_doubleToInt (i / 100)) % 100) : " ");
sb1.append (i % 10 == 0 ? "" + ((Clazz_doubleToInt (i / 10)) % 10) : " ");
sb2.appendI (i % 10);
sb3.appendC (bsBad.get (ap.monomers[ii].leadAtomIndex) ? '!' : ap.monomers[ii].getGroup1 ());
}
if ((mode & 1) == 1) sb.appendSB (sb0).appendSB (sb1).appendSB (sb2);
sb.append ("\n");
sb.append (lines);
if ((mode & 2) == 2) {
sb.appendSB (sb3);
sb.append ("\n\n");
}return sb.toString ().$replace ('\0', '.');
}, "JM.AminoPolymer,~S,JU.BS,~N");
Clazz_defineMethod (c$, "isHbonded", 
 function (indexDonor, indexAcceptor, pDonor, pAcceptor, min) {
if (indexDonor < 0 || indexAcceptor < 0) return null;
var min1 = min[pDonor];
var min2 = min[pAcceptor];
if (indexDonor >= min1.length || indexAcceptor >= min2.length) return null;
return (min1[indexDonor][0][0] == pAcceptor && min1[indexDonor][0][1] == indexAcceptor ? min1[indexDonor][0] : min1[indexDonor][1][0] == pAcceptor && min1[indexDonor][1][1] == indexAcceptor ? min1[indexDonor][1] : null);
}, "~N,~N,~N,~N,~A");
Clazz_defineMethod (c$, "findHelixes", 
 function (iPolymer, min) {
var ap = this.bioPolymers[iPolymer];
if (JU.Logger.debugging) for (var j = 0; j < ap.monomerCount; j++) JU.Logger.debug (iPolymer + "." + ap.monomers[j].getResno () + "\t" + JU.Escape.e (min[j]));

var bsTurn =  new JU.BS ();
var line3;
var line4;
var line5;
if (this.isDSSP2) {
line5 = this.findHelixes2 (0, iPolymer, 5, min, J.c.STR.HELIXPI, 12288, bsTurn, true);
line4 = this.findHelixes2 (2, iPolymer, 4, min, J.c.STR.HELIXALPHA, 10240, bsTurn, false);
line3 = this.findHelixes2 (4, iPolymer, 3, min, J.c.STR.HELIX310, 8192, bsTurn, false);
} else {
line4 = this.findHelixes2 (2, iPolymer, 4, min, J.c.STR.HELIXALPHA, 10240, bsTurn, true);
line3 = this.findHelixes2 (4, iPolymer, 3, min, J.c.STR.HELIX310, 8192, bsTurn, false);
line5 = this.findHelixes2 (0, iPolymer, 5, min, J.c.STR.HELIXPI, 12288, bsTurn, false);
}if (this.setStructure) ap.setStructureBS (0, 6, J.c.STR.TURN, bsTurn, false);
if (this.doReport) {
this.setTag (this.labels[iPolymer], bsTurn, 'T');
return this.dumpTags (ap, "$.5: " + line5 + "\n" + "$.4: " + line4 + "\n" + "$.3: " + line3, this.bsBad, 1);
}return "";
}, "~N,~A");
Clazz_defineMethod (c$, "findHelixes2", 
 function (mmtfType, iPolymer, pitch, min, subtype, type, bsTurn, isFirst) {
var ap = this.bioPolymers[iPolymer];
var bsStart =  new JU.BS ();
var bsNNN =  new JU.BS ();
var bsX =  new JU.BS ();
var bsStop =  new JU.BS ();
var bsHelix =  new JU.BS ();
var bsDone = this.done[iPolymer];
var warning = "";
var n = ap.monomerCount;
for (var i = pitch; i < n; ++i) {
var i0 = i - pitch;
var bpt = 0;
if (min[i][0][0] == iPolymer && min[i][0][1] == i0 || min[i][bpt = 1][0] == iPolymer && min[i][1][1] == i0) {
var ia = ap.monomers[i0].leadAtomIndex;
var ipt = this.bsBad.nextSetBit (ia);
var m = ap.monomers[i];
if (ipt >= ia && ipt <= m.leadAtomIndex) continue;
bsStart.set (i0);
bsNNN.setBits (i0 + 1, i);
bsStop.set (i);
ipt = bsDone.nextSetBit (i0);
var isClear = (ipt < 0 || ipt >= i);
var addH = false;
if (i0 > 0 && bsStart.get (i0 - 1) && (isFirst || isClear)) {
bsHelix.setBits (i0, i);
if (!isClear) warning += "  WARNING! Bridge to helix at " + ap.monomers[ipt];
addH = true;
} else if (isClear || bsDone.nextClearBit (ipt) < i) {
addH = true;
}if (bsStop.get (i0)) bsX.set (i0);
if (addH && this.vHBonds != null) {
this.addHbond (m, ap.monomers[i0], min[i][bpt][2], type, null);
}}}
var taglines;
if (this.doReport) {
taglines =  Clazz_newCharArray (n, '\0');
this.setTag (taglines, bsNNN, String.fromCharCode (48 + pitch));
this.setTag (taglines, bsStart, '>');
this.setTag (taglines, bsStop, '<');
this.setTag (taglines, bsX, 'X');
} else {
taglines = null;
}bsDone.or (bsHelix);
bsNNN.andNot (bsDone);
bsTurn.or (bsNNN);
bsTurn.andNot (bsHelix);
if (this.setStructure) ap.setStructureBS (0, mmtfType, subtype, bsHelix, false);
if (this.doReport) {
this.setTag (this.labels[iPolymer], bsHelix, String.fromCharCode (68 + pitch));
return String.valueOf (taglines) + warning;
}return "";
}, "~N,~N,~N,~A,J.c.STR,~N,JU.BS,~B");
Clazz_defineMethod (c$, "setTag", 
 function (tags, bs, ch) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) tags[i] = ch;

}, "~A,JU.BS,~S");
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shape.AtomShape"], "J.shapebio.BioShape", ["java.lang.Float", "JU.AU", "$.BS", "$.PT", "J.c.PAL", "$.STR", "JM.AlphaPolymer", "$.NucleicPolymer", "JU.BSUtil", "$.C", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.modelIndex = 0;
this.modelVisibilityFlags = 0;
this.shape = null;
this.bioPolymer = null;
this.meshes = null;
this.meshReady = null;
this.colixesBack = null;
this.monomers = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.hasBfactorRange = false;
this.bfactorMin = 0;
this.bfactorMax = 0;
this.range = 0;
this.floatRange = 0;
Clazz_instantialize (this, arguments);
}, J.shapebio, "BioShape", J.shape.AtomShape);
Clazz_overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.setPropAS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz_makeConstructor (c$, 
function (shape, modelIndex, bioPolymer) {
Clazz_superConstructor (this, J.shapebio.BioShape, []);
this.shape = shape;
this.modelIndex = modelIndex;
this.bioPolymer = bioPolymer;
this.isActive = shape.isActive;
this.bsSizeDefault =  new JU.BS ();
this.monomerCount = bioPolymer.monomerCount;
if (this.monomerCount > 0) {
this.colixes =  Clazz_newShortArray (this.monomerCount, 0);
this.paletteIDs =  Clazz_newByteArray (this.monomerCount, 0);
this.mads =  Clazz_newShortArray (this.monomerCount + 1, 0);
this.monomers = bioPolymer.monomers;
this.meshReady =  Clazz_newBooleanArray (this.monomerCount, false);
this.meshes =  new Array (this.monomerCount);
this.wingVectors = bioPolymer.getWingVectors ();
this.leadAtomIndices = bioPolymer.getLeadAtomIndices ();
}}, "J.shapebio.BioShapeCollection,~N,JM.BioPolymer");
Clazz_defineMethod (c$, "calcBfactorRange", 
function () {
this.bfactorMin = this.bfactorMax = this.monomers[0].getLeadAtom ().getBfactor100 ();
for (var i = this.monomerCount; --i > 0; ) {
var bfactor = this.monomers[i].getLeadAtom ().getBfactor100 ();
if (bfactor < this.bfactorMin) this.bfactorMin = bfactor;
 else if (bfactor > this.bfactorMax) this.bfactorMax = bfactor;
}
this.range = this.bfactorMax - this.bfactorMin;
this.floatRange = this.range;
this.hasBfactorRange = true;
});
Clazz_defineMethod (c$, "calcMeanPositionalDisplacement", 
function (bFactor100) {
return Clazz_doubleToShort (Math.sqrt (bFactor100 / 7895.6835208714865) * 1000);
}, "~N");
Clazz_overrideMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
this.bioPolymer.findNearestAtomIndex (xMouse, yMouse, closest, this.mads, this.shape.vf, bsNot);
}, "~N,~N,~A,JU.BS");
Clazz_defineMethod (c$, "setMad", 
function (mad, bsSelected, values) {
if (this.monomerCount < 2) return;
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new JU.BS ();
var flag = this.shape.vf;
var setRingVis = (flag == 32768 && Clazz_instanceOf (this.bioPolymer, JM.NucleicPolymer));
for (var i = this.monomerCount; --i >= 0; ) {
var leadAtomIndex = this.leadAtomIndices[i];
if (bsSelected.get (leadAtomIndex)) {
if (values != null && leadAtomIndex < values.length) {
if (Float.isNaN (values[leadAtomIndex])) continue;
mad = Clazz_floatToShort (values[leadAtomIndex] * 2000);
}var isVisible = ((this.mads[i] = this.getMad (i, mad)) > 0);
this.bsSizeSet.setBitTo (i, isVisible);
this.monomers[i].setShapeVisibility (flag, isVisible);
this.shape.atoms[leadAtomIndex].setShapeVisibility (flag, isVisible);
if (setRingVis) (this.monomers[i]).setRingsVisible (isVisible);
this.falsifyNearbyMesh (i);
}}
if (this.monomerCount > 1) this.mads[this.monomerCount] = this.mads[this.monomerCount - 1];
}, "~N,JU.BS,~A");
Clazz_defineMethod (c$, "getMad", 
 function (groupIndex, mad) {
this.bsSizeDefault.setBitTo (groupIndex, mad == -1 || mad == -2);
if (mad >= 0) return mad;
switch (mad) {
case -1:
case -2:
if (mad == -1 && this.shape.madOn >= 0) return this.shape.madOn;
switch (this.monomers[groupIndex].getProteinStructureType ()) {
case J.c.STR.SHEET:
case J.c.STR.HELIX:
return this.shape.madHelixSheet;
case J.c.STR.DNA:
case J.c.STR.RNA:
return this.shape.madDnaRna;
default:
return this.shape.madTurnRandom;
}
case -3:
{
if (!this.hasBfactorRange) this.calcBfactorRange ();
var atom = this.monomers[groupIndex].getLeadAtom ();
var bfactor100 = atom.getBfactor100 ();
var scaled = bfactor100 - this.bfactorMin;
if (this.range == 0) return 0;
var percentile = scaled / this.floatRange;
if (percentile < 0 || percentile > 1) JU.Logger.error ("Que ha ocurrido? " + percentile);
return Clazz_floatToShort ((1750 * percentile) + 250);
}case -4:
{
var atom = this.monomers[groupIndex].getLeadAtom ();
return (2 * this.calcMeanPositionalDisplacement (atom.getBfactor100 ()));
}}
JU.Logger.error ("unrecognized setMad(" + mad + ")");
return 0;
}, "~N,~N");
Clazz_defineMethod (c$, "falsifyMesh", 
function () {
if (this.meshReady == null) return;
for (var i = 0; i < this.monomerCount; i++) this.meshReady[i] = false;

});
Clazz_defineMethod (c$, "falsifyNearbyMesh", 
 function (index) {
if (this.meshReady == null) return;
this.meshReady[index] = false;
if (index > 0) this.meshReady[index - 1] = false;
if (index < this.monomerCount - 1) this.meshReady[index + 1] = false;
}, "~N");
Clazz_defineMethod (c$, "setColixBS", 
function (colix, pid, bsSelected) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet = JU.BS.newN (this.monomerCount);
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex)) {
this.colixes[i] = this.shape.getColixI (colix, pid, atomIndex);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = 0;
this.paletteIDs[i] = pid;
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}}
}, "~N,~N,JU.BS");
Clazz_defineMethod (c$, "setColixBack", 
function (colix, bsSelected) {
if (this.colixesBack == null) this.colixesBack =  Clazz_newShortArray (this.colixes.length, 0);
if (this.colixesBack.length < this.colixes.length) this.colixesBack = JU.AU.ensureLengthShort (this.colixesBack, this.colixes.length);
for (var i = this.monomerCount; --i >= 0; ) if (bsSelected.get (this.leadAtomIndices[i])) this.colixesBack[i] = colix;

}, "~N,JU.BS");
Clazz_defineMethod (c$, "setColixes", 
function (atomColixes, bsSelected) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet = JU.BS.newN (this.monomerCount);
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex) && i < this.colixes.length && atomIndex < atomColixes.length) {
this.colixes[i] = this.shape.getColixI (atomColixes[atomIndex], J.c.PAL.UNKNOWN.id, atomIndex);
if (this.colixesBack != null && i < this.colixesBack.length) this.colixesBack[i] = 0;
this.paletteIDs[i] = J.c.PAL.UNKNOWN.id;
this.bsColixSet.set (i);
}}
}, "~A,JU.BS");
Clazz_defineMethod (c$, "setParams", 
function (data, atomMap, bsSelected) {
if (this.monomerCount == 0) return;
var c = data[0];
var atrans = data[1];
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet = JU.BS.newN (this.monomerCount);
var n = atomMap.length;
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex) && i < this.colixes.length && atomIndex < n) {
var pt = atomMap[atomIndex];
var colix = (c == null ? 0 : c[pt]);
var f = (atrans == null ? 0 : atrans[pt]);
if (f > 0.01) colix = JU.C.getColixTranslucent3 (colix, true, f);
this.colixes[i] = this.shape.getColixI (colix, J.c.PAL.UNKNOWN.id, atomIndex);
if (this.colixesBack != null && i < this.colixesBack.length) this.colixesBack[i] = 0;
this.paletteIDs[i] = J.c.PAL.UNKNOWN.id;
this.bsColixSet.set (i);
}}
}, "~A,~A,JU.BS");
Clazz_defineMethod (c$, "setTranslucent", 
function (isTranslucent, bsSelected, translucentLevel) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet = JU.BS.newN (this.monomerCount);
for (var i = this.monomerCount; --i >= 0; ) if (bsSelected.get (this.leadAtomIndices[i])) {
this.colixes[i] = JU.C.getColixTranslucent3 (this.colixes[i], isTranslucent, translucentLevel);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = JU.C.getColixTranslucent3 (this.colixesBack[i], isTranslucent, translucentLevel);
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}
}, "~B,JU.BS,~N");
Clazz_overrideMethod (c$, "setAtomClickability", 
function () {
if (!this.isActive || this.wingVectors == null || this.monomerCount == 0) return;
var setRingsClickable = (Clazz_instanceOf (this.bioPolymer, JM.NucleicPolymer) && this.shape.shapeID == 11);
var setAlphaClickable = (Clazz_instanceOf (this.bioPolymer, JM.AlphaPolymer) || this.shape.shapeID != 15);
var ms = this.monomers[0].chain.model.ms;
for (var i = this.monomerCount; --i >= 0; ) {
if (this.mads[i] <= 0) continue;
var iAtom = this.leadAtomIndices[i];
if (ms.isAtomHidden (iAtom)) continue;
if (setAlphaClickable) ms.at[iAtom].setClickable (1040384);
if (setRingsClickable) (this.monomers[i]).setRingsClickable ();
}
});
Clazz_defineMethod (c$, "getBioShapeState", 
function (type, translucentAllowed, temp, temp2) {
if (this.monomerCount > 0) {
if (!this.isActive || this.bsSizeSet == null && this.bsColixSet == null) return;
for (var i = 0; i < this.monomerCount; i++) {
var atomIndex1 = this.monomers[i].firstAtomIndex;
var atomIndex2 = this.monomers[i].lastAtomIndex;
if (this.bsSizeSet != null && (this.bsSizeSet.get (i) || this.bsColixSet != null && this.bsColixSet.get (i))) {
if (this.bsSizeDefault.get (i)) {
JU.BSUtil.setMapBitSet (temp, atomIndex1, atomIndex2, type + (this.bsSizeSet.get (i) ? " on" : " off"));
} else {
JU.BSUtil.setMapBitSet (temp, atomIndex1, atomIndex2, type + " " + JU.PT.escF (this.mads[i] / 2000));
}}if (this.bsColixSet == null || !this.bsColixSet.get (i)) continue;
var s = J.shape.Shape.getColorCommand (type, this.paletteIDs[i], this.colixes[i], translucentAllowed);
if (this.colixesBack != null && this.colixesBack.length > i && this.colixesBack[i] != 0) s += " " + JU.C.getHexCode (this.colixesBack[i]);
JU.BSUtil.setMapBitSet (temp2, atomIndex1, atomIndex2, s);
}
}}, "~S,~B,java.util.Map,java.util.Map");
Clazz_overrideMethod (c$, "getShapeState", 
function () {
return null;
});
Clazz_defineStatics (c$,
"eightPiSquared100", 7895.6835208714865);
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shape.Shape"], "J.shapebio.BioShapeCollection", ["java.util.Hashtable", "JU.AU", "J.c.PAL", "J.shapebio.BioShape", "JU.BSUtil", "$.C", "JV.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.atoms = null;
this.madOn = -2;
this.madHelixSheet = 3000;
this.madTurnRandom = 800;
this.madDnaRna = 5000;
this.isActive = false;
this.bioShapes = null;
Clazz_instantialize (this, arguments);
}, J.shapebio, "BioShapeCollection", J.shape.Shape);
Clazz_overrideMethod (c$, "initModelSet", 
function () {
this.isBioShape = true;
this.atoms = this.ms.at;
this.initialize ();
});
Clazz_overrideMethod (c$, "initShape", 
function () {
});
Clazz_overrideMethod (c$, "getSizeG", 
function (group) {
var m = group;
var groupIndex = m.groupIndex;
var leadAtomIndex = m.getLeadAtom ().i;
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
for (var j = 0; j < bioShape.monomerCount; j++) {
if (bioShape.monomers[j].groupIndex == groupIndex && bioShape.monomers[j].getLeadAtom ().i == leadAtomIndex) return bioShape.mads[j];
}
}
return 0;
}, "JM.Group");
Clazz_overrideMethod (c$, "replaceGroup", 
function (g0, g1) {
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
for (var j = 0; j < bioShape.monomerCount; j++) if (bioShape.monomers[j] === g0) {
bioShape.monomers[j] = g1;
break;
}
}
}, "JM.Group,JM.Group");
Clazz_overrideMethod (c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
var mad = size;
this.initialize ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setMad (mad, bsSelected, (rd == null ? null : rd.values));
}
}, "~N,J.atomdata.RadiusData,JU.BS");
Clazz_overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.setPropBSC (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz_defineMethod (c$, "setPropBSC", 
function (propertyName, value, bsSelected) {
if (propertyName === "refreshTrajectories") {
var modelIndex = ((value)[0]).intValue ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex == modelIndex) b.falsifyMesh ();
}
return;
}if (propertyName === "deleteModelAtoms") {
this.atoms = (value)[1];
var modelIndex = ((value)[2])[0];
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex > modelIndex) {
b.modelIndex--;
b.leadAtomIndices = b.bioPolymer.getLeadAtomIndices ();
} else if (b.modelIndex == modelIndex) {
this.bioShapes = JU.AU.deleteElements (this.bioShapes, i, 1);
}}
return;
}this.initialize ();
if ("color" === propertyName) {
var pid = J.c.PAL.pidOf (value);
var colix = JU.C.getColixO (value);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setColixBS (colix, pid, bsSelected);
}
return;
}if ("params" === propertyName) {
var n = bsSelected.length ();
var atomMap =  Clazz_newIntArray (n, 0);
for (var pt = 0, i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1), pt++) atomMap[i] = pt;

for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].setParams (value, atomMap, bsSelected);

return;
}if ("colorPhase" === propertyName) {
var twoColors = value;
var colixBack = JU.C.getColixO (twoColors[0]);
var colix = JU.C.getColixO (twoColors[1]);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) {
bioShape.setColixBS (colix, 64, bsSelected);
bioShape.setColixBack (colixBack, bsSelected);
}}
return;
}if ("translucency" === propertyName) {
var isTranslucent = ("translucent".equals (value));
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setTranslucent (isTranslucent, bsSelected, this.translucentLevel);
}
return;
}this.setPropS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz_overrideMethod (c$, "getShapeState", 
function () {
var temp =  new java.util.Hashtable ();
var temp2 =  new java.util.Hashtable ();
var type = JV.JC.shapeClassBases[this.shapeID];
for (var iShape = this.bioShapes.length; --iShape >= 0; ) this.bioShapes[iShape].getBioShapeState (type, this.translucentAllowed, temp, temp2);

var s = "\n" + this.vwr.getCommands (temp, temp2, this.shapeID == 9 ? "Backbone" : "select");
return s;
});
Clazz_defineMethod (c$, "initialize", 
function () {
var modelCount = this.ms.mc;
var models = this.ms.am;
var n = this.ms.getBioPolymerCountInModel (-1);
var shapes =  new Array (n--);
for (var i = modelCount; --i >= 0; ) for (var j = this.ms.getBioPolymerCountInModel (i); --j >= 0; n--) {
var bp = (models[i]).bioPolymers[j];
shapes[n] = (this.bioShapes == null || this.bioShapes.length <= n || this.bioShapes[n] == null || this.bioShapes[n].bioPolymer !== bp ?  new J.shapebio.BioShape (this, i, bp) : this.bioShapes[n]);
}

this.bioShapes = shapes;
});
Clazz_overrideMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].findNearestAtomIndex (xMouse, yMouse, closest, bsNot);

}, "~N,~N,~A,JU.BS");
Clazz_overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
if (this.bioShapes == null) return;
bsModels = JU.BSUtil.copy (bsModels);
if (this.ms.trajectory != null) this.ms.trajectory.setBaseModels (bsModels);
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
b.modelVisibilityFlags = (bsModels.get (b.modelIndex) ? this.vf : 0);
}
}, "JU.BS");
Clazz_overrideMethod (c$, "setAtomClickability", 
function () {
if (this.bioShapes == null) return;
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].setAtomClickability ();

});
Clazz_defineMethod (c$, "getMpsShapeCount", 
function () {
return this.bioShapes.length;
});
Clazz_defineMethod (c$, "getBioShape", 
function (i) {
return this.bioShapes[i];
}, "~N");
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Rockets", null, function () {
c$ = Clazz_declareType (J.shapebio, "Rockets", J.shapebio.BioShapeCollection);
Clazz_overrideMethod (c$, "initShape", 
function () {
this.madTurnRandom = 500;
});
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.Rockets"], "J.shapebio.Cartoon", null, function () {
c$ = Clazz_declareType (J.shapebio, "Cartoon", J.shapebio.Rockets);
Clazz_defineMethod (c$, "initShape", 
function () {
Clazz_superCall (this, J.shapebio.Cartoon, "initShape", []);
this.madDnaRna = 1000;
});
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Backbone", ["java.lang.Float", "JU.BS"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bsSelected = null;
Clazz_instantialize (this, arguments);
}, J.shapebio, "Backbone", J.shapebio.BioShapeCollection);
Clazz_overrideMethod (c$, "initShape", 
function () {
this.madOn = 1;
this.madHelixSheet = 1500;
this.madTurnRandom = 500;
this.madDnaRna = 2000;
this.isActive = true;
});
Clazz_overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if ("bitset" === propertyName) {
this.bsSelected = value;
return;
}this.setPropBSC (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz_overrideMethod (c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
var mad = size;
this.initialize ();
var useThisBsSelected = (this.bsSelected != null);
if (useThisBsSelected) bsSelected = this.bsSelected;
for (var iShape = this.bioShapes.length; --iShape >= 0; ) {
var bioShape = this.bioShapes[iShape];
if (bioShape.monomerCount == 0) continue;
var bondSelectionModeOr = this.vwr.getBoolean (603979812);
var atomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
var isVisible = (mad != 0);
if (bioShape.bsSizeSet == null) bioShape.bsSizeSet =  new JU.BS ();
bioShape.isActive = true;
var n = bioShape.monomerCount;
for (var i = n - (bioShape.bioPolymer.isCyclic () ? 0 : 1); --i >= 0; ) {
var index1 = atomIndices[i];
var index2 = atomIndices[(i + 1) % n];
var isAtom1 = bsSelected.get (index1);
var isAtom2 = bsSelected.get (index2);
if (isAtom1 && isAtom2 || useThisBsSelected && isAtom1 || bondSelectionModeOr && (isAtom1 || isAtom2)) {
bioShape.monomers[i].setShapeVisibility (this.vf, isVisible);
var atomA = this.ms.at[index1];
if (rd != null) {
if (Float.isNaN (rd.values[index1]) || Float.isNaN (rd.values[index2])) continue;
mad = Clazz_floatToShort ((rd.values[index1] + rd.values[index2]) * 1000);
isVisible = (mad != 0);
}var atomB = this.ms.at[index2];
var wasVisible = (bioShape.mads[i] != 0);
if (wasVisible != isVisible) {
this.addDisplayedBackbone (atomA, isVisible);
this.addDisplayedBackbone (atomB, isVisible);
}bioShape.mads[i] = mad;
bioShape.bsSizeSet.setBitTo (i, isVisible);
bioShape.bsSizeDefault.setBitTo (i, mad == -1);
}}
}
if (useThisBsSelected) this.bsSelected = null;
}, "~N,J.atomdata.RadiusData,JU.BS");
Clazz_defineMethod (c$, "addDisplayedBackbone", 
function (a, isVisible) {
a.nBackbonesDisplayed += (isVisible ? 1 : -1);
a.setShapeVisibility (this.vf, isVisible);
}, "JM.Atom,~B");
Clazz_overrideMethod (c$, "setAtomClickability", 
function () {
if (this.bioShapes == null) return;
for (var iShape = this.bioShapes.length; --iShape >= 0; ) {
var bioShape = this.bioShapes[iShape];
var atomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
for (var i = bioShape.monomerCount; --i >= 0; ) {
var atom = this.ms.at[atomIndices[i]];
if (atom.nBackbonesDisplayed > 0 && !this.ms.isAtomHidden (atom.i)) atom.setClickable (this.vf);
}
}
});
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Strands", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.isMesh = false;
Clazz_instantialize (this, arguments);
}, J.shapebio, "Strands", J.shapebio.BioShapeCollection);
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Ribbons", null, function () {
c$ = Clazz_declareType (J.shapebio, "Ribbons", J.shapebio.BioShapeCollection);
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.Strands"], "J.shapebio.MeshRibbon", null, function () {
c$ = Clazz_declareType (J.shapebio, "MeshRibbon", J.shapebio.Strands);
Clazz_overrideMethod (c$, "initShape", 
function () {
this.isMesh = true;
});
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Trace", ["J.atomdata.RadiusData", "J.c.VDW"], function () {
c$ = Clazz_declareType (J.shapebio, "Trace", J.shapebio.BioShapeCollection);
Clazz_overrideMethod (c$, "initShape", 
function () {
this.madOn = 600;
this.madHelixSheet = 1500;
this.madTurnRandom = 500;
this.madDnaRna = 1500;
});
Clazz_overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if (propertyName === "putty") {
this.setPutty (value, bsSelected);
return;
}this.setPropBSC (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz_defineMethod (c$, "setPutty", 
 function (info, bsAtoms) {
var n = bsAtoms.cardinality ();
if (n == 0) return;
var data =  Clazz_newFloatArray (bsAtoms.length (), 0);
var sum = 0.0;
var sumsq = 0.0;
var min = 3.4028235E38;
var max = 0;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var value = this.atoms[i].atomPropertyFloat (null, 1111492620, null);
sum += value;
sumsq += (value * value);
if (value < min) min = value;
if (value > max) max = value;
}
var mean = (sum / n);
var stdev = Math.sqrt ((sumsq - (sum * sum / n)) / n);
var rad = info[1];
var range = info[2];
var scale_min = info[3];
var scale_max = info[4];
var power = info[5];
var transform = Clazz_floatToInt (info[6]);
var data_range = max - min;
var nonlinear = false;
switch (transform) {
case 0:
case 1:
case 2:
case 3:
nonlinear = true;
break;
}
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var scale = this.atoms[i].atomPropertyFloat (null, 1111492620, null);
switch (transform) {
case 3:
case 7:
default:
break;
case 0:
case 4:
scale = 1 + (scale - mean) / range / stdev;
break;
case 1:
case 5:
scale = (scale - min) / data_range / range;
break;
case 2:
case 6:
scale /= range;
break;
case 8:
if (scale < 0.0) scale = 0.0;
scale = (Math.sqrt (scale / 8.0) / 3.141592653589793);
break;
}
if (scale < 0.0) scale = 0.0;
if (nonlinear) scale = Math.pow (scale, power);
if ((scale < scale_min) && (scale_min >= 0.0)) scale = scale_min;
if ((scale > scale_max) && (scale_max >= 0.0)) scale = scale_max;
data[i] = scale * rad;
}
var rd =  new J.atomdata.RadiusData (data, 0, J.atomdata.RadiusData.EnumType.ABSOLUTE, J.c.VDW.AUTO);
this.setShapeSizeRD (0, rd, bsAtoms);
}, "~A,JU.BS");
Clazz_defineStatics (c$,
"PUTTY_NormalizedNonlinear", 0,
"PUTTY_RelativeNonlinear", 1,
"PUTTY_ScaledNonlinear", 2,
"PUTTY_AbsoluteNonlinear", 3,
"PUTTY_NormalizedLinear", 4,
"PUTTY_RelativeLinear", 5,
"PUTTY_ScaledLinear", 6,
"PUTTY_AbsoluteLinear", 7,
"PUTTY_ImpliedRMS", 8);
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.render.ShapeRenderer", "JU.BS", "$.P3"], "J.renderbio.BioShapeRenderer", ["javajs.api.Interface", "J.c.STR", "JM.CarbohydratePolymer", "$.NucleicPolymer", "$.PhosphorusPolymer", "JU.C"], function () {
c$ = Clazz_decorateAsClass (function () {
this.invalidateMesh = false;
this.invalidateSheets = false;
this.isTraceAlpha = false;
this.ribbonBorder = false;
this.haveControlPointScreens = false;
this.aspectRatio = 0;
this.hermiteLevel = 0;
this.sheetSmoothing = 0;
this.cartoonsFancy = false;
this.monomerCount = 0;
this.monomers = null;
this.isNucleic = false;
this.isPhosphorusOnly = false;
this.isCarbohydrate = false;
this.bsVisible = null;
this.ribbonTopScreens = null;
this.ribbonBottomScreens = null;
this.controlPoints = null;
this.controlPointScreens = null;
this.leadAtomIndices = null;
this.wingVectors = null;
this.mads = null;
this.colixes = null;
this.colixesBack = null;
this.structureTypes = null;
this.isHighRes = false;
this.wireframeOnly = false;
this.needTranslucent = false;
this.meshRenderer = null;
this.bioShape = null;
this.pointT = null;
this.iPrev = 0;
this.iNext = 0;
this.iNext2 = 0;
this.iNext3 = 0;
this.diameterBeg = 0;
this.diameterMid = 0;
this.diameterEnd = 0;
this.madBeg = 0;
this.madMid = 0;
this.madEnd = 0;
this.colixBack = 0;
this.reversed = null;
this.isCyclic = false;
this.screenArrowTop = null;
this.screenArrowTopPrev = null;
this.screenArrowBot = null;
this.screenArrowBotPrev = null;
Clazz_instantialize (this, arguments);
}, J.renderbio, "BioShapeRenderer", J.render.ShapeRenderer);
Clazz_prepareFields (c$, function () {
this.bsVisible =  new JU.BS ();
this.pointT =  new JU.P3 ();
this.screenArrowTop =  new JU.P3 ();
this.screenArrowTopPrev =  new JU.P3 ();
this.screenArrowBot =  new JU.P3 ();
this.screenArrowBotPrev =  new JU.P3 ();
});
Clazz_overrideMethod (c$, "render", 
function () {
if (this.shape == null) return false;
this.setGlobals ();
this.renderShapes ();
return this.needTranslucent;
});
Clazz_defineMethod (c$, "setGlobals", 
 function () {
this.invalidateMesh = false;
this.needTranslucent = false;
this.g3d.addRenderer (553648145);
var TF = (!this.isExport && !this.vwr.checkMotionRendering (1112152066));
if (TF != this.wireframeOnly) this.invalidateMesh = true;
this.wireframeOnly = TF;
TF = (this.isExport || !this.wireframeOnly && this.vwr.getBoolean (603979864));
if (TF != this.isHighRes) this.invalidateMesh = true;
this.isHighRes = TF;
TF = !this.wireframeOnly && (this.vwr.getBoolean (603979817) || this.isExport);
if (this.cartoonsFancy != TF) {
this.invalidateMesh = true;
this.cartoonsFancy = TF;
}var val1 = this.vwr.getHermiteLevel ();
val1 = (val1 <= 0 ? -val1 : this.vwr.getInMotion (true) ? 0 : val1);
if (this.cartoonsFancy && !this.wireframeOnly) val1 = Math.max (val1, 3);
if (val1 != this.hermiteLevel) this.invalidateMesh = true;
this.hermiteLevel = Math.min (val1, 8);
var val = this.vwr.getInt (553648166);
val = Math.min (Math.max (0, val), 20);
if (this.cartoonsFancy && val >= 16) val = 4;
if (this.wireframeOnly || this.hermiteLevel == 0) val = 0;
if (val != this.aspectRatio && val != 0 && val1 != 0) this.invalidateMesh = true;
this.aspectRatio = val;
if (this.aspectRatio > 0) {
if (this.meshRenderer == null) {
this.meshRenderer = javajs.api.Interface.getInterface ("J.renderbio.BioMeshRenderer");
this.meshRenderer.setViewerG3dShapeID (this.vwr, this.shape.shapeID);
}this.meshRenderer.setup (this.g3d, this.vwr.ms, this.shape);
}TF = this.vwr.getBoolean (603979966);
if (TF != this.isTraceAlpha) this.invalidateMesh = true;
this.isTraceAlpha = TF;
this.invalidateSheets = false;
var fval = this.vwr.getFloat (570425392);
if (fval != this.sheetSmoothing && this.isTraceAlpha) {
this.sheetSmoothing = fval;
this.invalidateMesh = true;
this.invalidateSheets = true;
}});
Clazz_defineMethod (c$, "renderShapes", 
 function () {
var mps = this.shape;
for (var c = mps.bioShapes.length; --c >= 0; ) {
this.bioShape = mps.getBioShape (c);
if ((this.bioShape.modelVisibilityFlags & this.myVisibilityFlag) == 0) continue;
if (this.bioShape.monomerCount >= 2 && this.initializePolymer (this.bioShape)) {
if (this.meshRenderer != null) this.meshRenderer.initBS ();
this.isCyclic = this.bioShape.bioPolymer.isCyclic ();
this.renderBioShape (this.bioShape);
if (this.meshRenderer != null) this.meshRenderer.renderMeshes ();
this.freeTempArrays ();
}}
});
Clazz_defineMethod (c$, "setBioColix", 
function (colix) {
if (this.g3d.setC (colix)) return true;
this.needTranslucent = true;
return false;
}, "~N");
Clazz_defineMethod (c$, "freeTempArrays", 
 function () {
if (this.haveControlPointScreens) this.vwr.freeTempPoints (this.controlPointScreens);
this.vwr.freeTempEnum (this.structureTypes);
});
Clazz_defineMethod (c$, "initializePolymer", 
 function (bioShape) {
var bsDeleted = this.vwr.slm.bsDeleted;
if (this.vwr.ms.isJmolDataFrameForModel (bioShape.modelIndex)) {
this.controlPoints = bioShape.bioPolymer.getControlPoints (true, 0, false);
} else {
this.controlPoints = bioShape.bioPolymer.getControlPoints (this.isTraceAlpha, this.sheetSmoothing, this.invalidateSheets);
}this.monomerCount = bioShape.monomerCount;
this.monomers = bioShape.monomers;
this.reversed = bioShape.bioPolymer.reversed;
this.leadAtomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
this.bsVisible.clearAll ();
var haveVisible = false;
if (this.invalidateMesh) bioShape.falsifyMesh ();
for (var i = this.monomerCount; --i >= 0; ) {
if ((this.monomers[i].shapeVisibilityFlags & this.myVisibilityFlag) == 0 || this.ms.isAtomHidden (this.leadAtomIndices[i]) || bsDeleted != null && bsDeleted.get (this.leadAtomIndices[i])) continue;
var lead = this.ms.at[this.leadAtomIndices[i]];
if (!this.g3d.isInDisplayRange (lead.sX, lead.sY)) continue;
this.bsVisible.set (i);
haveVisible = true;
}
if (!haveVisible) return false;
this.ribbonBorder = this.vwr.getBoolean (603979901);
this.isNucleic = Clazz_instanceOf (bioShape.bioPolymer, JM.NucleicPolymer);
this.isPhosphorusOnly = !this.isNucleic && Clazz_instanceOf (bioShape.bioPolymer, JM.PhosphorusPolymer);
this.isCarbohydrate = Clazz_instanceOf (bioShape.bioPolymer, JM.CarbohydratePolymer);
this.haveControlPointScreens = false;
this.wingVectors = bioShape.wingVectors;
if (this.meshRenderer != null) this.meshRenderer.initialize (this, bioShape, this.monomerCount);
this.mads = bioShape.mads;
this.colixes = bioShape.colixes;
this.colixesBack = bioShape.colixesBack;
this.setStructureTypes ();
return true;
}, "J.shapebio.BioShape");
Clazz_defineMethod (c$, "setStructureTypes", 
 function () {
var types = this.structureTypes = this.vwr.allocTempEnum (this.monomerCount + 1);
for (var i = this.monomerCount; --i >= 0; ) if ((types[i] = this.monomers[i].getProteinStructureType ()) === J.c.STR.TURN) types[i] = J.c.STR.NONE;

types[this.monomerCount] = types[this.monomerCount - 1];
});
Clazz_defineMethod (c$, "calcScreenControlPoints", 
function () {
var count = this.monomerCount + 1;
var scr = this.controlPointScreens = this.vwr.allocTempPoints (count);
var points = this.controlPoints;
for (var i = count; --i >= 0; ) this.tm.transformPtScrT3 (points[i], scr[i]);

this.haveControlPointScreens = true;
});
Clazz_defineMethod (c$, "calcScreens", 
function (offsetFraction, mads) {
var count = this.controlPoints.length;
var screens = this.vwr.allocTempPoints (count);
if (offsetFraction == 0) {
for (var i = count; --i >= 0; ) this.tm.transformPtScrT3 (this.controlPoints[i], screens[i]);

} else {
var offset_1000 = offsetFraction / 1000;
for (var i = count; --i >= 0; ) this.calc1Screen (this.controlPoints[i], this.wingVectors[i], (mads[i] == 0 && i > 0 ? mads[i - 1] : mads[i]), offset_1000, screens[i]);

}return screens;
}, "~N,~A");
Clazz_defineMethod (c$, "calc1Screen", 
 function (center, vector, mad, offset_1000, screen) {
this.pointT.scaleAdd2 (mad * offset_1000, vector, center);
this.tm.transformPtScrT3 (this.pointT, screen);
}, "JU.P3,JU.V3,~N,~N,JU.P3");
Clazz_defineMethod (c$, "getLeadColix", 
function (i) {
return JU.C.getColixInherited (this.colixes[i], this.monomers[i].getLeadAtom ().colixAtom);
}, "~N");
Clazz_defineMethod (c$, "getLeadColixBack", 
function (i) {
return (this.colixesBack == null || this.colixesBack.length <= i ? 0 : this.colixesBack[i]);
}, "~N");
Clazz_defineMethod (c$, "setNeighbors", 
function (i) {
if (this.isCyclic) {
i += this.monomerCount;
this.iPrev = (i - 1) % this.monomerCount;
this.iNext = (i + 1) % this.monomerCount;
this.iNext2 = (i + 2) % this.monomerCount;
this.iNext3 = (i + 3) % this.monomerCount;
} else {
this.iPrev = Math.max (i - 1, 0);
this.iNext = Math.min (i + 1, this.monomerCount);
this.iNext2 = Math.min (i + 2, this.monomerCount);
this.iNext3 = Math.min (i + 3, this.monomerCount);
}}, "~N");
Clazz_defineMethod (c$, "setColix", 
function (colix) {
this.colix = colix;
return this.g3d.setC (colix);
}, "~N");
Clazz_defineMethod (c$, "setMads", 
 function (i, thisTypeOnly) {
this.madMid = this.madBeg = this.madEnd = this.mads[i];
if (this.isTraceAlpha) {
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iNext]) {
this.madEnd = this.mads[this.iNext];
if (this.madEnd == 0) {
if (Clazz_instanceOf (this, J.renderbio.TraceRenderer)) {
this.madEnd = this.madBeg;
} else {
this.madEnd = this.madBeg;
}}this.madMid = ((this.madBeg + this.madEnd) >> 1);
}} else {
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iPrev]) this.madBeg = (((this.mads[this.iPrev] == 0 ? this.madMid : this.mads[this.iPrev]) + this.madMid) >> 1);
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iNext]) this.madEnd = (((this.mads[this.iNext] == 0 ? this.madMid : this.mads[this.iNext]) + this.madMid) >> 1);
}this.diameterBeg = Clazz_floatToInt (this.vwr.tm.scaleToScreen (Clazz_floatToInt (this.controlPointScreens[i].z), this.madBeg));
this.diameterMid = Clazz_floatToInt (this.vwr.tm.scaleToScreen (this.monomers[i].getLeadAtom ().sZ, this.madMid));
this.diameterEnd = Clazz_floatToInt (this.vwr.tm.scaleToScreen (Clazz_floatToInt (this.controlPointScreens[this.iNext].z), this.madEnd));
var doCap0 = (i == this.iPrev || !this.bsVisible.get (this.iPrev) || thisTypeOnly && this.structureTypes[i] !== this.structureTypes[this.iPrev]);
var doCap1 = (this.iNext == this.iNext2 || !this.bsVisible.get (this.iNext) || thisTypeOnly && this.structureTypes[i] !== this.structureTypes[this.iNext]);
return (this.aspectRatio > 0 && this.meshRenderer != null && this.meshRenderer.check (doCap0, doCap1));
}, "~N,~B");
Clazz_defineMethod (c$, "renderHermiteCylinder", 
function (screens, i) {
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.setNeighbors (i);
this.g3d.drawHermite4 (this.isNucleic ? 4 : 7, screens[this.iPrev], screens[i], screens[this.iNext], screens[this.iNext2]);
}, "~A,~N");
Clazz_defineMethod (c$, "renderHermiteConic", 
function (i, thisTypeOnly, tension) {
this.setNeighbors (i);
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
if (this.setMads (i, thisTypeOnly) || this.isExport) {
this.meshRenderer.setFancyConic (i, tension);
return;
}if (this.diameterBeg == 0 && this.diameterEnd == 0 || this.wireframeOnly) this.g3d.drawLineAB (this.controlPointScreens[i], this.controlPointScreens[this.iNext]);
 else {
this.g3d.fillHermite (this.isNucleic ? 4 : 7, this.diameterBeg, this.diameterMid, this.diameterEnd, this.controlPointScreens[this.iPrev], this.controlPointScreens[i], this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2]);
}}, "~N,~B,~N");
Clazz_defineMethod (c$, "renderHermiteRibbon", 
function (doFill, i, thisTypeOnly) {
this.setNeighbors (i);
var c0 = this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
var cb = this.colixBack = this.getLeadColixBack (i);
if (doFill && (this.aspectRatio != 0 || this.isExport)) {
if (this.setMads (i, thisTypeOnly) || this.isExport) {
this.meshRenderer.setFancyRibbon (i);
return;
}}var isReversed = this.reversed.get (i);
if (isReversed && this.colixBack != 0) {
this.setColix (this.colixBack);
cb = c0;
}this.g3d.drawHermite7 (doFill, this.ribbonBorder, (isReversed ? -1 : 1) * (this.isNucleic ? 4 : 7), this.ribbonTopScreens[this.iPrev], this.ribbonTopScreens[i], this.ribbonTopScreens[this.iNext], this.ribbonTopScreens[this.iNext2], this.ribbonBottomScreens[this.iPrev], this.ribbonBottomScreens[i], this.ribbonBottomScreens[this.iNext], this.ribbonBottomScreens[this.iNext2], Clazz_floatToInt (this.aspectRatio), cb);
if (isReversed && this.colixBack != 0) {
this.setColix (c0);
cb = this.colixBack;
}}, "~B,~N,~B");
Clazz_defineMethod (c$, "renderHermiteArrowHead", 
function (i) {
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.colixBack = this.getLeadColixBack (i);
this.setNeighbors (i);
if (this.setMads (i, false) || this.isExport) {
this.meshRenderer.setFancyArrowHead (i);
return;
}var cp = this.controlPoints[i];
var wv = this.wingVectors[i];
this.calc1Screen (cp, wv, this.madBeg, .0007, this.screenArrowTop);
this.calc1Screen (cp, wv, this.madBeg, -7.0E-4, this.screenArrowBot);
this.calc1Screen (cp, wv, this.madBeg, 0.001, this.screenArrowTopPrev);
this.calc1Screen (cp, wv, this.madBeg, -0.001, this.screenArrowBotPrev);
this.g3d.drawHermite7 (true, this.ribbonBorder, this.isNucleic ? 4 : 7, this.screenArrowTopPrev, this.screenArrowTop, this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2], this.screenArrowBotPrev, this.screenArrowBot, this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2], Clazz_floatToInt (this.aspectRatio), this.colixBack);
this.g3d.setC (this.colix);
if (this.ribbonBorder && this.aspectRatio == 0) {
this.g3d.fillCylinderBits (3, 3, this.screenArrowTop, this.screenArrowBot);
}}, "~N");
Clazz_defineMethod (c$, "drawSegmentAB", 
function (atomA, atomB, colixA, colixB, max) {
var xA = atomA.sX;
var yA = atomA.sY;
var zA = atomA.sZ;
var xB = atomB.sX;
var yB = atomB.sY;
var zB = atomB.sZ;
var mad = this.mad;
if (max == 1000) mad = mad >> 1;
if (mad < 0) {
this.g3d.drawLine (colixA, colixB, xA, yA, zA, xB, yB, zB);
} else {
var width = Clazz_floatToInt (this.isExport ? mad : this.vwr.tm.scaleToScreen (Clazz_doubleToInt ((zA + zB) / 2), mad));
this.g3d.fillCylinderXYZ (colixA, colixB, 3, width, xA, yA, zA, xB, yB, zB);
}}, "JM.Atom,JM.Atom,~N,~N,~N");
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.BioShapeRenderer"], "J.renderbio.StrandsRenderer", ["J.shapebio.Strands"], function () {
c$ = Clazz_decorateAsClass (function () {
this.strandCount = 1;
this.strandSeparation = 0;
this.baseStrandOffset = 0;
Clazz_instantialize (this, arguments);
}, J.renderbio, "StrandsRenderer", J.renderbio.BioShapeRenderer);
Clazz_overrideMethod (c$, "renderBioShape", 
function (bioShape) {
this.renderStrandShape ();
}, "J.shapebio.BioShape");
Clazz_defineMethod (c$, "renderStrandShape", 
function () {
if (!this.setStrandCount ()) return;
this.renderStrands ();
});
Clazz_defineMethod (c$, "setStrandCount", 
function () {
if (this.wingVectors == null) return false;
this.strandCount = (Clazz_instanceOf (this.shape, J.shapebio.Strands) ? this.vwr.getStrandCount ((this.shape).shapeID) : 10);
this.strandSeparation = (this.strandCount <= 1) ? 0 : 1 / (this.strandCount - 1);
this.baseStrandOffset = ((this.strandCount & 1) == 0 ? this.strandSeparation / 2 : this.strandSeparation);
return true;
});
Clazz_defineMethod (c$, "renderStrands", 
function () {
var screens;
for (var i = this.strandCount >> 1; --i >= 0; ) {
var f = (i * this.strandSeparation) + this.baseStrandOffset;
screens = this.calcScreens (f, this.mads);
this.renderStrand (screens);
this.vwr.freeTempPoints (screens);
screens = this.calcScreens (-f, this.mads);
this.renderStrand (screens);
this.vwr.freeTempPoints (screens);
}
if (this.strandCount % 2 == 1) {
screens = this.calcScreens (0, this.mads);
this.renderStrand (screens);
this.vwr.freeTempPoints (screens);
}});
Clazz_defineMethod (c$, "renderStrand", 
 function (screens) {
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteCylinder (screens, i);

}, "~A");
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.MeshRibbonRenderer"], "J.renderbio.RibbonsRenderer", null, function () {
c$ = Clazz_declareType (J.renderbio, "RibbonsRenderer", J.renderbio.MeshRibbonRenderer);
Clazz_overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (this.wingVectors == null) return;
if (this.wireframeOnly) this.renderStrands ();
 else this.render2Strand (true, this.isNucleic ? 1 : 0.5, this.isNucleic ? 0 : 0.5);
}, "J.shapebio.BioShape");
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.StrandsRenderer"], "J.renderbio.MeshRibbonRenderer", null, function () {
c$ = Clazz_declareType (J.renderbio, "MeshRibbonRenderer", J.renderbio.StrandsRenderer);
Clazz_overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (this.wireframeOnly) this.renderStrands ();
 else this.renderMeshRibbon ();
}, "J.shapebio.BioShape");
Clazz_defineMethod (c$, "renderMeshRibbon", 
function () {
if (!this.setStrandCount ()) return;
var offset = ((this.strandCount >> 1) * this.strandSeparation) + this.baseStrandOffset;
this.render2Strand (false, offset, offset);
this.renderStrands ();
});
Clazz_defineMethod (c$, "render2Strand", 
function (doFill, offsetTop, offsetBottom) {
this.calcScreenControlPoints ();
this.ribbonTopScreens = this.calcScreens (offsetTop, this.mads);
this.ribbonBottomScreens = this.calcScreens (-offsetBottom, this.mads);
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteRibbon (doFill, i, false);

this.vwr.freeTempPoints (this.ribbonTopScreens);
this.vwr.freeTempPoints (this.ribbonBottomScreens);
}, "~B,~N,~N");
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.StrandsRenderer"], "J.renderbio.RocketsRenderer", ["javajs.api.Interface", "JU.P3", "J.c.STR"], function () {
c$ = Clazz_decorateAsClass (function () {
this.isRockets = false;
this.helixRockets = true;
this.renderArrowHeads = false;
this.cordMidPoints = null;
this.rr = null;
Clazz_instantialize (this, arguments);
}, J.renderbio, "RocketsRenderer", J.renderbio.StrandsRenderer);
Clazz_overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (!this.setupRR (bioShape, true)) return;
this.calcRopeMidPoints ();
this.renderRockets ();
this.vwr.freeTempPoints (this.cordMidPoints);
}, "J.shapebio.BioShape");
Clazz_defineMethod (c$, "renderRockets", 
function () {
if (this.rr == null) this.rr = (javajs.api.Interface.getInterface ("J.renderbio.RocketRenderer")).set (this);
this.rr.renderRockets ();
});
Clazz_defineMethod (c$, "setupRR", 
function (bioShape, isRockets) {
this.isRockets = isRockets;
if (this.wireframeOnly) {
this.renderStrands ();
} else if (this.wingVectors != null && !this.isCarbohydrate && !(isRockets && this.isNucleic)) {
var val = !this.vwr.getBoolean (603979902);
if (!this.isNucleic && this.renderArrowHeads != val) {
bioShape.falsifyMesh ();
this.renderArrowHeads = val;
}return true;
}return false;
}, "J.shapebio.BioShape,~B");
Clazz_defineMethod (c$, "calcRopeMidPoints", 
function () {
var midPointCount = this.monomerCount + 1;
this.cordMidPoints = this.vwr.allocTempPoints (midPointCount);
var proteinstructurePrev = null;
var point;
var ptLastRocket = -10;
var pt1 =  new JU.P3 ();
var pt2 =  new JU.P3 ();
for (var i = 0; i <= this.monomerCount; ++i) {
point = this.cordMidPoints[i];
if (i < this.monomerCount && (this.helixRockets && this.structureTypes[i] === J.c.STR.HELIX || this.isRockets && this.structureTypes[i] === J.c.STR.SHEET)) {
var proteinstructure = this.monomers[i].getStructure ();
if (proteinstructure === proteinstructurePrev) {
pt1.add (pt2);
ptLastRocket = i;
} else {
proteinstructurePrev = proteinstructure;
pt1.setT (proteinstructure.getAxisStartPoint ());
pt2.sub2 (proteinstructure.getAxisEndPoint (), pt1);
pt2.scale (1 / (proteinstructure.nRes - 1));
if (ptLastRocket == i - 3) {
this.cordMidPoints[i - 1].ave (this.cordMidPoints[i - 2], pt1);
}}point.setT (pt1);
} else {
if (ptLastRocket == i - 1 && i > 1) this.cordMidPoints[i - 1].setT (this.cordMidPoints[i > 2 ? i - 3 : i - 2]);
point.setT (proteinstructurePrev == null ? this.controlPoints[i] : proteinstructurePrev.getAxisEndPoint ());
proteinstructurePrev = null;
}}
this.controlPoints = this.cordMidPoints;
this.calcScreenControlPoints ();
});
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.RocketsRenderer"], "J.renderbio.CartoonRenderer", ["J.api.Interface", "J.c.STR"], function () {
c$ = Clazz_decorateAsClass (function () {
this.nucleicRenderer = null;
Clazz_instantialize (this, arguments);
}, J.renderbio, "CartoonRenderer", J.renderbio.RocketsRenderer);
Clazz_overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (!this.setupRR (bioShape, false)) return;
if (this.isNucleic || this.isPhosphorusOnly) {
if (this.nucleicRenderer == null) this.nucleicRenderer = J.api.Interface.getInterface ("J.renderbio.NucleicRenderer", this.vwr, "render");
this.calcScreenControlPoints ();
this.nucleicRenderer.renderNucleic (this);
return;
}var val = this.vwr.getBoolean (603979820);
if (this.helixRockets != val) {
bioShape.falsifyMesh ();
this.helixRockets = val;
}this.ribbonTopScreens = this.calcScreens (0.5, this.mads);
this.ribbonBottomScreens = this.calcScreens (-0.5, this.mads);
this.calcRopeMidPoints ();
this.renderProtein ();
this.vwr.freeTempPoints (this.cordMidPoints);
this.vwr.freeTempPoints (this.ribbonTopScreens);
this.vwr.freeTempPoints (this.ribbonBottomScreens);
}, "J.shapebio.BioShape");
Clazz_defineMethod (c$, "renderProtein", 
 function () {
var lastWasSheet = false;
var lastWasHelix = false;
var previousStructure = null;
var thisStructure;
var needRockets = (this.helixRockets || !this.renderArrowHeads);
var doRockets = false;
for (var i = this.monomerCount; --i >= 0; ) {
thisStructure = this.monomers[i].getStructure ();
if (thisStructure !== previousStructure) {
lastWasSheet = false;
}previousStructure = thisStructure;
var isHelix = (this.structureTypes[i] === J.c.STR.HELIX);
var isSheet = (this.structureTypes[i] === J.c.STR.SHEET);
if (this.bsVisible.get (i)) {
if (isHelix && needRockets) {
doRockets = true;
} else if (isSheet || isHelix) {
if (lastWasSheet && isSheet || lastWasHelix && isHelix) {
this.renderHermiteRibbon (true, i, true);
} else {
this.renderHermiteArrowHead (i);
}} else {
this.renderHermiteConic (i, true, 7);
}}lastWasSheet = isSheet;
lastWasHelix = isHelix && !this.helixRockets;
}
if (doRockets) this.renderRockets ();
});
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.BioShapeRenderer"], "J.renderbio.BackboneRenderer", ["JU.C"], function () {
c$ = Clazz_decorateAsClass (function () {
this.isDataFrame = false;
Clazz_instantialize (this, arguments);
}, J.renderbio, "BackboneRenderer", J.renderbio.BioShapeRenderer);
Clazz_overrideMethod (c$, "renderBioShape", 
function (bioShape) {
var checkPass2 = (!this.isExport && !this.vwr.gdata.isPass2);
this.isDataFrame = this.vwr.ms.isJmolDataFrameForModel (bioShape.modelIndex);
var n = this.monomerCount;
var atoms = this.ms.at;
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) {
var atomA = atoms[this.leadAtomIndices[i]];
var cA = this.colixes[i];
this.mad = this.mads[i];
var i1 = (i + 1) % n;
var atomB = atoms[this.leadAtomIndices[i1]];
var cB = this.colixes[i1];
if (atomA.nBackbonesDisplayed > 0 && atomB.nBackbonesDisplayed > 0 && !this.ms.isAtomHidden (atomB.i) && (this.isDataFrame || atomA.distanceSquared (atomB) < 100)) {
cA = JU.C.getColixInherited (cA, atomA.colixAtom);
cB = JU.C.getColixInherited (cB, atomB.colixAtom);
if (!checkPass2 || this.setBioColix (cA) || this.setBioColix (cB)) this.drawSegmentAB (atomA, atomB, cA, cB, 100);
}}
}, "J.shapebio.BioShape");
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.StrandsRenderer"], "J.renderbio.TraceRenderer", null, function () {
c$ = Clazz_declareType (J.renderbio, "TraceRenderer", J.renderbio.StrandsRenderer);
Clazz_overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (this.wireframeOnly) this.renderStrands ();
 else this.renderTrace ();
}, "J.shapebio.BioShape");
Clazz_defineMethod (c$, "renderTrace", 
function () {
this.calcScreenControlPoints ();
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteConic (i, false, 7);

});
});
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
