Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.CastepReader", ["java.lang.Double", "$.Float", "JU.DF", "$.Lst", "$.M4", "$.P3", "$.PT", "$.V3", "J.adapter.smarter.Atom", "JU.Escape", "$.Logger", "$.Tensor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tokens = null;
this.isPhonon = false;
this.isTS = false;
this.isOutput = false;
this.isCell = false;
this.a = 0;
this.b = 0;
this.c = 0;
this.alpha = 0;
this.beta = 0;
this.gamma = 0;
this.abc = null;
this.ac = 0;
this.atomPts = null;
this.havePhonons = false;
this.lastQPt = null;
this.qpt2 = 0;
this.desiredQpt = null;
this.desiredQ = null;
this.chargeType = "MULL";
this.isAllQ = false;
this.haveCharges = false;
this.tsType = null;
this.matSupercell = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "CastepReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.abc =  new Array (3);
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
if (this.filter != null) {
this.chargeType = this.getFilter ("CHARGE=");
if (this.chargeType != null && this.chargeType.length > 4) this.chargeType = this.chargeType.substring (0, 4);
this.filter = this.filter.$replace ('(', '{').$replace (')', '}');
this.filter = JU.PT.rep (this.filter, "  ", " ");
this.isAllQ = this.checkFilterKey ("Q=ALL");
this.tsType = this.getFilter ("TSTYPE=");
if (!this.isAllQ && this.filter.indexOf ("{") >= 0) this.setDesiredQpt (this.filter.substring (this.filter.indexOf ("{")));
this.filter = JU.PT.rep (this.filter, "-PT", "");
}this.continuing = this.readFileData ();
});
Clazz.defineMethod (c$, "setDesiredQpt", 
 function (s) {
this.desiredQpt =  new JU.V3 ();
this.desiredQ = "";
var num = 1;
var denom = 1;
var ipt = 0;
var xyz = 0;
var useSpace = (s.indexOf (',') < 0);
for (var i = 0; i < s.length; i++) {
var c = s.charAt (i);
switch (c) {
case '{':
ipt = i + 1;
num = 1;
denom = 1;
break;
case '/':
num = this.parseFloatStr (s.substring (ipt, i));
ipt = i + 1;
denom = 0;
break;
case ',':
case ' ':
case '}':
if (c == '}') this.desiredQ = s.substring (0, i + 1);
 else if ((c == ' ') != useSpace) break;
if (denom == 0) {
denom = this.parseFloatStr (s.substring (ipt, i));
} else {
num = this.parseFloatStr (s.substring (ipt, i));
}num /= denom;
switch (xyz++) {
case 0:
this.desiredQpt.x = num;
break;
case 1:
this.desiredQpt.y = num;
break;
case 2:
this.desiredQpt.z = num;
break;
}
denom = 1;
if (c == '}') i = s.length;
ipt = i + 1;
break;
}
}
JU.Logger.info ("Looking for q-pt=" + this.desiredQpt);
}, "~S");
Clazz.defineMethod (c$, "readFileData", 
 function () {
while (this.tokenizeCastepCell () > 0) if (this.tokens.length >= 2 && this.tokens[0].equalsIgnoreCase ("%BLOCK")) {
JU.Logger.info (this.line);
if (this.tokens[1].equalsIgnoreCase ("LATTICE_ABC")) {
this.readLatticeAbc ();
continue;
}if (this.tokens[1].equalsIgnoreCase ("LATTICE_CART")) {
this.readLatticeCart ();
continue;
}if (this.tokens[1].equalsIgnoreCase ("POSITIONS_FRAC")) {
this.setFractionalCoordinates (true);
this.readPositionsFrac ();
continue;
}if (this.tokens[1].equalsIgnoreCase ("POSITIONS_ABS")) {
this.setFractionalCoordinates (false);
this.readPositionsAbs ();
continue;
}}
if (this.isPhonon || this.isOutput || this.isTS) {
if (this.isPhonon) {
this.isTrajectory = (this.desiredVibrationNumber <= 0);
this.asc.allowMultiple = false;
}return true;
}return false;
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.isOutput) {
if (this.line.contains ("Real Lattice(A)")) {
this.readOutputUnitCell ();
} else if (this.line.contains ("Fractional coordinates of atoms")) {
if (this.doGetModel (++this.modelNumber, null)) {
this.readOutputAtoms ();
}} else if (this.doProcessLines && (this.line.contains ("Atomic Populations (Mulliken)") || this.line.contains ("Hirshfield Charge (e)"))) {
this.readOutputCharges ();
} else if (this.doProcessLines && this.line.contains ("Born Effective Charges")) {
this.readOutputBornChargeTensors ();
} else if (this.line.contains ("Final energy ")) {
this.readEnergy (3, null);
} else if (this.line.contains ("Dispersion corrected final energy*")) {
this.readEnergy (5, null);
} else if (this.line.contains ("Total energy corrected")) {
this.readEnergy (8, null);
}return true;
}if (this.line.contains ("<-- E")) {
this.readPhononTrajectories ();
return true;
}if (this.line.indexOf ("Unit cell vectors") == 1) {
this.readPhononUnitCell ();
return true;
}if (this.line.indexOf ("Fractional Co-ordinates") >= 0) {
this.readPhononFractionalCoord ();
return true;
}if (this.line.indexOf ("q-pt") >= 0) {
this.readPhononFrequencies ();
return true;
}return true;
});
Clazz.defineMethod (c$, "readOutputUnitCell", 
 function () {
this.applySymmetryAndSetTrajectory ();
this.asc.newAtomSetClear (false);
this.setFractionalCoordinates (true);
this.abc = this.read3Vectors (false);
this.setLatticeVectors ();
});
Clazz.defineMethod (c$, "readOutputAtoms", 
 function () {
this.readLines (2);
while (this.rd ().indexOf ("xxx") < 0) {
var atom =  new J.adapter.smarter.Atom ();
this.tokens = this.getTokens ();
atom.elementSymbol = this.tokens[1];
atom.atomName = this.tokens[1] + this.tokens[2];
this.asc.addAtomWithMappedName (atom);
this.setAtomCoordTokens (atom, this.tokens, 3);
}
});
Clazz.defineMethod (c$, "readEnergy", 
 function (pt, prefix) {
if (this.isTrajectory) this.applySymmetryAndSetTrajectory ();
this.tokens = this.getTokens ();
try {
var energy = Double.$valueOf (Double.parseDouble (this.tokens[pt]));
this.asc.setAtomSetName (prefix + "Energy = " + energy + " eV");
this.asc.setAtomSetEnergy ("" + energy, energy.floatValue ());
this.asc.setCurrentModelInfo ("Energy", energy);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.appendLoadNote ("CASTEP Energy could not be read: " + this.line);
} else {
throw e;
}
}
}, "~N,~S");
Clazz.defineMethod (c$, "readPhononTrajectories", 
 function () {
if (!this.isTS) this.isTrajectory = (this.desiredVibrationNumber <= 0);
if (this.isTrajectory) this.asc.setTrajectory ();
this.doApplySymmetry = true;
while (this.line != null && this.line.contains ("<-- E")) {
var skip = (this.isTS && this.tsType != null && this.prevline.indexOf (this.tsType) < 0);
if (!skip) {
this.asc.newAtomSetClear (false);
if (this.isTS) this.readEnergy (0, JU.PT.getTokens (this.prevline + " -")[0] + " ");
this.discardLinesUntilContains ("<-- h");
this.setSpaceGroupName ("P1");
this.abc = this.read3Vectors (true);
this.setLatticeVectors ();
this.setFractionalCoordinates (false);
this.discardLinesUntilContains ("<-- R");
while (this.line != null && this.line.contains ("<-- R")) {
this.tokens = this.getTokens ();
this.setAtomCoordScaled (null, this.tokens, 2, 0.5291772).elementSymbol = this.tokens[0];
this.rd ();
}
this.applySymmetryAndSetTrajectory ();
}this.discardLinesUntilContains ("<-- E");
}
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
if (this.isPhonon || this.isOutput || this.isTS) {
this.isTrajectory = false;
} else {
this.doApplySymmetry = true;
this.setLatticeVectors ();
var nAtoms = this.asc.ac;
for (var i = 0; i < nAtoms; i++) this.setAtomCoord (this.asc.atoms[i]);

}this.finalizeReaderASCR ();
});
Clazz.defineMethod (c$, "setLatticeVectors", 
 function () {
if (this.abc[0] == null) {
this.setUnitCell (this.a, this.b, this.c, this.alpha, this.beta, this.gamma);
return;
}var lv =  Clazz.newFloatArray (3, 0);
for (var i = 0; i < 3; i++) {
lv[0] = this.abc[i].x;
lv[1] = this.abc[i].y;
lv[2] = this.abc[i].z;
this.addExplicitLatticeVector (i, lv, 0);
}
});
Clazz.defineMethod (c$, "readLatticeAbc", 
 function () {
if (this.tokenizeCastepCell () == 0) return;
var factor = this.readLengthUnit (this.tokens[0]);
if (this.tokens.length >= 3) {
this.a = this.parseFloatStr (this.tokens[0]) * factor;
this.b = this.parseFloatStr (this.tokens[1]) * factor;
this.c = this.parseFloatStr (this.tokens[2]) * factor;
} else {
JU.Logger.warn ("error reading a,b,c in %BLOCK LATTICE_ABC in CASTEP .cell file");
return;
}if (this.tokenizeCastepCell () == 0) return;
if (this.tokens.length >= 3) {
this.alpha = this.parseFloatStr (this.tokens[0]);
this.beta = this.parseFloatStr (this.tokens[1]);
this.gamma = this.parseFloatStr (this.tokens[2]);
} else {
JU.Logger.warn ("error reading alpha,beta,gamma in %BLOCK LATTICE_ABC in CASTEP .cell file");
}});
Clazz.defineMethod (c$, "readLatticeCart", 
 function () {
if (this.tokenizeCastepCell () == 0) return;
var factor = this.readLengthUnit (this.tokens[0]);
var x;
var y;
var z;
for (var i = 0; i < 3; i++) {
if (this.tokens.length >= 3) {
x = this.parseFloatStr (this.tokens[0]) * factor;
y = this.parseFloatStr (this.tokens[1]) * factor;
z = this.parseFloatStr (this.tokens[2]) * factor;
this.abc[i] = JU.V3.new3 (x, y, z);
} else {
JU.Logger.warn ("error reading coordinates of lattice vector " + Integer.toString (i + 1) + " in %BLOCK LATTICE_CART in CASTEP .cell file");
return;
}if (this.tokenizeCastepCell () == 0) return;
}
this.a = this.abc[0].length ();
this.b = this.abc[1].length ();
this.c = this.abc[2].length ();
this.alpha = (this.abc[1].angle (this.abc[2]) * 57.29578);
this.beta = (this.abc[2].angle (this.abc[0]) * 57.29578);
this.gamma = (this.abc[0].angle (this.abc[1]) * 57.29578);
});
Clazz.defineMethod (c$, "readPositionsFrac", 
 function () {
if (this.tokenizeCastepCell () == 0) return;
this.readAtomData (1.0);
});
Clazz.defineMethod (c$, "readPositionsAbs", 
 function () {
if (this.tokenizeCastepCell () == 0) return;
var factor = this.readLengthUnit (this.tokens[0]);
this.readAtomData (factor);
});
Clazz.defineMethod (c$, "readLengthUnit", 
 function (units) {
var factor = 1.0;
for (var i = 0; i < J.adapter.readers.xtal.CastepReader.lengthUnitIds.length; i++) if (units.equalsIgnoreCase (J.adapter.readers.xtal.CastepReader.lengthUnitIds[i])) {
factor = J.adapter.readers.xtal.CastepReader.lengthUnitFactors[i];
this.tokenizeCastepCell ();
break;
}
return factor;
}, "~S");
Clazz.defineMethod (c$, "readAtomData", 
 function (factor) {
do {
if (this.tokens.length >= 4) {
var atom = this.asc.addNewAtom ();
var pt = this.tokens[0].indexOf (":");
if (pt >= 0) {
atom.elementSymbol = this.tokens[0].substring (0, pt);
atom.atomName = this.tokens[0];
} else {
atom.elementSymbol = this.tokens[0];
}atom.set (this.parseFloatStr (this.tokens[1]), this.parseFloatStr (this.tokens[2]), this.parseFloatStr (this.tokens[3]));
atom.scale (factor);
} else {
JU.Logger.warn ("cannot read line with CASTEP atom data: " + this.line);
}} while (this.tokenizeCastepCell () > 0 && !this.tokens[0].equalsIgnoreCase ("%ENDBLOCK"));
}, "~N");
Clazz.defineMethod (c$, "tokenizeCastepCell", 
 function () {
while (this.rd () != null) {
if ((this.line = this.line.trim ()).length == 0 || this.line.startsWith ("#") || this.line.startsWith ("!")) continue;
if (!this.isCell) {
if (this.line.startsWith ("%")) {
this.isCell = true;
break;
}if (this.line.startsWith ("LST")) {
this.isTS = true;
JU.Logger.info ("reading CASTEP .ts file");
return -1;
}if (this.line.startsWith ("BEGIN header")) {
this.isPhonon = true;
JU.Logger.info ("reading CASTEP .phonon file");
return -1;
}if (this.line.contains ("CASTEP")) {
this.isOutput = true;
JU.Logger.info ("reading CASTEP .castep file");
return -1;
}}break;
}
return (this.line == null ? 0 : (this.tokens = this.getTokens ()).length);
});
Clazz.defineMethod (c$, "readOutputBornChargeTensors", 
 function () {
if (this.rd ().indexOf ("--------") < 0) return;
var atoms = this.asc.atoms;
this.appendLoadNote ("Ellipsoids: Born Charge Tensors");
while (this.rd ().indexOf ('=') < 0) this.getTensor (atoms[this.readOutputAtomIndex ()], this.line.substring (12));

});
Clazz.defineMethod (c$, "readOutputAtomIndex", 
 function () {
this.tokens = this.getTokens ();
return this.asc.getAtomIndex (this.tokens[0] + this.tokens[1]);
});
Clazz.defineMethod (c$, "getTensor", 
 function (atom, line0) {
var data =  Clazz.newFloatArray (9, 0);
var a =  Clazz.newDoubleArray (3, 3, 0);
this.fillFloatArray (line0, 0, data);
JU.Logger.info ("tensor " + atom.atomName + "\t" + JU.Escape.eAF (data));
for (var p = 0, i = 0; i < 3; i++) for (var j = 0; j < 3; j++) a[i][j] = data[p++];


atom.addTensor (( new JU.Tensor ()).setFromAsymmetricTensor (a, "charge", atom.atomName + " " + line0), null, false);
if (!this.haveCharges) this.appendLoadNote ("Ellipsoids set \"charge\": Born Effective Charges");
this.haveCharges = true;
}, "J.adapter.smarter.Atom,~S");
Clazz.defineMethod (c$, "readOutputCharges", 
 function () {
if (this.line.toUpperCase ().indexOf (this.chargeType) < 0) return;
JU.Logger.info ("reading charges: " + this.line);
this.readLines (2);
var haveSpin = (this.line.indexOf ("Spin") >= 0);
this.rd ();
var atoms = this.asc.atoms;
var spins = (haveSpin ?  Clazz.newFloatArray (atoms.length, 0) : null);
if (spins != null) for (var i = 0; i < spins.length; i++) spins[i] = 0;

while (this.rd () != null && this.line.indexOf ('=') < 0) {
var index = this.readOutputAtomIndex ();
var charge = this.parseFloatStr (this.tokens[haveSpin ? this.tokens.length - 2 : this.tokens.length - 1]);
atoms[index].partialCharge = charge;
if (haveSpin) spins[index] = this.parseFloatStr (this.tokens[this.tokens.length - 1]);
}
if (haveSpin) this.asc.setAtomProperties ("spin", spins, -1, false);
});
Clazz.defineMethod (c$, "readPhononUnitCell", 
 function () {
this.abc = this.read3Vectors (this.line.indexOf ("bohr") >= 0);
this.setSpaceGroupName ("P1");
this.setLatticeVectors ();
});
Clazz.defineMethod (c$, "readPhononFractionalCoord", 
 function () {
this.setFractionalCoordinates (true);
while (this.rd () != null && this.line.indexOf ("END") < 0) {
this.tokens = this.getTokens ();
this.addAtomXYZSymName (this.tokens, 1, this.tokens[4], null).bfactor = this.parseFloatStr (this.tokens[5]);
}
this.ac = this.asc.ac;
this.atomPts =  new Array (this.ac);
var atoms = this.asc.atoms;
for (var i = 0; i < this.ac; i++) this.atomPts[i] = JU.P3.newP (atoms[i]);

});
Clazz.defineMethod (c$, "readPhononFrequencies", 
 function () {
this.tokens = this.getTokens ();
var v =  new JU.V3 ();
var qvec = JU.V3.new3 (this.parseFloatStr (this.tokens[2]), this.parseFloatStr (this.tokens[3]), this.parseFloatStr (this.tokens[4]));
var fcoord = this.getFractionalCoord (qvec);
var qtoks = "{" + this.tokens[2] + " " + this.tokens[3] + " " + this.tokens[4] + "}";
if (fcoord == null) fcoord = qtoks;
 else fcoord = "{" + fcoord + "}";
var isOK = this.isAllQ;
var isSecond = (this.tokens[1].equals (this.lastQPt));
this.qpt2 = (isSecond ? this.qpt2 + 1 : 1);
this.lastQPt = this.tokens[1];
if (!isOK && this.checkFilterKey ("Q=")) {
if (this.desiredQpt != null) {
v.sub2 (this.desiredQpt, qvec);
if (v.length () < 0.001) fcoord = this.desiredQ;
}isOK = (this.checkFilterKey ("Q=" + fcoord + "." + this.qpt2 + ";") || this.checkFilterKey ("Q=" + this.lastQPt + "." + this.qpt2 + ";") || !isSecond && this.checkFilterKey ("Q=" + fcoord + ";") || !isSecond && this.checkFilterKey ("Q=" + this.lastQPt + ";"));
if (!isOK) return;
}var isGammaPoint = (qvec.length () == 0);
var nx = 1;
var ny = 1;
var nz = 1;
if (this.ptSupercell != null && !isOK && !isSecond) {
this.matSupercell =  new JU.M4 ();
this.matSupercell.m00 = this.ptSupercell.x;
this.matSupercell.m11 = this.ptSupercell.y;
this.matSupercell.m22 = this.ptSupercell.z;
this.matSupercell.m33 = 1;
JU.Logger.info ("Using supercell \n" + this.matSupercell);
nx = this.ptSupercell.x;
ny = this.ptSupercell.y;
nz = this.ptSupercell.z;
var dx = (qvec.x == 0 ? 1 : qvec.x) * nx;
var dy = (qvec.y == 0 ? 1 : qvec.y) * ny;
var dz = (qvec.z == 0 ? 1 : qvec.z) * nz;
if ((nx != 1 || ny != 1 || nz != 1) && isGammaPoint || !J.adapter.readers.xtal.CastepReader.isInt (dx) || !J.adapter.readers.xtal.CastepReader.isInt (dy) || !J.adapter.readers.xtal.CastepReader.isInt (dz)) return;
isOK = true;
}if (this.ptSupercell == null || !this.havePhonons) this.appendLoadNote (this.line);
if (!isOK && isSecond) return;
if (!isOK && (this.ptSupercell == null) == !isGammaPoint) return;
if (this.havePhonons && !this.isAllQ) return;
this.havePhonons = true;
var qname = "q=" + this.lastQPt + " " + fcoord;
this.applySymmetryAndSetTrajectory ();
if (isGammaPoint) qvec = null;
var freqs =  new JU.Lst ();
while (this.rd () != null && this.line.indexOf ("Phonon") < 0) {
this.tokens = this.getTokens ();
freqs.addLast (Float.$valueOf (this.parseFloatStr (this.tokens[1])));
}
this.rd ();
var frequencyCount = freqs.size ();
var data =  Clazz.newFloatArray (8, 0);
var t =  new JU.V3 ();
this.asc.setCollectionName (qname);
for (var i = 0; i < frequencyCount; i++) {
if (!this.doGetVibration (++this.vibrationNumber)) {
for (var j = 0; j < this.ac; j++) this.rd ();

continue;
}if (this.desiredVibrationNumber <= 0) {
if (!this.isTrajectory) {
this.cloneLastAtomSet (this.ac, this.atomPts);
this.applySymmetryAndSetTrajectory ();
}}this.symmetry = this.asc.getSymmetry ();
var iatom = this.asc.getLastAtomSetAtomIndex ();
var freq = freqs.get (i).floatValue ();
var atoms = this.asc.atoms;
var aCount = this.asc.ac;
for (var j = 0; j < this.ac; j++) {
this.fillFloatArray (null, 0, data);
for (var k = iatom++; k < aCount; k++) if (atoms[k].atomSite == j) {
t.sub2 (atoms[k], atoms[atoms[k].atomSite]);
if (this.matSupercell != null) this.matSupercell.rotTrans (t);
this.setPhononVector (data, atoms[k], t, qvec, v);
this.asc.addVibrationVectorWithSymmetry (k, v.x, v.y, v.z, true);
}
}
if (this.isTrajectory) this.asc.setTrajectory ();
this.asc.setAtomSetFrequency (this.vibrationNumber, null, null, "" + freq, null);
this.asc.setAtomSetName (JU.DF.formatDecimal (freq, 2) + " cm-1 " + qname);
}
});
Clazz.defineMethod (c$, "getFractionalCoord", 
 function (qvec) {
return (this.symmetry != null && J.adapter.readers.xtal.CastepReader.isInt (qvec.x * 12) && J.adapter.readers.xtal.CastepReader.isInt (qvec.y * 12) && J.adapter.readers.xtal.CastepReader.isInt (qvec.z * 12) ? this.symmetry.fcoord (qvec) : null);
}, "JU.V3");
c$.isInt = Clazz.defineMethod (c$, "isInt", 
 function (f) {
return (Math.abs (f - Math.round (f)) < 0.001);
}, "~N");
Clazz.defineMethod (c$, "setPhononVector", 
 function (data, atom, rTrans, qvec, v) {
if (qvec == null) {
v.set (data[2], data[4], data[6]);
} else {
var phase = qvec.dot (rTrans);
var cosph = Math.cos (6.283185307179586 * phase);
var sinph = Math.sin (6.283185307179586 * phase);
v.x = (cosph * data[2] - sinph * data[3]);
v.y = (cosph * data[4] - sinph * data[5]);
v.z = (cosph * data[6] - sinph * data[7]);
}v.scale (Math.sqrt (1 / atom.bfactor));
}, "~A,J.adapter.smarter.Atom,JU.V3,JU.V3,JU.V3");
Clazz.defineStatics (c$,
"RAD_TO_DEG", (57.29577951308232),
"lengthUnitIds",  Clazz.newArray (-1, ["bohr", "m", "cm", "nm", "ang", "a0"]),
"lengthUnitFactors",  Clazz.newFloatArray (-1, [0.5291772, 1E10, 1E8, 1E1, 1.0, 0.5291772]),
"TWOPI", 6.283185307179586);
});
