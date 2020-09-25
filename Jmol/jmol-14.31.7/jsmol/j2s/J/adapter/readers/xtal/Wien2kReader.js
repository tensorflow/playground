Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.Wien2kReader", ["java.lang.Float", "JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isrhombohedral = false;
this.latticeCode = '\0';
this.doSymmetry = true;
this.cxyz = " x y z";
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "Wien2kReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.doSymmetry = !this.sgName.equals ("none");
this.setFractionalCoordinates (true);
this.asc.setCollectionName (this.rd ());
this.readUnitCell ();
this.readAtoms ();
this.readSymmetry ();
this.readEmbeddedScript ();
this.continuing = false;
});
Clazz.defineMethod (c$, "readUnitCell", 
 function () {
this.rd ();
this.isrhombohedral = ((this.latticeCode = this.line.charAt (0)) == 'R');
if (this.line.startsWith ("CYZ")) this.latticeCode = 'A';
 else if (this.line.startsWith ("CXZ")) this.latticeCode = 'B';
 else if (this.line.startsWith ("B")) this.latticeCode = 'I';
if (this.latticeCode != 'R' && this.latticeCode != 'H') this.asc.getXSymmetry ().setLatticeParameter (this.latticeCode.charCodeAt (0));
if (this.line.length > 32) {
var name = this.line.substring (32).trim ();
if (name.indexOf (" ") >= 0) name = name.substring (name.indexOf (" ") + 1);
if (name.indexOf ("_") >= 0) name = name.substring (name.indexOf ("_") + 1);
this.setSpaceGroupName (name);
}var factor = (this.rd ().toLowerCase ().indexOf ("ang") >= 0 ? 1 : 0.5291772);
this.rd ();
var a = this.parseFloatRange (this.line, 0, 10) * factor;
var b = this.parseFloatRange (this.line, 10, 20) * factor;
var c = this.parseFloatRange (this.line, 20, 30) * factor;
var l = this.line.length;
var alpha = (l >= 40 ? this.parseFloatRange (this.line, 30, 40) : 0);
var beta = (l >= 50 ? this.parseFloatRange (this.line, 40, 50) : 0);
var gamma = (l >= 60 ? this.parseFloatRange (this.line, 50, 60) : 0);
if (this.isrhombohedral) {
var ar = Math.sqrt (a * a / 3 + c * c / 9);
alpha = beta = gamma = (Math.acos ((2 * c * c - 3 * a * a) / (2 * c * c + 6 * a * a)) * 180 / 3.141592653589793);
a = b = c = ar;
}if (Float.isNaN (alpha) || alpha == 0) alpha = 90;
if (Float.isNaN (beta) || beta == 0) beta = 90;
if (Float.isNaN (gamma) || gamma == 0) gamma = 90;
this.setUnitCell (a, b, c, alpha, beta, gamma);
});
Clazz.defineMethod (c$, "readAtoms", 
 function () {
this.rd ();
while (this.line != null && (this.line.indexOf ("ATOM") == 0 || !this.doSymmetry && this.line.indexOf (":") == 8)) {
var thisAtom = this.asc.ac;
this.addAtom ();
if (this.rd ().indexOf ("MULT=") == 10) for (var i = this.parseIntRange (this.line, 15, 18); --i >= 0; ) {
this.rd ();
if (!this.doSymmetry) this.addAtom ();
}
var atomName = this.line.substring (0, 10);
var sym = atomName.substring (0, 2).trim ();
if (sym.length == 2 && JU.PT.isDigit (sym.charAt (1))) sym = sym.substring (0, 1);
atomName = JU.PT.rep (atomName, " ", "");
var n = 0;
for (var i = this.asc.ac; --i >= thisAtom; ) {
var atom = this.asc.atoms[i];
atom.elementSymbol = sym;
atom.atomName = atomName + "_" + (n++);
}
while (this.rd () != null && this.line.indexOf ("ATOM") < 0 && this.line.indexOf ("SYMMETRY") < 0) {
}
}
});
Clazz.defineMethod (c$, "addAtom", 
 function () {
var a = this.parseFloatRange (this.line, 12, 22);
var b = this.parseFloatRange (this.line, 25, 35);
var c = this.parseFloatRange (this.line, 38, 48);
var atom = this.asc.addNewAtom ();
this.setAtomCoordXYZ (atom, a, b, c);
});
Clazz.defineMethod (c$, "readSymmetry", 
 function () {
if (this.line.indexOf ("SYMMETRY") < 0) return;
var n = this.parseIntRange (this.line, 0, 4);
for (var i = n; --i >= 0; ) {
var xyz = this.getJones () + "," + this.getJones () + "," + this.getJones ();
if (this.doSymmetry) this.setSymmetryOperator (xyz);
this.rd ();
}
});
Clazz.defineMethod (c$, "getJones", 
 function () {
this.rd ();
var xyz = "";
var trans = this.parseFloatStr (this.line.substring (6));
for (var i = 0; i < 6; i++) {
if (this.line.charAt (i) == '-') xyz += "-";
if (this.line.charAt (++i) == '1') {
xyz += " x y z".charAt (i);
if (trans > 0) xyz += "+";
if (trans != 0) xyz += trans;
}}
return xyz;
});
Clazz.defineMethod (c$, "readEmbeddedScript", 
 function () {
while (this.line != null) {
this.checkCurrentLineForScript ();
this.rd ();
}
});
});
