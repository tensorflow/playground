Clazz.declarePackage ("J.shapespecial");
Clazz.load (["JU.P3"], "J.shapespecial.Ellipsoid", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.colix = 23;
this.visible = false;
this.isValid = false;
this.center = null;
this.tensor = null;
this.options = null;
this.isOn = true;
this.id = null;
this.modelIndex = 0;
this.pid = 0;
this.lengths = null;
this.scale = 1;
this.percent = 0;
this.scaleXYZ = null;
this.info = null;
this.label = null;
Clazz.instantialize (this, arguments);
}, J.shapespecial, "Ellipsoid");
Clazz.prepareFields (c$, function () {
this.center = JU.P3.new3 (0, 0, 0);
});
Clazz.makeConstructor (c$, 
 function () {
});
c$.getEmptyEllipsoid = Clazz.defineMethod (c$, "getEmptyEllipsoid", 
function (id, modelIndex) {
var e =  new J.shapespecial.Ellipsoid ();
e.id = id;
e.modelIndex = modelIndex;
return e;
}, "~S,~N");
c$.getEllipsoidForAtomTensor = Clazz.defineMethod (c$, "getEllipsoidForAtomTensor", 
function (t, center) {
var e =  new J.shapespecial.Ellipsoid ();
e.tensor = t;
e.modelIndex = t.modelIndex;
e.colix = 0;
e.center = center;
return e;
}, "JU.Tensor,JM.Atom");
Clazz.defineMethod (c$, "setCenter", 
function (center) {
this.center = center;
this.validate (false);
}, "JU.P3");
Clazz.defineMethod (c$, "getLength", 
function (i) {
if (this.lengths == null) this.setLengths ();
return (this.lengths == null ? NaN : this.lengths[i]);
}, "~N");
Clazz.defineMethod (c$, "scaleAxes", 
function (value) {
this.scaleXYZ = value;
this.setLengths ();
}, "~A");
Clazz.defineMethod (c$, "setLengths", 
function () {
if (this.tensor == null) return;
if (this.lengths == null) this.lengths =  Clazz.newFloatArray (3, 0);
for (var i = 0; i < this.lengths.length; i++) this.lengths[i] = this.tensor.getFactoredValue (i) * this.scale * (this.scaleXYZ == null ? 1 : Math.abs (this.scaleXYZ[i]));

});
Clazz.defineMethod (c$, "setScale", 
function (scale, isPercent) {
if (scale <= 0) {
this.isValid = false;
return;
}if (isPercent) {
if (scale == 2147483647) scale = (this.tensor.forThermalEllipsoid ? 50 : 100);
this.percent = Clazz.floatToInt (scale);
scale = (this.tensor.forThermalEllipsoid ? J.shapespecial.Ellipsoid.getThermalRadius (this.percent) : this.percent < 1 ? 0 : this.percent / 100.0);
}this.scale = scale;
this.validate (true);
}, "~N,~B");
c$.getThermalRadius = Clazz.defineMethod (c$, "getThermalRadius", 
function (prob) {
return J.shapespecial.Ellipsoid.crtval[prob < 1 ? 0 : prob > 99 ? 98 : prob - 1];
}, "~N");
Clazz.defineMethod (c$, "setTensor", 
function (tensor) {
this.isValid = false;
this.tensor = tensor;
this.validate (tensor != null);
}, "JU.Tensor");
Clazz.defineMethod (c$, "validate", 
 function (andSetLengths) {
if (this.tensor == null) return;
if (andSetLengths) this.setLengths ();
this.isValid = true;
}, "~B");
c$.getEquationForQuadricWithCenter = Clazz.defineMethod (c$, "getEquationForQuadricWithCenter", 
function (x, y, z, mToElliptical, vTemp, mTemp, coef, mDeriv) {
vTemp.set (x, y, z);
mToElliptical.rotate (vTemp);
var f = 1 - vTemp.dot (vTemp);
mTemp.transposeM (mToElliptical);
mTemp.rotate (vTemp);
mTemp.mul (mToElliptical);
coef[0] = mTemp.m00 / f;
coef[1] = mTemp.m11 / f;
coef[2] = mTemp.m22 / f;
coef[3] = mTemp.m01 * 2 / f;
coef[4] = mTemp.m02 * 2 / f;
coef[5] = mTemp.m12 * 2 / f;
coef[6] = -2 * vTemp.x / f;
coef[7] = -2 * vTemp.y / f;
coef[8] = -2 * vTemp.z / f;
coef[9] = -1;
if (mDeriv == null) return;
mDeriv.setIdentity ();
mDeriv.m00 = (2 * coef[0]);
mDeriv.m11 = (2 * coef[1]);
mDeriv.m22 = (2 * coef[2]);
mDeriv.m01 = mDeriv.m10 = coef[3];
mDeriv.m02 = mDeriv.m20 = coef[4];
mDeriv.m12 = mDeriv.m21 = coef[5];
mDeriv.m03 = coef[6];
mDeriv.m13 = coef[7];
mDeriv.m23 = coef[8];
}, "~N,~N,~N,JU.M3,JU.V3,JU.M3,~A,JU.M4");
Clazz.defineStatics (c$,
"crtval",  Clazz.newFloatArray (-1, [0.3389, 0.4299, 0.4951, 0.5479, 0.5932, 0.6334, 0.6699, 0.7035, 0.7349, 0.7644, 0.7924, 0.8192, 0.8447, 0.8694, 0.8932, 0.9162, 0.9386, 0.9605, 0.9818, 1.0026, 1.0230, 1.0430, 1.0627, 1.0821, 1.1012, 1.1200, 1.1386, 1.1570, 1.1751, 1.1932, 1.2110, 1.2288, 1.2464, 1.2638, 1.2812, 1.2985, 1.3158, 1.3330, 1.3501, 1.3672, 1.3842, 1.4013, 1.4183, 1.4354, 1.4524, 1.4695, 1.4866, 1.5037, 1.5209, 1.5382, 1.5555, 1.5729, 1.5904, 1.6080, 1.6257, 1.6436, 1.6616, 1.6797, 1.6980, 1.7164, 1.7351, 1.7540, 1.7730, 1.7924, 1.8119, 1.8318, 1.8519, 1.8724, 1.8932, 1.9144, 1.9360, 1.9580, 1.9804, 2.0034, 2.0269, 2.0510, 2.0757, 2.1012, 2.1274, 2.1544, 2.1824, 2.2114, 2.2416, 2.2730, 2.3059, 2.3404, 2.3767, 2.4153, 2.4563, 2.5003, 2.5478, 2.5997, 2.6571, 2.7216, 2.7955, 2.8829, 2.9912, 3.1365, 3.3682]));
});
