Clazz.declarePackage ("J.renderspecial");
Clazz.load (["J.render.ShapeRenderer", "JU.P3", "$.V3"], "J.renderspecial.DipolesRenderer", ["JU.C"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dipoleVectorScale = 0;
this.offset = null;
this.screens3f = null;
this.points = null;
this.cross0 = null;
this.cross1 = null;
this.diameter = 0;
this.headWidthPixels = 0;
this.crossWidthPixels = 0;
this.offsetSide = 0;
this.colixA = 0;
this.colixB = 0;
this.noCross = false;
Clazz.instantialize (this, arguments);
}, J.renderspecial, "DipolesRenderer", J.render.ShapeRenderer);
Clazz.prepareFields (c$, function () {
this.offset =  new JU.V3 ();
this.screens3f =  new Array (6);
this.points =  new Array (6);
{
for (var i = 0; i < 6; i++) {
this.screens3f[i] =  new JU.P3 ();
this.points[i] =  new JU.P3 ();
}
}this.cross0 =  new JU.P3 ();
this.cross1 =  new JU.P3 ();
});
Clazz.overrideMethod (c$, "render", 
function () {
var dipoles = this.shape;
this.dipoleVectorScale = this.vwr.getFloat (570425355);
var needTranslucent = false;
var vis = this.vwr.ms.getVisibleSet (false);
for (var i = dipoles.dipoleCount; --i >= 0; ) {
var dipole = dipoles.dipoles[i];
if (dipole.visibilityFlags != 0 && (dipole.atoms[0] == null || !this.ms.isAtomHidden (dipole.atoms[0].i)) && (dipole.bsMolecule == null || dipole.bsMolecule.intersects (vis)) && this.renderDipoleVector (dipole, vis)) needTranslucent = true;
}
return needTranslucent;
});
Clazz.defineMethod (c$, "renderDipoleVector", 
 function (dipole, vis) {
this.mad = dipole.mad;
this.offsetSide = dipole.offsetSide;
this.noCross = dipole.noCross;
this.colixA = (dipole.bond == null ? dipole.colix : JU.C.getColixInherited (dipole.colix, dipole.bond.colix));
this.colixB = this.colixA;
if (dipole.atoms[0] != null) {
this.colixA = JU.C.getColixInherited (this.colixA, dipole.atoms[0].colixAtom);
this.colixB = JU.C.getColixInherited (this.colixB, dipole.atoms[1].colixAtom);
}if (this.colixA == 0) this.colixA = 5;
if (this.colixB == 0) this.colixB = 5;
if (this.dipoleVectorScale < 0) {
var c = this.colixA;
this.colixA = this.colixB;
this.colixB = c;
}var factor = dipole.offsetAngstroms / dipole.dipoleValue;
if (dipole.lstDipoles == null) return this.renderVector (dipole.vector, dipole.origin, dipole.center, factor, false);
var needTranslucent = false;
for (var i = dipole.lstDipoles.size (); --i >= 0; ) {
var o = dipole.lstDipoles.get (i);
var v = o[0];
var origin = o[1];
var bsAtoms = o[2];
if (bsAtoms.intersects (vis)) needTranslucent = this.renderVector (v, origin, null, dipole.offsetAngstroms, true);
}
return needTranslucent;
}, "J.shapespecial.Dipole,JU.BS");
Clazz.defineMethod (c$, "renderVector", 
 function (vector, origin, dcenter, factor, isGroup) {
this.offset.setT (vector);
if (dcenter == null) {
if (isGroup) {
this.offset.normalize ();
this.offset.scale (factor);
} else {
this.offset.scale (factor);
if (this.dipoleVectorScale < 0) this.offset.add (vector);
}this.points[0].add2 (origin, this.offset);
} else {
this.offset.scale (-0.5 * this.dipoleVectorScale);
this.points[0].add2 (dcenter, this.offset);
if (factor != 0) {
this.offset.setT (vector);
this.offset.scale (factor);
this.points[0].add (this.offset);
}}this.points[1].scaleAdd2 (this.dipoleVectorScale * 0.1, vector, this.points[0]);
this.points[2].scaleAdd2 (this.dipoleVectorScale * (0.14), vector, this.points[0]);
this.points[3].scaleAdd2 (this.dipoleVectorScale / 2, vector, this.points[0]);
this.points[4].scaleAdd2 (this.dipoleVectorScale * 0.9, vector, this.points[0]);
this.points[5].scaleAdd2 (this.dipoleVectorScale, vector, this.points[0]);
this.offset.setT (this.points[3]);
this.offset.cross (this.offset, vector);
if (this.offset.length () == 0) {
this.offset.set (this.points[3].x + 0.2345, this.points[3].y + 0.1234, this.points[3].z + 0.4321);
this.offset.cross (this.offset, vector);
}this.offset.scale (this.offsetSide / this.offset.length ());
for (var i = 0; i < 6; i++) this.points[i].add (this.offset);

for (var i = 0; i < 6; i++) this.tm.transformPtScrT3 (this.points[i], this.screens3f[i]);

this.tm.transformPt3f (this.points[1], this.cross0);
this.tm.transformPt3f (this.points[2], this.cross1);
var d = this.vwr.tm.scaleToScreen (Clazz.floatToInt (this.screens3f[3].z), this.mad);
this.diameter = Clazz.floatToInt (d);
this.headWidthPixels = Clazz.doubleToInt (Math.floor (d * 2.0));
if (this.headWidthPixels < this.diameter + 5) this.headWidthPixels = this.diameter + 5;
this.crossWidthPixels = this.headWidthPixels;
this.colix = this.colixA;
if (this.colix == this.colixB) {
if (!this.g3d.setC (this.colix)) return true;
this.g3d.fillCylinderBits (2, this.diameter, this.screens3f[0], this.screens3f[4]);
if (!this.noCross) this.g3d.fillCylinderBits (2, this.crossWidthPixels, this.cross0, this.cross1);
this.g3d.fillConeScreen3f (2, this.headWidthPixels, this.screens3f[4], this.screens3f[5], false);
return false;
}var needTranslucent = false;
if (this.g3d.setC (this.colix)) {
this.g3d.fillCylinderBits (2, this.diameter, this.screens3f[0], this.screens3f[3]);
if (!this.noCross) this.g3d.fillCylinderBits (2, this.crossWidthPixels, this.cross0, this.cross1);
} else {
needTranslucent = true;
}this.colix = this.colixB;
if (this.g3d.setC (this.colix)) {
this.g3d.fillCylinderBits (2, this.diameter, this.screens3f[3], this.screens3f[4]);
this.g3d.fillConeScreen3f (2, this.headWidthPixels, this.screens3f[4], this.screens3f[5], false);
} else {
needTranslucent = true;
}return needTranslucent;
}, "JU.V3,JU.P3,JU.P3,~N,~B");
Clazz.defineStatics (c$,
"cylinderBase", 0,
"cross", 1,
"crossEnd", 2,
"center", 3,
"arrowHeadBase", 4,
"arrowHeadTip", 5,
"arrowHeadOffset", 0.9,
"arrowHeadWidthFactor", 2,
"crossOffset", 0.1,
"crossWidth", 0.04);
});
