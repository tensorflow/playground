Clazz.load (["java.io.Reader"], "java.io.BufferedReader", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "JU.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$in = null;
this.cb = null;
this.nChars = 0;
this.nextChar = 0;
this.markedChar = -1;
this.readAheadLimit = 0;
this.skipLF = false;
this.markedSkipLF = false;
Clazz.instantialize (this, arguments);
}, java.io, "BufferedReader", java.io.Reader);
Clazz.defineMethod (c$, "setSize", 
 function (sz) {
if (sz <= 0) throw  new IllegalArgumentException ("Buffer size <= 0");
this.cb =  Clazz.newCharArray (sz, '\0');
this.nextChar = this.nChars = 0;
}, "~N");
Clazz.makeConstructor (c$, 
function ($in) {
Clazz.superConstructor (this, java.io.BufferedReader, [$in]);
this.$in = $in;
this.setSize (8192);
}, "java.io.Reader");
Clazz.defineMethod (c$, "ensureOpen", 
 function () {
if (this.$in == null) throw  new java.io.IOException ("Stream closed");
});
Clazz.defineMethod (c$, "fill", 
 function () {
var dst;
if (this.markedChar <= -1) {
dst = 0;
} else {
var delta = this.nextChar - this.markedChar;
if (delta >= this.readAheadLimit) {
this.markedChar = -2;
this.readAheadLimit = 0;
dst = 0;
} else {
if (this.readAheadLimit <= this.cb.length) {
System.arraycopy (this.cb, this.markedChar, this.cb, 0, delta);
this.markedChar = 0;
dst = delta;
} else {
var ncb =  Clazz.newCharArray (this.readAheadLimit, '\0');
System.arraycopy (this.cb, this.markedChar, ncb, 0, delta);
this.cb = ncb;
this.markedChar = 0;
dst = delta;
}this.nextChar = this.nChars = delta;
}}var n;
do {
n = this.$in.read (this.cb, dst, this.cb.length - dst);
} while (n == 0);
if (n > 0) {
this.nChars = dst + n;
this.nextChar = dst;
}});
Clazz.defineMethod (c$, "read1", 
 function (cbuf, off, len) {
if (this.nextChar >= this.nChars) {
if (len >= this.cb.length && this.markedChar <= -1 && !this.skipLF) {
return this.$in.read (cbuf, off, len);
}this.fill ();
}if (this.nextChar >= this.nChars) return -1;
if (this.skipLF) {
this.skipLF = false;
if (this.cb[this.nextChar] == '\n') {
this.nextChar++;
if (this.nextChar >= this.nChars) this.fill ();
if (this.nextChar >= this.nChars) return -1;
}}var n = Math.min (len, this.nChars - this.nextChar);
System.arraycopy (this.cb, this.nextChar, cbuf, off, n);
this.nextChar += n;
return n;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "read", 
function (cbuf, off, len) {
{
this.ensureOpen ();
if ((off < 0) || (off > cbuf.length) || (len < 0) || ((off + len) > cbuf.length) || ((off + len) < 0)) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}var n = this.read1 (cbuf, off, len);
if (n <= 0) return n;
while ((n < len) && this.$in.ready ()) {
var n1 = this.read1 (cbuf, off + n, len - n);
if (n1 <= 0) break;
n += n1;
}
return n;
}}, "~A,~N,~N");
Clazz.defineMethod (c$, "readLine1", 
 function (ignoreLF) {
var s = null;
var startChar;
{
this.ensureOpen ();
var omitLF = ignoreLF || this.skipLF;
for (; ; ) {
if (this.nextChar >= this.nChars) this.fill ();
if (this.nextChar >= this.nChars) {
if (s != null && s.length () > 0) return s.toString ();
return null;
}var eol = false;
var c = String.fromCharCode (0);
var i;
if (omitLF && (this.cb[this.nextChar] == '\n')) this.nextChar++;
this.skipLF = false;
omitLF = false;
charLoop : for (i = this.nextChar; i < this.nChars; i++) {
c = this.cb[i];
if ((c == '\n') || (c == '\r')) {
eol = true;
break charLoop;
}}
startChar = this.nextChar;
this.nextChar = i;
if (eol) {
var str;
if (s == null) {
str =  String.instantialize (this.cb, startChar, i - startChar);
} else {
s.appendCB (this.cb, startChar, i - startChar);
str = s.toString ();
}this.nextChar++;
if (c == '\r') {
this.skipLF = true;
}return str;
}if (s == null) s = JU.SB.newN (80);
s.appendCB (this.cb, startChar, i - startChar);
}
}}, "~B");
Clazz.defineMethod (c$, "readLine", 
function () {
return this.readLine1 (false);
});
Clazz.overrideMethod (c$, "skip", 
function (n) {
if (n < 0) {
throw  new IllegalArgumentException ("skip value is negative");
}{
this.ensureOpen ();
var r = n;
while (r > 0) {
if (this.nextChar >= this.nChars) this.fill ();
if (this.nextChar >= this.nChars) break;
if (this.skipLF) {
this.skipLF = false;
if (this.cb[this.nextChar] == '\n') {
this.nextChar++;
}}var d = this.nChars - this.nextChar;
if (r <= d) {
this.nextChar += r;
r = 0;
break;
}r -= d;
this.nextChar = this.nChars;
}
return n - r;
}}, "~N");
Clazz.defineMethod (c$, "ready", 
function () {
{
this.ensureOpen ();
if (this.skipLF) {
if (this.nextChar >= this.nChars && this.$in.ready ()) {
this.fill ();
}if (this.nextChar < this.nChars) {
if (this.cb[this.nextChar] == '\n') this.nextChar++;
this.skipLF = false;
}}return (this.nextChar < this.nChars) || this.$in.ready ();
}});
Clazz.overrideMethod (c$, "markSupported", 
function () {
return true;
});
Clazz.overrideMethod (c$, "mark", 
function (readAheadLimit) {
if (readAheadLimit < 0) {
throw  new IllegalArgumentException ("Read-ahead limit < 0");
}{
this.ensureOpen ();
this.readAheadLimit = readAheadLimit;
this.markedChar = this.nextChar;
this.markedSkipLF = this.skipLF;
}}, "~N");
Clazz.overrideMethod (c$, "reset", 
function () {
{
this.ensureOpen ();
if (this.markedChar < 0) throw  new java.io.IOException ((this.markedChar == -2) ? "Mark invalid" : "Stream not marked");
this.nextChar = this.markedChar;
this.skipLF = this.markedSkipLF;
}});
Clazz.defineMethod (c$, "close", 
function () {
{
if (this.$in == null) return;
this.$in.close ();
this.$in = null;
this.cb = null;
}});
Clazz.defineStatics (c$,
"INVALIDATED", -2,
"UNMARKED", -1,
"DEFAULT_CHAR_BUFFER_SIZE", 8192,
"DEFAULT_EXPECTED_LINE_LENGTH", 80);
});
