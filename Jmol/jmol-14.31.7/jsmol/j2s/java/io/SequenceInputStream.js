Clazz.load (["java.io.InputStream"], "java.io.SequenceInputStream", ["java.lang.Error", "$.IndexOutOfBoundsException", "$.NullPointerException", "java.util.Vector"], function () {
c$ = Clazz.decorateAsClass (function () {
this.e = null;
this.$in = null;
Clazz.instantialize (this, arguments);
}, java.io, "SequenceInputStream", java.io.InputStream);
Clazz.makeConstructor (c$, 
function (e) {
Clazz.superConstructor (this, java.io.SequenceInputStream, []);
this.e = e;
try {
this.nextStream ();
} catch (ex) {
if (Clazz.exceptionOf (ex, java.io.IOException)) {
throw  new Error ("panic");
} else {
throw ex;
}
}
}, "java.util.Enumeration");
Clazz.makeConstructor (c$, 
function (s1, s2) {
Clazz.superConstructor (this, java.io.SequenceInputStream, []);
var v =  new java.util.Vector (2);
v.addElement (s1);
v.addElement (s2);
this.e = v.elements ();
try {
this.nextStream ();
} catch (ex) {
if (Clazz.exceptionOf (ex, java.io.IOException)) {
throw  new Error ("panic");
} else {
throw ex;
}
}
}, "java.io.InputStream,java.io.InputStream");
Clazz.defineMethod (c$, "nextStream", 
function () {
if (this.$in != null) {
this.$in.close ();
}if (this.e.hasMoreElements ()) {
this.$in = this.e.nextElement ();
if (this.$in == null) throw  new NullPointerException ();
} else this.$in = null;
});
Clazz.defineMethod (c$, "available", 
function () {
if (this.$in == null) {
return 0;
}return this.$in.available ();
});
Clazz.defineMethod (c$, "readByteAsInt", 
function () {
if (this.$in == null) {
return -1;
}var c = this.$in.readByteAsInt ();
if (c == -1) {
this.nextStream ();
return this.readByteAsInt ();
}return c;
});
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
if (this.$in == null) {
return -1;
} else if (b == null) {
throw  new NullPointerException ();
} else if (off < 0 || len < 0 || len > b.length - off) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}var n = this.$in.read (b, off, len);
if (n <= 0) {
this.nextStream ();
return this.read (b, off, len);
}return n;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "close", 
function () {
do {
this.nextStream ();
} while (this.$in != null);
});
});
