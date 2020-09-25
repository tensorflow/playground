Clazz.declarePackage ("J.rendersurface");
Clazz.load (["J.render.MeshRenderer"], "J.rendersurface.IsosurfaceRenderer", ["java.lang.Boolean", "$.Float", "JU.V3", "JU.C", "$.Normix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.iHideBackground = false;
this.isBicolorMap = false;
this.backgroundColix = 0;
this.nError = 0;
this.vertexValues = null;
this.imesh = null;
this.isosurface = null;
this.isNavigationMode = false;
this.iShowNormals = false;
this.showNumbers = false;
this.showKey = null;
this.hasColorRange = false;
this.meshScale = -1;
this.mySlabValue = 0;
this.globalSlabValue = 0;
Clazz.instantialize (this, arguments);
}, J.rendersurface, "IsosurfaceRenderer", J.render.MeshRenderer);
Clazz.overrideMethod (c$, "render", 
function () {
return this.renderIso ();
});
Clazz.defineMethod (c$, "renderIso", 
function () {
this.setGlobals ();
for (var i = this.isosurface.meshCount; --i >= 0; ) {
this.mesh = this.imesh = this.isosurface.meshes[i];
if (this.imesh.connectedAtoms != null && !this.vwr.ms.at[this.imesh.connectedAtoms[0]].checkVisible ()) continue;
this.hasColorRange = false;
if (this.renderMeshSlab ()) {
this.renderInfo ();
if (this.isExport && this.isGhostPass) {
this.exportPass = 1;
this.renderMeshSlab ();
this.exportPass = 2;
}}}
return this.needTranslucent;
});
Clazz.defineMethod (c$, "setGlobals", 
 function () {
this.needTranslucent = false;
this.antialias = this.g3d.isAntialiased ();
this.iShowNormals = this.vwr.getBoolean (603979965);
this.showNumbers = this.vwr.getBoolean (603979964);
this.isosurface = this.shape;
this.exportPass = (this.isExport ? 2 : 0);
this.isNavigationMode = this.vwr.getBoolean (603979889);
this.showKey = (this.vwr.getBoolean (603979867) ? Boolean.TRUE : null);
this.isosurface.keyXy = null;
this.meshScale = -1;
this.globalSlabValue = this.vwr.gdata.slab;
this.mySlabValue = (this.isNavigationMode ? Clazz.floatToInt (this.tm.getNavigationOffset ().z) : 2147483647);
});
Clazz.defineMethod (c$, "renderInfo", 
function () {
if (this.isExport || !this.hasColorRange || this.imesh.colorEncoder == null || Boolean.TRUE !== this.showKey) return;
this.showKey = Boolean.FALSE;
var colors = null;
var colixes = null;
var vContours = null;
var n = 0;
var type = 0;
if (this.imesh.showContourLines) {
vContours = this.imesh.getContours ();
if (vContours == null) {
colixes = this.imesh.jvxlData.contourColixes;
if (colixes == null) return;
n = colixes.length;
} else {
n = vContours.length;
type = 1;
}} else {
colors = this.imesh.colorEncoder.getColorSchemeArray (this.imesh.colorEncoder.currentPalette);
n = (colors == null ? 0 : colors.length);
type = 2;
}if (n < 2) return;
var factor = (this.antialias ? 2 : 1);
var height = this.vwr.getScreenHeight () * factor;
var dy = Clazz.doubleToInt (Clazz.doubleToInt (height / 2) / (n - 1));
var y = Clazz.doubleToInt (height / 4) * 3 - dy;
var x = 10 * factor;
var dx = 20 * factor;
this.isosurface.keyXy =  Clazz.newIntArray (-1, [Clazz.doubleToInt (x / factor), 0, Clazz.doubleToInt ((x + dx) / factor), Clazz.doubleToInt ((y + dy) / factor), Clazz.doubleToInt (dy / factor)]);
for (var i = 0; i < n; i++, y -= dy) {
switch (type) {
case 0:
if (!this.g3d.setC (colixes[i])) return;
break;
case 1:
if (!this.g3d.setC ((vContours[i].get (3))[0])) return;
break;
case 2:
this.vwr.gdata.setColor (colors[i]);
break;
}
this.g3d.fillTextRect (x, y, 5, -2147483648, dx, dy);
}
this.isosurface.keyXy[1] = Clazz.doubleToInt ((y + dy) / factor);
});
Clazz.defineMethod (c$, "renderMeshSlab", 
 function () {
this.volumeRender = (this.imesh.jvxlData.colorDensity && this.imesh.jvxlData.allowVolumeRender);
var thisSlabValue = this.mySlabValue;
this.frontOnly = this.mesh.frontOnly || this.shapeID == 26;
this.isShell = this.mesh.isShell && this.shapeID != 26;
if (!this.isNavigationMode) {
this.meshSlabValue = this.imesh.jvxlData.slabValue;
if (this.meshSlabValue != -2147483648 && this.imesh.jvxlData.isSlabbable) {
var points = this.imesh.jvxlData.boundingBox;
var z0 = 3.4028235E38;
var z1 = 1.4E-45;
for (var i = points.length; --i >= 0; ) {
this.pt2f.setT (points[i]);
this.tm.transformPt3f (this.pt2f, this.pt2f);
if (this.pt2f.z < z0) z0 = this.pt2f.z;
if (this.pt2f.z > z1) z1 = this.pt2f.z;
}
thisSlabValue = Math.round (z0 + (z1 - z0) * (100 - this.meshSlabValue) / 100);
this.frontOnly = new Boolean (this.frontOnly & (this.meshSlabValue >= 100)).valueOf ();
this.isShell = new Boolean (this.isShell & (this.meshSlabValue >= 100)).valueOf ();
}}var tCover = this.vwr.gdata.translucentCoverOnly;
this.vwr.gdata.translucentCoverOnly = (this.frontOnly || !this.vwr.getBoolean (603979967));
this.thePlane = this.imesh.jvxlData.jvxlPlane;
this.vertexValues = this.mesh.vvs;
var isOK;
if (thisSlabValue != 2147483647 && this.imesh.jvxlData.isSlabbable) {
this.g3d.setSlab (thisSlabValue);
isOK = this.renderMesh2 (this.mesh);
this.g3d.setSlab (this.globalSlabValue);
} else {
isOK = this.renderMesh2 (this.mesh);
}this.vwr.gdata.translucentCoverOnly = tCover;
return isOK;
});
Clazz.overrideMethod (c$, "render2", 
function (isExport) {
if (this.volumeRender) {
this.renderPoints ();
return;
}switch (this.imesh.dataType) {
case 70:
this.renderLonePair (false);
return;
case 71:
this.renderLonePair (true);
return;
}
this.isBicolorMap = this.imesh.jvxlData.isBicolorMap;
this.render2b (isExport);
if (!this.g3d.setC (4)) return;
if (this.imesh.showContourLines) this.renderContourLines ();
}, "~B");
Clazz.defineMethod (c$, "renderLonePair", 
 function (isRadical) {
this.pt2f.setT (this.vertices[1]);
this.tm.transformPt3f (this.pt2f, this.pt2f);
var r = Clazz.floatToInt (this.vwr.tm.scaleToScreen (Clazz.floatToInt (this.pt2f.z), 100));
if (r < 1) r = 1;
if (!isRadical) {
var v1 =  new JU.V3 ();
var v2 =  new JU.V3 ();
this.pt1f.setT (this.vertices[0]);
this.tm.transformPt3f (this.pt1f, this.pt1f);
v1.sub2 (this.pt2f, this.pt1f);
v2.set (v1.x, v1.y, v1.z + 1);
v2.cross (v2, v1);
v2.normalize ();
var f = this.vwr.tm.scaleToScreen (Clazz.floatToInt (this.pt1f.z), 100);
v2.scale (f);
this.pt1f.add2 (this.pt2f, v2);
this.pt2f.sub (v2);
this.screens[0].set (Math.round (this.pt1f.x), Math.round (this.pt1f.y), Math.round (this.pt1f.z));
this.g3d.fillSphereI (r, this.screens[0]);
}this.screens[1].set (Math.round (this.pt2f.x), Math.round (this.pt2f.y), Math.round (this.pt2f.z));
this.g3d.fillSphereI (r, this.screens[1]);
}, "~B");
Clazz.defineMethod (c$, "renderContourLines", 
 function () {
var vContours = this.imesh.getContours ();
if (vContours == null) {
if (this.imesh.jvxlData.contourValues != null) this.hasColorRange = true;
return;
}this.hasColorRange = (this.mesh.meshColix == 0);
for (var i = vContours.length; --i >= 0; ) {
var v = vContours[i];
if (v.size () < 6) continue;
this.colix = (this.mesh.meshColix == 0 ? (v.get (3))[0] : this.mesh.meshColix);
if (!this.g3d.setC (this.colix)) return;
var n = v.size () - 1;
var diam = this.getDiameter ();
for (var j = 6; j < n; j++) {
var pt1 = v.get (j);
var pt2 = v.get (++j);
if (Float.isNaN (pt1.x) || Float.isNaN (pt2.x)) break;
this.tm.transformPtScrT3 (pt1, this.pt1f);
this.tm.transformPtScrT3 (pt2, this.pt2f);
this.pt1f.z -= 2;
this.pt2f.z -= 2;
if (!this.antialias && diam == 1) {
this.g3d.drawLineAB (this.pt1f, this.pt2f);
} else {
this.g3d.fillCylinderBits (1, diam, this.pt1f, this.pt2f);
}}
}
});
Clazz.overrideMethod (c$, "renderPoints", 
function () {
try {
if (this.volumeRender) this.g3d.volumeRender (true);
var slabPoints = ((this.volumeRender || this.mesh.pc == 0) && this.selectedPolyOnly);
var incr = this.imesh.vertexIncrement;
var diam;
if (this.mesh.diameter <= 0) {
diam = this.vwr.getInt (553648142);
this.frontOnly = this.isShell = false;
} else {
diam = Clazz.doubleToInt (this.vwr.getScreenDim () / (this.volumeRender ? 50 : 100));
}var ptSize = Math.round (Float.isNaN (this.mesh.volumeRenderPointSize) ? 150 : this.mesh.volumeRenderPointSize * 1000);
if (diam < 1) diam = 1;
var cX = (this.showNumbers ? Clazz.doubleToInt (this.vwr.getScreenWidth () / 2) : 0);
var cY = (this.showNumbers ? Clazz.doubleToInt (this.vwr.getScreenHeight () / 2) : 0);
if (this.showNumbers) this.vwr.gdata.setFontFid (this.vwr.gdata.getFontFidFS ("Monospaced", 24));
for (var i = (!this.imesh.hasGridPoints || this.imesh.firstRealVertex < 0 ? 0 : this.imesh.firstRealVertex); i < this.vertexCount; i += incr) {
if (this.vertexValues != null && Float.isNaN (this.vertexValues[i]) || this.frontOnly && !this.isVisibleNormix (this.normixes[i]) || this.imesh.jvxlData.thisSet >= 0 && this.mesh.vertexSets[i] != this.imesh.jvxlData.thisSet || !this.mesh.isColorSolid && this.mesh.vcs != null && !this.setColix (this.mesh.vcs[i]) || this.haveBsDisplay && !this.mesh.bsDisplay.get (i) || slabPoints && !this.bsPolygons.get (i)) continue;
this.hasColorRange = true;
if (this.showNumbers && this.screens[i].z > 10 && Math.abs (this.screens[i].x - cX) < 150 && Math.abs (this.screens[i].y - cY) < 150) {
var s = i + (this.mesh.isColorSolid ? "" : " " + this.mesh.vvs[i]);
this.g3d.setC (4);
this.g3d.drawStringNoSlab (s, null, this.screens[i].x, this.screens[i].y, this.screens[i].z - 30, 0);
}if (this.volumeRender) {
diam = Clazz.floatToInt (this.vwr.tm.scaleToScreen (this.screens[i].z, ptSize));
if (diam < 1) diam = 1;
this.g3d.volumeRender4 (diam, this.screens[i].x, this.screens[i].y, this.screens[i].z);
} else {
this.g3d.fillSphereI (diam, this.screens[i]);
}}
if (incr == 3) {
this.g3d.setC (this.isTranslucent ? JU.C.getColixTranslucent3 (12, true, 0.5) : 12);
for (var i = 1; i < this.vertexCount; i += 3) this.g3d.fillCylinder (3, Clazz.doubleToInt (diam / 4), this.screens[i], this.screens[i + 1]);

this.g3d.setC (this.isTranslucent ? JU.C.getColixTranslucent3 (21, true, 0.5) : 21);
for (var i = 1; i < this.vertexCount; i += 3) this.g3d.fillSphereI (diam, this.screens[i]);

this.g3d.setC (this.isTranslucent ? JU.C.getColixTranslucent3 (7, true, 0.5) : 7);
for (var i = 2; i < this.vertexCount; i += 3) {
this.g3d.fillSphereI (diam, this.screens[i]);
}
}} catch (e) {
}
if (this.volumeRender) this.g3d.volumeRender (false);
});
Clazz.overrideMethod (c$, "renderTriangles", 
function (fill, iShowTriangles, isExport) {
this.g3d.addRenderer (1073742182);
var polygonIndexes = this.mesh.pis;
this.colix = (this.isGhostPass ? this.mesh.slabColix : !fill && this.mesh.meshColix != 0 ? this.mesh.meshColix : this.mesh.colix);
var vertexColixes = (!fill && this.mesh.meshColix != 0 ? null : this.mesh.vcs);
if (this.isTranslucentInherit) this.colix = JU.C.copyColixTranslucency (this.mesh.slabColix, this.mesh.colix);
this.g3d.setC (this.colix);
var generateSet = isExport;
if (generateSet) {
if (this.frontOnly && fill) this.frontOnly = false;
this.bsPolygonsToExport.clearAll ();
}if (this.exportType == 1) {
this.frontOnly = false;
}var colorSolid = (this.isGhostPass && (!this.isBicolorMap) || vertexColixes == null || this.mesh.isColorSolid);
var noColor = (this.isGhostPass && !this.isBicolorMap || vertexColixes == null || !fill && this.mesh.meshColix != 0);
var isPlane = (this.imesh.jvxlData.jvxlPlane != null);
var colix = this.colix;
if (isPlane && !colorSolid && !fill && this.mesh.fillTriangles) {
colorSolid = true;
colix = 4;
}var colorArrayed = (colorSolid && this.mesh.pcs != null);
if (colorArrayed && !fill && this.mesh.fillTriangles) colorArrayed = false;
var contourColixes = this.imesh.jvxlData.contourColixes;
this.hasColorRange = !colorSolid && !this.isBicolorMap;
var diam = this.getDiameter ();
var i0 = 0;
for (var i = this.mesh.pc; --i >= i0; ) {
var polygon = polygonIndexes[i];
if (polygon == null || this.selectedPolyOnly && !this.bsPolygons.get (i)) continue;
var iA = polygon[0];
var iB = polygon[1];
var iC = polygon[2];
if (this.imesh.jvxlData.thisSet >= 0 && this.mesh.vertexSets != null && this.mesh.vertexSets[iA] != this.imesh.jvxlData.thisSet) continue;
if (this.haveBsDisplay && (!this.mesh.bsDisplay.get (iA) || !this.mesh.bsDisplay.get (iB) || !this.mesh.bsDisplay.get (iC))) continue;
var nA = this.normixes[iA];
var nB = this.normixes[iB];
var nC = this.normixes[iC];
var check = (this.frontOnly || this.isShell ? this.checkFront (nA, nB, nC) : 7);
if (fill && check == 0) continue;
var colixA;
var colixB;
var colixC;
if (colorSolid) {
if (colorArrayed && i < this.mesh.pcs.length) {
var c = this.mesh.pcs[i];
if (c == 0) continue;
colix = c;
}if (iShowTriangles) colix = (Math.round (Math.random () * 10) + 5);
colixA = colixB = colixC = colix;
} else {
colixA = vertexColixes[iA];
colixB = vertexColixes[iB];
colixC = vertexColixes[iC];
if (this.isBicolorMap) {
if (colixA != colixB || colixB != colixC) continue;
if (this.isGhostPass) {
colixA = colixB = colixC = JU.C.copyColixTranslucency (this.mesh.slabColix, colixA);
}}}if (fill) {
if (generateSet) {
this.bsPolygonsToExport.set (i);
continue;
}if (iB == iC) {
this.setColix (colixA);
if (iA == iB) this.g3d.fillSphereI (diam, this.screens[iA]);
 else this.g3d.fillCylinder (3, diam, this.screens[iA], this.screens[iB]);
} else if (this.mesh.colorsExplicit) {
this.vwr.gdata.setColor (polygon[4]);
colixA = JU.C.copyColixTranslucency (this.mesh.colix, 2047);
this.g3d.setC (colixA);
this.g3d.fillTriangle3CN (this.screens[iA], colixA, nA, this.screens[iB], colixA, nB, this.screens[iC], colixA, nC);
} else {
if (this.isTranslucentInherit && vertexColixes != null) {
colixA = JU.C.copyColixTranslucency (this.mesh.slabColix, vertexColixes[iA]);
colixB = JU.C.copyColixTranslucency (this.mesh.slabColix, vertexColixes[iB]);
colixC = JU.C.copyColixTranslucency (this.mesh.slabColix, vertexColixes[iC]);
}this.g3d.fillTriangle3CN (this.screens[iA], colixA, nA, this.screens[iB], colixB, nB, this.screens[iC], colixC, nC);
}if (this.iShowNormals) this.renderNormals ();
} else {
check &= polygon[3];
if (check == 0) continue;
if (iShowTriangles) check = 7;
this.pt1i.setT (this.screens[iA]);
this.pt2i.setT (this.screens[iB]);
this.pt3i.setT (this.screens[iC]);
this.pt1i.z -= 2;
this.pt2i.z -= 2;
this.pt3i.z -= 2;
if (noColor) {
} else if (colorArrayed) {
this.g3d.setC (this.mesh.fillTriangles ? 4 : contourColixes[polygon[4] % contourColixes.length]);
} else {
this.drawTriangle (this.pt1i, colixA, this.pt2i, colixB, this.pt3i, colixC, check, diam);
continue;
}this.drawTriangle (this.pt1i, colix, this.pt2i, colix, this.pt3i, colix, check, diam);
}}
if (generateSet) this.exportSurface (colorSolid ? colix : 0);
}, "~B,~B,~B");
Clazz.defineMethod (c$, "getDiameter", 
 function () {
var diam;
if (this.mesh.diameter <= 0) {
diam = (this.meshScale < 0 ? this.meshScale = this.vwr.getInt (553648150) : this.meshScale);
if (this.antialias) diam *= 2;
} else {
diam = Clazz.doubleToInt (this.vwr.getScreenDim () / 100);
}if (diam < 1) diam = 1;
return diam;
});
Clazz.defineMethod (c$, "renderNormals", 
 function () {
if (!this.g3d.setC (JU.C.copyColixTranslucency (this.mesh.colix, 8))) return;
this.vwr.gdata.setFontFid (this.vwr.gdata.getFontFidFS ("Monospaced", 24));
var vertexVectors = JU.Normix.getVertexVectors ();
for (var i = this.vertexCount; --i >= 0; ) {
if (this.vertexValues != null && Float.isNaN (this.vertexValues[i])) continue;
this.pt1f.setT (this.vertices[i]);
var n = this.mesh.normixes[i];
if (n >= 0) {
this.pt2f.scaleAdd2 (0.3, vertexVectors[n], this.pt1f);
this.tm.transformPtScrT3 (this.pt2f, this.pt2f);
this.pt1f.set (this.screens[i].x, this.screens[i].y, this.screens[i].z);
this.g3d.drawLineAB (this.pt1f, this.pt2f);
}}
});
});
