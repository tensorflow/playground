Clazz.declarePackage ("J.shapebio");
Clazz.load (["J.shapebio.BioShapeCollection"], "J.shapebio.Rockets", null, function () {
c$ = Clazz.declareType (J.shapebio, "Rockets", J.shapebio.BioShapeCollection);
Clazz.overrideMethod (c$, "initShape", 
function () {
this.madTurnRandom = 500;
});
});
