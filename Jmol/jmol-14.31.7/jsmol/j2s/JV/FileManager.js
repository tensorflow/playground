Clazz.declarePackage ("JV");
Clazz.load (["javajs.api.BytePoster", "java.util.Hashtable"], "JV.FileManager", ["java.io.BufferedInputStream", "$.BufferedReader", "java.lang.Boolean", "java.net.URL", "$.URLEncoder", "java.util.Map", "JU.AU", "$.BArray", "$.Base64", "$.LimitedLineReader", "$.Lst", "$.OC", "$.PT", "$.Rdr", "$.SB", "J.api.Interface", "J.io.FileReader", "JS.SV", "JU.Logger", "JV.JC", "$.JmolAsyncException", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.spartanDoc = null;
this.jzu = null;
this.pathForAllFiles = "";
this.nameAsGiven = "zapped";
this.fullPathName = null;
this.lastFullPathName = null;
this.lastNameAsGiven = "zapped";
this.fileName = null;
this.appletDocumentBaseURL = null;
this.appletProxy = null;
this.cache = null;
this.pngjCache = null;
this.spardirCache = null;
Clazz.instantialize (this, arguments);
}, JV, "FileManager", null, javajs.api.BytePoster);
Clazz.prepareFields (c$, function () {
this.cache =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (vwr) {
this.vwr = vwr;
this.clear ();
}, "JV.Viewer");
Clazz.defineMethod (c$, "spartanUtil", 
function () {
return (this.spartanDoc == null ? this.spartanDoc = (J.api.Interface.getInterface ("J.adapter.readers.spartan.SpartanUtil", this.vwr, "fm getSpartanUtil()")).set (this) : this.spartanDoc);
});
Clazz.defineMethod (c$, "getJzu", 
function () {
return (this.jzu == null ? this.jzu = J.api.Interface.getOption ("io.JmolUtil", this.vwr, "file") : this.jzu);
});
Clazz.defineMethod (c$, "clear", 
function () {
this.setFileInfo ( Clazz.newArray (-1, [this.vwr.getZapName ()]));
this.spardirCache = null;
});
Clazz.defineMethod (c$, "setLoadState", 
 function (htParams) {
if (this.vwr.getPreserveState ()) {
htParams.put ("loadState", this.vwr.g.getLoadState (htParams));
}}, "java.util.Map");
Clazz.defineMethod (c$, "getPathForAllFiles", 
function () {
return this.pathForAllFiles;
});
Clazz.defineMethod (c$, "setPathForAllFiles", 
function (value) {
if (value.length > 0 && !value.endsWith ("/") && !value.endsWith ("|")) value += "/";
return this.pathForAllFiles = value;
}, "~S");
Clazz.defineMethod (c$, "setFileInfo", 
function (fileInfo) {
if (fileInfo == null) {
this.fullPathName = this.lastFullPathName;
this.nameAsGiven = this.lastNameAsGiven;
return;
}this.fullPathName = fileInfo[0];
this.fileName = fileInfo[Math.min (1, fileInfo.length - 1)];
this.nameAsGiven = fileInfo[Math.min (2, fileInfo.length - 1)];
if (!this.nameAsGiven.equals ("zapped")) {
this.lastNameAsGiven = this.nameAsGiven;
this.lastFullPathName = this.fullPathName;
}}, "~A");
Clazz.defineMethod (c$, "getFileInfo", 
function () {
return  Clazz.newArray (-1, [this.fullPathName, this.fileName, this.nameAsGiven]);
});
Clazz.defineMethod (c$, "getFullPathName", 
function (orPrevious) {
var f = (this.fullPathName != null ? this.fullPathName : this.nameAsGiven);
return (!orPrevious || !f.equals ("zapped") ? f : this.lastFullPathName != null ? this.lastFullPathName : this.lastNameAsGiven);
}, "~B");
Clazz.defineMethod (c$, "getFileName", 
function () {
return this.fileName != null ? this.fileName : this.nameAsGiven;
});
Clazz.defineMethod (c$, "getAppletDocumentBase", 
function () {
return (this.appletDocumentBaseURL == null ? "" : this.appletDocumentBaseURL.toString ());
});
Clazz.defineMethod (c$, "setAppletContext", 
function (documentBase) {
try {
System.out.println ("setting document base to \"" + documentBase + "\"");
this.appletDocumentBaseURL = (documentBase.length == 0 ? null :  new java.net.URL (Clazz.castNullAs ("java.net.URL"), documentBase, null));
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
System.out.println ("error setting document base to " + documentBase);
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "setAppletProxy", 
function (appletProxy) {
this.appletProxy = (appletProxy == null || appletProxy.length == 0 ? null : appletProxy);
}, "~S");
Clazz.defineMethod (c$, "createAtomSetCollectionFromFile", 
function (name, htParams, isAppend) {
if (htParams.get ("atomDataOnly") == null) this.setLoadState (htParams);
var name0 = name;
name = this.vwr.resolveDatabaseFormat (name);
if (!name0.equals (name) && name0.indexOf ("/") < 0 && JV.Viewer.hasDatabasePrefix (name0)) {
htParams.put ("dbName", name0);
}if (name.endsWith ("%2D%")) {
var filter = htParams.get ("filter");
htParams.put ("filter", (filter == null ? "" : filter) + "2D");
name = name.substring (0, name.length - 4);
}var pt = name.indexOf ("::");
var nameAsGiven = (pt >= 0 ? name.substring (pt + 2) : name);
var fileType = (pt >= 0 ? name.substring (0, pt) : null);
JU.Logger.info ("\nFileManager.getAtomSetCollectionFromFile(" + nameAsGiven + ")" + (name.equals (nameAsGiven) ? "" : " //" + name));
var names = this.getClassifiedName (nameAsGiven, true);
if (names.length == 1) return names[0];
var fullPathName = names[0];
var fileName = names[1];
htParams.put ("fullPathName", (fileType == null ? "" : fileType + "::") + JV.FileManager.fixDOSName (fullPathName));
if (this.vwr.getBoolean (603979879) && this.vwr.getBoolean (603979825)) this.vwr.getChimeMessenger ().update (fullPathName);
var fileReader =  new J.io.FileReader (this.vwr, fileName, fullPathName, nameAsGiven, fileType, null, htParams, isAppend);
fileReader.run ();
return fileReader.getAtomSetCollection ();
}, "~S,java.util.Map,~B");
Clazz.defineMethod (c$, "createAtomSetCollectionFromFiles", 
function (fileNames, htParams, isAppend) {
this.setLoadState (htParams);
var fullPathNames =  new Array (fileNames.length);
var namesAsGiven =  new Array (fileNames.length);
var fileTypes =  new Array (fileNames.length);
for (var i = 0; i < fileNames.length; i++) {
var pt = fileNames[i].indexOf ("::");
var nameAsGiven = (pt >= 0 ? fileNames[i].substring (pt + 2) : fileNames[i]);
System.out.println (i + " FM " + nameAsGiven);
var fileType = (pt >= 0 ? fileNames[i].substring (0, pt) : null);
var names = this.getClassifiedName (nameAsGiven, true);
if (names.length == 1) return names[0];
fullPathNames[i] = names[0];
fileNames[i] = JV.FileManager.fixDOSName (names[0]);
fileTypes[i] = fileType;
namesAsGiven[i] = nameAsGiven;
}
htParams.put ("fullPathNames", fullPathNames);
htParams.put ("fileTypes", fileTypes);
var filesReader = this.newFilesReader (fullPathNames, namesAsGiven, fileTypes, null, htParams, isAppend);
filesReader.run ();
return filesReader.getAtomSetCollection ();
}, "~A,java.util.Map,~B");
Clazz.defineMethod (c$, "createAtomSetCollectionFromString", 
function (strModel, htParams, isAppend) {
this.setLoadState (htParams);
var isAddH = (strModel.indexOf ("Viewer.AddHydrogens") >= 0);
var fnames = (isAddH ? this.getFileInfo () : null);
var fileReader =  new J.io.FileReader (this.vwr, "string", null, null, null, JU.Rdr.getBR (strModel), htParams, isAppend);
fileReader.run ();
if (fnames != null) this.setFileInfo (fnames);
if (!isAppend && !(Clazz.instanceOf (fileReader.getAtomSetCollection (), String))) {
this.setFileInfo ( Clazz.newArray (-1, [strModel === "5\n\nC 0 0 0\nH .63 .63 .63\nH -.63 -.63 .63\nH -.63 .63 -.63\nH .63 -.63 -.63" ? "Jmol Model Kit" : "string"]));
}return fileReader.getAtomSetCollection ();
}, "~S,java.util.Map,~B");
Clazz.defineMethod (c$, "createAtomSeCollectionFromStrings", 
function (arrayModels, loadScript, htParams, isAppend) {
if (!htParams.containsKey ("isData")) {
var oldSep = "\"" + this.vwr.getDataSeparator () + "\"";
var tag = "\"" + (isAppend ? "append" : "model") + " inline\"";
var sb =  new JU.SB ();
sb.append ("set dataSeparator \"~~~next file~~~\";\ndata ").append (tag);
for (var i = 0; i < arrayModels.length; i++) {
if (i > 0) sb.append ("~~~next file~~~");
sb.append (arrayModels[i]);
}
sb.append ("end ").append (tag).append (";set dataSeparator ").append (oldSep);
loadScript.appendSB (sb);
}this.setLoadState (htParams);
JU.Logger.info ("FileManager.getAtomSetCollectionFromStrings(string[])");
var fullPathNames =  new Array (arrayModels.length);
var readers =  new Array (arrayModels.length);
for (var i = 0; i < arrayModels.length; i++) {
fullPathNames[i] = "string[" + i + "]";
readers[i] = JV.FileManager.newDataReader (this.vwr, arrayModels[i]);
}
var filesReader = this.newFilesReader (fullPathNames, fullPathNames, null, readers, htParams, isAppend);
filesReader.run ();
return filesReader.getAtomSetCollection ();
}, "~A,JU.SB,java.util.Map,~B");
Clazz.defineMethod (c$, "createAtomSeCollectionFromArrayData", 
function (arrayData, htParams, isAppend) {
JU.Logger.info ("FileManager.getAtomSetCollectionFromArrayData(Vector)");
var nModels = arrayData.size ();
var fullPathNames =  new Array (nModels);
var readers =  new Array (nModels);
for (var i = 0; i < nModels; i++) {
fullPathNames[i] = "String[" + i + "]";
readers[i] = JV.FileManager.newDataReader (this.vwr, arrayData.get (i));
}
var filesReader = this.newFilesReader (fullPathNames, fullPathNames, null, readers, htParams, isAppend);
filesReader.run ();
return filesReader.getAtomSetCollection ();
}, "JU.Lst,java.util.Map,~B");
c$.newDataReader = Clazz.defineMethod (c$, "newDataReader", 
function (vwr, data) {
var reader = (Clazz.instanceOf (data, String) ? "String" : JU.AU.isAS (data) ? "Array" : Clazz.instanceOf (data, JU.Lst) ? "List" : null);
if (reader == null) return null;
var dr = J.api.Interface.getInterface ("JU." + reader + "DataReader", vwr, "file");
return dr.setData (data);
}, "JV.Viewer,~O");
Clazz.defineMethod (c$, "newFilesReader", 
 function (fullPathNames, namesAsGiven, fileTypes, readers, htParams, isAppend) {
var fr = J.api.Interface.getOption ("io.FilesReader", this.vwr, "file");
fr.set (this, this.vwr, fullPathNames, namesAsGiven, fileTypes, readers, htParams, isAppend);
return fr;
}, "~A,~A,~A,~A,java.util.Map,~B");
Clazz.defineMethod (c$, "createAtomSetCollectionFromDOM", 
function (DOMNode, htParams) {
var aDOMReader = J.api.Interface.getOption ("io.DOMReader", this.vwr, "file");
aDOMReader.set (this, this.vwr, DOMNode, htParams);
aDOMReader.run ();
return aDOMReader.getAtomSetCollection ();
}, "~O,java.util.Map");
Clazz.defineMethod (c$, "createAtomSetCollectionFromReader", 
function (fullPathName, name, reader, htParams) {
var fileReader =  new J.io.FileReader (this.vwr, name, fullPathName, null, null, reader, htParams, false);
fileReader.run ();
return fileReader.getAtomSetCollection ();
}, "~S,~S,~O,java.util.Map");
Clazz.defineMethod (c$, "getBufferedInputStream", 
function (fullPathName) {
var ret = this.getBufferedReaderOrErrorMessageFromName (fullPathName,  new Array (2), true, true);
return (Clazz.instanceOf (ret, java.io.BufferedInputStream) ? ret : null);
}, "~S");
Clazz.defineMethod (c$, "getBufferedInputStreamOrErrorMessageFromName", 
function (name, fullName, showMsg, checkOnly, outputBytes, allowReader, allowCached) {
var bis = null;
var ret = null;
var errorMessage = null;
var cacheBytes = (allowCached && outputBytes == null ? cacheBytes = this.getPngjOrDroppedBytes (fullName, name) : null);
try {
if (allowCached && name.indexOf (".png") >= 0 && this.pngjCache == null && !this.vwr.getBoolean (603979960)) this.pngjCache =  new java.util.Hashtable ();
if (cacheBytes == null) {
var isPngjBinaryPost = (name.indexOf ("?POST?_PNGJBIN_") >= 0);
var isPngjPost = (isPngjBinaryPost || name.indexOf ("?POST?_PNGJ_") >= 0);
if (name.indexOf ("?POST?_PNG_") > 0 || isPngjPost) {
var errMsg =  new Array (1);
var bytes = this.vwr.getImageAsBytes (isPngjPost ? "PNGJ" : "PNG", 0, 0, -1, errMsg);
if (errMsg[0] != null) return errMsg[0];
if (isPngjBinaryPost) {
outputBytes = bytes;
name = JU.PT.rep (name, "?_", "=_");
} else {
name =  new JU.SB ().append (name).append ("=").appendSB (JU.Base64.getBase64 (bytes)).toString ();
}}var iurl = JU.OC.urlTypeIndex (name);
var isURL = (iurl >= 0);
var post = null;
if (isURL && (iurl = name.indexOf ("?POST?")) >= 0) {
post = name.substring (iurl + 6);
name = name.substring (0, iurl);
}var isApplet = (this.appletDocumentBaseURL != null);
if (isApplet || isURL) {
if (isApplet && isURL && this.appletProxy != null) name = this.appletProxy + "?url=" + this.urlEncode (name);
var url = (isApplet ?  new java.net.URL (this.appletDocumentBaseURL, name, null) :  new java.net.URL (Clazz.castNullAs ("java.net.URL"), name, null));
if (checkOnly) return null;
name = url.toString ();
if (showMsg && name.toLowerCase ().indexOf ("password") < 0) JU.Logger.info ("FileManager opening url " + name);
ret = this.vwr.apiPlatform.getURLContents (url, outputBytes, post, false);
var bytes = null;
if (Clazz.instanceOf (ret, JU.SB)) {
var sb = ret;
if (allowReader && !JU.Rdr.isBase64 (sb)) return JU.Rdr.getBR (sb.toString ());
bytes = JU.Rdr.getBytesFromSB (sb);
} else if (JU.AU.isAB (ret)) {
bytes = ret;
}if (bytes != null) ret = JU.Rdr.getBIS (bytes);
} else if (!allowCached || (cacheBytes = this.cacheGet (name, true)) == null) {
if (showMsg) JU.Logger.info ("FileManager opening file " + name);
ret = this.vwr.apiPlatform.getBufferedFileInputStream (name);
}if (Clazz.instanceOf (ret, String)) return ret;
}bis = (cacheBytes == null ? ret : JU.Rdr.getBIS (cacheBytes));
if (checkOnly) {
bis.close ();
bis = null;
}return bis;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
try {
if (bis != null) bis.close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
errorMessage = "" + e;
} else {
throw e;
}
}
return errorMessage;
}, "~S,~S,~B,~B,~A,~B,~B");
c$.getBufferedReaderForResource = Clazz.defineMethod (c$, "getBufferedReaderForResource", 
function (vwr, resourceClass, classPath, resourceName) {
var url;
{
}resourceName = (url == null ? vwr.vwrOptions.get ("codePath") + classPath + resourceName : url.getFile ());
if (vwr.async) {
var bytes = vwr.fm.cacheGet (resourceName, false);
if (bytes == null) throw  new JV.JmolAsyncException (resourceName);
return JU.Rdr.getBufferedReader (JU.Rdr.getBIS (bytes), null);
}return vwr.fm.getBufferedReaderOrErrorMessageFromName (resourceName,  Clazz.newArray (-1, [null, null]), false, true);
}, "JV.Viewer,~O,~S,~S");
Clazz.defineMethod (c$, "urlEncode", 
 function (name) {
try {
return java.net.URLEncoder.encode (name, "utf-8");
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
return name;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "getEmbeddedFileState", 
function (fileName, allowCached, sptName) {
var dir = this.getZipDirectory (fileName, false, allowCached);
if (dir.length == 0) {
var state = this.vwr.getFileAsString4 (fileName, -1, false, true, false, "file");
return (state.indexOf ("**** Jmol Embedded Script ****") < 0 ? "" : JV.FileManager.getEmbeddedScript (state));
}for (var i = 0; i < dir.length; i++) if (dir[i].indexOf (sptName) >= 0) {
var data =  Clazz.newArray (-1, [fileName + "|" + dir[i], null]);
this.getFileDataAsString (data, -1, false, false, false);
return data[1];
}
return "";
}, "~S,~B,~S");
Clazz.defineMethod (c$, "getFullPathNameOrError", 
function (filename, getStream, ret) {
var names = this.getClassifiedName (JV.JC.fixProtocol (filename), true);
if (names == null || names[0] == null || names.length < 2) return  Clazz.newArray (-1, [null, "cannot read file name: " + filename]);
var name = names[0];
var fullPath = JV.FileManager.fixDOSName (names[0]);
name = JU.Rdr.getZipRoot (name);
var errMsg = this.getBufferedInputStreamOrErrorMessageFromName (name, fullPath, false, !getStream, null, false, !getStream);
ret[0] = fullPath;
if (Clazz.instanceOf (errMsg, String)) ret[1] = errMsg;
return errMsg;
}, "~S,~B,~A");
Clazz.defineMethod (c$, "getBufferedReaderOrErrorMessageFromName", 
function (name, fullPathNameReturn, isBinary, doSpecialLoad) {
name = JV.JC.fixProtocol (name);
var data = this.cacheGet (name, false);
var isBytes = JU.AU.isAB (data);
var bytes = (isBytes ? data : null);
if (name.startsWith ("cache://")) {
if (data == null) return "cannot read " + name;
if (isBytes) {
bytes = data;
} else {
return JU.Rdr.getBR (data);
}}var names = this.getClassifiedName (name, true);
if (names == null) return "cannot read file name: " + name;
if (fullPathNameReturn != null) fullPathNameReturn[0] = JV.FileManager.fixDOSName (names[0]);
return this.getUnzippedReaderOrStreamFromName (names[0], bytes, false, isBinary, false, doSpecialLoad, null);
}, "~S,~A,~B,~B");
Clazz.defineMethod (c$, "getUnzippedReaderOrStreamFromName", 
function (name, bytesOrStream, allowZipStream, forceInputStream, isTypeCheckOnly, doSpecialLoad, htParams) {
if (doSpecialLoad && bytesOrStream == null) {
var o = (name.endsWith (".spt") ?  Clazz.newArray (-1, [null, null, null]) : name.indexOf (".spardir") < 0 ? null : this.spartanUtil ().getFileList (name, isTypeCheckOnly));
if (o != null) return o;
}name = JV.JC.fixProtocol (name);
if (bytesOrStream == null && (bytesOrStream = this.getCachedPngjBytes (name)) != null && htParams != null) htParams.put ("sourcePNGJ", Boolean.TRUE);
name = name.$replace ("#_DOCACHE_", "");
var fullName = name;
var subFileList = null;
if (name.indexOf ("|") >= 0) {
subFileList = JU.PT.split (name.$replace ('\\', '/'), "|");
if (bytesOrStream == null) JU.Logger.info ("FileManager opening zip " + name);
name = subFileList[0];
}var t = (bytesOrStream == null ? this.getBufferedInputStreamOrErrorMessageFromName (name, fullName, true, false, null, !forceInputStream, true) : JU.AU.isAB (bytesOrStream) ? JU.Rdr.getBIS (bytesOrStream) : bytesOrStream);
try {
if (Clazz.instanceOf (t, String) || Clazz.instanceOf (t, java.io.BufferedReader)) return t;
var bis = t;
if (JU.Rdr.isGzipS (bis)) bis = JU.Rdr.getUnzippedInputStream (this.vwr.getJzt (), bis);
 else if (JU.Rdr.isBZip2S (bis)) bis = JU.Rdr.getUnzippedInputStreamBZip2 (this.vwr.getJzt (), bis);
if (forceInputStream && subFileList == null) return bis;
if (JU.Rdr.isCompoundDocumentS (bis)) {
var doc = J.api.Interface.getInterface ("JU.CompoundDocument", this.vwr, "file");
doc.setDocStream (this.vwr.getJzt (), bis);
var s = doc.getAllDataFiles ("Molecule", "Input").toString ();
return (forceInputStream ? JU.Rdr.getBIS (s.getBytes ()) : JU.Rdr.getBR (s));
}if (JU.Rdr.isMessagePackS (bis) || JU.Rdr.isPickleS (bis)) return bis;
bis = JU.Rdr.getPngZipStream (bis, true);
if (JU.Rdr.isZipS (bis)) {
if (allowZipStream) return this.vwr.getJzt ().newZipInputStream (bis);
var o = this.vwr.getJzt ().getZipFileDirectory (bis, subFileList, 1, forceInputStream);
return (Clazz.instanceOf (o, String) ? JU.Rdr.getBR (o) : o);
}return (forceInputStream ? bis : JU.Rdr.getBufferedReader (bis, null));
} catch (ioe) {
if (Clazz.exceptionOf (ioe, Exception)) {
return ioe.toString ();
} else {
throw ioe;
}
}
}, "~S,~O,~B,~B,~B,~B,java.util.Map");
Clazz.defineMethod (c$, "getZipDirectory", 
function (fileName, addManifest, allowCached) {
var t = this.getBufferedInputStreamOrErrorMessageFromName (fileName, fileName, false, false, null, false, allowCached);
return this.vwr.getJzt ().getZipDirectoryAndClose (t, addManifest ? "JmolManifest" : null);
}, "~S,~B,~B");
Clazz.defineMethod (c$, "getFileAsBytes", 
function (name, out) {
if (name == null) return null;
var fullName = name;
var subFileList = null;
if (name.indexOf ("|") >= 0) {
subFileList = JU.PT.split (name, "|");
name = subFileList[0];
}var bytes = (subFileList == null ? null : this.getPngjOrDroppedBytes (fullName, name));
if (bytes == null) {
var t = this.getBufferedInputStreamOrErrorMessageFromName (name, fullName, false, false, null, false, true);
if (Clazz.instanceOf (t, String)) return "Error:" + t;
try {
var bis = t;
bytes = (out != null || subFileList == null || subFileList.length <= 1 || !JU.Rdr.isZipS (bis) && !JU.Rdr.isPngZipStream (bis) ? JU.Rdr.getStreamAsBytes (bis, out) : this.vwr.getJzt ().getZipFileContentsAsBytes (bis, subFileList, 1));
bis.close ();
} catch (ioe) {
if (Clazz.exceptionOf (ioe, Exception)) {
return ioe.toString ();
} else {
throw ioe;
}
}
}if (out == null || !JU.AU.isAB (bytes)) return bytes;
out.write (bytes, 0, -1);
return (bytes).length + " bytes";
}, "~S,JU.OC");
Clazz.defineMethod (c$, "getFileAsMap", 
function (name, type) {
var bdata =  new java.util.Hashtable ();
var t;
if (name == null) {
var errMsg =  new Array (1);
var bytes = this.vwr.getImageAsBytes (type, -1, -1, -1, errMsg);
if (errMsg[0] != null) {
bdata.put ("_ERROR_", errMsg[0]);
return bdata;
}t = JU.Rdr.getBIS (bytes);
} else {
var data =  new Array (2);
t = this.getFullPathNameOrError (name, true, data);
if (Clazz.instanceOf (t, String)) {
bdata.put ("_ERROR_", t);
return bdata;
}if (!this.checkSecurity (data[0])) {
bdata.put ("_ERROR_", "java.io. Security exception: cannot read file " + data[0]);
return bdata;
}}try {
this.vwr.getJzt ().readFileAsMap (t, bdata, name);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
bdata.clear ();
bdata.put ("_ERROR_", "" + e);
} else {
throw e;
}
}
return bdata;
}, "~S,~S");
Clazz.defineMethod (c$, "getFileDataAsString", 
function (data, nBytesMax, doSpecialLoad, allowBinary, checkProtected) {
data[1] = "";
var name = data[0];
if (name == null) return false;
var t = this.getBufferedReaderOrErrorMessageFromName (name, data, false, doSpecialLoad);
if (Clazz.instanceOf (t, String)) {
data[1] = t;
return false;
}if (checkProtected && !this.checkSecurity (data[0])) {
data[1] = "java.io. Security exception: cannot read file " + data[0];
return false;
}try {
return JU.Rdr.readAllAsString (t, nBytesMax, allowBinary, data, 1);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
}, "~A,~N,~B,~B,~B");
Clazz.defineMethod (c$, "checkSecurity", 
 function (f) {
if (!f.startsWith ("file:")) return true;
var pt = f.lastIndexOf ('/');
if (f.lastIndexOf (":/") == pt - 1 || f.indexOf ("/.") >= 0 || f.lastIndexOf ('.') < f.lastIndexOf ('/')) return false;
return true;
}, "~S");
Clazz.defineMethod (c$, "loadImage", 
function (nameOrBytes, echoName, forceSync) {
var image = null;
var nameOrError = null;
var bytes = null;
var isPopupImage = (echoName != null && echoName.startsWith ("\1"));
if (isPopupImage) {
if (echoName.equals ("\1closeall\1null")) return this.vwr.loadImageData (Boolean.TRUE, "\1closeall", "\1closeall", null);
if ("\1close".equals (nameOrBytes)) return this.vwr.loadImageData (Boolean.FALSE, "\1close", echoName, null);
}if (Clazz.instanceOf (nameOrBytes, java.util.Map)) {
nameOrBytes = ((nameOrBytes).containsKey ("_DATA_") ? (nameOrBytes).get ("_DATA_") : (nameOrBytes).get ("_IMAGE_"));
}if (Clazz.instanceOf (nameOrBytes, JS.SV)) nameOrBytes = (nameOrBytes).value;
var name = (Clazz.instanceOf (nameOrBytes, String) ? nameOrBytes : null);
var isAsynchronous = false;
if (name != null && name.startsWith (";base64,")) {
bytes = JU.Base64.decodeBase64 (name);
} else if (Clazz.instanceOf (nameOrBytes, JU.BArray)) {
bytes = (nameOrBytes).data;
} else if (echoName == null || Clazz.instanceOf (nameOrBytes, String)) {
var names = this.getClassifiedName (nameOrBytes, true);
nameOrError = (names == null ? "cannot read file name: " + nameOrBytes : JV.FileManager.fixDOSName (names[0]));
if (names != null) image = this.getJzu ().getImage (this.vwr, nameOrError, echoName, forceSync);
isAsynchronous = (image == null);
} else {
image = nameOrBytes;
}if (bytes != null) {
image = this.getJzu ().getImage (this.vwr, bytes, echoName, true);
isAsynchronous = false;
}if (Clazz.instanceOf (image, String)) {
nameOrError = image;
image = null;
}if (!JV.Viewer.isJS && image != null && bytes != null) nameOrError = ";base64," + JU.Base64.getBase64 (bytes).toString ();
if (!JV.Viewer.isJS || isPopupImage && nameOrError == null || !isPopupImage && image != null) return this.vwr.loadImageData (image, nameOrError, echoName, null);
return isAsynchronous;
}, "~O,~S,~B");
Clazz.defineMethod (c$, "getClassifiedName", 
 function (name, isFullLoad) {
if (name == null) return  Clazz.newArray (-1, [null]);
var doSetPathForAllFiles = (this.pathForAllFiles.length > 0);
if (name.startsWith ("?") || name.startsWith ("http://?") || name.startsWith ("https://?")) {
if (!JV.Viewer.isJS && (name = this.vwr.dialogAsk ("Load", name, null)) == null) return  Clazz.newArray (-1, [isFullLoad ? "#CANCELED#" : null]);
doSetPathForAllFiles = false;
}var file = null;
var url = null;
var names = null;
if (name.startsWith ("cache://")) {
names =  new Array (3);
names[0] = names[2] = name;
names[1] = JV.FileManager.stripPath (names[0]);
return names;
}name = this.vwr.resolveDatabaseFormat (name);
if (name.indexOf (":") < 0 && name.indexOf ("/") != 0) name = JV.FileManager.addDirectory (this.vwr.getDefaultDirectory (), name);
if (this.appletDocumentBaseURL == null) {
if (JU.OC.urlTypeIndex (name) >= 0 || this.vwr.haveAccess (JV.Viewer.ACCESS.NONE) || this.vwr.haveAccess (JV.Viewer.ACCESS.READSPT) && !name.endsWith (".spt") && !name.endsWith ("/")) {
try {
url =  new java.net.URL (Clazz.castNullAs ("java.net.URL"), name, null);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return  Clazz.newArray (-1, [isFullLoad ? e.toString () : null]);
} else {
throw e;
}
}
} else {
file = this.vwr.apiPlatform.newFile (name);
var s = file.getFullPath ();
var fname = file.getName ();
names =  Clazz.newArray (-1, [(s == null ? fname : s), fname, (s == null ? fname : "file:/" + s.$replace ('\\', '/'))]);
}} else {
try {
if (name.indexOf (":\\") == 1 || name.indexOf (":/") == 1) name = "file:/" + name;
url =  new java.net.URL (this.appletDocumentBaseURL, name, null);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return  Clazz.newArray (-1, [isFullLoad ? e.toString () : null]);
} else {
throw e;
}
}
}if (url != null) {
names =  new Array (3);
names[0] = names[2] = url.toString ();
names[1] = JV.FileManager.stripPath (names[0]);
}if (doSetPathForAllFiles) {
var name0 = names[0];
names[0] = this.pathForAllFiles + names[1];
JU.Logger.info ("FileManager substituting " + name0 + " --> " + names[0]);
}if (isFullLoad && (file != null || JU.OC.urlTypeIndex (names[0]) == 5)) {
var path = (file == null ? JU.PT.trim (names[0].substring (5), "/") : names[0]);
var pt = path.length - names[1].length - 1;
if (pt > 0) {
path = path.substring (0, pt);
JV.FileManager.setLocalPath (this.vwr, path, true);
}}return names;
}, "~S,~B");
c$.addDirectory = Clazz.defineMethod (c$, "addDirectory", 
 function (defaultDirectory, name) {
if (defaultDirectory.length == 0) return name;
var ch = (name.length > 0 ? name.charAt (0) : ' ');
var s = defaultDirectory.toLowerCase ();
if ((s.endsWith (".zip") || s.endsWith (".tar")) && ch != '|' && ch != '/') defaultDirectory += "|";
return defaultDirectory + (ch == '/' || ch == '/' || (ch = defaultDirectory.charAt (defaultDirectory.length - 1)) == '|' || ch == '/' ? "" : "/") + name;
}, "~S,~S");
Clazz.defineMethod (c$, "getDefaultDirectory", 
function (name) {
var names = this.getClassifiedName (name, true);
if (names == null) return "";
name = JV.FileManager.fixPath (names[0]);
return (name == null ? "" : name.substring (0, name.lastIndexOf ("/")));
}, "~S");
c$.fixPath = Clazz.defineMethod (c$, "fixPath", 
 function (path) {
path = JV.FileManager.fixDOSName (path);
path = JU.PT.rep (path, "/./", "/");
var pt = path.lastIndexOf ("//") + 1;
if (pt < 1) pt = path.indexOf (":/") + 1;
if (pt < 1) pt = path.indexOf ("/");
if (pt < 0) return null;
var protocol = path.substring (0, pt);
path = path.substring (pt);
while ((pt = path.lastIndexOf ("/../")) >= 0) {
var pt0 = path.substring (0, pt).lastIndexOf ("/");
if (pt0 < 0) return JU.PT.rep (protocol + path, "/../", "/");
path = path.substring (0, pt0) + path.substring (pt + 3);
}
if (path.length == 0) path = "/";
return protocol + path;
}, "~S");
Clazz.defineMethod (c$, "getFilePath", 
function (name, addUrlPrefix, asShortName) {
var names = this.getClassifiedName (name, false);
return (names == null || names.length == 1 ? "" : asShortName ? names[1] : addUrlPrefix ? names[2] : names[0] == null ? "" : JV.FileManager.fixDOSName (names[0]));
}, "~S,~B,~B");
c$.getLocalDirectory = Clazz.defineMethod (c$, "getLocalDirectory", 
function (vwr, forDialog) {
var localDir = vwr.getP (forDialog ? "currentLocalPath" : "defaultDirectoryLocal");
if (forDialog && localDir.length == 0) localDir = vwr.getP ("defaultDirectoryLocal");
if (localDir.length == 0) return (vwr.isApplet ? null : vwr.apiPlatform.newFile (System.getProperty ("user.dir", ".")));
if (vwr.isApplet && localDir.indexOf ("file:/") == 0) localDir = localDir.substring (6);
var f = vwr.apiPlatform.newFile (localDir);
try {
return f.isDirectory () ? f : f.getParentAsFile ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "JV.Viewer,~B");
c$.setLocalPath = Clazz.defineMethod (c$, "setLocalPath", 
function (vwr, path, forDialog) {
while (path.endsWith ("/") || path.endsWith ("\\")) path = path.substring (0, path.length - 1);

vwr.setStringProperty ("currentLocalPath", path);
if (!forDialog) vwr.setStringProperty ("defaultDirectoryLocal", path);
}, "JV.Viewer,~S,~B");
c$.getLocalPathForWritingFile = Clazz.defineMethod (c$, "getLocalPathForWritingFile", 
function (vwr, file) {
if (file.startsWith ("http://") || file.startsWith ("https://")) return file;
file = JU.PT.rep (file, "?", "");
if (file.indexOf ("file:/") == 0) return file.substring (6);
if (file.indexOf ("/") == 0 || file.indexOf (":") >= 0) return file;
var dir = null;
try {
dir = JV.FileManager.getLocalDirectory (vwr, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return (dir == null ? file : JV.FileManager.fixPath (dir.toString () + "/" + file));
}, "JV.Viewer,~S");
c$.fixDOSName = Clazz.defineMethod (c$, "fixDOSName", 
function (fileName) {
return (fileName.indexOf (":\\") >= 0 ? fileName.$replace ('\\', '/') : fileName);
}, "~S");
c$.stripPath = Clazz.defineMethod (c$, "stripPath", 
function (name) {
var pt = Math.max (name.lastIndexOf ("|"), name.lastIndexOf ("/"));
return name.substring (pt + 1);
}, "~S");
c$.determineSurfaceTypeIs = Clazz.defineMethod (c$, "determineSurfaceTypeIs", 
function (is) {
var br;
try {
br = JU.Rdr.getBufferedReader ( new java.io.BufferedInputStream (is), "ISO-8859-1");
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
return JV.FileManager.determineSurfaceFileType (br);
}, "java.io.InputStream");
c$.isScriptType = Clazz.defineMethod (c$, "isScriptType", 
function (fname) {
return JU.PT.isOneOf (fname.toLowerCase ().substring (fname.lastIndexOf (".") + 1), ";pse;spt;png;pngj;jmol;zip;");
}, "~S");
c$.isSurfaceType = Clazz.defineMethod (c$, "isSurfaceType", 
function (fname) {
return JU.PT.isOneOf (fname.toLowerCase ().substring (fname.lastIndexOf (".") + 1), ";jvxl;kin;o;msms;map;pmesh;mrc;efvet;cube;obj;dssr;bcif;");
}, "~S");
c$.determineSurfaceFileType = Clazz.defineMethod (c$, "determineSurfaceFileType", 
function (bufferedReader) {
var line = null;
if (Clazz.instanceOf (bufferedReader, JU.Rdr.StreamReader)) {
var is = (bufferedReader).getStream ();
if (is.markSupported ()) {
try {
is.mark (300);
var buf =  Clazz.newByteArray (300, 0);
is.read (buf, 0, 300);
is.reset ();
if ((buf[0] & 0xFF) == 0x83) return "BCifDensity";
if (buf[0] == 80 && buf[1] == 77 && buf[2] == 1 && buf[3] == 0) return "Pmesh";
if (buf[208] == 77 && buf[209] == 65 && buf[210] == 80) return "Mrc";
if (buf[0] == 20 && buf[1] == 0 && buf[2] == 0 && buf[3] == 0) return "DelPhi";
if (buf[36] == 0 && buf[37] == 100) return "Dsn6";
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}}var br = null;
try {
br =  new JU.LimitedLineReader (bufferedReader, 16000);
line = br.getHeader (0);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (br == null || line == null || line.length == 0) return null;
var pt0 = line.indexOf ('\0');
if (pt0 >= 0) {
if (line.charCodeAt (0) == 0x83) return "BCifDensity";
if (line.indexOf ("PM\u0001\u0000") == 0) return "Pmesh";
if (line.indexOf ("MAP ") == 208) return "Mrc";
if (line.indexOf ("\u0014\u0000\u0000\u0000") == 0) return "DelPhi";
if (line.length > 37 && (line.charCodeAt (36) == 0 && line.charCodeAt (37) == 100 || line.charCodeAt (36) == 0 && line.charCodeAt (37) == 100)) {
return "Dsn6";
}}switch (line.charAt (0)) {
case '@':
if (line.indexOf ("@text") == 0) return "Kinemage";
break;
case '#':
if (line.indexOf (".obj") >= 0) return "Obj";
if (line.indexOf ("MSMS") >= 0) return "Msms";
break;
case '&':
if (line.indexOf ("&plot") == 0) return "Jaguar";
break;
case '\r':
case '\n':
if (line.indexOf ("ZYX") >= 0) return "Xplor";
break;
}
if (line.indexOf ("Here is your gzipped map") >= 0) return "UPPSALA" + line;
if (line.startsWith ("data_SERVER")) return "CifDensity";
if (line.startsWith ("4MESHC")) return "Pmesh4";
if (line.indexOf ("! nspins") >= 0) return "CastepDensity";
if (line.indexOf ("<jvxl") >= 0 && line.indexOf ("<?xml") >= 0) return "JvxlXml";
if (line.indexOf ("#JVXL+") >= 0) return "Jvxl+";
if (line.indexOf ("#JVXL") >= 0) return "Jvxl";
if (line.indexOf ("#JmolPmesh") >= 0) return "Pmesh";
if (line.indexOf ("#obj") >= 0) return "Obj";
if (line.indexOf ("#pmesh") >= 0) return "Obj";
if (line.indexOf ("<efvet ") >= 0) return "Efvet";
if (line.indexOf ("usemtl") >= 0) return "Obj";
if (line.indexOf ("# object with") == 0) return "Nff";
if (line.indexOf ("BEGIN_DATAGRID_3D") >= 0 || line.indexOf ("BEGIN_BANDGRID_3D") >= 0) return "Xsf";
if (line.indexOf ("tiles in x, y") >= 0) return "Ras3D";
if (line.indexOf (" 0.00000e+00 0.00000e+00      0      0\n") >= 0) return "Uhbd";
line = br.readLineWithNewline ();
if (line.indexOf ("object 1 class gridpositions counts") == 0) return "Apbs";
var tokens = JU.PT.getTokens (line);
var line2 = br.readLineWithNewline ();
if (tokens.length == 2 && JU.PT.parseInt (tokens[0]) == 3 && JU.PT.parseInt (tokens[1]) != -2147483648) {
tokens = JU.PT.getTokens (line2);
if (tokens.length == 3 && JU.PT.parseInt (tokens[0]) != -2147483648 && JU.PT.parseInt (tokens[1]) != -2147483648 && JU.PT.parseInt (tokens[2]) != -2147483648) return "PltFormatted";
}var line3 = br.readLineWithNewline ();
if (line.startsWith ("v ") && line2.startsWith ("v ") && line3.startsWith ("v ")) return "Obj";
var nAtoms = JU.PT.parseInt (line3);
if (nAtoms == -2147483648) return (line3.indexOf ("+") == 0 ? "Jvxl+" : null);
tokens = JU.PT.getTokens (line3);
if (tokens[0].indexOf (".") > 0) return (line3.length >= 60 || tokens.length != 3 ? null : "VaspChgcar");
if (nAtoms >= 0) return (tokens.length == 4 || tokens.length == 5 && tokens[4].equals ("1") ? "Cube" : null);
nAtoms = -nAtoms;
for (var i = 4 + nAtoms; --i >= 0; ) if ((line = br.readLineWithNewline ()) == null) return null;

var nSurfaces = JU.PT.parseInt (line);
if (nSurfaces == -2147483648) return null;
return (nSurfaces < 0 ? "Jvxl" : "Cube");
}, "java.io.BufferedReader");
c$.getManifestScriptPath = Clazz.defineMethod (c$, "getManifestScriptPath", 
function (manifest) {
if (manifest.indexOf ("$SCRIPT_PATH$") >= 0) return "";
var ch = (manifest.indexOf ('\n') >= 0 ? "\n" : "\r");
if (manifest.indexOf (".spt") >= 0) {
var s = JU.PT.split (manifest, ch);
for (var i = s.length; --i >= 0; ) if (s[i].indexOf (".spt") >= 0) return "|" + JU.PT.trim (s[i], "\r\n \t");

}return null;
}, "~S");
c$.getEmbeddedScript = Clazz.defineMethod (c$, "getEmbeddedScript", 
function (script) {
if (script == null) return script;
var pt = script.indexOf ("**** Jmol Embedded Script ****");
if (pt < 0) return script;
var pt1 = script.lastIndexOf ("/*", pt);
var pt2 = script.indexOf ((script.charAt (pt1 + 2) == '*' ? "*" : "") + "*/", pt);
if (pt1 >= 0 && pt2 >= pt) script = script.substring (pt + "**** Jmol Embedded Script ****".length, pt2) + "\n";
while ((pt1 = script.indexOf (" #Jmol...\u0000")) >= 0) script = script.substring (0, pt1) + script.substring (pt1 + " #Jmol...\u0000".length + 4);

if (JU.Logger.debugging) JU.Logger.debug (script);
return script;
}, "~S");
c$.getFileReferences = Clazz.defineMethod (c$, "getFileReferences", 
function (script, fileList) {
for (var ipt = 0; ipt < JV.FileManager.scriptFilePrefixes.length; ipt++) {
var tag = JV.FileManager.scriptFilePrefixes[ipt];
var i = -1;
while ((i = script.indexOf (tag, i + 1)) >= 0) {
var s = JU.PT.getQuotedStringAt (script, i);
if (s.indexOf ("::") >= 0) s = JU.PT.split (s, "::")[1];
fileList.addLast (s);
}
}
}, "~S,JU.Lst");
c$.setScriptFileReferences = Clazz.defineMethod (c$, "setScriptFileReferences", 
function (script, localPath, remotePath, scriptPath) {
if (localPath != null) script = JV.FileManager.setScriptFileRefs (script, localPath, true);
if (remotePath != null) script = JV.FileManager.setScriptFileRefs (script, remotePath, false);
script = JU.PT.rep (script, "\1\"", "\"");
if (scriptPath != null) {
while (scriptPath.endsWith ("/")) scriptPath = scriptPath.substring (0, scriptPath.length - 1);

for (var ipt = 0; ipt < JV.FileManager.scriptFilePrefixes.length; ipt++) {
var tag = JV.FileManager.scriptFilePrefixes[ipt];
script = JU.PT.rep (script, tag + ".", tag + scriptPath);
}
}return script;
}, "~S,~S,~S,~S");
c$.setScriptFileRefs = Clazz.defineMethod (c$, "setScriptFileRefs", 
 function (script, dataPath, isLocal) {
if (dataPath == null) return script;
var noPath = (dataPath.length == 0);
var fileNames =  new JU.Lst ();
JV.FileManager.getFileReferences (script, fileNames);
var oldFileNames =  new JU.Lst ();
var newFileNames =  new JU.Lst ();
var nFiles = fileNames.size ();
for (var iFile = 0; iFile < nFiles; iFile++) {
var name0 = fileNames.get (iFile);
var name = name0;
if (isLocal == JU.OC.isLocal (name)) {
var pt = (noPath ? -1 : name.indexOf ("/" + dataPath + "/"));
if (pt >= 0) {
name = name.substring (pt + 1);
} else {
pt = name.lastIndexOf ("/");
if (pt < 0 && !noPath) name = "/" + name;
if (pt < 0 || noPath) pt++;
name = dataPath + name.substring (pt);
}}JU.Logger.info ("FileManager substituting " + name0 + " --> " + name);
oldFileNames.addLast ("\"" + name0 + "\"");
newFileNames.addLast ("\1\"" + name + "\"");
}
return JU.PT.replaceStrings (script, oldFileNames, newFileNames);
}, "~S,~S,~B");
Clazz.defineMethod (c$, "cachePut", 
function (key, data) {
key = JV.FileManager.fixDOSName (key);
if (JU.Logger.debugging) JU.Logger.debug ("cachePut " + key);
if (data == null || "".equals (data)) {
this.cache.remove (key);
return;
}this.cache.put (key, data);
this.getCachedPngjBytes (key);
}, "~S,~O");
Clazz.defineMethod (c$, "cacheGet", 
function (key, bytesOnly) {
key = JV.FileManager.fixDOSName (key);
var pt = key.indexOf ("|");
if (pt >= 0 && !key.endsWith ("##JmolSurfaceInfo##")) key = key.substring (0, pt);
key = this.getFilePath (key, true, false);
var data = null;
{
(data = Jmol.Cache.get(key)) || (data = this.cache.get(key));
}return (bytesOnly && (Clazz.instanceOf (data, String)) ? null : data);
}, "~S,~B");
Clazz.defineMethod (c$, "cacheClear", 
function () {
JU.Logger.info ("cache cleared");
this.cache.clear ();
if (this.pngjCache == null) return;
this.pngjCache = null;
JU.Logger.info ("PNGJ cache cleared");
});
Clazz.defineMethod (c$, "cacheFileByNameAdd", 
function (fileName, isAdd) {
if (fileName == null || !isAdd && fileName.equalsIgnoreCase ("")) {
this.cacheClear ();
return -1;
}var data;
if (isAdd) {
fileName = JV.JC.fixProtocol (this.vwr.resolveDatabaseFormat (fileName));
data = this.getFileAsBytes (fileName, null);
if (Clazz.instanceOf (data, String)) return 0;
this.cachePut (fileName, data);
} else {
if (fileName.endsWith ("*")) return JU.AU.removeMapKeys (this.cache, fileName.substring (0, fileName.length - 1));
data = this.cache.remove (JV.FileManager.fixDOSName (fileName));
}return (data == null ? 0 : Clazz.instanceOf (data, String) ? (data).length : (data).length);
}, "~S,~B");
Clazz.defineMethod (c$, "cacheList", 
function () {
var map =  new java.util.Hashtable ();
for (var entry, $entry = this.cache.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) map.put (entry.getKey (), Integer.$valueOf (JU.AU.isAB (entry.getValue ()) ? (entry.getValue ()).length : entry.getValue ().toString ().length));

return map;
});
Clazz.defineMethod (c$, "getCanonicalName", 
function (pathName) {
var names = this.getClassifiedName (pathName, true);
return (names == null ? pathName : names[2]);
}, "~S");
Clazz.defineMethod (c$, "recachePngjBytes", 
function (fileName, bytes) {
if (this.pngjCache == null || !this.pngjCache.containsKey (fileName)) return;
this.pngjCache.put (fileName, bytes);
JU.Logger.info ("PNGJ recaching " + fileName + " (" + bytes.length + ")");
}, "~S,~A");
Clazz.defineMethod (c$, "getPngjOrDroppedBytes", 
 function (fullName, name) {
var bytes = this.getCachedPngjBytes (fullName);
return (bytes == null ? this.cacheGet (name, true) : bytes);
}, "~S,~S");
Clazz.defineMethod (c$, "getCachedPngjBytes", 
 function (pathName) {
return (pathName == null || this.pngjCache == null || pathName.indexOf (".png") < 0 ? null : this.getJzu ().getCachedPngjBytes (this, pathName));
}, "~S");
Clazz.overrideMethod (c$, "postByteArray", 
function (fileName, bytes) {
if (fileName.startsWith ("cache://")) {
this.cachePut (fileName, bytes);
return "OK " + bytes.length + "cached";
}var ret = this.getBufferedInputStreamOrErrorMessageFromName (fileName, null, false, false, bytes, false, true);
if (Clazz.instanceOf (ret, String)) return ret;
try {
ret = JU.Rdr.getStreamAsBytes (ret, null);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
try {
(ret).close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
} else {
throw e;
}
}
return (ret == null ? "" : JU.Rdr.fixUTF (ret));
}, "~S,~A");
Clazz.defineStatics (c$,
"SIMULATION_PROTOCOL", "http://SIMULATION/",
"DELPHI_BINARY_MAGIC_NUMBER", "\24\0\0\0",
"PMESH_BINARY_MAGIC_NUMBER", "PM\1\0",
"JPEG_CONTINUE_STRING", " #Jmol...\0");
c$.scriptFilePrefixes = c$.prototype.scriptFilePrefixes =  Clazz.newArray (-1, ["/*file*/\"", "FILE0=\"", "FILE1=\""]);
});
