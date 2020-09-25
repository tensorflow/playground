Clazz.declarePackage ("J.renderbio");
Clazz.load (["J.renderbio.StrandsRenderer"], "J.renderbio.TraceRenderer", null, function () {
c$ = Clazz.declareType (J.renderbio, "TraceRenderer", J.renderbio.StrandsRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (this.wireframeOnly) this.renderStrands ();
 else this.renderTrace ();
}, "J.shapebio.BioShape");
Clazz.defineMethod (c$, "renderTrace", 
function () {
this.calcScreenControlPoints ();
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteConic (i, false, 7);

});
});
