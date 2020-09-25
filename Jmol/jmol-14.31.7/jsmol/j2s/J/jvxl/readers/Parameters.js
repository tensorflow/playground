Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (null, "J.jvxl.readers.Parameters", ["java.lang.Float", "java.util.Hashtable", "JU.A4", "$.Lst", "$.M3", "$.P3", "$.P4", "$.V3", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.state = 0;
this.testFlags = 0;
this.logMessages = false;
this.logCompression = false;
this.logCube = false;
this.isSilent = false;
this.assocCutoff = 0.3;
this.dataType = 0;
this.surfaceType = 0;
this.calculationType = "";
this.atomRadiusData = null;
this.addHydrogens = false;
this.solventRadius = 0;
this.solventExtendedAtomRadius = 0;
this.propertySmoothing = false;
this.propertySmoothingPower = 4;
this.envelopeRadius = 0;
this.cavityRadius = 0;
this.isCavity = false;
this.pocket = null;
this.minSet = 0;
this.slabInfo = null;
this.slabPlaneOffset = NaN;
this.theProperty = null;
this.solvent_ptsPerAngstrom = 4;
this.solvent_gridMax = 60;
this.plane_ptsPerAngstrom = 4;
this.plane_gridMax = 81;
this.colorBySign = false;
this.colorByPhase = false;
this.colorBySets = false;
this.colorRgb = 0;
this.colorNeg = 0;
this.colorPos = 0;
this.colorPosLCAO = 0;
this.colorNegLCAO = 0;
this.colorPhase = 0;
this.colorDensity = false;
this.iAddGridPoints = false;
this.atomIndex = 0;
this.isAngstroms = false;
this.scale = 0;
this.scale3d = 0;
this.anisotropy = null;
this.isAnisotropic = false;
this.eccentricityMatrix = null;
this.eccentricityMatrixInverse = null;
this.isEccentric = false;
this.eccentricityScale = 0;
this.eccentricityRatio = 0;
this.aniosU = null;
this.anisoB = null;
this.lcaoType = null;
this.functionInfo = null;
this.psi_n = 2;
this.psi_l = 1;
this.psi_m = 1;
this.psi_Znuc = 1;
this.psi_ptsPerAngstrom = 5;
this.psi_monteCarloCount = 0;
this.mep_gridMax = 40;
this.mep_ptsPerAngstrom = 3;
this.mep_marginAngstroms = 1;
this.mep_calcType = -1;
this.qmOrbitalType = 0;
this.qmOrbitalCount = 0;
this.moData = null;
this.qm_gridMax = 80;
this.qm_ptsPerAngstrom = 10;
this.qm_marginAngstroms = 1;
this.qm_nAtoms = 0;
this.qm_moNumber = 2147483647;
this.qm_moLinearCombination = null;
this.center = null;
this.point = null;
this.distance = 0;
this.allowVolumeRender = false;
this.script = null;
this.bsSelected = null;
this.bsIgnore = null;
this.bsSolvent = null;
this.func = null;
this.title = null;
this.blockCubeData = false;
this.readAllData = false;
this.fileIndex = -1;
this.fileName = null;
this.modelIndex = -1;
this.modelInvRotation = null;
this.isXLowToHigh = false;
this.insideOut = false;
this.dataXYReversed = false;
this.cutoff = 3.4028235E38;
this.sigma = 3.4028235E38;
this.cutoffAutomatic = true;
this.isCutoffAbsolute = false;
this.isPositiveOnly = false;
this.rangeAll = false;
this.rangeSelected = false;
this.rangeDefined = false;
this.valueMappedToRed = 0;
this.valueMappedToBlue = 0;
this.mappedDataMin = 0;
this.mappedDataMax = 0;
this.isColorReversed = false;
this.isBicolorMap = false;
this.isSquared = false;
this.isSquaredLinear = false;
this.thePlane = null;
this.isContoured = false;
this.nContours = 0;
this.thisContour = 0;
this.contourFromZero = false;
this.parameters = null;
this.resolution = 0;
this.downsampleFactor = 0;
this.maxSet = 0;
this.contoursDiscrete = null;
this.contourColixes = null;
this.contourIncrements = null;
this.boundingBox = null;
this.bsExcluded = null;
this.contourType = 0;
this.colorSchemeTranslucent = false;
this.colorEncoder = null;
this.usePropertyForColorRange = true;
this.isPeriodic = false;
this.doFullMolecular = false;
this.propertyDistanceMax = 2147483647;
this.randomSeed = 0;
this.fullyLit = false;
this.vertexSource = null;
this.intersection = null;
this.origin = null;
this.steps = null;
this.points = null;
this.volumeData = null;
this.contactPair = null;
this.mapLattice = null;
this.extendGrid = 0;
this.isMapped = false;
this.showTiming = false;
this.pointSize = 0;
this.probes = null;
this.isModelConnected = false;
this.surfaceAtoms = null;
this.filesData = null;
this.probeValues = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "Parameters");
Clazz.prepareFields (c$, function () {
this.anisotropy =  Clazz.newFloatArray (3, 0);
});
Clazz.defineMethod (c$, "initialize", 
function () {
this.addHydrogens = false;
this.allowVolumeRender = true;
this.atomRadiusData = null;
this.atomIndex = -1;
this.blockCubeData = false;
this.boundingBox = null;
this.bsExcluded =  new Array (4);
this.bsIgnore = null;
this.bsSelected = null;
this.bsSolvent = null;
this.calculationType = "";
this.center =  new JU.P3 ();
this.resetForMapping (true);
this.colorBySign = this.colorByPhase = this.colorBySets = false;
this.colorEncoder = null;
this.colorNeg = -65536;
this.colorNegLCAO = -8388480;
this.colorPos = -16776961;
this.colorPosLCAO = -23296;
this.colorRgb = -2147483648;
this.colorSchemeTranslucent = false;
this.contactPair = null;
this.contourIncrements = null;
this.contoursDiscrete = null;
this.contourColixes = null;
this.contourFromZero = true;
this.cutoff = 3.4028235E38;
this.cutoffAutomatic = true;
this.dataXYReversed = false;
this.distance = 3.4028235E38;
this.doFullMolecular = false;
this.envelopeRadius = 10;
this.extendGrid = 0;
this.fileIndex = 1;
this.readAllData = true;
this.fileName = "";
this.filesData = null;
this.fullyLit = false;
this.functionInfo = null;
this.iAddGridPoints = false;
this.insideOut = false;
this.isAngstroms = false;
this.isBicolorMap = this.isCutoffAbsolute = this.isPositiveOnly = false;
this.isCavity = false;
this.isColorReversed = false;
this.isModelConnected = false;
this.isSquared = false;
this.isSquaredLinear = false;
this.isContoured = false;
this.isEccentric = false;
this.isMapped = false;
this.isPeriodic = false;
this.isSilent = false;
this.logCube = this.logCompression = false;
this.logMessages = JU.Logger.debugging;
this.mapLattice = null;
this.mep_calcType = -1;
this.minSet = 0;
this.modelIndex = -1;
this.modelInvRotation = null;
this.nContours = 0;
this.pocket = null;
this.pointSize = NaN;
this.probes = null;
this.probeValues = null;
this.propertyDistanceMax = 2147483647;
this.propertySmoothing = false;
this.propertySmoothingPower = 4;
this.rangeDefined = false;
this.rangeAll = false;
this.rangeSelected = false;
this.resolution = 3.4028235E38;
this.scale = NaN;
this.scale3d = 0;
this.sigma = NaN;
this.slabInfo = null;
this.solventExtendedAtomRadius = 0;
this.state = 1;
this.testFlags = 0;
this.thePlane = null;
this.theProperty = null;
this.thisContour = -1;
this.title = null;
this.usePropertyForColorRange = true;
this.vertexSource = null;
});
Clazz.defineMethod (c$, "resetForMapping", 
function (haveSurface) {
if (!haveSurface) this.state = 2;
this.center.x = NaN;
this.colorDensity = false;
this.func = null;
this.intersection = null;
this.isAnisotropic = false;
this.isMapped = true;
this.mappedDataMin = 3.4028235E38;
this.origin = null;
this.parameters = null;
this.points = null;
this.qmOrbitalType = 0;
this.steps = null;
this.volumeData = null;
}, "~B");
Clazz.defineMethod (c$, "setAnisotropy", 
function (pt) {
this.anisotropy[0] = pt.x;
this.anisotropy[1] = pt.y;
this.anisotropy[2] = pt.z;
this.isAnisotropic = true;
if (Float.isNaN (this.center.x)) this.center.set (0, 0, 0);
}, "JU.P3");
Clazz.defineMethod (c$, "setEccentricity", 
function (info) {
var ecc = JU.V3.new3 (info.x, info.y, info.z);
var c = (this.scale > 0 ? this.scale : info.w < 0 ? 1 : ecc.length ());
var fab_c = Math.abs (info.w);
ecc.normalize ();
var z = JU.V3.new3 (0, 0, 1);
ecc.add (z);
ecc.normalize ();
if (Float.isNaN (ecc.x)) ecc.set (1, 0, 0);
this.eccentricityMatrixInverse =  new JU.M3 ();
this.eccentricityMatrixInverse.invertM (this.eccentricityMatrix =  new JU.M3 ().setAA (JU.A4.newVA (ecc, 3.141592653589793)));
this.isEccentric = this.isAnisotropic = true;
this.eccentricityScale = c;
this.eccentricityRatio = fab_c;
if (fab_c > 1) this.eccentricityScale *= fab_c;
this.anisotropy[0] = fab_c * c;
this.anisotropy[1] = fab_c * c;
this.anisotropy[2] = c;
if (Float.isNaN (this.center.x)) this.center.set (0, 0, 0);
}, "JU.P4");
Clazz.defineMethod (c$, "setPlane", 
function (plane) {
this.thePlane = plane;
if (this.thePlane.x == 0 && this.thePlane.y == 0 && this.thePlane.z == 0) this.thePlane.z = 1;
this.isContoured = true;
}, "JU.P4");
Clazz.defineMethod (c$, "setSphere", 
function (radius, isGeodesic) {
this.dataType = (isGeodesic ? 74 : 65);
this.distance = radius;
this.setEccentricity (JU.P4.new4 (0, 0, 1, 1));
this.cutoff = 1.4E-45;
this.isCutoffAbsolute = false;
this.isSilent = !this.logMessages;
this.script = this.getScriptParams () + " SPHERE " + radius + ";";
}, "~N,~B");
Clazz.defineMethod (c$, "setEllipsoidP4", 
function (v) {
this.dataType = 66;
this.distance = 1;
this.setEccentricity (v);
this.cutoff = 1.4E-45;
this.isCutoffAbsolute = false;
this.isSilent = !this.logMessages;
}, "JU.P4");
Clazz.defineMethod (c$, "setEllipsoidAF", 
function (bList) {
this.anisoB = bList;
this.dataType = 67;
this.distance = 0.3 * (Float.isNaN (this.scale) ? 1 : this.scale);
this.cutoff = 1.4E-45;
this.isCutoffAbsolute = false;
this.isSilent = !this.logMessages;
if (Float.isNaN (this.center.x)) this.center.set (0, 0, 0);
if (this.resolution == 3.4028235E38) this.resolution = 6;
}, "~A");
Clazz.defineMethod (c$, "setLobe", 
function (v) {
this.dataType = 68;
this.setEccentricity (v);
if (this.cutoff == 3.4028235E38) {
this.cutoff = 0.14;
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isSilent = !this.logMessages;
this.script = this.getScriptParams () + " LOBE {" + v.x + " " + v.y + " " + v.z + " " + v.w + "};";
}, "JU.P4");
Clazz.defineMethod (c$, "getScriptParams", 
 function () {
return " center " + JU.Escape.eP (this.center) + (Float.isNaN (this.scale) ? "" : " scale " + this.scale);
});
Clazz.defineMethod (c$, "setLp", 
function (v) {
this.dataType = 70;
this.setEccentricity (v);
if (this.cutoff == 3.4028235E38) {
this.cutoff = 0.14;
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isSilent = !this.logMessages;
this.script = " center " + JU.Escape.eP (this.center) + (Float.isNaN (this.scale) ? "" : " scale " + this.scale) + " LP {" + v.x + " " + v.y + " " + v.z + " " + v.w + "};";
}, "JU.P4");
Clazz.defineMethod (c$, "setRadical", 
function (v) {
this.dataType = 71;
this.setEccentricity (v);
if (this.cutoff == 3.4028235E38) {
this.cutoff = 0.14;
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isSilent = !this.logMessages;
this.script = " center " + JU.Escape.eP (this.center) + (Float.isNaN (this.scale) ? "" : " scale " + this.scale) + " RAD {" + v.x + " " + v.y + " " + v.z + " " + v.w + "};";
}, "JU.P4");
Clazz.defineMethod (c$, "setLcao", 
function (type, colorPtr) {
this.lcaoType = type;
if (colorPtr == 1) this.colorPosLCAO = this.colorNegLCAO;
this.isSilent = !this.logMessages;
}, "~S,~N");
Clazz.defineMethod (c$, "setSolvent", 
function (propertyName, radius) {
this.isEccentric = this.isAnisotropic = false;
this.solventRadius = Math.abs (radius);
this.dataType = (this.intersection != null ? 1333 : "nomap" === propertyName ? 1207 : "molecular" === propertyName ? 1203 : "sasurface" === propertyName || this.solventRadius == 0 ? 1196 : 1195);
if (this.state < 2 && (this.cutoffAutomatic || !this.colorDensity) && (this.intersection == null || this.cutoff == 3.4028235E38)) this.cutoff = 0.0;
switch (this.dataType) {
case 1333:
this.calculationType = "VDW intersection";
break;
case 1207:
this.calculationType = "unmapped plane";
break;
case 1203:
this.calculationType = "molecular surface with radius " + this.solventRadius;
break;
case 1195:
this.calculationType = "solvent-excluded surface with radius " + this.solventRadius;
break;
case 1196:
this.calculationType = "solvent-accessible surface with radius " + this.solventRadius;
break;
}
switch (this.dataType) {
case 1207:
this.solventExtendedAtomRadius = this.solventRadius;
this.solventRadius = 0;
this.isContoured = false;
break;
case 1203:
this.solventExtendedAtomRadius = 0;
break;
case 1195:
this.solventExtendedAtomRadius = 0;
if (this.bsIgnore == null) this.bsIgnore = this.bsSolvent;
 else if (this.bsSolvent != null) this.bsIgnore.or (this.bsSolvent);
break;
case 1196:
this.solventExtendedAtomRadius = this.solventRadius;
this.solventRadius = 0;
if (this.bsIgnore == null) this.bsIgnore = this.bsSolvent;
 else if (this.bsSolvent != null) this.bsIgnore.or (this.bsSolvent);
break;
}
}, "~S,~N");
Clazz.defineMethod (c$, "setFunctionXY", 
function (value) {
this.dataType = 8;
this.functionInfo = value;
this.cutoff = 1.4E-45;
this.isEccentric = this.isAnisotropic = false;
}, "JU.Lst");
Clazz.defineMethod (c$, "setFunctionXYZ", 
function (value) {
this.dataType = 9;
this.functionInfo = value;
if (this.cutoff == 3.4028235E38) this.cutoff = 1.4E-45;
this.isEccentric = this.isAnisotropic = false;
}, "JU.Lst");
Clazz.defineMethod (c$, "setAtomicOrbital", 
function (nlmZprs) {
this.dataType = 1294;
this.setEccentricity (JU.P4.new4 (0, 0, 1, 1));
this.psi_n = Clazz.floatToInt (nlmZprs[0]);
this.psi_l = Clazz.floatToInt (nlmZprs[1]);
this.psi_m = Clazz.floatToInt (nlmZprs[2]);
this.psi_Znuc = nlmZprs[3];
this.psi_monteCarloCount = Clazz.floatToInt (nlmZprs[4]);
this.distance = nlmZprs[5];
if (this.distance != 0 || this.thePlane != null) this.allowVolumeRender = false;
this.randomSeed = Clazz.floatToInt (nlmZprs[6]);
this.psi_ptsPerAngstrom = 10;
if (this.cutoff == 3.4028235E38 || this.cutoff == 0.14) {
this.cutoff = (this.psi_monteCarloCount > 0 ? 0 : 0.04);
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isCutoffAbsolute = true;
if (this.state < 2 && this.thePlane == null && this.colorBySign) this.isBicolorMap = true;
return (this.psi_Znuc > 0 && Math.abs (this.psi_m) <= this.psi_l && this.psi_l < this.psi_n);
}, "~A");
Clazz.defineMethod (c$, "setMep", 
function (charges, isMLP) {
this.dataType = (isMLP ? 1329 : 1328);
this.theProperty = charges;
this.usePropertyForColorRange = false;
this.isEccentric = this.isAnisotropic = false;
if (this.cutoff == 3.4028235E38) {
this.cutoff = 0.1;
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isCutoffAbsolute = (this.cutoff > 0 && !this.isPositiveOnly);
this.contourFromZero = false;
if (this.state >= 2 || this.thePlane != null) {
if (!this.rangeDefined && !this.rangeAll) {
this.valueMappedToRed = -0.1;
this.valueMappedToBlue = 0.1;
this.rangeDefined = true;
}} else {
this.colorBySign = true;
this.isBicolorMap = true;
}}, "~A,~B");
Clazz.defineMethod (c$, "setNci", 
function (isPromolecular) {
this.fullyLit = true;
this.qm_gridMax = 200;
if (isPromolecular) this.dataType = 1844;
this.qm_marginAngstroms = 2;
this.qmOrbitalType = (isPromolecular ? 3 : 4);
if (isPromolecular) {
if (this.parameters == null || this.parameters.length < 2) this.parameters =  Clazz.newFloatArray (-1, [this.cutoff, 2]);
}if (this.cutoff == 3.4028235E38 || this.cutoff == 0) this.cutoff = 0.3;
if (this.isSquared) this.cutoff *= this.cutoff;
if (this.title == null) this.title =  new Array (0);
this.moData =  new java.util.Hashtable ();
}, "~B");
Clazz.defineMethod (c$, "setMO", 
function (iMo, linearCombination) {
this.isModelConnected = true;
this.qm_moLinearCombination = linearCombination;
this.qm_moNumber = (linearCombination == null ? Math.abs (iMo) : Clazz.floatToInt (linearCombination[1]));
this.qmOrbitalType = (this.moData.containsKey ("haveVolumeData") ? 5 : this.moData.containsKey ("gaussians") ? 1 : this.moData.containsKey ("slaters") ? 2 : 0);
var isElectronDensity = (iMo <= 0 && linearCombination == null);
if (this.qmOrbitalType == 0) {
JU.Logger.error ("MO ERROR: No basis functions found in file for MO calculation. (GAUSSIAN 'gfprint' keyword may be missing?)");
this.title =  Clazz.newArray (-1, ["no basis functions found in file"]);
} else {
var mos = this.moData.get ("mos");
this.qmOrbitalCount = mos.size ();
this.calculationType = this.moData.get ("calculationType");
this.calculationType = "Molecular orbital #" + this.qm_moNumber + "/" + this.qmOrbitalCount + " " + (this.calculationType == null ? "" : this.calculationType);
if (!isElectronDensity) {
if (this.title == null) {
this.title =  new Array (5);
this.title[0] = "%F";
this.title[1] = "Model %M  MO %I/%N %T";
this.title[2] = "?Energy = %E %U";
this.title[3] = "?Symmetry = %S";
this.title[4] = "?Occupancy = %O";
}}}this.dataType = 1837;
if (this.cutoff == 3.4028235E38) {
this.cutoff = (isElectronDensity ? 0.01 : 0.05);
}if (this.isSquared || this.isSquaredLinear) this.cutoff = this.cutoff * this.cutoff;
this.isEccentric = this.isAnisotropic = false;
this.isCutoffAbsolute = (this.cutoff > 0 && !this.isPositiveOnly);
if (this.state >= 2 || this.thePlane != null) return;
this.colorBySign = true;
if (this.colorByPhase && this.colorPhase == 0) this.colorByPhase = false;
this.isBicolorMap = true;
}, "~N,~A");
Clazz.defineMethod (c$, "setMapRanges", 
function (surfaceReader, haveData) {
if (!this.colorDensity) if (this.colorByPhase || this.colorBySign || (this.thePlane != null || this.isBicolorMap) && !this.isContoured) {
this.mappedDataMin = -1;
this.mappedDataMax = 1;
}if (this.mappedDataMin == 3.4028235E38 || this.mappedDataMin == this.mappedDataMax) {
var minMax = surfaceReader.getMinMaxMappedValues (haveData);
System.out.println ("parameters - setmapranges " + minMax[0] + " " + minMax[1]);
this.mappedDataMin = minMax[0];
this.mappedDataMax = minMax[1];
}if (this.mappedDataMin == 0 && this.mappedDataMax == 0) {
this.mappedDataMin = -1;
this.mappedDataMax = 1;
}if (!this.rangeDefined) {
this.valueMappedToRed = this.mappedDataMin;
this.valueMappedToBlue = this.mappedDataMax;
}}, "J.jvxl.readers.SurfaceReader,~B");
Clazz.defineMethod (c$, "addSlabInfo", 
function (slabObject) {
if (this.slabInfo == null) this.slabInfo =  new JU.Lst ();
this.slabInfo.addLast (slabObject);
}, "~A");
Clazz.defineMethod (c$, "isInsideOut", 
function () {
return this.insideOut != this.dataXYReversed;
});
Clazz.defineMethod (c$, "isFullyLit", 
function () {
return (this.thePlane != null || this.fullyLit);
});
Clazz.defineStatics (c$,
"STATE_UNINITIALIZED", 0,
"STATE_INITIALIZED", 1,
"STATE_DATA_READ", 2,
"STATE_DATA_COLORED", 3,
"NO_ANISOTROPY", 32,
"IS_SILENT", 64,
"IS_SOLVENTTYPE", 128,
"HAS_MAXGRID", 256,
"IS_POINTMAPPABLE", 512,
"IS_SLABBABLE", 1024,
"SURFACE_NONE", 0,
"SURFACE_SPHERE", 65,
"SURFACE_ELLIPSOID2", 66,
"SURFACE_ELLIPSOID3", 67,
"SURFACE_LOBE", 68,
"SURFACE_LCAOCARTOON", 69,
"SURFACE_LONEPAIR", 70,
"SURFACE_RADICAL", 71,
"SURFACE_FUNCTIONXY", 8,
"SURFACE_FUNCTIONXYZ", 9,
"SURFACE_GEODESIC", 74,
"SURFACE_SOLVENT", 1195,
"SURFACE_SASURFACE", 1196,
"SURFACE_MOLECULARORBITAL", 1837,
"SURFACE_ATOMICORBITAL", 1294,
"SURFACE_MEP", 1328,
"SURFACE_MLP", 1329,
"SURFACE_MOLECULAR", 1203,
"SURFACE_NCI", 1844,
"SURFACE_INTERSECT_ATOM", 1333,
"SURFACE_INTERSECT_FILE", 1334,
"SURFACE_NOMAP", 1207,
"SURFACE_PROPERTY", 1208,
"ANGSTROMS_PER_BOHR", 0.5291772,
"defaultEdgeFractionBase", 35,
"defaultEdgeFractionRange", 90,
"defaultColorFractionBase", 35,
"defaultColorFractionRange", 90,
"defaultMappedDataMin", 0,
"defaultMappedDataMax", 1.0,
"defaultCutoff", 0.02,
"defaultOrbitalCutoff", 0.04,
"defaultLobeCutoff", 0.14,
"defaultOrbitalCutoffOld", 0.14,
"defaultQMOrbitalCutoff", 0.050,
"defaultQMElectronDensityCutoff", 0.010,
"defaultContourCount", 11,
"nContourMax", 100,
"defaultColorNegative", 0xFFFF0000,
"defaultColorPositive", 0xFF0000FF,
"defaultColorNegativeLCAO", 0xFF800080,
"defaultColorPositiveLCAO", 0xFFFFA500,
"defaultSolventRadius", 1.2,
"defaultMepCutoff", 0.1,
"defaultMepMin", -0.1,
"defaultMepMax", 0.1,
"MEP_MAX_GRID", 40,
"QM_TYPE_UNKNOWN", 0,
"QM_TYPE_GAUSSIAN", 1,
"QM_TYPE_SLATER", 2,
"QM_TYPE_NCI_PRO", 3,
"QM_TYPE_NCI_SCF", 4,
"QM_TYPE_VOLUME_DATA", 5,
"MO_MAX_GRID", 80);
});
