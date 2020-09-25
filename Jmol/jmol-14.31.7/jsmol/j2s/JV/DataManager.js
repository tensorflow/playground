Clazz.declarePackage ("JV");
Clazz.load (["J.api.JmolDataManager", "java.util.Hashtable"], "JV.DataManager", ["JU.AU", "$.BS", "$.PT", "$.SB", "J.c.VDW", "JS.T", "JU.BSUtil", "$.Elements", "$.Escape", "$.Logger", "$.Parser"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataValues = null;
this.vwr = null;
Clazz.instantialize (this, arguments);
}, JV, "DataManager", null, J.api.JmolDataManager);
Clazz.prepareFields (c$, function () {
this.dataValues =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (vwr) {
this.vwr = vwr;
return this;
}, "JV.Viewer");
Clazz.overrideMethod (c$, "clear", 
function () {
this.dataValues.clear ();
});
Clazz.overrideMethod (c$, "setData", 
function (type, data, arrayCount, actualAtomCount, matchField, matchFieldColumnCount, field, fieldColumnCount) {
if (type == null) {
this.clear ();
return;
}type = type.toLowerCase ();
if (type.equals ("element_vdw")) {
var stringData = (data[1]).trim ();
if (stringData.length == 0) {
this.vwr.userVdwMars = null;
this.vwr.userVdws = null;
this.vwr.bsUserVdws = null;
return;
}if (this.vwr.bsUserVdws == null) this.vwr.setUserVdw (this.vwr.defaultVdw);
JU.Parser.parseFloatArrayFromMatchAndField (stringData, this.vwr.bsUserVdws, 1, 0, data[2], 2, 0, this.vwr.userVdws, 1);
for (var i = this.vwr.userVdws.length; --i >= 0; ) this.vwr.userVdwMars[i] = Clazz.doubleToInt (Math.floor (this.vwr.userVdws[i] * 1000));

return;
}var depth = this.getType (data);
var val = data[1];
if (depth == -1) data[3] = Integer.$valueOf (depth = (Clazz.instanceOf (val, String) ? 0 : JU.AU.isAF (val) ? 1 : JU.AU.isAFF (val) ? 2 : JU.AU.isAFFF (val) ? 3 : -1));
if (data[2] != null && arrayCount > 0) {
var createNew = (matchField != 0 || field != -2147483648 && field != 2147483647);
var oldData = this.dataValues.get (type);
var bs;
var f = (oldData == null || createNew ?  Clazz.newFloatArray (actualAtomCount, 0) : JU.AU.ensureLengthA ((oldData[1]), actualAtomCount));
var ff = null;
if (depth == -1) {
JU.Logger.error ("Cannot determine data type for " + val);
return;
}var stringData = (depth == 0 ? val : null);
var floatData = (depth == 1 ? val : null);
var strData = null;
var ffData = (depth == 2 ? val : null);
if (field == -2147483648 && (strData = JU.PT.getTokens (stringData)).length > 1) field = 0;
if (field == -2147483648) {
bs = data[2];
JV.DataManager.setSelectedFloats (JU.PT.parseFloat (stringData), bs, f);
} else if (field == 0 || field == 2147483647) {
bs = data[2];
if (floatData != null) {
var n = floatData.length;
if (n == bs.cardinality ()) {
this.fillSparseArray (floatData, bs, f);
} else {
for (var i = bs.nextSetBit (0); i >= 0 && i < n; i = bs.nextSetBit (i + 1)) f[i] = floatData[i];

}} else if (stringData != null) {
JU.Parser.parseFloatArrayBsData (strData == null ? JU.PT.getTokens (stringData) : strData, bs, f);
} else if (ffData != null) {
var n = ffData.length;
ff = (oldData == null || createNew ? JU.AU.newFloat2 (actualAtomCount) : JU.AU.ensureLength (oldData[1], actualAtomCount));
if (n == bs.cardinality ()) {
for (var i = bs.nextSetBit (0), pt = 0; i >= 0; i = bs.nextSetBit (i + 1), pt++) this.fillSparseArray (ffData[pt], bs, ff[i] =  Clazz.newFloatArray (actualAtomCount, 0));

} else {
for (var i = bs.nextSetBit (0); i >= 0 && i < n; i = bs.nextSetBit (i + 1)) ff[i] = ffData[i];

}}} else if (matchField <= 0) {
bs = data[2];
JU.Parser.parseFloatArrayFromMatchAndField (stringData, bs, 0, 0, null, field, fieldColumnCount, f, 1);
} else {
var iData = data[2];
JU.Parser.parseFloatArrayFromMatchAndField (stringData, null, matchField, matchFieldColumnCount, iData, field, fieldColumnCount, f, 1);
bs =  new JU.BS ();
for (var i = iData.length; --i >= 0; ) if (iData[i] >= 0) bs.set (iData[i]);

}if (oldData != null && Clazz.instanceOf (oldData[2], JU.BS) && !createNew) bs.or ((oldData[2]));
data[2] = bs;
if (ff == null) {
data[3] = Integer.$valueOf (1);
data[1] = f;
} else {
data[3] = Integer.$valueOf (2);
data[1] = ff;
}if (type.indexOf ("property_atom.") == 0) {
var tok = JS.T.getSettableTokFromString (type = type.substring (14));
if (tok == 0) {
JU.Logger.error ("Unknown atom property: " + type);
return;
}var nValues = bs.cardinality ();
var fValues =  Clazz.newFloatArray (nValues, 0);
for (var n = 0, i = bs.nextSetBit (0); n < nValues; i = bs.nextSetBit (i + 1)) fValues[n++] = f[i];

this.vwr.setAtomProperty (bs, tok, 0, 0, null, fValues, null);
return;
}}this.dataValues.put (type, data);
}, "~S,~A,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "fillSparseArray", 
 function (floatData, bs, f) {
for (var i = bs.nextSetBit (0), pt = 0; i >= 0; i = bs.nextSetBit (i + 1), pt++) f[i] = floatData[pt];

}, "~A,JU.BS,~A");
Clazz.defineMethod (c$, "getType", 
 function (data) {
return (data[3]).intValue ();
}, "~A");
c$.setSelectedFloats = Clazz.defineMethod (c$, "setSelectedFloats", 
 function (f, bs, data) {
var isAll = (bs == null);
var i0 = (isAll ? 0 : bs.nextSetBit (0));
for (var i = i0; i >= 0 && i < data.length; i = (isAll ? i + 1 : bs.nextSetBit (i + 1))) data[i] = f;

}, "~N,JU.BS,~A");
Clazz.overrideMethod (c$, "getData", 
function (label, bsSelected, dataType) {
if (this.dataValues.size () == 0 || label == null) return null;
label = label.toLowerCase ();
switch (dataType) {
case -1:
case -2:
if (!label.equals ("types")) return this.dataValues.get (label);
var info =  new Array (2);
info[0] = "types";
info[1] = "";
var nv = 0;
for (var name, $name = this.dataValues.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) info[1] += (nv++ > 0 ? "\n" : "") + name;

return info;
default:
var data = this.dataValues.get (label);
if (data == null || this.getType (data) != dataType) return null;
if (bsSelected == null) return data[1];
if (data[3] === Integer.$valueOf (2)) {
var ff = data[1];
var fnew =  Clazz.newFloatArray (bsSelected.cardinality (), 0);
for (var i = 0, n = ff.length, p = bsSelected.nextSetBit (0); p >= 0 && i < n; p = bsSelected.nextSetBit (p + 1)) fnew[i++] = ff[p];

return fnew;
}var f = data[1];
var fnew =  Clazz.newFloatArray (bsSelected.cardinality (), 0);
for (var i = 0, n = f.length, p = bsSelected.nextSetBit (0); p >= 0 && i < n; p = bsSelected.nextSetBit (p + 1)) fnew[i++] = f[p];

return fnew;
}
}, "~S,JU.BS,~N");
Clazz.overrideMethod (c$, "deleteModelAtoms", 
function (firstAtomIndex, nAtoms, bsDeleted) {
if (this.dataValues.size () == 0) return;
for (var name, $name = this.dataValues.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) {
if (name.indexOf ("property_") == 0) {
var obj = this.dataValues.get (name);
JU.BSUtil.deleteBits (obj[2], bsDeleted);
obj[1] = JU.AU.deleteElements (obj[1], firstAtomIndex, nAtoms);
}}
}, "~N,~N,JU.BS");
Clazz.overrideMethod (c$, "getDefaultVdwNameOrData", 
function (type, bs) {
var sb =  new JU.SB ();
sb.append (type.getVdwLabel ()).append ("\n");
var isAll = (bs == null);
var i0 = (isAll ? 1 : bs.nextSetBit (0));
var i1 = (isAll ? JU.Elements.elementNumberMax : bs.length ());
for (var i = i0; i < i1 && i >= 0; i = (isAll ? i + 1 : bs.nextSetBit (i + 1))) sb.appendI (i).appendC ('\t').appendF (type === J.c.VDW.USER ? this.vwr.userVdws[i] : JU.Elements.getVanderwaalsMar (i, type) / 1000).appendC ('\t').append (JU.Elements.elementSymbolFromNumber (i)).appendC ('\n');

return (bs == null ? sb.toString () : "\n  DATA \"element_vdw\"\n" + sb.append ("  end \"element_vdw\";\n\n").toString ());
}, "J.c.VDW,JU.BS");
Clazz.overrideMethod (c$, "getDataState", 
function (sc, sb) {
if (this.dataValues.size () == 0) return false;
var haveData = false;
for (var name, $name = this.dataValues.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) {
if (name.indexOf ("property_") == 0) {
var obj = this.dataValues.get (name);
if (obj.length > 4 && !(obj[4]).booleanValue ()) continue;
haveData = true;
var data = obj[1];
if (data != null && this.getType (obj) == 1) {
sc.getAtomicPropertyStateBuffer (sb, 17, obj[2], name, data);
sb.append ("\n");
} else {
sb.append ("\n").append (JU.Escape.encapsulateData (name, data, -1));
}continue;
}var type = (name.indexOf ("data2d") == 0 ? 2 : name.indexOf ("data3d") == 0 ? 3 : -1);
if (type == -1) continue;
var obj = this.dataValues.get (name);
var data = obj[1];
if (data != null && this.getType (obj) == type) {
haveData = true;
sb.append ("\n").append (JU.Escape.encapsulateData (name, data, type));
}}
return haveData;
}, "JV.JmolStateCreator,JU.SB");
Clazz.overrideMethod (c$, "createFileData", 
function (strModel) {
var o =  new Array (4);
o[0] = "model";
o[1] = strModel;
o[3] = Integer.$valueOf (0);
return o;
}, "~S");
});
