Clazz.declarePackage ("JV");
Clazz.load (null, "JV.OutputManager", ["java.lang.Boolean", "java.util.Date", "$.Hashtable", "$.Map", "JU.AU", "$.Lst", "$.OC", "$.PT", "$.SB", "J.api.Interface", "J.i18n.GT", "JU.Logger", "JV.FileManager", "$.JC", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.privateKey = 0;
Clazz.instantialize (this, arguments);
}, JV, "OutputManager");
Clazz.defineMethod (c$, "setViewer", 
function (vwr, privateKey) {
this.vwr = vwr;
this.privateKey = privateKey;
return this;
}, "JV.Viewer,~N");
Clazz.defineMethod (c$, "writeToOutputChannel", 
 function (params) {
var type = params.get ("type");
var fileName = params.get ("fileName");
var text = params.get ("text");
var bytes = params.get ("bytes");
var quality = JV.OutputManager.getInt (params, "quality", -2147483648);
var out = params.get ("outputChannel");
var closeStream = (out == null);
var len = -1;
var ret = null;
try {
if (!this.vwr.checkPrivateKey (this.privateKey)) return "ERROR: SECURITY";
if (bytes != null) {
if (out == null) out = this.openOutputChannel (this.privateKey, fileName, false, false);
out.write (bytes, 0, bytes.length);
} else if (text != null && !type.equals ("ZIPDATA") && !type.equals ("BINARY")) {
if (out == null) out = this.openOutputChannel (this.privateKey, fileName, true, false);
out.append (text);
} else {
var errMsg = this.getOrSaveImage (params);
if (errMsg != null) return errMsg;
len = (params.get ("byteCount")).intValue ();
}} catch (exc) {
if (Clazz.exceptionOf (exc, Exception)) {
JU.Logger.errorEx ("IO Exception", exc);
return exc.toString ();
} else {
throw exc;
}
} finally {
if (out != null) {
if (closeStream) ret = out.closeChannel ();
len = out.getByteCount ();
}}
var pt = fileName.indexOf ("?POST?");
if (pt >= 0) fileName = fileName.substring (0, pt);
return (len < 0 ? "Creation of " + fileName + " failed: " + (ret == null ? this.vwr.getErrorMessageUn () : ret) : "OK " + type + " " + (len > 0 ? len + " " : "") + fileName + (quality == -2147483648 ? "" : "; quality=" + quality));
}, "java.util.Map");
Clazz.defineMethod (c$, "getOrSaveImage", 
 function (params) {
var bytes = null;
var errMsg = null;
var type = (params.get ("type")).toUpperCase ();
var fileName = params.get ("fileName");
var scripts = params.get ("scripts");
var objImage = params.get ("image");
var rgbbuf = params.get ("rgbbuf");
var out = params.get ("outputChannel");
var asBytes = (out == null && fileName == null);
var closeChannel = (out == null && fileName != null);
var releaseImage = (objImage == null);
var image = (type.equals ("BINARY") || type.equals ("ZIPDATA") ? "" : rgbbuf != null ? rgbbuf : objImage != null ? objImage : this.vwr.getScreenImage ());
var isOK = false;
try {
if (image == null) return errMsg = this.vwr.getErrorMessage ();
if (fileName != null && fileName.startsWith ("\1")) {
isOK = true;
var info =  new java.util.Hashtable ();
info.put ("_IMAGE_", image);
this.vwr.fm.loadImage (info, fileName, false);
return errMsg = "OK - viewing " + fileName.substring (1);
}var isPngj = type.equals ("PNGJ");
if (!isPngj) {
if (out == null && (out = this.openOutputChannel (this.privateKey, fileName, false, false)) == null) return errMsg = "ERROR: canceled";
fileName = out.getFileName ();
}var comment = null;
var stateData = null;
params.put ("date", this.vwr.apiPlatform.getDateFormat ("8601"));
if (type.startsWith ("JP")) {
type = JU.PT.rep (type, "E", "");
if (type.equals ("JPG64")) {
params.put ("outputChannelTemp", this.getOutputChannel (null, null));
comment = "";
} else {
comment = (!asBytes ? this.getWrappedState (null, null, image, null) : "");
}params.put ("jpgAppTag", " #Jmol...\u0000");
} else if (type.equals ("PDF")) {
comment = "";
} else if (type.startsWith ("PNG")) {
comment = "";
if (isPngj) {
var outTemp = this.getOutputChannel (null, null);
this.getWrappedState (fileName, scripts, image, outTemp);
stateData = outTemp.toByteArray ();
if (out == null && (out = this.openOutputChannel (this.privateKey, fileName, false, false)) == null) return errMsg = "ERROR: canceled";
} else if (rgbbuf == null && !asBytes && !params.containsKey ("captureMode")) {
stateData = (this.getWrappedState (null, scripts, image, null)).getBytes ();
}if (stateData != null) {
params.put ("pngAppData", stateData);
params.put ("pngAppPrefix", "Jmol Type");
}}if (type.equals ("PNGT") || type.equals ("GIFT")) params.put ("transparentColor", Integer.$valueOf (this.vwr.getBackgroundArgb ()));
if (type.length == 4) type = type.substring (0, 3);
if (comment != null) params.put ("comment", comment.length == 0 ? JV.Viewer.getJmolVersion () : comment);
var errRet =  new Array (1);
isOK = this.createTheImage (image, type, out, params, errRet);
if (closeChannel) out.closeChannel ();
if (isOK) {
if (params.containsKey ("captureMsg") && !params.containsKey ("captureSilent")) this.vwr.prompt (params.get ("captureMsg"), "OK", null, true);
if (asBytes) bytes = out.toByteArray ();
 else if (params.containsKey ("captureByteCount")) errMsg = "OK: " + params.get ("captureByteCount").toString () + " bytes";
} else {
errMsg = errRet[0];
}} finally {
if (releaseImage) this.vwr.releaseScreenImage ();
if (bytes != null || out != null) params.put ("byteCount", Integer.$valueOf (bytes != null ? bytes.length : isOK ? out.getByteCount () : -1));
if (objImage != null) {
return fileName;
}}
return (errMsg == null ? bytes : errMsg);
}, "java.util.Map");
Clazz.defineMethod (c$, "getWrappedState", 
function (pngjName, scripts, objImage, pgjOut) {
var width = this.vwr.apiPlatform.getImageWidth (objImage);
var height = this.vwr.apiPlatform.getImageHeight (objImage);
if (width > 0 && !this.vwr.g.imageState && pgjOut == null || !this.vwr.g.preserveState) return "";
var s = this.vwr.getStateInfo3 (null, width, height);
if (pgjOut != null) {
return this.createZipSet (s, scripts, true, pgjOut, pngjName);
}try {
s = JV.JC.embedScript (JV.FileManager.setScriptFileReferences (s, ".", null, null));
} catch (e) {
JU.Logger.error ("state could not be saved: " + e.toString ());
s = "Jmol " + JV.Viewer.getJmolVersion ();
}
return s;
}, "~S,~A,~O,JU.OC");
Clazz.defineMethod (c$, "createTheImage", 
 function (objImage, type, out, params, errRet) {
type = type.substring (0, 1) + type.substring (1).toLowerCase ();
var isZipData = type.equals ("Zipdata");
if (isZipData || type.equals ("Binary")) {
var v = params.get ("imageData");
if (v.size () >= 2 && v.get (0).equals ("_IMAGE_")) {
if (isZipData) {
errRet[0] = this.writeZipFile (out, v, "OK JMOL", null);
return true;
}objImage = null;
v.removeItemAt (0);
v.removeItemAt (0);
params.put ("pngImgData", v.removeItemAt (0));
var oz = this.getOutputChannel (null, null);
errRet[0] = this.writeZipFile (oz, v, "OK JMOL", null);
params.put ("type", "PNGJ");
type = "Png";
params.put ("pngAppPrefix", "Jmol Type");
params.put ("pngAppData", oz.toByteArray ());
} else if (v.size () == 1) {
var b = v.removeItemAt (0);
out.write (b, 0, b.length);
return true;
} else {
errRet[0] = this.writeZipFile (out, v, "OK JMOL", null);
return true;
}}var ie = J.api.Interface.getInterface ("javajs.img." + type + "Encoder", this.vwr, "file");
if (ie == null) {
errRet[0] = "Image encoder type " + type + " not available";
return false;
}var doClose = true;
try {
if (type.equals ("Gif") && this.vwr.getBoolean (603979962)) params.put ("reducedColors", Boolean.TRUE);
var w = objImage == null ? -1 : JU.AU.isAI (objImage) ? (params.get ("width")).intValue () : this.vwr.apiPlatform.getImageWidth (objImage);
var h = objImage == null ? -1 : JU.AU.isAI (objImage) ? (params.get ("height")).intValue () : this.vwr.apiPlatform.getImageHeight (objImage);
params.put ("imageWidth", Integer.$valueOf (w));
params.put ("imageHeight", Integer.$valueOf (h));
var pixels = this.encodeImage (w, h, objImage);
if (pixels != null) params.put ("imagePixels", pixels);
params.put ("logging", Boolean.$valueOf (JU.Logger.debugging));
doClose = ie.createImage (type, out, params);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
errRet[0] = e.toString ();
out.cancel ();
doClose = true;
} else {
throw e;
}
} finally {
if (doClose) out.closeChannel ();
}
return (errRet[0] == null);
}, "~O,~S,JU.OC,java.util.Map,~A");
Clazz.defineMethod (c$, "encodeImage", 
 function (width, height, objImage) {
if (width < 0) return null;
var pixels;
if (JU.AU.isAI (objImage)) {
pixels = objImage;
} else {
{
pixels = null;
}pixels = this.vwr.apiPlatform.grabPixels (objImage, width, height, pixels, 0, height);
}return pixels;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "outputToFile", 
function (params) {
return this.handleOutputToFile (params, true);
}, "java.util.Map");
Clazz.defineMethod (c$, "getOutputChannel", 
function (fileName, fullPath) {
if (!this.vwr.haveAccess (JV.Viewer.ACCESS.ALL)) return null;
var isCache = (fileName != null && fileName.startsWith ("cache://"));
var isRemote = (fileName != null && (fileName.startsWith ("http://") || fileName.startsWith ("https://")));
if (fileName != null && !isCache && !isRemote) {
fileName = this.getOutputFileNameFromDialog (fileName, -2147483648, null);
if (fileName == null) return null;
}if (fullPath != null) fullPath[0] = fileName;
var localName = (isRemote || isCache || JU.OC.isLocal (fileName) ? fileName : null);
try {
return this.openOutputChannel (this.privateKey, localName, false, false);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
JU.Logger.info (e.toString ());
return null;
} else {
throw e;
}
}
}, "~S,~A");
Clazz.defineMethod (c$, "processWriteOrCapture", 
function (params) {
var fileName = params.get ("fileName");
if (fileName == null) return this.vwr.clipImageOrPasteText (params.get ("text"));
var bsFrames = params.get ("bsFrames");
var nVibes = JV.OutputManager.getInt (params, "nVibes", 0);
return (bsFrames != null || nVibes != 0 ? this.processMultiFrameOutput (fileName, bsFrames, nVibes, params) : this.handleOutputToFile (params, true));
}, "java.util.Map");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
 function (params, key, def) {
var p = params.get (key);
return (p == null ? def : p.intValue ());
}, "java.util.Map,~S,~N");
Clazz.defineMethod (c$, "processMultiFrameOutput", 
 function (fileName, bsFrames, nVibes, params) {
var info = "";
var n = 0;
var quality = JV.OutputManager.getInt (params, "quality", -1);
fileName = this.setFullPath (params, this.getOutputFileNameFromDialog (fileName, quality, null));
if (fileName == null) return null;
var rootExt =  new Array (2);
JV.OutputManager.getRootExt (fileName, rootExt, 0);
var sb =  new JU.SB ();
if (bsFrames == null) {
this.vwr.tm.vibrationOn = true;
sb =  new JU.SB ();
for (var i = 0; i < nVibes; i++) {
for (var j = 0; j < 20; j++) {
this.vwr.tm.setVibrationT (j / 20 + 0.2501);
if (!this.writeFrame (++n, rootExt, params, sb)) return "ERROR WRITING FILE SET: \n" + info;
}
}
this.vwr.tm.setVibrationPeriod (0);
} else {
for (var i = bsFrames.nextSetBit (0); i >= 0; i = bsFrames.nextSetBit (i + 1)) {
this.vwr.setCurrentModelIndex (i);
if (!this.writeFrame (++n, rootExt, params, sb)) return "ERROR WRITING FILE SET: \n" + info;
}
}if (info.length == 0) info = "OK\n";
return info + "\n" + n + " files created";
}, "~S,JU.BS,~N,java.util.Map");
c$.getRootExt = Clazz.defineMethod (c$, "getRootExt", 
 function (fileName, rootExt, n) {
if (fileName == null) {
fileName = "0000" + n;
return rootExt[0] + fileName.substring (fileName.length - 4) + rootExt[1];
}var ptDot = fileName.lastIndexOf (".");
if (ptDot < 0) ptDot = fileName.length;
var froot = fileName.substring (0, ptDot);
if (froot.endsWith ("0")) froot = JU.PT.trim (froot, "0");
rootExt[0] = froot;
rootExt[1] = fileName.substring (ptDot);
return rootExt;
}, "~S,~A,~N");
Clazz.defineMethod (c$, "setFullPath", 
 function (params, fileName) {
var fullPath = params.get ("fullPath");
if (fullPath != null) fullPath[0] = fileName;
if (fileName == null) return null;
params.put ("fileName", fileName);
return fileName;
}, "java.util.Map,~S");
Clazz.defineMethod (c$, "getOutputFromExport", 
function (params) {
var width = JV.OutputManager.getInt (params, "width", 0);
var height = JV.OutputManager.getInt (params, "height", 0);
var fileName = params.get ("fileName");
if (fileName != null) {
fileName = this.setFullPath (params, this.getOutputFileNameFromDialog (fileName, -2147483648, null));
if (fileName == null) return null;
}this.vwr.mustRender = true;
var saveWidth = this.vwr.screenWidth;
var saveHeight = this.vwr.screenHeight;
this.vwr.resizeImage (width, height, true, true, false);
this.vwr.setModelVisibility ();
var data = this.vwr.rm.renderExport (this.vwr.gdata, this.vwr.ms, params);
this.vwr.resizeImage (saveWidth, saveHeight, true, true, true);
return data;
}, "java.util.Map");
Clazz.defineMethod (c$, "getImageAsBytes", 
function (type, width, height, quality, errMsg) {
var saveWidth = this.vwr.screenWidth;
var saveHeight = this.vwr.screenHeight;
this.vwr.mustRender = true;
this.vwr.resizeImage (width, height, true, false, false);
this.vwr.setModelVisibility ();
this.vwr.creatingImage = true;
var bytes = null;
try {
var params =  new java.util.Hashtable ();
params.put ("type", type);
if (quality > 0) params.put ("quality", Integer.$valueOf (quality));
var bytesOrError = this.getOrSaveImage (params);
if (Clazz.instanceOf (bytesOrError, String)) errMsg[0] = bytesOrError;
 else bytes = bytesOrError;
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
errMsg[0] = e.toString ();
this.vwr.setErrorMessage ("Error creating image: " + e, null);
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
this.vwr.handleError (er, false);
this.vwr.setErrorMessage ("Error creating image: " + er, null);
errMsg[0] = this.vwr.getErrorMessage ();
}
} else {
throw e$$;
}
}
this.vwr.creatingImage = false;
this.vwr.resizeImage (saveWidth, saveHeight, true, false, true);
return bytes;
}, "~S,~N,~N,~N,~A");
Clazz.defineMethod (c$, "writeFileData", 
function (fileName, type, modelIndex, plotParameters) {
var fullPath =  new Array (1);
var out = this.getOutputChannel (fileName, fullPath);
if (out == null) return "";
fileName = fullPath[0];
var pathName = (type.equals ("FILE") ? this.vwr.fm.getFullPathName (false) : null);
var getCurrentFile = (pathName != null && (pathName.equals ("string") || pathName.equals ("String[]") || pathName.equals ("JSNode")));
var asBytes = (pathName != null && !getCurrentFile);
if (asBytes) {
pathName = this.vwr.getModelSetPathName ();
if (pathName == null) return null;
}out.setType (type);
var msg = (type.startsWith ("PDB") ? this.vwr.getPdbAtomData (null, out, false, false) : type.startsWith ("PLOT") ? this.vwr.getPdbData (modelIndex, type.substring (5), null, plotParameters, out, true) : getCurrentFile ? out.append (this.vwr.getCurrentFileAsString ("write")).toString () : this.vwr.fm.getFileAsBytes (pathName, out));
out.closeChannel ();
if (msg != null) msg = "OK " + msg + " " + fileName;
return msg;
}, "~S,~S,~N,~A");
Clazz.defineMethod (c$, "writeFrame", 
 function (n, rootExt, params, sb) {
var fileName = JV.OutputManager.getRootExt (null, rootExt, n);
fileName = this.setFullPath (params, fileName);
if (fileName == null) return false;
var msg = this.handleOutputToFile (params, false);
this.vwr.scriptEcho (msg);
sb.append (msg).append ("\n");
return msg.startsWith ("OK");
}, "~N,~A,java.util.Map,JU.SB");
Clazz.defineMethod (c$, "getOutputFileNameFromDialog", 
 function (fileName, quality, params) {
if (fileName == null || this.vwr.$isKiosk) return null;
var useDialog = fileName.startsWith ("?");
if (useDialog) fileName = fileName.substring (1);
useDialog = new Boolean (useDialog | (this.vwr.isApplet && fileName.indexOf ("http://") != 0 && fileName.indexOf ("https://") != 0)).valueOf ();
fileName = JV.FileManager.getLocalPathForWritingFile (this.vwr, fileName);
if (useDialog) fileName = this.vwr.dialogAsk (quality == -2147483648 ? "Save" : "Save Image", fileName, params);
return fileName;
}, "~S,~N,java.util.Map");
Clazz.defineMethod (c$, "handleOutputToFile", 
function (params, doCheck) {
var fileName = params.get ("fileName");
var out = params.get ("outputChannel");
if (fileName == null && out == null) return null;
var sret = null;
var type = params.get ("type");
var text = params.get ("text");
var width = JV.OutputManager.getInt (params, "width", 0);
var height = JV.OutputManager.getInt (params, "height", 0);
var saveWidth = 0;
var saveHeight = 0;
var quality = JV.OutputManager.getInt (params, "quality", -2147483648);
var captureMode = params.get ("captureMode");
var is2D = params.get ("is2D") === Boolean.TRUE;
var localName = null;
if (captureMode != null && !this.vwr.allowCapture ()) return "ERROR: Cannot capture on this platform.";
var mustRender = (!is2D && quality != -2147483648);
if (captureMode != null) {
doCheck = false;
mustRender = false;
}if (out == null) {
if (!fileName.startsWith ("\1")) {
if (doCheck) fileName = this.getOutputFileNameFromDialog (fileName, quality, params);
fileName = this.setFullPath (params, fileName);
}if (fileName == null) return null;
params.put ("fileName", fileName);
if (JU.OC.isLocal (fileName)) localName = fileName;
saveWidth = this.vwr.screenWidth;
saveHeight = this.vwr.screenHeight;
this.vwr.creatingImage = true;
if (mustRender) {
this.vwr.mustRender = true;
this.vwr.resizeImage (width, height, true, false, false);
this.vwr.setModelVisibility ();
}}try {
if (type.equals ("JMOL")) type = "ZIPALL";
if (type.equals ("ZIP") || type.equals ("ZIPALL")) {
var scripts = params.get ("scripts");
if (scripts != null && type.equals ("ZIP")) type = "ZIPALL";
sret = this.createZipSet (text, scripts, type.equals ("ZIPALL"), out == null ? this.getOutputChannel (fileName, null) : out, null);
} else if (type.equals ("SCENE")) {
sret = this.createSceneSet (fileName, text, width, height);
} else {
var bytes = params.get ("bytes");
sret = this.vwr.sm.createImage (fileName, type, text, bytes, quality);
if (sret == null) {
var createImage = true;
var captureMsg = null;
if (captureMode != null) {
out = null;
var cparams = this.vwr.captureParams;
var imode = "ad on of en ca mo ".indexOf (captureMode.substring (0, 2));
var rootExt;
if (imode == 15) {
if (cparams != null && cparams.containsKey ("outputChannel")) (cparams.get ("outputChannel")).closeChannel ();
var streaming = params.containsKey ("streaming");
if (streaming && (out = this.getOutputChannel (localName, null)) == null) {
sret = captureMsg = "ERROR: capture canceled";
this.vwr.captureParams = null;
} else {
this.vwr.captureParams = params;
if (params.containsKey ("captureRootExt")) {
imode = 0;
} else {
if (out != null) localName = out.getFileName ();
params.put ("captureFileName", localName);
if (streaming) {
captureMsg = type + "_STREAM_OPEN " + localName;
params.put ("captureMode", "movie");
} else {
rootExt =  new Array (2);
params.put ("captureRootExt", JV.OutputManager.getRootExt (localName, rootExt, 0));
localName = JV.OutputManager.getRootExt (null, rootExt, 1);
imode = -1;
cparams = params;
createImage = false;
}}if (!params.containsKey ("captureCount")) params.put ("captureCount", Integer.$valueOf (0));
}}if (imode >= 0 && imode != 15) {
if (cparams == null) {
sret = captureMsg = "ERROR: capture not active";
} else {
params = cparams;
switch (imode) {
default:
sret = captureMsg = "ERROR: CAPTURE MODE=" + captureMode + "?";
break;
case 0:
if (Boolean.FALSE === params.get ("captureEnabled")) {
sret = captureMsg = "capturing OFF; use CAPTURE ON/END/CANCEL to continue";
} else {
var count = JV.OutputManager.getInt (params, "captureCount", 0);
params.put ("captureCount", Integer.$valueOf (++count));
if ((rootExt = params.get ("captureRootExt")) != null) {
localName = JV.OutputManager.getRootExt (null, rootExt, count);
captureMsg = null;
createImage = true;
} else {
captureMsg = type + "_STREAM_ADD " + count;
}}break;
case 3:
case 6:
params = cparams;
params.put ("captureEnabled", (captureMode.equals ("on") ? Boolean.TRUE : Boolean.FALSE));
sret = type + "_STREAM_" + (captureMode.equals ("on") ? "ON" : "OFF");
params.put ("captureMode", "add");
break;
case 9:
case 12:
params = cparams;
params.put ("captureMode", captureMode);
fileName = params.get ("captureFileName");
captureMsg = type + "_STREAM_" + (captureMode.equals ("end") ? "CLOSE " : "CANCEL ") + fileName;
this.vwr.captureParams = null;
params.put ("captureMsg", J.i18n.GT.$ ("Capture") + ": " + (captureMode.equals ("cancel") ? J.i18n.GT.$ ("canceled") : J.i18n.GT.o (J.i18n.GT.$ ("{0} saved"), fileName)));
if (params.containsKey ("captureRootExt")) createImage = false;
break;
}
}}if (createImage && out != null) params.put ("outputChannel", out);
}if (createImage) {
if (localName != null) params.put ("fileName", localName);
if (sret == null) sret = this.writeToOutputChannel (params);
if (!is2D) {
this.vwr.sm.createImage (sret, type, null, null, quality);
if (captureMode != null) {
if (captureMsg == null) captureMsg = sret;
 else captureMsg += " (" + params.get (params.containsKey ("captureByteCount") ? "captureByteCount" : "byteCount") + " bytes)";
}}}if (captureMsg != null) {
this.vwr.showString (captureMsg, false);
}}}} catch (er) {
er.printStackTrace ();
JU.Logger.error (this.vwr.setErrorMessage (sret = "ERROR creating image??: " + er, null));
} finally {
this.vwr.creatingImage = false;
if (quality != -2147483648 && saveWidth > 0) this.vwr.resizeImage (saveWidth, saveHeight, true, false, true);
}
return sret;
}, "java.util.Map,~B");
Clazz.defineMethod (c$, "setLogFile", 
function (value) {
var path = null;
if (this.vwr.logFilePath == null || value.indexOf ("\\") >= 0) {
value = null;
} else if (value.startsWith ("http://") || value.startsWith ("https://")) {
path = value;
} else if (value.indexOf ("/") >= 0) {
value = null;
} else if (value.length > 0) {
if (!value.startsWith ("JmolLog_")) value = "JmolLog_" + value;
path = this.getLogPath (this.vwr.logFilePath + value);
}if (path == null) value = null;
 else JU.Logger.info (J.i18n.GT.o (J.i18n.GT.$ ("Setting log file to {0}"), path));
if (value == null || !this.vwr.haveAccess (JV.Viewer.ACCESS.ALL)) {
JU.Logger.info (J.i18n.GT.$ ("Cannot set log file path."));
value = null;
} else {
this.vwr.logFileName = path;
this.vwr.g.setO ("_logFile", this.vwr.isApplet ? value : path);
}return value;
}, "~S");
Clazz.defineMethod (c$, "logToFile", 
function (data) {
try {
var doClear = (data.equals ("$CLEAR$"));
if (data.indexOf ("$NOW$") >= 0) data = JU.PT.rep (data, "$NOW$", this.vwr.apiPlatform.getDateFormat (null));
if (this.vwr.logFileName == null) {
JU.Logger.info (data);
return;
}var out = (this.vwr.haveAccess (JV.Viewer.ACCESS.ALL) ? this.openOutputChannel (this.privateKey, this.vwr.logFileName, true, !doClear) : null);
if (!doClear) {
var ptEnd = data.indexOf ('\0');
if (ptEnd >= 0) data = data.substring (0, ptEnd);
out.append (data);
if (ptEnd < 0) out.append ("\n");
}var s = out.closeChannel ();
JU.Logger.info (s);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (JU.Logger.debugging) JU.Logger.debug ("cannot log " + data);
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "createZipSet", 
 function (script, scripts, includeRemoteFiles, out, pngjName) {
var v =  new JU.Lst ();
var fm = this.vwr.fm;
var fileNames =  new JU.Lst ();
var crcMap =  new java.util.Hashtable ();
var haveSceneScript = (scripts != null && scripts.length == 3 && scripts[1].startsWith ("###scene.spt###"));
var sceneScriptOnly = (haveSceneScript && scripts[2].equals ("min"));
if (!sceneScriptOnly) {
JV.FileManager.getFileReferences (script, fileNames);
if (haveSceneScript) JV.FileManager.getFileReferences (scripts[1], fileNames);
}var haveScripts = (!haveSceneScript && scripts != null && scripts.length > 0);
if (haveScripts) {
script = this.wrapPathForAllFiles ("script " + JU.PT.esc (scripts[0]), "");
for (var i = 0; i < scripts.length; i++) fileNames.addLast (scripts[i]);

}var nFiles = fileNames.size ();
var newFileNames =  new JU.Lst ();
for (var iFile = 0; iFile < nFiles; iFile++) {
var name = fileNames.get (iFile);
var isLocal = !JV.Viewer.isJS && JU.OC.isLocal (name);
var newName = name;
if (isLocal || includeRemoteFiles) {
var ptSlash = name.lastIndexOf ("/");
newName = (name.indexOf ("?") > 0 && name.indexOf ("|") < 0 ? JU.PT.replaceAllCharacters (name, "/:?\"'=&", "_") : JV.FileManager.stripPath (name));
newName = JU.PT.replaceAllCharacters (newName, "[]", "_");
newName = JU.PT.rep (newName, "#_DOCACHE_", "");
var isSparDir = (fm.spardirCache != null && fm.spardirCache.containsKey (name));
if (isLocal && name.indexOf ("|") < 0 && !isSparDir) {
v.addLast (name);
v.addLast (newName);
v.addLast (null);
} else {
var ret = (isSparDir ? fm.spardirCache.get (name) : fm.getFileAsBytes (name, null));
if (!JU.AU.isAB (ret)) return "ERROR: " + ret;
newName = this.addPngFileBytes (name, ret, iFile, crcMap, isSparDir, newName, ptSlash, v);
}name = "$SCRIPT_PATH$" + newName;
}crcMap.put (newName, newName);
newFileNames.addLast (name);
}
if (!sceneScriptOnly) {
script = JU.PT.replaceQuotedStrings (script, fileNames, newFileNames);
v.addLast ("state.spt");
v.addLast (null);
v.addLast (script.getBytes ());
}if (haveSceneScript) {
if (scripts[0] != null) {
v.addLast ("animate.spt");
v.addLast (null);
v.addLast (scripts[0].getBytes ());
}v.addLast ("scene.spt");
v.addLast (null);
script = JU.PT.replaceQuotedStrings (scripts[1], fileNames, newFileNames);
v.addLast (script.getBytes ());
}var sname = (haveSceneScript ? "scene.spt" : "state.spt");
v.addLast ("JmolManifest.txt");
v.addLast (null);
var sinfo = "# Jmol Manifest Zip Format 1.1\n# Created " + ( new java.util.Date ()) + "\n" + "# JmolVersion " + JV.Viewer.getJmolVersion () + "\n" + sname;
v.addLast (sinfo.getBytes ());
v.addLast ("Jmol_version_" + JV.Viewer.getJmolVersion ().$replace (' ', '_').$replace (':', '.'));
v.addLast (null);
v.addLast ( Clazz.newByteArray (0, 0));
if (out.getFileName () != null) {
var bytes = this.vwr.getImageAsBytes ("PNG", 0, 0, -1, null);
if (bytes != null) {
v.addLast ("preview.png");
v.addLast (null);
v.addLast (bytes);
}}return this.writeZipFile (out, v, "OK JMOL", pngjName);
}, "~S,~A,~B,JU.OC,~S");
Clazz.defineMethod (c$, "addPngFileBytes", 
 function (name, ret, iFile, crcMap, isSparDir, newName, ptSlash, v) {
var crcValue = Integer.$valueOf (this.vwr.getJzt ().getCrcValue (ret));
if (crcMap.containsKey (crcValue)) {
newName = crcMap.get (crcValue);
} else {
if (isSparDir) newName = newName.$replace ('.', '_');
if (crcMap.containsKey (newName)) {
var pt = newName.lastIndexOf (".");
if (pt > ptSlash) newName = newName.substring (0, pt) + "[" + iFile + "]" + newName.substring (pt);
 else newName = newName + "[" + iFile + "]";
}v.addLast (name);
v.addLast (newName);
v.addLast (ret);
crcMap.put (crcValue, newName);
}return newName;
}, "~S,~A,~N,java.util.Hashtable,~B,~S,~N,JU.Lst");
Clazz.defineMethod (c$, "writeZipFile", 
 function (out, fileNamesAndByteArrays, msg, pngjName) {
var buf =  Clazz.newByteArray (1024, 0);
var nBytesOut = 0;
var nBytes = 0;
var outFileName = out.getFileName ();
if (pngjName != null && pngjName.startsWith ("//")) pngjName = "file:" + pngjName.substring (1);
JU.Logger.info ("creating zip file " + (outFileName == null ? "" : outFileName) + "...");
var fileList = "";
try {
var bos;
{
bos = out;
}var fm = this.vwr.fm;
var zos = this.vwr.getJzt ().getZipOutputStream (bos);
for (var i = 0; i < fileNamesAndByteArrays.size (); i += 3) {
var fname = fileNamesAndByteArrays.get (i);
var bytes = null;
var data = fm.cacheGet (fname, false);
if (Clazz.instanceOf (data, java.util.Map)) continue;
if (fname.indexOf ("file:/") == 0) {
fname = fname.substring (5);
if (fname.length > 2 && fname.charAt (2) == ':') fname = fname.substring (1);
} else if (fname.indexOf ("cache://") == 0) {
fname = fname.substring (8);
}var fnameShort = fileNamesAndByteArrays.get (i + 1);
if (fnameShort == null) fnameShort = fname;
if (data != null) bytes = (JU.AU.isAB (data) ? data : (data).getBytes ());
if (bytes == null) bytes = fileNamesAndByteArrays.get (i + 2);
var key = ";" + fnameShort + ";";
if (fileList.indexOf (key) >= 0) {
JU.Logger.info ("duplicate entry");
continue;
}fileList += key;
this.vwr.getJzt ().addZipEntry (zos, fnameShort);
var nOut = 0;
if (bytes == null) {
var $in = this.vwr.getBufferedInputStream (fname);
var len;
while ((len = $in.read (buf, 0, 1024)) > 0) {
zos.write (buf, 0, len);
nOut += len;
}
$in.close ();
} else {
zos.write (bytes, 0, bytes.length);
if (pngjName != null) this.vwr.fm.recachePngjBytes (pngjName + "|" + fnameShort, bytes);
nOut += bytes.length;
}nBytesOut += nOut;
this.vwr.getJzt ().closeZipEntry (zos);
JU.Logger.info ("...added " + fname + " (" + nOut + " bytes)");
}
zos.flush ();
zos.close ();
JU.Logger.info (nBytesOut + " bytes prior to compression");
var ret = out.closeChannel ();
if (ret != null) {
if (ret.indexOf ("Exception") >= 0) return ret;
msg += " " + ret;
}nBytes = out.getByteCount ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
JU.Logger.info (e.toString ());
return e.toString ();
} else {
throw e;
}
}
var fileName = out.getFileName ();
return (fileName == null ? null : msg + " " + nBytes + " " + fileName);
}, "JU.OC,JU.Lst,~S,~S");
Clazz.defineMethod (c$, "wrapPathForAllFiles", 
function (cmd, strCatch) {
var vname = "v__" + ("" + Math.random ()).substring (3);
return "# Jmol script\n{\n\tVar " + vname + " = pathForAllFiles\n\tpathForAllFiles=\"$SCRIPT_PATH$\"\n\ttry{\n\t\t" + cmd + "\n\t}catch(e){" + strCatch + "}\n\tpathForAllFiles = " + vname + "\n}\n";
}, "~S,~S");
Clazz.defineStatics (c$,
"SCENE_TAG", "###scene.spt###");
});
