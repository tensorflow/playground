Clazz.declarePackage ("JV");
Clazz.load (["JV.OutputManager"], "JV.OutputManagerJS", ["JU.OC"], function () {
c$ = Clazz.declareType (JV, "OutputManagerJS", JV.OutputManager);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JV.OutputManagerJS, []);
});
Clazz.overrideMethod (c$, "getLogPath", 
function (fileName) {
return fileName;
}, "~S");
Clazz.overrideMethod (c$, "clipImageOrPasteText", 
function (text) {
return "Clipboard not available";
}, "~S");
Clazz.overrideMethod (c$, "getClipboardText", 
function () {
return "Clipboard not available";
});
Clazz.overrideMethod (c$, "openOutputChannel", 
function (privateKey, fileName, asWriter, asAppend) {
return ( new JU.OC ()).setParams (this.vwr.fm, fileName, asWriter, null);
}, "~N,~S,~B,~B");
Clazz.overrideMethod (c$, "createSceneSet", 
function (sceneFile, type, width, height) {
return "ERROR: Not Available";
}, "~S,~S,~N,~N");
});
