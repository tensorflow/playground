Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.VolumeFileReader"], "J.jvxl.readers.PeriodicVolumeFileReader", null, function () {
c$ = Clazz.declareType (J.jvxl.readers, "PeriodicVolumeFileReader", J.jvxl.readers.VolumeFileReader);
Clazz.overrideMethod (c$, "readSurfaceData", 
function (isMapData) {
this.initializeSurfaceData ();
this.newVoxelDataCube ();
this.getPeriodicVoxels ();
if (this.params.extendGrid != 0) {
var n =  Clazz.newIntArray (3, 0);
var nx = this.nPointsX - 1;
var ny = this.nPointsY - 1;
var nz = this.nPointsZ - 1;
for (var i = 0; i < 3; i++) {
var vi = this.voxelCounts[i] - 1;
n[i] = Clazz.floatToInt (vi * this.params.extendGrid);
this.volumetricOrigin.scaleAdd2 (-n[i], this.volumetricVectors[i], this.volumetricOrigin);
vi += 2 * n[i];
while (n[i] > 0) n[i] -= this.voxelCounts[i] - 1;

this.voxelCounts[i] = vi + 1;
}
this.nPointsX = this.voxelCounts[0];
this.nPointsY = this.voxelCounts[1];
this.nPointsZ = this.voxelCounts[2];
var vd =  Clazz.newFloatArray (this.nPointsX, this.nPointsY, this.nPointsZ, 0);
for (var i = this.nPointsX; --i >= 0; ) for (var j = this.nPointsY; --j >= 0; ) for (var k = this.nPointsZ; --k >= 0; ) {
vd[i][j][k] = this.voxelData[(i - n[0]) % nx][(j - n[1]) % ny][(k - n[2]) % nz];
}


this.voxelData = vd;
} else {
var n;
n = this.nPointsX - 1;
for (var i = 0; i < this.nPointsY; ++i) for (var j = 0; j < this.nPointsZ; ++j) this.voxelData[n][i][j] = this.voxelData[0][i][j];


n = this.nPointsY - 1;
for (var i = 0; i < this.nPointsX; ++i) for (var j = 0; j < this.nPointsZ; ++j) this.voxelData[i][n][j] = this.voxelData[i][0][j];


n = this.nPointsZ - 1;
for (var i = 0; i < this.nPointsX; ++i) for (var j = 0; j < this.nPointsY; ++j) this.voxelData[i][j][n] = this.voxelData[i][j][0];


}if (isMapData && this.volumeData.hasPlane ()) {
this.volumeData.setVoxelMap ();
for (var x = 0; x < this.nPointsX; ++x) {
for (var y = 0; y < this.nPointsY; ++y) {
for (var z = 0; z < this.nPointsZ; ++z) {
var f = this.volumeData.getToPlaneParameter ();
if (this.volumeData.isNearPlane (x, y, z, f)) this.volumeData.setVoxelMapValue (x, y, z, this.voxelData[x][y][z]);
}
}
}
this.voxelData = null;
}this.volumeData.setVoxelDataAsArray (this.voxelData);
if (this.dataMin > this.params.cutoff) this.params.cutoff = 2 * this.dataMin;
}, "~B");
});
