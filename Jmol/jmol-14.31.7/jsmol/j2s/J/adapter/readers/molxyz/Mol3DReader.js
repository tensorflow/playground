Clazz.declarePackage ("J.adapter.readers.molxyz");
Clazz.load (["J.adapter.readers.molxyz.MolReader"], "J.adapter.readers.molxyz.Mol3DReader", null, function () {
c$ = Clazz.declareType (J.adapter.readers.molxyz, "Mol3DReader", J.adapter.readers.molxyz.MolReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.allow2D = false;
});
});
