Clazz.declarePackage ("J.render");
Clazz.load (["J.render.ShapeRenderer"], "J.render.StarsRenderer", ["J.shape.Shape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mar = 0;
this.width = 0;
Clazz.instantialize (this, arguments);
}, J.render, "StarsRenderer", J.render.ShapeRenderer);
Clazz.overrideMethod (c$, "render", 
function () {
var stars = this.shape;
if (stars.mads == null) return false;
var needTranslucent = false;
this.mar = Clazz.floatToInt (this.vwr.getFloat (570425403) * 1000);
if (this.mar == 0 && (this.g3d.isAntialiased () || this.isExport)) this.mar = 50;
var atoms = this.ms.at;
for (var i = this.ms.ac; --i >= 0; ) {
var atom = atoms[i];
if (!this.isVisibleForMe (atom)) continue;
this.colix = J.shape.Shape.getColix (stars.colixes, i, atom);
if (this.g3d.setC (this.colix)) this.render1 (atom, stars.mads[i]);
 else needTranslucent = true;
}
return needTranslucent;
});
Clazz.defineMethod (c$, "render1", 
 function (atom, mad) {
var x = atom.sX;
var y = atom.sY;
var z = atom.sZ;
var d = Clazz.floatToInt (this.vwr.tm.scaleToScreen (z, mad));
d -= (d & 1) ^ 1;
var r = Clazz.doubleToInt (d / 2);
if (r < 1) r = 1;
if (this.mar > 0) {
this.width = Clazz.floatToInt (this.vwr.tm.scaleToScreen (z, this.mar));
if (this.width == 0) this.width = 1;
if (this.width == 1 && this.g3d.isAntialiased ()) this.width = 2;
} else {
this.drawLine (x - r - 1, y + 1, z, x - r - 1 + d, y + 1, z);
this.drawLine (x + 1, y + 1 - r, z, x + 1, y + 1 - r + d, z);
}this.drawLine (x - r, y, z, x - r + d, y, z);
this.drawLine (x, y - r, z, x, y - r + d, z);
this.drawLine (x, y, z - r, x, y, z - r + d);
}, "JM.Atom,~N");
Clazz.defineMethod (c$, "drawLine", 
 function (xA, yA, zA, xB, yB, zB) {
if (this.mar > 0) this.g3d.fillCylinderXYZ (this.colix, this.colix, 2, this.width, xA, yA, zA, xB, yB, zB);
 else this.g3d.drawLineXYZ (xA, yA, zA, xB, yB, zB);
}, "~N,~N,~N,~N,~N,~N");
});
