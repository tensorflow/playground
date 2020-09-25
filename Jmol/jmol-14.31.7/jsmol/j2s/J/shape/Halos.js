Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.AtomShape"], "J.shape.Halos", ["JU.BSUtil", "$.C"], function () {
c$ = Clazz.decorateAsClass (function () {
this.colixSelection = 2;
this.bsHighlight = null;
this.colixHighlight = 10;
Clazz.instantialize (this, arguments);
}, J.shape, "Halos", J.shape.AtomShape);
Clazz.defineMethod (c$, "initState", 
function () {
this.translucentAllowed = false;
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("translucency" === propertyName) return;
if ("argbSelection" === propertyName) {
this.colixSelection = JU.C.getColix ((value).intValue ());
return;
}if ("argbHighlight" === propertyName) {
this.colixHighlight = JU.C.getColix ((value).intValue ());
return;
}if ("highlight" === propertyName) {
this.bsHighlight = value;
return;
}if (propertyName === "deleteModelAtoms") {
JU.BSUtil.deleteBits (this.bsHighlight, bs);
}this.setPropAS (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.overrideMethod (c$, "setModelVisibilityFlags", 
function (bs) {
var bsSelected = (this.vwr.getSelectionHalosEnabled () ? this.vwr.bsA () : null);
for (var i = this.ac; --i >= 0; ) this.atoms[i].setShapeVisibility (this.vf, bsSelected != null && bsSelected.get (i) || this.mads != null && this.mads[i] != 0);

}, "JU.BS");
});
