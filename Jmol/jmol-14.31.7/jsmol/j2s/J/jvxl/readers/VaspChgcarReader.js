Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.PeriodicVolumeFileReader"], "J.jvxl.readers.VaspChgcarReader", ["java.lang.Float", "JU.PT", "$.SB", "JU.Logger", "$.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.volume = 0;
this.pt = 0;
this.nPerLine = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "VaspChgcarReader", J.jvxl.readers.PeriodicVolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.VaspChgcarReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2VFR (sg, br);
this.isAngstroms = true;
this.isPeriodic = true;
this.isProgressive = false;
this.nSurfaces = 1;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.jvxlFileHeaderBuffer =  new JU.SB ();
this.jvxlFileHeaderBuffer.append ("Vasp CHGCAR format\n\n\n");
this.rd ();
var scale = this.parseFloatStr (this.rd ());
var data =  Clazz.newFloatArray (15, 0);
data[0] = -1;
for (var i = 0, pt = 6; i < 3; ++i) this.volumetricVectors[i].set (data[pt++] = this.parseFloatStr (this.rd ()) * scale, data[pt++] = this.parseFloat () * scale, data[pt++] = this.parseFloat () * scale);

this.volume = JU.SimpleUnitCell.newA (data).volume;
while (this.rd ().length > 2) {
}
this.rd ();
var counts = this.getTokens ();
for (var i = 0; i < 3; ++i) {
this.volumetricVectors[i].scale (1 / ((this.voxelCounts[i] = this.parseIntStr (counts[i]) + 1) - 1));
if (this.isAnisotropic) this.setVectorAnisotropy (this.volumetricVectors[i]);
}
this.swapXZ ();
this.volumetricOrigin.set (0, 0, 0);
if (this.params.thePlane == null && (this.params.cutoffAutomatic || !Float.isNaN (this.params.sigma))) {
this.params.cutoff = 0.5;
JU.Logger.info ("Cutoff set to " + this.params.cutoff);
}});
Clazz.overrideMethod (c$, "nextVoxel", 
function () {
if (this.pt++ % this.nPerLine == 0 && this.nData > 0) {
this.rd ();
this.next[0] = 0;
}return this.parseFloat () / this.volume;
});
Clazz.overrideMethod (c$, "getPeriodicVoxels", 
function () {
var ni = this.voxelCounts[0] - 1;
var nj = this.voxelCounts[1] - 1;
var nk = this.voxelCounts[2] - 1;
var downSampling = (this.nSkipX > 0);
this.nPerLine = JU.PT.countTokens (this.rd (), 0);
for (var i = 0; i < ni; i++) {
for (var j = 0; j < nj; j++) {
for (var k = 0; k < nk; k++) {
this.voxelData[i][j][k] = this.recordData (this.nextVoxel ());
if (downSampling) for (var m = this.nSkipX; --m >= 0; ) this.nextVoxel ();

}
if (downSampling) for (var m = this.nSkipY; --m >= 0; ) this.nextVoxel ();

}
if (downSampling) for (var m = this.nSkipZ; --m >= 0; ) this.nextVoxel ();

}
});
});
