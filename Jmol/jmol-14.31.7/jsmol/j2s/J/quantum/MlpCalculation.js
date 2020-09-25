Clazz.declarePackage ("J.quantum");
Clazz.load (["J.quantum.MepCalculation"], "J.quantum.MlpCalculation", ["java.lang.Float", "JU.Logger"], function () {
c$ = Clazz.declareType (J.quantum, "MlpCalculation", J.quantum.MepCalculation);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.quantum.MlpCalculation);
this.distanceMode = 3;
});
Clazz.overrideMethod (c$, "assignPotentials", 
function (atoms, potentials, bsAromatic, bsCarbonyl, bsIgnore, data) {
this.getAtomicPotentials (data, "atomicLipophilicity.txt");
for (var i = 0; i < atoms.length; i++) {
var f = Math.abs (atoms[i].getFormalCharge ());
if (f == 0) {
if (bsIgnore != null && bsIgnore.get (i)) {
f = NaN;
} else {
f = this.getTabulatedPotential (atoms[i]);
if (Float.isNaN (f)) switch (atoms[i].getElementNumber ()) {
case 6:
f = (bsAromatic.get (i) ? 0.31 : bsCarbonyl.get (i) ? -0.54 : 0.45);
break;
case 7:
f = (bsAromatic.get (i) ? -0.6 : bsCarbonyl.get (i) ? -0.44 : -1.0);
break;
case 8:
f = (bsCarbonyl.get (i) ? -0.9 : -0.17);
break;
default:
f = NaN;
}
}}if (JU.Logger.debugging) JU.Logger.debug (atoms[i].getInfo () + " " + f);
potentials[i] = f;
}
}, "~A,~A,JU.BS,JU.BS,JU.BS,~S");
});
