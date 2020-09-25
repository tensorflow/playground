Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["J.api.JmolAdapterStructureIterator"], "J.adapter.smarter.StructureIterator", ["J.api.JmolAdapter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.structureCount = 0;
this.structures = null;
this.structure = null;
this.istructure = 0;
this.bsModelsDefined = null;
Clazz.instantialize (this, arguments);
}, J.adapter.smarter, "StructureIterator", J.api.JmolAdapterStructureIterator);
Clazz.makeConstructor (c$, 
function (asc) {
Clazz.superConstructor (this, J.adapter.smarter.StructureIterator, []);
this.structureCount = asc.structureCount;
this.structures = asc.structures;
this.istructure = 0;
this.bsModelsDefined = asc.bsStructuredModels;
}, "J.adapter.smarter.AtomSetCollection");
Clazz.overrideMethod (c$, "hasNext", 
function () {
if (this.istructure == this.structureCount) return false;
this.structure = this.structures[this.istructure++];
return true;
});
Clazz.overrideMethod (c$, "getStructureType", 
function () {
return this.structure.structureType;
});
Clazz.overrideMethod (c$, "getSubstructureType", 
function () {
return this.structure.substructureType;
});
Clazz.overrideMethod (c$, "getStructureID", 
function () {
return this.structure.structureID;
});
Clazz.overrideMethod (c$, "getSerialID", 
function () {
return this.structure.serialID;
});
Clazz.overrideMethod (c$, "getStartChainID", 
function () {
return this.structure.startChainID;
});
Clazz.overrideMethod (c$, "getStartSequenceNumber", 
function () {
return this.structure.startSequenceNumber;
});
Clazz.overrideMethod (c$, "getStartInsertionCode", 
function () {
return J.api.JmolAdapter.canonizeInsertionCode (this.structure.startInsertionCode);
});
Clazz.overrideMethod (c$, "getEndChainID", 
function () {
return this.structure.endChainID;
});
Clazz.overrideMethod (c$, "getEndSequenceNumber", 
function () {
return this.structure.endSequenceNumber;
});
Clazz.overrideMethod (c$, "getEndInsertionCode", 
function () {
return this.structure.endInsertionCode;
});
Clazz.overrideMethod (c$, "getStrandCount", 
function () {
return this.structure.strandCount;
});
Clazz.overrideMethod (c$, "getStructuredModels", 
function () {
return this.bsModelsDefined;
});
Clazz.overrideMethod (c$, "getAtomIndices", 
function () {
return this.structure.atomStartEnd;
});
Clazz.overrideMethod (c$, "getModelIndices", 
function () {
return this.structure.modelStartEnd;
});
Clazz.overrideMethod (c$, "getBSAll", 
function () {
return this.structure.bsAll;
});
});
