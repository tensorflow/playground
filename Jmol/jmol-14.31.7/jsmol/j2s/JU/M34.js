Clazz.declarePackage ("JU");
Clazz.load (null, "JU.M34", ["java.lang.ArrayIndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.m00 = 0;
this.m01 = 0;
this.m02 = 0;
this.m10 = 0;
this.m11 = 0;
this.m12 = 0;
this.m20 = 0;
this.m21 = 0;
this.m22 = 0;
Clazz.instantialize (this, arguments);
}, JU, "M34");
Clazz.defineMethod (c$, "setAA33", 
function (a) {
var x = a.x;
var y = a.y;
var z = a.z;
var angle = a.angle;
var n = Math.sqrt (x * x + y * y + z * z);
n = 1 / n;
x *= n;
y *= n;
z *= n;
var c = Math.cos (angle);
var s = Math.sin (angle);
var omc = 1.0 - c;
this.m00 = (c + x * x * omc);
this.m11 = (c + y * y * omc);
this.m22 = (c + z * z * omc);
var tmp1 = x * y * omc;
var tmp2 = z * s;
this.m01 = (tmp1 - tmp2);
this.m10 = (tmp1 + tmp2);
tmp1 = x * z * omc;
tmp2 = y * s;
this.m02 = (tmp1 + tmp2);
this.m20 = (tmp1 - tmp2);
tmp1 = y * z * omc;
tmp2 = x * s;
this.m12 = (tmp1 - tmp2);
this.m21 = (tmp1 + tmp2);
}, "JU.A4");
Clazz.defineMethod (c$, "rotate", 
function (t) {
this.rotate2 (t, t);
}, "JU.T3");
Clazz.defineMethod (c$, "rotate2", 
function (t, result) {
result.set (this.m00 * t.x + this.m01 * t.y + this.m02 * t.z, this.m10 * t.x + this.m11 * t.y + this.m12 * t.z, this.m20 * t.x + this.m21 * t.y + this.m22 * t.z);
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "setM33", 
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
}, "JU.M34");
Clazz.defineMethod (c$, "clear33", 
function () {
this.m00 = this.m01 = this.m02 = this.m10 = this.m11 = this.m12 = this.m20 = this.m21 = this.m22 = 0.0;
});
Clazz.defineMethod (c$, "set33", 
function (row, col, v) {
switch (row) {
case 0:
switch (col) {
case 0:
this.m00 = v;
return;
case 1:
this.m01 = v;
return;
case 2:
this.m02 = v;
return;
}
break;
case 1:
switch (col) {
case 0:
this.m10 = v;
return;
case 1:
this.m11 = v;
return;
case 2:
this.m12 = v;
return;
}
break;
case 2:
switch (col) {
case 0:
this.m20 = v;
return;
case 1:
this.m21 = v;
return;
case 2:
this.m22 = v;
return;
}
break;
}
this.err ();
}, "~N,~N,~N");
Clazz.defineMethod (c$, "get33", 
function (row, col) {
switch (row) {
case 0:
switch (col) {
case 0:
return this.m00;
case 1:
return this.m01;
case 2:
return this.m02;
}
break;
case 1:
switch (col) {
case 0:
return this.m10;
case 1:
return this.m11;
case 2:
return this.m12;
}
break;
case 2:
switch (col) {
case 0:
return this.m20;
case 1:
return this.m21;
case 2:
return this.m22;
}
break;
}
this.err ();
return 0;
}, "~N,~N");
Clazz.defineMethod (c$, "setRow33", 
function (row, v) {
switch (row) {
case 0:
this.m00 = v[0];
this.m01 = v[1];
this.m02 = v[2];
return;
case 1:
this.m10 = v[0];
this.m11 = v[1];
this.m12 = v[2];
return;
case 2:
this.m20 = v[0];
this.m21 = v[1];
this.m22 = v[2];
return;
default:
this.err ();
}
}, "~N,~A");
Clazz.defineMethod (c$, "getRow33", 
function (row, v) {
switch (row) {
case 0:
v[0] = this.m00;
v[1] = this.m01;
v[2] = this.m02;
return;
case 1:
v[0] = this.m10;
v[1] = this.m11;
v[2] = this.m12;
return;
case 2:
v[0] = this.m20;
v[1] = this.m21;
v[2] = this.m22;
return;
}
this.err ();
}, "~N,~A");
Clazz.defineMethod (c$, "setColumn33", 
function (column, v) {
switch (column) {
case 0:
this.m00 = v[0];
this.m10 = v[1];
this.m20 = v[2];
break;
case 1:
this.m01 = v[0];
this.m11 = v[1];
this.m21 = v[2];
break;
case 2:
this.m02 = v[0];
this.m12 = v[1];
this.m22 = v[2];
break;
default:
this.err ();
}
}, "~N,~A");
Clazz.defineMethod (c$, "getColumn33", 
function (column, v) {
switch (column) {
case 0:
v[0] = this.m00;
v[1] = this.m10;
v[2] = this.m20;
break;
case 1:
v[0] = this.m01;
v[1] = this.m11;
v[2] = this.m21;
break;
case 2:
v[0] = this.m02;
v[1] = this.m12;
v[2] = this.m22;
break;
default:
this.err ();
}
}, "~N,~A");
Clazz.defineMethod (c$, "add33", 
function (m1) {
this.m00 += m1.m00;
this.m01 += m1.m01;
this.m02 += m1.m02;
this.m10 += m1.m10;
this.m11 += m1.m11;
this.m12 += m1.m12;
this.m20 += m1.m20;
this.m21 += m1.m21;
this.m22 += m1.m22;
}, "JU.M34");
Clazz.defineMethod (c$, "sub33", 
function (m1) {
this.m00 -= m1.m00;
this.m01 -= m1.m01;
this.m02 -= m1.m02;
this.m10 -= m1.m10;
this.m11 -= m1.m11;
this.m12 -= m1.m12;
this.m20 -= m1.m20;
this.m21 -= m1.m21;
this.m22 -= m1.m22;
}, "JU.M34");
Clazz.defineMethod (c$, "mul33", 
function (x) {
this.m00 *= x;
this.m01 *= x;
this.m02 *= x;
this.m10 *= x;
this.m11 *= x;
this.m12 *= x;
this.m20 *= x;
this.m21 *= x;
this.m22 *= x;
}, "~N");
Clazz.defineMethod (c$, "transpose33", 
function () {
var tmp = this.m01;
this.m01 = this.m10;
this.m10 = tmp;
tmp = this.m02;
this.m02 = this.m20;
this.m20 = tmp;
tmp = this.m12;
this.m12 = this.m21;
this.m21 = tmp;
});
Clazz.defineMethod (c$, "setXRot", 
function (angle) {
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = 1.0;
this.m01 = 0.0;
this.m02 = 0.0;
this.m10 = 0.0;
this.m11 = c;
this.m12 = -s;
this.m20 = 0.0;
this.m21 = s;
this.m22 = c;
}, "~N");
Clazz.defineMethod (c$, "setYRot", 
function (angle) {
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = c;
this.m01 = 0.0;
this.m02 = s;
this.m10 = 0.0;
this.m11 = 1.0;
this.m12 = 0.0;
this.m20 = -s;
this.m21 = 0.0;
this.m22 = c;
}, "~N");
Clazz.defineMethod (c$, "setZRot", 
function (angle) {
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = c;
this.m01 = -s;
this.m02 = 0.0;
this.m10 = s;
this.m11 = c;
this.m12 = 0.0;
this.m20 = 0.0;
this.m21 = 0.0;
this.m22 = 1.0;
}, "~N");
Clazz.defineMethod (c$, "determinant3", 
function () {
return this.m00 * (this.m11 * this.m22 - this.m21 * this.m12) - this.m01 * (this.m10 * this.m22 - this.m20 * this.m12) + this.m02 * (this.m10 * this.m21 - this.m20 * this.m11);
});
Clazz.defineMethod (c$, "err", 
function () {
throw  new ArrayIndexOutOfBoundsException ("matrix column/row out of bounds");
});
});
