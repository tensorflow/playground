Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.ScaleData", ["java.lang.Double", "JSV.common.Coordinate"], function () {
c$ = Clazz.decorateAsClass (function () {
this.initMinYOnScale = 0;
this.initMaxYOnScale = 0;
this.initMinY = 0;
this.initMaxY = 0;
this.startDataPointIndex = 0;
this.endDataPointIndex = 0;
this.pointCount = 0;
this.minX = 0;
this.maxX = 0;
this.firstX = NaN;
this.minXOnScale = 0;
this.maxXOnScale = 0;
this.specShift = 0;
this.precision = null;
this.exportPrecision = null;
this.steps = null;
this.minorTickCounts = null;
this.minYOnScale = 0;
this.maxYOnScale = 0;
this.minY = 0;
this.maxY = 0;
this.isShiftZoomedY = false;
this.spectrumScaleFactor = 1;
this.spectrumYRef = 0;
this.userYFactor = 1;
this.firstY = 0;
this.minY2D = 0;
this.maxY2D = 0;
this.xFactorForScale = 0;
this.yFactorForScale = 0;
Clazz.instantialize (this, arguments);
}, JSV.common, "ScaleData");
Clazz.prepareFields (c$, function () {
this.precision =  Clazz.newIntArray (2, 0);
this.exportPrecision =  Clazz.newIntArray (2, 0);
this.steps =  Clazz.newDoubleArray (2, 0);
this.minorTickCounts =  Clazz.newIntArray (2, 0);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (iStart, iEnd) {
this.startDataPointIndex = iStart;
this.endDataPointIndex = iEnd;
this.pointCount = this.endDataPointIndex - this.startDataPointIndex + 1;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (coords, start, end, isContinuous, isInverted) {
this.minX = JSV.common.Coordinate.getMinX (coords, start, end);
this.maxX = JSV.common.Coordinate.getMaxX (coords, start, end);
this.minY = JSV.common.Coordinate.getMinY (coords, start, end);
if (this.minY > 0 && !isContinuous) this.minY = 0;
this.maxY = JSV.common.Coordinate.getMaxY (coords, start, end);
this.setScale (isContinuous, isInverted);
}, "~A,~N,~N,~B,~B");
Clazz.defineMethod (c$, "setScale", 
function (isContinuous, isInverted) {
this.setXScale ();
if (!isContinuous) this.maxXOnScale += this.steps[0] / 2;
this.setYScale (this.minY, this.maxY, true, isInverted);
}, "~B,~B");
Clazz.defineMethod (c$, "setXScale", 
 function () {
var xStep = this.setScaleParams (this.minX, this.maxX, 0);
this.firstX = Math.floor (this.minX / xStep) * xStep;
if (Math.abs ((this.minX - this.firstX) / xStep) > 0.0001) this.firstX += xStep;
this.minXOnScale = this.minX;
this.maxXOnScale = this.maxX;
});
Clazz.defineMethod (c$, "isYZeroOnScale", 
function () {
return (this.minYOnScale < this.spectrumYRef && this.maxYOnScale > this.spectrumYRef);
});
Clazz.defineMethod (c$, "setYScale", 
function (minY, maxY, setScaleMinMax, isInverted) {
if (minY == 0 && maxY == 0) maxY = 1;
if (this.isShiftZoomedY) {
minY = this.minYOnScale;
maxY = this.maxYOnScale;
}var yStep = this.setScaleParams (minY, maxY, 1);
var dy = (isInverted ? yStep / 2 : yStep / 4);
var dy2 = (isInverted ? yStep / 4 : yStep / 2);
if (!this.isShiftZoomedY) {
this.minYOnScale = (minY == 0 ? 0 : setScaleMinMax ? dy * Math.floor (minY / dy) : minY);
this.maxYOnScale = (setScaleMinMax ? dy2 * Math.ceil (maxY * 1.05 / dy2) : maxY);
}this.firstY = (minY == 0 ? 0 : Math.floor (minY / dy) * dy);
if (this.minYOnScale < 0 && this.maxYOnScale > 0) {
this.firstY = 0;
while (this.firstY - yStep > this.minYOnScale) this.firstY -= yStep;

} else if (this.minYOnScale != 0 && Math.abs ((minY - this.firstY) / dy) > 0.0001) {
this.firstY += dy;
}if (setScaleMinMax) {
this.initMinYOnScale = this.minYOnScale;
this.initMaxYOnScale = this.maxYOnScale;
this.initMinY = minY;
this.initMaxY = maxY;
}}, "~N,~N,~B,~B");
Clazz.defineMethod (c$, "scale2D", 
function (f) {
var dy = this.maxY - this.minY;
if (f == 1) {
this.maxY = this.initMaxY;
this.minY = this.initMinY;
return;
}this.maxY = this.minY + dy / f;
}, "~N");
Clazz.defineMethod (c$, "setXRange", 
function (x1, x2) {
this.minX = x1;
this.maxX = x2;
this.setXScale ();
}, "~N,~N");
c$.getXRange = Clazz.defineMethod (c$, "getXRange", 
 function (i, xyCoords, initX, finalX, iStart, iEnd, startIndices, endIndices) {
var index = 0;
var ptCount = 0;
for (index = iStart; index <= iEnd; index++) {
if (xyCoords[index].getXVal () >= initX) {
startIndices[i] = index;
ptCount = 1;
break;
}}
while (++index <= iEnd && xyCoords[index].getXVal () <= finalX) {
ptCount++;
}
endIndices[i] = startIndices[i] + ptCount - 1;
return ptCount;
}, "~N,~A,~N,~N,~N,~N,~A,~A");
Clazz.defineMethod (c$, "setScaleParams", 
 function (min, max, i) {
var dx = (max == min ? 1 : Math.abs (max - min) / 14);
var log = Math.log10 (Math.abs (dx));
var exp = Clazz.doubleToInt (Math.floor (log));
this.exportPrecision[i] = exp;
this.precision[i] = (exp <= 0 ? Math.min (8, 1 - exp) : exp > 3 ? -2 : 0);
var j = 0;
var dec = Math.pow (10, log - exp);
while (dec > JSV.common.ScaleData.NTICKS[j]) {
j++;
}
this.steps[i] = Math.pow (10, exp) * JSV.common.ScaleData.NTICKS[j];
log = Math.log10 (Math.abs (this.steps[i] * 1.0001e5));
var mantissa = log - Math.floor (log);
var n = 0;
for (j = 0; j < JSV.common.ScaleData.NTICKS.length; j++) if (Math.abs (mantissa - JSV.common.ScaleData.LOGTICKS[j]) < 0.001) {
n = JSV.common.ScaleData.NTICKS[j];
break;
}
this.minorTickCounts[i] = n;
return this.steps[i];
}, "~N,~N,~N");
Clazz.defineMethod (c$, "isInRangeX", 
function (x) {
return (x >= this.minX && x <= this.maxX);
}, "~N");
Clazz.defineMethod (c$, "addSpecShift", 
function (dx) {
this.specShift += dx;
this.minX += dx;
this.maxX += dx;
this.minXOnScale += dx;
this.maxXOnScale += dx;
this.firstX += dx;
}, "~N");
Clazz.defineMethod (c$, "getInfo", 
function (info) {
info.put ("specShift", Double.$valueOf (this.specShift));
info.put ("minX", Double.$valueOf (this.minX));
info.put ("maxX", Double.$valueOf (this.maxX));
info.put ("minXOnScale", Double.$valueOf (this.minXOnScale));
info.put ("maxXOnScale", Double.$valueOf (this.maxXOnScale));
info.put ("minY", Double.$valueOf (this.minY));
info.put ("maxY", Double.$valueOf (this.maxY));
info.put ("minYOnScale", Double.$valueOf (this.minYOnScale));
info.put ("maxYOnScale", Double.$valueOf (this.maxYOnScale));
info.put ("minorTickCountX", Integer.$valueOf (this.minorTickCounts[0]));
info.put ("xStep", Double.$valueOf (this.steps[0]));
return info;
}, "java.util.Map");
Clazz.defineMethod (c$, "setMinMax", 
function (minX, maxX, minY, maxY) {
this.minX = minX;
this.maxX = maxX;
this.minY = minY;
this.maxY = maxY;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "toX", 
function (xPixel, xPixel1, drawXAxisLeftToRight) {
return this.toXScaled (xPixel, xPixel1, drawXAxisLeftToRight, this.xFactorForScale);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "toX0", 
function (xPixel, xPixel0, xPixel1, drawXAxisLeftToRight) {
return this.toXScaled (xPixel, xPixel1, drawXAxisLeftToRight, (this.maxXOnScale - this.minXOnScale) / (xPixel1 - xPixel0));
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "toXScaled", 
 function (xPixel, xPixel1, drawXAxisLeftToRight, factor) {
return (drawXAxisLeftToRight ? this.maxXOnScale - (xPixel1 - xPixel) * factor : this.minXOnScale + (xPixel1 - xPixel) * factor);
}, "~N,~N,~B,~N");
Clazz.defineMethod (c$, "toPixelX", 
function (dx, xPixel0, xPixel1, drawXAxisLeftToRight) {
return this.toPixelXScaled (dx, xPixel0, xPixel1, drawXAxisLeftToRight, this.xFactorForScale);
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "toPixelX0", 
function (dx, xPixel0, xPixel1, drawXAxisLeftToRight) {
return this.toPixelXScaled (dx, xPixel0, xPixel1, drawXAxisLeftToRight, (this.maxXOnScale - this.minXOnScale) / (xPixel1 - xPixel0));
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "toPixelXScaled", 
 function (dx, xPixel0, xPixel1, drawXAxisLeftToRight, factor) {
var x = Clazz.doubleToInt ((dx - this.minXOnScale) / factor);
return (drawXAxisLeftToRight ? xPixel0 + x : xPixel1 - x);
}, "~N,~N,~N,~B,~N");
Clazz.defineMethod (c$, "toY", 
function (yPixel, yPixel0) {
return this.maxYOnScale + (yPixel0 - yPixel) * this.yFactorForScale;
}, "~N,~N");
Clazz.defineMethod (c$, "toY0", 
function (yPixel, yPixel0, yPixel1) {
var factor = (this.maxYOnScale - this.minYOnScale) / (yPixel1 - yPixel0);
var y = this.maxYOnScale + (yPixel0 - yPixel) * factor;
return Math.max (this.minYOnScale, Math.min (y, this.maxYOnScale));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "toPixelY", 
function (yVal, yPixel1) {
return (Double.isNaN (yVal) ? -2147483648 : yPixel1 - Clazz.doubleToInt (((yVal - this.spectrumYRef) * this.userYFactor + this.spectrumYRef - this.minYOnScale) / this.yFactorForScale));
}, "~N,~N");
Clazz.defineMethod (c$, "toPixelY0", 
function (y, yPixel0, yPixel1) {
var factor = (this.maxYOnScale - this.minYOnScale) / (yPixel1 - yPixel0);
return Clazz.doubleToInt (yPixel0 + (this.maxYOnScale - y) / factor);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setXYScale", 
function (xPixels, yPixels, isInverted) {
var yRef = this.spectrumYRef;
var f = this.spectrumScaleFactor;
var useInit = (f != 1 || this.isShiftZoomedY);
var minY = (useInit ? this.initMinYOnScale : this.minY);
var maxY = (useInit ? this.initMaxYOnScale : this.maxY);
if (useInit && yRef < minY) yRef = minY;
if (useInit && yRef > maxY) yRef = maxY;
this.setYScale ((minY - yRef) / f + yRef, (maxY - yRef) / f + yRef, f == 1, isInverted);
this.xFactorForScale = (this.maxXOnScale - this.minXOnScale) / (xPixels - 1);
this.yFactorForScale = (this.maxYOnScale - this.minYOnScale) / (yPixels - 1);
}, "~N,~N,~B");
c$.copyScaleFactors = Clazz.defineMethod (c$, "copyScaleFactors", 
function (sdFrom, sdTo) {
for (var i = 0; i < sdFrom.length; i++) {
sdTo[i].spectrumScaleFactor = sdFrom[i].spectrumScaleFactor;
sdTo[i].spectrumYRef = sdFrom[i].spectrumYRef;
sdTo[i].userYFactor = sdFrom[i].userYFactor;
sdTo[i].specShift = sdFrom[i].specShift;
sdTo[i].isShiftZoomedY = sdFrom[i].isShiftZoomedY;
}
}, "~A,~A");
c$.copyYScales = Clazz.defineMethod (c$, "copyYScales", 
function (sdFrom, sdTo) {
for (var i = 0; i < sdFrom.length; i++) {
sdTo[i].initMinYOnScale = sdFrom[i].initMinYOnScale;
sdTo[i].initMaxYOnScale = sdFrom[i].initMaxYOnScale;
sdTo[i].minY = sdFrom[i].minY;
sdTo[i].maxY = sdFrom[i].maxY;
if (sdFrom[i].isShiftZoomedY) {
sdTo[i].isShiftZoomedY = true;
sdTo[i].minYOnScale = sdFrom[i].minYOnScale;
sdTo[i].maxYOnScale = sdFrom[i].maxYOnScale;
}}
}, "~A,~A");
c$.setDataPointIndices = Clazz.defineMethod (c$, "setDataPointIndices", 
function (graphsTemp, initX, finalX, minPoints, startIndices, endIndices) {
var nSpectraOK = 0;
var nSpectra = graphsTemp.size ();
for (var i = 0; i < nSpectra; i++) {
var xyCoords = graphsTemp.get (i).getXYCoords ();
if (JSV.common.ScaleData.getXRange (i, xyCoords, initX, finalX, 0, xyCoords.length - 1, startIndices, endIndices) >= minPoints) nSpectraOK++;
}
return (nSpectraOK == nSpectra);
}, "JU.Lst,~N,~N,~N,~A,~A");
c$.fixScale = Clazz.defineMethod (c$, "fixScale", 
function (map) {
if (map.isEmpty ()) return;
while (true) {
for (var entry, $entry = map.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var s = entry.getValue ();
var pt = s.indexOf ("E");
if (pt >= 0) s = s.substring (0, pt);
if (s.indexOf (".") < 0) return;
if (!s.endsWith ("0") && !s.endsWith (".")) return;
}
for (var entry, $entry = map.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var s = entry.getValue ();
var pt = s.indexOf ("E");
if (pt >= 0) entry.setValue (s.substring (0, pt - 1) + s.substring (pt));
 else entry.setValue (s.substring (0, s.length - 1));
}
}
}, "java.util.Map");
Clazz.defineMethod (c$, "scaleBy", 
function (f) {
if (this.isShiftZoomedY) {
var center = (this.isYZeroOnScale () ? this.spectrumYRef : (this.minYOnScale + this.maxYOnScale) / 2);
this.minYOnScale = center - (center - this.minYOnScale) / f;
this.maxYOnScale = center - (center - this.maxYOnScale) / f;
} else {
this.spectrumScaleFactor *= f;
}}, "~N");
Clazz.defineStatics (c$,
"NTICKS",  Clazz.newIntArray (-1, [2, 5, 10, 10]));
c$.LOGTICKS = c$.prototype.LOGTICKS =  Clazz.newDoubleArray (-1, [Math.log10 (2), Math.log10 (5), 0, 1]);
});
