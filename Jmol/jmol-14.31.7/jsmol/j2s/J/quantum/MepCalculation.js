Clazz.declarePackage ("J.quantum");
Clazz.load (["J.quantum.QuantumCalculation"], "J.quantum.MepCalculation", ["java.lang.Float", "java.util.Hashtable", "JU.PT", "$.Rdr", "JU.Logger", "JV.FileManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.distanceMode = 0;
this.potentials = null;
this.atomCoordAngstroms = null;
this.bsSelected = null;
this.vwr = null;
this.htAtomicPotentials = null;
this.resourceName = null;
Clazz.instantialize (this, arguments);
}, J.quantum, "MepCalculation", J.quantum.QuantumCalculation);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.quantum.MepCalculation, []);
this.rangeBohrOrAngstroms = 8;
this.distanceMode = 0;
this.unitFactor = 1;
});
Clazz.defineMethod (c$, "set", 
function (vwr) {
this.vwr = vwr;
}, "JV.Viewer");
Clazz.defineMethod (c$, "assignPotentials", 
function (atoms, potentials, bsAromatic, bsCarbonyl, bsIgnore, data) {
this.getAtomicPotentials (data, null);
for (var i = 0; i < atoms.length; i++) {
var f;
if (bsIgnore != null && bsIgnore.get (i)) {
f = NaN;
} else {
f = this.getTabulatedPotential (atoms[i]);
if (Float.isNaN (f)) f = 0;
}if (JU.Logger.debugging) JU.Logger.debug (atoms[i].getInfo () + " " + f);
potentials[i] = f;
}
}, "~A,~A,JU.BS,JU.BS,JU.BS,~S");
Clazz.defineMethod (c$, "setup", 
function (calcType, potentials, atomCoordAngstroms, bsSelected) {
if (calcType >= 0) this.distanceMode = calcType;
this.potentials = potentials;
this.atomCoordAngstroms = atomCoordAngstroms;
this.bsSelected = bsSelected;
}, "~N,~A,~A,JU.BS");
Clazz.defineMethod (c$, "calculate", 
function (volumeData, bsSelected, xyz, atoms, potentials, calcType) {
this.setup (calcType, potentials, atoms, bsSelected);
this.voxelData = volumeData.getVoxelData ();
this.countsXYZ = volumeData.getVoxelCounts ();
this.initialize (this.countsXYZ[0], this.countsXYZ[1], this.countsXYZ[2], null);
this.setupCoordinates (volumeData.getOriginFloat (), volumeData.getVolumetricVectorLengths (), bsSelected, xyz, atoms, null, false);
this.setXYZBohr (this.points);
this.process ();
}, "J.jvxl.data.VolumeData,JU.BS,~A,~A,~A,~N");
Clazz.defineMethod (c$, "getValueAtPoint", 
function (pt) {
var value = 0;
for (var i = this.bsSelected.nextSetBit (0); i >= 0; i = this.bsSelected.nextSetBit (i + 1)) {
var x = this.potentials[i];
var d2 = pt.distanceSquared (this.atomCoordAngstroms[i]);
value += this.valueFor (x, d2, this.distanceMode);
}
return value;
}, "JU.P3");
Clazz.overrideMethod (c$, "process", 
function () {
for (var atomIndex = this.qmAtoms.length; --atomIndex >= 0; ) {
if ((this.thisAtom = this.qmAtoms[atomIndex]) == null) continue;
var x0 = this.potentials[atomIndex];
if (JU.Logger.debugging) JU.Logger.debug ("process map for atom " + atomIndex + this.thisAtom + "  charge=" + x0);
this.thisAtom.setXYZ (this, true);
for (var ix = this.xMax; --ix >= this.xMin; ) {
var dX = this.X2[ix];
for (var iy = this.yMax; --iy >= this.yMin; ) {
var dXY = dX + this.Y2[iy];
for (var iz = this.zMax; --iz >= this.zMin; ) {
this.voxelData[ix][iy][iz] += this.valueFor (x0, dXY + this.Z2[iz], this.distanceMode);
}
}
}
}
});
Clazz.defineMethod (c$, "valueFor", 
function (x0, d2, distanceMode) {
switch (distanceMode) {
case 0:
return (d2 == 0 ? x0 * Infinity : x0 / Math.sqrt (d2));
case 2:
return x0 / (1 + Math.sqrt (d2));
case 1:
return x0 * Math.exp (-Math.sqrt (d2) / 2);
case 3:
return x0 * Math.exp (-Math.sqrt (d2));
}
return x0;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getTabulatedPotential", 
function (atom) {
var name = atom.getAtomType ();
var g1 = atom.getGroup1 ('\0');
var type = atom.getBioStructureTypeName ();
if (g1.length == 0) {
g1 = atom.getGroup3 (true);
if (g1 == null) g1 = "";
}var key = g1 + name;
var o = this.htAtomicPotentials.get (key);
if (o == null && type.length > 0) o = this.htAtomicPotentials.get ("_" + type.charAt (0) + name);
return (Clazz.instanceOf (o, Float) ? (o).floatValue () : NaN);
}, "JM.Atom");
Clazz.defineMethod (c$, "getAtomicPotentials", 
function (data, resourceName) {
var br = null;
this.htAtomicPotentials =  new java.util.Hashtable ();
try {
br = (data == null ? JV.FileManager.getBufferedReaderForResource (this.vwr, this, "J/quantum/", resourceName) : JU.Rdr.getBR (data));
var line;
while ((line = br.readLine ()) != null) {
if (line.startsWith ("#")) continue;
var vs = JU.PT.getTokens (line);
if (vs.length < 2) continue;
if (JU.Logger.debugging) JU.Logger.debug (line);
this.htAtomicPotentials.put (vs[0], Float.$valueOf (JU.PT.parseFloat (vs[1])));
}
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Exception " + e.toString () + " in getResource " + resourceName);
try {
br.close ();
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
} else {
throw e;
}
}
}, "~S,~S");
Clazz.overrideMethod (c$, "createCube", 
function () {
});
Clazz.defineStatics (c$,
"ONE_OVER_D", 0,
"E_MINUS_D_OVER_2", 1,
"ONE_OVER_ONE_PLUS_D", 2,
"E_MINUS_D", 3);
});
