Clazz.declarePackage ("J.io");
Clazz.load (["J.api.JmolFilesReaderInterface"], "J.io.FilesReader", ["java.io.BufferedInputStream", "$.BufferedReader", "javajs.api.GenericBinaryDocument", "JU.PT", "$.Rdr", "J.api.Interface", "J.io.FileReader", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fm = null;
this.vwr = null;
this.fullPathNamesIn = null;
this.namesAsGivenIn = null;
this.fileTypesIn = null;
this.atomSetCollection = null;
this.dataReaders = null;
this.htParams = null;
this.isAppend = false;
Clazz.instantialize (this, arguments);
}, J.io, "FilesReader", null, J.api.JmolFilesReaderInterface);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (fileManager, vwr, name, nameAsGiven, types, readers, htParams, isAppend) {
this.fm = fileManager;
this.vwr = vwr;
this.fullPathNamesIn = name;
this.namesAsGivenIn = nameAsGiven;
this.fileTypesIn = types;
this.dataReaders = readers;
this.htParams = htParams;
this.isAppend = isAppend;
}, "JV.FileManager,JV.Viewer,~A,~A,~A,~A,java.util.Map,~B");
Clazz.overrideMethod (c$, "run", 
function () {
if (!this.isAppend && this.vwr.displayLoadErrors) this.vwr.zap (false, true, false);
var getReadersOnly = !this.vwr.displayLoadErrors;
this.atomSetCollection = this.vwr.getModelAdapter ().getAtomSetCollectionReaders (this, this.fullPathNamesIn, this.fileTypesIn, this.htParams, getReadersOnly);
this.dataReaders = null;
if (getReadersOnly && !(Clazz.instanceOf (this.atomSetCollection, String))) {
this.atomSetCollection = this.vwr.getModelAdapter ().getAtomSetCollectionFromSet (this.atomSetCollection, null, this.htParams);
}if (Clazz.instanceOf (this.atomSetCollection, String)) {
JU.Logger.error ("file ERROR: " + this.atomSetCollection);
return;
}if (!this.isAppend && !this.vwr.displayLoadErrors) this.vwr.zap (false, true, false);
this.fm.setFileInfo ( Clazz.newArray (-1, [this.dataReaders == null ? this.fullPathNamesIn[0] : "String[]"]));
});
Clazz.overrideMethod (c$, "getBufferedReaderOrBinaryDocument", 
function (i, forceBinary) {
if (this.dataReaders != null) return (forceBinary ? null : this.dataReaders[i].getBufferedReader ());
var name = this.fullPathNamesIn[i];
var subFileList = null;
this.htParams.remove ("subFileList");
if (name.indexOf ("|") >= 0 && !this.htParams.containsKey ("isStateScript")) {
subFileList = JU.PT.split (name, "|");
name = subFileList[0];
}if (name.contains ("#_DOCACHE_")) return J.io.FileReader.getChangeableReader (this.vwr, this.namesAsGivenIn[i], name);
var t = this.fm.getUnzippedReaderOrStreamFromName (name, null, true, forceBinary, false, true, this.htParams);
if (Clazz.instanceOf (t, java.io.BufferedInputStream) && JU.Rdr.isZipS (t)) {
if (subFileList != null) this.htParams.put ("subFileList", subFileList);
var zipDirectory = this.fm.getZipDirectory (name, true, true);
t = this.fm.getBufferedInputStreamOrErrorMessageFromName (name, this.fullPathNamesIn[i], false, false, null, false, true);
t = this.fm.getJzu ().getAtomSetCollectionOrBufferedReaderFromZip (this.vwr, t, name, zipDirectory, this.htParams, 1, true);
}return (Clazz.instanceOf (t, java.io.BufferedInputStream) ? (J.api.Interface.getInterface ("JU.BinaryDocument", this.vwr, "file")).setStream (t, true) : Clazz.instanceOf (t, java.io.BufferedReader) || Clazz.instanceOf (t, javajs.api.GenericBinaryDocument) ? t : t == null ? "error opening:" + this.namesAsGivenIn[i] : t);
}, "~N,~B");
Clazz.overrideMethod (c$, "getAtomSetCollection", 
function () {
return this.atomSetCollection;
});
});
