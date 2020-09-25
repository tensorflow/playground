Clazz.declarePackage ("J.c");
Clazz.load (["java.lang.Enum"], "J.c.HB", null, function () {
c$ = Clazz.declareType (J.c, "HB", Enum);
c$.getType = Clazz.defineMethod (c$, "getType", 
function (atom) {
var group = atom.group;
var considerHydrogens = !atom.isHetero ();
switch (atom.getElementNumber ()) {
default:
return J.c.HB.NOT;
case 1:
if (atom.getCovalentBondCount () == 0) return J.c.HB.DONOR;
var bonds = atom.bonds;
if (bonds == null) return J.c.HB.NOT;
switch (bonds[0].getOtherAtom (atom).getElementNumber ()) {
case 7:
case 8:
case 16:
return J.c.HB.DONOR;
}
return J.c.HB.NOT;
case 7:
if (atom === group.getNitrogenAtom ()) return J.c.HB.DONOR;
if (group.groupID == 9) return J.c.HB.UNKNOWN;
if (atom.getCovalentHydrogenCount () > 0) return J.c.HB.DONOR;
if (considerHydrogens) return J.c.HB.ACCEPTOR;
switch (group.groupID) {
case 2:
case 3:
case 12:
case 6:
case 19:
return J.c.HB.DONOR;
}
return J.c.HB.UNKNOWN;
case 8:
if (atom === group.getCarbonylOxygenAtom () || atom.getFormalCharge () == -1) return J.c.HB.ACCEPTOR;
if (atom.getCovalentBondCount () == 0 || atom.getCovalentHydrogenCount () > 0) return J.c.HB.UNKNOWN;
if (considerHydrogens) return J.c.HB.ACCEPTOR;
switch (group.groupID) {
case 4:
case 7:
return J.c.HB.ACCEPTOR;
}
return J.c.HB.UNKNOWN;
}
}, "JM.Atom");
c$.isPossibleHBond = Clazz.defineMethod (c$, "isPossibleHBond", 
function (typeA, typeB) {
return (typeA === J.c.HB.NOT || typeB === J.c.HB.NOT ? false : typeA === J.c.HB.UNKNOWN || typeA !== typeB);
}, "J.c.HB,J.c.HB");
Clazz.defineEnumConstant (c$, "NOT", 0, []);
Clazz.defineEnumConstant (c$, "ACCEPTOR", 1, []);
Clazz.defineEnumConstant (c$, "DONOR", 2, []);
Clazz.defineEnumConstant (c$, "UNKNOWN", 3, []);
});
