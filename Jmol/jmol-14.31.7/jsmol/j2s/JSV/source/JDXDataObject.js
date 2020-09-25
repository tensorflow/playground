Clazz.declarePackage ("JSV.source");
Clazz.load (["JSV.source.JDXHeader"], "JSV.source.JDXDataObject", ["java.lang.Character", "$.Double", "JU.DF", "$.PT", "JSV.common.Annotation", "$.Coordinate", "$.Integral", "JSV.exception.JSVException", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.filePath = null;
this.filePathForwardSlash = null;
this.isSimulation = false;
this.inlineData = null;
this.sourceID = "";
this.blockID = 0;
this.fileFirstX = 1.7976931348623157E308;
this.fileLastX = 1.7976931348623157E308;
this.nPointsFile = -1;
this.xFactor = 1.7976931348623157E308;
this.yFactor = 1.7976931348623157E308;
this.varName = "";
this.xUnits = "";
this.yUnits = "";
this.xLabel = null;
this.yLabel = null;
this.nH = 0;
this.observedNucl = "";
this.observedFreq = 1.7976931348623157E308;
this.parent = null;
this.offset = 1.7976931348623157E308;
this.shiftRefType = -1;
this.dataPointNum = -1;
this.numDim = 1;
this.nucleusX = null;
this.nucleusY = "?";
this.freq2dX = NaN;
this.freq2dY = NaN;
this.y2D = NaN;
this.y2DUnits = "";
this.$isHZtoPPM = false;
this.xIncreases = true;
this.continuous = false;
this.xyCoords = null;
this.minX = NaN;
this.minY = NaN;
this.maxX = NaN;
this.maxY = NaN;
this.deltaX = NaN;
this.normalizationFactor = 1;
Clazz.instantialize (this, arguments);
}, JSV.source, "JDXDataObject", JSV.source.JDXHeader);
Clazz.defineMethod (c$, "setInlineData", 
function (data) {
this.inlineData = data;
}, "~S");
Clazz.defineMethod (c$, "getInlineData", 
function () {
return this.inlineData;
});
Clazz.defineMethod (c$, "setFilePath", 
function (filePath) {
if (filePath != null) this.filePathForwardSlash = (this.filePath = filePath.trim ()).$replace ('\\', '/');
}, "~S");
Clazz.defineMethod (c$, "getFilePath", 
function () {
return this.filePath;
});
Clazz.defineMethod (c$, "getFilePathForwardSlash", 
function () {
return this.filePathForwardSlash;
});
Clazz.defineMethod (c$, "setBlockID", 
function (id) {
this.blockID = id;
}, "~N");
Clazz.defineMethod (c$, "isImaginary", 
function () {
return this.varName.contains ("IMAG");
});
Clazz.defineMethod (c$, "setXFactor", 
function (xFactor) {
this.xFactor = xFactor;
}, "~N");
Clazz.defineMethod (c$, "getXFactor", 
function () {
return this.xFactor;
});
Clazz.defineMethod (c$, "setYFactor", 
function (yFactor) {
this.yFactor = yFactor;
}, "~N");
Clazz.defineMethod (c$, "getYFactor", 
function () {
return this.yFactor;
});
Clazz.defineMethod (c$, "checkRequiredTokens", 
function () {
var err = (this.fileFirstX == 1.7976931348623157E308 ? "##FIRSTX" : this.fileLastX == 1.7976931348623157E308 ? "##LASTX" : this.nPointsFile == -1 ? "##NPOINTS" : this.xFactor == 1.7976931348623157E308 ? "##XFACTOR" : this.yFactor == 1.7976931348623157E308 ? "##YFACTOR" : null);
if (err != null) throw  new JSV.exception.JSVException ("Error Reading Data Set: " + err + " not found");
});
Clazz.defineMethod (c$, "setXUnits", 
function (xUnits) {
this.xUnits = xUnits;
}, "~S");
Clazz.defineMethod (c$, "getXUnits", 
function () {
return this.xUnits;
});
Clazz.defineMethod (c$, "setYUnits", 
function (yUnits) {
if (yUnits.equals ("PPM")) yUnits = "ARBITRARY UNITS";
this.yUnits = yUnits;
}, "~S");
Clazz.defineMethod (c$, "getYUnits", 
function () {
return this.yUnits;
});
Clazz.defineMethod (c$, "setXLabel", 
function (value) {
this.xLabel = value;
}, "~S");
Clazz.defineMethod (c$, "setYLabel", 
function (value) {
this.yLabel = value;
}, "~S");
Clazz.defineMethod (c$, "setObservedNucleus", 
function (value) {
this.observedNucl = value;
if (this.numDim == 1) this.parent.nucleusX = this.nucleusX = this.fixNucleus (value);
}, "~S");
Clazz.defineMethod (c$, "setObservedFreq", 
function (observedFreq) {
this.observedFreq = observedFreq;
}, "~N");
Clazz.defineMethod (c$, "getObservedFreq", 
function () {
return this.observedFreq;
});
Clazz.defineMethod (c$, "is1D", 
function () {
return this.numDim == 1;
});
Clazz.defineMethod (c$, "setY2D", 
function (d) {
this.y2D = d;
}, "~N");
Clazz.defineMethod (c$, "getY2D", 
function () {
return this.y2D;
});
Clazz.defineMethod (c$, "setY2DUnits", 
function (units) {
this.y2DUnits = units;
}, "~S");
Clazz.defineMethod (c$, "getY2DPPM", 
function () {
var d = this.y2D;
if (this.y2DUnits.equals ("HZ")) d /= this.freq2dY;
return d;
});
Clazz.defineMethod (c$, "setNucleusAndFreq", 
function (nuc, isX) {
nuc = this.fixNucleus (nuc);
if (isX) this.nucleusX = nuc;
 else this.nucleusY = nuc;
var freq;
if (this.observedNucl.indexOf (nuc) >= 0) {
freq = this.observedFreq;
} else {
var g1 = JSV.source.JDXDataObject.getGyroMagneticRatio (this.observedNucl);
var g2 = JSV.source.JDXDataObject.getGyroMagneticRatio (nuc);
freq = this.observedFreq * g2 / g1;
}if (isX) this.freq2dX = freq;
 else this.freq2dY = freq;
JU.Logger.info ("Freq for " + nuc + " = " + freq);
}, "~S,~B");
Clazz.defineMethod (c$, "fixNucleus", 
 function (nuc) {
return JU.PT.rep (JU.PT.trim (nuc, "[]^<>"), "NUC_", "");
}, "~S");
c$.getGyroMagneticRatio = Clazz.defineMethod (c$, "getGyroMagneticRatio", 
 function (nuc) {
var pt = 0;
while (pt < nuc.length && !Character.isDigit (nuc.charAt (pt))) pt++;

pt = JU.PT.parseInt (nuc.substring (pt));
var i = 0;
for (; i < JSV.source.JDXDataObject.gyroData.length; i += 2) if (JSV.source.JDXDataObject.gyroData[i] >= pt) break;

return (JSV.source.JDXDataObject.gyroData[i] == pt ? JSV.source.JDXDataObject.gyroData[i + 1] : NaN);
}, "~S");
Clazz.defineMethod (c$, "isTransmittance", 
function () {
var s = this.yUnits.toLowerCase ();
return (s.equals ("transmittance") || s.contains ("trans") || s.equals ("t"));
});
Clazz.defineMethod (c$, "isAbsorbance", 
function () {
var s = this.yUnits.toLowerCase ();
return (s.equals ("absorbance") || s.contains ("abs") || s.equals ("a"));
});
Clazz.defineMethod (c$, "canSaveAsJDX", 
function () {
return this.getDataClass ().equals ("XYDATA");
});
Clazz.defineMethod (c$, "canIntegrate", 
function () {
return (this.continuous && (this.isHNMR () || this.isGC ()) && this.is1D ());
});
Clazz.defineMethod (c$, "isAutoOverlayFromJmolClick", 
function () {
return (this.isGC ());
});
Clazz.defineMethod (c$, "isGC", 
function () {
return this.dataType.startsWith ("GC") || this.dataType.startsWith ("GAS");
});
Clazz.defineMethod (c$, "isMS", 
function () {
return this.dataType.startsWith ("MASS") || this.dataType.startsWith ("MS");
});
Clazz.defineMethod (c$, "isStackable", 
function () {
return !this.isMS ();
});
Clazz.defineMethod (c$, "isScalable", 
function () {
return true;
});
Clazz.defineMethod (c$, "getYRef", 
function () {
return (!this.isTransmittance () ? 0.0 : JSV.common.Coordinate.getMaxY (this.xyCoords, 0, this.xyCoords.length - 1) < 2 ? 1.0 : 100.0);
});
Clazz.defineMethod (c$, "isInverted", 
function () {
return this.isTransmittance ();
});
Clazz.defineMethod (c$, "canConvertTransAbs", 
function () {
return (this.continuous && (this.yUnits.toLowerCase ().contains ("abs")) || this.yUnits.toLowerCase ().contains ("trans"));
});
Clazz.defineMethod (c$, "canShowSolutionColor", 
function () {
return (this.isContinuous () && this.canConvertTransAbs () && (this.xUnits.toLowerCase ().contains ("nanometer") || this.xUnits.equalsIgnoreCase ("nm")) && this.getFirstX () < 401 && this.getLastX () > 699 && this.xyCoords.length >= 30);
});
Clazz.defineMethod (c$, "isHZtoPPM", 
function () {
return this.$isHZtoPPM;
});
Clazz.defineMethod (c$, "setHZtoPPM", 
function (val) {
this.$isHZtoPPM = val;
}, "~B");
Clazz.defineMethod (c$, "setIncreasing", 
function (val) {
this.xIncreases = val;
}, "~B");
Clazz.defineMethod (c$, "isXIncreasing", 
function () {
return this.xIncreases;
});
Clazz.defineMethod (c$, "shouldDisplayXAxisIncreasing", 
function () {
var dt = this.dataType.toUpperCase ();
var xu = this.xUnits.toUpperCase ();
if (dt.contains ("NMR") && !(dt.contains ("FID"))) {
return false;
} else if (dt.contains ("LINK") && xu.contains ("CM")) {
return false;
} else if (dt.startsWith ("IR") || dt.contains ("INFRA") && xu.contains ("CM")) {
return false;
} else if (dt.contains ("RAMAN") && xu.contains ("CM")) {
return false;
} else if (dt.contains ("VIS") && xu.contains ("NANOMETERS")) {
return true;
}return this.xIncreases;
});
Clazz.defineMethod (c$, "setContinuous", 
function (val) {
this.continuous = val;
}, "~B");
Clazz.defineMethod (c$, "isContinuous", 
function () {
return this.continuous;
});
Clazz.defineMethod (c$, "getHeaderRowDataAsArray", 
function () {
var n = 8;
if (this.observedFreq != 1.7976931348623157E308) n++;
if (this.observedNucl !== "") n++;
var rowData = this.getHeaderRowDataAsArray (true, n);
var i = rowData.length - n;
if (this.observedFreq != 1.7976931348623157E308) rowData[i++] =  Clazz.newArray (-1, ["##.OBSERVE FREQUENCY", "" + this.observedFreq]);
if (this.observedNucl !== "") rowData[i++] =  Clazz.newArray (-1, ["##.OBSERVE NUCLEUS", this.observedNucl]);
rowData[i++] =  Clazz.newArray (-1, ["##XUNITS", this.$isHZtoPPM ? "HZ" : this.xUnits]);
rowData[i++] =  Clazz.newArray (-1, ["##YUNITS", this.yUnits]);
var x = (this.xIncreases ? this.getFirstX () : this.getLastX ());
rowData[i++] =  Clazz.newArray (-1, ["##FIRSTX", String.valueOf (this.isHZtoPPM () ? x * this.observedFreq : x)]);
x = (this.xIncreases ? this.getLastX () : this.getFirstX ());
rowData[i++] =  Clazz.newArray (-1, ["##FIRSTY", String.valueOf (this.xIncreases ? this.getFirstY () : this.getLastY ())]);
rowData[i++] =  Clazz.newArray (-1, ["##LASTX", String.valueOf (this.isHZtoPPM () ? x * this.observedFreq : x)]);
rowData[i++] =  Clazz.newArray (-1, ["##XFACTOR", String.valueOf (this.getXFactor ())]);
rowData[i++] =  Clazz.newArray (-1, ["##YFACTOR", String.valueOf (this.getYFactor ())]);
rowData[i++] =  Clazz.newArray (-1, ["##NPOINTS", String.valueOf (this.xyCoords.length)]);
return rowData;
});
Clazz.defineMethod (c$, "getDefaultUnitPrecision", 
function () {
return 2;
});
Clazz.defineMethod (c$, "setMeasurementText", 
function (m) {
var dx = m.getValue ();
if (Double.isNaN (dx)) return "";
var precision = 1;
var units = "";
if (this.isNMR ()) {
if (this.numDim == 1) {
var isIntegral = (Clazz.instanceOf (m, JSV.common.Integral));
if (this.isHNMR () || isIntegral) {
if (!isIntegral) {
dx *= this.observedFreq;
units = " Hz";
}} else {
units = " ppm";
precision = 2;
}} else {
return "";
}}return (dx < 0.1 ? "" : JU.DF.formatDecimalDbl (dx, precision) + units);
}, "JSV.common.Measurement");
Clazz.defineMethod (c$, "isNMR", 
function () {
return (this.dataType.toUpperCase ().indexOf ("NMR") >= 0);
});
Clazz.defineMethod (c$, "isHNMR", 
function () {
return (this.isNMR () && this.observedNucl.toUpperCase ().indexOf ("H") >= 0);
});
Clazz.defineMethod (c$, "setXYCoords", 
function (coords) {
this.xyCoords = coords;
}, "~A");
Clazz.defineMethod (c$, "invertYAxis", 
function () {
for (var i = this.xyCoords.length; --i >= 0; ) {
this.xyCoords[i].setYVal (-this.xyCoords[i].getYVal ());
}
var d = this.minY;
this.minY = -this.maxY;
this.maxY = -d;
return this;
});
Clazz.defineMethod (c$, "getFirstX", 
function () {
return this.xyCoords[0].getXVal ();
});
Clazz.defineMethod (c$, "getFirstY", 
function () {
return this.xyCoords[0].getYVal ();
});
Clazz.defineMethod (c$, "getLastX", 
function () {
return this.xyCoords[this.xyCoords.length - 1].getXVal ();
});
Clazz.defineMethod (c$, "getLastY", 
function () {
return this.xyCoords[this.xyCoords.length - 1].getYVal ();
});
Clazz.defineMethod (c$, "getMinX", 
function () {
return (Double.isNaN (this.minX) ? (this.minX = JSV.common.Coordinate.getMinX (this.xyCoords, 0, this.xyCoords.length - 1)) : this.minX);
});
Clazz.defineMethod (c$, "getMinY", 
function () {
return (Double.isNaN (this.minY) ? (this.minY = JSV.common.Coordinate.getMinY (this.xyCoords, 0, this.xyCoords.length - 1)) : this.minY);
});
Clazz.defineMethod (c$, "getMaxX", 
function () {
return (Double.isNaN (this.maxX) ? (this.maxX = JSV.common.Coordinate.getMaxX (this.xyCoords, 0, this.xyCoords.length - 1)) : this.maxX);
});
Clazz.defineMethod (c$, "getMaxY", 
function () {
return (Double.isNaN (this.maxY) ? (this.maxY = JSV.common.Coordinate.getMaxY (this.xyCoords, 0, this.xyCoords.length - 1)) : this.maxY);
});
Clazz.defineMethod (c$, "doNormalize", 
function (max) {
if (!this.isNMR () || !this.is1D ()) return;
this.normalizationFactor = max / this.getMaxY ();
this.maxY = NaN;
JSV.common.Coordinate.applyScale (this.xyCoords, 1, this.normalizationFactor);
JU.Logger.info ("Y values have been scaled by a factor of " + this.normalizationFactor);
}, "~N");
Clazz.defineMethod (c$, "getDeltaX", 
function () {
return (Double.isNaN (this.deltaX) ? (this.deltaX = JSV.common.Coordinate.deltaX (this.getLastX (), this.getFirstX (), this.xyCoords.length)) : this.deltaX);
});
Clazz.defineMethod (c$, "copyTo", 
function (newObj) {
newObj.setTitle (this.title);
newObj.setJcampdx (this.jcampdx);
newObj.setOrigin (this.origin);
newObj.setOwner (this.owner);
newObj.setDataClass (this.dataClass);
newObj.setDataType (this.dataType);
newObj.setHeaderTable (this.headerTable);
newObj.setXFactor (this.xFactor);
newObj.setYFactor (this.yFactor);
newObj.setXUnits (this.xUnits);
newObj.setYUnits (this.yUnits);
newObj.setXLabel (this.xLabel);
newObj.setYLabel (this.yLabel);
newObj.setXYCoords (this.xyCoords);
newObj.setContinuous (this.continuous);
newObj.setIncreasing (this.xIncreases);
newObj.observedFreq = this.observedFreq;
newObj.observedNucl = this.observedNucl;
newObj.offset = this.offset;
newObj.dataPointNum = this.dataPointNum;
newObj.shiftRefType = this.shiftRefType;
newObj.$isHZtoPPM = this.$isHZtoPPM;
newObj.numDim = this.numDim;
newObj.nucleusX = this.nucleusX;
newObj.nucleusY = this.nucleusY;
newObj.freq2dX = this.freq2dX;
newObj.freq2dY = this.freq2dY;
newObj.setFilePath (this.filePath);
newObj.nH = this.nH;
}, "JSV.source.JDXDataObject");
Clazz.defineMethod (c$, "getTypeLabel", 
function () {
return (this.isNMR () ? this.nucleusX + "NMR" : this.dataType);
});
Clazz.defineMethod (c$, "getDefaultAnnotationInfo", 
function (type) {
var s1;
var s2;
var isNMR = this.isNMR ();
switch (type) {
case JSV.common.Annotation.AType.Integration:
return  Clazz.newArray (-1, [null,  Clazz.newIntArray (-1, [1]), null]);
case JSV.common.Annotation.AType.Measurements:
s1 = (isNMR ?  Clazz.newArray (-1, ["Hz", "ppm"]) :  Clazz.newArray (-1, [""]));
s2 = (this.isHNMR () ?  Clazz.newIntArray (-1, [1, 4]) :  Clazz.newIntArray (-1, [1, 3]));
return  Clazz.newArray (-1, [s1, s2, Integer.$valueOf (0)]);
case JSV.common.Annotation.AType.PeakList:
s1 = (isNMR ?  Clazz.newArray (-1, ["Hz", "ppm"]) :  Clazz.newArray (-1, [""]));
s2 = (this.isHNMR () ?  Clazz.newIntArray (-1, [1, 2]) :  Clazz.newIntArray (-1, [1, 1]));
return  Clazz.newArray (-1, [s1, s2, Integer.$valueOf (isNMR ? 1 : 0)]);
case JSV.common.Annotation.AType.NONE:
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
return null;
}, "JSV.common.Annotation.AType");
Clazz.defineMethod (c$, "getPeakListArray", 
function (m, last, maxY) {
var x = m.getXVal ();
var y = m.getYVal ();
if (this.isNMR ()) y /= maxY;
var dx = Math.abs (x - last[0]);
last[0] = x;
var ddx = dx + last[1];
last[1] = dx;
var dddx = ddx + last[2];
last[2] = ddx;
if (this.isNMR ()) {
return  Clazz.newDoubleArray (-1, [x, y, x * this.observedFreq, (dx * this.observedFreq > 20 ? 0 : dx * this.observedFreq), (ddx * this.observedFreq > 20 ? 0 : ddx * this.observedFreq), (dddx * this.observedFreq > 20 ? 0 : dddx * this.observedFreq)]);
}return  Clazz.newDoubleArray (-1, [x, y]);
}, "JSV.common.Measurement,~A,~N");
Clazz.defineStatics (c$,
"ERROR", 1.7976931348623157E308,
"SCALE_NONE", 0,
"SCALE_TOP", 1,
"SCALE_BOTTOM", 2,
"SCALE_TOP_BOTTOM", 3,
"gyroData",  Clazz.newDoubleArray (-1, [1, 42.5774806, 2, 6.53590131, 3, 45.4148, 3, 32.436, 6, 6.2661, 7, 16.5483, 9, 5.9842, 10, 4.5752, 11, 13.663, 13, 10.70839657, 14, 3.07770646, 15, 4.31726570, 17, 5.7742, 19, 40.07757016, 21, 3.3631, 23, 11.26952167, 25, 2.6083, 27, 11.1031, 29, 8.4655, 31, 17.25144090, 33, 3.2717, 35, 4.1765, 37, 3.4765, 37, 5.819, 39, 3.46, 39, 1.9893, 40, 2.4737, 41, 1.0919, 43, 2.8688, 45, 10.3591, 47, 2.4041, 49, 2.4048, 50, 4.2505, 51, 11.2133, 53, 2.4115, 55, 10.5763, 57, 1.3816, 59, 10.077, 61, 3.8114, 63, 11.2982, 65, 12.103, 67, 2.6694, 69, 10.2478, 71, 13.0208, 73, 1.4897, 75, 7.315, 77, 8.1571, 79, 10.7042, 81, 11.5384, 83, 1.6442, 85, 4.1254, 87, 13.9811, 87, 1.8525, 89, 2.0949, 91, 3.9748, 93, 10.4523, 95, 2.7874, 97, 2.8463, 99, 9.6294, 99, 1.9553, 101, 2.1916, 103, 1.3477, 105, 1.957, 107, 1.7331, 109, 1.9924, 111, 9.0692, 113, 9.4871, 113, 9.3655, 115, 9.3856, 115, 14.0077, 117, 15.261, 119, 15.966, 121, 10.2551, 123, 5.5532, 123, 11.2349, 125, 13.5454, 127, 8.5778, 129, 11.8604, 131, 3.5159, 133, 5.6234, 135, 4.2582, 137, 4.7634, 138, 5.6615, 139, 6.0612, 137, 4.88, 139, 5.39, 141, 2.37, 141, 13.0359, 143, 2.319, 145, 1.429, 143, 11.59, 147, 5.62, 147, 1.7748, 149, 14631, 151, 10.5856, 153, 4.6745, 155, 1.312, 157, 1.72, 159, 10.23, 161, 1.4654, 163, 2.0508, 165, 9.0883, 167, 1.2281, 169, 3.531, 171, 7.5261, 173, 2.073, 175, 4.8626, 176, 3.451, 177, 1.7282, 179, 1.0856, 180, 4.087, 181, 5.1627, 183, 1.7957, 185, 9.7176, 187, 9.817, 187, 0.9856, 189, 3.3536, 191, 0.7658, 191, 0.8319, 195, 9.2922, 197, 0.7406, 199, 7.7123, 201, 2.8469, 203, 24.7316, 205, 24.9749, 207, 9.034, 209, 6.963, 209, 11.7, 211, 9.16, 223, 5.95, 223, 1.3746, 225, 11.187, 227, 5.6, 229, 1.4, 231, 10.2, 235, 0.83, 237, 9.57, 239, 3.09, 243, 4.6, 1E100]));
});
