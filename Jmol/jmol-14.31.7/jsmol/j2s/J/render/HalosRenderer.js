Clazz.declarePackage ("J.render");
Clazz.load (["J.render.ShapeRenderer"], "J.render.HalosRenderer", ["JU.C"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isAntialiased = false;
Clazz.instantialize (this, arguments);
}, J.render, "HalosRenderer", J.render.ShapeRenderer);
Clazz.overrideMethod (c$, "render", 
function () {
var halos = this.shape;
var showOnce = this.vwr.getShowSelectedOnce ();
var selectDisplayTrue = (this.vwr.getSelectionHalosEnabled () || showOnce);
var showHiddenSelections = (selectDisplayTrue && this.vwr.getBoolean (603979920));
if (halos.mads == null && halos.bsHighlight == null && !selectDisplayTrue) return false;
this.isAntialiased = this.g3d.isAntialiased ();
var atoms = this.ms.at;
var bsSelected = (showOnce && this.vwr.movableBitSet != null ? this.vwr.movableBitSet : selectDisplayTrue ? this.vwr.bsA () : null);
var needTranslucent = false;
this.g3d.addRenderer (1073741880);
for (var i = this.ms.ac; --i >= 0; ) {
var atom = atoms[i];
if ((atom.shapeVisibilityFlags & 1) == 0) continue;
var isHidden = this.ms.isAtomHidden (i);
this.mad = (halos.mads == null ? 0 : halos.mads[i]);
this.colix = (halos.colixes == null || i >= halos.colixes.length ? 0 : halos.colixes[i]);
if (selectDisplayTrue && bsSelected.get (i)) {
if (isHidden && !showHiddenSelections) continue;
if (this.mad == 0) this.mad = -1;
if (this.colix == 0) {
if (this.exportType == 1 && !this.g3d.isWebGL ()) continue;
this.colix = halos.colixSelection;
}if (this.colix == 2) this.colix = 23;
 else if (this.colix == 0) this.colix = JU.C.getColixInherited (this.colix, atom.colixAtom);
} else if (isHidden) {
continue;
} else {
this.colix = JU.C.getColixInherited (this.colix, atom.colixAtom);
}if (this.mad != 0) {
if (this.render1 (atom)) needTranslucent = true;
}if (!isHidden && halos.bsHighlight != null && halos.bsHighlight.get (i)) {
this.mad = -2;
this.colix = halos.colixHighlight;
if (this.render1 (atom)) needTranslucent = true;
}}
return needTranslucent;
});
Clazz.defineMethod (c$, "render1", 
function (atom) {
var colixFill = (this.mad == -2 ? 0 : JU.C.getColixTranslucent3 (this.colix, true, 0.5));
var needTranslucent = (this.mad != -2);
if (!this.g3d.setC (this.colix)) {
needTranslucent = true;
this.colix = 0;
if (colixFill == 0 || !this.g3d.setC (colixFill)) return needTranslucent;
}var z = atom.sZ;
var d = this.mad;
if (d < 0) {
d = atom.sD;
if (d == 0) {
var ellipsemax = (atom.isVisible (20) ? atom.getADPMinMax (true) : 0);
if (ellipsemax > 0) d = this.vwr.tm.scaleToScreen (z, Clazz.doubleToInt (Math.floor (ellipsemax * 2000)));
if (d == 0) {
d = Clazz.floatToInt (this.vwr.tm.scaleToScreen (z, this.mad == -2 ? 250 : 500));
}}} else {
d = this.vwr.tm.scaleToScreen (z, this.mad);
}if (this.isAntialiased) d /= 2;
var more = (d / 2);
if (this.mad == -2) more /= 2;
if (more < 8) more = 8;
if (more > 20) more = 20;
d += more;
if (this.isAntialiased) d *= 2;
if (d < 1) return false;
this.g3d.drawFilledCircle (this.colix, colixFill, Clazz.doubleToInt (Math.floor (d)), atom.sX, atom.sY, atom.sZ);
return needTranslucent;
}, "JM.Atom");
});
