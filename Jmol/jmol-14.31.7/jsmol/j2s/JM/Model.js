Clazz.declarePackage ("JM");
Clazz.load (["JU.BS", "$.SB"], "JM.Model", ["java.util.Hashtable", "JU.AU", "JU.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ms = null;
this.mat4 = null;
this.modelIndex = 0;
this.fileIndex = 0;
this.isBioModel = false;
this.isPdbWithMultipleBonds = false;
this.isModelKit = false;
this.chains = null;
this.simpleCage = null;
this.dssrCache = null;
this.orientation = null;
this.auxiliaryInfo = null;
this.properties = null;
this.biosymmetry = null;
this.dataFrames = null;
this.translation = null;
this.dataSourceFrame = -1;
this.loadState = "";
this.loadScript = null;
this.hasRasmolHBonds = false;
this.structureTainted = false;
this.isJmolDataFrame = false;
this.isTrajectory = false;
this.trajectoryBaseIndex = 0;
this.altLocCount = 0;
this.insertionCount = 0;
this.act = 0;
this.bondCount = -1;
this.chainCount = 0;
this.groupCount = -1;
this.hydrogenCount = 0;
this.moleculeCount = 0;
this.biosymmetryCount = 0;
this.firstAtomIndex = 0;
this.firstMoleculeIndex = 0;
this.bsAtoms = null;
this.bsAtomsDeleted = null;
this.defaultRotationRadius = 0;
this.frameDelay = 0;
this.selectedTrajectory = -1;
this.jmolData = null;
this.jmolFrameType = null;
this.pdbID = null;
this.bsCheck = null;
this.hasChirality = false;
Clazz.instantialize (this, arguments);
}, JM, "Model");
Clazz.prepareFields (c$, function () {
this.chains =  new Array (8);
this.loadScript =  new JU.SB ();
this.bsAtoms =  new JU.BS ();
this.bsAtomsDeleted =  new JU.BS ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo) {
this.ms = modelSet;
this.dataSourceFrame = this.modelIndex = modelIndex;
this.isTrajectory = (trajectoryBaseIndex >= 0);
this.trajectoryBaseIndex = (this.isTrajectory ? trajectoryBaseIndex : modelIndex);
if (auxiliaryInfo == null) {
auxiliaryInfo =  new java.util.Hashtable ();
}this.auxiliaryInfo = auxiliaryInfo;
if (auxiliaryInfo.containsKey ("biosymmetryCount")) {
this.biosymmetryCount = (auxiliaryInfo.get ("biosymmetryCount")).intValue ();
this.biosymmetry = auxiliaryInfo.get ("biosymmetry");
}this.properties = properties;
if (jmolData == null) {
this.jmolFrameType = "modelSet";
} else {
this.jmolData = jmolData;
this.isJmolDataFrame = true;
auxiliaryInfo.put ("jmolData", jmolData);
auxiliaryInfo.put ("title", jmolData);
this.jmolFrameType = (jmolData.indexOf ("ramachandran") >= 0 ? "ramachandran" : jmolData.indexOf ("quaternion") >= 0 ? "quaternion" : "data");
}return this;
}, "JM.ModelSet,~N,~N,~S,java.util.Properties,java.util.Map");
Clazz.defineMethod (c$, "getTrueAtomCount", 
function () {
return this.bsAtoms.cardinality () - this.bsAtomsDeleted.cardinality ();
});
Clazz.defineMethod (c$, "isContainedIn", 
function (bs) {
if (this.bsCheck == null) this.bsCheck =  new JU.BS ();
this.bsCheck.or (bs);
this.bsCheck.and (this.bsAtoms);
this.bsCheck.andNot (this.bsAtomsDeleted);
return (this.bsCheck.cardinality () == this.getTrueAtomCount ());
}, "JU.BS");
Clazz.defineMethod (c$, "resetBoundCount", 
function () {
this.bondCount = -1;
});
Clazz.defineMethod (c$, "getBondCount", 
function () {
if (this.bondCount >= 0) return this.bondCount;
var bonds = this.ms.bo;
this.bondCount = 0;
for (var i = this.ms.bondCount; --i >= 0; ) if (bonds[i].atom1.mi == this.modelIndex) this.bondCount++;

return this.bondCount;
});
Clazz.defineMethod (c$, "getChainCount", 
function (countWater) {
if (this.chainCount > 1 && !countWater) for (var i = 0; i < this.chainCount; i++) if (this.chains[i].chainID == 0) return this.chainCount - 1;

return this.chainCount;
}, "~B");
Clazz.defineMethod (c$, "calcSelectedGroupsCount", 
function (bsSelected) {
for (var i = this.chainCount; --i >= 0; ) this.chains[i].calcSelectedGroupsCount (bsSelected);

}, "JU.BS");
Clazz.defineMethod (c$, "getGroupCount", 
function () {
if (this.groupCount < 0) {
this.groupCount = 0;
for (var i = this.chainCount; --i >= 0; ) this.groupCount += this.chains[i].groupCount;

}return this.groupCount;
});
Clazz.defineMethod (c$, "getChainAt", 
function (i) {
return (i < this.chainCount ? this.chains[i] : null);
}, "~N");
Clazz.defineMethod (c$, "getChain", 
function (chainID) {
for (var i = this.chainCount; --i >= 0; ) {
var chain = this.chains[i];
if (chain.chainID == chainID) return chain;
}
return null;
}, "~N");
Clazz.defineMethod (c$, "resetDSSR", 
function (totally) {
this.dssrCache = null;
if (totally) this.auxiliaryInfo.remove ("dssr");
}, "~B");
Clazz.defineMethod (c$, "fixIndices", 
function (modelIndex, nAtomsDeleted, bsDeleted) {
this.fixIndicesM (modelIndex, nAtomsDeleted, bsDeleted);
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "fixIndicesM", 
function (modelIndex, nAtomsDeleted, bsDeleted) {
if (this.dataSourceFrame > modelIndex) this.dataSourceFrame--;
if (this.trajectoryBaseIndex > modelIndex) this.trajectoryBaseIndex--;
this.firstAtomIndex -= nAtomsDeleted;
for (var i = 0; i < this.chainCount; i++) this.chains[i].fixIndices (nAtomsDeleted, bsDeleted);

JU.BSUtil.deleteBits (this.bsAtoms, bsDeleted);
JU.BSUtil.deleteBits (this.bsAtomsDeleted, bsDeleted);
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "freeze", 
function () {
this.freezeM ();
return false;
});
Clazz.defineMethod (c$, "freezeM", 
function () {
for (var i = 0; i < this.chainCount; i++) if (this.chains[i].groupCount == 0) {
for (var j = i + 1; j < this.chainCount; j++) this.chains[j - 1] = this.chains[j];

this.chainCount--;
}
this.chains = JU.AU.arrayCopyObject (this.chains, this.chainCount);
this.groupCount = -1;
this.getGroupCount ();
for (var i = 0; i < this.chainCount; ++i) this.chains[i].groups = JU.AU.arrayCopyObject (this.chains[i].groups, this.chains[i].groupCount);

});
});
