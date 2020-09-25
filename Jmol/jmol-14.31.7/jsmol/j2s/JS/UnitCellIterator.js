Clazz.declarePackage ("JS");
Clazz.load (["J.api.AtomIndexIterator"], "JS.UnitCellIterator", ["JU.Lst", "$.P3", "$.P3i", "JU.BoxInfo", "$.Logger", "$.Point3fi"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atoms = null;
this.center = null;
this.translation = null;
this.nFound = 0;
this.maxDistance2 = 0;
this.distance2 = 0;
this.unitCell = null;
this.minXYZ = null;
this.maxXYZ = null;
this.t = null;
this.p = null;
this.ipt = -2147483648;
this.unitList = null;
this.done = false;
this.nAtoms = 0;
this.listPt = 0;
Clazz.instantialize (this, arguments);
}, JS, "UnitCellIterator", null, J.api.AtomIndexIterator);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (unitCell, atom, atoms, bsAtoms, distance) {
this.unitCell = unitCell;
this.atoms = atoms;
this.addAtoms (bsAtoms);
this.p =  new JU.P3 ();
if (distance > 0) this.setCenter (atom, distance);
return this;
}, "J.api.SymmetryInterface,JM.Atom,~A,JU.BS,~N");
Clazz.overrideMethod (c$, "setModel", 
function (modelSet, modelIndex, zeroBase, atomIndex, center, distance, rd) {
}, "JM.ModelSet,~N,~N,~N,JU.T3,~N,J.atomdata.RadiusData");
Clazz.overrideMethod (c$, "setCenter", 
function (center, distance) {
if (distance == 0) return;
this.maxDistance2 = distance * distance;
this.center = center;
this.translation =  new JU.P3 ();
var pts = JU.BoxInfo.unitCubePoints;
var min = JU.P3.new3 (3.4028235E38, 3.4028235E38, 3.4028235E38);
var max = JU.P3.new3 (-3.4028235E38, -3.4028235E38, -3.4028235E38);
this.p =  new JU.P3 ();
var ptC =  new JU.P3 ();
ptC.setT (center);
this.unitCell.toFractional (ptC, true);
for (var i = 0; i < 8; i++) {
this.p.scaleAdd2 (-2.0, pts[i], pts[7]);
this.p.scaleAdd2 (distance, this.p, center);
this.unitCell.toFractional (this.p, true);
if (min.x > this.p.x) min.x = this.p.x;
if (max.x < this.p.x) max.x = this.p.x;
if (min.y > this.p.y) min.y = this.p.y;
if (max.y < this.p.y) max.y = this.p.y;
if (min.z > this.p.z) min.z = this.p.z;
if (max.z < this.p.z) max.z = this.p.z;
}
this.minXYZ = JU.P3i.new3 (Clazz.doubleToInt (Math.floor (min.x)), Clazz.doubleToInt (Math.floor (min.y)), Clazz.doubleToInt (Math.floor (min.z)));
this.maxXYZ = JU.P3i.new3 (Clazz.doubleToInt (Math.ceil (max.x)), Clazz.doubleToInt (Math.ceil (max.y)), Clazz.doubleToInt (Math.ceil (max.z)));
if (JU.Logger.debugging) JU.Logger.info ("UnitCellIterator minxyz/maxxyz " + this.minXYZ + " " + this.maxXYZ);
this.t = JU.P3i.new3 (this.minXYZ.x - 1, this.minXYZ.y, this.minXYZ.z);
this.nextCell ();
}, "JU.T3,~N");
Clazz.overrideMethod (c$, "addAtoms", 
function (bsAtoms) {
this.done = (bsAtoms == null);
if (this.done) return;
this.unitList =  new JU.Lst ();
var cat = "";
var ops = this.unitCell.getSymmetryOperations ();
var nOps = ops.length;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var a = this.atoms[i];
for (var j = 0; j < nOps; j++) {
var pt =  new JU.P3 ();
pt.setT (a);
if (j > 0) {
this.unitCell.toFractional (pt, false);
ops[j].rotTrans (pt);
this.unitCell.unitize (pt);
this.unitCell.toCartesian (pt, false);
} else {
this.unitCell.toUnitCell (pt, null);
}var key = "_" + Clazz.floatToInt (pt.x * 100) + "_" + Clazz.floatToInt (pt.y * 100) + "_" + Clazz.floatToInt (pt.z * 100) + "_";
if (cat.indexOf (key) >= 0) continue;
cat += key;
this.unitList.addLast ( Clazz.newArray (-1, [a, pt]));
}
}
this.nAtoms = this.unitList.size ();
this.done = (this.nAtoms == 0);
if (JU.Logger.debugging) JU.Logger.info ("UnitCellIterator " + this.nAtoms + " unique points found");
}, "JU.BS");
Clazz.overrideMethod (c$, "hasNext", 
function () {
while ((this.ipt < this.nAtoms || this.nextCell ())) {
this.p.add2 (this.unitList.get (this.listPt = this.ipt++)[1], this.translation);
if ((this.distance2 = this.p.distanceSquared (this.center)) < this.maxDistance2 && this.distance2 > 0.1) {
this.nFound++;
return true;
}}
return false;
});
Clazz.defineMethod (c$, "nextCell", 
 function () {
if (this.done) return false;
if (++this.t.x >= this.maxXYZ.x) {
this.t.x = this.minXYZ.x;
if (++this.t.y >= this.maxXYZ.y) {
this.t.y = this.minXYZ.y;
if (++this.t.z >= this.maxXYZ.z) {
this.done = true;
this.ipt = this.nAtoms;
return false;
}}}this.translation.set (this.t.x, this.t.y, this.t.z);
this.unitCell.toCartesian (this.translation, false);
this.ipt = 0;
return true;
});
Clazz.overrideMethod (c$, "next", 
function () {
return (this.done || this.ipt < 0 ? -1 : this.getAtom ().i);
});
Clazz.defineMethod (c$, "getAtom", 
 function () {
return (this.unitList.get (this.listPt)[0]);
});
Clazz.overrideMethod (c$, "foundDistance2", 
function () {
return (this.nFound > 0 ? this.distance2 : 3.4028235E38);
});
Clazz.overrideMethod (c$, "getPosition", 
function () {
var a = this.getAtom ();
if (JU.Logger.debugging) JU.Logger.info ("draw ID p_" + this.nFound + " " + this.p + " //" + a + " " + this.t);
if (this.p.distanceSquared (a) < 0.0001) return a;
var p =  new JU.Point3fi ();
p.setT (this.p);
p.i = a.i;
p.sD = a.getElementNumber ();
return p;
});
Clazz.overrideMethod (c$, "release", 
function () {
this.atoms = null;
this.center = null;
this.translation = null;
});
});
