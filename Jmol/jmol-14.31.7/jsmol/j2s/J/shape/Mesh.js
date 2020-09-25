Clazz.declarePackage ("J.shape");
Clazz.load (["JU.MeshSurface"], "J.shape.Mesh", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.M3", "$.M4", "$.Measure", "$.P3", "$.PT", "$.SB", "$.V3", "JS.T", "JU.BSUtil", "$.C", "$.Escape", "$.Normix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.title = null;
this.meshColix = 0;
this.normixes = null;
this.lineData = null;
this.thisID = null;
this.isValid = true;
this.scriptCommand = null;
this.colorCommand = null;
this.lattice = null;
this.symops = null;
this.symopNormixes = null;
this.visible = true;
this.lighting = 1073741958;
this.colorType = 0;
this.haveXyPoints = false;
this.diameter = 0;
this.width = 0;
this.ptCenter = null;
this.linkedMesh = null;
this.vertexColorMap = null;
this.vAB = null;
this.vTemp = null;
this.color = 0;
this.useColix = true;
this.unitCell = null;
this.scale3d = 0;
this.index = 0;
this.atomIndex = -1;
this.modelIndex = -1;
this.visibilityFlags = 0;
this.insideOut = false;
this.checkByteCount = 0;
this.normalsInverted = false;
this.showContourLines = false;
this.showPoints = false;
this.drawTriangles = false;
this.fillTriangles = true;
this.showTriangles = false;
this.frontOnly = false;
this.isShell = false;
this.isTwoSided = true;
this.havePlanarContours = false;
this.bsTemp = null;
this.colorDensity = false;
this.cappingObject = null;
this.slabbingObject = null;
this.volumeRenderPointSize = 0.15;
this.connectedAtoms = null;
this.isModelConnected = false;
this.recalcAltVertices = false;
this.symopColixes = null;
Clazz.instantialize (this, arguments);
}, J.shape, "Mesh", JU.MeshSurface);
Clazz.defineMethod (c$, "setVisibilityFlags", 
function (n) {
this.visibilityFlags = n;
}, "~N");
Clazz.defineMethod (c$, "mesh1", 
function (vwr, thisID, colix, index) {
if ("+PREVIOUS_MESH+".equals (thisID)) thisID = null;
this.vwr = vwr;
this.thisID = thisID;
this.colix = colix;
this.index = index;
this.ptCenter =  new JU.P3 ();
this.vAB =  new JU.V3 ();
this.vTemp =  new JU.V3 ();
return this;
}, "JV.Viewer,~S,~N,~N");
Clazz.defineMethod (c$, "clear", 
function (meshType) {
this.clearMesh (meshType);
}, "~S");
Clazz.defineMethod (c$, "clearMesh", 
function (meshType) {
this.altVertices = null;
this.bsDisplay = null;
this.bsSlabDisplay = null;
this.bsSlabGhost = null;
this.symops = null;
this.symopColixes = null;
this.cappingObject = null;
this.colix = 23;
this.colorDensity = false;
this.connectedAtoms = null;
this.diameter = 0;
this.drawTriangles = false;
this.fillTriangles = true;
this.frontOnly = false;
this.isShell = false;
this.havePlanarContours = false;
this.haveXyPoints = false;
this.isModelConnected = false;
this.isDrawPolygon = false;
this.isTwoSided = false;
this.lattice = null;
this.mat4 = null;
this.normixes = null;
this.pis = null;
this.scale3d = 0;
this.showContourLines = false;
this.showPoints = false;
this.showTriangles = false;
this.slabbingObject = null;
this.slabOptions = null;
this.oabc = null;
this.symopNormixes = null;
this.title = null;
this.unitCell = null;
this.useColix = true;
this.vertexCount0 = this.polygonCount0 = this.vc = this.pc = 0;
this.vs = null;
this.vertexSource = null;
this.volumeRenderPointSize = 0.15;
this.meshType = meshType;
}, "~S");
Clazz.defineMethod (c$, "initialize", 
function (lighting, vertices, plane) {
if (vertices == null) vertices = this.vs;
var normals = this.getNormals (vertices, plane);
this.setNormixes (normals);
this.lighting = 1073741958;
if (this.insideOut) this.invertNormixes ();
if (this.isShell && !this.isTwoSided) this.invertNormixes ();
this.setLighting (lighting);
}, "~N,~A,JU.P4");
Clazz.defineMethod (c$, "setNormixes", 
function (normals) {
if (normals == null) return (this.normixes = null);
this.normixes =  Clazz.newShortArray (this.normixCount, 0);
if (this.bsTemp == null) this.bsTemp = JU.Normix.newVertexBitSet ();
if (this.haveXyPoints) for (var i = this.normixCount; --i >= 0; ) this.normixes[i] = 9999;

 else for (var i = this.normixCount; --i >= 0; ) this.normixes[i] = JU.Normix.getNormixV (normals[i], this.bsTemp);

return this.normixes;
}, "~A");
Clazz.defineMethod (c$, "getNormals", 
function (vertices, plane) {
this.normixCount = (this.isDrawPolygon ? this.pc : this.vc);
if (this.normixCount < 0) return null;
var normals =  new Array (this.normixCount);
for (var i = this.normixCount; --i >= 0; ) normals[i] =  new JU.V3 ();

if (plane == null) {
this.sumVertexNormals (vertices, normals);
} else {
var normal = JU.V3.new3 (plane.x, plane.y, plane.z);
for (var i = this.normixCount; --i >= 0; ) normals[i] = normal;

}if (!this.isDrawPolygon) for (var i = this.normixCount; --i >= 0; ) {
normals[i].normalize ();
}
return normals;
}, "~A,JU.P4");
Clazz.defineMethod (c$, "setLighting", 
function (lighting) {
this.isTwoSided = (lighting == 1073741964);
if (lighting == this.lighting) return;
this.flipLighting (this.lighting);
this.flipLighting (this.lighting = lighting);
}, "~N");
Clazz.defineMethod (c$, "flipLighting", 
 function (lighting) {
if (lighting == 1073741964) for (var i = this.normixCount; --i >= 0; ) this.normixes[i] = ~this.normixes[i];

 else if ((lighting == 1073741958) == this.insideOut) this.invertNormixes ();
}, "~N");
Clazz.defineMethod (c$, "invertNormixes", 
 function () {
JU.Normix.setInverseNormixes ();
this.normalsInverted = !this.normalsInverted;
for (var i = this.normixCount; --i >= 0; ) this.normixes[i] = JU.Normix.getInverseNormix (this.normixes[i]);

});
Clazz.defineMethod (c$, "setTranslucent", 
function (isTranslucent, iLevel) {
this.colix = JU.C.getColixTranslucent3 (this.colix, isTranslucent, iLevel);
}, "~B,~N");
Clazz.defineMethod (c$, "sumVertexNormals", 
function (vertices, normals) {
J.shape.Mesh.sumVertexNormals2 (this, vertices, normals);
}, "~A,~A");
c$.sumVertexNormals2 = Clazz.defineMethod (c$, "sumVertexNormals2", 
function (m, vertices, normals) {
var adjustment = m.checkByteCount;
var min = m.getMinDistance2ForVertexGrouping ();
for (var i = m.pc; --i >= 0; ) {
try {
var face = m.setABC (i);
if (face == null) continue;
var vA = vertices[face[0]];
var vB = vertices[face[1]];
var vC = vertices[face[2]];
if (vA.distanceSquared (vB) < min || vB.distanceSquared (vC) < min || vA.distanceSquared (vC) < min) continue;
JU.Measure.calcNormalizedNormal (vA, vB, vC, m.vTemp, m.vAB);
if (m.isDrawPolygon) {
normals[i].setT (m.vTemp);
} else {
var l = m.vTemp.length ();
if (l > 0.9 && l < 1.1) for (var j = face.length - adjustment; --j >= 0; ) {
var k = face[j];
normals[k].add (m.vTemp);
}
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e);
} else {
throw e;
}
}
}
}, "J.shape.Mesh,~A,~A");
Clazz.defineMethod (c$, "getMinDistance2ForVertexGrouping", 
function () {
return 1e-8;
});
Clazz.defineMethod (c$, "getState", 
function (type) {
var s =  new JU.SB ();
if (this.isValid) {
s.append (type);
if (!type.equals ("mo") && !type.equals ("nbo")) s.append (" ID ").append (JU.PT.esc (this.thisID));
if (this.lattice != null) s.append (" lattice ").append (JU.Escape.eP (this.lattice));
if (this.meshColix != 0) s.append (" color mesh ").append (JU.C.getHexCode (this.meshColix));
s.append (this.getRendering ());
if (!this.visible) s.append (" hidden");
if (this.bsDisplay != null) {
s.append (";\n  ").append (type);
if (!type.equals ("mo") && !type.equals ("nbo")) s.append (" ID ").append (JU.PT.esc (this.thisID));
s.append (" display " + JU.Escape.eBS (this.bsDisplay));
}}return s.toString ();
}, "~S");
Clazz.defineMethod (c$, "getRendering", 
function () {
var s =  new JU.SB ();
s.append (this.fillTriangles ? " fill" : " noFill");
s.append (this.drawTriangles ? " mesh" : " noMesh");
s.append (this.showPoints ? " dots" : " noDots");
s.append (this.frontOnly ? " frontOnly" : " notFrontOnly");
if (this.showContourLines) s.append (" contourlines");
if (this.showTriangles) s.append (" triangles");
s.append (" ").append (JS.T.nameOf (this.lighting));
if (this.isShell && !this.isTwoSided) s.append (" backshell");
return s.toString ();
});
Clazz.defineMethod (c$, "getOffsetVertices", 
function (thePlane) {
if (this.altVertices != null && !this.recalcAltVertices) return this.altVertices;
this.altVertices =  new Array (this.vc);
for (var i = 0; i < this.vc; i++) this.altVertices[i] = JU.P3.newP (this.vs[i]);

var normal = null;
var val = 0;
if (this.scale3d != 0 && this.vvs != null && thePlane != null) {
normal = JU.V3.new3 (thePlane.x, thePlane.y, thePlane.z);
normal.normalize ();
normal.scale (this.scale3d);
if (this.mat4 != null) {
var m3 =  new JU.M3 ();
this.mat4.getRotationScale (m3);
m3.rotate (normal);
}}for (var i = 0; i < this.vc; i++) {
if (this.vvs != null && Float.isNaN (val = this.vvs[i])) continue;
var pt = this.altVertices[i];
if (this.mat4 != null) this.mat4.rotTrans (pt);
if (normal != null && val != 0) pt.scaleAdd2 (val, normal, pt);
}
this.initialize (this.lighting, this.altVertices, null);
this.recalcAltVertices = false;
return this.altVertices;
}, "JU.P4");
Clazz.defineMethod (c$, "setShowWithin", 
function (showWithinPoints, showWithinDistance2, isWithinNot) {
if (showWithinPoints.size () == 0) {
this.bsDisplay = (isWithinNot ? JU.BSUtil.newBitSet2 (0, this.vc) : null);
return;
}this.bsDisplay =  new JU.BS ();
for (var i = 0; i < this.vc; i++) if (J.shape.Mesh.checkWithin (this.vs[i], showWithinPoints, showWithinDistance2, isWithinNot)) this.bsDisplay.set (i);

}, "JU.Lst,~N,~B");
c$.checkWithin = Clazz.defineMethod (c$, "checkWithin", 
function (pti, withinPoints, withinDistance2, isWithinNot) {
if (withinPoints.size () != 0) for (var i = withinPoints.size (); --i >= 0; ) if (pti.distanceSquared (withinPoints.get (i)) <= withinDistance2) return !isWithinNot;

return isWithinNot;
}, "JU.T3,JU.Lst,~N,~B");
Clazz.defineMethod (c$, "getVertexIndexFromNumber", 
function (vertexIndex) {
if (--vertexIndex < 0) vertexIndex = this.vc + vertexIndex;
return (this.vc <= vertexIndex ? this.vc - 1 : vertexIndex < 0 ? 0 : vertexIndex);
}, "~N");
Clazz.defineMethod (c$, "getVisibleVertexBitSet", 
function () {
return this.getVisibleVBS ();
});
Clazz.defineMethod (c$, "getVisibleVBS", 
function () {
var bs =  new JU.BS ();
if (this.pc == 0 && this.bsSlabDisplay != null) JU.BSUtil.copy2 (this.bsSlabDisplay, bs);
 else for (var i = this.pc; --i >= 0; ) if (this.bsSlabDisplay == null || this.bsSlabDisplay.get (i)) {
var vertexIndexes = this.pis[i];
if (vertexIndexes == null) continue;
bs.set (vertexIndexes[0]);
bs.set (vertexIndexes[1]);
bs.set (vertexIndexes[2]);
}
return bs;
});
Clazz.defineMethod (c$, "setTokenProperty", 
function (tokProp, bProp) {
switch (tokProp) {
case 1073742058:
case 1073741960:
this.frontOnly = (tokProp == 1073741960 ? bProp : !bProp);
return;
case 1073742057:
case 1073741862:
if (!this.isTwoSided && this.isShell != (tokProp == 1073741862 ? bProp : !bProp)) {
this.isShell = !this.isShell;
this.invertNormixes ();
}return;
case 1073741958:
case 1073741861:
case 1073741964:
this.setLighting (tokProp);
return;
case 1073742042:
case 1112150019:
this.showPoints = (tokProp == 1112150019 ? bProp : !bProp);
return;
case 1073742052:
case 1073742018:
this.drawTriangles = (tokProp == 1073742018 ? bProp : !bProp);
return;
case 1073742046:
case 1073741938:
this.fillTriangles = (tokProp == 1073741938 ? bProp : !bProp);
return;
case 1073742060:
case 1073742182:
this.showTriangles = (tokProp == 1073742182 ? bProp : !bProp);
return;
case 1073742039:
case 1073741898:
this.showContourLines = (tokProp == 1073741898 ? bProp : !bProp);
return;
}
}, "~N,~B");
Clazz.defineMethod (c$, "getInfo", 
function (isAll) {
var info =  new java.util.Hashtable ();
info.put ("id", this.thisID);
info.put ("vertexCount", Integer.$valueOf (this.vc));
info.put ("polygonCount", Integer.$valueOf (this.pc));
info.put ("haveQuads", Boolean.$valueOf (this.haveQuads));
info.put ("haveValues", Boolean.$valueOf (this.vvs != null));
if (isAll) {
if (this.vc > 0) {
info.put ("vertices", JU.AU.arrayCopyPt (this.vs, this.vc));
if (this.bsSlabDisplay != null) info.put ("bsVertices", this.getVisibleVBS ());
}if (this.vvs != null) info.put ("vertexValues", JU.AU.arrayCopyF (this.vvs, this.vc));
if (this.pc > 0) {
info.put ("polygons", JU.AU.arrayCopyII (this.pis, this.pc));
if (this.bsSlabDisplay != null) info.put ("bsPolygons", this.bsSlabDisplay);
}}return info;
}, "~B");
Clazz.defineMethod (c$, "getBoundingBox", 
function () {
return null;
});
Clazz.defineMethod (c$, "getUnitCell", 
function () {
return null;
});
Clazz.defineMethod (c$, "rotateTranslate", 
function (q, offset, isAbsolute) {
if (q == null && offset == null) {
this.mat4 = null;
return;
}var m3 =  new JU.M3 ();
var v =  new JU.V3 ();
if (this.mat4 == null) this.mat4 = JU.M4.newM4 (null);
this.mat4.getRotationScale (m3);
this.mat4.getTranslation (v);
if (q == null) {
if (isAbsolute) v.setT (offset);
 else v.add (offset);
} else {
m3.mul (q.getMatrix ());
}this.mat4 = JU.M4.newMV (m3, v);
this.recalcAltVertices = true;
}, "JU.Quat,JU.T3,~B");
Clazz.defineMethod (c$, "getNormalsTemp", 
function () {
return (this.normalsTemp == null ? (this.normalsTemp = this.getNormals (this.vs, null)) : this.normalsTemp);
});
Clazz.defineStatics (c$,
"PREVIOUS_MESH_ID", "+PREVIOUS_MESH+");
});
