Clazz.declarePackage ("JS");
Clazz.load (["javajs.api.JSONEncodable", "JS.T", "JU.P3"], "JS.SV", ["java.lang.Boolean", "$.Float", "java.util.Arrays", "$.Collections", "$.Hashtable", "$.Map", "JU.AU", "$.BArray", "$.BS", "$.Base64", "$.Lst", "$.M3", "$.M34", "$.M4", "$.Measure", "$.P4", "$.PT", "$.Quat", "$.SB", "$.T3", "$.V3", "JM.BondSet", "JS.ScriptContext", "JU.BSUtil", "$.Escape", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.index = 2147483647;
this.myName = null;
if (!Clazz.isClassDefined ("JS.SV.Sort")) {
JS.SV.$SV$Sort$ ();
}
Clazz.instantialize (this, arguments);
}, JS, "SV", JS.T, javajs.api.JSONEncodable);
c$.newV = Clazz.defineMethod (c$, "newV", 
function (tok, value) {
var sv =  new JS.SV ();
sv.tok = tok;
sv.value = value;
return sv;
}, "~N,~O");
c$.newI = Clazz.defineMethod (c$, "newI", 
function (i) {
var sv =  new JS.SV ();
sv.tok = 2;
sv.intValue = i;
return sv;
}, "~N");
c$.newF = Clazz.defineMethod (c$, "newF", 
function (f) {
var sv =  new JS.SV ();
sv.tok = 3;
sv.value = Float.$valueOf (f);
return sv;
}, "~N");
c$.newS = Clazz.defineMethod (c$, "newS", 
function (s) {
return JS.SV.newV (4, s);
}, "~S");
c$.newT = Clazz.defineMethod (c$, "newT", 
function (x) {
return JS.SV.newSV (x.tok, x.intValue, x.value);
}, "JS.T");
c$.newSV = Clazz.defineMethod (c$, "newSV", 
function (tok, intValue, value) {
var sv = JS.SV.newV (tok, value);
sv.intValue = intValue;
return sv;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "setv", 
function (v) {
this.index = v.index;
this.intValue = v.intValue;
this.tok = v.tok;
this.value = v.value;
return this;
}, "JS.SV");
c$.sizeOf = Clazz.defineMethod (c$, "sizeOf", 
function (x) {
switch (x == null ? 0 : x.tok) {
case 10:
return JS.SV.bsSelectToken (x).cardinality ();
case 1073742335:
case 1073742334:
return -1;
case 2:
return -2;
case 3:
return -4;
case 8:
return -8;
case 9:
return -16;
case 11:
return -32;
case 12:
return -64;
case 15:
return (x.value).data.length;
case 4:
return (x.value).length;
case 7:
return x.intValue == 2147483647 ? (x).getList ().size () : JS.SV.sizeOf (JS.SV.selectItemTok (x, -2147483648));
case 6:
return (x.value).size ();
case 14:
return (x.value).getFullMap ().size ();
default:
return 0;
}
}, "JS.T");
c$.isVariableType = Clazz.defineMethod (c$, "isVariableType", 
function (x) {
return (Clazz.instanceOf (x, JS.SV) || Clazz.instanceOf (x, Boolean) || Clazz.instanceOf (x, Integer) || Clazz.instanceOf (x, Float) || Clazz.instanceOf (x, String) || Clazz.instanceOf (x, JU.T3) || Clazz.instanceOf (x, JU.BS) || Clazz.instanceOf (x, JU.P4) || Clazz.instanceOf (x, JU.Quat) || Clazz.instanceOf (x, JU.M34) || Clazz.instanceOf (x, java.util.Map) || Clazz.instanceOf (x, JU.Lst) || Clazz.instanceOf (x, JU.BArray) || Clazz.instanceOf (x, JS.ScriptContext) || JS.SV.isArray (x));
}, "~O");
c$.isArray = Clazz.defineMethod (c$, "isArray", 
 function (x) {
{
return Clazz.instanceOf(x, Array);
}}, "~O");
c$.getVariable = Clazz.defineMethod (c$, "getVariable", 
function (x) {
if (x == null) return JS.SV.newS ("");
if (Clazz.instanceOf (x, JS.SV)) return x;
if (Clazz.instanceOf (x, Boolean)) return JS.SV.getBoolean ((x).booleanValue ());
if (Clazz.instanceOf (x, Integer)) return JS.SV.newI ((x).intValue ());
if (Clazz.instanceOf (x, Float)) return JS.SV.newV (3, x);
if (Clazz.instanceOf (x, String)) {
x = JS.SV.unescapePointOrBitsetAsVariable (x);
if (Clazz.instanceOf (x, JS.SV)) return x;
return JS.SV.newV (4, x);
}if (Clazz.instanceOf (x, JU.P3)) return JS.SV.newV (8, x);
if (Clazz.instanceOf (x, JU.V3)) return JS.SV.newV (8, JU.P3.newP (x));
if (Clazz.instanceOf (x, JU.BS)) return JS.SV.newV (10, x);
if (Clazz.instanceOf (x, JU.P4)) return JS.SV.newV (9, x);
if (Clazz.instanceOf (x, JU.Quat)) return JS.SV.newV (9, (x).toPoint4f ());
if (Clazz.instanceOf (x, JU.M34)) return JS.SV.newV (Clazz.instanceOf (x, JU.M4) ? 12 : 11, x);
if (Clazz.instanceOf (x, java.util.Map)) return JS.SV.getVariableMap (x);
if (Clazz.instanceOf (x, JU.Lst)) return JS.SV.getVariableList (x);
if (Clazz.instanceOf (x, JU.BArray)) return JS.SV.newV (15, x);
if (Clazz.instanceOf (x, JS.ScriptContext)) return JS.SV.newV (14, x);
if (JS.SV.isASV (x)) return JS.SV.getVariableAV (x);
if (JU.AU.isAI (x)) return JS.SV.getVariableAI (x);
if (JU.AU.isAB (x)) return JS.SV.getVariableAB (x);
if (JU.AU.isAF (x)) return JS.SV.getVariableAF (x);
if (JU.AU.isAD (x)) return JS.SV.getVariableAD (x);
if (JU.AU.isAS (x)) return JS.SV.getVariableAS (x);
if (JU.AU.isAP (x)) return JS.SV.getVariableAP (x);
if (JU.AU.isAII (x)) return JS.SV.getVariableAII (x);
if (JU.AU.isAFF (x)) return JS.SV.getVariableAFF (x);
if (JU.AU.isASS (x)) return JS.SV.getVariableASS (x);
if (JU.AU.isADD (x)) return JS.SV.getVariableADD (x);
if (JU.AU.isAFloat (x)) return JS.SV.newV (13, x);
return JS.SV.newJSVar (x);
}, "~O");
c$.isASV = Clazz.defineMethod (c$, "isASV", 
 function (x) {
if (!JV.Viewer.isSwingJS) {
{
return x && x[0] && x[0].__CLASS_NAME__ == "JS.SV";
}}return Clazz.instanceOf (x, Array);
}, "~O");
c$.newJSVar = Clazz.defineMethod (c$, "newJSVar", 
 function (x) {
var itype;
var itest;
var inum;
var array;
var keys;
{
switch(x.BYTES_PER_ELEMENT ? Array : x.constructor) {
case Boolean:
itype = 0;
itest = x;
break;
case Number:
itype = 1;
inum = x;
break;
case Array:
itype = 2;
array = x;
break;
case Object:
itype = 3;
array = x;
keys = Object.keys(x);
break;
}
}switch (itype) {
case 0:
return (itest ? JS.SV.vT : JS.SV.vF);
case 1:
return (inum > 2147483647 || inum != Math.floor (inum) ? JS.SV.newF (inum) : JS.SV.newI (Clazz.floatToInt (inum)));
case 2:
var v =  new JU.Lst ();
for (var i = 0, n = array.length; i < n; i++) v.addLast (JS.SV.newJSVar (array[i]));

return JS.SV.getVariableList (v);
case 3:
var map =  new java.util.Hashtable ();
for (var i = keys.length; --i >= 0; ) {
var o = null;
{
o = array[keys[i]];
}map.put (keys[i], JS.SV.newJSVar (o));
}
return JS.SV.getVariableMap (map);
}
return JS.SV.newS (x.toString ());
}, "~O");
c$.getVariableMap = Clazz.defineMethod (c$, "getVariableMap", 
function (x) {
var ht = x;
var o = null;
for (var oo, $oo = ht.values ().iterator (); $oo.hasNext () && ((oo = $oo.next ()) || true);) {
o = oo;
break;
}
if (!(Clazz.instanceOf (o, JS.SV))) {
var x2 =  new java.util.Hashtable ();
for (var entry, $entry = ht.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) x2.put (entry.getKey (), JS.SV.getVariable (entry.getValue ()));

x = x2;
}return JS.SV.newV (6, x);
}, "java.util.Map");
c$.getVariableList = Clazz.defineMethod (c$, "getVariableList", 
function (v) {
var len = v.size ();
if (len > 0 && Clazz.instanceOf (v.get (0), JS.SV)) return JS.SV.newV (7, v);
var objects =  new JU.Lst ();
for (var i = 0; i < len; i++) objects.addLast (JS.SV.getVariable (v.get (i)));

return JS.SV.newV (7, objects);
}, "JU.Lst");
c$.getVariableAV = Clazz.defineMethod (c$, "getVariableAV", 
function (v) {
var objects =  new JU.Lst ();
for (var i = 0; i < v.length; i++) objects.addLast (v[i]);

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableAD = Clazz.defineMethod (c$, "getVariableAD", 
function (f) {
var objects =  new JU.Lst ();
for (var i = 0; i < f.length; i++) objects.addLast (JS.SV.newV (3, Float.$valueOf (f[i])));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableAO = Clazz.defineMethod (c$, "getVariableAO", 
function (o) {
var objects =  new JU.Lst ();
for (var i = 0; i < o.length; i++) objects.addLast (JS.SV.getVariable (o[i]));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableAS = Clazz.defineMethod (c$, "getVariableAS", 
function (s) {
var objects =  new JU.Lst ();
for (var i = 0; i < s.length; i++) objects.addLast (JS.SV.newV (4, s[i]));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableAP = Clazz.defineMethod (c$, "getVariableAP", 
function (p) {
var objects =  new JU.Lst ();
for (var i = 0; i < p.length; i++) objects.addLast (JS.SV.newV (8, p[i]));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableAFF = Clazz.defineMethod (c$, "getVariableAFF", 
function (fx) {
var objects =  new JU.Lst ();
for (var i = 0; i < fx.length; i++) objects.addLast (JS.SV.getVariableAF (fx[i]));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableADD = Clazz.defineMethod (c$, "getVariableADD", 
function (fx) {
var objects =  new JU.Lst ();
for (var i = 0; i < fx.length; i++) objects.addLast (JS.SV.getVariableAD (fx[i]));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableASS = Clazz.defineMethod (c$, "getVariableASS", 
function (fx) {
var objects =  new JU.Lst ();
for (var i = 0; i < fx.length; i++) objects.addLast (JS.SV.getVariableAS (fx[i]));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableAII = Clazz.defineMethod (c$, "getVariableAII", 
function (ix) {
var objects =  new JU.Lst ();
for (var i = 0; i < ix.length; i++) objects.addLast (JS.SV.getVariableAI (ix[i]));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableAF = Clazz.defineMethod (c$, "getVariableAF", 
function (f) {
var objects =  new JU.Lst ();
for (var i = 0; i < f.length; i++) objects.addLast (JS.SV.newV (3, Float.$valueOf (f[i])));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableAI = Clazz.defineMethod (c$, "getVariableAI", 
function (ix) {
var objects =  new JU.Lst ();
for (var i = 0; i < ix.length; i++) objects.addLast (JS.SV.newI (ix[i]));

return JS.SV.newV (7, objects);
}, "~A");
c$.getVariableAB = Clazz.defineMethod (c$, "getVariableAB", 
function (ix) {
var objects =  new JU.Lst ();
for (var i = 0; i < ix.length; i++) objects.addLast (JS.SV.newI (ix[i]));

return JS.SV.newV (7, objects);
}, "~A");
Clazz.defineMethod (c$, "setName", 
function (name) {
this.myName = name;
return this;
}, "~S");
Clazz.defineMethod (c$, "canIncrement", 
function () {
switch (this.tok) {
case 2:
case 3:
return true;
default:
return false;
}
});
Clazz.defineMethod (c$, "increment", 
function (n) {
switch (this.tok) {
case 2:
this.intValue += n;
return true;
case 3:
this.value = Float.$valueOf ((this.value).floatValue () + n);
return true;
default:
return false;
}
}, "~N");
Clazz.defineMethod (c$, "asBoolean", 
function () {
return JS.SV.bValue (this);
});
Clazz.defineMethod (c$, "asInt", 
function () {
return JS.SV.iValue (this);
});
Clazz.defineMethod (c$, "asFloat", 
function () {
return JS.SV.fValue (this);
});
Clazz.defineMethod (c$, "asString", 
function () {
return JS.SV.sValue (this);
});
c$.oValue = Clazz.defineMethod (c$, "oValue", 
function (xx) {
if (!(Clazz.instanceOf (xx, JS.SV))) return xx;
var x = xx;
switch (x.tok) {
case 1073742335:
return Boolean.TRUE;
case 0:
case 1073742334:
return Boolean.FALSE;
case 2:
return Integer.$valueOf (x.intValue);
case 10:
case 1275068418:
return JS.SV.selectItemVar (x).value;
default:
return x.value;
}
}, "~O");
c$.nValue = Clazz.defineMethod (c$, "nValue", 
function (x) {
var iValue;
switch (x == null ? 0 : x.tok) {
case 3:
return x.value;
case 2:
iValue = x.intValue;
break;
case 4:
if ((x.value).indexOf (".") >= 0) return Float.$valueOf (JS.SV.toFloat (x.value));
iValue = Clazz.floatToInt (JS.SV.toFloat (x.value));
break;
case 8:
return Float.$valueOf ((x.value).length ());
default:
iValue = 0;
}
return Integer.$valueOf (iValue);
}, "JS.T");
c$.bValue = Clazz.defineMethod (c$, "bValue", 
function (x) {
switch (x == null ? 0 : x.tok) {
case 1073742335:
case 14:
return true;
case 1073742334:
return false;
case 2:
return x.intValue != 0;
case 3:
case 4:
case 7:
return JS.SV.fValue (x) != 0;
case 10:
case 15:
return JS.SV.iValue (x) != 0;
case 8:
case 9:
case 11:
case 12:
return Math.abs (JS.SV.fValue (x)) > 0.0001;
case 6:
return !(x).getMap ().isEmpty ();
default:
return false;
}
}, "JS.T");
c$.iValue = Clazz.defineMethod (c$, "iValue", 
function (x) {
switch (x == null ? 0 : x.tok) {
case 1073742335:
return 1;
case 1073742334:
return 0;
case 2:
return x.intValue;
case 3:
case 7:
case 4:
case 8:
case 9:
case 11:
case 12:
case 134221850:
return Clazz.floatToInt (JS.SV.fValue (x));
case 10:
return JS.SV.bsSelectToken (x).cardinality ();
case 15:
return (x.value).data.length;
default:
return 0;
}
}, "JS.T");
c$.fValue = Clazz.defineMethod (c$, "fValue", 
function (x) {
switch (x == null ? 0 : x.tok) {
case 1073742335:
return 1;
case 1073742334:
return 0;
case 2:
return x.intValue;
case 3:
return (x.value).floatValue ();
case 7:
var i = x.intValue;
if (i == 2147483647) return (x).getList ().size ();
case 4:
return JS.SV.toFloat (JS.SV.sValue (x));
case 10:
case 15:
return JS.SV.iValue (x);
case 8:
return (x.value).length ();
case 9:
return JU.Measure.distanceToPlane (x.value, JS.SV.pt0);
case 11:
var pt =  new JU.P3 ();
(x.value).rotate (pt);
return pt.length ();
case 12:
var pt1 =  new JU.P3 ();
(x.value).rotTrans (pt1);
return pt1.length ();
default:
return 0;
}
}, "JS.T");
c$.sValue = Clazz.defineMethod (c$, "sValue", 
function (x) {
if (x == null) return "";
var i;
var sb;
switch (x.tok) {
case 1073742335:
return "true";
case 1073742334:
return "false";
case 2:
return "" + x.intValue;
case 10:
var bs = JS.SV.bsSelectToken (x);
return (Clazz.instanceOf (x.value, JM.BondSet) ? JU.Escape.eBond (bs) : JU.Escape.eBS (bs));
case 7:
var sv = (x).getList ();
i = x.intValue;
if (i <= 0) i = sv.size () - i;
if (i != 2147483647) return (i < 1 || i > sv.size () ? "" : JS.SV.sValue (sv.get (i - 1)));
case 6:
case 14:
if (Clazz.instanceOf (x.value, String)) return x.value;
sb =  new JU.SB ();
JS.SV.sValueArray (sb, x, "", "", false, true, true, 2147483647, false);
return JU.PT.rep (sb.toString (), "\n\0", " ");
case 4:
var s = x.value;
i = x.intValue;
if (i <= 0) i = s.length - i;
if (i == 2147483647) return s;
if (i < 1 || i > s.length) return "";
return "" + s.charAt (i - 1);
case 8:
return JU.Escape.eP (x.value);
case 9:
return JU.Escape.eP4 (x.value);
case 11:
case 12:
return JU.Escape.e (x.value);
default:
return x.value.toString ();
}
}, "JS.T");
c$.sValueArray = Clazz.defineMethod (c$, "sValueArray", 
 function (sb, vx, path, tabs, isEscaped, isRaw, addValues, maxLevels, skipEmpty) {
switch (vx.tok) {
case 6:
case 14:
case 7:
var thiskey = ";" + vx.hashCode () + ";";
if (path.indexOf (thiskey) >= 0) {
sb.append (isEscaped ? (vx.tok == 7 ? "[ ]" : "{ }") : (vx.tok == 7 ? "" : "\0") + "\"<" + (vx.myName == null ? "circular reference" : vx.myName) + ">\"");
break;
}path += thiskey;
if (vx.tok == 7) {
if (!addValues) return;
if (!isRaw) sb.append (isEscaped ? "[ " : tabs + "[\n");
var sx = vx.getList ();
for (var i = 0; i < sx.size (); i++) {
if (isEscaped && i > 0) sb.append (",");
var sv = sx.get (i);
JS.SV.sValueArray (sb, sv, path, tabs + "  ", isEscaped, tabs.length == 0 && !isEscaped && JS.SV.isRawType (sv.tok), addValues, maxLevels, skipEmpty);
if (!isEscaped) sb.append ("\n");
}
if (!isRaw) sb.append (isEscaped ? " ]" : tabs + "]");
} else if (--maxLevels >= 0) {
var ht = (vx.tok == 14 ? (vx.value).getFullMap () : vx.getMap ());
JS.SV.sValueAddKeys (sb, path, ht, tabs, isEscaped, addValues, maxLevels, skipEmpty);
}break;
default:
if (!addValues) return;
if (!isRaw && !isEscaped) sb.append (tabs);
sb.append (isEscaped ? vx.escape () : JS.SV.sValue (vx));
}
}, "JU.SB,JS.SV,~S,~S,~B,~B,~B,~N,~B");
c$.sValueAddKeys = Clazz.defineMethod (c$, "sValueAddKeys", 
 function (sb, path, ht, tabs, isEscaped, addValues, maxLevels, skipEmpty) {
if (maxLevels < 0) return;
var keyset = ht.keySet ();
var keys = ht.keySet ().toArray ( new Array (keyset.size ()));
java.util.Arrays.sort (keys);
if (isEscaped) {
sb.append ("{ ");
var sep = "";
for (var i = 0; i < keys.length; i++) {
var key = keys[i];
var val = ht.get (key);
if (skipEmpty && (val.tok == 7 && val.getList ().size () == 0 || val.tok == 6 && val.getMap ().isEmpty ())) continue;
if (addValues) sb.append (sep).append (JU.PT.esc (key)).append (":");
 else sb.appendC (' ').append (key);
JS.SV.sValueArray (sb, val, path, tabs + "  ", true, false, addValues, maxLevels, skipEmpty);
sep = ",";
}
sb.append (" }");
if (!addValues) sb.append ("\n");
return;
}sb.append (tabs).append ("{\n");
tabs += "  ";
for (var i = 0; i < keys.length; i++) {
sb.append (tabs);
var key = keys[i];
sb.append (JU.PT.esc (key)).append ("  :");
var sb2 =  new JU.SB ();
if (!(Clazz.instanceOf (ht.get (key), JS.SV))) ht.put (key, JS.SV.getVariable (ht.get (key)));
var v = ht.get (key);
isEscaped = JS.SV.isRawType (v.tok);
JS.SV.sValueArray (sb2, v, path, tabs, isEscaped, false, addValues, maxLevels, skipEmpty);
var value = sb2.toString ();
if (isEscaped && addValues) sb.append ("  ");
 else sb.append ("\n");
sb.append (value).append ("\n");
}
sb.append (tabs.substring (1)).append ("}");
}, "JU.SB,~S,java.util.Map,~S,~B,~B,~N,~B");
c$.isRawType = Clazz.defineMethod (c$, "isRawType", 
 function (tok) {
switch (tok) {
case 4:
case 3:
case 2:
case 8:
case 9:
case 10:
case 15:
case 1073742335:
case 1073742334:
return true;
}
return false;
}, "~N");
c$.ptValue = Clazz.defineMethod (c$, "ptValue", 
function (x) {
switch (x.tok) {
case 8:
return x.value;
case 4:
var o = JU.Escape.uP (x.value);
if (Clazz.instanceOf (o, JU.P3)) return o;
}
return null;
}, "JS.SV");
c$.pt4Value = Clazz.defineMethod (c$, "pt4Value", 
function (x) {
switch (x.tok) {
case 9:
return x.value;
case 4:
var o = JU.Escape.uP (x.value);
if (!(Clazz.instanceOf (o, JU.P4))) break;
return o;
}
return null;
}, "JS.SV");
c$.toFloat = Clazz.defineMethod (c$, "toFloat", 
 function (s) {
return (s.equalsIgnoreCase ("true") ? 1 : s.length == 0 || s.equalsIgnoreCase ("false") ? 0 : JU.PT.parseFloatStrict (JU.PT.trim (s, " \t\n")));
}, "~S");
c$.concatList = Clazz.defineMethod (c$, "concatList", 
function (x1, x2, asNew) {
var v1 = x1.getList ();
var v2 = x2.getList ();
if (!asNew) {
if (v2 == null) v1.addLast (JS.SV.newT (x2));
 else for (var i = 0; i < v2.size (); i++) v1.addLast (v2.get (i));

return x1;
}var vlist =  new JU.Lst ();
if (v1 == null) vlist.addLast (x1);
 else for (var i = 0; i < v1.size (); i++) vlist.addLast (v1.get (i));

if (v2 == null) vlist.addLast (x2);
 else for (var i = 0; i < v2.size (); i++) vlist.addLast (v2.get (i));

return JS.SV.getVariableList (vlist);
}, "JS.SV,JS.SV,~B");
c$.bsSelectToken = Clazz.defineMethod (c$, "bsSelectToken", 
 function (x) {
return JS.SV.selectItemTok (x, -2147483648).value;
}, "JS.T");
c$.bsSelectRange = Clazz.defineMethod (c$, "bsSelectRange", 
function (x, n) {
x = JS.SV.selectItemTok (x, -2147483648);
x = JS.SV.selectItemTok (x, (n <= 0 ? n : 1));
x = JS.SV.selectItemTok (x, (n <= 0 ? 2147483646 : n));
return x.value;
}, "JS.T,~N");
c$.selectItemVar = Clazz.defineMethod (c$, "selectItemVar", 
function ($var) {
return ($var.index != 2147483647 || ($var.tok == 7 || $var.tok == 15) && $var.intValue == 2147483647 ? $var : JS.SV.selectItemTok ($var, -2147483648));
}, "JS.SV");
c$.selectItemTok = Clazz.defineMethod (c$, "selectItemTok", 
function (tokenIn, i2) {
switch (tokenIn.tok) {
case 11:
case 12:
case 10:
case 7:
case 15:
case 4:
break;
default:
return ((Clazz.instanceOf (tokenIn, JS.SV)) && (tokenIn).myName != null ? JS.SV.newI (0).setv (tokenIn) : tokenIn);
}
var bs = null;
var s = null;
var i1 = tokenIn.intValue;
var isOne = (i2 == -2147483648);
if (i1 == 2147483647) {
return JS.SV.newSV (tokenIn.tok, (isOne ? i1 : i2), tokenIn.value);
}var len = 0;
var isInputSelected = (Clazz.instanceOf (tokenIn, JS.SV) && (tokenIn).index != 2147483647);
var tokenOut = JS.SV.newSV (tokenIn.tok, 2147483647, null);
switch (tokenIn.tok) {
case 10:
if (Clazz.instanceOf (tokenIn.value, JM.BondSet)) {
bs = JM.BondSet.newBS (tokenIn.value, (tokenIn.value).associatedAtoms);
len = bs.cardinality ();
} else {
bs = JU.BSUtil.copy (tokenIn.value);
len = (isInputSelected ? 1 : bs.cardinality ());
}break;
case 15:
len = (((tokenIn).value)).data.length;
break;
case 7:
len = (tokenIn).getList ().size ();
break;
case 4:
s = tokenIn.value;
len = s.length;
break;
case 11:
len = -3;
break;
case 12:
len = -4;
break;
}
if (len < 0) {
len = -len;
if (i1 > 0 && Math.abs (i1) > len) {
var col = i1 % 10;
var row = Clazz.doubleToInt ((i1 - col) / 10);
if (col > 0 && col <= len && row <= len) {
if (tokenIn.tok == 11) return JS.SV.newV (3, Float.$valueOf ((tokenIn.value).getElement (row - 1, col - 1)));
return JS.SV.newV (3, Float.$valueOf ((tokenIn.value).getElement (row - 1, col - 1)));
}return JS.SV.newV (4, "");
}if (Math.abs (i1) > len) return JS.SV.newV (4, "");
var data =  Clazz.newFloatArray (len, 0);
if (len == 3) {
if (i1 < 0) (tokenIn.value).getColumn (-1 - i1, data);
 else (tokenIn.value).getRow (i1 - 1, data);
} else {
if (i1 < 0) (tokenIn.value).getColumn (-1 - i1, data);
 else (tokenIn.value).getRow (i1 - 1, data);
}if (isOne) return JS.SV.getVariableAF (data);
if (i2 < 1 || i2 > len) return JS.SV.newV (4, "");
return JS.SV.newV (3, Float.$valueOf (data[i2 - 1]));
}if (i1 <= 0) i1 = len + i1;
if (!isOne) {
if (i1 < 1) i1 = 1;
if (i2 == 0) i2 = len;
 else if (i2 < 0) i2 = len + i2;
if (i2 < i1) i2 = i1;
}switch (tokenIn.tok) {
case 10:
tokenOut.value = bs;
if (isInputSelected) {
if (i1 > 1) bs.clearAll ();
break;
}if (isOne) {
if (i1 == len) {
i2 = bs.length () - 1;
} else if (i1 == 1) {
i2 = bs.nextSetBit (0);
}if (i2 >= -1) {
bs.clearAll ();
if (i2 >= 0) bs.set (i2);
break;
}i2 = i1;
}var n = 0;
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) if (++n < i1 || n > i2) bs.clear (j);

break;
case 4:
tokenOut.value = (--i1 < 0 || i1 >= len ? "" : isOne ? s.substring (i1, i1 + 1) : s.substring (i1, Math.min (i2, len)));
break;
case 7:
if (--i1 < 0 || i1 >= len) return JS.SV.newV (4, "");
if (isOne) return (tokenIn).getList ().get (i1);
var o2 =  new JU.Lst ();
var o1 = (tokenIn).getList ();
var nn = Math.min (i2, len) - i1;
for (var i = 0; i < nn; i++) o2.addLast (JS.SV.newT (o1.get (i + i1)));

tokenOut.value = o2;
break;
case 15:
if (--i1 < 0 || i1 >= len) return JS.SV.newV (4, "");
var data = (((tokenIn).value)).data;
if (isOne) return JS.SV.newI (data[i1]);
var b =  Clazz.newByteArray (Math.min (i2, len) - i1, 0);
for (var i = b.length; --i >= 0; ) b[i] = data[i1 + i];

tokenOut.value =  new JU.BArray (b);
break;
}
return tokenOut;
}, "JS.T,~N");
Clazz.defineMethod (c$, "setSelectedValue", 
function (pt1, pt2, $var) {
if (pt1 == 2147483647) return;
var len;
switch (this.tok) {
case 11:
case 12:
len = (this.tok == 11 ? 3 : 4);
if (pt2 != 2147483647) {
var col = pt2;
var row = pt1;
if (col > 0 && col <= len && row <= len) {
if (this.tok == 11) (this.value).setElement (row - 1, col - 1, JS.SV.fValue ($var));
 else (this.value).setElement (row - 1, col - 1, JS.SV.fValue ($var));
return;
}}if (pt1 != 0 && Math.abs (pt1) <= len && $var.tok == 7) {
var sv = $var.getList ();
if (sv.size () == len) {
var data =  Clazz.newFloatArray (len, 0);
for (var i = 0; i < len; i++) data[i] = JS.SV.fValue (sv.get (i));

if (pt1 > 0) {
if (this.tok == 11) (this.value).setRowA (pt1 - 1, data);
 else (this.value).setRowA (pt1 - 1, data);
} else {
if (this.tok == 11) (this.value).setColumnA (-1 - pt1, data);
 else (this.value).setColumnA (-1 - pt1, data);
}break;
}}break;
case 4:
var str = this.value;
var pt = str.length;
if (pt1 <= 0) pt1 = pt + pt1;
if (--pt1 < 0) pt1 = 0;
while (pt1 >= str.length) str += " ";

if (pt2 == 2147483647) {
pt2 = pt1;
} else {
if (--pt2 < 0) pt2 = pt + pt2;
while (pt2 >= str.length) str += " ";

}if (pt2 >= pt1) this.value = str.substring (0, pt1) + JS.SV.sValue ($var) + str.substring (++pt2);
this.intValue = this.index = 2147483647;
break;
case 7:
var v = this.value;
len = v.size ();
if (pt1 <= 0) pt1 = len + pt1;
if (--pt1 < 0) pt1 = 0;
if (len <= pt1) for (var i = len; i <= pt1; i++) v.addLast (JS.SV.newV (4, ""));

v.set (pt1, $var);
break;
}
}, "~N,~N,JS.SV");
Clazz.defineMethod (c$, "escape", 
function () {
switch (this.tok) {
case 4:
return JU.PT.esc (this.value);
case 11:
case 12:
return JU.PT.toJSON (null, this.value);
case 7:
case 6:
case 14:
var sb =  new JU.SB ();
JS.SV.sValueArray (sb, this, "", "", true, false, true, 2147483647, false);
return sb.toString ();
default:
return JS.SV.sValue (this);
}
});
c$.unescapePointOrBitsetAsVariable = Clazz.defineMethod (c$, "unescapePointOrBitsetAsVariable", 
function (o) {
if (o == null) return o;
var v = null;
var s = null;
if (Clazz.instanceOf (o, JS.SV)) {
var sv = o;
switch (sv.tok) {
case 8:
case 9:
case 11:
case 12:
case 10:
v = sv.value;
break;
case 4:
s = sv.value;
break;
default:
s = JS.SV.sValue (sv);
break;
}
} else if (Clazz.instanceOf (o, String)) {
s = o;
}if (s != null && s.length == 0) return s;
if (v == null) v = JU.Escape.uABsM (s);
if (Clazz.instanceOf (v, JU.P3)) return (JS.SV.newV (8, v));
if (Clazz.instanceOf (v, JU.P4)) return JS.SV.newV (9, v);
if (Clazz.instanceOf (v, JU.BS)) {
if (s != null && s.indexOf ("[{") == 0) v = JM.BondSet.newBS (v, null);
return JS.SV.newV (10, v);
}if (Clazz.instanceOf (v, JU.M34)) return (JS.SV.newV (Clazz.instanceOf (v, JU.M3) ? 11 : 12, v));
return o;
}, "~O");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (value) {
return JS.SV.newT (value ? JS.SV.vT : JS.SV.vF);
}, "~B");
c$.sprintf = Clazz.defineMethod (c$, "sprintf", 
function (strFormat, $var) {
if ($var == null) return strFormat;
var isArray = ($var.tok == 7);
var vd = (strFormat.indexOf ("d") >= 0 || strFormat.indexOf ("i") >= 0 ?  Clazz.newIntArray (1, 0) : null);
var vf = (strFormat.indexOf ("f") >= 0 ?  Clazz.newFloatArray (1, 0) : null);
var ve = (strFormat.indexOf ("e") >= 0 ?  Clazz.newDoubleArray (1, 0) : null);
var getS = (strFormat.indexOf ("s") >= 0);
var getP = (strFormat.indexOf ("p") >= 0 && (isArray || $var.tok == 8));
var getQ = (strFormat.indexOf ("q") >= 0 && (isArray || $var.tok == 9));
var of =  Clazz.newArray (-1, [vd, vf, ve, null, null, null]);
if (!isArray) return JS.SV.sprintf (strFormat, $var, of, vd, vf, ve, getS, getP, getQ);
var sv = $var.getList ();
var list2 =  new Array (sv.size ());
for (var i = 0; i < list2.length; i++) list2[i] = JS.SV.sprintf (strFormat, sv.get (i), of, vd, vf, ve, getS, getP, getQ);

return list2;
}, "~S,JS.SV");
c$.sprintf = Clazz.defineMethod (c$, "sprintf", 
 function (strFormat, $var, of, vd, vf, ve, getS, getP, getQ) {
if ($var.tok == 6) {
var pt = strFormat.indexOf ("[");
if (pt >= 0) {
var pt1;
$var = $var.getMap ().get (strFormat.substring (pt + 1, pt1 = strFormat.indexOf ("]")));
strFormat = strFormat.substring (0, pt) + strFormat.substring (pt1 + 1);
}}if (vd != null) vd[0] = JS.SV.iValue ($var);
if (vf != null) vf[0] = JS.SV.fValue ($var);
if (ve != null) ve[0] = JS.SV.fValue ($var);
if (getS) of[3] = JS.SV.sValue ($var);
if (getP) of[4] = $var.value;
if (getQ) of[5] = $var.value;
return JU.PT.sprintf (strFormat, "IFDspq", of);
}, "~S,JS.SV,~A,~A,~A,~A,~B,~B,~B");
c$.getFormatType = Clazz.defineMethod (c$, "getFormatType", 
function (format) {
return (format.indexOf (";") >= 0 ? -1 : ";json;base64;bytearray;array;".indexOf (";" + format.toLowerCase () + ";"));
}, "~S");
c$.format = Clazz.defineMethod (c$, "format", 
function (args, pt) {
switch (args.length) {
case 0:
return "";
case 1:
return JS.SV.sValue (args[0]);
case 2:
if (pt == 2147483647) pt = JS.SV.getFormatType (args[0].asString ());
switch (pt) {
case 0:
var name = args[1].myName;
args[1].myName = null;
var o = args[1].toJSON ();
args[1].myName = name;
return o;
case 5:
case 12:
case 22:
var bytes;
switch (args[1].tok) {
case 15:
bytes = JU.AU.arrayCopyByte ((args[1].value).data, -1);
break;
case 7:
var l = args[1].getList ();
if (pt == 22) {
var l1 =  new JU.Lst ();
for (var i = l.size (); --i >= 0; ) l1.addLast (l.get (i));

return l1;
}bytes =  Clazz.newByteArray (l.size (), 0);
for (var i = bytes.length; --i >= 0; ) bytes[i] = l.get (i).asInt ();

break;
default:
var s = args[1].asString ();
if (s.startsWith (";base64,")) {
if (pt == 5) return s;
bytes = JU.Base64.decodeBase64 (s);
} else {
bytes = s.getBytes ();
}}
return (pt == 22 ? JS.SV.getVariable (bytes) : pt == 12 ?  new JU.BArray (bytes) : ";base64," + JU.Base64.getBase64 (bytes).toString ());
}
}
var format = JU.PT.split (JU.PT.rep (JS.SV.sValue (args[0]), "%%", "\1"), "%");
if (format.length == 0) return "";
var sb =  new JU.SB ();
sb.append (format[0]);
for (var i = 1; i < format.length; i++) {
var ret = JS.SV.sprintf (JU.PT.formatCheck ("%" + format[i]), (args[1].tok == 6 ? args[1] : args[1].tok == 7 ? args[1].getList ().get (i - 1) : i < args.length ? args[i] : null));
if (JU.AU.isAS (ret)) {
var list = ret;
for (var j = 0; j < list.length; j++) sb.append (list[j]).append ("\n");

continue;
}sb.append (ret);
}
return sb.toString ();
}, "~A,~N");
c$.getBitSet = Clazz.defineMethod (c$, "getBitSet", 
function (x, allowNull) {
switch (x.tok) {
case 10:
return (x.index == 2147483647 ? JS.SV.selectItemTok (x, -2147483648) : x).value;
case 7:
return JS.SV.unEscapeBitSetArray (x.getList (), allowNull);
default:
return (allowNull ? null :  new JU.BS ());
}
}, "JS.SV,~B");
c$.unEscapeBitSetArray = Clazz.defineMethod (c$, "unEscapeBitSetArray", 
function (x, allowNull) {
var bs =  new JU.BS ();
for (var i = 0; i < x.size (); i++) {
var v = x.get (i);
if (v.tok == 2 && v.intValue >= 0) {
bs.set (v.intValue);
} else if (v.tok == 7) {
var bs2 = JS.SV.unEscapeBitSetArray (v.getList (), true);
if (bs2 == null) return (allowNull ? null :  new JU.BS ());
bs.or (bs2);
} else if (!JS.SV.unEscapeBitSet (v, bs)) {
return (allowNull ? null :  new JU.BS ());
}}
return bs;
}, "JU.Lst,~B");
c$.areEqual = Clazz.defineMethod (c$, "areEqual", 
function (x1, x2) {
if (x1 == null || x2 == null) return false;
if (x1.tok == x2.tok) {
switch (x1.tok) {
case 4:
return (x1.value).equalsIgnoreCase (x2.value);
case 10:
case 15:
case 6:
case 7:
case 14:
return x1.equals (x2);
case 8:
return ((x1.value).distance (x2.value) < 0.000001);
case 9:
return ((x1.value).distance4 (x2.value) < 0.000001);
case 11:
return (x1.value).equals (x2.value);
case 12:
return (x1.value).equals (x2.value);
}
}return (Math.abs (JS.SV.fValue (x1) - JS.SV.fValue (x2)) < 0.000001);
}, "JS.SV,JS.SV");
c$.isLike = Clazz.defineMethod (c$, "isLike", 
function (x1, x2) {
return (x1 != null && x2 != null && x1.tok == 4 && x2.tok == 4 && JU.PT.isLike (x1.value, x2.value));
}, "JS.SV,JS.SV");
Clazz.defineMethod (c$, "sortOrReverse", 
function (arrayPt) {
var x = this.getList ();
if (x != null && x.size () > 1) {
if (arrayPt == -2147483648) {
var n = x.size ();
for (var i = 0; i < n; i++) {
var v = x.get (i);
x.set (i, x.get (--n));
x.set (n, v);
}
} else {
java.util.Collections.sort (this.getList (), Clazz.innerTypeInstance (JS.SV.Sort, this, null, --arrayPt, null));
}}return this;
}, "~N");
Clazz.defineMethod (c$, "pushPop", 
function (mapKey, value) {
if (mapKey == null) {
var m = this.getMap ();
if (m == null) {
var x = this.getList ();
if (value == null || x == null) {
return (x == null || x.size () == 0 ? JS.SV.newS ("") : x.removeItemAt (x.size () - 1));
}x.addLast (JS.SV.newI (0).setv (value));
} else {
if (value == null) {
m.clear ();
} else {
var m1 = value.getMap ();
if (m1 != null) m.putAll (m1);
}}} else {
var m = this.getMap ();
if (value == null) {
var v = null;
if (m == null) {
var lst = this.getList ();
var len = lst.size ();
var i = JS.SV.iValue (mapKey) - 1;
if (i < 0) i += len;
if (i >= 0 && i < len) {
v = lst.removeItemAt (i);
}} else {
v = m.remove (mapKey.asString ());
}return (v == null ? JS.SV.newS ("") : v);
}if (m != null) {
m.put (mapKey.asString (), JS.SV.newI (0).setv (value));
}}return this;
}, "JS.SV,JS.SV");
c$.unEscapeBitSet = Clazz.defineMethod (c$, "unEscapeBitSet", 
 function (x, bs) {
switch (x.tok) {
case 4:
var bs1 = JU.BS.unescape (x.value);
if (bs1 == null) return false;
bs.or (bs1);
return true;
case 10:
bs.or (x.value);
return true;
}
return false;
}, "JS.SV,JU.BS");
c$.strListValue = Clazz.defineMethod (c$, "strListValue", 
function (x) {
if (x.tok != 7) return  Clazz.newArray (-1, [JS.SV.sValue (x)]);
var sv = (x).getList ();
var list =  new Array (sv.size ());
for (var i = sv.size (); --i >= 0; ) list[i] = JS.SV.sValue (sv.get (i));

return list;
}, "JS.T");
c$.getArrayDepth = Clazz.defineMethod (c$, "getArrayDepth", 
function (x) {
var n = 0;
var sv;
while (x.tok == 7 && (sv = (x).getList ()).size () > 0) {
n++;
x = sv.get (0);
}
return n;
}, "JS.T");
c$.fflistValue = Clazz.defineMethod (c$, "fflistValue", 
function (x, nMin) {
if (x.tok != 7) return  Clazz.newArray (-1, [ Clazz.newFloatArray (-1, [JS.SV.fValue (x)])]);
var sv = (x).getList ();
var svlen = sv.size ();
var list;
list = JU.AU.newFloat2 (svlen);
if (nMin == 0) nMin = list.length;
for (var i = list.length; --i >= 0; ) list[i] = JS.SV.flistValue (i >= svlen ? null : sv.get (i), 0);

return list;
}, "JS.T,~N");
c$.flistValue = Clazz.defineMethod (c$, "flistValue", 
function (x, nMin) {
if (x.tok != 7) return  Clazz.newFloatArray (-1, [JS.SV.fValue (x)]);
var sv = (x).getList ();
var list;
list =  Clazz.newFloatArray (Math.max (nMin, sv.size ()), 0);
if (nMin == 0) nMin = list.length;
for (var i = Math.min (sv.size (), nMin); --i >= 0; ) list[i] = JS.SV.fValue (sv.get (i));

return list;
}, "JS.T,~N");
Clazz.defineMethod (c$, "toArray", 
function () {
var dim;
var o2;
var m3 = null;
var m4 = null;
switch (this.tok) {
case 11:
m3 = this.value;
dim = 3;
break;
case 12:
m4 = this.value;
dim = 4;
break;
case 7:
return this;
default:
o2 =  new JU.Lst ();
o2.addLast (this);
return JS.SV.newV (7, o2);
}
o2 =  new JU.Lst ();
for (var i = 0; i < dim; i++) {
var a =  Clazz.newFloatArray (dim, 0);
if (m3 == null) m4.getRow (i, a);
 else m3.getRow (i, a);
o2.addLast (JS.SV.getVariableAF (a));
}
return JS.SV.newV (7, o2);
});
Clazz.defineMethod (c$, "mapValue", 
function (key) {
switch (this.tok) {
case 6:
return (this.value).get (key);
case 14:
var sc = (this.value);
return (key.equals ("_path") ? JS.SV.newS (sc.contextPath) : sc.getVariable (key));
}
return null;
}, "~S");
Clazz.defineMethod (c$, "getList", 
function () {
return (this.tok == 7 ? this.value : null);
});
c$.isScalar = Clazz.defineMethod (c$, "isScalar", 
function (x) {
switch (x.tok) {
case 7:
return false;
case 4:
return ((x.value).indexOf ("\n") < 0);
default:
return true;
}
}, "JS.SV");
Clazz.overrideMethod (c$, "toJSON", 
function () {
switch (this.tok) {
case 1073742335:
case 1073742334:
case 2:
case 3:
return JS.SV.sValue (this);
case 15:
return JU.PT.byteArrayToJSON ((this.value).data);
case 14:
return JU.PT.toJSON (null, (this.value).getFullMap ());
case 7:
case 6:
if (this.myName != null) {
this.myName = null;
return (this.tok == 6 ? "{  }" : "[  ]");
}this.myName = "x";
var s = JU.PT.toJSON (null, this.value);
this.myName = null;
return s;
default:
return JU.PT.toJSON (null, this.value);
}
});
Clazz.defineMethod (c$, "mapGet", 
function (key) {
return this.getMap ().get (key);
}, "~S");
Clazz.defineMethod (c$, "mapPut", 
function (key, v) {
this.getMap ().put (key, v);
}, "~S,JS.SV");
Clazz.defineMethod (c$, "getMap", 
function () {
switch (this.tok) {
case 6:
return this.value;
case 14:
return (this.value).vars;
}
return null;
});
Clazz.defineMethod (c$, "getMapKeys", 
function (nLevels, skipEmpty) {
if (this.tok != 6) return "";
var sb =  new JU.SB ();
JS.SV.sValueArray (sb, this, "", "", true, false, false, nLevels + 1, skipEmpty);
return sb.toString ();
}, "~N,~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.toString2 () + "[" + this.myName + " index =" + this.index + " intValue=" + this.intValue + "]";
});
Clazz.defineMethod (c$, "getKeys", 
function (isAll) {
switch (this.tok) {
case 6:
case 14:
case 7:
break;
default:
return null;
}
var keys =  new JU.Lst ();
this.getKeyList (isAll, keys, "");
var skeys = keys.toArray ( new Array (keys.size ()));
java.util.Arrays.sort (skeys);
return skeys;
}, "~B");
Clazz.defineMethod (c$, "getKeyList", 
 function (isAll, keys, prefix) {
var map = this.getMap ();
if (map == null) {
if (isAll) {
var lst;
var n;
if ((lst = this.getList ()) != null && (n = lst.size ()) > 0) lst.get (n - 1).getKeyList (true, keys, prefix + "." + n + ".");
}return;
}for (var e, $e = map.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var k = e.getKey ();
if (isAll && (k.length == 0 || !JU.PT.isLetter (k.charAt (0)))) {
if (prefix.endsWith (".")) prefix = prefix.substring (0, prefix.length - 1);
k = "[" + JU.PT.esc (k) + "]";
}keys.addLast (prefix + k);
if (isAll) e.getValue ().getKeyList (true, keys, prefix + k + ".");
}
}, "~B,JU.Lst,~S");
c$.deepCopy = Clazz.defineMethod (c$, "deepCopy", 
function (v, isHash, isDeep) {
if (isHash) {
var vold = v;
var vnew =  new java.util.Hashtable ();
for (var e, $e = vold.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var v1 = e.getValue ();
vnew.put (e.getKey (), isDeep ? JS.SV.deepCopySV (v1) : v1);
}
return vnew;
}var vold2 = v;
var vnew2 =  new JU.Lst ();
for (var i = 0, n = vold2.size (); i < n; i++) {
var vm = vold2.get (i);
vnew2.addLast (isDeep ? JS.SV.deepCopySV (vm) : vm);
}
return vnew2;
}, "~O,~B,~B");
c$.deepCopySV = Clazz.defineMethod (c$, "deepCopySV", 
 function (vm) {
switch (vm.tok) {
case 6:
case 7:
if ("\r".equals (vm.myName)) {
vm.myName = null;
vm = JS.SV.newV (vm.tok, (vm.tok == 6 ?  new java.util.Hashtable () :  new JU.Lst ()));
} else {
var name0 = vm.myName;
vm.myName = "\r";
var vm0 = vm;
vm = JS.SV.newV (vm.tok, JS.SV.deepCopy (vm.value, vm.tok == 6, true));
vm0.myName = name0;
}break;
}
return vm;
}, "JS.SV");
Clazz.defineMethod (c$, "sortMapArray", 
function (key) {
var lst = this.getList ();
if (lst != null) {
java.util.Collections.sort (this.getList (), Clazz.innerTypeInstance (JS.SV.Sort, this, null, 0, key));
}return this;
}, "~S");
c$.safeJSON = Clazz.defineMethod (c$, "safeJSON", 
function (key, property) {
return "{" + (Clazz.instanceOf (property, JS.SV) ? JU.PT.esc (key) + " : " + JS.SV.format ( Clazz.newArray (-1, [null, property]), 0) : JU.PT.toJSON (key, property)) + "}";
}, "~S,~O");
c$.$SV$Sort$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.arrayPt = 0;
this.myKey = null;
Clazz.instantialize (this, arguments);
}, JS.SV, "Sort", null, java.util.Comparator);
Clazz.makeConstructor (c$, 
function (a, b) {
this.arrayPt = a;
this.myKey = b;
}, "~N,~S");
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
if (a.tok != b.tok) {
if (a.tok == 3 || a.tok == 2 || b.tok == 3 || b.tok == 2) {
var c = JS.SV.fValue (a);
var d = JS.SV.fValue (b);
return (c < d ? -1 : c > d ? 1 : 0);
}if (a.tok == 4 || b.tok == 4) return JS.SV.sValue (a).compareTo (JS.SV.sValue (b));
}switch (a.tok) {
case 4:
return JS.SV.sValue (a).compareTo (JS.SV.sValue (b));
case 7:
var c = a.getList ();
var d = b.getList ();
if (c.size () != d.size ()) return (c.size () < d.size () ? -1 : 1);
var e = this.arrayPt;
if (e < 0) e += c.size ();
if (e < 0 || e >= c.size ()) return 0;
return this.compare (c.get (e), d.get (e));
case 6:
if (this.myKey != null) {
return this.compare (a.getMap ().get (this.myKey), b.getMap ().get (this.myKey));
}default:
var f = JS.SV.fValue (a);
var g = JS.SV.fValue (b);
return (f < g ? -1 : f > g ? 1 : 0);
}
}, "JS.SV,JS.SV");
c$ = Clazz.p0p ();
};
c$.vT = c$.prototype.vT = JS.SV.newSV (1073742335, 1, "true");
c$.vF = c$.prototype.vF = JS.SV.newSV (1073742334, 0, "false");
c$.pt0 = c$.prototype.pt0 =  new JU.P3 ();
});
