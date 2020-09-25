Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.readers.xml.XmlReader"], "J.adapter.readers.xml.XmlCmlReader", ["java.lang.Float", "$.IndexOutOfBoundsException", "java.util.Hashtable", "$.Properties", "$.StringTokenizer", "JU.BS", "$.Lst", "$.PT", "J.adapter.smarter.Atom", "$.Bond", "J.api.JmolAdapter", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.scalarDictRef = null;
this.scalarDictValue = null;
this.scalarTitle = null;
this.cellParameterType = null;
this.checkedSerial = false;
this.isSerial = false;
this.moleculeNesting = 0;
this.latticeVectorPtr = 0;
this.embeddedCrystal = false;
this.atomIdNames = null;
this.tokens = null;
this.aaLen = 0;
this.atomArray = null;
this.bondCount = 0;
this.bondArray = null;
this.tokenCount = 0;
this.moduleNestingLevel = 0;
this.haveMolecule = false;
this.localSpaceGroupName = null;
this.processing = true;
this.state = 0;
this.atomIndex0 = 0;
this.joinList = null;
this.mapRtoA = null;
this.deleteAtoms = null;
this.moleculeID = null;
this.htModelAtomMap = null;
this.optimize2d = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xml, "XmlCmlReader", J.adapter.readers.xml.XmlReader);
Clazz.prepareFields (c$, function () {
this.tokens =  new Array (16);
this.atomArray =  new Array (100);
this.bondArray =  new Array (100);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.xml.XmlCmlReader, []);
});
Clazz.overrideMethod (c$, "processXml", 
function (parent, saxReader) {
this.optimize2d = parent.checkFilterKey ("2D");
this.processXml2 (parent, saxReader);
if (this.optimize2d) this.set2D ();
}, "J.adapter.readers.xml.XmlReader,~O");
Clazz.overrideMethod (c$, "processStartElement", 
function (name, nodeName) {
if (!this.processing) return;
this.processStart2 (name);
}, "~S,~S");
Clazz.defineMethod (c$, "processStart2", 
function (name) {
name = name.toLowerCase ();
var val;
switch (this.state) {
case 0:
if (name.equals ("molecule")) {
this.moleculeID = this.atts.get ("id");
this.state = 6;
this.haveMolecule = true;
if (this.moleculeNesting == 0) this.createNewAtomSet ();
this.moleculeNesting++;
} else if (name.equals ("crystal")) {
this.state = 2;
} else if (name.equals ("symmetry")) {
this.state = 17;
if ((val = this.atts.get ("spacegroup")) != null) {
this.localSpaceGroupName = val;
} else {
this.localSpaceGroupName = "P1";
this.parent.clearUnitCell ();
}} else if (name.equals ("module")) {
this.moduleNestingLevel++;
} else if (name.equals ("latticevector")) {
this.state = 18;
this.setKeepChars (true);
}break;
case 2:
this.checkedSerial = true;
this.isSerial = false;
if (name.equals ("scalar")) {
this.state = 3;
this.setKeepChars (true);
this.scalarTitle = this.atts.get ("title");
this.getDictRefValue ();
} else if (name.equals ("symmetry")) {
this.state = 4;
if ((val = this.atts.get ("spacegroup")) != null) {
this.localSpaceGroupName = val;
for (var i = 0; i < this.localSpaceGroupName.length; i++) if (this.localSpaceGroupName.charAt (i) == '_') this.localSpaceGroupName = this.localSpaceGroupName.substring (0, i) + this.localSpaceGroupName.substring ((i--) + 1);

}} else if (name.equals ("cellparameter")) {
if ((val = this.atts.get ("parametertype")) != null) {
this.cellParameterType = val;
this.setKeepChars (true);
}}break;
case 18:
this.setKeepChars (true);
break;
case 17:
case 3:
case 4:
if (name.equals ("transform3")) {
this.state = 5;
this.setKeepChars (true);
}break;
case 5:
case 6:
if (name.equals ("fragmentlist")) {
this.joinList =  new JU.Lst ();
this.mapRtoA =  new java.util.Hashtable ();
if (this.deleteAtoms == null) this.deleteAtoms =  new JU.BS ();
} else if (name.equals ("crystal")) {
this.state = 2;
this.embeddedCrystal = true;
} else if (name.equals ("molecule")) {
this.state = 6;
this.moleculeNesting++;
} else if (name.equals ("join")) {
var order = -1;
this.tokenCount = 0;
if ((val = this.atts.get ("atomrefs2")) != null) {
this.breakOutTokens (val);
if ((val = this.atts.get ("order")) != null) order = this.parseBondToken (val);
if (this.tokenCount == 2 && order > 0) this.joinList.addLast ( Clazz.newArray (-1, [this.tokens[0], this.tokens[1], "" + order]));
}} else if (name.equals ("bondarray")) {
this.state = 10;
this.bondCount = 0;
if ((val = this.atts.get ("order")) != null) {
this.breakOutBondTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.bondArray[i].order = this.parseBondToken (this.tokens[i]);

}if ((val = this.atts.get ("atomref1")) != null) {
this.breakOutBondTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.bondArray[i].atomIndex1 = this.getAtomIndex (this.tokens[i]);

}if ((val = this.atts.get ("atomref2")) != null) {
this.breakOutBondTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.bondArray[i].atomIndex2 = this.getAtomIndex (this.tokens[i]);

}} else if (name.equals ("atomarray")) {
this.state = 7;
this.aaLen = 0;
var coords3D = false;
if ((val = this.atts.get ("atomid")) != null) {
this.breakOutAtomTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.atomArray[i].atomName = this.tokens[i];

}var is3d = (!this.optimize2d && (val = this.atts.get ("x3")) != null);
if (is3d) {
is3d = true;
coords3D = true;
this.breakOutAtomTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.atomArray[i].x = this.parseFloatStr (this.tokens[i]);

if ((val = this.atts.get ("y3")) != null) {
this.breakOutAtomTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.atomArray[i].y = this.parseFloatStr (this.tokens[i]);

}if ((val = this.atts.get ("z3")) != null) {
this.breakOutAtomTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.atomArray[i].z = this.parseFloatStr (this.tokens[i]);

}} else {
if ((val = this.atts.get ("x2")) != null) {
this.breakOutAtomTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.atomArray[i].x = this.parseFloatStr (this.tokens[i]);

}if ((val = this.atts.get ("y2")) != null) {
this.breakOutAtomTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.atomArray[i].y = this.parseFloatStr (this.tokens[i]);

}}if ((val = this.atts.get ("elementtype")) != null) {
this.breakOutAtomTokens (val);
for (var i = this.tokenCount; --i >= 0; ) this.atomArray[i].elementSymbol = this.tokens[i];

}for (var i = this.aaLen; --i >= 0; ) {
var atom = this.atomArray[i];
if (!coords3D) atom.z = 0;
this.addAtom (atom);
}
} else if (name.equals ("formula")) {
this.state = 13;
} else if (name.equals ("association")) {
this.state = 19;
}break;
case 10:
if (name.equals ("bond")) {
this.state = 11;
var order = -1;
this.tokenCount = 0;
if ((val = this.atts.get ("atomrefs2")) != null) this.breakOutTokens (val);
if ((val = this.atts.get ("order")) != null) order = this.parseBondToken (val);
if (this.tokenCount == 2 && order > 0) {
this.addNewBond (this.tokens[0], this.tokens[1], order);
}}break;
case 7:
if (name.equals ("atom")) {
this.state = 8;
this.atom =  new J.adapter.smarter.Atom ();
this.parent.setFractionalCoordinates (false);
var id = this.atts.get ("id");
if ((val = this.atts.get ("name")) != null) this.atom.atomName = val;
 else if ((val = this.atts.get ("title")) != null) this.atom.atomName = val;
 else if ((val = this.atts.get ("label")) != null) this.atom.atomName = val;
 else this.atom.atomName = id;
if (!this.checkedSerial) {
this.isSerial = (id != null && id.length > 1 && id.startsWith ("a") && JU.PT.parseInt (id.substring (1)) != -2147483648);
this.checkedSerial = true;
}if (this.isSerial) this.atom.atomSerial = JU.PT.parseInt (id.substring (1));
if ((val = this.atts.get ("xfract")) != null && (this.parent.iHaveUnitCell || !this.atts.containsKey ("x3"))) {
this.parent.setFractionalCoordinates (true);
this.atom.set (this.parseFloatStr (val), this.parseFloatStr (this.atts.get ("yfract")), this.parseFloatStr (this.atts.get ("zfract")));
} else if ((val = this.atts.get ("x3")) != null) {
this.atom.set (this.parseFloatStr (val), this.parseFloatStr (this.atts.get ("y3")), this.parseFloatStr (this.atts.get ("z3")));
} else if ((val = this.atts.get ("x2")) != null) {
this.atom.set (this.parseFloatStr (val), this.parseFloatStr (this.atts.get ("y2")), 0);
}if ((val = this.atts.get ("elementtype")) != null) {
var sym = val;
if ((val = this.atts.get ("isotope")) != null) this.atom.elementNumber = ((this.parseIntStr (val) << 7) + J.api.JmolAdapter.getElementNumber (sym));
this.atom.elementSymbol = sym;
}if ((val = this.atts.get ("formalcharge")) != null) this.atom.formalCharge = this.parseIntStr (val);
}break;
case 11:
if ((val = this.atts.get ("builtin")) != null) {
this.setKeepChars (true);
this.state = 15;
this.scalarDictValue = val;
} else if (name.equals ("bondstereo")) {
this.state = 12;
}break;
case 12:
this.setKeepChars (true);
this.state = 12;
break;
case 8:
if (name.equals ("scalar")) {
this.state = 9;
this.setKeepChars (true);
this.scalarTitle = this.atts.get ("title");
this.getDictRefValue ();
} else if ((val = this.atts.get ("builtin")) != null) {
this.setKeepChars (true);
this.state = 14;
this.scalarDictValue = val;
}break;
case 9:
break;
case 13:
break;
case 14:
break;
case 15:
break;
}
}, "~S");
Clazz.defineMethod (c$, "getAtomIndex", 
 function (label) {
return this.asc.getAtomIndex (this.isSerial ? label.substring (1) : label);
}, "~S");
Clazz.overrideMethod (c$, "processEndElement", 
function (name) {
if (!this.processing) return;
this.processEnd2 (name);
}, "~S");
Clazz.defineMethod (c$, "processEnd2", 
function (name) {
name = name.toLowerCase ();
switch (this.state) {
case 0:
if (name.equals ("module")) {
if (--this.moduleNestingLevel == 0) {
if (this.parent.iHaveUnitCell) this.applySymmetryAndSetTrajectory ();
this.setAtomNames ();
}}break;
case 19:
if (name.equals ("association")) this.state = 6;
break;
case 2:
if (name.equals ("crystal")) {
if (this.embeddedCrystal) {
this.state = 6;
this.embeddedCrystal = false;
} else {
this.state = 0;
}} else if (name.equals ("cellparameter") && this.keepChars) {
var tokens = JU.PT.getTokens (this.chars.toString ());
this.setKeepChars (false);
if (tokens.length != 3 || this.cellParameterType == null) {
} else if (this.cellParameterType.equals ("length")) {
for (var i = 0; i < 3; i++) this.parent.setUnitCellItem (i, this.parseFloatStr (tokens[i]));

break;
} else if (this.cellParameterType.equals ("angle")) {
for (var i = 0; i < 3; i++) this.parent.setUnitCellItem (i + 3, this.parseFloatStr (tokens[i]));

break;
}JU.Logger.error ("bad cellParameter information: parameterType=" + this.cellParameterType + " data=" + this.chars);
this.parent.setFractionalCoordinates (false);
}break;
case 3:
if (name.equals ("scalar")) {
this.state = 2;
if (this.scalarTitle != null) this.checkUnitCellItem (J.adapter.readers.xml.XmlCmlReader.unitCellParamTags, this.scalarTitle);
 else if (this.scalarDictRef != null) this.checkUnitCellItem (J.api.JmolAdapter.cellParamNames, (this.scalarDictValue.startsWith ("_") ? this.scalarDictValue : "_" + this.scalarDictValue));
}this.setKeepChars (false);
this.scalarTitle = null;
this.scalarDictRef = null;
break;
case 5:
if (name.equals ("transform3")) {
this.setKeepChars (false);
this.state = 4;
}break;
case 18:
var values = J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (this.chars.toString (), null, 3);
this.parent.addExplicitLatticeVector (this.latticeVectorPtr, values, 0);
this.latticeVectorPtr = (this.latticeVectorPtr + 1) % 3;
this.setKeepChars (false);
this.state = 0;
break;
case 4:
case 17:
if (name.equals ("symmetry")) this.state = (this.state == 4 ? 2 : 0);
if (this.moduleNestingLevel == 0 && this.parent.iHaveUnitCell && !this.embeddedCrystal) this.applySymmetryAndSetTrajectory ();
break;
case 6:
if (name.equals ("fragmentlist")) {
for (var i = this.joinList.size (); --i >= 0; ) {
var join = this.joinList.get (i);
var r1 = this.asc.getAtomFromName (this.fixSerialName (join[0]));
var r2 = this.asc.getAtomFromName (this.fixSerialName (join[1]));
if (r1 != null && r2 != null) {
this.deleteAtoms.set (r1.index);
this.deleteAtoms.set (r2.index);
this.addNewBond (this.mapRtoA.get (r1), this.mapRtoA.get (r2), this.parseIntStr (join[2]));
}}
this.joinList = null;
this.mapRtoA = null;
}if (name.equals ("molecule")) {
if (--this.moleculeNesting == 0) {
this.applySymmetryAndSetTrajectory ();
this.setAtomNames ();
this.state = 0;
} else {
this.state = 6;
}}break;
case 10:
if (name.equals ("bondarray")) {
this.state = 6;
for (var i = 0; i < this.bondCount; ++i) this.addBond (this.bondArray[i]);

this.parent.applySymmetryToBonds = true;
}break;
case 7:
if (name.equals ("atomarray")) {
this.state = 6;
}break;
case 11:
if (name.equals ("bond")) {
this.state = 10;
}break;
case 8:
if (name.equals ("atom")) {
this.state = 7;
this.addAtom (this.atom);
this.atom = null;
}break;
case 9:
if (name.equals ("scalar")) {
this.state = 8;
if ("jmol:charge".equals (this.scalarDictRef)) {
this.atom.partialCharge = this.parseFloatStr (this.chars.toString ());
} else if (this.scalarDictRef != null && "_atom_site_label".equals (this.scalarDictValue)) {
if (this.atomIdNames == null) this.atomIdNames =  new java.util.Properties ();
this.atomIdNames.put (this.atom.atomName, this.chars.toString ());
}}this.setKeepChars (false);
this.scalarTitle = null;
this.scalarDictRef = null;
break;
case 14:
this.state = 8;
if (this.scalarDictValue.equals ("x3")) this.atom.x = this.parseFloatStr (this.chars.toString ());
 else if (this.scalarDictValue.equals ("y3")) this.atom.y = this.parseFloatStr (this.chars.toString ());
 else if (this.scalarDictValue.equals ("z3")) this.atom.z = this.parseFloatStr (this.chars.toString ());
 else if (this.scalarDictValue.equals ("elementType")) this.atom.elementSymbol = this.chars.toString ();
this.setKeepChars (false);
break;
case 12:
var stereo = this.chars.toString ();
if (this.bond.order == 1) this.bond.order = (stereo.equals ("H") ? 1041 : 1025);
this.setKeepChars (false);
this.state = 11;
break;
case 15:
this.state = 11;
if (this.scalarDictValue.equals ("atomRef")) {
if (this.tokenCount == 0) this.tokens =  new Array (2);
if (this.tokenCount < 2) this.tokens[this.tokenCount++] = this.chars.toString ();
} else if (this.scalarDictValue.equals ("order")) {
var order = this.parseBondToken (this.chars.toString ());
if (order > 0 && this.tokenCount == 2) this.addNewBond (this.tokens[0], this.tokens[1], order);
}this.setKeepChars (false);
break;
case 13:
this.state = 6;
break;
}
}, "~S");
Clazz.defineMethod (c$, "addBond", 
 function (bond) {
var a1 = this.asc.atoms[bond.atomIndex1];
var a2 = this.asc.atoms[bond.atomIndex2];
if (this.joinList != null && !this.checkBondToR (a1.atomName, a2.atomName)) this.asc.addBond (bond);
}, "J.adapter.smarter.Bond");
Clazz.defineMethod (c$, "checkBondToR", 
 function (a1name, a2name) {
var a1 = this.asc.getAtomFromName (a1name);
var a2 = this.asc.getAtomFromName (a2name);
if (a1 == null || a2 == null) return true;
if ("R".equals (a1.elementSymbol)) {
this.mapRtoA.put (a1, a2.atomName);
return true;
} else if ("R".equals (a2.elementSymbol)) {
this.mapRtoA.put (a2, a1.atomName);
return true;
}return false;
}, "~S,~S");
Clazz.defineMethod (c$, "setAtomNames", 
 function () {
if (this.atomIdNames == null) return;
var s;
var atoms = this.asc.atoms;
for (var i = this.atomIndex0; i < this.asc.ac; i++) if ((s = this.atomIdNames.getProperty (atoms[i].atomName)) != null) atoms[i].atomName = s;

this.atomIdNames = null;
this.atomIndex0 = this.asc.ac;
});
Clazz.defineMethod (c$, "addNewBond", 
 function (a1, a2, order) {
if (a1 == null || a2 == null) return;
this.parent.applySymmetryToBonds = true;
a1 = this.fixSerialName (a1);
a2 = this.fixSerialName (a2);
if (this.joinList == null || !this.checkBondToR (a1, a2)) {
this.asc.addNewBondFromNames (a1, a2, order);
this.bond = this.asc.bonds[this.asc.bondCount - 1];
}}, "~S,~S,~N");
Clazz.defineMethod (c$, "fixSerialName", 
 function (a) {
return (this.isSerial ? a.substring (1) : a);
}, "~S");
Clazz.defineMethod (c$, "getDictRefValue", 
 function () {
this.scalarDictRef = this.atts.get ("dictref");
if (this.scalarDictRef != null) {
var iColon = this.scalarDictRef.indexOf (":");
this.scalarDictValue = this.scalarDictRef.substring (iColon + 1);
}});
Clazz.defineMethod (c$, "checkUnitCellItem", 
 function (tags, value) {
for (var i = tags.length; --i >= 0; ) if (value.equals (tags[i])) {
this.parent.setUnitCellItem (i, this.parseFloatStr (this.chars.toString ()));
return;
}
}, "~A,~S");
Clazz.defineMethod (c$, "addAtom", 
 function (atom) {
if ((atom.elementSymbol == null && atom.elementNumber < 0) || Float.isNaN (atom.z)) return;
this.parent.setAtomCoord (atom);
if (this.htModelAtomMap != null) this.htModelAtomMap.put (this.moleculeID + atom.atomName, atom);
if (this.isSerial) this.asc.addAtomWithMappedSerialNumber (atom);
 else this.asc.addAtomWithMappedName (atom);
}, "J.adapter.smarter.Atom");
Clazz.defineMethod (c$, "parseBondToken", 
 function (str) {
var floatOrder = this.parseFloatStr (str);
if (Float.isNaN (floatOrder) && str.length >= 1) {
str = str.toUpperCase ();
switch (str.charAt (0)) {
case 'S':
return 1;
case 'D':
return 2;
case 'T':
return 3;
case 'A':
return 515;
case 'P':
return 66;
}
return this.parseIntStr (str);
}if (floatOrder == 1.5) return 515;
if (floatOrder == 2) return 2;
if (floatOrder == 3) return 3;
return 1;
}, "~S");
Clazz.defineMethod (c$, "breakOutTokens", 
 function (str) {
var st =  new java.util.StringTokenizer (str);
this.tokenCount = st.countTokens ();
if (this.tokenCount > this.tokens.length) this.tokens =  new Array (this.tokenCount);
for (var i = 0; i < this.tokenCount; ++i) {
try {
this.tokens[i] = st.nextToken ();
} catch (nsee) {
if (Clazz.exceptionOf (nsee, java.util.NoSuchElementException)) {
this.tokens[i] = null;
} else {
throw nsee;
}
}
}
}, "~S");
Clazz.defineMethod (c$, "breakOutAtomTokens", 
function (str) {
this.breakOutTokens (str);
this.checkAtomArrayLength (this.tokenCount);
}, "~S");
Clazz.defineMethod (c$, "checkAtomArrayLength", 
function (newAtomCount) {
if (this.aaLen == 0) {
if (newAtomCount > this.atomArray.length) this.atomArray =  new Array (newAtomCount);
for (var i = newAtomCount; --i >= 0; ) this.atomArray[i] =  new J.adapter.smarter.Atom ();

this.aaLen = newAtomCount;
} else if (newAtomCount != this.aaLen) {
throw  new IndexOutOfBoundsException ("bad atom attribute length");
}}, "~N");
Clazz.defineMethod (c$, "breakOutBondTokens", 
function (str) {
this.breakOutTokens (str);
this.checkBondArrayLength (this.tokenCount);
}, "~S");
Clazz.defineMethod (c$, "checkBondArrayLength", 
function (newBondCount) {
if (this.bondCount == 0) {
if (newBondCount > this.bondArray.length) this.bondArray =  new Array (newBondCount);
for (var i = newBondCount; --i >= 0; ) this.bondArray[i] =  new J.adapter.smarter.Bond (-1, -1, 1);

this.bondCount = newBondCount;
} else if (newBondCount != this.bondCount) {
throw  new IndexOutOfBoundsException ("bad bond attribute length");
}}, "~N");
Clazz.defineMethod (c$, "createNewAtomSet", 
 function () {
this.asc.newAtomSet ();
var val;
if (this.htModelAtomMap != null) this.htModelAtomMap.put ("" + this.asc.iSet, "" + this.moleculeID);
var collectionName = ((val = this.atts.get ("title")) != null || (val = this.atts.get ("id")) != null ? val : null);
if (collectionName != null) {
this.asc.setAtomSetName (collectionName);
}});
Clazz.defineMethod (c$, "applySymmetryAndSetTrajectory", 
function () {
if (this.moduleNestingLevel > 0 || !this.haveMolecule || this.localSpaceGroupName == null) return;
this.parent.setSpaceGroupName (this.localSpaceGroupName);
this.parent.iHaveSymmetryOperators = this.iHaveSymmetryOperators;
this.parent.applySymmetryAndSetTrajectory ();
});
Clazz.overrideMethod (c$, "endDocument", 
function () {
if (this.deleteAtoms != null) {
var bs = (this.asc.bsAtoms == null ? this.asc.bsAtoms = JU.BSUtil.newBitSet2 (0, this.asc.ac) : this.asc.bsAtoms);
bs.andNot (this.deleteAtoms);
}});
Clazz.defineStatics (c$,
"START", 0,
"CML", 1,
"CRYSTAL", 2,
"CRYSTAL_SCALAR", 3,
"CRYSTAL_SYMMETRY", 4,
"CRYSTAL_SYMMETRY_TRANSFORM3", 5,
"MOLECULE", 6,
"MOLECULE_ATOM_ARRAY", 7,
"MOLECULE_ATOM", 8,
"MOLECULE_ATOM_SCALAR", 9,
"MOLECULE_BOND_ARRAY", 10,
"MOLECULE_BOND", 11,
"MOLECULE_BOND_STEREO", 12,
"MOLECULE_FORMULA", 13,
"MOLECULE_ATOM_BUILTIN", 14,
"MOLECULE_BOND_BUILTIN", 15,
"MODULE", 16,
"SYMMETRY", 17,
"LATTICE_VECTOR", 18,
"ASSOCIATION", 19,
"unitCellParamTags",  Clazz.newArray (-1, ["a", "b", "c", "alpha", "beta", "gamma"]));
});
