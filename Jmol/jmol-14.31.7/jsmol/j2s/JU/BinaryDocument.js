Clazz.declarePackage ("JU");
Clazz.load (["javajs.api.GenericBinaryDocument", "JU.BC"], "JU.BinaryDocument", ["java.io.DataInputStream", "java.lang.Double"], function () {
c$ = Clazz.decorateAsClass (function () {
this.stream = null;
this.isRandom = false;
this.isBigEndian = true;
this.bis = null;
this.nBytes = 0;
this.out = null;
this.t8 = null;
Clazz.instantialize (this, arguments);
}, JU, "BinaryDocument", JU.BC, javajs.api.GenericBinaryDocument);
Clazz.prepareFields (c$, function () {
this.t8 =  Clazz.newByteArray (8, 0);
});
Clazz.overrideMethod (c$, "close", 
function () {
if (this.stream != null) try {
this.stream.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.out != null) this.out.closeChannel ();
});
Clazz.overrideMethod (c$, "setStream", 
function (bis, isBigEndian) {
this.bis = bis;
if (bis != null) {
this.stream =  new java.io.DataInputStream (bis);
}this.isBigEndian = isBigEndian;
return this;
}, "java.io.BufferedInputStream,~B");
Clazz.overrideMethod (c$, "getInputStream", 
function () {
return this.bis;
});
Clazz.overrideMethod (c$, "setStreamData", 
function (stream, isBigEndian) {
if (stream != null) this.stream = stream;
this.isBigEndian = isBigEndian;
}, "java.io.DataInputStream,~B");
Clazz.overrideMethod (c$, "setOutputChannel", 
function (out) {
this.out = out;
}, "javajs.api.GenericOutputChannel");
Clazz.defineMethod (c$, "setRandom", 
function (TF) {
this.isRandom = TF;
}, "~B");
Clazz.overrideMethod (c$, "readByte", 
function () {
this.nBytes++;
return this.ioReadByte ();
});
Clazz.overrideMethod (c$, "readUInt8", 
function () {
this.nBytes++;
var b = this.stream.readUnsignedByte ();
if (this.out != null) this.out.writeByteAsInt (b);
return b;
});
Clazz.defineMethod (c$, "ioReadByte", 
 function () {
var b = this.stream.readByte ();
if (this.out != null) this.out.writeByteAsInt (b);
return b;
});
Clazz.overrideMethod (c$, "readBytes", 
function (n) {
var b =  Clazz.newByteArray (n, 0);
this.readByteArray (b, 0, n);
return b;
}, "~N");
Clazz.overrideMethod (c$, "readByteArray", 
function (b, off, len) {
var n = this.ioRead (b, off, len);
this.nBytes += n;
return n;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "ioRead", 
 function (b, off, len) {
var m = 0;
while (len > 0) {
var n = this.stream.read (b, off, len);
m += n;
if (n > 0 && this.out != null) this.out.write (b, off, n);
if (n >= len) break;
off += n;
len -= n;
}
return m;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "readString", 
function (nChar) {
var temp =  Clazz.newByteArray (nChar, 0);
var n = this.readByteArray (temp, 0, nChar);
return  String.instantialize (temp, 0, n, "UTF-8");
}, "~N");
Clazz.overrideMethod (c$, "readShort", 
function () {
this.nBytes += 2;
var n = (this.isBigEndian ? this.ioReadShort () : ((this.ioReadByte () & 0xff) | (this.ioReadByte () & 0xff) << 8));
{
return (n > 0x7FFF ? n - 0x10000 : n);
}});
Clazz.defineMethod (c$, "ioReadShort", 
 function () {
var b = this.stream.readShort ();
if (this.out != null) this.out.writeShort (b);
return b;
});
Clazz.overrideMethod (c$, "readIntLE", 
function () {
this.nBytes += 4;
return this.readLEInt ();
});
Clazz.overrideMethod (c$, "readInt", 
function () {
this.nBytes += 4;
return (this.isBigEndian ? this.ioReadInt () : this.readLEInt ());
});
Clazz.defineMethod (c$, "ioReadInt", 
 function () {
var i = this.stream.readInt ();
if (this.out != null) this.out.writeInt (i);
return i;
});
Clazz.overrideMethod (c$, "swapBytesI", 
function (n) {
return (((n >> 24) & 0xff) | ((n >> 16) & 0xff) << 8 | ((n >> 8) & 0xff) << 16 | (n & 0xff) << 24);
}, "~N");
Clazz.overrideMethod (c$, "swapBytesS", 
function (n) {
return ((((n >> 8) & 0xff) | (n & 0xff) << 8));
}, "~N");
Clazz.overrideMethod (c$, "readUnsignedShort", 
function () {
this.nBytes += 2;
var a = (this.ioReadByte () & 0xff);
var b = (this.ioReadByte () & 0xff);
return (this.isBigEndian ? (a << 8) + b : (b << 8) + a);
});
Clazz.overrideMethod (c$, "readLong", 
function () {
this.nBytes += 8;
return (this.isBigEndian ? this.ioReadLong () : (((this.ioReadByte ()) & 0xff) | ((this.ioReadByte ()) & 0xff) << 8 | ((this.ioReadByte ()) & 0xff) << 16 | ((this.ioReadByte ()) & 0xff) << 24 | ((this.ioReadByte ()) & 0xff) << 32 | ((this.ioReadByte ()) & 0xff) << 40 | ((this.ioReadByte ()) & 0xff) << 48 | ((this.ioReadByte ()) & 0xff) << 54));
});
Clazz.defineMethod (c$, "ioReadLong", 
 function () {
var b = this.stream.readLong ();
if (this.out != null) this.out.writeLong (b);
return b;
});
Clazz.defineMethod (c$, "readLEInt", 
 function () {
this.ioRead (this.t8, 0, 4);
return JU.BC.bytesToInt (this.t8, 0, false);
});
Clazz.overrideMethod (c$, "readFloat", 
function () {
return JU.BC.intToFloat (this.readInt ());
});
Clazz.overrideMethod (c$, "readDouble", 
function () {
{
this.readByteArray(this.t8, 0, 8);
return this.bytesToDoubleToFloat(this.t8, 0, this.isBigEndian);
}});
Clazz.defineMethod (c$, "ioReadDouble", 
 function () {
var d = this.stream.readDouble ();
if (this.out != null) this.out.writeLong (Double.doubleToRawLongBits (d));
return d;
});
Clazz.defineMethod (c$, "readLELong", 
 function () {
return (((this.ioReadByte ()) & 0xff) | ((this.ioReadByte ()) & 0xff) << 8 | ((this.ioReadByte ()) & 0xff) << 16 | ((this.ioReadByte ()) & 0xff) << 24 | ((this.ioReadByte ()) & 0xff) << 32 | ((this.ioReadByte ()) & 0xff) << 40 | ((this.ioReadByte ()) & 0xff) << 48 | ((this.ioReadByte ()) & 0xff) << 56);
});
Clazz.overrideMethod (c$, "seek", 
function (offset) {
try {
if (offset == this.nBytes) return;
if (offset < this.nBytes) {
this.stream.reset ();
if (this.out != null && this.nBytes != 0) this.out.reset ();
this.nBytes = 0;
} else {
offset -= this.nBytes;
}if (this.out == null) {
this.stream.skipBytes (offset);
} else {
this.readByteArray ( Clazz.newByteArray (offset, 0), 0, offset);
}this.nBytes += offset;
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
}, "~N");
Clazz.overrideMethod (c$, "getPosition", 
function () {
return this.nBytes;
});
Clazz.overrideMethod (c$, "getAllDataFiles", 
function (binaryFileList, firstFile) {
return null;
}, "~S,~S");
Clazz.overrideMethod (c$, "getAllDataMapped", 
function (replace, string, fileData) {
}, "~S,~S,java.util.Map");
});
