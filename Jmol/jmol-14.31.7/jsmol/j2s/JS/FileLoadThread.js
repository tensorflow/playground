Clazz.declarePackage ("JS");
Clazz.load (["J.thread.JmolThread"], "JS.FileLoadThread", ["JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fileName = null;
this.cacheName = null;
this.key = null;
Clazz.instantialize (this, arguments);
}, JS, "FileLoadThread", J.thread.JmolThread);
Clazz.makeConstructor (c$, 
function (eval, vwr, fileName, key, cacheName) {
this.setViewer (vwr, "FileLoadThread");
this.fileName = fileName;
this.key = key;
this.cacheName = cacheName;
this.setEval (eval);
this.sc.pc--;
}, "J.api.JmolScriptEvaluator,JV.Viewer,~S,~S,~S");
Clazz.overrideMethod (c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
mode = 0;
break;
case 0:
if (this.stopped || !this.vwr.testAsync && this.eval.isStopped ()) {
mode = -2;
break;
}if (JV.Viewer.jmolObject != null) JV.Viewer.jmolObject.loadFileAsynchronously (this, this.vwr.html5Applet, this.fileName, null);
{
}return;
case 1:
var data = this.vwr.fm.getFileAsBytes (this.fileName, null);
this.setData (this.fileName, this.fileName, data, null);
return;
case -2:
this.resumeEval ();
return;
}

}, "~N");
Clazz.defineMethod (c$, "setData", 
function (fileName, fileName0, data, myData) {
var isCanceled = fileName.equals ("#CANCELED#");
this.sc.parentContext.htFileCache.put (this.key, (isCanceled ? fileName : (this.cacheName = this.cacheName.substring (0, this.cacheName.lastIndexOf ("_") + 1) + fileName)));
this.vwr.cachePut (this.cacheName, data);
if (fileName0 != null) {
this.vwr.cachePut (this.vwr.fm.getFilePath (fileName, true, false), data);
}this.run1 (-2);
}, "~S,~S,~O,~O");
});
