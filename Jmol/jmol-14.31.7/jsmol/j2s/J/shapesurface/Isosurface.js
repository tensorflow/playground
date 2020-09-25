Clazz.declarePackage ("J.shapesurface");
Clazz.load (["J.jvxl.api.MeshDataServer", "J.shape.MeshCollection", "JU.P3i", "$.P4"], "J.shapesurface.Isosurface", ["java.io.BufferedReader", "java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.A4", "$.AU", "$.BS", "$.CU", "$.Lst", "$.M3", "$.M4", "$.P3", "$.PT", "$.Quat", "$.Rdr", "$.SB", "$.V3", "J.jvxl.data.JvxlCoder", "$.JvxlData", "$.MeshData", "J.jvxl.readers.SurfaceGenerator", "J.shape.Mesh", "J.shapesurface.IsosurfaceMesh", "JU.C", "$.Escape", "$.Logger", "$.TempArray", "JV.JC", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isomeshes = null;
this.thisMesh = null;
this.actualID = null;
this.iHaveBitSets = false;
this.explicitContours = false;
this.atomIndex = 0;
this.moNumber = 0;
this.moLinearCombination = null;
this.colorType = 0;
this.defaultColix = 0;
this.meshColix = 0;
this.center = null;
this.scale3d = 0;
this.isPhaseColored = false;
this.isColorExplicit = false;
this.scriptAppendix = "";
this.sg = null;
this.jvxlData = null;
this.withinDistance2 = 0;
this.isWithinNot = false;
this.withinPoints = null;
this.cutoffRange = null;
this.allowMesh = true;
this.script = null;
this.iHaveModelIndex = false;
this.nLCAO = 0;
this.lcaoDir = null;
this.associateNormals = false;
this.oldFileName = null;
this.newFileName = null;
this.ptXY = null;
this.keyXy = null;
Clazz.instantialize (this, arguments);
}, J.shapesurface, "Isosurface", J.shape.MeshCollection, J.jvxl.api.MeshDataServer);
Clazz.prepareFields (c$, function () {
this.isomeshes =  new Array (4);
this.lcaoDir =  new JU.P4 ();
this.ptXY =  new JU.P3i ();
});
Clazz.overrideMethod (c$, "allocMesh", 
function (thisID, m) {
var index = this.meshCount++;
this.meshes = this.isomeshes = JU.AU.ensureLength (this.isomeshes, this.meshCount * 2);
this.currentMesh = this.thisMesh = this.isomeshes[index] = (m == null ?  new J.shapesurface.IsosurfaceMesh (this.vwr, thisID, this.colix, index) : m);
this.currentMesh.index = index;
if (this.sg != null) this.sg.setJvxlData (this.jvxlData = this.thisMesh.jvxlData);
}, "~S,J.shape.Mesh");
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapesurface.Isosurface, "initShape", []);
this.myType = "isosurface";
this.newSg ();
});
Clazz.defineMethod (c$, "newSg", 
function () {
this.sg =  new J.jvxl.readers.SurfaceGenerator (this.vwr, this, null, this.jvxlData =  new J.jvxl.data.JvxlData ());
this.sg.params.showTiming = this.vwr.getBoolean (603979934);
this.sg.version = "Jmol " + JV.Viewer.getJmolVersion ();
});
Clazz.defineMethod (c$, "clearSg", 
function () {
this.sg = null;
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
this.setPropI (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "setPropI", 
function (propertyName, value, bs) {
if ("cache" === propertyName) {
if (this.currentMesh == null) return;
var id = this.currentMesh.thisID;
var imodel = this.currentMesh.modelIndex;
this.vwr.cachePut ("cache://isosurface_" + id, (this.getPropI ("jvxlDataXml", -1)).getBytes ());
this.deleteMeshI (this.currentMesh.index);
this.setPropI ("init", null, null);
this.setPropI ("thisID", id, null);
this.setPropI ("modelIndex", Integer.$valueOf (imodel), null);
this.setPropI ("fileName", "cache://isosurface_" + id, null);
this.setPropI ("readFile", null, null);
this.setPropI ("finalize", "isosurface ID " + JU.PT.esc (id) + (imodel >= 0 ? " modelIndex " + imodel : "") + " /*file*/" + JU.PT.esc ("cache://isosurface_" + id), null);
this.setPropI ("clear", null, null);
return;
}if ("delete" === propertyName) {
this.setPropertySuper (propertyName, value, bs);
if (!this.explicitID) this.nLCAO = this.nUnnamed = 0;
this.currentMesh = this.thisMesh = null;
return;
}if ("remapInherited" === propertyName) {
for (var i = this.meshCount; --i >= 0; ) {
if (this.isomeshes[i] != null && "#inherit;".equals (this.isomeshes[i].colorCommand)) this.isomeshes[i].remapColors (this.vwr, null, NaN);
}
return;
}if ("remapColor" === propertyName) {
if (this.thisMesh != null) this.thisMesh.remapColors (this.vwr, value, this.translucentLevel);
return;
}if ("thisID" === propertyName) {
if (this.actualID != null) value = this.actualID;
this.setPropertySuper ("thisID", value, null);
return;
}if ("params" === propertyName) {
if (this.thisMesh != null) {
this.ensureMeshSource ();
this.thisMesh.checkAllocColixes ();
var data = value;
var colixes = data[0];
var atomMap = null;
if (colixes != null) {
for (var i = 0; i < colixes.length; i++) {
var colix = colixes[i];
var f = 0;
if (f > 0.01) colix = JU.C.getColixTranslucent3 (colix, true, f);
colixes[i] = colix;
}
atomMap =  Clazz.newIntArray (bs.length (), 0);
for (var pt = 0, i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1), pt++) atomMap[i] = pt;

}this.thisMesh.setVertexColixesForAtoms (this.vwr, colixes, atomMap, bs);
this.thisMesh.setVertexColorMap ();
}return;
}if ("atomcolor" === propertyName) {
if (this.thisMesh != null) {
this.ensureMeshSource ();
this.thisMesh.colorVertices (JU.C.getColixO (value), bs, true);
}return;
}if ("pointSize" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.volumeRenderPointSize = (value).floatValue ();
}return;
}if ("vertexcolor" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.colorVertices (JU.C.getColixO (value), bs, false);
}return;
}if ("colorPhase" === propertyName) {
var colors = value;
var colix0 = JU.C.getColix ((colors[0]).intValue ());
var colix1 = JU.C.getColix ((colors[1]).intValue ());
var id = (this.thisMesh != null ? this.thisMesh.thisID : JU.PT.isWild (this.previousMeshID) ? this.previousMeshID : null);
var list = this.getMeshList (id, false);
for (var i = list.size (); --i >= 0; ) this.setColorPhase (list.get (i), colix0, colix1);

return;
}if ("color" === propertyName) {
var color = JU.C.getHexCode (JU.C.getColixO (value));
if (this.thisMesh != null) {
this.setIsoMeshColor (this.thisMesh, color);
} else {
var list = this.getMeshList (JU.PT.isWild (this.previousMeshID) ? this.previousMeshID : null, false);
for (var i = list.size (); --i >= 0; ) this.setIsoMeshColor (list.get (i), color);

}this.setPropertySuper (propertyName, value, bs);
return;
}if ("nocontour" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.deleteContours ();
}return;
}if ("fixed" === propertyName) {
this.isFixed = (value).booleanValue ();
this.setMeshI ();
return;
}if ("newObject" === propertyName) {
if (this.thisMesh != null) this.thisMesh.clearType (this.thisMesh.meshType, false);
return;
}if ("moveIsosurface" === propertyName) {
if (this.thisMesh != null && !this.thisMesh.isModelConnected) {
this.thisMesh.updateCoordinates (value, null);
this.thisMesh.altVertices = null;
}return;
}if ("refreshTrajectories" === propertyName) {
var m = ((value)[0]).intValue ();
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].modelIndex == m && (this.meshes[i].connectedAtoms != null || this.meshes[i].isModelConnected)) (this.meshes[i]).updateCoordinates ((value)[2], (value)[1]);

return;
}if ("modelIndex" === propertyName) {
if (!this.iHaveModelIndex) {
this.modelIndex = (value).intValue ();
this.isFixed = (this.modelIndex < 0);
this.sg.params.modelIndex = Math.abs (this.modelIndex);
}return;
}if ("lcaoCartoon" === propertyName || "lonePair" === propertyName || "radical" === propertyName) {
var info = value;
if (!this.explicitID) {
this.setPropertySuper ("thisID", null, null);
}if (!this.sg.setProp ("lcaoCartoonCenter", info[2], null)) this.drawLcaoCartoon (info[0], info[1], info[3], ("lonePair" === propertyName ? 2 : "radical" === propertyName ? 1 : 0));
return;
}if ("select" === propertyName) {
if (this.iHaveBitSets) return;
}if ("ignore" === propertyName) {
if (this.iHaveBitSets) return;
}if ("meshcolor" === propertyName) {
var rgb = (value).intValue ();
this.meshColix = JU.C.getColix (rgb);
if (this.thisMesh != null) this.thisMesh.meshColix = this.meshColix;
return;
}if ("offset" === propertyName) {
var offset = JU.P3.newP (value);
if (offset.equals (JV.JC.center)) offset = null;
if (this.thisMesh != null) {
this.thisMesh.rotateTranslate (null, offset, true);
this.thisMesh.altVertices = null;
}return;
}if ("rotate" === propertyName) {
var pt4 = value;
if (this.thisMesh != null) {
this.thisMesh.rotateTranslate (JU.Quat.newP4 (pt4), null, true);
this.thisMesh.altVertices = null;
}return;
}if ("bsDisplay" === propertyName) {
this.bsDisplay = value;
return;
}if ("displayWithin" === propertyName) {
var o = value;
this.displayWithinDistance2 = (o[0]).floatValue ();
this.isDisplayWithinNot = (this.displayWithinDistance2 < 0);
this.displayWithinDistance2 *= this.displayWithinDistance2;
this.displayWithinPoints = o[3];
if (this.displayWithinPoints.size () == 0) this.displayWithinPoints = this.vwr.ms.getAtomPointVector (o[2]);
return;
}if ("finalize" === propertyName) {
if (this.thisMesh != null) {
var cmd = value;
if (cmd != null && !cmd.startsWith ("; isosurface map")) {
this.thisMesh.setDiscreteColixes (this.sg.params.contoursDiscrete, this.sg.params.contourColixes);
this.setJvxlInfo ();
}this.setScriptInfo (cmd);
}this.clearSg ();
return;
}if ("connections" === propertyName) {
if (this.currentMesh != null) {
this.connections = value;
if (this.connections[0] >= 0 && this.connections[0] < this.vwr.ms.ac) this.currentMesh.connectedAtoms = this.connections;
 else this.connections = this.currentMesh.connectedAtoms = null;
}return;
}if ("cutoffRange" === propertyName) {
this.cutoffRange = value;
return;
}if ("fixLattice" === propertyName) {
if (this.thisMesh != null) this.thisMesh.fixLattice ();
return;
}if ("slab" === propertyName) {
if (Clazz.instanceOf (value, Integer)) {
if (this.thisMesh != null) this.thisMesh.jvxlData.slabValue = (value).intValue ();
return;
}if (this.thisMesh != null) {
var slabInfo = value;
var tok = (slabInfo[0]).intValue ();
switch (tok) {
case 1073742018:
var data = slabInfo[1];
var m = this.getMesh (data[1]);
if (m == null) return;
data[1] = m;
break;
}
this.slabPolygons (slabInfo);
return;
}}if ("cap" === propertyName) {
if (this.thisMesh != null && this.thisMesh.pc != 0) {
this.thisMesh.getMeshSlicer ().slabPolygons (value, true);
this.thisMesh.initialize (this.thisMesh.lighting, null, null);
return;
}}if ("map" === propertyName) {
if (this.sg != null) this.sg.params.isMapped = true;
this.setProperty ("squareData", Boolean.FALSE, null);
if (this.thisMesh == null || this.thisMesh.vc == 0) return;
}if ("probes" === propertyName) {
if (this.sg != null) {
this.sg.params.probes = value;
this.sg.params.probeValues =  Clazz.newFloatArray (this.sg.params.probes.length, 0);
}return;
}if ("deleteVdw" === propertyName) {
for (var i = this.meshCount; --i >= 0; ) if (this.isomeshes[i].bsVdw != null && (bs == null || bs.intersects (this.isomeshes[i].bsVdw))) this.deleteMeshI (i);

this.currentMesh = this.thisMesh = null;
return;
}if ("mapColor" === propertyName || "readFile" === propertyName) {
if (value == null) {
if (this.sg.params.filesData == null) {
value = this.getFileReader (this.sg.params.fileName);
} else {
value = this.sg.params.filesData;
var a = this.sg.params.filesData[0];
var b =  new Array (a.length);
for (var i = b.length; --i >= 0 && value != null; ) if ((b[i] = this.getFileReader (a[i])) == null) value = null;

if (value != null) this.sg.params.filesData[0] = b;
}if (value == null) return;
}} else if ("atomIndex" === propertyName) {
this.atomIndex = (value).intValue ();
if (this.thisMesh != null) this.thisMesh.atomIndex = this.atomIndex;
} else if ("center" === propertyName) {
this.center.setT (value);
} else if ("colorRGB" === propertyName) {
var rgb = (value).intValue ();
if (rgb == 1296041986) {
this.colorType = rgb;
} else {
this.colorType = 0;
this.defaultColix = JU.C.getColix (rgb);
}} else if ("contour" === propertyName) {
this.explicitContours = true;
} else if ("functionXY" === propertyName) {
if (this.sg.params.state == 2) this.setScriptInfo (null);
} else if ("init" === propertyName) {
this.newSg ();
} else if ("getSurfaceSets" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.jvxlData.thisSet = (value).intValue ();
this.thisMesh.calculatedVolume = null;
this.thisMesh.calculatedArea = null;
}} else if ("localName" === propertyName) {
value = this.vwr.getOutputChannel (value, null);
propertyName = "outputChannel";
} else if ("molecularOrbital" === propertyName) {
this.isFixed = false;
this.setMeshI ();
if (Clazz.instanceOf (value, Integer)) {
this.moNumber = (value).intValue ();
this.moLinearCombination = null;
} else {
this.moLinearCombination = value;
this.moNumber = 0;
}if (!this.isColorExplicit) this.isPhaseColored = true;
if (this.sg == null || !this.sg.params.isMapped) {
var mat4 = this.ms.am[this.currentMesh.modelIndex].mat4;
if (mat4 != null) {
var minv = JU.M4.newM4 (mat4);
minv.invert ();
this.setPropI ("modelInvRotation", minv, null);
}}} else if ("phase" === propertyName) {
this.isPhaseColored = true;
} else if ("plane" === propertyName) {
} else if ("pocket" === propertyName) {
} else if ("scale3d" === propertyName) {
this.scale3d = (value).floatValue ();
if (this.thisMesh != null) {
this.thisMesh.scale3d = this.thisMesh.jvxlData.scale3d = this.scale3d;
this.thisMesh.altVertices = null;
}} else if ("title" === propertyName) {
if (Clazz.instanceOf (value, String) && "-".equals (value)) value = null;
this.setPropertySuper (propertyName, value, bs);
value = this.title;
} else if ("withinPoints" === propertyName) {
var o = value;
this.withinDistance2 = (o[0]).floatValue ();
this.isWithinNot = (this.withinDistance2 < 0);
this.withinDistance2 *= this.withinDistance2;
this.withinPoints = o[3];
if (this.withinPoints.size () == 0) this.withinPoints = this.vwr.ms.getAtomPointVector (o[2]);
} else if (("nci" === propertyName || "orbital" === propertyName) && this.sg != null) {
this.sg.params.testFlags = (this.vwr.getBoolean (603979962) ? 2 : 0);
}if (this.sg != null && this.sg.setProp (propertyName, value, bs)) {
if (this.sg.isValid) {
if ("molecularOrbital" === propertyName) {
this.currentMesh.isModelConnected = true;
this.currentMesh.mat4 = this.ms.am[this.currentMesh.modelIndex].mat4;
}return;
}propertyName = "delete";
}if ("init" === propertyName) {
this.explicitID = false;
this.scriptAppendix = "";
var script = (Clazz.instanceOf (value, String) ? value : null);
var pt = (script == null ? -1 : script.indexOf ("# ID="));
this.actualID = (pt >= 0 ? JU.PT.getQuotedStringAt (script, pt) : null);
this.setPropertySuper ("thisID", "+PREVIOUS_MESH+", null);
if (script != null && !(this.iHaveBitSets = this.getScriptBitSets (script, null))) this.sg.setProp ("select", bs, null);
this.initializeIsosurface ();
this.sg.params.modelIndex = (this.isFixed ? -1 : this.modelIndex);
return;
}if ("clear" === propertyName) {
this.discardTempData (true);
return;
}if ("colorDensity" === propertyName) {
if (value != null && this.currentMesh != null) this.currentMesh.volumeRenderPointSize = (value).floatValue ();
return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
for (var i = this.meshCount; --i >= 0; ) {
var m = this.meshes[i];
if (m == null) continue;
if (m.connectedAtoms != null) {
var iAtom = m.connectedAtoms[0];
if (iAtom >= firstAtomDeleted + nAtomsDeleted) m.connectedAtoms[0] = iAtom - nAtomsDeleted;
 else if (iAtom >= firstAtomDeleted) m.connectedAtoms = null;
}m.connectedAtoms = null;
if (m.modelIndex == modelIndex) {
this.meshCount--;
if (m === this.currentMesh) this.currentMesh = this.thisMesh = null;
this.meshes = this.isomeshes = JU.AU.deleteElements (this.meshes, i, 1);
} else if (m.modelIndex > modelIndex) {
m.modelIndex--;
if (m.atomIndex >= firstAtomDeleted) m.atomIndex -= nAtomsDeleted;
}}
return;
}this.setPropertySuper (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "getFileReader", 
 function (fileName) {
var value = this.vwr.fm.getBufferedReaderOrErrorMessageFromName (fileName, null, true, true);
if (Clazz.instanceOf (value, String)) {
JU.Logger.error ("Isosurface: could not open file " + fileName + " -- " + value);
return null;
}if (!(Clazz.instanceOf (value, java.io.BufferedReader))) try {
value = JU.Rdr.getBufferedReader (value, "ISO-8859-1");
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return value;
}, "~S");
Clazz.defineMethod (c$, "setIsoMeshColor", 
 function (m, color) {
m.jvxlData.baseColor = color;
m.isColorSolid = true;
m.pcs = null;
m.colorsExplicit = false;
m.colorEncoder = null;
m.vertexColorMap = null;
}, "J.shapesurface.IsosurfaceMesh,~S");
Clazz.defineMethod (c$, "setColorPhase", 
 function (m, colix0, colix1) {
m.colorPhased = true;
m.colix = m.jvxlData.minColorIndex = colix0;
m.jvxlData.maxColorIndex = colix1;
m.jvxlData.isBicolorMap = true;
m.jvxlData.colorDensity = false;
m.isColorSolid = false;
m.remapColors (this.vwr, null, this.translucentLevel);
}, "J.shapesurface.IsosurfaceMesh,~N,~N");
Clazz.defineMethod (c$, "ensureMeshSource", 
 function () {
var haveColors = (this.thisMesh.vertexSource != null);
if (haveColors) for (var i = this.thisMesh.vc; --i >= 0; ) if (this.thisMesh.vertexSource[i] < 0) {
haveColors = false;
break;
}
if (!haveColors) {
var source = this.thisMesh.vertexSource;
var vertexColixes = this.thisMesh.vcs;
var colix = (this.thisMesh.isColorSolid ? this.thisMesh.colix : 0);
this.setProperty ("init", null, null);
this.setProperty ("map", Boolean.FALSE, null);
this.setProperty ("property",  Clazz.newFloatArray (this.vwr.ms.ac, 0), null);
if (colix != 0) {
this.thisMesh.colorCommand = "color isosurface " + JU.C.getHexCode (colix);
this.setProperty ("color", Integer.$valueOf (JU.C.getArgb (colix)), null);
}if (source != null) {
for (var i = this.thisMesh.vc; --i >= 0; ) if (source[i] < 0) source[i] = this.thisMesh.vertexSource[i];

this.thisMesh.vertexSource = source;
this.thisMesh.vcs = vertexColixes;
}}});
Clazz.defineMethod (c$, "slabPolygons", 
function (slabInfo) {
this.thisMesh.calculatedVolume = null;
this.thisMesh.calculatedArea = null;
this.thisMesh.getMeshSlicer ().slabPolygons (slabInfo, false);
this.thisMesh.reinitializeLightingAndColor (this.vwr);
}, "~A");
Clazz.defineMethod (c$, "setPropertySuper", 
 function (propertyName, value, bs) {
if (propertyName === "thisID" && this.currentMesh != null && this.currentMesh.thisID != null && this.currentMesh.thisID.equals (value)) {
this.checkExplicit (value);
return;
}this.currentMesh = this.thisMesh;
this.setPropMC (propertyName, value, bs);
this.thisMesh = this.currentMesh;
this.jvxlData = (this.thisMesh == null ? null : this.thisMesh.jvxlData);
if (this.sg != null) this.sg.setJvxlData (this.jvxlData);
}, "~S,~O,JU.BS");
Clazz.overrideMethod (c$, "getPropertyData", 
function (property, data) {
var m;
if (property === "keys") {
var keys = (Clazz.instanceOf (data[1], JU.Lst) ? data[1] :  new JU.Lst ());
data[1] = keys;
keys.addLast ("info");
keys.addLast ("data");
keys.addLast ("atoms");
}if (property === "colorEncoder") {
m = this.getMesh (data[0]);
return (m != null && (data[1] = m.colorEncoder) != null);
}if (property === "intersectPlane") {
m = this.getMesh (data[0]);
if (m == null || data.length < 4) return false;
data[3] = Integer.$valueOf (m.modelIndex);
m.getMeshSlicer ().getIntersection (0, data[1], null, data[2], null, null, null, false, false, 134217750, false);
return true;
}if (property === "getBoundingBox") {
var id = data[0];
m = this.getMesh (id);
if (m == null || m.vs == null) return false;
data[2] = m.jvxlData.boundingBox;
if (m.mat4 != null) {
var d =  new Array (2);
d[0] = JU.P3.newP (m.jvxlData.boundingBox[0]);
d[1] = JU.P3.newP (m.jvxlData.boundingBox[1]);
var v =  new JU.V3 ();
m.mat4.getTranslation (v);
d[0].add (v);
d[1].add (v);
data[2] = d;
}return true;
}if (property === "unitCell") {
m = this.getMesh (data[0]);
return (m != null && (data[1] = m.getUnitCell ()) != null);
}if (property === "getCenter") {
var index = (data[1]).intValue ();
if (index == -2147483648) {
var id = data[0];
m = this.getMesh (id);
if (m == null || m.vs == null) return false;
var p = JU.P3.newP (m.jvxlData.boundingBox[0]);
p.add (m.jvxlData.boundingBox[1]);
p.scale (0.5);
if (m.mat4 != null) {
var v =  new JU.V3 ();
m.mat4.getTranslation (v);
p.add (v);
}data[2] = p;
return true;
}}return this.getPropDataMC (property, data);
}, "~S,~A");
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
return this.getPropI (property, index);
}, "~S,~N");
Clazz.defineMethod (c$, "getPropI", 
function (property, index) {
var m = this.thisMesh;
if (index >= 0 && (index >= this.meshCount || (m = this.isomeshes[index]) == null)) return null;
var ret = this.getPropMC (property, index);
if (ret != null) return ret;
if (property === "message") {
var s = "";
if (!this.jvxlData.isValid) return "invalid! (no atoms selected?)";
if (!Float.isNaN (this.jvxlData.integration)) s += "integration " + this.jvxlData.integration;
if (this.shapeID == 24 || this.shapeID == 27 || this.shapeID == 28) s += " with cutoff=" + this.jvxlData.cutoff;
if (this.shapeID == 27 || this.shapeID == 28) return s;
if (this.jvxlData.dataMin != 3.4028235E38) s += " min=" + this.jvxlData.dataMin + " max=" + this.jvxlData.dataMax;
s += "; " + JV.JC.shapeClassBases[this.shapeID].toLowerCase () + " count: " + this.getPropMC ("count", index);
return s + this.getPropI ("dataRangeStr", index) + this.jvxlData.msg;
}if (property === "dataRange") return this.getDataRange (m);
if (property === "dataRangeStr") {
var dataRange = this.getDataRange (m);
return (dataRange != null && dataRange[0] != 3.4028235E38 && dataRange[0] != dataRange[1] ? "\nisosurface full data range " + dataRange[0] + " to " + dataRange[1] + " with color scheme spanning " + dataRange[2] + " to " + dataRange[3] : "");
}if (property === "moNumber") return Integer.$valueOf (this.moNumber);
if (property === "moLinearCombination") return this.moLinearCombination;
if (property === "nSets") return Integer.$valueOf (m == null ? 0 : m.nSets);
if (property === "area") return (m == null ? Float.$valueOf (NaN) : this.calculateVolumeOrArea (m, true));
if (property === "volume") return (m == null ? Float.$valueOf (NaN) : this.calculateVolumeOrArea (m, false));
if (m == null) return null;
if (property === "cutoff") return Float.$valueOf (this.jvxlData.cutoff);
if (property === "minMaxInfo") return  Clazz.newFloatArray (-1, [this.jvxlData.dataMin, this.jvxlData.dataMax]);
if (property === "plane") return this.jvxlData.jvxlPlane;
if (property === "contours") return m.getContours ();
if (property === "pmesh" || property === "pmeshbin") return m.getPmeshData (property === "pmeshbin");
if (property === "jvxlDataXml" || property === "jvxlMeshXml") {
var meshData = null;
this.jvxlData.slabInfo = null;
if (property === "jvxlMeshXml" || this.jvxlData.vertexDataOnly || m.bsSlabDisplay != null && m.bsSlabGhost == null) {
meshData =  new J.jvxl.data.MeshData ();
this.fillMeshData (meshData, 1, m);
meshData.polygonColorData = J.shapesurface.Isosurface.getPolygonColorData (meshData.pc, meshData.pcs, (meshData.colorsExplicit ? meshData.pis : null), meshData.bsSlabDisplay);
} else if (m.bsSlabGhost != null) {
this.jvxlData.slabInfo = m.slabOptions.toString ();
}var sb =  new JU.SB ();
this.getMeshCommand (sb, m.index);
m.setJvxlColorMap (true);
return J.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, meshData, this.title, "", true, 1, sb.toString (), null);
}if (property === "jvxlFileInfo") {
return J.jvxl.data.JvxlCoder.jvxlGetInfo (this.jvxlData);
}if (property === "command") {
var sb =  new JU.SB ();
var list = this.getMeshList ((index < 0 ? this.previousMeshID : m.thisID), false);
for (var i = list.size (); --i >= 0; ) this.getMeshCommand (sb, i);

return sb.toString ();
}if (property === "atoms") {
return m.surfaceAtoms;
}if (property === "colorEncoder") return m.colorEncoder;
if (property === "values" || property === "value") {
return m.probeValues;
}return null;
}, "~S,~N");
Clazz.defineMethod (c$, "getDataRange", 
 function (mesh) {
return (mesh == null ? null : mesh.getDataRange ());
}, "J.shapesurface.IsosurfaceMesh");
Clazz.defineMethod (c$, "calculateVolumeOrArea", 
 function (mesh, isArea) {
if (isArea) {
if (mesh.calculatedArea != null) return mesh.calculatedArea;
} else {
if (mesh.calculatedVolume != null) return mesh.calculatedVolume;
}var meshData =  new J.jvxl.data.MeshData ();
this.fillMeshData (meshData, 1, mesh);
meshData.nSets = mesh.nSets;
meshData.vertexSets = mesh.vertexSets;
if (!isArea && mesh.jvxlData.colorDensity) {
var f = mesh.jvxlData.voxelVolume;
f *= (mesh.bsSlabDisplay == null ? mesh.vc : mesh.bsSlabDisplay.cardinality ());
return mesh.calculatedVolume = Float.$valueOf (f);
}var ret = J.jvxl.data.MeshData.calculateVolumeOrArea (meshData, mesh.jvxlData.thisSet, isArea, false);
if (mesh.nSets <= 0) mesh.nSets = -meshData.nSets;
if (isArea) mesh.calculatedArea = ret;
 else mesh.calculatedVolume = ret;
return ret;
}, "J.shapesurface.IsosurfaceMesh,~B");
c$.getPolygonColorData = Clazz.defineMethod (c$, "getPolygonColorData", 
function (ccount, colixes, polygons, bsSlabDisplay) {
var isExplicit = (polygons != null);
if (colixes == null && polygons == null) return null;
var list1 =  new JU.SB ();
var count = 0;
var colix = 0;
var color = 0;
var colorNext = 0;
var done = false;
for (var i = 0; i < ccount || (done = true) == true; i++) {
if (!done && bsSlabDisplay != null && !bsSlabDisplay.get (i)) continue;
if (done || (isExplicit ? (colorNext = polygons[i][4]) != color : colixes[i] != colix)) {
if (count != 0) list1.append (" ").appendI (count).append (" ").appendI ((isExplicit ? color : colix == 0 ? 0 : JU.C.getArgb (colix)));
if (done) break;
if (isExplicit) color = colorNext;
 else colix = colixes[i];
count = 1;
} else {
count++;
}}
list1.append ("\n");
return list1.toString ();
}, "~N,~A,~A,JU.BS");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
this.clean ();
var sb =  new JU.SB ();
sb.append ("\n");
for (var i = 0; i < this.meshCount; i++) this.getMeshCommand (sb, i);

return sb.toString ();
});
Clazz.defineMethod (c$, "getMeshCommand", 
 function (sb, i) {
var imesh = this.meshes[i];
if (imesh == null || imesh.scriptCommand == null) return;
var cmd = imesh.scriptCommand;
var modelCount = this.vwr.ms.mc;
if (modelCount > 1) J.shape.Shape.appendCmd (sb, "frame " + this.vwr.getModelNumberDotted (imesh.modelIndex));
cmd = JU.PT.rep (cmd, ";; isosurface map", " map");
cmd = JU.PT.rep (cmd, "; isosurface map", " map");
if (cmd.endsWith (" map")) cmd = cmd.substring (0, cmd.length - 4);
cmd = cmd.$replace ('\t', ' ');
cmd = JU.PT.rep (cmd, ";#", "; #");
var pt = cmd.indexOf ("; #");
if (pt >= 0) cmd = cmd.substring (0, pt);
if (imesh.connectedAtoms != null) cmd += " connect " + JU.Escape.eAI (imesh.connectedAtoms);
cmd = JU.PT.trim (cmd, ";");
if (imesh.linkedMesh != null) cmd += " LINK";
if (this.myType === "lcaoCartoon" && imesh.atomIndex >= 0) cmd += " ATOMINDEX " + imesh.atomIndex;
J.shape.Shape.appendCmd (sb, cmd);
var id = this.myType + " ID " + JU.PT.esc (imesh.thisID);
if (imesh.jvxlData.thisSet >= 0) J.shape.Shape.appendCmd (sb, id + " set " + (imesh.jvxlData.thisSet + 1));
if (imesh.mat4 != null && !imesh.isModelConnected) J.shape.Shape.appendCmd (sb, id + " move " + JU.Escape.matrixToScript (imesh.mat4));
if (imesh.scale3d != 0) J.shape.Shape.appendCmd (sb, id + " scale3d " + imesh.scale3d);
if (imesh.jvxlData.slabValue != -2147483648) J.shape.Shape.appendCmd (sb, id + " slab " + imesh.jvxlData.slabValue);
if (imesh.slabOptions != null) J.shape.Shape.appendCmd (sb, imesh.slabOptions.toString ());
if (cmd.charAt (0) != '#') {
if (this.allowMesh) J.shape.Shape.appendCmd (sb, imesh.getState (this.myType));
if (!imesh.isColorSolid && imesh.colorType == 0 && JU.C.isColixTranslucent (imesh.colix)) J.shape.Shape.appendCmd (sb, "color " + this.myType + " " + J.shape.Shape.getTranslucentLabel (imesh.colix));
if (imesh.colorCommand != null && imesh.colorType == 0 && !imesh.colorCommand.equals ("#inherit;")) {
J.shape.Shape.appendCmd (sb, imesh.colorCommand);
}var colorArrayed = (imesh.isColorSolid && imesh.pcs != null);
if (imesh.isColorSolid && imesh.colorType == 0 && !imesh.colorsExplicit && !colorArrayed) {
J.shape.Shape.appendCmd (sb, J.shape.Shape.getColorCommandUnk (this.myType, imesh.colix, this.translucentAllowed));
} else if (imesh.jvxlData.isBicolorMap && imesh.colorPhased) {
J.shape.Shape.appendCmd (sb, "color isosurface phase " + J.shape.Shape.encodeColor (imesh.jvxlData.minColorIndex) + " " + J.shape.Shape.encodeColor (imesh.jvxlData.maxColorIndex));
}if (imesh.vertexColorMap != null) for (var entry, $entry = imesh.vertexColorMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var bs = entry.getValue ();
if (!bs.isEmpty ()) J.shape.Shape.appendCmd (sb, "color " + this.myType + " " + JU.Escape.eBS (bs) + " " + entry.getKey ());
}
}}, "JU.SB,~N");
Clazz.defineMethod (c$, "getScriptBitSets", 
 function (script, bsCmd) {
this.script = script;
var i;
this.iHaveModelIndex = false;
this.modelIndex = -1;
if (script != null && (i = script.indexOf ("MODEL({")) >= 0) {
var j = script.indexOf ("})", i);
if (j > 0) {
var bs = JU.BS.unescape (script.substring (i + 3, j + 1));
this.modelIndex = (bs == null ? -1 : bs.nextSetBit (0));
this.iHaveModelIndex = (this.modelIndex >= 0);
}}if (script == null) return false;
this.getCapSlabInfo (script);
i = script.indexOf ("# ({");
if (i < 0) return false;
var j = script.indexOf ("})", i);
if (j < 0) return false;
var bs = JU.BS.unescape (script.substring (i + 2, j + 2));
if (bsCmd == null) this.sg.setProp ("select", bs, null);
 else bsCmd[0] = bs;
if ((i = script.indexOf ("({", j)) < 0) return true;
j = script.indexOf ("})", i);
if (j < 0) return false;
bs = JU.BS.unescape (script.substring (i + 1, j + 1));
if (bsCmd == null) this.sg.setProp ("ignore", bs, null);
 else bsCmd[1] = bs;
if ((i = script.indexOf ("/({", j)) == j + 2) {
if ((j = script.indexOf ("})", i)) < 0) return false;
bs = JU.BS.unescape (script.substring (i + 3, j + 1));
if (bsCmd == null) this.vwr.ms.setTrajectoryBs (bs);
 else bsCmd[2] = bs;
}return true;
}, "~S,~A");
Clazz.defineMethod (c$, "getCapSlabInfo", 
function (script) {
var i = script.indexOf ("# SLAB=");
if (i >= 0) this.sg.setProp ("slab", this.getCapSlabObject (JU.PT.getQuotedStringAt (script, i), false), null);
i = script.indexOf ("# CAP=");
if (i >= 0) this.sg.setProp ("slab", this.getCapSlabObject (JU.PT.getQuotedStringAt (script, i), true), null);
}, "~S");
Clazz.defineMethod (c$, "getCapSlabObject", 
 function (s, isCap) {
try {
if (s.indexOf ("array") == 0) {
var pts = JU.PT.split (s.substring (6, s.length - 1), ",");
return JU.TempArray.getSlabObjectType (1678381065,  Clazz.newArray (-1, [JU.Escape.uP (pts[0]), JU.Escape.uP (pts[1]), JU.Escape.uP (pts[2]), JU.Escape.uP (pts[3])]), isCap, null);
}var plane = JU.Escape.uP (s);
if (Clazz.instanceOf (plane, JU.P4)) return JU.TempArray.getSlabObjectType (134217750, plane, isCap, null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return null;
}, "~S,~B");
Clazz.defineMethod (c$, "initializeIsosurface", 
 function () {
if (!this.iHaveModelIndex) this.modelIndex = this.vwr.am.cmi;
this.atomIndex = -1;
this.bsDisplay = null;
this.center = JU.P3.new3 (NaN, 0, 0);
this.colix = 5;
this.connections = null;
this.cutoffRange = null;
this.colorType = this.defaultColix = this.meshColix = 0;
this.displayWithinPoints = null;
this.explicitContours = false;
this.isFixed = (this.modelIndex < 0);
this.isPhaseColored = this.isColorExplicit = false;
this.linkedMesh = null;
if (this.modelIndex < 0) this.modelIndex = 0;
this.scale3d = 0;
this.title = null;
this.translucentLevel = 0;
this.withinPoints = null;
this.initState ();
});
Clazz.defineMethod (c$, "initState", 
 function () {
this.associateNormals = true;
this.sg.initState ();
});
Clazz.defineMethod (c$, "setMeshI", 
 function () {
this.thisMesh.visible = true;
if ((this.thisMesh.atomIndex = this.atomIndex) >= 0) this.thisMesh.modelIndex = this.vwr.ms.at[this.atomIndex].mi;
 else if (this.isFixed) this.thisMesh.modelIndex = -1;
 else if (this.modelIndex >= 0) this.thisMesh.modelIndex = this.modelIndex;
 else this.thisMesh.modelIndex = this.vwr.am.cmi;
this.thisMesh.scriptCommand = this.script;
this.thisMesh.ptCenter.setT (this.center);
this.thisMesh.scale3d = (this.thisMesh.jvxlData.jvxlPlane == null ? 0 : this.scale3d);
});
Clazz.defineMethod (c$, "discardTempData", 
function (discardAll) {
if (!discardAll) return;
this.title = null;
if (this.thisMesh == null) return;
this.thisMesh.surfaceSet = null;
}, "~B");
Clazz.defineMethod (c$, "getDefaultColix", 
 function () {
if (this.defaultColix != 0) return this.defaultColix;
if (!this.sg.jvxlData.wasCubic) return this.colix;
var argb = (this.sg.params.cutoff >= 0 ? -11525984 : -6283184);
return JU.C.getColix (argb);
});
Clazz.defineMethod (c$, "drawLcaoCartoon", 
 function (z, x, rotAxis, nElectrons) {
var lcaoCartoon = this.sg.setLcao ();
var rotRadians = rotAxis.x + rotAxis.y + rotAxis.z;
this.defaultColix = JU.C.getColix (this.sg.params.colorPos);
var colixNeg = JU.C.getColix (this.sg.params.colorNeg);
var y =  new JU.V3 ();
var isReverse = (lcaoCartoon.length > 0 && lcaoCartoon.charAt (0) == '-');
if (isReverse) lcaoCartoon = lcaoCartoon.substring (1);
var sense = (isReverse ? -1 : 1);
y.cross (z, x);
if (rotRadians != 0) {
var a =  new JU.A4 ();
if (rotAxis.x != 0) a.setVA (x, rotRadians);
 else if (rotAxis.y != 0) a.setVA (y, rotRadians);
 else a.setVA (z, rotRadians);
var m =  new JU.M3 ().setAA (a);
m.rotate (x);
m.rotate (y);
m.rotate (z);
}if (this.thisMesh == null && this.nLCAO == 0) this.nLCAO = this.meshCount;
var id = (this.thisMesh == null ? (nElectrons > 0 ? "lp" : "lcao") + (++this.nLCAO) + "_" + lcaoCartoon : this.thisMesh.thisID);
if (this.thisMesh == null) this.allocMesh (id, null);
if (lcaoCartoon.equals ("px")) {
this.thisMesh.thisID += "a";
var meshA = this.thisMesh;
this.createLcaoLobe (x, sense, nElectrons);
if (nElectrons > 0) return;
this.setProperty ("thisID", id + "b", null);
this.createLcaoLobe (x, -sense, nElectrons);
this.thisMesh.colix = colixNeg;
this.linkedMesh = this.thisMesh.linkedMesh = meshA;
return;
}if (lcaoCartoon.equals ("py")) {
this.thisMesh.thisID += "a";
var meshA = this.thisMesh;
this.createLcaoLobe (y, sense, nElectrons);
if (nElectrons > 0) return;
this.setProperty ("thisID", id + "b", null);
this.createLcaoLobe (y, -sense, nElectrons);
this.thisMesh.colix = colixNeg;
this.linkedMesh = this.thisMesh.linkedMesh = meshA;
return;
}if (lcaoCartoon.equals ("pz")) {
this.thisMesh.thisID += "a";
var meshA = this.thisMesh;
this.createLcaoLobe (z, sense, nElectrons);
if (nElectrons > 0) return;
this.setProperty ("thisID", id + "b", null);
this.createLcaoLobe (z, -sense, nElectrons);
this.thisMesh.colix = colixNeg;
this.linkedMesh = this.thisMesh.linkedMesh = meshA;
return;
}if (lcaoCartoon.equals ("pza") || lcaoCartoon.indexOf ("sp") == 0 || lcaoCartoon.indexOf ("d") == 0 || lcaoCartoon.indexOf ("lp") == 0) {
this.createLcaoLobe (z, sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pzb")) {
this.createLcaoLobe (z, -sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pxa")) {
this.createLcaoLobe (x, sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pxb")) {
this.createLcaoLobe (x, -sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pya")) {
this.createLcaoLobe (y, sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pyb")) {
this.createLcaoLobe (y, -sense, nElectrons);
return;
}if (lcaoCartoon.equals ("spacefill") || lcaoCartoon.equals ("cpk")) {
this.createLcaoLobe (null, 2 * this.vwr.ms.at[this.atomIndex].getRadius (), nElectrons);
return;
}this.createLcaoLobe (null, 1, nElectrons);
return;
}, "JU.V3,JU.V3,JU.V3,~N");
Clazz.defineMethod (c$, "createLcaoLobe", 
 function (lobeAxis, factor, nElectrons) {
this.initState ();
if (JU.Logger.debugging) {
JU.Logger.debug ("creating isosurface ID " + this.thisMesh.thisID);
}if (lobeAxis == null) {
this.setProperty ("sphere", Float.$valueOf (factor / 2), null);
} else {
this.lcaoDir.x = lobeAxis.x * factor;
this.lcaoDir.y = lobeAxis.y * factor;
this.lcaoDir.z = lobeAxis.z * factor;
this.lcaoDir.w = 0.7;
this.setProperty (nElectrons == 2 ? "lp" : nElectrons == 1 ? "rad" : "lobe", this.lcaoDir, null);
}this.thisMesh.colix = this.defaultColix;
this.setScriptInfo (null);
}, "JU.V3,~N,~N");
Clazz.overrideMethod (c$, "invalidateTriangles", 
function () {
this.thisMesh.invalidatePolygons ();
});
Clazz.overrideMethod (c$, "setOutputChannel", 
function (binaryDoc, out) {
binaryDoc.setOutputChannel (out);
}, "javajs.api.GenericBinaryDocument,JU.OC");
Clazz.overrideMethod (c$, "fillMeshData", 
function (meshData, mode, mesh) {
if (meshData == null) {
if (this.thisMesh == null) this.allocMesh (null, null);
if (!this.thisMesh.isMerged) this.thisMesh.clearType (this.myType, this.sg.params.iAddGridPoints);
this.thisMesh.connectedAtoms = this.connections;
this.thisMesh.colix = this.getDefaultColix ();
this.thisMesh.colorType = this.colorType;
this.thisMesh.meshColix = this.meshColix;
if (this.isPhaseColored || this.thisMesh.jvxlData.isBicolorMap) this.thisMesh.isColorSolid = false;
return;
}if (mesh == null) mesh = this.thisMesh;
if (mesh == null) return;
switch (mode) {
case 1:
meshData.mergeVertexCount0 = mesh.mergeVertexCount0;
meshData.vs = mesh.vs;
meshData.vertexSource = mesh.vertexSource;
meshData.vvs = mesh.vvs;
meshData.vc = mesh.vc;
meshData.vertexIncrement = mesh.vertexIncrement;
meshData.pc = mesh.pc;
meshData.pis = mesh.pis;
meshData.pcs = mesh.pcs;
meshData.bsSlabDisplay = mesh.bsSlabDisplay;
meshData.bsSlabGhost = mesh.bsSlabGhost;
meshData.slabColix = mesh.slabColix;
meshData.slabMeshType = mesh.slabMeshType;
meshData.polygonCount0 = mesh.polygonCount0;
meshData.vertexCount0 = mesh.vertexCount0;
meshData.slabOptions = mesh.slabOptions;
meshData.colorsExplicit = mesh.colorsExplicit;
return;
case 2:
if (mesh.vcs == null || mesh.vc > mesh.vcs.length) mesh.vcs =  Clazz.newShortArray (mesh.vc, 0);
meshData.vcs = mesh.vcs;
return;
case 3:
mesh.surfaceSet = meshData.surfaceSet;
mesh.vertexSets = meshData.vertexSets;
mesh.nSets = meshData.nSets;
return;
case 4:
mesh.vs = meshData.vs;
mesh.vvs = meshData.vvs;
mesh.vc = meshData.vc;
mesh.vertexIncrement = meshData.vertexIncrement;
mesh.vertexSource = meshData.vertexSource;
mesh.pc = meshData.pc;
mesh.pis = meshData.pis;
mesh.pcs = meshData.pcs;
mesh.bsSlabDisplay = meshData.bsSlabDisplay;
mesh.bsSlabGhost = meshData.bsSlabGhost;
mesh.slabColix = meshData.slabColix;
mesh.slabMeshType = meshData.slabMeshType;
mesh.polygonCount0 = meshData.polygonCount0;
mesh.vertexCount0 = meshData.vertexCount0;
mesh.mergeVertexCount0 = meshData.mergeVertexCount0;
mesh.slabOptions = meshData.slabOptions;
mesh.colorsExplicit = meshData.colorsExplicit;
return;
}
}, "J.jvxl.data.MeshData,~N,J.shapesurface.IsosurfaceMesh");
Clazz.overrideMethod (c$, "notifySurfaceGenerationCompleted", 
function () {
this.setMeshI ();
this.setBsVdw ();
this.thisMesh.surfaceAtoms = this.sg.params.bsSelected;
this.thisMesh.insideOut = this.sg.params.isInsideOut ();
this.thisMesh.isModelConnected = this.sg.params.isModelConnected;
this.thisMesh.vertexSource = this.sg.params.vertexSource;
this.thisMesh.oabc = this.sg.getOriginVaVbVc ();
this.thisMesh.calculatedArea = null;
this.thisMesh.calculatedVolume = null;
this.thisMesh.probeValues = this.sg.params.probeValues;
if (!this.thisMesh.isMerged) {
this.thisMesh.initialize (this.sg.params.isFullyLit () ? 1073741964 : 1073741958, null, this.sg.params.thePlane);
if (this.jvxlData.fixedLattice != null) {
this.thisMesh.lattice = this.jvxlData.fixedLattice;
this.thisMesh.fixLattice ();
}return this.thisMesh.setColorsFromJvxlData (this.sg.params.colorRgb);
}if (!this.sg.params.allowVolumeRender) this.thisMesh.jvxlData.allowVolumeRender = false;
this.thisMesh.setColorsFromJvxlData (this.sg.params.colorRgb);
if (this.thisMesh.jvxlData.slabInfo != null) this.vwr.runScriptCautiously ("isosurface " + this.thisMesh.jvxlData.slabInfo);
if (this.sg.params.psi_monteCarloCount > 0) this.thisMesh.diameter = -1;
return false;
});
Clazz.overrideMethod (c$, "notifySurfaceMappingCompleted", 
function () {
if (!this.thisMesh.isMerged) this.thisMesh.initialize (this.sg.params.isFullyLit () ? 1073741964 : 1073741958, null, this.sg.params.thePlane);
this.setBsVdw ();
this.thisMesh.isColorSolid = false;
this.thisMesh.colorDensity = this.jvxlData.colorDensity;
this.thisMesh.volumeRenderPointSize = this.jvxlData.pointSize;
this.thisMesh.colorEncoder = this.sg.params.colorEncoder;
this.thisMesh.getContours ();
if (this.thisMesh.jvxlData.nContours != 0 && this.thisMesh.jvxlData.nContours != -1) this.explicitContours = true;
if (this.explicitContours && this.thisMesh.jvxlData.jvxlPlane != null) this.thisMesh.havePlanarContours = true;
this.setPropertySuper ("token", Integer.$valueOf (this.explicitContours ? 1073742046 : 1073741938), null);
this.setPropertySuper ("token", Integer.$valueOf (this.explicitContours ? 1073741898 : 1073742039), null);
if (!this.thisMesh.isMerged) this.thisMesh.setJvxlDataRendering ();
if (this.sg.params.slabInfo != null) {
this.thisMesh.slabPolygonsList (this.sg.params.slabInfo, false);
this.thisMesh.reinitializeLightingAndColor (this.vwr);
}this.thisMesh.setColorCommand ();
});
Clazz.defineMethod (c$, "setBsVdw", 
 function () {
if (this.sg.bsVdw == null) return;
if (this.thisMesh.bsVdw == null) this.thisMesh.bsVdw =  new JU.BS ();
this.thisMesh.bsVdw.or (this.sg.bsVdw);
});
Clazz.overrideMethod (c$, "calculateGeodesicSurface", 
function (bsSelected, envelopeRadius) {
return this.vwr.calculateSurface (bsSelected, envelopeRadius);
}, "JU.BS,~N");
Clazz.overrideMethod (c$, "getSurfacePointIndexAndFraction", 
function (cutoff, isCutoffAbsolute, x, y, z, offset, vA, vB, valueA, valueB, pointA, edgeVector, isContourType, fReturn) {
return 0;
}, "~N,~B,~N,~N,~N,JU.P3i,~N,~N,~N,~N,JU.T3,JU.V3,~B,~A");
Clazz.overrideMethod (c$, "addVertexCopy", 
function (vertexXYZ, value, assocVertex, asCopy) {
if (this.cutoffRange != null && (value < this.cutoffRange[0] || value > this.cutoffRange[1])) return -1;
return (this.withinPoints != null && !J.shape.Mesh.checkWithin (vertexXYZ, this.withinPoints, this.withinDistance2, this.isWithinNot) ? -1 : this.thisMesh.addVertexCopy (vertexXYZ, value, assocVertex, this.associateNormals, asCopy));
}, "JU.T3,~N,~N,~B");
Clazz.overrideMethod (c$, "addTriangleCheck", 
function (iA, iB, iC, check, iContour, isAbsolute, color) {
return (iA < 0 || iB < 0 || iC < 0 || isAbsolute && !J.jvxl.data.MeshData.checkCutoff (iA, iB, iC, this.thisMesh.vvs) ? -1 : this.thisMesh.addTriangleCheck (iA, iB, iC, check, iContour, color));
}, "~N,~N,~N,~N,~N,~B,~N");
Clazz.defineMethod (c$, "setScriptInfo", 
function (strCommand) {
var script = (strCommand == null ? this.sg.params.script : strCommand);
var pt = (script == null ? -1 : script.indexOf ("; isosurface map"));
if (pt == 0) {
if (this.thisMesh.scriptCommand == null) return;
pt = this.thisMesh.scriptCommand.indexOf ("; isosurface map");
if (pt >= 0) this.thisMesh.scriptCommand = this.thisMesh.scriptCommand.substring (0, pt);
this.thisMesh.scriptCommand += script;
return;
}this.thisMesh.title = this.sg.params.title;
this.thisMesh.dataType = this.sg.params.dataType;
this.thisMesh.scale3d = this.sg.params.scale3d;
if (script != null) {
if (this.oldFileName != null) {
script = script.$replace (this.oldFileName, this.newFileName);
}if (script.charAt (0) == ' ') {
script = this.myType + " ID " + JU.PT.esc (this.thisMesh.thisID) + script;
pt = script.indexOf ("; isosurface map");
}}if (pt > 0 && this.scriptAppendix.length > 0) this.thisMesh.scriptCommand = script.substring (0, pt) + this.scriptAppendix + script.substring (pt);
 else this.thisMesh.scriptCommand = script + this.scriptAppendix;
if (!this.explicitID && script != null && (pt = script.indexOf ("# ID=")) >= 0) this.thisMesh.thisID = JU.PT.getQuotedStringAt (script, pt);
}, "~S");
Clazz.overrideMethod (c$, "addRequiredFile", 
function (fileName) {
fileName = " # /*file*/\"" + fileName + "\"";
if (this.scriptAppendix.indexOf (fileName) < 0) this.scriptAppendix += fileName;
}, "~S");
Clazz.overrideMethod (c$, "setRequiredFile", 
function (oldName, fileName) {
this.oldFileName = oldName;
this.newFileName = fileName;
}, "~S,~S");
Clazz.defineMethod (c$, "setJvxlInfo", 
 function () {
if (this.sg.jvxlData !== this.jvxlData || this.sg.jvxlData !== this.thisMesh.jvxlData) this.jvxlData = this.thisMesh.jvxlData = this.sg.jvxlData;
});
Clazz.overrideMethod (c$, "getShapeDetail", 
function () {
var V =  new JU.Lst ();
for (var i = 0; i < this.meshCount; i++) {
var info =  new java.util.Hashtable ();
var mesh = this.isomeshes[i];
if (mesh == null || mesh.vs == null || mesh.vc == 0 && mesh.pc == 0) continue;
this.addMeshInfo (mesh, info);
V.addLast (info);
}
return V;
});
Clazz.defineMethod (c$, "addMeshInfo", 
function (mesh, info) {
info.put ("ID", (mesh.thisID == null ? "<noid>" : mesh.thisID));
info.put ("visible", Boolean.$valueOf (mesh.visible));
info.put ("vertexCount", Integer.$valueOf (mesh.vc));
if (mesh.calculatedVolume != null) info.put ("volume", mesh.calculatedVolume);
if (mesh.calculatedArea != null) info.put ("area", mesh.calculatedArea);
if (!Float.isNaN (mesh.ptCenter.x)) info.put ("center", mesh.ptCenter);
if (mesh.mat4 != null) info.put ("mat4", mesh.mat4);
if (mesh.scale3d != 0) info.put ("scale3d", Float.$valueOf (mesh.scale3d));
info.put ("xyzMin", mesh.jvxlData.boundingBox[0]);
info.put ("xyzMax", mesh.jvxlData.boundingBox[1]);
var s = J.jvxl.data.JvxlCoder.jvxlGetInfo (mesh.jvxlData);
if (s != null) info.put ("jvxlInfo", s.$replace ('\n', ' '));
info.put ("modelIndex", Integer.$valueOf (mesh.modelIndex));
info.put ("color", JU.CU.colorPtFromInt (JU.C.getArgb (mesh.colix), null));
if (mesh.colorEncoder != null) info.put ("colorKey", mesh.colorEncoder.getColorKey ());
if (mesh.title != null) info.put ("title", mesh.title);
if (mesh.jvxlData.contourValues != null || mesh.jvxlData.contourValuesUsed != null) info.put ("contours", mesh.getContourList (this.vwr));
}, "J.shapesurface.IsosurfaceMesh,java.util.Map");
Clazz.overrideMethod (c$, "getPlane", 
function (x) {
return null;
}, "~N");
Clazz.overrideMethod (c$, "getValue", 
function (x, y, z, ptyz) {
return 0;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "checkObjectHovered", 
function (x, y, bsVisible) {
if (this.keyXy != null && x >= this.keyXy[0] && y >= this.keyXy[1] && x < this.keyXy[2] && y < this.keyXy[3]) {
this.hoverKey (x, y);
return true;
}if (!this.vwr.getDrawHover ()) return false;
var s = this.findValue (x, y, false, bsVisible);
if (s == null) return false;
if (this.vwr.gdata.antialiasEnabled) {
x <<= 1;
y <<= 1;
}this.vwr.hoverOnPt (x, y, s, this.pickedMesh.thisID, this.pickedPt);
return true;
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "hoverKey", 
 function (x, y) {
try {
var s;
var f = 1 - 1.0 * (y - this.keyXy[1]) / (this.keyXy[3] - this.keyXy[1]);
if (this.thisMesh.showContourLines) {
var vContours = this.thisMesh.getContours ();
if (vContours == null) {
if (this.thisMesh.jvxlData.contourValues == null) return;
var i = Clazz.doubleToInt (Math.floor (f * this.thisMesh.jvxlData.contourValues.length));
if (i < 0 || i > this.thisMesh.jvxlData.contourValues.length) return;
s = "" + this.thisMesh.jvxlData.contourValues[i];
} else {
var i = Clazz.doubleToInt (Math.floor (f * vContours.length));
if (i < 0 || i > vContours.length) return;
s = "" + (vContours[i].get (2)).floatValue ();
}} else {
var g = this.thisMesh.colorEncoder.quantize (f, true);
f = this.thisMesh.colorEncoder.quantize (f, false);
s = "" + g + " - " + f;
}if (this.vwr.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
}this.vwr.hoverOnPt (x, y, s, null, null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~N,~N");
Clazz.overrideMethod (c$, "checkObjectClicked", 
function (x, y, action, bsVisible, drawPicking) {
if (!drawPicking) return null;
if (!this.vwr.isBound (action, 18)) return null;
var dmin2 = 100;
if (this.vwr.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
dmin2 <<= 1;
}var imesh = -1;
var jmaxz = -1;
var jminz = -1;
var maxz = -2147483648;
var minz = 2147483647;
var pickFront = true;
for (var i = 0; i < this.meshCount; i++) {
var m = this.isomeshes[i];
if (!this.isPickable (m, bsVisible)) continue;
var centers = (pickFront ? m.vs : m.getCenters ());
if (centers == null) continue;
for (var j = centers.length; --j >= 0; ) {
var v = centers[j];
if (v == null) continue;
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
if (this.ptXY.z < minz) {
if (pickFront) imesh = i;
minz = this.ptXY.z;
jminz = j;
}if (this.ptXY.z > maxz) {
if (!pickFront) imesh = i;
maxz = this.ptXY.z;
jmaxz = j;
}}}
}
if (imesh < 0) return null;
this.pickedMesh = this.isomeshes[imesh];
this.setPropertySuper ("thisID", this.pickedMesh.thisID, null);
var iFace = this.pickedVertex = (pickFront ? jminz : jmaxz);
var ptRet =  new JU.P3 ();
ptRet.setT ((pickFront ? this.pickedMesh.vs[this.pickedVertex] : (this.pickedMesh).centers[iFace]));
this.pickedModel = this.pickedMesh.modelIndex;
var map = this.getPickedPoint (ptRet, this.pickedModel);
this.setStatusPicked (-4, ptRet, map);
return map;
}, "~N,~N,~N,JU.BS,~B");
Clazz.defineMethod (c$, "isPickable", 
 function (m, bsVisible) {
return m.visibilityFlags != 0 && (m.modelIndex < 0 || bsVisible.get (m.modelIndex)) && !JU.C.isColixTranslucent (m.colix);
}, "J.shapesurface.IsosurfaceMesh,JU.BS");
Clazz.defineMethod (c$, "findValue", 
 function (x, y, isPicking, bsVisible) {
var dmin2 = 100;
if (this.vwr.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
dmin2 <<= 1;
}var pickedVertex = -1;
var pickedContour = null;
var m = null;
for (var i = 0; i < this.meshCount; i++) {
m = this.isomeshes[i];
if (!this.isPickable (m, bsVisible)) continue;
var vs = m.jvxlData.vContours;
var ilast = (m.firstRealVertex < 0 ? 0 : m.firstRealVertex);
var pickedJ = 0;
if (vs != null && vs.length > 0) {
for (var j = 0; j < vs.length; j++) {
var vc = vs[j];
var n = vc.size () - 1;
for (var k = 6; k < n; k++) {
var v = vc.get (k);
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
dmin2 = d2;
pickedContour = vc;
pickedJ = j;
this.pickedMesh = m;
this.pickedPt = v;
}}
}
if (pickedContour != null) return pickedContour.get (2).toString () + (JU.Logger.debugging ? " " + pickedJ : "");
} else if (m.jvxlData.jvxlPlane != null && m.vvs != null) {
var vertices = (m.mat4 == null && m.scale3d == 0 ? m.vs : m.getOffsetVertices (m.jvxlData.jvxlPlane));
for (var k = m.vc; --k >= ilast; ) {
var v = vertices[k];
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
dmin2 = d2;
pickedVertex = k;
this.pickedMesh = m;
this.pickedPt = v;
}}
if (pickedVertex != -1) break;
} else if (m.vvs != null) {
if (m.bsSlabDisplay != null) {
for (var k = m.bsSlabDisplay.nextSetBit (0); k >= 0; k = m.bsSlabDisplay.nextSetBit (k + 1)) {
var p = m.pis[k];
if (p != null) for (var l = 0; l < 3; l++) {
var v = m.vs[p[l]];
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
dmin2 = d2;
pickedVertex = p[l];
this.pickedMesh = m;
this.pickedPt = v;
}}
}
} else {
for (var k = m.vc; --k >= ilast; ) {
var v = m.vs[k];
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
dmin2 = d2;
pickedVertex = k;
this.pickedMesh = m;
this.pickedPt = v;
}}
}if (pickedVertex != -1) break;
}}
return (pickedVertex == -1 ? null : (JU.Logger.debugging ? "$" + m.thisID + "[" + (pickedVertex + 1) + "] " + m.vs[pickedVertex] + ": " : m.thisID + ": ") + m.vvs[pickedVertex]);
}, "~N,~N,~B,JU.BS");
Clazz.defineMethod (c$, "getCmd", 
function (index) {
var sb =  new JU.SB ().append ("\n");
this.getMeshCommand (sb, index);
return (sb.toString ());
}, "~N");
Clazz.defineStatics (c$,
"MAX_OBJECT_CLICK_DISTANCE_SQUARED", 100);
});
