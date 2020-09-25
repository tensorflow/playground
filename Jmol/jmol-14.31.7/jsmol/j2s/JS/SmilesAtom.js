Clazz.declarePackage ("JS");
Clazz.load (["JU.P3", "JU.Node"], "JS.SmilesAtom", ["java.lang.Float", "JU.AU", "JU.Elements", "$.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
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
Clazz.instantialize (this, arguments);
}, JS, "SmilesAtom", JU.P3, JU.Node);
Clazz.prepareFields (c$, function () {
this.bonds =  new Array (4);
});
c$.allowSmilesUnbracketed = Clazz.defineMethod (c$, "allowSmilesUnbracketed", 
function (xx) {
return ("B, C, N, O, P, S, F, Cl, Br, I, *,".indexOf (xx + ",") >= 0);
}, "~S");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JS.SmilesAtom, []);
});
Clazz.overrideMethod (c$, "getAtomType", 
function () {
return (this.atomType == null ? this.bioAtomName : this.atomType);
});
Clazz.defineMethod (c$, "getChiralClass", 
function () {
return (this.stereo == null ? -2147483648 : this.stereo.getChiralClass (this));
});
Clazz.defineMethod (c$, "isDefined", 
function () {
return (this.hasSubpattern || this.iNested != 0 || this.isBioAtom || this.component != -2147483648 || this.elementNumber != -2 || this.nSubAtoms > 0);
});
Clazz.defineMethod (c$, "setBioAtom", 
function (bioType) {
this.isBioAtom = (bioType != '\0');
this.bioType = bioType;
if (this.parent != null) {
this.parent.bioType = bioType;
this.parent.isBioAtom = this.isBioAtom;
this.parent.isBioAtomWild = this.isBioAtomWild;
}}, "~S");
Clazz.defineMethod (c$, "setAtomName", 
function (name) {
if (name == null) return;
if (name.length > 0) this.bioAtomName = name;
if (name.equals ("\0")) this.$isLeadAtom = true;
if (this.parent != null) {
this.parent.bioAtomName = name;
}}, "~S");
Clazz.defineMethod (c$, "setBonds", 
function (bonds) {
this.bonds = bonds;
}, "~A");
Clazz.defineMethod (c$, "addSubAtom", 
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
Clazz.defineMethod (c$, "setIndex", 
function (index) {
this.index = index;
return this;
}, "~N");
Clazz.defineMethod (c$, "setTopoAtom", 
function (iComponent, ptAtom, symbol, charge, patternIndex) {
this.component = iComponent;
this.index = ptAtom;
this.patternIndex = patternIndex;
this.setSymbol (symbol);
this.charge = charge;
this.isTopoAtom = true;
return this;
}, "~N,~N,~S,~N,~N");
Clazz.defineMethod (c$, "setHydrogenCount", 
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
c$.getDefaultCount = Clazz.defineMethod (c$, "getDefaultCount", 
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
Clazz.overrideMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz.defineMethod (c$, "setSymbol", 
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
Clazz.overrideMethod (c$, "getElementNumber", 
function () {
return this.elementNumber;
});
Clazz.defineMethod (c$, "getAtomicMass", 
function () {
return this.atomicMass;
});
Clazz.overrideMethod (c$, "getAtomNumber", 
function () {
return this.atomNumber;
});
Clazz.defineMethod (c$, "setAtomicMass", 
function (mass) {
this.atomicMass = mass;
}, "~N");
Clazz.defineMethod (c$, "getCharge", 
function () {
return this.charge;
});
Clazz.defineMethod (c$, "setCharge", 
function (charge) {
this.charge = charge;
}, "~N");
Clazz.defineMethod (c$, "getMatchingAtomIndex", 
function () {
return this.matchingIndex;
});
Clazz.defineMethod (c$, "getMatchingAtom", 
function () {
return this.matchingNode == null ? this : this.matchingNode;
});
Clazz.defineMethod (c$, "setMatchingAtom", 
function (jmolAtom, index) {
this.matchingNode = jmolAtom;
this.matchingIndex = index;
}, "JU.Node,~N");
Clazz.defineMethod (c$, "setExplicitHydrogenCount", 
function (count) {
this.explicitHydrogenCount = count;
}, "~N");
Clazz.defineMethod (c$, "setImplicitHydrogenCount", 
function (count) {
this.implicitHydrogenCount = count;
}, "~N");
Clazz.defineMethod (c$, "setDegree", 
function (degree) {
this.degree = degree;
}, "~N");
Clazz.defineMethod (c$, "setNonhydrogenDegree", 
function (degree) {
this.nonhydrogenDegree = degree;
}, "~N");
Clazz.defineMethod (c$, "setValence", 
function (valence) {
this.valence = valence;
}, "~N");
Clazz.defineMethod (c$, "setConnectivity", 
function (connectivity) {
this.connectivity = connectivity;
}, "~N");
Clazz.defineMethod (c$, "setRingMembership", 
function (rm) {
this.ringMembership = rm;
}, "~N");
Clazz.defineMethod (c$, "setRingSize", 
function (rs) {
this.ringSize = rs;
if (this.ringSize == 500 || this.ringSize == 600) this.isAromatic = true;
}, "~N");
Clazz.defineMethod (c$, "setRingConnectivity", 
function (rc) {
this.ringConnectivity = rc;
}, "~N");
Clazz.overrideMethod (c$, "getModelIndex", 
function () {
return this.component;
});
Clazz.overrideMethod (c$, "getMoleculeNumber", 
function (inModel) {
return this.component;
}, "~B");
Clazz.overrideMethod (c$, "getAtomSite", 
function () {
return this.atomSite;
});
Clazz.overrideMethod (c$, "getFormalCharge", 
function () {
return this.charge;
});
Clazz.overrideMethod (c$, "getIsotopeNumber", 
function () {
return this.atomicMass;
});
Clazz.overrideMethod (c$, "getAtomicAndIsotopeNumber", 
function () {
return JU.Elements.getAtomicAndIsotopeNumber (this.elementNumber, this.atomicMass);
});
Clazz.overrideMethod (c$, "getAtomName", 
function () {
return this.bioAtomName == null ? "" : this.bioAtomName;
});
Clazz.overrideMethod (c$, "getGroup3", 
function (allowNull) {
return this.residueName == null ? "" : this.residueName;
}, "~B");
Clazz.overrideMethod (c$, "getGroup1", 
function (c0) {
return this.residueChar == null ? "" : this.residueChar;
}, "~S");
Clazz.defineMethod (c$, "addBond", 
function (bond) {
if (this.bondCount >= this.bonds.length) this.bonds = JU.AU.doubleLength (this.bonds);
this.bonds[this.bondCount] = bond;
this.bondCount++;
}, "JS.SmilesBond");
Clazz.defineMethod (c$, "setBondArray", 
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
Clazz.overrideMethod (c$, "getEdges", 
function () {
return (this.parent != null ? this.parent.getEdges () : this.bonds);
});
Clazz.defineMethod (c$, "getBond", 
function (number) {
return (this.parent != null ? this.parent.getBond (number) : number >= 0 && number < this.bondCount ? this.bonds[number] : null);
}, "~N");
Clazz.overrideMethod (c$, "getCovalentBondCount", 
function () {
return this.getBondCount ();
});
Clazz.overrideMethod (c$, "getBondCount", 
function () {
return (this.parent != null ? this.parent.getBondCount () : this.bondCount);
});
Clazz.overrideMethod (c$, "getCovalentBondCountPlusMissingH", 
function () {
return this.getBondCount () + (this.isTopoAtom ? 0 : this.missingHydrogenCount);
});
Clazz.overrideMethod (c$, "getTotalHydrogenCount", 
function () {
return this.getCovalentHydrogenCount () + (this.isTopoAtom ? 0 : this.missingHydrogenCount);
});
Clazz.overrideMethod (c$, "getImplicitHydrogenCount", 
function () {
return this.implicitHydrogenCount;
});
Clazz.defineMethod (c$, "getExplicitHydrogenCount", 
function () {
return this.explicitHydrogenCount;
});
Clazz.defineMethod (c$, "getMatchingBondedAtom", 
function (i) {
if (this.parent != null) return this.parent.getMatchingBondedAtom (i);
if (i >= this.bondCount) return -1;
var b = this.bonds[i];
return (b.atom1 === this ? b.atom2 : b.atom1).matchingIndex;
}, "~N");
Clazz.overrideMethod (c$, "getBondedAtomIndex", 
function (j) {
return (this.parent != null ? this.parent.getBondedAtomIndex (j) : this.bonds[j].getOtherAtom (this).index);
}, "~N");
Clazz.overrideMethod (c$, "getCovalentHydrogenCount", 
function () {
if (this.covalentHydrogenCount >= 0) return this.covalentHydrogenCount;
if (this.parent != null) return (this.covalentHydrogenCount = this.parent.getCovalentHydrogenCount ());
this.covalentHydrogenCount = 0;
for (var k = 0; k < this.bonds.length; k++) if (this.bonds[k].getOtherAtom (this).elementNumber == 1) this.covalentHydrogenCount++;

return this.covalentHydrogenCount;
});
Clazz.overrideMethod (c$, "getValence", 
function () {
if (this.parent != null) return this.parent.getValence ();
var n = this.valence;
if (n <= 0 && this.bonds != null) for (var i = this.bonds.length; --i >= 0; ) n += this.bonds[i].getValence ();

this.valence = n;
return n;
});
Clazz.overrideMethod (c$, "getTotalValence", 
function () {
return this.getValence () + (this.isTopoAtom ? 0 : this.missingHydrogenCount);
});
Clazz.defineMethod (c$, "getBondTo", 
function (atom) {
if (this.parent != null) return this.parent.getBondTo (atom);
var bond;
for (var k = 0; k < this.bonds.length; k++) {
if ((bond = this.bonds[k]) == null) continue;
if (atom == null ? bond.atom2 === this : bond.getOtherAtom (this) === atom) return bond;
}
return null;
}, "JS.SmilesAtom");
Clazz.defineMethod (c$, "getBondNotTo", 
function (atom, allowH) {
var bond;
for (var k = 0; k < this.bonds.length; k++) {
if ((bond = this.bonds[k]) == null) continue;
var atom2 = bond.getOtherAtom (this);
if (atom !== atom2 && (allowH || atom2.elementNumber != 1)) return bond;
}
return null;
}, "JS.SmilesAtom,~B");
Clazz.overrideMethod (c$, "isLeadAtom", 
function () {
return this.$isLeadAtom;
});
Clazz.overrideMethod (c$, "getOffsetResidueAtom", 
function (name, offset) {
if (this.isBioAtom) {
if (offset == 0) return this.index;
for (var k = 0; k < this.bonds.length; k++) if (this.bonds[k].getAtomIndex1 () == this.index && this.bonds[k].order == 96) return this.bonds[k].getOtherAtom (this).index;

}return -1;
}, "~S,~N");
Clazz.overrideMethod (c$, "getGroupBits", 
function (bs) {
bs.set (this.index);
return;
}, "JU.BS");
Clazz.overrideMethod (c$, "isCrossLinked", 
function (node) {
var bond = this.getBondTo (node);
return bond.isHydrogen ();
}, "JU.Node");
Clazz.overrideMethod (c$, "getCrossLinkVector", 
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
Clazz.overrideMethod (c$, "getBioStructureTypeName", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getInsertionCode", 
function () {
return this.insCode;
});
Clazz.overrideMethod (c$, "getResno", 
function () {
return this.residueNumber;
});
Clazz.overrideMethod (c$, "getChainID", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getChainIDStr", 
function () {
return "";
});
c$.getAtomLabel = Clazz.defineMethod (c$, "getAtomLabel", 
function (atomicNumber, isotopeNumber, valence, charge, osclass, nH, isAromatic, stereo) {
var sym = JU.Elements.elementSymbolFromNumber (atomicNumber);
if (isAromatic) {
sym = sym.toLowerCase ();
if (atomicNumber != 6) valence = 2147483647;
}var count = (valence == 2147483647 || isotopeNumber != 0 || charge != 0 || !Float.isNaN (osclass) || stereo != null && stereo.length > 0 ? -1 : JS.SmilesAtom.getDefaultCount (atomicNumber, false));
return (count == valence ? sym : "[" + (isotopeNumber <= 0 ? "" : "" + isotopeNumber) + sym + (stereo == null ? "" : stereo) + (nH > 1 ? "H" + nH : nH == 1 ? "H" : "") + (charge < 0 && charge != -2147483648 ? "" + charge : charge > 0 ? "+" + charge : "") + (Float.isNaN (osclass) ? "" : ":" + Clazz.floatToInt (osclass)) + "]");
}, "~N,~N,~N,~N,~N,~N,~B,~S");
Clazz.overrideMethod (c$, "getBioSmilesType", 
function () {
return this.bioType;
});
Clazz.defineMethod (c$, "isNucleic", 
function () {
return this.bioType == 'n' || this.bioType == 'r' || this.bioType == 'd';
});
Clazz.overrideMethod (c$, "isPurine", 
function () {
return this.residueChar != null && this.isNucleic () && "AG".indexOf (this.residueChar) >= 0;
});
Clazz.overrideMethod (c$, "isPyrimidine", 
function () {
return this.residueChar != null && this.isNucleic () && "CTUI".indexOf (this.residueChar) >= 0;
});
Clazz.overrideMethod (c$, "isDeleted", 
function () {
return false;
});
Clazz.overrideMethod (c$, "findAtomsLike", 
function (substring) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
var s = (this.residueChar != null || this.residueName != null ? (this.residueChar == null ? this.residueName : this.residueChar) + "." + this.bioAtomName : (this.bioAtomName != null && this.atomNumber != -2147483648 ? null : this.elementNumber == -1 ? "A" : this.elementNumber == -2 ? "*" : JU.Elements.elementSymbolFromNumber (this.elementNumber)));
if (s == null) return this.bioAtomName + " #" + this.atomNumber;
if (this.isAromatic) s = s.toLowerCase ();
var s2 = "";
for (var i = 0; i < this.bondCount; i++) s2 += this.bonds[i].getOtherAtom (this).index + ", ";

return "[" + s + '.' + this.index + (this.matchingIndex >= 0 ? "(" + this.matchingNode + ")" : "") + "]" + s2 + "(" + this.x + "," + this.y + "," + this.z + ")";
});
Clazz.overrideMethod (c$, "getFloatProperty", 
function (property) {
if (property === "property_atomclass") return this.atomClass;
return NaN;
}, "~S");
Clazz.overrideMethod (c$, "getMass", 
function () {
return this.atomicMass;
});
Clazz.overrideMethod (c$, "getCIPChirality", 
function (doCalculate) {
return JV.JC.getCIPChiralityName (this.cipChirality & -225);
}, "~B");
Clazz.overrideMethod (c$, "setCIPChirality", 
function (c) {
this.cipChirality = c;
}, "~N");
Clazz.overrideMethod (c$, "getCIPChiralityCode", 
function () {
return this.cipChirality;
});
Clazz.overrideMethod (c$, "getXYZ", 
function () {
return this;
});
Clazz.defineMethod (c$, "getStereo", 
function () {
return this.stereo;
});
Clazz.defineMethod (c$, "getPatternIndex", 
function () {
return this.patternIndex;
});
Clazz.overrideMethod (c$, "modelIsRawPDB", 
function () {
return false;
});
Clazz.defineStatics (c$,
"UNBRACKETED_SET", "B, C, N, O, P, S, F, Cl, Br, I, *,");
});
