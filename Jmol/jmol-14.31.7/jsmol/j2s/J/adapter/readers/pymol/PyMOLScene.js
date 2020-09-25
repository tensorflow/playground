Clazz.declarePackage ("J.adapter.readers.pymol");
Clazz.load (["J.api.JmolSceneGenerator", "java.util.Hashtable", "JU.BS", "$.Lst", "$.P3"], "J.adapter.readers.pymol.PyMOLScene", ["java.lang.Boolean", "$.Double", "$.Float", "JU.AU", "$.CU", "$.PT", "$.SB", "J.adapter.readers.pymol.JmolObject", "$.PyMOL", "$.PyMOLGroup", "$.PyMOLReader", "J.atomdata.RadiusData", "J.c.VDW", "JM.Text", "JU.BSUtil", "$.C", "$.Escape", "$.Logger", "$.Point3fi"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.pymolVersion = 0;
this.bsHidden = null;
this.bsNucleic = null;
this.bsNonbonded = null;
this.bsLabeled = null;
this.bsHydrogen = null;
this.bsNoSurface = null;
this.htSpacefill = null;
this.ssMapAtom = null;
this.atomColorList = null;
this.occludedObjects = null;
this.labels = null;
this.colixes = null;
this.frameObj = null;
this.groups = null;
this.objectSettings = null;
this.bsCartoon = null;
this.htCarveSets = null;
this.htDefinedAtoms = null;
this.htHiddenObjects = null;
this.moleculeNames = null;
this.jmolObjects = null;
this.htAtomMap = null;
this.htObjectAtoms = null;
this.htObjectGroups = null;
this.htMeasures = null;
this.htObjectSettings = null;
this.objectInfo = null;
this.settings = null;
this.htStateSettings = null;
this.stateSettings = null;
this.uniqueSettings = null;
this.uniqueList = null;
this.bsUniqueBonds = null;
this.bgRgb = 0;
this.dotColor = 0;
this.surfaceMode = 0;
this.surfaceColor = 0;
this.cartoonColor = 0;
this.ribbonColor = 0;
this.sphereColor = 0;
this.labelFontId = 0;
this.labelColor = 0;
this.cartoonTranslucency = 0;
this.ribbonTranslucency = 0;
this.labelSize = 0;
this.meshWidth = 0;
this.nonbondedSize = 0;
this.nonbondedTranslucency = 0;
this.sphereScale = 0;
this.sphereTranslucency = 0;
this.stickTranslucency = 0;
this.transparency = 0;
this.cartoonLadderMode = false;
this.cartoonRockets = false;
this.haveNucleicLadder = false;
this.labelPosition = null;
this.labelPosition0 = null;
this.objectName = null;
this.objectNameID = null;
this.objectJmolName = null;
this.objectType = 0;
this.bsAtoms = null;
this.objectHidden = false;
this.reader = null;
this.uniqueIDs = null;
this.cartoonTypes = null;
this.sequenceNumbers = null;
this.newChain = null;
this.radii = null;
this.baseModelIndex = 0;
this.baseAtomIndex = 0;
this.stateCount = 0;
this.mepList = "";
this.doCache = false;
this.haveScenes = false;
this.bsCarve = null;
this.solventAccessible = false;
this.bsLineBonds = null;
this.bsStickBonds = null;
this.thisState = 0;
this.currentAtomSetIndex = 0;
this.surfaceInfoName = null;
this.ptTemp = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.pymol, "PyMOLScene", null, J.api.JmolSceneGenerator);
Clazz.prepareFields (c$, function () {
this.bsHidden =  new JU.BS ();
this.bsNucleic =  new JU.BS ();
this.bsNonbonded =  new JU.BS ();
this.bsLabeled =  new JU.BS ();
this.bsHydrogen =  new JU.BS ();
this.bsNoSurface =  new JU.BS ();
this.htSpacefill =  new java.util.Hashtable ();
this.ssMapAtom =  new java.util.Hashtable ();
this.atomColorList =  new JU.Lst ();
this.occludedObjects =  new java.util.Hashtable ();
this.labels =  new java.util.Hashtable ();
this.bsCartoon =  new JU.BS ();
this.htCarveSets =  new java.util.Hashtable ();
this.htDefinedAtoms =  new java.util.Hashtable ();
this.htHiddenObjects =  new java.util.Hashtable ();
this.moleculeNames =  new JU.Lst ();
this.jmolObjects =  new JU.Lst ();
this.htAtomMap =  new java.util.Hashtable ();
this.htObjectAtoms =  new java.util.Hashtable ();
this.htObjectGroups =  new java.util.Hashtable ();
this.htMeasures =  new java.util.Hashtable ();
this.htObjectSettings =  new java.util.Hashtable ();
this.objectInfo =  new java.util.Hashtable ();
this.htStateSettings =  new java.util.Hashtable ();
this.labelPosition0 =  new JU.P3 ();
this.bsLineBonds =  new JU.BS ();
this.bsStickBonds =  new JU.BS ();
this.ptTemp =  new JU.P3 ();
});
Clazz.defineMethod (c$, "clearReaderData", 
 function () {
this.reader = null;
this.colixes = null;
this.atomColorList = null;
this.objectSettings = null;
this.stateSettings = null;
if (this.haveScenes) return;
this.settings = null;
this.groups = null;
this.labels = null;
this.ssMapAtom = null;
this.htSpacefill = null;
this.htAtomMap = null;
this.htMeasures = null;
this.htObjectGroups = null;
this.htObjectAtoms = null;
this.htObjectSettings = null;
this.htStateSettings = null;
this.htHiddenObjects = null;
this.objectInfo = null;
this.occludedObjects = null;
this.bsHidden = this.bsNucleic = this.bsNonbonded = this.bsLabeled = this.bsHydrogen = this.bsNoSurface = this.bsCartoon = null;
});
Clazz.defineMethod (c$, "setUniqueBond", 
function (index, uniqueID) {
if (uniqueID < 0) return;
if (this.uniqueList == null) {
this.uniqueList =  new java.util.Hashtable ();
this.bsUniqueBonds =  new JU.BS ();
}this.uniqueList.put (Integer.$valueOf (index), Integer.$valueOf (uniqueID));
this.bsUniqueBonds.set (index);
}, "~N,~N");
Clazz.defineMethod (c$, "setStateCount", 
function (stateCount) {
this.stateCount = stateCount;
}, "~N");
Clazz.makeConstructor (c$, 
function (reader, vwr, settings, uniqueSettings, pymolVersion, haveScenes, baseAtomIndex, baseModelIndex, doCache, filePath) {
this.reader = reader;
this.vwr = vwr;
this.settings = settings;
this.uniqueSettings = uniqueSettings;
this.pymolVersion = pymolVersion;
this.haveScenes = haveScenes;
this.baseAtomIndex = baseAtomIndex;
this.baseModelIndex = baseModelIndex;
this.doCache = doCache;
this.surfaceInfoName = filePath + "##JmolSurfaceInfo##";
this.setVersionSettings ();
settings.trimToSize ();
this.bgRgb = this.colorSetting (6);
this.labelPosition0 = this.pointSetting (471);
}, "J.api.PymolAtomReader,JV.Viewer,JU.Lst,java.util.Map,~N,~B,~N,~N,~B,~S");
Clazz.defineMethod (c$, "colorSetting", 
 function (i) {
var pos = J.adapter.readers.pymol.PyMOLReader.listAt (this.settings, i);
var o = (pos == null || pos.size () != 3 ? null : pos.get (2));
if (o == null) return Clazz.floatToInt (J.adapter.readers.pymol.PyMOL.getDefaultSetting (i, this.pymolVersion));
return (Clazz.instanceOf (o, Integer) ? (o).intValue () : JU.CU.colorPtToFFRGB (J.adapter.readers.pymol.PyMOLReader.pointAt (o, 0, this.ptTemp)));
}, "~N");
Clazz.defineMethod (c$, "pointSetting", 
 function (i) {
var pt =  new JU.P3 ();
var pos = J.adapter.readers.pymol.PyMOLReader.listAt (this.settings, i);
if (pos != null && pos.size () == 3) return J.adapter.readers.pymol.PyMOLReader.pointAt (pos.get (2), 0, pt);
return J.adapter.readers.pymol.PyMOL.getDefaultSettingPt (i, this.pymolVersion, pt);
}, "~N");
Clazz.defineMethod (c$, "ensureCapacity", 
function (n) {
this.atomColorList.ensureCapacity (this.atomColorList.size () + n);
}, "~N");
Clazz.defineMethod (c$, "setReaderObjectInfo", 
function (name, type, groupName, isHidden, listObjSettings, listStateSettings, ext) {
this.objectName = name;
this.objectHidden = isHidden;
this.objectNameID = (this.objectName == null ? null : this.fixName (this.objectName + ext));
this.objectSettings =  new java.util.Hashtable ();
this.stateSettings =  new java.util.Hashtable ();
if (this.objectName != null) {
this.objectJmolName = this.getJmolName (name);
if (groupName != null) {
this.htObjectGroups.put (this.objectName, groupName);
this.htObjectGroups.put (this.objectNameID, groupName);
}this.objectInfo.put (this.objectName,  Clazz.newArray (-1, [this.objectNameID, Integer.$valueOf (type)]));
if (this.htObjectSettings.get (this.objectName) == null) {
this.listToSettings (listObjSettings, this.objectSettings);
this.htObjectSettings.put (this.objectName, this.objectSettings);
}if (this.htStateSettings.get (this.objectNameID) == null) {
this.listToSettings (listStateSettings, this.stateSettings);
this.htStateSettings.put (this.objectNameID, this.stateSettings);
}}this.getObjectSettings ();
}, "~S,~N,~S,~B,JU.Lst,JU.Lst,~S");
Clazz.defineMethod (c$, "listToSettings", 
 function (list, objectSettings) {
if (list != null && list.size () != 0) {
for (var i = list.size (); --i >= 0; ) {
var setting = list.get (i);
objectSettings.put (setting.get (0), setting);
}
}}, "JU.Lst,java.util.Map");
Clazz.defineMethod (c$, "getObjectSettings", 
 function () {
this.transparency = this.floatSetting (138);
this.dotColor = Clazz.floatToInt (this.floatSetting (210));
this.nonbondedSize = this.floatSetting (65);
this.nonbondedTranslucency = this.floatSetting (524);
this.sphereScale = this.floatSetting (155);
this.cartoonColor = Clazz.floatToInt (this.floatSetting (236));
this.ribbonColor = Clazz.floatToInt (this.floatSetting (235));
this.sphereColor = Clazz.floatToInt (this.floatSetting (173));
this.cartoonTranslucency = this.floatSetting (279);
this.ribbonTranslucency = this.floatSetting (666);
this.stickTranslucency = this.floatSetting (198);
this.sphereTranslucency = this.floatSetting (172);
this.cartoonLadderMode = this.booleanSetting (448);
this.cartoonRockets = this.booleanSetting (180);
this.surfaceMode = Clazz.floatToInt (this.floatSetting (143));
this.surfaceColor = Clazz.floatToInt (this.floatSetting (144));
this.solventAccessible = this.booleanSetting (338);
this.meshWidth = this.floatSetting (90);
var carveSet = this.stringSetting (342).trim ();
if (carveSet.length == 0) {
this.bsCarve = null;
} else {
this.bsCarve = this.htCarveSets.get (carveSet);
if (this.bsCarve == null) this.htCarveSets.put (carveSet, this.bsCarve =  new JU.BS ());
}this.labelPosition =  new JU.P3 ();
try {
var setting = this.getObjectSetting (471);
J.adapter.readers.pymol.PyMOLReader.pointAt (J.adapter.readers.pymol.PyMOLReader.listAt (setting, 2), 0, this.labelPosition);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.labelPosition.add (this.labelPosition0);
this.labelColor = Clazz.floatToInt (this.floatSetting (66));
this.labelSize = this.floatSetting (453);
this.labelFontId = Clazz.floatToInt (this.floatSetting (328));
});
Clazz.defineMethod (c$, "setAtomInfo", 
function (uniqueIDs, cartoonTypes, sequenceNumbers, newChain, radii) {
this.uniqueIDs = uniqueIDs;
this.cartoonTypes = cartoonTypes;
this.sequenceNumbers = sequenceNumbers;
this.newChain = newChain;
this.radii = radii;
}, "~A,~A,~A,~A,~A");
Clazz.defineMethod (c$, "setSceneObject", 
 function (name, istate) {
this.objectName = name;
this.objectType = this.getObjectType (name);
this.objectJmolName = this.getJmolName (name);
this.objectNameID = (istate == 0 && this.objectType != 0 ? this.getObjectID (name) : this.objectJmolName + "_" + istate);
this.bsAtoms = this.htObjectAtoms.get (name);
this.objectSettings = this.htObjectSettings.get (name);
this.stateSettings = this.htStateSettings.get (name + "_" + istate);
var groupName = this.htObjectGroups.get (name);
this.objectHidden = (this.htHiddenObjects.containsKey (name) || groupName != null && !this.groups.get (groupName).visible);
this.getObjectSettings ();
}, "~S,~N");
Clazz.defineMethod (c$, "buildScene", 
function (name, thisScene, htObjNames, htSecrets) {
var frame = thisScene.get (2);
var smap =  new java.util.Hashtable ();
smap.put ("pymolFrame", frame);
smap.put ("generator", this);
smap.put ("name", name);
var view = J.adapter.readers.pymol.PyMOLReader.listAt (thisScene, 0);
if (view != null) smap.put ("pymolView", this.getPymolView (view, false));
var visibilities = thisScene.get (1);
smap.put ("visibilities", visibilities);
var sname = "_scene_" + name + "_";
var reps =  new Array (J.adapter.readers.pymol.PyMOL.REP_LIST.length);
for (var j = J.adapter.readers.pymol.PyMOL.REP_LIST.length; --j >= 0; ) {
var list = htObjNames.get (sname + J.adapter.readers.pymol.PyMOL.REP_LIST[j]);
var data = J.adapter.readers.pymol.PyMOLReader.listAt (list, 5);
if (data != null && data.size () > 0) reps[j] = J.adapter.readers.pymol.PyMOLReader.listToMap (data);
}
smap.put ("moleculeReps", reps);
sname = "_!c_" + name + "_";
var colorection = J.adapter.readers.pymol.PyMOLReader.listAt (thisScene, 3);
var n = colorection.size ();
n -= n % 2;
var colors =  new Array (Clazz.doubleToInt (n / 2));
for (var j = 0, i = 0; j < n; j += 2) {
var color = J.adapter.readers.pymol.PyMOLReader.intAt (colorection, j);
var c = htSecrets.get (sname + color);
if (c != null && c.size () > 1) colors[i++] =  Clazz.newArray (-1, [Integer.$valueOf (color), c.get (1)]);
}
smap.put ("colors", colors);
this.addJmolObject (1073742139, null, smap).jmolName = name;
}, "~S,JU.Lst,java.util.Map,java.util.Map");
Clazz.overrideMethod (c$, "generateScene", 
function (scene) {
JU.Logger.info ("PyMOLScene - generateScene " + scene.get ("name"));
this.jmolObjects.clear ();
this.bsHidden.clearAll ();
this.occludedObjects.clear ();
this.htHiddenObjects.clear ();
var frame = scene.get ("pymolFrame");
this.thisState = frame.intValue ();
this.addJmolObject (4115, null, Integer.$valueOf (this.thisState - 1));
try {
this.generateVisibilities (scene.get ("visibilities"));
this.generateColors (scene.get ("colors"));
this.generateShapes (scene.get ("moleculeReps"));
this.finalizeVisibility ();
this.offsetObjects ();
this.finalizeObjects ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.info ("PyMOLScene exception " + e);
e.printStackTrace ();
} else {
throw e;
}
}
}, "java.util.Map");
Clazz.defineMethod (c$, "generateColors", 
 function (colors) {
if (colors == null) return;
for (var i = colors.length; --i >= 0; ) {
var item = colors[i];
var color = (item[0]).intValue ();
var icolor = J.adapter.readers.pymol.PyMOL.getRGB (color);
var molecules = item[1];
var bs = this.getSelectionAtoms (molecules, this.thisState,  new JU.BS ());
this.addJmolObject (1140850689, bs, null).argb = icolor;
}
}, "~A");
Clazz.defineMethod (c$, "processSelection", 
function (selection) {
var id = J.adapter.readers.pymol.PyMOLReader.stringAt (selection, 0);
id = "_" + (id.equals ("sele") ? id : "sele_" + id);
var g = this.getGroup (id);
this.getSelectionAtoms (J.adapter.readers.pymol.PyMOLReader.listAt (selection, 5), 0, g.bsAtoms);
}, "JU.Lst");
Clazz.defineMethod (c$, "getSelectionAtoms", 
 function (molecules, istate, bs) {
if (molecules != null) for (var j = molecules.size (); --j >= 0; ) this.selectAllAtoms (J.adapter.readers.pymol.PyMOLReader.listAt (molecules, j), istate, bs);

return bs;
}, "JU.Lst,~N,JU.BS");
Clazz.defineMethod (c$, "selectAllAtoms", 
 function (obj, istate, bs) {
var name = J.adapter.readers.pymol.PyMOLReader.stringAt (obj, 0);
this.setSceneObject (name, istate);
var atomList = J.adapter.readers.pymol.PyMOLReader.listAt (obj, 1);
var k0 = (istate == 0 ? 1 : istate);
var k1 = (istate == 0 ? this.stateCount : istate);
for (var k = k0; k <= k1; k++) {
var atomMap = this.htAtomMap.get (this.fixName (name + "_" + k));
if (atomMap == null) continue;
this.getBsAtoms (atomList, atomMap, bs);
}
}, "JU.Lst,~N,JU.BS");
Clazz.defineMethod (c$, "generateVisibilities", 
 function (vis) {
if (vis == null) return;
var bs =  new JU.BS ();
this.addJmolObject (12294, null, null);
for (var e, $e = this.groups.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) e.getValue ().visible = true;

for (var e, $e = vis.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
if (name.equals ("all")) continue;
var list = e.getValue ();
var tok = (J.adapter.readers.pymol.PyMOLReader.intAt (list, 0) == 1 ? 1610625028 : 12294);
if (tok == 12294) this.htHiddenObjects.put (name, Boolean.TRUE);
switch (this.getObjectType (name)) {
case 12:
var g = this.groups.get (name);
if (g != null) g.visible = (tok == 1610625028);
break;
}
}
this.setGroupVisibilities ();
for (var e, $e = vis.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
if (name.equals ("all")) continue;
this.setSceneObject (name, this.thisState);
if (this.objectHidden) continue;
var list = e.getValue ();
var tok = (this.objectHidden ? 12294 : 1610625028);
bs = null;
var info = this.objectJmolName;
switch (this.objectType) {
case 0:
case 12:
continue;
case 1:
bs = this.vwr.getDefinedAtomSet (info);
if (bs.nextSetBit (0) < 0) continue;
break;
case 4:
if (tok == 1610625028) {
var mdList = this.htMeasures.get (name);
if (mdList != null) this.addMeasurements (mdList, mdList[0].points.size (), null, this.getBS (J.adapter.readers.pymol.PyMOLReader.listAt (list, 2)), J.adapter.readers.pymol.PyMOLReader.intAt (list, 3), null, true);
}info += "_*";
break;
case 6:
case 3:
case 2:
break;
}
this.addJmolObject (tok, bs, info);
}
}, "java.util.Map");
Clazz.defineMethod (c$, "generateShapes", 
 function (reps) {
if (reps == null) return;
this.addJmolObject (12295, null, null).argb = this.thisState - 1;
for (var m = 0; m < this.moleculeNames.size (); m++) {
this.setSceneObject (this.moleculeNames.get (m), this.thisState);
if (this.objectHidden) continue;
var molReps =  new Array (23);
for (var i = 0; i < 23; i++) molReps[i] =  new JU.BS ();

for (var i = reps.length; --i >= 0; ) {
var repMap = reps[i];
var list = (repMap == null ? null : repMap.get (this.objectName));
if (list != null) this.selectAllAtoms (list, this.thisState, molReps[i]);
}
this.createShapeObjects (molReps, true, -1, -1);
}
}, "~A");
Clazz.defineMethod (c$, "getBS", 
 function (list) {
var bs =  new JU.BS ();
for (var i = list.size (); --i >= 0; ) bs.set (J.adapter.readers.pymol.PyMOLReader.intAt (list, i));

return bs;
}, "JU.Lst");
Clazz.defineMethod (c$, "getBsAtoms", 
 function (list, atomMap, bs) {
for (var i = list.size (); --i >= 0; ) bs.set (atomMap[J.adapter.readers.pymol.PyMOLReader.intAt (list, i)]);

}, "JU.Lst,~A,JU.BS");
Clazz.defineMethod (c$, "setReaderObjects", 
function () {
this.clearReaderData ();
this.finalizeObjects ();
if (!this.haveScenes) {
this.uniqueSettings = null;
this.bsUniqueBonds = this.bsStickBonds = this.bsLineBonds = null;
}});
Clazz.defineMethod (c$, "finalizeObjects", 
 function () {
this.vwr.setStringProperty ("defaults", "PyMOL");
for (var i = 0; i < this.jmolObjects.size (); i++) {
try {
var obj = this.jmolObjects.get (i);
obj.finalizeObject (this, this.vwr.ms, this.mepList, this.doCache);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e);
e.printStackTrace ();
} else {
throw e;
}
}
}
this.finalizeUniqueBonds ();
this.jmolObjects.clear ();
});
Clazz.defineMethod (c$, "offsetObjects", 
function () {
for (var i = 0, n = this.jmolObjects.size (); i < n; i++) this.jmolObjects.get (i).offset (this.baseModelIndex, this.baseAtomIndex);

});
Clazz.defineMethod (c$, "getJmolObject", 
 function (id, bsAtoms, info) {
if (this.baseAtomIndex > 0) bsAtoms = JU.BSUtil.copy (bsAtoms);
return  new J.adapter.readers.pymol.JmolObject (id, this.objectNameID, bsAtoms, info);
}, "~N,JU.BS,~O");
Clazz.defineMethod (c$, "addJmolObject", 
 function (id, bsAtoms, info) {
return this.addObject (this.getJmolObject (id, bsAtoms, info));
}, "~N,JU.BS,~O");
Clazz.defineMethod (c$, "getPymolView", 
 function (view, isViewObj) {
var pymolView =  Clazz.newFloatArray (21, 0);
var depthCue = this.booleanSetting (84);
var fog = this.booleanSetting (88);
var fog_start = this.floatSetting (192);
var pt = 0;
var i = 0;
for (var j = 0; j < 3; j++) pymolView[pt++] = J.adapter.readers.pymol.PyMOLReader.floatAt (view, i++);

if (isViewObj) i++;
for (var j = 0; j < 3; j++) pymolView[pt++] = J.adapter.readers.pymol.PyMOLReader.floatAt (view, i++);

if (isViewObj) i++;
for (var j = 0; j < 3; j++) pymolView[pt++] = J.adapter.readers.pymol.PyMOLReader.floatAt (view, i++);

if (isViewObj) i += 5;
for (var j = 0; j < 8; j++) pymolView[pt++] = J.adapter.readers.pymol.PyMOLReader.floatAt (view, i++);

var isOrtho = this.booleanSetting (23);
var fov = this.floatSetting (152);
pymolView[pt++] = (isOrtho ? fov : -fov);
pymolView[pt++] = (depthCue ? 1 : 0);
pymolView[pt++] = (fog ? 1 : 0);
pymolView[pt++] = fog_start;
return pymolView;
}, "JU.Lst,~B");
Clazz.defineMethod (c$, "globalSetting", 
function (i) {
var setting = J.adapter.readers.pymol.PyMOLReader.listAt (this.settings, i);
if (setting != null && setting.size () == 3) return (setting.get (2)).floatValue ();
return J.adapter.readers.pymol.PyMOL.getDefaultSetting (i, this.pymolVersion);
}, "~N");
Clazz.defineMethod (c$, "addGroup", 
function (object, parent, type, bsAtoms) {
if (this.groups == null) this.groups =  new java.util.Hashtable ();
var myGroup = this.getGroup (this.objectName);
myGroup.object = object;
myGroup.objectNameID = this.objectNameID;
myGroup.visible = !this.objectHidden;
myGroup.type = type;
if (!myGroup.visible) {
this.occludedObjects.put (this.objectNameID, Boolean.TRUE);
this.htHiddenObjects.put (this.objectName, Boolean.TRUE);
}if (parent != null && parent.length != 0) this.getGroup (parent).addList (myGroup);
if (bsAtoms != null) myGroup.addGroupAtoms (bsAtoms);
return myGroup;
}, "JU.Lst,~S,~N,JU.BS");
Clazz.defineMethod (c$, "getGroup", 
function (name) {
var g = this.groups.get (name);
if (g == null) {
this.groups.put (name, (g =  new J.adapter.readers.pymol.PyMOLGroup (name)));
this.defineAtoms (name, g.bsAtoms);
}return g;
}, "~S");
Clazz.defineMethod (c$, "finalizeVisibility", 
function () {
this.setGroupVisibilities ();
if (this.groups != null) for (var i = this.jmolObjects.size (); --i >= 0; ) {
var obj = this.jmolObjects.get (i);
if (obj.jmolName != null && this.occludedObjects.containsKey (obj.jmolName)) obj.visible = false;
}
if (!this.bsHidden.isEmpty ()) this.addJmolObject (2097194, this.bsHidden, null);
});
Clazz.defineMethod (c$, "setCarveSets", 
function (htObjNames) {
if (this.htCarveSets.isEmpty ()) return;
for (var e, $e = this.htCarveSets.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) this.getSelectionAtoms (J.adapter.readers.pymol.PyMOLReader.listAt (htObjNames.get (e.getKey ()), 5), 0, e.getValue ());

}, "java.util.Map");
Clazz.defineMethod (c$, "setGroupVisibilities", 
 function () {
if (this.groups == null) return;
var list = this.groups.values ();
var bsAll =  new JU.BS ();
for (var g, $g = list.iterator (); $g.hasNext () && ((g = $g.next ()) || true);) {
bsAll.or (g.bsAtoms);
if (g.parent == null) this.setGroupVisible (g, true);
 else if (g.list.isEmpty ()) g.addGroupAtoms ( new JU.BS ());
}
this.defineAtoms ("all", bsAll);
});
Clazz.defineMethod (c$, "defineAtoms", 
 function (name, bs) {
this.htDefinedAtoms.put (this.getJmolName (name), bs);
}, "~S,JU.BS");
Clazz.defineMethod (c$, "getJmolName", 
 function (name) {
return "__" + this.fixName (name);
}, "~S");
Clazz.defineMethod (c$, "createShapeObjects", 
function (reps, allowSurface, ac0, ac) {
if (ac >= 0) {
this.bsAtoms = JU.BSUtil.newBitSet2 (ac0, ac);
var jo;
jo = this.addJmolObject (1140850689, this.bsAtoms, null);
this.colixes = JU.AU.ensureLengthShort (this.colixes, ac);
for (var i = ac; --i >= ac0; ) this.colixes[i] = this.atomColorList.get (i).intValue ();

jo.setColors (this.colixes, 0);
jo.setSize (0);
jo = this.addJmolObject (1, this.bsAtoms, null);
jo.setSize (0);
}this.createShapeObject (7, reps[7]);
this.createShapeObject (0, reps[0]);
this.fixReps (reps);
this.createSpacefillObjects ();
for (var i = 0; i < 23; i++) switch (i) {
case 7:
case 0:
continue;
case 8:
case 2:
if (!allowSurface) continue;
switch (this.surfaceMode) {
case 0:
reps[i].andNot (this.bsNoSurface);
break;
case 1:
case 3:
break;
case 2:
case 4:
reps[i].andNot (this.bsHydrogen);
break;
}
default:
this.createShapeObject (i, reps[i]);
continue;
}

this.bsAtoms = null;
}, "~A,~B,~N,~N");
Clazz.defineMethod (c$, "addLabel", 
function (atomIndex, uniqueID, atomColor, labelPos, label) {
var icolor = Clazz.floatToInt (this.getUniqueFloatDef (uniqueID, 66, this.labelColor));
if (icolor == -7 || icolor == -6) {
} else if (icolor < 0) {
icolor = atomColor;
}if (labelPos == null) {
var offset = this.getUniquePoint (uniqueID, 471, null);
if (offset == null) offset = this.labelPosition;
 else offset.add (this.labelPosition);
this.setLabelPosition (offset, labelPos);
}this.labels.put (Integer.$valueOf (atomIndex), this.newTextLabel (label, labelPos, icolor, this.labelFontId, this.labelSize));
}, "~N,~N,~N,~A,~S");
Clazz.defineMethod (c$, "getUniqueFloatDef", 
function (id, key, defaultValue) {
var setting;
if (id <= 0 || (setting = this.uniqueSettings.get (Integer.$valueOf ((id << 10) + key))) == null) return defaultValue;
var v = (setting.get (2)).floatValue ();
if (JU.Logger.debugging) JU.Logger.debug ("Pymol unique setting for " + id + ": [" + key + "] = " + v);
return v;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getUniquePoint", 
function (id, key, pt) {
var setting;
if (id <= 0 || (setting = this.uniqueSettings.get (Integer.$valueOf ((id << 10) + key))) == null) return pt;
pt =  new JU.P3 ();
J.adapter.readers.pymol.PyMOLReader.pointAt (setting.get (2), 0, pt);
JU.Logger.info ("Pymol unique setting for " + id + ": " + key + " = " + pt);
return pt;
}, "~N,~N,JU.P3");
Clazz.defineMethod (c$, "getObjectSetting", 
function (i) {
return this.objectSettings.get (Integer.$valueOf (i));
}, "~N");
Clazz.defineMethod (c$, "booleanSetting", 
function (i) {
return (this.floatSetting (i) != 0);
}, "~N");
Clazz.defineMethod (c$, "floatSetting", 
function (i) {
var setting = this.getSetting (i);
if (setting != null && setting.size () == 3) return (setting.get (2)).floatValue ();
return J.adapter.readers.pymol.PyMOL.getDefaultSetting (i, this.pymolVersion);
}, "~N");
Clazz.defineMethod (c$, "stringSetting", 
function (i) {
var setting = this.getSetting (i);
if (setting != null && setting.size () == 3) return J.adapter.readers.pymol.PyMOLReader.stringAt (setting, 2);
return J.adapter.readers.pymol.PyMOL.getDefaultSettingS (i, this.pymolVersion);
}, "~N");
Clazz.defineMethod (c$, "getSetting", 
 function (i) {
var setting = null;
if (this.stateSettings != null) setting = this.stateSettings.get (Integer.$valueOf (i));
if (setting == null && this.objectSettings != null) setting = this.objectSettings.get (Integer.$valueOf (i));
if (setting == null && i < this.settings.size ()) setting = this.settings.get (i);
return setting;
}, "~N");
Clazz.defineMethod (c$, "setLabelPosition", 
function (offset, labelPos) {
labelPos[0] = 1;
labelPos[1] = offset.x;
labelPos[2] = offset.y;
labelPos[3] = offset.z;
return labelPos;
}, "JU.P3,~A");
Clazz.defineMethod (c$, "addCGO", 
function (data, color) {
data.addLast (this.objectName);
var jo = this.addJmolObject (23, null, data);
jo.argb = color;
jo.translucency = this.floatSetting (441);
return this.fixName (this.objectName);
}, "JU.Lst,~N");
Clazz.defineMethod (c$, "addMeasurements", 
function (mdList, nCoord, list, bsReps, color, offsets, haveLabels) {
var isNew = (mdList == null);
var n = (isNew ? Clazz.doubleToInt (Clazz.doubleToInt (list.size () / 3) / nCoord) : mdList.length);
if (n == 0) return false;
var drawLabel = haveLabels && bsReps.get (3);
var drawDashes = bsReps.get (10);
var rad = this.floatSetting (107) / 20;
if (rad == 0) rad = 0.05;
if (!drawDashes) rad = -5.0E-4;
if (color < 0) color = Clazz.floatToInt (this.floatSetting (574));
var c = J.adapter.readers.pymol.PyMOL.getRGB (color);
var colix = JU.C.getColix (c);
var clabel = (this.labelColor < 0 ? color : this.labelColor);
if (isNew) {
mdList =  new Array (n);
this.htMeasures.put (this.objectName, mdList);
}var bs = JU.BSUtil.newAndSetBit (0);
for (var index = 0, p = 0; index < n; index++) {
var md;
var offset;
if (isNew) {
var points =  new JU.Lst ();
for (var i = 0; i < nCoord; i++, p += 3) points.addLast (J.adapter.readers.pymol.PyMOLReader.pointAt (list, p,  new JU.Point3fi ()));

offset = J.adapter.readers.pymol.PyMOLReader.floatsAt (J.adapter.readers.pymol.PyMOLReader.listAt (offsets, index), 0,  Clazz.newFloatArray (7, 0), 7);
if (offset == null) offset = this.setLabelPosition (this.labelPosition,  Clazz.newFloatArray (7, 0));
md = mdList[index] = this.vwr.newMeasurementData (this.objectNameID + "_" + (index + 1), points);
md.note = this.objectName;
} else {
md = mdList[index];
offset = md.text.pymolOffset;
}var nDigits = Clazz.floatToInt (this.floatSetting (J.adapter.readers.pymol.PyMOLScene.MEAS_DIGITS[nCoord - 2]));
var strFormat = nCoord + ": " + (drawLabel ? "%0." + (nDigits < 0 ? 1 : nDigits) + "VALUE" : "");
var text = this.newTextLabel (strFormat, offset, clabel, Clazz.floatToInt (this.floatSetting (328)), this.floatSetting (453));
md.set (12290, null, null, null, strFormat, "angstroms", null, false, false, null, false, Clazz.floatToInt (rad * 2000), colix, text, NaN);
this.addJmolObject (6, bs, md);
}
return true;
}, "~A,~N,JU.Lst,JU.BS,~N,JU.Lst,~B");
Clazz.defineMethod (c$, "getViewScript", 
function (view) {
var sb =  new JU.SB ();
var pymolView = this.getPymolView (view, true);
sb.append (";set translucent " + (this.globalSetting (213) != 2) + ";set zshadePower 1;set traceAlpha " + (this.globalSetting (111) != 0));
var rockets = this.cartoonRockets;
sb.append (";set cartoonRockets " + rockets);
if (rockets) sb.append (";set rocketBarrels " + rockets);
sb.append (";set cartoonLadders " + this.haveNucleicLadder);
sb.append (";set ribbonBorder " + (this.globalSetting (118) != 0));
sb.append (";set cartoonFancy " + (this.globalSetting (118) == 0));
var s = "000000" + Integer.toHexString (this.bgRgb & 0xFFFFFF);
s = "[x" + s.substring (s.length - 6) + "]";
sb.append (";background " + s);
sb.append (";moveto 0 PyMOL " + JU.Escape.eAF (pymolView));
sb.append (";save orientation 'default';");
return sb;
}, "JU.Lst");
Clazz.defineMethod (c$, "getColix", 
function (colorIndex, translucency) {
var colix = (colorIndex == -7 ? (JU.C.getBgContrast (this.bgRgb) == 8 ? 4 : 8) : colorIndex == -6 ? JU.C.getBgContrast (this.bgRgb) : JU.C.getColixO (Integer.$valueOf (J.adapter.readers.pymol.PyMOL.getRGB (colorIndex))));
return JU.C.getColixTranslucent3 (colix, translucency > 0, translucency);
}, "~N,~N");
Clazz.defineMethod (c$, "setAtomColor", 
function (atomColor) {
this.atomColorList.addLast (Integer.$valueOf (this.getColix (atomColor, 0)));
}, "~N");
Clazz.defineMethod (c$, "setFrameObject", 
function (type, info) {
if (info != null) {
this.frameObj = this.getJmolObject (type, null, info);
return;
}if (this.frameObj == null) return;
this.frameObj.finalizeObject (this, this.vwr.ms, null, false);
this.frameObj = null;
}, "~N,~O");
Clazz.defineMethod (c$, "fixName", 
 function (name) {
var chars = name.toLowerCase ().toCharArray ();
for (var i = chars.length; --i >= 0; ) if (!JU.PT.isLetterOrDigit (chars[i])) chars[i] = '_';

return String.valueOf (chars);
}, "~S");
Clazz.defineMethod (c$, "getObjectID", 
function (name) {
return this.objectInfo.get (name)[0];
}, "~S");
Clazz.defineMethod (c$, "getObjectType", 
 function (name) {
var o = this.objectInfo.get (name);
return (o == null ? 0 : (o[1]).intValue ());
}, "~S");
Clazz.defineMethod (c$, "setAtomMap", 
function (atomMap, ac0) {
this.htAtomMap.put (this.objectNameID, atomMap);
var bsAtoms = this.htDefinedAtoms.get (this.objectJmolName);
if (bsAtoms == null) {
bsAtoms = JU.BS.newN (ac0 + atomMap.length);
JU.Logger.info ("PyMOL molecule " + this.objectName);
this.htDefinedAtoms.put (this.objectJmolName, bsAtoms);
this.htObjectAtoms.put (this.objectName, bsAtoms);
this.moleculeNames.addLast (this.objectName);
}return bsAtoms;
}, "~A,~N");
Clazz.defineMethod (c$, "newTextLabel", 
 function (label, labelOffset, colorIndex, fontID, fontSize) {
var face;
var factor = 1;
switch (fontID) {
default:
case 11:
case 12:
case 13:
case 14:
face = "SansSerif";
break;
case 0:
case 1:
face = "Monospaced";
break;
case 9:
case 10:
case 15:
case 16:
case 17:
case 18:
face = "Serif";
break;
}
var style;
switch (fontID) {
default:
style = "Plain";
break;
case 6:
case 12:
case 16:
case 17:
style = "Italic";
break;
case 7:
case 10:
case 13:
style = "Bold";
break;
case 8:
case 14:
case 18:
style = "BoldItalic";
break;
}
var font = this.vwr.getFont3D (face, style, fontSize == 0 ? 12 : fontSize * factor);
var t = JM.Text.newLabel (this.vwr, font, label, this.getColix (colorIndex, 0), 0, 0, 0);
if (t != null) t.pymolOffset = labelOffset;
return t;
}, "~S,~A,~N,~N,~N");
Clazz.defineMethod (c$, "setVersionSettings", 
 function () {
if (this.pymolVersion < 100) {
this.addSetting (550, 2, Integer.$valueOf (0));
this.addSetting (529, 2, Integer.$valueOf (2));
this.addSetting (471, 4,  Clazz.newDoubleArray (-1, [1, 1, 0]));
if (this.pymolVersion < 99) {
this.addSetting (448, 2, Integer.$valueOf (0));
this.addSetting (431, 2, Integer.$valueOf (0));
this.addSetting (361, 2, Integer.$valueOf (1));
}}});
Clazz.defineMethod (c$, "addSetting", 
 function (key, type, val) {
var settingCount = this.settings.size ();
if (settingCount <= key) for (var i = key + 1; --i >= settingCount; ) this.settings.addLast (null);

if (type == 4) {
var d = val;
var list;
val = list =  new JU.Lst ();
for (var i = 0; i < 3; i++) list.addLast (Double.$valueOf (d[i]));

}var setting =  new JU.Lst ();
setting.addLast (Integer.$valueOf (key));
setting.addLast (Integer.$valueOf (type));
setting.addLast (val);
this.settings.set (key, setting);
}, "~N,~N,~O");
Clazz.defineMethod (c$, "fixReps", 
 function (reps) {
this.htSpacefill.clear ();
this.bsCartoon.clearAll ();
for (var iAtom = this.bsAtoms.nextSetBit (0); iAtom >= 0; iAtom = this.bsAtoms.nextSetBit (iAtom + 1)) {
var rad = 0;
var uniqueID = (this.reader == null ? this.uniqueIDs[iAtom] : this.reader.getUniqueID (iAtom));
if (reps[1].get (iAtom)) {
rad = (this.reader == null ? this.radii[iAtom] : this.reader.getVDW (iAtom)) * this.getUniqueFloatDef (uniqueID, 155, this.sphereScale);
} else if (reps[4].get (iAtom)) {
rad = this.nonbondedSize;
}if (rad != 0) {
var r = Float.$valueOf (rad);
var bsr = this.htSpacefill.get (r);
if (bsr == null) this.htSpacefill.put (r, bsr =  new JU.BS ());
bsr.set (iAtom);
}var cartoonType = (this.reader == null ? this.cartoonTypes[iAtom] : this.reader.getCartoonType (iAtom));
if (reps[5].get (iAtom)) {
switch (cartoonType) {
case 1:
case 4:
reps[21].set (iAtom);
case -1:
reps[5].clear (iAtom);
this.bsCartoon.clear (iAtom);
break;
case 7:
reps[22].set (iAtom);
reps[5].clear (iAtom);
this.bsCartoon.clear (iAtom);
break;
default:
this.bsCartoon.set (iAtom);
}
}}
reps[5].and (this.bsCartoon);
this.cleanSingletons (reps[5]);
this.cleanSingletons (reps[6]);
this.cleanSingletons (reps[21]);
this.cleanSingletons (reps[22]);
this.bsCartoon.and (reps[5]);
}, "~A");
Clazz.defineMethod (c$, "cleanSingletons", 
 function (bs) {
if (bs.isEmpty ()) return;
bs.and (this.bsAtoms);
var bsr =  new JU.BS ();
var n = bs.length ();
var pass = 0;
while (true) {
for (var i = 0, offset = 0, iPrev = -2147483648, iSeqLast = -2147483648, iSeq = -2147483648; i < n; i++) {
if (iPrev < 0 || (this.reader == null ? this.newChain[i] : this.reader.compareAtoms (iPrev, i))) offset++;
iSeq = (this.reader == null ? this.sequenceNumbers[i] : this.reader.getSequenceNumber (i));
if (iSeq != iSeqLast) {
iSeqLast = iSeq;
offset++;
}if (pass == 0) {
if (bs.get (i)) bsr.set (offset);
} else if (!bsr.get (offset)) bs.clear (i);
iPrev = i;
}
if (++pass == 2) break;
var bsnot =  new JU.BS ();
for (var i = bsr.nextSetBit (0); i >= 0; i = bsr.nextSetBit (i + 1)) if (!bsr.get (i - 1) && !bsr.get (i + 1)) bsnot.set (i);

bsr.andNot (bsnot);
}
}, "JU.BS");
Clazz.defineMethod (c$, "createShapeObject", 
 function (shapeID, bs) {
if (bs.isEmpty ()) return;
var jo = null;
switch (shapeID) {
case 11:
bs.and (this.bsNonbonded);
if (bs.isEmpty ()) return;
this.setUniqueObjects (7, bs, 0, 0, 524, this.nonbondedTranslucency, 0, this.nonbondedSize, 0.5);
break;
case 4:
case 1:
this.setUniqueObjects (0, bs, 173, this.sphereColor, 172, this.sphereTranslucency, 155, this.sphereScale, 1);
break;
case 19:
var ellipsoidTranslucency = this.floatSetting (571);
var ellipsoidColor = Clazz.floatToInt (this.floatSetting (570));
var ellipsoidScale = this.floatSetting (569);
this.setUniqueObjects (20, bs, 570, ellipsoidColor, 571, ellipsoidTranslucency, 569, ellipsoidScale, 50);
break;
case 9:
this.setUniqueObjects (16, bs, 210, this.dotColor, 0, 0, 155, this.sphereScale, 1);
break;
case 2:
var withinDistance = this.floatSetting (344);
jo = this.addJmolObject (135180, bs,  Clazz.newArray (-1, [this.booleanSetting (156) ? "FULLYLIT" : "FRONTLIT", (this.surfaceMode == 3 || this.surfaceMode == 4) ? " only" : "", this.bsCarve, Float.$valueOf (withinDistance)]));
jo.setSize (this.floatSetting (4) * (this.solventAccessible ? -1 : 1));
jo.translucency = this.transparency;
if (this.surfaceColor >= 0) jo.argb = J.adapter.readers.pymol.PyMOL.getRGB (this.surfaceColor);
jo.modelIndex = this.currentAtomSetIndex;
jo.cacheID = this.surfaceInfoName;
this.setUniqueObjects (24, bs, 144, this.surfaceColor, 138, this.transparency, 0, 0, 0);
break;
case 8:
jo = this.addJmolObject (135180, bs, null);
jo.setSize (this.floatSetting (4));
jo.translucency = this.transparency;
this.setUniqueObjects (24, bs, 144, this.surfaceColor, 138, this.transparency, 0, 0, 0);
break;
case 3:
bs.and (this.bsLabeled);
if (bs.isEmpty ()) return;
jo = this.addJmolObject (5, bs, this.labels);
break;
case 10:
case 7:
jo = this.addJmolObject (659488, bs, null);
jo.setSize (this.floatSetting (44) / 15);
var color = Clazz.floatToInt (this.floatSetting (526));
if (color >= 0) jo.argb = J.adapter.readers.pymol.PyMOL.getRGB (color);
break;
case 0:
jo = this.addJmolObject (1, bs, null);
jo.setSize (this.floatSetting (21) * 2);
jo.translucency = this.stickTranslucency;
var col = Clazz.floatToInt (this.floatSetting (376));
if (col >= 0) jo.argb = J.adapter.readers.pymol.PyMOL.getRGB (col);
break;
case 5:
this.createCartoonObject ("H", (this.cartoonRockets ? 181 : 100));
this.createCartoonObject ("S", 96);
this.createCartoonObject ("L", 92);
this.createCartoonObject (" ", 92);
break;
case 22:
this.createPuttyObject (bs);
break;
case 21:
this.createTraceObject (bs);
break;
case 6:
this.createRibbonObject (bs);
break;
default:
JU.Logger.error ("Unprocessed representation type " + shapeID);
}
}, "~N,JU.BS");
Clazz.defineMethod (c$, "setUniqueObjects", 
 function (shape, bs, setColor, color, setTrans, trans, setSize, size, f) {
var n = bs.cardinality ();
var colixes = (setColor == 0 ? null :  Clazz.newShortArray (n, 0));
var atrans = (setTrans == 0 ? null :  Clazz.newFloatArray (n, 0));
var sizes =  Clazz.newFloatArray (n, 0);
for (var pt = 0, i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1), pt++) {
var id = (this.reader == null ? this.uniqueIDs[i] : this.reader.getUniqueID (i));
if (colixes != null) {
var c = Clazz.floatToInt (this.getUniqueFloatDef (id, setColor, color));
if (c > 0) colixes[pt] = this.getColix (c, 0);
}if (atrans != null) {
atrans[pt] = this.getUniqueFloatDef (id, setTrans, trans);
}sizes[pt] = this.getUniqueFloatDef (id, setSize, size) * f;
}
return this.addJmolObject (shape, bs,  Clazz.newArray (-1, [colixes, atrans, sizes]));
}, "~N,JU.BS,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "createSpacefillObjects", 
 function () {
for (var e, $e = this.htSpacefill.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var r = e.getKey ().floatValue ();
var bs = e.getValue ();
this.addJmolObject (1140850689, bs, null).rd =  new J.atomdata.RadiusData (null, r, J.atomdata.RadiusData.EnumType.ABSOLUTE, J.c.VDW.AUTO);
}
this.htSpacefill.clear ();
});
Clazz.defineMethod (c$, "createTraceObject", 
 function (bs) {
this.checkNucleicObject (bs, true);
if (bs.isEmpty ()) return;
var r = this.floatSetting (103);
var jo = this.setUniqueObjects (10, bs, 236, this.cartoonColor, 0, 0, 0, 0, 0);
jo.setSize (r * 2);
jo.translucency = this.cartoonTranslucency;
}, "JU.BS");
Clazz.defineMethod (c$, "checkNucleicObject", 
 function (bs, isTrace) {
var jo;
var bsNuc = JU.BSUtil.copy (this.bsNucleic);
bsNuc.and (bs);
if (!bsNuc.isEmpty ()) {
if (isTrace && this.cartoonLadderMode) this.haveNucleicLadder = true;
jo = this.addJmolObject (11, bsNuc, null);
jo.translucency = this.cartoonTranslucency;
jo.setSize (this.floatSetting (103) * 2);
bs.andNot (bsNuc);
}}, "JU.BS,~B");
Clazz.defineMethod (c$, "createPuttyObject", 
 function (bs) {
var info =  Clazz.newFloatArray (-1, [this.floatSetting (378), this.floatSetting (377), this.floatSetting (382), this.floatSetting (379), this.floatSetting (380), this.floatSetting (381), this.floatSetting (581)]);
this.addJmolObject (1112152078, bs, info).translucency = this.cartoonTranslucency;
}, "JU.BS");
Clazz.defineMethod (c$, "createRibbonObject", 
 function (bs) {
var isTrace = (this.floatSetting (19) > 1);
var r = this.floatSetting (20) * 2;
var rayScale = this.floatSetting (327);
if (r == 0) r = this.floatSetting (106) * (isTrace ? 1 : (rayScale <= 1 ? 0.5 : rayScale)) * 0.1;
var jo = this.setUniqueObjects ((isTrace ? 10 : 9), bs, 235, this.ribbonColor, 0, 0, 0, 0, 0);
jo.setSize (r);
jo.translucency = this.ribbonTranslucency;
}, "JU.BS");
Clazz.defineMethod (c$, "createCartoonObject", 
 function (key, sizeID) {
var bs = JU.BSUtil.copy (this.ssMapAtom.get (key));
if (bs == null) return;
bs.and (this.bsCartoon);
if (bs.isEmpty ()) return;
if (key.equals (" ")) {
this.checkNucleicObject (bs, false);
if (bs.isEmpty ()) return;
}var jo = this.setUniqueObjects (11, bs, 236, this.cartoonColor, 0, 0, 0, 0, 0);
jo.setSize (this.floatSetting (sizeID) * 2);
jo.translucency = this.cartoonTranslucency;
}, "~S,~N");
Clazz.defineMethod (c$, "addObject", 
 function (obj) {
this.jmolObjects.addLast (obj);
return obj;
}, "J.adapter.readers.pymol.JmolObject");
Clazz.defineMethod (c$, "setGroupVisible", 
 function (g, parentVis) {
var vis = parentVis && g.visible;
if (vis) return;
g.visible = false;
this.occludedObjects.put (g.objectNameID, Boolean.TRUE);
this.htHiddenObjects.put (g.name, Boolean.TRUE);
switch (g.type) {
case 1:
this.bsHidden.or (g.bsAtoms);
break;
default:
g.occluded = true;
break;
}
for (var gg, $gg = g.list.values ().iterator (); $gg.hasNext () && ((gg = $gg.next ()) || true);) {
this.setGroupVisible (gg, vis);
}
}, "J.adapter.readers.pymol.PyMOLGroup,~B");
Clazz.defineMethod (c$, "getSSMapAtom", 
function (ssType) {
var bs = this.ssMapAtom.get (ssType);
if (bs == null) this.ssMapAtom.put (ssType, bs =  new JU.BS ());
return bs;
}, "~S");
Clazz.defineMethod (c$, "setAtomDefs", 
function () {
this.setGroupVisibilities ();
var defs =  new java.util.Hashtable ();
for (var e, $e = this.htDefinedAtoms.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var bs = e.getValue ();
if (!bs.isEmpty ()) defs.put (e.getKey (), bs);
}
this.addJmolObject (12290, null, defs);
return defs;
});
Clazz.defineMethod (c$, "needSelections", 
function () {
return this.haveScenes || !this.htCarveSets.isEmpty ();
});
Clazz.defineMethod (c$, "setUniqueBonds", 
function (bsBonds, isSticks) {
if (isSticks) {
this.bsStickBonds.or (bsBonds);
this.bsStickBonds.andNot (this.bsLineBonds);
} else {
this.bsLineBonds.or (bsBonds);
this.bsLineBonds.andNot (this.bsStickBonds);
}}, "JU.BS,~B");
Clazz.defineMethod (c$, "finalizeUniqueBonds", 
 function () {
if (this.uniqueList == null) return;
var bondCount = this.vwr.ms.bondCount;
var bonds = this.vwr.ms.bo;
for (var i = this.bsUniqueBonds.nextSetBit (0); i >= 0; i = this.bsUniqueBonds.nextSetBit (i + 1)) {
var rad = NaN;
var id = this.uniqueList.get (Integer.$valueOf (i)).intValue ();
if (this.bsLineBonds.get (i)) {
rad = this.getUniqueFloatDef (id, 44, NaN) / 30;
} else if (this.bsStickBonds.get (i)) {
rad = this.getUniqueFloatDef (id, 21, NaN);
}var c = Clazz.floatToInt (this.getUniqueFloatDef (id, 376, 2147483647));
if (c != 2147483647) c = J.adapter.readers.pymol.PyMOL.getRGB (c);
var valence = this.getUniqueFloatDef (id, 64, NaN);
var t = this.getUniqueFloatDef (id, 198, NaN);
if (i < 0 || i >= bondCount) return;
var b = bonds[i];
this.setBondParameters (b, this.thisState - 1, rad, valence, c, t);
}
});
Clazz.defineMethod (c$, "setBondParameters", 
function (b, modelIndex, rad, pymolValence, argb, trans) {
if (modelIndex >= 0 && b.atom1.mi != modelIndex) return;
if (!Float.isNaN (rad)) b.mad = Clazz.floatToShort (rad * 2000);
var colix = b.colix;
if (argb != 2147483647) colix = JU.C.getColix (argb);
if (!Float.isNaN (trans)) b.colix = JU.C.getColixTranslucent3 (colix, trans != 0, trans);
 else if (b.colix != colix) b.colix = JU.C.copyColixTranslucency (b.colix, colix);
if (pymolValence == 1) b.order |= 98304;
 else if (pymolValence == 0) b.order |= 65536;
}, "JM.Bond,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addMesh", 
function (tok, obj, objName, isMep) {
var jo = this.addJmolObject (tok, null, obj);
this.setSceneObject (objName, -1);
var meshColor = Clazz.floatToInt (this.floatSetting (146));
if (meshColor < 0) meshColor = J.adapter.readers.pymol.PyMOLReader.intAt (J.adapter.readers.pymol.PyMOLReader.listAt (obj, 0), 2);
if (!isMep) {
jo.setSize (this.meshWidth);
jo.argb = J.adapter.readers.pymol.PyMOL.getRGB (meshColor);
}jo.translucency = this.transparency;
jo.cacheID = this.surfaceInfoName;
}, "~N,JU.Lst,~S,~B");
Clazz.defineMethod (c$, "addIsosurface", 
function (objectName) {
var jo = this.addJmolObject (135180, null, objectName);
jo.cacheID = this.surfaceInfoName;
return jo;
}, "~S");
Clazz.defineStatics (c$,
"MEAS_DIGITS",  Clazz.newIntArray (-1, [530, 531, 532]));
});
