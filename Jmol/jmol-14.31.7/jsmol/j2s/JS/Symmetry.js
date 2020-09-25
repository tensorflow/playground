Clazz.declarePackage ("JS");
Clazz.load (["J.api.SymmetryInterface"], "JS.Symmetry", ["JU.BS", "$.Lst", "$.P3", "J.api.Interface", "J.bspt.Bspt", "JS.PointGroup", "$.SpaceGroup", "$.SymmetryInfo", "$.SymmetryOperation", "$.UnitCell", "JU.Escape", "$.Logger", "$.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pointGroup = null;
this.spaceGroup = null;
this.symmetryInfo = null;
this.unitCell = null;
this.$isBio = false;
this.desc = null;
this.cip = null;
Clazz.instantialize (this, arguments);
}, JS, "Symmetry", null, J.api.SymmetryInterface);
Clazz.overrideMethod (c$, "isBio", 
function () {
return this.$isBio;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "setPointGroup", 
function (siLast, center, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance, localEnvOnly) {
this.pointGroup = JS.PointGroup.getPointGroup (siLast == null ? null : (siLast).pointGroup, center, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance, localEnvOnly);
return this;
}, "J.api.SymmetryInterface,JU.T3,~A,JU.BS,~B,~N,~N,~B");
Clazz.overrideMethod (c$, "getPointGroupName", 
function () {
return this.pointGroup.getName ();
});
Clazz.overrideMethod (c$, "getPointGroupInfo", 
function (modelIndex, drawID, asInfo, type, index, scale) {
if (drawID == null && !asInfo && this.pointGroup.textInfo != null) return this.pointGroup.textInfo;
 else if (drawID == null && this.pointGroup.isDrawType (type, index, scale)) return this.pointGroup.drawInfo;
 else if (asInfo && this.pointGroup.info != null) return this.pointGroup.info;
return this.pointGroup.getInfo (modelIndex, drawID, asInfo, type, index, scale);
}, "~N,~S,~B,~S,~N,~N");
Clazz.overrideMethod (c$, "setSpaceGroup", 
function (doNormalize) {
if (this.spaceGroup == null) this.spaceGroup = JS.SpaceGroup.getNull (true, doNormalize, false);
}, "~B");
Clazz.overrideMethod (c$, "addSpaceGroupOperation", 
function (xyz, opId) {
return this.spaceGroup.addSymmetry (xyz, opId, false);
}, "~S,~N");
Clazz.overrideMethod (c$, "addBioMoleculeOperation", 
function (mat, isReverse) {
this.$isBio = this.spaceGroup.isBio = true;
return this.spaceGroup.addSymmetry ((isReverse ? "!" : "") + "[[bio" + mat, 0, false);
}, "JU.M4,~B");
Clazz.overrideMethod (c$, "setLattice", 
function (latt) {
this.spaceGroup.setLatticeParam (latt);
}, "~N");
Clazz.defineMethod (c$, "getSpaceGroup", 
function () {
return this.spaceGroup;
});
Clazz.overrideMethod (c$, "setSpaceGroupFrom", 
function (symmetry) {
this.spaceGroup = symmetry.getSpaceGroup ();
}, "J.api.SymmetryInterface");
Clazz.overrideMethod (c$, "createSpaceGroup", 
function (desiredSpaceGroupIndex, name, data, modDim) {
this.spaceGroup = JS.SpaceGroup.createSpaceGroup (desiredSpaceGroupIndex, name, data, modDim);
if (this.spaceGroup != null && JU.Logger.debugging) JU.Logger.debug ("using generated space group " + this.spaceGroup.dumpInfo ());
return this.spaceGroup != null;
}, "~N,~S,~O,~N");
Clazz.overrideMethod (c$, "getSpaceGroupInfoObj", 
function (name, cellInfo, isFull) {
return JS.SpaceGroup.getInfo (this.spaceGroup, name, cellInfo, isFull);
}, "~S,J.api.SymmetryInterface,~B");
Clazz.overrideMethod (c$, "getLatticeDesignation", 
function () {
return this.spaceGroup.getLatticeDesignation ();
});
Clazz.overrideMethod (c$, "setFinalOperations", 
function (name, atoms, iAtomFirst, noSymmetryCount, doNormalize, filterSymop) {
if (name != null && (name.startsWith ("bio") || name.indexOf (" *(") >= 0)) this.spaceGroup.name = name;
if (filterSymop != null) {
var lst =  new JU.Lst ();
lst.addLast (this.spaceGroup.operations[0]);
for (var i = 1; i < this.spaceGroup.operationCount; i++) if (filterSymop.contains (" " + (i + 1) + " ")) lst.addLast (this.spaceGroup.operations[i]);

this.spaceGroup = JS.SpaceGroup.createSpaceGroup (-1, name + " *(" + filterSymop.trim () + ")", lst, -1);
}this.spaceGroup.setFinalOperations (atoms, iAtomFirst, noSymmetryCount, doNormalize);
}, "~S,~A,~N,~N,~B,~S");
Clazz.overrideMethod (c$, "getSpaceGroupOperation", 
function (i) {
return (this.spaceGroup == null || this.spaceGroup.operations == null || i >= this.spaceGroup.operations.length ? null : this.spaceGroup.finalOperations == null ? this.spaceGroup.operations[i] : this.spaceGroup.finalOperations[i]);
}, "~N");
Clazz.overrideMethod (c$, "getSpaceGroupXyz", 
function (i, doNormalize) {
return this.spaceGroup.getXyz (i, doNormalize);
}, "~N,~B");
Clazz.overrideMethod (c$, "newSpaceGroupPoint", 
function (i, atom1, atom2, transX, transY, transZ, o) {
if (o == null && this.spaceGroup.finalOperations == null) {
var op = this.spaceGroup.operations[i];
if (!op.isFinalized) op.doFinalize ();
JS.SymmetryOperation.newPoint (op, atom1, atom2, transX, transY, transZ);
return;
}JS.SymmetryOperation.newPoint ((o == null ? this.spaceGroup.finalOperations[i] : o), atom1, atom2, transX, transY, transZ);
}, "~N,JU.P3,JU.P3,~N,~N,~N,JU.M4");
Clazz.overrideMethod (c$, "rotateAxes", 
function (iop, axes, ptTemp, mTemp) {
return (iop == 0 ? axes : this.spaceGroup.finalOperations[iop].rotateAxes (axes, this.unitCell, ptTemp, mTemp));
}, "~N,~A,JU.P3,JU.M3");
Clazz.overrideMethod (c$, "getSpaceGroupOperationCode", 
function (iOp) {
return this.spaceGroup.operations[iOp].subsystemCode;
}, "~N");
Clazz.overrideMethod (c$, "setTimeReversal", 
function (op, val) {
this.spaceGroup.operations[op].setTimeReversal (val);
}, "~N,~N");
Clazz.overrideMethod (c$, "getSpinOp", 
function (op) {
return this.spaceGroup.operations[op].getMagneticOp ();
}, "~N");
Clazz.overrideMethod (c$, "addLatticeVectors", 
function (lattvecs) {
return this.spaceGroup.addLatticeVectors (lattvecs);
}, "JU.Lst");
Clazz.overrideMethod (c$, "getLatticeOp", 
function () {
return this.spaceGroup.latticeOp;
});
Clazz.overrideMethod (c$, "getOperationRsVs", 
function (iop) {
return (this.spaceGroup.finalOperations == null ? this.spaceGroup.operations : this.spaceGroup.finalOperations)[iop].rsvs;
}, "~N");
Clazz.overrideMethod (c$, "getSiteMultiplicity", 
function (pt) {
return this.spaceGroup.getSiteMultiplicity (pt, this.unitCell);
}, "JU.P3");
Clazz.overrideMethod (c$, "addOp", 
function (code, rs, vs, sigma) {
this.spaceGroup.isSSG = true;
var s = JS.SymmetryOperation.getXYZFromRsVs (rs, vs, false);
var i = this.spaceGroup.addSymmetry (s, -1, true);
this.spaceGroup.operations[i].setSigma (code, sigma);
return s;
}, "~S,JU.Matrix,JU.Matrix,JU.Matrix");
Clazz.overrideMethod (c$, "getMatrixFromString", 
function (xyz, rotTransMatrix, allowScaling, modDim) {
return JS.SymmetryOperation.getMatrixFromString (null, xyz, rotTransMatrix, allowScaling);
}, "~S,~A,~B,~N");
Clazz.overrideMethod (c$, "getSpaceGroupName", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.sgName : this.spaceGroup != null ? this.spaceGroup.getName () : this.unitCell != null && this.unitCell.name.length > 0 ? "cell=" + this.unitCell.name : "");
});
Clazz.overrideMethod (c$, "setSpaceGroupName", 
function (name) {
if (this.spaceGroup != null) this.spaceGroup.setName (name);
}, "~S");
Clazz.overrideMethod (c$, "getSpaceGroupOperationCount", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.symmetryOperations.length : this.spaceGroup != null && this.spaceGroup.finalOperations != null ? this.spaceGroup.finalOperations.length : 0);
});
Clazz.overrideMethod (c$, "getLatticeType", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.latticeType : this.spaceGroup == null ? "P" : this.spaceGroup.latticeType);
});
Clazz.overrideMethod (c$, "setLatticeType", 
function (type) {
if (this.spaceGroup != null) this.spaceGroup.latticeType = type;
}, "~S");
Clazz.overrideMethod (c$, "getIntTableNumber", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.intlTableNo : this.spaceGroup == null ? null : this.spaceGroup.intlTableNumber);
});
Clazz.overrideMethod (c$, "getCoordinatesAreFractional", 
function () {
return this.symmetryInfo == null || this.symmetryInfo.coordinatesAreFractional;
});
Clazz.overrideMethod (c$, "getCellRange", 
function () {
return this.symmetryInfo == null ? null : this.symmetryInfo.cellRange;
});
Clazz.overrideMethod (c$, "getSymmetryInfoStr", 
function () {
return (this.symmetryInfo == null ? "" : this.symmetryInfo.infoStr);
});
Clazz.overrideMethod (c$, "getSymmetryOperations", 
function () {
if (this.symmetryInfo != null) return this.symmetryInfo.symmetryOperations;
if (this.spaceGroup == null) this.spaceGroup = JS.SpaceGroup.getNull (true, false, true);
return this.spaceGroup.finalOperations;
});
Clazz.overrideMethod (c$, "isSimple", 
function () {
return (this.symmetryInfo == null || this.symmetryInfo.symmetryOperations == null);
});
Clazz.overrideMethod (c$, "setSymmetryInfo", 
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
Clazz.overrideMethod (c$, "haveUnitCell", 
function () {
return (this.unitCell != null);
});
Clazz.overrideMethod (c$, "checkUnitCell", 
function (uc, cell, ptTemp, isAbsolute) {
uc.toFractional (ptTemp, isAbsolute);
return (ptTemp.x >= cell.x - 1 - 0.02 && ptTemp.x <= cell.x + 0.02 && ptTemp.y >= cell.y - 1 - 0.02 && ptTemp.y <= cell.y + 0.02 && ptTemp.z >= cell.z - 1 - 0.02 && ptTemp.z <= cell.z + 0.02);
}, "J.api.SymmetryInterface,JU.P3,JU.P3,~B");
Clazz.defineMethod (c$, "setUnitCell", 
function (unitCellParams, setRelative) {
this.unitCell = JS.UnitCell.fromParams (unitCellParams, setRelative);
}, "~A,~B");
Clazz.overrideMethod (c$, "unitCellEquals", 
function (uc2) {
return ((uc2)).unitCell.isSameAs (this.unitCell);
}, "J.api.SymmetryInterface");
Clazz.overrideMethod (c$, "getUnitCellState", 
function () {
return (this.unitCell == null ? "" : this.unitCell.getState ());
});
Clazz.overrideMethod (c$, "getMoreInfo", 
function () {
return this.unitCell.moreInfo;
});
Clazz.defineMethod (c$, "getUnitsymmetryInfo", 
function () {
return this.unitCell.dumpInfo (false);
});
Clazz.overrideMethod (c$, "initializeOrientation", 
function (mat) {
this.unitCell.initOrientation (mat);
}, "JU.M3");
Clazz.overrideMethod (c$, "unitize", 
function (ptFrac) {
this.unitCell.unitize (ptFrac);
}, "JU.T3");
Clazz.overrideMethod (c$, "toUnitCell", 
function (pt, offset) {
this.unitCell.toUnitCell (pt, offset);
}, "JU.T3,JU.T3");
Clazz.overrideMethod (c$, "toSupercell", 
function (fpt) {
return this.unitCell.toSupercell (fpt);
}, "JU.P3");
Clazz.defineMethod (c$, "toFractional", 
function (pt, ignoreOffset) {
if (!this.$isBio) this.unitCell.toFractional (pt, ignoreOffset);
}, "JU.T3,~B");
Clazz.overrideMethod (c$, "toFractionalM", 
function (m) {
if (!this.$isBio) this.unitCell.toFractionalM (m);
}, "JU.M4");
Clazz.overrideMethod (c$, "toCartesian", 
function (fpt, ignoreOffset) {
if (!this.$isBio) this.unitCell.toCartesian (fpt, ignoreOffset);
}, "JU.T3,~B");
Clazz.overrideMethod (c$, "getUnitCellParams", 
function () {
return this.unitCell.getUnitCellParams ();
});
Clazz.overrideMethod (c$, "getUnitCellAsArray", 
function (vectorsOnly) {
return this.unitCell.getUnitCellAsArray (vectorsOnly);
}, "~B");
Clazz.overrideMethod (c$, "getTensor", 
function (vwr, parBorU) {
if (parBorU == null) return null;
if (this.unitCell == null) this.unitCell = JS.UnitCell.fromParams ( Clazz.newFloatArray (-1, [1, 1, 1, 90, 90, 90]), true);
return this.unitCell.getTensor (vwr, parBorU);
}, "JV.Viewer,~A");
Clazz.overrideMethod (c$, "getUnitCellVerticesNoOffset", 
function () {
return this.unitCell.getVertices ();
});
Clazz.overrideMethod (c$, "getCartesianOffset", 
function () {
return this.unitCell.getCartesianOffset ();
});
Clazz.overrideMethod (c$, "getFractionalOffset", 
function () {
return this.unitCell.getFractionalOffset ();
});
Clazz.overrideMethod (c$, "setOffsetPt", 
function (pt) {
this.unitCell.setOffset (pt);
}, "JU.T3");
Clazz.overrideMethod (c$, "setOffset", 
function (nnn) {
var pt =  new JU.P3 ();
JU.SimpleUnitCell.ijkToPoint3f (nnn, pt, 0, 0);
this.unitCell.setOffset (pt);
}, "~N");
Clazz.overrideMethod (c$, "getUnitCellMultiplier", 
function () {
return this.unitCell.getUnitCellMultiplier ();
});
Clazz.overrideMethod (c$, "getCanonicalCopy", 
function (scale, withOffset) {
return this.unitCell.getCanonicalCopy (scale, withOffset);
}, "~N,~B");
Clazz.overrideMethod (c$, "getUnitCellInfoType", 
function (infoType) {
return this.unitCell.getInfo (infoType);
}, "~N");
Clazz.overrideMethod (c$, "getUnitCellInfo", 
function () {
return this.unitCell.dumpInfo (false);
});
Clazz.overrideMethod (c$, "isSlab", 
function () {
return this.unitCell.isSlab ();
});
Clazz.overrideMethod (c$, "isPolymer", 
function () {
return this.unitCell.isPolymer ();
});
Clazz.overrideMethod (c$, "checkDistance", 
function (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset) {
return this.unitCell.checkDistance (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset);
}, "JU.P3,JU.P3,~N,~N,~N,~N,~N,JU.P3");
Clazz.overrideMethod (c$, "getUnitCellVectors", 
function () {
return this.unitCell.getUnitCellVectors ();
});
Clazz.overrideMethod (c$, "getUnitCell", 
function (oabc, setRelative, name) {
if (oabc == null) return null;
this.unitCell = JS.UnitCell.fromOABC (oabc, setRelative);
if (name != null) this.unitCell.name = name;
return this;
}, "~A,~B,~S");
Clazz.overrideMethod (c$, "isSupercell", 
function () {
return this.unitCell.isSupercell ();
});
Clazz.overrideMethod (c$, "notInCentroid", 
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
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "JM.ModelSet,JU.BS,~A");
Clazz.defineMethod (c$, "isNotCentroid", 
 function (center, n, minmax, centroidPacked) {
center.scale (1 / n);
this.toFractional (center, false);
if (centroidPacked) return (center.x + 0.000005 <= minmax[0] || center.x - 0.000005 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y - 0.000005 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z - 0.000005 > minmax[5]);
return (center.x + 0.000005 <= minmax[0] || center.x + 0.00005 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y + 0.00005 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z + 0.00005 > minmax[5]);
}, "JU.P3,~N,~A,~B");
Clazz.defineMethod (c$, "getDesc", 
 function (modelSet) {
return (this.desc == null ? (this.desc = (J.api.Interface.getInterface ("JS.SymmetryDesc", modelSet.vwr, "eval"))) : this.desc).set (modelSet);
}, "JM.ModelSet");
Clazz.overrideMethod (c$, "getSymmetryInfoAtom", 
function (modelSet, iatom, xyz, op, pt, pt2, id, type, scaleFactor, nth, options) {
return this.getDesc (modelSet).getSymopInfo (iatom, xyz, op, pt, pt2, id, type, scaleFactor, nth, options);
}, "JM.ModelSet,~N,~S,~N,JU.P3,JU.P3,~S,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getSpaceGroupInfo", 
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
Clazz.overrideMethod (c$, "fcoord", 
function (p) {
return JS.SymmetryOperation.fcoord (p);
}, "JU.T3");
Clazz.overrideMethod (c$, "getV0abc", 
function (def) {
return (this.unitCell == null ? null : this.unitCell.getV0abc (def));
}, "~O");
Clazz.overrideMethod (c$, "getQuaternionRotation", 
function (abc) {
return (this.unitCell == null ? null : this.unitCell.getQuaternionRotation (abc));
}, "~S");
Clazz.overrideMethod (c$, "getFractionalOrigin", 
function () {
return this.unitCell.getFractionalOrigin ();
});
Clazz.overrideMethod (c$, "getState", 
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
Clazz.overrideMethod (c$, "getIterator", 
function (vwr, atom, atoms, bsAtoms, radius) {
return (J.api.Interface.getInterface ("JS.UnitCellIterator", vwr, "script")).set (this, atom, atoms, bsAtoms, radius);
}, "JV.Viewer,JM.Atom,~A,JU.BS,~N");
Clazz.overrideMethod (c$, "toFromPrimitive", 
function (toPrimitive, type, oabc, primitiveToCrystal) {
if (this.unitCell == null) this.unitCell = JS.UnitCell.fromOABC (oabc, false);
return this.unitCell.toFromPrimitive (toPrimitive, type, oabc, primitiveToCrystal);
}, "~B,~S,~A,JU.M3");
Clazz.overrideMethod (c$, "generateCrystalClass", 
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
Clazz.overrideMethod (c$, "calculateCIPChiralityForAtoms", 
function (vwr, bsAtoms) {
vwr.setCursor (3);
var cip = this.getCIPChirality (vwr);
var dataClass = (vwr.getBoolean (603979960) ? "CIPData" : "CIPDataTracker");
var data = (J.api.Interface.getInterface ("JS." + dataClass, vwr, "script")).set (vwr, bsAtoms);
data.setRule6Full (vwr.getBoolean (603979823));
cip.getChiralityForAtoms (data);
vwr.setCursor (0);
}, "JV.Viewer,JU.BS");
Clazz.overrideMethod (c$, "calculateCIPChiralityForSmiles", 
function (vwr, smiles) {
vwr.setCursor (3);
var cip = this.getCIPChirality (vwr);
var data = (J.api.Interface.getInterface ("JS.CIPDataSmiles", vwr, "script")).setAtomsForSmiles (vwr, smiles);
cip.getChiralityForAtoms (data);
vwr.setCursor (0);
return data.getSmilesChiralityArray ();
}, "JV.Viewer,~S");
Clazz.defineMethod (c$, "getCIPChirality", 
 function (vwr) {
return (this.cip == null ? (this.cip = (J.api.Interface.getInterface ("JS.CIPChirality", vwr, "script"))) : this.cip);
}, "JV.Viewer");
Clazz.overrideMethod (c$, "getConventionalUnitCell", 
function (latticeType, primitiveToCrystal) {
return (this.unitCell == null || latticeType == null ? null : this.unitCell.getConventionalUnitCell (latticeType, primitiveToCrystal));
}, "~S,JU.M3");
Clazz.overrideMethod (c$, "getUnitCellInfoMap", 
function () {
return (this.unitCell == null ? null : this.unitCell.getInfo ());
});
Clazz.defineMethod (c$, "setUnitCell", 
function (uc) {
this.unitCell = JS.UnitCell.cloneUnitCell (uc.unitCell);
}, "JS.Symmetry");
});
