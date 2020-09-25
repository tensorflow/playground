Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.MapFileReader"], "J.jvxl.readers.BCifDensityReader", ["java.io.BufferedInputStream", "$.ByteArrayInputStream", "java.lang.Float", "JU.AU", "$.BC", "$.MessagePackReader", "$.P3", "$.SB", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pt = 0;
this.checkSum = 0;
this.values = null;
this.cifData = null;
this.thisData = null;
this.isDiff = false;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "BCifDensityReader", J.jvxl.readers.MapFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.BCifDensityReader, []);
});
Clazz.defineMethod (c$, "getCifData", 
function (fileName, data) {
this.binarydoc = this.newBinaryDocument ();
if (JU.AU.isAB (data)) this.binarydoc.setStream ( new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (data)), true);
 else this.setStream (fileName, true);
this.nSurfaces = 1;
}, "~S,~O");
Clazz.defineMethod (c$, "readCifP3", 
function (key, p3) {
if (p3 == null) p3 =  new JU.P3 ();
var x = this.getCifFloat (key + "[0]");
if (Float.isNaN (x)) {
p3.x = NaN;
} else {
p3.x = x;
p3.y = this.getCifFloat (key + "[1]");
p3.z = this.getCifFloat (key + "[2]");
}return p3;
}, "~S,JU.P3");
Clazz.defineMethod (c$, "getCifMap", 
function (type) {
if (this.cifData == null) try {
this.cifData = ( new JU.MessagePackReader (this.binarydoc, true)).readMap ();
System.out.println ("BCifDensityReader BCIF encoder " + this.cifData.get ("encoder") + " BCIF version " + this.cifData.get ("version"));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("BCifDensityReader error " + e);
} else {
throw e;
}
}
var dataBlocks = this.cifData.get ("dataBlocks");
for (var i = dataBlocks.length; --i >= 0; ) {
var map = dataBlocks[i];
if (type.equalsIgnoreCase (map.get ("header").toString ())) {
var categories = map.get ("categories");
for (var j = categories.length; --j >= 0; ) {
var cat = categories[j];
var catName = cat.get ("name");
var columns = cat.get ("columns");
for (var k = columns.length; --k >= 0; ) {
var col = columns[k];
map.put (catName + "_" + col.get ("name"), col.get ("data"));
}
}
map.remove ("categories");
return this.thisData = map;
}}
return null;
}, "~S");
Clazz.defineMethod (c$, "getCifString", 
function (key) {
var map = this.thisData.get (key);
var data = map.get ("data");
var encoding = (map.get ("encoding"))[0];
var o = encoding.get ("offsetEncoding");
return null;
}, "~S");
Clazz.defineMethod (c$, "getCifFloat", 
function (key) {
var map = this.thisData.get (key);
var data = map.get ("data");
var encoding = (((map.get ("encoding"))[0]).get ("type")).intValue ();
var f = NaN;
try {
switch (encoding) {
case 3:
f = JU.BC.bytesToInt (data, 0, false);
break;
case 33:
f = JU.BC.bytesToDoubleToFloat (data, 0, false);
break;
default:
System.out.println ("BCDensityReader: Number encoding not recognized: " + encoding);
break;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
return f;
}, "~S");
Clazz.defineMethod (c$, "readCifFloats", 
function (key, values) {
var map = this.thisData.get (key);
var data = map.get ("data");
var encoding = (map.get ("encoding"))[0];
var min = (encoding.get ("min")).floatValue ();
var max = (encoding.get ("max")).floatValue ();
var numSteps = (encoding.get ("numSteps")).intValue ();
var kind = encoding.get ("kind");
if ("IntervalQuantization".equals (kind)) {
var delta = (max - min) / (numSteps - 1);
for (var i = data.length; --i >= 0; ) {
values[i] = min + delta * ((data[i] + 256) % 256);
}
} else {
System.out.println ("BCifDensityReader: value encoding type? " + kind);
}return values;
}, "~S,~A");
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.allowSigma = true;
this.init2MFR (sg, br);
var o2 = sg.getReaderData ();
var fileName = o2[0];
var data = o2[1];
this.isDiff = (fileName != null && fileName.indexOf ("&diff=1") >= 0 || Clazz.instanceOf (data, String) && (data).indexOf ("#diff=1") >= 0);
this.getCifData (fileName, data);
this.nSurfaces = 1;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.getCifMap (this.isDiff ? "FO-FC" : "2FO-FC");
var test = this.getCifString ("_volume_data_3d_info_name");
this.readCifP3 ("_volume_data_3d_info_axis_order", this.p3);
var axis_order = this.readCifP3 ("_volume_data_3d_info_axis_order", null);
var fracOrigin = this.readCifP3 ("_volume_data_3d_info_origin", null);
var fracDimensions = this.readCifP3 ("_volume_data_3d_info_dimensions", null);
var sampleCounts = this.readCifP3 ("_volume_data_3d_info_sample_count", this.p3);
this.mapc = Clazz.floatToInt (axis_order.x) + 1;
this.mapr = Clazz.floatToInt (axis_order.y) + 1;
this.maps = Clazz.floatToInt (axis_order.z) + 1;
var crs2abc =  Clazz.newIntArray (3, 0);
crs2abc[this.mapc - 1] = 0;
crs2abc[this.mapr - 1] = 1;
crs2abc[this.maps - 1] = 2;
this.n0 = Clazz.floatToInt (sampleCounts.x);
this.n1 = Clazz.floatToInt (sampleCounts.y);
this.n2 = Clazz.floatToInt (sampleCounts.z);
this.na = Clazz.floatToInt (this.getXYZ (sampleCounts, crs2abc[0]));
this.nb = Clazz.floatToInt (this.getXYZ (sampleCounts, crs2abc[1]));
this.nc = Clazz.floatToInt (this.getXYZ (sampleCounts, crs2abc[2]));
this.readCifP3 ("_volume_data_3d_info_spacegroup_cell_size", this.p3);
this.a = this.p3.x;
this.b = this.p3.y;
this.c = this.p3.z;
var fa = this.getXYZ (fracDimensions, crs2abc[0]);
var fb = this.getXYZ (fracDimensions, crs2abc[1]);
var fc = this.getXYZ (fracDimensions, crs2abc[2]);
this.xyzStart[this.xIndex = 0] = this.getXYZ (fracOrigin, crs2abc[0]) * this.na / fa;
this.xyzStart[this.yIndex = 1] = this.getXYZ (fracOrigin, crs2abc[1]) * this.nb / fb;
this.xyzStart[this.zIndex = 2] = this.getXYZ (fracOrigin, crs2abc[2]) * this.nc / fc;
this.a *= fa;
this.b *= fb;
this.c *= fc;
this.readCifP3 ("_volume_data_3d_info_spacegroup_cell_angles", this.p3);
this.alpha = this.p3.x;
this.beta = this.p3.y;
this.gamma = this.p3.z;
this.values = this.readCifFloats ("_volume_data_3d_values",  Clazz.newFloatArray (this.na * this.nb * this.nc, 0));
this.getVectorsAndOrigin ();
if (this.params.thePlane == null && (this.params.cutoffAutomatic || !Float.isNaN (this.params.sigma))) {
var sigma = (this.params.sigma < 0 || Float.isNaN (this.params.sigma) ? 1 : this.params.sigma);
this.dmean = this.getCifFloat ("_volume_data_3d_info_mean_sampled");
var rmsDeviation = this.getCifFloat ("_volume_data_3d_info_sigma_sampled");
this.params.cutoff = rmsDeviation * sigma + this.dmean;
JU.Logger.info ("Cutoff set to (mean + rmsDeviation*" + sigma + " = " + this.params.cutoff + ")\n");
}this.jvxlFileHeaderBuffer =  new JU.SB ();
this.jvxlFileHeaderBuffer.append ("CifDensity reader\n");
this.jvxlFileHeaderBuffer.append ("see http://www.ebi.ac.uk/pdbe/densities/x-ray/1cbs/dbox/\n");
});
Clazz.defineMethod (c$, "getXYZ", 
 function (a, x) {
switch (Clazz.floatToInt (x)) {
case 0:
return a.x;
case 1:
return a.y;
case 2:
default:
return a.z;
}
}, "JU.P3,~N");
Clazz.overrideMethod (c$, "nextVoxel", 
function () {
var v = this.values[this.pt++];
this.checkSum += v;
return v;
});
Clazz.overrideMethod (c$, "skipData", 
function (nPoints) {
this.pt += nPoints;
}, "~N");
Clazz.defineMethod (c$, "closeReader", 
function () {
if (this.readerClosed) return;
System.out.println ("CifDensityReader checkSum=" + this.checkSum);
Clazz.superCall (this, J.jvxl.readers.BCifDensityReader, "closeReader", []);
});
});
