Clazz.declarePackage ("JV");
Clazz.load (["java.util.Hashtable"], "JV.StatusManager", ["java.lang.Boolean", "$.Float", "JU.Lst", "$.PT", "J.api.Interface", "J.c.CBK", "JS.SV", "JU.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.jsl = null;
this.cbl = null;
this.statusList = "";
this.allowStatusReporting = false;
this.messageQueue = null;
this.statusPtr = 0;
this.jmolScriptCallbacks = null;
this.imageMap = null;
this.minSyncRepeatMs = 100;
this.syncingScripts = false;
this.syncingMouse = false;
this.drivingSync = false;
this.isSynced = false;
this.syncDisabled = false;
this.stereoSync = false;
this.qualityJPG = -1;
this.qualityPNG = -1;
this.imageType = null;
this.audios = null;
Clazz.instantialize (this, arguments);
}, JV, "StatusManager");
Clazz.prepareFields (c$, function () {
this.messageQueue =  new java.util.Hashtable ();
this.jmolScriptCallbacks =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (vwr) {
this.vwr = vwr;
}, "JV.Viewer");
Clazz.defineMethod (c$, "recordStatus", 
 function (statusName) {
return (this.allowStatusReporting && this.statusList.length > 0 && (this.statusList.equals ("all") || this.statusList.indexOf (statusName) >= 0));
}, "~S");
Clazz.defineMethod (c$, "setStatusChanged", 
 function (statusName, intInfo, statusInfo, isReplace) {
if (!this.recordStatus (statusName)) return;
var msgRecord =  new JU.Lst ();
msgRecord.addLast (Integer.$valueOf (++this.statusPtr));
msgRecord.addLast (statusName);
msgRecord.addLast (Integer.$valueOf (intInfo));
msgRecord.addLast (statusInfo);
var statusRecordSet = (isReplace ? null : this.messageQueue.get (statusName));
if (statusRecordSet == null) this.messageQueue.put (statusName, statusRecordSet =  new JU.Lst ());
 else if (statusRecordSet.size () == JV.StatusManager.MAXIMUM_QUEUE_LENGTH) statusRecordSet.removeItemAt (0);
statusRecordSet.addLast (msgRecord);
}, "~S,~N,~O,~B");
Clazz.defineMethod (c$, "getStatusChanged", 
function (newStatusList) {
var isRemove = (newStatusList.length > 0 && newStatusList.charAt (0) == '-');
var isAdd = (newStatusList.length > 0 && newStatusList.charAt (0) == '+');
var getList = false;
if (isRemove) {
this.statusList = JU.PT.rep (this.statusList, newStatusList.substring (1, newStatusList.length), "");
} else {
newStatusList = JU.PT.rep (newStatusList, "+", "");
if (this.statusList.equals (newStatusList) || isAdd && this.statusList.indexOf (newStatusList) >= 0) {
getList = true;
} else {
if (!isAdd) this.statusList = "";
this.statusList += newStatusList;
if (JU.Logger.debugging) JU.Logger.debug ("StatusManager messageQueue = " + this.statusList);
}}var list =  new JU.Lst ();
if (getList) for (var e, $e = this.messageQueue.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) list.addLast (e.getValue ());

this.messageQueue.clear ();
this.statusPtr = 0;
return list;
}, "~S");
Clazz.defineMethod (c$, "jmolScriptCallback", 
 function (callback) {
var s = this.jmolScriptCallbacks.get (callback.name ());
if (s != null) this.vwr.evalStringQuietSync (s, true, false);
if (this.jmolScriptCallbacks.containsKey ("SYNC:" + callback.name ())) s = "SYNC";
return s;
}, "J.c.CBK");
Clazz.defineMethod (c$, "setCallbackFunction", 
function (callbackType, callbackFunction) {
var cbk = J.c.CBK.getCallback (callbackType);
if (cbk != null) {
var callback = J.c.CBK.getCallback (callbackType).name ();
JU.Logger.info ("StatusManager callback set for " + callbackType + " f=" + callbackFunction + " cb=" + callback);
var isSync = (callbackFunction != null && callbackFunction.startsWith ("SYNC:"));
if (isSync) {
if (callbackFunction.toLowerCase ().trim ().equals ("sync:off")) {
this.jmolScriptCallbacks.remove ("SYNC:" + callback);
JU.Logger.info ("SYNC callback for " + callback + " deactivated");
} else {
this.jmolScriptCallbacks.put ("SYNC:" + callback, "_");
JU.Logger.info ("SYNC callback for " + callback + " activated");
return;
}} else {
var lc = "";
var pt = (callbackFunction == null ? 0 : (lc = callbackFunction.toLowerCase ()).startsWith ("script:") ? 7 : lc.startsWith ("jmolscript:") ? 11 : 0);
if (pt == 0) {
this.jmolScriptCallbacks.remove (callback);
} else {
this.jmolScriptCallbacks.put (callback, callbackFunction.substring (pt).trim ());
}}}if (this.cbl != null) this.cbl.setCallbackFunction (callbackType, callbackFunction);
}, "~S,~S");
Clazz.defineMethod (c$, "notifyEnabled", 
function (type) {
return this.cbl != null && this.cbl.notifyEnabled (type);
}, "J.c.CBK");
Clazz.defineMethod (c$, "setStatusAppletReady", 
function (htmlName, isReady) {
var sJmol = (isReady ? this.jmolScriptCallback (J.c.CBK.APPLETREADY) : null);
if (this.notifyEnabled (J.c.CBK.APPLETREADY)) this.cbl.notifyCallback (J.c.CBK.APPLETREADY,  Clazz.newArray (-1, [sJmol, htmlName, Boolean.$valueOf (isReady), null]));
}, "~S,~B");
Clazz.defineMethod (c$, "setStatusAtomMoved", 
function (bsMoved) {
var sJmol = this.jmolScriptCallback (J.c.CBK.ATOMMOVED);
this.setStatusChanged ("atomMoved", -1, bsMoved, false);
if (this.notifyEnabled (J.c.CBK.ATOMMOVED)) this.cbl.notifyCallback (J.c.CBK.ATOMMOVED,  Clazz.newArray (-1, [sJmol, bsMoved]));
}, "JU.BS");
Clazz.defineMethod (c$, "setStatusAtomPicked", 
function (atomIndex, strInfo, map) {
var sJmol = this.jmolScriptCallback (J.c.CBK.PICK);
JU.Logger.info ("setStatusAtomPicked(" + atomIndex + "," + strInfo + ")");
this.setStatusChanged ("atomPicked", atomIndex, strInfo, false);
if (this.notifyEnabled (J.c.CBK.PICK)) this.cbl.notifyCallback (J.c.CBK.PICK,  Clazz.newArray (-1, [sJmol, strInfo, Integer.$valueOf (atomIndex), map]));
}, "~N,~S,java.util.Map");
Clazz.defineMethod (c$, "setStatusClicked", 
function (x, y, action, clickCount, mode) {
var sJmol = this.jmolScriptCallback (J.c.CBK.CLICK);
if (!this.notifyEnabled (J.c.CBK.CLICK)) return action;
var m =  Clazz.newIntArray (-1, [action, mode]);
this.cbl.notifyCallback (J.c.CBK.CLICK,  Clazz.newArray (-1, [sJmol, Integer.$valueOf (x), Integer.$valueOf (y), Integer.$valueOf (action), Integer.$valueOf (clickCount), m]));
return m[0];
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setStatusResized", 
function (width, height) {
var sJmol = this.jmolScriptCallback (J.c.CBK.RESIZE);
if (this.notifyEnabled (J.c.CBK.RESIZE)) this.cbl.notifyCallback (J.c.CBK.RESIZE,  Clazz.newArray (-1, [sJmol, Integer.$valueOf (width), Integer.$valueOf (height)]));
}, "~N,~N");
Clazz.defineMethod (c$, "haveHoverCallback", 
function () {
return (this.jmolScriptCallbacks.containsKey (J.c.CBK.HOVER) || this.notifyEnabled (J.c.CBK.HOVER));
});
Clazz.defineMethod (c$, "setStatusAtomHovered", 
function (iatom, strInfo) {
var sJmol = this.jmolScriptCallback (J.c.CBK.HOVER);
if (this.notifyEnabled (J.c.CBK.HOVER)) this.cbl.notifyCallback (J.c.CBK.HOVER,  Clazz.newArray (-1, [sJmol, strInfo, Integer.$valueOf (iatom)]));
}, "~N,~S");
Clazz.defineMethod (c$, "setStatusObjectHovered", 
function (id, strInfo, pt) {
var sJmol = this.jmolScriptCallback (J.c.CBK.HOVER);
if (this.notifyEnabled (J.c.CBK.HOVER)) this.cbl.notifyCallback (J.c.CBK.HOVER,  Clazz.newArray (-1, [sJmol, strInfo, Integer.$valueOf (-1), id, Float.$valueOf (pt.x), Float.$valueOf (pt.y), Float.$valueOf (pt.z)]));
}, "~S,~S,JU.T3");
Clazz.defineMethod (c$, "showImage", 
function (title, image) {
var a = JU.PT.split (title, "\1");
title = (a.length < 2 ? "Jmol" : a.length < 3 || a[2].equals ("null") ? a[1].substring (a[1].lastIndexOf ("/") + 1) : a[2]);
var sJmol = this.jmolScriptCallback (J.c.CBK.IMAGE);
if (this.notifyEnabled (J.c.CBK.IMAGE)) this.cbl.notifyCallback (J.c.CBK.IMAGE,  Clazz.newArray (-1, [sJmol, title, image]));
if (Boolean.TRUE.equals (image)) {
if (this.imageMap == null) return;
var lst =  new JU.Lst ();
for (var key, $key = this.imageMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) lst.addLast (key);

for (var i = lst.size (); --i >= 0; ) this.imageMap.get (lst.get (i)).closeMe ();

return;
}if (this.imageMap == null) this.imageMap =  new java.util.Hashtable ();
var d = this.imageMap.get (title);
if (Boolean.FALSE.equals (image)) {
if (d != null) d.closeMe ();
return;
}if (d == null && image != null) d = this.vwr.apiPlatform.getImageDialog (title, this.imageMap);
if (d == null) return;
if (image == null) d.closeMe ();
 else d.setImage (image);
}, "~S,~O");
Clazz.defineMethod (c$, "setFileLoadStatus", 
function (fullPathName, fileName, modelName, errorMsg, ptLoad, doCallback, isAsync) {
if (fullPathName == null && "resetUndo".equals (fileName)) {
var appConsole = this.vwr.getProperty ("DATA_API", "getAppConsole", null);
if (appConsole != null) appConsole.zap ();
fileName = this.vwr.getZapName ();
}this.setStatusChanged ("fileLoaded", ptLoad, fullPathName, false);
if (errorMsg != null) this.setStatusChanged ("fileLoadError", ptLoad, errorMsg, false);
var sJmol = this.jmolScriptCallback (J.c.CBK.LOADSTRUCT);
if (doCallback && this.notifyEnabled (J.c.CBK.LOADSTRUCT)) {
var name = this.vwr.getP ("_smilesString");
if (name.length != 0) fileName = name;
this.cbl.notifyCallback (J.c.CBK.LOADSTRUCT,  Clazz.newArray (-1, [sJmol, fullPathName, fileName, modelName, errorMsg, Integer.$valueOf (ptLoad), this.vwr.getP ("_modelNumber"), this.vwr.getModelNumberDotted (this.vwr.ms.mc - 1), isAsync]));
}}, "~S,~S,~S,~S,~N,~B,Boolean");
Clazz.defineMethod (c$, "setStatusFrameChanged", 
function (fileNo, modelNo, firstNo, lastNo, currentFrame, currentMorphModel, entryName) {
if (this.vwr.ms == null) return;
var animating = this.vwr.am.animationOn;
var frameNo = (animating ? -2 - currentFrame : currentFrame);
this.setStatusChanged ("frameChanged", frameNo, (currentFrame >= 0 ? this.vwr.getModelNumberDotted (currentFrame) : ""), false);
var sJmol = this.jmolScriptCallback (J.c.CBK.ANIMFRAME);
if (this.notifyEnabled (J.c.CBK.ANIMFRAME)) this.cbl.notifyCallback (J.c.CBK.ANIMFRAME,  Clazz.newArray (-1, [sJmol,  Clazz.newIntArray (-1, [frameNo, fileNo, modelNo, firstNo, lastNo, currentFrame]), entryName, Float.$valueOf (currentMorphModel)]));
if (!animating) this.vwr.checkMenuUpdate ();
}, "~N,~N,~N,~N,~N,~N,~S");
Clazz.defineMethod (c$, "setStatusDragDropped", 
function (mode, x, y, fileName) {
this.setStatusChanged ("dragDrop", 0, "", false);
var sJmol = this.jmolScriptCallback (J.c.CBK.DRAGDROP);
if (!this.notifyEnabled (J.c.CBK.DRAGDROP)) return false;
this.cbl.notifyCallback (J.c.CBK.DRAGDROP,  Clazz.newArray (-1, [sJmol, Integer.$valueOf (mode), Integer.$valueOf (x), Integer.$valueOf (y), fileName]));
return true;
}, "~N,~N,~N,~S");
Clazz.defineMethod (c$, "setScriptEcho", 
function (strEcho, isScriptQueued) {
if (strEcho == null) return;
this.setStatusChanged ("scriptEcho", 0, strEcho, false);
var sJmol = this.jmolScriptCallback (J.c.CBK.ECHO);
if (this.notifyEnabled (J.c.CBK.ECHO)) this.cbl.notifyCallback (J.c.CBK.ECHO,  Clazz.newArray (-1, [sJmol, strEcho, Integer.$valueOf (isScriptQueued ? 1 : 0)]));
}, "~S,~B");
Clazz.defineMethod (c$, "setStatusMeasuring", 
function (status, intInfo, strMeasure, value) {
this.setStatusChanged (status, intInfo, strMeasure, false);
var sJmol = null;
if (status.equals ("measureCompleted")) {
JU.Logger.info ("measurement[" + intInfo + "] = " + strMeasure);
sJmol = this.jmolScriptCallback (J.c.CBK.MEASURE);
} else if (status.equals ("measurePicked")) {
this.setStatusChanged ("measurePicked", intInfo, strMeasure, false);
JU.Logger.info ("measurePicked " + intInfo + " " + strMeasure);
}if (this.notifyEnabled (J.c.CBK.MEASURE)) this.cbl.notifyCallback (J.c.CBK.MEASURE,  Clazz.newArray (-1, [sJmol, strMeasure, Integer.$valueOf (intInfo), status, Float.$valueOf (value)]));
}, "~S,~N,~S,~N");
Clazz.defineMethod (c$, "notifyError", 
function (errType, errMsg, errMsgUntranslated) {
var sJmol = this.jmolScriptCallback (J.c.CBK.ERROR);
if (this.notifyEnabled (J.c.CBK.ERROR)) this.cbl.notifyCallback (J.c.CBK.ERROR,  Clazz.newArray (-1, [sJmol, errType, errMsg, this.vwr.getShapeErrorState (), errMsgUntranslated]));
}, "~S,~S,~S");
Clazz.defineMethod (c$, "notifyMinimizationStatus", 
function (minStatus, minSteps, minEnergy, minEnergyDiff, ff) {
var sJmol = this.jmolScriptCallback (J.c.CBK.MINIMIZATION);
if (this.notifyEnabled (J.c.CBK.MINIMIZATION)) this.cbl.notifyCallback (J.c.CBK.MINIMIZATION,  Clazz.newArray (-1, [sJmol, minStatus, minSteps, minEnergy, minEnergyDiff, ff]));
}, "~S,Integer,Float,Float,~S");
Clazz.defineMethod (c$, "setScriptStatus", 
function (strStatus, statusMessage, msWalltime, strErrorMessageUntranslated) {
if (msWalltime < -1) {
var iscript = -2 - msWalltime;
this.setStatusChanged ("scriptStarted", iscript, statusMessage, false);
strStatus = "script " + iscript + " started";
} else if (strStatus == null) {
return;
}var sJmol = (msWalltime == 0 ? this.jmolScriptCallback (J.c.CBK.SCRIPT) : null);
var isScriptCompletion = (strStatus === "Script completed");
if (this.recordStatus ("script")) {
var isError = (strErrorMessageUntranslated != null);
this.setStatusChanged ((isError ? "scriptError" : "scriptStatus"), 0, strStatus, false);
if (isError || isScriptCompletion) this.setStatusChanged ("scriptTerminated", 1, "Jmol script terminated" + (isError ? " unsuccessfully: " + strStatus : " successfully"), false);
}if (isScriptCompletion && this.vwr.getBoolean (603979879) && this.vwr.getBoolean (603979825)) strStatus = this.vwr.getChimeMessenger ().scriptCompleted (this, statusMessage, strErrorMessageUntranslated);
var data =  Clazz.newArray (-1, [sJmol, strStatus, statusMessage, Integer.$valueOf (isScriptCompletion ? -1 : msWalltime), strErrorMessageUntranslated]);
if (this.notifyEnabled (J.c.CBK.SCRIPT)) this.cbl.notifyCallback (J.c.CBK.SCRIPT, data);
this.processScript (data);
}, "~S,~S,~N,~S");
Clazz.defineMethod (c$, "processScript", 
function (data) {
var msWalltime = (data[3]).intValue ();
this.vwr.notifyScriptEditor (msWalltime, data);
if (msWalltime == 0) this.vwr.sendConsoleMessage (data[1] == null ? null : data[1].toString ());
}, "~A");
Clazz.defineMethod (c$, "doSync", 
function () {
return (this.isSynced && this.drivingSync && !this.syncDisabled);
});
Clazz.defineMethod (c$, "setSync", 
function (mouseCommand) {
if (this.syncingMouse) {
if (mouseCommand != null) this.syncSend (mouseCommand, "*", 0);
} else if (!this.syncingScripts) this.syncSend ("!" + this.vwr.tm.getMoveToText (this.minSyncRepeatMs / 1000, false), "*", 0);
}, "~S");
Clazz.defineMethod (c$, "setSyncDriver", 
function (syncMode) {
if (this.stereoSync && syncMode != 4) {
this.syncSend ("SET_GRAPHICS_OFF", "*", 0);
this.stereoSync = false;
}switch (syncMode) {
case 4:
if (!this.syncDisabled) return;
this.syncDisabled = false;
break;
case 3:
this.syncDisabled = true;
break;
case 5:
this.drivingSync = true;
this.isSynced = true;
this.stereoSync = true;
break;
case 1:
this.drivingSync = true;
this.isSynced = true;
break;
case 2:
this.drivingSync = false;
this.isSynced = true;
break;
default:
this.drivingSync = false;
this.isSynced = false;
}
if (JU.Logger.debugging) {
JU.Logger.debug (this.vwr.appletName + " sync mode=" + syncMode + "; synced? " + this.isSynced + "; driving? " + this.drivingSync + "; disabled? " + this.syncDisabled);
}}, "~N");
Clazz.defineMethod (c$, "syncSend", 
function (script, appletNameOrProp, port) {
if (port != 0 || this.notifyEnabled (J.c.CBK.SYNC)) {
var o =  Clazz.newArray (-1, [null, script, appletNameOrProp, Integer.$valueOf (port)]);
if (this.cbl != null) this.cbl.notifyCallback (J.c.CBK.SYNC, o);
return o[0];
}return null;
}, "~S,~O,~N");
Clazz.defineMethod (c$, "modifySend", 
function (atomIndex, modelIndex, mode, msg) {
var sJmol = this.jmolScriptCallback (J.c.CBK.STRUCTUREMODIFIED);
if (this.notifyEnabled (J.c.CBK.STRUCTUREMODIFIED)) this.cbl.notifyCallback (J.c.CBK.STRUCTUREMODIFIED,  Clazz.newArray (-1, [sJmol, Integer.$valueOf (mode), Integer.$valueOf (atomIndex), Integer.$valueOf (modelIndex), msg]));
}, "~N,~N,~N,~S");
Clazz.defineMethod (c$, "processService", 
function (info) {
var s = info.get ("service");
if (s == null) return null;
if (Clazz.instanceOf (s, JS.SV)) {
var m =  new java.util.Hashtable ();
for (var e, $e = info.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) m.put (e.getKey (), JS.SV.oValue (e.getValue ()));

info = m;
}if (this.notifyEnabled (J.c.CBK.SERVICE)) this.cbl.notifyCallback (J.c.CBK.SERVICE,  Clazz.newArray (-1, [null, info]));
return info;
}, "java.util.Map");
Clazz.defineMethod (c$, "getSyncMode", 
function () {
return (!this.isSynced ? 0 : this.drivingSync ? 1 : 2);
});
Clazz.defineMethod (c$, "showUrl", 
function (urlString) {
if (this.jsl != null) this.jsl.showUrl (urlString);
}, "~S");
Clazz.defineMethod (c$, "clearConsole", 
function () {
this.vwr.sendConsoleMessage (null);
if (this.jsl != null) this.cbl.notifyCallback (J.c.CBK.MESSAGE, null);
});
Clazz.defineMethod (c$, "functionXY", 
function (functionName, nX, nY) {
return (this.jsl == null ?  Clazz.newFloatArray (Math.abs (nX), Math.abs (nY), 0) : this.jsl.functionXY (functionName, nX, nY));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "functionXYZ", 
function (functionName, nX, nY, nZ) {
return (this.jsl == null ?  Clazz.newFloatArray (Math.abs (nX), Math.abs (nY), Math.abs (nY), 0) : this.jsl.functionXYZ (functionName, nX, nY, nZ));
}, "~S,~N,~N,~N");
Clazz.defineMethod (c$, "jsEval", 
function (strEval) {
return (this.jsl == null ? "" : this.jsl.eval (strEval));
}, "~S");
Clazz.defineMethod (c$, "createImage", 
function (fileNameOrError, type, text, bytes, quality) {
return (this.jsl == null ? null : this.jsl.createImage (fileNameOrError, type, text == null ? bytes : text, quality));
}, "~S,~S,~S,~A,~N");
Clazz.defineMethod (c$, "getRegistryInfo", 
function () {
return (this.jsl == null ? null : this.jsl.getRegistryInfo ());
});
Clazz.defineMethod (c$, "dialogAsk", 
function (type, fileName, params) {
var isImage = type.equals ("Save Image");
var sd = J.api.Interface.getOption ("dialog.Dialog", this.vwr, "status");
if (sd == null) return null;
sd.setupUI (false);
if (isImage) sd.setImageInfo (this.qualityJPG, this.qualityPNG, this.imageType);
var outputFileName = sd.getFileNameFromDialog (this.vwr, type, fileName);
if (isImage && outputFileName != null) {
this.qualityJPG = sd.getQuality ("JPG");
this.qualityPNG = sd.getQuality ("PNG");
var sType = sd.getType ();
if (params != null) {
params.put ("qualityJPG", Integer.$valueOf (this.qualityJPG));
params.put ("qualityPNG", Integer.$valueOf (this.qualityPNG));
if (sType != null) params.put ("dialogImageType", sType);
}if (sType != null) this.imageType = sType;
}return outputFileName;
}, "~S,~S,java.util.Map");
Clazz.defineMethod (c$, "getJspecViewProperties", 
function (myParam) {
return (this.jsl == null ? null : this.jsl.getJSpecViewProperty (myParam == null || myParam.length == 0 ? "" : ":" + myParam));
}, "~S");
Clazz.defineMethod (c$, "resizeInnerPanel", 
function (width, height) {
return (this.jsl == null || width == this.vwr.getScreenWidth () && height == this.vwr.getScreenHeight () ?  Clazz.newIntArray (-1, [width, height]) : this.jsl.resizeInnerPanel ("preferredWidthHeight " + width + " " + height + ";"));
}, "~N,~N");
Clazz.defineMethod (c$, "resizeInnerPanelString", 
function (data) {
if (this.jsl != null) this.jsl.resizeInnerPanel (data);
}, "~S");
Clazz.defineMethod (c$, "registerAudio", 
function (id, htParams) {
this.stopAudio (id);
if (this.audios == null) this.audios =  new java.util.Hashtable ();
if (htParams == null) this.audios.remove (id);
 else this.audios.put (id, htParams.get ("audioPlayer"));
}, "~S,java.util.Map");
Clazz.defineMethod (c$, "stopAudio", 
 function (id) {
if (this.audios == null) return;
var player = this.audios.get (id);
if (player != null) player.action ("kill");
}, "~S");
Clazz.defineMethod (c$, "playAudio", 
function (htParams) {
if (!this.vwr.getBoolean (603979797)) {
if (htParams == null) return;
htParams.put ("status", "close");
JU.Logger.info ("allowAudio is set false");
this.notifyAudioStatus (htParams);
return;
}try {
var action = (htParams == null ? "close" : htParams.get ("action"));
var id = (htParams == null ? null : htParams.get ("id"));
if (action != null && action.length > 0) {
if (id == null || id.length == 0) {
if (this.audios == null || this.audios.isEmpty ()) return;
if (action.equals ("close")) {
for (var key, $key = this.audios.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
var player = this.audios.remove (key);
player.action ("close");
}
}return;
}var player = this.audios.get (id);
if (player != null) {
player.action (action);
return;
}}try {
(J.api.Interface.getInterface ("JU.JmolAudio", this.vwr, "script")).playAudio (this.vwr, htParams);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.info (e.getMessage ());
} else {
throw e;
}
}
} catch (t) {
}
}, "java.util.Map");
Clazz.defineMethod (c$, "notifyAudioStatus", 
function (htParams) {
var status = htParams.get ("status");
System.out.println (status);
var script = htParams.get (status);
if (script != null) this.vwr.script (script);
if (status === "ended") this.registerAudio (htParams.get ("id"), null);
var sJmol = this.jmolScriptCallback (J.c.CBK.AUDIO);
if (this.notifyEnabled (J.c.CBK.AUDIO)) this.cbl.notifyCallback (J.c.CBK.AUDIO,  Clazz.newArray (-1, [sJmol, htParams]));
}, "java.util.Map");
Clazz.defineMethod (c$, "syncScript", 
function (script, applet, port) {
if ("GET_GRAPHICS".equalsIgnoreCase (script)) {
this.setSyncDriver (5);
this.syncSend (script, applet, 0);
this.vwr.setBooleanProperty ("_syncMouse", false);
this.vwr.setBooleanProperty ("_syncScript", false);
return;
}if ("=".equals (applet)) {
applet = "~";
this.setSyncDriver (2);
}var disableSend = "~".equals (applet);
if (port > 0 || !disableSend && !".".equals (applet)) {
this.syncSend (script, applet, port);
if (!"*".equals (applet) || script.startsWith ("{")) return;
}if (script.equalsIgnoreCase ("on") || script.equalsIgnoreCase ("true")) {
this.setSyncDriver (1);
return;
}if (script.equalsIgnoreCase ("off") || script.equalsIgnoreCase ("false")) {
this.setSyncDriver (0);
return;
}if (script.equalsIgnoreCase ("slave")) {
this.setSyncDriver (2);
return;
}var syncMode = this.getSyncMode ();
if (syncMode == 0) return;
if (syncMode != 1) disableSend = false;
if (JU.Logger.debugging) JU.Logger.debug (this.vwr.htmlName + " syncing with script: " + script);
if (disableSend) this.setSyncDriver (3);
if (script.indexOf ("Mouse: ") != 0) {
var serviceMode = JV.JC.getServiceCommand (script);
switch (serviceMode) {
case 70:
case 42:
case 49:
case 56:
case 63:
this.syncSend (script, ".", port);
return;
case -1:
break;
case 0:
case 77:
case 28:
case 35:
if (disableSend) return;
case 21:
case 7:
case 14:
if ((script = this.vwr.getJSV ().processSync (script, serviceMode)) == null) return;
}
this.vwr.evalStringQuietSync (script, true, false);
return;
}this.mouseScript (script);
if (disableSend) this.vwr.setSyncDriver (4);
}, "~S,~S,~N");
Clazz.defineMethod (c$, "mouseScript", 
function (script) {
var tokens = JU.PT.getTokens (script);
var key = tokens[1];
try {
key = (key.toLowerCase () + "...............").substring (0, 15);
switch (("zoombyfactor...zoomby.........rotatezby......rotatexyby.....translatexyby..rotatemolecule.spinxyby.......rotatearcball..").indexOf (key)) {
case 0:
switch (tokens.length) {
case 3:
this.vwr.zoomByFactor (JU.PT.parseFloat (tokens[2]), 2147483647, 2147483647);
return;
case 5:
this.vwr.zoomByFactor (JU.PT.parseFloat (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseInt (tokens[4]));
return;
}
break;
case 15:
switch (tokens.length) {
case 3:
this.vwr.zoomBy (JU.PT.parseInt (tokens[2]));
return;
}
break;
case 30:
switch (tokens.length) {
case 3:
this.vwr.rotateZBy (JU.PT.parseInt (tokens[2]), 2147483647, 2147483647);
return;
case 5:
this.vwr.rotateZBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseInt (tokens[4]));
}
break;
case 45:
this.vwr.rotateXYBy (JU.PT.parseFloat (tokens[2]), JU.PT.parseFloat (tokens[3]));
return;
case 60:
this.vwr.translateXYBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]));
return;
case 75:
this.vwr.rotateSelected (JU.PT.parseFloat (tokens[2]), JU.PT.parseFloat (tokens[3]), null);
return;
case 90:
this.vwr.spinXYBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseFloat (tokens[4]));
return;
case 105:
this.vwr.rotateXYBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]));
return;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.vwr.showString ("error reading SYNC command: " + script, false);
}, "~S");
Clazz.defineStatics (c$,
"MAXIMUM_QUEUE_LENGTH", 16,
"SYNC_OFF", 0,
"SYNC_DRIVER", 1,
"SYNC_SLAVE", 2,
"SYNC_DISABLE", 3,
"SYNC_ENABLE", 4,
"SYNC_STEREO", 5);
});
