Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.VolumeFileReader"], "J.jvxl.readers.XsfReader", ["JU.SB", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isBXSF = false;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "XsfReader", J.jvxl.readers.VolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.XsfReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2VFR (sg, br);
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.isAngstroms = false;
this.params.blockCubeData = true;
this.jvxlFileHeaderBuffer =  new JU.SB ();
this.jvxlFileHeaderBuffer.append ("XsfReader file\n");
var needCutoff = this.params.cutoffAutomatic;
this.isAngstroms = true;
var beginKey = "BEGIN_DATAGRID_3D";
this.nSurfaces = 1;
while (this.rd () != null && this.line.indexOf (beginKey) < 0) {
JU.Logger.info (this.line);
if (this.line.indexOf ("Fermi Energy:") >= 0) {
this.isBXSF = true;
beginKey = "BEGIN_BANDGRID_3D";
if (needCutoff) {
this.params.cutoff = this.parseFloatStr (this.getTokens ()[2]);
needCutoff = false;
}}continue;
}
if (needCutoff) this.params.cutoff = 0.05;
if (this.isBXSF) this.nSurfaces = this.parseIntStr (this.rd ());
this.voxelCounts[0] = this.parseIntStr (this.rd ());
this.voxelCounts[1] = this.parseInt ();
this.voxelCounts[2] = this.parseInt ();
this.volumetricOrigin.set (this.parseFloatStr (this.rd ()), this.parseFloat (), this.parseFloat ());
for (var i = 0; i < 3; ++i) {
this.volumetricVectors[i].set (this.parseFloatStr (this.rd ()), this.parseFloat (), this.parseFloat ());
this.volumetricVectors[i].scale (1.0 / (this.voxelCounts[i] - 1));
}
if (this.isBXSF) {
} else {
this.swapXZ ();
}});
Clazz.overrideMethod (c$, "gotoData", 
function (n, nPoints) {
if (!this.params.blockCubeData) return;
if (n > 0) JU.Logger.info ("skipping " + n + " data sets, " + nPoints + " points each");
if (this.isBXSF) JU.Logger.info (this.rd ());
for (var i = 0; i < n; i++) this.skipData (nPoints);

}, "~N,~N");
Clazz.overrideMethod (c$, "skipData", 
function (nPoints) {
this.skipDataVFR (nPoints);
if (this.isBXSF) JU.Logger.info (this.rd ());
}, "~N");
});
