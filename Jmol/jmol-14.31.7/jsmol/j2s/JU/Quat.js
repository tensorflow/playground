Clazz.declarePackage ("JU");
Clazz.load (["JU.P4"], "JU.Quat", ["java.lang.Float", "JU.A4", "$.M3", "$.V3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.q0 = 0;
this.q1 = 0;
this.q2 = 0;
this.q3 = 0;
this.mat = null;
Clazz.instantialize (this, arguments);
}, JU, "Quat");
Clazz.makeConstructor (c$, 
function () {
this.q0 = 1;
});
c$.newQ = Clazz.defineMethod (c$, "newQ", 
function (q) {
var q1 =  new JU.Quat ();
q1.set (q);
return q1;
}, "JU.Quat");
c$.newVA = Clazz.defineMethod (c$, "newVA", 
function (v, theta) {
var q =  new JU.Quat ();
q.setTA (v, theta);
return q;
}, "JU.T3,~N");
c$.newM = Clazz.defineMethod (c$, "newM", 
function (mat) {
var q =  new JU.Quat ();
q.setM (JU.M3.newM3 (mat));
return q;
}, "JU.M3");
c$.newAA = Clazz.defineMethod (c$, "newAA", 
function (a) {
var q =  new JU.Quat ();
q.setAA (a);
return q;
}, "JU.A4");
c$.newP4 = Clazz.defineMethod (c$, "newP4", 
function (pt) {
var q =  new JU.Quat ();
q.setP4 (pt);
return q;
}, "JU.P4");
c$.new4 = Clazz.defineMethod (c$, "new4", 
function (q1, q2, q3, q0) {
var q =  new JU.Quat ();
if (q0 < -1) {
q.q0 = -1;
return q;
}if (q0 > 1) {
q.q0 = 1;
return q;
}q.q0 = q0;
q.q1 = q1;
q.q2 = q2;
q.q3 = q3;
return q;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "set", 
function (q) {
this.q0 = q.q0;
this.q1 = q.q1;
this.q2 = q.q2;
this.q3 = q.q3;
}, "JU.Quat");
Clazz.defineMethod (c$, "setP4", 
 function (pt) {
var factor = (pt == null ? 0 : pt.distance4 (JU.Quat.qZero));
if (factor == 0) {
this.q0 = 1;
return;
}this.q0 = pt.w / factor;
this.q1 = pt.x / factor;
this.q2 = pt.y / factor;
this.q3 = pt.z / factor;
}, "JU.P4");
Clazz.defineMethod (c$, "setTA", 
function (pt, theta) {
if (pt.x == 0 && pt.y == 0 && pt.z == 0) {
this.q0 = 1;
return;
}var fact = (Math.sin (theta / 2 * 0.017453292519943295) / Math.sqrt (pt.x * pt.x + pt.y * pt.y + pt.z * pt.z));
this.q0 = (Math.cos (theta / 2 * 0.017453292519943295));
this.q1 = (pt.x * fact);
this.q2 = (pt.y * fact);
this.q3 = (pt.z * fact);
}, "JU.T3,~N");
Clazz.defineMethod (c$, "setAA", 
function (a) {
var aa = JU.A4.newAA (a);
if (aa.angle == 0) aa.y = 1;
this.setM ( new JU.M3 ().setAA (aa));
}, "JU.A4");
Clazz.defineMethod (c$, "setM", 
 function (mat) {
this.mat = mat;
var trace = mat.m00 + mat.m11 + mat.m22;
var temp;
var w;
var x;
var y;
var z;
if (trace >= 0.5) {
w = Math.sqrt (1.0 + trace);
x = (mat.m21 - mat.m12) / w;
y = (mat.m02 - mat.m20) / w;
z = (mat.m10 - mat.m01) / w;
} else if ((temp = mat.m00 + mat.m00 - trace) >= 0.5) {
x = Math.sqrt (1.0 + temp);
w = (mat.m21 - mat.m12) / x;
y = (mat.m10 + mat.m01) / x;
z = (mat.m20 + mat.m02) / x;
} else if ((temp = mat.m11 + mat.m11 - trace) >= 0.5 || mat.m11 > mat.m22) {
y = Math.sqrt (1.0 + temp);
w = (mat.m02 - mat.m20) / y;
x = (mat.m10 + mat.m01) / y;
z = (mat.m21 + mat.m12) / y;
} else {
z = Math.sqrt (1.0 + mat.m22 + mat.m22 - trace);
w = (mat.m10 - mat.m01) / z;
x = (mat.m20 + mat.m02) / z;
y = (mat.m21 + mat.m12) / z;
}this.q0 = (w * 0.5);
this.q1 = (x * 0.5);
this.q2 = (y * 0.5);
this.q3 = (z * 0.5);
}, "JU.M3");
Clazz.defineMethod (c$, "setRef", 
function (qref) {
if (qref == null) {
this.mul (this.getFixFactor ());
return;
}if (this.dot (qref) >= 0) return;
this.q0 *= -1;
this.q1 *= -1;
this.q2 *= -1;
this.q3 *= -1;
}, "JU.Quat");
c$.getQuaternionFrame = Clazz.defineMethod (c$, "getQuaternionFrame", 
function (center, x, xy) {
var vA = JU.V3.newV (x);
var vB = JU.V3.newV (xy);
if (center != null) {
vA.sub (center);
vB.sub (center);
}return JU.Quat.getQuaternionFrameV (vA, vB, null, false);
}, "JU.P3,JU.T3,JU.T3");
c$.getQuaternionFrameV = Clazz.defineMethod (c$, "getQuaternionFrameV", 
function (vA, vB, vC, yBased) {
if (vC == null) {
vC =  new JU.V3 ();
vC.cross (vA, vB);
if (yBased) vA.cross (vB, vC);
}var vBprime =  new JU.V3 ();
vBprime.cross (vC, vA);
vA.normalize ();
vBprime.normalize ();
vC.normalize ();
var mat =  new JU.M3 ();
mat.setColumnV (0, vA);
mat.setColumnV (1, vBprime);
mat.setColumnV (2, vC);
var q = JU.Quat.newM (mat);
return q;
}, "JU.V3,JU.V3,JU.V3,~B");
Clazz.defineMethod (c$, "getMatrix", 
function () {
if (this.mat == null) this.setMatrix ();
return this.mat;
});
Clazz.defineMethod (c$, "setMatrix", 
 function () {
this.mat =  new JU.M3 ();
this.mat.m00 = this.q0 * this.q0 + this.q1 * this.q1 - this.q2 * this.q2 - this.q3 * this.q3;
this.mat.m01 = 2 * this.q1 * this.q2 - 2 * this.q0 * this.q3;
this.mat.m02 = 2 * this.q1 * this.q3 + 2 * this.q0 * this.q2;
this.mat.m10 = 2 * this.q1 * this.q2 + 2 * this.q0 * this.q3;
this.mat.m11 = this.q0 * this.q0 - this.q1 * this.q1 + this.q2 * this.q2 - this.q3 * this.q3;
this.mat.m12 = 2 * this.q2 * this.q3 - 2 * this.q0 * this.q1;
this.mat.m20 = 2 * this.q1 * this.q3 - 2 * this.q0 * this.q2;
this.mat.m21 = 2 * this.q2 * this.q3 + 2 * this.q0 * this.q1;
this.mat.m22 = this.q0 * this.q0 - this.q1 * this.q1 - this.q2 * this.q2 + this.q3 * this.q3;
});
Clazz.defineMethod (c$, "add", 
function (x) {
return JU.Quat.newVA (this.getNormal (), this.getTheta () + x);
}, "~N");
Clazz.defineMethod (c$, "mul", 
function (x) {
return (x == 1 ? JU.Quat.new4 (this.q1, this.q2, this.q3, this.q0) : JU.Quat.newVA (this.getNormal (), this.getTheta () * x));
}, "~N");
Clazz.defineMethod (c$, "mulQ", 
function (p) {
return JU.Quat.new4 (this.q0 * p.q1 + this.q1 * p.q0 + this.q2 * p.q3 - this.q3 * p.q2, this.q0 * p.q2 + this.q2 * p.q0 + this.q3 * p.q1 - this.q1 * p.q3, this.q0 * p.q3 + this.q3 * p.q0 + this.q1 * p.q2 - this.q2 * p.q1, this.q0 * p.q0 - this.q1 * p.q1 - this.q2 * p.q2 - this.q3 * p.q3);
}, "JU.Quat");
Clazz.defineMethod (c$, "div", 
function (p) {
return this.mulQ (p.inv ());
}, "JU.Quat");
Clazz.defineMethod (c$, "divLeft", 
function (p) {
return this.inv ().mulQ (p);
}, "JU.Quat");
Clazz.defineMethod (c$, "dot", 
function (q) {
return this.q0 * q.q0 + this.q1 * q.q1 + this.q2 * q.q2 + this.q3 * q.q3;
}, "JU.Quat");
Clazz.defineMethod (c$, "inv", 
function () {
return JU.Quat.new4 (-this.q1, -this.q2, -this.q3, this.q0);
});
Clazz.defineMethod (c$, "negate", 
function () {
return JU.Quat.new4 (-this.q1, -this.q2, -this.q3, -this.q0);
});
Clazz.defineMethod (c$, "getFixFactor", 
 function () {
return (this.q0 < 0 || this.q0 == 0 && (this.q1 < 0 || this.q1 == 0 && (this.q2 < 0 || this.q2 == 0 && this.q3 < 0)) ? -1 : 1);
});
Clazz.defineMethod (c$, "getVector", 
function (i) {
return this.getVectorScaled (i, 1);
}, "~N");
Clazz.defineMethod (c$, "getVectorScaled", 
function (i, scale) {
if (i == -1) {
scale *= this.getFixFactor ();
return JU.V3.new3 (this.q1 * scale, this.q2 * scale, this.q3 * scale);
}if (this.mat == null) this.setMatrix ();
var v =  new JU.V3 ();
this.mat.getColumnV (i, v);
if (scale != 1) v.scale (scale);
return v;
}, "~N,~N");
Clazz.defineMethod (c$, "getNormal", 
function () {
var v = JU.Quat.getRawNormal (this);
v.scale (this.getFixFactor ());
return v;
});
c$.getRawNormal = Clazz.defineMethod (c$, "getRawNormal", 
 function (q) {
var v = JU.V3.new3 (q.q1, q.q2, q.q3);
if (v.length () == 0) return JU.V3.new3 (0, 0, 1);
v.normalize ();
return v;
}, "JU.Quat");
Clazz.defineMethod (c$, "getTheta", 
function () {
return (Math.acos (Math.abs (this.q0)) * 2 * 180 / 3.141592653589793);
});
Clazz.defineMethod (c$, "getThetaRadians", 
function () {
return (Math.acos (Math.abs (this.q0)) * 2);
});
Clazz.defineMethod (c$, "getNormalDirected", 
function (v0) {
var v = this.getNormal ();
if (v.x * v0.x + v.y * v0.y + v.z * v0.z < 0) {
v.scale (-1);
}return v;
}, "JU.V3");
Clazz.defineMethod (c$, "get3dProjection", 
function (v3d) {
v3d.set (this.q1, this.q2, this.q3);
return v3d;
}, "JU.V3");
Clazz.defineMethod (c$, "getThetaDirected", 
function (axisAngle) {
var theta = this.getTheta ();
var v = this.getNormal ();
if (axisAngle.x * this.q1 + axisAngle.y * this.q2 + axisAngle.z * this.q3 < 0) {
v.scale (-1);
theta = -theta;
}axisAngle.set4 (v.x, v.y, v.z, theta);
return axisAngle;
}, "JU.P4");
Clazz.defineMethod (c$, "getThetaDirectedV", 
function (vector) {
var theta = this.getTheta ();
var v = this.getNormal ();
if (vector.x * this.q1 + vector.y * this.q2 + vector.z * this.q3 < 0) {
v.scale (-1);
theta = -theta;
}return theta;
}, "JU.V3");
Clazz.defineMethod (c$, "toPoint4f", 
function () {
return JU.P4.new4 (this.q1, this.q2, this.q3, this.q0);
});
Clazz.defineMethod (c$, "toAxisAngle4f", 
function () {
var theta = 2 * Math.acos (Math.abs (this.q0));
var sinTheta2 = Math.sin (theta / 2);
var v = this.getNormal ();
if (sinTheta2 < 0) {
v.scale (-1);
theta = 3.141592653589793 - theta;
}return JU.A4.newVA (v, theta);
});
Clazz.defineMethod (c$, "transform2", 
function (pt, ptNew) {
if (this.mat == null) this.setMatrix ();
this.mat.rotate2 (pt, ptNew);
return ptNew;
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "leftDifference", 
function (q2) {
var q2adjusted = (this.dot (q2) < 0 ? q2.negate () : q2);
return this.inv ().mulQ (q2adjusted);
}, "JU.Quat");
Clazz.defineMethod (c$, "rightDifference", 
function (q2) {
var q2adjusted = (this.dot (q2) < 0 ? q2.negate () : q2);
return this.mulQ (q2adjusted.inv ());
}, "JU.Quat");
Clazz.overrideMethod (c$, "toString", 
function () {
return "{" + this.q1 + " " + this.q2 + " " + this.q3 + " " + this.q0 + "}";
});
c$.div = Clazz.defineMethod (c$, "div", 
function (data1, data2, nMax, isRelative) {
var n;
if (data1 == null || data2 == null || (n = Math.min (data1.length, data2.length)) == 0) return null;
if (nMax > 0 && n > nMax) n = nMax;
var dqs =  new Array (n);
for (var i = 0; i < n; i++) {
if (data1[i] == null || data2[i] == null) return null;
dqs[i] = (isRelative ? data1[i].divLeft (data2[i]) : data1[i].div (data2[i]));
}
return dqs;
}, "~A,~A,~N,~B");
c$.sphereMean = Clazz.defineMethod (c$, "sphereMean", 
function (data, retStddev, criterion) {
if (data == null || data.length == 0) return  new JU.Quat ();
if (retStddev == null) retStddev =  Clazz.newFloatArray (1, 0);
if (data.length == 1) {
retStddev[0] = 0;
return JU.Quat.newQ (data[0]);
}var diff = 3.4028235E38;
var lastStddev = 3.4028235E38;
var qMean = JU.Quat.simpleAverage (data);
var maxIter = 100;
var iter = 0;
while (diff > criterion && lastStddev != 0 && iter < maxIter) {
qMean = JU.Quat.newMean (data, qMean);
retStddev[0] = JU.Quat.stdDev (data, qMean);
diff = Math.abs (retStddev[0] - lastStddev);
lastStddev = retStddev[0];
}
return qMean;
}, "~A,~A,~N");
c$.simpleAverage = Clazz.defineMethod (c$, "simpleAverage", 
 function (ndata) {
var mean = JU.V3.new3 (0, 0, 1);
var v = ndata[0].getNormal ();
mean.add (v);
for (var i = ndata.length; --i >= 0; ) mean.add (ndata[i].getNormalDirected (mean));

mean.sub (v);
mean.normalize ();
var f = 0;
for (var i = ndata.length; --i >= 0; ) f += Math.abs (ndata[i].get3dProjection (v).dot (mean));

if (f != 0) mean.scale (f / ndata.length);
f = Math.sqrt (1 - mean.lengthSquared ());
if (Float.isNaN (f)) f = 0;
return JU.Quat.newP4 (JU.P4.new4 (mean.x, mean.y, mean.z, f));
}, "~A");
c$.newMean = Clazz.defineMethod (c$, "newMean", 
 function (data, mean) {
var sum =  new JU.V3 ();
var v;
var q;
var dq;
for (var i = data.length; --i >= 0; ) {
q = data[i];
dq = q.div (mean);
v = dq.getNormal ();
v.scale (dq.getTheta ());
sum.add (v);
}
sum.scale (1 / data.length);
var dqMean = JU.Quat.newVA (sum, sum.length ());
return dqMean.mulQ (mean);
}, "~A,JU.Quat");
c$.stdDev = Clazz.defineMethod (c$, "stdDev", 
 function (data, mean) {
var sum2 = 0;
var n = data.length;
for (var i = n; --i >= 0; ) {
var theta = data[i].div (mean).getTheta ();
sum2 += theta * theta;
}
return Math.sqrt (sum2 / n);
}, "~A,JU.Quat");
Clazz.defineMethod (c$, "getEulerZYZ", 
function () {
var rA;
var rB;
var rG;
if (this.q1 == 0 && this.q2 == 0) {
var theta = this.getTheta ();
return  Clazz.newFloatArray (-1, [this.q3 < 0 ? -theta : theta, 0, 0]);
}rA = Math.atan2 (2 * (this.q2 * this.q3 + this.q0 * this.q1), 2 * (-this.q1 * this.q3 + this.q0 * this.q2));
rB = Math.acos (this.q3 * this.q3 - this.q2 * this.q2 - this.q1 * this.q1 + this.q0 * this.q0);
rG = Math.atan2 (2 * (this.q2 * this.q3 - this.q0 * this.q1), 2 * (this.q0 * this.q2 + this.q1 * this.q3));
return  Clazz.newFloatArray (-1, [(rA / 0.017453292519943295), (rB / 0.017453292519943295), (rG / 0.017453292519943295)]);
});
Clazz.defineMethod (c$, "getEulerZXZ", 
function () {
var rA;
var rB;
var rG;
if (this.q1 == 0 && this.q2 == 0) {
var theta = this.getTheta ();
return  Clazz.newFloatArray (-1, [this.q3 < 0 ? -theta : theta, 0, 0]);
}rA = Math.atan2 (2 * (this.q1 * this.q3 - this.q0 * this.q2), 2 * (this.q0 * this.q1 + this.q2 * this.q3));
rB = Math.acos (this.q3 * this.q3 - this.q2 * this.q2 - this.q1 * this.q1 + this.q0 * this.q0);
rG = Math.atan2 (2 * (this.q1 * this.q3 + this.q0 * this.q2), 2 * (-this.q2 * this.q3 + this.q0 * this.q1));
return  Clazz.newFloatArray (-1, [(rA / 0.017453292519943295), (rB / 0.017453292519943295), (rG / 0.017453292519943295)]);
});
c$.qZero = c$.prototype.qZero =  new JU.P4 ();
Clazz.defineStatics (c$,
"RAD_PER_DEG", 0.017453292519943295);
});
