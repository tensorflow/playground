Clazz.declarePackage ("J.adapter.readers.spartan");
Clazz.load (null, "J.adapter.readers.spartan.SpartanUtil", ["java.io.BufferedInputStream", "java.util.Hashtable", "$.StringTokenizer", "JU.Lst", "$.PT", "$.Rdr", "$.SB", "J.api.Interface", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fm = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.spartan, "SpartanUtil");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (fm) {
this.fm = fm;
return this;
}, "JV.FileManager");
Clazz.defineMethod (c$, "getFileList", 
function (name, isTypeCheckOnly) {
var pt = name.lastIndexOf (".spardir");
var info = null;
if (name.endsWith (".spardir.zip")) {
info =  Clazz.newArray (-1, ["SpartanSmol", "Directory Entry ", name + "|output"]);
} else {
name = name.$replace ('\\', '/');
if (!name.endsWith (".spardir") && name.indexOf (".spardir/") < 0) return null;
info = (name.lastIndexOf ("/") > pt ?  Clazz.newArray (-1, ["SpartanSmol", "Directory Entry ", name + "/input", name + "/archive", name + "/parchive", name + "/Molecule:asBinaryString", name + "/proparc"]) :  Clazz.newArray (-1, ["SpartanSmol", "Directory Entry ", name + "/output"]));
}if (isTypeCheckOnly) return info;
var name00 = name;
var header = info[1];
var outputFileName = info[2];
var fileData =  new java.util.Hashtable ();
if (info.length == 3) {
outputFileName = this.spartanGetObjectAsSections (outputFileName, header, fileData);
fileData.put ("OUTPUT", outputFileName);
info = this.spartanFileList (name, fileData.get (outputFileName));
if (info.length == 3) {
outputFileName = this.spartanGetObjectAsSections (info[2], header, fileData);
fileData.put ("OUTPUT", outputFileName);
info = this.spartanFileList (info[1], fileData.get (outputFileName));
}}var sb =  new JU.SB ();
var s;
if (fileData.get ("OUTPUT") != null) {
sb.append (fileData.get (fileData.get ("OUTPUT")));
}for (var i = 2; i < info.length; i++) {
name = info[i];
name = this.spartanGetObjectAsSections (name, header, fileData);
JU.Logger.info ("reading " + name);
s = fileData.get (name);
sb.append (s);
}
s = sb.toString ();
if (this.fm.spardirCache == null) this.fm.spardirCache =  new java.util.Hashtable ();
this.fm.spardirCache.put (name00.$replace ('\\', '/'), s.getBytes ());
return JU.Rdr.getBR (s);
}, "~S,~B");
Clazz.defineMethod (c$, "getData", 
function (is, zipDirectory) {
var data =  new JU.SB ();
data.append ("Zip File Directory: ").append ("\n").append (JU.Escape.eAS (zipDirectory, true)).append ("\n");
var fileData =  new java.util.Hashtable ();
this.fm.vwr.getJzt ().getAllZipData (is,  Clazz.newArray (-1, []), "", "Molecule", "__MACOSX", fileData);
var prefix = "|";
var outputData = fileData.get (prefix + "output");
if (outputData == null) outputData = fileData.get ((prefix = "|" + zipDirectory[1]) + "output");
data.append (outputData);
var files = this.getSpartanFileList (prefix, this.getSpartanDirs (outputData));
for (var i = 2; i < files.length; i++) {
var name = files[i];
if (fileData.containsKey (name)) data.append (fileData.get (name));
 else data.append (name + "\n");
}
return data;
}, "java.io.InputStream,~A");
Clazz.defineMethod (c$, "spartanFileList", 
 function (name, outputFileData) {
var dirNums = this.getSpartanDirs (outputFileData);
if (dirNums.length == 0) {
if (name.endsWith (".spardir")) return this.getSpartanFileList (name,  Clazz.newArray (-1, ["M0001"]));
if (name.endsWith (".spardir.zip")) {
if (outputFileData.indexOf (".zip|output") >= 0) {
var sname = name.$replace ('\\', '/');
var pt = name.lastIndexOf (".spardir");
pt = sname.lastIndexOf ("/");
sname = name + "|" + JU.PT.rep (name.substring (pt + 1, name.length - 4), "DROP_", "");
return  Clazz.newArray (-1, ["SpartanSmol", sname, sname + "/output"]);
}}}return this.getSpartanFileList (name, dirNums);
}, "~S,~S");
Clazz.defineMethod (c$, "getSpartanDirs", 
 function (outputFileData) {
if (outputFileData == null) return  Clazz.newArray (-1, []);
var v =  new JU.Lst ();
var token;
var lastToken = "";
if (outputFileData.startsWith ("java.io.FileNotFoundException") || outputFileData.startsWith ("FILE NOT FOUND") || outputFileData.indexOf ("<html") >= 0) return  new Array (0);
try {
var tokens =  new java.util.StringTokenizer (outputFileData, " \t\r\n");
while (tokens.hasMoreTokens ()) {
if ((token = tokens.nextToken ()).equals (")")) v.addLast (lastToken);
 else if (token.equals ("Start-") && tokens.nextToken ().equals ("Molecule")) v.addLast (JU.PT.split (tokens.nextToken (), "\"")[1]);
 else if (token.equals ("Molecules")) {
var n = JU.PT.parseInt (lastToken);
for (var i = 1; i <= n; i++) {
var s = "0000" + i;
v.addLast ("M" + s.substring (s.length - 4));
}
}lastToken = token;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return (v.size () == 0 ?  Clazz.newArray (-1, ["M0001"]) : v.toArray ( new Array (v.size ())));
}, "~S");
Clazz.defineMethod (c$, "getSpartanFileList", 
 function (name, dirNums) {
var files =  new Array (2 + dirNums.length * 6);
files[0] = "SpartanSmol";
files[1] = "Directory Entry ";
var pt = 2;
name = name.$replace ('\\', '/');
if (name.endsWith ("/")) name = name.substring (0, name.length - 1);
var sep = (name.equals ("|") ? "" : name.endsWith (".zip") ? "|" : "/");
for (var i = 0; i < dirNums.length; i++) {
var path = name + sep;
var s = dirNums[i];
path += (JU.PT.isDigit (s.charAt (0)) ? "Profile." + s : s) + "/";
files[pt++] = path + "#JMOL_MODEL " + dirNums[i];
files[pt++] = path + "input";
files[pt++] = path + "archive";
files[pt++] = path + "parchive";
files[pt++] = path + "Molecule:asBinaryString";
files[pt++] = path + "proparc";
}
return files;
}, "~S,~A");
Clazz.defineMethod (c$, "spartanGetObjectAsSections", 
 function (name, header, fileData) {
if (name == null) return null;
var subFileList = null;
var asBinaryString = false;
var path = name.$replace ('\\', '/');
if (name.indexOf (":asBinaryString") >= 0) {
asBinaryString = true;
name = name.substring (0, name.indexOf (":asBinaryString"));
}var sb = null;
if (fileData.containsKey (path)) return path;
if (path.indexOf ("#JMOL_MODEL ") >= 0) {
fileData.put (path, path + "\n");
return path;
}var fullName = name;
if (name.indexOf ("|") >= 0) {
subFileList = JU.PT.split (name, "|");
name = subFileList[0];
}var bis = null;
try {
var t = this.fm.getBufferedInputStreamOrErrorMessageFromName (name, fullName, false, false, null, false, true);
if (Clazz.instanceOf (t, String)) {
fileData.put (path, t + "\n");
return path;
}name = name.$replace ('\\', '/');
bis = t;
if (JU.Rdr.isCompoundDocumentS (bis)) {
var doc = J.api.Interface.getInterface ("JU.CompoundDocument", this.fm.vwr, "file");
doc.setDocStream (this.fm.vwr.getJzt (), bis);
doc.getAllDataMapped (name, "Molecule", fileData);
} else if (JU.Rdr.isZipS (bis)) {
this.fm.vwr.getJzt ().getAllZipData (bis, subFileList, name, "Molecule", "__MACOSX", fileData);
} else if (asBinaryString) {
var bd = J.api.Interface.getInterface ("JU.BinaryDocument", this.fm.vwr, "file");
bd.setStream (bis, false);
sb =  new JU.SB ();
if (header != null) sb.append ("BEGIN Directory Entry " + path + "\n");
try {
while (true) sb.append (Integer.toHexString (bd.readByte () & 0xFF)).appendC (' ');

} catch (e1) {
if (Clazz.exceptionOf (e1, Exception)) {
sb.appendC ('\n');
} else {
throw e1;
}
}
if (header != null) sb.append ("\nEND Directory Entry " + path + "\n");
fileData.put (path, sb.toString ());
} else {
var br = JU.Rdr.getBufferedReader (JU.Rdr.isGzipS (bis) ?  new java.io.BufferedInputStream (this.fm.vwr.getJzt ().newGZIPInputStream (bis)) : bis, null);
var line;
sb =  new JU.SB ();
if (header != null) sb.append ("BEGIN Directory Entry " + path + "\n");
while ((line = br.readLine ()) != null) {
sb.append (line);
sb.appendC ('\n');
}
br.close ();
if (header != null) sb.append ("\nEND Directory Entry " + path + "\n");
fileData.put (path, sb.toString ());
}} catch (ioe) {
if (Clazz.exceptionOf (ioe, Exception)) {
fileData.put (path, ioe.toString ());
} else {
throw ioe;
}
}
if (bis != null) try {
bis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (!fileData.containsKey (path)) fileData.put (path, "FILE NOT FOUND: " + path + "\n");
return path;
}, "~S,~S,java.util.Map");
});
