Clazz.load (["java.io.InputStream"], "java.io.ByteArrayInputStream", ["java.lang.IndexOutOfBoundsException", "$.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buf = null;
this.pos = 0;
this.$mark = 0;
this.count = 0;
Clazz.instantialize (this, arguments);
}, java.io, "ByteArrayInputStream", java.io.InputStream);
Clazz.makeConstructor (c$, 
function (buf) {
Clazz.superConstructor (this, java.io.ByteArrayInputStream, []);
this.buf = buf;
this.pos = 0;
this.count = buf.length;
}, "~A");
Clazz.overrideMethod (c$, "readByteAsInt", 
function () {
return (this.pos < this.count) ? (this.buf[this.pos++] & 0xff) : -1;
});
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
if (b == null) {
throw  new NullPointerException ();
} else if (off < 0 || len < 0 || len > b.length - off) {
throw  new IndexOutOfBoundsException ();
}if (this.pos >= this.count) {
return -1;
}var avail = this.count - this.pos;
if (len > avail) {
len = avail;
}if (len <= 0) {
return 0;
}System.arraycopy (this.buf, this.pos, b, off, len);
this.pos += len;
return len;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "skip", 
function (n) {
var k = this.count - this.pos;
if (n < k) {
k = n < 0 ? 0 : n;
}this.pos += k;
return k;
}, "~N");
Clazz.overrideMethod (c$, "available", 
function () {
return this.count - this.pos;
});
Clazz.overrideMethod (c$, "markSupported", 
function () {
return true;
});
Clazz.overrideMethod (c$, "mark", 
function (readAheadLimit) {
this.$mark = this.pos;
}, "~N");
Clazz.overrideMethod (c$, "resetStream", 
function () {
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.pos = this.$mark;
});
Clazz.overrideMethod (c$, "close", 
function () {
});
});
