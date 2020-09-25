Clazz.declarePackage ("JU");
Clazz.load (["javajs.api.GenericZipTools"], "JU.ZipTools", ["java.io.BufferedInputStream", "$.IOException", "java.lang.Boolean", "java.util.zip.CRC32", "$.GZIPInputStream", "$.ZipEntry", "$.ZipInputStream", "javajs.api.GenericZipInputStream", "$.Interface", "$.ZInputStream", "JU.BArray", "$.Lst", "$.PT", "$.Rdr", "$.SB"], function () {
c$ = Clazz.declareType (JU, "ZipTools", null, javajs.api.GenericZipTools);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "newZipInputStream", 
function (is) {
return JU.ZipTools.newZIS (is);
}, "java.io.InputStream");
c$.newZIS = Clazz.defineMethod (c$, "newZIS", 
 function (is) {
return (Clazz.instanceOf (is, javajs.api.ZInputStream) ? is : Clazz.instanceOf (is, java.io.BufferedInputStream) ?  new javajs.api.GenericZipInputStream (is) :  new javajs.api.GenericZipInputStream ( new java.io.BufferedInputStream (is)));
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "getAllZipData", 
function (is, subfileList, name0, binaryFileList, exclude, fileData) {
var zis = JU.ZipTools.newZIS (is);
var ze;
var listing =  new JU.SB ();
binaryFileList = "|" + binaryFileList + "|";
var prefix = JU.PT.join (subfileList, '/', 1);
var prefixd = null;
if (prefix != null) {
prefixd = prefix.substring (0, prefix.indexOf ("/") + 1);
if (prefixd.length == 0) prefixd = null;
}try {
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
if (prefix != null && prefixd != null && !(name.equals (prefix) || name.startsWith (prefixd)) || exclude != null && name.contains (exclude)) continue;
listing.append (name).appendC ('\n');
var sname = "|" + name.substring (name.lastIndexOf ("/") + 1) + "|";
var asBinaryString = (binaryFileList.indexOf (sname) >= 0);
var bytes = JU.Rdr.getLimitedStreamBytes (zis, ze.getSize ());
var str;
if (asBinaryString) {
str = this.getBinaryStringForBytes (bytes);
name += ":asBinaryString";
} else {
str = JU.Rdr.fixUTF (bytes);
}str = "BEGIN Directory Entry " + name + "\n" + str + "\nEND Directory Entry " + name + "\n";
var key = name0 + "|" + name;
fileData.put (key, str);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
fileData.put ("#Directory_Listing", listing.toString ());
}, "java.io.InputStream,~A,~S,~S,~S,java.util.Map");
Clazz.defineMethod (c$, "getBinaryStringForBytes", 
 function (bytes) {
var ret =  new JU.SB ();
for (var i = 0; i < bytes.length; i++) ret.append (Integer.toHexString (bytes[i] & 0xFF)).appendC (' ');

return ret.toString ();
}, "~A");
Clazz.overrideMethod (c$, "getZipFileDirectory", 
function (bis, list, listPtr, asBufferedInputStream) {
var ret;
if (list == null || listPtr >= list.length) return this.getZipDirectoryAsStringAndClose (bis);
bis = JU.Rdr.getPngZipStream (bis, true);
var fileName = list[listPtr];
var zis =  new java.util.zip.ZipInputStream (bis);
var ze;
try {
var isAll = (fileName.equals ("."));
if (isAll || fileName.lastIndexOf ("/") == fileName.length - 1) {
ret =  new JU.SB ();
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
if (isAll || name.startsWith (fileName)) ret.append (name).appendC ('\n');
}
var str = ret.toString ();
return (asBufferedInputStream ? JU.Rdr.getBIS (str.getBytes ()) : str);
}var pt = fileName.indexOf (":asBinaryString");
var asBinaryString = (pt > 0);
if (asBinaryString) fileName = fileName.substring (0, pt);
fileName = fileName.$replace ('\\', '/');
while ((ze = zis.getNextEntry ()) != null && !fileName.equals (ze.getName ())) {
}
var bytes = (ze == null ? null : JU.Rdr.getLimitedStreamBytes (zis, ze.getSize ()));
ze = null;
zis.close ();
if (bytes == null) return "";
if (JU.Rdr.isZipB (bytes) || JU.Rdr.isPngZipB (bytes)) return this.getZipFileDirectory (JU.Rdr.getBIS (bytes), list, ++listPtr, asBufferedInputStream);
if (asBufferedInputStream) return JU.Rdr.getBIS (bytes);
if (asBinaryString) {
ret =  new JU.SB ();
for (var i = 0; i < bytes.length; i++) ret.append (Integer.toHexString (bytes[i] & 0xFF)).appendC (' ');

return ret.toString ();
}if (JU.Rdr.isGzipB (bytes)) bytes = JU.Rdr.getLimitedStreamBytes (this.getUnGzippedInputStream (bytes), -1);
return JU.Rdr.fixUTF (bytes);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return "";
} else {
throw e;
}
}
}, "java.io.BufferedInputStream,~A,~N,~B");
Clazz.overrideMethod (c$, "getZipFileContentsAsBytes", 
function (bis, list, listPtr) {
var ret =  Clazz.newByteArray (0, 0);
var fileName = list[listPtr];
if (fileName.lastIndexOf ("/") == fileName.length - 1) return ret;
try {
bis = JU.Rdr.getPngZipStream (bis, true);
var zis =  new java.util.zip.ZipInputStream (bis);
var ze;
while ((ze = zis.getNextEntry ()) != null) {
if (!fileName.equals (ze.getName ())) continue;
var bytes = JU.Rdr.getLimitedStreamBytes (zis, ze.getSize ());
return ((JU.Rdr.isZipB (bytes) || JU.Rdr.isPngZipB (bytes)) && ++listPtr < list.length ? this.getZipFileContentsAsBytes (JU.Rdr.getBIS (bytes), list, listPtr) : bytes);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return ret;
}, "java.io.BufferedInputStream,~A,~N");
Clazz.overrideMethod (c$, "getZipDirectoryAsStringAndClose", 
function (bis) {
var sb =  new JU.SB ();
var s =  new Array (0);
try {
s = this.getZipDirectoryOrErrorAndClose (bis, null);
bis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
for (var i = 0; i < s.length; i++) sb.append (s[i]).appendC ('\n');

return sb.toString ();
}, "java.io.BufferedInputStream");
Clazz.overrideMethod (c$, "getZipDirectoryAndClose", 
function (bis, manifestID) {
var s =  new Array (0);
try {
s = this.getZipDirectoryOrErrorAndClose (bis, manifestID);
bis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
return s;
}, "java.io.BufferedInputStream,~S");
Clazz.defineMethod (c$, "getZipDirectoryOrErrorAndClose", 
 function (bis, manifestID) {
bis = JU.Rdr.getPngZipStream (bis, true);
var v =  new JU.Lst ();
var zis =  new java.util.zip.ZipInputStream (bis);
var ze;
var manifest = null;
while ((ze = zis.getNextEntry ()) != null) {
var fileName = ze.getName ();
if (manifestID != null && fileName.startsWith (manifestID)) manifest = JU.ZipTools.getStreamAsString (zis);
 else if (!fileName.startsWith ("__MACOS")) v.addLast (fileName);
}
zis.close ();
if (manifestID != null) v.add (0, manifest == null ? "" : manifest + "\n############\n");
return v.toArray ( new Array (v.size ()));
}, "java.io.BufferedInputStream,~S");
c$.getStreamAsString = Clazz.defineMethod (c$, "getStreamAsString", 
function (is) {
return JU.Rdr.fixUTF (JU.Rdr.getLimitedStreamBytes (is, -1));
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "newGZIPInputStream", 
function (is) {
return  new java.io.BufferedInputStream ( new java.util.zip.GZIPInputStream (is, 512));
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "newBZip2InputStream", 
function (is) {
return  new java.io.BufferedInputStream ((javajs.api.Interface.getInterface ("org.apache.tools.bzip2.CBZip2InputStreamFactory")).getStream (is));
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "getUnGzippedInputStream", 
function (bytes) {
try {
return JU.Rdr.getUnzippedInputStream (this, JU.Rdr.getBIS (bytes));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "~A");
Clazz.overrideMethod (c$, "addZipEntry", 
function (zos, fileName) {
(zos).putNextEntry ( new java.util.zip.ZipEntry (fileName));
}, "~O,~S");
Clazz.overrideMethod (c$, "closeZipEntry", 
function (zos) {
(zos).closeEntry ();
}, "~O");
Clazz.overrideMethod (c$, "getZipOutputStream", 
function (bos) {
{
return javajs.api.Interface.getInterface(
"java.util.zip.ZipOutputStream").setZOS(bos);
}}, "~O");
Clazz.overrideMethod (c$, "getCrcValue", 
function (bytes) {
var crc =  new java.util.zip.CRC32 ();
crc.update (bytes, 0, bytes.length);
return crc.getValue ();
}, "~A");
Clazz.overrideMethod (c$, "readFileAsMap", 
function (bis, bdata, name) {
var pt = (name == null ? -1 : name.indexOf ("|"));
name = (pt >= 0 ? name.substring (pt + 1) : null);
var bytes = null;
try {
if (JU.Rdr.isPngZipStream (bis)) {
var isImage = "_IMAGE_".equals (name);
if (name == null || isImage) {
bytes = JU.ZipTools.getPngImageBytes (bis);
bdata.put ((isImage ? "_DATA_" : "_IMAGE_"),  new JU.BArray (bytes));
}if (!isImage) this.cacheZipContents (bis, name, bdata, true);
} else if (JU.Rdr.isZipS (bis)) {
this.cacheZipContents (bis, name, bdata, true);
} else if (name == null) {
bytes = JU.Rdr.getLimitedStreamBytes (JU.Rdr.getUnzippedInputStream (this, bis), -1);
bdata.put ("_DATA_",  new JU.BArray (bytes));
} else {
throw  new java.io.IOException ("ZIP file " + name + " not found");
}if (bytes != null) bdata.put ("_LEN_", Integer.$valueOf (bytes.length));
bdata.put ("$_BINARY_$", Boolean.TRUE);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
bdata.clear ();
bdata.put ("_ERROR_", e.getMessage ());
} else {
throw e;
}
}
}, "java.io.BufferedInputStream,java.util.Map,~S");
Clazz.overrideMethod (c$, "cacheZipContents", 
function (bis, fileName, cache, asByteArray) {
var zis = JU.ZipTools.newZIS (bis);
var ze;
var listing =  new JU.SB ();
var n = 0;
var oneFile = (asByteArray && fileName != null);
var pt = (oneFile ? fileName.indexOf ("|") : -1);
var file0 = (pt >= 0 ? fileName : null);
if (pt >= 0) fileName = fileName.substring (0, pt);
try {
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
if (fileName != null) {
if (oneFile) {
if (!name.equalsIgnoreCase (fileName)) continue;
} else {
listing.append (name).appendC ('\n');
}}var nBytes = ze.getSize ();
var bytes = JU.Rdr.getLimitedStreamBytes (zis, nBytes);
if (file0 != null) {
this.readFileAsMap (JU.Rdr.getBIS (bytes), cache, file0);
return null;
}n += bytes.length;
var o = (asByteArray ?  new JU.BArray (bytes) : bytes);
cache.put ((oneFile ? "_DATA_" : (fileName == null ? "" : fileName + "|") + name), o);
if (oneFile) break;
}
zis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
try {
zis.close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
return null;
} else {
throw e;
}
}
if (n == 0 || fileName == null) return null;
System.out.println ("ZipTools cached " + n + " bytes from " + fileName);
return listing.toString ();
}, "java.io.BufferedInputStream,~S,java.util.Map,~B");
c$.getPngImageBytes = Clazz.defineMethod (c$, "getPngImageBytes", 
 function (bis) {
try {
if (JU.Rdr.isPngZipStream (bis)) {
var pt_count =  Clazz.newIntArray (2, 0);
JU.Rdr.getPngZipPointAndCount (bis, pt_count);
if (pt_count[1] != 0) return JU.ZipTools.deActivatePngZipB (JU.Rdr.getLimitedStreamBytes (bis, pt_count[0]));
}return JU.Rdr.getLimitedStreamBytes (bis, -1);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}, "java.io.BufferedInputStream");
c$.deActivatePngZipB = Clazz.defineMethod (c$, "deActivatePngZipB", 
 function (bytes) {
if (JU.Rdr.isPngZipB (bytes)) bytes[51] = 32;
return bytes;
}, "~A");
});
