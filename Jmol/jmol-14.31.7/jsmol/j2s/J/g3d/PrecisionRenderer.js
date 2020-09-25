Clazz.declarePackage ("J.g3d");
c$ = Clazz.decorateAsClass (function () {
this.a = 0;
this.b = 0;
this.isOrthographic = false;
Clazz.instantialize (this, arguments);
}, J.g3d, "PrecisionRenderer");
Clazz.defineMethod (c$, "getZCurrent", 
function (a, b, x) {
return Math.round (a == 1.4E-45 ? b : this.isOrthographic ? a * x + b : a / (b - x));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setRastABFloat", 
function (xa, za, xb, zb) {
var zdif = (zb - za);
var xdif = (xb - xa);
if (zdif == 0 || xdif == 0) {
this.a = 1.4E-45;
this.b = za;
return;
}if (this.isOrthographic) {
this.a = zdif / xdif;
this.b = za - this.a * xa;
} else {
this.a = xdif * za * (zb / zdif);
this.b = (xb * zb - xa * za) / zdif;
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setRastAB", 
function (xa, za, xb, zb) {
var zdif = (zb - za);
var xdif = (xb - xa);
if (xa == 1.4E-45 || zdif == 0 || xdif == 0) {
this.a = 1.4E-45;
this.b = zb;
return;
}if (this.isOrthographic) {
this.a = zdif / xdif;
this.b = za - this.a * xa;
} else {
this.a = xdif * za * (zb / zdif);
this.b = (xb * zb - xa * za) / zdif;
}}, "~N,~N,~N,~N");
