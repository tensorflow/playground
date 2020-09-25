Clazz.declarePackage ("JM");
Clazz.load (["java.lang.Enum", "JM.BioPolymer"], "JM.AlphaPolymer", ["JU.Measure", "$.P3", "J.c.STR", "JM.Helix", "$.Sheet", "$.Turn", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pt0 = 0;
Clazz.instantialize (this, arguments);
}, JM, "AlphaPolymer", JM.BioPolymer);
Clazz.makeConstructor (c$, 
function (monomers, pt0) {
Clazz.superConstructor (this, JM.AlphaPolymer, []);
this.pt0 = pt0;
this.set (monomers);
this.hasStructure = true;
}, "~A,~N");
Clazz.overrideMethod (c$, "getProteinStructure", 
function (monomerIndex) {
return this.monomers[monomerIndex].getStructure ();
}, "~N");
Clazz.overrideMethod (c$, "getControlPoint", 
function (i, v) {
if (!this.monomers[i].isSheet ()) return this.leadPoints[i];
v.sub2 (this.leadMidpoints[i], this.leadPoints[i]);
v.scale (this.sheetSmoothing);
var pt = JU.P3.newP (this.leadPoints[i]);
pt.add (v);
return pt;
}, "~N,JU.V3");
Clazz.defineMethod (c$, "addStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned) {
var i0 = -1;
var i1 = -1;
if (istart < iend) {
if (this.monomers[0].firstAtomIndex > iend || this.monomers[this.monomerCount - 1].lastAtomIndex < istart) return;
i0 = istart;
i1 = iend;
}var indexStart;
var indexEnd;
if ((indexStart = this.getIndex (startChainID, startSeqcode, i0, i1)) == -1 || (indexEnd = this.getIndex (endChainID, endSeqcode, i0, i1)) == -1) return;
if (istart >= 0 && bsAssigned != null) {
var pt = bsAssigned.nextSetBit (this.monomers[indexStart].firstAtomIndex);
if (pt >= 0 && pt < this.monomers[indexEnd].lastAtomIndex) return;
}if (this.addStructureProtected (type, structureID, serialID, strandCount, indexStart, indexEnd) && istart >= 0) bsAssigned.setBits (istart, iend + 1);
}, "J.c.STR,~S,~N,~N,~N,~N,~N,~N,~N,~N,JU.BS");
Clazz.defineMethod (c$, "addStructureProtected", 
function (type, structureID, serialID, strandCount, indexStart, indexEnd) {
if (indexEnd < indexStart) {
JU.Logger.error ("AlphaPolymer:addSecondaryStructure error:  indexStart:" + indexStart + " indexEnd:" + indexEnd);
return false;
}var structureCount = indexEnd - indexStart + 1;
var ps = null;
switch (type) {
case J.c.STR.HELIX:
case J.c.STR.HELIXALPHA:
case J.c.STR.HELIX310:
case J.c.STR.HELIXPI:
ps =  new JM.Helix (this, indexStart, structureCount, type);
break;
case J.c.STR.SHEET:
ps =  new JM.Sheet (this, indexStart, structureCount, type);
break;
case J.c.STR.TURN:
ps =  new JM.Turn (this, indexStart, structureCount);
break;
default:
JU.Logger.error ("unrecognized secondary structure type");
return false;
}
ps.structureID = structureID;
ps.serialID = serialID;
ps.strandCount = strandCount;
for (var i = indexStart; i <= indexEnd; ++i) (this.monomers[i]).setStructure (ps);

return true;
}, "J.c.STR,~S,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "clearStructures", 
function () {
for (var i = 0; i < this.monomerCount; i++) (this.monomers[i]).setStructure (null);

});
Clazz.defineMethod (c$, "calculateStructures", 
function (alphaOnly) {
if (this.monomerCount < 4) return;
var angles = this.calculateAnglesInDegrees ();
var codes = this.calculateCodes (angles);
this.checkBetaSheetAlphaHelixOverlap (codes, angles);
var tags = this.calculateRunsFourOrMore (codes);
this.extendRuns (tags);
this.searchForTurns (codes, angles, tags);
this.addStructuresFromTags (tags);
}, "~B");
Clazz.defineMethod (c$, "calculateAnglesInDegrees", 
 function () {
var angles =  Clazz.newFloatArray (this.monomerCount, 0);
for (var i = this.monomerCount - 1; --i >= 2; ) angles[i] = JU.Measure.computeTorsion (this.monomers[i - 2].getLeadAtom (), this.monomers[i - 1].getLeadAtom (), this.monomers[i].getLeadAtom (), this.monomers[i + 1].getLeadAtom (), true);

return angles;
});
Clazz.defineMethod (c$, "calculateCodes", 
 function (angles) {
var codes =  new Array (this.monomerCount);
for (var i = this.monomerCount - 1; --i >= 2; ) {
var degrees = angles[i];
codes[i] = ((degrees >= 10 && degrees < 120) ? JM.AlphaPolymer.Code.RIGHT_HELIX : ((degrees >= 120 || degrees < -90) ? JM.AlphaPolymer.Code.BETA_SHEET : ((degrees >= -90 && degrees < 0) ? JM.AlphaPolymer.Code.LEFT_HELIX : JM.AlphaPolymer.Code.NADA)));
}
return codes;
}, "~A");
Clazz.defineMethod (c$, "checkBetaSheetAlphaHelixOverlap", 
 function (codes, angles) {
for (var i = this.monomerCount - 2; --i >= 2; ) if (codes[i] === JM.AlphaPolymer.Code.BETA_SHEET && angles[i] <= 140 && codes[i - 2] === JM.AlphaPolymer.Code.RIGHT_HELIX && codes[i - 1] === JM.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 1] === JM.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 2] === JM.AlphaPolymer.Code.RIGHT_HELIX) codes[i] = JM.AlphaPolymer.Code.RIGHT_HELIX;

}, "~A,~A");
Clazz.defineMethod (c$, "calculateRunsFourOrMore", 
 function (codes) {
var tags =  new Array (this.monomerCount);
var tag = J.c.STR.NONE;
var code = JM.AlphaPolymer.Code.NADA;
var runLength = 0;
for (var i = 0; i < this.monomerCount; ++i) {
if (codes[i] === code && code !== JM.AlphaPolymer.Code.NADA && code !== JM.AlphaPolymer.Code.BETA_SHEET) {
++runLength;
if (runLength == 4) {
tag = (code === JM.AlphaPolymer.Code.BETA_SHEET ? J.c.STR.SHEET : J.c.STR.HELIX);
for (var j = 4; --j >= 0; ) tags[i - j] = tag;

} else if (runLength > 4) tags[i] = tag;
} else {
runLength = 1;
code = codes[i];
}}
return tags;
}, "~A");
Clazz.defineMethod (c$, "extendRuns", 
 function (tags) {
for (var i = 1; i < this.monomerCount - 4; ++i) if (tags[i] === J.c.STR.NONE && tags[i + 1] !== J.c.STR.NONE) tags[i] = tags[i + 1];

tags[0] = tags[1];
tags[this.monomerCount - 1] = tags[this.monomerCount - 2];
}, "~A");
Clazz.defineMethod (c$, "searchForTurns", 
 function (codes, angles, tags) {
for (var i = this.monomerCount - 1; --i >= 2; ) {
codes[i] = JM.AlphaPolymer.Code.NADA;
if (tags[i] == null || tags[i] === J.c.STR.NONE) {
var angle = angles[i];
if (angle >= -90 && angle < 0) codes[i] = JM.AlphaPolymer.Code.LEFT_TURN;
 else if (angle >= 0 && angle < 90) codes[i] = JM.AlphaPolymer.Code.RIGHT_TURN;
}}
for (var i = this.monomerCount - 1; --i >= 0; ) {
if (codes[i] !== JM.AlphaPolymer.Code.NADA && codes[i + 1] === codes[i] && tags[i] === J.c.STR.NONE) tags[i] = J.c.STR.TURN;
}
}, "~A,~A,~A");
Clazz.defineMethod (c$, "addStructuresFromTags", 
 function (tags) {
var i = 0;
while (i < this.monomerCount) {
var tag = tags[i];
if (tag == null || tag === J.c.STR.NONE) {
++i;
continue;
}var iMax;
for (iMax = i + 1; iMax < this.monomerCount && tags[iMax] === tag; ++iMax) {
}
this.addStructureProtected (tag, null, 0, 0, i, iMax - 1);
i = iMax;
}
}, "~A");
Clazz.defineMethod (c$, "setStructureBS", 
function (count, dsspType, type, bs, doOffset) {
var offset = (doOffset ? this.pt0 : 0);
for (var pt = 0, i = bs.nextSetBit (offset), i2 = 0, n = this.monomerCount + offset; i >= 0 && i < n; i = bs.nextSetBit (i2 + 1)) {
if ((i2 = bs.nextClearBit (i)) < 0 || i2 > n) i2 = n;
this.addStructureProtected (type, JM.AlphaPolymer.dsspTypes[dsspType] + (++pt), count++, (dsspType == 3 ? 1 : 0), i - offset, i2 - 1 - offset);
}
return count;
}, "~N,~N,J.c.STR,JU.BS,~B");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (JM.AlphaPolymer, "Code", Enum);
Clazz.defineEnumConstant (c$, "NADA", 0, []);
Clazz.defineEnumConstant (c$, "RIGHT_HELIX", 1, []);
Clazz.defineEnumConstant (c$, "BETA_SHEET", 2, []);
Clazz.defineEnumConstant (c$, "LEFT_HELIX", 3, []);
Clazz.defineEnumConstant (c$, "LEFT_TURN", 4, []);
Clazz.defineEnumConstant (c$, "RIGHT_TURN", 5, []);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"dsspTypes",  Clazz.newArray (-1, ["H", null, "H", "S", "H", null, "T"]));
});
