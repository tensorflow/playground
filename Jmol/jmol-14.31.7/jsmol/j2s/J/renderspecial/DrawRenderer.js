Clazz.declarePackage ("J.renderspecial");
Clazz.load (["J.render.MeshRenderer", "JU.BS", "$.P3", "$.P3i", "$.V3"], "J.renderspecial.DrawRenderer", ["JU.A4", "$.M3", "$.Measure", "J.shapespecial.Draw", "JU.C", "$.GData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.drawType = null;
this.dmesh = null;
this.controlHermites = null;
this.pt0 = null;
this.pt1 = null;
this.pt2 = null;
this.vTemp = null;
this.vTemp2 = null;
this.pt0f = null;
this.pt0i = null;
this.s0f = null;
this.s1f = null;
this.s2f = null;
this.bsHandles = null;
Clazz.instantialize (this, arguments);
}, J.renderspecial, "DrawRenderer", J.render.MeshRenderer);
Clazz.prepareFields (c$, function () {
this.pt0 =  new JU.P3 ();
this.pt1 =  new JU.P3 ();
this.pt2 =  new JU.P3 ();
this.vTemp =  new JU.V3 ();
this.vTemp2 =  new JU.V3 ();
this.pt0f =  new JU.P3 ();
this.pt0i =  new JU.P3i ();
this.bsHandles =  new JU.BS ();
});
Clazz.overrideMethod (c$, "render", 
function () {
this.needTranslucent = false;
this.imageFontScaling = this.vwr.imageFontScaling;
var draw = this.shape;
for (var i = draw.meshCount; --i >= 0; ) {
var mesh = this.dmesh = draw.meshes[i];
if (mesh == null) {
System.out.println ("DrawRenderer mesh is null?");
return false;
}if (mesh.connectedAtoms != null) {
if (mesh.connectedAtoms[0] < 0) continue;
mesh.vs =  new Array (4);
mesh.vc = 4;
var c = mesh.connectedAtoms;
for (var j = 0; j < 4; j++) mesh.vs[j] = (c[j] < 0 ? mesh.vs[j - 1] : this.vwr.ms.at[c[j]]);

mesh.recalcAltVertices = true;
}if (this.renderMesh2 (mesh)) this.renderInfo ();
if (!this.isExport && mesh.visibilityFlags != 0 && this.vwr.getPickingMode () == 4) {
if (!this.g3d.setC (JU.C.getColixTranslucent3 (23, true, 0.5))) this.needTranslucent = true;
 else this.renderHandles ();
}}
return this.needTranslucent;
});
Clazz.overrideMethod (c$, "isPolygonDisplayable", 
function (i) {
return J.shapespecial.Draw.isPolygonDisplayable (this.dmesh, i) && (this.dmesh.modelFlags == null || this.dmesh.bsMeshesVisible.get (i));
}, "~N");
Clazz.overrideMethod (c$, "render2", 
function (isExport) {
this.drawType = this.dmesh.drawType;
this.diameter = this.dmesh.diameter;
this.width = this.dmesh.width;
if (this.mesh.connectedAtoms != null) this.getConnectionPoints ();
if (this.mesh.lineData != null) {
this.drawLineData (this.mesh.lineData);
return;
}var nPoints = this.vertexCount;
var isCurved = ((this.drawType === J.shapespecial.Draw.EnumDrawType.CURVE || this.drawType === J.shapespecial.Draw.EnumDrawType.ARROW || this.drawType === J.shapespecial.Draw.EnumDrawType.ARC) && this.vertexCount > 2);
if (this.width > 0 && isCurved || this.drawType === J.shapespecial.Draw.EnumDrawType.ARROW) {
this.pt1f.set (0, 0, 0);
var n = (this.drawType === J.shapespecial.Draw.EnumDrawType.ARC ? 2 : this.vertexCount);
for (var i = 0; i < n; i++) this.pt1f.add (this.vertices[i]);

this.pt1f.scale (1 / n);
this.tm.transformPtScr (this.pt1f, this.pt1i);
this.diameter = Clazz.floatToInt (this.vwr.tm.scaleToScreen (this.pt1i.z, Clazz.doubleToInt (Math.floor (this.width * 1000))));
if (this.diameter == 0) this.diameter = 1;
}if (this.dmesh.haveXyPoints) {
if (this.dmesh.isVector) {
var ptXY = 0;
for (var i = 0; i < 2; i++) if (this.vertices[i].z == 3.4028235E38 || this.vertices[i].z == -3.4028235E38) ptXY += i + 1;

if (--ptXY < 2) {
this.renderXyArrow (ptXY);
return;
}} else if (this.drawType === J.shapespecial.Draw.EnumDrawType.POINT) {
this.renderXyPoint ();
}}var tension = 5;
switch (this.drawType) {
default:
this.render2b (false);
return;
case J.shapespecial.Draw.EnumDrawType.CIRCULARPLANE:
if (this.dmesh.scale > 0) this.width *= this.dmesh.scale;
this.render2b (false);
return;
case J.shapespecial.Draw.EnumDrawType.CIRCLE:
this.tm.transformPtScr (this.vertices[0], this.pt1i);
if (this.diameter == 0 && this.width == 0) this.width = 1.0;
if (this.dmesh.scale > 0) this.width *= this.dmesh.scale;
if (this.width > 0) this.diameter = Clazz.floatToInt (this.vwr.tm.scaleToScreen (this.pt1i.z, Clazz.doubleToInt (Math.floor (this.width * 1000))));
if (this.diameter > 0 && (this.mesh.drawTriangles || this.mesh.fillTriangles)) {
this.g3d.addRenderer (1073741880);
this.g3d.drawFilledCircle (this.colix, this.mesh.fillTriangles ? this.colix : 0, this.diameter, this.pt1i.x, this.pt1i.y, this.pt1i.z);
}return;
case J.shapespecial.Draw.EnumDrawType.LINE_SEGMENT:
for (var i = 0; i < nPoints - 1; i++) this.drawEdge (i, i + 1, true, this.vertices[i], this.vertices[i + 1], this.screens[i], this.screens[i + 1]);

return;
case J.shapespecial.Draw.EnumDrawType.CURVE:
break;
case J.shapespecial.Draw.EnumDrawType.ARC:
var ptRef = (this.vertexCount > 2 ? this.vertices[2] : J.shapespecial.Draw.randomPoint ());
var nDegreesOffset = (this.vertexCount > 3 ? this.vertices[3].x : 0);
var theta = (this.vertexCount > 3 ? this.vertices[3].y : 360);
if (theta == 0) return;
var fractionalOffset = (this.vertexCount > 3 ? this.vertices[3].z : 0);
nPoints = this.setArc (this.vertices[0], this.vertices[1], ptRef, nDegreesOffset, theta, fractionalOffset, this.dmesh.scale);
if (this.dmesh.isVector && !this.dmesh.noHead) {
this.renderArrowHead (this.pt0, this.pt1, 0.3, false, false, this.dmesh.isBarb);
this.tm.transformPtScr (this.pt1f, this.screens[nPoints - 1]);
this.tm.transformPtScrT3 (this.pt1f, this.p3Screens[nPoints - 1]);
}this.pt1f.setT (this.pt2);
break;
case J.shapespecial.Draw.EnumDrawType.ARROW:
if (!isCurved) {
this.renderArrowHead (this.vertices[0], this.vertices[1], 0, false, true, this.dmesh.isBarb);
return;
}var nHermites = 5;
if (this.controlHermites == null || this.controlHermites.length < nHermites + 1) {
this.controlHermites =  new Array (nHermites + 1);
}JU.GData.getHermiteList (tension, this.vertices[this.vertexCount - 3], this.vertices[this.vertexCount - 2], this.vertices[this.vertexCount - 1], this.vertices[this.vertexCount - 1], this.vertices[this.vertexCount - 1], this.controlHermites, 0, nHermites, true);
this.renderArrowHead (this.controlHermites[nHermites - 2], this.controlHermites[nHermites - 1], 0, false, false, this.dmesh.isBarb);
break;
}
if (this.diameter == 0) this.diameter = 3;
if (isCurved) {
this.g3d.addRenderer (553648145);
for (var i = 0, i0 = 0; i < nPoints - 1; i++) {
this.g3d.fillHermite (tension, this.diameter, this.diameter, this.diameter, this.p3Screens[i0], this.p3Screens[i], this.p3Screens[i + 1], this.p3Screens[i + (i == nPoints - 2 ? 1 : 2)]);
i0 = i;
}
} else {
this.render2b (false);
}}, "~B");
Clazz.defineMethod (c$, "setArc", 
 function (v1, v2, ptRef, nDegreesOffset, theta, fractionalOffset, scale) {
this.vTemp.sub2 (v2, v1);
this.pt1f.scaleAdd2 (fractionalOffset, this.vTemp, v1);
var mat =  new JU.M3 ().setAA (JU.A4.newVA (this.vTemp, (nDegreesOffset * 3.141592653589793 / 180)));
this.vTemp2.sub2 (ptRef, v1);
this.vTemp2.cross (this.vTemp, this.vTemp2);
this.vTemp2.cross (this.vTemp2, this.vTemp);
this.vTemp2.normalize ();
this.vTemp2.scale (scale / 2);
mat.rotate (this.vTemp2);
var degrees = theta / 5;
while (Math.abs (degrees) > 5) degrees /= 2;

var nPoints = Math.round (theta / degrees) + 1;
while (nPoints < 10) {
degrees /= 2;
nPoints = Math.round (theta / degrees) + 1;
}
mat.setAA (JU.A4.newVA (this.vTemp, (degrees * 3.141592653589793 / 180)));
this.screens = this.vwr.allocTempScreens (nPoints);
this.p3Screens = this.vwr.allocTempPoints (nPoints);
var iBase = nPoints - (this.dmesh.scale < 2 ? 3 : 3);
for (var i = 0; i < nPoints; i++) {
if (i == iBase) this.pt0.setT (this.pt1);
this.pt1.scaleAdd2 (1, this.vTemp2, this.pt1f);
if (i == 0) this.pt2.setT (this.pt1);
this.tm.transformPtScr (this.pt1, this.screens[i]);
this.tm.transformPtScrT3 (this.pt1, this.p3Screens[i]);
mat.rotate (this.vTemp2);
}
return nPoints;
}, "JU.T3,JU.T3,JU.T3,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getConnectionPoints", 
 function () {
this.vertexCount = 3;
var dmax = 3.4028235E38;
var i0 = 0;
var j0 = 0;
for (var i = 0; i < 2; i++) for (var j = 2; j < 4; j++) {
var d = this.vertices[i].distance (this.vertices[j]);
if (d < dmax) {
dmax = d;
i0 = i;
j0 = j;
}}

this.pt0.ave (this.vertices[0], this.vertices[1]);
this.pt2.ave (this.vertices[2], this.vertices[3]);
this.pt1.ave (this.pt0, this.pt2);
this.vertices[3] = JU.P3.newP (this.vertices[i0]);
this.vertices[3].add (this.vertices[j0]);
this.vertices[3].scale (0.5);
this.vertices[1] = JU.P3.newP (this.pt1);
this.vertices[0] = JU.P3.newP (this.pt0);
this.vertices[2] = JU.P3.newP (this.pt2);
for (var i = 0; i < 4; i++) this.tm.transformPtScr (this.vertices[i], this.screens[i]);

var f = 4 * this.getArrowScale ();
var endoffset = 0.2;
var offsetside = (this.width == 0 ? 0.1 : this.width);
this.pt0.set (this.screens[0].x, this.screens[0].y, this.screens[0].z);
this.pt1.set (this.screens[1].x, this.screens[1].y, this.screens[1].z);
this.pt2.set (this.screens[3].x, this.screens[3].y, this.screens[3].z);
var dx = (this.screens[1].x - this.screens[0].x) * f;
var dy = (this.screens[1].y - this.screens[0].y) * f;
if (dmax == 0 || JU.Measure.computeTorsion (this.pt2, this.pt0, JU.P3.new3 (this.pt0.x, this.pt0.y, 10000), this.pt1, false) > 0) {
dx = -dx;
dy = -dy;
}this.pt2.set (dy, -dx, 0);
this.pt1.add (this.pt2);
this.tm.unTransformPoint (this.pt1, this.vertices[1]);
this.pt2.scale (offsetside);
this.vTemp.sub2 (this.vertices[1], this.vertices[0]);
this.vTemp.scale (endoffset);
this.vertices[0].add (this.vTemp);
this.vTemp.sub2 (this.vertices[1], this.vertices[2]);
this.vTemp.scale (endoffset);
this.vertices[2].add (this.vTemp);
for (var i = 0; i < 3; i++) {
this.tm.transformPtScr (this.vertices[i], this.screens[i]);
if (offsetside != 0) {
this.screens[i].x += Math.round (this.pt2.x);
this.screens[i].y += Math.round (this.pt2.y);
this.pt1.set (this.screens[i].x, this.screens[i].y, this.screens[i].z);
this.tm.unTransformPoint (this.pt1, this.vertices[i]);
}}
});
Clazz.defineMethod (c$, "drawLineData", 
 function (lineData) {
if (this.diameter == 0) this.diameter = 3;
for (var i = lineData.size (); --i >= 0; ) {
var pts = lineData.get (i);
this.tm.transformPtScr (pts[0], this.pt1i);
this.tm.transformPtScr (pts[1], this.pt2i);
this.drawEdge (-1, -2, true, pts[0], pts[1], this.pt1i, this.pt2i);
}
}, "JU.Lst");
Clazz.defineMethod (c$, "renderXyPoint", 
 function () {
var f = (this.g3d.isAntialiased () ? 2 : 1);
this.pt0.setT (this.vertices[0]);
if (this.diameter == 0) this.diameter = Clazz.floatToInt (this.width);
if (this.pt0.z == -3.4028235E38) {
this.pt0.x *= this.vwr.tm.width / 100;
this.pt0.y *= this.vwr.tm.height / 100;
this.diameter = Clazz.floatToInt (this.diameter * this.vwr.getScreenDim () / 100);
}this.diameter *= f;
this.pt1i.set (Clazz.floatToInt (this.pt0.x * f), Clazz.floatToInt (this.vwr.tm.height - this.pt0.y * f), Clazz.floatToInt (this.vwr.tm.cameraDistance));
this.g3d.fillSphereI (this.diameter, this.pt1i);
});
Clazz.defineMethod (c$, "renderXyArrow", 
 function (ptXY) {
var ptXYZ = 1 - ptXY;
var arrowPt =  new Array (2);
arrowPt[ptXYZ] = this.pt1;
arrowPt[ptXY] = this.pt0;
this.pt0.set (this.screens[ptXY].x, this.screens[ptXY].y, this.screens[ptXY].z);
this.tm.rotatePoint (this.vertices[ptXYZ], this.pt1);
this.pt1.z *= -1;
var zoomDimension = this.vwr.getScreenDim ();
var scaleFactor = zoomDimension / 20;
this.pt1.scaleAdd2 (this.dmesh.scale * scaleFactor, this.pt1, this.pt0);
if (this.diameter == 0) this.diameter = 1;
if (this.diameter < 0) this.g3d.drawDashedLineBits (8, 4, this.pt0, this.pt1);
 else this.g3d.fillCylinderBits (2, this.diameter, this.pt0, this.pt1);
this.renderArrowHead (this.pt0, this.pt1, 0, true, false, false);
}, "~N");
Clazz.defineMethod (c$, "renderArrowHead", 
 function (pt1, pt2, factor2, isTransformed, withShaft, isBarb) {
if (this.dmesh.noHead) return;
if (this.s0f == null) {
this.s0f =  new JU.P3 ();
this.s1f =  new JU.P3 ();
this.s2f =  new JU.P3 ();
}var fScale = this.getArrowScale ();
if (isTransformed) fScale *= 40;
if (factor2 > 0) fScale *= factor2;
this.pt0f.setT (pt1);
this.pt2f.setT (pt2);
var d = this.pt0f.distance (this.pt2f);
if (d == 0) return;
this.vTemp.sub2 (this.pt2f, this.pt0f);
this.vTemp.normalize ();
this.vTemp.scale (fScale / 5);
if (!withShaft) this.pt2f.add (this.vTemp);
this.vTemp.scale (5);
this.pt1f.sub2 (this.pt2f, this.vTemp);
if (isTransformed) {
this.s1f.setT (this.pt1f);
this.s2f.setT (this.pt2f);
} else {
this.tm.transformPtScrT3 (this.pt2f, this.s2f);
this.tm.transformPtScrT3 (this.pt1f, this.s1f);
this.tm.transformPtScrT3 (this.pt0f, this.s0f);
}if (this.s2f.z == 1 || this.s1f.z == 1) return;
var headDiameter;
if (this.diameter > 0) {
headDiameter = this.diameter * 3;
} else {
this.vTemp.set (this.s2f.x - this.s1f.x, this.s2f.y - this.s1f.y, this.s2f.z - this.s1f.z);
headDiameter = Math.round (this.vTemp.length () * .5);
this.diameter = Clazz.doubleToInt (headDiameter / 5);
}if (this.diameter < 1) this.diameter = 1;
if (headDiameter > 2) this.g3d.fillConeScreen3f (2, headDiameter, this.s1f, this.s2f, isBarb);
if (withShaft) this.g3d.fillCylinderScreen3I (2, this.diameter, this.s0f, this.s1f, null, null, 0);
}, "JU.T3,JU.T3,~N,~B,~B,~B");
Clazz.defineMethod (c$, "getArrowScale", 
 function () {
var fScale = (this.dmesh.isScaleSet ? this.dmesh.scale : 0);
if (fScale == 0) fScale = this.vwr.getFloat (570425352) * (this.dmesh.connectedAtoms == null ? 1 : 0.5);
if (fScale <= 0) fScale = 0.5;
return fScale;
});
Clazz.defineMethod (c$, "renderHandles", 
 function () {
var diameter = Math.round (10 * this.imageFontScaling);
switch (this.drawType) {
case J.shapespecial.Draw.EnumDrawType.NONE:
return;
default:
var colixFill = JU.C.getColixTranslucent3 (23, true, 0.5);
this.bsHandles.clearAll ();
this.g3d.addRenderer (1073741880);
for (var i = this.dmesh.pc; --i >= 0; ) {
if (!this.isPolygonDisplayable (i)) continue;
var vertexIndexes = this.dmesh.pis[i];
if (vertexIndexes == null) continue;
for (var j = (this.dmesh.isDrawPolygon ? 3 : vertexIndexes.length); --j >= 0; ) {
var k = vertexIndexes[j];
if (this.bsHandles.get (k)) continue;
this.bsHandles.set (k);
this.g3d.drawFilledCircle (23, colixFill, diameter, this.screens[k].x, this.screens[k].y, this.screens[k].z);
}
}
break;
}
});
Clazz.defineMethod (c$, "renderInfo", 
 function () {
if (this.isExport || this.mesh.title == null || this.vwr.getDrawHover () || !this.g3d.setC (this.vwr.cm.colixBackgroundContrast)) return;
for (var i = this.dmesh.pc; --i >= 0; ) if (this.isPolygonDisplayable (i)) {
var size = this.vwr.getFloat (570425356);
if (size <= 0) size = 14;
this.vwr.gdata.setFontFid (this.vwr.gdata.getFontFid (size * this.imageFontScaling));
var s = this.mesh.title[i < this.mesh.title.length ? i : this.mesh.title.length - 1];
var pt = 0;
if (s.length > 1 && s.charAt (0) == '>') {
pt = this.dmesh.pis[i].length - 1;
s = s.substring (1);
if (this.drawType === J.shapespecial.Draw.EnumDrawType.ARC) this.pt1f.setT (this.pt2f);
}if (this.drawType !== J.shapespecial.Draw.EnumDrawType.ARC) this.pt1f.setT (this.vertices[this.dmesh.pis[i][pt]]);
this.tm.transformPtScr (this.pt1f, this.pt1i);
var offset = Math.round (5 * this.imageFontScaling);
this.g3d.drawString (s, null, this.pt1i.x + offset, this.pt1i.y - offset, this.pt1i.z, this.pt1i.z, 0);
break;
}
});
});
