Clazz.load (["java.io.FilterInputStream"], "java.io.BufferedInputStream", ["java.io.IOException", "java.lang.IndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buf = null;
this.count = 0;
this.pos = 0;
this.markpos = -1;
this.marklimit = 0;
Clazz.instantialize (this, arguments);
}, java.io, "BufferedInputStream", java.io.FilterInputStream);
Clazz.defineMethod (c$, "getInIfOpen", 
 function () {
var input = this.$in;
if (input == null) throw  new java.io.IOException ("Stream closed");
return input;
});
Clazz.defineMethod (c$, "getBufIfOpen", 
 function () {
var buffer = this.buf;
if (buffer == null) throw  new java.io.IOException ("Stream closed");
return buffer;
});
Clazz.overrideMethod (c$, "resetStream", 
function () {
});
Clazz.makeConstructor (c$, 
function ($in) {
Clazz.superConstructor (this, java.io.BufferedInputStream, [$in]);
this.buf =  Clazz.newByteArray (8192, 0);
}, "java.io.InputStream");
Clazz.defineMethod (c$, "fill", 
 function () {
var buffer = this.getBufIfOpen ();
if (this.markpos < 0) this.pos = 0;
 else if (this.pos >= buffer.length) if (this.markpos > 0) {
var sz = this.pos - this.markpos;
System.arraycopy (buffer, this.markpos, buffer, 0, sz);
this.pos = sz;
this.markpos = 0;
} else if (buffer.length >= this.marklimit) {
this.markpos = -1;
this.pos = 0;
} else {
var nsz = this.pos * 2;
if (nsz > this.marklimit) nsz = this.marklimit;
var nbuf =  Clazz.newByteArray (nsz, 0);
System.arraycopy (buffer, 0, nbuf, 0, this.pos);
buffer = this.buf = nbuf;
}this.count = this.pos;
var n = this.getInIfOpen ().read (buffer, this.pos, buffer.length - this.pos);
if (n > 0) this.count = n + this.pos;
});
Clazz.overrideMethod (c$, "readByteAsInt", 
function () {
if (this.pos >= this.count) {
this.fill ();
if (this.pos >= this.count) return -1;
}return this.getBufIfOpen ()[this.pos++] & 0xff;
});
Clazz.defineMethod (c$, "read1", 
 function (b, off, len) {
var avail = this.count - this.pos;
if (avail <= 0) {
if (len >= this.getBufIfOpen ().length && this.markpos < 0) {
return this.getInIfOpen ().read (b, off, len);
}this.fill ();
avail = this.count - this.pos;
if (avail <= 0) return -1;
}var cnt = (avail < len) ? avail : len;
System.arraycopy (this.getBufIfOpen (), this.pos, b, off, cnt);
this.pos += cnt;
return cnt;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
this.getBufIfOpen ();
if ((off | len | (off + len) | (b.length - (off + len))) < 0) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}var n = 0;
for (; ; ) {
var nread = this.read1 (b, off + n, len - n);
if (nread <= 0) return (n == 0) ? nread : n;
n += nread;
if (n >= len) return n;
var input = this.$in;
if (input != null && input.available () <= 0) return n;
}
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "skip", 
function (n) {
this.getBufIfOpen ();
if (n <= 0) {
return 0;
}var avail = this.count - this.pos;
if (avail <= 0) {
if (this.markpos < 0) return this.getInIfOpen ().skip (n);
this.fill ();
avail = this.count - this.pos;
if (avail <= 0) return 0;
}var skipped = (avail < n) ? avail : n;
this.pos += skipped;
return skipped;
}, "~N");
Clazz.overrideMethod (c$, "available", 
function () {
var n = this.count - this.pos;
var avail = this.getInIfOpen ().available ();
return n > (2147483647 - avail) ? 2147483647 : n + avail;
});
Clazz.overrideMethod (c$, "mark", 
function (readlimit) {
this.marklimit = readlimit;
this.markpos = this.pos;
}, "~N");
Clazz.overrideMethod (c$, "reset", 
function () {
this.getBufIfOpen ();
if (this.markpos < 0) throw  new java.io.IOException ("Resetting to invalid mark");
this.pos = this.markpos;
});
Clazz.overrideMethod (c$, "markSupported", 
function () {
return true;
});
Clazz.overrideMethod (c$, "close", 
function () {
var input = this.$in;
this.$in = null;
if (input != null) input.close ();
return;
});
Clazz.defineStatics (c$,
"DEFAULT_BUFFER_SIZE", 8192);
});
