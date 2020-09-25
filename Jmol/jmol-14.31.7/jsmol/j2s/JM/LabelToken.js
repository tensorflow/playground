Clazz.declarePackage ("JM");
Clazz.load (null, "JM.LabelToken", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "$.SB", "$.T3", "JS.SV", "$.T", "JU.Edge", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.text = null;
this.key = null;
this.data = null;
this.tok = 0;
this.pt = -1;
this.ch1 = '\0';
this.width = 0;
this.precision = 2147483647;
this.alignLeft = false;
this.zeroPad = false;
this.intAsFloat = false;
Clazz.instantialize (this, arguments);
}, JM, "LabelToken");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
 function (text, pt) {
this.text = text;
this.pt = pt;
return this;
}, "~S,~N");
c$.isLabelPropertyTok = Clazz.defineMethod (c$, "isLabelPropertyTok", 
 function (tok) {
for (var i = JM.LabelToken.labelTokenIds.length; --i >= 0; ) if (JM.LabelToken.labelTokenIds[i] == tok) return true;

return false;
}, "~N");
c$.compile = Clazz.defineMethod (c$, "compile", 
function (vwr, strFormat, chAtom, htValues) {
if (strFormat == null || strFormat.length == 0) return null;
if (strFormat.indexOf ("%") < 0 || strFormat.length < 2) return  Clazz.newArray (-1, [ new JM.LabelToken ().set (strFormat, -1)]);
var n = 0;
var ich = -1;
var cch = strFormat.length;
while (++ich < cch && (ich = strFormat.indexOf ('%', ich)) >= 0) n++;

var tokens =  new Array (n * 2 + 1);
var ichPercent;
var i = 0;
for (ich = 0; (ichPercent = strFormat.indexOf ('%', ich)) >= 0; ) {
if (ich != ichPercent) tokens[i++] =  new JM.LabelToken ().set (strFormat.substring (ich, ichPercent), -1);
var lt = tokens[i++] =  new JM.LabelToken ().set (null, ichPercent);
vwr.autoCalculate (lt.tok, null);
ich = JM.LabelToken.setToken (vwr, strFormat, lt, cch, chAtom.charCodeAt (0), htValues);
}
if (ich < cch) tokens[i++] =  new JM.LabelToken ().set (strFormat.substring (ich), -1);
return tokens;
}, "JV.Viewer,~S,~S,java.util.Map");
Clazz.defineMethod (c$, "formatLabel", 
function (vwr, atom, strFormat, ptTemp) {
return (strFormat == null || strFormat.length == 0 ? null : JM.LabelToken.formatLabelAtomArray (vwr, atom, JM.LabelToken.compile (vwr, strFormat, '\0', null), '\0', null, ptTemp));
}, "JV.Viewer,JM.Atom,~S,JU.P3");
c$.formatLabelAtomArray = Clazz.defineMethod (c$, "formatLabelAtomArray", 
function (vwr, atom, tokens, chAtom, indices, ptTemp) {
if (atom == null) return null;
var strLabel = (chAtom > '0' ? null :  new JU.SB ());
if (tokens != null) for (var i = 0; i < tokens.length; i++) {
var t = tokens[i];
if (t == null) break;
if (chAtom > '0' && t.ch1 != chAtom) continue;
if (t.tok <= 0 || t.key != null) {
if (strLabel != null) {
strLabel.append (t.text);
if (t.ch1 != '\0') strLabel.appendC (t.ch1);
}} else {
JM.LabelToken.appendAtomTokenValue (vwr, atom, t, strLabel, indices, ptTemp);
}}
return (strLabel == null ? null : strLabel.toString ().intern ());
}, "JV.Viewer,JM.Atom,~A,~S,~A,JU.P3");
c$.getBondLabelValues = Clazz.defineMethod (c$, "getBondLabelValues", 
function () {
var htValues =  new java.util.Hashtable ();
htValues.put ("#", "");
htValues.put ("ORDER", "");
htValues.put ("TYPE", "");
htValues.put ("LENGTH", Float.$valueOf (0));
htValues.put ("ENERGY", Float.$valueOf (0));
return htValues;
});
c$.formatLabelBond = Clazz.defineMethod (c$, "formatLabelBond", 
function (vwr, bond, tokens, values, indices, ptTemp) {
values.put ("#", "" + (bond.index + 1));
values.put ("ORDER", "" + JU.Edge.getBondOrderNumberFromOrder (bond.order));
values.put ("TYPE", JU.Edge.getBondOrderNameFromOrder (bond.order));
values.put ("LENGTH", Float.$valueOf (bond.atom1.distance (bond.atom2)));
values.put ("ENERGY", Float.$valueOf (bond.getEnergy ()));
JM.LabelToken.setValues (tokens, values);
JM.LabelToken.formatLabelAtomArray (vwr, bond.atom1, tokens, '1', indices, ptTemp);
JM.LabelToken.formatLabelAtomArray (vwr, bond.atom2, tokens, '2', indices, ptTemp);
return JM.LabelToken.getLabel (tokens);
}, "JV.Viewer,JM.Bond,~A,java.util.Map,~A,JU.P3");
c$.formatLabelMeasure = Clazz.defineMethod (c$, "formatLabelMeasure", 
function (vwr, m, label, value, units) {
var htValues =  new java.util.Hashtable ();
htValues.put ("#", "" + (m.index + 1));
htValues.put ("VALUE", Float.$valueOf (value));
htValues.put ("UNITS", units);
var tokens = JM.LabelToken.compile (vwr, label, '\1', htValues);
if (tokens == null) return "";
JM.LabelToken.setValues (tokens, htValues);
var atoms = m.ms.at;
var indices = m.countPlusIndices;
for (var i = indices[0]; i >= 1; --i) if (indices[i] >= 0) JM.LabelToken.formatLabelAtomArray (vwr, atoms[indices[i]], tokens, String.fromCharCode (48 + i), null, null);

label = JM.LabelToken.getLabel (tokens);
return (label == null ? "" : label);
}, "JV.Viewer,JM.Measurement,~S,~N,~S");
c$.setValues = Clazz.defineMethod (c$, "setValues", 
function (tokens, values) {
for (var i = 0; i < tokens.length; i++) {
var lt = tokens[i];
if (lt == null) break;
if (lt.key == null) continue;
var value = values.get (lt.key);
lt.text = (Clazz.instanceOf (value, Float) ? lt.format ((value).floatValue (), null, null) : lt.format (NaN, value, null));
}
}, "~A,java.util.Map");
c$.getLabel = Clazz.defineMethod (c$, "getLabel", 
function (tokens) {
var sb =  new JU.SB ();
for (var i = 0; i < tokens.length; i++) {
var lt = tokens[i];
if (lt == null) break;
sb.append (lt.text);
}
return sb.toString ();
}, "~A");
c$.setToken = Clazz.defineMethod (c$, "setToken", 
 function (vwr, strFormat, lt, cch, chAtom, htValues) {
var ich = lt.pt + 1;
if (ich >= cch) {
lt.text = "%";
return ich;
}var ch;
if (strFormat.charAt (ich) == '-') {
lt.alignLeft = true;
++ich;
}if (ich < cch && strFormat.charAt (ich) == '0') {
lt.zeroPad = true;
++ich;
}while (ich < cch && JU.PT.isDigit (ch = strFormat.charAt (ich))) {
lt.width = (10 * lt.width) + (ch.charCodeAt (0) - 48);
++ich;
}
lt.precision = 2147483647;
var isNegative = false;
if (ich < cch && strFormat.charAt (ich) == '.') {
++ich;
if (ich < cch && (ch = strFormat.charAt (ich)) == '-') {
isNegative = true;
++ich;
}if (ich < cch && JU.PT.isDigit (ch = strFormat.charAt (ich))) {
lt.precision = ch.charCodeAt (0) - 48;
if (isNegative) lt.precision = -1 - lt.precision;
++ich;
}}if (ich < cch && htValues != null) for (var key, $key = htValues.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) if (strFormat.indexOf (key) == ich) return ich + (lt.key = key).length;

if (ich < cch) switch (ch = strFormat.charAt (ich++)) {
case '%':
lt.text = "%";
return ich;
case '[':
var ichClose = strFormat.indexOf (']', ich);
if (ichClose < ich) {
ich = cch;
break;
}var propertyName = strFormat.substring (ich, ichClose).toLowerCase ();
if (propertyName.startsWith ("property_")) {
lt.tok = 134221834;
lt.data = vwr.getDataObj (propertyName, null, 1);
} else if (propertyName.startsWith ("validation.")) {
lt.tok = 1073742189;
lt.data = vwr.getDataObj ("property_" + propertyName.substring (11), null, 1);
} else if (propertyName.startsWith ("unitid")) {
lt.tok = 1073741974;
lt.data = Integer.$valueOf (JV.JC.getUnitIDFlags (propertyName.substring (6)));
} else {
var token = JS.T.getTokenFromName (propertyName);
if (token != null && JM.LabelToken.isLabelPropertyTok (token.tok)) lt.tok = token.tok;
}ich = ichClose + 1;
break;
case '{':
var ichCloseBracket = strFormat.indexOf ('}', ich);
if (ichCloseBracket < ich) {
ich = cch;
break;
}var s = strFormat.substring (ich, ichCloseBracket);
lt.data = vwr.getDataObj (s, null, 1);
if (lt.data == null) {
lt.data = vwr.getDataObj (s, null, -1);
if (lt.data != null) {
lt.data = (lt.data)[1];
if (Clazz.instanceOf (lt.data, String)) lt.data = JU.PT.split (lt.data, "\n");
if (!(JU.AU.isAS (lt.data))) lt.data = null;
}if (lt.data == null) {
lt.tok = 1715472409;
lt.data = s;
} else {
lt.tok = 1275068418;
}} else {
lt.tok = 134221834;
}ich = ichCloseBracket + 1;
break;
default:
var i;
var i1;
if (ich < cch && (i = "fuv".indexOf (ch)) >= 0 && (i1 = "xyz".indexOf (strFormat.charAt (ich))) >= 0) {
lt.tok = JM.LabelToken.twoCharLabelTokenIds[i * 3 + i1];
ich++;
} else if ((i = "AaBbCcDEefGgIiLlMmNnOoPpQqRrSsTtUuVvWXxxYyyZzz%%%gqW".indexOf (ch)) >= 0) {
lt.tok = JM.LabelToken.labelTokenIds[i];
}}
lt.text = strFormat.substring (lt.pt, ich);
if (ich < cch && chAtom != 0 && JU.PT.isDigit (ch = strFormat.charAt (ich))) {
ich++;
lt.ch1 = ch;
if (ch.charCodeAt (0) != chAtom && chAtom != 1) lt.tok = 0;
}return ich;
}, "JV.Viewer,~S,JM.LabelToken,~N,~N,java.util.Map");
c$.appendAtomTokenValue = Clazz.defineMethod (c$, "appendAtomTokenValue", 
 function (vwr, atom, t, strLabel, indices, ptTemp) {
var strT = null;
var floatT = NaN;
var ptT = null;
try {
switch (t.tok) {
case 1094713347:
strT = "" + (indices == null ? atom.i : indices[atom.i]);
break;
case 1765808134:
ptT = atom.atomPropertyTuple (vwr, t.tok, ptTemp);
break;
case 1073741974:
strT = atom.getUnitID ((t.data).intValue ());
break;
case 134221834:
case 1073742189:
if (t.data != null) {
floatT = (t.data)[atom.i];
if (t.tok == 1073742189 && floatT != 1 && floatT != 0) {
var o = vwr.getAtomValidation (t.text.substring (13, t.text.length - 1), atom);
if (o == null) {
System.out.println ("?? o is null ??");
} else if (o.size () == 1) {
floatT = o.get (0).floatValue ();
} else {
floatT = NaN;
strT = "";
for (var i = 0, n = o.size (); i < n; i++) {
strT += "," + o.get (i);
}
if (strT.length > 1) strT = strT.substring (1);
}}}break;
case 1715472409:
var data = vwr.ms.getInfo (atom.mi, t.data);
var iatom = atom.i - vwr.ms.am[atom.mi].firstAtomIndex;
var o = null;
if (iatom >= 0) if ((Clazz.instanceOf (data, Array))) {
var sdata = data;
o = (iatom < sdata.length ? sdata[iatom] : null);
} else if (Clazz.instanceOf (data, JU.Lst)) {
var list = data;
o = (iatom < list.size () ? JS.SV.oValue (list.get (iatom)) : null);
}if (o == null) {
strT = "";
} else if (Clazz.instanceOf (o, Float)) {
floatT = (o).floatValue ();
} else if (Clazz.instanceOf (o, Integer)) {
floatT = (o).intValue ();
} else if (Clazz.instanceOf (o, JU.T3)) {
ptT = o;
} else {
strT = o.toString ();
}break;
case 1275068418:
if (t.data != null) {
var sdata = t.data;
strT = (atom.i < sdata.length ? sdata[atom.i] : "");
}break;
case 1631586315:
var formalCharge = atom.getFormalCharge ();
strT = (formalCharge > 0 ? "" + formalCharge + "+" : formalCharge < 0 ? "" + -formalCharge + "-" : "");
break;
case 1094717454:
strT = atom.getModelNumberForLabel ();
break;
case 1128269825:
strT = "" + atom.atomPropertyInt (t.tok);
break;
case 1665140738:
floatT = atom.atomPropertyFloat (vwr, t.tok, ptTemp);
break;
case 1086324749:
strT = atom.group.getStructureId ();
break;
case 1094713367:
var id = atom.group.getStrucNo ();
strT = (id <= 0 ? "" : "" + id);
break;
case 1111490574:
if (Float.isNaN (floatT = atom.group.getGroupParameter (1111490574))) strT = "null";
break;
case 1111492626:
case 1111492627:
case 1111492628:
case 1111490583:
case 1111490584:
case 1111490585:
case 1111490586:
floatT = atom.atomPropertyFloat (vwr, t.tok, ptTemp);
if (Float.isNaN (floatT)) strT = "";
break;
case 1073877011:
strT = vwr.getNBOAtomLabel (atom);
break;
case 1086324747:
case 1639976963:
case 1237320707:
strT = atom.atomPropertyString (vwr, t.tok);
break;
case 1140850705:
strT = atom.getIdentityXYZ (false, ptTemp);
break;
case 79:
strT = atom.getSymmetryOperatorList (false);
break;
case 81:
floatT = atom.getOccupancy100 () / 100;
break;
default:
switch (t.tok & 1136656384) {
case 1094713344:
if (t.intAsFloat) floatT = atom.atomPropertyInt (t.tok);
 else strT = "" + atom.atomPropertyInt (t.tok);
break;
case 1111490560:
floatT = atom.atomPropertyFloat (vwr, t.tok, ptTemp);
break;
case 1086324736:
strT = atom.atomPropertyString (vwr, t.tok);
break;
case 1077936128:
ptT = atom.atomPropertyTuple (vwr, t.tok, ptTemp);
if (ptT == null) strT = "";
break;
default:
}
}
} catch (ioobe) {
if (Clazz.exceptionOf (ioobe, IndexOutOfBoundsException)) {
floatT = NaN;
strT = null;
ptT = null;
} else {
throw ioobe;
}
}
strT = t.format (floatT, strT, ptT);
if (strLabel == null) t.text = strT;
 else strLabel.append (strT);
}, "JV.Viewer,JM.Atom,JM.LabelToken,JU.SB,~A,JU.P3");
Clazz.defineMethod (c$, "format", 
 function (floatT, strT, ptT) {
if (!Float.isNaN (floatT)) {
return JU.PT.formatF (floatT, this.width, this.precision, this.alignLeft, this.zeroPad);
} else if (strT != null) {
return JU.PT.formatS (strT, this.width, this.precision, this.alignLeft, this.zeroPad);
} else if (ptT != null) {
if (this.width == 0 && this.precision == 2147483647) {
this.width = 6;
this.precision = 2;
}return JU.PT.formatF (ptT.x, this.width, this.precision, false, false) + JU.PT.formatF (ptT.y, this.width, this.precision, false, false) + JU.PT.formatF (ptT.z, this.width, this.precision, false, false);
} else {
return this.text;
}}, "~N,~S,JU.T3");
Clazz.defineStatics (c$,
"labelTokenParams", "AaBbCcDEefGgIiLlMmNnOoPpQqRrSsTtUuVvWXxxYyyZzz%%%gqW",
"labelTokenIds",  Clazz.newIntArray (-1, [1086324739, 1086326786, 1086326785, 1111492620, 1631586315, 1086326788, 1094713347, 1086324746, 1086326789, 1111490569, 1094713357, 1094713361, 1111492618, 1094715393, 1094713363, 1094715402, 1094717454, 1086324743, 1094713360, 1086324742, 79, 1088421903, 1111492619, 1111490570, 81, 1128269825, 1094715412, 1086324747, 1094713366, 1086326788, 1111490574, 1111492620, 1086324745, 1111490575, 1648363544, 1145047055, 1140850705, 1111492612, 1111492609, 1111492629, 1111492613, 1111492610, 1111492630, 1111492614, 1111492611, 1111492631, 1114249217, 1112152066, 1112150019, 1112150020, 1112150021, 1112152070, 1112152071, 1112152073, 1112152074, 1112152076, 1649022989, 1112152078, 1111490561, 1111490562, 1094713346, 1228931587, 1765808134, 1094713356, 1111490564, 1228935687, 1287653388, 1825200146, 1111490567, 1094713359, 1111490565, 1111490568, 1094713362, 1715472409, 1665140738, 1113589787, 1086324748, 1086324744, 1112152075, 1639976963, 1237320707, 1094713367, 1086324749, 1086326798, 1111490576, 1111490577, 1111490578, 1111490579, 1094715417, 1648361473, 1111492626, 1111492627, 1111492628, 1312817669, 1145045006, 1145047051, 1145047050, 1145047053, 1111492615, 1111492616, 1111492617, 1113589786, 1111490571, 1111490572, 1111490573, 1145047052, 1111490566, 1111490563, 1094713351, 1094713365, 1111490583, 1111490584, 1111490585, 1111490586, 1145045008, 1296041986, 1073877011, 1086324752, 1086324753]),
"STANDARD_LABEL", "%[identify]",
"twoCharLabelTokenParams", "fuv",
"twoCharLabelTokenIds",  Clazz.newIntArray (-1, [1111492612, 1111492613, 1111492614, 1111490577, 1111490578, 1111490579, 1111492626, 1111492627, 1111492628]));
});
