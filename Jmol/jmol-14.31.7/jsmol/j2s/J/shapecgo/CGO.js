Clazz.declarePackage ("J.shapecgo");
Clazz.load (["J.shape.MeshCollection"], "J.shapecgo.CGO", ["java.lang.Boolean", "java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "$.SB", "J.shapecgo.CGOMesh"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cmeshes = null;
this.cgoMesh = null;
this.useColix = false;
this.newScale = 0;
this.indicatedModelIndex = -2147483648;
Clazz.instantialize (this, arguments);
}, J.shapecgo, "CGO", J.shape.MeshCollection);
Clazz.prepareFields (c$, function () {
this.cmeshes =  new Array (4);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.shapecgo.CGO, []);
this.myType = "CGO";
this.htObjects =  new java.util.Hashtable ();
});
Clazz.defineMethod (c$, "initCGO", 
 function () {
this.indicatedModelIndex = -2147483648;
});
Clazz.overrideMethod (c$, "allocMesh", 
function (thisID, m) {
var index = this.meshCount++;
this.meshes = this.cmeshes = JU.AU.ensureLength (this.cmeshes, this.meshCount * 2);
this.currentMesh = this.cgoMesh = this.cmeshes[index] = (m == null ?  new J.shapecgo.CGOMesh (this.vwr, thisID, this.colix, index) : m);
this.currentMesh.color = this.color;
this.currentMesh.index = index;
this.currentMesh.useColix = this.useColix;
this.currentMesh.modelIndex = this.indicatedModelIndex;
if (thisID != null && thisID !== "+PREVIOUS_MESH+" && this.htObjects != null) this.htObjects.put (thisID.toUpperCase (), this.currentMesh);
}, "~S,J.shape.Mesh");
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("init" === propertyName) {
this.initCGO ();
this.setPropertySuper ("init", value, bs);
return;
}if ("setCGO" === propertyName) {
var list = value;
this.setProperty ("init", null, null);
var n = list.size () - 1;
this.setProperty ("thisID", list.get (n), null);
propertyName = "set";
this.setProperty ("set", value, null);
return;
}if ("modelIndex" === propertyName) {
this.indicatedModelIndex = Math.max ((value).intValue (), -1);
return;
}if ("set" === propertyName) {
if (this.cgoMesh == null) {
this.allocMesh (null, null);
this.cgoMesh.colix = this.colix;
this.cgoMesh.color = this.color;
this.cgoMesh.useColix = this.useColix;
}this.cgoMesh.modelIndex = (this.indicatedModelIndex == -2147483648 ? this.vwr.am.cmi : this.indicatedModelIndex);
this.cgoMesh.isValid = this.setCGO (value);
if (this.cgoMesh.isValid) {
this.scale (this.cgoMesh, this.newScale);
this.cgoMesh.initialize (1073741964, null, null);
this.cgoMesh.title = this.title;
this.cgoMesh.visible = true;
}this.clean ();
return;
}if (propertyName === "deleteModelAtoms") {
this.deleteModels (((value)[2])[0]);
return;
}this.setPropertySuper (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "deleteModels", 
function (modelIndex) {
for (var i = this.meshCount; --i >= 0; ) {
var m = this.meshes[i];
if (m == null) continue;
var deleteMesh = (m.modelIndex == modelIndex);
if (deleteMesh) {
this.meshCount--;
this.deleteMeshElement (i);
} else if (this.meshes[i].modelIndex > modelIndex) {
this.meshes[i].modelIndex--;
}}
this.resetObjects ();
}, "~N");
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
if (property === "command") return this.getCommand (this.cgoMesh);
return this.getPropMC (property, index);
}, "~S,~N");
Clazz.overrideMethod (c$, "getPropertyData", 
function (property, data) {
if (property === "data") return J.shapecgo.CGOMesh.getData (data);
return this.getPropDataMC (property, data);
}, "~S,~A");
Clazz.defineMethod (c$, "deleteMeshElement", 
 function (i) {
if (this.meshes[i] === this.currentMesh) this.currentMesh = this.cgoMesh = null;
this.meshes = this.cmeshes = JU.AU.deleteElements (this.meshes, i, 1);
}, "~N");
Clazz.defineMethod (c$, "setPropertySuper", 
 function (propertyName, value, bs) {
this.currentMesh = this.cgoMesh;
this.setPropMC (propertyName, value, bs);
this.cgoMesh = this.currentMesh;
}, "~S,~O,JU.BS");
Clazz.overrideMethod (c$, "clean", 
function () {
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i] == null || this.cmeshes[i].cmds == null || this.cmeshes[i].cmds.size () == 0) this.deleteMeshI (i);

});
Clazz.defineMethod (c$, "setCGO", 
 function (data) {
if (this.cgoMesh == null) this.allocMesh (null, null);
this.cgoMesh.clear ("cgo");
return this.cgoMesh.set (data);
}, "JU.Lst");
Clazz.defineMethod (c$, "scale", 
 function (mesh, newScale) {
}, "J.shape.Mesh,~N");
Clazz.overrideMethod (c$, "getShapeDetail", 
function () {
var V =  new JU.Lst ();
for (var i = 0; i < this.meshCount; i++) {
var mesh = this.cmeshes[i];
var info =  new java.util.Hashtable ();
info.put ("visible", mesh.visible ? Boolean.TRUE : Boolean.FALSE);
info.put ("ID", (mesh.thisID == null ? "<noid>" : mesh.thisID));
info.put ("command", this.getCommand (mesh));
V.addLast (info);
}
return V;
});
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var sb =  new JU.SB ();
var modelCount = this.vwr.ms.mc;
for (var i = 0; i < this.meshCount; i++) {
var mesh = this.cmeshes[i];
if (mesh == null || mesh.cmds == null || mesh.modelIndex >= modelCount) continue;
if (sb.length () == 0) {
sb.append ("\n");
J.shape.Shape.appendCmd (sb, this.myType + " delete");
}sb.append (this.getCommand2 (mesh, modelCount));
if (!mesh.visible) sb.append (" " + this.myType + " ID " + JU.PT.esc (mesh.thisID) + " off;\n");
}
return sb.toString ();
});
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
 function (mesh, modelCount) {
var cmesh = mesh;
var str =  new JU.SB ();
var iModel = mesh.modelIndex;
str.append ("  CGO ID ").append (JU.PT.esc (mesh.thisID));
if (iModel >= -1 && modelCount > 1) str.append (" modelIndex " + iModel);
str.append (" [");
var n = cmesh.cmds.size ();
for (var i = 0; i < n; i++) str.append (" " + cmesh.cmds.get (i));

str.append (" ];\n");
J.shape.Shape.appendCmd (str, cmesh.getState ("cgo"));
if (cmesh.useColix) J.shape.Shape.appendCmd (str, J.shape.Shape.getColorCommandUnk ("cgo", cmesh.colix, this.translucentAllowed));
return str.toString ();
}, "J.shape.Mesh,~N");
Clazz.overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
for (var i = 0; i < this.meshCount; i++) {
var m = this.cmeshes[i];
if (m != null) m.visibilityFlags = (m.isValid && m.visible && (m.modelIndex < 0 || bsModels.get (m.modelIndex)) ? this.vf : 0);
}
}, "JU.BS");
});
