Clazz.declarePackage ("JM");
Clazz.load (["JM.PhosphorusMonomer"], "JM.NucleicMonomer", ["java.lang.Character", "JU.A4", "$.Lst", "$.M3", "$.P3", "$.Quat", "$.V3", "J.c.STR", "JM.Group", "JM.NucleicPolymer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$isPurine = false;
this.$isPyrimidine = false;
this.hasRnaO2Prime = false;
this.baseCenter = null;
this.bps = null;
this.dssrBox = null;
this.dssrBoxHeight = 0;
this.dssrFrame = null;
Clazz.instantialize (this, arguments);
}, JM, "NucleicMonomer", JM.PhosphorusMonomer);
Clazz.overrideConstructor (c$, 
 function () {
});
c$.validateAndAllocate = Clazz.defineMethod (c$, "validateAndAllocate", 
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
Clazz.defineMethod (c$, "set4", 
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
Clazz.overrideMethod (c$, "isNucleicMonomer", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isDna", 
function () {
return !this.hasRnaO2Prime;
});
Clazz.overrideMethod (c$, "isRna", 
function () {
return this.hasRnaO2Prime;
});
Clazz.overrideMethod (c$, "isPurine", 
function () {
return this.$isPurine || !this.$isPyrimidine && this.isPurineByID ();
});
Clazz.overrideMethod (c$, "isPyrimidine", 
function () {
return this.$isPyrimidine || !this.$isPurine && this.isPyrimidineByID ();
});
Clazz.defineMethod (c$, "isGuanine", 
function () {
return JM.Monomer.have (this.offsets, 17);
});
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return (this.hasRnaO2Prime ? J.c.STR.RNA : J.c.STR.DNA);
});
Clazz.defineMethod (c$, "getP", 
function () {
return this.getAtomFromOffsetIndex (0);
});
Clazz.defineMethod (c$, "getC1P", 
function () {
return this.getAtomFromOffsetIndex (25);
});
Clazz.defineMethod (c$, "getC2", 
function () {
return this.getAtomFromOffsetIndex (5);
});
Clazz.defineMethod (c$, "getC5", 
function () {
return this.getAtomFromOffsetIndex (3);
});
Clazz.defineMethod (c$, "getC6", 
function () {
return this.getAtomFromOffsetIndex (1);
});
Clazz.defineMethod (c$, "getC8", 
function () {
return this.getAtomFromOffsetIndex (10);
});
Clazz.defineMethod (c$, "getC4P", 
function () {
return this.getAtomFromOffsetIndex (27);
});
Clazz.defineMethod (c$, "getN1", 
function () {
return this.getAtomFromOffsetIndex (4);
});
Clazz.defineMethod (c$, "getN3", 
function () {
return this.getAtomFromOffsetIndex (6);
});
Clazz.defineMethod (c$, "getN2", 
function () {
return this.getAtomFromOffsetIndex (17);
});
Clazz.defineMethod (c$, "getN4", 
function () {
return this.getAtomFromOffsetIndex (14);
});
Clazz.defineMethod (c$, "getN6", 
function () {
return this.getAtomFromOffsetIndex (16);
});
Clazz.defineMethod (c$, "getO2", 
function () {
return this.getAtomFromOffsetIndex (8);
});
Clazz.defineMethod (c$, "getO4", 
function () {
return this.getAtomFromOffsetIndex (12);
});
Clazz.defineMethod (c$, "getO6", 
function () {
return this.getAtomFromOffsetIndex (13);
});
Clazz.overrideMethod (c$, "getTerminatorAtom", 
function () {
return this.getAtomFromOffsetIndex (JM.Monomer.have (this.offsets, 20) ? 20 : 21);
});
Clazz.defineMethod (c$, "getBaseRing6Points", 
function (pts) {
this.getPoints (JM.NucleicMonomer.ring6OffsetIndexes, pts);
}, "~A");
Clazz.defineMethod (c$, "getPoints", 
 function (a, pts) {
for (var i = a.length; --i >= 0; ) pts[i] = this.getAtomFromOffsetIndex (a[i]);

}, "~A,~A");
Clazz.defineMethod (c$, "maybeGetBaseRing5Points", 
function (pts) {
if (this.$isPurine) this.getPoints (JM.NucleicMonomer.ring5OffsetIndexes, pts);
return this.$isPurine;
}, "~A");
Clazz.defineMethod (c$, "getRiboseRing5Points", 
function (pts) {
this.getPoints (JM.NucleicMonomer.riboseOffsetIndexes, pts);
}, "~A");
Clazz.overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var myPhosphorusAtom = this.getAtomFromOffsetIndex (15);
if (myPhosphorusAtom == null) return false;
return ((possiblyPreviousMonomer).getAtomFromOffsetIndex (21).isBonded (myPhosphorusAtom) || this.isCA2 (possiblyPreviousMonomer));
}, "JM.Monomer");
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var lead = this.getLeadAtom ();
var o5prime = this.getAtomFromOffsetIndex (19);
var c3prime = this.getAtomFromOffsetIndex (22);
var mar = (Clazz.doubleToInt (madBegin / 2));
if (mar < 1900) mar = 1900;
var radius = Clazz.floatToInt (this.scaleToScreen (lead.sZ, mar));
if (radius < 4) radius = 4;
if (this.isCursorOnTopOf (lead, x, y, radius, competitor) || this.isCursorOnTopOf (o5prime, x, y, radius, competitor) || this.isCursorOnTopOf (c3prime, x, y, radius, competitor)) closest[0] = lead;
}, "~N,~N,~A,~N,~N");
Clazz.defineMethod (c$, "setRingsVisible", 
function (isVisible) {
for (var i = 6; --i >= 0; ) this.getAtomFromOffsetIndex (JM.NucleicMonomer.ring6OffsetIndexes[i]).setShapeVisibility (32768, isVisible);

if (this.$isPurine) for (var i = 4; --i >= 1; ) this.getAtomFromOffsetIndex (JM.NucleicMonomer.ring5OffsetIndexes[i]).setShapeVisibility (32768, isVisible);

}, "~B");
Clazz.defineMethod (c$, "setRingsClickable", 
function () {
for (var i = 6; --i >= 0; ) this.getAtomFromOffsetIndex (JM.NucleicMonomer.ring6OffsetIndexes[i]).setClickable (32768);

if (this.$isPurine) for (var i = 4; --i >= 1; ) this.getAtomFromOffsetIndex (JM.NucleicMonomer.ring5OffsetIndexes[i]).setClickable (32768);

});
Clazz.defineMethod (c$, "getN0", 
function () {
return (this.getAtomFromOffsetIndex (this.$isPurine ? 11 : 4));
});
Clazz.overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz.overrideMethod (c$, "getQuaternionFrameCenter", 
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
Clazz.overrideMethod (c$, "getQuaternion", 
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
Clazz.overrideMethod (c$, "isCrossLinked", 
function (g) {
if (!(Clazz.instanceOf (g, JM.NucleicMonomer)) || this.$isPurine == g.isPurine ()) return false;
var otherNucleotide = (this.$isPurine ? g : this);
var myNucleotide = (this.$isPurine ? this : g);
var myN1 = myNucleotide.getN1 ();
var otherN3 = otherNucleotide.getN3 ();
return (myN1.isBonded (otherN3));
}, "JM.Group");
Clazz.overrideMethod (c$, "getCrossLinkVector", 
function (vReturn, crosslinkCovalent, crosslinkHBond) {
if (!crosslinkHBond) return false;
var N = (this.$isPurine ? this.getN1 () : this.getN3 ());
var bonds = N.bonds;
if (bonds == null) return false;
for (var i = 0; i < bonds.length; i++) {
if (bonds[i].isHydrogen ()) {
var N2 = bonds[i].getOtherAtom (N);
var g = N2.group;
if (!(Clazz.instanceOf (g, JM.NucleicMonomer))) continue;
var m = g;
if ((this.$isPurine ? m.getN3 () : m.getN1 ()) === N2) {
if (vReturn == null) return true;
vReturn.addLast (Integer.$valueOf (N.i));
vReturn.addLast (Integer.$valueOf (N2.i));
vReturn.addLast (Integer.$valueOf (m.leadAtomIndex));
}}}
return vReturn != null && vReturn.size () > 0;
}, "JU.Lst,~B,~B");
Clazz.defineMethod (c$, "getEdgePoints", 
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
Clazz.defineMethod (c$, "addBasePair", 
function (bp) {
if (this.bps == null) this.bps =  new JU.Lst ();
this.bps.addLast (bp);
}, "JM.BasePair");
Clazz.defineMethod (c$, "setGroup1", 
function (g) {
if (this.group1 == '\0') this.group1 = g;
}, "~S");
Clazz.defineMethod (c$, "getBasePairs", 
function () {
if (this.bioPolymer != null && !(this.bioPolymer).isDssrSet) this.bioPolymer.model.ms.vwr.getAnnotationParser (true).getBasePairs (this.bioPolymer.model.ms.vwr, this.bioPolymer.model.modelIndex);
return this.bps;
});
Clazz.overrideMethod (c$, "getGroup1b", 
function () {
var g3 = JM.Group.group3Names[this.groupID];
var g1 = (JM.NucleicPolymer.htGroup1 == null ? null : JM.NucleicPolymer.htGroup1.get (g3));
return (g1 == null ? Character.toLowerCase (g3.charAt (g3.length - 1)) : g1.charAt (0));
});
Clazz.defineMethod (c$, "getDSSRFrame", 
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
Clazz.defineStatics (c$,
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
"interestingNucleicAtomIDs",  Clazz.newByteArray (-1, [-14, 37, -80, 36, 32, 33, 34, 35, -39, -40, -41, -42, -48, -47, -43, -14, -45, -44, -73, -7, -89, 10, 9, -75, -77, -13, -12, -9, -79, -8]),
"ring6OffsetIndexes",  Clazz.newByteArray (-1, [3, 1, 4, 5, 6, 7]),
"ring5OffsetIndexes",  Clazz.newByteArray (-1, [3, 9, 10, 11, 7]),
"riboseOffsetIndexes",  Clazz.newByteArray (-1, [25, 26, 22, 27, 28, 21, 29, 19, 0]),
"heavyAtomIndexes",  Clazz.newByteArray (-1, [3, 1, 4, 5, 6, 7, 11, 10, 9, 16, 14, 8, 12, 17, 13]));
});
