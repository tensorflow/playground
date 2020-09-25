Clazz.declarePackage ("JU");
Clazz.load (["JU.M34"], "JU.M4", ["JU.T3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.m03 = 0;
this.m13 = 0;
this.m23 = 0;
this.m30 = 0;
this.m31 = 0;
this.m32 = 0;
this.m33 = 0;
Clazz.instantialize (this, arguments);
}, JU, "M4", JU.M34);
c$.newA16 = Clazz.defineMethod (c$, "newA16", 
function (v) {
var m =  new JU.M4 ();
m.m00 = v[0];
m.m01 = v[1];
m.m02 = v[2];
m.m03 = v[3];
m.m10 = v[4];
m.m11 = v[5];
m.m12 = v[6];
m.m13 = v[7];
m.m20 = v[8];
m.m21 = v[9];
m.m22 = v[10];
m.m23 = v[11];
m.m30 = v[12];
m.m31 = v[13];
m.m32 = v[14];
m.m33 = v[15];
return m;
}, "~A");
c$.newM4 = Clazz.defineMethod (c$, "newM4", 
function (m1) {
var m =  new JU.M4 ();
if (m1 == null) {
m.setIdentity ();
return m;
}m.setToM3 (m1);
m.m03 = m1.m03;
m.m13 = m1.m13;
m.m23 = m1.m23;
m.m30 = m1.m30;
m.m31 = m1.m31;
m.m32 = m1.m32;
m.m33 = m1.m33;
return m;
}, "JU.M4");
c$.newMV = Clazz.defineMethod (c$, "newMV", 
function (m1, t) {
var m =  new JU.M4 ();
m.setMV (m1, t);
return m;
}, "JU.M3,JU.T3");
Clazz.defineMethod (c$, "setZero", 
function () {
this.clear33 ();
this.m03 = this.m13 = this.m23 = this.m30 = this.m31 = this.m32 = this.m33 = 0.0;
});
Clazz.defineMethod (c$, "setIdentity", 
function () {
this.setZero ();
this.m00 = this.m11 = this.m22 = this.m33 = 1.0;
});
Clazz.defineMethod (c$, "setM4", 
function (m1) {
this.setM33 (m1);
this.m03 = m1.m03;
this.m13 = m1.m13;
this.m23 = m1.m23;
this.m30 = m1.m30;
this.m31 = m1.m31;
this.m32 = m1.m32;
this.m33 = m1.m33;
return this;
}, "JU.M4");
Clazz.defineMethod (c$, "setMV", 
function (m1, t) {
this.setM33 (m1);
this.setTranslation (t);
this.m33 = 1;
}, "JU.M3,JU.T3");
Clazz.defineMethod (c$, "setToM3", 
function (m1) {
this.setM33 (m1);
this.m03 = this.m13 = this.m23 = this.m30 = this.m31 = this.m32 = 0.0;
this.m33 = 1.0;
}, "JU.M34");
Clazz.defineMethod (c$, "setToAA", 
function (a) {
this.setIdentity ();
this.setAA33 (a);
}, "JU.A4");
Clazz.defineMethod (c$, "setA", 
function (m) {
this.m00 = m[0];
this.m01 = m[1];
this.m02 = m[2];
this.m03 = m[3];
this.m10 = m[4];
this.m11 = m[5];
this.m12 = m[6];
this.m13 = m[7];
this.m20 = m[8];
this.m21 = m[9];
this.m22 = m[10];
this.m23 = m[11];
this.m30 = m[12];
this.m31 = m[13];
this.m32 = m[14];
this.m33 = m[15];
}, "~A");
Clazz.defineMethod (c$, "setTranslation", 
function (trans) {
this.m03 = trans.x;
this.m13 = trans.y;
this.m23 = trans.z;
}, "JU.T3");
Clazz.defineMethod (c$, "setElement", 
function (row, col, v) {
if (row < 3 && col < 3) {
this.set33 (row, col, v);
return;
}if (row > 3 || col > 3) this.err ();
switch (row) {
case 0:
this.m03 = v;
return;
case 1:
this.m13 = v;
return;
case 2:
this.m23 = v;
return;
}
switch (col) {
case 0:
this.m30 = v;
return;
case 1:
this.m31 = v;
return;
case 2:
this.m32 = v;
return;
case 3:
this.m33 = v;
return;
}
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getElement", 
function (row, col) {
if (row < 3 && col < 3) return this.get33 (row, col);
if (row > 3 || col > 3) {
this.err ();
return 0;
}switch (row) {
case 0:
return this.m03;
case 1:
return this.m13;
case 2:
return this.m23;
default:
switch (col) {
case 0:
return this.m30;
case 1:
return this.m31;
case 2:
return this.m32;
default:
return this.m33;
}
}
}, "~N,~N");
Clazz.defineMethod (c$, "getTranslation", 
function (trans) {
trans.x = this.m03;
trans.y = this.m13;
trans.z = this.m23;
}, "JU.T3");
Clazz.defineMethod (c$, "getRotationScale", 
function (m1) {
m1.m00 = this.m00;
m1.m01 = this.m01;
m1.m02 = this.m02;
m1.m10 = this.m10;
m1.m11 = this.m11;
m1.m12 = this.m12;
m1.m20 = this.m20;
m1.m21 = this.m21;
m1.m22 = this.m22;
}, "JU.M3");
Clazz.defineMethod (c$, "setRotationScale", 
function (m1) {
this.m00 = m1.m00;
this.m01 = m1.m01;
this.m02 = m1.m02;
this.m10 = m1.m10;
this.m11 = m1.m11;
this.m12 = m1.m12;
this.m20 = m1.m20;
this.m21 = m1.m21;
this.m22 = m1.m22;
}, "JU.M3");
Clazz.defineMethod (c$, "setRowA", 
function (row, v) {
if (row < 3) this.setRow33 (row, v);
switch (row) {
case 0:
this.m03 = v[3];
return;
case 1:
this.m13 = v[3];
return;
case 2:
this.m23 = v[3];
return;
case 3:
this.m30 = v[0];
this.m31 = v[1];
this.m32 = v[2];
this.m33 = v[3];
return;
}
this.err ();
}, "~N,~A");
Clazz.overrideMethod (c$, "getRow", 
function (row, v) {
if (row < 3) this.getRow33 (row, v);
switch (row) {
case 0:
v[3] = this.m03;
return;
case 1:
v[3] = this.m13;
return;
case 2:
v[3] = this.m23;
return;
case 3:
v[0] = this.m30;
v[1] = this.m31;
v[2] = this.m32;
v[3] = this.m33;
return;
}
this.err ();
}, "~N,~A");
Clazz.defineMethod (c$, "setColumn4", 
function (column, x, y, z, w) {
if (column == 0) {
this.m00 = x;
this.m10 = y;
this.m20 = z;
this.m30 = w;
} else if (column == 1) {
this.m01 = x;
this.m11 = y;
this.m21 = z;
this.m31 = w;
} else if (column == 2) {
this.m02 = x;
this.m12 = y;
this.m22 = z;
this.m32 = w;
} else if (column == 3) {
this.m03 = x;
this.m13 = y;
this.m23 = z;
this.m33 = w;
} else {
this.err ();
}}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setColumnA", 
function (column, v) {
if (column < 3) this.setColumn33 (column, v);
switch (column) {
case 0:
this.m30 = v[3];
return;
case 1:
this.m31 = v[3];
return;
case 2:
this.m32 = v[3];
return;
case 3:
this.m03 = v[0];
this.m13 = v[1];
this.m23 = v[2];
this.m33 = v[3];
return;
default:
this.err ();
}
}, "~N,~A");
Clazz.defineMethod (c$, "getColumn", 
function (column, v) {
if (column < 3) this.getColumn33 (column, v);
switch (column) {
case 0:
v[3] = this.m30;
return;
case 1:
v[3] = this.m31;
return;
case 2:
v[3] = this.m32;
return;
case 3:
v[0] = this.m03;
v[1] = this.m13;
v[2] = this.m23;
v[3] = this.m33;
return;
default:
this.err ();
}
}, "~N,~A");
Clazz.defineMethod (c$, "sub", 
function (m1) {
this.sub33 (m1);
this.m03 -= m1.m03;
this.m13 -= m1.m13;
this.m23 -= m1.m23;
this.m30 -= m1.m30;
this.m31 -= m1.m31;
this.m32 -= m1.m32;
this.m33 -= m1.m33;
}, "JU.M4");
Clazz.defineMethod (c$, "transpose", 
function () {
this.transpose33 ();
var tmp = this.m03;
this.m03 = this.m30;
this.m30 = tmp;
tmp = this.m13;
this.m13 = this.m31;
this.m31 = tmp;
tmp = this.m23;
this.m23 = this.m32;
this.m32 = tmp;
});
Clazz.defineMethod (c$, "invert", 
function () {
var s = this.determinant4 ();
if (s == 0.0) return this;
s = 1 / s;
this.set (this.m11 * (this.m22 * this.m33 - this.m23 * this.m32) + this.m12 * (this.m23 * this.m31 - this.m21 * this.m33) + this.m13 * (this.m21 * this.m32 - this.m22 * this.m31), this.m21 * (this.m02 * this.m33 - this.m03 * this.m32) + this.m22 * (this.m03 * this.m31 - this.m01 * this.m33) + this.m23 * (this.m01 * this.m32 - this.m02 * this.m31), this.m31 * (this.m02 * this.m13 - this.m03 * this.m12) + this.m32 * (this.m03 * this.m11 - this.m01 * this.m13) + this.m33 * (this.m01 * this.m12 - this.m02 * this.m11), this.m01 * (this.m13 * this.m22 - this.m12 * this.m23) + this.m02 * (this.m11 * this.m23 - this.m13 * this.m21) + this.m03 * (this.m12 * this.m21 - this.m11 * this.m22), this.m12 * (this.m20 * this.m33 - this.m23 * this.m30) + this.m13 * (this.m22 * this.m30 - this.m20 * this.m32) + this.m10 * (this.m23 * this.m32 - this.m22 * this.m33), this.m22 * (this.m00 * this.m33 - this.m03 * this.m30) + this.m23 * (this.m02 * this.m30 - this.m00 * this.m32) + this.m20 * (this.m03 * this.m32 - this.m02 * this.m33), this.m32 * (this.m00 * this.m13 - this.m03 * this.m10) + this.m33 * (this.m02 * this.m10 - this.m00 * this.m12) + this.m30 * (this.m03 * this.m12 - this.m02 * this.m13), this.m02 * (this.m13 * this.m20 - this.m10 * this.m23) + this.m03 * (this.m10 * this.m22 - this.m12 * this.m20) + this.m00 * (this.m12 * this.m23 - this.m13 * this.m22), this.m13 * (this.m20 * this.m31 - this.m21 * this.m30) + this.m10 * (this.m21 * this.m33 - this.m23 * this.m31) + this.m11 * (this.m23 * this.m30 - this.m20 * this.m33), this.m23 * (this.m00 * this.m31 - this.m01 * this.m30) + this.m20 * (this.m01 * this.m33 - this.m03 * this.m31) + this.m21 * (this.m03 * this.m30 - this.m00 * this.m33), this.m33 * (this.m00 * this.m11 - this.m01 * this.m10) + this.m30 * (this.m01 * this.m13 - this.m03 * this.m11) + this.m31 * (this.m03 * this.m10 - this.m00 * this.m13), this.m03 * (this.m11 * this.m20 - this.m10 * this.m21) + this.m00 * (this.m13 * this.m21 - this.m11 * this.m23) + this.m01 * (this.m10 * this.m23 - this.m13 * this.m20), this.m10 * (this.m22 * this.m31 - this.m21 * this.m32) + this.m11 * (this.m20 * this.m32 - this.m22 * this.m30) + this.m12 * (this.m21 * this.m30 - this.m20 * this.m31), this.m20 * (this.m02 * this.m31 - this.m01 * this.m32) + this.m21 * (this.m00 * this.m32 - this.m02 * this.m30) + this.m22 * (this.m01 * this.m30 - this.m00 * this.m31), this.m30 * (this.m02 * this.m11 - this.m01 * this.m12) + this.m31 * (this.m00 * this.m12 - this.m02 * this.m10) + this.m32 * (this.m01 * this.m10 - this.m00 * this.m11), this.m00 * (this.m11 * this.m22 - this.m12 * this.m21) + this.m01 * (this.m12 * this.m20 - this.m10 * this.m22) + this.m02 * (this.m10 * this.m21 - this.m11 * this.m20));
this.scale (s);
return this;
});
Clazz.defineMethod (c$, "set", 
 function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
this.m00 = m00;
this.m01 = m01;
this.m02 = m02;
this.m03 = m03;
this.m10 = m10;
this.m11 = m11;
this.m12 = m12;
this.m13 = m13;
this.m20 = m20;
this.m21 = m21;
this.m22 = m22;
this.m23 = m23;
this.m30 = m30;
this.m31 = m31;
this.m32 = m32;
this.m33 = m33;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "determinant4", 
function () {
return (this.m00 * this.m11 - this.m01 * this.m10) * (this.m22 * this.m33 - this.m23 * this.m32) - (this.m00 * this.m12 - this.m02 * this.m10) * (this.m21 * this.m33 - this.m23 * this.m31) + (this.m00 * this.m13 - this.m03 * this.m10) * (this.m21 * this.m32 - this.m22 * this.m31) + (this.m01 * this.m12 - this.m02 * this.m11) * (this.m20 * this.m33 - this.m23 * this.m30) - (this.m01 * this.m13 - this.m03 * this.m11) * (this.m20 * this.m32 - this.m22 * this.m30) + (this.m02 * this.m13 - this.m03 * this.m12) * (this.m20 * this.m31 - this.m21 * this.m30);
});
Clazz.defineMethod (c$, "scale", 
function (scalar) {
this.mul33 (scalar);
this.m03 *= scalar;
this.m13 *= scalar;
this.m23 *= scalar;
this.m30 *= scalar;
this.m31 *= scalar;
this.m32 *= scalar;
this.m33 *= scalar;
}, "~N");
Clazz.defineMethod (c$, "mul", 
function (m1) {
this.mul2 (this, m1);
}, "JU.M4");
Clazz.defineMethod (c$, "mul2", 
function (m1, m2) {
this.set (m1.m00 * m2.m00 + m1.m01 * m2.m10 + m1.m02 * m2.m20 + m1.m03 * m2.m30, m1.m00 * m2.m01 + m1.m01 * m2.m11 + m1.m02 * m2.m21 + m1.m03 * m2.m31, m1.m00 * m2.m02 + m1.m01 * m2.m12 + m1.m02 * m2.m22 + m1.m03 * m2.m32, m1.m00 * m2.m03 + m1.m01 * m2.m13 + m1.m02 * m2.m23 + m1.m03 * m2.m33, m1.m10 * m2.m00 + m1.m11 * m2.m10 + m1.m12 * m2.m20 + m1.m13 * m2.m30, m1.m10 * m2.m01 + m1.m11 * m2.m11 + m1.m12 * m2.m21 + m1.m13 * m2.m31, m1.m10 * m2.m02 + m1.m11 * m2.m12 + m1.m12 * m2.m22 + m1.m13 * m2.m32, m1.m10 * m2.m03 + m1.m11 * m2.m13 + m1.m12 * m2.m23 + m1.m13 * m2.m33, m1.m20 * m2.m00 + m1.m21 * m2.m10 + m1.m22 * m2.m20 + m1.m23 * m2.m30, m1.m20 * m2.m01 + m1.m21 * m2.m11 + m1.m22 * m2.m21 + m1.m23 * m2.m31, m1.m20 * m2.m02 + m1.m21 * m2.m12 + m1.m22 * m2.m22 + m1.m23 * m2.m32, m1.m20 * m2.m03 + m1.m21 * m2.m13 + m1.m22 * m2.m23 + m1.m23 * m2.m33, m1.m30 * m2.m00 + m1.m31 * m2.m10 + m1.m32 * m2.m20 + m1.m33 * m2.m30, m1.m30 * m2.m01 + m1.m31 * m2.m11 + m1.m32 * m2.m21 + m1.m33 * m2.m31, m1.m30 * m2.m02 + m1.m31 * m2.m12 + m1.m32 * m2.m22 + m1.m33 * m2.m32, m1.m30 * m2.m03 + m1.m31 * m2.m13 + m1.m32 * m2.m23 + m1.m33 * m2.m33);
}, "JU.M4,JU.M4");
Clazz.defineMethod (c$, "transform", 
function (vec) {
this.transform2 (vec, vec);
}, "JU.T4");
Clazz.defineMethod (c$, "transform2", 
function (vec, vecOut) {
vecOut.set4 (this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z + this.m03 * vec.w, this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z + this.m13 * vec.w, this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z + this.m23 * vec.w, this.m30 * vec.x + this.m31 * vec.y + this.m32 * vec.z + this.m33 * vec.w);
}, "JU.T4,JU.T4");
Clazz.defineMethod (c$, "rotTrans", 
function (point) {
this.rotTrans2 (point, point);
}, "JU.T3");
Clazz.defineMethod (c$, "rotTrans2", 
function (point, pointOut) {
pointOut.set (this.m00 * point.x + this.m01 * point.y + this.m02 * point.z + this.m03, this.m10 * point.x + this.m11 * point.y + this.m12 * point.z + this.m13, this.m20 * point.x + this.m21 * point.y + this.m22 * point.z + this.m23);
return pointOut;
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "setAsXYRotation", 
function (angle) {
this.setIdentity ();
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m22 = c;
this.m23 = -s;
this.m32 = s;
this.m33 = c;
return this;
}, "~N");
Clazz.defineMethod (c$, "setAsYZRotation", 
function (angle) {
this.setIdentity ();
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = c;
this.m03 = -s;
this.m30 = s;
this.m33 = c;
return this;
}, "~N");
Clazz.defineMethod (c$, "setAsXZRotation", 
function (angle) {
this.setIdentity ();
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m11 = c;
this.m13 = -s;
this.m31 = s;
this.m33 = c;
return this;
}, "~N");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, JU.M4))) return false;
var m = o;
return (this.m00 == m.m00 && this.m01 == m.m01 && this.m02 == m.m02 && this.m03 == m.m03 && this.m10 == m.m10 && this.m11 == m.m11 && this.m12 == m.m12 && this.m13 == m.m13 && this.m20 == m.m20 && this.m21 == m.m21 && this.m22 == m.m22 && this.m23 == m.m23 && this.m30 == m.m30 && this.m31 == m.m31 && this.m32 == m.m32 && this.m33 == m.m33);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return JU.T3.floatToIntBits (this.m00) ^ JU.T3.floatToIntBits (this.m01) ^ JU.T3.floatToIntBits (this.m02) ^ JU.T3.floatToIntBits (this.m03) ^ JU.T3.floatToIntBits (this.m10) ^ JU.T3.floatToIntBits (this.m11) ^ JU.T3.floatToIntBits (this.m12) ^ JU.T3.floatToIntBits (this.m13) ^ JU.T3.floatToIntBits (this.m20) ^ JU.T3.floatToIntBits (this.m21) ^ JU.T3.floatToIntBits (this.m22) ^ JU.T3.floatToIntBits (this.m23) ^ JU.T3.floatToIntBits (this.m30) ^ JU.T3.floatToIntBits (this.m31) ^ JU.T3.floatToIntBits (this.m32) ^ JU.T3.floatToIntBits (this.m33);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "[\n  [" + this.m00 + "\t" + this.m01 + "\t" + this.m02 + "\t" + this.m03 + "]" + "\n  [" + this.m10 + "\t" + this.m11 + "\t" + this.m12 + "\t" + this.m13 + "]" + "\n  [" + this.m20 + "\t" + this.m21 + "\t" + this.m22 + "\t" + this.m23 + "]" + "\n  [" + this.m30 + "\t" + this.m31 + "\t" + this.m32 + "\t" + this.m33 + "] ]";
});
Clazz.defineMethod (c$, "round", 
function (f) {
this.m00 = this.rnd (this.m00, f);
this.m01 = this.rnd (this.m01, f);
this.m02 = this.rnd (this.m02, f);
this.m03 = this.rnd (this.m03, f);
this.m10 = this.rnd (this.m10, f);
this.m11 = this.rnd (this.m11, f);
this.m12 = this.rnd (this.m12, f);
this.m13 = this.rnd (this.m13, f);
this.m20 = this.rnd (this.m20, f);
this.m21 = this.rnd (this.m21, f);
this.m22 = this.rnd (this.m22, f);
this.m23 = this.rnd (this.m23, f);
this.m30 = this.rnd (this.m30, f);
this.m31 = this.rnd (this.m31, f);
this.m32 = this.rnd (this.m32, f);
this.m33 = this.rnd (this.m33, f);
return this;
}, "~N");
Clazz.defineMethod (c$, "rnd", 
 function (n, f) {
return (Math.abs (n) < f ? 0 : n);
}, "~N,~N");
});
