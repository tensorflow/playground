Clazz.declarePackage ("J.shapespecial");
Clazz.load (["java.lang.Enum", "J.shape.MeshCollection", "JU.P3i", "$.V3"], "J.shapespecial.Draw", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.Measure", "$.P3", "$.PT", "$.SB", "JS.SV", "J.shapespecial.DrawMesh", "JU.BSUtil", "$.C", "$.Escape", "$.Logger", "$.MeshSurface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dmeshes = null;
this.thisMesh = null;
this.ptList = null;
this.offset = null;
this.nPoints = 0;
this.diameter = 0;
this.width = 0;
this.newScale = 0;
this.length = 0;
this.isCurve = false;
this.isArc = false;
this.isArrow = false;
this.isLine = false;
this.isVector = false;
this.isCircle = false;
this.isPerpendicular = false;
this.isCylinder = false;
this.isVertices = false;
this.isPlane = false;
this.isReversed = false;
this.isRotated45 = false;
this.isCrossed = false;
this.isValid = false;
this.noHead = false;
this.isBarb = false;
this.indicatedModelIndex = -1;
this.modelInfo = null;
this.makePoints = false;
this.plane = null;
this.bsAllModels = null;
this.polygon = null;
this.vData = null;
this.intersectID = null;
this.boundBox = null;
this.lineData = null;
this.slabData = null;
this.vAB = null;
this.ptXY = null;
Clazz.instantialize (this, arguments);
}, J.shapespecial, "Draw", J.shape.MeshCollection);
Clazz.prepareFields (c$, function () {
this.dmeshes =  new Array (4);
this.offset =  new JU.V3 ();
this.vAB =  new JU.V3 ();
this.ptXY =  new JU.P3i ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.shapespecial.Draw, []);
this.htObjects =  new java.util.Hashtable ();
});
Clazz.overrideMethod (c$, "allocMesh", 
function (thisID, m) {
var index = this.meshCount++;
this.meshes = this.dmeshes = JU.AU.ensureLength (this.dmeshes, this.meshCount * 2);
this.currentMesh = this.thisMesh = this.dmeshes[index] = (m == null ?  new J.shapespecial.DrawMesh (this.vwr, thisID, this.colix, index) : m);
this.currentMesh.color = this.color;
this.currentMesh.index = index;
if (thisID != null && thisID !== "+PREVIOUS_MESH+" && this.htObjects != null) this.htObjects.put (thisID.toUpperCase (), this.currentMesh);
}, "~S,J.shape.Mesh");
Clazz.defineMethod (c$, "setPropertySuper", 
 function (propertyName, value, bs) {
this.currentMesh = this.thisMesh;
this.setPropMC (propertyName, value, bs);
this.thisMesh = this.currentMesh;
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapespecial.Draw, "initShape", []);
this.myType = "draw";
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("init" === propertyName) {
this.initDraw ();
this.setPropertySuper ("init", value, bs);
return;
}if ("length" === propertyName) {
this.length = (value).floatValue ();
return;
}if ("fixed" === propertyName) {
this.isFixed = (value).booleanValue ();
return;
}if ("intersect" === propertyName) {
if (Clazz.instanceOf (value, String)) this.intersectID = value;
 else this.boundBox = value;
return;
}if ("slab" === propertyName) {
var meshIndex = this.getIndexFromName (value);
if (meshIndex < 0) {
return;
}var m = this.meshes[meshIndex];
if (m.checkByteCount != 1) return;
var ms =  new JU.MeshSurface ();
ms.vs = m.vs;
ms.vvs =  Clazz.newFloatArray (m.vc, 0);
ms.vc = m.vc;
ms.pis = m.pis;
ms.pc = m.pc;
ms.dataOnly = true;
this.slabData = ms;
}if ("lineData" === propertyName) {
this.lineData =  new JU.Lst ();
if (this.indicatedModelIndex < 0) this.indicatedModelIndex = this.vwr.am.cmi;
var fdata = value;
var n = Clazz.doubleToInt (fdata.length / 6);
for (var i = 0, pt = 0; i < n; i++) this.lineData.addLast ( Clazz.newArray (-1, [JU.P3.new3 (fdata[pt++], fdata[pt++], fdata[pt++]), JU.P3.new3 (fdata[pt++], fdata[pt++], fdata[pt++])]));

return;
}if ("modelIndex" === propertyName) {
this.indicatedModelIndex = (value).intValue ();
if (this.indicatedModelIndex < 0 || this.indicatedModelIndex >= this.vwr.ms.mc) return;
this.vData.addLast ( Clazz.newArray (-1, [Integer.$valueOf (4), (this.modelInfo =  Clazz.newIntArray (-1, [this.indicatedModelIndex, 0]))]));
return;
}if ("planedef" === propertyName) {
this.plane = value;
if (this.intersectID != null || this.boundBox != null || this.slabData != null) return;
if (this.isCircle || this.isArc) this.isPlane = true;
this.vData.addLast ( Clazz.newArray (-1, [Integer.$valueOf (1), JU.P3.new3 (NaN, NaN, NaN)]));
return;
}if ("perp" === propertyName) {
this.isPerpendicular = true;
return;
}if ("cylinder" === propertyName) {
this.isCylinder = true;
return;
}if ("plane" === propertyName) {
this.isPlane = true;
return;
}if ("curve" === propertyName) {
this.isCurve = true;
return;
}if ("arrow" === propertyName) {
this.isArrow = true;
return;
}if ("line" === propertyName) {
this.isLine = true;
this.isCurve = true;
return;
}if ("arc" === propertyName) {
this.isCurve = true;
this.isArc = true;
if (this.isArrow) {
this.isArrow = false;
this.isVector = true;
}return;
}if ("circle" === propertyName) {
this.isCircle = true;
return;
}if ("vector" === propertyName) {
this.isArrow = true;
this.isVector = true;
return;
}if ("vertices" === propertyName) {
this.isVertices = true;
return;
}if ("reverse" === propertyName) {
this.isReversed = true;
return;
}if ("nohead" === propertyName) {
this.noHead = true;
return;
}if ("isbarb" === propertyName) {
this.isBarb = true;
return;
}if ("rotate45" === propertyName) {
this.isRotated45 = true;
return;
}if ("crossed" === propertyName) {
this.isCrossed = true;
return;
}if ("points" === propertyName) {
this.newScale = (value).floatValue () / 100;
if (this.newScale == 0) this.newScale = 1;
return;
}if ("scale" === propertyName) {
this.newScale = (value).floatValue () / 100;
if (this.newScale == 0) this.newScale = 0.01;
if (this.thisMesh != null) {
this.scale (this.thisMesh, this.newScale);
this.thisMesh.initialize (1073741964, null, null);
}return;
}if ("diameter" === propertyName) {
this.diameter = (value).intValue ();
return;
}if ("width" === propertyName) {
this.width = (value).floatValue ();
return;
}if ("identifier" === propertyName) {
var thisID = value;
var meshIndex = this.getIndexFromName (thisID);
if (meshIndex >= 0) {
this.vData.addLast ( Clazz.newArray (-1, [Integer.$valueOf (2),  Clazz.newIntArray (-1, [meshIndex, this.isReversed ? 1 : 0, this.isVertices ? 1 : 0])]));
this.isReversed = this.isVertices = false;
} else {
JU.Logger.error ("draw identifier " + value + " not found");
this.isValid = false;
}return;
}if ("polygon" === propertyName) {
this.polygon = value;
if (this.polygon == null) this.polygon =  new JU.Lst ();
return;
}if ("coord" === propertyName) {
this.vData.addLast ( Clazz.newArray (-1, [Integer.$valueOf (1), value]));
if (this.indicatedModelIndex >= 0) this.modelInfo[1]++;
return;
}if ("offset" === propertyName) {
this.offset = JU.V3.newV (value);
if (this.thisMesh != null) this.thisMesh.offset (this.offset);
return;
}if ("atomSet" === propertyName) {
var bsAtoms = value;
if (bsAtoms.isEmpty ()) return;
this.vData.addLast ( Clazz.newArray (-1, [Integer.$valueOf (3), bsAtoms]));
if (this.isCircle && this.diameter == 0 && this.width == 0) this.width = this.vwr.ms.calcRotationRadiusBs (bsAtoms) * 2.0;
return;
}if ("coords" === propertyName) {
this.addPoints (1, value);
return;
}if ("modelBasedPoints" === propertyName) {
this.addPoints (5, value);
return;
}if ("set" === propertyName) {
if (this.thisMesh == null) {
this.allocMesh (null, null);
this.thisMesh.colix = this.colix;
this.thisMesh.color = this.color;
}this.thisMesh.isValid = (this.isValid ? this.setDrawing (value) : false);
if (this.thisMesh.isValid) {
if (this.thisMesh.vc > 2 && this.length != 3.4028235E38 && this.newScale == 1) this.newScale = this.length;
this.scale (this.thisMesh, this.newScale);
this.thisMesh.initialize (1073741964, null, null);
J.shapespecial.Draw.setAxes (this.thisMesh);
this.thisMesh.title = this.title;
this.thisMesh.visible = true;
}this.nPoints = -1;
this.vData = null;
this.lineData = null;
return;
}if (propertyName === "deleteModelAtoms") {
this.deleteModels (((value)[2])[0]);
return;
}this.setPropertySuper (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "addPoints", 
 function (type, value) {
var pts = value;
var key = Integer.$valueOf (type);
var isModelPoints = (type == 5);
if (isModelPoints) this.vData.addLast ( Clazz.newArray (-1, [key, pts]));
for (var i = 0, n = pts.size (); i < n; i++) {
var o = pts.get (i);
var pt;
if (Clazz.instanceOf (o, JU.P3)) {
pt = o;
} else {
var v = o;
switch (v.tok) {
case 10:
if (!isModelPoints && (v.value).isEmpty ()) continue;
pt = this.vwr.ms.getAtomSetCenter (v.value);
break;
case 8:
if (isModelPoints) continue;
default:
pt = JS.SV.ptValue (v);
}
}if (isModelPoints) {
pts.set (i, JS.SV.getVariable (pt));
} else {
this.vData.addLast ( Clazz.newArray (-1, [key, pt]));
}}
}, "~N,~O");
Clazz.defineMethod (c$, "deleteModels", 
 function (modelIndex) {
for (var i = this.meshCount; --i >= 0; ) {
var m = this.dmeshes[i];
if (m == null) continue;
var deleteMesh = (m.modelIndex == modelIndex);
if (m.modelFlags != null) {
m.deleteAtoms (modelIndex);
deleteMesh = (m.modelFlags.length () == 0);
if (!deleteMesh) continue;
}if (deleteMesh) {
this.meshCount--;
this.deleteMeshElement (i);
} else if (this.meshes[i].modelIndex > modelIndex) {
this.meshes[i].modelIndex--;
}}
this.resetObjects ();
}, "~N");
Clazz.defineMethod (c$, "deleteMeshElement", 
 function (i) {
if (this.meshes[i] === this.currentMesh) this.currentMesh = this.thisMesh = null;
this.meshes = this.dmeshes = JU.AU.deleteElements (this.meshes, i, 1);
}, "~N");
Clazz.defineMethod (c$, "initDraw", 
 function () {
this.boundBox = null;
this.bsAllModels = null;
this.colix = 5;
this.color = 0xFFFFFFFF;
this.diameter = 0;
this.explicitID = false;
this.indicatedModelIndex = -1;
this.intersectID = null;
this.isCurve = this.isArc = this.isArrow = this.isPlane = this.isCircle = this.isCylinder = this.isLine = false;
this.isFixed = this.isReversed = this.isRotated45 = this.isCrossed = this.noHead = this.isBarb = false;
this.isPerpendicular = this.isVertices = this.isVector = false;
this.isValid = true;
this.length = 3.4028235E38;
this.lineData = null;
this.newScale = 0;
this.offset = null;
this.plane = null;
this.polygon = null;
this.slabData = null;
this.vData =  new JU.Lst ();
this.width = 0;
this.setPropertySuper ("thisID", "+PREVIOUS_MESH+", null);
});
Clazz.overrideMethod (c$, "getPropertyData", 
function (property, data) {
if (property === "keys") {
var keys = (Clazz.instanceOf (data[1], JU.Lst) ? data[1] :  new JU.Lst ());
data[1] = keys;
keys.addLast ("getSpinAxis");
}if (property === "getCenter") {
var id = data[0];
var index = (data[1]).intValue ();
var modelIndex = (data[2]).intValue ();
data[2] = this.getSpinCenter (id, index, modelIndex);
return (data[2] != null);
}if (property === "getSpinAxis") {
var id = data[0];
var index = (data[1]).intValue ();
data[2] = this.getSpinAxis (id, index);
return (data[2] != null);
}return this.getPropDataMC (property, data);
}, "~S,~A");
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
var m = this.thisMesh;
if (index >= 0 && (index >= this.meshCount || (m = this.meshes[index]) == null)) return null;
if (property === "command") return this.getCommand (m);
if (property === "type") return Integer.$valueOf (m == null ? J.shapespecial.Draw.EnumDrawType.NONE.id : m.drawType.id);
return this.getPropMC (property, index);
}, "~S,~N");
Clazz.defineMethod (c$, "getSpinCenter", 
 function (axisID, vertexIndex, modelIndex) {
var id;
var pt = axisID.indexOf ("[");
var pt2;
if (pt > 0) {
id = axisID.substring (0, pt);
if ((pt2 = axisID.lastIndexOf ("]")) < pt) pt2 = axisID.length;
try {
vertexIndex = Integer.parseInt (axisID.substring (pt + 1, pt2));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
} else {
id = axisID;
}var m = this.getMesh (id);
if (m == null || m.vs == null) return null;
if (vertexIndex == 2147483647) return JU.P3.new3 (m.index + 1, this.meshCount, m.vc);
if (vertexIndex != -2147483648) vertexIndex = m.getVertexIndexFromNumber (vertexIndex);
return (vertexIndex >= 0 ? m.vs[vertexIndex] : m.ptCenters == null || modelIndex < 0 || modelIndex >= m.ptCenters.length ? m.ptCenter : m.ptCenters[modelIndex]);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "getSpinAxis", 
 function (axisID, modelIndex) {
var m = this.getMesh (axisID);
return (m == null || m.vs == null ? null : m.ptCenters == null || modelIndex < 0 ? m.axis : m.axes[modelIndex]);
}, "~S,~N");
Clazz.defineMethod (c$, "setDrawing", 
 function (connections) {
if (this.thisMesh == null) this.allocMesh (null, null);
this.thisMesh.clear ("draw");
this.thisMesh.diameter = this.diameter;
this.thisMesh.width = this.width;
if (this.intersectID != null || this.boundBox != null) {
if (this.boundBox != null) {
if (this.plane == null) {
}} else if (this.plane != null && this.intersectID != null) {
var vData =  new JU.Lst ();
var data =  Clazz.newArray (-1, [this.intersectID, this.plane, vData, null]);
this.vwr.shm.getShapePropertyData (24, "intersectPlane", data);
if (vData.size () > 0) {
this.indicatedModelIndex = (data[3]).intValue ();
this.lineData = vData;
}}} else if (this.slabData != null && this.plane != null) {
this.slabData.getMeshSlicer ().getIntersection (0, this.plane, null, null, null, null, null, false, true, 134217750, false);
this.polygon =  new JU.Lst ();
this.polygon.addLast (this.slabData.vs);
this.polygon.addLast (this.slabData.pis);
}if (this.polygon == null && (this.lineData != null ? this.lineData.size () == 0 : (this.vData.size () == 0) == (connections == null)) || !this.isArrow && connections != null) return false;
var modelCount = this.vwr.ms.mc;
if (this.polygon != null || this.lineData != null || this.indicatedModelIndex < 0 && (this.isFixed || this.isArrow || this.isCurve || this.isCircle || this.isCylinder || modelCount == 1)) {
this.thisMesh.modelIndex = (this.lineData == null ? this.vwr.am.cmi : this.indicatedModelIndex);
this.thisMesh.isFixed = (this.isFixed || this.lineData == null && this.thisMesh.modelIndex < 0 && modelCount > 1);
if (this.isFixed && modelCount > 1) this.thisMesh.modelIndex = -1;
 else if (this.lineData == null && this.thisMesh.modelIndex < 0) this.thisMesh.modelIndex = 0;
this.thisMesh.ptCenters = null;
this.thisMesh.modelFlags = null;
this.thisMesh.drawTypes = null;
this.thisMesh.drawVertexCounts = null;
this.thisMesh.connectedAtoms = connections;
if (this.polygon != null) {
if (this.polygon.size () == 0) return false;
this.thisMesh.isDrawPolygon = true;
this.thisMesh.vs = this.polygon.get (0);
this.thisMesh.pis = this.polygon.get (1);
this.thisMesh.drawVertexCount = this.thisMesh.vc = this.thisMesh.vs.length;
this.thisMesh.pc = (this.thisMesh.pis == null ? -1 : this.thisMesh.pis.length);
for (var i = 0; i < this.thisMesh.pc; i++) {
for (var j = 0; j < 3; j++) if (this.thisMesh.pis[i][j] >= this.thisMesh.vc) return false;

}
this.thisMesh.drawType = J.shapespecial.Draw.EnumDrawType.POLYGON;
this.thisMesh.checkByteCount = 1;
} else if (this.lineData != null) {
this.thisMesh.lineData = this.lineData;
} else {
this.thisMesh.setPolygonCount (1);
if (this.setPoints (-1, -1)) this.setPoints (-1, this.nPoints);
this.setPolygon (0);
}} else {
this.thisMesh.modelIndex = -1;
this.thisMesh.setPolygonCount (modelCount);
this.thisMesh.ptCenters =  new Array (modelCount);
this.thisMesh.modelFlags =  new JU.BS ();
this.thisMesh.drawTypes =  new Array (modelCount);
this.thisMesh.drawVertexCounts =  Clazz.newIntArray (modelCount, 0);
this.thisMesh.vc = 0;
if (this.indicatedModelIndex >= 0) {
this.setPoints (-1, 0);
this.thisMesh.drawType = J.shapespecial.Draw.EnumDrawType.MULTIPLE;
this.thisMesh.drawVertexCount = -1;
this.thisMesh.modelFlags.set (this.indicatedModelIndex);
this.indicatedModelIndex = -1;
} else {
var bsModels = this.vwr.getVisibleFramesBitSet ();
for (var iModel = 0; iModel < modelCount; iModel++) {
if (bsModels.get (iModel) && this.setPoints (iModel, -1)) {
this.setPoints (iModel, this.nPoints);
this.setPolygon (iModel);
this.thisMesh.setCenter (iModel);
this.thisMesh.drawTypes[iModel] = this.thisMesh.drawType;
this.thisMesh.drawVertexCounts[iModel] = this.thisMesh.drawVertexCount;
this.thisMesh.drawType = J.shapespecial.Draw.EnumDrawType.MULTIPLE;
this.thisMesh.drawVertexCount = -1;
this.thisMesh.modelFlags.set (iModel);
} else {
this.thisMesh.drawTypes[iModel] = J.shapespecial.Draw.EnumDrawType.NONE;
this.thisMesh.pis[iModel] =  Clazz.newIntArray (0, 0);
}}
}}this.thisMesh.isVector = this.isVector;
this.thisMesh.noHead = this.noHead;
this.thisMesh.isBarb = this.isBarb;
this.thisMesh.width = (this.thisMesh.drawType === J.shapespecial.Draw.EnumDrawType.CYLINDER || this.thisMesh.drawType === J.shapespecial.Draw.EnumDrawType.CIRCULARPLANE ? -Math.abs (this.width) : this.width);
this.thisMesh.setCenter (-1);
if (this.offset != null) this.thisMesh.offset (this.offset);
if (this.thisMesh.thisID == null) {
this.thisMesh.thisID = this.thisMesh.drawType.$$name + (++this.nUnnamed);
this.htObjects.put (this.thisMesh.thisID, this.thisMesh);
}this.clean ();
return true;
}, "~A");
Clazz.overrideMethod (c$, "clean", 
function () {
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i] == null || this.meshes[i].vc == 0 && this.meshes[i].connectedAtoms == null && this.meshes[i].lineData == null) this.deleteMeshI (i);

});
Clazz.defineMethod (c$, "addPoint", 
 function (newPt, iModel) {
if (this.makePoints) {
if (newPt == null || iModel >= 0 && !this.bsAllModels.get (iModel)) return;
this.ptList[this.nPoints] = JU.P3.newP (newPt);
if (newPt.z == 3.4028235E38 || newPt.z == -3.4028235E38) this.thisMesh.haveXyPoints = true;
} else if (iModel >= 0) {
this.bsAllModels.set (iModel);
}this.nPoints++;
}, "JU.T3,~N");
Clazz.defineMethod (c$, "setPoints", 
 function (iModel, n) {
this.makePoints = (n >= 0);
if (this.makePoints) {
this.ptList =  new Array (Math.max (5, n));
if (this.bsAllModels == null) this.bsAllModels = this.vwr.getVisibleFramesBitSet ();
}this.nPoints = 0;
var nData = this.vData.size ();
var modelIndex = 0;
var bs;
var bsModel = (iModel < 0 ? null : this.vwr.getModelUndeletedAtomsBitSet (iModel));
for (var i = 0; i < nData; i++) {
var info = this.vData.get (i);
switch ((info[0]).intValue ()) {
case 4:
var modelInfo = info[1];
modelIndex = modelInfo[0];
this.nPoints = modelInfo[1];
var nVertices = Math.max (this.nPoints, 3);
var n0 = this.thisMesh.vc;
if (this.nPoints > 0) {
var p = this.thisMesh.pis[modelIndex] =  Clazz.newIntArray (nVertices, 0);
for (var j = 0; j < this.nPoints; j++) {
info = this.vData.get (++i);
p[j] = this.thisMesh.addV (info[1], false);
}
for (var j = this.nPoints; j < 3; j++) {
p[j] = n0 + this.nPoints - 1;
}
this.thisMesh.drawTypes[modelIndex] = J.shapespecial.Draw.EnumDrawType.getType (this.nPoints);
this.thisMesh.drawVertexCounts[modelIndex] = this.nPoints;
this.thisMesh.modelFlags.set (modelIndex);
}break;
case 1:
this.addPoint (info[1], (this.makePoints ? iModel : -1));
break;
case 3:
bs = JU.BSUtil.copy (info[1]);
if (bsModel != null) bs.and (bsModel);
if (bs.length () > 0) this.addPoint (this.vwr.ms.getAtomSetCenter (bs), (this.makePoints ? iModel : -1));
break;
case 2:
var idInfo = info[1];
var m = this.dmeshes[idInfo[0]];
var isReversed = (idInfo[1] == 1);
var isVertices = (idInfo[2] == 1);
if (m.modelIndex > 0 && m.modelIndex != iModel) return false;
if (this.bsAllModels == null) this.bsAllModels =  new JU.BS ();
if (this.isPlane && !this.isCircle || this.isPerpendicular || isVertices) {
if (isReversed) {
if (iModel < 0 || iModel >= m.pc) for (var ipt = m.drawVertexCount; --ipt >= 0; ) this.addPoint (m.vs[ipt], iModel);

 else if (m.pis[iModel] != null) for (var ipt = m.drawVertexCounts[iModel]; --ipt >= 0; ) this.addPoint (m.vs[m.pis[iModel][ipt]], iModel);

} else {
if (iModel < 0 || iModel >= m.pc) for (var ipt = 0; ipt < m.drawVertexCount; ipt++) this.addPoint (m.vs[ipt], iModel);

 else if (m.pis[iModel] != null) for (var ipt = 0; ipt < m.drawVertexCounts[iModel]; ipt++) this.addPoint (m.vs[m.pis[iModel][ipt]], iModel);

}} else {
if (iModel < 0 || m.ptCenters == null || m.ptCenters[iModel] == null) this.addPoint (m.ptCenter, iModel);
 else this.addPoint (m.ptCenters[iModel], iModel);
}break;
case 5:
var modelBasedPoints = info[1];
if (this.bsAllModels == null) this.bsAllModels =  new JU.BS ();
for (var j = 0; j < modelBasedPoints.size (); j++) if (iModel < 0 || j == iModel) {
var point = modelBasedPoints.get (j);
this.bsAllModels.set (j);
if (Clazz.instanceOf (point, JU.P3)) {
this.addPoint (point, j);
} else if (Clazz.instanceOf (point, JU.BS)) {
bs = point;
if (bsModel != null) bs.and (bsModel);
if (bs.length () > 0) this.addPoint (this.vwr.ms.getAtomSetCenter (bs), j);
} else if (Clazz.instanceOf (point, JS.SV)) {
this.addPoint (JS.SV.ptValue (point), j);
}}
break;
}
}
if (this.makePoints && this.isCrossed && this.nPoints == 4) {
var pt = this.ptList[1];
this.ptList[1] = this.ptList[2];
this.ptList[2] = pt;
}return (this.nPoints > 0);
}, "~N,~N");
Clazz.defineMethod (c$, "setPolygon", 
 function (nPoly) {
var nVertices = this.nPoints;
var drawType = J.shapespecial.Draw.EnumDrawType.POINT;
if (this.isArc) {
if (nVertices >= 2) {
drawType = J.shapespecial.Draw.EnumDrawType.ARC;
} else {
this.isArc = false;
this.isVector = false;
this.isCurve = false;
this.isArrow = true;
}}if (this.isCircle) {
this.length = 0;
if (nVertices == 2) this.isPlane = true;
if (!this.isPlane) drawType = J.shapespecial.Draw.EnumDrawType.CIRCLE;
if (this.width == 0) this.width = 1;
} else if ((this.isCurve || this.isArrow) && nVertices >= 2 && !this.isArc) {
drawType = (this.isLine ? J.shapespecial.Draw.EnumDrawType.LINE_SEGMENT : this.isCurve ? J.shapespecial.Draw.EnumDrawType.CURVE : J.shapespecial.Draw.EnumDrawType.ARROW);
}if (this.isVector && !this.isArc) {
if (nVertices > 2) nVertices = 2;
 else if (this.plane == null && nVertices != 2) this.isVector = false;
}if (this.thisMesh.haveXyPoints) {
this.isPerpendicular = false;
if (nVertices == 3 && this.isPlane) this.isPlane = false;
this.length = 3.4028235E38;
if (this.isVector) this.thisMesh.diameter = 0;
} else if (nVertices == 2 && this.isVector) {
this.ptList[1].add (this.ptList[0]);
}var dist = 0;
if (this.isArc || this.plane != null && this.isCircle) {
if (this.plane != null) {
dist = JU.Measure.distanceToPlane (this.plane, this.ptList[0]);
var vAC = JU.V3.new3 (-this.plane.x, -this.plane.y, -this.plane.z);
vAC.normalize ();
if (dist < 0) vAC.scale (-1);
if (this.isCircle) {
vAC.scale (0.005);
this.ptList[0].sub (vAC);
vAC.scale (2);
}vAC.add (this.ptList[0]);
this.ptList[1] = JU.P3.newP (vAC);
drawType = (this.isArrow ? J.shapespecial.Draw.EnumDrawType.ARROW : this.isArc ? J.shapespecial.Draw.EnumDrawType.ARC : J.shapespecial.Draw.EnumDrawType.CIRCULARPLANE);
}if (this.isArc) {
dist = Math.abs (dist);
if (nVertices > 3) {
} else if (nVertices == 3) {
this.ptList[3] = JU.P3.newP (this.ptList[2]);
this.ptList[2] = J.shapespecial.Draw.randomPoint ();
} else {
if (nVertices == 2) {
this.ptList[2] = J.shapespecial.Draw.randomPoint ();
}this.ptList[3] = JU.P3.new3 (0, 360, 0);
}if (this.plane != null) this.ptList[3].z *= dist;
nVertices = 4;
}this.plane = null;
} else if (drawType === J.shapespecial.Draw.EnumDrawType.POINT) {
var pt;
var center =  new JU.P3 ();
var normal =  new JU.V3 ();
if (nVertices == 2 && this.plane != null) {
this.ptList[1] = JU.P3.newP (this.ptList[0]);
var vTemp =  new JU.V3 ();
JU.Measure.getPlaneProjection (this.ptList[1], this.plane, this.ptList[1], vTemp);
nVertices = -2;
if (this.isArrow) drawType = J.shapespecial.Draw.EnumDrawType.ARROW;
this.plane = null;
}if (nVertices == 3 && this.isPlane && !this.isPerpendicular) {
pt = JU.P3.newP (this.ptList[1]);
pt.sub (this.ptList[0]);
pt.scale (0.5);
this.ptList[3] = JU.P3.newP (this.ptList[2]);
this.ptList[2].add (pt);
this.ptList[3].sub (pt);
nVertices = 4;
} else if (nVertices >= 3 && !this.isPlane && this.isPerpendicular) {
JU.Measure.calcNormalizedNormal (this.ptList[0], this.ptList[1], this.ptList[2], normal, this.vAB);
center =  new JU.P3 ();
JU.Measure.calcAveragePointN (this.ptList, nVertices, center);
dist = (this.length == 3.4028235E38 ? this.ptList[0].distance (center) : this.length);
normal.scale (dist);
this.ptList[0].setT (center);
this.ptList[1].add2 (center, normal);
nVertices = 2;
} else if (nVertices == 2 && this.isPerpendicular) {
JU.Measure.calcAveragePoint (this.ptList[0], this.ptList[1], center);
dist = (this.length == 3.4028235E38 ? this.ptList[0].distance (center) : this.length);
if (this.isPlane && this.length != 3.4028235E38) dist /= 2;
if (this.isPlane && this.isRotated45) dist *= 1.4142;
JU.Measure.getNormalToLine (this.ptList[0], this.ptList[1], normal);
normal.scale (dist);
if (this.isPlane) {
this.ptList[2] = JU.P3.newP (center);
this.ptList[2].sub (normal);
pt = JU.P3.newP (center);
pt.add (normal);
JU.Measure.calcNormalizedNormal (this.ptList[0], this.ptList[1], this.ptList[2], normal, this.vAB);
normal.scale (dist);
this.ptList[3] = JU.P3.newP (center);
this.ptList[3].add (normal);
this.ptList[1].sub2 (center, normal);
this.ptList[0].setT (pt);
if (this.isRotated45) {
JU.Measure.calcAveragePoint (this.ptList[0], this.ptList[1], this.ptList[0]);
JU.Measure.calcAveragePoint (this.ptList[1], this.ptList[2], this.ptList[1]);
JU.Measure.calcAveragePoint (this.ptList[2], this.ptList[3], this.ptList[2]);
JU.Measure.calcAveragePoint (this.ptList[3], pt, this.ptList[3]);
}nVertices = 4;
} else {
this.ptList[0].sub2 (center, normal);
this.ptList[1].add2 (center, normal);
}if (this.isArrow && nVertices != -2) this.isArrow = false;
} else if (nVertices == 2 && this.length != 3.4028235E38) {
JU.Measure.calcAveragePoint (this.ptList[0], this.ptList[1], center);
normal.sub2 (this.ptList[1], center);
normal.scale (0.5 / normal.length () * (this.length == 0 ? 0.01 : this.length));
if (this.length == 0) center.setT (this.ptList[0]);
this.ptList[0].sub2 (center, normal);
this.ptList[1].add2 (center, normal);
}if (nVertices > 4) nVertices = 4;
switch (nVertices) {
case -2:
nVertices = 2;
break;
case 1:
break;
case 2:
drawType = (this.isArc ? J.shapespecial.Draw.EnumDrawType.ARC : this.isPlane && this.isCircle ? J.shapespecial.Draw.EnumDrawType.CIRCULARPLANE : this.isCylinder ? J.shapespecial.Draw.EnumDrawType.CYLINDER : J.shapespecial.Draw.EnumDrawType.LINE);
break;
default:
drawType = (this.thisMesh.connectedAtoms == null ? J.shapespecial.Draw.EnumDrawType.PLANE : J.shapespecial.Draw.EnumDrawType.ARROW);
}
}this.thisMesh.drawType = drawType;
this.thisMesh.drawVertexCount = nVertices;
if (nVertices == 0) return;
var nVertices0 = this.thisMesh.vc;
for (var i = 0; i < nVertices; i++) {
this.thisMesh.addV (this.ptList[i], false);
}
var npoints = (nVertices < 3 ? 3 : nVertices);
this.thisMesh.setPolygonCount (nPoly + 1);
this.thisMesh.pis[nPoly] =  Clazz.newIntArray (npoints, 0);
for (var i = 0; i < npoints; i++) {
this.thisMesh.pis[nPoly][i] = nVertices0 + (i < nVertices ? i : nVertices - 1);
}
return;
}, "~N");
Clazz.defineMethod (c$, "scale", 
 function (mesh, newScale) {
var dmesh = mesh;
if (newScale == 0 || dmesh.vc == 0 && dmesh.connectedAtoms == null || dmesh.scale == newScale) return;
var f = newScale / dmesh.scale;
dmesh.scale = newScale;
dmesh.isScaleSet = true;
if (dmesh.isRenderScalable ()) return;
var diff =  new JU.V3 ();
var iptlast = -1;
var ipt = 0;
try {
for (var i = dmesh.pc; --i >= 0; ) {
var center = (dmesh.isVector ? dmesh.vs[0] : dmesh.ptCenters == null ? dmesh.ptCenter : dmesh.ptCenters[i]);
if (center == null) return;
if (dmesh.pis[i] == null) continue;
iptlast = -1;
for (var iV = dmesh.pis[i].length; --iV >= 0; ) {
ipt = dmesh.pis[i][iV];
if (ipt == iptlast) continue;
iptlast = ipt;
diff.sub2 (dmesh.vs[ipt], center);
diff.scale (f);
diff.add (center);
dmesh.vs[ipt].setT (diff);
}
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.info ("Error executing DRAW command: " + e);
dmesh.isValid = false;
} else {
throw e;
}
}
}, "J.shape.Mesh,~N");
c$.setAxes = Clazz.defineMethod (c$, "setAxes", 
 function (m) {
m.axis = JU.V3.new3 (0, 0, 0);
m.axes =  new Array (m.pc > 0 ? m.pc : 1);
if (m.vs == null) return;
var n = 0;
for (var i = m.pc; --i >= 0; ) {
var p = m.pis[i];
m.axes[i] =  new JU.V3 ();
if (p == null || p.length == 0) {
} else if (m.drawVertexCount == 2 || m.drawVertexCount < 0 && m.drawVertexCounts[i] == 2) {
m.axes[i].sub2 (m.vs[p[0]], m.vs[p[1]]);
n++;
} else {
JU.Measure.calcNormalizedNormal (m.vs[p[0]], m.vs[p[1]], m.vs[p[2]], m.axes[i], m.vAB);
n++;
}m.axis.add (m.axes[i]);
}
if (n == 0) return;
m.axis.scale (1 / n);
}, "J.shapespecial.DrawMesh");
Clazz.overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
for (var i = 0; i < this.meshCount; i++) {
var m = this.dmeshes[i];
if (m == null) {
continue;
}m.visibilityFlags = (m.isValid && m.visible ? this.vf : 0);
if (m.modelIndex >= 0 && !bsModels.get (m.modelIndex) || m.modelFlags != null && !JU.BSUtil.haveCommon (bsModels, m.modelFlags)) {
m.visibilityFlags = 0;
} else if (m.modelFlags != null) {
m.bsMeshesVisible.clearAll ();
m.bsMeshesVisible.or (m.modelFlags);
m.bsMeshesVisible.and (bsModels);
}}
}, "JU.BS");
Clazz.overrideMethod (c$, "checkObjectClicked", 
function (x, y, action, bsVisible, drawPicking) {
var isPickingMode = (this.vwr.getPickingMode () == 4);
var isSpinMode = (this.vwr.getPickingMode () == 5);
if (!isPickingMode && !drawPicking && !isSpinMode || JU.C.isColixTranslucent (this.colix)) return null;
if (!this.findPickedObject (x, y, false, bsVisible)) return null;
var v = this.pickedMesh.vs[this.pickedMesh.pis[this.pickedModel][this.pickedVertex]];
var modelIndex = this.pickedMesh.modelIndex;
var bs = (this.pickedMesh).modelFlags;
if (modelIndex < 0 && JU.BSUtil.cardinalityOf (bs) == 1) modelIndex = bs.nextSetBit (0);
var map = null;
if (action != 0) map = this.getPickedPoint (v, modelIndex);
if (drawPicking && !isPickingMode) {
if (action != 0) this.setStatusPicked (-2, v, map);
return this.getPickedPoint (v, modelIndex);
}if (action == 0 || this.pickedMesh.pis[this.pickedModel][0] == this.pickedMesh.pis[this.pickedModel][1]) {
return map;
}var isClockwise = this.vwr.isBound (action, 42);
if (this.pickedVertex == 0) {
this.vwr.startSpinningAxis (this.pickedMesh.vs[this.pickedMesh.pis[this.pickedModel][1]], this.pickedMesh.vs[this.pickedMesh.pis[this.pickedModel][0]], isClockwise);
} else {
this.vwr.startSpinningAxis (this.pickedMesh.vs[this.pickedMesh.pis[this.pickedModel][0]], this.pickedMesh.vs[this.pickedMesh.pis[this.pickedModel][1]], isClockwise);
}return this.getPickedPoint (null, 0);
}, "~N,~N,~N,JU.BS,~B");
Clazz.overrideMethod (c$, "checkObjectHovered", 
function (x, y, bsVisible) {
if (!this.vwr.getDrawHover ()) return false;
if (JU.C.isColixTranslucent (this.colix)) return false;
if (!this.findPickedObject (x, y, false, bsVisible)) return false;
if (this.vwr.gdata.antialiasEnabled) {
x <<= 1;
y <<= 1;
}var s = (this.pickedMesh.title == null ? this.pickedMesh.thisID : this.pickedMesh.title[0]);
if (s.length > 1 && s.charAt (0) == '>') s = s.substring (1);
this.vwr.hoverOnPt (x, y, s, this.pickedMesh.thisID, this.pickedPt);
return true;
}, "~N,~N,JU.BS");
Clazz.overrideMethod (c$, "checkObjectDragged", 
function (prevX, prevY, x, y, dragAction, bsVisible) {
if (this.vwr.getPickingMode () != 4) return false;
var moveAll = this.vwr.isBound (dragAction, 8);
var movePoint = this.vwr.isBound (dragAction, 9);
if (!moveAll && !movePoint) return false;
if (prevX == -2147483648) return this.findPickedObject (x, y, true, bsVisible);
if (prevX == 2147483647) {
this.pickedMesh = null;
return false;
}if (this.pickedMesh == null) return false;
var dm = this.pickedMesh;
this.move2D (dm, dm.pis[this.pickedModel], this.pickedVertex, x, y, moveAll);
this.thisMesh = dm;
return true;
}, "~N,~N,~N,~N,~N,JU.BS");
Clazz.defineMethod (c$, "move2D", 
 function (mesh, vertexes, iVertex, x, y, moveAll) {
if (vertexes == null || vertexes.length == 0) return;
if (this.vwr.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
}var action = moveAll ? 8 : 9;
if (this.vwr.acm.userActionEnabled (action) && !this.vwr.acm.userAction (action,  Clazz.newArray (-1, [mesh.thisID,  Clazz.newIntArray (-1, [x, y, iVertex])]))) return;
var pt =  new JU.P3 ();
var ptVertex = vertexes[iVertex];
var coord = JU.P3.newP (mesh.altVertices == null ? mesh.vs[ptVertex] : mesh.altVertices[ptVertex]);
var newcoord =  new JU.P3 ();
var move =  new JU.V3 ();
this.vwr.tm.transformPt3f (coord, pt);
pt.x = x;
pt.y = y;
this.vwr.tm.unTransformPoint (pt, newcoord);
move.sub2 (newcoord, coord);
if (mesh.isDrawPolygon) iVertex = ptVertex;
var n = (!moveAll ? iVertex + 1 : mesh.isDrawPolygon ? mesh.vs.length : vertexes.length);
var bsMoved =  new JU.BS ();
for (var i = (moveAll ? 0 : iVertex); i < n; i++) if (moveAll || i == iVertex) {
var k = (mesh.isDrawPolygon ? i : vertexes[i]);
if (bsMoved.get (k)) continue;
bsMoved.set (k);
mesh.vs[k].add (move);
}
if (mesh.altVertices != null) mesh.recalcAltVertices = true;
mesh.setCenters ();
}, "J.shapespecial.DrawMesh,~A,~N,~N,~N,~B");
Clazz.defineMethod (c$, "findPickedObject", 
 function (x, y, isPicking, bsVisible) {
var dmin2 = 100;
if (this.vwr.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
dmin2 <<= 1;
}this.pickedModel = 0;
this.pickedVertex = 0;
this.pickedMesh = null;
for (var i = 0; i < this.meshCount; i++) {
var m = this.dmeshes[i];
if (m.visibilityFlags != 0) {
var mCount = (m.isDrawPolygon ? m.pc : m.modelFlags == null ? 1 : this.vwr.ms.mc);
for (var iModel = mCount; --iModel >= 0; ) {
if (m.modelFlags != null && !m.modelFlags.get (iModel) || m.pis == null || !m.isDrawPolygon && (iModel >= m.pis.length || m.pis[iModel] == null)) continue;
for (var iVertex = (m.isDrawPolygon ? 3 : m.pis[iModel].length); --iVertex >= 0; ) {
try {
var iv = m.pis[iModel][iVertex];
var pt = (m.altVertices == null ? m.vs[iv] : m.altVertices[iv]);
var d2 = this.coordinateInRange (x, y, pt, dmin2, this.ptXY);
if (d2 >= 0) {
this.pickedMesh = m;
dmin2 = d2;
this.pickedModel = iModel;
this.pickedVertex = iVertex;
this.pickedPt = pt;
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e);
} else {
throw e;
}
}
}
}
}}
return (this.pickedMesh != null);
}, "~N,~N,~B,JU.BS");
Clazz.defineMethod (c$, "getCommand", 
 function (mesh) {
if (mesh != null) return this.getCommand2 (mesh, mesh.modelIndex);
var sb =  new JU.SB ();
var key = (this.explicitID && this.previousMeshID != null && JU.PT.isWild (this.previousMeshID) ? this.previousMeshID : null);
var list = this.getMeshList (key, false);
for (var i = list.size (); --i >= 0; ) {
var m = list.get (i);
sb.append (this.getCommand2 (m, m.modelIndex));
}
return sb.toString ();
}, "J.shape.Mesh");
Clazz.defineMethod (c$, "getCommand2", 
 function (mesh, iModel) {
var dmesh = mesh;
if (!dmesh.isValid || dmesh.drawType === J.shapespecial.Draw.EnumDrawType.NONE && dmesh.lineData == null && dmesh.drawVertexCount == 0 && dmesh.drawVertexCounts == null) return "";
var str =  new JU.SB ();
var modelCount = this.vwr.ms.mc;
if (!dmesh.isFixed && iModel >= 0 && modelCount > 1) J.shape.Shape.appendCmd (str, "frame " + this.vwr.getModelNumberDotted (iModel));
str.append ("  draw ID ").append (JU.PT.esc (dmesh.thisID));
if (dmesh.isFixed) str.append (" fixed");
if (iModel < 0) iModel = 0;
if (dmesh.noHead) str.append (" noHead");
 else if (dmesh.isBarb) str.append (" barb");
if (dmesh.scale != 1 && dmesh.isScaleSet && (dmesh.haveXyPoints || dmesh.connectedAtoms != null || dmesh.drawType === J.shapespecial.Draw.EnumDrawType.CIRCLE || dmesh.drawType === J.shapespecial.Draw.EnumDrawType.ARC)) str.append (" scale ").appendF (dmesh.scale);
if (dmesh.width != 0) str.append (" diameter ").appendF ((dmesh.drawType === J.shapespecial.Draw.EnumDrawType.CYLINDER ? Math.abs (dmesh.width) : dmesh.drawType === J.shapespecial.Draw.EnumDrawType.CIRCULARPLANE ? Math.abs (dmesh.width * dmesh.scale) : dmesh.width));
 else if (dmesh.diameter > 0) str.append (" diameter ").appendI (dmesh.diameter);
if (dmesh.lineData != null) {
str.append ("  lineData [");
var n = dmesh.lineData.size ();
for (var j = 0; j < n; ) {
var pts = dmesh.lineData.get (j);
var s = JU.Escape.eP (pts[0]);
str.append (s.substring (1, s.length - 1));
str.append (",");
s = JU.Escape.eP (pts[1]);
str.append (s.substring (1, s.length - 1));
if (++j < n) str.append (", ");
}
str.append ("]");
} else {
var nVertices = dmesh.drawVertexCount > 0 || dmesh.drawVertexCounts == null ? dmesh.drawVertexCount : dmesh.drawVertexCounts[iModel >= 0 ? iModel : 0];
switch (dmesh.drawTypes == null || dmesh.drawTypes[iModel] == null ? dmesh.drawType : dmesh.drawTypes[iModel]) {
case J.shapespecial.Draw.EnumDrawType.NONE:
case J.shapespecial.Draw.EnumDrawType.MULTIPLE:
break;
case J.shapespecial.Draw.EnumDrawType.POLYGON:
str.append (" POLYGON ").appendI (nVertices);
break;
case J.shapespecial.Draw.EnumDrawType.PLANE:
if (nVertices == 4) str.append (" PLANE");
break;
case J.shapespecial.Draw.EnumDrawType.LINE_SEGMENT:
str.append (" LINE");
break;
case J.shapespecial.Draw.EnumDrawType.ARC:
str.append (dmesh.isVector ? " ARROW ARC" : " ARC");
break;
case J.shapespecial.Draw.EnumDrawType.ARROW:
str.append (dmesh.isVector ? " VECTOR" : " ARROW");
if (dmesh.connectedAtoms != null) str.append (" connect ").append (JU.Escape.eAI (dmesh.connectedAtoms));
break;
case J.shapespecial.Draw.EnumDrawType.CIRCLE:
str.append (" CIRCLE");
break;
case J.shapespecial.Draw.EnumDrawType.CURVE:
str.append (" CURVE");
break;
case J.shapespecial.Draw.EnumDrawType.CIRCULARPLANE:
case J.shapespecial.Draw.EnumDrawType.CYLINDER:
str.append (" CYLINDER");
break;
case J.shapespecial.Draw.EnumDrawType.POINT:
nVertices = 1;
break;
case J.shapespecial.Draw.EnumDrawType.LINE:
nVertices = 2;
break;
}
if (dmesh.modelIndex < 0 && !dmesh.isFixed) {
for (var i = 0; i < modelCount; i++) if (J.shapespecial.Draw.isPolygonDisplayable (dmesh, i)) {
if (nVertices == 0) nVertices = dmesh.drawVertexCounts[i];
str.append (" [ " + i);
var s = J.shapespecial.Draw.getVertexList (dmesh, i, nVertices);
if (s.indexOf ("NaN") >= 0) return "";
str.append (s);
str.append (" ] ");
}
} else if (dmesh.drawType === J.shapespecial.Draw.EnumDrawType.POLYGON) {
for (var i = 0; i < dmesh.vc; i++) str.append (" ").append (JU.Escape.eP (dmesh.vs[i]));

str.append (" ").appendI (dmesh.pc);
for (var i = 0; i < dmesh.pc; i++) if (dmesh.pis[i] == null) str.append (" [0 0 0 0]");
 else str.append (" ").append (JU.Escape.eAI (dmesh.pis[i]));

} else {
var s = J.shapespecial.Draw.getVertexList (dmesh, iModel, nVertices);
if (s.indexOf ("NaN") >= 0) return "";
str.append (s);
}}if (dmesh.mat4 != null) {
var v =  new JU.V3 ();
dmesh.mat4.getTranslation (v);
str.append (" offset ").append (JU.Escape.eP (v));
}if (dmesh.title != null) {
var s = "";
for (var i = 0; i < dmesh.title.length; i++) s += "|" + dmesh.title[i];

str.append (JU.PT.esc (s.substring (1)));
}str.append (";\n");
J.shape.Shape.appendCmd (str, dmesh.getState ("draw"));
J.shape.Shape.appendCmd (str, J.shape.Shape.getColorCommandUnk ("draw", dmesh.colix, this.translucentAllowed));
return str.toString ();
}, "J.shape.Mesh,~N");
c$.isPolygonDisplayable = Clazz.defineMethod (c$, "isPolygonDisplayable", 
function (mesh, i) {
return (i < mesh.pis.length && mesh.pis[i] != null && mesh.pis[i].length > 0);
}, "J.shape.Mesh,~N");
c$.getVertexList = Clazz.defineMethod (c$, "getVertexList", 
 function (mesh, iModel, nVertices) {
var str = "";
try {
if (iModel >= mesh.pis.length) iModel = 0;
var adjustPt = (mesh.isVector && mesh.drawType !== J.shapespecial.Draw.EnumDrawType.ARC);
for (var i = 0; i < nVertices; i++) {
var pt = mesh.vs[mesh.pis[iModel][i]];
if (pt.z == 3.4028235E38 || pt.z == -3.4028235E38) {
str += (i == 0 ? " " : " ,") + "[" + Clazz.floatToInt (pt.x) + " " + Clazz.floatToInt (pt.y) + (pt.z < 0 ? " %]" : "]");
} else if (adjustPt && i == 1) {
var pt1 = JU.P3.newP (pt);
pt1.sub (mesh.vs[mesh.pis[iModel][0]]);
str += " " + JU.Escape.eP (pt1);
} else {
str += " " + JU.Escape.eP (pt);
}}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Unexpected error in Draw.getVertexList");
} else {
throw e;
}
}
return str;
}, "J.shapespecial.DrawMesh,~N,~N");
Clazz.overrideMethod (c$, "getShapeDetail", 
function () {
var V =  new JU.Lst ();
for (var i = 0; i < this.meshCount; i++) {
var mesh = this.dmeshes[i];
if (mesh.vc == 0) continue;
var info =  new java.util.Hashtable ();
info.put ("visible", mesh.visible ? Boolean.TRUE : Boolean.FALSE);
info.put ("fixed", mesh.ptCenters == null ? Boolean.TRUE : Boolean.FALSE);
info.put ("ID", (mesh.thisID == null ? "<noid>" : mesh.thisID));
info.put ("drawType", mesh.drawType.$$name);
if (mesh.diameter > 0) info.put ("diameter", Integer.$valueOf (mesh.diameter));
if (mesh.width != 0) info.put ("width", Float.$valueOf (mesh.width));
info.put ("scale", Float.$valueOf (mesh.scale));
if (mesh.drawType === J.shapespecial.Draw.EnumDrawType.MULTIPLE) {
var m =  new JU.Lst ();
var modelCount = this.vwr.ms.mc;
for (var k = 0; k < modelCount; k++) {
if (mesh.ptCenters[k] == null) continue;
var mInfo =  new java.util.Hashtable ();
mInfo.put ("modelIndex", Integer.$valueOf (k));
mInfo.put ("command", this.getCommand2 (mesh, k));
mInfo.put ("center", mesh.ptCenters[k]);
var nPoints = mesh.drawVertexCounts[k];
mInfo.put ("vertexCount", Integer.$valueOf (nPoints));
if (nPoints > 1) mInfo.put ("axis", mesh.axes[k]);
var v =  new JU.Lst ();
for (var ipt = 0; ipt < nPoints; ipt++) v.addLast (mesh.vs[mesh.pis[k][ipt]]);

mInfo.put ("vertices", v);
if (mesh.drawTypes[k] === J.shapespecial.Draw.EnumDrawType.LINE) {
var d = mesh.vs[mesh.pis[k][0]].distance (mesh.vs[mesh.pis[k][1]]);
mInfo.put ("length_Ang", Float.$valueOf (d));
}m.addLast (mInfo);
}
info.put ("models", m);
} else {
info.put ("command", this.getCommand (mesh));
info.put ("center", mesh.ptCenter);
if (mesh.drawVertexCount > 1) info.put ("axis", mesh.axis);
var v =  new JU.Lst ();
for (var j = 0; j < mesh.vc; j++) v.addLast (mesh.vs[j]);

info.put ("vertices", v);
if (mesh.drawType === J.shapespecial.Draw.EnumDrawType.LINE) info.put ("length_Ang", Float.$valueOf (mesh.vs[0].distance (mesh.vs[1])));
}V.addLast (info);
}
return V;
});
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var s =  new JU.SB ();
s.append ("\n");
J.shape.Shape.appendCmd (s, this.myType + " delete");
for (var i = 0; i < this.meshCount; i++) {
var mesh = this.dmeshes[i];
if (mesh.vc == 0 && mesh.lineData == null) continue;
s.append (this.getCommand2 (mesh, mesh.modelIndex));
if (!mesh.visible) s.append (" " + this.myType + " ID " + JU.PT.esc (mesh.thisID) + " off;\n");
}
return s.toString ();
});
c$.randomPoint = Clazz.defineMethod (c$, "randomPoint", 
function () {
return JU.P3.new3 (Math.random (), Math.random (), Math.random ());
});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.id = 0;
this.$$name = null;
Clazz.instantialize (this, arguments);
}, J.shapespecial.Draw, "EnumDrawType", Enum);
Clazz.makeConstructor (c$, 
function (a, b) {
this.id = a;
this.$$name = b;
}, "~N,~S");
c$.getType = Clazz.defineMethod (c$, "getType", 
function (a) {
switch (a) {
case 1:
return J.shapespecial.Draw.EnumDrawType.POINT;
case 2:
return J.shapespecial.Draw.EnumDrawType.LINE;
case 4:
return J.shapespecial.Draw.EnumDrawType.PLANE;
default:
return J.shapespecial.Draw.EnumDrawType.NONE;
}
}, "~N");
Clazz.defineEnumConstant (c$, "MULTIPLE", 0, [-1, "multiple"]);
Clazz.defineEnumConstant (c$, "NONE", 1, [0, "none"]);
Clazz.defineEnumConstant (c$, "POINT", 2, [1, "point"]);
Clazz.defineEnumConstant (c$, "LINE", 3, [2, "line"]);
Clazz.defineEnumConstant (c$, "PLANE", 4, [4, "plane"]);
Clazz.defineEnumConstant (c$, "CYLINDER", 5, [14, "cylinder"]);
Clazz.defineEnumConstant (c$, "ARROW", 6, [15, "arrow"]);
Clazz.defineEnumConstant (c$, "CIRCLE", 7, [16, "circle"]);
Clazz.defineEnumConstant (c$, "CURVE", 8, [17, "curve"]);
Clazz.defineEnumConstant (c$, "CIRCULARPLANE", 9, [18, "circularPlane"]);
Clazz.defineEnumConstant (c$, "ARC", 10, [19, "arc"]);
Clazz.defineEnumConstant (c$, "LINE_SEGMENT", 11, [20, "lineSegment"]);
Clazz.defineEnumConstant (c$, "POLYGON", 12, [21, "polygon"]);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"PT_COORD", 1,
"PT_IDENTIFIER", 2,
"PT_BITSET", 3,
"PT_MODEL_INDEX", 4,
"PT_MODEL_BASED_POINTS", 5,
"MAX_OBJECT_CLICK_DISTANCE_SQUARED", 100);
});
