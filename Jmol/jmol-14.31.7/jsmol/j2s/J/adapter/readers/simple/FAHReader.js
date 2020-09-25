Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.simple.FAHReader", ["JU.PT", "$.Rdr", "J.adapter.smarter.Atom", "$.Bond", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.factor = 1;
this.pt = null;
this.readerSave = null;
this.units = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.simple, "FAHReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.pt =  Clazz.newIntArray (1, 0);
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.asc.setNoAutoBond ();
this.setModelPDB (true);
this.finalizeReaderASCR ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.startsWith ("{")) {
return this.readTopAtomsAndBonds ();
}if (this.line.startsWith ("[")) {
return this.readVnnCoords ();
}return true;
});
Clazz.defineMethod (c$, "readTopAtomsAndBonds", 
function () {
if (this.readerSave == null) this.appendLoadNote (" -- FAH:: is required for Frame files but not the Top file.\n -- automatic calculation of structure using DSSP\n -- Both files are required; three load options:\n    \n    LOAD FILES \"ViewerTop.json\" + \"ViewerFrame22.json\" // explicit joining to two files\n    \n    LOAD ViewerTop.json; \n    LOAD XYZ FAH::ViewerFrame22.json   // first the atoms, then the coordinates\n    \n    LOAD FAH::ViewerFrame22.json        // just the coordinates with associated ViewerTop.json assumed present\n    \n -- Subsequent calls to LOAD XYZ will replace coordinates and recalculate DSSP only.\n\n    LOAD ViewerTop.json; \n    LOAD XYZ FAH::ViewerFrame0.json \n    delay 1.0\n    LOAD XYZ FAH::ViewerFrame22.json \n \n");
this.discardLinesUntilContains ("\"");
if (this.line.indexOf ("units") >= 0) {
this.pt[0] = this.line.indexOf (":");
this.units = JU.PT.getQuotedStringNext (this.line, this.pt);
if (this.units != null && (this.units.equalsIgnoreCase ("NM") || this.units.toUpperCase ().indexOf ("NANOMETER") >= 0)) {
this.factor = 0.1;
}JU.Logger.info ("FAHReader units are " + this.units + " factor = " + this.factor);
}this.discardLinesUntilContains ("atoms");
var index = 0;
while (this.rd () != null) {
var tokens = this.getTokens ();
this.pt[0] = 0;
var name = JU.PT.getQuotedStringNext (tokens[0], this.pt);
this.pt[0] = 0;
var group = JU.PT.getQuotedStringNext (tokens[5], this.pt);
var elemNo = this.parseIntStr (tokens[4]);
var atom =  new J.adapter.smarter.Atom ();
atom.elementNumber = elemNo;
atom.atomName = name;
atom.group3 = group;
atom.set (0, 0, index++);
this.asc.addAtom (atom);
if (this.line.trim ().endsWith ("]")) break;
}
this.discardLinesUntilContains ("bonds");
while (this.rd () != null) {
this.pt[0] = this.line.indexOf ("[") + 1;
var a = JU.PT.parseIntNext (this.line, this.pt);
this.pt[0] = this.line.indexOf (",") + 1;
var b = JU.PT.parseIntNext (this.line, this.pt);
this.asc.addBond ( new J.adapter.smarter.Bond (a, b, 1));
if (this.line.trim ().endsWith ("]")) break;
}
JU.Logger.info ("FAHReader " + this.asc.ac + " top atoms read");
this.rd ();
this.rd ();
return true;
});
Clazz.defineMethod (c$, "readVnnCoords", 
 function () {
var iatom = 0;
if (this.asc.ac == 0 && this.readerSave == null && !"xyz".equals (this.htParams.get ("dataType"))) {
this.getTopData ();
}var atoms = this.asc.atoms;
var atomCount = this.asc.ac;
while (this.rd () != null) {
this.pt[0] = 0;
this.line = this.line.trim ();
var tokens = this.line.substring (1, this.line.length - 1).$plit (",");
var x = this.parseFloatStr (tokens[0]) * this.factor;
var y = this.parseFloatStr (tokens[1]) * this.factor;
var z = this.parseFloatStr (tokens[2]) * this.factor;
var atom = (iatom >= atomCount ? this.asc.addAtom ( new J.adapter.smarter.Atom ()) : atoms[iatom]);
atom.set (x, y, z);
iatom++;
if (this.line.trim ().endsWith ("]")) break;
}
JU.Logger.info ("FAHReader " + iatom + " atom coordinates read");
if (!this.checkBondlengths ()) this.checkBondlengths ();
this.rd ();
return true;
});
Clazz.defineMethod (c$, "checkBondlengths", 
 function () {
var d = 1;
if (this.asc.bondCount > 0) {
var b = this.asc.bonds[0];
d = this.asc.atoms[b.atomIndex1].distance (this.asc.atoms[b.atomIndex2]);
} else {
for (var i = Math.min (this.asc.ac, 10); --i >= 0; ) {
for (var j = i; --j >= 0; ) {
d = Math.min (d, this.asc.atoms[i].distance (this.asc.atoms[j]));
}
}
}if (d < 0.5) {
for (var i = this.asc.ac; --i >= 0; ) {
this.asc.atoms[i].scale (10);
}
var msg = "FAHReader CORRECTION: Top.json file units=" + this.units + "\n but we found NANOMETERS based on\n " + (this.asc.bondCount > 0 ? "bonds[0].length" : "shortest distance among first 10 atoms") + "=" + d;
this.appendLoadNote (msg);
return false;
}return true;
});
Clazz.defineMethod (c$, "getTopData", 
 function () {
var fileName = this.htParams.get ("fullPathName");
var pt = fileName.indexOf ("::");
if (pt > 0) fileName = fileName.substring (pt + 2);
pt = fileName.lastIndexOf (".");
if (pt < 0) pt = fileName.length;
var ptv = fileName.lastIndexOf ("Frame", pt);
fileName = fileName.substring (0, ptv) + "Top" + fileName.substring (pt);
var data = this.vwr.getFileAsString3 (fileName, false, null);
JU.Logger.info ("FAHReader " + data.length + " bytes read from " + fileName);
var isError = (data.indexOf ("\"atoms\"") < 0);
if (isError) {
JU.Logger.error ("FAHReader " + fileName + "was not found");
} else {
this.readerSave = this.reader;
this.reader = JU.Rdr.getBR (data);
try {
this.rd ();
this.checkLine ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.reader = this.readerSave;
}});
Clazz.defineStatics (c$,
"note", " -- FAH:: is required for Frame files but not the Top file.\n -- automatic calculation of structure using DSSP\n -- Both files are required; three load options:\n    \n    LOAD FILES \"ViewerTop.json\" + \"ViewerFrame22.json\" // explicit joining to two files\n    \n    LOAD ViewerTop.json; \n    LOAD XYZ FAH::ViewerFrame22.json   // first the atoms, then the coordinates\n    \n    LOAD FAH::ViewerFrame22.json        // just the coordinates with associated ViewerTop.json assumed present\n    \n -- Subsequent calls to LOAD XYZ will replace coordinates and recalculate DSSP only.\n\n    LOAD ViewerTop.json; \n    LOAD XYZ FAH::ViewerFrame0.json \n    delay 1.0\n    LOAD XYZ FAH::ViewerFrame22.json \n \n");
});
