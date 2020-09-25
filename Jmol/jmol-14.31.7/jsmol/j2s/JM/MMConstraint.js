Clazz.declarePackage ("JM");
c$ = Clazz.decorateAsClass (function () {
this.indexes = null;
this.value = 0;
this.type = 0;
this.minList = null;
this.nAtoms = 0;
Clazz.instantialize (this, arguments);
}, JM, "MMConstraint");
Clazz.prepareFields (c$, function () {
this.minList =  Clazz.newIntArray (4, 0);
});
Clazz.makeConstructor (c$, 
function (indexes, value) {
this.value = value;
this.indexes = indexes;
}, "~A,~N");
Clazz.defineMethod (c$, "set", 
function (steps, bsAtoms, atomMap) {
this.nAtoms = Math.abs (this.indexes[0]);
this.type = this.nAtoms - 2;
for (var j = 1; j <= this.nAtoms; j++) {
if (steps <= 0 || !bsAtoms.get (this.indexes[j])) {
this.indexes[0] = -this.nAtoms;
break;
}this.minList[j - 1] = atomMap[this.indexes[j]];
}
}, "~N,JU.BS,~A");
Clazz.defineStatics (c$,
"TYPE_DISTANCE", 0,
"TYPE_ANGLE", 1,
"TYPE_DIHEDRAL", 2);
