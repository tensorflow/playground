Clazz.declarePackage ("JU");
Clazz.load (["java.lang.Exception"], "JU.Inflate", ["JU.Adler32", "$.CRC32", "$.GZIPHeader", "$.InfBlocks", "java.io.ByteArrayOutputStream"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mode = 0;
this.method = 0;
this.was = -1;
this.need = 0;
this.marker = 0;
this.wrap = 0;
this.wbits = 0;
this.blocks = null;
this.z = null;
this.flags = 0;
this.need_bytes = -1;
this.crcbuf = null;
this.gheader = null;
if (!Clazz.isClassDefined ("JU.Inflate.Return")) {
JU.Inflate.$Inflate$Return$ ();
}
this.tmp_string = null;
Clazz.instantialize (this, arguments);
}, JU, "Inflate");
Clazz.prepareFields (c$, function () {
this.crcbuf =  Clazz.newByteArray (4, 0);
});
Clazz.defineMethod (c$, "reset", 
function () {
this.inflateReset ();
});
Clazz.defineMethod (c$, "inflateReset", 
function () {
if (this.z == null) return -2;
this.z.total_in = this.z.total_out = 0;
this.z.msg = null;
this.mode = 14;
this.need_bytes = -1;
this.blocks.reset ();
return 0;
});
Clazz.defineMethod (c$, "inflateEnd", 
function () {
if (this.blocks != null) {
this.blocks.free ();
}return 0;
});
Clazz.makeConstructor (c$, 
function (z) {
this.z = z;
}, "JU.ZStream");
Clazz.defineMethod (c$, "inflateInit", 
function (w) {
this.z.msg = null;
this.blocks = null;
this.wrap = 0;
if (w < 0) {
w = -w;
} else {
this.wrap = (w >> 4) + 1;
if (w < 48) w &= 15;
}if (w < 8 || w > 15) {
this.inflateEnd ();
return -2;
}if (this.blocks != null && this.wbits != w) {
this.blocks.free ();
this.blocks = null;
}this.wbits = w;
this.blocks =  new JU.InfBlocks (this.z, 1 << w);
this.inflateReset ();
return 0;
}, "~N");
Clazz.defineMethod (c$, "inflate", 
function (f) {
var r;
var b;
if (this.z == null || this.z.next_in == null) {
if (f == 4 && this.mode == 14) return 0;
return -2;
}f = f == 4 ? -5 : 0;
r = -5;
while (true) {
switch (this.mode) {
case 14:
if (this.wrap == 0) {
this.mode = 7;
break;
}try {
r = this.readBytes (2, r, f);
} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
if ((this.wrap & 2) != 0 && this.need == 0x8b1f) {
this.z.checksum =  new JU.CRC32 ();
this.checksum (2, this.need);
if (this.gheader == null) this.gheader =  new JU.GZIPHeader ();
this.mode = 23;
break;
}this.flags = 0;
this.method = (this.need) & 0xff;
b = ((this.need >> 8)) & 0xff;
if ((this.wrap & 1) == 0 || (((this.method << 8) + b) % 31) != 0) {
this.mode = 13;
this.z.msg = "incorrect header check";
break;
}if ((this.method & 0xf) != 8) {
this.mode = 13;
this.z.msg = "unknown compression method";
break;
}if ((this.method >> 4) + 8 > this.wbits) {
this.mode = 13;
this.z.msg = "invalid window size";
break;
}this.z.checksum =  new JU.Adler32 ();
if ((b & 32) == 0) {
this.mode = 7;
break;
}this.mode = 2;
case 2:
if (this.z.avail_in == 0) return r;
r = f;
this.z.avail_in--;
this.z.total_in++;
this.need = ((this.z.next_in[this.z.next_in_index++] & 0xff) << 24) & 0xff000000;
this.mode = 3;
case 3:
if (this.z.avail_in == 0) return r;
r = f;
this.z.avail_in--;
this.z.total_in++;
this.need += ((this.z.next_in[this.z.next_in_index++] & 0xff) << 16) & 0xff0000;
this.mode = 4;
case 4:
if (this.z.avail_in == 0) return r;
r = f;
this.z.avail_in--;
this.z.total_in++;
this.need += ((this.z.next_in[this.z.next_in_index++] & 0xff) << 8) & 0xff00;
this.mode = 5;
case 5:
if (this.z.avail_in == 0) return r;
r = f;
this.z.avail_in--;
this.z.total_in++;
this.need += (this.z.next_in[this.z.next_in_index++] & 0xff);
this.z.checksum.resetLong (this.need);
this.mode = 6;
return 2;
case 6:
this.mode = 13;
this.z.msg = "need dictionary";
this.marker = 0;
return -2;
case 7:
r = this.blocks.proc (r);
if (r == -3) {
this.mode = 13;
this.marker = 0;
break;
}if (r == 0) {
r = f;
}if (r != 1) {
return r;
}r = f;
this.was = this.z.checksum.getValue ();
this.blocks.reset ();
if (this.wrap == 0) {
this.mode = 12;
break;
}this.mode = 8;
case 8:
if (this.z.avail_in == 0) return r;
r = f;
this.z.avail_in--;
this.z.total_in++;
this.need = ((this.z.next_in[this.z.next_in_index++] & 0xff) << 24) & 0xff000000;
this.mode = 9;
case 9:
if (this.z.avail_in == 0) return r;
r = f;
this.z.avail_in--;
this.z.total_in++;
this.need += ((this.z.next_in[this.z.next_in_index++] & 0xff) << 16) & 0xff0000;
this.mode = 10;
case 10:
if (this.z.avail_in == 0) return r;
r = f;
this.z.avail_in--;
this.z.total_in++;
this.need += ((this.z.next_in[this.z.next_in_index++] & 0xff) << 8) & 0xff00;
this.mode = 11;
case 11:
if (this.z.avail_in == 0) return r;
r = f;
this.z.avail_in--;
this.z.total_in++;
this.need += (this.z.next_in[this.z.next_in_index++] & 0xff);
if (this.flags != 0) {
this.need = ((this.need & 0xff000000) >> 24 | (this.need & 0x00ff0000) >> 8 | (this.need & 0x0000ff00) << 8 | (this.need & 0x0000ffff) << 24) & 0xffffffff;
}if (((this.was)) != ((this.need))) {
this.z.msg = "incorrect data check";
} else if (this.flags != 0 && this.gheader != null) {
this.gheader.crc = this.need;
}this.mode = 15;
case 15:
if (this.wrap != 0 && this.flags != 0) {
try {
r = this.readBytes (4, r, f);
} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
if (this.z.msg != null && this.z.msg.equals ("incorrect data check")) {
this.mode = 13;
this.marker = 5;
break;
}if (this.need != (this.z.total_out & 0xffffffff)) {
this.z.msg = "incorrect length check";
this.mode = 13;
break;
}this.z.msg = null;
} else {
if (this.z.msg != null && this.z.msg.equals ("incorrect data check")) {
this.mode = 13;
this.marker = 5;
break;
}}this.mode = 12;
case 12:
return 1;
case 13:
return -3;
case 23:
try {
r = this.readBytes (2, r, f);
} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
this.flags = (this.need) & 0xffff;
if ((this.flags & 0xff) != 8) {
this.z.msg = "unknown compression method";
this.mode = 13;
break;
}if ((this.flags & 0xe000) != 0) {
this.z.msg = "unknown header flags set";
this.mode = 13;
break;
}if ((this.flags & 0x0200) != 0) {
this.checksum (2, this.need);
}this.mode = 16;
case 16:
try {
r = this.readBytes (4, r, f);
} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
if (this.gheader != null) this.gheader.time = this.need;
if ((this.flags & 0x0200) != 0) {
this.checksum (4, this.need);
}this.mode = 17;
case 17:
try {
r = this.readBytes (2, r, f);
} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
if (this.gheader != null) {
this.gheader.xflags = (this.need) & 0xff;
this.gheader.os = ((this.need) >> 8) & 0xff;
}if ((this.flags & 0x0200) != 0) {
this.checksum (2, this.need);
}this.mode = 18;
case 18:
if ((this.flags & 0x0400) != 0) {
try {
r = this.readBytes (2, r, f);
} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
if (this.gheader != null) {
this.gheader.extra =  Clazz.newByteArray ((this.need) & 0xffff, 0);
}if ((this.flags & 0x0200) != 0) {
this.checksum (2, this.need);
}} else if (this.gheader != null) {
this.gheader.extra = null;
}this.mode = 19;
case 19:
if ((this.flags & 0x0400) != 0) {
try {
r = this.readBytes (r, f);
if (this.gheader != null) {
var foo = this.tmp_string.toByteArray ();
this.tmp_string = null;
if (foo.length == this.gheader.extra.length) {
System.arraycopy (foo, 0, this.gheader.extra, 0, foo.length);
} else {
this.z.msg = "bad extra field length";
this.mode = 13;
break;
}}} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
} else if (this.gheader != null) {
this.gheader.extra = null;
}this.mode = 20;
case 20:
if ((this.flags & 0x0800) != 0) {
try {
r = this.readString (r, f);
if (this.gheader != null) {
this.gheader.name = this.tmp_string.toByteArray ();
}this.tmp_string = null;
} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
} else if (this.gheader != null) {
this.gheader.name = null;
}this.mode = 21;
case 21:
if ((this.flags & 0x1000) != 0) {
try {
r = this.readString (r, f);
if (this.gheader != null) {
this.gheader.comment = this.tmp_string.toByteArray ();
}this.tmp_string = null;
} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
} else if (this.gheader != null) {
this.gheader.comment = null;
}this.mode = 22;
case 22:
if ((this.flags & 0x0200) != 0) {
try {
r = this.readBytes (2, r, f);
} catch (e) {
if (Clazz.exceptionOf (e, JU.Inflate.Return)) {
return e.r;
} else {
throw e;
}
}
if (this.gheader != null) {
this.gheader.hcrc = (this.need & 0xffff);
}if (this.need != (this.z.checksum.getValue () & 0xffff)) {
this.mode = 13;
this.z.msg = "header crc mismatch";
this.marker = 5;
break;
}}this.z.checksum =  new JU.CRC32 ();
this.mode = 7;
break;
default:
return -2;
}
}
}, "~N");
Clazz.defineMethod (c$, "inflateSetDictionary", 
function (dictionary, dictLength) {
if (this.z == null || (this.mode != 6 && this.wrap != 0)) {
return -2;
}var index = 0;
var length = dictLength;
if (this.mode == 6) {
var adler_need = this.z.checksum.getValue ();
this.z.checksum.reset ();
this.z.checksum.update (dictionary, 0, dictLength);
if (this.z.checksum.getValue () != adler_need) {
return -3;
}}this.z.checksum.reset ();
if (length >= (1 << this.wbits)) {
length = (1 << this.wbits) - 1;
index = dictLength - length;
}this.blocks.set_dictionary (dictionary, index, length);
this.mode = 7;
return 0;
}, "~A,~N");
Clazz.defineMethod (c$, "inflateSync", 
function () {
var n;
var p;
var m;
var r;
var w;
if (this.z == null) return -2;
if (this.mode != 13) {
this.mode = 13;
this.marker = 0;
}if ((n = this.z.avail_in) == 0) return -5;
p = this.z.next_in_index;
m = this.marker;
while (n != 0 && m < 4) {
if (this.z.next_in[p] == JU.Inflate.mark[m]) {
m++;
} else if (this.z.next_in[p] != 0) {
m = 0;
} else {
m = 4 - m;
}p++;
n--;
}
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.z.avail_in = n;
this.marker = m;
if (m != 4) {
return -3;
}r = this.z.total_in;
w = this.z.total_out;
this.inflateReset ();
this.z.total_in = r;
this.z.total_out = w;
this.mode = 7;
return 0;
});
Clazz.defineMethod (c$, "inflateSyncPoint", 
function () {
if (this.z == null || this.blocks == null) return -2;
return this.blocks.sync_point ();
});
Clazz.defineMethod (c$, "readBytes", 
 function (n, r, f) {
if (this.need_bytes == -1) {
this.need_bytes = n;
this.need = 0;
}while (this.need_bytes > 0) {
if (this.z.avail_in == 0) {
throw Clazz.innerTypeInstance (JU.Inflate.Return, this, null, r);
}r = f;
this.z.avail_in--;
this.z.total_in++;
this.need = this.need | ((this.z.next_in[this.z.next_in_index++] & 0xff) << ((n - this.need_bytes) * 8));
this.need_bytes--;
}
if (n == 2) {
this.need &= 0xffff;
} else if (n == 4) {
this.need &= 0xffffffff;
}this.need_bytes = -1;
return r;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "readString", 
 function (r, f) {
if (this.tmp_string == null) {
this.tmp_string =  new java.io.ByteArrayOutputStream ();
}var b = 0;
do {
if (this.z.avail_in == 0) {
throw Clazz.innerTypeInstance (JU.Inflate.Return, this, null, r);
}r = f;
this.z.avail_in--;
this.z.total_in++;
b = this.z.next_in[this.z.next_in_index];
if (b != 0) this.tmp_string.write (this.z.next_in, this.z.next_in_index, 1);
this.z.checksum.update (this.z.next_in, this.z.next_in_index, 1);
this.z.next_in_index++;
} while (b != 0);
return r;
}, "~N,~N");
Clazz.defineMethod (c$, "readBytes", 
 function (r, f) {
if (this.tmp_string == null) {
this.tmp_string =  new java.io.ByteArrayOutputStream ();
}while (this.need > 0) {
if (this.z.avail_in == 0) {
throw Clazz.innerTypeInstance (JU.Inflate.Return, this, null, r);
}r = f;
this.z.avail_in--;
this.z.total_in++;
this.tmp_string.write (this.z.next_in, this.z.next_in_index, 1);
this.z.checksum.update (this.z.next_in, this.z.next_in_index, 1);
this.z.next_in_index++;
this.need--;
}
return r;
}, "~N,~N");
Clazz.defineMethod (c$, "checksum", 
 function (n, v) {
for (var i = 0; i < n; i++) {
this.crcbuf[i] = (v & 0xff);
v >>= 8;
}
this.z.checksum.update (this.crcbuf, 0, n);
}, "~N,~N");
Clazz.defineMethod (c$, "getGZIPHeader", 
function () {
return this.gheader;
});
Clazz.defineMethod (c$, "inParsingHeader", 
function () {
switch (this.mode) {
case 14:
case 2:
case 3:
case 4:
case 5:
case 23:
case 16:
case 17:
case 18:
case 19:
case 20:
case 21:
case 22:
return true;
default:
return false;
}
});
c$.$Inflate$Return$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.r = 0;
Clazz.instantialize (this, arguments);
}, JU.Inflate, "Return", Exception);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, JU.Inflate.Return, []);
this.r = a;
}, "~N");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"PRESET_DICT", 0x20,
"Z_NO_FLUSH", 0,
"Z_PARTIAL_FLUSH", 1,
"Z_SYNC_FLUSH", 2,
"Z_FULL_FLUSH", 3,
"Z_FINISH", 4,
"Z_DEFLATED", 8,
"Z_OK", 0,
"Z_STREAM_END", 1,
"Z_NEED_DICT", 2,
"Z_STREAM_ERROR", -2,
"Z_DATA_ERROR", -3,
"Z_BUF_ERROR", -5,
"DICT4", 2,
"DICT3", 3,
"DICT2", 4,
"DICT1", 5,
"DICT0", 6,
"BLOCKS", 7,
"CHECK4", 8,
"CHECK3", 9,
"CHECK2", 10,
"CHECK1", 11,
"DONE", 12,
"BAD", 13,
"HEAD", 14,
"LENGTH", 15,
"TIME", 16,
"OS", 17,
"EXLEN", 18,
"EXTRA", 19,
"NAME", 20,
"COMMENT", 21,
"HCRC", 22,
"FLAGS", 23,
"mark",  Clazz.newByteArray (-1, [0, 0, 0xff, 0xff]));
});
