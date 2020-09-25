Clazz.declarePackage ("java.util.zip");
Clazz.load (["java.util.zip.DeflaterOutputStream", "$.ZipConstants", "java.util.Hashtable", "java.util.zip.CRC32", "JU.Lst"], "java.util.zip.ZipOutputStream", ["JU.ZStream", "java.io.IOException", "java.lang.Boolean", "$.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.Long", "java.util.zip.Deflater", "$.ZipException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.current = null;
this.xentries = null;
this.names = null;
this.crc = null;
this.written = 0;
this.locoff = 0;
this.comment = null;
this.method = 8;
this.finished = false;
this.$closed = false;
Clazz.instantialize (this, arguments);
}, java.util.zip, "ZipOutputStream", java.util.zip.DeflaterOutputStream, java.util.zip.ZipConstants);
Clazz.prepareFields (c$, function () {
this.xentries =  new JU.Lst ();
this.names =  new java.util.Hashtable ();
this.crc =  new java.util.zip.CRC32 ();
});
c$.version = Clazz.defineMethod (c$, "version", 
 function (e) {
switch (e.method) {
case 8:
return 20;
case 0:
return 10;
default:
throw  new java.util.zip.ZipException ("unsupported compression method");
}
}, "java.util.zip.ZipEntry");
Clazz.defineMethod (c$, "ensureOpen", 
 function () {
if (this.$closed) {
throw  new java.io.IOException ("Stream closed");
}});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.util.zip.ZipOutputStream, []);
});
Clazz.defineMethod (c$, "setZOS", 
function (out) {
this.setDOS (out, java.util.zip.ZipOutputStream.newDeflater ());
return this;
}, "java.io.OutputStream");
c$.newDeflater = Clazz.defineMethod (c$, "newDeflater", 
 function () {
return ( new java.util.zip.Deflater (2147483647)).init (-1, 0, true);
});
Clazz.defineMethod (c$, "setComment", 
function (comment) {
if (comment != null) {
this.comment = JU.ZStream.getBytes (comment);
if (this.comment.length > 0xffff) throw  new IllegalArgumentException ("ZIP file comment too long.");
}}, "~S");
Clazz.defineMethod (c$, "putNextEntry", 
function (e) {
this.ensureOpen ();
if (this.current != null) {
this.closeEntry ();
}if (e.time == -1) {
e.setTime (System.currentTimeMillis ());
}if (e.method == -1) {
e.method = this.method;
}e.flag = 0;
switch (e.method) {
case 8:
if (e.size == -1 || e.csize == -1 || e.crc == -1) e.flag = 8;
break;
case 0:
if (e.size == -1) {
e.size = e.csize;
} else if (e.csize == -1) {
e.csize = e.size;
} else if (e.size != e.csize) {
throw  new java.util.zip.ZipException ("STORED entry where compressed != uncompressed size");
}if (e.size == -1 || e.crc == -1) {
throw  new java.util.zip.ZipException ("STORED entry missing size, compressed size, or crc-32");
}break;
default:
throw  new java.util.zip.ZipException ("unsupported compression method");
}
if (this.names.containsKey (e.name)) {
throw  new java.util.zip.ZipException ("duplicate entry: " + e.name);
}this.names.put (e.name, Boolean.TRUE);
e.flag |= 2048;
this.current = e;
this.current.offset = this.written;
this.xentries.addLast (this.current);
this.writeLOC (this.current);
}, "java.util.zip.ZipEntry");
Clazz.defineMethod (c$, "closeEntry", 
function () {
this.ensureOpen ();
if (this.current != null) {
var e = this.current;
switch (e.method) {
case 8:
this.deflater.finish ();
Clazz.superCall (this, java.util.zip.ZipOutputStream, "finish", []);
if ((e.flag & 8) == 0) {
if (e.size != this.deflater.getBytesRead ()) {
throw  new java.util.zip.ZipException ("invalid entry size (expected " + e.size + " but got " + this.deflater.getBytesRead () + " bytes)");
}if (e.csize != this.deflater.getBytesWritten ()) {
throw  new java.util.zip.ZipException ("invalid entry compressed size (expected " + e.csize + " but got " + this.deflater.getBytesWritten () + " bytes)");
}if (e.crc != this.crc.getValue ()) {
throw  new java.util.zip.ZipException ("invalid entry CRC-32 (expected 0x" + Long.toHexString (e.crc) + " but got 0x" + Long.toHexString (this.crc.getValue ()) + ")");
}} else {
e.size = this.deflater.getBytesRead ();
e.csize = this.deflater.getBytesWritten ();
e.crc = this.crc.getValue ();
this.writeEXT (e);
}this.deflater = java.util.zip.ZipOutputStream.newDeflater ();
this.written += e.csize;
break;
case 0:
if (e.size != this.written - this.locoff) {
throw  new java.util.zip.ZipException ("invalid entry size (expected " + e.size + " but got " + (this.written - this.locoff) + " bytes)");
}if (e.crc != this.crc.getValue ()) {
throw  new java.util.zip.ZipException ("invalid entry crc-32 (expected 0x" + Long.toHexString (e.crc) + " but got 0x" + Long.toHexString (this.crc.getValue ()) + ")");
}break;
default:
throw  new java.util.zip.ZipException ("invalid compression method");
}
this.crc.reset ();
this.current = null;
}});
Clazz.defineMethod (c$, "write", 
function (b, off, len) {
this.ensureOpen ();
if (off < 0 || len < 0 || off > b.length - len) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return;
}if (this.current == null) {
throw  new java.util.zip.ZipException ("no current ZIP entry");
}var entry = this.current;
switch (entry.method) {
case 8:
Clazz.superCall (this, java.util.zip.ZipOutputStream, "write", [b, off, len]);
break;
case 0:
this.written += len;
if (this.written - this.locoff > entry.size) {
throw  new java.util.zip.ZipException ("attempt to write past end of STORED entry");
}this.out.write (this.buffer, 0, len);
break;
default:
throw  new java.util.zip.ZipException ("invalid compression method");
}
this.crc.update (b, off, len);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "finish", 
function () {
this.ensureOpen ();
if (this.finished) {
return;
}if (this.current != null) {
this.closeEntry ();
}var off = this.written;
for (var xentry, $xentry = this.xentries.iterator (); $xentry.hasNext () && ((xentry = $xentry.next ()) || true);) this.writeCEN (xentry);

this.writeEND (off, this.written - off);
this.finished = true;
});
Clazz.defineMethod (c$, "close", 
function () {
if (!this.$closed) {
Clazz.superCall (this, java.util.zip.ZipOutputStream, "close", []);
this.$closed = true;
}});
Clazz.defineMethod (c$, "writeLOC", 
 function (entry) {
var e = entry;
var flag = e.flag;
var elen = (e.extra != null) ? e.extra.length : 0;
var hasZip64 = false;
this.writeInt (67324752);
if ((flag & 8) == 8) {
this.writeShort (java.util.zip.ZipOutputStream.version (e));
this.writeShort (flag);
this.writeShort (e.method);
this.writeInt (e.time);
this.writeInt (0);
this.writeInt (0);
this.writeInt (0);
} else {
if (e.csize >= 4294967295 || e.size >= 4294967295) {
hasZip64 = true;
this.writeShort (45);
} else {
this.writeShort (java.util.zip.ZipOutputStream.version (e));
}this.writeShort (flag);
this.writeShort (e.method);
this.writeInt (e.time);
this.writeInt (e.crc);
if (hasZip64) {
this.writeInt (4294967295);
this.writeInt (4294967295);
elen += 20;
} else {
this.writeInt (e.csize);
this.writeInt (e.size);
}}var nameBytes = JU.ZStream.getBytes (e.name);
this.writeShort (nameBytes.length);
this.writeShort (elen);
this.writeBytes (nameBytes, 0, nameBytes.length);
if (hasZip64) {
this.writeShort (1);
this.writeShort (16);
this.writeLong (e.size);
this.writeLong (e.csize);
}if (e.extra != null) {
this.writeBytes (e.extra, 0, e.extra.length);
}this.locoff = this.written;
}, "java.util.zip.ZipEntry");
Clazz.defineMethod (c$, "writeEXT", 
 function (e) {
this.writeInt (134695760);
this.writeInt (e.crc);
if (e.csize >= 4294967295 || e.size >= 4294967295) {
this.writeLong (e.csize);
this.writeLong (e.size);
} else {
this.writeInt (e.csize);
this.writeInt (e.size);
}}, "java.util.zip.ZipEntry");
Clazz.defineMethod (c$, "writeCEN", 
 function (entry) {
var e = entry;
var flag = e.flag;
var version = java.util.zip.ZipOutputStream.version (e);
var csize = e.csize;
var size = e.size;
var offset = entry.offset;
var e64len = 0;
var hasZip64 = false;
if (e.csize >= 4294967295) {
csize = 4294967295;
e64len += 8;
hasZip64 = true;
}if (e.size >= 4294967295) {
size = 4294967295;
e64len += 8;
hasZip64 = true;
}if (entry.offset >= 4294967295) {
offset = 4294967295;
e64len += 8;
hasZip64 = true;
}this.writeInt (33639248);
if (hasZip64) {
this.writeShort (45);
this.writeShort (45);
} else {
this.writeShort (version);
this.writeShort (version);
}this.writeShort (flag);
this.writeShort (e.method);
this.writeInt (e.time);
this.writeInt (e.crc);
this.writeInt (csize);
this.writeInt (size);
var nameBytes = JU.ZStream.getBytes (e.name);
this.writeShort (nameBytes.length);
if (hasZip64) {
this.writeShort (e64len + 4 + (e.extra != null ? e.extra.length : 0));
} else {
this.writeShort (e.extra != null ? e.extra.length : 0);
}var commentBytes;
if (e.comment != null) {
commentBytes = JU.ZStream.getBytes (e.comment);
this.writeShort (Math.min (commentBytes.length, 0xffff));
} else {
commentBytes = null;
this.writeShort (0);
}this.writeShort (0);
this.writeShort (0);
this.writeInt (0);
this.writeInt (offset);
this.writeBytes (nameBytes, 0, nameBytes.length);
if (hasZip64) {
this.writeShort (1);
this.writeShort (e64len);
if (size == 4294967295) this.writeLong (e.size);
if (csize == 4294967295) this.writeLong (e.csize);
if (offset == 4294967295) this.writeLong (entry.offset);
}if (e.extra != null) {
this.writeBytes (e.extra, 0, e.extra.length);
}if (commentBytes != null) {
this.writeBytes (commentBytes, 0, Math.min (commentBytes.length, 0xffff));
}}, "java.util.zip.ZipEntry");
Clazz.defineMethod (c$, "writeEND", 
 function (off, len) {
var hasZip64 = false;
var xlen = len;
var xoff = off;
if (xlen >= 4294967295) {
xlen = 4294967295;
hasZip64 = true;
}if (xoff >= 4294967295) {
xoff = 4294967295;
hasZip64 = true;
}var count = this.xentries.size ();
if (count >= 65535) {
count = 65535;
hasZip64 = true;
}if (hasZip64) {
var off64 = this.written;
this.writeInt (101075792);
this.writeLong (44);
this.writeShort (45);
this.writeShort (45);
this.writeInt (0);
this.writeInt (0);
this.writeLong (this.xentries.size ());
this.writeLong (this.xentries.size ());
this.writeLong (len);
this.writeLong (off);
this.writeInt (117853008);
this.writeInt (0);
this.writeLong (off64);
this.writeInt (1);
}this.writeInt (101010256);
this.writeShort (0);
this.writeShort (0);
this.writeShort (count);
this.writeShort (count);
this.writeInt (xlen);
this.writeInt (xoff);
if (this.comment != null) {
this.writeShort (this.comment.length);
this.writeBytes (this.comment, 0, this.comment.length);
} else {
this.writeShort (0);
}}, "~N,~N");
Clazz.defineMethod (c$, "writeShort", 
 function (v) {
var out = this.out;
{
out.writeByteAsInt((v >>> 0) & 0xff);
out.writeByteAsInt((v >>> 8) & 0xff);
}this.written += 2;
}, "~N");
Clazz.defineMethod (c$, "writeInt", 
 function (v) {
var out = this.out;
{
out.writeByteAsInt((v >>> 0) & 0xff);
out.writeByteAsInt((v >>> 8) & 0xff);
out.writeByteAsInt((v >>> 16) & 0xff);
out.writeByteAsInt((v >>> 24) & 0xff);
}this.written += 4;
}, "~N");
Clazz.defineMethod (c$, "writeLong", 
 function (v) {
var out = this.out;
{
out.writeByteAsInt((v >>> 0) & 0xff);
out.writeByteAsInt((v >>> 8) & 0xff);
out.writeByteAsInt((v >>> 16) & 0xff);
out.writeByteAsInt((v >>> 24) & 0xff);
out.writeByteAsInt(0);
out.writeByteAsInt(0);
out.writeByteAsInt(0);
out.writeByteAsInt(0);
}this.written += 8;
}, "~N");
Clazz.defineMethod (c$, "writeBytes", 
 function (b, off, len) {
this.out.write (b, off, len);
this.written += len;
}, "~A,~N,~N");
Clazz.defineStatics (c$,
"STORED", 0,
"DEFLATED", 8);
});
