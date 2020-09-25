Clazz.declarePackage ("JM");
Clazz.load (["JM.BioPolymer"], "JM.PhosphorusPolymer", null, function () {
c$ = Clazz.declareType (JM, "PhosphorusPolymer", JM.BioPolymer);
Clazz.makeConstructor (c$, 
function (monomers) {
Clazz.superConstructor (this, JM.PhosphorusPolymer, []);
this.set (monomers);
this.hasStructure = true;
}, "~A");
});
