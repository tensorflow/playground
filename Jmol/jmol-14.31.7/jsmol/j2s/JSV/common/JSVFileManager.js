Clazz.declarePackage ("JSV.common");
Clazz.load (["java.util.Hashtable"], "JSV.common.JSVFileManager", ["java.io.BufferedInputStream", "$.BufferedReader", "$.InputStreamReader", "$.StringReader", "java.net.URL", "JU.AU", "$.BS", "$.Encoding", "$.JSJSONParser", "$.P3", "$.PT", "$.SB", "JSV.common.JSVersion", "$.JSViewer", "JSV.exception.JSVException", "JU.Logger"], function () {
c$ = Clazz.declareType (JSV.common, "JSVFileManager");
Clazz.defineMethod (c$, "isApplet", 
function () {
return (JSV.common.JSVFileManager.appletDocumentBase != null);
});
c$.getFileAsString = Clazz.defineMethod (c$, "getFileAsString", 
function (name) {
if (name == null) return null;
var br;
var sb =  new JU.SB ();
try {
br = JSV.common.JSVFileManager.getBufferedReaderFromName (name, null);
var line;
while ((line = br.readLine ()) != null) {
sb.append (line);
sb.appendC ('\n');
}
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
return sb.toString ();
}, "~S");
c$.getBufferedReaderForInputStream = Clazz.defineMethod (c$, "getBufferedReaderForInputStream", 
function ($in) {
try {
return  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF-8"));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "java.io.InputStream");
c$.getBufferedReaderForStringOrBytes = Clazz.defineMethod (c$, "getBufferedReaderForStringOrBytes", 
function (stringOrBytes) {
return (stringOrBytes == null ? null :  new java.io.BufferedReader ( new java.io.StringReader (Clazz.instanceOf (stringOrBytes, String) ? stringOrBytes :  String.instantialize (stringOrBytes))));
}, "~O");
c$.getBufferedReaderFromName = Clazz.defineMethod (c$, "getBufferedReaderFromName", 
function (name, startCode) {
if (name == null) throw  new JSV.exception.JSVException ("Cannot find " + name);
JU.Logger.info ("JSVFileManager getBufferedReaderFromName " + name);
var path = JSV.common.JSVFileManager.getFullPathName (name);
if (!path.equals (name)) JU.Logger.info ("JSVFileManager getBufferedReaderFromName " + path);
return JSV.common.JSVFileManager.getUnzippedBufferedReaderFromName (path, startCode);
}, "~S,~S");
c$.getFullPathName = Clazz.defineMethod (c$, "getFullPathName", 
function (name) {
try {
if (JSV.common.JSVFileManager.appletDocumentBase == null) {
if (JSV.common.JSVFileManager.isURL (name)) {
var url =  new java.net.URL (Clazz.castNullAs ("java.net.URL"), name, null);
return url.toString ();
}return JSV.common.JSVFileManager.viewer.apiPlatform.newFile (name).getFullPath ();
}if (name.indexOf (":\\") == 1 || name.indexOf (":/") == 1) name = "file:///" + name;
 else if (name.startsWith ("cache://")) return name;
var url =  new java.net.URL (JSV.common.JSVFileManager.appletDocumentBase, name, null);
return url.toString ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException ("Cannot create path for " + name);
} else {
throw e;
}
}
}, "~S");
c$.isURL = Clazz.defineMethod (c$, "isURL", 
function (name) {
for (var i = JSV.common.JSVFileManager.urlPrefixes.length; --i >= 0; ) if (name.startsWith (JSV.common.JSVFileManager.urlPrefixes[i])) return true;

return false;
}, "~S");
c$.urlTypeIndex = Clazz.defineMethod (c$, "urlTypeIndex", 
function (name) {
for (var i = 0; i < JSV.common.JSVFileManager.urlPrefixes.length; ++i) {
if (name.startsWith (JSV.common.JSVFileManager.urlPrefixes[i])) {
return i;
}}
return -1;
}, "~S");
c$.isLocal = Clazz.defineMethod (c$, "isLocal", 
function (fileName) {
if (fileName == null) return false;
var itype = JSV.common.JSVFileManager.urlTypeIndex (fileName);
return (itype < 0 || itype == 4);
}, "~S");
c$.getUnzippedBufferedReaderFromName = Clazz.defineMethod (c$, "getUnzippedBufferedReaderFromName", 
 function (name, startCode) {
var subFileList = null;
if (name.indexOf ("|") >= 0) {
subFileList = JU.PT.split (name, "|");
if (subFileList != null && subFileList.length > 0) name = subFileList[0];
}if (name.startsWith ("http://SIMULATION/")) return JSV.common.JSVFileManager.getSimulationReader (name);
try {
var ret = JSV.common.JSVFileManager.getInputStream (name, true, null);
if (Clazz.instanceOf (ret, JU.SB) || Clazz.instanceOf (ret, String)) return  new java.io.BufferedReader ( new java.io.StringReader (ret.toString ()));
if (JSV.common.JSVFileManager.isAB (ret)) return  new java.io.BufferedReader ( new java.io.StringReader ( String.instantialize (ret)));
var bis =  new java.io.BufferedInputStream (ret);
var $in = bis;
if (JSV.common.JSVFileManager.isZipFile (bis)) return (JSV.common.JSViewer.getInterface ("JSV.common.JSVZipUtil")).newJSVZipFileSequentialReader ($in, subFileList, startCode);
if (JSV.common.JSVFileManager.isGzip (bis)) $in = (JSV.common.JSViewer.getInterface ("JSV.common.JSVZipUtil")).newGZIPInputStream ($in);
return  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF-8"));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException ("Cannot read file " + name + " " + e);
} else {
throw e;
}
}
}, "~S,~S");
c$.getAbbrSimulationFileName = Clazz.defineMethod (c$, "getAbbrSimulationFileName", 
function (name) {
var type = JSV.common.JSVFileManager.getSimulationType (name);
var filename = JSV.common.JSVFileManager.getAbbreviatedSimulationName (name, type, true);
return filename;
}, "~S");
c$.getAbbreviatedSimulationName = Clazz.defineMethod (c$, "getAbbreviatedSimulationName", 
function (name, type, addProtocol) {
return (name.indexOf ("MOL=") >= 0 ? (addProtocol ? "http://SIMULATION/" : "") + "MOL=" + JSV.common.JSVFileManager.getSimulationHash (name, type) : name);
}, "~S,~S,~B");
c$.getSimulationHash = Clazz.defineMethod (c$, "getSimulationHash", 
 function (name, type) {
var code = type + Math.abs (name.substring (name.indexOf ("V2000") + 1).hashCode ());
if (JU.Logger.debugging) System.out.println ("JSVFileManager hash for " + name + " = " + code);
return code;
}, "~S,~S");
c$.getSimulationFileData = Clazz.defineMethod (c$, "getSimulationFileData", 
function (name, type) {
return JSV.common.JSVFileManager.cacheGet (name.startsWith ("MOL=") ? name.substring (4) : JSV.common.JSVFileManager.getAbbreviatedSimulationName (name, type, false));
}, "~S,~S");
c$.cachePut = Clazz.defineMethod (c$, "cachePut", 
function (name, data) {
if (JU.Logger.debugging) JU.Logger.debug ("JSVFileManager cachePut " + data + " for " + name);
if (data != null) JSV.common.JSVFileManager.htCorrelationCache.put (name, data);
}, "~S,~S");
c$.cacheGet = Clazz.defineMethod (c$, "cacheGet", 
function (key) {
var data = JSV.common.JSVFileManager.htCorrelationCache.get (key);
if (JU.Logger.debugging) JU.Logger.info ("JSVFileManager cacheGet " + data + " for " + key);
return data;
}, "~S");
c$.getSimulationReader = Clazz.defineMethod (c$, "getSimulationReader", 
 function (name) {
var data = JSV.common.JSVFileManager.cacheGet (name);
if (data == null) JSV.common.JSVFileManager.cachePut (name, data = JSV.common.JSVFileManager.getNMRSimulationJCampDX (name.substring ("http://SIMULATION/".length)));
return JSV.common.JSVFileManager.getBufferedReaderForStringOrBytes (data);
}, "~S");
c$.isAB = Clazz.defineMethod (c$, "isAB", 
function (x) {
{
return Clazz.isAB(x);
}}, "~O");
c$.isZipFile = Clazz.defineMethod (c$, "isZipFile", 
function (is) {
try {
var abMagic =  Clazz.newByteArray (4, 0);
is.mark (5);
var countRead = is.read (abMagic, 0, 4);
is.reset ();
return (countRead == 4 && abMagic[0] == 0x50 && abMagic[1] == 0x4B && abMagic[2] == 0x03 && abMagic[3] == 0x04);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.toString ());
} else {
throw e;
}
}
}, "java.io.InputStream");
c$.isGzip = Clazz.defineMethod (c$, "isGzip", 
 function (is) {
try {
var abMagic =  Clazz.newByteArray (4, 0);
is.mark (5);
var countRead = is.read (abMagic, 0, 4);
is.reset ();
return (countRead == 4 && abMagic[0] == 0x1F && abMagic[1] == 0x8B);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.toString ());
} else {
throw e;
}
}
}, "java.io.InputStream");
c$.getStreamAsBytes = Clazz.defineMethod (c$, "getStreamAsBytes", 
function (bis, out) {
try {
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
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.toString ());
} else {
throw e;
}
}
}, "java.io.BufferedInputStream,JU.OC");
c$.postByteArray = Clazz.defineMethod (c$, "postByteArray", 
function (fileName, bytes) {
var ret = null;
try {
ret = JSV.common.JSVFileManager.getInputStream (fileName, false, bytes);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
ret = e.toString ();
} else {
throw e;
}
}
if (Clazz.instanceOf (ret, String)) return ret;
try {
ret = JSV.common.JSVFileManager.getStreamAsBytes (ret, null);
} catch (e) {
if (Clazz.exceptionOf (e, JSV.exception.JSVException)) {
try {
(ret).close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, Exception)) {
} else {
throw e1;
}
}
} else {
throw e;
}
}
return (ret == null ? "" : JSV.common.JSVFileManager.fixUTF (ret));
}, "~S,~A");
c$.getUTFEncoding = Clazz.defineMethod (c$, "getUTFEncoding", 
 function (bytes) {
if (bytes.length >= 3 && bytes[0] == 0xEF && bytes[1] == 0xBB && bytes[2] == 0xBF) return JU.Encoding.UTF8;
if (bytes.length >= 4 && bytes[0] == 0 && bytes[1] == 0 && bytes[2] == 0xFE && bytes[3] == 0xFF) return JU.Encoding.UTF_32BE;
if (bytes.length >= 4 && bytes[0] == 0xFF && bytes[1] == 0xFE && bytes[2] == 0 && bytes[3] == 0) return JU.Encoding.UTF_32LE;
if (bytes.length >= 2 && bytes[0] == 0xFF && bytes[1] == 0xFE) return JU.Encoding.UTF_16LE;
if (bytes.length >= 2 && bytes[0] == 0xFE && bytes[1] == 0xFF) return JU.Encoding.UTF_16BE;
return JU.Encoding.NONE;
}, "~A");
c$.fixUTF = Clazz.defineMethod (c$, "fixUTF", 
function (bytes) {
var encoding = JSV.common.JSVFileManager.getUTFEncoding (bytes);
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
if (Clazz.exceptionOf (e, java.io.IOException)) {
JU.Logger.error ("fixUTF error " + e);
} else {
throw e;
}
}
return  String.instantialize (bytes);
}, "~A");
c$.getInputStream = Clazz.defineMethod (c$, "getInputStream", 
function (name, showMsg, postBytes) {
var isURL = JSV.common.JSVFileManager.isURL (name);
var isApplet = (JSV.common.JSVFileManager.appletDocumentBase != null);
var $in = null;
var post = null;
var iurl;
if (isURL && (iurl = name.indexOf ("?POST?")) >= 0) {
post = name.substring (iurl + 6);
name = name.substring (0, iurl);
}if (isApplet || isURL) {
var url;
try {
url =  new java.net.URL (JSV.common.JSVFileManager.appletDocumentBase, name, null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException ("Cannot read " + name);
} else {
throw e;
}
}
JU.Logger.info ("JSVFileManager opening URL " + url + (post == null ? "" : " with POST of " + post.length + " bytes"));
$in = JSV.common.JSVFileManager.viewer.apiPlatform.getURLContents (url, postBytes, post, false);
} else {
if (showMsg) JU.Logger.info ("JSVFileManager opening file " + name);
$in = JSV.common.JSVFileManager.viewer.apiPlatform.getBufferedFileInputStream (name);
}if (Clazz.instanceOf ($in, String)) throw  new JSV.exception.JSVException ($in);
return $in;
}, "~S,~B,~A");
c$.getNMRSimulationJCampDX = Clazz.defineMethod (c$, "getNMRSimulationJCampDX", 
 function (name) {
var pt = 0;
var molFile = null;
var type = JSV.common.JSVFileManager.getSimulationType (name);
if (name.startsWith (type)) name = name.substring (type.length + 1);
var isInline = name.startsWith ("MOL=");
if (isInline) {
name = name.substring (4);
pt = name.indexOf ("/n__Jmol");
if (pt > 0) name = name.substring (0, pt) + JU.PT.rep (name.substring (pt), "/n", "\n");
molFile = name = JU.PT.rep (name, "\\n", "\n");
}var key = "" + JSV.common.JSVFileManager.getSimulationHash (name, type);
if (JU.Logger.debugging) JU.Logger.info ("JSVFileManager type=" + type + " key=" + key + " name=" + name);
var jcamp = JSV.common.JSVFileManager.cacheGet (key);
if (jcamp != null) return jcamp;
var src = (isInline ? null : JU.PT.rep (JSV.common.JSVFileManager.nciResolver, "%FILE", JU.PT.escapeUrl (name)));
if (!isInline && (molFile = JSV.common.JSVFileManager.getFileAsString (src)) == null || molFile.indexOf ("<html") >= 0) {
JU.Logger.error ("no MOL data returned by NCI");
return null;
}var is13C = type.equals ("C13");
var url = (is13C ? JSV.common.JSVFileManager.nmrdbServerC13 : JSV.common.JSVFileManager.nmrdbServerH1);
var json = JSV.common.JSVFileManager.getFileAsString (url + molFile);
var map = ( new JU.JSJSONParser ()).parseMap (json, true);
JSV.common.JSVFileManager.cachePut ("json", json);
if (is13C) map = map.get ("result");
var jsonMolFile = map.get ("molfile");
if (jsonMolFile == null) {
System.out.println ("JSVFileManager: no MOL file returned from EPFL");
jsonMolFile = molFile;
} else {
System.out.println ("JSVFileManager: MOL file hash=" + jsonMolFile.hashCode ());
}var atomMap = JSV.common.JSVFileManager.getAtomMap (jsonMolFile, molFile);
JSV.common.JSVFileManager.cachePut ("mol", molFile);
{
if (!isInline) Jmol.Cache.put("http://SIMULATION/" + type +
"/" + name + "#molfile", molFile.getBytes());
}var xml = "<Signals src=" + JU.PT.esc (JU.PT.rep (is13C ? JSV.common.JSVFileManager.nmrdbServerC13 : JSV.common.JSVFileManager.nmrdbServerH1, "?POST?molfile=", "")) + ">\n";
if (is13C) {
var spec = map.get ("spectrum13C");
jcamp = (spec.get ("jcamp")).get ("value");
var lst = spec.get ("predCSNuc");
var sb =  new JU.SB ();
for (var i = lst.size (); --i >= 0; ) {
map = lst.get (i);
sb.append ("<Signal ");
JSV.common.JSVFileManager.setAttr (sb, "type", "nucleus", map);
if (atomMap == null) JSV.common.JSVFileManager.setAttr (sb, "atoms", "assignment", map);
 else sb.append ("atoms=\"").appendI (atomMap[JU.PT.parseInt (map.get ("assignment"))]).append ("\" ");
JSV.common.JSVFileManager.setAttr (sb, "multiplicity", "multiplicity", map);
map = map.get ("integralData");
JSV.common.JSVFileManager.setAttr (sb, "xMin", "from", map);
JSV.common.JSVFileManager.setAttr (sb, "xMax", "to", map);
JSV.common.JSVFileManager.setAttr (sb, "integral", "value", map);
sb.append ("></Signal>\n");
}
sb.append ("</Signals>");
xml += sb.toString ();
} else {
xml = JU.PT.rep (map.get ("xml"), "<Signals>", xml);
if (atomMap != null) {
var sb =  new JU.SB ();
var signals = JU.PT.split (xml, " atoms=\"");
sb.append (signals[0]);
for (var i = 1; i < signals.length; i++) {
var s = signals[i];
var a = JU.PT.parseInt (s);
sb.append (" atoms=\"").appendI (atomMap[a]).append (s.substring (s.indexOf ("\"")));
}
xml = sb.toString ();
}xml = JU.PT.rep (xml, "</", "\n</");
xml = JU.PT.rep (xml, "><", ">\n<");
xml = JU.PT.rep (xml, "\\\"", "\"");
jcamp = map.get ("jcamp");
}if (JU.Logger.debugging) JU.Logger.info (xml);
JSV.common.JSVFileManager.cachePut ("xml", xml);
jcamp = "##TITLE=" + (isInline ? "JMOL SIMULATION/" + type : name) + "\n" + jcamp.substring (jcamp.indexOf ("\n##") + 1);
pt = molFile.indexOf ("\n");
pt = molFile.indexOf ("\n", pt + 1);
if (pt > 0 && pt == molFile.indexOf ("\n \n")) molFile = molFile.substring (0, pt + 1) + "Created " + JSV.common.JSVFileManager.viewer.apiPlatform.getDateFormat ("8824") + " by JSpecView " + JSV.common.JSVersion.VERSION + molFile.substring (pt + 1);
pt = 0;
pt = jcamp.indexOf ("##.");
var id = JSV.common.JSVFileManager.getAbbreviatedSimulationName (name, type, false);
var pt1 = id.indexOf ("id='");
if (isInline && pt1 > 0) id = id.substring (pt1 + 4, (id + "'").indexOf ("'", pt1 + 4));
jcamp = jcamp.substring (0, pt) + "##$MODELS=\n<Models>\n" + "<ModelData id=" + JU.PT.esc (id) + " type=\"MOL\" src=" + JU.PT.esc (src) + ">\n" + molFile + "</ModelData>\n</Models>\n" + "##$SIGNALS=\n" + xml + "\n" + jcamp.substring (pt);
JSV.common.JSVFileManager.cachePut ("jcamp", jcamp);
JSV.common.JSVFileManager.cachePut (key, jcamp);
return jcamp;
}, "~S");
c$.getAtomMap = Clazz.defineMethod (c$, "getAtomMap", 
 function (jsonMolFile, jmolMolFile) {
var acJson = JSV.common.JSVFileManager.getCoord (jsonMolFile);
var acJmol = JSV.common.JSVFileManager.getCoord (jmolMolFile);
var n = acJson.length;
if (n != acJmol.length) return null;
var map =  Clazz.newIntArray (n, 0);
var bs =  new JU.BS ();
bs.setBits (0, n);
var haveMap = false;
for (var i = 0; i < n; i++) {
var a = acJson[i];
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
if (a.distanceSquared (acJmol[j]) < 0.1) {
bs.clear (j);
map[i] = j;
if (i != j) haveMap = true;
break;
}}
}
return (haveMap ? map : null);
}, "~S,~S");
c$.getCoord = Clazz.defineMethod (c$, "getCoord", 
 function (mol) {
var lines = JU.PT.split (mol, "\n");
var data =  Clazz.newFloatArray (3, 0);
var n = Integer.parseInt (lines[3].substring (0, 3).trim ());
var pts =  new Array (n);
for (var i = 0; i < n; i++) {
var line = lines[4 + i];
JU.PT.parseFloatArrayInfested (JU.PT.getTokens (line.substring (0, 31)), data);
pts[i] = JU.P3.new3 (data[0], data[1], data[2]);
}
return pts;
}, "~S");
c$.setAttr = Clazz.defineMethod (c$, "setAttr", 
 function (sb, mykey, lucsKey, map) {
sb.append (mykey + "=\"").appendO (map.get (lucsKey)).append ("\" ");
}, "JU.SB,~S,~S,java.util.Map");
c$.getResource = Clazz.defineMethod (c$, "getResource", 
 function (object, fileName, error) {
var url = null;
try {
if ((url = object.getClass ().getResource (fileName)) == null) error[0] = "Couldn't find file: " + fileName;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
error[0] = "Exception " + e + " in getResource " + fileName;
} else {
throw e;
}
}
return url;
}, "~O,~S,~A");
c$.getResourceString = Clazz.defineMethod (c$, "getResourceString", 
function (object, name, error) {
var url = JSV.common.JSVFileManager.getResource (object, name, error);
if (url == null) {
error[0] = "Error loading resource " + name;
return null;
}if (Clazz.instanceOf (url, String)) {
return JSV.common.JSVFileManager.getFileAsString (url);
}var sb =  new JU.SB ();
try {
var br =  new java.io.BufferedReader ( new java.io.InputStreamReader ((url).getContent (), "UTF-8"));
var line;
while ((line = br.readLine ()) != null) sb.append (line).append ("\n");

br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
error[0] = e.toString ();
} else {
throw e;
}
}
return sb.toString ();
}, "~O,~S,~A");
c$.getJmolFilePath = Clazz.defineMethod (c$, "getJmolFilePath", 
function (filePath) {
try {
filePath = JSV.common.JSVFileManager.getFullPathName (filePath);
} catch (e) {
if (Clazz.exceptionOf (e, JSV.exception.JSVException)) {
return null;
} else {
throw e;
}
}
return (JSV.common.JSVFileManager.appletDocumentBase == null ? filePath.$replace ('\\', '/') : filePath);
}, "~S");
c$.getTagName = Clazz.defineMethod (c$, "getTagName", 
function (fileName) {
if (fileName == null) return "String" + (++JSV.common.JSVFileManager.stringCount);
if (JSV.common.JSVFileManager.isURL (fileName)) {
try {
if (fileName.startsWith ("http://SIMULATION/")) return JSV.common.JSVFileManager.getAbbrSimulationFileName (fileName);
var name = ( new java.net.URL (Clazz.castNullAs ("java.net.URL"), fileName, null)).getFile ();
return name.substring (name.lastIndexOf ('/') + 1);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}return JSV.common.JSVFileManager.viewer.apiPlatform.newFile (fileName).getName ();
}, "~S");
c$.setDocumentBase = Clazz.defineMethod (c$, "setDocumentBase", 
function (v, documentBase) {
JSV.common.JSVFileManager.viewer = v;
JSV.common.JSVFileManager.appletDocumentBase = documentBase;
}, "JSV.common.JSViewer,java.net.URL");
c$.getSimulationType = Clazz.defineMethod (c$, "getSimulationType", 
function (filePath) {
return (filePath.indexOf ("C13/") >= 0 ? "C13" : "H1");
}, "~S");
Clazz.defineStatics (c$,
"SIMULATION_PROTOCOL", "http://SIMULATION/",
"appletDocumentBase", null,
"viewer", null,
"jsDocumentBase", "");
c$.urlPrefixes = c$.prototype.urlPrefixes =  Clazz.newArray (-1, ["http:", "https:", "ftp:", "http://SIMULATION/", "file:"]);
Clazz.defineStatics (c$,
"URL_LOCAL", 4);
c$.htCorrelationCache = c$.prototype.htCorrelationCache =  new java.util.Hashtable ();
Clazz.defineStatics (c$,
"nciResolver", "https://cactus.nci.nih.gov/chemical/structure/%FILE/file?format=sdf&get3d=True",
"nmrdbServerH1", "https://www.nmrdb.org/tools/jmol/predict.php?POST?molfile=",
"nmrdbServerC13", "https://www.nmrdb.org/service/jsmol13c?POST?molfile=",
"stringCount", 0);
});
