Clazz.declarePackage ("JM");
Clazz.load (["JM.Group"], "JM.Monomer", ["java.lang.Float", "JU.Measure", "$.P3", "$.Quat", "J.c.STR", "JM.BioResolver", "$.ProteinStructure", "JU.Escape", "$.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
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
Clazz.instantialize (this, arguments);
}, JM, "Monomer", JM.Group);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JM.Monomer, []);
});
c$.have = Clazz.defineMethod (c$, "have", 
function (offsets, n) {
return (offsets[n] & 0xFF) != 0xFF;
}, "~A,~N");
Clazz.defineMethod (c$, "set2", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, interestingAtomOffsets) {
this.setGroup (chain, group3, seqcode, firstAtomIndex, lastAtomIndex);
this.offsets = interestingAtomOffsets;
this.setLeadAtomIndex ();
return this;
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setLeadAtomIndex", 
function () {
var offset = this.offsets[0] & 0xFF;
if (offset != 255) this.leadAtomIndex = this.firstAtomIndex + offset;
});
Clazz.defineMethod (c$, "setBioPolymer", 
function (polymer, index) {
this.bioPolymer = polymer;
this.monomerIndex = index;
}, "JM.BioPolymer,~N");
Clazz.overrideMethod (c$, "getSelectedMonomerCount", 
function () {
return (this.bioPolymer == null ? 0 : this.bioPolymer.getSelectedMonomerCount ());
});
Clazz.overrideMethod (c$, "getSelectedMonomerIndex", 
function () {
return (this.bioPolymer == null || !this.bioPolymer.isMonomerSelected (this.monomerIndex) ? -1 : this.monomerIndex);
});
Clazz.overrideMethod (c$, "getBioPolymerLength", 
function () {
return (this.bioPolymer == null ? 0 : this.bioPolymer.monomerCount);
});
Clazz.defineMethod (c$, "getMonomerIndex", 
function () {
return this.monomerIndex;
});
Clazz.overrideMethod (c$, "getAtomIndex", 
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
Clazz.defineMethod (c$, "getBioPolymerIndexInModel", 
function () {
return (this.bioPolymer == null ? -1 : this.bioPolymer.bioPolymerIndexInModel);
});
c$.scanForOffsets = Clazz.defineMethod (c$, "scanForOffsets", 
function (firstAtomIndex, specialAtomIndexes, interestingAtomIDs) {
var interestingCount = interestingAtomIDs.length;
var offsets =  Clazz.newByteArray (interestingCount, 0);
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
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return J.c.STR.NONE;
});
Clazz.defineMethod (c$, "isHelix", 
function () {
return false;
});
Clazz.defineMethod (c$, "isSheet", 
function () {
return false;
});
Clazz.overrideMethod (c$, "setStrucNo", 
function (id) {
}, "~N");
Clazz.defineMethod (c$, "getAtomFromOffsetIndex", 
function (offsetIndex) {
if (offsetIndex > this.offsets.length) return null;
var offset = this.offsets[offsetIndex] & 0xFF;
return (offset == 255 ? null : this.chain.model.ms.at[this.firstAtomIndex + offset]);
}, "~N");
Clazz.defineMethod (c$, "getSpecialAtom", 
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
Clazz.defineMethod (c$, "getSpecialAtomPoint", 
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
Clazz.overrideMethod (c$, "isLeadAtom", 
function (atomIndex) {
return atomIndex == this.leadAtomIndex;
}, "~N");
Clazz.overrideMethod (c$, "getLeadAtom", 
function () {
return this.getAtomFromOffsetIndex (0);
});
Clazz.defineMethod (c$, "getWingAtom", 
function () {
return this.getAtomFromOffsetIndex (1);
});
Clazz.defineMethod (c$, "getInitiatorAtom", 
function () {
return this.getLeadAtom ();
});
Clazz.defineMethod (c$, "getTerminatorAtom", 
function () {
return this.getLeadAtom ();
});
Clazz.defineMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
}, "~N,~N,~A,~N,~N");
Clazz.defineMethod (c$, "getMyInfo", 
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
if (Clazz.instanceOf (structure, JM.ProteinStructure)) {
info.put ("structureId", Integer.$valueOf ((structure).strucNo));
info.put ("structureType", (structure).type.getBioStructureTypeName (false));
}info.put ("shapeVisibilityFlags", Integer.$valueOf (this.shapeVisibilityFlags));
return info;
}, "JU.P3");
Clazz.overrideMethod (c$, "getStructureId", 
function () {
var structure = this.getStructure ();
return (Clazz.instanceOf (structure, JM.ProteinStructure) ? (structure).type.getBioStructureTypeName (false) : "");
});
Clazz.defineMethod (c$, "updateOffsetsForAlternativeLocations", 
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
Clazz.defineMethod (c$, "getMonomerSequenceAtoms", 
function (bsInclude, bsResult) {
this.setAtomBits (bsResult);
bsResult.and (bsInclude);
}, "JU.BS,JU.BS");
c$.checkOptional = Clazz.defineMethod (c$, "checkOptional", 
function (offsets, atom, firstAtomIndex, index) {
if (JM.Monomer.have (offsets, atom)) return true;
if (index < 0) return false;
offsets[atom] = (index - firstAtomIndex);
return true;
}, "~A,~N,~N,~N");
Clazz.defineMethod (c$, "getQuaternionFrameCenter", 
function (qtype) {
return null;
}, "~S");
Clazz.defineMethod (c$, "getHelixData2", 
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
Clazz.defineMethod (c$, "getUniqueID", 
function () {
var cid = this.chain.chainID;
var a = this.getLeadAtom ();
var id = (a == null ? "" : "_" + a.mi) + "_" + this.getResno () + (cid == 0 ? "" : "_" + cid);
var aid = (a == null ? '\0' : this.getLeadAtom ().altloc);
if (aid != '\0') id += "_" + aid;
return id;
});
Clazz.overrideMethod (c$, "isCrossLinked", 
function (g) {
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLinkGroup (i, null, g, true, true, false)) return true;

return false;
}, "JM.Group");
Clazz.overrideMethod (c$, "getCrossLinkVector", 
function (vReturn, crosslinkCovalent, crosslinkHBond) {
var isNotCheck = (vReturn == null);
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLinkGroup (i, vReturn, null, crosslinkCovalent, crosslinkHBond, isNotCheck) && isNotCheck) return true;

return !isNotCheck && vReturn.size () > 0;
}, "JU.Lst,~B,~B");
Clazz.defineMethod (c$, "getCrossLinkGroup", 
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
Clazz.defineMethod (c$, "isConnectedPrevious", 
function () {
return true;
});
Clazz.defineMethod (c$, "setGroupParameter", 
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
Clazz.overrideMethod (c$, "getGroupParameter", 
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
Clazz.overrideMethod (c$, "getGroup1", 
function () {
return (this.groupID < JM.BioResolver.predefinedGroup1Names.length ? JM.BioResolver.predefinedGroup1Names[this.groupID] : this.group1.charCodeAt (0) > 1 ? this.group1 : this.group1.charCodeAt (0) == 1 ? '?' : (this.group1 = this.getGroup1b ()));
});
Clazz.defineMethod (c$, "getGroup1b", 
function () {
return '?';
});
Clazz.overrideMethod (c$, "setGroupID", 
function (group3) {
this.groupID = JM.BioResolver.getGroupIdFor (group3);
}, "~S");
});
