Clazz.declarePackage ("JM");
Clazz.load (["java.util.Hashtable", "JU.BS"], "JM.ModelLoader", ["java.lang.Boolean", "$.Float", "$.NullPointerException", "java.util.Arrays", "JU.AU", "$.Lst", "$.P3", "$.PT", "$.SB", "$.V3", "J.api.Interface", "JM.Chain", "$.Group", "$.Model", "$.ModelSet", "JS.T", "JU.BSUtil", "$.Elements", "$.JmolMolecule", "$.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.ms = null;
this.modelSet0 = null;
this.merging = false;
this.appendNew = false;
this.jmolData = null;
this.group3Lists = null;
this.group3Counts = null;
this.specialAtomIndexes = null;
this.someModelsHaveUnitcells = false;
this.someModelsAreModulated = false;
this.is2D = false;
this.isMutate = false;
this.isTrajectory = false;
this.isPyMOLsession = false;
this.doMinimize = false;
this.doAddHydrogens = false;
this.fileHeader = null;
this.jbr = null;
this.groups = null;
this.groupCount = 0;
this.modulationTUV = null;
this.htAtomMap = null;
this.chainOf = null;
this.group3Of = null;
this.seqcodes = null;
this.firstAtomIndexes = null;
this.iModel = 0;
this.model = null;
this.currentChainID = 0;
this.isNewChain = false;
this.currentChain = null;
this.currentGroupSequenceNumber = 0;
this.currentGroupInsertionCode = '\0';
this.currentGroup3 = null;
this.nullGroup = null;
this.baseModelIndex = 0;
this.baseModelCount = 0;
this.baseAtomIndex = 0;
this.baseGroupIndex = 0;
this.baseTrajectoryCount = 0;
this.adapterModelCount = 0;
this.adapterTrajectoryCount = 0;
this.noAutoBond = false;
this.modulationOn = false;
this.htGroup1 = null;
this.$mergeGroups = null;
this.iChain = 0;
this.vStereo = null;
this.structuresDefinedInFile = null;
Clazz.instantialize (this, arguments);
}, JM, "ModelLoader");
Clazz.prepareFields (c$, function () {
this.htAtomMap =  new java.util.Hashtable ();
this.structuresDefinedInFile =  new JU.BS ();
});
Clazz.makeConstructor (c$, 
function (vwr, modelSetName, loadScript, asc, modelSet0, bsNew) {
this.vwr = vwr;
this.ms =  new JM.ModelSet (vwr, modelSetName);
var adapter = vwr.getModelAdapter ();
this.modelSet0 = modelSet0;
this.merging = (modelSet0 != null && modelSet0.ac > 0);
if (this.merging) {
this.ms.canSkipLoad = false;
} else {
vwr.resetShapes (false);
}this.ms.preserveState = vwr.getPreserveState ();
this.ms.showRebondTimes = vwr.getBoolean (603979934);
if (bsNew == null) {
this.initializeInfo (modelSetName, null);
this.createModelSet (null, null, null);
vwr.setStringProperty ("_fileType", "");
return;
}if (!this.ms.preserveState) this.ms.canSkipLoad = false;
var info = adapter.getAtomSetCollectionAuxiliaryInfo (asc);
info.put ("loadScript", loadScript);
this.initializeInfo (adapter.getFileTypeName (asc).toLowerCase ().intern (), info);
this.createModelSet (adapter, asc, bsNew);
if (this.jbr != null) this.jbr.setLoader (null);
this.jbr = null;
}, "JV.Viewer,~S,JU.SB,~O,JM.ModelSet,JU.BS");
Clazz.defineMethod (c$, "initializeInfo", 
 function (name, info) {
this.ms.g3d = this.vwr.gdata;
this.ms.modelSetTypeName = name;
this.ms.isXYZ = (name === "xyz");
this.ms.msInfo = info;
this.ms.modelSetProperties = this.ms.getInfoM ("properties");
this.ms.haveBioModels = this.ms.getMSInfoB ("isPDB");
this.isMutate = this.ms.getMSInfoB ("isMutate");
if (this.ms.haveBioModels) this.jbr = this.vwr.getJBR ().setLoader (this);
this.jmolData = (this.adapterModelCount == 0 ? this.ms.getInfoM ("jmolData") : null);
this.fileHeader = this.ms.getInfoM ("fileHeader");
var steps = this.ms.getInfoM ("trajectorySteps");
this.isTrajectory = (steps != null);
if (this.isTrajectory) this.ms.trajectory = this.newTrajectory (this.ms, steps);
this.isPyMOLsession = this.ms.getMSInfoB ("isPyMOL");
this.doAddHydrogens = (this.jbr != null && !this.isTrajectory && !this.isPyMOLsession && !this.ms.getMSInfoB ("pdbNoHydrogens") && (this.ms.getMSInfoB ("pdbAddHydrogens") || this.vwr.getBooleanProperty ("pdbAddHydrogens")));
if (info != null) {
info.remove ("pdbNoHydrogens");
info.remove ("pdbAddHydrogens");
info.remove ("trajectorySteps");
if (this.isTrajectory) this.ms.vibrationSteps = info.remove ("vibrationSteps");
if (info.containsKey ("legacyJavaFloat")) {
this.vwr.setBooleanProperty ("legacyJavaFloat", true);
}}this.htGroup1 = this.ms.getInfoM ("htGroup1");
var mod = this.ms.getInfoM ("modulationOn");
if (mod != null) {
this.modulationOn = true;
this.modulationTUV = (mod === Boolean.TRUE ? null : mod);
}this.noAutoBond = this.ms.getMSInfoB ("noAutoBond");
this.is2D = this.ms.getMSInfoB ("is2D");
this.doMinimize = this.is2D && this.ms.getMSInfoB ("doMinimize");
this.adapterTrajectoryCount = (this.isTrajectory ? this.ms.trajectory.steps.size () : 0);
this.ms.someModelsHaveSymmetry = this.ms.getMSInfoB ("someModelsHaveSymmetry");
this.someModelsHaveUnitcells = this.ms.getMSInfoB ("someModelsHaveUnitcells");
this.someModelsAreModulated = this.ms.getMSInfoB ("someModelsAreModulated");
this.ms.someModelsHaveFractionalCoordinates = this.ms.getMSInfoB ("someModelsHaveFractionalCoordinates");
if (this.merging) {
this.ms.haveBioModels = new Boolean (this.ms.haveBioModels | this.modelSet0.haveBioModels).valueOf ();
this.ms.bioModelset = this.modelSet0.bioModelset;
if (this.ms.bioModelset != null) this.ms.bioModelset.set (this.vwr, this.ms);
this.ms.someModelsHaveSymmetry = new Boolean (this.ms.someModelsHaveSymmetry | this.modelSet0.getMSInfoB ("someModelsHaveSymmetry")).valueOf ();
this.someModelsHaveUnitcells = new Boolean (this.someModelsHaveUnitcells | this.modelSet0.getMSInfoB ("someModelsHaveUnitcells")).valueOf ();
this.ms.someModelsHaveFractionalCoordinates = new Boolean (this.ms.someModelsHaveFractionalCoordinates | this.modelSet0.getMSInfoB ("someModelsHaveFractionalCoordinates")).valueOf ();
this.ms.someModelsHaveAromaticBonds = new Boolean (this.ms.someModelsHaveAromaticBonds | this.modelSet0.someModelsHaveAromaticBonds).valueOf ();
this.ms.msInfo.put ("someModelsHaveSymmetry", Boolean.$valueOf (this.ms.someModelsHaveSymmetry));
this.ms.msInfo.put ("someModelsHaveUnitcells", Boolean.$valueOf (this.someModelsHaveUnitcells));
this.ms.msInfo.put ("someModelsHaveFractionalCoordinates", Boolean.$valueOf (this.ms.someModelsHaveFractionalCoordinates));
this.ms.msInfo.put ("someModelsHaveAromaticBonds", Boolean.$valueOf (this.ms.someModelsHaveAromaticBonds));
}}, "~S,java.util.Map");
Clazz.defineMethod (c$, "newTrajectory", 
 function (ms, steps) {
return (J.api.Interface.getInterface ("JM.Trajectory", this.vwr, "load")).set (this.vwr, ms, steps);
}, "JM.ModelSet,JU.Lst");
Clazz.defineMethod (c$, "getGroup3", 
function (iGroup) {
return (iGroup >= this.group3Of.length ? null : this.group3Of[iGroup]);
}, "~N");
Clazz.defineMethod (c$, "getFirstAtomIndex", 
function (iGroup) {
return this.firstAtomIndexes[iGroup];
}, "~N");
Clazz.defineMethod (c$, "getAtomCount", 
function () {
return this.ms.ac;
});
Clazz.defineMethod (c$, "createModelSet", 
 function (adapter, asc, bsNew) {
var nAtoms = (adapter == null ? 0 : adapter.getAtomCount (asc));
if (nAtoms > 0) JU.Logger.info ("reading " + nAtoms + " atoms");
this.adapterModelCount = (adapter == null ? 1 : adapter.getAtomSetCount (asc));
this.appendNew = !this.isMutate && (!this.merging || adapter == null || this.adapterModelCount > 1 || this.isTrajectory || this.vwr.getBoolean (603979792));
this.htAtomMap.clear ();
this.chainOf =  new Array (32);
this.group3Of =  new Array (32);
this.seqcodes =  Clazz.newIntArray (32, 0);
this.firstAtomIndexes =  Clazz.newIntArray (32, 0);
this.currentChainID = 2147483647;
this.currentChain = null;
this.currentGroupInsertionCode = '\uFFFF';
this.currentGroup3 = "xxxxx";
this.iModel = -1;
this.model = null;
if (this.merging) this.mergeTrajAndVib (this.modelSet0, this.ms);
this.initializeAtomBondModelCounts (nAtoms);
if (bsNew != null && (this.doMinimize || this.is2D)) {
bsNew.setBits (this.baseAtomIndex, this.baseAtomIndex + nAtoms);
}if (adapter == null) {
this.setModelNameNumberProperties (0, -1, "", 1, null, null, null);
} else {
if (this.adapterModelCount > 0) {
JU.Logger.info ("ModelSet: haveSymmetry:" + this.ms.someModelsHaveSymmetry + " haveUnitcells:" + this.someModelsHaveUnitcells + " haveFractionalCoord:" + this.ms.someModelsHaveFractionalCoordinates);
JU.Logger.info (this.adapterModelCount + " model" + (this.ms.mc == 1 ? "" : "s") + " in this collection. Use getProperty \"modelInfo\" or" + " getProperty \"auxiliaryInfo\" to inspect them.");
}var q = this.ms.getInfoM ("defaultOrientationQuaternion");
if (q != null) {
JU.Logger.info ("defaultOrientationQuaternion = " + q);
JU.Logger.info ("Use \"set autoLoadOrientation TRUE\" before loading or \"restore orientation DEFAULT\" after loading to view this orientation.");
}this.iterateOverAllNewModels (adapter, asc);
this.iterateOverAllNewAtoms (adapter, asc);
this.iterateOverAllNewBonds (adapter, asc);
if (this.merging && !this.appendNew) {
var info = adapter.getAtomSetAuxiliaryInfo (asc, 0);
this.ms.setInfo (this.baseModelIndex, "initialAtomCount", info.get ("initialAtomCount"));
this.ms.setInfo (this.baseModelIndex, "initialBondCount", info.get ("initialBondCount"));
}this.initializeUnitCellAndSymmetry ();
this.initializeBonding ();
}this.finalizeGroupBuild ();
if (this.is2D && this.doMinimize) {
this.applyStereochemistry ();
}if (this.doAddHydrogens) this.jbr.finalizeHydrogens ();
if (adapter != null) {
this.ms.calculatePolymers (this.groups, this.groupCount, this.baseGroupIndex, null);
if (this.jbr != null) this.jbr.iterateOverAllNewStructures (adapter, asc);
}this.setDefaultRendering (this.vwr.getInt (553648170));
var rd = this.vwr.rd;
var ac = this.ms.ac;
var atoms = this.ms.at;
for (var i = this.baseAtomIndex; i < ac; i++) atoms[i].setMadAtom (this.vwr, rd);

var models = this.ms.am;
for (var i = models[this.baseModelIndex].firstAtomIndex; i < ac; i++) models[atoms[i].mi].bsAtoms.set (i);

this.freeze ();
this.finalizeShapes ();
this.vwr.setModelSet (this.ms);
this.setAtomProperties ();
if (adapter != null) adapter.finish (asc);
if (this.modelSet0 != null) {
this.modelSet0.releaseModelSet ();
}this.modelSet0 = null;
}, "J.api.JmolAdapter,~O,JU.BS");
Clazz.defineMethod (c$, "mergeTrajAndVib", 
 function (oldSet, newSet) {
this.baseModelCount = oldSet.mc;
this.baseTrajectoryCount = 0;
if (oldSet.trajectory == null) {
if (this.isTrajectory) this.newTrajectory (oldSet,  new JU.Lst ());
}if (oldSet.trajectory == null || oldSet.mc == 0) return;
this.baseTrajectoryCount = oldSet.mc;
var n = oldSet.trajectory.steps.size ();
for (var i = n; i < this.baseTrajectoryCount; i++) oldSet.trajectory.steps.addLast (null);

if (this.isTrajectory) {
if (oldSet.vibrationSteps == null) {
oldSet.vibrationSteps =  new JU.Lst ();
for (var i = n; --i >= 0; ) oldSet.vibrationSteps.addLast (null);

}n = newSet.trajectory.steps.size ();
for (var i = 0; i < n; i++) {
oldSet.trajectory.steps.addLast (newSet.trajectory.steps.get (i));
oldSet.vibrationSteps.addLast (newSet.vibrationSteps == null ? null : newSet.vibrationSteps.get (i));
}
} else {
newSet.trajectory = this.newTrajectory (newSet, null);
}newSet.vibrationSteps = oldSet.vibrationSteps;
newSet.trajectory.steps = oldSet.trajectory.steps;
oldSet.trajectory = null;
}, "JM.ModelSet,JM.ModelSet");
Clazz.defineMethod (c$, "setDefaultRendering", 
 function (maxAtoms) {
if (this.isPyMOLsession) return;
var sb =  new JU.SB ();
var modelCount = this.ms.mc;
var models = this.ms.am;
for (var i = this.baseModelIndex; i < modelCount; i++) if (models[i].isBioModel) (models[i]).getDefaultLargePDBRendering (sb, maxAtoms);

if (sb.length () == 0) return;
sb.append ("select *;");
var script = this.ms.getInfoM ("jmolscript");
if (script == null) script = "";
sb.append (script);
this.ms.msInfo.put ("jmolscript", sb.toString ());
}, "~N");
Clazz.defineMethod (c$, "setAtomProperties", 
 function () {
var modelCount = this.ms.mc;
for (var i = this.baseModelIndex; i < modelCount; i++) {
var atomProperties = this.ms.getInfo (i, "atomProperties");
if (this.jmolData != null) this.addJmolDataProperties (this.ms.am[i], this.ms.getInfo (i, "jmolDataProperties"));
var groupList = this.ms.getInfo (i, "groupPropertyList");
if (this.ms.am[i].isBioModel && this.ms.getInfo (i, "dssr") != null) this.vwr.getAnnotationParser (true).setGroup1 (this.ms, i);
if (atomProperties == null) continue;
for (var entry, $entry = atomProperties.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var value = entry.getValue ();
var bs = this.ms.getModelAtomBitSetIncludingDeleted (i, true);
if (this.doAddHydrogens) {
var isGroup = (groupList != null && JU.PT.isOneOf (key, groupList));
value = this.jbr.fixPropertyValue (bs, value, isGroup);
}key = "property_" + key.toLowerCase ();
JU.Logger.info ("creating " + key + " for model " + this.ms.getModelName (i));
this.vwr.setData (key,  Clazz.newArray (-1, [key, value, bs, Integer.$valueOf (-1), Boolean.FALSE]), this.ms.ac, 0, 0, 2147483647, 0);
}
}
});
Clazz.defineMethod (c$, "initializeAtomBondModelCounts", 
 function (nAtoms) {
var trajectoryCount = this.adapterTrajectoryCount;
if (this.merging) {
if (this.appendNew) {
this.baseModelIndex = this.baseModelCount;
this.ms.mc = this.baseModelCount + this.adapterModelCount;
} else {
this.baseModelIndex = this.vwr.am.cmi;
if (this.baseModelIndex < 0) this.baseModelIndex = this.baseModelCount - 1;
this.ms.mc = this.baseModelCount;
}this.ms.ac = this.baseAtomIndex = this.modelSet0.ac;
this.ms.bondCount = this.modelSet0.bondCount;
this.$mergeGroups = this.modelSet0.getGroups ();
this.groupCount = this.baseGroupIndex = this.$mergeGroups.length;
this.ms.mergeModelArrays (this.modelSet0);
this.ms.growAtomArrays (this.ms.ac + nAtoms);
} else {
this.ms.mc = this.adapterModelCount;
this.ms.ac = 0;
this.ms.bondCount = 0;
this.ms.at =  new Array (nAtoms);
this.ms.bo =  new Array (250 + nAtoms);
}if (this.doAddHydrogens) this.jbr.initializeHydrogenAddition ();
if (trajectoryCount > 1) this.ms.mc += trajectoryCount - 1;
this.ms.am = JU.AU.arrayCopyObject (this.ms.am, this.ms.mc);
this.ms.modelFileNumbers = JU.AU.arrayCopyI (this.ms.modelFileNumbers, this.ms.mc);
this.ms.modelNumbers = JU.AU.arrayCopyI (this.ms.modelNumbers, this.ms.mc);
this.ms.modelNumbersForAtomLabel = JU.AU.arrayCopyS (this.ms.modelNumbersForAtomLabel, this.ms.mc);
this.ms.modelNames = JU.AU.arrayCopyS (this.ms.modelNames, this.ms.mc);
this.ms.frameTitles = JU.AU.arrayCopyS (this.ms.frameTitles, this.ms.mc);
if (this.merging) for (var i = 0; i < this.modelSet0.mc; i++) (this.ms.am[i] = this.modelSet0.am[i]).ms = this.ms;

}, "~N");
Clazz.defineMethod (c$, "mergeGroups", 
 function () {
var info = this.modelSet0.getAuxiliaryInfo (null);
var mergeGroup3Lists = info.get ("group3Lists");
var mergeGroup3Counts = info.get ("group3Counts");
if (mergeGroup3Lists != null) {
for (var i = 0; i < this.baseModelCount; i++) {
this.group3Lists[i + 1] = mergeGroup3Lists[i + 1];
this.group3Counts[i + 1] = mergeGroup3Counts[i + 1];
this.structuresDefinedInFile.set (i);
}
this.group3Lists[0] = mergeGroup3Lists[0];
this.group3Counts[0] = mergeGroup3Counts[0];
}if (!this.appendNew && this.ms.haveBioModels) this.structuresDefinedInFile.clear (this.baseModelIndex);
});
Clazz.defineMethod (c$, "iterateOverAllNewModels", 
 function (adapter, asc) {
this.group3Lists =  new Array (this.ms.mc + 1);
this.group3Counts = JU.AU.newInt2 (this.ms.mc + 1);
this.structuresDefinedInFile =  new JU.BS ();
if (this.merging) this.mergeGroups ();
var iTrajectory = (this.isTrajectory ? this.baseTrajectoryCount : -1);
var ipt = this.baseModelIndex;
for (var i = 0; i < this.adapterModelCount; ++i, ++ipt) {
var modelNumber = adapter.getAtomSetNumber (asc, i);
var modelName = adapter.getAtomSetName (asc, i);
var modelAuxiliaryInfo = adapter.getAtomSetAuxiliaryInfo (asc, i);
if (modelAuxiliaryInfo.containsKey ("modelID")) modelAuxiliaryInfo.put ("modelID0", modelAuxiliaryInfo.get ("modelID"));
var modelProperties = modelAuxiliaryInfo.get ("modelProperties");
this.vwr.setStringProperty ("_fileType", modelAuxiliaryInfo.get ("fileType"));
if (modelName == null) modelName = (this.jmolData != null && this.jmolData.indexOf (";") > 2 ? this.jmolData.substring (this.jmolData.indexOf (":") + 2, this.jmolData.indexOf (";")) : this.appendNew ? "" + (modelNumber % 1000000) : "");
this.setModelNameNumberProperties (ipt, iTrajectory, modelName, modelNumber, modelProperties, modelAuxiliaryInfo, this.jmolData);
}
var m = this.ms.am[this.baseModelIndex];
this.vwr.setSmilesString (this.ms.msInfo.get ("smilesString"));
var loadState = this.ms.msInfo.remove ("loadState");
var loadScript = this.ms.msInfo.remove ("loadScript");
if (loadScript.indexOf ("Viewer.AddHydrogens") < 0 || !m.isModelKit) {
var lines = JU.PT.split (loadState, "\n");
var sb =  new JU.SB ();
for (var i = 0; i < lines.length; i++) {
var pt = m.loadState.indexOf (lines[i]);
if (pt < 0 || pt != m.loadState.lastIndexOf (lines[i])) sb.append (lines[i]).appendC ('\n');
}
m.loadState += m.loadScript.toString () + sb.toString ();
m.loadScript =  new JU.SB ();
if (loadScript.indexOf ("load append ") >= 0) loadScript.append ("; set appendNew true");
m.loadScript.append ("  ").appendSB (loadScript).append (";\n");
}if (this.isTrajectory) {
var n = (this.ms.mc - ipt + 1);
JU.Logger.info (n + " trajectory steps read");
this.ms.setInfo (this.baseModelCount, "trajectoryStepCount", Integer.$valueOf (n));
for (var ia = this.adapterModelCount, i = ipt; i < this.ms.mc; i++, ia++) {
this.ms.am[i] = this.ms.am[this.baseModelCount];
this.ms.modelNumbers[i] = adapter.getAtomSetNumber (asc, ia);
this.ms.modelNames[i] = adapter.getAtomSetName (asc, ia);
this.structuresDefinedInFile.set (i);
}
}this.finalizeModels (this.baseModelCount);
}, "J.api.JmolAdapter,~O");
Clazz.defineMethod (c$, "setModelNameNumberProperties", 
 function (modelIndex, trajectoryBaseIndex, modelName, modelNumber, modelProperties, modelAuxiliaryInfo, jmolData) {
if (this.appendNew) {
var modelIsPDB = (modelAuxiliaryInfo != null && Boolean.TRUE === modelAuxiliaryInfo.get ("isPDB"));
this.ms.am[modelIndex] = (modelIsPDB ? this.jbr.getBioModel (modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo) :  new JM.Model ().set (this.ms, modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo));
this.ms.modelNumbers[modelIndex] = modelNumber;
this.ms.modelNames[modelIndex] = modelName;
if (modelIsPDB) this.jbr.setGroupLists (modelIndex);
} else {
var atomInfo = modelAuxiliaryInfo.get ("PDB_CONECT_firstAtom_count_max");
if (atomInfo != null) this.ms.setInfo (modelIndex, "PDB_CONECT_firstAtom_count_max", atomInfo);
}var models = this.ms.am;
var atoms = this.ms.at;
models[modelIndex].bsAtoms.set (atoms.length + 1);
models[modelIndex].bsAtoms.clear (atoms.length + 1);
var codes = this.ms.getInfo (modelIndex, "altLocs");
models[modelIndex].altLocCount = (codes == null ? 0 : codes.length);
if (codes != null) {
var altlocs = codes.toCharArray ();
java.util.Arrays.sort (altlocs);
codes = String.valueOf (altlocs);
this.ms.setInfo (modelIndex, "altLocs", codes);
}codes = this.ms.getInfo (modelIndex, "insertionCodes");
models[modelIndex].insertionCount = (codes == null ? 0 : codes.length);
var isModelKit = (this.ms.modelSetName != null && this.ms.modelSetName.startsWith ("Jmol Model Kit") || modelName.startsWith ("Jmol Model Kit") || "Jme".equals (this.ms.getInfo (modelIndex, "fileType")));
models[modelIndex].isModelKit = isModelKit;
}, "~N,~N,~S,~N,java.util.Properties,java.util.Map,~S");
Clazz.defineMethod (c$, "finalizeModels", 
 function (baseModelCount) {
var modelCount = this.ms.mc;
if (modelCount == baseModelCount) return;
var sNum;
var modelnumber = 0;
var lastfilenumber = -1;
var modelNumbers = this.ms.modelNumbers;
var modelNames = this.ms.modelNames;
if (this.isTrajectory) for (var i = baseModelCount; ++i < this.ms.mc; ) modelNumbers[i] = modelNumbers[i - 1] + 1;

if (baseModelCount > 0) {
if (modelNumbers[0] < 1000000) {
for (var i = 0; i < baseModelCount; i++) {
if (modelNames[i].length == 0) modelNames[i] = "" + modelNumbers[i];
modelNumbers[i] += 1000000;
this.ms.modelNumbersForAtomLabel[i] = "1." + (i + 1);
}
}var filenumber = modelNumbers[baseModelCount - 1];
filenumber -= filenumber % 1000000;
if (modelNumbers[baseModelCount] < 1000000) filenumber += 1000000;
for (var i = baseModelCount; i < modelCount; i++) modelNumbers[i] += filenumber;

}var models = this.ms.am;
for (var i = baseModelCount; i < modelCount; ++i) {
this.ms.setInfo (i, "fileType", this.ms.modelSetTypeName);
if (this.fileHeader != null) this.ms.setInfo (i, "fileHeader", this.fileHeader);
var filenumber = Clazz.doubleToInt (modelNumbers[i] / 1000000);
if (filenumber != lastfilenumber) {
modelnumber = 0;
lastfilenumber = filenumber;
}modelnumber++;
if (filenumber == 0) {
sNum = "" + this.ms.getModelNumber (i);
filenumber = 1;
} else {
sNum = filenumber + "." + modelnumber;
}this.ms.modelNumbersForAtomLabel[i] = sNum;
models[i].fileIndex = filenumber - 1;
this.ms.modelFileNumbers[i] = filenumber * 1000000 + modelnumber;
if (modelNames[i] == null || modelNames[i].length == 0) modelNames[i] = sNum;
}
if (this.merging) for (var i = 0; i < baseModelCount; i++) models[i].ms = this.ms;

for (var i = 0; i < modelCount; i++) {
this.ms.setInfo (i, "modelName", modelNames[i]);
this.ms.setInfo (i, "modelNumber", Integer.$valueOf (modelNumbers[i] % 1000000));
this.ms.setInfo (i, "modelFileNumber", Integer.$valueOf (this.ms.modelFileNumbers[i]));
this.ms.setInfo (i, "modelNumberDotted", this.ms.getModelNumberDotted (i));
var codes = this.ms.getInfo (i, "altLocs");
if (codes != null) {
JU.Logger.info ("model " + this.ms.getModelNumberDotted (i) + " alternative locations: " + codes);
}}
}, "~N");
Clazz.defineMethod (c$, "iterateOverAllNewAtoms", 
 function (adapter, asc) {
var iLast = -1;
var isPdbThisModel = false;
var addH = false;
var isLegacyHAddition = false;
var iterAtom = adapter.getAtomIterator (asc);
this.ms.setCapacity (adapter.getAtomCount (asc));
var nRead = 0;
var models = this.ms.am;
if (this.ms.mc > 0) this.nullGroup =  new JM.Group ().setGroup ( new JM.Chain (this.ms.am[this.baseModelIndex], 32, 0), "", 0, -1, -1);
while (iterAtom.hasNext ()) {
nRead++;
var modelIndex = iterAtom.getAtomSetIndex () + this.baseModelIndex;
if (modelIndex != iLast) {
this.iChain = 0;
this.iModel = modelIndex;
this.model = models[modelIndex];
this.currentChainID = 2147483647;
this.isNewChain = true;
models[modelIndex].bsAtoms.clearAll ();
isPdbThisModel = models[modelIndex].isBioModel;
iLast = modelIndex;
addH = isPdbThisModel && this.doAddHydrogens;
if (this.jbr != null) this.jbr.setHaveHsAlready (false);
}var group3 = iterAtom.getGroup3 ();
var chainID = iterAtom.getChainID ();
this.checkNewGroup (adapter, chainID, group3, iterAtom.getSequenceNumber (), iterAtom.getInsertionCode (), addH, isLegacyHAddition);
var isotope = iterAtom.getElementNumber ();
if (addH && JU.Elements.getElementNumber (isotope) == 1) this.jbr.setHaveHsAlready (true);
var name = iterAtom.getAtomName ();
var charge = (addH ? this.getPdbCharge (group3, name) : iterAtom.getFormalCharge ());
this.addAtom (isPdbThisModel, iterAtom.getSymmetry (), iterAtom.getAtomSite (), iterAtom.getUniqueID (), isotope, name, charge, iterAtom.getPartialCharge (), iterAtom.getTensors (), iterAtom.getOccupancy (), iterAtom.getBfactor (), iterAtom.getXYZ (), iterAtom.getIsHetero (), iterAtom.getSerial (), iterAtom.getSeqID (), group3, iterAtom.getVib (), iterAtom.getAltLoc (), iterAtom.getRadius ());
}
if (this.groupCount > 0 && addH) {
this.jbr.addImplicitHydrogenAtoms (adapter, this.groupCount - 1, this.isNewChain && !isLegacyHAddition ? 1 : 0);
}iLast = -1;
var vdwtypeLast = null;
var atoms = this.ms.at;
for (var i = 0; i < this.ms.ac; i++) {
if (atoms[i].mi != iLast) {
iLast = atoms[i].mi;
models[iLast].firstAtomIndex = i;
var vdwtype = this.ms.getDefaultVdwType (iLast);
if (vdwtype !== vdwtypeLast) {
JU.Logger.info ("Default Van der Waals type for model" + " set to " + vdwtype.getVdwLabel ());
vdwtypeLast = vdwtype;
}}}
JU.Logger.info (nRead + " atoms created");
}, "J.api.JmolAdapter,~O");
Clazz.defineMethod (c$, "addJmolDataProperties", 
 function (m, jmolDataProperties) {
if (jmolDataProperties == null) return;
var bs = m.bsAtoms;
var nAtoms = bs.cardinality ();
for (var e, $e = jmolDataProperties.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var key = e.getKey ();
var data = e.getValue ();
if (data.length != nAtoms) return;
var tok = (key.startsWith ("property_") ? 1715472409 : JS.T.getTokFromName (key));
switch (tok) {
default:
if (JS.T.tokAttr (tok, 2048)) {
this.vwr.setAtomProperty (bs, tok, 0, 0, null, data, null);
break;
}case 1111492629:
case 1111492630:
case 1111492631:
key = "property_" + key;
tok = 1715472409;
case 1715472409:
this.vwr.setData (key,  Clazz.newArray (-1, [key, data, bs, Integer.$valueOf (1)]), 0, 0, 0, 0, 0);
}
}
}, "JM.Model,java.util.Map");
Clazz.defineMethod (c$, "getPdbCharge", 
 function (group3, name) {
return (group3.equals ("ARG") && name.equals ("NH1") || group3.equals ("LYS") && name.equals ("NZ") || group3.equals ("HIS") && name.equals ("ND1") ? 1 : 0);
}, "~S,~S");
Clazz.defineMethod (c$, "addAtom", 
 function (isPDB, atomSymmetry, atomSite, atomUid, atomicAndIsotopeNumber, atomName, formalCharge, partialCharge, tensors, occupancy, bfactor, xyz, isHetero, atomSerial, atomSeqID, group3, vib, alternateLocationID, radius) {
var specialAtomID = 0;
var atomType = null;
if (atomName != null) {
var i;
if ((i = atomName.indexOf ('\0')) >= 0) {
atomType = atomName.substring (i + 1);
atomName = atomName.substring (0, i);
}if (isPDB) {
if (atomName.indexOf ('*') >= 0) atomName = atomName.$replace ('*', '\'');
specialAtomID = this.vwr.getJBR ().lookupSpecialAtomID (atomName);
if (specialAtomID == 2 && "CA".equalsIgnoreCase (group3)) specialAtomID = 0;
}}var atom = this.ms.addAtom (this.iModel, this.nullGroup, atomicAndIsotopeNumber, atomName, atomType, atomSerial, atomSeqID, atomSite, xyz, radius, vib, formalCharge, partialCharge, occupancy, bfactor, tensors, isHetero, specialAtomID, atomSymmetry);
atom.altloc = alternateLocationID;
this.htAtomMap.put (atomUid, atom);
}, "~B,JU.BS,~N,~O,~N,~S,~N,~N,JU.Lst,~N,~N,JU.P3,~B,~N,~N,~S,JU.V3,~S,~N");
Clazz.defineMethod (c$, "checkNewGroup", 
 function (adapter, chainID, group3, groupSequenceNumber, groupInsertionCode, addH, isLegacyHAddition) {
var group3i = (group3 == null ? null : group3.intern ());
if (chainID != this.currentChainID) {
this.currentChainID = chainID;
this.currentChain = this.getOrAllocateChain (this.model, chainID);
this.currentGroupInsertionCode = '\uFFFF';
this.currentGroupSequenceNumber = -1;
this.currentGroup3 = "xxxx";
this.isNewChain = true;
}if (groupSequenceNumber != this.currentGroupSequenceNumber || groupInsertionCode != this.currentGroupInsertionCode || group3i !== this.currentGroup3) {
if (this.groupCount > 0 && addH) {
this.jbr.addImplicitHydrogenAtoms (adapter, this.groupCount - 1, this.isNewChain && !isLegacyHAddition ? 1 : 0);
this.jbr.setHaveHsAlready (false);
}this.currentGroupSequenceNumber = groupSequenceNumber;
this.currentGroupInsertionCode = groupInsertionCode;
this.currentGroup3 = group3i;
while (this.groupCount >= this.group3Of.length) {
this.chainOf = JU.AU.doubleLength (this.chainOf);
this.group3Of = JU.AU.doubleLengthS (this.group3Of);
this.seqcodes = JU.AU.doubleLengthI (this.seqcodes);
this.firstAtomIndexes = JU.AU.doubleLengthI (this.firstAtomIndexes);
}
this.firstAtomIndexes[this.groupCount] = this.ms.ac;
this.chainOf[this.groupCount] = this.currentChain;
this.group3Of[this.groupCount] = group3;
this.seqcodes[this.groupCount] = JM.Group.getSeqcodeFor (groupSequenceNumber, groupInsertionCode);
++this.groupCount;
}}, "J.api.JmolAdapter,~N,~S,~N,~S,~B,~B");
Clazz.defineMethod (c$, "getOrAllocateChain", 
 function (model, chainID) {
var chain = model.getChain (chainID);
if (chain != null) return chain;
if (model.chainCount == model.chains.length) model.chains = JU.AU.doubleLength (model.chains);
return model.chains[model.chainCount++] =  new JM.Chain (model, chainID, (chainID == 0 || chainID == 32 ? 0 : ++this.iChain));
}, "JM.Model,~N");
Clazz.defineMethod (c$, "iterateOverAllNewBonds", 
 function (adapter, asc) {
var iterBond = adapter.getBondIterator (asc);
if (iterBond == null) return;
var mad = this.vwr.getMadBond ();
this.ms.defaultCovalentMad = (this.jmolData == null ? mad : 0);
var haveMultipleBonds = false;
while (iterBond.hasNext ()) {
var iOrder = iterBond.getEncodedOrder ();
var order = iOrder;
var b = this.bondAtoms (iterBond.getAtomUniqueID1 (), iterBond.getAtomUniqueID2 (), order);
if (b != null) {
if (order > 1 && order != 1025 && order != 1041) haveMultipleBonds = true;
var radius = iterBond.getRadius ();
if (radius > 0) b.setMad (Clazz.floatToShort (radius * 2000));
var colix = iterBond.getColix ();
if (colix >= 0) b.colix = colix;
b.order |= (iOrder & 98304);
}}
if (haveMultipleBonds && this.ms.someModelsHaveSymmetry && !this.vwr.getBoolean (603979794)) JU.Logger.info ("ModelSet: use \"set appletSymmetryToBonds TRUE \" to apply the file-based multiple bonds to symmetry-generated atoms.");
this.ms.defaultCovalentMad = mad;
}, "J.api.JmolAdapter,~O");
Clazz.defineMethod (c$, "bondAtoms", 
 function (atomUid1, atomUid2, order) {
var atom1 = this.htAtomMap.get (atomUid1);
if (atom1 == null) {
JU.Logger.error ("bondAtoms cannot find atomUid1?:" + atomUid1);
return null;
}var atom2 = this.htAtomMap.get (atomUid2);
if (atom2 == null) {
JU.Logger.error ("bondAtoms cannot find atomUid2?:" + atomUid2);
return null;
}if (atom1.isBonded (atom2)) return null;
var isNear = (order == 1025);
var isFar = (order == 1041);
var bond;
if (isNear || isFar) {
bond = this.ms.bondMutually (atom1, atom2, (this.is2D ? order : 1), this.ms.getDefaultMadFromOrder (1), 0);
if (this.vStereo == null) {
this.vStereo =  new JU.Lst ();
}this.vStereo.addLast (bond);
} else {
bond = this.ms.bondMutually (atom1, atom2, order, this.ms.getDefaultMadFromOrder (order), 0);
if (bond.isAromatic ()) {
this.ms.someModelsHaveAromaticBonds = true;
}}if (this.ms.bondCount == this.ms.bo.length) {
this.ms.bo = JU.AU.arrayCopyObject (this.ms.bo, this.ms.bondCount + 250);
}this.ms.setBond (this.ms.bondCount++, bond);
return bond;
}, "~O,~O,~N");
Clazz.defineMethod (c$, "initializeUnitCellAndSymmetry", 
 function () {
if (this.someModelsAreModulated && this.ms.bsModulated == null) this.ms.bsModulated =  new JU.BS ();
if (this.someModelsHaveUnitcells) {
this.ms.unitCells =  new Array (this.ms.mc);
this.ms.haveUnitCells = true;
var haveMergeCells = (this.modelSet0 != null && this.modelSet0.unitCells != null);
for (var i = 0, pt = 0; i < this.ms.mc; i++) {
if (haveMergeCells && i < this.baseModelCount) {
this.ms.unitCells[i] = this.modelSet0.unitCells[i];
} else {
this.ms.unitCells[i] = J.api.Interface.getSymmetry (this.vwr, "file");
var notionalCell = null;
if (this.isTrajectory) {
var lst = this.ms.getInfoM ("unitCells");
if (lst != null) notionalCell = lst.get (pt++);
}this.ms.unitCells[i].setSymmetryInfo (i, this.ms.getModelAuxiliaryInfo (i), notionalCell);
}}
}if (this.appendNew && this.ms.someModelsHaveSymmetry) {
this.ms.getAtoms (1088421903, null);
var atoms = this.ms.at;
for (var iAtom = this.baseAtomIndex, iModel = -1, i0 = 0; iAtom < this.ms.ac; iAtom++) {
if (atoms[iAtom].mi != iModel) {
iModel = atoms[iAtom].mi;
i0 = this.baseAtomIndex + this.ms.getInfoI (iModel, "presymmetryAtomIndex") + this.ms.getInfoI (iModel, "presymmetryAtomCount");
}if (iAtom >= i0) this.ms.bsSymmetry.set (iAtom);
}
}if (this.appendNew && this.ms.someModelsHaveFractionalCoordinates) {
var atoms = this.ms.at;
var modelIndex = -1;
var c = null;
var isFractional = false;
var roundCoords = !this.vwr.g.legacyJavaFloat;
for (var i = this.baseAtomIndex; i < this.ms.ac; i++) {
if (atoms[i].mi != modelIndex) {
modelIndex = atoms[i].mi;
c = this.ms.getUnitCell (modelIndex);
isFractional = (c != null && c.getCoordinatesAreFractional ());
}if (isFractional) {
c = atoms[i].getUnitCell ();
c.toCartesian (c.toSupercell (atoms[i]), false);
if (roundCoords) JU.PT.fixPtFloats (atoms[i], 10000.0);
}}
for (var imodel = this.baseModelIndex; imodel < this.ms.mc; imodel++) if (this.ms.isTrajectory (imodel)) this.ms.trajectory.setUnitCell (imodel);

}});
Clazz.defineMethod (c$, "initializeBonding", 
 function () {
var bsExclude = (this.ms.getInfoM ("someModelsHaveCONECT") == null ? null :  new JU.BS ());
if (bsExclude != null) this.ms.setPdbConectBonding (this.baseAtomIndex, this.baseModelIndex, bsExclude);
var modelAtomCount = 0;
var symmetryAlreadyAppliedToBonds = this.vwr.getBoolean (603979794);
var doAutoBond = this.vwr.getBoolean (603979798);
var forceAutoBond = this.vwr.getBoolean (603979846);
var bs = null;
var autoBonding = false;
var modelCount = this.ms.mc;
var models = this.ms.am;
if (!this.noAutoBond) for (var i = this.baseModelIndex; i < modelCount; i++) {
modelAtomCount = models[i].bsAtoms.cardinality ();
var modelBondCount = this.ms.getInfoI (i, "initialBondCount");
var modelIsPDB = models[i].isBioModel;
if (modelBondCount < 0) {
modelBondCount = this.ms.bondCount;
}var doBond = (forceAutoBond || doAutoBond && (modelBondCount == 0 || modelIsPDB && this.jmolData == null && (this.ms.getMSInfoB ("havePDBHeaderName") || modelBondCount < Clazz.doubleToInt (modelAtomCount / 2)) || this.ms.getInfoB (i, "hasSymmetry") && !symmetryAlreadyAppliedToBonds && !this.ms.getInfoB (i, "hasBonds")));
if (!doBond) continue;
autoBonding = true;
if (this.merging || modelCount > 1) {
if (bs == null) bs = JU.BS.newN (this.ms.ac);
if (i == this.baseModelIndex || !this.isTrajectory) bs.or (models[i].bsAtoms);
}}
if (this.modulationOn) this.ms.setModulation (null, true, this.modulationTUV, false);
if (autoBonding) {
this.ms.autoBondBs4 (bs, bs, bsExclude, null, this.ms.defaultCovalentMad, this.vwr.getBoolean (603979872));
JU.Logger.info ("ModelSet: autobonding; use  autobond=false  to not generate bonds automatically");
} else {
JU.Logger.info ("ModelSet: not autobonding; use  forceAutobond=true  to force automatic bond creation");
}});
Clazz.defineMethod (c$, "finalizeGroupBuild", 
 function () {
this.groups =  new Array (this.groupCount);
if (this.merging) for (var i = 0; i < this.$mergeGroups.length; i++) (this.groups[i] = this.$mergeGroups[i]).chain.model.ms = this.ms;

for (var i = this.baseGroupIndex; i < this.groupCount; ++i) this.distinguishAndPropagateGroup (i, this.chainOf[i], this.group3Of[i], this.seqcodes[i], this.firstAtomIndexes[i], (i == this.groupCount - 1 ? this.ms.ac : this.firstAtomIndexes[i + 1]) - 1);

if (this.group3Lists != null) {
this.ms.msInfo.put ("group3Lists", this.group3Lists);
this.ms.msInfo.put ("group3Counts", this.group3Counts);
for (var i = 0; i < this.group3Counts.length; i++) if (this.group3Counts[i] == null) this.group3Counts[i] =  Clazz.newIntArray (0, 0);

}});
Clazz.defineMethod (c$, "distinguishAndPropagateGroup", 
 function (groupIndex, chain, group3, seqcode, firstAtomIndex, lastAtomIndex) {
if (lastAtomIndex < firstAtomIndex) throw  new NullPointerException ();
var group = (group3 == null || this.jbr == null ? null : this.jbr.distinguishAndPropagateGroup (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, this.specialAtomIndexes, this.ms.at));
var key;
if (group == null) {
group =  new JM.Group ().setGroup (chain, group3, seqcode, firstAtomIndex, lastAtomIndex);
if (this.jbr != null) group.groupID = this.jbr.getGroupID (group3);
key = "o>";
} else {
key = (group.isProtein () ? "p>" : group.isNucleic () ? "n>" : group.isCarbohydrate () ? "c>" : "o>");
}if (group3 != null) {
this.countGroup (this.ms.at[firstAtomIndex].mi, key, group3);
if (group.isNucleic ()) {
var g1 = (this.htGroup1 == null ? null : this.htGroup1.get (group3));
if (g1 != null) group.group1 = g1.charAt (0);
}}this.addGroup (chain, group);
this.groups[groupIndex] = group;
group.groupIndex = groupIndex;
for (var i = lastAtomIndex + 1; --i >= firstAtomIndex; ) this.ms.at[i].group = group;

}, "~N,JM.Chain,~S,~N,~N,~N");
Clazz.defineMethod (c$, "addGroup", 
 function (chain, group) {
if (chain.groupCount == chain.groups.length) chain.groups = JU.AU.doubleLength (chain.groups);
chain.groups[chain.groupCount++] = group;
}, "JM.Chain,JM.Group");
Clazz.defineMethod (c$, "countGroup", 
 function (modelIndex, code, group3) {
var ptm = modelIndex + 1;
if (this.group3Lists == null || this.group3Lists[ptm] == null) return;
var g3code = (group3 + "   ").substring (0, 3);
var pt = this.group3Lists[ptm].indexOf (g3code);
if (pt < 0) {
this.group3Lists[ptm] += ",[" + g3code + "]";
pt = this.group3Lists[ptm].indexOf (g3code);
this.group3Counts[ptm] = JU.AU.arrayCopyI (this.group3Counts[ptm], this.group3Counts[ptm].length + 10);
}this.group3Counts[ptm][Clazz.doubleToInt (pt / 6)]++;
pt = this.group3Lists[ptm].indexOf (",[" + g3code);
if (pt >= 0) this.group3Lists[ptm] = this.group3Lists[ptm].substring (0, pt) + code + this.group3Lists[ptm].substring (pt + 2);
if (modelIndex >= 0) this.countGroup (-1, code, group3);
}, "~N,~S,~S");
Clazz.defineMethod (c$, "freeze", 
 function () {
this.htAtomMap.clear ();
if (this.ms.ac < this.ms.at.length) this.ms.growAtomArrays (this.ms.ac);
if (this.ms.bondCount < this.ms.bo.length) this.ms.bo = JU.AU.arrayCopyObject (this.ms.bo, this.ms.bondCount);
for (var i = 5; --i > 0; ) {
this.ms.numCached[i] = 0;
var bondsCache = this.ms.freeBonds[i];
for (var j = bondsCache.length; --j >= 0; ) bondsCache[j] = null;

}
this.ms.setAtomNamesAndNumbers (0, this.baseAtomIndex, this.modelSet0);
this.findElementsPresent ();
this.ms.resetMolecules ();
this.model = null;
this.currentChain = null;
if (!this.ms.haveBioModels || this.isPyMOLsession || this.isMutate) {
this.ms.freezeModels ();
return;
}var asDSSP = this.vwr.getBoolean (603979826);
var ret = this.ms.calculateStructuresAllExcept (this.structuresDefinedInFile, asDSSP, false, true, true, asDSSP, JV.JC.versionInt >= 1405000 && this.ms.getInfoM ("DSSP1") == null ? 2 : 1);
if (ret.length > 0) JU.Logger.info (ret);
});
Clazz.defineMethod (c$, "findElementsPresent", 
 function () {
this.ms.elementsPresent =  new Array (this.ms.mc);
for (var i = 0; i < this.ms.mc; i++) this.ms.elementsPresent[i] = JU.BS.newN (64);

for (var i = this.ms.ac; --i >= 0; ) {
var n = this.ms.at[i].getAtomicAndIsotopeNumber ();
if (n >= JU.Elements.elementNumberMax) n = JU.Elements.elementNumberMax + JU.Elements.altElementIndexFromNumber (n);
this.ms.elementsPresent[this.ms.at[i].mi].set (n);
}
});
Clazz.defineMethod (c$, "applyStereochemistry", 
 function () {
this.set2dZ (this.baseAtomIndex, this.ms.ac);
if (this.vStereo != null) {
var bsToTest =  new JU.BS ();
bsToTest.setBits (this.baseAtomIndex, this.ms.ac);
for (var i = this.vStereo.size (); --i >= 0; ) {
var b = this.vStereo.get (i);
var dz2 = (b.order == 1025 ? 3 : -3);
b.order = 1;
if (b.atom2.z != b.atom1.z && (dz2 < 0) == (b.atom2.z < b.atom1.z)) dz2 /= 3;
var bs = JU.JmolMolecule.getBranchBitSet (this.ms.at, b.atom2.i, bsToTest, null, b.atom1.i, false, true);
bs.set (b.atom2.i);
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) this.ms.at[j].z += dz2;

b.atom2.x = (b.atom1.x + b.atom2.x) / 2;
b.atom2.y = (b.atom1.y + b.atom2.y) / 2;
}
this.vStereo = null;
}this.is2D = false;
});
Clazz.defineMethod (c$, "set2dZ", 
 function (iatom1, iatom2) {
var atomlist = JU.BS.newN (iatom2);
var bsBranch =  new JU.BS ();
var v =  new JU.V3 ();
var v0 = JU.V3.new3 (0, 1, 0);
var v1 =  new JU.V3 ();
var bs0 =  new JU.BS ();
bs0.setBits (iatom1, iatom2);
for (var i = iatom1; i < iatom2; i++) if (!atomlist.get (i) && !bsBranch.get (i)) {
bsBranch = this.getBranch2dZ (i, -1, bs0, bsBranch, v, v0, v1);
atomlist.or (bsBranch);
}
}, "~N,~N");
Clazz.defineMethod (c$, "getBranch2dZ", 
 function (atomIndex, atomIndexNot, bs0, bsBranch, v, v0, v1) {
var bs = JU.BS.newN (this.ms.ac);
if (atomIndex < 0) return bs;
var bsToTest =  new JU.BS ();
bsToTest.or (bs0);
if (atomIndexNot >= 0) bsToTest.clear (atomIndexNot);
JM.ModelLoader.setBranch2dZ (this.ms.at[atomIndex], bs, bsToTest, v, v0, v1);
return bs;
}, "~N,~N,JU.BS,JU.BS,JU.V3,JU.V3,JU.V3");
c$.setBranch2dZ = Clazz.defineMethod (c$, "setBranch2dZ", 
 function (atom, bs, bsToTest, v, v0, v1) {
var atomIndex = atom.i;
if (!bsToTest.get (atomIndex)) return;
bsToTest.clear (atomIndex);
bs.set (atomIndex);
if (atom.bonds == null) return;
for (var i = atom.bonds.length; --i >= 0; ) {
var bond = atom.bonds[i];
if (bond.isHydrogen ()) continue;
var atom2 = bond.getOtherAtom (atom);
JM.ModelLoader.setAtom2dZ (atom, atom2, v, v0, v1);
JM.ModelLoader.setBranch2dZ (atom2, bs, bsToTest, v, v0, v1);
}
}, "JM.Atom,JU.BS,JU.BS,JU.V3,JU.V3,JU.V3");
c$.setAtom2dZ = Clazz.defineMethod (c$, "setAtom2dZ", 
 function (atomRef, atom2, v, v0, v1) {
v.sub2 (atom2, atomRef);
v.z = 0;
v.normalize ();
v1.cross (v0, v);
var theta = Math.acos (v.dot (v0));
atom2.z = atomRef.z + (0.8 * Math.sin (4 * theta));
}, "JM.Atom,JM.Atom,JU.V3,JU.V3,JU.V3");
Clazz.defineMethod (c$, "finalizeShapes", 
 function () {
this.ms.sm = this.vwr.shm;
this.ms.sm.setModelSet (this.ms);
this.ms.setBsHidden (this.vwr.slm.getHiddenSet ());
if (!this.merging) this.ms.sm.resetShapes ();
this.ms.sm.loadDefaultShapes (this.ms);
if (this.ms.someModelsHaveAromaticBonds && this.vwr.getBoolean (603979944)) this.ms.assignAromaticBondsBs (false, null);
if (this.merging && this.baseModelCount == 1) this.ms.sm.setShapePropertyBs (6, "clearModelIndex", null, null);
});
Clazz.defineMethod (c$, "undeleteAtom", 
function (iAtom) {
this.ms.at[iAtom].valence = 0;
}, "~N");
c$.createAtomDataSet = Clazz.defineMethod (c$, "createAtomDataSet", 
function (vwr, modelSet, tokType, asc, bsSelected) {
if (asc == null) return null;
var adapter = vwr.getModelAdapter ();
var pt =  new JU.P3 ();
var atoms = modelSet.at;
var tolerance = vwr.getFloat (570425363);
if (modelSet.unitCells != null) for (var i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1)) if (atoms[i].atomSymmetry != null) {
tolerance = -tolerance;
break;
}
var i = -1;
var n = 0;
var loadAllData = (JU.BSUtil.cardinalityOf (bsSelected) == vwr.ms.ac);
for (var iterAtom = adapter.getAtomIterator (asc); iterAtom.hasNext (); ) {
var xyz = iterAtom.getXYZ ();
if (Float.isNaN (xyz.x + xyz.y + xyz.z)) continue;
if (tokType == 1145047050) {
i = bsSelected.nextSetBit (i + 1);
if (i < 0) break;
n++;
if (JU.Logger.debugging) JU.Logger.debug ("atomIndex = " + i + ": " + atoms[i] + " --> (" + xyz.x + "," + xyz.y + "," + xyz.z);
modelSet.setAtomCoord (i, xyz.x, xyz.y, xyz.z);
continue;
}pt.setT (xyz);
var bs = JU.BS.newN (modelSet.ac);
modelSet.getAtomsWithin (tolerance, pt, bs, -1);
bs.and (bsSelected);
if (loadAllData) {
n = JU.BSUtil.cardinalityOf (bs);
if (n == 0) {
JU.Logger.warn ("createAtomDataSet: no atom found at position " + pt);
continue;
} else if (n > 1 && JU.Logger.debugging) {
JU.Logger.debug ("createAtomDataSet: " + n + " atoms found at position " + pt);
}}switch (tokType) {
case 1145047055:
var vib = iterAtom.getVib ();
if (vib == null) continue;
if (JU.Logger.debugging) JU.Logger.debug ("xyz: " + pt + " vib: " + vib);
modelSet.setAtomCoords (bs, 1145047055, vib);
break;
case 1128269825:
modelSet.setAtomProperty (bs, tokType, 0, iterAtom.getOccupancy (), null, null, null);
break;
case 1111492619:
modelSet.setAtomProperty (bs, tokType, 0, iterAtom.getPartialCharge (), null, null, null);
break;
case 1111492620:
modelSet.setAtomProperty (bs, tokType, 0, iterAtom.getBfactor (), null, null, null);
break;
}
}
switch (tokType) {
case 1145047055:
var vibName = adapter.getAtomSetName (asc, 0);
JU.Logger.info ("_vibrationName = " + vibName);
vwr.setStringProperty ("_vibrationName", vibName);
break;
case 1145047050:
JU.Logger.info (n + " atom positions read");
modelSet.recalculateLeadMidpointsAndWingVectors (-1);
if (n == modelSet.ac) return "boundbox {*};reset";
break;
}
return null;
}, "JV.Viewer,JM.ModelSet,~N,~O,JU.BS");
Clazz.defineStatics (c$,
"defaultGroupCount", 32);
});
