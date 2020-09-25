Clazz.declarePackage ("J.io");
Clazz.load (null, "J.io.FileReader", ["java.io.BufferedInputStream", "$.BufferedReader", "$.Reader", "javajs.api.GenericBinaryDocument", "$.ZInputStream", "JU.AU", "$.PT", "$.Rdr", "J.api.Interface", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.fileNameIn = null;
this.fullPathNameIn = null;
this.nameAsGivenIn = null;
this.fileTypeIn = null;
this.atomSetCollection = null;
this.readerOrDocument = null;
this.htParams = null;
this.isAppend = false;
this.bytesOrStream = null;
Clazz.instantialize (this, arguments);
}, J.io, "FileReader");
Clazz.makeConstructor (c$, 
function (vwr, fileName, fullPathName, nameAsGiven, type, reader, htParams, isAppend) {
this.vwr = vwr;
this.fileNameIn = (fileName == null ? fullPathName : fileName);
this.fullPathNameIn = (fullPathName == null ? this.fileNameIn : fullPathName);
this.nameAsGivenIn = (nameAsGiven == null ? this.fileNameIn : nameAsGiven);
this.fileTypeIn = type;
if (reader != null) {
if (JU.AU.isAB (reader) || Clazz.instanceOf (reader, java.io.BufferedInputStream)) {
this.bytesOrStream = reader;
reader = null;
} else if (Clazz.instanceOf (reader, java.io.Reader) && !(Clazz.instanceOf (reader, java.io.BufferedReader))) {
reader =  new java.io.BufferedReader (reader);
}}this.readerOrDocument = reader;
this.htParams = htParams;
this.isAppend = isAppend;
}, "JV.Viewer,~S,~S,~S,~S,~O,java.util.Map,~B");
Clazz.defineMethod (c$, "run", 
function () {
if (!this.isAppend && this.vwr.displayLoadErrors) this.vwr.zap (false, true, false);
var errorMessage = null;
var t = null;
if (this.fullPathNameIn.contains ("#_DOCACHE_")) this.readerOrDocument = J.io.FileReader.getChangeableReader (this.vwr, this.nameAsGivenIn, this.fullPathNameIn);
if (this.readerOrDocument == null) {
t = this.vwr.fm.getUnzippedReaderOrStreamFromName (this.fullPathNameIn, this.bytesOrStream, true, false, false, true, this.htParams);
if (t == null || Clazz.instanceOf (t, String)) {
errorMessage = (t == null ? "error opening:" + this.nameAsGivenIn : t);
if (!errorMessage.startsWith ("NOTE:")) JU.Logger.error ("file ERROR: " + this.fullPathNameIn + "\n" + errorMessage);
this.atomSetCollection = errorMessage;
return;
}if (Clazz.instanceOf (t, java.io.BufferedReader)) {
this.readerOrDocument = t;
} else if (Clazz.instanceOf (t, javajs.api.ZInputStream)) {
var name = this.fullPathNameIn;
var subFileList = null;
name = name.$replace ('\\', '/');
if (name.indexOf ("|") >= 0 && !name.endsWith (".zip")) {
subFileList = JU.PT.split (name, "|");
name = subFileList[0];
}if (subFileList != null) this.htParams.put ("subFileList", subFileList);
var zis = t;
var zipDirectory = this.vwr.fm.getZipDirectory (name, true, true);
this.atomSetCollection = t = this.vwr.fm.getJzu ().getAtomSetCollectionOrBufferedReaderFromZip (this.vwr, zis, name, zipDirectory, this.htParams, 1, false);
try {
zis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}}if (Clazz.instanceOf (t, java.io.BufferedInputStream)) this.readerOrDocument = (J.api.Interface.getInterface ("JU.BinaryDocument", this.vwr, "file")).setStream (t, !this.htParams.containsKey ("isLittleEndian"));
if (this.readerOrDocument != null) {
this.atomSetCollection = this.vwr.getModelAdapter ().getAtomSetCollectionReader (this.fullPathNameIn, this.fileTypeIn, this.readerOrDocument, this.htParams);
if (!(Clazz.instanceOf (this.atomSetCollection, String))) this.atomSetCollection = this.vwr.getModelAdapter ().getAtomSetCollection (this.atomSetCollection);
try {
if (Clazz.instanceOf (this.readerOrDocument, java.io.BufferedReader)) (this.readerOrDocument).close ();
 else if (Clazz.instanceOf (this.readerOrDocument, javajs.api.GenericBinaryDocument)) (this.readerOrDocument).close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}if (Clazz.instanceOf (this.atomSetCollection, String)) return;
if (!this.isAppend && !this.vwr.displayLoadErrors) this.vwr.zap (false, true, false);
this.vwr.fm.setFileInfo ( Clazz.newArray (-1, [this.fullPathNameIn, this.fileNameIn, this.nameAsGivenIn]));
});
c$.getChangeableReader = Clazz.defineMethod (c$, "getChangeableReader", 
function (vwr, nameAsGivenIn, fullPathNameIn) {
return JU.Rdr.getBR (vwr.getLigandModel (nameAsGivenIn, fullPathNameIn, "_file", null));
}, "JV.Viewer,~S,~S");
Clazz.defineMethod (c$, "getAtomSetCollection", 
function () {
return this.atomSetCollection;
});
});
