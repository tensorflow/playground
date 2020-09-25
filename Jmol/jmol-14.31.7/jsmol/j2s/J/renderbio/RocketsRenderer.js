Clazz.declarePackage ("J.renderbio");
Clazz.load (["J.renderbio.StrandsRenderer"], "J.renderbio.RocketsRenderer", ["javajs.api.Interface", "JU.P3", "J.c.STR"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isRockets = false;
this.helixRockets = true;
this.renderArrowHeads = false;
this.cordMidPoints = null;
this.rr = null;
Clazz.instantialize (this, arguments);
}, J.renderbio, "RocketsRenderer", J.renderbio.StrandsRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (!this.setupRR (bioShape, true)) return;
this.calcRopeMidPoints ();
this.renderRockets ();
this.vwr.freeTempPoints (this.cordMidPoints);
}, "J.shapebio.BioShape");
Clazz.defineMethod (c$, "renderRockets", 
function () {
if (this.rr == null) this.rr = (javajs.api.Interface.getInterface ("J.renderbio.RocketRenderer")).set (this);
this.rr.renderRockets ();
});
Clazz.defineMethod (c$, "setupRR", 
function (bioShape, isRockets) {
this.isRockets = isRockets;
if (this.wireframeOnly) {
this.renderStrands ();
} else if (this.wingVectors != null && !this.isCarbohydrate && !(isRockets && this.isNucleic)) {
var val = !this.vwr.getBoolean (603979902);
if (!this.isNucleic && this.renderArrowHeads != val) {
bioShape.falsifyMesh ();
this.renderArrowHeads = val;
}return true;
}return false;
}, "J.shapebio.BioShape,~B");
Clazz.defineMethod (c$, "calcRopeMidPoints", 
function () {
var midPointCount = this.monomerCount + 1;
this.cordMidPoints = this.vwr.allocTempPoints (midPointCount);
var proteinstructurePrev = null;
var point;
var ptLastRocket = -10;
var pt1 =  new JU.P3 ();
var pt2 =  new JU.P3 ();
for (var i = 0; i <= this.monomerCount; ++i) {
point = this.cordMidPoints[i];
if (i < this.monomerCount && (this.helixRockets && this.structureTypes[i] === J.c.STR.HELIX || this.isRockets && this.structureTypes[i] === J.c.STR.SHEET)) {
var proteinstructure = this.monomers[i].getStructure ();
if (proteinstructure === proteinstructurePrev) {
pt1.add (pt2);
ptLastRocket = i;
} else {
proteinstructurePrev = proteinstructure;
pt1.setT (proteinstructure.getAxisStartPoint ());
pt2.sub2 (proteinstructure.getAxisEndPoint (), pt1);
pt2.scale (1 / (proteinstructure.nRes - 1));
if (ptLastRocket == i - 3) {
this.cordMidPoints[i - 1].ave (this.cordMidPoints[i - 2], pt1);
}}point.setT (pt1);
} else {
if (ptLastRocket == i - 1 && i > 1) this.cordMidPoints[i - 1].setT (this.cordMidPoints[i > 2 ? i - 3 : i - 2]);
point.setT (proteinstructurePrev == null ? this.controlPoints[i] : proteinstructurePrev.getAxisEndPoint ());
proteinstructurePrev = null;
}}
this.controlPoints = this.cordMidPoints;
this.calcScreenControlPoints ();
});
});
