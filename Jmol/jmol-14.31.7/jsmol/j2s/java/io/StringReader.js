Clazz.load (["java.io.Reader"], "java.io.StringReader", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.str = null;
this.length = 0;
this.next = 0;
this.$mark = 0;
Clazz.instantialize (this, arguments);
}, java.io, "StringReader", java.io.Reader);
Clazz.makeConstructor (c$, 
function (s) {
Clazz.superConstructor (this, java.io.StringReader, [s]);
this.str = s;
this.length = s.length;
}, "~S");
Clazz.defineMethod (c$, "ensureOpen", 
 function () {
if (this.str == null) throw  new java.io.IOException ("Stream closed");
});
Clazz.overrideMethod (c$, "read", 
function (cbuf, off, len) {
{
this.ensureOpen ();
if ((off < 0) || (off > cbuf.length) || (len < 0) || ((off + len) > cbuf.length) || ((off + len) < 0)) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}if (this.next >= this.length) return -1;
var n = Math.min (this.length - this.next, len);
this.str.getChars (this.next, this.next + n, cbuf, off);
this.next += n;
return n;
}}, "~A,~N,~N");
Clazz.overrideMethod (c$, "skip", 
function (ns) {
{
this.ensureOpen ();
if (this.next >= this.length) return 0;
var n = Math.min (this.length - this.next, ns);
n = Math.max (-this.next, n);
this.next += n;
return n;
}}, "~N");
Clazz.overrideMethod (c$, "ready", 
function () {
{
this.ensureOpen ();
return true;
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
this.$mark = this.next;
}}, "~N");
Clazz.overrideMethod (c$, "reset", 
function () {
{
this.ensureOpen ();
this.next = this.$mark;
}});
Clazz.overrideMethod (c$, "close", 
function () {
this.str = null;
});
});
