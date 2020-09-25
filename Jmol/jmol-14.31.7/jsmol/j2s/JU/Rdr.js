Clazz.declarePackage ("JU");
Clazz.load (["java.io.BufferedReader", "javajs.api.GenericLineReader"], "JU.Rdr", ["java.io.BufferedInputStream", "$.ByteArrayInputStream", "$.InputStreamReader", "$.StringReader", "JU.AU", "$.Base64", "$.Encoding", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reader = null;
Clazz.instantialize (this, arguments);
}, JU, "Rdr", null, javajs.api.GenericLineReader);
Clazz.makeConstructor (c$, 
function (reader) {
this.reader = reader;
}, "java.io.BufferedReader");
Clazz.overrideMethod (c$, "readNextLine", 
function () {
return this.reader.readLine ();
});
c$.readCifData = Clazz.defineMethod (c$, "readCifData", 
function (parser, br) {
return parser.set (null, br, false).getAllCifData ();
}, "javajs.api.GenericCifDataParser,java.io.BufferedReader");
c$.fixUTF = Clazz.defineMethod (c$, "fixUTF", 
function (bytes) {
var encoding = JU.Rdr.getUTFEncoding (bytes);
if (encoding !== JU.Encoding.NONE) try {
var s =  String.instantialize (bytes, encoding.name ().$replace ('_', '-'));
switch (encoding) {
case JU.Encoding.UTF8:
case JU.Encoding.UTF_16BE:
case JU.Encoding.UTF_16LE:
s = s.substring (1);
break;
default:
break;
}
return s;
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
System.out.println (e);
} else {
throw e;
}
}
return  String.instantialize (bytes);
}, "~A");
c$.getUTFEncoding = Clazz.defineMethod (c$, "getUTFEncoding", 
 function (bytes) {
if (bytes.length >= 3 && (bytes[0] & 0xFF) == 0xEF && (bytes[1] & 0xFF) == 0xBB && (bytes[2] & 0xFF) == 0xBF) return JU.Encoding.UTF8;
if (bytes.length >= 4 && (bytes[0] & 0xFF) == 0 && (bytes[1] & 0xFF) == 0 && (bytes[2] & 0xFF) == 0xFE && (bytes[3] & 0xFF) == 0xFF) return JU.Encoding.UTF_32BE;
if (bytes.length >= 4 && (bytes[0] & 0xFF) == 0xFF && (bytes[1] & 0xFF) == 0xFE && (bytes[2] & 0xFF) == 0 && (bytes[3] & 0xFF) == 0) return JU.Encoding.UTF_32LE;
if (bytes.length >= 2 && (bytes[0] & 0xFF) == 0xFF && (bytes[1] & 0xFF) == 0xFE) return JU.Encoding.UTF_16LE;
if (bytes.length >= 2 && (bytes[0] & 0xFF) == 0xFE && (bytes[1] & 0xFF) == 0xFF) return JU.Encoding.UTF_16BE;
return JU.Encoding.NONE;
}, "~A");
c$.getUTFEncodingForStream = Clazz.defineMethod (c$, "getUTFEncodingForStream", 
 function (is) {
{
is.resetStream();
}var abMagic =  Clazz.newByteArray (4, 0);
abMagic[3] = 1;
try {
is.mark (5);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return JU.Encoding.NONE;
} else {
throw e;
}
}
is.read (abMagic, 0, 4);
is.reset ();
return JU.Rdr.getUTFEncoding (abMagic);
}, "java.io.BufferedInputStream");
c$.isBase64 = Clazz.defineMethod (c$, "isBase64", 
function (sb) {
return (sb.indexOf (";base64,") == 0);
}, "JU.SB");
c$.isCompoundDocumentS = Clazz.defineMethod (c$, "isCompoundDocumentS", 
function (is) {
return JU.Rdr.isCompoundDocumentB (JU.Rdr.getMagic (is, 8));
}, "java.io.InputStream");
c$.isCompoundDocumentB = Clazz.defineMethod (c$, "isCompoundDocumentB", 
function (bytes) {
return (bytes.length >= 8 && (bytes[0] & 0xFF) == 0xD0 && (bytes[1] & 0xFF) == 0xCF && (bytes[2] & 0xFF) == 0x11 && (bytes[3] & 0xFF) == 0xE0 && (bytes[4] & 0xFF) == 0xA1 && (bytes[5] & 0xFF) == 0xB1 && (bytes[6] & 0xFF) == 0x1A && (bytes[7] & 0xFF) == 0xE1);
}, "~A");
c$.isBZip2S = Clazz.defineMethod (c$, "isBZip2S", 
function (is) {
return JU.Rdr.isBZip2B (JU.Rdr.getMagic (is, 3));
}, "java.io.InputStream");
c$.isGzipS = Clazz.defineMethod (c$, "isGzipS", 
function (is) {
return JU.Rdr.isGzipB (JU.Rdr.getMagic (is, 2));
}, "java.io.InputStream");
c$.isBZip2B = Clazz.defineMethod (c$, "isBZip2B", 
function (bytes) {
return (bytes != null && bytes.length >= 3 && (bytes[0] & 0xFF) == 0x42 && (bytes[1] & 0xFF) == 0x5A && (bytes[2] & 0xFF) == 0x68);
}, "~A");
c$.isGzipB = Clazz.defineMethod (c$, "isGzipB", 
function (bytes) {
return (bytes != null && bytes.length >= 2 && (bytes[0] & 0xFF) == 0x1F && (bytes[1] & 0xFF) == 0x8B);
}, "~A");
c$.isPickleS = Clazz.defineMethod (c$, "isPickleS", 
function (is) {
return JU.Rdr.isPickleB (JU.Rdr.getMagic (is, 2));
}, "java.io.InputStream");
c$.isPickleB = Clazz.defineMethod (c$, "isPickleB", 
function (bytes) {
return (bytes != null && bytes.length >= 2 && (bytes[0] & 0xFF) == 0x7D && (bytes[1] & 0xFF) == 0x71);
}, "~A");
c$.isMessagePackS = Clazz.defineMethod (c$, "isMessagePackS", 
function (is) {
return JU.Rdr.isMessagePackB (JU.Rdr.getMagic (is, 2));
}, "java.io.InputStream");
c$.isMessagePackB = Clazz.defineMethod (c$, "isMessagePackB", 
function (bytes) {
var b;
return (bytes != null && bytes.length >= 1 && (((b = bytes[0] & 0xFF)) == 0xDE || (b & 0xE0) == 0x80 && bytes[1] != 0x50));
}, "~A");
c$.isPngZipStream = Clazz.defineMethod (c$, "isPngZipStream", 
function (is) {
return JU.Rdr.isPngZipB (JU.Rdr.getMagic (is, 55));
}, "java.io.InputStream");
c$.isPngZipB = Clazz.defineMethod (c$, "isPngZipB", 
function (bytes) {
return (bytes[50] == 0 && bytes[51] == 0x50 && bytes[52] == 0x4E && bytes[53] == 0x47 && bytes[54] == 0x4A);
}, "~A");
c$.isZipS = Clazz.defineMethod (c$, "isZipS", 
function (is) {
return JU.Rdr.isZipB (JU.Rdr.getMagic (is, 4));
}, "java.io.InputStream");
c$.isZipB = Clazz.defineMethod (c$, "isZipB", 
function (bytes) {
return (bytes.length >= 4 && bytes[0] == 0x50 && bytes[1] == 0x4B && bytes[2] == 0x03 && bytes[3] == 0x04);
}, "~A");
c$.getMagic = Clazz.defineMethod (c$, "getMagic", 
function (is, n) {
var abMagic =  Clazz.newByteArray (n, 0);
{
is.resetStream();
}try {
is.mark (n + 1);
is.read (abMagic, 0, n);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
try {
is.reset ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return abMagic;
}, "java.io.InputStream,~N");
c$.guessMimeTypeForBytes = Clazz.defineMethod (c$, "guessMimeTypeForBytes", 
function (bytes) {
switch (bytes.length < 2 ? -1 : bytes[1]) {
case 0:
return "image/jpg";
case 0x49:
return "image/gif";
case 0x4D:
return "image/BMP";
case 0x50:
return "image/png";
default:
return "image/unknown";
}
}, "~A");
c$.getBIS = Clazz.defineMethod (c$, "getBIS", 
function (bytes) {
return  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes));
}, "~A");
c$.getBR = Clazz.defineMethod (c$, "getBR", 
function (string) {
return  new java.io.BufferedReader ( new java.io.StringReader (string));
}, "~S");
c$.getUnzippedInputStream = Clazz.defineMethod (c$, "getUnzippedInputStream", 
function (jzt, bis) {
while (JU.Rdr.isGzipS (bis)) bis =  new java.io.BufferedInputStream (jzt.newGZIPInputStream (bis));

return bis;
}, "javajs.api.GenericZipTools,java.io.BufferedInputStream");
c$.getUnzippedInputStreamBZip2 = Clazz.defineMethod (c$, "getUnzippedInputStreamBZip2", 
function (jzt, bis) {
while (JU.Rdr.isBZip2S (bis)) bis =  new java.io.BufferedInputStream (jzt.newBZip2InputStream (bis));

return bis;
}, "javajs.api.GenericZipTools,java.io.BufferedInputStream");
c$.getBytesFromSB = Clazz.defineMethod (c$, "getBytesFromSB", 
function (sb) {
return (JU.Rdr.isBase64 (sb) ? JU.Base64.decodeBase64 (sb.substring (8)) : sb.toBytes (0, -1));
}, "JU.SB");
c$.getStreamAsBytes = Clazz.defineMethod (c$, "getStreamAsBytes", 
function (bis, out) {
var buf =  Clazz.newByteArray (1024, 0);
var bytes = (out == null ?  Clazz.newByteArray (4096, 0) : null);
var len = 0;
var totalLen = 0;
while ((len = bis.read (buf, 0, 1024)) > 0) {
totalLen += len;
if (out == null) {
if (totalLen >= bytes.length) bytes = JU.AU.ensureLengthByte (bytes, totalLen * 2);
System.arraycopy (buf, 0, bytes, totalLen - len, len);
} else {
out.write (buf, 0, len);
}}
bis.close ();
if (out == null) {
return JU.AU.arrayCopyByte (bytes, totalLen);
}return totalLen + " bytes";
}, "java.io.BufferedInputStream,JU.OC");
c$.getBufferedReader = Clazz.defineMethod (c$, "getBufferedReader", 
function (bis, charSet) {
if (JU.Rdr.getUTFEncodingForStream (bis) === JU.Encoding.NONE) return  new JU.Rdr.StreamReader (bis, charSet);
var bytes = JU.Rdr.getLimitedStreamBytes (bis, -1);
bis.close ();
return JU.Rdr.getBR (charSet == null ? JU.Rdr.fixUTF (bytes) :  String.instantialize (bytes, charSet));
}, "java.io.BufferedInputStream,~S");
c$.getLimitedStreamBytes = Clazz.defineMethod (c$, "getLimitedStreamBytes", 
function (is, n) {
var buflen = (n > 0 && n < 1024 ? n : 1024);
var buf =  Clazz.newByteArray (buflen, 0);
var bytes =  Clazz.newByteArray (n < 0 ? 4096 : n, 0);
var len = 0;
var totalLen = 0;
if (n < 0) n = 2147483647;
while (totalLen < n && (len = is.read (buf, 0, buflen)) > 0) {
totalLen += len;
if (totalLen > bytes.length) bytes = JU.AU.ensureLengthByte (bytes, totalLen * 2);
System.arraycopy (buf, 0, bytes, totalLen - len, len);
if (n != 2147483647 && totalLen + buflen > bytes.length) buflen = bytes.length - totalLen;
}
if (totalLen == bytes.length) return bytes;
buf =  Clazz.newByteArray (totalLen, 0);
System.arraycopy (bytes, 0, buf, 0, totalLen);
return buf;
}, "java.io.InputStream,~N");
c$.streamToUTF8String = Clazz.defineMethod (c$, "streamToUTF8String", 
function (bis) {
var data =  new Array (1);
try {
JU.Rdr.readAllAsString (JU.Rdr.getBufferedReader (bis, "UTF-8"), -1, true, data, 0);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return data[0];
}, "java.io.BufferedInputStream");
c$.readAllAsString = Clazz.defineMethod (c$, "readAllAsString", 
function (br, nBytesMax, allowBinary, data, i) {
try {
var sb = JU.SB.newN (8192);
var line;
if (nBytesMax < 0) {
line = br.readLine ();
if (allowBinary || line != null && line.indexOf ('\0') < 0 && (line.length != 4 || line.charCodeAt (0) != 65533 || line.indexOf ("PNG") != 1)) {
sb.append (line).appendC ('\n');
while ((line = br.readLine ()) != null) sb.append (line).appendC ('\n');

}} else {
var n = 0;
var len;
while (n < nBytesMax && (line = br.readLine ()) != null) {
if (nBytesMax - n < (len = line.length) + 1) line = line.substring (0, nBytesMax - n - 1);
sb.append (line).appendC ('\n');
n += len + 1;
}
}br.close ();
data[i] = sb.toString ();
return true;
} catch (ioe) {
if (Clazz.exceptionOf (ioe, Exception)) {
data[i] = ioe.toString ();
return false;
} else {
throw ioe;
}
}
}, "java.io.BufferedReader,~N,~B,~A,~N");
c$.getPngZipPointAndCount = Clazz.defineMethod (c$, "getPngZipPointAndCount", 
function (bis, pt_count) {
bis.mark (75);
try {
var data = JU.Rdr.getLimitedStreamBytes (bis, 74);
bis.reset ();
var pt = 0;
for (var i = 64, f = 1; --i > 54; f *= 10) pt += (data[i] - 48) * f;

var n = 0;
for (var i = 74, f = 1; --i > 64; f *= 10) n += (data[i] - 48) * f;

pt_count[0] = pt;
pt_count[1] = n;
} catch (e) {
pt_count[1] = 0;
}
}, "java.io.BufferedInputStream,~A");
c$.getPngZipStream = Clazz.defineMethod (c$, "getPngZipStream", 
function (bis, asNewStream) {
if (!JU.Rdr.isPngZipStream (bis)) return bis;
var data =  Clazz.newByteArray (0, 0);
bis.mark (75);
try {
var pt_count =  Clazz.newIntArray (2, 0);
JU.Rdr.getPngZipPointAndCount (bis, pt_count);
if (pt_count[1] != 0) {
var pt = pt_count[0];
while (pt > 0) pt -= bis.skip (pt);

if (!asNewStream) return bis;
data = JU.Rdr.getLimitedStreamBytes (bis, pt_count[1]);
}} catch (e) {
} finally {
try {
if (asNewStream) bis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}
return JU.Rdr.getBIS (data);
}, "java.io.BufferedInputStream,~B");
c$.getZipRoot = Clazz.defineMethod (c$, "getZipRoot", 
function (fileName) {
var pt = fileName.indexOf ("|");
return (pt < 0 ? fileName : fileName.substring (0, pt));
}, "~S");
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.stream = null;
Clazz.instantialize (this, arguments);
}, JU.Rdr, "StreamReader", java.io.BufferedReader);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, JU.Rdr.StreamReader, [ new java.io.InputStreamReader (a, (b == null ? "UTF-8" : b))]);
this.stream = a;
}, "java.io.BufferedInputStream,~S");
Clazz.defineMethod (c$, "getStream", 
function () {
try {
this.stream.reset ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return this.stream;
});
c$ = Clazz.p0p ();
});
