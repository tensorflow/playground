Clazz.declarePackage ("java.util.zip");
Clazz.load (["java.util.zip.InflaterInputStream", "$.CRC32"], "java.util.zip.GZIPInputStream", ["java.io.EOFException", "$.IOException", "java.util.zip.CheckedInputStream", "$.Inflater", "$.ZipException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.crc = null;
this.eos = false;
this.$closed = false;
this.tmpbuf = null;
Clazz.instantialize (this, arguments);
}, java.util.zip, "GZIPInputStream", java.util.zip.InflaterInputStream);
Clazz.prepareFields (c$, function () {
this.crc =  new java.util.zip.CRC32 ();
this.tmpbuf =  Clazz.newByteArray (128, 0);
});
Clazz.defineMethod (c$, "ensureOpen", 
 function () {
if (this.$closed) {
throw  new java.io.IOException ("Stream closed");
}});
Clazz.makeConstructor (c$, 
function ($in, size) {
Clazz.superConstructor (this, java.util.zip.GZIPInputStream, [$in,  new java.util.zip.Inflater ().init (0, true), size]);
this.readHeader ($in);
}, "java.io.InputStream,~N");
Clazz.defineMethod (c$, "read", 
function (buf, off, len) {
this.ensureOpen ();
if (this.eos) {
return -1;
}var n = this.readInf (buf, off, len);
if (n == -1) {
if (this.readTrailer ()) this.eos = true;
 else return this.read (buf, off, len);
} else {
this.crc.update (buf, off, n);
}return n;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "close", 
function () {
if (!this.$closed) {
Clazz.superCall (this, java.util.zip.GZIPInputStream, "close", []);
this.eos = true;
this.$closed = true;
}});
Clazz.defineMethod (c$, "readHeader", 
 function (this_in) {
var $in =  new java.util.zip.CheckedInputStream (this_in).set (this.crc);
this.crc.reset ();
if (this.readUShort ($in) != 35615) {
throw  new java.util.zip.ZipException ("Not in GZIP format");
}if (this.readUByte ($in) != 8) {
throw  new java.util.zip.ZipException ("Unsupported compression method");
}var flg = this.readUByte ($in);
this.skipBytes ($in, 6);
var n = 10;
if ((flg & 4) == 4) {
var m = this.readUShort ($in);
this.skipBytes ($in, m);
n += m + 2;
}if ((flg & 8) == 8) {
do {
n++;
} while (this.readUByte ($in) != 0);
}if ((flg & 16) == 16) {
do {
n++;
} while (this.readUByte ($in) != 0);
}if ((flg & 2) == 2) {
var v = this.crc.getValue () & 0xffff;
if (this.readUShort ($in) != v) {
throw  new java.util.zip.ZipException ("Corrupt GZIP header");
}n += 2;
}this.crc.reset ();
return n;
}, "java.io.InputStream");
Clazz.defineMethod (c$, "readTrailer", 
 function () {
return true;
});
Clazz.defineMethod (c$, "readUShort", 
 function ($in) {
var b = this.readUByte ($in);
return (this.readUByte ($in) << 8) | b;
}, "java.io.InputStream");
Clazz.defineMethod (c$, "readUByte", 
 function ($in) {
var b = $in.readByteAsInt ();
if (b == -1) {
throw  new java.io.EOFException ();
}if (b < -1 || b > 255) {
throw  new java.io.IOException (this.$in.getClass ().getName () + ".read() returned value out of range -1..255: " + b);
}return b;
}, "java.io.InputStream");
Clazz.defineMethod (c$, "skipBytes", 
 function ($in, n) {
while (n > 0) {
var len = $in.read (this.tmpbuf, 0, n < this.tmpbuf.length ? n : this.tmpbuf.length);
if (len == -1) {
throw  new java.io.EOFException ();
}n -= len;
}
}, "java.io.InputStream,~N");
Clazz.defineStatics (c$,
"GZIP_MAGIC", 0x8b1f,
"FHCRC", 2,
"FEXTRA", 4,
"FNAME", 8,
"FCOMMENT", 16);
});
