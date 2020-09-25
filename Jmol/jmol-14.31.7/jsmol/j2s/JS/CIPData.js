Clazz.declarePackage ("JS");
Clazz.load (["JU.BS", "$.V3"], "JS.CIPData", ["JU.Lst", "$.Measure", "$.P4", "JS.CIPChirality", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.testRule6Full = false;
this.vwr = null;
this.atoms = null;
this.bsAtoms = null;
this.bsMolecule = null;
this.bsAromatic = null;
this.bsXAromatic = null;
this.bsNegativeAromatic = null;
this.bsAzacyclic = null;
this.bsAtropisomeric = null;
this.bsHelixM = null;
this.bsHelixP = null;
this.lstSmallRings = null;
this.bsKekuleAmbiguous = null;
this.bsEnes = null;
this.vNorm = null;
this.vTemp = null;
Clazz.instantialize (this, arguments);
}, JS, "CIPData");
Clazz.prepareFields (c$, function () {
this.bsXAromatic =  new JU.BS ();
this.bsNegativeAromatic =  new JU.BS ();
this.bsAtropisomeric =  new JU.BS ();
this.bsKekuleAmbiguous =  new JU.BS ();
this.bsEnes =  new JU.BS ();
this.vNorm =  new JU.V3 ();
this.vTemp =  new JU.V3 ();
});
Clazz.defineMethod (c$, "isTracker", 
function () {
return false;
});
Clazz.defineMethod (c$, "isSmiles", 
function () {
return false;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (vwr, bsAtoms) {
this.vwr = vwr;
this.atoms = vwr.ms.at;
this.bsAtoms = bsAtoms;
this.bsMolecule = vwr.ms.getMoleculeBitSet (bsAtoms);
this.init ();
return this;
}, "JV.Viewer,JU.BS");
Clazz.defineMethod (c$, "init", 
function () {
try {
var lstRing = this.match ("[r]");
if (lstRing.isEmpty ()) {
this.lstSmallRings =  new Array (0);
} else {
this.lstSmallRings = this.getList ("*1**1||*1***1||*1****1||*1*****1||*1******1");
}this.bsAromatic = this.match ("a");
if (!this.bsAromatic.isEmpty ()) {
this.bsAtropisomeric = this.match ("[!H](.t1:-20,20)a{a(.t2:-20,20)-a}a[!H]");
this.bsHelixM = this.match ("A{a}(.t:-10,-40)a(.t:-10,-40)aaa");
this.bsHelixP = this.match ("A{a}(.t:10,40)a(.t:10,40)aaa");
this.bsXAromatic = this.match ("[r5v3n+0,r5v2o+0]");
this.bsNegativeAromatic = this.match ("[a-]");
if (!this.match ("[n+1,o+1]").isEmpty () && !this.bsXAromatic.isEmpty ()) {
this.bsKekuleAmbiguous.or (this.match ("a1[n+,o+]a[n,o]a1"));
this.bsKekuleAmbiguous.or (this.match ("a1[n+,o+][n,o]aa1"));
}if (!this.bsNegativeAromatic.isEmpty ()) this.bsKekuleAmbiguous.or (this.match ("a1=a[a-]a=a1"));
var lstR6a = this.getList ("a1aaaaa1");
for (var i = lstR6a.length; --i >= 0; ) {
this.bsKekuleAmbiguous.or (lstR6a[i]);
}
}this.getAzacyclic ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "getList", 
function (smarts) {
var level = JU.Logger.getLogLevel ();
JU.Logger.setLogLevel (Math.min (level, 4));
var list = this.vwr.getSubstructureSetArray (smarts, this.bsMolecule, 2);
JU.Logger.setLogLevel (level);
return list;
}, "~S");
Clazz.defineMethod (c$, "match", 
function (smarts) {
var level = JU.Logger.getLogLevel ();
JU.Logger.setLogLevel (Math.min (level, 4));
var bs = this.vwr.getSmartsMatch (smarts, this.bsMolecule);
JU.Logger.setLogLevel (level);
return bs;
}, "~S");
Clazz.defineMethod (c$, "getEneKekule", 
function () {
if (this.bsEnes.cardinality () < 8) return;
var bsAllEnes = this.bsEnes.clone ();
var bsPath =  new JU.BS ();
this.bsEnes.andNot (this.bsKekuleAmbiguous);
var bsEneAtom1 =  new JU.BS ();
for (var i = this.bsEnes.nextSetBit (0); i >= 0; i = this.bsEnes.nextSetBit (i + 1)) {
bsPath.clearAll ();
bsEneAtom1.clearAll ();
this.checkEne (bsAllEnes, bsPath, -1, i, 2, bsEneAtom1);
}
});
Clazz.defineMethod (c$, "checkEne", 
 function (bsAllEnes, bsPath, iLast, iAtom, order, bsEneAtom1) {
if (bsPath.get (iAtom)) return (bsEneAtom1.get (iAtom) == (order == 2) ? iAtom : -1);
bsPath.set (iAtom);
var a = this.atoms[iAtom];
var isLoop = -1;
var edges = a.getEdges ();
if (order == 2) bsEneAtom1.set (iAtom);
for (var ib = a.getBondCount (); --ib >= 0; ) {
if (this.getBondOrder (edges[ib]) != order) continue;
var b = edges[ib].getOtherNode (a);
var iNext = b.getIndex ();
if (iNext != iLast && bsAllEnes.get (iNext) && (isLoop = this.checkEne (bsAllEnes, bsPath, iAtom, iNext, 3 - order, bsEneAtom1)) >= 0) {
}}
if (isLoop >= 0) {
this.bsKekuleAmbiguous.set (iAtom);
this.bsEnes.clear (iAtom);
}return isLoop == iAtom ? -1 : isLoop;
}, "JU.BS,JU.BS,~N,~N,~N,JU.BS");
Clazz.defineMethod (c$, "getAzacyclic", 
 function () {
out : for (var i = this.bsAtoms.nextSetBit (0); i >= 0; i = this.bsAtoms.nextSetBit (i + 1)) {
var atom = this.atoms[i];
if (atom.getElementNumber () != 7 || atom.getCovalentBondCount () != 3 || this.bsKekuleAmbiguous.get (i)) continue;
var edges = atom.getEdges ();
for (var k = edges.length; --k >= 0; ) if (edges[k].getOtherNode (atom).getElementNumber () == 1) continue out;

var nRings =  new JU.Lst ();
for (var j = this.lstSmallRings.length; --j >= 0; ) {
var bsRing = this.lstSmallRings[j];
if (!bsRing.get (i)) continue;
nRings.addLast (bsRing);
if (j == 0) {
this.addAzacyclicN (i);
continue out;
}}
var nr = nRings.size ();
if (nr < 2) continue;
var bsSubs =  new JU.BS ();
var bonds = atom.getEdges ();
for (var b = bonds.length; --b >= 0; ) if (bonds[b].isCovalent ()) bsSubs.set (bonds[b].getOtherNode (atom).getIndex ());

var bsBoth =  new JU.BS ();
var bsAll =  new JU.BS ();
for (var j = 0; j < nr - 1; j++) {
var bs1 = nRings.get (j);
for (var k = j + 1; k < nr; k++) {
var bs2 = nRings.get (k);
JU.BSUtil.copy2 (bs1, bsBoth);
bsBoth.and (bs2);
if (bsBoth.cardinality () > 2) {
JU.BSUtil.copy2 (bs1, bsAll);
bsAll.or (bs2);
bsAll.and (bsSubs);
if (bsAll.cardinality () == 3) {
this.addAzacyclicN (i);
continue out;
}}}
}
}
});
Clazz.defineMethod (c$, "addAzacyclicN", 
 function (i) {
if (this.bsAzacyclic == null) this.bsAzacyclic =  new JU.BS ();
this.bsAzacyclic.set (i);
}, "~N");
Clazz.defineMethod (c$, "couldBeChiralAtom", 
function (a) {
var mustBePlanar = false;
switch (a.getCovalentBondCount ()) {
default:
System.out.println ("?? too many bonds! " + a);
return false;
case 0:
return false;
case 1:
return false;
case 2:
return a.getElementNumber () == 7;
case 3:
switch (a.getElementNumber ()) {
case 7:
if (this.bsAzacyclic != null && this.bsAzacyclic.get (a.getIndex ())) break;
return false;
case 6:
mustBePlanar = true;
break;
case 15:
case 16:
case 33:
case 34:
case 51:
case 52:
case 83:
case 84:
break;
case 4:
break;
default:
return false;
}
break;
case 4:
break;
}
var edges = a.getEdges ();
var nH = 0;
var haveDouble = false;
for (var j = edges.length; --j >= 0; ) {
if (mustBePlanar && edges[j].getCovalentOrder () == 2) haveDouble = true;
if (edges[j].getOtherNode (a).getIsotopeNumber () == 1) nH++;
}
return (nH < 2 && (haveDouble || this.isSmiles () || mustBePlanar == Math.abs (this.getTrigonality (a, this.vNorm)) < 0.2));
}, "JU.SimpleNode");
Clazz.defineMethod (c$, "couldBeChiralAlkene", 
function (a, edge) {
var b = (edge == null ? null : edge.getOtherNode (a));
switch (a.getCovalentBondCount ()) {
default:
return -1;
case 2:
if (a.getElementNumber () != 7) return -1;
break;
case 3:
if (!JS.CIPChirality.isFirstRow (a)) return -1;
break;
}
var bonds = a.getEdges ();
var n = 0;
for (var i = bonds.length; --i >= 0; ) if (this.getBondOrder (bonds[i]) == 2) {
if (++n > 1) return 17;
var other = bonds[i].getOtherNode (a);
if (!JS.CIPChirality.isFirstRow (other)) return -1;
if (b != null && (other !== b || b.getCovalentBondCount () == 1)) {
return -1;
}}
return 13;
}, "JU.SimpleNode,JU.SimpleEdge");
Clazz.defineMethod (c$, "getTrigonality", 
function (a, vNorm) {
var pts =  new Array (4);
var bonds = a.getEdges ();
for (var n = bonds.length, i = n, pt = 0; --i >= 0 && pt < 4; ) if (bonds[i].isCovalent ()) pts[pt++] = bonds[i].getOtherNode (a).getXYZ ();

var plane = JU.Measure.getPlaneThroughPoints (pts[0], pts[1], pts[2], vNorm, this.vTemp,  new JU.P4 ());
return JU.Measure.distanceToPlane (plane, (pts[3] == null ? a.getXYZ () : pts[3]));
}, "JU.SimpleNode,JU.V3");
Clazz.defineMethod (c$, "isCis", 
function (a, b, c, d) {
JU.Measure.getNormalThroughPoints (a.atom.getXYZ (), b.atom.getXYZ (), c.atom.getXYZ (), this.vNorm, this.vTemp);
var vNorm2 =  new JU.V3 ();
JU.Measure.getNormalThroughPoints (b.atom.getXYZ (), c.atom.getXYZ (), d.atom.getXYZ (), vNorm2, this.vTemp);
return (this.vNorm.dot (vNorm2) > 0 ? 13 : 14);
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "isPositiveTorsion", 
function (a, b, c, d) {
var angle = JU.Measure.computeTorsion (a.atom.getXYZ (), b.atom.getXYZ (), c.atom.getXYZ (), d.atom.getXYZ (), true);
return (angle > 0 ? 18 : 17);
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "getBondOrder", 
function (bond) {
return bond.getCovalentOrder ();
}, "JU.SimpleEdge");
Clazz.defineMethod (c$, "setCoord", 
function (atom1, atoms) {
return true;
}, "JU.SimpleNode,~A");
Clazz.defineMethod (c$, "checkHandedness", 
function (a) {
var atoms = a.atoms;
if (!this.setCoord (a.atom, atoms)) return 0;
var p0 = (atoms[3].atom == null ? a.atom : atoms[3].atom).getXYZ ();
var p1 = atoms[0].atom.getXYZ ();
var p2 = atoms[1].atom.getXYZ ();
var p3 = atoms[2].atom.getXYZ ();
JU.Measure.getNormalThroughPoints (p1, p2, p3, this.vNorm, this.vTemp);
this.vTemp.setT (p0);
this.vTemp.sub (p1);
return (this.vTemp.dot (this.vNorm) > 0 ? 1 : 2);
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "track", 
function (cip, a, b, sphere, finalScore, trackTerminal) {
}, "JS.CIPChirality,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,~N,~N,~B");
Clazz.defineMethod (c$, "getRootTrackerResult", 
function (root) {
return null;
}, "JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "setRule6Full", 
function (rrrr) {
this.testRule6Full = rrrr;
}, "~B");
Clazz.defineStatics (c$,
"TRIGONALITY_MIN", 0.2);
});
