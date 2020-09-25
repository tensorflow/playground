Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.SlaterReader"], "J.adapter.readers.quantum.MopacSlaterReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.atomicNumbers = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "MopacSlaterReader", J.adapter.readers.quantum.SlaterReader);
Clazz.defineMethod (c$, "createSphericalSlaterByType", 
function (iAtom, atomicNumber, type, zeta, coef) {
var pt = "S Px Py Pz  Dx2-y2Dxz Dz2 Dyz Dxy".indexOf (type);
switch (pt) {
case 0:
this.addSlater (iAtom + 1, 0, 0, 0, J.adapter.readers.quantum.MopacSlaterReader.getNPQs (atomicNumber) - 1, zeta, coef);
return;
case 2:
case 5:
case 8:
this.addSlater (iAtom + 1, pt == 2 ? 1 : 0, pt == 5 ? 1 : 0, pt == 8 ? 1 : 0, J.adapter.readers.quantum.MopacSlaterReader.getNPQp (atomicNumber) - 2, zeta, coef);
return;
}
pt = (pt >> 2) * 3 - 9;
this.addSlater (iAtom + 1, J.adapter.readers.quantum.MopacSlaterReader.sphericalDValues[pt++], J.adapter.readers.quantum.MopacSlaterReader.sphericalDValues[pt++], J.adapter.readers.quantum.MopacSlaterReader.sphericalDValues[pt++], J.adapter.readers.quantum.MopacSlaterReader.getNPQd (atomicNumber) - 3, zeta, coef);
}, "~N,~N,~S,~N,~N");
Clazz.defineMethod (c$, "scaleSlater", 
function (ex, ey, ez, er, zeta) {
if (ex >= 0 && ey >= 0) {
return Clazz.superCall (this, J.adapter.readers.quantum.MopacSlaterReader, "scaleSlater", [ex, ey, ez, er, zeta]);
}var el = Math.abs (ex + ey + ez);
if (el == 3) {
return 0;
}return J.adapter.readers.quantum.SlaterReader.getSlaterConstDSpherical (el + er + 1, Math.abs (zeta), ex, ey);
}, "~N,~N,~N,~N,~N");
c$.getNPQ = Clazz.defineMethod (c$, "getNPQ", 
 function (atomicNumber) {
return (atomicNumber < J.adapter.readers.quantum.MopacSlaterReader.principalQuantumNumber.length ? J.adapter.readers.quantum.MopacSlaterReader.principalQuantumNumber[atomicNumber] : 0);
}, "~N");
c$.getNPQs = Clazz.defineMethod (c$, "getNPQs", 
 function (atomicNumber) {
var n = J.adapter.readers.quantum.MopacSlaterReader.getNPQ (atomicNumber);
switch (atomicNumber) {
case 10:
case 18:
case 36:
case 54:
case 86:
return n + 1;
default:
return n;
}
}, "~N");
c$.getNPQp = Clazz.defineMethod (c$, "getNPQp", 
 function (atomicNumber) {
var n = J.adapter.readers.quantum.MopacSlaterReader.getNPQ (atomicNumber);
switch (atomicNumber) {
case 2:
return n + 1;
default:
return n;
}
}, "~N");
c$.getNPQd = Clazz.defineMethod (c$, "getNPQd", 
 function (atomicNumber) {
return (atomicNumber < J.adapter.readers.quantum.MopacSlaterReader.npqd.length ? J.adapter.readers.quantum.MopacSlaterReader.npqd[atomicNumber] : 0);
}, "~N");
Clazz.defineStatics (c$,
"MIN_COEF", 0.0001,
"sphericalDValues",  Clazz.newIntArray (-1, [0, -2, 0, 1, 0, 1, -2, 0, 0, 0, 1, 1, 1, 1, 0]),
"principalQuantumNumber",  Clazz.newIntArray (-1, [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]),
"npqd",  Clazz.newIntArray (-1, [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7]));
});
