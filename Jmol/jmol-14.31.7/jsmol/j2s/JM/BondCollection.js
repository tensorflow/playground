Clazz.declarePackage ("JM");
Clazz.load (["JM.AtomCollection"], "JM.BondCollection", ["JU.AU", "$.BS", "JM.Bond", "$.BondIteratorSelected", "$.BondSet", "$.HBond", "JU.BSUtil", "$.C", "$.Edge", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bo = null;
this.bondCount = 0;
this.numCached = null;
this.freeBonds = null;
this.molecules = null;
this.moleculeCount = 0;
this.defaultCovalentMad = 0;
this.bsAromaticSingle = null;
this.bsAromaticDouble = null;
this.bsAromatic = null;
this.haveHiddenBonds = false;
Clazz.instantialize (this, arguments);
}, JM, "BondCollection", JM.AtomCollection);
Clazz.defineMethod (c$, "setupBC", 
function () {
this.bsAromatic =  new JU.BS ();
this.numCached =  Clazz.newIntArray (5, 0);
this.freeBonds =  new Array (5);
for (var i = 5; --i > 0; ) this.freeBonds[i] =  new Array (200);

this.setupAC ();
});
Clazz.defineMethod (c$, "releaseModelSetBC", 
function () {
this.bo = null;
this.freeBonds = null;
this.releaseModelSetAC ();
});
Clazz.defineMethod (c$, "getBondIteratorForType", 
function (bondType, bsAtoms) {
return  new JM.BondIteratorSelected (this.bo, this.bondCount, bondType, bsAtoms, this.vwr.getBoolean (603979812));
}, "~N,JU.BS");
Clazz.defineMethod (c$, "getBondIterator", 
function (bsBonds) {
return  new JM.BondIteratorSelected (this.bo, this.bondCount, 131071, bsBonds, false);
}, "JU.BS");
Clazz.defineMethod (c$, "getBondColix1", 
function (i) {
return JU.C.getColixInherited (this.bo[i].colix, this.bo[i].atom1.colixAtom);
}, "~N");
Clazz.defineMethod (c$, "getBondColix2", 
function (i) {
return JU.C.getColixInherited (this.bo[i].colix, this.bo[i].atom2.colixAtom);
}, "~N");
Clazz.defineMethod (c$, "getBondCountInModel", 
function (modelIndex) {
var n = 0;
for (var i = this.bondCount; --i >= 0; ) if (this.bo[i].atom1.mi == modelIndex) n++;

return n;
}, "~N");
Clazz.defineMethod (c$, "getBondsForSelectedAtoms", 
function (bsAtoms, bondSelectionModeOr) {
var bs =  new JU.BS ();
for (var iBond = 0; iBond < this.bondCount; ++iBond) {
var bond = this.bo[iBond];
var isSelected1 = bsAtoms.get (bond.atom1.i);
var isSelected2 = bsAtoms.get (bond.atom2.i);
if (bondSelectionModeOr ? isSelected1 || isSelected2 : isSelected1 && isSelected2) bs.set (iBond);
}
return bs;
}, "JU.BS,~B");
Clazz.defineMethod (c$, "bondAtoms", 
function (atom1, atom2, order, mad, bsBonds, energy, addGroup, isNew) {
var bond = this.getOrAddBond (atom1, atom2, order, mad, bsBonds, energy, true);
if (isNew) {
bond.order |= 131072;
if (addGroup) {
atom1.group = atom2.group;
atom1.group.addAtoms (atom1.i);
}}return bond;
}, "JM.Atom,JM.Atom,~N,~N,JU.BS,~N,~B,~B");
Clazz.defineMethod (c$, "getOrAddBond", 
function (atom, atomOther, order, mad, bsBonds, energy, overrideBonding) {
var i;
if (order == 131071 || order == 65535) order = 1;
if (atom.isBonded (atomOther)) {
i = atom.getBond (atomOther).index;
if (overrideBonding) {
this.bo[i].setOrder (order);
this.bo[i].setMad (mad);
if (Clazz.instanceOf (this.bo[i], JM.HBond)) (this.bo[i]).energy = energy;
}} else {
if (this.bondCount == this.bo.length) this.bo = JU.AU.arrayCopyObject (this.bo, this.bondCount + 250);
i = this.setBond (this.bondCount++, this.bondMutually (atom, atomOther, order, mad, energy)).index;
}if (bsBonds != null) bsBonds.set (i);
return this.bo[i];
}, "JM.Atom,JM.Atom,~N,~N,JU.BS,~N,~B");
Clazz.defineMethod (c$, "setBond", 
function (index, bond) {
return this.bo[bond.index = index] = bond;
}, "~N,JM.Bond");
Clazz.defineMethod (c$, "bondMutually", 
function (atom, atomOther, order, mad, energy) {
var bond;
if (JU.Edge.isOrderH (order)) {
bond =  new JM.HBond (atom, atomOther, order, mad, 0, energy);
} else {
bond =  new JM.Bond (atom, atomOther, order, mad, 0);
}this.addBondToAtom (atom, bond);
this.addBondToAtom (atomOther, bond);
return bond;
}, "JM.Atom,JM.Atom,~N,~N,~N");
Clazz.defineMethod (c$, "addBondToAtom", 
 function (atom, bond) {
if (atom.bonds == null) {
atom.bonds =  new Array (1);
atom.bonds[0] = bond;
} else {
atom.bonds = this.addToBonds (bond, atom.bonds);
}}, "JM.Atom,JM.Bond");
Clazz.defineMethod (c$, "addToBonds", 
 function (newBond, oldBonds) {
var newBonds;
if (oldBonds == null) {
if (this.numCached[1] > 0) newBonds = this.freeBonds[1][--this.numCached[1]];
 else newBonds =  new Array (1);
newBonds[0] = newBond;
} else {
var oldLength = oldBonds.length;
var newLength = oldLength + 1;
if (newLength < 5 && this.numCached[newLength] > 0) newBonds = this.freeBonds[newLength][--this.numCached[newLength]];
 else newBonds =  new Array (newLength);
newBonds[oldLength] = newBond;
for (var i = oldLength; --i >= 0; ) newBonds[i] = oldBonds[i];

if (oldLength < 5 && this.numCached[oldLength] < 200) this.freeBonds[oldLength][this.numCached[oldLength]++] = oldBonds;
}return newBonds;
}, "JM.Bond,~A");
Clazz.defineMethod (c$, "addHBond", 
function (atom1, atom2, order, energy) {
if (this.bondCount == this.bo.length) this.bo = JU.AU.arrayCopyObject (this.bo, this.bondCount + 250);
return this.setBond (this.bondCount++, this.bondMutually (atom1, atom2, order, 1, energy)).index;
}, "JM.Atom,JM.Atom,~N,~N");
Clazz.defineMethod (c$, "deleteAllBonds2", 
function () {
this.vwr.setShapeProperty (1, "reset", null);
for (var i = this.bondCount; --i >= 0; ) {
this.bo[i].deleteAtomReferences ();
this.bo[i] = null;
}
this.bondCount = 0;
});
Clazz.defineMethod (c$, "getDefaultMadFromOrder", 
function (order) {
return (JU.Edge.isOrderH (order) ? 1 : order == 32768 ? Clazz.doubleToInt (Math.floor (this.vwr.getFloat (570425406) * 2000)) : this.defaultCovalentMad);
}, "~N");
Clazz.defineMethod (c$, "deleteConnections", 
function (minD, maxD, order, bsA, bsB, isBonds, matchNull) {
var minDIsFraction = (minD < 0);
var maxDIsFraction = (maxD < 0);
var isFractional = (minDIsFraction || maxDIsFraction);
minD = this.fixD (minD, minDIsFraction);
maxD = this.fixD (maxD, maxDIsFraction);
var bsDelete =  new JU.BS ();
var nDeleted = 0;
var newOrder = order |= 131072;
if (!matchNull && JU.Edge.isOrderH (order)) order = 30720;
var bsBonds;
if (isBonds) {
bsBonds = bsA;
} else {
bsBonds =  new JU.BS ();
for (var i = bsA.nextSetBit (0); i >= 0; i = bsA.nextSetBit (i + 1)) {
var a = this.at[i];
if (a.bonds != null) for (var j = a.bonds.length; --j >= 0; ) if (bsB.get (a.getBondedAtomIndex (j))) bsBonds.set (a.bonds[j].index);

}
}for (var i = bsBonds.nextSetBit (0); i < this.bondCount && i >= 0; i = bsBonds.nextSetBit (i + 1)) {
var bond = this.bo[i];
if (!this.isInRange (bond.atom1, bond.atom2, minD, maxD, minDIsFraction, maxDIsFraction, isFractional)) continue;
if (matchNull || newOrder == (bond.order & -257 | 131072) || (order & bond.order & 30720) != 0) {
bsDelete.set (i);
nDeleted++;
}}
if (nDeleted > 0) this.dBm (bsDelete, false);
return  Clazz.newIntArray (-1, [0, nDeleted]);
}, "~N,~N,~N,JU.BS,JU.BS,~B,~B");
Clazz.defineMethod (c$, "fixD", 
function (d, isF) {
return (isF ? -d : d * d);
}, "~N,~B");
Clazz.defineMethod (c$, "isInRange", 
function (atom1, atom2, minD, maxD, minFrac, maxfrac, isFractional) {
var d2 = atom1.distanceSquared (atom2);
if (isFractional) {
var dAB = Math.sqrt (d2);
var dABcalc = atom1.getBondingRadius () + atom2.getBondingRadius ();
return ((minFrac ? dAB >= dABcalc * minD : d2 >= minD) && (maxfrac ? dAB <= dABcalc * maxD : d2 <= maxD));
}return (d2 >= minD && d2 <= maxD);
}, "JM.Atom,JM.Atom,~N,~N,~B,~B,~B");
Clazz.defineMethod (c$, "dBm", 
function (bsBonds, isFullModel) {
(this).deleteBonds (bsBonds, isFullModel);
}, "JU.BS,~B");
Clazz.defineMethod (c$, "dBb", 
function (bsBond, isFullModel) {
var iDst = bsBond.nextSetBit (0);
if (iDst < 0) return;
(this).resetMolecules ();
var modelIndexLast = -1;
var n = bsBond.cardinality ();
for (var iSrc = iDst; iSrc < this.bondCount; ++iSrc) {
var bond = this.bo[iSrc];
if (n > 0 && bsBond.get (iSrc)) {
n--;
if (!isFullModel) {
var modelIndex = bond.atom1.mi;
if (modelIndex != modelIndexLast) (this).am[modelIndexLast = modelIndex].resetBoundCount ();
}bond.deleteAtomReferences ();
} else {
this.setBond (iDst++, bond);
}}
for (var i = this.bondCount; --i >= iDst; ) this.bo[i] = null;

this.bondCount = iDst;
var sets = this.vwr.getShapeProperty (1, "sets");
if (sets != null) for (var i = 0; i < sets.length; i++) JU.BSUtil.deleteBits (sets[i], bsBond);

JU.BSUtil.deleteBits (this.bsAromatic, bsBond);
}, "JU.BS,~B");
Clazz.defineMethod (c$, "resetAromatic", 
function () {
for (var i = this.bondCount; --i >= 0; ) {
var bond = this.bo[i];
if (bond.isAromatic ()) bond.setOrder (515);
}
});
Clazz.defineMethod (c$, "assignAromaticBondsBs", 
function (isUserCalculation, bsBonds) {
if (!isUserCalculation) this.bsAromatic =  new JU.BS ();
this.bsAromaticSingle =  new JU.BS ();
this.bsAromaticDouble =  new JU.BS ();
var isAll = (bsBonds == null);
var i0 = (isAll ? this.bondCount - 1 : bsBonds.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsBonds.nextSetBit (i + 1))) {
var bond = this.bo[i];
if (this.bsAromatic.get (i)) bond.setOrder (515);
switch (bond.order & -131073) {
case 515:
if (!this.assignAromaticMustBeSingle (bond.atom1) && !this.assignAromaticMustBeSingle (bond.atom2)) {
this.bsAromatic.set (i);
break;
}bond.order = 513;
case 513:
this.bsAromaticSingle.set (i);
break;
case 514:
this.bsAromaticDouble.set (i);
break;
}
}
var bond;
isAll = (bsBonds == null);
i0 = (isAll ? this.bondCount - 1 : bsBonds.nextSetBit (0));
var bsTest =  new JU.BS ();
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsBonds.nextSetBit (i + 1))) {
bond = this.bo[i];
if (!bond.is (515) || this.bsAromaticDouble.get (i) || this.bsAromaticSingle.get (i)) continue;
bsTest.set (i);
if (bond.atom1.getElementNumber () == 8 || bond.atom2.getElementNumber () == 8) {
if (!this.assignAromaticDouble (bond)) this.assignAromaticSingle (bond);
} else {
bsTest.set (i);
}}
for (var i = bsTest.nextSetBit (0); i >= 0; i = bsTest.nextSetBit (i + 1)) if (!this.assignAromaticDouble (bond = this.bo[i])) this.assignAromaticSingle (bond);

var bsModels =  new JU.BS ();
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsBonds.nextSetBit (i + 1))) {
bond = this.bo[i];
if (this.bsAromaticDouble.get (i)) {
if (!bond.is (514)) {
this.bsAromatic.set (i);
bsModels.set (bond.atom1.mi);
bond.setOrder (514);
}} else if (this.bsAromaticSingle.get (i) || bond.isAromatic ()) {
if (!bond.is (513)) {
this.bsAromatic.set (i);
bond.setOrder (513);
}}}
var models = (this).am;
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (models[i].isBioModel) models[i].isPdbWithMultipleBonds = true;

this.assignAromaticNandO (bsBonds);
this.bsAromaticSingle = null;
this.bsAromaticDouble = null;
}, "~B,JU.BS");
Clazz.defineMethod (c$, "assignAromaticDouble", 
 function (bond) {
var bondIndex = bond.index;
if (this.bsAromaticSingle.get (bondIndex)) return false;
if (this.bsAromaticDouble.get (bondIndex)) return true;
this.bsAromaticDouble.set (bondIndex);
if (!this.assignAromaticSingleForAtom (bond.atom1, bondIndex) || !this.assignAromaticSingleForAtom (bond.atom2, bondIndex)) {
this.bsAromaticDouble.clear (bondIndex);
return false;
}return true;
}, "JM.Bond");
Clazz.defineMethod (c$, "assignAromaticSingle", 
 function (bond) {
var bondIndex = bond.index;
if (this.bsAromaticDouble.get (bondIndex)) return false;
if (this.bsAromaticSingle.get (bondIndex)) return true;
this.bsAromaticSingle.set (bondIndex);
if (!this.assignAromaticDoubleForAtom (bond.atom1) || !this.assignAromaticDoubleForAtom (bond.atom2)) {
this.bsAromaticSingle.clear (bondIndex);
return false;
}return true;
}, "JM.Bond");
Clazz.defineMethod (c$, "assignAromaticSingleForAtom", 
 function (atom, notBondIndex) {
var bonds = atom.bonds;
if (bonds == null) return false;
for (var i = bonds.length; --i >= 0; ) {
var bond = bonds[i];
var bondIndex = bond.index;
if (bondIndex == notBondIndex || !bond.isAromatic () || this.bsAromaticSingle.get (bondIndex)) continue;
if (this.bsAromaticDouble.get (bondIndex) || !this.assignAromaticSingle (bond)) {
return false;
}}
return true;
}, "JM.Atom,~N");
Clazz.defineMethod (c$, "assignAromaticDoubleForAtom", 
 function (atom) {
var bonds = atom.bonds;
if (bonds == null) return false;
var haveDouble = false;
var lastBond = -1;
for (var i = bonds.length; --i >= 0; ) {
if (this.bsAromaticDouble.get (bonds[i].index)) haveDouble = true;
if (bonds[i].isAromatic ()) lastBond = i;
}
for (var i = bonds.length; --i >= 0; ) {
var bond = bonds[i];
var bondIndex = bond.index;
if (!bond.isAromatic () || this.bsAromaticDouble.get (bondIndex) || this.bsAromaticSingle.get (bondIndex)) continue;
if (!haveDouble && this.assignAromaticDouble (bond)) haveDouble = true;
 else if ((haveDouble || i < lastBond) && !this.assignAromaticSingle (bond)) {
return false;
}}
return haveDouble;
}, "JM.Atom");
Clazz.defineMethod (c$, "allowAromaticBond", 
function (b) {
if (this.assignAromaticMustBeSingle (b.atom1) || this.assignAromaticMustBeSingle (b.atom2)) return false;
switch (b.getCovalentOrder ()) {
case 1:
case 2:
return b.atom1.getCovalentBondCount () <= 3 && b.atom2.getCovalentBondCount () <= 3;
default:
return false;
}
}, "JM.Bond");
Clazz.defineMethod (c$, "assignAromaticMustBeSingle", 
 function (atom) {
var n = atom.getElementNumber ();
switch (n) {
case 6:
case 7:
case 8:
case 16:
break;
default:
return true;
}
var nAtoms = atom.getValence ();
switch (n) {
case 6:
return (nAtoms == 4);
case 7:
return (atom.group.getNitrogenAtom () === atom || nAtoms == 3 && atom.getFormalCharge () < 1);
case 8:
return (atom.group.getCarbonylOxygenAtom () !== atom && nAtoms == 2 && atom.getFormalCharge () < 1);
case 16:
return (atom.group.groupID == 5 || nAtoms == 2 && atom.getFormalCharge () < 1);
}
return false;
}, "JM.Atom");
Clazz.defineMethod (c$, "assignAromaticNandO", 
 function (bsSelected) {
var bond;
var isAll = (bsSelected == null);
var i0 = (isAll ? this.bondCount - 1 : bsSelected.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsSelected.nextSetBit (i + 1))) {
bond = this.bo[i];
if (!bond.is (513)) continue;
var atom1;
var atom2 = bond.atom2;
var n1;
var n2 = atom2.getElementNumber ();
if (n2 == 7 || n2 == 8) {
n1 = n2;
atom1 = atom2;
atom2 = bond.atom1;
n2 = atom2.getElementNumber ();
} else {
atom1 = bond.atom1;
n1 = atom1.getElementNumber ();
}if (n1 != 7 && n1 != 8) continue;
var valence = atom1.getValence ();
if (valence < 0) continue;
var bondorder = atom1.getCovalentBondCount ();
var charge = atom1.getFormalCharge ();
switch (n1) {
case 7:
if (valence == 3 && bondorder == 3 && charge < 1 && n2 == 6 && atom2.getValence () == 3) bond.setOrder (514);
break;
case 8:
if (valence == 1 && charge == 0 && (n2 == 14 || n2 == 16)) bond.setOrder (514);
break;
}
}
}, "JU.BS");
Clazz.defineMethod (c$, "getAtomBitsMDb", 
function (tokType, specInfo) {
var bs =  new JU.BS ();
switch (tokType) {
default:
return this.getAtomBitsMDa (tokType, specInfo, bs);
case 1677721602:
var bsBonds = specInfo;
for (var i = bsBonds.nextSetBit (0); i >= 0; i = bsBonds.nextSetBit (i + 1)) {
bs.set (this.bo[i].atom1.i);
bs.set (this.bo[i].atom2.i);
}
return bs;
case 1073742331:
for (var i = this.bondCount; --i >= 0; ) if (this.bo[i].isAromatic ()) {
bs.set (this.bo[i].atom1.i);
bs.set (this.bo[i].atom2.i);
}
return bs;
}
}, "~N,~O");
Clazz.defineMethod (c$, "assignBond", 
function (bondIndex, type) {
var bondOrder = type.charCodeAt (0) - 48;
var bond = this.bo[bondIndex];
(this).clearDB (bond.atom1.i);
switch (type) {
case '0':
case '1':
case '2':
case '3':
break;
case 'p':
case 'm':
bondOrder = JU.Edge.getBondOrderNumberFromOrder (bond.getCovalentOrder ()).charCodeAt (0) - 48 + (type == 'p' ? 1 : -1);
if (bondOrder > 3) bondOrder = 1;
 else if (bondOrder < 0) bondOrder = 3;
break;
default:
return null;
}
var bsAtoms =  new JU.BS ();
try {
if (bondOrder == 0) {
var bs =  new JU.BS ();
bs.set (bond.index);
bsAtoms.set (bond.atom1.i);
bsAtoms.set (bond.atom2.i);
this.dBm (bs, false);
return bsAtoms;
}bond.setOrder (bondOrder | 131072);
if (bond.atom1.getElementNumber () != 1 && bond.atom2.getElementNumber () != 1) {
this.removeUnnecessaryBonds (bond.atom1, false);
this.removeUnnecessaryBonds (bond.atom2, false);
}bsAtoms.set (bond.atom1.i);
bsAtoms.set (bond.atom2.i);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Exception in seBondOrder: " + e.toString ());
} else {
throw e;
}
}
return bsAtoms;
}, "~N,~S");
Clazz.defineMethod (c$, "removeUnnecessaryBonds", 
function (atom, deleteAtom) {
var bs =  new JU.BS ();
var bsBonds =  new JU.BS ();
var bonds = atom.bonds;
if (bonds == null) return;
for (var i = 0; i < bonds.length; i++) if (bonds[i].isCovalent ()) {
var atom2 = bonds[i].getOtherAtom (atom);
if (atom2.getElementNumber () == 1) bs.set (bonds[i].getOtherAtom (atom).i);
} else {
bsBonds.set (bonds[i].index);
}
if (bsBonds.nextSetBit (0) >= 0) this.dBm (bsBonds, false);
if (deleteAtom) bs.set (atom.i);
if (bs.nextSetBit (0) >= 0) this.vwr.deleteAtoms (bs, false);
}, "JM.Atom,~B");
Clazz.defineMethod (c$, "displayBonds", 
function (bs, isDisplay) {
if (!isDisplay) this.haveHiddenBonds = true;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) if (i < this.bondCount && this.bo[i].mad != 0) this.bo[i].setShapeVisibility (isDisplay);

}, "JM.BondSet,~B");
Clazz.defineMethod (c$, "getAtomsConnected", 
function (min, max, intType, bs) {
var isBonds = Clazz.instanceOf (bs, JM.BondSet);
var bsResult = (isBonds ?  new JM.BondSet () :  new JU.BS ());
var nBonded =  Clazz.newIntArray (this.ac, 0);
var i;
var ishbond = (intType == 30720);
var isall = (intType == 65535);
for (var ibond = 0; ibond < this.bondCount; ibond++) {
var bond = this.bo[ibond];
if (isall || bond.is (intType) || ishbond && bond.isHydrogen ()) {
if (isBonds) {
bsResult.set (ibond);
} else {
if (bs.get (bond.atom1.i)) {
nBonded[i = bond.atom2.i]++;
bsResult.set (i);
}if (bs.get (bond.atom2.i)) {
nBonded[i = bond.atom1.i]++;
bsResult.set (i);
}}}}
if (isBonds) return bsResult;
var nonbonded = (min == 0);
for (i = this.ac; --i >= 0; ) {
var n = nBonded[i];
if (n < min || n > max) bsResult.clear (i);
 else if (nonbonded && n == 0) bsResult.set (i);
}
return bsResult;
}, "~N,~N,~N,JU.BS");
Clazz.defineStatics (c$,
"BOND_GROWTH_INCREMENT", 250,
"MAX_BONDS_LENGTH_TO_CACHE", 5,
"MAX_NUM_TO_CACHE", 200);
});
