Clazz.declarePackage ("J.g3d");
Clazz.load (["JU.P3"], "J.g3d.SphereRenderer", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.g3d = null;
this.shader = null;
this.zroot = null;
this.mat = null;
this.coef = null;
this.mDeriv = null;
this.selectedOctant = 0;
this.planeShade = 0;
this.zbuf = null;
this.width = 0;
this.height = 0;
this.depth = 0;
this.slab = 0;
this.offsetPbufBeginLine = 0;
this.ptTemp = null;
this.planeShades = null;
this.dxyz = null;
Clazz.instantialize (this, arguments);
}, J.g3d, "SphereRenderer");
Clazz.prepareFields (c$, function () {
this.zroot =  Clazz.newDoubleArray (2, 0);
this.ptTemp =  new JU.P3 ();
this.planeShades =  Clazz.newIntArray (3, 0);
this.dxyz =  Clazz.newFloatArray (3, 3, 0);
});
Clazz.makeConstructor (c$, 
function (g3d) {
this.g3d = g3d;
this.shader = g3d.shader;
}, "J.g3d.Graphics3D");
Clazz.defineMethod (c$, "render", 
function (shades, diameter, x, y, z, mat, coef, mDeriv, selectedOctant, octantPoints) {
if (z == 1) return;
if (diameter > 49) diameter &= -2;
if (this.g3d.isClippedXY (diameter, x, y)) return;
this.slab = this.g3d.slab;
this.depth = this.g3d.depth;
var radius = (diameter + 1) >> 1;
var minZ = z - radius;
if (z + radius < this.slab || minZ > this.depth) return;
var minX = x - radius;
var maxX = x + radius;
var minY = y - radius;
var maxY = y + radius;
this.shader.nOut = this.shader.nIn = 0;
this.zbuf = this.g3d.zbuf;
this.height = this.g3d.height;
this.width = this.g3d.width;
this.offsetPbufBeginLine = this.width * y + x;
var sh = this.shader;
this.mat = mat;
if (mat != null) {
this.coef = coef;
this.mDeriv = mDeriv;
this.selectedOctant = selectedOctant;
if (sh.ellipsoidShades == null) sh.createEllipsoidShades ();
if (octantPoints != null) {
this.planeShade = -1;
for (var i = 0; i < 3; i++) {
var dx = this.dxyz[i][0] = octantPoints[i].x - x;
var dy = this.dxyz[i][1] = octantPoints[i].y - y;
var dz = this.dxyz[i][2] = octantPoints[i].z - z;
this.planeShades[i] = sh.getShadeIndex (dx, dy, -dz);
if (dx == 0 && dy == 0) {
this.planeShade = this.planeShades[i];
break;
}}
}}if (mat != null || diameter > 128) {
this.renderQuadrant (-1, -1, x, y, z, diameter, shades);
this.renderQuadrant (-1, 1, x, y, z, diameter, shades);
this.renderQuadrant (1, -1, x, y, z, diameter, shades);
this.renderQuadrant (1, 1, x, y, z, diameter, shades);
if (mat != null) {
this.mat = null;
this.coef = null;
this.mDeriv = null;
}} else {
var ss = sh.sphereShapeCache[diameter - 1];
if (ss == null) {
var countSE = 0;
var d = (diameter & 1) != 0;
var radiusF = diameter / 2.0;
var radiusF2 = radiusF * radiusF;
radius = Clazz.doubleToInt ((diameter + 1) / 2);
var ys = d ? 0 : 0.5;
for (var i = 0; i < radius; ++i, ++ys) {
var y2 = ys * ys;
var xs = d ? 0 : 0.5;
for (var j = 0; j < radius; ++j, ++xs) {
var x2 = xs * xs;
var z2 = radiusF2 - y2 - x2;
if (z2 >= 0) ++countSE;
}
}
ss =  Clazz.newIntArray (countSE, 0);
var offset = 0;
ys = d ? 0 : 0.5;
for (var i = 0; i < radius; ++i, ++ys) {
var y2 = ys * ys;
var xs = d ? 0 : 0.5;
for (var j = 0; j < radius; ++j, ++xs) {
var x2 = xs * xs;
var z2 = radiusF2 - y2 - x2;
if (z2 >= 0) {
var zs = Math.sqrt (z2);
var height = Clazz.floatToInt (zs);
var shadeIndexSE = sh.getShadeN (xs, ys, zs, radiusF);
var shadeIndexSW = sh.getShadeN (-xs, ys, zs, radiusF);
var shadeIndexNE = sh.getShadeN (xs, -ys, zs, radiusF);
var shadeIndexNW = sh.getShadeN (-xs, -ys, zs, radiusF);
var packed = (height | (shadeIndexSE << 7) | (shadeIndexSW << 13) | (shadeIndexNE << 19) | (shadeIndexNW << 25));
ss[offset++] = packed;
}}
ss[offset - 1] |= 0x80000000;
}
sh.sphereShapeCache[diameter - 1] = ss;
}if (minX < 0 || maxX >= this.width || minY < 0 || maxY >= this.height || minZ < this.slab || z > this.depth) this.renderSphereClipped (ss, x, y, z, diameter, shades);
 else this.renderSphereUnclipped (ss, z, diameter, shades);
}this.zbuf = null;
}, "~A,~N,~N,~N,~N,JU.M3,~A,JU.M4,~N,~A");
Clazz.defineMethod (c$, "renderSphereUnclipped", 
 function (sphereShape, z, diameter, shades) {
var offsetSphere = 0;
var evenSizeCorrection = 1 - (diameter & 1);
var offsetSouthCenter = this.offsetPbufBeginLine;
var offsetNorthCenter = offsetSouthCenter - evenSizeCorrection * this.width;
var nLines = Clazz.doubleToInt ((diameter + 1) / 2);
var zbuf = this.zbuf;
var width = this.width;
var p = this.g3d.pixel;
do {
var offsetSE = offsetSouthCenter;
var offsetSW = offsetSouthCenter - evenSizeCorrection;
var offsetNE = offsetNorthCenter;
var offsetNW = offsetNorthCenter - evenSizeCorrection;
var packed;
do {
packed = sphereShape[offsetSphere++];
var zPixel = z - (packed & 0x7F);
if (zPixel < zbuf[offsetSE]) p.addPixel (offsetSE, zPixel, shades[((packed >> 7) & 0x3F)]);
if (zPixel < zbuf[offsetSW]) p.addPixel (offsetSW, zPixel, shades[((packed >> 13) & 0x3F)]);
if (zPixel < zbuf[offsetNE]) p.addPixel (offsetNE, zPixel, shades[((packed >> 19) & 0x3F)]);
if (zPixel < zbuf[offsetNW]) p.addPixel (offsetNW, zPixel, shades[((packed >> 25) & 0x3F)]);
++offsetSE;
--offsetSW;
++offsetNE;
--offsetNW;
} while (packed >= 0);
offsetSouthCenter += width;
offsetNorthCenter -= width;
} while (--nLines > 0);
}, "~A,~N,~N,~A");
Clazz.defineMethod (c$, "renderSphereClipped", 
 function (sphereShape, x, y, z, diameter, shades) {
var w = this.width;
var h = this.height;
var offsetSphere = 0;
var evenSizeCorrection = 1 - (diameter & 1);
var offsetSouthCenter = this.offsetPbufBeginLine;
var offsetNorthCenter = offsetSouthCenter - evenSizeCorrection * w;
var nLines = Clazz.doubleToInt ((diameter + 1) / 2);
var ySouth = y;
var yNorth = y - evenSizeCorrection;
var randu = (x << 16) + (y << 1) ^ 0x33333333;
var sh = shades;
var zb = this.zbuf;
var p = this.g3d.pixel;
var sl = this.slab;
var de = this.depth;
do {
var tSouthVisible = ySouth >= 0 && ySouth < h;
var tNorthVisible = yNorth >= 0 && yNorth < h;
var offsetSE = offsetSouthCenter;
var offsetSW = offsetSouthCenter - evenSizeCorrection;
var offsetNE = offsetNorthCenter;
var offsetNW = offsetNorthCenter - evenSizeCorrection;
var packed;
var xEast = x;
var xWest = x - evenSizeCorrection;
do {
var tWestVisible = xWest >= 0 && xWest < w;
var tEastVisible = xEast >= 0 && xEast < w;
packed = sphereShape[offsetSphere++];
var isCore;
var zOffset = packed & 0x7F;
var zPixel;
if (z < sl) {
zPixel = z + zOffset;
isCore = (zPixel >= sl);
} else {
zPixel = z - zOffset;
isCore = (zPixel < sl);
}if (isCore) zPixel = sl;
if (zPixel >= sl && zPixel <= de) {
if (tSouthVisible) {
if (tEastVisible && zPixel < zb[offsetSE]) {
var i = (isCore ? 44 + ((randu >> 7) & 0x07) : (packed >> 7) & 0x3F);
p.addPixel (offsetSE, zPixel, sh[i]);
}if (tWestVisible && zPixel < zb[offsetSW]) {
var i = (isCore ? 44 + ((randu >> 13) & 0x07) : (packed >> 13) & 0x3F);
p.addPixel (offsetSW, zPixel, sh[i]);
}}if (tNorthVisible) {
if (tEastVisible && zPixel < zb[offsetNE]) {
var i = (isCore ? 44 + ((randu >> 19) & 0x07) : (packed >> 19) & 0x3F);
p.addPixel (offsetNE, zPixel, sh[i]);
}if (tWestVisible && zPixel < zb[offsetNW]) {
var i = (isCore ? 44 + ((randu >> 25) & 0x07) : (packed >> 25) & 0x3F);
p.addPixel (offsetNW, zPixel, sh[i]);
}}}++offsetSE;
--offsetSW;
++offsetNE;
--offsetNW;
++xEast;
--xWest;
if (isCore) randu = ((randu << 16) + (randu << 1) + randu) & 0x7FFFFFFF;
} while (packed >= 0);
offsetSouthCenter += w;
offsetNorthCenter -= w;
++ySouth;
--yNorth;
} while (--nLines > 0);
}, "~A,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "renderQuadrant", 
 function (xSign, ySign, x, y, z, diameter, shades) {
var radius = Clazz.doubleToInt (diameter / 2);
var t = x + radius * xSign;
var xStatus = (x < 0 ? -1 : x < this.width ? 0 : 1) + (t < 0 ? -2 : t < this.width ? 0 : 2);
if (xStatus == -3 || xStatus == 3) return;
t = y + radius * ySign;
var yStatus = (y < 0 ? -1 : y < this.height ? 0 : 1) + (t < 0 ? -2 : t < this.height ? 0 : 2);
if (yStatus == -3 || yStatus == 3) return;
var unclipped = (this.mat == null && xStatus == 0 && yStatus == 0 && z - radius >= this.slab && z <= this.depth);
if (unclipped) this.renderQuadrantUnclipped (radius, xSign, ySign, z, shades);
 else this.renderQuadrantClipped (radius, xSign, ySign, x, y, z, shades);
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "renderQuadrantUnclipped", 
 function (radius, xSign, ySign, z, s) {
var r2 = radius * radius;
var dDivisor = radius * 2 + 1;
var lineIncrement = (ySign < 0 ? -this.width : this.width);
var ptLine = this.offsetPbufBeginLine;
var zb = this.zbuf;
var p = this.g3d.pixel;
var indexes = this.shader.sphereShadeIndexes;
for (var i = 0, i2 = 0; i2 <= r2; i2 += i + (++i), ptLine += lineIncrement) {
var offset = ptLine;
var s2 = r2 - i2;
var z0 = z - radius;
var y8 = Clazz.doubleToInt (((i * ySign + radius) << 8) / dDivisor);
for (var j = 0, j2 = 0; j2 <= s2; j2 += j + (++j), offset += xSign) {
if (zb[offset] <= z0) continue;
var k = Clazz.doubleToInt (Math.sqrt (s2 - j2));
z0 = z - k;
if (zb[offset] <= z0) continue;
var x8 = Clazz.doubleToInt (((j * xSign + radius) << 8) / dDivisor);
p.addPixel (offset, z0, s[indexes[((y8 << 8) + x8)]]);
}
}
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "renderQuadrantClipped", 
 function (radius, xSign, ySign, x, y, z, shades) {
var isEllipsoid = (this.mat != null);
var checkOctant = (this.selectedOctant >= 0);
var r2 = radius * radius;
var dDivisor = radius * 2 + 1;
var lineIncrement = (ySign < 0 ? -this.width : this.width);
var ptLine = this.offsetPbufBeginLine;
var randu = (x << 16) + (y << 1) ^ 0x33333333;
var y8 = 0;
var iShade = 0;
var p = this.g3d.pixel;
var z1 = 0;
var h = this.height;
var w = this.width;
var x0 = x;
var zb = this.zbuf;
var xyz = this.dxyz;
var y0 = y;
var z0 = z;
var sl = this.slab;
var de = this.depth;
var pt = this.ptTemp;
var c = this.coef;
var rt = this.zroot;
var oct = this.selectedOctant;
var s = this.shader;
var pl = this.planeShades;
var indexes = s.sphereShadeIndexes;
var ps = this.planeShade;
var m = this.mat;
for (var i = 0, i2 = 0, yC = y; i2 <= r2; i2 += i + (++i), ptLine += lineIncrement, yC += ySign) {
if (yC < 0) {
if (ySign < 0) return;
continue;
}if (yC >= h) {
if (ySign > 0) return;
continue;
}var s2 = r2 - (isEllipsoid ? 0 : i2);
if (!isEllipsoid) {
y8 = Clazz.doubleToInt (((i * ySign + radius) << 8) / dDivisor);
}randu = ((randu << 16) + (randu << 1) + randu) & 0x7FFFFFFF;
var xC = x0;
for (var j = 0, j2 = 0, iRoot = -1, mode = 1, offset = ptLine; j2 <= s2; j2 += j + (++j), offset += xSign, xC += xSign) {
if (xC < 0) {
if (xSign < 0) break;
continue;
}if (xC >= w) {
if (xSign > 0) break;
continue;
}var zPixel;
if (isEllipsoid) {
var b_2a = (c[4] * xC + c[5] * yC + c[8]) / c[2] / 2;
var c_a = (c[0] * xC * xC + c[1] * yC * yC + c[3] * xC * yC + c[6] * xC + c[7] * yC - 1) / c[2];
var f = b_2a * b_2a - c_a;
if (f < 0) {
if (iRoot >= 0) {
break;
}continue;
}f = Math.sqrt (f);
rt[0] = (-b_2a - f);
rt[1] = (-b_2a + f);
iRoot = (z0 < sl ? 1 : 0);
if ((zPixel = Clazz.doubleToInt (rt[iRoot])) == 0) zPixel = z0;
mode = 2;
z1 = zPixel;
if (checkOctant) {
pt.set (xC - x0, yC - y0, zPixel - z0);
m.rotate (pt);
var thisOctant = 0;
if (pt.x < 0) thisOctant |= 1;
if (pt.y < 0) thisOctant |= 2;
if (pt.z < 0) thisOctant |= 4;
if (thisOctant == oct) {
if (ps >= 0) {
iShade = ps;
} else {
var iMin = 3;
var dz;
var zMin = 3.4028235E38;
for (var ii = 0; ii < 3; ii++) {
if ((dz = xyz[ii][2]) == 0) continue;
var ptz = z0 + (-xyz[ii][0] * (xC - x) - xyz[ii][1] * (yC - y0)) / dz;
if (ptz < zMin) {
zMin = ptz;
iMin = ii;
}}
if (iMin == 3) {
iMin = 0;
zMin = z0;
}rt[0] = zMin;
iShade = pl[iMin];
}zPixel = Clazz.doubleToInt (rt[0]);
mode = 3;
}var isCore = (z0 < sl ? zPixel >= sl : zPixel < sl);
if (isCore) {
z1 = zPixel = sl;
mode = 0;
}}if (zPixel < sl || zPixel > de || zb[offset] <= z1) continue;
} else {
var zOffset = Clazz.doubleToInt (Math.sqrt (s2 - j2));
zPixel = z0 + (z0 < sl ? zOffset : -zOffset);
var isCore = (z0 < sl ? zPixel >= sl : zPixel < sl);
if (isCore) {
zPixel = sl;
mode = 0;
}if (zPixel < sl || zPixel > de || zb[offset] <= zPixel) continue;
}switch (mode) {
case 0:
iShade = (44 + ((randu >> 8) & 0x07));
randu = ((randu << 16) + (randu << 1) + randu) & 0x7FFFFFFF;
mode = 1;
break;
case 2:
iShade = s.getEllipsoidShade (xC, yC, rt[iRoot], radius, this.mDeriv);
break;
case 3:
p.clearPixel (offset, z1);
break;
default:
var x8 = Clazz.doubleToInt (((j * xSign + radius) << 8) / dDivisor);
iShade = indexes[(y8 << 8) + x8];
break;
}
p.addPixel (offset, zPixel, shades[iShade]);
}
randu = ((randu + xC + yC) | 1) & 0x7FFFFFFF;
}
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.defineStatics (c$,
"maxOddSizeSphere", 49,
"maxSphereDiameter", 1000,
"maxSphereDiameter2", 2000,
"SHADE_SLAB_CLIPPED", 47);
});
