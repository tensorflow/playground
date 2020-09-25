Clazz.declarePackage ("JU");
Clazz.load (["JU.V3"], "JU.Measure", ["java.lang.Float", "javajs.api.Interface", "JU.Lst", "$.P3", "$.P4", "$.Quat"], function () {
c$ = Clazz.declareType (JU, "Measure");
c$.computeAngle = Clazz.defineMethod (c$, "computeAngle", 
function (pointA, pointB, pointC, vectorBA, vectorBC, asDegrees) {
vectorBA.sub2 (pointA, pointB);
vectorBC.sub2 (pointC, pointB);
var angle = vectorBA.angle (vectorBC);
return (asDegrees ? angle / 0.017453292 : angle);
}, "JU.T3,JU.T3,JU.T3,JU.V3,JU.V3,~B");
c$.computeAngleABC = Clazz.defineMethod (c$, "computeAngleABC", 
function (pointA, pointB, pointC, asDegrees) {
var vectorBA =  new JU.V3 ();
var vectorBC =  new JU.V3 ();
return JU.Measure.computeAngle (pointA, pointB, pointC, vectorBA, vectorBC, asDegrees);
}, "JU.T3,JU.T3,JU.T3,~B");
c$.computeTorsion = Clazz.defineMethod (c$, "computeTorsion", 
function (p1, p2, p3, p4, asDegrees) {
var ijx = p1.x - p2.x;
var ijy = p1.y - p2.y;
var ijz = p1.z - p2.z;
var kjx = p3.x - p2.x;
var kjy = p3.y - p2.y;
var kjz = p3.z - p2.z;
var klx = p3.x - p4.x;
var kly = p3.y - p4.y;
var klz = p3.z - p4.z;
var ax = ijy * kjz - ijz * kjy;
var ay = ijz * kjx - ijx * kjz;
var az = ijx * kjy - ijy * kjx;
var cx = kjy * klz - kjz * kly;
var cy = kjz * klx - kjx * klz;
var cz = kjx * kly - kjy * klx;
var ai2 = 1 / (ax * ax + ay * ay + az * az);
var ci2 = 1 / (cx * cx + cy * cy + cz * cz);
var ai = Math.sqrt (ai2);
var ci = Math.sqrt (ci2);
var denom = ai * ci;
var cross = ax * cx + ay * cy + az * cz;
var cosang = cross * denom;
if (cosang > 1) {
cosang = 1;
}if (cosang < -1) {
cosang = -1;
}var torsion = Math.acos (cosang);
var dot = ijx * cx + ijy * cy + ijz * cz;
var absDot = Math.abs (dot);
torsion = (dot / absDot > 0) ? torsion : -torsion;
return (asDegrees ? torsion / 0.017453292 : torsion);
}, "JU.T3,JU.T3,JU.T3,JU.T3,~B");
c$.computeHelicalAxis = Clazz.defineMethod (c$, "computeHelicalAxis", 
function (a, b, dq) {
var vab =  new JU.V3 ();
vab.sub2 (b, a);
var theta = dq.getTheta ();
var n = dq.getNormal ();
var v_dot_n = vab.dot (n);
if (Math.abs (v_dot_n) < 0.0001) v_dot_n = 0;
var va_prime_d =  new JU.V3 ();
va_prime_d.cross (vab, n);
if (va_prime_d.dot (va_prime_d) != 0) va_prime_d.normalize ();
var vda =  new JU.V3 ();
var vcb = JU.V3.newV (n);
if (v_dot_n == 0) v_dot_n = 1.4E-45;
vcb.scale (v_dot_n);
vda.sub2 (vcb, vab);
vda.scale (0.5);
va_prime_d.scale (theta == 0 ? 0 : (vda.length () / Math.tan (theta / 2 / 180 * 3.141592653589793)));
var r = JU.V3.newV (va_prime_d);
if (theta != 0) r.add (vda);
var pt_a_prime = JU.P3.newP (a);
pt_a_prime.sub (r);
if (v_dot_n != 1.4E-45) n.scale (v_dot_n);
var pt_b_prime = JU.P3.newP (pt_a_prime);
pt_b_prime.add (n);
theta = JU.Measure.computeTorsion (a, pt_a_prime, pt_b_prime, b, true);
if (Float.isNaN (theta) || r.length () < 0.0001) theta = dq.getThetaDirectedV (n);
var residuesPerTurn = Math.abs (theta == 0 ? 0 : 360 / theta);
var pitch = Math.abs (v_dot_n == 1.4E-45 ? 0 : n.length () * (theta == 0 ? 1 : 360 / theta));
return  Clazz.newArray (-1, [pt_a_prime, n, r, JU.P3.new3 (theta, pitch, residuesPerTurn), pt_b_prime]);
}, "JU.P3,JU.P3,JU.Quat");
c$.getPlaneThroughPoints = Clazz.defineMethod (c$, "getPlaneThroughPoints", 
function (pointA, pointB, pointC, vNorm, vAB, plane) {
var w = JU.Measure.getNormalThroughPoints (pointA, pointB, pointC, vNorm, vAB);
plane.set4 (vNorm.x, vNorm.y, vNorm.z, w);
return plane;
}, "JU.T3,JU.T3,JU.T3,JU.V3,JU.V3,JU.P4");
c$.getPlaneThroughPoint = Clazz.defineMethod (c$, "getPlaneThroughPoint", 
function (pt, normal, plane) {
plane.set4 (normal.x, normal.y, normal.z, -normal.dot (pt));
}, "JU.T3,JU.V3,JU.P4");
c$.distanceToPlane = Clazz.defineMethod (c$, "distanceToPlane", 
function (plane, pt) {
return (plane == null ? NaN : (plane.dot (pt) + plane.w) / Math.sqrt (plane.dot (plane)));
}, "JU.P4,JU.T3");
c$.directedDistanceToPlane = Clazz.defineMethod (c$, "directedDistanceToPlane", 
function (pt, plane, ptref) {
var f = plane.dot (pt) + plane.w;
var f1 = plane.dot (ptref) + plane.w;
return Math.signum (f1) * f / Math.sqrt (plane.dot (plane));
}, "JU.P3,JU.P4,JU.P3");
c$.distanceToPlaneD = Clazz.defineMethod (c$, "distanceToPlaneD", 
function (plane, d, pt) {
return (plane == null ? NaN : (plane.dot (pt) + plane.w) / d);
}, "JU.P4,~N,JU.P3");
c$.distanceToPlaneV = Clazz.defineMethod (c$, "distanceToPlaneV", 
function (norm, w, pt) {
return (norm == null ? NaN : (norm.dot (pt) + w) / Math.sqrt (norm.dot (norm)));
}, "JU.V3,~N,JU.P3");
c$.calcNormalizedNormal = Clazz.defineMethod (c$, "calcNormalizedNormal", 
function (pointA, pointB, pointC, vNormNorm, vAB) {
vAB.sub2 (pointB, pointA);
vNormNorm.sub2 (pointC, pointA);
vNormNorm.cross (vAB, vNormNorm);
vNormNorm.normalize ();
}, "JU.T3,JU.T3,JU.T3,JU.T3,JU.T3");
c$.getDirectedNormalThroughPoints = Clazz.defineMethod (c$, "getDirectedNormalThroughPoints", 
function (pointA, pointB, pointC, ptRef, vNorm, vAB) {
var nd = JU.Measure.getNormalThroughPoints (pointA, pointB, pointC, vNorm, vAB);
if (ptRef != null) {
var pt0 = JU.P3.newP (pointA);
pt0.add (vNorm);
var d = pt0.distance (ptRef);
pt0.sub2 (pointA, vNorm);
if (d > pt0.distance (ptRef)) {
vNorm.scale (-1);
nd = -nd;
}}return nd;
}, "JU.T3,JU.T3,JU.T3,JU.T3,JU.V3,JU.V3");
c$.getNormalThroughPoints = Clazz.defineMethod (c$, "getNormalThroughPoints", 
function (pointA, pointB, pointC, vNorm, vTemp) {
JU.Measure.calcNormalizedNormal (pointA, pointB, pointC, vNorm, vTemp);
vTemp.setT (pointA);
return -vTemp.dot (vNorm);
}, "JU.T3,JU.T3,JU.T3,JU.T3,JU.T3");
c$.getPlaneProjection = Clazz.defineMethod (c$, "getPlaneProjection", 
function (pt, plane, ptProj, vNorm) {
var dist = JU.Measure.distanceToPlane (plane, pt);
vNorm.set (plane.x, plane.y, plane.z);
vNorm.normalize ();
vNorm.scale (-dist);
ptProj.add2 (pt, vNorm);
}, "JU.P3,JU.P4,JU.P3,JU.V3");
c$.getNormalFromCenter = Clazz.defineMethod (c$, "getNormalFromCenter", 
function (ptCenter, ptA, ptB, ptC, isOutward, normal, vTemp) {
var d = JU.Measure.getNormalThroughPoints (ptA, ptB, ptC, normal, vTemp);
var isReversed = (JU.Measure.distanceToPlaneV (normal, d, ptCenter) > 0);
if (isReversed == isOutward) normal.scale (-1.0);
return !isReversed;
}, "JU.P3,JU.P3,JU.P3,JU.P3,~B,JU.V3,JU.V3");
c$.getNormalToLine = Clazz.defineMethod (c$, "getNormalToLine", 
function (pointA, pointB, vNormNorm) {
vNormNorm.sub2 (pointA, pointB);
vNormNorm.cross (vNormNorm, JU.Measure.axisY);
vNormNorm.normalize ();
if (Float.isNaN (vNormNorm.x)) vNormNorm.set (1, 0, 0);
}, "JU.P3,JU.P3,JU.V3");
c$.getBisectingPlane = Clazz.defineMethod (c$, "getBisectingPlane", 
function (pointA, vAB, ptTemp, vTemp, plane) {
ptTemp.scaleAdd2 (0.5, vAB, pointA);
vTemp.setT (vAB);
vTemp.normalize ();
JU.Measure.getPlaneThroughPoint (ptTemp, vTemp, plane);
}, "JU.P3,JU.V3,JU.T3,JU.V3,JU.P4");
c$.projectOntoAxis = Clazz.defineMethod (c$, "projectOntoAxis", 
function (point, axisA, axisUnitVector, vectorProjection) {
vectorProjection.sub2 (point, axisA);
var projectedLength = vectorProjection.dot (axisUnitVector);
point.scaleAdd2 (projectedLength, axisUnitVector, axisA);
vectorProjection.sub2 (point, axisA);
}, "JU.P3,JU.P3,JU.V3,JU.V3");
c$.calcBestAxisThroughPoints = Clazz.defineMethod (c$, "calcBestAxisThroughPoints", 
function (points, axisA, axisUnitVector, vectorProjection, nTriesMax) {
var nPoints = points.length;
axisA.setT (points[0]);
axisUnitVector.sub2 (points[nPoints - 1], axisA);
axisUnitVector.normalize ();
JU.Measure.calcAveragePointN (points, nPoints, axisA);
var nTries = 0;
while (nTries++ < nTriesMax && JU.Measure.findAxis (points, nPoints, axisA, axisUnitVector, vectorProjection) > 0.001) {
}
var tempA = JU.P3.newP (points[0]);
JU.Measure.projectOntoAxis (tempA, axisA, axisUnitVector, vectorProjection);
axisA.setT (tempA);
}, "~A,JU.P3,JU.V3,JU.V3,~N");
c$.findAxis = Clazz.defineMethod (c$, "findAxis", 
function (points, nPoints, axisA, axisUnitVector, vectorProjection) {
var sumXiYi =  new JU.V3 ();
var vTemp =  new JU.V3 ();
var pt =  new JU.P3 ();
var ptProj =  new JU.P3 ();
var a = JU.V3.newV (axisUnitVector);
var sum_Xi2 = 0;
for (var i = nPoints; --i >= 0; ) {
pt.setT (points[i]);
ptProj.setT (pt);
JU.Measure.projectOntoAxis (ptProj, axisA, axisUnitVector, vectorProjection);
vTemp.sub2 (pt, ptProj);
vTemp.cross (vectorProjection, vTemp);
sumXiYi.add (vTemp);
sum_Xi2 += vectorProjection.lengthSquared ();
}
var m = JU.V3.newV (sumXiYi);
m.scale (1 / sum_Xi2);
vTemp.cross (m, axisUnitVector);
axisUnitVector.add (vTemp);
axisUnitVector.normalize ();
vTemp.sub2 (axisUnitVector, a);
return vTemp.length ();
}, "~A,~N,JU.P3,JU.V3,JU.V3");
c$.calcAveragePoint = Clazz.defineMethod (c$, "calcAveragePoint", 
function (pointA, pointB, pointC) {
pointC.set ((pointA.x + pointB.x) / 2, (pointA.y + pointB.y) / 2, (pointA.z + pointB.z) / 2);
}, "JU.P3,JU.P3,JU.P3");
c$.calcAveragePointN = Clazz.defineMethod (c$, "calcAveragePointN", 
function (points, nPoints, averagePoint) {
averagePoint.setT (points[0]);
for (var i = 1; i < nPoints; i++) averagePoint.add (points[i]);

averagePoint.scale (1 / nPoints);
}, "~A,~N,JU.P3");
c$.transformPoints = Clazz.defineMethod (c$, "transformPoints", 
function (vPts, m4, center) {
var v =  new JU.Lst ();
for (var i = 0; i < vPts.size (); i++) {
var pt = JU.P3.newP (vPts.get (i));
pt.sub (center);
m4.rotTrans (pt);
pt.add (center);
v.addLast (pt);
}
return v;
}, "JU.Lst,JU.M4,JU.P3");
c$.isInTetrahedron = Clazz.defineMethod (c$, "isInTetrahedron", 
function (pt, ptA, ptB, ptC, ptD, plane, vTemp, vTemp2, fullyEnclosed) {
var b = (JU.Measure.distanceToPlane (JU.Measure.getPlaneThroughPoints (ptC, ptD, ptA, vTemp, vTemp2, plane), pt) >= 0);
if (b != (JU.Measure.distanceToPlane (JU.Measure.getPlaneThroughPoints (ptA, ptD, ptB, vTemp, vTemp2, plane), pt) >= 0)) return false;
if (b != (JU.Measure.distanceToPlane (JU.Measure.getPlaneThroughPoints (ptB, ptD, ptC, vTemp, vTemp2, plane), pt) >= 0)) return false;
var d = JU.Measure.distanceToPlane (JU.Measure.getPlaneThroughPoints (ptA, ptB, ptC, vTemp, vTemp2, plane), pt);
if (fullyEnclosed) return (b == (d >= 0));
var d1 = JU.Measure.distanceToPlane (plane, ptD);
return d1 * d <= 0 || Math.abs (d1) > Math.abs (d);
}, "JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P4,JU.V3,JU.V3,~B");
c$.getIntersectionPP = Clazz.defineMethod (c$, "getIntersectionPP", 
function (plane1, plane2) {
var a1 = plane1.x;
var b1 = plane1.y;
var c1 = plane1.z;
var d1 = plane1.w;
var a2 = plane2.x;
var b2 = plane2.y;
var c2 = plane2.z;
var d2 = plane2.w;
var norm1 = JU.V3.new3 (a1, b1, c1);
var norm2 = JU.V3.new3 (a2, b2, c2);
var nxn =  new JU.V3 ();
nxn.cross (norm1, norm2);
var ax = Math.abs (nxn.x);
var ay = Math.abs (nxn.y);
var az = Math.abs (nxn.z);
var x;
var y;
var z;
var diff;
var type = (ax > ay ? (ax > az ? 1 : 3) : ay > az ? 2 : 3);
switch (type) {
case 1:
x = 0;
diff = (b1 * c2 - b2 * c1);
if (Math.abs (diff) < 0.01) return null;
y = (c1 * d2 - c2 * d1) / diff;
z = (b2 * d1 - d2 * b1) / diff;
break;
case 2:
diff = (a1 * c2 - a2 * c1);
if (Math.abs (diff) < 0.01) return null;
x = (c1 * d2 - c2 * d1) / diff;
y = 0;
z = (a2 * d1 - d2 * a1) / diff;
break;
case 3:
default:
diff = (a1 * b2 - a2 * b1);
if (Math.abs (diff) < 0.01) return null;
x = (b1 * d2 - b2 * d1) / diff;
y = (a2 * d1 - d2 * a1) / diff;
z = 0;
}
var list =  new JU.Lst ();
list.addLast (JU.P3.new3 (x, y, z));
nxn.normalize ();
list.addLast (nxn);
return list;
}, "JU.P4,JU.P4");
c$.getIntersection = Clazz.defineMethod (c$, "getIntersection", 
function (pt1, v, plane, ptRet, tempNorm, vTemp) {
JU.Measure.getPlaneProjection (pt1, plane, ptRet, tempNorm);
tempNorm.set (plane.x, plane.y, plane.z);
tempNorm.normalize ();
if (v == null) v = JU.V3.newV (tempNorm);
var l_dot_n = v.dot (tempNorm);
if (Math.abs (l_dot_n) < 0.01) return null;
vTemp.sub2 (ptRet, pt1);
ptRet.scaleAdd2 (vTemp.dot (tempNorm) / l_dot_n, v, pt1);
return ptRet;
}, "JU.P3,JU.V3,JU.P4,JU.P3,JU.V3,JU.V3");
c$.calculateQuaternionRotation = Clazz.defineMethod (c$, "calculateQuaternionRotation", 
function (centerAndPoints, retStddev) {
retStddev[1] = NaN;
var q =  new JU.Quat ();
var ptsA = centerAndPoints[0];
var ptsB = centerAndPoints[1];
var nPts = ptsA.length - 1;
if (nPts < 2 || ptsA.length != ptsB.length) return q;
var Sxx = 0;
var Sxy = 0;
var Sxz = 0;
var Syx = 0;
var Syy = 0;
var Syz = 0;
var Szx = 0;
var Szy = 0;
var Szz = 0;
var ptA =  new JU.P3 ();
var ptB =  new JU.P3 ();
var ptA0 = ptsA[0];
var ptB0 = ptsB[0];
for (var i = nPts + 1; --i >= 1; ) {
ptA.sub2 (ptsA[i], ptA0);
ptB.sub2 (ptsB[i], ptB0);
Sxx += ptA.x * ptB.x;
Sxy += ptA.x * ptB.y;
Sxz += ptA.x * ptB.z;
Syx += ptA.y * ptB.x;
Syy += ptA.y * ptB.y;
Syz += ptA.y * ptB.z;
Szx += ptA.z * ptB.x;
Szy += ptA.z * ptB.y;
Szz += ptA.z * ptB.z;
}
retStddev[0] = JU.Measure.getRmsd (centerAndPoints, q);
var N =  Clazz.newDoubleArray (4, 4, 0);
N[0][0] = Sxx + Syy + Szz;
N[0][1] = N[1][0] = Syz - Szy;
N[0][2] = N[2][0] = Szx - Sxz;
N[0][3] = N[3][0] = Sxy - Syx;
N[1][1] = Sxx - Syy - Szz;
N[1][2] = N[2][1] = Sxy + Syx;
N[1][3] = N[3][1] = Szx + Sxz;
N[2][2] = -Sxx + Syy - Szz;
N[2][3] = N[3][2] = Syz + Szy;
N[3][3] = -Sxx - Syy + Szz;
var v = (javajs.api.Interface.getInterface ("JU.Eigen")).setM (N).getEigenvectorsFloatTransposed ()[3];
q = JU.Quat.newP4 (JU.P4.new4 (v[1], v[2], v[3], v[0]));
retStddev[1] = JU.Measure.getRmsd (centerAndPoints, q);
return q;
}, "~A,~A");
c$.getTransformMatrix4 = Clazz.defineMethod (c$, "getTransformMatrix4", 
function (ptsA, ptsB, m, centerA) {
var cptsA = JU.Measure.getCenterAndPoints (ptsA);
var cptsB = JU.Measure.getCenterAndPoints (ptsB);
var retStddev =  Clazz.newFloatArray (2, 0);
var q = JU.Measure.calculateQuaternionRotation ( Clazz.newArray (-1, [cptsA, cptsB]), retStddev);
var r = q.getMatrix ();
if (centerA == null) r.rotate (cptsA[0]);
 else centerA.setT (cptsA[0]);
var t = JU.V3.newVsub (cptsB[0], cptsA[0]);
m.setMV (r, t);
return retStddev[1];
}, "JU.Lst,JU.Lst,JU.M4,JU.P3");
c$.getCenterAndPoints = Clazz.defineMethod (c$, "getCenterAndPoints", 
function (vPts) {
var n = vPts.size ();
var pts =  new Array (n + 1);
pts[0] =  new JU.P3 ();
if (n > 0) {
for (var i = 0; i < n; i++) {
pts[0].add (pts[i + 1] = vPts.get (i));
}
pts[0].scale (1 / n);
}return pts;
}, "JU.Lst");
c$.getRmsd = Clazz.defineMethod (c$, "getRmsd", 
function (centerAndPoints, q) {
var sum2 = 0;
var ptsA = centerAndPoints[0];
var ptsB = centerAndPoints[1];
var cA = ptsA[0];
var cB = ptsB[0];
var n = ptsA.length - 1;
var ptAnew =  new JU.P3 ();
for (var i = n + 1; --i >= 1; ) {
ptAnew.sub2 (ptsA[i], cA);
q.transform2 (ptAnew, ptAnew).add (cB);
sum2 += ptAnew.distanceSquared (ptsB[i]);
}
return Math.sqrt (sum2 / n);
}, "~A,JU.Quat");
Clazz.defineStatics (c$,
"radiansPerDegree", (0.017453292519943295));
c$.axisY = c$.prototype.axisY = JU.V3.new3 (0, 1, 0);
});
