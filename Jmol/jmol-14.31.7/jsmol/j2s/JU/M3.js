Clazz.declarePackage ("JU");
Clazz.load (["JU.M34"], "JU.M3", ["JU.T3"], function () {
c$ = Clazz.declareType (JU, "M3", JU.M34, java.io.Serializable);
c$.newA9 = Clazz.defineMethod (c$, "newA9", 
function (v) {
var m =  new JU.M3 ();
m.setA (v);
return m;
}, "~A");
c$.newM3 = Clazz.defineMethod (c$, "newM3", 
function (m1) {
var m =  new JU.M3 ();
if (m1 == null) {
m.setScale (1);
return m;
}m.m00 = m1.m00;
m.m01 = m1.m01;
m.m02 = m1.m02;
m.m10 = m1.m10;
m.m11 = m1.m11;
m.m12 = m1.m12;
m.m20 = m1.m20;
m.m21 = m1.m21;
m.m22 = m1.m22;
return m;
}, "JU.M3");
Clazz.defineMethod (c$, "setScale", 
function (scale) {
this.clear33 ();
this.m00 = this.m11 = this.m22 = scale;
}, "~N");
Clazz.defineMethod (c$, "setM3", 
function (m1) {
this.setM33 (m1);
}, "JU.M34");
Clazz.defineMethod (c$, "setA", 
function (m) {
this.m00 = m[0];
this.m01 = m[1];
this.m02 = m[2];
this.m10 = m[3];
this.m11 = m[4];
this.m12 = m[5];
this.m20 = m[6];
this.m21 = m[7];
this.m22 = m[8];
}, "~A");
Clazz.defineMethod (c$, "setElement", 
function (row, col, v) {
this.set33 (row, col, v);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getElement", 
function (row, col) {
return this.get33 (row, col);
}, "~N,~N");
Clazz.defineMethod (c$, "setRow", 
function (row, x, y, z) {
switch (row) {
case 0:
this.m00 = x;
this.m01 = y;
this.m02 = z;
return;
case 1:
this.m10 = x;
this.m11 = y;
this.m12 = z;
return;
case 2:
this.m20 = x;
this.m21 = y;
this.m22 = z;
return;
default:
this.err ();
}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setRowV", 
function (row, v) {
switch (row) {
case 0:
this.m00 = v.x;
this.m01 = v.y;
this.m02 = v.z;
return;
case 1:
this.m10 = v.x;
this.m11 = v.y;
this.m12 = v.z;
return;
case 2:
this.m20 = v.x;
this.m21 = v.y;
this.m22 = v.z;
return;
default:
this.err ();
}
}, "~N,JU.T3");
Clazz.defineMethod (c$, "setRowA", 
function (row, v) {
this.setRow33 (row, v);
}, "~N,~A");
Clazz.overrideMethod (c$, "getRow", 
function (row, v) {
this.getRow33 (row, v);
}, "~N,~A");
Clazz.defineMethod (c$, "setColumn3", 
function (column, x, y, z) {
switch (column) {
case 0:
this.m00 = x;
this.m10 = y;
this.m20 = z;
break;
case 1:
this.m01 = x;
this.m11 = y;
this.m21 = z;
break;
case 2:
this.m02 = x;
this.m12 = y;
this.m22 = z;
break;
default:
this.err ();
}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setColumnV", 
function (column, v) {
switch (column) {
case 0:
this.m00 = v.x;
this.m10 = v.y;
this.m20 = v.z;
break;
case 1:
this.m01 = v.x;
this.m11 = v.y;
this.m21 = v.z;
break;
case 2:
this.m02 = v.x;
this.m12 = v.y;
this.m22 = v.z;
break;
default:
this.err ();
}
}, "~N,JU.T3");
Clazz.defineMethod (c$, "getColumnV", 
function (column, v) {
switch (column) {
case 0:
v.x = this.m00;
v.y = this.m10;
v.z = this.m20;
break;
case 1:
v.x = this.m01;
v.y = this.m11;
v.z = this.m21;
break;
case 2:
v.x = this.m02;
v.y = this.m12;
v.z = this.m22;
break;
default:
this.err ();
}
}, "~N,JU.T3");
Clazz.defineMethod (c$, "setColumnA", 
function (column, v) {
this.setColumn33 (column, v);
}, "~N,~A");
Clazz.defineMethod (c$, "getColumn", 
function (column, v) {
this.getColumn33 (column, v);
}, "~N,~A");
Clazz.defineMethod (c$, "add", 
function (m1) {
this.add33 (m1);
}, "JU.M3");
Clazz.defineMethod (c$, "sub", 
function (m1) {
this.sub33 (m1);
}, "JU.M3");
Clazz.defineMethod (c$, "transpose", 
function () {
this.transpose33 ();
});
Clazz.defineMethod (c$, "transposeM", 
function (m1) {
this.setM33 (m1);
this.transpose33 ();
}, "JU.M3");
Clazz.defineMethod (c$, "invertM", 
function (m1) {
this.setM33 (m1);
this.invert ();
}, "JU.M3");
Clazz.defineMethod (c$, "invert", 
function () {
var s = this.determinant3 ();
if (s == 0.0) return;
s = 1 / s;
this.set9 (this.m11 * this.m22 - this.m12 * this.m21, this.m02 * this.m21 - this.m01 * this.m22, this.m01 * this.m12 - this.m02 * this.m11, this.m12 * this.m20 - this.m10 * this.m22, this.m00 * this.m22 - this.m02 * this.m20, this.m02 * this.m10 - this.m00 * this.m12, this.m10 * this.m21 - this.m11 * this.m20, this.m01 * this.m20 - this.m00 * this.m21, this.m00 * this.m11 - this.m01 * this.m10);
this.scale (s);
});
Clazz.defineMethod (c$, "setAsXRotation", 
function (angle) {
this.setXRot (angle);
return this;
}, "~N");
Clazz.defineMethod (c$, "setAsYRotation", 
function (angle) {
this.setYRot (angle);
return this;
}, "~N");
Clazz.defineMethod (c$, "setAsZRotation", 
function (angle) {
this.setZRot (angle);
return this;
}, "~N");
Clazz.defineMethod (c$, "scale", 
function (scalar) {
this.mul33 (scalar);
}, "~N");
Clazz.defineMethod (c$, "mul", 
function (m1) {
this.mul2 (this, m1);
}, "JU.M3");
Clazz.defineMethod (c$, "mul2", 
function (m1, m2) {
this.set9 (m1.m00 * m2.m00 + m1.m01 * m2.m10 + m1.m02 * m2.m20, m1.m00 * m2.m01 + m1.m01 * m2.m11 + m1.m02 * m2.m21, m1.m00 * m2.m02 + m1.m01 * m2.m12 + m1.m02 * m2.m22, m1.m10 * m2.m00 + m1.m11 * m2.m10 + m1.m12 * m2.m20, m1.m10 * m2.m01 + m1.m11 * m2.m11 + m1.m12 * m2.m21, m1.m10 * m2.m02 + m1.m11 * m2.m12 + m1.m12 * m2.m22, m1.m20 * m2.m00 + m1.m21 * m2.m10 + m1.m22 * m2.m20, m1.m20 * m2.m01 + m1.m21 * m2.m11 + m1.m22 * m2.m21, m1.m20 * m2.m02 + m1.m21 * m2.m12 + m1.m22 * m2.m22);
}, "JU.M3,JU.M3");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, JU.M3))) return false;
var m = o;
return this.m00 == m.m00 && this.m01 == m.m01 && this.m02 == m.m02 && this.m10 == m.m10 && this.m11 == m.m11 && this.m12 == m.m12 && this.m20 == m.m20 && this.m21 == m.m21 && this.m22 == m.m22;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return JU.T3.floatToIntBits (this.m00) ^ JU.T3.floatToIntBits (this.m01) ^ JU.T3.floatToIntBits (this.m02) ^ JU.T3.floatToIntBits (this.m10) ^ JU.T3.floatToIntBits (this.m11) ^ JU.T3.floatToIntBits (this.m12) ^ JU.T3.floatToIntBits (this.m20) ^ JU.T3.floatToIntBits (this.m21) ^ JU.T3.floatToIntBits (this.m22);
});
Clazz.defineMethod (c$, "setZero", 
function () {
this.clear33 ();
});
Clazz.defineMethod (c$, "set9", 
 function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
this.m00 = m00;
this.m01 = m01;
this.m02 = m02;
this.m10 = m10;
this.m11 = m11;
this.m12 = m12;
this.m20 = m20;
this.m21 = m21;
this.m22 = m22;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "[\n  [" + this.m00 + "\t" + this.m01 + "\t" + this.m02 + "]" + "\n  [" + this.m10 + "\t" + this.m11 + "\t" + this.m12 + "]" + "\n  [" + this.m20 + "\t" + this.m21 + "\t" + this.m22 + "] ]";
});
Clazz.defineMethod (c$, "setAA", 
function (a) {
this.setAA33 (a);
return this;
}, "JU.A4");
Clazz.defineMethod (c$, "setAsBallRotation", 
function (responseFactor, dx, dy) {
var r = Math.sqrt (dx * dx + dy * dy);
var th = r * responseFactor;
if (th == 0) {
this.setScale (1);
return false;
}var c = Math.cos (th);
var s = Math.sin (th);
var nx = -dy / r;
var ny = dx / r;
var c1 = c - 1;
this.m00 = 1 + c1 * nx * nx;
this.m01 = this.m10 = c1 * nx * ny;
this.m20 = -(this.m02 = s * nx);
this.m11 = 1 + c1 * ny * ny;
this.m21 = -(this.m12 = s * ny);
this.m22 = c;
return true;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "isRotation", 
function () {
return (Math.abs (this.determinant3 () - 1) < 0.001);
});
});
