Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.VolumeFileReader"], "J.jvxl.readers.UhbdReader", ["JU.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.planeCount = 0;
this.voxelCount = 0;
this.pt = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "UhbdReader", J.jvxl.readers.VolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.UhbdReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2VFR (sg, br);
if (this.params.thePlane == null) this.params.insideOut = !this.params.insideOut;
this.isAngstroms = true;
this.nSurfaces = 1;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.rd ();
this.jvxlFileHeaderBuffer = JU.SB.newS (this.line);
this.jvxlFileHeaderBuffer.append ("UHBD format ").append (this.line).append ("\n");
this.jvxlFileHeaderBuffer.append ("see http://sourceforge.net/p/apbs/code/ci/9527462a39126fb6cd880924b3cc4880ec4b78a9/tree/src/mg/vgrid.c\n");
this.rd ();
this.rd ();
this.voxelCounts[0] = this.parseIntStr (this.line.substring (0, 7));
this.voxelCounts[1] = this.parseIntStr (this.line.substring (7, 14));
this.voxelCounts[2] = this.parseIntStr (this.line.substring (14, 21));
var dx = this.parseFloatStr (this.line.substring (21, 33));
this.volumetricOrigin.set (this.parseFloatStr (this.line.substring (33, 45)), this.parseFloatStr (this.line.substring (45, 57)), this.parseFloatStr (this.line.substring (57, 69)));
this.volumetricVectors[0].set (0, 0, dx);
this.volumetricVectors[1].set (0, dx, 0);
this.volumetricVectors[2].set (dx, 0, 0);
this.planeCount = this.voxelCounts[0] * this.voxelCounts[1];
this.rd ();
this.rd ();
});
Clazz.overrideMethod (c$, "nextVoxel", 
function () {
if (this.voxelCount % this.planeCount == 0) {
this.rd ();
this.pt = 0;
}if (this.pt % 78 == 0) {
this.rd ();
this.pt = 0;
}this.voxelCount++;
var voxelValue = this.parseFloatStr (this.line.substring (this.pt, this.pt + 13));
this.pt += 13;
return voxelValue;
});
});
