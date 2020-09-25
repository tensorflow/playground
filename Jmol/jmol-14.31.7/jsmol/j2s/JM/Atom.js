Clazz.declarePackage ("JM");
Clazz.load (["JU.Node", "$.Point3fi", "J.c.PAL"], "JM.Atom", ["java.lang.Float", "JU.BS", "$.CU", "$.P3", "$.PT", "$.SB", "J.atomdata.RadiusData", "J.c.VDW", "JM.Group", "JU.C", "$.Elements", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.altloc = '\0';
this.atomID = 0;
this.atomSite = 0;
this.group = null;
this.userDefinedVanDerWaalRadius = 0;
this.valence = 0;
this.atomicAndIsotopeNumber = 0;
this.atomSymmetry = null;
this.formalChargeAndFlags = 0;
this.madAtom = 0;
this.colixAtom = 0;
this.paletteID = 0;
this.bonds = null;
this.nBondsDisplayed = 0;
this.nBackbonesDisplayed = 0;
this.clickabilityFlags = 0;
this.shapeVisibilityFlags = 0;
Clazz.instantialize (this, arguments);
}, JM, "Atom", JU.Point3fi, JU.Node);
Clazz.prepareFields (c$, function () {
this.paletteID = J.c.PAL.CPK.id;
});
Clazz.overrideMethod (c$, "setAtom", 
function (modelIndex, atomIndex, xyz, radius, atomSymmetry, atomSite, atomicAndIsotopeNumber, formalCharge, isHetero) {
this.mi = modelIndex;
this.atomSymmetry = atomSymmetry;
this.atomSite = atomSite;
this.i = atomIndex;
this.atomicAndIsotopeNumber = atomicAndIsotopeNumber;
if (isHetero) this.formalChargeAndFlags = 2;
if (formalCharge != 0 && formalCharge != -2147483648) this.setFormalCharge (formalCharge);
this.userDefinedVanDerWaalRadius = radius;
this.setT (xyz);
return this;
}, "~N,~N,JU.P3,~N,JU.BS,~N,~N,~N,~B");
Clazz.defineMethod (c$, "setShapeVisibility", 
function (flag, isVisible) {
if (isVisible) this.shapeVisibilityFlags |= flag;
 else this.shapeVisibilityFlags &= ~flag;
}, "~N,~B");
Clazz.defineMethod (c$, "isCovalentlyBonded", 
function (atomOther) {
if (this.bonds != null) for (var i = this.bonds.length; --i >= 0; ) if (this.bonds[i].isCovalent () && this.bonds[i].getOtherAtom (this) === atomOther) return true;

return false;
}, "JM.Atom");
Clazz.defineMethod (c$, "isBonded", 
function (atomOther) {
if (this.bonds != null) for (var i = this.bonds.length; --i >= 0; ) if (this.bonds[i].getOtherAtom (this) === atomOther) return true;

return false;
}, "JM.Atom");
Clazz.defineMethod (c$, "getBond", 
function (atomOther) {
if (this.bonds != null) for (var i = this.bonds.length; --i >= 0; ) if (this.bonds[i].getOtherAtom (atomOther) != null) return this.bonds[i];

return null;
}, "JM.Atom");
Clazz.defineMethod (c$, "addDisplayedBond", 
function (stickVisibilityFlag, isVisible) {
this.nBondsDisplayed += (isVisible ? 1 : -1);
this.setShapeVisibility (stickVisibilityFlag, (this.nBondsDisplayed > 0));
}, "~N,~B");
Clazz.defineMethod (c$, "deleteBond", 
function (bond) {
if (this.bonds != null) for (var i = this.bonds.length; --i >= 0; ) if (this.bonds[i] === bond) {
this.deleteBondAt (i);
return;
}
}, "JM.Bond");
Clazz.defineMethod (c$, "deleteBondAt", 
 function (i) {
this.setCIPChirality (0);
var newLength = this.bonds.length - 1;
if (newLength == 0) {
this.bonds = null;
return;
}var bondsNew =  new Array (newLength);
var j = 0;
for (; j < i; ++j) bondsNew[j] = this.bonds[j];

for (; j < newLength; ++j) bondsNew[j] = this.bonds[j + 1];

this.bonds = bondsNew;
}, "~N");
Clazz.overrideMethod (c$, "getBondedAtomIndex", 
function (bondIndex) {
return this.bonds[bondIndex].getOtherAtom (this).i;
}, "~N");
Clazz.defineMethod (c$, "setMadAtom", 
function (vwr, rd) {
this.madAtom = this.calculateMad (vwr, rd);
}, "JV.Viewer,J.atomdata.RadiusData");
Clazz.defineMethod (c$, "calculateMad", 
function (vwr, rd) {
if (rd == null) return 0;
var f = rd.value;
if (f == 0) return 0;
switch (rd.factorType) {
case J.atomdata.RadiusData.EnumType.SCREEN:
return Clazz.floatToShort (f);
case J.atomdata.RadiusData.EnumType.FACTOR:
case J.atomdata.RadiusData.EnumType.OFFSET:
var r = 0;
switch (rd.vdwType) {
case J.c.VDW.TEMP:
var tmax = vwr.ms.getBfactor100Hi ();
r = (tmax > 0 ? this.getBfactor100 () / tmax : 0);
break;
case J.c.VDW.HYDRO:
r = Math.abs (this.getHydrophobicity ());
break;
case J.c.VDW.BONDING:
r = this.getBondingRadius ();
break;
case J.c.VDW.ADPMIN:
case J.c.VDW.ADPMAX:
r = this.getADPMinMax (rd.vdwType === J.c.VDW.ADPMAX);
break;
default:
r = this.getVanderwaalsRadiusFloat (vwr, rd.vdwType);
}
if (rd.factorType === J.atomdata.RadiusData.EnumType.FACTOR) f *= r;
 else f += r;
break;
case J.atomdata.RadiusData.EnumType.ABSOLUTE:
if (f == 16.1) return JM.Atom.MAD_GLOBAL;
break;
}
var mad = Clazz.floatToShort (f < 0 ? f : f * 2000);
if (mad < 0 && f > 0) mad = 0;
return mad;
}, "JV.Viewer,J.atomdata.RadiusData");
Clazz.defineMethod (c$, "getADPMinMax", 
function (isMax) {
var tensors = this.getTensors ();
if (tensors == null) return 0;
var t = tensors[0];
if (t == null || t.iType != 1) return 0;
if (this.group.chain.model.ms.isModulated (this.i) && t.isUnmodulated) t = tensors[1];
return t.getFactoredValue (isMax ? 2 : 1);
}, "~B");
Clazz.defineMethod (c$, "getTensors", 
function () {
return this.group.chain.model.ms.getAtomTensorList (this.i);
});
Clazz.defineMethod (c$, "getRasMolRadius", 
function () {
return Math.abs (Clazz.doubleToInt (this.madAtom / 8));
});
Clazz.overrideMethod (c$, "getEdges", 
function () {
return (this.bonds == null ?  new Array (0) : this.bonds);
});
Clazz.overrideMethod (c$, "getBondCount", 
function () {
return (this.bonds == null ? 0 : this.bonds.length);
});
Clazz.defineMethod (c$, "setTranslucent", 
function (isTranslucent, translucentLevel) {
this.colixAtom = JU.C.getColixTranslucent3 (this.colixAtom, isTranslucent, translucentLevel);
}, "~B,~N");
Clazz.overrideMethod (c$, "getElementNumber", 
function () {
return JU.Elements.getElementNumber (this.atomicAndIsotopeNumber);
});
Clazz.overrideMethod (c$, "getIsotopeNumber", 
function () {
return JU.Elements.getIsotopeNumber (this.atomicAndIsotopeNumber);
});
Clazz.overrideMethod (c$, "getAtomicAndIsotopeNumber", 
function () {
return this.atomicAndIsotopeNumber;
});
Clazz.defineMethod (c$, "setAtomicAndIsotopeNumber", 
function (n) {
if (n < 0 || (n & 127) >= JU.Elements.elementNumberMax || n > 32767) n = 0;
this.atomicAndIsotopeNumber = n;
}, "~N");
Clazz.defineMethod (c$, "getElementSymbolIso", 
function (withIsotope) {
return JU.Elements.elementSymbolFromNumber (withIsotope ? this.atomicAndIsotopeNumber : this.atomicAndIsotopeNumber & 127);
}, "~B");
Clazz.defineMethod (c$, "getElementSymbol", 
function () {
return this.getElementSymbolIso (true);
});
Clazz.defineMethod (c$, "isHetero", 
function () {
return (this.formalChargeAndFlags & 2) != 0;
});
Clazz.defineMethod (c$, "hasVibration", 
function () {
return (this.formalChargeAndFlags & 1) != 0;
});
Clazz.defineMethod (c$, "setFormalCharge", 
function (charge) {
this.formalChargeAndFlags = (this.formalChargeAndFlags & 15) | ((charge == -2147483648 ? 0 : charge > 7 ? 7 : charge < -3 ? -3 : charge) << 24);
}, "~N");
Clazz.defineMethod (c$, "setVibrationVector", 
function () {
this.formalChargeAndFlags |= 1;
});
Clazz.overrideMethod (c$, "getFormalCharge", 
function () {
return this.formalChargeAndFlags >> 24;
});
Clazz.defineMethod (c$, "getOccupancy100", 
function () {
var occupancies = this.group.chain.model.ms.occupancies;
return (occupancies == null ? 100 : Math.round (occupancies[this.i]));
});
Clazz.defineMethod (c$, "isOccupied", 
function () {
var occupancies = this.group.chain.model.ms.occupancies;
return (occupancies == null || occupancies[this.i] >= 50);
});
Clazz.defineMethod (c$, "getBfactor100", 
function () {
var bfactor100s = this.group.chain.model.ms.bfactor100s;
return (bfactor100s == null ? 0 : bfactor100s[this.i]);
});
Clazz.defineMethod (c$, "getHydrophobicity", 
function () {
var values = this.group.chain.model.ms.hydrophobicities;
return (values == null ? JU.Elements.getHydrophobicity (this.group.groupID) : values[this.i]);
});
Clazz.defineMethod (c$, "setRadius", 
function (radius) {
return !Float.isNaN (this.userDefinedVanDerWaalRadius = (radius > 0 ? radius : NaN));
}, "~N");
Clazz.defineMethod (c$, "$delete", 
function (bsBonds) {
this.valence = -1;
if (this.bonds != null) for (var i = this.bonds.length; --i >= 0; ) {
var bond = this.bonds[i];
bond.getOtherAtom (this).deleteBond (bond);
bsBonds.set (bond.index);
}
this.bonds = null;
}, "JU.BS");
Clazz.overrideMethod (c$, "isDeleted", 
function () {
return (this.valence < 0);
});
Clazz.defineMethod (c$, "setValence", 
function (nBonds) {
if (!this.isDeleted ()) this.valence = (nBonds < 0 ? 0 : nBonds <= 0x7F ? nBonds : 0x7F);
}, "~N");
Clazz.overrideMethod (c$, "getValence", 
function () {
if (this.isDeleted ()) return -1;
var n = this.valence;
if (n == 0 && this.bonds != null) for (var i = this.bonds.length; --i >= 0; ) n += this.bonds[i].getValence ();

return n;
});
Clazz.overrideMethod (c$, "getCovalentBondCount", 
function () {
if (this.bonds == null) return 0;
var n = 0;
var b;
for (var i = this.bonds.length; --i >= 0; ) if (((b = this.bonds[i]).order & 1023) != 0 && !b.getOtherAtom (this).isDeleted ()) ++n;

return n;
});
Clazz.overrideMethod (c$, "getCovalentHydrogenCount", 
function () {
if (this.bonds == null) return 0;
var n = 0;
for (var i = this.bonds.length; --i >= 0; ) {
if ((this.bonds[i].order & 1023) == 0) continue;
var a = this.bonds[i].getOtherAtom (this);
if (a.valence >= 0 && a.getElementNumber () == 1) ++n;
}
return n;
});
Clazz.overrideMethod (c$, "getImplicitHydrogenCount", 
function () {
return this.group.chain.model.ms.getMissingHydrogenCount (this, false);
});
Clazz.overrideMethod (c$, "getTotalHydrogenCount", 
function () {
return this.getCovalentHydrogenCount () + this.getImplicitHydrogenCount ();
});
Clazz.overrideMethod (c$, "getTotalValence", 
function () {
var v = this.getValence ();
if (v < 0) return v;
var h = this.getImplicitHydrogenCount ();
var sp2 = this.group.chain.model.ms.aaRet[4];
return v + h + sp2;
});
Clazz.overrideMethod (c$, "getCovalentBondCountPlusMissingH", 
function () {
return this.getCovalentBondCount () + this.getImplicitHydrogenCount ();
});
Clazz.defineMethod (c$, "getTargetValence", 
function () {
switch (this.getElementNumber ()) {
case 6:
case 14:
case 32:
return 4;
case 5:
case 7:
case 15:
return 3;
case 8:
case 16:
return 2;
case 1:
case 9:
case 17:
case 35:
case 53:
return 1;
}
return -1;
});
Clazz.defineMethod (c$, "getDimensionValue", 
function (dimension) {
return (dimension == 0 ? this.x : (dimension == 1 ? this.y : this.z));
}, "~N");
Clazz.defineMethod (c$, "getVanderwaalsRadiusFloat", 
function (vwr, type) {
return (Float.isNaN (this.userDefinedVanDerWaalRadius) ? vwr.getVanderwaalsMarType (this.atomicAndIsotopeNumber, this.getVdwType (type)) / 1000 : this.userDefinedVanDerWaalRadius);
}, "JV.Viewer,J.c.VDW");
Clazz.defineMethod (c$, "getVdwType", 
 function (type) {
switch (type) {
case J.c.VDW.AUTO:
type = this.group.chain.model.ms.getDefaultVdwType (this.mi);
break;
case J.c.VDW.NOJMOL:
type = this.group.chain.model.ms.getDefaultVdwType (this.mi);
if (type === J.c.VDW.AUTO_JMOL) type = J.c.VDW.AUTO_BABEL;
break;
}
return type;
}, "J.c.VDW");
Clazz.defineMethod (c$, "getBondingRadius", 
function () {
var rr = this.group.chain.model.ms.bondingRadii;
var r = (rr == null ? 0 : rr[this.i]);
return (r == 0 ? JU.Elements.getBondingRadius (this.atomicAndIsotopeNumber, this.getFormalCharge ()) : r);
});
Clazz.defineMethod (c$, "getVolume", 
function (vwr, vType) {
var r1 = (vType == null ? this.userDefinedVanDerWaalRadius : NaN);
if (Float.isNaN (r1)) r1 = vwr.getVanderwaalsMarType (this.getElementNumber (), this.getVdwType (vType)) / 1000;
var volume = 0;
if (this.bonds != null) for (var j = 0; j < this.bonds.length; j++) {
if (!this.bonds[j].isCovalent ()) continue;
var atom2 = this.bonds[j].getOtherAtom (this);
var r2 = (vType == null ? atom2.userDefinedVanDerWaalRadius : NaN);
if (Float.isNaN (r2)) r2 = vwr.getVanderwaalsMarType (atom2.getElementNumber (), atom2.getVdwType (vType)) / 1000;
var d = this.distance (atom2);
if (d > r1 + r2) continue;
if (d + r1 <= r2) return 0;
var h = r1 - (r1 * r1 + d * d - r2 * r2) / (2.0 * d);
volume -= 1.0471975511965976 * h * h * (3 * r1 - h);
}
return (volume + 4.1887902047863905 * r1 * r1 * r1);
}, "JV.Viewer,J.c.VDW");
Clazz.defineMethod (c$, "getCurrentBondCount", 
function () {
return this.bonds == null ? 0 : this.bonds.length;
});
Clazz.defineMethod (c$, "getRadius", 
function () {
return Math.abs (this.madAtom / 2000);
});
Clazz.overrideMethod (c$, "getIndex", 
function () {
return this.i;
});
Clazz.overrideMethod (c$, "getAtomSite", 
function () {
return this.atomSite;
});
Clazz.overrideMethod (c$, "getGroupBits", 
function (bs) {
this.group.setAtomBits (bs);
}, "JU.BS");
Clazz.overrideMethod (c$, "getAtomName", 
function () {
return (this.atomID > 0 ? JM.Group.specialAtomNames[this.atomID] : this.group.chain.model.ms.atomNames[this.i]);
});
Clazz.overrideMethod (c$, "getAtomType", 
function () {
var atomTypes = this.group.chain.model.ms.atomTypes;
var type = (atomTypes == null ? null : atomTypes[this.i]);
return (type == null ? this.getAtomName () : type);
});
Clazz.overrideMethod (c$, "getAtomNumber", 
function () {
var atomSerials = this.group.chain.model.ms.atomSerials;
return (atomSerials == null ? this.i : atomSerials[this.i]);
});
Clazz.defineMethod (c$, "getSeqID", 
function () {
var ids = this.group.chain.model.ms.atomSeqIDs;
return (ids == null ? 0 : ids[this.i]);
});
Clazz.defineMethod (c$, "isVisible", 
function (flags) {
return ((this.shapeVisibilityFlags & flags) == flags);
}, "~N");
Clazz.defineMethod (c$, "getPartialCharge", 
function () {
var partialCharges = this.group.chain.model.ms.partialCharges;
return partialCharges == null ? 0 : partialCharges[this.i];
});
Clazz.defineMethod (c$, "getSymmetryTranslation", 
function (symop, cellRange, nOps) {
var pt = symop;
for (var i = 0; i < cellRange.length; i++) if (this.atomSymmetry.get (pt += nOps)) return cellRange[i];

return 0;
}, "~N,~A,~N");
Clazz.defineMethod (c$, "getCellTranslation", 
function (cellNNN, cellRange, nOps) {
var pt = nOps;
for (var i = 0; i < cellRange.length; i++) for (var j = 0; j < nOps; j++, pt++) if (this.atomSymmetry.get (pt) && cellRange[i] == cellNNN) return cellRange[i];


return 0;
}, "~N,~A,~N");
Clazz.defineMethod (c$, "getSymmetryOperatorList", 
function (isAll) {
var str = "";
var f = this.group.chain.model.ms;
var nOps = f.getModelSymmetryCount (this.mi);
if (nOps == 0 || this.atomSymmetry == null) return "";
var cellRange = f.getModelCellRange (this.mi);
var pt = nOps;
var n = (cellRange == null ? 1 : cellRange.length);
var bs = (isAll ? null :  new JU.BS ());
for (var i = 0; i < n; i++) for (var j = 0; j < nOps; j++) if (this.atomSymmetry.get (pt++)) if (isAll) {
str += "," + (j + 1) + cellRange[i];
} else {
bs.set (j + 1);
}

if (!isAll) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) str += "," + i;

return (str.length == 0 ? "" : str.substring (1));
}, "~B");
Clazz.overrideMethod (c$, "getModelIndex", 
function () {
return this.mi;
});
Clazz.overrideMethod (c$, "getMoleculeNumber", 
function (inModel) {
return (this.group.chain.model.ms.getMoleculeIndex (this.i, inModel) + 1);
}, "~B");
Clazz.defineMethod (c$, "getFractionalCoord", 
 function (fixJavaFloat, ch, ignoreOffset, pt) {
pt = this.getFractionalCoordPt (fixJavaFloat, ignoreOffset, pt);
return (ch == 'X' ? pt.x : ch == 'Y' ? pt.y : pt.z);
}, "~B,~S,~B,JU.P3");
Clazz.overrideMethod (c$, "getXYZ", 
function () {
return this;
});
Clazz.defineMethod (c$, "getFractionalCoordPt", 
function (fixJavaFloat, ignoreOffset, pt) {
var c = this.getUnitCell ();
if (c == null) return this;
if (pt == null) pt = JU.P3.newP (this);
 else pt.setT (this);
c.toFractional (pt, ignoreOffset);
if (fixJavaFloat) JU.PT.fixPtFloats (pt, 100000.0);
return pt;
}, "~B,~B,JU.P3");
Clazz.defineMethod (c$, "getUnitCell", 
function () {
return this.group.chain.model.ms.getUnitCellForAtom (this.i);
});
Clazz.defineMethod (c$, "getFractionalUnitCoord", 
 function (fixJavaFloat, ch, pt) {
pt = this.getFractionalUnitCoordPt (fixJavaFloat, false, pt);
return (ch == 'X' ? pt.x : ch == 'Y' ? pt.y : pt.z);
}, "~B,~S,JU.P3");
Clazz.defineMethod (c$, "getFractionalUnitCoordPt", 
function (fixJavaFloat, asCartesian, pt) {
var c = this.getUnitCell ();
if (c == null) return this;
if (pt == null) pt = JU.P3.newP (this);
 else pt.setT (this);
if (this.group.chain.model.isJmolDataFrame) {
c.toFractional (pt, false);
if (asCartesian) c.toCartesian (pt, false);
} else {
c.toUnitCell (pt, null);
if (!asCartesian) c.toFractional (pt, false);
}if (fixJavaFloat) JU.PT.fixPtFloats (pt, asCartesian ? 10000.0 : 100000.0);
return pt;
}, "~B,~B,JU.P3");
Clazz.defineMethod (c$, "getFractionalUnitDistance", 
function (pt, ptTemp1, ptTemp2) {
var c = this.getUnitCell ();
if (c == null) return this.distance (pt);
ptTemp1.setT (this);
ptTemp2.setT (pt);
if (this.group.chain.model.isJmolDataFrame) {
c.toFractional (ptTemp1, true);
c.toFractional (ptTemp2, true);
} else {
c.toUnitCell (ptTemp1, null);
c.toUnitCell (ptTemp2, null);
}return ptTemp1.distance (ptTemp2);
}, "JU.T3,JU.T3,JU.T3");
Clazz.defineMethod (c$, "setFractionalCoord", 
function (tok, fValue, asAbsolute) {
var c = this.getUnitCell ();
if (c != null) c.toFractional (this, asAbsolute);
switch (tok) {
case 1111492615:
case 1111492612:
this.x = fValue;
break;
case 1111492616:
case 1111492613:
this.y = fValue;
break;
case 1111492617:
case 1111492614:
this.z = fValue;
break;
}
if (c != null) c.toCartesian (this, asAbsolute);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "setFractionalCoordTo", 
function (ptNew, asAbsolute) {
this.setFractionalCoordPt (this, ptNew, asAbsolute);
}, "JU.P3,~B");
Clazz.defineMethod (c$, "setFractionalCoordPt", 
function (pt, ptNew, asAbsolute) {
pt.setT (ptNew);
var c = this.getUnitCell ();
if (c != null) c.toCartesian (pt, asAbsolute && !this.group.chain.model.isJmolDataFrame);
}, "JU.P3,JU.P3,~B");
Clazz.defineMethod (c$, "isCursorOnTopOf", 
function (xCursor, yCursor, minRadius, competitor) {
var r = Clazz.doubleToInt (this.sD / 2);
if (r < minRadius) r = minRadius;
var r2 = r * r;
var dx = this.sX - xCursor;
var dx2 = dx * dx;
if (dx2 > r2) return false;
var dy = this.sY - yCursor;
var dy2 = dy * dy;
var dz2 = r2 - (dx2 + dy2);
if (dz2 < 0) return false;
if (competitor == null) return true;
var z = this.sZ;
var zCompetitor = competitor.sZ;
var rCompetitor = Clazz.doubleToInt (competitor.sD / 2);
if (z < zCompetitor - rCompetitor) return true;
var dxCompetitor = competitor.sX - xCursor;
var dx2Competitor = dxCompetitor * dxCompetitor;
var dyCompetitor = competitor.sY - yCursor;
var dy2Competitor = dyCompetitor * dyCompetitor;
var r2Competitor = rCompetitor * rCompetitor;
var dz2Competitor = r2Competitor - (dx2Competitor + dy2Competitor);
return (z - Math.sqrt (dz2) < zCompetitor - Math.sqrt (dz2Competitor));
}, "~N,~N,~N,JM.Atom");
Clazz.defineMethod (c$, "getInfo", 
function () {
return this.getIdentity (true);
});
Clazz.defineMethod (c$, "getIdentityXYZ", 
function (allInfo, pt) {
pt = (this.group.chain.model.isJmolDataFrame ? this.getFractionalCoordPt (!this.group.chain.model.ms.vwr.g.legacyJavaFloat, false, pt) : this);
return this.getIdentity (allInfo) + " " + JU.PT.formatF (pt.x, 0, 3, true, true) + " " + JU.PT.formatF (pt.y, 0, 3, true, true) + " " + JU.PT.formatF (pt.z, 0, 3, true, true);
}, "~B,JU.P3");
Clazz.defineMethod (c$, "getIdentity", 
function (allInfo) {
var info =  new JU.SB ();
var group3 = this.getGroup3 (true);
if (group3 != null && group3.length > 0 && (!group3.equals ("UNK") || this.group.chain.model.isBioModel)) {
info.append ("[");
info.append (group3);
info.append ("]");
var seqcodeString = this.group.getSeqcodeString ();
if (seqcodeString != null) info.append (seqcodeString);
var chainID = this.group.chain.chainID;
if (chainID != 0 && chainID != 32) {
info.append (":");
var s = this.getChainIDStr ();
if (chainID >= 256) s = JU.PT.esc (s);
info.append (s);
}if (!allInfo) return info.toString ();
info.append (".");
}info.append (this.getAtomName ());
if (info.length () == 0) {
info.append (this.getElementSymbolIso (false));
info.append (" ");
info.appendI (this.getAtomNumber ());
}if (this.altloc != '\0') {
info.append ("%");
info.appendC (this.altloc);
}if (this.group.chain.model.ms.mc > 1 && !this.group.chain.model.isJmolDataFrame) {
info.append ("/");
info.append (this.getModelNumberForLabel ());
}info.append (" #");
info.appendI (this.getAtomNumber ());
return info.toString ();
}, "~B");
Clazz.overrideMethod (c$, "getGroup3", 
function (allowNull) {
var group3 = this.group.getGroup3 ();
return (allowNull || group3 != null && group3.length > 0 ? group3 : "UNK");
}, "~B");
Clazz.overrideMethod (c$, "getGroup1", 
function (c0) {
var c = this.group.getGroup1 ();
return (c != '\0' ? "" + c : c0 != '\0' ? "" + c0 : "");
}, "~S");
Clazz.overrideMethod (c$, "getBioSmilesType", 
function () {
return (this.group.isProtein () ? 'p' : this.group.isDna () ? 'd' : this.group.isRna () ? 'r' : this.group.isCarbohydrate () ? 'c' : ' ');
});
Clazz.overrideMethod (c$, "isPurine", 
function () {
return this.group.isPurine ();
});
Clazz.overrideMethod (c$, "isPyrimidine", 
function () {
return this.group.isPyrimidine ();
});
Clazz.overrideMethod (c$, "getResno", 
function () {
return this.group.getResno ();
});
Clazz.defineMethod (c$, "isClickable", 
function () {
return (this.checkVisible () && this.clickabilityFlags != 0 && ((this.shapeVisibilityFlags | this.group.shapeVisibilityFlags) & this.clickabilityFlags) != 0);
});
Clazz.defineMethod (c$, "setClickable", 
function (flag) {
if (flag == 0) {
this.clickabilityFlags = 0;
} else {
this.clickabilityFlags |= flag;
if (flag != 1040384) this.shapeVisibilityFlags |= flag;
}}, "~N");
Clazz.defineMethod (c$, "checkVisible", 
function () {
if (this.isVisible (2)) return this.isVisible (4);
var isVis = this.isVisible (9);
if (isVis) {
var flags = this.shapeVisibilityFlags;
if (this.group.shapeVisibilityFlags != 0 && (this.group.shapeVisibilityFlags != 8192 || this.isLeadAtom ())) flags |= this.group.shapeVisibilityFlags;
flags &= -10;
if (flags == 32 && this.clickabilityFlags == 0) flags = 0;
isVis = (flags != 0);
if (isVis) this.shapeVisibilityFlags |= 4;
}this.shapeVisibilityFlags |= 2;
return isVis;
});
Clazz.overrideMethod (c$, "isLeadAtom", 
function () {
return this.group.isLeadAtom (this.i);
});
Clazz.overrideMethod (c$, "getChainID", 
function () {
return this.group.chain.chainID;
});
Clazz.overrideMethod (c$, "getChainIDStr", 
function () {
return this.group.chain.getIDStr ();
});
Clazz.defineMethod (c$, "getSurfaceDistance100", 
function () {
return this.group.chain.model.ms.getSurfaceDistance100 (this.i);
});
Clazz.defineMethod (c$, "getVibrationVector", 
function () {
return this.group.chain.model.ms.getVibration (this.i, false);
});
Clazz.defineMethod (c$, "getModulation", 
function () {
return this.group.chain.model.ms.getModulation (this.i);
});
Clazz.defineMethod (c$, "getModelNumberForLabel", 
function () {
return this.group.chain.model.ms.getModelNumberForAtomLabel (this.mi);
});
Clazz.defineMethod (c$, "getModelNumber", 
function () {
return this.group.chain.model.ms.getModelNumber (this.mi) % 1000000;
});
Clazz.overrideMethod (c$, "getBioStructureTypeName", 
function () {
return this.group.getProteinStructureType ().getBioStructureTypeName (true);
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
return (this === obj);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.i;
});
Clazz.defineMethod (c$, "findAromaticNeighbor", 
function (notAtomIndex) {
if (this.bonds == null) return null;
for (var i = this.bonds.length; --i >= 0; ) {
var bondT = this.bonds[i];
var a = bondT.getOtherAtom (this);
if (bondT.isAromatic () && a.i != notAtomIndex) return a;
}
return null;
}, "~N");
Clazz.defineMethod (c$, "atomPropertyInt", 
function (tokWhat) {
switch (tokWhat) {
case 1094715393:
return this.getAtomNumber ();
case 1094713365:
return this.getSeqID ();
case 1094713346:
return this.atomID;
case 1094713368:
return Math.max (0, this.altloc.charCodeAt (0) - 32);
case 1094713347:
return this.i;
case 1228931587:
return this.getCovalentBondCount ();
case 1094713351:
return this.group.chain.chainNo;
case 1765808134:
return this.group.chain.model.ms.vwr.gdata.getColorArgbOrGray (this.colixAtom);
case 1086326789:
case 1094715402:
return this.getElementNumber ();
case 1094713353:
return this.atomicAndIsotopeNumber;
case 1228935687:
return this.group.chain.model.fileIndex + 1;
case 1631586315:
return this.getFormalCharge ();
case 1094713356:
return this.group.groupID;
case 1094713357:
return this.group.groupIndex;
case 1094717454:
return this.getModelNumber ();
case -1094717454:
return this.group.chain.model.ms.modelFileNumbers[this.mi];
case 1094713359:
return this.mi;
case 1094713360:
return this.getMoleculeNumber (true);
case 1094713361:
return this.group.getMonomerIndex () + 1;
case 1128269825:
return this.getOccupancy100 ();
case 1094713362:
return this.group.getBioPolymerIndexInModel () + 1;
case 1094713363:
return this.group.getBioPolymerLength ();
case 1665140738:
return this.getRasMolRadius ();
case 1094715412:
return this.getResno ();
case 1094713366:
return this.getAtomSite ();
case 1639976963:
return this.group.getProteinStructureType ().getId ();
case 1237320707:
return this.group.getProteinStructureSubType ().getId ();
case 1094713367:
return this.group.getStrucNo ();
case 1296041986:
return this.getSymOp ();
case 1094715417:
return this.getValence ();
}
return 0;
}, "~N");
Clazz.defineMethod (c$, "getSymOp", 
function () {
return (this.atomSymmetry == null ? 0 : this.atomSymmetry.nextSetBit (0) + 1);
});
Clazz.defineMethod (c$, "atomPropertyFloat", 
function (vwr, tokWhat, ptTemp) {
switch (tokWhat) {
case 1111490561:
return this.getADPMinMax (true);
case 1111490562:
return this.getADPMinMax (false);
case 1111492609:
case 1111492629:
return this.x;
case 1111492610:
case 1111492630:
return this.y;
case 1111492611:
case 1111492631:
return this.z;
case 1111490587:
return this.group.chain.model.ms.getAtomicDSSRData (this.i);
case 1114249217:
case 1112152066:
case 1112150019:
case 1112150020:
case 1112150021:
case 1112152070:
case 1112152071:
case 1112152073:
case 1112152074:
case 1112152076:
case 1649022989:
case 1112152078:
return vwr.shm.getAtomShapeValue (tokWhat, this.group, this.i);
case 1111492618:
return this.getBondingRadius ();
case 1111490563:
return vwr.getNMRCalculation ().getChemicalShift (this);
case 1111490564:
return JU.Elements.getCovalentRadius (this.atomicAndIsotopeNumber);
case 1111490565:
case 1111490576:
case 1111490574:
return this.group.getGroupParameter (tokWhat);
case 1111492615:
case 1111492612:
return this.getFractionalCoord (!vwr.g.legacyJavaFloat, 'X', false, ptTemp);
case 1111492616:
case 1111492613:
return this.getFractionalCoord (!vwr.g.legacyJavaFloat, 'Y', false, ptTemp);
case 1111492617:
case 1111492614:
return this.getFractionalCoord (!vwr.g.legacyJavaFloat, 'Z', false, ptTemp);
case 1113589786:
return this.getHydrophobicity ();
case 1111490566:
return vwr.getNMRCalculation ().getMagneticShielding (this);
case 1111490567:
return this.getMass ();
case 1128269825:
return this.getOccupancy100 () / 100;
case 1111492619:
return this.getPartialCharge ();
case 1111490569:
case 1111490570:
case 1111490568:
if (this.group.chain.model.isJmolDataFrame && this.group.chain.model.jmolFrameType.startsWith ("plot ramachandran")) {
switch (tokWhat) {
case 1111490569:
return this.getFractionalCoord (!vwr.g.legacyJavaFloat, 'X', false, ptTemp);
case 1111490570:
return this.getFractionalCoord (!vwr.g.legacyJavaFloat, 'Y', false, ptTemp);
case 1111490568:
if (this.group.chain.model.isJmolDataFrame && this.group.chain.model.jmolFrameType.equals ("plot ramachandran")) {
var omega = this.getFractionalCoord (!vwr.g.legacyJavaFloat, 'Z', false, ptTemp) - 180;
return (omega < -180 ? 360 + omega : omega);
}}
}return this.group.getGroupParameter (tokWhat);
case 1665140738:
case 1112152075:
return this.getRadius ();
case 1111490571:
return (vwr.antialiased ? Clazz.doubleToInt (this.sX / 2) : this.sX);
case 1111490572:
return vwr.getScreenHeight () - (vwr.antialiased ? Clazz.doubleToInt (this.sY / 2) : this.sY);
case 1111490573:
return (vwr.antialiased ? Clazz.doubleToInt (this.sZ / 2) : this.sZ);
case 1113589787:
return (vwr.slm.isAtomSelected (this.i) ? 1 : 0);
case 1111490575:
vwr.ms.getSurfaceDistanceMax ();
return this.getSurfaceDistance100 () / 100;
case 1111492620:
return this.getBfactor100 () / 100;
case 1111490577:
return this.getFractionalUnitCoord (!vwr.g.legacyJavaFloat, 'X', ptTemp);
case 1111490578:
return this.getFractionalUnitCoord (!vwr.g.legacyJavaFloat, 'Y', ptTemp);
case 1111490579:
return this.getFractionalUnitCoord (!vwr.g.legacyJavaFloat, 'Z', ptTemp);
case 1648363544:
return this.getVanderwaalsRadiusFloat (vwr, J.c.VDW.AUTO);
case 1648361473:
var v = this.getVibrationVector ();
return (v == null ? 0 : v.length () * vwr.getFloat (1648361473));
case 1111492626:
return this.getVib ('x');
case 1111492627:
return this.getVib ('y');
case 1111492628:
return this.getVib ('z');
case 1111490583:
return this.getVib ('X');
case 1111490584:
return this.getVib ('Y');
case 1111490585:
return this.getVib ('Z');
case 1111490586:
return this.getVib ('O');
case 1111490580:
return this.getVib ('1');
case 1111490581:
return this.getVib ('2');
case 1111490582:
return this.getVib ('3');
case 1312817669:
return this.getVolume (vwr, J.c.VDW.AUTO);
case 1145047051:
case 1145047053:
case 1145045006:
case 1145047052:
case 1145047055:
case 1145045008:
case 1145047050:
var v3 = this.atomPropertyTuple (vwr, tokWhat, ptTemp);
return (v3 == null ? -1 : v3.length ());
}
return this.atomPropertyInt (tokWhat);
}, "JV.Viewer,~N,JU.P3");
Clazz.defineMethod (c$, "getVib", 
function (ch) {
return this.group.chain.model.ms.getVibCoord (this.i, ch);
}, "~S");
Clazz.defineMethod (c$, "getNominalMass", 
function () {
var mass = this.getIsotopeNumber ();
return (mass > 0 ? mass : JU.Elements.getNaturalIsotope (this.getElementNumber ()));
});
Clazz.overrideMethod (c$, "getMass", 
function () {
var mass = this.getIsotopeNumber ();
return (mass > 0 ? mass : JU.Elements.getAtomicMass (this.getElementNumber ()));
});
Clazz.defineMethod (c$, "atomPropertyString", 
function (vwr, tokWhat) {
var ch;
var s;
switch (tokWhat) {
case 1086324739:
ch = this.altloc;
return (ch == '\0' ? "" : "" + ch);
case 1086326786:
return this.getAtomName ();
case 1086326785:
return this.getAtomType ();
case 1086326788:
return this.getChainIDStr ();
case 1086324752:
return this.getCIPChirality (true);
case 1086324753:
return this.getCIPChiralityRule ();
case 1086324744:
return this.getGroup1 ('?');
case 1086324747:
s = this.group.getSeqcodeString ();
return (s == null ? "" : s);
case 1086324743:
return this.getGroup1 ('\0');
case 1086324742:
return this.getGroup3 (false);
case 1086326789:
return this.getElementSymbolIso (true);
case 1086324745:
return this.getIdentity (true);
case 1086324746:
ch = this.group.getInsertionCode ();
return (ch == '\0' ? "" : "" + ch);
case 1825200146:
case 1287653388:
s = vwr.shm.getShapePropertyIndex (5, "label", this.i);
if (s == null) s = "";
return s;
case 1639976963:
return this.group.getProteinStructureType ().getBioStructureTypeName (false);
case 1237320707:
return this.group.getProteinStructureSubType ().getBioStructureTypeName (false);
case 1086324749:
return this.group.getStructureId ();
case 1086324748:
return vwr.getHybridizationAndAxes (this.i, null, null, "d");
case 1086326798:
return this.getElementSymbolIso (false);
case 1088421903:
return this.getSymmetryOperatorList (true);
}
return "";
}, "JV.Viewer,~N");
Clazz.overrideMethod (c$, "getCIPChirality", 
function (doCalculate) {
var flags = (this.formalChargeAndFlags & 496) >> 4;
if (flags == 0 && this.atomicAndIsotopeNumber > 1 && doCalculate) {
flags = this.group.chain.model.ms.getAtomCIPChiralityCode (this);
this.formalChargeAndFlags |= ((flags == 0 ? 3 : flags) << 4);
}return JV.JC.getCIPChiralityName (flags);
}, "~B");
Clazz.defineMethod (c$, "getCIPChiralityRule", 
function () {
var rs = this.getCIPChirality (true);
var flags = (rs.length == 0 ? -1 : (this.formalChargeAndFlags & 3584) >> 9);
return JV.JC.getCIPRuleName (flags + 1);
});
Clazz.overrideMethod (c$, "setCIPChirality", 
function (c) {
this.formalChargeAndFlags = (this.formalChargeAndFlags & -4081) | (c << 4);
}, "~N");
Clazz.overrideMethod (c$, "getCIPChiralityCode", 
function () {
return (this.formalChargeAndFlags & 496) >> 4;
});
Clazz.overrideMethod (c$, "getInsertionCode", 
function () {
return this.group.getInsertionCode ();
});
Clazz.defineMethod (c$, "atomPropertyTuple", 
function (vwr, tok, ptTemp) {
switch (tok) {
case 1073742329:
return JU.P3.newP (this);
case 1145047051:
return this.getFractionalCoordPt (!vwr.g.legacyJavaFloat, false, ptTemp);
case 1145047053:
return this.getFractionalCoordPt (!vwr.g.legacyJavaFloat, false, ptTemp);
case 1145045006:
return (this.group.chain.model.isJmolDataFrame ? this.getFractionalCoordPt (!vwr.g.legacyJavaFloat, false, ptTemp) : this.getFractionalUnitCoordPt (!vwr.g.legacyJavaFloat, false, ptTemp));
case 1145047052:
return JU.P3.new3 (vwr.antialiased ? Clazz.doubleToInt (this.sX / 2) : this.sX, vwr.getScreenHeight () - (vwr.antialiased ? Clazz.doubleToInt (this.sY / 2) : this.sY), vwr.antialiased ? Clazz.doubleToInt (this.sZ / 2) : this.sZ);
case 1145047055:
return this.getVibrationVector ();
case 1145045008:
var ms = this.getModulation ();
return (ms == null ? null : ms.getV3 ());
case 1145047050:
return this;
case 1765808134:
return JU.CU.colorPtFromInt (this.group.chain.model.ms.vwr.gdata.getColorArgbOrGray (this.colixAtom), ptTemp);
}
return null;
}, "JV.Viewer,~N,JU.P3");
Clazz.overrideMethod (c$, "getOffsetResidueAtom", 
function (name, offset) {
return this.group.getAtomIndex (name, offset);
}, "~S,~N");
Clazz.overrideMethod (c$, "isCrossLinked", 
function (node) {
return this.group.isCrossLinked ((node).group);
}, "JU.Node");
Clazz.overrideMethod (c$, "getCrossLinkVector", 
function (vReturn, crosslinkCovalent, crosslinkHBond) {
return this.group.getCrossLinkVector (vReturn, crosslinkCovalent, crosslinkHBond);
}, "JU.Lst,~B,~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getInfo ();
});
Clazz.overrideMethod (c$, "findAtomsLike", 
function (atomExpression) {
return this.group.chain.model.ms.vwr.getAtomBitSet (atomExpression);
}, "~S");
Clazz.defineMethod (c$, "getUnitID", 
function (flags) {
var m = this.group.chain.model;
return (m.isBioModel ? (m).getUnitID (this, flags) : "");
}, "~N");
Clazz.overrideMethod (c$, "getFloatProperty", 
function (property) {
var data = this.group.chain.model.ms.vwr.getDataObj (property, null, 1);
var f = NaN;
if (data != null) {
try {
f = (data)[this.i];
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}return f;
}, "~S");
Clazz.overrideMethod (c$, "modelIsRawPDB", 
function () {
var m = this.group.chain.model;
return (m.isBioModel && !m.isPdbWithMultipleBonds && m.hydrogenCount == 0);
});
Clazz.defineStatics (c$,
"ATOM_INFRAME", 1,
"ATOM_VISSET", 2,
"ATOM_VISIBLE", 4,
"ATOM_NOTHIDDEN", 8,
"ATOM_NOFLAGS", -64,
"ATOM_INFRAME_NOTHIDDEN", 9,
"ATOM_SHAPE_VIS_MASK", -10,
"RADIUS_MAX", 16,
"RADIUS_GLOBAL", 16.1,
"MAD_GLOBAL", 32200,
"CHARGE_OFFSET", 24,
"FLAG_MASK", 0xF,
"VIBRATION_VECTOR_FLAG", 1,
"IS_HETERO_FLAG", 2,
"CIP_CHIRALITY_OFFSET", 4,
"CIP_CHIRALITY_MASK", 0x1F0,
"CIP_CHIRALITY_RULE_OFFSET", 9,
"CIP_CHIRALITY_RULE_MASK", 0xE00,
"CIP_MASK", 4080);
});
