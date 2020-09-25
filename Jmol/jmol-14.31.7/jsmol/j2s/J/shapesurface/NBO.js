Clazz.declarePackage ("J.shapesurface");
Clazz.load (["J.shapesurface.MolecularOrbital"], "J.shapesurface.NBO", null, function () {
c$ = Clazz.declareType (J.shapesurface, "NBO", J.shapesurface.MolecularOrbital);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapesurface.NBO, "initShape", []);
this.myType = "nbo";
this.setPropI ("thisID", "nbo", null);
});
});
