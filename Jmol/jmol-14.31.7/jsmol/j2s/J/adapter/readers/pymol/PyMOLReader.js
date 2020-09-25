Clazz.declarePackage ("J.adapter.readers.pymol");
Clazz.load (["J.adapter.readers.pdb.PdbReader", "J.api.PymolAtomReader", "JU.BS", "$.P3"], "J.adapter.readers.pymol.PyMOLReader", ["java.lang.Boolean", "java.util.Hashtable", "JU.AU", "$.BC", "$.CU", "$.Lst", "$.PT", "$.V3", "J.adapter.readers.pymol.PickleReader", "$.PyMOL", "$.PyMOLScene", "J.adapter.smarter.Atom", "$.Bond", "$.Structure", "J.c.STR", "JU.BSUtil", "$.BoxInfo", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.allowSurface = true;
this.doResize = false;
this.doCache = false;
this.isStateScript = false;
this.sourcePNGJ = false;
this.ac0 = 0;
this.$ac = 0;
this.stateCount = 0;
this.structureCount = 0;
this.isHidden = false;
this.bsStructureDefined = null;
this.bsBytesExcluded = null;
this.atomMap = null;
this.ssMapSeq = null;
this.pymolScene = null;
this.xyzMin = null;
this.xyzMax = null;
this.nModels = 0;
this.logging = false;
this.reps = null;
this.isMovie = false;
this.pymolFrame = 0;
this.allStates = false;
this.totalAtomCount = 0;
this.pymolVersion = 0;
this.trajectoryStep = null;
this.trajectoryPtr = 0;
this.objectName = null;
this.volumeData = null;
this.mapObjects = null;
this.haveMeasurements = false;
this.frames = null;
this.uniqueSettings = null;
this.atoms = null;
this.haveScenes = false;
this.baseModelIndex = 0;
this.sceneOrder = null;
this.bondCount = 0;
this.haveBinaryArrays = true;
this.ptTemp = null;
this.aTemp = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.pymol, "PyMOLReader", J.adapter.readers.pdb.PdbReader, J.api.PymolAtomReader);
Clazz.prepareFields (c$, function () {
this.bsStructureDefined =  new JU.BS ();
this.xyzMin = JU.P3.new3 (1e6, 1e6, 1e6);
this.xyzMax = JU.P3.new3 (-1000000.0, -1000000.0, -1000000.0);
this.reps =  new Array (23);
this.ptTemp =  new JU.P3 ();
this.aTemp =  Clazz.newByteArray (16, 0);
});
Clazz.overrideMethod (c$, "setup", 
function (fullPath, htParams, reader) {
this.isBinary = this.mustFinalizeModelSet = true;
this.setupASCR (fullPath, htParams, reader);
}, "~S,java.util.Map,~O");
Clazz.defineMethod (c$, "initializeReader", 
function () {
this.baseAtomIndex = (this.htParams.get ("baseAtomIndex")).intValue ();
this.baseModelIndex = (this.htParams.get ("baseModelIndex")).intValue ();
this.asc.setInfo ("noAutoBond", Boolean.TRUE);
this.asc.setCurrentModelInfo ("pdbNoHydrogens", Boolean.TRUE);
this.asc.setInfo ("isPyMOL", Boolean.TRUE);
if (this.isTrajectory) this.trajectorySteps =  new JU.Lst ();
this.isStateScript = this.htParams.containsKey ("isStateScript");
this.sourcePNGJ = this.htParams.containsKey ("sourcePNGJ");
this.doResize = this.checkFilterKey ("DORESIZE");
this.allowSurface = !this.checkFilterKey ("NOSURFACE");
this.doCache = this.checkFilterKey ("DOCACHE");
if (this.doCache && this.sourcePNGJ) this.doCache = false;
 else if (this.sourcePNGJ && !this.doCache) this.sourcePNGJ = false;
if (this.doCache) this.bsBytesExcluded =  new JU.BS ();
Clazz.superCall (this, J.adapter.readers.pymol.PyMOLReader, "initializeReader", []);
});
Clazz.overrideMethod (c$, "processBinaryDocument", 
function () {
var logFile = this.vwr.getLogFileName ();
this.logging = (logFile.length > 0);
JU.Logger.info (this.logging ? "PyMOL (1) file data streaming to " + logFile : "To view raw PyMOL file data, use 'set logFile \"some_filename\" ");
var reader =  new J.adapter.readers.pymol.PickleReader (this.binaryDoc, this.vwr);
var map = reader.getMap (this.logging && JU.Logger.debuggingHigh);
reader = null;
this.process (map);
});
Clazz.overrideMethod (c$, "setAdditionalAtomParameters", 
function (atom) {
}, "J.adapter.smarter.Atom");
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.finalizeReaderPDB ();
this.asc.setTensors ();
});
Clazz.overrideMethod (c$, "finalizeModelSet", 
function () {
this.pymolScene.setReaderObjects ();
if (this.haveMeasurements) {
this.appendLoadNote (this.vwr.getMeasurementInfoAsString ());
this.setLoadNote ();
}if (this.haveScenes) {
var scenes =  new Array (this.sceneOrder.size ());
for (var i = scenes.length; --i >= 0; ) scenes[i] = J.adapter.readers.pymol.PyMOLReader.stringAt (this.sceneOrder, i);

this.vwr.ms.msInfo.put ("scenes", scenes);
}this.vwr.ms.setTrajectoryBs (JU.BSUtil.newBitSet2 (this.baseModelIndex, this.vwr.ms.mc));
if (!this.isStateScript) this.pymolScene.setFrameObject (0, null);
if (this.bsBytesExcluded != null) {
var nExcluded = this.bsBytesExcluded.cardinality ();
var bytes0 = this.vwr.fm.getFileAsBytes (this.filePath, null);
var bytes =  Clazz.newByteArray (bytes0.length - nExcluded, 0);
for (var i = this.bsBytesExcluded.nextClearBit (0), n = bytes0.length, pt = 0; i < n; i = this.bsBytesExcluded.nextClearBit (i + 1)) bytes[pt++] = bytes0[i];

bytes0 = null;
var fileName = this.filePath;
this.vwr.cachePut (fileName, bytes);
}});
Clazz.defineMethod (c$, "process", 
 function (map) {
this.pymolVersion = (map.get ("version")).intValue ();
this.appendLoadNote ("PyMOL version: " + this.pymolVersion);
var settings = this.fixSettings (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "settings"));
var lst = J.adapter.readers.pymol.PyMOLReader.listAt (settings, 749);
this.haveBinaryArrays = (lst != null && J.adapter.readers.pymol.PyMOLReader.floatAt (lst, 2) == 1);
this.sceneOrder = J.adapter.readers.pymol.PyMOLReader.getMapList (map, "scene_order");
this.haveScenes = this.getFrameScenes (map);
var file = J.adapter.readers.pymol.PyMOLReader.listAt (settings, 440);
if (file != null && file.size () > 2) JU.Logger.info ("PyMOL session file: " + file.get (2));
this.setUniqueSettings (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "unique_settings"));
this.pymolScene =  new J.adapter.readers.pymol.PyMOLScene (this, this.vwr, settings, this.uniqueSettings, this.pymolVersion, this.haveScenes, this.baseAtomIndex, this.baseModelIndex, this.doCache, this.filePath);
var logFile = this.vwr.getLogFileName ();
this.logging = (logFile.length > 0);
JU.Logger.info (this.logging ? "PyMOL file data streaming to " + logFile : "To view raw PyMOL file data, use 'set logFile \"some_filename\" ");
var names = J.adapter.readers.pymol.PyMOLReader.getMapList (map, "names");
for (var e, $e = map.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
JU.Logger.info (name);
if (name.equals ("names")) {
for (var i = 1; i < names.size (); i++) {
var obj = J.adapter.readers.pymol.PyMOLReader.listAt (names, i);
JU.Logger.info ("  " + J.adapter.readers.pymol.PyMOLReader.stringAt (obj, 0));
}
}}
if (this.logging) {
if (this.logging) this.vwr.log ("$CLEAR$");
for (var e, $e = map.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
if (!"names".equals (name)) {
this.vwr.log ("\n===" + name + "===");
this.vwr.log (JU.PT.rep (e.getValue ().toString (), "[", "\n["));
}}
this.vwr.log ("\n===names===");
for (var i = 1; i < names.size (); i++) {
this.vwr.log ("");
var list = names.get (i);
this.vwr.log (" =" + J.adapter.readers.pymol.PyMOLReader.bytesToString (list.get (0)) + "=");
try {
this.vwr.log (JU.PT.rep (list.toString (), "[", "\n["));
} catch (e) {
}
}
}this.addColors (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "colors"), this.pymolScene.globalSetting (214) != 0);
this.allStates = (this.pymolScene.globalSetting (49) != 0);
this.pymolFrame = Clazz.floatToInt (this.pymolScene.globalSetting (194));
this.getAtomAndStateCount (names);
this.pymolScene.setStateCount (this.stateCount);
var pymolState = Clazz.floatToInt (this.pymolScene.globalSetting (193));
if (!this.isMovie) this.pymolScene.setFrameObject (4115, (this.allStates ? Integer.$valueOf (-1) : Integer.$valueOf (pymolState - 1)));
this.appendLoadNote ("frame=" + this.pymolFrame + " state=" + pymolState + " all_states=" + this.allStates);
if (!this.isStateScript && this.doResize) {
var width = 0;
var height = 0;
var main = J.adapter.readers.pymol.PyMOLReader.getMapList (map, "main");
if (main != null) {
width = J.adapter.readers.pymol.PyMOLReader.intAt (main, 0);
height = J.adapter.readers.pymol.PyMOLReader.intAt (main, 1);
}var note;
if (width > 0 && height > 0) {
note = "PyMOL dimensions width=" + width + " height=" + height;
this.asc.setInfo ("preferredWidthHeight",  Clazz.newIntArray (-1, [width, height]));
this.vwr.resizeInnerPanel (width, height);
} else {
note = "PyMOL dimensions?";
}this.appendLoadNote (note);
}var mov;
if (!this.isStateScript && !this.allStates && (mov = J.adapter.readers.pymol.PyMOLReader.getMapList (map, "movie")) != null) {
var frameCount = J.adapter.readers.pymol.PyMOLReader.intAt (mov, 0);
if (frameCount > 0) this.processMovie (mov, frameCount);
}if (this.totalAtomCount == 0) this.asc.newAtomSet ();
if (this.allStates && this.desiredModelNumber == -2147483648) {
} else if (this.isMovie) {
switch (this.desiredModelNumber) {
case -2147483648:
break;
default:
this.desiredModelNumber = this.frames[(this.desiredModelNumber > 0 && this.desiredModelNumber <= this.frames.length ? this.desiredModelNumber : this.pymolFrame) - 1];
this.pymolScene.setFrameObject (4115, Integer.$valueOf (this.desiredModelNumber - 1));
break;
}
} else if (this.desiredModelNumber == 0) {
this.desiredModelNumber = pymolState;
} else {
}var n = names.size ();
for (var j = 0; j < this.stateCount; j++) {
if (!this.doGetModel (++this.nModels, null)) continue;
this.model (this.nModels);
this.pymolScene.currentAtomSetIndex = this.asc.iSet;
if (this.isTrajectory) {
this.trajectoryStep =  new Array (this.totalAtomCount);
this.trajectorySteps.addLast (this.trajectoryStep);
this.trajectoryPtr = 0;
}for (var i = 1; i < n; i++) this.processObject (J.adapter.readers.pymol.PyMOLReader.listAt (names, i), true, j);

}
for (var i = 1; i < n; i++) this.processObject (J.adapter.readers.pymol.PyMOLReader.listAt (names, i), false, 0);

this.pymolScene.setReaderObjectInfo (null, 0, null, false, null, null, null);
if (this.mapObjects != null && this.allowSurface) this.processMeshes ();
if (this.isTrajectory) {
this.appendLoadNote ("PyMOL trajectories read: " + this.trajectorySteps.size ());
this.asc.finalizeTrajectoryAs (this.trajectorySteps, null);
}this.processDefinitions ();
this.processSelectionsAndScenes (map);
this.pymolScene.finalizeVisibility ();
if (!this.isStateScript) {
this.vwr.initialize (false, true);
this.addJmolScript (this.pymolScene.getViewScript (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "view")).toString ());
}if (this.$ac == 0) this.asc.setInfo ("dataOnly", Boolean.TRUE);
this.pymolScene.offsetObjects ();
}, "java.util.Map");
Clazz.defineMethod (c$, "fixSettings", 
 function (settings) {
var n = settings.size ();
for (var i = 0; i < n; i++) {
var i2 = J.adapter.readers.pymol.PyMOLReader.intAt (settings.get (i), 0);
if (i2 == -1) {
JU.Logger.info ("PyMOL reader adding null setting #" + i);
settings.set (i,  new JU.Lst ());
} else {
while (i < i2) {
JU.Logger.info ("PyMOL reader adding null setting #" + i);
settings.add (i++,  new JU.Lst ());
n++;
}
}}
return settings;
}, "JU.Lst");
Clazz.defineMethod (c$, "getFrameScenes", 
 function (map) {
if (this.sceneOrder == null) return false;
var scenes = map.get ("scene_dict");
for (var i = 0; i < this.sceneOrder.size (); i++) {
var name = J.adapter.readers.pymol.PyMOLReader.stringAt (this.sceneOrder, i);
var thisScene = J.adapter.readers.pymol.PyMOLReader.getMapList (scenes, name);
if (thisScene == null || thisScene.get (2) == null) this.sceneOrder.removeItemAt (i--);
}
return (this.sceneOrder != null && this.sceneOrder.size () != 0);
}, "java.util.Map");
Clazz.defineMethod (c$, "setUniqueSettings", 
 function (list) {
this.uniqueSettings =  new java.util.Hashtable ();
var max = 0;
if (list != null && list.size () != 0) {
for (var i = list.size (); --i >= 0; ) {
var atomSettings = list.get (i);
var id = J.adapter.readers.pymol.PyMOLReader.intAt (atomSettings, 0);
if (id > max) max = id;
var mySettings = atomSettings.get (1);
for (var j = mySettings.size (); --j >= 0; ) {
var setting = mySettings.get (j);
var uid = (id << 10) + J.adapter.readers.pymol.PyMOLReader.intAt (setting, 0);
this.uniqueSettings.put (Integer.$valueOf (uid), setting);
}
}
}return max;
}, "JU.Lst");
Clazz.defineMethod (c$, "addColors", 
 function (colors, isClamped) {
if (colors == null || colors.size () == 0) return;
for (var i = colors.size (); --i >= 0; ) {
var c = J.adapter.readers.pymol.PyMOLReader.listAt (colors, i);
J.adapter.readers.pymol.PyMOL.addColor (c.get (1), isClamped ? J.adapter.readers.pymol.PyMOLReader.colorSettingClamped (c, this.ptTemp) : J.adapter.readers.pymol.PyMOLReader.getColorPt (c.get (2), this.ptTemp));
}
}, "JU.Lst,~B");
Clazz.defineMethod (c$, "getAtomAndStateCount", 
 function (names) {
var n = 0;
for (var i = 1; i < names.size (); i++) {
var execObject = J.adapter.readers.pymol.PyMOLReader.listAt (names, i);
var type = J.adapter.readers.pymol.PyMOLReader.intAt (execObject, 4);
if (!this.checkObject (execObject)) continue;
if (type == 1) {
var pymolObject = J.adapter.readers.pymol.PyMOLReader.listAt (execObject, 5);
var states = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 4);
var ns = states.size ();
if (ns > this.stateCount) this.stateCount = ns;
var nAtoms;
var nBonds;
if (this.haveBinaryArrays) {
nBonds = Clazz.doubleToInt ((J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 6).get (1)).length / 20);
nAtoms = Clazz.doubleToInt ((J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 7).get (1)).length / 120);
n += nAtoms;
} else {
nBonds = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 6).size ();
nAtoms = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 7).size ();
}System.out.println ("Object " + this.objectName + " nBonds=" + nBonds + ", nAtoms = " + nAtoms);
for (var j = 0; j < ns; j++) {
var state = J.adapter.readers.pymol.PyMOLReader.listAt (states, j);
var idxToAtm = J.adapter.readers.pymol.PyMOLReader.listAt (state, 3);
if (idxToAtm == null) {
this.isTrajectory = false;
} else {
var m = idxToAtm.size ();
n += m;
if (this.isTrajectory && m != nAtoms) this.isTrajectory = false;
}}
}}
this.totalAtomCount = n;
JU.Logger.info ("PyMOL total atom count = " + this.totalAtomCount);
JU.Logger.info ("PyMOL state count = " + this.stateCount);
}, "JU.Lst");
Clazz.defineMethod (c$, "checkObject", 
 function (execObject) {
this.objectName = J.adapter.readers.pymol.PyMOLReader.stringAt (execObject, 0);
this.isHidden = (J.adapter.readers.pymol.PyMOLReader.intAt (execObject, 2) != 1);
return (this.objectName.indexOf ("_") != 0);
}, "JU.Lst");
Clazz.defineMethod (c$, "processMovie", 
 function (mov, frameCount) {
var movie =  new java.util.Hashtable ();
movie.put ("frameCount", Integer.$valueOf (frameCount));
movie.put ("currentFrame", Integer.$valueOf (this.pymolFrame - 1));
var haveCommands = false;
var haveViews = false;
var haveFrames = false;
var list = J.adapter.readers.pymol.PyMOLReader.listAt (mov, 4);
for (var i = list.size (); --i >= 0; ) if (J.adapter.readers.pymol.PyMOLReader.intAt (list, i) != 0) {
this.frames =  Clazz.newIntArray (list.size (), 0);
for (var j = this.frames.length; --j >= 0; ) this.frames[j] = J.adapter.readers.pymol.PyMOLReader.intAt (list, j) + 1;

movie.put ("frames", this.frames);
haveFrames = true;
break;
}
var cmds = J.adapter.readers.pymol.PyMOLReader.listAt (mov, 5);
var cmd;
for (var i = cmds.size (); --i >= 0; ) if ((cmd = J.adapter.readers.pymol.PyMOLReader.stringAt (cmds, i)) != null && cmd.length > 1) {
cmds = J.adapter.readers.pymol.PyMOLReader.fixMovieCommands (cmds);
if (cmds != null) {
movie.put ("commands", cmds);
haveCommands = true;
break;
}}
var views = J.adapter.readers.pymol.PyMOLReader.listAt (mov, 6);
var view;
for (var i = views.size (); --i >= 0; ) if ((view = J.adapter.readers.pymol.PyMOLReader.listAt (views, i)) != null && view.size () >= 12 && view.get (1) != null) {
haveViews = true;
views = J.adapter.readers.pymol.PyMOLReader.fixMovieViews (views);
if (views != null) {
movie.put ("views", views);
break;
}}
this.appendLoadNote ("PyMOL movie frameCount = " + frameCount);
if (haveFrames && !haveCommands && !haveViews) {
this.isMovie = true;
this.pymolScene.setReaderObjectInfo (null, 0, null, false, null, null, null);
this.pymolScene.setFrameObject (1073742031, movie);
} else {
}}, "JU.Lst,~N");
c$.fixMovieViews = Clazz.defineMethod (c$, "fixMovieViews", 
 function (views) {
return views;
}, "JU.Lst");
c$.fixMovieCommands = Clazz.defineMethod (c$, "fixMovieCommands", 
 function (cmds) {
return cmds;
}, "JU.Lst");
Clazz.defineMethod (c$, "processObject", 
 function (execObject, moleculeOnly, iState) {
if (execObject == null) return;
var type = J.adapter.readers.pymol.PyMOLReader.intAt (execObject, 4);
var startLen = execObject.get (execObject.size () - 1);
if ((type == 1) != moleculeOnly || !this.checkObject (execObject)) return;
var pymolObject = J.adapter.readers.pymol.PyMOLReader.listAt (execObject, 5);
var stateSettings = null;
if (type == 1) {
var states = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 4);
var state = J.adapter.readers.pymol.PyMOLReader.listAt (states, iState);
var idxToAtm = J.adapter.readers.pymol.PyMOLReader.listAt (state, 3);
if (iState > 0 && (idxToAtm == null || idxToAtm.size () == 0)) return;
stateSettings = J.adapter.readers.pymol.PyMOLReader.listAt (state, 7);
} else if (iState > 0) {
return;
}JU.Logger.info ("PyMOL model " + (this.nModels) + " Object " + this.objectName + (this.isHidden ? " (hidden)" : " (visible)"));
if (!this.isHidden && !this.isMovie && !this.allStates) {
if (this.pymolFrame > 0 && this.pymolFrame != this.nModels) {
this.pymolFrame = this.nModels;
this.allStates = true;
this.pymolScene.setFrameObject (4115, Integer.$valueOf (-1));
}}var objectHeader = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 0);
var parentGroupName = (execObject.size () < 8 ? null : J.adapter.readers.pymol.PyMOLReader.stringAt (execObject, 6));
if ("".equals (parentGroupName.trim ())) parentGroupName = null;
this.pymolScene.setReaderObjectInfo (this.objectName, type, parentGroupName, this.isHidden, J.adapter.readers.pymol.PyMOLReader.listAt (objectHeader, 8), stateSettings, (moleculeOnly ? "_" + (iState + 1) : ""));
var bsAtoms = null;
var doExclude = (this.bsBytesExcluded != null);
var msg = null;
switch (type) {
default:
msg = "" + type;
break;
case -1:
this.pymolScene.processSelection (execObject);
break;
case 1:
doExclude = false;
bsAtoms = this.processMolecule (pymolObject, iState);
break;
case 4:
doExclude = false;
this.processMeasure (pymolObject);
break;
case 3:
case 2:
this.processMap (pymolObject, type == 3, false);
break;
case 8:
this.processGadget (pymolObject);
break;
case 12:
if (parentGroupName == null) parentGroupName = "";
break;
case 6:
msg = "CGO";
this.processCGO (pymolObject);
break;
case 11:
msg = "ALIGNEMENT";
break;
case 9:
msg = "CALCULATOR";
break;
case 5:
msg = "CALLBACK";
break;
case 10:
msg = "SLICE";
break;
case 7:
msg = "SURFACE";
break;
}
if (parentGroupName != null || bsAtoms != null) this.pymolScene.addGroup (execObject, parentGroupName, type, bsAtoms);
if (doExclude) {
var i0 = J.adapter.readers.pymol.PyMOLReader.intAt (startLen, 0);
var len = J.adapter.readers.pymol.PyMOLReader.intAt (startLen, 1);
this.bsBytesExcluded.setBits (i0, i0 + len);
JU.Logger.info ("cached PSE file excludes PyMOL object type " + type + " name=" + this.objectName + " len=" + len);
}if (msg != null) JU.Logger.error ("Unprocessed object type " + msg + " " + this.objectName);
}, "JU.Lst,~B,~N");
Clazz.defineMethod (c$, "processCGO", 
 function (pymolObject) {
if (this.isStateScript) return;
if (this.isHidden) return;
var data = J.adapter.readers.pymol.PyMOLReader.sublistAt (pymolObject, [2, 0]);
var color = J.adapter.readers.pymol.PyMOL.getRGB (J.adapter.readers.pymol.PyMOLReader.intAt (J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 0), 2));
var name = this.pymolScene.addCGO (data, color);
if (name != null) this.appendLoadNote ("CGO " + name);
}, "JU.Lst");
Clazz.defineMethod (c$, "processGadget", 
 function (pymolObject) {
if (this.objectName.endsWith ("_e_pot")) this.processMap (pymolObject, true, true);
}, "JU.Lst");
Clazz.defineMethod (c$, "processMap", 
 function (pymolObject, isObject, isGadget) {
if (isObject) {
if (this.sourcePNGJ) return;
if (this.isHidden && !isGadget) return;
if (this.mapObjects == null) this.mapObjects =  new JU.Lst ();
this.mapObjects.addLast (pymolObject);
} else {
if (this.volumeData == null) this.volumeData =  new java.util.Hashtable ();
this.volumeData.put (this.objectName, pymolObject);
if (!this.isHidden && !this.isStateScript) this.pymolScene.addIsosurface (this.objectName);
}pymolObject.addLast (this.objectName);
}, "JU.Lst,~B,~B");
Clazz.defineMethod (c$, "processMeasure", 
 function (pymolObject) {
if (this.isStateScript) return;
if (this.isHidden) return;
JU.Logger.info ("PyMOL measure " + this.objectName);
var measure = J.adapter.readers.pymol.PyMOLReader.sublistAt (pymolObject, [2, 0]);
var pt;
var nCoord = (Clazz.instanceOf (measure.get (pt = 1), JU.Lst) ? 2 : Clazz.instanceOf (measure.get (pt = 4), JU.Lst) ? 3 : Clazz.instanceOf (measure.get (pt = 6), JU.Lst) ? 4 : 0);
if (nCoord == 0) return;
var setting = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 0);
var bsReps = J.adapter.readers.pymol.PyMOLReader.getBsReps (J.adapter.readers.pymol.PyMOLReader.listAt (setting, 3));
var list = J.adapter.readers.pymol.PyMOLReader.listAt (measure, pt);
var offsets = J.adapter.readers.pymol.PyMOLReader.listAt (measure, 8);
var haveLabels = (measure.size () > 8);
var color = J.adapter.readers.pymol.PyMOLReader.intAt (setting, 2);
if (this.pymolScene.addMeasurements (null, nCoord, list, bsReps, color, offsets, haveLabels)) this.haveMeasurements = true;
}, "JU.Lst");
Clazz.defineMethod (c$, "processMolecule", 
 function (pymolObject, iState) {
var states = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 4);
var state = J.adapter.readers.pymol.PyMOLReader.listAt (states, iState);
var idxToAtm;
var coords;
var labelPositions;
var idxArray = null;
var coordsArray = null;
var labelArray = null;
var nBonds = J.adapter.readers.pymol.PyMOLReader.intAt (pymolObject, 2);
var nAtoms = J.adapter.readers.pymol.PyMOLReader.intAt (pymolObject, 3);
var n = nAtoms;
if (this.haveBinaryArrays && JU.AU.isAB (state.get (3))) {
idxToAtm = coords = labelPositions = null;
idxArray =  Clazz.newIntArray (nAtoms, 0);
coordsArray =  Clazz.newFloatArray (nAtoms * 3, 0);
this.fillFloatArrayFromBytes (state.get (2), coordsArray);
this.fillIntArrayFromBytes (state.get (3), idxArray);
var b = state.get (8);
if (b != null) {
labelArray =  Clazz.newFloatArray (nAtoms * 7, 0);
this.fillFloatArrayFromBytes (b, labelArray);
}} else {
coords = J.adapter.readers.pymol.PyMOLReader.listAt (state, 2);
idxToAtm = J.adapter.readers.pymol.PyMOLReader.listAt (state, 3);
labelPositions = J.adapter.readers.pymol.PyMOLReader.listAt (state, 8);
if (idxToAtm != null) n = idxToAtm.size ();
}if (n == 0) return null;
this.$ac = this.ac0 = this.asc.ac;
if (nAtoms == 0) return null;
this.ssMapSeq =  new java.util.Hashtable ();
if (iState == 0) this.processMolCryst (J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 10));
var bonds = this.getBondList (J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 6));
var pymolAtoms = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 7);
this.atomMap =  Clazz.newIntArray (nAtoms, 0);
var bsAtoms = this.pymolScene.setAtomMap (this.atomMap, this.ac0);
for (var i = 0; i < 23; i++) this.reps[i] = JU.BS.newN (1000);

if (iState == 0 || !this.isTrajectory) {
this.pymolScene.ensureCapacity (n);
var lexStr = null;
var atomArray = null;
var vArray = null;
if (this.haveBinaryArrays) {
var ver = J.adapter.readers.pymol.PyMOLReader.intAt (pymolAtoms, 0);
atomArray = pymolAtoms.get (1);
lexStr = this.getLexStr (pymolAtoms.get (2));
System.out.println ("PyMOL atom dump version " + ver);
vArray = (this.haveBinaryArrays ? J.adapter.readers.pymol.PyMOL.getVArray (ver) : null);
}for (var idx = 0; idx < n; idx++) {
var a = this.addAtom (pymolAtoms, (idxToAtm != null ? J.adapter.readers.pymol.PyMOLReader.intAt (idxToAtm, idx) : idxArray != null ? idxArray[idx] : idx), atomArray, vArray, lexStr, idx, coords, coordsArray, labelPositions, labelArray, bsAtoms, iState);
if (a != null) this.trajectoryStep[this.trajectoryPtr++] = a;
}
}this.addBonds (bonds);
this.addMolStructures ();
this.atoms = this.asc.atoms;
if (!this.isStateScript) this.createShapeObjects ();
this.ssMapSeq = null;
JU.Logger.info ("reading " + (this.$ac - this.ac0) + " atoms and " + nBonds + " bonds");
JU.Logger.info ("----------");
return bsAtoms;
}, "JU.Lst,~N");
Clazz.defineMethod (c$, "getLexStr", 
 function (lex) {
var pt = 0;
var n = JU.BC.bytesToInt (lex, pt, false);
var index =  Clazz.newIntArray (n, 0);
var imax = 0;
for (var i = 0; i < n; i++) {
pt += 4;
var ipt = index[i] = JU.BC.bytesToInt (lex, pt, false);
if (ipt > imax) imax = ipt;
}
var tokens =  new Array (imax + 1);
tokens[0] = " ";
pt += 4;
for (var i = 0; i < n; i++) {
var s = tokens[index[i]] = this.getCStr (lex, pt);
pt += s.length + 1;
}
return tokens;
}, "~A");
Clazz.defineMethod (c$, "getCStr", 
 function (lex, pt) {
try {
var a = this.aTemp;
var apt = 0;
var b = 0;
while ((b = lex[pt++]) != 0) {
if (apt >= a.length) a = this.aTemp = JU.AU.doubleLengthByte (a);
a[apt++] = b;
}
return  String.instantialize (JU.AU.arrayCopyByte (a, apt), "UTF-8");
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
return null;
} else {
throw e;
}
}
}, "~A,~N");
Clazz.defineMethod (c$, "processMolCryst", 
 function (cryst) {
if (cryst == null || cryst.size () == 0) return;
var l = J.adapter.readers.pymol.PyMOLReader.sublistAt (cryst, [0, 0]);
var a = J.adapter.readers.pymol.PyMOLReader.sublistAt (cryst, [0, 1]);
this.setUnitCell (J.adapter.readers.pymol.PyMOLReader.floatAt (l, 0), J.adapter.readers.pymol.PyMOLReader.floatAt (l, 1), J.adapter.readers.pymol.PyMOLReader.floatAt (l, 2), J.adapter.readers.pymol.PyMOLReader.floatAt (a, 0), J.adapter.readers.pymol.PyMOLReader.floatAt (a, 1), J.adapter.readers.pymol.PyMOLReader.floatAt (a, 2));
this.setSpaceGroupName (J.adapter.readers.pymol.PyMOLReader.stringAt (cryst, 1));
}, "JU.Lst");
Clazz.defineMethod (c$, "getBondList", 
 function (bonds) {
var asSingle = !this.pymolScene.booleanSetting (64);
var b = null;
var vArray = null;
var n = bonds.size ();
var len = 0;
if (this.haveBinaryArrays && n == 2) {
var ver = J.adapter.readers.pymol.PyMOLReader.intAt (bonds, 0);
System.out.println ("PyMOL bond dump version " + ver);
vArray = J.adapter.readers.pymol.PyMOL.getVArrayB (ver);
b = bonds.get (1);
len = vArray[0];
n = Clazz.doubleToInt (b.length / len);
}var bondList =  new JU.Lst ();
bondList.ensureCapacity (n);
var ia;
var ib;
var order;
var uid = -1;
for (var i = 0, apt = 0; i < n; i++) {
if (this.haveBinaryArrays) {
ia = JU.BC.bytesToInt (b, apt + vArray[1], false);
ib = JU.BC.bytesToInt (b, apt + vArray[2], false);
uid = (b[apt + vArray[6]] == 0 ? -1 : JU.BC.bytesToInt (b, apt + vArray[5], false));
order = b[apt + vArray[3]];
apt += len;
} else {
var lst = J.adapter.readers.pymol.PyMOLReader.listAt (bonds, i);
ia = J.adapter.readers.pymol.PyMOLReader.intAt (lst, 0);
ib = J.adapter.readers.pymol.PyMOLReader.intAt (lst, 1);
order = J.adapter.readers.pymol.PyMOLReader.intAt (lst, 2);
uid = (lst.size () > 6 && J.adapter.readers.pymol.PyMOLReader.intAt (lst, 6) != 0 ? J.adapter.readers.pymol.PyMOLReader.intAt (lst, 5) : -1);
}if (order < 1 || order > 3) order = 1;
order |= (asSingle || order == 1 ? 65536 : 98304);
var bond =  new J.adapter.smarter.Bond (ia, ib, order);
bond.uniqueID = uid;
bondList.addLast (bond);
}
return bondList;
}, "JU.Lst");
Clazz.defineMethod (c$, "fillIntArrayFromBytes", 
 function (b, array) {
for (var i = 0, pt = 0; i < b.length; i += 4) array[pt++] = JU.BC.bytesToInt (b, i, false);

}, "~A,~A");
Clazz.defineMethod (c$, "fillFloatArrayFromBytes", 
 function (b, array) {
try {
for (var i = 0, pt = 0; i < b.length; i += 4) array[pt++] = JU.BC.bytesToFloat (b, i, false);

} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~A,~A");
Clazz.defineMethod (c$, "addAtom", 
 function (pymolAtoms, apt, atomArray, vArray, lexStr, icoord, coords, coordArray, labelPositions, labelArray, bsState, iState) {
this.atomMap[apt] = -1;
var chainID;
var altLoc;
var group3;
var name;
var sym;
var label;
var ssType;
var resi;
var insCode = null;
var bfactor;
var occupancy;
var radius;
var partialCharge;
var seqNo;
var intReps;
var formalCharge;
var atomColor;
var serNo;
var cartoonType;
var flags;
var uniqueID = -1;
var isHetero;
var bonded;
var anisou = null;
var bsReps = null;
if (this.haveBinaryArrays) {
var vpt;
var pt = apt * vArray[0];
seqNo = this.atomInt (atomArray, pt, vArray[1]);
chainID = this.atomStr (atomArray, pt, vArray[34], lexStr);
resi = this.atomStr (atomArray, pt, vArray[38], lexStr);
group3 = this.atomStr (atomArray, pt, vArray[41], lexStr);
if (group3.length > 3) group3 = group3.substring (0, 3);
name = this.atomStr (atomArray, pt, vArray[36], lexStr);
sym = this.atomStr (atomArray, pt, vArray[37], lexStr);
label = this.atomStr (atomArray, pt, vArray[19], lexStr);
ssType = this.atomStr (atomArray, pt, vArray[39], null);
altLoc = this.atomStr (atomArray, pt, vArray[40], null);
if ((vpt = vArray[42]) == 0) {
resi = this.atomStr (atomArray, pt, vArray[38], null);
} else {
var b = atomArray[pt + vpt];
insCode = (b == 0 ? " " : "" + String.fromCharCode (b));
}bfactor = this.atomFloat (atomArray, pt, vArray[4]);
occupancy = this.atomFloat (atomArray, pt, vArray[5]);
radius = this.atomFloat (atomArray, pt, vArray[6]);
partialCharge = this.atomFloat (atomArray, pt, vArray[7]);
formalCharge = atomArray[pt + vArray[28]];
if (formalCharge > 125) formalCharge -= 512;
intReps = this.atomInt (atomArray, pt, vArray[20]);
atomColor = this.atomInt (atomArray, pt, vArray[9]);
serNo = this.atomInt (atomArray, pt, vArray[10]);
cartoonType = this.atomInt (atomArray, pt, vArray[30]);
flags = this.atomInt (atomArray, pt, vArray[11]);
uniqueID = this.atomInt (atomArray, pt, vArray[13]);
if (uniqueID == 0) uniqueID = -1;
anisou =  Clazz.newFloatArray (8, 0);
if ((vpt = vArray[45]) > 0) for (var i = 0; i < 6; i++) anisou[i] = JU.BC.bytesToShort (atomArray, pt + vpt + (i << 1), false);

bonded = this.atomBool (atomArray, pt, vArray[22], vArray[47]);
isHetero = this.atomBool (atomArray, pt, vArray[21], vArray[46]);
} else {
var a = J.adapter.readers.pymol.PyMOLReader.listAt (pymolAtoms, apt);
seqNo = J.adapter.readers.pymol.PyMOLReader.intAt (a, 0);
chainID = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 1);
if (chainID.length == 0) chainID = " ";
altLoc = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 2);
resi = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 3);
group3 = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 5);
name = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 6);
sym = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 7);
label = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 9);
ssType = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 10);
if (ssType.length == 0) ssType = " ";
ssType = ssType.substring (0, 1);
bfactor = J.adapter.readers.pymol.PyMOLReader.floatAt (a, 14);
occupancy = J.adapter.readers.pymol.PyMOLReader.floatAt (a, 15);
radius = J.adapter.readers.pymol.PyMOLReader.floatAt (a, 16);
partialCharge = J.adapter.readers.pymol.PyMOLReader.floatAt (a, 17);
formalCharge = J.adapter.readers.pymol.PyMOLReader.intAt (a, 18);
isHetero = (J.adapter.readers.pymol.PyMOLReader.intAt (a, 19) != 0);
bsReps = J.adapter.readers.pymol.PyMOLReader.getBsReps (J.adapter.readers.pymol.PyMOLReader.listAt (a, 20));
intReps = (bsReps == null ? J.adapter.readers.pymol.PyMOLReader.intAt (a, 20) : 0);
atomColor = J.adapter.readers.pymol.PyMOLReader.intAt (a, 21);
serNo = J.adapter.readers.pymol.PyMOLReader.intAt (a, 22);
cartoonType = J.adapter.readers.pymol.PyMOLReader.intAt (a, 23);
flags = J.adapter.readers.pymol.PyMOLReader.intAt (a, 24);
bonded = (J.adapter.readers.pymol.PyMOLReader.intAt (a, 25) != 0);
uniqueID = (a.size () > 40 && J.adapter.readers.pymol.PyMOLReader.intAt (a, 40) == 1 ? J.adapter.readers.pymol.PyMOLReader.intAt (a, 32) : -1);
if (a.size () > 46) anisou = J.adapter.readers.pymol.PyMOLReader.floatsAt (a, 41,  Clazz.newFloatArray (8, 0), 6);
}if (insCode == null) {
var len = resi.length;
var ch = (len > 0 ? resi.charAt (len - 1) : ' ');
insCode = (JU.PT.isDigit (ch) ? " " : "" + ch);
}if (group3.length > 3) group3 = group3.substring (0, 3);
if (group3.equals (" ")) group3 = "UNK";
if (sym.equals ("A")) sym = "C";
var ichain = this.vwr.getChainID (chainID, true);
var atom = this.processAtom ( new J.adapter.smarter.Atom (), name, (altLoc.length == 0 ? ' ' : altLoc.charAt (0)), group3, ichain, seqNo, insCode.charAt (0), isHetero, sym);
if (!this.filterPDBAtom (atom, this.fileAtomIndex++)) return null;
var x;
var y;
var z;
icoord *= 3;
if (this.haveBinaryArrays) {
x = coordArray[icoord];
y = coordArray[++icoord];
z = coordArray[++icoord];
} else {
x = J.adapter.readers.pymol.PyMOLReader.floatAt (coords, icoord);
y = J.adapter.readers.pymol.PyMOLReader.floatAt (coords, ++icoord);
z = J.adapter.readers.pymol.PyMOLReader.floatAt (coords, ++icoord);
}JU.BoxInfo.addPointXYZ (x, y, z, this.xyzMin, this.xyzMax, 0);
if (this.isTrajectory && iState > 0) return null;
var isNucleic = (J.adapter.readers.pymol.PyMOLReader.nucleic.indexOf (group3) >= 0);
if (bsState != null) bsState.set (this.$ac);
if (seqNo >= -1000 && (!ssType.equals (" ") || name.equals ("CA") || isNucleic)) {
var bs = this.ssMapSeq.get (ssType);
if (bs == null) this.ssMapSeq.put (ssType, bs =  new JU.BS ());
bs.set (seqNo - -1000);
ssType += ichain;
bs = this.ssMapSeq.get (ssType);
if (bs == null) this.ssMapSeq.put (ssType, bs =  new JU.BS ());
bs.set (seqNo - -1000);
}atom.bfactor = bfactor;
atom.foccupancy = occupancy;
atom.radius = radius;
if (atom.radius == 0) atom.radius = 1;
atom.partialCharge = partialCharge;
atom.vib = JU.V3.new3 (uniqueID, cartoonType, NaN);
if (anisou != null && anisou[0] != 0) this.asc.setAnisoBorU (atom, anisou, 12);
this.pymolScene.setAtomColor (atomColor);
this.processAtom2 (atom, serNo, x, y, z, formalCharge);
if (!bonded) this.pymolScene.bsNonbonded.set (this.$ac);
if (!label.equals (" ")) {
this.pymolScene.bsLabeled.set (this.$ac);
var labelPos =  Clazz.newFloatArray (7, 0);
if (labelArray != null) {
for (var i = 0; i < 7; i++) labelPos[i] = labelArray[apt * 7 + i];

} else {
var labelOffset = J.adapter.readers.pymol.PyMOLReader.listAt (labelPositions, apt);
if (labelOffset != null) {
for (var i = 0; i < 7; i++) labelPos[i] = J.adapter.readers.pymol.PyMOLReader.floatAt (labelOffset, i);

}}this.pymolScene.addLabel (this.$ac, uniqueID, atomColor, labelPos, label);
}if (this.isHidden) this.pymolScene.bsHidden.set (this.$ac);
if (isNucleic) this.pymolScene.bsNucleic.set (this.$ac);
for (var i = 0; i < 21; i++) if (bsReps == null ? ((intReps & (1 << i)) != 0) : bsReps.get (i)) this.reps[i].set (this.$ac);

if (atom.elementSymbol.equals ("H")) this.pymolScene.bsHydrogen.set (this.$ac);
if ((flags & J.adapter.readers.pymol.PyMOL.FLAG_NOSURFACE) != 0) this.pymolScene.bsNoSurface.set (this.$ac);
this.atomMap[apt] = this.$ac++;
return null;
}, "JU.Lst,~N,~A,~A,~A,~N,JU.Lst,~A,JU.Lst,~A,JU.BS,~N");
Clazz.defineMethod (c$, "atomBool", 
 function (atomArray, pt, offset, mask) {
return ((atomArray[pt + offset] & mask) != 0);
}, "~A,~N,~N,~N");
Clazz.defineMethod (c$, "atomFloat", 
 function (atomArray, pt, offset) {
try {
return JU.BC.bytesToFloat (atomArray, pt + offset, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}, "~A,~N,~N");
Clazz.defineMethod (c$, "atomStr", 
 function (atomArray, pt, offset, lexStr) {
if (offset < 0) return lexStr[JU.BC.bytesToInt (atomArray, pt - offset, false)];
var s = this.getCStr (atomArray, pt + offset);
return (s.length == 0 ? " " : s);
}, "~A,~N,~N,~A");
Clazz.defineMethod (c$, "atomInt", 
 function (atomArray, pt, offset) {
return JU.BC.bytesToInt (atomArray, pt + offset, false);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "addBonds", 
 function (bonds) {
var n = bonds.size ();
for (var i = 0; i < n; i++) {
var bond = bonds.get (i);
bond.atomIndex1 = this.atomMap[bond.atomIndex1];
bond.atomIndex2 = this.atomMap[bond.atomIndex2];
if (bond.atomIndex1 < 0 || bond.atomIndex2 < 0) continue;
this.pymolScene.setUniqueBond (this.bondCount++, bond.uniqueID);
this.asc.addBond (bond);
}
}, "JU.Lst");
Clazz.defineMethod (c$, "addMolStructures", 
 function () {
this.addMolSS ("H", J.c.STR.HELIX);
this.addMolSS ("S", J.c.STR.SHEET);
this.addMolSS ("L", J.c.STR.TURN);
this.addMolSS (" ", J.c.STR.NONE);
});
Clazz.defineMethod (c$, "addMolSS", 
 function (ssType, type) {
if (this.ssMapSeq.get (ssType) == null) return;
var istart = -1;
var iend = -1;
var ichain = 0;
var atoms = this.asc.atoms;
var bsSeq = null;
var bsAtom = this.pymolScene.getSSMapAtom (ssType);
var n = this.$ac + 1;
var seqNo = -1;
var thischain = 0;
var imodel = -1;
var thisModel = -1;
for (var i = this.ac0; i < n; i++) {
if (i == this.$ac) {
thischain = 0;
} else {
seqNo = atoms[i].sequenceNumber;
thischain = atoms[i].chainID;
thisModel = atoms[i].atomSetIndex;
}if (thischain != ichain || thisModel != imodel) {
ichain = thischain;
imodel = thisModel;
bsSeq = this.ssMapSeq.get (ssType + thischain);
--i;
if (istart < 0) continue;
} else if (bsSeq != null && seqNo >= -1000 && bsSeq.get (seqNo - -1000)) {
iend = i;
if (istart < 0) istart = i;
continue;
} else if (istart < 0) {
continue;
}if (type !== J.c.STR.NONE) {
var pt = this.bsStructureDefined.nextSetBit (istart);
if (pt >= 0 && pt <= iend) continue;
this.bsStructureDefined.setBits (istart, iend + 1);
var structure =  new J.adapter.smarter.Structure (imodel, type, type, type.toString (), ++this.structureCount, type === J.c.STR.SHEET ? 1 : 0, null);
var a = atoms[istart];
var b = atoms[iend];
var i0 = this.asc.getAtomSetAtomIndex (thisModel);
structure.set (a.chainID, a.sequenceNumber, a.insertionCode, b.chainID, b.sequenceNumber, b.insertionCode, istart - i0, iend - i0);
this.asc.addStructure (structure);
}bsAtom.setBits (istart, iend + 1);
istart = -1;
}
}, "~S,J.c.STR");
Clazz.defineMethod (c$, "createShapeObjects", 
 function () {
this.pymolScene.createShapeObjects (this.reps, this.allowSurface && !this.isHidden, this.ac0, this.$ac);
});
Clazz.defineMethod (c$, "processMeshes", 
 function () {
var fileName = this.vwr.fm.getFilePath (this.pymolScene.surfaceInfoName, true, false);
this.vwr.cachePut (fileName, this.volumeData);
for (var i = this.mapObjects.size (); --i >= 0; ) {
var obj = this.mapObjects.get (i);
var objName = obj.get (obj.size () - 1).toString ();
var isMep = objName.endsWith ("_e_pot");
var mapName;
var tok;
if (isMep) {
tok = 1073742016;
var root = objName.substring (0, objName.length - 3);
mapName = root + "map";
var isosurfaceName = this.pymolScene.getObjectID (root + "chg");
if (isosurfaceName == null) continue;
obj.addLast (isosurfaceName);
this.pymolScene.mepList += ";" + isosurfaceName + ";";
} else {
tok = 1073742018;
mapName = J.adapter.readers.pymol.PyMOLReader.stringAt (J.adapter.readers.pymol.PyMOLReader.sublistAt (obj, [2, 0]), 1);
}var surface = this.volumeData.get (mapName);
if (surface == null) continue;
obj.addLast (mapName);
this.volumeData.put (objName, obj);
this.volumeData.put ("__pymolSurfaceData__", obj);
if (!this.isStateScript) this.pymolScene.addMesh (tok, obj, objName, isMep);
this.appendLoadNote ("PyMOL object " + objName + " references map " + mapName);
}
});
Clazz.defineMethod (c$, "processDefinitions", 
 function () {
var s = this.vwr.getAtomDefs (this.pymolScene.setAtomDefs ());
if (s.length > 2) s = s.substring (0, s.length - 2);
this.appendLoadNote (s);
});
Clazz.defineMethod (c$, "processSelectionsAndScenes", 
 function (map) {
if (!this.pymolScene.needSelections ()) return;
var htObjNames = J.adapter.readers.pymol.PyMOLReader.listToMap (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "names"));
if (this.haveScenes) {
var scenes = map.get ("scene_dict");
this.finalizeSceneData ();
var htSecrets = J.adapter.readers.pymol.PyMOLReader.listToMap (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "selector_secrets"));
for (var i = 0; i < this.sceneOrder.size (); i++) {
var name = J.adapter.readers.pymol.PyMOLReader.stringAt (this.sceneOrder, i);
var thisScene = J.adapter.readers.pymol.PyMOLReader.getMapList (scenes, name);
if (thisScene == null) continue;
this.pymolScene.buildScene (name, thisScene, htObjNames, htSecrets);
this.appendLoadNote ("scene: " + name);
}
}this.pymolScene.setCarveSets (htObjNames);
}, "java.util.Map");
Clazz.defineMethod (c$, "finalizeSceneData", 
 function () {
var cartoonTypes =  Clazz.newIntArray (this.$ac, 0);
var uniqueIDs =  Clazz.newIntArray (this.$ac, 0);
var sequenceNumbers =  Clazz.newIntArray (this.$ac, 0);
var newChain =  Clazz.newBooleanArray (this.$ac, false);
var radii =  Clazz.newFloatArray (this.$ac, 0);
var lastAtomChain = -2147483648;
var lastAtomSet = -2147483648;
for (var i = 0; i < this.$ac; i++) {
cartoonTypes[i] = this.getCartoonType (i);
uniqueIDs[i] = this.getUniqueID (i);
sequenceNumbers[i] = this.getSequenceNumber (i);
radii[i] = this.getVDW (i);
if (lastAtomChain != this.atoms[i].chainID || lastAtomSet != this.atoms[i].atomSetIndex) {
newChain[i] = true;
lastAtomChain = this.atoms[i].chainID;
lastAtomSet = this.atoms[i].atomSetIndex;
}}
this.pymolScene.setAtomInfo (uniqueIDs, cartoonTypes, sequenceNumbers, newChain, radii);
});
c$.intAt = Clazz.defineMethod (c$, "intAt", 
function (list, i) {
return (list == null ? -1 : (list.get (i)).intValue ());
}, "JU.Lst,~N");
c$.pointAt = Clazz.defineMethod (c$, "pointAt", 
function (list, i, pt) {
pt.set (J.adapter.readers.pymol.PyMOLReader.floatAt (list, i++), J.adapter.readers.pymol.PyMOLReader.floatAt (list, i++), J.adapter.readers.pymol.PyMOLReader.floatAt (list, i));
return pt;
}, "JU.Lst,~N,JU.P3");
c$.floatsAt = Clazz.defineMethod (c$, "floatsAt", 
function (a, pt, data, len) {
if (a == null) return null;
for (var i = 0; i < len; i++) data[i] = J.adapter.readers.pymol.PyMOLReader.floatAt (a, pt++);

return data;
}, "JU.Lst,~N,~A,~N");
c$.floatAt = Clazz.defineMethod (c$, "floatAt", 
function (list, i) {
return (list == null || i >= list.size () ? 0 : (list.get (i)).floatValue ());
}, "JU.Lst,~N");
c$.listAt = Clazz.defineMethod (c$, "listAt", 
function (list, i) {
if (list == null || i >= list.size ()) return null;
var o = list.get (i);
return (Clazz.instanceOf (o, JU.Lst) ? o : null);
}, "JU.Lst,~N");
c$.sublistAt = Clazz.defineMethod (c$, "sublistAt", 
function (mesh, pt) {
for (var i = 0; i < pt.length; i++) mesh = mesh.get (pt[i]);

return mesh;
}, "JU.Lst,~A");
c$.listToMap = Clazz.defineMethod (c$, "listToMap", 
function (list) {
var map =  new java.util.Hashtable ();
for (var i = list.size (); --i >= 0; ) {
var item = J.adapter.readers.pymol.PyMOLReader.listAt (list, i);
if (item != null && item.size () > 0) map.put (J.adapter.readers.pymol.PyMOLReader.stringAt (item, 0), item);
}
return map;
}, "JU.Lst");
c$.stringAt = Clazz.defineMethod (c$, "stringAt", 
function (list, i) {
var o = list.get (i);
if (Clazz.instanceOf (o, String)) return o;
var a = list.get (i);
return (a.length == 0 ? " " : J.adapter.readers.pymol.PyMOLReader.bytesToString (a));
}, "JU.Lst,~N");
c$.bytesToString = Clazz.defineMethod (c$, "bytesToString", 
 function (object) {
try {
return  String.instantialize (object, "UTF-8");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return object.toString ();
} else {
throw e;
}
}
}, "~O");
c$.colorSettingClamped = Clazz.defineMethod (c$, "colorSettingClamped", 
function (c, ptTemp) {
return J.adapter.readers.pymol.PyMOLReader.getColorPt (c.get (c.size () < 6 || J.adapter.readers.pymol.PyMOLReader.intAt (c, 4) == 0 ? 2 : 5), ptTemp);
}, "JU.Lst,JU.P3");
c$.getColorPt = Clazz.defineMethod (c$, "getColorPt", 
function (o, ptTemp) {
return (o == null ? 0 : Clazz.instanceOf (o, Integer) ? (o).intValue () : JU.CU.colorPtToFFRGB (J.adapter.readers.pymol.PyMOLReader.pointAt (o, 0, ptTemp)));
}, "~O,JU.P3");
c$.getMapList = Clazz.defineMethod (c$, "getMapList", 
 function (map, key) {
return map.get (key);
}, "java.util.Map,~S");
c$.getBsReps = Clazz.defineMethod (c$, "getBsReps", 
 function (list) {
if (list == null) return null;
var bsReps =  new JU.BS ();
var n = Math.min (list.size (), 21);
for (var i = 0; i < n; i++) {
if (J.adapter.readers.pymol.PyMOLReader.intAt (list, i) == 1) bsReps.set (i);
}
return bsReps;
}, "JU.Lst");
Clazz.overrideMethod (c$, "getUniqueID", 
function (iAtom) {
return Clazz.floatToInt (this.atoms[iAtom].vib.x);
}, "~N");
Clazz.overrideMethod (c$, "getCartoonType", 
function (iAtom) {
return Clazz.floatToInt (this.atoms[iAtom].vib.y);
}, "~N");
Clazz.overrideMethod (c$, "getVDW", 
function (iAtom) {
return this.atoms[iAtom].radius;
}, "~N");
Clazz.overrideMethod (c$, "getSequenceNumber", 
function (iAtom) {
return this.atoms[iAtom].sequenceNumber;
}, "~N");
Clazz.overrideMethod (c$, "compareAtoms", 
function (iPrev, i) {
return this.atoms[iPrev].chainID != this.atoms[i].chainID;
}, "~N,~N");
Clazz.defineStatics (c$,
"MIN_RESNO", -1000,
"nucleic", " A C G T U ADE THY CYT GUA URI DA DC DG DT DU ");
});
