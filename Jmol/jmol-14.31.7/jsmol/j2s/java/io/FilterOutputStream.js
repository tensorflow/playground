Clazz.load (["java.io.OutputStream"], "java.io.FilterOutputStream", ["java.lang.IndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.out = null;
Clazz.instantialize (this, arguments);
}, java.io, "FilterOutputStream", java.io.OutputStream);
Clazz.defineMethod (c$, "jzSetFOS", 
function (out) {
this.out = out;
}, "java.io.OutputStream");
Clazz.defineMethod (c$, "writeByteAsInt", 
function (b) {
this.out.writeByteAsInt (b);
}, "~N");
Clazz.defineMethod (c$, "write", 
function (b, off, len) {
if ((off | len | (b.length - (len + off)) | (off + len)) < 0) throw  new IndexOutOfBoundsException ();
for (var i = 0; i < len; i++) {
this.writeByteAsInt (b[off + i]);
}
}, "~A,~N,~N");
Clazz.defineMethod (c$, "flush", 
function () {
this.out.flush ();
});
Clazz.defineMethod (c$, "close", 
function () {
try {
this.flush ();
} catch (ignored) {
if (Clazz.exceptionOf (ignored, java.io.IOException)) {
} else {
throw ignored;
}
}
this.out.close ();
});
});
