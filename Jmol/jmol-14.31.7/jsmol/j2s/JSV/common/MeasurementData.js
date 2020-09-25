Clazz.declarePackage ("JSV.common");
Clazz.load (["JU.Lst", "JSV.api.AnnotationData"], "JSV.common.MeasurementData", ["JU.AU", "$.DF", "JSV.common.Annotation", "$.Parameters"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.spec = null;
this.units = null;
this.precision = 0;
this.myParams = null;
this.isON = true;
this.key = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "MeasurementData", JU.Lst, JSV.api.AnnotationData);
Clazz.makeConstructor (c$, 
function (type, spec) {
Clazz.superConstructor (this, JSV.common.MeasurementData, []);
this.type = type;
this.spec = spec;
this.myParams =  new JSV.common.Parameters ().setName ("MeasurementData");
}, "JSV.common.Annotation.AType,JSV.common.Spectrum");
Clazz.defineMethod (c$, "getMeasurements", 
function () {
return this;
});
Clazz.overrideMethod (c$, "getAType", 
function () {
return this.type;
});
Clazz.overrideMethod (c$, "getState", 
function () {
return this.isON;
});
Clazz.overrideMethod (c$, "setState", 
function (b) {
this.isON = b;
}, "~B");
Clazz.defineMethod (c$, "setMeasurements", 
function (measurements) {
}, "JU.Lst");
Clazz.overrideMethod (c$, "getParameters", 
function () {
return this.myParams;
});
Clazz.defineMethod (c$, "getDataHeader", 
function () {
return JSV.common.MeasurementData.HEADER;
});
Clazz.defineMethod (c$, "getMeasurementListArray", 
function (units) {
this.units = units;
var ddata = this.getMeasurementListArrayReal (units);
var precisionX = (this.spec.isNMR () ? 4 : 2);
var precisionDX = (this.spec.isHNMR () && units.equals ("ppm") ? 4 : 2);
var data =  new Array (this.size ());
for (var i = this.size (); --i >= 0; ) data[i] =  Clazz.newArray (-1, ["" + (i + 1), JU.DF.formatDecimalDbl (ddata[i][0], precisionX), JU.DF.formatDecimalDbl (ddata[i][1], precisionX), JU.DF.formatDecimalDbl (ddata[i][2], precisionDX)]);

return data;
}, "~S");
Clazz.defineMethod (c$, "getMeasurementListArrayReal", 
function (units) {
var toHz = this.spec.isNMR () && units.equalsIgnoreCase ("HZ");
var data = JU.AU.newDouble2 (this.size ());
for (var pt = 0, i = this.size (); --i >= 0; ) {
var y = this.get (i).getValue ();
if (toHz) y *= this.spec.observedFreq;
data[pt++] =  Clazz.newDoubleArray (-1, [this.get (i).getXVal (), this.get (i).getXVal2 (), y]);
}
return data;
}, "~S");
c$.checkParameters = Clazz.defineMethod (c$, "checkParameters", 
function (md, p) {
if (md.size () == 0) return false;
var myParams = md.getParameters ();
switch (md.getAType ()) {
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.PeakList:
return (p.peakListInterpolation.equals (myParams.peakListInterpolation) && p.peakListThreshold == myParams.peakListThreshold);
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
}
return false;
}, "JSV.common.MeasurementData,JSV.common.ColorParameters");
Clazz.overrideMethod (c$, "getSpectrum", 
function () {
return this.spec;
});
Clazz.overrideMethod (c$, "getData", 
function () {
return this;
});
Clazz.defineMethod (c$, "clear", 
function (x1, x2) {
for (var i = this.size (); --i >= 0; ) {
var $in = this.get (i);
if ($in.text.length == 0 || $in.overlaps (x1, x2)) {
this.removeItemAt (i);
}}
}, "~N,~N");
Clazz.defineMethod (c$, "find", 
function (x) {
for (var i = this.size (); --i >= 0; ) {
var $in = this.get (i);
if ($in.overlaps (x, x)) {
return i;
}}
return -1;
}, "~N");
Clazz.overrideMethod (c$, "setSpecShift", 
function (dx) {
for (var i = this.size (); --i >= 0; ) {
var m = this.get (i);
var x = m.getXVal () + dx;
m.setXVal (x);
m.setValue (x);
m.text = JU.DF.formatDecimalDbl (x, this.precision);
}
}, "~N");
Clazz.overrideMethod (c$, "getGraphSetKey", 
function () {
return this.key;
});
Clazz.overrideMethod (c$, "setGraphSetKey", 
function (key) {
this.key = key;
}, "~S");
Clazz.overrideMethod (c$, "isVisible", 
function () {
return true;
});
Clazz.defineMethod (c$, "getInfo", 
function (info) {
info.put ("header", this.getDataHeader ());
info.put ("table", this.getMeasurementListArrayReal ("ppm"));
if (this.units != null) info.put ("units", this.units);
}, "java.util.Map");
Clazz.overrideMethod (c$, "isDialog", 
function () {
return false;
});
c$.HEADER = c$.prototype.HEADER =  Clazz.newArray (-1, ["", "start", "end", "value"]);
});
