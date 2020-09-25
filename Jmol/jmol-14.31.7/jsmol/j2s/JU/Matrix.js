Clazz.declarePackage ("JU");
c$ = Clazz.decorateAsClass (function () {
this.a = null;
this.m = 0;
this.n = 0;
if (!Clazz.isClassDefined ("JU.Matrix.LUDecomp")) {
JU.Matrix.$Matrix$LUDecomp$ ();
}
Clazz.instantialize (this, arguments);
}, JU, "Matrix", null, Cloneable);
Clazz.makeConstructor (c$, 
function (a, m, n) {
this.a = (a == null ?  Clazz.newDoubleArray (m, n, 0) : a);
this.m = m;
this.n = n;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "getRowDimension", 
function () {
return this.m;
});
Clazz.defineMethod (c$, "getColumnDimension", 
function () {
return this.n;
});
Clazz.defineMethod (c$, "getArray", 
function () {
return this.a;
});
Clazz.defineMethod (c$, "getArrayCopy", 
function () {
var x =  Clazz.newDoubleArray (this.m, this.n, 0);
for (var i = this.m; --i >= 0; ) for (var j = this.n; --j >= 0; ) x[i][j] = this.a[i][j];


return x;
});
Clazz.defineMethod (c$, "copy", 
function () {
var x =  new JU.Matrix (null, this.m, this.n);
var c = x.a;
for (var i = this.m; --i >= 0; ) for (var j = this.n; --j >= 0; ) c[i][j] = this.a[i][j];


return x;
});
Clazz.overrideMethod (c$, "clone", 
function () {
return this.copy ();
});
Clazz.defineMethod (c$, "getSubmatrix", 
function (i0, j0, nrows, ncols) {
var x =  new JU.Matrix (null, nrows, ncols);
var xa = x.a;
for (var i = nrows; --i >= 0; ) for (var j = ncols; --j >= 0; ) xa[i][j] = this.a[i0 + i][j0 + j];


return x;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getMatrixSelected", 
function (r, n) {
var x =  new JU.Matrix (null, r.length, n);
var xa = x.a;
for (var i = r.length; --i >= 0; ) {
var b = this.a[r[i]];
for (var j = n; --j >= 0; ) xa[i][j] = b[j];

}
return x;
}, "~A,~N");
Clazz.defineMethod (c$, "transpose", 
function () {
var x =  new JU.Matrix (null, this.n, this.m);
var c = x.a;
for (var i = this.m; --i >= 0; ) for (var j = this.n; --j >= 0; ) c[j][i] = this.a[i][j];


return x;
});
Clazz.defineMethod (c$, "add", 
function (b) {
return this.scaleAdd (b, 1);
}, "JU.Matrix");
Clazz.defineMethod (c$, "sub", 
function (b) {
return this.scaleAdd (b, -1);
}, "JU.Matrix");
Clazz.defineMethod (c$, "scaleAdd", 
function (b, scale) {
var x =  new JU.Matrix (null, this.m, this.n);
var xa = x.a;
var ba = b.a;
for (var i = this.m; --i >= 0; ) for (var j = this.n; --j >= 0; ) xa[i][j] = ba[i][j] * scale + this.a[i][j];


return x;
}, "JU.Matrix,~N");
Clazz.defineMethod (c$, "mul", 
function (b) {
if (b.m != this.n) return null;
var x =  new JU.Matrix (null, this.m, b.n);
var xa = x.a;
var ba = b.a;
for (var j = b.n; --j >= 0; ) for (var i = this.m; --i >= 0; ) {
var arowi = this.a[i];
var s = 0;
for (var k = this.n; --k >= 0; ) s += arowi[k] * ba[k][j];

xa[i][j] = s;
}

return x;
}, "JU.Matrix");
Clazz.defineMethod (c$, "inverse", 
function () {
return Clazz.innerTypeInstance (JU.Matrix.LUDecomp, this, null, this.m, this.n).solve (JU.Matrix.identity (this.m, this.m), this.n);
});
Clazz.defineMethod (c$, "trace", 
function () {
var t = 0;
for (var i = Math.min (this.m, this.n); --i >= 0; ) t += this.a[i][i];

return t;
});
c$.identity = Clazz.defineMethod (c$, "identity", 
function (m, n) {
var x =  new JU.Matrix (null, m, n);
var xa = x.a;
for (var i = Math.min (m, n); --i >= 0; ) xa[i][i] = 1;

return x;
}, "~N,~N");
Clazz.defineMethod (c$, "getRotation", 
function () {
return this.getSubmatrix (0, 0, this.m - 1, this.n - 1);
});
Clazz.defineMethod (c$, "getTranslation", 
function () {
return this.getSubmatrix (0, this.n - 1, this.m - 1, 1);
});
c$.newT = Clazz.defineMethod (c$, "newT", 
function (r, asColumn) {
return (asColumn ?  new JU.Matrix ( Clazz.newArray (-1, [ Clazz.newDoubleArray (-1, [r.x]),  Clazz.newDoubleArray (-1, [r.y]),  Clazz.newDoubleArray (-1, [r.z])]), 3, 1) :  new JU.Matrix ( Clazz.newArray (-1, [ Clazz.newDoubleArray (-1, [r.x, r.y, r.z])]), 1, 3));
}, "JU.T3,~B");
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "[\n";
for (var i = 0; i < this.m; i++) {
s += "  [";
for (var j = 0; j < this.n; j++) s += " " + this.a[i][j];

s += "]\n";
}
s += "]";
return s;
});
c$.$Matrix$LUDecomp$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.LU = null;
this.piv = null;
this.pivsign = 0;
Clazz.instantialize (this, arguments);
}, JU.Matrix, "LUDecomp");
Clazz.makeConstructor (c$, 
function (a, b) {
this.LU = this.b$["JU.Matrix"].getArrayCopy ();
this.piv =  Clazz.newIntArray (a, 0);
for (var c = a; --c >= 0; ) this.piv[c] = c;

this.pivsign = 1;
var d;
var e =  Clazz.newDoubleArray (a, 0);
for (var f = 0; f < b; f++) {
for (var g = a; --g >= 0; ) e[g] = this.LU[g][f];

for (var h = a; --h >= 0; ) {
d = this.LU[h];
var i = Math.min (h, f);
var j = 0.0;
for (var k = i; --k >= 0; ) j += d[k] * e[k];

d[f] = e[h] -= j;
}
var i = f;
for (var j = a; --j > f; ) if (Math.abs (e[j]) > Math.abs (e[i])) i = j;

if (i != f) {
for (var k = b; --k >= 0; ) {
var l = this.LU[i][k];
this.LU[i][k] = this.LU[f][k];
this.LU[f][k] = l;
}
var l = this.piv[i];
this.piv[i] = this.piv[f];
this.piv[f] = l;
this.pivsign = -this.pivsign;
}if ( new Boolean (f < a & this.LU[f][f] != 0.0).valueOf ()) for (var k = a; --k > f; ) this.LU[k][f] /= this.LU[f][f];

}
}, "~N,~N");
Clazz.defineMethod (c$, "solve", 
function (a, b) {
for (var c = 0; c < b; c++) if (this.LU[c][c] == 0) return null;

var d = a.n;
var e = a.getMatrixSelected (this.piv, d);
var f = e.a;
for (var g = 0; g < b; g++) for (var h = g + 1; h < b; h++) for (var i = 0; i < d; i++) f[h][i] -= f[g][i] * this.LU[h][g];



for (var j = b; --j >= 0; ) {
for (var k = d; --k >= 0; ) f[j][k] /= this.LU[j][j];

for (var l = j; --l >= 0; ) for (var m = d; --m >= 0; ) f[l][m] -= f[j][m] * this.LU[l][j];


}
return e;
}, "JU.Matrix,~N");
c$ = Clazz.p0p ();
};
