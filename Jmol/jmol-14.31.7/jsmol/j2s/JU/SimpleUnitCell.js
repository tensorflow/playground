Clazz.declarePackage ("JU");
Clazz.load (null, "JU.SimpleUnitCell", ["java.lang.Float", "JU.AU", "$.M4", "$.P3", "$.P4", "$.PT", "$.V3", "JU.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.unitCellParams = null;
this.matrixCartesianToFractional = null;
this.matrixFractionalToCartesian = null;
this.volume = 0;
this.na = 0;
this.nb = 0;
this.nc = 0;
this.a = 0;
this.b = 0;
this.c = 0;
this.alpha = 0;
this.beta = 0;
this.gamma = 0;
this.cosAlpha = 0;
this.sinAlpha = 0;
this.cosBeta = 0;
this.sinBeta = 0;
this.cosGamma = 0;
this.sinGamma = 0;
this.cA_ = 0;
this.cB_ = 0;
this.a_ = 0;
this.b_ = 0;
this.c_ = 0;
this.dimension = 0;
this.fractionalOrigin = null;
this.matrixCtoFNoOffset = null;
this.matrixFtoCNoOffset = null;
Clazz.instantialize (this, arguments);
}, JU, "SimpleUnitCell");
Clazz.defineMethod (c$, "isSupercell", 
function () {
return (this.na > 1 || this.nb > 1 || this.nc > 1);
});
c$.isValid = Clazz.defineMethod (c$, "isValid", 
function (parameters) {
return (parameters != null && (parameters[0] > 0 || parameters.length > 14 && !Float.isNaN (parameters[14])));
}, "~A");
Clazz.makeConstructor (c$, 
function () {
this.fractionalOrigin =  new JU.P3 ();
});
c$.newA = Clazz.defineMethod (c$, "newA", 
function (params) {
var c =  new JU.SimpleUnitCell ();
c.init (params);
return c;
}, "~A");
Clazz.defineMethod (c$, "init", 
function (params) {
if (params == null) params =  Clazz.newFloatArray (-1, [1, 1, 1, 90, 90, 90]);
if (!JU.SimpleUnitCell.isValid (params)) return;
this.unitCellParams = JU.AU.arrayCopyF (params, params.length);
var rotateHex = false;
this.a = params[0];
this.b = params[1];
this.c = params[2];
this.alpha = params[3];
this.beta = params[4];
this.gamma = params[5];
if (this.gamma == -1) {
rotateHex = true;
this.gamma = 120;
}var fa = this.na = Math.max (1, params.length >= 25 && !Float.isNaN (params[22]) ? Clazz.floatToInt (params[22]) : 1);
var fb = this.nb = Math.max (1, params.length >= 25 && !Float.isNaN (params[23]) ? Clazz.floatToInt (params[23]) : 1);
var fc = this.nc = Math.max (1, params.length >= 25 && !Float.isNaN (params[24]) ? Clazz.floatToInt (params[24]) : 1);
if (params.length > 25 && !Float.isNaN (params[25])) {
var fScale = params[25];
fa *= fScale;
fb *= fScale;
fc *= fScale;
} else {
fa = fb = fc = 1;
}if (this.a <= 0) {
var va = JU.V3.new3 (params[6], params[7], params[8]);
var vb = JU.V3.new3 (params[9], params[10], params[11]);
var vc = JU.V3.new3 (params[12], params[13], params[14]);
this.setABC (va, vb, vc);
if (this.c < 0) {
var n = JU.AU.arrayCopyF (params, -1);
if (this.b < 0) {
vb.set (0, 0, 1);
vb.cross (vb, va);
if (vb.length () < 0.001) vb.set (0, 1, 0);
vb.normalize ();
n[9] = vb.x;
n[10] = vb.y;
n[11] = vb.z;
}if (this.c < 0) {
vc.cross (va, vb);
vc.normalize ();
n[12] = vc.x;
n[13] = vc.y;
n[14] = vc.z;
}params = n;
}}this.a *= fa;
if (this.b <= 0) {
this.b = this.c = 1;
this.dimension = 1;
} else if (this.c <= 0) {
this.c = 1;
this.b *= fb;
this.dimension = 2;
} else {
this.b *= fb;
this.c *= fc;
this.dimension = 3;
}this.setCellParams ();
if (params.length > 21 && !Float.isNaN (params[21])) {
var scaleMatrix =  Clazz.newFloatArray (16, 0);
for (var i = 0; i < 16; i++) {
var f;
switch (i % 4) {
case 0:
f = fa;
break;
case 1:
f = fb;
break;
case 2:
f = fc;
break;
default:
f = 1;
break;
}
scaleMatrix[i] = params[6 + i] * f;
}
this.matrixCartesianToFractional = JU.M4.newA16 (scaleMatrix);
this.matrixCartesianToFractional.getTranslation (this.fractionalOrigin);
this.matrixFractionalToCartesian = JU.M4.newM4 (this.matrixCartesianToFractional).invert ();
if (params[0] == 1) this.setParamsFromMatrix ();
} else if (params.length > 14 && !Float.isNaN (params[14])) {
var m = this.matrixFractionalToCartesian =  new JU.M4 ();
m.setColumn4 (0, params[6] * fa, params[7] * fa, params[8] * fa, 0);
m.setColumn4 (1, params[9] * fb, params[10] * fb, params[11] * fb, 0);
m.setColumn4 (2, params[12] * fc, params[13] * fc, params[14] * fc, 0);
m.setColumn4 (3, 0, 0, 0, 1);
this.matrixCartesianToFractional = JU.M4.newM4 (this.matrixFractionalToCartesian).invert ();
} else {
var m = this.matrixFractionalToCartesian =  new JU.M4 ();
if (rotateHex) {
m.setColumn4 (0, (-this.b * this.cosGamma), (-this.b * this.sinGamma), 0, 0);
m.setColumn4 (1, (-this.b * this.cosGamma), (this.b * this.sinGamma), 0, 0);
} else {
m.setColumn4 (0, this.a, 0, 0, 0);
m.setColumn4 (1, (this.b * this.cosGamma), (this.b * this.sinGamma), 0, 0);
}m.setColumn4 (2, (this.c * this.cosBeta), (this.c * (this.cosAlpha - this.cosBeta * this.cosGamma) / this.sinGamma), (this.volume / (this.a * this.b * this.sinGamma)), 0);
m.setColumn4 (3, 0, 0, 0, 1);
this.matrixCartesianToFractional = JU.M4.newM4 (this.matrixFractionalToCartesian).invert ();
}this.matrixCtoFNoOffset = this.matrixCartesianToFractional;
this.matrixFtoCNoOffset = this.matrixFractionalToCartesian;
}, "~A");
Clazz.defineMethod (c$, "setParamsFromMatrix", 
 function () {
var va = JU.V3.new3 (1, 0, 0);
var vb = JU.V3.new3 (0, 1, 0);
var vc = JU.V3.new3 (0, 0, 1);
this.matrixFractionalToCartesian.rotate (va);
this.matrixFractionalToCartesian.rotate (vb);
this.matrixFractionalToCartesian.rotate (vc);
this.setABC (va, vb, vc);
this.setCellParams ();
});
Clazz.defineMethod (c$, "setABC", 
 function (va, vb, vc) {
this.a = va.length ();
this.b = vb.length ();
this.c = vc.length ();
if (this.a == 0) return;
if (this.b == 0) this.b = this.c = -1;
 else if (this.c == 0) this.c = -1;
this.alpha = (this.b < 0 || this.c < 0 ? 90 : vb.angle (vc) / 0.017453292);
this.beta = (this.c < 0 ? 90 : va.angle (vc) / 0.017453292);
this.gamma = (this.b < 0 ? 90 : va.angle (vb) / 0.017453292);
}, "JU.V3,JU.V3,JU.V3");
Clazz.defineMethod (c$, "setCellParams", 
 function () {
this.cosAlpha = Math.cos (0.017453292 * this.alpha);
this.sinAlpha = Math.sin (0.017453292 * this.alpha);
this.cosBeta = Math.cos (0.017453292 * this.beta);
this.sinBeta = Math.sin (0.017453292 * this.beta);
this.cosGamma = Math.cos (0.017453292 * this.gamma);
this.sinGamma = Math.sin (0.017453292 * this.gamma);
var unitVolume = Math.sqrt (this.sinAlpha * this.sinAlpha + this.sinBeta * this.sinBeta + this.sinGamma * this.sinGamma + 2.0 * this.cosAlpha * this.cosBeta * this.cosGamma - 2);
this.volume = this.a * this.b * this.c * unitVolume;
this.cA_ = (this.cosAlpha - this.cosBeta * this.cosGamma) / this.sinGamma;
this.cB_ = unitVolume / this.sinGamma;
this.a_ = this.b * this.c * this.sinAlpha / this.volume;
this.b_ = this.a * this.c * this.sinBeta / this.volume;
this.c_ = this.a * this.b * this.sinGamma / this.volume;
});
Clazz.defineMethod (c$, "getFractionalOrigin", 
function () {
return this.fractionalOrigin;
});
Clazz.defineMethod (c$, "toSupercell", 
function (fpt) {
fpt.x /= this.na;
fpt.y /= this.nb;
fpt.z /= this.nc;
return fpt;
}, "JU.P3");
Clazz.defineMethod (c$, "toCartesian", 
function (pt, ignoreOffset) {
if (this.matrixFractionalToCartesian != null) (ignoreOffset ? this.matrixFtoCNoOffset : this.matrixFractionalToCartesian).rotTrans (pt);
}, "JU.T3,~B");
Clazz.defineMethod (c$, "toFractionalM", 
function (m) {
if (this.matrixCartesianToFractional == null) return;
m.mul (this.matrixFractionalToCartesian);
m.mul2 (this.matrixCartesianToFractional, m);
}, "JU.M4");
Clazz.defineMethod (c$, "toFractional", 
function (pt, ignoreOffset) {
if (this.matrixCartesianToFractional == null) return;
(ignoreOffset ? this.matrixCtoFNoOffset : this.matrixCartesianToFractional).rotTrans (pt);
}, "JU.T3,~B");
Clazz.defineMethod (c$, "isPolymer", 
function () {
return (this.dimension == 1);
});
Clazz.defineMethod (c$, "isSlab", 
function () {
return (this.dimension == 2);
});
Clazz.defineMethod (c$, "getUnitCellParams", 
function () {
return this.unitCellParams;
});
Clazz.defineMethod (c$, "getUnitCellAsArray", 
function (vectorsOnly) {
var m = this.matrixFractionalToCartesian;
return (vectorsOnly ?  Clazz.newFloatArray (-1, [m.m00, m.m10, m.m20, m.m01, m.m11, m.m21, m.m02, m.m12, m.m22]) :  Clazz.newFloatArray (-1, [this.a, this.b, this.c, this.alpha, this.beta, this.gamma, m.m00, m.m10, m.m20, m.m01, m.m11, m.m21, m.m02, m.m12, m.m22, this.dimension, this.volume]));
}, "~B");
Clazz.defineMethod (c$, "getInfo", 
function (infoType) {
switch (infoType) {
case 0:
return this.a;
case 1:
return this.b;
case 2:
return this.c;
case 3:
return this.alpha;
case 4:
return this.beta;
case 5:
return this.gamma;
case 6:
return this.dimension;
}
return NaN;
}, "~N");
c$.ijkToPoint3f = Clazz.defineMethod (c$, "ijkToPoint3f", 
function (nnn, cell, offset, kcode) {
var f = (nnn > 1000000000 ? 1000 : nnn > 1000000 ? 100 : 10);
var f2 = f * f;
offset -= (offset >= 0 ? Clazz.doubleToInt (5 * f / 10) : offset);
cell.x = ((Clazz.doubleToInt (nnn / f2)) % f) + offset;
cell.y = Clazz.doubleToInt ((nnn % f2) / f) + offset;
cell.z = (kcode == 0 ? nnn % f : (offset == -500 ? Clazz.doubleToInt (kcode / f) : kcode) % f) + offset;
}, "~N,JU.P3,~N,~N");
c$.escapeMultiplier = Clazz.defineMethod (c$, "escapeMultiplier", 
function (pt) {
if (Clazz.instanceOf (pt, JU.P4)) {
var pt4 = pt;
var x = Clazz.doubleToInt (Math.floor (pt4.x / 1000)) * 1000 + Clazz.doubleToInt (Math.floor (pt4.w / 1000)) - 1000;
var y = Clazz.doubleToInt (Math.floor (pt4.y / 1000)) * 1000 + Clazz.doubleToInt (Math.floor (pt4.w)) % 1000;
return "{" + x + " " + y + " " + pt.z + "}";
}return JU.Escape.eP (pt);
}, "JU.T3");
c$.getCellWeight = Clazz.defineMethod (c$, "getCellWeight", 
function (pt) {
var f = 1;
if (pt.x <= 0.02 || pt.x >= 0.98) f /= 2;
if (pt.y <= 0.02 || pt.y >= 0.98) f /= 2;
if (pt.z <= 0.02 || pt.z >= 0.98) f /= 2;
return f;
}, "JU.P3");
c$.getReciprocal = Clazz.defineMethod (c$, "getReciprocal", 
function (abc, ret, scale) {
var rabc =  new Array (4);
var off = (abc.length == 4 ? 1 : 0);
rabc[0] = (off == 1 ? JU.P3.newP (abc[0]) :  new JU.P3 ());
for (var i = 0; i < 3; i++) {
rabc[i + 1] =  new JU.P3 ();
rabc[i + 1].cross (abc[((i + off) % 3) + off], abc[((i + off + 1) % 3) + off]);
rabc[i + 1].scale (scale / abc[i + off].dot (rabc[i + 1]));
}
if (ret == null) return rabc;
for (var i = 0; i < 4; i++) ret[i] = rabc[i];

return ret;
}, "~A,~A,~N");
c$.setOabc = Clazz.defineMethod (c$, "setOabc", 
function (abcabg, params, ucnew) {
if (abcabg != null) {
if (params == null) params =  Clazz.newFloatArray (6, 0);
if (abcabg.indexOf ("=") >= 0) {
var tokens = JU.PT.split (abcabg.$replace (",", " "), "=");
if (tokens.length == 7) {
for (var i = 0; i < 6; i++) if (Float.isNaN (params[i] = JU.PT.parseFloat (tokens[i + 1]))) return null;

} else {
return null;
}}}if (ucnew == null) return null;
var f = JU.SimpleUnitCell.newA (params).getUnitCellAsArray (true);
ucnew[1].set (f[0], f[1], f[2]);
ucnew[2].set (f[3], f[4], f[5]);
ucnew[3].set (f[6], f[7], f[8]);
return ucnew;
}, "~S,~A,~A");
c$.setMinMaxLatticeParameters = Clazz.defineMethod (c$, "setMinMaxLatticeParameters", 
function (dimension, minXYZ, maxXYZ, kcode) {
if (maxXYZ.x <= maxXYZ.y && maxXYZ.y >= 555) {
var pt =  new JU.P3 ();
JU.SimpleUnitCell.ijkToPoint3f (maxXYZ.x, pt, 0, kcode);
minXYZ.x = Clazz.floatToInt (pt.x);
minXYZ.y = Clazz.floatToInt (pt.y);
minXYZ.z = Clazz.floatToInt (pt.z);
JU.SimpleUnitCell.ijkToPoint3f (maxXYZ.y, pt, 1, kcode);
maxXYZ.x = Clazz.floatToInt (pt.x);
maxXYZ.y = Clazz.floatToInt (pt.y);
maxXYZ.z = Clazz.floatToInt (pt.z);
}switch (dimension) {
case 1:
minXYZ.y = 0;
maxXYZ.y = 1;
case 2:
minXYZ.z = 0;
maxXYZ.z = 1;
}
}, "~N,JU.P3i,JU.P3i,~N");
Clazz.defineStatics (c$,
"toRadians", 0.017453292,
"INFO_DIMENSIONS", 6,
"INFO_GAMMA", 5,
"INFO_BETA", 4,
"INFO_ALPHA", 3,
"INFO_C", 2,
"INFO_B", 1,
"INFO_A", 0,
"SLOP", 0.02,
"SLOP1", 0.98);
});
