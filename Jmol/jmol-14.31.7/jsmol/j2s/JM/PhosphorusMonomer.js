Clazz.declarePackage ("JM");
Clazz.load (["JM.Monomer"], "JM.PhosphorusMonomer", ["JU.Quat", "$.V3", "J.c.STR"], function () {
c$ = Clazz.declareType (JM, "PhosphorusMonomer", JM.Monomer);
Clazz.overrideMethod (c$, "isNucleic", 
function () {
return true;
});
Clazz.overrideConstructor (c$, 
function () {
});
c$.validateAndAllocateP = Clazz.defineMethod (c$, "validateAndAllocateP", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
return (firstIndex != lastIndex || specialAtomIndexes[13] != firstIndex ? null :  new JM.PhosphorusMonomer ().set2 (chain, group3, seqcode, firstIndex, lastIndex, JM.PhosphorusMonomer.phosphorusOffsets));
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz.overrideMethod (c$, "isDna", 
function () {
return this.isDnaByID ();
});
Clazz.overrideMethod (c$, "isRna", 
function () {
return this.isRnaByID ();
});
Clazz.overrideMethod (c$, "isPurine", 
function () {
return this.isPurineByID ();
});
Clazz.overrideMethod (c$, "isPyrimidine", 
function () {
return this.isPyrimidineByID ();
});
Clazz.overrideMethod (c$, "getStructure", 
function () {
return this.chain;
});
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return J.c.STR.NONE;
});
Clazz.overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
return this.isCA2 (possiblyPreviousMonomer);
}, "JM.Monomer");
Clazz.defineMethod (c$, "isCA2", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var distance = this.getLeadAtom ().distance (possiblyPreviousMonomer.getLeadAtom ());
return distance <= JM.PhosphorusMonomer.MAX_ADJACENT_PHOSPHORUS_DISTANCE;
}, "JM.Monomer");
Clazz.overrideMethod (c$, "getQuaternion", 
function (qType) {
return this.getQuaternionP ();
}, "~S");
Clazz.defineMethod (c$, "getQuaternionP", 
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
Clazz.overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
return this.getAtomFromOffsetIndex (0);
}, "~S");
Clazz.overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz.defineStatics (c$,
"P", 0,
"phosphorusOffsets",  Clazz.newByteArray (-1, [0]),
"MAX_ADJACENT_PHOSPHORUS_DISTANCE", 8.0);
});
