Clazz.declarePackage ("JM");
Clazz.load (null, "JM.BioExt", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.P3", "$.PT", "$.Quat", "JM.AminoMonomer", "JU.BSUtil", "$.Escape", "$.Logger", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.ms = null;
Clazz.instantialize (this, arguments);
}, JM, "BioExt");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (vwr, ms) {
this.vwr = vwr;
this.ms = ms;
return this;
}, "JV.Viewer,JM.ModelSet");
Clazz.defineMethod (c$, "getAllPolymerInfo", 
function (bs, fullInfo) {
var modelVector =  new JU.Lst ();
var modelCount = this.ms.mc;
var models = this.ms.am;
for (var i = 0; i < modelCount; ++i) if (models[i].isBioModel) {
var m = models[i];
var modelInfo =  new java.util.Hashtable ();
var info =  new JU.Lst ();
for (var ip = 0; ip < m.bioPolymerCount; ip++) {
var bp = m.bioPolymers[ip];
var pInfo =  new java.util.Hashtable ();
var mInfo =  new JU.Lst ();
var sInfo = null;
var ps;
var psLast = null;
var n = 0;
var ptTemp =  new JU.P3 ();
for (var im = 0; im < bp.monomerCount; im++) {
if (bs.get (bp.monomers[im].leadAtomIndex)) {
var monomerInfo = bp.monomers[im].getMyInfo (ptTemp);
monomerInfo.put ("monomerIndex", Integer.$valueOf (im));
mInfo.addLast (monomerInfo);
if ((ps = bp.getProteinStructure (im)) != null && ps !== psLast) {
var psInfo =  new java.util.Hashtable ();
psLast = ps;
psInfo.put ("type", ps.type.getBioStructureTypeName (false));
var leadAtomIndices = bp.getLeadAtomIndices ();
var iArray = JU.AU.arrayCopyRangeI (leadAtomIndices, ps.monomerIndexFirst, ps.monomerIndexFirst + ps.nRes);
psInfo.put ("leadAtomIndices", iArray);
ps.calcAxis ();
if (ps.axisA != null) {
psInfo.put ("axisA", ps.axisA);
psInfo.put ("axisB", ps.axisB);
psInfo.put ("axisUnitVector", ps.axisUnitVector);
}psInfo.put ("index", Integer.$valueOf (n++));
if (sInfo == null) sInfo =  new JU.Lst ();
sInfo.addLast (psInfo);
}}}
if (mInfo.size () > 0) {
pInfo.put ("sequence", bp.getSequence ());
pInfo.put ("monomers", mInfo);
if (sInfo != null) pInfo.put ("structures", sInfo);
}if (!pInfo.isEmpty ()) info.addLast (pInfo);
}
if (info.size () > 0) {
modelInfo.put ("modelIndex", Integer.$valueOf (m.modelIndex));
modelInfo.put ("polymers", info);
modelVector.addLast (modelInfo);
}}
fullInfo.put ("models", modelVector);
}, "JU.BS,java.util.Map");
Clazz.defineMethod (c$, "calculateStraightnessAll", 
function () {
var qtype = this.vwr.getQuaternionFrame ();
var mStep = this.vwr.getInt (553648144);
for (var i = this.ms.mc; --i >= 0; ) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
var ptTemp =  new JU.P3 ();
for (var p = 0; p < m.bioPolymerCount; p++) this.getPdbData (m.bioPolymers[p], 'S', qtype, mStep, 2, null, null, false, false, false, null, null, null,  new JU.BS (), ptTemp);

}
this.ms.haveStraightness = true;
});
Clazz.defineMethod (c$, "getPdbData", 
 function (bp, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten, ptTemp) {
var calcRamachandranStraightness = (qtype == 'C' || qtype == 'P');
var isRamachandran = (ctype == 'R' || ctype == 'S' && calcRamachandranStraightness);
if (isRamachandran && !bp.calcPhiPsiAngles ()) return;
var isAmino = (bp.type == 1);
var isRelativeAlias = (ctype == 'r');
var quaternionStraightness = (!isRamachandran && ctype == 'S');
if (derivType == 2 && isRelativeAlias) ctype = 'w';
if (quaternionStraightness) derivType = 2;
var useQuaternionStraightness = (ctype == 'S');
var writeRamachandranStraightness = ("rcpCP".indexOf (qtype) >= 0);
if (JU.Logger.debugging && (quaternionStraightness || calcRamachandranStraightness)) {
JU.Logger.debug ("For straightness calculation: useQuaternionStraightness = " + useQuaternionStraightness + " and quaternionFrame = " + qtype);
}if (addHeader && !isDraw) {
pdbATOM.append ("REMARK   6    AT GRP CH RESNO  ");
switch (ctype) {
default:
case 'w':
pdbATOM.append ("x*10___ y*10___ z*10___      w*10__       ");
break;
case 'x':
pdbATOM.append ("y*10___ z*10___ w*10___      x*10__       ");
break;
case 'y':
pdbATOM.append ("z*10___ w*10___ x*10___      y*10__       ");
break;
case 'z':
pdbATOM.append ("w*10___ x*10___ y*10___      z*10__       ");
break;
case 'R':
if (writeRamachandranStraightness) pdbATOM.append ("phi____ psi____ theta         Straightness");
 else pdbATOM.append ("phi____ psi____ omega-180    PartialCharge");
break;
}
pdbATOM.append ("    Sym   q0_______ q1_______ q2_______ q3_______");
pdbATOM.append ("  theta_  aaX_______ aaY_______ aaZ_______");
if (ctype != 'R') pdbATOM.append ("  centerX___ centerY___ centerZ___");
if (qtype == 'n') pdbATOM.append ("  NHX_______ NHY_______ NHZ_______");
pdbATOM.append ("\n\n");
}var factor = (ctype == 'R' ? 1 : 10);
bothEnds = false;
for (var j = 0; j < (bothEnds ? 2 : 1); j++, factor *= -1) for (var i = 0; i < (mStep < 1 ? 1 : mStep); i++) if (bp.hasStructure) this.getData (i, mStep, bp, ctype, qtype, derivType, bsAtoms, bsSelected, isDraw, isRamachandran, calcRamachandranStraightness, useQuaternionStraightness, writeRamachandranStraightness, quaternionStraightness, factor, isAmino, isRelativeAlias, tokens, pdbATOM, pdbCONECT, bsWritten, ptTemp);


}, "JM.BioPolymer,~S,~S,~N,~N,JU.BS,JU.BS,~B,~B,~B,~A,JU.OC,JU.SB,JU.BS,JU.P3");
Clazz.defineMethod (c$, "getData", 
 function (m0, mStep, p, ctype, qtype, derivType, bsAtoms, bsSelected, isDraw, isRamachandran, calcRamachandranStraightness, useQuaternionStraightness, writeRamachandranStraightness, quaternionStraightness, factor, isAmino, isRelativeAlias, tokens, pdbATOM, pdbCONECT, bsWritten, ptTemp) {
var prefix = (derivType > 0 ? "dq" + (derivType == 2 ? "2" : "") : "q");
var q;
var aprev = null;
var qprev = null;
var dq = null;
var dqprev = null;
var qref = null;
var atomLast = null;
var x = 0;
var y = 0;
var z = 0;
var w = 0;
var strExtra = "";
var val1 = NaN;
var val2 = NaN;
var pt = (isDraw ?  new JU.P3 () : null);
var dm = (mStep <= 1 ? 1 : mStep);
for (var m = m0; m < p.monomerCount; m += dm) {
var monomer = p.monomers[m];
if (bsAtoms == null || bsAtoms.get (monomer.leadAtomIndex)) {
var a = monomer.getLeadAtom ();
var id = monomer.getUniqueID ();
if (isRamachandran) {
if (ctype == 'S') monomer.setGroupParameter (1111490574, NaN);
x = monomer.getGroupParameter (1111490569);
y = monomer.getGroupParameter (1111490570);
z = monomer.getGroupParameter (1111490568);
if (z < -90) z += 360;
z -= 180;
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) {
if (bsAtoms != null) bsAtoms.clear (a.i);
continue;
}var angledeg = (writeRamachandranStraightness ? p.calculateRamachandranHelixAngle (m, qtype) : 0);
var straightness = (calcRamachandranStraightness || writeRamachandranStraightness ? JM.BioExt.getStraightness (Math.cos (angledeg / 2 / 180 * 3.141592653589793)) : 0);
if (ctype == 'S') {
monomer.setGroupParameter (1111490574, straightness);
continue;
}if (isDraw) {
if (bsSelected != null && !bsSelected.get (a.getIndex ())) continue;
var aa = monomer;
pt.set (-x, x, 0.5);
pdbATOM.append ("draw ID \"phi").append (id).append ("\" ARROW ARC ").append (JU.Escape.eP (aa.getNitrogenAtom ())).append (JU.Escape.eP (a)).append (JU.Escape.eP (aa.getCarbonylCarbonAtom ())).append (JU.Escape.eP (pt)).append (" \"phi = ").append (String.valueOf (Math.round (x))).append ("\" color ").append (JM.BioExt.qColor[2]).append ("\n");
pt.set (0, y, 0.5);
pdbATOM.append ("draw ID \"psi").append (id).append ("\" ARROW ARC ").append (JU.Escape.eP (a)).append (JU.Escape.eP (aa.getCarbonylCarbonAtom ())).append (JU.Escape.eP (aa.getNitrogenAtom ())).append (JU.Escape.eP (pt)).append (" \"psi = ").append (String.valueOf (Math.round (y))).append ("\" color ").append (JM.BioExt.qColor[1]).append ("\n");
pdbATOM.append ("draw ID \"planeNCC").append (id).append ("\" ").append (JU.Escape.eP (aa.getNitrogenAtom ())).append (JU.Escape.eP (a)).append (JU.Escape.eP (aa.getCarbonylCarbonAtom ())).append (" color ").append (JM.BioExt.qColor[0]).append ("\n");
pdbATOM.append ("draw ID \"planeCNC").append (id).append ("\" ").append (JU.Escape.eP ((p.monomers[m - 1]).getCarbonylCarbonAtom ())).append (JU.Escape.eP (aa.getNitrogenAtom ())).append (JU.Escape.eP (a)).append (" color ").append (JM.BioExt.qColor[1]).append ("\n");
pdbATOM.append ("draw ID \"planeCCN").append (id).append ("\" ").append (JU.Escape.eP (a)).append (JU.Escape.eP (aa.getCarbonylCarbonAtom ())).append (JU.Escape.eP ((p.monomers[m + 1]).getNitrogenAtom ())).append (" color ").append (JM.BioExt.qColor[2]).append ("\n");
continue;
}if (Float.isNaN (angledeg)) {
strExtra = "";
if (writeRamachandranStraightness) continue;
} else {
q = JU.Quat.newVA (JU.P3.new3 (1, 0, 0), angledeg);
strExtra = JM.BioExt.getQInfo (q);
if (writeRamachandranStraightness) {
z = angledeg;
w = straightness;
} else {
w = a.getPartialCharge ();
}}} else {
q = monomer.getQuaternion (qtype);
if (q != null) {
q.setRef (qref);
qref = JU.Quat.newQ (q);
}if (derivType == 2) monomer.setGroupParameter (1111490574, NaN);
if (q == null) {
qprev = null;
qref = null;
} else if (derivType > 0) {
var anext = a;
var qnext = q;
if (qprev == null) {
q = null;
dqprev = null;
} else {
if (isRelativeAlias) {
dq = qprev.leftDifference (q);
} else {
dq = q.rightDifference (qprev);
}if (derivType == 1) {
q = dq;
} else if (dqprev == null) {
q = null;
} else {
q = dq.rightDifference (dqprev);
val1 = JM.BioExt.getQuaternionStraightness (id, dqprev, dq);
val2 = JM.BioExt.get3DStraightness (id, dqprev, dq);
(aprev.group).setGroupParameter (1111490574, useQuaternionStraightness ? val1 : val2);
}dqprev = dq;
}aprev = anext;
qprev = qnext;
}if (q == null) {
atomLast = null;
continue;
}switch (ctype) {
default:
x = q.q1;
y = q.q2;
z = q.q3;
w = q.q0;
break;
case 'x':
x = q.q0;
y = q.q1;
z = q.q2;
w = q.q3;
break;
case 'y':
x = q.q3;
y = q.q0;
z = q.q1;
w = q.q2;
break;
case 'z':
x = q.q2;
y = q.q3;
z = q.q0;
w = q.q1;
break;
}
var ptCenter = monomer.getQuaternionFrameCenter (qtype);
if (ptCenter == null) ptCenter =  new JU.P3 ();
if (isDraw) {
if (bsSelected != null && !bsSelected.get (a.getIndex ())) continue;
var deg = Clazz.doubleToInt (Math.floor (Math.acos (w) * 360 / 3.141592653589793));
if (derivType == 0) {
pdbATOM.append (JU.Escape.drawQuat (q, prefix, id, ptCenter, 1));
if (qtype == 'n' && isAmino) {
var ptH = (monomer).getNitrogenHydrogenPoint ();
if (ptH != null) pdbATOM.append ("draw ID \"").append (prefix).append ("nh").append (id).append ("\" width 0.1 ").append (JU.Escape.eP (ptH)).append ("\n");
}}if (derivType == 1) {
pdbATOM.append (monomer.getHelixData (135176, qtype, mStep)).append ("\n");
continue;
}pt.set (x * 2, y * 2, z * 2);
pdbATOM.append ("draw ID \"").append (prefix).append ("a").append (id).append ("\" VECTOR ").append (JU.Escape.eP (ptCenter)).append (JU.Escape.eP (pt)).append (" \">").append (String.valueOf (deg)).append ("\" color ").append (JM.BioExt.qColor[derivType]).append ("\n");
continue;
}strExtra = JM.BioExt.getQInfo (q) + JU.PT.sprintf ("  %10.5p %10.5p %10.5p", "p",  Clazz.newArray (-1, [ptCenter]));
if (qtype == 'n' && isAmino) {
strExtra += JU.PT.sprintf ("  %10.5p %10.5p %10.5p", "p",  Clazz.newArray (-1, [(monomer).getNitrogenHydrogenPoint ()]));
} else if (derivType == 2 && !Float.isNaN (val1)) {
strExtra += JU.PT.sprintf (" %10.5f %10.5f", "F",  Clazz.newArray (-1, [ Clazz.newFloatArray (-1, [val1, val2])]));
}}if (pdbATOM == null) continue;
bsWritten.set ((a.group).leadAtomIndex);
pdbATOM.append (this.ms.getLabeler ().formatLabelAtomArray (this.vwr, a, tokens, '\0', null, ptTemp));
pdbATOM.append (JU.PT.sprintf ("%8.2f%8.2f%8.2f      %6.3f          %2s    %s\n", "ssF",  Clazz.newArray (-1, [a.getElementSymbolIso (false).toUpperCase (), strExtra,  Clazz.newFloatArray (-1, [x * factor, y * factor, z * factor, w * factor])])));
if (atomLast != null && atomLast.group.getBioPolymerIndexInModel () == a.group.getBioPolymerIndexInModel ()) {
pdbCONECT.append ("CONECT").append (JU.PT.formatStringI ("%5i", "i", atomLast.getAtomNumber ())).append (JU.PT.formatStringI ("%5i", "i", a.getAtomNumber ())).appendC ('\n');
}atomLast = a;
}}
}, "~N,~N,JM.BioPolymer,~S,~S,~N,JU.BS,JU.BS,~B,~B,~B,~B,~B,~B,~N,~B,~B,~A,JU.OC,JU.SB,JU.BS,JU.P3");
c$.getQInfo = Clazz.defineMethod (c$, "getQInfo", 
 function (q) {
var axis = q.toAxisAngle4f ();
return JU.PT.sprintf ("%10.6f%10.6f%10.6f%10.6f  %6.2f  %10.5f %10.5f %10.5f", "F",  Clazz.newArray (-1, [ Clazz.newFloatArray (-1, [q.q0, q.q1, q.q2, q.q3, (axis.angle * 180 / 3.141592653589793), axis.x, axis.y, axis.z])]));
}, "JU.Quat");
c$.drawQuat = Clazz.defineMethod (c$, "drawQuat", 
function (q, prefix, id, ptCenter, scale) {
var strV = " VECTOR " + JU.Escape.eP (ptCenter) + " ";
if (scale == 0) scale = 1;
return "draw " + prefix + "x" + id + strV + JU.Escape.eP (q.getVectorScaled (0, scale)) + " color red\n" + "draw " + prefix + "y" + id + strV + JU.Escape.eP (q.getVectorScaled (1, scale)) + " color green\n" + "draw " + prefix + "z" + id + strV + JU.Escape.eP (q.getVectorScaled (2, scale)) + " color blue\n";
}, "JU.Quat,~S,~S,JU.P3,~N");
c$.get3DStraightness = Clazz.defineMethod (c$, "get3DStraightness", 
 function (id, dq, dqnext) {
return dq.getNormal ().dot (dqnext.getNormal ());
}, "~S,JU.Quat,JU.Quat");
c$.getQuaternionStraightness = Clazz.defineMethod (c$, "getQuaternionStraightness", 
 function (id, dq, dqnext) {
return JM.BioExt.getStraightness (dq.dot (dqnext));
}, "~S,JU.Quat,JU.Quat");
c$.getStraightness = Clazz.defineMethod (c$, "getStraightness", 
 function (cosHalfTheta) {
return (1 - 2 * Math.acos (Math.abs (cosHalfTheta)) / 3.141592653589793);
}, "~N");
Clazz.defineMethod (c$, "getPdbDataM", 
function (m, vwr, type, ctype, isDraw, bsSelected, out, tokens, pdbCONECT, bsWritten) {
var bothEnds = false;
var qtype = (ctype != 'R' ? 'r' : type.length > 13 && type.indexOf ("ramachandran ") >= 0 ? type.charAt (13) : 'R');
if (qtype == 'r') qtype = vwr.getQuaternionFrame ();
var mStep = vwr.getInt (553648144);
var derivType = (type.indexOf ("diff") < 0 ? 0 : type.indexOf ("2") < 0 ? 1 : 2);
if (!isDraw) {
out.append ("REMARK   6 Jmol PDB-encoded data: " + type + ";");
if (ctype != 'R') {
out.append ("  quaternionFrame = \"" + qtype + "\"");
bothEnds = true;
}out.append ("\nREMARK   6 Jmol Version ").append (JV.Viewer.getJmolVersion ()).append ("\n");
if (ctype == 'R') out.append ("REMARK   6 Jmol data min = {-180 -180 -180} max = {180 180 180} unScaledXyz = xyz * {1 1 1} + {0 0 0} plotScale = {100 100 100}\n");
 else out.append ("REMARK   6 Jmol data min = {-1 -1 -1} max = {1 1 1} unScaledXyz = xyz * {0.1 0.1 0.1} + {0 0 0} plotScale = {100 100 100}\n");
}var ptTemp =  new JU.P3 ();
for (var p = 0; p < m.bioPolymerCount; p++) this.getPdbData (m.bioPolymers[p], ctype, qtype, mStep, derivType, m.bsAtoms, bsSelected, bothEnds, isDraw, p == 0, tokens, out, pdbCONECT, bsWritten, ptTemp);

}, "JM.BioModel,JV.Viewer,~S,~S,~B,JU.BS,JU.OC,~A,JU.SB,JU.BS");
Clazz.defineMethod (c$, "calculateAllstruts", 
function (vwr, ms, bs1, bs2) {
vwr.setModelVisibility ();
ms.makeConnections2 (0, 3.4028235E38, 32768, 12291, bs1, bs2, null, false, false, 0);
var iAtom = bs1.nextSetBit (0);
if (iAtom < 0) return 0;
var m = ms.am[ms.at[iAtom].mi];
if (!m.isBioModel) return 0;
var vCA =  new JU.Lst ();
var bsCheck;
if (bs1.equals (bs2)) {
bsCheck = bs1;
} else {
bsCheck = JU.BSUtil.copy (bs1);
bsCheck.or (bs2);
}var atoms = ms.at;
bsCheck.and (vwr.getModelUndeletedAtomsBitSet (m.modelIndex));
for (var i = bsCheck.nextSetBit (0); i >= 0; i = bsCheck.nextSetBit (i + 1)) {
var a = atoms[i];
if (a.checkVisible () && a.atomID == 2 && a.group.groupID != 5 && atoms[i].group.leadAtomIndex >= 0) vCA.addLast (atoms[i]);
}
if (vCA.size () == 0) return 0;
var struts = JM.BioExt.calculateStruts (ms, bs1, bs2, vCA, vwr.getFloat (570425408), vwr.getInt (553648184), vwr.getBoolean (603979955));
var mad = Clazz.floatToShort (vwr.getFloat (570425406) * 2000);
for (var i = 0; i < struts.size (); i++) {
var o = struts.get (i);
ms.bondAtoms (o[0], o[1], 32768, mad, null, 0, false, true);
}
return struts.size ();
}, "JV.Viewer,JM.ModelSet,JU.BS,JU.BS");
c$.calculateStruts = Clazz.defineMethod (c$, "calculateStruts", 
 function (modelSet, bs1, bs2, vCA, thresh, delta, allowMultiple) {
var vStruts =  new JU.Lst ();
var thresh2 = thresh * thresh;
var n = vCA.size ();
var nEndMin = 3;
var bsStruts =  new JU.BS ();
var bsNotAvailable =  new JU.BS ();
var bsNearbyResidues =  new JU.BS ();
var a1 = vCA.get (0);
var a2;
var nBiopolymers = modelSet.getBioPolymerCountInModel (a1.mi);
var biopolymerStartsEnds =  Clazz.newIntArray (nBiopolymers, nEndMin * 2, 0);
for (var i = 0; i < n; i++) {
a1 = vCA.get (i);
var polymerIndex = a1.group.getBioPolymerIndexInModel ();
var monomerIndex = a1.group.getMonomerIndex ();
var bpt = monomerIndex;
if (bpt < nEndMin) biopolymerStartsEnds[polymerIndex][bpt] = i + 1;
bpt = (a1.group).getBioPolymerLength () - monomerIndex - 1;
if (bpt < nEndMin) biopolymerStartsEnds[polymerIndex][nEndMin + bpt] = i + 1;
}
var d2 =  Clazz.newFloatArray (Clazz.doubleToInt (n * (n - 1) / 2), 0);
for (var i = 0; i < n; i++) {
a1 = vCA.get (i);
for (var j = i + 1; j < n; j++) {
var ipt = JM.BioExt.strutPoint (i, j, n);
a2 = vCA.get (j);
var resno1 = a1.getResno ();
var polymerIndex1 = a1.group.getBioPolymerIndexInModel ();
var resno2 = a2.getResno ();
var polymerIndex2 = a2.group.getBioPolymerIndexInModel ();
if (polymerIndex1 == polymerIndex2 && Math.abs (resno2 - resno1) < delta) bsNearbyResidues.set (ipt);
var d = d2[ipt] = a1.distanceSquared (a2);
if (d >= thresh2) bsNotAvailable.set (ipt);
}
}
for (var t = 5; --t >= 0; ) {
thresh2 = (thresh - t) * (thresh - t);
for (var i = 0; i < n; i++) if (allowMultiple || !bsStruts.get (i)) for (var j = i + 1; j < n; j++) {
var ipt = JM.BioExt.strutPoint (i, j, n);
if (!bsNotAvailable.get (ipt) && !bsNearbyResidues.get (ipt) && (allowMultiple || !bsStruts.get (j)) && d2[ipt] <= thresh2) JM.BioExt.setStrut (i, j, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta);
}

}
for (var b = 0; b < nBiopolymers; b++) {
for (var k = 0; k < nEndMin * 2; k++) {
var i = biopolymerStartsEnds[b][k] - 1;
if (i >= 0 && bsStruts.get (i)) {
for (var j = 0; j < nEndMin; j++) {
var pt = (Clazz.doubleToInt (k / nEndMin)) * nEndMin + j;
if ((i = biopolymerStartsEnds[b][pt] - 1) >= 0) bsStruts.set (i);
biopolymerStartsEnds[b][pt] = -1;
}
}}
if (biopolymerStartsEnds[b][0] == -1 && biopolymerStartsEnds[b][nEndMin] == -1) continue;
var okN = false;
var okC = false;
var iN = 0;
var jN = 0;
var iC = 0;
var jC = 0;
var minN = 3.4028235E38;
var minC = 3.4028235E38;
for (var j = 0; j < n; j++) for (var k = 0; k < nEndMin * 2; k++) {
var i = biopolymerStartsEnds[b][k] - 1;
if (i == -2) {
k = (Clazz.doubleToInt (k / nEndMin) + 1) * nEndMin - 1;
continue;
}if (j == i || i == -1) continue;
var ipt = JM.BioExt.strutPoint (i, j, n);
if (bsNearbyResidues.get (ipt) || d2[ipt] > (k < nEndMin ? minN : minC)) continue;
if (k < nEndMin) {
if (bsNotAvailable.get (ipt)) okN = true;
jN = j;
iN = i;
minN = d2[ipt];
} else {
if (bsNotAvailable.get (ipt)) okC = true;
jC = j;
iC = i;
minC = d2[ipt];
}}

if (okN) JM.BioExt.setStrut (iN, jN, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta);
if (okC) JM.BioExt.setStrut (iC, jC, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta);
}
return vStruts;
}, "JM.ModelSet,JU.BS,JU.BS,JU.Lst,~N,~N,~B");
c$.strutPoint = Clazz.defineMethod (c$, "strutPoint", 
 function (i, j, n) {
return (j < i ? Clazz.doubleToInt (j * (2 * n - j - 1) / 2) + i - j - 1 : Clazz.doubleToInt (i * (2 * n - i - 1) / 2) + j - i - 1);
}, "~N,~N,~N");
c$.setStrut = Clazz.defineMethod (c$, "setStrut", 
 function (i, j, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta) {
var a1 = vCA.get (i);
var a2 = vCA.get (j);
if (!bs1.get (a1.i) || !bs2.get (a2.i)) return;
vStruts.addLast ( Clazz.newArray (-1, [a1, a2]));
bsStruts.set (i);
bsStruts.set (j);
for (var k1 = Math.max (0, i - delta); k1 <= i + delta && k1 < n; k1++) {
for (var k2 = Math.max (0, j - delta); k2 <= j + delta && k2 < n; k2++) {
if (k1 == k2) {
continue;
}var ipt = JM.BioExt.strutPoint (k1, k2, n);
if (!bsNearbyResidues.get (ipt)) {
bsNotAvailable.set (ipt);
}}
}
}, "~N,~N,~N,JU.Lst,JU.BS,JU.BS,JU.Lst,JU.BS,JU.BS,JU.BS,~N");
Clazz.defineMethod (c$, "mutate", 
function (vwr, bs, group, sequence) {
var i0 = bs.nextSetBit (0);
if (sequence == null) return JM.BioExt.mutateAtom (vwr, i0, group);
var isFile = (group == null);
if (isFile) group = sequence[0];
var lastGroup = null;
var isOK = true;
for (var i = i0, pt = 0; i >= 0; i = bs.nextSetBit (i + 1)) {
var g = vwr.ms.at[i].group;
if (g === lastGroup) continue;
lastGroup = g;
if (!isFile) {
group = sequence[pt++ % sequence.length];
if (group.equals ("UNK")) continue;
group = "==" + group;
}JM.BioExt.mutateAtom (vwr, i, group);
}
return isOK;
}, "JV.Viewer,JU.BS,~S,~A");
c$.mutateAtom = Clazz.defineMethod (c$, "mutateAtom", 
 function (vwr, iatom, fileName) {
var ms = vwr.ms;
var iModel = ms.at[iatom].mi;
if (ms.isTrajectory (iModel)) return false;
var info = vwr.fm.getFileInfo ();
var g = ms.at[iatom].group;
if (!(Clazz.instanceOf (g, JM.AminoMonomer))) return false;
(ms.am[iModel]).isMutated = true;
var res0 = g;
var ac = ms.ac;
var bsRes0 =  new JU.BS ();
res0.setAtomBits (bsRes0);
var backbone = JM.BioExt.getMutationBackbone (res0, null);
fileName = JU.PT.esc (fileName);
var script = "try{\n  var atoms0 = {*}\n  var res0 = " + JU.BS.escape (bsRes0, '(', ')') + "\n" + "  load mutate " + fileName + "\n" + "  var res1 = {!atoms0};var r1 = res1[1];var r0 = res1[0]\n" + "  if ({r1 & within(group, r0)}){\n" + "    var haveHs = ({_H & connected(res0)} != 0)\n" + "    if (!haveHs) {delete _H & res1}\n" + "    var sm = '[*.N][*.CA][*.C][*.O]'\n" + "    var keyatoms = res1.find(sm)\n" + "    var x = compare(res1,res0,sm,'BONDS')\n" + "    if(x){\n" + "      print 'mutating ' + res0[1].label('%n%r') + ' to ' + " + fileName + ".trim('=')\n" + "      rotate branch @x\n" + "      compare res1 res0 SMARTS @sm rotate translate 0\n" + "      var c = {!res0 & connected(res0)}\n" + "      var N2 = {*.N & c}\n" + "      var C0 = {*.C & c}\n" + "      var angleH = ({*.H and res0} ? angle({*.C and res0},{*.CA and res0},{*.N and res0},{*.H and res0}) : 1000)\n" + "      delete res0\n" + "      if (N2) {\n" + "        delete (*.OXT,*.HXT) and res1\n" + "        connect {N2} {keyatoms & *.C}\n" + "      }\n" + "      if (C0) {\n" + "        var h1 = {*.H and res1}\n" + "        var n = (h1 ? 0 + {res1 and _H & connected(*.N)} : 0)\n" + "        switch (n) {\n" + "        case 0:\n" + "          break\n" + "        case 1:\n" + "          delete h1\n" + "          break\n" + "        default:\n" + "          var x = angle({*.C and res1},{*.CA and res1},{*.N and res1},h1)\n" + "          rotate branch {*.CA and res1} {*.N and res1} @{angleH-x}\n" + "          delete *.H2 and res1\n" + "          delete *.H3 and res1\n" + "          break\n" + "        }\n" + "        connect {C0} {keyatoms & *.N}\n" + "      }\n" + "    }\n" + "  }\n" + "}catch(e){print e}\n";
try {
if (JU.Logger.debugging) JU.Logger.debug (script);
vwr.eval.runScript (script);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (!JV.Viewer.isJS) e.printStackTrace ();
System.out.println (e);
} else {
throw e;
}
}
ms = vwr.ms;
if (ms.ac == ac) return false;
var sb = ms.am[iModel].loadScript;
var s = JU.PT.rep (sb.toString (), "load mutate ", "mutate ({" + iatom + "})");
sb.setLength (0);
sb.append (s);
g = ms.at[ms.ac - 1].group;
if (g !== ms.at[ac + 1].group || !(Clazz.instanceOf (g, JM.AminoMonomer))) {
var bsAtoms =  new JU.BS ();
g.setAtomBits (bsAtoms);
vwr.deleteAtoms (bsAtoms, false);
return false;
}var res1 = g;
JM.BioExt.getMutationBackbone (res1, backbone);
JM.BioExt.replaceMutatedMonomer (vwr, res0, res1);
vwr.fm.setFileInfo (info);
return true;
}, "JV.Viewer,~N,~S");
c$.replaceMutatedMonomer = Clazz.defineMethod (c$, "replaceMutatedMonomer", 
 function (vwr, res0, res1) {
res1.setResno (res0.getResno ());
res1.chain.groupCount = 0;
res1.chain = res0.chain;
res1.chain.model.groupCount = -1;
res1.proteinStructure = res0.proteinStructure;
vwr.shm.replaceGroup (res0, res1);
var groups = res0.chain.groups;
for (var i = groups.length; --i >= 0; ) if (groups[i] === res0) {
groups[i] = res1;
break;
}
res1.bioPolymer = res0.bioPolymer;
if (res1.bioPolymer != null) {
var m = res1.bioPolymer.monomers;
for (var j = m.length; --j >= 0; ) if (m[j] === res0) {
m[j] = res1;
break;
}
}}, "JV.Viewer,JM.AminoMonomer,JM.AminoMonomer");
c$.getMutationBackbone = Clazz.defineMethod (c$, "getMutationBackbone", 
 function (res1, backbone) {
var b =  Clazz.newArray (-1, [res1.getCarbonylCarbonAtom (), res1.getCarbonylOxygenAtom (), res1.getLeadAtom (), res1.getNitrogenAtom (), res1.getExplicitNH ()]);
if (backbone == null) {
if (b[3].getCovalentHydrogenCount () > 1) b[4] = null;
} else {
for (var i = 0; i < 5; i++) {
var a0 = backbone[i];
var a1 = b[i];
if (a0 != null && a1 != null) a1.setT (a0);
}
}return b;
}, "JM.AminoMonomer,~A");
Clazz.defineMethod (c$, "getFullPDBHeader", 
function (auxiliaryInfo) {
var info = this.vwr.getCurrentFileAsString ("biomodel");
var ichMin = info.length;
for (var i = JM.BioExt.pdbRecords.length; --i >= 0; ) {
var ichFound;
var strRecord = JM.BioExt.pdbRecords[i];
switch (ichFound = (info.startsWith (strRecord) ? 0 : info.indexOf ("\n" + strRecord))) {
case -1:
continue;
case 0:
auxiliaryInfo.put ("fileHeader", "");
return "";
default:
if (ichFound < ichMin) ichMin = ++ichFound;
}
}
info = info.substring (0, ichMin);
auxiliaryInfo.put ("fileHeader", info);
return info;
}, "java.util.Map");
Clazz.defineMethod (c$, "getAminoAcidValenceAndCharge", 
function (res, name, ret) {
var valence = ret[4];
ret[4] = 0;
if (res == null || res.length == 0 || res.length > 3 || name.equals ("CA") || name.equals ("CB")) return false;
var ch0 = name.charAt (0);
var ch1 = (name.length == 1 ? '\0' : name.charAt (1));
var isSp2 = false;
var bondCount = ret[3];
switch (res.length) {
case 3:
if (name.length == 1) {
switch (ch0) {
case 'N':
if (bondCount > 1) return false;
ret[1] = 1;
break;
case 'O':
if (valence == 1) {
return true;
}isSp2 = ("HOH;DOD;WAT".indexOf (res) < 0);
break;
default:
isSp2 = true;
}
} else {
var id = res + ch0;
isSp2 = ("ARGN;ASNN;ASNO;ASPO;GLNN;GLNO;GLUO;HISN;HISC;PHECTRPC;TRPN;TYRC".indexOf (id) >= 0);
if ("LYSN".indexOf (id) >= 0) {
ret[1] = 1;
} else if (ch0 == 'O' && ch1 == 'X') {
ret[1] = -1;
}}break;
case 1:
case 2:
if (name.length > 2 && name.charAt (2) == '\'') return false;
switch (ch0) {
case 'C':
if (ch1 == '7') return false;
break;
case 'N':
switch (ch1) {
case '1':
case '3':
if ("A3;A1;C3;G3;I3".indexOf ("" + res.charAt (res.length - 1) + ch1) >= 0) ret[0]--;
break;
case '7':
ret[0]--;
break;
}
break;
}
isSp2 = true;
}
if (isSp2) {
ret[4] = ("ARGNE;ARGNH1;ASNNH2;GLNNE2;TRPNE1;HISNE2".indexOf (res + name) >= 0 ? 0 : 1);
switch (ch0) {
case 'N':
ret[2] = 2;
if (valence == 2 && bondCount == 1) ret[4]++;
break;
case 'C':
ret[2] = 2;
ret[0]--;
break;
case 'O':
if (valence == 2 && bondCount == 1) ret[4]--;
ret[0]--;
break;
}
}return true;
}, "~S,~S,~A");
Clazz.defineStatics (c$,
"qColor",  Clazz.newArray (-1, ["yellow", "orange", "purple"]),
"pdbRecords",  Clazz.newArray (-1, ["ATOM  ", "MODEL ", "HETATM"]),
"naNoH", "A3;A1;C3;G3;I3",
"aaSp2", "ARGN;ASNN;ASNO;ASPO;GLNN;GLNO;GLUO;HISN;HISC;PHECTRPC;TRPN;TYRC",
"aaSp21", "ARGNE;ARGNH1;ASNNH2;GLNNE2;TRPNE1;HISNE2",
"aaPlus", "LYSN");
});
