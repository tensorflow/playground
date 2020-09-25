Clazz.declarePackage ("J.renderbio");
Clazz.load (["J.renderbio.MeshRibbonRenderer"], "J.renderbio.RibbonsRenderer", null, function () {
c$ = Clazz.declareType (J.renderbio, "RibbonsRenderer", J.renderbio.MeshRibbonRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (this.wingVectors == null) return;
if (this.wireframeOnly) this.renderStrands ();
 else this.render2Strand (true, this.isNucleic ? 1 : 0.5, this.isNucleic ? 0 : 0.5);
}, "J.shapebio.BioShape");
});
