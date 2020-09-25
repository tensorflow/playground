Clazz.declarePackage ("JM");
Clazz.load (["JM.Structure", "JU.V3"], "JM.BioPolymer", ["java.lang.Float", "JU.BS", "$.P3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.model = null;
this.monomers = null;
this.hasStructure = false;
this.leadMidpoints = null;
this.leadPoints = null;
this.controlPoints = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.type = 0;
this.bioPolymerIndexInModel = 0;
this.monomerCount = 0;
this.cyclicFlag = 0;
this.invalidLead = false;
this.invalidControl = false;
this.sheetSmoothing = 0;
this.hasWingPoints = false;
this.reversed = null;
this.twistedSheets = false;
this.unitVectorX = null;
this.selectedMonomerCount = 0;
this.bsSelectedMonomers = null;
this.haveParameters = false;
Clazz.instantialize (this, arguments);
}, JM, "BioPolymer", null, JM.Structure);
Clazz.prepareFields (c$, function () {
this.unitVectorX = JU.V3.new3 (1, 0, 0);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (monomers) {
this.monomers = monomers;
this.monomerCount = monomers.length;
for (var i = this.monomerCount; --i >= 0; ) monomers[i].setBioPolymer (this, i);

this.model = monomers[0].getModel ();
}, "~A");
Clazz.overrideMethod (c$, "setAtomBits", 
function (bs) {
this.getRange (bs, true);
}, "JU.BS");
Clazz.overrideMethod (c$, "setAtomBitsAndClear", 
function (bs, bsOut) {
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].setAtomBitsAndClear (bs, bsOut);

}, "JU.BS,JU.BS");
Clazz.defineMethod (c$, "getRange", 
function (bs, isMutated) {
if (this.monomerCount == 0) return;
if (isMutated) {
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].setAtomBits (bs);

} else {
bs.setBits (this.monomers[0].firstAtomIndex, this.monomers[this.monomerCount - 1].lastAtomIndex + 1);
}}, "JU.BS,~B");
Clazz.defineMethod (c$, "clearStructures", 
function () {
});
Clazz.defineMethod (c$, "getLeadAtomIndices", 
function () {
if (this.leadAtomIndices == null) {
this.leadAtomIndices =  Clazz.newIntArray (this.monomerCount, 0);
this.invalidLead = true;
}if (this.invalidLead) {
for (var i = this.monomerCount; --i >= 0; ) this.leadAtomIndices[i] = this.monomers[i].leadAtomIndex;

this.invalidLead = false;
}return this.leadAtomIndices;
});
Clazz.defineMethod (c$, "getIndex", 
function (chainID, seqcode, istart, iend) {
var i;
for (i = this.monomerCount; --i >= 0; ) {
var m = this.monomers[i];
if (m.chain.chainID == chainID && m.seqcode == seqcode && (istart < 0 || istart == m.firstAtomIndex || iend == m.lastAtomIndex)) break;
}
return i;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getLeadPoint", 
function (monomerIndex) {
return this.monomers[monomerIndex].getLeadAtom ();
}, "~N");
Clazz.defineMethod (c$, "getInitiatorPoint", 
 function () {
return this.monomers[0].getInitiatorAtom ();
});
Clazz.defineMethod (c$, "getTerminatorPoint", 
 function () {
return this.monomers[this.monomerCount - 1].getTerminatorAtom ();
});
Clazz.defineMethod (c$, "getLeadMidPoint", 
function (i, midPoint) {
if (i == this.monomerCount) {
--i;
} else if (i > 0) {
midPoint.ave (this.getLeadPoint (i), this.getLeadPoint (i - 1));
return;
}midPoint.setT (this.getLeadPoint (i));
}, "~N,JU.P3");
Clazz.defineMethod (c$, "getWingPoint", 
function (polymerIndex) {
return this.monomers[polymerIndex].getWingAtom ();
}, "~N");
Clazz.defineMethod (c$, "setConformation", 
function (bsSelected) {
var atoms = this.model.ms.at;
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].updateOffsetsForAlternativeLocations (atoms, bsSelected);

this.recalculateLeadMidpointsAndWingVectors ();
}, "JU.BS");
Clazz.defineMethod (c$, "recalculateLeadMidpointsAndWingVectors", 
function () {
this.invalidLead = this.invalidControl = true;
this.getLeadAtomIndices ();
this.resetHydrogenPoints ();
this.calcLeadMidpointsAndWingVectors ();
});
Clazz.defineMethod (c$, "resetHydrogenPoints", 
function () {
});
Clazz.defineMethod (c$, "getLeadMidpoints", 
function () {
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.leadMidpoints;
});
Clazz.defineMethod (c$, "getLeadPoints", 
function () {
if (this.leadPoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.leadPoints;
});
Clazz.defineMethod (c$, "getControlPoints", 
function (isTraceAlpha, sheetSmoothing, invalidate) {
if (invalidate) this.invalidControl = true;
return (!isTraceAlpha ? this.leadMidpoints : sheetSmoothing == 0 ? this.leadPoints : this.getControlPoints2 (sheetSmoothing));
}, "~B,~N,~B");
Clazz.defineMethod (c$, "getControlPoints2", 
 function (sheetSmoothing) {
if (!this.invalidControl && sheetSmoothing == this.sheetSmoothing) return this.controlPoints;
this.getLeadPoints ();
var v =  new JU.V3 ();
if (this.controlPoints == null) this.controlPoints =  new Array (this.monomerCount + 1);
if (!Float.isNaN (sheetSmoothing)) this.sheetSmoothing = sheetSmoothing;
for (var i = 0; i < this.monomerCount; i++) this.controlPoints[i] = this.getControlPoint (i, v);

this.controlPoints[this.monomerCount] = this.getTerminatorPoint ();
this.invalidControl = false;
return this.controlPoints;
}, "~N");
Clazz.defineMethod (c$, "getControlPoint", 
function (i, v) {
return this.leadPoints[i];
}, "~N,JU.V3");
Clazz.defineMethod (c$, "getWingVectors", 
function () {
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.wingVectors;
});
Clazz.defineMethod (c$, "calcLeadMidpointsAndWingVectors", 
 function () {
if (this.leadMidpoints == null) {
this.leadMidpoints =  new Array (this.monomerCount + 1);
this.leadPoints =  new Array (this.monomerCount + 1);
this.wingVectors =  new Array (this.monomerCount + 1);
this.sheetSmoothing = 1.4E-45;
}if (this.reversed == null) this.reversed = JU.BS.newN (this.monomerCount);
 else this.reversed.clearAll ();
this.twistedSheets = this.model.ms.vwr.getBoolean (603979968);
var vectorA =  new JU.V3 ();
var vectorB =  new JU.V3 ();
var vectorC =  new JU.V3 ();
var vectorD =  new JU.V3 ();
var leadPointPrev;
var leadPoint;
this.leadMidpoints[0] = this.getInitiatorPoint ();
this.leadPoints[0] = leadPoint = this.getLeadPoint (0);
var previousVectorD = null;
for (var i = 1; i < this.monomerCount; ++i) {
leadPointPrev = leadPoint;
this.leadPoints[i] = leadPoint = this.getLeadPoint (i);
var midpoint =  new JU.P3 ();
midpoint.ave (leadPoint, leadPointPrev);
this.leadMidpoints[i] = midpoint;
if (this.hasWingPoints) {
vectorA.sub2 (leadPoint, leadPointPrev);
vectorB.sub2 (leadPointPrev, this.getWingPoint (i - 1));
vectorC.cross (vectorA, vectorB);
vectorD.cross (vectorA, vectorC);
vectorD.normalize ();
if (!this.twistedSheets && previousVectorD != null && previousVectorD.angle (vectorD) > 1.5707963267948966) {
this.reversed.set (i);
vectorD.scale (-1);
}previousVectorD = this.wingVectors[i] = JU.V3.newV (vectorD);
}}
this.leadPoints[this.monomerCount] = this.leadMidpoints[this.monomerCount] = this.getTerminatorPoint ();
if (!this.hasWingPoints) {
if (this.monomerCount < 3) {
this.wingVectors[1] = this.unitVectorX;
} else {
var previousVectorC = null;
for (var i = 1; i < this.monomerCount; ++i) {
vectorA.sub2 (this.leadMidpoints[i], this.leadPoints[i]);
vectorB.sub2 (this.leadPoints[i], this.leadMidpoints[i + 1]);
vectorC.cross (vectorA, vectorB);
vectorC.normalize ();
if (previousVectorC != null && previousVectorC.angle (vectorC) > 1.5707963267948966) vectorC.scale (-1);
previousVectorC = this.wingVectors[i] = JU.V3.newV (vectorC);
}
}}this.wingVectors[0] = this.wingVectors[1];
this.wingVectors[this.monomerCount] = this.wingVectors[this.monomerCount - 1];
});
Clazz.defineMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, mads, myVisibilityFlag, bsNot) {
for (var i = this.monomerCount; --i >= 0; ) {
if ((this.monomers[i].shapeVisibilityFlags & myVisibilityFlag) == 0) continue;
var a = this.monomers[i].getLeadAtom ();
if (!a.checkVisible () || bsNot != null && bsNot.get (a.i)) continue;
if (mads[i] > 0 || mads[i + 1] > 0) this.monomers[i].findNearestAtomIndex (xMouse, yMouse, closest, mads[i], mads[i + 1]);
}
}, "~N,~N,~A,~A,~N,JU.BS");
Clazz.defineMethod (c$, "getSelectedMonomerCount", 
function () {
return this.selectedMonomerCount;
});
Clazz.defineMethod (c$, "calcSelectedMonomersCount", 
function (bsSelected) {
this.selectedMonomerCount = 0;
if (this.bsSelectedMonomers == null) this.bsSelectedMonomers =  new JU.BS ();
this.bsSelectedMonomers.clearAll ();
for (var i = 0; i < this.monomerCount; i++) {
if (this.monomers[i].isSelected (bsSelected)) {
++this.selectedMonomerCount;
this.bsSelectedMonomers.set (i);
}}
}, "JU.BS");
Clazz.defineMethod (c$, "isMonomerSelected", 
function (i) {
return (i >= 0 && this.bsSelectedMonomers.get (i));
}, "~N");
Clazz.defineMethod (c$, "getPolymerPointsAndVectors", 
function (last, bs, vList, isTraceAlpha, sheetSmoothing) {
var points = this.getControlPoints (isTraceAlpha, sheetSmoothing, false);
var vectors = this.getWingVectors ();
var count = this.monomerCount;
for (var j = 0; j < count; j++) if (bs.get (this.monomers[j].leadAtomIndex)) {
vList.addLast ( Clazz.newArray (-1, [points[j], JU.P3.newP (vectors[j])]));
last = j;
} else if (last != 2147483646) {
vList.addLast ( Clazz.newArray (-1, [points[j], JU.P3.newP (vectors[j])]));
last = 2147483646;
}
if (last + 1 < count) vList.addLast ( Clazz.newArray (-1, [points[last + 1], JU.P3.newP (vectors[last + 1])]));
return last;
}, "~N,JU.BS,JU.Lst,~B,~N");
Clazz.defineMethod (c$, "getSequence", 
function () {
var buf =  Clazz.newCharArray (this.monomerCount, '\0');
for (var i = 0; i < this.monomerCount; i++) buf[i] = this.monomers[i].getGroup1 ();

return String.valueOf (buf);
});
Clazz.defineMethod (c$, "getPolymerSequenceAtoms", 
function (group1, nGroups, bsInclude, bsResult) {
for (var i = Math.min (this.monomerCount, group1 + nGroups); --i >= group1; ) this.monomers[i].getMonomerSequenceAtoms (bsInclude, bsResult);

}, "~N,~N,JU.BS,JU.BS");
Clazz.defineMethod (c$, "getProteinStructure", 
function (monomerIndex) {
return null;
}, "~N");
Clazz.defineMethod (c$, "calcParameters", 
function () {
this.haveParameters = true;
return this.calcEtaThetaAngles () || this.calcPhiPsiAngles ();
});
Clazz.defineMethod (c$, "calcEtaThetaAngles", 
function () {
return false;
});
Clazz.defineMethod (c$, "calcPhiPsiAngles", 
function () {
return false;
});
Clazz.defineMethod (c$, "calculateRamachandranHelixAngle", 
function (m, qtype) {
return NaN;
}, "~N,~S");
Clazz.defineMethod (c$, "isNucleic", 
function () {
return (this.monomerCount > 0 && Clazz.instanceOf (this, JM.NucleicPolymer));
});
Clazz.defineMethod (c$, "getRangeGroups", 
function (nResidues, bsAtoms, bsResult) {
var bsTemp =  new JU.BS ();
for (var i = 0; i < this.monomerCount; i++) {
if (!this.monomers[i].isSelected (bsAtoms)) continue;
bsTemp.setBits (Math.max (0, i - nResidues), i + nResidues + 1);
i += nResidues - 1;
}
for (var i = bsTemp.nextSetBit (0); i >= 0 && i < this.monomerCount; i = bsTemp.nextSetBit (i + 1)) this.monomers[i].setAtomBits (bsResult);

}, "~N,JU.BS,JU.BS");
Clazz.defineMethod (c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vHBonds, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
}, "JM.BioPolymer,JU.BS,JU.BS,JU.Lst,~N,~A,~B,~B");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "isCyclic", 
function () {
return ((this.cyclicFlag == 0 ? (this.cyclicFlag = (this.monomerCount >= 4 && this.monomers[0].isConnectedAfter (this.monomers[this.monomerCount - 1])) ? 1 : -1) : this.cyclicFlag) == 1);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "[Polymer type " + this.type + " n=" + this.monomerCount + " " + (this.monomerCount > 0 ? this.monomers[0] + " " + this.monomers[this.monomerCount - 1] : "") + "]";
});
Clazz.defineStatics (c$,
"TYPE_NOBONDING", 0,
"TYPE_AMINO", 1,
"TYPE_NUCLEIC", 2,
"TYPE_CARBOHYDRATE", 3);
});
