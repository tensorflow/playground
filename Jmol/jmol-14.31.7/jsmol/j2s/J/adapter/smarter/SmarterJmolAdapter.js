Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["J.api.JmolAdapter"], "J.adapter.smarter.SmarterJmolAdapter", ["java.io.BufferedReader", "$.InputStream", "javajs.api.GenericBinaryDocument", "JU.PT", "$.Rdr", "J.adapter.smarter.AtomIterator", "$.AtomSetCollection", "$.AtomSetCollectionReader", "$.BondIterator", "$.Resolver", "$.StructureIterator", "JS.SV", "JU.Logger", "JV.Viewer"], function () {
c$ = Clazz.declareType (J.adapter.smarter, "SmarterJmolAdapter", J.api.JmolAdapter);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.smarter.SmarterJmolAdapter, []);
});
Clazz.makeConstructor (c$, 
function (string) {
Clazz.superConstructor (this, J.adapter.smarter.SmarterJmolAdapter, []);
}, "~S");
Clazz.overrideMethod (c$, "getFileTypeName", 
function (ascOrReader) {
if (Clazz.instanceOf (ascOrReader, J.adapter.smarter.AtomSetCollection)) return (ascOrReader).fileTypeName;
if (Clazz.instanceOf (ascOrReader, java.io.BufferedReader)) return J.adapter.smarter.Resolver.getFileType (ascOrReader);
if (Clazz.instanceOf (ascOrReader, java.io.InputStream)) return J.adapter.smarter.Resolver.getBinaryType (ascOrReader);
return null;
}, "~O");
Clazz.overrideMethod (c$, "getAtomSetCollectionReader", 
function (name, type, bufferedReader, htParams) {
return J.adapter.smarter.SmarterJmolAdapter.staticGetAtomSetCollectionReader (name, type, bufferedReader, htParams);
}, "~S,~S,~O,java.util.Map");
c$.staticGetAtomSetCollectionReader = Clazz.defineMethod (c$, "staticGetAtomSetCollectionReader", 
function (name, type, bufferedReader, htParams) {
try {
var ret = J.adapter.smarter.Resolver.getAtomCollectionReader (name, type, bufferedReader, htParams, -1);
if (Clazz.instanceOf (ret, String)) {
try {
J.adapter.smarter.SmarterJmolAdapter.close (bufferedReader);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
} else {
(ret).setup (name, htParams, bufferedReader);
}return ret;
} catch (e) {
try {
J.adapter.smarter.SmarterJmolAdapter.close (bufferedReader);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
bufferedReader = null;
JU.Logger.error ("" + e);
return "" + e;
}
}, "~S,~S,~O,java.util.Map");
Clazz.overrideMethod (c$, "getAtomSetCollectionFromReader", 
function (fname, readerOrDocument, htParams) {
var ret = J.adapter.smarter.Resolver.getAtomCollectionReader (fname, null, readerOrDocument, htParams, -1);
if (Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollectionReader)) {
(ret).setup (fname, htParams, readerOrDocument);
return (ret).readData ();
}return "" + ret;
}, "~S,~O,java.util.Map");
Clazz.overrideMethod (c$, "getAtomSetCollection", 
function (ascReader) {
return J.adapter.smarter.SmarterJmolAdapter.staticGetAtomSetCollection (ascReader);
}, "~O");
c$.staticGetAtomSetCollection = Clazz.defineMethod (c$, "staticGetAtomSetCollection", 
function (a) {
var br = null;
try {
br = a.reader;
var ret = a.readData ();
if (!(Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollection))) return ret;
var asc = ret;
if (asc.errorMessage != null) return asc.errorMessage;
return asc;
} catch (e) {
try {
JU.Logger.info (e.toString ());
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
JU.Logger.error (e.toString ());
} else {
throw ee;
}
}
try {
br.close ();
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
br = null;
JU.Logger.error ("" + e);
return "" + e;
}
}, "J.adapter.smarter.AtomSetCollectionReader");
Clazz.overrideMethod (c$, "getAtomSetCollectionReaders", 
function (filesReader, names, types, htParams, getReadersOnly) {
var vwr = htParams.get ("vwr");
var size = names.length;
var reader = null;
if (htParams.containsKey ("concatenate")) {
var s = "";
for (var i = 0; i < size; i++) {
var name = names[i];
var f = vwr.getFileAsString3 (name, false, null);
if (i > 0 && size <= 3 && f.startsWith ("{")) {
var type = (f.contains ("version\":\"DSSR") ? "dssr" : f.contains ("/outliers/") ? "validation" : "domains");
var x = vwr.parseJSONMap (f);
if (x != null) htParams.put (type, (type.equals ("dssr") ? x : JS.SV.getVariableMap (x)));
continue;
}if (name.indexOf ("|") >= 0) name = JU.PT.rep (name, "_", "/");
if (i == 1) {
if (name.indexOf ("/rna3dhub/") >= 0) {
s += "\n_rna3d \n;" + f + "\n;\n";
continue;
}if (name.indexOf ("/dssr/") >= 0) {
s += "\n_dssr \n;" + f + "\n;\n";
continue;
}}s += f;
if (!s.endsWith ("\n")) s += "\n";
}
size = 1;
reader = JU.Rdr.getBR (s);
}var readers = (getReadersOnly ?  new Array (size) : null);
var atomsets = (getReadersOnly ? null :  new Array (size));
var r = null;
for (var i = 0; i < size; i++) {
try {
htParams.put ("vwr", vwr);
if (reader == null) reader = filesReader.getBufferedReaderOrBinaryDocument (i, false);
if (!(Clazz.instanceOf (reader, java.io.BufferedReader) || Clazz.instanceOf (reader, javajs.api.GenericBinaryDocument))) return reader;
var fullPathName = names[i];
htParams.put ("fullPathName", fullPathName);
var ret = J.adapter.smarter.Resolver.getAtomCollectionReader (names[i], (types == null ? null : types[i]), reader, htParams, i);
if (!(Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollectionReader))) return ret;
r = ret;
r.setup (null, null, null);
if (r.isBinary) {
r.setup (names[i], htParams, filesReader.getBufferedReaderOrBinaryDocument (i, true));
} else {
r.setup (names[i], htParams, reader);
}reader = null;
if (getReadersOnly) {
readers[i] = r;
} else {
ret = r.readData ();
if (!(Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollection))) return ret;
atomsets[i] = ret;
if (atomsets[i].errorMessage != null) return atomsets[i].errorMessage;
}} catch (e) {
JU.Logger.error ("" + e);
if (!JV.Viewer.isJS) e.printStackTrace ();
return "" + e;
}
}
if (getReadersOnly) return readers;
return this.getAtomSetCollectionFromSet (readers, atomsets, htParams);
}, "J.api.JmolFilesReaderInterface,~A,~A,java.util.Map,~B");
Clazz.overrideMethod (c$, "getAtomSetCollectionFromSet", 
function (readerSet, atomsets, htParams) {
var readers = readerSet;
var asc = (atomsets == null ?  new Array (readers.length) : atomsets);
if (atomsets == null) {
for (var i = 0; i < readers.length; i++) {
if (readers[i] != null) try {
var ret = readers[i].readData ();
if (!(Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollection))) return ret;
asc[i] = ret;
if (asc[i].errorMessage != null) return asc[i].errorMessage;
} catch (e) {
JU.Logger.error ("" + e);
return "" + e;
}
}
}var result;
if (htParams.containsKey ("trajectorySteps")) {
result = asc[0];
try {
if (asc.length > 1) asc[0].setInfo ("ignoreUnitCell", asc[1].atomSetInfo.get ("ignoreUnitCell"));
result.finalizeTrajectoryAs (htParams.get ("trajectorySteps"), htParams.get ("vibrationSteps"));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (result.errorMessage == null) result.errorMessage = "" + e;
} else {
throw e;
}
}
} else if (asc[0].isTrajectory) {
result = asc[0];
for (var i = 1; i < asc.length; i++) asc[0].mergeTrajectories (asc[i]);

} else {
result = (asc.length == 1 ? asc[0] :  new J.adapter.smarter.AtomSetCollection ("Array", null, asc, null));
}return (result.errorMessage == null ? result : result.errorMessage);
}, "~O,~O,java.util.Map");
Clazz.overrideMethod (c$, "getAtomSetCollectionFromDOM", 
function (DOMNode, htParams) {
try {
var ret = J.adapter.smarter.Resolver.DOMResolve (htParams);
if (!(Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollectionReader))) return ret;
var a = ret;
a.setup ("DOM node", htParams, null);
ret = a.readDataObject (DOMNode);
if (!(Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollection))) return ret;
var asc = ret;
if (asc.errorMessage != null) return asc.errorMessage;
return asc;
} catch (e) {
JU.Logger.error ("" + e);
return "" + e;
}
}, "~O,java.util.Map");
Clazz.overrideMethod (c$, "finish", 
function (asc) {
(asc).finish ();
}, "~O");
Clazz.overrideMethod (c$, "getAtomSetCollectionName", 
function (asc) {
return (asc).collectionName;
}, "~O");
Clazz.overrideMethod (c$, "getAtomSetCollectionAuxiliaryInfo", 
function (asc) {
return (asc).atomSetInfo;
}, "~O");
Clazz.overrideMethod (c$, "getAtomSetCount", 
function (asc) {
return (asc).atomSetCount;
}, "~O");
Clazz.overrideMethod (c$, "getAtomSetNumber", 
function (asc, atomSetIndex) {
return (asc).getAtomSetNumber (atomSetIndex);
}, "~O,~N");
Clazz.overrideMethod (c$, "getAtomSetName", 
function (asc, atomSetIndex) {
return (asc).getAtomSetName (atomSetIndex);
}, "~O,~N");
Clazz.overrideMethod (c$, "getAtomSetAuxiliaryInfo", 
function (asc, atomSetIndex) {
return (asc).getAtomSetAuxiliaryInfo (atomSetIndex);
}, "~O,~N");
Clazz.overrideMethod (c$, "getHydrogenAtomCount", 
function (asc) {
return (asc).getHydrogenAtomCount ();
}, "~O");
Clazz.overrideMethod (c$, "getBondList", 
function (asc) {
return (asc).getBondList ();
}, "~O");
Clazz.overrideMethod (c$, "getAtomCount", 
function (asc) {
var a = asc;
return (a.bsAtoms == null ? a.ac : a.bsAtoms.cardinality ());
}, "~O");
Clazz.overrideMethod (c$, "coordinatesAreFractional", 
function (asc) {
return (asc).coordinatesAreFractional;
}, "~O");
Clazz.overrideMethod (c$, "getAtomIterator", 
function (asc) {
return  new J.adapter.smarter.AtomIterator (asc);
}, "~O");
Clazz.overrideMethod (c$, "getBondIterator", 
function (asc) {
return  new J.adapter.smarter.BondIterator (asc);
}, "~O");
Clazz.overrideMethod (c$, "getStructureIterator", 
function (asc) {
return (asc).structureCount == 0 ? null :  new J.adapter.smarter.StructureIterator (asc);
}, "~O");
c$.close = Clazz.defineMethod (c$, "close", 
function (bufferedReader) {
if (Clazz.instanceOf (bufferedReader, java.io.BufferedReader)) (bufferedReader).close ();
 else (bufferedReader).close ();
}, "~O");
Clazz.defineStatics (c$,
"PATH_KEY", ".PATH");
c$.PATH_SEPARATOR = c$.prototype.PATH_SEPARATOR = System.getProperty ("path.separator", "/");
});
