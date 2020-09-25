Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.ViewData", ["JSV.common.Coordinate", "$.ScaleData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.scaleData = null;
this.thisScale = null;
this.nSpectra = 0;
this.iThisScale = 0;
this.spectra = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "ViewData");
Clazz.defineMethod (c$, "getScaleData", 
function () {
return this.scaleData;
});
Clazz.defineMethod (c$, "getScale", 
function () {
return this.thisScale;
});
Clazz.makeConstructor (c$, 
function (spectra, yPt1, yPt2, startList, endList, isContinuous, is2D) {
this.nSpectra = (is2D ? 1 : spectra.size ());
this.scaleData =  new Array (this.nSpectra);
for (var j = 0; j < this.nSpectra; j++) this.scaleData[j] =  new JSV.common.ScaleData (startList[j], endList[j]);

this.init (spectra, yPt1, yPt2, isContinuous);
}, "JU.Lst,~N,~N,~A,~A,~B,~B");
Clazz.makeConstructor (c$, 
function (spectra, yPt1, yPt2, isContinuous) {
this.nSpectra = spectra.size ();
var n = spectra.get (0).getXYCoords ().length;
this.scaleData =  new Array (1);
this.scaleData[0] =  new JSV.common.ScaleData (0, n - 1);
this.init (spectra, yPt1, yPt2, isContinuous);
}, "JU.Lst,~N,~N,~B");
Clazz.defineMethod (c$, "init", 
function (spectra, yPt1, yPt2, isContinuous) {
if (spectra == null) spectra = this.spectra;
 else this.spectra = spectra;
this.thisScale = this.scaleData[this.iThisScale = 0];
for (var i = 0; i < this.scaleData.length; i++) {
this.scaleData[i].userYFactor = spectra.get (i).getUserYFactor ();
this.scaleData[i].spectrumYRef = spectra.get (i).getYRef ();
}
this.resetScaleFactors ();
var minX = JSV.common.Coordinate.getMinX (spectra, this);
var maxX = JSV.common.Coordinate.getMaxX (spectra, this);
var minY = JSV.common.Coordinate.getMinYUser (spectra, this);
var maxY = JSV.common.Coordinate.getMaxYUser (spectra, this);
if (yPt1 != yPt2) {
minY = yPt1;
maxY = yPt2;
if (minY > maxY) {
var t = minY;
minY = maxY;
maxY = t;
}}var isInverted = spectra.get (0).isInverted ();
for (var i = 0; i < this.scaleData.length; i++) {
this.scaleData[i].setMinMax (minX, maxX, minY, maxY);
this.scaleData[i].setScale (isContinuous, isInverted);
}
}, "JU.Lst,~N,~N,~B");
Clazz.defineMethod (c$, "newSpectrum", 
function (spectra) {
this.init (spectra, 0, 0, false);
}, "JU.Lst");
Clazz.defineMethod (c$, "setXRangeForSubSpectrum", 
function (xyCoords) {
this.setXRange (0, xyCoords, this.scaleData[0].minX, this.scaleData[0].maxX, 0, xyCoords.length - 1);
}, "~A");
Clazz.defineMethod (c$, "setXRange", 
 function (i, xyCoords, initX, finalX, iStart, iEnd) {
var index = 0;
var ptCount = 0;
for (index = iStart; index <= iEnd; index++) {
var x = xyCoords[index].getXVal ();
if (x >= initX) {
this.scaleData[i % this.scaleData.length].startDataPointIndex = index;
break;
}}
for (; index <= iEnd; index++) {
var x = xyCoords[index].getXVal ();
ptCount++;
if (x >= finalX) {
break;
}}
this.scaleData[i % this.scaleData.length].endDataPointIndex = index;
return ptCount;
}, "~N,~A,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getStartingPointIndex", 
function (i) {
return this.scaleData[i % this.scaleData.length].startDataPointIndex;
}, "~N");
Clazz.defineMethod (c$, "getEndingPointIndex", 
function (i) {
return this.scaleData[i % this.scaleData.length].endDataPointIndex;
}, "~N");
Clazz.defineMethod (c$, "areYScalesSame", 
function (i, j) {
i %= this.scaleData.length;
j %= this.scaleData.length;
return (this.scaleData[i].minYOnScale == this.scaleData[j].minYOnScale && this.scaleData[i].maxYOnScale == this.scaleData[j].maxYOnScale);
}, "~N,~N");
Clazz.defineMethod (c$, "setScale", 
function (i, xPixels, yPixels, isInverted) {
this.iThisScale = i % this.scaleData.length;
this.thisScale = this.scaleData[this.iThisScale];
this.thisScale.setXYScale (xPixels, yPixels, isInverted);
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "resetScaleFactors", 
function () {
for (var i = 0; i < this.scaleData.length; i++) this.scaleData[i].spectrumScaleFactor = 1;

});
Clazz.defineMethod (c$, "scaleSpectrum", 
function (i, f) {
if (f <= 0 || i >= this.nSpectra) return;
if (i == -2) {
this.thisScale.scale2D (f);
return;
}if (i < 0) for (i = 0; i < this.scaleData.length; i++) this.scaleData[i].scaleBy (f);

 else this.scaleData[i % this.scaleData.length].scaleBy (f);
}, "~N,~N");
Clazz.defineMethod (c$, "getNewScales", 
function (iSelected, isXOnly, y1, y2) {
if (isXOnly) return this.scaleData;
iSelected %= this.scaleData.length;
var f1 = (y1 - this.thisScale.minYOnScale) / (this.thisScale.maxYOnScale - this.thisScale.minYOnScale);
var f2 = (y2 - this.thisScale.minYOnScale) / (this.thisScale.maxYOnScale - this.thisScale.minYOnScale);
var sd =  new Array (this.scaleData.length);
for (var i = 0; i < this.scaleData.length; i++) sd[i] = (iSelected >= 0 && i != iSelected ? this.scaleData[i] :  new JSV.common.ScaleData ());

JSV.common.ScaleData.copyScaleFactors (this.scaleData, sd);
JSV.common.ScaleData.copyYScales (this.scaleData, sd);
for (var i = 0; i < this.scaleData.length; i++) {
if (iSelected >= 0 && i != iSelected) continue;
sd[i].isShiftZoomedY = true;
sd[i].minYOnScale = this.scaleData[i].minYOnScale * (1 - f1) + f1 * this.scaleData[i].maxYOnScale;
sd[i].maxYOnScale = this.scaleData[i].minYOnScale * (1 - f2) + f2 * this.scaleData[i].maxYOnScale;
}
return sd;
}, "~N,~B,~N,~N");
});
