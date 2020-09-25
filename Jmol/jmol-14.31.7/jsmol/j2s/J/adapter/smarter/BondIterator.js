Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["J.api.JmolAdapterBondIterator"], "J.adapter.smarter.BondIterator", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bsAtoms = null;
this.bonds = null;
this.ibond = 0;
this.bond = null;
this.bondCount = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.smarter, "BondIterator", J.api.JmolAdapterBondIterator);
Clazz.makeConstructor (c$, 
function (asc) {
Clazz.superConstructor (this, J.adapter.smarter.BondIterator, []);
this.bsAtoms = asc.bsAtoms;
this.bonds = asc.bonds;
this.bondCount = asc.bondCount;
this.ibond = 0;
}, "J.adapter.smarter.AtomSetCollection");
Clazz.overrideMethod (c$, "hasNext", 
function () {
if (this.ibond == this.bondCount) return false;
while ((this.bond = this.bonds[this.ibond++]) == null || (this.bsAtoms != null && (!this.bsAtoms.get (this.bond.atomIndex1) || !this.bsAtoms.get (this.bond.atomIndex2)))) if (this.ibond == this.bondCount) return false;

return true;
});
Clazz.overrideMethod (c$, "getAtomUniqueID1", 
function () {
return Integer.$valueOf (this.bond.atomIndex1);
});
Clazz.overrideMethod (c$, "getAtomUniqueID2", 
function () {
return Integer.$valueOf (this.bond.atomIndex2);
});
Clazz.overrideMethod (c$, "getEncodedOrder", 
function () {
return this.bond.order;
});
Clazz.overrideMethod (c$, "getRadius", 
function () {
return this.bond.radius;
});
Clazz.overrideMethod (c$, "getColix", 
function () {
return this.bond.colix;
});
});
