Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["JU.P3"], "J.adapter.smarter.XtalSymmetry", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.BS", "$.Lst", "$.M3", "$.M4", "$.P3i", "$.PT", "$.SB", "$.V3", "J.adapter.smarter.Atom", "JS.Symmetry", "$.SymmetryOperation", "JU.BSUtil", "$.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.asc = null;
this.acr = null;
this.symmetry = null;
this.unitCellParams = null;
this.baseUnitCell = null;
this.symmetryRange = 0;
this.doCentroidUnitCell = false;
this.centroidPacked = false;
this.packingError = 0;
this.filterSymop = null;
this.applySymmetryToBonds = false;
this.latticeCells = null;
this.trajectoryUnitCells = null;
this.doNormalize = true;
this.doPackUnitCell = false;
this.baseSymmetry = null;
this.sym2 = null;
this.rminx = 0;
this.rminy = 0;
this.rminz = 0;
this.rmaxx = 0;
this.rmaxy = 0;
this.rmaxz = 0;
this.ptOffset = null;
this.minXYZ = null;
this.maxXYZ = null;
this.minXYZ0 = null;
this.maxXYZ0 = null;
this.checkAll = false;
this.bondCount0 = 0;
this.dtype = 3;
this.unitCellTranslations = null;
this.latticeOp = 0;
this.latticeOnly = false;
this.noSymmetryCount = 0;
this.firstAtom = 0;
this.ptTemp = null;
this.mTemp = null;
this.nVib = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.smarter, "XtalSymmetry");
Clazz.prepareFields (c$, function () {
this.unitCellParams =  Clazz.newFloatArray (6, 0);
this.ptOffset =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (reader) {
this.acr = reader;
this.asc = reader.asc;
this.getSymmetry ();
return this;
}, "J.adapter.smarter.AtomSetCollectionReader");
Clazz.defineMethod (c$, "getSymmetry", 
function () {
return (this.symmetry == null ? (this.symmetry = this.acr.getInterface ("JS.Symmetry")) : this.symmetry);
});
Clazz.defineMethod (c$, "setSymmetry", 
function (symmetry) {
return (this.symmetry = symmetry);
}, "J.api.SymmetryInterface");
Clazz.defineMethod (c$, "setSymmetryRange", 
 function (factor) {
this.symmetryRange = factor;
this.asc.setInfo ("symmetryRange", Float.$valueOf (factor));
}, "~N");
Clazz.defineMethod (c$, "setLatticeCells", 
 function () {
this.latticeCells = this.acr.latticeCells;
var isLatticeRange = (this.latticeCells[0] <= 555 && this.latticeCells[1] >= 555 && (this.latticeCells[2] == 0 || this.latticeCells[2] == 1 || this.latticeCells[2] == -1));
this.doNormalize = this.latticeCells[0] != 0 && (!isLatticeRange || this.latticeCells[2] == 1);
this.applySymmetryToBonds = this.acr.applySymmetryToBonds;
this.doPackUnitCell = this.acr.doPackUnitCell;
this.doCentroidUnitCell = this.acr.doCentroidUnitCell;
this.centroidPacked = this.acr.centroidPacked;
this.filterSymop = this.acr.filterSymop;
});
Clazz.defineMethod (c$, "setUnitCell", 
 function (info, matUnitCellOrientation, unitCellOffset) {
this.unitCellParams =  Clazz.newFloatArray (info.length, 0);
for (var i = 0; i < info.length; i++) this.unitCellParams[i] = info[i];

this.asc.haveUnitCell = true;
this.asc.setCurrentModelInfo ("unitCellParams", this.unitCellParams);
if (this.asc.isTrajectory) {
if (this.trajectoryUnitCells == null) {
this.trajectoryUnitCells =  new JU.Lst ();
this.asc.setInfo ("unitCells", this.trajectoryUnitCells);
}this.trajectoryUnitCells.addLast (this.unitCellParams);
}this.asc.setGlobalBoolean (2);
this.getSymmetry ().setUnitCell (this.unitCellParams, false);
if (unitCellOffset != null) {
this.symmetry.setOffsetPt (unitCellOffset);
this.asc.setCurrentModelInfo ("unitCellOffset", unitCellOffset);
}if (matUnitCellOrientation != null) {
this.symmetry.initializeOrientation (matUnitCellOrientation);
this.asc.setCurrentModelInfo ("matUnitCellOrientation", matUnitCellOrientation);
}}, "~A,JU.M3,JU.P3");
Clazz.defineMethod (c$, "addSpaceGroupOperation", 
function (xyz, andSetLattice) {
if (andSetLattice) this.setLatticeCells ();
this.symmetry.setSpaceGroup (this.doNormalize);
return this.symmetry.addSpaceGroupOperation (xyz, 0);
}, "~S,~B");
Clazz.defineMethod (c$, "setLatticeParameter", 
function (latt) {
this.symmetry.setSpaceGroup (this.doNormalize);
this.symmetry.setLattice (latt);
}, "~N");
Clazz.defineMethod (c$, "applySymmetryFromReader", 
function (readerSymmetry) {
this.asc.setCoordinatesAreFractional (this.acr.iHaveFractionalCoordinates);
this.setUnitCell (this.acr.unitCellParams, this.acr.matUnitCellOrientation, this.acr.unitCellOffset);
this.setAtomSetSpaceGroupName (this.acr.sgName);
this.setSymmetryRange (this.acr.symmetryRange);
if (this.acr.doConvertToFractional || this.acr.fileCoordinatesAreFractional) {
this.setLatticeCells ();
var doApplySymmetry = true;
if (this.acr.ignoreFileSpaceGroupName || !this.acr.iHaveSymmetryOperators) {
if (!this.acr.merging || readerSymmetry == null) readerSymmetry = this.acr.getNewSymmetry ();
doApplySymmetry = readerSymmetry.createSpaceGroup (this.acr.desiredSpaceGroupIndex, (this.acr.sgName.indexOf ("!") >= 0 ? "P1" : this.acr.sgName), this.acr.unitCellParams, this.acr.modDim);
} else {
this.acr.doPreSymmetry ();
readerSymmetry = null;
}this.packingError = this.acr.packingError;
if (doApplySymmetry) {
if (readerSymmetry != null) this.setSpaceGroupFrom (readerSymmetry);
this.applySymmetryLattice ();
if (readerSymmetry != null && this.filterSymop == null) this.setAtomSetSpaceGroupName (readerSymmetry.getSpaceGroupName ());
}}if (this.acr.iHaveFractionalCoordinates && this.acr.merging && readerSymmetry != null) {
var atoms = this.asc.atoms;
for (var i = this.asc.getLastAtomSetAtomIndex (), n = this.asc.ac; i < n; i++) readerSymmetry.toCartesian (atoms[i], true);

this.asc.setCoordinatesAreFractional (false);
this.acr.addVibrations = false;
}return this.symmetry;
}, "J.api.SymmetryInterface");
Clazz.defineMethod (c$, "setSpaceGroupFrom", 
function (readerSymmetry) {
this.getSymmetry ().setSpaceGroupFrom (readerSymmetry);
}, "J.api.SymmetryInterface");
Clazz.defineMethod (c$, "setAtomSetSpaceGroupName", 
 function (spaceGroupName) {
this.symmetry.setSpaceGroupName (spaceGroupName);
this.asc.setCurrentModelInfo ("spaceGroup", spaceGroupName + "");
}, "~S");
Clazz.defineMethod (c$, "applySymmetryLattice", 
 function () {
if (!this.asc.coordinatesAreFractional || this.symmetry.getSpaceGroup () == null) return;
this.sym2 = null;
var maxX = this.latticeCells[0];
var maxY = this.latticeCells[1];
var maxZ = Math.abs (this.latticeCells[2]);
var kcode = this.latticeCells[3];
var dim = Clazz.floatToInt (this.symmetry.getUnitCellInfoType (6));
this.firstAtom = this.asc.getLastAtomSetAtomIndex ();
var bsAtoms = this.asc.bsAtoms;
if (bsAtoms != null) {
this.updateBSAtoms ();
this.firstAtom = bsAtoms.nextSetBit (this.firstAtom);
}this.rminx = this.rminy = this.rminz = 3.4028235E38;
this.rmaxx = this.rmaxy = this.rmaxz = -3.4028235E38;
var pt0 = null;
if (this.acr.latticeType == null) this.acr.latticeType = this.symmetry.getLatticeType ();
if (this.acr.isPrimitive) {
this.asc.setCurrentModelInfo ("isprimitive", Boolean.TRUE);
if (!"P".equals (this.acr.latticeType) || this.acr.primitiveToCrystal != null) {
this.asc.setCurrentModelInfo ("unitcell_conventional", this.symmetry.getConventionalUnitCell (this.acr.latticeType, this.acr.primitiveToCrystal));
}}if (this.acr.latticeType != null) {
this.asc.setCurrentModelInfo ("latticeType", this.acr.latticeType);
if (Clazz.instanceOf (this.acr.fillRange, String)) {
var type = this.acr.fillRange;
if (type.equals ("conventional")) {
this.acr.fillRange = this.symmetry.getConventionalUnitCell (this.acr.latticeType, this.acr.primitiveToCrystal);
} else if (type.equals ("primitive")) {
this.acr.fillRange = this.symmetry.getUnitCellVectors ();
this.symmetry.toFromPrimitive (true, this.acr.latticeType.charAt (0), this.acr.fillRange, this.acr.primitiveToCrystal);
} else {
this.acr.fillRange = null;
}if (this.acr.fillRange != null) this.acr.addJmolScript ("unitcell " + type);
}}if (this.acr.fillRange != null) {
bsAtoms = this.updateBSAtoms ();
this.acr.forcePacked = true;
this.doPackUnitCell = false;
this.minXYZ =  new JU.P3i ();
this.maxXYZ = JU.P3i.new3 (1, 1, 1);
var oabc =  new Array (4);
for (var i = 0; i < 4; i++) oabc[i] = JU.P3.newP ((this.acr.fillRange)[i]);

this.adjustRangeMinMax (oabc);
if (this.sym2 == null) {
this.sym2 =  new JS.Symmetry ();
this.sym2.getUnitCell (this.acr.fillRange, false, null);
}this.applyAllSymmetry (this.acr.ms, bsAtoms);
pt0 =  new JU.P3 ();
var atoms = this.asc.atoms;
for (var i = this.asc.ac; --i >= this.firstAtom; ) {
pt0.setT (atoms[i]);
this.symmetry.toCartesian (pt0, false);
this.sym2.toFractional (pt0, false);
if (this.acr.fixJavaFloat) JU.PT.fixPtFloats (pt0, 100000.0);
if (!this.isWithinCell (this.dtype, pt0, 0, 1, 0, 1, 0, 1, this.packingError)) bsAtoms.clear (i);
}
return;
}var offset = null;
this.nVib = 0;
var va = null;
var vb = null;
var vc = null;
this.baseSymmetry = this.symmetry;
var supercell = this.acr.strSupercell;
var oabc = null;
var isSuper = (supercell != null && supercell.indexOf (",") >= 0);
if (isSuper) {
oabc = this.symmetry.getV0abc (supercell);
if (oabc != null) {
this.minXYZ =  new JU.P3i ();
this.maxXYZ = JU.P3i.new3 (maxX, maxY, maxZ);
JU.SimpleUnitCell.setMinMaxLatticeParameters (dim, this.minXYZ, this.maxXYZ, kcode);
pt0 = JU.P3.newP (oabc[0]);
va = JU.P3.newP (oabc[1]);
vb = JU.P3.newP (oabc[2]);
vc = JU.P3.newP (oabc[3]);
this.adjustRangeMinMax (oabc);
}}var iAtomFirst = this.asc.getLastAtomSetAtomIndex ();
if (bsAtoms != null) iAtomFirst = bsAtoms.nextSetBit (iAtomFirst);
if (this.rminx == 3.4028235E38) {
supercell = null;
oabc = null;
} else {
var doPack0 = this.doPackUnitCell;
this.doPackUnitCell = doPack0;
bsAtoms = this.updateBSAtoms ();
this.applyAllSymmetry (this.acr.ms, null);
this.doPackUnitCell = doPack0;
var atoms = this.asc.atoms;
var atomCount = this.asc.ac;
for (var i = iAtomFirst; i < atomCount; i++) {
this.symmetry.toCartesian (atoms[i], true);
bsAtoms.set (i);
}
this.symmetry = null;
this.symmetry = this.getSymmetry ();
this.setUnitCell ( Clazz.newFloatArray (-1, [0, 0, 0, 0, 0, 0, va.x, va.y, va.z, vb.x, vb.y, vb.z, vc.x, vc.y, vc.z]), null, offset);
this.setAtomSetSpaceGroupName (oabc == null || supercell == null ? "P1" : "cell=" + supercell);
this.symmetry.setSpaceGroup (this.doNormalize);
this.symmetry.addSpaceGroupOperation ("x,y,z", 0);
if (pt0 != null) this.symmetry.toFractional (pt0, true);
for (var i = iAtomFirst; i < atomCount; i++) {
this.symmetry.toFractional (atoms[i], true);
if (pt0 != null) atoms[i].sub (pt0);
}
this.asc.haveAnisou = false;
this.asc.setCurrentModelInfo ("matUnitCellOrientation", null);
}this.minXYZ =  new JU.P3i ();
this.maxXYZ = JU.P3i.new3 (maxX, maxY, maxZ);
JU.SimpleUnitCell.setMinMaxLatticeParameters (dim, this.minXYZ, this.maxXYZ, kcode);
if (oabc == null) {
this.applyAllSymmetry (this.acr.ms, bsAtoms);
return;
}if (this.acr.forcePacked || this.doPackUnitCell) {
var atoms = this.asc.atoms;
var bs = this.updateBSAtoms ();
for (var i = bs.nextSetBit (iAtomFirst); i >= 0; i = bs.nextSetBit (i + 1)) {
if (!this.isWithinCell (this.dtype, atoms[i], this.minXYZ.x, this.maxXYZ.x, this.minXYZ.y, this.maxXYZ.y, this.minXYZ.z, this.maxXYZ.z, this.packingError)) bs.clear (i);
}
}});
Clazz.defineMethod (c$, "updateBSAtoms", 
 function () {
var bs = this.asc.bsAtoms;
if (bs == null) bs = this.asc.bsAtoms = JU.BSUtil.newBitSet2 (0, this.asc.ac);
if (bs.nextSetBit (this.firstAtom) < 0) bs.setBits (this.firstAtom, this.asc.ac);
return bs;
});
Clazz.defineMethod (c$, "adjustRangeMinMax", 
 function (oabc) {
var pa =  new JU.P3 ();
var pb =  new JU.P3 ();
var pc =  new JU.P3 ();
if (this.acr.forcePacked) {
pa.setT (oabc[1]);
pb.setT (oabc[2]);
pc.setT (oabc[3]);
pa.scale (this.packingError);
pb.scale (this.packingError);
pc.scale (this.packingError);
}oabc[0].scaleAdd2 (this.minXYZ.x, oabc[1], oabc[0]);
oabc[0].scaleAdd2 (this.minXYZ.y, oabc[2], oabc[0]);
oabc[0].scaleAdd2 (this.minXYZ.z, oabc[3], oabc[0]);
oabc[0].sub (pa);
oabc[0].sub (pb);
oabc[0].sub (pc);
var pt = JU.P3.newP (oabc[0]);
this.symmetry.toFractional (pt, true);
this.setSymmetryMinMax (pt);
oabc[1].scale (this.maxXYZ.x - this.minXYZ.x);
oabc[2].scale (this.maxXYZ.y - this.minXYZ.y);
oabc[3].scale (this.maxXYZ.z - this.minXYZ.z);
oabc[1].scaleAdd2 (2, pa, oabc[1]);
oabc[2].scaleAdd2 (2, pb, oabc[2]);
oabc[3].scaleAdd2 (2, pc, oabc[3]);
for (var i = 0; i < 3; i++) {
for (var j = i + 1; j < 4; j++) {
pt.add2 (oabc[i], oabc[j]);
if (i != 0) pt.add (oabc[0]);
this.symmetry.toFractional (pt, false);
this.setSymmetryMinMax (pt);
}
}
this.symmetry.toCartesian (pt, false);
pt.add (oabc[1]);
this.symmetry.toFractional (pt, false);
this.setSymmetryMinMax (pt);
this.minXYZ = JU.P3i.new3 (Clazz.doubleToInt (Math.min (0, Math.floor (this.rminx + 0.001))), Clazz.doubleToInt (Math.min (0, Math.floor (this.rminy + 0.001))), Clazz.doubleToInt (Math.min (0, Math.floor (this.rminz + 0.001))));
this.maxXYZ = JU.P3i.new3 (Clazz.doubleToInt (Math.max (1, Math.ceil (this.rmaxx - 0.001))), Clazz.doubleToInt (Math.max (1, Math.ceil (this.rmaxy - 0.001))), Clazz.doubleToInt (Math.max (1, Math.ceil (this.rmaxz - 0.001))));
}, "~A");
Clazz.defineMethod (c$, "setSymmetryMinMax", 
 function (c) {
if (this.rminx > c.x) this.rminx = c.x;
if (this.rminy > c.y) this.rminy = c.y;
if (this.rminz > c.z) this.rminz = c.z;
if (this.rmaxx < c.x) this.rmaxx = c.x;
if (this.rmaxy < c.y) this.rmaxy = c.y;
if (this.rmaxz < c.z) this.rmaxz = c.z;
}, "JU.P3");
Clazz.defineMethod (c$, "isWithinCell", 
function (dtype, pt, minX, maxX, minY, maxY, minZ, maxZ, slop) {
return (pt.x > minX - slop && pt.x < maxX + slop && (dtype < 2 || pt.y > minY - slop && pt.y < maxY + slop) && (dtype < 3 || pt.z > minZ - slop && pt.z < maxZ + slop));
}, "~N,JU.P3,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "applyAllSymmetry", 
 function (ms, bsAtoms) {
if (this.asc.ac == 0 || bsAtoms != null && bsAtoms.isEmpty ()) return;
var n = this.noSymmetryCount = this.asc.baseSymmetryAtomCount > 0 ? this.asc.baseSymmetryAtomCount : bsAtoms == null ? this.asc.getLastAtomSetAtomCount () : this.asc.ac - bsAtoms.nextSetBit (this.asc.getLastAtomSetAtomIndex ());
this.asc.setTensors ();
this.bondCount0 = this.asc.bondCount;
this.finalizeSymmetry (this.symmetry);
var operationCount = this.symmetry.getSpaceGroupOperationCount ();
var excludedOps = (this.acr.thisBiomolecule == null ? null :  new JU.BS ());
if (excludedOps != null) this.asc.checkSpecial = true;
this.dtype = Clazz.floatToInt (this.symmetry.getUnitCellInfoType (6));
JU.SimpleUnitCell.setMinMaxLatticeParameters (this.dtype, this.minXYZ, this.maxXYZ, 0);
this.latticeOp = this.symmetry.getLatticeOp ();
this.latticeOnly = (this.asc.checkLatticeOnly && this.latticeOp >= 0);
if (this.doCentroidUnitCell) this.asc.setInfo ("centroidMinMax",  Clazz.newIntArray (-1, [this.minXYZ.x, this.minXYZ.y, this.minXYZ.z, this.maxXYZ.x, this.maxXYZ.y, this.maxXYZ.z, (this.centroidPacked ? 1 : 0)]));
if (this.doCentroidUnitCell || this.doPackUnitCell || this.symmetryRange != 0 && this.maxXYZ.x - this.minXYZ.x == 1 && this.maxXYZ.y - this.minXYZ.y == 1 && this.maxXYZ.z - this.minXYZ.z == 1) {
this.minXYZ0 = JU.P3.new3 (this.minXYZ.x, this.minXYZ.y, this.minXYZ.z);
this.maxXYZ0 = JU.P3.new3 (this.maxXYZ.x, this.maxXYZ.y, this.maxXYZ.z);
if (ms != null) {
ms.setMinMax0 (this.minXYZ0, this.maxXYZ0);
this.minXYZ.set (Clazz.floatToInt (this.minXYZ0.x), Clazz.floatToInt (this.minXYZ0.y), Clazz.floatToInt (this.minXYZ0.z));
this.maxXYZ.set (Clazz.floatToInt (this.maxXYZ0.x), Clazz.floatToInt (this.maxXYZ0.y), Clazz.floatToInt (this.maxXYZ0.z));
}switch (this.dtype) {
case 3:
this.minXYZ.z--;
this.maxXYZ.z++;
case 2:
this.minXYZ.y--;
this.maxXYZ.y++;
case 1:
this.minXYZ.x--;
this.maxXYZ.x++;
}
}var nCells = (this.maxXYZ.x - this.minXYZ.x) * (this.maxXYZ.y - this.minXYZ.y) * (this.maxXYZ.z - this.minXYZ.z);
var nsym = n * (this.latticeOnly ? 4 : operationCount);
var cartesianCount = (this.asc.checkSpecial || this.acr.thisBiomolecule != null ? nsym * nCells : this.symmetryRange > 0 ? nsym : 1);
var cartesians =  new Array (cartesianCount);
var atoms = this.asc.atoms;
for (var i = 0; i < n; i++) atoms[this.firstAtom + i].bsSymmetry = JU.BS.newN (operationCount * (nCells + 1));

var pt = 0;
var unitCells =  Clazz.newIntArray (nCells, 0);
this.unitCellTranslations =  new Array (nCells);
var iCell = 0;
var cell555Count = 0;
var absRange = Math.abs (this.symmetryRange);
var checkCartesianRange = (this.symmetryRange != 0);
var checkRangeNoSymmetry = (this.symmetryRange < 0);
var checkRange111 = (this.symmetryRange > 0);
if (checkCartesianRange) {
this.rminx = this.rminy = this.rminz = 3.4028235E38;
this.rmaxx = this.rmaxy = this.rmaxz = -3.4028235E38;
}var thisSymmetry = this.symmetry;
var lastSymmetry = thisSymmetry;
this.checkAll = (this.latticeOnly || this.asc.atomSetCount == 1 && this.asc.checkSpecial && this.latticeOp >= 0);
var pttemp = null;
var op = thisSymmetry.getSpaceGroupOperation (0);
if (this.doPackUnitCell) {
pttemp =  new JU.P3 ();
this.ptOffset.set (0, 0, 0);
}var atomMap = (this.bondCount0 > this.asc.bondIndex0 && this.applySymmetryToBonds ?  Clazz.newIntArray (n, 0) : null);
var lstNCS = this.acr.lstNCS;
if (lstNCS != null && lstNCS.get (0).m33 == 0) {
var nOp = thisSymmetry.getSpaceGroupOperationCount ();
var nn = lstNCS.size ();
for (var i = nn; --i >= 0; ) {
var m = lstNCS.get (i);
m.m33 = 1;
thisSymmetry.toFractionalM (m);
}
for (var i = 1; i < nOp; i++) {
var m1 = thisSymmetry.getSpaceGroupOperation (i);
for (var j = 0; j < nn; j++) {
var m = JU.M4.newM4 (lstNCS.get (j));
m.mul2 (m1, m);
if (this.doNormalize) JS.SymmetryOperation.setOffset (m, atoms, this.firstAtom, this.noSymmetryCount);
lstNCS.addLast (m);
}
}
}for (var tx = this.minXYZ.x; tx < this.maxXYZ.x; tx++) for (var ty = this.minXYZ.y; ty < this.maxXYZ.y; ty++) for (var tz = this.minXYZ.z; tz < this.maxXYZ.z; tz++) {
this.unitCellTranslations[iCell] = JU.V3.new3 (tx, ty, tz);
unitCells[iCell++] = 555 + tx * 100 + ty * 10 + tz;
if (tx != 0 || ty != 0 || tz != 0 || cartesians.length == 0) continue;
for (pt = 0; pt < n; pt++) {
var atom = atoms[this.firstAtom + pt];
if (ms != null) {
thisSymmetry = ms.getAtomSymmetry (atom, this.symmetry);
if (thisSymmetry !== lastSymmetry) {
if (thisSymmetry.getSpaceGroupOperationCount () == 0) this.finalizeSymmetry (lastSymmetry = thisSymmetry);
op = thisSymmetry.getSpaceGroupOperation (0);
}}var c = JU.P3.newP (atom);
op.rotTrans (c);
thisSymmetry.toCartesian (c, false);
if (this.doPackUnitCell) {
thisSymmetry.toUnitCell (c, this.ptOffset);
pttemp.setT (c);
thisSymmetry.toFractional (pttemp, false);
if (this.acr.fixJavaFloat) JU.PT.fixPtFloats (pttemp, 100000.0);
if (bsAtoms == null) atom.setT (pttemp);
 else if (atom.distance (pttemp) < 0.0001) bsAtoms.set (atom.index);
 else {
bsAtoms.clear (atom.index);
continue;
}}if (bsAtoms != null) atom.bsSymmetry.clearAll ();
atom.bsSymmetry.set (iCell * operationCount);
atom.bsSymmetry.set (0);
if (checkCartesianRange) this.setSymmetryMinMax (c);
if (pt < cartesianCount) cartesians[pt] = c;
}
if (checkRangeNoSymmetry) {
this.rminx -= absRange;
this.rminy -= absRange;
this.rminz -= absRange;
this.rmaxx += absRange;
this.rmaxy += absRange;
this.rmaxz += absRange;
}cell555Count = pt = this.symmetryAddAtoms (0, 0, 0, 0, pt, iCell * operationCount, cartesians, ms, excludedOps, atomMap);
}


if (checkRange111) {
this.rminx -= absRange;
this.rminy -= absRange;
this.rminz -= absRange;
this.rmaxx += absRange;
this.rmaxy += absRange;
this.rmaxz += absRange;
}iCell = 0;
for (var tx = this.minXYZ.x; tx < this.maxXYZ.x; tx++) for (var ty = this.minXYZ.y; ty < this.maxXYZ.y; ty++) for (var tz = this.minXYZ.z; tz < this.maxXYZ.z; tz++) {
iCell++;
if (tx != 0 || ty != 0 || tz != 0) pt = this.symmetryAddAtoms (tx, ty, tz, cell555Count, pt, iCell * operationCount, cartesians, ms, excludedOps, atomMap);
}


if (iCell * n == this.asc.ac - this.firstAtom) this.duplicateAtomProperties (iCell);
this.setSymmetryOps ();
this.asc.setCurrentModelInfo ("presymmetryAtomIndex", Integer.$valueOf (this.firstAtom));
this.asc.setCurrentModelInfo ("presymmetryAtomCount", Integer.$valueOf (n));
this.asc.setCurrentModelInfo ("latticeDesignation", thisSymmetry.getLatticeDesignation ());
this.asc.setCurrentModelInfo ("unitCellRange", unitCells);
this.asc.setCurrentModelInfo ("unitCellTranslations", this.unitCellTranslations);
this.baseUnitCell = this.unitCellParams;
this.unitCellParams =  Clazz.newFloatArray (6, 0);
this.reset ();
}, "J.adapter.smarter.MSInterface,JU.BS");
Clazz.defineMethod (c$, "symmetryAddAtoms", 
 function (transX, transY, transZ, baseCount, pt, iCellOpPt, cartesians, ms, excludedOps, atomMap) {
var isBaseCell = (baseCount == 0);
var addBonds = (atomMap != null);
if (this.doPackUnitCell) this.ptOffset.set (transX, transY, transZ);
var range2 = this.symmetryRange * this.symmetryRange;
var checkRangeNoSymmetry = (this.symmetryRange < 0);
var checkRange111 = (this.symmetryRange > 0);
var checkSymmetryMinMax = (isBaseCell && checkRange111);
checkRange111 = new Boolean (checkRange111 & !isBaseCell).valueOf ();
var nOp = this.symmetry.getSpaceGroupOperationCount ();
var lstNCS = this.acr.lstNCS;
var nNCS = (lstNCS == null ? 0 : lstNCS.size ());
var nOperations = nOp + nNCS;
nNCS = Clazz.doubleToInt (nNCS / nOp);
var checkSpecial = (nOperations == 1 && !this.doPackUnitCell ? false : this.asc.checkSpecial);
var checkSymmetryRange = (checkRangeNoSymmetry || checkRange111);
var checkDistances = (checkSpecial || checkSymmetryRange);
var checkOps = (excludedOps != null);
var addCartesian = (checkSpecial || checkSymmetryMinMax);
var bsAtoms = (this.acr.isMolecular ? null : this.asc.bsAtoms);
var symmetry = this.symmetry;
if (checkRangeNoSymmetry) baseCount = this.noSymmetryCount;
var atomMax = this.firstAtom + this.noSymmetryCount;
var ptAtom =  new JU.P3 ();
var code = null;
var d0 = (checkOps ? 0.01 : 0.0001);
var subSystemId = '\u0000';
var j00 = (bsAtoms == null ? this.firstAtom : bsAtoms.nextSetBit (this.firstAtom));
out : for (var iSym = 0; iSym < nOperations; iSym++) {
if (isBaseCell && iSym == 0 || this.latticeOnly && iSym > 0 && (iSym % this.latticeOp) != 0 || excludedOps != null && excludedOps.get (iSym)) continue;
var pt0 = this.firstAtom + (checkSpecial || excludedOps != null ? pt : checkRange111 ? baseCount : 0);
var spinOp = (iSym >= nOp ? 0 : this.asc.vibScale == 0 ? symmetry.getSpinOp (iSym) : this.asc.vibScale);
var i0 = Math.max (this.firstAtom, (bsAtoms == null ? 0 : bsAtoms.nextSetBit (0)));
var checkDistance = checkDistances;
var spt = (iSym >= nOp ? Clazz.doubleToInt ((iSym - nOp) / nNCS) : iSym);
var cpt = spt + iCellOpPt;
for (var i = i0; i < atomMax; i++) {
var a = this.asc.atoms[i];
if (a.ignoreSymmetry || bsAtoms != null && !bsAtoms.get (i)) continue;
if (ms == null) {
symmetry.newSpaceGroupPoint (iSym, a, ptAtom, transX, transY, transZ, (iSym >= nOp ? lstNCS.get (iSym - nOp) : null));
} else {
symmetry = ms.getAtomSymmetry (a, this.symmetry);
symmetry.newSpaceGroupPoint (iSym, a, ptAtom, transX, transY, transZ, null);
code = symmetry.getSpaceGroupOperationCode (iSym);
if (code != null) {
subSystemId = code.charAt (0);
symmetry = ms.getSymmetryFromCode (code);
if (symmetry.getSpaceGroupOperationCount () == 0) this.finalizeSymmetry (symmetry);
}}if (this.acr.fixJavaFloat) JU.PT.fixPtFloats (ptAtom, 100000.0);
var c = JU.P3.newP (ptAtom);
symmetry.toCartesian (c, false);
if (this.doPackUnitCell) {
symmetry.toUnitCell (c, this.ptOffset);
ptAtom.setT (c);
symmetry.toFractional (ptAtom, false);
if (this.acr.fixJavaFloat) JU.PT.fixPtFloats (ptAtom, 100000.0);
if (!this.isWithinCell (this.dtype, ptAtom, this.minXYZ0.x, this.maxXYZ0.x, this.minXYZ0.y, this.maxXYZ0.y, this.minXYZ0.z, this.maxXYZ0.z, this.packingError)) continue;
}if (checkSymmetryMinMax) this.setSymmetryMinMax (c);
var special = null;
if (checkDistance) {
if (checkSymmetryRange && (c.x < this.rminx || c.y < this.rminy || c.z < this.rminz || c.x > this.rmaxx || c.y > this.rmaxy || c.z > this.rmaxz)) continue;
var minDist2 = 3.4028235E38;
var j0 = (this.checkAll ? this.asc.ac : pt0);
var name = a.atomName;
var id = (code == null ? a.altLoc : subSystemId);
for (var j = j00; j < j0; j++) {
if (bsAtoms != null && !bsAtoms.get (j)) continue;
var pc = cartesians[j - this.firstAtom];
if (pc == null) continue;
var d2 = c.distanceSquared (pc);
if (checkSpecial && d2 < d0) {
if (checkOps) {
excludedOps.set (iSym);
continue out;
}special = this.asc.atoms[j];
if ((special.atomName == null || special.atomName.equals (name)) && special.altLoc == id) break;
special = null;
}if (checkRange111 && j < baseCount && d2 < minDist2) minDist2 = d2;
}
if (checkRange111 && minDist2 > range2) continue;
}if (checkOps) {
checkDistance = false;
}var atomSite = a.atomSite;
if (special != null) {
if (addBonds) atomMap[atomSite] = special.index;
special.bsSymmetry.set (cpt);
special.bsSymmetry.set (spt);
} else {
if (addBonds) atomMap[atomSite] = this.asc.ac;
var atom1 = this.asc.newCloneAtom (a);
atom1.setT (ptAtom);
if (this.asc.bsAtoms != null) this.asc.bsAtoms.set (atom1.index);
if (spinOp != 0 && atom1.vib != null) {
symmetry.getSpaceGroupOperation (iSym).rotate (atom1.vib);
atom1.vib.scale (spinOp);
}atom1.atomSite = atomSite;
if (code != null) atom1.altLoc = subSystemId;
atom1.bsSymmetry = JU.BSUtil.newAndSetBit (cpt);
atom1.bsSymmetry.set (spt);
if (addCartesian) cartesians[pt++] = c;
var tensors = a.tensors;
if (tensors != null) {
atom1.tensors = null;
for (var j = tensors.size (); --j >= 0; ) {
var t = tensors.get (j);
if (t == null) continue;
if (nOp == 1) atom1.addTensor (t.copyTensor (), null, false);
 else this.addRotatedTensor (atom1, t, iSym, false, symmetry);
}
}}}
if (addBonds) {
var bonds = this.asc.bonds;
var atoms = this.asc.atoms;
for (var bondNum = this.asc.bondIndex0; bondNum < this.bondCount0; bondNum++) {
var bond = bonds[bondNum];
var atom1 = atoms[bond.atomIndex1];
var atom2 = atoms[bond.atomIndex2];
if (atom1 == null || atom2 == null) continue;
var iAtom1 = atomMap[atom1.atomSite];
var iAtom2 = atomMap[atom2.atomSite];
if (iAtom1 >= atomMax || iAtom2 >= atomMax) this.asc.addNewBondWithOrder (iAtom1, iAtom2, bond.order);
}
}}
return pt;
}, "~N,~N,~N,~N,~N,~N,~A,J.adapter.smarter.MSInterface,JU.BS,~A");
Clazz.defineMethod (c$, "duplicateAtomProperties", 
 function (nTimes) {
var p = this.asc.getAtomSetAuxiliaryInfoValue (-1, "atomProperties");
if (p != null) for (var entry, $entry = p.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var val = entry.getValue ();
if (Clazz.instanceOf (val, String)) {
var data = val;
var s =  new JU.SB ();
for (var i = nTimes; --i >= 0; ) s.append (data);

p.put (key, s.toString ());
} else {
var f = val;
var fnew =  Clazz.newFloatArray (f.length * nTimes, 0);
for (var i = nTimes; --i >= 0; ) System.arraycopy (f, 0, fnew, i * f.length, f.length);

}}
}, "~N");
Clazz.defineMethod (c$, "finalizeSymmetry", 
 function (symmetry) {
var name = this.asc.getAtomSetAuxiliaryInfoValue (-1, "spaceGroup");
symmetry.setFinalOperations (name, this.asc.atoms, this.firstAtom, this.noSymmetryCount, this.doNormalize, this.filterSymop);
if (this.filterSymop != null || name == null || name.equals ("unspecified!")) this.setAtomSetSpaceGroupName (symmetry.getSpaceGroupName ());
}, "J.api.SymmetryInterface");
Clazz.defineMethod (c$, "setSymmetryOps", 
 function () {
var operationCount = this.symmetry.getSpaceGroupOperationCount ();
if (operationCount > 0) {
var symmetryList =  new Array (operationCount);
for (var i = 0; i < operationCount; i++) symmetryList[i] = "" + this.symmetry.getSpaceGroupXyz (i, this.doNormalize);

this.asc.setCurrentModelInfo ("symmetryOperations", symmetryList);
this.asc.setCurrentModelInfo ("symmetryOps", this.symmetry.getSymmetryOperations ());
}this.asc.setCurrentModelInfo ("symmetryCount", Integer.$valueOf (operationCount));
this.asc.setCurrentModelInfo ("latticeType", this.acr.latticeType == null ? "P" : this.acr.latticeType);
this.asc.setCurrentModelInfo ("intlTableNo", this.symmetry.getIntTableNumber ());
if (this.acr.sgName == null || this.acr.sgName.indexOf ("?") >= 0 || this.acr.sgName.indexOf ("!") >= 0) this.setAtomSetSpaceGroupName (this.acr.sgName = this.symmetry.getSpaceGroupName ());
});
Clazz.defineMethod (c$, "getOverallSpan", 
function () {
return (this.maxXYZ0 == null ? JU.V3.new3 (this.maxXYZ.x - this.minXYZ.x, this.maxXYZ.y - this.minXYZ.y, this.maxXYZ.z - this.minXYZ.z) : JU.V3.newVsub (this.maxXYZ0, this.minXYZ0));
});
Clazz.defineMethod (c$, "applySymmetryBio", 
function (thisBiomolecule, applySymmetryToBonds, filter) {
var biomts = thisBiomolecule.get ("biomts");
if (biomts.size () < 2) return;
this.acr.lstNCS = null;
this.setLatticeCells ();
var lc = (this.latticeCells != null && this.latticeCells[0] != 0 ?  Clazz.newIntArray (3, 0) : null);
if (lc != null) for (var i = 0; i < 3; i++) lc[i] = this.latticeCells[i];

this.latticeCells = null;
var particleMode = (filter.indexOf ("BYCHAIN") >= 0 ? 1 : filter.indexOf ("BYSYMOP") >= 0 ? 2 : 0);
this.doNormalize = false;
var biomtchains = thisBiomolecule.get ("chains");
if (biomtchains.get (0).equals (biomtchains.get (1))) biomtchains = null;
this.symmetry = null;
this.getSymmetry ().setSpaceGroup (this.doNormalize);
this.addSpaceGroupOperation ("x,y,z", false);
var name = thisBiomolecule.get ("name");
this.setAtomSetSpaceGroupName (this.acr.sgName = name);
var len = biomts.size ();
this.applySymmetryToBonds = applySymmetryToBonds;
this.bondCount0 = this.asc.bondCount;
this.firstAtom = this.asc.getLastAtomSetAtomIndex ();
var atomMax = this.asc.ac;
var ht =  new java.util.Hashtable ();
var nChain = 0;
var atoms = this.asc.atoms;
var addBonds = (this.bondCount0 > this.asc.bondIndex0 && applySymmetryToBonds);
switch (particleMode) {
case 1:
for (var i = atomMax; --i >= this.firstAtom; ) {
var id = Integer.$valueOf (atoms[i].chainID);
var bs = ht.get (id);
if (bs == null) {
nChain++;
ht.put (id, bs =  new JU.BS ());
}bs.set (i);
}
this.asc.bsAtoms =  new JU.BS ();
for (var i = 0; i < nChain; i++) {
this.asc.bsAtoms.set (atomMax + i);
var a =  new J.adapter.smarter.Atom ();
a.set (0, 0, 0);
a.radius = 16;
this.asc.addAtom (a);
}
var ichain = 0;
for (var e, $e = ht.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var a = atoms[atomMax + ichain++];
var bs = e.getValue ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) a.add (atoms[i]);

a.scale (1 / bs.cardinality ());
a.atomName = "Pt" + ichain;
a.chainID = e.getKey ().intValue ();
}
this.firstAtom = atomMax;
atomMax += nChain;
addBonds = false;
break;
case 2:
this.asc.bsAtoms =  new JU.BS ();
this.asc.bsAtoms.set (atomMax);
var a = atoms[atomMax] =  new J.adapter.smarter.Atom ();
a.set (0, 0, 0);
for (var i = atomMax; --i >= this.firstAtom; ) a.add (atoms[i]);

a.scale (1 / (atomMax - this.firstAtom));
a.atomName = "Pt";
a.radius = 16;
this.asc.addAtom (a);
this.firstAtom = atomMax++;
addBonds = false;
break;
}
var assemblyIdAtoms = thisBiomolecule.get ("asemblyIdAtoms");
if (filter.indexOf ("#<") >= 0) {
len = Math.min (len, JU.PT.parseInt (filter.substring (filter.indexOf ("#<") + 2)) - 1);
filter = JU.PT.rep (filter, "#<", "_<");
}for (var iAtom = this.firstAtom; iAtom < atomMax; iAtom++) atoms[iAtom].bsSymmetry = JU.BSUtil.newAndSetBit (0);

var bsAtoms = this.asc.bsAtoms;
var atomMap = (addBonds ?  Clazz.newIntArray (this.asc.ac, 0) : null);
for (var i = (biomtchains == null ? 1 : 0); i < len; i++) {
if (filter.indexOf ("!#") >= 0) {
if (filter.indexOf ("!#" + (i + 1) + ";") >= 0) continue;
} else if (filter.indexOf ("#") >= 0 && filter.indexOf ("#" + (i + 1) + ";") < 0) {
continue;
}var mat = biomts.get (i);
var chains = (biomtchains == null ? null : biomtchains.get (i));
if (chains != null && assemblyIdAtoms != null) {
bsAtoms =  new JU.BS ();
for (var e, $e = assemblyIdAtoms.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (chains.indexOf (":" + e.getKey () + ";") >= 0) bsAtoms.or (e.getValue ());

if (this.asc.bsAtoms != null) bsAtoms.and (this.asc.bsAtoms);
chains = null;
}for (var iAtom = this.firstAtom; iAtom < atomMax; iAtom++) {
if (bsAtoms != null && !bsAtoms.get (iAtom) || chains != null && chains.indexOf (":" + this.acr.vwr.getChainIDStr (atoms[iAtom].chainID) + ";") < 0) continue;
try {
var atomSite = atoms[iAtom].atomSite;
var atom1;
if (addBonds) atomMap[atomSite] = this.asc.ac;
atom1 = this.asc.newCloneAtom (atoms[iAtom]);
if (this.asc.bsAtoms != null) this.asc.bsAtoms.set (atom1.index);
atom1.atomSite = atomSite;
mat.rotTrans (atom1);
atom1.bsSymmetry = JU.BSUtil.newAndSetBit (i);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.asc.errorMessage = "appendAtomCollection error: " + e;
} else {
throw e;
}
}
}
if (i > 0) {
this.symmetry.addBioMoleculeOperation (mat, false);
if (addBonds) {
for (var bondNum = this.asc.bondIndex0; bondNum < this.bondCount0; bondNum++) {
var bond = this.asc.bonds[bondNum];
var iAtom1 = atomMap[atoms[bond.atomIndex1].atomSite];
var iAtom2 = atomMap[atoms[bond.atomIndex2].atomSite];
this.asc.addNewBondWithOrder (iAtom1, iAtom2, bond.order);
}
}}}
if (biomtchains != null) {
if (this.asc.bsAtoms == null) this.asc.bsAtoms = JU.BSUtil.newBitSet2 (0, this.asc.ac);
this.asc.bsAtoms.clearBits (this.firstAtom, atomMax);
}this.noSymmetryCount = atomMax - this.firstAtom;
this.asc.setCurrentModelInfo ("presymmetryAtomIndex", Integer.$valueOf (this.firstAtom));
this.asc.setCurrentModelInfo ("presymmetryAtomCount", Integer.$valueOf (this.noSymmetryCount));
this.asc.setCurrentModelInfo ("biosymmetryCount", Integer.$valueOf (len));
this.asc.setCurrentModelInfo ("biosymmetry", this.symmetry);
this.finalizeSymmetry (this.symmetry);
this.setSymmetryOps ();
this.reset ();
}, "java.util.Map,~B,~S");
Clazz.defineMethod (c$, "reset", 
 function () {
this.asc.coordinatesAreFractional = false;
this.asc.setCurrentModelInfo ("hasSymmetry", Boolean.TRUE);
this.asc.setGlobalBoolean (1);
});
Clazz.defineMethod (c$, "addRotatedTensor", 
function (a, t, iSym, reset, symmetry) {
if (this.ptTemp == null) {
this.ptTemp =  new JU.P3 ();
this.mTemp =  new JU.M3 ();
}return a.addTensor ((this.acr.getInterface ("JU.Tensor")).setFromEigenVectors (symmetry.rotateAxes (iSym, t.eigenVectors, this.ptTemp, this.mTemp), t.eigenValues, t.isIsotropic ? "iso" : t.type, t.id, t), null, reset);
}, "J.adapter.smarter.Atom,JU.Tensor,~N,~B,J.api.SymmetryInterface");
Clazz.defineMethod (c$, "setTensors", 
function () {
var n = this.asc.ac;
for (var i = this.asc.getLastAtomSetAtomIndex (); i < n; i++) {
var a = this.asc.atoms[i];
if (a.anisoBorU == null) continue;
a.addTensor (this.symmetry.getTensor (this.acr.vwr, a.anisoBorU), null, false);
if (Float.isNaN (a.bfactor)) a.bfactor = a.anisoBorU[7] * 100;
a.anisoBorU = null;
}
});
Clazz.defineMethod (c$, "setTimeReversal", 
function (op, timeRev) {
this.symmetry.setTimeReversal (op, timeRev);
}, "~N,~N");
Clazz.defineMethod (c$, "setSpinVectors", 
function () {
if (this.nVib > 0 || this.asc.iSet < 0 || !this.acr.vibsFractional) return this.nVib;
var i0 = this.asc.getAtomSetAtomIndex (this.asc.iSet);
var sym = this.getBaseSymmetry ();
for (var i = this.asc.ac; --i >= i0; ) {
var v = this.asc.atoms[i].vib;
if (v != null) {
if (v.modDim > 0) {
(v).setMoment ();
} else {
v = v.clone ();
sym.toCartesian (v, true);
this.asc.atoms[i].vib = v;
}this.nVib++;
}}
return this.nVib;
});
Clazz.defineMethod (c$, "scaleFractionalVibs", 
function () {
var params = this.getBaseSymmetry ().getUnitCellParams ();
var ptScale = JU.P3.new3 (1 / params[0], 1 / params[1], 1 / params[2]);
var i0 = this.asc.getAtomSetAtomIndex (this.asc.iSet);
for (var i = this.asc.ac; --i >= i0; ) {
var v = this.asc.atoms[i].vib;
if (v != null) {
v.scaleT (ptScale);
}}
});
Clazz.defineMethod (c$, "getBaseSymmetry", 
function () {
return (this.baseSymmetry == null ? this.symmetry : this.baseSymmetry);
});
Clazz.defineMethod (c$, "finalizeUnitCell", 
function (ptSupercell) {
if (ptSupercell != null && this.baseUnitCell != null) {
this.baseUnitCell[22] = Math.max (1, Clazz.floatToInt (ptSupercell.x));
this.baseUnitCell[23] = Math.max (1, Clazz.floatToInt (ptSupercell.y));
this.baseUnitCell[24] = Math.max (1, Clazz.floatToInt (ptSupercell.z));
}}, "JU.P3");
Clazz.defineStatics (c$,
"PARTICLE_NONE", 0,
"PARTICLE_CHAIN", 1,
"PARTICLE_SYMOP", 2);
});
