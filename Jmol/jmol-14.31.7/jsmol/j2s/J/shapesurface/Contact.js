Clazz.declarePackage ("J.shapesurface");
Clazz.load (["J.shapesurface.Isosurface", "JU.P3", "$.V3", "J.atomdata.RadiusData", "J.c.VDW"], "J.shapesurface.Contact", ["java.lang.Boolean", "$.Double", "$.Float", "java.util.Hashtable", "JU.BS", "$.CU", "$.Lst", "$.Measure", "J.atomdata.AtomData", "J.c.HB", "J.jvxl.data.JvxlCoder", "$.MeshData", "$.VolumeData", "JS.T", "JU.BSUtil", "$.BoxInfo", "$.ContactPair", "$.Escape", "$.Logger", "$.TempArray"], function () {
c$ = Clazz.decorateAsClass (function () {
this.displayType = 0;
this.atoms = null;
this.ac = 0;
this.minData = 0;
this.maxData = 0;
this.vZ = null;
this.vY = null;
this.vX = null;
this.pt1 = null;
this.pt2 = null;
Clazz.instantialize (this, arguments);
}, J.shapesurface, "Contact", J.shapesurface.Isosurface);
Clazz.prepareFields (c$, function () {
this.vZ =  new JU.V3 ();
this.vY =  new JU.V3 ();
this.vX =  new JU.V3 ();
this.pt1 =  new JU.P3 ();
this.pt2 =  new JU.P3 ();
});
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapesurface.Contact, "initShape", []);
this.myType = "contact";
});
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
return this.getPropC (property, index);
}, "~S,~N");
Clazz.defineMethod (c$, "getPropC", 
function (property, index) {
var thisMesh = this.thisMesh;
if (index >= 0 && (index >= this.meshCount || (thisMesh = this.isomeshes[index]) == null)) return null;
if (property === "jvxlFileInfo") {
thisMesh.setJvxlColorMap (false);
if (this.displayType == 134217750) {
J.jvxl.data.JvxlCoder.jvxlCreateColorData (this.jvxlData, thisMesh.vvs);
var minmax = thisMesh.getDataMinMax ();
this.jvxlData.mappedDataMin = minmax[0];
this.jvxlData.mappedDataMax = minmax[1];
}return J.jvxl.data.JvxlCoder.jvxlGetInfo (this.jvxlData);
}return this.getPropI (property, index);
}, "~S,~N");
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("set" === propertyName) {
this.setContacts (value, !this.vwr.getBoolean (603979965));
return;
}if ("init" === propertyName) {
this.translucentLevel = 0;
}this.setPropI (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "setContacts", 
 function (value, doEditCpList) {
var contactType = (value[0]).intValue ();
var displayType = (value[1]).intValue ();
var colorDensity = (value[2]).booleanValue ();
var colorByType = (value[3]).booleanValue ();
var bsA = value[4];
var bsB = value[5];
var rd = value[6];
var saProbeRadius = (value[7]).floatValue ();
var parameters = value[8];
var modelIndex = (value[9]).intValue ();
var command = value[10];
if (Float.isNaN (saProbeRadius)) saProbeRadius = 0;
if (rd == null) rd =  new J.atomdata.RadiusData (null, saProbeRadius, J.atomdata.RadiusData.EnumType.OFFSET, J.c.VDW.AUTO);
if (colorDensity) {
switch (displayType) {
case 1073741961:
case 1275068932:
case 134217750:
displayType = 1275068932;
break;
case 4106:
case 1073742036:
case 2097180:
case 1073742135:
break;
case 1073741875:
colorDensity = false;
break;
}
}var bs;
this.ac = this.vwr.ms.ac;
this.atoms = this.vwr.ms.at;
var intramolecularMode = Clazz.floatToInt (parameters == null || parameters.length < 2 ? 0 : parameters[1]);
var ptSize = (colorDensity && parameters != null && parameters[0] < 0 ? Math.abs (parameters[0]) : 0.15);
if (JU.Logger.debugging) {
JU.Logger.debug ("Contact intramolecularMode " + intramolecularMode);
JU.Logger.debug ("Contacts for " + bsA.cardinality () + ": " + JU.Escape.eBS (bsA));
JU.Logger.debug ("Contacts to " + bsB.cardinality () + ": " + JU.Escape.eBS (bsB));
}this.setPropI ("newObject", null, null);
this.thisMesh.setMerged (true);
this.thisMesh.nSets = 0;
this.thisMesh.info = null;
var func = null;
var fullyLit = true;
switch (displayType) {
case 1073741961:
func = "(a>b?a:b)";
break;
case 134217750:
case 1073741875:
func = "a-b";
break;
case 4106:
func = "a+b";
break;
}
switch (displayType) {
case 1073742036:
colorByType = fullyLit = false;
bs = JU.BSUtil.copy (bsA);
bs.or (bsB);
if (parameters[0] < 0) parameters[0] = 0;
this.sg.params.colorDensity = colorDensity;
this.sg.params.bsSelected = bs;
this.sg.params.bsSolvent = bsB;
this.sg.setProp ("parameters", parameters, null);
this.setPropI ("nci", Boolean.TRUE, null);
break;
case 1073742135:
case 2097180:
colorByType = fullyLit = false;
this.thisMesh.nSets = 1;
this.newSurface (2097180, null, bsA, bsB, rd, null, null, colorDensity, null, saProbeRadius);
break;
case 1073741875:
colorByType = fullyLit = false;
this.thisMesh.nSets = 1;
this.newSurface (554176565, null, bsA, bsB, rd, null, null, false, null, 0);
this.sg.initState ();
this.newSurface (134217750, null, bsA, bsB, rd, parameters, func, colorDensity, this.sg.volumeDataTemp, 0);
this.mergeMesh (null);
break;
case 1073741961:
case 1275068932:
colorByType = false;
this.newSurface (1275068932, null, bsA, bsB, rd, null, null, colorDensity, null, 0);
if (displayType == 1073741961) {
this.sg.initState ();
this.newSurface (1275068932, null, bsB, bsA, rd, parameters, func, colorDensity, null, 0);
this.mergeMesh (null);
} else {
var meshData =  new J.jvxl.data.MeshData ();
this.fillMeshData (meshData, 1, null);
meshData.getSurfaceSet ();
this.fillMeshData (meshData, 3, null);
}break;
case 4106:
case 134217750:
var volume = 0;
var pairs = this.getPairs (bsA, bsB, rd, intramolecularMode, doEditCpList);
this.thisMesh.info = pairs;
volume += this.combineSurfaces (pairs, contactType, displayType, parameters, func, colorDensity, colorByType);
this.thisMesh.calculatedVolume = Float.$valueOf (volume);
this.mergeMesh (null);
break;
}
this.thisMesh.setMerged (false);
if (modelIndex != -2147483648) this.thisMesh.modelIndex = modelIndex;
this.thisMesh.jvxlData.vertexDataOnly = true;
this.thisMesh.reinitializeLightingAndColor (this.vwr);
if (contactType != 1073742036) {
this.thisMesh.bsVdw =  new JU.BS ();
this.thisMesh.bsVdw.or (bsA);
this.thisMesh.bsVdw.or (bsB);
}this.setPropI ("finalize", command, null);
if (colorDensity) {
this.setPropI ("pointSize", Float.$valueOf (ptSize), null);
} else {
this.setPropI ("token", Integer.$valueOf (fullyLit ? 1073741964 : 1073741958), null);
}if (this.thisMesh.slabOptions != null) {
this.thisMesh.slabOptions = null;
this.thisMesh.polygonCount0 = -1;
}this.discardTempData (true);
var defaultColor = null;
switch (contactType) {
case 1613238294:
defaultColor = "lightgreen";
break;
case 1073741881:
defaultColor = "yellow";
break;
case 2097180:
defaultColor = "skyblue";
break;
}
var ce = null;
if (colorByType) {
ce = this.vwr.cm.getColorEncoder ("rwb");
ce.setRange (-0.5, 0.5, false);
} else if (defaultColor != null) {
this.setPropI ("color", Integer.$valueOf (JU.CU.getArgbFromString (defaultColor)), null);
} else if (displayType == 1073742036) {
ce = this.vwr.cm.getColorEncoder ("bgr");
ce.setRange (-0.03, 0.03, false);
} else {
ce = this.vwr.cm.getColorEncoder ("rgb");
if (colorDensity) ce.setRange (-0.3, 0.3, false);
 else ce.setRange (-0.5, 1, false);
}if (ce != null) this.thisMesh.remapColors (this.vwr, ce, this.translucentLevel);
}, "~A,~B");
Clazz.defineMethod (c$, "combineSurfaces", 
 function (pairs, contactType, displayType, parameters, func, isColorDensity, colorByType) {
var volumeData =  new J.jvxl.data.VolumeData ();
var logLevel = JU.Logger.getLogLevel ();
JU.Logger.setLogLevel (0);
var resolution = this.sg.params.resolution;
var nContacts = pairs.size ();
var volume = 0;
if (displayType == 1073741961 && resolution == 3.4028235E38) resolution = (nContacts > 1000 ? 3 : 10);
var box =  new JU.BoxInfo ();
for (var i = nContacts; --i >= 0; ) {
var cp = pairs.get (i);
var oldScore = cp.score;
var isVdwClash = (displayType == 134217750 && (contactType == 1648363544 || contactType == 0) && cp.setForVdwClash (true));
if (isVdwClash) cp.score = 0;
if (contactType != 0 && cp.contactType != contactType) continue;
var nV = this.thisMesh.vc;
this.thisMesh.nSets++;
if (contactType != 0 || cp.contactType != 1648363544) volume += cp.volume;
this.setVolumeData (displayType, volumeData, cp, resolution, nContacts);
switch (displayType) {
case 1073741961:
this.newSurface (displayType, cp, null, null, null, null, func, isColorDensity, volumeData, 0);
cp.switchAtoms ();
this.newSurface (displayType, cp, null, null, null, null, null, isColorDensity, volumeData, 0);
break;
case 1275068932:
case 134217750:
case 4106:
this.newSurface (displayType, cp, null, null, null, parameters, func, isColorDensity, volumeData, 0);
if (isVdwClash && cp.setForVdwClash (false)) {
if (colorByType) nV = this.setColorByScore (cp.score, nV);
cp.score = oldScore;
volume += cp.volume;
this.newSurface (displayType, cp, null, null, null, parameters, func, isColorDensity, volumeData, 0);
}break;
}
if (i > 0 && (i % 1000) == 0 && logLevel == 4) {
JU.Logger.setLogLevel (4);
JU.Logger.info ("contact..." + i);
JU.Logger.setLogLevel (0);
}if (colorByType) this.setColorByScore ((cp.contactType == 1613238294 ? 4 : cp.score), nV);
for (var j = this.thisMesh.vc; --j >= 0; ) box.addBoundBoxPoint (this.thisMesh.vs[j]);

}
JU.Logger.setLogLevel (logLevel);
if (this.jvxlData.boundingBox == null) {
System.out.println ("???");
} else {
this.jvxlData.boundingBox[0] = box.bbCorner0;
this.jvxlData.boundingBox[1] = box.bbCorner1;
}this.displayType = displayType;
return volume;
}, "JU.Lst,~N,~N,~A,~O,~B,~B");
Clazz.defineMethod (c$, "setColorByScore", 
 function (score, nV) {
for (var iv = this.thisMesh.vc; --iv >= nV; ) this.thisMesh.vvs[iv] = score;

return this.thisMesh.vc;
}, "~N,~N");
Clazz.defineMethod (c$, "getPairs", 
 function (bsA, bsB, rd, intramolecularMode, doEditCpList) {
var list =  new JU.Lst ();
var ad =  new J.atomdata.AtomData ();
ad.radiusData = rd;
var bs = JU.BSUtil.copy (bsA);
bs.or (bsB);
if (bs.isEmpty ()) return list;
ad.bsSelected = bs;
var iModel = this.atoms[bs.nextSetBit (0)].mi;
var isMultiModel = (iModel != this.atoms[bs.length () - 1].mi);
ad.modelIndex = (isMultiModel ? -1 : iModel);
var isSelf = bsA.equals (bsB);
this.vwr.fillAtomData (ad, 2 | (isMultiModel ? 16 : 0) | 4);
var maxRadius = 0;
for (var ib = bsB.nextSetBit (0); ib >= 0; ib = bsB.nextSetBit (ib + 1)) if (ad.atomRadius[ib] > maxRadius) maxRadius = ad.atomRadius[ib];

var iter = this.vwr.getSelectedAtomIterator (bsB, isSelf, false, isMultiModel);
for (var ia = bsA.nextSetBit (0); ia >= 0; ia = bsA.nextSetBit (ia + 1)) {
var atomA = this.atoms[ia];
var vdwA = atomA.getVanderwaalsRadiusFloat (this.vwr, J.c.VDW.AUTO);
if (isMultiModel) this.vwr.setIteratorForPoint (iter, -1, ad.atoms[ia], ad.atomRadius[ia] + maxRadius);
 else this.vwr.setIteratorForAtom (iter, ia, ad.atomRadius[ia] + maxRadius);
while (iter.hasNext ()) {
var ib = iter.next ();
if (isMultiModel && !bsB.get (ib)) continue;
var atomB = this.atoms[ib];
var isSameMolecule = (ad.atomMolecule[ia] == ad.atomMolecule[ib]);
if (ia == ib || isSameMolecule && this.isWithinFourBonds (atomA, atomB)) continue;
switch (intramolecularMode) {
case 0:
break;
case 1:
case 2:
if (isSameMolecule != (intramolecularMode == 1)) continue;
}
var vdwB = atomB.getVanderwaalsRadiusFloat (this.vwr, J.c.VDW.AUTO);
var ra = ad.atomRadius[ia];
var rb = ad.atomRadius[ib];
var d = atomA.distance (atomB);
if (d > ra + rb) continue;
var cp =  new JU.ContactPair (this.atoms, ia, ib, ra, rb, vdwA, vdwB);
if (cp.score < 0) J.shapesurface.Contact.getVdwClashRadius (cp, ra - vdwA, vdwA, vdwB, d);
var typeA = J.c.HB.getType (atomA);
var typeB = (typeA === J.c.HB.NOT ? J.c.HB.NOT : J.c.HB.getType (atomB));
var isHBond = J.c.HB.isPossibleHBond (typeA, typeB);
var hbondCutoff = (atomA.getElementNumber () == 1 || atomB.getElementNumber () == 1 ? -1.2 : -1.0);
if (isHBond && cp.score < hbondCutoff) isHBond = false;
if (isHBond && cp.score < 0) cp.contactType = 1613238294;
list.addLast (cp);
}
}
iter.release ();
iter = null;
if (!doEditCpList) return list;
var n = list.size () - 1;
var bsBad =  new JU.BS ();
for (var i = 0; i < n; i++) {
var cp1 = list.get (i);
for (var j = i + 1; j <= n; j++) {
var cp2 = list.get (j);
for (var m = 0; m < 2; m++) {
for (var p = 0; p < 2; p++) {
switch (J.shapesurface.Contact.checkCp (cp1, cp2, m, p)) {
case 1:
bsBad.set (i);
break;
case 2:
bsBad.set (j);
break;
default:
}
}
}
}
}
for (var i = bsBad.length (); --i >= 0; ) if (bsBad.get (i)) list.removeItemAt (i);

if (JU.Logger.debugging) for (var i = 0; i < list.size (); i++) JU.Logger.debug (list.get (i).toString ());

JU.Logger.info ("Contact pairs: " + list.size ());
return list;
}, "JU.BS,JU.BS,J.atomdata.RadiusData,~N,~B");
Clazz.defineMethod (c$, "isWithinFourBonds", 
 function (atomA, atomB) {
if (atomA.mi != atomB.mi) return false;
if (atomA.isCovalentlyBonded (atomB)) return true;
var bondsOther = atomB.bonds;
var bonds = atomA.bonds;
if (bondsOther != null && bonds != null) for (var i = 0; i < bondsOther.length; i++) {
var atom2 = bondsOther[i].getOtherAtom (atomB);
if (atomA.isCovalentlyBonded (atom2)) return true;
for (var j = 0; j < bonds.length; j++) if (bonds[j].getOtherAtom (atomA).isCovalentlyBonded (atom2)) return true;

}
return false;
}, "JM.Atom,JM.Atom");
c$.checkCp = Clazz.defineMethod (c$, "checkCp", 
 function (cp1, cp2, i1, i2) {
if (cp1.myAtoms[i1] !== cp2.myAtoms[i2]) return 0;
var clash1 = (cp1.pt.distance (cp2.myAtoms[1 - i2]) < cp2.radii[1 - i2]);
var clash2 = (cp2.pt.distance (cp1.myAtoms[1 - i1]) < cp1.radii[1 - i1]);
return (!clash1 && !clash2 ? 0 : cp1.score > cp2.score ? 1 : 2);
}, "JU.ContactPair,JU.ContactPair,~N,~N");
Clazz.defineMethod (c$, "newSurface", 
 function (displayType, cp, bs1, bs2, rd, parameters, func, isColorDensity, volumeData, sasurfaceRadius) {
var params = this.sg.params;
params.isSilent = true;
if (cp == null) {
bs2.andNot (bs1);
if (bs1.isEmpty () || bs2.isEmpty ()) return;
} else {
params.contactPair = cp;
}var iSlab0 = 0;
var iSlab1 = 0;
this.sg.initState ();
switch (displayType) {
case 1073742135:
case 2097180:
case 554176565:
case 1275068932:
case 1073741961:
var rdA;
var rdB;
if (displayType == 2097180) {
rdA = J.shapesurface.Contact.rdVDW;
rdB =  new J.atomdata.RadiusData (null, (rd.factorType === J.atomdata.RadiusData.EnumType.OFFSET ? rd.value * 2 : (rd.value - 1) * 2 + 1), rd.factorType, rd.vdwType);
} else {
rdA = rdB = rd;
}params.colorDensity = isColorDensity;
if (isColorDensity) {
this.setPropI ("cutoffRange",  Clazz.newFloatArray (-1, [-100.0, 0]), null);
}if (cp == null) {
params.atomRadiusData = rdA;
params.bsIgnore = JU.BSUtil.copyInvert (bs1, this.ac);
params.bsSelected = bs1;
params.bsSolvent = null;
}params.volumeData = volumeData;
this.setPropI ("sasurface", Float.$valueOf (sasurfaceRadius), null);
this.setPropI ("map", Boolean.TRUE, null);
if (cp == null) {
params.atomRadiusData = rdB;
params.bsIgnore = JU.BSUtil.copyInvert (bs2, this.ac);
params.bsSelected = bs2;
}params.volumeData = volumeData;
this.setPropI ("sasurface", Float.$valueOf (sasurfaceRadius), null);
switch (displayType) {
case 1073741961:
case 1275068932:
iSlab0 = -100;
break;
case 1073742135:
case 2097180:
if (isColorDensity) iSlab0 = -100;
break;
case 554176565:
iSlab1 = -100;
}
break;
case 134217750:
case 4106:
if (displayType == 4106) this.sg.setProp ("parameters", parameters, null);
if (cp == null) {
params.atomRadiusData = rd;
params.bsIgnore = JU.BSUtil.copyInvert (bs2, this.ac);
params.bsIgnore.andNot (bs1);
}params.func = func;
params.intersection =  Clazz.newArray (-1, [bs1, bs2]);
params.volumeData = volumeData;
params.colorDensity = isColorDensity;
if (isColorDensity) this.setPropI ("cutoffRange",  Clazz.newFloatArray (-1, [-5.0, 0]), null);
this.setPropI ("sasurface", Float.$valueOf (0), null);
this.setPropI ("map", Boolean.TRUE, null);
params.volumeData = volumeData;
this.setPropI ("sasurface", Float.$valueOf (0), null);
if (displayType == 134217750) {
iSlab0 = -100;
}break;
}
if (iSlab0 != iSlab1) this.thisMesh.getMeshSlicer ().slabPolygons (JU.TempArray.getSlabWithinRange (iSlab0, iSlab1), false);
if (displayType != 2097180) this.thisMesh.setMerged (true);
}, "~N,JU.ContactPair,JU.BS,JU.BS,J.atomdata.RadiusData,~A,~O,~B,J.jvxl.data.VolumeData,~N");
Clazz.defineMethod (c$, "setVolumeData", 
 function (type, volumeData, cp, resolution, nPairs) {
this.pt1.setT (cp.myAtoms[0]);
this.pt2.setT (cp.myAtoms[1]);
this.vX.sub2 (this.pt2, this.pt1);
var dAB = this.vX.length ();
var dYZ = (cp.radii[0] * cp.radii[0] + dAB * dAB - cp.radii[1] * cp.radii[1]) / (2 * dAB * cp.radii[0]);
dYZ = 2.1 * (cp.radii[0] * Math.sin (Math.acos (dYZ)));
JU.Measure.getNormalToLine (this.pt1, this.pt2, this.vZ);
this.vZ.scale (dYZ);
this.vY.cross (this.vZ, this.vX);
this.vY.normalize ();
this.vY.scale (dYZ);
if (type != 4106) {
this.vX.normalize ();
this.pt1.scaleAdd2 ((dAB - cp.radii[1]) * 0.95, this.vX, this.pt1);
this.pt2.scaleAdd2 ((cp.radii[0] - dAB) * 0.95, this.vX, this.pt2);
this.vX.sub2 (this.pt2, this.pt1);
}if (resolution == 3.4028235E38) resolution = (nPairs > 100 ? 3 : 10);
var nX = Math.max (5, Clazz.doubleToInt (Math.floor (this.pt1.distance (this.pt2) * resolution + 1)));
if ((nX % 2) == 0) nX++;
var nYZ = Math.max (7, Clazz.doubleToInt (Math.floor (dYZ * resolution + 1)));
if ((nYZ % 2) == 0) nYZ++;
volumeData.setVoxelCounts (nX, nYZ, nYZ);
this.pt1.scaleAdd2 (-0.5, this.vY, this.pt1);
this.pt1.scaleAdd2 (-0.5, this.vZ, this.pt1);
volumeData.setVolumetricOrigin (this.pt1.x, this.pt1.y, this.pt1.z);
this.vX.scale (1 / (nX - 1));
this.vY.scale (1 / (nYZ - 1));
this.vZ.scale (1 / (nYZ - 1));
volumeData.setVolumetricVector (0, this.vX.x, this.vX.y, this.vX.z);
volumeData.setVolumetricVector (1, this.vY.x, this.vY.y, this.vY.z);
volumeData.setVolumetricVector (2, this.vZ.x, this.vZ.y, this.vZ.z);
}, "~N,J.jvxl.data.VolumeData,JU.ContactPair,~N,~N");
Clazz.defineMethod (c$, "mergeMesh", 
 function (md) {
this.thisMesh.merge (md);
if (this.minData == 3.4028235E38) {
} else if (this.jvxlData.mappedDataMin == 3.4028235E38) {
this.jvxlData.mappedDataMin = this.minData;
this.jvxlData.mappedDataMax = this.maxData;
} else {
this.jvxlData.mappedDataMin = Math.min (this.minData, this.jvxlData.mappedDataMin);
this.jvxlData.mappedDataMax = Math.max (this.maxData, this.jvxlData.mappedDataMax);
}this.minData = this.jvxlData.mappedDataMin;
this.maxData = this.jvxlData.mappedDataMax;
this.jvxlData.valueMappedToBlue = this.minData;
this.jvxlData.valueMappedToRed = this.maxData;
}, "J.jvxl.data.MeshData");
Clazz.overrideMethod (c$, "addMeshInfo", 
function (mesh, info) {
if (mesh.info == null) return;
var pairInfo =  new JU.Lst ();
info.put ("pairInfo", pairInfo);
var list = mesh.info;
for (var i = 0; i < list.size (); i++) {
var cpInfo =  new java.util.Hashtable ();
pairInfo.addLast (cpInfo);
var cp = list.get (i);
cpInfo.put ("type", JS.T.nameOf (cp.contactType));
cpInfo.put ("volume", Double.$valueOf (cp.volume));
cpInfo.put ("vdwVolume", Double.$valueOf (cp.vdwVolume));
if (!Float.isNaN (cp.xVdwClash)) {
cpInfo.put ("xVdwClash", Double.$valueOf (cp.xVdwClash));
}cpInfo.put ("score", Double.$valueOf (cp.score));
cpInfo.put ("atoms", cp.myAtoms);
cpInfo.put ("radii", cp.radii);
cpInfo.put ("vdws", cp.vdws);
}
}, "J.shapesurface.IsosurfaceMesh,java.util.Map");
c$.getVdwClashRadius = Clazz.defineMethod (c$, "getVdwClashRadius", 
 function (cp, x0, vdwA, vdwB, d) {
var sum = vdwA + vdwB;
var dif2 = vdwA - vdwB;
dif2 *= dif2;
var v0_nopi = x0 * x0 * (sum + 1.3333333333333333 * x0 - dif2 / sum);
cp.vdwVolume = cp.volume - v0_nopi * 3.141592653589793;
var a = (sum - d);
var b = d + 2 * sum - 3 * dif2 / d;
var c = v0_nopi * 12;
var a2 = a * a;
var a3 = a * a2;
var b2 = b * b;
var b3 = b * b2;
var f = -a * 2 / 3 - b / 6;
var g = (4 * a2 - 4 * a * b + b2) / 36;
var v = a3 / 27 - a2 * b / 18 + a * b2 / 36 - b3 / 216 + c / 4;
var u = -c / 432 * (8 * a3 - 12 * a2 * b + 6 * a * b2 - b3 + 27 * c);
var theta = Math.atan2 (Math.sqrt (u), v);
var vvu = Math.pow (v * v + u, 0.16666666666666666);
var costheta = Math.cos (theta / 3);
var x;
x = f + (g / vvu + vvu) * costheta;
if (x > 0) {
cp.xVdwClash = ((x / 2));
}}, "JU.ContactPair,~N,~N,~N,~N");
c$.rdVDW = c$.prototype.rdVDW =  new J.atomdata.RadiusData (null, 1, J.atomdata.RadiusData.EnumType.FACTOR, J.c.VDW.AUTO);
});
