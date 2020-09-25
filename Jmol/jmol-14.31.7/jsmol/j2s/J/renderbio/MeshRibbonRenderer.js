Clazz.declarePackage ("J.renderbio");
Clazz.load (["J.renderbio.StrandsRenderer"], "J.renderbio.MeshRibbonRenderer", null, function () {
c$ = Clazz.declareType (J.renderbio, "MeshRibbonRenderer", J.renderbio.StrandsRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (this.wireframeOnly) this.renderStrands ();
 else this.renderMeshRibbon ();
}, "J.shapebio.BioShape");
Clazz.defineMethod (c$, "renderMeshRibbon", 
function () {
if (!this.setStrandCount ()) return;
var offset = ((this.strandCount >> 1) * this.strandSeparation) + this.baseStrandOffset;
this.render2Strand (false, offset, offset);
this.renderStrands ();
});
Clazz.defineMethod (c$, "render2Strand", 
function (doFill, offsetTop, offsetBottom) {
this.calcScreenControlPoints ();
this.ribbonTopScreens = this.calcScreens (offsetTop, this.mads);
this.ribbonBottomScreens = this.calcScreens (-offsetBottom, this.mads);
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteRibbon (doFill, i, false);

this.vwr.freeTempPoints (this.ribbonTopScreens);
this.vwr.freeTempPoints (this.ribbonBottomScreens);
}, "~B,~N,~N");
});
