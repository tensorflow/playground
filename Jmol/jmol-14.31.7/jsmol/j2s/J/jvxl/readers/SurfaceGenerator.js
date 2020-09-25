Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["JU.P3", "$.V3"], "J.jvxl.readers.SurfaceGenerator", ["java.lang.Float", "java.util.Map", "JU.AU", "$.BS", "$.Measure", "$.P4", "$.PT", "$.Rdr", "J.jvxl.data.JvxlCoder", "$.JvxlData", "$.MeshData", "$.VolumeData", "J.jvxl.readers.Parameters", "$.SurfaceReader", "JU.Logger", "JV.FileManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.params = null;
this.jvxlData = null;
this.meshData = null;
this.volumeDataTemp = null;
this.meshDataServer = null;
this.atomDataServer = null;
this.marchingSquares = null;
this.version = null;
this.isValid = true;
this.fileType = null;
this.bsVdw = null;
this.colorPtr = 0;
this.surfaceReader = null;
this.out = null;
this.readerData = null;
this.vAB = null;
this.vNorm = null;
this.ptRef = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "SurfaceGenerator");
Clazz.prepareFields (c$, function () {
this.vAB =  new JU.V3 ();
this.vNorm =  new JU.V3 ();
this.ptRef = JU.P3.new3 (0, 0, 1e15);
});
Clazz.makeConstructor (c$, 
function (atomDataServer, meshDataServer, meshData, jvxlData) {
this.atomDataServer = atomDataServer;
this.meshDataServer = meshDataServer;
this.params =  new J.jvxl.readers.Parameters ();
this.meshData = (meshData == null ?  new J.jvxl.data.MeshData () : meshData);
this.jvxlData = (jvxlData == null ?  new J.jvxl.data.JvxlData () : jvxlData);
this.volumeDataTemp =  new J.jvxl.data.VolumeData ();
this.initializeIsosurface ();
}, "J.atomdata.AtomDataServer,J.jvxl.api.MeshDataServer,J.jvxl.data.MeshData,J.jvxl.data.JvxlData");
Clazz.defineMethod (c$, "setJvxlData", 
function (jvxlData) {
this.jvxlData = jvxlData;
if (jvxlData != null) jvxlData.version = this.version;
}, "J.jvxl.data.JvxlData");
Clazz.defineMethod (c$, "setProp", 
function (propertyName, value, bs) {
if ("debug" === propertyName) {
var TF = (value).booleanValue ();
this.params.logMessages = TF;
this.params.logCube = TF;
return true;
}if ("init" === propertyName) {
this.initializeIsosurface ();
if (Clazz.instanceOf (value, J.jvxl.readers.Parameters)) {
this.params = value;
} else {
this.params.script = value;
if (this.params.script != null && this.params.script.indexOf (";#") >= 0) {
this.params.script = JU.PT.rep (this.params.script, ";#", "; #");
}}return false;
}if ("silent" === propertyName) {
this.params.isSilent = true;
return true;
}if ("map" === propertyName) {
this.params.resetForMapping ((value).booleanValue ());
if (this.surfaceReader != null) this.surfaceReader.minMax = null;
return true;
}if ("finalize" === propertyName) {
this.initializeIsosurface ();
return true;
}if ("clear" === propertyName) {
if (this.surfaceReader != null) this.surfaceReader.discardTempData (true);
return false;
}if ("fileIndex" === propertyName) {
this.params.fileIndex = (value).intValue ();
if (this.params.fileIndex < 0) this.params.fileIndex = 0;
this.params.readAllData = false;
return true;
}if ("blockData" === propertyName) {
this.params.blockCubeData = (value).booleanValue ();
return true;
}if ("withinPoints" === propertyName) {
this.params.boundingBox = (value)[1];
return true;
}if ("boundingBox" === propertyName) {
var pts = value;
this.params.boundingBox =  Clazz.newArray (-1, [JU.P3.newP (pts[0]), JU.P3.newP (pts[pts.length - 1])]);
return true;
}if ("func" === propertyName) {
this.params.func = value;
return true;
}if ("intersection" === propertyName) {
this.params.intersection = value;
return true;
}if ("bsSolvent" === propertyName) {
this.params.bsSolvent = value;
return true;
}if ("select" === propertyName) {
this.params.bsSelected = value;
return true;
}if ("ignore" === propertyName) {
this.params.bsIgnore = value;
return true;
}if ("propertySmoothing" === propertyName) {
this.params.propertySmoothing = (value).booleanValue ();
return true;
}if ("propertyDistanceMax" === propertyName) {
this.params.propertyDistanceMax = (value).floatValue ();
return true;
}if ("propertySmoothingPower" === propertyName) {
this.params.propertySmoothingPower = (value).intValue ();
return true;
}if ("title" === propertyName) {
if (value == null) {
this.params.title = null;
return true;
} else if (JU.AU.isAS (value)) {
this.params.title = value;
if (JU.Logger.debugging) for (var i = 0; i < this.params.title.length; i++) if (this.params.title[i].length > 0) JU.Logger.info (this.params.title[i]);

}return true;
}if ("sigma" === propertyName) {
this.params.cutoff = this.params.sigma = (value).floatValue ();
this.params.cutoffAutomatic = false;
return true;
}if ("cutoff" === propertyName) {
this.params.cutoff = (value).floatValue ();
this.params.isPositiveOnly = false;
this.params.cutoffAutomatic = false;
return true;
}if ("parameters" === propertyName) {
this.params.parameters = JU.AU.ensureLengthA (value, 2);
if (this.params.parameters.length > 0 && this.params.parameters[0] != 0) this.params.cutoff = this.params.parameters[0];
return true;
}if ("cutoffPositive" === propertyName) {
this.params.cutoff = (value).floatValue ();
this.params.isPositiveOnly = true;
this.params.isCutoffAbsolute = false;
return true;
}if ("cap" === propertyName || "slab" === propertyName) {
if (value != null) this.params.addSlabInfo (value);
return true;
}if ("scale" === propertyName) {
this.params.scale = (value).floatValue ();
return true;
}if ("scale3d" === propertyName) {
this.params.scale3d = (value).floatValue ();
return true;
}if ("angstroms" === propertyName) {
this.params.isAngstroms = true;
return true;
}if ("resolution" === propertyName) {
var resolution = (value).floatValue ();
this.params.resolution = (resolution > 0 ? resolution : 3.4028235E38);
return true;
}if ("downsample" === propertyName) {
var rate = (value).intValue ();
this.params.downsampleFactor = (rate >= 0 ? rate : 0);
return true;
}if ("anisotropy" === propertyName) {
if ((this.params.dataType & 32) == 0) this.params.setAnisotropy (value);
return true;
}if ("eccentricity" === propertyName) {
this.params.setEccentricity (value);
return true;
}if ("addHydrogens" === propertyName) {
this.params.addHydrogens = (value).booleanValue ();
return true;
}if ("squareData" === propertyName) {
this.params.isSquared = (value == null ? false : (value).booleanValue ());
return true;
}if ("squareLinear" === propertyName) {
this.params.isSquaredLinear = (value == null ? false : (value).booleanValue ());
return true;
}if ("gridPoints" === propertyName) {
this.params.iAddGridPoints = true;
return true;
}if ("atomIndex" === propertyName) {
this.params.atomIndex = (value).intValue ();
return true;
}if ("insideOut" === propertyName) {
this.params.insideOut = true;
return true;
}if ("sign" === propertyName) {
this.params.isCutoffAbsolute = !this.params.isPositiveOnly;
this.params.colorBySign = true;
this.colorPtr = 0;
return true;
}if ("colorRGB" === propertyName) {
var rgb = (value).intValue ();
this.params.colorRgb = this.params.colorPos = this.params.colorPosLCAO = rgb;
if (this.colorPtr++ == 0) {
this.params.colorNeg = this.params.colorNegLCAO = rgb;
} else {
this.params.colorRgb = 2147483647;
}return true;
}if ("monteCarloCount" === propertyName) {
this.params.psi_monteCarloCount = (value).intValue ();
return true;
}if ("rangeAll" === propertyName) {
this.params.rangeAll = true;
return true;
}if ("rangeSelected" === propertyName) {
this.params.rangeSelected = true;
return true;
}if ("red" === propertyName) {
this.params.valueMappedToRed = (value).floatValue ();
return true;
}if ("blue" === propertyName) {
this.params.valueMappedToBlue = (value).floatValue ();
if (this.params.valueMappedToRed > this.params.valueMappedToBlue) {
var f = this.params.valueMappedToRed;
this.params.valueMappedToRed = this.params.valueMappedToBlue;
this.params.valueMappedToBlue = f;
this.params.isColorReversed = !this.params.isColorReversed;
}this.params.rangeDefined = true;
this.params.rangeAll = false;
return true;
}if ("reverseColor" === propertyName) {
this.params.isColorReversed = true;
return true;
}if ("setColorScheme" === propertyName) {
this.getSurfaceSets ();
this.params.colorBySets = true;
this.mapSurface ();
return true;
}if ("center" === propertyName) {
this.params.center.setT (value);
return true;
}if ("origin" === propertyName) {
this.params.origin = value;
return true;
}if ("step" === propertyName) {
this.params.steps = value;
return true;
}if ("modelInvRotation" === propertyName) {
this.params.modelInvRotation = value;
return true;
}if ("point" === propertyName) {
this.params.points = value;
return true;
}if ("withinDistance" === propertyName) {
this.params.distance = (value).floatValue ();
return true;
}if ("withinPoint" === propertyName) {
this.params.point = value;
return true;
}if ("progressive" === propertyName) {
this.params.isXLowToHigh = true;
return true;
}if ("phase" === propertyName) {
var color = value;
this.params.isCutoffAbsolute = true;
this.params.colorBySign = true;
this.params.colorByPhase = true;
this.params.colorPhase = J.jvxl.readers.SurfaceReader.getColorPhaseIndex (color);
if (this.params.colorPhase < 0) {
JU.Logger.warn (" invalid color phase: " + color);
this.params.colorPhase = 0;
}this.params.colorByPhase = this.params.colorPhase != 0;
if (this.params.state >= 2) {
this.params.dataType = this.params.surfaceType;
this.params.state = 3;
this.params.isBicolorMap = true;
this.surfaceReader.applyColorScale ();
}return true;
}if ("radius" === propertyName) {
JU.Logger.info ("solvent probe radius set to " + value);
this.params.atomRadiusData = value;
return true;
}if ("envelopeRadius" === propertyName) {
this.params.envelopeRadius = (value).floatValue ();
return true;
}if ("cavityRadius" === propertyName) {
this.params.cavityRadius = (value).floatValue ();
return true;
}if ("cavity" === propertyName) {
this.params.isCavity = true;
return true;
}if ("doFullMolecular" === propertyName) {
this.params.doFullMolecular = true;
return true;
}if ("pocket" === propertyName) {
this.params.pocket = value;
this.params.fullyLit = this.params.pocket.booleanValue ();
return true;
}if ("minset" === propertyName) {
this.params.minSet = (value).intValue ();
return true;
}if ("maxset" === propertyName) {
this.params.maxSet = (value).intValue ();
return true;
}if ("plane" === propertyName) {
this.params.setPlane (value);
return true;
}if ("contour" === propertyName) {
this.params.isContoured = true;
var n;
if (JU.AU.isAF (value)) {
this.params.contoursDiscrete = value;
this.params.nContours = this.params.contoursDiscrete.length;
} else if (Clazz.instanceOf (value, JU.P3)) {
var pt = this.params.contourIncrements = value;
var from = pt.x;
var to = pt.y;
var step = pt.z;
if (step <= 0) step = 1;
n = 0;
for (var p = from; p <= to + step / 10; p += step, n++) {
}
this.params.contoursDiscrete =  Clazz.newFloatArray (n, 0);
var p = from;
for (var i = 0; i < n; i++, p += step) {
this.params.contoursDiscrete[i] = p;
}
this.params.nContours = n;
} else {
n = (value).intValue ();
this.params.thisContour = 0;
if (n == 0) this.params.nContours = 9;
 else if (n > 0) this.params.nContours = n;
 else this.params.thisContour = -n;
}return true;
}if ("colorDiscrete" === propertyName) {
this.params.contourColixes = value;
return true;
}if ("colorDensity" === propertyName) {
this.params.colorDensity = true;
if (value != null) this.params.pointSize = (value).floatValue ();
return false;
}if ("fullPlane" === propertyName) {
this.params.contourFromZero = !(value).booleanValue ();
return true;
}if ("mapLattice" === propertyName) {
this.params.mapLattice = value;
return true;
}if ("extendGrid" === propertyName) {
this.params.extendGrid = (value).floatValue ();
return true;
}if ("property" === propertyName) {
this.params.dataType = 1208;
this.params.theProperty = value;
this.mapSurface ();
return true;
}if ("sphere" === propertyName) {
this.params.setSphere ((value).floatValue (), false);
this.readerData = Float.$valueOf (this.params.distance);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("geodesic" === propertyName) {
this.params.setSphere ((value).floatValue (), true);
this.readerData = Float.$valueOf (this.params.distance);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("ellipsoid" === propertyName) {
if (Clazz.instanceOf (value, JU.P4)) this.params.setEllipsoidP4 (value);
 else if (JU.AU.isAF (value)) this.params.setEllipsoidAF (value);
 else return true;
this.readerData = Float.$valueOf (this.params.distance);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("ellipsoid3" === propertyName) {
this.params.setEllipsoidAF (value);
this.readerData = Float.$valueOf (this.params.distance);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("lp" === propertyName) {
this.params.setLp (value);
this.readerData =  Clazz.newFloatArray (-1, [3, 2, 0, 15, 0]);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("rad" === propertyName) {
this.params.setRadical (value);
this.readerData =  Clazz.newFloatArray (-1, [3, 2, 0, 15, 0]);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("lobe" === propertyName) {
this.params.setLobe (value);
this.readerData =  Clazz.newFloatArray (-1, [3, 2, 0, 15, 0]);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("hydrogenOrbital" === propertyName) {
if (!this.params.setAtomicOrbital (value)) {
this.isValid = false;
return true;
}this.readerData =  Clazz.newFloatArray (-1, [this.params.psi_n, this.params.psi_l, this.params.psi_m, this.params.psi_Znuc, this.params.psi_monteCarloCount]);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.processState ();
return true;
}if ("functionXY" === propertyName) {
this.params.setFunctionXY (value);
if (this.params.isContoured) this.volumeDataTemp.setPlaneParameters (this.params.thePlane == null ? this.params.thePlane = JU.P4.new4 (0, 0, 1, 0) : this.params.thePlane);
if ((this.params.functionInfo.get (0)).indexOf ("_xyz") >= 0) this.getFunctionZfromXY ();
this.processState ();
return true;
}if ("functionXYZ" === propertyName) {
this.params.setFunctionXYZ (value);
this.processState ();
return true;
}if ("lcaoType" === propertyName) {
this.params.setLcao (value, this.colorPtr);
return true;
}if ("lcaoCartoonCenter" === propertyName) {
if (++this.params.state != 2) return true;
if (Float.isNaN (this.params.center.x)) this.params.center.setT (value);
return false;
}if ("molecular" === propertyName || "solvent" === propertyName || "sasurface" === propertyName || "nomap" === propertyName) {
this.params.setSolvent (propertyName, (value).floatValue ());
if (!this.params.isSilent) JU.Logger.info (this.params.calculationType);
this.processState ();
return true;
}if ("moData" === propertyName) {
this.params.moData = value;
return true;
}if ("mepCalcType" === propertyName) {
this.params.mep_calcType = (value).intValue ();
return true;
}if ("mep" === propertyName) {
this.params.setMep (value, false);
this.processState ();
return true;
}if ("mlp" === propertyName) {
this.params.setMep (value, true);
this.processState ();
return true;
}if ("nci" === propertyName) {
var isPromolecular = (value).booleanValue ();
this.params.setNci (isPromolecular);
if (isPromolecular) this.processState ();
return true;
}if ("calculationType" === propertyName) {
this.params.calculationType = value;
return true;
}if ("charges" === propertyName) {
this.params.theProperty = value;
return true;
}if ("randomSeed" === propertyName) {
this.params.randomSeed = (value).intValue ();
return true;
}if ("molecularOrbital" === propertyName) {
var iMo = 0;
var linearCombination = null;
if (Clazz.instanceOf (value, Integer)) {
iMo = (value).intValue ();
} else {
linearCombination = value;
}this.params.setMO (iMo, linearCombination);
JU.Logger.info (this.params.calculationType);
this.processState ();
return true;
}if ("fileType" === propertyName) {
this.fileType = value;
return true;
}if ("fileName" === propertyName) {
this.params.fileName = value;
return true;
}if ("filesData" === propertyName) {
this.params.filesData = value;
return true;
}if ("outputChannel" === propertyName) {
this.out = value;
return true;
}if ("readFile" === propertyName) {
if ((this.surfaceReader = this.setFileData (this.atomDataServer, value)) == null) {
JU.Logger.error ("Could not set the surface data");
return true;
}this.surfaceReader.setOutputChannel (this.out);
this.generateSurface ();
return true;
}if ("mapColor" === propertyName) {
if ((this.surfaceReader = this.setFileData (this.atomDataServer, value)) == null) {
JU.Logger.error ("Could not set the mapping data");
return true;
}this.surfaceReader.setOutputChannel (this.out);
this.mapSurface ();
return true;
}if ("getSurfaceSets" === propertyName) {
this.getSurfaceSets ();
return true;
}if ("periodic" === propertyName) {
this.params.isPeriodic = true;
}return false;
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "newReader", 
 function (name) {
var sr = J.jvxl.readers.SurfaceGenerator.getInterface (name);
if (sr != null) sr.init (this);
return sr;
}, "~S");
Clazz.defineMethod (c$, "newReaderBr", 
 function (name, br) {
var sr = J.jvxl.readers.SurfaceGenerator.getInterface (name);
if (sr != null) sr.init2 (this, br);
return sr;
}, "~S,java.io.BufferedReader");
c$.getInterface = Clazz.defineMethod (c$, "getInterface", 
 function (name) {
try {
var x = Clazz._4Name ("J.jvxl.readers." + name);
return (x == null ? null : x.newInstance ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Interface.java Error creating instance for " + name + ": \n" + e.toString ());
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "getSurfaceSets", 
 function () {
if (this.meshDataServer == null) {
this.meshData.getSurfaceSet ();
} else {
this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.getSurfaceSet ();
this.meshDataServer.fillMeshData (this.meshData, 3, null);
}});
Clazz.defineMethod (c$, "processState", 
 function () {
if (this.params.state == 1 && this.params.thePlane != null) this.params.state++;
if (this.params.state >= 2) {
this.mapSurface ();
} else {
this.generateSurface ();
}});
Clazz.defineMethod (c$, "setReader", 
 function () {
this.readerData = null;
if (this.surfaceReader != null) return !this.surfaceReader.vertexDataOnly;
switch (this.params.dataType) {
case 1207:
this.surfaceReader = this.newReader ("IsoPlaneReader");
break;
case 1208:
this.surfaceReader = this.newReader ("AtomPropertyMapper");
break;
case 1328:
case 1329:
this.readerData = (this.params.dataType == 1328 ? "Mep" : "Mlp");
if (this.params.state == 3) {
this.surfaceReader = this.newReader ("AtomPropertyMapper");
} else {
this.surfaceReader = this.newReader ("Iso" + this.readerData + "Reader");
}break;
case 1334:
this.surfaceReader = this.newReader ("IsoIntersectFileReader");
break;
case 1333:
this.surfaceReader = this.newReader ("IsoIntersectAtomReader");
break;
case 1195:
case 1203:
case 1196:
this.surfaceReader = this.newReader ("IsoSolventReader");
break;
case 1844:
case 1837:
this.surfaceReader = this.newReader ("IsoMOReader");
break;
case 8:
this.surfaceReader = this.newReader ("IsoFxyReader");
break;
case 9:
this.surfaceReader = this.newReader ("IsoFxyzReader");
break;
}
if (JU.Logger.debugging) JU.Logger.info ("Using surface reader " + this.surfaceReader);
if (this.params.isSilent && this.surfaceReader != null) this.surfaceReader.isQuiet = true;
return true;
});
Clazz.defineMethod (c$, "generateSurface", 
 function () {
if (++this.params.state != 2) return;
this.setReader ();
var haveMeshDataServer = (this.meshDataServer != null);
if (this.params.colorBySign) this.params.isBicolorMap = true;
if (this.surfaceReader == null) {
JU.Logger.error ("surfaceReader is null for " + this.params.dataType);
return;
}if (!this.surfaceReader.createIsosurface (false)) {
JU.Logger.error ("Could not create isosurface");
this.params.cutoff = NaN;
this.surfaceReader.closeReader ();
return;
}if (this.params.probes != null) {
for (var i = this.params.probeValues.length; --i >= 0; ) {
this.params.probeValues[i] = this.surfaceReader.getValueAtPoint (this.params.probes[i], false);
}
}if (this.params.pocket != null && haveMeshDataServer) this.surfaceReader.selectPocket (!this.params.pocket.booleanValue ());
if (this.params.minSet > 0) this.surfaceReader.excludeMinimumSet ();
if (this.params.maxSet > 0) this.surfaceReader.excludeMaximumSet ();
if (this.params.slabInfo != null) this.surfaceReader.slabIsosurface (this.params.slabInfo);
if (haveMeshDataServer && this.meshDataServer.notifySurfaceGenerationCompleted ()) this.surfaceReader.hasColorData = false;
if (this.jvxlData.thisSet >= 0) this.getSurfaceSets ();
if (this.jvxlData.jvxlDataIs2dContour) {
this.surfaceReader.colorIsosurface ();
this.params.state = 3;
}if (this.jvxlData.jvxlDataIsColorDensity) {
this.params.state = 3;
}if (this.params.colorBySign || this.params.isBicolorMap) {
this.params.state = 3;
this.surfaceReader.applyColorScale ();
}if (this.jvxlData.vertexColorMap != null) {
this.jvxlData.vertexColorMap = null;
this.surfaceReader.hasColorData = false;
}this.surfaceReader.jvxlUpdateInfo ();
this.marchingSquares = this.surfaceReader.marchingSquares;
this.surfaceReader.discardTempData (false);
this.params.mappedDataMin = 3.4028235E38;
this.surfaceReader.closeReader ();
if (this.params.state != 3 && (this.surfaceReader.hasColorData || this.params.colorDensity)) {
this.params.state = 3;
this.colorIsosurface ();
}this.surfaceReader = null;
});
Clazz.defineMethod (c$, "mapSurface", 
 function () {
if (this.params.state == 1 && this.params.thePlane != null) this.params.state++;
if (++this.params.state < 3) return;
if (!this.setReader ()) return;
if (this.params.isPeriodic) this.surfaceReader.volumeData.isPeriodic = true;
if (this.params.thePlane != null) {
var isSquared = this.params.isSquared;
this.params.isSquared = false;
this.params.cutoff = 0;
this.surfaceReader.volumeData.setMappingPlane (this.params.thePlane);
this.surfaceReader.createIsosurface (!this.params.isPeriodic);
this.surfaceReader.volumeData.setMappingPlane (null);
if (this.meshDataServer != null) this.meshDataServer.notifySurfaceGenerationCompleted ();
if (this.params.dataType == 1207) {
this.surfaceReader.discardTempData (true);
return;
}this.params.isSquared = isSquared;
this.params.mappedDataMin = 3.4028235E38;
this.surfaceReader.readVolumeData (true);
if (this.params.mapLattice != null) this.surfaceReader.volumeData.isPeriodic = true;
} else if (!this.params.colorBySets && !this.params.colorDensity) {
this.surfaceReader.readAndSetVolumeParameters (true);
this.params.mappedDataMin = 3.4028235E38;
this.surfaceReader.readVolumeData (true);
}this.colorIsosurface ();
this.surfaceReader.closeReader ();
this.surfaceReader = null;
});
Clazz.defineMethod (c$, "colorIsosurface", 
function () {
this.surfaceReader.colorIsosurface ();
this.surfaceReader.jvxlUpdateInfo ();
this.surfaceReader.updateTriangles ();
this.surfaceReader.discardTempData (true);
if (this.meshDataServer != null) this.meshDataServer.notifySurfaceMappingCompleted ();
});
Clazz.defineMethod (c$, "getProperty", 
function (property, index) {
if (property === "jvxlFileData") return J.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, null, this.params.title, "", true, index, null, null);
if (property === "jvxlFileInfo") return J.jvxl.data.JvxlCoder.jvxlGetInfo (this.jvxlData);
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "setFileData", 
 function (vwr, value) {
var fileType = this.fileType;
this.fileType = null;
if (Clazz.instanceOf (value, java.util.Map)) {
var map = value;
if (map.containsKey ("__pymolSurfaceData__")) {
this.readerData = map;
return this.newReaderBr ("PyMOLMeshReader", null);
}value = map.get ("volumeData");
}if (Clazz.instanceOf (value, J.jvxl.data.VolumeData)) {
this.volumeDataTemp = value;
return this.newReader ("VolumeDataReader");
}var data = null;
if (Clazz.instanceOf (value, String)) {
data = value;
value = JU.Rdr.getBR (value);
}if (Clazz.instanceOf (value, Array)) {
var a = (value)[0];
var b =  new Array (a.length);
for (var i = 0; i < a.length; i++) b[i] = this.setFileData (vwr, a[i]);

(value)[0] = b;
this.readerData = value;
return this.newReader ("IsoIntersectGridReader");
}var br = value;
if (fileType == null) fileType = JV.FileManager.determineSurfaceFileType (br);
if (fileType != null && fileType.startsWith ("UPPSALA")) {
var fname = this.params.fileName;
fname = fname.substring (0, fname.indexOf ("/", 10));
fname += JU.PT.getQuotedStringAt (fileType, fileType.indexOf ("A HREF") + 1);
this.params.fileName = fname;
value = this.atomDataServer.getBufferedInputStream (fname);
if (value == null) {
JU.Logger.error ("Isosurface: could not open file " + fname);
return null;
}try {
br = JU.Rdr.getBufferedReader (value, null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
fileType = JV.FileManager.determineSurfaceFileType (br);
}if (fileType == null) fileType = "UNKNOWN";
JU.Logger.info ("data file type was determined to be " + fileType);
if (fileType.equals ("Jvxl+")) return this.newReaderBr ("JvxlReader", br);
this.readerData =  Clazz.newArray (-1, [this.params.fileName, data]);
if ("MRC DELPHI DSN6".indexOf (fileType.toUpperCase ()) >= 0) {
fileType += "Binary";
}return this.newReaderBr (fileType + "Reader", br);
}, "JV.Viewer,~O");
Clazz.defineMethod (c$, "getReaderData", 
function () {
var o = this.readerData;
this.readerData = null;
return o;
});
Clazz.defineMethod (c$, "initializeIsosurface", 
function () {
this.params.initialize ();
this.colorPtr = 0;
this.surfaceReader = null;
this.marchingSquares = null;
this.initState ();
});
Clazz.defineMethod (c$, "initState", 
function () {
this.params.state = 1;
this.params.dataType = this.params.surfaceType = 0;
});
Clazz.defineMethod (c$, "setLcao", 
function () {
this.params.colorPos = this.params.colorPosLCAO;
this.params.colorNeg = this.params.colorNegLCAO;
return this.params.lcaoType;
});
Clazz.defineMethod (c$, "getFunctionZfromXY", 
 function () {
var origin = this.params.functionInfo.get (1);
var counts =  Clazz.newIntArray (3, 0);
var nearest =  Clazz.newIntArray (3, 0);
var vectors =  new Array (3);
for (var i = 0; i < 3; i++) {
var info = this.params.functionInfo.get (i + 2);
counts[i] = Math.abs (Clazz.floatToInt (info.x));
vectors[i] = JU.V3.new3 (info.y, info.z, info.w);
}
var nx = counts[0];
var ny = counts[1];
var pt =  new JU.P3 ();
var pta =  new JU.P3 ();
var ptb =  new JU.P3 ();
var ptc =  new JU.P3 ();
var data = this.params.functionInfo.get (5);
var data2 =  Clazz.newFloatArray (nx, ny, 0);
var d;
for (var i = 0; i < nx; i++) for (var j = 0; j < ny; j++) {
pt.scaleAdd2 (i, vectors[0], origin);
pt.scaleAdd2 (j, vectors[1], pt);
var dist = J.jvxl.readers.SurfaceGenerator.findNearestThreePoints (pt.x, pt.y, data, nearest);
pta.set ((d = data[nearest[0]])[0], d[1], d[2]);
if (dist < 0.00001) {
pt.z = d[2];
} else {
ptb.set ((d = data[nearest[1]])[0], d[1], d[2]);
ptc.set ((d = data[nearest[2]])[0], d[1], d[2]);
pt.z = this.distanceVerticalToPlane (pt.x, pt.y, pta, ptb, ptc);
}data2[i][j] = pt.z;
}

this.params.functionInfo.set (5, data2);
});
Clazz.defineMethod (c$, "distanceVerticalToPlane", 
 function (x, y, pta, ptb, ptc) {
var d = JU.Measure.getDirectedNormalThroughPoints (pta, ptb, ptc, this.ptRef, this.vNorm, this.vAB);
return (this.vNorm.x * x + this.vNorm.y * y + d) / -this.vNorm.z;
}, "~N,~N,JU.P3,JU.P3,JU.P3");
c$.findNearestThreePoints = Clazz.defineMethod (c$, "findNearestThreePoints", 
 function (x, y, xyz, result) {
var d;
var dist1;
var dist2;
var dist3;
var i1;
var i2;
var i3;
i1 = i2 = i3 = -1;
dist1 = dist2 = dist3 = 3.4028235E38;
for (var i = xyz.length; --i >= 0; ) {
d = (d = xyz[i][0] - x) * d + (d = xyz[i][1] - y) * d;
if (d < dist1) {
dist3 = dist2;
dist2 = dist1;
dist1 = d;
i3 = i2;
i2 = i1;
i1 = i;
} else if (d < dist2) {
dist3 = dist2;
dist2 = d;
i3 = i2;
i2 = i;
} else if (d < dist3) {
dist3 = d;
i3 = i;
}}
result[0] = i1;
result[1] = i2;
result[2] = i3;
return dist1;
}, "~N,~N,~A,~A");
Clazz.defineMethod (c$, "addRequiredFile", 
function (fileName) {
if (this.meshDataServer == null) return;
this.meshDataServer.addRequiredFile (fileName);
}, "~S");
Clazz.defineMethod (c$, "setRequiredFile", 
function (oldName, fileName) {
if (this.meshDataServer == null) return;
this.meshDataServer.setRequiredFile (oldName, fileName);
}, "~S,~S");
Clazz.defineMethod (c$, "log", 
function (msg) {
if (this.atomDataServer == null) System.out.println (msg);
 else this.atomDataServer.log (msg);
}, "~S");
Clazz.defineMethod (c$, "setOutputChannel", 
function (binaryDoc, out) {
if (this.meshDataServer == null) return;
this.meshDataServer.setOutputChannel (binaryDoc, out);
}, "javajs.api.GenericBinaryDocument,JU.OC");
Clazz.defineMethod (c$, "fillAtomData", 
function (atomData, mode) {
if ((mode & 2) != 0 && atomData.bsSelected != null) {
if (this.bsVdw == null) this.bsVdw =  new JU.BS ();
this.bsVdw.or (atomData.bsSelected);
}this.atomDataServer.fillAtomData (atomData, mode);
}, "J.atomdata.AtomData,~N");
Clazz.defineMethod (c$, "getOriginVaVbVc", 
function () {
return (this.surfaceReader.volumeData == null ? null : this.surfaceReader.volumeData.oabc);
});
});
