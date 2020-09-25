Clazz.declarePackage ("JS");
Clazz.load (null, "JS.MathExt", ["java.lang.Float", "$.Number", "java.util.Date", "$.Hashtable", "$.Random", "JU.AU", "$.BS", "$.CU", "$.Lst", "$.M4", "$.Measure", "$.OC", "$.P3", "$.P4", "$.PT", "$.Quat", "$.Rdr", "$.SB", "$.V3", "J.api.Interface", "J.atomdata.RadiusData", "J.bspt.PointIterator", "J.c.VDW", "J.i18n.GT", "JM.BondSet", "$.Measurement", "JS.SV", "$.ScriptParam", "$.T", "JU.BSUtil", "$.Escape", "$.JmolMolecule", "$.Logger", "$.Parser", "$.Point3fi", "$.SimpleUnitCell", "JV.FileManager", "$.JC", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.e = null;
this.rand = null;
this.pm = null;
Clazz.instantialize (this, arguments);
}, JS, "MathExt");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "init", 
function (se) {
this.e = se;
this.vwr = this.e.vwr;
return this;
}, "~O");
Clazz.defineMethod (c$, "evaluate", 
function (mp, op, args, tok) {
switch (tok) {
case 134218250:
case 134218242:
case 134218245:
case 134217749:
case 134218244:
case 134218246:
return this.evaluateMath (mp, args, tok);
case 1275069441:
case 1275068928:
case 1275068929:
case 1275068930:
case 1275068931:
case 1275335685:
case 1275334681:
return this.evaluateList (mp, op.intValue, args);
case 268435520:
if (args.length == 0) mp.wasX = false;
case 1275068418:
return this.evaluateArray (mp, args, tok == 1275068418 && op.tok == 268435665);
case 134217731:
case 134221850:
return this.evaluateQuaternion (mp, args, tok);
case 1275068420:
return this.evaluateBin (mp, args);
case 134221829:
return this.evaluateCache (mp, args);
case 1275068934:
case 1275068935:
return this.evaluateRowCol (mp, args, tok);
case 1765808134:
return this.evaluateColor (mp, args);
case 134221831:
return this.evaluateCompare (mp, args);
case 1228931587:
case 134217736:
case 1275203608:
return this.evaluateConnected (mp, args, tok, op.intValue);
case 1814695966:
return this.evaluateUnitCell (mp, args, op.tok == 268435665);
case 134353926:
return this.evaluateContact (mp, args);
case 134221834:
return this.evaluateData (mp, args);
case 1275069444:
case 1275069442:
return this.evaluateDotDist (mp, args, tok, op.intValue);
case 1275069443:
if (op.tok == 268435665) return this.evaluateDotDist (mp, args, tok, op.intValue);
case 134217729:
case 1745489939:
return this.evaluateMeasure (mp, args, op.tok);
case 1228935687:
case 134222849:
return this.evaluateLoad (mp, args, tok == 1228935687);
case 1275068427:
return this.evaluateFind (mp, args);
case 1287653388:
case 1825200146:
return this.evaluateFormat (mp, op.intValue, args, tok == 1825200146);
case 134320141:
return this.evaluateUserFunction (mp, op.value, args, op.intValue, op.tok == 268435665);
case 1275068449:
case 1275068437:
case 1275082245:
case 1275072526:
return this.evaluateGetProperty (mp, args, tok, op.tok == 268435665);
case 136314895:
return this.evaluateHelix (mp, args);
case 134219265:
case 134217750:
case 134217763:
return this.evaluatePlane (mp, args, tok);
case 134218759:
case 134238732:
case 134222850:
case 134222350:
return this.evaluateScript (mp, args, tok);
case 1275069446:
case 1275069447:
case 1275068932:
return this.evaluateString (mp, op.intValue, args);
case 134217751:
return this.evaluatePoint (mp, args);
case 134217762:
return this.evaluatePointGroup (mp, args);
case 134256131:
return this.evaluatePrompt (mp, args);
case 134219268:
return this.evaluateRandom (mp, args);
case 1275068432:
return this.evaluateIn (mp, args);
case 1275072532:
return this.evaluateModulation (mp, args);
case 1275068443:
return this.evaluateReplace (mp, args);
case 134218756:
case 134218757:
case 1237320707:
return this.evaluateSubstructure (mp, args, tok, op.tok == 268435665);
case 1275068444:
case 1275068425:
return this.evaluateSort (mp, args, tok);
case 134217764:
return this.evaluateSpacegroup (mp, args);
case 1296041986:
return this.evaluateSymop (mp, args, op.tok == 268435665);
case 1275068445:
return this.evaluateTensor (mp, args);
case 134217759:
return this.evaluateWithin (mp, args);
case 134221856:
return this.evaluateWrite (mp, args);
}
return false;
}, "JS.ScriptMathProcessor,JS.T,~A,~N");
Clazz.defineMethod (c$, "evaluateSpacegroup", 
 function (mp, args) {
var unitCell = null;
switch (args.length) {
case 0:
return mp.addXObj (this.vwr.getSymTemp ().getSpaceGroupInfo (this.vwr.ms, null, this.vwr.am.cmi, true, null));
case 2:
unitCell = JS.SV.flistValue (args[1], 0);
if (unitCell.length < 6) unitCell = null;
case 1:
return mp.addXObj (this.vwr.getSymTemp ().getSpaceGroupInfo (this.vwr.ms, "" + args[0].asString (), -2147483648, true, unitCell));
default:
return false;
}
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluatePointGroup", 
 function (mp, args) {
var pts = null;
var center = null;
var distanceTolerance = NaN;
var linearTolerance = NaN;
var bsAtoms;
switch (args.length) {
case 4:
linearTolerance = args[3].asFloat ();
case 3:
distanceTolerance = args[2].asFloat ();
case 2:
switch (args[1].tok) {
case 8:
center = JS.SV.ptValue (args[1]);
break;
case 10:
bsAtoms = JS.SV.getBitSet (args[1], false);
var iatom = bsAtoms.nextSetBit (0);
if (iatom < 0 || iatom >= this.vwr.ms.ac || bsAtoms.cardinality () != 1) return false;
if (JS.SV.sValue (args[0]).equalsIgnoreCase ("spaceGroup")) {
var lst = this.vwr.ms.generateCrystalClass (iatom, JU.P3.new3 (NaN, NaN, NaN));
pts =  new Array (lst.size ());
for (var i = pts.length; --i >= 0; ) pts[i] = lst.get (i);

center =  new JU.P3 ();
if (args.length == 2) distanceTolerance = 0;
} else {
center = this.vwr.ms.at[iatom];
}}
if (pts != null) break;
case 1:
switch (args[0].tok) {
case 7:
var points = args[0].getList ();
pts =  new Array (points.size ());
for (var i = pts.length; --i >= 0; ) pts[i] = JS.SV.ptValue (points.get (i));

break;
case 10:
bsAtoms = JS.SV.getBitSet (args[0], false);
var atoms = this.vwr.ms.getAtomPointVector (bsAtoms);
pts =  new Array (atoms.size ());
for (var i = pts.length; --i >= 0; ) pts[i] = atoms.get (i);

break;
default:
return false;
}
break;
default:
return false;
}
var pointGroup = this.vwr.getSymTemp ().setPointGroup (null, center, pts, null, false, Float.isNaN (distanceTolerance) ? this.vwr.getFloat (570425382) : distanceTolerance, Float.isNaN (linearTolerance) ? this.vwr.getFloat (570425384) : linearTolerance, true);
return mp.addXMap (pointGroup.getPointGroupInfo (-1, null, true, null, 0, 1));
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateUnitCell", 
 function (mp, args, isSelector) {
var x1 = (isSelector ? JS.SV.getBitSet (mp.getX (), true) : null);
var iatom = ((x1 == null ? this.vwr.getAllAtoms () : x1).nextSetBit (0));
var lastParam = args.length - 1;
var scale = 1;
switch (lastParam < 0 ? 0 : args[lastParam].tok) {
case 2:
case 3:
scale = args[lastParam].asFloat ();
lastParam--;
break;
}
var tok0 = (lastParam < 0 ? 0 : args[0].tok);
var ucnew = null;
var uc = null;
switch (tok0) {
case 7:
uc = args[0].getList ();
break;
case 4:
var s = args[0].asString ();
if (s.indexOf ("a=") == 0) {
ucnew =  new Array (4);
for (var i = 0; i < 4; i++) ucnew[i] =  new JU.P3 ();

JU.SimpleUnitCell.setOabc (s, null, ucnew);
} else if (s.indexOf (",") >= 0) {
return mp.addXObj (this.vwr.getV0abc (s));
}break;
}
var u = null;
var haveUC = (uc != null);
if (ucnew == null && haveUC && uc.size () < 4) return false;
var ptParam = (haveUC ? 1 : 0);
if (ucnew == null && !haveUC && tok0 != 8) {
u = (iatom < 0 ? null : this.vwr.ms.getUnitCell (this.vwr.ms.at[iatom].mi));
ucnew = (u == null ?  Clazz.newArray (-1, [JU.P3.new3 (0, 0, 0), JU.P3.new3 (1, 0, 0), JU.P3.new3 (0, 1, 0), JU.P3.new3 (0, 0, 1)]) : u.getUnitCellVectors ());
}if (ucnew == null) {
ucnew =  new Array (4);
if (haveUC) {
switch (uc.size ()) {
case 3:
ucnew[0] =  new JU.P3 ();
for (var i = 0; i < 3; i++) ucnew[i + 1] = JU.P3.newP (JS.SV.ptValue (uc.get (i)));

break;
case 4:
for (var i = 0; i < 4; i++) ucnew[i] = JU.P3.newP (JS.SV.ptValue (uc.get (i)));

break;
case 6:
var params =  Clazz.newFloatArray (6, 0);
for (var i = 0; i < 6; i++) params[i] = uc.get (i).asFloat ();

JU.SimpleUnitCell.setOabc (null, params, ucnew);
break;
default:
return false;
}
} else {
ucnew[0] = JS.SV.ptValue (args[0]);
switch (lastParam) {
case 3:
for (var i = 1; i < 4; i++) (ucnew[i] = JU.P3.newP (JS.SV.ptValue (args[i]))).sub (ucnew[0]);

break;
case 1:
var l = args[1].getList ();
if (l != null && l.size () == 3) {
for (var i = 0; i < 3; i++) ucnew[i + 1] = JS.SV.ptValue (l.get (i));

break;
}default:
return false;
}
}}var op = (ptParam <= lastParam ? args[ptParam].asString () : null);
var toPrimitive = "primitive".equalsIgnoreCase (op);
if (toPrimitive || "conventional".equalsIgnoreCase (op)) {
var stype = (++ptParam > lastParam ? "" : args[ptParam].asString ().toUpperCase ());
if (stype.equals ("BCC")) stype = "I";
 else if (stype.length == 0) stype = this.vwr.getSymmetryInfo (iatom, null, 0, null, null, 1073741994, null, 0, -1, 0);
if (stype == null || stype.length == 0) return false;
if (u == null) u = this.vwr.getSymTemp ();
var m3 = this.vwr.getModelForAtomIndex (iatom).auxiliaryInfo.get ("primitiveToCrystal");
if (!u.toFromPrimitive (toPrimitive, stype.charAt (0), ucnew, m3)) return false;
} else if ("reciprocal".equalsIgnoreCase (op)) {
ucnew = JU.SimpleUnitCell.getReciprocal (ucnew, null, scale);
scale = 1;
}if (scale != 1) for (var i = 1; i < 4; i++) ucnew[i].scale (scale);

return mp.addXObj (ucnew);
}, "JS.ScriptMathProcessor,~A,~B");
Clazz.defineMethod (c$, "evaluateArray", 
 function (mp, args, isSelector) {
if (isSelector) {
var x1 = mp.getX ();
switch (args.length == 1 ? x1.tok : 0) {
case 6:
var lst =  new JU.Lst ();
var id = args[0].asString ();
var map = x1.getMap ();
var keys = x1.getKeys (false);
for (var i = 0, n = keys.length; i < n; i++) if (map.get (keys[i]).getMap () == null) return false;

for (var i = 0, n = keys.length; i < n; i++) {
var m = map.get (keys[i]);
var m1 = m.getMap ();
var m2 = JS.SV.deepCopy (m1, true, false);
m2.put (id, JS.SV.newS (keys[i]));
lst.addLast (JS.SV.newV (6, m2));
}
return mp.addXList (lst);
case 7:
var map1 =  new java.util.Hashtable ();
var lst1 = x1.getList ();
var id1 = args[0].asString ();
for (var i = 0, n = lst1.size (); i < n; i++) {
var m0 = lst1.get (i).getMap ();
if (m0 == null || m0.get (id1) == null) return false;
}
for (var i = 0, n = lst1.size (); i < n; i++) {
var m = lst1.get (i);
var m1 = JS.SV.deepCopy (m.getMap (), true, false);
var mid = m1.remove (id1);
map1.put (mid.asString (), JS.SV.newV (6, m1));
}
return mp.addXObj (map1);
}
return false;
}var a =  new Array (args.length);
for (var i = a.length; --i >= 0; ) a[i] = JS.SV.newT (args[i]);

return mp.addXAV (a);
}, "JS.ScriptMathProcessor,~A,~B");
Clazz.defineMethod (c$, "evaluateBin", 
 function (mp, args) {
var n = args.length;
if (n < 3 || n > 5) return false;
var x1 = mp.getX ();
var isListf = (x1.tok == 13);
if (!isListf && x1.tok != 7) return mp.addX (x1);
var f0 = JS.SV.fValue (args[0]);
var f1 = JS.SV.fValue (args[1]);
var df = JS.SV.fValue (args[2]);
var addBins = (n >= 4 && args[n - 1].tok == 1073742335);
var key = ((n == 5 || n == 4 && !addBins) && args[3].tok != 1073742334 ? JS.SV.sValue (args[3]) : null);
var data;
var maps = null;
if (isListf) {
data = x1.value;
} else {
var list = x1.getList ();
data =  Clazz.newFloatArray (list.size (), 0);
if (key != null) maps = JU.AU.createArrayOfHashtable (list.size ());
try {
for (var i = list.size (); --i >= 0; ) data[i] = JS.SV.fValue (key == null ? list.get (i) : (maps[i] = list.get (i).getMap ()).get (key));

} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
}var nbins = Math.max (Clazz.doubleToInt (Math.floor ((f1 - f0) / df + 0.01)), 1);
var array =  Clazz.newIntArray (nbins, 0);
var nPoints = data.length;
for (var i = 0; i < nPoints; i++) {
var v = data[i];
var bin = Clazz.doubleToInt (Math.floor ((v - f0) / df));
if (bin < 0 || bin >= nbins) continue;
array[bin]++;
if (key != null) {
var map = maps[i];
if (map == null) continue;
map.put ("_bin", JS.SV.newI (bin));
var v1 = f0 + df * bin;
var v2 = v1 + df;
map.put ("_binMin", JS.SV.newF (bin == 0 ? -3.4028235E38 : v1));
map.put ("_binMax", JS.SV.newF (bin == nbins - 1 ? 3.4028235E38 : v2));
}}
if (addBins) {
var lst =  new JU.Lst ();
for (var i = 0; i < nbins; i++) lst.addLast ( Clazz.newFloatArray (-1, [f0 + df * i, array[i]]));

return mp.addXList (lst);
}return mp.addXAI (array);
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateCache", 
 function (mp, args) {
if (args.length > 0) return false;
return mp.addXMap (this.vwr.fm.cacheList ());
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateColor", 
 function (mp, args) {
var colorScheme = (args.length > 0 ? JS.SV.sValue (args[0]) : "");
var isIsosurface = colorScheme.startsWith ("$");
if (args.length == 2 && colorScheme.equalsIgnoreCase ("TOHSL")) return mp.addXPt (JU.CU.rgbToHSL (JU.P3.newP (args[1].tok == 8 ? JS.SV.ptValue (args[1]) : JU.CU.colorPtFromString (args[1].asString ())), true));
if (args.length == 2 && colorScheme.equalsIgnoreCase ("TORGB")) {
var pt = JU.P3.newP (args[1].tok == 8 ? JS.SV.ptValue (args[1]) : JU.CU.colorPtFromString (args[1].asString ()));
return mp.addXPt (args[1].tok == 8 ? JU.CU.hslToRGB (pt) : pt);
}if (args.length == 4 && (args[3].tok == 1073742335 || args[3].tok == 1073742334)) {
var pt1 = JU.P3.newP (args[0].tok == 8 ? JS.SV.ptValue (args[0]) : JU.CU.colorPtFromString (args[0].asString ()));
var pt2 = JU.P3.newP (args[1].tok == 8 ? JS.SV.ptValue (args[1]) : JU.CU.colorPtFromString (args[1].asString ()));
var usingHSL = (args[3].tok == 1073742335);
if (usingHSL) {
pt1 = JU.CU.rgbToHSL (pt1, false);
pt2 = JU.CU.rgbToHSL (pt2, false);
}var sb =  new JU.SB ();
var vd = JU.V3.newVsub (pt2, pt1);
var n = args[2].asInt ();
if (n < 2) n = 20;
vd.scale (1 / (n - 1));
for (var i = 0; i < n; i++) {
sb.append (JU.Escape.escapeColor (JU.CU.colorPtToFFRGB (usingHSL ? JU.CU.hslToRGB (pt1) : pt1)));
pt1.add (vd);
}
return mp.addXStr (sb.toString ());
}var ce = (isIsosurface ? null : this.vwr.cm.getColorEncoder (colorScheme));
if (!isIsosurface && ce == null) return mp.addXStr ("");
var lo = (args.length > 1 ? JS.SV.fValue (args[1]) : 3.4028235E38);
var hi = (args.length > 2 ? JS.SV.fValue (args[2]) : 3.4028235E38);
var value = (args.length > 3 ? JS.SV.fValue (args[3]) : 3.4028235E38);
var getValue = (value != 3.4028235E38 || lo != 3.4028235E38 && hi == 3.4028235E38);
var haveRange = (hi != 3.4028235E38);
if (!haveRange && colorScheme.length == 0) {
value = lo;
var range = this.vwr.getCurrentColorRange ();
lo = range[0];
hi = range[1];
}if (isIsosurface) {
var id = colorScheme.substring (1);
var data =  Clazz.newArray (-1, [id, null]);
if (!this.vwr.shm.getShapePropertyData (24, "colorEncoder", data)) return mp.addXStr ("");
ce = data[1];
} else {
ce.setRange (lo, hi, lo > hi);
}var key = ce.getColorKey ();
if (getValue) return mp.addXPt (JU.CU.colorPtFromInt (ce.getArgb (hi == 3.4028235E38 ? lo : value), null));
return mp.addX (JS.SV.getVariableMap (key));
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateCompare", 
 function (mp, args) {
if (args.length < 2 || args.length > 5) return false;
var stddev;
var sOpt = JS.SV.sValue (args[args.length - 1]);
var isStdDev = sOpt.equalsIgnoreCase ("stddev");
var isIsomer = sOpt.equalsIgnoreCase ("ISOMER");
var isBonds = sOpt.equalsIgnoreCase ("BONDS");
var isSmiles = (!isIsomer && args.length > (isStdDev ? 3 : 2));
var bs1 = (args[0].tok == 10 ? args[0].value : null);
var bs2 = (args[1].tok == 10 ? args[1].value : null);
var smiles1 = (bs1 == null ? JS.SV.sValue (args[0]) : "");
var smiles2 = (bs2 == null ? JS.SV.sValue (args[1]) : "");
var m =  new JU.M4 ();
stddev = NaN;
var ptsA;
var ptsB;
try {
if (isSmiles) {
if (bs1 == null || bs2 == null) return false;
}if (isBonds) {
if (args.length != 4) return false;
smiles1 = JS.SV.sValue (args[2]);
isSmiles = smiles1.equalsIgnoreCase ("SMILES");
try {
if (isSmiles) smiles1 = this.vwr.getSmiles (bs1);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.e.evalError (ex.getMessage (), null);
} else {
throw ex;
}
}
var data = this.e.getSmilesExt ().getFlexFitList (bs1, bs2, smiles1, !isSmiles);
return (data == null ? mp.addXStr ("") : mp.addXAF (data));
}if (isIsomer) {
if (args.length != 3) return false;
if (bs1 == null && bs2 == null) return mp.addXStr (this.vwr.getSmilesMatcher ().getRelationship (smiles1, smiles2).toUpperCase ());
var mf1 = (bs1 == null ? this.vwr.getSmilesMatcher ().getMolecularFormula (smiles1, false) : JU.JmolMolecule.getMolecularFormulaAtoms (this.vwr.ms.at, bs1, null, false));
var mf2 = (bs2 == null ? this.vwr.getSmilesMatcher ().getMolecularFormula (smiles2, false) : JU.JmolMolecule.getMolecularFormulaAtoms (this.vwr.ms.at, bs2, null, false));
if (!mf1.equals (mf2)) return mp.addXStr ("NONE");
if (bs1 != null) smiles1 = this.e.getSmilesExt ().getSmilesMatches ("/strict///", null, bs1, null, 1, true, false);
var check;
if (bs2 == null) {
check = (this.vwr.getSmilesMatcher ().areEqual (smiles2, smiles1) > 0);
} else {
smiles2 = this.e.getSmilesExt ().getSmilesMatches ("/strict///", null, bs2, null, 1, true, false);
check = ((this.e.getSmilesExt ().getSmilesMatches ("/strict///" + smiles1, null, bs2, null, 1, true, false)).nextSetBit (0) >= 0);
}if (!check) {
var s = smiles1 + smiles2;
if (s.indexOf ("/") >= 0 || s.indexOf ("\\") >= 0 || s.indexOf ("@") >= 0) {
if (smiles1.indexOf ("@") >= 0 && (bs2 != null || smiles2.indexOf ("@") >= 0) && smiles1.indexOf ("@SP") < 0) {
var pt = smiles1.toLowerCase ().indexOf ("invertstereo");
smiles1 = (pt >= 0 ? "/strict/" + smiles1.substring (0, pt) + smiles1.substring (pt + 12) : "/invertstereo strict/" + smiles1);
if (bs2 == null) {
check = (this.vwr.getSmilesMatcher ().areEqual (smiles1, smiles2) > 0);
} else {
check = ((this.e.getSmilesExt ().getSmilesMatches (smiles1, null, bs2, null, 1, true, false)).nextSetBit (0) >= 0);
}if (check) return mp.addXStr ("ENANTIOMERS");
}if (bs2 == null) {
check = (this.vwr.getSmilesMatcher ().areEqual ("/nostereo/" + smiles2, smiles1) > 0);
} else {
var ret = this.e.getSmilesExt ().getSmilesMatches ("/nostereo/" + smiles1, null, bs2, null, 1, true, false);
check = ((ret).nextSetBit (0) >= 0);
}if (check) return mp.addXStr ("DIASTEREOMERS");
}return mp.addXStr ("CONSTITUTIONAL ISOMERS");
}if (bs1 == null || bs2 == null) return mp.addXStr ("IDENTICAL");
stddev = this.e.getSmilesExt ().getSmilesCorrelation (bs1, bs2, smiles1, null, null, null, null, false, null, null, false, 1);
return mp.addXStr (stddev < 0.2 ? "IDENTICAL" : "IDENTICAL or CONFORMATIONAL ISOMERS (RMSD=" + stddev + ")");
}if (isSmiles) {
ptsA =  new JU.Lst ();
ptsB =  new JU.Lst ();
sOpt = JS.SV.sValue (args[2]);
var isMap = sOpt.equalsIgnoreCase ("MAP");
isSmiles = sOpt.equalsIgnoreCase ("SMILES");
var isSearch = (isMap || sOpt.equalsIgnoreCase ("SMARTS"));
if (isSmiles || isSearch) sOpt = (args.length > (isStdDev ? 4 : 3) ? JS.SV.sValue (args[3]) : null);
var hMaps = (("H".equalsIgnoreCase (sOpt) || "allH".equalsIgnoreCase (sOpt) || "bestH".equalsIgnoreCase (sOpt)));
var isPolyhedron = ("polyhedra".equalsIgnoreCase (sOpt));
if (isPolyhedron) sOpt = (args.length > (isStdDev ? 5 : 4) ? JS.SV.sValue (args[4]) : null);
var allMaps = (("all".equalsIgnoreCase (sOpt) || "allH".equalsIgnoreCase (sOpt)));
var bestMap = (("best".equalsIgnoreCase (sOpt) || "bestH".equalsIgnoreCase (sOpt)));
if ("stddev".equals (sOpt)) sOpt = null;
var pattern = sOpt;
if (sOpt == null || hMaps || allMaps || bestMap) {
if (!isMap && !isSmiles || hMaps && isPolyhedron) return false;
pattern = "/noaromatic" + (allMaps || bestMap ? "/" : " nostereo/") + this.e.getSmilesExt ().getSmilesMatches ((hMaps ? "H" : ""), null, bs1, null, 1, true, false);
} else {
allMaps = true;
}stddev = this.e.getSmilesExt ().getSmilesCorrelation (bs1, bs2, pattern, ptsA, ptsB, m, null, isMap, null, null, bestMap, (isSmiles ? 1 : 2) | (!allMaps && !bestMap ? 8 : 0));
if (isMap) {
var nAtoms = ptsA.size ();
if (nAtoms == 0) return mp.addXStr ("");
var nMatch = Clazz.doubleToInt (ptsB.size () / nAtoms);
var ret =  new JU.Lst ();
for (var i = 0, pt = 0; i < nMatch; i++) {
var a = JU.AU.newInt2 (nAtoms);
ret.addLast (a);
for (var j = 0; j < nAtoms; j++, pt++) a[j] =  Clazz.newIntArray (-1, [(ptsA.get (j)).i, (ptsB.get (pt)).i]);

}
return (allMaps ? mp.addXList (ret) : ret.size () > 0 ? mp.addXAII (ret.get (0)) : mp.addXStr (""));
}} else {
switch (args.length) {
case 2:
break;
case 3:
if (isStdDev) break;
default:
return false;
}
ptsA = this.e.getPointVector (args[0], 0);
ptsB = this.e.getPointVector (args[1], 0);
if (ptsA != null && ptsB != null) {
J.api.Interface.getInterface ("JU.Eigen", this.vwr, "script");
stddev = JU.Measure.getTransformMatrix4 (ptsA, ptsB, m, null);
}}return (isStdDev || Float.isNaN (stddev) ? mp.addXFloat (stddev) : mp.addXM4 (m.round (1e-7)));
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.e.evalError (ex.getMessage () == null ? ex.toString () : ex.getMessage (), null);
return false;
} else {
throw ex;
}
}
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateConnected", 
 function (mp, args, tok, intValue) {
if (args.length > 5) return false;
var min = -2147483648;
var max = 2147483647;
var fmin = 0;
var fmax = 3.4028235E38;
var order = 65535;
var atoms1 = null;
var atoms2 = null;
var haveDecimal = false;
var isBonds = false;
switch (tok) {
case 1275203608:
var nv = -2147483648;
var smiles = null;
if (args.length > 0) {
switch (args[0].tok) {
case 2:
nv = args[0].intValue;
break;
case 4:
smiles = JS.SV.sValue (args[0]);
break;
}
}if (intValue == 1275203608) atoms1 = JS.SV.getBitSet (mp.getX (), true);
var data =  Clazz.newArray (-1, [Integer.$valueOf (nv), smiles, atoms1]);
if (!this.vwr.shm.getShapePropertyData (21, "getCenters", data)) data[1] = null;
return mp.addXBs (data[1] == null ?  new JU.BS () : data[1]);
case 1228931587:
var x1 = mp.getX ();
if (x1.tok != 10 || args.length != 1 || args[0].tok != 10) return false;
atoms1 = x1.value;
atoms2 = args[0].value;
var list =  new JU.Lst ();
var atoms = this.vwr.ms.at;
for (var i = atoms1.nextSetBit (0); i >= 0; i = atoms1.nextSetBit (i + 1)) {
var n = 0;
var b = atoms[i].bonds;
for (var j = b.length; --j >= 0; ) if (atoms2.get (b[j].getOtherAtom (atoms[i]).i)) n++;

list.addLast (Integer.$valueOf (n));
}
return mp.addXList (list);
}
for (var i = 0; i < args.length; i++) {
var $var = args[i];
switch ($var.tok) {
case 10:
isBonds = (Clazz.instanceOf ($var.value, JM.BondSet));
if (isBonds && atoms1 != null) return false;
if (atoms1 == null) atoms1 = $var.value;
 else if (atoms2 == null) atoms2 = $var.value;
 else return false;
break;
case 4:
var type = JS.SV.sValue ($var);
if (type.equalsIgnoreCase ("hbond")) order = 30720;
 else order = JS.ScriptParam.getBondOrderFromString (type);
if (order == 131071) return false;
break;
case 3:
haveDecimal = true;
default:
var n = $var.asInt ();
var f = $var.asFloat ();
if (max != 2147483647) return false;
if (min == -2147483648) {
min = Math.max (n, 0);
fmin = f;
} else {
max = n;
fmax = f;
}}
}
if (min == -2147483648) {
min = 1;
max = 100;
fmin = 0.1;
fmax = 1.0E8;
} else if (max == 2147483647) {
max = min;
fmax = fmin;
fmin = 0.1;
}if (atoms1 == null) atoms1 = this.vwr.getAllAtoms ();
if (haveDecimal && atoms2 == null) atoms2 = atoms1;
if (atoms2 != null) {
var bsBonds =  new JU.BS ();
this.vwr.makeConnections (fmin, fmax, order, 1086324745, atoms1, atoms2, bsBonds, isBonds, false, 0);
return mp.addX (JS.SV.newV (10, JM.BondSet.newBS (bsBonds, this.vwr.ms.getAtomIndices (this.vwr.ms.getAtoms (1677721602, bsBonds)))));
}return mp.addXBs (this.vwr.ms.getAtomsConnected (min, max, order, atoms1));
}, "JS.ScriptMathProcessor,~A,~N,~N");
Clazz.defineMethod (c$, "evaluateContact", 
 function (mp, args) {
if (args.length < 1 || args.length > 3) return false;
var i = 0;
var distance = 100;
var tok = args[0].tok;
switch (tok) {
case 3:
case 2:
distance = JS.SV.fValue (args[i++]);
break;
case 10:
break;
default:
return false;
}
if (i == args.length || !(Clazz.instanceOf (args[i].value, JU.BS))) return false;
var bsA = JU.BSUtil.copy (args[i++].value);
var bsB = (i < args.length ? JU.BSUtil.copy (args[i].value) : null);
var rd =  new J.atomdata.RadiusData (null, (distance > 10 ? distance / 100 : distance), (distance > 10 ? J.atomdata.RadiusData.EnumType.FACTOR : J.atomdata.RadiusData.EnumType.OFFSET), J.c.VDW.AUTO);
bsB = this.setContactBitSets (bsA, bsB, true, NaN, rd, false);
bsB.or (bsA);
return mp.addXBs (bsB);
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateData", 
 function (mp, args) {
var selected = (args.length == 0 ? "" : JS.SV.sValue (args[0]));
var type = "";
switch (args.length) {
case 0:
case 1:
break;
case 2:
case 3:
if (args[0].tok == 10) return mp.addXStr (this.vwr.getModelFileData (selected, JS.SV.sValue (args[1]), args.length == 3 && JS.SV.bValue (args[2])));
break;
case 4:
var iField = args[1].asInt ();
var nBytes = args[2].asInt ();
var firstLine = args[3].asInt ();
var f = JU.Parser.parseFloatArrayFromMatchAndField (JS.SV.sValue (args[0]), null, 0, 0, null, iField, nBytes, null, firstLine);
return mp.addXStr (JU.Escape.escapeFloatA (f, false));
default:
return false;
}
if (selected.indexOf ("data2d_") == 0) {
var f1 = this.vwr.getDataObj (selected, null, 2);
if (f1 == null) return mp.addXStr ("");
if (args.length == 2 && args[1].tok == 2) {
var pt = args[1].intValue;
if (pt < 0) pt += f1.length;
if (pt >= 0 && pt < f1.length) return mp.addXStr (JU.Escape.escapeFloatA (f1[pt], false));
return mp.addXStr ("");
}return mp.addXStr (JU.Escape.escapeFloatAA (f1, false));
}if (selected.indexOf ("property_") == 0) {
var f1 = this.vwr.getDataObj (selected, null, 1);
if (f1 == null) return mp.addXStr ("");
var f2 = (type.indexOf ("property_") == 0 ? this.vwr.getDataObj (selected, null, 1) : null);
if (f2 != null) {
f1 = JU.AU.arrayCopyF (f1, -1);
for (var i = Math.min (f1.length, f2.length); --i >= 0; ) f1[i] += f2[i];

}return mp.addXStr (JU.Escape.escapeFloatA (f1, false));
}var data = this.vwr.getDataObj (selected, null, -1);
return mp.addXStr (data == null ? "" : "" + data[1]);
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateDotDist", 
 function (mp, args, tok, op) {
var isDist = (tok == 1275069443);
var x1;
var x2;
var x3 = null;
switch (args.length) {
case 2:
if (op == 2147483647) {
x1 = args[0];
x2 = args[1];
break;
}x3 = args[1];
case 1:
x1 = mp.getX ();
x2 = args[0];
break;
default:
return false;
}
if (tok == 1275069442) {
var a = JU.P3.newP (mp.ptValue (x1, null));
a.cross (a, mp.ptValue (x2, null));
return mp.addXPt (a);
}var pt2 = (x2.tok == 7 ? null : mp.ptValue (x2, null));
var plane2 = mp.planeValue (x2);
var f = NaN;
try {
if (isDist) {
var minMax = (op == -2147483648 ? 0 : op & 480);
var isMinMax = (minMax == 32 || minMax == 64);
var isAll = minMax == 480;
switch (x1.tok) {
case 7:
case 10:
var isAtomSet1 = (x1.tok == 10);
var isAtomSet2 = (x2.tok == 10);
var isPoint2 = (x2.tok == 8);
var bs1 = (isAtomSet1 ? x1.value : null);
var bs2 = (isAtomSet2 ? x2.value : null);
var list1 = (isAtomSet1 ? null : x1.getList ());
var list2 = (isAtomSet2 ? null : x2.getList ());
var returnAtom = (isMinMax && x3 != null && x3.asBoolean ());
switch (x2.tok) {
case 10:
case 7:
case 8:
var atoms = this.vwr.ms.at;
if (returnAtom) {
var dMinMax = NaN;
var iMinMax = 2147483647;
if (isAtomSet1) {
for (var i = bs1.nextSetBit (0); i >= 0; i = bs1.nextSetBit (i + 1)) {
var d = (isPoint2 ? atoms[i].distanceSquared (pt2) : (this.e.getBitsetProperty (bs2, list2, op, atoms[i], plane2, x1.value, null, false, x1.index, false)).floatValue ());
if (minMax == 32 ? d >= dMinMax : d <= dMinMax) continue;
dMinMax = d;
iMinMax = i;
}
return mp.addXBs (iMinMax == 2147483647 ?  new JU.BS () : JU.BSUtil.newAndSetBit (iMinMax));
}for (var i = list1.size (); --i >= 0; ) {
var pt = JS.SV.ptValue (list1.get (i));
var d = (isPoint2 ? pt.distanceSquared (pt2) : (this.e.getBitsetProperty (bs2, list2, op, pt, plane2, x1.value, null, false, 2147483647, false)).floatValue ());
if (minMax == 32 ? d >= dMinMax : d <= dMinMax) continue;
dMinMax = d;
iMinMax = i;
}
return mp.addXInt (iMinMax);
}if (isAll) {
if (bs2 == null) {
var data =  Clazz.newFloatArray (bs1.cardinality (), 0);
for (var p = 0, i = bs1.nextSetBit (0); i >= 0; i = bs1.nextSetBit (i + 1), p++) data[p] = atoms[i].distance (pt2);

return mp.addXAF (data);
}var data2 =  Clazz.newFloatArray (bs1.cardinality (), bs2.cardinality (), 0);
for (var p = 0, i = bs1.nextSetBit (0); i >= 0; i = bs1.nextSetBit (i + 1), p++) for (var q = 0, j = bs2.nextSetBit (0); j >= 0; j = bs2.nextSetBit (j + 1), q++) data2[p][q] = atoms[i].distance (atoms[j]);


return mp.addXAFF (data2);
}if (isMinMax) {
var data =  Clazz.newFloatArray (isAtomSet1 ? bs1.cardinality () : list1.size (), 0);
if (isAtomSet1) {
for (var i = bs1.nextSetBit (0), p = 0; i >= 0; i = bs1.nextSetBit (i + 1)) data[p++] = (this.e.getBitsetProperty (bs2, list2, op, atoms[i], plane2, x1.value, null, false, x1.index, false)).floatValue ();

return mp.addXAF (data);
}for (var i = data.length; --i >= 0; ) data[i] = (this.e.getBitsetProperty (bs2, list2, op, JS.SV.ptValue (list1.get (i)), plane2, null, null, false, 2147483647, false)).floatValue ();

return mp.addXAF (data);
}return mp.addXObj (this.e.getBitsetProperty (bs1, list1, op, pt2, plane2, x1.value, null, false, x1.index, false));
}
}
}var pt1 = mp.ptValue (x1, null);
var plane1 = mp.planeValue (x1);
if (isDist) {
if (plane2 != null && x3 != null) f = JU.Measure.directedDistanceToPlane (pt1, plane2, JS.SV.ptValue (x3));
 else f = (plane1 == null ? (plane2 == null ? pt2.distance (pt1) : JU.Measure.distanceToPlane (plane2, pt1)) : JU.Measure.distanceToPlane (plane1, pt2));
} else {
if (plane1 != null && plane2 != null) {
f = plane1.x * plane2.x + plane1.y * plane2.y + plane1.z * plane2.z + plane1.w * plane2.w;
} else {
if (plane1 != null) pt1 = JU.P3.new3 (plane1.x, plane1.y, plane1.z);
 else if (plane2 != null) pt2 = JU.P3.new3 (plane2.x, plane2.y, plane2.z);
f = pt1.dot (pt2);
}}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return mp.addXFloat (f);
}, "JS.ScriptMathProcessor,~A,~N,~N");
Clazz.defineMethod (c$, "evaluateHelix", 
 function (mp, args) {
if (args.length < 1 || args.length > 5) return false;
var pt = (args.length > 2 ? 3 : 1);
var type = (pt >= args.length ? "array" : JS.SV.sValue (args[pt]));
var tok = JS.T.getTokFromName (type);
if (args.length > 2) {
var pta = mp.ptValue (args[0], null);
var ptb = mp.ptValue (args[1], null);
if (tok == 0 || args[2].tok != 9 || pta == null || ptb == null) return false;
var dq = JU.Quat.newP4 (args[2].value);
var data = JU.Measure.computeHelicalAxis (pta, ptb, dq);
return (data == null ? false : mp.addXObj (JU.Escape.escapeHelical (type, tok, pta, ptb, data)));
}var bs = (Clazz.instanceOf (args[0].value, JU.BS) ? args[0].value : this.vwr.ms.getAtoms (1094715412,  new Integer (args[0].asInt ())));
switch (tok) {
case 134217751:
case 1073741854:
case 1665140738:
return mp.addXObj (this.getHelixData (bs, tok));
case 134217729:
return mp.addXFloat ((this.getHelixData (bs, 134217729)).floatValue ());
case 135176:
case 1745489939:
return mp.addXObj (this.getHelixData (bs, tok));
case 1275068418:
var data = this.getHelixData (bs, 1073742001);
if (data == null) return false;
return mp.addXAS (data);
}
return false;
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "getHelixData", 
 function (bs, tokType) {
var iAtom = bs.nextSetBit (0);
return (iAtom < 0 ? "null" : this.vwr.ms.at[iAtom].group.getHelixData (tokType, this.vwr.getQuaternionFrame (), this.vwr.getInt (553648144)));
}, "JU.BS,~N");
Clazz.defineMethod (c$, "evaluateFind", 
 function (mp, args) {
var x1 = mp.getX ();
var isList = (x1.tok == 7);
var isEmpty = (args.length == 0);
var sFind = (isEmpty ? "" : JS.SV.sValue (args[0]));
var flags = (args.length > 1 && args[1].tok != 1073742335 && args[1].tok != 1073742334 && args[1].tok != 10 ? JS.SV.sValue (args[1]) : "");
var isSequence = !isList && sFind.equalsIgnoreCase ("SEQUENCE");
var isSeq = !isList && sFind.equalsIgnoreCase ("SEQ");
if (sFind.toUpperCase ().startsWith ("SMILES/")) {
if (!sFind.endsWith ("/")) sFind += "/";
var s = sFind.substring (6) + "//";
if (JV.JC.isSmilesCanonical (s)) {
flags = "SMILES";
sFind = "CHEMICAL";
} else {
sFind = "SMILES";
flags = s + flags;
}} else if (sFind.toUpperCase ().startsWith ("SMARTS/")) {
if (!sFind.endsWith ("/")) sFind += "/";
flags = sFind.substring (6) + (flags.length == 0 ? "//" : flags);
sFind = "SMARTS";
}var isSmiles = !isList && sFind.equalsIgnoreCase ("SMILES");
var isSMARTS = !isList && sFind.equalsIgnoreCase ("SMARTS");
var isChemical = !isList && sFind.equalsIgnoreCase ("CHEMICAL");
var isMF = !isList && sFind.equalsIgnoreCase ("MF");
var isCF = !isList && sFind.equalsIgnoreCase ("CELLFORMULA");
var argLast = (args.length > 0 ? args[args.length - 1] : JS.SV.vF);
var isON = !isList && (argLast.tok == 1073742335);
try {
if (isChemical) {
var bsAtoms = (x1.tok == 10 ? x1.value : null);
var data = (bsAtoms == null ? JS.SV.sValue (x1) : this.vwr.getOpenSmiles (bsAtoms));
data = (data.length == 0 ? "" : this.vwr.getChemicalInfo (data, flags.toLowerCase (), bsAtoms)).trim ();
if (data.startsWith ("InChI")) data = JU.PT.rep (JU.PT.rep (data, "InChI=", ""), "InChIKey=", "");
return mp.addXStr (data);
}if (isSmiles || isSMARTS || x1.tok == 10) {
var iPt = (isSmiles || isSMARTS ? 2 : 1);
var bs2 = (iPt < args.length && args[iPt].tok == 10 ? args[iPt++].value : null);
var asBonds = ("bonds".equalsIgnoreCase (JS.SV.sValue (args[args.length - 1])));
var isAll = (asBonds || isON);
var ret = null;
switch (x1.tok) {
case 4:
var smiles = JS.SV.sValue (x1);
if (bs2 != null || isSmiles && args.length == 1) return false;
if (flags.equalsIgnoreCase ("mf")) {
ret = this.vwr.getSmilesMatcher ().getMolecularFormula (smiles, isSMARTS);
} else {
var pattern = flags;
var allMappings = true;
var asMap = false;
switch (args.length) {
case 4:
allMappings = JS.SV.bValue (args[3]);
case 3:
asMap = JS.SV.bValue (args[2]);
break;
}
var justOne = (!asMap && (!allMappings || !isSMARTS && !pattern.equals ("chirality")));
try {
ret = this.e.getSmilesExt ().getSmilesMatches (pattern, smiles, null, null, isSMARTS ? 2 : 1, !asMap, !allMappings);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
System.out.println (ex.getMessage ());
return mp.addXInt (-1);
} else {
throw ex;
}
}
if (justOne) {
var len = (ret).length;
return mp.addXInt (!allMappings && len > 0 ? 1 : len);
}}break;
case 10:
var bs = x1.value;
if (isMF && flags.length != 0) return mp.addXBs (JU.JmolMolecule.getBitSetForMF (this.vwr.ms.at, bs, flags));
if (isMF || isCF) return mp.addXStr (JU.JmolMolecule.getMolecularFormulaAtoms (this.vwr.ms.at, bs, (isMF ? null : this.vwr.ms.getCellWeights (bs)), isON));
if (isSequence || isSeq) {
var isHH = (argLast.asString ().equalsIgnoreCase ("H"));
isAll = new Boolean (isAll | isHH).valueOf ();
return mp.addXStr (this.vwr.getSmilesOpt (bs, -1, -1, (isAll ? 3145728 | 5242880 | (isHH ? 9437184 : 0) : 0) | (isSeq ? 34603008 : 1048576), null));
}if (isSmiles || isSMARTS) sFind = (args.length > 1 && args[1].tok == 10 ? this.vwr.getSmilesOpt (args[1].value, 0, 0, 0, flags) : flags);
flags = flags.toUpperCase ();
var bsMatch3D = bs2;
if (asBonds) {
var map = this.vwr.getSmilesMatcher ().getCorrelationMaps (sFind, this.vwr.ms.at, this.vwr.ms.ac, bs, (isSmiles ? 1 : 2) | 8);
ret = (map.length > 0 ? this.vwr.ms.getDihedralMap (map[0]) :  Clazz.newIntArray (0, 0));
} else if (flags.equalsIgnoreCase ("map")) {
var map = this.vwr.getSmilesMatcher ().getCorrelationMaps (sFind, this.vwr.ms.at, this.vwr.ms.ac, bs, (isSmiles ? 1 : 2) | 128);
ret = map;
} else if (sFind.equalsIgnoreCase ("crystalClass")) {
ret = this.vwr.ms.generateCrystalClass (bs.nextSetBit (0), (args.length != 2 ? null : argLast.tok == 10 ? this.vwr.ms.getAtomSetCenter (argLast.value) : JS.SV.ptValue (argLast)));
} else {
var smilesFlags = (isSmiles ? (flags.indexOf ("OPEN") >= 0 ? 5 : 1) : 2) | (isON && sFind.length == 0 ? 22020096 : 0);
if (flags.indexOf ("/MOLECULE/") >= 0) {
var mols = this.vwr.ms.getMolecules ();
var molList =  new JU.Lst ();
for (var i = 0; i < mols.length; i++) {
if (mols[i].atomList.intersects (bs)) {
var bsRet = this.e.getSmilesExt ().getSmilesMatches (sFind, null, mols[i].atomList, bsMatch3D, smilesFlags, !isON, false);
if (!bsRet.isEmpty ()) molList.addLast (bsRet);
}}
ret = molList;
} else {
ret = this.e.getSmilesExt ().getSmilesMatches (sFind, null, bs, bsMatch3D, smilesFlags, !isON, false);
}}break;
}
if (ret == null) this.e.invArg ();
return mp.addXObj (ret);
}} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.e.evalError (ex.getMessage (), null);
} else {
throw ex;
}
}
var isReverse = (flags.indexOf ("v") >= 0);
var isCaseInsensitive = (flags.indexOf ("i") >= 0);
var asMatch = (flags.indexOf ("m") >= 0);
var checkEmpty = (sFind.length == 0);
var isPattern = (!checkEmpty && args.length == 2);
if (isList || isPattern) {
var pm = (isPattern ? this.getPatternMatcher () : null);
var pattern = null;
var svlist = (isList ? x1.getList () : null);
if (isPattern) {
try {
pattern = pm.compile (sFind, isCaseInsensitive);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.e.evalError (ex.toString (), null);
} else {
throw ex;
}
}
}var list = (checkEmpty ? null : JS.SV.strListValue (x1));
var nlist = (checkEmpty ? svlist.size () : list.length);
if (JU.Logger.debugging) JU.Logger.debug ("finding " + sFind);
var bs =  new JU.BS ();
var n = 0;
var matcher = null;
var v = (asMatch ?  new JU.Lst () : null);
var what = "";
for (var i = 0; i < nlist; i++) {
var isMatch;
if (checkEmpty) {
var o = svlist.get (i);
switch (o.tok) {
case 6:
isMatch = (o.getMap ().isEmpty () != isEmpty);
break;
case 7:
isMatch = ((o.getList ().size () == 0) != isEmpty);
break;
case 4:
isMatch = ((o.asString ().length == 0) != isEmpty);
break;
default:
isMatch = true;
}
} else if (isPattern) {
what = list[i];
matcher = pattern.matcher (what);
isMatch = matcher.find ();
} else {
isMatch = (JS.SV.sValue (svlist.get (i)).indexOf (sFind) >= 0);
}if (asMatch && isMatch || !asMatch && isMatch == !isReverse) {
n++;
bs.set (i);
if (asMatch) v.addLast (isReverse ? what.substring (0, matcher.start ()) + what.substring (matcher.end ()) : matcher.group ());
}}
if (!isList) {
return (asMatch ? mp.addXStr (v.size () == 1 ? v.get (0) : "") : isReverse ? mp.addXBool (n == 1) : asMatch ? mp.addXStr (n == 0 ? "" : matcher.group ()) : mp.addXInt (n == 0 ? 0 : matcher.start () + 1));
}if (asMatch) {
var listNew =  new Array (n);
if (n > 0) for (var i = list.length; --i >= 0; ) if (bs.get (i)) {
--n;
listNew[n] = (asMatch ? v.get (n) : list[i]);
}
return mp.addXAS (listNew);
}var l =  new JU.Lst ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) l.addLast (svlist.get (i));

return mp.addXList (l);
}if (isSequence) {
return mp.addXStr (this.vwr.getJBR ().toStdAmino3 (JS.SV.sValue (x1)));
}return mp.addXInt (JS.SV.sValue (x1).indexOf (sFind) + 1);
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateGetProperty", 
 function (mp, args, tok0, isAtomProperty) {
var nargs = args.length;
var isSelect = (isAtomProperty && tok0 == 1275082245);
var isPivot = (isAtomProperty && tok0 == 1275068437 && nargs > 0);
var isAuxiliary = (tok0 == 1275068449);
var pt = 0;
var tok = (nargs == 0 ? 0 : args[0].tok);
if (nargs == 2 && (tok == 7 || tok == 6 || tok == 14)) {
return mp.addXObj (this.vwr.extractProperty (args[0].value, args[1].value.toString (), -1));
}var bsSelect = (isAtomProperty && nargs == 1 && args[0].tok == 10 ? args[0].value : null);
var pname = (bsSelect == null && nargs > 0 ? JS.SV.sValue (args[pt++]) : "");
var propertyName = pname;
var lc = propertyName.toLowerCase ();
if (!isSelect && lc.indexOf ("[select ") < 0) propertyName = lc;
var isJSON = false;
if (propertyName.equals ("json") && nargs > pt) {
isJSON = true;
propertyName = JS.SV.sValue (args[pt++]);
}var x = null;
if (isAtomProperty) {
x = mp.getX ();
switch (x.tok) {
case 10:
break;
case 4:
var name = x.value;
var data =  new Array (3);
var shapeID;
if (name.startsWith ("$")) {
name = name.substring (1);
shapeID = this.vwr.shm.getShapeIdFromObjectName (name);
if (shapeID >= 0) {
data[0] = name;
this.vwr.shm.getShapePropertyData (shapeID, "index", data);
if (data[1] != null && !pname.equals ("index")) {
var index = (data[1]).intValue ();
data[1] = this.vwr.shm.getShapePropertyIndex (shapeID, pname.intern (), index);
}}} else {
shapeID = JV.JC.shapeTokenIndex (JS.T.getTokFromName (name));
if (shapeID >= 0) {
data[0] = pname;
data[1] = Integer.$valueOf (-1);
this.vwr.shm.getShapePropertyData (shapeID, pname.intern (), data);
}}return (data[1] == null ? mp.addXStr ("") : mp.addXObj (data[1]));
case 7:
if (isPivot) {
var lstx = x.getList ();
var map =  new java.util.Hashtable ();
var sep = (nargs > 1 ? JS.SV.sValue (args[nargs - 1]) : null);
if (sep != null) nargs--;
var keys =  new Array (nargs);
for (var i = 0; i < nargs; i++) keys[i] = JS.SV.sValue (args[i]);

for (var i = 0, n = lstx.size (); i < n; i++) {
var sv = lstx.get (i);
if (sv.tok != 6) continue;
var mapi = sv.getMap ();
var key = "";
for (var j = 0; j < nargs; j++) {
var obj = mapi.get (keys[j]);
key += (j == 0 ? "" : sep) + JS.SV.sValue (obj);
}
var vlist = map.get (key);
if (vlist == null) map.put (key, vlist = JS.SV.newV (7,  new JU.Lst ()));
vlist.getList ().addLast (sv);
}
return mp.addXMap (map);
}if (bsSelect != null) {
var l0 = x.getList ();
var lst =  new JU.Lst ();
for (var i = bsSelect.nextSetBit (0); i >= 0; i = bsSelect.nextSetBit (i + 1)) lst.addLast (l0.get (i));

return mp.addXList (lst);
}default:
if (isSelect) propertyName = "[SELECT " + propertyName + "]";
return mp.addXObj (this.vwr.extractProperty (x, propertyName, -1));
}
if (!lc.startsWith ("bondinfo") && !lc.startsWith ("atominfo") && !lc.startsWith ("modelkitinfo")) propertyName = "atomInfo." + propertyName;
}var propertyValue = "";
if (propertyName.equalsIgnoreCase ("fileContents") && nargs >= 2) {
var s = JS.SV.sValue (args[1]);
for (var i = 2; i < nargs; i++) s += "|" + JS.SV.sValue (args[i]);

propertyValue = s;
pt = nargs;
} else if (nargs > pt) {
switch (args[pt].tok) {
case 10:
propertyValue = args[pt++].value;
if (propertyName.equalsIgnoreCase ("bondInfo") && nargs > pt && args[pt].tok == 10) propertyValue =  Clazz.newArray (-1, [propertyValue, args[pt].value]);
break;
case 6:
case 4:
if (this.vwr.checkPropertyParameter (propertyName)) propertyValue = args[pt++].value;
break;
}
}if (isAtomProperty) {
var bs = x.value;
var iAtom = bs.nextSetBit (0);
if (iAtom < 0) return mp.addXStr ("");
propertyValue = bs;
}if (isAuxiliary && !isAtomProperty) propertyName = "auxiliaryInfo.models." + propertyName;
propertyName = JU.PT.rep (propertyName, ".[", "[");
var property = this.vwr.getProperty (null, propertyName, propertyValue);
if (pt < nargs) property = this.vwr.extractProperty (property, args, pt);
return mp.addXObj (isJSON ? JS.SV.safeJSON ("value", property) : JS.SV.isVariableType (property) ? property : JU.Escape.toReadable (propertyName, property));
}, "JS.ScriptMathProcessor,~A,~N,~B");
Clazz.defineMethod (c$, "evaluateFormat", 
 function (mp, intValue, args, isLabel) {
var x1 = (args.length < 2 || intValue == 1287653388 ? mp.getX () : null);
var format = (args.length == 0 ? "%U" : args[0].tok == 7 ? null : JS.SV.sValue (args[0]));
if (!isLabel && args.length > 0 && x1 != null && x1.tok != 10 && format != null) {
if (args.length == 2) {
var listIn = x1.getList ();
var formatList = args[1].getList ();
if (listIn == null || formatList == null) return false;
x1 = JS.SV.getVariableList (this.getSublist (listIn, formatList));
}args =  Clazz.newArray (-1, [args[0], x1]);
x1 = null;
}if (x1 == null) {
var pt = (isLabel ? -1 : JS.SV.getFormatType (format));
if (pt >= 0 && args.length != 2) return false;
if (pt >= 0 || args.length < 2 || args[1].tok != 7) {
var o = JS.SV.format (args, pt);
return (format.equalsIgnoreCase ("json") ? mp.addXStr (o) : mp.addXObj (o));
}var a = args[1].getList ();
var args2 =  Clazz.newArray (-1, [args[0], null]);
var sa =  new Array (a.size ());
for (var i = sa.length; --i >= 0; ) {
args2[1] = a.get (i);
sa[i] = JS.SV.format (args2, pt).toString ();
}
return mp.addXAS (sa);
}if (x1.tok == 7 && format == null) {
var listIn = x1.getList ();
var formatList = args[0].getList ();
var listOut = this.getSublist (listIn, formatList);
return mp.addXList (listOut);
}var bs = (x1.tok == 10 ? x1.value : null);
var asArray = JS.T.tokAttr (intValue, 480);
return mp.addXObj (format == null ? "" : bs == null ? JS.SV.sprintf (JU.PT.formatCheck (format), x1) : this.e.getCmdExt ().getBitsetIdent (bs, format, x1.value, true, x1.index, asArray));
}, "JS.ScriptMathProcessor,~N,~A,~B");
Clazz.defineMethod (c$, "getSublist", 
 function (listIn, formatList) {
var listOut =  new JU.Lst ();
var map;
var v;
var list;
for (var i = 0, n = listIn.size (); i < n; i++) {
var element = listIn.get (i);
switch (element.tok) {
case 6:
map = element.getMap ();
list =  new JU.Lst ();
for (var j = 0, n1 = formatList.size (); j < n1; j++) {
v = map.get (JS.SV.sValue (formatList.get (j)));
list.addLast (v == null ? JS.SV.newS ("") : v);
}
listOut.addLast (JS.SV.getVariableList (list));
break;
case 7:
map =  new java.util.Hashtable ();
list = element.getList ();
for (var j = 0, n1 = Math.min (list.size (), formatList.size ()); j < n1; j++) {
map.put (JS.SV.sValue (formatList.get (j)), list.get (j));
}
listOut.addLast (JS.SV.getVariable (map));
}
}
return listOut;
}, "JU.Lst,JU.Lst");
Clazz.defineMethod (c$, "evaluateList", 
 function (mp, tok, args) {
var len = args.length;
var x1 = mp.getX ();
var isArray1 = (x1.tok == 7);
var x2;
switch (tok) {
case 1275335685:
return (len == 2 && mp.addX (x1.pushPop (args[0], args[1])) || len == 1 && mp.addX (x1.pushPop (null, args[0])));
case 1275334681:
return (len == 1 && mp.addX (x1.pushPop (args[0], null)) || len == 0 && mp.addX (x1.pushPop (null, null)));
case 1275069441:
if (len != 1 && len != 2) return false;
break;
case 1275069447:
case 1275069446:
break;
default:
if (len != 1) return false;
}
var sList1 = null;
var sList2 = null;
var sList3 = null;
if (len == 2) {
var tab = JS.SV.sValue (args[0]);
x2 = args[1];
if (tok == 1275069441) {
sList1 = (isArray1 ? JS.SV.strListValue (x1) : JU.PT.split (JS.SV.sValue (x1), "\n"));
sList2 = (x2.tok == 7 ? JS.SV.strListValue (x2) : JU.PT.split (JS.SV.sValue (x2), "\n"));
sList3 =  new Array (len = Math.max (sList1.length, sList2.length));
for (var i = 0; i < len; i++) sList3[i] = (i >= sList1.length ? "" : sList1[i]) + tab + (i >= sList2.length ? "" : sList2[i]);

return mp.addXAS (sList3);
}if (x2.tok != 1073742335) return false;
var l = x1.getList ();
var isCSV = (tab.length == 0);
if (isCSV) tab = ",";
if (tok == 1275069446) {
var s2 =  new Array (l.size ());
for (var i = l.size (); --i >= 0; ) {
var a = l.get (i).getList ();
if (a == null) s2[i] = l.get (i);
 else {
var sb =  new JU.SB ();
for (var j = 0, n = a.size (); j < n; j++) {
if (j > 0) sb.append (tab);
var sv = a.get (j);
sb.append (isCSV && sv.tok == 4 ? "\"" + JU.PT.rep (sv.value, "\"", "\"\"") + "\"" : "" + sv.asString ());
}
s2[i] = JS.SV.newS (sb.toString ());
}}
return mp.addXAV (s2);
}var sa =  new JU.Lst ();
if (isCSV) tab = "\0";
var next =  Clazz.newIntArray (2, 0);
for (var i = 0, nl = l.size (); i < nl; i++) {
var line = l.get (i).asString ();
if (isCSV) {
next[1] = 0;
next[0] = 0;
var last = 0;
while (true) {
var s = JU.PT.getCSVString (line, next);
if (s == null) {
if (next[1] == -1) {
line += (++i < nl ? "\n" + l.get (i).asString () : "\"");
next[1] = last;
continue;
}line = line.substring (0, last) + line.substring (last).$replace (',', '\0');
break;
}line = line.substring (0, last) + line.substring (last, next[0]).$replace (',', '\0') + s + line.substring (next[1]);
next[1] = last = next[0] + s.length;
}
}var linaa = line.$plit (tab);
var la =  new JU.Lst ();
for (var j = 0, n = linaa.length; j < n; j++) {
var s = linaa[j];
if (s.indexOf (".") < 0) try {
la.addLast (JS.SV.newI (Integer.parseInt (s)));
continue;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
 else try {
la.addLast (JS.SV.getVariable (Float.$valueOf (Float.parseFloat (s))));
continue;
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
la.addLast (JS.SV.newS (s));
}
sa.addLast (JS.SV.getVariableList (la));
}
return mp.addXObj (JS.SV.getVariableList (sa));
}x2 = (len == 0 ? JS.SV.newV (1073742327, "all") : args[0]);
var isAll = (x2.tok == 1073742327);
if (!isArray1 && x1.tok != 4) return mp.binaryOp (this.opTokenFor (tok), x1, x2);
var isScalar1 = JS.SV.isScalar (x1);
var isScalar2 = JS.SV.isScalar (x2);
var list1 = null;
var list2 = null;
var alist1 = x1.getList ();
var alist2 = x2.getList ();
if (isArray1) {
len = alist1.size ();
} else if (isScalar1) {
len = 2147483647;
} else {
sList1 = (JU.PT.split (JS.SV.sValue (x1), "\n"));
list1 =  Clazz.newFloatArray (len = sList1.length, 0);
JU.PT.parseFloatArrayData (sList1, list1);
}if (isAll && tok != 1275069446) {
var sum = 0;
if (isArray1) {
for (var i = len; --i >= 0; ) sum += JS.SV.fValue (alist1.get (i));

} else if (!isScalar1) {
for (var i = len; --i >= 0; ) sum += list1[i];

}return mp.addXFloat (sum);
}if (tok == 1275069446 && x2.tok == 4) {
var sb =  new JU.SB ();
if (isScalar1) {
sb.append (JS.SV.sValue (x1));
} else {
var s = (isAll ? "" : x2.value.toString ());
for (var i = 0; i < len; i++) sb.append (i > 0 ? s : "").append (JS.SV.sValue (alist1.get (i)));

}return mp.addXStr (sb.toString ());
}var scalar = null;
if (isScalar2) {
scalar = x2;
} else if (x2.tok == 7) {
len = Math.min (len, alist2.size ());
} else {
sList2 = JU.PT.split (JS.SV.sValue (x2), "\n");
list2 =  Clazz.newFloatArray (sList2.length, 0);
JU.PT.parseFloatArrayData (sList2, list2);
len = Math.min (len, list2.length);
}var token = this.opTokenFor (tok);
var olist =  new Array (len);
if (isArray1 && isAll) {
var llist =  new JU.Lst ();
return mp.addXList (this.addAllLists (x1.getList (), llist));
}var a = (isScalar1 ? x1 : null);
var b;
for (var i = 0; i < len; i++) {
if (isScalar2) b = scalar;
 else if (x2.tok == 7) b = alist2.get (i);
 else if (Float.isNaN (list2[i])) b = JS.SV.getVariable (JS.SV.unescapePointOrBitsetAsVariable (sList2[i]));
 else b = JS.SV.newF (list2[i]);
if (!isScalar1) {
if (isArray1) a = alist1.get (i);
 else if (Float.isNaN (list1[i])) a = JS.SV.getVariable (JS.SV.unescapePointOrBitsetAsVariable (sList1[i]));
 else a = JS.SV.newF (list1[i]);
}if (tok == 1275069446) {
if (a.tok != 7) {
var l =  new JU.Lst ();
l.addLast (a);
a = JS.SV.getVariableList (l);
}}if (!mp.binaryOp (token, a, b)) return false;
olist[i] = mp.getX ();
}
return mp.addXAV (olist);
}, "JS.ScriptMathProcessor,~N,~A");
Clazz.defineMethod (c$, "addAllLists", 
 function (list, l) {
var n = list.size ();
for (var i = 0; i < n; i++) {
var v = list.get (i);
if (v.tok == 7) this.addAllLists (v.getList (), l);
 else l.addLast (v);
}
return l;
}, "JU.Lst,JU.Lst");
Clazz.defineMethod (c$, "evaluateLoad", 
 function (mp, args, isFile) {
if (args.length < 1 || args.length > 3) return false;
var file = JV.FileManager.fixDOSName (JS.SV.sValue (args[0]));
var asBytes = (args.length > 1 && args[1].tok == 1073742335);
var async = (this.vwr.async || args.length > 2 && args[args.length - 1].tok == 1073742335);
var nBytesMax = (args.length > 1 && args[1].tok == 2 ? args[1].asInt () : -1);
var asJSON = (args.length > 1 && args[1].asString ().equalsIgnoreCase ("JSON"));
if (asBytes) return mp.addXMap (this.vwr.fm.getFileAsMap (file, null));
var isQues = file.startsWith ("?");
if (JV.Viewer.isJS && (isQues || async)) {
if (isFile && isQues) return mp.addXStr ("");
file = this.e.loadFileAsync ("load()_", file, mp.oPt, true);
}var str = isFile ? this.vwr.fm.getFilePath (file, false, false) : this.vwr.getFileAsString4 (file, nBytesMax, false, false, true, "script");
try {
return (asJSON ? mp.addXObj (this.vwr.parseJSON (str)) : mp.addXStr (str));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
}, "JS.ScriptMathProcessor,~A,~B");
Clazz.defineMethod (c$, "evaluateMath", 
 function (mp, args, tok) {
if (tok == 134217749) {
if (args.length == 1 && args[0].tok == 4) return mp.addXStr (( new java.util.Date ()) + "\t" + JS.SV.sValue (args[0]));
return mp.addXInt ((System.currentTimeMillis () & 0x7FFFFFFF) - (args.length == 0 ? 0 : args[0].asInt ()));
}if (args.length != 1) return false;
if (tok == 134218250) {
if (args[0].tok == 2) return mp.addXInt (Math.abs (args[0].asInt ()));
return mp.addXFloat (Math.abs (args[0].asFloat ()));
}var x = JS.SV.fValue (args[0]);
switch (tok) {
case 134218242:
return mp.addXFloat ((Math.acos (x) * 180 / 3.141592653589793));
case 134218245:
return mp.addXFloat (Math.cos (x * 3.141592653589793 / 180));
case 134218244:
return mp.addXFloat (Math.sin (x * 3.141592653589793 / 180));
case 134218246:
return mp.addXFloat (Math.sqrt (x));
}
return false;
}, "JS.ScriptMathProcessor,~A,~N");
Clazz.defineMethod (c$, "evaluateMeasure", 
 function (mp, args, tok) {
var nPoints = 0;
switch (tok) {
case 1745489939:
var property = null;
var points =  new JU.Lst ();
var rangeMinMax =  Clazz.newFloatArray (-1, [3.4028235E38, 3.4028235E38]);
var strFormat = null;
var units = null;
var isAllConnected = false;
var isNotConnected = false;
var rPt = 0;
var isNull = false;
var rd = null;
var nBitSets = 0;
var vdw = 3.4028235E38;
var asMinArray = false;
var asFloatArray = false;
for (var i = 0; i < args.length; i++) {
switch (args[i].tok) {
case 10:
var bs = args[i].value;
if (bs.length () == 0) isNull = true;
points.addLast (bs);
nPoints++;
nBitSets++;
break;
case 8:
var v =  new JU.Point3fi ();
v.setT (args[i].value);
points.addLast (v);
nPoints++;
break;
case 2:
case 3:
rangeMinMax[rPt++ % 2] = JS.SV.fValue (args[i]);
break;
case 4:
var s = JS.SV.sValue (args[i]);
if (s.startsWith ("property_")) {
property = s;
break;
}if (s.equalsIgnoreCase ("vdw") || s.equalsIgnoreCase ("vanderwaals")) vdw = (i + 1 < args.length && args[i + 1].tok == 2 ? args[++i].asInt () : 100) / 100;
 else if (s.equalsIgnoreCase ("notConnected")) isNotConnected = true;
 else if (s.equalsIgnoreCase ("connected")) isAllConnected = true;
 else if (s.equalsIgnoreCase ("minArray")) asMinArray = (nBitSets >= 1);
 else if (s.equalsIgnoreCase ("asArray") || s.length == 0) asFloatArray = (nBitSets >= 1);
 else if (JM.Measurement.isUnits (s)) units = s.toLowerCase ();
 else strFormat = nPoints + ":" + s;
break;
default:
return false;
}
}
if (nPoints < 2 || nPoints > 4 || rPt > 2 || isNotConnected && isAllConnected) return false;
if (isNull) return mp.addXStr ("");
if (vdw != 3.4028235E38 && (nBitSets != 2 || nPoints != 2)) return mp.addXStr ("");
rd = (vdw == 3.4028235E38 ?  new J.atomdata.RadiusData (rangeMinMax, 0, null, null) :  new J.atomdata.RadiusData (null, vdw, J.atomdata.RadiusData.EnumType.FACTOR, J.c.VDW.AUTO));
var obj = (this.vwr.newMeasurementData (null, points)).set (0, null, rd, property, strFormat, units, null, isAllConnected, isNotConnected, null, true, 0, 0, null, NaN).getMeasurements (asFloatArray, asMinArray);
return mp.addXObj (obj);
case 134217729:
if ((nPoints = args.length) != 3 && nPoints != 4) return false;
break;
default:
if ((nPoints = args.length) != 2) return false;
}
var pts =  new Array (nPoints);
for (var i = 0; i < nPoints; i++) {
if ((pts[i] = mp.ptValue (args[i], null)) == null) return false;
}
switch (nPoints) {
case 2:
return mp.addXFloat (pts[0].distance (pts[1]));
case 3:
return mp.addXFloat (JU.Measure.computeAngleABC (pts[0], pts[1], pts[2], true));
case 4:
return mp.addXFloat (JU.Measure.computeTorsion (pts[0], pts[1], pts[2], pts[3], true));
}
return false;
}, "JS.ScriptMathProcessor,~A,~N");
Clazz.defineMethod (c$, "evaluateModulation", 
 function (mp, args) {
var type = "";
var t = NaN;
var t456 = null;
switch (args.length) {
case 0:
break;
case 1:
switch (args[0].tok) {
case 8:
t456 = args[0].value;
break;
case 4:
type = args[0].asString ();
break;
default:
t = JS.SV.fValue (args[0]);
}
break;
case 2:
type = JS.SV.sValue (args[0]);
t = JS.SV.fValue (args[1]);
break;
default:
return false;
}
if (t456 == null && t < 1e6) t456 = JU.P3.new3 (t, t, t);
var x = mp.getX ();
var bs = (x.tok == 10 ? x.value :  new JU.BS ());
return mp.addXList (this.vwr.ms.getModulationList (bs, (type + "D").toUpperCase ().charAt (0), t456));
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluatePlane", 
 function (mp, args, tok) {
if (tok == 134219265 && args.length != 3 || tok == 134217763 && args.length != 2 && args.length != 3 && args.length != 4 || args.length == 0 || args.length > 4) return false;
var pt1;
var pt2;
var pt3;
var plane;
var norm;
var vTemp;
switch (args.length) {
case 1:
if (args[0].tok == 10) {
var bs = args[0].value;
if (bs.cardinality () == 3) {
var pts = this.vwr.ms.getAtomPointVector (bs);
return mp.addXPt4 (JU.Measure.getPlaneThroughPoints (pts.get (0), pts.get (1), pts.get (2),  new JU.V3 (),  new JU.V3 (),  new JU.P4 ()));
}}var pt = JU.Escape.uP (JS.SV.sValue (args[0]));
if (Clazz.instanceOf (pt, JU.P4)) return mp.addXPt4 (pt);
return mp.addXStr ("" + pt);
case 2:
if (tok == 134217763) {
if (args[1].tok != 9) return false;
pt3 =  new JU.P3 ();
norm =  new JU.V3 ();
vTemp =  new JU.V3 ();
plane = args[1].value;
if (args[0].tok == 9) {
var list = JU.Measure.getIntersectionPP (args[0].value, plane);
if (list == null) return mp.addXStr ("");
return mp.addXList (list);
}pt2 = mp.ptValue (args[0], null);
if (pt2 == null) return mp.addXStr ("");
return mp.addXPt (JU.Measure.getIntersection (pt2, null, plane, pt3, norm, vTemp));
}case 3:
case 4:
switch (tok) {
case 134219265:
return mp.addXPt4 (this.e.getHklPlane (JU.P3.new3 (JS.SV.fValue (args[0]), JS.SV.fValue (args[1]), JS.SV.fValue (args[2]))));
case 134217763:
pt1 = mp.ptValue (args[0], null);
pt2 = mp.ptValue (args[1], null);
if (pt1 == null || pt2 == null) return mp.addXStr ("");
var vLine = JU.V3.newV (pt2);
vLine.normalize ();
if (args[2].tok == 9) {
pt3 =  new JU.P3 ();
norm =  new JU.V3 ();
vTemp =  new JU.V3 ();
pt1 = JU.Measure.getIntersection (pt1, vLine, args[2].value, pt3, norm, vTemp);
if (pt1 == null) return mp.addXStr ("");
return mp.addXPt (pt1);
}pt3 = mp.ptValue (args[2], null);
if (pt3 == null) return mp.addXStr ("");
var v =  new JU.V3 ();
pt3 = JU.P3.newP (pt3);
if (args.length == 3) {
JU.Measure.projectOntoAxis (pt3, pt1, vLine, v);
return mp.addXPt (pt3);
}var r = JS.SV.fValue (args[3]);
var ptCenter = JU.P3.newP (pt3);
JU.Measure.projectOntoAxis (pt3, pt1, vLine, v);
var d = ptCenter.distance (pt3);
var l =  new JU.Lst ();
if (d == r) {
l.addLast (pt3);
} else if (d < r) {
d = Math.sqrt (r * r - d * d);
v.scaleAdd2 (d, vLine, pt3);
l.addLast (JU.P3.newP (v));
v.scaleAdd2 (-d, vLine, pt3);
l.addLast (JU.P3.newP (v));
}return mp.addXList (l);
}
switch (args[0].tok) {
case 2:
case 3:
if (args.length == 3) {
var r = JS.SV.fValue (args[0]);
var theta = JS.SV.fValue (args[1]);
var phi = JS.SV.fValue (args[2]);
norm = JU.V3.new3 (0, 0, 1);
pt2 = JU.P3.new3 (0, 1, 0);
var q = JU.Quat.newVA (pt2, phi);
q.getMatrix ().rotate (norm);
pt2.set (0, 0, 1);
q = JU.Quat.newVA (pt2, theta);
q.getMatrix ().rotate (norm);
pt2.setT (norm);
pt2.scale (r);
plane =  new JU.P4 ();
JU.Measure.getPlaneThroughPoint (pt2, norm, plane);
return mp.addXPt4 (plane);
}break;
case 10:
case 8:
pt1 = mp.ptValue (args[0], null);
pt2 = mp.ptValue (args[1], null);
if (pt2 == null) return false;
pt3 = (args.length > 2 && (args[2].tok == 10 || args[2].tok == 8) ? mp.ptValue (args[2], null) : null);
norm = JU.V3.newV (pt2);
if (pt3 == null) {
plane =  new JU.P4 ();
if (args.length == 2 || args[2].tok != 2 && args[2].tok != 3 && !args[2].asBoolean ()) {
pt3 = JU.P3.newP (pt1);
pt3.add (pt2);
pt3.scale (0.5);
norm.sub (pt1);
norm.normalize ();
} else if (args[2].tok == 1073742335) {
pt3 = pt1;
} else {
norm.sub (pt1);
pt3 =  new JU.P3 ();
pt3.scaleAdd2 (args[2].asFloat (), norm, pt1);
}JU.Measure.getPlaneThroughPoint (pt3, norm, plane);
return mp.addXPt4 (plane);
}var vAB =  new JU.V3 ();
var ptref = (args.length == 4 ? mp.ptValue (args[3], null) : null);
var nd = JU.Measure.getDirectedNormalThroughPoints (pt1, pt2, pt3, ptref, norm, vAB);
return mp.addXPt4 (JU.P4.new4 (norm.x, norm.y, norm.z, nd));
}
}
if (args.length != 4) return false;
var x = JS.SV.fValue (args[0]);
var y = JS.SV.fValue (args[1]);
var z = JS.SV.fValue (args[2]);
var w = JS.SV.fValue (args[3]);
return mp.addXPt4 (JU.P4.new4 (x, y, z, w));
}, "JS.ScriptMathProcessor,~A,~N");
Clazz.defineMethod (c$, "evaluatePoint", 
 function (mp, args) {
switch (args.length) {
default:
return false;
case 1:
if (args[0].tok == 3 || args[0].tok == 2) return mp.addXInt (args[0].asInt ());
var s = JS.SV.sValue (args[0]);
if (args[0].tok == 7) s = "{" + s + "}";
var pt = JU.Escape.uP (s);
return (Clazz.instanceOf (pt, JU.P3) ? mp.addXPt (pt) : mp.addXStr ("" + pt));
case 2:
var pt3;
switch (args[1].tok) {
case 1073742334:
case 1073742335:
switch (args[0].tok) {
case 8:
pt3 = JU.P3.newP (args[0].value);
break;
case 10:
pt3 = this.vwr.ms.getAtomSetCenter (args[0].value);
break;
default:
return false;
}
if (args[1].tok == 1073742335) {
this.vwr.tm.transformPt3f (pt3, pt3);
pt3.y = this.vwr.tm.height - pt3.y;
if (this.vwr.antialiased) pt3.scale (0.5);
} else {
if (this.vwr.antialiased) pt3.scale (2);
pt3.y = this.vwr.tm.height - pt3.y;
this.vwr.tm.unTransformPoint (pt3, pt3);
}break;
case 8:
var sv = args[0].getList ();
if (sv == null || sv.size () != 4) return false;
var pt1 = JS.SV.ptValue (args[1]);
pt3 = JU.P3.newP (JS.SV.ptValue (sv.get (0)));
pt3.scaleAdd2 (pt1.x, JS.SV.ptValue (sv.get (1)), pt3);
pt3.scaleAdd2 (pt1.y, JS.SV.ptValue (sv.get (2)), pt3);
pt3.scaleAdd2 (pt1.z, JS.SV.ptValue (sv.get (3)), pt3);
break;
default:
return false;
}
return mp.addXPt (pt3);
case 3:
return mp.addXPt (JU.P3.new3 (args[0].asFloat (), args[1].asFloat (), args[2].asFloat ()));
case 4:
return mp.addXPt4 (JU.P4.new4 (args[0].asFloat (), args[1].asFloat (), args[2].asFloat (), args[3].asFloat ()));
}
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluatePrompt", 
 function (mp, args) {
if (args.length != 1 && args.length != 2 && args.length != 3) return false;
var label = JS.SV.sValue (args[0]);
var buttonArray = (args.length > 1 && args[1].tok == 7 ? JS.SV.strListValue (args[1]) : null);
var asButtons = (buttonArray != null || args.length == 1 || args.length == 3 && args[2].asBoolean ());
var input = (buttonArray != null ? null : args.length >= 2 ? JS.SV.sValue (args[1]) : "OK");
var s = "" + this.vwr.prompt (label, input, buttonArray, asButtons);
return (asButtons && buttonArray != null ? mp.addXInt (Integer.parseInt (s) + 1) : mp.addXStr (s));
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateQuaternion", 
 function (mp, args, tok) {
var pt0 = null;
var nArgs = args.length;
var nMax = 2147483647;
var isRelative = false;
if (tok == 134221850) {
if (nArgs > 1 && args[nArgs - 1].tok == 4 && (args[nArgs - 1].value).equalsIgnoreCase ("relative")) {
nArgs--;
isRelative = true;
}if (nArgs > 1 && args[nArgs - 1].tok == 2 && args[0].tok == 10) {
nMax = args[nArgs - 1].asInt ();
if (nMax <= 0) nMax = 2147483646;
nArgs--;
}}switch (nArgs) {
case 0:
case 1:
case 4:
break;
case 2:
if (tok == 134221850) {
if (args[0].tok == 7 && (args[1].tok == 7 || args[1].tok == 1073742335)) break;
if (args[0].tok == 10 && (args[1].tok == 2 || args[1].tok == 10)) break;
}if ((pt0 = mp.ptValue (args[0], null)) == null || tok != 134221850 && args[1].tok == 8) return false;
break;
case 3:
if (tok != 134221850) return false;
if (args[0].tok == 9) {
if (args[2].tok != 8 && args[2].tok != 10) return false;
break;
}for (var i = 0; i < 3; i++) if (args[i].tok != 8 && args[i].tok != 10) return false;

break;
default:
return false;
}
var q = null;
var qs = null;
var p4 = null;
switch (nArgs) {
case 0:
return mp.addXPt4 (this.vwr.tm.getRotationQ ().toPoint4f ());
case 1:
default:
if (tok == 134221850 && args[0].tok == 7) {
var data1 = this.e.getQuaternionArray (args[0].getList (), 1073742001);
var mean = JU.Quat.sphereMean (data1, null, 0.0001);
q = (Clazz.instanceOf (mean, JU.Quat) ? mean : null);
break;
} else if (tok == 134221850 && args[0].tok == 10) {
qs = this.vwr.getAtomGroupQuaternions (args[0].value, nMax);
} else if (args[0].tok == 11) {
q = JU.Quat.newM (args[0].value);
} else if (args[0].tok == 9) {
p4 = args[0].value;
} else {
var s = JS.SV.sValue (args[0]);
var v = JU.Escape.uP (s.equalsIgnoreCase ("best") ? this.vwr.getOrientationText (1073741864, "best", null).toString () : s);
if (!(Clazz.instanceOf (v, JU.P4))) return false;
p4 = v;
}if (tok == 134217731) q = JU.Quat.newVA (JU.P3.new3 (p4.x, p4.y, p4.z), p4.w);
break;
case 2:
if (tok == 134221850) {
if (args[0].tok == 7 && args[1].tok == 7) {
var data1 = this.e.getQuaternionArray (args[0].getList (), 1073742001);
var data2 = this.e.getQuaternionArray (args[1].getList (), 1073742001);
qs = JU.Quat.div (data2, data1, nMax, isRelative);
break;
}if (args[0].tok == 7 && args[1].tok == 1073742335) {
var data1 = this.e.getQuaternionArray (args[0].getList (), 1073742001);
var stddev =  Clazz.newFloatArray (1, 0);
JU.Quat.sphereMean (data1, stddev, 0.0001);
return mp.addXFloat (stddev[0]);
}if (args[0].tok == 10 && args[1].tok == 10) {
var data1 = this.vwr.getAtomGroupQuaternions (args[0].value, 2147483647);
var data2 = this.vwr.getAtomGroupQuaternions (args[1].value, 2147483647);
qs = JU.Quat.div (data2, data1, nMax, isRelative);
break;
}}var pt1 = mp.ptValue (args[1], null);
p4 = mp.planeValue (args[0]);
if (pt1 != null) q = JU.Quat.getQuaternionFrame (JU.P3.new3 (0, 0, 0), pt0, pt1);
 else q = JU.Quat.newVA (pt0, JS.SV.fValue (args[1]));
break;
case 3:
if (args[0].tok == 9) {
var pt = (args[2].tok == 8 ? args[2].value : this.vwr.ms.getAtomSetCenter (args[2].value));
return mp.addXStr (JU.Escape.drawQuat (JU.Quat.newP4 (args[0].value), "q", JS.SV.sValue (args[1]), pt, 1));
}var pts =  new Array (3);
for (var i = 0; i < 3; i++) pts[i] = (args[i].tok == 8 ? args[i].value : this.vwr.ms.getAtomSetCenter (args[i].value));

q = JU.Quat.getQuaternionFrame (pts[0], pts[1], pts[2]);
break;
case 4:
if (tok == 134221850) p4 = JU.P4.new4 (JS.SV.fValue (args[1]), JS.SV.fValue (args[2]), JS.SV.fValue (args[3]), JS.SV.fValue (args[0]));
 else q = JU.Quat.newVA (JU.P3.new3 (JS.SV.fValue (args[0]), JS.SV.fValue (args[1]), JS.SV.fValue (args[2])), JS.SV.fValue (args[3]));
break;
}
if (qs != null) {
if (nMax != 2147483647) {
var list =  new JU.Lst ();
for (var i = 0; i < qs.length; i++) list.addLast (qs[i].toPoint4f ());

return mp.addXList (list);
}q = (qs.length > 0 ? qs[0] : null);
}return mp.addXPt4 ((q == null ? JU.Quat.newP4 (p4) : q).toPoint4f ());
}, "JS.ScriptMathProcessor,~A,~N");
Clazz.defineMethod (c$, "evaluateRandom", 
 function (mp, args) {
if (args.length > 3) return false;
if (this.rand == null) this.rand =  new java.util.Random ();
var lower = 0;
var upper = 1;
switch (args.length) {
case 3:
this.rand.setSeed (Clazz.floatToInt (JS.SV.fValue (args[2])));
case 2:
upper = JS.SV.fValue (args[1]);
case 1:
lower = JS.SV.fValue (args[0]);
case 0:
break;
default:
return false;
}
return mp.addXFloat ((this.rand.nextFloat () * (upper - lower)) + lower);
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateRowCol", 
 function (mp, args, tok) {
if (args.length != 1) return false;
var n = args[0].asInt () - 1;
var x1 = mp.getX ();
var f;
switch (x1.tok) {
case 11:
if (n < 0 || n > 2) return false;
var m = x1.value;
switch (tok) {
case 1275068935:
f =  Clazz.newFloatArray (3, 0);
m.getRow (n, f);
return mp.addXAF (f);
case 1275068934:
default:
f =  Clazz.newFloatArray (3, 0);
m.getColumn (n, f);
return mp.addXAF (f);
}
case 12:
if (n < 0 || n > 2) return false;
var m4 = x1.value;
switch (tok) {
case 1275068935:
f =  Clazz.newFloatArray (4, 0);
m4.getRow (n, f);
return mp.addXAF (f);
case 1275068934:
default:
f =  Clazz.newFloatArray (4, 0);
m4.getColumn (n, f);
return mp.addXAF (f);
}
case 7:
var l1 = x1.getList ();
var l2 =  new JU.Lst ();
for (var i = 0, len = l1.size (); i < len; i++) {
var l3 = l1.get (i).getList ();
if (l3 == null) return mp.addXStr ("");
l2.addLast (n < l3.size () ? l3.get (n) : JS.SV.newS (""));
}
return mp.addXList (l2);
}
return false;
}, "JS.ScriptMathProcessor,~A,~N");
Clazz.defineMethod (c$, "evaluateIn", 
 function (mp, args) {
var x1 = mp.getX ();
switch (args.length) {
case 1:
var lst = args[0].getList ();
if (lst != null) for (var i = 0, n = lst.size (); i < n; i++) if (JS.SV.areEqual (x1, lst.get (i))) return mp.addXInt (i + 1);

break;
default:
for (var i = 0; i < args.length; i++) if (JS.SV.areEqual (x1, args[i])) return mp.addXInt (i + 1);

break;
}
return mp.addXInt (0);
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateReplace", 
 function (mp, args) {
var isAll = false;
var sFind;
var sReplace;
switch (args.length) {
case 0:
isAll = true;
sFind = sReplace = null;
break;
case 3:
isAll = JS.SV.bValue (args[2]);
case 2:
sFind = JS.SV.sValue (args[0]);
sReplace = JS.SV.sValue (args[1]);
break;
default:
return false;
}
var x = mp.getX ();
if (x.tok == 7) {
var list = JS.SV.strListValue (x);
var l =  new Array (list.length);
for (var i = list.length; --i >= 0; ) l[i] = (sFind == null ? JU.PT.clean (list[i]) : isAll ? JU.PT.replaceAllCharacters (list[i], sFind, sReplace) : JU.PT.rep (list[i], sFind, sReplace));

return mp.addXAS (l);
}var s = JS.SV.sValue (x);
return mp.addXStr (sFind == null ? JU.PT.clean (s) : isAll ? JU.PT.replaceAllCharacters (s, sFind, sReplace) : JU.PT.rep (s, sFind, sReplace));
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateScript", 
 function (mp, args, tok) {
if ((tok == 134222350 || tok == 134238732) && args.length != 1 || args.length == 0) return false;
var s = JS.SV.sValue (args[0]);
var sb =  new JU.SB ();
switch (tok) {
case 134218759:
return (args.length == 2 ? s.equalsIgnoreCase ("JSON") && mp.addXObj (this.vwr.parseJSONMap (JS.SV.sValue (args[1]))) : mp.addXObj (this.vwr.evaluateExpressionAsVariable (s)));
case 134222850:
var appID = (args.length == 2 ? JS.SV.sValue (args[1]) : ".");
if (!appID.equals (".")) sb.append (this.vwr.jsEval (appID + "\1" + s));
if (appID.equals (".") || appID.equals ("*")) this.e.runScriptBuffer (s, sb, true);
break;
case 134222350:
this.e.runScriptBuffer ("show " + s, sb, true);
break;
case 134238732:
return mp.addX (this.vwr.jsEvalSV (s));
}
s = sb.toString ();
var f;
return (Float.isNaN (f = JU.PT.parseFloatStrict (s)) ? mp.addXStr (s) : s.indexOf (".") >= 0 ? mp.addXFloat (f) : mp.addXInt (JU.PT.parseInt (s)));
}, "JS.ScriptMathProcessor,~A,~N");
Clazz.defineMethod (c$, "evaluateSort", 
 function (mp, args, tok) {
if (args.length > 1) return false;
if (tok == 1275068444) {
if (args.length == 1 && args[0].tok == 4) {
return mp.addX (mp.getX ().sortMapArray (args[0].asString ()));
}var n = (args.length == 0 ? 0 : args[0].asInt ());
return mp.addX (mp.getX ().sortOrReverse (n));
}var x = mp.getX ();
var match = (args.length == 0 ? null : args[0]);
if (x.tok == 4) {
var n = 0;
var s = JS.SV.sValue (x);
if (match == null) return mp.addXInt (0);
var m = JS.SV.sValue (match);
for (var i = 0; i < s.length; i++) {
var pt = s.indexOf (m, i);
if (pt < 0) break;
n++;
i = pt;
}
return mp.addXInt (n);
}var counts =  new JU.Lst ();
var last = null;
var count = null;
var xList = JS.SV.getVariable (x.value).sortOrReverse (0).getList ();
if (xList == null) return (match == null ? mp.addXStr ("") : mp.addXInt (0));
for (var i = 0, nLast = xList.size (); i <= nLast; i++) {
var a = (i == nLast ? null : xList.get (i));
if (match != null && a != null && !JS.SV.areEqual (a, match)) continue;
if (JS.SV.areEqual (a, last)) {
count.intValue++;
continue;
} else if (last != null) {
var y =  new JU.Lst ();
y.addLast (last);
y.addLast (count);
counts.addLast (JS.SV.getVariableList (y));
}count = JS.SV.newI (1);
last = a;
}
if (match == null) return mp.addX (JS.SV.getVariableList (counts));
if (counts.isEmpty ()) return mp.addXInt (0);
return mp.addX (counts.get (0).getList ().get (1));
}, "JS.ScriptMathProcessor,~A,~N");
Clazz.defineMethod (c$, "evaluateString", 
 function (mp, tok, args) {
var x = mp.getX ();
var sArg = (args.length > 0 ? JS.SV.sValue (args[0]) : tok == 1275068932 ? "" : "\n");
switch (args.length) {
case 0:
break;
case 1:
if (args[0].tok == 1073742335) {
return mp.addX (JS.SV.getVariable (JU.PT.getTokens (x.asString ())));
}break;
case 2:
if (x.tok == 7) break;
if (tok == 1275069447) {
x = JS.SV.getVariable (JU.PT.split (JU.PT.rep (x.value, "\n\r", "\n").$replace ('\r', '\n'), "\n"));
break;
}default:
return false;
}
if (x.tok == 7 && tok != 1275068932 && (tok != 1275069447 || args.length == 2)) {
mp.addX (x);
return this.evaluateList (mp, tok, args);
}var s = (tok == 1275069447 && x.tok == 10 || tok == 1275068932 && x.tok == 7 ? null : JS.SV.sValue (x));
switch (tok) {
case 1275069447:
if (x.tok == 10) {
var bsSelected = x.value;
var modelCount = this.vwr.ms.mc;
var lst =  new JU.Lst ();
for (var i = 0; i < modelCount; i++) {
var bs = this.vwr.getModelUndeletedAtomsBitSet (i);
bs.and (bsSelected);
lst.addLast (JS.SV.getVariable (bs));
}
return mp.addXList (lst);
}return mp.addXAS (JU.PT.split (s, sArg));
case 1275069446:
if (s.length > 0 && s.charAt (s.length - 1) == '\n') s = s.substring (0, s.length - 1);
return mp.addXStr (JU.PT.rep (s, "\n", sArg));
case 1275068932:
if (s != null) return mp.addXStr (JU.PT.trim (s, sArg));
var list = JS.SV.strListValue (x);
for (var i = list.length; --i >= 0; ) list[i] = JU.PT.trim (list[i], sArg);

return mp.addXAS (list);
}
return mp.addXStr ("");
}, "JS.ScriptMathProcessor,~N,~A");
Clazz.defineMethod (c$, "evaluateSubstructure", 
 function (mp, args, tok, isSelector) {
if (args.length == 0 || isSelector && args.length > 1) return false;
var bs =  new JU.BS ();
var pattern = JS.SV.sValue (args[0]);
if (pattern.length > 0) try {
var bsSelected = (isSelector ? mp.getX ().value : args.length == 2 && args[1].tok == 10 ? args[1].value : null);
bs = this.vwr.getSmilesMatcher ().getSubstructureSet (pattern, this.vwr.ms.at, this.vwr.ms.ac, bsSelected, (tok == 134218757 ? 1 : 2));
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.e.evalError (ex.getMessage (), null);
} else {
throw ex;
}
}
return mp.addXBs (bs);
}, "JS.ScriptMathProcessor,~A,~N,~B");
Clazz.defineMethod (c$, "evaluateSymop", 
 function (mp, args, haveBitSet) {
var x1 = (haveBitSet ? mp.getX () : null);
if (x1 != null && x1.tok != 10) return false;
var bsAtoms = (x1 == null ? null : x1.value);
if (bsAtoms == null && this.vwr.ms.mc == 1) bsAtoms = this.vwr.getModelUndeletedAtomsBitSet (0);
var narg = args.length;
if (narg == 0) {
if (bsAtoms.isEmpty ()) return false;
var ops = JU.PT.split (JU.PT.trim (this.vwr.getSymTemp ().getSpaceGroupInfo (this.vwr.ms, null, this.vwr.ms.at[bsAtoms.nextSetBit (0)].mi, false, null).get ("symmetryInfo"), "\n"), "\n");
var lst =  new JU.Lst ();
for (var i = 0, n = ops.length; i < n; i++) lst.addLast (JU.PT.split (ops[i], "\t"));

return mp.addXList (lst);
}var xyz = null;
var iOp = -2147483648;
var apt = 0;
switch (args[0].tok) {
case 4:
xyz = JS.SV.sValue (args[0]);
apt++;
break;
case 12:
xyz = args[0].escape ();
apt++;
break;
case 2:
iOp = args[0].asInt ();
apt++;
break;
}
if (bsAtoms == null) {
if (apt < narg && args[apt].tok == 10) (bsAtoms =  new JU.BS ()).or (args[apt].value);
if (apt + 1 < narg && args[apt + 1].tok == 10) (bsAtoms == null ? (bsAtoms =  new JU.BS ()) : bsAtoms).or (args[apt + 1].value);
}var pt1 = null;
var pt2 = null;
if ((pt1 = (narg > apt ? mp.ptValue (args[apt], bsAtoms) : null)) != null) apt++;
if ((pt2 = (narg > apt ? mp.ptValue (args[apt], bsAtoms) : null)) != null) apt++;
var nth = (pt2 != null && args.length > apt && iOp == -2147483648 && args[apt].tok == 2 ? args[apt].intValue : -1);
if (nth >= 0) apt++;
if (iOp == -2147483648) iOp = 0;
var desc = (narg == apt ? (pt2 != null ? "all" : pt1 != null ? "point" : "matrix") : JS.SV.sValue (args[apt++]).toLowerCase ());
return (bsAtoms != null && !bsAtoms.isEmpty () && apt == args.length && mp.addXObj (this.vwr.getSymmetryInfo (bsAtoms.nextSetBit (0), xyz, iOp, pt1, pt2, 0, desc, 0, nth, 0)));
}, "JS.ScriptMathProcessor,~A,~B");
Clazz.defineMethod (c$, "evaluateTensor", 
 function (mp, args) {
var isTensor = (args.length == 2 && args[1].tok == 1275068445);
var x = (isTensor ? null : mp.getX ());
if (args.length > 2 || !isTensor && x.tok != 10) return false;
var bs = x.value;
var tensorType = (isTensor || args.length == 0 ? null : JS.SV.sValue (args[0]).toLowerCase ());
var calc = this.vwr.getNMRCalculation ();
if ("unique".equals (tensorType)) return mp.addXBs (calc.getUniqueTensorSet (bs));
var infoType = (args.length < 2 ? null : JS.SV.sValue (args[1]).toLowerCase ());
if (isTensor) {
return mp.addXObj ((args[0].value).getInfo (infoType));
}return mp.addXList (calc.getTensorInfo (tensorType, infoType, bs));
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateUserFunction", 
 function (mp, name, args, tok, isSelector) {
var x1 = null;
if (isSelector) {
x1 = mp.getX ();
switch (x1.tok) {
case 10:
break;
case 6:
if (args.length > 0) return false;
x1 = x1.getMap ().get (name);
return (x1 == null ? mp.addXStr ("") : mp.addX (x1));
default:
return false;
}
}name = name.toLowerCase ();
mp.wasX = false;
var params =  new JU.Lst ();
for (var i = 0; i < args.length; i++) {
params.addLast (args[i]);
}
if (isSelector) {
return mp.addXObj (this.e.getBitsetProperty (x1.value, null, tok, null, null, x1.value,  Clazz.newArray (-1, [name, params]), false, x1.index, false));
}var $var = this.e.getUserFunctionResult (name, params, null);
return ($var == null ? false : mp.addX ($var));
}, "JS.ScriptMathProcessor,~S,~A,~N,~B");
Clazz.defineMethod (c$, "evaluateWithin", 
 function (mp, args) {
if (args.length < 1 || args.length > 5) return false;
var len = args.length;
if (len == 1 && args[0].tok == 10) return mp.addX (args[0]);
var distance = 0;
var withinSpec = args[0].value;
var withinStr = "" + withinSpec;
var tok = args[0].tok;
if (tok == 4) tok = JS.T.getTokFromName (withinStr);
var ms = this.vwr.ms;
var isVdw = false;
var isWithinModelSet = false;
var isWithinGroup = false;
var isDistance = false;
var rd = null;
switch (tok) {
case 1648363544:
isVdw = true;
withinSpec = null;
case 3:
case 2:
isDistance = true;
if (len < 2 || len == 3 && args[1].tok == 7 && args[2].tok != 7) return false;
distance = (isVdw ? 100 : JS.SV.fValue (args[0]));
switch (tok = args[1].tok) {
case 1073742335:
case 1073742334:
isWithinModelSet = args[1].asBoolean ();
if (len > 2 && JS.SV.sValue (args[2]).equalsIgnoreCase ("unitcell")) tok = 1814695966;
len = 0;
break;
case 4:
var s = JS.SV.sValue (args[1]);
if (s.startsWith ("$")) return mp.addXBs (this.getAtomsNearSurface (distance, s.substring (1)));
if (s.equalsIgnoreCase ("group")) {
isWithinGroup = true;
tok = 1086324742;
} else if (s.equalsIgnoreCase ("vanderwaals") || s.equalsIgnoreCase ("vdw")) {
withinSpec = null;
isVdw = true;
tok = 1648363544;
} else if (s.equalsIgnoreCase ("unitcell")) {
tok = 1814695966;
} else {
return false;
}break;
}
break;
case 7:
if (len == 1) {
withinSpec = args[0].asString ();
tok = 0;
}break;
case 1073742328:
return (len == 3 && Clazz.instanceOf (args[1].value, JU.BS) && Clazz.instanceOf (args[2].value, JU.BS) && mp.addXBs (this.vwr.getBranchBitSet ((args[2].value).nextSetBit (0), (args[1].value).nextSetBit (0), true)));
case 134218757:
case 1237320707:
case 134218756:
var bsSelected = null;
var isOK = true;
switch (len) {
case 2:
break;
case 3:
isOK = (args[2].tok == 10);
if (isOK) bsSelected = args[2].value;
break;
default:
isOK = false;
}
if (!isOK) this.e.invArg ();
return mp.addXObj (this.e.getSmilesExt ().getSmilesMatches (JS.SV.sValue (args[1]), null, bsSelected, null, tok == 134218756 ? 2 : 1, mp.asBitSet, false));
}
if (Clazz.instanceOf (withinSpec, String)) {
if (tok == 0) {
tok = 1073742362;
if (len > 2) return false;
len = 2;
}} else if (!isDistance) {
return false;
}switch (len) {
case 1:
switch (tok) {
case 136314895:
case 2097184:
case 1678381065:
return mp.addXBs (ms.getAtoms (tok, null));
case 1073741863:
return mp.addXBs (ms.getAtoms (tok, ""));
case 1073742362:
return mp.addXBs (ms.getAtoms (1086324744, withinStr));
}
return false;
case 2:
switch (tok) {
case 1073742362:
tok = 1086324744;
break;
case 1073741824:
case 1086326786:
case 1086326785:
case 1073741863:
case 1086324744:
case 1111490587:
case 1073742128:
case 1073741925:
case 1073742189:
return mp.addXBs (this.vwr.ms.getAtoms (tok, JS.SV.sValue (args[args.length - 1])));
}
break;
case 3:
switch (tok) {
case 1073742335:
case 1073742334:
case 1086324742:
case 1648363544:
case 1814695966:
case 134217750:
case 134219265:
case 1073742329:
case 8:
case 7:
break;
case 1086324744:
withinStr = JS.SV.sValue (args[2]);
break;
default:
return false;
}
break;
}
var plane = null;
var pt = null;
var pts1 = null;
var last = args.length - 1;
switch (args[last].tok) {
case 9:
plane = args[last].value;
break;
case 8:
pt = args[last].value;
if (JS.SV.sValue (args[1]).equalsIgnoreCase ("hkl")) plane = this.e.getHklPlane (pt);
break;
case 7:
pts1 = (last == 2 && args[1].tok == 7 ? args[1].getList () : null);
pt = (last == 2 ? JS.SV.ptValue (args[1]) : last == 1 ? JU.P3.new3 (NaN, 0, 0) : null);
break;
}
if (plane != null) return mp.addXBs (ms.getAtomsNearPlane (distance, plane));
var bs = (args[last].tok == 10 ? args[last].value : null);
if (last > 0 && pt == null && pts1 == null && bs == null) return false;
if (tok == 1814695966) {
var asMap = isWithinModelSet;
return ((bs != null || pt != null) && mp.addXObj (this.vwr.ms.getUnitCellPointsWithin (distance, bs, pt, asMap)));
}if (pt != null || pts1 != null) {
if (args[last].tok == 7) {
var sv = args[last].getList ();
var ap3 =  new Array (sv.size ());
for (var i = ap3.length; --i >= 0; ) ap3[i] = JS.SV.ptValue (sv.get (i));

var ap31 = null;
if (pts1 != null) {
ap31 =  new Array (pts1.size ());
for (var i = ap31.length; --i >= 0; ) ap31[i] = JS.SV.ptValue (pts1.get (i));

}var ret =  new Array (1);
switch (J.bspt.PointIterator.withinDistPoints (distance, pt, ap3, ap31, ret)) {
case 134217751:
return mp.addXPt (ret[0]);
case 1073742001:
return mp.addXList (ret[0]);
case 1275068418:
return mp.addXAI (ret[0]);
case 4:
return mp.addXStr (ret[0]);
default:
return false;
}
}return mp.addXBs (this.vwr.getAtomsNearPt (distance, pt));
}if (tok == 1086324744) return mp.addXBs (this.vwr.ms.getSequenceBits (withinStr, bs,  new JU.BS ()));
if (bs == null) bs =  new JU.BS ();
if (!isDistance) return mp.addXBs (this.vwr.ms.getAtoms (tok, bs));
if (isWithinGroup) return mp.addXBs (this.vwr.getGroupsWithin (Clazz.floatToInt (distance), bs));
if (isVdw) {
rd =  new J.atomdata.RadiusData (null, (distance > 10 ? distance / 100 : distance), (distance > 10 ? J.atomdata.RadiusData.EnumType.FACTOR : J.atomdata.RadiusData.EnumType.OFFSET), J.c.VDW.AUTO);
if (distance < 0) distance = 0;
}return mp.addXBs (this.vwr.ms.getAtomsWithinRadius (distance, bs, isWithinModelSet, rd));
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "evaluateWrite", 
 function (mp, args) {
switch (args.length) {
case 0:
return false;
case 1:
var type = args[0].asString ().toUpperCase ();
if (type.equals ("PNGJ")) {
return mp.addXMap (this.vwr.fm.getFileAsMap (null, "PNGJ"));
}if (JU.PT.isOneOf (type, ";ZIP;ZIPALL;JMOL;")) {
var params =  new java.util.Hashtable ();
var oc =  new JU.OC ();
params.put ("outputChannel", oc);
this.vwr.createZip (null, type, params);
var bis = JU.Rdr.getBIS (oc.toByteArray ());
params =  new java.util.Hashtable ();
this.vwr.getJzt ().readFileAsMap (bis, params, null);
return mp.addXMap (params);
}break;
}
return mp.addXStr (this.e.getCmdExt ().dispatch (134221856, true, args));
}, "JS.ScriptMathProcessor,~A");
Clazz.defineMethod (c$, "getAtomsNearSurface", 
 function (distance, surfaceId) {
var data =  Clazz.newArray (-1, [surfaceId, null, null]);
if (this.e.getShapePropertyData (24, "getVertices", data)) return this.getAtomsNearPts (distance, data[1], data[2]);
data[1] = Integer.$valueOf (0);
data[2] = Integer.$valueOf (-1);
if (this.e.getShapePropertyData (22, "getCenter", data)) return this.vwr.getAtomsNearPt (distance, data[2]);
data[1] = Float.$valueOf (distance);
if (this.e.getShapePropertyData (21, "getAtomsWithin", data)) return data[2];
return  new JU.BS ();
}, "~N,~S");
Clazz.defineMethod (c$, "getAtomsNearPts", 
 function (distance, points, bsInclude) {
var bsResult =  new JU.BS ();
if (points.length == 0 || bsInclude != null && bsInclude.isEmpty ()) return bsResult;
if (bsInclude == null) bsInclude = JU.BSUtil.setAll (points.length);
var at = this.vwr.ms.at;
for (var i = this.vwr.ms.ac; --i >= 0; ) {
var atom = at[i];
for (var j = bsInclude.nextSetBit (0); j >= 0; j = bsInclude.nextSetBit (j + 1)) if (atom.distance (points[j]) < distance) {
bsResult.set (i);
break;
}
}
return bsResult;
}, "~N,~A,JU.BS");
Clazz.defineMethod (c$, "getMinMax", 
function (floatOrSVArray, tok) {
var data = null;
var sv = null;
var ndata = 0;
var htPivot = null;
while (true) {
if (JU.AU.isAF (floatOrSVArray)) {
if (tok == 1275068437) return "NaN";
data = floatOrSVArray;
ndata = data.length;
if (ndata == 0) break;
} else if (Clazz.instanceOf (floatOrSVArray, JU.Lst)) {
sv = floatOrSVArray;
ndata = sv.size ();
if (ndata == 0) {
if (tok != 1275068437) break;
} else {
var sv0 = sv.get (0);
if (sv0.tok == 8) return this.getMinMaxPoint (sv, tok);
if (sv0.tok == 4 && (sv0.value).startsWith ("{")) {
var pt = JS.SV.ptValue (sv0);
if (Clazz.instanceOf (pt, JU.P3)) return this.getMinMaxPoint (sv, tok);
if (Clazz.instanceOf (pt, JU.P4)) return this.getMinMaxQuaternion (sv, tok);
break;
}}} else {
break;
}var sum;
var minMax;
var isMin = false;
switch (tok) {
case 1275068437:
htPivot =  new java.util.Hashtable ();
sum = minMax = 0;
break;
case 32:
isMin = true;
sum = 3.4028235E38;
minMax = 2147483647;
break;
case 64:
sum = -3.4028235E38;
minMax = -2147483647;
break;
default:
sum = minMax = 0;
}
var sum2 = 0;
var n = 0;
var isInt = true;
var isPivot = (tok == 1275068437);
for (var i = ndata; --i >= 0; ) {
var svi = (sv == null ? JS.SV.vF : sv.get (i));
var v = (isPivot ? 1 : data == null ? JS.SV.fValue (svi) : data[i]);
if (Float.isNaN (v)) continue;
n++;
switch (tok) {
case 160:
case 192:
sum2 += (v) * v;
case 128:
case 96:
sum += v;
break;
case 1275068437:
isInt = new Boolean (isInt & (svi.tok == 2)).valueOf ();
var key = svi.asString ();
var ii = htPivot.get (key);
htPivot.put (key, (ii == null ?  new Integer (1) :  new Integer (ii.intValue () + 1)));
break;
case 32:
case 64:
isInt = new Boolean (isInt & (svi.tok == 2)).valueOf ();
if (isMin == (v < sum)) {
sum = v;
if (isInt) minMax = svi.intValue;
}break;
}
}
if (tok == 1275068437) {
return htPivot;
}if (n == 0) break;
switch (tok) {
case 96:
sum /= n;
break;
case 192:
if (n == 1) break;
sum = Math.sqrt ((sum2 - sum * sum / n) / (n - 1));
break;
case 32:
case 64:
if (isInt) return Integer.$valueOf (minMax);
break;
case 128:
break;
case 160:
sum = sum2;
break;
}
return Float.$valueOf (sum);
}
return "NaN";
}, "~O,~N");
Clazz.defineMethod (c$, "getMinMaxPoint", 
 function (pointOrSVArray, tok) {
var data = null;
var sv = null;
var ndata = 0;
if (Clazz.instanceOf (pointOrSVArray, Array)) {
data = pointOrSVArray;
ndata = data.length;
} else if (Clazz.instanceOf (pointOrSVArray, JU.Lst)) {
sv = pointOrSVArray;
ndata = sv.size ();
}if (sv == null && data == null) return "NaN";
var result =  new JU.P3 ();
var fdata =  Clazz.newFloatArray (ndata, 0);
for (var xyz = 0; xyz < 3; xyz++) {
for (var i = 0; i < ndata; i++) {
var pt = (data == null ? JS.SV.ptValue (sv.get (i)) : data[i]);
if (pt == null) return "NaN";
switch (xyz) {
case 0:
fdata[i] = pt.x;
break;
case 1:
fdata[i] = pt.y;
break;
case 2:
fdata[i] = pt.z;
break;
}
}
var f = this.getMinMax (fdata, tok);
if (!(Clazz.instanceOf (f, Number))) return "NaN";
var value = (f).floatValue ();
switch (xyz) {
case 0:
result.x = value;
break;
case 1:
result.y = value;
break;
case 2:
result.z = value;
break;
}
}
return result;
}, "~O,~N");
Clazz.defineMethod (c$, "getMinMaxQuaternion", 
 function (svData, tok) {
var data;
switch (tok) {
case 32:
case 64:
case 128:
case 160:
return "NaN";
}
while (true) {
data = this.e.getQuaternionArray (svData, 1073742001);
if (data == null) break;
var retStddev =  Clazz.newFloatArray (1, 0);
var result = JU.Quat.sphereMean (data, retStddev, 0.0001);
switch (tok) {
case 96:
return result;
case 192:
return Float.$valueOf (retStddev[0]);
}
break;
}
return "NaN";
}, "JU.Lst,~N");
Clazz.defineMethod (c$, "getPatternMatcher", 
 function () {
return (this.pm == null ? this.pm = J.api.Interface.getUtil ("PatternMatcher", this.e.vwr, "script") : this.pm);
});
Clazz.defineMethod (c$, "opTokenFor", 
 function (tok) {
switch (tok) {
case 1275069441:
case 1275069446:
return JS.T.tokenPlus;
case 1275068931:
return JS.T.tokenMinus;
case 1275068929:
return JS.T.tokenTimes;
case 1275068930:
return JS.T.tokenMul3;
case 1275068928:
return JS.T.tokenDivide;
}
return null;
}, "~N");
Clazz.defineMethod (c$, "setContactBitSets", 
function (bsA, bsB, localOnly, distance, rd, warnMultiModel) {
var withinAllModels;
var bs;
if (bsB == null) {
bsB = JU.BSUtil.setAll (this.vwr.ms.ac);
JU.BSUtil.andNot (bsB, this.vwr.slm.bsDeleted);
bsB.andNot (bsA);
withinAllModels = false;
} else {
bs = JU.BSUtil.copy (bsA);
bs.or (bsB);
var nModels = this.vwr.ms.getModelBS (bs, false).cardinality ();
withinAllModels = (nModels > 1);
if (warnMultiModel && nModels > 1 && !this.e.tQuiet) this.e.showString (J.i18n.GT.$ ("Note: More than one model is involved in this contact!"));
}if (!bsA.equals (bsB)) {
var setBfirst = (!localOnly || bsA.cardinality () < bsB.cardinality ());
if (setBfirst) {
bs = this.vwr.ms.getAtomsWithinRadius (distance, bsA, withinAllModels, (Float.isNaN (distance) ? rd : null));
bsB.and (bs);
}if (localOnly) {
bs = this.vwr.ms.getAtomsWithinRadius (distance, bsB, withinAllModels, (Float.isNaN (distance) ? rd : null));
bsA.and (bs);
if (!setBfirst) {
bs = this.vwr.ms.getAtomsWithinRadius (distance, bsA, withinAllModels, (Float.isNaN (distance) ? rd : null));
bsB.and (bs);
}bs = JU.BSUtil.copy (bsB);
bs.and (bsA);
if (bs.equals (bsA)) bsB.andNot (bsA);
 else if (bs.equals (bsB)) bsA.andNot (bsB);
}}return bsB;
}, "JU.BS,JU.BS,~B,~N,J.atomdata.RadiusData,~B");
});
