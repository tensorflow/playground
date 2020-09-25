Clazz.declarePackage ("JM");
Clazz.load (["JU.V3"], "JM.AtomCollection", ["java.lang.Float", "java.util.Arrays", "$.Hashtable", "JU.A4", "$.AU", "$.BS", "$.Lst", "$.M3", "$.Measure", "$.P3", "$.PT", "J.api.Interface", "$.JmolModulationSet", "J.atomdata.RadiusData", "J.c.PAL", "$.VDW", "JM.Group", "JS.T", "JU.BSUtil", "$.Elements", "$.Escape", "$.Logger", "$.Parser", "$.Vibration"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.g3d = null;
this.bioModelset = null;
this.at = null;
this.ac = 0;
this.trajectory = null;
this.pointGroup = null;
this.labeler = null;
this.maxBondingRadius = 1.4E-45;
this.maxVanderwaalsRadius = 1.4E-45;
this.hasBfactorRange = false;
this.bfactor100Lo = 0;
this.bfactor100Hi = 0;
this.haveBSVisible = false;
this.haveBSClickable = false;
this.bsSurface = null;
this.nSurfaceAtoms = 0;
this.surfaceDistanceMax = 0;
this.haveChirality = false;
this.bspf = null;
this.preserveState = true;
this.canSkipLoad = true;
this.haveStraightness = false;
this.bsHidden = null;
this.bsVisible = null;
this.bsClickable = null;
this.bsModulated = null;
this.atomTensorList = null;
this.atomTensors = null;
this.surfaceDistance100s = null;
this.tainted = null;
this.atomNames = null;
this.atomTypes = null;
this.atomSerials = null;
this.atomResnos = null;
this.atomSeqIDs = null;
this.dssrData = null;
this.vibrations = null;
this.occupancies = null;
this.bfactor100s = null;
this.partialCharges = null;
this.bondingRadii = null;
this.hydrophobicities = null;
this.bsPartialCharges = null;
this.aaRet = null;
if (!Clazz.isClassDefined ("JM.AtomCollection.AtomSorter")) {
JM.AtomCollection.$AtomCollection$AtomSorter$ ();
}
this.atomCapacity = 0;
Clazz.instantialize (this, arguments);
}, JM, "AtomCollection");
Clazz.defineMethod (c$, "getAtom", 
function (iatom) {
return (iatom >= 0 && iatom < this.at.length ? this.at[iatom] : null);
}, "~N");
Clazz.defineMethod (c$, "setupAC", 
function () {
this.bsHidden =  new JU.BS ();
this.bsVisible =  new JU.BS ();
this.bsClickable =  new JU.BS ();
if (JM.AtomCollection.userSettableValues == null) JM.AtomCollection.userSettableValues = ("atomName atomType coord element formalCharge hydrophobicity ionic occupancy partialCharge temperature valence vanderWaals vibrationVector atomNo seqID resNo chain").$plit (" ");
});
Clazz.defineMethod (c$, "releaseModelSetAC", 
function () {
this.at = null;
this.vwr = null;
this.g3d = null;
this.bspf = null;
this.surfaceDistance100s = null;
this.bsSurface = null;
this.tainted = null;
this.atomNames = null;
this.atomTypes = null;
this.atomResnos = null;
this.dssrData = null;
this.atomSerials = null;
this.atomSeqIDs = null;
this.vibrations = null;
this.occupancies = null;
this.bfactor100s = null;
this.resetPartialCharges ();
this.bondingRadii = null;
this.atomTensors = null;
});
Clazz.defineMethod (c$, "mergeAtomArrays", 
function (mergeModelSet) {
this.tainted = mergeModelSet.tainted;
this.atomNames = mergeModelSet.atomNames;
this.atomTypes = mergeModelSet.atomTypes;
this.atomResnos = mergeModelSet.atomResnos;
this.dssrData = mergeModelSet.dssrData;
this.atomSerials = mergeModelSet.atomSerials;
this.atomSeqIDs = mergeModelSet.atomSeqIDs;
this.vibrations = mergeModelSet.vibrations;
this.occupancies = mergeModelSet.occupancies;
this.bfactor100s = mergeModelSet.bfactor100s;
this.bondingRadii = mergeModelSet.bondingRadii;
this.partialCharges = mergeModelSet.partialCharges;
this.bsPartialCharges = mergeModelSet.bsPartialCharges;
this.atomTensors = mergeModelSet.atomTensors;
this.atomTensorList = mergeModelSet.atomTensorList;
this.bsModulated = mergeModelSet.bsModulated;
this.haveStraightness = false;
this.surfaceDistance100s = null;
}, "JM.AtomCollection");
Clazz.defineMethod (c$, "getAtomPointVector", 
function (bs) {
var v =  new JU.Lst ();
var n = this.ac;
if (bs != null) {
for (var i = bs.nextSetBit (0); i >= 0 && i < n; i = bs.nextSetBit (i + 1)) {
v.addLast (this.at[i]);
}
}return v;
}, "JU.BS");
Clazz.defineMethod (c$, "modelSetHasVibrationVectors", 
function () {
return (this.vibrations != null);
});
Clazz.defineMethod (c$, "getAtomTypes", 
function () {
return this.atomTypes;
});
Clazz.defineMethod (c$, "getPartialCharges", 
function () {
return this.partialCharges;
});
Clazz.defineMethod (c$, "getBondingRadii", 
function () {
return this.bondingRadii;
});
Clazz.defineMethod (c$, "getBFactors", 
function () {
return this.bfactor100s;
});
Clazz.defineMethod (c$, "getHydrophobicity", 
function () {
return this.hydrophobicities;
});
Clazz.defineMethod (c$, "setBsHidden", 
function (bs) {
this.bsHidden = bs;
}, "JU.BS");
Clazz.defineMethod (c$, "isAtomHidden", 
function (iAtom) {
return this.bsHidden.get (iAtom);
}, "~N");
Clazz.defineMethod (c$, "getLabeler", 
function () {
return (this.labeler == null ? this.labeler = J.api.Interface.getInterface ("JM.LabelToken", this.vwr, "ms") : this.labeler);
});
Clazz.defineMethod (c$, "getAtomInfo", 
function (i, format, ptTemp) {
return (format == null ? this.at[i].getInfo () : this.getLabeler ().formatLabel (this.vwr, this.at[i], format, ptTemp));
}, "~N,~S,JU.P3");
Clazz.defineMethod (c$, "getElementName", 
function (i) {
return JU.Elements.elementNameFromNumber (this.at[i].getAtomicAndIsotopeNumber ());
}, "~N");
Clazz.defineMethod (c$, "getQuaternion", 
function (i, qtype) {
return (i < 0 ? null : this.at[i].group.getQuaternion (qtype));
}, "~N,~S");
Clazz.defineMethod (c$, "getFirstAtomIndexFromAtomNumber", 
function (atomNumber, bsVisibleFrames) {
for (var i = 0; i < this.ac; i++) {
var atom = this.at[i];
if (atom.getAtomNumber () == atomNumber && bsVisibleFrames.get (atom.mi)) return i;
}
return -1;
}, "~N,JU.BS");
Clazz.defineMethod (c$, "setFormalCharges", 
function (bs, formalCharge) {
if (bs != null) {
this.resetPartialCharges ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
this.at[i].setFormalCharge (formalCharge);
this.taintAtom (i, 4);
}
}}, "JU.BS,~N");
Clazz.defineMethod (c$, "getAtomicCharges", 
function () {
var charges =  Clazz.newFloatArray (this.ac, 0);
for (var i = this.ac; --i >= 0; ) charges[i] = this.at[i].getElementNumber ();

return charges;
});
Clazz.defineMethod (c$, "getRadiusVdwJmol", 
function (atom) {
return JU.Elements.getVanderwaalsMar (atom.getElementNumber (), J.c.VDW.JMOL) / 1000;
}, "JM.Atom");
Clazz.defineMethod (c$, "getMaxVanderwaalsRadius", 
function () {
if (this.maxVanderwaalsRadius == 1.4E-45) this.findMaxRadii ();
return this.maxVanderwaalsRadius;
});
Clazz.defineMethod (c$, "findMaxRadii", 
function () {
var r;
for (var i = this.ac; --i >= 0; ) {
var atom = this.at[i];
if ((r = atom.getBondingRadius ()) > this.maxBondingRadius) this.maxBondingRadius = r;
if ((r = atom.getVanderwaalsRadiusFloat (this.vwr, J.c.VDW.AUTO)) > this.maxVanderwaalsRadius) this.maxVanderwaalsRadius = r;
}
});
Clazz.defineMethod (c$, "clearBfactorRange", 
function () {
this.hasBfactorRange = false;
});
Clazz.defineMethod (c$, "calcBfactorRange", 
 function (bs) {
if (this.hasBfactorRange) return;
this.bfactor100Lo = 2147483647;
this.bfactor100Hi = -2147483648;
if (bs == null) {
for (var i = 0; i < this.ac; i++) this.setBf (i);

} else {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.setBf (i);

}this.hasBfactorRange = true;
}, "JU.BS");
Clazz.defineMethod (c$, "setBf", 
 function (i) {
var bf = this.at[i].getBfactor100 ();
if (bf < this.bfactor100Lo) this.bfactor100Lo = bf;
 else if (bf > this.bfactor100Hi) this.bfactor100Hi = bf;
}, "~N");
Clazz.defineMethod (c$, "getBfactor100Lo", 
function () {
if (!this.hasBfactorRange) {
if (this.vwr.g.rangeSelected) {
this.calcBfactorRange (this.vwr.bsA ());
} else {
this.calcBfactorRange (null);
}}return this.bfactor100Lo;
});
Clazz.defineMethod (c$, "getBfactor100Hi", 
function () {
this.getBfactor100Lo ();
return this.bfactor100Hi;
});
Clazz.defineMethod (c$, "getSurfaceDistanceMax", 
function () {
if (this.surfaceDistance100s == null) this.calcSurfaceDistances ();
return this.surfaceDistanceMax;
});
Clazz.defineMethod (c$, "calculateVolume", 
function (bs, vType) {
var volume = 0;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) volume += this.at[i].getVolume (this.vwr, vType);

return volume;
}, "JU.BS,J.c.VDW");
Clazz.defineMethod (c$, "getSurfaceDistance100", 
function (atomIndex) {
if (this.nSurfaceAtoms == 0) return -1;
if (this.surfaceDistance100s == null) this.calcSurfaceDistances ();
return this.surfaceDistance100s[atomIndex];
}, "~N");
Clazz.defineMethod (c$, "calcSurfaceDistances", 
 function () {
this.calculateSurface (null, -1);
});
Clazz.defineMethod (c$, "calculateSurface", 
function (bsSelected, envelopeRadius) {
if (envelopeRadius < 0) envelopeRadius = 3.0;
var ec = (J.api.Interface.getOption ("geodesic.EnvelopeCalculation", this.vwr, "ms")).set (this.vwr, this.ac, null);
ec.calculate ( new J.atomdata.RadiusData (null, envelopeRadius, J.atomdata.RadiusData.EnumType.ABSOLUTE, null), 3.4028235E38, bsSelected, JU.BSUtil.copyInvert (bsSelected, this.ac), false, false, false, true);
var points = ec.getPoints ();
this.surfaceDistanceMax = 0;
this.bsSurface = ec.getBsSurfaceClone ();
this.surfaceDistance100s =  Clazz.newIntArray (this.ac, 0);
this.nSurfaceAtoms = JU.BSUtil.cardinalityOf (this.bsSurface);
if (this.nSurfaceAtoms == 0 || points == null || points.length == 0) return points;
var radiusAdjust = (envelopeRadius == 3.4028235E38 ? 0 : envelopeRadius);
for (var i = 0; i < this.ac; i++) {
if (this.bsSurface.get (i)) {
this.surfaceDistance100s[i] = 0;
} else {
var dMin = 3.4028235E38;
var atom = this.at[i];
for (var j = points.length; --j >= 0; ) {
var d = Math.abs (points[j].distance (atom) - radiusAdjust);
if (d < 0 && JU.Logger.debugging) JU.Logger.debug ("draw d" + j + " " + JU.Escape.eP (points[j]) + " \"" + d + " ? " + atom.getInfo () + "\"");
dMin = Math.min (d, dMin);
}
var d = this.surfaceDistance100s[i] = Clazz.doubleToInt (Math.floor (dMin * 100));
this.surfaceDistanceMax = Math.max (this.surfaceDistanceMax, d);
}}
return points;
}, "JU.BS,~N");
Clazz.defineMethod (c$, "setAtomCoord2", 
function (bs, tokType, xyzValues) {
var xyz = null;
var values = null;
var v = null;
var type = 0;
var nValues = 1;
if (Clazz.instanceOf (xyzValues, JU.P3)) {
xyz = xyzValues;
} else if (Clazz.instanceOf (xyzValues, JU.Lst)) {
v = xyzValues;
if ((nValues = v.size ()) == 0) return;
type = 1;
} else if (JU.AU.isAP (xyzValues)) {
values = xyzValues;
if ((nValues = values.length) == 0) return;
type = 2;
} else {
return;
}var n = 0;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
switch (type) {
case 1:
if (n >= nValues) return;
xyz = v.get (n++);
break;
case 2:
if (n >= nValues) return;
xyz = values[n++];
break;
}
if (xyz != null) switch (tokType) {
case 1145047050:
this.setAtomCoord (i, xyz.x, xyz.y, xyz.z);
break;
case 1145047051:
this.at[i].setFractionalCoordTo (xyz, true);
this.taintAtom (i, 2);
break;
case 1145047053:
this.at[i].setFractionalCoordTo (xyz, false);
this.taintAtom (i, 2);
break;
case 1145047055:
this.setAtomVibrationVector (i, xyz);
break;
}
}
}, "JU.BS,~N,~O");
Clazz.defineMethod (c$, "setAtomVibrationVector", 
 function (atomIndex, vib) {
this.setVibrationVector (atomIndex, vib);
this.taintAtom (atomIndex, 12);
}, "~N,JU.T3");
Clazz.defineMethod (c$, "setAtomCoord", 
function (atomIndex, x, y, z) {
if (atomIndex < 0 || atomIndex >= this.ac) return;
var a = this.at[atomIndex];
a.set (x, y, z);
this.fixTrajectory (a);
this.taintAtom (atomIndex, 2);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "fixTrajectory", 
 function (a) {
if ((this).isTrajectory (a.mi)) this.trajectory.fixAtom (a);
}, "JM.Atom");
Clazz.defineMethod (c$, "setAtomCoordRelative", 
function (atomIndex, x, y, z) {
if (atomIndex < 0 || atomIndex >= this.ac) return;
var a = this.at[atomIndex];
a.add3 (x, y, z);
this.fixTrajectory (a);
this.taintAtom (atomIndex, 2);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAtomsCoordRelative", 
function (bs, x, y, z) {
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.setAtomCoordRelative (i, x, y, z);

}, "JU.BS,~N,~N,~N");
Clazz.defineMethod (c$, "setAPa", 
function (bs, tok, iValue, fValue, sValue, values, list) {
var n = 0;
if (values != null && values.length == 0 || bs == null) return;
var isAll = (values != null && values.length == this.ac || list != null && list.length == this.ac);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (isAll) n = i;
if (values != null) {
if (n >= values.length) return;
fValue = values[n++];
if (Float.isNaN (fValue)) continue;
iValue = Clazz.floatToInt (fValue);
} else if (list != null) {
if (n >= list.length) return;
sValue = list[n++];
}var atom = this.at[i];
var f;
switch (tok) {
case 1086326786:
this.setAtomName (i, sValue, true);
break;
case 1086326785:
this.setAtomType (i, sValue);
break;
case 1086326788:
this.setChainID (i, sValue);
break;
case 1094715393:
this.setAtomNumber (i, iValue, true);
break;
case 1094713365:
this.setAtomSeqID (i, iValue);
break;
case 1111492609:
case 1111492629:
this.setAtomCoord (i, fValue, atom.y, atom.z);
break;
case 1111492610:
case 1111492630:
this.setAtomCoord (i, atom.x, fValue, atom.z);
break;
case 1111492611:
case 1111492631:
this.setAtomCoord (i, atom.x, atom.y, fValue);
break;
case 1111492626:
case 1111492627:
case 1111492628:
this.setVibrationVector2 (i, tok, fValue);
break;
case 1111492612:
case 1111492613:
case 1111492614:
atom.setFractionalCoord (tok, fValue, true);
this.taintAtom (i, 2);
break;
case 1111492615:
case 1111492616:
case 1111492617:
atom.setFractionalCoord (tok, fValue, false);
this.taintAtom (i, 2);
break;
case 1094715402:
case 1086326789:
this.setElement (atom, iValue, true);
break;
case 1631586315:
this.resetPartialCharges ();
atom.setFormalCharge (iValue);
this.taintAtom (i, 4);
break;
case 1113589786:
this.setHydrophobicity (i, fValue);
break;
case 1128269825:
f = (fValue < 2 && fValue >= 0.01 ? 100 * fValue : fValue);
this.setOccupancy (i, f, true);
break;
case 1111492619:
this.setPartialCharge (i, fValue, true);
break;
case 1111492618:
this.setBondingRadius (i, fValue);
break;
case 1111492620:
this.setBFactor (i, fValue, true);
break;
case 1094715412:
this.setAtomResno (i, iValue);
break;
case 1825200146:
case 1287653388:
this.vwr.shm.setAtomLabel (sValue, i);
break;
case 1665140738:
case 1112152075:
f = fValue;
if (f < 0) f = 0;
 else if (f > 16) f = 16.1;
atom.madAtom = (Clazz.floatToShort (f * 2000));
break;
case 1113589787:
this.vwr.slm.setSelectedAtom (atom.i, (fValue != 0));
break;
case 1094715417:
atom.setValence (iValue);
this.taintAtom (i, 10);
break;
case 1648363544:
if (atom.setRadius (fValue)) this.taintAtom (i, 11);
 else this.untaint (i, 11);
break;
default:
JU.Logger.error ("unsettable atom property: " + JS.T.nameOf (tok));
return;
}
}
switch (tok) {
case 1113589787:
this.vwr.slm.setSelectedAtom (-1, false);
break;
case 1665140738:
case 1112152075:
this.vwr.setShapeSize (0, 2147483647, bs);
}
}, "JU.BS,~N,~N,~N,~S,~A,~A");
Clazz.defineMethod (c$, "getVibCoord", 
function (atomIndex, c) {
var ms = null;
var v = null;
switch (c) {
case 'x':
case 'y':
case 'z':
v = this.getVibration (atomIndex, false);
break;
default:
ms = this.getModulation (atomIndex);
if (ms != null) {
v = ms.getVibration (false);
if (v == null) v = ms;
}}
if (v == null && ms == null) return NaN;
switch (c) {
case 'x':
case 'X':
return v.x;
case 'y':
case 'Y':
return v.y;
case 'z':
case 'Z':
return v.z;
case 'O':
return (ms.getModulation ('O', null)).floatValue ();
case '1':
case '2':
case '3':
var t = ms.getModulation ('T', null);
var x = (c == '1' ? t.x : c == '2' ? t.y : t.z);
return (x - Math.floor (x));
default:
return NaN;
}
}, "~N,~S");
Clazz.defineMethod (c$, "getVibration", 
function (atomIndex, forceNew) {
var v = (this.vibrations == null ? null : this.vibrations[atomIndex]);
return (Clazz.instanceOf (v, J.api.JmolModulationSet) ? (v).getVibration (forceNew) : v == null && forceNew ?  new JU.Vibration () : v);
}, "~N,~B");
Clazz.defineMethod (c$, "getModulation", 
function (iAtom) {
var v = (this.vibrations == null ? null : this.vibrations[iAtom]);
return (v != null && v.modDim > 0 ? v : null);
}, "~N");
Clazz.defineMethod (c$, "setVibrationVector", 
function (atomIndex, vib) {
if (Float.isNaN (vib.x) || Float.isNaN (vib.y) || Float.isNaN (vib.z)) return;
if (this.vibrations == null || this.vibrations.length < atomIndex) this.vibrations =  new Array (this.at.length);
if (Clazz.instanceOf (vib, JU.Vibration)) {
this.vibrations[atomIndex] = vib;
} else {
if (this.vibrations[atomIndex] == null) this.vibrations[atomIndex] =  new JU.Vibration ();
this.vibrations[atomIndex].setXYZ (vib);
}this.at[atomIndex].setVibrationVector ();
}, "~N,JU.T3");
Clazz.defineMethod (c$, "setVibrationVector2", 
 function (atomIndex, tok, fValue) {
var v = this.getVibration (atomIndex, true);
if (v == null) return;
switch (tok) {
case 1111492626:
v.x = fValue;
break;
case 1111492627:
v.y = fValue;
break;
case 1111492628:
v.z = fValue;
break;
}
this.setAtomVibrationVector (atomIndex, v);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setAtomName", 
function (atomIndex, name, doTaint) {
if (doTaint && name.equals (this.at[atomIndex].getAtomName ())) return;
var id = ((this).am[this.at[atomIndex].mi].isBioModel ? this.vwr.getJBR ().lookupSpecialAtomID (name) : 0);
this.at[atomIndex].atomID = id;
if (id <= 0) {
if (this.atomNames == null) this.atomNames =  new Array (this.at.length);
this.atomNames[atomIndex] = name;
}if (doTaint) this.taintAtom (atomIndex, 0);
}, "~N,~S,~B");
Clazz.defineMethod (c$, "setAtomType", 
 function (atomIndex, type) {
if (type.equals (this.at[atomIndex].getAtomType ())) return;
if (this.atomTypes == null) this.atomTypes =  new Array (this.at.length);
this.atomTypes[atomIndex] = type;
return;
}, "~N,~S");
Clazz.defineMethod (c$, "setChainID", 
 function (atomIndex, id) {
if (id.equals (this.at[atomIndex].getChainIDStr ())) return;
var intid = this.at[atomIndex].getChainID ();
var bs = this.getChainBits (intid);
var c = this.at[atomIndex].group.chain;
c.chainID = this.vwr.getChainID (id, true);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.taintAtom (i, 16);

}, "~N,~S");
Clazz.defineMethod (c$, "setAtomNumber", 
function (atomIndex, atomno, doTaint) {
if (doTaint && atomno == this.at[atomIndex].getAtomNumber ()) return;
if (this.atomSerials == null) this.atomSerials =  Clazz.newIntArray (this.at.length, 0);
this.atomSerials[atomIndex] = atomno;
if (doTaint) this.taintAtom (atomIndex, 13);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "setElement", 
function (atom, atomicNumber, doTaint) {
if (doTaint && atom.getElementNumber () == atomicNumber) return;
atom.setAtomicAndIsotopeNumber (atomicNumber);
atom.paletteID = J.c.PAL.CPK.id;
atom.colixAtom = this.vwr.cm.getColixAtomPalette (atom, J.c.PAL.CPK.id);
this.resetPartialCharges ();
if (doTaint) this.taintAtom (atom.i, 3);
}, "JM.Atom,~N,~B");
Clazz.defineMethod (c$, "resetPartialCharges", 
 function () {
this.partialCharges = null;
this.bsPartialCharges = null;
});
Clazz.defineMethod (c$, "setAtomResno", 
 function (atomIndex, resno) {
if (resno == this.at[atomIndex].getResno ()) return;
this.at[atomIndex].group.setResno (resno);
if (this.atomResnos == null) this.atomResnos =  Clazz.newIntArray (this.at.length, 0);
this.atomResnos[atomIndex] = resno;
this.taintAtom (atomIndex, 15);
}, "~N,~N");
Clazz.defineMethod (c$, "setAtomSeqID", 
 function (atomIndex, seqID) {
if (seqID == this.at[atomIndex].getSeqID ()) return;
if (this.atomSeqIDs == null) this.atomSeqIDs =  Clazz.newIntArray (this.at.length, 0);
this.atomSeqIDs[atomIndex] = seqID;
this.taintAtom (atomIndex, 14);
}, "~N,~N");
Clazz.defineMethod (c$, "setOccupancy", 
function (atomIndex, occupancy, doTaint) {
if (doTaint && occupancy == this.at[atomIndex].getOccupancy100 ()) return;
if (this.occupancies == null) {
if (occupancy == 100) return;
this.occupancies =  Clazz.newFloatArray (this.at.length, 0);
for (var i = this.at.length; --i >= 0; ) this.occupancies[i] = 100;

}this.occupancies[atomIndex] = occupancy;
if (doTaint) this.taintAtom (atomIndex, 7);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "setPartialCharge", 
function (atomIndex, partialCharge, doTaint) {
if (Float.isNaN (partialCharge)) return;
if (this.partialCharges == null) {
this.bsPartialCharges =  new JU.BS ();
if (partialCharge == 0) return;
this.partialCharges =  Clazz.newFloatArray (this.at.length, 0);
}this.bsPartialCharges.set (atomIndex);
this.partialCharges[atomIndex] = partialCharge;
if (doTaint) this.taintAtom (atomIndex, 8);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "setBondingRadius", 
 function (atomIndex, radius) {
if (Float.isNaN (radius) || radius == this.at[atomIndex].getBondingRadius ()) return;
if (this.bondingRadii == null) this.bondingRadii =  Clazz.newFloatArray (this.at.length, 0);
this.bondingRadii[atomIndex] = radius;
this.taintAtom (atomIndex, 6);
}, "~N,~N");
Clazz.defineMethod (c$, "setBFactor", 
function (atomIndex, bfactor, doTaint) {
if (Float.isNaN (bfactor) || doTaint && bfactor == this.at[atomIndex].getBfactor100 ()) return;
if (this.bfactor100s == null) {
if (bfactor == 0) return;
this.bfactor100s =  Clazz.newShortArray (this.at.length, 0);
}this.bfactor100s[atomIndex] = Clazz.doubleToShort ((bfactor < -327.68 ? -327.68 : bfactor > 327.67 ? 327.67 : bfactor) * 100 + (bfactor < 0 ? -0.5 : 0.5));
if (doTaint) this.taintAtom (atomIndex, 9);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "setHydrophobicity", 
 function (atomIndex, value) {
if (Float.isNaN (value) || value == this.at[atomIndex].getHydrophobicity ()) return;
if (this.hydrophobicities == null) {
this.hydrophobicities =  Clazz.newFloatArray (this.at.length, 0);
for (var i = 0; i < this.at.length; i++) this.hydrophobicities[i] = JU.Elements.getHydrophobicity (this.at[i].group.groupID);

}this.hydrophobicities[atomIndex] = value;
this.taintAtom (atomIndex, 5);
}, "~N,~N");
Clazz.defineMethod (c$, "setAtomData", 
function (type, name, dataString, isDefault) {
var fData = null;
var bs = null;
switch (type) {
case 2:
this.loadCoordinates (dataString, false, !isDefault);
return;
case 12:
this.loadCoordinates (dataString, true, true);
return;
case 17:
fData =  Clazz.newFloatArray (this.ac, 0);
bs = JU.BS.newN (this.ac);
break;
}
var lines = JU.Parser.markLines (dataString, ';');
var n = 0;
try {
var nData = JU.PT.parseInt (dataString.substring (0, lines[0] - 1));
for (var i = 1; i <= nData; i++) {
var tokens = JU.PT.getTokens (JU.PT.parseTrimmed (dataString.substring (lines[i], lines[i + 1] - 1)));
var atomIndex = JU.PT.parseInt (tokens[0]) - 1;
if (atomIndex < 0 || atomIndex >= this.ac) continue;
var atom = this.at[atomIndex];
n++;
var pt = tokens.length - 1;
var x = JU.PT.parseFloat (tokens[pt]);
switch (type) {
case 17:
fData[atomIndex] = x;
bs.set (atomIndex);
continue;
case 0:
this.setAtomName (atomIndex, tokens[pt], true);
break;
case 13:
this.setAtomNumber (atomIndex, Clazz.floatToInt (x), true);
break;
case 15:
this.setAtomResno (atomIndex, Clazz.floatToInt (x));
break;
case 14:
this.setAtomSeqID (atomIndex, Clazz.floatToInt (x));
break;
case 1:
this.setAtomType (atomIndex, tokens[pt]);
break;
case 16:
this.setChainID (atomIndex, tokens[pt]);
break;
case 3:
atom.setAtomicAndIsotopeNumber (Clazz.floatToInt (x));
atom.paletteID = J.c.PAL.CPK.id;
atom.colixAtom = this.vwr.cm.getColixAtomPalette (atom, J.c.PAL.CPK.id);
break;
case 4:
atom.setFormalCharge (Clazz.floatToInt (x));
break;
case 5:
this.setHydrophobicity (atomIndex, x);
break;
case 6:
this.setBondingRadius (atomIndex, x);
break;
case 8:
this.setPartialCharge (atomIndex, x, true);
break;
case 9:
this.setBFactor (atomIndex, x, true);
break;
case 10:
atom.setValence (Clazz.floatToInt (x));
break;
case 11:
atom.setRadius (x);
break;
}
this.taintAtom (atomIndex, type);
}
if (type == 17 && n > 0) this.vwr.setData (name,  Clazz.newArray (-1, [name, fData, bs, Integer.$valueOf (1)]), 0, 0, 0, 0, 0);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("AtomCollection.loadData error: " + e);
} else {
throw e;
}
}
}, "~N,~S,~S,~B");
Clazz.defineMethod (c$, "loadCoordinates", 
 function (data, isVibrationVectors, doTaint) {
var lines = JU.Parser.markLines (data, ';');
var v = (isVibrationVectors ?  new JU.V3 () : null);
try {
var nData = JU.PT.parseInt (data.substring (0, lines[0] - 1));
for (var i = 1; i <= nData; i++) {
var tokens = JU.PT.getTokens (JU.PT.parseTrimmed (data.substring (lines[i], lines[i + 1])));
var atomIndex = JU.PT.parseInt (tokens[0]) - 1;
var x = (tokens[3].equalsIgnoreCase ("1.4E-45") ? 1.4e-45 : JU.PT.parseFloat (tokens[3]));
var y = (tokens[4].equalsIgnoreCase ("1.4E-45") ? 1.4e-45 : JU.PT.parseFloat (tokens[4]));
var z = JU.PT.parseFloat (tokens[5]);
if (isVibrationVectors) {
v.set (x, y, z);
this.setAtomVibrationVector (atomIndex, v);
} else {
this.setAtomCoord (atomIndex, x, y, z);
if (!doTaint) this.untaint (atomIndex, 2);
}}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Frame.loadCoordinate error: " + e);
} else {
throw e;
}
}
}, "~S,~B,~B");
Clazz.defineMethod (c$, "validateBspf", 
function (isValid) {
if (this.bspf != null) this.bspf.isValid = isValid;
}, "~B");
Clazz.defineMethod (c$, "validateBspfForModel", 
function (modelIndex, isValid) {
if (this.bspf != null) this.bspf.validateModel (modelIndex, isValid);
}, "~N,~B");
Clazz.defineMethod (c$, "setPreserveState", 
function (TF) {
this.preserveState = TF;
}, "~B");
c$.getUserSettableType = Clazz.defineMethod (c$, "getUserSettableType", 
function (dataType) {
var isExplicit = (dataType.indexOf ("property_") == 0);
var check = (isExplicit ? dataType.substring (9) : dataType);
for (var i = 0; i < 17; i++) if (JM.AtomCollection.userSettableValues[i].equalsIgnoreCase (check)) return i;

return (isExplicit ? 17 : -1);
}, "~S");
Clazz.defineMethod (c$, "getTaintedAtoms", 
function (type) {
return this.tainted == null ? null : this.tainted[type];
}, "~N");
Clazz.defineMethod (c$, "taintAtoms", 
function (bsAtoms, type) {
this.canSkipLoad = false;
if (!this.preserveState) return;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) this.taintAtom (i, type);

}, "JU.BS,~N");
Clazz.defineMethod (c$, "taintAtom", 
function (atomIndex, type) {
if (this.preserveState) {
if (this.tainted == null) this.tainted =  new Array (17);
if (this.tainted[type] == null) this.tainted[type] = JU.BS.newN (this.ac);
this.tainted[type].set (atomIndex);
}if (type == 2) this.taintModelCoord (atomIndex);
}, "~N,~N");
Clazz.defineMethod (c$, "taintModelCoord", 
 function (atomIndex) {
var m = (this).am[this.at[atomIndex].mi];
this.validateBspfForModel (m.trajectoryBaseIndex, false);
if (m.isBioModel) m.resetDSSR (true);
this.pointGroup = null;
}, "~N");
Clazz.defineMethod (c$, "untaint", 
 function (atomIndex, type) {
if (!this.preserveState) return;
if (this.tainted == null || this.tainted[type] == null) return;
this.tainted[type].clear (atomIndex);
}, "~N,~N");
Clazz.defineMethod (c$, "setTaintedAtoms", 
function (bs, type) {
if (this.preserveState) {
if (bs == null) {
if (this.tainted == null) return;
this.tainted[type] = null;
return;
}if (this.tainted == null) this.tainted =  new Array (17);
if (this.tainted[type] == null) this.tainted[type] = JU.BS.newN (this.ac);
JU.BSUtil.copy2 (bs, this.tainted[type]);
}if (type == 2) {
var i = bs.nextSetBit (0);
if (i >= 0) this.taintModelCoord (i);
}}, "JU.BS,~N");
Clazz.defineMethod (c$, "unTaintAtoms", 
function (bs, type) {
if (this.tainted == null || this.tainted[type] == null) return;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.tainted[type].clear (i);

if (this.tainted[type].nextSetBit (0) < 0) this.tainted[type] = null;
}, "JU.BS,~N");
Clazz.defineMethod (c$, "findNearest2", 
function (x, y, closest, bsNot, min) {
var champion = null;
for (var i = this.ac; --i >= 0; ) {
if (bsNot != null && bsNot.get (i)) continue;
var contender = this.at[i];
if (contender.isClickable () && this.isCursorOnTopOf (contender, x, y, min, champion)) champion = contender;
}
closest[0] = champion;
}, "~N,~N,~A,JU.BS,~N");
Clazz.defineMethod (c$, "isCursorOnTopOf", 
function (contender, x, y, radius, champion) {
return contender.sZ > 1 && !this.g3d.isClippedZ (contender.sZ) && this.g3d.isInDisplayRange (contender.sX, contender.sY) && contender.isCursorOnTopOf (x, y, radius, champion);
}, "JM.Atom,~N,~N,~N,JM.Atom");
Clazz.defineMethod (c$, "fillADa", 
function (atomData, mode) {
atomData.xyz = atomData.atoms = this.at;
atomData.ac = this.ac;
atomData.atomicNumber =  Clazz.newIntArray (this.ac, 0);
var includeRadii = ((mode & 2) != 0);
if (includeRadii) atomData.atomRadius =  Clazz.newFloatArray (this.ac, 0);
var isMultiModel = ((mode & 16) != 0);
for (var i = 0; i < this.ac; i++) {
var atom = this.at[i];
if (atom.isDeleted () || !isMultiModel && atomData.modelIndex >= 0 && atom.mi != atomData.firstModelIndex) {
if (atomData.bsIgnored == null) atomData.bsIgnored =  new JU.BS ();
atomData.bsIgnored.set (i);
continue;
}atomData.atomicNumber[i] = atom.getElementNumber ();
atomData.lastModelIndex = atom.mi;
if (includeRadii) atomData.atomRadius[i] = this.getWorkingRadius (atom, atomData);
}
}, "J.atomdata.AtomData,~N");
Clazz.defineMethod (c$, "getWorkingRadius", 
 function (atom, atomData) {
var r = 0;
var rd = atomData.radiusData;
switch (rd.factorType) {
case J.atomdata.RadiusData.EnumType.ABSOLUTE:
r = rd.value;
break;
case J.atomdata.RadiusData.EnumType.FACTOR:
case J.atomdata.RadiusData.EnumType.OFFSET:
switch (rd.vdwType) {
case J.c.VDW.BONDING:
r = atom.getBondingRadius ();
break;
case J.c.VDW.ADPMAX:
r = atom.getADPMinMax (true);
break;
case J.c.VDW.ADPMIN:
r = atom.getADPMinMax (false);
break;
default:
r = atom.getVanderwaalsRadiusFloat (this.vwr, atomData.radiusData.vdwType);
}
if (rd.factorType === J.atomdata.RadiusData.EnumType.FACTOR) r *= rd.value;
 else r += rd.value;
}
return r + rd.valueExtended;
}, "JM.Atom,J.atomdata.AtomData");
Clazz.defineMethod (c$, "calculateHydrogens", 
function (bs, nTotal, doAll, justCarbon, vConnect) {
var z =  new JU.V3 ();
var x =  new JU.V3 ();
var hAtoms =  new Array (this.ac);
var bsDeleted = this.vwr.slm.bsDeleted;
var pt;
var nH = 0;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (bsDeleted != null && bsDeleted.get (i)) continue;
var atom = this.at[i];
var atomicNumber = atom.getElementNumber ();
if (justCarbon && atomicNumber != 6) continue;
var dHX = (atomicNumber <= 6 ? 1.1 : atomicNumber <= 10 ? 1.0 : 1.3);
switch (atomicNumber) {
case 7:
case 8:
dHX = 1.0;
break;
case 6:
}
if (doAll && atom.getCovalentHydrogenCount () > 0) continue;
var n = this.getMissingHydrogenCount (atom, false);
if (n == 0) continue;
var targetValence = this.aaRet[0];
var hybridization = this.aaRet[2];
var nBonds = this.aaRet[3];
if (nBonds == 0 && atom.isHetero ()) continue;
hAtoms[i] =  new Array (n);
var hPt = 0;
if (nBonds == 0) {
switch (n) {
case 4:
z.set (0.635, 0.635, 0.635);
pt = JU.P3.newP (z);
pt.add (atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
case 3:
z.set (-0.635, -0.635, 0.635);
pt = JU.P3.newP (z);
pt.add (atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
case 2:
z.set (-0.635, 0.635, -0.635);
pt = JU.P3.newP (z);
pt.add (atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
case 1:
z.set (0.635, -0.635, -0.635);
pt = JU.P3.newP (z);
pt.add (atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
}
} else {
switch (n) {
default:
break;
case 3:
this.getHybridizationAndAxes (i, atomicNumber, z, x, "sp3b", false, true);
pt =  new JU.P3 ();
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
this.getHybridizationAndAxes (i, atomicNumber, z, x, "sp3c", false, true);
pt =  new JU.P3 ();
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
this.getHybridizationAndAxes (i, atomicNumber, z, x, "sp3d", false, true);
pt =  new JU.P3 ();
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
break;
case 2:
var isEne = (hybridization == 2 || atomicNumber == 5 || nBonds == 1 && targetValence == 4 || atomicNumber == 7 && this.isAdjacentSp2 (atom));
this.getHybridizationAndAxes (i, atomicNumber, z, x, (isEne ? "sp2b" : targetValence == 3 ? "sp3c" : "lpa"), false, true);
pt = JU.P3.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
this.getHybridizationAndAxes (i, atomicNumber, z, x, (isEne ? "sp2c" : targetValence == 3 ? "sp3d" : "lpb"), false, true);
pt = JU.P3.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
break;
case 1:
switch (targetValence - nBonds) {
case 1:
if (atomicNumber == 8 && atom === atom.group.getCarbonylOxygenAtom ()) {
hAtoms[i] = null;
continue;
}if (this.getHybridizationAndAxes (i, atomicNumber, z, x, (hybridization == 2 || atomicNumber == 5 || atomicNumber == 7 && (atom.group.getNitrogenAtom () === atom || this.isAdjacentSp2 (atom)) ? "sp2c" : "sp3d"), true, false) != null) {
pt = JU.P3.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
} else {
hAtoms[i] =  new Array (0);
}break;
case 2:
this.getHybridizationAndAxes (i, atomicNumber, z, x, (targetValence == 4 ? "sp2c" : "sp2b"), false, false);
pt = JU.P3.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
break;
case 3:
this.getHybridizationAndAxes (i, atomicNumber, z, x, "spb", false, true);
pt = JU.P3.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.addLast (atom);
break;
}
}
}nH += hPt;
}
nTotal[0] = nH;
return hAtoms;
}, "JU.BS,~A,~B,~B,JU.Lst");
Clazz.defineMethod (c$, "isAdjacentSp2", 
 function (atom) {
var bonds = atom.bonds;
for (var i = 0; i < bonds.length; i++) {
var b2 = bonds[i].getOtherAtom (atom).bonds;
for (var j = 0; j < b2.length; j++) switch (b2[j].order) {
case 515:
case 514:
case 2:
case 3:
return true;
}

}
return false;
}, "JM.Atom");
Clazz.defineMethod (c$, "getMissingHydrogenCount", 
function (atom, allowNegative) {
var targetCount = atom.getTargetValence ();
if (targetCount < 0) return 0;
var charge = atom.getFormalCharge ();
var valence = atom.getValence ();
var model = (this).am[atom.mi];
var s = (model.isBioModel && !model.isPdbWithMultipleBonds ? atom.group.getGroup3 () : null);
if (this.aaRet == null) this.aaRet =  Clazz.newIntArray (5, 0);
this.aaRet[0] = targetCount;
this.aaRet[1] = charge;
this.aaRet[2] = 0;
this.aaRet[3] = atom.getCovalentBondCount ();
this.aaRet[4] = (s == null ? 0 : valence);
if (s != null && charge == 0) {
if (this.bioModelset.getAminoAcidValenceAndCharge (s, atom.getAtomName (), this.aaRet)) {
targetCount = this.aaRet[0];
charge = this.aaRet[1];
}}if (charge != 0) {
targetCount += (targetCount == 4 ? -Math.abs (charge) : charge);
this.aaRet[0] = targetCount;
}var n = targetCount - valence;
return (n < 0 && !allowNegative ? 0 : n);
}, "JM.Atom,~B");
Clazz.defineMethod (c$, "fixFormalCharges", 
function (bs) {
var n = 0;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var a = this.at[i];
var nH = this.getMissingHydrogenCount (a, true);
if (nH != 0) {
var c0 = a.getFormalCharge ();
var c = c0 - nH;
a.setFormalCharge (c);
this.taintAtom (i, 4);
if (JU.Logger.debugging) JU.Logger.debug ("atom " + a + " formal charge " + c0 + " -> " + c);
n++;
}}
return n;
}, "JU.BS");
Clazz.defineMethod (c$, "getHybridizationAndAxes", 
function (atomIndex, atomicNumber, z, x, lcaoTypeRaw, hybridizationCompatible, doAlignZ) {
var lcaoType = (lcaoTypeRaw.length > 0 && lcaoTypeRaw.charAt (0) == '-' ? lcaoTypeRaw.substring (1) : lcaoTypeRaw);
if (lcaoTypeRaw.indexOf ("d") >= 0 && !lcaoTypeRaw.endsWith ("sp3d")) return this.getHybridizationAndAxesD (atomIndex, z, x, lcaoType);
var atom = this.at[atomIndex];
if (atomicNumber == 0) atomicNumber = atom.getElementNumber ();
var attached = this.getAttached (atom, 4, hybridizationCompatible);
var nAttached = attached.length;
var pt = lcaoType.charCodeAt (lcaoType.length - 1) - 97;
if (pt < 0 || pt > 6) pt = 0;
z.set (0, 0, 0);
x.set (0, 0, 0);
var v =  new Array (4);
for (var i = 0; i < nAttached; i++) {
v[i] = JU.V3.newVsub (atom, attached[i]);
v[i].normalize ();
z.add (v[i]);
}
if (nAttached > 0) x.setT (v[0]);
var isPlanar = false;
var vTemp =  new JU.V3 ();
if (nAttached >= 3) {
if (x.angle (v[1]) < 2.984513) vTemp.cross (x, v[1]);
 else vTemp.cross (x, v[2]);
vTemp.normalize ();
var vTemp2 =  new JU.V3 ();
if (v[1].angle (v[2]) < 2.984513) vTemp2.cross (v[1], v[2]);
 else vTemp2.cross (x, v[2]);
vTemp2.normalize ();
isPlanar = (Math.abs (vTemp2.dot (vTemp)) >= 0.95);
}var isSp3 = (lcaoType.indexOf ("sp3") == 0);
var isSp2 = (!isSp3 && lcaoType.indexOf ("sp2") == 0);
var isSp = (!isSp3 && !isSp2 && lcaoType.indexOf ("sp") == 0);
var isP = (lcaoType.indexOf ("p") == 0);
var isLp = (lcaoType.indexOf ("lp") == 0);
var hybridization = null;
if (hybridizationCompatible) {
if (nAttached == 0) return null;
if (isSp3) {
if (pt > 3 || nAttached > 4) return null;
} else if (isSp2) {
if (pt > 2 || nAttached > 3) return null;
} else if (isSp) {
if (pt > 1 || nAttached > 2) return null;
}switch (nAttached) {
case 1:
if (atomicNumber == 1 && !isSp3) return null;
if (isSp3) {
hybridization = "sp3";
break;
}switch (attached[0].getCovalentBondCount ()) {
case 1:
if (attached[0].getValence () != 2) {
hybridization = "sp";
break;
}case 2:
hybridization = (isSp ? "sp" : "sp2");
break;
case 3:
if (!isSp2 && !isP) return null;
hybridization = "sp2";
break;
}
break;
case 2:
if (z.length () < 0.1) {
if (lcaoType.indexOf ("2") >= 0 || lcaoType.indexOf ("3") >= 0) return null;
hybridization = "sp";
break;
}hybridization = (isSp3 ? "sp3" : "sp2");
if (lcaoType.indexOf ("sp") == 0) {
break;
}if (isLp) {
hybridization = "lp";
break;
}hybridization = lcaoType;
break;
default:
if (isPlanar) {
hybridization = "sp2";
} else {
if (isLp && nAttached == 3) {
hybridization = "lp";
break;
}hybridization = "sp3";
}}
if (hybridization == null) return null;
if (lcaoType.indexOf ("p") == 0) {
if (hybridization === "sp3") return null;
} else if (lcaoType.indexOf (hybridization) < 0) {
return null;
}}if (pt < nAttached && !lcaoType.startsWith ("p") && !lcaoType.startsWith ("l")) {
z.sub2 (attached[pt], atom);
z.normalize ();
return hybridization;
}switch (nAttached) {
case 0:
if (lcaoType.equals ("sp3c") || lcaoType.equals ("sp2d") || lcaoType.equals ("lpa")) {
z.set (-0.5, -0.7, 1);
x.set (1, 0, 0);
} else if (lcaoType.equals ("sp3b") || lcaoType.equals ("lpb")) {
z.set (0.5, -0.7, -1.0);
x.set (1, 0, 0);
} else if (lcaoType.equals ("sp3a")) {
z.set (0, 1, 0);
x.set (1, 0, 0);
} else {
z.set (0, 0, 1);
x.set (1, 0, 0);
}break;
case 1:
vTemp.setT (JM.AtomCollection.vRef);
x.cross (vTemp, z);
if (isSp3) {
for (var i = attached[0].getBondCount (); --i >= 0; ) {
if (attached[0].bonds[i].isCovalent () && attached[0].getBondedAtomIndex (i) != atom.i) {
x.sub2 (attached[0], attached[0].bonds[i].getOtherAtom (attached[0]));
x.cross (z, x);
if (x.length () == 0) continue;
x.cross (x, z);
break;
}}
x.normalize ();
if (Float.isNaN (x.x)) {
x.setT (JM.AtomCollection.vRef);
x.cross (x, z);
}vTemp.cross (z, x);
vTemp.normalize ();
z.normalize ();
x.scaleAdd2 (2.828, x, z);
if (pt != 3) {
x.normalize ();
 new JU.M3 ().setAA (JU.A4.new4 (z.x, z.y, z.z, (pt == 2 ? 1 : -1) * 2.09439507)).rotate (x);
}z.setT (x);
x.cross (vTemp, z);
break;
}vTemp.cross (x, z);
switch (attached[0].getCovalentBondCount ()) {
case 1:
if (attached[0].getValence () != 2) {
break;
}case 2:
var isCumulated = false;
var a0 = attached[0];
x.setT (z);
vTemp.setT (JM.AtomCollection.vRef);
while (a0 != null && a0.getCovalentBondCount () == 2) {
var bonds = a0.bonds;
var a = null;
isCumulated = !isCumulated;
for (var i = 0; i < bonds.length; i++) if (bonds[i].isCovalent ()) {
a = bonds[i].getOtherAtom (a0);
if (a !== atom) {
vTemp.sub2 (a, a0);
break;
}}
vTemp.cross (vTemp, x);
if (vTemp.length () > 0.1 || a.getCovalentBondCount () != 2) break;
atom = a0;
a0 = a;
}
if (vTemp.length () > 0.1) {
z.cross (vTemp, x);
z.normalize ();
if (pt == 1) z.scale (-1);
z.scale (JM.AtomCollection.sqrt3_2);
z.scaleAdd2 (0.5, x, z);
if (isP) {
vTemp.cross (z, x);
z.setT (vTemp);
vTemp.setT (x);
}x.cross (vTemp, z);
} else {
z.setT (x);
x.cross (JM.AtomCollection.vRef, x);
}break;
case 3:
this.getHybridizationAndAxes (attached[0].i, 0, x, vTemp, "pz", false, doAlignZ);
vTemp.setT (x);
if (isSp2) {
x.cross (x, z);
if (pt == 1) x.scale (-1);
x.scale (JM.AtomCollection.sqrt3_2);
z.scaleAdd2 (0.5, z, x);
} else {
vTemp.setT (z);
z.setT (x);
}x.cross (vTemp, z);
break;
}
break;
case 2:
if (z.length () < 0.1) {
if (!lcaoType.equals ("pz")) {
var a = attached[0];
var ok = (a.getCovalentBondCount () == 3);
if (!ok) ok = ((a = attached[1]).getCovalentBondCount () == 3);
if (ok) {
this.getHybridizationAndAxes (a.i, 0, x, z, "pz", false, doAlignZ);
if (lcaoType.equals ("px")) x.scale (-1);
z.setT (v[0]);
break;
}vTemp.setT (JM.AtomCollection.vRef);
z.cross (vTemp, x);
vTemp.cross (z, x);
}z.setT (x);
x.cross (vTemp, z);
break;
}vTemp.cross (z, x);
if (isSp2) {
x.cross (z, vTemp);
break;
}if (isSp3 || isLp) {
vTemp.normalize ();
z.normalize ();
if (!lcaoType.equals ("lp")) {
if (pt == 0 || pt == 2) z.scaleAdd2 (-1.2, vTemp, z);
 else z.scaleAdd2 (1.2, vTemp, z);
}x.cross (z, vTemp);
break;
}x.cross (z, vTemp);
z.setT (vTemp);
if (z.z < 0) {
z.scale (-1);
x.scale (-1);
}break;
default:
if (isSp3) break;
if (!isPlanar) {
x.cross (z, x);
break;
}z.setT (vTemp);
if (z.z < 0 && doAlignZ) {
z.scale (-1);
x.scale (-1);
}}
x.normalize ();
z.normalize ();
return hybridization;
}, "~N,~N,JU.V3,JU.V3,~S,~B,~B");
Clazz.defineMethod (c$, "getHybridizationAndAxesD", 
 function (atomIndex, z, x, lcaoType) {
if (lcaoType.startsWith ("sp3d2")) lcaoType = "d2sp3" + (lcaoType.length == 5 ? "a" : lcaoType.substring (5));
if (lcaoType.startsWith ("sp3d")) lcaoType = "dsp3" + (lcaoType.length == 4 ? "a" : lcaoType.substring (4));
if (lcaoType.equals ("d2sp3") || lcaoType.equals ("dsp3")) lcaoType += "a";
var isTrigonal = lcaoType.startsWith ("dsp3");
var pt = lcaoType.charCodeAt (lcaoType.length - 1) - 97;
if (z != null && (!isTrigonal && (pt > 5 || !lcaoType.startsWith ("d2sp3")) || isTrigonal && pt > 4)) return null;
var atom = this.at[atomIndex];
var attached = this.getAttached (atom, 6, true);
if (attached == null) return (z == null ? null : "?");
var nAttached = attached.length;
if (nAttached < 3 && z != null) return null;
var isLP = (pt >= nAttached);
var nAngles = Clazz.doubleToInt (nAttached * (nAttached - 1) / 2);
var angles = JU.AU.newInt2 (nAngles);
var ntypes =  Clazz.newIntArray (3, 0);
var typePtrs =  Clazz.newIntArray (3, nAngles, 0);
var n = 0;
var _90 = 0;
var _120 = 1;
var _180 = 2;
var n120_atom0 = 0;
for (var i = 0; i < nAttached - 1; i++) for (var j = i + 1; j < nAttached; j++) {
var angle = JU.Measure.computeAngleABC (attached[i], atom, attached[j], true);
var itype = (angle < 105 ? _90 : angle >= 150 ? _180 : _120);
typePtrs[itype][ntypes[itype]] = n;
ntypes[itype]++;
angles[n++] =  Clazz.newIntArray (-1, [i, j]);
if (i == 0 && itype == _120) n120_atom0++;
}

n = ntypes[_90] * 100 + ntypes[_120] * 10 + ntypes[_180];
if (z == null) {
switch (n) {
default:
return "";
case 0:
return "";
case 1:
return "linear";
case 100:
case 10:
return "bent";
case 111:
case 201:
return "T-shaped";
case 30:
case 120:
case 210:
case 300:
if (Math.abs (JU.Measure.computeTorsion (attached[0], atom, attached[1], attached[2], true)) > 162) return "trigonal planar";
return "trigonal pyramidal";
case 330:
return (n120_atom0 % 2 == 1 ? "tetrahedral" : "uncapped trigonal pyramid");
case 60:
case 150:
case 240:
return "tetrahedral";
case 402:
return "square planar";
case 411:
case 501:
return "see-saw";
case 631:
return "trigonal bipyramidal";
case 802:
return "uncapped square pyramid";
case 1203:
return "octahedral";
}
}switch (n) {
default:
return null;
case 201:
break;
case 210:
case 330:
case 411:
case 631:
if (!isTrigonal) return null;
break;
case 300:
case 402:
case 501:
case 802:
case 1203:
if (isTrigonal) return null;
break;
}
if (isLP) {
var a;
var bs;
if (isTrigonal) {
switch (ntypes[_120]) {
case 0:
z.sub2 (attached[angles[typePtrs[_90][0]][0]], atom);
x.sub2 (attached[angles[typePtrs[_90][0]][1]], atom);
z.cross (z, x);
z.normalize ();
if (pt == 4) z.scale (-1);
bs = this.findNotAttached (nAttached, angles, typePtrs[_180], ntypes[_180]);
var i = bs.nextSetBit (0);
x.sub2 (attached[i], atom);
x.normalize ();
x.scale (0.5);
z.scaleAdd2 (JM.AtomCollection.sqrt3_2, z, x);
pt = -1;
break;
case 1:
if (pt == 4) {
a = angles[typePtrs[_120][0]];
z.add2 (attached[a[0]], attached[a[1]]);
z.scaleAdd2 (-2, atom, z);
pt = -1;
} else {
bs = this.findNotAttached (nAttached, angles, typePtrs[_120], ntypes[_120]);
pt = bs.nextSetBit (0);
}break;
default:
bs = this.findNotAttached (nAttached, angles, typePtrs[_120], ntypes[_120]);
pt = bs.nextSetBit (0);
}
} else {
var isPlanar = false;
if (nAttached == 4) {
switch (ntypes[_180]) {
case 1:
bs = this.findNotAttached (nAttached, angles, typePtrs[_180], ntypes[_180]);
var i = bs.nextSetBit (0);
if (pt == 4) pt = i;
 else pt = bs.nextSetBit (i + 1);
break;
default:
isPlanar = true;
}
} else {
bs = this.findNotAttached (nAttached, angles, typePtrs[_180], ntypes[_180]);
var i = bs.nextSetBit (0);
for (var j = nAttached; j < pt && i >= 0; j++) i = bs.nextSetBit (i + 1);

if (i == -1) isPlanar = true;
 else pt = i;
}if (isPlanar) {
z.sub2 (attached[angles[typePtrs[_90][0]][0]], atom);
x.sub2 (attached[angles[typePtrs[_90][0]][1]], atom);
z.cross (z, x);
if (pt == 4) z.scale (-1);
pt = -1;
}}}if (pt >= 0) z.sub2 (attached[pt], atom);
if (isLP) z.scale (-1);
z.normalize ();
return (isTrigonal ? "dsp3" : "d2sp3");
}, "~N,JU.V3,JU.V3,~S");
Clazz.defineMethod (c$, "getAttached", 
 function (atom, nMax, doSort) {
var nAttached = atom.getCovalentBondCount ();
if (nAttached > nMax) return null;
var attached =  new Array (nAttached);
if (nAttached > 0) {
var bonds = atom.bonds;
var n = 0;
for (var i = 0; i < bonds.length; i++) if (bonds[i].isCovalent ()) attached[n++] = bonds[i].getOtherAtom (atom);

if (doSort) java.util.Arrays.sort (attached, Clazz.innerTypeInstance (JM.AtomCollection.AtomSorter, this, null));
}return attached;
}, "JM.Atom,~N,~B");
Clazz.defineMethod (c$, "findNotAttached", 
 function (nAttached, angles, ptrs, nPtrs) {
var bs = JU.BS.newN (nAttached);
bs.setBits (0, nAttached);
for (var i = 0; i < nAttached; i++) for (var j = 0; j < nPtrs; j++) {
var a = angles[ptrs[j]];
if (a[0] == i || a[1] == i) bs.clear (i);
}

return bs;
}, "~N,~A,~A,~N");
Clazz.defineMethod (c$, "getAtomBitsMDa", 
function (tokType, specInfo, bs) {
var iSpec = (Clazz.instanceOf (specInfo, Integer) ? (specInfo).intValue () : 0);
switch (tokType) {
case 1086326786:
case 1086326785:
var isType = (tokType == 1086326785);
var names = "," + specInfo + ",";
for (var i = this.ac; --i >= 0; ) {
var s = (isType ? this.at[i].getAtomType () : this.at[i].getAtomName ());
if (names.indexOf ("," + s + ",") >= 0) bs.set (i);
}
return bs;
case 1094715393:
for (var i = this.ac; --i >= 0; ) if (this.at[i].getAtomNumber () == iSpec) bs.set (i);

return bs;
case 2097155:
for (var i = this.ac; --i >= 0; ) if (this.at[i].getCovalentBondCount () > 0) bs.set (i);

return bs;
case 2097188:
case 2097156:
case 136314895:
case 2097166:
case 2097168:
case 2097170:
case 2097172:
case 2097174:
case 2097184:
return ((this).haveBioModels ? (this).bioModelset.getAtomBitsBS (tokType, null, bs) : bs);
case 1612709900:
iSpec = 1;
case 1094715402:
for (var i = this.ac; --i >= 0; ) if (this.at[i].getElementNumber () == iSpec) bs.set (i);

return bs;
case 1612709894:
for (var i = this.ac; --i >= 0; ) if (this.at[i].isHetero ()) bs.set (i);

return bs;
case 1073741824:
return this.getIdentifierOrNull (specInfo);
case 2097165:
for (var i = this.ac; --i >= 0; ) if (this.at[i].isLeadAtom ()) bs.set (i);

return bs;
case 1094713362:
case 1639976963:
return ((this).haveBioModels ? (this).bioModelset.getAtomBitsBS (tokType, specInfo, bs) : bs);
case 1094715412:
for (var i = this.ac; --i >= 0; ) if (this.at[i].getResno () == iSpec) bs.set (i);

return bs;
case 1612709912:
var hs =  Clazz.newIntArray (2, 0);
var a;
for (var i = this.ac; --i >= 0; ) {
var g = this.at[i].group.groupID;
if (g >= 42 && g < 45) {
bs.set (i);
} else if ((a = this.at[i]).getElementNumber () == 8 && a.getCovalentBondCount () == 2) {
var bonds = a.bonds;
var n = 0;
var b;
for (var j = bonds.length; --j >= 0 && n < 3; ) if (bonds[j].isCovalent () && (b = bonds[j].getOtherAtom (a)).getElementNumber () == 1) hs[n++ % 2] = b.i;

if (n == 2) {
bs.set (hs[1]);
bs.set (hs[0]);
bs.set (i);
}}}
return bs;
case 1073742355:
var spec = specInfo;
for (var i = this.ac; --i >= 0; ) if (this.isAltLoc (this.at[i].altloc, spec)) bs.set (i);

return bs;
case 1073742356:
var atomSpec = (specInfo).toUpperCase ();
if (atomSpec.indexOf ("\\?") >= 0) atomSpec = JU.PT.rep (atomSpec, "\\?", "\1");
var allowStar = atomSpec.startsWith ("?*");
if (allowStar) atomSpec = atomSpec.substring (1);
for (var i = this.ac; --i >= 0; ) if (this.isAtomNameMatch (this.at[i], atomSpec, allowStar, allowStar)) bs.set (i);

return bs;
case 1073742357:
return JU.BSUtil.copy (this.getChainBits (iSpec));
case 1073742360:
return this.getSpecName (specInfo);
case 1073742361:
for (var i = this.ac; --i >= 0; ) if (this.at[i].group.groupID == iSpec) bs.set (i);

return bs;
case 1073742362:
return JU.BSUtil.copy (this.getSeqcodeBits (iSpec, true));
case 5:
for (var i = this.ac; --i >= 0; ) if (this.at[i].group.getInsCode () == iSpec) bs.set (i);

return bs;
case 1296041986:
for (var i = this.ac; --i >= 0; ) if (this.at[i].getSymOp () == iSpec) bs.set (i);

return bs;
}
var bsTemp;
var bsInfo = specInfo;
var i0 = bsInfo.nextSetBit (0);
if (i0 < 0) return bs;
switch (tokType) {
case 1094717454:
bsTemp = JU.BSUtil.copy (bsInfo);
for (var i = i0; i >= 0; i = bsTemp.nextSetBit (i + 1)) {
bs.or ((this).am[this.at[i].mi].bsAtoms);
bsTemp.andNot (bs);
}
return bs;
case 1086326788:
bsTemp = JU.BSUtil.copy (bsInfo);
for (var i = i0; i >= 0; i = bsTemp.nextSetBit (i + 1)) {
this.at[i].group.chain.setAtomBits (bs);
bsTemp.andNot (bs);
}
return bs;
case 1086326789:
bsTemp =  new JU.BS ();
for (var i = i0; i >= 0; i = bsInfo.nextSetBit (i + 1)) bsTemp.set (this.at[i].getElementNumber ());

for (var i = this.ac; --i >= 0; ) if (bsTemp.get (this.at[i].getElementNumber ())) bs.set (i);

return bs;
case 1086324742:
bsTemp = JU.BSUtil.copy (bsInfo);
for (var i = i0; i >= 0; i = bsTemp.nextSetBit (i + 1)) {
this.at[i].group.setAtomBits (bs);
bsTemp.andNot (bs);
}
return bs;
case 1094713366:
bsTemp =  new JU.BS ();
for (var i = i0; i >= 0; i = bsInfo.nextSetBit (i + 1)) bsTemp.set (this.at[i].atomSite);

for (var i = this.ac; --i >= 0; ) if (bsTemp.get (this.at[i].atomSite)) bs.set (i);

return bs;
}
JU.Logger.error ("MISSING getAtomBits entry for " + JS.T.nameOf (tokType));
return bs;
}, "~N,~O,JU.BS");
Clazz.defineMethod (c$, "getChainBits", 
function (chainID) {
var caseSensitive = this.vwr.getBoolean (603979822);
if (chainID >= 0 && chainID < 300 && !caseSensitive) chainID = this.chainToUpper (chainID);
var bs =  new JU.BS ();
var bsDone = JU.BS.newN (this.ac);
var id;
for (var i = bsDone.nextClearBit (0); i < this.ac; i = bsDone.nextClearBit (i + 1)) {
var chain = this.at[i].group.chain;
if (chainID == (id = chain.chainID) || !caseSensitive && id >= 0 && id < 300 && chainID == this.chainToUpper (id)) {
chain.setAtomBits (bs);
bsDone.or (bs);
} else {
chain.setAtomBits (bsDone);
}}
return bs;
}, "~N");
Clazz.defineMethod (c$, "chainToUpper", 
function (chainID) {
return (chainID >= 97 && chainID <= 122 ? chainID - 32 : chainID >= 256 && chainID < 300 ? chainID - 191 : chainID);
}, "~N");
Clazz.defineMethod (c$, "isAltLoc", 
 function (altloc, strPattern) {
if (strPattern == null) return (altloc == '\0');
if (strPattern.length != 1) return false;
var ch = strPattern.charAt (0);
return (ch == '*' || ch == '?' && altloc != '\0' || altloc == ch);
}, "~S,~S");
Clazz.defineMethod (c$, "getSeqcodeBits", 
function (seqcode, returnEmpty) {
var bs =  new JU.BS ();
var seqNum = JM.Group.getSeqNumberFor (seqcode);
var haveSeqNumber = (seqNum != 2147483647);
var isEmpty = true;
var insCode = JM.Group.getInsertionCodeChar (seqcode);
switch (insCode) {
case '?':
for (var i = this.ac; --i >= 0; ) {
var atomSeqcode = this.at[i].group.seqcode;
if ((!haveSeqNumber || seqNum == JM.Group.getSeqNumberFor (atomSeqcode)) && JM.Group.getInsertionCodeFor (atomSeqcode) != 0) {
bs.set (i);
isEmpty = false;
}}
break;
default:
for (var i = this.ac; --i >= 0; ) {
var atomSeqcode = this.at[i].group.seqcode;
if (seqcode == atomSeqcode || !haveSeqNumber && seqcode == JM.Group.getInsertionCodeFor (atomSeqcode) || insCode == '*' && seqNum == JM.Group.getSeqNumberFor (atomSeqcode)) {
bs.set (i);
isEmpty = false;
}}
}
return (!isEmpty || returnEmpty ? bs : null);
}, "~N,~B");
Clazz.defineMethod (c$, "getIdentifierOrNull", 
 function (identifier) {
var bs = this.getSpecNameOrNull (identifier, false);
if (identifier.indexOf ("\\?") >= 0) identifier = JU.PT.rep (identifier, "\\?", "\1");
return (bs != null || identifier.indexOf ("?") > 0 ? bs : identifier.indexOf ("*") > 0 ? this.getSpecNameOrNull (identifier, true) : (this).haveBioModels ? (this).bioModelset.getIdentifierOrNull (identifier) : null);
}, "~S");
Clazz.defineMethod (c$, "getSpecName", 
 function (name) {
var bs = this.getSpecNameOrNull (name, false);
if (bs != null) return bs;
if (name.indexOf ("*") > 0) bs = this.getSpecNameOrNull (name, true);
return (bs == null ?  new JU.BS () : bs);
}, "~S");
Clazz.defineMethod (c$, "getSpecNameOrNull", 
function (name, checkStar) {
var bs = null;
name = name.toUpperCase ();
if (name.indexOf ("\\?") >= 0) name = JU.PT.rep (name, "\\?", "\1");
var allowInitialStar = name.startsWith ("?*");
if (allowInitialStar) name = name.substring (1);
for (var i = this.ac; --i >= 0; ) {
var g3 = this.at[i].getGroup3 (true);
if (g3 != null && g3.length > 0) {
if (JU.PT.isMatch (g3, name, checkStar, true)) {
if (bs == null) bs = JU.BS.newN (i + 1);
bs.set (i);
while (--i >= 0 && this.at[i].getGroup3 (true).equals (g3)) bs.set (i);

i++;
}} else if (this.isAtomNameMatch (this.at[i], name, checkStar, allowInitialStar)) {
if (bs == null) bs = JU.BS.newN (i + 1);
bs.set (i);
}}
return bs;
}, "~S,~B");
Clazz.defineMethod (c$, "isAtomNameMatch", 
 function (atom, strPattern, checkStar, allowInitialStar) {
return JU.PT.isMatch (atom.getAtomName ().toUpperCase (), strPattern, checkStar, allowInitialStar);
}, "JM.Atom,~S,~B,~B");
Clazz.defineMethod (c$, "getAtomIndices", 
function (bs) {
var n = 0;
var indices =  Clazz.newIntArray (this.ac, 0);
for (var j = bs.nextSetBit (0); j >= 0 && j < this.ac; j = bs.nextSetBit (j + 1)) indices[j] = ++n;

return indices;
}, "JU.BS");
Clazz.defineMethod (c$, "getAtomsNearPlane", 
function (distance, plane) {
var bsResult =  new JU.BS ();
for (var i = this.ac; --i >= 0; ) {
var atom = this.at[i];
var d = JU.Measure.distanceToPlane (plane, atom);
if (distance > 0 && d >= -0.1 && d <= distance || distance < 0 && d <= 0.1 && d >= distance || distance == 0 && Math.abs (d) < 0.01) bsResult.set (atom.i);
}
return bsResult;
}, "~N,JU.P4");
Clazz.defineMethod (c$, "clearVisibleSets", 
function () {
this.haveBSVisible = false;
this.haveBSClickable = false;
});
Clazz.defineMethod (c$, "getAtomsInFrame", 
function (bsAtoms) {
this.clearVisibleSets ();
bsAtoms.clearAll ();
for (var i = this.ac; --i >= 0; ) if (this.at[i].isVisible (1)) bsAtoms.set (i);

}, "JU.BS");
Clazz.defineMethod (c$, "getVisibleSet", 
function (forceNew) {
if (forceNew) {
this.vwr.setModelVisibility ();
this.vwr.shm.finalizeAtoms (null, true);
} else if (this.haveBSVisible) {
return this.bsVisible;
}this.bsVisible.clearAll ();
for (var i = this.ac; --i >= 0; ) if (this.at[i].checkVisible ()) this.bsVisible.set (i);

if (this.vwr.shm.bsSlabbedInternal != null) this.bsVisible.andNot (this.vwr.shm.bsSlabbedInternal);
this.haveBSVisible = true;
return this.bsVisible;
}, "~B");
Clazz.defineMethod (c$, "getClickableSet", 
function (forceNew) {
if (forceNew) this.vwr.setModelVisibility ();
 else if (this.haveBSClickable) return this.bsClickable;
this.bsClickable.clearAll ();
for (var i = this.ac; --i >= 0; ) if (this.at[i].isClickable ()) this.bsClickable.set (i);

this.haveBSClickable = true;
return this.bsClickable;
}, "~B");
Clazz.defineMethod (c$, "isModulated", 
function (i) {
return this.bsModulated != null && this.bsModulated.get (i);
}, "~N");
Clazz.defineMethod (c$, "deleteModelAtoms", 
function (firstAtomIndex, nAtoms, bsAtoms) {
this.at = JU.AU.deleteElements (this.at, firstAtomIndex, nAtoms);
this.ac = this.at.length;
for (var j = firstAtomIndex; j < this.ac; j++) {
this.at[j].i = j;
this.at[j].mi--;
}
if (this.bsModulated != null) JU.BSUtil.deleteBits (this.bsModulated, bsAtoms);
this.deleteAtomTensors (bsAtoms);
this.atomNames = JU.AU.deleteElements (this.atomNames, firstAtomIndex, nAtoms);
this.atomTypes = JU.AU.deleteElements (this.atomTypes, firstAtomIndex, nAtoms);
this.atomResnos = JU.AU.deleteElements (this.atomResnos, firstAtomIndex, nAtoms);
this.atomSerials = JU.AU.deleteElements (this.atomSerials, firstAtomIndex, nAtoms);
this.atomSeqIDs = JU.AU.deleteElements (this.atomSeqIDs, firstAtomIndex, nAtoms);
this.dssrData = JU.AU.deleteElements (this.dssrData, firstAtomIndex, nAtoms);
this.bfactor100s = JU.AU.deleteElements (this.bfactor100s, firstAtomIndex, nAtoms);
this.hasBfactorRange = false;
this.occupancies = JU.AU.deleteElements (this.occupancies, firstAtomIndex, nAtoms);
this.resetPartialCharges ();
this.atomTensorList = JU.AU.deleteElements (this.atomTensorList, firstAtomIndex, nAtoms);
this.vibrations = JU.AU.deleteElements (this.vibrations, firstAtomIndex, nAtoms);
this.nSurfaceAtoms = 0;
this.bsSurface = null;
this.surfaceDistance100s = null;
if (this.tainted != null) for (var i = 0; i < 17; i++) JU.BSUtil.deleteBits (this.tainted[i], bsAtoms);

}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "getAtomIdentityInfo", 
function (i, info, ptTemp) {
info.put ("_ipt", Integer.$valueOf (i));
info.put ("atomIndex", Integer.$valueOf (i));
info.put ("atomno", Integer.$valueOf (this.at[i].getAtomNumber ()));
info.put ("info", this.getAtomInfo (i, null, ptTemp));
info.put ("sym", this.at[i].getElementSymbol ());
}, "~N,java.util.Map,JU.P3");
Clazz.defineMethod (c$, "getAtomTensorList", 
function (i) {
return (i < 0 || this.atomTensorList == null || i >= this.atomTensorList.length ? null : this.atomTensorList[i]);
}, "~N");
Clazz.defineMethod (c$, "deleteAtomTensors", 
 function (bsAtoms) {
if (this.atomTensors == null) return;
var toDelete =  new JU.Lst ();
for (var key, $key = this.atomTensors.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
var list = this.atomTensors.get (key);
for (var i = list.size (); --i >= 0; ) {
var t = list.get (i);
if (bsAtoms.get (t.atomIndex1) || t.atomIndex2 >= 0 && bsAtoms.get (t.atomIndex2)) list.removeItemAt (i);
}
if (list.size () == 0) toDelete.addLast (key);
}
for (var i = toDelete.size (); --i >= 0; ) this.atomTensors.remove (toDelete.get (i));

}, "JU.BS");
Clazz.defineMethod (c$, "setCapacity", 
function (nAtoms) {
this.atomCapacity += nAtoms;
}, "~N");
Clazz.defineMethod (c$, "setAtomTensors", 
function (atomIndex, list) {
if (list == null || list.size () == 0) return;
if (this.atomTensors == null) this.atomTensors =  new java.util.Hashtable ();
if (this.atomTensorList == null) this.atomTensorList =  new Array (this.at.length);
this.atomTensorList = JU.AU.ensureLength (this.atomTensorList, this.at.length);
this.atomTensorList[atomIndex] = JM.AtomCollection.getTensorList (list);
for (var i = list.size (); --i >= 0; ) {
var t = list.get (i);
t.atomIndex1 = atomIndex;
t.atomIndex2 = -1;
t.modelIndex = this.at[atomIndex].mi;
this.addTensor (t, t.type);
if (t.altType != null) this.addTensor (t, t.altType);
}
}, "~N,JU.Lst");
Clazz.defineMethod (c$, "addTensor", 
function (t, type) {
type = type.toLowerCase ();
var tensors = this.atomTensors.get (type);
if (tensors == null) {
this.atomTensors.put (type, tensors =  new JU.Lst ());
tensors.ensureCapacity (this.atomCapacity);
}tensors.addLast (t);
}, "JU.Tensor,~S");
c$.getTensorList = Clazz.defineMethod (c$, "getTensorList", 
 function (list) {
var pt = -1;
var haveTLS = false;
var n = list.size ();
for (var i = n; --i >= 0; ) {
var t = list.get (i);
if (t.forThermalEllipsoid) pt = i;
 else if (t.iType == 2) haveTLS = true;
}
var a =  new Array ((pt >= 0 || !haveTLS ? 0 : 1) + n);
if (pt >= 0) {
a[0] = list.get (pt);
if (list.size () == 1) return a;
}if (haveTLS) {
pt = 0;
for (var i = n; --i >= 0; ) {
var t = list.get (i);
if (t.forThermalEllipsoid) continue;
a[++pt] = t;
}
} else {
for (var i = 0; i < n; i++) a[i] = list.get (i);

}return a;
}, "JU.Lst");
Clazz.defineMethod (c$, "getAtomTensor", 
function (i, type) {
var tensors = this.getAtomTensorList (i);
if (tensors != null && type != null) {
type = type.toLowerCase ();
for (var j = 0; j < tensors.length; j++) {
var t = tensors[j];
if (t != null && (type.equals (t.type) || type.equals (t.altType))) return t;
}
}return null;
}, "~N,~S");
Clazz.defineMethod (c$, "getAllAtomTensors", 
function (type) {
if (this.atomTensors == null) return null;
if (type != null) return this.atomTensors.get (type.toLowerCase ());
var list =  new JU.Lst ();
for (var e, $e = this.atomTensors.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) list.addAll (e.getValue ());

return list;
}, "~S");
Clazz.defineMethod (c$, "scaleVectorsToMax", 
function (max) {
if (this.vibrations == null) return;
var m = 0;
var bsVib = JU.BS.newN (this.ac);
for (var i = this.vibrations.length; --i >= 0; ) {
var v = this.getVibration (i, false);
if (v != null && (v.modDim == -1 || v.modDim == -2)) {
m = Math.max (m, v.length ());
bsVib.set (i);
}}
if (m == max || m == 0) return;
m = max / m;
var ok = false;
for (var i = bsVib.nextSetBit (0); i >= 0; i = bsVib.nextSetBit (i + 1)) {
var v = this.getVibration (i, false);
var mod = this.getModulation (i);
if (mod == null) {
if (m == 0) return;
v.scale (m);
} else {
mod.scaleVibration (m);
}if (!ok) {
this.taintAtom (i, 12);
ok = true;
}}
this.tainted[12].or (bsVib);
}, "~N");
Clazz.defineMethod (c$, "getAtomsFromAtomNumberInFrame", 
function (atomNumber) {
var bs = this.vwr.getFrameAtoms ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) if (this.at[i].getAtomNumber () != atomNumber) bs.clear (i);

return bs;
}, "~N");
Clazz.defineMethod (c$, "generateCrystalClass", 
function (atomIndex, pt) {
var sym = (atomIndex < 0 || atomIndex >= this.ac ? null : this.at[atomIndex].getUnitCell ());
var isRandom = (pt != null && Float.isNaN (pt.x));
return (sym == null ?  new JU.Lst () : sym.generateCrystalClass (isRandom ? null : pt != null ? pt : this.at[atomIndex]));
}, "~N,JU.P3");
c$.$AtomCollection$AtomSorter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, JM.AtomCollection, "AtomSorter", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (a.i > b.i ? 1 : a.i < b.i ? -1 : 0);
}, "JM.Atom,JM.Atom");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"almost180", 2.984513);
c$.sqrt3_2 = c$.prototype.sqrt3_2 = (Math.sqrt (3) / 2);
c$.vRef = c$.prototype.vRef = JU.V3.new3 (3.14159, 2.71828, 1.41421);
Clazz.defineStatics (c$,
"userSettableValues", null,
"TAINT_ATOMNAME", 0,
"TAINT_ATOMTYPE", 1,
"TAINT_COORD", 2,
"TAINT_ELEMENT", 3,
"TAINT_FORMALCHARGE", 4,
"TAINT_HYDROPHOBICITY", 5,
"TAINT_BONDINGRADIUS", 6,
"TAINT_OCCUPANCY", 7,
"TAINT_PARTIALCHARGE", 8,
"TAINT_TEMPERATURE", 9,
"TAINT_VALENCE", 10,
"TAINT_VANDERWAALS", 11,
"TAINT_VIBRATION", 12,
"TAINT_ATOMNO", 13,
"TAINT_SEQID", 14,
"TAINT_RESNO", 15,
"TAINT_CHAIN", 16,
"TAINT_MAX", 17);
});
