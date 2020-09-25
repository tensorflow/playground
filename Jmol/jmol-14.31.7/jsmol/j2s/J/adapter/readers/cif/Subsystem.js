Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (null, "J.adapter.readers.cif.Subsystem", ["JU.Lst", "$.Matrix", "$.V3", "JU.Logger", "$.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.msRdr = null;
this.code = null;
this.d = 0;
this.w = null;
this.symmetry = null;
this.modMatrices = null;
this.isFinalized = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "Subsystem");
Clazz.makeConstructor (c$, 
function (msRdr, code, w) {
this.msRdr = msRdr;
this.code = code;
this.w = w;
this.d = w.getArray ().length - 3;
}, "J.adapter.readers.cif.MSRdr,~S,JU.Matrix");
Clazz.defineMethod (c$, "getSymmetry", 
function () {
if (!this.isFinalized) this.setSymmetry (true);
return this.symmetry;
});
Clazz.defineMethod (c$, "getModMatrices", 
function () {
if (!this.isFinalized) this.setSymmetry (true);
return this.modMatrices;
});
Clazz.defineMethod (c$, "setSymmetry", 
 function (setOperators) {
var a;
JU.Logger.info ("[subsystem " + this.code + "]");
var winv = this.w.inverse ();
JU.Logger.info ("w=" + this.w);
JU.Logger.info ("w_inv=" + winv);
var w33 = this.w.getSubmatrix (0, 0, 3, 3);
var wd3 = this.w.getSubmatrix (3, 0, this.d, 3);
var w3d = this.w.getSubmatrix (0, 3, 3, this.d);
var wdd = this.w.getSubmatrix (3, 3, this.d, this.d);
var sigma = this.msRdr.getSigma ();
var sigma_nu = wdd.mul (sigma).add (wd3).mul (w3d.mul (sigma).add (w33).inverse ());
var tFactor = wdd.sub (sigma_nu.mul (w3d));
JU.Logger.info ("sigma_nu = " + sigma_nu);
var s0 = this.msRdr.cr.asc.getSymmetry ();
var vu43 = s0.getUnitCellVectors ();
var vr43 = JU.SimpleUnitCell.getReciprocal (vu43, null, 1);
var mard3 =  new JU.Matrix (null, 3 + this.d, 3);
var mar3 =  new JU.Matrix (null, 3, 3);
var mard3a = mard3.getArray ();
var mar3a = mar3.getArray ();
for (var i = 0; i < 3; i++) mard3a[i] = mar3a[i] =  Clazz.newDoubleArray (-1, [vr43[i + 1].x, vr43[i + 1].y, vr43[i + 1].z]);

var sx = sigma.mul (mar3);
a = sx.getArray ();
for (var i = 0; i < this.d; i++) mard3a[i + 3] = a[i];

a = this.w.mul (mard3).getArray ();
var uc_nu =  new Array (4);
uc_nu[0] = vu43[0];
for (var i = 0; i < 3; i++) uc_nu[i + 1] = JU.V3.new3 (a[i][0], a[i][1], a[i][2]);

uc_nu = JU.SimpleUnitCell.getReciprocal (uc_nu, null, 1);
this.symmetry = (this.msRdr.cr.getInterface ("JS.Symmetry")).getUnitCell (uc_nu, false, null);
this.modMatrices =  Clazz.newArray (-1, [sigma_nu, tFactor]);
if (!setOperators) return;
this.isFinalized = true;
JU.Logger.info ("unit cell parameters: " + this.symmetry.getUnitCellInfo ());
this.symmetry.createSpaceGroup (-1, "[subsystem " + this.code + "]",  new JU.Lst (), this.d);
var nOps = s0.getSpaceGroupOperationCount ();
for (var iop = 0; iop < nOps; iop++) {
var rv = s0.getOperationRsVs (iop);
var r0 = rv.getRotation ();
var v0 = rv.getTranslation ();
var r = this.w.mul (r0).mul (winv);
var v = this.w.mul (v0);
var code = this.code;
if (this.isMixed (r)) {
for (var e, $e = this.msRdr.htSubsystems.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var ss = e.getValue ();
if (ss === this) continue;
var rj = ss.w.mul (r0).mul (winv);
if (!this.isMixed (rj)) {
r = rj;
v = ss.w.mul (v0);
code = ss.code;
break;
}}
}var jf = this.symmetry.addOp (code, r, v, sigma_nu);
JU.Logger.info (this.code + "." + (iop + 1) + (this.code.equals (code) ? "   " : ">" + code + " ") + jf);
}
}, "~B");
Clazz.defineMethod (c$, "isMixed", 
 function (r) {
var a = r.getArray ();
for (var i = 3; --i >= 0; ) for (var j = 3 + this.d; --j >= 3; ) if (a[i][j] != 0) return true;


return false;
}, "JU.Matrix");
Clazz.overrideMethod (c$, "toString", 
function () {
return "Subsystem " + this.code + "\n" + this.w;
});
});
