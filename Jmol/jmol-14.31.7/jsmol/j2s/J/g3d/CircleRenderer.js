Clazz.declarePackage ("J.g3d");
Clazz.load (["J.g3d.G3DRenderer"], "J.g3d.CircleRenderer", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.g3d = null;
Clazz.instantialize (this, arguments);
}, J.g3d, "CircleRenderer", null, J.g3d.G3DRenderer);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (g3d, gdata) {
try {
this.g3d = g3d;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return this;
}, "J.api.JmolRendererInterface,JU.GData");
Clazz.defineMethod (c$, "plotCircleCenteredClipped", 
function (xCenter, yCenter, zCenter, diameter) {
var g = this.g3d;
var c = g.argbCurrent;
var width = g.width;
var zbuf = g.zbuf;
var p = g.pixel;
var r = Clazz.doubleToInt (diameter / 2);
var sizeCorrection = 1 - (diameter & 1);
var x = r;
var y = 0;
var xChange = 1 - 2 * r;
var yChange = 1;
var radiusError = 0;
while (x >= y) {
g.plotPixelClippedArgb (c, xCenter + x - sizeCorrection, yCenter + y - sizeCorrection, zCenter, width, zbuf, p);
g.plotPixelClippedArgb (c, xCenter + x - sizeCorrection, yCenter - y, zCenter, width, zbuf, p);
g.plotPixelClippedArgb (c, xCenter - x, yCenter + y - sizeCorrection, zCenter, width, zbuf, p);
g.plotPixelClippedArgb (c, xCenter - x, yCenter - y, zCenter, width, zbuf, p);
g.plotPixelClippedArgb (c, xCenter + y - sizeCorrection, yCenter + x - sizeCorrection, zCenter, width, zbuf, p);
g.plotPixelClippedArgb (c, xCenter + y - sizeCorrection, yCenter - x, zCenter, width, zbuf, p);
g.plotPixelClippedArgb (c, xCenter - y, yCenter + x - sizeCorrection, zCenter, width, zbuf, p);
g.plotPixelClippedArgb (c, xCenter - y, yCenter - x, zCenter, width, zbuf, p);
++y;
radiusError += yChange;
yChange += 2;
if (2 * radiusError + xChange > 0) {
--x;
radiusError += xChange;
xChange += 2;
}}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "plotCircleCenteredUnclipped", 
function (xCenter, yCenter, zCenter, diameter) {
var r = Clazz.doubleToInt (diameter / 2);
var sizeCorrection = 1 - (diameter & 1);
var x = r;
var y = 0;
var xChange = 1 - 2 * r;
var yChange = 1;
var radiusError = 0;
var g = this.g3d;
var p = g.pixel;
var width = g.width;
var zbuf = g.zbuf;
var c = g.argbCurrent;
while (x >= y) {
g.plotPixelUnclipped (c, xCenter + x - sizeCorrection, yCenter + y - sizeCorrection, zCenter, width, zbuf, p);
g.plotPixelUnclipped (c, xCenter + x - sizeCorrection, yCenter - y, zCenter, width, zbuf, p);
g.plotPixelUnclipped (c, xCenter - x, yCenter + y - sizeCorrection, zCenter, width, zbuf, p);
g.plotPixelUnclipped (c, xCenter - x, yCenter - y, zCenter, width, zbuf, p);
g.plotPixelUnclipped (c, xCenter + y - sizeCorrection, yCenter + x - sizeCorrection, zCenter, width, zbuf, p);
g.plotPixelUnclipped (c, xCenter + y - sizeCorrection, yCenter - x, zCenter, width, zbuf, p);
g.plotPixelUnclipped (c, xCenter - y, yCenter + x - sizeCorrection, zCenter, width, zbuf, p);
g.plotPixelUnclipped (c, xCenter - y, yCenter - x, zCenter, width, zbuf, p);
++y;
radiusError += yChange;
yChange += 2;
if (2 * radiusError + xChange > 0) {
--x;
radiusError += xChange;
xChange += 2;
}}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "plotFilledCircleCenteredClipped", 
function (xCenter, yCenter, zCenter, diameter) {
var r = Clazz.doubleToInt (diameter / 2);
var sizeCorrection = 1 - (diameter & 1);
var x = r;
var y = 0;
var xChange = 1 - 2 * r;
var yChange = 1;
var radiusError = 0;
var g = this.g3d;
var c = g.argbCurrent;
var width = g.width;
var height = g.height;
var zbuf = g.zbuf;
var p = g.pixel;
while (x >= y) {
this.plotPixelsClipped (c, 2 * x + 1 - sizeCorrection, xCenter - x, yCenter + y - sizeCorrection, zCenter, width, height, zbuf, p);
this.plotPixelsClipped (c, 2 * x + 1 - sizeCorrection, xCenter - x, yCenter - y, zCenter, width, height, zbuf, p);
this.plotPixelsClipped (c, 2 * y + 1 - sizeCorrection, xCenter - y, yCenter + x - sizeCorrection, zCenter, width, height, zbuf, p);
this.plotPixelsClipped (c, 2 * y + 1 - sizeCorrection, xCenter - y, yCenter - x, zCenter, width, height, zbuf, p);
++y;
radiusError += yChange;
yChange += 2;
if (2 * radiusError + xChange > 0) {
--x;
radiusError += xChange;
xChange += 2;
}}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "plotPixelsClipped", 
 function (argb, count, x, y, z, width, height, zbuf, p) {
if (y < 0 || y >= height || x >= width) return;
if (x < 0) {
count += x;
x = 0;
}if (count + x > width) count = width - x;
if (count <= 0) return;
var offsetPbuf = y * width + x;
var offsetMax = offsetPbuf + count;
while (offsetPbuf < offsetMax) {
if (z < zbuf[offsetPbuf]) p.addPixel (offsetPbuf, z, argb);
offsetPbuf++;
}
}, "~N,~N,~N,~N,~N,~N,~N,~A,J.g3d.Pixelator");
Clazz.defineMethod (c$, "plotFilledCircleCenteredUnclipped", 
function (xCenter, yCenter, zCenter, diameter) {
var r = Clazz.doubleToInt (diameter / 2);
var x = r;
var y = 0;
var xChange = 1 - 2 * r;
var yChange = 1;
var radiusError = 0;
var g = this.g3d;
var c = g.argbCurrent;
var width = g.width;
var zbuf = g.zbuf;
var p = g.pixel;
while (x >= y) {
g.plotPixelsUnclippedCount (c, 2 * x + 1, xCenter - x, yCenter + y, zCenter, width, zbuf, p);
g.plotPixelsUnclippedCount (c, 2 * x + 1, xCenter - x, yCenter - y, zCenter, width, zbuf, p);
g.plotPixelsUnclippedCount (c, 2 * y + 1, xCenter - y, yCenter + x, zCenter, width, zbuf, p);
g.plotPixelsUnclippedCount (c, 2 * y + 1, xCenter - y, yCenter - x, zCenter, width, zbuf, p);
++y;
radiusError += yChange;
yChange += 2;
if (2 * radiusError + xChange > 0) {
--x;
radiusError += xChange;
xChange += 2;
}}
}, "~N,~N,~N,~N");
});
