Clazz.declarePackage ("J.bspt");
Clazz.load (null, "J.bspt.PointIterator", ["java.lang.Float", "JU.Lst", "$.P3", "J.bspt.Bspt", "JU.BSUtil", "$.Point3fi"], function () {
c$ = Clazz.declareType (J.bspt, "PointIterator");
c$.withinDistPoints = Clazz.defineMethod (c$, "withinDistPoints", 
function (distance, pt, ap3, ap31, ret) {
var pts =  new JU.Lst ();
var bspt =  new J.bspt.Bspt (3, 0);
var iter;
if (pt != null && Float.isNaN (pt.x)) {
var pt3 =  new Array (ap3.length);
var p;
for (var i = pt3.length; --i >= 0; ) {
var p3 = ap3[i];
if (p3 == null) return 0;
p =  new JU.Point3fi ();
p.setT (p3);
p.i = i;
pt3[i] = p;
bspt.addTuple (p);
}
iter = bspt.allocateCubeIterator ();
var bsp = JU.BSUtil.newBitSet2 (0, ap3.length);
for (var i = pt3.length; --i >= 0; ) {
iter.initialize (p = pt3[i], distance, false);
var d2 = distance * distance;
var n = 0;
while (iter.hasMoreElements ()) {
var pt2 = iter.nextElement ();
if (bsp.get (pt2.i) && pt2.distanceSquared (p) <= d2 && (++n > 1)) bsp.clear (pt2.i);
}
}
for (var i = bsp.nextSetBit (0); i >= 0; i = bsp.nextSetBit (i + 1)) pts.addLast (JU.P3.newP (pt3[i]));

ret[0] = pts;
return 1073742001;
}if (distance == 0) {
if (ap31 == null) {
var d2 = 3.4028235E38;
var pt3 = null;
for (var i = ap3.length; --i >= 0; ) {
var pta = ap3[i];
distance = pta.distanceSquared (pt);
if (distance < d2) {
pt3 = pta;
d2 = distance;
}}
ret[0] = (pt3 == null ? "" : pt3);
return (pt3 == null ? 4 : 134217751);
}var ptsOut =  Clazz.newIntArray (ap31.length, 0);
for (var i = ptsOut.length; --i >= 0; ) {
var d2 = 3.4028235E38;
var imin = -1;
pt = ap31[i];
for (var j = ap3.length; --j >= 0; ) {
var pta = ap3[j];
distance = pta.distanceSquared (pt);
if (distance < d2) {
imin = j;
d2 = distance;
}}
ptsOut[i] = imin;
}
ret[0] = ptsOut;
return 1275068418;
}for (var i = ap3.length; --i >= 0; ) bspt.addTuple (ap3[i]);

iter = bspt.allocateCubeIterator ();
iter.initialize (pt, distance, false);
var d2 = distance * distance;
while (iter.hasMoreElements ()) {
var pt2 = iter.nextElement ();
if (pt2.distanceSquared (pt) <= d2) pts.addLast (pt2);
}
iter.release ();
ret[0] = pts;
return 1073742001;
}, "~N,JU.P3,~A,~A,~A");
});
