Clazz.declarePackage ("J.dssx");
Clazz.load (["J.dssx.AnnotationParser"], "J.dssx.DSSR1", ["JU.BS", "$.Lst", "$.P3", "$.PT", "JM.HBond", "JM.BasePair", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.declareType (J.dssx, "DSSR1", J.dssx.AnnotationParser);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.dssx.DSSR1, []);
});
Clazz.overrideMethod (c$, "calculateDSSRStructure", 
function (vwr, bsAtoms) {
var bs = vwr.ms.getModelBS (bsAtoms == null ? vwr.bsA () : bsAtoms, true);
var s = "";
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) s += this.getDSSRForModel (vwr, i) + "\n";

return s;
}, "JV.Viewer,JU.BS");
Clazz.defineMethod (c$, "getDSSRForModel", 
 function (vwr, modelIndex) {
var info = null;
var out = null;
while (true) {
if (!vwr.ms.am[modelIndex].isBioModel) break;
info = vwr.ms.getModelAuxiliaryInfo (modelIndex);
if (info.containsKey ("dssr")) break;
var bs = vwr.getModelUndeletedAtomsBitSet (modelIndex);
bs.and (vwr.ms.getAtoms (2097166, null));
if (bs.nextClearBit (0) < 0) {
info = null;
break;
}try {
var name = vwr.setLoadFormat ("=dssrModel/", '=', false);
name = JU.PT.rep (name, "%20", " ");
JU.Logger.info ("fetching " + name + "[pdb data]");
var data = vwr.getPdbAtomData (bs, null, false, false);
var modelNumber = vwr.getModelNumber (vwr.ms.getModelBS (bs, false).nextSetBit (0));
var s = "          " + modelNumber;
data = "MODEL" + s.substring (s.length - 9) + "\n" + data + "ENDMDL\n";
data = vwr.getFileAsString3 (name + data, false, null);
var x = vwr.parseJSONMap (data);
if (x != null) {
info.put ("dssr", x);
this.setGroup1 (vwr.ms, modelIndex);
this.fixDSSRJSONMap (x);
this.setBioPolymers (vwr.ms.am[modelIndex], false);
}} catch (e) {
info = null;
out = "" + e;
}
break;
}
return (info != null ? JU.PT.rep (JU.Escape.escapeMap ((info.get ("dssr")).get ("counts")), ",", ",\n") : out == null ? "model has no nucleotides" : out);
}, "JV.Viewer,~N");
Clazz.overrideMethod (c$, "fixDSSRJSONMap", 
function (map) {
var s = "";
try {
this.fixIndices (map, "kissingLoops", "hairpin");
this.fixIndices (map, "coaxStacks", "stem");
if (map.containsKey ("counts")) s += "_M.dssr.counts = " + map.get ("counts").toString () + "\n";
if (map.containsKey ("dbn")) s += "_M.dssr.dbn = " + map.get ("dbn").toString ();
} catch (e) {
}
return s;
}, "java.util.Map");
Clazz.defineMethod (c$, "fixIndices", 
 function (map, key, root) {
var indices = root + "_indices";
var original = root + "s";
var lst = map.get (key);
if (lst != null) {
var hpins = map.get (original);
for (var i = lst.size (); --i >= 0; ) {
var kmap = lst.get (i);
var khlist = kmap.get (indices);
var n = khlist.size ();
if (n > 0) {
var khpins =  new JU.Lst ();
kmap.put (original, khpins);
for (var j = n; --j >= 0; ) khpins.addLast (hpins.get ((khlist.get (j)).intValue () - 1));

}}
}}, "java.util.Map,~S,~S");
Clazz.overrideMethod (c$, "getBasePairs", 
function (vwr, modelIndex) {
var ms = vwr.ms;
var info = ms.getInfo (modelIndex, "dssr");
var pairs = (info == null ? null : info.get ("pairs"));
var singles = (info == null ? null : info.get ("ssSegments"));
if (pairs == null && singles == null) {
this.setBioPolymers (vwr.ms.am[modelIndex], true);
return;
}var bsAtoms = ms.am[modelIndex].bsAtoms;
try {
var bs =  new JU.BS ();
var atoms = ms.at;
if (pairs != null) for (var i = pairs.size (); --i >= 0; ) {
var map = pairs.get (i);
var unit1 = map.get ("nt1");
var unit2 = map.get ("nt2");
var a1 = ms.getSequenceBits (unit1, bsAtoms, bs).nextSetBit (0);
bs.clearAll ();
var a2 = ms.getSequenceBits (unit2, bsAtoms, bs).nextSetBit (0);
bs.clearAll ();
JM.BasePair.add (map, this.setRes (atoms[a1]), this.setRes (atoms[a2]));
}
if (singles != null) for (var i = singles.size (); --i >= 0; ) {
var map = singles.get (i);
var units = map.get ("nts_long");
ms.getSequenceBits (units, bsAtoms, bs);
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) this.setRes (atoms[j]);

}
} catch (e) {
JU.Logger.error ("Exception " + e + " in DSSRParser.getBasePairs");
}
}, "JV.Viewer,~N");
Clazz.defineMethod (c$, "setBioPolymers", 
 function (m, b) {
var n = m.getBioPolymerCount ();
for (var i = n; --i >= 0; ) {
var bp = m.bioPolymers[i];
if (bp.isNucleic ()) (bp).isDssrSet = b;
}
}, "JM.BioModel,~B");
Clazz.defineMethod (c$, "setRes", 
 function (atom) {
if (atom.group.getBioPolymerLength () == 0) return null;
var m = atom.group;
(m.bioPolymer).isDssrSet = true;
return m;
}, "JM.Atom");
Clazz.overrideMethod (c$, "getAtomBits", 
function (vwr, key, dbObj, annotationCache, type, modelIndex, bsModel) {
if (dbObj == null) return  new JU.BS ();
var doCache = !key.contains ("NOCACHE");
if (!doCache) {
key = JU.PT.rep (key, "NOCACHE", "").trim ();
}var bs = null;
bs =  new JU.BS ();
if (doCache) annotationCache.put (key, bs);
try {
key = JU.PT.rep (key, "[where", "[select * where");
key = JU.PT.rep (key, "[WHERE", "[select * where");
var ext = "";
var n = -2147483648;
var pt = key.toLowerCase ().indexOf ("[select");
if (pt >= 0) {
ext = key.substring (pt);
key = key.substring (0, pt);
pt = ext.lastIndexOf ("]..");
if (pt >= 0 && (n = JU.PT.parseInt (ext.substring (pt + 3))) != -2147483648) ext = ext.substring (0, pt + 1);
}pt = key.toLowerCase ().indexOf (" where ");
if (pt < 0) {
key = key.toLowerCase ();
pt = (n == -2147483648 ? key.lastIndexOf ('.') : -1);
var haveIndex = false;
if (pt >= 0 && (haveIndex = (n = JU.PT.parseInt (key.substring (pt + 1))) != -2147483648)) key = key.substring (0, pt);
pt = "..bulges.nts_long..coaxstacks.stems.pairs.nt*..hairpins.nts_long..hbonds.atom1_id;atom2_id..helices.pairs.nt*..iloops.nts_long..isocanonpairs.nt*..junctions.nts_long..kissingloops.hairpins.nts_long..multiplets.nts_long..nonstack.nts_long..nts.nt_id..pairs.nt*..sssegments.nts_long..stacks.nts_long..stems.pairs.nt*..".indexOf (".." + key) + 2;
var len = key.length;
if (pt < 2) return bs;
var ptLast = (haveIndex ? pt + len : 2147483647);
while (pt >= 2 && pt < ptLast && len > 0) {
if (key.indexOf (".") < 0 && "..bulges.nts_long..coaxstacks.stems.pairs.nt*..hairpins.nts_long..hbonds.atom1_id;atom2_id..helices.pairs.nt*..iloops.nts_long..isocanonpairs.nt*..junctions.nts_long..kissingloops.hairpins.nts_long..multiplets.nts_long..nonstack.nts_long..nts.nt_id..pairs.nt*..sssegments.nts_long..stacks.nts_long..stems.pairs.nt*..".substring (pt + len, pt + len + 2).equals ("..")) {
key = "[select (" + key + ")]";
}dbObj = vwr.extractProperty (dbObj, key, -1);
pt += len + 1;
if (ext.length > 0) {
dbObj = vwr.extractProperty (dbObj, ext, -1);
ext = "";
}var pt1 = "..bulges.nts_long..coaxstacks.stems.pairs.nt*..hairpins.nts_long..hbonds.atom1_id;atom2_id..helices.pairs.nt*..iloops.nts_long..isocanonpairs.nt*..junctions.nts_long..kissingloops.hairpins.nts_long..multiplets.nts_long..nonstack.nts_long..nts.nt_id..pairs.nt*..sssegments.nts_long..stacks.nts_long..stems.pairs.nt*..".indexOf (".", pt);
key = "..bulges.nts_long..coaxstacks.stems.pairs.nt*..hairpins.nts_long..hbonds.atom1_id;atom2_id..helices.pairs.nt*..iloops.nts_long..isocanonpairs.nt*..junctions.nts_long..kissingloops.hairpins.nts_long..multiplets.nts_long..nonstack.nts_long..nts.nt_id..pairs.nt*..sssegments.nts_long..stacks.nts_long..stems.pairs.nt*..".substring (pt, pt1);
len = key.length;
}
} else {
key = key.substring (0, pt).trim () + "[select * " + key.substring (pt + 1) + "]" + ext;
dbObj = vwr.extractProperty (dbObj, key, -1);
}if (n != -2147483648 && Clazz.instanceOf (dbObj, JU.Lst)) {
if (n <= 0) n += (dbObj).size ();
dbObj = (dbObj).get (n - 1);
}bs.or (vwr.ms.getAtoms (1086324744, dbObj.toString ()));
bs.and (bsModel);
} catch (e) {
System.out.println (e.toString () + " in AnnotationParser");
bs.clearAll ();
}
return bs;
}, "JV.Viewer,~S,~O,java.util.Map,~N,~N,JU.BS");
Clazz.overrideMethod (c$, "getHBonds", 
function (ms, modelIndex, vHBonds, doReport) {
var info = ms.getInfo (modelIndex, "dssr");
var list;
if (info == null || (list = info.get ("hbonds")) == null) return "no DSSR hydrogen-bond data";
var bsAtoms = ms.am[modelIndex].bsAtoms;
var unit1 = null;
var unit2 = null;
var a1 = 0;
var a2 = 0;
try {
var bs =  new JU.BS ();
for (var i = list.size (); --i >= 0; ) {
var map = list.get (i);
unit1 = map.get ("atom1_id");
a1 = ms.getSequenceBits (unit1, bsAtoms, bs).nextSetBit (0);
if (a1 < 0) {
JU.Logger.error ("Atom " + unit1 + " was not found");
continue;
}unit2 = map.get ("atom2_id");
bs.clearAll ();
a2 = ms.getSequenceBits (unit2, bsAtoms, bs).nextSetBit (0);
if (a2 < 0) {
JU.Logger.error ("Atom " + unit2 + " was not found");
continue;
}bs.clearAll ();
var energy = 0;
vHBonds.addLast ( new JM.HBond (ms.at[a1], ms.at[a2], 2048, 1, 0, energy));
}
} catch (e) {
}
return "DSSR reports " + list.size () + " hydrogen bonds";
}, "JM.ModelSet,~N,JU.Lst,~B");
Clazz.overrideMethod (c$, "setGroup1", 
function (ms, modelIndex) {
var info = ms.getInfo (modelIndex, "dssr");
var list;
if (info == null || (list = info.get ("nts")) == null) return;
var m = ms.am[modelIndex];
var bsAtoms = m.bsAtoms;
var atoms = ms.at;
var bs =  new JU.BS ();
for (var i = list.size (); --i >= 0; ) {
var map = list.get (i);
var ch = (map.get ("nt_code")).charAt (0);
var unit1 = map.get ("nt_id");
ms.bioModelset.getAllSequenceBits (unit1, bsAtoms, bs);
var pt = bs.nextSetBit (0);
if (pt < 0) continue;
if ("ACGTU".indexOf (ch) < 0) atoms[pt].group.group1 = ch;
atoms[pt].group.dssrNT = map;
bs.clearAll ();
}
}, "JM.ModelSet,~N");
Clazz.overrideMethod (c$, "getAtomicDSSRData", 
function (ms, modelIndex, dssrData, dataType) {
var info = ms.getInfo (modelIndex, "dssr");
var list;
if (info == null || (list = info.get (dataType)) == null) return;
var bsAtoms = ms.am[modelIndex].bsAtoms;
try {
var bs =  new JU.BS ();
for (var i = list.size (); --i >= 0; ) {
var map = list.get (i);
bs.clearAll ();
ms.getSequenceBits (map.toString (), bsAtoms, bs);
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) dssrData[j] = i;

}
} catch (e) {
}
}, "JM.ModelSet,~N,~A,~S");
Clazz.overrideMethod (c$, "getDSSRFrame", 
function (nt) {
var frame = nt.get ("frame");
if (frame == null) return null;
var oxyz =  new Array (4);
for (var i = 4; --i >= 0; ) oxyz[i] =  new JU.P3 ();

this.getPoint (frame, "origin", oxyz[0]);
this.getPoint (frame, "x_axis", oxyz[1]);
this.getPoint (frame, "y_axis", oxyz[2]);
this.getPoint (frame, "z_axis", oxyz[3]);
return oxyz;
}, "java.util.Map");
Clazz.defineMethod (c$, "getPoint", 
 function (frame, item, pt) {
var xyz = frame.get (item);
pt.x = xyz.get (0).floatValue ();
pt.y = xyz.get (1).floatValue ();
pt.z = xyz.get (2).floatValue ();
}, "java.util.Map,~S,JU.P3");
Clazz.defineStatics (c$,
"DSSR_PATHS", "..bulges.nts_long..coaxstacks.stems.pairs.nt*..hairpins.nts_long..hbonds.atom1_id;atom2_id..helices.pairs.nt*..iloops.nts_long..isocanonpairs.nt*..junctions.nts_long..kissingloops.hairpins.nts_long..multiplets.nts_long..nonstack.nts_long..nts.nt_id..pairs.nt*..sssegments.nts_long..stacks.nts_long..stems.pairs.nt*..");
});
