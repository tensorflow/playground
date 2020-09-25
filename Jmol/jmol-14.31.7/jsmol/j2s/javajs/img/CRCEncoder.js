Clazz.declarePackage ("javajs.img");
Clazz.load (["javajs.img.ImageEncoder"], "javajs.img.CRCEncoder", ["java.util.zip.CRC32", "JU.AU"], function () {
c$ = Clazz.decorateAsClass (function () {
this.startPos = 0;
this.bytePos = 0;
this.crc = null;
this.pngBytes = null;
this.dataLen = 0;
this.int2 = null;
this.int4 = null;
Clazz.instantialize (this, arguments);
}, javajs.img, "CRCEncoder", javajs.img.ImageEncoder);
Clazz.prepareFields (c$, function () {
this.int2 =  Clazz.newByteArray (2, 0);
this.int4 =  Clazz.newByteArray (4, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javajs.img.CRCEncoder, []);
this.pngBytes =  Clazz.newByteArray (250, 0);
this.crc =  new java.util.zip.CRC32 ();
});
Clazz.defineMethod (c$, "setData", 
function (b, pt) {
this.pngBytes = b;
this.dataLen = b.length;
this.startPos = this.bytePos = pt;
}, "~A,~N");
Clazz.defineMethod (c$, "getBytes", 
function () {
return (this.dataLen == this.pngBytes.length ? this.pngBytes : JU.AU.arrayCopyByte (this.pngBytes, this.dataLen));
});
Clazz.defineMethod (c$, "writeCRC", 
function () {
this.crc.reset ();
this.crc.update (this.pngBytes, this.startPos, this.bytePos - this.startPos);
this.writeInt4 (this.crc.getValue ());
});
Clazz.defineMethod (c$, "writeInt2", 
function (n) {
this.int2[0] = ((n >> 8) & 0xff);
this.int2[1] = (n & 0xff);
this.writeBytes (this.int2);
}, "~N");
Clazz.defineMethod (c$, "writeInt4", 
function (n) {
javajs.img.CRCEncoder.getInt4 (n, this.int4);
this.writeBytes (this.int4);
}, "~N");
c$.getInt4 = Clazz.defineMethod (c$, "getInt4", 
function (n, int4) {
int4[0] = ((n >> 24) & 0xff);
int4[1] = ((n >> 16) & 0xff);
int4[2] = ((n >> 8) & 0xff);
int4[3] = (n & 0xff);
}, "~N,~A");
Clazz.defineMethod (c$, "writeByte", 
function (b) {
var temp =  Clazz.newByteArray (-1, [b]);
this.writeBytes (temp);
}, "~N");
Clazz.defineMethod (c$, "writeString", 
function (s) {
this.writeBytes (s.getBytes ());
}, "~S");
Clazz.defineMethod (c$, "writeBytes", 
function (data) {
var newPos = this.bytePos + data.length;
this.dataLen = Math.max (this.dataLen, newPos);
if (newPos > this.pngBytes.length) this.pngBytes = JU.AU.arrayCopyByte (this.pngBytes, newPos + 16);
System.arraycopy (data, 0, this.pngBytes, this.bytePos, data.length);
this.bytePos = newPos;
}, "~A");
});
