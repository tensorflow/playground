Clazz.declarePackage ("JS");
Clazz.load (["java.util.Hashtable", "JU.BS", "JS.VTemp"], "JS.SmilesGenerator", ["JU.AU", "$.Lst", "$.SB", "JS.InvalidSmilesException", "$.SmilesAtom", "$.SmilesBond", "$.SmilesParser", "$.SmilesSearch", "$.SmilesStereo", "JU.BSUtil", "$.Elements", "$.JmolMolecule", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
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
Clazz.instantialize (this, arguments);
}, JS, "SmilesGenerator");
Clazz.prepareFields (c$, function () {
this.vTemp =  new JS.VTemp ();
this.bsBondsUp =  new JU.BS ();
this.bsBondsDn =  new JU.BS ();
this.htRingsSequence =  new java.util.Hashtable ();
this.htRings =  new java.util.Hashtable ();
this.bsRingKeys =  new JU.BS ();
});
Clazz.defineMethod (c$, "getSmiles", 
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
Clazz.defineMethod (c$, "getBioSmiles", 
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
if (Clazz.exceptionOf (e, Exception)) {
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
Clazz.defineMethod (c$, "addBracketedBioName", 
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
Clazz.defineMethod (c$, "getSmilesComponent", 
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
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("???");
s = s0;
} else {
throw e;
}
}
}return s;
}, "JU.Node,JU.BS,~B,~B,~B");
Clazz.defineMethod (c$, "generateRingData", 
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
Clazz.defineMethod (c$, "getBondStereochemistry", 
 function (bond, atomFrom) {
if (bond == null) return '\0';
var i = bond.index;
var isFirst = (atomFrom == null || bond.getAtomIndex1 () == atomFrom.getIndex ());
return (this.bsBondsUp.get (i) ? (isFirst ? '/' : '\\') : this.bsBondsDn.get (i) ? (isFirst ? '\\' : '/') : '\0');
}, "JU.Edge,JU.SimpleNode");
Clazz.defineMethod (c$, "setBondDirections", 
 function () {
var bsDone =  new JU.BS ();
var edges =  Clazz.newArray (2, 3, null);
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
var atom12 =  Clazz.newArray (-1, [atom1, atom2]);
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
Clazz.defineMethod (c$, "getSmilesAt", 
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
Clazz.defineMethod (c$, "swapArray", 
 function (a, i0, i1, i2) {
var n = i1 - i0;
if (this.atemp == null || this.atemp.length < n) this.atemp =  new Array (n);
for (var p = n, i = i1; p > 0; ) this.atemp[--p] = a[--i];

for (var i = i1; i < i2; i++) a[i - n] = a[i];

for (var p = n, i = i2; p > 0; ) a[--i] = this.atemp[--p];

}, "~A,~N,~N,~N");
Clazz.defineMethod (c$, "getBondOrder", 
 function (bondPrev, atomIndex, prevIndex, isAromatic) {
if (this.topologyOnly) return "";
if ((bondPrev.order & 65537) == 65537) {
return "^-";
}var border = bondPrev.getCovalentOrder ();
return (!isAromatic || !this.bsAromatic.get (prevIndex) ? JS.SmilesBond.getBondOrderString (border) : border == 1 && !this.isSameAromaticRing (atomIndex, prevIndex) ? "-" : this.aromaticDouble && (border == 2 || border == 514) ? "=" : "");
}, "JU.Edge,~N,~N,~B");
Clazz.defineMethod (c$, "isSameAromaticRing", 
 function (a1, a2) {
var bs;
for (var i = this.aromaticRings.size (); --i >= 0; ) if ((bs = this.aromaticRings.get (i)).get (a1) && bs.get (a2)) return true;

return false;
}, "~N,~N");
Clazz.defineMethod (c$, "sortBonds", 
function (atom, refAtom, center) {
if (this.smilesStereo == null) try {
this.smilesStereo = JS.SmilesStereo.newStereo (null);
} catch (e) {
if (Clazz.exceptionOf (e, JS.InvalidSmilesException)) {
} else {
throw e;
}
}
this.smilesStereo.sortBondsByStereo (atom, refAtom, center, atom.getEdges (), this.vTemp.vA);
}, "JU.SimpleNode,JU.SimpleNode,JU.P3");
Clazz.defineMethod (c$, "sortInorganic", 
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
axialPairs.addLast ( Clazz.newArray (-1, [bond1, bond2]));
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
Clazz.defineMethod (c$, "checkStereoPairs", 
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
Clazz.defineMethod (c$, "addStereoCheck", 
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
Clazz.defineMethod (c$, "getRingCache", 
 function (i0, i1, ht) {
var key = JS.SmilesGenerator.getRingKey (i0, i1);
var o = ht.get (key);
var s = (o == null ? null : o[0]);
if (s == null) {
this.bsRingKeys.set (++this.nPairs);
this.nPairsMax = Math.max (this.nPairs, this.nPairsMax);
ht.put (key,  Clazz.newArray (-1, [s = this.getRingPointer (this.nPairs), Integer.$valueOf (i1), Integer.$valueOf (this.nPairs)]));
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
Clazz.defineMethod (c$, "getRingPointer", 
 function (i) {
return (i < 10 ? "" + i : i < 100 ? "%" + i : "%(" + i + ")");
}, "~N");
Clazz.defineMethod (c$, "dumpRingKeys", 
 function (sb, ht) {
JU.Logger.info (sb.toString () + "\n\n");
for (var key, $key = ht.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) JU.Logger.info ("unmatched connection: " + key);

}, "JU.SB,java.util.Map");
c$.getRingKey = Clazz.defineMethod (c$, "getRingKey", 
function (i0, i1) {
return Math.min (i0, i1) + "_" + Math.max (i0, i1);
}, "~N,~N");
});
