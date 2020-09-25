Clazz.declarePackage ("J.g3d");
Clazz.load (["J.g3d.Pixelator"], "J.g3d.PixelatorScreened", null, function () {
c$ = Clazz.declareType (J.g3d, "PixelatorScreened", J.g3d.Pixelator);
Clazz.makeConstructor (c$, 
function (g, p0) {
Clazz.superConstructor (this, J.g3d.PixelatorScreened, [g]);
this.width = g.width;
this.p0 = p0;
}, "J.g3d.Graphics3D,J.g3d.Pixelator");
Clazz.overrideMethod (c$, "addPixel", 
function (offset, z, p) {
if ((offset % this.width) % 2 == (Clazz.doubleToInt (offset / this.width)) % 2) this.p0.addPixel (offset, z, p);
}, "~N,~N,~N");
});
