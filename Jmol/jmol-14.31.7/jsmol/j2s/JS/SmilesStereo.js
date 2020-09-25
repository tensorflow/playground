Clazz.declarePackage ("JS");
Clazz.load (null, "JS.SmilesStereo", ["java.lang.Float", "java.util.Arrays", "JU.AU", "$.Measure", "$.PT", "$.T3", "$.V3", "JS.InvalidSmilesException", "$.PolyhedronStereoSorter", "$.SmilesAtom", "$.SmilesParser", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.chiralClass = -2147483648;
this.chiralOrder = -2147483648;
this.atomCount = 0;
this.details = null;
this.search = null;
this.jmolAtoms = null;
this.directives = null;
this.v = null;
this.polyhedralOrders = null;
this.isNot = false;
this.sorter = null;
Clazz.instantialize (this, arguments);
}, JS, "SmilesStereo");
c$.getChiralityClass = Clazz.defineMethod (c$, "getChiralityClass", 
 function (xx) {
return Clazz.doubleToInt (("0;PH;AL;TP;TH;TB;OH;SP;TS;SS;".indexOf (xx) + 1) / 3);
}, "~S");
c$.newStereo = Clazz.defineMethod (c$, "newStereo", 
function (search) {
var stereo =  new JS.SmilesStereo (0, 0, 0, null, null);
stereo.search = search;
return stereo;
}, "JS.SmilesSearch");
Clazz.makeConstructor (c$, 
function (chiralClass, chiralOrder, atomCount, details, directives) {
this.chiralClass = chiralClass;
this.chiralOrder = chiralOrder;
this.atomCount = atomCount;
this.details = details;
this.directives = directives;
if (chiralClass == 1) this.getPolyhedralOrders ();
}, "~N,~N,~N,~S,~S");
Clazz.defineMethod (c$, "getChiralClass", 
function (sAtom) {
if (this.chiralClass == 0) this.setChiralClass (sAtom);
return this.chiralClass;
}, "JS.SmilesAtom");
Clazz.defineMethod (c$, "setChiralClass", 
 function (sAtom) {
var nBonds = Math.max (sAtom.explicitHydrogenCount, 0) + sAtom.getBondCount ();
if (this.chiralClass == 0) {
switch (nBonds) {
case 2:
this.chiralClass = 2;
break;
case 3:
this.chiralClass = 3;
break;
case 4:
case 5:
case 6:
this.chiralClass = nBonds;
break;
}
}return nBonds;
}, "JS.SmilesAtom");
Clazz.defineMethod (c$, "fixStereo", 
function (sAtom) {
var nBonds = this.setChiralClass (sAtom);
var nH = Math.max (sAtom.explicitHydrogenCount, 0);
if (nH <= 1) switch (this.chiralClass) {
case 2:
if (nBonds != 2) sAtom.stereo = null;
break;
case 3:
case 8:
if (nBonds != 3) sAtom.stereo = null;
break;
case 7:
case 4:
if (nBonds != 4) sAtom.stereo = null;
break;
case 9:
case 6:
case 5:
if (nBonds != (this.chiralClass == 9 ? 4 : this.chiralClass) || !this.normalizeClass (sAtom)) sAtom.stereo = null;
break;
case 1:
if (nBonds != 0 && nBonds != this.atomCount) sAtom.stereo = null;
break;
default:
sAtom.stereo = null;
}
if (sAtom.stereo == null) throw  new JS.InvalidSmilesException ("Incorrect number of bonds for stereochemistry descriptor");
}, "JS.SmilesAtom");
Clazz.defineMethod (c$, "normalizeClass", 
 function (atom) {
try {
var bonds = atom.bonds;
if (this.chiralOrder < 3) return true;
var pt = (this.chiralOrder - 1) * 3;
var perm;
var ilast;
switch (this.chiralClass) {
case 9:
perm = JS.SmilesStereo.PERM_SS;
ilast = 3;
break;
case 5:
perm = JS.SmilesStereo.PERM_TB;
ilast = 4;
break;
case 6:
perm = JS.SmilesStereo.PERM_OCT;
ilast = 5;
break;
default:
return true;
}
if (this.chiralOrder > perm.length) return false;
var a = perm[pt];
var z = perm[pt + 2];
var p = Math.abs (perm[pt + 1]);
var isAtAt = (perm[pt + 1] < 0);
var b;
if (a != 0) {
b = bonds[a];
for (var i = a; i > 0; --i) bonds[i] = bonds[i - 1];

bonds[0] = b;
}if (z != ilast) {
b = bonds[z];
for (var i = z; i < ilast; i++) bonds[i] = bonds[i + 1];

bonds[ilast] = b;
}switch (p) {
case 1:
break;
default:
b = bonds[p + 1];
bonds[p + 1] = bonds[p];
bonds[p] = b;
}
this.chiralOrder = (isAtAt ? 2 : 1);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
return true;
}, "JS.SmilesAtom");
Clazz.defineMethod (c$, "setTopoCoordinates", 
function (atom, sAtom, sAtom2, cAtoms) {
var chClass = atom.stereo.chiralClass;
var chiralOrder = atom.stereo.chiralOrder;
atom.set (0, 0, 0);
var map;
if (this.jmolAtoms == null) {
map =  Clazz.newIntArray (-1, [0, 1, 2, 3]);
} else {
atom = this.jmolAtoms[sAtom.getMatchingAtomIndex ()];
atom.set (0, 0, 0);
var a2 = (chClass == 2 ? this.jmolAtoms[sAtom2.getMatchingAtomIndex ()] : null);
map = this.getMappedTopoAtoms (atom, a2, cAtoms);
}var pt;
switch (chClass) {
case 1:
break;
case 2:
case 4:
if (chiralOrder == 2) {
pt = map[0];
map[0] = map[1];
map[1] = pt;
}cAtoms[map[0]].set (0, 0, 1);
cAtoms[map[1]].set (1, 0, -1);
cAtoms[map[2]].set (0, 1, -1);
cAtoms[map[3]].set (-1, -1, -1);
break;
case 7:
switch (chiralOrder) {
case 1:
cAtoms[map[0]].set (1, 0, 0);
cAtoms[map[1]].set (0, 1, 0);
cAtoms[map[2]].set (-1, 0, 0);
cAtoms[map[3]].set (0, -1, 0);
break;
case 2:
cAtoms[map[0]].set (1, 0, 0);
cAtoms[map[1]].set (-1, 0, 0);
cAtoms[map[2]].set (0, 1, 0);
cAtoms[map[3]].set (0, -1, 0);
break;
case 3:
cAtoms[map[0]].set (1, 0, 0);
cAtoms[map[1]].set (0, 1, 0);
cAtoms[map[2]].set (0, -1, 0);
cAtoms[map[3]].set (-1, 0, 0);
break;
}
break;
case 8:
switch (chiralOrder) {
case 1:
break;
case 2:
pt = map[2];
map[2] = map[1];
map[1] = pt;
break;
case 3:
pt = map[0];
map[0] = map[1];
map[1] = pt;
break;
}
cAtoms[map[0]].set (0, 0, -1);
cAtoms[map[1]].set (0, 1, 0);
cAtoms[map[2]].set (0, 0, 1);
break;
case 9:
if (chiralOrder == 2) {
pt = map[0];
map[0] = map[3];
map[3] = pt;
}cAtoms[map[0]].set (0, 0, 1);
cAtoms[map[1]].set (0, 1, 0);
cAtoms[map[1]].set (1, 1, 0);
cAtoms[map[2]].set (0, 0, -1);
break;
case 5:
case 6:
var n = map.length;
if (chiralOrder == 2) {
pt = map[0];
map[0] = map[n - 1];
map[n - 1] = pt;
}cAtoms[map[0]].set (0, 0, 1);
cAtoms[map[n - 1]].set (0, 0, -1);
cAtoms[map[1]].set (1, 0, 0);
cAtoms[map[2]].set (0, 1, 0);
cAtoms[map[3]].set (-1, 0, 0);
if (n == 6) cAtoms[map[4]].set (0, -1, 0);
break;
default:
return false;
}
return true;
}, "JS.SmilesAtom,JS.SmilesAtom,JS.SmilesAtom,~A");
Clazz.defineMethod (c$, "getMappedTopoAtoms", 
 function (atom, a2, cAtoms) {
var map =  Clazz.newIntArray (cAtoms[4] == null ? 4 : cAtoms[5] == null ? 5 : 6, 0);
for (var i = 0; i < map.length; i++) {
map[i] = (cAtoms[i] == null ? 10004 + i * 10000 : cAtoms[i].getIndex ());
}
var bonds = atom.bonds;
var b2 = (a2 == null ? null : a2.getEdges ());
for (var i = 0; i < map.length; i++) {
var c = cAtoms[i];
if (!JS.SmilesStereo.getTopoMapPt (map, i, atom, c, bonds, 10000)) JS.SmilesStereo.getTopoMapPt (map, i, a2, c, b2, 30000);
}
java.util.Arrays.sort (map);
for (var i = 0; i < map.length; i++) {
map[i] = map[i] % 10;
}
return map;
}, "JS.SmilesAtom,JS.SmilesAtom,~A");
c$.getTopoMapPt = Clazz.defineMethod (c$, "getTopoMapPt", 
 function (map, i, atom, cAtom, bonds, n000) {
if (cAtom.index == -2147483648) {
map[i] = (bonds[0].isFromPreviousTo (atom) ? 100 : 0) + n000 + i;
return true;
}var n = bonds.length;
for (var k = 0; k < n; k++) {
var bAtom = bonds[k].getOtherNode (atom);
if (bAtom === cAtom) {
map[i] = (k + 1) * 10 + n000 + i;
return true;
}}
return false;
}, "~A,~N,JS.SmilesAtom,JS.SmilesAtom,~A,~N");
Clazz.defineMethod (c$, "getJmolAtom", 
 function (i) {
return (i < 0 || i >= this.jmolAtoms.length ? null : this.jmolAtoms[i]);
}, "~N");
Clazz.defineMethod (c$, "sortBondsByStereo", 
function (atom, atomPrev, ref, bonds, vTemp) {
if (bonds.length < 2 || !(Clazz.instanceOf (atom, JU.T3))) return;
if (atomPrev == null) atomPrev = bonds[0].getOtherNode (atom);
var aTemp =  Clazz.newArray (bonds.length, 0, null);
if (this.sorter == null) this.sorter =  new JS.PolyhedronStereoSorter ();
vTemp.sub2 (atomPrev, ref);
this.sorter.setRef (vTemp);
for (var i = bonds.length; --i >= 0; ) {
var a = bonds[i].getOtherNode (atom);
var f = (a === atomPrev ? 0 : this.sorter.isAligned (a, ref, atomPrev) ? -999 : JU.Measure.computeTorsion (atom, atomPrev, ref, a, true));
if (bonds.length > 2) f += 360;
aTemp[i] =  Clazz.newArray (-1, [bonds[i], Float.$valueOf (f), a]);
}
java.util.Arrays.sort (aTemp, this.sorter);
if (JU.Logger.debugging) JU.Logger.info (JU.Escape.e (aTemp));
for (var i = bonds.length; --i >= 0; ) bonds[i] = aTemp[i][0];

}, "JU.SimpleNode,JU.SimpleNode,JU.T3,~A,JU.V3");
Clazz.defineMethod (c$, "checkStereoChemistry", 
function (search, v) {
this.v = v;
this.search = search;
this.jmolAtoms = search.targetAtoms;
var haveTopo = search.haveTopo;
var invertStereochemistry = search.invertStereochemistry;
if (JU.Logger.debugging) JU.Logger.debug ("checking stereochemistry...");
for (var i = 0; i < search.ac; i++) {
var pAtom = search.patternAtoms[i];
if (pAtom.stereo == null) continue;
var isNot = (pAtom.not != invertStereochemistry);
var atom0 = pAtom.getMatchingAtom ();
switch (this.checkStereoForAtom (pAtom, atom0, isNot, haveTopo)) {
case 0:
continue;
case 1:
return true;
case -1:
return false;
}
}
return true;
}, "JS.SmilesSearch,JS.VTemp");
Clazz.defineMethod (c$, "checkStereoForAtom", 
function (pAtom, atom0, isNot, haveTopo) {
var atom1 = null;
var atom2 = null;
var atom3 = null;
var atom4 = null;
var atom5 = null;
var atom6 = null;
var pAtom2 = null;
var sAtom0 = null;
var jn;
if (haveTopo) sAtom0 = atom0;
var nH = Math.max (pAtom.explicitHydrogenCount, 0);
var order = pAtom.stereo.chiralOrder;
var chiralClass = pAtom.stereo.chiralClass;
if (haveTopo && sAtom0.getChiralClass () != chiralClass) return -1;
if (JU.Logger.debugging) JU.Logger.debug ("...type " + chiralClass + " for pattern atom \n " + pAtom + "\n " + atom0);
switch (chiralClass) {
case 1:
if (pAtom.stereo.isNot) isNot = !isNot;
if (nH > 1 || pAtom.bondCount == 0) return 0;
if (haveTopo) {
return 0;
}var bonds = pAtom.bonds;
var jHpt = -1;
if (nH == 1) {
jHpt = (pAtom.isFirst ? 0 : 1);
if (pAtom.getBondCount () != 3) return -1;
this.v.vA.set (0, 0, 0);
for (var j = 0; j < 3; j++) this.v.vA.add (bonds[j].getOtherAtom (sAtom0).getMatchingAtom ());

this.v.vA.scale (0.3333);
this.v.vA.sub2 (atom0, this.v.vA);
this.v.vA.add (atom0);
}var po = pAtom.stereo.polyhedralOrders;
var pt;
for (var j = po.length; --j >= 0; ) {
var orders = po[j];
if (orders == null || orders.length < 2) continue;
pt = (j > jHpt ? j - nH : j);
var ta1 = (j == jHpt ? this.v.vA : bonds[pt].getOtherAtom (pAtom).getMatchingAtom ());
var flast = (isNot ? 3.4028235E38 : 0);
var ta2 = null;
for (var k = 0; k < orders.length; k++) {
pt = orders[k];
var ta3;
if (pt == jHpt) {
ta3 = this.v.vA;
} else {
if (pt > jHpt) pt--;
ta3 = bonds[pt].getOtherAtom (pAtom).getMatchingAtom ();
}if (k == 0) {
ta2 = ta3;
continue;
}var f = JU.Measure.computeTorsion (ta3, ta1, atom0, ta2, true);
if (Float.isNaN (f)) f = 180;
if (orders.length == 2) return ((f < 0) != isNot ? 1 : -1);
if (f < 0) f += 360;
if ((f < flast) != isNot) return -1;
flast = f;
}
}
return 0;
case 2:
jn = this.getAlleneAtoms (pAtom, null);
if (jn == null) return 0;
if (haveTopo && !this.setTopoCoordinates (sAtom0, pAtom, pAtom2, jn)) return -1;
if (!JS.SmilesStereo.checkStereochemistryAll (isNot, atom0, chiralClass, order, jn[0], jn[1], jn[2], jn[3], null, null, this.v)) return -1;
return 0;
case 8:
case 9:
case 3:
case 4:
case 7:
case 5:
case 6:
atom1 = this.getJmolAtom (pAtom.getMatchingBondedAtom (0));
switch (nH) {
case 0:
atom2 = this.getJmolAtom (pAtom.getMatchingBondedAtom (1));
break;
case 1:
atom2 = this.search.findImplicitHydrogen (pAtom.getMatchingAtom ());
if (pAtom.isFirst) {
var a = atom2;
atom2 = atom1;
atom1 = a;
}break;
default:
return 0;
}
atom3 = this.getJmolAtom (pAtom.getMatchingBondedAtom (2 - nH));
atom4 = this.getJmolAtom (pAtom.getMatchingBondedAtom (3 - nH));
atom5 = this.getJmolAtom (pAtom.getMatchingBondedAtom (4 - nH));
atom6 = this.getJmolAtom (pAtom.getMatchingBondedAtom (5 - nH));
if (haveTopo && !this.setTopoCoordinates (sAtom0, pAtom, null,  Clazz.newArray (-1, [atom1, atom2, atom3, atom4, atom5, atom6]))) return -1;
if (!JS.SmilesStereo.checkStereochemistryAll (isNot, atom0, chiralClass, order, atom1, atom2, atom3, atom4, atom5, atom6, this.v)) return -1;
return 0;
}
return 0;
}, "JS.SmilesAtom,JU.Node,~B,~B");
Clazz.defineMethod (c$, "getAlleneAtoms", 
function (pAtom, pAtom1) {
if (pAtom1 == null) pAtom1 = pAtom.getBond (0).getOtherAtom (pAtom);
var pAtom2 = pAtom.getBond (1).getOtherAtom (pAtom);
if (pAtom2 === pAtom1) pAtom2 = pAtom.getBond (0).getOtherAtom (pAtom);
if (pAtom1 == null || pAtom2 == null) return null;
var pAtom1a = pAtom;
var pAtom2a = pAtom;
while (pAtom1.getBondCount () == 2 && pAtom2.getBondCount () == 2 && pAtom1.getValence () == 4 && pAtom2.getValence () == 4) {
var b = pAtom1.getBondNotTo (pAtom1a, true);
pAtom1a = pAtom1;
pAtom1 = b.getOtherAtom (pAtom1);
b = pAtom2.getBondNotTo (pAtom2a, true);
pAtom2a = pAtom2;
pAtom2 = b.getOtherAtom (pAtom2);
}
pAtom = pAtom1;
var jn =  new Array (6);
jn[4] =  new JS.SmilesAtom ().setIndex (60004);
var nBonds = pAtom.getBondCount ();
if (nBonds != 2 && nBonds != 3) return null;
for (var k = 0, p = 0; k < nBonds; k++) {
var b = pAtom.bonds[k];
pAtom1 = b.getOtherAtom (pAtom);
if (b.getMatchingBond ().getCovalentOrder () == 2) {
if (pAtom2 == null) pAtom2 = pAtom1;
continue;
}if ((b.atom1 === pAtom1) && (!b.isConnection || pAtom1.index > pAtom.index)) {
p = 0;
} else if (jn[1] == null) {
p = 1;
} else {
jn[0] = jn[p = 1];
}jn[p] = pAtom1.getMatchingAtom ();
}
if (pAtom2 == null) return null;
nBonds = pAtom2.getBondCount ();
if (nBonds != 2 && nBonds != 3) return null;
for (var p = 0, k = 0; k < nBonds; k++) {
var b = pAtom2.bonds[k];
pAtom1 = b.getOtherAtom (pAtom2);
if (b.getMatchingBond ().getCovalentOrder () == 2) {
continue;
}if ((b.atom1 === pAtom1) && (!b.isConnection || pAtom1.index > pAtom2.index)) {
p = 2;
} else if (jn[3] == null) {
p = 3;
} else {
jn[2] = jn[p = 3];
}jn[p] = pAtom1.getMatchingAtom ();
}
for (var k = 0; k < 4; k++) if (jn[k] == null) this.addAlleneLonePair (k < 2 ? pAtom : pAtom2, jn, k);

return jn;
}, "JS.SmilesAtom,JS.SmilesAtom");
Clazz.defineMethod (c$, "addAlleneLonePair", 
 function (pAtom, jn, k) {
var atom = pAtom.getMatchingAtom ();
jn[k] = this.search.findImplicitHydrogen (atom);
if (jn[k] != null) return;
var v =  new JU.V3 ();
for (var i = 0; i < 4; i++) if (jn[i] != null) v.sub (jn[i]);

if (v.length () == 0) {
v.setT ((jn[4]));
} else {
v.scaleAdd2 (2, pAtom.getMatchingAtom (), v);
}jn[k] =  new JS.SmilesAtom ().setIndex (-2147483648);
(jn[k]).setT (v);
}, "JS.SmilesAtom,~A,~N");
c$.getStereoFlag = Clazz.defineMethod (c$, "getStereoFlag", 
function (atom0, atoms, nAtoms, v) {
var atom1 = atoms[0];
var atom2 = atoms[1];
var atom3 = atoms[2];
var atom4 = atoms[3];
var atom5 = atoms[4];
var atom6 = atoms[5];
var chiralClass = 4;
switch (nAtoms) {
default:
case 5:
case 6:
return (JS.SmilesStereo.checkStereochemistryAll (false, atom0, chiralClass, 1, atom1, atom2, atom3, atom4, atom5, atom6, v) ? "@" : "@@");
case 2:
case 4:
if (atom3 == null || atom4 == null) return "";
var d = JU.Measure.getNormalThroughPoints (atom1, atom2, atom3, v.vTemp, v.vA);
if (Math.abs (JU.Measure.distanceToPlaneV (v.vTemp, d, atom4)) < 0.2) {
chiralClass = 7;
if (JS.SmilesStereo.checkStereochemistryAll (false, atom0, chiralClass, 1, atom1, atom2, atom3, atom4, atom5, atom6, v)) return "@SP1";
if (JS.SmilesStereo.checkStereochemistryAll (false, atom0, chiralClass, 2, atom1, atom2, atom3, atom4, atom5, atom6, v)) return "@SP2";
if (JS.SmilesStereo.checkStereochemistryAll (false, atom0, chiralClass, 3, atom1, atom2, atom3, atom4, atom5, atom6, v)) return "@SP3";
} else {
return (JS.SmilesStereo.checkStereochemistryAll (false, atom0, chiralClass, 1, atom1, atom2, atom3, atom4, atom5, atom6, v) ? "@" : "@@");
}}
return "";
}, "JU.SimpleNode,~A,~N,JS.VTemp");
c$.checkStereochemistryAll = Clazz.defineMethod (c$, "checkStereochemistryAll", 
 function (isNot, atom0, chiralClass, order, atom1, atom2, atom3, atom4, atom5, atom6, v) {
switch (chiralClass) {
default:
return true;
case 2:
case 4:
return (isNot == (JS.SmilesStereo.getHandedness (atom2, atom3, atom4, atom1, v) != order));
case 7:
JS.SmilesStereo.getPlaneNormals (atom1, atom2, atom3, atom4, v);
return (v.vNorm2.dot (v.vNorm3) < 0 ? isNot == (order != 3) : v.vNorm3.dot (v.vNorm4) < 0 ? isNot == (order != 2) : isNot == (order != 1));
case 3:
return (isNot == (JS.SmilesStereo.getHandedness (atom1, atom2, atom3, atom0, v) != order));
case 5:
if (!JS.SmilesStereo.isDiaxial (atom0, atom0, atom5, atom1, v, -0.95)) return false;
return (isNot == (JS.SmilesStereo.getHandedness (atom2, atom3, atom4, atom1, v) != order));
case 8:
switch (order) {
case 1:
break;
case 2:
atom3 = atom2;
break;
case 3:
atom1 = atom2;
break;
}
return (isNot == !JS.SmilesStereo.isDiaxial (atom0, atom0, atom1, atom3, v, -0.95));
case 9:
if (!JS.SmilesStereo.isDiaxial (atom0, atom0, atom4, atom1, v, -0.95)) return false;
return (isNot == (JS.SmilesStereo.getHandedness (atom2, atom3, atom4, atom1, v) != order));
case 6:
if (!JS.SmilesStereo.isDiaxial (atom0, atom0, atom6, atom1, v, -0.95) || !JS.SmilesStereo.isDiaxial (atom0, atom0, atom2, atom4, v, -0.95) || !JS.SmilesStereo.isDiaxial (atom0, atom0, atom3, atom5, v, -0.95)) return false;
JS.SmilesStereo.getPlaneNormals (atom2, atom3, atom4, atom5, v);
if (v.vNorm2.dot (v.vNorm3) < 0 || v.vNorm3.dot (v.vNorm4) < 0) return false;
v.vNorm3.sub2 (atom0, atom1);
return (isNot == ((v.vNorm2.dot (v.vNorm3) < 0 ? 2 : 1) == order));
case 1:
return true;
}
}, "~B,JU.SimpleNode,~N,~N,JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JS.VTemp");
c$.isDiaxial = Clazz.defineMethod (c$, "isDiaxial", 
function (atomA, atomB, atom1, atom2, v, f) {
v.vA.sub2 (atomA, atom1);
v.vB.sub2 (atomB, atom2);
v.vA.normalize ();
v.vB.normalize ();
return (v.vA.dot (v.vB) < f);
}, "JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JS.VTemp,~N");
c$.getHandedness = Clazz.defineMethod (c$, "getHandedness", 
function (a, b, c, pt, v) {
var d = JU.Measure.getNormalThroughPoints (a, b, c, v.vTemp, v.vA);
d = JU.Measure.distanceToPlaneV (v.vTemp, d, pt);
return (d > 0 ? 1 : 2);
}, "JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JS.VTemp");
c$.getPlaneNormals = Clazz.defineMethod (c$, "getPlaneNormals", 
 function (atom1, atom2, atom3, atom4, v) {
JU.Measure.getNormalThroughPoints (atom1, atom2, atom3, v.vNorm2, v.vTemp1);
JU.Measure.getNormalThroughPoints (atom2, atom3, atom4, v.vNorm3, v.vTemp1);
JU.Measure.getNormalThroughPoints (atom3, atom4, atom1, v.vNorm4, v.vTemp1);
}, "JU.P3,JU.P3,JU.P3,JU.P3,JS.VTemp");
c$.checkChirality = Clazz.defineMethod (c$, "checkChirality", 
function (search, pattern, index, newAtom) {
var stereoClass = 0;
var order = -2147483648;
var len = pattern.length;
var details = null;
var directives = null;
var atomCount = 0;
var ch;
stereoClass = 0;
order = 1;
var isPoly = false;
if (++index < len) {
switch (ch = pattern.charAt (index)) {
case '@':
order = 2;
index++;
break;
case '+':
case '-':
case 'H':
break;
case 'P':
isPoly = true;
case 'A':
case 'O':
case 'S':
case 'T':
stereoClass = (index + 1 < len ? JS.SmilesStereo.getChiralityClass (pattern.substring (index, index + 2)) : -1);
index += 2;
break;
default:
order = (JU.PT.isDigit (ch) ? 1 : -1);
}
var pt = index;
if (order == 1 || isPoly) {
while (pt < len && JU.PT.isDigit (pattern.charAt (pt))) pt++;

if (pt > index) {
try {
var n = Integer.parseInt (pattern.substring (index, pt));
if (isPoly) {
atomCount = n;
if (pt < len && pattern.charAt (pt) == '(') {
details = JS.SmilesParser.getSubPattern (pattern, pt, '(');
pt += details.length + 2;
}if (pt < len && pattern.charAt (pt) == '/') {
directives = JS.SmilesParser.getSubPattern (pattern, pt, '/');
pt += directives.length + 2;
}} else {
order = n;
}} catch (e) {
if (Clazz.exceptionOf (e, NumberFormatException)) {
order = -1;
} else {
throw e;
}
}
index = pt;
}}if (order < 1 || stereoClass < 0) throw  new JS.InvalidSmilesException ("Invalid stereochemistry descriptor");
}newAtom.stereo =  new JS.SmilesStereo (stereoClass, order, atomCount, details, directives);
newAtom.stereo.search = search;
if (JS.SmilesParser.getChar (pattern, index) == '?') {
JU.Logger.info ("Ignoring '?' in stereochemistry");
index++;
}return index;
}, "JS.SmilesSearch,~S,~N,JS.SmilesAtom");
Clazz.defineMethod (c$, "getPolyhedralOrders", 
 function () {
var po = this.polyhedralOrders = JU.AU.newInt2 (this.atomCount);
if (this.details == null) return;
var temp =  Clazz.newIntArray (this.details.length, 0);
var ret =  Clazz.newIntArray (1, 0);
var msg = null;
var pt = 0;
var s = this.details + "/";
var n = 0;
var len = s.length;
var index = 0;
var atomPt = 0;
do {
var ch = s.charAt (index);
switch (ch) {
case '!':
this.isNot = true;
index++;
break;
case '/':
case '.':
if ((pt = atomPt) >= this.atomCount) {
msg = "Too many descriptors";
break;
}var a = po[atomPt] =  Clazz.newIntArray (n, 0);
for (; --n >= 0; ) a[n] = temp[n];

n = 0;
if (JU.Logger.debugging) JU.Logger.info (JU.PT.toJSON ("@PH" + this.atomCount + "[" + atomPt + "]", a));
if (ch == '/') index = 2147483647;
 else index++;
atomPt++;
break;
default:
index = JS.SmilesParser.getRingNumber (s, index, ch, ret);
pt = temp[n++] = ret[0] - 1;
if (pt == atomPt) msg = "Atom cannot connect to itself";
 else if (pt < 0 || pt >= this.atomCount) msg = "Connection number outside of range (1-" + this.atomCount + ")";
 else if (n >= this.atomCount) msg = "Too many connections indicated";
}
if (msg != null) {
msg += ": " + s.substring (0, index) + "<<";
throw  new JS.InvalidSmilesException (msg);
}} while (index < len);
});
Clazz.defineStatics (c$,
"DEFAULT", 0,
"POLYHEDRAL", 1,
"ALLENE", 2,
"TRIGONAL_PYRAMIDAL", 3,
"TETRAHEDRAL", 4,
"TRIGONAL_BIPYRAMIDAL", 5,
"OCTAHEDRAL", 6,
"SQUARE_PLANAR", 7,
"T_SHAPED", 8,
"SEESAW", 9,
"PERM_TB",  Clazz.newIntArray (-1, [0, 1, 4, 0, -1, 4, 0, 1, 3, 0, -1, 3, 0, 1, 2, 0, -1, 2, 0, 1, 1, 0, -1, 1, 1, 1, 4, 1, 1, 3, 1, -1, 4, 1, -1, 3, 1, 1, 2, 1, -1, 2, 2, 1, 4, 2, 1, 3, 3, 1, 4, 3, -1, 4, 2, -1, 3, 2, -1, 4]),
"PERM_OCT",  Clazz.newIntArray (-1, [0, 1, 5, 0, -1, 5, 0, 1, 4, 0, 3, 5, 0, 3, 4, 0, 1, 3, 0, 3, 3, 0, 2, 5, 0, 2, 4, 0, -2, 5, 0, -2, 4, 0, 2, 3, 0, -2, 3, 0, -3, 5, 0, -3, 4, 0, -1, 4, 0, -3, 3, 0, -1, 3, 0, 1, 2, 0, 3, 2, 0, 2, 2, 0, -2, 2, 0, -3, 2, 0, -1, 2, 0, 1, 1, 0, 3, 1, 0, 2, 1, 0, -2, 1, 0, -3, 1, 0, -1, 1]),
"PERM_SS",  Clazz.newIntArray (-1, [0, 1, 3, 0, -1, 3, 0, 1, 2, 0, -1, 2, 0, 1, 1, 0, -1, 1, 1, 1, 3, 1, -1, 3, 1, 1, 2, 1, -1, 2, 2, 1, 3, 2, -1, 3]));
});
