Clazz.declarePackage ("JU");
Clazz.load (["JU.V3"], "JU.Vibration", ["JU.P3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modDim = -1;
this.modScale = NaN;
this.showTrace = false;
this.trace = null;
this.tracePt = 0;
Clazz.instantialize (this, arguments);
}, JU, "Vibration", JU.V3);
Clazz.defineMethod (c$, "setCalcPoint", 
function (pt, t456, scale, modulationScale) {
switch (this.modDim) {
case -2:
break;
default:
pt.scaleAdd2 ((Math.cos (t456.x * 6.283185307179586) * scale), this, pt);
break;
}
return pt;
}, "JU.T3,JU.T3,~N,~N");
Clazz.defineMethod (c$, "getInfo", 
function (info) {
info.put ("vibVector", JU.V3.newV (this));
info.put ("vibType", (this.modDim == -2 ? "spin" : this.modDim == -1 ? "vib" : "mod"));
}, "java.util.Map");
Clazz.overrideMethod (c$, "clone", 
function () {
var v =  new JU.Vibration ();
v.setT (this);
v.modDim = this.modDim;
return v;
});
Clazz.defineMethod (c$, "setXYZ", 
function (vib) {
this.setT (vib);
}, "JU.T3");
Clazz.defineMethod (c$, "setType", 
function (type) {
this.modDim = type;
return this;
}, "~N");
Clazz.defineMethod (c$, "isNonzero", 
function () {
return this.x != 0 || this.y != 0 || this.z != 0;
});
Clazz.defineMethod (c$, "getOccupancy100", 
function (isTemp) {
return -2147483648;
}, "~B");
Clazz.defineMethod (c$, "startTrace", 
function (n) {
this.trace =  new Array (n);
this.tracePt = n;
}, "~N");
Clazz.defineMethod (c$, "addTracePt", 
function (n, ptNew) {
if (this.trace == null || n == 0 || n != this.trace.length) this.startTrace (n);
if (ptNew != null && n > 2) {
if (--this.tracePt <= 0) {
var p0 = this.trace[this.trace.length - 1];
for (var i = this.trace.length; --i >= 1; ) this.trace[i] = this.trace[i - 1];

this.trace[1] = p0;
this.tracePt = 1;
}var p = this.trace[this.tracePt];
if (p == null) p = this.trace[this.tracePt] =  new JU.P3 ();
p.setT (ptNew);
}return this.trace;
}, "~N,JU.Point3fi");
Clazz.defineStatics (c$,
"twoPI", 6.283185307179586,
"TYPE_VIBRATION", -1,
"TYPE_SPIN", -2);
});
