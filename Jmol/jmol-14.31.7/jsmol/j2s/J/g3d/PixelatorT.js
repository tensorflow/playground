Clazz.declarePackage ("J.g3d");
Clazz.load (["J.g3d.Pixelator"], "J.g3d.PixelatorT", ["J.g3d.Graphics3D"], function () {
c$ = Clazz.declareType (J.g3d, "PixelatorT", J.g3d.Pixelator);
Clazz.overrideMethod (c$, "clearPixel", 
function (offset, z) {
}, "~N,~N");
Clazz.overrideMethod (c$, "addPixel", 
function (offset, z, p) {
var zT = this.g.zbufT[offset];
if (z < zT) {
var argb = this.g.pbufT[offset];
if (!this.g.translucentCoverOnly && argb != 0 && zT - z > this.g.zMargin) this.pb[offset] = J.g3d.Graphics3D.mergeBufferPixel (this.pb[offset], argb, this.g.bgcolor);
this.g.zbufT[offset] = z;
this.g.pbufT[offset] = p & this.g.translucencyMask;
} else if (z == zT) {
} else if (!this.g.translucentCoverOnly && z - zT > this.g.zMargin) {
this.pb[offset] = J.g3d.Graphics3D.mergeBufferPixel (this.pb[offset], p & this.g.translucencyMask, this.g.bgcolor);
}}, "~N,~N,~N");
});
