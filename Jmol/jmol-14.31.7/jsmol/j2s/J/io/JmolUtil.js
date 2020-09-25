Clazz.declarePackage ("J.io");
Clazz.load (null, "J.io.JmolUtil", ["java.io.BufferedInputStream", "$.BufferedReader", "java.net.URL", "java.util.Hashtable", "JU.AU", "$.Lst", "$.OC", "$.PT", "$.Rdr", "J.adapter.smarter.AtomSetCollection", "J.api.Interface", "JU.Logger", "JV.FileManager", "$.Viewer"], function () {
c$ = Clazz.declareType (J.io, "JmolUtil");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getImage", 
function (vwr, fullPathNameOrBytes, echoName, forceSync) {
var image = null;
var info = null;
var apiPlatform = vwr.apiPlatform;
var createImage = false;
var fullPathName = "" + fullPathNameOrBytes;
if (Clazz.instanceOf (fullPathNameOrBytes, String)) {
var isBMP = fullPathName.toUpperCase ().endsWith ("BMP");
if (forceSync || fullPathName.indexOf ("|") > 0 || isBMP) {
var ret = vwr.fm.getFileAsBytes (fullPathName, null);
if (!JU.AU.isAB (ret)) return "" + ret;
if (JV.Viewer.isJS) info =  Clazz.newArray (-1, [echoName, fullPathNameOrBytes, ret]);
 else image = apiPlatform.createImage (ret);
} else if (JU.OC.urlTypeIndex (fullPathName) >= 0) {
if (JV.Viewer.isJS) info =  Clazz.newArray (-1, [echoName, fullPathNameOrBytes, null]);
 else try {
image = apiPlatform.createImage ( new java.net.URL (Clazz.castNullAs ("java.net.URL"), fullPathName, null));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return "bad URL: " + fullPathName;
} else {
throw e;
}
}
} else {
createImage = true;
}} else if (JV.Viewer.isJS) {
info =  Clazz.newArray (-1, [echoName, JU.Rdr.guessMimeTypeForBytes (fullPathNameOrBytes), fullPathNameOrBytes]);
} else {
createImage = true;
}if (createImage) image = apiPlatform.createImage ("\1close".equals (fullPathNameOrBytes) ? "\1close" + echoName : fullPathNameOrBytes);
 else if (info != null) image = apiPlatform.createImage (info);
{
return image;
}}, "JV.Viewer,~O,~S,~B");
Clazz.defineMethod (c$, "getAtomSetCollectionOrBufferedReaderFromZip", 
function (vwr, is, fileName, zipDirectory, htParams, subFilePtr, asBufferedReader) {
var adapter = vwr.getModelAdapter ();
var doCombine = (subFilePtr == 1);
htParams.put ("zipSet", fileName);
var subFileList = htParams.get ("subFileList");
if (subFileList == null) subFileList = this.getSpartanSubfiles (zipDirectory);
var subFileName = (subFileList == null || subFilePtr >= subFileList.length ? htParams.get ("SubFileName") : subFileList[subFilePtr]);
if (subFileName != null && (subFileName.startsWith ("/") || subFileName.startsWith ("\\"))) subFileName = subFileName.substring (1);
var selectedFile = 0;
if (subFileName == null && htParams.containsKey ("modelNumber")) {
selectedFile = (htParams.get ("modelNumber")).intValue ();
if (selectedFile > 0 && doCombine) htParams.remove ("modelNumber");
}var manifest = htParams.get ("manifest");
var useFileManifest = (manifest == null);
if (useFileManifest) manifest = (zipDirectory.length > 0 ? zipDirectory[0] : "");
var haveManifest = (manifest.length > 0);
if (haveManifest) {
if (JU.Logger.debugging) JU.Logger.debug ("manifest for  " + fileName + ":\n" + manifest);
}var ignoreErrors = (manifest.indexOf ("IGNORE_ERRORS") >= 0);
var selectAll = (manifest.indexOf ("IGNORE_MANIFEST") >= 0);
var exceptFiles = (manifest.indexOf ("EXCEPT_FILES") >= 0);
if (selectAll || subFileName != null) haveManifest = false;
if (useFileManifest && haveManifest) {
var path = JV.FileManager.getManifestScriptPath (manifest);
if (path != null) {
return "NOTE: file recognized as a script file: " + fileName + path + "\n";
}}var vCollections =  new JU.Lst ();
var htCollections = (haveManifest ?  new java.util.Hashtable () : null);
var nFiles = 0;
try {
var spartanData = (this.isSpartanZip (zipDirectory) ? vwr.fm.spartanUtil ().getData (is, zipDirectory) : null);
var zpt = vwr.getJzt ();
var ret;
if (spartanData != null) {
var reader = JU.Rdr.getBR (spartanData.toString ());
if (asBufferedReader) return reader;
ret = adapter.getAtomSetCollectionFromReader (fileName, reader, htParams);
if (Clazz.instanceOf (ret, String)) return ret;
if (Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollection)) {
var atomSetCollection = ret;
if (atomSetCollection.errorMessage != null) {
if (ignoreErrors) return null;
return atomSetCollection.errorMessage;
}return atomSetCollection;
}if (ignoreErrors) return null;
return "unknown reader error";
}if (Clazz.instanceOf (is, java.io.BufferedInputStream)) is = JU.Rdr.getPngZipStream (is, true);
var zis = zpt.newZipInputStream (is);
var ze;
if (haveManifest) manifest = '|' + manifest.$replace ('\r', '|').$replace ('\n', '|') + '|';
while ((ze = zis.getNextEntry ()) != null && (selectedFile <= 0 || vCollections.size () < selectedFile)) {
if (ze.isDirectory ()) continue;
var thisEntry = ze.getName ();
if (subFileName != null && !thisEntry.equals (subFileName)) continue;
if (subFileName != null) htParams.put ("subFileName", subFileName);
if (thisEntry.startsWith ("JmolManifest") || haveManifest && exceptFiles == manifest.indexOf ("|" + thisEntry + "|") >= 0) continue;
var bytes = JU.Rdr.getLimitedStreamBytes (zis, ze.getSize ());
if (JU.Rdr.isGzipB (bytes)) bytes = JU.Rdr.getLimitedStreamBytes (zpt.getUnGzippedInputStream (bytes), -1);
if (JU.Rdr.isZipB (bytes) || JU.Rdr.isPngZipB (bytes)) {
var bis = JU.Rdr.getBIS (bytes);
var zipDir2 = zpt.getZipDirectoryAndClose (bis, "JmolManifest");
bis = JU.Rdr.getBIS (bytes);
var atomSetCollections = this.getAtomSetCollectionOrBufferedReaderFromZip (vwr, bis, fileName + "|" + thisEntry, zipDir2, htParams, ++subFilePtr, asBufferedReader);
if (Clazz.instanceOf (atomSetCollections, String)) {
if (ignoreErrors) continue;
return atomSetCollections;
} else if (Clazz.instanceOf (atomSetCollections, J.adapter.smarter.AtomSetCollection) || Clazz.instanceOf (atomSetCollections, JU.Lst)) {
if (haveManifest && !exceptFiles) htCollections.put (thisEntry, atomSetCollections);
 else vCollections.addLast (atomSetCollections);
} else if (Clazz.instanceOf (atomSetCollections, java.io.BufferedReader)) {
if (doCombine) zis.close ();
return atomSetCollections;
} else {
if (ignoreErrors) continue;
zis.close ();
return "unknown zip reader error";
}} else if (JU.Rdr.isPickleB (bytes)) {
var bis = JU.Rdr.getBIS (bytes);
if (doCombine) zis.close ();
return bis;
} else {
var sData;
if (JU.Rdr.isCompoundDocumentB (bytes)) {
var jd = J.api.Interface.getInterface ("JU.CompoundDocument", vwr, "file");
jd.setDocStream (zpt, JU.Rdr.getBIS (bytes));
sData = jd.getAllDataFiles ("Molecule", "Input").toString ();
} else {
sData = JU.Rdr.fixUTF (bytes);
}var reader = JU.Rdr.getBR (sData);
if (asBufferedReader) {
if (doCombine) zis.close ();
return reader;
}var fname = fileName + "|" + ze.getName ();
ret = adapter.getAtomSetCollectionFromReader (fname, reader, htParams);
if (!(Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollection))) {
if (ignoreErrors) continue;
zis.close ();
return "" + ret;
}if (haveManifest && !exceptFiles) htCollections.put (thisEntry, ret);
 else vCollections.addLast (ret);
var a = ret;
if (a.errorMessage != null) {
if (ignoreErrors) continue;
zis.close ();
return a.errorMessage;
}}}
if (doCombine) zis.close ();
if (haveManifest && !exceptFiles) {
var list = JU.PT.split (manifest, "|");
for (var i = 0; i < list.length; i++) {
var file = list[i];
if (file.length == 0 || file.indexOf ("#") == 0) continue;
if (htCollections.containsKey (file)) vCollections.addLast (htCollections.get (file));
 else if (JU.Logger.debugging) JU.Logger.debug ("manifested file " + file + " was not found in " + fileName);
}
}if (!doCombine) return vCollections;
var result = (vCollections.size () == 1 && Clazz.instanceOf (vCollections.get (0), J.adapter.smarter.AtomSetCollection) ? vCollections.get (0) :  new J.adapter.smarter.AtomSetCollection ("Array", null, null, vCollections));
if (result.errorMessage != null) {
if (ignoreErrors) return null;
return result.errorMessage;
}if (nFiles == 1) selectedFile = 1;
if (selectedFile > 0 && selectedFile <= vCollections.size ()) return vCollections.get (selectedFile - 1);
return result;
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
if (ignoreErrors) return null;
JU.Logger.error ("" + e);
return "" + e;
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
JU.Logger.errorEx (null, er);
return "" + er;
}
} else {
throw e$$;
}
}
}, "JV.Viewer,java.io.InputStream,~S,~A,java.util.Map,~N,~B");
Clazz.defineMethod (c$, "getCachedPngjBytes", 
function (fm, pathName) {
if (pathName.startsWith ("file:///")) pathName = "file:" + pathName.substring (7);
JU.Logger.info ("JmolUtil checking PNGJ cache for " + pathName);
var shortName = this.shortSceneFilename (pathName);
if (fm.pngjCache == null && !this.clearAndCachePngjFile (fm,  Clazz.newArray (-1, [pathName, null]))) return null;
var cache = fm.pngjCache;
var isMin = (pathName.indexOf (".min.") >= 0);
if (!isMin) {
var cName = fm.getCanonicalName (JU.Rdr.getZipRoot (pathName));
if (!cache.containsKey (cName) && !this.clearAndCachePngjFile (fm,  Clazz.newArray (-1, [pathName, null]))) return null;
if (pathName.indexOf ("|") < 0) shortName = cName;
}if (cache.containsKey (shortName)) {
JU.Logger.info ("FileManager using memory cache " + shortName);
return fm.pngjCache.get (shortName);
}if (!isMin || !this.clearAndCachePngjFile (fm,  Clazz.newArray (-1, [pathName, null]))) return null;
JU.Logger.info ("FileManager using memory cache " + shortName);
return cache.get (shortName);
}, "JV.FileManager,~S");
Clazz.defineMethod (c$, "clearAndCachePngjFile", 
 function (fm, data) {
fm.pngjCache =  new java.util.Hashtable ();
if (data == null || data[0] == null) return false;
data[0] = JU.Rdr.getZipRoot (data[0]);
var shortName = this.shortSceneFilename (data[0]);
var cache = fm.pngjCache;
try {
data[1] = fm.vwr.getJzt ().cacheZipContents (JU.Rdr.getPngZipStream (fm.getBufferedInputStreamOrErrorMessageFromName (data[0], null, false, false, null, false, true), true), shortName, cache, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
if (data[1] == null) return false;
var bytes = data[1].getBytes ();
cache.put (fm.getCanonicalName (data[0]), bytes);
if (shortName.indexOf ("_scene_") >= 0) {
cache.put (this.shortSceneFilename (data[0]), bytes);
bytes = cache.remove (shortName + "|state.spt");
if (bytes != null) cache.put (this.shortSceneFilename (data[0] + "|state.spt"), bytes);
}return true;
}, "JV.FileManager,~A");
Clazz.defineMethod (c$, "shortSceneFilename", 
 function (pathName) {
var pt = pathName.indexOf ("_scene_") + 7;
if (pt < 7) return pathName;
var s = "";
if (pathName.endsWith ("|state.spt")) {
var pt1 = pathName.indexOf ('.', pt);
if (pt1 < 0) return pathName;
s = pathName.substring (pt, pt1);
}var pt2 = pathName.lastIndexOf ("|");
return pathName.substring (0, pt) + s + (pt2 > 0 ? pathName.substring (pt2) : "");
}, "~S");
Clazz.defineMethod (c$, "getSpartanSubfiles", 
 function (zipDirectory) {
var name = (zipDirectory.length < 2 ? null : zipDirectory[1]);
return (name == null || zipDirectory.length != 2 || !name.endsWith (".spardir/") ? null :  Clazz.newArray (-1, ["", JU.PT.trim (name, "/")]));
}, "~A");
Clazz.defineMethod (c$, "isSpartanZip", 
 function (zipDirectory) {
for (var i = 1; i < zipDirectory.length; i++) if (zipDirectory[i].endsWith (".spardir/") || zipDirectory[i].indexOf ("_spartandir") >= 0) return true;

return false;
}, "~A");
});
