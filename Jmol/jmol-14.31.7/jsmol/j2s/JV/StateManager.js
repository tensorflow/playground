Clazz.declarePackage ("JV");
Clazz.load (["java.util.Hashtable"], ["JV.Connection", "$.Scene", "$.StateManager", "$.Connections"], ["java.util.Arrays", "JU.BS", "$.SB", "JM.Orientation", "JU.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.saved = null;
this.lastOrientation = "";
this.lastContext = "";
this.lastConnections = "";
this.lastScene = "";
this.lastSelected = "";
this.lastState = "";
this.lastShape = "";
this.lastCoordinates = "";
Clazz.instantialize (this, arguments);
}, JV, "StateManager");
Clazz.prepareFields (c$, function () {
this.saved =  new java.util.Hashtable ();
});
c$.getVariableList = Clazz.defineMethod (c$, "getVariableList", 
function (htVariables, nMax, withSites, definedOnly) {
var sb =  new JU.SB ();
var n = 0;
var list =  new Array (htVariables.size ());
for (var entry, $entry = htVariables.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var $var = entry.getValue ();
if ((withSites || !key.startsWith ("site_")) && (!definedOnly || key.charAt (0) == '@')) list[n++] = key + (key.charAt (0) == '@' ? " " + $var.asString () : " = " + JV.StateManager.varClip (key, $var.escape (), nMax));
}
java.util.Arrays.sort (list, 0, n);
for (var i = 0; i < n; i++) if (list[i] != null) sb.append ("  ").append (list[i]).append (";\n");

if (n == 0 && !definedOnly) sb.append ("# --no global user variables defined--;\n");
return sb.toString ();
}, "java.util.Map,~N,~B,~B");
c$.getObjectIdFromName = Clazz.defineMethod (c$, "getObjectIdFromName", 
function (name) {
if (name == null) return -1;
var objID = "background axis1      axis2      axis3      boundbox   unitcell   frank      ".indexOf (name.toLowerCase ());
return (objID < 0 ? objID : Clazz.doubleToInt (objID / 11));
}, "~S");
c$.getObjectNameFromId = Clazz.defineMethod (c$, "getObjectNameFromId", 
function (objId) {
if (objId < 0 || objId >= 7) return null;
return "background axis1      axis2      axis3      boundbox   unitcell   frank      ".substring (objId * 11, objId * 11 + 11).trim ();
}, "~N");
Clazz.makeConstructor (c$, 
function (vwr) {
this.vwr = vwr;
}, "JV.Viewer");
Clazz.defineMethod (c$, "clear", 
function (global) {
this.vwr.setShowAxes (false);
this.vwr.setShowBbcage (false);
this.vwr.setShowUnitCell (false);
global.clear ();
}, "JV.GlobalSettings");
Clazz.defineMethod (c$, "resetLighting", 
function () {
this.vwr.setIntProperty ("ambientPercent", 45);
this.vwr.setIntProperty ("celShadingPower", 10);
this.vwr.setIntProperty ("diffusePercent", 84);
this.vwr.setIntProperty ("phongExponent", 64);
this.vwr.setIntProperty ("specularExponent", 6);
this.vwr.setIntProperty ("specularPercent", 22);
this.vwr.setIntProperty ("specularPower", 40);
this.vwr.setIntProperty ("zDepth", 0);
this.vwr.setIntProperty ("zShadePower", 3);
this.vwr.setIntProperty ("zSlab", 50);
this.vwr.setBooleanProperty ("specular", true);
this.vwr.setBooleanProperty ("celShading", false);
this.vwr.setBooleanProperty ("zshade", false);
});
Clazz.defineMethod (c$, "setCrystallographicDefaults", 
function () {
this.vwr.setAxesMode (603979808);
this.vwr.setShowAxes (true);
this.vwr.setShowUnitCell (true);
this.vwr.setBooleanProperty ("perspectiveDepth", false);
});
Clazz.defineMethod (c$, "setCommonDefaults", 
 function () {
this.vwr.setBooleanProperty ("perspectiveDepth", true);
this.vwr.setFloatProperty ("bondTolerance", 0.45);
this.vwr.setFloatProperty ("minBondDistance", 0.4);
this.vwr.setIntProperty ("bondingVersion", 0);
this.vwr.setBooleanProperty ("translucent", true);
});
Clazz.defineMethod (c$, "setJmolDefaults", 
function () {
this.setCommonDefaults ();
this.vwr.setStringProperty ("defaultColorScheme", "Jmol");
this.vwr.setBooleanProperty ("axesOrientationRasmol", false);
this.vwr.setBooleanProperty ("zeroBasedXyzRasmol", false);
this.vwr.setIntProperty ("percentVdwAtom", 23);
this.vwr.setIntProperty ("bondRadiusMilliAngstroms", 150);
this.vwr.setVdwStr ("auto");
});
Clazz.defineMethod (c$, "setRasMolDefaults", 
function () {
this.setCommonDefaults ();
this.vwr.setStringProperty ("defaultColorScheme", "RasMol");
this.vwr.setBooleanProperty ("axesOrientationRasmol", true);
this.vwr.setBooleanProperty ("zeroBasedXyzRasmol", true);
this.vwr.setIntProperty ("percentVdwAtom", 0);
this.vwr.setIntProperty ("bondRadiusMilliAngstroms", 1);
this.vwr.setVdwStr ("Rasmol");
});
Clazz.defineMethod (c$, "setPyMOLDefaults", 
function () {
this.setCommonDefaults ();
this.vwr.setStringProperty ("measurementUnits", "ANGSTROMS");
this.vwr.setBooleanProperty ("zoomHeight", true);
});
c$.getNoCase = Clazz.defineMethod (c$, "getNoCase", 
 function (saved, name) {
for (var e, $e = saved.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e.getKey ().equalsIgnoreCase (name)) return e.getValue ();

return null;
}, "java.util.Map,~S");
Clazz.defineMethod (c$, "listSavedStates", 
function () {
var names = "";
for (var name, $name = this.saved.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) names += "\n" + name;

return names;
});
Clazz.defineMethod (c$, "deleteSavedType", 
 function (type) {
var e = this.saved.keySet ().iterator ();
while (e.hasNext ()) if (e.next ().startsWith (type)) e.remove ();

}, "~S");
Clazz.defineMethod (c$, "deleteSaved", 
function (namelike) {
var e = this.saved.keySet ().iterator ();
while (e.hasNext ()) {
var name = e.next ();
if (name.startsWith (namelike) || name.endsWith ("_" + namelike) && name.indexOf ("_") == name.lastIndexOf ("_" + namelike)) e.remove ();
}
}, "~S");
Clazz.defineMethod (c$, "saveSelection", 
function (saveName, bsSelected) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Selected_");
return;
}saveName = this.lastSelected = "Selected_" + saveName;
this.saved.put (saveName, JU.BSUtil.copy (bsSelected));
}, "~S,JU.BS");
Clazz.defineMethod (c$, "restoreSelection", 
function (saveName) {
var name = (saveName.length > 0 ? "Selected_" + saveName : this.lastSelected);
var bsSelected = JV.StateManager.getNoCase (this.saved, name);
if (bsSelected == null) {
this.vwr.select ( new JU.BS (), false, 0, false);
return false;
}this.vwr.select (bsSelected, false, 0, false);
return true;
}, "~S");
Clazz.defineMethod (c$, "saveState", 
function (saveName) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("State_");
return;
}saveName = this.lastState = "State_" + saveName;
this.saved.put (saveName, this.vwr.getStateInfo ());
}, "~S");
Clazz.defineMethod (c$, "getSavedState", 
function (saveName) {
var name = (saveName.length > 0 ? "State_" + saveName : this.lastState);
var script = JV.StateManager.getNoCase (this.saved, name);
return (script == null ? "" : script);
}, "~S");
Clazz.defineMethod (c$, "saveStructure", 
function (saveName) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Shape_");
return;
}saveName = this.lastShape = "Shape_" + saveName;
this.saved.put (saveName, this.vwr.getStructureState ());
}, "~S");
Clazz.defineMethod (c$, "getSavedStructure", 
function (saveName) {
var name = (saveName.length > 0 ? "Shape_" + saveName : this.lastShape);
var script = JV.StateManager.getNoCase (this.saved, name);
return (script == null ? "" : script);
}, "~S");
Clazz.defineMethod (c$, "saveCoordinates", 
function (saveName, bsSelected) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Coordinates_");
return;
}saveName = this.lastCoordinates = "Coordinates_" + saveName;
this.saved.put (saveName, this.vwr.getCoordinateState (bsSelected));
}, "~S,JU.BS");
Clazz.defineMethod (c$, "getSavedCoordinates", 
function (saveName) {
var name = (saveName.length > 0 ? "Coordinates_" + saveName : this.lastCoordinates);
var script = JV.StateManager.getNoCase (this.saved, name);
return (script == null ? "" : script);
}, "~S");
Clazz.defineMethod (c$, "getOrientation", 
function () {
return  new JM.Orientation (this.vwr, false, null);
});
Clazz.defineMethod (c$, "getSavedOrientationText", 
function (saveName) {
var o;
if (saveName != null) {
o = this.getOrientationFor (saveName);
return (o == null ? "" : o.getMoveToText (true));
}var sb =  new JU.SB ();
for (var e, $e = this.saved.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
if (name.startsWith ("Orientation_")) sb.append ((e.getValue ()).getMoveToText (true));
}
return sb.toString ();
}, "~S");
Clazz.defineMethod (c$, "saveScene", 
function (saveName, scene) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Scene_");
return;
}var o =  new JV.Scene (scene);
o.saveName = this.lastScene = "Scene_" + saveName;
this.saved.put (o.saveName, o);
}, "~S,java.util.Map");
Clazz.defineMethod (c$, "restoreScene", 
function (saveName, timeSeconds) {
var o = JV.StateManager.getNoCase (this.saved, (saveName.length > 0 ? "Scene_" + saveName : this.lastScene));
return (o != null && o.restore (this.vwr, timeSeconds));
}, "~S,~N");
Clazz.defineMethod (c$, "saveOrientation", 
function (saveName, pymolView) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Orientation_");
return;
}var o =  new JM.Orientation (this.vwr, saveName.equalsIgnoreCase ("default"), pymolView);
o.saveName = this.lastOrientation = "Orientation_" + saveName;
this.saved.put (o.saveName, o);
}, "~S,~A");
Clazz.defineMethod (c$, "restoreOrientation", 
function (saveName, timeSeconds, isAll) {
var o = this.getOrientationFor (saveName);
return (o != null && o.restore (timeSeconds, isAll));
}, "~S,~N,~B");
Clazz.defineMethod (c$, "getOrientationFor", 
 function (saveName) {
var name = (saveName.length > 0 ? "Orientation_" + saveName : this.lastOrientation);
return JV.StateManager.getNoCase (this.saved, name);
}, "~S");
Clazz.defineMethod (c$, "saveContext", 
function (saveName, context) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Context_");
return;
}this.saved.put ((this.lastContext = "Context_" + saveName), context);
}, "~S,~O");
Clazz.defineMethod (c$, "getContext", 
function (saveName) {
return this.saved.get (saveName.length == 0 ? this.lastContext : "Context_" + saveName);
}, "~S");
Clazz.defineMethod (c$, "saveBonds", 
function (saveName) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Bonds_");
return;
}var b =  new JV.Connections (this.vwr);
b.saveName = this.lastConnections = "Bonds_" + saveName;
this.saved.put (b.saveName, b);
}, "~S");
Clazz.defineMethod (c$, "restoreBonds", 
function (saveName) {
this.vwr.clearModelDependentObjects ();
var name = (saveName.length > 0 ? "Bonds_" + saveName : this.lastConnections);
var c = JV.StateManager.getNoCase (this.saved, name);
return (c != null && c.restore ());
}, "~S");
c$.varClip = Clazz.defineMethod (c$, "varClip", 
function (name, sv, nMax) {
if (nMax > 0 && sv.length > nMax) sv = sv.substring (0, nMax) + " #...more (" + sv.length + " bytes -- use SHOW " + name + " or MESSAGE @" + name + " to view)";
return sv;
}, "~S,~S,~N");
Clazz.defineStatics (c$,
"OBJ_BACKGROUND", 0,
"OBJ_AXIS1", 1,
"OBJ_AXIS2", 2,
"OBJ_AXIS3", 3,
"OBJ_BOUNDBOX", 4,
"OBJ_UNITCELL", 5,
"OBJ_FRANK", 6,
"OBJ_MAX", 7,
"objectNameList", "background axis1      axis2      axis3      boundbox   unitcell   frank      ");
c$ = Clazz.decorateAsClass (function () {
this.saveName = null;
this.scene = null;
Clazz.instantialize (this, arguments);
}, JV, "Scene");
Clazz.makeConstructor (c$, 
function (scene) {
this.scene = scene;
}, "java.util.Map");
Clazz.defineMethod (c$, "restore", 
function (vwr, timeSeconds) {
var gen = this.scene.get ("generator");
if (gen != null) gen.generateScene (this.scene);
var pv = this.scene.get ("pymolView");
return (pv != null && vwr.tm.moveToPyMOL (vwr.eval, timeSeconds, pv));
}, "JV.Viewer,~N");
c$ = Clazz.decorateAsClass (function () {
this.saveName = null;
this.bondCount = 0;
this.connections = null;
this.vwr = null;
Clazz.instantialize (this, arguments);
}, JV, "Connections");
Clazz.makeConstructor (c$, 
function (vwr) {
var modelSet = vwr.ms;
if (modelSet == null) return;
this.vwr = vwr;
this.bondCount = modelSet.bondCount;
this.connections =  new Array (this.bondCount + 1);
var bonds = modelSet.bo;
for (var i = this.bondCount; --i >= 0; ) {
var b = bonds[i];
this.connections[i] =  new JV.Connection (b.atom1.i, b.atom2.i, b.mad, b.colix, b.order, b.getEnergy (), b.shapeVisibilityFlags);
}
}, "JV.Viewer");
Clazz.defineMethod (c$, "restore", 
function () {
var modelSet = this.vwr.ms;
if (modelSet == null) return false;
modelSet.deleteAllBonds ();
for (var i = this.bondCount; --i >= 0; ) {
var c = this.connections[i];
var ac = modelSet.ac;
if (c.atomIndex1 >= ac || c.atomIndex2 >= ac) continue;
var b = modelSet.bondAtoms (modelSet.at[c.atomIndex1], modelSet.at[c.atomIndex2], c.order, c.mad, null, c.energy, false, true);
b.colix = c.colix;
b.shapeVisibilityFlags = c.shapeVisibilityFlags;
}
for (var i = modelSet.bondCount; --i >= 0; ) modelSet.bo[i].index = i;

this.vwr.setShapeProperty (1, "reportAll", null);
return true;
});
c$ = Clazz.decorateAsClass (function () {
this.atomIndex1 = 0;
this.atomIndex2 = 0;
this.mad = 0;
this.colix = 0;
this.order = 0;
this.energy = 0;
this.shapeVisibilityFlags = 0;
Clazz.instantialize (this, arguments);
}, JV, "Connection");
Clazz.makeConstructor (c$, 
function (atom1, atom2, mad, colix, order, energy, shapeVisibilityFlags) {
this.atomIndex1 = atom1;
this.atomIndex2 = atom2;
this.mad = mad;
this.colix = colix;
this.order = order;
this.energy = energy;
this.shapeVisibilityFlags = shapeVisibilityFlags;
}, "~N,~N,~N,~N,~N,~N,~N");
});
