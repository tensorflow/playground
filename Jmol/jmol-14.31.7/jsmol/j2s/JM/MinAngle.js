Clazz.declarePackage ("JM");
Clazz.load (["JM.MinObject"], "JM.MinAngle", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.sbType = 0;
this.sbKey = null;
this.ka = 0;
this.theta0 = NaN;
Clazz.instantialize (this, arguments);
}, JM, "MinAngle", JM.MinObject);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, JM.MinAngle, []);
this.data = data;
}, "~A");
});
