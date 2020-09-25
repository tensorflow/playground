Clazz.declarePackage ("JU");
Clazz.load (["javajs.api.EigenInterface"], "JU.Eigen", ["JU.V3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.n = 3;
this.d = null;
this.e = null;
this.V = null;
Clazz.instantialize (this, arguments);
}, JU, "Eigen", null, javajs.api.EigenInterface);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (n) {
this.n = n;
this.V =  Clazz.newDoubleArray (n, n, 0);
this.d =  Clazz.newDoubleArray (n, 0);
this.e =  Clazz.newDoubleArray (n, 0);
return this;
}, "~N");
Clazz.overrideMethod (c$, "setM", 
function (m) {
this.set (m.length);
this.calc (m);
return this;
}, "~A");
Clazz.overrideMethod (c$, "getEigenvalues", 
function () {
return this.d;
});
Clazz.overrideMethod (c$, "fillFloatArrays", 
function (eigenVectors, eigenValues) {
for (var i = 0; i < 3; i++) {
if (eigenVectors != null) {
if (eigenVectors[i] == null) eigenVectors[i] =  new JU.V3 ();
eigenVectors[i].set (this.V[0][i], this.V[1][i], this.V[2][i]);
}if (eigenValues != null) eigenValues[i] = this.d[i];
}
}, "~A,~A");
Clazz.overrideMethod (c$, "getEigenvectorsFloatTransposed", 
function () {
var f =  Clazz.newFloatArray (this.n, this.n, 0);
for (var i = this.n; --i >= 0; ) for (var j = this.n; --j >= 0; ) f[j][i] = this.V[i][j];


return f;
});
Clazz.defineMethod (c$, "calc", 
function (A) {
for (var i = 0; i < this.n; i++) {
for (var j = 0; j < this.n; j++) {
this.V[i][j] = A[i][j];
}
}
this.tred2 ();
this.tql2 ();
}, "~A");
Clazz.defineMethod (c$, "getRealEigenvalues", 
function () {
return this.d;
});
Clazz.defineMethod (c$, "getImagEigenvalues", 
function () {
return this.e;
});
Clazz.defineMethod (c$, "tred2", 
 function () {
for (var j = 0; j < this.n; j++) {
this.d[j] = this.V[this.n - 1][j];
}
for (var i = this.n - 1; i > 0; i--) {
var scale = 0.0;
var h = 0.0;
for (var k = 0; k < i; k++) {
scale = scale + Math.abs (this.d[k]);
}
if (scale == 0.0) {
this.e[i] = this.d[i - 1];
for (var j = 0; j < i; j++) {
this.d[j] = this.V[i - 1][j];
this.V[i][j] = 0.0;
this.V[j][i] = 0.0;
}
} else {
for (var k = 0; k < i; k++) {
this.d[k] /= scale;
h += this.d[k] * this.d[k];
}
var f = this.d[i - 1];
var g = Math.sqrt (h);
if (f > 0) {
g = -g;
}this.e[i] = scale * g;
h = h - f * g;
this.d[i - 1] = f - g;
for (var j = 0; j < i; j++) {
this.e[j] = 0.0;
}
for (var j = 0; j < i; j++) {
f = this.d[j];
this.V[j][i] = f;
g = this.e[j] + this.V[j][j] * f;
for (var k = j + 1; k <= i - 1; k++) {
g += this.V[k][j] * this.d[k];
this.e[k] += this.V[k][j] * f;
}
this.e[j] = g;
}
f = 0.0;
for (var j = 0; j < i; j++) {
this.e[j] /= h;
f += this.e[j] * this.d[j];
}
var hh = f / (h + h);
for (var j = 0; j < i; j++) {
this.e[j] -= hh * this.d[j];
}
for (var j = 0; j < i; j++) {
f = this.d[j];
g = this.e[j];
for (var k = j; k <= i - 1; k++) {
this.V[k][j] -= (f * this.e[k] + g * this.d[k]);
}
this.d[j] = this.V[i - 1][j];
this.V[i][j] = 0.0;
}
}this.d[i] = h;
}
for (var i = 0; i < this.n - 1; i++) {
this.V[this.n - 1][i] = this.V[i][i];
this.V[i][i] = 1.0;
var h = this.d[i + 1];
if (h != 0.0) {
for (var k = 0; k <= i; k++) {
this.d[k] = this.V[k][i + 1] / h;
}
for (var j = 0; j <= i; j++) {
var g = 0.0;
for (var k = 0; k <= i; k++) {
g += this.V[k][i + 1] * this.V[k][j];
}
for (var k = 0; k <= i; k++) {
this.V[k][j] -= g * this.d[k];
}
}
}for (var k = 0; k <= i; k++) {
this.V[k][i + 1] = 0.0;
}
}
for (var j = 0; j < this.n; j++) {
this.d[j] = this.V[this.n - 1][j];
this.V[this.n - 1][j] = 0.0;
}
this.V[this.n - 1][this.n - 1] = 1.0;
this.e[0] = 0.0;
});
Clazz.defineMethod (c$, "tql2", 
 function () {
for (var i = 1; i < this.n; i++) {
this.e[i - 1] = this.e[i];
}
this.e[this.n - 1] = 0.0;
var f = 0.0;
var tst1 = 0.0;
var eps = Math.pow (2.0, -52.0);
for (var l = 0; l < this.n; l++) {
tst1 = Math.max (tst1, Math.abs (this.d[l]) + Math.abs (this.e[l]));
var m = l;
while (m < this.n) {
if (Math.abs (this.e[m]) <= eps * tst1) {
break;
}m++;
}
if (m > l) {
var iter = 0;
do {
iter = iter + 1;
var g = this.d[l];
var p = (this.d[l + 1] - g) / (2.0 * this.e[l]);
var r = JU.Eigen.hypot (p, 1.0);
if (p < 0) {
r = -r;
}this.d[l] = this.e[l] / (p + r);
this.d[l + 1] = this.e[l] * (p + r);
var dl1 = this.d[l + 1];
var h = g - this.d[l];
for (var i = l + 2; i < this.n; i++) {
this.d[i] -= h;
}
f = f + h;
p = this.d[m];
var c = 1.0;
var c2 = c;
var c3 = c;
var el1 = this.e[l + 1];
var s = 0.0;
var s2 = 0.0;
for (var i = m - 1; i >= l; i--) {
c3 = c2;
c2 = c;
s2 = s;
g = c * this.e[i];
h = c * p;
r = JU.Eigen.hypot (p, this.e[i]);
this.e[i + 1] = s * r;
s = this.e[i] / r;
c = p / r;
p = c * this.d[i] - s * g;
this.d[i + 1] = h + s * (c * g + s * this.d[i]);
for (var k = 0; k < this.n; k++) {
h = this.V[k][i + 1];
this.V[k][i + 1] = s * this.V[k][i] + c * h;
this.V[k][i] = c * this.V[k][i] - s * h;
}
}
p = -s * s2 * c3 * el1 * this.e[l] / dl1;
this.e[l] = s * p;
this.d[l] = c * p;
} while (Math.abs (this.e[l]) > eps * tst1);
}this.d[l] = this.d[l] + f;
this.e[l] = 0.0;
}
for (var i = 0; i < this.n - 1; i++) {
var k = i;
var p = this.d[i];
for (var j = i + 1; j < this.n; j++) {
if (this.d[j] < p) {
k = j;
p = this.d[j];
}}
if (k != i) {
this.d[k] = this.d[i];
this.d[i] = p;
for (var j = 0; j < this.n; j++) {
p = this.V[j][i];
this.V[j][i] = this.V[j][k];
this.V[j][k] = p;
}
}}
});
c$.hypot = Clazz.defineMethod (c$, "hypot", 
 function (a, b) {
var r;
if (Math.abs (a) > Math.abs (b)) {
r = b / a;
r = Math.abs (a) * Math.sqrt (1 + r * r);
} else if (b != 0) {
r = a / b;
r = Math.abs (b) * Math.sqrt (1 + r * r);
} else {
r = 0.0;
}return r;
}, "~N,~N");
});
