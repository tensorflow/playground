Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.Shape"], "J.shape.MeshCollection", ["java.util.Hashtable", "JU.AU", "$.Lst", "$.P3", "$.PT", "$.SB", "JS.T", "J.shape.Mesh", "JU.C", "$.Escape", "$.Logger", "JV.StateManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.meshCount = 0;
this.meshes = null;
this.currentMesh = null;
this.isFixed = false;
this.nUnnamed = 0;
this.colix = 0;
this.explicitID = false;
this.previousMeshID = null;
this.linkedMesh = null;
this.modelIndex = 0;
this.displayWithinDistance2 = 0;
this.isDisplayWithinNot = false;
this.displayWithinPoints = null;
this.bsDisplay = null;
this.title = null;
this.pickedMesh = null;
this.pickedModel = 0;
this.pickedVertex = 0;
this.pickedPt = null;
this.connections = null;
this.htObjects = null;
this.color = 0;
Clazz.instantialize (this, arguments);
}, J.shape, "MeshCollection", J.shape.Shape);
Clazz.prepareFields (c$, function () {
this.meshes =  new Array (4);
});
Clazz.defineMethod (c$, "setMesh", 
 function (thisID) {
this.linkedMesh = null;
if (thisID == null || JU.PT.isWild (thisID)) {
if (thisID != null) this.previousMeshID = thisID;
this.currentMesh = null;
return null;
}this.currentMesh = this.getMesh (thisID);
if (this.currentMesh == null) {
this.allocMesh (thisID, null);
} else if (thisID.equals ("+PREVIOUS_MESH+")) {
this.linkedMesh = this.currentMesh.linkedMesh;
}if (this.currentMesh.thisID == null) {
if (this.nUnnamed == 0 || this.getMesh (this.myType + this.nUnnamed) != null) this.nUnnamed++;
this.currentMesh.thisID = this.myType + this.nUnnamed;
if (this.htObjects != null) this.htObjects.put (this.currentMesh.thisID.toUpperCase (), this.currentMesh);
}this.previousMeshID = this.currentMesh.thisID;
return this.currentMesh;
}, "~S");
Clazz.defineMethod (c$, "allocMesh", 
function (thisID, m) {
var index = this.meshCount++;
this.meshes = JU.AU.ensureLength (this.meshes, this.meshCount * 2);
this.currentMesh = this.meshes[index] = (m == null ?  new J.shape.Mesh ().mesh1 (this.vwr, thisID, this.colix, index) : m);
this.currentMesh.color = this.color;
this.currentMesh.index = index;
if (thisID != null && this.htObjects != null) this.htObjects.put (thisID.toUpperCase (), this.currentMesh);
this.previousMeshID = null;
}, "~S,J.shape.Mesh");
Clazz.defineMethod (c$, "merge", 
function (mc) {
for (var i = 0; i < mc.meshCount; i++) {
if (mc.meshes[i] != null) {
var m = mc.meshes[i];
var m0 = this.getMesh (m.thisID);
if (m0 == null) {
this.allocMesh (m.thisID, m);
} else {
this.meshes[m0.index] = m;
m.index = m0.index;
}}}
this.previousMeshID = null;
this.currentMesh = null;
}, "J.shape.MeshCollection");
Clazz.overrideMethod (c$, "initShape", 
function () {
this.colix = 5;
this.color = 0xFFFFFFFF;
});
Clazz.defineMethod (c$, "setPropMC", 
function (propertyName, value, bs) {
if ("init" === propertyName) {
this.title = null;
return;
}if ("link" === propertyName) {
if (this.meshCount >= 2 && this.currentMesh != null) this.currentMesh.linkedMesh = this.meshes[this.meshCount - 2];
return;
}if ("lattice" === propertyName) {
if (this.currentMesh != null) this.currentMesh.lattice = value;
return;
}if ("symops" === propertyName) {
if (this.currentMesh != null) {
this.currentMesh.symops = value;
if (this.currentMesh.symops == null) return;
var n = this.currentMesh.symops.length;
this.currentMesh.symopColixes =  Clazz.newShortArray (n, 0);
for (var i = n; --i >= 0; ) this.currentMesh.symopColixes[i] = JU.C.getColix (this.vwr.cm.ce.getArgbMinMax (i + 1, 1, n));

}return;
}if ("variables" === propertyName) {
if (this.currentMesh != null && this.currentMesh.scriptCommand != null && !this.currentMesh.scriptCommand.startsWith ("{")) this.currentMesh.scriptCommand = "{\n" + JV.StateManager.getVariableList (value, 0, false, false) + "\n" + this.currentMesh.scriptCommand;
return;
}if ("thisID" === propertyName) {
var id = value;
this.setMesh (id);
this.checkExplicit (id);
return;
}if ("title" === propertyName) {
if (value == null) {
this.title = null;
} else if (Clazz.instanceOf (value, String)) {
var nLine = 1;
var lines = value;
for (var i = lines.length; --i >= 0; ) if (lines.charAt (i) == '|') nLine++;

this.title =  new Array (nLine);
nLine = 0;
var i0 = -1;
for (var i = 0; i < lines.length; i++) if (lines.charAt (i) == '|') {
this.title[nLine++] = lines.substring (i0 + 1, i);
i0 = i;
}
this.title[nLine] = lines.substring (i0 + 1);
} else {
this.title = value;
}return;
}if ("delete" === propertyName) {
this.deleteMesh ();
return;
}if ("reset" === propertyName) {
var thisID = value;
if (this.setMesh (thisID) == null) return;
this.setMesh (thisID);
return;
}if ("color" === propertyName) {
if (value == null) return;
this.colix = JU.C.getColixO (value);
this.color = (value).intValue ();
if (this.currentMesh != null) {
this.currentMesh.color = this.color;
}this.setTokenProperty (1765808134, false, false);
return;
}if ("translucency" === propertyName) {
this.setTokenProperty (603979967, ((value).equals ("translucent")), false);
return;
}if ("hidden" === propertyName) {
value = Integer.$valueOf ((value).booleanValue () ? 1073742334 : 1073742335);
propertyName = "token";
}if ("token" === propertyName) {
var tok = (value).intValue ();
var tok2 = 0;
var test = true;
switch (tok) {
case 1610625028:
case 1073742335:
case 1073741958:
case 1073741861:
case 1073741964:
case 1112150019:
case 1073741938:
case 1073741862:
case 1073742182:
case 1073741960:
break;
case 1073742334:
test = false;
tok = 1073742335;
break;
case 1073741898:
tok2 = 1073742018;
break;
case 1073742039:
test = false;
tok = 1073741898;
tok2 = 1073742018;
break;
case 1073742018:
tok2 = 1073741898;
break;
case 1073742052:
test = false;
tok = 1073742018;
tok2 = 1073741898;
break;
case 1073742042:
test = false;
tok = 1112150019;
break;
case 1073742046:
test = false;
tok = 1073741938;
break;
case 1073742057:
test = false;
tok = 1073741862;
break;
case 1073742060:
test = false;
tok = 1073742182;
break;
case 1073742058:
test = false;
tok = 1073741960;
break;
default:
JU.Logger.error ("PROBLEM IN MESHCOLLECTION: token? " + JS.T.nameOf (tok));
}
this.setTokenProperty (tok, test, false);
if (tok2 != 0) this.setTokenProperty (tok2, test, true);
return;
}this.setPropS (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "checkExplicit", 
function (id) {
if (this.explicitID) return;
this.explicitID = (id != null && !id.equals ("+PREVIOUS_MESH+"));
if (this.explicitID) this.previousMeshID = id;
}, "~S");
Clazz.defineMethod (c$, "setTokenProperty", 
function (tokProp, bProp, testD) {
if (this.currentMesh == null) {
var key = (this.explicitID && JU.PT.isWild (this.previousMeshID) ? this.previousMeshID : null);
var list = this.getMeshList (key, false);
for (var i = list.size (); --i >= 0; ) this.setMeshTokenProperty (list.get (i), tokProp, bProp, testD);

} else {
this.setMeshTokenProperty (this.currentMesh, tokProp, bProp, testD);
if (this.linkedMesh != null) this.setMeshTokenProperty (this.linkedMesh, tokProp, bProp, testD);
}}, "~N,~B,~B");
Clazz.defineMethod (c$, "setMeshTokenProperty", 
 function (m, tokProp, bProp, testD) {
if (testD && (!m.havePlanarContours || m.drawTriangles == m.showContourLines)) return;
switch (tokProp) {
case 1610625028:
m.bsDisplay = this.bsDisplay;
if (this.bsDisplay == null && this.displayWithinPoints != null) m.setShowWithin (this.displayWithinPoints, this.displayWithinDistance2, this.isDisplayWithinNot);
return;
case 1073742335:
m.visible = bProp;
return;
case 1765808134:
m.colix = this.colix;
return;
case 603979967:
m.setTranslucent (bProp, this.translucentLevel);
if (bProp && m.bsSlabGhost != null) m.resetSlab ();
return;
default:
m.setTokenProperty (tokProp, bProp);
}
}, "J.shape.Mesh,~N,~B,~B");
Clazz.defineMethod (c$, "getPropDataMC", 
function (property, data) {
if (property === "keys") {
var keys = (Clazz.instanceOf (data[1], JU.Lst) ? data[1] :  new JU.Lst ());
data[1] = keys;
keys.addLast ("count");
keys.addLast ("getCenter");
}if (property === "getNames") {
var map = data[0];
var withDollar = (data[1]).booleanValue ();
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i] != null && this.meshes[i].vc != 0) map.put ((withDollar ? "$" : "") + this.meshes[i].thisID, JS.T.tokenOr);

return true;
}if (property === "getVertices") {
var m = this.getMesh (data[0]);
if (m == null) return false;
data[1] = m.vs;
data[2] = m.getVisibleVertexBitSet ();
return true;
}if (property === "checkID") {
var key = data[0];
var list = this.getMeshList (key, true);
if (list.size () == 0) return false;
data[1] = list.get (0).thisID;
return true;
}if (property === "index") {
var m = this.getMesh (data[0]);
data[1] = Integer.$valueOf (m == null ? -1 : m.index);
return true;
}if (property === "getCenter") {
var id = data[0];
var index = (data[1]).intValue ();
var m;
if ((m = this.getMesh (id)) == null || m.vs == null) return false;
if (index == 2147483647) data[2] = JU.P3.new3 (m.index + 1, this.meshCount, m.vc);
 else data[2] = m.vs[m.getVertexIndexFromNumber (index)];
return true;
}return this.getPropShape (property, data);
}, "~S,~A");
Clazz.defineMethod (c$, "getMeshList", 
function (key, justOne) {
var list =  new JU.Lst ();
if (key != null) key = (key.length == 0 ? null : key.toUpperCase ());
var isWild = JU.PT.isWild (key);
var id;
for (var i = this.meshCount; --i >= 0; ) if (key == null || (id = this.meshes[i].thisID.toUpperCase ()).equals (key) || isWild && JU.PT.isMatch (id, key, true, true)) {
list.addLast (this.meshes[i]);
if (justOne) break;
}
return list;
}, "~S,~B");
Clazz.defineMethod (c$, "getPropMC", 
function (property, index) {
var m = this.currentMesh;
if (index >= 0 && (index >= this.meshCount || (m = this.meshes[index]) == null)) return null;
if (property === "count") {
var n = 0;
for (var i = 0; i < this.meshCount; i++) if ((m = this.meshes[i]) != null && m.vc > 0) n++;

return Integer.$valueOf (n);
}if (property === "bsVertices") {
if (m == null) return null;
var lst =  new JU.Lst ();
lst.addLast (m.vs);
lst.addLast (m.getVisibleVBS ());
return lst;
}if (property === "ID") return (m == null ? null : m.thisID);
if (property.startsWith ("list")) {
this.clean ();
var sb =  new JU.SB ();
var k = 0;
var isNamed = property.length > 5;
var id = (property.equals ("list") ? null : isNamed ? property.substring (5) : m == null ? null : m.thisID);
for (var i = 0; i < this.meshCount; i++) {
m = this.meshes[i];
if (id != null && !id.equalsIgnoreCase (m.thisID)) continue;
sb.appendI ((++k)).append (" id:" + m.thisID).append ("; model:" + this.vwr.getModelNumberDotted (m.modelIndex)).append ("; vertices:" + m.vc).append ("; polygons:" + m.pc).append ("; visible:" + m.visible);
var range = this.getProperty ("dataRange", 0);
if (range != null) sb.append ("; dataRange:").append (JU.Escape.eAF (range));
if (m.title != null) {
var s = "";
for (var j = 0; j < m.title.length; j++) s += (j == 0 ? "; title:" : " | ") + m.title[j];

if (s.length > 10000) s = s.substring (0, 10000) + "...";
sb.append (s);
}sb.appendC ('\n');
if (isNamed) {
var info = this.getProperty ("jvxlFileInfo", 0);
if (info != null) sb.append (info).appendC ('\n');
}}
return sb.toString ();
}if (property === "vertices") return this.getVertices (m);
if (property === "info") return (m == null ? null : m.getInfo (false));
if (property === "data") return (m == null ? null : m.getInfo (true));
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "getVertices", 
 function (mesh) {
if (mesh == null) return null;
return mesh.vs;
}, "J.shape.Mesh");
Clazz.defineMethod (c$, "clean", 
function () {
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i] == null || this.meshes[i].vc == 0) this.deleteMeshI (i);

});
Clazz.defineMethod (c$, "deleteMesh", 
 function () {
if (this.explicitID && this.currentMesh != null) this.deleteMeshI (this.currentMesh.index);
 else this.deleteMeshKey (this.explicitID && this.previousMeshID != null && JU.PT.isWild (this.previousMeshID) ? this.previousMeshID : null);
this.currentMesh = null;
});
Clazz.defineMethod (c$, "deleteMeshKey", 
function (key) {
if (key == null || key.length == 0) {
for (var i = this.meshCount; --i >= 0; ) this.meshes[i] = null;

this.meshCount = 0;
this.nUnnamed = 0;
if (this.htObjects != null) this.htObjects.clear ();
} else {
var list = this.getMeshList (key, false);
var n = list.size ();
for (var i = 0; i < n; i++) this.deleteMeshI (list.get (i).index);

}}, "~S");
Clazz.defineMethod (c$, "deleteMeshI", 
function (i) {
if (this.htObjects != null) this.htObjects.remove (this.meshes[i].thisID.toUpperCase ());
for (var j = i + 1; j < this.meshCount; ++j) this.meshes[--this.meshes[j].index] = this.meshes[j];

this.meshes[--this.meshCount] = null;
}, "~N");
Clazz.defineMethod (c$, "resetObjects", 
function () {
this.htObjects.clear ();
for (var i = 0; i < this.meshCount; i++) {
var m = this.meshes[i];
m.index = i;
this.htObjects.put (m.thisID.toUpperCase (), m);
}
});
Clazz.defineMethod (c$, "getMesh", 
function (thisID) {
var i = this.getIndexFromName (thisID);
return (i < 0 ? null : this.meshes[i]);
}, "~S");
Clazz.overrideMethod (c$, "getIndexFromName", 
function (id) {
if ("+PREVIOUS_MESH+".equals (id)) return (this.previousMeshID == null ? this.meshCount - 1 : this.getIndexFromName (this.previousMeshID));
if (JU.PT.isWild (id)) {
var list = this.getMeshList (id, true);
return (list.size () == 0 ? -1 : list.get (0).index);
}if (this.htObjects != null) {
var m = this.htObjects.get (id.toUpperCase ());
return (m == null ? -1 : m.index);
}for (var i = this.meshCount; --i >= 0; ) {
if (this.meshes[i] != null && this.meshes[i].vc != 0 && id.equalsIgnoreCase (this.meshes[i].thisID)) return i;
}
return -1;
}, "~S");
Clazz.overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
var bsDeleted = this.vwr.slm.bsDeleted;
for (var i = this.meshCount; --i >= 0; ) {
var mesh = this.meshes[i];
mesh.visibilityFlags = (mesh.visible && mesh.isValid && (mesh.modelIndex < 0 || bsModels.get (mesh.modelIndex) && (mesh.atomIndex < 0 || !this.ms.isAtomHidden (mesh.atomIndex) && !(bsDeleted != null && bsDeleted.get (mesh.atomIndex)))) ? this.vf : 0);
}
}, "JU.BS");
Clazz.defineMethod (c$, "setStatusPicked", 
function (flag, v, map) {
this.vwr.setStatusAtomPicked (flag, "[\"" + this.myType + "\"," + JU.PT.esc (this.pickedMesh.thisID) + "," + +this.pickedModel + "," + this.pickedVertex + "," + v.x + "," + v.y + "," + v.z + "," + (this.pickedMesh.title == null ? "\"\"" : JU.PT.esc (this.pickedMesh.title[0])) + "]", map, false);
}, "~N,JU.T3,java.util.Map");
Clazz.defineMethod (c$, "getPickedPoint", 
function (v, modelIndex) {
var map =  new java.util.Hashtable ();
if (v != null) {
map.put ("pt", v);
map.put ("modelIndex", Integer.$valueOf (modelIndex));
map.put ("model", this.vwr.getModelNumberDotted (modelIndex));
map.put ("id", this.pickedMesh.thisID);
map.put ("vertex", Integer.$valueOf (this.pickedVertex + 1));
map.put ("type", this.myType);
}return map;
}, "JU.T3,~N");
Clazz.defineStatics (c$,
"PREVIOUS_MESH_ID", "+PREVIOUS_MESH+");
});
