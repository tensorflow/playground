Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.common.XYScaleConverter", "java.util.Hashtable", "JU.BS", "$.Lst", "JSV.common.Coordinate"], "JSV.common.GraphSet", ["java.lang.Boolean", "$.Double", "$.Float", "JU.DF", "$.PT", "JSV.common.Annotation", "$.ColorParameters", "$.ColoredAnnotation", "$.ImageView", "$.Integral", "$.IntegralData", "$.Measurement", "$.MeasurementData", "$.PanelData", "$.Parameters", "$.PeakData", "$.PeakPickEvent", "$.PlotWidget", "$.ScaleData", "$.ScriptToken", "$.Spectrum", "$.ViewData", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.gs2dLinkedX = null;
this.gs2dLinkedY = null;
this.cur1D2Locked = false;
this.highlights = null;
this.spectra = null;
this.isSplittable = true;
this.allowStacking = true;
this.annotations = null;
this.selectedSpectrumMeasurements = null;
this.selectedSpectrumIntegrals = null;
this.lastAnnotation = null;
this.pendingMeasurement = null;
this.pendingIntegral = null;
this.graphsTemp = null;
this.widgets = null;
this.isLinked = false;
this.haveSingleYScale = false;
this.iSpectrumMovedTo = 0;
this.iSpectrumClicked = 0;
this.iSpectrumSelected = -1;
this.stackSelected = false;
this.bsSelected = null;
this.viewData = null;
this.reversePlot = false;
this.nSplit = 1;
this.yStackOffsetPercent = 0;
this.showAllStacked = true;
this.viewList = null;
this.imageView = null;
this.pd = null;
this.sticky2Dcursor = false;
this.nSpectra = 0;
this.fracX = 1;
this.fracY = 1;
this.fX0 = 0;
this.fY0 = 0;
this.zoomBox1D = null;
this.zoomBox2D = null;
this.pin1Dx0 = null;
this.pin1Dx1 = null;
this.pin1Dy0 = null;
this.pin1Dy1 = null;
this.pin1Dx01 = null;
this.pin1Dy01 = null;
this.pin2Dx0 = null;
this.pin2Dx1 = null;
this.pin2Dy0 = null;
this.pin2Dy1 = null;
this.pin2Dx01 = null;
this.pin2Dy01 = null;
this.cur2Dx0 = null;
this.cur2Dx1 = null;
this.cur1D2x1 = null;
this.cur1D2x2 = null;
this.cur2Dy = null;
this.xPixel0 = 0;
this.yPixel0 = 0;
this.xPixel1 = 0;
this.yPixel1 = 0;
this.xVArrows = 0;
this.xHArrows = 0;
this.yHArrows = 0;
this.xPixel00 = 0;
this.yPixel00 = 0;
this.xPixel11 = 0;
this.yPixel11 = 0;
this.yPixel000 = 0;
this.xPixels = 0;
this.yPixels = 0;
this.xPixel10 = 0;
this.xPixels0 = 0;
this.allowStackedYScale = true;
this.drawXAxisLeftToRight = false;
this.xAxisLeftToRight = true;
this.iPreviousSpectrumClicked = -1;
this.$haveSelectedSpectrum = false;
this.zoomEnabled = false;
this.currentZoomIndex = 0;
this.lastClickX = NaN;
this.lastPixelX = 2147483647;
this.height = 0;
this.width = 0;
this.right = 0;
this.top = 0;
this.left = 0;
this.bottom = 0;
this.piMouseOver = null;
this.coordTemp = null;
this.FONT_PLAIN = 0;
this.FONT_BOLD = 1;
this.FONT_ITALIC = 2;
this.is2DSpectrum = false;
this.selectedMeasurement = null;
this.selectedIntegral = null;
this.lastXMax = NaN;
this.lastSpecClicked = -1;
this.inPlotMove = false;
this.xPixelMovedTo = -1;
this.xPixelMovedTo2 = -1;
this.yValueMovedTo = 0;
this.xValueMovedTo = 0;
this.haveLeftRightArrows = false;
this.xPixelPlot1 = 0;
this.xPixelPlot0 = 0;
this.yPixelPlot0 = 0;
this.yPixelPlot1 = 0;
this.nextClickForSetPeak = null;
this.closerX = 0;
this.closerY = 0;
this.splitterX = 0;
this.splitterY = 0;
this.mapX = null;
if (!Clazz.isClassDefined ("JSV.common.GraphSet.Highlight")) {
JSV.common.GraphSet.$GraphSet$Highlight$ ();
}
this.widgetsAreSet = true;
this.lastIntDragX = 0;
this.nextClickMode = 0;
this.dialogs = null;
this.aIntegrationRatios = null;
this.jsvp = null;
this.image2D = null;
this.plotColors = null;
this.g2d = null;
this.gMain = null;
this.COLOR_GREY = -3;
this.COLOR_BLACK = -2;
this.COLOR_INTEGRAL = -1;
Clazz.instantialize (this, arguments);
}, JSV.common, "GraphSet", null, JSV.common.XYScaleConverter);
Clazz.prepareFields (c$, function () {
this.highlights =  new JU.Lst ();
this.spectra =  new JU.Lst ();
this.graphsTemp =  new JU.Lst ();
this.bsSelected =  new JU.BS ();
this.coordTemp =  new JSV.common.Coordinate ();
this.mapX =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (pd) {
this.pd = pd;
this.jsvp = pd.jsvp;
this.g2d = pd.g2d;
}, "JSV.common.PanelData");
Clazz.defineMethod (c$, "setSpectrumMovedTo", 
 function (i) {
return this.iSpectrumMovedTo = i;
}, "~N");
Clazz.defineMethod (c$, "setSpectrumClicked", 
 function (i) {
this.stackSelected = this.showAllStacked;
if (i < 0 || this.iSpectrumClicked != i) {
this.lastClickX = NaN;
this.lastPixelX = 2147483647;
}this.iSpectrumClicked = this.setSpectrumSelected (this.setSpectrumMovedTo (i));
}, "~N");
Clazz.defineMethod (c$, "setSpectrumSelected", 
 function (i) {
var isNew = (i != this.iSpectrumSelected);
this.iSpectrumSelected = i;
if (isNew) {
this.getCurrentView ();
}return this.iSpectrumSelected;
}, "~N");
Clazz.defineMethod (c$, "closeDialogsExcept", 
function (type) {
if (this.dialogs != null) for (var e, $e = this.dialogs.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var ad = e.getValue ();
if (ad.isDialog () && (type === JSV.common.Annotation.AType.NONE || ad.getAType () !== type)) (ad).setVisible (false);
}
}, "JSV.common.Annotation.AType");
Clazz.defineMethod (c$, "dispose", 
function () {
this.spectra = null;
this.viewData = null;
this.viewList = null;
this.annotations = null;
this.lastAnnotation = null;
this.pendingMeasurement = null;
this.imageView = null;
this.graphsTemp = null;
this.widgets = null;
this.disposeImage ();
if (this.dialogs != null) for (var e, $e = this.dialogs.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var ad = e.getValue ();
if (ad.isDialog ()) (ad).dispose ();
}
this.dialogs = null;
});
Clazz.defineMethod (c$, "isDrawNoSpectra", 
 function () {
return (this.iSpectrumSelected == -2147483648);
});
Clazz.defineMethod (c$, "getFixedSelectedSpectrumIndex", 
 function () {
return Math.max (this.iSpectrumSelected, 0);
});
Clazz.defineMethod (c$, "getSpectrum", 
function () {
return this.getSpectrumAt (this.getFixedSelectedSpectrumIndex ()).getCurrentSubSpectrum ();
});
Clazz.defineMethod (c$, "getSpectrumAt", 
function (index) {
return this.spectra.get (index);
}, "~N");
Clazz.defineMethod (c$, "getSpectrumIndex", 
function (spec) {
for (var i = this.spectra.size (); --i >= 0; ) if (this.spectra.get (i) === spec) return i;

return -1;
}, "JSV.common.Spectrum");
Clazz.defineMethod (c$, "addSpec", 
 function (spec) {
this.spectra.addLast (spec);
this.nSpectra++;
}, "JSV.common.Spectrum");
Clazz.defineMethod (c$, "splitStack", 
function (doSplit) {
if (doSplit && this.isSplittable) {
this.nSplit = this.nSpectra;
this.showAllStacked = false;
this.setSpectrumClicked (this.iSpectrumSelected);
this.pd.currentSplitPoint = this.iSpectrumSelected;
} else {
this.nSplit = 1;
this.showAllStacked = this.allowStacking && !doSplit;
this.setSpectrumClicked (this.iSpectrumSelected);
}this.stackSelected = false;
JSV.common.GraphSet.setFractionalPositions (this.pd, this.pd.graphSets, JSV.common.PanelData.LinkMode.NONE);
this.pd.setTaintedAll ();
}, "~B");
Clazz.defineMethod (c$, "setPositionForFrame", 
 function (iSplit) {
if (iSplit < 0) iSplit = 0;
var marginalHeight = this.height - 50;
this.xPixel00 = Clazz.doubleToInt (this.width * this.fX0);
this.xPixel11 = Clazz.doubleToInt (this.xPixel00 + this.width * this.fracX - 1);
this.xHArrows = this.xPixel00 + 25;
this.xVArrows = this.xPixel11 - Clazz.doubleToInt (this.right / 2);
this.xPixel0 = this.xPixel00 + Clazz.doubleToInt (this.left * (1 - this.fX0));
this.xPixel10 = this.xPixel1 = this.xPixel11 - this.right;
this.xPixels0 = this.xPixels = this.xPixel1 - this.xPixel0 + 1;
this.yPixel000 = (this.fY0 == 0 ? 25 : 0) + Clazz.doubleToInt (this.height * this.fY0);
this.yPixel00 = this.yPixel000 + Clazz.doubleToInt (marginalHeight * this.fracY * iSplit);
this.yPixel11 = this.yPixel00 + Clazz.doubleToInt (marginalHeight * this.fracY) - 1;
this.yHArrows = this.yPixel11 - 12;
this.yPixel0 = this.yPixel00 + Clazz.doubleToInt (this.top / 2);
this.yPixel1 = this.yPixel11 - Clazz.doubleToInt (this.bottom / 2);
this.yPixels = this.yPixel1 - this.yPixel0 + 1;
if (this.imageView != null && this.is2DSpectrum) {
this.setImageWindow ();
if (this.pd.display1D) {
var widthRatio = (this.pd.display1D ? 1.0 * (this.xPixels0 - this.imageView.xPixels) / this.xPixels0 : 1);
this.xPixels = Clazz.doubleToInt (Math.floor (widthRatio * this.xPixels0 * 0.8));
this.xPixel1 = this.xPixel0 + this.xPixels - 1;
} else {
this.xPixels = 0;
this.xPixel1 = this.imageView.xPixel0 - 30;
}}}, "~N");
Clazz.defineMethod (c$, "hasPoint", 
 function (xPixel, yPixel) {
return (xPixel >= this.xPixel00 && xPixel <= this.xPixel11 && yPixel >= this.yPixel000 && yPixel <= this.yPixel11 * this.nSplit);
}, "~N,~N");
Clazz.defineMethod (c$, "isInPlotRegion", 
 function (xPixel, yPixel) {
return (xPixel >= this.xPixel0 && xPixel <= this.xPixel1 && yPixel >= this.yPixel0 && yPixel <= this.yPixel1);
}, "~N,~N");
Clazz.defineMethod (c$, "getSplitPoint", 
function (yPixel) {
return Math.max (0, Math.min ((Clazz.doubleToInt ((yPixel - this.yPixel000) / (this.yPixel11 - this.yPixel00))), this.nSplit - 1));
}, "~N");
Clazz.defineMethod (c$, "isSplitWidget", 
 function (xPixel, yPixel) {
return this.isFrameBox (xPixel, yPixel, this.splitterX, this.splitterY);
}, "~N,~N");
Clazz.defineMethod (c$, "isCloserWidget", 
 function (xPixel, yPixel) {
return this.isFrameBox (xPixel, yPixel, this.closerX, this.closerY);
}, "~N,~N");
Clazz.defineMethod (c$, "initGraphSet", 
 function (startIndex, endIndex) {
if (JSV.common.GraphSet.veryLightGrey == null) JSV.common.GraphSet.veryLightGrey = this.g2d.getColor3 (200, 200, 200);
this.setPlotColors (JSV.common.ColorParameters.defaultPlotColors);
this.xAxisLeftToRight = this.getSpectrumAt (0).shouldDisplayXAxisIncreasing ();
this.setDrawXAxis ();
var startIndices =  Clazz.newIntArray (this.nSpectra, 0);
var endIndices =  Clazz.newIntArray (this.nSpectra, 0);
this.bsSelected.setBits (0, this.nSpectra);
this.allowStackedYScale = true;
if (endIndex <= 0) endIndex = 2147483647;
this.isSplittable = (this.nSpectra > 1);
this.allowStacking = (this.spectra.get (0).isStackable ());
this.showAllStacked = this.allowStacking && (this.nSpectra > 1);
for (var i = 0; i < this.nSpectra; i++) {
var iLast = this.spectra.get (i).getXYCoords ().length - 1;
startIndices[i] = JSV.common.Coordinate.intoRange (startIndex, 0, iLast);
endIndices[i] = JSV.common.Coordinate.intoRange (endIndex, 0, iLast);
this.allowStackedYScale = new Boolean (this.allowStackedYScale & (this.spectra.get (i).getYUnits ().equals (this.spectra.get (0).getYUnits ()) && this.spectra.get (i).getUserYFactor () == this.spectra.get (0).getUserYFactor ())).valueOf ();
}
this.getView (0, 0, 0, 0, startIndices, endIndices, null, null);
this.viewList =  new JU.Lst ();
this.viewList.addLast (this.viewData);
}, "~N,~N");
Clazz.defineMethod (c$, "getView", 
 function (x1, x2, y1, y2, startIndices, endIndices, viewScales, yScales) {
var graphs = (this.graphsTemp.size () == 0 ? this.spectra : this.graphsTemp);
var subspecs = this.getSpectrumAt (0).getSubSpectra ();
var dontUseSubspecs = (subspecs == null || subspecs.size () == 2 && subspecs.get (1).isImaginary ());
var is2D = !this.getSpectrumAt (0).is1D ();
var useFirstSubSpecOnly = false;
if (is2D && useFirstSubSpecOnly || dontUseSubspecs && y1 == y2) {
graphs = this.spectra;
} else if (y1 == y2) {
this.viewData =  new JSV.common.ViewData (subspecs, y1, y2, this.getSpectrum ().isContinuous ());
graphs = null;
}if (graphs != null) {
this.viewData =  new JSV.common.ViewData (graphs, y1, y2, startIndices, endIndices, this.getSpectrumAt (0).isContinuous (), is2D);
if (x1 != x2) this.getScale ().setXRange (x1, x2);
}if (viewScales != null) {
JSV.common.ScaleData.copyScaleFactors (viewScales, this.viewData.getScaleData ());
if (yScales != null) JSV.common.ScaleData.copyYScales (yScales, this.viewData.getScaleData ());
this.getCurrentView ();
}}, "~N,~N,~N,~N,~A,~A,~A,~A");
Clazz.defineMethod (c$, "isNearby", 
 function (a1, a2, c, range) {
var x = a1.getXVal ();
var xp1 = c.toPixelX (x);
var yp1 = this.toPixelY (a1.getYVal ());
x = a2.getXVal ();
var xp2 = c.toPixelX (x);
var yp2 = this.toPixelY (a2.getYVal ());
return (Math.abs (xp1 - xp2) + Math.abs (yp1 - yp2) < range);
}, "JSV.common.Coordinate,JSV.common.Coordinate,JSV.common.XYScaleConverter,~N");
Clazz.defineMethod (c$, "setReversePlot", 
function (val) {
this.reversePlot = val;
if (this.reversePlot) this.closeDialogsExcept (JSV.common.Annotation.AType.NONE);
this.setDrawXAxis ();
}, "~B");
Clazz.defineMethod (c$, "setDrawXAxis", 
 function () {
this.drawXAxisLeftToRight =  new Boolean (this.xAxisLeftToRight ^ this.reversePlot).valueOf ();
for (var i = 0; i < this.spectra.size (); i++) (this.spectra.get (i)).setExportXAxisDirection (this.drawXAxisLeftToRight);

});
Clazz.defineMethod (c$, "isInTopBar", 
 function (xPixel, yPixel) {
return (xPixel == this.fixX (xPixel) && yPixel > this.pin1Dx0.yPixel0 - 2 && yPixel < this.pin1Dx0.yPixel1);
}, "~N,~N");
Clazz.defineMethod (c$, "isInTopBar2D", 
 function (xPixel, yPixel) {
return (this.imageView != null && xPixel == this.imageView.fixX (xPixel) && yPixel > this.pin2Dx0.yPixel0 - 2 && yPixel < this.pin2Dx0.yPixel1);
}, "~N,~N");
Clazz.defineMethod (c$, "isInRightBar", 
 function (xPixel, yPixel) {
return (yPixel == this.fixY (yPixel) && xPixel > this.pin1Dy0.xPixel1 && xPixel < this.pin1Dy0.xPixel0 + 2);
}, "~N,~N");
Clazz.defineMethod (c$, "isInRightBar2D", 
 function (xPixel, yPixel) {
return (this.imageView != null && yPixel == this.fixY (yPixel) && xPixel > this.pin2Dy0.xPixel1 && xPixel < this.pin2Dy0.xPixel0 + 2);
}, "~N,~N");
Clazz.defineMethod (c$, "toX0", 
 function (xPixel) {
return this.viewList.get (0).getScale ().toX0 (this.fixX (xPixel), this.xPixel0, this.xPixel1, this.drawXAxisLeftToRight);
}, "~N");
Clazz.defineMethod (c$, "toY0", 
 function (yPixel) {
return this.viewList.get (0).getScale ().toY0 (this.fixY (yPixel), this.yPixel0, this.yPixel1);
}, "~N");
Clazz.overrideMethod (c$, "toX", 
function (xPixel) {
if (this.imageView != null && this.imageView.isXWithinRange (xPixel)) return this.imageView.toX (xPixel);
return this.getScale ().toX (this.fixX (xPixel), this.xPixel1, this.drawXAxisLeftToRight);
}, "~N");
Clazz.overrideMethod (c$, "toY", 
function (yPixel) {
return this.getScale ().toY (yPixel, this.yPixel0);
}, "~N");
Clazz.defineMethod (c$, "toPixelX", 
function (dx) {
return this.getScale ().toPixelX (dx, this.xPixel0, this.xPixel1, this.drawXAxisLeftToRight);
}, "~N");
Clazz.defineMethod (c$, "toPixelY", 
function (yVal) {
return this.getScale ().toPixelY (yVal, this.yPixel1);
}, "~N");
Clazz.defineMethod (c$, "toPixelX0", 
 function (x) {
return this.viewList.get (0).getScale ().toPixelX0 (x, this.xPixel0, this.xPixel1, this.drawXAxisLeftToRight);
}, "~N");
Clazz.defineMethod (c$, "toPixelY0", 
 function (y) {
return this.fixY (this.viewList.get (0).getScale ().toPixelY0 (y, this.yPixel0, this.yPixel1));
}, "~N");
Clazz.defineMethod (c$, "fixX", 
function (xPixel) {
return JSV.common.Coordinate.intoRange (xPixel, this.xPixel0, this.xPixel1);
}, "~N");
Clazz.defineMethod (c$, "fixY", 
function (yPixel) {
return JSV.common.Coordinate.intoRange (yPixel, this.yPixel0, this.yPixel1);
}, "~N");
Clazz.defineMethod (c$, "getXPixel0", 
function () {
return this.xPixel0;
});
Clazz.defineMethod (c$, "getXPixels", 
function () {
return this.xPixels;
});
Clazz.overrideMethod (c$, "getYPixels", 
function () {
return this.yPixels;
});
Clazz.defineMethod (c$, "getScale", 
function () {
return this.viewData.getScale ();
});
Clazz.defineMethod (c$, "toPixelYint", 
 function (yVal) {
return this.yPixel1 - Clazz.doubleToInt (Double.isNaN (yVal) ? -2147483648 : this.yPixels * yVal);
}, "~N");
Clazz.defineMethod (c$, "findAnnotation2D", 
 function (xy) {
for (var i = this.annotations.size (); --i >= 0; ) {
var a = this.annotations.get (i);
if (this.isNearby (a, xy, this.imageView, 10)) return a;
}
return null;
}, "JSV.common.Coordinate");
Clazz.defineMethod (c$, "addAnnotation", 
 function (annotation, isToggle) {
if (this.annotations == null) this.annotations =  new JU.Lst ();
var removed = false;
for (var i = this.annotations.size (); --i >= 0; ) if (annotation.is2D ? this.isNearby (this.annotations.get (i), annotation, this.imageView, 10) : annotation.equals (this.annotations.get (i))) {
removed = true;
this.annotations.removeItemAt (i);
}
if (annotation.text.length > 0 && (!removed || !isToggle)) this.annotations.addLast (annotation);
}, "JSV.common.Annotation,~B");
Clazz.defineMethod (c$, "setImageWindow", 
 function () {
this.imageView.setPixelWidthHeight (Clazz.doubleToInt ((this.pd.display1D ? 0.6 : 1) * this.xPixels0), this.yPixels);
this.imageView.setXY0 (this.getSpectrumAt (0), Clazz.doubleToInt (Math.floor (this.xPixel10 - this.imageView.xPixels)), this.yPixel0);
});
Clazz.defineMethod (c$, "findNearestMaxMin", 
 function () {
if (this.nSpectra > 1 && this.iSpectrumClicked < 0) return false;
this.xValueMovedTo = this.getSpectrum ().findXForPeakNearest (this.xValueMovedTo);
this.setXPixelMovedTo (this.xValueMovedTo, 1.7976931348623157E308, 0, 0);
return !Double.isNaN (this.xValueMovedTo);
});
Clazz.defineMethod (c$, "setXPixelMovedTo", 
function (x1, x2, xPixel1, xPixel2) {
if (x1 == 1.7976931348623157E308 && x2 == 1.7976931348623157E308) {
this.xPixelMovedTo = xPixel1;
this.xPixelMovedTo2 = xPixel2;
if (this.isLinked && this.sticky2Dcursor) {
this.pd.setlinkedXMove (this, this.toX (this.xPixelMovedTo), false);
}return;
}if (x1 != 1.7976931348623157E308) {
this.xPixelMovedTo = this.toPixelX (x1);
if (this.fixX (this.xPixelMovedTo) != this.xPixelMovedTo) this.xPixelMovedTo = -1;
this.xPixelMovedTo2 = -1;
if (x1 != 1e10) this.setSpectrumClicked (this.getFixedSelectedSpectrumIndex ());
}if (x2 != 1.7976931348623157E308) {
this.xPixelMovedTo2 = this.toPixelX (x2);
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "processPendingMeasurement", 
 function (xPixel, yPixel, clickCount) {
if (!this.isInPlotRegion (xPixel, yPixel) || this.is2dClick (xPixel, yPixel)) {
this.pendingMeasurement = null;
return;
}var x = this.toX (xPixel);
var y = this.toY (yPixel);
var x0 = x;
var m;
switch (clickCount) {
case 0:
this.pendingMeasurement.setPt2 (this.toX (xPixel), this.toY (yPixel));
break;
case 3:
case 2:
if (this.iSpectrumClicked < 0) return;
var spec = this.spectra.get (this.iSpectrumClicked);
this.setScale (this.iSpectrumClicked);
if (clickCount == 3) {
} else {
m = this.findMeasurement (this.selectedSpectrumMeasurements, xPixel, yPixel, 1);
if (m != null) {
x = m.getXVal ();
y = m.getYVal ();
} else if ((m = this.findMeasurement (this.selectedSpectrumMeasurements, xPixel, yPixel, 2)) != null) {
x = m.getXVal2 ();
y = m.getYVal2 ();
} else {
x = this.getNearestPeak (spec, x, y);
}}this.pendingMeasurement =  new JSV.common.Measurement ().setM1 (x, y, spec);
this.pendingMeasurement.setPt2 (x0, y);
this.pd.setTaintedAll ();
this.pd.repaint ();
break;
case 1:
case -2:
case -3:
var isOK = (this.pendingMeasurement != null && this.isVisible (this.getDialog (JSV.common.Annotation.AType.Measurements, -1)));
while (isOK) {
this.setScale (this.getSpectrumIndex (this.pendingMeasurement.spec));
if (clickCount != 3) {
if (!this.findNearestMaxMin ()) {
isOK = false;
break;
}xPixel = this.xPixelMovedTo;
}x = this.toX (xPixel);
y = this.toY (yPixel);
this.pendingMeasurement.setPt2 (x, y);
if (this.pendingMeasurement.text.length == 0) {
isOK = false;
break;
}this.setMeasurement (this.pendingMeasurement);
if (clickCount != 1) {
isOK = false;
break;
}this.setSpectrumClicked (this.getSpectrumIndex (this.pendingMeasurement.spec));
this.pendingMeasurement =  new JSV.common.Measurement ().setM1 (x, y, this.pendingMeasurement.spec);
break;
}
if (!isOK) this.pendingMeasurement = null;
this.pd.setTaintedAll ();
this.pd.repaint ();
break;
case 5:
if (this.findNearestMaxMin ()) {
var iSpec = this.getFixedSelectedSpectrumIndex ();
if (Double.isNaN (this.lastXMax) || this.lastSpecClicked != iSpec || this.pendingMeasurement == null) {
this.lastXMax = this.xValueMovedTo;
this.lastSpecClicked = iSpec;
this.pendingMeasurement =  new JSV.common.Measurement ().setM1 (this.xValueMovedTo, this.yValueMovedTo, this.spectra.get (iSpec));
} else {
this.pendingMeasurement.setPt2 (this.xValueMovedTo, this.yValueMovedTo);
if (this.pendingMeasurement.text.length > 0) this.setMeasurement (this.pendingMeasurement);
this.pendingMeasurement = null;
this.lastXMax = NaN;
}} else {
this.lastXMax = NaN;
}break;
}
}, "~N,~N,~N");
Clazz.defineMethod (c$, "checkIntegralNormalizationClick", 
 function (xPixel, yPixel) {
if (this.selectedSpectrumIntegrals == null) return false;
var integral = this.findMeasurement (this.selectedSpectrumIntegrals, xPixel, yPixel, -5);
if (integral == null) return false;
this.selectedIntegral = integral;
this.pd.normalizeIntegral ();
this.updateDialog (JSV.common.Annotation.AType.Integration, -1);
this.setSpectrumClicked (this.getSpectrumIndex (integral.spec));
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "getNearestPeak", 
 function (spec, x, y) {
var x0 = JSV.common.Coordinate.getNearestXWithYAbove (spec.getXYCoords (), x, y, spec.isInverted (), false);
var x1 = JSV.common.Coordinate.getNearestXWithYAbove (spec.getXYCoords (), x, y, spec.isInverted (), true);
return (Double.isNaN (x0) ? x1 : Double.isNaN (x1) ? x0 : Math.abs (x0 - x) < Math.abs (x1 - x) ? x0 : x1);
}, "JSV.common.Spectrum,~N,~N");
Clazz.defineMethod (c$, "findMeasurement", 
 function (measurements, xPixel, yPixel, iPt) {
if (measurements == null || measurements.size () == 0) return null;
if (iPt == 0) {
var m = this.findMeasurement (measurements, xPixel, yPixel, -1);
if (m != null || Clazz.instanceOf (measurements.get (0), JSV.common.Integral)) return m;
return this.findMeasurement (measurements, xPixel, yPixel, -2);
}for (var i = measurements.size (); --i >= 0; ) {
var m = measurements.get (i);
var x1;
var x2;
var y1;
var y2;
if (Clazz.instanceOf (m, JSV.common.Integral)) {
x1 = x2 = this.toPixelX (m.getXVal2 ());
y1 = this.toPixelYint (m.getYVal ());
y2 = this.toPixelYint (m.getYVal2 ());
} else {
x1 = this.toPixelX (m.getXVal ());
x2 = this.toPixelX (m.getXVal2 ());
y1 = y2 = (iPt == -2 ? this.yPixel1 - 2 : this.toPixelY (m.getYVal ()));
}switch (iPt) {
case 1:
if (Math.abs (xPixel - x1) + Math.abs (yPixel - y1) < 4) return m;
break;
case 2:
if (Math.abs (xPixel - x2) + Math.abs (yPixel - y2) < 4) return m;
break;
case -5:
y1 = y2 = Clazz.doubleToInt ((y1 + y2) / 2);
x2 = x1 + 20;
default:
case -1:
case -2:
if (JSV.common.GraphSet.isOnLine (xPixel, yPixel, x1, y1, x2, y2)) return m;
break;
}
}
return null;
}, "JSV.common.MeasurementData,~N,~N,~N");
Clazz.defineMethod (c$, "setMeasurement", 
 function (m) {
var iSpec = this.getSpectrumIndex (m.spec);
var ad = this.getDialog (JSV.common.Annotation.AType.Measurements, iSpec);
if (ad == null) this.addDialog (iSpec, JSV.common.Annotation.AType.Measurements, ad =  new JSV.common.MeasurementData (JSV.common.Annotation.AType.Measurements, m.spec));
ad.getData ().addLast (m.copyM ());
this.updateDialog (JSV.common.Annotation.AType.Measurements, -1);
}, "JSV.common.Measurement");
Clazz.defineMethod (c$, "checkArrowUpDownClick", 
 function (xPixel, yPixel) {
var ok = false;
var f = (this.isArrowClick (xPixel, yPixel, 3) ? JSV.common.GraphSet.RT2 : this.isArrowClick (xPixel, yPixel, 4) ? 1 / JSV.common.GraphSet.RT2 : 0);
if (f != 0) {
if (this.nSplit > 1) this.setSpectrumSelected (this.iSpectrumMovedTo);
if ((this.nSpectra == 1 || this.iSpectrumSelected >= 0) && this.spectra.get (this.getFixedSelectedSpectrumIndex ()).isTransmittance ()) f = 1 / f;
this.viewData.scaleSpectrum (this.imageView == null ? this.iSpectrumSelected : -2, f);
ok = true;
} else if (this.isArrowClick (xPixel, yPixel, -1)) {
this.resetViewCompletely ();
ok = true;
}if (ok) {
if (this.imageView != null) {
this.update2dImage (false);
this.resetPinsFromView ();
}this.pd.setTaintedAll ();
}return ok;
}, "~N,~N");
Clazz.defineMethod (c$, "resetViewCompletely", 
function () {
this.clearViews ();
if (this.showAllStacked && !this.stackSelected) this.closeDialogsExcept (JSV.common.Annotation.AType.NONE);
this.viewData.resetScaleFactors ();
this.updateDialogs ();
});
Clazz.defineMethod (c$, "checkArrowLeftRightClick", 
 function (xPixel, yPixel) {
if (this.haveLeftRightArrows) {
var dx = (this.isArrowClick (xPixel, yPixel, 1) ? -1 : this.isArrowClick (xPixel, yPixel, 2) ? 1 : 0);
if (dx != 0) {
var i = this.iSpectrumSelected + dx;
if (i < 0) i = this.nSpectra - 1;
this.setSpectrumClicked (i % this.nSpectra);
return true;
}if (this.isArrowClick (xPixel, yPixel, 0)) {
if (this.showAllStacked) {
this.showAllStacked = false;
this.setSpectrumClicked (this.getFixedSelectedSpectrumIndex ());
return true;
}this.showAllStacked = this.allowStacking;
this.setSpectrumSelected (-1);
this.stackSelected = false;
}}return false;
}, "~N,~N");
Clazz.defineMethod (c$, "isArrowClick", 
 function (xPixel, yPixel, type) {
var pt;
switch (type) {
case 3:
case 4:
case -1:
pt = Clazz.doubleToInt ((this.yPixel00 + this.yPixel11) / 2) + (type == 3 ? -1 : type == 4 ? 1 : 0) * 15;
return (Math.abs (this.xVArrows - xPixel) < 10 && Math.abs (pt - yPixel) < 10);
case 1:
case 2:
case 0:
pt = this.xHArrows + (type == 1 ? -1 : type == 2 ? 1 : 0) * 15;
return (Math.abs (pt - xPixel) < 10 && Math.abs (this.yHArrows - yPixel) < 10);
}
return false;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setWidgetValueByUser", 
 function (pw) {
var sval;
if (pw === this.cur2Dy) sval = "" + this.imageView.toSubspectrumIndex (pw.yPixel0);
 else if (pw === this.pin1Dx01) sval = "" + Math.min (this.pin1Dx0.getXVal (), this.pin1Dx1.getXVal ()) + " - " + Math.max (this.pin1Dx0.getXVal (), this.pin1Dx1.getXVal ());
 else if (pw === this.pin1Dy01) sval = "" + Math.min (this.pin1Dy0.getYVal (), this.pin1Dy1.getYVal ()) + " - " + Math.max (this.pin1Dy0.getYVal (), this.pin1Dy1.getYVal ());
 else if (pw === this.pin2Dx01) sval = "" + Math.min (this.pin2Dx0.getXVal (), this.pin2Dx1.getXVal ()) + " - " + Math.max (this.pin2Dx0.getXVal (), this.pin2Dx1.getXVal ());
 else if (pw === this.pin2Dy01) sval = "" + Clazz.doubleToInt (Math.min (this.pin2Dy0.getYVal (), this.pin2Dy1.getYVal ())) + " - " + Clazz.doubleToInt (Math.max (this.pin2Dy0.getYVal (), this.pin2Dy1.getYVal ()));
 else sval = "" + pw.getValue ();
sval = this.pd.getInput ("New value?", "Set Slider", sval);
if (sval == null) return;
sval = sval.trim ();
try {
if (pw === this.pin1Dx01 || pw === this.pin1Dy01 || pw === this.pin2Dx01 || pw === this.pin2Dy01) {
var pt = sval.indexOf ("-", 1);
if (pt < 0) return;
var val1 = Double.$valueOf (sval.substring (0, pt)).doubleValue ();
var val2 = Double.$valueOf (sval.substring (pt + 1)).doubleValue ();
if (pw === this.pin1Dx01) {
this.doZoom (val1, this.pin1Dy0.getYVal (), val2, this.pin1Dy1.getYVal (), true, false, false, true, true);
} else if (pw === this.pin1Dy01) {
this.doZoom (this.pin1Dx0.getXVal (), val1, this.pin1Dx1.getXVal (), val2, this.imageView == null, this.imageView == null, false, false, true);
} else if (pw === this.pin2Dx01) {
this.imageView.setView0 (this.imageView.toPixelX0 (val1), this.pin2Dy0.yPixel0, this.imageView.toPixelX0 (val2), this.pin2Dy1.yPixel0);
this.doZoom (val1, this.pin1Dy0.getYVal (), val2, this.pin1Dy1.getYVal (), false, false, false, true, true);
} else if (pw === this.pin2Dy01) {
this.imageView.setView0 (this.pin2Dx0.xPixel0, this.imageView.toPixelY0 (val1), this.pin2Dx1.xPixel0, this.imageView.toPixelY0 (val2));
this.doZoom (this.imageView.toX (this.imageView.xPixel0), this.getScale ().minY, this.imageView.toX (this.imageView.xPixel0 + this.imageView.xPixels - 1), this.getScale ().maxY, false, false, false, false, true);
}} else {
var val = Double.$valueOf (sval).doubleValue ();
if (pw.isXtype) {
var val2 = (pw === this.pin1Dx0 || pw === this.cur2Dx0 || pw === this.pin2Dx0 ? this.pin1Dx1.getXVal () : this.pin1Dx0.getXVal ());
this.doZoom (val, 0, val2, 0, !pw.is2D, false, false, true, true);
} else if (pw === this.cur2Dy) {
this.setCurrentSubSpectrum (Clazz.doubleToInt (val));
} else if (pw === this.pin2Dy0 || pw === this.pin2Dy1) {
var val2 = (pw === this.pin2Dy0 ? this.pin2Dy1.yPixel0 : this.pin2Dy0.yPixel0);
this.imageView.setView0 (this.pin2Dx0.xPixel0, this.imageView.subIndexToPixelY (Clazz.doubleToInt (val)), this.pin2Dx1.xPixel0, val2);
} else {
var val2 = (pw === this.pin1Dy0 ? this.pin1Dy1.getYVal () : this.pin1Dy0.getYVal ());
this.doZoom (this.pin1Dx0.getXVal (), val, this.pin1Dx1.getXVal (), val2, this.imageView == null, this.imageView == null, false, false, true);
}}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "JSV.common.PlotWidget");
Clazz.defineMethod (c$, "removeAllHighlights", 
 function (spec) {
if (spec == null) this.highlights.clear ();
 else for (var i = this.highlights.size (); --i >= 0; ) if (this.highlights.get (i).spectrum === spec) this.highlights.removeItemAt (i);

}, "JSV.common.Spectrum");
Clazz.defineMethod (c$, "setCoordClicked", 
 function (xPixel, x, y) {
if (y == 0) this.nextClickForSetPeak = null;
if (Double.isNaN (x)) {
this.pd.coordClicked = null;
this.pd.coordsClicked = null;
return null;
}this.pd.coordClicked =  new JSV.common.Coordinate ().set (this.lastClickX = x, y);
this.pd.coordsClicked = this.getSpectrum ().getXYCoords ();
this.pd.xPixelClicked = (this.lastPixelX = xPixel);
return this.pd.coordClicked;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setWidgets", 
 function (needNewPins, subIndex, doDraw1DObjects) {
if (needNewPins || this.pin1Dx0 == null) {
if (this.zoomBox1D == null) this.newPins ();
 else this.resetPinPositions ();
}this.setDerivedPins (subIndex);
this.setPinSliderPositions (doDraw1DObjects);
}, "~B,~N,~B");
Clazz.defineMethod (c$, "newPins", 
 function () {
this.zoomBox1D =  new JSV.common.PlotWidget ("zoomBox1D");
this.pin1Dx0 =  new JSV.common.PlotWidget ("pin1Dx0");
this.pin1Dx1 =  new JSV.common.PlotWidget ("pin1Dx1");
this.pin1Dy0 =  new JSV.common.PlotWidget ("pin1Dy0");
this.pin1Dy1 =  new JSV.common.PlotWidget ("pin1Dy1");
this.pin1Dx01 =  new JSV.common.PlotWidget ("pin1Dx01");
this.pin1Dy01 =  new JSV.common.PlotWidget ("pin1Dy01");
this.cur1D2x1 =  new JSV.common.PlotWidget ("cur1D2x1");
this.cur1D2x1.color = JSV.common.ScriptToken.PEAKTABCOLOR;
this.cur1D2x2 =  new JSV.common.PlotWidget ("cur1D2x2");
this.cur1D2x2.color = JSV.common.ScriptToken.PEAKTABCOLOR;
if (this.imageView != null) {
this.zoomBox2D =  new JSV.common.PlotWidget ("zoomBox2D");
this.pin2Dx0 =  new JSV.common.PlotWidget ("pin2Dx0");
this.pin2Dx1 =  new JSV.common.PlotWidget ("pin2Dx1");
this.pin2Dy0 =  new JSV.common.PlotWidget ("pin2Dy0");
this.pin2Dy1 =  new JSV.common.PlotWidget ("pin2Dy1");
this.pin2Dx01 =  new JSV.common.PlotWidget ("pin2Dx01");
this.pin2Dy01 =  new JSV.common.PlotWidget ("pin2Dy01");
this.cur2Dx0 =  new JSV.common.PlotWidget ("cur2Dx0");
this.cur2Dx1 =  new JSV.common.PlotWidget ("cur2Dx1");
this.cur2Dy =  new JSV.common.PlotWidget ("cur2Dy");
this.pin2Dy0.setY (0, this.imageView.toPixelY0 (0));
var n = this.getSpectrumAt (0).getSubSpectra ().size ();
this.pin2Dy1.setY (n, this.imageView.toPixelY0 (n));
}this.setWidgetX (this.pin1Dx0, this.getScale ().minX);
this.setWidgetX (this.pin1Dx1, this.getScale ().maxX);
this.setWidgetY (this.pin1Dy0, this.getScale ().minY);
this.setWidgetY (this.pin1Dy1, this.getScale ().maxY);
this.widgets =  Clazz.newArray (-1, [this.zoomBox1D, this.zoomBox2D, this.pin1Dx0, this.pin1Dx01, this.pin1Dx1, this.pin1Dy0, this.pin1Dy01, this.pin1Dy1, this.pin2Dx0, this.pin2Dx01, this.pin2Dx1, this.pin2Dy0, this.pin2Dy01, this.pin2Dy1, this.cur2Dx0, this.cur2Dx1, this.cur2Dy, this.cur1D2x1, this.cur1D2x2]);
});
Clazz.defineMethod (c$, "setWidgetX", 
 function (pw, x) {
pw.setX (x, this.toPixelX0 (x));
}, "JSV.common.PlotWidget,~N");
Clazz.defineMethod (c$, "setWidgetY", 
 function (pw, y) {
pw.setY (y, this.toPixelY0 (y));
}, "JSV.common.PlotWidget,~N");
Clazz.defineMethod (c$, "resetPinsFromView", 
 function () {
if (this.pin1Dx0 == null) return;
this.setWidgetX (this.pin1Dx0, this.getScale ().minXOnScale);
this.setWidgetX (this.pin1Dx1, this.getScale ().maxXOnScale);
this.setWidgetY (this.pin1Dy0, this.getScale ().minYOnScale);
this.setWidgetY (this.pin1Dy1, this.getScale ().maxYOnScale);
});
Clazz.defineMethod (c$, "resetPinPositions", 
 function () {
this.resetX (this.pin1Dx0);
this.resetY (this.pin1Dy0);
this.resetY (this.pin1Dy1);
if (this.imageView == null) {
if (this.gs2dLinkedX != null) this.resetX (this.cur1D2x1);
if (this.gs2dLinkedY != null) this.resetX (this.cur1D2x2);
} else {
this.pin2Dy0.setY (this.pin2Dy0.getYVal (), this.imageView.toPixelY0 (this.pin2Dy0.getYVal ()));
this.pin2Dy1.setY (this.pin2Dy1.getYVal (), this.imageView.toPixelY0 (this.pin2Dy1.getYVal ()));
}});
Clazz.defineMethod (c$, "resetX", 
 function (p) {
this.setWidgetX (p, p.getXVal ());
}, "JSV.common.PlotWidget");
Clazz.defineMethod (c$, "resetY", 
 function (p) {
this.setWidgetY (p, p.getYVal ());
}, "JSV.common.PlotWidget");
Clazz.defineMethod (c$, "setPinSliderPositions", 
 function (doDraw1DObjects) {
this.pin1Dx0.yPixel0 = this.pin1Dx1.yPixel0 = this.pin1Dx01.yPixel0 = this.yPixel0 - 5;
this.pin1Dx0.yPixel1 = this.pin1Dx1.yPixel1 = this.pin1Dx01.yPixel1 = this.yPixel0;
this.cur1D2x1.yPixel1 = this.cur1D2x2.yPixel1 = this.yPixel0 - 5;
this.cur1D2x1.yPixel0 = this.cur1D2x2.yPixel0 = this.yPixel1 + 6;
if (this.imageView == null) {
this.pin1Dy0.xPixel0 = this.pin1Dy1.xPixel0 = this.pin1Dy01.xPixel0 = this.xPixel1 + 5;
this.pin1Dy0.xPixel1 = this.pin1Dy1.xPixel1 = this.pin1Dy01.xPixel1 = this.xPixel1;
} else {
this.pin1Dy0.xPixel0 = this.pin1Dy1.xPixel0 = this.pin1Dy01.xPixel0 = this.imageView.xPixel1 + 15;
this.pin1Dy0.xPixel1 = this.pin1Dy1.xPixel1 = this.pin1Dy01.xPixel1 = this.imageView.xPixel1 + 10;
this.pin2Dx0.yPixel0 = this.pin2Dx1.yPixel0 = this.pin2Dx01.yPixel0 = this.yPixel0 - 5;
this.pin2Dx0.yPixel1 = this.pin2Dx1.yPixel1 = this.pin2Dx01.yPixel1 = this.yPixel0;
this.pin2Dy0.xPixel0 = this.pin2Dy1.xPixel0 = this.pin2Dy01.xPixel0 = this.imageView.xPixel1 + 5;
this.pin2Dy0.xPixel1 = this.pin2Dy1.xPixel1 = this.pin2Dy01.xPixel1 = this.imageView.xPixel1;
this.cur2Dx0.yPixel0 = this.cur2Dx1.yPixel0 = this.yPixel1 + 6;
this.cur2Dx0.yPixel1 = this.cur2Dx1.yPixel1 = this.yPixel0 - 5;
this.cur2Dx0.yPixel0 = this.cur2Dx1.yPixel0 = this.yPixel1 + 6;
this.cur2Dx1.yPixel1 = this.cur2Dx1.yPixel1 = this.yPixel0 - 5;
this.cur2Dy.xPixel0 = (doDraw1DObjects ? Clazz.doubleToInt ((this.xPixel1 + this.imageView.xPixel0) / 2) : this.imageView.xPixel0 - 6);
this.cur2Dy.xPixel1 = this.imageView.xPixel1 + 5;
}}, "~B");
Clazz.defineMethod (c$, "setDerivedPins", 
 function (subIndex) {
this.widgetsAreSet = true;
if (this.gs2dLinkedX != null) this.cur1D2x1.setX (this.cur1D2x1.getXVal (), this.toPixelX (this.cur1D2x1.getXVal ()));
if (this.gs2dLinkedY != null) this.cur1D2x2.setX (this.cur1D2x2.getXVal (), this.toPixelX (this.cur1D2x2.getXVal ()));
this.pin1Dx01.setX (0, Clazz.doubleToInt ((this.pin1Dx0.xPixel0 + this.pin1Dx1.xPixel0) / 2));
this.pin1Dy01.setY (0, Clazz.doubleToInt ((this.pin1Dy0.yPixel0 + this.pin1Dy1.yPixel0) / 2));
this.pin1Dx01.setEnabled (Math.min (this.pin1Dx0.xPixel0, this.pin1Dx1.xPixel0) > this.xPixel0 || Math.max (this.pin1Dx0.xPixel0, this.pin1Dx1.xPixel0) < this.xPixel1);
this.pin1Dy01.setEnabled (Math.min (this.pin1Dy0.yPixel0, this.pin1Dy1.yPixel0) > Math.min (this.toPixelY (this.getScale ().minY), this.toPixelY (this.getScale ().maxY)) || Math.max (this.pin1Dy0.yPixel0, this.pin1Dy1.yPixel0) < Math.max (this.toPixelY (this.getScale ().minY), this.toPixelY (this.getScale ().maxY)));
if (this.imageView == null) return;
var x = this.pin1Dx0.getXVal ();
this.cur2Dx0.setX (x, this.imageView.toPixelX (x));
x = this.pin1Dx1.getXVal ();
this.cur2Dx1.setX (x, this.imageView.toPixelX (x));
x = this.imageView.toX (this.imageView.xPixel0);
this.pin2Dx0.setX (x, this.imageView.toPixelX0 (x));
x = this.imageView.toX (this.imageView.xPixel1);
this.pin2Dx1.setX (x, this.imageView.toPixelX0 (x));
this.pin2Dx01.setX (0, Clazz.doubleToInt ((this.pin2Dx0.xPixel0 + this.pin2Dx1.xPixel0) / 2));
var y = this.imageView.imageHeight - 1 - this.imageView.yView1;
this.pin2Dy0.setY (y, this.imageView.toPixelY0 (y));
y = this.imageView.imageHeight - 1 - this.imageView.yView2;
this.pin2Dy1.setY (y, this.imageView.toPixelY0 (y));
this.pin2Dy01.setY (0, Clazz.doubleToInt ((this.pin2Dy0.yPixel0 + this.pin2Dy1.yPixel0) / 2));
this.cur2Dy.yPixel0 = this.cur2Dy.yPixel1 = this.imageView.subIndexToPixelY (subIndex);
this.pin2Dx01.setEnabled (Math.min (this.pin2Dx0.xPixel0, this.pin2Dx1.xPixel0) != this.imageView.xPixel0 || Math.max (this.pin2Dx0.xPixel0, this.pin2Dx1.xPixel1) != this.imageView.xPixel1);
this.pin2Dy01.setEnabled (Math.min (this.pin2Dy0.yPixel0, this.pin2Dy1.yPixel0) != this.yPixel0 || Math.max (this.pin2Dy0.yPixel0, this.pin2Dy1.yPixel1) != this.yPixel1);
}, "~N");
Clazz.defineMethod (c$, "doZoom", 
function (initX, initY, finalX, finalY, is1D, is1DY, checkRange, checkLinked, addZoom) {
if (initX == finalX) {
initX = this.getScale ().minXOnScale;
finalX = this.getScale ().maxXOnScale;
} else if (this.isLinked && checkLinked) this.pd.doZoomLinked (this, initX, finalX, addZoom, checkRange, is1D);
if (initX > finalX) {
var tempX = initX;
initX = finalX;
finalX = tempX;
}if (initY > finalY) {
var tempY = initY;
initY = finalY;
finalY = tempY;
}var is2DGrayScaleChange = (!is1D && this.imageView != null && (this.imageView.minZ != initY || this.imageView.maxZ != finalY));
if (!this.zoomEnabled && !is2DGrayScaleChange) return;
if (checkRange) {
if (!this.getScale ().isInRangeX (initX) && !this.getScale ().isInRangeX (finalX)) return;
if (!this.getScale ().isInRangeX (initX)) {
initX = this.getScale ().minX;
} else if (!this.getScale ().isInRangeX (finalX)) {
finalX = this.getScale ().maxX;
}} else {
}this.pd.setTaintedAll ();
var viewScales = this.viewData.getScaleData ();
var startIndices =  Clazz.newIntArray (this.nSpectra, 0);
var endIndices =  Clazz.newIntArray (this.nSpectra, 0);
this.graphsTemp.clear ();
var subspecs = this.getSpectrumAt (0).getSubSpectra ();
var dontUseSubspecs = (subspecs == null || subspecs.size () == 2);
var is2D = !this.getSpectrumAt (0).is1D ();
if (!is2D && !dontUseSubspecs) {
this.graphsTemp.addLast (this.getSpectrum ());
if (!JSV.common.ScaleData.setDataPointIndices (this.graphsTemp, initX, finalX, 3, startIndices, endIndices)) return;
} else {
if (!JSV.common.ScaleData.setDataPointIndices (this.spectra, initX, finalX, 3, startIndices, endIndices)) return;
}var y1 = initY;
var y2 = finalY;
var isXOnly = (y1 == y2);
if (isXOnly) {
var f = (!is2DGrayScaleChange && is1D ? f = this.getScale ().spectrumScaleFactor : 1);
if (Math.abs (f - 1) < 0.0001) {
y1 = this.getScale ().minYOnScale;
y2 = this.getScale ().maxYOnScale;
}}var yScales = null;
if (isXOnly || is1DY) {
this.getCurrentView ();
yScales = this.viewData.getNewScales (this.iSpectrumSelected, isXOnly, y1, y2);
}this.getView (initX, finalX, y1, y2, startIndices, endIndices, viewScales, yScales);
this.setXPixelMovedTo (1E10, 1.7976931348623157E308, 0, 0);
this.setWidgetX (this.pin1Dx0, initX);
this.setWidgetX (this.pin1Dx1, finalX);
this.setWidgetY (this.pin1Dy0, y1);
this.setWidgetY (this.pin1Dy1, y2);
if (this.imageView == null) {
this.updateDialogs ();
} else {
var isub = this.getSpectrumAt (0).getSubIndex ();
var ifix = this.imageView.fixSubIndex (isub);
if (ifix != isub) this.setCurrentSubSpectrum (ifix);
if (is2DGrayScaleChange) this.update2dImage (false);
}if (addZoom) this.addCurrentZoom ();
}, "~N,~N,~N,~N,~B,~B,~B,~B,~B");
Clazz.defineMethod (c$, "updateDialogs", 
 function () {
this.updateDialog (JSV.common.Annotation.AType.PeakList, -1);
this.updateDialog (JSV.common.Annotation.AType.Measurements, -1);
});
Clazz.defineMethod (c$, "setCurrentSubSpectrum", 
 function (i) {
var spec0 = this.getSpectrumAt (0);
i = spec0.setCurrentSubSpectrum (i);
if (spec0.isForcedSubset ()) this.viewData.setXRangeForSubSpectrum (this.getSpectrum ().getXYCoords ());
this.pd.notifySubSpectrumChange (i, this.getSpectrum ());
}, "~N");
Clazz.defineMethod (c$, "addCurrentZoom", 
 function () {
if (this.viewList.size () > this.currentZoomIndex + 1) for (var i = this.viewList.size () - 1; i > this.currentZoomIndex; i--) this.viewList.removeItemAt (i);

this.viewList.addLast (this.viewData);
this.currentZoomIndex++;
});
Clazz.defineMethod (c$, "setZoomTo", 
 function (i) {
this.currentZoomIndex = i;
this.viewData = this.viewList.get (i);
this.resetPinsFromView ();
}, "~N");
Clazz.defineMethod (c$, "clearViews", 
function () {
if (this.isLinked) {
this.pd.clearLinkViews (this);
}this.setZoom (0, 0, 0, 0);
for (var i = this.viewList.size (); --i >= 1; ) this.viewList.removeItemAt (i);

});
Clazz.defineMethod (c$, "drawAll", 
 function (gMain, gFront, gBack, iSplit, needNewPins, doAll, pointsOnly) {
this.g2d = this.pd.g2d;
this.gMain = gMain;
var spec0 = this.getSpectrumAt (0);
var subIndex = spec0.getSubIndex ();
this.is2DSpectrum = (!spec0.is1D () && (this.isLinked || this.pd.getBoolean (JSV.common.ScriptToken.DISPLAY2D)) && (this.imageView != null || this.get2DImage (spec0)));
if (this.imageView != null && doAll) {
if (this.pd.isPrinting && this.g2d !== this.pd.g2d0) this.g2d.newGrayScaleImage (gMain, this.image2D, this.imageView.imageWidth, this.imageView.imageHeight, this.imageView.getBuffer ());
if (this.is2DSpectrum) this.setPositionForFrame (iSplit);
this.draw2DImage ();
}var iSelected = (this.stackSelected || !this.showAllStacked ? this.iSpectrumSelected : -1);
var doYScale = (!this.showAllStacked || this.nSpectra == 1 || iSelected >= 0);
var doDraw1DObjects = (this.imageView == null || this.pd.display1D);
var n = (iSelected >= 0 ? 1 : 0);
var iSpectrumForScale = this.getFixedSelectedSpectrumIndex ();
if (doDraw1DObjects && doAll) {
this.fillBox (gMain, this.xPixel0, this.yPixel0, this.xPixel1, this.yPixel1, JSV.common.ScriptToken.PLOTAREACOLOR);
if (iSelected < 0) {
doYScale = true;
for (var i = 0; i < this.nSpectra; i++) if (this.doPlot (i, iSplit)) {
if (n++ == 0) continue;
doYScale = new Boolean (doYScale & this.viewData.areYScalesSame (i - 1, i)).valueOf ();
}
}}var iSpecForFrame = (this.nSpectra == 1 ? 0 : !this.showAllStacked ? this.iSpectrumMovedTo : this.iSpectrumSelected);
var g2 = (gBack === gMain ? gFront : gBack);
if (doAll) {
var addCurrentBox = (this.pd.getCurrentGraphSet () === this && !this.isLinked && (!this.isSplittable || (this.nSplit == 1 || this.pd.currentSplitPoint == iSplit)));
var drawUpDownArrows = (this.zoomEnabled && !this.isDrawNoSpectra () && this.pd.isCurrentGraphSet (this) && this.spectra.get (0).isScalable () && (addCurrentBox || this.nSpectra == 1) && (this.nSplit == 1 || this.pd.currentSplitPoint == this.iSpectrumMovedTo));
var addSplitBox = this.isSplittable;
this.drawFrame (gMain, iSpecForFrame, addCurrentBox, addSplitBox, drawUpDownArrows);
}if (this.pd.isCurrentGraphSet (this) && iSplit == this.pd.currentSplitPoint && (n < 2 || this.iSpectrumSelected >= 0)) this.$haveSelectedSpectrum = true;
this.haveSingleYScale = (this.showAllStacked && this.nSpectra > 1 ? this.allowStackedYScale && doYScale : true);
if (doDraw1DObjects) {
var yOffsetPixels = Clazz.floatToInt (this.yPixels * (this.yStackOffsetPercent / 100));
this.haveLeftRightArrows = false;
for (var i = 0, offset = 0; i < this.nSpectra; i++) {
if (!this.doPlot (i, iSplit)) continue;
var isGrey = (this.stackSelected && this.iSpectrumSelected >= 0 && this.iSpectrumSelected != i);
var ig = (!this.reversePlot && this.getShowAnnotation (JSV.common.Annotation.AType.Integration, i) && (!this.showAllStacked || this.iSpectrumSelected == i) ? this.getDialog (JSV.common.Annotation.AType.Integration, i).getData () : null);
this.setScale (i);
var spec = this.spectra.get (i);
if (this.nSplit > 1) {
iSpectrumForScale = i;
}var doDrawWidgets = !isGrey && (this.nSplit == 1 || this.showAllStacked || this.iSpectrumSelected == iSplit);
var doDraw1DY = (doDrawWidgets && this.$haveSelectedSpectrum && i == iSpectrumForScale);
if (doDrawWidgets) {
this.resetPinsFromView ();
this.drawWidgets (gFront, g2, subIndex, needNewPins, doDraw1DObjects, doDraw1DY, false);
}if (this.haveSingleYScale && i == iSpectrumForScale && doAll) {
this.drawGrid (gMain);
if (this.pd.isPrinting && this.nSplit > 1) this.drawSpectrumSource (gMain, i);
}if (doDrawWidgets) this.drawWidgets (gFront, g2, subIndex, false, doDraw1DObjects, doDraw1DY, true);
if (!this.isDrawNoSpectra () && (this.nSpectra == 1 || this.iSpectrumSelected >= 0) && (this.haveSingleYScale && i == iSpectrumForScale || this.showAllStacked && this.stackSelected && i == this.iSpectrumSelected)) this.drawHighlightsAndPeakTabs (gFront, g2, i);
if (doAll) {
if (n == 1 && this.iSpectrumSelected < 0 || this.iSpectrumSelected == i && this.pd.isCurrentGraphSet (this)) {
if (this.pd.titleOn && !this.pd.titleDrawn) {
this.pd.drawTitle (gMain, this.height, this.width, this.pd.getDrawTitle (this.pd.isPrinting));
this.pd.titleDrawn = true;
}}if (this.haveSingleYScale && i == iSpectrumForScale) {
if (this.pd.getBoolean (JSV.common.ScriptToken.YSCALEON)) this.drawYScale (gMain, this);
if (this.pd.getBoolean (JSV.common.ScriptToken.YUNITSON)) this.drawYUnits (gMain);
}}var isContinuous = spec.isContinuous ();
var onSpectrum = ((this.nSplit > 1 ? i == this.iSpectrumMovedTo : this.isLinked || i == iSpectrumForScale) && !this.pd.isPrinting && isContinuous);
var hasPendingIntegral = (!isGrey && this.pendingIntegral != null && spec === this.pendingIntegral.spec);
if (doAll || hasPendingIntegral) {
this.drawPlot (hasPendingIntegral && !doAll ? gFront : gMain, i, spec, isContinuous, offset, isGrey, null, onSpectrum, hasPendingIntegral, pointsOnly);
}this.drawIntegration (gFront, i, offset, isGrey, ig, isContinuous, onSpectrum);
this.drawMeasurements (gFront, i);
if (this.pendingMeasurement != null && this.pendingMeasurement.spec === spec) this.drawMeasurement (gFront, this.pendingMeasurement);
if (onSpectrum && this.xPixelMovedTo >= 0) {
this.drawSpectrumPointer (gFront, spec, offset, ig);
}if (this.nSpectra > 1 && this.nSplit == 1 && this.pd.isCurrentGraphSet (this) && doAll) {
this.haveLeftRightArrows = true;
if (!this.pd.isPrinting) {
this.setScale (0);
iSpecForFrame = (this.iSpectrumSelected);
if (this.nSpectra != 2) {
this.setPlotColor (gMain, (iSpecForFrame + this.nSpectra - 1) % this.nSpectra);
this.fillArrow (gMain, 1, this.yHArrows, this.xHArrows - 9, true);
this.setCurrentBoxColor (gMain);
this.fillArrow (gMain, 1, this.yHArrows, this.xHArrows - 9, false);
}if (iSpecForFrame >= 0) {
this.setPlotColor (gMain, iSpecForFrame);
this.fillCircle (gMain, this.xHArrows, this.yHArrows, true);
}this.setCurrentBoxColor (gMain);
this.fillCircle (gMain, this.xHArrows, this.yHArrows, false);
this.setPlotColor (gMain, (iSpecForFrame + 1) % this.nSpectra);
this.fillArrow (gMain, 2, this.yHArrows, this.xHArrows + 9, true);
this.setCurrentBoxColor (gMain);
this.fillArrow (gMain, 2, this.yHArrows, this.xHArrows + 9, false);
}}offset -= yOffsetPixels;
}
if (doAll) {
if (this.pd.getBoolean (JSV.common.ScriptToken.XSCALEON)) this.drawXScale (gMain, this);
if (this.pd.getBoolean (JSV.common.ScriptToken.XUNITSON)) this.drawXUnits (gMain);
}} else {
if (doAll) {
if (this.pd.getBoolean (JSV.common.ScriptToken.XSCALEON)) this.drawXScale (gMain, this.imageView);
if (this.pd.getBoolean (JSV.common.ScriptToken.YSCALEON)) this.drawYScale (gMain, this.imageView);
if (subIndex >= 0) this.draw2DUnits (gMain);
}this.drawWidgets (gFront, g2, subIndex, needNewPins, doDraw1DObjects, true, false);
this.drawWidgets (gFront, g2, subIndex, needNewPins, doDraw1DObjects, true, true);
}if (this.annotations != null) this.drawAnnotations (gFront, this.annotations, null);
}, "~O,~O,~O,~N,~B,~B,~B");
Clazz.defineMethod (c$, "drawSpectrumSource", 
 function (g, i) {
this.pd.printFilePath (g, this.pd.thisWidth - this.pd.right, this.yPixel0, this.spectra.get (i).getFilePath ());
}, "~O,~N");
Clazz.defineMethod (c$, "doPlot", 
 function (i, iSplit) {
var isGrey = (this.stackSelected && this.iSpectrumSelected >= 0 && this.iSpectrumSelected != i);
var ok = (this.showAllStacked || this.iSpectrumSelected == -1 || this.iSpectrumSelected == i);
return (this.nSplit > 1 ? i == iSplit : ok && (!this.pd.isPrinting || !isGrey));
}, "~N,~N");
Clazz.defineMethod (c$, "drawSpectrumPointer", 
 function (gFront, spec, yOffset, ig) {
this.setColorFromToken (gFront, JSV.common.ScriptToken.PEAKTABCOLOR);
var iHandle = this.pd.integralShiftMode;
if (ig != null) {
if ((!this.pd.ctrlPressed || this.pd.isIntegralDrag) && !this.isOnSpectrum (this.pd.mouseX, this.pd.mouseY, -1)) {
ig = null;
} else if (iHandle == 0) {
iHandle = this.getShiftMode (this.pd.mouseX, this.pd.mouseY);
if (iHandle == 0) iHandle = 2147483647;
}}var y0 = this.yValueMovedTo;
this.yValueMovedTo = (ig == null ? spec.getYValueAt (this.xValueMovedTo) : ig.getPercentYValueAt (this.xValueMovedTo));
this.setCoordStr (this.xValueMovedTo, this.yValueMovedTo);
if (iHandle != 0) {
this.setPlotColor (gFront, iHandle == 2147483647 ? -1 : 0);
if (iHandle < 0 || iHandle == 2147483647) {
this.drawHandle (gFront, this.xPixelPlot1, this.yPixelPlot0, 3, false);
}if (iHandle > 0) {
this.drawHandle (gFront, this.xPixelPlot0, this.yPixelPlot1, 3, false);
}if (iHandle != 2147483647) return;
}if (ig != null) this.g2d.setStrokeBold (gFront, true);
if (Double.isNaN (y0) || this.pendingMeasurement != null) {
this.g2d.drawLine (gFront, this.xPixelMovedTo, this.yPixel0, this.xPixelMovedTo, this.yPixel1);
if (this.xPixelMovedTo2 >= 0) this.g2d.drawLine (gFront, this.xPixelMovedTo2, this.yPixel0, this.xPixelMovedTo2, this.yPixel1);
this.yValueMovedTo = NaN;
} else {
var y = (ig == null ? yOffset + this.toPixelY (this.yValueMovedTo) : this.toPixelYint (this.yValueMovedTo / 100));
if (y == this.fixY (y)) this.g2d.drawLine (gFront, this.xPixelMovedTo, y - 10, this.xPixelMovedTo, y + 10);
}if (ig != null) this.g2d.setStrokeBold (gFront, false);
}, "~O,JSV.common.Spectrum,~N,JSV.common.IntegralData");
Clazz.defineMethod (c$, "setScale", 
function (i) {
this.viewData.setScale (i, this.xPixels, this.yPixels, this.spectra.get (i).isInverted ());
}, "~N");
Clazz.defineMethod (c$, "draw2DUnits", 
 function (g) {
var nucleusX = this.getSpectrumAt (0).nucleusX;
var nucleusY = this.getSpectrumAt (0).nucleusY;
this.setColorFromToken (g, JSV.common.ScriptToken.PLOTCOLOR);
this.drawUnits (g, nucleusX, this.imageView.xPixel1 + 5 * this.pd.scalingFactor, this.yPixel1, 1, 1.0);
this.drawUnits (g, nucleusY, this.imageView.xPixel0 - 5 * this.pd.scalingFactor, this.yPixel0, 1, 0);
}, "~O");
Clazz.defineMethod (c$, "drawPeakTabs", 
 function (gFront, g2, spec) {
var list = (this.nSpectra == 1 || this.iSpectrumSelected >= 0 ? spec.getPeakList () : null);
if (list != null && list.size () > 0) {
if (this.piMouseOver != null && this.piMouseOver.spectrum === spec && this.pd.isMouseUp ()) {
this.g2d.setGraphicsColor (g2, this.g2d.getColor4 (240, 240, 240, 140));
this.drawPeak (g2, this.piMouseOver, 0);
spec.setHighlightedPeak (this.piMouseOver);
} else {
spec.setHighlightedPeak (null);
}this.setColorFromToken (gFront, JSV.common.ScriptToken.PEAKTABCOLOR);
for (var i = list.size (); --i >= 0; ) {
var p = list.get (i);
this.drawPeak (gFront, p, p === spec.getSelectedPeak () ? 14 : 7);
}
}}, "~O,~O,JSV.common.Spectrum");
Clazz.defineMethod (c$, "drawPeak", 
 function (g, pi, tickSize) {
if (this.pd.isPrinting) return;
var xMin = pi.getXMin ();
var xMax = pi.getXMax ();
if (xMin == xMax) return;
this.drawBar (g, pi, xMin, xMax, null, tickSize);
}, "~O,JSV.common.PeakInfo,~N");
Clazz.defineMethod (c$, "drawWidgets", 
 function (gFront, gBack, subIndex, needNewPins, doDraw1DObjects, doDraw1DY, postGrid) {
this.setWidgets (needNewPins, subIndex, doDraw1DObjects);
if (this.pd.isPrinting && (this.imageView == null ? !this.cur1D2Locked : this.sticky2Dcursor)) return;
if (!this.pd.isPrinting && !postGrid) {
if (doDraw1DObjects) {
this.fillBox (gFront, this.xPixel0, this.pin1Dx0.yPixel1, this.xPixel1, this.pin1Dx1.yPixel1 + 2, JSV.common.ScriptToken.GRIDCOLOR);
this.fillBox (gFront, this.pin1Dx0.xPixel0, this.pin1Dx0.yPixel1, this.pin1Dx1.xPixel0, this.pin1Dx1.yPixel1 + 2, JSV.common.ScriptToken.PLOTCOLOR);
} else {
this.fillBox (gFront, this.imageView.xPixel0, this.pin2Dx0.yPixel1, this.imageView.xPixel1, this.pin2Dx0.yPixel1 + 2, JSV.common.ScriptToken.GRIDCOLOR);
this.fillBox (gFront, this.pin2Dx0.xPixel0, this.pin2Dx0.yPixel1, this.pin2Dx1.xPixel0, this.pin2Dx1.yPixel1 + 2, JSV.common.ScriptToken.PLOTCOLOR);
this.fillBox (gFront, this.pin2Dy0.xPixel1, this.yPixel1, this.pin2Dy1.xPixel1 + 2, this.yPixel0, JSV.common.ScriptToken.GRIDCOLOR);
this.fillBox (gFront, this.pin2Dy0.xPixel1, this.pin2Dy0.yPixel1, this.pin2Dy1.xPixel1 + 2, this.pin2Dy1.yPixel0, JSV.common.ScriptToken.PLOTCOLOR);
}this.fillBox (gFront, this.pin1Dy0.xPixel1, this.yPixel1, this.pin1Dy1.xPixel1 + 2, this.yPixel0, JSV.common.ScriptToken.GRIDCOLOR);
if (doDraw1DY) this.fillBox (gFront, this.pin1Dy0.xPixel1, this.pin1Dy0.yPixel1, this.pin1Dy1.xPixel1 + 2, this.pin1Dy1.yPixel0, JSV.common.ScriptToken.PLOTCOLOR);
}for (var i = 0; i < this.widgets.length; i++) {
var pw = this.widgets[i];
if (pw == null || !pw.isPinOrCursor && !this.zoomEnabled) continue;
var isLockedCursor = (pw === this.cur1D2x1 || pw === this.cur1D2x2 || pw === this.cur2Dx0 || pw === this.cur2Dx1 || pw === this.cur2Dy);
if ((pw.isPin || !pw.isPinOrCursor) == postGrid) continue;
if (pw.is2D) {
if (pw === this.cur2Dx0 && !doDraw1DObjects) continue;
} else {
var isPin1Dy = (pw === this.pin1Dy0 || pw === this.pin1Dy1 || pw === this.pin1Dy01);
if ((this.imageView != null && doDraw1DObjects == isPin1Dy) || isPin1Dy && !doDraw1DY || pw === this.cur1D2x1 && this.gs2dLinkedX == null || pw === this.cur1D2x2 && this.gs2dLinkedY == null || pw === this.zoomBox1D && (this.pd.isIntegralDrag || this.pd.integralShiftMode != 0)) {
if (!this.isLinked || this.imageView != null) continue;
}}if (this.pd.isPrinting && !isLockedCursor) continue;
if (pw.isPinOrCursor) {
this.setColorFromToken (gFront, pw.color);
this.g2d.drawLine (gFront, pw.xPixel0, pw.yPixel0, pw.xPixel1, pw.yPixel1);
pw.isVisible = true;
if (pw.isPin) this.drawHandle (gFront, pw.xPixel0, pw.yPixel0, 2, !pw.isEnabled);
} else if (pw.xPixel1 != pw.xPixel0) {
this.fillBox (gBack, pw.xPixel0, pw.yPixel0, pw.xPixel1, pw.yPixel1, pw === this.zoomBox1D && this.pd.shiftPressed ? JSV.common.ScriptToken.ZOOMBOXCOLOR2 : JSV.common.ScriptToken.ZOOMBOXCOLOR);
}}
}, "~O,~O,~N,~B,~B,~B,~B");
Clazz.defineMethod (c$, "drawBar", 
 function (g, pi, xMin, xMax, whatColor, tickSize) {
var r = xMax + xMin;
var d = Math.abs (xMax - xMin);
var range = Math.abs (this.toX (this.xPixel1) - this.toX (this.xPixel0));
if (false && tickSize > 0 && d > range / 20) {
d = range / 20;
xMin = r / 2 - d / 2;
xMax = r / 2 + d / 2;
}var x1 = this.toPixelX (xMin);
var x2 = this.toPixelX (xMax);
if (x1 > x2) {
var tmp = x1;
x1 = x2;
x2 = tmp;
}x1 = this.fixX (x1);
x2 = this.fixX (x2);
if (x2 - x1 < 3) {
x1 -= 2;
x2 += 2;
}if (pi != null) pi.setPixelRange (x1, x2);
if (tickSize == 0) {
this.fillBox (g, x1, this.yPixel0, x2, this.yPixel0 + this.yPixels, whatColor);
} else {
this.fillBox (g, x1, this.yPixel0 + 2, x2, this.yPixel0 + 5, whatColor);
if (pi != null) {
x1 = Clazz.doubleToInt ((x1 + x2) / 2);
this.fillBox (g, x1 - 1, this.yPixel0 + 2, x1 + 1, this.yPixel0 + 2 + tickSize, whatColor);
}}}, "~O,JSV.common.PeakInfo,~N,~N,JSV.common.ScriptToken,~N");
Clazz.defineMethod (c$, "drawIntegration", 
 function (gFront, index, yOffset, isGrey, iData, isContinuous, isSelected) {
if (iData != null) {
if (this.haveIntegralDisplayed (index)) this.drawPlot (gFront, index, this.spectra.get (index), true, yOffset, false, iData, true, false, false);
this.drawIntegralValues (gFront, index, yOffset);
}var ratios = this.getIntegrationRatios (index);
if (ratios != null) this.drawAnnotations (gFront, ratios, JSV.common.ScriptToken.INTEGRALPLOTCOLOR);
}, "~O,~N,~N,~B,JSV.common.IntegralData,~B,~B");
Clazz.defineMethod (c$, "getMeasurements", 
 function (type, iSpec) {
var ad = this.getDialog (type, iSpec);
return (ad == null || ad.getData ().size () == 0 || !ad.getState () ? null : ad.getData ());
}, "JSV.common.Annotation.AType,~N");
Clazz.defineMethod (c$, "drawPlot", 
 function (g, index, spec, isContinuous, yOffset, isGrey, ig, isSelected, hasPendingIntegral, pointsOnly) {
var xyCoords = (ig == null ? spec.getXYCoords () : this.getIntegrationGraph (index).getXYCoords ());
var isIntegral = (ig != null);
var bsDraw = (isIntegral ? ig.getBitSet () : null);
var fillPeaks = (hasPendingIntegral || spec.fillColor != null && isSelected);
var iColor = (isGrey ? -2 : isIntegral ? -1 : !this.allowStacking ? 0 : index);
this.setPlotColor (g, iColor);
var plotOn = true;
var y0 = this.toPixelY (0);
if (isIntegral) fillPeaks = new Boolean (fillPeaks & (y0 == this.fixY (y0))).valueOf ();
 else y0 = this.fixY (y0);
var cInt = (isIntegral || fillPeaks ? this.pd.getColor (JSV.common.ScriptToken.INTEGRALPLOTCOLOR) : null);
var cFill = (cInt == null || spec.fillColor == null ? cInt : spec.fillColor);
var iFirst = this.viewData.getStartingPointIndex (index);
var iLast = this.viewData.getEndingPointIndex (index);
if (isContinuous && !pointsOnly) {
iLast--;
var doLineTo = (isIntegral || this.pendingIntegral != null) && this.g2d.canDoLineTo ();
if (doLineTo) this.g2d.doStroke (g, true);
var isDown = false;
for (var i = iFirst; i <= iLast; i++) {
var point1 = xyCoords[i];
var point2 = xyCoords[i + 1];
var y1 = (isIntegral ? this.toPixelYint (point1.getYVal ()) : this.toPixelY (point1.getYVal ()));
if (y1 == -2147483648) continue;
var y2 = (isIntegral ? this.toPixelYint (point2.getYVal ()) : this.toPixelY (point2.getYVal ()));
if (y2 == -2147483648) continue;
var xv1 = point1.getXVal ();
var xv2 = point2.getXVal ();
var x1 = this.toPixelX (xv1);
var x2 = this.toPixelX (xv2);
y1 = this.fixY (yOffset + y1);
y2 = this.fixY (yOffset + y2);
if (isIntegral) {
if (i == iFirst) {
this.xPixelPlot1 = x1;
this.yPixelPlot0 = y1;
}this.xPixelPlot0 = x2;
this.yPixelPlot1 = y2;
}if (x2 == x1 && y1 == y2) continue;
if (fillPeaks && hasPendingIntegral && this.pendingIntegral.overlaps (xv1, xv2)) {
if (cFill != null) {
this.g2d.doStroke (g, false);
this.g2d.setGraphicsColor (g, cFill);
}this.g2d.fillRect (g, Math.min (x1, x2), Math.min (y0, y1), Math.max (1, Math.abs (x2 - x1)), Math.abs (y0 - y1));
if (cFill != null) {
this.g2d.doStroke (g, false);
this.g2d.doStroke (g, true);
isDown = false;
this.setPlotColor (g, iColor);
}continue;
}if (y1 == y2 && (y1 == this.yPixel0)) {
continue;
}if (bsDraw != null && bsDraw.get (i) != plotOn) {
plotOn = bsDraw.get (i);
if (doLineTo && isDown) {
this.g2d.doStroke (g, false);
this.g2d.doStroke (g, true);
isDown = false;
}if (!this.pd.isPrinting && this.pd.integralShiftMode != 0) this.setPlotColor (g, 0);
 else if (plotOn) this.setColorFromToken (g, JSV.common.ScriptToken.INTEGRALPLOTCOLOR);
 else this.setPlotColor (g, -3);
}if (this.pd.isPrinting && !plotOn) continue;
if (isDown) {
this.g2d.lineTo (g, x2, y2);
} else {
this.g2d.drawLine (g, x1, y1, x2, y2);
isDown = doLineTo;
}}
if (doLineTo) this.g2d.doStroke (g, false);
} else {
for (var i = iFirst; i <= iLast; i++) {
var point = xyCoords[i];
var y2 = this.toPixelY (point.getYVal ());
if (y2 == -2147483648) continue;
var x1 = this.toPixelX (point.getXVal ());
var y1 = this.toPixelY (Math.max (this.getScale ().minYOnScale, 0));
y1 = this.fixY (yOffset + y1);
y2 = this.fixY (yOffset + y2);
if (y1 == y2 && (y1 == this.yPixel0 || y1 == this.yPixel1)) continue;
if (pointsOnly) this.g2d.fillRect (g, x1 - 1, y2 - 1, 3, 3);
 else this.g2d.drawLine (g, x1, y1, x1, y2);
}
if (!pointsOnly && this.getScale ().isYZeroOnScale ()) {
var y = yOffset + this.toPixelY (this.getScale ().spectrumYRef);
if (y == this.fixY (y)) this.g2d.drawLine (g, this.xPixel1, y, this.xPixel0, y);
}}}, "~O,~N,JSV.common.Spectrum,~B,~N,~B,JSV.common.IntegralData,~B,~B,~B");
Clazz.defineMethod (c$, "drawFrame", 
 function (g, iSpec, addCurrentBox, addSplitBox, drawUpDownArrows) {
if (!this.pd.gridOn || this.pd.isPrinting) {
this.setColorFromToken (g, JSV.common.ScriptToken.GRIDCOLOR);
this.g2d.drawRect (g, this.xPixel0, this.yPixel0, this.xPixels, this.yPixels);
if (this.pd.isPrinting) return;
}this.setCurrentBoxColor (g);
if (drawUpDownArrows) {
if (iSpec >= 0) {
this.setPlotColor (g, iSpec);
this.fillArrow (g, 3, this.xVArrows, Clazz.doubleToInt ((this.yPixel00 + this.yPixel11) / 2) - 9, true);
this.fillArrow (g, 4, this.xVArrows, Clazz.doubleToInt ((this.yPixel00 + this.yPixel11) / 2) + 9, true);
this.setCurrentBoxColor (g);
}this.fillArrow (g, 3, this.xVArrows, Clazz.doubleToInt ((this.yPixel00 + this.yPixel11) / 2) - 9, false);
this.fillCircle (g, this.xVArrows, Clazz.doubleToInt ((this.yPixel00 + this.yPixel11) / 2), false);
this.fillArrow (g, 4, this.xVArrows, Clazz.doubleToInt ((this.yPixel00 + this.yPixel11) / 2) + 9, false);
}if (this.imageView != null) return;
if (addCurrentBox) {
var x1 = this.xPixel00 + 10;
var x2 = this.xPixel11 - 10;
var y1 = this.yPixel00 + 1;
var y2 = this.yPixel11 - 2;
this.g2d.drawLine (g, x1, y1, x2, y1);
this.g2d.drawLine (g, x2, y1, x2, y2);
this.g2d.drawLine (g, x1, y2, x2, y2);
this.splitterX = this.closerX = -2147483648;
this.drawBox (g, x2 - 10, y1, x2, y1 + 10, null);
this.g2d.drawLine (g, x2 - 10, y1 + 10, x2, y1);
this.g2d.drawLine (g, x2, y1 + 10, x2 - 10, y1);
this.closerX = x2 - 10;
this.closerY = y1;
if (addSplitBox) {
x2 -= 10;
this.fillBox (g, x2 - 10, y1, x2, y1 + 10, null);
this.splitterX = x2 - 10;
this.splitterY = y1;
}}}, "~O,~N,~B,~B,~B");
Clazz.defineMethod (c$, "drawGrid", 
 function (g) {
if (!this.pd.gridOn || this.imageView != null) return;
this.setColorFromToken (g, JSV.common.ScriptToken.GRIDCOLOR);
var lastX;
if (Double.isNaN (this.getScale ().firstX)) {
lastX = this.getScale ().maxXOnScale + this.getScale ().steps[0] / 2;
for (var val = this.getScale ().minXOnScale; val < lastX; val += this.getScale ().steps[0]) {
var x = this.toPixelX (val);
this.g2d.drawLine (g, x, this.yPixel0, x, this.yPixel1);
}
} else {
lastX = this.getScale ().maxXOnScale * 1.0001;
for (var val = this.getScale ().firstX; val <= lastX; val += this.getScale ().steps[0]) {
var x = this.toPixelX (val);
this.g2d.drawLine (g, x, this.yPixel0, x, this.yPixel1);
}
}for (var val = this.getScale ().firstY; val < this.getScale ().maxYOnScale + this.getScale ().steps[1] / 2; val += this.getScale ().steps[1]) {
var y = this.toPixelY (val);
if (y == this.fixY (y)) this.g2d.drawLine (g, this.xPixel0, y, this.xPixel1, y);
}
}, "~O");
Clazz.defineMethod (c$, "drawXScale", 
 function (g, c) {
this.setColorFromToken (g, JSV.common.ScriptToken.SCALECOLOR);
if (this.pd.isPrinting) this.g2d.drawLine (g, c.getXPixel0 (), this.yPixel1, c.getXPixel0 () + c.getXPixels () - 1, this.yPixel1);
var precision = this.getScale ().precision[0];
var font = this.pd.setFont (g, c.getXPixels (), 0, this.pd.isPrinting ? 10 : 12, false);
var y1 = this.yPixel1;
var y2 = this.yPixel1 + 4 * this.pd.scalingFactor;
var y3 = this.yPixel1 + 2 * this.pd.scalingFactor;
var h = font.getHeight ();
var dx = c.toPixelX (this.getScale ().steps[0]) - c.toPixelX (0);
var maxWidth = Math.abs (dx * 0.95);
var firstX = this.getScale ().firstX - this.getScale ().steps[0];
var lastX = (this.getScale ().maxXOnScale + this.getScale ().steps[0]) * 1.0001;
for (var pass = 0; pass < 2; pass++) {
if (pass == 1) JSV.common.ScaleData.fixScale (this.mapX);
var prevX = 1e10;
for (var val = firstX; val <= lastX; val += this.getScale ().steps[0]) {
var x = c.toPixelX (val);
var d = Double.$valueOf (val);
var s;
switch (pass) {
case 0:
s = JU.DF.formatDecimalDbl (val, precision);
this.mapX.put (d, s);
this.drawTick (g, x, y1, y2, c);
dx = Math.abs (prevX - val);
var ntick = this.getScale ().minorTickCounts[0];
if (ntick != 0) {
var step = dx / ntick;
for (var i = 1; i < ntick; i++) {
var x1 = val - i * step;
this.drawTick (g, c.toPixelX (x1), y1, y3, c);
}
}prevX = val;
continue;
case 1:
s = this.mapX.get (d);
if (s == null || x != c.fixX (x)) continue;
var w = this.pd.getStringWidth (s);
var n = (x + Clazz.doubleToInt (w / 2) == c.fixX (x + Clazz.doubleToInt (w / 2)) ? 2 : 0);
if (n > 0) this.g2d.drawString (g, s, x - Clazz.doubleToInt (w / n), y2 + h);
val += Math.floor (w / maxWidth) * this.getScale ().steps[0];
break;
}
}
}
this.mapX.clear ();
}, "~O,JSV.common.XYScaleConverter");
Clazz.defineMethod (c$, "drawTick", 
 function (g, x, y1, y2, c) {
if (x == c.fixX (x)) this.g2d.drawLine (g, x, y1, x, y2);
}, "~O,~N,~N,~N,JSV.common.XYScaleConverter");
Clazz.defineMethod (c$, "drawYScale", 
 function (g, c) {
var sd = c.getScale ();
var precision = sd.precision[1];
var font = this.pd.setFont (g, c.getXPixels (), 0, this.pd.isPrinting ? 10 : 12, false);
var h = font.getHeight ();
var max = sd.maxYOnScale + sd.steps[1] / 2;
var yLast = -2147483648;
this.setColorFromToken (g, JSV.common.ScriptToken.SCALECOLOR);
for (var pass = 0; pass < 2; pass++) {
if (pass == 1) JSV.common.ScaleData.fixScale (this.mapX);
for (var val = sd.firstY; val < max; val += sd.steps[1]) {
var d = Double.$valueOf (val);
var x1 = c.getXPixel0 ();
var y = c.toPixelY (val);
if (y != c.fixY (y)) continue;
var s;
if (pass == 0) this.g2d.drawLine (g, x1, y, x1 - 3 * this.pd.scalingFactor, y);
if (Math.abs (y - yLast) <= h) continue;
yLast = y;
switch (pass) {
case 0:
s = JU.DF.formatDecimalDbl (val, precision);
this.mapX.put (d, s);
break;
case 1:
s = this.mapX.get (d);
if (s == null) continue;
if (s.startsWith ("0") && s.contains ("E")) s = "0";
this.g2d.drawString (g, s, (x1 - 4 * this.pd.scalingFactor - this.pd.getStringWidth (s)), y + Clazz.doubleToInt (h / 3));
break;
}
}
}
this.mapX.clear ();
}, "~O,JSV.common.XYScaleConverter");
Clazz.defineMethod (c$, "drawXUnits", 
 function (g) {
var units = this.spectra.get (0).getAxisLabel (true);
if (units != null) this.drawUnits (g, units, this.xPixel1 + 25 * this.pd.scalingFactor, this.yPixel1 + 5 * this.pd.scalingFactor, 1, 1);
}, "~O");
Clazz.defineMethod (c$, "drawUnits", 
 function (g, s, x, y, hOff, vOff) {
this.setColorFromToken (g, JSV.common.ScriptToken.UNITSCOLOR);
this.pd.setFont (g, (this.imageView == null ? this : this.imageView).getXPixels (), 3, 10, false);
this.g2d.drawString (g, s, Clazz.doubleToInt (x - this.pd.getStringWidth (s) * hOff), Clazz.doubleToInt (y + this.pd.getFontHeight () * vOff));
}, "~O,~S,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawYUnits", 
 function (g) {
var units = this.spectra.get (0).getAxisLabel (false);
if (units != null) this.drawUnits (g, units, (this.pd.isPrinting ? 30 : 5) * this.pd.scalingFactor, this.yPixel0 + (this.pd.isPrinting ? 0 : 5) * this.pd.scalingFactor, 0, -1);
}, "~O");
Clazz.defineMethod (c$, "drawHighlightsAndPeakTabs", 
 function (gFront, gBack, iSpec) {
var md = this.getMeasurements (JSV.common.Annotation.AType.PeakList, iSpec);
var spec = this.spectra.get (iSpec);
if (this.pd.isPrinting) {
if (md != null) {
this.setColorFromToken (gFront, JSV.common.ScriptToken.PEAKTABCOLOR);
this.printPeakList (gFront, spec, md);
}return;
}if (md == null) {
for (var i = 0; i < this.highlights.size (); i++) {
var hl = this.highlights.get (i);
if (hl.spectrum === spec) {
this.pd.setHighlightColor (hl.color);
this.drawBar (gBack, null, hl.x1, hl.x2, JSV.common.ScriptToken.HIGHLIGHTCOLOR, 0);
}}
if (this.pd.peakTabsOn) this.drawPeakTabs (gFront, gBack, spec);
}var y;
if (md != null) {
y = (spec.isInverted () ? this.yPixel1 - 10 * this.pd.scalingFactor : this.yPixel0);
this.setColorFromToken (gFront, JSV.common.ScriptToken.PEAKTABCOLOR);
for (var i = md.size (); --i >= 0; ) {
var m = md.get (i);
var x = this.toPixelX (m.getXVal ());
this.g2d.drawLine (gFront, x, y, x, y + 10 * this.pd.scalingFactor);
}
if (this.isVisible (this.getDialog (JSV.common.Annotation.AType.PeakList, iSpec))) {
y = this.toPixelY ((md).getThresh ());
if (y == this.fixY (y) && !this.pd.isPrinting) this.g2d.drawLine (gFront, this.xPixel0, y, this.xPixel1, y);
}}}, "~O,~O,~N");
Clazz.defineMethod (c$, "printPeakList", 
 function (g, spec, data) {
var sdata = data.getMeasurementListArray (null);
if (sdata.length == 0) return;
this.pd.setFont (g, this.xPixels, 0, 8, false);
var h = this.pd.getFontHeight ();
var xs =  Clazz.newIntArray (data.size (), 0);
var xs0 =  Clazz.newIntArray (data.size (), 0);
var dx = 0;
var s5 = 5 * this.pd.scalingFactor;
var s10 = 10 * this.pd.scalingFactor;
var s15 = 15 * this.pd.scalingFactor;
var s25 = 25 * this.pd.scalingFactor;
for (var i = 0; i < sdata.length; i++) {
xs0[i] = this.toPixelX (Double.parseDouble (sdata[i][1]));
if (i == 0) {
xs[i] = xs0[i];
continue;
}xs[i] = Math.max (xs[i - 1] + h, xs0[i] + h);
dx += (xs[i] - xs0[i]);
}
dx /= 2 * sdata.length;
if (xs[0] - dx < this.xPixel0 + s25) dx = xs[0] - (this.xPixel0 + s25);
for (var i = 0; i < sdata.length; i++) xs[i] -= dx;

var inverted = spec.isInverted ();
var y4 = this.pd.getStringWidth ("99.9999");
var y2 = (sdata[0].length >= 6 ? this.pd.getStringWidth ("99.99") : 0);
var f = (inverted ? -1 : 1);
var y = (inverted ? this.yPixel1 : this.yPixel0) + f * (y2 + y4 + s15);
for (var i = 0; i < sdata.length; i++) {
this.g2d.drawLine (g, xs[i], y, xs[i], y + s5 * f);
this.g2d.drawLine (g, xs[i], y + s5 * f, xs0[i], y + s10 * f);
this.g2d.drawLine (g, xs0[i], y + s10 * f, xs0[i], y + s15 * f);
if (y2 > 0 && sdata[i][4].length > 0) this.g2d.drawLine (g, Clazz.doubleToInt ((xs[i] + xs[i - 1]) / 2), y - y4 + s5, Clazz.doubleToInt ((xs[i] + xs[i - 1]) / 2), y - y4 - s5);
}
y -= f * 2 * this.pd.scalingFactor;
if (y2 > 0) {
this.drawStringRotated (g, -90, xs[0] - s15, y, "  ppm");
this.drawStringRotated (g, -90, xs[0] - s15, y - y4 - s5, " Hz");
}for (var i = data.size (); --i >= 0; ) {
this.drawStringRotated (g, -90 * f, xs[i] + Clazz.doubleToInt (f * h / 3), y, sdata[i][1]);
if (y2 > 0 && sdata[i][4].length > 0) {
var x = Clazz.doubleToInt ((xs[i] + xs[i - 1]) / 2) + Clazz.doubleToInt (h / 3);
this.drawStringRotated (g, -90, x, y - y4 - s5, sdata[i][4]);
}}
}, "~O,JSV.common.Spectrum,JSV.common.PeakData");
Clazz.defineMethod (c$, "drawStringRotated", 
 function (g, angle, x, y, s) {
this.g2d.drawStringRotated (g, s, x, y, angle);
}, "~O,~N,~N,~N,~S");
Clazz.defineMethod (c$, "drawAnnotations", 
 function (g, annotations, whatColor) {
this.pd.setFont (g, this.xPixels, 1, 18, false);
for (var i = annotations.size (); --i >= 0; ) {
var note = annotations.get (i);
this.setAnnotationColor (g, note, whatColor);
var c = (note.is2D ? this.imageView : this);
var x = c.toPixelX (note.getXVal ());
var y = (note.isPixels () ? Clazz.doubleToInt (this.yPixel0 + 10 + 10 * this.pd.scalingFactor - note.getYVal ()) : note.is2D ? this.imageView.subIndexToPixelY (Clazz.doubleToInt (note.getYVal ())) : this.toPixelY (note.getYVal ()));
this.g2d.drawString (g, note.text, x + note.offsetX * this.pd.scalingFactor, y - note.offsetY * this.pd.scalingFactor);
}
}, "~O,JU.Lst,JSV.common.ScriptToken");
Clazz.defineMethod (c$, "drawIntegralValues", 
 function (g, iSpec, yOffset) {
var integrals = this.getMeasurements (JSV.common.Annotation.AType.Integration, iSpec);
if (integrals != null) {
if (this.pd.isPrinting) this.pd.setFont (g, this.xPixels, 0, 8, false);
 else this.pd.setFont (g, this.xPixels, 1, 12, false);
this.setColorFromToken (g, JSV.common.ScriptToken.INTEGRALPLOTCOLOR);
var h = this.pd.getFontHeight ();
this.g2d.setStrokeBold (g, true);
for (var i = integrals.size (); --i >= 0; ) {
var $in = integrals.get (i);
if ($in.getValue () == 0) continue;
var x = this.toPixelX ($in.getXVal2 ());
var y1 = yOffset * this.pd.scalingFactor + this.toPixelYint ($in.getYVal ());
var y2 = yOffset * this.pd.scalingFactor + this.toPixelYint ($in.getYVal2 ());
if (x != this.fixX (x) || y1 != this.fixY (y1) || y2 != this.fixY (y2)) continue;
if (!this.pd.isPrinting) this.g2d.drawLine (g, x, y1, x, y2);
var s = "  " + $in.text;
this.g2d.drawString (g, s, x, Clazz.doubleToInt ((y1 + y2) / 2) + Clazz.doubleToInt (h / 3));
}
this.g2d.setStrokeBold (g, false);
}if (iSpec == this.getFixedSelectedSpectrumIndex ()) this.selectedSpectrumIntegrals = integrals;
}, "~O,~N,~N");
Clazz.defineMethod (c$, "drawMeasurements", 
 function (g, iSpec) {
var md = this.getMeasurements (JSV.common.Annotation.AType.Measurements, iSpec);
if (md != null) for (var i = md.size (); --i >= 0; ) this.drawMeasurement (g, md.get (i));

if (iSpec == this.getFixedSelectedSpectrumIndex ()) this.selectedSpectrumMeasurements = md;
}, "~O,~N");
Clazz.defineMethod (c$, "drawMeasurement", 
 function (g, m) {
if (m.text.length == 0 && m !== this.pendingMeasurement) return;
this.pd.setFont (g, this.xPixels, 1, 12, false);
this.g2d.setGraphicsColor (g, (m === this.pendingMeasurement ? this.pd.getColor (JSV.common.ScriptToken.PEAKTABCOLOR) : this.pd.BLACK));
var x1 = this.toPixelX (m.getXVal ());
var y1 = this.toPixelY (m.getYVal ());
var x2 = this.toPixelX (m.getXVal2 ());
if (Double.isNaN (m.getXVal ()) || x1 != this.fixX (x1) || x2 != this.fixX (x2)) return;
var drawString = (Math.abs (x1 - x2) >= 2);
var drawBaseLine = this.getScale ().isYZeroOnScale () && m.spec.isHNMR ();
var x = Clazz.doubleToInt ((x1 + x2) / 2);
this.g2d.setStrokeBold (g, true);
if (drawString) this.g2d.drawLine (g, x1, y1, x2, y1);
if (drawBaseLine) this.g2d.drawLine (g, x1 + 1, this.yPixel1 - 1, x2, this.yPixel1 - 1);
this.g2d.setStrokeBold (g, false);
if (drawString) this.g2d.drawString (g, m.text, x + m.offsetX, y1 - m.offsetY);
if (drawBaseLine) {
this.g2d.drawLine (g, x1, this.yPixel1, x1, this.yPixel1 - 6 * this.pd.scalingFactor);
this.g2d.drawLine (g, x2, this.yPixel1, x2, this.yPixel1 - 6 * this.pd.scalingFactor);
}}, "~O,JSV.common.Measurement");
Clazz.defineMethod (c$, "getPinSelected", 
 function (xPixel, yPixel) {
if (this.widgets != null) for (var i = 0; i < this.widgets.length; i++) {
if (this.widgets[i] != null && this.widgets[i].isPinOrCursor && this.widgets[i].selected (xPixel, yPixel)) {
return this.widgets[i];
}}
return null;
}, "~N,~N");
Clazz.defineMethod (c$, "set2DCrossHairs", 
function (xPixel, yPixel) {
var x;
if (xPixel == this.imageView.fixX (xPixel) && yPixel == this.fixY (yPixel)) {
this.pin1Dx1.setX (x = this.imageView.toX (xPixel), this.toPixelX (x));
this.cur2Dx1.setX (x, xPixel);
this.setCurrentSubSpectrum (this.imageView.toSubspectrumIndex (yPixel));
if (this.isLinked) {
var y = this.imageView.toY (yPixel);
this.pd.set2DCrossHairsLinked (this, x, y, !this.sticky2Dcursor);
}}}, "~N,~N");
Clazz.defineMethod (c$, "reset2D", 
 function (isX) {
if (isX) {
this.imageView.setView0 (this.imageView.xPixel0, this.pin2Dy0.yPixel0, this.imageView.xPixel1, this.pin2Dy1.yPixel0);
this.doZoom (0, this.getScale ().minY, 0, this.getScale ().maxY, true, false, false, false, true);
} else {
this.imageView.setView0 (this.pin2Dx0.xPixel0, this.imageView.yPixel0, this.pin2Dx1.xPixel0, this.imageView.yPixel1);
}}, "~B");
Clazz.defineMethod (c$, "setAnnotationText", 
 function (a) {
var sval = this.pd.getInput ("New text?", "Set Label", a.text);
if (sval == null) return false;
if (sval.length == 0) this.annotations.removeObj (a);
 else a.text = sval;
return true;
}, "JSV.common.Annotation");
Clazz.defineMethod (c$, "checkIntegral", 
 function (x1, x2, isFinal) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
if (ad == null) return false;
var integral = (ad.getData ()).addIntegralRegion (x1, x2);
if (isFinal && ad.isDialog ()) (ad).update (null, 0, 0);
if (Double.isNaN (x2)) return false;
this.pendingIntegral = (isFinal ? null : integral);
this.pd.isIntegralDrag = !isFinal;
this.selectedSpectrumIntegrals = null;
return true;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "setToolTipForPixels", 
 function (xPixel, yPixel) {
if (this.iSpectrumMovedTo != this.iSpectrumClicked || this.pd.getCurrentGraphSet () !== this) {
this.pd.setToolTipText ("click spectrum to activate");
return;
}if (this.isSplitWidget (xPixel, yPixel)) {
this.pd.setToolTipText ("click to " + (this.nSplit > 1 ? "combine" : "split"));
return;
}if (this.isCloserWidget (xPixel, yPixel)) {
this.pd.setToolTipText ("click to close");
return;
}var pw = this.getPinSelected (xPixel, yPixel);
var precisionX = this.getScale ().precision[0];
var precisionY = this.getScale ().precision[1];
if (pw != null) {
if (this.setStartupPinTip ()) return;
var s;
if (pw === this.pin1Dx01 || pw === this.pin2Dx01) {
s = JU.DF.formatDecimalDbl (Math.min (this.pin1Dx0.getXVal (), this.pin1Dx1.getXVal ()), precisionX) + " - " + JU.DF.formatDecimalDbl (Math.max (this.pin1Dx0.getXVal (), this.pin1Dx1.getXVal ()), precisionX);
} else if (pw === this.pin1Dy01) {
s = JU.DF.formatDecimalDbl (Math.min (this.pin1Dy0.getYVal (), this.pin1Dy1.getYVal ()), precisionY) + " - " + JU.DF.formatDecimalDbl (Math.max (this.pin1Dy0.getYVal (), this.pin1Dy1.getYVal ()), precisionY);
} else if (pw === this.cur2Dy) {
var isub = this.imageView.toSubspectrumIndex (pw.yPixel0);
s = this.get2DYLabel (isub, precisionX);
} else if (pw === this.pin2Dy01) {
s = "" + Clazz.doubleToInt (Math.min (this.pin2Dy0.getYVal (), this.pin2Dy1.getYVal ())) + " - " + Clazz.doubleToInt (Math.max (this.pin2Dy0.getYVal (), this.pin2Dy1.getYVal ()));
} else if (pw.isXtype) {
s = JU.DF.formatDecimalDbl (pw.getXVal (), precisionX);
} else if (pw.is2D) {
s = "" + Clazz.doubleToInt (pw.getYVal ());
} else {
s = JU.DF.formatDecimalDbl (pw.getYVal (), precisionY);
}this.pd.setToolTipText (s);
return;
}var yPt;
if (this.imageView != null) {
if (this.imageView.fixX (xPixel) == xPixel && this.fixY (yPixel) == yPixel) {
var isub = this.imageView.toSubspectrumIndex (yPixel);
var s = "y=" + this.get2DYLabel (isub, precisionX) + " / x=" + JU.DF.formatDecimalDbl (this.imageView.toX (xPixel), precisionX) + " " + this.getSpectrum ().getAxisLabel (true);
this.pd.setToolTipText (s);
this.pd.coordStr = s;
return;
}if (!this.pd.display1D) {
this.pd.setToolTipText ("");
this.pd.coordStr = "";
return;
}}var xPt = this.toX (this.fixX (xPixel));
yPt = (this.imageView != null && this.imageView.isXWithinRange (xPixel) ? this.imageView.toSubspectrumIndex (this.fixY (yPixel)) : this.toY (this.fixY (yPixel)));
var xx = this.setCoordStr (xPt, yPt);
var iSpec = this.getFixedSelectedSpectrumIndex ();
if (!this.isInPlotRegion (xPixel, yPixel)) {
yPt = NaN;
} else if (this.nSpectra == 1) {
} else if (this.haveIntegralDisplayed (iSpec)) {
yPt = this.getIntegrationGraph (iSpec).getPercentYValueAt (xPt);
xx += ", " + JU.DF.formatDecimalDbl (yPt, 1);
}this.pd.setToolTipText ((this.selectedIntegral != null ? "click to set value" : this.pendingMeasurement != null || this.selectedMeasurement != null ? (this.pd.hasFocus () ? "Press ESC to delete " + (this.selectedIntegral != null ? "integral, DEL to delete all visible, or N to normalize" : this.pendingMeasurement == null ? "\"" + this.selectedMeasurement.text + "\" or DEL to delete all visible" : "measurement") : "") : Double.isNaN (yPt) ? null : xx));
}, "~N,~N");
Clazz.defineMethod (c$, "isFrameBox", 
 function (xPixel, yPixel, boxX, boxY) {
return Math.abs (xPixel - (boxX + 5)) < 5 && Math.abs (yPixel - (boxY + 5)) < 5;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setCoordStr", 
 function (xPt, yPt) {
var xx = JU.DF.formatDecimalDbl (xPt, this.getScale ().precision[0]);
this.pd.coordStr = "(" + xx + (this.haveSingleYScale || this.iSpectrumSelected >= 0 ? ", " + JU.DF.formatDecimalDbl (yPt, this.getScale ().precision[1]) : "") + ")";
return xx;
}, "~N,~N");
Clazz.defineMethod (c$, "setStartupPinTip", 
 function () {
if (this.pd.startupPinTip == null) return false;
this.pd.setToolTipText (this.pd.startupPinTip);
this.pd.startupPinTip = null;
return true;
});
Clazz.defineMethod (c$, "get2DYLabel", 
 function (isub, precision) {
var spec = this.getSpectrumAt (0).getSubSpectra ().get (isub);
return JU.DF.formatDecimalDbl (spec.getY2DPPM (), precision) + " PPM" + (spec.y2DUnits.equals ("HZ") ? " (" + JU.DF.formatDecimalDbl (spec.getY2D (), precision) + " HZ) " : "");
}, "~N,~N");
Clazz.defineMethod (c$, "isOnSpectrum", 
 function (xPixel, yPixel, index) {
var xyCoords = null;
var isContinuous = true;
var isIntegral = (index < 0);
if (isIntegral) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
if (ad == null) return false;
xyCoords = (ad.getData ()).getXYCoords ();
index = this.getFixedSelectedSpectrumIndex ();
} else {
this.setScale (index);
var spec = this.spectra.get (index);
xyCoords = spec.xyCoords;
isContinuous = spec.isContinuous ();
}var yOffset = index * Clazz.floatToInt (this.yPixels * (this.yStackOffsetPercent / 100));
var ix0 = this.viewData.getStartingPointIndex (index);
var ix1 = this.viewData.getEndingPointIndex (index);
if (isContinuous) {
for (var i = ix0; i < ix1; i++) {
var point1 = xyCoords[i];
var point2 = xyCoords[i + 1];
var x1 = this.toPixelX (point1.getXVal ());
var x2 = this.toPixelX (point2.getXVal ());
var y1 = (isIntegral ? this.toPixelYint (point1.getYVal ()) : this.toPixelY (point1.getYVal ()));
var y2 = (isIntegral ? this.toPixelYint (point2.getYVal ()) : this.toPixelY (point2.getYVal ()));
if (y1 == -2147483648 || y2 == -2147483648) continue;
y1 = this.fixY (y1) - yOffset;
y2 = this.fixY (y2) - yOffset;
if (JSV.common.GraphSet.isOnLine (xPixel, yPixel, x1, y1, x2, y2)) return true;
}
} else {
for (var i = ix0; i <= ix1; i++) {
var point = xyCoords[i];
var y2 = this.toPixelY (point.getYVal ());
if (y2 == -2147483648) continue;
var x1 = this.toPixelX (point.getXVal ());
var y1 = this.toPixelY (Math.max (this.getScale ().minYOnScale, 0));
y1 = this.fixY (y1);
y2 = this.fixY (y2);
if (y1 == y2 && (y1 == this.yPixel0 || y1 == this.yPixel1)) continue;
if (JSV.common.GraphSet.isOnLine (xPixel, yPixel, x1, y1, x1, y2)) return true;
}
}return false;
}, "~N,~N,~N");
c$.distance = Clazz.defineMethod (c$, "distance", 
 function (dx, dy) {
return Math.sqrt (dx * dx + dy * dy);
}, "~N,~N");
c$.findCompatibleGraphSet = Clazz.defineMethod (c$, "findCompatibleGraphSet", 
 function (graphSets, spec) {
for (var i = 0; i < graphSets.size (); i++) if (JSV.common.Spectrum.areXScalesCompatible (spec, graphSets.get (i).getSpectrum (), false, false)) return graphSets.get (i);

return null;
}, "JU.Lst,JSV.common.Spectrum");
c$.isGoodEvent = Clazz.defineMethod (c$, "isGoodEvent", 
 function (zOrP, p, asX) {
return (p == null ? (Math.abs (zOrP.xPixel1 - zOrP.xPixel0) > 5 && Math.abs (zOrP.yPixel1 - zOrP.yPixel0) > 5) : asX ? Math.abs (zOrP.xPixel0 - p.xPixel0) > 5 : Math.abs (zOrP.yPixel0 - p.yPixel0) > 5);
}, "JSV.common.PlotWidget,JSV.common.PlotWidget,~B");
c$.isOnLine = Clazz.defineMethod (c$, "isOnLine", 
 function (xPixel, yPixel, x1, y1, x2, y2) {
var dx1 = Math.abs (x1 - xPixel);
if (dx1 < 2 && Math.abs (y1 - yPixel) < 2) return true;
var dx2 = x2 - xPixel;
if (Math.abs (dx2) < 2 && Math.abs (y2 - yPixel) < 2) return true;
var dy12 = y1 - y2;
if (Math.abs (dy12) > 2 && (y1 < yPixel) == (y2 < yPixel)) return false;
var dx12 = x1 - x2;
if (Math.abs (dx12) > 2 && (x1 < xPixel) == (x2 < xPixel)) return false;
return (JSV.common.GraphSet.distance (dx1, y1 - yPixel) + JSV.common.GraphSet.distance (dx2, yPixel - y2) < JSV.common.GraphSet.distance (dx12, dy12) + 2);
}, "~N,~N,~N,~N,~N,~N");
c$.setFractionalPositions = Clazz.defineMethod (c$, "setFractionalPositions", 
 function (pd, graphSets, linkMode) {
var n = graphSets.size ();
var f = 0;
var n2d = 1;
var gs;
var y = 0;
pd.isLinked = (linkMode !== JSV.common.PanelData.LinkMode.NONE);
if (linkMode === JSV.common.PanelData.LinkMode.NONE) {
for (var i = 0; i < n; i++) {
gs = graphSets.get (i);
f += (gs.getSpectrumAt (0).is1D () ? 1 : n2d) * gs.nSplit;
}
f = 1 / f;
for (var i = 0; i < n; i++) {
gs = graphSets.get (i);
gs.isLinked = false;
var g = (gs.getSpectrumAt (0).is1D () ? f : n2d * f);
gs.fX0 = 0;
gs.fY0 = y;
gs.fracX = 1;
gs.fracY = g;
y += g * gs.nSplit;
}
} else {
var gs2d = null;
var i2d = -1;
if (n == 2 || n == 3) for (var i = 0; i < n; i++) {
gs = graphSets.get (i);
if (!gs.getSpectrum ().is1D ()) {
gs2d = gs;
if (i2d >= 0) i = -2;
i2d = i;
break;
}}
if (i2d == -2 || i2d == -1 && n != 2) {
JSV.common.GraphSet.setFractionalPositions (pd, graphSets, JSV.common.PanelData.LinkMode.NONE);
return;
}for (var i = 0; i < n; i++) {
gs = graphSets.get (i);
gs.isLinked = true;
var s1 = gs.getSpectrumAt (0);
var is1D = s1.is1D ();
if (is1D) {
if (gs2d != null) {
var s2 = gs2d.getSpectrumAt (0);
if (JSV.common.Spectrum.areLinkableX (s1, s2)) gs.gs2dLinkedX = gs2d;
if (JSV.common.Spectrum.areLinkableY (s1, s2)) gs.gs2dLinkedY = gs2d;
}gs.fX0 = 0;
gs.fY0 = y;
gs.fracX = (gs2d == null ? 1 : 0.5);
gs.fracY = (n == 3 || gs2d == null ? 0.5 : 1);
y += 0.5;
} else {
gs.fX0 = 0.5;
gs.fY0 = 0;
gs.fracX = 0.5;
gs.fracY = 1;
}}
}}, "JSV.common.PanelData,JU.Lst,JSV.common.PanelData.LinkMode");
Clazz.defineMethod (c$, "addAnnotation", 
function (args, title) {
if (args.size () == 0 || args.size () == 1 && args.get (0).equalsIgnoreCase ("none")) {
this.annotations = null;
this.lastAnnotation = null;
return null;
}if (args.size () < 4 && this.lastAnnotation == null) this.lastAnnotation = this.getAnnotation ((this.getScale ().maxXOnScale + this.getScale ().minXOnScale) / 2, (this.getScale ().maxYOnScale + this.getScale ().minYOnScale) / 2, title, false, false, 0, 0);
var annotation = this.getAnnotation (args, this.lastAnnotation);
if (annotation == null) return null;
if (this.annotations == null && args.size () == 1 && args.get (0).charAt (0) == '\"') {
var s = annotation.text;
this.getSpectrum ().setTitle (s);
return s;
}this.lastAnnotation = annotation;
this.addAnnotation (annotation, false);
return null;
}, "JU.Lst,~S");
Clazz.defineMethod (c$, "addHighlight", 
function (x1, x2, spec, color) {
if (spec == null) spec = this.getSpectrumAt (0);
var hl = Clazz.innerTypeInstance (JSV.common.GraphSet.Highlight, this, null, x1, x2, spec, (color == null ? this.pd.getColor (JSV.common.ScriptToken.HIGHLIGHTCOLOR) : color));
if (!this.highlights.contains (hl)) this.highlights.addLast (hl);
}, "~N,~N,JSV.common.Spectrum,javajs.api.GenericColor");
Clazz.defineMethod (c$, "addPeakHighlight", 
function (peakInfo) {
for (var i = this.spectra.size (); --i >= 0; ) {
var spec = this.spectra.get (i);
this.removeAllHighlights (spec);
if (peakInfo == null || peakInfo.isClearAll () || spec !== peakInfo.spectrum) continue;
var peak = peakInfo.toString ();
if (peak == null) {
continue;
}var xMin = JU.PT.getQuotedAttribute (peak, "xMin");
var xMax = JU.PT.getQuotedAttribute (peak, "xMax");
if (xMin == null || xMax == null) return;
var x1 = JU.PT.parseFloat (xMin);
var x2 = JU.PT.parseFloat (xMax);
if (Float.isNaN (x1) || Float.isNaN (x2)) return;
this.pd.addHighlight (this, x1, x2, spec, 200, 140, 140, 100);
spec.setSelectedPeak (peakInfo);
if (this.getScale ().isInRangeX (x1) || this.getScale ().isInRangeX (x2) || x1 < this.getScale ().minX && this.getScale ().maxX < x2) {
} else {
this.setZoomTo (0);
}}
}, "JSV.common.PeakInfo");
Clazz.defineMethod (c$, "advanceSubSpectrum", 
function (dir) {
var spec0 = this.getSpectrumAt (0);
var i = spec0.advanceSubSpectrum (dir);
if (spec0.isForcedSubset ()) this.viewData.setXRangeForSubSpectrum (this.getSpectrum ().getXYCoords ());
this.pd.notifySubSpectrumChange (i, this.getSpectrum ());
}, "~N");
Clazz.defineMethod (c$, "checkSpectrumClickedEvent", 
function (xPixel, yPixel, clickCount) {
if (this.nextClickForSetPeak != null) return false;
if (clickCount > 1 || this.pendingMeasurement != null || !this.isInPlotRegion (xPixel, yPixel)) return false;
if (clickCount == 0) {
var isOnIntegral = this.isOnSpectrum (xPixel, yPixel, -1);
this.pd.integralShiftMode = (isOnIntegral ? this.getShiftMode (xPixel, yPixel) : 0);
this.pd.isIntegralDrag = (this.pd.integralShiftMode == 0 && (isOnIntegral || this.haveIntegralDisplayed (-1) && this.findMeasurement (this.getIntegrationGraph (-1), xPixel, yPixel, 0) != null));
if (this.pd.integralShiftMode != 0) return false;
}if (!this.showAllStacked) return false;
this.stackSelected = false;
for (var i = 0; i < this.nSpectra; i++) {
if (!this.isOnSpectrum (xPixel, yPixel, i)) continue;
this.setSpectrumClicked (this.iPreviousSpectrumClicked = i);
return false;
}
if (this.isDialogOpen ()) return false;
this.setSpectrumClicked (-1);
return this.stackSelected = false;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getShiftMode", 
 function (xPixel, yPixel) {
return (this.isStartEndIntegral (xPixel, false) ? yPixel : this.isStartEndIntegral (xPixel, true) ? -yPixel : 0);
}, "~N,~N");
Clazz.defineMethod (c$, "isDialogOpen", 
 function () {
return (this.isVisible (this.getDialog (JSV.common.Annotation.AType.Integration, -1)) || this.isVisible (this.getDialog (JSV.common.Annotation.AType.Measurements, -1)) || this.isVisible (this.getDialog (JSV.common.Annotation.AType.PeakList, -1)));
});
Clazz.defineMethod (c$, "isStartEndIntegral", 
 function (xPixel, isEnd) {
return (isEnd ? this.xPixelPlot1 - xPixel < 20 : xPixel - this.xPixelPlot0 < 20);
}, "~N,~B");
Clazz.defineMethod (c$, "checkWidgetEvent", 
function (xPixel, yPixel, isPress) {
if (!this.widgetsAreSet) return false;
this.widgetsAreSet = false;
var widget;
if (isPress) {
if (this.pd.clickCount == 2 && this.lastIntDragX != xPixel && !this.is2dClick (xPixel, yPixel)) {
if (this.pendingMeasurement == null) {
if (this.iSpectrumClicked == -1 && this.iPreviousSpectrumClicked >= 0) {
this.setSpectrumClicked (this.iPreviousSpectrumClicked);
}this.processPendingMeasurement (xPixel, yPixel, 2);
return true;
}} else if (!this.is2dClick (xPixel, yPixel)) {
if (this.isOnSpectrum (xPixel, yPixel, -1)) {
this.checkIntegral (this.toX (xPixel), NaN, false);
}if (this.lastIntDragX == xPixel) {
this.pd.isIntegralDrag = true;
if (!this.checkIntegral (this.toX (xPixel), this.toX (xPixel), false)) return false;
}}if (this.pendingMeasurement != null) return true;
widget = this.getPinSelected (xPixel, yPixel);
if (widget == null) {
yPixel = this.fixY (yPixel);
if (xPixel < this.xPixel1) {
if (this.pd.shiftPressed) this.setSpectrumClicked (this.iPreviousSpectrumClicked);
xPixel = this.fixX (xPixel);
if (this.zoomBox1D == null) this.newPins ();
this.zoomBox1D.setX (this.toX (xPixel), xPixel);
this.zoomBox1D.yPixel0 = yPixel;
widget = this.zoomBox1D;
} else if (this.imageView != null && xPixel < this.imageView.xPixel1) {
this.zoomBox2D.setX (this.imageView.toX (xPixel), this.imageView.fixX (xPixel));
this.zoomBox2D.yPixel0 = yPixel;
widget = this.zoomBox2D;
}}this.pd.thisWidget = widget;
return false;
}this.nextClickForSetPeak = null;
widget = this.pd.thisWidget;
if (widget == null) return false;
if (widget === this.zoomBox1D) {
this.zoomBox1D.xPixel1 = this.fixX (xPixel);
this.zoomBox1D.yPixel1 = this.fixY (yPixel);
if (this.pd.isIntegralDrag && this.zoomBox1D.xPixel0 != this.zoomBox1D.xPixel1) {
if ((this.lastIntDragX <= xPixel) != (this.zoomBox1D.xPixel0 <= xPixel)) {
this.zoomBox1D.xPixel0 = this.lastIntDragX;
this.zoomBox1D.xPixel1 = xPixel;
this.zoomBox1D.setXVal (this.toX (this.zoomBox1D.xPixel0));
}this.lastIntDragX = xPixel;
this.checkIntegral (this.zoomBox1D.getXVal (), this.toX (this.zoomBox1D.xPixel1), false);
}return false;
}if (!this.zoomEnabled) return false;
if (widget === this.zoomBox2D) {
this.zoomBox2D.xPixel1 = this.imageView.fixX (xPixel);
this.zoomBox2D.yPixel1 = this.fixY (yPixel);
return true;
}if (widget === this.cur2Dy) {
yPixel = this.fixY (yPixel);
this.cur2Dy.yPixel0 = this.cur2Dy.yPixel1 = yPixel;
this.setCurrentSubSpectrum (this.imageView.toSubspectrumIndex (yPixel));
return true;
}if (widget === this.cur2Dx0 || widget === this.cur2Dx1) {
return false;
}if (widget === this.pin1Dx0 || widget === this.pin1Dx1 || widget === this.pin1Dx01) {
xPixel = this.fixX (xPixel);
widget.setX (this.toX0 (xPixel), xPixel);
if (widget === this.pin1Dx01) {
var dp = xPixel - (Clazz.doubleToInt ((this.pin1Dx0.xPixel0 + this.pin1Dx1.xPixel0) / 2));
var dp1 = (dp < 0 ? dp : dp);
var dp2 = (dp < 0 ? dp : dp);
xPixel = this.pin1Dx0.xPixel0 + dp2;
var xPixel1 = this.pin1Dx1.xPixel0 + dp1;
if (dp == 0 || this.fixX (xPixel) != xPixel || this.fixX (xPixel1) != xPixel1) return true;
this.pin1Dx0.setX (this.toX0 (xPixel), xPixel);
this.pin1Dx1.setX (this.toX0 (xPixel1), xPixel1);
}this.doZoom (this.pin1Dx0.getXVal (), 0, this.pin1Dx1.getXVal (), 0, true, false, false, true, false);
return true;
}if (widget === this.pin1Dy0 || widget === this.pin1Dy1 || widget === this.pin1Dy01) {
yPixel = this.fixY (yPixel);
widget.setY (this.toY0 (yPixel), yPixel);
if (widget === this.pin1Dy01) {
var dp = yPixel - Clazz.doubleToInt ((this.pin1Dy0.yPixel0 + this.pin1Dy1.yPixel0) / 2) + 1;
yPixel = this.pin1Dy0.yPixel0 + dp;
var yPixel1 = this.pin1Dy1.yPixel0 + dp;
var y0 = this.toY0 (yPixel);
var y1 = this.toY0 (yPixel1);
if (Math.min (y0, y1) == this.getScale ().minY || Math.max (y0, y1) == this.getScale ().maxY) return true;
this.pin1Dy0.setY (y0, yPixel);
this.pin1Dy1.setY (y1, yPixel1);
}this.doZoom (0, this.pin1Dy0.getYVal (), 0, this.pin1Dy1.getYVal (), this.imageView == null, this.imageView == null, false, false, false);
return true;
}if (widget === this.pin2Dx0 || widget === this.pin2Dx1 || widget === this.pin2Dx01) {
xPixel = this.imageView.fixX (xPixel);
widget.setX (this.imageView.toX0 (xPixel), xPixel);
if (widget === this.pin2Dx01) {
var dp = xPixel - Clazz.doubleToInt ((this.pin2Dx0.xPixel0 + this.pin2Dx1.xPixel0) / 2) + 1;
xPixel = this.pin2Dx0.xPixel0 + dp;
var xPixel1 = this.pin2Dx1.xPixel0 + dp;
if (this.imageView.fixX (xPixel) != xPixel || this.imageView.fixX (xPixel1) != xPixel1) return true;
this.pin2Dx0.setX (this.imageView.toX0 (xPixel), xPixel);
this.pin2Dx1.setX (this.imageView.toX0 (xPixel1), xPixel1);
}if (!JSV.common.GraphSet.isGoodEvent (this.pin2Dx0, this.pin2Dx1, true)) {
this.reset2D (true);
return true;
}this.imageView.setView0 (this.pin2Dx0.xPixel0, this.pin2Dy0.yPixel0, this.pin2Dx1.xPixel0, this.pin2Dy1.yPixel0);
this.doZoom (this.pin2Dx0.getXVal (), this.getScale ().minY, this.pin2Dx1.getXVal (), this.getScale ().maxY, false, false, false, true, false);
return true;
}if (widget === this.pin2Dy0 || widget === this.pin2Dy1 || widget === this.pin2Dy01) {
yPixel = this.fixY (yPixel);
widget.setY (this.imageView.toSubspectrumIndex (yPixel), yPixel);
if (widget === this.pin2Dy01) {
var dp = yPixel - Clazz.doubleToInt ((this.pin2Dy0.yPixel0 + this.pin2Dy1.yPixel0) / 2) + 1;
yPixel = this.pin2Dy0.yPixel0 + dp;
var yPixel1 = this.pin2Dy1.yPixel0 + dp;
if (yPixel != this.fixY (yPixel) || yPixel1 != this.fixY (yPixel1)) return true;
this.pin2Dy0.setY (this.imageView.toSubspectrumIndex (yPixel), yPixel);
this.pin2Dy1.setY (this.imageView.toSubspectrumIndex (yPixel1), yPixel1);
}if (!JSV.common.GraphSet.isGoodEvent (this.pin2Dy0, this.pin2Dy1, false)) {
this.reset2D (false);
return true;
}this.imageView.setView0 (this.pin2Dx0.xPixel0, this.pin2Dy0.yPixel0, this.pin2Dx1.xPixel1, this.pin2Dy1.yPixel1);
return true;
}return false;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "clearIntegrals", 
function () {
this.checkIntegral (NaN, 0, false);
});
Clazz.defineMethod (c$, "clearMeasurements", 
function () {
this.removeDialog (this.getFixedSelectedSpectrumIndex (), JSV.common.Annotation.AType.Measurements);
});
c$.createGraphSetsAndSetLinkMode = Clazz.defineMethod (c$, "createGraphSetsAndSetLinkMode", 
function (pd, jsvp, spectra, startIndex, endIndex, linkMode) {
var graphSets =  new JU.Lst ();
for (var i = 0; i < spectra.size (); i++) {
var spec = spectra.get (i);
var graphSet = (linkMode === JSV.common.PanelData.LinkMode.NONE ? JSV.common.GraphSet.findCompatibleGraphSet (graphSets, spec) : null);
if (graphSet == null) graphSets.addLast (graphSet =  new JSV.common.GraphSet (jsvp.getPanelData ()));
graphSet.addSpec (spec);
}
JSV.common.GraphSet.setFractionalPositions (pd, graphSets, linkMode);
for (var i = graphSets.size (); --i >= 0; ) {
graphSets.get (i).initGraphSet (startIndex, endIndex);
JU.Logger.info ("JSVGraphSet " + (i + 1) + " nSpectra = " + graphSets.get (i).nSpectra);
}
return graphSets;
}, "JSV.common.PanelData,JSV.api.JSVPanel,JU.Lst,~N,~N,JSV.common.PanelData.LinkMode");
Clazz.defineMethod (c$, "drawGraphSet", 
function (gMain, gFront, gBack, width, height, left, right, top, bottom, isResized, taintedAll, pointsOnly) {
this.zoomEnabled = this.pd.getBoolean (JSV.common.ScriptToken.ENABLEZOOM);
this.height = height * this.pd.scalingFactor;
this.width = width * this.pd.scalingFactor;
this.left = left * this.pd.scalingFactor;
this.right = right * this.pd.scalingFactor;
this.top = top * this.pd.scalingFactor;
this.bottom = bottom * this.pd.scalingFactor;
this.$haveSelectedSpectrum = false;
this.selectedSpectrumIntegrals = null;
this.selectedSpectrumMeasurements = null;
if (!this.pd.isPrinting && this.widgets != null) for (var j = 0; j < this.widgets.length; j++) if (this.widgets[j] != null) this.widgets[j].isVisible = false;

for (var iSplit = 0; iSplit < this.nSplit; iSplit++) {
this.setPositionForFrame (iSplit);
this.drawAll (gMain, gFront, gBack, iSplit, isResized || this.nSplit > 1, taintedAll, pointsOnly);
}
this.setPositionForFrame (this.nSplit > 1 ? this.pd.currentSplitPoint : 0);
if (this.pd.isPrinting) return;
}, "~O,~O,~O,~N,~N,~N,~N,~N,~N,~B,~B,~B");
Clazz.defineMethod (c$, "escapeKeyPressed", 
function (isDEL) {
if (this.zoomBox1D != null) this.zoomBox1D.xPixel0 = this.zoomBox1D.xPixel1 = 0;
if (this.zoomBox2D != null) this.zoomBox2D.xPixel0 = this.zoomBox2D.xPixel1 = 0;
if (!this.inPlotMove) return;
if (this.pendingMeasurement != null) {
this.pendingMeasurement = null;
return;
}this.pd.thisWidget = null;
this.pendingMeasurement = null;
if (this.selectedSpectrumMeasurements != null && this.selectedMeasurement != null) {
if (isDEL) this.selectedSpectrumMeasurements.clear (this.getScale ().minXOnScale, this.getScale ().maxXOnScale);
 else this.selectedSpectrumMeasurements.removeObj (this.selectedMeasurement);
this.selectedMeasurement = null;
this.updateDialog (JSV.common.Annotation.AType.Measurements, -1);
}if (this.selectedSpectrumIntegrals != null && this.selectedIntegral != null) {
if (isDEL) this.selectedSpectrumIntegrals.clear (this.getScale ().minXOnScale, this.getScale ().maxXOnScale);
 else this.selectedSpectrumIntegrals.removeObj (this.selectedIntegral);
this.selectedIntegral = null;
this.updateDialog (JSV.common.Annotation.AType.Integration, -1);
}}, "~B");
c$.findGraphSet = Clazz.defineMethod (c$, "findGraphSet", 
function (graphSets, xPixel, yPixel) {
for (var i = graphSets.size (); --i >= 0; ) if (graphSets.get (i).hasPoint (xPixel, yPixel)) return graphSets.get (i);

return null;
}, "JU.Lst,~N,~N");
Clazz.defineMethod (c$, "findMatchingPeakInfo", 
function (pi) {
var pi2 = null;
for (var i = 0; i < this.spectra.size (); i++) if ((pi2 = (this.spectra.get (i)).findMatchingPeakInfo (pi)) != null) break;

return pi2;
}, "JSV.common.PeakInfo");
Clazz.defineMethod (c$, "getCurrentSpectrumIndex", 
function () {
return (this.nSpectra == 1 ? 0 : this.iSpectrumSelected);
});
Clazz.defineMethod (c$, "getSelectedIntegral", 
function () {
return this.selectedIntegral;
});
Clazz.defineMethod (c$, "getShowAnnotation", 
function (type, i) {
var id = this.getDialog (type, i);
return (id != null && id.getState ());
}, "JSV.common.Annotation.AType,~N");
Clazz.defineMethod (c$, "hasFileLoaded", 
function (filePath) {
for (var i = this.spectra.size (); --i >= 0; ) if (this.spectra.get (i).getFilePathForwardSlash ().equals (filePath)) return true;

return false;
}, "~S");
Clazz.defineMethod (c$, "haveSelectedSpectrum", 
function () {
return this.$haveSelectedSpectrum;
});
Clazz.defineMethod (c$, "mouseClickedEvent", 
function (xPixel, yPixel, clickCount, isControlDown) {
this.selectedMeasurement = null;
this.selectedIntegral = null;
var isNextClick = this.nextClickForSetPeak;
this.nextClickForSetPeak = null;
if (this.checkArrowUpDownClick (xPixel, yPixel) || this.checkArrowLeftRightClick (xPixel, yPixel)) return;
this.lastClickX = NaN;
this.lastPixelX = 2147483647;
if (this.isSplitWidget (xPixel, yPixel)) {
this.splitStack (this.nSplit == 1);
return;
}if (this.isCloserWidget (xPixel, yPixel)) {
this.pd.closeSpectrum ();
return;
}var pw = this.getPinSelected (xPixel, yPixel);
if (pw != null) {
this.setWidgetValueByUser (pw);
return;
}var is2D = this.is2dClick (xPixel, yPixel);
if (clickCount == 2 && this.iSpectrumClicked == -1 && this.iPreviousSpectrumClicked >= 0) {
this.setSpectrumClicked (this.iPreviousSpectrumClicked);
}if (!is2D && isControlDown) {
this.setSpectrumClicked (this.iPreviousSpectrumClicked);
if (this.pendingMeasurement != null) {
this.processPendingMeasurement (xPixel, yPixel, -3);
} else if (this.iSpectrumClicked >= 0) {
this.processPendingMeasurement (xPixel, yPixel, 3);
}return;
}this.lastXMax = NaN;
if (clickCount == 2) {
if (is2D) {
if (this.sticky2Dcursor) {
this.addAnnotation (this.getAnnotation (this.imageView.toX (xPixel), this.imageView.toSubspectrumIndex (yPixel), this.pd.coordStr, false, true, 5, 5), true);
}this.sticky2Dcursor = true;
this.set2DCrossHairs (xPixel, yPixel);
return;
}if (this.isInTopBar (xPixel, yPixel)) {
this.doZoom (this.toX0 (this.xPixel0), 0, this.toX0 (this.xPixel1), 0, true, false, false, true, true);
} else if (this.isInRightBar (xPixel, yPixel)) {
this.doZoom (this.getScale ().minXOnScale, this.viewList.get (0).getScale ().minYOnScale, this.getScale ().maxXOnScale, this.viewList.get (0).getScale ().maxYOnScale, true, true, false, false, false);
} else if (this.isInTopBar2D (xPixel, yPixel)) {
this.reset2D (true);
} else if (this.isInRightBar2D (xPixel, yPixel)) {
this.reset2D (false);
} else if (this.pendingMeasurement != null) {
this.processPendingMeasurement (xPixel, yPixel, -2);
} else if (this.iSpectrumClicked >= 0) {
this.processPendingMeasurement (xPixel, yPixel, 2);
}return;
}if (is2D) {
if (this.annotations != null) {
var xy =  new JSV.common.Coordinate ().set (this.imageView.toX (xPixel), this.imageView.toSubspectrumIndex (yPixel));
var a = this.findAnnotation2D (xy);
if (a != null && this.setAnnotationText (a)) {
return;
}}if (clickCount == 1) this.sticky2Dcursor = false;
this.set2DCrossHairs (xPixel, yPixel);
return;
}if (this.isInPlotRegion (xPixel, yPixel)) {
if (this.selectedSpectrumIntegrals != null && this.checkIntegralNormalizationClick (xPixel, yPixel)) return;
if (this.pendingMeasurement != null) {
this.processPendingMeasurement (xPixel, yPixel, 1);
return;
}this.setCoordClicked (xPixel, this.toX (xPixel), this.toY (yPixel));
this.updateDialog (JSV.common.Annotation.AType.PeakList, -1);
if (isNextClick != null) {
this.nextClickForSetPeak = isNextClick;
this.shiftSpectrum (4, NaN, NaN);
this.nextClickForSetPeak = null;
return;
}} else {
this.setCoordClicked (0, NaN, 0);
}this.pd.notifyPeakPickedListeners (null);
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "is2dClick", 
 function (xPixel, yPixel) {
return (this.imageView != null && xPixel == this.imageView.fixX (xPixel) && yPixel == this.fixY (yPixel));
}, "~N,~N");
Clazz.defineMethod (c$, "updateDialog", 
 function (type, iSpec) {
var ad = this.getDialog (type, iSpec);
if (ad == null || !this.isVisible (ad)) return;
var xRange = this.toX (this.xPixel1) - this.toX (this.xPixel0);
var yOffset = (this.getSpectrum ().isInverted () ? this.yPixel1 - this.pd.mouseY : this.pd.mouseY - this.yPixel0);
(ad).update (this.pd.coordClicked, xRange, yOffset);
}, "JSV.common.Annotation.AType,~N");
Clazz.defineMethod (c$, "isVisible", 
 function (ad) {
return ad != null && (ad.isDialog () && ad.isVisible ());
}, "JSV.api.AnnotationData");
Clazz.defineMethod (c$, "mousePressedEvent", 
function (xPixel, yPixel, clickCount) {
this.checkWidgetEvent (xPixel, yPixel, true);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "mouseReleasedEvent", 
function (xPixel, yPixel) {
if (this.pendingMeasurement != null) {
if (Math.abs (this.toPixelX (this.pendingMeasurement.getXVal ()) - xPixel) < 2) this.pendingMeasurement = null;
this.processPendingMeasurement (xPixel, yPixel, -2);
this.setToolTipForPixels (xPixel, yPixel);
return;
}if (this.pd.integralShiftMode != 0) {
this.pd.integralShiftMode = 0;
this.zoomBox1D.xPixel1 = this.zoomBox1D.xPixel0;
return;
}if (this.iSpectrumMovedTo >= 0) this.setScale (this.iSpectrumMovedTo);
var thisWidget = this.pd.thisWidget;
if (this.pd.isIntegralDrag) {
if (JSV.common.GraphSet.isGoodEvent (this.zoomBox1D, null, true)) {
this.checkIntegral (this.toX (this.zoomBox1D.xPixel0), this.toX (this.zoomBox1D.xPixel1), true);
}this.zoomBox1D.xPixel1 = this.zoomBox1D.xPixel0 = 0;
this.pendingIntegral = null;
this.pd.isIntegralDrag = false;
} else if (thisWidget === this.zoomBox2D) {
if (!JSV.common.GraphSet.isGoodEvent (this.zoomBox2D, null, true)) return;
this.imageView.setZoom (this.zoomBox2D.xPixel0, this.zoomBox2D.yPixel0, this.zoomBox2D.xPixel1, this.zoomBox2D.yPixel1);
this.zoomBox2D.xPixel1 = this.zoomBox2D.xPixel0;
this.doZoom (this.imageView.toX (this.imageView.xPixel0), this.getScale ().minY, this.imageView.toX (this.imageView.xPixel0 + this.imageView.xPixels - 1), this.getScale ().maxY, false, false, false, true, true);
} else if (thisWidget === this.zoomBox1D) {
if (!JSV.common.GraphSet.isGoodEvent (this.zoomBox1D, null, true)) return;
var x1 = this.zoomBox1D.xPixel1;
var doY = (this.pd.shiftPressed);
this.doZoom (this.toX (this.zoomBox1D.xPixel0), (doY ? this.toY (this.zoomBox1D.yPixel0) : 0), this.toX (x1), (doY ? this.toY (this.zoomBox1D.yPixel1) : 0), true, doY, true, true, true);
this.zoomBox1D.xPixel1 = this.zoomBox1D.xPixel0;
} else if (thisWidget === this.pin1Dx0 || thisWidget === this.pin1Dx1 || thisWidget === this.cur2Dx0 || thisWidget === this.cur2Dx1) {
this.addCurrentZoom ();
}}, "~N,~N");
Clazz.defineMethod (c$, "mouseMovedEvent", 
function (xPixel, yPixel) {
if (this.nSpectra > 1) {
var iFrame = this.getSplitPoint (yPixel);
this.setPositionForFrame (iFrame);
this.setSpectrumMovedTo (this.nSplit > 1 ? iFrame : this.iSpectrumSelected);
if (this.iSpectrumMovedTo >= 0) this.setScale (this.iSpectrumMovedTo);
}this.inPlotMove = this.isInPlotRegion (xPixel, yPixel);
this.setXPixelMovedTo (1.7976931348623157E308, 1.7976931348623157E308, (this.inPlotMove ? xPixel : -1), -1);
if (this.inPlotMove) {
this.xValueMovedTo = this.toX (this.xPixelMovedTo);
this.yValueMovedTo = this.getSpectrum ().getYValueAt (this.xValueMovedTo);
}if (this.pd.integralShiftMode != 0) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
var xy = (ad.getData ()).getXYCoords ();
var y = xy[this.pd.integralShiftMode > 0 ? xy.length - 1 : 0].getYVal ();
(ad.getData ()).shiftY (this.pd.integralShiftMode, this.toPixelYint (y) + yPixel - (this.pd.integralShiftMode > 0 ? this.yPixelPlot1 : this.yPixelPlot0), this.yPixel0, this.yPixels);
} else if (this.pd.isIntegralDrag) {
} else if (this.pendingMeasurement != null) {
this.processPendingMeasurement (xPixel, yPixel, 0);
this.setToolTipForPixels (xPixel, yPixel);
} else {
this.selectedMeasurement = (this.inPlotMove && this.selectedSpectrumMeasurements != null ? this.findMeasurement (this.selectedSpectrumMeasurements, xPixel, yPixel, 0) : null);
this.selectedIntegral = null;
if (this.inPlotMove && this.selectedSpectrumIntegrals != null && this.selectedMeasurement == null) {
this.selectedIntegral = this.findMeasurement (this.selectedSpectrumIntegrals, xPixel, yPixel, 0);
if (this.selectedIntegral == null) this.selectedIntegral = this.findMeasurement (this.selectedSpectrumIntegrals, xPixel, yPixel, -5);
}this.setToolTipForPixels (xPixel, yPixel);
if (this.imageView == null) {
this.piMouseOver = null;
var iSpec = (this.nSplit > 1 ? this.iSpectrumMovedTo : this.iSpectrumClicked);
if (!this.isDrawNoSpectra () && iSpec >= 0) {
var spec = this.spectra.get (iSpec);
if (spec.getPeakList () != null) {
this.coordTemp.setXVal (this.toX (xPixel));
this.coordTemp.setYVal (this.toY (yPixel));
this.piMouseOver = spec.findPeakByCoord (xPixel, this.coordTemp);
}}} else {
if (!this.pd.display1D && this.sticky2Dcursor) {
this.set2DCrossHairs (xPixel, yPixel);
}}}}, "~N,~N");
Clazz.defineMethod (c$, "nextView", 
function () {
if (this.currentZoomIndex + 1 < this.viewList.size ()) this.setZoomTo (this.currentZoomIndex + 1);
});
Clazz.defineMethod (c$, "previousView", 
function () {
if (this.currentZoomIndex > 0) this.setZoomTo (this.currentZoomIndex - 1);
});
Clazz.defineMethod (c$, "resetView", 
function () {
this.setZoomTo (0);
});
Clazz.defineMethod (c$, "removeAllHighlights", 
function () {
this.removeAllHighlights (null);
});
Clazz.defineMethod (c$, "removeHighlight", 
function (index) {
this.highlights.removeItemAt (index);
}, "~N");
Clazz.defineMethod (c$, "removeHighlight", 
function (x1, x2) {
for (var i = this.highlights.size (); --i >= 0; ) {
var h = this.highlights.get (i);
if (h.x1 == x1 && h.x2 == x2) this.highlights.removeItemAt (i);
}
}, "~N,~N");
Clazz.defineMethod (c$, "scaleYBy", 
function (factor) {
if (this.imageView == null && !this.zoomEnabled) return;
this.viewData.scaleSpectrum (this.imageView == null ? this.iSpectrumSelected : -2, factor);
if (this.imageView != null) {
this.update2dImage (false);
this.resetPinsFromView ();
}this.pd.refresh ();
}, "~N");
Clazz.defineMethod (c$, "selectSpectrum", 
function (filePath, type, model) {
var haveFound = false;
for (var i = this.spectra.size (); --i >= 0; ) if ((filePath == null || this.getSpectrumAt (i).getFilePathForwardSlash ().equals (filePath)) && (this.getSpectrumAt (i).matchesPeakTypeModel (type, model))) {
this.setSpectrumSelected (i);
if (this.nSplit > 1) this.splitStack (true);
haveFound = true;
}
if (this.nSpectra > 1 && !haveFound && this.iSpectrumSelected >= 0 && !this.pd.isCurrentGraphSet (this)) this.setSpectrumSelected (-2147483648);
return haveFound;
}, "~S,~S,~S");
Clazz.defineMethod (c$, "selectPeakByFileIndex", 
function (filePath, index, atomKey) {
var pi;
for (var i = this.spectra.size (); --i >= 0; ) if ((pi = this.getSpectrumAt (i).selectPeakByFileIndex (filePath, index, atomKey)) != null) return pi;

return null;
}, "~S,~S,~S");
Clazz.defineMethod (c$, "setSelected", 
function (i) {
if (i < 0) {
this.bsSelected.clearAll ();
this.setSpectrumClicked (-1);
return;
}this.bsSelected.set (i);
this.setSpectrumClicked ((this.bsSelected.cardinality () == 1 ? i : -1));
if (this.nSplit > 1 && i >= 0) this.pd.currentSplitPoint = i;
}, "~N");
Clazz.defineMethod (c$, "setSelectedIntegral", 
function (val) {
var spec = this.selectedIntegral.getSpectrum ();
this.getIntegrationGraph (this.getSpectrumIndex (spec)).setSelectedIntegral (this.selectedIntegral, val);
}, "~N");
Clazz.defineMethod (c$, "setShowAnnotation", 
function (type, tfToggle) {
var id = this.getDialog (type, -1);
if (id == null) {
if (tfToggle != null && tfToggle !== Boolean.TRUE) return;
if (type === JSV.common.Annotation.AType.PeakList || type === JSV.common.Annotation.AType.Integration || type === JSV.common.Annotation.AType.Measurements) this.pd.showDialog (type);
return;
}if (tfToggle == null) {
if (id.isDialog ()) (id).setVisible (!(id).isVisible ());
 else this.pd.showDialog (type);
return;
}var isON = tfToggle.booleanValue ();
if (isON) id.setState (isON);
if (isON || id.isDialog ()) this.pd.showDialog (type);
if (!isON && id.isDialog ()) (id).setVisible (false);
}, "JSV.common.Annotation.AType,Boolean");
Clazz.defineMethod (c$, "checkIntegralParams", 
function (parameters, value) {
var spec = this.getSpectrum ();
if (!spec.canIntegrate () || this.reversePlot) return false;
var iSpec = this.getFixedSelectedSpectrumIndex ();
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
if (value == null) return true;
switch (JSV.common.IntegralData.IntMode.getMode (value.toUpperCase ())) {
case JSV.common.IntegralData.IntMode.NA:
return false;
case JSV.common.IntegralData.IntMode.CLEAR:
this.integrate (iSpec, null);
this.integrate (iSpec, parameters);
break;
case JSV.common.IntegralData.IntMode.ON:
if (ad == null) this.integrate (iSpec, parameters);
 else ad.setState (true);
break;
case JSV.common.IntegralData.IntMode.OFF:
if (ad != null) ad.setState (false);
break;
case JSV.common.IntegralData.IntMode.TOGGLE:
if (ad == null) this.integrate (iSpec, parameters);
 else ad.setState (!ad.getState ());
break;
case JSV.common.IntegralData.IntMode.AUTO:
if (ad == null) {
this.checkIntegralParams (parameters, "ON");
ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
}if (ad != null) (ad.getData ()).autoIntegrate ();
break;
case JSV.common.IntegralData.IntMode.LIST:
this.pd.showDialog (JSV.common.Annotation.AType.Integration);
break;
case JSV.common.IntegralData.IntMode.MARK:
if (ad == null) {
this.checkIntegralParams (parameters, "ON");
ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
}if (ad != null) (ad.getData ()).addMarks (value.substring (4).trim ());
break;
case JSV.common.IntegralData.IntMode.MIN:
if (ad != null) {
try {
var val = Double.parseDouble (JSV.common.ScriptToken.getTokens (value).get (1));
(ad.getData ()).setMinimumIntegral (val);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}break;
case JSV.common.IntegralData.IntMode.UPDATE:
if (ad != null) (ad.getData ()).update (parameters);
}
this.updateDialog (JSV.common.Annotation.AType.Integration, -1);
return true;
}, "JSV.common.Parameters,~S");
Clazz.defineMethod (c$, "setSpectrum", 
function (iSpec, fromSplit) {
if (fromSplit && this.nSplit > 1) {
if (this.nSplit > 1) this.setSpectrumClicked (iSpec);
} else {
this.setSpectrumClicked (iSpec);
this.stackSelected = false;
this.showAllStacked = false;
}if (iSpec >= 0) this.dialogsToFront (this.getSpectrum ());
}, "~N,~B");
Clazz.defineMethod (c$, "setSpectrumJDX", 
function (spec) {
var pt = this.getFixedSelectedSpectrumIndex ();
this.spectra.removeItemAt (pt);
this.spectra.add (pt, spec);
this.pendingMeasurement = null;
this.clearViews ();
this.viewData.newSpectrum (this.spectra);
}, "JSV.common.Spectrum");
Clazz.defineMethod (c$, "setZoom", 
function (x1, y1, x2, y2) {
this.setZoomTo (0);
if (x1 == 0 && x2 == 0 && y1 == 0 && y2 == 0) {
this.newPins ();
this.imageView = null;
x1 = this.getScale ().minXOnScale;
x2 = this.getScale ().maxXOnScale;
} else {
this.doZoom (x1, y1, x2, y2, true, (y1 != y2), false, true, true);
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "shiftSpectrum", 
function (mode, xOld, xNew) {
var spec = this.getSpectrum ();
if (!spec.isNMR () || !spec.is1D ()) return false;
var ok = null;
var dx = 0;
if (xNew == 1.7976931348623157E308) {
dx = -spec.addSpecShift (0);
} else {
switch (mode) {
case 3:
dx = xNew;
break;
case 1:
case 2:
this.nextClickMode = mode;
if (Double.isNaN (xOld)) {
ok = this.pd.getInput ("Click on " + (mode == 1 ? "or beside a peak to set its chemical shift" : "the spectrum set the chemical shift at that point") + (xNew == -2147483648 ? "" : " to " + xNew) + ".", "Set Reference " + (mode == 1 ? "for Peak" : "at Point"), "OK");
this.nextClickForSetPeak = ("OK".equals (ok) ? Double.$valueOf (xNew) : null);
return false;
}this.nextClickForSetPeak = null;
case 4:
if (this.nextClickForSetPeak != null) {
xNew = this.nextClickForSetPeak.doubleValue ();
this.nextClickForSetPeak = null;
}if (Double.isNaN (xOld)) xOld = this.lastClickX;
if (this.nextClickMode == 1) xOld = this.getNearestPeak (spec, xOld, this.toY (this.pd.mouseY));
if (Double.isNaN (xNew)) try {
var s = this.pd.getInput ("New chemical shift (set blank to reset)", "Set Reference", JU.DF.formatDecimalDbl (xOld, this.getScale ().precision[0])).trim ();
if (s.length == 0) xNew = xOld - spec.addSpecShift (0);
 else xNew = Double.parseDouble (s);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
dx = xNew - xOld;
break;
}
}if (dx == 0) return false;
spec.addSpecShift (dx);
if (this.annotations != null) for (var i = this.annotations.size (); --i >= 0; ) if (this.annotations.get (i).spec === spec) this.annotations.get (i).addSpecShift (dx);

if (this.dialogs != null) for (var e, $e = this.dialogs.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e.getValue ().getSpectrum () === spec) e.getValue ().setSpecShift (dx);

this.getScale ().addSpecShift (dx);
if (!Double.isNaN (this.lastClickX)) this.lastClickX += dx;
this.updateDialogs ();
this.doZoom (0, this.getScale ().minYOnScale, 0, this.getScale ().maxYOnScale, true, true, false, true, false);
this.pd.setTaintedAll ();
this.pd.repaint ();
return true;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "toPeak", 
function (istep) {
istep *= (this.drawXAxisLeftToRight ? 1 : -1);
if (Double.isNaN (this.lastClickX)) this.lastClickX = this.lastPixelX = 0;
var spec = this.getSpectrum ();
var coord = this.setCoordClicked (this.lastPixelX, this.lastClickX, 0);
var iPeak = spec.setNextPeak (coord, istep);
if (iPeak < 0) return;
var peak = spec.getPeakList ().get (iPeak);
spec.setSelectedPeak (peak);
this.setCoordClicked (peak.getXPixel (), peak.getX (), 0);
this.pd.notifyPeakPickedListeners ( new JSV.common.PeakPickEvent (this.jsvp, this.pd.coordClicked, peak));
}, "~N");
Clazz.defineMethod (c$, "scaleSelectedBy", 
function (f) {
for (var i = this.bsSelected.nextSetBit (0); i >= 0; i = this.bsSelected.nextSetBit (i + 1)) this.viewData.scaleSpectrum (i, f);

}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "gs: " + this.nSpectra + " " + this.spectra + " " + this.spectra.get (0).getFilePath ();
});
Clazz.defineMethod (c$, "setXPointer", 
function (spec, x) {
if (spec != null) this.setSpectrumClicked (this.getSpectrumIndex (spec));
this.xValueMovedTo = this.lastClickX = x;
this.lastPixelX = this.toPixelX (x);
this.setXPixelMovedTo (x, 1.7976931348623157E308, 0, 0);
this.yValueMovedTo = NaN;
}, "JSV.common.Spectrum,~N");
Clazz.defineMethod (c$, "setXPointer2", 
function (spec, x) {
if (spec != null) this.setSpectrumClicked (this.getSpectrumIndex (spec));
this.setXPixelMovedTo (1.7976931348623157E308, x, 0, 0);
}, "JSV.common.Spectrum,~N");
Clazz.defineMethod (c$, "hasCurrentMeasurement", 
function (type) {
return ((type === JSV.common.Annotation.AType.Integration ? this.selectedSpectrumIntegrals : this.selectedSpectrumMeasurements) != null);
}, "JSV.common.Annotation.AType");
Clazz.defineMethod (c$, "getDialog", 
function (type, iSpec) {
if (iSpec == -1) iSpec = this.getCurrentSpectrumIndex ();
return (this.dialogs == null || iSpec < 0 ? null : this.dialogs.get (type + "_" + iSpec));
}, "JSV.common.Annotation.AType,~N");
Clazz.defineMethod (c$, "removeDialog", 
function (iSpec, type) {
if (this.dialogs != null && iSpec >= 0) this.dialogs.remove (type + "_" + iSpec);
}, "~N,JSV.common.Annotation.AType");
Clazz.defineMethod (c$, "addDialog", 
function (iSpec, type, dialog) {
if (this.dialogs == null) this.dialogs =  new java.util.Hashtable ();
var key = type + "_" + iSpec;
dialog.setGraphSetKey (key);
this.dialogs.put (key, dialog);
return dialog;
}, "~N,JSV.common.Annotation.AType,JSV.api.AnnotationData");
Clazz.defineMethod (c$, "removeDialog", 
function (dialog) {
var key = dialog.getGraphSetKey ();
this.dialogs.remove (key);
var data = dialog.getData ();
if (data != null) this.dialogs.put (key, data);
}, "JSV.dialog.JSVDialog");
Clazz.defineMethod (c$, "getPeakListing", 
function (iSpec, p, forceNew) {
if (iSpec < 0) iSpec = this.getCurrentSpectrumIndex ();
if (iSpec < 0) return null;
var dialog = this.getDialog (JSV.common.Annotation.AType.PeakList, -1);
if (dialog == null) {
if (!forceNew) return null;
this.addDialog (iSpec, JSV.common.Annotation.AType.PeakList, dialog =  new JSV.common.PeakData (JSV.common.Annotation.AType.PeakList, this.getSpectrum ()));
}(dialog.getData ()).setPeakList (p, -2147483648, this.viewData.getScale ());
if (dialog.isDialog ()) (dialog).setFields ();
return dialog.getData ();
}, "~N,JSV.common.Parameters,~B");
Clazz.defineMethod (c$, "setPeakListing", 
function (tfToggle) {
var dialog = this.getDialog (JSV.common.Annotation.AType.PeakList, -1);
var ad = (dialog != null && dialog.isDialog () ? dialog : null);
var isON = (tfToggle == null ? ad == null || !ad.isVisible () : tfToggle.booleanValue ());
if (isON) {
this.pd.showDialog (JSV.common.Annotation.AType.PeakList);
} else {
if (dialog.isDialog ()) (dialog).setVisible (false);
}}, "Boolean");
Clazz.defineMethod (c$, "haveIntegralDisplayed", 
function (i) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, i);
return (ad != null && ad.getState ());
}, "~N");
Clazz.defineMethod (c$, "getIntegrationGraph", 
function (i) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, i);
return (ad == null ? null : ad.getData ());
}, "~N");
Clazz.defineMethod (c$, "setIntegrationRatios", 
function (value) {
var iSpec = this.getFixedSelectedSpectrumIndex ();
if (this.aIntegrationRatios == null) this.aIntegrationRatios =  new Array (this.nSpectra);
this.aIntegrationRatios[iSpec] = JSV.common.IntegralData.getIntegrationRatiosFromString (this.getSpectrum (), value);
}, "~S");
Clazz.defineMethod (c$, "getIntegrationRatios", 
function (i) {
return (this.aIntegrationRatios == null ? null : this.aIntegrationRatios[i]);
}, "~N");
Clazz.defineMethod (c$, "integrate", 
function (iSpec, parameters) {
var spec = this.getSpectrumAt (iSpec);
if (parameters == null || !spec.canIntegrate ()) {
this.removeDialog (iSpec, JSV.common.Annotation.AType.Integration);
return false;
}this.addDialog (iSpec, JSV.common.Annotation.AType.Integration,  new JSV.common.IntegralData (spec, parameters));
return true;
}, "~N,JSV.common.Parameters");
Clazz.defineMethod (c$, "getIntegration", 
function (iSpec, p, forceNew) {
if (iSpec < 0) iSpec = this.getCurrentSpectrumIndex ();
if (iSpec < 0) return null;
var dialog = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
if (dialog == null) {
if (!forceNew) return null;
dialog = this.addDialog (iSpec, JSV.common.Annotation.AType.Integration,  new JSV.common.IntegralData (this.getSpectrum (), p));
}return dialog.getData ();
}, "~N,JSV.common.Parameters,~B");
Clazz.defineMethod (c$, "getMeasurementInfo", 
function (type, iSpec) {
var md;
switch (type) {
case JSV.common.Annotation.AType.PeakList:
md = this.getPeakListing (iSpec, null, false);
break;
case JSV.common.Annotation.AType.Integration:
md = this.getIntegration (iSpec, null, false);
break;
default:
return null;
}
if (md == null) return null;
var info =  new java.util.Hashtable ();
md.getInfo (info);
return info;
}, "JSV.common.Annotation.AType,~N");
Clazz.defineMethod (c$, "getInfo", 
function (key, iSpec) {
var spectraInfo =  new java.util.Hashtable ();
if ("".equals (key)) {
spectraInfo.put ("KEYS", "viewInfo spectra");
} else if ("viewInfo".equalsIgnoreCase (key)) return this.getScale ().getInfo (spectraInfo);
var specInfo =  new JU.Lst ();
spectraInfo.put ("spectra", specInfo);
for (var i = 0; i < this.nSpectra; i++) {
if (iSpec >= 0 && i != iSpec) continue;
var spec = this.spectra.get (i);
var info = spec.getInfo (key);
if (iSpec >= 0 && key != null && (info.size () == 2 || key.equalsIgnoreCase ("id"))) {
if (info.size () == 2) info.remove ("id");
return info;
}JSV.common.Parameters.putInfo (key, info, "type", spec.getDataType ());
JSV.common.Parameters.putInfo (key, info, "titleLabel", spec.getTitleLabel ());
JSV.common.Parameters.putInfo (key, info, "filePath", spec.getFilePath ().$replace ('\\', '/'));
JSV.common.Parameters.putInfo (key, info, "PeakList", (JSV.common.Parameters.isMatch (key, "PeakList") ? this.getMeasurementInfo (JSV.common.Annotation.AType.PeakList, i) : null));
JSV.common.Parameters.putInfo (key, info, "Integration", (JSV.common.Parameters.isMatch (key, "Integration") ? this.getMeasurementInfo (JSV.common.Annotation.AType.Integration, i) : null));
if (iSpec >= 0) return info;
specInfo.addLast (info);
}
return spectraInfo;
}, "~S,~N");
Clazz.defineMethod (c$, "getTitle", 
function (forPrinting) {
return (this.nSpectra == 1 || this.iSpectrumSelected >= 0 && (!forPrinting || this.nSplit == 1) ? this.getSpectrum ().getTitle () : null);
}, "~B");
Clazz.defineMethod (c$, "getCurrentView", 
function () {
this.setScale (this.getFixedSelectedSpectrumIndex ());
return this.viewData.getScale ();
});
Clazz.defineMethod (c$, "set2DXY", 
function (x, y, isLocked) {
var p;
if (this.gs2dLinkedX != null) {
p = this.toPixelX (x);
if (p != this.fixX (p)) {
p = -2147483648;
x = 1.7976931348623157E308;
}this.cur1D2x1.setX (x, p);
}if (this.gs2dLinkedY != null) {
p = this.toPixelX (y);
if (p != this.fixX (p)) {
p = -2147483648;
y = 1.7976931348623157E308;
}this.cur1D2x2.setX (y, p);
}this.cur1D2Locked = isLocked;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "dialogsToFront", 
function (spec) {
if (this.dialogs == null) return;
if (spec == null) spec = this.getSpectrum ();
for (var e, $e = this.dialogs.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var ad = e.getValue ();
if (this.isVisible (ad)) {
if (spec == null) (ad).setVisible (true);
 else (ad).setFocus (ad.getSpectrum () === spec);
}}
}, "JSV.common.Spectrum");
Clazz.defineMethod (c$, "setPlotColors", 
function (oColors) {
var colors = oColors;
if (colors.length > this.nSpectra) {
var tmpPlotColors =  new Array (this.nSpectra);
System.arraycopy (colors, 0, tmpPlotColors, 0, this.nSpectra);
colors = tmpPlotColors;
} else if (this.nSpectra > colors.length) {
var tmpPlotColors =  new Array (this.nSpectra);
var numAdditionColors = this.nSpectra - colors.length;
System.arraycopy (colors, 0, tmpPlotColors, 0, colors.length);
for (var i = 0, j = colors.length; i < numAdditionColors; i++, j++) tmpPlotColors[j] = this.generateRandomColor ();

colors = tmpPlotColors;
}this.plotColors = colors;
}, "~O");
Clazz.defineMethod (c$, "disposeImage", 
 function () {
{
if (this.image2D != null)
this.image2D.parentNode.removeChild(this.image2D);
}this.image2D = null;
this.jsvp = null;
this.pd = null;
this.highlights = null;
this.plotColors = null;
});
Clazz.defineMethod (c$, "generateRandomColor", 
 function () {
while (true) {
var red = Clazz.doubleToInt (Math.random () * 255);
var green = Clazz.doubleToInt (Math.random () * 255);
var blue = Clazz.doubleToInt (Math.random () * 255);
var randomColor = this.g2d.getColor3 (red, green, blue);
if (randomColor.getRGB () != 0) return randomColor;
}
});
Clazz.defineMethod (c$, "setPlotColor0", 
function (oColor) {
this.plotColors[0] = oColor;
}, "~O");
Clazz.defineMethod (c$, "getPlotColor", 
function (index) {
if (index >= this.plotColors.length) return null;
return this.plotColors[index];
}, "~N");
Clazz.defineMethod (c$, "setColorFromToken", 
 function (og, whatColor) {
if (whatColor != null) this.g2d.setGraphicsColor (og, whatColor === JSV.common.ScriptToken.PLOTCOLOR ? this.plotColors[0] : this.pd.getColor (whatColor));
}, "~O,JSV.common.ScriptToken");
Clazz.defineMethod (c$, "setPlotColor", 
 function (og, i) {
var c;
switch (i) {
case -3:
c = JSV.common.GraphSet.veryLightGrey;
break;
case -2:
c = this.pd.BLACK;
break;
case -1:
c = this.pd.getColor (JSV.common.ScriptToken.INTEGRALPLOTCOLOR);
break;
default:
c = this.plotColors[i];
break;
}
this.g2d.setGraphicsColor (og, c);
}, "~O,~N");
Clazz.defineMethod (c$, "draw2DImage", 
 function () {
if (this.imageView != null) this.g2d.drawGrayScaleImage (this.gMain, this.image2D, this.imageView.xPixel0, this.imageView.yPixel0, this.imageView.xPixel0 + this.imageView.xPixels - 1, this.imageView.yPixel0 + this.imageView.yPixels - 1, this.imageView.xView1, this.imageView.yView1, this.imageView.xView2, this.imageView.yView2);
});
Clazz.defineMethod (c$, "get2DImage", 
 function (spec0) {
this.imageView =  new JSV.common.ImageView ();
this.imageView.set (this.viewList.get (0).getScale ());
if (!this.update2dImage (true)) return false;
this.imageView.resetZoom ();
this.sticky2Dcursor = true;
return true;
}, "JSV.common.Spectrum");
Clazz.defineMethod (c$, "update2dImage", 
 function (isCreation) {
this.imageView.set (this.viewData.getScale ());
var spec = this.getSpectrumAt (0);
var buffer = this.imageView.get2dBuffer (spec, !isCreation);
if (buffer == null) {
this.image2D = null;
this.imageView = null;
return false;
}if (isCreation) {
buffer = this.imageView.adjustView (spec, this.viewData);
this.imageView.resetView ();
}this.image2D = this.g2d.newGrayScaleImage (this.gMain, this.image2D, this.imageView.imageWidth, this.imageView.imageHeight, buffer);
this.setImageWindow ();
return true;
}, "~B");
Clazz.defineMethod (c$, "getAnnotation", 
 function (x, y, text, isPixels, is2d, offsetX, offsetY) {
return  new JSV.common.ColoredAnnotation ().setCA (x, y, this.getSpectrum (), text, this.pd.BLACK, isPixels, is2d, offsetX, offsetY);
}, "~N,~N,~S,~B,~B,~N,~N");
Clazz.defineMethod (c$, "getAnnotation", 
 function (args, lastAnnotation) {
return JSV.common.Annotation.getColoredAnnotation (this.g2d, this.getSpectrum (), args, lastAnnotation);
}, "JU.Lst,JSV.common.Annotation");
Clazz.defineMethod (c$, "fillBox", 
 function (g, x0, y0, x1, y1, whatColor) {
this.setColorFromToken (g, whatColor);
this.g2d.fillRect (g, Math.min (x0, x1), Math.min (y0, y1), Math.abs (x0 - x1), Math.abs (y0 - y1));
}, "~O,~N,~N,~N,~N,JSV.common.ScriptToken");
Clazz.defineMethod (c$, "drawBox", 
 function (g, x0, y0, x1, y1, whatColor) {
this.setColorFromToken (g, whatColor);
this.g2d.drawRect (g, Math.min (x0, x1), Math.min (y0, y1), Math.abs (x0 - x1) - 1, Math.abs (y0 - y1) - 1);
}, "~O,~N,~N,~N,~N,JSV.common.ScriptToken");
Clazz.defineMethod (c$, "drawHandle", 
 function (g, x, y, size, outlineOnly) {
if (outlineOnly) this.g2d.drawRect (g, x - size, y - size, size * 2, size * 2);
 else this.g2d.fillRect (g, x - size, y - size, size * 2 + 1, size * 2 + 1);
}, "~O,~N,~N,~N,~B");
Clazz.defineMethod (c$, "setCurrentBoxColor", 
 function (g) {
this.g2d.setGraphicsColor (g, this.pd.BLACK);
}, "~O");
Clazz.defineMethod (c$, "fillArrow", 
 function (g, type, x, y, doFill) {
var f = 1;
switch (type) {
case 1:
case 3:
f = -1;
break;
}
var axPoints =  Clazz.newIntArray (-1, [x - 5, x - 5, x + 5, x + 5, x + 8, x, x - 8]);
var ayPoints =  Clazz.newIntArray (-1, [y + 5 * f, y - f, y - f, y + 5 * f, y + 5 * f, y + 10 * f, y + 5 * f]);
switch (type) {
case 1:
case 2:
if (doFill) this.g2d.fillPolygon (g, ayPoints, axPoints, 7);
 else this.g2d.drawPolygon (g, ayPoints, axPoints, 7);
break;
case 3:
case 4:
if (doFill) this.g2d.fillPolygon (g, axPoints, ayPoints, 7);
 else this.g2d.drawPolygon (g, axPoints, ayPoints, 7);
}
}, "~O,~N,~N,~N,~B");
Clazz.defineMethod (c$, "fillCircle", 
 function (g, x, y, doFill) {
if (doFill) this.g2d.fillCircle (g, x - 4, y - 4, 8);
 else this.g2d.drawCircle (g, x - 4, y - 4, 8);
}, "~O,~N,~N,~B");
Clazz.defineMethod (c$, "setAnnotationColor", 
function (g, note, whatColor) {
if (whatColor != null) {
this.setColorFromToken (g, whatColor);
return;
}var color = null;
if (Clazz.instanceOf (note, JSV.common.ColoredAnnotation)) color = (note).getColor ();
if (color == null) color = this.pd.BLACK;
this.g2d.setGraphicsColor (g, color);
}, "~O,JSV.common.Annotation,JSV.common.ScriptToken");
Clazz.defineMethod (c$, "setSolutionColor", 
function (vi, isNone, asFitted) {
for (var i = 0; i < this.nSpectra; i++) {
var spec = this.spectra.get (i);
var color = (isNone || !spec.canShowSolutionColor () ? -1 : vi.getColour (spec, asFitted));
spec.setFillColor (color == -1 ? null : this.pd.vwr.parameters.getColor1 (color));
}
}, "JSV.api.VisibleInterface,~B,~B");
Clazz.defineMethod (c$, "setIRMode", 
function (mode, type) {
for (var i = 0; i < this.nSpectra; i++) {
var spec = this.spectra.get (i);
if (!spec.dataType.equals (type)) continue;
var spec2 = JSV.common.Spectrum.taConvert (spec, mode);
if (spec2 !== spec) this.pd.setSpecForIRMode (spec2);
}
}, "JSV.common.Spectrum.IRMode,~S");
Clazz.defineMethod (c$, "getSpectrumCount", 
function () {
return 0;
});
Clazz.defineMethod (c$, "invertYAxis", 
function () {
this.viewList.get (0).init (null, 0, 0, this.getSpectrum ().invertYAxis ().isContinuous ());
this.resetViewCompletely ();
});
c$.$GraphSet$Highlight$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.x1 = 0;
this.x2 = 0;
this.color = null;
this.spectrum = null;
Clazz.instantialize (this, arguments);
}, JSV.common.GraphSet, "Highlight");
Clazz.overrideMethod (c$, "toString", 
function () {
return "highlight " + this.x1 + " " + this.x2 + " " + this.spectrum;
});
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
this.x1 = a;
this.x2 = b;
this.color = d;
this.spectrum = c;
}, "~N,~N,JSV.common.Spectrum,javajs.api.GenericColor");
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (!(Clazz.instanceOf (a, JSV.common.GraphSet.Highlight))) return false;
var b = a;
return ((b.x1 == this.x1) && (b.x2 == this.x2));
}, "~O");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"ARROW_RESET", -1,
"ARROW_HOME", 0,
"ARROW_LEFT", 1,
"ARROW_RIGHT", 2,
"ARROW_UP", 3,
"ARROW_DOWN", 4);
c$.RT2 = c$.prototype.RT2 = Math.sqrt (2.0);
Clazz.defineStatics (c$,
"veryLightGrey", null,
"minNumOfPointsForZoom", 3,
"MIN_DRAG_PIXELS", 5,
"ONLINE_CUTOFF", 2,
"SHIFT_PEAK", 1,
"SHIFT_SETX", 2,
"SHIFT_X", 3,
"SHIFT_CLICKED", 4);
});
