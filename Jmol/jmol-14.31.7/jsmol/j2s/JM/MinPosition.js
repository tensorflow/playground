Clazz.declarePackage ("JM");
Clazz.load (["JM.MinObject"], "JM.MinPosition", null, function () {
c$ = Clazz.declareType (JM, "MinPosition", JM.MinObject);
Clazz.makeConstructor (c$, 
function (data, ddata) {
Clazz.superConstructor (this, JM.MinPosition, []);
this.data = data;
this.ddata = ddata;
}, "~A,~A");
});
