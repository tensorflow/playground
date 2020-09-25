Clazz.declarePackage ("J.g3d");
Clazz.load (["JU.P3i"], "J.g3d.TextString", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.text = null;
this.font = null;
this.argb = 0;
this.bgargb = 0;
Clazz.instantialize (this, arguments);
}, J.g3d, "TextString", JU.P3i, java.util.Comparator);
Clazz.defineMethod (c$, "setText", 
function (text, font, argb, bgargb, x, y, z) {
this.text = text;
this.font = font;
this.argb = argb;
this.bgargb = bgargb;
this.x = x;
this.y = y;
this.z = z;
}, "~S,JU.Font,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (a == null || b == null ? 0 : a.z > b.z ? -1 : a.z < b.z ? 1 : 0);
}, "J.g3d.TextString,J.g3d.TextString");
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, J.g3d.TextString, "toString", []) + " " + this.text;
});
});
