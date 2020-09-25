Clazz.declarePackage ("J.renderbio");
Clazz.load (["J.render.ShapeRenderer", "JU.BS", "$.P3"], "J.renderbio.BioShapeRenderer", ["javajs.api.Interface", "J.c.STR", "JM.CarbohydratePolymer", "$.NucleicPolymer", "$.PhosphorusPolymer", "JU.C"], function () {
c$ = Clazz.decorateAsClass (function () {
this.invalidateMesh = false;
this.invalidateSheets = false;
this.isTraceAlpha = false;
this.ribbonBorder = false;
this.haveControlPointScreens = false;
this.aspectRatio = 0;
this.hermiteLevel = 0;
this.sheetSmoothing = 0;
this.cartoonsFancy = false;
this.monomerCount = 0;
this.monomers = null;
this.isNucleic = false;
this.isPhosphorusOnly = false;
this.isCarbohydrate = false;
this.bsVisible = null;
this.ribbonTopScreens = null;
this.ribbonBottomScreens = null;
this.controlPoints = null;
this.controlPointScreens = null;
this.leadAtomIndices = null;
this.wingVectors = null;
this.mads = null;
this.colixes = null;
this.colixesBack = null;
this.structureTypes = null;
this.isHighRes = false;
this.wireframeOnly = false;
this.needTranslucent = false;
this.meshRenderer = null;
this.bioShape = null;
this.pointT = null;
this.iPrev = 0;
this.iNext = 0;
this.iNext2 = 0;
this.iNext3 = 0;
this.diameterBeg = 0;
this.diameterMid = 0;
this.diameterEnd = 0;
this.madBeg = 0;
this.madMid = 0;
this.madEnd = 0;
this.colixBack = 0;
this.reversed = null;
this.isCyclic = false;
this.screenArrowTop = null;
this.screenArrowTopPrev = null;
this.screenArrowBot = null;
this.screenArrowBotPrev = null;
Clazz.instantialize (this, arguments);
}, J.renderbio, "BioShapeRenderer", J.render.ShapeRenderer);
Clazz.prepareFields (c$, function () {
this.bsVisible =  new JU.BS ();
this.pointT =  new JU.P3 ();
this.screenArrowTop =  new JU.P3 ();
this.screenArrowTopPrev =  new JU.P3 ();
this.screenArrowBot =  new JU.P3 ();
this.screenArrowBotPrev =  new JU.P3 ();
});
Clazz.overrideMethod (c$, "render", 
function () {
if (this.shape == null) return false;
this.setGlobals ();
this.renderShapes ();
return this.needTranslucent;
});
Clazz.defineMethod (c$, "setGlobals", 
 function () {
this.invalidateMesh = false;
this.needTranslucent = false;
this.g3d.addRenderer (553648145);
var TF = (!this.isExport && !this.vwr.checkMotionRendering (1112152066));
if (TF != this.wireframeOnly) this.invalidateMesh = true;
this.wireframeOnly = TF;
TF = (this.isExport || !this.wireframeOnly && this.vwr.getBoolean (603979864));
if (TF != this.isHighRes) this.invalidateMesh = true;
this.isHighRes = TF;
TF = !this.wireframeOnly && (this.vwr.getBoolean (603979817) || this.isExport);
if (this.cartoonsFancy != TF) {
this.invalidateMesh = true;
this.cartoonsFancy = TF;
}var val1 = this.vwr.getHermiteLevel ();
val1 = (val1 <= 0 ? -val1 : this.vwr.getInMotion (true) ? 0 : val1);
if (this.cartoonsFancy && !this.wireframeOnly) val1 = Math.max (val1, 3);
if (val1 != this.hermiteLevel) this.invalidateMesh = true;
this.hermiteLevel = Math.min (val1, 8);
var val = this.vwr.getInt (553648166);
val = Math.min (Math.max (0, val), 20);
if (this.cartoonsFancy && val >= 16) val = 4;
if (this.wireframeOnly || this.hermiteLevel == 0) val = 0;
if (val != this.aspectRatio && val != 0 && val1 != 0) this.invalidateMesh = true;
this.aspectRatio = val;
if (this.aspectRatio > 0) {
if (this.meshRenderer == null) {
this.meshRenderer = javajs.api.Interface.getInterface ("J.renderbio.BioMeshRenderer");
this.meshRenderer.setViewerG3dShapeID (this.vwr, this.shape.shapeID);
}this.meshRenderer.setup (this.g3d, this.vwr.ms, this.shape);
}TF = this.vwr.getBoolean (603979966);
if (TF != this.isTraceAlpha) this.invalidateMesh = true;
this.isTraceAlpha = TF;
this.invalidateSheets = false;
var fval = this.vwr.getFloat (570425392);
if (fval != this.sheetSmoothing && this.isTraceAlpha) {
this.sheetSmoothing = fval;
this.invalidateMesh = true;
this.invalidateSheets = true;
}});
Clazz.defineMethod (c$, "renderShapes", 
 function () {
var mps = this.shape;
for (var c = mps.bioShapes.length; --c >= 0; ) {
this.bioShape = mps.getBioShape (c);
if ((this.bioShape.modelVisibilityFlags & this.myVisibilityFlag) == 0) continue;
if (this.bioShape.monomerCount >= 2 && this.initializePolymer (this.bioShape)) {
if (this.meshRenderer != null) this.meshRenderer.initBS ();
this.isCyclic = this.bioShape.bioPolymer.isCyclic ();
this.renderBioShape (this.bioShape);
if (this.meshRenderer != null) this.meshRenderer.renderMeshes ();
this.freeTempArrays ();
}}
});
Clazz.defineMethod (c$, "setBioColix", 
function (colix) {
if (this.g3d.setC (colix)) return true;
this.needTranslucent = true;
return false;
}, "~N");
Clazz.defineMethod (c$, "freeTempArrays", 
 function () {
if (this.haveControlPointScreens) this.vwr.freeTempPoints (this.controlPointScreens);
this.vwr.freeTempEnum (this.structureTypes);
});
Clazz.defineMethod (c$, "initializePolymer", 
 function (bioShape) {
var bsDeleted = this.vwr.slm.bsDeleted;
if (this.vwr.ms.isJmolDataFrameForModel (bioShape.modelIndex)) {
this.controlPoints = bioShape.bioPolymer.getControlPoints (true, 0, false);
} else {
this.controlPoints = bioShape.bioPolymer.getControlPoints (this.isTraceAlpha, this.sheetSmoothing, this.invalidateSheets);
}this.monomerCount = bioShape.monomerCount;
this.monomers = bioShape.monomers;
this.reversed = bioShape.bioPolymer.reversed;
this.leadAtomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
this.bsVisible.clearAll ();
var haveVisible = false;
if (this.invalidateMesh) bioShape.falsifyMesh ();
for (var i = this.monomerCount; --i >= 0; ) {
if ((this.monomers[i].shapeVisibilityFlags & this.myVisibilityFlag) == 0 || this.ms.isAtomHidden (this.leadAtomIndices[i]) || bsDeleted != null && bsDeleted.get (this.leadAtomIndices[i])) continue;
var lead = this.ms.at[this.leadAtomIndices[i]];
if (!this.g3d.isInDisplayRange (lead.sX, lead.sY)) continue;
this.bsVisible.set (i);
haveVisible = true;
}
if (!haveVisible) return false;
this.ribbonBorder = this.vwr.getBoolean (603979901);
this.isNucleic = Clazz.instanceOf (bioShape.bioPolymer, JM.NucleicPolymer);
this.isPhosphorusOnly = !this.isNucleic && Clazz.instanceOf (bioShape.bioPolymer, JM.PhosphorusPolymer);
this.isCarbohydrate = Clazz.instanceOf (bioShape.bioPolymer, JM.CarbohydratePolymer);
this.haveControlPointScreens = false;
this.wingVectors = bioShape.wingVectors;
if (this.meshRenderer != null) this.meshRenderer.initialize (this, bioShape, this.monomerCount);
this.mads = bioShape.mads;
this.colixes = bioShape.colixes;
this.colixesBack = bioShape.colixesBack;
this.setStructureTypes ();
return true;
}, "J.shapebio.BioShape");
Clazz.defineMethod (c$, "setStructureTypes", 
 function () {
var types = this.structureTypes = this.vwr.allocTempEnum (this.monomerCount + 1);
for (var i = this.monomerCount; --i >= 0; ) if ((types[i] = this.monomers[i].getProteinStructureType ()) === J.c.STR.TURN) types[i] = J.c.STR.NONE;

types[this.monomerCount] = types[this.monomerCount - 1];
});
Clazz.defineMethod (c$, "calcScreenControlPoints", 
function () {
var count = this.monomerCount + 1;
var scr = this.controlPointScreens = this.vwr.allocTempPoints (count);
var points = this.controlPoints;
for (var i = count; --i >= 0; ) this.tm.transformPtScrT3 (points[i], scr[i]);

this.haveControlPointScreens = true;
});
Clazz.defineMethod (c$, "calcScreens", 
function (offsetFraction, mads) {
var count = this.controlPoints.length;
var screens = this.vwr.allocTempPoints (count);
if (offsetFraction == 0) {
for (var i = count; --i >= 0; ) this.tm.transformPtScrT3 (this.controlPoints[i], screens[i]);

} else {
var offset_1000 = offsetFraction / 1000;
for (var i = count; --i >= 0; ) this.calc1Screen (this.controlPoints[i], this.wingVectors[i], (mads[i] == 0 && i > 0 ? mads[i - 1] : mads[i]), offset_1000, screens[i]);

}return screens;
}, "~N,~A");
Clazz.defineMethod (c$, "calc1Screen", 
 function (center, vector, mad, offset_1000, screen) {
this.pointT.scaleAdd2 (mad * offset_1000, vector, center);
this.tm.transformPtScrT3 (this.pointT, screen);
}, "JU.P3,JU.V3,~N,~N,JU.P3");
Clazz.defineMethod (c$, "getLeadColix", 
function (i) {
return JU.C.getColixInherited (this.colixes[i], this.monomers[i].getLeadAtom ().colixAtom);
}, "~N");
Clazz.defineMethod (c$, "getLeadColixBack", 
function (i) {
return (this.colixesBack == null || this.colixesBack.length <= i ? 0 : this.colixesBack[i]);
}, "~N");
Clazz.defineMethod (c$, "setNeighbors", 
function (i) {
if (this.isCyclic) {
i += this.monomerCount;
this.iPrev = (i - 1) % this.monomerCount;
this.iNext = (i + 1) % this.monomerCount;
this.iNext2 = (i + 2) % this.monomerCount;
this.iNext3 = (i + 3) % this.monomerCount;
} else {
this.iPrev = Math.max (i - 1, 0);
this.iNext = Math.min (i + 1, this.monomerCount);
this.iNext2 = Math.min (i + 2, this.monomerCount);
this.iNext3 = Math.min (i + 3, this.monomerCount);
}}, "~N");
Clazz.defineMethod (c$, "setColix", 
function (colix) {
this.colix = colix;
return this.g3d.setC (colix);
}, "~N");
Clazz.defineMethod (c$, "setMads", 
 function (i, thisTypeOnly) {
this.madMid = this.madBeg = this.madEnd = this.mads[i];
if (this.isTraceAlpha) {
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iNext]) {
this.madEnd = this.mads[this.iNext];
if (this.madEnd == 0) {
if (Clazz.instanceOf (this, J.renderbio.TraceRenderer)) {
this.madEnd = this.madBeg;
} else {
this.madEnd = this.madBeg;
}}this.madMid = ((this.madBeg + this.madEnd) >> 1);
}} else {
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iPrev]) this.madBeg = (((this.mads[this.iPrev] == 0 ? this.madMid : this.mads[this.iPrev]) + this.madMid) >> 1);
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iNext]) this.madEnd = (((this.mads[this.iNext] == 0 ? this.madMid : this.mads[this.iNext]) + this.madMid) >> 1);
}this.diameterBeg = Clazz.floatToInt (this.vwr.tm.scaleToScreen (Clazz.floatToInt (this.controlPointScreens[i].z), this.madBeg));
this.diameterMid = Clazz.floatToInt (this.vwr.tm.scaleToScreen (this.monomers[i].getLeadAtom ().sZ, this.madMid));
this.diameterEnd = Clazz.floatToInt (this.vwr.tm.scaleToScreen (Clazz.floatToInt (this.controlPointScreens[this.iNext].z), this.madEnd));
var doCap0 = (i == this.iPrev || !this.bsVisible.get (this.iPrev) || thisTypeOnly && this.structureTypes[i] !== this.structureTypes[this.iPrev]);
var doCap1 = (this.iNext == this.iNext2 || !this.bsVisible.get (this.iNext) || thisTypeOnly && this.structureTypes[i] !== this.structureTypes[this.iNext]);
return (this.aspectRatio > 0 && this.meshRenderer != null && this.meshRenderer.check (doCap0, doCap1));
}, "~N,~B");
Clazz.defineMethod (c$, "renderHermiteCylinder", 
function (screens, i) {
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.setNeighbors (i);
this.g3d.drawHermite4 (this.isNucleic ? 4 : 7, screens[this.iPrev], screens[i], screens[this.iNext], screens[this.iNext2]);
}, "~A,~N");
Clazz.defineMethod (c$, "renderHermiteConic", 
function (i, thisTypeOnly, tension) {
this.setNeighbors (i);
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
if (this.setMads (i, thisTypeOnly) || this.isExport) {
this.meshRenderer.setFancyConic (i, tension);
return;
}if (this.diameterBeg == 0 && this.diameterEnd == 0 || this.wireframeOnly) this.g3d.drawLineAB (this.controlPointScreens[i], this.controlPointScreens[this.iNext]);
 else {
this.g3d.fillHermite (this.isNucleic ? 4 : 7, this.diameterBeg, this.diameterMid, this.diameterEnd, this.controlPointScreens[this.iPrev], this.controlPointScreens[i], this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2]);
}}, "~N,~B,~N");
Clazz.defineMethod (c$, "renderHermiteRibbon", 
function (doFill, i, thisTypeOnly) {
this.setNeighbors (i);
var c0 = this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
var cb = this.colixBack = this.getLeadColixBack (i);
if (doFill && (this.aspectRatio != 0 || this.isExport)) {
if (this.setMads (i, thisTypeOnly) || this.isExport) {
this.meshRenderer.setFancyRibbon (i);
return;
}}var isReversed = this.reversed.get (i);
if (isReversed && this.colixBack != 0) {
this.setColix (this.colixBack);
cb = c0;
}this.g3d.drawHermite7 (doFill, this.ribbonBorder, (isReversed ? -1 : 1) * (this.isNucleic ? 4 : 7), this.ribbonTopScreens[this.iPrev], this.ribbonTopScreens[i], this.ribbonTopScreens[this.iNext], this.ribbonTopScreens[this.iNext2], this.ribbonBottomScreens[this.iPrev], this.ribbonBottomScreens[i], this.ribbonBottomScreens[this.iNext], this.ribbonBottomScreens[this.iNext2], Clazz.floatToInt (this.aspectRatio), cb);
if (isReversed && this.colixBack != 0) {
this.setColix (c0);
cb = this.colixBack;
}}, "~B,~N,~B");
Clazz.defineMethod (c$, "renderHermiteArrowHead", 
function (i) {
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.colixBack = this.getLeadColixBack (i);
this.setNeighbors (i);
if (this.setMads (i, false) || this.isExport) {
this.meshRenderer.setFancyArrowHead (i);
return;
}var cp = this.controlPoints[i];
var wv = this.wingVectors[i];
this.calc1Screen (cp, wv, this.madBeg, .0007, this.screenArrowTop);
this.calc1Screen (cp, wv, this.madBeg, -7.0E-4, this.screenArrowBot);
this.calc1Screen (cp, wv, this.madBeg, 0.001, this.screenArrowTopPrev);
this.calc1Screen (cp, wv, this.madBeg, -0.001, this.screenArrowBotPrev);
this.g3d.drawHermite7 (true, this.ribbonBorder, this.isNucleic ? 4 : 7, this.screenArrowTopPrev, this.screenArrowTop, this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2], this.screenArrowBotPrev, this.screenArrowBot, this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2], Clazz.floatToInt (this.aspectRatio), this.colixBack);
this.g3d.setC (this.colix);
if (this.ribbonBorder && this.aspectRatio == 0) {
this.g3d.fillCylinderBits (3, 3, this.screenArrowTop, this.screenArrowBot);
}}, "~N");
Clazz.defineMethod (c$, "drawSegmentAB", 
function (atomA, atomB, colixA, colixB, max) {
var xA = atomA.sX;
var yA = atomA.sY;
var zA = atomA.sZ;
var xB = atomB.sX;
var yB = atomB.sY;
var zB = atomB.sZ;
var mad = this.mad;
if (max == 1000) mad = mad >> 1;
if (mad < 0) {
this.g3d.drawLine (colixA, colixB, xA, yA, zA, xB, yB, zB);
} else {
var width = Clazz.floatToInt (this.isExport ? mad : this.vwr.tm.scaleToScreen (Clazz.doubleToInt ((zA + zB) / 2), mad));
this.g3d.fillCylinderXYZ (colixA, colixB, 3, width, xA, yA, zA, xB, yB, zB);
}}, "JM.Atom,JM.Atom,~N,~N,~N");
});
