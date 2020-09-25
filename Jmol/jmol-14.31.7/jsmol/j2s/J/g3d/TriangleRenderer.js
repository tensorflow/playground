Clazz.declarePackage ("J.g3d");
Clazz.load (["J.g3d.G3DRenderer", "$.PrecisionRenderer", "JU.Rgb16"], "J.g3d.TriangleRenderer", ["JU.GData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.g3d = null;
this.ax = null;
this.ay = null;
this.az = null;
this.aa = null;
this.bb = null;
this.axW = null;
this.azW = null;
this.axE = null;
this.azE = null;
this.rgb16sW = null;
this.rgb16sE = null;
this.rgb16sGouraud = null;
this.rgb16t1 = null;
this.rgb16t2 = null;
Clazz.instantialize (this, arguments);
}, J.g3d, "TriangleRenderer", J.g3d.PrecisionRenderer, J.g3d.G3DRenderer);
Clazz.prepareFields (c$, function () {
this.ax =  Clazz.newIntArray (3, 0);
this.ay =  Clazz.newIntArray (3, 0);
this.az =  Clazz.newIntArray (3, 0);
this.aa =  Clazz.newFloatArray (64, 0);
this.bb =  Clazz.newFloatArray (64, 0);
this.axW =  Clazz.newIntArray (64, 0);
this.azW =  Clazz.newIntArray (64, 0);
this.axE =  Clazz.newIntArray (64, 0);
this.azE =  Clazz.newIntArray (64, 0);
this.rgb16t1 =  new JU.Rgb16 ();
this.rgb16t2 =  new JU.Rgb16 ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.g3d.TriangleRenderer, []);
});
Clazz.overrideMethod (c$, "set", 
function (g3d, gdata) {
try {
this.rgb16sW =  new Array (64);
this.rgb16sE =  new Array (64);
for (var i = 64; --i >= 0; ) {
this.rgb16sW[i] =  new JU.Rgb16 ();
this.rgb16sE[i] =  new JU.Rgb16 ();
}
this.g3d = g3d;
this.rgb16sGouraud =  new Array (3);
for (var i = 3; --i >= 0; ) this.rgb16sGouraud[i] =  new JU.Rgb16 ();

} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return this;
}, "J.api.JmolRendererInterface,JU.GData");
Clazz.defineMethod (c$, "reallocRgb16s", 
 function (rgb16s, n) {
var t =  new Array (n);
System.arraycopy (rgb16s, 0, t, 0, rgb16s.length);
for (var i = rgb16s.length; i < n; ++i) t[i] =  new JU.Rgb16 ();

return t;
}, "~A,~N");
Clazz.defineMethod (c$, "setGouraud", 
function (rgbA, rgbB, rgbC) {
this.rgb16sGouraud[0].setInt (rgbA);
this.rgb16sGouraud[1].setInt (rgbB);
this.rgb16sGouraud[2].setInt (rgbC);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "fillTriangle", 
function (screenA, screenB, screenC, useGouraud) {
this.ax[0] = screenA.x;
this.ax[1] = screenB.x;
this.ax[2] = screenC.x;
this.ay[0] = screenA.y;
this.ay[1] = screenB.y;
this.ay[2] = screenC.y;
this.az[0] = screenA.z;
this.az[1] = screenB.z;
this.az[2] = screenC.z;
if (this.az[0] <= 1 || this.az[1] <= 1 || this.az[2] <= 1) return;
var cc0 = this.g3d.clipCode3 (this.ax[0], this.ay[0], this.az[0]);
var cc1 = this.g3d.clipCode3 (this.ax[1], this.ay[1], this.az[1]);
var cc2 = this.g3d.clipCode3 (this.ax[2], this.ay[2], this.az[2]);
var c = (cc0 | cc1 | cc2);
var isClipped = (c != 0);
if (isClipped) {
if (c == -1 || (cc0 & cc1 & cc2) != 0) {
return;
}}var iMinY = 0;
if (this.ay[1] < this.ay[iMinY]) iMinY = 1;
if (this.ay[2] < this.ay[iMinY]) iMinY = 2;
var iMidY = (iMinY + 1) % 3;
var iMaxY = (iMinY + 2) % 3;
if (this.ay[iMidY] > this.ay[iMaxY]) {
var t = iMidY;
iMidY = iMaxY;
iMaxY = t;
}var yMin = this.ay[iMinY];
var yMid = this.ay[iMidY];
var yMax = this.ay[iMaxY];
var nLines = yMax - yMin + 1;
if (nLines > this.g3d.height * 3) return;
if (nLines > this.axW.length) {
var n = (nLines + 31) & -32;
this.axW =  Clazz.newIntArray (n, 0);
this.azW =  Clazz.newIntArray (n, 0);
this.axE =  Clazz.newIntArray (n, 0);
this.azE =  Clazz.newIntArray (n, 0);
this.aa =  Clazz.newFloatArray (n, 0);
this.bb =  Clazz.newFloatArray (n, 0);
this.rgb16sW = this.reallocRgb16s (this.rgb16sW, n);
this.rgb16sE = this.reallocRgb16s (this.rgb16sE, n);
}var gouraudW;
var gouraudE;
if (useGouraud) {
gouraudW = this.rgb16sW;
gouraudE = this.rgb16sE;
} else {
gouraudW = gouraudE = null;
}var dyMidMin = yMid - yMin;
if (dyMidMin == 0) {
if (this.ax[iMidY] < this.ax[iMinY]) {
var t = iMidY;
iMidY = iMinY;
iMinY = t;
}this.generateRaster (nLines, iMinY, iMaxY, this.axW, this.azW, 0, gouraudW);
this.generateRaster (nLines, iMidY, iMaxY, this.axE, this.azE, 0, gouraudE);
} else if (yMid == yMax) {
if (this.ax[iMaxY] < this.ax[iMidY]) {
var t = iMidY;
iMidY = iMaxY;
iMaxY = t;
}this.generateRaster (nLines, iMinY, iMidY, this.axW, this.azW, 0, gouraudW);
this.generateRaster (nLines, iMinY, iMaxY, this.axE, this.azE, 0, gouraudE);
} else {
var dxMaxMin = this.ax[iMaxY] - this.ax[iMinY];
var roundFactor;
roundFactor = JU.GData.roundInt (Clazz.doubleToInt (nLines / 2));
if (dxMaxMin < 0) roundFactor = -roundFactor;
var axSplit = this.ax[iMinY] + Clazz.doubleToInt ((dxMaxMin * dyMidMin + roundFactor) / nLines);
if (axSplit < this.ax[iMidY]) {
this.generateRaster (nLines, iMinY, iMaxY, this.axW, this.azW, 0, gouraudW);
this.generateRaster (dyMidMin + 1, iMinY, iMidY, this.axE, this.azE, 0, gouraudE);
this.generateRaster (nLines - dyMidMin, iMidY, iMaxY, this.axE, this.azE, dyMidMin, gouraudE);
} else {
this.generateRaster (dyMidMin + 1, iMinY, iMidY, this.axW, this.azW, 0, gouraudW);
this.generateRaster (nLines - dyMidMin, iMidY, iMaxY, this.axW, this.azW, dyMidMin, gouraudW);
this.generateRaster (nLines, iMinY, iMaxY, this.axE, this.azE, 0, gouraudE);
}}this.g3d.setZMargin (5);
var pass2Row = this.g3d.pass2Flag01;
var pass2Off = 1 - pass2Row;
var xW;
var i = 0;
if (yMin < 0) {
nLines += yMin;
i -= yMin;
yMin = 0;
}if (yMin + nLines > this.g3d.height) nLines = this.g3d.height - yMin;
if (useGouraud) {
if (isClipped) {
for (; --nLines >= pass2Row; ++yMin, ++i) {
var pixelCount = this.axE[i] - (xW = this.axW[i]) + pass2Off;
if (pixelCount > 0) this.g3d.plotPixelsClippedRaster (pixelCount, xW, yMin, this.azW[i], this.azE[i], this.rgb16sW[i], this.rgb16sE[i]);
}
} else {
for (; --nLines >= pass2Row; ++yMin, ++i) {
var pixelCount = this.axE[i] - (xW = this.axW[i]) + pass2Off;
if (pass2Row == 1 && pixelCount < 0) {
pixelCount = 1;
xW--;
}if (pixelCount > 0) this.g3d.plotPixelsUnclippedRaster (pixelCount, xW, yMin, this.azW[i], this.azE[i], this.rgb16sW[i], this.rgb16sE[i]);
}
}} else {
if (isClipped) {
for (; --nLines >= pass2Row; ++yMin, ++i) {
var pixelCount = this.axE[i] - (xW = this.axW[i]) + pass2Off;
if (pixelCount > 0) this.g3d.plotPixelsClippedRasterBits (pixelCount, xW, yMin, this.azW[i], this.azE[i], null, null, this.aa[i], this.bb[i]);
}
} else {
for (; --nLines >= pass2Row; ++yMin, ++i) {
var pixelCount = this.axE[i] - (xW = this.axW[i]) + pass2Off;
if (pass2Row == 1 && pixelCount < 0) {
pixelCount = 1;
xW--;
}if (pixelCount > 0) this.g3d.plotPixelsUnclippedRasterBits (pixelCount, xW, yMin, null, null, this.aa[i], this.bb[i]);
}
}}this.g3d.setZMargin (0);
}, "JU.P3i,JU.P3i,JU.P3i,~B");
Clazz.defineMethod (c$, "generateRaster", 
 function (dy, iN, iS, axRaster, azRaster, iRaster, gouraud) {
var xN = this.ax[iN];
var xS = this.ax[iS];
var dx = xS - xN;
var xCurrent = xN;
var xIncrement;
var width;
var errorTerm;
if (dx >= 0) {
xIncrement = 1;
width = dx;
errorTerm = 0;
} else {
xIncrement = -1;
width = -dx;
errorTerm = 1 - dy;
}var xMajorIncrement;
var xMajorError;
if (width <= dy) {
xMajorIncrement = 0;
xMajorError = width;
} else {
xMajorIncrement = JU.GData.roundInt (Clazz.doubleToInt (dx / dy));
xMajorError = width % dy;
}this.setRastAB (this.ay[iN], this.az[iN], this.ay[iS], this.az[iS]);
var a0 = this.a;
var b0 = this.b;
var isEast = (axRaster === this.axE);
for (var y = 0, zy = this.ay[iN], lastY = dy - 1, i = iRaster; y <= lastY; ++i, ++y, ++zy) {
if (i == 0 || i > iRaster) {
axRaster[i] = (y == lastY ? this.ax[iS] : xCurrent);
azRaster[i] = this.getZCurrent (a0, b0, zy);
if (isEast) {
this.setRastAB (this.axW[i], this.azW[i], axRaster[i], azRaster[i]);
this.aa[i] = this.a;
this.bb[i] = this.b;
}}xCurrent += xMajorIncrement;
errorTerm += xMajorError;
if (errorTerm > 0) {
xCurrent += xIncrement;
errorTerm -= dy;
}}
if (gouraud != null) {
var rgb16Base = this.rgb16t1;
rgb16Base.setRgb (this.rgb16sGouraud[iN]);
var rgb16Increment = this.rgb16t2;
rgb16Increment.diffDiv (this.rgb16sGouraud[iS], rgb16Base, dy);
for (var i = iRaster, iMax = iRaster + dy; i < iMax; ++i) gouraud[i].setAndIncrement (rgb16Base, rgb16Increment);

}}, "~N,~N,~N,~A,~A,~N,~A");
Clazz.defineStatics (c$,
"DEFAULT", 64);
});
