Clazz.declarePackage ("J.renderbio");
Clazz.load (["J.renderbio.RocketsRenderer"], "J.renderbio.CartoonRenderer", ["J.api.Interface", "J.c.STR"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nucleicRenderer = null;
Clazz.instantialize (this, arguments);
}, J.renderbio, "CartoonRenderer", J.renderbio.RocketsRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (!this.setupRR (bioShape, false)) return;
if (this.isNucleic || this.isPhosphorusOnly) {
if (this.nucleicRenderer == null) this.nucleicRenderer = J.api.Interface.getInterface ("J.renderbio.NucleicRenderer", this.vwr, "render");
this.calcScreenControlPoints ();
this.nucleicRenderer.renderNucleic (this);
return;
}var val = this.vwr.getBoolean (603979820);
if (this.helixRockets != val) {
bioShape.falsifyMesh ();
this.helixRockets = val;
}this.ribbonTopScreens = this.calcScreens (0.5, this.mads);
this.ribbonBottomScreens = this.calcScreens (-0.5, this.mads);
this.calcRopeMidPoints ();
this.renderProtein ();
this.vwr.freeTempPoints (this.cordMidPoints);
this.vwr.freeTempPoints (this.ribbonTopScreens);
this.vwr.freeTempPoints (this.ribbonBottomScreens);
}, "J.shapebio.BioShape");
Clazz.defineMethod (c$, "renderProtein", 
 function () {
var lastWasSheet = false;
var lastWasHelix = false;
var previousStructure = null;
var thisStructure;
var needRockets = (this.helixRockets || !this.renderArrowHeads);
var doRockets = false;
for (var i = this.monomerCount; --i >= 0; ) {
thisStructure = this.monomers[i].getStructure ();
if (thisStructure !== previousStructure) {
lastWasSheet = false;
}previousStructure = thisStructure;
var isHelix = (this.structureTypes[i] === J.c.STR.HELIX);
var isSheet = (this.structureTypes[i] === J.c.STR.SHEET);
if (this.bsVisible.get (i)) {
if (isHelix && needRockets) {
doRockets = true;
} else if (isSheet || isHelix) {
if (lastWasSheet && isSheet || lastWasHelix && isHelix) {
this.renderHermiteRibbon (true, i, true);
} else {
this.renderHermiteArrowHead (i);
}} else {
this.renderHermiteConic (i, true, 7);
}}lastWasSheet = isSheet;
lastWasHelix = isHelix && !this.helixRockets;
}
if (doRockets) this.renderRockets ();
});
});
