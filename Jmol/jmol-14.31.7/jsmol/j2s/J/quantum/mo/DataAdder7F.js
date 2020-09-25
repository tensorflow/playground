Clazz.declarePackage ("J.quantum.mo");
Clazz.load (["J.quantum.mo.DataAdder"], "J.quantum.mo.DataAdder7F", null, function () {
c$ = Clazz.declareType (J.quantum.mo, "DataAdder7F", null, J.quantum.mo.DataAdder);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "addData", 
function (calc, havePoints) {
var alpha;
var c1;
var a;
var x;
var y;
var z;
var xx;
var yy;
var zz;
var cxxx;
var cyyy;
var czzz;
var cxyy;
var cxxy;
var cxxz;
var cxzz;
var cyzz;
var cyyz;
var cxyz;
var af0;
var af1p;
var af1n;
var af2p;
var af2n;
var af3p;
var af3n;
var f0;
var f1p;
var f1n;
var f2p;
var f2n;
var f3p;
var f3n;
var norm1;
var norm2;
var norm3;
var c0_zzz = 1;
var c0_xxz_yyz = 0.6708203932499369;
var c1p_xzz = 1.0954451150103321;
var c1p_xxx = 0.6123724356957945;
var c1p_xyy = 0.27386127875258304;
var c2p_xxz_yyz = 0.8660254037844386;
var c2n_xyz = 1;
var c3p_xxx = 0.7905694150420949;
var c3p_xyy = 1.0606601717798214;
var normalizeAlpha = false;
switch (calc.normType) {
case 0:
default:
norm1 = norm2 = norm3 = 1;
break;
case 3:
norm1 = norm2 = norm3 = 1;
c0_zzz = 2;
c0_xxz_yyz = 3;
c1p_xxx = Math.sqrt (1.5);
c1p_xyy = c1p_xxx;
c1p_xzz = 4 * c1p_xxx;
c2p_xxz_yyz = Math.sqrt (15);
c2n_xyz = 2 * c2p_xxz_yyz;
c3p_xxx = Math.sqrt (2.5);
c3p_xyy = 3 * c3p_xxx;
break;
case 1:
norm1 = 5.701643762839922;
norm2 = 3.2918455612989796;
norm3 = 1.4721580892990938;
normalizeAlpha = true;
break;
case 2:
norm1 = Math.pow (66.05114251919257, 0.25);
norm2 = norm1 / 1.7320507764816284;
norm3 = 0.8660253882408142;
normalizeAlpha = true;
break;
}
var c1n_yzz = c1p_xzz;
var c1n_yyy = c1p_xxx;
var c1n_xxy = c1p_xyy;
var c3n_yyy = c3p_xxx;
var c3n_xxy = c3p_xyy;
var m0 = calc.coeffs[0];
var m1p = calc.coeffs[1];
var m1n = calc.coeffs[2];
var m2p = calc.coeffs[3];
var m2n = calc.coeffs[4];
var m3p = calc.coeffs[5];
var m3n = calc.coeffs[6];
for (var ig = 0; ig < calc.nGaussians; ig++) {
alpha = calc.gaussians[calc.gaussianPtr + ig][0];
c1 = calc.gaussians[calc.gaussianPtr + ig][1];
a = c1;
if (normalizeAlpha) a *= Math.pow (alpha, 2.25);
af0 = a * m0;
af1p = a * m1p;
af1n = a * m1n;
af2p = a * m2p;
af2n = a * m2n;
af3p = a * m3p;
af3n = a * m3n;
calc.setE (calc.EX, alpha);
for (var ix = calc.xMax; --ix >= calc.xMin; ) {
x = calc.X[ix];
xx = x * x;
var eX = calc.EX[ix];
cxxx = norm3 * x * xx;
if (havePoints) calc.setMinMax (ix);
for (var iy = calc.yMax; --iy >= calc.yMin; ) {
y = calc.Y[iy];
yy = y * y;
var eXY = eX * calc.EY[iy];
cyyy = norm3 * y * yy;
cxyy = norm2 * x * yy;
cxxy = norm2 * xx * y;
var vd = calc.voxelDataTemp[ix][(havePoints ? 0 : iy)];
for (var iz = calc.zMax; --iz >= calc.zMin; ) {
z = calc.Z[iz];
zz = z * z;
czzz = norm3 * z * zz;
cxxz = norm2 * xx * z;
cxzz = norm2 * x * zz;
cyyz = norm2 * yy * z;
cyzz = norm2 * y * zz;
cxyz = norm1 * x * y * z;
f0 = af0 * (c0_zzz * czzz - c0_xxz_yyz * (cxxz + cyyz));
f1p = af1p * (c1p_xzz * cxzz - c1p_xxx * cxxx - c1p_xyy * cxyy);
f1n = af1n * (c1n_yzz * cyzz - c1n_yyy * cyyy - c1n_xxy * cxxy);
f2p = af2p * (c2p_xxz_yyz * (cxxz - cyyz));
f2n = af2n * c2n_xyz * cxyz;
f3p = af3p * (c3p_xxx * cxxx - c3p_xyy * cxyy);
f3n = -af3n * (c3n_yyy * cyyy - c3n_xxy * cxxy);
vd[(havePoints ? 0 : iz)] += (f0 + f1p + f1n + f2p + f2n + f3p + f3n) * eXY * calc.EZ[iz];
}
}
}
}
return true;
}, "J.quantum.MOCalculation,~B");
Clazz.defineStatics (c$,
"c0_xxz_yyz", 0.6708203932499369,
"c1p_xzz", 1.0954451150103321,
"c1p_xxx", 0.6123724356957945,
"c1p_xyy", 0.27386127875258304,
"c1n_yzz", 1.0954451150103321,
"c1n_yyy", 0.6123724356957945,
"c1n_xxy", 0.27386127875258304,
"c2p_xxz_yyz", 0.8660254037844386,
"c3p_xxx", 0.7905694150420949,
"c3p_xyy", 1.0606601717798214,
"c3n_yyy", 0.7905694150420949,
"c3n_xxy", 1.0606601717798214);
});
