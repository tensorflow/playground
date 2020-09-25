Clazz.declarePackage ("JM");
Clazz.load (["JM.AlphaMonomer"], "JM.AminoMonomer", ["JU.A4", "$.BS", "$.M3", "$.P3", "$.PT", "$.Quat", "$.V3", "J.c.STR", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nhChecked = false;
this.ptTemp = null;
Clazz.instantialize (this, arguments);
}, JM, "AminoMonomer", JM.AlphaMonomer);
Clazz.overrideConstructor (c$, 
function () {
});
c$.validateAndAllocate = Clazz.defineMethod (c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms) {
var offsets = JM.Monomer.scanForOffsets (firstAtomIndex, specialAtomIndexes, JM.AminoMonomer.interestingAminoAtomIDs);
if (offsets == null) return null;
JM.Monomer.checkOptional (offsets, 1, firstAtomIndex, specialAtomIndexes[5]);
if (atoms[firstAtomIndex].isHetero () && !JM.AminoMonomer.isBondedCorrectly (firstAtomIndex, offsets, atoms)) return null;
return  new JM.AminoMonomer ().set2 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
}, "JM.Chain,~S,~N,~N,~N,~A,~A");
c$.isBondedCorrectlyRange = Clazz.defineMethod (c$, "isBondedCorrectlyRange", 
 function (offset1, offset2, firstAtomIndex, offsets, atoms) {
var atomIndex1 = firstAtomIndex + (offsets[offset1] & 0xFF);
var atomIndex2 = firstAtomIndex + (offsets[offset2] & 0xFF);
return (atomIndex1 != atomIndex2 && atoms[atomIndex1].isBonded (atoms[atomIndex2]));
}, "~N,~N,~N,~A,~A");
c$.isBondedCorrectly = Clazz.defineMethod (c$, "isBondedCorrectly", 
 function (firstAtomIndex, offsets, atoms) {
return (JM.AminoMonomer.isBondedCorrectlyRange (2, 0, firstAtomIndex, offsets, atoms) && JM.AminoMonomer.isBondedCorrectlyRange (0, 3, firstAtomIndex, offsets, atoms) && (!JM.Monomer.have (offsets, 1) || JM.AminoMonomer.isBondedCorrectlyRange (3, 1, firstAtomIndex, offsets, atoms)));
}, "~N,~A,~A");
Clazz.defineMethod (c$, "isAminoMonomer", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getNitrogenAtom", 
function () {
return this.getAtomFromOffsetIndex (2);
});
Clazz.defineMethod (c$, "getCarbonylCarbonAtom", 
function () {
return this.getAtomFromOffsetIndex (3);
});
Clazz.overrideMethod (c$, "getCarbonylOxygenAtom", 
function () {
return this.getWingAtom ();
});
Clazz.overrideMethod (c$, "getInitiatorAtom", 
function () {
return this.getNitrogenAtom ();
});
Clazz.overrideMethod (c$, "getTerminatorAtom", 
function () {
return this.getAtomFromOffsetIndex (JM.Monomer.have (this.offsets, 4) ? 4 : 3);
});
Clazz.defineMethod (c$, "hasOAtom", 
function () {
return JM.Monomer.have (this.offsets, 1);
});
Clazz.overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var other = possiblyPreviousMonomer;
return other.getCarbonylCarbonAtom ().isBonded (this.getNitrogenAtom ());
}, "JM.Monomer");
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var nitrogen = this.getNitrogenAtom ();
var marBegin = (Clazz.doubleToInt (madBegin / 2));
if (marBegin < 1200) marBegin = 1200;
if (nitrogen.sZ == 0) return;
var radiusBegin = Clazz.floatToInt (this.scaleToScreen (nitrogen.sZ, marBegin));
if (radiusBegin < 4) radiusBegin = 4;
var ccarbon = this.getCarbonylCarbonAtom ();
var marEnd = (Clazz.doubleToInt (madEnd / 2));
if (marEnd < 1200) marEnd = 1200;
var radiusEnd = Clazz.floatToInt (this.scaleToScreen (nitrogen.sZ, marEnd));
if (radiusEnd < 4) radiusEnd = 4;
var alpha = this.getLeadAtom ();
if (this.isCursorOnTopOf (alpha, x, y, Clazz.doubleToInt ((radiusBegin + radiusEnd) / 2), competitor) || this.isCursorOnTopOf (nitrogen, x, y, radiusBegin, competitor) || this.isCursorOnTopOf (ccarbon, x, y, radiusEnd, competitor)) closest[0] = alpha;
}, "~N,~N,~A,~N,~N");
Clazz.defineMethod (c$, "resetHydrogenPoint", 
function () {
this.nhChecked = false;
this.nitrogenHydrogenPoint = null;
});
Clazz.defineMethod (c$, "getNitrogenHydrogenPoint", 
function () {
if (this.nitrogenHydrogenPoint == null && !this.nhChecked) {
this.nhChecked = true;
this.nitrogenHydrogenPoint = this.getExplicitNH ();
}return this.nitrogenHydrogenPoint;
});
Clazz.defineMethod (c$, "getExplicitNH", 
function () {
var nitrogen = this.getNitrogenAtom ();
var h = null;
var bonds = nitrogen.bonds;
if (bonds != null) for (var i = 0; i < bonds.length; i++) if ((h = bonds[i].getOtherAtom (nitrogen)).getElementNumber () == 1) return h;

return null;
});
Clazz.defineMethod (c$, "getNHPoint", 
function (aminoHydrogenPoint, vNH, jmolHPoint, dsspIgnoreHydrogens) {
if (this.monomerIndex <= 0 || this.groupID == 15) return false;
var nitrogenPoint = this.getNitrogenAtom ();
var nhPoint = this.getNitrogenHydrogenPoint ();
if (nhPoint != null && !dsspIgnoreHydrogens) {
vNH.sub2 (nhPoint, nitrogenPoint);
aminoHydrogenPoint.setT (nhPoint);
return true;
}var prev = this.bioPolymer.monomers[this.monomerIndex - 1];
if (jmolHPoint) {
vNH.sub2 (nitrogenPoint, this.getLeadAtom ());
vNH.normalize ();
var v = JU.V3.newVsub (nitrogenPoint, prev.getCarbonylCarbonAtom ());
v.normalize ();
vNH.add (v);
} else {
var oxygen = prev.getCarbonylOxygenAtom ();
if (oxygen == null) return false;
vNH.sub2 (prev.getCarbonylCarbonAtom (), oxygen);
}vNH.normalize ();
aminoHydrogenPoint.add2 (nitrogenPoint, vNH);
this.nitrogenHydrogenPoint = JU.P3.newP (aminoHydrogenPoint);
if (JU.Logger.debugging) JU.Logger.debug ("draw ID \"pta" + this.monomerIndex + "_" + nitrogenPoint.i + "\" " + JU.Escape.eP (nitrogenPoint) + JU.Escape.eP (aminoHydrogenPoint) + " # " + nitrogenPoint);
return true;
}, "JU.P3,JU.V3,~B,~B");
Clazz.overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
if (this.monomerIndex < 0) return null;
switch (qType) {
default:
case 'a':
case 'b':
case 'c':
case 'C':
return this.getQuaternionFrameCenterAlpha (qType);
case 'n':
return this.getNitrogenAtom ();
case 'p':
case 'P':
return this.getCarbonylCarbonAtom ();
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.monomers[this.monomerIndex + 1]);
var pt =  new JU.P3 ();
pt.ave (this.getCarbonylCarbonAtom (), mNext.getNitrogenAtom ());
return pt;
}
}, "~S");
Clazz.overrideMethod (c$, "getQuaternion", 
function (qType) {
if (this.monomerIndex < 0) return null;
var ptC = this.getCarbonylCarbonAtom ();
var ptCa = this.getLeadAtom ();
var vA =  new JU.V3 ();
var vB =  new JU.V3 ();
var vC = null;
switch (qType) {
case 'a':
case 'n':
if (this.monomerIndex == 0 || this.groupID == 15) return null;
vC =  new JU.V3 ();
if (this.ptTemp == null) this.ptTemp =  new JU.P3 ();
this.getNHPoint (this.ptTemp, vC, true, false);
vB.sub2 (ptCa, this.getNitrogenAtom ());
vB.cross (vC, vB);
 new JU.M3 ().setAA (JU.A4.newVA (vB, -0.29670596)).rotate (vC);
vA.cross (vB, vC);
break;
case 'b':
return this.getQuaternionAlpha ('b');
case 'c':
vA.sub2 (ptC, ptCa);
vB.sub2 (this.getNitrogenAtom (), ptCa);
break;
case 'p':
case 'x':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
vA.sub2 (ptCa, ptC);
vB.sub2 ((this.bioPolymer.monomers[this.monomerIndex + 1]).getNitrogenAtom (), ptC);
break;
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.monomers[this.monomerIndex + 1]);
vB.sub2 (mNext.getLeadAtom (), mNext.getNitrogenAtom ());
vA.sub2 (ptCa, ptC);
break;
default:
return null;
}
return JU.Quat.getQuaternionFrameV (vA, vB, vC, false);
}, "~S");
Clazz.overrideMethod (c$, "getStructureId", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return "";
return this.proteinStructure.structureID;
});
Clazz.overrideMethod (c$, "getProteinStructureTag", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return null;
var tag = "%3N %3ID";
tag = JU.PT.formatStringI (tag, "N", this.proteinStructure.serialID);
tag = JU.PT.formatStringS (tag, "ID", this.proteinStructure.structureID);
if (this.proteinStructure.type === J.c.STR.SHEET) tag += JU.PT.formatStringI ("%2SC", "SC", this.proteinStructure.strandCount);
return tag;
});
Clazz.overrideMethod (c$, "getBSSideChain", 
function () {
var bs =  new JU.BS ();
this.setAtomBits (bs);
this.clear (bs, this.getLeadAtom (), true);
this.clear (bs, this.getCarbonylCarbonAtom (), false);
this.clear (bs, this.getCarbonylOxygenAtom (), false);
this.clear (bs, this.getNitrogenAtom (), true);
return bs;
});
Clazz.defineMethod (c$, "clear", 
 function (bs, a, andH) {
if (a == null) return;
bs.clear (a.i);
if (!andH) return;
var b = a.bonds;
var h;
for (var j = b.length; --j >= 0; ) if ((h = b[j].getOtherAtom (a)).getElementNumber () == 1) bs.clear (h.i);

}, "JU.BS,JM.Atom,~B");
Clazz.defineStatics (c$,
"CA", 0,
"O", 1,
"N", 2,
"C", 3,
"OT", 4,
"interestingAminoAtomIDs",  Clazz.newByteArray (-1, [2, -5, 1, 3, -65]),
"beta", (0.29670597283903605));
});
