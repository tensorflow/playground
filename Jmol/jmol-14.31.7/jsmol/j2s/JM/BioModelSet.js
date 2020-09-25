Clazz.declarePackage ("JM");
Clazz.load (null, "JM.BioModelSet", ["java.lang.Boolean", "$.Character", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.PT", "$.SB", "J.api.Interface", "J.c.STR", "JM.Group", "JM.AlphaMonomer", "$.AminoPolymer", "$.BioResolver", "$.Monomer", "JS.T", "JU.BSUtil", "$.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.ms = null;
this.ext = null;
this.unitIdSets = null;
Clazz.instantialize (this, arguments);
}, JM, "BioModelSet");
Clazz.defineMethod (c$, "getBioExt", 
function () {
return (this.ext == null ? (this.ext = (J.api.Interface.getInterface ("JM.BioExt", this.vwr, "script"))).set (this.vwr, this.vwr.ms) : this.ext);
});
Clazz.defineMethod (c$, "set", 
function (vwr, ms) {
this.vwr = vwr;
this.ms = ms;
this.unitIdSets = null;
if (this.ext != null) this.ext.set (vwr, ms);
return this;
}, "JV.Viewer,JM.ModelSet");
Clazz.defineMethod (c$, "calcAllRasmolHydrogenBonds", 
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
Clazz.defineMethod (c$, "calcSelectedMonomersCount", 
function () {
var bsSelected = this.vwr.bsA ();
for (var i = this.ms.mc; --i >= 0; ) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
for (var j = m.bioPolymerCount; --j >= 0; ) m.bioPolymers[j].calcSelectedMonomersCount (bsSelected);

}
});
Clazz.defineMethod (c$, "calculateAllPolymers", 
function (groups, groupCount, baseGroupIndex, modelsExcluded) {
var checkConnections = !this.vwr.getBoolean (603979896);
if (groupCount < 0) groupCount = groups.length;
if (modelsExcluded != null) for (var j = 0; j < groupCount; ++j) {
var group = groups[j];
if (Clazz.instanceOf (group, JM.Monomer)) {
if ((group).bioPolymer != null && (!modelsExcluded.get (group.chain.model.modelIndex))) (group).setBioPolymer (null, -1);
}}
for (var i = 0, mc = this.ms.mc; i < mc; i++) if ((modelsExcluded == null || !modelsExcluded.get (i)) && this.ms.am[i].isBioModel) {
for (var pt = 0, j = baseGroupIndex; j < groupCount; ++j, pt++) {
var g = groups[j];
var model = g.getModel ();
if (!model.isBioModel || !(Clazz.instanceOf (g, JM.Monomer))) continue;
var doCheck = checkConnections && !this.ms.isJmolDataFrameForModel (this.ms.at[g.firstAtomIndex].mi);
var bp = ((g).bioPolymer == null ? JM.BioResolver.allocateBioPolymer (groups, j, doCheck, pt) : null);
if (bp == null || bp.monomerCount == 0) continue;
var n = (model).addBioPolymer (bp);
j += n - 1;
pt += n - 1;
}
}
}, "~A,~N,~N,JU.BS");
Clazz.defineMethod (c$, "calculateAllStructuresExcept", 
function (alreadyDefined, asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha, version) {
var ret = "";
var bsModels = JU.BSUtil.copyInvert (alreadyDefined, this.ms.mc);
if (setStructure) this.setAllDefaultStructure (bsModels);
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (this.ms.am[i].isBioModel) ret += (this.ms.am[i]).calculateStructures (asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha, version);

if (setStructure) this.ms.setStructureIndexes ();
return ret;
}, "JU.BS,~B,~B,~B,~B,~B,~N");
Clazz.defineMethod (c$, "calculateAllStuctures", 
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
Clazz.defineMethod (c$, "calculateStraightnessAll", 
function () {
this.getBioExt ().calculateStraightnessAll ();
});
Clazz.defineMethod (c$, "calculateStruts", 
function (bs1, bs2) {
return this.getBioExt ().calculateAllstruts (this.vwr, this.ms, bs1, bs2);
}, "JU.BS,JU.BS");
Clazz.defineMethod (c$, "getAllDefaultStructures", 
function (bsAtoms, bsModified) {
var bsModels = this.modelsOf (bsAtoms, bsModified);
var ret =  new JU.SB ();
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (this.ms.am[i].isBioModel && (this.ms.am[i]).defaultStructure != null) ret.append ((this.ms.am[i]).defaultStructure);

return ret.toString ();
}, "JU.BS,JU.BS");
Clazz.defineMethod (c$, "getAllHeteroList", 
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
Clazz.defineMethod (c$, "getAllPolymerInfo", 
function (bs, info) {
this.getBioExt ().getAllPolymerInfo (bs, info);
}, "JU.BS,java.util.Map");
Clazz.defineMethod (c$, "getAllPolymerPointsAndVectors", 
function (bs, vList, isTraceAlpha, sheetSmoothing) {
for (var i = 0; i < this.ms.mc; ++i) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
var last = 2147483646;
for (var ip = 0; ip < m.bioPolymerCount; ip++) last = m.bioPolymers[ip].getPolymerPointsAndVectors (last, bs, vList, isTraceAlpha, sheetSmoothing);

}
}, "JU.BS,JU.Lst,~B,~N");
Clazz.defineMethod (c$, "getAllSequenceBits", 
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
Clazz.defineMethod (c$, "getAtomBitsBS", 
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
Clazz.defineMethod (c$, "getAtomBitsStr", 
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
Clazz.defineMethod (c$, "getBioPolymerCountInModel", 
function (modelIndex) {
if (modelIndex < 0) {
var polymerCount = 0;
for (var i = this.ms.mc; --i >= 0; ) if (!this.ms.isTrajectorySubFrame (i) && this.ms.am[i].isBioModel) polymerCount += (this.ms.am[i]).getBioPolymerCount ();

return polymerCount;
}return (this.ms.isTrajectorySubFrame (modelIndex) || !this.ms.am[modelIndex].isBioModel ? 0 : (this.ms.am[modelIndex]).getBioPolymerCount ());
}, "~N");
Clazz.defineMethod (c$, "getFullProteinStructureState", 
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
if (!(Clazz.instanceOf (a.group, JM.AlphaMonomer)) || (ps = (a.group).proteinStructure) == null || map.containsKey (ps)) continue;
lstStr.addLast (ps);
map.put (ps, Boolean.TRUE);
}
}
this.getStructureLines (bsAtoms, cmd, lstStr, J.c.STR.HELIX, scriptMode, mode);
this.getStructureLines (bsAtoms, cmd, lstStr, J.c.STR.SHEET, scriptMode, mode);
this.getStructureLines (bsAtoms, cmd, lstStr, J.c.STR.TURN, scriptMode, mode);
return cmd.toString ();
}, "JU.BS,~N");
Clazz.defineMethod (c$, "getGroupsWithinAll", 
function (nResidues, bs) {
var bsResult =  new JU.BS ();
var bsCheck = this.ms.getIterativeModels (false);
for (var iModel = this.ms.mc; --iModel >= 0; ) if (bsCheck.get (iModel) && this.ms.am[iModel].isBioModel) {
var m = this.ms.am[iModel];
for (var i = m.bioPolymerCount; --i >= 0; ) m.bioPolymers[i].getRangeGroups (nResidues, bs, bsResult);

}
return bsResult;
}, "~N,JU.BS");
Clazz.defineMethod (c$, "getIdentifierOrNull", 
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
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
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
Clazz.defineMethod (c$, "mutate", 
function (bs, group, sequence) {
return this.getBioExt ().mutate (this.vwr, bs, group, sequence);
}, "JU.BS,~S,~A");
Clazz.defineMethod (c$, "recalculateAllPolymers", 
function (bsModelsExcluded, groups) {
for (var i = 0; i < this.ms.mc; i++) if (this.ms.am[i].isBioModel && !bsModelsExcluded.get (i)) (this.ms.am[i]).clearBioPolymers ();

this.calculateAllPolymers (groups, -1, 0, bsModelsExcluded);
}, "JU.BS,~A");
Clazz.defineMethod (c$, "recalculatePoints", 
function (modelIndex) {
if (modelIndex < 0) {
for (var i = this.ms.mc; --i >= 0; ) if (!this.ms.isTrajectorySubFrame (i) && this.ms.am[i].isBioModel) (this.ms.am[i]).recalculateLeadMidpointsAndWingVectors ();

return;
}if (!this.ms.isTrajectorySubFrame (modelIndex) && this.ms.am[modelIndex].isBioModel) (this.ms.am[modelIndex]).recalculateLeadMidpointsAndWingVectors ();
}, "~N");
Clazz.defineMethod (c$, "setAllConformation", 
function (bsAtoms) {
var bsModels = this.ms.getModelBS (bsAtoms, false);
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
if (m.altLocCount > 0) for (var j = m.bioPolymerCount; --j >= 0; ) m.bioPolymers[j].setConformation (bsAtoms);

}
}, "JU.BS");
Clazz.defineMethod (c$, "setAllProteinType", 
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
var lastStrucNo =  Clazz.newIntArray (this.ms.mc, 0);
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
Clazz.defineMethod (c$, "setAllStructureList", 
function (structureList) {
for (var iModel = this.ms.mc; --iModel >= 0; ) if (this.ms.am[iModel].isBioModel) {
var m = this.ms.am[iModel];
m.bioPolymers = JU.AU.arrayCopyObject (m.bioPolymers, m.bioPolymerCount);
for (var i = m.bioPolymerCount; --i >= 0; ) {
var bp = m.bioPolymers[i];
if (Clazz.instanceOf (bp, JM.AminoPolymer)) (bp).setStructureList (structureList);
}
}
}, "java.util.Map");
Clazz.defineMethod (c$, "getAllBasePairBits", 
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
Clazz.defineMethod (c$, "getAllUnitIds", 
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
var ptrs =  Clazz.newIntArray (8, 0);
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
Clazz.defineMethod (c$, "checkMap", 
 function (map, key, bsAtoms) {
var bs = JU.BSUtil.copy (bsAtoms);
var bs0 = map.get (key);
if (bs0 == null) map.put (key, bs0 = bs);
 else bs0.or (bs);
return bs0;
}, "java.util.Map,~S,JU.BS");
Clazz.defineMethod (c$, "addUnit", 
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
Clazz.defineMethod (c$, "getAnnotationBits", 
 function (name, tok, specInfo) {
var bs =  new JU.BS ();
var pa = this.vwr.getAnnotationParser (name.equals ("dssr"));
var ann;
for (var i = this.ms.mc; --i >= 0; ) if ((ann = this.ms.getInfo (i, name)) != null) bs.or (pa.getAtomBits (this.vwr, specInfo, (this.ms.am[i]).getCachedAnnotationMap (name + " V ", ann), this.ms.am[i].dssrCache, tok, i, this.ms.am[i].bsAtoms));

return bs;
}, "~S,~N,~S");
Clazz.defineMethod (c$, "getStructureLines", 
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
Clazz.defineMethod (c$, "modelsOf", 
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
Clazz.defineMethod (c$, "setAllDefaultStructure", 
 function (bsModels) {
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
if (m.defaultStructure == null) m.defaultStructure = this.getFullProteinStructureState (m.bsAtoms, 1073742158);
}
}, "JU.BS");
Clazz.defineMethod (c$, "getAminoAcidValenceAndCharge", 
function (s, atomName, aaRet) {
return this.getBioExt ().getAminoAcidValenceAndCharge (s, atomName, aaRet);
}, "~S,~S,~A");
});
