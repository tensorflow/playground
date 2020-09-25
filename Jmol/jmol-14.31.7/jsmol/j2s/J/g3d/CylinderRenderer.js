Clazz.declarePackage ("J.g3d");
Clazz.load (["JU.P3i"], "J.g3d.CylinderRenderer", ["JU.AU", "$.P3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.g3d = null;
this.line3d = null;
this.shader = null;
this.colixA = 0;
this.colixB = 0;
this.shadesA = null;
this.shadesB = null;
this.xA = 0;
this.yA = 0;
this.zA = 0;
this.dxB = 0;
this.dyB = 0;
this.dzB = 0;
this.xAf = 0;
this.yAf = 0;
this.zAf = 0;
this.dxBf = 0;
this.dyBf = 0;
this.dzBf = 0;
this.tEvenDiameter = false;
this.diameter = 0;
this.endcaps = 0;
this.endCapHidden = false;
this.xEndcap = 0;
this.yEndcap = 0;
this.zEndcap = 0;
this.argbEndcap = 0;
this.colixEndcap = 0;
this.endcapShadeIndex = 0;
this.radius = 0;
this.radius2 = 0;
this.cosTheta = 0;
this.cosPhi = 0;
this.sinPhi = 0;
this.clipped = false;
this.rasterCount = 0;
this.xyztRaster = null;
this.xyzfRaster = null;
this.ptA0 = null;
this.ptB0 = null;
this.ptA0i = null;
this.ptB0i = null;
this.xTip = 0;
this.yTip = 0;
this.zTip = 0;
Clazz.instantialize (this, arguments);
}, J.g3d, "CylinderRenderer");
Clazz.prepareFields (c$, function () {
this.xyztRaster =  Clazz.newArray (-1, [ Clazz.newFloatArray (32, 0),  Clazz.newFloatArray (32, 0),  Clazz.newFloatArray (32, 0),  Clazz.newFloatArray (32, 0)]);
this.xyzfRaster =  Clazz.newArray (-1, [ Clazz.newIntArray (32, 0),  Clazz.newIntArray (32, 0),  Clazz.newIntArray (32, 0),  Clazz.newIntArray (32, 0)]);
this.ptA0i =  new JU.P3i ();
this.ptB0i =  new JU.P3i ();
});
Clazz.makeConstructor (c$, 
function (g3d) {
this.g3d = g3d;
this.line3d = g3d.line3d;
this.shader = g3d.shader;
}, "J.g3d.Graphics3D");
Clazz.defineMethod (c$, "renderOld", 
function (colixA, colixB, screen, endcaps, diameter, xa, ya, za, xb, yb, zb) {
var r = Clazz.doubleToInt (diameter / 2) + 1;
var g = this.g3d;
var codeMinA = g.clipCode3 (xa - r, ya - r, za - r);
var codeMaxA = g.clipCode3 (xa + r, ya + r, za + r);
var codeMinB = g.clipCode3 (xb - r, yb - r, zb - r);
var codeMaxB = g.clipCode3 (xb + r, yb + r, zb + r);
var c = (codeMinA | codeMaxA | codeMinB | codeMaxB);
this.clipped = (c != 0);
if (c == -1 || (codeMinA & codeMaxB & codeMaxA & codeMinB) != 0) return;
this.dxB = xb - xa;
this.dyB = yb - ya;
this.dzB = zb - za;
if (diameter <= 1) {
this.line3d.plotLineDeltaOld (g.getColorArgbOrGray (colixA), g.getColorArgbOrGray (colixB), xa, ya, za, this.dxB, this.dyB, this.dzB, this.clipped);
return;
}var drawBackside = (screen == 0 && (this.clipped || endcaps == 2 || endcaps == 0));
this.diameter = diameter;
this.xA = xa;
this.yA = ya;
this.zA = za;
this.endcaps = endcaps;
this.shadesA = g.getShades (this.colixA = colixA);
this.shadesB = g.getShades (this.colixB = colixB);
this.calcArgbEndcap (true, false);
this.calcCosSin (this.dxB, this.dyB, this.dzB);
this.calcPoints (3, false);
this.interpolate (0, 1, this.xyzfRaster, this.xyztRaster);
this.interpolate (1, 2, this.xyzfRaster, this.xyztRaster);
var xyzf = this.xyzfRaster;
if (endcaps == 2) this.renderFlatEndcap (true, false, xyzf);
g.setZMargin (5);
var width = g.width;
var zbuf = g.zbuf;
var xr = xyzf[0];
var yr = xyzf[1];
var zr = xyzf[2];
var fr = xyzf[3];
var p = g.pixel;
for (var i = this.rasterCount; --i >= 0; ) {
var fpz = fr[i] >> (8);
var fpzBack = fpz >> 1;
var x = xr[i];
var y = yr[i];
var z = zr[i];
if (this.endCapHidden && this.argbEndcap != 0) {
if (this.clipped) {
g.plotPixelClippedArgb (this.argbEndcap, this.xEndcap + x, this.yEndcap + y, this.zEndcap - z - 1, width, zbuf, p);
g.plotPixelClippedArgb (this.argbEndcap, this.xEndcap - x, this.yEndcap - y, this.zEndcap + z - 1, width, zbuf, p);
} else {
g.plotPixelUnclipped (this.argbEndcap, this.xEndcap + x, this.yEndcap + y, this.zEndcap - z - 1, width, zbuf, p);
g.plotPixelUnclipped (this.argbEndcap, this.xEndcap - x, this.yEndcap - y, this.zEndcap + z - 1, width, zbuf, p);
}}this.line3d.plotLineDeltaAOld (this.shadesA, this.shadesB, screen, fpz, this.xA + x, this.yA + y, this.zA - z, this.dxB, this.dyB, this.dzB, this.clipped);
if (drawBackside) {
this.line3d.plotLineDeltaOld (this.shadesA[fpzBack], this.shadesB[fpzBack], this.xA - x, this.yA - y, this.zA + z, this.dxB, this.dyB, this.dzB, this.clipped);
}}
g.setZMargin (0);
if (endcaps == 3) this.renderSphericalEndcaps ();
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "renderBitsFloat", 
function (colixA, colixB, screen, endcaps, diameter, ptA, ptB) {
var g = this.g3d;
if (this.ptA0 == null) {
this.ptA0 =  new JU.P3 ();
this.ptB0 =  new JU.P3 ();
}this.ptA0.setT (ptA);
var r = Clazz.doubleToInt (diameter / 2) + 1;
var ixA = Math.round (ptA.x);
var iyA = Math.round (ptA.y);
var izA = Math.round (ptA.z);
var ixB = Math.round (ptB.x);
var iyB = Math.round (ptB.y);
var izB = Math.round (ptB.z);
var codeMinA = g.clipCode3 (ixA - r, iyA - r, izA - r);
var codeMaxA = g.clipCode3 (ixA + r, iyA + r, izA + r);
var codeMinB = g.clipCode3 (ixB - r, iyB - r, izB - r);
var codeMaxB = g.clipCode3 (ixB + r, iyB + r, izB + r);
var c = (codeMinA | codeMaxA | codeMinB | codeMaxB);
this.clipped = (c != 0);
if (c == -1 || (codeMinA & codeMaxB & codeMaxA & codeMinB) != 0) return;
this.dxBf = ptB.x - ptA.x;
this.dyBf = ptB.y - ptA.y;
this.dzBf = ptB.z - ptA.z;
if (diameter > 0) {
this.diameter = diameter;
this.xAf = ptA.x;
this.yAf = ptA.y;
this.zAf = ptA.z;
}var drawBackside = (screen == 0 && (this.clipped || endcaps == 2 || endcaps == 0));
this.xA = Clazz.floatToInt (this.xAf);
this.yA = Clazz.floatToInt (this.yAf);
this.zA = Clazz.floatToInt (this.zAf);
this.dxB = Clazz.floatToInt (this.dxBf);
this.dyB = Clazz.floatToInt (this.dyBf);
this.dzB = Clazz.floatToInt (this.dzBf);
this.shadesA = g.getShades (this.colixA = colixA);
this.shadesB = g.getShades (this.colixB = colixB);
this.endcaps = endcaps;
this.calcArgbEndcap (true, true);
var xyzf = this.xyzfRaster;
if (diameter > 0) this.generateBaseEllipsePrecisely (false);
if (endcaps == 2) this.renderFlatEndcap (true, true, xyzf);
this.line3d.setLineBits (this.dxBf, this.dyBf);
g.setZMargin (5);
var p = g.pixel;
var width = g.width;
var zbuf = g.zbuf;
var xr = xyzf[0];
var yr = xyzf[1];
var zr = xyzf[2];
var fr = xyzf[3];
for (var i = this.rasterCount; --i >= 0; ) {
var fpz = fr[i] >> (8);
var fpzBack = fpz >> 1;
var x = xr[i];
var y = yr[i];
var z = zr[i];
if (this.endCapHidden && this.argbEndcap != 0) {
if (this.clipped) {
g.plotPixelClippedArgb (this.argbEndcap, this.xEndcap + x, this.yEndcap + y, this.zEndcap - z - 1, width, zbuf, p);
g.plotPixelClippedArgb (this.argbEndcap, this.xEndcap - x, this.yEndcap - y, this.zEndcap + z - 1, width, zbuf, p);
} else {
g.plotPixelUnclipped (this.argbEndcap, this.xEndcap + x, this.yEndcap + y, this.zEndcap - z - 1, width, zbuf, p);
g.plotPixelUnclipped (this.argbEndcap, this.xEndcap - x, this.yEndcap - y, this.zEndcap + z - 1, width, zbuf, p);
}}this.ptA0.set (this.xA + x, this.yA + y, this.zA - z);
this.ptB0.setT (this.ptA0);
this.ptB0.x += this.dxB;
this.ptB0.y += this.dyB;
this.ptB0.z += this.dzB;
this.line3d.plotLineDeltaABitsFloat (this.shadesA, this.shadesB, fpz, this.ptA0, this.ptB0, screen, this.clipped);
if (drawBackside) {
this.ptA0.set (this.xA - x, this.yA - y, this.zA + z);
this.ptB0.setT (this.ptA0);
this.ptB0.x += this.dxB;
this.ptB0.y += this.dyB;
this.ptB0.z += this.dzB;
this.line3d.plotLineDeltaABitsFloat (this.shadesA, this.shadesB, fpzBack, this.ptA0, this.ptB0, screen, this.clipped);
}}
g.setZMargin (0);
if (endcaps == 3) this.renderSphericalEndcaps ();
this.xAf += this.dxBf;
this.yAf += this.dyBf;
this.zAf += this.dzBf;
}, "~N,~N,~N,~N,~N,JU.P3,JU.P3");
Clazz.defineMethod (c$, "renderBits", 
function (colixA, colixB, screen, endcaps, diameter, ptA, ptB) {
var g = this.g3d;
if (diameter == 0 || diameter == 1) {
this.line3d.plotLineBits (g.getColorArgbOrGray (colixA), g.getColorArgbOrGray (colixB), ptA, ptB, 0, 0, false);
return;
}this.ptA0i.setT (ptA);
var r = Clazz.doubleToInt (diameter / 2) + 1;
var ixA = ptA.x;
var iyA = ptA.y;
var izA = ptA.z;
var ixB = ptB.x;
var iyB = ptB.y;
var izB = ptB.z;
var codeMinA = g.clipCode3 (ixA - r, iyA - r, izA - r);
var codeMaxA = g.clipCode3 (ixA + r, iyA + r, izA + r);
var codeMinB = g.clipCode3 (ixB - r, iyB - r, izB - r);
var codeMaxB = g.clipCode3 (ixB + r, iyB + r, izB + r);
var c = (codeMinA | codeMaxA | codeMinB | codeMaxB);
this.clipped = (c != 0);
if (c == -1 || (codeMinA & codeMaxB & codeMaxA & codeMinB) != 0) return;
this.dxBf = ptB.x - ptA.x;
this.dyBf = ptB.y - ptA.y;
this.dzBf = ptB.z - ptA.z;
if (diameter > 0) {
this.diameter = diameter;
this.xAf = ptA.x;
this.yAf = ptA.y;
this.zAf = ptA.z;
}var drawBackside = (screen == 0 && (this.clipped || endcaps == 2 || endcaps == 0));
this.xA = Clazz.floatToInt (this.xAf);
this.yA = Clazz.floatToInt (this.yAf);
this.zA = Clazz.floatToInt (this.zAf);
this.dxB = Clazz.floatToInt (this.dxBf);
this.dyB = Clazz.floatToInt (this.dyBf);
this.dzB = Clazz.floatToInt (this.dzBf);
this.shadesA = g.getShades (this.colixA = colixA);
this.shadesB = g.getShades (this.colixB = colixB);
this.endcaps = endcaps;
this.calcArgbEndcap (true, true);
var xyzf = this.xyzfRaster;
if (diameter > 0) this.generateBaseEllipsePrecisely (false);
if (endcaps == 2) this.renderFlatEndcap (true, true, xyzf);
this.line3d.setLineBits (this.dxBf, this.dyBf);
g.setZMargin (5);
var p = g.pixel;
var width = g.width;
var zbuf = g.zbuf;
var xr = xyzf[0];
var yr = xyzf[1];
var zr = xyzf[2];
var fr = xyzf[3];
for (var i = this.rasterCount; --i >= 0; ) {
var fpz = fr[i] >> (8);
var fpzBack = fpz >> 1;
var x = xr[i];
var y = yr[i];
var z = zr[i];
if (this.endCapHidden && this.argbEndcap != 0) {
if (this.clipped) {
g.plotPixelClippedArgb (this.argbEndcap, this.xEndcap + x, this.yEndcap + y, this.zEndcap - z - 1, width, zbuf, p);
g.plotPixelClippedArgb (this.argbEndcap, this.xEndcap - x, this.yEndcap - y, this.zEndcap + z - 1, width, zbuf, p);
} else {
g.plotPixelUnclipped (this.argbEndcap, this.xEndcap + x, this.yEndcap + y, this.zEndcap - z - 1, width, zbuf, p);
g.plotPixelUnclipped (this.argbEndcap, this.xEndcap - x, this.yEndcap - y, this.zEndcap + z - 1, width, zbuf, p);
}}this.ptA0i.set (this.xA + x, this.yA + y, this.zA - z);
this.ptB0i.setT (this.ptA0i);
this.ptB0i.x += this.dxB;
this.ptB0i.y += this.dyB;
this.ptB0i.z += this.dzB;
this.line3d.plotLineDeltaABitsInt (this.shadesA, this.shadesB, fpz, this.ptA0i, this.ptB0i, screen, this.clipped);
if (drawBackside) {
this.ptA0i.set (this.xA - x, this.yA - y, this.zA + z);
this.ptB0i.setT (this.ptA0i);
this.ptB0i.x += this.dxB;
this.ptB0i.y += this.dyB;
this.ptB0i.z += this.dzB;
this.line3d.plotLineDeltaABitsInt (this.shadesA, this.shadesB, fpzBack, this.ptA0i, this.ptB0i, screen, this.clipped);
}}
g.setZMargin (0);
if (endcaps == 3) this.renderSphericalEndcaps ();
this.xAf += this.dxBf;
this.yAf += this.dyBf;
this.zAf += this.dzBf;
}, "~N,~N,~N,~N,~N,JU.P3i,JU.P3i");
Clazz.defineMethod (c$, "renderConeOld", 
function (colix, endcap, diameter, xa, ya, za, xtip, ytip, ztip, doFill, isBarb) {
this.dxBf = (xtip) - (this.xAf = xa);
this.dyBf = (ytip) - (this.yAf = ya);
this.dzBf = (ztip) - (this.zAf = za);
this.xA = Clazz.doubleToInt (Math.floor (this.xAf));
this.yA = Clazz.doubleToInt (Math.floor (this.yAf));
this.zA = Clazz.doubleToInt (Math.floor (this.zAf));
this.dxB = Clazz.doubleToInt (Math.floor (this.dxBf));
this.dyB = Clazz.doubleToInt (Math.floor (this.dyBf));
this.dzB = Clazz.doubleToInt (Math.floor (this.dzBf));
this.xTip = xtip;
this.yTip = ytip;
this.zTip = ztip;
this.shadesA = this.g3d.getShades (this.colixA = colix);
var shadeIndexTip = this.shader.getShadeIndex (this.dxB, this.dyB, -this.dzB);
var g3d = this.g3d;
var p = g3d.pixel;
var width = g3d.width;
var zbuf = g3d.zbuf;
g3d.plotPixelClippedArgb (this.shadesA[shadeIndexTip], Clazz.floatToInt (xtip), Clazz.floatToInt (ytip), Clazz.floatToInt (ztip), width, zbuf, p);
this.diameter = diameter;
if (diameter <= 1) {
if (diameter == 1) this.line3d.plotLineDeltaOld (this.colixA, this.colixA, this.xA, this.yA, this.zA, this.dxB, this.dyB, this.dzB, this.clipped);
return;
}this.endcaps = endcap;
this.calcArgbEndcap (false, true);
this.generateBaseEllipsePrecisely (isBarb);
if (!isBarb && this.endcaps == 2) this.renderFlatEndcap (false, true, this.xyzfRaster);
g3d.setZMargin (5);
var xr = this.xyztRaster[0];
var yr = this.xyztRaster[1];
var zr = this.xyztRaster[2];
var fr = this.xyzfRaster[3];
var sA = this.shadesA;
var doOpen = (this.endCapHidden && this.argbEndcap != 0);
for (var i = this.rasterCount; --i >= 0; ) {
var x = xr[i];
var y = yr[i];
var z = zr[i];
var fpz = fr[i] >> (8);
var xUp = this.xAf + x;
var yUp = this.yAf + y;
var zUp = this.zAf - z;
var xDn = this.xAf - x;
var yDn = this.yAf - y;
var zDn = this.zAf + z;
var argb = sA[0];
if (doOpen) {
g3d.plotPixelClippedArgb (this.argbEndcap, Clazz.floatToInt (xUp), Clazz.floatToInt (yUp), Clazz.floatToInt (zUp), width, zbuf, p);
g3d.plotPixelClippedArgb (this.argbEndcap, Clazz.floatToInt (xDn), Clazz.floatToInt (yDn), Clazz.floatToInt (zDn), width, zbuf, p);
}if (argb != 0) {
this.line3d.plotLineDeltaAOld (sA, sA, 0, fpz, Clazz.floatToInt (xUp), Clazz.floatToInt (yUp), Clazz.floatToInt (zUp), Clazz.doubleToInt (Math.ceil (this.xTip - xUp)), Clazz.doubleToInt (Math.ceil (this.yTip - yUp)), Clazz.doubleToInt (Math.ceil (this.zTip - zUp)), true);
if (doFill) {
this.line3d.plotLineDeltaAOld (sA, sA, 0, fpz, Clazz.floatToInt (xUp), Clazz.floatToInt (yUp) + 1, Clazz.floatToInt (zUp), Clazz.doubleToInt (Math.ceil (this.xTip - xUp)), Clazz.doubleToInt (Math.ceil (this.yTip - yUp)) + 1, Clazz.doubleToInt (Math.ceil (this.zTip - zUp)), true);
this.line3d.plotLineDeltaAOld (sA, sA, 0, fpz, Clazz.floatToInt (xUp) + 1, Clazz.floatToInt (yUp), Clazz.floatToInt (zUp), Clazz.doubleToInt (Math.ceil (this.xTip - xUp)) + 1, Clazz.doubleToInt (Math.ceil (this.yTip - yUp)), Clazz.doubleToInt (Math.ceil (this.zTip - zUp)), true);
}if (!isBarb && !(this.endcaps != 2 && this.dzB > 0)) {
this.line3d.plotLineDeltaOld (argb, argb, Clazz.floatToInt (xDn), Clazz.floatToInt (yDn), Clazz.floatToInt (zDn), Clazz.doubleToInt (Math.ceil (this.xTip - xDn)), Clazz.doubleToInt (Math.ceil (this.yTip - yDn)), Clazz.doubleToInt (Math.ceil (this.zTip - zDn)), true);
}}}
g3d.setZMargin (0);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~B,~B");
Clazz.defineMethod (c$, "generateBaseEllipsePrecisely", 
 function (isBarb) {
this.calcCosSin (this.dxBf, this.dyBf, this.dzBf);
this.calcPoints (isBarb ? 2 : 3, true);
this.interpolatePrecisely (0, 1, this.xyzfRaster, this.xyztRaster);
if (!isBarb) this.interpolatePrecisely (1, 2, this.xyzfRaster, this.xyztRaster);
for (var i = 3; --i >= 0; ) for (var j = this.rasterCount; --j >= 0; ) this.xyzfRaster[i][j] = Clazz.doubleToInt (Math.floor (this.xyztRaster[i][j]));


}, "~B");
Clazz.defineMethod (c$, "calcPoints", 
 function (count, isPrecise) {
this.calcRotatedPoint (0, 0, isPrecise, this.xyzfRaster, this.xyztRaster);
this.calcRotatedPoint (0.5, 1, isPrecise, this.xyzfRaster, this.xyztRaster);
if ((this.rasterCount = count) == 3) this.calcRotatedPoint (1, 2, isPrecise, this.xyzfRaster, this.xyztRaster);
}, "~N,~B");
Clazz.defineMethod (c$, "calcCosSin", 
 function (dx, dy, dz) {
var mag2d2 = dx * dx + dy * dy;
if (mag2d2 == 0) {
this.cosTheta = 1;
this.cosPhi = 1;
this.sinPhi = 0;
} else {
var mag2d = Math.sqrt (mag2d2);
var mag3d = Math.sqrt (mag2d2 + dz * dz);
this.cosTheta = dz / mag3d;
this.cosPhi = dx / mag2d;
this.sinPhi = dy / mag2d;
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "calcRotatedPoint", 
 function (t, i, isPrecision, xyzf, xyzt) {
xyzt[3][i] = t;
var tPI = t * 3.141592653589793;
var xT = Math.sin (tPI) * this.cosTheta;
var yT = Math.cos (tPI);
var xR = this.radius * (xT * this.cosPhi - yT * this.sinPhi);
var yR = this.radius * (xT * this.sinPhi + yT * this.cosPhi);
var z2 = this.radius2 - (xR * xR + yR * yR);
var zR = (z2 > 0 ? Math.sqrt (z2) : 0);
if (isPrecision) {
xyzt[0][i] = xR;
xyzt[1][i] = yR;
xyzt[2][i] = zR;
} else if (this.tEvenDiameter) {
xyzf[0][i] = Clazz.doubleToInt (xR - 0.5);
xyzf[1][i] = Clazz.doubleToInt (yR - 0.5);
xyzf[2][i] = Clazz.doubleToInt (zR + 0.5);
} else {
xyzf[0][i] = Clazz.doubleToInt (xR);
xyzf[1][i] = Clazz.doubleToInt (yR);
xyzf[2][i] = Clazz.doubleToInt (zR + 0.5);
}xyzf[3][i] = this.shader.getShadeFp8 (xR, yR, zR);
}, "~N,~N,~B,~A,~A");
Clazz.defineMethod (c$, "allocRaster", 
 function (isPrecision, xyzf, xyzt) {
if (this.rasterCount >= xyzf[0].length) while (this.rasterCount >= xyzf[0].length) {
for (var i = 4; --i >= 0; ) xyzf[i] = JU.AU.doubleLengthI (xyzf[i]);

xyzt[3] = JU.AU.doubleLengthF (xyzt[3]);
}
if (isPrecision) while (this.rasterCount >= xyzt[0].length) {
for (var i = 3; --i >= 0; ) xyzt[i] = JU.AU.doubleLengthF (xyzt[i]);

}
return this.rasterCount++;
}, "~B,~A,~A");
Clazz.defineMethod (c$, "interpolate", 
 function (iLower, iUpper, xyzf, xyzt) {
var x = xyzf[0];
var y = xyzf[1];
var dx = x[iUpper] - x[iLower];
if (dx < 0) dx = -dx;
var dy = y[iUpper] - y[iLower];
if (dy < 0) dy = -dy;
if ((dx + dy) <= 1) return;
var iMid = this.allocRaster (false, xyzf, xyzt);
x = xyzf[0];
y = xyzf[1];
var f = xyzf[3];
var tLower = xyzt[3][iLower];
var tUpper = xyzt[3][iUpper];
for (var j = 4; --j >= 0; ) {
var tMid = (tLower + tUpper) / 2;
this.calcRotatedPoint (tMid, iMid, false, xyzf, xyzt);
if ((x[iMid] == x[iLower]) && (y[iMid] == y[iLower])) {
f[iLower] = (f[iLower] + f[iMid]) >>> 1;
tLower = tMid;
} else if ((x[iMid] == x[iUpper]) && (y[iMid] == y[iUpper])) {
f[iUpper] = (f[iUpper] + f[iMid]) >>> 1;
tUpper = tMid;
} else {
this.interpolate (iLower, iMid, xyzf, xyzt);
this.interpolate (iMid, iUpper, xyzf, xyzt);
return;
}}
x[iMid] = x[iLower];
y[iMid] = y[iUpper];
}, "~N,~N,~A,~A");
Clazz.defineMethod (c$, "interpolatePrecisely", 
 function (iLower, iUpper, xyzf, xyzt) {
var x = xyzt[0];
var y = xyzt[1];
var dx = Clazz.doubleToInt (Math.floor (x[iUpper])) - Clazz.doubleToInt (Math.floor (x[iLower]));
if (dx < 0) dx = -dx;
var dy = Clazz.doubleToInt (Math.floor (y[iUpper])) - Clazz.doubleToInt (Math.floor (y[iLower]));
if (dy < 0) dy = -dy;
if ((dx + dy) <= 1) return;
var t = xyzt[3];
var tLower = t[iLower];
var tUpper = t[iUpper];
var iMid = this.allocRaster (true, xyzf, xyzt);
x = xyzt[0];
y = xyzt[1];
t = xyzt[3];
var f = xyzf[3];
for (var j = 4; --j >= 0; ) {
var tMid = (tLower + tUpper) / 2;
this.calcRotatedPoint (tMid, iMid, true, xyzf, xyzt);
if ((Clazz.doubleToInt (Math.floor (x[iMid])) == Clazz.doubleToInt (Math.floor (x[iLower]))) && (Clazz.doubleToInt (Math.floor (y[iMid])) == Clazz.doubleToInt (Math.floor (y[iLower])))) {
f[iLower] = (f[iLower] + f[iMid]) >>> 1;
tLower = tMid;
} else if ((Clazz.doubleToInt (Math.floor (x[iMid])) == Clazz.doubleToInt (Math.floor (x[iUpper]))) && (Clazz.doubleToInt (Math.floor (y[iMid])) == Clazz.doubleToInt (Math.floor (y[iUpper])))) {
f[iUpper] = (f[iUpper] + f[iMid]) >>> 1;
tUpper = tMid;
} else {
this.interpolatePrecisely (iLower, iMid, xyzf, xyzt);
this.interpolatePrecisely (iMid, iUpper, xyzf, xyzt);
return;
}}
x[iMid] = x[iLower];
y[iMid] = y[iUpper];
}, "~N,~N,~A,~A");
Clazz.defineMethod (c$, "renderFlatEndcap", 
 function (isCylinder, isPrecise, xyzf) {
var xT;
var yT;
var zT;
if (isPrecise) {
if (this.dzBf == 0 || !this.g3d.setC (this.colixEndcap)) return;
var xTf = this.xAf;
var yTf = this.yAf;
var zTf = this.zAf;
if (isCylinder && this.dzBf < 0) {
xTf += this.dxBf;
yTf += this.dyBf;
zTf += this.dzBf;
}xT = Clazz.floatToInt (xTf);
yT = Clazz.floatToInt (yTf);
zT = Clazz.floatToInt (zTf);
} else {
if (this.dzB == 0 || !this.g3d.setC (this.colixEndcap)) return;
xT = this.xA;
yT = this.yA;
zT = this.zA;
if (isCylinder && this.dzB < 0) {
xT += this.dxB;
yT += this.dyB;
zT += this.dzB;
}}var yMin = xyzf[1][0];
var yMax = xyzf[1][0];
var zXMin = 0;
var zXMax = 0;
var xr = xyzf[0];
var yr = xyzf[1];
var zr = xyzf[2];
for (var i = this.rasterCount; --i > 0; ) {
var y = yr[i];
if (y < yMin) yMin = y;
 else if (y > yMax) yMax = y;
 else {
y = -y;
if (y < yMin) yMin = y;
 else if (y > yMax) yMax = y;
}}
for (var y = yMin; y <= yMax; ++y) {
var xMin = 2147483647;
var xMax = -2147483648;
for (var i = this.rasterCount; --i >= 0; ) {
if (yr[i] == y) {
var x = xr[i];
if (x < xMin) {
xMin = x;
zXMin = zr[i];
}if (x > xMax) {
xMax = x;
zXMax = zr[i];
}}if (yr[i] == -y) {
var x = -xr[i];
if (x < xMin) {
xMin = x;
zXMin = -zr[i];
}if (x > xMax) {
xMax = x;
zXMax = -zr[i];
}}}
var count = xMax - xMin + 1;
this.g3d.setColorNoisy (this.endcapShadeIndex);
this.g3d.plotPixelsClippedRaster (count, xT + xMin, yT + y, zT - zXMin - 1, zT - zXMax - 1, null, null);
}
}, "~B,~B,~A");
Clazz.defineMethod (c$, "renderSphericalEndcaps", 
 function () {
if (this.colixA != 0 && this.g3d.setC (this.colixA)) this.g3d.fillSphereXYZ (this.diameter, this.xA, this.yA, this.zA + 1);
if (this.colixB != 0 && this.g3d.setC (this.colixB)) this.g3d.fillSphereXYZ (this.diameter, this.xA + this.dxB, this.yA + this.dyB, this.zA + this.dzB + 1);
});
Clazz.defineMethod (c$, "calcArgbEndcap", 
 function (tCylinder, isFloat) {
this.tEvenDiameter = ((this.diameter & 1) == 0);
this.radius = this.diameter / 2.0;
this.radius2 = this.radius * this.radius;
this.endCapHidden = false;
var dzf = (isFloat ? this.dzBf : this.dzB);
if (this.endcaps == 3 || dzf == 0) return;
this.xEndcap = this.xA;
this.yEndcap = this.yA;
this.zEndcap = this.zA;
var shadesEndcap;
var dxf = (isFloat ? this.dxBf : this.dxB);
var dyf = (isFloat ? this.dyBf : this.dyB);
if (dzf >= 0 || !tCylinder) {
this.endcapShadeIndex = this.shader.getShadeIndex (-dxf, -dyf, dzf);
this.colixEndcap = this.colixA;
shadesEndcap = this.shadesA;
} else {
this.endcapShadeIndex = this.shader.getShadeIndex (dxf, dyf, -dzf);
this.colixEndcap = this.colixB;
shadesEndcap = this.shadesB;
this.xEndcap += this.dxB;
this.yEndcap += this.dyB;
this.zEndcap += this.dzB;
}if (this.endcapShadeIndex > 56) this.endcapShadeIndex = 56;
this.argbEndcap = shadesEndcap[this.endcapShadeIndex];
this.endCapHidden = (this.endcaps == 1);
}, "~B,~B");
});
