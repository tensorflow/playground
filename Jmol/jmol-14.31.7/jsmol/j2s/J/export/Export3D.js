Clazz.declarePackage ("J.export");
Clazz.load (["J.api.JmolRendererInterface", "JU.P3"], "J.export.Export3D", ["J.api.Interface", "J.g3d.HermiteRenderer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.exporter = null;
this.privateKey = 0;
this.gdata = null;
this.colix = 0;
this.hermite3d = null;
this.width = 0;
this.height = 0;
this.slab = 0;
this.depth = 0;
this.exportName = null;
this.webGL = false;
this.isCartesian = false;
this.ptA = null;
this.ptB = null;
this.ptC = null;
this.ptD = null;
Clazz.instantialize (this, arguments);
}, J["export"], "Export3D", null, J.api.JmolRendererInterface);
Clazz.prepareFields (c$, function () {
this.ptA =  new JU.P3 ();
this.ptB =  new JU.P3 ();
this.ptC =  new JU.P3 ();
this.ptD =  new JU.P3 ();
});
Clazz.overrideMethod (c$, "isWebGL", 
function () {
return this.webGL;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "initializeExporter", 
function (vwr, privateKey, gdata, params) {
this.exportName = params.get ("type");
this.webGL = this.exportName.equals ("JS");
if ((this.exporter = J.api.Interface.getOption ("export." + (this.webGL ? "" : "_") + this.exportName + "Exporter", vwr, "export")) == null) return null;
this.exporter.export3D = this;
this.isCartesian = (this.exporter.exportType == 1);
this.gdata = gdata;
gdata.setNewWindowParametersForExport ();
this.slab = gdata.slab;
this.width = gdata.width;
this.height = gdata.height;
this.privateKey = privateKey;
return (this.initializeOutput (vwr, privateKey, params) ? this.exporter : null);
}, "JV.Viewer,~N,JU.GData,java.util.Map");
Clazz.overrideMethod (c$, "initializeOutput", 
function (vwr, privateKey, params) {
return this.exporter.initializeOutput (vwr, privateKey, this.gdata, params);
}, "JV.Viewer,~N,java.util.Map");
Clazz.overrideMethod (c$, "getExportType", 
function () {
return this.exporter.exportType;
});
Clazz.overrideMethod (c$, "getExportName", 
function () {
return this.exportName;
});
Clazz.overrideMethod (c$, "finalizeOutput", 
function () {
return this.exporter.finalizeOutput ();
});
Clazz.overrideMethod (c$, "setSlab", 
function (slabValue) {
this.gdata.setSlab (slabValue);
this.slab = this.gdata.slab;
}, "~N");
Clazz.overrideMethod (c$, "setSlabAndZShade", 
function (slabValue, depthValue, zSlab, zDepth, zPower) {
this.gdata.setSlab (slabValue);
this.slab = this.gdata.slab;
this.gdata.setDepth (depthValue);
this.depth = this.gdata.depth;
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "renderBackground", 
function (me) {
if (!this.isCartesian) this.gdata.renderBackground (me);
}, "J.api.JmolRendererInterface");
Clazz.overrideMethod (c$, "drawAtom", 
function (atom, radius) {
this.exporter.drawAtom (atom, radius);
}, "JM.Atom,~N");
Clazz.overrideMethod (c$, "drawRect", 
function (x, y, z, zSlab, rWidth, rHeight) {
if (this.webGL) {
return;
}if (zSlab != 0 && this.gdata.isClippedZ (zSlab)) return;
var w = rWidth - 1;
var h = rHeight - 1;
var xRight = x + w;
var yBottom = y + h;
if (y >= 0 && y < this.height) this.drawHLine (x, y, z, w);
if (yBottom >= 0 && yBottom < this.height) this.drawHLine (x, yBottom, z, w);
if (x >= 0 && x < this.width) this.drawVLine (x, y, z, h);
if (xRight >= 0 && xRight < this.width) this.drawVLine (xRight, y, z, h);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawHLine", 
 function (x, y, z, w) {
var argbCurrent = this.gdata.getColorArgbOrGray (this.colix);
if (w < 0) {
x += w;
w = -w;
}for (var i = 0; i <= w; i++) {
this.exporter.drawTextPixel (argbCurrent, x + i, y, z);
}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawVLine", 
 function (x, y, z, h) {
var argbCurrent = this.gdata.getColorArgbOrGray (this.colix);
if (h < 0) {
y += h;
h = -h;
}for (var i = 0; i <= h; i++) {
this.exporter.drawTextPixel (argbCurrent, x, y + i, z);
}
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawFilledCircle", 
function (colixRing, colixFill, diameter, x, y, z) {
if (!this.gdata.isClippedZ (z)) this.exporter.drawFilledCircle (colixRing, colixFill, diameter, x, y, z);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawCircle", 
function (colix, diameter, x, y, z, doFill) {
if (!this.gdata.isClippedZ (z)) this.exporter.drawCircle (x, y, z, diameter, colix, doFill);
}, "~N,~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "fillSphereXYZ", 
function (diameter, x, y, z) {
this.ptA.set (x, y, z);
this.fillSphereBits (diameter, this.ptA);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillSphereI", 
function (diameter, center) {
this.ptA.set (center.x, center.y, center.z);
this.fillSphereBits (diameter, this.ptA);
}, "~N,JU.P3i");
Clazz.overrideMethod (c$, "fillSphereBits", 
function (diameter, center) {
if (diameter != 0) this.exporter.fillSphere (this.colix, diameter, center);
}, "~N,JU.P3");
Clazz.overrideMethod (c$, "fillTextRect", 
function (x, y, z, zSlab, widthFill, heightFill) {
if (this.isCartesian || this.gdata.isClippedZ (zSlab)) return;
z = this.exporter.fixScreenZ (z);
this.ptA.set (x, y, z);
this.ptB.set (x + widthFill, y, z);
this.ptC.set (x + widthFill, y + heightFill, z);
this.ptD.set (x, y + heightFill, z);
this.fillQuadrilateral (this.ptA, this.ptB, this.ptC, this.ptD, false);
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawString", 
function (str, font3d, xBaseline, yBaseline, z, zSlab, bgcolix) {
if (str != null && !this.gdata.isClippedZ (zSlab)) this.drawStringNoSlab (str, font3d, xBaseline, yBaseline, z, bgcolix);
}, "~S,JU.Font,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawStringNoSlab", 
function (str, font3d, xBaseline, yBaseline, z, bgcolix) {
if (str == null) return;
z = Math.max (this.slab, z);
if (font3d == null) font3d = this.gdata.getFont3DCurrent ();
 else this.gdata.setFont (font3d);
this.exporter.plotText (xBaseline, yBaseline, z, this.colix, str, font3d);
}, "~S,JU.Font,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawImage", 
function (objImage, x, y, z, zSlab, bgcolix, width, height) {
if (this.isCartesian || objImage == null || width == 0 || height == 0 || this.gdata.isClippedZ (zSlab)) return;
z = Math.max (this.slab, z);
this.exporter.plotImage (x, y, z, objImage, bgcolix, width, height);
}, "~O,~N,~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawPixel", 
function (x, y, z) {
this.plotPixelClipped (x, y, z);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "plotPixelClipped", 
function (x, y, z) {
if (this.isClipped (x, y, z)) return;
this.exporter.drawPixel (this.colix, x, y, z, 1);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "plotPixelClippedP3i", 
function (screen) {
if (this.isClipped (screen.x, screen.y, screen.z)) return;
this.exporter.drawPixel (this.colix, screen.x, screen.y, screen.z, 1);
}, "JU.P3i");
Clazz.overrideMethod (c$, "drawPoints", 
function (count, coordinates, scale) {
for (var i = count * 3; i > 0; ) {
var z = coordinates[--i];
var y = coordinates[--i];
var x = coordinates[--i];
if (this.isClipped (x, y, z)) continue;
this.exporter.drawPixel (this.colix, x, y, z, scale);
}
}, "~N,~A,~N");
Clazz.overrideMethod (c$, "drawDashedLineBits", 
function (run, rise, pointA, pointB) {
this.exporter.fillCylinderScreenMad (this.colix, 2, this.exporter.lineWidthMad, pointA, pointB);
}, "~N,~N,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "drawLineXYZ", 
function (x1, y1, z1, x2, y2, z2) {
this.ptA.set (x1, y1, z1);
this.ptB.set (x2, y2, z2);
this.exporter.fillCylinderScreenMad (this.colix, 2, this.exporter.lineWidthMad, this.ptA, this.ptB);
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawLine", 
function (colixA, colixB, xA, yA, zA, xB, yB, zB) {
this.fillCylinderXYZ (colixA, colixB, 2, this.exporter.lineWidthMad, xA, yA, zA, xB, yB, zB);
}, "~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawLineBits", 
function (colixA, colixB, pointA, pointB) {
this.fillCylinderBits2 (colixA, colixB, 2, this.exporter.lineWidthMad, pointA, pointB);
}, "~N,~N,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "drawLineAB", 
function (pointA, pointB) {
this.exporter.fillCylinderScreenMad (this.colix, 2, this.exporter.lineWidthMad, pointA, pointB);
}, "JU.P3,JU.P3");
Clazz.overrideMethod (c$, "drawBond", 
function (atomA, atomB, colixA, colixB, endcaps, mad, bondOrder) {
if (mad == 1) mad = this.exporter.lineWidthMad;
this.exporter.drawCylinder (atomA, atomB, colixA, colixB, endcaps, mad, bondOrder);
}, "JU.P3,JU.P3,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillCylinderXYZ", 
function (colixA, colixB, endcaps, mad, xA, yA, zA, xB, yB, zB) {
this.ptA.set (xA, yA, zA);
this.ptB.set (xB, yB, zB);
this.exporter.drawCylinder (this.ptA, this.ptB, colixA, colixB, endcaps, mad, 1);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillCylinderScreen3I", 
function (endcaps, diameter, pointA, pointB, pt0f, pt1f, radius) {
if (diameter <= 0) return;
this.exporter.fillCylinderScreen (this.colix, endcaps, diameter, pointA, pointB, pt0f, pt1f, radius);
}, "~N,~N,JU.P3,JU.P3,JU.P3,JU.P3,~N");
Clazz.overrideMethod (c$, "fillCylinder", 
function (endcaps, diameter, pointA, pointB) {
if (diameter <= 0) return;
this.ptA.set (pointA.x, pointA.y, pointA.z);
this.ptB.set (pointB.x, pointB.y, pointB.z);
this.exporter.fillCylinderScreenMad (this.colix, endcaps, diameter, this.ptA, this.ptB);
}, "~N,~N,JU.P3i,JU.P3i");
Clazz.overrideMethod (c$, "fillCylinderBits", 
function (endcaps, diameter, pointA, pointB) {
if (diameter <= 0) return;
if (this.isCartesian) {
this.exporter.fillCylinderScreen (this.colix, endcaps, diameter, pointA, pointB, null, null, 0);
} else {
this.exporter.fillCylinderScreenMad (this.colix, endcaps, diameter, pointA, pointB);
}}, "~N,~N,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "fillConeScreen3f", 
function (endcap, screenDiameter, pointBase, screenTip, isBarb) {
this.exporter.fillConeScreen (this.colix, endcap, screenDiameter, pointBase, screenTip, isBarb);
}, "~N,~N,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "drawHermite4", 
function (tension, s0, s1, s2, s3) {
this.hermite3d.renderHermiteRope (false, tension, 0, 0, 0, s0, s1, s2, s3);
}, "~N,JU.P3,JU.P3,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "fillHermite", 
function (tension, diameterBeg, diameterMid, diameterEnd, s0, s1, s2, s3) {
this.hermite3d.renderHermiteRope (true, tension, diameterBeg, diameterMid, diameterEnd, s0, s1, s2, s3);
}, "~N,~N,~N,~N,JU.P3,JU.P3,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "drawTriangle3C", 
function (screenA, colixA, screenB, colixB, screenC, colixC, check) {
if ((check & 1) == 1) this.drawLine (colixA, colixB, screenA.x, screenA.y, screenA.z, screenB.x, screenB.y, screenB.z);
if ((check & 2) == 2) this.drawLine (colixB, colixC, screenB.x, screenB.y, screenB.z, screenC.x, screenC.y, screenC.z);
if ((check & 4) == 4) this.drawLine (colixA, colixC, screenA.x, screenA.y, screenA.z, screenC.x, screenC.y, screenC.z);
}, "JU.P3i,~N,JU.P3i,~N,JU.P3i,~N,~N");
Clazz.defineMethod (c$, "drawLineBits", 
function (screenA, screenB, colixA, colixB) {
this.exporter.drawCylinder (screenA, screenB, colixA, colixB, 2, this.exporter.lineWidthMad, 1);
}, "JU.P3,JU.P3,~N,~N");
Clazz.overrideMethod (c$, "fillCylinderBits2", 
function (colixA, colixB, endcaps, mad, screenA, screenB) {
this.exporter.drawCylinder (screenA, screenB, colixA, colixB, endcaps, mad, 1);
}, "~N,~N,~N,~N,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "fillTriangle3CNBits", 
function (pA, colixA, nA, pB, colixB, nB, pC, colixC, nC, twoSided) {
if (colixA != colixB || colixB != colixC) {
return;
}this.exporter.fillTriangle (colixA, pA, pB, pC, twoSided);
}, "JU.P3,~N,~N,JU.P3,~N,~N,JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "fillTriangle3CN", 
function (pointA, colixA, normixA, pointB, colixB, normixB, pointC, colixC, normixC) {
}, "JU.P3i,~N,~N,JU.P3i,~N,~N,JU.P3i,~N,~N");
Clazz.overrideMethod (c$, "fillTriangleTwoSided", 
function (normix, a, b, c) {
this.exporter.fillTriangle (this.colix, a, b, c, true);
}, "~N,JU.P3,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "fillTriangle3f", 
function (pointA, pointB, pointC, setNoisy) {
this.exporter.fillTriangle (this.colix, pointA, pointB, pointC, false);
}, "JU.P3,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "fillTriangle3i", 
function (screenA, screenB, screenC, ptA0, ptB0, ptC0, doShade) {
this.exporter.fillTriangle (this.colix, screenA, screenB, screenC, true);
}, "JU.P3,JU.P3,JU.P3,JU.T3,JU.T3,JU.T3,~B");
Clazz.overrideMethod (c$, "fillQuadrilateral", 
function (pointA, pointB, pointC, pointD, isSolid) {
this.exporter.fillTriangle (this.colix, pointA, pointB, pointC, false);
this.exporter.fillTriangle (this.colix, pointA, pointC, pointD, false);
}, "JU.P3,JU.P3,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "drawSurface", 
function (meshSurface, colix) {
this.exporter.drawSurface (meshSurface, colix);
}, "JU.MeshSurface,~N");
Clazz.overrideMethod (c$, "fillEllipsoid", 
function (center, points, x, y, z, diameter, mToEllipsoidal, coef, mDeriv, selectedOctant, octantPoints) {
this.exporter.fillEllipsoid (center, points, this.colix, x, y, z, diameter, mToEllipsoidal, coef, mDeriv, octantPoints);
}, "JU.P3,~A,~N,~N,~N,~N,JU.M3,~A,JU.M4,~N,~A");
Clazz.overrideMethod (c$, "drawEllipse", 
function (ptAtom, ptX, ptY, fillArc, wireframeOnly) {
return this.exporter.drawEllipse (ptAtom, ptX, ptY, this.colix, fillArc);
}, "JU.P3,JU.P3,JU.P3,~B,~B");
Clazz.overrideMethod (c$, "isAntialiased", 
function () {
return false;
});
Clazz.overrideMethod (c$, "checkTranslucent", 
function (isAlphaTranslucent) {
return true;
}, "~B");
Clazz.overrideMethod (c$, "haveTranslucentObjects", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setC", 
function (colix) {
this.colix = colix;
this.gdata.setC (colix);
return true;
}, "~N");
Clazz.overrideMethod (c$, "isInDisplayRange", 
function (x, y) {
return (this.isCartesian || this.gdata.isInDisplayRange (x, y));
}, "~N,~N");
Clazz.defineMethod (c$, "clipCode", 
function (x, y, z) {
return (this.isCartesian ? this.gdata.clipCode (z) : this.gdata.clipCode3 (x, y, z));
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "isClippedXY", 
function (diameter, x, y) {
return (!this.isCartesian && this.gdata.isClippedXY (diameter, x, y));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "isClipped", 
function (x, y, z) {
return (this.gdata.isClippedZ (z) || this.isClipped (x, y));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "isClipped", 
function (x, y) {
return (!this.isCartesian && this.gdata.isClipped (x, y));
}, "~N,~N");
Clazz.defineMethod (c$, "getPrivateKey", 
function () {
return this.privateKey;
});
Clazz.overrideMethod (c$, "volumeRender4", 
function (diam, x, y, z) {
this.fillSphereXYZ (diam, x, y, z);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "renderCrossHairs", 
function (minMax, screenWidth, screenHeight, navigationOffset, navigationDepthPercent) {
}, "~A,~N,~N,JU.P3,~N");
Clazz.overrideMethod (c$, "volumeRender", 
function (TF) {
}, "~B");
Clazz.overrideMethod (c$, "addRenderer", 
function (tok) {
if (tok == 553648145) this.hermite3d =  new J.g3d.HermiteRenderer ().set (this, this.gdata);
}, "~N");
Clazz.overrideMethod (c$, "plotImagePixel", 
function (argb, x, y, z, shade, bgargb, width, height, pbuf, p, transpLog) {
if (this.webGL) return;
z = Math.max (this.slab, z);
if (shade != 0) {
var a = (shade == 8 ? 0xFF : ((8 - shade) << 4) + (8 - shade));
argb = (argb & 0xFFFFFF) | (a << 24);
}this.exporter.drawTextPixel (argb, x, y, z);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~A,~O,~N");
Clazz.overrideMethod (c$, "drawHermite7", 
function (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, colixBack) {
if (colixBack == 0 || this.webGL) {
this.hermite3d.renderHermiteRibbon (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, 0);
return;
}this.hermite3d.renderHermiteRibbon (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, 1);
var colix = this.colix;
this.setC (colixBack);
this.hermite3d.renderHermiteRibbon (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, -1);
this.setC (colix);
}, "~B,~B,~N,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,~N,~N");
Clazz.overrideMethod (c$, "renderAllStrings", 
function (jr) {
if (this.webGL) {
return;
}this.gdata.renderAllStrings (this);
}, "~O");
});
