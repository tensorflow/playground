Clazz.declarePackage ("J.quantum.mo");
Clazz.load (["J.quantum.mo.DataAdder"], "J.quantum.mo.DataAdderF", null, function () {
c$ = Clazz.declareType (J.quantum.mo, "DataAdderF", null, J.quantum.mo.DataAdder);
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
var axxx;
var ayyy;
var azzz;
var axyy;
var axxy;
var axxz;
var axzz;
var ayzz;
var ayyz;
var axyz;
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
var norm1;
var norm2;
var norm3;
var coeffs = calc.coeffs;
var normalizeAlpha = false;
switch (calc.normType) {
case 0:
default:
norm1 = norm2 = norm3 = 1;
break;
case 1:
norm1 = 5.701643762839922;
norm2 = 3.2918455612989796;
norm3 = 1.4721580892990938;
normalizeAlpha = true;
break;
case 2:
norm1 = calc.getContractionNormalization (3, 1);
norm2 = norm1;
norm3 = norm1;
normalizeAlpha = true;
break;
case 3:
norm1 = Math.sqrt (15);
norm2 = Math.sqrt (5);
norm3 = 1;
break;
}
var mxxx = coeffs[0];
var myyy = coeffs[1];
var mzzz = coeffs[2];
var mxyy = coeffs[3];
var mxxy = coeffs[4];
var mxxz = coeffs[5];
var mxzz = coeffs[6];
var myzz = coeffs[7];
var myyz = coeffs[8];
var mxyz = coeffs[9];
for (var ig = 0; ig < calc.nGaussians; ig++) {
alpha = calc.gaussians[calc.gaussianPtr + ig][0];
c1 = calc.gaussians[calc.gaussianPtr + ig][1];
calc.setE (calc.EX, alpha);
a = c1;
if (normalizeAlpha) a *= Math.pow (alpha, 2.25);
axxx = a * norm3 * mxxx;
ayyy = a * norm3 * myyy;
azzz = a * norm3 * mzzz;
axyy = a * norm2 * mxyy;
axxy = a * norm2 * mxxy;
axxz = a * norm2 * mxxz;
axzz = a * norm2 * mxzz;
ayzz = a * norm2 * myzz;
ayyz = a * norm2 * myyz;
axyz = a * norm1 * mxyz;
for (var ix = calc.xMax; --ix >= calc.xMin; ) {
x = calc.X[ix];
xx = x * x;
var Ex = calc.EX[ix];
cxxx = axxx * xx * x;
if (havePoints) calc.setMinMax (ix);
for (var iy = calc.yMax; --iy >= calc.yMin; ) {
y = calc.Y[iy];
yy = y * y;
var Exy = Ex * calc.EY[iy];
cyyy = ayyy * yy * y;
cxxy = axxy * xx * y;
cxyy = axyy * x * yy;
var vd = calc.voxelDataTemp[ix][(havePoints ? 0 : iy)];
for (var iz = calc.zMax; --iz >= calc.zMin; ) {
z = calc.Z[iz];
zz = z * z;
czzz = azzz * zz * z;
cxxz = axxz * xx * z;
cxzz = axzz * x * zz;
cyyz = ayyz * yy * z;
cyzz = ayzz * y * zz;
cxyz = axyz * x * y * z;
vd[(havePoints ? 0 : iz)] += (cxxx + cyyy + czzz + cxyy + cxxy + cxxz + cxzz + cyzz + cyyz + cxyz) * Exy * calc.EZ[iz];
}
}
}
}
return true;
}, "J.quantum.MOCalculation,~B");
});
