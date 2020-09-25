Clazz.declarePackage ("J.shapespecial");
Clazz.load (null, "J.shapespecial.Dipole", ["JU.P3", "$.SB", "$.V3", "JU.C", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.thisID = "";
this.mad = 0;
this.colix = 0;
this.type = 0;
this.origin = null;
this.center = null;
this.vector = null;
this.dipoleInfo = "";
this.dipoleValue = 0;
this.isUserValue = false;
this.offsetSide = 0;
this.offsetAngstroms = 0;
this.offsetPt = null;
this.offsetPercent = 0;
this.visibilityFlags = 0;
this.modelIndex = 0;
this.visible = false;
this.noCross = false;
this.haveAtoms = false;
this.isValid = false;
this.atoms = null;
this.coords = null;
this.bond = null;
this.bsMolecule = null;
this.lstDipoles = null;
Clazz.instantialize (this, arguments);
}, J.shapespecial, "Dipole");
Clazz.prepareFields (c$, function () {
this.atoms =  new Array (2);
this.coords =  new Array (2);
});
Clazz.defineMethod (c$, "init", 
function (modelIndex, thisID, dipoleInfo, colix, mad, visible) {
this.modelIndex = modelIndex;
this.thisID = thisID;
this.dipoleInfo = dipoleInfo;
this.colix = colix;
this.mad = mad;
this.visible = visible;
this.type = 0;
return this;
}, "~N,~S,~S,~N,~N,~B");
Clazz.defineMethod (c$, "setTranslucent", 
function (isTranslucent, translucentLevel) {
this.colix = JU.C.getColixTranslucent3 (this.colix, isTranslucent, translucentLevel);
}, "~B,~N");
Clazz.defineMethod (c$, "set", 
function (d) {
this.thisID = d.thisID;
this.dipoleInfo = d.dipoleInfo;
this.dipoleValue = d.dipoleValue;
this.mad = d.mad;
this.lstDipoles = d.lstDipoles;
if (this.lstDipoles != null) this.isValid = true;
this.offsetAngstroms = d.offsetAngstroms;
this.offsetPercent = d.offsetPercent;
this.offsetSide = d.offsetSide;
this.vector = JU.V3.newV (d.vector);
this.origin = JU.P3.newP (d.origin);
if (d.offsetPt != null) {
this.origin.add (d.offsetPt);
this.offsetPt = JU.P3.newP (d.offsetPt);
}this.bsMolecule = d.bsMolecule;
this.haveAtoms = (d.atoms[0] != null);
if (this.haveAtoms) {
this.atoms[0] = d.atoms[0];
this.atoms[1] = d.atoms[1];
this.centerDipole ();
} else {
this.center = null;
}}, "J.shapespecial.Dipole");
Clazz.defineMethod (c$, "set2", 
 function (pt1, pt2) {
this.coords[0] = JU.P3.newP (pt1);
this.coords[1] = JU.P3.newP (pt2);
this.isValid = (this.coords[0].distance (this.coords[1]) > 0.1);
if (this.dipoleValue < 0) {
this.origin = JU.P3.newP (pt2);
this.vector = JU.V3.newV (pt1);
this.dipoleValue = -this.dipoleValue;
} else {
this.origin = JU.P3.newP (pt1);
this.vector = JU.V3.newV (pt2);
}this.dipoleInfo = "" + this.origin + this.vector;
this.vector.sub (this.origin);
if (this.dipoleValue == 0) this.dipoleValue = this.vector.length ();
 else this.vector.scale (this.dipoleValue / this.vector.length ());
this.type = 1;
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "setValue", 
function (value) {
var d = this.dipoleValue;
this.dipoleValue = value;
if (value == 0) this.isValid = false;
if (this.vector == null) return;
this.vector.scale (this.dipoleValue / this.vector.length ());
if (d * this.dipoleValue < 0) this.origin.sub (this.vector);
}, "~N");
Clazz.defineMethod (c$, "set2Value", 
function (pt1, pt2, value) {
this.dipoleValue = value;
this.atoms[0] = null;
this.set2 (pt1, pt2);
}, "JU.P3,JU.P3,~N");
Clazz.defineMethod (c$, "setPtVector", 
function (pt1, dipole) {
this.setValue (dipole.length ());
var pt2 = JU.P3.newP (pt1);
pt2.add (dipole);
this.set2 (pt1, pt2);
this.type = 5;
}, "JU.P3,JU.V3");
Clazz.defineMethod (c$, "set2AtomValue", 
function (atom1, atom2, value) {
this.setValue (value);
this.set2 (atom1, atom2);
this.offsetSide = 0.4;
this.mad = 10;
this.atoms[0] = atom1;
this.atoms[1] = atom2;
this.haveAtoms = true;
this.centerDipole ();
}, "JM.Atom,JM.Atom,~N");
Clazz.defineMethod (c$, "centerDipole", 
function () {
this.isValid = (this.atoms[0] !== this.atoms[1] && this.dipoleValue != 0);
if (!this.isValid) return;
var f = this.atoms[0].distance (this.atoms[1]) / (2 * this.dipoleValue) - 0.5;
this.origin.scaleAdd2 (f, this.vector, this.atoms[0]);
this.center =  new JU.P3 ();
this.center.scaleAdd2 (0.5, this.vector, this.origin);
this.bond = this.atoms[0].getBond (this.atoms[1]);
this.type = (this.bond == null ? 2 : 3);
});
Clazz.defineMethod (c$, "isBondType", 
function () {
return (this.type == 2 || this.type == 3);
});
Clazz.defineMethod (c$, "getShapeState", 
function () {
if (!this.isValid) return "";
var s =  new JU.SB ();
s.append ("dipole ID ").append (this.thisID);
if (this.lstDipoles != null) s.append (" all ").append (JU.Escape.eBS (this.bsMolecule));
 else if (this.haveAtoms) s.append (" ({").appendI (this.atoms[0].i).append ("}) ({").appendI (this.atoms[1].i).append ("})");
 else if (this.coords[0] == null) return "";
 else s.append (" ").append (JU.Escape.eP (this.coords[0])).append (" ").append (JU.Escape.eP (this.coords[1]));
if (this.isUserValue) s.append (" value ").appendF (this.dipoleValue);
if (this.mad != 10) s.append (" width ").appendF (this.mad / 1000);
if (this.offsetAngstroms != 0) s.append (" offset ").appendF (this.offsetAngstroms);
 else if (this.offsetPercent != 0) s.append (" offset ").appendI (this.offsetPercent);
if (this.offsetSide != 0.4) s.append (" offsetSide ").appendF (this.offsetSide);
if (this.offsetPt != null) s.append (" offset ").append (JU.Escape.eP (this.offsetPt));
if (this.noCross) s.append (" nocross");
if (!this.visible) s.append (" off");
s.append (";\n");
return s.toString ();
});
Clazz.defineMethod (c$, "setOffsetPt", 
function (pt) {
if (this.offsetPt != null) this.origin.sub (this.offsetPt);
this.offsetPt = pt;
this.origin.add (pt);
}, "JU.P3");
Clazz.defineStatics (c$,
"DIPOLE_TYPE_UNKNOWN", 0,
"DIPOLE_TYPE_POINTS", 1,
"DIPOLE_TYPE_ATOMS", 2,
"DIPOLE_TYPE_BOND", 3,
"DIPOLE_TYPE_MOLECULAR", 4,
"DIPOLE_TYPE_POINTVECTOR", 5);
});
