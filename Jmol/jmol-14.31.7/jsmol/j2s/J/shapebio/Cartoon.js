Clazz.declarePackage ("J.shapebio");
Clazz.load (["J.shapebio.Rockets"], "J.shapebio.Cartoon", null, function () {
c$ = Clazz.declareType (J.shapebio, "Cartoon", J.shapebio.Rockets);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapebio.Cartoon, "initShape", []);
this.madDnaRna = 1000;
});
});
