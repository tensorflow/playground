Clazz.declarePackage ("J.dssx");
Clazz.load (["J.api.JmolAnnotationParser"], "J.dssx.AnnotationParser", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.PT", "$.SB", "JM.Group", "JM.BioResolver", "JS.SV", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz.declareType (J.dssx, "AnnotationParser", null, J.api.JmolAnnotationParser);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getAnnotationKVPairs", 
 function (a, match, dotPath, sb, pre, showDetail, isMappingOnly, type) {
var map = a.getMap ();
if (map == null || map.isEmpty ()) return;
if (map.containsKey ("_map")) map = map.get ("_map").getMap ();
var detailKey = this.getDataKey (type);
if (showDetail && map.containsKey (detailKey)) {
if (match == null || dotPath.indexOf (match) >= 0) sb.append (map.get (detailKey).asString ()).append ("\n");
return;
}for (var e, $e = map.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var key = e.getKey ();
if (key.equals (detailKey)) continue;
if (key.equals ("metadata")) sb.append ("\n");
var val = e.getValue ();
if (val.tok == 6) {
if (type == 1073742189 && !showDetail) {
sb.append (key).append ("\n");
} else {
this.getAnnotationKVPairs (val, match, (dotPath.length == 0 ? "" : dotPath + ".") + key, sb, (pre.length == 0 ? "" : pre + "\t") + key, showDetail, isMappingOnly, type);
}} else {
var s = val.asString ();
if (match == null || s.indexOf (match) >= 0 || pre.indexOf (match) >= 0 || key.indexOf (match) >= 0 || dotPath.indexOf (match) >= 0) {
if (showDetail && isMappingOnly) continue;
if (pre.length > 0) sb.append (pre).append ("\t");
sb.append (key).append ("=");
sb.append (s).append ("\n");
}}}
}, "JS.SV,~S,~S,JU.SB,~S,~B,~B,~N");
Clazz.defineMethod (c$, "getDataKey", 
 function (type) {
switch (type) {
case 1073741925:
return "mappings";
case 1073742189:
return "outliers";
}
return null;
}, "~N");
Clazz.overrideMethod (c$, "catalogStructureUnits", 
function (viewer, map0, modelAtomIndices, resMap, object, modelMap) {
var note = "Use within(rna3d, TYPE) where TYPE is one of: ";
var data = map0.getMap ();
if (data == null) return null;
try {
map0.mapPut ("_map", JS.SV.newV (6, data));
var list =  new JU.Lst ();
var set = data.entrySet ();
var sv;
var map;
for (var e, $e = set.iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
sv = e.getValue ();
var structures = sv.getList ();
if (structures != null) {
var key = e.getKey ();
note += "\"" + key + "\" ";
var svPath = JS.SV.newS (key);
for (var j = structures.size (); --j >= 0; ) {
var struc = structures.get (j);
map = struc.getMap ();
sv = map.get ("units");
map.put ("_isres", JS.SV.vT);
var units = (sv == null || sv.tok == 7 ? sv.getList () : sv.tok == 4 ?  new JU.Lst () : null);
if (units != null) {
if (sv.tok == 4) {
var svl = JU.PT.split (sv.asString (), ",");
for (var i = svl.length; --i >= 0; ) units.addLast (JS.SV.newS (svl[i].trim ()));

}if (units.size () > 0) {
var bsAtoms =  new JU.BS ();
map.put ("_atoms", JS.SV.getVariable (bsAtoms));
map.put ("_path", svPath);
list.addLast (struc);
for (var k = units.size (); --k >= 0; ) {
this.catalogUnit (viewer, null, units.get (k).asString (), 0, bsAtoms, modelAtomIndices, resMap, null, modelMap);
}
}}}
}}
map0.mapPut ("_list", JS.SV.newV (7, list));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.info (e + " while cataloging structures");
return null;
} else {
throw e;
}
}
return note;
}, "JV.Viewer,JS.SV,~A,java.util.Map,~O,java.util.Map");
Clazz.overrideMethod (c$, "catalogValidations", 
function (viewer, map0, modelAtomIndices, resMap, atomMap, modelMap) {
var data = map0.getMap ();
if (data == null) return null;
var retProperties =  new JU.Lst ();
var nModels = modelAtomIndices.length - 1;
try {
data = this.getMainItem (data).getMap ();
map0.mapPut ("_map", JS.SV.newV (6, data));
var list =  new JU.Lst ();
map0.mapPut ("_list", JS.SV.newV (7, list));
var set = data.entrySet ();
var sv;
var map;
for (var e, $e = set.iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var floats = JU.AU.newFloat2 (nModels);
for (var m = nModels; --m >= 0; ) floats[m] =  Clazz.newFloatArray (modelAtomIndices[m + 1] - modelAtomIndices[m], 0);

sv = e.getValue ();
var outliers = sv.getList ();
if (outliers == null) {
map = sv.getMap ();
if (map != null && (sv = map.get ("outliers")) != null) outliers = sv.getList ();
}if (outliers != null) {
var hasUnit = false;
var key = e.getKey ();
var svPath = JS.SV.newS (key);
var isRes = false;
for (var j = outliers.size (); --j >= 0; ) {
var out = outliers.get (j);
map = out.getMap ();
sv = map.get ("units");
var svv = map.get ("value");
var val = (svv == null ? 1 : JS.SV.fValue (svv));
var units = (val == 0 || sv == null || sv.tok == 7 ? sv.getList () : sv.tok == 4 ?  new JU.Lst () : null);
if (units != null) {
if (sv.tok == 4) {
var svl = JU.PT.split (sv.asString (), ",");
for (var i = svl.length; --i >= 0; ) units.addLast (JS.SV.newS (svl[i].trim ()));

}if (units.size () > 0) {
var bsAtoms =  new JU.BS ();
map.put ("_atoms", JS.SV.getVariable (bsAtoms));
map.put ("_path", svPath);
hasUnit = true;
list.addLast (out);
for (var k = units.size (); --k >= 0; ) {
var ret = this.catalogUnit (viewer, floats, units.get (k).asString (), val, bsAtoms, modelAtomIndices, resMap, atomMap, modelMap);
if (ret) map.put ("_isres", JS.SV.vT);
isRes = new Boolean (isRes | ret).valueOf ();
}
}}}
if (hasUnit) {
for (var m = nModels; --m >= 0; ) if (floats[m] != null) {
retProperties.addLast (key);
retProperties.addLast (floats[m]);
retProperties.addLast (Integer.$valueOf (m));
retProperties.addLast (Boolean.$valueOf (isRes));
}
}}}
return retProperties;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.info (e + " while cataloging validations");
return null;
} else {
throw e;
}
}
}, "JV.Viewer,JS.SV,~A,java.util.Map,java.util.Map,java.util.Map");
Clazz.defineMethod (c$, "getMainItem", 
 function (data) {
for (var e, $e = data.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var key = e.getKey ();
if (!key.contains ("metadata")) return e.getValue ();
}
return null;
}, "java.util.Map");
Clazz.overrideMethod (c$, "initializeAnnotation", 
function (objAnn, type, modelIndex) {
var map = objAnn.getMap ();
var _list = map.get ("_list");
if (_list != null) return _list.getList ();
var dataKey = this.getDataKey (type);
var main = this.getMainItem (map);
map.put ("_map", main);
var noSingles = true;
var _cat =  new java.util.Hashtable ();
map.put ("_cat", JS.SV.newV (6, _cat));
var list =  new JU.Lst ();
map.put ("_list", _list = JS.SV.newV (7, list));
for (var e, $e = main.getMap ().entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var _dbName = e.getKey ();
var _dbMap = e.getValue ();
_cat.putAll (_dbMap.getMap ());
for (var e2, $e2 = _dbMap.getMap ().entrySet ().iterator (); $e2.hasNext () && ((e2 = $e2.next ()) || true);) {
var _domainName = e2.getKey ();
var _domainMap = e2.getValue ();
var _domainList = _domainMap.mapGet (dataKey);
var _mapList = _domainList.getList ();
for (var i = _mapList.size (); --i >= 0; ) {
var mapping = _mapList.get (i);
list.addLast (mapping);
var mmap = mapping.getMap ();
var _chain = mmap.get ("chain_id");
var start = mmap.get ("start");
var end = mmap.get ("end");
var res1 = 0;
var res2 = 0;
var rescode = "modelIndex=" + modelIndex + "&chain='" + _chain.value + "'";
if (start != null && end != null) {
res1 = start.mapGet ("residue_number").intValue;
res2 = end.mapGet ("residue_number").intValue;
rescode += "&seqid>=" + res1 + "&seqid<=" + res2;
} else {
res2 = 1;
rescode += "&seqid>0";
}var _atoms = (noSingles && res1 >= res2 ? JS.SV.getVariable ( new JU.BS ()) : _cat.get (rescode));
if (_atoms == null) _cat.put (rescode, _atoms = JS.SV.newS (rescode));
mmap.put ("_atoms", _atoms);
mmap.put ("_path", JS.SV.newS (_dbName + "." + _domainName));
mmap.put ("domain", _domainMap);
}
}
}
return list;
}, "JS.SV,~N,~N");
Clazz.defineMethod (c$, "findAnnotationAtoms", 
 function (vwr, name, _list, key, bs) {
if (_list == null) return;
System.out.println ("Checking " + name + " for " + key);
var data = vwr.extractProperty (_list, "[" + key + "]", -1);
var list = null;
if (Clazz.instanceOf (data, JU.Lst)) {
list = data;
} else if (Clazz.instanceOf (data, JS.SV)) {
list = (data).getList ();
}if (list == null) return;
for (var i = 0, n = list.size (); i < n; i++) {
var o = list.get (i);
var mapping = (Clazz.instanceOf (o, JS.SV) ? (o).getMap () : o);
if (mapping == null) return;
bs.or (this.setAnnotationAtoms (vwr, mapping, i));
}
}, "JV.Viewer,~S,JU.Lst,~S,JU.BS");
Clazz.defineMethod (c$, "setAnnotationAtoms", 
 function (vwr, mapping, i) {
var _atoms = mapping.get ("_atoms");
if (_atoms.tok != 10) {
var bs2 = vwr.getAtomBitSet (_atoms.value);
if (i >= 0) JU.Logger.info ("#" + (i + 1) + " found " + bs2.cardinality () + " atoms for " + _atoms.value);
_atoms.tok = 10;
_atoms.value = bs2;
}return _atoms.value;
}, "JV.Viewer,java.util.Map,~N");
Clazz.defineMethod (c$, "catalogUnit", 
 function (viewer, vals, unitID, val, bsAtoms, modelAtomIndices, resMap, atomMap, modelMap) {
var s = JU.PT.split (unitID + (vals == null ? "||||" : "|||"), "|");
if (s.length < 8 || s[1].length == 0 || s[2].length == 0 || s[3].length == 0 || s[4].length == 0) return false;
var sm = (s[1].length == 0 ? "1" : s[1]);
var m = (modelMap == null ? JU.PT.parseInt (sm) - 1 : -1);
var im = (m >= 0 ? null : modelMap.get (sm));
if (im != null) m = im.intValue ();
if (m >= modelAtomIndices.length) return false;
var res = s[1] + "_" + viewer.getChainID (s[2], true) + "_" + s[4] + "_" + s[7].toLowerCase ();
var i0 = modelAtomIndices[m];
var isRes = (atomMap == null || s[5].length == 0);
if (isRes) {
var a2 = resMap.get (res);
if (a2 != null) for (var j = a2[1], j0 = a2[0]; --j >= j0; ) {
bsAtoms.set (i0 + j);
if (vals != null) vals[m][j] += Math.abs (val);
}
} else {
if (s[5].charAt (0) == 'H') s[5] = this.getAttachedAtomForPDBH (s[3], s[5]);
var atom = res + "_" + s[5] + "_" + s[6].toLowerCase ();
var ia = atomMap.get (atom);
if (ia != null) {
var j = ia.intValue ();
bsAtoms.set (i0 + j);
if (vals != null) vals[m][j] += Math.abs (val);
}}return isRes;
}, "JV.Viewer,~A,~S,~N,JU.BS,~A,java.util.Map,java.util.Map,java.util.Map");
Clazz.overrideMethod (c$, "getAtomBits", 
function (vwr, key, dbObj, annotationCache, type, modelIndex, bsModel) {
if (dbObj == null) return  new JU.BS ();
var doCache = !key.contains ("NOCACHE");
if (!doCache) {
key = JU.PT.rep (key, "NOCACHE", "").trim ();
}var bs = (doCache ? annotationCache.get (key) : null);
if (bs != null) return bs;
bs =  new JU.BS ();
if (doCache) annotationCache.put (key, bs);
try {
var list = this.initializeAnnotation (dbObj, type, modelIndex);
var pt = key.toLowerCase ().indexOf (" where ");
var path = JU.PT.rep ((pt < 0 ? key : key.substring (0, pt)), " ", "");
var newKey = (pt < 0 ? "" : key.substring (pt + 7).trim ());
if (path.indexOf (".") < 0) {
path = " _path like '" + path + "*'";
} else {
path = " _path='" + path + "'";
}newKey = "select * where " + (pt < 0 ? path : "(" + newKey + ") and (" + path + ")");
JU.Logger.info ("looking for " + newKey);
this.findAnnotationAtoms (vwr, path, list, newKey, bs);
bs.and (bsModel);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString () + " in AnnotationParser");
bs.clearAll ();
} else {
throw e;
}
}
return bs;
}, "JV.Viewer,~S,~O,java.util.Map,~N,~N,JU.BS");
Clazz.overrideMethod (c$, "getAtomValidation", 
function (vwr, type, atom) {
var i = 0;
var n = 0;
var l = null;
var map = null;
var list = null;
try {
var ia = atom.i;
l =  new JU.Lst ();
list = (vwr.ms.getModelAuxiliaryInfo (atom.mi).get ("validation")).mapGet ("_list").getList ();
for (i = 0, n = list.size (); i < n; i++) {
map = list.get (i).getMap ();
if (map.get ("_path").value.equals (type) && (map.get ("_atoms").value).get (ia)) {
var v = map.get ("value");
l.addLast (v.tok == 3 ? v.value : Float.$valueOf (v.asFloat ()));
}}
return l;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "JV.Viewer,~S,JM.Atom");
Clazz.overrideMethod (c$, "getAnnotationInfo", 
function (vwr, a, match, type, modelIndex) {
var sb =  new JU.SB ();
if ("".equals (match)) match = null;
var isDetail = (match != null && (match.equals ("all") || match.endsWith (" all")));
if (isDetail) {
var _list = this.initializeAnnotation (a, type, modelIndex);
for (var i = _list.size (); --i >= 0; ) this.setAnnotationAtoms (vwr, _list.get (i).getMap (), -1);

match = match.substring (0, Math.max (0, match.length - 4)).trim ();
}if ("".equals (match)) match = null;
if (type == 1073742189 && !isDetail && match == null) return a.mapGet ("_note").asString ();
var isMappingOnly = (match != null && match.indexOf (".") >= 0 && match.indexOf (".*") < 0);
match = JU.PT.rep (match, "*", "");
try {
this.getAnnotationKVPairs (a, match, "", sb, "", isDetail, isMappingOnly, type);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
{
System.out.println(e);
}} else {
throw e;
}
}
return sb.toString ();
}, "JV.Viewer,JS.SV,~S,~N,~N");
Clazz.defineMethod (c$, "getAttachedAtomForPDBH", 
function (group3, name) {
if (name.charAt (0) == 'H') {
if (J.dssx.AnnotationParser.pdbAtomForH == null) {
J.dssx.AnnotationParser.pdbAtomForH =  new java.util.Hashtable ();
this.assignPDBH ("", "N H H1 H2 H3 CB HB2 HB3 CD HD2 HD3 CG HG2 HG3 C2' H2'' H2' C5' H5'' H5' OXT HXT");
for (var i = JM.BioResolver.pdbBondInfo.length; --i >= 1; ) {
this.assignPDBH (JM.Group.group3Names[i], JM.BioResolver.pdbBondInfo[i]);
}
}var a = J.dssx.AnnotationParser.pdbAtomForH.get (name);
if (a == null) a = J.dssx.AnnotationParser.pdbAtomForH.get (group3 + name);
if (a != null) return a;
}return name;
}, "~S,~S");
Clazz.defineMethod (c$, "assignPDBH", 
 function (group3, sNames) {
var names = JU.PT.getTokens (JU.PT.rep (sNames, "@", " "));
var a = null;
for (var i = 0, n = names.length; i < n; i++) {
var s = names[i];
if (s.charAt (0) != 'H') {
a = s;
continue;
}s = group3 + s;
if (s.indexOf ("?") >= 0) {
s = s.substring (0, s.length - 1);
J.dssx.AnnotationParser.pdbAtomForH.put (s + "1", a);
J.dssx.AnnotationParser.pdbAtomForH.put (s + "2", a);
J.dssx.AnnotationParser.pdbAtomForH.put (s + "3", a);
} else {
J.dssx.AnnotationParser.pdbAtomForH.put (s, a);
}}
}, "~S,~S");
Clazz.overrideMethod (c$, "fixAtoms", 
function (modelIndex, dbObj, bsAddedMask, type, margin) {
var _list = this.initializeAnnotation (dbObj, type, modelIndex);
for (var i = _list.size (); --i >= 0; ) {
var m = _list.get (i).getMap ();
var _atoms = m.get ("_atoms");
if (_atoms != null && _atoms.tok == 10) JU.BSUtil.shiftBits (_atoms.value, bsAddedMask, _list.get (i).mapGet ("_isres") != null, (_atoms.value).length () + margin);
}
}, "~N,JS.SV,JU.BS,~N,~N");
Clazz.overrideMethod (c$, "getBasePairs", 
function (vwr, modelIndex) {
}, "JV.Viewer,~N");
Clazz.overrideMethod (c$, "calculateDSSRStructure", 
function (vwr, bsAtoms) {
return null;
}, "JV.Viewer,JU.BS");
Clazz.overrideMethod (c$, "fixDSSRJSONMap", 
function (map) {
return null;
}, "java.util.Map");
Clazz.overrideMethod (c$, "getHBonds", 
function (ms, modelIndex, vHBonds, doReport) {
return null;
}, "JM.ModelSet,~N,JU.Lst,~B");
Clazz.overrideMethod (c$, "getAtomicDSSRData", 
function (ms, modelIndex, dssrData, dataType) {
}, "JM.ModelSet,~N,~A,~S");
Clazz.overrideMethod (c$, "setGroup1", 
function (ms, modelIndex) {
}, "JM.ModelSet,~N");
Clazz.overrideMethod (c$, "getDSSRFrame", 
function (dssrNT) {
return null;
}, "java.util.Map");
Clazz.defineStatics (c$,
"pdbAtomForH", null);
});
