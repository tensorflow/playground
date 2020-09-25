Clazz.declarePackage ("JM");
Clazz.load (null, "JM.Util", ["java.lang.Double", "java.util.Random"], function () {
c$ = Clazz.declareType (JM, "Util");
c$.sub = Clazz.defineMethod (c$, "sub", 
function (a, b, result) {
result.set (a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}, "~A,~A,JU.V3d");
c$.putCoord = Clazz.defineMethod (c$, "putCoord", 
function (v, c) {
c[0] = v.x;
c[1] = v.y;
c[2] = v.z;
}, "JU.V3d,~A");
c$.distance2 = Clazz.defineMethod (c$, "distance2", 
function (a, b) {
var dx = a[0] - b[0];
var dy = a[1] - b[1];
var dz = a[2] - b[2];
return (dx * dx + dy * dy + dz * dz);
}, "~A,~A");
c$.distance2V = Clazz.defineMethod (c$, "distance2V", 
function (a, b) {
var dx = a.x - b.x;
var dy = a.y - b.y;
var dz = a.z - b.z;
return (dx * dx + dy * dy + dz * dz);
}, "JU.V3d,JU.V3d");
c$.getAngleRadiansABC = Clazz.defineMethod (c$, "getAngleRadiansABC", 
function (a, b, c) {
var ab2 = JM.Util.distance2 (a, b);
var bc2 = JM.Util.distance2 (b, c);
var ac2 = JM.Util.distance2 (a, c);
return (JM.Util.isNearZero2 (ab2, 1e-3) || JM.Util.isNearZero2 (bc2, 1e-3) ? 0 : Math.acos ((ab2 + bc2 - ac2) / 2 / Math.sqrt (ab2 * bc2)));
}, "~A,~A,~A");
c$.isApprox = Clazz.defineMethod (c$, "isApprox", 
function (a, b, precision) {
return (JM.Util.distance2V (a, b) <= precision * precision * Math.min (a.lengthSquared (), b.lengthSquared ()));
}, "JU.V3d,JU.V3d,~N");
c$.canBeSquared = Clazz.defineMethod (c$, "canBeSquared", 
function (x) {
if (x == 0) return true;
return ((x = Math.abs (x)) < 1.0E150 && x > 1.0E-150);
}, "~N");
c$.isNegligible = Clazz.defineMethod (c$, "isNegligible", 
function (a, b) {
return JM.Util.isNegligible3 (a, b, 1e-11);
}, "~N,~N");
c$.isFinite = Clazz.defineMethod (c$, "isFinite", 
function (a) {
return !Double.isInfinite (a) && !Double.isNaN (a);
}, "~N");
c$.isNegligible3 = Clazz.defineMethod (c$, "isNegligible3", 
function (a, b, precision) {
return (Math.abs (a) <= precision * Math.abs (b));
}, "~N,~N,~N");
c$.isNear = Clazz.defineMethod (c$, "isNear", 
function (a, b) {
return JM.Util.isNear3 (a, b, 2e-6);
}, "~N,~N");
c$.isNear3 = Clazz.defineMethod (c$, "isNear3", 
function (a, b, epsilon) {
return (Math.abs (a - b) < epsilon);
}, "~N,~N,~N");
c$.isNearZero = Clazz.defineMethod (c$, "isNearZero", 
function (a) {
return JM.Util.isNearZero2 (a, 2e-6);
}, "~N");
c$.isNearZero2 = Clazz.defineMethod (c$, "isNearZero2", 
function (a, epsilon) {
return (Math.abs (a) < epsilon);
}, "~N,~N");
c$.canBeNormalized = Clazz.defineMethod (c$, "canBeNormalized", 
function (a) {
if (a.x == 0.0 && a.y == 0.0 && a.z == 0.0) return false;
return (JM.Util.canBeSquared (a.x) && JM.Util.canBeSquared (a.y) && JM.Util.canBeSquared (a.z));
}, "JU.V3d");
c$.pointPlaneAngleRadians = Clazz.defineMethod (c$, "pointPlaneAngleRadians", 
function (a, b, c, d, v1, v2, norm, fixTheta) {
v1.sub2 (b, c);
v2.sub2 (b, d);
norm.cross (v1, v2);
v2.add (v1);
v1.sub2 (b, a);
var angleA_CD = (fixTheta ? JM.Util.vectorAngleRadians (v2, v1) : 3.141592653589793);
var angleNorm = JM.Util.vectorAngleRadians (norm, v1);
if (angleNorm > 1.5707963267948966) angleNorm = 3.141592653589793 - angleNorm;
var val = 1.5707963267948966 + (angleA_CD > 1.5707963267948966 ? -angleNorm : angleNorm);
return val;
}, "JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,~B");
c$.vectorAngleRadians = Clazz.defineMethod (c$, "vectorAngleRadians", 
 function (v1, v2) {
var l1 = v1.length ();
var l2 = v2.length ();
return (JM.Util.isNearZero (l1) || JM.Util.isNearZero (l2) ? 0 : Math.acos (v1.dot (v2) / (l1 * l2)));
}, "JU.V3d,JU.V3d");
c$.getTorsionAngleRadians = Clazz.defineMethod (c$, "getTorsionAngleRadians", 
function (a, b, c, d, r1, r2, r3) {
JM.Util.sub (b, a, r1);
JM.Util.sub (c, b, r2);
r2.normalize ();
r1.cross (r1, r2);
JM.Util.sub (d, c, r3);
r3.cross (r2, r3);
var p1dotp2 = r1.dot (r3);
r1.cross (r3, r1);
var theta = Math.atan2 (-r2.dot (r1), p1dotp2);
return theta;
}, "~A,~A,~A,~A,JU.V3d,JU.V3d,JU.V3d");
c$.restorativeForceAndDistance = Clazz.defineMethod (c$, "restorativeForceAndDistance", 
function (a, b, vab) {
vab.sub2 (a, b);
var rab = vab.length ();
if (rab < 0.1) {
JM.Util.randomizeUnitVector (vab);
rab = 0.1;
}vab.normalize ();
a.setT (vab);
a.scale (-1);
b.setT (vab);
return rab;
}, "JU.V3d,JU.V3d,JU.V3d");
c$.randomizeUnitVector = Clazz.defineMethod (c$, "randomizeUnitVector", 
 function (v) {
var ptr =  new java.util.Random ();
var l;
do {
v.set (ptr.nextFloat () - 0.5, ptr.nextFloat () - 0.5, ptr.nextFloat () - 0.5);
l = v.lengthSquared ();
} while ((l > 1.0) || (l < 1e-4));
v.normalize ();
}, "JU.V3d");
c$.restorativeForceAndAngleRadians = Clazz.defineMethod (c$, "restorativeForceAndAngleRadians", 
function (i, j, k) {
i.sub (j);
k.sub (j);
var length1 = i.length ();
var length2 = k.length ();
if (JM.Util.isNearZero (length1) || JM.Util.isNearZero (length2)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
return 0.0;
}var inverse_length_v1 = 1.0 / length1;
var inverse_length_v2 = 1.0 / length2;
i.scale (inverse_length_v1);
k.scale (inverse_length_v2);
j.cross (i, k);
var length = j.length ();
if (JM.Util.isNearZero (length)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
return 0.0;
}j.scale (1 / length);
var costheta = i.dot (k);
var theta;
if (costheta > 1.0) {
theta = 0.0;
costheta = 1.0;
} else if (costheta < -1.0) {
theta = 3.141592653589793;
costheta = -1.0;
} else {
theta = Math.acos (costheta);
}i.cross (i, j);
i.normalize ();
j.cross (k, j);
j.normalize ();
i.scale (-inverse_length_v1);
j.scale (inverse_length_v2);
k.setT (j);
j.add (i);
j.scale (-1);
return theta;
}, "JU.V3d,JU.V3d,JU.V3d");
c$.restorativeForceAndOutOfPlaneAngleRadians = Clazz.defineMethod (c$, "restorativeForceAndOutOfPlaneAngleRadians", 
function (i, j, k, l, an, bn, cn) {
i.sub2 (i, j);
k.sub2 (k, j);
l.sub2 (l, j);
var length_ji = i.length ();
var length_jk = k.length ();
var length_jl = l.length ();
if (JM.Util.isNearZero (length_ji) || JM.Util.isNearZero (length_jk) || JM.Util.isNearZero (length_jl)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return 0.0;
}i.normalize ();
k.normalize ();
l.normalize ();
var cos_theta = i.dot (k);
var theta = Math.acos (cos_theta);
if (JM.Util.isNearZero (theta) || JM.Util.isNearZero (Math.abs (theta - 3.141592653589793))) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return 0.0;
}var csc_theta = 1 / Math.sin (theta);
an.cross (i, k);
bn.cross (k, l);
cn.cross (l, i);
var sin_dl = an.dot (l) * csc_theta;
var dl = Math.asin (sin_dl);
var cos_dl = Math.cos (dl);
if (cos_dl < 0.0001 || JM.Util.isNearZero (dl) || JM.Util.isNearZero (Math.abs (dl - 3.141592653589793))) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return dl;
}l.scaleAdd (-sin_dl / csc_theta, l, an);
l.scale (csc_theta / length_jl);
j.setT (i);
i.scaleAdd (-cos_theta, k, i);
i.scaleAdd (-sin_dl * csc_theta, i, bn);
i.scale (csc_theta / length_ji);
k.scaleAdd (-cos_theta, j, k);
k.scaleAdd (-sin_dl * csc_theta, k, cn);
k.scale (csc_theta / length_jk);
j.setT (i);
j.add (k);
j.add (l);
j.scale (-1);
return dl;
}, "JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d");
c$.restorativeForceAndTorsionAngleRadians = Clazz.defineMethod (c$, "restorativeForceAndTorsionAngleRadians", 
function (i, j, k, l) {
i.sub2 (j, i);
j.sub2 (k, j);
k.sub2 (l, k);
var len_ij = i.length ();
var len_jk = j.length ();
var len_kl = k.length ();
if (JM.Util.isNearZero (len_ij) || JM.Util.isNearZero (len_jk) || JM.Util.isNearZero (len_kl)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return 0.0;
}var ang = JM.Util.vectorAngleRadians (i, j);
var sin_j = Math.sin (ang);
var cos_j = Math.cos (ang);
ang = JM.Util.vectorAngleRadians (j, k);
var sin_k = Math.sin (ang);
var cos_k = Math.cos (ang);
i.normalize ();
j.normalize ();
k.normalize ();
i.cross (i, j);
l.cross (j, k);
k.cross (i, l);
var theta = -Math.atan2 (k.dot (j), i.dot (l));
i.scale (1. / len_ij / sin_j / sin_j);
l.scale (-1.0 / len_kl / sin_k / sin_k);
j.setT (i);
j.scale (-len_ij / len_jk * cos_j - 1.);
k.setT (l);
k.scale (-len_kl / len_jk * cos_k);
j.sub (k);
k.setT (i);
k.add (j);
k.add (l);
k.scale (-1);
return theta;
}, "JU.V3d,JU.V3d,JU.V3d,JU.V3d");
Clazz.defineStatics (c$,
"RAD_TO_DEG", (57.29577951308232),
"DEG_TO_RAD", (0.017453292519943295),
"max_squarable_double", 1e150,
"min_squarable_double", 1e-150);
});
