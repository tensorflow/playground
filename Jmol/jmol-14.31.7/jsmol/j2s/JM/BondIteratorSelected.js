Clazz.declarePackage ("JM");
Clazz.load (["JM.BondIterator"], "JM.BondIteratorSelected", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bonds = null;
this.bondCount = 0;
this.bondType = 0;
this.iBond = 0;
this.bsSelected = null;
this.bondSelectionModeOr = false;
Clazz.instantialize (this, arguments);
}, JM, "BondIteratorSelected", null, JM.BondIterator);
Clazz.makeConstructor (c$, 
function (bonds, bondCount, bondType, bsSelected, bondSelectionModeOr) {
this.bonds = bonds;
this.bondCount = bondCount;
this.bondType = bondType;
this.bsSelected = bsSelected;
this.bondSelectionModeOr = bondSelectionModeOr;
}, "~A,~N,~N,JU.BS,~B");
Clazz.overrideMethod (c$, "hasNext", 
function () {
if (this.bondType == 131071) {
this.iBond = this.bsSelected.nextSetBit (this.iBond);
return (this.iBond >= 0 && this.iBond < this.bondCount);
}for (; this.iBond < this.bondCount; ++this.iBond) {
var bond = this.bonds[this.iBond];
if (this.bondType != 65535 && (bond.order & this.bondType) == 0) {
continue;
} else if (this.bondType == 65535 && bond.order == 32768) continue;
var isSelected1 = this.bsSelected.get (bond.atom1.i);
var isSelected2 = this.bsSelected.get (bond.atom2.i);
if ((!this.bondSelectionModeOr && isSelected1 && isSelected2) || (this.bondSelectionModeOr && (isSelected1 || isSelected2))) return true;
}
return false;
});
Clazz.overrideMethod (c$, "nextIndex", 
function () {
return this.iBond;
});
Clazz.overrideMethod (c$, "next", 
function () {
return this.bonds[this.iBond++];
});
});
