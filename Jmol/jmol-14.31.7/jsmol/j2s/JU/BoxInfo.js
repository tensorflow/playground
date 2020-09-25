Clazz.declarePackage ("JU");
Clazz.load (["JU.P3", "$.V3"], "JU.BoxInfo", ["JU.Point3fi"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bbCorner0 = null;
this.bbCorner1 = null;
this.bbCenter = null;
this.bbVector = null;
this.bbVertices = null;
this.isScaleSet = false;
this.margin = 0;
Clazz.instantialize (this, arguments);
}, JU, "BoxInfo");
Clazz.prepareFields (c$, function () {
this.bbCorner0 =  new JU.P3 ();
this.bbCorner1 =  new JU.P3 ();
this.bbCenter =  new JU.P3 ();
this.bbVector =  new JU.V3 ();
this.bbVertices =  new Array (8);
{
for (var i = 0; i < 8; i++) {
JU.BoxInfo.unitBboxPoints[i] = JU.P3.new3 (-1, -1, -1);
JU.BoxInfo.unitBboxPoints[i].scaleAdd2 (2, JU.BoxInfo.unitCubePoints[i], JU.BoxInfo.unitBboxPoints[i]);
}
}});
Clazz.makeConstructor (c$, 
function () {
for (var i = 8; --i >= 0; ) this.bbVertices[i] =  new JU.Point3fi ();

this.reset ();
});
Clazz.defineMethod (c$, "reset", 
function () {
this.isScaleSet = false;
this.bbCorner0.set (3.4028235E38, 3.4028235E38, 3.4028235E38);
this.bbCorner1.set (-3.4028235E38, -3.4028235E38, -3.4028235E38);
});
c$.scaleBox = Clazz.defineMethod (c$, "scaleBox", 
function (pts, scale) {
if (scale == 0 || scale == 1) return;
var center =  new JU.P3 ();
var v =  new JU.V3 ();
for (var i = 0; i < 8; i++) center.add (pts[i]);

center.scale (0.125);
for (var i = 0; i < 8; i++) {
v.sub2 (pts[i], center);
v.scale (scale);
pts[i].add2 (center, v);
}
}, "~A,~N");
c$.getVerticesFromOABC = Clazz.defineMethod (c$, "getVerticesFromOABC", 
function (oabc) {
var vertices =  new Array (8);
for (var i = 0; i <= 7; i++) {
vertices[i] = JU.P3.newP (oabc[0]);
if ((i & 4) == 4) vertices[i].add (oabc[1]);
if ((i & 2) == 2) vertices[i].add (oabc[2]);
if ((i & 1) == 1) vertices[i].add (oabc[3]);
}
return vertices;
}, "~A");
c$.getCanonicalCopy = Clazz.defineMethod (c$, "getCanonicalCopy", 
function (boxPoints, scale) {
var pts =  new Array (8);
for (var i = 0; i < 8; i++) pts[JU.BoxInfo.toCanonical[i]] = JU.P3.newP (boxPoints[i]);

JU.BoxInfo.scaleBox (pts, scale);
return pts;
}, "~A,~N");
c$.toOABC = Clazz.defineMethod (c$, "toOABC", 
function (bbVertices, offset) {
var center = JU.P3.newP (bbVertices[0]);
var a = JU.P3.newP (bbVertices[4]);
var b = JU.P3.newP (bbVertices[2]);
var c = JU.P3.newP (bbVertices[1]);
a.sub (center);
b.sub (center);
c.sub (center);
if (offset != null) center.add (offset);
return  Clazz.newArray (-1, [center, a, b, c]);
}, "~A,JU.T3");
Clazz.defineMethod (c$, "getBoundBoxCenter", 
function () {
if (!this.isScaleSet) this.setBbcage (1);
return this.bbCenter;
});
Clazz.defineMethod (c$, "getBoundBoxCornerVector", 
function () {
if (!this.isScaleSet) this.setBbcage (1);
return this.bbVector;
});
Clazz.defineMethod (c$, "getBoundBoxPoints", 
function (isAll) {
if (!this.isScaleSet) this.setBbcage (1);
return (isAll ?  Clazz.newArray (-1, [this.bbCenter, JU.P3.newP (this.bbVector), this.bbCorner0, this.bbCorner1]) :  Clazz.newArray (-1, [this.bbCorner0, this.bbCorner1]));
}, "~B");
Clazz.defineMethod (c$, "getBoundBoxVertices", 
function () {
if (!this.isScaleSet) this.setBbcage (1);
return this.bbVertices;
});
Clazz.defineMethod (c$, "setBoundBoxFromOABC", 
function (points) {
var origin = JU.P3.newP (points[0]);
var pt111 =  new JU.P3 ();
for (var i = 0; i < 4; i++) pt111.add (points[i]);

this.setBoundBox (origin, pt111, true, 1);
}, "~A");
Clazz.defineMethod (c$, "setBoundBox", 
function (pt1, pt2, byCorner, scale) {
if (pt1 != null) {
if (scale == 0) return;
if (byCorner) {
if (pt1.distance (pt2) == 0) return;
this.bbCorner0.set (Math.min (pt1.x, pt2.x), Math.min (pt1.y, pt2.y), Math.min (pt1.z, pt2.z));
this.bbCorner1.set (Math.max (pt1.x, pt2.x), Math.max (pt1.y, pt2.y), Math.max (pt1.z, pt2.z));
} else {
if (pt2.x == 0 || pt2.y == 0 && pt2.z == 0) return;
this.bbCorner0.set (pt1.x - pt2.x, pt1.y - pt2.y, pt1.z - pt2.z);
this.bbCorner1.set (pt1.x + pt2.x, pt1.y + pt2.y, pt1.z + pt2.z);
}}this.setBbcage (scale);
}, "JU.T3,JU.T3,~B,~N");
Clazz.defineMethod (c$, "setMargin", 
function (m) {
this.margin = m;
}, "~N");
Clazz.defineMethod (c$, "addBoundBoxPoint", 
function (pt) {
this.isScaleSet = false;
JU.BoxInfo.addPoint (pt, this.bbCorner0, this.bbCorner1, this.margin);
}, "JU.T3");
c$.addPoint = Clazz.defineMethod (c$, "addPoint", 
function (pt, xyzMin, xyzMax, margin) {
if (pt.x - margin < xyzMin.x) xyzMin.x = pt.x - margin;
if (pt.x + margin > xyzMax.x) xyzMax.x = pt.x + margin;
if (pt.y - margin < xyzMin.y) xyzMin.y = pt.y - margin;
if (pt.y + margin > xyzMax.y) xyzMax.y = pt.y + margin;
if (pt.z - margin < xyzMin.z) xyzMin.z = pt.z - margin;
if (pt.z + margin > xyzMax.z) xyzMax.z = pt.z + margin;
}, "JU.T3,JU.T3,JU.T3,~N");
c$.addPointXYZ = Clazz.defineMethod (c$, "addPointXYZ", 
function (x, y, z, xyzMin, xyzMax, margin) {
if (x - margin < xyzMin.x) xyzMin.x = x - margin;
if (x + margin > xyzMax.x) xyzMax.x = x + margin;
if (y - margin < xyzMin.y) xyzMin.y = y - margin;
if (y + margin > xyzMax.y) xyzMax.y = y + margin;
if (z - margin < xyzMin.z) xyzMin.z = z - margin;
if (z + margin > xyzMax.z) xyzMax.z = z + margin;
}, "~N,~N,~N,JU.P3,JU.P3,~N");
Clazz.defineMethod (c$, "setBbcage", 
function (scale) {
this.isScaleSet = true;
this.bbCenter.add2 (this.bbCorner0, this.bbCorner1);
this.bbCenter.scale (0.5);
this.bbVector.sub2 (this.bbCorner1, this.bbCenter);
if (scale > 0) {
this.bbVector.scale (scale);
} else {
this.bbVector.x -= scale / 2;
this.bbVector.y -= scale / 2;
this.bbVector.z -= scale / 2;
}for (var i = 8; --i >= 0; ) {
var pt = this.bbVertices[i];
pt.setT (JU.BoxInfo.unitBboxPoints[i]);
pt.x *= this.bbVector.x;
pt.y *= this.bbVector.y;
pt.z *= this.bbVector.z;
pt.add (this.bbCenter);
}
this.bbCorner0.setT (this.bbVertices[0]);
this.bbCorner1.setT (this.bbVertices[7]);
}, "~N");
Clazz.defineMethod (c$, "isWithin", 
function (pt) {
if (!this.isScaleSet) this.setBbcage (1);
return (pt.x >= this.bbCorner0.x && pt.x <= this.bbCorner1.x && pt.y >= this.bbCorner0.y && pt.y <= this.bbCorner1.y && pt.z >= this.bbCorner0.z && pt.z <= this.bbCorner1.z);
}, "JU.P3");
Clazz.defineMethod (c$, "getMaxDim", 
function () {
return this.bbVector.length () * 2;
});
Clazz.defineStatics (c$,
"X", 4,
"Y", 2,
"Z", 1,
"XYZ", 7,
"bbcageTickEdges",  Clazz.newCharArray (-1, ['z', '\0', '\0', 'y', 'x', '\0', '\0', '\0', '\0', '\0', '\0', '\0']),
"uccageTickEdges",  Clazz.newCharArray (-1, ['z', 'y', 'x', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0', '\0']),
"edges",  Clazz.newByteArray (-1, [0, 1, 0, 2, 0, 4, 1, 3, 1, 5, 2, 3, 2, 6, 3, 7, 4, 5, 4, 6, 5, 7, 6, 7]));
c$.unitCubePoints = c$.prototype.unitCubePoints =  Clazz.newArray (-1, [JU.P3.new3 (0, 0, 0), JU.P3.new3 (0, 0, 1), JU.P3.new3 (0, 1, 0), JU.P3.new3 (0, 1, 1), JU.P3.new3 (1, 0, 0), JU.P3.new3 (1, 0, 1), JU.P3.new3 (1, 1, 0), JU.P3.new3 (1, 1, 1)]);
Clazz.defineStatics (c$,
"facePoints",  Clazz.newArray (-1, [ Clazz.newIntArray (-1, [4, 0, 6]),  Clazz.newIntArray (-1, [4, 6, 5]),  Clazz.newIntArray (-1, [5, 7, 1]),  Clazz.newIntArray (-1, [1, 3, 0]),  Clazz.newIntArray (-1, [6, 2, 7]),  Clazz.newIntArray (-1, [1, 0, 5]),  Clazz.newIntArray (-1, [0, 2, 6]),  Clazz.newIntArray (-1, [6, 7, 5]),  Clazz.newIntArray (-1, [7, 3, 1]),  Clazz.newIntArray (-1, [3, 2, 0]),  Clazz.newIntArray (-1, [2, 3, 7]),  Clazz.newIntArray (-1, [0, 4, 5])]),
"toCanonical",  Clazz.newIntArray (-1, [0, 3, 4, 7, 1, 2, 5, 6]));
c$.unitBboxPoints = c$.prototype.unitBboxPoints =  new Array (8);
});
