Clazz.declarePackage ("JV");
Clazz.load (null, "JV.ModelManager", ["JM.ModelLoader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.modelSet = null;
this.modelSetPathName = null;
this.fileName = null;
Clazz.instantialize (this, arguments);
}, JV, "ModelManager");
Clazz.makeConstructor (c$, 
function (vwr) {
this.vwr = vwr;
}, "JV.Viewer");
Clazz.defineMethod (c$, "zap", 
function () {
this.modelSetPathName = this.fileName = null;
 new JM.ModelLoader (this.vwr, this.vwr.getZapName (), null, null, null, null);
});
Clazz.defineMethod (c$, "createModelSet", 
function (fullPathName, fileName, loadScript, atomSetCollection, bsNew, isAppend) {
var modelSetName = null;
if (isAppend) {
modelSetName = this.modelSet.modelSetName;
if (modelSetName.equals ("zapped")) modelSetName = null;
 else if (modelSetName.indexOf (" (modified)") < 0) modelSetName += " (modified)";
} else if (atomSetCollection == null) {
this.zap ();
} else {
this.modelSetPathName = fullPathName;
this.fileName = fileName;
}if (atomSetCollection != null) {
if (modelSetName == null) {
modelSetName = this.vwr.getModelAdapter ().getAtomSetCollectionName (atomSetCollection);
if (modelSetName != null) {
modelSetName = modelSetName.trim ();
if (modelSetName.length == 0) modelSetName = null;
}if (modelSetName == null) modelSetName = JV.ModelManager.reduceFilename (fileName);
} new JM.ModelLoader (this.vwr, modelSetName, loadScript, atomSetCollection, (isAppend ? this.modelSet : null), bsNew);
}if (this.modelSet.ac == 0 && !this.modelSet.getMSInfoB ("isPyMOL")) this.zap ();
}, "~S,~S,JU.SB,~O,JU.BS,~B");
c$.reduceFilename = Clazz.defineMethod (c$, "reduceFilename", 
 function (fileName) {
if (fileName == null) return null;
var ichDot = fileName.indexOf ('.');
if (ichDot > 0) fileName = fileName.substring (0, ichDot);
if (fileName.length > 24) fileName = fileName.substring (0, 20) + " ...";
return fileName;
}, "~S");
Clazz.defineMethod (c$, "createAtomDataSet", 
function (atomSetCollection, tokType) {
return JM.ModelLoader.createAtomDataSet (this.vwr, this.modelSet, tokType, atomSetCollection, this.vwr.bsA ());
}, "~O,~N");
});
