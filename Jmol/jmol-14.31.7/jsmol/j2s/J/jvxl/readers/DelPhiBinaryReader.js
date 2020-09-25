Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.VolumeFileReader"], "J.jvxl.readers.DelPhiBinaryReader", ["JU.SB", "$.V3", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.pt = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "DelPhiBinaryReader", J.jvxl.readers.VolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.DelPhiBinaryReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
var fileName = (sg.getReaderData ())[0];
this.init2VFR (sg, br);
this.binarydoc = this.newBinaryDocument ();
this.setStream (fileName, false);
this.nSurfaces = 1;
if (this.params.thePlane == null) this.params.insideOut = !this.params.insideOut;
this.allowSigma = false;
this.isAngstroms = true;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
var uplbl = this.readString ();
JU.Logger.info (uplbl);
var nxttoplbl = this.readString ();
JU.Logger.info (nxttoplbl);
this.data = this.readFloatArray ();
JU.Logger.info ("DelPhi data length: " + this.data.length);
var botlbl = this.readString ();
JU.Logger.info (botlbl);
var scalemid = this.readFloatArray ();
var scale = scalemid[0];
JU.Logger.info ("DelPhi scale: " + scale);
var dx = (scale == 1 ? 0.84375 : 1 / scale);
this.volumetricVectors[0] = JU.V3.new3 (0, 0, dx);
this.volumetricVectors[1] = JU.V3.new3 (0, dx, 0);
this.volumetricVectors[2] = JU.V3.new3 (dx, 0, 0);
JU.Logger.info ("DelPhi resolution (pts/angstrom) set to: " + dx);
var nx = 65;
this.voxelCounts[0] = this.voxelCounts[1] = this.voxelCounts[2] = nx;
JU.Logger.info ("DelPhi voxel counts: " + nx);
dx *= Clazz.doubleToInt ((nx - 1) / 2);
this.volumetricOrigin.set (scalemid[1], scalemid[2], scalemid[3]);
JU.Logger.info ("DelPhi center " + this.volumetricOrigin);
this.volumetricOrigin.x -= dx;
this.volumetricOrigin.y -= dx;
this.volumetricOrigin.z -= dx;
this.jvxlFileHeaderBuffer =  new JU.SB ();
this.jvxlFileHeaderBuffer.append ("DelPhi DATA ").append (nxttoplbl.$replace ('\n', ' ').trim ()).append ("\n\n");
});
Clazz.defineMethod (c$, "readString", 
 function () {
var n = this.binarydoc.readInt ();
var buf =  Clazz.newByteArray (n, 0);
this.binarydoc.readByteArray (buf, 0, n);
this.binarydoc.readInt ();
return  String.instantialize (buf);
});
Clazz.defineMethod (c$, "readFloatArray", 
 function () {
var n = this.binarydoc.readInt () >> 2;
var a =  Clazz.newFloatArray (n, 0);
for (var i = 0; i < n; i++) a[i] = this.binarydoc.readFloat ();

this.binarydoc.readInt ();
return a;
});
Clazz.overrideMethod (c$, "nextVoxel", 
function () {
this.nBytes += 4;
return this.data[this.pt++];
});
Clazz.overrideMethod (c$, "skipData", 
function (nPoints) {
this.pt += nPoints;
}, "~N");
});
