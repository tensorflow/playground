Clazz.declarePackage ("J.dssx");
Clazz.load (null, "J.dssx.DSSP", ["java.lang.Boolean", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.PT", "$.SB", "J.c.STR", "J.dssx.Bridge", "J.i18n.GT", "JM.HBond", "JM.AminoPolymer", "JU.Escape", "$.Logger", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
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
Clazz.instantialize (this, arguments);
}, J.dssx, "DSSP");
Clazz.prepareFields (c$, function () {
this.sheetOffsets =  Clazz.newArray (-1, [ Clazz.newIntArray (-1, [0, -1, 1, 0, 1, 0, 0, -1]),  Clazz.newIntArray (-1, [0, 0, 0, 0, 1, -1, 1, -1])]);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "calculateDssp", 
function (objBioPolymers, bioPolymerCount, objVHBonds, doReport, dsspIgnoreHydrogens, setStructure, version) {
this.bioPolymers = objBioPolymers;
this.bioPolymerCount = bioPolymerCount;
this.vHBonds = objVHBonds;
this.doReport = doReport;
this.dsspIgnoreHydrogens = dsspIgnoreHydrogens;
this.setStructure = setStructure;
this.isDSSP2 = (version > 1);
var bsAmino =  new JU.BS ();
for (var i = 0; i < bioPolymerCount; i++) if (Clazz.instanceOf (this.bioPolymers[i], JM.AminoPolymer)) bsAmino.set (i);

if (bsAmino.isEmpty ()) return "";
var m = this.bioPolymers[0].model;
var sb =  new JU.SB ();
sb.append ("Jmol ").append (JV.Viewer.getJmolVersion ()).append (" DSSP analysis for model ").append (m.ms.getModelNumberDotted (m.modelIndex)).append (" - ").append (m.ms.getModelTitle (m.modelIndex)).append ("\n");
if (m.modelIndex == 0) sb.append ("\nW. Kabsch and C. Sander, Biopolymers, vol 22, 1983, pp 2577-2637\n\nWe thank Wolfgang Kabsch and Chris Sander for writing the DSSP software,\nand we thank the CMBI for maintaining it to the extent that it was easy to\nre-engineer in Java for our purposes. \n\nSecond generation DSSP 2.0 is ").append (this.isDSSP2 ? "" : "NOT ").append ("used in this analysis. See Int. J. Mol. Sci. 2014, 15, 7841-7864; doi:10.3390/ijms15057841.\n");
if (setStructure && m.modelIndex == 0) sb.append ("\nAll bioshapes have been deleted and must be regenerated.\n");
if (m.altLocCount > 0) sb.append ("\nNote: This model contains alternative locations. Use  'CONFIGURATION 1' to be consistent with CMBI DSSP.\n");
this.labels =  Clazz.newCharArray (bioPolymerCount, '\0');
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
this.labels[i] =  Clazz.newCharArray (n, '\0');
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
Clazz.defineMethod (c$, "getDualHydrogenBondArray", 
 function () {
var min = JU.AU.newInt4 (this.bioPolymerCount);
for (var i = 0; i < this.bioPolymerCount; i++) {
if (!(Clazz.instanceOf (this.bioPolymers[i], JM.AminoPolymer))) continue;
var n = this.bioPolymers[i].monomerCount;
min[i] =  Clazz.newIntArray (n, 2, 3, 0);
for (var j = 0; j < n; ++j) {
min[i][j][0][1] = min[i][j][1][1] = -2147483648;
min[i][j][0][2] = min[i][j][1][2] = 0;
}
}
for (var i = 0; i < this.bioPolymerCount; i++) if (min[i] != null) for (var j = 0; j < this.bioPolymerCount; j++) if (min[j] != null) this.bioPolymers[i].calcRasmolHydrogenBonds (this.bioPolymers[j], null, null, null, 2, min[i], false, this.dsspIgnoreHydrogens);


return min;
});
Clazz.defineMethod (c$, "getBridges", 
 function (min) {
var atoms = this.bioPolymers[0].model.ms.at;
var bridge = null;
var htTemp =  new java.util.Hashtable ();
for (var p1 = 0; p1 < min.length; p1++) if (Clazz.instanceOf (this.bioPolymers[p1], JM.AminoPolymer)) {
var ap1 = (this.bioPolymers[p1]);
var n = min[p1].length - 1;
for (var a = 1; a < n; a++) {
var ia = ap1.monomers[a].leadAtomIndex;
if (this.bsBad.get (ia)) continue;
for (var p2 = p1; p2 < min.length; p2++) if (Clazz.instanceOf (this.bioPolymers[p2], JM.AminoPolymer)) for (var b = (p1 == p2 ? a + 3 : 1); b < min[p2].length - 1; b++) {
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
Clazz.defineMethod (c$, "getBridge", 
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
Clazz.defineMethod (c$, "addHbond", 
 function (donor, acceptor, iEnergy, type, htTemp) {
var nitrogen = (donor).getNitrogenAtom ();
var oxygen = (acceptor).getCarbonylOxygenAtom ();
if (htTemp != null) {
var key = nitrogen.i + " " + oxygen.i;
if (htTemp.containsKey (key)) return;
htTemp.put (key, Boolean.TRUE);
}this.vHBonds.addLast ( new JM.HBond (nitrogen, oxygen, type, 1, 0, iEnergy / 1000));
}, "JM.Monomer,JM.Monomer,~N,~N,java.util.Map");
Clazz.defineMethod (c$, "getSheetStructures", 
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
if (!(Clazz.instanceOf (this.bioPolymers[i], JM.AminoPolymer))) continue;
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
Clazz.defineMethod (c$, "createLadders", 
 function (bridges, isAntiparallel) {
var dir = (isAntiparallel ? -1 : 1);
var n = bridges.size ();
for (var i = 0; i < n; i++) this.checkBridge (bridges.get (i), isAntiparallel, 1, dir);

for (var i = 0; i < n; i++) this.checkBulge (bridges.get (i), isAntiparallel, 1);

}, "JU.Lst,~B");
Clazz.defineMethod (c$, "checkBridge", 
 function (bridge, isAntiparallel, n1, n2) {
var b = this.htBridges.get (bridge.a.getOffsetResidueAtom ("\0", n1) + "-" + bridge.b.getOffsetResidueAtom ("\0", n2));
return (b != null && bridge.addBridge (b, this.htLadders));
}, "J.dssx.Bridge,~B,~N,~N");
Clazz.defineMethod (c$, "checkBulge", 
 function (bridge, isAntiparallel, dir) {
var dir1 = (isAntiparallel ? -1 : 1);
for (var i = 0; i < 3; i++) for (var j = (i == 0 ? 1 : 0); j < 6; j++) {
this.checkBridge (bridge, isAntiparallel, i * dir, j * dir1);
if (j > i) this.checkBridge (bridge, isAntiparallel, j * dir, i * dir1);
}

}, "J.dssx.Bridge,~B,~N");
Clazz.defineMethod (c$, "dumpSummary", 
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
Clazz.defineMethod (c$, "dumpTags", 
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
sb0.append (i % 100 == 0 ? "" + ((Clazz.doubleToInt (i / 100)) % 100) : " ");
sb1.append (i % 10 == 0 ? "" + ((Clazz.doubleToInt (i / 10)) % 10) : " ");
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
Clazz.defineMethod (c$, "isHbonded", 
 function (indexDonor, indexAcceptor, pDonor, pAcceptor, min) {
if (indexDonor < 0 || indexAcceptor < 0) return null;
var min1 = min[pDonor];
var min2 = min[pAcceptor];
if (indexDonor >= min1.length || indexAcceptor >= min2.length) return null;
return (min1[indexDonor][0][0] == pAcceptor && min1[indexDonor][0][1] == indexAcceptor ? min1[indexDonor][0] : min1[indexDonor][1][0] == pAcceptor && min1[indexDonor][1][1] == indexAcceptor ? min1[indexDonor][1] : null);
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "findHelixes", 
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
Clazz.defineMethod (c$, "findHelixes2", 
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
taglines =  Clazz.newCharArray (n, '\0');
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
Clazz.defineMethod (c$, "setTag", 
 function (tags, bs, ch) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) tags[i] = ch;

}, "~A,JU.BS,~S");
});
