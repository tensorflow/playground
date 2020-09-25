Clazz.declarePackage ("java.util.zip");
Clazz.load (["java.util.zip.ZipConstants"], "java.util.zip.ZipEntry", ["java.lang.IllegalArgumentException", "$.InternalError", "$.NullPointerException", "java.util.Date"], function () {
c$ = Clazz.decorateAsClass (function () {
this.offset = 0;
this.name = null;
this.time = -1;
this.crc = -1;
this.size = -1;
this.csize = -1;
this.method = -1;
this.flag = 0;
this.extra = null;
this.comment = null;
Clazz.instantialize (this, arguments);
}, java.util.zip, "ZipEntry", null, [java.util.zip.ZipConstants, Cloneable]);
Clazz.makeConstructor (c$, 
function (name) {
if (name == null) {
throw  new NullPointerException ();
}if (name.length > 0xFFFF) {
throw  new IllegalArgumentException ("entry name too long");
}this.name = name;
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "setTime", 
function (time) {
this.time = java.util.zip.ZipEntry.javaToDosTime (time);
}, "~N");
Clazz.defineMethod (c$, "getTime", 
function () {
return this.time != -1 ? java.util.zip.ZipEntry.dosToJavaTime (this.time) : -1;
});
Clazz.defineMethod (c$, "setSize", 
function (size) {
if (size < 0) {
throw  new IllegalArgumentException ("invalid entry size");
}this.size = size;
}, "~N");
Clazz.defineMethod (c$, "getSize", 
function () {
return this.size;
});
Clazz.defineMethod (c$, "getCompressedSize", 
function () {
return this.csize;
});
Clazz.defineMethod (c$, "setCompressedSize", 
function (csize) {
this.csize = csize;
}, "~N");
Clazz.defineMethod (c$, "setCrc", 
function (crc) {
if (crc < 0 || crc > 0xFFFFFFFF) {
throw  new IllegalArgumentException ("invalid entry crc-32");
}this.crc = crc;
}, "~N");
Clazz.defineMethod (c$, "getCrc", 
function () {
return this.crc;
});
Clazz.defineMethod (c$, "setMethod", 
function (method) {
if (method != 0 && method != 8) {
throw  new IllegalArgumentException ("invalid compression method");
}this.method = method;
}, "~N");
Clazz.defineMethod (c$, "getMethod", 
function () {
return this.method;
});
Clazz.defineMethod (c$, "setExtra", 
function (extra) {
if (extra != null && extra.length > 0xFFFF) {
throw  new IllegalArgumentException ("invalid extra field length");
}this.extra = extra;
}, "~A");
Clazz.defineMethod (c$, "getExtra", 
function () {
return this.extra;
});
Clazz.defineMethod (c$, "setComment", 
function (comment) {
this.comment = comment;
}, "~S");
Clazz.defineMethod (c$, "getComment", 
function () {
return this.comment;
});
Clazz.defineMethod (c$, "isDirectory", 
function () {
return this.name.endsWith ("/");
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getName ();
});
c$.dosToJavaTime = Clazz.defineMethod (c$, "dosToJavaTime", 
 function (dtime) {
var d =  new java.util.Date ((((dtime >> 25) & 0x7f) + 80), (((dtime >> 21) & 0x0f) - 1), ((dtime >> 16) & 0x1f), ((dtime >> 11) & 0x1f), ((dtime >> 5) & 0x3f), ((dtime << 1) & 0x3e));
return d.getTime ();
}, "~N");
c$.javaToDosTime = Clazz.defineMethod (c$, "javaToDosTime", 
 function (time) {
var d =  new java.util.Date (time);
var year = d.getYear () + 1900;
if (year < 1980) {
return 2162688;
}return (year - 1980) << 25 | (d.getMonth () + 1) << 21 | d.getDate () << 16 | d.getHours () << 11 | d.getMinutes () << 5 | d.getSeconds () >> 1;
}, "~N");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.name.hashCode ();
});
Clazz.defineMethod (c$, "clone", 
function () {
try {
var e = Clazz.superCall (this, java.util.zip.ZipEntry, "clone", []);
if (this.extra != null) {
e.extra =  Clazz.newByteArray (this.extra.length, 0);
System.arraycopy (this.extra, 0, e.extra, 0, this.extra.length);
}return e;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.defineStatics (c$,
"STORED", 0,
"DEFLATED", 8);
});
