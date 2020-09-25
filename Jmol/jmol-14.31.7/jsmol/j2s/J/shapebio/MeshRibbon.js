Clazz.declarePackage ("J.shapebio");
Clazz.load (["J.shapebio.Strands"], "J.shapebio.MeshRibbon", null, function () {
c$ = Clazz.declareType (J.shapebio, "MeshRibbon", J.shapebio.Strands);
Clazz.overrideMethod (c$, "initShape", 
function () {
this.isMesh = true;
});
});
