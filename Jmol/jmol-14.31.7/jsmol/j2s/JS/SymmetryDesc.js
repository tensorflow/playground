Clazz.declarePackage ("JS");
Clazz.load (null, "JS.SymmetryDesc", ["java.lang.Float", "java.util.Hashtable", "JU.BS", "$.Lst", "$.M4", "$.Measure", "$.P3", "$.P4", "$.PT", "$.Quat", "$.SB", "$.V3", "JM.Atom", "JS.T", "JS.SpaceGroup", "$.Symmetry", "$.SymmetryOperation", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelSet = null;
Clazz.instantialize (this, arguments);
}, JS, "SymmetryDesc");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (modelSet) {
this.modelSet = modelSet;
return this;
}, "JM.ModelSet");
Clazz.defineMethod (c$, "getSymopInfo", 
function (iAtom, xyz, op, pt, pt2, id, type, scaleFactor, nth, options) {
if (type == 0) type = JS.SymmetryDesc.getType (id);
var ret = (type == 1140850689 ?  new JU.BS () : "");
if (iAtom < 0) return ret;
var iModel = this.modelSet.at[iAtom].mi;
var uc = this.modelSet.am[iModel].biosymmetry;
if (uc == null && (uc = this.modelSet.getUnitCell (iModel)) == null) return ret;
if (type != 135176 || op != 2147483647) {
return this.getSymmetryInfo (uc, iModel, iAtom, uc, xyz, op, pt, pt2, id, type, scaleFactor, nth, options);
}var s = "";
var ops = uc.getSymmetryOperations ();
if (ops != null) {
if (id == null) id = "sg";
var n = ops.length;
for (op = 0; op < n; op++) s += this.getSymmetryInfo (uc, iModel, iAtom, uc, xyz, op, pt, pt2, id + op, 135176, scaleFactor, nth, options);

}return s;
}, "~N,~S,~N,JU.P3,JU.P3,~S,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getSpaceGroupInfo", 
function (sym, modelIndex, sgName, symOp, pt1, pt2, drawID, scaleFactor, nth, isFull, isForModel, options, cellInfo) {
var info = null;
var isStandard = (pt1 == null && drawID == null && nth <= 0);
var isBio = false;
var sgNote = null;
var haveName = (sgName != null && sgName.length > 0);
var haveRawName = (haveName && sgName.indexOf ("[--]") >= 0);
if (isForModel || !haveName) {
var saveModelInfo = (isStandard && symOp == 0);
if (modelIndex < 0) modelIndex = (Clazz.instanceOf (pt1, JM.Atom) ? (pt1).mi : this.modelSet.vwr.am.cmi);
if (modelIndex < 0) sgNote = "no single current model";
 else if (cellInfo == null && !(isBio = (cellInfo = this.modelSet.am[modelIndex].biosymmetry) != null) && (cellInfo = this.modelSet.getUnitCell (modelIndex)) == null) sgNote = "not applicable";
if (sgNote != null) {
info =  new java.util.Hashtable ();
info.put ("spaceGroupInfo", "");
info.put ("spaceGroupNote", sgNote);
info.put ("symmetryInfo", "");
} else if (isStandard) {
info = this.modelSet.getInfo (modelIndex, "spaceGroupInfo");
}if (info != null) return info;
info =  new java.util.Hashtable ();
sgName = cellInfo.getSpaceGroupName ();
var ops = cellInfo.getSymmetryOperations ();
var sg = (isBio ? (cellInfo).spaceGroup : null);
var slist = (haveRawName ? "" : null);
var opCount = 0;
if (ops != null) {
if (isBio) sym.spaceGroup = JS.SpaceGroup.getNull (false, false, false);
 else sym.setSpaceGroup (false);
if (ops[0].timeReversal != 0) (sym.getSpaceGroupOperation (0)).timeReversal = 1;
var infolist =  new Array (ops.length);
var sops = "";
for (var i = 0, nop = 0; i < ops.length && nop != nth; i++) {
var op = ops[i];
var isNewIncomm = (i == 0 && op.xyz.indexOf ("x4") >= 0);
var iop = (!isNewIncomm && sym.getSpaceGroupOperation (i) != null ? i : isBio ? sym.addBioMoleculeOperation (sg.finalOperations[i], false) : sym.addSpaceGroupOperation ("=" + op.xyz, i + 1));
if (iop < 0) continue;
op = sym.getSpaceGroupOperation (i);
if (op == null) continue;
if (op.timeReversal != 0 || op.modDim > 0) isStandard = false;
if (slist != null) slist += ";" + op.xyz;
var ret = (symOp > 0 && symOp - 1 != iop ? null : this.createInfoArray (op, cellInfo, pt1, pt2, drawID, scaleFactor, options));
if (ret != null) {
if (nth > 0 && ++nop != nth) continue;
infolist[i] = ret;
sops += "\n" + (i + 1) + "\t" + ret[0] + "\t" + ret[2];
opCount++;
}}
info.put ("operations", infolist);
info.put ("symmetryInfo", (sops.length == 0 ? "" : sops.substring (1)));
}sgNote = (opCount == 0 ? "\n no symmetry operations" : nth <= 0 && symOp <= 0 ? "\n" + opCount + " symmetry operation" + (opCount == 1 ? ":\n" : "s:\n") : "");
if (slist != null) sgName = slist.substring (slist.indexOf (";") + 1);
if (saveModelInfo) this.modelSet.setInfo (modelIndex, "spaceGroupInfo", info);
} else {
info =  new java.util.Hashtable ();
}info.put ("spaceGroupName", sgName);
info.put ("spaceGroupNote", sgNote == null ? "" : sgNote);
var data;
if (isBio) {
data = sgName;
} else {
if (haveName && !haveRawName) sym.setSpaceGroupName (sgName);
data = sym.getSpaceGroupInfoObj (sgName, cellInfo, isFull);
if (data == null || data.equals ("?")) {
data = "?";
info.put ("spaceGroupNote", "could not identify space group from name: " + sgName + "\nformat: show spacegroup \"2\" or \"P 2c\" " + "or \"C m m m\" or \"x, y, z;-x ,-y, -z\"");
}}info.put ("spaceGroupInfo", data);
return info;
}, "JS.Symmetry,~N,~S,~N,JU.P3,JU.P3,~S,~N,~N,~B,~B,~N,J.api.SymmetryInterface");
c$.getType = Clazz.defineMethod (c$, "getType", 
 function (id) {
var type;
if (id == null) return 1073742001;
if (id.equalsIgnoreCase ("matrix")) return 12;
if (id.equalsIgnoreCase ("description")) return 1825200146;
if (id.equalsIgnoreCase ("axispoint")) return 134217751;
if (id.equalsIgnoreCase ("time")) return 268435633;
if (id.equalsIgnoreCase ("info")) return 1275068418;
type = JS.T.getTokFromName (id);
if (type != 0) return type;
for (type = 0; type < JS.SymmetryDesc.keys.length; type++) if (id.equalsIgnoreCase (JS.SymmetryDesc.keys[type])) return -1 - type;

return 1073741961;
}, "~S");
c$.nullReturn = Clazz.defineMethod (c$, "nullReturn", 
 function (type) {
switch (type) {
case 135176:
return "draw ID sym_* delete";
case 1073741961:
case 1825200146:
case 1145047050:
case 1073742078:
return "";
case 1140850689:
return  new JU.BS ();
default:
return null;
}
}, "~N");
c$.getInfo = Clazz.defineMethod (c$, "getInfo", 
 function (info, type) {
if (type < 0 && type >= -JS.SymmetryDesc.keys.length) return info[-1 - type];
switch (type) {
case 1073742327:
case 1073741982:
return info;
case 1275068418:
var lst =  new java.util.Hashtable ();
for (var j = 0, n = info.length; j < n; j++) {
var key = (j == 3 ? "draw" : j == 7 ? "axispoint" : JS.SymmetryDesc.keys[j]);
if (info[j] != null) lst.put (key, info[j]);
}
return lst;
case 1073741961:
return info[0] + "  \t" + info[2];
case 1145047050:
return info[0];
case 1073742078:
return info[1];
default:
case 1825200146:
return info[2];
case 135176:
return info[3] + "\nprint " + JU.PT.esc (info[0] + " " + info[2]);
case 1145047051:
return info[4];
case 1073742178:
return info[5];
case 12289:
return info[6];
case 134217751:
return info[7];
case 1073741854:
return info[8];
case 134217729:
return info[9];
case 12:
return info[10];
case 1814695966:
return info[11];
case 4160:
return info[12];
case 268435633:
return info[13];
case 134217750:
return info[14];
case 1140850696:
return info[15];
case 1073741974:
return info[16];
}
}, "~A,~N");
Clazz.defineMethod (c$, "createInfoArray", 
 function (op, uc, pta00, ptTarget, id, scaleFactor, options) {
if (!op.isFinalized) op.doFinalize ();
var isTimeReversed = (op.timeReversal == -1);
if (scaleFactor == 0) scaleFactor = 1;
var vtemp =  new JU.V3 ();
var ptemp =  new JU.P3 ();
var ptemp2 =  new JU.P3 ();
var pta01 =  new JU.P3 ();
var pta02 =  new JU.P3 ();
var ftrans =  new JU.V3 ();
var vtrans =  new JU.V3 ();
var plane = null;
if (pta00 == null || Float.isNaN (pta00.x)) pta00 =  new JU.P3 ();
if (ptTarget != null) {
JS.SymmetryDesc.setFractional (uc, pta00, pta01, ptemp);
op.rotTrans (pta01);
uc.toCartesian (pta01, false);
uc.toUnitCell (pta01, ptemp);
pta02.setT (ptTarget);
uc.toUnitCell (pta02, ptemp);
if (pta01.distance (pta02) > 0.1) return null;
JS.SymmetryDesc.setFractional (uc, pta00, pta01, null);
op.rotTrans (pta01);
JS.SymmetryDesc.setFractional (uc, ptTarget, pta02, null);
vtrans.sub2 (pta02, pta01);
}pta01.set (1, 0, 0);
pta02.set (0, 1, 0);
var pta03 = JU.P3.new3 (0, 0, 1);
pta01.add (pta00);
pta02.add (pta00);
pta03.add (pta00);
var pt0 = JS.SymmetryDesc.rotTransCart (op, uc, pta00, vtrans);
var pt1 = JS.SymmetryDesc.rotTransCart (op, uc, pta01, vtrans);
var pt2 = JS.SymmetryDesc.rotTransCart (op, uc, pta02, vtrans);
var pt3 = JS.SymmetryDesc.rotTransCart (op, uc, pta03, vtrans);
var vt1 = JU.V3.newVsub (pt1, pt0);
var vt2 = JU.V3.newVsub (pt2, pt0);
var vt3 = JU.V3.newVsub (pt3, pt0);
JS.SymmetryDesc.approx (vtrans);
vtemp.cross (vt1, vt2);
var haveInversion = (vtemp.dot (vt3) < 0);
if (haveInversion) {
pt1.sub2 (pt0, vt1);
pt2.sub2 (pt0, vt2);
pt3.sub2 (pt0, vt3);
}var info = JU.Measure.computeHelicalAxis (pta00, pt0, JU.Quat.getQuaternionFrame (pt0, pt1, pt2).div (JU.Quat.getQuaternionFrame (pta00, pta01, pta02)));
var pa1 = info[0];
var ax1 = info[1];
var ang1 = Clazz.floatToInt (Math.abs (JU.PT.approx ((info[3]).x, 1)));
var pitch1 = JS.SymmetryOperation.approxF ((info[3]).y);
if (haveInversion) {
pt1.add2 (pt0, vt1);
pt2.add2 (pt0, vt2);
pt3.add2 (pt0, vt3);
}var trans = JU.V3.newVsub (pt0, pta00);
if (trans.length () < 0.1) trans = null;
var ptinv = null;
var ipt = null;
var ptref = null;
var isTranslation = (ang1 == 0);
var isRotation = !isTranslation;
var isInversionOnly = false;
var isMirrorPlane = false;
if (isRotation || haveInversion) {
trans = null;
}if (haveInversion && isTranslation) {
ipt = JU.P3.newP (pta00);
ipt.add (pt0);
ipt.scale (0.5);
ptinv = pt0;
isInversionOnly = true;
} else if (haveInversion) {
var d = (pitch1 == 0 ?  new JU.V3 () : ax1);
var f = 0;
switch (ang1) {
case 60:
f = 0.6666667;
break;
case 120:
f = 2;
break;
case 90:
f = 1;
break;
case 180:
ptref = JU.P3.newP (pta00);
ptref.add (d);
pa1.scaleAdd2 (0.5, d, pta00);
if (ptref.distance (pt0) > 0.1) {
trans = JU.V3.newVsub (pt0, ptref);
JS.SymmetryDesc.setFractional (uc, trans, ptemp, null);
ftrans.setT (ptemp);
} else {
trans = null;
}isRotation = false;
haveInversion = false;
isMirrorPlane = true;
break;
default:
haveInversion = false;
break;
}
if (f != 0) {
vtemp.sub2 (pta00, pa1);
vtemp.add (pt0);
vtemp.sub (pa1);
vtemp.sub (d);
vtemp.scale (f);
pa1.add (vtemp);
ipt =  new JU.P3 ();
ipt.scaleAdd2 (0.5, d, pa1);
ptinv =  new JU.P3 ();
ptinv.scaleAdd2 (-2, ipt, pta00);
ptinv.scale (-1);
}} else if (trans != null) {
ptemp.setT (trans);
uc.toFractional (ptemp, false);
ftrans.setT (ptemp);
uc.toCartesian (ptemp, false);
trans.setT (ptemp);
}var ang = ang1;
JS.SymmetryDesc.approx0 (ax1);
if (isRotation) {
var ptr =  new JU.P3 ();
vtemp.setT (ax1);
var ang2 = ang1;
if (haveInversion) {
ptr.add2 (pa1, vtemp);
ang2 = Math.round (JU.Measure.computeTorsion (ptinv, pa1, ptr, pt0, true));
} else if (pitch1 == 0) {
ptr.setT (pa1);
ptemp.scaleAdd2 (1, ptr, vtemp);
ang2 = Math.round (JU.Measure.computeTorsion (pta00, pa1, ptemp, pt0, true));
} else {
ptemp.add2 (pa1, vtemp);
ptr.scaleAdd2 (0.5, vtemp, pa1);
ang2 = Math.round (JU.Measure.computeTorsion (pta00, pa1, ptemp, pt0, true));
}if (ang2 != 0) ang1 = ang2;
if (!haveInversion && pitch1 == 0 && (ax1.z < 0 || ax1.z == 0 && (ax1.y < 0 || ax1.y == 0 && ax1.x < 0))) {
ax1.scale (-1);
ang1 = -ang1;
}}var info1 = "identity";
var type = info1;
if (isInversionOnly) {
ptemp.setT (ipt);
uc.toFractional (ptemp, false);
info1 = "Ci: " + JS.SymmetryDesc.strCoord (ptemp, op.isBio);
type = "inversion center";
} else if (isRotation) {
if (haveInversion) {
type = info1 = (Clazz.doubleToInt (360 / ang)) + "-bar axis";
} else if (pitch1 != 0) {
type = info1 = (Clazz.doubleToInt (360 / ang)) + "-fold screw axis";
ptemp.setT (ax1);
uc.toFractional (ptemp, false);
info1 += "|translation: " + JS.SymmetryDesc.strCoord (ptemp, op.isBio);
} else {
type = info1 = "C" + (Clazz.doubleToInt (360 / ang)) + " axis";
}} else if (trans != null) {
var s = " " + JS.SymmetryDesc.strCoord (ftrans, op.isBio);
if (isTranslation) {
type = info1 = "translation";
info1 += ":" + s;
} else if (isMirrorPlane) {
var fx = Math.abs (JS.SymmetryOperation.approxF (ftrans.x));
var fy = Math.abs (JS.SymmetryOperation.approxF (ftrans.y));
var fz = Math.abs (JS.SymmetryOperation.approxF (ftrans.z));
s = " " + JS.SymmetryDesc.strCoord (ftrans, op.isBio);
if (fx != 0 && fy != 0 && fz != 0) {
if (fx == 0.25 && fy == 0.25 && fz == 0.25) {
info1 = "d-";
} else if (fx == 0.5 && fy == 0.5 && fz == 0.5) {
info1 = "n-";
} else {
info1 = "g-";
}} else if (fx != 0 && fy != 0 || fy != 0 && fz != 0 || fz != 0 && fx != 0) {
if (fx == 0.25 && fy == 0.25 || fx == 0.25 && fz == 0.25 || fy == 0.25 && fz == 0.25) {
info1 = "d-";
} else if (fx == 0.5 && fy == 0.5 || fx == 0.5 && fz == 0.5 || fy == 0.5 && fz == 0.5) {
if (fx == 0 && ax1.x == 0 || fy == 0 && ax1.y == 0 || fz == 0 && ax1.z == 0) {
info1 = "g-";
} else {
info1 = "n-";
}} else {
info1 = "g-";
}} else if (fx != 0) info1 = "a-";
 else if (fy != 0) info1 = "b-";
 else info1 = "c-";
type = info1 = info1 + "glide plane";
info1 += "|translation:" + s;
}} else if (isMirrorPlane) {
type = info1 = "mirror plane";
}if (haveInversion && !isInversionOnly) {
ptemp.setT (ipt);
uc.toFractional (ptemp, false);
info1 += "|inversion center at " + JS.SymmetryDesc.strCoord (ptemp, op.isBio);
}if (isTimeReversed) {
info1 += "|time-reversed";
type += " (time-reversed)";
}var cmds = null;
var xyzNew = (op.isBio ? op.xyzOriginal : JS.SymmetryOperation.getXYZFromMatrix (op, false, false, false));
if (id != null) {
var opType = null;
var drawid = "\ndraw ID " + id + "_";
var draw1 =  new JU.SB ();
draw1.append (drawid).append ("* delete");
JS.SymmetryDesc.drawLine (draw1, drawid + "frame1X", 0.15, pta00, pta01, "red");
JS.SymmetryDesc.drawLine (draw1, drawid + "frame1Y", 0.15, pta00, pta02, "green");
JS.SymmetryDesc.drawLine (draw1, drawid + "frame1Z", 0.15, pta00, pta03, "blue");
var color;
if (isRotation) {
var ptr =  new JU.P3 ();
color = "red";
ang = ang1;
var scale = 1;
vtemp.setT (ax1);
if (haveInversion) {
opType = drawid + "rotinv";
ptr.add2 (pa1, vtemp);
if (pitch1 == 0) {
ptr.setT (ipt);
vtemp.scale (3 * scaleFactor);
ptemp.scaleAdd2 (-1, vtemp, pa1);
JS.SymmetryDesc.drawVector (draw1, drawid, "rotVector2", "", pa1, ptemp, "red");
}scale = pt0.distance (ptr);
draw1.append (drawid).append ("rotLine1 ").append (JU.Escape.eP (ptr)).append (JU.Escape.eP (ptinv)).append (" color red");
draw1.append (drawid).append ("rotLine2 ").append (JU.Escape.eP (ptr)).append (JU.Escape.eP (pt0)).append (" color red");
} else if (pitch1 == 0) {
opType = drawid + "rot";
var isSpecial = (pta00.distance (pt0) < 0.2);
if (!isSpecial) {
draw1.append (drawid).append ("rotLine1 ").append (JU.Escape.eP (pta00)).append (JU.Escape.eP (pa1)).append (" color red");
draw1.append (drawid).append ("rotLine2 ").append (JU.Escape.eP (pt0)).append (JU.Escape.eP (pa1)).append (" color red");
}vtemp.scale (3 * scaleFactor);
ptemp.scaleAdd2 (-1, vtemp, pa1);
JS.SymmetryDesc.drawVector (draw1, drawid, "rotVector2", "", pa1, ptemp, isTimeReversed ? "gray" : "red");
ptr.setT (pa1);
if (pitch1 == 0 && pta00.distance (pt0) < 0.2) ptr.scaleAdd2 (0.5, vtemp, ptr);
} else {
opType = drawid + "screw";
color = "orange";
draw1.append (drawid).append ("rotLine1 ").append (JU.Escape.eP (pta00)).append (JU.Escape.eP (pa1)).append (" color red");
ptemp.add2 (pa1, vtemp);
draw1.append (drawid).append ("rotLine2 ").append (JU.Escape.eP (pt0)).append (JU.Escape.eP (ptemp)).append (" color red");
ptr.scaleAdd2 (0.5, vtemp, pa1);
}ptemp.add2 (ptr, vtemp);
if (haveInversion && pitch1 != 0) {
draw1.append (drawid).append ("rotRotLine1").append (JU.Escape.eP (ptr)).append (JU.Escape.eP (ptinv)).append (" color red");
draw1.append (drawid).append ("rotRotLine2").append (JU.Escape.eP (ptr)).append (JU.Escape.eP (pt0)).append (" color red");
}draw1.append (drawid).append ("rotRotArrow arrow width 0.1 scale " + JU.PT.escF (scale) + " arc ").append (JU.Escape.eP (ptr)).append (JU.Escape.eP (ptemp));
ptemp.setT (haveInversion ? ptinv : pta00);
if (ptemp.distance (pt0) < 0.1) ptemp.set (Math.random (), Math.random (), Math.random ());
draw1.append (JU.Escape.eP (ptemp));
ptemp.set (0, ang, 0);
draw1.append (JU.Escape.eP (ptemp)).append (" color red");
JS.SymmetryDesc.drawVector (draw1, drawid, "rotVector1", "vector", pa1, vtemp, isTimeReversed ? "Gray" : color);
} else if (isMirrorPlane) {
ptemp.sub2 (ptref, pta00);
if (pta00.distance (ptref) > 0.2) JS.SymmetryDesc.drawVector (draw1, drawid, "planeVector", "vector", pta00, ptemp, isTimeReversed ? "Gray" : "cyan");
opType = drawid + "plane";
if (trans != null) {
opType = drawid + "glide";
JS.SymmetryDesc.drawFrameLine ("X", ptref, vt1, 0.15, ptemp, draw1, opType, "red");
JS.SymmetryDesc.drawFrameLine ("Y", ptref, vt2, 0.15, ptemp, draw1, opType, "green");
JS.SymmetryDesc.drawFrameLine ("Z", ptref, vt3, 0.15, ptemp, draw1, opType, "blue");
}color = (trans == null ? "green" : "blue");
vtemp.setT (ax1);
vtemp.normalize ();
var w = -vtemp.x * pa1.x - vtemp.y * pa1.y - vtemp.z * pa1.z;
plane = JU.P4.new4 (vtemp.x, vtemp.y, vtemp.z, w);
var margin = (Math.abs (w) < 0.01 && vtemp.x * vtemp.y > 0.4 ? 1.30 : 1.05);
var v = this.modelSet.vwr.getTriangulator ().intersectPlane (plane, uc.getCanonicalCopy (margin, true), 3);
if (v != null) for (var i = v.size (); --i >= 0; ) {
var pts = v.get (i);
draw1.append (drawid).append ("planep").appendI (i).append (" ").append (JU.Escape.eP (pts[0])).append (JU.Escape.eP (pts[1]));
if (pts.length == 3) draw1.append (JU.Escape.eP (pts[2]));
draw1.append (" color translucent ").append (color);
}
if (v == null || v.size () == 0) {
ptemp.add2 (pa1, ax1);
draw1.append (drawid).append ("planeCircle scale 2.0 circle ").append (JU.Escape.eP (pa1)).append (JU.Escape.eP (ptemp)).append (" color translucent ").append (color).append (" mesh fill");
}}if (haveInversion) {
opType = drawid + "inv";
draw1.append (drawid).append ("invPoint diameter 0.4 ").append (JU.Escape.eP (ipt));
ptemp.sub2 (ptinv, pta00);
JS.SymmetryDesc.drawVector (draw1, drawid, "invArrow", "vector", pta00, ptemp, isTimeReversed ? "gray" : "cyan");
if (!isInversionOnly && options != 1073742066) {
JS.SymmetryDesc.drawFrameLine ("X", ptinv, vt1, 0.15, ptemp, draw1, opType, "red");
JS.SymmetryDesc.drawFrameLine ("Y", ptinv, vt2, 0.15, ptemp, draw1, opType, "green");
JS.SymmetryDesc.drawFrameLine ("Z", ptinv, vt3, 0.15, ptemp, draw1, opType, "blue");
}}if (trans != null) {
if (ptref == null) ptref = JU.P3.newP (pta00);
JS.SymmetryDesc.drawVector (draw1, drawid, "transVector", "vector", ptref, trans, isTimeReversed && !haveInversion && !isMirrorPlane && !isRotation ? "darkGray" : "gold");
}ptemp2.setT (pt0);
ptemp.sub2 (pt1, pt0);
ptemp.scaleAdd2 (0.9, ptemp, ptemp2);
JS.SymmetryDesc.drawLine (draw1, drawid + "frame2X", 0.2, ptemp2, ptemp, "red");
ptemp.sub2 (pt2, pt0);
ptemp.scaleAdd2 (0.9, ptemp, ptemp2);
JS.SymmetryDesc.drawLine (draw1, drawid + "frame2Y", 0.2, ptemp2, ptemp, "green");
ptemp.sub2 (pt3, pt0);
ptemp.scaleAdd2 (0.9, ptemp, ptemp2);
JS.SymmetryDesc.drawLine (draw1, drawid + "frame2Z", 0.2, ptemp2, ptemp, "purple");
draw1.append ("\nsym_point = " + JU.Escape.eP (pta00));
draw1.append ("\nvar p0 = " + JU.Escape.eP (ptemp2));
draw1.append ("\nvar set2 = within(0.2,p0);if(!set2){set2 = within(0.2,p0.uxyz.xyz)}");
if (Clazz.instanceOf (pta00, JM.Atom)) draw1.append ("\n set2 &= {_" + (pta00).getElementSymbol () + "}");
draw1.append ("\nsym_target = set2;if (set2) {");
if (options != 1073742066 && ptTarget == null) {
draw1.append (drawid).append ("offsetFrameX diameter 0.20 @{set2.xyz} @{set2.xyz + ").append (JU.Escape.eP (vt1)).append ("*0.9} color red");
draw1.append (drawid).append ("offsetFrameY diameter 0.20 @{set2.xyz} @{set2.xyz + ").append (JU.Escape.eP (vt2)).append ("*0.9} color green");
draw1.append (drawid).append ("offsetFrameZ diameter 0.20 @{set2.xyz} @{set2.xyz + ").append (JU.Escape.eP (vt3)).append ("*0.9} color purple");
}draw1.append ("\n}\n");
cmds = draw1.toString ();
if (JU.Logger.debugging) JU.Logger.info (cmds);
draw1 = null;
drawid = null;
}if (trans == null) ftrans = null;
if (isRotation) {
if (haveInversion) {
} else if (pitch1 == 0) {
} else {
trans = JU.V3.newV (ax1);
ptemp.setT (trans);
uc.toFractional (ptemp, false);
ftrans = JU.V3.newV (ptemp);
}}if (isMirrorPlane) {
ang1 = 0;
}if (haveInversion) {
if (isInversionOnly) {
pa1 = null;
ax1 = null;
trans = null;
ftrans = null;
}} else if (isTranslation) {
pa1 = null;
ax1 = null;
}if (ax1 != null) ax1.normalize ();
var m2 = null;
m2 = JU.M4.newM4 (op);
if (vtrans.length () != 0) {
m2.m03 += vtrans.x;
m2.m13 += vtrans.y;
m2.m23 += vtrans.z;
}xyzNew = (op.isBio ? m2.toString () : op.modDim > 0 ? op.xyzOriginal : JS.SymmetryOperation.getXYZFromMatrix (m2, false, false, false));
if (op.timeReversal != 0) xyzNew = op.fixMagneticXYZ (m2, xyzNew, true);
return  Clazz.newArray (-1, [xyzNew, op.xyzOriginal, info1, cmds, JS.SymmetryDesc.approx0 (ftrans), JS.SymmetryDesc.approx0 (trans), JS.SymmetryDesc.approx0 (ipt), JS.SymmetryDesc.approx0 (pa1), plane == null ? JS.SymmetryDesc.approx0 (ax1) : null, ang1 != 0 ? Integer.$valueOf (ang1) : null, m2, vtrans.lengthSquared () > 0 ? vtrans : null, op.getCentering (), Integer.$valueOf (op.timeReversal), plane, type, Integer.$valueOf (op.index)]);
}, "JS.SymmetryOperation,J.api.SymmetryInterface,JU.P3,JU.P3,~S,~N,~N");
c$.drawLine = Clazz.defineMethod (c$, "drawLine", 
 function (s, id, diameter, pt0, pt1, color) {
s.append (id).append (" diameter ").appendF (diameter).append (JU.Escape.eP (pt0)).append (JU.Escape.eP (pt1)).append (" color ").append (color);
}, "JU.SB,~S,~N,JU.P3,JU.P3,~S");
c$.drawFrameLine = Clazz.defineMethod (c$, "drawFrameLine", 
 function (xyz, pt, v, width, ptemp, draw1, key, color) {
ptemp.setT (pt);
ptemp.add (v);
JS.SymmetryDesc.drawLine (draw1, key + "Pt" + xyz, width, pt, ptemp, "translucent " + color);
}, "~S,JU.P3,JU.V3,~N,JU.P3,JU.SB,~S,~S");
c$.drawVector = Clazz.defineMethod (c$, "drawVector", 
 function (draw1, drawid, label, type, pt1, v, color) {
draw1.append (drawid).append (label).append (" diameter 0.1 ").append (type).append (JU.Escape.eP (pt1)).append (JU.Escape.eP (v)).append (" color ").append (color);
}, "JU.SB,~S,~S,~S,JU.T3,JU.T3,~S");
c$.setFractional = Clazz.defineMethod (c$, "setFractional", 
 function (uc, pt00, pt01, offset) {
pt01.setT (pt00);
if (offset != null) uc.toUnitCell (pt01, offset);
uc.toFractional (pt01, false);
}, "J.api.SymmetryInterface,JU.T3,JU.P3,JU.P3");
c$.rotTransCart = Clazz.defineMethod (c$, "rotTransCart", 
 function (op, uc, pt00, vtrans) {
var p0 = JU.P3.newP (pt00);
uc.toFractional (p0, false);
op.rotTrans (p0);
p0.add (vtrans);
uc.toCartesian (p0, false);
return p0;
}, "JS.SymmetryOperation,J.api.SymmetryInterface,JU.P3,JU.V3");
c$.strCoord = Clazz.defineMethod (c$, "strCoord", 
 function (p, isBio) {
JS.SymmetryDesc.approx0 (p);
return (isBio ? p.x + " " + p.y + " " + p.z : JS.SymmetryOperation.fcoord (p));
}, "JU.T3,~B");
c$.approx0 = Clazz.defineMethod (c$, "approx0", 
 function (pt) {
if (pt != null) {
if (Math.abs (pt.x) < 0.0001) pt.x = 0;
if (Math.abs (pt.y) < 0.0001) pt.y = 0;
if (Math.abs (pt.z) < 0.0001) pt.z = 0;
}return pt;
}, "JU.T3");
c$.approx = Clazz.defineMethod (c$, "approx", 
 function (pt) {
if (pt != null) {
pt.x = JS.SymmetryOperation.approxF (pt.x);
pt.y = JS.SymmetryOperation.approxF (pt.y);
pt.z = JS.SymmetryOperation.approxF (pt.z);
}return pt;
}, "JU.T3");
Clazz.defineMethod (c$, "getSymmetryInfo", 
 function (sym, iModel, iatom, uc, xyz, op, pt, pt2, id, type, scaleFactor, nth, options) {
if (type == 1073741994) return uc.getLatticeType ();
var nullRet = JS.SymmetryDesc.nullReturn (type);
var iop = op;
var offset = (options == 1073742066 && (type == 1140850689 || type == 134217751) ? pt2 : null);
if (offset != null) pt2 = null;
var info = null;
if (pt2 == null) {
if (xyz == null) {
var ops = uc.getSymmetryOperations ();
if (ops == null || op == 0 || Math.abs (op) > ops.length) return nullRet;
iop = Math.abs (op) - 1;
xyz = ops[iop].xyz;
} else {
iop = op = 0;
}var symTemp =  new JS.Symmetry ();
symTemp.setSpaceGroup (false);
var isBio = uc.isBio ();
var i = (isBio ? symTemp.addBioMoleculeOperation (uc.spaceGroup.finalOperations[iop], op < 0) : symTemp.addSpaceGroupOperation ((op < 0 ? "!" : "=") + xyz, Math.abs (op)));
if (i < 0) return nullRet;
var opTemp = symTemp.getSpaceGroupOperation (i);
opTemp.index = op - 1;
if (!isBio) opTemp.getCentering ();
if (pt == null && iatom >= 0) pt = this.modelSet.at[iatom];
if (type == 134217751 || type == 1140850689) {
if (isBio) return nullRet;
symTemp.setUnitCell (uc);
pt = JU.P3.newP (pt);
uc.toFractional (pt, false);
if (Float.isNaN (pt.x)) return nullRet;
var sympt =  new JU.P3 ();
symTemp.newSpaceGroupPoint (i, pt, sympt, 0, 0, 0, null);
if (options == 1073742066) {
uc.unitize (sympt);
if (options == 1073742066) sympt.add (offset);
}symTemp.toCartesian (sympt, false);
return (type == 1140850689 ? this.getAtom (uc, iModel, iatom, sympt) : sympt);
}info = this.createInfoArray (opTemp, uc, pt, null, (id == null ? "sym" : id), scaleFactor, options);
} else {
var stype = "info";
var asString = false;
switch (type) {
case 1275068418:
id = stype = null;
asString = false;
if (nth == 0) nth = -1;
break;
case 1073742001:
id = stype = null;
asString = true;
if (nth == 0) nth = -1;
break;
case 135176:
if (id == null) id = "sym";
stype = "all";
asString = true;
break;
case 1140850689:
id = stype = null;
default:
if (nth == 0) nth = 1;
}
var ret1 = this.getSymopInfoForPoints (sym, iModel, op, pt, pt2, id, stype, scaleFactor, nth, asString, options);
if (asString) return ret1;
if (Clazz.instanceOf (ret1, String)) return nullRet;
info = ret1;
if (type == 1140850689) {
if (!(Clazz.instanceOf (pt, JM.Atom)) && !(Clazz.instanceOf (pt2, JM.Atom))) iatom = -1;
return (info == null ? nullRet : this.getAtom (uc, iModel, iatom, info[7]));
}}if (info == null) return nullRet;
if (nth < 0 && op <= 0 && (type == 1275068418 || info.length > 0 && Clazz.instanceOf (info[0], Array))) {
var lst =  new JU.Lst ();
for (var i = 0; i < info.length; i++) lst.addLast (JS.SymmetryDesc.getInfo (info[i], type));

return lst;
}return JS.SymmetryDesc.getInfo (info, type);
}, "JS.Symmetry,~N,~N,JS.Symmetry,~S,~N,JU.P3,JU.P3,~S,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getAtom", 
 function (uc, iModel, iAtom, sympt) {
var bsElement = null;
if (iAtom >= 0) this.modelSet.getAtomBitsMDa (1094715402, Integer.$valueOf (this.modelSet.at[iAtom].getElementNumber ()), bsElement =  new JU.BS ());
var bsResult =  new JU.BS ();
this.modelSet.getAtomsWithin (0.02, sympt, bsResult, iModel);
if (bsElement != null) bsResult.and (bsElement);
if (bsResult.isEmpty ()) {
sympt = JU.P3.newP (sympt);
uc.toUnitCell (sympt, null);
uc.toCartesian (sympt, false);
this.modelSet.getAtomsWithin (0.02, sympt, bsResult, iModel);
if (bsElement != null) bsResult.and (bsElement);
}return bsResult;
}, "JS.Symmetry,~N,~N,JU.T3");
Clazz.defineMethod (c$, "getSymopInfoForPoints", 
 function (sym, modelIndex, symOp, pt1, pt2, drawID, stype, scaleFactor, nth, asString, options) {
var ret = (asString ? "" : null);
var sginfo = this.getSpaceGroupInfo (sym, modelIndex, null, symOp, pt1, pt2, drawID, scaleFactor, nth, false, true, options, null);
if (sginfo == null) return ret;
var infolist = sginfo.get ("operations");
if (infolist == null) return ret;
var sb = (asString ?  new JU.SB () : null);
symOp--;
var isAll = (!asString && symOp < 0);
var strOperations = sginfo.get ("symmetryInfo");
var labelOnly = "label".equals (stype);
var n = 0;
for (var i = 0; i < infolist.length; i++) {
if (infolist[i] == null || symOp >= 0 && symOp != i) continue;
if (!asString) {
if (!isAll) return infolist[i];
infolist[n++] = infolist[i];
continue;
}if (drawID != null) return (infolist[i][3]) + "\nprint " + JU.PT.esc (strOperations);
if (sb.length () > 0) sb.appendC ('\n');
if (!labelOnly) {
if (symOp < 0) sb.appendI (i + 1).appendC ('\t');
sb.append (infolist[i][0]).appendC ('\t');
}sb.append (infolist[i][2]);
}
if (!asString) {
var a =  new Array (n);
for (var i = 0; i < n; i++) a[i] = infolist[i];

return a;
}if (sb.length () == 0) return (drawID != null ? "draw " + drawID + "* delete" : ret);
return sb.toString ();
}, "JS.Symmetry,~N,~N,JU.P3,JU.P3,~S,~S,~N,~N,~B,~N");
Clazz.defineStatics (c$,
"keys",  Clazz.newArray (-1, ["xyz", "xyzOriginal", "label", null, "fractionalTranslation", "cartesianTranslation", "inversionCenter", null, "axisVector", "rotationAngle", "matrix", "unitTranslation", "centeringVector", "timeReversal", "plane", "_type", "id"]),
"KEY_DRAW", 3,
"KEY_POINT", 7);
});
