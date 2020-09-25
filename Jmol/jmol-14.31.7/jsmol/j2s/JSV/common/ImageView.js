Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.common.XYScaleConverter"], "JSV.common.ImageView", ["java.lang.Double", "JSV.common.Coordinate", "$.ScaleData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buf2d = null;
this.grayFactorLast = 0;
this.averageGray = 0;
this.xPixel0 = 0;
this.yPixel0 = 0;
this.xPixel1 = 0;
this.yPixel1 = 0;
this.imageWidth = 0;
this.imageHeight = 0;
this.xPixels = 0;
this.yPixels = 0;
this.xPixelZoom1 = 0;
this.yPixelZoom1 = 0;
this.xPixelZoom2 = 0;
this.yPixelZoom2 = 0;
this.xView1 = 0;
this.yView1 = 0;
this.xView2 = 0;
this.yView2 = 0;
this.minX = NaN;
this.maxX = 0;
this.minY = 0;
this.maxY = 0;
this.minZ = 0;
this.maxZ = 0;
this.scaleData = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "ImageView", null, JSV.common.XYScaleConverter);
Clazz.defineMethod (c$, "set", 
function (view) {
if (Double.isNaN (this.minX)) {
this.minX = view.minX;
this.maxX = view.maxX;
}this.minZ = view.minY;
this.maxZ = view.maxY;
this.scaleData =  new JSV.common.ScaleData ();
}, "JSV.common.ScaleData");
Clazz.defineMethod (c$, "setZoom", 
function (xPixel1, yPixel1, xPixel2, yPixel2) {
this.xPixelZoom1 = Math.min (xPixel1, xPixel2);
this.yPixelZoom1 = Math.min (yPixel1, yPixel2);
this.xPixelZoom2 = Math.max (xPixel1, xPixel2);
this.yPixelZoom2 = Math.max (yPixel1, yPixel2);
this.setView ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setXY0", 
function (spec, xPixel, yPixel) {
this.xPixel0 = xPixel;
this.yPixel0 = yPixel;
this.xPixel1 = this.xPixel0 + this.xPixels - 1;
this.yPixel1 = this.yPixel0 + this.yPixels - 1;
this.setMinMaxY (spec);
}, "JSV.common.Spectrum,~N,~N");
Clazz.defineMethod (c$, "setPixelWidthHeight", 
function (xPixels, yPixels) {
this.xPixels = xPixels;
this.yPixels = yPixels;
}, "~N,~N");
Clazz.defineMethod (c$, "resetView", 
function () {
this.xView1 = 0;
this.yView1 = 0;
this.xView2 = this.imageWidth - 1;
this.yView2 = this.imageHeight - 1;
});
Clazz.defineMethod (c$, "setView", 
function () {
if (this.xPixelZoom1 == 0) this.resetZoom ();
var x1 = this.toImageX (this.xPixelZoom1);
var y1 = this.toImageY (this.yPixelZoom1);
var x2 = this.toImageX (this.xPixelZoom2);
var y2 = this.toImageY (this.yPixelZoom2);
this.xView1 = Math.min (x1, x2);
this.yView1 = Math.min (y1, y2);
this.xView2 = Math.max (x1, x2);
this.yView2 = Math.max (y1, y2);
this.setScaleData ();
this.resetZoom ();
});
Clazz.defineMethod (c$, "resetZoom", 
function () {
this.xPixelZoom1 = this.xPixel0;
this.yPixelZoom1 = this.yPixel0;
this.xPixelZoom2 = this.xPixel1;
this.yPixelZoom2 = this.yPixel1;
});
Clazz.defineMethod (c$, "toImageX", 
function (xPixel) {
return this.xView1 + Clazz.doubleToInt (Math.floor ((xPixel - this.xPixel0) / (this.xPixels - 1.0) * (this.xView2 - this.xView1)));
}, "~N");
Clazz.defineMethod (c$, "toImageY", 
function (yPixel) {
return this.yView1 + Clazz.doubleToInt (Math.floor ((yPixel - this.yPixel0) / (this.yPixels - 1.0) * (this.yView2 - this.yView1)));
}, "~N");
Clazz.defineMethod (c$, "toImageX0", 
function (xPixel) {
return JSV.common.Coordinate.intoRange (Clazz.doubleToInt ((1.0 * xPixel - this.xPixel0) / (this.xPixels - 1) * (this.imageWidth - 1)), 0, this.imageWidth - 1);
}, "~N");
Clazz.defineMethod (c$, "toImageY0", 
function (yPixel) {
return JSV.common.Coordinate.intoRange (Clazz.doubleToInt ((1.0 * yPixel - this.yPixel0) / (this.yPixels - 1) * (this.imageHeight - 1)), 0, this.imageHeight - 1);
}, "~N");
Clazz.defineMethod (c$, "isXWithinRange", 
function (xPixel) {
return (xPixel >= this.xPixel0 - 5 && xPixel < this.xPixel0 + this.xPixels + 5);
}, "~N");
Clazz.defineMethod (c$, "toSubspectrumIndex", 
function (yPixel) {
return JSV.common.Coordinate.intoRange (this.imageHeight - 1 - this.toImageY (yPixel), 0, this.imageHeight - 1);
}, "~N");
Clazz.defineMethod (c$, "toX0", 
function (xPixel) {
return this.maxX + (this.minX - this.maxX) * (this.fixX (xPixel) - this.xPixel0) / (this.xPixels - 1);
}, "~N");
Clazz.defineMethod (c$, "toPixelX0", 
function (x) {
return this.xPixel1 - Clazz.doubleToInt ((x - this.minX) / (this.maxX - this.minX) * (this.xPixels - 1));
}, "~N");
Clazz.defineMethod (c$, "toPixelY0", 
function (ysub) {
return this.yPixel1 - Clazz.doubleToInt (ysub / (this.imageHeight - 1) * (this.yPixels - 1));
}, "~N");
Clazz.defineMethod (c$, "subIndexToPixelY", 
function (subIndex) {
var f = 1.0 * (this.imageHeight - 1 - subIndex - this.yView1) / (this.yView2 - this.yView1);
var y = this.yPixel0 + Clazz.doubleToInt (f * (this.yPixels - 1));
return y;
}, "~N");
Clazz.defineMethod (c$, "fixSubIndex", 
function (subIndex) {
return JSV.common.Coordinate.intoRange (subIndex, this.imageHeight - 1 - this.yView2, this.imageHeight - 1 - this.yView1);
}, "~N");
Clazz.defineMethod (c$, "setView0", 
function (xp1, yp1, xp2, yp2) {
var x1 = this.toImageX0 (xp1);
var y1 = this.toImageY0 (yp1);
var x2 = this.toImageX0 (xp2);
var y2 = this.toImageY0 (yp2);
this.xView1 = Math.min (x1, x2);
this.yView1 = Math.min (y1, y2);
this.xView2 = Math.max (x1, x2);
this.yView2 = Math.max (y1, y2);
this.resetZoom ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "get2dBuffer", 
function (spec, forceNew) {
var subSpectra = spec.getSubSpectra ();
if (subSpectra == null || !subSpectra.get (0).isContinuous ()) return null;
var xyCoords = spec.getXYCoords ();
var nSpec = subSpectra.size ();
this.imageWidth = xyCoords.length;
this.imageHeight = nSpec;
var grayFactor = 255 / (this.maxZ - this.minZ);
if (!forceNew && this.buf2d != null && grayFactor == this.grayFactorLast) return this.buf2d;
this.grayFactorLast = grayFactor;
var pt = this.imageWidth * this.imageHeight;
var buf = (this.buf2d == null || this.buf2d.length != pt ?  Clazz.newIntArray (pt, 0) : this.buf2d);
var totalGray = 0;
for (var i = 0; i < nSpec; i++) {
var points = subSpectra.get (i).xyCoords;
if (points.length != xyCoords.length) return null;
for (var j = 0; j < xyCoords.length; j++) {
var y = points[j].getYVal ();
var gray = 255 - JSV.common.Coordinate.intoRange (Clazz.doubleToInt ((y - this.minZ) * grayFactor), 0, 255);
buf[--pt] = gray;
totalGray += gray;
}
}
this.averageGray = (1 - totalGray / (this.imageWidth * this.imageHeight) / 255);
System.out.println ("Average gray = " + this.averageGray);
return (this.buf2d = buf);
}, "JSV.common.Spectrum,~B");
Clazz.defineMethod (c$, "adjustView", 
function (spec, view) {
var i = 0;
var isLow = false;
while (((isLow = (this.averageGray < 0.05)) || this.averageGray > 0.3) && i++ < 10) {
view.scaleSpectrum (-2, isLow ? 2 : 0.5);
this.set (view.getScale ());
this.get2dBuffer (spec, false);
}
return this.buf2d;
}, "JSV.common.Spectrum,JSV.common.ViewData");
Clazz.defineMethod (c$, "getBuffer", 
function () {
return this.buf2d;
});
Clazz.defineMethod (c$, "setMinMaxY", 
function (spec) {
var subSpectra = spec.getSubSpectra ();
var spec0 = subSpectra.get (0);
this.maxY = spec0.getY2D ();
this.minY = subSpectra.get (subSpectra.size () - 1).getY2D ();
if (spec0.y2DUnits.equalsIgnoreCase ("Hz")) {
this.maxY /= spec0.freq2dY;
this.minY /= spec0.freq2dY;
}this.setScaleData ();
}, "JSV.common.Spectrum");
Clazz.defineMethod (c$, "setScaleData", 
 function () {
this.scaleData.minY = this.minY;
this.scaleData.maxY = this.maxY;
this.scaleData.setYScale (this.toY (this.yPixel0), this.toY (this.yPixel1), false, false);
});
Clazz.overrideMethod (c$, "fixX", 
function (xPixel) {
return (xPixel < this.xPixel0 ? this.xPixel0 : xPixel > this.xPixel1 ? this.xPixel1 : xPixel);
}, "~N");
Clazz.overrideMethod (c$, "fixY", 
function (yPixel) {
return JSV.common.Coordinate.intoRange (yPixel, this.yPixel0, this.yPixel1);
}, "~N");
Clazz.overrideMethod (c$, "getScale", 
function () {
return this.scaleData;
});
Clazz.overrideMethod (c$, "toX", 
function (xPixel) {
return this.maxX + (this.minX - this.maxX) * this.toImageX (this.fixX (xPixel)) / (this.imageWidth - 1);
}, "~N");
Clazz.overrideMethod (c$, "toY", 
function (yPixel) {
var isub = this.toSubspectrumIndex (yPixel);
return this.maxY + (this.minY - this.maxY) * isub / (this.imageHeight - 1);
}, "~N");
Clazz.overrideMethod (c$, "toPixelX", 
function (x) {
var x0 = this.toX (this.xPixel0);
var x1 = this.toX (this.xPixel1);
return this.xPixel0 + Clazz.doubleToInt ((x - x0) / (x1 - x0) * (this.xPixels - 1));
}, "~N");
Clazz.overrideMethod (c$, "toPixelY", 
function (y) {
var f = (y - this.scaleData.minYOnScale) / (this.scaleData.maxYOnScale - this.scaleData.minYOnScale);
return Clazz.doubleToInt (this.yPixel0 + f * this.yPixels);
}, "~N");
Clazz.overrideMethod (c$, "getXPixels", 
function () {
return this.xPixels;
});
Clazz.overrideMethod (c$, "getYPixels", 
function () {
return this.yPixels;
});
Clazz.overrideMethod (c$, "getXPixel0", 
function () {
return this.xPixel0;
});
Clazz.defineStatics (c$,
"DEFAULT_MIN_GRAY", 0.05,
"DEFAULT_MAX_GRAY", 0.30);
});
