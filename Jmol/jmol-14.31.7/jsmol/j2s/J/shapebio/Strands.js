Clazz.declarePackage ("J.shapebio");
Clazz.load (["J.shapebio.BioShapeCollection"], "J.shapebio.Strands", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.isMesh = false;
Clazz.instantialize (this, arguments);
}, J.shapebio, "Strands", J.shapebio.BioShapeCollection);
});
