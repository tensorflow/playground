Clazz.declarePackage ("J.quantum.mo");
Clazz.load (["J.quantum.mo.DataAdder"], "J.quantum.mo.DataAdderH", null, function () {
c$ = Clazz.declareType (J.quantum.mo, "DataAdderH", null, J.quantum.mo.DataAdder);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "addData", 
function (calc, havePoints) {
switch (calc.normType) {
case 0:
default:
return false;
case 3:
return false;
case 1:
return false;
case 2:
return false;
}
}, "J.quantum.MOCalculation,~B");
});
