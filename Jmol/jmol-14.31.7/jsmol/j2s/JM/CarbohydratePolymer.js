Clazz.declarePackage ("JM");
Clazz.load (["JM.BioPolymer"], "JM.CarbohydratePolymer", null, function () {
c$ = Clazz.declareType (JM, "CarbohydratePolymer", JM.BioPolymer);
Clazz.makeConstructor (c$, 
function (monomers) {
Clazz.superConstructor (this, JM.CarbohydratePolymer, []);
this.set (monomers);
this.type = 3;
}, "~A");
});
