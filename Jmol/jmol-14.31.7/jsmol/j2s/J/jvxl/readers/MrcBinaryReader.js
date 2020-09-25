Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.MapFileReader"], "J.jvxl.readers.MrcBinaryReader", ["java.lang.Exception", "$.Float", "JU.SB", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.labels = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "MrcBinaryReader", J.jvxl.readers.MapFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.MrcBinaryReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
var fileName = (sg.getReaderData ())[0];
this.init2MFR (sg, br);
this.binarydoc = this.newBinaryDocument ();
this.setStream (fileName, true);
this.nSurfaces = 1;
if (this.params.thePlane == null) this.params.insideOut = !this.params.insideOut;
this.allowSigma = true;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
var ispg;
var nsymbt;
var extra =  Clazz.newByteArray (100, 0);
var map =  Clazz.newByteArray (4, 0);
var machst =  Clazz.newByteArray (4, 0);
var rmsDeviation;
var nlabel;
this.n0 = this.binarydoc.readInt ();
if (this.n0 < 0 || this.n0 > 256) {
this.setStream (null, false);
this.n0 = this.binarydoc.swapBytesI (this.n0);
if (this.n0 < 0 || this.n0 > 1000) {
JU.Logger.info ("nx=" + this.n0 + " not displayable as MRC file");
throw  new Exception ("MRC file type not readable");
}JU.Logger.info ("reading little-endian MRC file");
}this.n1 = this.binarydoc.readInt ();
this.n2 = this.binarydoc.readInt ();
this.mode = this.binarydoc.readInt ();
if (this.mode < 0 || this.mode > 6) {
this.setStream (null, false);
this.n0 = this.binarydoc.swapBytesI (this.n0);
this.n1 = this.binarydoc.swapBytesI (this.n1);
this.n2 = this.binarydoc.swapBytesI (this.n2);
this.mode = this.binarydoc.swapBytesI (this.mode);
}JU.Logger.info ("MRC header: mode: " + this.mode);
JU.Logger.info ("MRC header: nx ny nz: " + this.n0 + " " + this.n1 + " " + this.n2);
this.xyzStart[0] = this.binarydoc.readInt ();
this.xyzStart[1] = this.binarydoc.readInt ();
this.xyzStart[2] = this.binarydoc.readInt ();
JU.Logger.info ("MRC header: nxyzStart: " + this.xyzStart[0] + " " + this.xyzStart[1] + " " + this.xyzStart[2]);
this.na = this.binarydoc.readInt ();
this.nb = this.binarydoc.readInt ();
this.nc = this.binarydoc.readInt ();
if (this.na == 0) this.na = this.n0 - 1;
if (this.nb == 0) this.nb = this.n1 - 1;
if (this.nc == 0) this.nc = this.n2 - 1;
JU.Logger.info ("MRC header: na nb nc: " + this.na + " " + this.nb + " " + this.nc);
this.a = this.binarydoc.readFloat ();
this.b = this.binarydoc.readFloat ();
this.c = this.binarydoc.readFloat ();
this.alpha = this.binarydoc.readFloat ();
this.beta = this.binarydoc.readFloat ();
this.gamma = this.binarydoc.readFloat ();
if (this.alpha == 0) {
this.alpha = this.beta = this.gamma = 90;
JU.Logger.info ("MRC header: alpha,beta,gamma 0 changed to 90,90,90");
JU.Logger.info ("MRC header: alpha,beta,gamma 0 reversing insideOut sense");
if (this.params.thePlane == null) this.params.insideOut = !this.params.insideOut;
}this.mapc = this.binarydoc.readInt ();
this.mapr = this.binarydoc.readInt ();
this.maps = this.binarydoc.readInt ();
if (this.mapc == 2 && this.mapr == 1 && this.params.thePlane == null) this.params.insideOut = !this.params.insideOut;
var s = "" + this.mapc + this.mapr + this.maps;
JU.Logger.info ("MRC header: mapc mapr maps: " + s);
if (this.params.thePlane == null && "21321".indexOf (s) >= 1) {
JU.Logger.info ("MRC header: data are xy-reversed");
this.params.dataXYReversed = true;
}this.dmin = this.binarydoc.readFloat ();
this.dmax = this.binarydoc.readFloat ();
this.dmean = this.binarydoc.readFloat ();
JU.Logger.info ("MRC header: dmin,dmax,dmean: " + this.dmin + "," + this.dmax + "," + this.dmean);
ispg = this.binarydoc.readInt ();
nsymbt = this.binarydoc.readInt ();
JU.Logger.info ("MRC header: ispg,nsymbt: " + ispg + "," + nsymbt);
this.binarydoc.readByteArray (extra, 0, extra.length);
this.origin.x = this.binarydoc.readFloat ();
this.origin.y = this.binarydoc.readFloat ();
this.origin.z = this.binarydoc.readFloat ();
JU.Logger.info ("MRC header: origin: " + this.origin);
this.binarydoc.readByteArray (map, 0, map.length);
this.binarydoc.readByteArray (machst, 0, machst.length);
rmsDeviation = this.binarydoc.readFloat ();
JU.Logger.info ("MRC header: rms: " + rmsDeviation);
nlabel = this.binarydoc.readInt ();
JU.Logger.info ("MRC header: labels: " + nlabel);
this.labels =  new Array (nlabel);
if (nlabel > 0) this.labels[0] = "Jmol MrcBinaryReader";
for (var i = 0; i < 10; i++) {
s = this.binarydoc.readString (80).trim ();
if (i < nlabel) {
this.labels[i] = s;
JU.Logger.info (this.labels[i]);
}}
for (var i = 0; i < nsymbt; i += 80) {
var position = this.binarydoc.getPosition ();
s = this.binarydoc.readString (80).trim ();
if (s.indexOf ('\0') != s.lastIndexOf ('\0')) {
JU.Logger.error ("File indicates " + nsymbt + " symmetry lines, but " + i + " found!");
this.binarydoc.seek (position);
break;
}JU.Logger.info ("MRC file symmetry information: " + s);
}
JU.Logger.info ("MRC header: bytes read: " + this.binarydoc.getPosition () + "\n");
this.getVectorsAndOrigin ();
if (this.params.thePlane == null && (this.params.cutoffAutomatic || !Float.isNaN (this.params.sigma))) {
var sigma = (this.params.sigma < 0 || Float.isNaN (this.params.sigma) ? 1 : this.params.sigma);
this.params.cutoff = rmsDeviation * sigma + this.dmean;
JU.Logger.info ("Cutoff set to (mean + rmsDeviation*" + sigma + " = " + this.params.cutoff + ")\n");
}this.jvxlFileHeaderBuffer =  new JU.SB ();
this.jvxlFileHeaderBuffer.append ("MRC DATA ").append (nlabel > 0 ? this.labels[0] : "").append ("\n");
this.jvxlFileHeaderBuffer.append ("see http://ami.scripps.edu/software/mrctools/mrc_specification.php\n");
});
Clazz.overrideMethod (c$, "nextVoxel", 
function () {
var voxelValue;
switch (this.mode) {
case 0:
voxelValue = this.binarydoc.readByte ();
break;
case 1:
voxelValue = this.binarydoc.readShort ();
break;
default:
case 2:
voxelValue = this.binarydoc.readFloat ();
break;
case 3:
voxelValue = this.binarydoc.readShort ();
this.binarydoc.readShort ();
break;
case 4:
voxelValue = this.binarydoc.readFloat ();
this.binarydoc.readFloat ();
break;
case 6:
voxelValue = this.binarydoc.readUnsignedShort ();
break;
}
this.nBytes = this.binarydoc.getPosition ();
return voxelValue;
});
Clazz.overrideMethod (c$, "skipData", 
function (nPoints) {
for (var i = 0; i < nPoints; i++) switch (this.mode) {
case 0:
this.binarydoc.readByte ();
break;
case 1:
case 6:
this.binarydoc.readByteArray (J.jvxl.readers.MrcBinaryReader.b8, 0, 2);
break;
default:
case 2:
case 3:
this.binarydoc.readByteArray (J.jvxl.readers.MrcBinaryReader.b8, 0, 4);
break;
case 4:
this.binarydoc.readByteArray (J.jvxl.readers.MrcBinaryReader.b8, 0, 8);
break;
}

}, "~N");
Clazz.defineStatics (c$,
"b8",  Clazz.newByteArray (8, 0));
});
