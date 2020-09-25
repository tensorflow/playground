Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.BilbaoReader", ["java.lang.Float", "JU.PT", "$.SB", "$.V3", "JU.Vibration"], function () {
c$ = Clazz.decorateAsClass (function () {
this.getHigh = false;
this.getSym = false;
this.normDispl = false;
this.doDisplace = false;
this.kvec = null;
this.i0 = 0;
this.nAtoms = 0;
this.isBCSfile = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "BilbaoReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.normDispl = !this.checkFilterKey ("NONORM");
this.doDisplace = this.isTrajectory;
this.getSym = true;
this.getHigh = this.checkFilterKey ("HIGH") && !this.doDisplace;
this.asc.vibScale = 1;
this.appendLoadNote ("Bilbao Crystallographic Server\ncryst@wm.lc.ehu.es");
if (this.rd ().indexOf ("<") < 0) {
this.readBilbaoDataFile ();
this.continuing = false;
}});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.contains (">Bilbao Crystallographic Server<")) {
this.line = this.line.substring (this.line.lastIndexOf (">") + 1).trim ();
if (this.line.length > 0) this.appendLoadNote (this.line + "\n");
} else if (this.line.contains ("High symmetry structure<")) {
if (this.getHigh) this.readBilbaoFormat ("high symmetry", NaN);
} else if (this.line.contains ("Low symmetry structure<")) {
if (!this.doDisplace) this.readBilbaoFormat ("low symmetry", NaN);
} else if (this.line.contains ("structure in the subgroup basis<")) {
if (!this.doDisplace) this.readBilbaoFormat ("high symmetry in the subgroup basis", NaN);
} else if (this.line.contains ("Low symmetry structure after the origin shift<")) {
this.readBilbaoFormat ("low symmetry after origin shift", NaN);
} else if (this.line.contains ("<h3>Irrep:")) {
this.readVirtual ();
}return true;
});
Clazz.defineMethod (c$, "readBilbaoDataFile", 
 function () {
this.isBCSfile = true;
this.checkComment ();
while (this.line != null) {
this.readBilbaoFormat (null, NaN);
if (this.rdLine () == null || this.line.indexOf ("##disp-par##") < 0) {
this.applySymmetryAndSetTrajectory ();
} else {
this.readDisplacements (1);
this.rdLine ();
}}
});
Clazz.defineMethod (c$, "checkComment", 
 function () {
if (!this.line.startsWith ("#") || this.line.indexOf ("disp-par") >= 0) return false;
if (this.isBCSfile) {
this.appendLoadNote (this.line);
if (this.line.startsWith ("# Title:")) this.asc.setAtomSetName (this.line.substring (8).trim ());
}return true;
});
Clazz.defineMethod (c$, "readBilbaoFormat", 
 function (title, fAmp) {
this.setFractionalCoordinates (true);
if (!this.doGetModel (++this.modelNumber, title)) return;
this.asc.newAtomSet ();
if (this.line.startsWith ("Bilbao Crys:")) {
title = this.line.substring (13).trim ();
this.rdLine ();
}this.setTitle (title);
var ptPre = this.line.indexOf ("<pre>");
if (ptPre >= 0) this.line = this.line.substring (ptPre + 5);
var intTableNo = this.parseIntStr (this.line);
if (intTableNo == 0) {
this.setSpaceGroupName ("bilbao:" + this.line.substring (2));
} else {
while (intTableNo < 0 && this.rdLine () != null) intTableNo = this.parseIntStr (this.line);

this.setSpaceGroupName ("bilbao:" + intTableNo);
}var data =  Clazz.newFloatArray (6, 0);
this.fillFloatArray (null, 0, data);
for (var i = 0; i < 6; i++) this.setUnitCellItem (i, data[i]);

this.i0 = this.asc.ac;
this.nAtoms = this.parseIntStr (this.rdLine ());
for (var i = this.nAtoms; --i >= 0; ) {
var tokens = JU.PT.getTokens (this.rdLine ());
if (!this.getSym && tokens[1].contains ("_")) continue;
if (tokens.length == 3) this.addAtomXYZSymName (tokens, 0, "Be", "Be1");
 else this.addAtomXYZSymName (tokens, 3, tokens[0], tokens[0] + tokens[1]);
}
if (Float.isNaN (fAmp)) {
if (ptPre >= 0) this.applySymmetryAndSetTrajectory ();
return;
}this.line = null;
this.readDisplacements (fAmp);
}, "~S,~N");
Clazz.defineMethod (c$, "readDisplacements", 
 function (fAmp) {
for (var i = 0; i < this.nAtoms; i++) {
if (this.line == null) this.rdLine ();
var tokens = JU.PT.split (this.line, "x|x");
if (this.getSym || !tokens[0].contains ("_")) this.asc.atoms[this.i0 + i].vib = JU.V3.new3 (this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]));
this.line = null;
}
this.applySymmetryAndSetTrajectory ();
for (var i = this.asc.ac; --i >= this.i0; ) {
var a = this.asc.atoms[i];
if (a.vib != null) {
var v =  new JU.Vibration ();
v.setT (a.vib);
a.vib = v;
this.asc.getSymmetry ().toCartesian (v, true);
v.scale (1 / fAmp);
}}
this.appendLoadNote ((this.asc.ac - this.i0) + " displacements");
}, "~N");
Clazz.defineMethod (c$, "setTitle", 
 function (title) {
if (title != null) {
this.asc.setAtomSetName (title);
this.appendLoadNote (title);
}}, "~S");
Clazz.defineMethod (c$, "rdLine", 
 function () {
while (this.rd () != null && (this.line.trim ().length == 0 || this.checkComment ())) {
}
return this.line;
});
Clazz.defineMethod (c$, "readVirtual", 
 function () {
if (this.line.contains ("<h3>K-vector:")) this.kvec = this.line.substring (this.line.indexOf ("("), this.line.indexOf (")") + 1);
var s = this.getLinesUntil ("\"BCS\"");
var pt = s.indexOf ("The amplitude");
pt = s.indexOf ("=", pt);
var amp = s.substring (pt + 2, s.indexOf (" ", pt + 2));
var fAmp = (this.normDispl ? this.parseFloatStr (amp) : 1);
var irrep = this.getAttr (s, "irrep");
if (irrep.indexOf (":") >= 0) irrep = irrep.substring (0, irrep.indexOf (":"));
this.line = this.line.substring (this.line.indexOf ("value=") + 7);
this.readBilbaoFormat (this.kvec + " " + irrep + " (" + amp + " Ang.)", fAmp);
});
Clazz.defineMethod (c$, "getAttr", 
 function (s, key) {
var pt = s.indexOf ("value", s.indexOf ("\"" + key + "\""));
s = JU.PT.getQuotedStringAt (s, pt);
s = JU.PT.rep (s, "<i>", "");
s = JU.PT.rep (s, "</i>", "");
return s.trim ();
}, "~S,~S");
Clazz.defineMethod (c$, "getLinesUntil", 
 function (key) {
var sb =  new JU.SB ();
do {
sb.append (this.line);
} while (!this.rd ().contains (key));
return sb.toString ();
}, "~S");
});
