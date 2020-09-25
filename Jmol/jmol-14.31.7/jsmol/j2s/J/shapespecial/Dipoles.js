Clazz.declarePackage ("J.shapespecial");
Clazz.load (["J.shape.Shape", "JU.P3"], "J.shapespecial.Dipoles", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "$.SB", "$.V3", "JS.T", "J.shapespecial.Dipole", "JU.C", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dipoleCount = 0;
this.dipoles = null;
this.currentDipole = null;
this.tempDipole = null;
this.startCoord = null;
this.endCoord = null;
this.dipoleValue = 0;
this.isUserValue = false;
this.isBond = false;
this.iHaveTwoEnds = false;
this.atomIndex1 = 0;
this.atomIndex2 = 0;
this.colix = 0;
this.calculatedDipole = null;
this.wildID = null;
this.mad = 0;
Clazz.instantialize (this, arguments);
}, J.shapespecial, "Dipoles", J.shape.Shape);
Clazz.prepareFields (c$, function () {
this.dipoles =  new Array (4);
this.startCoord =  new JU.P3 ();
this.endCoord =  new JU.P3 ();
});
Clazz.overrideMethod (c$, "initShape", 
function () {
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("init" === propertyName) {
this.tempDipole =  new J.shapespecial.Dipole ();
this.tempDipole.dipoleValue = 1;
this.tempDipole.mad = 10;
this.atomIndex1 = -1;
this.tempDipole.modelIndex = -1;
this.dipoleValue = 0;
this.calculatedDipole = null;
this.mad = -1;
this.isUserValue = this.isBond = this.iHaveTwoEnds = false;
return;
}if ("calculate" === propertyName) {
try {
this.calculatedDipole = this.vwr.calculateMolecularDipole (value);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
JU.Logger.info ("calculated molecular dipole = " + this.calculatedDipole + " " + (this.calculatedDipole == null ? "" : "" + this.calculatedDipole.length ()));
return;
}if ("thisID" === propertyName) {
this.wildID = null;
var thisID = value;
if (thisID == null || JU.PT.isWild (thisID)) {
this.currentDipole = null;
if (thisID != null) this.wildID = thisID.toUpperCase ();
return;
}this.currentDipole = this.findDipole (thisID);
if (this.currentDipole == null) this.currentDipole = this.allocDipole (thisID, "");
this.tempDipole = this.currentDipole;
if (thisID.equals ("molecular")) this.getMolecular (null);
return;
}if ("bonds" === propertyName) {
this.isBond = true;
this.currentDipole = null;
for (var i = this.dipoleCount; --i >= 0; ) if (this.isBondDipole (i)) return;

this.getBondDipoles ();
return;
}if ("all" === propertyName) {
this.tempDipole.lstDipoles =  new JU.Lst ();
return;
}if ("on" === propertyName) {
this.setPropertyTok (1073742335, this.isBond, 0, 0);
return;
}if ("off" === propertyName) {
this.setPropertyTok (1073742334, this.isBond, 0, 0);
return;
}if ("delete" === propertyName) {
if (this.wildID == null && this.currentDipole == null) {
this.clear (false);
return;
}this.setPropertyTok (12291, this.isBond, 0, 0);
return;
}if ("width" === propertyName) {
this.mad = this.tempDipole.mad = Clazz.floatToShort ((value).floatValue () * 1000);
if (this.currentDipole == null) this.setPropertyTok (659488, this.isBond, this.mad, 0);
return;
}if ("offset" === propertyName) {
var offset = this.tempDipole.offsetAngstroms = (value).floatValue ();
if (this.currentDipole == null) this.setPropertyTok (1611272194, this.isBond, 0, offset);
return;
}if ("offsetPt" === propertyName) {
this.tempDipole.offsetPt = value;
if (this.currentDipole != null) {
this.currentDipole.setOffsetPt (this.tempDipole.offsetPt);
}return;
}if ("offsetPercent" === propertyName) {
var offsetPercent = this.tempDipole.offsetPercent = (value).intValue ();
if (this.tempDipole.dipoleValue != 0) this.tempDipole.offsetAngstroms = offsetPercent / 100 * this.tempDipole.dipoleValue;
if (this.currentDipole == null) this.setPropertyTok (268435634, this.isBond, 0, offsetPercent / 100);
return;
}if ("offsetSide" === propertyName) {
var offsetSide = (value).floatValue ();
this.setPropertyTok (2097178, this.isBond, 0, offsetSide);
return;
}if ("cross" === propertyName) {
this.setPropertyTok (1275069442, this.isBond, ((value).booleanValue () ? 1 : 0), 0);
return;
}if ("color" === propertyName) {
this.colix = JU.C.getColixO (value);
if (this.isBond) {
this.setColixDipole (this.colix, 1023, bs);
} else if (value != null) {
this.setPropertyTok (1765808134, false, 0, 0);
}return;
}if ("translucency" === propertyName) {
this.setPropertyTok (603979967, this.isBond, (value.equals ("translucent") ? 1 : 0), 0);
return;
}if ("clear" === propertyName) {
this.currentDipole = null;
this.clear (false);
}if ("clearBonds" === propertyName) {
this.clear (true);
}if ("startSet" === propertyName) {
var bsAtoms = value;
this.endCoord = null;
this.startCoord = this.ms.getAtomSetCenter (bsAtoms);
this.tempDipole.set2Value (this.startCoord, JU.P3.new3 (0, 0, 0), this.dipoleValue);
if (bsAtoms.cardinality () == 1) this.atomIndex1 = bsAtoms.nextSetBit (0);
return;
}if ("atomBitset" === propertyName) {
var atomset = value;
switch (atomset.cardinality ()) {
case 0:
return;
case 1:
break;
case 2:
this.atomIndex1 = atomset.nextSetBit (0);
this.startCoord = this.ms.at[this.atomIndex1];
atomset.clear (this.atomIndex1);
break;
default:
this.getMolecular (atomset);
return;
}
propertyName = "endSet";
}if ("endSet" === propertyName) {
this.iHaveTwoEnds = true;
var atomset = value;
if (this.atomIndex1 >= 0 && atomset.cardinality () == 1) {
this.atomIndex2 = atomset.nextSetBit (0);
this.tempDipole.set2AtomValue (this.ms.at[this.atomIndex1], this.ms.at[this.atomIndex2], 1);
this.currentDipole = this.findDipoleFor (this.tempDipole.thisID, this.tempDipole.dipoleInfo);
this.tempDipole.thisID = this.currentDipole.thisID;
if (this.isSameAtoms (this.currentDipole, this.tempDipole.dipoleInfo)) {
this.tempDipole = this.currentDipole;
if (this.dipoleValue > 0) this.tempDipole.dipoleValue = this.dipoleValue;
if (this.mad > 0) this.tempDipole.mad = this.mad;
}} else {
this.tempDipole.set2Value (this.startCoord, this.ms.getAtomSetCenter (atomset), this.dipoleValue);
}return;
}if ("startCoord" === propertyName) {
this.startCoord.setT (value);
this.tempDipole.set2Value (this.startCoord, JU.P3.new3 (0, 0, 0), this.dipoleValue);
return;
}if ("endCoord" === propertyName) {
this.iHaveTwoEnds = true;
this.endCoord.setT (value);
this.tempDipole.set2Value (this.startCoord, this.endCoord, this.dipoleValue);
this.dumpDipoles ("endCoord");
return;
}if ("value" === propertyName) {
this.dipoleValue = (value).floatValue ();
this.isUserValue = true;
this.tempDipole.setValue (this.dipoleValue);
if (this.tempDipole.offsetPercent != 0) this.tempDipole.offsetAngstroms = this.tempDipole.offsetPercent / 100 * this.tempDipole.dipoleValue;
return;
}if ("set" === propertyName) {
if (this.isBond || !this.iHaveTwoEnds && this.tempDipole.bsMolecule == null) return;
this.setDipole ();
this.setModelIndex ();
return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
for (var i = this.dipoleCount; --i >= 0; ) if (this.dipoles[i].modelIndex > modelIndex) {
this.dipoles[i].modelIndex--;
} else if (this.dipoles[i].modelIndex == modelIndex) {
if (this.dipoles[i] === this.currentDipole) this.currentDipole = null;
this.dipoles = JU.AU.deleteElements (this.dipoles, i, 1);
this.dipoleCount--;
}
this.currentDipole = null;
return;
}}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "getMolecular", 
 function (bsMolecule) {
var v = (bsMolecule == null ? this.calculatedDipole : null);
if (v == null && bsMolecule == null) {
v = this.vwr.getModelDipole ();
JU.Logger.info ("file molecular dipole = " + v + " " + (v != null ? "" + v.length () : ""));
}if (v == null) try {
this.calculatedDipole = v = this.vwr.calculateMolecularDipole (bsMolecule);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (v == null) {
JU.Logger.warn ("No molecular dipole found for this model; setting to {0 0 0}");
v =  new JU.V3 ();
}this.tempDipole.bsMolecule = bsMolecule;
this.tempDipole.setPtVector (JU.P3.new3 (0, 0, 0), JU.V3.new3 (-v.x, -v.y, -v.z));
if (this.tempDipole.lstDipoles != null) {
this.getAllMolecularDipoles (bsMolecule);
}this.tempDipole.type = 4;
if (this.currentDipole == null || this.currentDipole.thisID == null || bsMolecule == null) this.tempDipole.thisID = "molecular";
this.setDipole ();
}, "JU.BS");
Clazz.defineMethod (c$, "getAllMolecularDipoles", 
 function (bsAtoms) {
var mols = this.ms.getMolecules ();
for (var i = mols.length; --i >= 0; ) {
var m = mols[i];
if (m.atomList.intersects (bsAtoms)) {
var v = null;
try {
v = this.vwr.calculateMolecularDipole (m.atomList);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (v == null) continue;
var center = this.ms.getAtomSetCenter (m.atomList);
this.tempDipole.lstDipoles.addLast ( Clazz.newArray (-1, [v, center, m.atomList]));
}}
}, "JU.BS");
Clazz.defineMethod (c$, "setPropertyTok", 
 function (tok, bondOnly, iValue, fValue) {
if (this.currentDipole != null) this.setPropertyFor (tok, this.currentDipole, iValue, fValue);
 else {
for (var i = this.dipoleCount; --i >= 0; ) if (!bondOnly || this.isBondDipole (i)) if (this.wildID == null || JU.PT.isMatch (this.dipoles[i].thisID.toUpperCase (), this.wildID, true, true)) this.setPropertyFor (tok, this.dipoles[i], iValue, fValue);

}}, "~N,~B,~N,~N");
Clazz.defineMethod (c$, "setPropertyFor", 
 function (tok, dipole, iValue, fValue) {
switch (tok) {
case 1073742335:
dipole.visible = true;
return;
case 1073742334:
dipole.visible = false;
return;
case 12291:
this.deleteDipole (dipole);
return;
case 659488:
dipole.mad = this.tempDipole.mad = iValue;
return;
case 1611272194:
dipole.offsetAngstroms = fValue;
return;
case 268435634:
dipole.offsetAngstroms = fValue * dipole.dipoleValue;
return;
case 2097178:
dipole.offsetSide = fValue;
return;
case 1275069442:
dipole.noCross = (iValue == 0);
return;
case 1765808134:
dipole.colix = this.colix;
return;
case 603979967:
dipole.setTranslucent (iValue == 1, this.translucentLevel);
return;
}
JU.Logger.error ("Unkown dipole property! " + JS.T.nameOf (tok));
}, "~N,J.shapespecial.Dipole,~N,~N");
Clazz.overrideMethod (c$, "getPropertyData", 
function (property, data) {
if (property === "getNames") {
}if (property === "checkID") {
var key = (data[0]).toUpperCase ();
var isWild = JU.PT.isWild (key);
for (var i = this.dipoleCount; --i >= 0; ) {
var id = this.dipoles[i].thisID;
if (id.equalsIgnoreCase (key) || isWild && JU.PT.isMatch (id.toUpperCase (), key, true, true)) {
data[1] = id;
return true;
}}
return false;
}return this.getPropShape (property, data);
}, "~S,~A");
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
if (property.equals ("list")) {
return this.getShapeState ();
}return null;
}, "~S,~N");
Clazz.defineMethod (c$, "getBondDipoles", 
 function () {
var partialCharges = this.ms.getPartialCharges ();
if (partialCharges == null) return;
this.clear (true);
var bonds = this.ms.bo;
for (var i = this.ms.bondCount; --i >= 0; ) {
var bond = bonds[i];
if (!bond.isCovalent ()) continue;
var c1 = partialCharges[bond.atom1.i];
var c2 = partialCharges[bond.atom2.i];
if (c1 != c2) this.setDipoleAtoms (bond.atom1, bond.atom2, c1, c2);
}
});
Clazz.defineMethod (c$, "isBondDipole", 
 function (i) {
if (i >= this.dipoles.length || this.dipoles[i] == null) return false;
return (this.dipoles[i].isBondType ());
}, "~N");
Clazz.defineMethod (c$, "setColixDipole", 
 function (colix, bondTypeMask, bs) {
if (colix == 2) return;
var iter = this.ms.getBondIteratorForType (bondTypeMask, bs);
while (iter.hasNext ()) {
var d = this.findBondDipole (iter.next ());
if (d != null) d.colix = colix;
}
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "setDipole", 
 function () {
if (this.currentDipole == null) this.currentDipole = this.allocDipole ("", "");
this.currentDipole.set (this.tempDipole);
this.currentDipole.isUserValue = this.isUserValue;
this.currentDipole.modelIndex = this.vwr.am.cmi;
});
Clazz.defineMethod (c$, "setDipoleAtoms", 
 function (atom1, atom2, c1, c2) {
var dipole = this.findAtomDipole (atom1, atom2, true);
var value = (c1 - c2) / 2 * atom1.distance (atom2) / 0.208194;
if (value < 0) {
dipole.set2AtomValue (atom2, atom1, -value);
} else {
dipole.set2AtomValue (atom1, atom2, value);
}dipole.type = 3;
dipole.modelIndex = atom1.mi;
}, "JM.Atom,JM.Atom,~N,~N");
Clazz.defineMethod (c$, "getDipoleIndexFor", 
 function (dipoleInfo, thisID) {
if (dipoleInfo != null && dipoleInfo.length > 0) for (var i = this.dipoleCount; --i >= 0; ) if (this.isSameAtoms (this.dipoles[i], dipoleInfo)) return i;

return this.getIndexFromName (thisID);
}, "~S,~S");
Clazz.defineMethod (c$, "isSameAtoms", 
 function (dipole, dipoleInfo) {
return (dipole != null && dipole.isBondType () && (dipole.dipoleInfo + dipole.dipoleInfo).indexOf (dipoleInfo) >= 0);
}, "J.shapespecial.Dipole,~S");
Clazz.defineMethod (c$, "getDipoleIndex", 
 function (atomIndex1, atomIndex2) {
for (var i = this.dipoleCount; --i >= 0; ) {
if (this.dipoles[i] != null && this.dipoles[i].atoms[0] != null && this.dipoles[i].atoms[1] != null && (this.dipoles[i].atoms[0].i == atomIndex1 && this.dipoles[i].atoms[1].i == atomIndex2 || this.dipoles[i].atoms[1].i == atomIndex1 && this.dipoles[i].atoms[0].i == atomIndex2)) return i;
}
return -1;
}, "~N,~N");
Clazz.defineMethod (c$, "deleteDipole", 
 function (dipole) {
if (dipole == null) return;
if (this.currentDipole === dipole) this.currentDipole = null;
var i;
for (i = this.dipoleCount; this.dipoles[--i] !== dipole; ) {
}
if (i < 0) return;
for (var j = i + 1; j < this.dipoleCount; ++j) this.dipoles[j - 1] = this.dipoles[j];

this.dipoles[--this.dipoleCount] = null;
}, "J.shapespecial.Dipole");
Clazz.defineMethod (c$, "findDipole", 
 function (thisID) {
var dipoleIndex = this.getIndexFromName (thisID);
if (dipoleIndex >= 0) {
return this.dipoles[dipoleIndex];
}return null;
}, "~S");
Clazz.defineMethod (c$, "findAtomDipole", 
 function (atom1, atom2, doAllocate) {
var dipoleIndex = this.getDipoleIndex (atom1.i, atom2.i);
if (dipoleIndex >= 0) {
return this.dipoles[dipoleIndex];
}return (doAllocate ? this.allocDipole ("", "") : null);
}, "JM.Atom,JM.Atom,~B");
Clazz.defineMethod (c$, "findBondDipole", 
 function (bond) {
var d = this.findAtomDipole (bond.atom1, bond.atom2, false);
return (d == null || d.atoms[0] == null ? null : d);
}, "JM.Bond");
Clazz.defineMethod (c$, "findDipoleFor", 
 function (thisID, dipoleInfo) {
var dipoleIndex = this.getDipoleIndexFor (dipoleInfo, thisID);
if (dipoleIndex >= 0) {
if (thisID.length > 0) this.dipoles[dipoleIndex].thisID = thisID;
return this.dipoles[dipoleIndex];
}return this.allocDipole (thisID, dipoleInfo);
}, "~S,~S");
Clazz.defineMethod (c$, "allocDipole", 
 function (thisID, dipoleInfo) {
this.dipoles = JU.AU.ensureLength (this.dipoles, this.dipoleCount + 1);
if (thisID == null || thisID.length == 0) thisID = "dipole" + (this.dipoleCount + 1);
var d = this.dipoles[this.dipoleCount++] =  new J.shapespecial.Dipole ().init (this.vwr.am.cmi, thisID, dipoleInfo, this.colix, 10, true);
return d;
}, "~S,~S");
Clazz.defineMethod (c$, "dumpDipoles", 
 function (msg) {
for (var i = this.dipoleCount; --i >= 0; ) {
var dipole = this.dipoles[i];
JU.Logger.info ("\n\n" + msg + " dump dipole " + i + " " + dipole + " " + dipole.thisID + " " + dipole.dipoleInfo + " " + dipole.visibilityFlags + " mad=" + dipole.mad + " vis=" + dipole.visible + "\n orig" + dipole.origin + " " + " vect" + dipole.vector + " val=" + dipole.dipoleValue);
}
if (this.currentDipole != null) JU.Logger.info (" current = " + this.currentDipole + this.currentDipole.origin);
if (this.tempDipole != null) JU.Logger.info (" temp = " + this.tempDipole + " " + this.tempDipole.origin);
}, "~S");
Clazz.defineMethod (c$, "clear", 
 function (clearBondDipolesOnly) {
if (clearBondDipolesOnly) {
for (var i = this.dipoleCount; --i >= 0; ) if (this.isBondDipole (i)) this.deleteDipole (this.dipoles[i]);

return;
}for (var i = this.dipoleCount; --i >= 0; ) if (!this.isBond || this.isBondDipole (i)) this.deleteDipole (this.dipoles[i]);

}, "~B");
Clazz.overrideMethod (c$, "getIndexFromName", 
function (thisID) {
if (thisID == null) return -1;
for (var i = this.dipoleCount; --i >= 0; ) {
if (this.dipoles[i] != null && thisID.equals (this.dipoles[i].thisID)) return i;
}
return -1;
}, "~S");
Clazz.overrideMethod (c$, "getShapeDetail", 
function () {
var V =  new JU.Lst ();
var atomInfo;
var ptTemp =  new JU.P3 ();
for (var i = 0; i < this.dipoleCount; i++) {
var info =  new java.util.Hashtable ();
var dipole = this.dipoles[i];
info.put ("ID", dipole.thisID);
info.put ("vector", dipole.vector);
info.put ("origin", dipole.origin);
if (dipole.bsMolecule != null) {
info.put ("bsMolecule", dipole.bsMolecule);
} else if (dipole.atoms[0] != null) {
atomInfo =  new java.util.Hashtable ();
this.ms.getAtomIdentityInfo (dipole.atoms[0].i, atomInfo, ptTemp);
var atoms =  new JU.Lst ();
atoms.addLast (atomInfo);
atomInfo =  new java.util.Hashtable ();
this.ms.getAtomIdentityInfo (dipole.atoms[1].i, atomInfo, ptTemp);
atoms.addLast (atomInfo);
info.put ("atoms", atoms);
info.put ("magnitude", Float.$valueOf (dipole.vector.length ()));
}V.addLast (info);
}
return V;
});
Clazz.defineMethod (c$, "setModelIndex", 
 function () {
if (this.currentDipole == null) return;
this.currentDipole.visible = true;
this.currentDipole.modelIndex = this.vwr.am.cmi;
});
Clazz.overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
for (var i = this.dipoleCount; --i >= 0; ) {
var dipole = this.dipoles[i];
dipole.visibilityFlags = ((dipole.modelIndex < 0 || bsModels.get (dipole.modelIndex)) && dipole.mad != 0 && dipole.visible && dipole.origin != null && dipole.vector != null && dipole.vector.length () != 0 && dipole.dipoleValue != 0 ? this.vf : 0);
}
}, "JU.BS");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
if (this.dipoleCount == 0) return "";
var s =  new JU.SB ();
var thisModel = -1;
var modelCount = this.vwr.ms.mc;
for (var i = 0; i < this.dipoleCount; i++) {
var dipole = this.dipoles[i];
if (dipole.isValid) {
if (modelCount > 1 && dipole.modelIndex != thisModel) J.shape.Shape.appendCmd (s, "frame " + this.vwr.getModelNumberDotted (thisModel = dipole.modelIndex));
s.append (dipole.getShapeState ());
J.shape.Shape.appendCmd (s, J.shape.Shape.getColorCommandUnk ("dipole", dipole.colix, this.translucentAllowed));
}}
return s.toString ();
});
Clazz.defineStatics (c$,
"DEFAULT_MAD", 10,
"DEFAULT_OFFSETSIDE", 0.40,
"E_ANG_PER_DEBYE", 0.208194);
});
