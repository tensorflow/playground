Clazz.load (["java.io.InputStream"], "java.io.FilterInputStream", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$in = null;
Clazz.instantialize (this, arguments);
}, java.io, "FilterInputStream", java.io.InputStream);
Clazz.makeConstructor (c$, 
function ($in) {
Clazz.superConstructor (this, java.io.FilterInputStream, []);
this.$in = $in;
}, "java.io.InputStream");
Clazz.defineMethod (c$, "readByteAsInt", 
function () {
return this.$in.readByteAsInt ();
});
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
return this.$in.read (b, off, len);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "skip", 
function (n) {
return this.$in.skip (n);
}, "~N");
Clazz.defineMethod (c$, "available", 
function () {
return this.$in.available ();
});
Clazz.defineMethod (c$, "close", 
function () {
this.$in.close ();
});
Clazz.defineMethod (c$, "mark", 
function (readlimit) {
this.$in.mark (readlimit);
}, "~N");
Clazz.defineMethod (c$, "reset", 
function () {
this.$in.reset ();
});
Clazz.defineMethod (c$, "markSupported", 
function () {
return this.$in.markSupported ();
});
});
