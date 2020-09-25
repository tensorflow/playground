Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.common.Annotation", "$.Coordinate"], "JSV.common.Measurement", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.pt2 = null;
this.value = 0;
Clazz.instantialize (this, arguments);
}, JSV.common, "Measurement", JSV.common.Annotation);
Clazz.prepareFields (c$, function () {
this.pt2 =  new JSV.common.Coordinate ();
});
Clazz.defineMethod (c$, "setM1", 
function (x, y, spec) {
this.setA (x, y, spec, "", false, false, 0, 6);
this.setPt2 (this.getXVal (), this.getYVal ());
return this;
}, "~N,~N,JSV.common.Spectrum");
Clazz.defineMethod (c$, "copyM", 
function () {
var m =  new JSV.common.Measurement ();
m.setA (this.getXVal (), this.getYVal (), this.spec, this.text, false, false, this.offsetX, this.offsetY);
m.setPt2 (this.pt2.getXVal (), this.pt2.getYVal ());
return m;
});
Clazz.defineMethod (c$, "setPt2", 
function (spec, doSetPt2) {
this.spec = spec;
if (doSetPt2) this.setPt2 (this.getXVal (), this.getYVal ());
return this;
}, "JSV.common.Spectrum,~B");
Clazz.defineMethod (c$, "setPt2", 
function (x, y) {
this.pt2.setXVal (x);
this.pt2.setYVal (y);
this.value = Math.abs (x - this.getXVal ());
this.text = this.spec.setMeasurementText (this);
}, "~N,~N");
Clazz.defineMethod (c$, "getSpectrum", 
function () {
return this.spec;
});
Clazz.defineMethod (c$, "setValue", 
function (value) {
this.value = value;
this.text = this.spec.setMeasurementText (this);
}, "~N");
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "getXVal2", 
function () {
return this.pt2.getXVal ();
});
Clazz.defineMethod (c$, "getYVal2", 
function () {
return this.pt2.getYVal ();
});
Clazz.overrideMethod (c$, "addSpecShift", 
function (dx) {
this.setXVal (this.getXVal () + dx);
this.pt2.setXVal (this.pt2.getXVal () + dx);
}, "~N");
Clazz.defineMethod (c$, "setYVal2", 
function (y2) {
this.pt2.setYVal (y2);
}, "~N");
Clazz.defineMethod (c$, "overlaps", 
function (x1, x2) {
return (Math.min (this.getXVal (), this.getXVal2 ()) < Math.max (x1, x2) && Math.max (this.getXVal (), this.getXVal2 ()) > Math.min (x1, x2));
}, "~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "[" + this.getXVal () + "," + this.pt2.getXVal () + "]";
});
Clazz.defineStatics (c$,
"PT_XY1", 1,
"PT_XY2", 2,
"PT_INT_LABEL", -5,
"PT_ON_LINE1", -1,
"PT_ON_LINE2", -2,
"PT_ON_LINE", 0);
});
