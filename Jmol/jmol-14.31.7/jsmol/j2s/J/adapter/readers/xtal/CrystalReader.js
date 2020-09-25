Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "JU.Lst", "$.P3"], "J.adapter.readers.xtal.CrystalReader", ["java.lang.Character", "$.Double", "$.Float", "java.util.Arrays", "$.Hashtable", "JU.DF", "$.M3", "$.M4", "$.PT", "$.Quat", "$.SB", "$.V3", "JS.SymmetryOperation", "JU.Logger", "$.Tensor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isVersion3 = false;
this.isPolymer = false;
this.isSlab = false;
this.haveCharges = false;
this.inputOnly = false;
this.isLongMode = false;
this.getLastConventional = false;
this.havePrimitiveMapping = false;
this.isProperties = false;
this.state = 0;
this.ac = 0;
this.atomIndexLast = 0;
this.atomFrag = null;
this.primitiveToIndex = null;
this.nuclearCharges = null;
this.lstCoords = null;
this.energy = null;
this.ptOriginShift = null;
this.directLatticeVectors = null;
this.spaceGroupName = null;
this.checkModelTrigger = false;
this.fullSymmetry = false;
this.htCriticalPoints = null;
this.directLatticeVectorsFirst = false;
this.cpno = -1;
this.symops = null;
this.f14 = null;
this.f16 = null;
this.primitiveVolume = 0;
this.primitiveDensity = 0;
this.firstLine = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "CrystalReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.ptOriginShift =  new JU.P3 ();
this.symops =  new JU.Lst ();
this.f14 =  Clazz.newFloatArray (14, 0);
this.f16 =  Clazz.newFloatArray (16, 0);
});
Clazz.defineMethod (c$, "rd", 
function () {
while (Clazz.superCall (this, J.adapter.readers.xtal.CrystalReader, "rd", []) != null && (this.line.startsWith (" PROCESS") || this.line.startsWith (" INFORMATION") || this.line.startsWith (" WARNING"))) {
}
return this.line;
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.doProcessLines = false;
this.inputOnly = this.checkFilterKey ("INPUT");
this.isPrimitive = !this.inputOnly && !this.checkFilterKey ("CONV");
this.addVibrations = new Boolean (this.addVibrations & (!this.inputOnly && this.desiredModelNumber < 0)).valueOf ();
this.getLastConventional = (!this.isPrimitive && this.desiredModelNumber == 0);
this.fullSymmetry = this.checkFilterKey ("FULLSYM");
this.setFractionalCoordinates (this.readHeader ());
this.asc.checkLatticeOnly = !this.inputOnly;
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.firstLine != null) {
this.line = this.firstLine;
this.firstLine = null;
}if (this.line.startsWith (" TYPE OF CALCULATION")) {
this.calculationType = this.line.substring (this.line.indexOf (":") + 1).trim ();
return true;
}if (this.line.indexOf ("DIMENSIONALITY OF THE SYSTEM") >= 0) {
this.isMolecular = this.isSlab = this.isPolymer = false;
if (this.line.indexOf ("2") >= 0) this.isSlab = true;
 else if (this.line.indexOf ("1") >= 0) this.isPolymer = true;
 else if (this.line.indexOf ("0") >= 0) this.isMolecular = true;
return true;
}if (!this.isPolymer && this.line.indexOf ("CONSTRUCTION OF A NANOTUBE FROM A SLAB") >= 0) {
this.isPolymer = true;
this.isSlab = false;
return true;
}if (!this.isMolecular && this.line.indexOf ("* CLUSTER CALCULATION") >= 0) {
this.isMolecular = true;
this.isSlab = false;
this.isPolymer = false;
return true;
}if (this.line.startsWith (" INPUT COORDINATES")) {
this.state = 1;
if (this.inputOnly) {
this.newAtomSet ();
this.readCoordLines ();
this.continuing = false;
}return true;
}if (this.line.startsWith (" GEOMETRY INPUT FROM EXTERNAL")) {
this.state = 2;
if (this.inputOnly) this.continuing = false;
return true;
}if (this.line.startsWith (" GEOMETRY FOR WAVE FUNCTION")) {
this.state = 3;
return true;
}if (this.line.startsWith (" COORDINATE OPTIMIZATION - POINT")) {
this.state = 4;
return true;
}if (this.line.startsWith (" FINAL OPTIMIZED GEOMETRY")) {
this.getLastConventional = false;
this.state = 5;
return true;
}if (this.addVibrations && this.line.contains (this.isVersion3 ? "EIGENVALUES (EV) OF THE MASS" : "EIGENVALUES (EIGV) OF THE MASS") || this.line.indexOf ("LONGITUDINAL OPTICAL (LO)") >= 0) {
this.state = 6;
this.isLongMode = (this.line.indexOf ("LONGITUDINAL OPTICAL (LO)") >= 0);
this.readFrequencies ();
return true;
}if (this.line.startsWith (" TRANSFORMATION MATRIX")) {
this.readPrimitiveLatticeVectors ();
return true;
}if (this.line.startsWith (" COORDINATES OF THE EQUIVALENT ATOMS") || this.line.startsWith (" INPUT LIST - ATOM N.")) {
return true;
}if (this.line.indexOf ("SYMMOPS - ") >= 0) {
this.readSymmetryOperators ();
return true;
}if (this.line.startsWith (" LATTICE PARAMETER")) {
this.newLattice (this.line.indexOf ("- CONVENTIONAL") >= 0);
return true;
}if (this.line.startsWith (" CRYSTALLOGRAPHIC CELL")) {
if (!this.isPrimitive) {
this.newLattice (true);
}return true;
}if (this.line.startsWith (" DIRECT LATTICE VECTOR")) {
this.getDirect ();
return true;
}if (this.line.startsWith (" COORDINATES IN THE CRYSTALLOGRAPHIC CELL")) {
this.checkModelTrigger = !this.isPrimitive;
if (this.checkModelTrigger) {
this.readCoordLines ();
}return true;
}if (this.addVibrations && this.line.startsWith (" FREQUENCIES COMPUTED ON A FRAGMENT")) {
this.readFreqFragments ();
return true;
}if (this.checkModelTrigger) {
if (this.line.indexOf ("CARTESIAN COORDINATES") >= 0 || this.line.indexOf ("TOTAL ENERGY") >= 0 || this.line.indexOf ("REFERENCE GEOMETRY DEFINED") >= 0 || this.line.indexOf ("FUNCTIONS") >= 0) {
this.checkModelTrigger = false;
if (!this.addModel ()) return true;
}}if (this.line.startsWith (" ATOMS IN THE ASYMMETRIC UNIT")) {
if (this.isMolecular) return (this.doGetModel (++this.modelNumber, null) ? this.readAtoms () : this.checkLastModel ());
this.readCoordLines ();
this.checkModelTrigger = true;
}if (this.isProperties && this.line.startsWith ("   ATOM N.AT.")) {
if (this.doGetModel (++this.modelNumber, null)) this.readAtoms ();
 else this.checkLastModel ();
}if (!this.doProcessLines) return true;
if (this.line.startsWith (" TOTAL ENERGY(")) {
this.line = JU.PT.rep (this.line, "( ", "(");
var tokens = this.getTokens ();
this.energy = Double.$valueOf (Double.parseDouble (tokens[2]));
this.setEnergy ();
this.rd ();
if (this.line.startsWith (" ********")) this.discardLinesUntilContains ("SYMMETRY ALLOWED");
 else if (this.line.startsWith (" TTTTTTTT")) this.discardLinesUntilContains (" ********");
return true;
}if (this.line.startsWith (" MULLIKEN POPULATION ANALYSIS")) return this.readPartialCharges ();
if (this.line.startsWith (" TOTAL ATOMIC CHARGES")) return this.readTotalAtomicCharges ();
if (this.line.startsWith (" MAX GRADIENT")) return this.readGradient ();
if (this.line.startsWith (" ATOMIC SPINS SET")) return this.readData ("spin", 3);
if (this.line.startsWith (" TOTAL ATOMIC SPINS  :")) return this.readData ("magneticMoment", 1);
if (this.line.startsWith (" BORN CHARGE TENSOR.")) return this.readBornChargeTensors ();
if (!this.isProperties) return true;
if (this.line.startsWith (" DEFINITION OF TRACELESS")) return this.getQuadrupoleTensors ();
if (this.line.startsWith (" MULTIPOLE ANALYSIS BY ATOMS")) {
this.appendLoadNote ("Multipole Analysis");
return true;
}if (this.line.startsWith (" CP N. ")) {
this.cpno = this.parseIntAt (this.line, 6);
return true;
}if (this.line.startsWith (" CP TYPE ")) {
this.processNextCriticalPoint ();
return true;
}return true;
});
Clazz.defineMethod (c$, "processNextCriticalPoint", 
 function () {
if (this.htCriticalPoints == null) {
this.htCriticalPoints =  new java.util.Hashtable ();
this.asc.setModelInfoForSet ("criticalPoints", this.htCriticalPoints, 0);
}var nblank = 0;
var id = null;
var entry = null;
var f = 0.5291772;
var m = null;
var v = NaN;
var g = NaN;
var rho = NaN;
var evalues = null;
var type = null;
while (this.line != null || this.rd ().length > 0 || ++nblank < 2) {
if (this.line.indexOf ("CLUSTER") >= 0) {
break;
}if (this.line.length > 0) nblank = 0;
var pt = this.line.indexOf (":");
if (pt > 0) {
var key = this.line.substring (0, pt).trim ();
var value = this.line.substring (pt + 1);
if (key.equals ("CP TYPE")) {
type = J.adapter.readers.xtal.CrystalReader.crtypes[Clazz.doubleToInt ("??,-3,-1,+1,+3".indexOf (value.substring (5, 7)) / 3)];
entry = this.htCriticalPoints.get (type);
if (entry == null) {
this.htCriticalPoints.put (type, entry =  new JU.Lst ());
}m =  new java.util.Hashtable ();
entry.addLast (m);
var i = entry.size ();
id = "cp_" + i;
m.put ("cpno", Integer.$valueOf (this.cpno));
m.put ("id", id);
m.put ("type", type);
m.put ("index", Integer.$valueOf (i));
} else if (key.equals ("COORD(AU)  (X  Y  Z)")) {
var xyz = JU.P3.new3 (f * this.parseFloatStr (value.substring (0, 12)), f * this.parseFloatStr (value.substring (12, 24)), f * this.parseFloatStr (value.substring (24, 36)));
m.put ("point", xyz);
JU.Logger.info ("CRYSTAL TOPOND critical point " + type + " " + xyz);
} else if (key.equals ("PROPERTIES (RHO,GRHO,LAP)")) {
rho = this.parseFloatStr (value.substring (0, 12));
m.put ("rho", Float.$valueOf (rho));
m.put ("lap", Float.$valueOf (this.parseFloatStr (value.substring (24, 36))));
} else if (key.equals ("PROPERTIES (-LAP,GLAP,RHO)")) {
m.put ("lap", Float.$valueOf (-this.parseFloatStr (value.substring (0, 12))));
rho = this.parseFloatStr (value.substring (24, 36));
m.put ("rho", Float.$valueOf (rho));
} else if (key.equals ("KINETIC ENERGY DENSITIES (G,K)")) {
g = this.parseFloatStr (value.substring (0, 12));
m.put ("kineticEnergyG", Float.$valueOf (g));
} else if (key.equals ("VIRIAL DENSITY")) {
v = this.parseFloatStr (value.substring (0, 12));
m.put ("virialDensityV", Float.$valueOf (v));
m.put ("ratioVG", Float.$valueOf (Math.abs (v) / g));
m.put ("energyDensityH", Float.$valueOf (g + v));
m.put ("ratioHRho", Float.$valueOf ((g + v) / rho));
} else if (key.equals ("EIGENVALUES (L1 L2 L3)")) {
var e1 = this.parseFloatStr (value.substring (0, 12));
var e2 = this.parseFloatStr (value.substring (12, 24));
var e3 = this.parseFloatStr (value.substring (24, 36));
evalues =  Clazz.newFloatArray (-1, [e1, e2, e3]);
m.put ("eigenvalues", evalues);
m.put ("ellipticity", Float.$valueOf (e1 / e2 - 1));
m.put ("anisotropy", Float.$valueOf (e3 - Math.abs (e1 + e2) / 2));
} else if (key.equals ("EIGENVECTORS")) {
value = value + this.rd ().substring (33) + this.rd ().substring (33);
var ev =  Clazz.newDoubleArray (3, 3, 0);
for (var ei = 0, p = 0; ei < 3; ei++) {
for (var ej = 0; ej < 3; ej++, p += 12) {
ev[ej][ei] = this.parseFloatStr (value.substring (p, p + 12));
}
}
var evectors =  new Array (3);
evectors[0] = JU.P3.new3 (ev[0][0], ev[0][1], ev[0][2]);
evectors[1] = JU.P3.new3 (ev[1][0], ev[1][1], ev[1][2]);
evectors[2] = JU.P3.new3 (ev[2][0], ev[2][1], ev[2][2]);
System.out.println ("evpts " + evectors[0] + " " + evectors[1] + " " + evectors[2]);
m.put ("eigenvectors", evectors);
var t =  new JU.Tensor ().setFromEigenVectors (evectors, evalues, "cp", id, null);
m.put ("tensor", t);
}}this.line = null;
}
});
Clazz.defineMethod (c$, "newLattice", 
 function (isConv) {
this.lstCoords = null;
this.readLatticeParams (!isConv);
this.symops.clear ();
if (!isConv) this.primitiveToCrystal = null;
if (!this.directLatticeVectorsFirst) this.directLatticeVectors = null;
}, "~B");
Clazz.defineMethod (c$, "addModel", 
 function () {
if (this.getLastConventional) {
return true;
}if (!this.doGetModel (++this.modelNumber, null)) {
this.lstCoords = null;
this.checkLastModel ();
if (this.asc.iSet >= 0) this.asc.removeAtomSet (this.asc.iSet);
return false;
}this.processCoordLines ();
return true;
});
Clazz.defineMethod (c$, "readSymmetryOperators", 
 function () {
this.symops.clear ();
this.rd ();
this.f16[15] = 1;
while (this.rd () != null && this.line.length > 0 && this.line.indexOf ("END") < 0) {
if (this.line.indexOf ("V INV") >= 0) continue;
this.fillFloatArray (this.line, 0, this.f14);
if (Float.isNaN (this.f14[0])) break;
for (var i = 0; i < 12; i++) this.f16[i] = this.f14[J.adapter.readers.xtal.CrystalReader.smap[i]];

var m4 = JU.M4.newA16 (this.f16);
var xyz = JS.SymmetryOperation.getXYZFromMatrix (m4, false, false, false);
if (xyz.indexOf ("0y") >= 0 || xyz.indexOf ("0z") >= 0) {
JU.Logger.error ("Symmetry operator could not be created for " + this.line);
} else {
this.symops.addLast (xyz);
JU.Logger.info ("state:" + this.state + " Symmop " + this.symops.size () + ": " + xyz);
}}
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.processCoordLines ();
if (this.energy != null) this.setEnergy ();
this.finalizeReaderASCR ();
this.asc.checkNoEmptyModel ();
if (this.htCriticalPoints != null) {
var note = "";
var list;
list = this.htCriticalPoints.get ("nuclei");
if (list != null) note += "\n _M.criticalPoints.nuclei.length = " + list.size ();
list = this.htCriticalPoints.get ("bonds");
if (list != null) note += "\n _M.criticalPoints.bonds.length = " + list.size ();
list = this.htCriticalPoints.get ("rings");
if (list != null) note += "\n _M.criticalPoints.rings.length = " + list.size ();
list = this.htCriticalPoints.get ("cages");
if (list != null) note += "\n _M.criticalPoints.cages.length = " + list.size ();
note += "\n Use MACRO TOPOND for TOPOND functions.";
this.addJmolScript ("set drawHover");
this.appendLoadNote (note);
this.setLoadNote ();
}});
Clazz.defineMethod (c$, "getDirect", 
 function () {
this.directLatticeVectors = this.read3Vectors (this.line.indexOf ("(BOHR") >= 0);
if (!this.iHaveUnitCell) this.directLatticeVectorsFirst = true;
});
Clazz.defineMethod (c$, "setUnitCellOrientation", 
 function () {
if (this.directLatticeVectors == null) return;
var a =  new JU.V3 ();
var b =  new JU.V3 ();
if (this.isPrimitive) {
a = this.directLatticeVectors[0];
b = this.directLatticeVectors[1];
} else {
if (this.primitiveToCrystal == null) return;
var mp =  new JU.M3 ();
mp.setColumnV (0, this.directLatticeVectors[0]);
mp.setColumnV (1, this.directLatticeVectors[1]);
mp.setColumnV (2, this.directLatticeVectors[2]);
mp.mul (this.primitiveToCrystal);
a =  new JU.V3 ();
b =  new JU.V3 ();
mp.getColumnV (0, a);
mp.getColumnV (1, b);
}this.matUnitCellOrientation = JU.Quat.getQuaternionFrame ( new JU.P3 (), a, b).getMatrix ();
JU.Logger.info ("oriented unit cell is in model " + this.asc.atomSetCount);
});
Clazz.defineMethod (c$, "readPrimitiveLatticeVectors", 
 function () {
this.primitiveToCrystal = JU.M3.newA9 (this.fillFloatArray (null, 0,  Clazz.newFloatArray (9, 0)));
});
Clazz.defineMethod (c$, "readHeader", 
 function () {
this.havePrimitiveMapping = true;
this.discardLinesUntilContains ("*******************************************************************************");
this.readLines (2);
this.isVersion3 = (this.line.indexOf ("CRYSTAL03") >= 0);
this.discardLinesUntilContains ("EEEEEEEEEE");
this.rd ();
var name;
if (this.line.length == 0) {
this.discardLinesUntilContains ("*********");
name = this.rd ().trim ();
} else {
name = this.line.trim ();
this.rd ();
}var type = this.rd ().trim ();
var pt = type.indexOf ("- PROPERTIES");
if (pt >= 0) {
this.isProperties = true;
type = type.substring (0, pt).trim ();
}this.asc.setCollectionName (name + (!this.isProperties && this.desiredModelNumber == 0 ? " (optimized)" : ""));
if (type.indexOf ("GEOMETRY INPUT FROM EXTERNAL FILE") >= 0) {
this.firstLine = this.line;
type = this.rd ().trim ();
}this.isPolymer = (type.equals ("1D - POLYMER") || type.equals ("POLYMER CALCULATION"));
this.isSlab = (type.equals ("2D - SLAB") || type.equals ("SLAB CALCULATION"));
this.asc.setInfo ("symmetryType", (this.isSlab ? "2D - SLAB" : this.isPolymer ? "1D - POLYMER" : type));
if ((this.isPolymer || this.isSlab) && !this.isPrimitive) {
JU.Logger.error ("Cannot use FILTER \"conventional\" with POLYMER or SLAB");
this.isPrimitive = true;
}this.asc.setInfo ("unitCellType", (this.isPrimitive ? "primitive" : "conventional"));
if (type.indexOf ("MOLECULAR") >= 0) {
this.isMolecular = this.doProcessLines = true;
this.rd ();
this.asc.setInfo ("molecularCalculationPointGroup", this.line.substring (this.line.indexOf (" OR ") + 4).trim ());
return false;
}this.discardLinesUntilContains2 ("SPACE GROUP", "****");
pt = this.line.indexOf (":");
if (pt >= 0 && !this.isPrimitive) this.spaceGroupName = this.line.substring (pt + 1).trim ();
this.doApplySymmetry = this.isProperties;
return !this.isProperties;
});
Clazz.defineMethod (c$, "readLatticeParams", 
 function (isPrimitive) {
var f = (this.line.indexOf ("(BOHR") >= 0 ? 0.5291772 : 1);
if (isPrimitive) this.newAtomSet ();
this.primitiveVolume = 0;
this.primitiveDensity = 0;
if (this.isPolymer && !isPrimitive && this.line.indexOf ("BOHR =") < 0) {
this.setUnitCell (this.parseFloatStr (this.line.substring (this.line.indexOf ("CELL") + 4)) * f, -1, -1, 90, 90, 90);
} else {
while (this.rd ().indexOf ("GAMMA") < 0) if (this.line.indexOf ("VOLUME=") >= 0) {
this.primitiveVolume = this.parseFloatStr (this.line.substring (43));
this.primitiveDensity = this.parseFloatStr (this.line.substring (66));
}
var tokens = JU.PT.getTokens (this.rd ());
if (this.isSlab) {
if (isPrimitive) this.setUnitCell (this.parseFloatStr (tokens[0]) * f, this.parseFloatStr (tokens[1]) * f, -1, this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]), this.parseFloatStr (tokens[5]));
 else this.setUnitCell (this.parseFloatStr (tokens[0]) * f, this.parseFloatStr (tokens[1]) * f, -1, 90, 90, this.parseFloatStr (tokens[2]));
} else if (this.isPolymer) {
this.setUnitCell (this.parseFloatStr (tokens[0]) * f, -1, -1, this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]), this.parseFloatStr (tokens[5]));
} else {
this.setUnitCell (this.parseFloatStr (tokens[0]) * f, this.parseFloatStr (tokens[1]) * f, this.parseFloatStr (tokens[2]) * f, this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]), this.parseFloatStr (tokens[5]));
}}}, "~B");
Clazz.defineMethod (c$, "getAtomIndexFromPrimitiveIndex", 
 function (iPrim) {
return (this.primitiveToIndex == null ? iPrim : this.primitiveToIndex[iPrim]);
}, "~N");
Clazz.defineMethod (c$, "readAtoms", 
 function () {
if (this.isMolecular) this.newAtomSet ();
this.lstCoords = null;
while (this.rd () != null && this.line.indexOf ("*") < 0) {
if (this.line.indexOf ("X(ANGSTROM") >= 0) {
this.setFractionalCoordinates (false);
this.isMolecular = true;
}}
var i = this.atomIndexLast;
var doNormalizePrimitive = false;
this.atomIndexLast = this.asc.ac;
var isFractional = this.iHaveFractionalCoordinates;
if (!isFractional) {
this.setUnitCellOrientation ();
if (this.matUnitCellOrientation != null) this.getSymmetry ().initializeOrientation (this.matUnitCellOrientation);
}while (this.rd () != null && this.line.length > 0 && this.line.indexOf (this.isPrimitive ? "*" : "=") < 0) {
var atom = this.asc.addNewAtom ();
var tokens = this.getTokens ();
var pt = (this.isProperties ? 1 : 2);
atom.elementSymbol = J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (this.getAtomicNumber (tokens[pt++]));
atom.atomName = J.adapter.readers.xtal.CrystalReader.fixAtomName (tokens[pt++]);
if (this.isProperties) pt++;
var x = this.parseFloatStr (tokens[pt++]);
var y = this.parseFloatStr (tokens[pt++]);
var z = this.parseFloatStr (tokens[pt]);
if (this.haveCharges) atom.partialCharge = this.asc.atoms[i++].partialCharge;
if (isFractional && !this.isProperties) {
if (x < 0 && (this.isPolymer || this.isSlab || doNormalizePrimitive)) x += 1;
if (y < 0 && (this.isSlab || doNormalizePrimitive)) y += 1;
if (z < 0 && doNormalizePrimitive) z += 1;
}this.setAtomCoordXYZ (atom, x, y, z);
}
this.ac = this.asc.ac - this.atomIndexLast;
return true;
});
c$.fixAtomName = Clazz.defineMethod (c$, "fixAtomName", 
 function (s) {
return (s.length > 1 && JU.PT.isLetter (s.charAt (1)) ? s.substring (0, 1) + Character.toLowerCase (s.charAt (1)) + s.substring (2) : s);
}, "~S");
Clazz.defineMethod (c$, "getAtomicNumber", 
 function (token) {
return this.parseIntStr (token) % 100;
}, "~S");
Clazz.defineMethod (c$, "readCoordLines", 
 function () {
var atom = (this.inputOnly ? " ATOM" : "  ATOM");
if (this.line.indexOf (atom) < 0) this.discardLinesUntilContains (atom);
this.lstCoords =  new JU.Lst ();
while (this.rd () != null && this.line.length > 0) if (this.line.indexOf ("****") < 0) this.lstCoords.addLast (this.line);

});
Clazz.defineMethod (c$, "processCoordLines", 
 function () {
if (this.lstCoords == null) return;
this.ac = this.lstCoords.size ();
var irreducible = null;
for (var i = 0; i < this.ac; i++) {
var atom = this.asc.addNewAtom ();
var tokens = JU.PT.getTokens (this.lstCoords.get (i));
atom.atomSerial = this.parseIntStr (tokens[0]);
var atomicNumber;
var offset;
switch (tokens.length) {
case 8:
case 7:
atomicNumber = this.getAtomicNumber (tokens[2]);
offset = 4;
if (i == 0) irreducible =  Clazz.newFloatArray (this.ac, 0);
if (tokens[1].equals ("T")) irreducible[i] = 1;
break;
default:
atomicNumber = this.getAtomicNumber (tokens[1]);
offset = 2;
break;
}
var x = this.parseFloatStr (tokens[offset++]) + this.ptOriginShift.x;
var y = this.parseFloatStr (tokens[offset++]) + this.ptOriginShift.y;
var z = this.parseFloatStr (tokens[offset]) + this.ptOriginShift.z;
this.setAtomCoordXYZ (atom, x, y, z);
atom.elementSymbol = J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (atomicNumber);
}
this.lstCoords = null;
if (irreducible != null) {
this.asc.setAtomProperties ("irreducible", irreducible, -1, false);
}if (this.primitiveVolume > 0) {
this.asc.setAtomSetModelProperty ("volumePrimitive", JU.DF.formatDecimal (this.primitiveVolume, 3));
this.asc.setModelInfoForSet ("primitiveVolume", Float.$valueOf (this.primitiveVolume), this.asc.iSet);
}if (this.primitiveDensity > 0) {
this.asc.setAtomSetModelProperty ("densityPrimitive", JU.DF.formatDecimal (this.primitiveDensity, 3));
this.asc.setModelInfoForSet ("primitiveDensity", Float.$valueOf (this.primitiveDensity), this.asc.iSet);
}});
Clazz.overrideMethod (c$, "applySymmetryAndSetTrajectory", 
function () {
this.setUnitCellOrientation ();
var m4p2c;
var m4c2p;
if (this.primitiveToCrystal != null) {
this.asc.setModelInfoForSet ("primitiveToCrystal", this.primitiveToCrystal, this.asc.iSet);
m4p2c =  new JU.M4 ();
m4p2c.setRotationScale (this.primitiveToCrystal);
m4p2c.m33 = 1;
this.asc.setModelInfoForSet ("mat4PrimitiveToCrystal", m4p2c, this.asc.iSet);
m4c2p = JU.M4.newM4 (m4p2c);
m4c2p.invert ();
this.asc.setModelInfoForSet ("mat4CrystalToPrimitive", m4c2p, this.asc.iSet);
if (this.symops.size () > 0) {
this.asc.setModelInfoForSet ("fileSymmetryOperations", this.symops.clone (), this.asc.iSet);
}}this.iHaveSymmetryOperators = false;
this.applySymTrajASCR ();
});
Clazz.defineMethod (c$, "newAtomSet", 
 function () {
if (this.ac > 0 && this.asc.ac > 0) {
this.applySymmetryAndSetTrajectory ();
this.asc.newAtomSet ();
}if (this.spaceGroupName != null) {
this.setSpaceGroupName (this.spaceGroupName);
}this.ac = 0;
});
Clazz.defineMethod (c$, "setEnergy", 
 function () {
this.asc.setAtomSetEnergy ("" + this.energy, this.energy.floatValue ());
this.asc.setCurrentModelInfo ("Energy", this.energy);
this.asc.setInfo ("Energy", this.energy);
this.asc.setAtomSetName ("Energy = " + this.energy + " Hartree");
});
Clazz.defineMethod (c$, "readPartialCharges", 
 function () {
if (this.haveCharges || this.asc.ac == 0) return true;
this.haveCharges = true;
this.readLines (3);
var atoms = this.asc.atoms;
var i0 = this.asc.getLastAtomSetAtomIndex ();
var iPrim = 0;
while (this.rd () != null && this.line.length > 3) if (this.line.charAt (3) != ' ') {
var iConv = this.getAtomIndexFromPrimitiveIndex (iPrim);
if (iConv >= 0) atoms[i0 + iConv].partialCharge = this.parseFloatRange (this.line, 9, 11) - this.parseFloatRange (this.line, 12, 18);
iPrim++;
}
return true;
});
Clazz.defineMethod (c$, "readTotalAtomicCharges", 
 function () {
var data =  new JU.SB ();
while (this.rd () != null && this.line.indexOf ("T") < 0) data.append (this.line);

var tokens = JU.PT.getTokens (data.toString ());
var charges =  Clazz.newFloatArray (tokens.length, 0);
if (this.nuclearCharges == null || this.nuclearCharges.length != charges.length) this.nuclearCharges = charges;
if (this.asc.ac == 0) return true;
var atoms = this.asc.atoms;
var i0 = this.asc.getLastAtomSetAtomIndex ();
for (var i = 0; i < charges.length; i++) {
var iConv = this.getAtomIndexFromPrimitiveIndex (i);
if (iConv >= 0) {
charges[i] = this.parseFloatStr (tokens[i]);
atoms[i0 + iConv].partialCharge = this.nuclearCharges[i] - charges[i];
}}
return true;
});
Clazz.defineMethod (c$, "readFreqFragments", 
 function () {
var numAtomsFrag = this.parseIntRange (this.line, 39, 44);
if (numAtomsFrag < 0) return;
this.atomFrag =  Clazz.newIntArray (numAtomsFrag, 0);
var Sfrag = "";
while (this.rd () != null && this.line.indexOf ("(") >= 0) Sfrag += this.line;

Sfrag = JU.PT.rep (Sfrag, "(", " ");
Sfrag = JU.PT.rep (Sfrag, ")", " ");
var tokens = JU.PT.getTokens (Sfrag);
for (var i = 0, pos = 0; i < numAtomsFrag; i++, pos += 3) this.atomFrag[i] = this.getAtomIndexFromPrimitiveIndex (this.parseIntStr (tokens[pos]) - 1);

java.util.Arrays.sort (this.atomFrag);
});
Clazz.defineMethod (c$, "readFrequencies", 
 function () {
this.getLastConventional = false;
this.addModel ();
this.energy = null;
this.discardLinesUntilContains ("MODES");
var haveIntensities = (this.line.indexOf ("INTENS") >= 0);
this.rd ();
var vData =  new JU.Lst ();
var freqAtomCount = (this.atomFrag == null ? this.ac : 0);
while (this.rd () != null && this.line.length > 0) {
var i0 = this.parseIntRange (this.line, 1, 5);
var i1 = this.parseIntRange (this.line, 6, 10);
var irrep = (this.isLongMode ? this.line.substring (48, 51) : this.line.substring (49, 52)).trim ();
var intens = (!haveIntensities ? "not available" : (this.isLongMode ? this.line.substring (53, 61) : this.line.substring (59, 69).$replace (')', ' ')).trim ());
var irActivity = (this.isLongMode ? "A" : this.line.substring (55, 58).trim ());
var ramanActivity = (this.isLongMode ? "I" : this.line.substring (71, 73).trim ());
var data =  Clazz.newArray (-1, [irrep, intens, irActivity, ramanActivity]);
for (var i = i0; i <= i1; i++) vData.addLast (data);

}
var test = (this.isLongMode ? "LO MODES FOR IRREP" : this.isVersion3 ? "THE CORRESPONDING MODES" : "NORMAL MODES NORMALIZED TO CLASSICAL AMPLITUDES");
this.rd ();
var ramanData = null;
if (this.line.indexOf ("<RAMAN>") >= 0) ramanData = this.readRaman (null);
if (!this.line.contains (test)) this.discardLinesUntilContains (test);
this.rd ();
var modelAtomCount = -1;
while (this.rd () != null && this.line.startsWith (" FREQ(CM**-1)")) {
var tokens = JU.PT.getTokens (this.line.substring (15));
var frequencies =  Clazz.newFloatArray (tokens.length, 0);
var frequencyCount = frequencies.length;
for (var i = 0; i < frequencyCount; i++) {
frequencies[i] = this.parseFloatStr (tokens[i]);
if (this.debugging) JU.Logger.debug ((this.vibrationNumber + i) + " frequency=" + frequencies[i]);
}
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
var iAtom0 = 0;
var nData = vData.size ();
var isFirst = true;
for (var i = 0; i < frequencyCount; i++) {
tokens = vData.get (this.vibrationNumber % nData);
ignore[i] = (!this.doGetVibration (++this.vibrationNumber) || tokens == null);
if (ignore[i]) continue;
this.applySymmetryAndSetTrajectory ();
if (isFirst) {
modelAtomCount = this.asc.getLastAtomSetAtomCount ();
}this.cloneLastAtomSet (this.ac, null);
if (isFirst) {
iAtom0 = this.asc.getLastAtomSetAtomIndex ();
isFirst = false;
}this.setFreqValue (frequencies[i], tokens);
}
this.rd ();
this.fillFrequencyData (iAtom0, freqAtomCount, modelAtomCount, ignore, false, 14, 10, this.atomFrag, 0, null);
this.rd ();
}
if (ramanData != null) this.readRaman (ramanData);
});
Clazz.defineMethod (c$, "setFreqValue", 
 function (freq, data) {
var activity = "IR: " + data[2] + ", Ram.: " + data[3];
this.asc.setAtomSetFrequency (this.vibrationNumber, null, activity, "" + freq, null);
this.asc.setAtomSetModelProperty ("IRintensity", data[1] + " km/Mole");
this.asc.setAtomSetModelProperty ("vibrationalSymmetry", data[0]);
this.asc.setAtomSetModelProperty ("IRactivity", data[2]);
this.asc.setAtomSetModelProperty ("Ramanactivity", data[3]);
this.asc.setAtomSetName ((this.isLongMode ? "LO " : "") + data[0] + " " + JU.DF.formatDecimal (freq, 2) + " cm-1 (" + JU.DF.formatDecimal (Float.parseFloat (data[1]), 0) + " km/Mole), " + activity);
}, "~N,~A");
Clazz.defineMethod (c$, "readRaman", 
 function (ramanData) {
if (ramanData == null) {
ramanData =  new JU.Lst ();
this.rd ();
while (this.rd () != null && !this.line.contains ("<RAMAN>")) ramanData.addLast (this.line);

return ramanData;
}var info;
var i = 0;
var n = ramanData.size ();
for (; i < n; i++) {
this.line = ramanData.get (i);
if (this.line.contains ("---")) break;
}
for (++i; i < n; i++) {
this.line = ramanData.get (i);
if (this.line.length == 0) break;
var mode1 = this.parseIntRange (this.line, 1, 5);
var mode2 = this.parseIntRange (this.line, 6, 10);
var i_tot = this.parseFloatRange (this.line, 30, 40);
var i_par = this.parseFloatRange (this.line, 40, 50);
var i_perp = this.parseFloatRange (this.line, 50, 60);
for (var i0 = 0, mode = mode1; mode <= mode2; mode++) {
var imodel = this.getModelForMode (i0, mode);
if (imodel < 0) continue;
i0 = imodel + 1;
info = this.asc.getAtomSetAuxiliaryInfoValue (imodel, "ramanInfo");
if (info == null) this.asc.setModelInfoForSet ("ramanInfo", info =  new java.util.Hashtable (), imodel);
info.put ("isotropicIntensities",  Clazz.newFloatArray (-1, [i_tot, i_par, i_perp]));
}
}
for (; i < n; i++) {
this.line = ramanData.get (i);
if (this.line.contains ("---")) break;
}
for (++i; i < n; i++) {
this.line = ramanData.get (i);
if (this.line.length == 0) break;
var mode1 = this.parseIntRange (this.line, 1, 5);
var mode2 = this.parseIntRange (this.line, 6, 10);
var i_xx = this.parseFloatRange (this.line, 30, 38);
var i_xy = this.parseFloatRange (this.line, 38, 46);
var i_xz = this.parseFloatRange (this.line, 46, 54);
var i_yy = this.parseFloatRange (this.line, 54, 62);
var i_yz = this.parseFloatRange (this.line, 62, 70);
var i_zz = this.parseFloatRange (this.line, 70, 78);
for (var i0 = 0, mode = mode1; mode <= mode2; mode++) {
var imodel = this.getModelForMode (i0, mode);
if (imodel < 0) continue;
i0 = imodel + 1;
var a =  Clazz.newArray (-1, [ Clazz.newDoubleArray (-1, [i_xx, i_xy, i_xz]),  Clazz.newDoubleArray (-1, [i_xy, i_yy, i_yz]),  Clazz.newDoubleArray (-1, [i_xz, i_yz, i_zz])]);
this.asc.atoms[this.asc.getAtomSetAtomIndex (imodel)].addTensor ( new JU.Tensor ().setFromAsymmetricTensor (a, "raman", "mode" + mode), "raman", false);
}
}
this.appendLoadNote ("Ellipsoids set \"raman\": Raman tensors");
return null;
}, "JU.Lst");
Clazz.defineMethod (c$, "getModelForMode", 
 function (i0, mode) {
var n = this.asc.atomSetCount;
for (var i = i0; i < n; i++) {
var imode = this.asc.getAtomSetAuxiliaryInfoValue (i, "vibrationalMode");
var m = (imode == null ? 0 : imode.intValue ());
if (m == mode) return i;
}
return -1;
}, "~N,~N");
Clazz.defineMethod (c$, "readGradient", 
 function () {
var key = null;
while (this.line != null) {
var tokens = this.getTokens ();
if (this.line.indexOf ("MAX GRAD") >= 0) key = "maxGradient";
 else if (this.line.indexOf ("RMS GRAD") >= 0) key = "rmsGradient";
 else if (this.line.indexOf ("MAX DISP") >= 0) key = "maxDisplacement";
 else if (this.line.indexOf ("RMS DISP") >= 0) key = "rmsDisplacement";
 else break;
if (this.asc.ac > 0) this.asc.setAtomSetModelProperty (key, tokens[2]);
this.rd ();
}
return true;
});
Clazz.defineMethod (c$, "readData", 
 function (name, nfields) {
this.processCoordLines ();
var f =  Clazz.newFloatArray (this.ac, 0);
for (var i = 0; i < this.ac; i++) f[i] = 0;

var data = "";
while (this.rd () != null && (this.line.length < 4 || JU.PT.isDigit (this.line.charAt (3)))) data += this.line;

data = JU.PT.rep (data, "-", " -");
var tokens = JU.PT.getTokens (data);
for (var i = 0, pt = nfields - 1; i < this.ac; i++, pt += nfields) {
var iConv = this.getAtomIndexFromPrimitiveIndex (i);
if (iConv >= 0) f[iConv] = this.parseFloatStr (tokens[pt]);
}
this.asc.setAtomProperties (name, f, -1, false);
return true;
}, "~S,~N");
Clazz.defineMethod (c$, "getQuadrupoleTensors", 
 function () {
this.readLines (6);
var atoms = this.asc.atoms;
var vectors =  new Array (3);
if (this.directLatticeVectors == null) vectors =  Clazz.newArray (-1, [JU.V3.new3 (1, 0, 0), JU.V3.new3 (0, 1, 0), JU.V3.new3 (0, 0, 1)]);
 else for (var i = 0; i < 3; i++) {
vectors[i] = JU.V3.newV (this.directLatticeVectors[i]);
vectors[i].normalize ();
}
while (this.rd () != null && this.line.startsWith (" *** ATOM")) {
var tokens = this.getTokens ();
var index = this.parseIntStr (tokens[3]) - 1;
tokens = JU.PT.getTokens (this.readLines (3));
atoms[index].addTensor ( new JU.Tensor ().setFromEigenVectors (vectors,  Clazz.newFloatArray (-1, [this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[5])]), "quadrupole", atoms[index].atomName, null), null, false);
this.rd ();
}
this.appendLoadNote ("Ellipsoids set \"quadrupole\": Quadrupole tensors");
return true;
});
Clazz.defineMethod (c$, "readBornChargeTensors", 
 function () {
this.processCoordLines ();
this.rd ();
var atoms = this.asc.atoms;
while (this.rd ().startsWith (" ATOM")) {
var index = this.parseIntAt (this.line, 5) - 1;
var atom = atoms[index];
this.readLines (2);
atom.addTensor ( new JU.Tensor ().setFromAsymmetricTensor (this.fill3x3 (null, -3), "charge", atom.elementSymbol + (index + 1)), null, false);
this.rd ();
}
this.appendLoadNote ("Ellipsoids set \"charge\": Born charge tensors");
return false;
});
Clazz.defineStatics (c$,
"STATE_NONE", 0,
"STATE_INPUT", 1,
"STATE_INPUT_FROM", 2,
"STATE_WAVEFUNCTION", 3,
"STATE_OPT_POINT", 4,
"STATE_OPT_FINAL", 5,
"STATE_FREQ", 6,
"crtypes",  Clazz.newArray (-1, ["??", "nuclei", "bonds", "rings", "cages"]),
"smap",  Clazz.newIntArray (-1, [2, 3, 4, 11, 5, 6, 7, 12, 8, 9, 10, 13]));
});
