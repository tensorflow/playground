Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (null, "J.adapter.readers.quantum.NBOParser", ["java.util.Hashtable", "JU.Lst", "$.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.haveBeta = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "NBOParser");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (vwr) {
this.vwr = vwr;
return this;
}, "JV.Viewer");
Clazz.defineMethod (c$, "getAllStructures", 
function (output, list) {
if (output == null) return null;
if (list == null) list =  new JU.Lst ();
output = JU.PT.rep (output, "the $CHOOSE", "");
this.getStructures (this.getBlock (output, "$CHOOSE"), "CHOOSE", list);
this.getStructures (this.getBlock (output, "$NRTSTR"), "NRTSTR", list);
this.getStructures (this.getBlock (output, "$NRTSTRA"), "NRTSTRA", list);
this.getStructures (this.getBlock (output, "$NRTSTRB"), "NRTSTRB", list);
this.getStructuresTOPO (this.getData (output, "TOPO matrix", "* Total *", 1), "RSA", list);
this.getStructuresTOPO (this.getData (output, "TOPO matrix", "* Total *", 2), "RSB", list);
return list;
}, "~S,JU.Lst");
Clazz.defineMethod (c$, "getBlock", 
 function (output, key) {
var pt = output.indexOf (key);
var pt1 = output.indexOf ("$END", pt + 1);
return (pt < 0 || pt1 < 0 ? null : output.substring (pt + key.length, pt1));
}, "~S,~S");
c$.getStructures46 = Clazz.defineMethod (c$, "getStructures46", 
function (tokens, type, structures, nAtoms) {
if (tokens == null) return;
var htData =  new java.util.Hashtable ();
structures.addLast (htData);
var matrix =  Clazz.newIntArray (nAtoms, nAtoms, 0);
htData.put ("matrix", matrix);
htData.put ("type", type);
htData.put ("spin", type);
htData.put ("index", Integer.$valueOf (0));
for (var n = tokens.length, i = 0; i < n; i++) {
var org = tokens[i];
if (org.contains ("(ry)")) break;
if (org.contains ("*") || org.contains ("(cr)")) continue;
var isLP = org.endsWith ("(lp)");
if (isLP || org.endsWith ("(lv)")) {
var ia = J.adapter.readers.quantum.NBOParser.getAtomIndex (org.substring (0, org.length - 4));
matrix[ia][ia] += (isLP ? 1 : 10);
continue;
}var names = JU.PT.split (org, "-");
if (names.length == 3) {
System.out.println ("NBOParser 3-center bonnd " + org + " ignored for Kekule structure");
continue;
}var ia = J.adapter.readers.quantum.NBOParser.getAtomIndex (names[0]);
var ib = J.adapter.readers.quantum.NBOParser.getAtomIndex (names[1]);
matrix[ia][ib]++;
}
J.adapter.readers.quantum.NBOParser.dumpMatrix (type, 0, matrix);
}, "~A,~S,JU.Lst,~N");
c$.getAtomIndex = Clazz.defineMethod (c$, "getAtomIndex", 
 function (xx99) {
for (var n = xx99.length, i = n, val = 0, pow = 1, ch = 0; --i >= 0; ) {
if ((ch = xx99.charCodeAt (i)) < 48 || ch > 57) return val - 1;
val += (ch - 48) * pow;
pow *= 10;
}
return 0;
}, "~S");
Clazz.defineMethod (c$, "getStructuresTOPO", 
 function (data, nrtType, list) {
if (data == null || data.length == 0) return;
var parts = JU.PT.split (data, "Resonance");
if (parts.length < 2) return;
var pt = parts[0].lastIndexOf (".");
var nAtoms = JU.PT.parseInt (parts[0].substring (pt - 3, pt));
if (nAtoms < 0) return;
var tokens = JU.PT.getTokens (JU.PT.rep (JU.PT.rep (parts[0], ".", ".1"), "Atom", "-1"));
var raw =  Clazz.newFloatArray (tokens.length, 0);
var n = JU.PT.parseFloatArrayInfested (tokens, raw);
var table =  Clazz.newIntArray (nAtoms, nAtoms, 0);
var atom1 = -1;
var atom2 = 0;
var atom0 = 0;
for (var i = 0; i < n; i++) {
var f = raw[i];
if (f < 0) {
atom1 = -1;
continue;
}if (f % 1 == 0) {
if (atom1 == -1) {
atom0 = Clazz.floatToInt (f);
atom1 = -2;
}if (atom1 < 0) continue;
table[atom1][atom2++] = Clazz.floatToInt (f);
} else {
atom1 = Clazz.floatToInt (f - 1);
atom2 = atom0 - 1;
}}
var matrix = null;
tokens = parts[1].$plit ("\n");
var s = "";
for (var i = 3; i < tokens.length; i++) if (tokens[i].indexOf ("--") < 0) s += tokens[i].substring (10) + "\n";

s = s.$replace ('-', ' ');
s = JU.PT.rep (s, ".", ".1");
s = JU.PT.rep (s, "(", " -1 ");
s = JU.PT.rep (s, ")", " -2 ");
s = JU.PT.rep (s, ",", " -3 ");
tokens = JU.PT.getTokens (s);
raw =  Clazz.newFloatArray (tokens.length, 0);
n = JU.PT.parseFloatArrayInfested (tokens, raw);
var htData = null;
var dir = 1;
atom1 = atom2 = -1;
for (var i = 0, index = 0; i < n; i++) {
var f = raw[i];
var remain = f % 1;
if (remain == 0) {
var v = Clazz.floatToInt (f);
switch (v) {
case -1:
dir = -1;
atom1 = atom2 = -1;
continue;
case -2:
break;
case -3:
if (atom1 < 0) continue;
break;
default:
if (atom1 < 0) {
atom1 = atom2 = v - 1;
} else {
atom2 = v - 1;
}continue;
}
matrix[atom1][atom2] += dir;
atom1 = atom2 = -1;
dir = 1;
} else {
if (htData == null) matrix = table;
J.adapter.readers.quantum.NBOParser.dumpMatrix (nrtType, index, matrix);
if (raw[i + 2] == 0) break;
list.addLast (htData =  new java.util.Hashtable ());
s = "" + (Clazz.floatToInt (f) * 100 + Clazz.doubleToInt ((remain - 0.0999999) * 1000));
var len = s.length;
s = (len == 2 ? "0" : "") + s.substring (0, len - 2) + "." + s.substring (len - 2);
htData.put ("weight", s);
htData.put ("index", Integer.$valueOf (index++));
htData.put ("type", nrtType.toLowerCase ());
htData.put ("spin", nrtType.indexOf ("B") >= 0 ? "beta" : "alpha");
matrix =  Clazz.newIntArray (nAtoms, nAtoms, 0);
htData.put ("matrix", matrix);
for (var j = 0; j < nAtoms; j++) for (var k = 0; k < nAtoms; k++) matrix[j][k] = table[j][k];


}}
}, "~S,~S,JU.Lst");
c$.dumpMatrix = Clazz.defineMethod (c$, "dumpMatrix", 
 function (nrtType, index, matrix) {
System.out.println ("NBOParser matrix " + nrtType + " " + index);
for (var j = 0, nAtoms = matrix.length; j < nAtoms; j++) System.out.println (JU.PT.toJSON (null, matrix[j]));

System.out.println ("-------------------");
}, "~S,~N,~A");
Clazz.defineMethod (c$, "getData", 
 function (output, start, end, n) {
var pt = 0;
var pt1 = 0;
for (var i = 0; i < n; i++) {
pt = output.indexOf (start, pt1 + 1);
pt1 = output.indexOf (end, pt + 1);
}
return (pt < 0 || pt1 < 0 ? null : output.substring (pt, pt1));
}, "~S,~S,~S,~N");
Clazz.defineMethod (c$, "getStructures", 
function (data, nrtType, list) {
if (data == null || data.length == 0) return 0;
var n = 0;
try {
var ignoreSTR = (data.indexOf ("ALPHA") >= 0);
if (!ignoreSTR && !data.contains ("STR")) data = "STR " + data + " END";
nrtType = nrtType.toLowerCase ();
var spin = (nrtType.equals ("nrtstrb") ? "beta" : "alpha");
if (nrtType.equals ("choose")) nrtType = null;
var htData = null;
var tokens = JU.PT.getTokens (data.$replace ('\r', ' ').$replace ('\n', ' ').$replace ('\t', ' '));
var lastType = "";
var index = 0;
for (var i = 0, nt = tokens.length; i < nt; i++) {
var tok = tokens[i];
switch ("STR  =    ALPHABETA LONE BOND 3C".indexOf (tok)) {
case 0:
if (ignoreSTR) continue;
tok = spin;
case 10:
case 15:
list.addLast (htData =  new java.util.Hashtable ());
if (!lastType.equals (tok)) {
lastType = tok;
index = 0;
}htData.put ("index", Integer.$valueOf (index++));
htData.put ("spin", spin = tok.toLowerCase ());
if (spin.equals ("beta")) this.haveBeta = true;
htData.put ("type", nrtType == null ? "choose" + spin.substring (0, 1) : nrtType);
n++;
break;
case 5:
htData.put ("weight", tokens[++i]);
break;
case 20:
var lone =  new JU.Lst ();
htData.put ("lone", lone);
while (!(tok = tokens[++i]).equals ("END")) {
var at1 = Integer.parseInt (tok);
var nlp = Integer.parseInt (tokens[++i]);
lone.addLast ( Clazz.newIntArray (-1, [nlp, at1]));
}
break;
case 25:
var bonds =  new JU.Lst ();
htData.put ("bond", bonds);
while (!(tok = tokens[++i]).equals ("END")) {
var order = "DTQ".indexOf (tok.charAt (0)) + 2;
var at1 = Integer.parseInt (tokens[++i]);
var at2 = Integer.parseInt (tokens[++i]);
bonds.addLast ( Clazz.newIntArray (-1, [order, at1, at2]));
}
break;
case 30:
var threeCenter =  new JU.Lst ();
htData.put ("3c", threeCenter);
while (!(tok = tokens[++i]).equals ("END")) {
var order = "DTQ".indexOf (tok.charAt (0)) + 2;
var at1 = Integer.parseInt (tokens[++i]);
var at2 = Integer.parseInt (tokens[++i]);
var at3 = Integer.parseInt (tokens[++i]);
threeCenter.addLast ( Clazz.newIntArray (-1, [order, at1, at2, at3]));
}
break;
}
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
list.clear ();
return -1;
} else {
throw e;
}
}
return n;
}, "~S,~S,JU.Lst");
Clazz.defineMethod (c$, "isOpenShell", 
function () {
return this.haveBeta;
});
c$.getStructureMap = Clazz.defineMethod (c$, "getStructureMap", 
function (structureList, type, index) {
if (type == null || structureList == null) return null;
type = type.toLowerCase ();
var spin = (type.indexOf ("b") < 0 ? "alpha" : "beta");
for (var i = 0; i < structureList.size (); i++) {
var map = structureList.get (i);
if (spin.equals (map.get ("spin")) && type.equals (map.get ("type")) && (index < 0 || index == (map.get ("index")).intValue ())) {
return map;
}}
return null;
}, "JU.Lst,~S,~N");
Clazz.defineMethod (c$, "connectNBO", 
function (modelIndex, type) {
try {
if (type == null) type = "alpha";
type = type.toLowerCase ();
if (type.length == 0 || type.equals ("46")) type = "alpha";
var map = this.vwr.ms.getModelAuxiliaryInfo (modelIndex);
this.haveBeta = map.containsKey ("isOpenShell");
var list = map.get ("nboStructures");
if (list == null || list.size () == 0) return false;
type = type.toLowerCase ();
var index = type.indexOf ("_");
if (index > 0) {
if (list.size () <= 2) {
var fname = map.get ("fileName");
if (fname != null && !fname.endsWith (".nbo")) {
fname = fname.substring (0, fname.lastIndexOf (".")) + ".nbo";
this.getAllStructures (this.vwr.getAsciiFileOrNull (fname), list);
}}var tokens = JU.PT.split (type, "_");
index = JU.PT.parseInt (tokens[1]) - 1;
type = tokens[0];
} else {
index = 0;
}var structureMap = J.adapter.readers.quantum.NBOParser.getStructureMap (list, type, index);
if (structureMap == null || !this.setJmolLewisStructure (structureMap, modelIndex, index + 1)) {
return false;
}map.put ("nboStructure", structureMap);
} catch (e) {
e.printStackTrace ();
return false;
}
return true;
}, "~N,~S");
Clazz.defineMethod (c$, "setJmolLewisStructure", 
 function (structureMap, modelIndex, resNo) {
if (structureMap == null || modelIndex < 0) return false;
var type = structureMap.get ("type");
System.out.println ("creating structure " + modelIndex + " " + type);
var bonds = structureMap.get ("bond");
var lonePairs = structureMap.get ("lone");
var matrix = structureMap.get ("matrix");
var lplv = structureMap.get ("lplv");
var bondCounts = structureMap.get ("bondCounts");
var needLP = (lplv == null);
var bsAtoms = this.vwr.ms.getModelAtomBitSetIncludingDeleted (modelIndex, false);
var atomCount = bsAtoms.cardinality ();
var iatom0 = bsAtoms.nextSetBit (0);
if (matrix != null && atomCount != matrix.length) return false;
if (matrix != null) J.adapter.readers.quantum.NBOParser.dumpMatrix (type, resNo, matrix);
if (needLP) {
structureMap.put ("lplv", lplv =  Clazz.newIntArray (atomCount, 0));
structureMap.put ("bondCounts", bondCounts =  Clazz.newIntArray (atomCount, 0));
}if (needLP) {
if (lonePairs != null) {
for (var i = lonePairs.size (); --i >= 0; ) {
var na = lonePairs.get (i);
var nlp = na[0];
var a1 = na[1] - 1;
lplv[a1] = nlp;
}
} else if (matrix != null) {
for (var i = atomCount; --i >= 0; ) {
lplv[i] = matrix[i][i];
}
}}this.vwr.ms.deleteModelBonds (modelIndex);
var mad = this.vwr.ms.getDefaultMadFromOrder (1);
if (bonds != null) {
for (var i = bonds.size (); --i >= 0; ) {
var oab = bonds.get (i);
var a1 = iatom0 + oab[1] - 1;
var a2 = iatom0 + oab[2] - 1;
var order = oab[0];
if (needLP) {
bondCounts[a1] += order;
bondCounts[a2] += order;
}this.vwr.ms.bondAtoms (this.vwr.ms.at[a1], this.vwr.ms.at[a2], order, mad, bsAtoms, 0, true, true);
}
} else if (matrix != null) {
for (var i = 0; i < atomCount - 1; i++) {
var m = matrix[i];
for (var j = i + 1; j < atomCount; j++) {
var order = m[j];
if (order == 0) continue;
System.out.println ("adding bond " + this.vwr.ms.at[i + iatom0] + " " + this.vwr.ms.at[j + iatom0]);
this.vwr.ms.bondAtoms (this.vwr.ms.at[i + iatom0], this.vwr.ms.at[j + iatom0], order, mad, null, 0, false, true);
if (needLP) {
bondCounts[i] += order;
bondCounts[j] += order;
}}
}
}for (var i = 0, ia = bsAtoms.nextSetBit (0); ia >= 0; ia = bsAtoms.nextSetBit (ia + 1), i++) {
var a = this.vwr.ms.at[ia];
a.setValence (bondCounts[i]);
a.setFormalCharge (0);
var nH = this.vwr.ms.getMissingHydrogenCount (a, true);
if (a.getElementNumber () == 6 && nH == 1) {
if (bondCounts[i] == 3 && lplv[i] % 10 == 0 || bondCounts[i] == 2) nH -= 2;
}a.setFormalCharge (-nH);
}
return true;
}, "java.util.Map,~N,~N");
Clazz.defineMethod (c$, "getNBOAtomLabel", 
function (a) {
var name = a.getAtomName ();
var modelIndex = a.getModelIndex ();
var structureMap = this.vwr.ms.getModelAuxiliaryInfo (modelIndex).get ("nboStructure");
if (this.vwr == null || structureMap == null) return name;
var lplv = structureMap.get ("lplv");
var i = a.i - this.vwr.ms.am[modelIndex].firstAtomIndex;
var addFormalCharge = this.vwr.getBoolean (603979891);
var charge = (addFormalCharge ? this.vwr.ms.at[i].getFormalCharge () : 0);
if (lplv[i] == 0 && charge == 0) return name;
if (lplv[i] % 10 > 0) name = "<sup>(" + (lplv[i] % 10) + ")</sup>" + name;
if (lplv[i] >= 10) name = "*" + name;
if (addFormalCharge) {
if (charge != 0) name += "<sup>" + Math.abs (charge) + (charge > 0 ? "+" : charge < 0 ? "-" : "") + "</sup>";
}return name;
}, "JM.Atom");
});
