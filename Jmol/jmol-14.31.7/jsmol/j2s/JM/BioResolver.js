Clazz.declarePackage ("JM");
Clazz.load (["java.util.Hashtable", "J.c.STR"], "JM.BioResolver", ["java.lang.Boolean", "$.Byte", "$.NullPointerException", "$.Short", "java.util.Arrays", "JU.AU", "$.BS", "$.Measure", "$.P3", "$.P4", "$.PT", "$.SB", "$.V3", "JM.Group", "JM.AlphaMonomer", "$.AlphaPolymer", "$.AminoMonomer", "$.AminoPolymer", "$.BioModel", "$.CarbohydrateMonomer", "$.CarbohydratePolymer", "$.Monomer", "$.NucleicMonomer", "$.NucleicPolymer", "$.PhosphorusMonomer", "$.PhosphorusPolymer", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
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
Clazz.instantialize (this, arguments);
}, JM, "BioResolver", null, java.util.Comparator);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setLoader", 
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
modelLoader.specialAtomIndexes =  Clazz.newIntArray (JM.BioResolver.ATOMID_MAX, 0);
}return this;
}, "JM.ModelLoader");
Clazz.defineMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
if (JM.Group.standardGroupList == null) {
var s =  new JU.SB ();
for (var i = 1; i < 42; i++) s.append (",[").append (JM.BioResolver.predefinedGroup3Names[i]).append ("]");

s.append (",[AHR],[ALL],[AMU],[ARA],[ARB],[BDF],[BDR],[BGC],[BMA],[FCA],[FCB],[FRU],[FUC],[FUL],[GAL],[GLA],[GLC],[GXL],[GUP],[LXC],[MAN],[RAM],[RIB],[RIP],[XYP],[XYS],[CBI],[CT3],[CTR],[CTT],[LAT],[MAB],[MAL],[MLR],[MTT],[SUC],[TRE],[GCU],[MTL],[NAG],[NDG],[RHA],[SOR],[SOL],[SOE],[XYL],[A2G],[LBT],[NGA],[SIA],[SLB],[AFL],[AGC],[GLB],[NAN],[RAA]");
JM.BioResolver.group3Count = Clazz.doubleToInt (s.length () / 6);
JM.Group.standardGroupList = s.toString ();
for (var i = 0, n = JM.BioResolver.predefinedGroup3Names.length; i < n; ++i) JM.BioResolver.addGroup3Name (JM.BioResolver.predefinedGroup3Names[i].trim ());

}return this;
}, "JV.Viewer");
Clazz.defineMethod (c$, "getBioModel", 
function (modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo) {
return  new JM.BioModel (this.ms, modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo);
}, "~N,~N,~S,java.util.Properties,java.util.Map");
Clazz.defineMethod (c$, "distinguishAndPropagateGroup", 
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
Clazz.defineMethod (c$, "setHaveHsAlready", 
function (b) {
this.haveHsAlready = b;
}, "~B");
Clazz.defineMethod (c$, "initializeHydrogenAddition", 
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
Clazz.defineMethod (c$, "addImplicitHydrogenAtoms", 
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
Clazz.defineMethod (c$, "getBondInfo", 
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
Clazz.defineMethod (c$, "getLigandBondInfo", 
 function (adapter, model, group3) {
var dataIn = adapter.getBondList (model);
var htAtoms =  new java.util.Hashtable ();
var iterAtom = adapter.getAtomIterator (model);
while (iterAtom.hasNext ()) htAtoms.put (iterAtom.getAtomName (), iterAtom.getXYZ ());

var bondInfo =  new Array (dataIn.length * 2);
var n = 0;
for (var i = 0; i < dataIn.length; i++) {
var b = dataIn[i];
if (b[0].charAt (0) != 'H') bondInfo[n++] =  Clazz.newArray (-1, [b[0], b[1], b[2], b[1].startsWith ("H") ? "0" : "1"]);
if (b[1].charAt (0) != 'H') bondInfo[n++] =  Clazz.newArray (-1, [b[1], b[0], b[2], b[0].startsWith ("H") ? "0" : "1"]);
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
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (b == null ? (a == null ? 0 : -1) : a == null ? 1 : a[0].compareTo (b[0]) < 0 ? -1 : a[0].compareTo (b[0]) > 0 ? 1 : a[3].compareTo (b[3]) < 0 ? -1 : a[3].compareTo (b[3]) > 0 ? 1 : a[1].compareTo (b[1]) < 0 ? -1 : a[1].compareTo (b[1]) > 0 ? 1 : 0);
}, "~A,~A");
Clazz.defineMethod (c$, "finalizeHydrogens", 
function () {
this.vwr.getLigandModel (null, null, null, null);
this.finalizePdbMultipleBonds ();
this.addHydrogens ();
});
Clazz.defineMethod (c$, "addHydrogens", 
 function () {
if (this.bsAddedHydrogens.nextSetBit (0) < 0) return;
this.bsAddedMask = JU.BSUtil.copy (this.bsAddedHydrogens);
this.finalizePdbCharges ();
var nTotal =  Clazz.newIntArray (1, 0);
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
Clazz.defineMethod (c$, "deleteUnneededAtoms", 
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
Clazz.defineMethod (c$, "deleteAtoms", 
 function (bsDeletedAtoms) {
var mapOldToNew =  Clazz.newIntArray (this.ms.ac, 0);
var mapNewToOld =  Clazz.newIntArray (this.ms.ac - bsDeletedAtoms.cardinality (), 0);
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
Clazz.defineMethod (c$, "fixAnnotations", 
 function (i, name, type) {
var o = this.ml.ms.getInfo (i, name);
if (o != null) {
var dbObj = (this.ms.am[i]).getCachedAnnotationMap (name, o);
if (dbObj != null) this.vwr.getAnnotationParser (false).fixAtoms (i, dbObj, this.bsAddedMask, type, 20);
}}, "~N,~S,~N");
Clazz.defineMethod (c$, "finalizePdbCharges", 
 function () {
var atoms = this.ms.at;
for (var i = this.bsAtomsForHs.nextSetBit (0); i >= 0; i = this.bsAtomsForHs.nextSetBit (i + 1)) {
var a = atoms[i];
if (a.group.getNitrogenAtom () === a && a.getCovalentBondCount () == 1) a.setFormalCharge (1);
if ((i = this.bsAtomsForHs.nextClearBit (i + 1)) < 0) break;
}
});
Clazz.defineMethod (c$, "finalizePdbMultipleBonds", 
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
Clazz.defineMethod (c$, "setHydrogen", 
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
Clazz.defineMethod (c$, "fixPropertyValue", 
function (bsAtoms, data, toHydrogens) {
var atoms = this.ms.at;
var fData = data;
var newData =  Clazz.newFloatArray (bsAtoms.cardinality (), 0);
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
c$.allocateBioPolymer = Clazz.defineMethod (c$, "allocateBioPolymer", 
function (groups, firstGroupIndex, checkConnections, pt0) {
var previous = null;
var count = 0;
for (var i = firstGroupIndex; i < groups.length; ++i) {
var group = groups[i];
var current;
if (!(Clazz.instanceOf (group, JM.Monomer)) || (current = group).bioPolymer != null || previous != null && previous.getClass () !== current.getClass () || checkConnections && !current.isConnectedAfter (previous)) break;
previous = current;
count++;
}
if (count < 2) return null;
var monomers =  new Array (count);
for (var j = 0; j < count; ++j) monomers[j] = groups[firstGroupIndex + j];

if (Clazz.instanceOf (previous, JM.AminoMonomer)) return  new JM.AminoPolymer (monomers, pt0);
if (Clazz.instanceOf (previous, JM.AlphaMonomer)) return  new JM.AlphaPolymer (monomers, pt0);
if (Clazz.instanceOf (previous, JM.NucleicMonomer)) return  new JM.NucleicPolymer (monomers);
if (Clazz.instanceOf (previous, JM.PhosphorusMonomer)) return  new JM.PhosphorusPolymer (monomers);
if (Clazz.instanceOf (previous, JM.CarbohydrateMonomer)) return  new JM.CarbohydratePolymer (monomers);
JU.Logger.error ("Polymer.allocatePolymer() ... no matching polymer for monomor " + previous);
throw  new NullPointerException ();
}, "~A,~N,~B,~N");
Clazz.defineMethod (c$, "iterateOverAllNewStructures", 
function (adapter, atomSetCollection) {
var iterStructure = adapter.getStructureIterator (atomSetCollection);
if (iterStructure == null) return;
var bs = iterStructure.getStructuredModels ();
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.ml.structuresDefinedInFile.set (this.ml.baseModelIndex + i);

while (iterStructure.hasNext ()) if (iterStructure.getStructureType () !== J.c.STR.TURN) this.setStructure (iterStructure);

iterStructure = adapter.getStructureIterator (atomSetCollection);
while (iterStructure.hasNext ()) if (iterStructure.getStructureType () === J.c.STR.TURN) this.setStructure (iterStructure);

}, "J.api.JmolAdapter,~O");
Clazz.defineMethod (c$, "setStructure", 
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
for (var i = m0, t0; i <= m1; i++) if (Clazz.instanceOf ((m = models[i]), JM.BioModel)) for (var j = 0; j < 5; j++) if ((bs = bsAll[t0 = JM.BioResolver.mytypes[j]]) != null) (m).addStructureByBS (0, t0, JM.BioResolver.types[j], bs);


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
for (var i = m0, i0 = 0; i <= m1; i++) if (Clazz.instanceOf ((m = models[i]), JM.BioModel)) (m).addSecondaryStructure (type, id, serID, count, startChainID, startSeqCode, endChainID, endSeqCode, (i0 = m.firstAtomIndex) + atomRange[0], i0 + atomRange[1], this.bsAssigned);

}, "J.api.JmolAdapterStructureIterator");
Clazz.defineMethod (c$, "setGroupLists", 
function (ipt) {
this.ml.group3Lists[ipt + 1] = JM.Group.standardGroupList;
this.ml.group3Counts[ipt + 1] =  Clazz.newIntArray (JM.BioResolver.group3Count + 10, 0);
if (this.ml.group3Lists[0] == null) {
this.ml.group3Lists[0] = JM.Group.standardGroupList;
this.ml.group3Counts[0] =  Clazz.newIntArray (JM.BioResolver.group3Count + 10, 0);
}}, "~N");
Clazz.defineMethod (c$, "isKnownPDBGroup", 
function (g3, max) {
var pt = JM.BioResolver.knownGroupID (g3);
return (pt > 0 ? pt < max : max == 2147483647 && JM.BioResolver.checkCarbohydrate (g3));
}, "~S,~N");
Clazz.defineMethod (c$, "lookupSpecialAtomID", 
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
Clazz.defineMethod (c$, "getPdbBondInfo", 
 function (group3, isLegacy) {
if (JM.BioResolver.htPdbBondInfo == null) JM.BioResolver.htPdbBondInfo =  new java.util.Hashtable ();
var info = JM.BioResolver.htPdbBondInfo.get (group3);
if (info != null) return info;
var pt = JM.BioResolver.knownGroupID (group3);
if (pt < 0 || pt > JM.BioResolver.pdbBondInfo.length) return null;
var s = JM.BioResolver.pdbBondInfo[pt];
if (isLegacy && (pt = s.indexOf ("O3'")) >= 0) s = s.substring (0, pt);
var temp = JU.PT.getTokens (s);
info =  new Array (Clazz.doubleToInt (temp.length / 2));
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
}info[i] =  Clazz.newArray (-1, [source, target, (target.startsWith ("H") ? "1" : "2")]);
}
JM.BioResolver.htPdbBondInfo.put (group3, info);
return info;
}, "~S,~B");
c$.knownGroupID = Clazz.defineMethod (c$, "knownGroupID", 
function (group3) {
if (group3 == null || group3.length == 0) return 0;
var boxedGroupID = JM.BioResolver.htGroup.get (group3);
return (boxedGroupID == null ? -1 : boxedGroupID.shortValue ());
}, "~S");
c$.checkCarbohydrate = Clazz.defineMethod (c$, "checkCarbohydrate", 
 function (group3) {
return (group3 != null && ",[AHR],[ALL],[AMU],[ARA],[ARB],[BDF],[BDR],[BGC],[BMA],[FCA],[FCB],[FRU],[FUC],[FUL],[GAL],[GLA],[GLC],[GXL],[GUP],[LXC],[MAN],[RAM],[RIB],[RIP],[XYP],[XYS],[CBI],[CT3],[CTR],[CTT],[LAT],[MAB],[MAL],[MLR],[MTT],[SUC],[TRE],[GCU],[MTL],[NAG],[NDG],[RHA],[SOR],[SOL],[SOE],[XYL],[A2G],[LBT],[NGA],[SIA],[SLB],[AFL],[AGC],[GLB],[NAN],[RAA]".indexOf ("[" + group3.toUpperCase () + "]") >= 0);
}, "~S");
Clazz.defineMethod (c$, "isHetero", 
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
return (pt < 0 || Clazz.doubleToInt (pt / 6) + 1 >= 42);
}, "~S");
Clazz.defineMethod (c$, "toStdAmino3", 
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
Clazz.defineMethod (c$, "getGroupID", 
function (g3) {
return JM.BioResolver.getGroupIdFor (g3);
}, "~S");
c$.getGroupIdFor = Clazz.defineMethod (c$, "getGroupIdFor", 
function (group3) {
if (group3 != null) group3 = group3.trim ();
var groupID = JM.BioResolver.knownGroupID (group3);
return (groupID == -1 ? JM.BioResolver.addGroup3Name (group3) : groupID);
}, "~S");
c$.addGroup3Name = Clazz.defineMethod (c$, "addGroup3Name", 
 function (group3) {
if (JM.BioResolver.group3NameCount == JM.Group.group3Names.length) JM.Group.group3Names = JU.AU.doubleLengthS (JM.Group.group3Names);
var groupID = JM.BioResolver.group3NameCount++;
JM.Group.group3Names[groupID] = group3;
JM.BioResolver.htGroup.put (group3, Short.$valueOf (groupID));
return groupID;
}, "~S");
c$.getStandardPdbHydrogenCount = Clazz.defineMethod (c$, "getStandardPdbHydrogenCount", 
 function (group3) {
var pt = JM.BioResolver.knownGroupID (group3);
return (pt < 0 || pt >= JM.BioResolver.pdbHydrogenCount.length ? -1 : JM.BioResolver.pdbHydrogenCount[pt]);
}, "~S");
c$.getSpecialAtomName = Clazz.defineMethod (c$, "getSpecialAtomName", 
function (atomID) {
return JM.BioResolver.specialAtomNames[atomID];
}, "~N");
Clazz.defineMethod (c$, "getArgbs", 
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
c$.types = c$.prototype.types =  Clazz.newArray (-1, [J.c.STR.HELIXPI, J.c.STR.HELIXALPHA, J.c.STR.SHEET, J.c.STR.HELIX310, J.c.STR.TURN]);
Clazz.defineStatics (c$,
"mytypes",  Clazz.newIntArray (-1, [0, 2, 3, 4, 6]),
"htPdbBondInfo", null,
"pdbBondInfo",  Clazz.newArray (-1, ["", "N N CA HA C O CB HB?", "N N CA HA C O CB B CG G CD D NE HE CZ NH1 NH1 HH11@HH12 NH2 HH22@HH21", "N N CA HA C O CB B CG OD1 ND2 HD21@HD22", "N N CA HA C O CB B CG OD1", "N N CA HA C O CB B SG HG", "N N CA HA C O CB B CG G CD OE1 NE2 HE22@HE21", "N N CA HA C O CB B CG G CD OE1", "N N CA HA2@HA3 C O", "N N CA HA C O CB B CG CD2 ND1 CE1 ND1 HD1 CD2 HD2 CE1 HE1 NE2 HE2", "N N CA HA C O CB HB CG1 HG13@HG12 CG2 HG2? CD1 HD1?", "N N CA HA C O CB B CG HG CD1 HD1? CD2 HD2?", "N N CA HA C O CB B CG G CD HD2@HD3 CE HE3@HE2 NZ HZ?", "N N CA HA C O CB B CG G CE HE?", "N N CA HA C O CB B CG CD1 CD1 HD1 CD2 CE2 CD2 HD2 CE1 CZ CE1 HE1 CE2 HE2 CZ HZ", "N H CA HA C O CB B CG G CD D", "N N CA HA C O CB B OG HG", "N N CA HA C O CB HB OG1 HG1 CG2 HG2?", "N N CA HA C O CB B CG CD1 CD1 HD1 CD2 CE2 NE1 HE1 CE3 CZ3 CE3 HE3 CZ2 CH2 CZ2 HZ2 CZ3 HZ3 CH2 HH2", "N N CA HA C O CB B CG CD1 CD1 HD1 CD2 CE2 CD2 HD2 CE1 CZ CE1 HE1 CE2 HE2 OH HH", "N N CA HA C O CB HB CG1 HG1? CG2 HG2?", "N N CA HA C O CB B", "N N CA HA C O CB B CG G", "", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C8 N7 C8 H8 C5 C4 C6 O6 N1 H1 C2 N3 N2 H22@H21 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C2 O2 N3 C4 N4 H41@H42 C5 C6 C5 H5 C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C8 N7 C8 H8 C5 C4 C6 N1 N6 H61@H62 C2 N3 C2 H2 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C2 O2 N3 H3 C4 O4 C5 C6 C7 H7? C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C2 O2 N3 H3 C4 O4 C5 C6 C5 H5 C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' H2' O2' HO2' C1' H1' C8 N7 C8 H8 C5 C4 C6 O6 N1 H1 C2 N3 C2 H2 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C8 N7 C8 H8 C5 C4 C6 O6 N1 H1 C2 N3 N2 H22@H21 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C2 O2 N3 C4 N4 H41@H42 C5 C6 C5 H5 C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C8 N7 C8 H8 C5 C4 C6 N1 N6 H61@H62 C2 N3 C2 H2 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C2 O2 N3 H3 C4 O4 C5 C6 C7 H7? C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C2 O2 N3 H3 C4 O4 C5 C6 C5 H5 C6 H6 O3' HO3' O5' HO5'", "P OP1 C5' 5 C4' H4' C3' H3' C2' 2 C1' H1' C8 N7 C8 H8 C5 C4 C6 O6 N1 H1 C2 N3 C2 H2 O3' HO3' O5' HO5'"]),
"pdbHydrogenCount",  Clazz.newIntArray (-1, [0, 6, 16, 7, 6, 6, 9, 8, 4, 9, 12, 12, 14, 10, 10, 8, 6, 8, 11, 10, 10, 3, 5, 0, 13, 13, 13, -1, 12, 12, 13, 13, 13, 14, 12, 12]),
"allCarbohydrates", ",[AHR],[ALL],[AMU],[ARA],[ARB],[BDF],[BDR],[BGC],[BMA],[FCA],[FCB],[FRU],[FUC],[FUL],[GAL],[GLA],[GLC],[GXL],[GUP],[LXC],[MAN],[RAM],[RIB],[RIP],[XYP],[XYS],[CBI],[CT3],[CTR],[CTT],[LAT],[MAB],[MAL],[MLR],[MTT],[SUC],[TRE],[GCU],[MTL],[NAG],[NDG],[RHA],[SOR],[SOL],[SOE],[XYL],[A2G],[LBT],[NGA],[SIA],[SLB],[AFL],[AGC],[GLB],[NAN],[RAA]",
"group3Count", 0,
"predefinedGroup1Names",  Clazz.newCharArray (-1, ['\0', 'A', 'R', 'N', 'D', 'C', 'Q', 'E', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V', 'A', 'G', '?', 'G', 'C', 'A', 'T', 'U', 'I', 'G', 'C', 'A', 'T', 'U', 'I', 'G', 'C', 'A', 'T', 'U', 'I']),
"group3NameCount", 0,
"predefinedGroup3Names",  Clazz.newArray (-1, ["   ", "ALA", "ARG", "ASN", "ASP", "CYS", "GLN", "GLU", "GLY", "HIS", "ILE", "LEU", "LYS", "MET", "PHE", "PRO", "SER", "THR", "TRP", "TYR", "VAL", "ASX", "GLX", "UNK", "G  ", "C  ", "A  ", "T  ", "U  ", "I  ", "DG ", "DC ", "DA ", "DT ", "DU ", "DI ", "+G ", "+C ", "+A ", "+T ", "+U ", "+I ", "HOH", "DOD", "WAT", "UREA", "PO4", "SO4", "UNL"]),
"specialAtomNames",  Clazz.newArray (-1, [null, "N", "CA", "C", "O", "O1", "O5'", "C5'", "C4'", "C3'", "O3'", "C2'", "C1'", "P", "OD1", "OD2", "OE1", "OE2", "SG", null, null, null, null, null, null, null, null, null, null, null, null, null, "N1", "C2", "N3", "C4", "C5", "C6", "O2", "N7", "C8", "N9", "N4", "N2", "N6", "C5M", "O6", "O4", "S4", "C7", "H1", "H2", "H3", null, null, null, null, null, null, null, null, null, null, null, "OXT", "H", "1H", "2H", "3H", "HA", "1HA", "2HA", "H5T", "O5T", "O1P", "OP1", "O2P", "OP2", "O4'", "O2'", "1H5'", "2H5'", "H4'", "H3'", "1H2'", "2H2'", "2HO'", "H1'", "H3T", "HO3'", "HO5'", "HA2", "HA3", "HA2", "H5'", "H5''", "H2'", "H2''", "HO2'", "O3P", "OP3"]));
c$.ATOMID_MAX = c$.prototype.ATOMID_MAX = JM.BioResolver.specialAtomNames.length;
Clazz.defineStatics (c$,
"htSpecialAtoms", null,
"argbsAmino",  Clazz.newIntArray (-1, [0xFFBEA06E, 0xFFC8C8C8, 0xFF145AFF, 0xFF00DCDC, 0xFFE60A0A, 0xFFE6E600, 0xFF00DCDC, 0xFFE60A0A, 0xFFEBEBEB, 0xFF8282D2, 0xFF0F820F, 0xFF0F820F, 0xFF145AFF, 0xFFE6E600, 0xFF3232AA, 0xFFDC9682, 0xFFFA9600, 0xFFFA9600, 0xFFB45AB4, 0xFF3232AA, 0xFF0F820F, 0xFFFF69B4, 0xFFFF69B4, 0xFFBEA06E]),
"argbsNucleic",  Clazz.newIntArray (-1, [0xFFBEA06E, 0xFFA0A0A0, 0xFF0F820F, 0xFFE6E600, 0xFFE60A0A, 0xFF145AFF, 0xFF00DCDC, 0xFF00DCDC, 0xFF0F820F, 0xFFE6E600, 0xFFE60A0A, 0xFF145AFF, 0xFF00DCDC, 0xFF00DCDC, 0xFF0F820F, 0xFFE6E600, 0xFFE60A0A, 0xFF145AFF, 0xFF00DCDC, 0xFF00DCDC]),
"argbsChainAtom",  Clazz.newIntArray (-1, [0xFFffffff, 0xFFC0D0FF, 0xFFB0FFB0, 0xFFFFC0C8, 0xFFFFFF80, 0xFFFFC0FF, 0xFFB0F0F0, 0xFFFFD070, 0xFFF08080, 0xFFF5DEB3, 0xFF00BFFF, 0xFFCD5C5C, 0xFF66CDAA, 0xFF9ACD32, 0xFFEE82EE, 0xFF00CED1, 0xFF00FF7F, 0xFF3CB371, 0xFF00008B, 0xFFBDB76B, 0xFF006400, 0xFF800000, 0xFF808000, 0xFF800080, 0xFF008080, 0xFFB8860B, 0xFFB22222]),
"argbsChainHetero",  Clazz.newIntArray (-1, [0xFFffffff, -7298865, -8335464, -3174224, -3158160, -3174193, -8339264, -3170208, -4173712, -3821949, -16734257, -4895668, -11094638, -7686870, -4296002, -16730463, -16724113, -13329567, -16777029, -5922981, -16739328, -5242880, -5197824, -5242704, -16731984, -1526253, -4050382]),
"argbsShapely",  Clazz.newIntArray (-1, [0xFFFF00FF, 0xFF00007C, 0xFFFF7C70, 0xFF8CFF8C, 0xFFA00042, 0xFFFFFF70, 0xFFFF4C4C, 0xFF660000, 0xFFFFFFFF, 0xFF7070FF, 0xFF004C00, 0xFF455E45, 0xFF4747B8, 0xFF534C52, 0xFFB8A042, 0xFF525252, 0xFFFF7042, 0xFFB84C00, 0xFF4F4600, 0xFF8C704C, 0xFFFF8CFF, 0xFFFF00FF, 0xFFFF00FF, 0xFFFF00FF, 0xFFFF7070, 0xFFFF8C4B, 0xFFA0A0FF, 0xFFA0FFA0, 0xFFFF8080, 0xFF80FFFF, 0xFFFF7070, 0xFFFF8C4B, 0xFFA0A0FF, 0xFFA0FFA0, 0xFFFF8080, 0xFF80FFFF, 0xFFFF7070, 0xFFFF8C4B, 0xFFA0A0FF, 0xFFA0FFA0, 0xFFFF8080, 0xFF80FFFF]));
{
{
}}});
