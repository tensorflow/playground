Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (null, "J.adapter.smarter.Resolver", ["java.io.BufferedInputStream", "$.InputStream", "java.lang.Float", "java.util.StringTokenizer", "javajs.api.GenericBinaryDocument", "JU.LimitedLineReader", "$.PT", "$.Rdr", "J.adapter.smarter.AtomSetCollectionReader", "$.SmarterJmolAdapter", "J.api.Interface", "JU.Logger", "JV.FileManager", "$.JC"], function () {
c$ = Clazz.declareType (J.adapter.smarter, "Resolver");
c$.getReaderClassBase = Clazz.defineMethod (c$, "getReaderClassBase", 
function (type) {
var name = type + "Reader";
if (type.startsWith ("Xml")) return "J.adapter.readers." + "xml." + name;
var key = ";" + type + ";";
for (var i = 1; i < J.adapter.smarter.Resolver.readerSets.length; i += 2) if (J.adapter.smarter.Resolver.readerSets[i].indexOf (key) >= 0) return "J.adapter.readers." + J.adapter.smarter.Resolver.readerSets[i - 1] + name;

return "J.adapter.readers." + "???." + name;
}, "~S");
c$.getFileType = Clazz.defineMethod (c$, "getFileType", 
function (br) {
try {
return J.adapter.smarter.Resolver.determineAtomSetCollectionReader (br, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "java.io.BufferedReader");
c$.getAtomCollectionReader = Clazz.defineMethod (c$, "getAtomCollectionReader", 
function (fullName, type, readerOrDocument, htParams, ptFile) {
var readerName;
fullName = JV.FileManager.fixDOSName (fullName);
var errMsg = null;
if (type == null) {
type = htParams.get ("filter");
var pt = (type == null ? -1 : type.toLowerCase ().indexOf ("filetype"));
type = (pt < 0 ? null : type.substring (pt + 8, (type + ";").indexOf (";", pt)).$replace ('=', ' ').trim ());
}if (type != null) {
readerName = J.adapter.smarter.Resolver.getReaderFromType (type);
if (readerName == null) readerName = J.adapter.smarter.Resolver.getReaderFromType ("Xml" + type);
if (readerName == null) errMsg = "unrecognized file format type " + type;
 else JU.Logger.info ("The Resolver assumes " + readerName);
} else {
readerName = J.adapter.smarter.Resolver.determineAtomSetCollectionReader (readerOrDocument, true);
if (readerName.charAt (0) == '\n') {
type = htParams.get ("defaultType");
if (type != null) {
type = J.adapter.smarter.Resolver.getReaderFromType (type);
if (type != null) readerName = type;
}}if (readerName.charAt (0) == '\n') errMsg = "unrecognized file format for file\n" + fullName + "\n" + J.adapter.smarter.Resolver.split (readerName, 50);
 else if (readerName.equals ("spt")) errMsg = "NOTE: file recognized as a script file: " + fullName + "\n";
 else if (!fullName.equals ("ligand")) JU.Logger.info ("The Resolver thinks " + readerName);
}if (errMsg != null) {
J.adapter.smarter.SmarterJmolAdapter.close (readerOrDocument);
return errMsg;
}htParams.put ("ptFile", Integer.$valueOf (ptFile));
if (ptFile <= 0) htParams.put ("readerName", readerName);
if (readerName.indexOf ("Xml") == 0) readerName = "Xml";
return J.adapter.smarter.Resolver.getReader (readerName, htParams);
}, "~S,~S,~O,java.util.Map,~N");
c$.getReader = Clazz.defineMethod (c$, "getReader", 
function (readerName, htParams) {
var rdr = null;
var className = null;
var err = null;
className = J.adapter.smarter.Resolver.getReaderClassBase (readerName);
if ((rdr = J.api.Interface.getInterface (className, htParams.get ("vwr"), "reader")) == null) {
err = JV.JC.READER_NOT_FOUND + className;
JU.Logger.error (err);
return err;
}return rdr;
}, "~S,java.util.Map");
c$.getReaderFromType = Clazz.defineMethod (c$, "getReaderFromType", 
 function (type) {
type = ";" + type.toLowerCase () + ";";
if (";zmatrix;cfi;c;vfi;v;mnd;jag;adf;gms;g;gau;mp;nw;orc;pqs;qc;".indexOf (type) >= 0) return "Input";
var set;
var pt;
for (var i = J.adapter.smarter.Resolver.readerSets.length; --i >= 0; ) if ((pt = (set = J.adapter.smarter.Resolver.readerSets[i--]).toLowerCase ().indexOf (type)) >= 0) return set.substring (pt + 1, set.indexOf (";", pt + 2));

return null;
}, "~S");
c$.split = Clazz.defineMethod (c$, "split", 
 function (a, n) {
var s = "";
var l = a.length;
for (var i = 0, j = 0; i < l; i = j) s += a.substring (i, (j = Math.min (i + n, l))) + "\n";

return s;
}, "~S,~N");
c$.DOMResolve = Clazz.defineMethod (c$, "DOMResolve", 
function (htParams) {
var rdrName = J.adapter.smarter.Resolver.getXmlType (htParams.get ("nameSpaceInfo"));
if (JU.Logger.debugging) {
JU.Logger.debug ("The Resolver thinks " + rdrName);
}htParams.put ("readerName", rdrName);
return J.adapter.smarter.Resolver.getReader ("XmlReader", htParams);
}, "java.util.Map");
c$.determineAtomSetCollectionReader = Clazz.defineMethod (c$, "determineAtomSetCollectionReader", 
 function (readerOrDocument, returnLines) {
var readerName;
if (Clazz.instanceOf (readerOrDocument, javajs.api.GenericBinaryDocument)) {
var doc = readerOrDocument;
readerName = J.adapter.smarter.Resolver.getBinaryType (doc.getInputStream ());
return (readerName == null ? "binary file type not recognized" : readerName);
}if (Clazz.instanceOf (readerOrDocument, java.io.InputStream)) {
readerName = J.adapter.smarter.Resolver.getBinaryType (readerOrDocument);
if (readerName != null) return readerName;
readerOrDocument = JU.Rdr.getBufferedReader ( new java.io.BufferedInputStream (readerOrDocument), null);
}var llr =  new JU.LimitedLineReader (readerOrDocument, 16384);
var leader = llr.getHeader (64).trim ();
if (leader.indexOf ("PNG") == 1 && leader.indexOf ("PNGJ") >= 0) return "pngj";
if (leader.indexOf ("PNG") == 1 || leader.indexOf ("JPG") == 1 || leader.indexOf ("JFIF") == 6) return "spt";
if (leader.indexOf ("\"num_pairs\"") >= 0) return "dssr";
if ((readerName = J.adapter.smarter.Resolver.checkFileStart (leader)) != null) {
return (readerName.equals ("Xml") ? J.adapter.smarter.Resolver.getXmlType (llr.getHeader (0)) : readerName);
}var lines =  new Array (16);
var nLines = 0;
for (var i = 0; i < lines.length; ++i) {
lines[i] = llr.readLineWithNewline ();
if (lines[i].length > 0) nLines++;
}
if ((readerName = J.adapter.smarter.Resolver.checkSpecial1 (nLines, lines, leader)) != null) return readerName;
if ((readerName = J.adapter.smarter.Resolver.checkLineStarts (lines)) != null) return readerName;
if ((readerName = J.adapter.smarter.Resolver.checkHeaderContains (llr.getHeader (0))) != null) return readerName;
if ((readerName = J.adapter.smarter.Resolver.checkSpecial2 (lines)) != null) return readerName;
return (returnLines ? "\n" + lines[0] + "\n" + lines[1] + "\n" + lines[2] + "\n" : null);
}, "~O,~B");
c$.getBinaryType = Clazz.defineMethod (c$, "getBinaryType", 
function (inputStream) {
return (JU.Rdr.isPickleS (inputStream) ? "PyMOL" : (JU.Rdr.getMagic (inputStream, 1)[0] & 0xDE) == 0xDE ? "MMTF" : null);
}, "java.io.InputStream");
c$.checkFileStart = Clazz.defineMethod (c$, "checkFileStart", 
 function (leader) {
for (var i = 0; i < J.adapter.smarter.Resolver.fileStartsWithRecords.length; ++i) {
var recordTags = J.adapter.smarter.Resolver.fileStartsWithRecords[i];
for (var j = 1; j < recordTags.length; ++j) {
var recordTag = recordTags[j];
if (leader.startsWith (recordTag)) return recordTags[0];
}
}
return null;
}, "~S");
c$.checkSpecial1 = Clazz.defineMethod (c$, "checkSpecial1", 
 function (nLines, lines, leader) {
if (nLines == 1 && lines[0].length > 0 && JU.PT.isDigit (lines[0].charAt (0))) return "Jme";
if (J.adapter.smarter.Resolver.checkMopacGraphf (lines)) return "MopacGraphf";
if (J.adapter.smarter.Resolver.checkOdyssey (lines)) return "Odyssey";
switch (J.adapter.smarter.Resolver.checkMol (lines)) {
case 1:
case 3:
case 2000:
case 3000:
return "Mol";
}
switch (J.adapter.smarter.Resolver.checkXyz (lines)) {
case 1:
return "Xyz";
case 2:
return "Bilbao";
}
if (J.adapter.smarter.Resolver.checkAlchemy (lines[0])) return "Alchemy";
if (J.adapter.smarter.Resolver.checkFoldingXyz (lines)) return "FoldingXyz";
if (J.adapter.smarter.Resolver.checkCube (lines)) return "Cube";
if (J.adapter.smarter.Resolver.checkWien2k (lines)) return "Wien2k";
if (J.adapter.smarter.Resolver.checkAims (lines)) return "Aims";
if (J.adapter.smarter.Resolver.checkGenNBO (lines, leader)) return "GenNBO";
return null;
}, "~N,~A,~S");
c$.checkAims = Clazz.defineMethod (c$, "checkAims", 
 function (lines) {
for (var i = 0; i < lines.length; i++) {
if (lines[i].startsWith ("mol 1")) return false;
var tokens = JU.PT.getTokens (lines[i]);
if (tokens.length == 0) continue;
if (tokens[0].startsWith ("atom") && tokens.length > 4 && Float.isNaN (JU.PT.parseFloat (tokens[4])) || tokens[0].startsWith ("multipole") && tokens.length >= 6 || tokens[0].startsWith ("lattice_vector") && tokens.length >= 4) return true;
}
return false;
}, "~A");
c$.checkAlchemy = Clazz.defineMethod (c$, "checkAlchemy", 
 function (line) {
var pt;
if ((pt = line.indexOf ("ATOMS")) >= 0 && line.indexOf ("BONDS") > pt) {
var n = JU.PT.parseInt (line.substring (0, pt).trim ());
return (n > 0);
}return false;
}, "~S");
c$.isInt = Clazz.defineMethod (c$, "isInt", 
 function (s) {
J.adapter.smarter.Resolver.n[0] = 0;
s = s.trim ();
return s.length > 0 && JU.PT.parseIntNext (s, J.adapter.smarter.Resolver.n) != -2147483648 && J.adapter.smarter.Resolver.n[0] == s.length;
}, "~S");
c$.isFloat = Clazz.defineMethod (c$, "isFloat", 
 function (s) {
return !Float.isNaN (JU.PT.parseFloat (s));
}, "~S");
c$.checkCube = Clazz.defineMethod (c$, "checkCube", 
 function (lines) {
for (var j = 2; j <= 5; j++) {
var tokens2 =  new java.util.StringTokenizer (lines[j]);
var n = tokens2.countTokens ();
if (!(n == 4 || j == 2 && n == 5) || !J.adapter.smarter.Resolver.isInt (tokens2.nextToken ())) return false;
for (var i = 3; --i >= 0; ) if (!J.adapter.smarter.Resolver.isFloat (tokens2.nextToken ())) return false;

if (n == 5 && !J.adapter.smarter.Resolver.isInt (tokens2.nextToken ())) return false;
}
return true;
}, "~A");
c$.checkFoldingXyz = Clazz.defineMethod (c$, "checkFoldingXyz", 
 function (lines) {
var tokens =  new java.util.StringTokenizer (lines[0].trim (), " \t");
if (tokens.countTokens () < 2 || !J.adapter.smarter.Resolver.isInt (tokens.nextToken ().trim ())) return false;
var secondLine = lines[1].trim ();
if (secondLine.length == 0) secondLine = lines[2].trim ();
tokens =  new java.util.StringTokenizer (secondLine, " \t");
return (tokens.countTokens () > 0 && J.adapter.smarter.Resolver.isInt (tokens.nextToken ().trim ()));
}, "~A");
c$.checkGenNBO = Clazz.defineMethod (c$, "checkGenNBO", 
 function (lines, leader) {
return (leader.indexOf ("$GENNBO") >= 0 || lines[1].startsWith (" Basis set information needed for plotting orbitals") || lines[1].indexOf ("s in the AO basis:") >= 0 || lines[1].indexOf ("***** NBO ") >= 0 || lines[2].indexOf (" N A T U R A L   A T O M I C   O R B I T A L") >= 0);
}, "~A,~S");
c$.checkMol = Clazz.defineMethod (c$, "checkMol", 
 function (lines) {
var line4trimmed = ("X" + lines[3]).trim ().toUpperCase ();
if (line4trimmed.length < 7 || line4trimmed.indexOf (".") >= 0) return 0;
if (line4trimmed.endsWith ("V2000")) return 2000;
if (line4trimmed.endsWith ("V3000")) return 3000;
var n1 = JU.PT.parseInt (lines[3].substring (0, 3).trim ());
var n2 = JU.PT.parseInt (lines[3].substring (3, 6).trim ());
return (n1 > 0 && n2 >= 0 && lines[0].indexOf ("@<TRIPOS>") != 0 && lines[1].indexOf ("@<TRIPOS>") != 0 && lines[2].indexOf ("@<TRIPOS>") != 0 ? 3 : 0);
}, "~A");
c$.checkMopacGraphf = Clazz.defineMethod (c$, "checkMopacGraphf", 
 function (lines) {
return (lines[0].indexOf ("MOPAC-Graphical data") > 2);
}, "~A");
c$.checkOdyssey = Clazz.defineMethod (c$, "checkOdyssey", 
 function (lines) {
var i;
for (i = 0; i < lines.length; i++) if (!lines[i].startsWith ("C ") && lines[i].length != 0) break;

if (i >= lines.length || lines[i].charAt (0) != ' ' || (i = i + 2) + 1 >= lines.length) return false;
var l = lines[i];
if (l.length < 3) return false;
var spin = JU.PT.parseInt (l.substring (2).trim ());
var charge = JU.PT.parseInt (l.substring (0, 2).trim ());
if ((l = lines[i + 1]).length < 2) return false;
var atom1 = JU.PT.parseInt (l.substring (0, 2).trim ());
if (spin < 0 || spin > 5 || atom1 <= 0 || charge == -2147483648 || charge > 5) return false;
var atomline = J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (l, null, 5);
return !Float.isNaN (atomline[1]) && !Float.isNaN (atomline[2]) && !Float.isNaN (atomline[3]) && Float.isNaN (atomline[4]);
}, "~A");
c$.checkWien2k = Clazz.defineMethod (c$, "checkWien2k", 
 function (lines) {
return (lines[2].startsWith ("MODE OF CALC=") || lines[2].startsWith ("             RELA") || lines[2].startsWith ("             NREL"));
}, "~A");
c$.checkXyz = Clazz.defineMethod (c$, "checkXyz", 
 function (lines) {
if (J.adapter.smarter.Resolver.isInt (lines[0].trim ())) return (J.adapter.smarter.Resolver.isInt (lines[2].trim ()) ? 2 : 1);
return (lines[0].indexOf ("Bilabao Crys") >= 0 ? 2 : 0);
}, "~A");
c$.checkLineStarts = Clazz.defineMethod (c$, "checkLineStarts", 
 function (lines) {
for (var i = 0; i < J.adapter.smarter.Resolver.lineStartsWithRecords.length; ++i) {
var recordTags = J.adapter.smarter.Resolver.lineStartsWithRecords[i];
for (var j = 1; j < recordTags.length; ++j) {
var recordTag = recordTags[j];
for (var k = 0; k < lines.length; k++) {
if (lines[k].startsWith (recordTag)) return recordTags[0];
}
}
}
return null;
}, "~A");
c$.checkHeaderContains = Clazz.defineMethod (c$, "checkHeaderContains", 
 function (header) {
for (var i = 0; i < J.adapter.smarter.Resolver.headerContainsRecords.length; ++i) {
var recordTags = J.adapter.smarter.Resolver.headerContainsRecords[i];
for (var j = 1; j < recordTags.length; ++j) {
var recordTag = recordTags[j];
if (header.indexOf (recordTag) < 0) continue;
var type = recordTags[0];
if (!type.equals ("Xml")) return type;
if (header.indexOf ("/AFLOWDATA/") >= 0 || header.indexOf ("-- Structure PRE --") >= 0) return "AFLOW";
return (header.indexOf ("<!DOCTYPE HTML PUBLIC") < 0 && header.indexOf ("XHTML") < 0 && (header.indexOf ("xhtml") < 0 || header.indexOf ("<cml") >= 0) ? J.adapter.smarter.Resolver.getXmlType (header) : null);
}
}
return null;
}, "~S");
c$.getXmlType = Clazz.defineMethod (c$, "getXmlType", 
 function (header) {
if (header.indexOf ("http://www.molpro.net/") >= 0) {
return "XmlMolpro";
}if (header.indexOf ("odyssey") >= 0) {
return "XmlOdyssey";
}if (header.indexOf ("C3XML") >= 0) {
return "XmlChem3d";
}if (header.indexOf ("arguslab") >= 0) {
return "XmlArgus";
}if (header.indexOf ("jvxl") >= 0 || header.indexOf ("http://www.xml-cml.org/schema") >= 0 || header.indexOf ("cml:") >= 0 || header.indexOf ("<cml>") >= 0) {
return "XmlCml";
}if (header.indexOf ("XSD") >= 0) {
return "XmlXsd";
}if (header.indexOf (">vasp") >= 0) {
return "XmlVasp";
}if (header.indexOf ("<GEOMETRY_INFO>") >= 0) {
return "XmlQE";
}return "XmlCml(unidentified)";
}, "~S");
c$.checkSpecial2 = Clazz.defineMethod (c$, "checkSpecial2", 
 function (lines) {
if (J.adapter.smarter.Resolver.checkGromacs (lines)) return "Gromacs";
if (J.adapter.smarter.Resolver.checkCrystal (lines)) return "Crystal";
if (J.adapter.smarter.Resolver.checkFAH (lines)) return "FAH";
var s = J.adapter.smarter.Resolver.checkCastepVaspSiesta (lines);
if (s != null) return s;
return null;
}, "~A");
c$.checkFAH = Clazz.defineMethod (c$, "checkFAH", 
 function (lines) {
var s = lines[0].trim () + lines[2].trim ();
return s.equals ("{\"atoms\": [");
}, "~A");
c$.checkCrystal = Clazz.defineMethod (c$, "checkCrystal", 
 function (lines) {
var s = lines[1].trim ();
if (s.equals ("SLAB") || s.equals ("MOLECULE") || s.equals ("CRYSTAL") || s.equals ("POLYMER") || (s = lines[3]).equals ("SLAB") || s.equals ("MOLECULE") || s.equals ("POLYMER")) return true;
for (var i = 0; i < lines.length; i++) {
if (lines[i].trim ().equals ("OPTGEOM") || lines[i].trim ().equals ("FREQCALC") || lines[i].contains ("DOVESI") || lines[i].contains ("TORINO") || lines[i].contains ("http://www.crystal.unito.it") || lines[i].contains ("Pcrystal") || lines[i].contains ("MPPcrystal") || lines[i].contains ("crystal executable")) return true;
}
return false;
}, "~A");
c$.checkGromacs = Clazz.defineMethod (c$, "checkGromacs", 
 function (lines) {
if (JU.PT.parseInt (lines[1]) == -2147483648) return false;
var len = -1;
for (var i = 2; i < 16 && len != 0; i++) if ((len = lines[i].length) != 69 && len != 45 && len != 0) return false;

return true;
}, "~A");
c$.checkCastepVaspSiesta = Clazz.defineMethod (c$, "checkCastepVaspSiesta", 
 function (lines) {
for (var i = 0; i < lines.length; i++) {
var line = lines[i].toUpperCase ();
if (line.indexOf ("FREQUENCIES IN         CM-1") == 1 || line.contains ("CASTEP") || line.startsWith ("%BLOCK LATTICE_ABC") || line.startsWith ("%BLOCK LATTICE_CART") || line.startsWith ("%BLOCK POSITIONS_FRAC") || line.startsWith ("%BLOCK POSITIONS_ABS") || line.contains ("<-- E")) return "Castep";
if (line.contains ("%BLOCK")) return "Siesta";
if (i >= 6 && i < 10 && (line.startsWith ("DIRECT") || line.startsWith ("CARTESIAN"))) return "VaspPoscar";
}
return null;
}, "~A");
Clazz.defineStatics (c$,
"classBase", "J.adapter.readers.");
c$.readerSets = c$.prototype.readerSets =  Clazz.newArray (-1, ["cif.", ";Cif;Cif2;MMCif;MMTF;MagCif", "molxyz.", ";Mol3D;Mol;Xyz;", "more.", ";AFLOW;BinaryDcd;Gromacs;Jcampdx;MdCrd;MdTop;Mol2;TlsDataOnly;", "quantum.", ";Adf;Csf;Dgrid;GamessUK;GamessUS;Gaussian;GaussianFchk;GaussianWfn;Jaguar;Molden;MopacGraphf;GenNBO;NWChem;Psi;Qchem;QCJSON;WebMO;MO;", "pdb.", ";Pdb;Pqr;P2n;JmolData;", "pymol.", ";PyMOL;", "simple.", ";Alchemy;Ampac;Cube;FoldingXyz;GhemicalMM;HyperChem;Jme;JSON;Mopac;MopacArchive;Tinker;Input;FAH;", "spartan.", ";Spartan;SpartanSmol;Odyssey;", "xtal.", ";Abinit;Aims;Bilbao;Castep;Cgd;Crystal;Dmol;Espresso;Gulp;Jana;Magres;Shelx;Siesta;VaspOutcar;VaspPoscar;Wien2k;Xcrysden;", "xml.", ";XmlArgus;XmlCml;XmlChem3d;XmlMolpro;XmlOdyssey;XmlXsd;XmlVasp;XmlQE;"]);
Clazz.defineStatics (c$,
"CML_NAMESPACE_URI", "http://www.xml-cml.org/schema",
"LEADER_CHAR_MAX", 64,
"sptRecords",  Clazz.newArray (-1, ["spt", "# Jmol state", "# Jmol script", "JmolManifest"]),
"m3dStartRecords",  Clazz.newArray (-1, ["Alchemy", "STRUCTURE  1.00     1"]),
"cubeFileStartRecords",  Clazz.newArray (-1, ["Cube", "JVXL", "#JVXL"]),
"mol2Records",  Clazz.newArray (-1, ["Mol2", "mol2", "@<TRIPOS>"]),
"webmoFileStartRecords",  Clazz.newArray (-1, ["WebMO", "[HEADER]"]),
"moldenFileStartRecords",  Clazz.newArray (-1, ["Molden", "[Molden", "MOLDEN", "[MOLDEN"]),
"dcdFileStartRecords",  Clazz.newArray (-1, ["BinaryDcd", "T\0\0\0CORD", "\0\0\0TCORD"]),
"tlsDataOnlyFileStartRecords",  Clazz.newArray (-1, ["TlsDataOnly", "REFMAC\n\nTL", "REFMAC\r\n\r\n", "REFMAC\r\rTL"]),
"inputFileStartRecords",  Clazz.newArray (-1, ["Input", "#ZMATRIX", "%mem=", "AM1", "$rungauss"]),
"magresFileStartRecords",  Clazz.newArray (-1, ["Magres", "#$magres", "# magres"]),
"pymolStartRecords",  Clazz.newArray (-1, ["PyMOL", "}q"]),
"janaStartRecords",  Clazz.newArray (-1, ["Jana", "Version Jana"]),
"jsonStartRecords",  Clazz.newArray (-1, ["JSON", "{\"mol\":"]),
"jcampdxStartRecords",  Clazz.newArray (-1, ["Jcampdx", "##TITLE"]),
"jmoldataStartRecords",  Clazz.newArray (-1, ["JmolData", "REMARK   6 Jmol"]),
"pqrStartRecords",  Clazz.newArray (-1, ["Pqr", "REMARK   1 PQR", "REMARK    The B-factors"]),
"p2nStartRecords",  Clazz.newArray (-1, ["P2n", "REMARK   1 P2N"]),
"cif2StartRecords",  Clazz.newArray (-1, ["Cif2", "#\\#CIF_2"]),
"xmlStartRecords",  Clazz.newArray (-1, ["Xml", "<?xml"]),
"cfiStartRecords",  Clazz.newArray (-1, ["Input", "$CFI"]));
c$.fileStartsWithRecords = c$.prototype.fileStartsWithRecords =  Clazz.newArray (-1, [J.adapter.smarter.Resolver.xmlStartRecords, J.adapter.smarter.Resolver.sptRecords, J.adapter.smarter.Resolver.m3dStartRecords, J.adapter.smarter.Resolver.cubeFileStartRecords, J.adapter.smarter.Resolver.mol2Records, J.adapter.smarter.Resolver.webmoFileStartRecords, J.adapter.smarter.Resolver.moldenFileStartRecords, J.adapter.smarter.Resolver.dcdFileStartRecords, J.adapter.smarter.Resolver.tlsDataOnlyFileStartRecords, J.adapter.smarter.Resolver.inputFileStartRecords, J.adapter.smarter.Resolver.magresFileStartRecords, J.adapter.smarter.Resolver.pymolStartRecords, J.adapter.smarter.Resolver.janaStartRecords, J.adapter.smarter.Resolver.jsonStartRecords, J.adapter.smarter.Resolver.jcampdxStartRecords, J.adapter.smarter.Resolver.jmoldataStartRecords, J.adapter.smarter.Resolver.pqrStartRecords, J.adapter.smarter.Resolver.p2nStartRecords, J.adapter.smarter.Resolver.cif2StartRecords, J.adapter.smarter.Resolver.cfiStartRecords]);
Clazz.defineStatics (c$,
"n",  Clazz.newIntArray (1, 0),
"mmcifLineStartRecords",  Clazz.newArray (-1, ["MMCif", "_entry.id", "_database_PDB_", "_pdbx_", "_chem_comp.pdbx_type", "_audit_author.name", "_atom_site."]),
"cifLineStartRecords",  Clazz.newArray (-1, ["Cif", "data_", "_publ"]),
"pdbLineStartRecords",  Clazz.newArray (-1, ["Pdb", "HEADER", "OBSLTE", "TITLE ", "CAVEAT", "COMPND", "SOURCE", "KEYWDS", "EXPDTA", "AUTHOR", "REVDAT", "SPRSDE", "JRNL  ", "REMARK ", "DBREF ", "SEQADV", "SEQRES", "MODRES", "HELIX ", "SHEET ", "TURN  ", "CRYST1", "ORIGX1", "ORIGX2", "ORIGX3", "SCALE1", "SCALE2", "SCALE3", "ATOM  ", "HETATM", "MODEL ", "LINK  ", "USER  MOD "]),
"cgdLineStartRecords",  Clazz.newArray (-1, ["Cgd", "EDGE ", "edge "]),
"shelxLineStartRecords",  Clazz.newArray (-1, ["Shelx", "TITL ", "ZERR ", "LATT ", "SYMM ", "CELL "]),
"ghemicalMMLineStartRecords",  Clazz.newArray (-1, ["GhemicalMM", "!Header mm1gp", "!Header gpr"]),
"jaguarLineStartRecords",  Clazz.newArray (-1, ["Jaguar", "  |  Jaguar version"]),
"mdlLineStartRecords",  Clazz.newArray (-1, ["Mol", "$MDL "]),
"spartanSmolLineStartRecords",  Clazz.newArray (-1, ["SpartanSmol", "INPUT="]),
"csfLineStartRecords",  Clazz.newArray (-1, ["Csf", "local_transform"]),
"mdTopLineStartRecords",  Clazz.newArray (-1, ["MdTop", "%FLAG TITLE"]),
"hyperChemLineStartRecords",  Clazz.newArray (-1, ["HyperChem", "mol 1"]),
"vaspOutcarLineStartRecords",  Clazz.newArray (-1, ["VaspOutcar", " vasp.", " INCAR:"]));
c$.lineStartsWithRecords = c$.prototype.lineStartsWithRecords =  Clazz.newArray (-1, [J.adapter.smarter.Resolver.mmcifLineStartRecords, J.adapter.smarter.Resolver.cifLineStartRecords, J.adapter.smarter.Resolver.pdbLineStartRecords, J.adapter.smarter.Resolver.cgdLineStartRecords, J.adapter.smarter.Resolver.shelxLineStartRecords, J.adapter.smarter.Resolver.ghemicalMMLineStartRecords, J.adapter.smarter.Resolver.jaguarLineStartRecords, J.adapter.smarter.Resolver.mdlLineStartRecords, J.adapter.smarter.Resolver.spartanSmolLineStartRecords, J.adapter.smarter.Resolver.csfLineStartRecords, J.adapter.smarter.Resolver.mol2Records, J.adapter.smarter.Resolver.mdTopLineStartRecords, J.adapter.smarter.Resolver.hyperChemLineStartRecords, J.adapter.smarter.Resolver.vaspOutcarLineStartRecords]);
Clazz.defineStatics (c$,
"bilbaoContainsRecords",  Clazz.newArray (-1, ["Bilbao", ">Bilbao Crystallographic Server<"]),
"xmlContainsRecords",  Clazz.newArray (-1, ["Xml", "<?xml", "<atom", "<molecule", "<reaction", "<cml", "<bond", ".dtd\"", "<list>", "<entry", "<identifier", "http://www.xml-cml.org/schema/cml2/core"]),
"gaussianContainsRecords",  Clazz.newArray (-1, ["Gaussian", "Entering Gaussian System", "Entering Link 1", "1998 Gaussian, Inc."]),
"ampacContainsRecords",  Clazz.newArray (-1, ["Ampac", "AMPAC Version"]),
"mopacContainsRecords",  Clazz.newArray (-1, ["Mopac", "MOPAC 93 (c) Fujitsu", "MOPAC FOR LINUX (PUBLIC DOMAIN VERSION)", "MOPAC:  VERSION  6", "MOPAC   7", "MOPAC2", "MOPAC (PUBLIC"]),
"qchemContainsRecords",  Clazz.newArray (-1, ["Qchem", "Welcome to Q-Chem", "A Quantum Leap Into The Future Of Chemistry"]),
"gamessUKContainsRecords",  Clazz.newArray (-1, ["GamessUK", "GAMESS-UK", "G A M E S S - U K"]),
"gamessUSContainsRecords",  Clazz.newArray (-1, ["GamessUS", "GAMESS", "$CONTRL"]),
"spartanBinaryContainsRecords",  Clazz.newArray (-1, ["SpartanSmol", "|PropertyArchive", "_spartan", "spardir", "BEGIN Directory Entry Molecule"]),
"spartanContainsRecords",  Clazz.newArray (-1, ["Spartan", "Spartan", "converted archive file"]),
"adfContainsRecords",  Clazz.newArray (-1, ["Adf", "Amsterdam Density Functional"]),
"psiContainsRecords",  Clazz.newArray (-1, ["Psi", "    PSI  3", "PSI3:"]),
"nwchemContainsRecords",  Clazz.newArray (-1, ["NWChem", " argument  1 = "]),
"uicrcifContainsRecords",  Clazz.newArray (-1, ["Cif", "Crystallographic Information File"]),
"dgridContainsRecords",  Clazz.newArray (-1, ["Dgrid", "BASISFILE   created by DGrid"]),
"crystalContainsRecords",  Clazz.newArray (-1, ["Crystal", "*                                CRYSTAL", "TORINO", "DOVESI"]),
"dmolContainsRecords",  Clazz.newArray (-1, ["Dmol", "DMol^3"]),
"gulpContainsRecords",  Clazz.newArray (-1, ["Gulp", "GENERAL UTILITY LATTICE PROGRAM"]),
"espressoContainsRecords",  Clazz.newArray (-1, ["Espresso", "Program PWSCF", "Program PHONON"]),
"siestaContainsRecords",  Clazz.newArray (-1, ["Siesta", "MD.TypeOfRun", "SolutionMethod", "MeshCutoff", "WELCOME TO SIESTA"]),
"xcrysDenContainsRecords",  Clazz.newArray (-1, ["Xcrysden", "PRIMVEC", "CONVVEC", "PRIMCOORD", "ANIMSTEP"]),
"mopacArchiveContainsRecords",  Clazz.newArray (-1, ["MopacArchive", "SUMMARY OF PM"]),
"abinitContainsRecords",  Clazz.newArray (-1, ["Abinit", "http://www.abinit.org", "Catholique", "Louvain"]),
"qcJsonContainsRecords",  Clazz.newArray (-1, ["QCJSON", "\"QCJSON"]),
"gaussianFchkContainsRecords",  Clazz.newArray (-1, ["GaussianFchk", "Number of point charges in /Mol/"]),
"inputContainsRecords",  Clazz.newArray (-1, ["Input", " ATOMS cartesian", "$molecule", "&zmat", "geometry={", "$DATA", "%coords", "GEOM=PQS", "geometry units angstroms"]),
"aflowContainsRecords",  Clazz.newArray (-1, ["AFLOW", "/AFLOWDATA/"]),
"magCifContainsRecords",  Clazz.newArray (-1, ["MagCif", "_space_group_magn"]));
c$.headerContainsRecords = c$.prototype.headerContainsRecords =  Clazz.newArray (-1, [J.adapter.smarter.Resolver.sptRecords, J.adapter.smarter.Resolver.bilbaoContainsRecords, J.adapter.smarter.Resolver.xmlContainsRecords, J.adapter.smarter.Resolver.gaussianContainsRecords, J.adapter.smarter.Resolver.ampacContainsRecords, J.adapter.smarter.Resolver.mopacContainsRecords, J.adapter.smarter.Resolver.gamessUKContainsRecords, J.adapter.smarter.Resolver.gamessUSContainsRecords, J.adapter.smarter.Resolver.spartanBinaryContainsRecords, J.adapter.smarter.Resolver.spartanContainsRecords, J.adapter.smarter.Resolver.qchemContainsRecords, J.adapter.smarter.Resolver.mol2Records, J.adapter.smarter.Resolver.adfContainsRecords, J.adapter.smarter.Resolver.psiContainsRecords, J.adapter.smarter.Resolver.nwchemContainsRecords, J.adapter.smarter.Resolver.uicrcifContainsRecords, J.adapter.smarter.Resolver.dgridContainsRecords, J.adapter.smarter.Resolver.crystalContainsRecords, J.adapter.smarter.Resolver.dmolContainsRecords, J.adapter.smarter.Resolver.gulpContainsRecords, J.adapter.smarter.Resolver.espressoContainsRecords, J.adapter.smarter.Resolver.siestaContainsRecords, J.adapter.smarter.Resolver.xcrysDenContainsRecords, J.adapter.smarter.Resolver.mopacArchiveContainsRecords, J.adapter.smarter.Resolver.abinitContainsRecords, J.adapter.smarter.Resolver.gaussianFchkContainsRecords, J.adapter.smarter.Resolver.inputContainsRecords, J.adapter.smarter.Resolver.aflowContainsRecords, J.adapter.smarter.Resolver.magCifContainsRecords, J.adapter.smarter.Resolver.qcJsonContainsRecords]);
});
