Clazz.declarePackage ("JU");
Clazz.load (["java.io.OutputStream", "javajs.api.GenericOutputChannel"], "JU.OC", ["java.io.BufferedWriter", "$.ByteArrayOutputStream", "$.OutputStreamWriter", "java.lang.Float", "JU.Base64", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bytePoster = null;
this.fileName = null;
this.bw = null;
this.isLocalFile = false;
this.byteCount = 0;
this.isCanceled = false;
this.closed = false;
this.os = null;
this.sb = null;
this.type = null;
this.$isBase64 = false;
this.os0 = null;
this.bytes = null;
this.bigEndian = true;
Clazz.instantialize (this, arguments);
}, JU, "OC", java.io.OutputStream, javajs.api.GenericOutputChannel);
Clazz.overrideMethod (c$, "isBigEndian", 
function () {
return this.bigEndian;
});
Clazz.defineMethod (c$, "setBigEndian", 
function (TF) {
this.bigEndian = TF;
}, "~B");
Clazz.defineMethod (c$, "setParams", 
function (bytePoster, fileName, asWriter, os) {
this.bytePoster = bytePoster;
this.fileName = fileName;
this.$isBase64 = ";base64,".equals (fileName);
if (this.$isBase64) {
fileName = null;
this.os0 = os;
os = null;
}this.os = os;
this.isLocalFile = (fileName != null && !JU.OC.isRemote (fileName));
if (asWriter && !this.$isBase64 && os != null) this.bw =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (os));
return this;
}, "javajs.api.BytePoster,~S,~B,java.io.OutputStream");
Clazz.defineMethod (c$, "setBytes", 
function (b) {
this.bytes = b;
return this;
}, "~A");
Clazz.defineMethod (c$, "getFileName", 
function () {
return this.fileName;
});
Clazz.defineMethod (c$, "getName", 
function () {
return (this.fileName == null ? null : this.fileName.substring (this.fileName.lastIndexOf ("/") + 1));
});
Clazz.defineMethod (c$, "getByteCount", 
function () {
return this.byteCount;
});
Clazz.defineMethod (c$, "setType", 
function (type) {
this.type = type;
}, "~S");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "append", 
function (s) {
try {
if (this.bw != null) {
this.bw.write (s);
} else if (this.os == null) {
if (this.sb == null) this.sb =  new JU.SB ();
this.sb.append (s);
} else {
var b = s.getBytes ();
this.os.write (b, 0, b.length);
this.byteCount += b.length;
return this;
}} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.byteCount += s.length;
return this;
}, "~S");
Clazz.overrideMethod (c$, "reset", 
function () {
this.sb = null;
this.initOS ();
});
Clazz.defineMethod (c$, "initOS", 
 function () {
if (this.sb != null) {
var s = this.sb.toString ();
this.reset ();
this.append (s);
return;
}try {
{
this.os = null;
}if (this.os == null) this.os =  new java.io.ByteArrayOutputStream ();
if (this.bw != null) {
this.bw.close ();
this.bw =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (this.os));
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
this.byteCount = 0;
});
Clazz.overrideMethod (c$, "writeByteAsInt", 
function (b) {
if (this.os == null) this.initOS ();
{
this.os.writeByteAsInt(b);
}this.byteCount++;
}, "~N");
Clazz.overrideMethod (c$, "write", 
function (buf, i, len) {
if (this.os == null) this.initOS ();
if (len < 0) len = buf.length - i;
try {
this.os.write (buf, i, len);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.byteCount += len;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "writeShort", 
function (i) {
if (this.isBigEndian ()) {
this.writeByteAsInt (i >> 8);
this.writeByteAsInt (i);
} else {
this.writeByteAsInt (i);
this.writeByteAsInt (i >> 8);
}}, "~N");
Clazz.overrideMethod (c$, "writeLong", 
function (b) {
if (this.isBigEndian ()) {
this.writeInt (((b >> 32) & 0xFFFFFFFF));
this.writeInt ((b & 0xFFFFFFFF));
} else {
this.writeByteAsInt ((b >> 56));
this.writeByteAsInt ((b >> 48));
this.writeByteAsInt ((b >> 40));
this.writeByteAsInt ((b >> 32));
this.writeByteAsInt ((b >> 24));
this.writeByteAsInt ((b >> 16));
this.writeByteAsInt ((b >> 8));
this.writeByteAsInt (b);
}}, "~N");
Clazz.defineMethod (c$, "cancel", 
function () {
this.isCanceled = true;
this.closeChannel ();
});
Clazz.overrideMethod (c$, "closeChannel", 
function () {
if (this.closed) return null;
try {
if (this.bw != null) {
this.bw.flush ();
this.bw.close ();
} else if (this.os != null) {
this.os.flush ();
this.os.close ();
}if (this.os0 != null && this.isCanceled) {
this.os0.flush ();
this.os0.close ();
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (this.isCanceled) {
this.closed = true;
return null;
}if (this.fileName == null) {
if (this.$isBase64) {
var s = this.getBase64 ();
if (this.os0 != null) {
this.os = this.os0;
this.append (s);
}this.sb =  new JU.SB ();
this.sb.append (s);
this.$isBase64 = false;
return this.closeChannel ();
}return (this.sb == null ? null : this.sb.toString ());
}this.closed = true;
if (!this.isLocalFile) {
var ret = this.postByteArray ();
if (ret == null || ret.startsWith ("java.net")) this.byteCount = -1;
return ret;
}var jmol = null;
var _function = null;
{
jmol = self.J2S || Jmol; _function = (typeof this.fileName == "function" ?
this.fileName : null);
}if (jmol != null) {
var data = (this.sb == null ? this.toByteArray () : this.sb.toString ());
if (_function == null) jmol.doAjax (this.fileName, null, data, this.sb == null);
 else jmol.applyFunc (this.fileName, data);
}return null;
});
Clazz.defineMethod (c$, "isBase64", 
function () {
return this.$isBase64;
});
Clazz.defineMethod (c$, "getBase64", 
function () {
return JU.Base64.getBase64 (this.toByteArray ()).toString ();
});
Clazz.defineMethod (c$, "toByteArray", 
function () {
return (this.bytes != null ? this.bytes : Clazz.instanceOf (this.os, java.io.ByteArrayOutputStream) ? (this.os).toByteArray () : null);
});
Clazz.defineMethod (c$, "close", 
function () {
this.closeChannel ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.bw != null) try {
this.bw.flush ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.sb != null) return this.closeChannel ();
return this.byteCount + " bytes";
});
Clazz.defineMethod (c$, "postByteArray", 
 function () {
var bytes = (this.sb == null ? this.toByteArray () : this.sb.toString ().getBytes ());
return this.bytePoster.postByteArray (this.fileName, bytes);
});
c$.isRemote = Clazz.defineMethod (c$, "isRemote", 
function (fileName) {
if (fileName == null) return false;
var itype = JU.OC.urlTypeIndex (fileName);
return (itype >= 0 && itype != 5);
}, "~S");
c$.isLocal = Clazz.defineMethod (c$, "isLocal", 
function (fileName) {
if (fileName == null) return false;
var itype = JU.OC.urlTypeIndex (fileName);
return (itype < 0 || itype == 5);
}, "~S");
c$.urlTypeIndex = Clazz.defineMethod (c$, "urlTypeIndex", 
function (name) {
if (name == null) return -2;
for (var i = 0; i < JU.OC.urlPrefixes.length; ++i) {
if (name.startsWith (JU.OC.urlPrefixes[i])) {
return i;
}}
return -1;
}, "~S");
Clazz.overrideMethod (c$, "writeInt", 
function (i) {
if (this.bigEndian) {
this.writeByteAsInt (i >> 24);
this.writeByteAsInt (i >> 16);
this.writeByteAsInt (i >> 8);
this.writeByteAsInt (i);
} else {
this.writeByteAsInt (i);
this.writeByteAsInt (i >> 8);
this.writeByteAsInt (i >> 16);
this.writeByteAsInt (i >> 24);
}}, "~N");
Clazz.defineMethod (c$, "writeFloat", 
function (x) {
this.writeInt (x == 0 ? 0 : Float.floatToIntBits (x));
}, "~N");
Clazz.defineStatics (c$,
"urlPrefixes",  Clazz.newArray (-1, ["http:", "https:", "sftp:", "ftp:", "cache://", "file:"]),
"URL_LOCAL", 5);
});
