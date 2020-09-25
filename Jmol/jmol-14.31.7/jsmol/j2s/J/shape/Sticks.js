Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.Shape", "JU.P3i"], "J.shape.Sticks", ["java.util.Hashtable", "JU.BS", "$.P3", "J.c.PAL", "JU.BSUtil", "$.C", "$.Edge", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.myMask = 0;
this.reportAll = false;
this.bsOrderSet = null;
this.selectedBonds = null;
this.closestAtom = null;
this.ptXY = null;
Clazz.instantialize (this, arguments);
}, J.shape, "Sticks", J.shape.Shape);
Clazz.prepareFields (c$, function () {
this.closestAtom =  Clazz.newIntArray (1, 0);
this.ptXY =  new JU.P3i ();
});
Clazz.overrideMethod (c$, "initShape", 
function () {
this.myMask = 1023;
this.reportAll = false;
});
Clazz.overrideMethod (c$, "setSize", 
function (size, bsSelected) {
if (size == 2147483647) {
this.selectedBonds = JU.BSUtil.copy (bsSelected);
return;
}if (size == -2147483648) {
if (this.bsOrderSet == null) this.bsOrderSet =  new JU.BS ();
this.bsOrderSet.or (bsSelected);
return;
}if (this.bsSizeSet == null) this.bsSizeSet =  new JU.BS ();
var iter = (this.selectedBonds != null ? this.ms.getBondIterator (this.selectedBonds) : this.ms.getBondIteratorForType (this.myMask, bsSelected));
var mad = size;
while (iter.hasNext ()) {
this.bsSizeSet.set (iter.nextIndex ());
iter.next ().setMad (mad);
}
}, "~N,JU.BS");
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("type" === propertyName) {
this.myMask = (value).intValue ();
return;
}if ("reportAll" === propertyName) {
this.reportAll = true;
return;
}if ("reset" === propertyName) {
this.bsOrderSet = null;
this.bsSizeSet = null;
this.bsColixSet = null;
this.selectedBonds = null;
return;
}if ("bondOrder" === propertyName) {
if (this.bsOrderSet == null) this.bsOrderSet =  new JU.BS ();
var order = (value).intValue ();
var iter = (this.selectedBonds != null ? this.ms.getBondIterator (this.selectedBonds) : this.ms.getBondIteratorForType (65535, bs));
while (iter.hasNext ()) {
this.bsOrderSet.set (iter.nextIndex ());
iter.next ().setOrder (order);
}
return;
}if ("color" === propertyName) {
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
var colix = JU.C.getColixO (value);
var pal = (Clazz.instanceOf (value, J.c.PAL) ? value : null);
if (pal === J.c.PAL.TYPE || pal === J.c.PAL.ENERGY) {
var isEnergy = (pal === J.c.PAL.ENERGY);
var iter = (this.selectedBonds != null ? this.ms.getBondIterator (this.selectedBonds) : this.ms.getBondIteratorForType (this.myMask, bs));
while (iter.hasNext ()) {
this.bsColixSet.set (iter.nextIndex ());
var bond = iter.next ();
bond.colix = (isEnergy ? this.getColixB (colix, pal.id, bond) : JU.C.getColix (JU.Edge.getArgbHbondType (bond.order)));
}
return;
}if (colix == 2 && pal !== J.c.PAL.CPK) return;
var iter = (this.selectedBonds != null ? this.ms.getBondIterator (this.selectedBonds) : this.ms.getBondIteratorForType (this.myMask, bs));
while (iter.hasNext ()) {
var iBond = iter.nextIndex ();
iter.next ().colix = colix;
this.bsColixSet.setBitTo (iBond, (colix != 0 && colix != 2));
}
return;
}if ("translucency" === propertyName) {
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
var isTranslucent = ((value).equals ("translucent"));
var iter = (this.selectedBonds != null ? this.ms.getBondIterator (this.selectedBonds) : this.ms.getBondIteratorForType (this.myMask, bs));
while (iter.hasNext ()) {
this.bsColixSet.set (iter.nextIndex ());
iter.next ().setTranslucent (isTranslucent, this.translucentLevel);
}
return;
}if ("deleteModelAtoms" === propertyName) {
return;
}this.setPropS (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
if (property.equals ("selectionState")) return (this.selectedBonds != null ? "select BONDS " + JU.Escape.eBS (this.selectedBonds) + "\n" : "");
if (property.equals ("sets")) return  Clazz.newArray (-1, [this.bsOrderSet, this.bsSizeSet, this.bsColixSet]);
return null;
}, "~S,~N");
Clazz.overrideMethod (c$, "setAtomClickability", 
function () {
var bonds = this.ms.bo;
for (var i = this.ms.bondCount; --i >= 0; ) {
var bond = bonds[i];
if ((bond.shapeVisibilityFlags & this.vf) == 0 || this.ms.isAtomHidden (bond.atom1.i) || this.ms.isAtomHidden (bond.atom2.i)) continue;
bond.atom1.setClickable (this.vf);
bond.atom2.setClickable (this.vf);
}
});
Clazz.overrideMethod (c$, "getShapeState", 
function () {
return null;
});
Clazz.overrideMethod (c$, "checkObjectHovered", 
function (x, y, bsVisible) {
var pt =  new JU.P3 ();
var bond = this.findPickedBond (x, y, bsVisible, pt, this.closestAtom);
if (bond == null) return false;
this.vwr.highlightBond (bond.index, this.closestAtom[0], x, y);
return true;
}, "~N,~N,JU.BS");
Clazz.overrideMethod (c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible, drawPicking) {
var pt =  new JU.P3 ();
var bond = this.findPickedBond (x, y, bsVisible, pt, this.closestAtom);
if (bond == null) return null;
var modelIndex = bond.atom1.mi;
var info = bond.getIdentity ();
var map =  new java.util.Hashtable ();
map.put ("pt", pt);
map.put ("index", Integer.$valueOf (bond.index));
map.put ("modelIndex", Integer.$valueOf (modelIndex));
map.put ("model", this.vwr.getModelNumberDotted (modelIndex));
map.put ("type", "bond");
map.put ("info", info);
this.vwr.setStatusAtomPicked (-3, "[\"bond\",\"" + bond.getIdentity () + "\"," + pt.x + "," + pt.y + "," + pt.z + "]", map, false);
return map;
}, "~N,~N,~N,JU.BS,~B");
Clazz.defineMethod (c$, "findPickedBond", 
 function (x, y, bsVisible, pt, closestAtom) {
var dmin2 = 100;
if (this.vwr.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
dmin2 <<= 1;
}var pickedBond = null;
var v =  new JU.P3 ();
var bonds = this.ms.bo;
for (var i = this.ms.bondCount; --i >= 0; ) {
var bond = bonds[i];
if (bond.shapeVisibilityFlags == 0) continue;
var atom1 = bond.atom1;
var atom2 = bond.atom2;
if (!atom1.checkVisible () || !atom2.checkVisible ()) continue;
v.ave (atom1, atom2);
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0 && Math.abs (atom1.sY - atom2.sY) + Math.abs (atom1.sX - atom2.sX) > 40) {
var f = 1 * (this.ptXY.x - atom1.sX) / (atom2.sX - atom1.sX);
if (f < 0.4 || f > 0.6) continue;
dmin2 = d2;
pickedBond = bond;
if (closestAtom != null) closestAtom[0] = (f < 0.5 ? atom1.i : atom2.i);
pt.setT (v);
}}
return pickedBond;
}, "~N,~N,JU.BS,JU.P3,~A");
Clazz.defineStatics (c$,
"MAX_BOND_CLICK_DISTANCE_SQUARED", 100,
"XY_THREASHOLD", 40);
});
