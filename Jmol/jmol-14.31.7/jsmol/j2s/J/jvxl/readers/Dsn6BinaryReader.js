Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.MapFileReader"], "J.jvxl.readers.Dsn6BinaryReader", ["java.io.DataInputStream", "JU.Rdr", "$.SB", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.byteFactor = 0;
this.xyCount = 0;
this.nBrickX = 0;
this.nBrickY = 0;
this.brickLayerVoxelCount = 0;
this.brickLayerByteCount = 0;
this.brickRowByteCount = 0;
this.brickLayer = null;
this.pt = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "Dsn6BinaryReader", J.jvxl.readers.MapFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.Dsn6BinaryReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, brNull) {
this.init2MFR (sg, this.br);
this.binarydoc = this.newBinaryDocument ();
var o2 = sg.getReaderData ();
var fileName = o2[0];
var data = o2[1];
if (data == null) this.binarydoc.setStream (sg.atomDataServer.getBufferedInputStream (fileName), true);
 else this.binarydoc.setStreamData ( new java.io.DataInputStream (JU.Rdr.getBIS (data.getBytes ())), true);
if (this.params.thePlane == null) this.params.insideOut = !this.params.insideOut;
this.nSurfaces = 1;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
var header =  Clazz.newShortArray (19, 0);
for (var i = 0; i < 19; i++) header[i] = this.binarydoc.readShort ();

if (header[18] != 100) {
this.binarydoc.setStream (null, false);
for (var i = 0; i < 19; i++) header[i] = this.binarydoc.swapBytesS (header[i]);

}this.xyzStart[0] = header[0];
this.xyzStart[1] = header[1];
this.xyzStart[2] = header[2];
this.n0 = header[3];
this.n1 = header[4];
this.n2 = header[5];
this.na = header[6];
this.nb = header[7];
this.nc = header[8];
this.a = header[9];
this.b = header[10];
this.c = header[11];
this.alpha = header[12];
this.beta = header[13];
this.gamma = header[14];
var header16 = header[15];
var header17 = header[16];
var scalingFactor = header[17];
var header19 = header[18];
this.maps = 3;
this.mapr = 2;
this.mapc = 1;
this.dmin = (0 - header17) * header19 / header16;
this.dmax = (255 - header17) * header19 / header16;
this.drange = this.dmax - this.dmin;
this.byteFactor = this.drange / 255;
var dminError1 = (0 - header17 - 0.5) * header19 / (header16 - 0.5);
var dminError2 = (0 - header17 + 0.5) * header19 / (header16 + 0.5);
var dmaxError1 = (255 - header17 - 0.5) * header19 / (header16 - 0.5);
var dmaxError2 = (255 - header17 + 0.5) * header19 / (header16 + 0.5);
var dminError = Math.round ((dminError2 - dminError1) / 0.002) * 0.001;
var dmaxError = Math.round ((dmaxError2 - dmaxError1) / 0.002) * 0.001;
JU.Logger.info ("DNS6 dmin,dmax = " + this.dmin + "+/-" + dminError + "," + this.dmax + "+/-" + dmaxError);
this.a /= scalingFactor;
this.b /= scalingFactor;
this.c /= scalingFactor;
this.alpha /= scalingFactor;
this.beta /= scalingFactor;
this.gamma /= scalingFactor;
this.binarydoc.seek (0x200);
this.getVectorsAndOrigin ();
this.setCutoffAutomatic ();
this.xyCount = this.n0 * this.n1;
this.brickLayerVoxelCount = this.xyCount * 8;
this.nBrickX = Clazz.doubleToInt ((this.n0 + 7) / 8);
this.nBrickY = Clazz.doubleToInt ((this.n1 + 7) / 8);
this.brickRowByteCount = this.nBrickX * 512;
this.brickLayerByteCount = this.brickRowByteCount * this.nBrickY;
this.brickLayer =  Clazz.newByteArray (this.brickLayerByteCount, 0);
this.jvxlFileHeaderBuffer =  new JU.SB ();
this.jvxlFileHeaderBuffer.append ("DNS6/O progressive brick data reader\n");
this.jvxlFileHeaderBuffer.append ("see http://www.uoxray.uoregon.edu/tnt/manual/node104.html\n");
});
Clazz.defineMethod (c$, "readBrickLayer", 
 function () {
this.binarydoc.readByteArray (this.brickLayer, 0, this.brickLayerByteCount);
this.pt = 0;
this.nBytes = this.binarydoc.getPosition ();
});
Clazz.defineMethod (c$, "getBrickValue", 
 function (pt) {
var x = pt % this.n0;
var y = (Clazz.doubleToInt (pt / this.n0)) % this.n1;
var z = Clazz.doubleToInt (pt / this.xyCount);
var brickX = x % 8;
var brickY = y % 8;
var brickZ = z % 8;
var bX = Clazz.doubleToInt (x / 8);
var bY = Clazz.doubleToInt (y / 8);
var bPt = bY * 512 * this.nBrickX + bX * 512 + brickZ * 64 + brickY * 8 + brickX;
if (bPt % 2 == 0) bPt++;
 else bPt--;
var value = (this.brickLayer[bPt] + 256) % 256;
return this.dmin + value * this.byteFactor;
}, "~N");
Clazz.overrideMethod (c$, "nextVoxel", 
function () {
if ((this.pt % this.brickLayerVoxelCount) == 0) this.readBrickLayer ();
return this.getBrickValue (this.pt++);
});
Clazz.overrideMethod (c$, "skipData", 
function (nPoints) {
for (var i = 0; i < nPoints; i++) this.binarydoc.readByte ();

}, "~N");
});
