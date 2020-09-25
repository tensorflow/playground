Clazz.declarePackage ("JS");
Clazz.load (["JU.BS"], "JS.CIPChirality", ["java.util.Arrays", "$.Collections", "$.Hashtable", "JU.Lst", "$.PT", "JU.Elements", "$.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.currentRule = 1;
this.root = null;
this.data = null;
this.doTrack = false;
this.isAux = false;
this.bsNeedRule = null;
this.havePseudoAuxiliary = false;
this.ptIDLogger = 0;
if (!Clazz.isClassDefined ("JS.CIPChirality.CIPAtom")) {
JS.CIPChirality.$CIPChirality$CIPAtom$ ();
}
Clazz.instantialize (this, arguments);
}, JS, "CIPChirality");
Clazz.prepareFields (c$, function () {
this.bsNeedRule =  new JU.BS ();
});
Clazz.defineMethod (c$, "getRuleName", 
function (rule) {
return JS.CIPChirality.ruleNames[rule];
}, "~N");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getChiralityForAtoms", 
function (data) {
if (data.bsAtoms.cardinality () == 0) return;
this.data = data;
this.doTrack = data.isTracker ();
this.ptIDLogger = 0;
var bsToDo = data.bsMolecule.clone ();
var haveAlkenes = this.preFilterAtomList (data.atoms, bsToDo, data.bsEnes);
if (!data.bsEnes.isEmpty ()) data.getEneKekule ();
JU.Logger.info ("bsKekule:" + data.bsKekuleAmbiguous);
bsToDo = data.bsAtoms.clone ();
for (var i = bsToDo.nextSetBit (0); i >= 0; i = bsToDo.nextSetBit (i + 1)) {
var a = data.atoms[i];
a.setCIPChirality (0);
this.ptIDLogger = 0;
var c = this.getAtomChiralityLimited (a, null, null);
a.setCIPChirality (c == 0 ? 3 : c | ((this.currentRule - 1) << 5));
if (this.doTrack && c != 0) data.getRootTrackerResult (this.root);
}
if (haveAlkenes) {
var lstEZ =  new JU.Lst ();
for (var i = bsToDo.nextSetBit (0); i >= 0; i = bsToDo.nextSetBit (i + 1)) this.getAtomBondChirality (data.atoms[i], lstEZ, bsToDo);

if (data.lstSmallRings.length > 0 && lstEZ.size () > 0) this.clearSmallRingEZ (data.atoms, lstEZ);
this.setStereoFromSmiles (data.bsHelixM, 17, data.atoms);
this.setStereoFromSmiles (data.bsHelixP, 18, data.atoms);
}if (JU.Logger.debugging) {
JU.Logger.info ("Kekule ambiguous = " + data.bsKekuleAmbiguous);
JU.Logger.info ("small rings = " + JU.PT.toJSON (null, data.lstSmallRings));
}}, "JS.CIPData");
Clazz.defineMethod (c$, "setStereoFromSmiles", 
 function (bsHelix, stereo, atoms) {
if (bsHelix != null) for (var i = bsHelix.nextSetBit (0); i >= 0; i = bsHelix.nextSetBit (i + 1)) atoms[i].setCIPChirality (stereo);

}, "JU.BS,~N,~A");
Clazz.defineMethod (c$, "preFilterAtomList", 
 function (atoms, bsToDo, bsEnes) {
var haveAlkenes = false;
for (var i = bsToDo.nextSetBit (0); i >= 0; i = bsToDo.nextSetBit (i + 1)) {
if (!this.data.couldBeChiralAtom (atoms[i])) {
bsToDo.clear (i);
continue;
}switch (this.data.couldBeChiralAlkene (atoms[i], null)) {
case -1:
break;
case 13:
bsEnes.set (i);
case 17:
haveAlkenes = true;
break;
}
}
return haveAlkenes;
}, "~A,JU.BS,JU.BS");
c$.isFirstRow = Clazz.defineMethod (c$, "isFirstRow", 
function (a) {
var n = a.getElementNumber ();
return (n > 2 && n <= 10);
}, "JU.SimpleNode");
Clazz.defineMethod (c$, "clearSmallRingEZ", 
 function (atoms, lstEZ) {
for (var j = this.data.lstSmallRings.length; --j >= 0; ) this.data.lstSmallRings[j].andNot (this.data.bsAtropisomeric);

for (var i = lstEZ.size (); --i >= 0; ) {
var ab = lstEZ.get (i);
for (var j = this.data.lstSmallRings.length; --j >= 0; ) {
var ring = this.data.lstSmallRings[j];
if (ring.get (ab[0]) && ring.get (ab[1])) {
atoms[ab[0]].setCIPChirality (3);
atoms[ab[1]].setCIPChirality (3);
}}
}
}, "~A,JU.Lst");
Clazz.defineMethod (c$, "getAtomBondChirality", 
 function (atom, lstEZ, bsToDo) {
var index = atom.getIndex ();
var bonds = atom.getEdges ();
var c = 0;
var isAtropic = this.data.bsAtropisomeric.get (index);
for (var j = bonds.length; --j >= 0; ) {
var bond = bonds[j];
var atom1;
var index1;
if (isAtropic) {
atom1 = bonds[j].getOtherNode (atom);
index1 = atom1.getIndex ();
if (!this.data.bsAtropisomeric.get (index1)) continue;
c = this.setBondChirality (atom, atom1, atom, atom1, true);
} else if (this.data.getBondOrder (bond) == 2) {
atom1 = this.getLastCumuleneAtom (bond, atom, null, null);
index1 = atom1.getIndex ();
if (index1 < index) continue;
c = this.getBondChiralityLimited (bond, atom);
} else {
continue;
}if (c != 0) {
if (!isAtropic) lstEZ.addLast ( Clazz.newIntArray (-1, [index, index1]));
bsToDo.clear (index);
bsToDo.clear (index1);
}if (isAtropic) break;
}
}, "JU.SimpleNode,JU.Lst,JU.BS");
Clazz.defineMethod (c$, "getLastCumuleneAtom", 
 function (bond, atom, nSP2, parents) {
var atom2 = bond.getOtherNode (atom);
if (parents != null) {
parents[0] = atom2;
parents[1] = atom;
}if (nSP2 != null) nSP2[0] = 2;
var ppt = 0;
while (true) {
if (atom2.getCovalentBondCount () != 2) return atom2;
var edges = atom2.getEdges ();
for (var i = edges.length; --i >= 0; ) {
var atom3 = (bond = edges[i]).getOtherNode (atom2);
if (atom3 === atom) continue;
if (this.data.getBondOrder (bond) != 2) return atom2;
if (parents != null) {
if (ppt == 0) {
parents[0] = atom2;
ppt = 1;
}parents[1] = atom2;
}if (nSP2 != null) nSP2[0]++;
atom = atom2;
atom2 = atom3;
break;
}
}
}, "JU.SimpleEdge,JU.SimpleNode,~A,~A");
Clazz.defineMethod (c$, "getAtomChiralityLimited", 
function (atom, cipAtom, parentAtom) {
var rs = 0;
this.bsNeedRule.clearAll ();
this.bsNeedRule.set (1);
try {
var isAlkeneEndCheck = (atom == null);
if (isAlkeneEndCheck) {
atom = (this.root = cipAtom).atom;
cipAtom.htPathPoints = (cipAtom.parent = Clazz.innerTypeInstance (JS.CIPChirality.CIPAtom, this, null).create (parentAtom, null, true, false, false)).htPathPoints;
} else {
if (!(this.root = cipAtom = (cipAtom == null ? Clazz.innerTypeInstance (JS.CIPChirality.CIPAtom, this, null).create (atom, null, false, false, false) : cipAtom)).isSP3) {
return 0;
}}if (cipAtom.setNode ()) {
for (this.currentRule = 1; this.currentRule <= 9; this.currentRule++) {
var nPrioritiesPrev = cipAtom.nPriorities;
switch (this.currentRule) {
case 3:
if (cipAtom.rule6refIndex >= 0) this.bsNeedRule.set (3);
break;
case 4:
this.isAux = true;
this.doTrack = false;
this.havePseudoAuxiliary = false;
cipAtom.createAuxiliaryDescriptors (null, null);
this.doTrack = this.data.isTracker ();
this.isAux = false;
break;
case 5:
if (!this.bsNeedRule.get (5)) {
this.currentRule = 8;
continue;
}case 6:
case 7:
cipAtom.sortSubstituents (-2147483648);
this.bsNeedRule.set (this.currentRule);
break;
case 8:
if (this.havePseudoAuxiliary) cipAtom.clearRule4Lists ();
cipAtom.sortSubstituents (-2147483648);
this.bsNeedRule.set (this.currentRule);
break;
case 9:
this.bsNeedRule.setBitTo (9, (cipAtom.rule6refIndex < 0 && (rs = cipAtom.getRule6Descriptor (false)) != 0));
break;
}
if (!this.bsNeedRule.get (this.currentRule)) continue;
if (rs == 0 && cipAtom.sortSubstituents (0)) {
if (JU.Logger.debuggingHigh && cipAtom.h1Count < 2) {
for (var i = 0; i < cipAtom.bondCount; i++) {
if (cipAtom.atoms[i] != null) JU.Logger.info (cipAtom.atoms[i] + " " + cipAtom.priorities[i]);
}
}if (isAlkeneEndCheck) return cipAtom.getEneTop ();
rs = this.data.checkHandedness (cipAtom);
if (this.currentRule == 8) {
if (cipAtom.nPriorities == 4 && nPrioritiesPrev == 2) cipAtom.isRule5Pseudo = !cipAtom.isRule5Pseudo;
if (cipAtom.isRule5Pseudo) rs |= 8;
}if (JU.Logger.debugging) JU.Logger.info (atom + " " + JV.JC.getCIPChiralityName (rs) + " by Rule " + this.getRuleName (this.currentRule) + "\n----------------------------------");
return rs;
}}
}} catch (e) {
System.out.println (e + " in CIPChirality " + this.currentRule);
{
alert(e);
}return 3;
}
return rs;
}, "JU.SimpleNode,JS.CIPChirality.CIPAtom,JU.SimpleNode");
Clazz.defineMethod (c$, "getBondChiralityLimited", 
 function (bond, a) {
if (a == null) a = bond.getOtherNode (null);
if (this.data.couldBeChiralAlkene (a, bond) == -1) return 0;
var nSP2 =  Clazz.newIntArray (1, 0);
var parents =  new Array (2);
var b = this.getLastCumuleneAtom (bond, a, nSP2, parents);
var isAxial = nSP2[0] % 2 == 1;
if (!isAxial && this.data.bsAromatic.get (a.getIndex ())) return -1;
var c = this.setBondChirality (a, parents[0], parents[1], b, isAxial);
if (JU.Logger.debugging) JU.Logger.info ("get Bond Chirality " + JV.JC.getCIPChiralityName (c) + " " + bond);
return c;
}, "JU.SimpleEdge,JU.SimpleNode");
Clazz.defineMethod (c$, "setBondChirality", 
 function (a, pa, pb, b, isAxial) {
var a1 = Clazz.innerTypeInstance (JS.CIPChirality.CIPAtom, this, null).create (a, null, true, false, false);
var b2 = Clazz.innerTypeInstance (JS.CIPChirality.CIPAtom, this, null).create (b, null, true, false, false);
var atop = this.getAtomChiralityLimited (null, a1, pa) - 1;
var ruleA = this.currentRule;
var btop = this.getAtomChiralityLimited (null, b2, pb) - 1;
var ruleB = this.currentRule;
if (isAxial && a1.nRootDuplicates > 3 && atop < 0 && btop < 0) {
ruleA = ruleB = this.currentRule = 9;
b2.rule6refIndex = a1.atoms[atop = a1.getEneTop () - 1].atomIndex;
if (b2.sortSubstituents (0)) btop = b2.getEneTop () - 1;
}var c = (atop >= 0 && btop >= 0 ? this.getEneChirality (b2.atoms[btop], b2, a1, a1.atoms[atop], isAxial, true) : 0);
if (c != 0 && (isAxial || !this.data.bsAtropisomeric.get (a.getIndex ()) && !this.data.bsAtropisomeric.get (b.getIndex ()))) {
if (isAxial == (ruleA == 8) == (ruleB == 8)) c &= -9;
 else c |= 8;
a.setCIPChirality (c | ((ruleA - 1) << 5));
b.setCIPChirality (c | ((ruleB - 1) << 5));
if (JU.Logger.debugging) JU.Logger.info (a + "-" + b + " " + JV.JC.getCIPChiralityName (c));
}return c;
}, "JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,~B");
Clazz.defineMethod (c$, "getEneChirality", 
function (winner1, end1, end2, winner2, isAxial, allowPseudo) {
return (winner1 == null || winner2 == null || winner1.atom == null || winner2.atom == null ? 0 : isAxial ? this.data.isPositiveTorsion (winner1, end1, end2, winner2) : this.data.isCis (winner1, end1, end2, winner2));
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,~B,~B");
c$.$CIPChirality$CIPAtom$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.isRule5Pseudo = true;
this.id = 0;
this.sphere = 0;
this.rootDistance = 0;
this.isSet = false;
this.isDuplicate = true;
this.isTerminal = false;
this.isAlkene = false;
this.atom = null;
this.atomIndex = -1;
this.bondCount = 0;
this.elemNo = 0;
this.mass = -1;
this.parent = null;
this.rootSubstituent = null;
this.h1Count = 0;
this.atoms = null;
this.nAtoms = 0;
this.bsPath = null;
this.myPath = "";
this.oldPriorities = null;
this.priorities =  Clazz.newIntArray (4, 0);
this.oldNPriorities = 0;
this.nPriorities = 0;
this.priority = 0;
this.chiralPath = null;
this.nRootDuplicates = 0;
this.htPathPoints = null;
this.rule6refIndex = -1;
this.bsRule6Subs = null;
this.alkeneParent = null;
this.alkeneChild = null;
this.isAlkeneAtom2 = false;
this.isKekuleAmbiguous = false;
this.nextSP2 = null;
this.multipleBondDuplicate = false;
this.isEvenEne = true;
this.auxEZ = -1;
this.isSP3 = true;
this.auxChirality = '~';
this.nextChiralBranch = null;
this.isChiralPath = false;
this.rule4Type = 0;
this.bsTemp = null;
this.rule4Ref = 0;
this.listRS = null;
Clazz.instantialize (this, arguments);
}, JS.CIPChirality, "CIPAtom", null, [Comparable, Cloneable]);
Clazz.prepareFields (c$, function () {
this.atoms =  new Array (4);
this.bsTemp =  new JU.BS ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "create", 
function (a, b, c, d, e) {
this.id = ++this.b$["JS.CIPChirality"].ptIDLogger;
this.parent = b;
if (a == null) return this;
this.isAlkene = c;
this.atom = a;
this.atomIndex = a.getIndex ();
if (a.getIsotopeNumber () > 0) this.b$["JS.CIPChirality"].bsNeedRule.set (3);
this.isDuplicate = this.multipleBondDuplicate = d;
this.isKekuleAmbiguous = (this.b$["JS.CIPChirality"].data.bsKekuleAmbiguous != null && this.b$["JS.CIPChirality"].data.bsKekuleAmbiguous.get (this.atomIndex));
this.elemNo = (d && this.isKekuleAmbiguous ? b.getKekuleElementNumber () : a.getElementNumber ());
this.bondCount = a.getCovalentBondCount ();
this.isSP3 = (this.bondCount == 4 || this.bondCount == 3 && !c && (this.elemNo > 10 || this.b$["JS.CIPChirality"].data.bsAzacyclic != null && this.b$["JS.CIPChirality"].data.bsAzacyclic.get (this.atomIndex)));
if (b != null) this.sphere = b.sphere + 1;
if (this.sphere == 1) {
this.rootSubstituent = this;
this.htPathPoints =  new java.util.Hashtable ();
} else if (b != null) {
this.rootSubstituent = b.rootSubstituent;
this.htPathPoints = (b.htPathPoints).clone ();
}this.bsPath = (b == null ?  new JU.BS () : b.bsPath.clone ());
if (d) this.b$["JS.CIPChirality"].bsNeedRule.set (4);
this.rootDistance = this.sphere;
if (b == null) {
this.bsPath.set (this.atomIndex);
} else if (this.multipleBondDuplicate) {
this.rootDistance--;
} else if (this.bsPath.get (this.atomIndex)) {
this.b$["JS.CIPChirality"].bsNeedRule.setBitTo (2, (this.isDuplicate = true));
if ((this.rootDistance = (a === this.b$["JS.CIPChirality"].root.atom ? 0 : e ? b.sphere : this.htPathPoints.get (Integer.$valueOf (this.atomIndex)).intValue ())) == 0) {
this.b$["JS.CIPChirality"].root.nRootDuplicates++;
}} else {
this.bsPath.set (this.atomIndex);
this.htPathPoints.put (Integer.$valueOf (this.atomIndex), Integer.$valueOf (this.rootDistance));
}if (this.b$["JS.CIPChirality"].doTrack) {
if (this.sphere < 50) this.myPath = (b != null ? b.myPath + "-" : "") + this;
if (JU.Logger.debuggingHigh) JU.Logger.info ("new CIPAtom " + this.myPath);
}return this;
}, "JU.SimpleNode,JS.CIPChirality.CIPAtom,~B,~B,~B");
Clazz.defineMethod (c$, "getEneTop", 
function () {
return (this.atoms[0].isDuplicate ? 2 : 1);
});
Clazz.defineMethod (c$, "getRule6Descriptor", 
function (a) {
if (this.nPriorities > 2 || (a ? this.countAuxDuplicates (this.atomIndex) : this.nRootDuplicates) <= 2) return 0;
var b = (this.priorities[0] == this.priorities[1] ? 0 : 1);
var c = (this.priorities[2] != this.priorities[3] ? 3 : 4);
var d = (this.priorities[2] == this.priorities[1] ? 1 : 2);
var e = 0;
var f = 0;
var g =  new JU.BS ();
for (var h = b; h < c; h++) g.set (this.atoms[h].atomIndex);

if (this.nPriorities == 1) c = 2;
var i = null;
var j;
for (var k = b; k < c; k += d) {
if (this.b$["JS.CIPChirality"].data.testRule6Full) {
i = Clazz.innerTypeInstance (JS.CIPChirality.CIPAtom, this, null).create (this.atom, null, false, false, false);
i.rule6refIndex = this.atoms[k].atomIndex;
i.setNode ();
for (var l = 0; l < 4; l++) {
i.atoms[l] = this.atoms[l].clone ();
i.priorities[l] = this.priorities[l];
}
i.bsRule6Subs = g;
j = this.b$["JS.CIPChirality"].getAtomChiralityLimited (this.atom, i, null);
this.b$["JS.CIPChirality"].currentRule = 9;
if (j == 0) return 0;
} else {
this.b$["JS.CIPChirality"].root.bsRule6Subs =  new JU.BS ();
this.b$["JS.CIPChirality"].root.rule6refIndex = this.atoms[k].atomIndex;
this.saveRestorePriorities (false);
this.sortSubstituents (-2147483648);
if (!this.sortSubstituents (0)) return 0;
j = this.b$["JS.CIPChirality"].data.checkHandedness (this);
this.saveRestorePriorities (true);
}if ((j & 8) == 0) {
if (j == 1 || j == 17) {
if (e == 0) {
e = j;
continue;
}} else if (f == 0) {
f = j;
continue;
}}return j;
}
return 0;
}, "~B");
Clazz.defineMethod (c$, "saveRestorePriorities", 
 function (a) {
if (a) {
this.priorities = this.oldPriorities;
this.nPriorities = this.oldNPriorities;
} else {
this.oldPriorities = java.util.Arrays.copyOf (this.priorities, 4);
this.oldNPriorities = this.nPriorities;
}for (var b = 0; b < this.nAtoms; b++) this.atoms[b].saveRestorePriorities (a);

}, "~B");
Clazz.defineMethod (c$, "countAuxDuplicates", 
 function (a) {
var b = 0;
for (var c = 0; c < 4; c++) {
if (this.atoms[c] == null) continue;
if (this.atoms[c].isDuplicate) {
if (this.atoms[c].atomIndex == a) b++;
} else {
b += this.atoms[c].countAuxDuplicates (a);
}}
return b;
}, "~N");
Clazz.defineMethod (c$, "getMass", 
 function () {
if (this.isDuplicate) return 0;
if (this.mass == -1) {
if (this.isDuplicate || (this.mass = this.atom.getMass ()) != Clazz.floatToInt (this.mass) || this.isType (";9Be;19F;23Na;27Al;31P;45Sc;55Mn;59Co;75As;89Y;93Nb;98Tc;103Rh;127I;133Cs;141Pr;145Pm;159Tb;165Ho;169Tm;197Au;209Bi;209Po;210At;222Rn;223Fr;226Ra;227Ac;231Pa;232Th;and all > U (atomno > 92)")) return (this.mass == -1 ? this.mass = JU.Elements.getAtomicMass (Clazz.floatToInt (this.elemNo)) : this.mass);
if (this.isType (";16O;52Cr;96Mo;175Lu;")) this.mass -= 0.1;
}return this.mass;
});
Clazz.defineMethod (c$, "isType", 
 function (a) {
return JU.PT.isOneOf (Clazz.floatToInt (this.mass) + JU.Elements.elementSymbolFromNumber (Clazz.floatToInt (this.elemNo)), a);
}, "~S");
Clazz.defineMethod (c$, "getKekuleElementNumber", 
 function () {
var a = this.atom.getEdges ();
var b;
var c = 0;
var d = 0;
for (var e = a.length; --e >= 0; ) if ((b = a[e]).isCovalent ()) {
var f = b.getOtherNode (this.atom);
if (this.b$["JS.CIPChirality"].data.bsKekuleAmbiguous.get (f.getIndex ())) {
d++;
c += f.getElementNumber ();
}}
return c / d;
});
Clazz.defineMethod (c$, "setNode", 
function () {
if (this.isSet || (this.isSet = true) && this.isDuplicate) return true;
var a = this.atom.getIndex ();
var b = this.atom.getEdges ();
var c = b.length;
if (JU.Logger.debuggingHigh) JU.Logger.info ("set " + this);
var d = 0;
for (var e = 0; e < c; e++) {
var f = b[e];
if (!f.isCovalent ()) continue;
var g = f.getOtherNode (this.atom);
var h = (this.parent != null && this.parent.atom === g);
var i = this.b$["JS.CIPChirality"].data.getBondOrder (f);
if (i == 2) {
if (this.elemNo > 10 || !JS.CIPChirality.isFirstRow (g)) i = 1;
 else {
this.isAlkene = true;
if (h) this.setEne ();
}}if (c == 1 && i == 1 && h) return this.isTerminal = true;
switch (i) {
case 3:
if (this.addAtom (d++, g, h, false, h) == null) return !(this.isTerminal = true);
case 2:
if (this.addAtom (d++, g, i != 2 || h, i == 2, h) == null) return !(this.isTerminal = true);
case 1:
if (h || this.addAtom (d++, g, i != 1 && this.elemNo <= 10, false, false) != null) break;
default:
return !(this.isTerminal = true);
}
}
this.nAtoms = d;
switch (d) {
case 2:
case 3:
if (this.elemNo == 6 && this.b$["JS.CIPChirality"].data.bsNegativeAromatic.get (a) || this.b$["JS.CIPChirality"].data.bsXAromatic.get (a)) {
this.nAtoms++;
this.addAtom (d++, this.atom, true, false, false);
}break;
}
if (d < 4) for (; d < this.atoms.length; d++) this.atoms[d] = Clazz.innerTypeInstance (JS.CIPChirality.CIPAtom, this, null).create (null, this, false, true, false);

try {
java.util.Arrays.sort (this.atoms);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
return true;
});
Clazz.defineMethod (c$, "setEne", 
 function () {
this.parent.alkeneChild = null;
this.alkeneParent = (this.parent.alkeneParent == null ? this.parent : this.parent.alkeneParent);
this.alkeneParent.alkeneChild = this;
this.nextSP2 = this.parent;
if (this.parent.alkeneParent == null) this.parent.nextSP2 = this;
if (this.atom.getCovalentBondCount () == 2 && this.atom.getValence () == 4) {
this.parent.isAlkeneAtom2 = false;
this.alkeneParent.isEvenEne = !this.alkeneParent.isEvenEne;
} else {
this.isAlkeneAtom2 = true;
}});
Clazz.defineMethod (c$, "addAtom", 
 function (a, b, c, d, e) {
if (a >= this.atoms.length) {
if (JU.Logger.debugging) JU.Logger.info (" too many bonds on " + this.atom);
return null;
}if (b.getElementNumber () == 1 && b.getIsotopeNumber () == 0) {
if (++this.h1Count > 1) {
if (this.parent == null) {
if (JU.Logger.debuggingHigh) JU.Logger.info (" second H atom found on " + this.atom);
return null;
}}}return this.atoms[a] = Clazz.innerTypeInstance (JS.CIPChirality.CIPAtom, this, null).create (b, this, d, c, e);
}, "~N,JU.SimpleNode,~B,~B,~B");
Clazz.defineMethod (c$, "sortSubstituents", 
function (a) {
if (this.nPriorities == (a < 1 ? 4 : 3)) return true;
var b = (a == -2147483648);
if (b) {
if (this.isTerminal) return false;
switch (this.b$["JS.CIPChirality"].currentRule) {
case 5:
case 7:
for (var c = 0; c < 4; c++) if (this.atoms[c] != null && (this.atoms[c].isChiralPath || this.atoms[c].nextChiralBranch != null)) this.atoms[c].sortSubstituents (-2147483648);

if (this.isAlkene) return false;
break;
case 9:
for (var d = 0; d < 4; d++) if (this.atoms[d] != null && !this.atoms[d].isDuplicate && this.atoms[d].atom != null && this.atoms[d].setNode ()) this.atoms[d].sortSubstituents (-2147483648);

break;
}
}b = new Boolean (b | (this.b$["JS.CIPChirality"].currentRule == 6 || this.b$["JS.CIPChirality"].currentRule == 8)).valueOf ();
var c =  Clazz.newIntArray (4, 0);
var d =  Clazz.newIntArray (4, 0);
if (JU.Logger.debuggingHigh && this.h1Count < 2) {
JU.Logger.info (this.b$["JS.CIPChirality"].root + "---sortSubstituents---" + this);
for (var e = 0; e < 4; e++) {
JU.Logger.info (this.b$["JS.CIPChirality"].getRuleName (this.b$["JS.CIPChirality"].currentRule) + ": " + this + "[" + e + "]=" + this.atoms[e].myPath + " " + Integer.toHexString (this.priorities[e]));
}
JU.Logger.info ("---" + this.nPriorities);
}var e;
for (var f = 0; f < 3; f++) {
var g = this.atoms[f];
var h = g.isDuplicate && this.b$["JS.CIPChirality"].currentRule > 2;
for (var i = f + 1; i < 4; i++) {
var j = this.atoms[e = i];
var k = 0;
switch (j.atom == null || this.priorities[f] < this.priorities[i] ? -1 : h || g.atom == null || this.priorities[i] < this.priorities[f] ? 1 : (k = g.checkCurrentRule (j)) != 0 && k != -2147483648 || b ? k : this.sign (g.breakTie (j, a + 1))) {
case 1:
e = f;
case -1:
d[e]++;
if (this.b$["JS.CIPChirality"].doTrack && k != 0 && (a == 0 || b)) this.b$["JS.CIPChirality"].data.track (this.b$["JS.CIPChirality"], g, j, 1, k, false);
case -2147483648:
case 0:
c[e]++;
continue;
}
}
}
this.bsTemp.clearAll ();
var g =  new Array (4);
for (var h = 0; h < 4; h++) {
var i = c[h];
var j = g[i] = this.atoms[h];
var k = d[h];
if (j.atom != null) this.bsTemp.set (k);
j.priority = this.priorities[i] = k;
}
this.atoms = g;
this.nPriorities = this.bsTemp.cardinality ();
if (JU.Logger.debuggingHigh && this.atoms[2].atom != null && this.atoms[2].elemNo != 1) {
JU.Logger.info (this.dots () + this.atom + " nPriorities = " + this.nPriorities);
for (var i = 0; i < 4; i++) {
JU.Logger.info (this.dots () + this.myPath + "[" + i + "]=" + this.atoms[i] + " " + this.priorities[i] + " " + Integer.toHexString (this.priorities[i]));
}
JU.Logger.info (this.dots () + "-------" + this.nPriorities);
}return (this.nPriorities == this.bondCount);
}, "~N");
Clazz.defineMethod (c$, "dots", 
 function () {
return ".....................".substring (0, Math.min (20, this.sphere));
});
Clazz.defineMethod (c$, "breakTie", 
 function (a, b) {
var c = 0;
while (true) {
if (this.isDuplicate && (this.b$["JS.CIPChirality"].currentRule > 2 || a.isDuplicate && this.atom === a.atom && this.rootDistance == a.rootDistance) || !this.setNode () || !a.setNode () || this.isTerminal && a.isTerminal || this.isDuplicate && a.isDuplicate) break;
if (this.isTerminal != a.isTerminal) {
c = (this.isTerminal ? 1 : -1) * (b + (a.isDuplicate || this.isDuplicate ? 0 : 1));
if (this.b$["JS.CIPChirality"].doTrack) this.b$["JS.CIPChirality"].data.track (this.b$["JS.CIPChirality"], this, a, b, c, true);
break;
}var d = (this.b$["JS.CIPChirality"].currentRule > 2 ? 0 : this.unlikeDuplicates (a));
if (d != 0) {
c = d * (b + 1);
if (this.b$["JS.CIPChirality"].doTrack) this.b$["JS.CIPChirality"].data.track (this.b$["JS.CIPChirality"], this, a, b, c, false);
break;
}for (var e = 0; e < this.nAtoms; e++) if ((d = this.atoms[e].checkCurrentRule (a.atoms[e])) != 0) {
c = d * (b + 1);
if (this.b$["JS.CIPChirality"].doTrack) this.b$["JS.CIPChirality"].data.track (this.b$["JS.CIPChirality"], this.atoms[e], a.atoms[e], b, c, false);
break;
}
if (c != 0) {
break;
}this.sortSubstituents (b);
a.sortSubstituents (b);
for (var f = 0, g, h = 2147483647; f < this.nAtoms; f++) {
if ((d = this.atoms[f].breakTie (a.atoms[f], b + 1)) != 0 && (g = Math.abs (d)) < h) {
h = g;
c = d;
}}
break;
}
return c;
}, "JS.CIPChirality.CIPAtom,~N");
Clazz.overrideMethod (c$, "compareTo", 
function (a) {
var b;
return (this.b$["JS.CIPChirality"].root.rule4Ref == 0 ? (a == null ? -1 : (this.atom == null) != (a.atom == null) ? (this.atom == null ? 1 : -1) : (b = this.compareRule1a (a)) != 0 ? b : (b = this.unlikeDuplicates (a)) != 0 ? b : this.isDuplicate ? this.compareRule1b (a) : this.compareRule2 (a)) : this.sphere < a.sphere ? -1 : this.sphere > a.sphere ? 1 : this.chiralPath.compareTo (a.chiralPath));
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "checkCurrentRule", 
 function (a) {
switch (this.b$["JS.CIPChirality"].currentRule) {
default:
case 1:
return this.compareRule1a (a);
case 2:
return this.compareRule1b (a);
case 3:
return this.compareRule2 (a);
case 4:
return this.compareRule3 (a);
case 5:
return this.compareRules4ac (a, " sr SR PM");
case 6:
case 8:
return (this.isTerminal || a.isTerminal ? 0 : this.compareRule4b5 (a));
case 7:
return this.compareRules4ac (a, " s r p m");
case 9:
return this.compareRule6 (a);
}
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "unlikeDuplicates", 
 function (a) {
return a.isDuplicate == this.isDuplicate ? 0 : this.isDuplicate ? 1 : -1;
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "compareRule1a", 
 function (a) {
return a.atom == null ? -1 : this.atom == null ? 1 : a.elemNo < this.elemNo ? -1 : a.elemNo > this.elemNo ? 1 : 0;
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "compareRule1b", 
 function (a) {
return Integer.compare (this.rootDistance, a.rootDistance);
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "compareRule2", 
 function (a) {
return (this.atomIndex == a.atomIndex ? 0 : this.getMass () > a.getMass () ? -1 : this.mass < a.mass ? 1 : this.b$["JS.CIPChirality"].root.rule6refIndex < 0 ? 0 : !this.b$["JS.CIPChirality"].root.bsRule6Subs.get (this.atomIndex) || !this.b$["JS.CIPChirality"].root.bsRule6Subs.get (a.atomIndex) ? 0 : this.b$["JS.CIPChirality"].root.rule6refIndex == this.atomIndex ? -1 : this.b$["JS.CIPChirality"].root.rule6refIndex == a.atomIndex ? 1 : 0);
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "compareRule3", 
 function (a) {
return this.isDuplicate || a.isDuplicate || !this.parent.isAlkeneAtom2 || !a.parent.isAlkeneAtom2 || !this.parent.alkeneParent.isEvenEne || !a.parent.alkeneParent.isEvenEne || this.parent === a.parent ? 0 : Integer.compare (this.parent.auxEZ, a.parent.auxEZ);
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "compareRules4ac", 
 function (a, b) {
if (this.isTerminal || this.isDuplicate) return 0;
var c = b.indexOf (this.auxChirality);
var d = b.indexOf (a.auxChirality);
return (c > d + 1 ? -1 : d > c + 1 ? 1 : 0);
}, "JS.CIPChirality.CIPAtom,~S");
Clazz.defineMethod (c$, "compareRule4b5", 
 function (a) {
var b = this.getBetter4bList ();
var c = a.getBetter4bList ();
var d = this.compareLikeUnlike (b, c);
var e = (d == null ? -2147483648 : d === b ? -1 : 1);
if (d != null) {
if (this.b$["JS.CIPChirality"].currentRule == 8) {
if ((this.compareLikeUnlike (this.listRS[2], a.listRS[2]) === this.listRS[2]) == (d === b)) this.parent.isRule5Pseudo = !this.parent.isRule5Pseudo;
}if (this.b$["JS.CIPChirality"].doTrack) this.b$["JS.CIPChirality"].data.track (this.b$["JS.CIPChirality"], this, a, 1, e, false);
}return e;
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "compareRule6", 
 function (a) {
return ((this.atomIndex == this.b$["JS.CIPChirality"].root.rule6refIndex) == (a.atomIndex == this.b$["JS.CIPChirality"].root.rule6refIndex) ? 0 : this.atomIndex == this.b$["JS.CIPChirality"].root.rule6refIndex ? -1 : 1);
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "clearRule4Lists", 
function () {
this.listRS = null;
for (var a = 0; a < 4 && this.atoms[a] != null; a++) this.atoms[a].clearRule4Lists ();

});
Clazz.defineMethod (c$, "getBetter4bList", 
 function () {
if (this.listRS != null) return this.listRS[this.b$["JS.CIPChirality"].currentRule == 8 ? 1 : 0];
var a;
this.listRS =  Clazz.newArray (-1, [null, a = this.rank4bAndRead (null), this.rank4bAndRead (a)]);
JU.Logger.info ("getBest " + this.b$["JS.CIPChirality"].currentRule + " " + this + " " + this.listRS[1] + this.listRS[2] + " " + this.myPath);
a = this.compareLikeUnlike (this.listRS[1], this.listRS[2]);
return this.listRS[0] = (this.b$["JS.CIPChirality"].currentRule == 8 || a == null ? this.listRS[1] : a);
});
Clazz.defineMethod (c$, "rank4bAndRead", 
 function (a) {
var b = (a != null);
var c = (b ? 2 : 1);
var d =  new JU.BS ();
var e =  new JU.Lst ();
this.b$["JS.CIPChirality"].root.rule4Ref = c;
this.addChiralAtoms (e, c);
java.util.Collections.sort (e);
this.b$["JS.CIPChirality"].root.rule4Ref = 0;
for (var f = 0, g = e.size (); f < g; f++) {
if (JU.Logger.debugging) JU.Logger.info ("" + c + " " + this + " " + e.get (f).chiralPath);
if (e.get (f).rule4Type == c) d.set (f);
}
return d;
}, "JU.BS");
Clazz.defineMethod (c$, "addChiralAtoms", 
 function (a, b) {
if (this.atom == null || this.isTerminal || this.isDuplicate) return;
if (this.rule4Type != 0) {
var c = "";
var d = this;
while (d != null) {
c = String.fromCharCode (64 + (d.priority << 2) + (d.rule4Type == 0 ? 0 : d.rule4Type == b ? 1 : 2)) + c;
if ((d = d.parent) != null && d.chiralPath != null) {
c = d.chiralPath + c;
break;
}}
this.chiralPath = c;
a.addLast (this);
}for (var c = 0; c < 4; c++) if (this.atoms[c] != null) this.atoms[c].addChiralAtoms (a, b);

}, "JU.Lst,~N");
Clazz.defineMethod (c$, "compareLikeUnlike", 
 function (a, b) {
var c = b.clone ();
c.xor (a);
var d = c.nextSetBit (0);
return (d < 0 ? null : a.get (d) ? a : b);
}, "JU.BS,JU.BS");
Clazz.defineMethod (c$, "createAuxiliaryDescriptors", 
function (a, b) {
var c = false;
var d = '~';
if (this.atom == null) return false;
this.setNode ();
var e = -1;
var f = 0;
var g =  new Array (1);
var h = false;
var i = true;
var j = (!this.isAlkene && this.nPriorities <= (a == null ? 2 : 1));
for (var k = 0; k < 4; k++) {
var l = this.atoms[k];
if (l != null && !l.isDuplicate && !l.isTerminal) {
g[0] = null;
var m = l.createAuxiliaryDescriptors (a == null ? l : a, g);
if (g[0] != null && b != null) b[0] = this.nextChiralBranch = l.nextChiralBranch;
if (l.nextChiralBranch != null || m) {
f++;
c = m;
i = true;
} else {
if (!j && !i && this.priorities[k] == this.priorities[k - 1]) {
return false;
}i = false;
}}}
var l = (f >= 2);
switch (f) {
case 0:
c = false;
case 1:
h = true;
break;
case 2:
case 3:
case 4:
c = false;
if (b != null) b[0] = this.nextChiralBranch = this;
break;
}
if (this.isAlkene) {
if (this.alkeneChild != null) {
if (!this.isEvenEne || (this.auxEZ == 15 || this.auxEZ == -1) && !this.isKekuleAmbiguous && this.alkeneChild.bondCount >= 2) {
var m = (this.isEvenEne ?  Clazz.newIntArray (1, 0) : null);
e = this.getAuxEneWinnerChirality (this, this.alkeneChild, !this.isEvenEne, m);
if (e == 0) {
this.auxEZ = this.alkeneChild.auxEZ = 15;
} else {
c = true;
if (m != null && m[0] != 8) {
this.auxEZ = this.alkeneChild.auxEZ = e;
if (JU.Logger.debuggingHigh) JU.Logger.info ("alkene type " + this + " " + (this.auxEZ == 14 ? "E" : "Z"));
} else if (!l) {
switch (e) {
case 17:
case 13:
e = 1;
d = 'R';
c = true;
break;
case 18:
case 14:
e = 2;
d = 'S';
c = true;
break;
}
this.auxChirality = d;
this.rule4Type = e;
}}}}} else if (this.isSP3 && b != null) {
var m = this.clone ();
if (m.setNode ()) {
m.addReturnPath (null, this);
var n = 1;
for (; n <= 9; n++) if ((!h || n < 5 || n > 8) && m.auxSort (n)) break;

if (n > 9) {
d = '~';
} else {
e = this.b$["JS.CIPChirality"].data.checkHandedness (m);
c = new Boolean (c | (e != 0)).valueOf ();
d = (e == 1 ? 'R' : e == 2 ? 'S' : '~');
if (n == 8) {
d = (d == 'R' ? 'r' : d == 'S' ? 's' : '~');
if (e != 0) this.b$["JS.CIPChirality"].havePseudoAuxiliary = true;
} else {
this.rule4Type = e;
}}}this.auxChirality = d;
}if (a == null) this.b$["JS.CIPChirality"].bsNeedRule.setBitTo (5, f > 0);
if (d != '~') {
JU.Logger.info ("creating aux " + d + " for " + this + (this.myPath.length == 0 ? "" : " = " + this.myPath));
}return (this.isChiralPath = c);
}, "JS.CIPChirality.CIPAtom,~A");
Clazz.defineMethod (c$, "auxSort", 
 function (a) {
var b = this.b$["JS.CIPChirality"].currentRule;
this.b$["JS.CIPChirality"].currentRule = a;
var c = this.b$["JS.CIPChirality"].root.rule6refIndex;
var d = this.b$["JS.CIPChirality"].root.nRootDuplicates;
var e = (a == 9 ? this.getRule6Descriptor (true) != 0 : this.sortSubstituents (0));
this.b$["JS.CIPChirality"].root.nRootDuplicates = d;
this.b$["JS.CIPChirality"].root.rule6refIndex = c;
this.b$["JS.CIPChirality"].currentRule = b;
return e;
}, "~N");
Clazz.defineMethod (c$, "getAuxEneWinnerChirality", 
 function (a, b, c, d) {
if (c && a.nextSP2 === b) return 0;
var e = this.getAuxEneEndWinner (a, a.nextSP2, null);
var f = (e == null || e.atom == null ? null : this.getAuxEneEndWinner (b, b.nextSP2, d));
if (JU.Logger.debuggingHigh) JU.Logger.info (this + " alkene end winners " + e + f);
return this.b$["JS.CIPChirality"].getEneChirality (e, a, b, f, c, false);
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,~B,~A");
Clazz.defineMethod (c$, "getAuxEneEndWinner", 
 function (a, b, c) {
var d = a.clone ();
if (d.parent !== b) d.addReturnPath (b, a);
var e;
for (var f = 1; f <= 9; f++) {
if (d.auxSort (f)) {
for (var g = 0; g < 4; g++) {
e = d.atoms[g];
if (!e.multipleBondDuplicate) {
if (d.priorities[g] != d.priorities[g + 1]) {
if (c != null) c[0] = f;
return (e.atom == null ? null : e);
}}}
}}
return null;
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,~A");
Clazz.defineMethod (c$, "addReturnPath", 
 function (a, b) {
var c =  new JU.Lst ();
var d = this;
var e;
var f = b;
var g = a;
while (f.parent != null && f.parent.atoms[0] != null) {
if (JU.Logger.debuggingHigh) JU.Logger.info ("path:" + f.parent + "->" + f);
c.addLast (f = f.parent);
}
c.addLast (null);
for (var h = 0, i = c.size (); h < i; h++) {
f = c.get (h);
e = (f == null ? Clazz.innerTypeInstance (JS.CIPChirality.CIPAtom, this, null).create (null, this, this.isAlkene, true, false) : f.clone ());
e.nPriorities = 0;
e.sphere = d.sphere + 1;
d.replaceParentSubstituent (g, a, e);
if (h > 0 && d.isAlkene && !d.isAlkeneAtom2) {
if (a.isAlkeneAtom2) {
a.isAlkeneAtom2 = false;
d.alkeneParent = a;
}d.setEne ();
}a = d;
d = e;
g = b;
b = f;
}
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "replaceParentSubstituent", 
 function (a, b, c) {
for (var d = 0; d < 4; d++) if (this.atoms[d] === a || b == null && this.atoms[d].atom == null) {
if (JU.Logger.debuggingHigh) JU.Logger.info ("reversed: " + b + "->" + this + "->" + c);
this.parent = b;
this.atoms[d] = c;
java.util.Arrays.sort (this.atoms);
break;
}
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "sign", 
 function (a) {
return (a < 0 ? -1 : a > 0 ? 1 : 0);
}, "~N");
Clazz.defineMethod (c$, "clone", 
function () {
var a = null;
try {
a = Clazz.superCall (this, JS.CIPChirality.CIPAtom, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
} else {
throw e;
}
}
a.id = this.b$["JS.CIPChirality"].ptIDLogger++;
a.atoms =  new Array (4);
for (var b = 0; b < 4; b++) a.atoms[b] = this.atoms[b];

a.priorities =  Clazz.newIntArray (4, 0);
a.htPathPoints = this.htPathPoints;
a.alkeneParent = null;
a.auxEZ = -1;
a.rule4Type = 0;
a.listRS = null;
if (JU.Logger.debuggingHigh) a.myPath = a.toString ();
return a;
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.atom == null) return "<null>";
if (JU.Logger.debuggingHigh) return ("[" + this.b$["JS.CIPChirality"].currentRule + "." + this.sphere + "," + this.id + "." + (this.isDuplicate ? this.parent.atom : this.atom).getAtomName () + (this.isDuplicate ? "*(" + this.rootDistance + ")" : "") + (this.auxChirality == '~' ? "" : "" + this.auxChirality) + " " + this.elemNo + "]");
return (this.isDuplicate ? "(" + this.atom.getAtomName () + "." + this.rootDistance + ")" : this.atom.getAtomName ());
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"RULE_2_nXX_EQ_XX", ";9Be;19F;23Na;27Al;31P;45Sc;55Mn;59Co;75As;89Y;93Nb;98Tc;103Rh;127I;133Cs;141Pr;145Pm;159Tb;165Ho;169Tm;197Au;209Bi;209Po;210At;222Rn;223Fr;226Ra;227Ac;231Pa;232Th;and all > U (atomno > 92)",
"RULE_2_REDUCE_ISOTOPE_MASS_NUMBER", ";16O;52Cr;96Mo;175Lu;",
"NO_CHIRALITY", 0,
"TIED", 0,
"A_WINS", -1,
"B_WINS", 1,
"IGNORE", -2147483648,
"UNDETERMINED", -1,
"STEREO_R", 1,
"STEREO_S", 2,
"STEREO_M", 17,
"STEREO_P", 18,
"STEREO_Z", 13,
"STEREO_E", 14,
"STEREO_BOTH_RS", 3,
"STEREO_BOTH_EZ", 15,
"RULE_1a", 1,
"RULE_1b", 2,
"RULE_2", 3,
"RULE_3", 4,
"RULE_4a", 5,
"RULE_4b", 6,
"RULE_4c", 7,
"RULE_5", 8,
"RULE_6", 9,
"ruleNames",  Clazz.newArray (-1, ["", "1a", "1b", "2", "3", "4a", "4b", "4c", "5", "6"]),
"MAX_PATH", 50,
"SMALL_RING_MAX", 7);
});
