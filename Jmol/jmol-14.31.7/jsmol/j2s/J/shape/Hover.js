Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.TextShape"], "J.shape.Hover", ["JU.AU", "JM.Text", "JU.C"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hoverText = null;
this.atomIndex = -1;
this.xy = null;
this.text = null;
this.labelFormat = "%U";
this.atomFormats = null;
this.specialLabel = null;
Clazz.instantialize (this, arguments);
}, J.shape, "Hover", J.shape.TextShape);
Clazz.overrideMethod (c$, "initShape", 
function () {
this.isHover = true;
var font3d = this.vwr.gdata.getFont3DFSS ("SansSerif", "Plain", 12);
var bgcolix = JU.C.getColixS ("#FFFFC3");
var colix = 4;
this.currentObject = this.hoverText = JM.Text.newLabel (this.vwr, font3d, null, colix, bgcolix, 4, 0);
this.hoverText.adjustForWindow = true;
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if ("target" === propertyName) {
if (value == null) this.atomIndex = -1;
 else {
this.atomIndex = (value).intValue ();
}return;
}if ("text" === propertyName) {
this.text = value;
if (this.text != null && this.text.length == 0) this.text = null;
return;
}if ("specialLabel" === propertyName) {
this.specialLabel = value;
return;
}if ("atomLabel" === propertyName) {
var text = value;
if (text != null && text.length == 0) text = null;
var count = this.vwr.ms.ac;
if (this.atomFormats == null || this.atomFormats.length < count) this.atomFormats =  new Array (count);
for (var i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1)) this.atomFormats[i] = text;

return;
}if ("xy" === propertyName) {
this.xy = value;
return;
}if ("label" === propertyName) {
this.labelFormat = value;
if (this.labelFormat != null && this.labelFormat.length == 0) this.labelFormat = null;
return;
}if (propertyName === "deleteModelAtoms") {
if (this.atomFormats != null) {
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
this.atomFormats = JU.AU.deleteElements (this.atomFormats, firstAtomDeleted, nAtomsDeleted);
}this.atomIndex = -1;
return;
}this.setPropTS (propertyName, value, null);
}, "~S,~O,JU.BS");
Clazz.defineStatics (c$,
"FONTFACE", "SansSerif",
"FONTSTYLE", "Plain",
"FONTSIZE", 12);
});
