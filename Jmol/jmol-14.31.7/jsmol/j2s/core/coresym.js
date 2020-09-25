(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Clazz_declarePackage ("J.adapter.smarter");
Clazz_load (["JU.P3"], "J.adapter.smarter.XtalSymmetry", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.BS", "$.Lst", "$.M3", "$.M4", "$.P3i", "$.PT", "$.SB", "$.V3", "J.adapter.smarter.Atom", "JS.Symmetry", "$.SymmetryOperation", "JU.BSUtil", "$.SimpleUnitCell"], function () {
c$ = Clazz_decorateAsClass (function () {
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
Clazz_instantialize (this, arguments);
}, J.adapter.smarter, "XtalSymmetry");
Clazz_prepareFields (c$, function () {
this.unitCellParams =  Clazz_newFloatArray (6, 0);
this.ptOffset =  new JU.P3 ();
});
Clazz_makeConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "set", 
function (reader) {
this.acr = reader;
this.asc = reader.asc;
this.getSymmetry ();
return this;
}, "J.adapter.smarter.AtomSetCollectionReader");
Clazz_defineMethod (c$, "getSymmetry", 
function () {
return (this.symmetry == null ? (this.symmetry = this.acr.getInterface ("JS.Symmetry")) : this.symmetry);
});
Clazz_defineMethod (c$, "setSymmetry", 
function (symmetry) {
return (this.symmetry = symmetry);
}, "J.api.SymmetryInterface");
Clazz_defineMethod (c$, "setSymmetryRange", 
 function (factor) {
this.symmetryRange = factor;
this.asc.setInfo ("symmetryRange", Float.$valueOf (factor));
}, "~N");
Clazz_defineMethod (c$, "setLatticeCells", 
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
Clazz_defineMethod (c$, "setUnitCell", 
 function (info, matUnitCellOrientation, unitCellOffset) {
this.unitCellParams =  Clazz_newFloatArray (info.length, 0);
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
Clazz_defineMethod (c$, "addSpaceGroupOperation", 
function (xyz, andSetLattice) {
if (andSetLattice) this.setLatticeCells ();
this.symmetry.setSpaceGroup (this.doNormalize);
return this.symmetry.addSpaceGroupOperation (xyz, 0);
}, "~S,~B");
Clazz_defineMethod (c$, "setLatticeParameter", 
function (latt) {
this.symmetry.setSpaceGroup (this.doNormalize);
this.symmetry.setLattice (latt);
}, "~N");
Clazz_defineMethod (c$, "applySymmetryFromReader", 
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
Clazz_defineMethod (c$, "setSpaceGroupFrom", 
function (readerSymmetry) {
this.getSymmetry ().setSpaceGroupFrom (readerSymmetry);
}, "J.api.SymmetryInterface");
Clazz_defineMethod (c$, "setAtomSetSpaceGroupName", 
 function (spaceGroupName) {
this.symmetry.setSpaceGroupName (spaceGroupName);
this.asc.setCurrentModelInfo ("spaceGroup", spaceGroupName + "");
}, "~S");
Clazz_defineMethod (c$, "applySymmetryLattice", 
 function () {
if (!this.asc.coordinatesAreFractional || this.symmetry.getSpaceGroup () == null) return;
this.sym2 = null;
var maxX = this.latticeCells[0];
var maxY = this.latticeCells[1];
var maxZ = Math.abs (this.latticeCells[2]);
var kcode = this.latticeCells[3];
var dim = Clazz_floatToInt (this.symmetry.getUnitCellInfoType (6));
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
if (Clazz_instanceOf (this.acr.fillRange, String)) {
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
this.setUnitCell ( Clazz_newFloatArray (-1, [0, 0, 0, 0, 0, 0, va.x, va.y, va.z, vb.x, vb.y, vb.z, vc.x, vc.y, vc.z]), null, offset);
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
Clazz_defineMethod (c$, "updateBSAtoms", 
 function () {
var bs = this.asc.bsAtoms;
if (bs == null) bs = this.asc.bsAtoms = JU.BSUtil.newBitSet2 (0, this.asc.ac);
if (bs.nextSetBit (this.firstAtom) < 0) bs.setBits (this.firstAtom, this.asc.ac);
return bs;
});
Clazz_defineMethod (c$, "adjustRangeMinMax", 
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
this.minXYZ = JU.P3i.new3 (Clazz_doubleToInt (Math.min (0, Math.floor (this.rminx + 0.001))), Clazz_doubleToInt (Math.min (0, Math.floor (this.rminy + 0.001))), Clazz_doubleToInt (Math.min (0, Math.floor (this.rminz + 0.001))));
this.maxXYZ = JU.P3i.new3 (Clazz_doubleToInt (Math.max (1, Math.ceil (this.rmaxx - 0.001))), Clazz_doubleToInt (Math.max (1, Math.ceil (this.rmaxy - 0.001))), Clazz_doubleToInt (Math.max (1, Math.ceil (this.rmaxz - 0.001))));
}, "~A");
Clazz_defineMethod (c$, "setSymmetryMinMax", 
 function (c) {
if (this.rminx > c.x) this.rminx = c.x;
if (this.rminy > c.y) this.rminy = c.y;
if (this.rminz > c.z) this.rminz = c.z;
if (this.rmaxx < c.x) this.rmaxx = c.x;
if (this.rmaxy < c.y) this.rmaxy = c.y;
if (this.rmaxz < c.z) this.rmaxz = c.z;
}, "JU.P3");
Clazz_defineMethod (c$, "isWithinCell", 
function (dtype, pt, minX, maxX, minY, maxY, minZ, maxZ, slop) {
return (pt.x > minX - slop && pt.x < maxX + slop && (dtype < 2 || pt.y > minY - slop && pt.y < maxY + slop) && (dtype < 3 || pt.z > minZ - slop && pt.z < maxZ + slop));
}, "~N,JU.P3,~N,~N,~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "applyAllSymmetry", 
 function (ms, bsAtoms) {
if (this.asc.ac == 0 || bsAtoms != null && bsAtoms.isEmpty ()) return;
var n = this.noSymmetryCount = this.asc.baseSymmetryAtomCount > 0 ? this.asc.baseSymmetryAtomCount : bsAtoms == null ? this.asc.getLastAtomSetAtomCount () : this.asc.ac - bsAtoms.nextSetBit (this.asc.getLastAtomSetAtomIndex ());
this.asc.setTensors ();
this.bondCount0 = this.asc.bondCount;
this.finalizeSymmetry (this.symmetry);
var operationCount = this.symmetry.getSpaceGroupOperationCount ();
var excludedOps = (this.acr.thisBiomolecule == null ? null :  new JU.BS ());
if (excludedOps != null) this.asc.checkSpecial = true;
this.dtype = Clazz_floatToInt (this.symmetry.getUnitCellInfoType (6));
JU.SimpleUnitCell.setMinMaxLatticeParameters (this.dtype, this.minXYZ, this.maxXYZ, 0);
this.latticeOp = this.symmetry.getLatticeOp ();
this.latticeOnly = (this.asc.checkLatticeOnly && this.latticeOp >= 0);
if (this.doCentroidUnitCell) this.asc.setInfo ("centroidMinMax",  Clazz_newIntArray (-1, [this.minXYZ.x, this.minXYZ.y, this.minXYZ.z, this.maxXYZ.x, this.maxXYZ.y, this.maxXYZ.z, (this.centroidPacked ? 1 : 0)]));
if (this.doCentroidUnitCell || this.doPackUnitCell || this.symmetryRange != 0 && this.maxXYZ.x - this.minXYZ.x == 1 && this.maxXYZ.y - this.minXYZ.y == 1 && this.maxXYZ.z - this.minXYZ.z == 1) {
this.minXYZ0 = JU.P3.new3 (this.minXYZ.x, this.minXYZ.y, this.minXYZ.z);
this.maxXYZ0 = JU.P3.new3 (this.maxXYZ.x, this.maxXYZ.y, this.maxXYZ.z);
if (ms != null) {
ms.setMinMax0 (this.minXYZ0, this.maxXYZ0);
this.minXYZ.set (Clazz_floatToInt (this.minXYZ0.x), Clazz_floatToInt (this.minXYZ0.y), Clazz_floatToInt (this.minXYZ0.z));
this.maxXYZ.set (Clazz_floatToInt (this.maxXYZ0.x), Clazz_floatToInt (this.maxXYZ0.y), Clazz_floatToInt (this.maxXYZ0.z));
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
var unitCells =  Clazz_newIntArray (nCells, 0);
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
}var atomMap = (this.bondCount0 > this.asc.bondIndex0 && this.applySymmetryToBonds ?  Clazz_newIntArray (n, 0) : null);
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
this.unitCellParams =  Clazz_newFloatArray (6, 0);
this.reset ();
}, "J.adapter.smarter.MSInterface,JU.BS");
Clazz_defineMethod (c$, "symmetryAddAtoms", 
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
nNCS = Clazz_doubleToInt (nNCS / nOp);
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
var spt = (iSym >= nOp ? Clazz_doubleToInt ((iSym - nOp) / nNCS) : iSym);
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
Clazz_defineMethod (c$, "duplicateAtomProperties", 
 function (nTimes) {
var p = this.asc.getAtomSetAuxiliaryInfoValue (-1, "atomProperties");
if (p != null) for (var entry, $entry = p.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var val = entry.getValue ();
if (Clazz_instanceOf (val, String)) {
var data = val;
var s =  new JU.SB ();
for (var i = nTimes; --i >= 0; ) s.append (data);

p.put (key, s.toString ());
} else {
var f = val;
var fnew =  Clazz_newFloatArray (f.length * nTimes, 0);
for (var i = nTimes; --i >= 0; ) System.arraycopy (f, 0, fnew, i * f.length, f.length);

}}
}, "~N");
Clazz_defineMethod (c$, "finalizeSymmetry", 
 function (symmetry) {
var name = this.asc.getAtomSetAuxiliaryInfoValue (-1, "spaceGroup");
symmetry.setFinalOperations (name, this.asc.atoms, this.firstAtom, this.noSymmetryCount, this.doNormalize, this.filterSymop);
if (this.filterSymop != null || name == null || name.equals ("unspecified!")) this.setAtomSetSpaceGroupName (symmetry.getSpaceGroupName ());
}, "J.api.SymmetryInterface");
Clazz_defineMethod (c$, "setSymmetryOps", 
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
Clazz_defineMethod (c$, "getOverallSpan", 
function () {
return (this.maxXYZ0 == null ? JU.V3.new3 (this.maxXYZ.x - this.minXYZ.x, this.maxXYZ.y - this.minXYZ.y, this.maxXYZ.z - this.minXYZ.z) : JU.V3.newVsub (this.maxXYZ0, this.minXYZ0));
});
Clazz_defineMethod (c$, "applySymmetryBio", 
function (thisBiomolecule, applySymmetryToBonds, filter) {
var biomts = thisBiomolecule.get ("biomts");
if (biomts.size () < 2) return;
this.acr.lstNCS = null;
this.setLatticeCells ();
var lc = (this.latticeCells != null && this.latticeCells[0] != 0 ?  Clazz_newIntArray (3, 0) : null);
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
var atomMap = (addBonds ?  Clazz_newIntArray (this.asc.ac, 0) : null);
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
if (Clazz_exceptionOf (e, Exception)) {
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
Clazz_defineMethod (c$, "reset", 
 function () {
this.asc.coordinatesAreFractional = false;
this.asc.setCurrentModelInfo ("hasSymmetry", Boolean.TRUE);
this.asc.setGlobalBoolean (1);
});
Clazz_defineMethod (c$, "addRotatedTensor", 
function (a, t, iSym, reset, symmetry) {
if (this.ptTemp == null) {
this.ptTemp =  new JU.P3 ();
this.mTemp =  new JU.M3 ();
}return a.addTensor ((this.acr.getInterface ("JU.Tensor")).setFromEigenVectors (symmetry.rotateAxes (iSym, t.eigenVectors, this.ptTemp, this.mTemp), t.eigenValues, t.isIsotropic ? "iso" : t.type, t.id, t), null, reset);
}, "J.adapter.smarter.Atom,JU.Tensor,~N,~B,J.api.SymmetryInterface");
Clazz_defineMethod (c$, "setTensors", 
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
Clazz_defineMethod (c$, "setTimeReversal", 
function (op, timeRev) {
this.symmetry.setTimeReversal (op, timeRev);
}, "~N,~N");
Clazz_defineMethod (c$, "setSpinVectors", 
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
Clazz_defineMethod (c$, "scaleFractionalVibs", 
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
Clazz_defineMethod (c$, "getBaseSymmetry", 
function () {
return (this.baseSymmetry == null ? this.symmetry : this.baseSymmetry);
});
Clazz_defineMethod (c$, "finalizeUnitCell", 
function (ptSupercell) {
if (ptSupercell != null && this.baseUnitCell != null) {
this.baseUnitCell[22] = Math.max (1, Clazz_floatToInt (ptSupercell.x));
this.baseUnitCell[23] = Math.max (1, Clazz_floatToInt (ptSupercell.y));
this.baseUnitCell[24] = Math.max (1, Clazz_floatToInt (ptSupercell.z));
}}, "JU.P3");
Clazz_defineStatics (c$,
"PARTICLE_NONE", 0,
"PARTICLE_CHAIN", 1,
"PARTICLE_SYMOP", 2);
});
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "SymmetryInterface");
Clazz_declarePackage ("JS");
Clazz_load (["J.api.SymmetryInterface"], "JS.Symmetry", ["JU.BS", "$.Lst", "$.P3", "J.api.Interface", "J.bspt.Bspt", "JS.PointGroup", "$.SpaceGroup", "$.SymmetryInfo", "$.SymmetryOperation", "$.UnitCell", "JU.Escape", "$.Logger", "$.SimpleUnitCell"], function () {
c$ = Clazz_decorateAsClass (function () {
this.pointGroup = null;
this.spaceGroup = null;
this.symmetryInfo = null;
this.unitCell = null;
this.$isBio = false;
this.desc = null;
this.cip = null;
Clazz_instantialize (this, arguments);
}, JS, "Symmetry", null, J.api.SymmetryInterface);
Clazz_overrideMethod (c$, "isBio", 
function () {
return this.$isBio;
});
Clazz_makeConstructor (c$, 
function () {
});
Clazz_overrideMethod (c$, "setPointGroup", 
function (siLast, center, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance, localEnvOnly) {
this.pointGroup = JS.PointGroup.getPointGroup (siLast == null ? null : (siLast).pointGroup, center, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance, localEnvOnly);
return this;
}, "J.api.SymmetryInterface,JU.T3,~A,JU.BS,~B,~N,~N,~B");
Clazz_overrideMethod (c$, "getPointGroupName", 
function () {
return this.pointGroup.getName ();
});
Clazz_overrideMethod (c$, "getPointGroupInfo", 
function (modelIndex, drawID, asInfo, type, index, scale) {
if (drawID == null && !asInfo && this.pointGroup.textInfo != null) return this.pointGroup.textInfo;
 else if (drawID == null && this.pointGroup.isDrawType (type, index, scale)) return this.pointGroup.drawInfo;
 else if (asInfo && this.pointGroup.info != null) return this.pointGroup.info;
return this.pointGroup.getInfo (modelIndex, drawID, asInfo, type, index, scale);
}, "~N,~S,~B,~S,~N,~N");
Clazz_overrideMethod (c$, "setSpaceGroup", 
function (doNormalize) {
if (this.spaceGroup == null) this.spaceGroup = JS.SpaceGroup.getNull (true, doNormalize, false);
}, "~B");
Clazz_overrideMethod (c$, "addSpaceGroupOperation", 
function (xyz, opId) {
return this.spaceGroup.addSymmetry (xyz, opId, false);
}, "~S,~N");
Clazz_overrideMethod (c$, "addBioMoleculeOperation", 
function (mat, isReverse) {
this.$isBio = this.spaceGroup.isBio = true;
return this.spaceGroup.addSymmetry ((isReverse ? "!" : "") + "[[bio" + mat, 0, false);
}, "JU.M4,~B");
Clazz_overrideMethod (c$, "setLattice", 
function (latt) {
this.spaceGroup.setLatticeParam (latt);
}, "~N");
Clazz_defineMethod (c$, "getSpaceGroup", 
function () {
return this.spaceGroup;
});
Clazz_overrideMethod (c$, "setSpaceGroupFrom", 
function (symmetry) {
this.spaceGroup = symmetry.getSpaceGroup ();
}, "J.api.SymmetryInterface");
Clazz_overrideMethod (c$, "createSpaceGroup", 
function (desiredSpaceGroupIndex, name, data, modDim) {
this.spaceGroup = JS.SpaceGroup.createSpaceGroup (desiredSpaceGroupIndex, name, data, modDim);
if (this.spaceGroup != null && JU.Logger.debugging) JU.Logger.debug ("using generated space group " + this.spaceGroup.dumpInfo ());
return this.spaceGroup != null;
}, "~N,~S,~O,~N");
Clazz_overrideMethod (c$, "getSpaceGroupInfoObj", 
function (name, cellInfo, isFull) {
return JS.SpaceGroup.getInfo (this.spaceGroup, name, cellInfo, isFull);
}, "~S,J.api.SymmetryInterface,~B");
Clazz_overrideMethod (c$, "getLatticeDesignation", 
function () {
return this.spaceGroup.getLatticeDesignation ();
});
Clazz_overrideMethod (c$, "setFinalOperations", 
function (name, atoms, iAtomFirst, noSymmetryCount, doNormalize, filterSymop) {
if (name != null && (name.startsWith ("bio") || name.indexOf (" *(") >= 0)) this.spaceGroup.name = name;
if (filterSymop != null) {
var lst =  new JU.Lst ();
lst.addLast (this.spaceGroup.operations[0]);
for (var i = 1; i < this.spaceGroup.operationCount; i++) if (filterSymop.contains (" " + (i + 1) + " ")) lst.addLast (this.spaceGroup.operations[i]);

this.spaceGroup = JS.SpaceGroup.createSpaceGroup (-1, name + " *(" + filterSymop.trim () + ")", lst, -1);
}this.spaceGroup.setFinalOperations (atoms, iAtomFirst, noSymmetryCount, doNormalize);
}, "~S,~A,~N,~N,~B,~S");
Clazz_overrideMethod (c$, "getSpaceGroupOperation", 
function (i) {
return (this.spaceGroup == null || this.spaceGroup.operations == null || i >= this.spaceGroup.operations.length ? null : this.spaceGroup.finalOperations == null ? this.spaceGroup.operations[i] : this.spaceGroup.finalOperations[i]);
}, "~N");
Clazz_overrideMethod (c$, "getSpaceGroupXyz", 
function (i, doNormalize) {
return this.spaceGroup.getXyz (i, doNormalize);
}, "~N,~B");
Clazz_overrideMethod (c$, "newSpaceGroupPoint", 
function (i, atom1, atom2, transX, transY, transZ, o) {
if (o == null && this.spaceGroup.finalOperations == null) {
var op = this.spaceGroup.operations[i];
if (!op.isFinalized) op.doFinalize ();
JS.SymmetryOperation.newPoint (op, atom1, atom2, transX, transY, transZ);
return;
}JS.SymmetryOperation.newPoint ((o == null ? this.spaceGroup.finalOperations[i] : o), atom1, atom2, transX, transY, transZ);
}, "~N,JU.P3,JU.P3,~N,~N,~N,JU.M4");
Clazz_overrideMethod (c$, "rotateAxes", 
function (iop, axes, ptTemp, mTemp) {
return (iop == 0 ? axes : this.spaceGroup.finalOperations[iop].rotateAxes (axes, this.unitCell, ptTemp, mTemp));
}, "~N,~A,JU.P3,JU.M3");
Clazz_overrideMethod (c$, "getSpaceGroupOperationCode", 
function (iOp) {
return this.spaceGroup.operations[iOp].subsystemCode;
}, "~N");
Clazz_overrideMethod (c$, "setTimeReversal", 
function (op, val) {
this.spaceGroup.operations[op].setTimeReversal (val);
}, "~N,~N");
Clazz_overrideMethod (c$, "getSpinOp", 
function (op) {
return this.spaceGroup.operations[op].getMagneticOp ();
}, "~N");
Clazz_overrideMethod (c$, "addLatticeVectors", 
function (lattvecs) {
return this.spaceGroup.addLatticeVectors (lattvecs);
}, "JU.Lst");
Clazz_overrideMethod (c$, "getLatticeOp", 
function () {
return this.spaceGroup.latticeOp;
});
Clazz_overrideMethod (c$, "getOperationRsVs", 
function (iop) {
return (this.spaceGroup.finalOperations == null ? this.spaceGroup.operations : this.spaceGroup.finalOperations)[iop].rsvs;
}, "~N");
Clazz_overrideMethod (c$, "getSiteMultiplicity", 
function (pt) {
return this.spaceGroup.getSiteMultiplicity (pt, this.unitCell);
}, "JU.P3");
Clazz_overrideMethod (c$, "addOp", 
function (code, rs, vs, sigma) {
this.spaceGroup.isSSG = true;
var s = JS.SymmetryOperation.getXYZFromRsVs (rs, vs, false);
var i = this.spaceGroup.addSymmetry (s, -1, true);
this.spaceGroup.operations[i].setSigma (code, sigma);
return s;
}, "~S,JU.Matrix,JU.Matrix,JU.Matrix");
Clazz_overrideMethod (c$, "getMatrixFromString", 
function (xyz, rotTransMatrix, allowScaling, modDim) {
return JS.SymmetryOperation.getMatrixFromString (null, xyz, rotTransMatrix, allowScaling);
}, "~S,~A,~B,~N");
Clazz_overrideMethod (c$, "getSpaceGroupName", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.sgName : this.spaceGroup != null ? this.spaceGroup.getName () : this.unitCell != null && this.unitCell.name.length > 0 ? "cell=" + this.unitCell.name : "");
});
Clazz_overrideMethod (c$, "setSpaceGroupName", 
function (name) {
if (this.spaceGroup != null) this.spaceGroup.setName (name);
}, "~S");
Clazz_overrideMethod (c$, "getSpaceGroupOperationCount", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.symmetryOperations.length : this.spaceGroup != null && this.spaceGroup.finalOperations != null ? this.spaceGroup.finalOperations.length : 0);
});
Clazz_overrideMethod (c$, "getLatticeType", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.latticeType : this.spaceGroup == null ? "P" : this.spaceGroup.latticeType);
});
Clazz_overrideMethod (c$, "setLatticeType", 
function (type) {
if (this.spaceGroup != null) this.spaceGroup.latticeType = type;
}, "~S");
Clazz_overrideMethod (c$, "getIntTableNumber", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.intlTableNo : this.spaceGroup == null ? null : this.spaceGroup.intlTableNumber);
});
Clazz_overrideMethod (c$, "getCoordinatesAreFractional", 
function () {
return this.symmetryInfo == null || this.symmetryInfo.coordinatesAreFractional;
});
Clazz_overrideMethod (c$, "getCellRange", 
function () {
return this.symmetryInfo == null ? null : this.symmetryInfo.cellRange;
});
Clazz_overrideMethod (c$, "getSymmetryInfoStr", 
function () {
return (this.symmetryInfo == null ? "" : this.symmetryInfo.infoStr);
});
Clazz_overrideMethod (c$, "getSymmetryOperations", 
function () {
if (this.symmetryInfo != null) return this.symmetryInfo.symmetryOperations;
if (this.spaceGroup == null) this.spaceGroup = JS.SpaceGroup.getNull (true, false, true);
return this.spaceGroup.finalOperations;
});
Clazz_overrideMethod (c$, "isSimple", 
function () {
return (this.symmetryInfo == null || this.symmetryInfo.symmetryOperations == null);
});
Clazz_overrideMethod (c$, "setSymmetryInfo", 
function (modelIndex, modelAuxiliaryInfo, unitCellParams) {
this.symmetryInfo =  new JS.SymmetryInfo ();
var params = this.symmetryInfo.setSymmetryInfo (modelAuxiliaryInfo, unitCellParams);
if (params != null) {
this.setUnitCell (params, modelAuxiliaryInfo.containsKey ("jmolData"));
this.unitCell.moreInfo = modelAuxiliaryInfo.get ("moreUnitCellInfo");
modelAuxiliaryInfo.put ("infoUnitCell", this.getUnitCellAsArray (false));
this.setOffsetPt (modelAuxiliaryInfo.get ("unitCellOffset"));
var matUnitCellOrientation = modelAuxiliaryInfo.get ("matUnitCellOrientation");
if (matUnitCellOrientation != null) this.initializeOrientation (matUnitCellOrientation);
if (JU.Logger.debugging) JU.Logger.debug ("symmetryInfos[" + modelIndex + "]:\n" + this.unitCell.dumpInfo (true));
}return this;
}, "~N,java.util.Map,~A");
Clazz_overrideMethod (c$, "haveUnitCell", 
function () {
return (this.unitCell != null);
});
Clazz_overrideMethod (c$, "checkUnitCell", 
function (uc, cell, ptTemp, isAbsolute) {
uc.toFractional (ptTemp, isAbsolute);
return (ptTemp.x >= cell.x - 1 - 0.02 && ptTemp.x <= cell.x + 0.02 && ptTemp.y >= cell.y - 1 - 0.02 && ptTemp.y <= cell.y + 0.02 && ptTemp.z >= cell.z - 1 - 0.02 && ptTemp.z <= cell.z + 0.02);
}, "J.api.SymmetryInterface,JU.P3,JU.P3,~B");
Clazz_defineMethod (c$, "setUnitCell", 
function (unitCellParams, setRelative) {
this.unitCell = JS.UnitCell.fromParams (unitCellParams, setRelative);
}, "~A,~B");
Clazz_overrideMethod (c$, "unitCellEquals", 
function (uc2) {
return ((uc2)).unitCell.isSameAs (this.unitCell);
}, "J.api.SymmetryInterface");
Clazz_overrideMethod (c$, "getUnitCellState", 
function () {
return (this.unitCell == null ? "" : this.unitCell.getState ());
});
Clazz_overrideMethod (c$, "getMoreInfo", 
function () {
return this.unitCell.moreInfo;
});
Clazz_defineMethod (c$, "getUnitsymmetryInfo", 
function () {
return this.unitCell.dumpInfo (false);
});
Clazz_overrideMethod (c$, "initializeOrientation", 
function (mat) {
this.unitCell.initOrientation (mat);
}, "JU.M3");
Clazz_overrideMethod (c$, "unitize", 
function (ptFrac) {
this.unitCell.unitize (ptFrac);
}, "JU.T3");
Clazz_overrideMethod (c$, "toUnitCell", 
function (pt, offset) {
this.unitCell.toUnitCell (pt, offset);
}, "JU.T3,JU.T3");
Clazz_overrideMethod (c$, "toSupercell", 
function (fpt) {
return this.unitCell.toSupercell (fpt);
}, "JU.P3");
Clazz_defineMethod (c$, "toFractional", 
function (pt, ignoreOffset) {
if (!this.$isBio) this.unitCell.toFractional (pt, ignoreOffset);
}, "JU.T3,~B");
Clazz_overrideMethod (c$, "toFractionalM", 
function (m) {
if (!this.$isBio) this.unitCell.toFractionalM (m);
}, "JU.M4");
Clazz_overrideMethod (c$, "toCartesian", 
function (fpt, ignoreOffset) {
if (!this.$isBio) this.unitCell.toCartesian (fpt, ignoreOffset);
}, "JU.T3,~B");
Clazz_overrideMethod (c$, "getUnitCellParams", 
function () {
return this.unitCell.getUnitCellParams ();
});
Clazz_overrideMethod (c$, "getUnitCellAsArray", 
function (vectorsOnly) {
return this.unitCell.getUnitCellAsArray (vectorsOnly);
}, "~B");
Clazz_overrideMethod (c$, "getTensor", 
function (vwr, parBorU) {
if (parBorU == null) return null;
if (this.unitCell == null) this.unitCell = JS.UnitCell.fromParams ( Clazz_newFloatArray (-1, [1, 1, 1, 90, 90, 90]), true);
return this.unitCell.getTensor (vwr, parBorU);
}, "JV.Viewer,~A");
Clazz_overrideMethod (c$, "getUnitCellVerticesNoOffset", 
function () {
return this.unitCell.getVertices ();
});
Clazz_overrideMethod (c$, "getCartesianOffset", 
function () {
return this.unitCell.getCartesianOffset ();
});
Clazz_overrideMethod (c$, "getFractionalOffset", 
function () {
return this.unitCell.getFractionalOffset ();
});
Clazz_overrideMethod (c$, "setOffsetPt", 
function (pt) {
this.unitCell.setOffset (pt);
}, "JU.T3");
Clazz_overrideMethod (c$, "setOffset", 
function (nnn) {
var pt =  new JU.P3 ();
JU.SimpleUnitCell.ijkToPoint3f (nnn, pt, 0, 0);
this.unitCell.setOffset (pt);
}, "~N");
Clazz_overrideMethod (c$, "getUnitCellMultiplier", 
function () {
return this.unitCell.getUnitCellMultiplier ();
});
Clazz_overrideMethod (c$, "getCanonicalCopy", 
function (scale, withOffset) {
return this.unitCell.getCanonicalCopy (scale, withOffset);
}, "~N,~B");
Clazz_overrideMethod (c$, "getUnitCellInfoType", 
function (infoType) {
return this.unitCell.getInfo (infoType);
}, "~N");
Clazz_overrideMethod (c$, "getUnitCellInfo", 
function () {
return this.unitCell.dumpInfo (false);
});
Clazz_overrideMethod (c$, "isSlab", 
function () {
return this.unitCell.isSlab ();
});
Clazz_overrideMethod (c$, "isPolymer", 
function () {
return this.unitCell.isPolymer ();
});
Clazz_overrideMethod (c$, "checkDistance", 
function (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset) {
return this.unitCell.checkDistance (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset);
}, "JU.P3,JU.P3,~N,~N,~N,~N,~N,JU.P3");
Clazz_overrideMethod (c$, "getUnitCellVectors", 
function () {
return this.unitCell.getUnitCellVectors ();
});
Clazz_overrideMethod (c$, "getUnitCell", 
function (oabc, setRelative, name) {
if (oabc == null) return null;
this.unitCell = JS.UnitCell.fromOABC (oabc, setRelative);
if (name != null) this.unitCell.name = name;
return this;
}, "~A,~B,~S");
Clazz_overrideMethod (c$, "isSupercell", 
function () {
return this.unitCell.isSupercell ();
});
Clazz_overrideMethod (c$, "notInCentroid", 
function (modelSet, bsAtoms, minmax) {
try {
var bsDelete =  new JU.BS ();
var iAtom0 = bsAtoms.nextSetBit (0);
var molecules = modelSet.getMolecules ();
var moleculeCount = molecules.length;
var atoms = modelSet.at;
var isOneMolecule = (molecules[moleculeCount - 1].firstAtomIndex == modelSet.am[atoms[iAtom0].mi].firstAtomIndex);
var center =  new JU.P3 ();
var centroidPacked = (minmax[6] == 1);
nextMol : for (var i = moleculeCount; --i >= 0 && bsAtoms.get (molecules[i].firstAtomIndex); ) {
var bs = molecules[i].atomList;
center.set (0, 0, 0);
var n = 0;
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
if (isOneMolecule || centroidPacked) {
center.setT (atoms[j]);
if (this.isNotCentroid (center, 1, minmax, centroidPacked)) {
if (isOneMolecule) bsDelete.set (j);
} else if (!isOneMolecule) {
continue nextMol;
}} else {
center.add (atoms[j]);
n++;
}}
if (centroidPacked || n > 0 && this.isNotCentroid (center, n, minmax, false)) bsDelete.or (bs);
}
return bsDelete;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "JM.ModelSet,JU.BS,~A");
Clazz_defineMethod (c$, "isNotCentroid", 
 function (center, n, minmax, centroidPacked) {
center.scale (1 / n);
this.toFractional (center, false);
if (centroidPacked) return (center.x + 0.000005 <= minmax[0] || center.x - 0.000005 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y - 0.000005 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z - 0.000005 > minmax[5]);
return (center.x + 0.000005 <= minmax[0] || center.x + 0.00005 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y + 0.00005 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z + 0.00005 > minmax[5]);
}, "JU.P3,~N,~A,~B");
Clazz_defineMethod (c$, "getDesc", 
 function (modelSet) {
return (this.desc == null ? (this.desc = (J.api.Interface.getInterface ("JS.SymmetryDesc", modelSet.vwr, "eval"))) : this.desc).set (modelSet);
}, "JM.ModelSet");
Clazz_overrideMethod (c$, "getSymmetryInfoAtom", 
function (modelSet, iatom, xyz, op, pt, pt2, id, type, scaleFactor, nth, options) {
return this.getDesc (modelSet).getSymopInfo (iatom, xyz, op, pt, pt2, id, type, scaleFactor, nth, options);
}, "JM.ModelSet,~N,~S,~N,JU.P3,JU.P3,~S,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "getSpaceGroupInfo", 
function (modelSet, sgName, modelIndex, isFull, cellParams) {
var isForModel = (sgName == null);
if (sgName == null) {
var info = modelSet.getModelAuxiliaryInfo (modelSet.vwr.am.cmi);
if (info != null) sgName = info.get ("spaceGroup");
}var cellInfo = null;
if (cellParams != null) {
cellInfo =  new JS.Symmetry ();
cellInfo.setUnitCell (cellParams, false);
}return this.getDesc (modelSet).getSpaceGroupInfo (this, modelIndex, sgName, 0, null, null, null, 0, -1, isFull, isForModel, 0, cellInfo);
}, "JM.ModelSet,~S,~N,~B,~A");
Clazz_overrideMethod (c$, "fcoord", 
function (p) {
return JS.SymmetryOperation.fcoord (p);
}, "JU.T3");
Clazz_overrideMethod (c$, "getV0abc", 
function (def) {
return (this.unitCell == null ? null : this.unitCell.getV0abc (def));
}, "~O");
Clazz_overrideMethod (c$, "getQuaternionRotation", 
function (abc) {
return (this.unitCell == null ? null : this.unitCell.getQuaternionRotation (abc));
}, "~S");
Clazz_overrideMethod (c$, "getFractionalOrigin", 
function () {
return this.unitCell.getFractionalOrigin ();
});
Clazz_overrideMethod (c$, "getState", 
function (commands) {
var pt = this.getFractionalOffset ();
var loadUC = false;
if (pt != null && (pt.x != 0 || pt.y != 0 || pt.z != 0)) {
commands.append ("; set unitcell ").append (JU.Escape.eP (pt));
loadUC = true;
}pt = this.getUnitCellMultiplier ();
if (pt != null) {
commands.append ("; set unitcell ").append (JU.SimpleUnitCell.escapeMultiplier (pt));
loadUC = true;
}return loadUC;
}, "JU.SB");
Clazz_overrideMethod (c$, "getIterator", 
function (vwr, atom, atoms, bsAtoms, radius) {
return (J.api.Interface.getInterface ("JS.UnitCellIterator", vwr, "script")).set (this, atom, atoms, bsAtoms, radius);
}, "JV.Viewer,JM.Atom,~A,JU.BS,~N");
Clazz_overrideMethod (c$, "toFromPrimitive", 
function (toPrimitive, type, oabc, primitiveToCrystal) {
if (this.unitCell == null) this.unitCell = JS.UnitCell.fromOABC (oabc, false);
return this.unitCell.toFromPrimitive (toPrimitive, type, oabc, primitiveToCrystal);
}, "~B,~S,~A,JU.M3");
Clazz_overrideMethod (c$, "generateCrystalClass", 
function (pt0) {
var ops = this.getSymmetryOperations ();
var lst =  new JU.Lst ();
var isRandom = (pt0 == null);
var rand1 = 0;
var rand2 = 0;
var rand3 = 0;
if (isRandom) {
rand1 = 2.718281828459045;
rand2 = 3.141592653589793;
rand3 = Math.log10 (2000);
pt0 = JU.P3.new3 (rand1 + 1, rand2 + 2, rand3 + 3);
} else {
pt0 = JU.P3.newP (pt0);
}if (ops == null || this.unitCell == null) {
lst.addLast (pt0);
} else {
this.unitCell.toFractional (pt0, true);
var pt1 = null;
var pt2 = null;
var pt3 = null;
if (isRandom) {
pt1 = JU.P3.new3 (rand2 + 4, rand3 + 5, rand1 + 6);
this.unitCell.toFractional (pt1, true);
pt2 = JU.P3.new3 (rand3 + 7, rand1 + 8, rand2 + 9);
this.unitCell.toFractional (pt2, true);
}var bspt =  new J.bspt.Bspt (3, 0);
var iter = bspt.allocateCubeIterator ();
var pt =  new JU.P3 ();
out : for (var i = ops.length; --i >= 0; ) {
ops[i].rotate2 (pt0, pt);
iter.initialize (pt, 0.001, false);
if (iter.hasMoreElements ()) continue out;
var ptNew = JU.P3.newP (pt);
lst.addLast (ptNew);
bspt.addTuple (ptNew);
if (isRandom) {
if (pt2 != null) {
pt3 =  new JU.P3 ();
ops[i].rotate2 (pt2, pt3);
lst.addLast (pt3);
}if (pt1 != null) {
pt3 =  new JU.P3 ();
ops[i].rotate2 (pt1, pt3);
lst.addLast (pt3);
}}}
for (var j = lst.size (); --j >= 0; ) this.unitCell.toCartesian (lst.get (j), true);

}return lst;
}, "JU.P3");
Clazz_overrideMethod (c$, "calculateCIPChiralityForAtoms", 
function (vwr, bsAtoms) {
vwr.setCursor (3);
var cip = this.getCIPChirality (vwr);
var dataClass = (vwr.getBoolean (603979960) ? "CIPData" : "CIPDataTracker");
var data = (J.api.Interface.getInterface ("JS." + dataClass, vwr, "script")).set (vwr, bsAtoms);
data.setRule6Full (vwr.getBoolean (603979823));
cip.getChiralityForAtoms (data);
vwr.setCursor (0);
}, "JV.Viewer,JU.BS");
Clazz_overrideMethod (c$, "calculateCIPChiralityForSmiles", 
function (vwr, smiles) {
vwr.setCursor (3);
var cip = this.getCIPChirality (vwr);
var data = (J.api.Interface.getInterface ("JS.CIPDataSmiles", vwr, "script")).setAtomsForSmiles (vwr, smiles);
cip.getChiralityForAtoms (data);
vwr.setCursor (0);
return data.getSmilesChiralityArray ();
}, "JV.Viewer,~S");
Clazz_defineMethod (c$, "getCIPChirality", 
 function (vwr) {
return (this.cip == null ? (this.cip = (J.api.Interface.getInterface ("JS.CIPChirality", vwr, "script"))) : this.cip);
}, "JV.Viewer");
Clazz_overrideMethod (c$, "getConventionalUnitCell", 
function (latticeType, primitiveToCrystal) {
return (this.unitCell == null || latticeType == null ? null : this.unitCell.getConventionalUnitCell (latticeType, primitiveToCrystal));
}, "~S,JU.M3");
Clazz_overrideMethod (c$, "getUnitCellInfoMap", 
function () {
return (this.unitCell == null ? null : this.unitCell.getInfo ());
});
Clazz_defineMethod (c$, "setUnitCell", 
function (uc) {
this.unitCell = JS.UnitCell.cloneUnitCell (uc.unitCell);
}, "JS.Symmetry");
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.V3"], "JS.PointGroup", ["java.lang.Float", "java.util.Hashtable", "JU.Lst", "$.P3", "$.PT", "$.Quat", "$.SB", "J.bspt.Bspt", "JU.BSUtil", "$.Escape", "$.Logger", "$.Node", "$.Point3fi"], function () {
c$ = Clazz_decorateAsClass (function () {
this.isAtoms = false;
this.drawInfo = null;
this.info = null;
this.textInfo = null;
this.iter = null;
this.drawType = "";
this.drawIndex = 0;
this.scale = NaN;
this.nAxes = null;
this.axes = null;
this.nAtoms = 0;
this.radius = 0;
this.distanceTolerance = 0.25;
this.distanceTolerance2 = 0;
this.linearTolerance = 8;
this.cosTolerance = 0.99;
this.name = "C_1?";
this.principalAxis = null;
this.principalPlane = null;
this.vTemp = null;
this.centerAtomIndex = -1;
this.haveInversionCenter = false;
this.center = null;
this.points = null;
this.elements = null;
this.atomMap = null;
this.bsAtoms = null;
this.haveVibration = false;
this.localEnvOnly = false;
this.maxElement = 0;
this.eCounts = null;
this.nOps = 0;
if (!Clazz_isClassDefined ("JS.PointGroup.Operation")) {
JS.PointGroup.$PointGroup$Operation$ ();
}
Clazz_instantialize (this, arguments);
}, JS, "PointGroup");
Clazz_prepareFields (c$, function () {
this.nAxes =  Clazz_newIntArray (JS.PointGroup.maxAxis, 0);
this.axes =  new Array (JS.PointGroup.maxAxis);
this.vTemp =  new JU.V3 ();
});
Clazz_defineMethod (c$, "getName", 
function () {
return this.name;
});
c$.getPointGroup = Clazz_defineMethod (c$, "getPointGroup", 
function (pgLast, center, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance, localEnvOnly) {
var pg =  new JS.PointGroup ();
if (distanceTolerance == 0) {
distanceTolerance = 0.01;
linearTolerance = 0.5;
}pg.distanceTolerance = distanceTolerance;
pg.distanceTolerance2 = distanceTolerance * distanceTolerance;
pg.linearTolerance = linearTolerance;
pg.isAtoms = (bsAtoms != null);
pg.bsAtoms = (pg.isAtoms ? bsAtoms : JU.BSUtil.newBitSet2 (0, atomset.length));
pg.haveVibration = haveVibration;
pg.center = center;
pg.localEnvOnly = localEnvOnly;
return (pg.set (pgLast, atomset) ? pg : pgLast);
}, "JS.PointGroup,JU.T3,~A,JU.BS,~B,~N,~N,~B");
Clazz_makeConstructor (c$, 
 function () {
});
Clazz_defineMethod (c$, "isEqual", 
 function (pg) {
if (pg == null) return false;
if (this.linearTolerance != pg.linearTolerance || this.distanceTolerance != pg.distanceTolerance || this.nAtoms != pg.nAtoms || this.localEnvOnly != pg.localEnvOnly || this.haveVibration != pg.haveVibration || this.bsAtoms == null ? pg.bsAtoms != null : !this.bsAtoms.equals (pg.bsAtoms)) return false;
for (var i = 0; i < this.nAtoms; i++) {
if (this.elements[i] != pg.elements[i] || !this.points[i].equals (pg.points[i])) return false;
}
return true;
}, "JS.PointGroup");
Clazz_defineMethod (c$, "set", 
 function (pgLast, atomset) {
this.cosTolerance = (Math.cos (this.linearTolerance / 180 * 3.141592653589793));
if (!this.getPointsAndElements (atomset)) {
JU.Logger.error ("Too many atoms for point group calculation");
this.name = "point group not determined -- ac > 100 -- select fewer atoms and try again.";
return true;
}this.getElementCounts ();
if (this.haveVibration) {
var atomVibs =  new Array (this.points.length);
for (var i = this.points.length; --i >= 0; ) {
atomVibs[i] = JU.P3.newP (this.points[i]);
var v = (this.points[i]).getVibrationVector ();
if (v != null) atomVibs[i].add (v);
}
this.points = atomVibs;
}if (this.isEqual (pgLast)) return false;
this.findInversionCenter ();
if (this.isLinear (this.points)) {
if (this.haveInversionCenter) {
this.name = "D(infinity)h";
} else {
this.name = "C(infinity)v";
}this.vTemp.sub2 (this.points[1], this.points[0]);
this.addAxis (16, this.vTemp);
this.principalAxis = this.axes[16][0];
if (this.haveInversionCenter) {
this.axes[0] =  new Array (1);
this.principalPlane = this.axes[0][this.nAxes[0]++] = Clazz_innerTypeInstance (JS.PointGroup.Operation, this, null, this.vTemp);
}return true;
}this.axes[0] =  new Array (15);
var nPlanes = 0;
this.findCAxes ();
nPlanes = this.findPlanes ();
this.findAdditionalAxes (nPlanes);
try {
var n = this.getHighestOrder ();
if (this.nAxes[17] > 1) {
if (this.nAxes[19] > 1) {
if (this.haveInversionCenter) {
this.name = "Ih";
} else {
this.name = "I";
}} else if (this.nAxes[18] > 1) {
if (this.haveInversionCenter) {
this.name = "Oh";
} else {
this.name = "O";
}} else {
if (nPlanes > 0) {
if (this.haveInversionCenter) {
this.name = "Th";
} else {
this.name = "Td";
}} else {
this.name = "T";
}}} else {
if (n < 2) {
if (nPlanes == 1) {
this.name = "Cs";
return true;
}if (this.haveInversionCenter) {
this.name = "Ci";
return true;
}this.name = "C1";
} else if ((n % 2) == 1 && this.nAxes[16] > 0 || (n % 2) == 0 && this.nAxes[16] > 1) {
this.principalAxis = this.setPrincipalAxis (n, nPlanes);
if (nPlanes == 0) {
if (n < 14) {
this.name = "S" + n;
} else {
this.name = "D" + (n - 14);
}} else {
if (n < 14) n = Clazz_doubleToInt (n / 2);
 else n -= 14;
if (nPlanes == n) {
this.name = "D" + n + "d";
} else {
this.name = "D" + n + "h";
}}} else if (nPlanes == 0) {
this.principalAxis = this.axes[n][0];
if (n < 14) {
this.name = "S" + n;
} else {
this.name = "C" + (n - 14);
}} else if (nPlanes == n - 14) {
this.principalAxis = this.axes[n][0];
this.name = "C" + nPlanes + "v";
} else {
this.principalAxis = this.axes[n < 14 ? n + 14 : n][0];
this.principalPlane = this.axes[0][0];
if (n < 14) n /= 2;
 else n -= 14;
this.name = "C" + n + "h";
}}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
this.name = "??";
} else {
throw e;
}
}
JU.Logger.info ("Point group found: " + this.name);
return true;
}, "JS.PointGroup,~A");
Clazz_defineMethod (c$, "setPrincipalAxis", 
 function (n, nPlanes) {
var principalPlane = this.setPrincipalPlane (n, nPlanes);
if (nPlanes == 0 && n < 14 || this.nAxes[n] == 1) {
if (nPlanes > 0 && n < 14) n = 14 + Clazz_doubleToInt (n / 2);
return this.axes[n][0];
}if (principalPlane == null) return null;
for (var i = 0; i < this.nAxes[16]; i++) if (this.isParallel (principalPlane.normalOrAxis, this.axes[16][i].normalOrAxis)) {
if (i != 0) {
var o = this.axes[16][0];
this.axes[16][0] = this.axes[16][i];
this.axes[16][i] = o;
}return this.axes[16][0];
}
return null;
}, "~N,~N");
Clazz_defineMethod (c$, "setPrincipalPlane", 
 function (n, nPlanes) {
if (nPlanes == 1) return this.principalPlane = this.axes[0][0];
if (nPlanes == 0 || nPlanes == n - 14) return null;
for (var i = 0; i < nPlanes; i++) for (var j = 0, nPerp = 0; j < nPlanes; j++) if (this.isPerpendicular (this.axes[0][i].normalOrAxis, this.axes[0][j].normalOrAxis) && ++nPerp > 2) {
if (i != 0) {
var o = this.axes[0][0];
this.axes[0][0] = this.axes[0][i];
this.axes[0][i] = o;
}return this.principalPlane = this.axes[0][0];
}

return null;
}, "~N,~N");
Clazz_defineMethod (c$, "getPointsAndElements", 
 function (atomset) {
var ac = this.bsAtoms.cardinality ();
if (this.isAtoms && ac > 100) return false;
this.points =  new Array (ac);
this.elements =  Clazz_newIntArray (ac, 0);
if (ac == 0) return true;
var atomIndexMax = 0;
for (var i = this.bsAtoms.nextSetBit (0); i >= 0; i = this.bsAtoms.nextSetBit (i + 1)) {
var p = atomset[i];
if (Clazz_instanceOf (p, JU.Node)) atomIndexMax = Math.max (atomIndexMax, (p).i);
}
this.atomMap =  Clazz_newIntArray (atomIndexMax + 1, 0);
this.nAtoms = 0;
var needCenter = (this.center == null);
if (needCenter) this.center =  new JU.P3 ();
var bspt =  new J.bspt.Bspt (3, 0);
for (var i = this.bsAtoms.nextSetBit (0); i >= 0; i = this.bsAtoms.nextSetBit (i + 1), this.nAtoms++) {
var p = this.points[this.nAtoms] = atomset[i];
if (Clazz_instanceOf (p, JU.Node)) {
var bondIndex = (this.localEnvOnly ? 1 : 1 + Math.max (3, (p).getCovalentBondCount ()));
this.elements[this.nAtoms] = (p).getElementNumber () * bondIndex;
this.atomMap[(p).i] = this.nAtoms + 1;
} else if (Clazz_instanceOf (p, JU.Point3fi)) {
this.elements[this.nAtoms] = Math.max (0, (p).sD);
} else {
var newPt =  new JU.Point3fi ();
newPt.setT (p);
newPt.i = this.nAtoms;
p = newPt;
}bspt.addTuple (p);
if (needCenter) this.center.add (this.points[this.nAtoms]);
}
this.iter = bspt.allocateCubeIterator ();
if (needCenter) this.center.scale (1 / this.nAtoms);
for (var i = this.nAtoms; --i >= 0; ) {
var r2 = this.center.distanceSquared (this.points[i]);
if (this.isAtoms && r2 < this.distanceTolerance2) this.centerAtomIndex = i;
this.radius = Math.max (this.radius, r2);
}
this.radius = Math.sqrt (this.radius);
if (this.radius < 1.5 && this.distanceTolerance > 0.15) {
this.distanceTolerance = this.radius / 10;
this.distanceTolerance2 = this.distanceTolerance * this.distanceTolerance;
System.out.println ("PointGroup calculation adjusting distanceTolerance to " + this.distanceTolerance);
}return true;
}, "~A");
Clazz_defineMethod (c$, "findInversionCenter", 
 function () {
this.haveInversionCenter = this.checkOperation (null, this.center, -1);
if (this.haveInversionCenter) {
this.axes[1] =  new Array (1);
this.axes[1][0] = Clazz_innerTypeInstance (JS.PointGroup.Operation, this, null);
}});
Clazz_defineMethod (c$, "checkOperation", 
 function (q, center, iOrder) {
var pt =  new JU.P3 ();
var nFound = 0;
var isInversion = (iOrder < 14);
out : for (var i = this.points.length; --i >= 0 && nFound < this.points.length; ) {
if (i == this.centerAtomIndex) continue;
var a1 = this.points[i];
var e1 = this.elements[i];
if (q != null) {
pt.sub2 (a1, center);
q.transform2 (pt, pt).add (center);
} else {
pt.setT (a1);
}if (isInversion) {
this.vTemp.sub2 (center, pt);
pt.scaleAdd2 (2, this.vTemp, pt);
}if ((q != null || isInversion) && pt.distanceSquared (a1) < this.distanceTolerance2) {
nFound++;
continue;
}this.iter.initialize (pt, this.distanceTolerance, false);
while (this.iter.hasMoreElements ()) {
var a2 = this.iter.nextElement ();
if (a2 === a1) continue;
var j = this.getPointIndex ((a2).i);
if (this.centerAtomIndex >= 0 && j == this.centerAtomIndex || this.elements[j] != e1) continue;
if (pt.distanceSquared (a2) < this.distanceTolerance2) {
nFound++;
continue out;
}}
return false;
}
return true;
}, "JU.Quat,JU.T3,~N");
Clazz_defineMethod (c$, "getPointIndex", 
 function (j) {
return j < this.atomMap.length && this.atomMap[j] > 0 ? this.atomMap[j] - 1 : j;
}, "~N");
Clazz_defineMethod (c$, "isLinear", 
 function (atoms) {
var v1 = null;
if (atoms.length < 2) return false;
for (var i = atoms.length; --i >= 0; ) {
if (i == this.centerAtomIndex) continue;
if (v1 == null) {
v1 =  new JU.V3 ();
v1.sub2 (atoms[i], this.center);
v1.normalize ();
this.vTemp.setT (v1);
continue;
}this.vTemp.sub2 (atoms[i], this.center);
this.vTemp.normalize ();
if (!this.isParallel (v1, this.vTemp)) return false;
}
return true;
}, "~A");
Clazz_defineMethod (c$, "isParallel", 
 function (v1, v2) {
return (Math.abs (v1.dot (v2)) >= this.cosTolerance);
}, "JU.V3,JU.V3");
Clazz_defineMethod (c$, "isPerpendicular", 
 function (v1, v2) {
return (Math.abs (v1.dot (v2)) <= 1 - this.cosTolerance);
}, "JU.V3,JU.V3");
Clazz_defineMethod (c$, "getElementCounts", 
 function () {
for (var i = this.points.length; --i >= 0; ) {
var e1 = this.elements[i];
if (e1 > this.maxElement) this.maxElement = e1;
}
this.eCounts =  Clazz_newIntArray (++this.maxElement, 0);
for (var i = this.points.length; --i >= 0; ) this.eCounts[this.elements[i]]++;

});
Clazz_defineMethod (c$, "findCAxes", 
 function () {
var v1 =  new JU.V3 ();
var v2 =  new JU.V3 ();
var v3 =  new JU.V3 ();
for (var i = this.points.length; --i >= 0; ) {
if (i == this.centerAtomIndex) continue;
var a1 = this.points[i];
var e1 = this.elements[i];
for (var j = this.points.length; --j > i; ) {
var a2 = this.points[j];
if (this.elements[j] != e1) continue;
v1.sub2 (a1, this.center);
v2.sub2 (a2, this.center);
v1.normalize ();
v2.normalize ();
if (this.isParallel (v1, v2)) {
this.getAllAxes (v1);
continue;
}if (this.nAxes[16] < JS.PointGroup.axesMaxN[16]) {
v3.ave (a1, a2);
v3.sub (this.center);
this.getAllAxes (v3);
}var order = (6.283185307179586 / v1.angle (v2));
var iOrder = Clazz_doubleToInt (Math.floor (order + 0.01));
var isIntegerOrder = (order - iOrder <= 0.02);
if (!isIntegerOrder || (iOrder = iOrder + 14) >= JS.PointGroup.maxAxis) continue;
if (this.nAxes[iOrder] < JS.PointGroup.axesMaxN[iOrder]) {
v3.cross (v1, v2);
this.checkAxisOrder (iOrder, v3, this.center);
}}
}
var vs =  new Array (this.nAxes[16] * 2);
for (var i = 0; i < vs.length; i++) vs[i] =  new JU.V3 ();

var n = 0;
for (var i = 0; i < this.nAxes[16]; i++) {
vs[n++].setT (this.axes[16][i].normalOrAxis);
vs[n].setT (this.axes[16][i].normalOrAxis);
vs[n++].scale (-1);
}
for (var i = vs.length; --i >= 2; ) for (var j = i; --j >= 1; ) for (var k = j; --k >= 0; ) {
v3.add2 (vs[i], vs[j]);
v3.add (vs[k]);
if (v3.length () < 1.0) continue;
this.checkAxisOrder (17, v3, this.center);
}


var nMin = 2147483647;
var iMin = -1;
for (var i = 0; i < this.maxElement; i++) {
if (this.eCounts[i] < nMin && this.eCounts[i] > 2) {
nMin = this.eCounts[i];
iMin = i;
}}
out : for (var i = 0; i < this.points.length - 2; i++) if (this.elements[i] == iMin) for (var j = i + 1; j < this.points.length - 1; j++) if (this.elements[j] == iMin) for (var k = j + 1; k < this.points.length; k++) if (this.elements[k] == iMin) {
v1.sub2 (this.points[i], this.points[j]);
v2.sub2 (this.points[i], this.points[k]);
v1.normalize ();
v2.normalize ();
v3.cross (v1, v2);
this.getAllAxes (v3);
v1.add2 (this.points[i], this.points[j]);
v1.add (this.points[k]);
v1.normalize ();
if (!this.isParallel (v1, v3)) this.getAllAxes (v1);
if (this.nAxes[19] == JS.PointGroup.axesMaxN[19]) break out;
}


vs =  new Array (this.maxElement);
for (var i = this.points.length; --i >= 0; ) {
var e1 = this.elements[i];
if (vs[e1] == null) vs[e1] =  new JU.V3 ();
 else if (this.haveInversionCenter) continue;
vs[e1].add (this.points[i]);
}
if (!this.haveInversionCenter) for (var i = 0; i < this.maxElement; i++) if (vs[i] != null) vs[i].scale (1 / this.eCounts[i]);

for (var i = 0; i < this.maxElement; i++) if (vs[i] != null) for (var j = 0; j < this.maxElement; j++) {
if (i == j || vs[j] == null) continue;
if (this.haveInversionCenter) v1.cross (vs[i], vs[j]);
 else v1.sub2 (vs[i], vs[j]);
this.checkAxisOrder (16, v1, this.center);
}

return this.getHighestOrder ();
});
Clazz_defineMethod (c$, "getAllAxes", 
 function (v3) {
for (var o = 16; o < JS.PointGroup.maxAxis; o++) if (this.nAxes[o] < JS.PointGroup.axesMaxN[o]) this.checkAxisOrder (o, v3, this.center);

}, "JU.V3");
Clazz_defineMethod (c$, "getHighestOrder", 
 function () {
var n = 0;
for (n = 14; --n > 1 && this.nAxes[n] == 0; ) {
}
if (n > 1) return (n + 14 < JS.PointGroup.maxAxis && this.nAxes[n + 14] > 0 ? n + 14 : n);
for (n = JS.PointGroup.maxAxis; --n > 1 && this.nAxes[n] == 0; ) {
}
return n;
});
Clazz_defineMethod (c$, "checkAxisOrder", 
 function (iOrder, v, center) {
switch (iOrder) {
case 22:
if (this.nAxes[17] > 0) return false;
case 20:
case 18:
if (this.nAxes[19] > 0) return false;
break;
case 17:
if (this.nAxes[22] > 0) return false;
break;
case 19:
if (this.nAxes[18] > 0 || this.nAxes[20] > 0 || this.nAxes[22] > 0) return false;
break;
}
v.normalize ();
if (this.haveAxis (iOrder, v)) return false;
var q = JU.Quat.newVA (v, (iOrder < 14 ? 180 : 0) + Clazz_doubleToInt (360 / (iOrder % 14)));
if (!this.checkOperation (q, center, iOrder)) return false;
this.addAxis (iOrder, v);
switch (iOrder) {
case 16:
this.checkAxisOrder (4, v, center);
break;
case 17:
this.checkAxisOrder (3, v, center);
if (this.haveInversionCenter) this.addAxis (6, v);
break;
case 18:
this.addAxis (16, v);
this.checkAxisOrder (4, v, center);
this.checkAxisOrder (8, v, center);
break;
case 19:
this.checkAxisOrder (5, v, center);
if (this.haveInversionCenter) this.addAxis (10, v);
break;
case 20:
this.addAxis (16, v);
this.addAxis (17, v);
this.checkAxisOrder (3, v, center);
this.checkAxisOrder (6, v, center);
this.checkAxisOrder (12, v, center);
break;
case 22:
this.addAxis (16, v);
this.addAxis (18, v);
break;
}
return true;
}, "~N,JU.V3,JU.T3");
Clazz_defineMethod (c$, "addAxis", 
 function (iOrder, v) {
if (this.haveAxis (iOrder, v)) return;
if (this.axes[iOrder] == null) this.axes[iOrder] =  new Array (JS.PointGroup.axesMaxN[iOrder]);
this.axes[iOrder][this.nAxes[iOrder]++] = Clazz_innerTypeInstance (JS.PointGroup.Operation, this, null, v, iOrder);
}, "~N,JU.V3");
Clazz_defineMethod (c$, "haveAxis", 
 function (iOrder, v) {
if (this.nAxes[iOrder] == JS.PointGroup.axesMaxN[iOrder]) {
return true;
}if (this.nAxes[iOrder] > 0) for (var i = this.nAxes[iOrder]; --i >= 0; ) {
if (this.isParallel (v, this.axes[iOrder][i].normalOrAxis)) return true;
}
return false;
}, "~N,JU.V3");
Clazz_defineMethod (c$, "findPlanes", 
 function () {
var pt =  new JU.P3 ();
var v1 =  new JU.V3 ();
var v2 =  new JU.V3 ();
var v3 =  new JU.V3 ();
var nPlanes = 0;
var haveAxes = (this.getHighestOrder () > 1);
for (var i = this.points.length; --i >= 0; ) {
if (i == this.centerAtomIndex) continue;
var a1 = this.points[i];
var e1 = this.elements[i];
for (var j = this.points.length; --j > i; ) {
if (haveAxes && this.elements[j] != e1) continue;
var a2 = this.points[j];
pt.add2 (a1, a2);
pt.scale (0.5);
v1.sub2 (a1, this.center);
v2.sub2 (a2, this.center);
if (!this.isParallel (v1, v2)) {
v3.cross (v1, v2);
v3.normalize ();
nPlanes = this.getPlane (v3);
}v3.sub2 (a2, a1);
v3.normalize ();
nPlanes = this.getPlane (v3);
if (nPlanes == JS.PointGroup.axesMaxN[0]) return nPlanes;
}
}
if (haveAxes) for (var i = 16; i < JS.PointGroup.maxAxis; i++) for (var j = 0; j < this.nAxes[i]; j++) nPlanes = this.getPlane (this.axes[i][j].normalOrAxis);


return nPlanes;
});
Clazz_defineMethod (c$, "getPlane", 
 function (v3) {
if (!this.haveAxis (0, v3) && this.checkOperation (JU.Quat.newVA (v3, 180), this.center, -1)) this.axes[0][this.nAxes[0]++] = Clazz_innerTypeInstance (JS.PointGroup.Operation, this, null, v3);
return this.nAxes[0];
}, "JU.V3");
Clazz_defineMethod (c$, "findAdditionalAxes", 
 function (nPlanes) {
var planes = this.axes[0];
var Cn = 0;
if (nPlanes > 1 && ((Cn = nPlanes + 14) < JS.PointGroup.maxAxis) && this.nAxes[Cn] == 0) {
this.vTemp.cross (planes[0].normalOrAxis, planes[1].normalOrAxis);
if (!this.checkAxisOrder (Cn, this.vTemp, this.center) && nPlanes > 2) {
this.vTemp.cross (planes[1].normalOrAxis, planes[2].normalOrAxis);
this.checkAxisOrder (Cn - 1, this.vTemp, this.center);
}}if (this.nAxes[16] == 0 && nPlanes > 2) {
for (var i = 0; i < nPlanes - 1; i++) {
for (var j = i + 1; j < nPlanes; j++) {
this.vTemp.add2 (planes[1].normalOrAxis, planes[2].normalOrAxis);
this.checkAxisOrder (16, this.vTemp, this.center);
}
}
}}, "~N");
Clazz_defineMethod (c$, "getInfo", 
function (modelIndex, drawID, asInfo, type, index, scaleFactor) {
var asDraw = (drawID != null);
this.info = (asInfo ?  new java.util.Hashtable () : null);
var v =  new JU.V3 ();
var op;
if (scaleFactor == 0) scaleFactor = 1;
this.scale = scaleFactor;
var nType =  Clazz_newIntArray (4, 2, 0);
for (var i = 1; i < JS.PointGroup.maxAxis; i++) for (var j = this.nAxes[i]; --j >= 0; ) nType[this.axes[i][j].type][0]++;


var sb =  new JU.SB ().append ("# ").appendI (this.nAtoms).append (" atoms\n");
if (asDraw) {
drawID = "draw " + drawID;
var haveType = (type != null && type.length > 0);
this.drawType = type = (haveType ? type : "");
this.drawIndex = index;
var anyProperAxis = (type.equalsIgnoreCase ("Cn"));
var anyImproperAxis = (type.equalsIgnoreCase ("Sn"));
sb.append ("set perspectivedepth off;\n");
var m = "_" + modelIndex + "_";
if (!haveType) sb.append (drawID + "pg0").append (m).append ("* delete;draw pgva").append (m).append ("* delete;draw pgvp").append (m).append ("* delete;");
if (!haveType || type.equalsIgnoreCase ("Ci")) sb.append (drawID + "pg0").append (m).append (this.haveInversionCenter ? "inv " : " ").append (JU.Escape.eP (this.center)).append (this.haveInversionCenter ? "\"i\";\n" : ";\n");
var offset = 0.1;
for (var i = 2; i < JS.PointGroup.maxAxis; i++) {
if (i == 14) offset = 0.1;
if (this.nAxes[i] == 0) continue;
var label = this.axes[i][0].getLabel ();
offset += 0.25;
var scale = scaleFactor * this.radius + offset;
if (!haveType || type.equalsIgnoreCase (label) || anyProperAxis && i >= 14 || anyImproperAxis && i < 14) for (var j = 0; j < this.nAxes[i]; j++) {
if (index > 0 && j + 1 != index) continue;
op = this.axes[i][j];
v.add2 (op.normalOrAxis, this.center);
if (op.type == 2) scale = -scale;
sb.append (drawID + "pgva").append (m).append (label).append ("_").appendI (j + 1).append (" width 0.05 scale ").appendF (scale).append (" ").append (JU.Escape.eP (v));
v.scaleAdd2 (-2, op.normalOrAxis, v);
var isPA = (this.principalAxis != null && op.index == this.principalAxis.index);
sb.append (JU.Escape.eP (v)).append ("\"").append (label).append (isPA ? "*" : "").append ("\" color ").append (isPA ? "red" : op.type == 2 ? "blue" : "orange").append (";\n");
}
}
if (!haveType || type.equalsIgnoreCase ("Cs")) for (var j = 0; j < this.nAxes[0]; j++) {
if (index > 0 && j + 1 != index) continue;
op = this.axes[0][j];
sb.append (drawID + "pgvp").append (m).appendI (j + 1).append ("disk scale ").appendF (scaleFactor * this.radius * 2).append (" CIRCLE PLANE ").append (JU.Escape.eP (this.center));
v.add2 (op.normalOrAxis, this.center);
sb.append (JU.Escape.eP (v)).append (" color translucent yellow;\n");
v.add2 (op.normalOrAxis, this.center);
sb.append (drawID + "pgvp").append (m).appendI (j + 1).append ("ring width 0.05 scale ").appendF (scaleFactor * this.radius * 2).append (" arc ").append (JU.Escape.eP (v));
v.scaleAdd2 (-2, op.normalOrAxis, v);
sb.append (JU.Escape.eP (v));
v.add3 (0.011, 0.012, 0.013);
sb.append (JU.Escape.eP (v)).append ("{0 360 0.5} color ").append (this.principalPlane != null && op.index == this.principalPlane.index ? "red" : "blue").append (";\n");
}
sb.append ("# name=").append (this.name);
sb.append (", nCi=").appendI (this.haveInversionCenter ? 1 : 0);
sb.append (", nCs=").appendI (this.nAxes[0]);
sb.append (", nCn=").appendI (nType[1][0]);
sb.append (", nSn=").appendI (nType[2][0]);
sb.append (": ");
for (var i = JS.PointGroup.maxAxis; --i >= 2; ) if (this.nAxes[i] > 0) {
sb.append (" n").append (i < 14 ? "S" : "C").appendI (i % 14);
sb.append ("=").appendI (this.nAxes[i]);
}
sb.append (";\n");
sb.append ("print '" + this.name + "';\n");
this.drawInfo = sb.toString ();
if (JU.Logger.debugging) JU.Logger.info (this.drawInfo);
return this.drawInfo;
}var n = 0;
var nTotal = 1;
var ctype = (this.haveInversionCenter ? "Ci" : "center");
if (this.haveInversionCenter) nTotal++;
if (asInfo) this.info.put (ctype, this.center);
 else sb.append ("\n\n").append (this.name).append ("\t").append (ctype).append ("\t").append (JU.Escape.eP (this.center));
for (var i = JS.PointGroup.maxAxis; --i >= 0; ) {
if (this.nAxes[i] > 0) {
n = JS.PointGroup.nUnique[i];
var label = this.axes[i][0].getLabel ();
if (asInfo) this.info.put ("n" + label, Integer.$valueOf (this.nAxes[i]));
 else sb.append ("\n\n").append (this.name).append ("\tn").append (label).append ("\t").appendI (this.nAxes[i]).append ("\t").appendI (n);
n *= this.nAxes[i];
nTotal += n;
nType[this.axes[i][0].type][1] += n;
var vinfo = (asInfo ?  new JU.Lst () : null);
for (var j = 0; j < this.nAxes[i]; j++) {
if (asInfo) vinfo.addLast (this.axes[i][j].normalOrAxis);
 else sb.append ("\n").append (this.name).append ("\t").append (label).append ("_").appendI (j + 1).append ("\t").appendO (this.axes[i][j].normalOrAxis);
}
if (asInfo) this.info.put (label, vinfo);
}}
if (!asInfo) {
sb.append ("\n");
sb.append ("\n").append (this.name).append ("\ttype\tnType\tnUnique");
sb.append ("\n").append (this.name).append ("\tE\t  1\t  1");
n = (this.haveInversionCenter ? 1 : 0);
sb.append ("\n").append (this.name).append ("\tCi\t  ").appendI (n).append ("\t  ").appendI (n);
sb.append ("\n").append (this.name).append ("\tCs\t");
JU.PT.rightJustify (sb, "    ", this.nAxes[0] + "\t");
JU.PT.rightJustify (sb, "    ", this.nAxes[0] + "\n");
sb.append (this.name).append ("\tCn\t");
JU.PT.rightJustify (sb, "    ", nType[1][0] + "\t");
JU.PT.rightJustify (sb, "    ", nType[1][1] + "\n");
sb.append (this.name).append ("\tSn\t");
JU.PT.rightJustify (sb, "    ", nType[2][0] + "\t");
JU.PT.rightJustify (sb, "    ", nType[2][1] + "\n");
sb.append (this.name).append ("\t\tTOTAL\t");
JU.PT.rightJustify (sb, "    ", nTotal + "\n");
return (this.textInfo = sb.toString ());
}this.info.put ("name", this.name);
this.info.put ("nAtoms", Integer.$valueOf (this.nAtoms));
this.info.put ("nTotal", Integer.$valueOf (nTotal));
this.info.put ("nCi", Integer.$valueOf (this.haveInversionCenter ? 1 : 0));
this.info.put ("nCs", Integer.$valueOf (this.nAxes[0]));
this.info.put ("nCn", Integer.$valueOf (nType[1][0]));
this.info.put ("nSn", Integer.$valueOf (nType[2][0]));
this.info.put ("distanceTolerance", Float.$valueOf (this.distanceTolerance));
this.info.put ("linearTolerance", Float.$valueOf (this.linearTolerance));
this.info.put ("points", this.points);
this.info.put ("detail", sb.toString ().$replace ('\n', ';'));
if (this.principalAxis != null && this.principalAxis.index > 0) this.info.put ("principalAxis", this.principalAxis.normalOrAxis);
if (this.principalPlane != null && this.principalPlane.index > 0) this.info.put ("principalPlane", this.principalPlane.normalOrAxis);
return this.info;
}, "~N,~S,~B,~S,~N,~N");
Clazz_defineMethod (c$, "isDrawType", 
function (type, index, scale) {
return (this.drawInfo != null && this.drawType.equals (type == null ? "" : type) && this.drawIndex == index && this.scale == scale);
}, "~S,~N,~N");
c$.$PointGroup$Operation$ = function () {
Clazz_pu$h(self.c$);
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
this.type = 0;
this.order = 0;
this.index = 0;
this.normalOrAxis = null;
Clazz_instantialize (this, arguments);
}, JS.PointGroup, "Operation");
Clazz_makeConstructor (c$, 
function () {
this.index = ++this.b$["JS.PointGroup"].nOps;
this.type = 3;
this.order = 1;
if (JU.Logger.debugging) JU.Logger.debug ("new operation -- " + JS.PointGroup.typeNames[this.type]);
});
Clazz_makeConstructor (c$, 
function (a, b) {
this.index = ++this.b$["JS.PointGroup"].nOps;
this.type = (b < 14 ? 2 : 1);
this.order = b % 14;
this.normalOrAxis = JU.Quat.newVA (a, 180).getNormal ();
if (JU.Logger.debugging) JU.Logger.debug ("new operation -- " + (this.order == b ? "S" : "C") + this.order + " " + this.normalOrAxis);
}, "JU.V3,~N");
Clazz_makeConstructor (c$, 
function (a) {
if (a == null) return;
this.index = ++this.b$["JS.PointGroup"].nOps;
this.type = 0;
this.normalOrAxis = JU.Quat.newVA (a, 180).getNormal ();
if (JU.Logger.debugging) JU.Logger.debug ("new operation -- plane " + this.normalOrAxis);
}, "JU.V3");
Clazz_defineMethod (c$, "getLabel", 
function () {
switch (this.type) {
case 0:
return "Cs";
case 2:
return "S" + this.order;
default:
return "C" + this.order;
}
});
c$ = Clazz_p0p ();
};
Clazz_defineStatics (c$,
"axesMaxN",  Clazz_newIntArray (-1, [15, 0, 0, 1, 3, 1, 10, 0, 1, 0, 6, 0, 1, 0, 0, 0, 15, 10, 6, 6, 10, 0, 1]),
"nUnique",  Clazz_newIntArray (-1, [1, 0, 0, 2, 2, 4, 2, 0, 4, 0, 4, 0, 4, 0, 0, 0, 1, 2, 2, 4, 2, 0, 4]),
"s3", 3,
"s4", 4,
"s5", 5,
"s6", 6,
"s8", 8,
"s10", 10,
"s12", 12,
"firstProper", 14,
"c2", 16,
"c3", 17,
"c4", 18,
"c5", 19,
"c6", 20,
"c8", 22);
c$.maxAxis = c$.prototype.maxAxis = JS.PointGroup.axesMaxN.length;
Clazz_defineStatics (c$,
"ATOM_COUNT_MAX", 100,
"OPERATION_PLANE", 0,
"OPERATION_PROPER_AXIS", 1,
"OPERATION_IMPROPER_AXIS", 2,
"OPERATION_INVERSION_CENTER", 3,
"typeNames",  Clazz_newArray (-1, ["plane", "proper axis", "improper axis", "center of inversion"]));
});
Clazz_declarePackage ("JS");
Clazz_load (["java.util.Hashtable"], "JS.SpaceGroup", ["java.util.Arrays", "JU.AU", "$.Lst", "$.M4", "$.P3", "$.PT", "$.SB", "JS.HallInfo", "$.HallTranslation", "$.SymmetryOperation", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.index = 0;
this.isSSG = false;
this.name = "unknown!";
this.hallSymbol = null;
this.crystalClass = null;
this.hmSymbol = null;
this.hmSymbolFull = null;
this.hmSymbolExt = null;
this.hmSymbolAbbr = null;
this.hmSymbolAlternative = null;
this.hmSymbolAbbrShort = null;
this.ambiguityType = '\0';
this.uniqueAxis = '\0';
this.axisChoice = '\0';
this.intlTableNumber = null;
this.intlTableNumberFull = null;
this.intlTableNumberExt = null;
this.hallInfo = null;
this.latticeParameter = 0;
this.operations = null;
this.finalOperations = null;
this.operationCount = 0;
this.latticeOp = -1;
this.xyzList = null;
this.modDim = 0;
this.doNormalize = true;
this.isBio = false;
this.isBilbao = false;
this.latticeType = "P";
this.nHallOperators = null;
this.info = null;
Clazz_instantialize (this, arguments);
}, JS, "SpaceGroup");
c$.getNull = Clazz_defineMethod (c$, "getNull", 
function (doInit, doNormalize, doFinalize) {
JS.SpaceGroup.getSpaceGroups ();
var sg =  new JS.SpaceGroup (-1, null, doInit);
sg.doNormalize = doNormalize;
if (doFinalize) sg.setFinalOperations (null, 0, 0, false);
return sg;
}, "~B,~B,~B");
Clazz_makeConstructor (c$, 
 function (index, cifLine, doInit) {
++JS.SpaceGroup.sgIndex;
if (index < 0) index = JS.SpaceGroup.sgIndex;
this.index = index;
this.init (doInit && cifLine == null);
if (doInit && cifLine != null) this.buildSpaceGroup (cifLine);
}, "~N,~S,~B");
Clazz_defineMethod (c$, "init", 
 function (addXYZ) {
this.xyzList =  new java.util.Hashtable ();
this.operationCount = 0;
if (addXYZ) this.addSymmetry ("x,y,z", 0, false);
}, "~B");
c$.createSpaceGroup = Clazz_defineMethod (c$, "createSpaceGroup", 
function (desiredSpaceGroupIndex, name, data, modDim) {
var sg = null;
if (desiredSpaceGroupIndex >= 0) {
sg = JS.SpaceGroup.getSpaceGroups ()[desiredSpaceGroupIndex];
} else {
if (Clazz_instanceOf (data, JU.Lst)) sg = JS.SpaceGroup.createSGFromList (name, data);
 else sg = JS.SpaceGroup.determineSpaceGroupNA (name, data);
if (sg == null) sg = JS.SpaceGroup.createSpaceGroupN (modDim <= 0 ? name : "x1,x2,x3,x4,x5,x6,x7,x8,x9".substring (0, modDim * 3 + 8));
}if (sg != null) sg.generateAllOperators (null);
return sg;
}, "~N,~S,~O,~N");
c$.createSGFromList = Clazz_defineMethod (c$, "createSGFromList", 
 function (name, data) {
var sg =  new JS.SpaceGroup (-1, "0;0;--;--;--", true);
sg.doNormalize = false;
sg.name = name;
var n = data.size ();
for (var i = 0; i < n; i++) {
var operation = data.get (i);
if (Clazz_instanceOf (operation, JS.SymmetryOperation)) {
var op = operation;
var iop = sg.addOp (op, op.xyz, false);
sg.operations[iop].setTimeReversal (op.timeReversal);
} else {
sg.addSymmetrySM ("xyz matrix:" + operation, operation);
}}
var sgn = sg.getDerivedSpaceGroup ();
if (sgn != null) sg = sgn;
return sg;
}, "~S,JU.Lst");
Clazz_defineMethod (c$, "addSymmetry", 
function (xyz, opId, allowScaling) {
xyz = xyz.toLowerCase ();
return (xyz.indexOf ("[[") < 0 && xyz.indexOf ("x4") < 0 && xyz.indexOf (";") < 0 && (xyz.indexOf ("x") < 0 || xyz.indexOf ("y") < 0 || xyz.indexOf ("z") < 0) ? -1 : this.addOperation (xyz, opId, allowScaling));
}, "~S,~N,~B");
Clazz_defineMethod (c$, "setFinalOperations", 
function (atoms, atomIndex, count, doNormalize) {
if (this.hallInfo == null && this.latticeParameter != 0) {
var h =  new JS.HallInfo (JS.HallTranslation.getHallLatticeEquivalent (this.latticeParameter));
this.generateAllOperators (h);
}this.finalOperations = null;
this.isBio = (this.name.indexOf ("bio") >= 0);
if (this.index >= JS.SpaceGroup.getSpaceGroups ().length && !this.isBio && this.name.indexOf ("SSG:") < 0 && this.name.indexOf ("[subsystem") < 0) {
var sg = this.getDerivedSpaceGroup ();
if (sg != null) {
this.name = sg.getName ();
this.latticeType = sg.latticeType;
this.intlTableNumber = sg.intlTableNumber;
}}this.finalOperations =  new Array (this.operationCount);
if (doNormalize && count > 0 && atoms != null) {
this.finalOperations[0] =  new JS.SymmetryOperation (this.operations[0], atoms, atomIndex, count, true);
var atom = atoms[atomIndex];
var c = JU.P3.newP (atom);
this.finalOperations[0].rotTrans (c);
if (c.distance (atom) > 0.0001) for (var i = 0; i < count; i++) {
atom = atoms[atomIndex + i];
c.setT (atom);
this.finalOperations[0].rotTrans (c);
atom.setT (c);
}
}for (var i = 0; i < this.operationCount; i++) {
this.finalOperations[i] =  new JS.SymmetryOperation (this.operations[i], atoms, atomIndex, count, doNormalize);
this.finalOperations[i].getCentering ();
}
}, "~A,~N,~N,~B");
Clazz_defineMethod (c$, "getOperationCount", 
function () {
return this.finalOperations.length;
});
Clazz_defineMethod (c$, "getOperation", 
function (i) {
return this.finalOperations[i];
}, "~N");
Clazz_defineMethod (c$, "getXyz", 
function (i, doNormalize) {
return (this.finalOperations == null ? this.operations[i].getXyz (doNormalize) : this.finalOperations[i].getXyz (doNormalize));
}, "~N,~B");
Clazz_defineMethod (c$, "newPoint", 
function (i, atom1, atom2, transX, transY, transZ) {
JS.SymmetryOperation.newPoint (this.finalOperations[i], atom1, atom2, transX, transY, transZ);
}, "~N,JU.P3,JU.P3,~N,~N,~N");
c$.getInfo = Clazz_defineMethod (c$, "getInfo", 
function (sg, spaceGroup, cellInfo, asMap) {
if (sg != null && sg.index >= JS.SpaceGroup.SG.length) {
var sgDerived = JS.SpaceGroup.findSpaceGroup (sg.operationCount, sg.getCanonicalSeitzList ());
if (sgDerived != null) sg = sgDerived;
}if (cellInfo != null) {
if (sg == null) {
if (spaceGroup.indexOf ("[") >= 0) spaceGroup = spaceGroup.substring (0, spaceGroup.indexOf ("[")).trim ();
if (spaceGroup.equals ("unspecified!")) return "no space group identified in file";
sg = JS.SpaceGroup.determineSpaceGroupNA (spaceGroup, cellInfo.getUnitCellParams ());
}} else if (spaceGroup.equalsIgnoreCase ("ALL")) {
return JS.SpaceGroup.dumpAll ();
} else if (spaceGroup.equalsIgnoreCase ("ALLSEITZ")) {
return JS.SpaceGroup.dumpAllSeitz ();
} else {
sg = JS.SpaceGroup.determineSpaceGroupN (spaceGroup);
}if (sg == null) {
var sgFound = JS.SpaceGroup.createSpaceGroupN (spaceGroup);
sgFound = JS.SpaceGroup.findSpaceGroup (sgFound.operationCount, sgFound.getCanonicalSeitzList ());
if (sgFound != null) sg = sgFound;
}if (sg != null) {
if (asMap) {
return sg.dumpInfoObj ();
}var sb =  new JU.SB ();
while (sg != null) {
sb.append (sg.dumpInfo ());
sg = JS.SpaceGroup.determineSpaceGroupNS (spaceGroup, sg);
}
return sb.toString ();
}return asMap ? null : "?";
}, "JS.SpaceGroup,~S,J.api.SymmetryInterface,~B");
Clazz_defineMethod (c$, "dumpInfo", 
function () {
var info = this.dumpCanonicalSeitzList ();
if (Clazz_instanceOf (info, JS.SpaceGroup)) return (info).dumpInfo ();
var sb =  new JU.SB ().append ("\nHermann-Mauguin symbol: ");
if (this.hmSymbol == null || this.hmSymbolExt == null) sb.append ("?");
 else sb.append (this.hmSymbol).append (this.hmSymbolExt.length > 0 ? ":" + this.hmSymbolExt : "");
if (this.intlTableNumber != null) {
sb.append ("\ninternational table number: ").append (this.intlTableNumber).append (this.intlTableNumberExt.length > 0 ? ":" + this.intlTableNumberExt : "").append ("\ncrystal class: " + this.crystalClass).append ("\n\n").appendI (this.operationCount).append (" operators").append (!this.hallInfo.hallSymbol.equals ("--") ? " from Hall symbol " + this.hallInfo.hallSymbol + "  #" + this.intlTableNumberFull : "").append (": ");
}for (var i = 0; i < this.operationCount; i++) {
sb.append ("\n").append (this.operations[i].xyz);
}
sb.append ("\n\n").append (this.hallInfo == null ? "Hall symbol unknown" : this.hallInfo.dumpInfo ());
sb.append ("\n\ncanonical Seitz: ").append (info).append ("\n----------------------------------------------------\n");
return sb.toString ();
});
Clazz_defineMethod (c$, "dumpInfoObj", 
function () {
var info = this.dumpCanonicalSeitzList ();
if (Clazz_instanceOf (info, JS.SpaceGroup)) return (info).dumpInfoObj ();
var map =  new java.util.Hashtable ();
var s = (this.hmSymbol == null || this.hmSymbolExt == null ? "?" : this.hmSymbol + (this.hmSymbolExt.length > 0 ? ":" + this.hmSymbolExt : ""));
map.put ("HermannMauguinSymbol", s);
if (this.intlTableNumber != null) {
map.put ("ita", Integer.$valueOf (this.intlTableNumber));
map.put ("itaFull", this.intlTableNumberFull);
map.put ("crystalClass", this.crystalClass);
map.put ("operationCount", Integer.$valueOf (this.operationCount));
}var lst =  new JU.Lst ();
for (var i = 0; i < this.operationCount; i++) {
lst.addLast (this.operations[i].xyz);
}
map.put ("operationsXYZ", lst);
map.put ("HallSymbol", (this.hallInfo == null ? "?" : this.hallInfo.hallSymbol));
return map;
});
Clazz_defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz_defineMethod (c$, "getLatticeDesignation", 
function () {
return JS.HallTranslation.getLatticeDesignation (this.latticeParameter);
});
Clazz_defineMethod (c$, "setLatticeParam", 
function (latticeParameter) {
this.latticeParameter = latticeParameter;
if (latticeParameter > 10) this.latticeParameter = -JS.HallTranslation.getLatticeIndex (JS.HallTranslation.getLatticeCode (latticeParameter));
}, "~N");
Clazz_defineMethod (c$, "dumpCanonicalSeitzList", 
 function () {
if (this.nHallOperators != null) {
if (this.hallInfo == null) this.hallInfo =  new JS.HallInfo (this.hallSymbol);
this.generateAllOperators (null);
}var s = this.getCanonicalSeitzList ();
if (this.index >= JS.SpaceGroup.SG.length) {
var sgDerived = JS.SpaceGroup.findSpaceGroup (this.operationCount, s);
if (sgDerived != null) return sgDerived.getCanonicalSeitzList ();
}return (this.index >= 0 && this.index < JS.SpaceGroup.SG.length ? this.hallSymbol + " = " : "") + s;
});
Clazz_defineMethod (c$, "getDerivedSpaceGroup", 
function () {
if (this.index >= 0 && this.index < JS.SpaceGroup.SG.length || this.modDim > 0 || this.operations == null || this.operations.length == 0 || this.operations[0].timeReversal != 0) return this;
if (this.finalOperations != null) this.setFinalOperations (null, 0, 0, false);
var s = this.getCanonicalSeitzList ();
return (s == null ? null : JS.SpaceGroup.findSpaceGroup (this.operationCount, s));
});
Clazz_defineMethod (c$, "getCanonicalSeitzList", 
 function () {
var list =  new Array (this.operationCount);
for (var i = 0; i < this.operationCount; i++) list[i] = JS.SymmetryOperation.dumpSeitz (this.operations[i], true);

java.util.Arrays.sort (list, 0, this.operationCount);
var sb =  new JU.SB ().append ("\n[");
for (var i = 0; i < this.operationCount; i++) sb.append (list[i].$replace ('\t', ' ').$replace ('\n', ' ')).append ("; ");

sb.append ("]");
return sb.toString ();
});
c$.findSpaceGroup = Clazz_defineMethod (c$, "findSpaceGroup", 
 function (opCount, s) {
JS.SpaceGroup.getSpaceGroups ();
var lst = JS.SpaceGroup.htByOpCount.get (Integer.$valueOf (opCount));
if (lst != null) for (var i = 0, n = lst.size (); i < n; i++) {
var sg = lst.get (i);
if (JS.SpaceGroup.getCanonicalSeitz (sg.index).indexOf (s) >= 0) return JS.SpaceGroup.SG[sg.index];
}
return null;
}, "~N,~S");
c$.dumpAll = Clazz_defineMethod (c$, "dumpAll", 
 function () {
var sb =  new JU.SB ();
JS.SpaceGroup.getSpaceGroups ();
for (var i = 0; i < JS.SpaceGroup.SG.length; i++) sb.append ("\n----------------------\n" + JS.SpaceGroup.SG[i].dumpInfo ());

return sb.toString ();
});
c$.dumpAllSeitz = Clazz_defineMethod (c$, "dumpAllSeitz", 
 function () {
JS.SpaceGroup.getSpaceGroups ();
var sb =  new JU.SB ();
for (var i = 0; i < JS.SpaceGroup.SG.length; i++) sb.append ("\n").appendO (JS.SpaceGroup.getCanonicalSeitz (i));

return sb.toString ();
});
c$.getCanonicalSeitz = Clazz_defineMethod (c$, "getCanonicalSeitz", 
 function (i) {
if (JS.SpaceGroup.canonicalSeitzList == null) JS.SpaceGroup.canonicalSeitzList =  new Array (JS.SpaceGroup.SG.length);
var cs = JS.SpaceGroup.canonicalSeitzList[i];
return (cs == null ? JS.SpaceGroup.canonicalSeitzList[i] = JS.SpaceGroup.SG[i].dumpCanonicalSeitzList ().toString () : cs);
}, "~N");
Clazz_defineMethod (c$, "setLattice", 
 function (latticeCode, isCentrosymmetric) {
this.latticeParameter = JS.HallTranslation.getLatticeIndex (latticeCode);
if (!isCentrosymmetric) this.latticeParameter = -this.latticeParameter;
}, "~S,~B");
c$.createSpaceGroupN = Clazz_defineMethod (c$, "createSpaceGroupN", 
 function (name) {
JS.SpaceGroup.getSpaceGroups ();
name = name.trim ();
var sg = JS.SpaceGroup.determineSpaceGroupN (name);
var hallInfo;
if (sg == null) {
hallInfo =  new JS.HallInfo (name);
if (hallInfo.nRotations > 0) {
sg =  new JS.SpaceGroup (-1, "0;0;--;--;" + name, true);
sg.hallInfo = hallInfo;
} else if (name.indexOf (",") >= 0) {
sg =  new JS.SpaceGroup (-1, "0;0;--;--;--", true);
sg.doNormalize = false;
sg.generateOperatorsFromXyzInfo (name);
}}if (sg != null) sg.generateAllOperators (null);
return sg;
}, "~S");
Clazz_defineMethod (c$, "addOperation", 
 function (xyz0, opId, allowScaling) {
if (xyz0 == null || xyz0.length < 3) {
this.init (false);
return -1;
}var isSpecial = (xyz0.charAt (0) == '=');
if (isSpecial) xyz0 = xyz0.substring (1);
var id = this.checkXYZlist (xyz0);
if (id >= 0) return id;
if (xyz0.startsWith ("x1,x2,x3,x4") && this.modDim == 0) {
this.xyzList.clear ();
this.operationCount = 0;
this.modDim = JU.PT.parseInt (xyz0.substring (xyz0.lastIndexOf ("x") + 1)) - 3;
} else if (xyz0.indexOf ("m") >= 0) {
xyz0 = JU.PT.rep (xyz0, "+m", "m");
if (xyz0.equals ("x,y,z,m") || xyz0.equals ("x,y,z(mx,my,mz)")) {
this.xyzList.clear ();
this.operationCount = 0;
}}var op =  new JS.SymmetryOperation (null, null, 0, opId, this.doNormalize);
if (!op.setMatrixFromXYZ (xyz0, this.modDim, allowScaling)) {
JU.Logger.error ("couldn't interpret symmetry operation: " + xyz0);
return -1;
}return this.addOp (op, xyz0, isSpecial);
}, "~S,~N,~B");
Clazz_defineMethod (c$, "checkXYZlist", 
 function (xyz) {
return (this.xyzList.containsKey (xyz) ? this.xyzList.get (xyz).intValue () : -1);
}, "~S");
Clazz_defineMethod (c$, "addOp", 
 function (op, xyz0, isSpecial) {
var xyz = op.xyz;
if (!isSpecial) {
var id = this.checkXYZlist (xyz);
if (id >= 0) return id;
if (this.latticeOp < 0) {
var xxx = JU.PT.replaceAllCharacters (this.modDim > 0 ? JS.SymmetryOperation.replaceXn (xyz, this.modDim + 3) : xyz, "+123/", "");
if (this.xyzList.containsKey (xxx + "!")) {
this.latticeOp = this.operationCount;
} else {
this.xyzList.put (xxx + "!", Integer.$valueOf (this.operationCount));
}}this.xyzList.put (xyz, Integer.$valueOf (this.operationCount));
}if (!xyz.equals (xyz0)) this.xyzList.put (xyz0, Integer.$valueOf (this.operationCount));
if (this.operations == null) this.operations =  new Array (4);
if (this.operationCount == this.operations.length) this.operations = JU.AU.arrayCopyObject (this.operations, this.operationCount * 2);
this.operations[this.operationCount++] = op;
op.index = this.operationCount;
if (op.timeReversal != 0) this.operations[0].timeReversal = 1;
if (JU.Logger.debugging) JU.Logger.debug ("\naddOperation " + this.operationCount + op.dumpInfo ());
return this.operationCount - 1;
}, "JS.SymmetryOperation,~S,~B");
Clazz_defineMethod (c$, "generateOperatorsFromXyzInfo", 
 function (xyzInfo) {
this.init (true);
var terms = JU.PT.split (xyzInfo.toLowerCase (), ";");
for (var i = 0; i < terms.length; i++) this.addSymmetry (terms[i], 0, false);

}, "~S");
Clazz_defineMethod (c$, "generateAllOperators", 
 function (h) {
if (h == null) {
if (this.operationCount > 0) return;
h = this.hallInfo;
this.operations =  new Array (4);
if (this.hallInfo == null || this.hallInfo.nRotations == 0) h = this.hallInfo =  new JS.HallInfo (this.hallSymbol);
this.setLattice (this.hallInfo.latticeCode, this.hallInfo.isCentrosymmetric);
this.init (true);
}switch (h.latticeCode) {
case '\0':
case 'S':
case 'T':
case 'P':
this.latticeType = "P";
break;
default:
this.latticeType = "" + h.latticeCode;
break;
}
var mat1 =  new JU.M4 ();
var operation =  new JU.M4 ();
var newOps =  new Array (7);
for (var i = 0; i < 7; i++) newOps[i] =  new JU.M4 ();

for (var i = 0; i < h.nRotations; i++) {
var rt = h.rotationTerms[i];
mat1.setM4 (rt.seitzMatrix12ths);
var nRot = rt.order;
newOps[0].setIdentity ();
var nOps = this.operationCount;
for (var j = 1; j <= nRot; j++) {
var m = newOps[j];
m.mul2 (mat1, newOps[0]);
newOps[0].setM4 (m);
for (var k = 0; k < nOps; k++) {
operation.mul2 (m, this.operations[k]);
operation.m03 = (Clazz_floatToInt (operation.m03) + 12) % 12;
operation.m13 = (Clazz_floatToInt (operation.m13) + 12) % 12;
operation.m23 = (Clazz_floatToInt (operation.m23) + 12) % 12;
var xyz = JS.SymmetryOperation.getXYZFromMatrix (operation, true, true, true);
this.addSymmetrySM (xyz, operation);
}
}
}
if (this.nHallOperators != null && this.operationCount != this.nHallOperators.intValue ()) JU.Logger.error ("Operator mismatch " + this.operationCount + " for " + this);
}, "JS.HallInfo");
Clazz_defineMethod (c$, "addSymmetrySM", 
function (xyz, operation) {
var iop = this.addOperation (xyz, 0, false);
if (iop >= 0) {
var symmetryOperation = this.operations[iop];
symmetryOperation.setM4 (operation);
}return iop;
}, "~S,JU.M4");
c$.determineSpaceGroupN = Clazz_defineMethod (c$, "determineSpaceGroupN", 
 function (name) {
return JS.SpaceGroup.determineSpaceGroup (name, 0, 0, 0, 0, 0, 0, -1);
}, "~S");
c$.determineSpaceGroupNS = Clazz_defineMethod (c$, "determineSpaceGroupNS", 
 function (name, sg) {
return JS.SpaceGroup.determineSpaceGroup (name, 0, 0, 0, 0, 0, 0, sg.index);
}, "~S,JS.SpaceGroup");
c$.determineSpaceGroupNA = Clazz_defineMethod (c$, "determineSpaceGroupNA", 
function (name, unitCellParams) {
return (unitCellParams == null ? JS.SpaceGroup.determineSpaceGroup (name, 0, 0, 0, 0, 0, 0, -1) : JS.SpaceGroup.determineSpaceGroup (name, unitCellParams[0], unitCellParams[1], unitCellParams[2], unitCellParams[3], unitCellParams[4], unitCellParams[5], -1));
}, "~S,~A");
c$.determineSpaceGroup = Clazz_defineMethod (c$, "determineSpaceGroup", 
 function (name, a, b, c, alpha, beta, gamma, lastIndex) {
var i = JS.SpaceGroup.determineSpaceGroupIndex (name, a, b, c, alpha, beta, gamma, lastIndex);
return (i >= 0 ? JS.SpaceGroup.SG[i] : null);
}, "~S,~N,~N,~N,~N,~N,~N,~N");
c$.determineSpaceGroupIndex = Clazz_defineMethod (c$, "determineSpaceGroupIndex", 
 function (name, a, b, c, alpha, beta, gamma, lastIndex) {
JS.SpaceGroup.getSpaceGroups ();
if (lastIndex < 0) lastIndex = JS.SpaceGroup.SG.length;
name = name.trim ().toLowerCase ();
var checkBilbao = false;
if (name.startsWith ("bilbao:")) {
checkBilbao = true;
name = name.substring (7);
}var nameType = (name.startsWith ("hall:") ? 5 : name.startsWith ("hm:") ? 3 : 0);
switch (nameType) {
case 3:
case 5:
name = name.substring (nameType);
break;
case 0:
if (name.contains ("[")) {
nameType = 5;
name = name.substring (0, name.indexOf ("[")).trim ();
}}
var nameExt = name;
var i;
var haveExtension = false;
name = name.$replace ('_', ' ');
if (name.length >= 2) {
i = (name.indexOf ("-") == 0 ? 2 : 1);
if (i < name.length && name.charAt (i) != ' ') name = name.substring (0, i) + " " + name.substring (i);
name = JS.SpaceGroup.toCap (name, 2);
}var ext = "";
if ((i = name.indexOf (":")) > 0) {
ext = name.substring (i + 1);
name = name.substring (0, i).trim ();
haveExtension = true;
}if (nameType != 5 && !haveExtension && JU.PT.isOneOf (name, JS.SpaceGroup.ambiguousNames)) {
ext = "?";
haveExtension = true;
}var abbr = JU.PT.replaceAllCharacters (name, " ()", "");
var s;
if (nameType != 3 && !haveExtension) for (i = lastIndex; --i >= 0; ) {
if (JS.SpaceGroup.SG[i].hallSymbol.equalsIgnoreCase (name)) return i;
}
if (nameType != 5) {
if (nameType != 3) for (i = lastIndex; --i >= 0; ) if (JS.SpaceGroup.SG[i].intlTableNumberFull.equalsIgnoreCase (nameExt)) return i;

for (i = lastIndex; --i >= 0; ) {
if (JS.SpaceGroup.SG[i].hmSymbolFull.equalsIgnoreCase (nameExt)) return i;
}
for (i = lastIndex; --i >= 0; ) if ((s = JS.SpaceGroup.SG[i]).hmSymbolAlternative != null && s.hmSymbolAlternative.equalsIgnoreCase (nameExt)) return i;

if (haveExtension) {
for (i = lastIndex; --i >= 0; ) if ((s = JS.SpaceGroup.SG[i]).hmSymbolAbbr.equalsIgnoreCase (abbr) && s.intlTableNumberExt.equalsIgnoreCase (ext)) return i;

for (i = lastIndex; --i >= 0; ) if ((s = JS.SpaceGroup.SG[i]).hmSymbolAbbrShort.equalsIgnoreCase (abbr) && s.intlTableNumberExt.equalsIgnoreCase (ext)) return i;

}var uniqueAxis = JS.SpaceGroup.determineUniqueAxis (a, b, c, alpha, beta, gamma);
if (!haveExtension || ext.charAt (0) == '?') for (i = 0; i < lastIndex; i++) if (((s = JS.SpaceGroup.SG[i]).hmSymbolAbbr.equalsIgnoreCase (abbr) || s.hmSymbolAbbrShort.equalsIgnoreCase (abbr)) && (!checkBilbao || s.isBilbao)) switch (s.ambiguityType) {
case '\0':
return i;
case 'a':
if (s.uniqueAxis == uniqueAxis || uniqueAxis == '\0') return i;
break;
case 'o':
if (ext.length == 0) {
if (s.hmSymbolExt.equals ("2")) return i;
} else if (s.hmSymbolExt.equalsIgnoreCase (ext)) return i;
break;
case 't':
if (ext.length == 0) {
if (s.axisChoice == 'h') return i;
} else if ((s.axisChoice + "").equalsIgnoreCase (ext)) return i;
break;
}

}if (ext.length == 0) for (i = 0; i < lastIndex; i++) if ((s = JS.SpaceGroup.SG[i]).intlTableNumber.equals (nameExt) && (!checkBilbao || s.isBilbao)) return i;

return -1;
}, "~S,~N,~N,~N,~N,~N,~N,~N");
c$.determineUniqueAxis = Clazz_defineMethod (c$, "determineUniqueAxis", 
 function (a, b, c, alpha, beta, gamma) {
if (a == b) return (b == c ? '\0' : 'c');
if (b == c) return 'a';
if (c == a) return 'b';
if (alpha == beta) return (beta == gamma ? '\0' : 'c');
if (beta == gamma) return 'a';
if (gamma == alpha) return 'b';
return '\0';
}, "~N,~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "buildSpaceGroup", 
 function (cifLine) {
var terms = JU.PT.split (cifLine.toLowerCase (), ";");
this.intlTableNumberFull = terms[0].trim ();
this.isBilbao = (terms.length < 6 && !this.intlTableNumberFull.equals ("0"));
var parts = JU.PT.split (this.intlTableNumberFull, ":");
this.intlTableNumber = parts[0];
this.intlTableNumberExt = (parts.length == 1 ? "" : parts[1]);
this.ambiguityType = '\0';
if (this.intlTableNumberExt.length > 0) {
if (this.intlTableNumberExt.equals ("h") || this.intlTableNumberExt.equals ("r")) {
this.ambiguityType = 't';
this.axisChoice = this.intlTableNumberExt.charAt (0);
} else if (this.intlTableNumberExt.startsWith ("1") || this.intlTableNumberExt.startsWith ("2")) {
this.ambiguityType = 'o';
} else if (this.intlTableNumberExt.length <= 2) {
this.ambiguityType = 'a';
this.uniqueAxis = this.intlTableNumberExt.charAt (0);
} else if (this.intlTableNumberExt.contains ("-")) {
this.ambiguityType = '-';
}}if (!terms[1].equals ("0")) {
this.nHallOperators = Integer.$valueOf (terms[1]);
var lst = JS.SpaceGroup.htByOpCount.get (this.nHallOperators);
if (lst == null) JS.SpaceGroup.htByOpCount.put (this.nHallOperators, lst =  new JU.Lst ());
lst.addLast (this);
}this.crystalClass = JS.SpaceGroup.toCap (JU.PT.split (terms[2], "^")[0], 1);
this.setHMSymbol (terms[3]);
this.hallSymbol = terms[4];
if (this.hallSymbol.length > 1) this.hallSymbol = JS.SpaceGroup.toCap (this.hallSymbol, 2);
var info = this.intlTableNumber + this.hallSymbol;
if (this.intlTableNumber.charAt (0) != '0' && JS.SpaceGroup.lastInfo.equals (info)) JS.SpaceGroup.ambiguousNames += this.hmSymbol + ";";
JS.SpaceGroup.lastInfo = info;
this.name = this.hallSymbol + " [" + this.hmSymbolFull + "] #" + this.intlTableNumber;
}, "~S");
Clazz_defineMethod (c$, "setHMSymbol", 
 function (name) {
this.hmSymbolFull = JS.SpaceGroup.toCap (name, 1);
this.latticeType = this.hmSymbolFull.substring (0, 1);
var parts = JU.PT.split (this.hmSymbolFull, ":");
this.hmSymbol = parts[0];
this.hmSymbolExt = (parts.length == 1 ? "" : parts[1]);
var pt = this.hmSymbol.indexOf (" -3");
if (pt >= 1) if ("admn".indexOf (this.hmSymbol.charAt (pt - 1)) >= 0) {
this.hmSymbolAlternative = (this.hmSymbol.substring (0, pt) + " 3" + this.hmSymbol.substring (pt + 3)).toLowerCase ();
}this.hmSymbolAbbr = JU.PT.rep (this.hmSymbol, " ", "");
this.hmSymbolAbbrShort = JU.PT.rep (this.hmSymbol, " 1", "");
this.hmSymbolAbbrShort = JU.PT.rep (this.hmSymbolAbbrShort, " ", "");
}, "~S");
c$.toCap = Clazz_defineMethod (c$, "toCap", 
 function (s, n) {
return s.substring (0, n).toUpperCase () + s.substring (n);
}, "~S,~N");
Clazz_defineMethod (c$, "toString", 
function () {
return "" + this.intlTableNumberFull + "[" + this.index + "," + this.nHallOperators + "] " + this.hmSymbolFull + " " + this.hallSymbol;
});
c$.getSpaceGroups = Clazz_defineMethod (c$, "getSpaceGroups", 
 function () {
return (JS.SpaceGroup.SG == null ? (JS.SpaceGroup.SG = JS.SpaceGroup.createSpaceGroups ()) : JS.SpaceGroup.SG);
});
c$.createSpaceGroups = Clazz_defineMethod (c$, "createSpaceGroups", 
 function () {
var n = JS.SpaceGroup.STR_SG.length;
var defs =  new Array (n);
for (var i = 0; i < n; i++) defs[i] =  new JS.SpaceGroup (i, JS.SpaceGroup.STR_SG[i], true);

JS.SpaceGroup.STR_SG = null;
return defs;
});
Clazz_defineMethod (c$, "addLatticeVectors", 
function (lattvecs) {
if (this.latticeOp >= 0 || lattvecs.size () == 0) return false;
var nOps = this.latticeOp = this.operationCount;
var isMagnetic = (lattvecs.get (0).length == this.modDim + 4);
var magRev = -2;
for (var j = 0; j < lattvecs.size (); j++) {
var data = lattvecs.get (j);
if (isMagnetic) {
magRev = Clazz_floatToInt (data[this.modDim + 3]);
data = JU.AU.arrayCopyF (data, this.modDim + 3);
}if (data.length > this.modDim + 3) return false;
for (var i = 0; i < nOps; i++) {
var newOp =  new JS.SymmetryOperation (null, null, 0, 0, true);
newOp.modDim = this.modDim;
var op = this.operations[i];
newOp.linearRotTrans = JU.AU.arrayCopyF (op.linearRotTrans, -1);
newOp.setFromMatrix (data, false);
if (magRev != -2) newOp.setTimeReversal (op.timeReversal * magRev);
newOp.xyzOriginal = newOp.xyz;
this.addOp (newOp, newOp.xyz, true);
}
}
return true;
}, "JU.Lst");
Clazz_defineMethod (c$, "getSiteMultiplicity", 
function (pt, unitCell) {
var n = this.finalOperations.length;
var pts =  new JU.Lst ();
for (var i = n; --i >= 0; ) {
var pt1 = JU.P3.newP (pt);
this.finalOperations[i].rotTrans (pt1);
unitCell.unitize (pt1);
for (var j = pts.size (); --j >= 0; ) {
var pt0 = pts.get (j);
if (pt1.distanceSquared (pt0) < 0.000001) {
pt1 = null;
break;
}}
if (pt1 != null) pts.addLast (pt1);
}
return Clazz_doubleToInt (n / pts.size ());
}, "JU.P3,JS.UnitCell");
Clazz_defineMethod (c$, "setName", 
function (name) {
this.name = name;
if (name != null && name.startsWith ("HM:")) {
this.setHMSymbol (name.substring (3));
}}, "~S");
Clazz_defineStatics (c$,
"canonicalSeitzList", null,
"NAME_UNK", 0,
"NAME_HM", 3,
"NAME_HALL", 5,
"sgIndex", -1,
"ambiguousNames", "",
"lastInfo", "",
"SG", null);
c$.htByOpCount = c$.prototype.htByOpCount =  new java.util.Hashtable ();
Clazz_defineStatics (c$,
"STR_SG",  Clazz_newArray (-1, ["1;1;c1^1;p 1;p 1", "2;2;ci^1;p -1;-p 1", "3:b;2;c2^1;p 1 2 1;p 2y", "3:b;2;c2^1;p 2;p 2y", "3:c;2;c2^1;p 1 1 2;p 2", "3:a;2;c2^1;p 2 1 1;p 2x", "4:b;2;c2^2;p 1 21 1;p 2yb", "4:b;2;c2^2;p 21;p 2yb", "4:b*;2;c2^2;p 1 21 1*;p 2y1", "4:c;2;c2^2;p 1 1 21;p 2c", "4:c*;2;c2^2;p 1 1 21*;p 21", "4:a;2;c2^2;p 21 1 1;p 2xa", "4:a*;2;c2^2;p 21 1 1*;p 2x1", "5:b1;4;c2^3;c 1 2 1;c 2y", "5:b1;4;c2^3;c 2;c 2y", "5:b2;4;c2^3;a 1 2 1;a 2y", "5:b3;4;c2^3;i 1 2 1;i 2y", "5:c1;4;c2^3;a 1 1 2;a 2", "5:c2;4;c2^3;b 1 1 2;b 2", "5:c3;4;c2^3;i 1 1 2;i 2", "5:a1;4;c2^3;b 2 1 1;b 2x", "5:a2;4;c2^3;c 2 1 1;c 2x", "5:a3;4;c2^3;i 2 1 1;i 2x", "6:b;2;cs^1;p 1 m 1;p -2y", "6:b;2;cs^1;p m;p -2y", "6:c;2;cs^1;p 1 1 m;p -2", "6:a;2;cs^1;p m 1 1;p -2x", "7:b1;2;cs^2;p 1 c 1;p -2yc", "7:b1;2;cs^2;p c;p -2yc", "7:b2;2;cs^2;p 1 n 1;p -2yac", "7:b2;2;cs^2;p n;p -2yac", "7:b3;2;cs^2;p 1 a 1;p -2ya", "7:b3;2;cs^2;p a;p -2ya", "7:c1;2;cs^2;p 1 1 a;p -2a", "7:c2;2;cs^2;p 1 1 n;p -2ab", "7:c3;2;cs^2;p 1 1 b;p -2b", "7:a1;2;cs^2;p b 1 1;p -2xb", "7:a2;2;cs^2;p n 1 1;p -2xbc", "7:a3;2;cs^2;p c 1 1;p -2xc", "8:b1;4;cs^3;c 1 m 1;c -2y", "8:b1;4;cs^3;c m;c -2y", "8:b2;4;cs^3;a 1 m 1;a -2y", "8:b3;4;cs^3;i 1 m 1;i -2y", "8:b3;4;cs^3;i m;i -2y", "8:c1;4;cs^3;a 1 1 m;a -2", "8:c2;4;cs^3;b 1 1 m;b -2", "8:c3;4;cs^3;i 1 1 m;i -2", "8:a1;4;cs^3;b m 1 1;b -2x", "8:a2;4;cs^3;c m 1 1;c -2x", "8:a3;4;cs^3;i m 1 1;i -2x", "9:b1;4;cs^4;c 1 c 1;c -2yc", "9:b1;4;cs^4;c c;c -2yc", "9:b2;4;cs^4;a 1 n 1;a -2yab", "9:b3;4;cs^4;i 1 a 1;i -2ya", "9:-b1;4;cs^4;a 1 a 1;a -2ya", "9:-b2;4;cs^4;c 1 n 1;c -2yac", "9:-b3;4;cs^4;i 1 c 1;i -2yc", "9:c1;4;cs^4;a 1 1 a;a -2a", "9:c2;4;cs^4;b 1 1 n;b -2ab", "9:c3;4;cs^4;i 1 1 b;i -2b", "9:-c1;4;cs^4;b 1 1 b;b -2b", "9:-c2;4;cs^4;a 1 1 n;a -2ab", "9:-c3;4;cs^4;i 1 1 a;i -2a", "9:a1;4;cs^4;b b 1 1;b -2xb", "9:a2;4;cs^4;c n 1 1;c -2xac", "9:a3;4;cs^4;i c 1 1;i -2xc", "9:-a1;4;cs^4;c c 1 1;c -2xc", "9:-a2;4;cs^4;b n 1 1;b -2xab", "9:-a3;4;cs^4;i b 1 1;i -2xb", "10:b;4;c2h^1;p 1 2/m 1;-p 2y", "10:b;4;c2h^1;p 2/m;-p 2y", "10:c;4;c2h^1;p 1 1 2/m;-p 2", "10:a;4;c2h^1;p 2/m 1 1;-p 2x", "11:b;4;c2h^2;p 1 21/m 1;-p 2yb", "11:b;4;c2h^2;p 21/m;-p 2yb", "11:b*;4;c2h^2;p 1 21/m 1*;-p 2y1", "11:c;4;c2h^2;p 1 1 21/m;-p 2c", "11:c*;4;c2h^2;p 1 1 21/m*;-p 21", "11:a;4;c2h^2;p 21/m 1 1;-p 2xa", "11:a*;4;c2h^2;p 21/m 1 1*;-p 2x1", "12:b1;8;c2h^3;c 1 2/m 1;-c 2y", "12:b1;8;c2h^3;c 2/m;-c 2y", "12:b2;8;c2h^3;a 1 2/m 1;-a 2y", "12:b3;8;c2h^3;i 1 2/m 1;-i 2y", "12:b3;8;c2h^3;i 2/m;-i 2y", "12:c1;8;c2h^3;a 1 1 2/m;-a 2", "12:c2;8;c2h^3;b 1 1 2/m;-b 2", "12:c3;8;c2h^3;i 1 1 2/m;-i 2", "12:a1;8;c2h^3;b 2/m 1 1;-b 2x", "12:a2;8;c2h^3;c 2/m 1 1;-c 2x", "12:a3;8;c2h^3;i 2/m 1 1;-i 2x", "13:b1;4;c2h^4;p 1 2/c 1;-p 2yc", "13:b1;4;c2h^4;p 2/c;-p 2yc", "13:b2;4;c2h^4;p 1 2/n 1;-p 2yac", "13:b2;4;c2h^4;p 2/n;-p 2yac", "13:b3;4;c2h^4;p 1 2/a 1;-p 2ya", "13:b3;4;c2h^4;p 2/a;-p 2ya", "13:c1;4;c2h^4;p 1 1 2/a;-p 2a", "13:c2;4;c2h^4;p 1 1 2/n;-p 2ab", "13:c3;4;c2h^4;p 1 1 2/b;-p 2b", "13:a1;4;c2h^4;p 2/b 1 1;-p 2xb", "13:a2;4;c2h^4;p 2/n 1 1;-p 2xbc", "13:a3;4;c2h^4;p 2/c 1 1;-p 2xc", "14:b1;4;c2h^5;p 1 21/c 1;-p 2ybc", "14:b1;4;c2h^5;p 21/c;-p 2ybc", "14:b2;4;c2h^5;p 1 21/n 1;-p 2yn", "14:b2;4;c2h^5;p 21/n;-p 2yn", "14:b3;4;c2h^5;p 1 21/a 1;-p 2yab", "14:b3;4;c2h^5;p 21/a;-p 2yab", "14:c1;4;c2h^5;p 1 1 21/a;-p 2ac", "14:c2;4;c2h^5;p 1 1 21/n;-p 2n", "14:c3;4;c2h^5;p 1 1 21/b;-p 2bc", "14:a1;4;c2h^5;p 21/b 1 1;-p 2xab", "14:a2;4;c2h^5;p 21/n 1 1;-p 2xn", "14:a3;4;c2h^5;p 21/c 1 1;-p 2xac", "15:b1;8;c2h^6;c 1 2/c 1;-c 2yc", "15:b1;8;c2h^6;c 2/c;-c 2yc", "15:b2;8;c2h^6;a 1 2/n 1;-a 2yab", "15:b3;8;c2h^6;i 1 2/a 1;-i 2ya", "15:b3;8;c2h^6;i 2/a;-i 2ya", "15:-b1;8;c2h^6;a 1 2/a 1;-a 2ya", "15:-b2;8;c2h^6;c 1 2/n 1;-c 2yac", "15:-b2;8;c2h^6;c 2/n;-c 2yac", "15:-b3;8;c2h^6;i 1 2/c 1;-i 2yc", "15:-b3;8;c2h^6;i 2/c;-i 2yc", "15:c1;8;c2h^6;a 1 1 2/a;-a 2a", "15:c2;8;c2h^6;b 1 1 2/n;-b 2ab", "15:c3;8;c2h^6;i 1 1 2/b;-i 2b", "15:-c1;8;c2h^6;b 1 1 2/b;-b 2b", "15:-c2;8;c2h^6;a 1 1 2/n;-a 2ab", "15:-c3;8;c2h^6;i 1 1 2/a;-i 2a", "15:a1;8;c2h^6;b 2/b 1 1;-b 2xb", "15:a2;8;c2h^6;c 2/n 1 1;-c 2xac", "15:a3;8;c2h^6;i 2/c 1 1;-i 2xc", "15:-a1;8;c2h^6;c 2/c 1 1;-c 2xc", "15:-a2;8;c2h^6;b 2/n 1 1;-b 2xab", "15:-a3;8;c2h^6;i 2/b 1 1;-i 2xb", "16;4;d2^1;p 2 2 2;p 2 2", "17;4;d2^2;p 2 2 21;p 2c 2", "17*;4;d2^2;p 2 2 21*;p 21 2", "17:cab;4;d2^2;p 21 2 2;p 2a 2a", "17:bca;4;d2^2;p 2 21 2;p 2 2b", "18;4;d2^3;p 21 21 2;p 2 2ab", "18:cab;4;d2^3;p 2 21 21;p 2bc 2", "18:bca;4;d2^3;p 21 2 21;p 2ac 2ac", "19;4;d2^4;p 21 21 21;p 2ac 2ab", "20;8;d2^5;c 2 2 21;c 2c 2", "20*;8;d2^5;c 2 2 21*;c 21 2", "20:cab;8;d2^5;a 21 2 2;a 2a 2a", "20:cab*;8;d2^5;a 21 2 2*;a 2a 21", "20:bca;8;d2^5;b 2 21 2;b 2 2b", "21;8;d2^6;c 2 2 2;c 2 2", "21:cab;8;d2^6;a 2 2 2;a 2 2", "21:bca;8;d2^6;b 2 2 2;b 2 2", "22;16;d2^7;f 2 2 2;f 2 2", "23;8;d2^8;i 2 2 2;i 2 2", "24;8;d2^9;i 21 21 21;i 2b 2c", "25;4;c2v^1;p m m 2;p 2 -2", "25:cab;4;c2v^1;p 2 m m;p -2 2", "25:bca;4;c2v^1;p m 2 m;p -2 -2", "26;4;c2v^2;p m c 21;p 2c -2", "26*;4;c2v^2;p m c 21*;p 21 -2", "26:ba-c;4;c2v^2;p c m 21;p 2c -2c", "26:ba-c*;4;c2v^2;p c m 21*;p 21 -2c", "26:cab;4;c2v^2;p 21 m a;p -2a 2a", "26:-cba;4;c2v^2;p 21 a m;p -2 2a", "26:bca;4;c2v^2;p b 21 m;p -2 -2b", "26:a-cb;4;c2v^2;p m 21 b;p -2b -2", "27;4;c2v^3;p c c 2;p 2 -2c", "27:cab;4;c2v^3;p 2 a a;p -2a 2", "27:bca;4;c2v^3;p b 2 b;p -2b -2b", "28;4;c2v^4;p m a 2;p 2 -2a", "28*;4;c2v^4;p m a 2*;p 2 -21", "28:ba-c;4;c2v^4;p b m 2;p 2 -2b", "28:cab;4;c2v^4;p 2 m b;p -2b 2", "28:-cba;4;c2v^4;p 2 c m;p -2c 2", "28:-cba*;4;c2v^4;p 2 c m*;p -21 2", "28:bca;4;c2v^4;p c 2 m;p -2c -2c", "28:a-cb;4;c2v^4;p m 2 a;p -2a -2a", "29;4;c2v^5;p c a 21;p 2c -2ac", "29:ba-c;4;c2v^5;p b c 21;p 2c -2b", "29:cab;4;c2v^5;p 21 a b;p -2b 2a", "29:-cba;4;c2v^5;p 21 c a;p -2ac 2a", "29:bca;4;c2v^5;p c 21 b;p -2bc -2c", "29:a-cb;4;c2v^5;p b 21 a;p -2a -2ab", "30;4;c2v^6;p n c 2;p 2 -2bc", "30:ba-c;4;c2v^6;p c n 2;p 2 -2ac", "30:cab;4;c2v^6;p 2 n a;p -2ac 2", "30:-cba;4;c2v^6;p 2 a n;p -2ab 2", "30:bca;4;c2v^6;p b 2 n;p -2ab -2ab", "30:a-cb;4;c2v^6;p n 2 b;p -2bc -2bc", "31;4;c2v^7;p m n 21;p 2ac -2", "31:ba-c;4;c2v^7;p n m 21;p 2bc -2bc", "31:cab;4;c2v^7;p 21 m n;p -2ab 2ab", "31:-cba;4;c2v^7;p 21 n m;p -2 2ac", "31:bca;4;c2v^7;p n 21 m;p -2 -2bc", "31:a-cb;4;c2v^7;p m 21 n;p -2ab -2", "32;4;c2v^8;p b a 2;p 2 -2ab", "32:cab;4;c2v^8;p 2 c b;p -2bc 2", "32:bca;4;c2v^8;p c 2 a;p -2ac -2ac", "33;4;c2v^9;p n a 21;p 2c -2n", "33*;4;c2v^9;p n a 21*;p 21 -2n", "33:ba-c;4;c2v^9;p b n 21;p 2c -2ab", "33:ba-c*;4;c2v^9;p b n 21*;p 21 -2ab", "33:cab;4;c2v^9;p 21 n b;p -2bc 2a", "33:cab*;4;c2v^9;p 21 n b*;p -2bc 21", "33:-cba;4;c2v^9;p 21 c n;p -2n 2a", "33:-cba*;4;c2v^9;p 21 c n*;p -2n 21", "33:bca;4;c2v^9;p c 21 n;p -2n -2ac", "33:a-cb;4;c2v^9;p n 21 a;p -2ac -2n", "34;4;c2v^10;p n n 2;p 2 -2n", "34:cab;4;c2v^10;p 2 n n;p -2n 2", "34:bca;4;c2v^10;p n 2 n;p -2n -2n", "35;8;c2v^11;c m m 2;c 2 -2", "35:cab;8;c2v^11;a 2 m m;a -2 2", "35:bca;8;c2v^11;b m 2 m;b -2 -2", "36;8;c2v^12;c m c 21;c 2c -2", "36*;8;c2v^12;c m c 21*;c 21 -2", "36:ba-c;8;c2v^12;c c m 21;c 2c -2c", "36:ba-c*;8;c2v^12;c c m 21*;c 21 -2c", "36:cab;8;c2v^12;a 21 m a;a -2a 2a", "36:cab*;8;c2v^12;a 21 m a*;a -2a 21", "36:-cba;8;c2v^12;a 21 a m;a -2 2a", "36:-cba*;8;c2v^12;a 21 a m*;a -2 21", "36:bca;8;c2v^12;b b 21 m;b -2 -2b", "36:a-cb;8;c2v^12;b m 21 b;b -2b -2", "37;8;c2v^13;c c c 2;c 2 -2c", "37:cab;8;c2v^13;a 2 a a;a -2a 2", "37:bca;8;c2v^13;b b 2 b;b -2b -2b", "38;8;c2v^14;a m m 2;a 2 -2", "38:ba-c;8;c2v^14;b m m 2;b 2 -2", "38:cab;8;c2v^14;b 2 m m;b -2 2", "38:-cba;8;c2v^14;c 2 m m;c -2 2", "38:bca;8;c2v^14;c m 2 m;c -2 -2", "38:a-cb;8;c2v^14;a m 2 m;a -2 -2", "39;8;c2v^15;a e m 2;a 2 -2b", "39;8;c2v^15;a b m 2;a 2 -2b", "39:ba-c;8;c2v^15;b m a 2;b 2 -2a", "39:cab;8;c2v^15;b 2 c m;b -2a 2", "39:-cba;8;c2v^15;c 2 m b;c -2a 2", "39:bca;8;c2v^15;c m 2 a;c -2a -2a", "39:a-cb;8;c2v^15;a c 2 m;a -2b -2b", "40;8;c2v^16;a m a 2;a 2 -2a", "40:ba-c;8;c2v^16;b b m 2;b 2 -2b", "40:cab;8;c2v^16;b 2 m b;b -2b 2", "40:-cba;8;c2v^16;c 2 c m;c -2c 2", "40:bca;8;c2v^16;c c 2 m;c -2c -2c", "40:a-cb;8;c2v^16;a m 2 a;a -2a -2a", "41;8;c2v^17;a e a 2;a 2 -2ab", "41;8;c2v^17;a b a 2;a 2 -2ab;-b", "41:ba-c;8;c2v^17;b b a 2;b 2 -2ab", "41:cab;8;c2v^17;b 2 c b;b -2ab 2", "41:-cba;8;c2v^17;c 2 c b;c -2ac 2", "41:bca;8;c2v^17;c c 2 a;c -2ac -2ac", "41:a-cb;8;c2v^17;a c 2 a;a -2ab -2ab", "42;16;c2v^18;f m m 2;f 2 -2", "42:cab;16;c2v^18;f 2 m m;f -2 2", "42:bca;16;c2v^18;f m 2 m;f -2 -2", "43;16;c2v^19;f d d 2;f 2 -2d", "43:cab;16;c2v^19;f 2 d d;f -2d 2", "43:bca;16;c2v^19;f d 2 d;f -2d -2d", "44;8;c2v^20;i m m 2;i 2 -2", "44:cab;8;c2v^20;i 2 m m;i -2 2", "44:bca;8;c2v^20;i m 2 m;i -2 -2", "45;8;c2v^21;i b a 2;i 2 -2c", "45:cab;8;c2v^21;i 2 c b;i -2a 2", "45:bca;8;c2v^21;i c 2 a;i -2b -2b", "46;8;c2v^22;i m a 2;i 2 -2a", "46:ba-c;8;c2v^22;i b m 2;i 2 -2b", "46:cab;8;c2v^22;i 2 m b;i -2b 2", "46:-cba;8;c2v^22;i 2 c m;i -2c 2", "46:bca;8;c2v^22;i c 2 m;i -2c -2c", "46:a-cb;8;c2v^22;i m 2 a;i -2a -2a", "47;8;d2h^1;p m m m;-p 2 2", "48:1;8;d2h^2;p n n n:1;p 2 2 -1n;-b", "48:2;8;d2h^2;p n n n:2;-p 2ab 2bc", "49;8;d2h^3;p c c m;-p 2 2c", "49:cab;8;d2h^3;p m a a;-p 2a 2", "49:bca;8;d2h^3;p b m b;-p 2b 2b", "50:1;8;d2h^4;p b a n:1;p 2 2 -1ab;-b", "50:2;8;d2h^4;p b a n:2;-p 2ab 2b", "50:1cab;8;d2h^4;p n c b:1;p 2 2 -1bc", "50:2cab;8;d2h^4;p n c b:2;-p 2b 2bc", "50:1bca;8;d2h^4;p c n a:1;p 2 2 -1ac", "50:2bca;8;d2h^4;p c n a:2;-p 2a 2c", "51;8;d2h^5;p m m a;-p 2a 2a", "51:ba-c;8;d2h^5;p m m b;-p 2b 2", "51:cab;8;d2h^5;p b m m;-p 2 2b", "51:-cba;8;d2h^5;p c m m;-p 2c 2c", "51:bca;8;d2h^5;p m c m;-p 2c 2", "51:a-cb;8;d2h^5;p m a m;-p 2 2a", "52;8;d2h^6;p n n a;-p 2a 2bc", "52:ba-c;8;d2h^6;p n n b;-p 2b 2n", "52:cab;8;d2h^6;p b n n;-p 2n 2b", "52:-cba;8;d2h^6;p c n n;-p 2ab 2c", "52:bca;8;d2h^6;p n c n;-p 2ab 2n", "52:a-cb;8;d2h^6;p n a n;-p 2n 2bc", "53;8;d2h^7;p m n a;-p 2ac 2", "53:ba-c;8;d2h^7;p n m b;-p 2bc 2bc", "53:cab;8;d2h^7;p b m n;-p 2ab 2ab", "53:-cba;8;d2h^7;p c n m;-p 2 2ac", "53:bca;8;d2h^7;p n c m;-p 2 2bc", "53:a-cb;8;d2h^7;p m a n;-p 2ab 2", "54;8;d2h^8;p c c a;-p 2a 2ac", "54:ba-c;8;d2h^8;p c c b;-p 2b 2c", "54:cab;8;d2h^8;p b a a;-p 2a 2b", "54:-cba;8;d2h^8;p c a a;-p 2ac 2c", "54:bca;8;d2h^8;p b c b;-p 2bc 2b", "54:a-cb;8;d2h^8;p b a b;-p 2b 2ab", "55;8;d2h^9;p b a m;-p 2 2ab", "55:cab;8;d2h^9;p m c b;-p 2bc 2", "55:bca;8;d2h^9;p c m a;-p 2ac 2ac", "56;8;d2h^10;p c c n;-p 2ab 2ac", "56:cab;8;d2h^10;p n a a;-p 2ac 2bc", "56:bca;8;d2h^10;p b n b;-p 2bc 2ab", "57;8;d2h^11;p b c m;-p 2c 2b", "57:ba-c;8;d2h^11;p c a m;-p 2c 2ac", "57:cab;8;d2h^11;p m c a;-p 2ac 2a", "57:-cba;8;d2h^11;p m a b;-p 2b 2a", "57:bca;8;d2h^11;p b m a;-p 2a 2ab", "57:a-cb;8;d2h^11;p c m b;-p 2bc 2c", "58;8;d2h^12;p n n m;-p 2 2n", "58:cab;8;d2h^12;p m n n;-p 2n 2", "58:bca;8;d2h^12;p n m n;-p 2n 2n", "59:1;8;d2h^13;p m m n:1;p 2 2ab -1ab;-b", "59:2;8;d2h^13;p m m n:2;-p 2ab 2a", "59:1cab;8;d2h^13;p n m m:1;p 2bc 2 -1bc", "59:2cab;8;d2h^13;p n m m:2;-p 2c 2bc", "59:1bca;8;d2h^13;p m n m:1;p 2ac 2ac -1ac", "59:2bca;8;d2h^13;p m n m:2;-p 2c 2a", "60;8;d2h^14;p b c n;-p 2n 2ab", "60:ba-c;8;d2h^14;p c a n;-p 2n 2c", "60:cab;8;d2h^14;p n c a;-p 2a 2n", "60:-cba;8;d2h^14;p n a b;-p 2bc 2n", "60:bca;8;d2h^14;p b n a;-p 2ac 2b", "60:a-cb;8;d2h^14;p c n b;-p 2b 2ac", "61;8;d2h^15;p b c a;-p 2ac 2ab", "61:ba-c;8;d2h^15;p c a b;-p 2bc 2ac", "62;8;d2h^16;p n m a;-p 2ac 2n", "62:ba-c;8;d2h^16;p m n b;-p 2bc 2a", "62:cab;8;d2h^16;p b n m;-p 2c 2ab", "62:-cba;8;d2h^16;p c m n;-p 2n 2ac", "62:bca;8;d2h^16;p m c n;-p 2n 2a", "62:a-cb;8;d2h^16;p n a m;-p 2c 2n", "63;16;d2h^17;c m c m;-c 2c 2", "63:ba-c;16;d2h^17;c c m m;-c 2c 2c", "63:cab;16;d2h^17;a m m a;-a 2a 2a", "63:-cba;16;d2h^17;a m a m;-a 2 2a", "63:bca;16;d2h^17;b b m m;-b 2 2b", "63:a-cb;16;d2h^17;b m m b;-b 2b 2", "64;16;d2h^18;c m c e;-c 2ac 2", "64;16;d2h^18;c m c a;-c 2ac 2", "64:ba-c;16;d2h^18;c c m b;-c 2ac 2ac", "64:cab;16;d2h^18;a b m a;-a 2ab 2ab", "64:-cba;16;d2h^18;a c a m;-a 2 2ab", "64:bca;16;d2h^18;b b c m;-b 2 2ab", "64:a-cb;16;d2h^18;b m a b;-b 2ab 2", "65;16;d2h^19;c m m m;-c 2 2", "65:cab;16;d2h^19;a m m m;-a 2 2", "65:bca;16;d2h^19;b m m m;-b 2 2", "66;16;d2h^20;c c c m;-c 2 2c", "66:cab;16;d2h^20;a m a a;-a 2a 2", "66:bca;16;d2h^20;b b m b;-b 2b 2b", "67;16;d2h^21;c m m e;-c 2a 2", "67;16;d2h^21;c m m a;-c 2a 2", "67:ba-c;16;d2h^21;c m m b;-c 2a 2a", "67:cab;16;d2h^21;a b m m;-a 2b 2b", "67:-cba;16;d2h^21;a c m m;-a 2 2b", "67:bca;16;d2h^21;b m c m;-b 2 2a", "67:a-cb;16;d2h^21;b m a m;-b 2a 2", "68:1;16;d2h^22;c c c e:1;c 2 2 -1ac;-b", "68:1;16;d2h^22;c c c a:1;c 2 2 -1ac;-b", "68:2;16;d2h^22;c c c e:2;-c 2a 2ac", "68:2;16;d2h^22;c c c a:2;-c 2a 2ac", "68:1ba-c;16;d2h^22;c c c b:1;c 2 2 -1ac", "68:2ba-c;16;d2h^22;c c c b:2;-c 2a 2c", "68:1cab;16;d2h^22;a b a a:1;a 2 2 -1ab", "68:2cab;16;d2h^22;a b a a:2;-a 2a 2b", "68:1-cba;16;d2h^22;a c a a:1;a 2 2 -1ab", "68:2-cba;16;d2h^22;a c a a:2;-a 2ab 2b", "68:1bca;16;d2h^22;b b c b:1;b 2 2 -1ab", "68:2bca;16;d2h^22;b b c b:2;-b 2ab 2b", "68:1a-cb;16;d2h^22;b b a b:1;b 2 2 -1ab", "68:2a-cb;16;d2h^22;b b a b:2;-b 2b 2ab", "69;32;d2h^23;f m m m;-f 2 2", "70:1;32;d2h^24;f d d d:1;f 2 2 -1d;-b", "70:2;32;d2h^24;f d d d:2;-f 2uv 2vw", "71;16;d2h^25;i m m m;-i 2 2", "72;16;d2h^26;i b a m;-i 2 2c", "72:cab;16;d2h^26;i m c b;-i 2a 2", "72:bca;16;d2h^26;i c m a;-i 2b 2b", "73;16;d2h^27;i b c a;-i 2b 2c", "73:ba-c;16;d2h^27;i c a b;-i 2a 2b", "74;16;d2h^28;i m m a;-i 2b 2", "74:ba-c;16;d2h^28;i m m b;-i 2a 2a", "74:cab;16;d2h^28;i b m m;-i 2c 2c", "74:-cba;16;d2h^28;i c m m;-i 2 2b", "74:bca;16;d2h^28;i m c m;-i 2 2a", "74:a-cb;16;d2h^28;i m a m;-i 2c 2", "75;4;c4^1;p 4;p 4", "76;4;c4^2;p 41;p 4w", "76*;4;c4^2;p 41*;p 41", "77;4;c4^3;p 42;p 4c", "77*;4;c4^3;p 42*;p 42", "78;4;c4^4;p 43;p 4cw", "78*;4;c4^4;p 43*;p 43", "79;8;c4^5;i 4;i 4", "80;8;c4^6;i 41;i 4bw", "81;4;s4^1;p -4;p -4", "82;8;s4^2;i -4;i -4", "83;8;c4h^1;p 4/m;-p 4", "84;8;c4h^2;p 42/m;-p 4c", "84*;8;c4h^2;p 42/m*;-p 42", "85:1;8;c4h^3;p 4/n:1;p 4ab -1ab;-b", "85:2;8;c4h^3;p 4/n:2;-p 4a", "86:1;8;c4h^4;p 42/n:1;p 4n -1n;-b", "86:2;8;c4h^4;p 42/n:2;-p 4bc", "87;16;c4h^5;i 4/m;-i 4", "88:1;16;c4h^6;i 41/a:1;i 4bw -1bw;-b", "88:2;16;c4h^6;i 41/a:2;-i 4ad", "89;8;d4^1;p 4 2 2;p 4 2", "90;8;d4^2;p 4 21 2;p 4ab 2ab", "91;8;d4^3;p 41 2 2;p 4w 2c", "91*;8;d4^3;p 41 2 2*;p 41 2c", "92;8;d4^4;p 41 21 2;p 4abw 2nw", "93;8;d4^5;p 42 2 2;p 4c 2", "93*;8;d4^5;p 42 2 2*;p 42 2", "94;8;d4^6;p 42 21 2;p 4n 2n", "95;8;d4^7;p 43 2 2;p 4cw 2c", "95*;8;d4^7;p 43 2 2*;p 43 2c", "96;8;d4^8;p 43 21 2;p 4nw 2abw", "97;16;d4^9;i 4 2 2;i 4 2", "98;16;d4^10;i 41 2 2;i 4bw 2bw", "99;8;c4v^1;p 4 m m;p 4 -2", "100;8;c4v^2;p 4 b m;p 4 -2ab", "101;8;c4v^3;p 42 c m;p 4c -2c", "101*;8;c4v^3;p 42 c m*;p 42 -2c", "102;8;c4v^4;p 42 n m;p 4n -2n", "103;8;c4v^5;p 4 c c;p 4 -2c", "104;8;c4v^6;p 4 n c;p 4 -2n", "105;8;c4v^7;p 42 m c;p 4c -2", "105*;8;c4v^7;p 42 m c*;p 42 -2", "106;8;c4v^8;p 42 b c;p 4c -2ab", "106*;8;c4v^8;p 42 b c*;p 42 -2ab", "107;16;c4v^9;i 4 m m;i 4 -2", "108;16;c4v^10;i 4 c m;i 4 -2c", "109;16;c4v^11;i 41 m d;i 4bw -2", "110;16;c4v^12;i 41 c d;i 4bw -2c", "111;8;d2d^1;p -4 2 m;p -4 2", "112;8;d2d^2;p -4 2 c;p -4 2c", "113;8;d2d^3;p -4 21 m;p -4 2ab", "114;8;d2d^4;p -4 21 c;p -4 2n", "115;8;d2d^5;p -4 m 2;p -4 -2", "116;8;d2d^6;p -4 c 2;p -4 -2c", "117;8;d2d^7;p -4 b 2;p -4 -2ab", "118;8;d2d^8;p -4 n 2;p -4 -2n", "119;16;d2d^9;i -4 m 2;i -4 -2", "120;16;d2d^10;i -4 c 2;i -4 -2c", "121;16;d2d^11;i -4 2 m;i -4 2", "122;16;d2d^12;i -4 2 d;i -4 2bw", "123;16;d4h^1;p 4/m m m;-p 4 2", "124;16;d4h^2;p 4/m c c;-p 4 2c", "125:1;16;d4h^3;p 4/n b m:1;p 4 2 -1ab;-b", "125:2;16;d4h^3;p 4/n b m:2;-p 4a 2b", "126:1;16;d4h^4;p 4/n n c:1;p 4 2 -1n;-b", "126:2;16;d4h^4;p 4/n n c:2;-p 4a 2bc", "127;16;d4h^5;p 4/m b m;-p 4 2ab", "128;16;d4h^6;p 4/m n c;-p 4 2n", "129:1;16;d4h^7;p 4/n m m:1;p 4ab 2ab -1ab;-b", "129:2;16;d4h^7;p 4/n m m:2;-p 4a 2a", "130:1;16;d4h^8;p 4/n c c:1;p 4ab 2n -1ab;-b", "130:2;16;d4h^8;p 4/n c c:2;-p 4a 2ac", "131;16;d4h^9;p 42/m m c;-p 4c 2", "132;16;d4h^10;p 42/m c m;-p 4c 2c", "133:1;16;d4h^11;p 42/n b c:1;p 4n 2c -1n;-b", "133:2;16;d4h^11;p 42/n b c:2;-p 4ac 2b", "134:1;16;d4h^12;p 42/n n m:1;p 4n 2 -1n;-b", "134:2;16;d4h^12;p 42/n n m:2;-p 4ac 2bc", "135;16;d4h^13;p 42/m b c;-p 4c 2ab", "135*;16;d4h^13;p 42/m b c*;-p 42 2ab", "136;16;d4h^14;p 42/m n m;-p 4n 2n", "137:1;16;d4h^15;p 42/n m c:1;p 4n 2n -1n;-b", "137:2;16;d4h^15;p 42/n m c:2;-p 4ac 2a", "138:1;16;d4h^16;p 42/n c m:1;p 4n 2ab -1n;-b", "138:2;16;d4h^16;p 42/n c m:2;-p 4ac 2ac", "139;32;d4h^17;i 4/m m m;-i 4 2", "140;32;d4h^18;i 4/m c m;-i 4 2c", "141:1;32;d4h^19;i 41/a m d:1;i 4bw 2bw -1bw;-b", "141:2;32;d4h^19;i 41/a m d:2;-i 4bd 2", "142:1;32;d4h^20;i 41/a c d:1;i 4bw 2aw -1bw;-b", "142:2;32;d4h^20;i 41/a c d:2;-i 4bd 2c", "143;3;c3^1;p 3;p 3", "144;3;c3^2;p 31;p 31", "145;3;c3^3;p 32;p 32", "146:h;9;c3^4;r 3:h;r 3", "146:r;3;c3^4;r 3:r;p 3*", "147;6;c3i^1;p -3;-p 3", "148:h;18;c3i^2;r -3:h;-r 3", "148:r;6;c3i^2;r -3:r;-p 3*", "149;6;d3^1;p 3 1 2;p 3 2", "150;6;d3^2;p 3 2 1;p 3 2\"", "151;6;d3^3;p 31 1 2;p 31 2 (0 0 4)", "152;6;d3^4;p 31 2 1;p 31 2\"", "153;6;d3^5;p 32 1 2;p 32 2 (0 0 2)", "154;6;d3^6;p 32 2 1;p 32 2\"", "155:h;18;d3^7;r 3 2:h;r 3 2\"", "155:r;6;d3^7;r 3 2:r;p 3* 2", "156;6;c3v^1;p 3 m 1;p 3 -2\"", "157;6;c3v^2;p 3 1 m;p 3 -2", "158;6;c3v^3;p 3 c 1;p 3 -2\"c", "159;6;c3v^4;p 3 1 c;p 3 -2c", "160:h;18;c3v^5;r 3 m:h;r 3 -2\"", "160:r;6;c3v^5;r 3 m:r;p 3* -2", "161:h;18;c3v^6;r 3 c:h;r 3 -2\"c", "161:r;6;c3v^6;r 3 c:r;p 3* -2n", "162;12;d3d^1;p -3 1 m;-p 3 2", "163;12;d3d^2;p -3 1 c;-p 3 2c", "164;12;d3d^3;p -3 m 1;-p 3 2\"", "165;12;d3d^4;p -3 c 1;-p 3 2\"c", "166:h;36;d3d^5;r -3 m:h;-r 3 2\"", "166:r;12;d3d^5;r -3 m:r;-p 3* 2", "167:h;36;d3d^6;r -3 c:h;-r 3 2\"c", "167:r;12;d3d^6;r -3 c:r;-p 3* 2n", "168;6;c6^1;p 6;p 6", "169;6;c6^2;p 61;p 61", "170;6;c6^3;p 65;p 65", "171;6;c6^4;p 62;p 62", "172;6;c6^5;p 64;p 64", "173;6;c6^6;p 63;p 6c", "173*;6;c6^6;p 63*;p 63 ", "174;6;c3h^1;p -6;p -6", "175;12;c6h^1;p 6/m;-p 6", "176;12;c6h^2;p 63/m;-p 6c", "176*;12;c6h^2;p 63/m*;-p 63", "177;12;d6^1;p 6 2 2;p 6 2", "178;12;d6^2;p 61 2 2;p 61 2 (0 0 5)", "179;12;d6^3;p 65 2 2;p 65 2 (0 0 1)", "180;12;d6^4;p 62 2 2;p 62 2 (0 0 4)", "181;12;d6^5;p 64 2 2;p 64 2 (0 0 2)", "182;12;d6^6;p 63 2 2;p 6c 2c", "182*;12;d6^6;p 63 2 2*;p 63 2c", "183;12;c6v^1;p 6 m m;p 6 -2", "184;12;c6v^2;p 6 c c;p 6 -2c", "185;12;c6v^3;p 63 c m;p 6c -2", "185*;12;c6v^3;p 63 c m*;p 63 -2", "186;12;c6v^4;p 63 m c;p 6c -2c", "186*;12;c6v^4;p 63 m c*;p 63 -2c", "187;12;d3h^1;p -6 m 2;p -6 2", "188;12;d3h^2;p -6 c 2;p -6c 2", "189;12;d3h^3;p -6 2 m;p -6 -2", "190;12;d3h^4;p -6 2 c;p -6c -2c", "191;24;d6h^1;p 6/m m m;-p 6 2", "192;24;d6h^2;p 6/m c c;-p 6 2c", "193;24;d6h^3;p 63/m c m;-p 6c 2", "193*;24;d6h^3;p 63/m c m*;-p 63 2", "194;24;d6h^4;p 63/m m c;-p 6c 2c", "194*;24;d6h^4;p 63/m m c*;-p 63 2c", "195;12;t^1;p 2 3;p 2 2 3", "196;48;t^2;f 2 3;f 2 2 3", "197;24;t^3;i 2 3;i 2 2 3", "198;12;t^4;p 21 3;p 2ac 2ab 3", "199;24;t^5;i 21 3;i 2b 2c 3", "200;24;th^1;p m -3;-p 2 2 3", "201:1;24;th^2;p n -3:1;p 2 2 3 -1n;-b", "201:2;24;th^2;p n -3:2;-p 2ab 2bc 3", "202;96;th^3;f m -3;-f 2 2 3", "203:1;96;th^4;f d -3:1;f 2 2 3 -1d;-b", "203:2;96;th^4;f d -3:2;-f 2uv 2vw 3", "204;48;th^5;i m -3;-i 2 2 3", "205;24;th^6;p a -3;-p 2ac 2ab 3", "206;48;th^7;i a -3;-i 2b 2c 3", "207;24;o^1;p 4 3 2;p 4 2 3", "208;24;o^2;p 42 3 2;p 4n 2 3", "209;96;o^3;f 4 3 2;f 4 2 3", "210;96;o^4;f 41 3 2;f 4d 2 3", "211;48;o^5;i 4 3 2;i 4 2 3", "212;24;o^6;p 43 3 2;p 4acd 2ab 3", "213;24;o^7;p 41 3 2;p 4bd 2ab 3", "214;48;o^8;i 41 3 2;i 4bd 2c 3", "215;24;td^1;p -4 3 m;p -4 2 3", "216;96;td^2;f -4 3 m;f -4 2 3", "217;48;td^3;i -4 3 m;i -4 2 3", "218;24;td^4;p -4 3 n;p -4n 2 3", "219;96;td^5;f -4 3 c;f -4a 2 3", "220;48;td^6;i -4 3 d;i -4bd 2c 3", "221;48;oh^1;p m -3 m;-p 4 2 3", "222:1;48;oh^2;p n -3 n:1;p 4 2 3 -1n;-b", "222:2;48;oh^2;p n -3 n:2;-p 4a 2bc 3", "223;48;oh^3;p m -3 n;-p 4n 2 3", "224:1;48;oh^4;p n -3 m:1;p 4n 2 3 -1n;-b", "224:2;48;oh^4;p n -3 m:2;-p 4bc 2bc 3", "225;192;oh^5;f m -3 m;-f 4 2 3", "226;192;oh^6;f m -3 c;-f 4a 2 3", "227:1;192;oh^7;f d -3 m:1;f 4d 2 3 -1d;-b", "227:2;192;oh^7;f d -3 m:2;-f 4vw 2vw 3", "228:1;192;oh^8;f d -3 c:1;f 4d 2 3 -1ad;-b", "228:2;192;oh^8;f d -3 c:2;-f 4ud 2vw 3", "229;96;oh^9;i m -3 m;-i 4 2 3", "230;96;oh^10;i a -3 d;-i 4bd 2c 3"]));
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.HallInfo", ["JU.P3i", "$.SB", "JS.HallRotationTerm", "$.HallTranslation", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.hallSymbol = null;
this.primitiveHallSymbol = null;
this.latticeCode = '\0';
this.latticeExtension = null;
this.isCentrosymmetric = false;
this.nRotations = 0;
this.rotationTerms = null;
this.vector12ths = null;
this.vectorCode = null;
Clazz_instantialize (this, arguments);
}, JS, "HallInfo");
Clazz_prepareFields (c$, function () {
this.rotationTerms =  new Array (16);
});
Clazz_makeConstructor (c$, 
function (hallSymbol) {
try {
var str = this.hallSymbol = hallSymbol.trim ();
str = this.extractLatticeInfo (str);
if (JS.HallTranslation.getLatticeIndex (this.latticeCode) == 0) return;
this.latticeExtension = JS.HallTranslation.getLatticeExtension (this.latticeCode, this.isCentrosymmetric);
str = this.extractVectorInfo (str) + this.latticeExtension;
if (JU.Logger.debugging) JU.Logger.debug ("Hallinfo: " + hallSymbol + " " + str);
var prevOrder = 0;
var prevAxisType = '\u0000';
this.primitiveHallSymbol = "P";
while (str.length > 0 && this.nRotations < 16) {
str = this.extractRotationInfo (str, prevOrder, prevAxisType);
var r = this.rotationTerms[this.nRotations - 1];
prevOrder = r.order;
prevAxisType = r.axisType;
this.primitiveHallSymbol += " " + r.primitiveCode;
}
this.primitiveHallSymbol += this.vectorCode;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.error ("Invalid Hall symbol " + e);
this.nRotations = 0;
} else {
throw e;
}
}
}, "~S");
Clazz_defineMethod (c$, "dumpInfo", 
function () {
var sb =  new JU.SB ();
sb.append ("\nHall symbol: ").append (this.hallSymbol).append ("\nprimitive Hall symbol: ").append (this.primitiveHallSymbol).append ("\nlattice type: ").append (this.getLatticeDesignation ());
for (var i = 0; i < this.nRotations; i++) {
sb.append ("\n\nrotation term ").appendI (i + 1).append (this.rotationTerms[i].dumpInfo (this.vectorCode));
}
return sb.toString ();
});
Clazz_defineMethod (c$, "getLatticeDesignation", 
 function () {
return JS.HallTranslation.getLatticeDesignation2 (this.latticeCode, this.isCentrosymmetric);
});
Clazz_defineMethod (c$, "extractLatticeInfo", 
 function (name) {
var i = name.indexOf (" ");
if (i < 0) return "";
var term = name.substring (0, i).toUpperCase ();
this.latticeCode = term.charAt (0);
if (this.latticeCode == '-') {
this.isCentrosymmetric = true;
this.latticeCode = term.charAt (1);
}return name.substring (i + 1).trim ();
}, "~S");
Clazz_defineMethod (c$, "extractVectorInfo", 
 function (name) {
this.vector12ths =  new JU.P3i ();
this.vectorCode = "";
var i = name.indexOf ("(");
var j = name.indexOf (")", i);
if (i > 0 && j > i) {
var term = name.substring (i + 1, j);
this.vectorCode = " (" + term + ")";
name = name.substring (0, i).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.x = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.y = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
}}this.vector12ths.z = Integer.parseInt (term);
}return name;
}, "~S");
Clazz_defineMethod (c$, "extractRotationInfo", 
 function (name, prevOrder, prevAxisType) {
var i = name.indexOf (" ");
var code;
if (i >= 0) {
code = name.substring (0, i);
name = name.substring (i + 1).trim ();
} else {
code = name;
name = "";
}this.rotationTerms[this.nRotations] =  new JS.HallRotationTerm (this, code, prevOrder, prevAxisType);
this.nRotations++;
return name;
}, "~S,~N,~S");
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.M4"], "JS.HallRotationTerm", ["JU.SB", "JS.HallRotation", "$.HallTranslation", "$.SymmetryOperation", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.inputCode = null;
this.primitiveCode = null;
this.lookupCode = null;
this.translationString = null;
this.rotation = null;
this.translation = null;
this.seitzMatrix12ths = null;
this.isImproper = false;
this.order = 0;
this.axisType = '\0';
this.diagonalReferenceAxis = '\0';
this.allPositive = true;
Clazz_instantialize (this, arguments);
}, JS, "HallRotationTerm");
Clazz_prepareFields (c$, function () {
this.seitzMatrix12ths =  new JU.M4 ();
});
Clazz_makeConstructor (c$, 
function (hallInfo, code, prevOrder, prevAxisType) {
this.inputCode = code;
code += "   ";
if (code.charAt (0) == '-') {
this.isImproper = true;
code = code.substring (1);
}this.primitiveCode = "";
this.order = code.charCodeAt (0) - 48;
this.diagonalReferenceAxis = '\0';
this.axisType = '\0';
var ptr = 2;
var c;
switch (c = code.charAt (1)) {
case 'x':
case 'y':
case 'z':
switch (code.charAt (2)) {
case '\'':
case '"':
this.diagonalReferenceAxis = c;
c = code.charAt (2);
ptr++;
}
case '*':
this.axisType = c;
break;
case '\'':
case '"':
this.axisType = c;
switch (code.charAt (2)) {
case 'x':
case 'y':
case 'z':
this.diagonalReferenceAxis = code.charAt (2);
ptr++;
break;
default:
this.diagonalReferenceAxis = prevAxisType;
}
break;
default:
this.axisType = (this.order == 1 ? '_' : hallInfo.nRotations == 0 ? 'z' : hallInfo.nRotations == 2 ? '*' : prevOrder == 2 || prevOrder == 4 ? 'x' : '\'');
code = code.substring (0, 1) + this.axisType + code.substring (1);
}
this.primitiveCode += (this.axisType == '_' ? "1" : code.substring (0, 2));
if (this.diagonalReferenceAxis != '\0') {
code = code.substring (0, 1) + this.diagonalReferenceAxis + this.axisType + code.substring (ptr);
this.primitiveCode += this.diagonalReferenceAxis;
ptr = 3;
}this.lookupCode = code.substring (0, ptr);
this.rotation = JS.HallRotation.lookup (this.lookupCode);
if (this.rotation == null) {
JU.Logger.error ("Rotation lookup could not find " + this.inputCode + " ? " + this.lookupCode);
return;
}this.translation =  new JS.HallTranslation ('\0', null);
this.translationString = "";
var len = code.length;
for (var i = ptr; i < len; i++) {
var translationCode = code.charAt (i);
var t = JS.HallTranslation.getHallTranslation (translationCode, this.order);
if (t != null) {
this.translationString += "" + t.translationCode;
this.translation.rotationShift12ths += t.rotationShift12ths;
this.translation.vectorShift12ths.add (t.vectorShift12ths);
}}
this.primitiveCode = (this.isImproper ? "-" : "") + this.primitiveCode + this.translationString;
this.seitzMatrix12ths.setM4 (this.isImproper ? this.rotation.seitzMatrixInv : this.rotation.seitzMatrix);
this.seitzMatrix12ths.m03 = this.translation.vectorShift12ths.x;
this.seitzMatrix12ths.m13 = this.translation.vectorShift12ths.y;
this.seitzMatrix12ths.m23 = this.translation.vectorShift12ths.z;
switch (this.axisType) {
case 'x':
this.seitzMatrix12ths.m03 += this.translation.rotationShift12ths;
break;
case 'y':
this.seitzMatrix12ths.m13 += this.translation.rotationShift12ths;
break;
case 'z':
this.seitzMatrix12ths.m23 += this.translation.rotationShift12ths;
break;
}
if (hallInfo.vectorCode.length > 0) {
var m1 = JU.M4.newM4 (null);
var m2 = JU.M4.newM4 (null);
var v = hallInfo.vector12ths;
m1.m03 = v.x;
m1.m13 = v.y;
m1.m23 = v.z;
m2.m03 = -v.x;
m2.m13 = -v.y;
m2.m23 = -v.z;
this.seitzMatrix12ths.mul2 (m1, this.seitzMatrix12ths);
this.seitzMatrix12ths.mul (m2);
}if (JU.Logger.debugging) {
JU.Logger.debug ("code = " + code + "; primitive code =" + this.primitiveCode + "\n Seitz Matrix(12ths):" + this.seitzMatrix12ths);
}}, "JS.HallInfo,~S,~N,~S");
Clazz_defineMethod (c$, "dumpInfo", 
function (vectorCode) {
var sb =  new JU.SB ();
sb.append ("\ninput code: ").append (this.inputCode).append ("; primitive code: ").append (this.primitiveCode).append ("\norder: ").appendI (this.order).append (this.isImproper ? " (improper axis)" : "");
if (this.axisType != '_') {
sb.append ("; axisType: ").appendC (this.axisType);
if (this.diagonalReferenceAxis != '\0') sb.appendC (this.diagonalReferenceAxis);
}if (this.translationString.length > 0) sb.append ("; translation: ").append (this.translationString);
if (vectorCode.length > 0) sb.append ("; vector offset: ").append (vectorCode);
if (this.rotation != null) sb.append ("\noperator: ").append (this.getXYZ (this.allPositive)).append ("\nSeitz matrix:\n").append (JS.SymmetryOperation.dumpSeitz (this.seitzMatrix12ths, false));
return sb.toString ();
}, "~S");
Clazz_defineMethod (c$, "getXYZ", 
function (allPositive) {
return JS.SymmetryOperation.getXYZFromMatrix (this.seitzMatrix12ths, true, allPositive, true);
}, "~B");
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.M4"], "JS.HallRotation", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.rotCode = null;
this.seitzMatrix = null;
this.seitzMatrixInv = null;
Clazz_instantialize (this, arguments);
}, JS, "HallRotation");
Clazz_prepareFields (c$, function () {
this.seitzMatrix =  new JU.M4 ();
this.seitzMatrixInv =  new JU.M4 ();
});
Clazz_makeConstructor (c$, 
 function (code, matrixData) {
this.rotCode = code;
var data =  Clazz_newFloatArray (16, 0);
var dataInv =  Clazz_newFloatArray (16, 0);
data[15] = dataInv[15] = 1;
for (var i = 0, ipt = 0; ipt < 11; i++) {
var value = 0;
switch (matrixData.charAt (i)) {
case ' ':
ipt++;
continue;
case '+':
case '1':
value = 1;
break;
case '-':
value = -1;
break;
}
data[ipt] = value;
dataInv[ipt] = -value;
ipt++;
}
this.seitzMatrix.setA (data);
this.seitzMatrixInv.setA (dataInv);
}, "~S,~S");
c$.lookup = Clazz_defineMethod (c$, "lookup", 
function (code) {
for (var i = JS.HallRotation.getHallTerms ().length; --i >= 0; ) if (JS.HallRotation.hallRotationTerms[i].rotCode.equals (code)) return JS.HallRotation.hallRotationTerms[i];

return null;
}, "~S");
c$.getHallTerms = Clazz_defineMethod (c$, "getHallTerms", 
 function () {
return (JS.HallRotation.hallRotationTerms == null ? JS.HallRotation.hallRotationTerms =  Clazz_newArray (-1, [ new JS.HallRotation ("1_", "+00 0+0 00+"),  new JS.HallRotation ("2x", "+00 0-0 00-"),  new JS.HallRotation ("2y", "-00 0+0 00-"),  new JS.HallRotation ("2z", "-00 0-0 00+"),  new JS.HallRotation ("2'", "0-0 -00 00-"),  new JS.HallRotation ("2\"", "0+0 +00 00-"),  new JS.HallRotation ("2x'", "-00 00- 0-0"),  new JS.HallRotation ("2x\"", "-00 00+ 0+0"),  new JS.HallRotation ("2y'", "00- 0-0 -00"),  new JS.HallRotation ("2y\"", "00+ 0-0 +00"),  new JS.HallRotation ("2z'", "0-0 -00 00-"),  new JS.HallRotation ("2z\"", "0+0 +00 00-"),  new JS.HallRotation ("3x", "+00 00- 0+-"),  new JS.HallRotation ("3y", "-0+ 0+0 -00"),  new JS.HallRotation ("3z", "0-0 +-0 00+"),  new JS.HallRotation ("3*", "00+ +00 0+0"),  new JS.HallRotation ("4x", "+00 00- 0+0"),  new JS.HallRotation ("4y", "00+ 0+0 -00"),  new JS.HallRotation ("4z", "0-0 +00 00+"),  new JS.HallRotation ("6x", "+00 0+- 0+0"),  new JS.HallRotation ("6y", "00+ 0+0 -0+"),  new JS.HallRotation ("6z", "+-0 +00 00+")]) : JS.HallRotation.hallRotationTerms);
});
Clazz_defineStatics (c$,
"hallRotationTerms", null);
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.HallTranslation", ["JU.P3i"], function () {
c$ = Clazz_decorateAsClass (function () {
this.translationCode = '\0';
this.rotationOrder = 0;
this.rotationShift12ths = 0;
this.vectorShift12ths = null;
Clazz_instantialize (this, arguments);
}, JS, "HallTranslation");
Clazz_makeConstructor (c$, 
function (translationCode, params) {
this.translationCode = translationCode;
if (params != null) {
if (params.z >= 0) {
this.vectorShift12ths = params;
return;
}this.rotationOrder = params.x;
this.rotationShift12ths = params.y;
}this.vectorShift12ths =  new JU.P3i ();
}, "~S,JU.P3i");
c$.getHallLatticeEquivalent = Clazz_defineMethod (c$, "getHallLatticeEquivalent", 
function (latticeParameter) {
var latticeCode = JS.HallTranslation.getLatticeCode (latticeParameter);
var isCentrosymmetric = (latticeParameter > 0);
return (isCentrosymmetric ? "-" : "") + latticeCode + " 1";
}, "~N");
c$.getLatticeIndex = Clazz_defineMethod (c$, "getLatticeIndex", 
function (latt) {
for (var i = 1, ipt = 3; i <= JS.HallTranslation.nLatticeTypes; i++, ipt += 3) if (JS.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return i;

return 0;
}, "~S");
c$.getLatticeCode = Clazz_defineMethod (c$, "getLatticeCode", 
function (latt) {
if (latt < 0) latt = -latt;
return (latt == 0 ? '\0' : latt > JS.HallTranslation.nLatticeTypes ? JS.HallTranslation.getLatticeCode (JS.HallTranslation.getLatticeIndex (String.fromCharCode (latt))) : JS.HallTranslation.latticeTranslationData[latt * 3].charAt (0));
}, "~N");
c$.getLatticeDesignation = Clazz_defineMethod (c$, "getLatticeDesignation", 
function (latt) {
var isCentrosymmetric = (latt > 0);
var str = (isCentrosymmetric ? "-" : "");
if (latt < 0) latt = -latt;
if (latt == 0 || latt > JS.HallTranslation.nLatticeTypes) return "";
return str + JS.HallTranslation.getLatticeCode (latt) + ": " + (isCentrosymmetric ? "centrosymmetric " : "") + JS.HallTranslation.latticeTranslationData[latt * 3 + 1];
}, "~N");
c$.getLatticeDesignation2 = Clazz_defineMethod (c$, "getLatticeDesignation2", 
function (latticeCode, isCentrosymmetric) {
var latt = JS.HallTranslation.getLatticeIndex (latticeCode);
if (!isCentrosymmetric) latt = -latt;
return JS.HallTranslation.getLatticeDesignation (latt);
}, "~S,~B");
c$.getLatticeExtension = Clazz_defineMethod (c$, "getLatticeExtension", 
function (latt, isCentrosymmetric) {
for (var i = 1, ipt = 3; i <= JS.HallTranslation.nLatticeTypes; i++, ipt += 3) if (JS.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return JS.HallTranslation.latticeTranslationData[ipt + 2] + (isCentrosymmetric ? " -1" : "");

return "";
}, "~S,~B");
c$.getHallTerms = Clazz_defineMethod (c$, "getHallTerms", 
 function () {
return (JS.HallTranslation.hallTranslationTerms == null ? JS.HallTranslation.hallTranslationTerms =  Clazz_newArray (-1, [ new JS.HallTranslation ('a', JU.P3i.new3 (6, 0, 0)),  new JS.HallTranslation ('b', JU.P3i.new3 (0, 6, 0)),  new JS.HallTranslation ('c', JU.P3i.new3 (0, 0, 6)),  new JS.HallTranslation ('n', JU.P3i.new3 (6, 6, 6)),  new JS.HallTranslation ('u', JU.P3i.new3 (3, 0, 0)),  new JS.HallTranslation ('v', JU.P3i.new3 (0, 3, 0)),  new JS.HallTranslation ('w', JU.P3i.new3 (0, 0, 3)),  new JS.HallTranslation ('d', JU.P3i.new3 (3, 3, 3)),  new JS.HallTranslation ('1', JU.P3i.new3 (2, 6, -1)),  new JS.HallTranslation ('1', JU.P3i.new3 (3, 4, -1)),  new JS.HallTranslation ('2', JU.P3i.new3 (3, 8, -1)),  new JS.HallTranslation ('1', JU.P3i.new3 (4, 3, -1)),  new JS.HallTranslation ('3', JU.P3i.new3 (4, 9, -1)),  new JS.HallTranslation ('1', JU.P3i.new3 (6, 2, -1)),  new JS.HallTranslation ('2', JU.P3i.new3 (6, 4, -1)),  new JS.HallTranslation ('4', JU.P3i.new3 (6, 8, -1)),  new JS.HallTranslation ('5', JU.P3i.new3 (6, 10, -1)),  new JS.HallTranslation ('r', JU.P3i.new3 (4, 8, 8)),  new JS.HallTranslation ('s', JU.P3i.new3 (8, 8, 4)),  new JS.HallTranslation ('t', JU.P3i.new3 (8, 4, 8))]) : JS.HallTranslation.hallTranslationTerms);
});
c$.getHallTranslation = Clazz_defineMethod (c$, "getHallTranslation", 
function (translationCode, order) {
var ht = null;
for (var i = JS.HallTranslation.getHallTerms ().length; --i >= 0; ) {
var h = JS.HallTranslation.hallTranslationTerms[i];
if (h.translationCode == translationCode) {
if (h.rotationOrder == 0 || h.rotationOrder == order) {
ht =  new JS.HallTranslation (translationCode, null);
ht.translationCode = translationCode;
ht.rotationShift12ths = h.rotationShift12ths;
ht.vectorShift12ths = h.vectorShift12ths;
return ht;
}}}
return ht;
}, "~S,~N");
Clazz_defineStatics (c$,
"latticeTranslationData",  Clazz_newArray (-1, ["\0", "unknown", "", "P", "primitive", "", "I", "body-centered", " 1n", "R", "rhombohedral", " 1r 1r", "F", "face-centered", " 1ab 1bc 1ac", "A", "A-centered", " 1bc", "B", "B-centered", " 1ac", "C", "C-centered", " 1ab", "S", "rhombohedral(S)", " 1s 1s", "T", "rhombohedral(T)", " 1t 1t"]));
c$.nLatticeTypes = c$.prototype.nLatticeTypes = Clazz_doubleToInt (JS.HallTranslation.latticeTranslationData.length / 3) - 1;
Clazz_defineStatics (c$,
"hallTranslationTerms", null);
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.M4"], "JS.SymmetryOperation", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.Matrix", "$.P3", "$.PT", "$.SB", "$.V3", "JU.Logger", "$.Parser"], function () {
c$ = Clazz_decorateAsClass (function () {
this.xyzOriginal = null;
this.xyz = null;
this.doNormalize = true;
this.isFinalized = false;
this.opId = 0;
this.centering = null;
this.myLabels = null;
this.modDim = 0;
this.linearRotTrans = null;
this.rsvs = null;
this.isBio = false;
this.sigma = null;
this.index = 0;
this.subsystemCode = null;
this.timeReversal = 0;
this.unCentered = false;
this.isCenteringOp = false;
this.magOp = 3.4028235E38;
this.info = null;
Clazz_instantialize (this, arguments);
}, JS, "SymmetryOperation", JU.M4);
Clazz_defineMethod (c$, "setSigma", 
function (subsystemCode, sigma) {
this.subsystemCode = subsystemCode;
this.sigma = sigma;
}, "~S,JU.Matrix");
Clazz_overrideConstructor (c$, 
function (op, atoms, atomIndex, countOrId, doNormalize) {
this.doNormalize = doNormalize;
if (op == null) {
this.opId = countOrId;
return;
}this.xyzOriginal = op.xyzOriginal;
this.xyz = op.xyz;
this.opId = op.opId;
this.modDim = op.modDim;
this.myLabels = op.myLabels;
this.index = op.index;
this.linearRotTrans = op.linearRotTrans;
this.sigma = op.sigma;
this.subsystemCode = op.subsystemCode;
this.timeReversal = op.timeReversal;
this.setMatrix (false);
if (!op.isFinalized) this.doFinalize ();
if (doNormalize && this.sigma == null) JS.SymmetryOperation.setOffset (this, atoms, atomIndex, countOrId);
}, "JS.SymmetryOperation,~A,~N,~N,~B");
Clazz_defineMethod (c$, "setGamma", 
 function (isReverse) {
var n = 3 + this.modDim;
var a = (this.rsvs =  new JU.Matrix (null, n + 1, n + 1)).getArray ();
var t =  Clazz_newDoubleArray (n, 0);
var pt = 0;
for (var i = 0; i < n; i++) {
for (var j = 0; j < n; j++) a[i][j] = this.linearRotTrans[pt++];

t[i] = (isReverse ? -1 : 1) * this.linearRotTrans[pt++];
}
a[n][n] = 1;
if (isReverse) this.rsvs = this.rsvs.inverse ();
for (var i = 0; i < n; i++) a[i][n] = t[i];

a = this.rsvs.getSubmatrix (0, 0, 3, 3).getArray ();
for (var i = 0; i < 3; i++) for (var j = 0; j < 4; j++) this.setElement (i, j, (j < 3 ? a[i][j] : t[i]));


this.setElement (3, 3, 1);
}, "~B");
Clazz_defineMethod (c$, "doFinalize", 
function () {
JS.SymmetryOperation.div12 (this);
if (this.modDim > 0) {
var a = this.rsvs.getArray ();
for (var i = a.length - 1; --i >= 0; ) a[i][3 + this.modDim] /= 12;

}this.isFinalized = true;
});
c$.div12 = Clazz_defineMethod (c$, "div12", 
 function (op) {
op.m03 /= 12;
op.m13 /= 12;
op.m23 /= 12;
return op;
}, "JU.M4");
Clazz_defineMethod (c$, "getXyz", 
function (normalized) {
return (normalized && this.modDim == 0 || this.xyzOriginal == null ? this.xyz : this.xyzOriginal);
}, "~B");
c$.newPoint = Clazz_defineMethod (c$, "newPoint", 
function (m, atom1, atom2, x, y, z) {
m.rotTrans2 (atom1, atom2);
atom2.add3 (x, y, z);
}, "JU.M4,JU.P3,JU.P3,~N,~N,~N");
Clazz_defineMethod (c$, "dumpInfo", 
function () {
return "\n" + this.xyz + "\ninternal matrix representation:\n" + this.toString ();
});
c$.dumpSeitz = Clazz_defineMethod (c$, "dumpSeitz", 
function (s, isCanonical) {
var sb =  new JU.SB ();
var r =  Clazz_newFloatArray (4, 0);
for (var i = 0; i < 3; i++) {
s.getRow (i, r);
sb.append ("[\t");
for (var j = 0; j < 3; j++) sb.appendI (Clazz_floatToInt (r[j])).append ("\t");

var trans = r[3];
if (trans != Clazz_floatToInt (trans)) trans = 12 * trans;
sb.append (JS.SymmetryOperation.twelfthsOf (isCanonical ? (Clazz_floatToInt (trans) + 12) % 12 : Clazz_floatToInt (trans))).append ("\t]\n");
}
return sb.toString ();
}, "JU.M4,~B");
Clazz_defineMethod (c$, "setMatrixFromXYZ", 
function (xyz, modDim, allowScaling) {
if (xyz == null) return false;
this.xyzOriginal = xyz;
xyz = xyz.toLowerCase ();
this.setModDim (modDim);
var isReverse = (xyz.startsWith ("!"));
if (isReverse) xyz = xyz.substring (1);
if (xyz.indexOf ("xyz matrix:") == 0) {
this.xyz = xyz;
JU.Parser.parseStringInfestedFloatArray (xyz, null, this.linearRotTrans);
return this.setFromMatrix (null, isReverse);
}if (xyz.indexOf ("[[") == 0) {
xyz = xyz.$replace ('[', ' ').$replace (']', ' ').$replace (',', ' ');
JU.Parser.parseStringInfestedFloatArray (xyz, null, this.linearRotTrans);
for (var i = this.linearRotTrans.length; --i >= 0; ) if (Float.isNaN (this.linearRotTrans[i])) return false;

this.setMatrix (isReverse);
this.isFinalized = true;
this.isBio = (xyz.indexOf ("bio") >= 0);
this.xyz = (this.isBio ? this.toString () : JS.SymmetryOperation.getXYZFromMatrix (this, false, false, false));
return true;
}if (modDim == 0 && xyz.indexOf ("x4") >= 0) {
for (var i = 14; --i >= 4; ) {
if (xyz.indexOf ("x" + i) >= 0) {
this.setModDim (i - 3);
break;
}}
}var mxyz = null;
if (xyz.endsWith ("m")) {
this.timeReversal = (xyz.indexOf ("-m") >= 0 ? -1 : 1);
allowScaling = true;
} else if (xyz.indexOf ("mz)") >= 0) {
var pt = xyz.indexOf ("(");
mxyz = xyz.substring (pt + 1, xyz.length - 1);
xyz = xyz.substring (0, pt);
allowScaling = false;
}var strOut = JS.SymmetryOperation.getMatrixFromString (this, xyz, this.linearRotTrans, allowScaling);
if (strOut == null) return false;
if (mxyz != null) {
var isProper = (JU.M4.newA16 (this.linearRotTrans).determinant3 () == 1);
this.timeReversal = (((xyz.indexOf ("-x") < 0) == (mxyz.indexOf ("-mx") < 0)) == isProper ? 1 : -1);
}this.setMatrix (isReverse);
this.xyz = (isReverse ? JS.SymmetryOperation.getXYZFromMatrix (this, true, false, false) : strOut);
if (this.timeReversal != 0) this.xyz += (this.timeReversal == 1 ? ",m" : ",-m");
if (JU.Logger.debugging) JU.Logger.debug ("" + this);
return true;
}, "~S,~N,~B");
Clazz_defineMethod (c$, "setModDim", 
 function (dim) {
var n = (dim + 4) * (dim + 4);
this.modDim = dim;
if (dim > 0) this.myLabels = JS.SymmetryOperation.labelsXn;
this.linearRotTrans =  Clazz_newFloatArray (n, 0);
}, "~N");
Clazz_defineMethod (c$, "setMatrix", 
 function (isReverse) {
if (this.linearRotTrans.length > 16) {
this.setGamma (isReverse);
} else {
this.setA (this.linearRotTrans);
if (isReverse) {
var p3 = JU.P3.new3 (this.m03, this.m13, this.m23);
this.invert ();
this.rotate (p3);
p3.scale (-1);
this.setTranslation (p3);
}}}, "~B");
Clazz_defineMethod (c$, "setFromMatrix", 
function (offset, isReverse) {
var v = 0;
var pt = 0;
this.myLabels = (this.modDim == 0 ? JS.SymmetryOperation.labelsXYZ : JS.SymmetryOperation.labelsXn);
var rowPt = 0;
var n = 3 + this.modDim;
for (var i = 0; rowPt < n; i++) {
if (Float.isNaN (this.linearRotTrans[i])) return false;
v = this.linearRotTrans[i];
if (Math.abs (v) < 0.00001) v = 0;
var isTrans = ((i + 1) % (n + 1) == 0);
if (isTrans) {
if (offset != null) {
v /= 12;
if (pt < offset.length) v += offset[pt++];
}v = JS.SymmetryOperation.normalizeTwelfths ((v < 0 ? -1 : 1) * Math.abs (v * 12) / 12, this.doNormalize);
rowPt++;
}this.linearRotTrans[i] = v;
}
this.linearRotTrans[this.linearRotTrans.length - 1] = 1;
this.setMatrix (isReverse);
this.isFinalized = (offset == null);
this.xyz = JS.SymmetryOperation.getXYZFromMatrix (this, true, false, false);
return true;
}, "~A,~B");
c$.getMatrixFromXYZ = Clazz_defineMethod (c$, "getMatrixFromXYZ", 
function (xyz) {
var linearRotTrans =  Clazz_newFloatArray (16, 0);
xyz = JS.SymmetryOperation.getMatrixFromString (null, xyz, linearRotTrans, false);
return (xyz == null ? null : JS.SymmetryOperation.div12 (JU.M4.newA16 (linearRotTrans)));
}, "~S");
c$.getMatrixFromString = Clazz_defineMethod (c$, "getMatrixFromString", 
function (op, xyz, linearRotTrans, allowScaling) {
var isDenominator = false;
var isDecimal = false;
var isNegative = false;
var modDim = (op == null ? 0 : op.modDim);
var nRows = 4 + modDim;
var doNormalize = (op != null && op.doNormalize);
var dimOffset = (modDim > 0 ? 3 : 0);
linearRotTrans[linearRotTrans.length - 1] = 1;
var transPt = xyz.indexOf (';') + 1;
if (transPt != 0) {
allowScaling = true;
if (transPt == xyz.length) xyz += "0,0,0";
}var rotPt = -1;
var myLabels = (op == null || modDim == 0 ? null : op.myLabels);
if (myLabels == null) myLabels = JS.SymmetryOperation.labelsXYZ;
xyz = xyz.toLowerCase () + ",";
xyz = xyz.$replace ('(', ',');
if (modDim > 0) xyz = JS.SymmetryOperation.replaceXn (xyz, modDim + 3);
var xpt = 0;
var tpt0 = 0;
var rowPt = 0;
var ch;
var iValue = 0;
var tensDenom = 0;
var decimalMultiplier = 1;
var strT = "";
var strOut = "";
for (var i = 0; i < xyz.length; i++) {
switch (ch = xyz.charAt (i)) {
case ';':
break;
case '\'':
case ' ':
case '{':
case '}':
case '!':
continue;
case '-':
isNegative = true;
continue;
case '+':
isNegative = false;
continue;
case '/':
tensDenom = 0;
isDenominator = true;
continue;
case 'x':
case 'y':
case 'z':
case 'a':
case 'b':
case 'c':
case 'd':
case 'e':
case 'f':
case 'g':
case 'h':
tpt0 = rowPt * nRows;
var ipt = (ch >= 'x' ? ch.charCodeAt (0) - 120 : ch.charCodeAt (0) - 97 + dimOffset);
xpt = tpt0 + ipt;
var val = (isNegative ? -1 : 1);
if (allowScaling && iValue != 0) {
linearRotTrans[xpt] = iValue;
val = Clazz_floatToInt (iValue);
iValue = 0;
} else {
linearRotTrans[xpt] = val;
}strT += JS.SymmetryOperation.plusMinus (strT, val, myLabels[ipt]);
break;
case ',':
if (transPt != 0) {
if (transPt > 0) {
rotPt = i;
i = transPt - 1;
transPt = -i;
iValue = 0;
tensDenom = 0;
continue;
}transPt = i + 1;
i = rotPt;
}iValue = JS.SymmetryOperation.normalizeTwelfths (iValue, doNormalize);
linearRotTrans[tpt0 + nRows - 1] = iValue;
strT += JS.SymmetryOperation.xyzFraction12 (iValue, false, true);
strOut += (strOut === "" ? "" : ",") + strT;
if (rowPt == nRows - 2) return strOut;
iValue = 0;
strT = "";
if (rowPt++ > 2 && modDim == 0) {
JU.Logger.warn ("Symmetry Operation? " + xyz);
return null;
}break;
case '.':
isDecimal = true;
decimalMultiplier = 1;
continue;
case '0':
if (!isDecimal && (isDenominator || !allowScaling)) continue;
default:
var ich = ch.charCodeAt (0) - 48;
if (ich >= 0 && ich <= 9) {
if (isDecimal) {
decimalMultiplier /= 10;
if (iValue < 0) isNegative = true;
iValue += decimalMultiplier * ich * (isNegative ? -1 : 1);
continue;
}if (isDenominator) {
if (ich == 1) {
tensDenom = 1;
continue;
}if (tensDenom == 1) {
ich += tensDenom * 10;
}if (iValue == 0) {
linearRotTrans[xpt] /= ich;
} else {
iValue /= ich;
}} else {
iValue = iValue * 10 + (isNegative ? -1 : 1) * ich;
isNegative = false;
}} else {
JU.Logger.warn ("symmetry character?" + ch);
}}
isDecimal = isDenominator = isNegative = false;
}
return null;
}, "JS.SymmetryOperation,~S,~A,~B");
c$.replaceXn = Clazz_defineMethod (c$, "replaceXn", 
function (xyz, n) {
for (var i = n; --i >= 0; ) xyz = JU.PT.rep (xyz, JS.SymmetryOperation.labelsXn[i], JS.SymmetryOperation.labelsXnSub[i]);

return xyz;
}, "~S,~N");
c$.xyzFraction12 = Clazz_defineMethod (c$, "xyzFraction12", 
 function (n12ths, allPositive, halfOrLess) {
var n = n12ths;
if (allPositive) {
while (n < 0) n += 12;

} else if (halfOrLess) {
while (n > 6) n -= 12;

while (n < -6.0) n += 12;

}var s = JS.SymmetryOperation.twelfthsOf (n);
return (s.charAt (0) == '0' ? "" : n > 0 ? "+" + s : s);
}, "~N,~B,~B");
c$.twelfthsOf = Clazz_defineMethod (c$, "twelfthsOf", 
function (n12ths) {
var str = "";
if (n12ths < 0) {
n12ths = -n12ths;
str = "-";
}var m = 12;
var n = Math.round (n12ths);
if (Math.abs (n - n12ths) > 0.01) {
var f = n12ths / 12;
var max = 20;
for (m = 3; m < max; m++) {
var fm = f * m;
n = Math.round (fm);
if (Math.abs (n - fm) < 0.01) break;
}
if (m == max) return str + f;
} else {
if (n == 12) return str + "1";
if (n < 12) return str + JS.SymmetryOperation.twelfths[n % 12];
switch (n % 12) {
case 0:
return "" + Clazz_doubleToInt (n / 12);
case 2:
case 10:
m = 6;
break;
case 3:
case 9:
m = 4;
break;
case 4:
case 8:
m = 3;
break;
case 6:
m = 2;
break;
default:
break;
}
n = (Clazz_doubleToInt (n * m / 12));
}return str + n + "/" + m;
}, "~N");
c$.fortyEighthsOf = Clazz_defineMethod (c$, "fortyEighthsOf", 
function (n48ths) {
var str = "";
if (n48ths < 0) {
n48ths = -n48ths;
str = "-";
}var m = 12;
var n = Math.round (n48ths);
if (Math.abs (n - n48ths) > 0.01) {
var f = n48ths / 48;
var max = 20;
for (m = 5; m < max; m++) {
var fm = f * m;
n = Math.round (fm);
if (Math.abs (n - fm) < 0.01) break;
}
if (m == max) return str + f;
} else {
if (n == 48) return str + "1";
if (n < 48) return str + JS.SymmetryOperation.twelfths[n % 48];
switch (n % 48) {
case 0:
return "" + Clazz_doubleToInt (n / 48);
case 2:
case 10:
m = 6;
break;
case 3:
case 9:
m = 4;
break;
case 4:
case 8:
m = 3;
break;
case 6:
m = 2;
break;
default:
break;
}
n = (Clazz_doubleToInt (n * m / 12));
}return str + n + "/" + m;
}, "~N");
c$.plusMinus = Clazz_defineMethod (c$, "plusMinus", 
 function (strT, x, sx) {
return (x == 0 ? "" : (x < 0 ? "-" : strT.length == 0 ? "" : "+") + (x == 1 || x == -1 ? "" : "" + Clazz_floatToInt (Math.abs (x))) + sx);
}, "~S,~N,~S");
c$.normalizeTwelfths = Clazz_defineMethod (c$, "normalizeTwelfths", 
 function (iValue, doNormalize) {
iValue *= 12;
if (doNormalize) {
while (iValue > 6) iValue -= 12;

while (iValue <= -6) iValue += 12;

}return iValue;
}, "~N,~B");
c$.getXYZFromMatrix = Clazz_defineMethod (c$, "getXYZFromMatrix", 
function (mat, is12ths, allPositive, halfOrLess) {
var str = "";
var op = (Clazz_instanceOf (mat, JS.SymmetryOperation) ? mat : null);
if (op != null && op.modDim > 0) return JS.SymmetryOperation.getXYZFromRsVs (op.rsvs.getRotation (), op.rsvs.getTranslation (), is12ths);
var row =  Clazz_newFloatArray (4, 0);
for (var i = 0; i < 3; i++) {
var lpt = (i < 3 ? 0 : 3);
mat.getRow (i, row);
var term = "";
for (var j = 0; j < 3; j++) if (row[j] != 0) term += JS.SymmetryOperation.plusMinus (term, row[j], JS.SymmetryOperation.labelsXYZ[j + lpt]);

term += JS.SymmetryOperation.xyzFraction12 ((is12ths ? row[3] : row[3] * 12), allPositive, halfOrLess);
str += "," + term;
}
return str.substring (1);
}, "JU.M4,~B,~B,~B");
c$.setOffset = Clazz_defineMethod (c$, "setOffset", 
function (m, atoms, atomIndex, count) {
if (count == 0) return;
var x = 0;
var y = 0;
var z = 0;
if (JS.SymmetryOperation.atomTest == null) JS.SymmetryOperation.atomTest =  new JU.P3 ();
for (var i = atomIndex, i2 = i + count; i < i2; i++) {
JS.SymmetryOperation.newPoint (m, atoms[i], JS.SymmetryOperation.atomTest, 0, 0, 0);
x += JS.SymmetryOperation.atomTest.x;
y += JS.SymmetryOperation.atomTest.y;
z += JS.SymmetryOperation.atomTest.z;
}
x /= count;
y /= count;
z /= count;
while (x < -0.001 || x >= 1.001) {
m.m03 += (x < 0 ? 1 : -1);
x += (x < 0 ? 1 : -1);
}
while (y < -0.001 || y >= 1.001) {
m.m13 += (y < 0 ? 1 : -1);
y += (y < 0 ? 1 : -1);
}
while (z < -0.001 || z >= 1.001) {
m.m23 += (z < 0 ? 1 : -1);
z += (z < 0 ? 1 : -1);
}
}, "JU.M4,~A,~N,~N");
Clazz_defineMethod (c$, "rotateAxes", 
function (vectors, unitcell, ptTemp, mTemp) {
var vRot =  new Array (3);
this.getRotationScale (mTemp);
for (var i = vectors.length; --i >= 0; ) {
ptTemp.setT (vectors[i]);
unitcell.toFractional (ptTemp, true);
mTemp.rotate (ptTemp);
unitcell.toCartesian (ptTemp, true);
vRot[i] = JU.V3.newV (ptTemp);
}
return vRot;
}, "~A,JS.UnitCell,JU.P3,JU.M3");
c$.fcoord = Clazz_defineMethod (c$, "fcoord", 
function (p) {
return JS.SymmetryOperation.fc (p.x) + " " + JS.SymmetryOperation.fc (p.y) + " " + JS.SymmetryOperation.fc (p.z);
}, "JU.T3");
c$.fc = Clazz_defineMethod (c$, "fc", 
 function (x) {
var xabs = Math.abs (x);
var m = (x < 0 ? "-" : "");
var x24 = Clazz_floatToInt (JS.SymmetryOperation.approxF (xabs * 24));
if (x24 / 24 == Clazz_floatToInt (x24 / 24)) return m + (Clazz_doubleToInt (x24 / 24));
if (x24 % 8 != 0) return m + JS.SymmetryOperation.twelfthsOf (x24 >> 1);
return (x24 == 0 ? "0" : x24 == 24 ? m + "1" : m + (Clazz_doubleToInt (x24 / 8)) + "/3");
}, "~N");
c$.approxF = Clazz_defineMethod (c$, "approxF", 
function (f) {
return JU.PT.approx (f, 100);
}, "~N");
c$.getXYZFromRsVs = Clazz_defineMethod (c$, "getXYZFromRsVs", 
function (rs, vs, is12ths) {
var ra = rs.getArray ();
var va = vs.getArray ();
var d = ra.length;
var s = "";
for (var i = 0; i < d; i++) {
s += ",";
for (var j = 0; j < d; j++) {
var r = ra[i][j];
if (r != 0) {
s += (r < 0 ? "-" : s.endsWith (",") ? "" : "+") + (Math.abs (r) == 1 ? "" : "" + Clazz_doubleToInt (Math.abs (r))) + "x" + (j + 1);
}}
s += JS.SymmetryOperation.xyzFraction12 (Clazz_doubleToInt (va[i][0] * (is12ths ? 1 : 12)), false, true);
}
return JU.PT.rep (s.substring (1), ",+", ",");
}, "JU.Matrix,JU.Matrix,~B");
Clazz_defineMethod (c$, "toString", 
function () {
return (this.rsvs == null ? Clazz_superCall (this, JS.SymmetryOperation, "toString", []) : Clazz_superCall (this, JS.SymmetryOperation, "toString", []) + " " + this.rsvs.toString ());
});
Clazz_defineMethod (c$, "getMagneticOp", 
function () {
return (this.magOp == 3.4028235E38 ? this.magOp = this.determinant3 () * this.timeReversal : this.magOp);
});
Clazz_defineMethod (c$, "setTimeReversal", 
function (magRev) {
this.timeReversal = magRev;
if (this.xyz.indexOf ("m") >= 0) this.xyz = this.xyz.substring (0, this.xyz.indexOf ("m"));
if (magRev != 0) {
this.xyz += (magRev == 1 ? ",m" : ",-m");
}}, "~N");
Clazz_defineMethod (c$, "getCentering", 
function () {
if (!this.isFinalized) this.doFinalize ();
if (this.centering == null && !this.unCentered) {
if (this.modDim == 0 && this.m00 == 1 && this.m11 == 1 && this.m22 == 1 && this.m01 == 0 && this.m02 == 0 && this.m10 == 0 && this.m12 == 0 && this.m20 == 0 && this.m21 == 0 && (this.m03 != 0 || this.m13 != 0 || this.m23 != 0)) {
this.isCenteringOp = true;
this.centering = JU.V3.new3 (this.m03, this.m13, this.m23);
} else {
this.unCentered = true;
this.centering = null;
}}return this.centering;
});
Clazz_defineMethod (c$, "fixMagneticXYZ", 
function (m, xyz, addMag) {
if (this.timeReversal == 0) return xyz;
var pt = xyz.indexOf ("m");
pt -= Clazz_doubleToInt ((3 - this.timeReversal) / 2);
xyz = (pt < 0 ? xyz : xyz.substring (0, pt));
if (!addMag) return xyz + (this.timeReversal > 0 ? " +1" : " -1");
var m2 = JU.M4.newM4 (m);
m2.m03 = m2.m13 = m2.m23 = 0;
if (this.getMagneticOp () < 0) m2.scale (-1);
xyz += "(" + JU.PT.rep (JU.PT.rep (JU.PT.rep (JS.SymmetryOperation.getXYZFromMatrix (m2, false, false, false), "x", "mx"), "y", "my"), "z", "mz") + ")";
return xyz;
}, "JU.M4,~S,~B");
Clazz_defineMethod (c$, "getInfo", 
function () {
if (this.info == null) {
this.info =  new java.util.Hashtable ();
this.info.put ("xyz", this.xyz);
if (this.centering != null) this.info.put ("centering", this.centering);
this.info.put ("index", Integer.$valueOf (this.index));
this.info.put ("isCenteringOp", Boolean.$valueOf (this.isCenteringOp));
if (this.linearRotTrans != null) this.info.put ("linearRotTrans", this.linearRotTrans);
this.info.put ("modulationDimension", Integer.$valueOf (this.modDim));
this.info.put ("matrix", JU.M4.newM4 (this));
if (this.magOp != 3.4028235E38) this.info.put ("magOp", Float.$valueOf (this.magOp));
this.info.put ("id", Integer.$valueOf (this.opId));
this.info.put ("timeReversal", Integer.$valueOf (this.timeReversal));
if (this.xyzOriginal != null) this.info.put ("xyzOriginal", this.xyzOriginal);
}return this.info;
});
Clazz_defineStatics (c$,
"atomTest", null,
"twelfths",  Clazz_newArray (-1, ["0", "1/12", "1/6", "1/4", "1/3", "5/12", "1/2", "7/12", "2/3", "3/4", "5/6", "11/12"]),
"fortyeigths",  Clazz_newArray (-1, ["0", "1/48", "1/24", "1/16", "1/12", "5/48", "1/8", "7/48", "1/6", "3/16", "5/24", "11/48", "1/4", "13/48", "7/24", "5/16", "1/3", "17/48", "3/8", "19/48", "5/12", "7/16", "11/24", "23/48", "1/2", "25/48", "13/24", "9/16", "7/12", "29/48", "15/24", "31/48", "2/3", "11/12", "17/16", "35/48", "3/4", "37/48", "19/24", "13/16", "5/6", "41/48", "7/8", "43/48", "11/12", "15/16", "23/24", "47/48"]));
c$.labelsXYZ = c$.prototype.labelsXYZ =  Clazz_newArray (-1, ["x", "y", "z"]);
c$.labelsXn = c$.prototype.labelsXn =  Clazz_newArray (-1, ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11", "x12", "x13"]);
c$.labelsXnSub = c$.prototype.labelsXnSub =  Clazz_newArray (-1, ["x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.SymmetryInfo", ["JU.PT", "JU.SimpleUnitCell"], function () {
c$ = Clazz_decorateAsClass (function () {
this.coordinatesAreFractional = false;
this.isMultiCell = false;
this.sgName = null;
this.symmetryOperations = null;
this.infoStr = null;
this.cellRange = null;
this.latticeType = "P";
this.intlTableNo = null;
Clazz_instantialize (this, arguments);
}, JS, "SymmetryInfo");
Clazz_makeConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "setSymmetryInfo", 
function (info, unitCellParams) {
this.cellRange = info.get ("unitCellRange");
this.sgName = info.get ("spaceGroup");
if (this.sgName == null || this.sgName === "") this.sgName = "spacegroup unspecified";
this.infoStr = "Spacegroup: " + this.sgName;
if ((this.latticeType = info.get ("latticeType")) == null) this.latticeType = "P";
this.intlTableNo = info.get ("intlTableNo");
var symmetryCount = info.containsKey ("symmetryCount") ? (info.get ("symmetryCount")).intValue () : 0;
this.symmetryOperations = info.remove ("symmetryOps");
if (this.symmetryOperations != null) {
var c = "";
var s = "\nNumber of symmetry operations: " + (symmetryCount == 0 ? 1 : symmetryCount) + "\nSymmetry Operations:";
for (var i = 0; i < symmetryCount; i++) {
var op = this.symmetryOperations[i];
s += "\n" + op.fixMagneticXYZ (op, op.xyz, true);
if (op.isCenteringOp) c += " (" + JU.PT.rep (JU.PT.replaceAllCharacters (op.xyz, "xyz", "0"), "0+", "") + ")";
}
if (c.length > 0) this.infoStr += "\nCentering: " + c;
this.infoStr += s;
this.infoStr += "\n";
}if (unitCellParams == null) unitCellParams = info.get ("unitCellParams");
if (!JU.SimpleUnitCell.isValid (unitCellParams)) return null;
this.coordinatesAreFractional = info.containsKey ("coordinatesAreFractional") ? (info.get ("coordinatesAreFractional")).booleanValue () : false;
this.isMultiCell = (this.coordinatesAreFractional && this.symmetryOperations != null);
return unitCellParams;
}, "java.util.Map,~A");
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.SimpleUnitCell", "JU.P3", "JV.JC"], "JS.UnitCell", ["java.lang.Double", "$.Float", "java.util.Hashtable", "JU.M3", "$.M4", "$.P4", "$.PT", "$.Quat", "$.T4", "$.V3", "J.api.Interface", "JS.Symmetry", "JU.BoxInfo", "$.Escape"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vertices = null;
this.fractionalOffset = null;
this.allFractionalRelative = false;
this.cartesianOffset = null;
this.unitCellMultiplier = null;
this.moreInfo = null;
this.name = "";
Clazz_instantialize (this, arguments);
}, JS, "UnitCell", JU.SimpleUnitCell, Cloneable);
Clazz_prepareFields (c$, function () {
this.cartesianOffset =  new JU.P3 ();
});
c$.fromOABC = Clazz_defineMethod (c$, "fromOABC", 
function (oabc, setRelative) {
var c =  new JS.UnitCell ();
if (oabc.length == 3) oabc =  Clazz_newArray (-1, [ new JU.P3 (), oabc[0], oabc[1], oabc[2]]);
var parameters =  Clazz_newFloatArray (-1, [-1, 0, 0, 0, 0, 0, oabc[1].x, oabc[1].y, oabc[1].z, oabc[2].x, oabc[2].y, oabc[2].z, oabc[3].x, oabc[3].y, oabc[3].z]);
c.init (parameters);
c.allFractionalRelative = setRelative;
c.initUnitcellVertices ();
c.setCartesianOffset (oabc[0]);
return c;
}, "~A,~B");
c$.fromParams = Clazz_defineMethod (c$, "fromParams", 
function (params, setRelative) {
var c =  new JS.UnitCell ();
c.init (params);
c.initUnitcellVertices ();
c.allFractionalRelative = setRelative;
return c;
}, "~A,~B");
Clazz_defineMethod (c$, "initOrientation", 
function (mat) {
if (mat == null) return;
var m =  new JU.M4 ();
m.setToM3 (mat);
this.matrixFractionalToCartesian.mul2 (m, this.matrixFractionalToCartesian);
this.matrixCartesianToFractional.setM4 (this.matrixFractionalToCartesian).invert ();
this.initUnitcellVertices ();
}, "JU.M3");
Clazz_defineMethod (c$, "toUnitCell", 
function (pt, offset) {
if (this.matrixCartesianToFractional == null) return;
if (offset == null) {
this.matrixCartesianToFractional.rotTrans (pt);
this.unitize (pt);
this.matrixFractionalToCartesian.rotTrans (pt);
} else {
this.matrixCtoFNoOffset.rotTrans (pt);
this.unitize (pt);
pt.add (offset);
this.matrixFtoCNoOffset.rotTrans (pt);
}}, "JU.T3,JU.T3");
Clazz_defineMethod (c$, "unitize", 
function (pt) {
switch (this.dimension) {
case 3:
pt.z = JS.UnitCell.toFractionalX (pt.z);
case 2:
pt.y = JS.UnitCell.toFractionalX (pt.y);
case 1:
pt.x = JS.UnitCell.toFractionalX (pt.x);
}
}, "JU.T3");
Clazz_defineMethod (c$, "reset", 
function () {
this.unitCellMultiplier = null;
this.setOffset (JU.P3.new3 (0, 0, 0));
});
Clazz_defineMethod (c$, "setOffset", 
function (pt) {
if (pt == null) return;
var pt4 = (Clazz_instanceOf (pt, JU.T4) ? pt : null);
var isCell555P4 = (pt4 != null && pt4.w > 999999);
if (pt4 != null ? pt4.w <= 0 || isCell555P4 : pt.x >= 100 || pt.y >= 100) {
this.unitCellMultiplier = (pt.z == 0 && pt.x == pt.y && !isCell555P4 ? null : isCell555P4 ? JU.P4.newPt (pt4) : JU.P3.newP (pt));
if (pt4 == null || pt4.w == 0 || isCell555P4) return;
}if (this.hasOffset () || pt.lengthSquared () > 0) {
this.fractionalOffset =  new JU.P3 ();
this.fractionalOffset.setT (pt);
}this.matrixCartesianToFractional.m03 = -pt.x;
this.matrixCartesianToFractional.m13 = -pt.y;
this.matrixCartesianToFractional.m23 = -pt.z;
this.cartesianOffset.setT (pt);
this.matrixFractionalToCartesian.m03 = 0;
this.matrixFractionalToCartesian.m13 = 0;
this.matrixFractionalToCartesian.m23 = 0;
this.matrixFractionalToCartesian.rotTrans (this.cartesianOffset);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFNoOffset.setM4 (this.matrixCartesianToFractional);
this.matrixFtoCNoOffset.setM4 (this.matrixFractionalToCartesian);
}}, "JU.T3");
Clazz_defineMethod (c$, "setCartesianOffset", 
 function (origin) {
this.cartesianOffset.setT (origin);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
var wasOffset = this.hasOffset ();
this.fractionalOffset =  new JU.P3 ();
this.fractionalOffset.setT (this.cartesianOffset);
this.matrixCartesianToFractional.m03 = 0;
this.matrixCartesianToFractional.m13 = 0;
this.matrixCartesianToFractional.m23 = 0;
this.matrixCartesianToFractional.rotTrans (this.fractionalOffset);
this.matrixCartesianToFractional.m03 = -this.fractionalOffset.x;
this.matrixCartesianToFractional.m13 = -this.fractionalOffset.y;
this.matrixCartesianToFractional.m23 = -this.fractionalOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFNoOffset.setM4 (this.matrixCartesianToFractional);
this.matrixFtoCNoOffset.setM4 (this.matrixFractionalToCartesian);
}if (!wasOffset && this.fractionalOffset.lengthSquared () == 0) this.fractionalOffset = null;
}, "JU.T3");
Clazz_defineMethod (c$, "getInfo", 
function () {
var info =  new java.util.Hashtable ();
info.put ("params", this.unitCellParams);
info.put ("vectors", this.getUnitCellVectors ());
info.put ("volume", Double.$valueOf (this.volume));
info.put ("matFtoC", this.matrixFractionalToCartesian);
info.put ("matCtoF", this.matrixCartesianToFractional);
return info;
});
Clazz_defineMethod (c$, "dumpInfo", 
function (isFull) {
return "a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", alpha=" + this.alpha + ", beta=" + this.beta + ", gamma=" + this.gamma + "\n" + JU.Escape.eAP (this.getUnitCellVectors ()) + "\nvolume=" + this.volume + (isFull ? "\nfractional to cartesian: " + this.matrixFractionalToCartesian + "\ncartesian to fractional: " + this.matrixCartesianToFractional : "");
}, "~B");
Clazz_defineMethod (c$, "getVertices", 
function () {
return this.vertices;
});
Clazz_defineMethod (c$, "getCartesianOffset", 
function () {
return this.cartesianOffset;
});
Clazz_defineMethod (c$, "getFractionalOffset", 
function () {
return this.fractionalOffset;
});
Clazz_defineMethod (c$, "getTensor", 
function (vwr, parBorU) {
var t = (J.api.Interface.getUtil ("Tensor", vwr, "file"));
if (parBorU[0] == 0 && parBorU[1] == 0 && parBorU[2] == 0) {
var f = parBorU[7];
var eigenValues =  Clazz_newFloatArray (-1, [f, f, f]);
return t.setFromEigenVectors (JS.UnitCell.unitVectors, eigenValues, "iso", "Uiso=" + f, null);
}t.parBorU = parBorU;
var Bcart =  Clazz_newDoubleArray (6, 0);
var ortepType = Clazz_floatToInt (parBorU[6]);
if (ortepType == 12) {
Bcart[0] = parBorU[0] * 19.739208802178716;
Bcart[1] = parBorU[1] * 19.739208802178716;
Bcart[2] = parBorU[2] * 19.739208802178716;
Bcart[3] = parBorU[3] * 19.739208802178716 * 2;
Bcart[4] = parBorU[4] * 19.739208802178716 * 2;
Bcart[5] = parBorU[5] * 19.739208802178716 * 2;
parBorU[7] = (parBorU[0] + parBorU[1] + parBorU[3]) / 3;
} else {
var isFractional = (ortepType == 4 || ortepType == 5 || ortepType == 8 || ortepType == 9);
var cc = 2 - (ortepType % 2);
var dd = (ortepType == 8 || ortepType == 9 || ortepType == 10 ? 19.739208802178716 : ortepType == 4 || ortepType == 5 ? 0.25 : ortepType == 2 || ortepType == 3 ? Math.log (2) : 1);
var B11 = parBorU[0] * dd * (isFractional ? this.a_ * this.a_ : 1);
var B22 = parBorU[1] * dd * (isFractional ? this.b_ * this.b_ : 1);
var B33 = parBorU[2] * dd * (isFractional ? this.c_ * this.c_ : 1);
var B12 = parBorU[3] * dd * (isFractional ? this.a_ * this.b_ : 1) * cc;
var B13 = parBorU[4] * dd * (isFractional ? this.a_ * this.c_ : 1) * cc;
var B23 = parBorU[5] * dd * (isFractional ? this.b_ * this.c_ : 1) * cc;
parBorU[7] = Math.pow (B11 / 19.739208802178716 / this.a_ / this.a_ * B22 / 19.739208802178716 / this.b_ / this.b_ * B33 / 19.739208802178716 / this.c_ / this.c_, 0.3333);
Bcart[0] = this.a * this.a * B11 + this.b * this.b * this.cosGamma * this.cosGamma * B22 + this.c * this.c * this.cosBeta * this.cosBeta * B33 + this.a * this.b * this.cosGamma * B12 + this.b * this.c * this.cosGamma * this.cosBeta * B23 + this.a * this.c * this.cosBeta * B13;
Bcart[1] = this.b * this.b * this.sinGamma * this.sinGamma * B22 + this.c * this.c * this.cA_ * this.cA_ * B33 + this.b * this.c * this.cA_ * this.sinGamma * B23;
Bcart[2] = this.c * this.c * this.cB_ * this.cB_ * B33;
Bcart[3] = 2 * this.b * this.b * this.cosGamma * this.sinGamma * B22 + 2 * this.c * this.c * this.cA_ * this.cosBeta * B33 + this.a * this.b * this.sinGamma * B12 + this.b * this.c * (this.cA_ * this.cosGamma + this.sinGamma * this.cosBeta) * B23 + this.a * this.c * this.cA_ * B13;
Bcart[4] = 2 * this.c * this.c * this.cB_ * this.cosBeta * B33 + this.b * this.c * this.cosGamma * B23 + this.a * this.c * this.cB_ * B13;
Bcart[5] = 2 * this.c * this.c * this.cA_ * this.cB_ * B33 + this.b * this.c * this.cB_ * this.sinGamma * B23;
}return t.setFromThermalEquation (Bcart, JU.Escape.eAF (parBorU));
}, "JV.Viewer,~A");
Clazz_defineMethod (c$, "getCanonicalCopy", 
function (scale, withOffset) {
var pts =  new Array (8);
var cell0 = null;
var cell1 = null;
if (withOffset && this.unitCellMultiplier != null) {
cell0 =  new JU.P3 ();
cell1 =  new JU.P3 ();
JU.SimpleUnitCell.ijkToPoint3f (Clazz_floatToInt (this.unitCellMultiplier.x), cell0, 0, 0);
JU.SimpleUnitCell.ijkToPoint3f (Clazz_floatToInt (this.unitCellMultiplier.y), cell1, 0, 0);
cell1.sub (cell0);
}for (var i = 0; i < 8; i++) {
var pt = pts[i] = JU.P3.newP (JU.BoxInfo.unitCubePoints[i]);
if (cell0 != null) {
scale *= (this.unitCellMultiplier.z == 0 ? 1 : this.unitCellMultiplier.z);
pts[i].add3 (cell0.x + cell1.x * pt.x, cell0.y + cell1.y * pt.y, cell0.z + cell1.z * pt.z);
}this.matrixFractionalToCartesian.rotTrans (pt);
if (!withOffset) pt.sub (this.cartesianOffset);
}
return JU.BoxInfo.getCanonicalCopy (pts, scale);
}, "~N,~B");
c$.toFractionalX = Clazz_defineMethod (c$, "toFractionalX", 
 function (x) {
x = (x - Math.floor (x));
if (x > 0.9999 || x < 0.0001) x = 0;
return x;
}, "~N");
Clazz_defineMethod (c$, "initUnitcellVertices", 
 function () {
if (this.matrixFractionalToCartesian == null) return;
this.matrixCtoFNoOffset = JU.M4.newM4 (this.matrixCartesianToFractional);
this.matrixFtoCNoOffset = JU.M4.newM4 (this.matrixFractionalToCartesian);
this.vertices =  new Array (8);
for (var i = 8; --i >= 0; ) this.vertices[i] = this.matrixFractionalToCartesian.rotTrans2 (JU.BoxInfo.unitCubePoints[i],  new JU.P3 ());

});
Clazz_defineMethod (c$, "checkDistance", 
function (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset) {
var p1 = JU.P3.newP (f1);
this.toCartesian (p1, true);
for (var i = -iRange; i <= iRange; i++) for (var j = -jRange; j <= jRange; j++) for (var k = -kRange; k <= kRange; k++) {
ptOffset.set (f2.x + i, f2.y + j, f2.z + k);
this.toCartesian (ptOffset, true);
var d = p1.distance (ptOffset);
if (dx > 0 ? Math.abs (d - distance) <= dx : d <= distance && d > 0.1) {
ptOffset.set (i, j, k);
return true;
}}


return false;
}, "JU.P3,JU.P3,~N,~N,~N,~N,~N,JU.P3");
Clazz_defineMethod (c$, "getUnitCellMultiplier", 
function () {
return this.unitCellMultiplier;
});
Clazz_defineMethod (c$, "getUnitCellVectors", 
function () {
var m = this.matrixFractionalToCartesian;
return  Clazz_newArray (-1, [JU.P3.newP (this.cartesianOffset), JU.P3.new3 (this.fix (m.m00), this.fix (m.m10), this.fix (m.m20)), JU.P3.new3 (this.fix (m.m01), this.fix (m.m11), this.fix (m.m21)), JU.P3.new3 (this.fix (m.m02), this.fix (m.m12), this.fix (m.m22))]);
});
Clazz_defineMethod (c$, "fix", 
 function (x) {
return (Math.abs (x) < 0.001 ? 0 : x);
}, "~N");
Clazz_defineMethod (c$, "isSameAs", 
function (uc) {
if (uc.unitCellParams.length != this.unitCellParams.length) return false;
for (var i = this.unitCellParams.length; --i >= 0; ) if (this.unitCellParams[i] != uc.unitCellParams[i] && !(Float.isNaN (this.unitCellParams[i]) && Float.isNaN (uc.unitCellParams[i]))) return false;

return (this.fractionalOffset == null ? !uc.hasOffset () : uc.fractionalOffset == null ? !this.hasOffset () : this.fractionalOffset.distanceSquared (uc.fractionalOffset) == 0);
}, "JS.UnitCell");
Clazz_defineMethod (c$, "hasOffset", 
function () {
return (this.fractionalOffset != null && this.fractionalOffset.lengthSquared () != 0);
});
Clazz_defineMethod (c$, "getState", 
function () {
var s = "";
if (this.fractionalOffset != null && this.fractionalOffset.lengthSquared () != 0) s += "  unitcell offset " + JU.Escape.eP (this.fractionalOffset) + ";\n";
if (this.unitCellMultiplier != null) s += "  unitcell range " + JU.SimpleUnitCell.escapeMultiplier (this.unitCellMultiplier) + ";\n";
return s;
});
Clazz_defineMethod (c$, "getQuaternionRotation", 
function (abc) {
var a = JU.V3.newVsub (this.vertices[4], this.vertices[0]);
var b = JU.V3.newVsub (this.vertices[2], this.vertices[0]);
var c = JU.V3.newVsub (this.vertices[1], this.vertices[0]);
var x =  new JU.V3 ();
var v =  new JU.V3 ();
var mul = (abc.charAt (0) == '-' ? -1 : 1);
if (mul < 0) abc = abc.substring (1);
var quadrant = 0;
if (abc.length == 2) {
quadrant = abc.charCodeAt (1) - 48;
abc = abc.substring (0, 1);
}var isEven = (quadrant % 2 == 0);
var axis = "abc".indexOf (abc);
var v1;
var v2;
switch (axis) {
case 0:
default:
v1 = a;
v2 = c;
if (quadrant > 0) {
if (mul > 0 == isEven) {
v2 = b;
v1.scale (-1);
}}break;
case 1:
v1 = b;
v2 = a;
if (quadrant > 0) {
if (mul > 0 == isEven) {
v2 = c;
v1.scale (-1);
}}break;
case 2:
v1 = c;
v2 = a;
if (quadrant > 0) {
quadrant = 5 - quadrant;
if (mul > 0 != isEven) {
v2 = b;
v1.scale (-1);
}}break;
}
switch (quadrant) {
case 0:
default:
case 1:
break;
case 2:
v1.scale (-1);
v2.scale (-1);
break;
case 3:
v2.scale (-1);
break;
case 4:
v1.scale (-1);
break;
}
x.cross (v1, v2);
v.cross (x, v1);
return JU.Quat.getQuaternionFrame (null, v, x).inv ();
}, "~S");
Clazz_defineMethod (c$, "getV0abc", 
function (def) {
if (Clazz_instanceOf (def, Array)) return def;
var m;
var isRev = false;
var pts =  new Array (4);
var pt = pts[0] = JU.V3.new3 (0, 0, 0);
pts[1] = JU.V3.new3 (1, 0, 0);
pts[2] = JU.V3.new3 (0, 1, 0);
pts[3] = JU.V3.new3 (0, 0, 1);
var m3 =  new JU.M3 ();
if (Clazz_instanceOf (def, String)) {
var sdef = def;
var strans = "0,0,0";
if (sdef.indexOf ("a=") == 0) return JU.SimpleUnitCell.setOabc (sdef, null, pts);
var ptc = sdef.indexOf (";");
if (ptc >= 0) {
strans = sdef.substring (ptc + 1);
sdef = sdef.substring (0, ptc);
}sdef += ";0,0,0";
isRev = sdef.startsWith ("!");
if (isRev) sdef = sdef.substring (1);
var symTemp =  new JS.Symmetry ();
symTemp.setSpaceGroup (false);
var i = symTemp.addSpaceGroupOperation ("=" + sdef, 0);
if (i < 0) return null;
m = symTemp.getSpaceGroupOperation (i);
(m).doFinalize ();
if (strans != null) {
var atrans = JU.PT.split (strans, ",");
var ftrans =  Clazz_newFloatArray (3, 0);
if (atrans.length == 3) for (var j = 0; j < 3; j++) {
var s = atrans[j];
var sfpt = s.indexOf ("/");
if (sfpt >= 0) {
ftrans[j] = JU.PT.parseFloat (s.substring (0, sfpt)) / JU.PT.parseFloat (s.substring (sfpt + 1));
} else {
ftrans[j] = JU.PT.parseFloat (s);
}}
var ptrans = JU.P3.new3 (ftrans[0], ftrans[1], ftrans[2]);
m.setTranslation (ptrans);
}} else if (Clazz_instanceOf (def, JU.M3)) {
m = JU.M4.newMV (def,  new JU.P3 ());
} else if (Clazz_instanceOf (def, JU.M4)) {
m = def;
} else {
m = (def)[0];
m.getRotationScale (m3);
this.toCartesian (pt, false);
m.rotTrans (pt);
for (var i = 1; i < 4; i++) {
this.toCartesian (pts[i], true);
m3.rotate (pts[i]);
}
return pts;
}m.getRotationScale (m3);
m.getTranslation (pt);
if (isRev) {
m3.invert ();
m3.transpose ();
m3.rotate (pt);
pt.scale (-1);
} else {
m3.transpose ();
}this.toCartesian (pt, false);
for (var i = 1; i < 4; i++) {
m3.rotate (pts[i]);
this.toCartesian (pts[i], true);
}
return pts;
}, "~O");
Clazz_defineMethod (c$, "toFromPrimitive", 
function (toPrimitive, type, uc, primitiveToCrystal) {
var offset = uc.length - 3;
var mf = null;
if (type == 'r' || primitiveToCrystal == null) {
switch (type) {
default:
return false;
case 'r':
JU.SimpleUnitCell.getReciprocal (uc, uc, 1);
return true;
case 'P':
toPrimitive = true;
mf = JU.M3.newA9 ( Clazz_newFloatArray (-1, [1, 0, 0, 0, 1, 0, 0, 0, 1]));
break;
case 'A':
mf = JU.M3.newA9 ( Clazz_newFloatArray (-1, [1, 0, 0, 0, 0.5, 0.5, 0, -0.5, 0.5]));
break;
case 'B':
mf = JU.M3.newA9 ( Clazz_newFloatArray (-1, [0.5, 0, 0.5, 0, 1, 0, -0.5, 0, 0.5]));
break;
case 'C':
mf = JU.M3.newA9 ( Clazz_newFloatArray (-1, [0.5, 0.5, 0, -0.5, 0.5, 0, 0, 0, 1]));
break;
case 'R':
mf = JU.M3.newA9 ( Clazz_newFloatArray (-1, [0.6666667, -0.33333334, -0.33333334, 0.33333334, 0.33333334, -0.6666667, 0.33333334, 0.33333334, 0.33333334]));
break;
case 'I':
mf = JU.M3.newA9 ( Clazz_newFloatArray (-1, [-0.5, .5, .5, .5, -0.5, .5, .5, .5, -0.5]));
break;
case 'F':
mf = JU.M3.newA9 ( Clazz_newFloatArray (-1, [0, 0.5, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 0]));
break;
}
if (!toPrimitive) mf.invert ();
} else {
mf = JU.M3.newM3 (primitiveToCrystal);
if (toPrimitive) mf.invert ();
}for (var i = uc.length; --i >= offset; ) {
var p = uc[i];
this.toFractional (p, false);
mf.rotate (p);
this.toCartesian (p, false);
}
return true;
}, "~B,~S,~A,JU.M3");
Clazz_defineMethod (c$, "getConventionalUnitCell", 
function (latticeType, primitiveToCrystal) {
var oabc = this.getUnitCellVectors ();
if (!latticeType.equals ("P") || primitiveToCrystal != null) this.toFromPrimitive (false, latticeType.charAt (0), oabc, primitiveToCrystal);
return oabc;
}, "~S,JU.M3");
c$.cloneUnitCell = Clazz_defineMethod (c$, "cloneUnitCell", 
function (uc) {
var ucnew = null;
try {
ucnew = uc.clone ();
} catch (e) {
if (Clazz_exceptionOf (e, CloneNotSupportedException)) {
} else {
throw e;
}
}
return ucnew;
}, "JS.UnitCell");
Clazz_defineStatics (c$,
"twoP2", 19.739208802178716);
c$.unitVectors = c$.prototype.unitVectors =  Clazz_newArray (-1, [JV.JC.axisX, JV.JC.axisY, JV.JC.axisZ]);
});
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
