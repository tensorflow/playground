Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.common.MeasurementData"], "JSV.common.PeakData", ["java.lang.Double", "JU.DF", "JSV.common.Coordinate", "$.PeakPick"], function () {
c$ = Clazz.decorateAsClass (function () {
this.thresh = 0;
this.minY = 0;
this.maxY = 0;
Clazz.instantialize (this, arguments);
}, JSV.common, "PeakData", JSV.common.MeasurementData);
Clazz.defineMethod (c$, "getThresh", 
function () {
return this.thresh;
});
Clazz.overrideMethod (c$, "getDataHeader", 
function () {
return (this.spec.isHNMR () ? JSV.common.PeakData.HNMR_HEADER :  Clazz.newArray (-1, ["peak", this.spec.getXUnits (), this.spec.getYUnits ()]));
});
Clazz.overrideMethod (c$, "getMeasurementListArray", 
function (units) {
var data =  new Array (this.size ());
var last =  Clazz.newDoubleArray (-1, [-1.0E100, 1e100, 1e100]);
var ddata;
for (var pt = 0, i = this.size (); --i >= 0; pt++) {
ddata = this.spec.getPeakListArray (this.get (i), last, this.maxY);
if (ddata.length == 2) data[pt] =  Clazz.newArray (-1, ["" + (pt + 1), JU.DF.formatDecimalDbl (ddata[0], 2), JU.DF.formatDecimalDbl (ddata[1], 4)]);
 else data[pt] =  Clazz.newArray (-1, ["" + (pt + 1), JU.DF.formatDecimalDbl (ddata[0], 4), JU.DF.formatDecimalDbl (ddata[1], 4), JU.DF.formatDecimalDbl (ddata[2], 2), (ddata[3] == 0 ? "" : JU.DF.formatDecimalDbl (ddata[3], 2)), (ddata[4] == 0 ? "" : JU.DF.formatDecimalDbl (ddata[4], 2)), (ddata[5] == 0 ? "" : JU.DF.formatDecimalDbl (ddata[5], 2))]);
}
return data;
}, "~S");
Clazz.overrideMethod (c$, "getMeasurementListArrayReal", 
function (units) {
var data =  Clazz.newDoubleArray (this.size (), 0);
var last =  Clazz.newDoubleArray (-1, [-1.0E100, 1e100, 1e100]);
for (var pt = 0, i = this.size (); --i >= 0; pt++) data[pt] = this.spec.getPeakListArray (this.get (i), last, this.maxY);

return data;
}, "~S");
Clazz.defineMethod (c$, "getInfo", 
function (info) {
info.put ("interpolation", this.myParams.peakListInterpolation);
info.put ("threshold", Double.$valueOf (this.myParams.peakListThreshold));
Clazz.superCall (this, JSV.common.PeakData, "getInfo", [info]);
}, "java.util.Map");
Clazz.defineMethod (c$, "setPeakList", 
function (p, precision, view) {
this.precision = (precision == -2147483648 ? this.spec.getDefaultUnitPrecision () : precision);
var xyCoords = this.spec.getXYCoords ();
if (xyCoords.length < 3) return;
this.clear ();
if (p != null) {
this.myParams.peakListInterpolation = p.peakListInterpolation;
this.myParams.peakListThreshold = p.peakListThreshold;
}var doInterpolate = (this.myParams.peakListInterpolation.equals ("parabolic"));
var isInverted = this.spec.isInverted ();
this.minY = view.minYOnScale;
this.maxY = view.maxYOnScale;
var minX = view.minXOnScale;
var maxX = view.maxXOnScale;
this.thresh = this.myParams.peakListThreshold;
if (Double.isNaN (this.thresh)) this.thresh = this.myParams.peakListThreshold = (this.minY + this.maxY) / 2;
var yLast = 0;
var y3 =  Clazz.newDoubleArray (-1, [xyCoords[0].getYVal (), yLast = xyCoords[1].getYVal (), 0]);
var n = 0;
if (isInverted) for (var i = 2; i < xyCoords.length; i++) {
var y = y3[i % 3] = xyCoords[i].getYVal ();
if (yLast < this.thresh && y3[(i - 2) % 3] > yLast && yLast < y) {
var x = (doInterpolate ? JSV.common.Coordinate.parabolicInterpolation (xyCoords, i - 1) : xyCoords[i - 1].getXVal ());
if (x >= minX || x <= maxX) {
var m =  new JSV.common.PeakPick ().setValue (x, y, this.spec, null, 0);
this.addLast (m);
if (++n == 100) break;
}}yLast = y;
}
 else for (var i = 2; i < xyCoords.length; i++) {
var y = y3[i % 3] = xyCoords[i].getYVal ();
if (yLast > this.thresh && y3[(i - 2) % 3] < yLast && yLast > y) {
var x = (doInterpolate ? JSV.common.Coordinate.parabolicInterpolation (xyCoords, i - 1) : xyCoords[i - 1].getXVal ());
if (x >= minX && x <= maxX) {
var m =  new JSV.common.PeakPick ().setValue (x, y, this.spec, JU.DF.formatDecimalDbl (x, precision), x);
this.addLast (m);
if (++n == 100) break;
}}yLast = y;
}
}, "JSV.common.Parameters,~N,JSV.common.ScaleData");
c$.HNMR_HEADER = c$.prototype.HNMR_HEADER =  Clazz.newArray (-1, ["peak", "shift/ppm", "intens", "shift/hz", "diff/hz", "2-diff", "3-diff"]);
});
