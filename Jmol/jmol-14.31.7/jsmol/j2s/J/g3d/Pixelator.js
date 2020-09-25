Clazz.declarePackage ("J.g3d");
Clazz.load (null, "J.g3d.Pixelator", ["J.g3d.Graphics3D"], function () {
c$ = Clazz.decorateAsClass (function () {
this.g = null;
this.p0 = null;
this.zb = null;
this.pb = null;
this.width = 0;
this.bgcolor = 0;
Clazz.instantialize (this, arguments);
}, J.g3d, "Pixelator");
Clazz.makeConstructor (c$, 
function (graphics3d) {
this.g = graphics3d;
this.bgcolor = this.g.bgcolor;
this.setBuf ();
}, "J.g3d.Graphics3D");
Clazz.defineMethod (c$, "setBuf", 
function () {
this.zb = this.g.zbuf;
this.pb = this.g.pbuf;
});
Clazz.defineMethod (c$, "clearPixel", 
function (offset, z) {
if (this.zb[offset] > z) this.zb[offset] = 2147483647;
}, "~N,~N");
Clazz.defineMethod (c$, "addPixel", 
function (offset, z, p) {
this.zb[offset] = z;
this.pb[offset] = p;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "addImagePixel", 
function (shade, tLog, offset, z, argb, bgargb) {
if (z < this.zb[offset]) {
switch (shade) {
case 0:
return;
case 8:
this.addPixel (offset, z, argb);
return;
default:
shade += tLog;
if (shade <= 7) {
var p = this.pb[offset];
if (bgargb != 0) p = J.g3d.Graphics3D.mergeBufferPixel (p, bgargb, bgargb);
p = J.g3d.Graphics3D.mergeBufferPixel (p, (argb & 0xFFFFFF) | (shade << 24), this.bgcolor);
this.addPixel (offset, z, p);
}}
}}, "~N,~N,~N,~N,~N,~N");
});
