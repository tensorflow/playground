Clazz.declarePackage ("J.g3d");
Clazz.load (["J.g3d.G3DRenderer", "JU.P3", "$.V3"], "J.g3d.HermiteRenderer", ["JU.Lst", "$.P3i"], function () {
c$ = Clazz.decorateAsClass (function () {
this.g3d = null;
this.gdata = null;
this.pLeft = null;
this.pRight = null;
this.sLeft = null;
this.sRight = null;
this.pTopLeft = null;
this.pTopRight = null;
this.pBotLeft = null;
this.pBotRight = null;
this.a1 = null;
this.a2 = null;
this.b1 = null;
this.b2 = null;
this.c1 = null;
this.c2 = null;
this.d1 = null;
this.d2 = null;
this.T1 = null;
this.T2 = null;
this.depth1 = null;
this.needToFill = null;
Clazz.instantialize (this, arguments);
}, J.g3d, "HermiteRenderer", null, J.g3d.G3DRenderer);
Clazz.prepareFields (c$, function () {
this.pLeft =  new Array (16);
this.pRight =  new Array (16);
this.sLeft =  Clazz.newFloatArray (16, 0);
this.sRight =  Clazz.newFloatArray (16, 0);
this.pTopLeft =  new Array (16);
this.pTopRight =  new Array (16);
this.pBotLeft =  new Array (16);
this.pBotRight =  new Array (16);
{
for (var i = 16; --i >= 0; ) {
this.pLeft[i] =  new JU.P3i ();
this.pRight[i] =  new JU.P3i ();
this.pTopLeft[i] =  new JU.P3 ();
this.pTopRight[i] =  new JU.P3 ();
this.pBotLeft[i] =  new JU.P3 ();
this.pBotRight[i] =  new JU.P3 ();
}
}this.a1 =  new JU.P3 ();
this.a2 =  new JU.P3 ();
this.b1 =  new JU.P3 ();
this.b2 =  new JU.P3 ();
this.c1 =  new JU.P3 ();
this.c2 =  new JU.P3 ();
this.d1 =  new JU.P3 ();
this.d2 =  new JU.P3 ();
this.T1 =  new JU.V3 ();
this.T2 =  new JU.V3 ();
this.depth1 =  new JU.V3 ();
this.needToFill =  Clazz.newBooleanArray (16, false);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (g3d, gdata) {
this.g3d = g3d;
this.gdata = gdata;
return this;
}, "J.api.JmolRendererInterface,JU.GData");
Clazz.defineMethod (c$, "renderHermiteRope", 
function (fill, tension, diameterBeg, diameterMid, diameterEnd, p0, p1, p2, p3) {
var z1 = Clazz.floatToInt (p1.z);
var z2 = Clazz.floatToInt (p2.z);
if (p0.z == 1 || z1 == 1 || z2 == 1 || p3.z == 1) return;
if (this.gdata.isClippedZ (z1) || this.gdata.isClippedZ (z2)) return;
var x1 = Clazz.floatToInt (p1.x);
var y1 = Clazz.floatToInt (p1.y);
var x2 = Clazz.floatToInt (p2.x);
var y2 = Clazz.floatToInt (p2.y);
var xT1 = Clazz.doubleToInt (((x2 - Clazz.floatToInt (p0.x)) * tension) / 8);
var yT1 = Clazz.doubleToInt (((y2 - Clazz.floatToInt (p0.y)) * tension) / 8);
var zT1 = Clazz.doubleToInt (((z2 - Clazz.floatToInt (p0.z)) * tension) / 8);
var xT2 = Clazz.doubleToInt (((Clazz.floatToInt (p3.x) - x1) * tension) / 8);
var yT2 = Clazz.doubleToInt (((Clazz.floatToInt (p3.y) - y1) * tension) / 8);
var zT2 = Clazz.doubleToInt (((Clazz.floatToInt (p3.z) - z1) * tension) / 8);
this.sLeft[0] = 0;
this.pLeft[0].set (x1, y1, z1);
this.sRight[0] = 1;
this.pRight[0].set (x2, y2, z2);
var sp = 0;
var dDiameterFirstHalf = 0;
var dDiameterSecondHalf = 0;
if (fill) {
dDiameterFirstHalf = 2 * (diameterMid - diameterBeg);
dDiameterSecondHalf = 2 * (diameterEnd - diameterMid);
}do {
var a = this.pLeft[sp];
var b = this.pRight[sp];
var dx = b.x - a.x;
if (dx >= -1 && dx <= 1) {
var dy = b.y - a.y;
if (dy >= -1 && dy <= 1) {
var s = this.sLeft[sp];
if (fill) {
var d = (s < 0.5 ? diameterBeg + Clazz.floatToInt (dDiameterFirstHalf * s) : diameterMid + Clazz.floatToInt (dDiameterSecondHalf * (s - 0.5)));
this.g3d.fillSphereI (d, a);
} else {
this.g3d.plotPixelClippedP3i (a);
}--sp;
continue;
}}var s = (this.sLeft[sp] + this.sRight[sp]) / 2;
var s2 = s * s;
var s3 = s2 * s;
var h1 = 2 * s3 - 3 * s2 + 1;
var h2 = -2 * s3 + 3 * s2;
var h3 = s3 - 2 * s2 + s;
var h4 = s3 - s2;
if (sp >= 15) break;
var pMid = this.pRight[sp + 1];
pMid.x = Clazz.doubleToInt (h1 * x1 + h2 * x2 + h3 * xT1 + h4 * xT2);
pMid.y = Clazz.doubleToInt (h1 * y1 + h2 * y2 + h3 * yT1 + h4 * yT2);
pMid.z = Clazz.doubleToInt (h1 * z1 + h2 * z2 + h3 * zT1 + h4 * zT2);
this.pRight[sp + 1] = this.pRight[sp];
this.sRight[sp + 1] = this.sRight[sp];
this.pRight[sp] = pMid;
this.sRight[sp] = s;
++sp;
this.pLeft[sp].setT (pMid);
this.sLeft[sp] = s;
} while (sp >= 0);
}, "~B,~N,~N,~N,~N,JU.P3,JU.P3,JU.P3,JU.P3");
Clazz.defineMethod (c$, "renderHermiteRibbon", 
function (fill, border, tension, p0, p1, p2, p3, p4, p5, p6, p7, aspectRatio, fillType) {
if (p0.z == 1 || p1.z == 1 || p2.z == 1 || p3.z == 1 || p4.z == 1 || p5.z == 1 || p6.z == 1 || p7.z == 1) return;
if (!fill) {
tension = Math.abs (tension);
this.renderParallelPair (fill, tension, p0, p1, p2, p3, p4, p5, p6, p7);
return;
}var isRev = (tension < 0);
if (isRev) tension = -tension;
var ratio = 1 / aspectRatio;
var x1 = Clazz.floatToInt (p1.x);
var y1 = Clazz.floatToInt (p1.y);
var z1 = Clazz.floatToInt (p1.z);
var x2 = Clazz.floatToInt (p2.x);
var y2 = Clazz.floatToInt (p2.y);
var z2 = Clazz.floatToInt (p2.z);
var xT1 = Clazz.doubleToInt (((x2 - Clazz.floatToInt (p0.x)) * tension) / 8);
var yT1 = Clazz.doubleToInt (((y2 - Clazz.floatToInt (p0.y)) * tension) / 8);
var zT1 = Clazz.doubleToInt (((z2 - Clazz.floatToInt (p0.z)) * tension) / 8);
var xT2 = Clazz.doubleToInt (((Clazz.floatToInt (p3.x) - x1) * tension) / 8);
var yT2 = Clazz.doubleToInt (((Clazz.floatToInt (p3.y) - y1) * tension) / 8);
var zT2 = Clazz.doubleToInt (((Clazz.floatToInt (p3.z) - z1) * tension) / 8);
this.pTopLeft[0].set (x1, y1, z1);
this.pTopRight[0].set (x2, y2, z2);
var x5 = Clazz.floatToInt (p5.x);
var y5 = Clazz.floatToInt (p5.y);
var z5 = Clazz.floatToInt (p5.z);
var x6 = Clazz.floatToInt (p6.x);
var y6 = Clazz.floatToInt (p6.y);
var z6 = Clazz.floatToInt (p6.z);
var xT5 = Clazz.doubleToInt (((x6 - Clazz.floatToInt (p4.x)) * tension) / 8);
var yT5 = Clazz.doubleToInt (((y6 - Clazz.floatToInt (p4.y)) * tension) / 8);
var zT5 = Clazz.doubleToInt (((z6 - Clazz.floatToInt (p4.z)) * tension) / 8);
var xT6 = Clazz.doubleToInt (((Clazz.floatToInt (p7.x) - x5) * tension) / 8);
var yT6 = Clazz.doubleToInt (((Clazz.floatToInt (p7.y) - y5) * tension) / 8);
var zT6 = Clazz.doubleToInt (((Clazz.floatToInt (p7.z) - z5) * tension) / 8);
this.pBotLeft[0].set (x5, y5, z5);
this.pBotRight[0].set (x6, y6, z6);
this.sLeft[0] = 0;
this.sRight[0] = 1;
this.needToFill[0] = true;
var sp = 0;
var closeEnd = false;
do {
var a = this.pTopLeft[sp];
var b = this.pTopRight[sp];
var dxTop = b.x - a.x;
var dxTop2 = dxTop * dxTop;
if (dxTop2 < 10) {
var dyTop = b.y - a.y;
var dyTop2 = dyTop * dyTop;
if (dyTop2 < 10) {
var c = this.pBotLeft[sp];
var d = this.pBotRight[sp];
var dxBot = d.x - c.x;
var dxBot2 = dxBot * dxBot;
if (dxBot2 < 8) {
var dyBot = d.y - c.y;
var dyBot2 = dyBot * dyBot;
if (dyBot2 < 8) {
if (border) {
this.g3d.fillSphereBits (3, a);
this.g3d.fillSphereBits (3, c);
}if (this.needToFill[sp]) {
if (aspectRatio > 0) {
this.T1.sub2 (a, c);
this.T1.scale (ratio);
this.T2.sub2 (a, b);
this.depth1.cross (this.T1, this.T2);
this.depth1.scale (this.T1.length () / this.depth1.length ());
this.a1.add2 (a, this.depth1);
this.a2.sub2 (a, this.depth1);
this.b1.add2 (b, this.depth1);
this.b2.sub2 (b, this.depth1);
this.c1.add2 (c, this.depth1);
this.c2.sub2 (c, this.depth1);
this.d1.add2 (d, this.depth1);
this.d2.sub2 (d, this.depth1);
this.g3d.fillQuadrilateral (this.a1, this.b1, this.d1, this.c1, false);
this.g3d.fillQuadrilateral (this.a2, this.b2, this.d2, this.c2, false);
this.g3d.fillQuadrilateral (this.a1, this.b1, this.b2, this.a2, false);
this.g3d.fillQuadrilateral (this.c1, this.d1, this.d2, this.c2, false);
closeEnd = true;
} else {
if (fillType == 0) {
if (isRev) this.g3d.fillQuadrilateral (c, d, b, a, false);
 else this.g3d.fillQuadrilateral (a, b, d, c, false);
} else {
if (isRev) {
if (fillType != J.g3d.HermiteRenderer.isFront (a, b, d)) this.g3d.fillTriangle3f (a, b, d, false);
if (fillType != J.g3d.HermiteRenderer.isFront (a, d, c)) this.g3d.fillTriangle3f (a, d, c, false);
} else {
if (fillType == J.g3d.HermiteRenderer.isFront (a, b, d)) this.g3d.fillTriangle3f (a, b, d, false);
if (fillType == J.g3d.HermiteRenderer.isFront (a, d, c)) this.g3d.fillTriangle3f (a, d, c, false);
}}}this.needToFill[sp] = false;
}if (dxTop2 + dyTop2 < 2 && dxBot2 + dyBot2 < 2) {
--sp;
continue;
}}}}}var s = (this.sLeft[sp] + this.sRight[sp]) / 2;
var s2 = s * s;
var s3 = s2 * s;
var h1 = 2 * s3 - 3 * s2 + 1;
var h2 = -2 * s3 + 3 * s2;
var h3 = s3 - 2 * s2 + s;
var h4 = s3 - s2;
if (sp >= 15) break;
var spNext = sp + 1;
var pMidTop = this.pTopRight[spNext];
pMidTop.x = (h1 * x1 + h2 * x2 + h3 * xT1 + h4 * xT2);
pMidTop.y = (h1 * y1 + h2 * y2 + h3 * yT1 + h4 * yT2);
pMidTop.z = (h1 * z1 + h2 * z2 + h3 * zT1 + h4 * zT2);
var pMidBot = this.pBotRight[spNext];
pMidBot.x = (h1 * x5 + h2 * x6 + h3 * xT5 + h4 * xT6);
pMidBot.y = (h1 * y5 + h2 * y6 + h3 * yT5 + h4 * yT6);
pMidBot.z = (h1 * z5 + h2 * z6 + h3 * zT5 + h4 * zT6);
this.pTopRight[spNext] = this.pTopRight[sp];
this.pTopRight[sp] = pMidTop;
this.pBotRight[spNext] = this.pBotRight[sp];
this.pBotRight[sp] = pMidBot;
this.sRight[spNext] = this.sRight[sp];
this.sRight[sp] = s;
this.needToFill[spNext] = this.needToFill[sp];
this.pTopLeft[spNext].setT (pMidTop);
this.pBotLeft[spNext].setT (pMidBot);
this.sLeft[spNext] = s;
++sp;
} while (sp >= 0);
if (closeEnd) {
this.a1.z += 1;
this.c1.z += 1;
this.c2.z += 1;
this.a2.z += 1;
this.g3d.fillQuadrilateral (this.a1, this.c1, this.c2, this.a2, false);
}}, "~B,~B,~N,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,~N,~N");
c$.isFront = Clazz.defineMethod (c$, "isFront", 
 function (a, b, c) {
J.g3d.HermiteRenderer.vAB.sub2 (b, a);
J.g3d.HermiteRenderer.vAC.sub2 (c, a);
J.g3d.HermiteRenderer.vAB.cross (J.g3d.HermiteRenderer.vAB, J.g3d.HermiteRenderer.vAC);
return (J.g3d.HermiteRenderer.vAB.z < 0 ? -1 : 1);
}, "JU.P3,JU.P3,JU.P3");
Clazz.defineMethod (c$, "renderParallelPair", 
 function (fill, tension, p0, p1, p2, p3, p4, p5, p6, p7) {
var endPoints =  Clazz.newArray (-1, [p2, p1, p6, p5]);
var points =  new JU.Lst ();
var whichPoint = 0;
var numTopStrandPoints = 2;
var numPointsPerSegment = 5.0;
var interval = (1.0 / numPointsPerSegment);
var currentInt = 0.0;
var x1 = Clazz.floatToInt (p1.x);
var y1 = Clazz.floatToInt (p1.y);
var z1 = Clazz.floatToInt (p1.z);
var x2 = Clazz.floatToInt (p2.x);
var y2 = Clazz.floatToInt (p2.y);
var z2 = Clazz.floatToInt (p2.z);
var xT1 = Clazz.doubleToInt (((x2 - Clazz.floatToInt (p0.x)) * tension) / 8);
var yT1 = Clazz.doubleToInt (((y2 - Clazz.floatToInt (p0.y)) * tension) / 8);
var zT1 = Clazz.doubleToInt (((z2 - Clazz.floatToInt (p0.z)) * tension) / 8);
var xT2 = Clazz.doubleToInt (((Clazz.floatToInt (p3.x) - x1) * tension) / 8);
var yT2 = Clazz.doubleToInt (((Clazz.floatToInt (p3.y) - y1) * tension) / 8);
var zT2 = Clazz.doubleToInt (((Clazz.floatToInt (p3.z) - z1) * tension) / 8);
this.sLeft[0] = 0;
this.pLeft[0].set (x1, y1, z1);
this.sRight[0] = 1;
this.pRight[0].set (x2, y2, z2);
var sp = 0;
for (var strands = 2; strands > 0; strands--) {
if (strands == 1) {
x1 = Clazz.floatToInt (p5.x);
y1 = Clazz.floatToInt (p5.y);
z1 = Clazz.floatToInt (p5.z);
x2 = Clazz.floatToInt (p6.x);
y2 = Clazz.floatToInt (p6.y);
z2 = Clazz.floatToInt (p6.z);
xT1 = Clazz.doubleToInt (((x2 - Clazz.floatToInt (p4.x)) * tension) / 8);
yT1 = Clazz.doubleToInt (((y2 - Clazz.floatToInt (p4.y)) * tension) / 8);
zT1 = Clazz.doubleToInt (((z2 - Clazz.floatToInt (p4.z)) * tension) / 8);
xT2 = Clazz.doubleToInt (((Clazz.floatToInt (p7.x) - x1) * tension) / 8);
yT2 = Clazz.doubleToInt (((Clazz.floatToInt (p7.y) - y1) * tension) / 8);
zT2 = Clazz.doubleToInt (((Clazz.floatToInt (p7.z) - z1) * tension) / 8);
this.sLeft[0] = 0;
this.pLeft[0].set (x1, y1, z1);
this.sRight[0] = 1;
this.pRight[0].set (x2, y2, z2);
sp = 0;
}points.addLast (endPoints[whichPoint++]);
currentInt = interval;
do {
var a = this.pLeft[sp];
var b = this.pRight[sp];
var dx = b.x - a.x;
var dy = b.y - a.y;
var dist2 = dx * dx + dy * dy;
if (dist2 <= 2) {
var s = this.sLeft[sp];
this.g3d.fillSphereI (3, a);
if (s < 1.0 - currentInt) {
var temp =  new JU.P3 ();
temp.set (a.x, a.y, a.z);
points.addLast (temp);
currentInt += interval;
if (strands == 2) {
numTopStrandPoints++;
}}--sp;
} else {
var s = (this.sLeft[sp] + this.sRight[sp]) / 2;
var s2 = s * s;
var s3 = s2 * s;
var h1 = 2 * s3 - 3 * s2 + 1;
var h2 = -2 * s3 + 3 * s2;
var h3 = s3 - 2 * s2 + s;
var h4 = s3 - s2;
if (sp >= 15) break;
var pMid = this.pRight[sp + 1];
pMid.x = Clazz.doubleToInt (h1 * x1 + h2 * x2 + h3 * xT1 + h4 * xT2);
pMid.y = Clazz.doubleToInt (h1 * y1 + h2 * y2 + h3 * yT1 + h4 * yT2);
pMid.z = Clazz.doubleToInt (h1 * z1 + h2 * z2 + h3 * zT1 + h4 * zT2);
this.pRight[sp + 1] = this.pRight[sp];
this.sRight[sp + 1] = this.sRight[sp];
this.pRight[sp] = pMid;
this.sRight[sp] = s;
++sp;
this.pLeft[sp].setT (pMid);
this.sLeft[sp] = s;
}} while (sp >= 0);
points.addLast (endPoints[whichPoint++]);
}
var size = points.size ();
for (var top = 0; top < numTopStrandPoints && (top + numTopStrandPoints) < size; top++) this.g3d.drawLineAB (points.get (top), points.get (top + numTopStrandPoints));

}, "~B,~N,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3");
c$.vAB = c$.prototype.vAB =  new JU.V3 ();
c$.vAC = c$.prototype.vAC =  new JU.V3 ();
});
