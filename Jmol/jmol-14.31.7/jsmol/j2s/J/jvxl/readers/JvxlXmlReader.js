Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.VolumeFileReader"], "J.jvxl.readers.JvxlXmlReader", ["java.lang.Float", "$.NullPointerException", "java.util.Hashtable", "JU.AU", "$.BS", "$.CU", "$.Lst", "$.P3", "$.P4", "$.PT", "$.SB", "J.jvxl.data.JvxlCoder", "$.MeshData", "J.jvxl.readers.XmlReader", "J.shapesurface.IsosurfaceMesh", "JU.C", "$.ColorEncoder", "$.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.JVXL_VERSION = "2.3";
this.surfaceDataCount = 0;
this.edgeDataCount = 0;
this.colorDataCount = 0;
this.excludedTriangleCount = 0;
this.excludedVertexCount = 0;
this.invalidatedVertexCount = 0;
this.haveContourData = false;
this.xr = null;
this.isXmlFile = true;
this.thisInside = false;
this.tempDataXml = null;
this.bsVoxelBitSet = null;
this.includeValueNaN = true;
this.valueCount = 0;
this.valueMin = NaN;
this.valueRange = NaN;
this.fractionPtr = 0;
this.colorPtr = 0;
this.strFractionTemp = "";
this.haveReadColorData = false;
this.jvxlColorEncodingRead = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "JvxlXmlReader", J.jvxl.readers.VolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.JvxlXmlReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2JXR (sg, br);
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "init2JXR", 
function (sg, br) {
this.init2VFR (sg, br);
this.jvxlData.wasJvxl = this.isJvxl = true;
this.isXLowToHigh = this.canDownsample = false;
this.xr =  new J.jvxl.readers.XmlReader (br);
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readVolumeData", 
function (isMapData) {
if (!this.readVolumeDataVFR (isMapData)) return false;
this.strFractionTemp = this.jvxlEdgeDataRead;
this.fractionPtr = 0;
return true;
}, "~B");
Clazz.overrideMethod (c$, "gotoAndReadVoxelData", 
function (isMapData) {
this.initializeVolumetricData ();
if (this.nPointsX < 0 || this.nPointsY < 0 || this.nPointsZ < 0) return true;
try {
this.gotoData (this.params.fileIndex - 1, this.nPointsX * this.nPointsY * this.nPointsZ);
if (this.vertexDataOnly) return true;
this.volumeData.setMappingPlane (this.params.thePlane);
this.readSurfaceData (isMapData);
this.volumeData.setMappingPlane (null);
if (this.edgeDataCount > 0) this.jvxlEdgeDataRead = this.jvxlReadFractionData ("edge", this.edgeDataCount);
this.params.bsExcluded = this.jvxlData.jvxlExcluded =  new Array (4);
this.hasColorData = (this.colorDataCount > 0);
if (this.hasColorData) this.jvxlColorDataRead = this.jvxlReadFractionData ("color", this.colorDataCount);
if (this.excludedVertexCount > 0) {
this.jvxlData.jvxlExcluded[0] = J.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlExcludedVertexData", null, false, false));
if (this.xr.isNext ("jvxlExcludedPlaneData")) this.jvxlData.jvxlExcluded[2] = J.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlExcludedPlaneData", null, false, false));
}if (this.excludedTriangleCount > 0) this.jvxlData.jvxlExcluded[3] = J.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlExcludedTriangleData", null, false, false));
if (this.invalidatedVertexCount > 0) this.jvxlData.jvxlExcluded[1] = J.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlInvalidatedVertexData", null, false, false));
if (this.haveContourData) this.jvxlDecodeContourData (this.jvxlData, this.xr.getXmlData ("jvxlContourData", null, false, false));
if (this.jvxlDataIsColorMapped && this.jvxlData.nVertexColors > 0) {
this.jvxlData.vertexColorMap =  new java.util.Hashtable ();
var vdata = this.xr.getXmlData ("jvxlVertexColorData", null, true, false);
var baseColor = J.jvxl.readers.XmlReader.getXmlAttrib (vdata, "baseColor");
this.jvxlData.baseColor = (baseColor.length > 0 ? baseColor : null);
for (var i = 0; i < this.jvxlData.nVertexColors; i++) {
var s = this.xr.getXmlData ("jvxlColorMap", vdata, true, false);
var color = J.jvxl.readers.XmlReader.getXmlAttrib (s, "color");
var bs = J.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlColorMap", s, false, false));
this.jvxlData.vertexColorMap.put (color, bs);
}
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error (e.toString ());
return false;
} else {
throw e;
}
}
return true;
}, "~B");
Clazz.overrideMethod (c$, "readParameters", 
function () {
var s = this.xr.getXmlData ("jvxlFileTitle", null, false, false);
this.jvxlFileHeaderBuffer = JU.SB.newS (s == null ? "" : s);
this.xr.toTag ("jvxlVolumeData");
var data = this.tempDataXml = this.xr.getXmlData ("jvxlVolumeData", null, true, false);
this.volumetricOrigin.setT (this.xr.getXmlPoint (data, "origin"));
this.isAngstroms = true;
this.readVector (0);
this.readVector (1);
this.readVector (2);
this.line = this.xr.toTag ("jvxlSurfaceSet");
this.nSurfaces = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (this.line, "count"));
JU.Logger.info ("jvxl file surfaces: " + this.nSurfaces);
JU.Logger.info ("using default edge fraction base and range");
JU.Logger.info ("using default color fraction base and range");
this.cJvxlEdgeNaN = String.fromCharCode (this.edgeFractionBase + this.edgeFractionRange);
});
Clazz.defineMethod (c$, "readVector", 
function (voxelVectorIndex) {
var data = this.xr.getXmlData ("jvxlVolumeVector", this.tempDataXml, true, true);
this.tempDataXml = this.tempDataXml.substring (this.tempDataXml.indexOf (data) + data.length);
var n = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "count"));
if (n == -2147483648) this.vertexDataOnly = true;
this.voxelCounts[voxelVectorIndex] = (n < 0 ? 0 : n);
this.volumetricVectors[voxelVectorIndex].setT (this.xr.getXmlPoint (data, "vector"));
if (this.isAnisotropic) this.setVectorAnisotropy (this.volumetricVectors[voxelVectorIndex]);
}, "~N");
Clazz.overrideMethod (c$, "gotoData", 
function (n, nPoints) {
if (n > 0) JU.Logger.info ("skipping " + n + " data sets, " + nPoints + " points each");
this.vertexDataOnly = this.jvxlData.vertexDataOnly = (nPoints == 0);
for (var i = 0; i < n; i++) {
this.jvxlSkipData (nPoints, true);
}
this.xr.toTag ("jvxlSurface");
this.jvxlReadSurfaceInfo ();
}, "~N,~N");
Clazz.defineMethod (c$, "jvxlSkipData", 
function (nPoints, doSkipColorData) {
this.rd ();
this.xr.skipTag ("jvxlSurface");
}, "~N,~B");
Clazz.defineMethod (c$, "jvxlReadSurfaceInfo", 
function () {
var s;
var data = this.xr.getXmlData ("jvxlSurfaceInfo", null, true, true);
this.isXLowToHigh = J.jvxl.readers.XmlReader.getXmlAttrib (data, "isXLowToHigh").equals ("true");
this.jvxlCutoff = this.parseFloatStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "cutoff"));
if (!Float.isNaN (this.jvxlCutoff)) JU.Logger.info ("JVXL read: cutoff " + this.jvxlCutoff);
var nContourData = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "nContourData"));
this.haveContourData = (nContourData > 0);
this.params.isContoured = this.jvxlData.isModelConnected = J.jvxl.readers.XmlReader.getXmlAttrib (data, "contoured").equals ("true");
this.params.isModelConnected = J.jvxl.readers.XmlReader.getXmlAttrib (data, "isModelConnected").equals ("true");
if (this.params.isContoured) {
var nContoursRead = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "nContours"));
if (nContoursRead <= 0) {
nContoursRead = 0;
} else {
if (this.params.thisContour < 0) this.params.thisContour = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "thisContour"));
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "contourValues");
if (s.length > 0) {
s = s.$replace ('[', ' ').$replace (']', ' ');
this.jvxlData.contourValues = this.params.contoursDiscrete = this.parseFloatArrayStr (s);
JU.Logger.info ("JVXL read: contourValues " + JU.Escape.eAF (this.jvxlData.contourValues));
}s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "contourColors");
if (s.length > 0) {
this.jvxlData.contourColixes = this.params.contourColixes = JU.C.getColixArray (s);
this.jvxlData.contourColors = JU.C.getHexCodes (this.jvxlData.contourColixes);
JU.Logger.info ("JVXL read: contourColixes " + JU.C.getHexCodes (this.jvxlData.contourColixes));
}this.params.contourFromZero = J.jvxl.readers.XmlReader.getXmlAttrib (data, "contourFromZero").equals ("true");
}this.params.nContours = (this.haveContourData ? nContourData : nContoursRead);
}this.jvxlData.nVertexColors = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "nVertexColors"));
this.params.isBicolorMap = J.jvxl.readers.XmlReader.getXmlAttrib (data, "bicolorMap").equals ("true");
if (this.params.isBicolorMap) {
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "colorPositive");
if (s.length > 0 && this.params.colorRgb == -2147483648 && this.params.colorPos == -16776961) this.params.colorPos = JU.CU.getArgbFromString (s);
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "colorNegative");
if (s.length > 0 && this.params.colorRgb == -2147483648 && this.params.colorNeg == -65536) this.params.colorNeg = JU.CU.getArgbFromString (s);
}if (this.params.isBicolorMap || this.params.colorBySign) this.jvxlCutoff = 0;
this.jvxlDataIsColorMapped = ((this.params.colorRgb == -2147483648 || this.params.colorRgb == 2147483647) && (this.params.isBicolorMap || J.jvxl.readers.XmlReader.getXmlAttrib (data, "colorMapped").equals ("true")));
this.jvxlData.isJvxlPrecisionColor = J.jvxl.readers.XmlReader.getXmlAttrib (data, "precisionColor").equals ("true");
this.jvxlData.jvxlDataIsColorDensity = this.params.colorDensity = (this.params.colorRgb == -2147483648 && J.jvxl.readers.XmlReader.getXmlAttrib (data, "colorDensity").equals ("true"));
if (this.jvxlData.jvxlDataIsColorDensity && Float.isNaN (this.params.pointSize)) {
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "pointSize");
if (s.length > 0) this.jvxlData.pointSize = this.params.pointSize = this.parseFloatStr (s);
}s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "allowVolumeRender");
this.jvxlData.allowVolumeRender = this.params.allowVolumeRender = (s.length == 0 || s.equalsIgnoreCase ("true"));
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "plane");
if (s.indexOf ("{") >= 0) {
this.params.thePlane = null;
this.params.mapLattice = null;
try {
this.params.thePlane = JU.Escape.uP (s);
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "maplattice");
JU.Logger.info ("JVXL read: plane " + this.params.thePlane);
if (s.indexOf ("{") >= 0) {
this.params.mapLattice = JU.Escape.uP (s);
JU.Logger.info ("JVXL read: mapLattice " + this.params.mapLattice);
}if (this.params.scale3d == 0) this.params.scale3d = this.parseFloatStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "scale3d"));
if (Float.isNaN (this.params.scale3d)) this.params.scale3d = 0;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (this.params.thePlane == null) {
JU.Logger.error ("JVXL Error reading plane definition -- setting to 0 0 1 0  (z=0)");
this.params.thePlane = JU.P4.new4 (0, 0, 1, 0);
} else {
JU.Logger.error ("JVXL Error reading mapLattice definition -- ignored");
}} else {
throw e;
}
}
this.surfaceDataCount = 0;
this.edgeDataCount = 0;
} else {
this.params.thePlane = null;
this.surfaceDataCount = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "nSurfaceInts"));
this.edgeDataCount = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "nBytesUncompressedEdgeData"));
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "fixedLattice");
if (s.indexOf ("{") >= 0) this.jvxlData.fixedLattice = JU.Escape.uP (s);
}this.excludedVertexCount = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "nExcludedVertexes"));
this.excludedTriangleCount = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "nExcludedTriangles"));
this.invalidatedVertexCount = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "nInvalidatedVertexes"));
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "slabInfo");
if (s.length > 0) this.jvxlData.slabInfo = s;
this.colorDataCount = Math.max (0, this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "nBytesUncompressedColorData")));
this.jvxlDataIs2dContour = (this.params.thePlane != null && this.jvxlDataIsColorMapped);
this.jvxlData.color = J.jvxl.readers.XmlReader.getXmlAttrib (data, "color");
if (this.jvxlData.color.length == 0 || this.jvxlData.color.indexOf ("null") >= 0) this.jvxlData.color = "orange";
this.jvxlData.translucency = this.parseFloatStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "translucency"));
if (Float.isNaN (this.jvxlData.translucency)) this.jvxlData.translucency = 0;
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "meshColor");
if (s.length > 0) this.jvxlData.meshColor = s;
s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "rendering");
if (s.length > 0) this.jvxlData.rendering = s;
this.jvxlData.colorScheme = J.jvxl.readers.XmlReader.getXmlAttrib (data, "colorScheme");
if (this.jvxlData.colorScheme.length == 0) this.jvxlData.colorScheme = (this.jvxlDataIsColorMapped ? "roygb" : null);
if (this.jvxlData.thisSet < 0) {
var n = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "set"));
if (n > 0) this.jvxlData.thisSet = n - 1;
}this.jvxlData.slabValue = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "slabValue"));
this.jvxlData.isSlabbable = (J.jvxl.readers.XmlReader.getXmlAttrib (data, "slabbable").equalsIgnoreCase ("true"));
this.jvxlData.diameter = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "diameter"));
if (this.jvxlData.diameter == -2147483648) this.jvxlData.diameter = 0;
if (this.jvxlDataIs2dContour) this.params.isContoured = true;
if (this.params.colorBySign) this.params.isBicolorMap = true;
var insideOut = J.jvxl.readers.XmlReader.getXmlAttrib (data, "insideOut").equals ("true");
var dataMin = NaN;
var dataMax = NaN;
var red = NaN;
var blue = NaN;
if (this.jvxlDataIsColorMapped) {
dataMin = this.parseFloatStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "dataMinimum"));
dataMax = this.parseFloatStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "dataMaximum"));
red = this.parseFloatStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "valueMappedToRed"));
blue = this.parseFloatStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "valueMappedToBlue"));
if (Float.isNaN (dataMin)) {
dataMin = red = -1.0;
dataMax = blue = 1;
}}this.jvxlSetColorRanges (dataMin, dataMax, red, blue, insideOut);
});
Clazz.defineMethod (c$, "jvxlSetColorRanges", 
function (dataMin, dataMax, red, blue, insideOut) {
if (this.jvxlDataIsColorMapped) {
if (!Float.isNaN (dataMin) && !Float.isNaN (dataMax)) {
if (dataMax == 0 && dataMin == 0) {
dataMin = -1;
dataMax = 1;
}this.params.mappedDataMin = dataMin;
this.params.mappedDataMax = dataMax;
JU.Logger.info ("JVXL read: data_min/max " + this.params.mappedDataMin + "/" + this.params.mappedDataMax);
}if (!this.params.rangeDefined) if (!Float.isNaN (red) && !Float.isNaN (blue)) {
if (red == 0 && blue == 0) {
red = -1;
blue = 1;
}this.params.valueMappedToRed = Math.min (red, blue);
this.params.valueMappedToBlue = Math.max (red, blue);
this.params.isColorReversed = (red > blue);
this.params.rangeDefined = true;
} else {
this.params.valueMappedToRed = 0;
this.params.valueMappedToBlue = 1;
this.params.rangeDefined = true;
}JU.Logger.info ("JVXL read: color red/blue: " + this.params.valueMappedToRed + "/" + this.params.valueMappedToBlue);
}this.jvxlData.valueMappedToRed = this.params.valueMappedToRed;
this.jvxlData.valueMappedToBlue = this.params.valueMappedToBlue;
this.jvxlData.mappedDataMin = this.params.mappedDataMin;
this.jvxlData.mappedDataMax = this.params.mappedDataMax;
this.jvxlData.isColorReversed = this.params.isColorReversed;
if (this.params.insideOut) insideOut = !insideOut;
this.params.insideOut = this.jvxlData.insideOut = insideOut;
}, "~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "readSurfaceData", 
function (isMapDataIgnored) {
this.thisInside = !this.params.isContoured;
if (this.readSurfaceDataXML ()) return;
this.tempDataXml = this.xr.getXmlData ("jvxlEdgeData", null, true, false);
this.bsVoxelBitSet = J.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlEdgeData", this.tempDataXml, false, false));
this.readSurfaceDataJXR ();
}, "~B");
Clazz.defineMethod (c$, "readSurfaceDataXML", 
function () {
if (this.vertexDataOnly) {
this.getEncodedVertexData ();
return true;
}if (this.params.thePlane != null) {
this.volumeData.setDataDistanceToPlane (this.params.thePlane);
this.setVolumeDataV (this.volumeData);
this.params.cutoff = 0;
this.jvxlData.setSurfaceInfo (this.params.thePlane, this.params.mapLattice, 0, "");
this.jvxlData.scale3d = this.params.scale3d;
return true;
}return false;
});
Clazz.defineMethod (c$, "readSurfaceDataJXR", 
function () {
this.readSurfaceDataVFR (false);
this.volumeData.setMappingPlane (null);
});
Clazz.defineMethod (c$, "jvxlReadFractionData", 
function (type, nPoints) {
var str;
try {
if (type.equals ("edge")) {
str = J.jvxl.data.JvxlCoder.jvxlDecompressString (J.jvxl.readers.XmlReader.getXmlAttrib (this.tempDataXml, "data"));
} else {
var data = this.xr.getXmlData ("jvxlColorData", null, true, false);
this.jvxlData.isJvxlPrecisionColor = J.jvxl.readers.JvxlXmlReader.getEncoding (data).endsWith ("2");
str = J.jvxl.data.JvxlCoder.jvxlDecompressString (J.jvxl.readers.XmlReader.getXmlAttrib (data, "data"));
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Error reading " + type + " data " + e);
throw  new NullPointerException ();
} else {
throw e;
}
}
return str;
}, "~S,~N");
Clazz.overrideMethod (c$, "getVoxelBitSet", 
function (nPoints) {
if (this.bsVoxelBitSet != null) return this.bsVoxelBitSet;
var bs =  new JU.BS ();
var bsVoxelPtr = 0;
if (this.surfaceDataCount <= 0) return bs;
var nThisValue = 0;
while (bsVoxelPtr < nPoints) {
nThisValue = this.parseInt ();
if (nThisValue == -2147483648) {
this.rd ();
if (this.line == null || (nThisValue = this.parseIntStr (this.line)) == -2147483648) {
if (!this.endOfData) JU.Logger.error ("end of file in JvxlReader?" + " line=" + this.line);
this.endOfData = true;
nThisValue = 10000;
}}this.thisInside = !this.thisInside;
++this.jvxlNSurfaceInts;
if (this.thisInside) bs.setBits (bsVoxelPtr, bsVoxelPtr + nThisValue);
bsVoxelPtr += nThisValue;
}
return bs;
}, "~N");
Clazz.overrideMethod (c$, "getSurfacePointAndFraction", 
function (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn) {
if (this.edgeDataCount <= 0) return this.getSPFv (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn);
ptReturn.scaleAdd2 (fReturn[0] = this.jvxlGetNextFraction (this.edgeFractionBase, this.edgeFractionRange, 0.5), edgeVector, pointA);
if (Float.isNaN (this.valueMin)) this.setValueMinMax ();
return (this.valueCount == 0 || this.includeValueNaN && Float.isNaN (fReturn[0]) ? fReturn[0] : this.getNextValue ());
}, "~N,~B,~N,~N,JU.T3,JU.V3,~N,~N,~N,~N,~N,~A,JU.T3");
Clazz.defineMethod (c$, "getNextValue", 
 function () {
var fraction = NaN;
while (this.colorPtr < this.valueCount && Float.isNaN (fraction)) {
if (this.jvxlData.isJvxlPrecisionColor) {
fraction = J.jvxl.data.JvxlCoder.jvxlFractionFromCharacter2 (this.jvxlColorDataRead.charCodeAt (this.colorPtr), this.jvxlColorDataRead.charCodeAt ((this.colorPtr++) + this.valueCount), this.colorFractionBase, this.colorFractionRange);
} else {
fraction = J.jvxl.data.JvxlCoder.jvxlFractionFromCharacter (this.jvxlColorDataRead.charCodeAt (this.colorPtr++), this.colorFractionBase, this.colorFractionRange, 0.5);
}break;
}
return this.valueMin + fraction * this.valueRange;
});
Clazz.defineMethod (c$, "setValueMinMax", 
 function () {
this.valueCount = this.jvxlColorDataRead.length;
if (this.jvxlData.isJvxlPrecisionColor) this.valueCount /= 2;
this.includeValueNaN = (this.valueCount != this.jvxlEdgeDataRead.length);
this.valueMin = (!this.jvxlData.isJvxlPrecisionColor ? this.params.valueMappedToRed : this.params.mappedDataMin == 3.4028235E38 ? 0.0 : this.params.mappedDataMin);
this.valueRange = (!this.jvxlData.isJvxlPrecisionColor ? this.params.valueMappedToBlue : this.params.mappedDataMin == 3.4028235E38 ? 1.0 : this.params.mappedDataMax) - this.valueMin;
this.haveReadColorData = true;
});
Clazz.defineMethod (c$, "jvxlGetNextFraction", 
 function (base, range, fracOffset) {
if (this.fractionPtr >= this.strFractionTemp.length) {
if (!this.endOfData) JU.Logger.error ("end of file reading compressed fraction data");
this.endOfData = true;
this.strFractionTemp = "" + String.fromCharCode (base);
this.fractionPtr = 0;
}return J.jvxl.data.JvxlCoder.jvxlFractionFromCharacter (this.strFractionTemp.charCodeAt (this.fractionPtr++), base, range, fracOffset);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "readColorData", 
function () {
if (!this.jvxlDataIsColorMapped) return "";
var vertexCount = this.jvxlData.vertexCount = this.meshData.vc;
var colixes = this.meshData.vcs;
var vertexValues = this.meshData.vvs;
if ("none".equals (this.jvxlColorEncodingRead)) {
this.jvxlData.vertexColors =  Clazz.newIntArray (vertexCount, 0);
var nextc =  Clazz.newIntArray (1, 0);
var n = JU.PT.parseIntNext (this.jvxlColorDataRead, nextc);
n = Math.min (n, vertexCount);
var tokens = JU.PT.getTokens (this.jvxlColorDataRead.substring (nextc[0]));
var haveTranslucent = false;
var trans = this.jvxlData.translucency;
var lastColor = 0;
for (var i = 0; i < n; i++) try {
var c = J.jvxl.readers.JvxlXmlReader.getColor (tokens[i]);
if (c == 0) c = lastColor;
 else lastColor = c;
colixes[i] = JU.C.getColixTranslucent (this.jvxlData.vertexColors[i] = c);
if (JU.C.isColixTranslucent (colixes[i])) haveTranslucent = true;
 else if (trans != 0) colixes[i] = JU.C.getColixTranslucent3 (colixes[i], true, trans);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.info ("JvxlXmlReader: Cannot interpret color code: " + tokens[i]);
} else {
throw e;
}
}

if (haveTranslucent && trans == 0) {
this.jvxlData.translucency = 0.5;
}return "-";
}if (this.params.colorEncoder == null) this.params.colorEncoder =  new JU.ColorEncoder (null, null);
this.params.colorEncoder.setColorScheme (null, false);
this.params.colorEncoder.setRange (this.params.valueMappedToRed, this.params.valueMappedToBlue, this.params.isColorReversed);
JU.Logger.info ("JVXL reading color data mapped min/max: " + this.params.mappedDataMin + "/" + this.params.mappedDataMax + " for " + vertexCount + " vertices." + " using encoding keys " + this.colorFractionBase + " " + this.colorFractionRange);
JU.Logger.info ("mapping red-->blue for " + this.params.valueMappedToRed + " to " + this.params.valueMappedToBlue + " colorPrecision:" + this.jvxlData.isJvxlPrecisionColor);
var getValues = (Float.isNaN (this.valueMin));
if (getValues) this.setValueMinMax ();
var contourPlaneMinimumValue = 3.4028235E38;
var contourPlaneMaximumValue = -3.4028235E38;
if (colixes == null || colixes.length < vertexCount) this.meshData.vcs = colixes =  Clazz.newShortArray (vertexCount, 0);
var colixNeg = 0;
var colixPos = 0;
if (this.params.colorBySign) {
colixPos = JU.C.getColix (this.params.isColorReversed ? this.params.colorNeg : this.params.colorPos);
colixNeg = JU.C.getColix (this.params.isColorReversed ? this.params.colorPos : this.params.colorNeg);
}var vertexIncrement = this.meshData.vertexIncrement;
var needContourMinMax = (this.params.mappedDataMin == 3.4028235E38);
for (var i = 0; i < vertexCount; i += vertexIncrement) {
var value;
if (getValues) value = vertexValues[i] = this.getNextValue ();
 else value = vertexValues[i];
if (needContourMinMax) {
if (value < contourPlaneMinimumValue) contourPlaneMinimumValue = value;
if (value > contourPlaneMaximumValue) contourPlaneMaximumValue = value;
}}
if (needContourMinMax) {
this.params.mappedDataMin = contourPlaneMinimumValue;
this.params.mappedDataMax = contourPlaneMaximumValue;
}if (this.jvxlData.colorScheme != null) {
var setContourValue = (this.marchingSquares != null && this.params.isContoured);
for (var i = 0; i < vertexCount; i += vertexIncrement) {
var value = vertexValues[i];
if (setContourValue) {
this.marchingSquares.setContourData (i, value);
continue;
}var colix = (!this.params.colorBySign ? this.params.colorEncoder.getColorIndex (value) : (this.params.isColorReversed ? value > 0 : value <= 0) ? colixNeg : colixPos);
colixes[i] = JU.C.getColixTranslucent3 (colix, true, this.jvxlData.translucency);
}
}return this.jvxlColorDataRead + "\n";
});
c$.getColor = Clazz.defineMethod (c$, "getColor", 
 function (c) {
var n = 0;
try {
switch (c.charAt (0)) {
case '[':
n = JU.CU.getArgbFromString (c);
break;
case '0':
n = JU.PT.parseIntRadix (c.substring (2), 16);
break;
default:
n = JU.PT.parseIntRadix (c, 10);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return n;
}, "~S");
Clazz.defineMethod (c$, "getEncodedVertexData", 
function () {
var sdata = this.xr.getXmlData ("jvxlSurfaceData", null, true, false);
this.jvxlDecodeVertexData (this.xr.getXmlData ("jvxlVertexData", sdata, true, false), false);
var tData = this.xr.getXmlData ("jvxlTriangleData", sdata, true, false);
var edgeData = this.xr.getXmlData ("jvxlTriangleEdgeData", sdata, true, false);
var polygonColorData = this.xr.getXmlData ("jvxlPolygonColorData", sdata, false, false);
this.jvxlDecodeTriangleData (tData, edgeData, polygonColorData);
var cData = this.xr.getXmlData ("jvxlColorData", sdata, true, false);
this.jvxlColorEncodingRead = J.jvxl.readers.JvxlXmlReader.getEncoding (cData);
this.jvxlData.isJvxlPrecisionColor = this.jvxlColorEncodingRead.endsWith ("2");
cData = this.getData (cData, "jvxlColorData");
this.jvxlColorDataRead = (this.jvxlColorEncodingRead.equals ("none") ? cData : J.jvxl.data.JvxlCoder.jvxlDecompressString (cData));
this.jvxlDataIsColorMapped = ((this.params.colorRgb == -2147483648 || this.params.colorRgb == 2147483647) && this.jvxlColorDataRead.length > 0);
if (this.haveContourData) this.jvxlDecodeContourData (this.jvxlData, this.xr.getXmlData ("jvxlContourData", null, false, false));
});
Clazz.defineMethod (c$, "getData", 
 function (sdata, name) {
var data = J.jvxl.readers.XmlReader.getXmlAttrib (sdata, "data");
if (data.length == 0) data = this.xr.getXmlData (name, sdata, false, false);
return data;
}, "~S,~S");
c$.getEncoding = Clazz.defineMethod (c$, "getEncoding", 
 function (data) {
if (J.jvxl.readers.XmlReader.getXmlAttrib (data, "len").length > 0) return "";
var s = J.jvxl.readers.XmlReader.getXmlAttrib (data, "encoding");
return (s.length == 0 ? "none" : s);
}, "~S");
Clazz.defineMethod (c$, "jvxlDecodeVertexData", 
function (data, asArray) {
var vertexCount = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (data, "count"));
if (!asArray) JU.Logger.info ("Reading " + vertexCount + " vertices");
var ptCount = vertexCount * 3;
var vertices = (asArray ?  new Array (vertexCount) : null);
var fraction;
var vData = J.jvxl.readers.XmlReader.getXmlAttrib (data, "data");
var encoding = J.jvxl.readers.JvxlXmlReader.getEncoding (data);
if ("none".equals (encoding)) {
if (vData.length == 0) vData = this.xr.getXmlData ("jvxlVertexData", data, false, false);
var fdata = JU.PT.parseFloatArray (vData);
if (fdata[0] != vertexCount * 3) JU.Logger.info ("JvxlXmlReader: vertexData count=" + (Clazz.floatToInt (fdata[0])) + "; expected " + (vertexCount * 3));
for (var i = 0, pt = 1; i < vertexCount; i++) {
var p = JU.P3.new3 (fdata[pt++], fdata[pt++], fdata[pt++]);
if (asArray) vertices[i] = p;
 else this.addVertexCopy (p, 0, i, false);
}
} else {
var min = this.xr.getXmlPoint (data, "min");
var range = this.xr.getXmlPoint (data, "max");
range.sub (min);
var colorFractionBase = this.jvxlData.colorFractionBase;
var colorFractionRange = this.jvxlData.colorFractionRange;
var s = J.jvxl.data.JvxlCoder.jvxlDecompressString (vData);
if (s.length == 0) s = this.xr.getXmlData ("jvxlVertexData", data, false, false);
for (var i = 0, pt = -1; i < vertexCount; i++) {
var p =  new JU.P3 ();
fraction = J.jvxl.data.JvxlCoder.jvxlFractionFromCharacter2 (s.charCodeAt (++pt), s.charCodeAt (pt + ptCount), colorFractionBase, colorFractionRange);
p.x = min.x + fraction * range.x;
fraction = J.jvxl.data.JvxlCoder.jvxlFractionFromCharacter2 (s.charCodeAt (++pt), s.charCodeAt (pt + ptCount), colorFractionBase, colorFractionRange);
p.y = min.y + fraction * range.y;
fraction = J.jvxl.data.JvxlCoder.jvxlFractionFromCharacter2 (s.charCodeAt (++pt), s.charCodeAt (pt + ptCount), colorFractionBase, colorFractionRange);
p.z = min.z + fraction * range.z;
if (asArray) vertices[i] = p;
 else this.addVertexCopy (p, 0, i, false);
}
}return vertices;
}, "~S,~B");
Clazz.defineMethod (c$, "jvxlDecodeTriangleData", 
function (tdata, edgeData, colorData) {
var nTriangles = this.parseIntStr (J.jvxl.readers.XmlReader.getXmlAttrib (tdata, "count"));
if (nTriangles < 0) return;
var nextc =  Clazz.newIntArray (1, 0);
var nColors = (colorData == null ? -1 : 1);
var color = 0;
JU.Logger.info ("Reading " + nTriangles + " triangles");
var encoding = J.jvxl.readers.JvxlXmlReader.getEncoding (tdata);
tdata = this.getData (tdata, "jvxlTriangleData");
var edata = this.getData (edgeData, "jvxlTriangleEdgeData");
var vertex =  Clazz.newIntArray (3, 0);
var nextp =  Clazz.newIntArray (1, 0);
var nexte = null;
var edgeMask = 7;
var haveEdgeInfo;
var haveEncoding = !"none".equals (encoding);
if (haveEncoding) {
tdata = J.jvxl.data.JvxlCoder.jvxlDecompressString (tdata);
edata = J.jvxl.data.JvxlCoder.jvxlDecompressString (edata).trim ();
haveEdgeInfo = (edata.length == nTriangles);
} else {
var n = JU.PT.parseIntNext (tdata, nextp);
haveEdgeInfo = (edata.length > 0);
if (haveEdgeInfo) {
nexte =  Clazz.newIntArray (1, 0);
JU.PT.parseIntNext (edata, nexte);
} else if (n > 0) {
JU.Logger.info ("JvxlXmlReader: jvxlTriangleEdgeData count=" + n + "; expected " + nTriangles);
}}for (var i = 0, v = 0, p = 0, pt = -1; i < nTriangles; ) {
if (haveEncoding) {
var ch = tdata.charAt (++pt);
var diff;
switch (ch) {
case '!':
diff = 0;
break;
case '+':
case '.':
case ' ':
case '\n':
case '\r':
case '\t':
case ',':
continue;
case '-':
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
nextp[0] = pt;
diff = JU.PT.parseIntNext (tdata, nextp);
pt = nextp[0] - 1;
break;
default:
diff = ch.charCodeAt (0) - 92;
}
v += diff;
} else {
v = JU.PT.parseIntNext (tdata, nextp) - 1;
}vertex[p] = v;
if (++p == 3) {
p = 0;
if (haveEdgeInfo) {
edgeMask = (nexte == null ? edata.charCodeAt (i) - 48 : JU.PT.parseIntNext (edata, nexte));
if (edgeMask < 0 || edgeMask > 7) edgeMask = 7;
}if (--nColors == 0) {
nColors = (JU.PT.parseIntNext (colorData, nextc));
var c = JU.PT.parseIntNext (colorData, nextc);
if (c == -2147483648) nColors = 0;
 else color = c | 0xFF000000;
}this.addTriangleCheck (vertex[0], vertex[1], vertex[2], edgeMask, color, false, color);
i++;
}}
}, "~S,~S,~S");
Clazz.defineMethod (c$, "jvxlDecodeContourData", 
function (jvxlData, data) {
var vs =  new JU.Lst ();
var values =  new JU.SB ();
var colors =  new JU.SB ();
var pt = -1;
jvxlData.vContours = null;
if (data == null) return;
while ((pt = data.indexOf ("<jvxlContour", pt + 1)) >= 0) {
var v =  new JU.Lst ();
var s = this.xr.getXmlData ("jvxlContour", data.substring (pt), true, false);
var value = this.parseFloatStr (J.jvxl.readers.XmlReader.getXmlAttrib (s, "value"));
values.append (" ").appendF (value);
var color = J.jvxl.readers.JvxlXmlReader.getColor (J.jvxl.readers.XmlReader.getXmlAttrib (s, "color"));
var colix = JU.C.getColix (color);
colors.append (" ").append (JU.Escape.escapeColor (color));
var fData = J.jvxl.data.JvxlCoder.jvxlDecompressString (J.jvxl.readers.XmlReader.getXmlAttrib (s, "data"));
var bs = J.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlContour", s, false, false));
var n = bs.length ();
J.shapesurface.IsosurfaceMesh.setContourVector (v, n, bs, value, colix, color, JU.SB.newS (fData));
vs.addLast (v);
}
var n = vs.size ();
if (n > 0) {
jvxlData.vContours = JU.AU.createArrayOfArrayList (n);
jvxlData.contourColixes = this.params.contourColixes =  Clazz.newShortArray (n, 0);
jvxlData.contourValues = this.params.contoursDiscrete =  Clazz.newFloatArray (n, 0);
for (var i = 0; i < n; i++) {
jvxlData.vContours[i] = vs.get (i);
jvxlData.contourValues[i] = (jvxlData.vContours[i].get (2)).floatValue ();
jvxlData.contourColixes[i] = (jvxlData.vContours[i].get (3))[0];
}
jvxlData.contourColors = JU.C.getHexCodes (jvxlData.contourColixes);
JU.Logger.info ("JVXL read: " + n + " discrete contours");
JU.Logger.info ("JVXL read: contour values: " + values);
JU.Logger.info ("JVXL read: contour colors: " + colors);
}}, "J.jvxl.data.JvxlData,~S");
Clazz.overrideMethod (c$, "postProcessVertices", 
function () {
var bsInvalid = this.params.bsExcluded[1];
if (bsInvalid != null) {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.invalidateVertices (bsInvalid);
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 4, null);
this.meshData =  new J.jvxl.data.MeshData ();
}this.updateTriangles ();
}});
});
