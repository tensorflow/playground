Clazz.declarePackage ("JU");
Clazz.load (null, "JU.MolWriter", ["java.lang.Float", "java.util.Arrays", "$.Hashtable", "JU.Lst", "$.Measure", "$.P3", "$.PT", "$.SB", "$.V3", "JS.SV", "$.T", "JU.Elements", "$.Escape", "JV.PropertyManager", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.ptTemp = null;
this.vNorm = null;
this.vTemp = null;
this.connections = null;
Clazz.instantialize (this, arguments);
}, JU, "MolWriter");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
return this;
}, "JV.Viewer");
Clazz.defineMethod (c$, "addMolFile", 
function (iModel, mol, bsAtoms, bsBonds, asV3000, asJSON, noAromatic, q) {
var nAtoms = bsAtoms.cardinality ();
var nBonds = bsBonds.cardinality ();
if (!asV3000 && !asJSON && (nAtoms > 999 || nBonds > 999)) return false;
var asSDF = (iModel >= 0);
var molData = (asSDF ? this.vwr.ms.getInfo (iModel, "molData") : null);
var _keyList = (asSDF ? this.vwr.ms.getInfo (iModel, "molDataKeys") : null);
var ms = this.vwr.ms;
var atomMap =  Clazz.newIntArray (ms.ac, 0);
var pTemp =  new JU.P3 ();
if (asV3000) {
mol.append ("  0  0  0  0  0  0            999 V3000");
} else if (asJSON) {
mol.append ("{\"mol\":{\"createdBy\":\"Jmol " + JV.Viewer.getJmolVersion () + "\",\"a\":[");
} else {
JU.PT.rightJustify (mol, "   ", "" + nAtoms);
JU.PT.rightJustify (mol, "   ", "" + nBonds);
mol.append ("  0  0  0  0            999 V2000");
}if (!asJSON) mol.append ("\n");
if (asV3000) {
mol.append ("M  V30 BEGIN CTAB\nM  V30 COUNTS ").appendI (nAtoms).append (" ").appendI (nBonds).append (" 0 0 0\n").append ("M  V30 BEGIN ATOM\n");
}var o = (molData == null ? null : molData.get ("atom_value_name"));
if (Clazz.instanceOf (o, JS.SV)) o = (o).asString ();
var valueType = (o == null ? 0 : JS.T.getTokFromName ("" + o));
var atomValues = (valueType == 0 && !asSDF ? null :  new JU.SB ());
for (var i = bsAtoms.nextSetBit (0), n = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
this.getAtomRecordMOL (iModel, ms, mol, atomMap[i] = ++n, ms.at[i], q, pTemp, asV3000, asJSON, atomValues, valueType, asSDF);
}
if (asV3000) {
mol.append ("M  V30 END ATOM\nM  V30 BEGIN BOND\n");
} else if (asJSON) {
mol.append ("],\"b\":[");
}for (var i = bsBonds.nextSetBit (0), n = 0; i >= 0; i = bsBonds.nextSetBit (i + 1)) this.getBondRecordMOL (mol, ++n, ms.bo[i], atomMap, asV3000, asJSON, noAromatic);

if (asV3000) {
mol.append ("M  V30 END BOND\nM  V30 END CTAB\n");
}if (asJSON) mol.append ("]}}");
 else {
if (atomValues != null && atomValues.length () > 0) mol.append (atomValues.toString ());
mol.append ("M  END\n");
}if (asSDF) {
try {
var pc = ms.getPartialCharges ();
if (molData == null) molData =  new java.util.Hashtable ();
var sb =  new JU.SB ();
if (pc != null) {
sb.appendI (nAtoms).appendC ('\n');
for (var i = bsAtoms.nextSetBit (0), n = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1)) sb.appendI (++n).append (" ").appendF (pc[i]).appendC ('\n');

molData.put ("jmol_partial_charges", sb.toString ());
}sb.setLength (0);
sb.appendI (nAtoms).appendC ('\n');
for (var i = bsAtoms.nextSetBit (0), n = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var name = ms.at[i].getAtomName ().trim ();
if (name.length == 0) name = ".";
sb.appendI (++n).append (" ").append (name.$replace (' ', '_')).appendC ('\n');
}
molData.put ("jmol_atom_names", sb.toString ());
if (_keyList == null) _keyList =  new JU.Lst ();
for (var key, $key = molData.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) if (!_keyList.contains (key)) _keyList.addLast (key);

for (var i = 0, n = _keyList.size (); i < n; i++) {
var key = _keyList.get (i);
if (key.startsWith (">")) continue;
o = molData.get (key);
if (Clazz.instanceOf (o, JS.SV)) o = (o).asString ();
mol.append ("> <" + key.toUpperCase () + ">\n");
this.output80CharWrap (mol, o.toString (), 80);
mol.append ("\n\n");
}
} catch (e) {
}
mol.append ("$$$$\n");
}return true;
}, "~N,JU.SB,JU.BS,JU.BS,~B,~B,~B,JU.Quat");
Clazz.defineMethod (c$, "getAtomRecordMOL", 
 function (iModel, ms, mol, n, a, q, pTemp, asV3000, asJSON, atomValues, tokValue, asSDF) {
JV.PropertyManager.getPointTransf (iModel, ms, a, q, pTemp);
var elemNo = a.getElementNumber ();
var sym = (a.isDeleted () ? "Xx" : JU.Elements.elementSymbolFromNumber (elemNo));
var isotope = a.getIsotopeNumber ();
var charge = a.getFormalCharge ();
var o =  Clazz.newArray (-1, [pTemp]);
if (asV3000) {
mol.append ("M  V30 ").appendI (n).append (" ").append (sym).append (JU.PT.sprintf (" %12.5p %12.5p %12.5p 0", "p", o));
if (charge != 0) mol.append (" CHG=").appendI (charge);
if (isotope != 0) mol.append (" MASS=").appendI (isotope);
mol.append ("\n");
} else if (asJSON) {
if (n != 1) mol.append (",");
mol.append ("{");
if (a.getElementNumber () != 6) mol.append ("\"l\":\"").append (a.getElementSymbol ()).append ("\",");
if (charge != 0) mol.append ("\"c\":").appendI (charge).append (",");
if (isotope != 0) mol.append ("\"m\":").appendI (isotope).append (",");
mol.append ("\"x\":").appendF (a.x).append (",\"y\":").appendF (a.y).append (",\"z\":").appendF (a.z).append ("}");
} else {
mol.append (JU.PT.sprintf ("%10.4p%10.4p%10.4p", "p", o));
mol.append (" ").append (sym);
if (sym.length == 1) mol.append (" ");
JU.PT.rightJustify (mol, "   ", "" + (isotope > 0 ? isotope - JU.Elements.getNaturalIsotope (a.getElementNumber ()) : 0));
if (asSDF && isotope > 0) {
atomValues.append ("M  ISO  1");
JU.PT.rightJustify (atomValues, "    ", "" + n);
JU.PT.rightJustify (atomValues, "    ", "" + isotope);
atomValues.append ("\n");
}JU.PT.rightJustify (mol, "   ", "" + (charge == 0 ? 0 : 4 - charge));
mol.append ("  ").append (this.getAtomParity (a));
mol.append ("  0  0  0\n");
var label = (tokValue == 0 || asV3000 ? null : this.getAtomPropertyAsString (a, tokValue));
if (label != null && (label = label.trim ()).length > 0) {
var sn = "   " + n + " ";
atomValues.append ("V  ").append (sn.substring (sn.length - 4));
this.output80CharWrap (atomValues, label, 73);
}}}, "~N,JM.ModelSet,JU.SB,~N,JM.Atom,JU.Quat,JU.P3,~B,~B,JU.SB,~N,~B");
Clazz.defineMethod (c$, "getAtomParity", 
 function (a) {
if (a.getCovalentBondCount () == 4) {
if (this.connections == null) {
this.connections =  Clazz.newIntArray (4, 0);
this.vTemp =  new JU.V3 ();
this.vNorm =  new JU.V3 ();
}var bonds = a.bonds;
var nH = 0;
for (var pt = 0, i = bonds.length; --i >= 0; ) {
if (bonds[i].isCovalent ()) {
var b = bonds[i].getOtherAtom (a);
if (b.getAtomicAndIsotopeNumber () == 1) nH++;
this.connections[pt++] = b.i;
}}
if (nH < 3) {
java.util.Arrays.sort (this.connections);
var atoms = this.vwr.ms.at;
JU.Measure.getNormalThroughPoints (atoms[this.connections[0]], atoms[this.connections[1]], atoms[this.connections[2]], this.vNorm, this.vTemp);
this.vTemp.sub2 (atoms[this.connections[3]], atoms[this.connections[0]]);
return (this.vTemp.dot (this.vNorm) > 0 ? "1" : "2");
}}return "0";
}, "JM.Atom");
Clazz.defineMethod (c$, "getAtomPropertyAsString", 
 function (a, tok) {
switch (tok & 1136656384) {
case 1094713344:
var i = a.atomPropertyInt (tok);
return (tok == 1765808134 ? JU.PT.trim (JU.Escape.escapeColor (i), "[x]").toUpperCase () : "" + i);
case 1086324736:
return a.atomPropertyString (this.vwr, tok);
case 1111490560:
var f = a.atomPropertyFloat (this.vwr, tok, null);
return (Float.isNaN (f) ? null : "" + f);
default:
if (this.ptTemp == null) this.ptTemp =  new JU.P3 ();
a.atomPropertyTuple (this.vwr, tok, this.ptTemp);
return (this.ptTemp == null ? null : this.ptTemp.toString ());
}
}, "JM.Atom,~N");
Clazz.defineMethod (c$, "getBondRecordMOL", 
 function (mol, n, b, atomMap, asV3000, asJSON, noAromatic) {
var a1 = atomMap[b.atom1.i];
var a2 = atomMap[b.atom2.i];
var order = b.getValence ();
if (order > 3) order = 1;
switch (b.order & -131073) {
case 515:
order = (asJSON ? -3 : 4);
break;
case 66:
order = (asJSON ? -3 : 5);
break;
case 513:
order = (asJSON || noAromatic ? 1 : 6);
break;
case 514:
order = (asJSON || noAromatic ? 2 : 7);
break;
case 33:
order = (asJSON ? -1 : 8);
break;
}
if (asV3000) {
mol.append ("M  V30 ").appendI (n).append (" ").appendI (order).append (" ").appendI (a1).append (" ").appendI (a2).appendC ('\n');
} else if (asJSON) {
if (n != 1) mol.append (",");
mol.append ("{\"b\":").appendI (a1 - 1).append (",\"e\":").appendI (a2 - 1);
if (order != 1) {
mol.append (",\"o\":");
if (order < 0) {
mol.appendF (-order / 2);
} else {
mol.appendI (order);
}}mol.append ("}");
} else {
JU.PT.rightJustify (mol, "   ", "" + a1);
JU.PT.rightJustify (mol, "   ", "" + a2);
mol.append ("  ").appendI (order).append ("  0  0  0\n");
}}, "JU.SB,~N,JM.Bond,~A,~B,~B,~B");
Clazz.defineMethod (c$, "output80CharWrap", 
 function (mol, data, maxN) {
if (maxN < 80) data = JU.PT.rep (data, "\n", "|");
var lines = JU.PT.split (JU.PT.trim (JU.PT.rep (data, "\n\n", "\n"), "\n"), "\n");
for (var i = 0; i < lines.length; i++) this.outputLines (mol, lines[i], maxN);

}, "JU.SB,~S,~N");
Clazz.defineMethod (c$, "outputLines", 
 function (mol, data, maxN) {
var done = false;
for (var i = 0, n = data.length; i < n && !done; i += 80) {
mol.append (data.substring (i, Math.min (i + maxN, n)));
if (!(done = (maxN != 80)) && i + 80 < n) mol.append ("+");
mol.append ("\n");
}
}, "JU.SB,~S,~N");
});
