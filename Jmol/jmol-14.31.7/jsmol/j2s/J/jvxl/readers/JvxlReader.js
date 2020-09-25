Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.JvxlXmlReader"], "J.jvxl.readers.JvxlReader", ["java.lang.NullPointerException", "JU.P4", "$.PT", "$.SB", "J.jvxl.data.JvxlCoder", "J.jvxl.readers.VolumeFileReader", "JU.C", "$.Escape", "$.Logger"], function () {
c$ = Clazz.declareType (J.jvxl.readers, "JvxlReader", J.jvxl.readers.JvxlXmlReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.JvxlReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2JXR (sg, br);
this.isXmlFile = false;
this.JVXL_VERSION = "2.0";
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.jvxlFileHeaderBuffer =  new JU.SB ().append (this.skipComments (false));
if (this.line == null || this.line.length == 0) this.line = "Line 1";
this.jvxlFileHeaderBuffer.append (this.line).appendC ('\n');
if (this.rd () == null || this.line.length == 0) this.line = "Line 2";
this.jvxlFileHeaderBuffer.append (this.line).appendC ('\n');
this.jvxlFileHeaderBuffer.append (this.skipComments (false));
var atomLine = this.line;
var tokens = JU.PT.getTokensAt (atomLine, 0);
this.isXLowToHigh = false;
this.negativeAtomCount = true;
this.ac = 0;
if (tokens[0] === "-0") {
} else if (tokens[0].charAt (0) == '+') {
this.isXLowToHigh = true;
this.ac = this.parseIntStr (tokens[0].substring (1));
} else {
this.ac = -this.parseIntStr (tokens[0]);
}if (this.ac == -2147483648) return;
this.volumetricOrigin.set (this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]));
this.isAngstroms = J.jvxl.readers.VolumeFileReader.checkAtomLine (this.isXLowToHigh, this.isAngstroms, null, atomLine, this.jvxlFileHeaderBuffer);
if (!this.isAngstroms) this.volumetricOrigin.scale (0.5291772);
this.readVoxelVector (0);
this.readVoxelVector (1);
this.readVoxelVector (2);
for (var i = 0; i < this.ac; ++i) this.jvxlFileHeaderBuffer.append (this.rd () + "\n");

this.skipComments (true);
JU.Logger.info ("Reading extra JVXL information line: " + this.line);
this.nSurfaces = this.parseIntStr (this.line);
if (!(this.isJvxl = (this.nSurfaces < 0))) return;
this.nSurfaces = -this.nSurfaces;
JU.Logger.info ("jvxl file surfaces: " + this.nSurfaces);
var ich;
if ((ich = this.parseInt ()) == -2147483648) {
JU.Logger.info ("using default edge fraction base and range");
} else {
this.edgeFractionBase = ich;
this.edgeFractionRange = this.parseInt ();
}if ((ich = this.parseInt ()) == -2147483648) {
JU.Logger.info ("using default color fraction base and range");
} else {
this.colorFractionBase = ich;
this.colorFractionRange = this.parseInt ();
}this.cJvxlEdgeNaN = String.fromCharCode (this.edgeFractionBase + this.edgeFractionRange);
this.vertexDataOnly = this.jvxlData.vertexDataOnly = (this.volumetricVectors[0].length () == 0);
});
Clazz.overrideMethod (c$, "jvxlReadFractionData", 
function (type, nPoints) {
var str = "";
try {
while (str.length < nPoints) {
this.rd ();
str += J.jvxl.data.JvxlCoder.jvxlDecompressString (this.line);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Error reading " + type + " data " + e);
throw  new NullPointerException ();
} else {
throw e;
}
}
return str;
}, "~S,~N");
Clazz.overrideMethod (c$, "gotoData", 
function (n, nPoints) {
if (n > 0) JU.Logger.info ("skipping " + n + " data sets, " + nPoints + " points each");
this.vertexDataOnly = this.jvxlData.vertexDataOnly = (nPoints == 0);
for (var i = 0; i < n; i++) {
this.jvxlReadDefinitionLine (true);
JU.Logger.info ("JVXL skipping: jvxlSurfaceDataCount=" + this.surfaceDataCount + " jvxlEdgeDataCount=" + this.edgeDataCount + " jvxlDataIsColorMapped=" + this.jvxlDataIsColorMapped);
this.jvxlSkipData (nPoints, true);
}
this.jvxlReadDefinitionLine (true);
}, "~N,~N");
Clazz.defineMethod (c$, "jvxlReadDefinitionLine", 
 function (showMsg) {
var comment = this.skipComments (true);
if (showMsg) JU.Logger.info ("reading jvxl data set: " + comment + this.line);
this.haveContourData = (comment.indexOf ("+contourlines") >= 0);
this.jvxlCutoff = this.parseFloatStr (this.line);
JU.Logger.info ("JVXL read: cutoff " + this.jvxlCutoff);
var param1 = this.parseInt ();
var param2 = this.parseInt ();
var param3 = this.parseInt ();
if (param3 == -2147483648 || param3 == -1) param3 = 0;
if (param1 == -1) {
try {
this.params.thePlane = JU.P4.new4 (this.parseFloat (), this.parseFloat (), this.parseFloat (), this.parseFloat ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Error reading 4 floats for PLANE definition -- setting to 0 0 1 0  (z=0)");
this.params.thePlane = JU.P4.new4 (0, 0, 1, 0);
} else {
throw e;
}
}
JU.Logger.info ("JVXL read: plane " + this.params.thePlane);
if (param2 == -1 && param3 < 0) param3 = -param3;
} else {
this.params.thePlane = null;
}if (param1 < 0 && param2 != -1) {
this.params.isContoured = (param3 != 0);
var nContoursRead = this.parseInt ();
if (nContoursRead == -2147483648) {
if (this.line.charAt (this.next[0]) == '[') {
this.jvxlData.contourValues = this.params.contoursDiscrete = this.parseFloatArray (null, null, null);
JU.Logger.info ("JVXL read: contourValues " + JU.Escape.eAF (this.jvxlData.contourValues));
this.jvxlData.contourColixes = this.params.contourColixes = JU.C.getColixArray (this.getQuotedStringNext ());
this.jvxlData.contourColors = JU.C.getHexCodes (this.jvxlData.contourColixes);
JU.Logger.info ("JVXL read: contourColixes " + this.jvxlData.contourColors);
this.params.nContours = this.jvxlData.contourValues.length;
}} else {
if (nContoursRead < 0) {
nContoursRead = -1 - nContoursRead;
this.params.contourFromZero = false;
}if (nContoursRead != 0 && this.params.nContours == 0) {
this.params.nContours = nContoursRead;
JU.Logger.info ("JVXL read: contours " + this.params.nContours);
}}} else {
this.params.isContoured = false;
}this.jvxlData.isJvxlPrecisionColor = (param1 == -1 && param2 == -2 || param3 < 0);
this.params.isBicolorMap = (param1 > 0 && param2 < 0);
this.jvxlDataIsColorMapped = (param3 != 0);
if (this.jvxlDataIsColorMapped) this.jvxlData.colorScheme = "RGB";
this.jvxlDataIs2dContour = (this.jvxlDataIsColorMapped && this.params.isContoured);
if (this.params.isBicolorMap || this.params.colorBySign) this.jvxlCutoff = 0;
this.surfaceDataCount = (param1 < -1 ? -1 - param1 : param1 > 0 ? param1 : 0);
if (param1 == -1) this.edgeDataCount = 0;
 else this.edgeDataCount = (param2 < -1 ? -param2 : param2 > 0 ? param2 : 0);
this.colorDataCount = (this.params.isBicolorMap ? -param2 : param3 < -1 ? -param3 : param3 > 0 ? param3 : 0);
if (this.params.colorBySign) this.params.isBicolorMap = true;
var dataMin = NaN;
var dataMax = NaN;
var red = NaN;
var blue = NaN;
var insideOut = (this.line.indexOf ("insideOut") >= 0);
if (this.jvxlDataIsColorMapped) {
dataMin = this.parseFloat ();
dataMax = this.parseFloat ();
red = this.parseFloat ();
blue = this.parseFloat ();
}this.jvxlSetColorRanges (dataMin, dataMax, red, blue, insideOut);
}, "~B");
Clazz.overrideMethod (c$, "readSurfaceData", 
function (isMapDataIgnored) {
this.thisInside = !this.params.isContoured;
if (!this.readSurfaceDataXML ()) this.readSurfaceDataJXR ();
}, "~B");
Clazz.overrideMethod (c$, "jvxlSkipData", 
function (nPoints, doSkipColorData) {
if (this.surfaceDataCount > 0) this.jvxlSkipDataBlock (nPoints, true);
if (this.edgeDataCount > 0) this.jvxlSkipDataBlock (this.edgeDataCount, false);
if (this.jvxlDataIsColorMapped && doSkipColorData) this.jvxlSkipDataBlock (this.colorDataCount, false);
}, "~N,~B");
Clazz.defineMethod (c$, "jvxlSkipDataBlock", 
 function (nPoints, isInt) {
var n = 0;
while (n < nPoints) {
this.rd ();
n += (isInt ? this.countData (this.line) : J.jvxl.data.JvxlCoder.jvxlDecompressString (this.line).length);
}
}, "~N,~B");
Clazz.defineMethod (c$, "countData", 
 function (str) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var count = 0;
var n = this.parseIntStr (str);
while (n != -2147483648) {
count += n;
n = this.parseIntNext (str);
}
return count;
}, "~S");
});
