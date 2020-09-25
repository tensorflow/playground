Clazz.declarePackage ("JS");
Clazz.load (["J.api.SmilesMatcherInterface"], "JS.SmilesMatcher", ["JU.AU", "$.BS", "$.PT", "JS.InvalidSmilesException", "$.SmilesAtom", "$.SmilesBond", "$.SmilesGenerator", "$.SmilesParser", "$.SmilesSearch", "JU.BSUtil", "$.Elements", "$.Logger", "$.Node", "$.Point3fi"], function () {
c$ = Clazz.declareType (JS, "SmilesMatcher", null, J.api.SmilesMatcherInterface);
Clazz.overrideMethod (c$, "getLastException", 
function () {
return JS.InvalidSmilesException.getLastError ();
});
Clazz.overrideMethod (c$, "getMolecularFormula", 
function (pattern, isSmarts) {
JS.InvalidSmilesException.clear ();
var search = JS.SmilesParser.newSearch ("/nostereo/" + pattern, isSmarts, true);
search.createTopoMap (null);
search.nodes = search.targetAtoms;
return search.getMolecularFormula (!isSmarts, null, false);
}, "~S,~B");
Clazz.overrideMethod (c$, "getSmiles", 
function (atoms, ac, bsSelected, bioComment, flags) {
JS.InvalidSmilesException.clear ();
return ( new JS.SmilesGenerator ()).getSmiles (this, atoms, ac, bsSelected, bioComment, flags);
}, "~A,~N,JU.BS,~S,~N");
Clazz.overrideMethod (c$, "areEqual", 
function (smiles1, smiles2) {
JS.InvalidSmilesException.clear ();
var result = this.findPriv (smiles1, JS.SmilesParser.newSearch (smiles2, false, true), (smiles1.indexOf ("*") >= 0 ? 2 : 1) | 8, 2);
return (result == null ? -1 : result.length);
}, "~S,~S");
Clazz.defineMethod (c$, "areEqualTest", 
function (smiles, search) {
var ret = this.findPriv (smiles, search, 9, 2);
return (ret != null && ret.length == 1);
}, "~S,JS.SmilesSearch");
Clazz.overrideMethod (c$, "find", 
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
Clazz.overrideMethod (c$, "getAtoms", 
function (target) {
JS.InvalidSmilesException.clear ();
target = JS.SmilesParser.cleanPattern (target);
var search = JS.SmilesParser.newSearch (target, false, true);
search.createTopoMap ( new JU.BS ());
return search.targetAtoms;
}, "~S");
Clazz.overrideMethod (c$, "getRelationship", 
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
Clazz.overrideMethod (c$, "reverseChirality", 
function (smiles) {
smiles = JU.PT.rep (smiles, "@@", "!@");
smiles = JU.PT.rep (smiles, "@", "@@");
smiles = JU.PT.rep (smiles, "!@@", "@");
return smiles;
}, "~S");
Clazz.overrideMethod (c$, "getSubstructureSet", 
function (pattern, atoms, ac, bsSelected, flags) {
return this.matchPriv (pattern, atoms, ac, bsSelected, null, true, flags | JS.SmilesParser.getFlags (pattern), 1);
}, "~S,~A,~N,JU.BS,~N");
Clazz.overrideMethod (c$, "getMMFF94AtomTypes", 
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
Clazz.overrideMethod (c$, "getSubstructureSetArray", 
function (pattern, atoms, ac, bsSelected, bsAromatic, flags) {
return this.matchPriv (pattern, atoms, ac, bsSelected, bsAromatic, true, flags, 2);
}, "~S,~A,~N,JU.BS,JU.BS,~N");
Clazz.defineMethod (c$, "getAtropisomerKeys", 
function (pattern, atoms, ac, bsSelected, bsAromatic, flags) {
return this.matchPriv (pattern, atoms, ac, bsSelected, bsAromatic, false, flags, 4);
}, "~S,~A,~N,JU.BS,JU.BS,~N");
Clazz.overrideMethod (c$, "polyhedronToSmiles", 
function (center, faces, atomCount, points, flags, details) {
var atoms =  new Array (atomCount);
for (var i = 0; i < atomCount; i++) {
atoms[i] =  new JS.SmilesAtom ();
var pt = (points == null ? null : points[i]);
if (Clazz.instanceOf (pt, JU.Node)) {
atoms[i].elementNumber = (pt).getElementNumber ();
atoms[i].bioAtomName = (pt).getAtomName ();
atoms[i].atomNumber = (pt).getAtomNumber ();
atoms[i].setT (pt);
} else {
atoms[i].elementNumber = (Clazz.instanceOf (pt, JU.Point3fi) ? (pt).sD : -2);
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
Clazz.overrideMethod (c$, "getCorrelationMaps", 
function (pattern, atoms, atomCount, bsSelected, flags) {
return this.matchPriv (pattern, atoms, atomCount, bsSelected, null, true, flags, 3);
}, "~S,~A,~N,JU.BS,~N");
Clazz.defineMethod (c$, "findPriv", 
 function (pattern, search, flags, mode) {
var bsAromatic =  new JU.BS ();
search.setFlags (search.flags | JS.SmilesParser.getFlags (pattern));
search.createTopoMap (bsAromatic);
return this.matchPriv (pattern, search.targetAtoms, -search.targetAtoms.length, null, bsAromatic, bsAromatic.isEmpty (), flags, mode);
}, "~S,JS.SmilesSearch,~N,~N");
Clazz.defineMethod (c$, "matchPriv", 
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
var is3D = !(Clazz.instanceOf (atoms[0], JS.SmilesAtom));
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
if (Clazz.exceptionOf (e, Exception)) {
if (JU.Logger.debugging) e.printStackTrace ();
if (JS.InvalidSmilesException.getLastError () == null) JS.InvalidSmilesException.clear ();
throw  new JS.InvalidSmilesException (JS.InvalidSmilesException.getLastError ());
} else {
throw e;
}
}
return null;
}, "~S,~A,~N,JU.BS,JU.BS,~B,~N,~N");
Clazz.overrideMethod (c$, "cleanSmiles", 
function (smiles) {
return JS.SmilesParser.cleanPattern (smiles);
}, "~S");
Clazz.overrideMethod (c$, "getMapForJME", 
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
return  Clazz.newArray (-1, [map[0], map2[0]]);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
return null;
}, "~S,~A,JU.BS");
Clazz.defineStatics (c$,
"MODE_BITSET", 0x01,
"MODE_ARRAY", 0x02,
"MODE_MAP", 0x03,
"MODE_ATROP", 0x04);
});
