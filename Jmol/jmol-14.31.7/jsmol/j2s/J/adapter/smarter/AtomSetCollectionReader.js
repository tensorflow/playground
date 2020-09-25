Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["javajs.api.GenericLineReader", "JU.SB"], "J.adapter.smarter.AtomSetCollectionReader", ["java.io.BufferedReader", "java.lang.Boolean", "$.Double", "$.Float", "$.NullPointerException", "javajs.api.GenericBinaryDocument", "JU.BS", "$.Lst", "$.M3", "$.P3", "$.PT", "$.Quat", "$.T4", "$.V3", "J.adapter.smarter.Atom", "$.AtomSetCollection", "J.api.Interface", "$.JmolAdapter", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isBinary = false;
this.debugging = false;
this.requiresBSFilter = false;
this.primitiveToCrystal = null;
this.asc = null;
this.reader = null;
this.binaryDoc = null;
this.readerName = null;
this.htParams = null;
this.trajectorySteps = null;
this.domains = null;
this.validation = null;
this.dssr = null;
this.isConcatenated = false;
this.addedData = null;
this.addedDataKey = null;
this.fixJavaFloat = true;
this.thisBiomolecule = null;
this.lstNCS = null;
this.line = null;
this.prevline = null;
this.next = null;
this.ptLine = 0;
this.latticeType = null;
this.latticeCells = null;
this.fillRange = null;
this.doProcessLines = false;
this.iHaveUnitCell = false;
this.iHaveSymmetryOperators = false;
this.continuing = true;
this.vwr = null;
this.doApplySymmetry = false;
this.ignoreFileSymmetryOperators = false;
this.isTrajectory = false;
this.applySymmetryToBonds = false;
this.doCheckUnitCell = false;
this.getHeader = false;
this.isSequential = false;
this.isMolecular = false;
this.templateAtomCount = 0;
this.modelNumber = 0;
this.vibrationNumber = 0;
this.desiredVibrationNumber = -2147483648;
this.bsModels = null;
this.useFileModelNumbers = false;
this.havePartialChargeFilter = false;
this.calculationType = "?";
this.sgName = null;
this.ignoreFileUnitCell = false;
this.ignoreFileSpaceGroupName = false;
this.unitCellParams = null;
this.desiredModelNumber = -2147483648;
this.symmetry = null;
this.out = null;
this.iHaveFractionalCoordinates = false;
this.doPackUnitCell = false;
this.ptSupercell = null;
this.mustFinalizeModelSet = false;
this.forcePacked = false;
this.packingError = 0.02;
this.rotateHexCell = false;
this.isPrimitive = false;
this.modDim = 0;
this.loadNote = null;
this.doConvertToFractional = false;
this.fileCoordinatesAreFractional = false;
this.merging = false;
this.symmetryRange = 0;
this.firstLastStep = null;
this.lastModelNumber = 2147483647;
this.desiredSpaceGroupIndex = -1;
this.fileScaling = null;
this.latticeScaling = NaN;
this.fileOffset = null;
this.fileOffsetFractional = null;
this.unitCellOffset = null;
this.unitCellOffsetFractional = false;
this.moreUnitCellInfo = null;
this.filePath = null;
this.fileName = null;
this.stateScriptVersionInt = 2147483647;
this.baseAtomIndex = 0;
this.isFinalized = false;
this.haveModel = false;
this.previousSpaceGroup = null;
this.previousUnitCell = null;
this.nMatrixElements = 0;
this.matUnitCellOrientation = null;
this.bsFilter = null;
this.filter = null;
this.haveAtomFilter = false;
this.filterAltLoc = false;
this.filterGroup3 = false;
this.filterChain = false;
this.filterAtomName = false;
this.filterAtomType = false;
this.filterAtomTypeStr = null;
this.filterAtomNameTerminator = ";";
this.filterElement = false;
this.filterHetero = false;
this.filterEveryNth = false;
this.filterSymop = null;
this.filterN = 0;
this.nFiltered = 0;
this.doSetOrientation = false;
this.doCentralize = false;
this.addVibrations = false;
this.useAltNames = false;
this.ignoreStructure = false;
this.isDSSP1 = false;
this.allowPDBFilter = false;
this.doReadMolecularOrbitals = false;
this.reverseModels = false;
this.nameRequired = null;
this.doCentroidUnitCell = false;
this.centroidPacked = false;
this.strSupercell = null;
this.filter1 = null;
this.filter2 = null;
this.matRot = null;
this.ms = null;
this.vibsFractional = false;
this.previousScript = null;
this.siteScript = null;
Clazz.instantialize (this, arguments);
}, J.adapter.smarter, "AtomSetCollectionReader", null, javajs.api.GenericLineReader);
Clazz.prepareFields (c$, function () {
this.next =  Clazz.newIntArray (1, 0);
this.loadNote =  new JU.SB ();
});
Clazz.defineMethod (c$, "setup", 
function (fullPath, htParams, readerOrDocument) {
this.setupASCR (fullPath, htParams, readerOrDocument);
}, "~S,java.util.Map,~O");
Clazz.defineMethod (c$, "setupASCR", 
function (fullPath, htParams, readerOrDocument) {
if (fullPath == null) return;
this.debugging = JU.Logger.debugging;
this.htParams = htParams;
this.filePath = "" + htParams.get ("fullPathName");
var i = this.filePath.lastIndexOf ('/');
this.fileName = this.filePath.substring (i + 1);
if (Clazz.instanceOf (readerOrDocument, java.io.BufferedReader)) this.reader = readerOrDocument;
 else if (Clazz.instanceOf (readerOrDocument, javajs.api.GenericBinaryDocument)) this.binaryDoc = readerOrDocument;
}, "~S,java.util.Map,~O");
Clazz.defineMethod (c$, "readData", 
function () {
this.initialize ();
this.asc =  new J.adapter.smarter.AtomSetCollection (this.readerName, this, null, null);
try {
this.initializeReader ();
if (this.binaryDoc == null) {
if (this.line == null && this.continuing) this.rd ();
while (this.line != null && this.continuing) if (this.checkLine ()) this.rd ();

} else {
this.binaryDoc.setOutputChannel (this.out);
this.processBinaryDocument ();
}this.finalizeSubclassReader ();
if (!this.isFinalized) this.finalizeReaderASCR ();
} catch (e) {
JU.Logger.info ("Reader error: " + e);
e.printStackTrace ();
this.setError (e);
}
if (this.reader != null) this.reader.close ();
if (this.binaryDoc != null) this.binaryDoc.close ();
return this.finish ();
});
Clazz.defineMethod (c$, "fixBaseIndices", 
 function () {
try {
var baseModelIndex = (this.htParams.get ("baseModelIndex")).intValue ();
this.baseAtomIndex += this.asc.ac;
baseModelIndex += this.asc.atomSetCount;
this.htParams.put ("baseAtomIndex", Integer.$valueOf (this.baseAtomIndex));
this.htParams.put ("baseModelIndex", Integer.$valueOf (baseModelIndex));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "readDataObject", 
function (node) {
this.initialize ();
this.asc =  new J.adapter.smarter.AtomSetCollection (this.readerName, this, null, null);
this.initializeReader ();
this.processDOM (node);
return this.finish ();
}, "~O");
Clazz.defineMethod (c$, "processDOM", 
function (DOMNode) {
}, "~O");
Clazz.defineMethod (c$, "processBinaryDocument", 
function () {
});
Clazz.defineMethod (c$, "initializeReader", 
function () {
});
Clazz.defineMethod (c$, "checkLine", 
function () {
return true;
});
Clazz.defineMethod (c$, "checkLastModel", 
function () {
if (this.isLastModel (this.modelNumber) && this.doProcessLines) return (this.continuing = this.doProcessLines = false);
this.doProcessLines = false;
return true;
});
Clazz.defineMethod (c$, "isLastModel", 
function (modelNumber) {
return (this.desiredModelNumber > 0 || modelNumber >= this.lastModelNumber);
}, "~N");
Clazz.defineMethod (c$, "appendLoadNote", 
function (info) {
if (info == null) {
this.loadNote =  new JU.SB ();
return;
}this.loadNote.append (info).append ("\n");
JU.Logger.info (info);
}, "~S");
Clazz.defineMethod (c$, "initializeTrajectoryFile", 
function () {
this.asc.addAtom ( new J.adapter.smarter.Atom ());
this.trajectorySteps = this.htParams.get ("trajectorySteps");
if (this.trajectorySteps == null) this.htParams.put ("trajectorySteps", this.trajectorySteps =  new JU.Lst ());
});
Clazz.defineMethod (c$, "finalizeSubclassReader", 
function () {
});
Clazz.defineMethod (c$, "finalizeReaderASCR", 
function () {
this.isFinalized = true;
if (this.asc.atomSetCount > 0) {
if (this.asc.atomSetCount == 1) this.asc.setCurrentModelInfo ("dbName", this.htParams.get ("dbName"));
this.applySymmetryAndSetTrajectory ();
this.asc.finalizeStructures ();
if (this.doCentralize) this.asc.centralize ();
if (this.fillRange != null) this.asc.setInfo ("boundbox", this.fillRange);
var info = this.asc.getAtomSetAuxiliaryInfo (0);
if (info != null) {
if (this.domains != null) {
this.asc.setGlobalBoolean (5);
var s = (this.domains).getMapKeys (2, true);
var pt = s.indexOf ("{ ", 2);
if (pt >= 0) s = s.substring (pt + 2);
pt = s.indexOf ("_metadata");
if (pt < 0) pt = s.indexOf ("metadata");
if (pt >= 0) s = s.substring (0, pt);
s = JU.PT.rep (JU.PT.replaceAllCharacters (s, "{}", "").trim (), "\n", "\n  ") + "\n\nUse SHOW DOMAINS for details.";
this.appendLoadNote ("\nDomains loaded:\n   " + s);
for (var i = this.asc.atomSetCount; --i >= 0; ) {
info = this.asc.getAtomSetAuxiliaryInfo (i);
info.put ("domains", this.domains);
}
}if (this.validation != null) {
for (var i = this.asc.atomSetCount; --i >= 0; ) {
info = this.asc.getAtomSetAuxiliaryInfo (i);
info.put ("validation", this.validation);
}
}if (this.dssr != null) {
info.put ("dssrJSON", Boolean.TRUE);
for (var i = this.asc.atomSetCount; --i >= 0; ) {
info = this.asc.getAtomSetAuxiliaryInfo (i);
info.put ("dssr", this.dssr);
}
}}}if (!this.fixJavaFloat) this.asc.setInfo ("legacyJavaFloat", Boolean.TRUE);
this.setLoadNote ();
});
Clazz.defineMethod (c$, "setLoadNote", 
function () {
var s = this.loadNote.toString ();
if (this.loadNote.length () > 0) this.asc.setInfo ("modelLoadNote", s);
return s;
});
Clazz.defineMethod (c$, "setIsPDB", 
function () {
this.asc.setGlobalBoolean (4);
if (this.htParams.get ("pdbNoHydrogens") != null) this.asc.setInfo ("pdbNoHydrogens", this.htParams.get ("pdbNoHydrogens"));
if (this.checkFilterKey ("ADDHYDROGENS")) this.asc.setInfo ("pdbAddHydrogens", Boolean.TRUE);
});
Clazz.defineMethod (c$, "setModelPDB", 
function (isPDB) {
if (isPDB) this.asc.setGlobalBoolean (4);
 else this.asc.clearGlobalBoolean (4);
this.asc.setCurrentModelInfo ("isPDB", isPDB ? Boolean.TRUE : null);
}, "~B");
Clazz.defineMethod (c$, "finish", 
 function () {
var s = this.htParams.get ("loadState");
this.asc.setInfo ("loadState", s == null ? "" : s);
s = this.htParams.get ("smilesString");
if (s != null) this.asc.setInfo ("smilesString", s);
if (!this.htParams.containsKey ("templateAtomCount")) this.htParams.put ("templateAtomCount", Integer.$valueOf (this.asc.ac));
if (this.bsFilter != null) {
this.htParams.put ("filteredAtomCount", Integer.$valueOf (JU.BSUtil.cardinalityOf (this.bsFilter)));
this.htParams.put ("bsFilter", this.bsFilter);
}if (!this.calculationType.equals ("?")) this.asc.setInfo ("calculationType", this.calculationType);
var name = this.asc.fileTypeName;
var fileType = name;
if (fileType.indexOf ("(") >= 0) fileType = fileType.substring (0, fileType.indexOf ("("));
for (var i = this.asc.atomSetCount; --i >= 0; ) {
this.asc.setModelInfoForSet ("fileName", this.filePath, i);
this.asc.setModelInfoForSet ("fileType", fileType, i);
}
this.asc.freeze (this.reverseModels);
if (this.asc.errorMessage != null) return this.asc.errorMessage + "\nfor file " + this.filePath + "\ntype " + name;
if ((this.asc.bsAtoms == null ? this.asc.ac == 0 : this.asc.bsAtoms.nextSetBit (0) < 0) && fileType.indexOf ("DataOnly") < 0 && this.asc.atomSetInfo.get ("dataOnly") == null) return "No atoms found\nfor file " + this.filePath + "\ntype " + name;
this.fixBaseIndices ();
return this.asc;
});
Clazz.defineMethod (c$, "setError", 
 function (e) {
var s;
{
if (e.getMessage)
s = e.getMessage();
else
s = e.toString();
}if (this.line == null) this.asc.errorMessage = "Error reading file at end of file \n" + s;
 else this.asc.errorMessage = "Error reading file at line " + this.ptLine + ":\n" + this.line + "\n" + s;
e.printStackTrace ();
}, "Throwable");
Clazz.defineMethod (c$, "initialize", 
 function () {
if (this.htParams.containsKey ("baseAtomIndex")) this.baseAtomIndex = (this.htParams.get ("baseAtomIndex")).intValue ();
this.initializeSymmetry ();
this.vwr = this.htParams.remove ("vwr");
if (this.htParams.containsKey ("stateScriptVersionInt")) this.stateScriptVersionInt = (this.htParams.get ("stateScriptVersionInt")).intValue ();
var o = this.htParams.get ("packingError");
if (o != null) this.packingError = (o).floatValue ();
 else if (this.htParams.get ("legacyJavaFloat") != null) {
this.fixJavaFloat = false;
}this.merging = this.htParams.containsKey ("merging");
this.getHeader = this.htParams.containsKey ("getHeader");
this.isSequential = this.htParams.containsKey ("isSequential");
this.readerName = this.htParams.get ("readerName");
if (this.htParams.containsKey ("outputChannel")) this.out = this.htParams.get ("outputChannel");
if (this.htParams.containsKey ("vibrationNumber")) this.desiredVibrationNumber = (this.htParams.get ("vibrationNumber")).intValue ();
 else if (this.htParams.containsKey ("modelNumber")) this.desiredModelNumber = (this.htParams.get ("modelNumber")).intValue ();
this.applySymmetryToBonds = this.htParams.containsKey ("applySymmetryToBonds");
this.bsFilter = (this.requiresBSFilter ? this.htParams.get ("bsFilter") : null);
this.setFilter (null);
this.fillRange = this.htParams.get ("fillRange");
if (this.strSupercell != null) {
if (!this.checkFilterKey ("NOPACK")) this.forcePacked = true;
}o = this.htParams.get ("supercell");
if (Clazz.instanceOf (o, JU.P3)) {
var s = this.ptSupercell = o;
this.strSupercell = (Clazz.floatToInt (s.x)) + "a," + (Clazz.floatToInt (s.y)) + "b," + (Clazz.floatToInt (s.z)) + "c";
} else if (Clazz.instanceOf (o, String)) {
this.strSupercell = o;
}var ptFile = (this.htParams.containsKey ("ptFile") ? (this.htParams.get ("ptFile")).intValue () : -1);
this.isTrajectory = this.htParams.containsKey ("isTrajectory");
if (ptFile > 0 && this.htParams.containsKey ("firstLastSteps")) {
var val = (this.htParams.get ("firstLastSteps")).get (ptFile - 1);
if (Clazz.instanceOf (val, JU.BS)) {
this.bsModels = val;
} else {
this.firstLastStep = val;
}} else if (this.htParams.containsKey ("firstLastStep")) {
this.firstLastStep = this.htParams.get ("firstLastStep");
} else if (this.htParams.containsKey ("bsModels")) {
this.bsModels = this.htParams.get ("bsModels");
}this.useFileModelNumbers = this.htParams.containsKey ("useFileModelNumbers") || this.checkFilterKey ("USEFILEMODELNUMBERS");
if (this.htParams.containsKey ("templateAtomCount")) this.templateAtomCount = (this.htParams.get ("templateAtomCount")).intValue ();
if (this.bsModels != null || this.firstLastStep != null) this.desiredModelNumber = -2147483648;
if (this.bsModels == null && this.firstLastStep != null) {
if (this.firstLastStep[0] < 0) this.firstLastStep[0] = 0;
if (this.firstLastStep[2] == 0 || this.firstLastStep[1] < this.firstLastStep[0]) this.firstLastStep[1] = -1;
if (this.firstLastStep[2] < 1) this.firstLastStep[2] = 1;
this.bsModels = JU.BSUtil.newAndSetBit (this.firstLastStep[0]);
if (this.firstLastStep[1] > this.firstLastStep[0]) {
for (var i = this.firstLastStep[0]; i <= this.firstLastStep[1]; i += this.firstLastStep[2]) this.bsModels.set (i);

}}if (this.bsModels != null && (this.firstLastStep == null || this.firstLastStep[1] != -1)) this.lastModelNumber = this.bsModels.length ();
this.symmetryRange = (this.htParams.containsKey ("symmetryRange") ? (this.htParams.get ("symmetryRange")).floatValue () : 0);
this.initializeSymmetryOptions ();
if (this.htParams.containsKey ("spaceGroupIndex")) {
this.desiredSpaceGroupIndex = (this.htParams.get ("spaceGroupIndex")).intValue ();
if (this.desiredSpaceGroupIndex == -2) this.sgName = this.htParams.get ("spaceGroupName");
this.ignoreFileSpaceGroupName = (this.desiredSpaceGroupIndex == -2 || this.desiredSpaceGroupIndex >= 0);
this.ignoreFileSymmetryOperators = (this.desiredSpaceGroupIndex != -1);
}if (this.htParams.containsKey ("unitCellOffset")) {
this.fileScaling = JU.P3.new3 (1, 1, 1);
this.fileOffset = this.htParams.get ("unitCellOffset");
this.fileOffsetFractional = JU.P3.newP (this.fileOffset);
this.unitCellOffsetFractional = this.htParams.containsKey ("unitCellOffsetFractional");
}if (this.htParams.containsKey ("unitcell")) {
var fParams = this.htParams.get ("unitcell");
if (this.merging) this.setFractionalCoordinates (true);
if (fParams.length == 9) {
this.addExplicitLatticeVector (0, fParams, 0);
this.addExplicitLatticeVector (1, fParams, 3);
this.addExplicitLatticeVector (2, fParams, 6);
} else {
this.setUnitCell (fParams[0], fParams[1], fParams[2], fParams[3], fParams[4], fParams[5]);
}this.ignoreFileUnitCell = this.iHaveUnitCell;
if (this.merging && !this.iHaveUnitCell) this.setFractionalCoordinates (false);
}this.domains = this.htParams.get ("domains");
this.validation = this.htParams.get ("validation");
this.dssr = this.htParams.get ("dssr");
this.isConcatenated = this.htParams.containsKey ("concatenate");
});
Clazz.defineMethod (c$, "initializeSymmetryOptions", 
function () {
this.latticeCells =  Clazz.newIntArray (4, 0);
this.doApplySymmetry = false;
var pt = this.htParams.get ("lattice");
if (pt == null || pt.length () == 0) {
if (!this.forcePacked && this.strSupercell == null) return;
pt = JU.P3.new3 (1, 1, 1);
}this.latticeCells[0] = Clazz.floatToInt (pt.x);
this.latticeCells[1] = Clazz.floatToInt (pt.y);
this.latticeCells[2] = Clazz.floatToInt (pt.z);
if (Clazz.instanceOf (pt, JU.T4)) this.latticeCells[3] = Clazz.floatToInt ((pt).w);
this.doCentroidUnitCell = (this.htParams.containsKey ("centroid"));
if (this.doCentroidUnitCell && (this.latticeCells[2] == -1 || this.latticeCells[2] == 0)) this.latticeCells[2] = 1;
var isPacked = this.forcePacked || this.htParams.containsKey ("packed");
this.centroidPacked = this.doCentroidUnitCell && isPacked;
this.doPackUnitCell = !this.doCentroidUnitCell && (isPacked || this.latticeCells[2] < 0);
this.doApplySymmetry = (this.latticeCells[0] > 0 && this.latticeCells[1] > 0);
if (!this.doApplySymmetry) this.latticeCells =  Clazz.newIntArray (3, 0);
});
Clazz.defineMethod (c$, "doGetModel", 
function (modelNumber, title) {
if (title != null && this.nameRequired != null && this.nameRequired.length > 0 && title.toUpperCase ().indexOf (this.nameRequired) < 0) return false;
var isOK = (this.bsModels == null ? this.desiredModelNumber < 1 || modelNumber == this.desiredModelNumber : modelNumber > this.lastModelNumber ? false : modelNumber > 0 && this.bsModels.get (modelNumber - 1) || this.haveModel && this.firstLastStep != null && this.firstLastStep[1] < 0 && (this.firstLastStep[2] < 2 || (modelNumber - 1 - this.firstLastStep[0]) % this.firstLastStep[2] == 0));
if (isOK && this.desiredModelNumber == 0) this.discardPreviousAtoms ();
this.haveModel = new Boolean (this.haveModel | isOK).valueOf ();
if (isOK) this.doProcessLines = true;
return isOK;
}, "~N,~S");
Clazz.defineMethod (c$, "discardPreviousAtoms", 
function () {
this.asc.discardPreviousAtoms ();
});
Clazz.defineMethod (c$, "initializeSymmetry", 
function () {
this.previousSpaceGroup = this.sgName;
this.previousUnitCell = this.unitCellParams;
this.iHaveUnitCell = this.ignoreFileUnitCell;
if (!this.ignoreFileUnitCell) {
this.unitCellParams =  Clazz.newFloatArray (26, 0);
for (var i = 25; --i >= 0; ) this.unitCellParams[i] = NaN;

this.unitCellParams[25] = this.latticeScaling;
this.symmetry = null;
}if (!this.ignoreFileSpaceGroupName) this.sgName = "unspecified!";
this.doCheckUnitCell = false;
});
Clazz.defineMethod (c$, "newAtomSet", 
function (name) {
if (this.asc.iSet >= 0) {
this.asc.newAtomSet ();
this.asc.setCollectionName ("<collection of " + (this.asc.iSet + 1) + " models>");
} else {
this.asc.setCollectionName (name);
}this.asc.setModelInfoForSet ("name", name, Math.max (0, this.asc.iSet));
this.asc.setAtomSetName (name);
}, "~S");
Clazz.defineMethod (c$, "cloneLastAtomSet", 
function (ac, pts) {
var lastAtomCount = this.asc.getLastAtomSetAtomCount ();
this.asc.cloneLastAtomSetFromPoints (ac, pts);
if (this.asc.haveUnitCell) {
this.iHaveUnitCell = true;
this.doCheckUnitCell = true;
this.sgName = this.previousSpaceGroup;
this.unitCellParams = this.previousUnitCell;
}return lastAtomCount;
}, "~N,~A");
Clazz.defineMethod (c$, "setSpaceGroupName", 
function (name) {
if (this.ignoreFileSpaceGroupName || name == null) return;
var s = name.trim ();
if (s.equals (this.sgName)) return;
if (!s.equals ("P1")) JU.Logger.info ("Setting space group name to " + s);
this.sgName = s;
}, "~S");
Clazz.defineMethod (c$, "setSymmetryOperator", 
function (xyz) {
if (this.ignoreFileSymmetryOperators) return -1;
var isym = this.asc.getXSymmetry ().addSpaceGroupOperation (xyz, true);
if (isym < 0) JU.Logger.warn ("Skippings symmetry operation " + xyz);
this.iHaveSymmetryOperators = true;
return isym;
}, "~S");
Clazz.defineMethod (c$, "initializeCartesianToFractional", 
 function () {
for (var i = 0; i < 16; i++) if (!Float.isNaN (this.unitCellParams[6 + i])) return;

for (var i = 0; i < 16; i++) this.unitCellParams[6 + i] = ((i % 5 == 0 ? 1 : 0));

this.nMatrixElements = 0;
});
Clazz.defineMethod (c$, "clearUnitCell", 
function () {
if (this.ignoreFileUnitCell) return;
for (var i = 6; i < 22; i++) this.unitCellParams[i] = NaN;

this.checkUnitCell (6);
});
Clazz.defineMethod (c$, "setUnitCellItem", 
function (i, x) {
if (this.ignoreFileUnitCell) return;
if (i == 0 && x == 1 && !this.checkFilterKey ("TOPOS") || i == 3 && x == 0) return;
if (!Float.isNaN (x) && i >= 6 && Float.isNaN (this.unitCellParams[6])) this.initializeCartesianToFractional ();
this.unitCellParams[i] = x;
if (this.debugging) {
JU.Logger.debug ("setunitcellitem " + i + " " + x);
}if (i < 6 || Float.isNaN (x)) this.iHaveUnitCell = this.checkUnitCell (6);
 else if (++this.nMatrixElements == 12) this.iHaveUnitCell = this.checkUnitCell (22);
}, "~N,~N");
Clazz.defineMethod (c$, "setUnitCell", 
function (a, b, c, alpha, beta, gamma) {
if (this.ignoreFileUnitCell) return;
this.clearUnitCell ();
this.unitCellParams[0] = a;
this.unitCellParams[1] = b;
this.unitCellParams[2] = c;
if (alpha != 0) this.unitCellParams[3] = alpha;
if (beta != 0) this.unitCellParams[4] = beta;
if (gamma != 0) this.unitCellParams[5] = gamma;
this.iHaveUnitCell = this.checkUnitCell (6);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addExplicitLatticeVector", 
function (i, xyz, i0) {
if (this.ignoreFileUnitCell) return;
if (i == 0) for (var j = 0; j < 6; j++) this.unitCellParams[j] = 0;

i = 6 + i * 3;
this.unitCellParams[i++] = xyz[i0++];
this.unitCellParams[i++] = xyz[i0++];
this.unitCellParams[i] = xyz[i0];
if (Float.isNaN (this.unitCellParams[0])) {
for (i = 0; i < 6; i++) this.unitCellParams[i] = -1;

}this.iHaveUnitCell = this.checkUnitCell (15);
}, "~N,~A,~N");
Clazz.defineMethod (c$, "checkUnitCell", 
 function (n) {
for (var i = 0; i < n; i++) if (Float.isNaN (this.unitCellParams[i])) return false;

if (n == 22 && this.unitCellParams[0] == 1) {
if (this.unitCellParams[1] == 1 && this.unitCellParams[2] == 1 && this.unitCellParams[6] == 1 && this.unitCellParams[11] == 1 && this.unitCellParams[16] == 1) return false;
}if (this.doApplySymmetry) {
this.getSymmetry ();
this.doConvertToFractional = !this.fileCoordinatesAreFractional;
}return true;
}, "~N");
Clazz.defineMethod (c$, "getSymmetry", 
function () {
if (!this.iHaveUnitCell) return null;
if (this.symmetry == null) {
this.getNewSymmetry ().setUnitCell (this.unitCellParams, false);
this.checkUnitCellOffset ();
}if (this.symmetry == null) this.iHaveUnitCell = false;
 else this.symmetry.setSpaceGroupName (this.sgName);
return this.symmetry;
});
Clazz.defineMethod (c$, "checkUnitCellOffset", 
 function () {
if (this.fileOffsetFractional == null || this.symmetry == null) return;
this.fileOffset.setT (this.fileOffsetFractional);
if (this.unitCellOffsetFractional != this.fileCoordinatesAreFractional) {
if (this.unitCellOffsetFractional) this.symmetry.toCartesian (this.fileOffset, false);
 else this.symmetry.toFractional (this.fileOffset, false);
}});
Clazz.defineMethod (c$, "fractionalizeCoordinates", 
function (toFrac) {
if (this.getSymmetry () == null) return;
var a = this.asc.atoms;
if (toFrac) for (var i = this.asc.ac; --i >= 0; ) this.symmetry.toFractional (a[i], false);

 else for (var i = this.asc.ac; --i >= 0; ) this.symmetry.toCartesian (a[i], false);

this.setFractionalCoordinates (toFrac);
}, "~B");
Clazz.defineMethod (c$, "getNewSymmetry", 
function () {
return this.symmetry = this.getInterface ("JS.Symmetry");
});
Clazz.defineMethod (c$, "setFractionalCoordinates", 
function (TF) {
this.iHaveFractionalCoordinates = this.fileCoordinatesAreFractional = TF;
this.checkUnitCellOffset ();
}, "~B");
Clazz.defineMethod (c$, "setFilterAtomTypeStr", 
function (s) {
this.filterAtomTypeStr = s;
this.filterAtomNameTerminator = "\0";
}, "~S");
Clazz.defineMethod (c$, "setFilter", 
function (filter0) {
if (filter0 == null) {
filter0 = this.htParams.get ("filter");
} else {
this.bsFilter = null;
}if (filter0 != null) filter0 = filter0.toUpperCase ();
this.filter = filter0;
this.doSetOrientation = !this.checkFilterKey ("NOORIENT");
this.doCentralize = (!this.checkFilterKey ("NOCENTER") && this.checkFilterKey ("CENTER"));
this.addVibrations = !this.checkFilterKey ("NOVIB");
this.ignoreStructure = this.checkFilterKey ("DSSP");
this.isDSSP1 = this.checkFilterKey ("DSSP1");
this.doReadMolecularOrbitals = !this.checkFilterKey ("NOMO");
this.useAltNames = this.checkFilterKey ("ALTNAME");
this.reverseModels = this.checkFilterKey ("REVERSEMODELS");
if (this.filter == null) return;
if (this.checkFilterKey ("HETATM")) {
this.filterHetero = true;
this.filter = JU.PT.rep (this.filter, "HETATM", "HETATM-Y");
}if (this.checkFilterKey ("ATOM")) {
this.filterHetero = true;
this.filter = JU.PT.rep (this.filter, "ATOM", "HETATM-N");
}if (this.checkFilterKey ("CELL=")) this.strSupercell = this.filter.substring (this.filter.indexOf ("CELL=") + 5).toLowerCase ();
this.nameRequired = JU.PT.getQuotedAttribute (this.filter, "NAME");
if (this.nameRequired != null) {
if (this.nameRequired.startsWith ("'")) this.nameRequired = JU.PT.split (this.nameRequired, "'")[1];
 else if (this.nameRequired.startsWith ("\"")) this.nameRequired = JU.PT.split (this.nameRequired, "\"")[1];
this.filter = JU.PT.rep (this.filter, this.nameRequired, "");
filter0 = this.filter = JU.PT.rep (this.filter, "NAME=", "");
}this.filterAtomName = this.checkFilterKey ("*.") || this.checkFilterKey ("!.");
this.filterElement = this.checkFilterKey ("_");
this.filterGroup3 = this.checkFilterKey ("[");
this.filterChain = this.checkFilterKey (":");
this.filterAltLoc = this.checkFilterKey ("%");
this.filterEveryNth = this.checkFilterKey ("/=");
if (this.filterEveryNth) this.filterN = this.parseIntAt (this.filter, this.filter.indexOf ("/=") + 2);
 else this.filterAtomType = this.checkFilterKey ("=");
if (this.filterN == -2147483648) this.filterEveryNth = false;
this.haveAtomFilter = this.filterAtomName || this.filterAtomType || this.filterElement || this.filterGroup3 || this.filterChain || this.filterAltLoc || this.filterHetero || this.filterEveryNth || this.checkFilterKey ("/=");
if (this.bsFilter == null) {
this.bsFilter =  new JU.BS ();
this.htParams.put ("bsFilter", this.bsFilter);
this.filter = (";" + this.filter + ";").$replace (',', ';');
var s = this.getFilter ("LATTICESCALING=");
if (s != null && this.unitCellParams.length > 25) this.unitCellParams[25] = this.latticeScaling = this.parseFloatStr (s);
s = this.getFilter ("SYMOP=");
if (s != null) this.filterSymop = " " + s + " ";
JU.Logger.info ("filtering with " + this.filter);
if (this.haveAtomFilter) {
var ipt;
this.filter1 = this.filter;
if ((ipt = this.filter.indexOf ("|")) >= 0) {
this.filter1 = this.filter.substring (0, ipt).trim () + ";";
this.filter2 = ";" + this.filter.substring (ipt).trim ();
}}}}, "~S");
Clazz.defineMethod (c$, "getFilter", 
function (key) {
var pt = (this.filter == null ? -1 : this.filter.indexOf (key));
return (pt < 0 ? null : this.filter.substring (pt + key.length, this.filter.indexOf (";", pt)));
}, "~S");
Clazz.defineMethod (c$, "checkFilterKey", 
function (key) {
return (this.filter != null && this.filter.indexOf (key) >= 0);
}, "~S");
Clazz.defineMethod (c$, "filterAtom", 
function (atom, iAtom) {
if (!this.haveAtomFilter) return true;
var isOK = this.checkFilter (atom, this.filter1);
if (this.filter2 != null) isOK = new Boolean (isOK | this.checkFilter (atom, this.filter2)).valueOf ();
if (isOK && this.filterEveryNth) isOK = (((this.nFiltered++) % this.filterN) == 0);
this.bsFilter.setBitTo (iAtom >= 0 ? iAtom : this.asc.ac, isOK);
return isOK;
}, "J.adapter.smarter.Atom,~N");
Clazz.defineMethod (c$, "checkFilter", 
 function (atom, f) {
return (!this.filterGroup3 || atom.group3 == null || !this.filterReject (f, "[", atom.group3.toUpperCase () + "]")) && (!this.filterAtomName || this.allowAtomName (atom.atomName, f)) && (this.filterAtomTypeStr == null || atom.atomName == null || atom.atomName.toUpperCase ().indexOf ("\0" + this.filterAtomTypeStr) >= 0) && (!this.filterElement || atom.elementSymbol == null || !this.filterReject (f, "_", atom.elementSymbol.toUpperCase () + ";")) && (!this.filterChain || atom.chainID == 0 || !this.filterReject (f, ":", "" + this.vwr.getChainIDStr (atom.chainID))) && (!this.filterAltLoc || atom.altLoc == '\0' || !this.filterReject (f, "%", "" + atom.altLoc)) && (!this.filterHetero || !this.allowPDBFilter || !this.filterReject (f, "HETATM", atom.isHetero ? "-Y" : "-N"));
}, "J.adapter.smarter.Atom,~S");
Clazz.defineMethod (c$, "rejectAtomName", 
function (name) {
return this.filterAtomName && !this.allowAtomName (name, this.filter);
}, "~S");
Clazz.defineMethod (c$, "allowAtomName", 
 function (atomName, f) {
return (atomName == null || !this.filterReject (f, ".", atomName.toUpperCase () + this.filterAtomNameTerminator));
}, "~S,~S");
Clazz.defineMethod (c$, "filterReject", 
function (f, code, atomCode) {
return (f.indexOf (code) >= 0 && (f.indexOf ("!" + code) >= 0) == (f.indexOf (code + atomCode) >= 0));
}, "~S,~S,~S");
Clazz.defineMethod (c$, "set2D", 
function () {
this.asc.setInfo ("is2D", Boolean.TRUE);
if (!this.checkFilterKey ("NOMIN")) this.asc.setInfo ("doMinimize", Boolean.TRUE);
});
Clazz.defineMethod (c$, "doGetVibration", 
function (vibrationNumber) {
return this.addVibrations && (this.desiredVibrationNumber <= 0 || vibrationNumber == this.desiredVibrationNumber);
}, "~N");
Clazz.defineMethod (c$, "setTransform", 
function (x1, y1, z1, x2, y2, z2, x3, y3, z3) {
if (this.matRot != null || !this.doSetOrientation) return;
this.matRot =  new JU.M3 ();
var v = JU.V3.new3 (x1, y1, z1);
v.normalize ();
this.matRot.setColumnV (0, v);
v.set (x2, y2, z2);
v.normalize ();
this.matRot.setColumnV (1, v);
v.set (x3, y3, z3);
v.normalize ();
this.matRot.setColumnV (2, v);
this.asc.setInfo ("defaultOrientationMatrix", JU.M3.newM3 (this.matRot));
var q = JU.Quat.newM (this.matRot);
this.asc.setInfo ("defaultOrientationQuaternion", q);
JU.Logger.info ("defaultOrientationMatrix = " + this.matRot);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAtomCoordXYZ", 
function (atom, x, y, z) {
atom.set (x, y, z);
this.setAtomCoord (atom);
}, "J.adapter.smarter.Atom,~N,~N,~N");
Clazz.defineMethod (c$, "setAtomCoordScaled", 
function (atom, tokens, i, f) {
if (atom == null) atom = this.asc.addNewAtom ();
this.setAtomCoordXYZ (atom, this.parseFloatStr (tokens[i]) * f, this.parseFloatStr (tokens[i + 1]) * f, this.parseFloatStr (tokens[i + 2]) * f);
return atom;
}, "J.adapter.smarter.Atom,~A,~N,~N");
Clazz.defineMethod (c$, "setAtomCoordTokens", 
function (atom, tokens, i) {
this.setAtomCoordXYZ (atom, this.parseFloatStr (tokens[i]), this.parseFloatStr (tokens[i + 1]), this.parseFloatStr (tokens[i + 2]));
}, "J.adapter.smarter.Atom,~A,~N");
Clazz.defineMethod (c$, "addAtomXYZSymName", 
function (tokens, i, sym, name) {
var atom = this.asc.addNewAtom ();
if (sym != null) atom.elementSymbol = sym;
if (name != null) atom.atomName = name;
this.setAtomCoordTokens (atom, tokens, i);
return atom;
}, "~A,~N,~S,~S");
Clazz.defineMethod (c$, "setAtomCoord", 
function (atom) {
var mustFractionalize = (this.doConvertToFractional && !this.fileCoordinatesAreFractional && this.getSymmetry () != null);
if (this.fileScaling != null) {
atom.x = atom.x * this.fileScaling.x + this.fileOffset.x;
atom.y = atom.y * this.fileScaling.y + this.fileOffset.y;
atom.z = atom.z * this.fileScaling.z + this.fileOffset.z;
}if (mustFractionalize) {
if (!this.symmetry.haveUnitCell ()) this.symmetry.setUnitCell (this.unitCellParams, false);
this.symmetry.toFractional (atom, false);
this.iHaveFractionalCoordinates = true;
}if (this.fixJavaFloat && this.fileCoordinatesAreFractional) JU.PT.fixPtFloats (atom, 100000.0);
this.doCheckUnitCell = true;
}, "J.adapter.smarter.Atom");
Clazz.defineMethod (c$, "addSites", 
function (htSites) {
this.asc.setCurrentModelInfo ("pdbSites", htSites);
var sites = "";
for (var entry, $entry = htSites.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var name = entry.getKey ();
var htSite = entry.getValue ();
var ch;
for (var i = name.length; --i >= 0; ) if (!JU.PT.isLetterOrDigit (ch = name.charAt (i)) && ch != '\'') name = name.substring (0, i) + "_" + name.substring (i + 1);

var groups = htSite.get ("groups");
if (groups.length == 0) continue;
this.addSiteScript ("@site_" + name + " " + groups);
this.addSiteScript ("site_" + name + " = [\"" + JU.PT.rep (groups, ",", "\",\"") + "\"]");
sites += ",\"site_" + name + "\"";
}
if (sites.length > 0) this.addSiteScript ("site_list = [" + sites.substring (1) + "]");
}, "java.util.Map");
Clazz.defineMethod (c$, "applySymmetryAndSetTrajectory", 
function () {
this.applySymTrajASCR ();
});
Clazz.defineMethod (c$, "applySymTrajASCR", 
function () {
if (this.forcePacked) this.initializeSymmetryOptions ();
var sym = (this.iHaveUnitCell && this.doCheckUnitCell ? this.asc.getXSymmetry ().applySymmetryFromReader (this.getSymmetry ()) : null);
if (sym == null) this.asc.setTensors ();
if (this.isTrajectory) this.asc.setTrajectory ();
if (this.moreUnitCellInfo != null) {
this.asc.setCurrentModelInfo ("moreUnitCellInfo", this.moreUnitCellInfo);
this.moreUnitCellInfo = null;
}this.finalizeSubclassSymmetry (sym != null);
this.initializeSymmetry ();
return sym;
});
Clazz.defineMethod (c$, "finalizeSubclassSymmetry", 
function (haveSymmetry) {
}, "~B");
Clazz.defineMethod (c$, "doPreSymmetry", 
function () {
});
Clazz.defineMethod (c$, "finalizeMOData", 
function (moData) {
this.asc.setCurrentModelInfo ("moData", moData);
if (moData == null) return;
var orbitals = moData.get ("mos");
if (orbitals != null) JU.Logger.info (orbitals.size () + " molecular orbitals read in model " + this.asc.atomSetCount);
}, "java.util.Map");
c$.getElementSymbol = Clazz.defineMethod (c$, "getElementSymbol", 
function (elementNumber) {
return J.api.JmolAdapter.getElementSymbol (elementNumber);
}, "~N");
Clazz.defineMethod (c$, "fillDataBlock", 
function (data, minLineLen) {
var nLines = data.length;
for (var i = 0; i < nLines; i++) {
data[i] = JU.PT.getTokens (this.discardLinesUntilNonBlank ());
if (data[i].length < minLineLen) --i;
}
}, "~A,~N");
Clazz.defineMethod (c$, "fill3x3", 
function (tokens, pt) {
var a =  Clazz.newDoubleArray (3, 3, 0);
var needTokens = (tokens == null);
var pt0 = pt;
for (var i = 0; i < 3; i++) {
if (needTokens || pt >= tokens.length) {
while ((tokens = JU.PT.getTokens (this.rd ())).length < 3) {
}
pt = (pt0 < 0 ? tokens.length + pt0 : pt0);
}for (var j = 0; j < 3; j++) a[i][j] = Double.$valueOf (tokens[pt++]).doubleValue ();

}
return a;
}, "~A,~N");
Clazz.defineMethod (c$, "fillFloatArray", 
function (s, width, data) {
var tokens =  new Array (0);
var pt = 0;
for (var i = 0; i < data.length; i++) {
while (tokens != null && pt >= tokens.length) {
if (s == null) s = this.rd ();
if (width == 0) {
tokens = JU.PT.getTokens (s);
} else {
tokens =  new Array (Clazz.doubleToInt (s.length / width));
for (var j = 0; j < tokens.length; j++) tokens[j] = s.substring (j * width, (j + 1) * width);

}s = null;
pt = 0;
}
if (tokens == null) break;
data[i] = this.parseFloatStr (tokens[pt++]);
}
return data;
}, "~S,~N,~A");
Clazz.defineMethod (c$, "fillFrequencyData", 
function (iAtom0, ac, modelAtomCount, ignore, isWide, col0, colWidth, atomIndexes, minLineLen, data) {
var withSymmetry = (ac != 0 && modelAtomCount != ac && data == null);
if (ac == 0 && atomIndexes != null) ac = atomIndexes.length;
var nLines = (isWide ? ac : ac * 3);
var nFreq = ignore.length;
if (data == null) {
data =  new Array (nLines);
this.fillDataBlockFixed (data, col0, colWidth, minLineLen);
} else if (!isWide) {
var ptNonblank = minLineLen;
this.fillDataBlockFixed (data, col0, colWidth, -ptNonblank);
if (data[0] == null) return;
iAtom0 += this.parseIntAt (this.line, ptNonblank - 5) - 1;
}for (var i = 0, atomPt = 0; i < nLines; i++, atomPt++) {
var values = data[i];
var valuesY = (isWide ? null : data[++i]);
var valuesZ = (isWide ? null : data[++i]);
var dataPt = values.length - (isWide ? nFreq * 3 : nFreq) - 1;
for (var j = 0, jj = 0; jj < nFreq; jj++) {
++dataPt;
var x = values[dataPt];
if (x.charAt (0) == ')') x = x.substring (1);
var vx = this.parseFloatStr (x);
var vy = this.parseFloatStr (isWide ? values[++dataPt] : valuesY[dataPt]);
var vz = this.parseFloatStr (isWide ? values[++dataPt] : valuesZ[dataPt]);
if (ignore[jj]) continue;
var iAtom = (atomIndexes == null ? atomPt : atomIndexes[atomPt]);
if (iAtom < 0) continue;
iAtom += iAtom0 + modelAtomCount * j++;
if (this.debugging) JU.Logger.debug ("atom " + iAtom + " vib" + j + ": " + vx + " " + vy + " " + vz);
this.asc.addVibrationVectorWithSymmetry (iAtom, vx, vy, vz, withSymmetry);
}
}
}, "~N,~N,~N,~A,~B,~N,~N,~A,~N,~A");
Clazz.defineMethod (c$, "fillDataBlockFixed", 
function (data, col0, colWidth, minLineLen) {
if (colWidth == 0) {
this.fillDataBlock (data, minLineLen);
return;
}var nLines = data.length;
for (var i = 0; i < nLines; i++) {
this.discardLinesUntilNonBlank ();
if (minLineLen < 0 && this.line.charAt (-minLineLen) == ' ') {
data[0] = null;
return;
}var nFields = Clazz.doubleToInt ((this.line.length - col0 + 1) / colWidth);
data[i] =  new Array (nFields);
for (var j = 0, start = col0; j < nFields; j++, start += colWidth) data[i][j] = this.line.substring (start, Math.min (this.line.length, start + colWidth));

}
}, "~A,~N,~N,~N");
Clazz.defineMethod (c$, "readLines", 
function (nLines) {
for (var i = nLines; --i >= 0; ) this.rd ();

return this.line;
}, "~N");
Clazz.defineMethod (c$, "discardLinesUntilStartsWith", 
function (startsWith) {
while (this.rd () != null && !this.line.startsWith (startsWith)) {
}
return this.line;
}, "~S");
Clazz.defineMethod (c$, "discardLinesUntilContains", 
function (containsMatch) {
while (this.rd () != null && this.line.indexOf (containsMatch) < 0) {
}
return this.line;
}, "~S");
Clazz.defineMethod (c$, "discardLinesUntilContains2", 
function (s1, s2) {
while (this.rd () != null && this.line.indexOf (s1) < 0 && this.line.indexOf (s2) < 0) {
}
return this.line;
}, "~S,~S");
Clazz.defineMethod (c$, "discardLinesUntilBlank", 
function () {
while (this.rd () != null && this.line.trim ().length != 0) {
}
return this.line;
});
Clazz.defineMethod (c$, "discardLinesUntilNonBlank", 
function () {
while (this.rd () != null && this.line.trim ().length == 0) {
}
return this.line;
});
Clazz.defineMethod (c$, "checkLineForScript", 
function (line) {
this.line = line;
this.checkCurrentLineForScript ();
}, "~S");
Clazz.defineMethod (c$, "checkCurrentLineForScript", 
function () {
if (this.line.endsWith ("#noautobond")) {
this.line = this.line.substring (0, this.line.lastIndexOf ('#')).trim ();
this.asc.setNoAutoBond ();
}var pt = this.line.indexOf ("jmolscript:");
if (pt >= 0) {
var script = this.line.substring (pt + 11, this.line.length);
if (script.indexOf ("#") >= 0) {
script = script.substring (0, script.indexOf ("#"));
}this.addJmolScript (script);
this.line = this.line.substring (0, pt).trim ();
}});
Clazz.defineMethod (c$, "addJmolScript", 
function (script) {
JU.Logger.info ("#jmolScript: " + script);
if (this.previousScript == null) this.previousScript = "";
 else if (!this.previousScript.endsWith (";")) this.previousScript += ";";
this.previousScript += script;
this.asc.setInfo ("jmolscript", this.previousScript);
}, "~S");
Clazz.defineMethod (c$, "addSiteScript", 
function (script) {
if (this.siteScript == null) this.siteScript = "";
 else if (!this.siteScript.endsWith (";")) this.siteScript += ";";
this.siteScript += script;
this.asc.setInfo ("sitescript", this.siteScript);
}, "~S");
Clazz.defineMethod (c$, "rd", 
function () {
return this.RL ();
});
Clazz.defineMethod (c$, "RL", 
function () {
this.prevline = this.line;
this.line = this.reader.readLine ();
if (this.out != null && this.line != null) this.out.append (this.line).append ("\n");
this.ptLine++;
if (this.debugging && this.line != null) JU.Logger.debug (this.line);
return this.line;
});
c$.getStrings = Clazz.defineMethod (c$, "getStrings", 
function (sinfo, nFields, width) {
var fields =  new Array (nFields);
for (var i = 0, pt = 0; i < nFields; i++, pt += width) fields[i] = sinfo.substring (pt, pt + width);

return fields;
}, "~S,~N,~N");
Clazz.defineMethod (c$, "getTokens", 
function () {
return JU.PT.getTokens (this.line);
});
c$.getTokensFloat = Clazz.defineMethod (c$, "getTokensFloat", 
function (s, f, n) {
if (f == null) f =  Clazz.newFloatArray (n, 0);
JU.PT.parseFloatArrayDataN (JU.PT.getTokens (s), f, n);
return f;
}, "~S,~A,~N");
Clazz.defineMethod (c$, "parseFloat", 
function () {
return JU.PT.parseFloatNext (this.line, this.next);
});
Clazz.defineMethod (c$, "parseFloatStr", 
function (s) {
this.next[0] = 0;
return JU.PT.parseFloatNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseFloatRange", 
function (s, iStart, iEnd) {
this.next[0] = iStart;
return JU.PT.parseFloatRange (s, iEnd, this.next);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "parseInt", 
function () {
return JU.PT.parseIntNext (this.line, this.next);
});
Clazz.defineMethod (c$, "parseIntStr", 
function (s) {
this.next[0] = 0;
return JU.PT.parseIntNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseIntAt", 
function (s, iStart) {
this.next[0] = iStart;
return JU.PT.parseIntNext (s, this.next);
}, "~S,~N");
Clazz.defineMethod (c$, "parseIntRange", 
function (s, iStart, iEnd) {
this.next[0] = iStart;
return JU.PT.parseIntRange (s, iEnd, this.next);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "parseToken", 
function () {
return JU.PT.parseTokenNext (this.line, this.next);
});
Clazz.defineMethod (c$, "parseTokenStr", 
function (s) {
this.next[0] = 0;
return JU.PT.parseTokenNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseTokenNext", 
function (s) {
return JU.PT.parseTokenNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseTokenRange", 
function (s, iStart, iEnd) {
this.next[0] = iStart;
return JU.PT.parseTokenRange (s, iEnd, this.next);
}, "~S,~N,~N");
c$.getFortranFormatLengths = Clazz.defineMethod (c$, "getFortranFormatLengths", 
function (s) {
var vdata =  new JU.Lst ();
var n = 0;
var c = 0;
var factor = 1;
var inN = false;
var inCount = true;
s += ",";
for (var i = 0; i < s.length; i++) {
var ch = s.charAt (i);
switch (ch) {
case '.':
inN = false;
continue;
case ',':
for (var j = 0; j < c; j++) vdata.addLast (Integer.$valueOf (n * factor));

inN = false;
inCount = true;
c = 0;
continue;
case 'X':
n = c;
c = 1;
factor = -1;
continue;
}
var isDigit = JU.PT.isDigit (ch);
if (isDigit) {
if (inN) n = n * 10 + ch.charCodeAt (0) - 48;
 else if (inCount) c = c * 10 + ch.charCodeAt (0) - 48;
} else if (JU.PT.isLetter (ch)) {
n = 0;
inN = true;
inCount = false;
factor = 1;
} else {
inN = false;
}}
return vdata;
}, "~S");
Clazz.defineMethod (c$, "read3Vectors", 
function (isBohr) {
var vectors =  new Array (3);
var f =  Clazz.newFloatArray (3, 0);
for (var i = 0; i < 3; i++) {
if (i > 0 || Float.isNaN (this.parseFloatStr (this.line))) {
this.rd ();
if (i == 0 && this.line != null) {
i = -1;
continue;
}}this.fillFloatArray (this.line, 0, f);
vectors[i] =  new JU.V3 ();
vectors[i].setA (f);
if (isBohr) vectors[i].scale (0.5291772);
}
return vectors;
}, "~B");
Clazz.defineMethod (c$, "setElementAndIsotope", 
function (atom, str) {
var isotope = this.parseIntStr (str);
if (isotope == -2147483648) {
atom.elementSymbol = str;
} else {
str = str.substring (("" + isotope).length);
atom.elementNumber = (str.length == 0 ? isotope : ((isotope << 7) + J.api.JmolAdapter.getElementNumber (str)));
}}, "J.adapter.smarter.Atom,~S");
Clazz.defineMethod (c$, "finalizeModelSet", 
function () {
});
Clazz.defineMethod (c$, "setChainID", 
function (atom, label) {
atom.chainID = this.vwr.getChainID (label, true);
}, "J.adapter.smarter.Atom,~S");
Clazz.overrideMethod (c$, "readNextLine", 
function () {
if (this.rd () != null && this.line.indexOf ("#jmolscript:") >= 0) this.checkCurrentLineForScript ();
return this.line;
});
Clazz.defineMethod (c$, "appendUunitCellInfo", 
function (info) {
if (this.moreUnitCellInfo == null) this.moreUnitCellInfo =  new JU.Lst ();
this.moreUnitCellInfo.addLast (info);
this.appendLoadNote (info);
}, "~S");
Clazz.defineMethod (c$, "getInterface", 
function (className) {
var o = J.api.Interface.getInterface (className, this.vwr, "file");
if (o == null) throw  new NullPointerException ("Interface");
return o;
}, "~S");
Clazz.defineMethod (c$, "forceSymmetry", 
function (andPack) {
if (andPack) this.doPackUnitCell = andPack;
if (!this.doApplySymmetry) {
this.doApplySymmetry = true;
this.latticeCells[0] = 1;
this.latticeCells[1] = 1;
this.latticeCells[2] = 1;
}}, "~B");
Clazz.defineStatics (c$,
"ANGSTROMS_PER_BOHR", 0.5291772);
});
