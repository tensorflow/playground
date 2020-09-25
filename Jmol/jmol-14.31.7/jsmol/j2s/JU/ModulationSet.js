Clazz.declarePackage ("JU");
Clazz.load (["J.api.JmolModulationSet", "JU.Vibration", "JU.P3"], "JU.ModulationSet", ["java.lang.Float", "java.util.Hashtable", "JU.Lst", "$.Matrix", "$.PT", "$.V3", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.id = null;
this.r0 = null;
this.symmetry = null;
this.axesLengths = null;
this.nOps = 0;
this.iop = 0;
this.strop = null;
this.spinOp = 0;
this.rsvs = null;
this.vib = null;
this.mods = null;
this.isSubsystem = false;
this.isCommensurate = false;
this.fileOcc = 0;
this.occParams = null;
this.occSiteMultiplicity = 0;
this.occAbsolute = false;
this.modCalc = null;
this.mxyz = null;
this.htUij = null;
this.vOcc = NaN;
this.occValue = NaN;
this.qtOffset = null;
this.isQ = false;
this.enabled = false;
this.$scale = 1;
this.gammaE = null;
this.gammaIinv = null;
this.sigma = null;
this.tau = null;
this.rI = null;
this.tFactorInv = null;
this.ptTemp = null;
this.v0 = null;
Clazz.instantialize (this, arguments);
}, JU, "ModulationSet", JU.Vibration, J.api.JmolModulationSet);
Clazz.prepareFields (c$, function () {
this.qtOffset =  new JU.P3 ();
this.ptTemp =  new JU.P3 ();
});
Clazz.overrideMethod (c$, "getSubSystemUnitCell", 
function () {
return (this.isSubsystem ? this.symmetry : null);
});
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz.overrideMethod (c$, "getScale", 
function () {
return this.$scale;
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JU.ModulationSet, []);
});
Clazz.defineMethod (c$, "setMod", 
function (id, r00, r0, d, mods, gammaE, factors, symmetry, nOps, iop, v, isCommensurate) {
this.id = id;
this.symmetry = symmetry;
this.strop = symmetry.getSpaceGroupXyz (iop, false);
this.iop = iop;
this.nOps = nOps;
this.r0 = r0;
this.modDim = d;
this.rI =  new JU.Matrix (null, d, 1);
this.mods = mods;
this.gammaE = gammaE;
this.sigma = factors[0];
if (factors[1] != null) {
this.isSubsystem = true;
this.tFactorInv = factors[1].inverse ();
}if (v != null) {
this.vib = v;
this.vib.modScale = 1;
this.mxyz =  new JU.V3 ();
this.axesLengths = symmetry.getUnitCellParams ();
if (this.axesLengths == null) this.axesLengths = symmetry.getUnitCellParams ();
}var vR00 = JU.Matrix.newT (r00, true);
var vR0 = JU.Matrix.newT (r0, true);
this.rsvs = symmetry.getOperationRsVs (iop);
this.gammaIinv = this.rsvs.getSubmatrix (3, 3, d, d).inverse ();
var gammaM = this.rsvs.getSubmatrix (3, 0, d, 3);
var sI = this.rsvs.getSubmatrix (3, 3 + d, d, 1);
this.spinOp = symmetry.getSpinOp (iop);
this.tau = this.gammaIinv.mul (this.sigma.mul (vR0).sub (gammaM.mul (vR00)).sub (sI));
if (JU.Logger.debuggingHigh) JU.Logger.debug ("MODSET create " + id + " r0=" + JU.Escape.eP (r0) + " tau=" + this.tau);
return this;
}, "~S,JU.P3,JU.P3,~N,JU.Lst,JU.M3,~A,J.api.SymmetryInterface,~N,~N,JU.Vibration,~B");
Clazz.defineMethod (c$, "calculate", 
function (tuv, isQ) {
this.x = this.y = this.z = 0;
this.htUij = null;
this.vOcc = NaN;
if (this.mxyz != null) this.mxyz.set (0, 0, 0);
var a;
if (isQ && this.qtOffset != null) {
var q =  new JU.Matrix (null, 3, 1);
a = q.getArray ();
a[0][0] = this.qtOffset.x;
a[1][0] = this.qtOffset.y;
a[2][0] = this.qtOffset.z;
a = (this.rI = this.sigma.mul (q)).getArray ();
} else {
a = this.rI.getArray ();
for (var i = 0; i < this.modDim; i++) a[i][0] = 0;

}if (tuv != null) {
switch (this.modDim) {
default:
a[2][0] += tuv.z;
case 2:
a[1][0] += tuv.y;
case 1:
a[0][0] += tuv.x;
break;
}
}if (this.isSubsystem) {
this.rI = this.tFactorInv.mul (this.rI);
}this.rI = this.tau.add (this.gammaIinv.mul (this.rI));
var arI = this.rI.getArray ();
for (var i = this.mods.size (); --i >= 0; ) this.mods.get (i).apply (this, arI);

this.gammaE.rotate (this);
if (this.mxyz != null) {
this.gammaE.rotate (this.mxyz);
if (this.spinOp < 0) this.mxyz.scale (this.spinOp);
}return this;
}, "JU.T3,~B");
Clazz.defineMethod (c$, "addUTens", 
function (utens, v) {
if (this.htUij == null) this.htUij =  new java.util.Hashtable ();
var f = this.htUij.get (utens);
if (JU.Logger.debuggingHigh) JU.Logger.debug ("MODSET " + this.id + " utens=" + utens + " f=" + f + " v=" + v);
if (f != null) v += f.floatValue ();
this.htUij.put (utens, Float.$valueOf (v));
}, "~S,~N");
Clazz.overrideMethod (c$, "setModTQ", 
function (a, isOn, qtOffset, isQ, scale) {
if (this.enabled) this.addTo (a, NaN);
this.enabled = false;
this.$scale = scale;
if (qtOffset != null) {
this.qtOffset.setT (qtOffset);
this.isQ = isQ;
if (isQ) qtOffset = null;
this.calculate (qtOffset, isQ);
if (!Float.isNaN (this.vOcc)) this.occValue = this.getOccupancy ();
}if (isOn) {
this.addTo (a, 1);
this.enabled = true;
}}, "JU.T3,~B,JU.T3,~B,~N");
Clazz.overrideMethod (c$, "addTo", 
function (a, scale) {
var isReset = (Float.isNaN (scale));
if (isReset) scale = -1;
this.ptTemp.setT (this);
this.ptTemp.scale (this.$scale * scale);
if (a != null) {
this.symmetry.toCartesian (this.ptTemp, true);
a.add (this.ptTemp);
}if (this.mxyz != null) this.setVib (isReset, scale);
}, "JU.T3,~N");
Clazz.defineMethod (c$, "setVib", 
 function (isReset, modulationScale) {
if (isReset) {
this.vib.setT (this.v0);
return;
}this.ptTemp.setT (this.mxyz);
this.symmetry.toCartesian (this.ptTemp, true);
JU.PT.fixPtFloats (this.ptTemp, 10000.0);
this.ptTemp.add (this.v0);
this.ptTemp.scale (this.vib.modScale * modulationScale * this.$scale);
this.vib.setT (this.ptTemp);
}, "~B,~N");
Clazz.overrideMethod (c$, "getState", 
function () {
var s = "";
if (this.qtOffset != null && this.qtOffset.length () > 0) s += "; modulation " + JU.Escape.eP (this.qtOffset) + " " + this.isQ + ";\n";
s += "modulation {selected} " + (this.enabled ? "ON" : "OFF");
return s;
});
Clazz.overrideMethod (c$, "getModPoint", 
function (asEnabled) {
return (asEnabled ? this : this.r0);
}, "~B");
Clazz.overrideMethod (c$, "getModulation", 
function (type, tuv) {
this.getModCalc ();
switch (type) {
case 'D':
return JU.P3.newP (tuv == null ? this.r0 : this.modCalc.calculate (tuv, false));
case 'M':
return JU.P3.newP (tuv == null ? this.v0 : this.modCalc.calculate (tuv, false).mxyz);
case 'T':
this.modCalc.calculate (tuv, false);
var ta = this.modCalc.rI.getArray ();
return JU.P3.new3 (ta[0][0], (this.modDim > 1 ? ta[1][0] : 0), (this.modDim > 2 ? ta[2][0] : 0));
case 'O':
return Float.$valueOf (Math.abs (tuv == null ? this.getOccupancy100 (false) : this.modCalc.calculate (tuv, false).getOccupancy100 (false)));
}
return null;
}, "~S,JU.T3");
Clazz.overrideMethod (c$, "setCalcPoint", 
function (pt, t456, vibScale, scale) {
if (this.enabled) {
this.addTo (pt, NaN);
this.getModCalc ().calculate (t456, false).addTo (pt, scale);
}return pt;
}, "JU.T3,JU.T3,~N,~N");
Clazz.defineMethod (c$, "getModCalc", 
 function () {
if (this.modCalc == null) {
this.modCalc =  new JU.ModulationSet ();
this.modCalc.axesLengths = this.axesLengths;
this.modCalc.enabled = true;
this.modCalc.fileOcc = this.fileOcc;
this.modCalc.gammaE = this.gammaE;
this.modCalc.gammaIinv = this.gammaIinv;
this.modCalc.id = this.id;
this.modCalc.modDim = this.modDim;
this.modCalc.mods = this.mods;
this.modCalc.nOps = this.nOps;
this.modCalc.occParams = this.occParams;
this.modCalc.occSiteMultiplicity = this.occSiteMultiplicity;
this.modCalc.r0 = this.r0;
this.modCalc.rI = this.rI;
this.modCalc.sigma = this.sigma;
this.modCalc.spinOp = this.spinOp;
this.modCalc.symmetry = this.symmetry;
this.modCalc.tau = this.tau;
this.modCalc.v0 = this.v0;
this.modCalc.vib = this.vib;
if (this.mxyz != null) this.modCalc.mxyz =  new JU.V3 ();
}return this.modCalc;
});
Clazz.overrideMethod (c$, "getInfo", 
function (info) {
var modInfo =  new java.util.Hashtable ();
modInfo.put ("id", this.id);
modInfo.put ("r0", this.r0);
modInfo.put ("tau", this.tau.getArray ());
modInfo.put ("modDim", Integer.$valueOf (this.modDim));
modInfo.put ("rsvs", this.rsvs);
modInfo.put ("sigma", this.sigma.getArray ());
modInfo.put ("symop", Integer.$valueOf (this.iop + 1));
modInfo.put ("strop", this.strop);
modInfo.put ("unitcell", this.symmetry.getUnitCellInfo ());
var mInfo =  new JU.Lst ();
for (var i = 0; i < this.mods.size (); i++) mInfo.addLast (this.mods.get (i).getInfo ());

modInfo.put ("mods", mInfo);
info.put ("modulation", modInfo);
}, "java.util.Map");
Clazz.overrideMethod (c$, "setXYZ", 
function (v) {
if (this.vib == null) return;
if (this.vib.modDim == -2) {
if (v.x == 1.4E-45 && v.y == 1.4E-45) {
this.vib.modScale = v.z;
return;
}}this.vib.setT (v);
}, "JU.T3");
Clazz.overrideMethod (c$, "getVibration", 
function (forceNew) {
if (this.vib == null && forceNew) this.vib =  new JU.Vibration ();
return this.vib;
}, "~B");
Clazz.overrideMethod (c$, "getV3", 
function () {
return (this.mxyz == null ? this : this.mxyz);
});
Clazz.overrideMethod (c$, "scaleVibration", 
function (m) {
if (this.vib == null) return;
if (m == 0) {
m = 1 / this.vib.modScale;
}this.vib.scale (m);
this.vib.modScale *= m;
}, "~N");
Clazz.overrideMethod (c$, "setMoment", 
function () {
if (this.mxyz == null) return;
this.symmetry.toCartesian (this.vib, true);
this.v0 = JU.V3.newV (this.vib);
});
Clazz.overrideMethod (c$, "isNonzero", 
function () {
return this.x != 0 || this.y != 0 || this.z != 0 || this.mxyz != null && (this.mxyz.x != 0 || this.mxyz.y != 0 || this.mxyz.z != 0);
});
Clazz.defineMethod (c$, "setOccupancy", 
function (pt, foccupancy, siteMult) {
this.occParams = pt;
this.fileOcc = foccupancy;
this.occSiteMultiplicity = siteMult;
return this.getOccupancy ();
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "getOccupancy100", 
function (isTemp) {
if (this.isCommensurate || Float.isNaN (this.vOcc)) return -2147483648;
if (!isTemp && !this.enabled) return Clazz.doubleToInt (-this.fileOcc * 100);
if (isTemp && this.modCalc != null) {
this.modCalc.getOccupancy ();
return this.modCalc.getOccupancy100 (false);
}return Clazz.floatToInt (this.occValue * 100);
}, "~B");
Clazz.defineMethod (c$, "getOccupancy", 
 function () {
var occ;
if (this.occAbsolute) {
occ = this.vOcc;
} else if (this.occParams == null) {
occ = this.fileOcc + this.vOcc;
} else if (this.occSiteMultiplicity > 0) {
var o_site = this.fileOcc * this.occSiteMultiplicity / this.nOps / this.occParams[1];
occ = o_site * (this.occParams[1] + this.vOcc);
} else {
occ = this.occParams[0] * (this.occParams[1] + this.vOcc);
}occ = (occ > 0.49 && occ < 0.50 ? 0.489 : Math.min (1, Math.max (0, occ)));
return this.occValue = occ;
});
});
