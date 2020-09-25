Clazz.declarePackage ("J.render");
Clazz.load (["J.render.ShapeRenderer", "JU.BS", "$.P3", "$.P3i"], "J.render.MeshRenderer", ["JU.AU", "JU.C", "$.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mesh = null;
this.vertices = null;
this.normixes = null;
this.screens = null;
this.p3Screens = null;
this.transformedVectors = null;
this.vertexCount = 0;
this.imageFontScaling = 0;
this.scalePixelsPerMicron = 0;
this.diameter = 0;
this.width = 0;
this.isTranslucent = false;
this.frontOnly = false;
this.isShell = false;
this.antialias = false;
this.haveBsDisplay = false;
this.selectedPolyOnly = false;
this.isGhostPass = false;
this.thePlane = null;
this.latticeOffset = null;
this.pt1f = null;
this.pt2f = null;
this.pt1i = null;
this.pt2i = null;
this.pt3i = null;
this.exportPass = 0;
this.needTranslucent = false;
this.doRender = false;
this.volumeRender = false;
this.bsPolygons = null;
this.isTranslucentInherit = false;
this.renderLow = false;
this.meshSlabValue = 100;
this.showTriangles = false;
this.forceShowTriangles = false;
this.bsPolygonsToExport = null;
Clazz.instantialize (this, arguments);
}, J.render, "MeshRenderer", J.render.ShapeRenderer);
Clazz.prepareFields (c$, function () {
this.latticeOffset =  new JU.P3 ();
this.pt1f =  new JU.P3 ();
this.pt2f =  new JU.P3 ();
this.pt1i =  new JU.P3i ();
this.pt2i =  new JU.P3i ();
this.pt3i =  new JU.P3i ();
this.bsPolygonsToExport =  new JU.BS ();
});
Clazz.defineMethod (c$, "renderMesh2", 
function (mesh) {
this.mesh = mesh;
if (!this.setVariables ()) return false;
if (!this.doRender) return mesh.title != null;
this.latticeOffset.set (0, 0, 0);
if (mesh.modelIndex < 0 || mesh.lattice == null && mesh.symops == null) {
for (var i = this.vertexCount; --i >= 0; ) if (this.vertices[i] != null) this.tm.transformPtScr (this.vertices[i], this.screens[i]);

for (var i = this.vertexCount; --i >= 0; ) if (this.vertices[i] != null) this.tm.transformPtScrT3 (this.vertices[i], this.p3Screens[i]);

this.render2 (this.isExport);
} else {
var vTemp =  new JU.P3 ();
var unitcell = mesh.getUnitCell ();
if (unitcell != null) {
if (mesh.symops != null) {
if (mesh.symopNormixes == null) mesh.symopNormixes = JU.AU.newShort2 (mesh.symops.length);
var verticesTemp = null;
var max = mesh.symops.length;
var c = mesh.colix;
for (var j = max; --j >= 0; ) {
var m = mesh.symops[j];
if (m == null) continue;
if (mesh.colorType == 1296041986) mesh.colix = mesh.symopColixes[j];
var normals = mesh.symopNormixes[j];
var needNormals = (normals == null);
verticesTemp = (needNormals ?  new Array (this.vertexCount) : null);
for (var i = this.vertexCount; --i >= 0; ) {
vTemp.setT (this.vertices[i]);
unitcell.toFractional (vTemp, true);
m.rotTrans (vTemp);
unitcell.toCartesian (vTemp, true);
this.tm.transformPtScr (vTemp, this.screens[i]);
if (needNormals) {
verticesTemp[i] = vTemp;
vTemp =  new JU.P3 ();
}}
if (needNormals) this.normixes = mesh.symopNormixes[j] = mesh.setNormixes (mesh.getNormals (verticesTemp, null));
 else this.normixes = mesh.normixes = mesh.symopNormixes[j];
this.render2 (this.isExport);
}
mesh.colix = c;
} else {
var minXYZ =  new JU.P3i ();
var maxXYZ = JU.P3i.new3 (Clazz.floatToInt (mesh.lattice.x), Clazz.floatToInt (mesh.lattice.y), Clazz.floatToInt (mesh.lattice.z));
JU.SimpleUnitCell.setMinMaxLatticeParameters (Clazz.floatToInt (unitcell.getUnitCellInfoType (6)), minXYZ, maxXYZ, 0);
for (var tx = minXYZ.x; tx < maxXYZ.x; tx++) for (var ty = minXYZ.y; ty < maxXYZ.y; ty++) for (var tz = minXYZ.z; tz < maxXYZ.z; tz++) {
this.latticeOffset.set (tx, ty, tz);
unitcell.toCartesian (this.latticeOffset, false);
for (var i = this.vertexCount; --i >= 0; ) {
vTemp.add2 (this.vertices[i], this.latticeOffset);
this.tm.transformPtScr (vTemp, this.screens[i]);
}
this.render2 (this.isExport);
}


}}}if (this.screens != null) this.vwr.freeTempScreens (this.screens);
if (this.p3Screens != null) this.vwr.freeTempPoints (this.p3Screens);
return true;
}, "J.shape.Mesh");
Clazz.defineMethod (c$, "setVariables", 
 function () {
if (this.mesh.visibilityFlags == 0) return false;
this.forceShowTriangles = this.vwr.getBoolean (603979964);
this.showTriangles = this.forceShowTriangles || this.mesh.showTriangles;
if (this.mesh.bsSlabGhost != null) this.g3d.setC (this.mesh.slabColix);
if (this.mesh.colorsExplicit) this.g3d.setC (2047);
this.isGhostPass = (this.mesh.bsSlabGhost != null && (this.isExport ? this.exportPass == 2 : this.vwr.gdata.isPass2));
this.isTranslucentInherit = (this.isGhostPass && JU.C.getColixTranslucent3 (this.mesh.slabColix, false, 0) == 1);
this.isTranslucent = this.isGhostPass || JU.C.renderPass2 (this.mesh.colix);
if (this.isTranslucent || this.volumeRender || this.mesh.bsSlabGhost != null) this.needTranslucent = true;
this.doRender = (this.setColix (this.mesh.colix) || this.mesh.showContourLines);
if (!this.doRender || this.isGhostPass && !(this.doRender = this.g3d.setC (this.mesh.slabColix))) {
this.vertices = this.mesh.vs;
if (this.needTranslucent) this.g3d.setC (JU.C.getColixTranslucent3 (4, true, 0.5));
return true;
}if (this.mesh.isModelConnected) this.mesh.mat4 = this.ms.am[this.mesh.modelIndex].mat4;
this.vertices = (this.mesh.scale3d == 0 && this.mesh.mat4 == null ? this.mesh.vs : this.mesh.getOffsetVertices (this.thePlane));
if (this.mesh.lineData == null) {
if ((this.vertexCount = this.mesh.vc) == 0) return false;
this.normixes = this.mesh.normixes;
if (this.normixes == null && this.mesh.pc >= 0 || this.vertices == null) return false;
this.haveBsDisplay = (this.mesh.bsDisplay != null);
this.selectedPolyOnly = (this.isGhostPass || this.mesh.bsSlabDisplay != null);
this.bsPolygons = (this.isGhostPass ? this.mesh.bsSlabGhost : this.selectedPolyOnly ? this.mesh.bsSlabDisplay : null);
this.renderLow = (!this.isExport && !this.vwr.checkMotionRendering (1073742018));
var allowFrontOnly = (!this.mesh.isTwoSided && !this.selectedPolyOnly && (this.meshSlabValue == -2147483648 || this.meshSlabValue >= 100));
this.frontOnly = this.renderLow || this.mesh.frontOnly && !this.tm.slabEnabled && allowFrontOnly;
this.isShell = this.mesh.isShell && allowFrontOnly;
this.screens = this.vwr.allocTempScreens (this.vertexCount);
this.p3Screens = this.vwr.allocTempPoints (this.vertexCount);
if (this.frontOnly || this.isShell) this.transformedVectors = this.vwr.gdata.getTransformedVertexVectors ();
if (this.transformedVectors == null) this.frontOnly = this.isShell = false;
}return true;
});
Clazz.defineMethod (c$, "setColix", 
function (colix) {
if (this.isGhostPass) return true;
if (this.volumeRender && !this.isTranslucent) colix = JU.C.getColixTranslucent3 (colix, true, 0.8);
this.colix = colix;
if (JU.C.isColixLastAvailable (colix)) this.vwr.gdata.setColor (this.mesh.color);
return this.g3d.setC (colix);
}, "~N");
Clazz.defineMethod (c$, "isPolygonDisplayable", 
function (i) {
return true;
}, "~N");
Clazz.defineMethod (c$, "render2", 
function (generateSet) {
this.render2b (generateSet);
}, "~B");
Clazz.defineMethod (c$, "render2b", 
function (generateSet) {
if (!this.g3d.setC (this.isGhostPass ? this.mesh.slabColix : this.colix)) return;
if (this.renderLow || this.mesh.showPoints || this.mesh.pc <= 0) this.renderPoints ();
if (!this.renderLow && (this.isGhostPass ? this.mesh.slabMeshType == 1073742018 : this.mesh.drawTriangles)) this.renderTriangles (false, this.showTriangles, false);
if (!this.renderLow && this.mesh.pc > 0 && (this.isGhostPass ? this.mesh.slabMeshType == 1073741938 : this.mesh.fillTriangles)) this.renderTriangles (true, this.showTriangles, generateSet);
}, "~B");
Clazz.defineMethod (c$, "renderPoints", 
function () {
if (!this.mesh.isDrawPolygon || this.mesh.pc < 0) {
for (var i = this.vertexCount; --i >= 0; ) if (!this.frontOnly || this.normixes == null || this.isVisibleNormix (this.normixes[i])) this.drawPoint (i, false);

return;
}var polygonIndexes = this.mesh.pis;
var bsPoints = JU.BS.newN (this.mesh.vc);
if (this.haveBsDisplay) {
bsPoints.setBits (0, this.mesh.vc);
bsPoints.andNot (this.mesh.bsDisplay);
}for (var i = this.mesh.pc; --i >= 0; ) {
if (!this.isPolygonDisplayable (i)) continue;
var p = polygonIndexes[i];
if (this.frontOnly && !this.isVisibleNormix (this.normixes[i])) continue;
for (var j = p.length - 1; --j >= 0; ) {
var pt = p[j];
if (bsPoints.get (pt)) continue;
bsPoints.set (pt);
this.drawPoint (pt, true);
}
}
});
Clazz.defineMethod (c$, "drawPoint", 
 function (pt, forTriangle) {
if (this.renderLow && forTriangle) {
var s = this.screens[pt];
this.g3d.drawPixel (s.x, s.y, s.z);
} else if (this.mesh.pc >= 0) {
this.drawMeshSphere (this.screens[pt]);
} else {
this.drawEdge (pt, pt, false, this.vertices[pt], this.vertices[pt], this.screens[pt], null);
}}, "~N,~B");
Clazz.defineMethod (c$, "drawMeshSphere", 
 function (pt) {
this.g3d.fillSphereI (4, pt);
}, "JU.P3i");
Clazz.defineMethod (c$, "renderTriangles", 
function (fill, iShowTriangles, generateSet) {
this.g3d.addRenderer (1073742182);
var polygons = this.mesh.pis;
this.colix = (this.isGhostPass ? this.mesh.slabColix : this.mesh.colix);
if (this.isTranslucentInherit) this.colix = JU.C.copyColixTranslucency (this.mesh.slabColix, this.mesh.colix);
this.g3d.setC (this.colix);
if (generateSet) {
if (this.frontOnly && fill) this.frontOnly = false;
this.bsPolygonsToExport.clearAll ();
}for (var i = this.mesh.pc; --i >= 0; ) {
if (!this.isPolygonDisplayable (i)) continue;
var polygon = polygons[i];
var iA = polygon[0];
var iB = polygon[1];
var iC = polygon[2];
if (iShowTriangles) this.setColix ((Math.round (Math.random () * 10) + 5));
if (this.haveBsDisplay && (!this.mesh.bsDisplay.get (iA) || !this.mesh.bsDisplay.get (iB) || !this.mesh.bsDisplay.get (iC))) continue;
if (iB == iC) {
this.drawEdge (iA, iB, fill, this.vertices[iA], this.vertices[iB], this.screens[iA], this.screens[iB]);
continue;
}var check;
if (this.mesh.isDrawPolygon) {
var normix = this.normixes[i];
if (this.frontOnly && !this.isVisibleNormix (normix)) continue;
if (fill) {
this.g3d.fillTriangle3CNBits (this.p3Screens[iA], this.colix, normix, this.p3Screens[iB], this.colix, normix, this.p3Screens[iC], this.colix, normix, true);
continue;
}check = polygon[3];
if (iShowTriangles) check = 7;
if ((check & 1) == 1) this.drawEdge (iA, iB, true, this.vertices[iA], this.vertices[iB], this.screens[iA], this.screens[iB]);
if ((check & 2) == 2) this.drawEdge (iB, iC, true, this.vertices[iB], this.vertices[iC], this.screens[iB], this.screens[iC]);
if ((check & 4) == 4) this.drawEdge (iA, iC, true, this.vertices[iA], this.vertices[iC], this.screens[iA], this.screens[iC]);
continue;
}var nA = this.normixes[iA];
var nB = this.normixes[iB];
var nC = this.normixes[iC];
check = (this.frontOnly || this.isShell ? this.checkFront (nA, nB, nC) : 7);
if (fill && check != 7) continue;
switch (polygon.length) {
case 3:
if (fill) {
if (generateSet) {
this.bsPolygonsToExport.set (i);
continue;
}this.g3d.fillTriangle3CNBits (this.p3Screens[iA], this.colix, nA, this.p3Screens[iB], this.colix, nB, this.p3Screens[iC], this.colix, nC, false);
continue;
}this.drawTriangleBits (this.p3Screens[iA], this.colix, this.p3Screens[iB], this.colix, this.p3Screens[iC], this.colix, check, 1);
continue;
case 4:
var iD = polygon[3];
var nD = this.normixes[iD];
if (this.frontOnly && (check != 7 || !this.isVisibleNormix (nD))) continue;
if (fill) {
if (generateSet) {
this.bsPolygonsToExport.set (i);
continue;
}this.g3d.fillTriangle3CNBits (this.p3Screens[iA], this.colix, nA, this.p3Screens[iB], this.colix, nB, this.p3Screens[iC], this.colix, nC, false);
this.g3d.fillTriangle3CNBits (this.p3Screens[iA], this.colix, nA, this.p3Screens[iC], this.colix, nC, this.p3Screens[iD], this.colix, nD, false);
continue;
}this.vwr.gdata.drawQuadrilateralBits (this.g3d, this.colix, this.p3Screens[iA], this.p3Screens[iB], this.p3Screens[iC], this.p3Screens[iD]);
}
}
if (generateSet) this.exportSurface (this.colix);
}, "~B,~B,~B");
Clazz.defineMethod (c$, "isVisibleNormix", 
function (normix) {
return (normix < 0 || this.transformedVectors[normix].z >= 0);
}, "~N");
Clazz.defineMethod (c$, "drawTriangleBits", 
 function (screenA, colixA, screenB, colixB, screenC, colixC, check, diam) {
if (!this.antialias && diam == 1) {
this.vwr.gdata.drawTriangleBits (this.g3d, screenA, colixA, screenB, colixB, screenC, colixC, check);
return;
}if (this.antialias) diam <<= 1;
if ((check & 1) == 1) this.g3d.fillCylinderBits2 (colixA, colixB, 1, diam, screenA, screenB);
if ((check & 2) == 2) this.g3d.fillCylinderBits2 (colixB, colixC, 1, diam, screenB, screenC);
if ((check & 4) == 4) this.g3d.fillCylinderBits2 (colixA, colixC, 1, diam, screenA, screenC);
}, "JU.P3,~N,JU.P3,~N,JU.P3,~N,~N,~N");
Clazz.defineMethod (c$, "drawTriangle", 
function (screenA, colixA, screenB, colixB, screenC, colixC, check, diam) {
if (!this.antialias && diam == 1) {
this.g3d.drawTriangle3C (screenA, colixA, screenB, colixB, screenC, colixC, check);
return;
}if (this.antialias) diam <<= 1;
if ((check & 1) == 1) this.g3d.fillCylinderXYZ (colixA, colixB, 1, diam, screenA.x, screenA.y, screenA.z, screenB.x, screenB.y, screenB.z);
if ((check & 2) == 2) this.g3d.fillCylinderXYZ (colixB, colixC, 1, diam, screenB.x, screenB.y, screenB.z, screenC.x, screenC.y, screenC.z);
if ((check & 4) == 4) this.g3d.fillCylinderXYZ (colixA, colixC, 1, diam, screenA.x, screenA.y, screenA.z, screenC.x, screenC.y, screenC.z);
}, "JU.P3i,~N,JU.P3i,~N,JU.P3i,~N,~N,~N");
Clazz.defineMethod (c$, "checkFront", 
function (nA, nB, nC) {
var check = 7;
if (this.transformedVectors[nA].z < 0) check ^= 1;
if (this.transformedVectors[nB].z < 0) check ^= 2;
if (this.transformedVectors[nC].z < 0) check ^= 4;
return check;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "drawEdge", 
function (iA, iB, fill, vA, vB, sA, sB) {
var endCap = (iA != iB && !fill ? 0 : this.width < 0 || this.width == -0.0 || iA != iB && this.isTranslucent ? 2 : 3);
if (this.width == 0) {
if (this.diameter == 0) this.diameter = (this.mesh.diameter > 0 ? this.mesh.diameter : iA == iB ? 7 : 3);
if (this.exportType == 1) {
this.pt1f.ave (vA, vB);
this.tm.transformPtScr (this.pt1f, this.pt1i);
}if (iA == iB) {
this.pt1f.set (sA.x, sA.y, sA.z);
this.g3d.fillSphereBits (this.diameter, this.pt1f);
return;
}} else {
this.pt1f.ave (vA, vB);
this.tm.transformPtScr (this.pt1f, this.pt1i);
var mad = Clazz.doubleToInt (Math.floor (Math.abs (this.width) * 1000));
this.diameter = Clazz.floatToInt (this.vwr.tm.scaleToScreen (this.pt1i.z, mad));
}if (this.diameter == 0) this.diameter = 1;
this.tm.transformPt3f (vA, this.pt1f);
this.tm.transformPt3f (vB, this.pt2f);
this.g3d.fillCylinderBits (endCap, this.diameter, this.pt1f, this.pt2f);
}, "~N,~N,~B,JU.T3,JU.T3,JU.P3i,JU.P3i");
Clazz.defineMethod (c$, "exportSurface", 
function (colix) {
this.mesh.normals = this.mesh.getNormals (this.vertices, null);
this.mesh.bsPolygons = this.bsPolygonsToExport;
this.mesh.offset = this.latticeOffset;
this.g3d.drawSurface (this.mesh, colix);
this.mesh.normals = null;
this.mesh.bsPolygons = null;
}, "~N");
});
