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
Clazz_declarePackage ("JS");
Clazz_load (["JU.BS", "$.V3"], "JS.VTemp", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.vTemp = null;
this.vA = null;
this.vB = null;
this.vTemp1 = null;
this.vTemp2 = null;
this.vNorm2 = null;
this.vNorm3 = null;
this.vNorm4 = null;
this.bsTemp = null;
Clazz_instantialize (this, arguments);
}, JS, "VTemp");
Clazz_prepareFields (c$, function () {
this.vTemp =  new JU.V3 ();
this.vA =  new JU.V3 ();
this.vB =  new JU.V3 ();
this.vTemp1 =  new JU.V3 ();
this.vTemp2 =  new JU.V3 ();
this.vNorm2 =  new JU.V3 ();
this.vNorm3 =  new JU.V3 ();
this.vNorm4 =  new JU.V3 ();
this.bsTemp =  new JU.BS ();
});
});
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "SmilesMatcherInterface");
Clazz_declarePackage ("JS");
Clazz_load (["J.api.SmilesMatcherInterface"], "JS.SmilesMatcher", ["JU.AU", "$.BS", "$.PT", "JS.InvalidSmilesException", "$.SmilesAtom", "$.SmilesBond", "$.SmilesGenerator", "$.SmilesParser", "$.SmilesSearch", "JU.BSUtil", "$.Elements", "$.Logger", "$.Node", "$.Point3fi"], function () {
c$ = Clazz_declareType (JS, "SmilesMatcher", null, J.api.SmilesMatcherInterface);
Clazz_overrideMethod (c$, "getLastException", 
function () {
return JS.InvalidSmilesException.getLastError ();
});
Clazz_overrideMethod (c$, "getMolecularFormula", 
function (pattern, isSmarts) {
JS.InvalidSmilesException.clear ();
var search = JS.SmilesParser.newSearch ("/nostereo/" + pattern, isSmarts, true);
search.createTopoMap (null);
search.nodes = search.targetAtoms;
return search.getMolecularFormula (!isSmarts, null, false);
}, "~S,~B");
Clazz_overrideMethod (c$, "getSmiles", 
function (atoms, ac, bsSelected, bioComment, flags) {
JS.InvalidSmilesException.clear ();
return ( new JS.SmilesGenerator ()).getSmiles (this, atoms, ac, bsSelected, bioComment, flags);
}, "~A,~N,JU.BS,~S,~N");
Clazz_overrideMethod (c$, "areEqual", 
function (smiles1, smiles2) {
JS.InvalidSmilesException.clear ();
var result = this.findPriv (smiles1, JS.SmilesParser.newSearch (smiles2, false, true), (smiles1.indexOf ("*") >= 0 ? 2 : 1) | 8, 2);
return (result == null ? -1 : result.length);
}, "~S,~S");
Clazz_defineMethod (c$, "areEqualTest", 
function (smiles, search) {
var ret = this.findPriv (smiles, search, 9, 2);
return (ret != null && ret.length == 1);
}, "~S,JS.SmilesSearch");
Clazz_overrideMethod (c$, "find", 
function (pattern, target, flags) {
JS.InvalidSmilesException.clear ();
target = JS.SmilesParser.cleanPattern (target);
pattern = JS.SmilesParser.cleanPattern (pattern);
var search = JS.SmilesParser.newSearch (target, false, true);
var array = this.findPriv (pattern, search, flags, 3);
for (var i = array.length; --i >= 0; ) {
var a = array[i];
for (var j = a.length; --j >= 0; ) a[j] = (search.targetAtoms[a[j]]).mapIndex;

}
return array;
}, "~S,~S,~N");
Clazz_overrideMethod (c$, "getAtoms", 
function (target) {
JS.InvalidSmilesException.clear ();
target = JS.SmilesParser.cleanPattern (target);
var search = JS.SmilesParser.newSearch (target, false, true);
search.createTopoMap ( new JU.BS ());
return search.targetAtoms;
}, "~S");
Clazz_overrideMethod (c$, "getRelationship", 
function (smiles1, smiles2) {
if (smiles1 == null || smiles2 == null || smiles1.length == 0 || smiles2.length == 0) return "";
var mf1 = this.getMolecularFormula (smiles1, false);
var mf2 = this.getMolecularFormula (smiles2, false);
if (!mf1.equals (mf2)) return "none";
var check;
var n1 = JU.PT.countChar (JU.PT.rep (smiles1, "@@", "@"), '@');
var n2 = JU.PT.countChar (JU.PT.rep (smiles2, "@@", "@"), '@');
check = (n1 == n2 && this.areEqual (smiles2, smiles1) > 0);
if (!check) {
var s = smiles1 + smiles2;
if (s.indexOf ("/") >= 0 || s.indexOf ("\\") >= 0 || s.indexOf ("@") >= 0) {
if (n1 == n2 && n1 > 0 && s.indexOf ("@SP") < 0) {
check = (this.areEqual ("/invertstereo/" + smiles2, smiles1) > 0);
if (check) return "enantiomers";
}check = (this.areEqual ("/nostereo/" + smiles2, smiles1) > 0);
if (check) return (n1 == n2 ? "diastereomers" : "ambiguous stereochemistry!");
}return "constitutional isomers";
}return "identical";
}, "~S,~S");
Clazz_overrideMethod (c$, "reverseChirality", 
function (smiles) {
smiles = JU.PT.rep (smiles, "@@", "!@");
smiles = JU.PT.rep (smiles, "@", "@@");
smiles = JU.PT.rep (smiles, "!@@", "@");
return smiles;
}, "~S");
Clazz_overrideMethod (c$, "getSubstructureSet", 
function (pattern, atoms, ac, bsSelected, flags) {
return this.matchPriv (pattern, atoms, ac, bsSelected, null, true, flags | JS.SmilesParser.getFlags (pattern), 1);
}, "~S,~A,~N,JU.BS,~N");
Clazz_overrideMethod (c$, "getMMFF94AtomTypes", 
function (smarts, atoms, ac, bsSelected, ret, vRings) {
JS.InvalidSmilesException.clear ();
var sp =  new JS.SmilesParser (true, true);
var search = null;
var flags = (770);
search = sp.parse ("");
search.exitFirstMatch = false;
search.targetAtoms = atoms;
search.targetAtomCount = Math.abs (ac);
search.setSelected (bsSelected);
search.flags = flags;
search.getRingData (vRings, true, true);
search.asVector = false;
search.subSearches =  new Array (1);
search.getSelections ();
var bsDone =  new JU.BS ();
for (var i = 0; i < smarts.length; i++) {
if (smarts[i] == null || smarts[i].length == 0 || smarts[i].startsWith ("#")) {
ret.addLast (null);
continue;
}search.clear ();
search.subSearches[0] = sp.getSubsearch (search, JS.SmilesParser.cleanPattern (smarts[i]), flags);
var bs = JU.BSUtil.copy (search.search ());
ret.addLast (bs);
bsDone.or (bs);
if (bsDone.cardinality () == ac) return;
}
}, "~A,~A,~N,JU.BS,JU.Lst,~A");
Clazz_overrideMethod (c$, "getSubstructureSetArray", 
function (pattern, atoms, ac, bsSelected, bsAromatic, flags) {
return this.matchPriv (pattern, atoms, ac, bsSelected, bsAromatic, true, flags, 2);
}, "~S,~A,~N,JU.BS,JU.BS,~N");
Clazz_defineMethod (c$, "getAtropisomerKeys", 
function (pattern, atoms, ac, bsSelected, bsAromatic, flags) {
return this.matchPriv (pattern, atoms, ac, bsSelected, bsAromatic, false, flags, 4);
}, "~S,~A,~N,JU.BS,JU.BS,~N");
Clazz_overrideMethod (c$, "polyhedronToSmiles", 
function (center, faces, atomCount, points, flags, details) {
var atoms =  new Array (atomCount);
for (var i = 0; i < atomCount; i++) {
atoms[i] =  new JS.SmilesAtom ();
var pt = (points == null ? null : points[i]);
if (Clazz_instanceOf (pt, JU.Node)) {
atoms[i].elementNumber = (pt).getElementNumber ();
atoms[i].bioAtomName = (pt).getAtomName ();
atoms[i].atomNumber = (pt).getAtomNumber ();
atoms[i].setT (pt);
} else {
atoms[i].elementNumber = (Clazz_instanceOf (pt, JU.Point3fi) ? (pt).sD : -2);
}atoms[i].index = i;
}
var nBonds = 0;
for (var i = faces.length; --i >= 0; ) {
var face = faces[i];
var n = face.length;
var iatom;
var iatom2;
for (var j = n; --j >= 0; ) {
if ((iatom = face[j]) >= atomCount || (iatom2 = face[(j + 1) % n]) >= atomCount) continue;
if (atoms[iatom].getBondTo (atoms[iatom2]) == null) {
var b =  new JS.SmilesBond (atoms[iatom], atoms[iatom2], 1, false);
b.index = nBonds++;
}}
}
for (var i = 0; i < atomCount; i++) {
var n = atoms[i].bondCount;
if (n == 0 || n != atoms[i].bonds.length) atoms[i].bonds = JU.AU.arrayCopyObject (atoms[i].bonds, n);
}
var s = null;
var g =  new JS.SmilesGenerator ();
if (points != null) g.polySmilesCenter = center;
JS.InvalidSmilesException.clear ();
s = g.getSmiles (this, atoms, atomCount, JU.BSUtil.newBitSet2 (0, atomCount), null, flags | 4096 | 16 | 32);
if ((flags & 65536) == 65536) {
s = "//* " + center + " *//\t[" + JU.Elements.elementSymbolFromNumber (center.getElementNumber ()) + "@PH" + atomCount + (details == null ? "" : "/" + details + "/") + "]." + s;
}return s;
}, "JU.Node,~A,~N,~A,~N,~S");
Clazz_overrideMethod (c$, "getCorrelationMaps", 
function (pattern, atoms, atomCount, bsSelected, flags) {
return this.matchPriv (pattern, atoms, atomCount, bsSelected, null, true, flags, 3);
}, "~S,~A,~N,JU.BS,~N");
Clazz_defineMethod (c$, "findPriv", 
 function (pattern, search, flags, mode) {
var bsAromatic =  new JU.BS ();
search.setFlags (search.flags | JS.SmilesParser.getFlags (pattern));
search.createTopoMap (bsAromatic);
return this.matchPriv (pattern, search.targetAtoms, -search.targetAtoms.length, null, bsAromatic, bsAromatic.isEmpty (), flags, mode);
}, "~S,JS.SmilesSearch,~N,~N");
Clazz_defineMethod (c$, "matchPriv", 
 function (pattern, atoms, ac, bsSelected, bsAromatic, doTestAromatic, flags, mode) {
JS.InvalidSmilesException.clear ();
try {
var isSmarts = ((flags & 2) == 2);
var search = JS.SmilesParser.newSearch (pattern, isSmarts, false);
if (!isSmarts && !search.patternAromatic) {
if (bsAromatic == null) bsAromatic =  new JU.BS ();
JS.SmilesSearch.normalizeAromaticity (search.patternAtoms, bsAromatic, search.flags);
search.isNormalized = true;
}search.targetAtoms = atoms;
search.targetAtomCount = Math.abs (ac);
if (ac < 0) search.haveTopo = true;
if (ac != 0 && (bsSelected == null || !bsSelected.isEmpty ())) {
var is3D = !(Clazz_instanceOf (atoms[0], JS.SmilesAtom));
search.setSelected (bsSelected);
search.getSelections ();
if (!doTestAromatic) search.bsAromatic = bsAromatic;
search.setRingData (null, null, is3D || doTestAromatic);
search.exitFirstMatch = ((flags & 8) == 8);
search.mapUnique = ((flags & 128) == 128);
}switch (mode) {
case 1:
search.asVector = false;
return search.search ();
case 2:
search.asVector = true;
var vb = search.search ();
return vb.toArray ( new Array (vb.size ()));
case 4:
search.exitFirstMatch = true;
search.setAtropicity = true;
search.search ();
return search.atropKeys;
case 3:
search.getMaps = true;
search.setFlags (flags | search.flags);
var vl = search.search ();
return vl.toArray (JU.AU.newInt2 (vl.size ()));
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
if (JU.Logger.debugging) e.printStackTrace ();
if (JS.InvalidSmilesException.getLastError () == null) JS.InvalidSmilesException.clear ();
throw  new JS.InvalidSmilesException (JS.InvalidSmilesException.getLastError ());
} else {
throw e;
}
}
return null;
}, "~S,~A,~N,JU.BS,JU.BS,~B,~N,~N");
Clazz_overrideMethod (c$, "cleanSmiles", 
function (smiles) {
return JS.SmilesParser.cleanPattern (smiles);
}, "~S");
Clazz_overrideMethod (c$, "getMapForJME", 
function (jme, at, bsAtoms) {
var molecule =  new JS.SmilesSearch ();
var tokens = JU.PT.getTokens (jme);
var nAtoms = JU.PT.parseInt (tokens[0]);
var nBonds = JU.PT.parseInt (tokens[1]);
var pt = 2;
for (var i = 0; i < nAtoms; i++, pt += 3) {
var sa = tokens[pt];
var a = molecule.addAtom ();
var ic = sa.indexOf ("+");
var charge = 0;
if (ic >= 0) {
charge = (ic == sa.length - 1 ? 1 : JU.PT.parseInt (sa.substring (ic + 1)));
} else if ((ic = sa.indexOf ("-")) >= 0) {
charge = JU.PT.parseInt (sa.substring (ic));
}a.setCharge (charge);
a.setSymbol (ic < 0 ? sa : sa.substring (0, ic));
}
for (var i = 0; i < nBonds; i++) {
var ia = JU.PT.parseInt (tokens[pt++]) - 1;
var ib = JU.PT.parseInt (tokens[pt++]) - 1;
var iorder = JU.PT.parseInt (tokens[pt++]);
var a1 = molecule.patternAtoms[ia];
var a2 = molecule.patternAtoms[ib];
var order = 1;
switch (iorder) {
default:
case 1:
break;
case 2:
order = 2;
break;
case 3:
order = 3;
break;
}
 new JS.SmilesBond (a1, a2, order, false).index = i;
}
var s = "";
try {
molecule.isSmarts = true;
molecule.set ();
var bs = JU.BSUtil.newBitSet2 (0, nAtoms);
s = this.getSmiles (molecule.patternAtoms, molecule.ac, bs, null, 34);
var map = this.getCorrelationMaps (s, molecule.patternAtoms, nAtoms, bs, 42);
var map2 = this.getCorrelationMaps (s, at, bsAtoms.cardinality (), bsAtoms, 42);
return  Clazz_newArray (-1, [map[0], map2[0]]);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
return null;
}, "~S,~A,JU.BS");
Clazz_defineStatics (c$,
"MODE_BITSET", 0x01,
"MODE_ARRAY", 0x02,
"MODE_MAP", 0x03,
"MODE_ATROP", 0x04);
});
Clazz_declarePackage ("JS");
Clazz_load (["java.lang.Exception"], "JS.InvalidSmilesException", null, function () {
c$ = Clazz_declareType (JS, "InvalidSmilesException", Exception);
c$.getLastError = Clazz_defineMethod (c$, "getLastError", 
function () {
return JS.InvalidSmilesException.lastError;
});
c$.clear = Clazz_defineMethod (c$, "clear", 
function () {
JS.InvalidSmilesException.lastError = null;
});
Clazz_overrideMethod (c$, "getMessage", 
function () {
return JS.InvalidSmilesException.lastError;
});
Clazz_makeConstructor (c$, 
function (message) {
Clazz_superConstructor (this, JS.InvalidSmilesException, [message]);
JS.InvalidSmilesException.lastError = (message.startsWith ("Jmol SMILES") ? message : "Jmol SMILES Exception: " + message);
}, "~S");
Clazz_defineStatics (c$,
"lastError", null);
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.JmolMolecule", "JU.BS", "$.Lst"], "JS.SmilesSearch", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.SB", "JS.InvalidSmilesException", "$.SmilesAromatic", "$.SmilesAtom", "$.SmilesBond", "$.SmilesMeasure", "$.SmilesParser", "$.VTemp", "JU.BSUtil", "$.Edge", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.isSmarts = false;
this.top = null;
this.pattern = null;
this.patternAtoms = null;
this.targetAtoms = null;
this.targetAtomCount = 0;
this.bsSelected = null;
this.v = null;
this.aromaticOpen = false;
this.aromaticStrict = false;
this.aromaticPlanar = false;
this.aromaticDouble = false;
this.aromaticMMFF94 = false;
this.aromaticDefined = false;
this.aromaticUnknown = false;
this.noAromatic = false;
this.ignoreAtomClass = false;
this.ignoreStereochemistry = false;
this.invertStereochemistry = false;
this.exitFirstMatch = false;
this.groupByModel = false;
this.setAtropicity = false;
this.patternAromatic = false;
this.haveTopo = false;
this.isTopology = false;
this.patternBioSequence = false;
this.subSearches = null;
this.haveSelected = false;
this.haveBondStereochemistry = false;
this.stereo = null;
this.needRingData = false;
this.needAromatic = true;
this.needRingMemberships = false;
this.nDouble = 0;
this.ringDataMax = -2147483648;
this.ringSets = null;
this.ringCount = 0;
this.measures = null;
this.flags = 0;
this.bsAromatic = null;
this.bsAromatic5 = null;
this.bsAromatic6 = null;
this.atropKeys = null;
this.lastChainAtom = null;
this.asVector = false;
this.getMaps = false;
this.isNormalized = false;
this.haveComponents = false;
this.isSilent = false;
this.isRingCheck = false;
this.selectedAtomCount = 0;
this.ringData = null;
this.ringCounts = null;
this.ringConnections = null;
this.bsFound = null;
this.htNested = null;
this.nNested = 0;
this.nestedBond = null;
this.vReturn = null;
this.uniqueList = null;
this.bsReturn = null;
this.bsCheck = null;
this.mapUnique = false;
this.bsAromaticRings = null;
Clazz_instantialize (this, arguments);
}, JS, "SmilesSearch", JU.JmolMolecule);
Clazz_prepareFields (c$, function () {
this.patternAtoms =  new Array (16);
this.measures =  new JU.Lst ();
this.bsAromatic =  new JU.BS ();
this.bsAromatic5 =  new JU.BS ();
this.bsAromatic6 =  new JU.BS ();
this.bsFound =  new JU.BS ();
this.bsReturn =  new JU.BS ();
});
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.SmilesSearch, []);
this.top = this;
this.v =  new JS.VTemp ();
});
Clazz_defineMethod (c$, "setTop", 
function (parent) {
while (parent.top !== parent) parent = parent.top;

this.top = parent;
}, "JS.SmilesSearch");
c$.addFlags = Clazz_defineMethod (c$, "addFlags", 
function (flags, strFlags) {
if (strFlags.indexOf ("OPEN") >= 0) flags |= 5;
if (strFlags.indexOf ("BIO") >= 0) flags |= 1048576;
if (strFlags.indexOf ("HYDROGEN") >= 0) flags |= 4096;
if (strFlags.indexOf ("FIRSTMATCHONLY") >= 0) flags |= 8;
if (strFlags.indexOf ("STRICT") >= 0) flags |= 256;
if (strFlags.indexOf ("PLANAR") >= 0) flags |= 1024;
if (strFlags.indexOf ("NOAROMATIC") >= 0 || strFlags.indexOf ("NONAROMATIC") >= 0) flags |= 16;
if (strFlags.indexOf ("AROMATICDOUBLE") >= 0) flags |= 512;
if (strFlags.indexOf ("AROMATICDEFINED") >= 0) flags |= 128;
if (strFlags.indexOf ("MMFF94") >= 0) flags |= 768;
if (strFlags.indexOf ("TOPOLOGY") >= 0) flags |= 8192;
if (strFlags.indexOf ("NOATOMCLASS") >= 0) flags |= 2048;
if (strFlags.indexOf ("NOSTEREO") >= 0) {
flags |= 32;
} else if (strFlags.indexOf ("INVERTSTEREO") >= 0) {
if ((flags & 64) != 0) flags &= -65;
 else flags |= 64;
}if (strFlags.indexOf ("ATOMCOMMENT") >= 0) flags |= 131072;
if (strFlags.indexOf ("GROUPBYMODEL") >= 0) flags |= 67108864;
if ((flags & 1048576) == 1048576) {
if (strFlags.indexOf ("NOCOMMENT") >= 0) flags |= 34603008;
if (strFlags.indexOf ("UNMATCHED") >= 0) flags |= 3145728;
if (strFlags.indexOf ("COVALENT") >= 0) flags |= 5242880;
if (strFlags.indexOf ("HBOND") >= 0) flags |= 9437184;
}return flags;
}, "~N,~S");
Clazz_defineMethod (c$, "setFlags", 
function (flags) {
this.flags = flags;
this.exitFirstMatch = new Boolean (this.exitFirstMatch | ((flags & 8) == 8)).valueOf ();
this.aromaticOpen = ((flags & 5) == 5);
this.aromaticDouble = ((flags & 512) == 512);
this.aromaticStrict = ((flags & 256) == 256);
this.aromaticPlanar = ((flags & 1024) == 1024);
this.aromaticMMFF94 = ((flags & 768) == 768);
this.aromaticDefined = ((flags & 128) == 128);
this.noAromatic = ((flags & 16) == 16);
this.aromaticUnknown = !this.noAromatic && !this.aromaticOpen && !this.aromaticDouble && !this.aromaticStrict && !this.aromaticPlanar && !this.aromaticMMFF94 && !this.aromaticDefined;
this.groupByModel = ((flags & 67108864) == 67108864);
this.ignoreAtomClass = ((flags & 2048) == 2048);
this.ignoreStereochemistry = ((flags & 32) == 32);
this.invertStereochemistry = !this.ignoreStereochemistry && ((flags & 64) == 64);
}, "~N");
Clazz_defineMethod (c$, "set", 
function () {
if (this.patternAtoms.length > this.ac) this.patternAtoms = JU.AU.arrayCopyObject (this.patternAtoms, this.ac);
this.nodes = this.patternAtoms;
this.isTopology = true;
this.patternAromatic = false;
this.patternBioSequence = true;
for (var i = this.ac; --i >= 0; ) {
var atom = this.patternAtoms[i];
if (this.isTopology && atom.isDefined ()) this.isTopology = false;
if (!atom.isBioResidue) this.patternBioSequence = false;
if (atom.isAromatic) this.patternAromatic = true;
atom.setBondArray ();
if (!this.isSmarts && atom.bioType == '\0' && !atom.setHydrogenCount ()) throw  new JS.InvalidSmilesException ("unbracketed atoms must be one of: B, C, N, O, P, S, F, Cl, Br, I, *,");
}
if (this.haveComponents) {
for (var i = this.ac; --i >= 0; ) {
var a = this.patternAtoms[i];
var bonds = a.bonds;
var ia = a.component;
for (var j = a.bondCount; --j >= 0; ) {
var b = bonds[j];
var ib;
if (b.isConnection && b.atom2 === a && (ib = b.atom1.component) != ia) {
for (var k = this.ac; --k >= 0; ) if (this.patternAtoms[k].component == ia) this.patternAtoms[k].component = ib;

}}
}
}});
Clazz_defineMethod (c$, "setSelected", 
function (bs) {
if (bs == null) {
bs = JU.BS.newN (this.targetAtomCount);
bs.setBits (0, this.targetAtomCount);
}this.bsSelected = bs;
}, "JU.BS");
Clazz_defineMethod (c$, "addAtom", 
function () {
return this.appendAtom ( new JS.SmilesAtom ());
});
Clazz_defineMethod (c$, "appendAtom", 
function (sAtom) {
if (this.ac >= this.patternAtoms.length) this.patternAtoms = JU.AU.doubleLength (this.patternAtoms);
return this.patternAtoms[this.ac] = sAtom.setIndex (this.ac++);
}, "JS.SmilesAtom");
Clazz_defineMethod (c$, "addNested", 
function (pattern) {
if (this.htNested == null) this.htNested =  new java.util.Hashtable ();
this.setNested (++this.nNested, pattern);
return this.nNested;
}, "~S");
Clazz_defineMethod (c$, "clear", 
function () {
this.bsReturn.clearAll ();
this.nNested = 0;
this.htNested = null;
this.nestedBond = null;
this.clearBsFound (-1);
});
Clazz_defineMethod (c$, "clearBsFound", 
 function (iAtom) {
if (iAtom < 0) {
if (this.bsCheck == null) {
this.bsFound.clearAll ();
}} else this.bsFound.clear (iAtom);
}, "~N");
Clazz_defineMethod (c$, "setNested", 
function (iNested, o) {
this.top.htNested.put ("_" + iNested, o);
}, "~N,~O");
Clazz_defineMethod (c$, "getNested", 
function (iNested) {
return this.top.htNested.get ("_" + iNested);
}, "~N");
Clazz_defineMethod (c$, "getMissingHydrogenCount", 
function () {
var n = 0;
var nH;
for (var i = 0; i < this.ac; i++) if ((nH = this.patternAtoms[i].explicitHydrogenCount) >= 0) n += nH;

return n;
});
Clazz_defineMethod (c$, "setRingData", 
function (bsA, vRings, doProcessAromatic) {
if (this.isTopology || this.patternBioSequence) this.needAromatic = false;
if (this.needAromatic) this.needRingData = true;
this.needAromatic = new Boolean (this.needAromatic & ( new Boolean ((bsA == null) & !this.noAromatic).valueOf ())).valueOf ();
if (!this.needAromatic) {
this.bsAromatic.clearAll ();
if (bsA != null) this.bsAromatic.or (bsA);
if (!this.needRingMemberships && !this.needRingData) return;
}this.getRingData (vRings, this.needRingData, doProcessAromatic);
}, "JU.BS,~A,~B");
Clazz_defineMethod (c$, "getRingData", 
function (vRings, needRingData, doTestAromatic) {
var isStrict = (this.needAromatic && (this.aromaticStrict || !this.aromaticOpen && !this.aromaticPlanar));
if (isStrict && this.aromaticUnknown) {
if (this.targetAtomCount > 0 && this.targetAtoms[this.bsSelected.nextSetBit (0)].modelIsRawPDB ()) isStrict = false;
}var isOpenNotStrict = (this.needAromatic && this.aromaticOpen && !this.aromaticStrict);
var checkExplicit = (this.needAromatic && !isStrict);
var doFinalize = (this.needAromatic && doTestAromatic && (isStrict || isOpenNotStrict));
var setAromatic = (this.needAromatic && !this.aromaticDefined);
var aromaticMax = 7;
var lstAromatic = (vRings == null ?  new JU.Lst () : (vRings[3] =  new JU.Lst ()));
var lstSP2 = (doFinalize ?  new JU.Lst () : null);
var strictness = (!isStrict ? 0 : this.aromaticMMFF94 ? 2 : 1);
if (this.needAromatic && this.aromaticDefined) {
JS.SmilesAromatic.checkAromaticDefined (this.targetAtoms, this.bsSelected, this.bsAromatic);
strictness = 0;
}if (this.ringDataMax < 0) this.ringDataMax = 8;
if (strictness > 0 && this.ringDataMax < 6) this.ringDataMax = 6;
if (needRingData) {
this.ringCounts =  Clazz_newIntArray (this.targetAtomCount, 0);
this.ringConnections =  Clazz_newIntArray (this.targetAtomCount, 0);
this.ringData =  new Array (this.ringDataMax + 1);
}this.ringSets =  new JU.Lst ();
if (this.targetAtomCount < 3) return;
var s = "****";
var max = this.ringDataMax;
while (s.length < max) s += s;

var eCounts = (doFinalize && setAromatic ?  Clazz_newIntArray (this.targetAtomCount, 0) : null);
var justCheckBonding = (setAromatic && Clazz_instanceOf (this.targetAtoms[0], JS.SmilesAtom));
for (var i = 3; i <= max; i++) {
if (i > this.targetAtomCount) break;
var smarts = "*1" + s.substring (0, i - 2) + "*1";
var search = JS.SmilesParser.newSearch (smarts, true, true);
var vR = this.subsearch (search, 2);
if (vRings != null && i <= 5) {
var v =  new JU.Lst ();
for (var j = vR.size (); --j >= 0; ) v.addLast (vR.get (j));

vRings[i - 3] = v;
}if (vR.size () == 0) continue;
if (setAromatic && i >= 4 && i <= aromaticMax) {
JS.SmilesAromatic.setAromatic (i, this.targetAtoms, this.bsSelected, vR, this.bsAromatic, strictness, isOpenNotStrict, justCheckBonding, checkExplicit, this.v, lstAromatic, lstSP2, eCounts, doTestAromatic);
}if (needRingData) {
this.ringData[i] =  new JU.BS ();
for (var k = vR.size (); --k >= 0; ) {
var r = vR.get (k);
this.ringData[i].or (r);
for (var j = r.nextSetBit (0); j >= 0; j = r.nextSetBit (j + 1)) this.ringCounts[j]++;

}
}}
if (this.needAromatic) {
if (doFinalize) JS.SmilesAromatic.finalizeAromatic (this.targetAtoms, this.bsAromatic, lstAromatic, lstSP2, eCounts, isOpenNotStrict, isStrict);
this.bsAromatic5.clearAll ();
this.bsAromatic6.clearAll ();
for (var i = lstAromatic.size (); --i >= 0; ) {
var bs = lstAromatic.get (i);
bs.and (this.bsAromatic);
switch (bs.cardinality ()) {
case 5:
this.bsAromatic5.or (bs);
break;
case 6:
this.bsAromatic6.or (bs);
break;
}
}
}if (needRingData) {
for (var i = this.bsSelected.nextSetBit (0); i >= 0; i = this.bsSelected.nextSetBit (i + 1)) {
var atom = this.targetAtoms[i];
var bonds = atom.getEdges ();
if (bonds != null) for (var k = bonds.length; --k >= 0; ) if (this.ringCounts[atom.getBondedAtomIndex (k)] > 0) this.ringConnections[i]++;

}
}}, "~A,~B,~B");
Clazz_defineMethod (c$, "subsearch", 
function (search, submode) {
search.ringSets = this.ringSets;
search.mapUnique = this.mapUnique;
search.targetAtoms = this.targetAtoms;
search.targetAtomCount = this.targetAtomCount;
search.bsSelected = this.bsSelected;
search.htNested = this.htNested;
search.haveTopo = this.haveTopo;
search.bsCheck = this.bsCheck;
search.isSmarts = true;
search.bsAromatic = this.bsAromatic;
search.bsAromatic5 = this.bsAromatic5;
search.bsAromatic6 = this.bsAromatic6;
search.ringData = this.ringData;
search.ringCounts = this.ringCounts;
search.ringConnections = this.ringConnections;
switch (submode) {
case 1:
search.exitFirstMatch = false;
break;
case 2:
search.isRingCheck = true;
search.isSilent = true;
search.asVector = true;
break;
case 3:
search.ignoreAtomClass = this.ignoreAtomClass;
search.aromaticDouble = this.aromaticDouble;
search.haveSelected = this.haveSelected;
search.exitFirstMatch = this.exitFirstMatch;
search.getMaps = this.getMaps;
search.asVector = this.asVector;
search.vReturn = this.vReturn;
search.bsReturn = this.bsReturn;
search.haveBondStereochemistry = this.haveBondStereochemistry;
break;
}
return search.search2 (submode == 1);
}, "JS.SmilesSearch,~N");
Clazz_defineMethod (c$, "search", 
function () {
return this.search2 (false);
});
Clazz_defineMethod (c$, "search2", 
 function (firstAtomOnly) {
this.setFlags (this.flags);
if (!this.isRingCheck && JU.Logger.debugging && !this.isSilent) JU.Logger.debug ("SmilesSearch processing " + this.pattern);
if (this.vReturn == null && (this.asVector || this.getMaps)) this.vReturn =  new JU.Lst ();
if (this.bsSelected == null) {
this.bsSelected = JU.BS.newN (this.targetAtomCount);
this.bsSelected.setBits (0, this.targetAtomCount);
}this.selectedAtomCount = this.bsSelected.cardinality ();
if (this.subSearches != null) {
for (var i = 0; i < this.subSearches.length; i++) {
if (this.subSearches[i] == null) continue;
this.subsearch (this.subSearches[i], 3);
if (this.exitFirstMatch) {
if (this.vReturn == null ? this.bsReturn.nextSetBit (0) >= 0 : this.vReturn.size () > 0) break;
}}
} else if (this.ac > 0) {
if (this.nestedBond == null) {
this.clearBsFound (-1);
} else {
this.bsReturn.clearAll ();
}this.nextPatternAtom (-1, -1, firstAtomOnly, -1);
}return (this.asVector || this.getMaps ? this.vReturn : this.bsReturn);
}, "~B");
Clazz_defineMethod (c$, "nextPatternAtom", 
 function (atomNum, iAtom, firstAtomOnly, c) {
var jmolAtom;
var jmolBonds;
if (++atomNum < this.ac) {
var newPatternAtom = this.patternAtoms[atomNum];
var newPatternBond = (iAtom >= 0 ? newPatternAtom.getBondTo (null) : atomNum == 0 ? this.nestedBond : null);
if (newPatternBond == null) {
var bs = JU.BSUtil.copy (this.bsFound);
var bs0 = JU.BSUtil.copy (this.bsFound);
if (newPatternAtom.notBondedIndex >= 0) {
var pa = this.patternAtoms[newPatternAtom.notBondedIndex];
var a = pa.getMatchingAtom ();
if (pa.isBioAtom) {
var ii = a.getOffsetResidueAtom ("\0", 1);
if (ii >= 0) bs.set (ii);
ii = a.getOffsetResidueAtom ("\0", -1);
if (ii >= 0) bs.set (ii);
} else {
jmolBonds = a.getEdges ();
for (var k = 0; k < jmolBonds.length; k++) bs.set (jmolBonds[k].getOtherNode (a).getIndex ());

}}var skipGroup = ((newPatternAtom.isBioAtomWild));
var j1 = this.bsSelected.nextSetBit (0);
j1 = (skipGroup && j1 >= 0 ? this.targetAtoms[j1].getOffsetResidueAtom ("\0", j1) : j1);
var oldJmolComponent;
var oldPatternComponent = (atomNum > 0 ? this.patternAtoms[atomNum - 1] : newPatternAtom).component;
var thisPatternComponent = newPatternAtom.component;
var checkComponents = this.haveComponents && thisPatternComponent != -2147483648;
for (var j = j1; j >= 0; j = this.bsSelected.nextSetBit (j + 1)) {
if (!bs.get (j) && !this.bsFound.get (j)) {
jmolAtom = this.targetAtoms[j];
if (checkComponents && !this.isRingCheck) {
c = (this.groupByModel ? jmolAtom.getModelIndex () : jmolAtom.getMoleculeNumber (false));
oldJmolComponent = (atomNum > 0 ? this.patternAtoms[atomNum - 1].matchingComponent : c);
if ((oldPatternComponent == thisPatternComponent) != (oldJmolComponent == c)) continue;
}if (!this.nextTargetAtom (newPatternAtom, jmolAtom, atomNum, j, firstAtomOnly, c)) return false;
}if (skipGroup) {
j1 = this.targetAtoms[j].getOffsetResidueAtom (newPatternAtom.bioAtomName, 1);
if (j1 >= 0) j = j1 - 1;
}}
this.bsFound = bs0;
return true;
}jmolAtom = newPatternBond.atom1.getMatchingAtom ();
switch (newPatternBond.order) {
case 96:
var nextGroupAtom = jmolAtom.getOffsetResidueAtom (newPatternAtom.bioAtomName, 1);
if (nextGroupAtom >= 0) {
var bs = JU.BSUtil.copy (this.bsFound);
jmolAtom.getGroupBits (this.bsFound);
if (this.doCheckAtom (nextGroupAtom) && !this.nextTargetAtom (newPatternAtom, this.targetAtoms[nextGroupAtom], atomNum, nextGroupAtom, firstAtomOnly, c)) return false;
this.bsFound = bs;
}return true;
case 112:
var vLinks =  new JU.Lst ();
jmolAtom.getCrossLinkVector (vLinks, true, true);
var bs = JU.BSUtil.copy (this.bsFound);
jmolAtom.getGroupBits (this.bsFound);
for (var j = 2; j < vLinks.size (); j += 3) {
var ia = vLinks.get (j).intValue ();
if (this.doCheckAtom (ia) && !this.nextTargetAtom (newPatternAtom, this.targetAtoms[ia], atomNum, ia, firstAtomOnly, c)) return false;
}
this.bsFound = bs;
return true;
}
jmolBonds = jmolAtom.getEdges ();
if (jmolBonds != null) for (var j = 0; j < jmolBonds.length; j++) {
var ia = jmolAtom.getBondedAtomIndex (j);
if (this.doCheckAtom (ia) && !this.nextTargetAtom (newPatternAtom, this.targetAtoms[ia], atomNum, ia, firstAtomOnly, c)) return false;
}
this.clearBsFound (iAtom);
return true;
}if (!this.ignoreStereochemistry && !this.isRingCheck && !this.checkStereochemistry ()) return true;
var bs =  new JU.BS ();
var nMatch = 0;
for (var j = 0; j < this.ac; j++) {
var i = this.patternAtoms[j].getMatchingAtomIndex ();
if (!firstAtomOnly && this.top.haveSelected && !this.patternAtoms[j].selected) continue;
nMatch++;
bs.set (i);
if (this.patternAtoms[j].isBioAtomWild) this.targetAtoms[i].getGroupBits (bs);
if (firstAtomOnly) break;
if (!this.isSmarts) if (!this.setAtropicity && this.patternAtoms[j].explicitHydrogenCount > 0) {
var atom = this.targetAtoms[i];
for (var k = 0, n = atom.getEdges ().length; k < n; k++) {
var ia = atom.getBondedAtomIndex (k);
if (this.targetAtoms[ia].getElementNumber () == 1) bs.set (ia);
}
}}
if (!this.isSmarts && bs.cardinality () != this.selectedAtomCount) return true;
if (this.bsCheck != null) {
if (firstAtomOnly) {
this.bsCheck.clearAll ();
for (var j = 0; j < this.ac; j++) {
this.bsCheck.set (this.patternAtoms[j].getMatchingAtomIndex ());
}
if (this.bsCheck.cardinality () != this.ac) return true;
} else {
if (bs.cardinality () != this.ac) return true;
}}this.bsReturn.or (bs);
if (this.getMaps) {
if (this.mapUnique) {
if (this.uniqueList == null) this.uniqueList =  new JU.Lst ();
for (var j = this.uniqueList.size (); --j >= 0; ) if (this.uniqueList.get (j).equals (bs)) return true;

this.uniqueList.addLast (bs);
}var map =  Clazz_newIntArray (nMatch, 0);
for (var j = 0, nn = 0; j < this.ac; j++) {
if (!firstAtomOnly && this.top.haveSelected && !this.patternAtoms[j].selected) continue;
map[nn++] = this.patternAtoms[j].getMatchingAtomIndex ();
}
this.vReturn.addLast (map);
return !this.exitFirstMatch;
}if (this.asVector) {
var isOK = true;
for (var j = this.vReturn.size (); --j >= 0 && isOK; ) isOK = !((this.vReturn.get (j)).equals (bs));

if (!isOK) return true;
this.vReturn.addLast (bs);
}if (this.isRingCheck) {
var bsRing =  new JU.BS ();
for (var k = atomNum * 3 + 2; --k > atomNum; ) bsRing.set (this.patternAtoms[(k <= atomNum * 2 ? atomNum * 2 - k + 1 : k - 1) % atomNum].getMatchingAtomIndex ());

this.ringSets.addLast (bsRing);
return true;
}if (this.exitFirstMatch) return false;
return (bs.cardinality () != this.selectedAtomCount);
}, "~N,~N,~B,~N");
Clazz_defineMethod (c$, "doCheckAtom", 
 function (j) {
return this.bsSelected.get (j) && !this.bsFound.get (j);
}, "~N");
Clazz_defineMethod (c$, "nextTargetAtom", 
 function (patternAtom, jmolAtom, atomNum, iAtom, firstAtomOnly, c) {
var jmolBonds;
if (!this.isRingCheck && !this.isTopology) {
if (patternAtom.subAtoms == null) {
if (!this.checkPrimitiveAtom (patternAtom, iAtom)) return true;
} else if (patternAtom.isAND) {
for (var i = 0; i < patternAtom.nSubAtoms; i++) if (!this.checkPrimitiveAtom (patternAtom.subAtoms[i], iAtom)) return true;

} else {
for (var i = 0; i < patternAtom.nSubAtoms; i++) if (!this.nextTargetAtom (patternAtom.subAtoms[i], jmolAtom, atomNum, iAtom, firstAtomOnly, c)) return false;

return true;
}}jmolBonds = jmolAtom.getEdges ();
for (var i = patternAtom.getBondCount (); --i >= 0; ) {
var patternBond = patternAtom.getBond (i);
if (patternBond.getAtomIndex2 () != patternAtom.index) continue;
var atom1 = patternBond.atom1;
var matchingAtom = atom1.getMatchingAtomIndex ();
switch (patternBond.order) {
case 96:
case 112:
if (!this.checkMatchBond (patternAtom, atom1, patternBond, iAtom, matchingAtom, null)) return true;
break;
default:
var k = 0;
var jmolBond = null;
for (; k < jmolBonds.length; k++) if ((jmolBond = jmolBonds[k]).isCovalent () && (jmolBond.getAtomIndex1 () == matchingAtom || jmolBond.getAtomIndex2 () == matchingAtom)) break;

if (k == jmolBonds.length) return true;
if (!this.checkMatchBond (patternAtom, atom1, patternBond, iAtom, matchingAtom, jmolBond)) return true;
}
}
patternAtom = this.patternAtoms[patternAtom.index];
patternAtom.setMatchingAtom (this.targetAtoms[iAtom], iAtom);
patternAtom.matchingComponent = c;
if (JU.Logger.debuggingHigh && !this.isRingCheck) {
for (var i = 0; i <= atomNum; i++) JU.Logger.debug ("pattern atoms " + this.patternAtoms[i] + " " + this.patternAtoms[i].matchingComponent);

JU.Logger.debug ("--ss--");
}this.bsFound.set (iAtom);
if (!this.nextPatternAtom (atomNum, iAtom, firstAtomOnly, c)) return false;
if (iAtom >= 0) this.clearBsFound (iAtom);
return true;
}, "JS.SmilesAtom,JU.Node,~N,~N,~B,~N");
Clazz_defineMethod (c$, "checkPrimitiveAtom", 
 function (patternAtom, iTarget) {
if (patternAtom.nSubAtoms > 0) {
for (var i = 0; i < patternAtom.nSubAtoms; i++) if (this.checkPrimitiveAtom (patternAtom.subAtoms[i], iTarget)) return true;

return false;
}var targetAtom = this.targetAtoms[iTarget];
var foundAtom = patternAtom.not;
while (true) {
if (patternAtom.iNested > 0) {
var o = this.getNested (patternAtom.iNested);
if (Clazz_instanceOf (o, JS.SmilesSearch)) {
var search = o;
if (patternAtom.isBioAtom) search.nestedBond = patternAtom.getBondTo (null);
o = this.subsearch (search, 1);
if (o == null) o =  new JU.BS ();
if (!patternAtom.isBioAtom) this.setNested (patternAtom.iNested, o);
}foundAtom = (patternAtom.not != ((o).get (iTarget)));
break;
}var na = targetAtom.getElementNumber ();
var n = patternAtom.elementNumber;
if (na >= 0 && n >= 0 && n != na) break;
if (patternAtom.isBioResidue) {
var a = targetAtom;
if (patternAtom.bioAtomName != null && (patternAtom.isLeadAtom () ? !a.isLeadAtom () : !patternAtom.bioAtomName.equals (a.getAtomName ().toUpperCase ()))) break;
if (patternAtom.residueName != null && !patternAtom.residueName.equals (a.getGroup3 (false).toUpperCase ())) break;
if (patternAtom.residueNumber != -2147483648 && patternAtom.residueNumber != a.getResno ()) break;
if (patternAtom.insCode != '\0' && patternAtom.insCode != a.getInsertionCode ()) break;
if (patternAtom.residueChar != null || patternAtom.elementNumber == -2) {
var atype = a.getBioSmilesType ();
var ptype = patternAtom.getBioSmilesType ();
var ok = true;
var isNucleic = false;
switch (ptype) {
case '\0':
case '*':
ok = true;
break;
case 'n':
ok = (atype == 'r' || atype == 'c');
isNucleic = true;
break;
case 'r':
case 'c':
isNucleic = true;
default:
ok = (atype == ptype);
break;
}
if (!ok) break;
var s = a.getGroup1 ('\0').toUpperCase ();
var resChar = (patternAtom.residueChar == null ? '*' : patternAtom.residueChar.charAt (0));
var isOK = (resChar == s.charAt (0));
switch (resChar) {
case '*':
isOK = true;
break;
case 'N':
isOK = isNucleic ? (atype == 'r' || atype == 'c') : isOK;
break;
case 'R':
isOK = isNucleic ? a.isPurine () : isOK;
break;
case 'Y':
isOK = isNucleic ? a.isPyrimidine () : isOK;
break;
}
if (!isOK) break;
}if (patternAtom.isBioAtom) {
if (patternAtom.notCrossLinked && a.getCrossLinkVector (null, true, true)) break;
}} else {
if (patternAtom.atomNumber != -2147483648 && patternAtom.atomNumber != targetAtom.getAtomNumber ()) break;
if (patternAtom.jmolIndex >= 0 && targetAtom.getIndex () != patternAtom.jmolIndex) break;
if (patternAtom.atomType != null && !patternAtom.atomType.equals (targetAtom.getAtomType ())) break;
if ((n = patternAtom.getAtomicMass ()) != -2147483648 && (n >= 0 && n != (na = targetAtom.getIsotopeNumber ()) || n < 0 && na != 0 && -n != na)) break;
if (!this.noAromatic && !patternAtom.aromaticAmbiguous && patternAtom.isAromatic != this.bsAromatic.get (iTarget)) break;
if ((n = patternAtom.getCharge ()) != -2147483648 && n != targetAtom.getFormalCharge ()) break;
n = patternAtom.getCovalentHydrogenCount () + patternAtom.explicitHydrogenCount;
if (n >= 0 && n != targetAtom.getTotalHydrogenCount ()) break;
if ((n = patternAtom.implicitHydrogenCount) != -2147483648) {
na = targetAtom.getImplicitHydrogenCount ();
if (n == -1 ? na == 0 : n != na) break;
}if (patternAtom.degree > 0 && patternAtom.degree != targetAtom.getCovalentBondCount () - targetAtom.getImplicitHydrogenCount ()) break;
if (patternAtom.nonhydrogenDegree > 0 && patternAtom.nonhydrogenDegree != targetAtom.getCovalentBondCount () - targetAtom.getCovalentHydrogenCount ()) break;
if (this.isSmarts && patternAtom.valence > 0 && patternAtom.valence != targetAtom.getTotalValence ()) break;
if (patternAtom.connectivity > 0 && patternAtom.connectivity != targetAtom.getCovalentBondCountPlusMissingH ()) break;
if (patternAtom.atomNumber != -2147483648 && patternAtom.atomNumber != targetAtom.getAtomNumber ()) break;
if (patternAtom.jmolIndex >= 0 && targetAtom.getIndex () != patternAtom.jmolIndex) break;
if (patternAtom.atomType != null && !patternAtom.atomType.equals (targetAtom.getAtomType ())) break;
if (!this.ignoreAtomClass || this.isSmarts) {
if (!Float.isNaN (patternAtom.atomClass) && patternAtom.atomClass != targetAtom.getFloatProperty ("property_atomclass")) break;
}if (this.ringData != null) {
if (patternAtom.ringSize >= -1) {
if (patternAtom.ringSize <= 0) {
if ((this.ringCounts[iTarget] == 0) != (patternAtom.ringSize == 0)) break;
} else {
var rd = this.ringData[patternAtom.ringSize == 500 ? 5 : patternAtom.ringSize == 600 ? 6 : patternAtom.ringSize];
if (rd == null || !rd.get (iTarget)) break;
if (!this.noAromatic) if (patternAtom.ringSize == 500) {
if (!this.bsAromatic5.get (iTarget)) break;
} else if (patternAtom.ringSize == 600) {
if (!this.bsAromatic6.get (iTarget)) break;
}}}if (patternAtom.ringMembership >= -1) {
if (patternAtom.ringMembership == -1 ? this.ringCounts[iTarget] == 0 : this.ringCounts[iTarget] != patternAtom.ringMembership) break;
}if (patternAtom.ringConnectivity >= 0) {
n = this.ringConnections[iTarget];
if (patternAtom.ringConnectivity == -1 && n == 0 || patternAtom.ringConnectivity != -1 && n != patternAtom.ringConnectivity) break;
}}}foundAtom = !foundAtom;
break;
}
return foundAtom;
}, "JS.SmilesAtom,~N");
Clazz_defineMethod (c$, "checkMatchBond", 
 function (patternAtom, atom1, patternBond, iAtom, matchingAtom, bond) {
if (patternBond.bondsOr != null) {
for (var ii = 0; ii < patternBond.nBondsOr; ii++) if (this.checkMatchBond (patternAtom, atom1, patternBond.bondsOr[ii], iAtom, matchingAtom, bond)) return true;

return false;
}if (!this.isRingCheck && !this.isTopology) if (patternBond.nPrimitives == 0) {
if (!this.checkPrimitiveBond (patternBond, iAtom, matchingAtom, bond)) return false;
} else {
for (var i = 0; i < patternBond.nPrimitives; i++) {
var prim = patternBond.setPrimitive (i);
if (!this.checkPrimitiveBond (prim, iAtom, matchingAtom, bond)) return false;
}
}patternBond.matchingBond = bond;
return true;
}, "JS.SmilesAtom,JS.SmilesAtom,JS.SmilesBond,~N,~N,JU.Edge");
Clazz_defineMethod (c$, "checkPrimitiveBond", 
 function (patternBond, iAtom1, iAtom2, bond) {
var bondFound = false;
switch (patternBond.order) {
case 96:
return (patternBond.isNot != (this.targetAtoms[iAtom2].getOffsetResidueAtom ("\0", 1) == this.targetAtoms[iAtom1].getOffsetResidueAtom ("\0", 0)));
case 112:
return (patternBond.isNot != this.targetAtoms[iAtom1].isCrossLinked (this.targetAtoms[iAtom2]));
}
var isAromatic1 = (!this.noAromatic && this.bsAromatic.get (iAtom1));
var isAromatic2 = (!this.noAromatic && this.bsAromatic.get (iAtom2));
var order = bond.getCovalentOrder ();
var patternOrder = patternBond.order;
if (isAromatic1 && isAromatic2) {
switch (patternOrder) {
case 17:
case 65:
bondFound = JS.SmilesSearch.isRingBond (this.ringSets, null, iAtom1, iAtom2);
break;
case 1:
bondFound = !this.isSmarts || !JS.SmilesSearch.isRingBond (this.ringSets, this.getBSAromaticRings (), iAtom1, iAtom2);
break;
case 2:
bondFound = this.isNormalized || this.aromaticDouble && (order == 2 || order == 514);
break;
case 65537:
case 65538:
bondFound = !patternBond.isNot;
break;
case 81:
case -1:
bondFound = true;
break;
}
} else {
switch (patternOrder) {
case 17:
if (!this.noAromatic) break;
case 81:
case -1:
bondFound = true;
break;
case 1:
case 1025:
case 1041:
switch (order) {
case 1:
case 1025:
case 1041:
bondFound = true;
break;
}
break;
case 65537:
case 65538:
switch (order) {
case 1:
case 65537:
case 65538:
bondFound = !patternBond.isNot;
break;
}
break;
case 2:
case 3:
case 4:
bondFound = (order == patternOrder);
break;
case 65:
bondFound = JS.SmilesSearch.isRingBond (this.ringSets, null, iAtom1, iAtom2);
break;
}
}return bondFound != patternBond.isNot;
}, "JS.SmilesBond,~N,~N,JU.Edge");
Clazz_defineMethod (c$, "getBSAromaticRings", 
 function () {
if (this.bsAromaticRings == null) {
this.bsAromaticRings =  new JU.BS ();
if (this.ringSets != null && this.bsAromatic != null) {
for (var i = this.ringSets.size (); --i >= 0; ) {
var bsRing = this.ringSets.get (i).clone ();
bsRing.andNot (this.bsAromatic);
if (bsRing.isEmpty ()) this.bsAromaticRings.set (i);
}
}}return this.bsAromaticRings;
});
c$.isRingBond = Clazz_defineMethod (c$, "isRingBond", 
function (ringSets, bsAromaticRings, a1, a2) {
if (ringSets != null) for (var i = ringSets.size (); --i >= 0; ) {
var bsRing = ringSets.get (i);
if (bsRing.get (a1) && bsRing.get (a2)) {
if (bsAromaticRings == null || bsAromaticRings.get (i)) return true;
}}
return false;
}, "JU.Lst,JU.BS,~N,~N");
Clazz_defineMethod (c$, "checkStereochemistry", 
 function () {
for (var i = 0; i < this.measures.size (); i++) if (!this.measures.get (i).check ()) return false;

if (this.stereo != null && !this.stereo.checkStereoChemistry (this, this.v)) return false;
if (!this.haveBondStereochemistry) return true;
var lstAtrop = null;
var b = null;
for (var k = 0; k < this.ac; k++) {
var sAtom1 = this.patternAtoms[k];
var sAtom2 = null;
var sAtomDirected1 = null;
var sAtomDirected2 = null;
var dir1 = 0;
var dir2 = 0;
var bondType = 0;
var nBonds = sAtom1.getBondCount ();
var isAtropisomer = false;
var indexOrder = true;
for (var j = 0; j < nBonds; j++) {
b = sAtom1.getBond (j);
var isAtom2 = (b.atom2 === sAtom1);
indexOrder = (b.atom1.index < b.atom2.index);
var type = b.order;
switch (type) {
case 65537:
case 65538:
if (!indexOrder) continue;
case 2:
if (isAtom2) continue;
sAtom2 = b.atom2;
bondType = type;
isAtropisomer = (type != 2);
if (isAtropisomer) dir1 = (b.isNot ? -1 : 1);
break;
case 1025:
case 1041:
sAtomDirected1 = (isAtom2 ? b.atom1 : b.atom2);
dir1 = (isAtom2 != (type == 1025) ? 1 : -1);
break;
}
}
if (isAtropisomer) {
if (this.setAtropicity) {
if (lstAtrop == null) lstAtrop =  new JU.Lst ();
lstAtrop.addLast (b);
continue;
}var b1 = sAtom1.getBond (b.atropType[0]);
if (b1 == null) return false;
sAtomDirected1 = b1.getOtherAtom (sAtom1);
b1 = sAtom2.getBond (b.atropType[1]);
if (b1 == null) return false;
sAtomDirected2 = b1.getOtherAtom (sAtom2);
if (JU.Logger.debugging) JU.Logger.info ("atropisomer check for atoms " + sAtomDirected1 + sAtom1 + " " + sAtom2 + sAtomDirected2);
} else {
if (sAtom2 == null || dir1 == 0) continue;
var a10 = sAtom1;
var nCumulene = 0;
while (sAtom2.getBondCount () == 2 && sAtom2.getValence () == 4) {
nCumulene++;
var e2 = sAtom2.getEdges ();
var e = e2[e2[0].getOtherNode (sAtom2) === a10 ? 1 : 0];
a10 = sAtom2;
sAtom2 = e.getOtherNode (sAtom2);
}
if (nCumulene % 2 == 1) continue;
nBonds = sAtom2.getBondCount ();
for (var j = 0; j < nBonds && dir2 == 0; j++) {
b = sAtom2.getBond (j);
var type = b.order;
switch (type) {
case 1025:
case 1041:
var isAtom2 = (b.atom2 === sAtom2);
sAtomDirected2 = (isAtom2 ? b.atom1 : b.atom2);
dir2 = (isAtom2 != (type == 1025) ? 1 : -1);
break;
}
}
if (dir2 == 0) continue;
}var dbAtom1 = sAtom1.getMatchingAtom ();
var dbAtom2 = sAtom2.getMatchingAtom ();
var dbAtom1a = sAtomDirected1.getMatchingAtom ();
var dbAtom2a = sAtomDirected2.getMatchingAtom ();
if (dbAtom1a == null || dbAtom2a == null) return false;
if (this.haveTopo) this.setTopoCoordinates (dbAtom1, dbAtom2, dbAtom1a, dbAtom2a, bondType);
var d = JS.SmilesMeasure.setTorsionData (dbAtom1a, dbAtom1, dbAtom2, dbAtom2a, this.v, isAtropisomer);
if (isAtropisomer) {
d *= dir1 * (bondType == 65537 ? 1 : -1) * (indexOrder ? 1 : -1);
if (JU.Logger.debugging) JU.Logger.info ("atrop dihedral " + d + " " + sAtom1 + " " + sAtom2 + " " + b);
if (d < 1.0) return false;
} else {
if (this.v.vTemp1.dot (this.v.vTemp2) * dir1 * dir2 < 0) return false;
}}
if (this.setAtropicity) {
this.atropKeys = "";
for (var i = 0; i < lstAtrop.size (); i++) this.atropKeys += "," + this.getAtropIndex ((b = lstAtrop.get (i)), true) + this.getAtropIndex (b, false);

}return true;
});
Clazz_defineMethod (c$, "getAtropIndex", 
 function (b, isFirst) {
var s1 = (isFirst ? b.atom1 : b.atom2);
var a1 = s1.getMatchingAtom ();
var a11 = JU.Edge.getAtropismNode (b.matchingBond.order, a1, isFirst);
var b1 = s1.bonds;
for (var i = s1.getBondCount (); --i >= 0; ) if ((b1[i].getOtherNode (s1)).getMatchingAtom () === a11) return i + 1;

return 0;
}, "JS.SmilesBond,~B");
Clazz_defineMethod (c$, "setTopoCoordinates", 
 function (dbAtom1, dbAtom2, dbAtom1a, dbAtom2a, bondType) {
dbAtom1.set (-1, 0, 0);
dbAtom2.set (1, 0, 0);
if (bondType != 2) {
var bond = dbAtom1.getBondTo (dbAtom2);
var dir = (bond.order == 65537 ? 1 : -1);
dbAtom1a.set (-1, 1, 0);
dbAtom2a.set (1, 1, dir / 2.0);
return;
}var nBonds = 0;
var dir1 = 0;
var bonds = dbAtom1.getEdges ();
for (var k = bonds.length; --k >= 0; ) {
var bond = bonds[k];
if (bond.order == 2) continue;
var atom = bond.getOtherNode (dbAtom1);
(atom).set (-1, (nBonds++ == 0) ? -1 : 1, 0);
var mode = (bond.getAtomIndex2 () == dbAtom1.getIndex () ? nBonds : -nBonds);
switch (bond.order) {
case 1025:
dir1 = mode;
break;
case 1041:
dir1 = -mode;
}
}
var dir2 = 0;
nBonds = 0;
var atoms =  new Array (2);
bonds = dbAtom2.getEdges ();
for (var k = bonds.length; --k >= 0; ) {
var bond = bonds[k];
if (bond.order == 2) continue;
var atom = bond.getOtherNode (dbAtom2);
atoms[nBonds] = atom;
(atom).set (1, (nBonds++ == 0) ? 1 : -1, 0);
var mode = (bond.getAtomIndex2 () == dbAtom2.getIndex () ? nBonds : -nBonds);
switch (bond.order) {
case 1025:
dir2 = mode;
break;
case 1041:
dir2 = -mode;
}
}
if ((dir1 * dir2 > 0) == (Math.abs (dir1) % 2 == Math.abs (dir2) % 2)) {
var y = (atoms[0]).y;
(atoms[0]).y = (atoms[1]).y;
(atoms[1]).y = y;
}}, "JS.SmilesAtom,JS.SmilesAtom,JS.SmilesAtom,JS.SmilesAtom,~N");
Clazz_defineMethod (c$, "createTopoMap", 
function (bsAro) {
var isForMF = (bsAro == null);
var nAtomsMissing = this.getMissingHydrogenCount ();
var totalAtoms = this.ac + nAtomsMissing;
var atoms =  new Array (totalAtoms);
this.targetAtoms = atoms;
for (var i = 0, ptAtom = 0; i < this.ac; i++, ptAtom++) {
var sAtom = this.patternAtoms[i];
var n = sAtom.explicitHydrogenCount;
if (n < 0) n = 0;
var atom = atoms[ptAtom] =  new JS.SmilesAtom ().setTopoAtom (sAtom.component, ptAtom, sAtom.symbol, sAtom.getCharge (), i);
atom.implicitHydrogenCount = n;
if (isForMF) continue;
atom.mapIndex = i;
atom.stereo = sAtom.stereo;
atom.setAtomicMass (sAtom.getAtomicMass ());
atom.bioAtomName = sAtom.bioAtomName;
atom.residueName = sAtom.residueName;
atom.residueChar = sAtom.residueChar;
atom.residueNumber = sAtom.residueNumber;
atom.atomNumber = sAtom.residueNumber;
atom.insCode = sAtom.insCode;
atom.atomClass = sAtom.atomClass;
atom.explicitHydrogenCount = 0;
atom.isBioAtom = sAtom.isBioAtom;
atom.bioType = sAtom.bioType;
atom.$isLeadAtom = sAtom.$isLeadAtom;
if (!isForMF && sAtom.isAromatic) bsAro.set (ptAtom);
sAtom.setMatchingAtom (null, ptAtom);
var bonds =  new Array (sAtom.getBondCount () + n);
atom.setBonds (bonds);
while (--n >= 0) {
var atomH = atoms[++ptAtom] =  new JS.SmilesAtom ().setTopoAtom (atom.component, ptAtom, "H", 0, -1);
atomH.mapIndex = -i - 1;
atomH.setBonds ( new Array (1));
var b =  new JS.SmilesBond (atom, atomH, 1, false);
if (JU.Logger.debugging) JU.Logger.info ("" + b);
}
}
if (isForMF) return;
for (var i = 0; i < this.ac; i++) {
var sAtom = this.patternAtoms[i];
var i1 = sAtom.getMatchingAtomIndex ();
var atom1 = atoms[i1];
var n = sAtom.getBondCount ();
for (var j = 0; j < n; j++) {
var sBond = sAtom.getBond (j);
var firstAtom = (sBond.atom1 === sAtom);
if (firstAtom) {
var order = 1;
switch (sBond.order) {
case 1:
case 2:
case 3:
case 4:
case 1025:
case 1041:
case 65537:
case 65538:
case 112:
case 96:
order = sBond.order;
break;
case 17:
order = 514;
break;
}
var atom2 = atoms[sBond.atom2.getMatchingAtomIndex ()];
var b =  new JS.SmilesBond (atom1, atom2, order, false);
b.isConnection = sBond.isConnection;
atom2.bondCount--;
if (JU.Logger.debugging) JU.Logger.info ("" + b);
} else {
var atom2 = atoms[sBond.atom1.getMatchingAtomIndex ()];
var b = atom2.getBondTo (atom1);
atom1.addBond (b);
}}
}
for (var i = 0; i < totalAtoms; i++) {
var a = atoms[i];
var bonds = a.bonds;
if (bonds.length < 2 || bonds[0].isFromPreviousTo (a)) continue;
for (var k = bonds.length; --k >= 1; ) if (bonds[k].isFromPreviousTo (a)) {
var b = bonds[k];
bonds[k] = bonds[0];
bonds[0] = b;
break;
}
}
if (!this.ignoreStereochemistry) for (var i = this.ac; --i >= 0; ) {
var sAtom = this.patternAtoms[i];
if (sAtom.stereo != null) sAtom.stereo.fixStereo (sAtom);
}
}, "JU.BS");
c$.normalizeAromaticity = Clazz_defineMethod (c$, "normalizeAromaticity", 
function (atoms, bsAromatic, flags) {
var ss =  new JS.SmilesSearch ();
ss.setFlags (flags);
ss.targetAtoms = atoms;
ss.targetAtomCount = atoms.length;
ss.bsSelected = JU.BSUtil.newBitSet2 (0, atoms.length);
var vRings = JU.AU.createArrayOfArrayList (4);
ss.setRingData (null, vRings, true);
bsAromatic.or (ss.bsAromatic);
if (!bsAromatic.isEmpty ()) {
var lst = vRings[3];
for (var i = lst.size (); --i >= 0; ) {
var bs = lst.get (i);
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
var a = atoms[j];
if (a.isAromatic || a.elementNumber == -2 || a.elementNumber == 0) continue;
a.setSymbol (a.symbol.toLowerCase ());
}
}
}}, "~A,JU.BS,~N");
Clazz_defineMethod (c$, "getSelections", 
function () {
var ht = this.top.htNested;
if (ht == null || this.targetAtoms.length == 0) return;
var htNew =  new java.util.Hashtable ();
for (var entry, $entry = ht.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getValue ().toString ();
if (key.startsWith ("select")) {
var bs = (htNew.containsKey (key) ? htNew.get (key) : this.targetAtoms[0].findAtomsLike (key.substring (6)));
if (bs == null) bs =  new JU.BS ();
htNew.put (key, bs);
entry.setValue (bs);
}}
});
Clazz_defineMethod (c$, "findImplicitHydrogen", 
function (atom) {
var edges = atom.getEdges ();
for (var i = edges.length; --i >= 0; ) {
var k = atom.getBondedAtomIndex (i);
if (this.targetAtoms[k].getElementNumber () == 1 && !this.bsFound.get (k)) return this.targetAtoms[k];
}
return null;
}, "JU.Node");
Clazz_defineMethod (c$, "toString", 
function () {
var sb =  new JU.SB ().append (this.pattern);
sb.append ("\nmolecular formula: " + this.getMolecularFormula (true, null, false));
return sb.toString ();
});
Clazz_defineStatics (c$,
"SUBMODE_NESTED", 1,
"SUBMODE_RINGCHECK", 2,
"SUBMODE_OR", 3);
});
Clazz_declarePackage ("JS");
Clazz_load (["java.util.Hashtable", "JU.BS", "JS.VTemp"], "JS.SmilesGenerator", ["JU.AU", "$.Lst", "$.SB", "JS.InvalidSmilesException", "$.SmilesAtom", "$.SmilesBond", "$.SmilesParser", "$.SmilesSearch", "$.SmilesStereo", "JU.BSUtil", "$.Elements", "$.JmolMolecule", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.atoms = null;
this.ac = 0;
this.bsSelected = null;
this.bsAromatic = null;
this.flags = 0;
this.explicitH = false;
this.ringSets = null;
this.vTemp = null;
this.nPairs = 0;
this.nPairsMax = 0;
this.bsBondsUp = null;
this.bsBondsDn = null;
this.bsToDo = null;
this.prevAtom = null;
this.prevSp2Atoms = null;
this.alleneStereo = null;
this.htRingsSequence = null;
this.htRings = null;
this.bsRingKeys = null;
this.bsIncludingH = null;
this.topologyOnly = false;
this.getAromatic = true;
this.addAtomComment = false;
this.noBioComment = false;
this.aromaticDouble = false;
this.noStereo = false;
this.openSMILES = false;
this.polySmilesCenter = null;
this.smilesStereo = null;
this.isPolyhedral = false;
this.aromaticRings = null;
this.sm = null;
this.iHypervalent = 0;
this.ptAtom = 0;
this.ptSp2Atom0 = 0;
this.atemp = null;
this.chainCheck = 0;
Clazz_instantialize (this, arguments);
}, JS, "SmilesGenerator");
Clazz_prepareFields (c$, function () {
this.vTemp =  new JS.VTemp ();
this.bsBondsUp =  new JU.BS ();
this.bsBondsDn =  new JU.BS ();
this.htRingsSequence =  new java.util.Hashtable ();
this.htRings =  new java.util.Hashtable ();
this.bsRingKeys =  new JU.BS ();
});
Clazz_defineMethod (c$, "getSmiles", 
function (sm, atoms, ac, bsSelected, comment, flags) {
var ipt = bsSelected.nextSetBit (0);
if (ipt < 0) return "";
this.sm = sm;
this.flags = flags;
this.atoms = atoms;
this.ac = ac;
bsSelected = JU.BSUtil.copy (bsSelected);
this.bsSelected = bsSelected;
this.flags = flags = JS.SmilesSearch.addFlags (flags, comment == null ? "" : comment.toUpperCase ());
if ((flags & 1048576) == 1048576) return this.getBioSmiles (bsSelected, comment, flags);
this.openSMILES = ((flags & 5) == 5);
this.addAtomComment = ((flags & 131072) == 131072);
this.aromaticDouble = ((flags & 512) == 512);
this.explicitH = ((flags & 4096) == 4096);
this.topologyOnly = ((flags & 8192) == 8192);
this.getAromatic = !((flags & 16) == 16);
this.noStereo = ((flags & 32) == 32);
this.isPolyhedral = ((flags & 65536) == 65536);
return this.getSmilesComponent (atoms[ipt], bsSelected, true, false, false);
}, "JS.SmilesMatcher,~A,~N,JU.BS,~S,~N");
Clazz_defineMethod (c$, "getBioSmiles", 
 function (bsSelected, comment, flags) {
this.addAtomComment = ((flags & 131072) == 131072);
var allowUnmatchedRings = ((flags & 3145728) == 3145728);
var noBioComments = ((flags & 34603008) == 34603008);
var crosslinkCovalent = ((flags & 5242880) == 5242880);
var crosslinkHBonds = ((flags & 9437184) == 9437184);
var addCrosslinks = (crosslinkCovalent || crosslinkHBonds);
var sb =  new JU.SB ();
var bs = bsSelected;
if (comment != null && !this.noBioComment) sb.append ("//* Jmol bioSMILES ").append (comment.$replace ('*', '_')).append (" *//");
var end = (this.noBioComment ? "" : "\n");
var bsIgnore =  new JU.BS ();
var lastComponent = null;
var groupString = "";
var s;
var vLinks =  new JU.Lst ();
try {
var len = 0;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var a = this.atoms[i];
var ch = a.getGroup1 ('?');
var bioStructureName = a.getBioStructureTypeName ();
var unknown = (ch === ch.toLowerCase ());
if (end != null) {
if (sb.length () > 0) sb.append (end);
end = null;
len = 0;
if (bioStructureName.length > 0) {
var id = a.getChainID ();
if (id != 0 && !noBioComments) {
s = "//* chain " + a.getChainIDStr () + " " + bioStructureName + " " + a.getResno () + " *// ";
len = s.length;
sb.append (s);
}len++;
sb.append ("~").appendC (bioStructureName.toLowerCase ().charAt (0)).append ("~");
} else {
s = this.getSmilesComponent (a, bs, false, true, true);
if (s.equals (lastComponent)) {
end = "";
continue;
}lastComponent = s;
var groupName = a.getGroup3 (true);
var key;
if (noBioComments) {
key = "/" + s + "/";
} else {
if (groupName != null) {
s = "//* " + groupName + " *//" + s;
}key = s + "//";
}if (groupString.indexOf (key) >= 0) {
end = "";
continue;
}groupString += key;
sb.append (s);
end = (noBioComments ? "." : ".\n");
continue;
}}if (len >= 75 && !noBioComments) {
sb.append ("\n  ");
len = 2;
}if (this.addAtomComment) sb.append ("\n//* [" + a.getGroup3 (false) + "#" + a.getResno () + "] *//\t");
if (unknown) {
this.addBracketedBioName (sb, a, bioStructureName.length > 0 ? ".0" : null, false);
} else {
sb.append (ch);
}len++;
if (addCrosslinks) {
a.getCrossLinkVector (vLinks, crosslinkCovalent, crosslinkHBonds);
for (var j = 0; j < vLinks.size (); j += 3) {
sb.append (":");
s = this.getRingCache (vLinks.get (j).intValue (), vLinks.get (j + 1).intValue (), this.htRingsSequence);
sb.append (s);
len += 1 + s.length;
}
vLinks.clear ();
}a.getGroupBits (bsIgnore);
bs.andNot (bsIgnore);
var i2 = a.getOffsetResidueAtom ("\0", 1);
if (i2 < 0 || !bs.get (i2)) {
if (!noBioComments) sb.append (" //* ").appendI (a.getResno ()).append (" *//");
if (i2 < 0 && (i2 = bs.nextSetBit (i + 1)) < 0) break;
if (len > 0) end = (noBioComments ? "." : ".\n");
}i = i2 - 1;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JS.InvalidSmilesException ("//* error: " + e.getMessage () + " *//");
} else {
throw e;
}
}
if (!allowUnmatchedRings && !this.htRingsSequence.isEmpty ()) {
this.dumpRingKeys (sb, this.htRingsSequence);
throw  new JS.InvalidSmilesException ("//* ?ring error? *//");
}s = sb.toString ();
if (s.endsWith (".\n")) s = s.substring (0, s.length - 2);
 else if (noBioComments && s.endsWith (".")) s = s.substring (0, s.length - 1);
return s;
}, "JU.BS,~S,~N");
Clazz_defineMethod (c$, "addBracketedBioName", 
 function (sb, atom, atomName, addComment) {
sb.append ("[");
if (atomName != null) {
var chain = atom.getChainIDStr ();
sb.append (atom.getGroup3 (false));
if (!atomName.equals (".0")) sb.append (atomName).append ("#").appendI (atom.getElementNumber ());
if (addComment) {
sb.append ("//* ").appendI (atom.getResno ());
if (chain.length > 0) sb.append (":").append (chain);
sb.append (" *//");
}} else {
sb.append (JU.Elements.elementNameFromNumber (atom.getElementNumber ()));
}sb.append ("]");
}, "JU.SB,JU.Node,~S,~B");
Clazz_defineMethod (c$, "getSmilesComponent", 
 function (atom, bs, allowBioResidues, allowConnectionsToOutsideWorld, forceBrackets) {
if (!this.explicitH && atom.getAtomicAndIsotopeNumber () == 1 && atom.getEdges ().length > 0) atom = this.atoms[atom.getBondedAtomIndex (0)];
this.bsSelected = JU.JmolMolecule.getBranchBitSet (this.atoms, atom.getIndex (), JU.BSUtil.copy (bs), null, -1, true, allowBioResidues);
bs.andNot (this.bsSelected);
this.iHypervalent = -1;
for (var i = this.bsSelected.nextSetBit (0); i >= 0 && this.iHypervalent < 0; i = this.bsSelected.nextSetBit (i + 1)) if (this.atoms[i].getCovalentBondCount () > 4 || this.isPolyhedral) this.iHypervalent = i;

this.bsIncludingH = JU.BSUtil.copy (this.bsSelected);
if (!this.explicitH) for (var j = this.bsSelected.nextSetBit (0); j >= 0; j = this.bsSelected.nextSetBit (j + 1)) {
var a = this.atoms[j];
if (a.getAtomicAndIsotopeNumber () == 1 && a.getBondCount () > 0 && a.getBondedAtomIndex (0) != this.iHypervalent) this.bsSelected.clear (j);
}
this.bsAromatic =  new JU.BS ();
if (!this.topologyOnly && this.bsSelected.cardinality () > 2) {
this.generateRingData ();
this.setBondDirections ();
}this.bsToDo = JU.BSUtil.copy (this.bsSelected);
var sb =  new JU.SB ();
for (var i = this.bsToDo.nextSetBit (0); i >= 0; i = this.bsToDo.nextSetBit (i + 1)) if (this.atoms[i].getCovalentBondCount () > 4 || this.isPolyhedral) {
if (atom == null) sb.append (".");
this.getSmilesAt (sb, this.atoms[i], allowConnectionsToOutsideWorld, false, forceBrackets);
atom = null;
}
if (atom != null) while ((atom = this.getSmilesAt (sb, atom, allowConnectionsToOutsideWorld, true, forceBrackets)) != null) {
}
while (this.bsToDo.cardinality () > 0 || !this.htRings.isEmpty ()) {
var e = this.htRings.values ().iterator ();
if (e.hasNext ()) {
atom = this.atoms[(e.next ()[1]).intValue ()];
if (!this.bsToDo.get (atom.getIndex ())) break;
} else {
atom = this.atoms[this.bsToDo.nextSetBit (0)];
}sb.append (".");
this.prevSp2Atoms = this.alleneStereo = null;
this.prevAtom = null;
while ((atom = this.getSmilesAt (sb, atom, allowConnectionsToOutsideWorld, true, forceBrackets)) != null) {
}
}
if (!this.htRings.isEmpty ()) {
this.dumpRingKeys (sb, this.htRings);
throw  new JS.InvalidSmilesException ("//* ?ring error? *//\n" + sb);
}var s = sb.toString ();
if (s.indexOf ("^-") >= 0) {
var s0 = s;
try {
var keys = this.sm.getAtropisomerKeys (s, this.atoms, this.ac, this.bsSelected, this.bsAromatic, this.flags);
for (var i = 1; i < keys.length; ) {
var pt = s.indexOf ("^-");
if (pt < 0) break;
s = s.substring (0, pt + 1) + keys.substring (i, i + 2) + s.substring (pt + 1);
i += 3;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
System.out.println ("???");
s = s0;
} else {
throw e;
}
}
}return s;
}, "JU.Node,JU.BS,~B,~B,~B");
Clazz_defineMethod (c$, "generateRingData", 
 function () {
var search = JS.SmilesParser.newSearch ("[r500]", true, true);
search.targetAtoms = this.atoms;
search.setSelected (this.bsSelected);
search.setFlags (this.flags);
search.targetAtomCount = this.ac;
search.ringDataMax = 7;
search.flags = this.flags;
var vRings = JU.AU.createArrayOfArrayList (4);
search.setRingData (null, vRings, true);
this.bsAromatic = search.bsAromatic;
this.ringSets = search.ringSets;
this.aromaticRings = vRings[3];
});
Clazz_defineMethod (c$, "getBondStereochemistry", 
 function (bond, atomFrom) {
if (bond == null) return '\0';
var i = bond.index;
var isFirst = (atomFrom == null || bond.getAtomIndex1 () == atomFrom.getIndex ());
return (this.bsBondsUp.get (i) ? (isFirst ? '/' : '\\') : this.bsBondsDn.get (i) ? (isFirst ? '\\' : '/') : '\0');
}, "JU.Edge,JU.SimpleNode");
Clazz_defineMethod (c$, "setBondDirections", 
 function () {
var bsDone =  new JU.BS ();
var edges =  Clazz_newArray (2, 3, null);
for (var i = this.bsSelected.nextSetBit (0); i >= 0; i = this.bsSelected.nextSetBit (i + 1)) {
var atom1 = this.atoms[i];
var bonds = atom1.getEdges ();
for (var k = 0; k < bonds.length; k++) {
var bond = bonds[k];
var index = bond.index;
var atom2;
if (bsDone.get (index) || bond.getCovalentOrder () != 2 || JS.SmilesSearch.isRingBond (this.ringSets, null, i, (atom2 = bond.getOtherNode (atom1)).getIndex ())) continue;
bsDone.set (index);
var nCumulene = 0;
var a10 = atom1;
while (atom2.getCovalentBondCount () == 2 && atom2.getValence () == 4) {
var e2 = atom2.getEdges ();
var e = e2[e2[0].getOtherNode (atom2) === a10 ? 1 : 0];
bsDone.set (e.index);
a10 = atom2;
atom2 = e.getOtherNode (atom2);
nCumulene++;
}
if (nCumulene % 2 == 1) continue;
var b0 = null;
var a0 = null;
var i0 = 0;
var atom12 =  Clazz_newArray (-1, [atom1, atom2]);
var edgeCount = 1;
for (var j = 0; j < 2 && edgeCount > 0 && edgeCount < 3; j++) {
edgeCount = 0;
var atomA = atom12[j];
var bb = (atomA).getEdges ();
for (var b = 0; b < bb.length; b++) {
var other;
if (bb[b].getCovalentOrder () != 1 || !this.explicitH && (other = bb[b].getOtherNode (atomA)).getElementNumber () == 1 && other.getIsotopeNumber () == 0) continue;
edges[j][edgeCount++] = bb[b];
if (this.getBondStereochemistry (bb[b], atomA) != '\0') {
b0 = bb[b];
i0 = j;
}}
}
if (edgeCount == 3 || edgeCount == 0) continue;
if (b0 == null) {
i0 = 0;
b0 = edges[i0][0];
this.bsBondsUp.set (b0.index);
}var c0 = this.getBondStereochemistry (b0, atom12[i0]);
a0 = b0.getOtherNode (atom12[i0]);
if (a0 == null) continue;
for (var j = 0; j < 2; j++) for (var jj = 0; jj < 2; jj++) {
var b1 = edges[j][jj];
if (b1 == null || b1 === b0) continue;
var bi = b1.index;
var a1 = b1.getOtherNode (atom12[j]);
if (a1 == null) continue;
var c1 = this.getBondStereochemistry (b1, atom12[j]);
var isOpposite = JS.SmilesStereo.isDiaxial (atom12[i0], atom12[j], a0, a1, this.vTemp, 0);
if (c1 == '\0' || (c1 != c0) == isOpposite) {
var isUp = (c0 == '\\' && isOpposite || c0 == '/' && !isOpposite);
if (isUp == (b1.getAtomIndex1 () != a1.getIndex ())) this.bsBondsUp.set (bi);
 else this.bsBondsDn.set (bi);
} else {
JU.Logger.error ("BOND STEREOCHEMISTRY ERROR");
}if (JU.Logger.debugging) JU.Logger.debug (this.getBondStereochemistry (b0, atom12[0]) + " " + a0.getIndex () + " " + a1.getIndex () + " " + this.getBondStereochemistry (b1, atom12[j]));
}

}
}
});
Clazz_defineMethod (c$, "getSmilesAt", 
 function (sb, atom, allowConnectionsToOutsideWorld, allowBranches, forceBrackets) {
var atomIndex = atom.getIndex ();
if (!this.bsToDo.get (atomIndex)) return null;
this.ptAtom++;
this.bsToDo.clear (atomIndex);
var includeHs = (atomIndex == this.iHypervalent || this.explicitH);
var isExtension = (!this.bsSelected.get (atomIndex));
var prevIndex = (this.prevAtom == null ? -1 : this.prevAtom.getIndex ());
var isAromatic = this.bsAromatic.get (atomIndex);
var sp2Atoms = this.prevSp2Atoms;
var havePreviousSp2Atoms = (sp2Atoms != null);
var atomicNumber = atom.getElementNumber ();
var nH = 0;
var prevStereo = this.alleneStereo;
this.alleneStereo = null;
var v =  new JU.Lst ();
var bondNext = null;
var bondPrev = null;
var bonds = atom.getEdges ();
if (this.polySmilesCenter != null) {
allowBranches = false;
this.sortBonds (atom, this.prevAtom, this.polySmilesCenter);
}var aH = null;
var stereoFlag = (isAromatic ? 10 : 0);
if (JU.Logger.debugging) JU.Logger.debug (sb.toString ());
if (bonds != null) for (var i = bonds.length; --i >= 0; ) {
var bond = bonds[i];
if (!bond.isCovalent ()) continue;
var atom1 = bonds[i].getOtherNode (atom);
var index1 = atom1.getIndex ();
if (index1 == prevIndex) {
bondPrev = bonds[i];
continue;
}var isH = !includeHs && (atom1.getElementNumber () == 1 && atom1.getIsotopeNumber () == 0);
if (!this.bsIncludingH.get (index1)) {
if (!isH && allowConnectionsToOutsideWorld && this.bsSelected.get (atomIndex)) this.bsToDo.set (index1);
 else continue;
}if (isH) {
aH = atom1;
nH++;
if (nH > 1) stereoFlag = 10;
} else {
v.addLast (bonds[i]);
}}
if (nH > 1) sp2Atoms = null;
var nSp2Atoms = (sp2Atoms != null ? 2 : 0);
if (sp2Atoms == null && !isAromatic && nH <= 1) sp2Atoms =  new Array (5);
var strPrev = null;
if (bondPrev != null) {
strPrev = this.getBondOrder (bondPrev, atomIndex, prevIndex, isAromatic);
if (sp2Atoms != null && !havePreviousSp2Atoms) {
sp2Atoms[nSp2Atoms++] = this.prevAtom;
}}if (sp2Atoms != null && !havePreviousSp2Atoms) {
this.ptSp2Atom0 = this.ptAtom;
}if (sp2Atoms != null && nH == 1) sp2Atoms[nSp2Atoms++] = aH;
var nMax = 0;
var bsBranches =  new JU.BS ();
var nBonds = v.size ();
if (allowBranches) {
for (var i = 0; i < nBonds; i++) {
var bond = v.get (i);
var a = bond.getOtherNode (atom);
var n = a.getCovalentBondCount () - (includeHs ? 0 : (a).getCovalentHydrogenCount ());
var order = bond.getCovalentOrder ();
if (n == 1 && (bondNext != null || i < nBonds - 1)) {
bsBranches.set (bond.index);
} else if ((order > 1 || n > nMax) && !this.htRings.containsKey (JS.SmilesGenerator.getRingKey (a.getIndex (), atomIndex))) {
nMax = (order > 1 ? 1000 + order : n);
bondNext = bond;
}}
}var atomNext = (bondNext == null ? null : bondNext.getOtherNode (atom));
var orderNext = (bondNext == null ? 0 : bondNext.getCovalentOrder ());
var stereo =  new Array (7);
if (stereoFlag < 7 && bondPrev != null) {
if (havePreviousSp2Atoms && bondPrev.getCovalentOrder () == 2 && orderNext == 2 && sp2Atoms[1] != null) {
stereo[stereoFlag++] = sp2Atoms[0];
stereo[stereoFlag++] = sp2Atoms[1];
} else {
stereo[stereoFlag++] = this.prevAtom;
}}if (stereoFlag < 7 && nH == 1) stereo[stereoFlag++] = aH;
var deferStereo = (orderNext == 1 && sp2Atoms == null);
var chBond = this.getBondStereochemistry (bondPrev, this.prevAtom);
if (strPrev != null || chBond != '\0') {
if (chBond != '\0') strPrev = "" + chBond;
sb.append (strPrev);
}var stereoFlag0 = stereoFlag;
var nSp2Atoms0 = nSp2Atoms;
var sbBranches =  new JU.SB ();
var vBranches =  new JU.Lst ();
for (var i = 0; i < v.size (); i++) {
var bond = v.get (i);
if (!bsBranches.get (bond.index)) continue;
var a = bond.getOtherNode (atom);
var s2 =  new JU.SB ();
this.prevAtom = atom;
this.prevSp2Atoms = this.alleneStereo = null;
var bond0t = bondNext;
var ptSp2Atom0t = this.ptSp2Atom0;
var ptAtomt = this.ptAtom;
this.getSmilesAt (s2, a, allowConnectionsToOutsideWorld, allowBranches, forceBrackets);
bondNext = bond0t;
this.ptAtom = ptAtomt;
this.ptSp2Atom0 = ptSp2Atom0t;
var branch = s2.toString ();
v.removeItemAt (i--);
if (bondNext == null) vBranches.addLast (branch);
 else sbBranches.append ("(").append (branch).append (")");
if (stereoFlag < 7) stereo[stereoFlag++] = a;
if (sp2Atoms != null && nSp2Atoms < 5) sp2Atoms[nSp2Atoms++] = a;
}
var sbRings =  new JU.SB ();
var stereoFlag1 = stereoFlag;
var nSp2Atoms1 = nSp2Atoms;
var atat = null;
if (!allowBranches && !this.noStereo && this.polySmilesCenter == null && (v.size () == 5 || v.size () == 6)) {
atat = this.sortInorganic (atom, v, this.vTemp);
}for (var i = 0; i < v.size (); i++) {
var bond = v.get (i);
if (bond === bondNext) continue;
var a = bond.getOtherNode (atom);
strPrev = this.getBondOrder (bond, atomIndex, a.getIndex (), isAromatic);
if (!deferStereo) {
chBond = this.getBondStereochemistry (bond, atom);
if (chBond != '\0') strPrev = "" + chBond;
}sbRings.append (strPrev);
sbRings.append (this.getRingCache (atomIndex, a.getIndex (), this.htRings));
if (stereoFlag < 7) stereo[stereoFlag++] = a;
if (sp2Atoms != null && nSp2Atoms < 5) sp2Atoms[nSp2Atoms++] = a;
}
if (stereoFlag0 != stereoFlag1 && stereoFlag1 != stereoFlag) this.swapArray (stereo, stereoFlag0, stereoFlag1, stereoFlag);
if (nSp2Atoms0 != nSp2Atoms1 && nSp2Atoms1 != nSp2Atoms) this.swapArray (sp2Atoms, nSp2Atoms0, nSp2Atoms1, nSp2Atoms);
if (havePreviousSp2Atoms && stereoFlag == 2 && orderNext == 2) {
var nc = (this.ptAtom - this.ptSp2Atom0);
var nb = atomNext.getCovalentBondCount ();
var lastIsN = (atomNext.getElementNumber () == 7);
if (nc % 2 == 0) {
stereoFlag = 8;
} else {
if (nb == 3 || nb == 2 && lastIsN) {
bonds = atomNext.getEdges ();
for (var k = 0; k < bonds.length; k++) {
var index = atomNext.getBondedAtomIndex (k);
if (bonds[k].isCovalent () && index != atomIndex) stereo[stereoFlag++] = this.atoms[index];
}
if (nb == 2) stereo[stereoFlag++] = atomNext;
if (stereoFlag == 4) {
this.alleneStereo = stereo;
if ((stereo[3]).getAtomicAndIsotopeNumber () == 1) {
var n = stereo[3];
stereo[3] = stereo[2];
stereo[2] = n;
}}}}nSp2Atoms = 0;
} else if (atomNext != null && stereoFlag < 7) {
stereo[stereoFlag++] = atomNext;
}if (prevStereo != null) {
if (prevStereo[3] !== stereo[2]) {
var ptat = sb.lastIndexOf ("@]=");
if (ptat > 0) {
var trail = sb.substring (ptat);
sb.setLength (sb.charAt (ptat - 1) == '@' ? ptat - 1 : ptat + 1);
sb.append (trail);
}}prevStereo = null;
}var charge = atom.getFormalCharge ();
var isotope = atom.getIsotopeNumber ();
var valence = atom.getValence ();
var osclass = (this.openSMILES ? (atom).getFloatProperty ("property_atomclass") : NaN);
var atomName = atom.getAtomName ();
var groupType = (atom).getBioStructureTypeName ();
if (this.addAtomComment) sb.append ("\n//* " + atom.toString () + " *//\t");
if (this.topologyOnly) sb.append ("*");
 else if (isExtension && groupType.length != 0 && atomName.length != 0) this.addBracketedBioName (sb, atom, "." + atomName, false);
 else sb.append (JS.SmilesAtom.getAtomLabel (atomicNumber, isotope, (forceBrackets ? -1 : valence), charge, osclass, nH, isAromatic, atat != null ? atat : this.noStereo ? null : this.checkStereoPairs (atom, this.alleneStereo == null ? atomIndex : -1, stereo, stereoFlag)));
sb.appendSB (sbRings);
if (bondNext != null) {
sb.appendSB (sbBranches);
} else {
var n = vBranches.size () - 1;
if (n >= 0) {
for (var i = 0; i < n; i++) sb.append ("(").append (vBranches.get (i)).append (")");

sb.append (vBranches.get (n));
}return null;
}if (sp2Atoms != null && orderNext == 2 && (nSp2Atoms == 1 || nSp2Atoms == 2)) {
if (sp2Atoms[0] == null) sp2Atoms[0] = atom;
if (sp2Atoms[1] == null) sp2Atoms[1] = atom;
} else {
sp2Atoms = null;
nSp2Atoms = 0;
}this.prevSp2Atoms = sp2Atoms;
this.prevAtom = atom;
return atomNext;
}, "JU.SB,JU.SimpleNode,~B,~B,~B");
Clazz_defineMethod (c$, "swapArray", 
 function (a, i0, i1, i2) {
var n = i1 - i0;
if (this.atemp == null || this.atemp.length < n) this.atemp =  new Array (n);
for (var p = n, i = i1; p > 0; ) this.atemp[--p] = a[--i];

for (var i = i1; i < i2; i++) a[i - n] = a[i];

for (var p = n, i = i2; p > 0; ) a[--i] = this.atemp[--p];

}, "~A,~N,~N,~N");
Clazz_defineMethod (c$, "getBondOrder", 
 function (bondPrev, atomIndex, prevIndex, isAromatic) {
if (this.topologyOnly) return "";
if ((bondPrev.order & 65537) == 65537) {
return "^-";
}var border = bondPrev.getCovalentOrder ();
return (!isAromatic || !this.bsAromatic.get (prevIndex) ? JS.SmilesBond.getBondOrderString (border) : border == 1 && !this.isSameAromaticRing (atomIndex, prevIndex) ? "-" : this.aromaticDouble && (border == 2 || border == 514) ? "=" : "");
}, "JU.Edge,~N,~N,~B");
Clazz_defineMethod (c$, "isSameAromaticRing", 
 function (a1, a2) {
var bs;
for (var i = this.aromaticRings.size (); --i >= 0; ) if ((bs = this.aromaticRings.get (i)).get (a1) && bs.get (a2)) return true;

return false;
}, "~N,~N");
Clazz_defineMethod (c$, "sortBonds", 
function (atom, refAtom, center) {
if (this.smilesStereo == null) try {
this.smilesStereo = JS.SmilesStereo.newStereo (null);
} catch (e) {
if (Clazz_exceptionOf (e, JS.InvalidSmilesException)) {
} else {
throw e;
}
}
this.smilesStereo.sortBondsByStereo (atom, refAtom, center, atom.getEdges (), this.vTemp.vA);
}, "JU.SimpleNode,JU.SimpleNode,JU.P3");
Clazz_defineMethod (c$, "sortInorganic", 
 function (atom, v, vTemp) {
var atomIndex = atom.getIndex ();
var n = v.size ();
var axialPairs =  new JU.Lst ();
var bonds =  new JU.Lst ();
var a1;
var a2;
var a01 = null;
var a02 = null;
var bond1;
var bond2;
var bsDone =  new JU.BS ();
var pair0 = null;
var stereo =  new Array (6);
var isOK = true;
var s = "";
var naxial = 0;
for (var i = 0; i < n; i++) {
bond1 = v.get (i);
stereo[0] = a1 = bond1.getOtherNode (atom);
if (i == 0) s = this.addStereoCheck (0, atomIndex, a1, "", null);
 else if (isOK && this.addStereoCheck (0, atomIndex, a1, s, null) != null) isOK = false;
if (bsDone.get (i)) continue;
bsDone.set (i);
var isAxial = false;
for (var j = i + 1; j < n; j++) {
if (bsDone.get (j)) continue;
bond2 = v.get (j);
a2 = bond2.getOtherNode (atom);
if (JS.SmilesStereo.isDiaxial (atom, atom, a1, a2, vTemp, -0.95)) {
switch (++naxial) {
case 1:
a01 = a1;
break;
case 2:
a02 = a1;
break;
case 3:
if (JS.SmilesStereo.getHandedness (a02, a01, a1, atom, vTemp) == 2) {
var b = bond1;
bond1 = bond2;
bond2 = b;
}break;
}
axialPairs.addLast ( Clazz_newArray (-1, [bond1, bond2]));
isAxial = true;
bsDone.set (j);
break;
}}
if (!isAxial) bonds.addLast (bond1);
}
var npAxial = axialPairs.size ();
if (isOK || n == 6 && npAxial != 3 || n == 5 && npAxial == 0) return "";
pair0 = axialPairs.get (0);
bond1 = pair0[0];
stereo[0] = bond1.getOtherNode (atom);
v.clear ();
v.addLast (bond1);
if (npAxial > 1) bonds.addLast (axialPairs.get (1)[0]);
if (npAxial == 3) bonds.addLast (axialPairs.get (2)[0]);
if (npAxial > 1) bonds.addLast (axialPairs.get (1)[1]);
if (npAxial == 3) bonds.addLast (axialPairs.get (2)[1]);
for (var i = 0; i < bonds.size (); i++) {
bond1 = bonds.get (i);
v.addLast (bond1);
stereo[i + 1] = bond1.getOtherNode (atom);
}
v.addLast (pair0[1]);
stereo[n - 1] = pair0[1].getOtherNode (atom);
return JS.SmilesStereo.getStereoFlag (atom, stereo, n, vTemp);
}, "JU.SimpleNode,JU.Lst,JS.VTemp");
Clazz_defineMethod (c$, "checkStereoPairs", 
 function (atom, atomIndex, stereo, stereoFlag) {
if (stereoFlag < 4) return "";
if (atomIndex >= 0 && stereoFlag == 4 && (atom.getElementNumber ()) == 6) {
var s = "";
for (var i = 0; i < 4; i++) {
if ((s = this.addStereoCheck (0, atomIndex, stereo[i], s, JU.BSUtil.newAndSetBit (atomIndex))) == null) {
stereoFlag = 10;
break;
}}
}return (stereoFlag > 6 ? "" : JS.SmilesStereo.getStereoFlag (atom, stereo, stereoFlag, this.vTemp));
}, "JU.SimpleNode,~N,~A,~N");
Clazz_defineMethod (c$, "addStereoCheck", 
 function (level, atomIndex, atom, s, bsDone) {
if (bsDone != null) bsDone.set (atomIndex);
var n = (atom).getAtomicAndIsotopeNumber ();
var nx = atom.getCovalentBondCount ();
var nh = (n == 6 && !this.explicitH ? (atom).getCovalentHydrogenCount () : 0);
if (n == 6 ? nx != 4 : n == 1 || nx > 1) return s + (++this.chainCheck);
var sa = ";" + level + "/" + n + "/" + nh + "/" + nx + (level == 0 ? "," : "_");
if (n == 6) {
switch (nh) {
case 1:
return s + sa + (++this.chainCheck);
case 0:
case 2:
if (bsDone == null) return s;
var edges = (atom).getEdges ();
var s2 = "";
var sa2 = "";
var nunique = (nh == 2 ? 0 : 3);
for (var j = atom.getBondCount (); --j >= 0; ) {
var a2 = edges[j].getOtherNode (atom);
var i2 = a2.getIndex ();
if (bsDone.get (i2) || !edges[j].isCovalent () || a2.getElementNumber () == 1) continue;
bsDone.set (i2);
sa2 = this.addStereoCheck (level + 1, atom.getIndex (), a2, "", bsDone.clone ());
if (s2.indexOf (sa2) >= 0) nunique--;
s2 += sa2;
}
if (nunique == 3) return s + sa + (++this.chainCheck);
sa = (sa + s2).$replace (',', '_');
if (level > 0) return s + sa;
break;
case 3:
break;
}
}if (s.indexOf (sa) >= 0) {
if (nh == 3) {
var ndt = 0;
for (var j = 0; j < nx && ndt < 3; j++) {
var ia = (atom).getBondedAtomIndex (j);
if (ia == atomIndex) continue;
ndt += this.atoms[ia].getAtomicAndIsotopeNumber ();
}
if (ndt > 3) return s;
}return null;
}return s + sa;
}, "~N,~N,JU.SimpleNode,~S,JU.BS");
Clazz_defineMethod (c$, "getRingCache", 
 function (i0, i1, ht) {
var key = JS.SmilesGenerator.getRingKey (i0, i1);
var o = ht.get (key);
var s = (o == null ? null : o[0]);
if (s == null) {
this.bsRingKeys.set (++this.nPairs);
this.nPairsMax = Math.max (this.nPairs, this.nPairsMax);
ht.put (key,  Clazz_newArray (-1, [s = this.getRingPointer (this.nPairs), Integer.$valueOf (i1), Integer.$valueOf (this.nPairs)]));
if (JU.Logger.debugging) JU.Logger.debug ("adding for " + i0 + " ring key " + this.nPairs + ": " + key);
} else {
ht.remove (key);
var nPair = (o[2]).intValue ();
this.bsRingKeys.clear (nPair);
if (this.bsRingKeys.nextSetBit (0) < 0 && (this.nPairsMax == 2 || this.nPairsMax == 99)) {
this.nPairsMax = this.nPairs = (this.nPairsMax == 99 ? 10 : 0);
}if (JU.Logger.debugging) JU.Logger.debug ("using ring key " + key);
}return s;
}, "~N,~N,java.util.Map");
Clazz_defineMethod (c$, "getRingPointer", 
 function (i) {
return (i < 10 ? "" + i : i < 100 ? "%" + i : "%(" + i + ")");
}, "~N");
Clazz_defineMethod (c$, "dumpRingKeys", 
 function (sb, ht) {
JU.Logger.info (sb.toString () + "\n\n");
for (var key, $key = ht.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) JU.Logger.info ("unmatched connection: " + key);

}, "JU.SB,java.util.Map");
c$.getRingKey = Clazz_defineMethod (c$, "getRingKey", 
function (i0, i1) {
return Math.min (i0, i1) + "_" + Math.max (i0, i1);
}, "~N,~N");
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.SmilesAromatic", ["java.util.Hashtable", "JU.BS", "$.Lst", "$.Measure", "$.V3", "JS.SmilesRing", "$.SmilesRingSet", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz_declareType (JS, "SmilesAromatic");
c$.setAromatic = Clazz_defineMethod (c$, "setAromatic", 
function (n, jmolAtoms, bsSelected, vR, bsAromatic, strictness, isOpenSMILES, justCheckBonding, checkExplicit, v, vOK, lstSP2, eCounts, doTestAromatic) {
var doCheck = (isOpenSMILES || strictness > 0);
if (!doTestAromatic) {
for (var r = vR.size (); --r >= 0; ) {
var bs = JU.BSUtil.copy (vR.get (r));
bs.and (bsAromatic);
if (bs.cardinality () == n) vOK.addLast (bs);
}
return;
}for (var r = vR.size (); --r >= 0; ) {
var bs = vR.get (r);
var isOK = JS.SmilesAromatic.isSp2Ring (n, jmolAtoms, bsSelected, bs, (justCheckBonding ? 3.4028235E38 : strictness > 0 ? 0.1 : 0.01), checkExplicit, strictness == 0);
if (!isOK) continue;
bsAromatic.or (bs);
if (doCheck) {
var edges =  new JU.Lst ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var a = jmolAtoms[i];
var aedges = a.getEdges ();
var ai = a.getIndex ();
for (var j = aedges.length; --j >= 0; ) {
var a2 = aedges[j].getOtherNode (a);
var a2i = a2.getIndex ();
if (a2i > ai && bs.get (a2i)) edges.addLast (aedges[j]);
}
}
switch (JS.SmilesAromatic.checkHueckelAromatic (n, jmolAtoms, bsAromatic, bs, strictness, eCounts)) {
case -1:
continue;
case 0:
isOK = false;
case 1:
if (lstSP2 != null) lstSP2.addLast ( new JS.SmilesRing (n, bs, edges, isOK));
if (!isOK) continue;
}
}vOK.addLast (bs);
}
}, "~N,~A,JU.BS,JU.Lst,JU.BS,~N,~B,~B,~B,JS.VTemp,JU.Lst,JU.Lst,~A,~B");
c$.checkAromaticDefined = Clazz_defineMethod (c$, "checkAromaticDefined", 
function (jmolAtoms, bsSelected, bsAromatic) {
for (var i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1)) {
var bonds = jmolAtoms[i].getEdges ();
for (var j = 0; j < bonds.length; j++) {
switch (bonds[j].order) {
case 515:
case 514:
case 513:
bsAromatic.set (bonds[j].getAtomIndex1 ());
bsAromatic.set (bonds[j].getAtomIndex2 ());
}
}
}
}, "~A,JU.BS,JU.BS");
c$.isSp2Ring = Clazz_defineMethod (c$, "isSp2Ring", 
 function (n, atoms, bsSelected, bs, cutoff, checkExplicit, allowSOxide) {
if (checkExplicit) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) if (atoms[i].getCovalentBondCount () > 3) return false;

} else {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) if (atoms[i].getCovalentBondCountPlusMissingH () > 3) return false;

}if (cutoff == 3.4028235E38) return true;
if (cutoff <= 0) cutoff = 0.01;
var vNorm = null;
var vTemp = null;
var vMean = null;
var nPoints = bs.cardinality ();
var vNorms =  new Array (nPoints * 2);
var nNorms = 0;
var maxDev = (1 - cutoff * 5);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var ringAtom = atoms[i];
var bonds = ringAtom.getEdges ();
var iSub = -1;
var r1 = -1;
var r2 = -1;
for (var k = bonds.length; --k >= 0; ) {
var iAtom = ringAtom.getBondedAtomIndex (k);
if (!bsSelected.get (iAtom)) continue;
if (!bs.get (iAtom)) {
if (ringAtom.getElementNumber () == 16) {
if (!allowSOxide) return false;
iAtom = -1;
}iSub = iAtom;
} else if (r1 < 0) {
r1 = iAtom;
} else {
r2 = iAtom;
}}
if (vMean == null) {
vMean =  new JU.V3 ();
vNorm =  new JU.V3 ();
vTemp =  new JU.V3 ();
}for (var k = 0, j = i; k < 2; k++) {
JU.Measure.getNormalThroughPoints (atoms[r1], atoms[j], atoms[r2], vNorm, vTemp);
if (!JS.SmilesAromatic.addNormal (vNorm, vMean, maxDev)) return false;
vNorms[nNorms++] = JU.V3.newV (vNorm);
if ((j = iSub) < 0) break;
}
}
return JS.SmilesAromatic.checkStandardDeviation (vNorms, vMean, nNorms, cutoff);
}, "~N,~A,JU.BS,JU.BS,~N,~B,~B");
c$.addNormal = Clazz_defineMethod (c$, "addNormal", 
 function (vTemp, vMean, maxDev) {
var similarity = vMean.dot (vTemp);
if (similarity != 0 && Math.abs (similarity) < maxDev) return false;
if (similarity < 0) vTemp.scale (-1);
vMean.add (vTemp);
vMean.normalize ();
return true;
}, "JU.V3,JU.V3,~N");
c$.checkStandardDeviation = Clazz_defineMethod (c$, "checkStandardDeviation", 
 function (vNorms, vMean, n, cutoff) {
var sum = 0;
var sum2 = 0;
for (var i = 0; i < n; i++) {
var v = vNorms[i].dot (vMean);
sum += v;
sum2 += (v) * v;
}
sum = Math.sqrt ((sum2 - sum * sum / n) / (n - 1));
return (sum < cutoff);
}, "~A,JU.V3,~N,~N");
c$.checkHueckelAromatic = Clazz_defineMethod (c$, "checkHueckelAromatic", 
 function (nAtoms, jmolAtoms, bsAromatic, bsRing, strictness, eCounts) {
var npi = 0;
var n1 = 0;
for (var i = bsRing.nextSetBit (0); i >= 0 && npi >= 0; i = bsRing.nextSetBit (i + 1)) {
var atom = jmolAtoms[i];
var z = atom.getElementNumber ();
var n = atom.getCovalentBondCountPlusMissingH ();
n += atom.getValence ();
n -= 4;
if (z == 6) {
var fc = atom.getFormalCharge ();
if (fc != -2147483648) n += fc;
}var pt = (z >= 5 && z <= 8 ? z - 5 : z == 15 ? 2 : z == 34 ? 3 : z == 33 ? 4 : z == 16 ? 5 : -1);
if (pt >= 0) {
var a = JS.SmilesAromatic.OS_PI_COUNTS[pt];
if (n < 0 || n >= a.length) return -1;
switch (n = a[n]) {
case -2:
return -1;
case -1:
var bonds = atom.getEdges ();
n = 0;
for (var j = bonds.length; --j >= 0; ) {
var b = bonds[j];
if (b.getCovalentOrder () != 2) continue;
var het = b.getOtherNode (atom);
n = (het.getElementNumber () == 6 || bsAromatic.get (het.getIndex ()) ? 1 : strictness > 0 ? -100 : 0);
break;
}
default:
if (n < 0) return -1;
if (eCounts != null) eCounts[i] = n;
npi += n;
if (n == 1) n1++;
if (JU.Logger.debuggingHigh) JU.Logger.info ("atom " + atom + " pi=" + n + " npi=" + npi);
continue;
}
}}
return ((npi - 2) % 4 == 0 && (strictness < 2 || nAtoms == 5 || n1 == 6) ? 1 : 0);
}, "~N,~A,JU.BS,JU.BS,~N,~A");
c$.finalizeAromatic = Clazz_defineMethod (c$, "finalizeAromatic", 
function (jmolAtoms, bsAromatic, lstAromatic, lstSP2, eCounts, isOpenNotStrict, isStrict) {
if (isStrict) JS.SmilesAromatic.removeBridgingRings (lstAromatic, lstSP2);
JS.SmilesAromatic.checkFusedRings (lstSP2, eCounts, lstAromatic);
bsAromatic.clearAll ();
for (var i = lstAromatic.size (); --i >= 0; ) bsAromatic.or (lstAromatic.get (i));

if (isStrict || isOpenNotStrict) {
for (var i = bsAromatic.nextSetBit (0); i >= 0; i = bsAromatic.nextSetBit (i + 1)) {
var bonds = jmolAtoms[i].getEdges ();
var naro = 0;
for (var j = bonds.length; --j >= 0; ) {
var otherAtom = bonds[j].getOtherNode (jmolAtoms[i]);
var order = bonds[j].getCovalentOrder ();
var ai2 = otherAtom.getIndex ();
var isJAro = bsAromatic.get (ai2);
if (isJAro) {
if (order == 2) {
var isOK = false;
for (var k = lstSP2.size (); --k >= 0; ) {
var r = lstSP2.get (k);
if (r.get (i) && r.get (ai2)) {
isOK = true;
break;
}}
if (!isOK) {
naro = -1;
break;
}}naro++;
} else if (isStrict && otherAtom.getElementNumber () == 6 && order == 2) {
naro = -1;
break;
}}
if (naro < 2) {
bsAromatic.clear (i);
i = -1;
}}
}}, "~A,JU.BS,JU.Lst,JU.Lst,~A,~B,~B");
c$.removeBridgingRings = Clazz_defineMethod (c$, "removeBridgingRings", 
 function (lstAromatic, lstSP2) {
var bs =  new JU.BS ();
var bsBad =  new JU.BS ();
var bsBad2 =  new JU.BS ();
JS.SmilesAromatic.checkBridges (lstAromatic, bsBad, lstAromatic, bsBad, bs);
JS.SmilesAromatic.checkBridges (lstSP2, bsBad2, lstSP2, bsBad2, bs);
JS.SmilesAromatic.checkBridges (lstAromatic, bsBad, lstSP2, bsBad2, bs);
for (var i = lstAromatic.size (); --i >= 0; ) if (bsBad.get (i)) lstAromatic.removeItemAt (i);

for (var i = lstSP2.size (); --i >= 0; ) if (bsBad2.get (i)) lstSP2.removeItemAt (i);

}, "JU.Lst,JU.Lst");
c$.checkBridges = Clazz_defineMethod (c$, "checkBridges", 
 function (lst, bsBad, lst2, bsBad2, bs) {
var isSameList = (lst === lst2);
for (var i = lst.size (); --i >= 0; ) {
var bs1 = lst.get (i);
for (var j0 = (isSameList ? i + 1 : 0), j = lst2.size (); --j >= j0; ) {
var bs2 = lst2.get (j);
if (bs2.equals (bs1)) continue;
bs.clearAll ();
bs.or (bs1);
bs.and (bs2);
var n = bs.cardinality ();
if (n > 2) {
bsBad.set (i);
bsBad2.set (j);
}}
}
}, "JU.Lst,JU.BS,JU.Lst,JU.BS,JU.BS");
c$.checkFusedRings = Clazz_defineMethod (c$, "checkFusedRings", 
 function (rings, eCounts, lstAromatic) {
var htEdgeMap =  new java.util.Hashtable ();
for (var i = rings.size (); --i >= 0; ) {
var r = rings.get (i);
var edges = r.edges;
for (var j = edges.size (); --j >= 0; ) {
var set = JS.SmilesRing.getSetByEdge (edges.get (j), htEdgeMap);
if (set == null || set === r.$set) continue;
if (r.$set != null) set.addSet (r.$set, htEdgeMap);
 else set.addRing (r);
}
(r.$set == null ? r.$set =  new JS.SmilesRingSet () : r.$set).addRing (r);
r.addEdges (htEdgeMap);
}
var set;
var r;
for (var i = rings.size (); --i >= 0; ) {
if ((r = rings.get (i)).isOK || (set = r.$set) == null || set.isEmpty ()) continue;
if ((set.getElectronCount (eCounts) % 4) == 2) for (var j = set.size (); --j >= 0; ) if (!(r = set.get (j)).isOK) lstAromatic.addLast (r);

set.clear ();
}
}, "JU.Lst,~A,JU.Lst");
Clazz_defineStatics (c$,
"OS_PI_COUNTS",  Clazz_newArray (-1, [ Clazz_newIntArray (-1, [-2, 1, 0]),  Clazz_newIntArray (-1, [1, 2, 1, -1]),  Clazz_newIntArray (-1, [2, 1, 2, 1, 1]),  Clazz_newIntArray (-1, [2, 1]),  Clazz_newIntArray (-1, [-2, 1, 2, 1, -2]),  Clazz_newIntArray (-1, [2, 1, 2, 2])]));
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.BS"], "JS.SmilesRing", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.$set = null;
this.edges = null;
this.bsEdgesToCheck = null;
this.isOK = false;
this.n = 0;
Clazz_instantialize (this, arguments);
}, JS, "SmilesRing", JU.BS);
Clazz_makeConstructor (c$, 
function (n, atoms, edges, isOK) {
Clazz_superConstructor (this, JS.SmilesRing, []);
this.or (atoms);
this.edges = edges;
this.isOK = isOK;
this.n = n;
}, "~N,JU.BS,JU.Lst,~B");
Clazz_defineMethod (c$, "addEdges", 
function (htEdgeMap) {
for (var i = this.edges.size (); --i >= 0; ) htEdgeMap.put (JS.SmilesRing.getKey (this.edges.get (i)), this.$set);

}, "java.util.Hashtable");
c$.getSetByEdge = Clazz_defineMethod (c$, "getSetByEdge", 
function (edge, htEdgeMap) {
return htEdgeMap.get (JS.SmilesRing.getKey (edge));
}, "JU.Edge,java.util.Hashtable");
c$.getKey = Clazz_defineMethod (c$, "getKey", 
 function (e) {
var i = e.getAtomIndex1 ();
var j = e.getAtomIndex2 ();
return (i < j ? i + "_" + j : j + "_" + i);
}, "JU.Edge");
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.Lst", "$.BS"], "JS.SmilesRingSet", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.bs = null;
Clazz_instantialize (this, arguments);
}, JS, "SmilesRingSet", JU.Lst);
Clazz_prepareFields (c$, function () {
this.bs =  new JU.BS ();
});
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.SmilesRingSet, []);
});
Clazz_defineMethod (c$, "addSet", 
function (set, htEdgeMap) {
for (var i = set.size (); --i >= 0; ) {
var r = set.get (i);
this.addRing (r);
r.addEdges (htEdgeMap);
}
}, "JS.SmilesRingSet,java.util.Hashtable");
Clazz_defineMethod (c$, "addRing", 
function (ring) {
this.addLast (ring);
ring.$set = this;
this.bs.or (ring);
}, "JS.SmilesRing");
Clazz_defineMethod (c$, "getElectronCount", 
function (eCounts) {
var eCount = 0;
for (var j = this.bs.nextSetBit (0); j >= 0; j = this.bs.nextSetBit (j + 1)) eCount += eCounts[j];

return eCount;
}, "~A");
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.P3", "JU.Node"], "JS.SmilesAtom", ["java.lang.Float", "JU.AU", "JU.Elements", "$.Logger", "JV.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.patternIndex = -1;
this.pattern = null;
this.primitiveType = 0;
this.isAND = false;
this.subAtoms = null;
this.nSubAtoms = 0;
this.index = 0;
this.referance = null;
this.residueName = null;
this.residueChar = null;
this.insCode = '\0';
this.isBioAtom = false;
this.isBioResidue = false;
this.isBioAtomWild = false;
this.bioType = '\0';
this.$isLeadAtom = false;
this.notBondedIndex = -1;
this.notCrossLinked = false;
this.aromaticAmbiguous = true;
this.covalentHydrogenCount = -1;
this.not = false;
this.selected = false;
this.hasSymbol = false;
this.elementDefined = false;
this.atomType = null;
this.bioAtomName = null;
this.isFirst = true;
this.jmolIndex = -1;
this.elementNumber = -2;
this.atomNumber = -2147483648;
this.residueNumber = -2147483648;
this.explicitHydrogenCount = -2147483648;
this.implicitHydrogenCount = -2147483648;
this.parent = null;
this.bonds = null;
this.bondCount = 0;
this.iNested = 0;
this.isAromatic = false;
this.atomicMass = -2147483648;
this.charge = -2147483648;
this.matchingIndex = -1;
this.stereo = null;
this.component = -2147483648;
this.matchingComponent = 0;
this.atomSite = 0;
this.degree = -1;
this.nonhydrogenDegree = -1;
this.valence = 0;
this.connectivity = -1;
this.ringMembership = -2147483648;
this.ringSize = -2147483648;
this.ringConnectivity = -1;
this.matchingNode = null;
this.hasSubpattern = false;
this.mapIndex = -1;
this.atomClass = NaN;
this.symbol = null;
this.isTopoAtom = false;
this.missingHydrogenCount = 0;
this.cipChirality = 0;
Clazz_instantialize (this, arguments);
}, JS, "SmilesAtom", JU.P3, JU.Node);
Clazz_prepareFields (c$, function () {
this.bonds =  new Array (4);
});
c$.allowSmilesUnbracketed = Clazz_defineMethod (c$, "allowSmilesUnbracketed", 
function (xx) {
return ("B, C, N, O, P, S, F, Cl, Br, I, *,".indexOf (xx + ",") >= 0);
}, "~S");
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.SmilesAtom, []);
});
Clazz_overrideMethod (c$, "getAtomType", 
function () {
return (this.atomType == null ? this.bioAtomName : this.atomType);
});
Clazz_defineMethod (c$, "getChiralClass", 
function () {
return (this.stereo == null ? -2147483648 : this.stereo.getChiralClass (this));
});
Clazz_defineMethod (c$, "isDefined", 
function () {
return (this.hasSubpattern || this.iNested != 0 || this.isBioAtom || this.component != -2147483648 || this.elementNumber != -2 || this.nSubAtoms > 0);
});
Clazz_defineMethod (c$, "setBioAtom", 
function (bioType) {
this.isBioAtom = (bioType != '\0');
this.bioType = bioType;
if (this.parent != null) {
this.parent.bioType = bioType;
this.parent.isBioAtom = this.isBioAtom;
this.parent.isBioAtomWild = this.isBioAtomWild;
}}, "~S");
Clazz_defineMethod (c$, "setAtomName", 
function (name) {
if (name == null) return;
if (name.length > 0) this.bioAtomName = name;
if (name.equals ("\0")) this.$isLeadAtom = true;
if (this.parent != null) {
this.parent.bioAtomName = name;
}}, "~S");
Clazz_defineMethod (c$, "setBonds", 
function (bonds) {
this.bonds = bonds;
}, "~A");
Clazz_defineMethod (c$, "addSubAtom", 
function (sAtom, isAND) {
this.isAND = isAND;
if (this.subAtoms == null) this.subAtoms =  new Array (2);
if (this.nSubAtoms >= this.subAtoms.length) this.subAtoms = JU.AU.doubleLength (this.subAtoms);
sAtom.setIndex (this.index);
sAtom.parent = this;
this.subAtoms[this.nSubAtoms++] = sAtom;
this.setSymbol ("*");
this.hasSymbol = false;
return sAtom;
}, "JS.SmilesAtom,~B");
Clazz_defineMethod (c$, "setIndex", 
function (index) {
this.index = index;
return this;
}, "~N");
Clazz_defineMethod (c$, "setTopoAtom", 
function (iComponent, ptAtom, symbol, charge, patternIndex) {
this.component = iComponent;
this.index = ptAtom;
this.patternIndex = patternIndex;
this.setSymbol (symbol);
this.charge = charge;
this.isTopoAtom = true;
return this;
}, "~N,~N,~S,~N,~N");
Clazz_defineMethod (c$, "setHydrogenCount", 
function () {
this.missingHydrogenCount = this.explicitHydrogenCount;
if (this.explicitHydrogenCount != -2147483648) return true;
var count = JS.SmilesAtom.getDefaultCount (this.elementNumber, this.isAromatic);
if (count < 0) {
this.missingHydrogenCount = 0;
return (count == -1);
}if (this.elementNumber == 7 && this.isAromatic && this.bondCount == 2) {
if (this.bonds[0].order == 1 && this.bonds[1].order == 1) count++;
}for (var i = 0; i < this.bondCount; i++) {
var bond = this.bonds[i];
switch (bond.order) {
case 81:
if (this.elementNumber == 7) {
JU.Logger.info ("Ambiguous bonding to aromatic N found -- MF may be in error");
}count -= 1;
break;
case 1025:
case 1041:
case 65537:
case 65538:
count -= 1;
break;
case 2:
count -= (this.isAromatic && this.elementNumber == 6 ? 1 : 2);
break;
case 1:
case 3:
case 4:
count -= bond.order;
break;
}
}
if (count >= 0) this.missingHydrogenCount = this.explicitHydrogenCount = count;
return true;
});
c$.getDefaultCount = Clazz_defineMethod (c$, "getDefaultCount", 
function (elementNumber, isAromatic) {
switch (elementNumber) {
case 0:
case -1:
case -2:
return -1;
case 6:
return (isAromatic ? 3 : 4);
case 8:
case 16:
return 2;
case 7:
return (isAromatic ? 2 : 3);
case 5:
case 15:
return 3;
case 9:
case 17:
case 35:
case 53:
return 1;
}
return -2;
}, "~N,~B");
Clazz_overrideMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz_defineMethod (c$, "setSymbol", 
function (symbol) {
this.symbol = symbol;
this.isAromatic = symbol.equals (symbol.toLowerCase ());
this.hasSymbol = true;
this.elementDefined = true;
if (symbol.equals ("*")) {
this.isAromatic = false;
this.elementNumber = -2;
return true;
}if (symbol.equals ("Xx")) {
this.elementNumber = 0;
return true;
}this.aromaticAmbiguous = false;
if (symbol.equals ("a") || symbol.equals ("A")) {
if (this.elementNumber < 0) this.elementNumber = -1;
return true;
}if (this.isAromatic) symbol = symbol.substring (0, 1).toUpperCase () + (symbol.length == 1 ? "" : symbol.substring (1));
this.elementNumber = JU.Elements.elementNumberFromSymbol (symbol, true);
return (this.elementNumber != 0);
}, "~S");
Clazz_overrideMethod (c$, "getElementNumber", 
function () {
return this.elementNumber;
});
Clazz_defineMethod (c$, "getAtomicMass", 
function () {
return this.atomicMass;
});
Clazz_overrideMethod (c$, "getAtomNumber", 
function () {
return this.atomNumber;
});
Clazz_defineMethod (c$, "setAtomicMass", 
function (mass) {
this.atomicMass = mass;
}, "~N");
Clazz_defineMethod (c$, "getCharge", 
function () {
return this.charge;
});
Clazz_defineMethod (c$, "setCharge", 
function (charge) {
this.charge = charge;
}, "~N");
Clazz_defineMethod (c$, "getMatchingAtomIndex", 
function () {
return this.matchingIndex;
});
Clazz_defineMethod (c$, "getMatchingAtom", 
function () {
return this.matchingNode == null ? this : this.matchingNode;
});
Clazz_defineMethod (c$, "setMatchingAtom", 
function (jmolAtom, index) {
this.matchingNode = jmolAtom;
this.matchingIndex = index;
}, "JU.Node,~N");
Clazz_defineMethod (c$, "setExplicitHydrogenCount", 
function (count) {
this.explicitHydrogenCount = count;
}, "~N");
Clazz_defineMethod (c$, "setImplicitHydrogenCount", 
function (count) {
this.implicitHydrogenCount = count;
}, "~N");
Clazz_defineMethod (c$, "setDegree", 
function (degree) {
this.degree = degree;
}, "~N");
Clazz_defineMethod (c$, "setNonhydrogenDegree", 
function (degree) {
this.nonhydrogenDegree = degree;
}, "~N");
Clazz_defineMethod (c$, "setValence", 
function (valence) {
this.valence = valence;
}, "~N");
Clazz_defineMethod (c$, "setConnectivity", 
function (connectivity) {
this.connectivity = connectivity;
}, "~N");
Clazz_defineMethod (c$, "setRingMembership", 
function (rm) {
this.ringMembership = rm;
}, "~N");
Clazz_defineMethod (c$, "setRingSize", 
function (rs) {
this.ringSize = rs;
if (this.ringSize == 500 || this.ringSize == 600) this.isAromatic = true;
}, "~N");
Clazz_defineMethod (c$, "setRingConnectivity", 
function (rc) {
this.ringConnectivity = rc;
}, "~N");
Clazz_overrideMethod (c$, "getModelIndex", 
function () {
return this.component;
});
Clazz_overrideMethod (c$, "getMoleculeNumber", 
function (inModel) {
return this.component;
}, "~B");
Clazz_overrideMethod (c$, "getAtomSite", 
function () {
return this.atomSite;
});
Clazz_overrideMethod (c$, "getFormalCharge", 
function () {
return this.charge;
});
Clazz_overrideMethod (c$, "getIsotopeNumber", 
function () {
return this.atomicMass;
});
Clazz_overrideMethod (c$, "getAtomicAndIsotopeNumber", 
function () {
return JU.Elements.getAtomicAndIsotopeNumber (this.elementNumber, this.atomicMass);
});
Clazz_overrideMethod (c$, "getAtomName", 
function () {
return this.bioAtomName == null ? "" : this.bioAtomName;
});
Clazz_overrideMethod (c$, "getGroup3", 
function (allowNull) {
return this.residueName == null ? "" : this.residueName;
}, "~B");
Clazz_overrideMethod (c$, "getGroup1", 
function (c0) {
return this.residueChar == null ? "" : this.residueChar;
}, "~S");
Clazz_defineMethod (c$, "addBond", 
function (bond) {
if (this.bondCount >= this.bonds.length) this.bonds = JU.AU.doubleLength (this.bonds);
this.bonds[this.bondCount] = bond;
this.bondCount++;
}, "JS.SmilesBond");
Clazz_defineMethod (c$, "setBondArray", 
function () {
if (this.bonds.length > this.bondCount) this.bonds = JU.AU.arrayCopyObject (this.bonds, this.bondCount);
if (this.subAtoms != null && this.subAtoms.length > this.nSubAtoms) this.subAtoms = JU.AU.arrayCopyObject (this.subAtoms, this.subAtoms.length);
for (var i = 0; i < this.bonds.length; i++) {
var b = this.bonds[i];
if (this.isBioAtom && b.order == 17) b.order = 112;
if (b.atom1.index > b.atom2.index) {
b.switchAtoms ();
}}
});
Clazz_overrideMethod (c$, "getEdges", 
function () {
return (this.parent != null ? this.parent.getEdges () : this.bonds);
});
Clazz_defineMethod (c$, "getBond", 
function (number) {
return (this.parent != null ? this.parent.getBond (number) : number >= 0 && number < this.bondCount ? this.bonds[number] : null);
}, "~N");
Clazz_overrideMethod (c$, "getCovalentBondCount", 
function () {
return this.getBondCount ();
});
Clazz_overrideMethod (c$, "getBondCount", 
function () {
return (this.parent != null ? this.parent.getBondCount () : this.bondCount);
});
Clazz_overrideMethod (c$, "getCovalentBondCountPlusMissingH", 
function () {
return this.getBondCount () + (this.isTopoAtom ? 0 : this.missingHydrogenCount);
});
Clazz_overrideMethod (c$, "getTotalHydrogenCount", 
function () {
return this.getCovalentHydrogenCount () + (this.isTopoAtom ? 0 : this.missingHydrogenCount);
});
Clazz_overrideMethod (c$, "getImplicitHydrogenCount", 
function () {
return this.implicitHydrogenCount;
});
Clazz_defineMethod (c$, "getExplicitHydrogenCount", 
function () {
return this.explicitHydrogenCount;
});
Clazz_defineMethod (c$, "getMatchingBondedAtom", 
function (i) {
if (this.parent != null) return this.parent.getMatchingBondedAtom (i);
if (i >= this.bondCount) return -1;
var b = this.bonds[i];
return (b.atom1 === this ? b.atom2 : b.atom1).matchingIndex;
}, "~N");
Clazz_overrideMethod (c$, "getBondedAtomIndex", 
function (j) {
return (this.parent != null ? this.parent.getBondedAtomIndex (j) : this.bonds[j].getOtherAtom (this).index);
}, "~N");
Clazz_overrideMethod (c$, "getCovalentHydrogenCount", 
function () {
if (this.covalentHydrogenCount >= 0) return this.covalentHydrogenCount;
if (this.parent != null) return (this.covalentHydrogenCount = this.parent.getCovalentHydrogenCount ());
this.covalentHydrogenCount = 0;
for (var k = 0; k < this.bonds.length; k++) if (this.bonds[k].getOtherAtom (this).elementNumber == 1) this.covalentHydrogenCount++;

return this.covalentHydrogenCount;
});
Clazz_overrideMethod (c$, "getValence", 
function () {
if (this.parent != null) return this.parent.getValence ();
var n = this.valence;
if (n <= 0 && this.bonds != null) for (var i = this.bonds.length; --i >= 0; ) n += this.bonds[i].getValence ();

this.valence = n;
return n;
});
Clazz_overrideMethod (c$, "getTotalValence", 
function () {
return this.getValence () + (this.isTopoAtom ? 0 : this.missingHydrogenCount);
});
Clazz_defineMethod (c$, "getBondTo", 
function (atom) {
if (this.parent != null) return this.parent.getBondTo (atom);
var bond;
for (var k = 0; k < this.bonds.length; k++) {
if ((bond = this.bonds[k]) == null) continue;
if (atom == null ? bond.atom2 === this : bond.getOtherAtom (this) === atom) return bond;
}
return null;
}, "JS.SmilesAtom");
Clazz_defineMethod (c$, "getBondNotTo", 
function (atom, allowH) {
var bond;
for (var k = 0; k < this.bonds.length; k++) {
if ((bond = this.bonds[k]) == null) continue;
var atom2 = bond.getOtherAtom (this);
if (atom !== atom2 && (allowH || atom2.elementNumber != 1)) return bond;
}
return null;
}, "JS.SmilesAtom,~B");
Clazz_overrideMethod (c$, "isLeadAtom", 
function () {
return this.$isLeadAtom;
});
Clazz_overrideMethod (c$, "getOffsetResidueAtom", 
function (name, offset) {
if (this.isBioAtom) {
if (offset == 0) return this.index;
for (var k = 0; k < this.bonds.length; k++) if (this.bonds[k].getAtomIndex1 () == this.index && this.bonds[k].order == 96) return this.bonds[k].getOtherAtom (this).index;

}return -1;
}, "~S,~N");
Clazz_overrideMethod (c$, "getGroupBits", 
function (bs) {
bs.set (this.index);
return;
}, "JU.BS");
Clazz_overrideMethod (c$, "isCrossLinked", 
function (node) {
var bond = this.getBondTo (node);
return bond.isHydrogen ();
}, "JU.Node");
Clazz_overrideMethod (c$, "getCrossLinkVector", 
function (vLinks, crosslinkCovalent, crosslinkHBond) {
var haveCrossLinks = false;
for (var k = 0; k < this.bonds.length; k++) if (this.bonds[k].order == 112) {
if (vLinks == null) return true;
vLinks.addLast (Integer.$valueOf (this.index));
vLinks.addLast (Integer.$valueOf (this.bonds[k].getOtherAtom (this).index));
vLinks.addLast (Integer.$valueOf (this.bonds[k].getOtherAtom (this).index));
haveCrossLinks = true;
}
return haveCrossLinks;
}, "JU.Lst,~B,~B");
Clazz_overrideMethod (c$, "getBioStructureTypeName", 
function () {
return null;
});
Clazz_overrideMethod (c$, "getInsertionCode", 
function () {
return this.insCode;
});
Clazz_overrideMethod (c$, "getResno", 
function () {
return this.residueNumber;
});
Clazz_overrideMethod (c$, "getChainID", 
function () {
return 0;
});
Clazz_overrideMethod (c$, "getChainIDStr", 
function () {
return "";
});
c$.getAtomLabel = Clazz_defineMethod (c$, "getAtomLabel", 
function (atomicNumber, isotopeNumber, valence, charge, osclass, nH, isAromatic, stereo) {
var sym = JU.Elements.elementSymbolFromNumber (atomicNumber);
if (isAromatic) {
sym = sym.toLowerCase ();
if (atomicNumber != 6) valence = 2147483647;
}var count = (valence == 2147483647 || isotopeNumber != 0 || charge != 0 || !Float.isNaN (osclass) || stereo != null && stereo.length > 0 ? -1 : JS.SmilesAtom.getDefaultCount (atomicNumber, false));
return (count == valence ? sym : "[" + (isotopeNumber <= 0 ? "" : "" + isotopeNumber) + sym + (stereo == null ? "" : stereo) + (nH > 1 ? "H" + nH : nH == 1 ? "H" : "") + (charge < 0 && charge != -2147483648 ? "" + charge : charge > 0 ? "+" + charge : "") + (Float.isNaN (osclass) ? "" : ":" + Clazz_floatToInt (osclass)) + "]");
}, "~N,~N,~N,~N,~N,~N,~B,~S");
Clazz_overrideMethod (c$, "getBioSmilesType", 
function () {
return this.bioType;
});
Clazz_defineMethod (c$, "isNucleic", 
function () {
return this.bioType == 'n' || this.bioType == 'r' || this.bioType == 'd';
});
Clazz_overrideMethod (c$, "isPurine", 
function () {
return this.residueChar != null && this.isNucleic () && "AG".indexOf (this.residueChar) >= 0;
});
Clazz_overrideMethod (c$, "isPyrimidine", 
function () {
return this.residueChar != null && this.isNucleic () && "CTUI".indexOf (this.residueChar) >= 0;
});
Clazz_overrideMethod (c$, "isDeleted", 
function () {
return false;
});
Clazz_overrideMethod (c$, "findAtomsLike", 
function (substring) {
return null;
}, "~S");
Clazz_overrideMethod (c$, "toString", 
function () {
var s = (this.residueChar != null || this.residueName != null ? (this.residueChar == null ? this.residueName : this.residueChar) + "." + this.bioAtomName : (this.bioAtomName != null && this.atomNumber != -2147483648 ? null : this.elementNumber == -1 ? "A" : this.elementNumber == -2 ? "*" : JU.Elements.elementSymbolFromNumber (this.elementNumber)));
if (s == null) return this.bioAtomName + " #" + this.atomNumber;
if (this.isAromatic) s = s.toLowerCase ();
var s2 = "";
for (var i = 0; i < this.bondCount; i++) s2 += this.bonds[i].getOtherAtom (this).index + ", ";

return "[" + s + '.' + this.index + (this.matchingIndex >= 0 ? "(" + this.matchingNode + ")" : "") + "]" + s2 + "(" + this.x + "," + this.y + "," + this.z + ")";
});
Clazz_overrideMethod (c$, "getFloatProperty", 
function (property) {
if (property === "property_atomclass") return this.atomClass;
return NaN;
}, "~S");
Clazz_overrideMethod (c$, "getMass", 
function () {
return this.atomicMass;
});
Clazz_overrideMethod (c$, "getCIPChirality", 
function (doCalculate) {
return JV.JC.getCIPChiralityName (this.cipChirality & -225);
}, "~B");
Clazz_overrideMethod (c$, "setCIPChirality", 
function (c) {
this.cipChirality = c;
}, "~N");
Clazz_overrideMethod (c$, "getCIPChiralityCode", 
function () {
return this.cipChirality;
});
Clazz_overrideMethod (c$, "getXYZ", 
function () {
return this;
});
Clazz_defineMethod (c$, "getStereo", 
function () {
return this.stereo;
});
Clazz_defineMethod (c$, "getPatternIndex", 
function () {
return this.patternIndex;
});
Clazz_overrideMethod (c$, "modelIsRawPDB", 
function () {
return false;
});
Clazz_defineStatics (c$,
"UNBRACKETED_SET", "B, C, N, O, P, S, F, Cl, Br, I, *,");
});
Clazz_declarePackage ("JS");
Clazz_load (["JU.Edge"], "JS.SmilesBond", ["JS.InvalidSmilesException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.atom1 = null;
this.atom2 = null;
this.isNot = false;
this.matchingBond = null;
this.primitives = null;
this.nPrimitives = 0;
this.bondsOr = null;
this.nBondsOr = 0;
this.isConnection = false;
this.atropType = null;
this.isChain = false;
Clazz_instantialize (this, arguments);
}, JS, "SmilesBond", JU.Edge);
c$.getBondOrderString = Clazz_defineMethod (c$, "getBondOrderString", 
function (order) {
switch (order) {
case 2:
return "=";
case 3:
return "#";
case 4:
return "$";
default:
return "";
}
}, "~N");
c$.getBondTypeFromCode = Clazz_defineMethod (c$, "getBondTypeFromCode", 
function (code) {
switch (code) {
case '.':
return 0;
case '-':
return 1;
case '=':
return 2;
case '#':
return 3;
case '$':
return 4;
case ':':
return 17;
case '/':
return 1025;
case '\\':
return 1041;
case '^':
return 65537;
case '`':
return 65538;
case '@':
return 65;
case '~':
return 81;
case '+':
return 96;
}
return -1;
}, "~S");
Clazz_defineMethod (c$, "getAtom1", 
function () {
return this.atom1;
});
Clazz_defineMethod (c$, "set", 
function (bond) {
this.order = bond.order;
this.isNot = bond.isNot;
this.primitives = bond.primitives;
this.nPrimitives = bond.nPrimitives;
this.bondsOr = bond.bondsOr;
this.nBondsOr = bond.nBondsOr;
}, "JS.SmilesBond");
Clazz_defineMethod (c$, "setAtropType", 
function (nn) {
this.atropType =  Clazz_newIntArray (-1, [Clazz_doubleToInt (nn / 10) - 1, nn % 10 - 1]);
}, "~N");
Clazz_defineMethod (c$, "setPrimitive", 
function (i) {
var p = this.primitives[i];
this.order = p.order;
this.isNot = p.isNot;
this.atropType = p.atropType;
return p;
}, "~N");
Clazz_defineMethod (c$, "addBondOr", 
function () {
if (this.bondsOr == null) this.bondsOr =  new Array (2);
if (this.nBondsOr >= this.bondsOr.length) {
var tmp =  new Array (this.bondsOr.length * 2);
System.arraycopy (this.bondsOr, 0, tmp, 0, this.bondsOr.length);
this.bondsOr = tmp;
}var sBond =  new JS.SmilesBond (null, null, -1, false);
this.bondsOr[this.nBondsOr] = sBond;
this.nBondsOr++;
return sBond;
});
Clazz_defineMethod (c$, "addPrimitive", 
function () {
if (this.primitives == null) this.primitives =  new Array (2);
if (this.nPrimitives >= this.primitives.length) {
var tmp =  new Array (this.primitives.length * 2);
System.arraycopy (this.primitives, 0, tmp, 0, this.primitives.length);
this.primitives = tmp;
}var sBond =  new JS.SmilesBond (null, null, -1, false);
this.primitives[this.nPrimitives] = sBond;
this.nPrimitives++;
return sBond;
});
Clazz_overrideMethod (c$, "toString", 
function () {
return this.atom1 + " -" + (this.isNot ? "!" : "") + this.order + "- " + this.atom2;
});
Clazz_makeConstructor (c$, 
function (atom1, atom2, bondType, isNot) {
Clazz_superConstructor (this, JS.SmilesBond, []);
this.set2 (bondType, isNot);
this.set2a (atom1, atom2);
}, "JS.SmilesAtom,JS.SmilesAtom,~N,~B");
Clazz_defineMethod (c$, "set2", 
function (bondType, isNot) {
this.order = bondType;
this.isNot = isNot;
}, "~N,~B");
Clazz_defineMethod (c$, "set2a", 
function (a1, a2) {
if (a1 != null) {
this.atom1 = a1;
a1.addBond (this);
}if (a2 != null) {
this.atom2 = a2;
if (a2.isBioAtomWild && this.atom1.isBioAtomWild) this.order = 96;
a2.isFirst = false;
a2.addBond (this);
}}, "JS.SmilesAtom,JS.SmilesAtom");
Clazz_defineMethod (c$, "setAtom2", 
function (atom, molecule) {
this.atom2 = atom;
if (this.atom2 != null) {
atom.addBond (this);
this.isConnection = true;
}}, "JS.SmilesAtom,JS.SmilesSearch");
Clazz_defineMethod (c$, "isFromPreviousTo", 
function (atom) {
return (!this.isConnection && this.atom2 === atom);
}, "JS.SmilesAtom");
c$.isBondType = Clazz_defineMethod (c$, "isBondType", 
function (ch, isSearch, isBioSequence) {
if (ch == '>') return 1;
if ("-=#$:/\\.~^`+!,&;@".indexOf (ch) < 0) return 0;
if (!isSearch && "-=#$:/\\.~^`".indexOf (ch) < 0) throw  new JS.InvalidSmilesException ("SMARTS bond type " + ch + " not allowed in SMILES");
switch (ch) {
case '~':
return (isBioSequence ? 0 : 1);
case '^':
case '`':
return -1;
default:
return 1;
}
}, "~S,~B,~B");
Clazz_defineMethod (c$, "getBondType", 
function () {
return this.order;
});
Clazz_defineMethod (c$, "getValence", 
function () {
return (this.order & 7);
});
Clazz_defineMethod (c$, "getOtherAtom", 
function (a) {
return (this.atom1 === a ? this.atom2 : this.atom1);
}, "JS.SmilesAtom");
Clazz_overrideMethod (c$, "getAtomIndex1", 
function () {
return this.atom1.index;
});
Clazz_overrideMethod (c$, "getAtomIndex2", 
function () {
return this.atom2.index;
});
Clazz_overrideMethod (c$, "getCovalentOrder", 
function () {
return this.order;
});
Clazz_overrideMethod (c$, "getOtherNode", 
function (atom) {
return (atom === this.atom1 ? this.atom2 : atom === this.atom2 || atom == null ? this.atom1 : null);
}, "JU.SimpleNode");
Clazz_overrideMethod (c$, "isCovalent", 
function () {
return this.order != 112;
});
Clazz_overrideMethod (c$, "isHydrogen", 
function () {
return this.order == 112;
});
Clazz_defineMethod (c$, "switchAtoms", 
function () {
var a = this.atom1;
this.atom1 = this.atom2;
this.atom2 = a;
switch (this.order) {
case 65537:
this.order = 65538;
break;
case 65538:
this.order = 65537;
break;
case 1025:
this.order = 1041;
break;
case 1041:
this.order = 1025;
break;
}
});
Clazz_defineMethod (c$, "getRealCovalentOrder", 
function () {
switch (this.order) {
case 65537:
case 65538:
case 1025:
case 1041:
return 1;
}
return this.order;
});
Clazz_defineMethod (c$, "getMatchingBond", 
function () {
return this.matchingBond == null ? this : this.matchingBond;
});
Clazz_defineStatics (c$,
"TYPE_UNKNOWN", -1,
"TYPE_NONE", 0,
"TYPE_AROMATIC", 0x11,
"TYPE_RING", 0x41,
"TYPE_ANY", 0x51,
"TYPE_BIO_SEQUENCE", 0x60,
"TYPE_BIO_CROSSLINK", 0x70,
"ALL_BONDS", "-=#$:/\\.~^`+!,&;@",
"SMILES_BONDS", "-=#$:/\\.~^`");
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.SmilesMeasure", ["JU.PT"], function () {
c$ = Clazz_decorateAsClass (function () {
this.search = null;
this.nPoints = 0;
this.type = 0;
this.index = 0;
this.isNot = false;
this.indices = null;
this.minmax = null;
this.points = null;
Clazz_instantialize (this, arguments);
}, JS, "SmilesMeasure");
Clazz_prepareFields (c$, function () {
this.indices =  Clazz_newIntArray (4, 0);
this.points =  new Array (4);
});
Clazz_makeConstructor (c$, 
function (search, index, type, isNot, minmax) {
this.search = search;
this.type = Math.min (4, Math.max (type, 2));
this.index = index;
this.isNot = isNot;
this.minmax = minmax;
for (var i = minmax.length - 2; i >= 0; i -= 2) if (minmax[i] > minmax[i + 1]) {
var min = minmax[i + 1];
minmax[i + 1] = minmax[i];
minmax[i] = min;
}
}, "JS.SmilesSearch,~N,~N,~B,~A");
Clazz_defineMethod (c$, "addPoint", 
function (index) {
if (this.nPoints == this.type) return false;
if (this.nPoints == 0) for (var i = 1; i < this.type; i++) this.indices[i] = index + i;

this.indices[this.nPoints++] = index;
return true;
}, "~N");
Clazz_defineMethod (c$, "check", 
function () {
for (var i = 0; i < this.type; i++) {
var iAtom = this.search.patternAtoms[this.indices[i]].getMatchingAtomIndex ();
this.points[i] = this.search.targetAtoms[iAtom];
}
var d = 0;
switch (this.type) {
case 2:
d = this.points[0].distance (this.points[1]);
break;
case 3:
this.search.v.vA.sub2 (this.points[0], this.points[1]);
this.search.v.vB.sub2 (this.points[2], this.points[1]);
d = this.search.v.vA.angle (this.search.v.vB) / 0.017453292;
break;
case 4:
d = JS.SmilesMeasure.setTorsionData (this.points[0], this.points[1], this.points[2], this.points[3], this.search.v, true);
break;
}
for (var i = this.minmax.length - 2; i >= 0; i -= 2) if (d >= this.minmax[i] && d <= this.minmax[i + 1]) return !this.isNot;

return this.isNot;
});
c$.setTorsionData = Clazz_defineMethod (c$, "setTorsionData", 
function (pt1a, pt1, pt2, pt2a, v, withDihedral) {
v.vTemp1.sub2 (pt1a, pt1);
v.vTemp2.sub2 (pt2a, pt2);
if (!withDihedral) return 0;
v.vNorm2.sub2 (pt1, pt2);
v.vNorm2.normalize ();
v.vTemp1.cross (v.vTemp1, v.vNorm2);
v.vTemp1.normalize ();
v.vTemp2.cross (v.vTemp2, v.vNorm2);
v.vTemp2.normalize ();
v.vNorm3.cross (v.vTemp1, v.vTemp2);
return v.vTemp1.angle (v.vTemp2) / 0.017453292 * (v.vNorm2.dot (v.vNorm3) < 0 ? 1 : -1);
}, "JU.T3,JU.T3,JU.T3,JU.T3,JS.VTemp,~B");
Clazz_overrideMethod (c$, "toString", 
function () {
var s = "(." + "__dat".charAt (this.type) + this.index + ":" + JU.PT.toJSON (null, this.minmax) + ") for";
for (var i = 0; i < this.type; i++) s += " " + (i >= this.nPoints ? "?" : "" + this.indices[i]);

return s;
});
Clazz_defineStatics (c$,
"TYPES", "__dat",
"radiansPerDegree", (0.017453292519943295));
});
Clazz_declarePackage ("JS");
Clazz_load (["java.util.Hashtable"], "JS.SmilesParser", ["java.lang.Character", "$.Float", "JU.Lst", "$.PT", "$.SB", "JS.InvalidSmilesException", "$.SmilesAtom", "$.SmilesBond", "$.SmilesMeasure", "$.SmilesSearch", "$.SmilesStereo", "JU.Elements", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.connections = null;
this.htMeasures = null;
this.flags = 0;
this.isSmarts = false;
this.isBioSequence = false;
this.bioType = '\0';
this.braceCount = 0;
this.branchLevel = 0;
this.componentCount = 0;
this.componentParenCount = 0;
this.ignoreStereochemistry = false;
this.bondDirectionPaired = true;
this.isTarget = false;
Clazz_instantialize (this, arguments);
}, JS, "SmilesParser");
Clazz_prepareFields (c$, function () {
this.connections =  new java.util.Hashtable ();
this.htMeasures =  new java.util.Hashtable ();
});
c$.newSearch = Clazz_defineMethod (c$, "newSearch", 
function (pattern, isSmarts, isTarget) {
return ( new JS.SmilesParser (isSmarts, isTarget)).parse (pattern);
}, "~S,~B,~B");
Clazz_makeConstructor (c$, 
function (isSmarts, isTarget) {
this.isSmarts = isSmarts;
this.isTarget = isTarget;
}, "~B,~B");
Clazz_defineMethod (c$, "parse", 
function (pattern) {
if (pattern == null) throw  new JS.InvalidSmilesException ("expression must not be null");
var search =  new JS.SmilesSearch ();
if (pattern.indexOf ("$(select") >= 0) pattern = this.parseNested (search, pattern, "select");
var ret =  Clazz_newIntArray (1, 0);
pattern = JS.SmilesParser.extractFlags (pattern, ret);
this.flags = ret[0];
search.setFlags (this.flags);
if (pattern.indexOf ("$") >= 0) pattern = this.parseVariables (pattern);
if (this.isSmarts && pattern.indexOf ("[$") >= 0) pattern = this.parseVariableLength (pattern);
if (pattern.indexOf ("||") < 0) return this.getSubsearch (search, pattern, this.flags);
var patterns = JU.PT.split (pattern, "||");
var toDo = "";
search.subSearches =  new Array (patterns.length);
for (var i = 0; i < patterns.length; i++) {
var key = "|" + patterns[i] + "|";
if (toDo.indexOf (key) < 0) {
search.subSearches[i] = this.getSubsearch (search, patterns[i], this.flags);
toDo += key;
}}
return search;
}, "~S");
Clazz_defineMethod (c$, "parseVariableLength", 
 function (pattern) {
var sout =  new JU.SB ();
var len = pattern.length - 1;
var nParen = 0;
var haveInternalOr = false;
for (var i = 0; i < len; i++) {
switch (pattern.charAt (i)) {
case '(':
nParen++;
break;
case ')':
nParen--;
break;
case '|':
if (nParen > 0) {
haveInternalOr = true;
if (pattern.charAt (i + 1) == '|') {
pattern = pattern.substring (0, i) + pattern.substring (i + 1);
len--;
}}break;
}
}
if (pattern.indexOf ("||") >= 0) {
var patterns = JU.PT.split (pattern, "||");
for (var i = 0; i < patterns.length; i++) sout.append ("||").append (this.parseVariableLength (patterns[i]));

} else {
var pt = -1;
var ret =  Clazz_newIntArray (1, 0);
var isOK = true;
var bracketed = null;
while ((pt = pattern.indexOf ("[$", pt + 1)) >= 0) {
var pt0 = pt;
var min = -2147483648;
var max = -2147483648;
pt = JS.SmilesParser.getDigits (pattern, pt + 2, ret);
min = ret[0];
if (min != -2147483648) {
if (JS.SmilesParser.getChar (pattern, pt) == '-') {
pt = JS.SmilesParser.getDigits (pattern, pt + 1, ret);
max = ret[0];
}}if (JS.SmilesParser.getChar (pattern, pt) != '(') continue;
bracketed = JS.SmilesParser.getSubPattern (pattern, pt0, '[');
if (!bracketed.endsWith (")")) continue;
var pt1 = pt0 + bracketed.length + 2;
var repeat = JS.SmilesParser.getSubPattern (pattern, pt, '(');
var pt2 = pt;
bracketed = JS.SmilesParser.getSubPattern (pattern, pt, '[');
pt += 1 + repeat.length;
if (repeat.indexOf (':') >= 0 && repeat.indexOf ('|') < 0) {
var parenCount = 0;
var n = repeat.length;
var ptColon = -1;
for (var i = 0; i < n; i++) {
switch (repeat.charAt (i)) {
case '[':
case '(':
parenCount++;
break;
case ')':
case ']':
parenCount--;
break;
case '.':
if (ptColon >= 0 && parenCount == 0) n = i;
break;
case ':':
if (ptColon < 0 && parenCount == 0) ptColon = i;
break;
}
}
if (ptColon > 0) repeat = repeat.substring (0, ptColon) + "(" + repeat.substring (ptColon, n) + ")" + repeat.substring (n);
}if (min == -2147483648) {
var ptOr = repeat.indexOf ("|");
if (ptOr >= 0) return this.parseVariableLength (pattern.substring (0, pt0) + "[$1" + pattern.substring (pt2, pt2 + ptOr + 1) + ")]" + pattern.substring (pt1) + "||" + pattern.substring (0, pt0) + "[$1(" + pattern.substring (pt2 + ptOr + 2) + pattern.substring (pt1));
continue;
}if (max == -2147483648) max = min;
if (repeat.indexOf ("|") >= 0) repeat = "[$(" + repeat + ")]";
for (var i = min; i <= max; i++) {
var sb =  new JU.SB ();
sb.append ("||").append (pattern.substring (0, pt0));
for (var j = 0; j < i; j++) sb.append (repeat);

sb.append (pattern.substring (pt1));
sout.appendSB (sb);
}
}
if (!isOK) throw  new JS.InvalidSmilesException ("bad variable expression: " + bracketed);
}return (haveInternalOr ? this.parseVariableLength (sout.substring (2)) : sout.length () < 2 ? pattern : sout.substring (2));
}, "~S");
Clazz_defineMethod (c$, "getSubsearch", 
function (parent, pattern, flags) {
this.htMeasures =  new java.util.Hashtable ();
var search =  new JS.SmilesSearch ();
search.setTop (parent);
search.isSmarts = this.isSmarts;
search.pattern = pattern;
search.setFlags (flags);
if (pattern.indexOf ("$(") >= 0) pattern = this.parseNested (search, pattern, "");
this.parseSmiles (search, pattern, null, false);
if (this.braceCount != 0) throw  new JS.InvalidSmilesException ("unmatched '{'");
if (!this.connections.isEmpty ()) throw  new JS.InvalidSmilesException ("Open connection");
search.set ();
if (this.isSmarts) for (var i = search.ac; --i >= 0; ) this.checkNested (search, search.patternAtoms[i], flags);

 else if (!this.isBioSequence) search.elementCounts[1] = search.getMissingHydrogenCount ();
if (!this.ignoreStereochemistry && !this.isTarget) this.fixChirality (search);
return search;
}, "JS.SmilesSearch,~S,~N");
Clazz_defineMethod (c$, "checkNested", 
 function (search, atom, flags) {
if (atom.iNested > 0) {
var o = search.getNested (atom.iNested);
if (Clazz_instanceOf (o, String)) {
var s = o;
if (s.startsWith ("select")) return;
if (s.charAt (0) != '~' && atom.bioType != '\0') s = "~" + atom.bioType + "~" + s;
var nested = this.getSubsearch (search, s, flags);
if (nested.ac > 0 && nested.patternAtoms[0].selected) atom.selected = true;
search.setNested (atom.iNested, nested);
}}for (var i = 0; i < atom.nSubAtoms; i++) this.checkNested (search, atom.subAtoms[i], flags);

}, "JS.SmilesSearch,JS.SmilesAtom,~N");
Clazz_defineMethod (c$, "fixChirality", 
 function (search) {
for (var i = search.ac; --i >= 0; ) {
var sAtom = search.patternAtoms[i];
if (sAtom.stereo != null) sAtom.stereo.fixStereo (sAtom);
}
}, "JS.SmilesSearch");
Clazz_defineMethod (c$, "parseSmiles", 
 function (search, pattern, currentAtom, isBranchAtom) {
var ret =  Clazz_newIntArray (1, 0);
var pt = 0;
var ch;
var bond = null;
var wasMeasure = false;
var wasBranch = false;
loop : while (pattern != null && pattern.length != 0) {
var index = 0;
if (currentAtom == null) {
index = this.checkBioType (pattern, 0);
if (index == pattern.length) pattern += "*";
if (this.isBioSequence) search.needAromatic = search.top.needAromatic = false;
}ch = JS.SmilesParser.getChar (pattern, index);
var haveOpen = this.checkBrace (search, ch, '{');
if (haveOpen) ch = JS.SmilesParser.getChar (pattern, ++index);
if (ch == '(') {
var subString = JS.SmilesParser.getSubPattern (pattern, index, '(');
var isMeasure = (JS.SmilesParser.getChar (pattern, index + 1) == '.');
if (currentAtom == null) {
if (isMeasure || !this.isSmarts) throw  new JS.InvalidSmilesException ("No previous atom for measure");
search.haveComponents = true;
do {
this.componentCount++;
this.componentParenCount++;
ch = JS.SmilesParser.getChar (pattern = pattern.substring (1), 0);
} while (ch == '(');
if (!haveOpen && (haveOpen = this.checkBrace (search, ch, '{')) == true) ch = JS.SmilesParser.getChar (pattern = pattern.substring (1), 0);
} else {
wasMeasure = wasBranch = false;
if (subString.startsWith (".")) {
this.parseMeasure (search, subString.substring (1), currentAtom);
wasMeasure = true;
} else if (subString.length == 0 && this.isBioSequence) {
currentAtom.notCrossLinked = true;
} else {
this.branchLevel++;
this.parseSmiles (search, subString, currentAtom, true);
wasBranch = true;
this.branchLevel--;
}index = subString.length + 2;
ch = JS.SmilesParser.getChar (pattern, index);
if (ch == '}' && this.checkBrace (search, ch, '}')) index++;
ch = '\0';
}}if (ch != '\0') {
pt = index;
out : while (ch != '\0') {
switch (JS.SmilesBond.isBondType (ch, this.isSmarts, this.isBioSequence)) {
case 1:
break;
case 0:
break out;
case -1:
if (!((JU.PT.isDigit (JS.SmilesParser.getChar (pattern, ++index)) && index++ > 0 ? JU.PT.isDigit (JS.SmilesParser.getChar (pattern, index++)) : true) && (ch = JS.SmilesParser.getChar (pattern, index)) == '-')) throw  new JS.InvalidSmilesException ("malformed atropisomerism bond ^nn-  or ^^nn-");
continue;
}
ch = JS.SmilesParser.getChar (pattern, ++index);
}
ch = JS.SmilesParser.getChar (pattern, index);
if (ch == ')') {
switch (ch = JS.SmilesParser.getChar (pattern, ++index)) {
case '\0':
case ')':
case '.':
pattern = pattern.substring (index);
this.componentParenCount--;
if (this.componentParenCount >= 0) continue loop;
}
throw  new JS.InvalidSmilesException ("invalid continuation after component grouping (SMARTS).(SMARTS)");
}bond = this.parseBond (search, null, pattern.substring (pt, index), null, currentAtom, false, isBranchAtom, index - pt, ret);
if (haveOpen && bond.order != -1) ch = JS.SmilesParser.getChar (pattern, index = pt);
if (this.checkBrace (search, ch, '{')) ch = JS.SmilesParser.getChar (pattern, ++index);
switch (ch) {
case '~':
if (bond.order == 0) {
index = this.checkBioType (pattern, index);
if (index == pattern.length) pattern += "*";
}break;
case '(':
do {
this.componentCount++;
this.componentParenCount++;
ch = JS.SmilesParser.getChar (pattern, ++index);
} while (ch == '(');
break;
case '\0':
if (bond.order == 0) return;
}
var isConnect = (JU.PT.isDigit (ch) || ch == '%');
var isAtom = (!isConnect && (ch == '_' || ch == '[' || ch == '*' || JU.PT.isLetter (ch)));
if (isConnect) {
if (wasMeasure || wasBranch) throw  new JS.InvalidSmilesException ("connection number must immediately follow its connecting atom");
index = JS.SmilesParser.getRingNumber (pattern, index, ch, ret);
var ringNumber = ret[0];
this.parseConnection (search, ringNumber, currentAtom, bond);
bond = null;
} else if (isAtom) {
wasMeasure = wasBranch = false;
switch (ch) {
case '[':
case '_':
var subPattern = JS.SmilesParser.getSubPattern (pattern, index, ch);
index += subPattern.length + (ch == '[' ? 2 : 0);
if (this.isBioSequence && ch == '[' && subPattern.indexOf (".") < 0 && subPattern.indexOf ("_") < 0) subPattern += ".0";
currentAtom = this.parseAtom (search, null, subPattern, currentAtom, bond, ch == '[', false, isBranchAtom);
currentAtom.hasSubpattern = true;
if (bond.order != -1 && bond.order != 0) this.setBondAtom (bond, null, currentAtom, search);
bond = null;
break;
default:
var ch2 = (!this.isBioSequence && JU.PT.isUpperCase (ch) ? JS.SmilesParser.getChar (pattern, index + 1) : '\0');
if (ch != 'X' || ch2 != 'x') if (!JU.PT.isLowerCase (ch2) || JU.Elements.elementNumberFromSymbol (pattern.substring (index, index + 2), true) == 0) ch2 = '\0';
if (ch2 != '\0' && "NA CA BA PA SC AC".indexOf (pattern.substring (index, index + 2)) >= 0) {
ch2 = '\0';
}var size = (JU.PT.isUpperCase (ch) && JU.PT.isLowerCase (ch2) ? 2 : 1);
currentAtom = this.parseAtom (search, null, pattern.substring (index, index + size), currentAtom, bond, false, false, isBranchAtom);
bond = null;
index += size;
}
} else {
throw  new JS.InvalidSmilesException ("Unexpected character: " + JS.SmilesParser.getChar (pattern, index));
}ch = JS.SmilesParser.getChar (pattern, index);
if (ch == '}' && this.checkBrace (search, ch, '}')) index++;
}pattern = pattern.substring (index);
isBranchAtom = false;
}
}, "JS.SmilesSearch,~S,JS.SmilesAtom,~B");
Clazz_defineMethod (c$, "parseConnection", 
 function (search, ringNum, currentAtom, bond) {
var r = Integer.$valueOf (ringNum);
var bond0 = this.connections.get (r);
if (bond0 == null) {
this.connections.put (r, bond);
search.top.ringCount++;
return;
}this.connections.remove (r);
switch (bond.order) {
case -1:
bond.order = (bond0.order != -1 ? bond0.order : this.isSmarts || currentAtom.isAromatic && bond0.atom1.isAromatic ? 81 : 1);
break;
case 1025:
bond.order = 1041;
break;
case 1041:
bond.order = 1025;
break;
}
if (bond0.order != -1 && bond0.order != bond.order || currentAtom === bond0.atom1 || bond0.atom1.getBondTo (currentAtom) != null) throw  new JS.InvalidSmilesException ("Bad connection type or atom");
bond0.set (bond);
currentAtom.bondCount--;
bond0.setAtom2 (currentAtom, search);
}, "JS.SmilesSearch,~N,JS.SmilesAtom,JS.SmilesBond");
Clazz_defineMethod (c$, "setBondAtom", 
 function (bond, a1, a2, search) {
bond.set2a (a1, a2);
if (search != null && bond.order == 2 && bond.atom1 != null && bond.atom2 != null && bond.atom1.isAromatic && bond.atom2.isAromatic && ((this.flags & 512) == 0)) search.setFlags (this.flags = (this.flags | 512));
}, "JS.SmilesBond,JS.SmilesAtom,JS.SmilesAtom,JS.SmilesSearch");
c$.getRingNumber = Clazz_defineMethod (c$, "getRingNumber", 
function (pattern, index, ch, ret) {
var ringNumber;
switch (ch) {
case '%':
if (JS.SmilesParser.getChar (pattern, index + 1) == '(') {
var subPattern = JS.SmilesParser.getSubPattern (pattern, index + 1, '(');
JS.SmilesParser.getDigits (subPattern, 0, ret);
index += subPattern.length + 3;
if (ret[0] < 0) throw  new JS.InvalidSmilesException ("Invalid number designation: " + subPattern);
} else {
if (index + 3 <= pattern.length) index = JS.SmilesParser.getDigits (pattern.substring (0, index + 3), index + 1, ret);
if (ret[0] < 10) throw  new JS.InvalidSmilesException ("Two digits must follow the % sign");
}ringNumber = ret[0];
break;
default:
ringNumber = ch.charCodeAt (0) - 48;
index++;
}
ret[0] = ringNumber;
return index;
}, "~S,~N,~S,~A");
Clazz_defineMethod (c$, "checkBioType", 
 function (pattern, index) {
this.isBioSequence = (pattern.charAt (index) == '~');
if (this.isBioSequence) {
index++;
this.bioType = '*';
var ch = JS.SmilesParser.getChar (pattern, 2);
if (ch == '~' && ((ch = pattern.charAt (1)) == '*' || JU.PT.isLowerCase (ch))) {
this.bioType = ch;
index = 3;
}}return index;
}, "~S,~N");
Clazz_defineMethod (c$, "parseMeasure", 
 function (search, strMeasure, currentAtom) {
var pt = strMeasure.indexOf (":");
var id = (pt < 0 ? strMeasure : strMeasure.substring (0, pt));
while (pt != 0) {
var len = id.length;
if (len == 1) id += "0";
var m = this.htMeasures.get (id);
if ((m == null) == (pt < 0) || len == 0) break;
try {
if (pt > 0) {
var type = ("__dat".indexOf (id.charAt (0)));
if (type < 2) break;
var ret =  Clazz_newIntArray (1, 0);
JS.SmilesParser.getDigits (id, 1, ret);
var index = ret[0];
strMeasure = strMeasure.substring (pt + 1);
var isNot = strMeasure.startsWith ("!");
if (isNot) strMeasure = strMeasure.substring (1);
var isNegative = (strMeasure.startsWith ("-"));
if (isNegative) strMeasure = strMeasure.substring (1);
strMeasure = JU.PT.rep (strMeasure, "-", ",");
strMeasure = JU.PT.rep (strMeasure, ",,", ",-");
if (isNegative) strMeasure = "-" + strMeasure;
var tokens = JU.PT.split (strMeasure, ",");
if (tokens.length % 2 == 1 || isNot && tokens.length != 2) break;
var vals =  Clazz_newFloatArray (tokens.length, 0);
var i = tokens.length;
for (; --i >= 0; ) if (Float.isNaN (vals[i] = Float.parseFloat (tokens[i]))) break;

if (i >= 0) break;
m =  new JS.SmilesMeasure (search, index, type, isNot, vals);
search.measures.addLast (m);
if (index > 0) this.htMeasures.put (id, m);
 else if (index == 0 && JU.Logger.debugging) JU.Logger.debug ("measure created: " + m);
} else {
if (!m.addPoint (currentAtom.index)) break;
if (m.nPoints == m.type) {
this.htMeasures.remove (id);
if (JU.Logger.debugging) JU.Logger.debug ("measure created: " + m);
}return;
}if (!m.addPoint (currentAtom.index)) break;
} catch (e) {
if (Clazz_exceptionOf (e, NumberFormatException)) {
break;
} else {
throw e;
}
}
return;
}
throw  new JS.InvalidSmilesException ("invalid measure: " + strMeasure);
}, "JS.SmilesSearch,~S,JS.SmilesAtom");
Clazz_defineMethod (c$, "checkBrace", 
 function (search, ch, type) {
switch (ch) {
case '{':
if (ch != type) break;
this.braceCount++;
search.top.haveSelected = true;
return true;
case '}':
if (ch != type) break;
if (this.braceCount > 0) {
this.braceCount--;
return true;
}break;
default:
return false;
}
throw  new JS.InvalidSmilesException ("Unmatched '}'");
}, "JS.SmilesSearch,~S,~S");
Clazz_defineMethod (c$, "parseNested", 
 function (search, pattern, prefix) {
var index;
prefix = "$(" + prefix;
while ((index = pattern.lastIndexOf (prefix)) >= 0) {
var s = JS.SmilesParser.getSubPattern (pattern, index + 1, '(');
var pt = index + s.length + 3;
var ext = pattern.substring (pt);
pattern = pattern.substring (0, index);
var op = "";
if (pattern.endsWith ("]")) throw  new JS.InvalidSmilesException ("$(...) must be enclosed in brackets: " + pattern + "$(" + s + ")");
if (index > 1 && prefix.length == 2 && ((pt = pattern.length) > 1 && ",;&![".indexOf (pattern.substring (pt - 1)) < 0)) op = "&";
if (ext.length > 1 && ",;&!)]".indexOf (ext.charAt (0)) < 0) ext = "&" + ext;
pattern = pattern + op + "_" + search.top.addNested (s) + "_" + ext;
}
return pattern;
}, "JS.SmilesSearch,~S,~S");
Clazz_defineMethod (c$, "parseVariables", 
 function (pattern) {
var keys =  new JU.Lst ();
var values =  new JU.Lst ();
var index;
var ipt = 0;
var iptLast = -1;
if (JU.Logger.debugging) JU.Logger.info (pattern);
while ((index = pattern.indexOf ("$", ipt)) >= 0) {
if (JS.SmilesParser.getChar (pattern, index + 1) == '(') break;
ipt = JS.SmilesParser.skipTo (pattern, index, '=');
if (ipt <= index + 1 || JS.SmilesParser.getChar (pattern, ipt + 1) != '\"') break;
var key = pattern.substring (index, ipt);
if (key.lastIndexOf ('$') > 0 || key.indexOf (']') > 0) throw  new JS.InvalidSmilesException ("Invalid variable name: " + key);
var s = JS.SmilesParser.getSubPattern (pattern, ipt + 1, '\"');
keys.addLast ("[" + key + "]");
values.addLast (s);
ipt += s.length + 2;
ipt = JS.SmilesParser.skipTo (pattern, ipt, ';');
iptLast = ++ipt;
}
if (iptLast < 0) return pattern;
pattern = pattern.substring (iptLast);
for (var i = keys.size (); --i >= 0; ) {
var k = keys.get (i);
var v = values.get (i);
if (!v.equals (k)) pattern = JU.PT.rep (pattern, k, v);
}
if (JU.Logger.debugging) JU.Logger.info (pattern);
return pattern;
}, "~S");
Clazz_defineMethod (c$, "parseAtom", 
 function (search, atomSet, pattern, atom, bond, isBracketed, isAND, isBranchAtom) {
if (pattern == null || pattern.length == 0) throw  new JS.InvalidSmilesException ("Empty atom definition");
var newAtom =  new JS.SmilesAtom ();
if (this.componentParenCount > 0) newAtom.component = this.componentCount;
if (atomSet == null) search.appendAtom (newAtom);
var isNewAtom = true;
if (!this.checkLogic (search, pattern, newAtom, null, atom, isAND, isBranchAtom, null)) {
var ret =  Clazz_newIntArray (1, 0);
if (this.isBioSequence && pattern.length == 1) pattern += ".0";
var ch = pattern.charAt (0);
var index = 0;
var isNot = false;
if (this.isSmarts && ch == '!') {
ch = JS.SmilesParser.getChar (pattern, ++index);
if (ch == '\0') throw  new JS.InvalidSmilesException ("invalid '!'");
newAtom.not = isNot = true;
}var biopt = pattern.indexOf ('.');
if (biopt >= 0) {
newAtom.isBioResidue = true;
var resOrName = pattern.substring (index, biopt);
pattern = pattern.substring (biopt + 1).toUpperCase ();
var len = resOrName.length;
if ((biopt = resOrName.indexOf ("^")) >= 0) {
if (biopt == len - 2) {
ch = resOrName.charAt (len - 1);
if (ch != '*') newAtom.insCode = ch;
}resOrName = resOrName.substring (0, biopt);
}if ((biopt = resOrName.indexOf ("#")) >= 0) {
JS.SmilesParser.getDigits (resOrName, biopt + 1, ret);
newAtom.residueNumber = ret[0];
resOrName = resOrName.substring (0, biopt);
}if (resOrName.length == 0) resOrName = "*";
if (resOrName.length > 1) newAtom.residueName = resOrName.toUpperCase ();
 else if (!resOrName.equals ("*")) newAtom.residueChar = resOrName;
resOrName = pattern;
if ((biopt = resOrName.indexOf ("#")) >= 0) {
JS.SmilesParser.getDigits (resOrName, biopt + 1, ret);
newAtom.elementNumber = ret[0];
resOrName = resOrName.substring (0, biopt);
}if (resOrName.length == 0) resOrName = "*";
 else if (resOrName.equals ("0")) resOrName = "\0";
if (resOrName.equals ("*")) newAtom.isBioAtomWild = true;
 else newAtom.setAtomName (resOrName);
ch = '\0';
}newAtom.setBioAtom (this.bioType);
var hydrogenCount = -2147483648;
while (ch != '\0' && isNewAtom) {
newAtom.setAtomName (this.isBioSequence ? "\0" : "");
if (JU.PT.isDigit (ch)) {
index = JS.SmilesParser.getDigits (pattern, index, ret);
var mass = ret[0];
if (mass == -2147483648) throw  new JS.InvalidSmilesException ("Non numeric atomic mass");
if (JS.SmilesParser.getChar (pattern, index) == '?') {
index++;
mass = -mass;
}if (newAtom.elementDefined) throw  new JS.InvalidSmilesException ("atom mass must precede atom symbol or be separated from it with \";\"");
newAtom.setAtomicMass (mass);
} else {
switch (ch) {
case '"':
var type = JU.PT.getQuotedStringAt (pattern, index);
index += type.length + 2;
newAtom.atomType = type;
break;
case '_':
index = JS.SmilesParser.getDigits (pattern, index + 1, ret) + 1;
if (ret[0] == -2147483648) throw  new JS.InvalidSmilesException ("Invalid SEARCH primitive: " + pattern.substring (index));
newAtom.iNested = ret[0];
if (!isBracketed) throw  new JS.InvalidSmilesException ("nesting must appear in [...]: $(" + search.getNested (ret[0]) + ")");
if (this.isBioSequence && index != pattern.length) throw  new JS.InvalidSmilesException ("invalid characters: " + pattern.substring (index));
break;
case '=':
index = JS.SmilesParser.getDigits (pattern, index + 1, ret);
newAtom.jmolIndex = ret[0];
break;
case '#':
var isAtomNo = (pattern.charAt (index + 1) == '-');
index = JS.SmilesParser.getDigits (pattern, index + (isAtomNo ? 2 : 1), ret);
if (isAtomNo) newAtom.atomNumber = ret[0];
 else newAtom.elementNumber = ret[0];
break;
case '-':
case '+':
index = this.checkCharge (pattern, index, newAtom);
break;
case '@':
if (search.stereo == null) search.stereo = JS.SmilesStereo.newStereo (search);
index = JS.SmilesStereo.checkChirality (search, pattern, index, search.patternAtoms[newAtom.index]);
break;
case ':':
index = JS.SmilesParser.getDigits (pattern, ++index, ret);
if (ret[0] == -2147483648) throw  new JS.InvalidSmilesException ("Invalid atom class");
newAtom.atomClass = ret[0];
break;
default:
var nextChar = JS.SmilesParser.getChar (pattern, index + 1);
var len = index + (JU.PT.isLowerCase (nextChar) && (!isBracketed || !JU.PT.isDigit (JS.SmilesParser.getChar (pattern, index + 2))) ? 2 : 1);
var sym2 = pattern.substring (index + 1, len);
var symbol = Character.toUpperCase (ch) + sym2;
var mustBeSymbol = true;
var checkForPrimitive = (isBracketed && JU.PT.isLetter (ch));
if (checkForPrimitive) {
if (!isNot && (isAND ? atomSet : newAtom).hasSymbol) {
mustBeSymbol = false;
} else if (ch == 'H') {
mustBeSymbol = (pattern.length == 1 || !JU.PT.isDigit (nextChar));
} else if (JU.PT.isDigit (nextChar)) {
mustBeSymbol = false;
} else if (!symbol.equals ("A") && !symbol.equals ("Xx")) {
mustBeSymbol = ((ch == 'h' ? len == 2 : true) && JU.Elements.elementNumberFromSymbol (symbol, true) > 0);
if (!mustBeSymbol && len == 2) {
sym2 = "";
symbol = symbol.substring (0, 1);
mustBeSymbol = (JU.Elements.elementNumberFromSymbol (symbol, true) > 0);
}}}if (mustBeSymbol) {
if (!isBracketed && !this.isSmarts && !this.isBioSequence && !JS.SmilesAtom.allowSmilesUnbracketed (symbol) || !newAtom.setSymbol (symbol = ch + sym2)) throw  new JS.InvalidSmilesException ("Invalid atom symbol: " + symbol);
if (isAND) atomSet.hasSymbol = true;
index += symbol.length;
} else {
index = JS.SmilesParser.getDigits (pattern, index + 1, ret);
var val = ret[0];
switch (ch) {
default:
throw  new JS.InvalidSmilesException ("Invalid SEARCH primitive: " + pattern.substring (index));
case 'D':
newAtom.setDegree (val == -2147483648 ? 1 : val);
break;
case 'd':
newAtom.setNonhydrogenDegree (val == -2147483648 ? 1 : val);
break;
case 'H':
hydrogenCount = (val == -2147483648 ? 1 : val);
break;
case 'h':
newAtom.setImplicitHydrogenCount (val == -2147483648 ? -1 : val);
break;
case 'R':
if (val == -2147483648) val = -1;
newAtom.setRingMembership (val);
search.top.needRingData = true;
break;
case 'r':
if (val == -2147483648) {
val = -1;
newAtom.setRingMembership (val);
} else {
newAtom.setRingSize (val);
switch (val) {
case 500:
val = 5;
break;
case 600:
val = 6;
break;
}
if (val > search.ringDataMax) search.ringDataMax = val;
}search.top.needRingData = true;
break;
case 'v':
newAtom.setValence (val == -2147483648 ? 1 : val);
break;
case 'X':
newAtom.setConnectivity (val == -2147483648 ? 1 : val);
break;
case 'x':
newAtom.setRingConnectivity (val == -2147483648 ? -1 : val);
search.top.needRingData = true;
break;
}
}}
}ch = JS.SmilesParser.getChar (pattern, index);
if (isNot && ch != '\0') throw  new JS.InvalidSmilesException ("'!' may only involve one primitive.");
}
if (hydrogenCount == -2147483648 && isBracketed) hydrogenCount = -2147483647;
newAtom.setExplicitHydrogenCount (hydrogenCount);
search.patternAtoms[newAtom.index].setExplicitHydrogenCount (hydrogenCount);
}if (this.braceCount > 0) newAtom.selected = true;
if (isNewAtom && atomSet != null) atomSet.addSubAtom (newAtom, isAND);
if (atom != null && bond.order == 0) {
newAtom.notBondedIndex = atom.index;
}if (atom != null && bond.order != 0) {
if (bond.order == -1) bond.order = (this.isBioSequence && isBranchAtom ? 112 : this.isSmarts || atom.isAromatic && newAtom.isAromatic ? 81 : 1);
if (!isBracketed) this.setBondAtom (bond, null, newAtom, search);
if (this.branchLevel == 0 && (bond.order == 17 || bond.order == 112)) this.branchLevel++;
}if (this.branchLevel == 0) search.lastChainAtom = newAtom;
return newAtom;
}, "JS.SmilesSearch,JS.SmilesAtom,~S,JS.SmilesAtom,JS.SmilesBond,~B,~B,~B");
Clazz_defineMethod (c$, "checkCharge", 
 function (pattern, index, newAtom) {
var len = pattern.length;
var ch = pattern.charAt (index);
var count = 1;
++index;
if (index < len) {
var nextChar = pattern.charAt (index);
if (JU.PT.isDigit (nextChar)) {
var ret =  Clazz_newIntArray (1, 0);
index = JS.SmilesParser.getDigits (pattern, index, ret);
count = ret[0];
if (count == -2147483648) throw  new JS.InvalidSmilesException ("Non numeric charge");
} else {
while (index < len && pattern.charAt (index) == ch) {
index++;
count++;
}
}}newAtom.setCharge (ch == '+' ? count : -count);
return index;
}, "~S,~N,JS.SmilesAtom");
Clazz_defineMethod (c$, "parseBond", 
 function (search, bondSet, pattern, bond, currentAtom, isAND, isBranchAtom, len, ret) {
var ch;
if (len > 0) {
switch (ch = pattern.charAt (0)) {
case '>':
if (!pattern.equals (">>")) {
len = -1;
break;
}case '.':
if (bond == null && bondSet == null) {
this.isBioSequence = (JS.SmilesParser.getChar (pattern, 1) == '~');
return  new JS.SmilesBond (null, null, 0, false);
}len = -1;
break;
case '+':
if (bondSet != null) len = -1;
break;
}
} else {
ch = '\0';
}var newBond = (bondSet == null ? (bond == null ?  new JS.SmilesBond (currentAtom, null, (this.isBioSequence && currentAtom != null ? (isBranchAtom ? 112 : 96) : -1), false) : bond) : isAND ? bondSet.addPrimitive () : bondSet.addBondOr ());
if (len > 0 && !this.checkLogic (search, pattern, null, newBond, currentAtom, isAND, false, ret)) {
var isBondNot = (ch == '!');
if (isBondNot) {
ch = JS.SmilesParser.getChar (pattern, 1);
if (ch == '\0' || ch == '!') throw  new JS.InvalidSmilesException ("invalid '!'");
}var bondType = JS.SmilesBond.getBondTypeFromCode (ch);
if (bondType == 65) search.top.needRingMemberships = true;
if (currentAtom == null && bondType != 0) throw  new JS.InvalidSmilesException ("Bond without a previous atom");
switch (bondType) {
case 65537:
case 65538:
if ((len = pattern.length) < (isBondNot ? 3 : 2) || pattern.charAt (len - 1) != '-') {
len = 0;
} else {
if (len == (isBondNot ? 3 : 2)) {
newBond.setAtropType (22);
} else {
JS.SmilesParser.getDigits (pattern, (isBondNot ? 2 : 1), ret);
newBond.setAtropType (ret[0]);
}}search.haveBondStereochemistry = true;
break;
case 1025:
case 1041:
this.bondDirectionPaired = !this.bondDirectionPaired;
search.haveBondStereochemistry = true;
break;
case 17:
break;
case 2:
search.top.nDouble++;
case 1:
if (currentAtom.isAromatic) search.top.needRingData = true;
break;
}
newBond.set2 (bondType, isBondNot);
if (this.isBioSequence && bondSet != null) bondSet.set2 (bondType, isBondNot);
}if (len == -1) throw  new JS.InvalidSmilesException ("invalid bond:" + ch);
return newBond;
}, "JS.SmilesSearch,JS.SmilesBond,~S,JS.SmilesBond,JS.SmilesAtom,~B,~B,~N,~A");
Clazz_defineMethod (c$, "checkLogic", 
 function (search, pattern, atom, bond, currentAtom, isAND, isBranchAtom, ret) {
var pt = pattern.lastIndexOf ("!");
if (atom != null) atom.pattern = pattern;
while (pt > 0) {
if (",;&!".indexOf (pattern.charAt (pt - 1)) < 0) pattern = pattern.substring (0, pt) + "&" + pattern.substring (pt);
pt = pattern.lastIndexOf ("!", pt - 1);
}
pt = pattern.indexOf (',');
var len = pattern.length;
var and = "&";
out : while (true) {
var haveOr = (pt > 0);
if (haveOr && !this.isSmarts || pt == 0) break;
pt = pattern.indexOf (';');
if (pt >= 0) {
if (!this.isSmarts || pt == 0) break;
if (haveOr) {
and = ";";
haveOr = false;
} else {
pattern = pattern.$replace (';', '&');
}}var index = 0;
if (haveOr) {
pattern += ",";
while ((pt = pattern.indexOf (',', index)) > 0 && pt <= len) {
var s = pattern.substring (index, pt);
if (s.length == 0) throw  new JS.InvalidSmilesException ("missing " + (bond == null ? "atom" : "bond") + " token");
if (bond == null) this.parseAtom (search, atom, s, null, null, true, false, isBranchAtom);
 else this.parseBond (search, bond, s, null, currentAtom, false, false, s.length, ret);
index = pt + 1;
}
} else if ((pt = pattern.indexOf (and)) >= 0 || bond != null && len > 1 && !isAND) {
if (pt == 0 || bond == null && !this.isSmarts) break;
if (bond != null && pt < 0) {
if (len > 1) {
var sNew =  new JU.SB ();
for (var i = 0; i < len; ) {
var ch = pattern.charAt (i++);
sNew.appendC (ch);
switch (ch) {
case '!':
if (!this.isSmarts) break out;
continue;
case '^':
case '`':
while ((ch = pattern.charAt (i++)) != '-' && ch != '\0') {
sNew.appendC (ch);
}
sNew.appendC ('-');
break;
}
if (i < len) {
if (!this.isSmarts) break out;
sNew.append (and);
}}
pattern = sNew.toString ();
len = pattern.length;
}}pattern += and;
while ((pt = pattern.indexOf (and, index)) > 0 && pt <= len) {
var s = pattern.substring (index, pt);
if (bond == null) this.parseAtom (search, atom, s, null, null, true, true, isBranchAtom);
 else this.parseBond (search, this.isSmarts ? bond : null, s, this.isSmarts ? null : bond, currentAtom, true, false, s.length, ret);
index = pt + 1;
}
} else {
return false;
}return true;
}
var ch = pattern.charAt (pt);
throw  new JS.InvalidSmilesException ((this.isSmarts ? "invalid placement for '" + ch + "'" : "[" + ch + "] notation only valid with SMARTS, not SMILES,") + " in " + pattern);
}, "JS.SmilesSearch,~S,JS.SmilesAtom,JS.SmilesBond,JS.SmilesAtom,~B,~B,~A");
c$.getSubPattern = Clazz_defineMethod (c$, "getSubPattern", 
function (pattern, index, ch) {
var ch2;
var margin = 1;
switch (ch) {
case '[':
ch2 = ']';
break;
case '"':
case '%':
case '/':
ch2 = ch;
break;
case '(':
ch2 = ')';
break;
default:
ch2 = ch;
margin = 0;
}
var len = pattern.length;
var pCount = 1;
for (var pt = index + 1; pt < len; pt++) {
var ch1 = pattern.charAt (pt);
if (ch1 == ch2) {
pCount--;
if (pCount == 0) return pattern.substring (index + margin, pt + 1 - margin);
} else if (ch1 == ch) {
pCount++;
}}
throw  new JS.InvalidSmilesException ("Unmatched " + ch);
}, "~S,~N,~S");
c$.getChar = Clazz_defineMethod (c$, "getChar", 
function (pattern, i) {
return (i < pattern.length ? pattern.charAt (i) : '\0');
}, "~S,~N");
c$.getDigits = Clazz_defineMethod (c$, "getDigits", 
function (pattern, index, ret) {
var pt = index;
var len = pattern.length;
while (pt < len && JU.PT.isDigit (pattern.charAt (pt))) pt++;

if (pt > index) try {
ret[0] = Integer.parseInt (pattern.substring (index, pt));
return pt;
} catch (e) {
if (Clazz_exceptionOf (e, NumberFormatException)) {
} else {
throw e;
}
}
ret[0] = -2147483648;
return pt;
}, "~S,~N,~A");
c$.skipTo = Clazz_defineMethod (c$, "skipTo", 
 function (pattern, index, ch0) {
var pt = index;
var ch;
while ((ch = JS.SmilesParser.getChar (pattern, ++pt)) != ch0 && ch != '\0') {
}
return (ch == '\0' ? -1 : pt);
}, "~S,~N,~S");
c$.cleanPattern = Clazz_defineMethod (c$, "cleanPattern", 
function (pattern) {
pattern = JU.PT.replaceAllCharacters (pattern, " \t\n\r", "");
pattern = JU.PT.rep (pattern, "^^", "`");
var i = 0;
var i2 = 0;
while ((i = pattern.indexOf ("//*")) >= 0 && (i2 = pattern.indexOf ("*//")) >= i) pattern = pattern.substring (0, i) + pattern.substring (i2 + 3);

pattern = JU.PT.rep (pattern, "//", "");
return pattern;
}, "~S");
c$.extractFlags = Clazz_defineMethod (c$, "extractFlags", 
function (pattern, ret) {
pattern = JS.SmilesParser.cleanPattern (pattern);
var flags = 0;
while (pattern.startsWith ("/")) {
var strFlags = JS.SmilesParser.getSubPattern (pattern, 0, '/').toUpperCase ();
pattern = pattern.substring (strFlags.length + 2);
flags = JS.SmilesSearch.addFlags (flags, strFlags);
}
ret[0] = flags;
return pattern;
}, "~S,~A");
c$.getFlags = Clazz_defineMethod (c$, "getFlags", 
function (pattern) {
var ret =  Clazz_newIntArray (1, 0);
JS.SmilesParser.extractFlags (pattern, ret);
return ret[0];
}, "~S");
});
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.SmilesExt", ["java.lang.Float", "JU.AU", "$.BS", "$.Lst", "$.M4", "$.Measure", "$.P3", "J.api.Interface", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.e = null;
this.sm = null;
Clazz_instantialize (this, arguments);
}, JS, "SmilesExt");
Clazz_makeConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "init", 
function (se) {
this.e = se;
this.sm = this.e.vwr.getSmilesMatcher ();
return this;
}, "~O");
Clazz_defineMethod (c$, "getSmilesCorrelation", 
function (bsA, bsB, smiles, ptsA, ptsB, m4, vReturn, asMap, mapSet, center, bestMap, flags) {
var tolerance = (mapSet == null ? 0.1 : 3.4028235E38);
try {
if (ptsA == null) {
ptsA =  new JU.Lst ();
ptsB =  new JU.Lst ();
}var m =  new JU.M4 ();
var c =  new JU.P3 ();
var atoms = this.e.vwr.ms.at;
var ac = this.e.vwr.ms.ac;
var maps = this.sm.getCorrelationMaps (smiles, atoms, ac, bsA, flags | 8);
if (maps == null) this.e.evalError (this.sm.getLastException (), null);
if (maps.length == 0) return NaN;
var mapFirst = maps[0];
for (var i = 0; i < mapFirst.length; i++) ptsA.addLast (atoms[mapFirst[i]]);

maps = this.sm.getCorrelationMaps (smiles, atoms, ac, bsB, flags);
if (maps == null) this.e.evalError (this.sm.getLastException (), null);
if (maps.length == 0) return NaN;
JU.Logger.info (maps.length + " mappings found");
if (bestMap || !asMap) {
var lowestStdDev = 3.4028235E38;
var mapBest = null;
for (var i = 0; i < maps.length; i++) {
ptsB.clear ();
for (var j = 0; j < maps[i].length; j++) ptsB.addLast (atoms[maps[i][j]]);

J.api.Interface.getInterface ("JU.Eigen", this.e.vwr, "script");
var stddev = (ptsB.size () == 1 ? 0 : JU.Measure.getTransformMatrix4 (ptsA, ptsB, m, null));
JU.Logger.info ("getSmilesCorrelation stddev=" + stddev);
if (vReturn != null) {
if (stddev < tolerance) {
var bs =  new JU.BS ();
for (var j = 0; j < maps[i].length; j++) bs.set (maps[i][j]);

vReturn.addLast (bs);
}}if (stddev < lowestStdDev) {
mapBest = maps[i];
if (m4 != null) m4.setM4 (m);
if (center != null) center.setT (c);
lowestStdDev = stddev;
}}
if (mapSet != null) {
mapSet[0] = mapFirst;
mapSet[1] = mapBest;
}ptsB.clear ();
for (var i = 0; i < mapBest.length; i++) ptsB.addLast (atoms[mapBest[i]]);

return lowestStdDev;
}for (var i = 0; i < maps.length; i++) for (var j = 0; j < maps[i].length; j++) ptsB.addLast (atoms[maps[i][j]]);


} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
this.e.evalError (ex.getMessage (), null);
} else {
throw ex;
}
}
return 0;
}, "JU.BS,JU.BS,~S,JU.Lst,JU.Lst,JU.M4,JU.Lst,~B,~A,JU.P3,~B,~N");
Clazz_defineMethod (c$, "getSmilesMatches", 
function (pattern, smiles, bsSelected, bsMatch3D, flags, asOneBitset, firstMatchOnly) {
if (pattern.length == 0 || pattern.endsWith ("///") || pattern.equals ("H") || pattern.equals ("top") || pattern.equalsIgnoreCase ("NOAROMATIC")) {
try {
return this.e.vwr.getSmilesOpt (bsSelected, 0, 0, flags | (pattern.equals ("H") ? 4096 : 0) | (pattern.equals ("top") ? 8192 : 0) | (pattern.equalsIgnoreCase ("NOAROMATIC") ? 16 : 0), (pattern.endsWith ("///") ? pattern : null));
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
this.e.evalError (ex.getMessage (), null);
} else {
throw ex;
}
}
}var b;
if (bsMatch3D == null) {
var isSmarts = ((flags & 2) == 2);
var isOK = true;
try {
if (smiles == null) {
b = this.e.vwr.getSubstructureSetArray (pattern, bsSelected, flags);
} else if (pattern.equals ("chirality")) {
return this.e.vwr.calculateChiralityForSmiles (smiles);
} else {
var map = this.sm.find (pattern, smiles, (isSmarts ? 2 : 1) | (firstMatchOnly ? 8 : 0));
if (!asOneBitset) return (!firstMatchOnly ? map : map.length == 0 ?  Clazz_newIntArray (0, 0) : map[0]);
var bs =  new JU.BS ();
for (var j = 0; j < map.length; j++) {
var a = map[j];
for (var k = a.length; --k >= 0; ) if (a[k] >= 0) bs.set (a[k]);

}
if (!isSmarts) return  Clazz_newIntArray (bs.cardinality (), 0);
var iarray =  Clazz_newIntArray (bs.cardinality (), 0);
var pt = 0;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) iarray[pt++] = i;

return iarray;
}} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
this.e.evalError (ex.getMessage (), null);
return null;
} else {
throw ex;
}
}
} else {
var vReturn =  new JU.Lst ();
var stddev = this.getSmilesCorrelation (bsMatch3D, bsSelected, pattern, null, null, null, vReturn, false, null, null, false, flags);
if (Float.isNaN (stddev)) return (asOneBitset ?  new JU.BS () :  Clazz_newArray (-1, []));
this.e.showString ("RMSD " + stddev + " Angstroms");
b = vReturn.toArray ( new Array (vReturn.size ()));
}if (asOneBitset) {
var bs =  new JU.BS ();
for (var j = 0; j < b.length; j++) bs.or (b[j]);

return bs;
}var list =  new JU.Lst ();
for (var j = 0; j < b.length; j++) list.addLast (b[j]);

return list;
}, "~S,~S,JU.BS,JU.BS,~N,~B,~B");
Clazz_defineMethod (c$, "getFlexFitList", 
function (bs1, bs2, smiles1, isSmarts) {
var mapSet = JU.AU.newInt2 (2);
this.getSmilesCorrelation (bs1, bs2, smiles1, null, null, null, null, false, mapSet, null, false, isSmarts ? 2 : 1);
if (mapSet[0] == null) return null;
var bondMap1 = this.e.vwr.ms.getDihedralMap (mapSet[0]);
var bondMap2 = (bondMap1 == null ? null : this.e.vwr.ms.getDihedralMap (mapSet[1]));
if (bondMap2 == null || bondMap2.length != bondMap1.length) return null;
var angles =  Clazz_newFloatArray (bondMap1.length, 3, 0);
var atoms = this.e.vwr.ms.at;
JS.SmilesExt.getTorsions (atoms, bondMap2, angles, 0);
JS.SmilesExt.getTorsions (atoms, bondMap1, angles, 1);
var data =  Clazz_newFloatArray (bondMap1.length * 6, 0);
for (var i = 0, pt = 0; i < bondMap1.length; i++) {
var map = bondMap1[i];
data[pt++] = map[0];
data[pt++] = map[1];
data[pt++] = map[2];
data[pt++] = map[3];
data[pt++] = angles[i][0];
data[pt++] = angles[i][1];
}
return data;
}, "JU.BS,JU.BS,~S,~B");
c$.getTorsions = Clazz_defineMethod (c$, "getTorsions", 
 function (atoms, bondMap, diff, pt) {
for (var i = bondMap.length; --i >= 0; ) {
var map = bondMap[i];
var v = JU.Measure.computeTorsion (atoms[map[0]], atoms[map[1]], atoms[map[2]], atoms[map[3]], true);
if (pt == 1) {
if (v - diff[i][0] > 180) v -= 360;
 else if (v - diff[i][0] <= -180) v += 360;
}diff[i][pt] = v;
}
}, "~A,~A,~A,~N");
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
