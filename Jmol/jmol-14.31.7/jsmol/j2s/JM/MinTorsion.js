Clazz.declarePackage ("JM");
Clazz.load (["JM.MinObject"], "JM.MinTorsion", null, function () {
c$ = Clazz.declareType (JM, "MinTorsion", JM.MinObject);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, JM.MinTorsion, []);
this.data = data;
}, "~A");
});
