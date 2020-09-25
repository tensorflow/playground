Clazz.declarePackage ("JU");
Clazz.load (["JU.Elements"], "JU.JmolMolecule", ["java.lang.Character", "java.util.Hashtable", "JU.AU", "$.BS", "$.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nodes = null;
this.moleculeIndex = 0;
this.modelIndex = 0;
this.indexInModel = 0;
this.firstAtomIndex = 0;
this.ac = 0;
this.nElements = 0;
this.elementCounts = null;
this.altElementCounts = null;
this.elementNumberMax = 0;
this.altElementMax = 0;
this.mf = null;
this.atomList = null;
Clazz.instantialize (this, arguments);
}, JU, "JmolMolecule");
Clazz.prepareFields (c$, function () {
this.elementCounts =  Clazz.newIntArray (JU.Elements.elementNumberMax, 0);
this.altElementCounts =  Clazz.newIntArray (JU.Elements.altElementMax, 0);
});
Clazz.makeConstructor (c$, 
function () {
});
c$.getMolecules = Clazz.defineMethod (c$, "getMolecules", 
function (atoms, bsModelAtoms, biobranches, bsExclude) {
var bsToTest = null;
var bsBranch =  new JU.BS ();
var thisModelIndex = -1;
var indexInModel = 0;
var moleculeCount = 0;
var molecules =  new Array (4);
if (bsExclude == null) bsExclude =  new JU.BS ();
for (var i = 0; i < atoms.length; i++) if (!bsExclude.get (i) && !bsBranch.get (i)) {
if (atoms[i].isDeleted ()) {
bsExclude.set (i);
continue;
}var modelIndex = atoms[i].getModelIndex ();
if (modelIndex != thisModelIndex) {
thisModelIndex = modelIndex;
indexInModel = 0;
bsToTest = bsModelAtoms[modelIndex];
}bsBranch = JU.JmolMolecule.getBranchBitSet (atoms, i, bsToTest, biobranches, -1, true, true);
if (bsBranch.nextSetBit (0) >= 0) {
molecules = JU.JmolMolecule.addMolecule (molecules, moleculeCount++, atoms, i, bsBranch, modelIndex, indexInModel++, bsExclude);
}}
return JU.JmolMolecule.allocateArray (molecules, moleculeCount);
}, "~A,~A,JU.Lst,JU.BS");
c$.getBranchBitSet = Clazz.defineMethod (c$, "getBranchBitSet", 
function (atoms, atomIndex, bsToTest, biobranches, atomIndexNot, allowCyclic, allowBioResidue) {
var bs = JU.BS.newN (atoms.length);
if (atomIndex < 0) return bs;
if (atomIndexNot >= 0) bsToTest.clear (atomIndexNot);
return (JU.JmolMolecule.getCovalentlyConnectedBitSet (atoms, atoms[atomIndex], bsToTest, allowCyclic, allowBioResidue, biobranches, bs) ? bs :  new JU.BS ());
}, "~A,~N,JU.BS,JU.Lst,~N,~B,~B");
c$.addMolecule = Clazz.defineMethod (c$, "addMolecule", 
function (molecules, iMolecule, atoms, iAtom, bsBranch, modelIndex, indexInModel, bsExclude) {
bsExclude.or (bsBranch);
if (iMolecule == molecules.length) molecules = JU.JmolMolecule.allocateArray (molecules, iMolecule * 2 + 1);
molecules[iMolecule] = JU.JmolMolecule.initialize (atoms, iMolecule, iAtom, bsBranch, modelIndex, indexInModel);
return molecules;
}, "~A,~N,~A,~N,JU.BS,~N,~N,JU.BS");
c$.getMolecularFormulaAtoms = Clazz.defineMethod (c$, "getMolecularFormulaAtoms", 
function (atoms, bsSelected, wts, isEmpirical) {
var m =  new JU.JmolMolecule ();
m.nodes = atoms;
m.atomList = bsSelected;
return m.getMolecularFormula (false, wts, isEmpirical);
}, "~A,JU.BS,~A,~B");
Clazz.defineMethod (c$, "getMolecularFormula", 
function (includeMissingHydrogens, wts, isEmpirical) {
if (this.mf != null) return this.mf;
if (this.atomList == null) {
this.atomList =  new JU.BS ();
this.atomList.setBits (0, this.nodes.length);
}this.elementCounts =  Clazz.newIntArray (JU.Elements.elementNumberMax, 0);
this.altElementCounts =  Clazz.newIntArray (JU.Elements.altElementMax, 0);
this.ac = this.atomList.cardinality ();
this.nElements = 0;
for (var p = 0, i = this.atomList.nextSetBit (0); i >= 0; i = this.atomList.nextSetBit (i + 1), p++) {
var node = this.nodes[i];
if (node == null) continue;
var n = node.getAtomicAndIsotopeNumber ();
var f = (wts == null ? 1 : Clazz.floatToInt (8 * wts[p]));
if (n < JU.Elements.elementNumberMax) {
if (this.elementCounts[n] == 0) this.nElements++;
this.elementCounts[n] += f;
this.elementNumberMax = Math.max (this.elementNumberMax, n);
if (includeMissingHydrogens) {
var nH = node.getImplicitHydrogenCount ();
if (nH > 0) {
if (this.elementCounts[1] == 0) this.nElements++;
this.elementCounts[1] += nH * f;
}}} else {
n = JU.Elements.altElementIndexFromNumber (n);
if (this.altElementCounts[n] == 0) this.nElements++;
this.altElementCounts[n] += f;
this.altElementMax = Math.max (this.altElementMax, n);
}}
if (wts != null) for (var i = 1; i <= this.elementNumberMax; i++) {
var c = Clazz.doubleToInt (this.elementCounts[i] / 8);
if (c * 8 != this.elementCounts[i]) return "?";
this.elementCounts[i] = c;
}
if (isEmpirical) {
var min = 2;
var ok = true;
while (ok) {
min = 100000;
var c;
for (var i = 1; i <= this.elementNumberMax; i++) if ((c = this.elementCounts[i]) > 0 && c < min) min = c;

if (min == 1) break;
var j = min;
for (; j > 1; j--) {
ok = true;
for (var i = 1; i <= this.elementNumberMax && ok; i++) if (Clazz.doubleToInt ((c = this.elementCounts[i]) / j) * j != c) ok = false;

if (ok) {
for (var i = 1; i <= this.elementNumberMax; i++) this.elementCounts[i] /= j;

break;
}}
}
}var mf = "";
var sep = "";
var nX;
for (var i = 1; i <= this.elementNumberMax; i++) {
nX = this.elementCounts[i];
if (nX != 0) {
mf += sep + JU.Elements.elementSymbolFromNumber (i) + " " + nX;
sep = " ";
}}
for (var i = 1; i <= this.altElementMax; i++) {
nX = this.altElementCounts[i];
if (nX != 0) {
mf += sep + JU.Elements.elementSymbolFromNumber (JU.Elements.altElementNumberFromIndex (i)) + " " + nX;
sep = " ";
}}
return mf;
}, "~B,~A,~B");
c$.initialize = Clazz.defineMethod (c$, "initialize", 
 function (nodes, moleculeIndex, firstAtomIndex, atomList, modelIndex, indexInModel) {
var jm =  new JU.JmolMolecule ();
jm.nodes = nodes;
jm.firstAtomIndex = firstAtomIndex;
jm.atomList = atomList;
jm.ac = atomList.cardinality ();
jm.moleculeIndex = moleculeIndex;
jm.modelIndex = modelIndex;
jm.indexInModel = indexInModel;
return jm;
}, "~A,~N,~N,JU.BS,~N,~N");
c$.getCovalentlyConnectedBitSet = Clazz.defineMethod (c$, "getCovalentlyConnectedBitSet", 
 function (atoms, atom, bsToTest, allowCyclic, allowBioResidue, biobranches, bsResult) {
var atomIndex = atom.getIndex ();
if (!bsToTest.get (atomIndex)) return allowCyclic;
if (!allowBioResidue && atom.getBioStructureTypeName ().length > 0) return allowCyclic;
bsToTest.clear (atomIndex);
if (biobranches != null && !bsResult.get (atomIndex)) {
for (var i = biobranches.size (); --i >= 0; ) {
var b = biobranches.get (i);
if (b.get (atomIndex)) {
bsResult.or (b);
bsToTest.andNot (b);
for (var j = b.nextSetBit (0); j >= 0; j = b.nextSetBit (j + 1)) {
var atom1 = atoms[j];
bsToTest.set (j);
JU.JmolMolecule.getCovalentlyConnectedBitSet (atoms, atom1, bsToTest, allowCyclic, allowBioResidue, biobranches, bsResult);
bsToTest.clear (j);
}
break;
}}
}bsResult.set (atomIndex);
var bonds = atom.getEdges ();
if (bonds == null) return true;
for (var i = bonds.length; --i >= 0; ) {
var bond = bonds[i];
if (bond != null && bond.isCovalent () && !JU.JmolMolecule.getCovalentlyConnectedBitSet (atoms, bond.getOtherNode (atom), bsToTest, allowCyclic, allowBioResidue, biobranches, bsResult)) return false;
}
return true;
}, "~A,JU.Node,JU.BS,~B,~B,JU.Lst,JU.BS");
c$.allocateArray = Clazz.defineMethod (c$, "allocateArray", 
 function (molecules, len) {
return (len == molecules.length ? molecules : JU.AU.arrayCopyObject (molecules, len));
}, "~A,~N");
c$.getBitSetForMF = Clazz.defineMethod (c$, "getBitSetForMF", 
function (at, bsAtoms, mf) {
var map =  new java.util.Hashtable ();
var ch;
var isDigit;
mf = JU.PT.rep (JU.PT.clean (mf + "Z"), " ", "");
for (var i = 0, pt = 0, pt0 = 0, n = mf.length; i < n; i++) {
if ((isDigit = Character.isDigit ((ch = mf.charAt (i)))) || i > 0 && Character.isUpperCase (ch)) {
pt0 = i;
var s = mf.substring (pt, pt0).trim ();
if (isDigit) while (i < n && Character.isDigit (mf.charAt (i))) i++;

pt = i;
map.put (s,  Clazz.newIntArray (-1, [isDigit ? JU.PT.parseInt (mf.substring (pt0, pt)) : 1]));
}}
var bs =  new JU.BS ();
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var a = at[i].getElementSymbol ();
var c = map.get (a);
if (c == null || c[0]-- < 1) continue;
bs.set (i);
}
for (var e, $e = map.values ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e[0] > 0) return  new JU.BS ();

return bs;
}, "~A,JU.BS,~S");
});
