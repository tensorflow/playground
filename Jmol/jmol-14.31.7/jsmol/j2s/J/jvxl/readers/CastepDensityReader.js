Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.PeriodicVolumeFileReader"], "J.jvxl.readers.CastepDensityReader", ["JU.PT", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nFilePoints = 0;
this.nSkip = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "CastepDensityReader", J.jvxl.readers.PeriodicVolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.CastepDensityReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2VFR (sg, br);
this.isProgressive = false;
this.isAngstroms = true;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "gotoData", 
function (n, nPoints) {
this.nSkip = n;
}, "~N,~N");
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.jvxlFileHeaderBuffer =  new JU.SB ();
while (this.rd () != null && this.line.indexOf (".") < 0) {
}
for (var i = 0; i < 3; ++i) {
var voxelVector = this.volumetricVectors[i];
voxelVector.set (this.parseFloatStr (this.line), this.parseFloat (), this.parseFloat ());
this.rd ();
}
this.nSurfaces = this.parseIntStr (this.rd ());
this.rd ();
this.voxelCounts[0] = (this.nPointsX = this.parseIntStr (this.line)) + 1;
this.voxelCounts[1] = (this.nPointsY = this.parseInt ()) + 1;
this.voxelCounts[2] = (this.nPointsZ = this.parseInt ()) + 1;
this.nFilePoints = (this.nPointsX++) * (this.nPointsY++) * (this.nPointsZ++);
this.volumetricOrigin.set (0, 0, 0);
for (var i = 0; i < 3; i++) {
this.volumetricVectors[i].scale (1 / (this.voxelCounts[i] - 1));
if (this.isAnisotropic) this.setVectorAnisotropy (this.volumetricVectors[i]);
}
while (this.rd ().trim ().length > 0) {
}
});
Clazz.overrideMethod (c$, "getPeriodicVoxels", 
function () {
this.rd ();
var tokens = this.getTokens ();
if (this.nSkip > 0 && tokens.length < 3 + this.nSurfaces) {
for (var j = 0; j < this.nSkip; j++) for (var i = 0; i < this.nFilePoints; i++) this.rd ();


this.nSkip = 0;
}var dsf = this.downsampleFactor;
if (dsf > 1) {
for (var i = 0; i < this.nFilePoints; i++) {
var x = this.parseIntStr (this.line) - 1;
var y = this.parseInt () - 1;
var z = this.parseInt () - 1;
if (x % dsf == 0 && y % dsf == 0 && z % dsf == 0) {
if (this.nSkip > 0) this.skipPoints (this.nSkip);
this.voxelData[Clazz.doubleToInt (x / dsf)][Clazz.doubleToInt (y / dsf)][Clazz.doubleToInt (z / dsf)] = this.recordData (this.parseFloat ());
}this.rd ();
}
} else {
for (var i = 0; i < this.nFilePoints; i++) {
var x = this.parseIntStr (this.line) - 1;
var y = this.parseInt () - 1;
var z = this.parseInt () - 1;
if (this.nSkip > 0) this.skipPoints (this.nSkip);
this.voxelData[x][y][z] = this.recordData (this.parseFloat ());
this.rd ();
}
}});
Clazz.defineMethod (c$, "skipPoints", 
 function (n) {
var pt = this.next[0];
for (var i = 0; i < n; i++) {
while (pt < this.line.length && JU.PT.isWhitespace (this.line.charAt (pt++))) {
}
while (pt < this.line.length && !JU.PT.isWhitespace (this.line.charAt (pt++))) {
}
}
this.next[0] = pt;
}, "~N");
});
