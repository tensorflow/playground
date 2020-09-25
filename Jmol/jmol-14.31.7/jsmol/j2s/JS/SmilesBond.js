Clazz.declarePackage ("JS");
Clazz.load (["JU.Edge"], "JS.SmilesBond", ["JS.InvalidSmilesException"], function () {
c$ = Clazz.decorateAsClass (function () {
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
Clazz.instantialize (this, arguments);
}, JS, "SmilesBond", JU.Edge);
c$.getBondOrderString = Clazz.defineMethod (c$, "getBondOrderString", 
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
c$.getBondTypeFromCode = Clazz.defineMethod (c$, "getBondTypeFromCode", 
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
Clazz.defineMethod (c$, "getAtom1", 
function () {
return this.atom1;
});
Clazz.defineMethod (c$, "set", 
function (bond) {
this.order = bond.order;
this.isNot = bond.isNot;
this.primitives = bond.primitives;
this.nPrimitives = bond.nPrimitives;
this.bondsOr = bond.bondsOr;
this.nBondsOr = bond.nBondsOr;
}, "JS.SmilesBond");
Clazz.defineMethod (c$, "setAtropType", 
function (nn) {
this.atropType =  Clazz.newIntArray (-1, [Clazz.doubleToInt (nn / 10) - 1, nn % 10 - 1]);
}, "~N");
Clazz.defineMethod (c$, "setPrimitive", 
function (i) {
var p = this.primitives[i];
this.order = p.order;
this.isNot = p.isNot;
this.atropType = p.atropType;
return p;
}, "~N");
Clazz.defineMethod (c$, "addBondOr", 
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
Clazz.defineMethod (c$, "addPrimitive", 
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
Clazz.overrideMethod (c$, "toString", 
function () {
return this.atom1 + " -" + (this.isNot ? "!" : "") + this.order + "- " + this.atom2;
});
Clazz.makeConstructor (c$, 
function (atom1, atom2, bondType, isNot) {
Clazz.superConstructor (this, JS.SmilesBond, []);
this.set2 (bondType, isNot);
this.set2a (atom1, atom2);
}, "JS.SmilesAtom,JS.SmilesAtom,~N,~B");
Clazz.defineMethod (c$, "set2", 
function (bondType, isNot) {
this.order = bondType;
this.isNot = isNot;
}, "~N,~B");
Clazz.defineMethod (c$, "set2a", 
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
Clazz.defineMethod (c$, "setAtom2", 
function (atom, molecule) {
this.atom2 = atom;
if (this.atom2 != null) {
atom.addBond (this);
this.isConnection = true;
}}, "JS.SmilesAtom,JS.SmilesSearch");
Clazz.defineMethod (c$, "isFromPreviousTo", 
function (atom) {
return (!this.isConnection && this.atom2 === atom);
}, "JS.SmilesAtom");
c$.isBondType = Clazz.defineMethod (c$, "isBondType", 
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
Clazz.defineMethod (c$, "getBondType", 
function () {
return this.order;
});
Clazz.defineMethod (c$, "getValence", 
function () {
return (this.order & 7);
});
Clazz.defineMethod (c$, "getOtherAtom", 
function (a) {
return (this.atom1 === a ? this.atom2 : this.atom1);
}, "JS.SmilesAtom");
Clazz.overrideMethod (c$, "getAtomIndex1", 
function () {
return this.atom1.index;
});
Clazz.overrideMethod (c$, "getAtomIndex2", 
function () {
return this.atom2.index;
});
Clazz.overrideMethod (c$, "getCovalentOrder", 
function () {
return this.order;
});
Clazz.overrideMethod (c$, "getOtherNode", 
function (atom) {
return (atom === this.atom1 ? this.atom2 : atom === this.atom2 || atom == null ? this.atom1 : null);
}, "JU.SimpleNode");
Clazz.overrideMethod (c$, "isCovalent", 
function () {
return this.order != 112;
});
Clazz.overrideMethod (c$, "isHydrogen", 
function () {
return this.order == 112;
});
Clazz.defineMethod (c$, "switchAtoms", 
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
Clazz.defineMethod (c$, "getRealCovalentOrder", 
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
Clazz.defineMethod (c$, "getMatchingBond", 
function () {
return this.matchingBond == null ? this : this.matchingBond;
});
Clazz.defineStatics (c$,
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
