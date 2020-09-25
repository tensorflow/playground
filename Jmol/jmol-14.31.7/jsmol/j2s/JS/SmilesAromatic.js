Clazz.declarePackage ("JS");
Clazz.load (null, "JS.SmilesAromatic", ["java.util.Hashtable", "JU.BS", "$.Lst", "$.Measure", "$.V3", "JS.SmilesRing", "$.SmilesRingSet", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz.declareType (JS, "SmilesAromatic");
c$.setAromatic = Clazz.defineMethod (c$, "setAromatic", 
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
c$.checkAromaticDefined = Clazz.defineMethod (c$, "checkAromaticDefined", 
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
c$.isSp2Ring = Clazz.defineMethod (c$, "isSp2Ring", 
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
c$.addNormal = Clazz.defineMethod (c$, "addNormal", 
 function (vTemp, vMean, maxDev) {
var similarity = vMean.dot (vTemp);
if (similarity != 0 && Math.abs (similarity) < maxDev) return false;
if (similarity < 0) vTemp.scale (-1);
vMean.add (vTemp);
vMean.normalize ();
return true;
}, "JU.V3,JU.V3,~N");
c$.checkStandardDeviation = Clazz.defineMethod (c$, "checkStandardDeviation", 
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
c$.checkHueckelAromatic = Clazz.defineMethod (c$, "checkHueckelAromatic", 
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
c$.finalizeAromatic = Clazz.defineMethod (c$, "finalizeAromatic", 
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
c$.removeBridgingRings = Clazz.defineMethod (c$, "removeBridgingRings", 
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
c$.checkBridges = Clazz.defineMethod (c$, "checkBridges", 
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
c$.checkFusedRings = Clazz.defineMethod (c$, "checkFusedRings", 
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
Clazz.defineStatics (c$,
"OS_PI_COUNTS",  Clazz.newArray (-1, [ Clazz.newIntArray (-1, [-2, 1, 0]),  Clazz.newIntArray (-1, [1, 2, 1, -1]),  Clazz.newIntArray (-1, [2, 1, 2, 1, 1]),  Clazz.newIntArray (-1, [2, 1]),  Clazz.newIntArray (-1, [-2, 1, 2, 1, -2]),  Clazz.newIntArray (-1, [2, 1, 2, 2])]));
});
