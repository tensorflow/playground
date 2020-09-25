Clazz.declarePackage ("J.shapesurface");
Clazz.load (["J.shapesurface.Pmesh"], "J.shapesurface.Plot3D", null, function () {
c$ = Clazz.declareType (J.shapesurface, "Plot3D", J.shapesurface.Pmesh);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapesurface.Plot3D, "initShape", []);
this.myType = "plot3d";
});
});
