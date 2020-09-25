Clazz.declarePackage ("J.g3d");
Clazz.load (["J.g3d.PrecisionRenderer", "java.util.Hashtable"], "J.g3d.LineRenderer", ["java.lang.Float", "JU.BS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.g3d = null;
this.shader = null;
this.lineBits = null;
this.slope = 0;
this.lineTypeX = false;
this.nBits = 0;
this.lineCache = null;
this.slopeKey = null;
this.x1t = 0;
this.y1t = 0;
this.z1t = 0;
this.x2t = 0;
this.y2t = 0;
this.z2t = 0;
Clazz.instantialize (this, arguments);
}, J.g3d, "LineRenderer", J.g3d.PrecisionRenderer);
Clazz.prepareFields (c$, function () {
this.lineCache =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (g3d) {
Clazz.superConstructor (this, J.g3d.LineRenderer, []);
this.g3d = g3d;
this.shader = g3d.shader;
}, "J.g3d.Graphics3D");
Clazz.defineMethod (c$, "setLineBits", 
function (dx, dy) {
this.slope = (dx != 0 ? dy / dx : dy >= 0 ? 3.4028235E38 : -3.4028235E38);
this.lineTypeX = (this.slope <= 1 && this.slope >= -1);
this.nBits = (this.lineTypeX ? this.g3d.width : this.g3d.height);
this.slopeKey = Float.$valueOf (this.slope);
if (this.lineCache.containsKey (this.slopeKey)) {
this.lineBits = this.lineCache.get (this.slopeKey);
return;
}this.lineBits = JU.BS.newN (this.nBits);
dy = Math.abs (dy);
dx = Math.abs (dx);
if (dy > dx) {
var t = dx;
dx = dy;
dy = t;
}var twoDError = 0;
var twoDx = dx + dx;
var twoDy = dy + dy;
for (var i = 0; i < this.nBits; i++) {
twoDError += twoDy;
if (twoDError > dx) {
this.lineBits.set (i);
twoDError -= twoDx;
}}
this.lineCache.put (this.slopeKey, this.lineBits);
}, "~N,~N");
Clazz.defineMethod (c$, "clearLineCache", 
function () {
this.lineCache.clear ();
});
Clazz.defineMethod (c$, "plotLineOld", 
function (argbA, argbB, xA, yA, zA, xB, yB, zB) {
this.x1t = xA;
this.x2t = xB;
this.y1t = yA;
this.y2t = yB;
this.z1t = zA;
this.z2t = zB;
var clipped = true;
switch (this.getTrimmedLineImpl ()) {
case 0:
clipped = false;
break;
case 2:
return;
}
this.plotLineClippedOld (argbA, argbB, xA, yA, zA, xB - xA, yB - yA, zB - zA, clipped, 0, 0);
}, "~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "plotLineDeltaOld", 
function (argbA, argbB, xA, yA, zA, dxBA, dyBA, dzBA, clipped) {
this.x1t = xA;
this.x2t = xA + dxBA;
this.y1t = yA;
this.y2t = yA + dyBA;
this.z1t = zA;
this.z2t = zA + dzBA;
if (clipped) switch (this.getTrimmedLineImpl ()) {
case 2:
return;
case 0:
clipped = false;
break;
}
this.plotLineClippedOld (argbA, argbB, xA, yA, zA, dxBA, dyBA, dzBA, clipped, 0, 0);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "plotLineDeltaAOld", 
function (shades1, shades2, screenMask, shadeIndex, x, y, z, dx, dy, dz, clipped) {
this.x1t = x;
this.x2t = x + dx;
this.y1t = y;
this.y2t = y + dy;
this.z1t = z;
this.z2t = z + dz;
if (clipped) switch (this.getTrimmedLineImpl ()) {
case 2:
return;
case 0:
clipped = false;
}
var zbuf = this.g3d.zbuf;
var width = this.g3d.width;
var runIndex = 0;
var rise = 2147483647;
var run = 1;
var offset = y * width + x;
var offsetMax = this.g3d.bufferSize;
var shadeIndexUp = (shadeIndex < 63 ? shadeIndex + 1 : shadeIndex);
var shadeIndexDn = (shadeIndex > 0 ? shadeIndex - 1 : shadeIndex);
var argb1 = shades1[shadeIndex];
var argb1Up = shades1[shadeIndexUp];
var argb1Dn = shades1[shadeIndexDn];
var argb2 = shades2[shadeIndex];
var argb2Up = shades2[shadeIndexUp];
var argb2Dn = shades2[shadeIndexDn];
var argb = argb1;
var p = this.g3d.pixel;
if (screenMask != 0) {
p = this.g3d.setScreened ((screenMask & 1) == 1);
this.g3d.currentShadeIndex = 0;
}if (argb != 0 && !clipped && offset >= 0 && offset < offsetMax && z < zbuf[offset]) p.addPixel (offset, z, argb);
if (dx == 0 && dy == 0) return;
var xIncrement = 1;
var yOffsetIncrement = width;
var x2 = x + dx;
var y2 = y + dy;
if (dx < 0) {
dx = -dx;
xIncrement = -1;
}if (dy < 0) {
dy = -dy;
yOffsetIncrement = -width;
}var twoDx = dx + dx;
var twoDy = dy + dy;
var zCurrentScaled = z << 10;
var argbUp = argb1Up;
var argbDn = argb1Dn;
if (dy <= dx) {
var roundingFactor = dx - 1;
if (dz < 0) roundingFactor = -roundingFactor;
var zIncrementScaled = Clazz.doubleToInt (((dz << 10) + roundingFactor) / dx);
var twoDxAccumulatedYError = 0;
var n1 = Math.abs (x2 - this.x2t) - 1;
var n2 = Math.abs (x2 - this.x1t) - 1;
for (var n = dx - 1, nMid = Clazz.doubleToInt (n / 2); --n >= n1; ) {
if (n == nMid) {
argb = argb2;
if (argb == 0) return;
argbUp = argb2Up;
argbDn = argb2Dn;
if (screenMask % 3 != 0) {
p = this.g3d.setScreened ((screenMask & 2) == 2);
this.g3d.currentShadeIndex = 0;
}}offset += xIncrement;
zCurrentScaled += zIncrementScaled;
twoDxAccumulatedYError += twoDy;
if (twoDxAccumulatedYError > dx) {
offset += yOffsetIncrement;
twoDxAccumulatedYError -= twoDx;
}if (argb != 0 && n < n2 && offset >= 0 && offset < offsetMax && runIndex < rise) {
var zCurrent = zCurrentScaled >> 10;
if (zCurrent < zbuf[offset]) {
var rand8 = this.shader.nextRandom8Bit ();
p.addPixel (offset, zCurrent, rand8 < 85 ? argbDn : (rand8 > 170 ? argbUp : argb));
}}runIndex = (runIndex + 1) % run;
}
} else {
var roundingFactor = dy - 1;
if (dz < 0) roundingFactor = -roundingFactor;
var zIncrementScaled = Clazz.doubleToInt (((dz << 10) + roundingFactor) / dy);
var twoDyAccumulatedXError = 0;
var n1 = Math.abs (y2 - this.y2t) - 1;
var n2 = Math.abs (y2 - this.y1t) - 1;
for (var n = dy - 1, nMid = Clazz.doubleToInt (n / 2); --n >= n1; ) {
if (n == nMid) {
argb = argb2;
if (argb == 0) return;
argbUp = argb2Up;
argbDn = argb2Dn;
if (screenMask % 3 != 0) {
p = this.g3d.setScreened ((screenMask & 2) == 2);
this.g3d.currentShadeIndex = 0;
}}offset += yOffsetIncrement;
zCurrentScaled += zIncrementScaled;
twoDyAccumulatedXError += twoDx;
if (twoDyAccumulatedXError > dy) {
offset += xIncrement;
twoDyAccumulatedXError -= twoDy;
}if (argb != 0 && n < n2 && offset >= 0 && offset < offsetMax && runIndex < rise) {
var zCurrent = zCurrentScaled >> 10;
if (zCurrent < zbuf[offset]) {
var rand8 = this.g3d.shader.nextRandom8Bit ();
p.addPixel (offset, zCurrent, rand8 < 85 ? argbDn : (rand8 > 170 ? argbUp : argb));
}}runIndex = (runIndex + 1) % run;
}
}}, "~A,~A,~N,~N,~N,~N,~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "plotLineDeltaABitsFloat", 
function (shades1, shades2, shadeIndex, ptA, ptB, screenMask, clipped) {
var x = Math.round (ptA.x);
var y = Math.round (ptA.y);
var z = Math.round (ptA.z);
var bx = Math.round (ptB.x);
var by = Math.round (ptB.y);
var bz = Math.round (ptB.z);
var dx = bx - x;
var dy = by - y;
this.x1t = x;
this.x2t = bx;
this.y1t = y;
this.y2t = by;
this.z1t = z;
this.z2t = bz;
if (clipped && this.getTrimmedLineImpl () == 2) return;
var zbuf = this.g3d.zbuf;
var width = this.g3d.width;
var runIndex = 0;
var rise = 2147483647;
var run = 1;
var shadeIndexUp = (shadeIndex < 63 ? shadeIndex + 1 : shadeIndex);
var shadeIndexDn = (shadeIndex > 0 ? shadeIndex - 1 : shadeIndex);
var argb1 = shades1[shadeIndex];
var argb1Up = shades1[shadeIndexUp];
var argb1Dn = shades1[shadeIndexDn];
var argb2 = shades2[shadeIndex];
var argb2Up = shades2[shadeIndexUp];
var argb2Dn = shades2[shadeIndexDn];
var offset = y * width + x;
var offsetMax = this.g3d.bufferSize;
var i0;
var iMid;
var i1;
var i2;
var iIncrement;
var xIncrement;
var yOffsetIncrement;
if (this.lineTypeX) {
i0 = x;
i1 = this.x1t;
i2 = this.x2t;
iMid = x + Clazz.doubleToInt (dx / 2);
iIncrement = (dx >= 0 ? 1 : -1);
xIncrement = iIncrement;
yOffsetIncrement = (dy >= 0 ? width : -width);
this.setRastABFloat (ptA.x, ptA.z, ptB.x, ptB.z);
} else {
i0 = y;
i1 = this.y1t;
i2 = this.y2t;
iMid = y + Clazz.doubleToInt (dy / 2);
iIncrement = (dy >= 0 ? 1 : -1);
xIncrement = (dy >= 0 ? width : -width);
yOffsetIncrement = (dx >= 0 ? 1 : -1);
this.setRastABFloat (ptA.y, ptA.z, ptB.y, ptB.z);
}var zCurrent = z;
var argb = argb1;
var argbUp = argb1Up;
var argbDn = argb1Dn;
var isInWindow = false;
var p = this.g3d.pixel;
if (screenMask != 0) {
p = this.g3d.setScreened ((screenMask & 1) == 1);
this.g3d.currentShadeIndex = 0;
}for (var i = i0, iBits = i0; ; i += iIncrement, iBits += iIncrement) {
if (i == i1) isInWindow = true;
if (i == iMid) {
argb = argb2;
if (argb == 0) return;
argbUp = argb2Up;
argbDn = argb2Dn;
if (screenMask % 3 != 0) {
p = this.g3d.setScreened ((screenMask & 2) == 2);
this.g3d.currentShadeIndex = 0;
}}if (argb != 0 && isInWindow && offset >= 0 && offset < offsetMax && runIndex < rise) {
zCurrent = this.getZCurrent (this.a, this.b, i);
if (zCurrent < zbuf[offset]) {
var rand8 = this.shader.nextRandom8Bit ();
p.addPixel (offset, Clazz.floatToInt (zCurrent), rand8 < 85 ? argbDn : (rand8 > 170 ? argbUp : argb));
}}if (i == i2) break;
runIndex = (runIndex + 1) % run;
offset += xIncrement;
while (iBits < 0) iBits += this.nBits;

if (this.lineBits.get (iBits % this.nBits)) {
offset += yOffsetIncrement;
}}
}, "~A,~A,~N,JU.P3,JU.P3,~N,~B");
Clazz.defineMethod (c$, "plotLineDeltaABitsInt", 
function (shades1, shades2, shadeIndex, ptA, ptB, screenMask, clipped) {
var x = ptA.x;
var y = ptA.y;
var z = ptA.z;
var bx = ptB.x;
var by = ptB.y;
var bz = ptB.z;
var dx = bx - x;
var dy = by - y;
this.x1t = x;
this.x2t = bx;
this.y1t = y;
this.y2t = by;
this.z1t = z;
this.z2t = bz;
if (clipped && this.getTrimmedLineImpl () == 2) return;
var zbuf = this.g3d.zbuf;
var width = this.g3d.width;
var runIndex = 0;
var rise = 2147483647;
var run = 1;
var shadeIndexUp = (shadeIndex < 63 ? shadeIndex + 1 : shadeIndex);
var shadeIndexDn = (shadeIndex > 0 ? shadeIndex - 1 : shadeIndex);
var argb1 = shades1[shadeIndex];
var argb1Up = shades1[shadeIndexUp];
var argb1Dn = shades1[shadeIndexDn];
var argb2 = shades2[shadeIndex];
var argb2Up = shades2[shadeIndexUp];
var argb2Dn = shades2[shadeIndexDn];
var offset = y * width + x;
var offsetMax = this.g3d.bufferSize;
var i0;
var iMid;
var i1;
var i2;
var iIncrement;
var xIncrement;
var yOffsetIncrement;
if (this.lineTypeX) {
i0 = x;
i1 = this.x1t;
i2 = this.x2t;
iMid = x + Clazz.doubleToInt (dx / 2);
iIncrement = (dx >= 0 ? 1 : -1);
xIncrement = iIncrement;
yOffsetIncrement = (dy >= 0 ? width : -width);
this.setRastAB (ptA.x, ptA.z, ptB.x, ptB.z);
} else {
i0 = y;
i1 = this.y1t;
i2 = this.y2t;
iMid = y + Clazz.doubleToInt (dy / 2);
iIncrement = (dy >= 0 ? 1 : -1);
xIncrement = (dy >= 0 ? width : -width);
yOffsetIncrement = (dx >= 0 ? 1 : -1);
this.setRastAB (ptA.y, ptA.z, ptB.y, ptB.z);
}var zCurrent = z;
var argb = argb1;
var argbUp = argb1Up;
var argbDn = argb1Dn;
var isInWindow = false;
var p = this.g3d.pixel;
if (screenMask != 0) {
p = this.g3d.setScreened ((screenMask & 1) == 1);
this.g3d.currentShadeIndex = 0;
}for (var i = i0, iBits = i0; ; i += iIncrement, iBits += iIncrement) {
if (i == i1) isInWindow = true;
if (i == iMid) {
argb = argb2;
if (argb == 0) return;
argbUp = argb2Up;
argbDn = argb2Dn;
if (screenMask % 3 != 0) {
p = this.g3d.setScreened ((screenMask & 2) == 2);
this.g3d.currentShadeIndex = 0;
}}if (argb != 0 && isInWindow && offset >= 0 && offset < offsetMax && runIndex < rise) {
zCurrent = this.getZCurrent (this.a, this.b, i);
if (zCurrent < zbuf[offset]) {
var rand8 = this.shader.nextRandom8Bit ();
p.addPixel (offset, Clazz.floatToInt (zCurrent), rand8 < 85 ? argbDn : (rand8 > 170 ? argbUp : argb));
}}if (i == i2) break;
runIndex = (runIndex + 1) % run;
offset += xIncrement;
while (iBits < 0) iBits += this.nBits;

if (this.lineBits.get (iBits % this.nBits)) {
offset += yOffsetIncrement;
}}
}, "~A,~A,~N,JU.P3i,JU.P3i,~N,~B");
Clazz.defineMethod (c$, "plotLineBits", 
function (argbA, argbB, ptA, ptB, run, rise, andClip) {
if (ptA.z <= 1 || ptB.z <= 1) return;
var clipped = true;
this.x1t = ptA.x;
this.y1t = ptA.y;
this.z1t = ptA.z;
this.x2t = ptB.x;
this.y2t = ptB.y;
this.z2t = ptB.z;
switch (this.getTrimmedLineImpl ()) {
case 2:
return;
case 0:
clipped = false;
break;
default:
if (andClip) {
ptA.set (this.x1t, this.y1t, this.z1t);
ptB.set (this.x2t, this.y2t, this.z2t);
}}
var zbuf = this.g3d.zbuf;
var width = this.g3d.width;
var runIndex = 0;
if (run == 0) {
rise = 2147483647;
run = 1;
}var x = ptA.x;
var y = ptA.y;
var z = ptA.z;
var dx = ptB.x - x;
var x2 = x + dx;
var dy = ptB.y - y;
var y2 = y + dy;
var offset = y * width + x;
var offsetMax = this.g3d.bufferSize;
var argb = argbA;
var p = this.g3d.pixel;
if (argb != 0 && !clipped && offset >= 0 && offset < offsetMax && z < zbuf[offset]) p.addPixel (offset, z, argb);
if (dx == 0 && dy == 0) return;
var xIncrement = 1;
var yIncrement = 1;
var yOffsetIncrement = width;
if (dx < 0) {
dx = -dx;
xIncrement = -1;
}if (dy < 0) {
dy = -dy;
yOffsetIncrement = -width;
yIncrement = -1;
}var twoDx = dx + dx;
var twoDy = dy + dy;
if (dy <= dx) {
this.setRastAB (ptA.x, ptA.z, ptB.x, ptB.z);
var twoDxAccumulatedYError = 0;
var n1 = Math.abs (x2 - this.x2t) - 1;
var n2 = Math.abs (x2 - this.x1t) - 1;
for (var n = dx - 1, nMid = Clazz.doubleToInt (n / 2); --n >= n1; ) {
if (n == nMid) {
argb = argbB;
if (argb == 0) return;
}offset += xIncrement;
x += xIncrement;
twoDxAccumulatedYError += twoDy;
if (twoDxAccumulatedYError > dx) {
offset += yOffsetIncrement;
twoDxAccumulatedYError -= twoDx;
}if (argb != 0 && n < n2 && offset >= 0 && offset < offsetMax && runIndex < rise) {
var zCurrent = this.getZCurrent (this.a, this.b, x);
if (zCurrent < zbuf[offset]) p.addPixel (offset, zCurrent, argb);
}runIndex = (runIndex + 1) % run;
}
} else {
this.setRastAB (ptA.y, ptA.z, ptB.y, ptB.z);
var twoDyAccumulatedXError = 0;
var n1 = Math.abs (y2 - this.y2t) - 1;
var n2 = Math.abs (y2 - this.y1t) - 1;
for (var n = dy - 1, nMid = Clazz.doubleToInt (n / 2); --n >= n1; ) {
if (n == nMid) {
argb = argbB;
if (argb == 0) return;
}offset += yOffsetIncrement;
y += yIncrement;
twoDyAccumulatedXError += twoDx;
if (twoDyAccumulatedXError > dy) {
offset += xIncrement;
twoDyAccumulatedXError -= twoDy;
}if (argb != 0 && n < n2 && offset >= 0 && offset < offsetMax && runIndex < rise) {
var zCurrent = this.getZCurrent (this.a, this.b, y);
if (zCurrent < zbuf[offset]) p.addPixel (offset, zCurrent, argb);
}runIndex = (runIndex + 1) % run;
}
}}, "~N,~N,JU.P3i,JU.P3i,~N,~N,~B");
Clazz.defineMethod (c$, "getTrimmedLineImpl", 
 function () {
var cc1 = this.g3d.clipCode3 (this.x1t, this.y1t, this.z1t);
var cc2 = this.g3d.clipCode3 (this.x2t, this.y2t, this.z2t);
var c = (cc1 | cc2);
if ((cc1 | cc2) == 0) return 0;
if (c == -1) return 2;
var xLast = this.g3d.xLast;
var yLast = this.g3d.yLast;
var slab = this.g3d.slab;
var depth = this.g3d.depth;
do {
if ((cc1 & cc2) != 0) return 2;
var dx = this.x2t - this.x1t;
var dy = this.y2t - this.y1t;
var dz = this.z2t - this.z1t;
if (cc1 != 0) {
if ((cc1 & 8) != 0) {
this.y1t += Clazz.floatToInt ((-this.x1t * dy) / dx);
this.z1t += Clazz.floatToInt ((-this.x1t * dz) / dx);
this.x1t = 0;
} else if ((cc1 & 4) != 0) {
this.y1t += Clazz.floatToInt (((xLast - this.x1t) * dy) / dx);
this.z1t += Clazz.floatToInt (((xLast - this.x1t) * dz) / dx);
this.x1t = xLast;
} else if ((cc1 & 2) != 0) {
this.x1t += Clazz.floatToInt ((-this.y1t * dx) / dy);
this.z1t += Clazz.floatToInt ((-this.y1t * dz) / dy);
this.y1t = 0;
} else if ((cc1 & 1) != 0) {
this.x1t += Clazz.floatToInt (((yLast - this.y1t) * dx) / dy);
this.z1t += Clazz.floatToInt (((yLast - this.y1t) * dz) / dy);
this.y1t = yLast;
} else if ((cc1 & 32) != 0) {
this.x1t += Clazz.floatToInt (((slab - this.z1t) * dx) / dz);
this.y1t += Clazz.floatToInt (((slab - this.z1t) * dy) / dz);
this.z1t = slab;
} else {
this.x1t += Clazz.floatToInt (((depth - this.z1t) * dx) / dz);
this.y1t += Clazz.floatToInt (((depth - this.z1t) * dy) / dz);
this.z1t = depth;
}cc1 = this.g3d.clipCode3 (this.x1t, this.y1t, this.z1t);
} else {
if ((cc2 & 8) != 0) {
this.y2t += Clazz.floatToInt ((-this.x2t * dy) / dx);
this.z2t += Clazz.floatToInt ((-this.x2t * dz) / dx);
this.x2t = 0;
} else if ((cc2 & 4) != 0) {
this.y2t += Clazz.floatToInt (((xLast - this.x2t) * dy) / dx);
this.z2t += Clazz.floatToInt (((xLast - this.x2t) * dz) / dx);
this.x2t = xLast;
} else if ((cc2 & 2) != 0) {
this.x2t += Clazz.floatToInt ((-this.y2t * dx) / dy);
this.z2t += Clazz.floatToInt ((-this.y2t * dz) / dy);
this.y2t = 0;
} else if ((cc2 & 1) != 0) {
this.x2t += Clazz.floatToInt (((yLast - this.y2t) * dx) / dy);
this.z2t += Clazz.floatToInt (((yLast - this.y2t) * dz) / dy);
this.y2t = yLast;
} else if ((cc2 & 32) != 0) {
this.x2t += Clazz.floatToInt (((slab - this.z2t) * dx) / dz);
this.y2t += Clazz.floatToInt (((slab - this.z2t) * dy) / dz);
this.z2t = slab;
} else {
this.x2t += Clazz.floatToInt (((depth - this.z2t) * dx) / dz);
this.y2t += Clazz.floatToInt (((depth - this.z2t) * dy) / dz);
this.z2t = depth;
}cc2 = this.g3d.clipCode3 (this.x2t, this.y2t, this.z2t);
}} while ((cc1 | cc2) != 0);
return 1;
});
Clazz.defineMethod (c$, "plotLineClippedOld", 
 function (argb1, argb2, x, y, z, dx, dy, dz, clipped, run, rise) {
var zbuf = this.g3d.zbuf;
var width = this.g3d.width;
var runIndex = 0;
if (run == 0) {
rise = 2147483647;
run = 1;
}var offset = y * width + x;
var offsetMax = this.g3d.bufferSize;
var argb = argb1;
var p = this.g3d.pixel;
if (argb != 0 && !clipped && offset >= 0 && offset < offsetMax && z < zbuf[offset]) p.addPixel (offset, z, argb);
if (dx == 0 && dy == 0) return;
var xIncrement = 1;
var yOffsetIncrement = width;
var x2 = x + dx;
var y2 = y + dy;
if (dx < 0) {
dx = -dx;
xIncrement = -1;
}if (dy < 0) {
dy = -dy;
yOffsetIncrement = -width;
}var twoDx = dx + dx;
var twoDy = dy + dy;
var zCurrentScaled = z << 10;
if (dy <= dx) {
var roundingFactor = dx - 1;
if (dz < 0) roundingFactor = -roundingFactor;
var zIncrementScaled = Clazz.doubleToInt (((dz << 10) + roundingFactor) / dx);
var twoDxAccumulatedYError = 0;
var n1 = Math.abs (x2 - this.x2t) - 1;
var n2 = Math.abs (x2 - this.x1t) - 1;
for (var n = dx - 1, nMid = Clazz.doubleToInt (n / 2); --n >= n1; ) {
if (n == nMid) {
argb = argb2;
if (argb == 0) return;
}offset += xIncrement;
zCurrentScaled += zIncrementScaled;
twoDxAccumulatedYError += twoDy;
if (twoDxAccumulatedYError > dx) {
offset += yOffsetIncrement;
twoDxAccumulatedYError -= twoDx;
}if (argb != 0 && n < n2 && offset >= 0 && offset < offsetMax && runIndex < rise) {
var zCurrent = zCurrentScaled >> 10;
if (zCurrent < zbuf[offset]) p.addPixel (offset, zCurrent, argb);
}runIndex = (runIndex + 1) % run;
}
} else {
var roundingFactor = dy - 1;
if (dz < 0) roundingFactor = -roundingFactor;
var zIncrementScaled = Clazz.doubleToInt (((dz << 10) + roundingFactor) / dy);
var twoDyAccumulatedXError = 0;
var n1 = Math.abs (y2 - this.y2t) - 1;
var n2 = Math.abs (y2 - this.y1t) - 1;
for (var n = dy - 1, nMid = Clazz.doubleToInt (n / 2); --n >= n1; ) {
if (n == nMid) {
argb = argb2;
if (argb == 0) return;
}offset += yOffsetIncrement;
zCurrentScaled += zIncrementScaled;
twoDyAccumulatedXError += twoDx;
if (twoDyAccumulatedXError > dy) {
offset += xIncrement;
twoDyAccumulatedXError -= twoDy;
}if (argb != 0 && n < n2 && offset >= 0 && offset < offsetMax && runIndex < rise) {
var zCurrent = zCurrentScaled >> 10;
if (zCurrent < zbuf[offset]) p.addPixel (offset, zCurrent, argb);
}runIndex = (runIndex + 1) % run;
}
}}, "~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N");
Clazz.defineStatics (c$,
"VISIBILITY_UNCLIPPED", 0,
"VISIBILITY_CLIPPED", 1,
"VISIBILITY_OFFSCREEN", 2);
});
