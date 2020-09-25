Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.AtomShape"], "J.shape.Balls", ["JU.BS", "J.c.PAL", "JU.C"], function () {
c$ = Clazz.declareType (J.shape, "Balls", J.shape.AtomShape);
Clazz.overrideMethod (c$, "setSize", 
function (size, bsSelected) {
if (size == 2147483647) {
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new JU.BS ();
this.bsSizeSet.or (bsSelected);
return;
}this.setSize2 (size, bsSelected);
}, "~N,JU.BS");
Clazz.overrideMethod (c$, "setSizeRD", 
function (rd, bsSelected) {
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new JU.BS ();
var bsLength = Math.min (this.atoms.length, bsSelected.length ());
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < bsLength; i = bsSelected.nextSetBit (i + 1)) {
var atom = this.atoms[i];
atom.setMadAtom (this.vwr, rd);
this.bsSizeSet.set (i);
}
}, "J.atomdata.RadiusData,JU.BS");
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("color" === propertyName) {
var colix = JU.C.getColixO (value);
if (colix == 0) colix = 2;
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
var pid = J.c.PAL.pidOf (value);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var atom = this.atoms[i];
atom.colixAtom = this.getColixA (colix, pid, atom);
this.bsColixSet.setBitTo (i, colix != 2 || pid != J.c.PAL.NONE.id);
atom.paletteID = pid;
}
return;
}if ("colorValues" === propertyName) {
var values = value;
if (values.length == 0) return;
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
var n = 0;
var color = null;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (n >= values.length) return;
color = Integer.$valueOf (values[n++]);
var colix = JU.C.getColixO (color);
if (colix == 0) colix = 2;
var pid = J.c.PAL.pidOf (color);
var atom = this.atoms[i];
atom.colixAtom = this.getColixA (colix, pid, atom);
this.bsColixSet.setBitTo (i, colix != 2 || pid != J.c.PAL.NONE.id);
atom.paletteID = pid;
}
return;
}if ("colors" === propertyName) {
var data = value;
var colixes = data[0];
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
var c;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (i >= colixes.length || (c = colixes[i]) == 0) continue;
this.atoms[i].colixAtom = c;
this.atoms[i].paletteID = J.c.PAL.UNKNOWN.id;
this.bsColixSet.set (i);
}
return;
}if ("translucency" === propertyName) {
var isTranslucent = ((value).equals ("translucent"));
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
this.atoms[i].setTranslucent (isTranslucent, this.translucentLevel);
if (isTranslucent) this.bsColixSet.set (i);
}
return;
}if (propertyName.startsWith ("ball")) {
propertyName = propertyName.substring (4).intern ();
}this.setPropAS (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.overrideMethod (c$, "setAtomClickability", 
function () {
var bsDeleted = this.vwr.slm.bsDeleted;
for (var i = this.ac; --i >= 0; ) {
var atom = this.atoms[i];
atom.setClickable (0);
if (bsDeleted != null && bsDeleted.get (i) || (atom.shapeVisibilityFlags & this.vf) == 0 || this.ms.isAtomHidden (i)) continue;
atom.setClickable (this.vf);
}
});
});
