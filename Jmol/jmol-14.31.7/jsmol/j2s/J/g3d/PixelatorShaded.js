Clazz.declarePackage ("J.g3d");
Clazz.load (["J.g3d.Pixelator"], "J.g3d.PixelatorShaded", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bgRGB = null;
this.tmp = null;
this.zSlab = 0;
this.zDepth = 0;
this.zShadePower = 0;
Clazz.instantialize (this, arguments);
}, J.g3d, "PixelatorShaded", J.g3d.Pixelator);
Clazz.makeConstructor (c$, 
function (g) {
Clazz.superConstructor (this, J.g3d.PixelatorShaded, [g]);
this.tmp =  Clazz.newIntArray (3, 0);
}, "J.g3d.Graphics3D");
Clazz.defineMethod (c$, "set", 
function (zSlab, zDepth, zShadePower) {
this.bgcolor = this.g.bgcolor;
this.bgRGB =  Clazz.newIntArray (-1, [this.bgcolor & 0xFF, (this.bgcolor >> 8) & 0xFF, (this.g.bgcolor >> 16) & 0xFF]);
this.zSlab = zSlab < 0 ? 0 : zSlab;
this.zDepth = zDepth < 0 ? 0 : zDepth;
this.zShadePower = zShadePower;
this.p0 = this.g.pixel0;
return this;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "addPixel", 
function (offset, z, p) {
if (z > this.zDepth) return;
if (z >= this.zSlab && this.zShadePower > 0) {
var t = this.tmp;
var zs = this.bgRGB;
t[0] = p;
t[1] = p >> 8;
t[2] = p >> 16;
var f = (this.zDepth - z) / (this.zDepth - this.zSlab);
if (this.zShadePower > 1) for (var i = 0; i < this.zShadePower; i++) f *= f;

for (var i = 0; i < 3; i++) t[i] = zs[i] + Clazz.floatToInt (f * ((t[i] & 0xFF) - zs[i]));

p = (t[2] << 16) | (t[1] << 8) | t[0] | (p & 0xFF000000);
}this.p0.addPixel (offset, z, p);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "showZBuffer", 
function () {
for (var i = this.p0.zb.length; --i >= 0; ) {
if (this.p0.pb[i] == 0) continue;
var z = Clazz.floatToInt (Math.min (255, Math.max (0, 255 * (this.zDepth - this.p0.zb[i]) / (this.zDepth - this.zSlab))));
this.p0.pb[i] = 0xFF000000 | z | (z << 8) | (z << 16);
}
});
});
