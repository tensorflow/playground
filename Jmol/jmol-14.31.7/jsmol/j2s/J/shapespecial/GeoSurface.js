Clazz.declarePackage ("J.shapespecial");
Clazz.load (["J.shapespecial.Dots"], "J.shapespecial.GeoSurface", null, function () {
c$ = Clazz.declareType (J.shapespecial, "GeoSurface", J.shapespecial.Dots);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapespecial.GeoSurface, "initShape", []);
this.isSurface = true;
this.translucentAllowed = true;
});
});
