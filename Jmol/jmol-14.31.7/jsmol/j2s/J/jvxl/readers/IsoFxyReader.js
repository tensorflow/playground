Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.AtomDataReader"], "J.jvxl.readers.IsoFxyReader", ["JU.SB", "J.jvxl.data.JvxlCoder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.isPlanarMapping = false;
this.func = null;
this.values = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "IsoFxyReader", J.jvxl.readers.AtomDataReader);
Clazz.prepareFields (c$, function () {
this.values =  Clazz.newFloatArray (3, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.IsoFxyReader, []);
});
Clazz.overrideMethod (c$, "init", 
function (sg) {
this.initIFR (sg);
}, "J.jvxl.readers.SurfaceGenerator");
Clazz.defineMethod (c$, "initIFR", 
function (sg) {
this.initADR (sg);
this.isXLowToHigh = true;
this.precalculateVoxelData = false;
this.params.fullyLit = true;
this.isPlanarMapping = (this.params.thePlane != null || this.params.state == 3);
if (this.params.func != null) this.volumeData.sr = this;
}, "J.jvxl.readers.SurfaceGenerator");
Clazz.overrideMethod (c$, "setup", 
function (isMapData) {
if (this.params.functionInfo.size () > 5) this.data = this.params.functionInfo.get (5);
this.setupType ("functionXY");
}, "~B");
Clazz.defineMethod (c$, "setupType", 
function (type) {
this.func = this.params.func;
var functionName = this.params.functionInfo.get (0);
this.jvxlFileHeaderBuffer =  new JU.SB ();
this.jvxlFileHeaderBuffer.append (type).append ("\n").append (functionName).append ("\n");
if (this.params.thePlane != null || this.data == null && !this.useOriginStepsPoints) this.setVolumeForPlane ();
 else if (this.data == null) this.setVolumeDataParams ();
 else this.setVolumeData ();
J.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
}, "~S");
Clazz.overrideMethod (c$, "setVolumeData", 
function () {
if (this.data == null) {
this.setVolumeDataADR ();
return;
}this.volumetricOrigin.setT (this.params.functionInfo.get (1));
for (var i = 0; i < 3; i++) {
var info = this.params.functionInfo.get (i + 2);
this.voxelCounts[i] = Math.abs (Clazz.floatToInt (info.x));
this.volumetricVectors[i].set (info.y, info.z, info.w);
}
if (this.isAnisotropic) this.setVolumetricAnisotropy ();
});
Clazz.overrideMethod (c$, "readSurfaceData", 
function (isMapData) {
if (this.volumeData.sr != null) return;
this.readSurfaceDataVDR (isMapData);
}, "~B");
Clazz.overrideMethod (c$, "getPlane", 
function (x) {
var plane = this.getPlaneSR (x);
this.setPlane (x, plane);
return plane;
}, "~N");
Clazz.defineMethod (c$, "setPlane", 
 function (x, plane) {
for (var y = 0, ptyz = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) plane[ptyz++] = this.getValue (x, y, z);


}, "~N,~A");
Clazz.defineMethod (c$, "getValue", 
function (x, y, z) {
var value;
if (this.data == null) {
value = this.evaluateValue (x, y, z);
} else {
this.volumeData.voxelPtToXYZ (x, y, z, this.ptTemp);
value = this.data[x][y];
}return (this.isPlanarMapping ? value : value - this.ptTemp.z);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "getValueAtPoint", 
function (pt, getSource) {
if (this.params.func == null) return 0;
this.values[0] = pt.x;
this.values[1] = pt.y;
this.values[2] = pt.z;
return this.sg.atomDataServer.evalFunctionFloat (this.func[0], this.func[1], this.values);
}, "JU.T3,~B");
Clazz.defineMethod (c$, "evaluateValue", 
function (x, y, z) {
this.volumeData.voxelPtToXYZ (x, y, z, this.ptTemp);
return this.getValueAtPoint (this.ptTemp, false);
}, "~N,~N,~N");
});
