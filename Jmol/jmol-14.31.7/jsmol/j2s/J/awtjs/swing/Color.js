Clazz.declarePackage ("JS");
Clazz.load (["javajs.api.GenericColor"], "JS.Color", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.argb = 0;
Clazz.instantialize (this, arguments);
}, JS, "Color", null, javajs.api.GenericColor);
Clazz.overrideMethod (c$, "getRGB", 
function () {
return this.argb & 0x00FFFFFF;
});
Clazz.overrideMethod (c$, "getOpacity255", 
function () {
return ((this.argb >> 24) & 0xFF);
});
Clazz.overrideMethod (c$, "setOpacity255", 
function (a) {
this.argb = this.argb & 0xFFFFFF | ((a & 0xFF) << 24);
}, "~N");
c$.get1 = Clazz.defineMethod (c$, "get1", 
function (rgb) {
var c =  new JS.Color ();
c.argb = rgb | 0xFF000000;
return c;
}, "~N");
c$.get3 = Clazz.defineMethod (c$, "get3", 
function (r, g, b) {
return  new JS.Color ().set4 (r, g, b, 0xFF);
}, "~N,~N,~N");
c$.get4 = Clazz.defineMethod (c$, "get4", 
function (r, g, b, a) {
return  new JS.Color ().set4 (r, g, b, a);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "set4", 
 function (r, g, b, a) {
this.argb = ((a << 24) | (r << 16) | (g << 8) | b) & 0xFFFFFFFF;
return this;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
var s = ("00000000" + Integer.toHexString (this.argb));
return "[0x" + s.substring (s.length - 8, s.length) + "]";
});
});
