Clazz.declarePackage ("J.g3d");
Clazz.load (["J.api.JmolRendererInterface", "JU.GData", "JU.P3i", "$.V3"], "J.g3d.Graphics3D", ["java.lang.NullPointerException", "java.util.Arrays", "JU.AU", "J.api.Interface", "J.c.STER", "J.g3d.CylinderRenderer", "$.LineRenderer", "$.Pixelator", "$.PixelatorScreened", "$.PixelatorShaded", "$.PixelatorT", "$.Platform3D", "$.SphereRenderer", "$.TextRenderer", "$.TextString", "JU.C", "$.Font", "$.Normix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.platform = null;
this.line3d = null;
this.sphere3d = null;
this.cylinder3d = null;
this.triangle3d = null;
this.circle3d = null;
this.hermite3d = null;
this.isFullSceneAntialiasingEnabled = false;
this.antialias2 = false;
this.strings = null;
this.stringCount = 0;
this.anaglyphChannelBytes = null;
this.twoPass = false;
this.$haveTranslucentObjects = false;
this.pbuf = null;
this.pbufT = null;
this.zbuf = null;
this.zbufT = null;
this.translucencyMask = 0;
this.renderLow = false;
this.shadesCurrent = null;
this.anaglyphLength = 0;
this.pixel = null;
this.pixel0 = null;
this.pixelT0 = null;
this.pixelScreened = null;
this.pixelShaded = null;
this.zMargin = 0;
this.aobuf = null;
this.currentShadeIndex = 0;
this.lastRawColor = 0;
this.translucencyLog = 0;
this.wasScreened = false;
this.saveAmbient = 0;
this.saveDiffuse = 0;
this.sA = null;
this.sB = null;
this.sC = null;
this.vectorAB = null;
this.vectorAC = null;
this.vectorNormal = null;
this.shadeIndexes = null;
this.shadeIndexes2Sided = null;
this.pass2Flag01 = 0;
Clazz.instantialize (this, arguments);
}, J.g3d, "Graphics3D", JU.GData, J.api.JmolRendererInterface);
Clazz.prepareFields (c$, function () {
this.sA =  new JU.P3i ();
this.sB =  new JU.P3i ();
this.sC =  new JU.P3i ();
this.vectorAB =  new JU.V3 ();
this.vectorAC =  new JU.V3 ();
this.vectorNormal =  new JU.V3 ();
this.shadeIndexes =  Clazz.newByteArray (JU.GData.normixCount, 0);
this.shadeIndexes2Sided =  Clazz.newByteArray (JU.GData.normixCount, 0);
});
Clazz.overrideMethod (c$, "isWebGL", 
function () {
return false;
});
Clazz.overrideMethod (c$, "clear", 
function () {
this.stringCount = 0;
this.strings = null;
J.g3d.TextRenderer.clearFontCache ();
});
Clazz.overrideMethod (c$, "destroy", 
function () {
this.releaseBuffers ();
this.platform = null;
this.pixel = this.pixel0 = this.pixelShaded = null;
this.pixelT0 = null;
this.pixelScreened = null;
this.graphicsForMetrics = null;
});
Clazz.defineMethod (c$, "setZMargin", 
function (dz) {
this.zMargin = dz;
}, "~N");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.g3d.Graphics3D, []);
for (var i = JU.GData.normixCount; --i >= 0; ) this.transformedVectors[i] =  new JU.V3 ();

});
Clazz.overrideMethod (c$, "initialize", 
function (vwr, apiPlatform) {
this.vwr = vwr;
this.apiPlatform = apiPlatform;
this.platform =  new J.g3d.Platform3D (apiPlatform);
this.pixel = this.pixel0 =  new J.g3d.Pixelator (this);
this.graphicsForMetrics = this.platform.getGraphicsForMetrics ();
this.line3d =  new J.g3d.LineRenderer (this);
this.sphere3d =  new J.g3d.SphereRenderer (this);
this.cylinder3d =  new J.g3d.CylinderRenderer (this);
}, "JV.Viewer,J.api.GenericPlatform");
Clazz.overrideMethod (c$, "addRenderer", 
function (tok) {
switch (tok) {
case 1073741880:
if (this.circle3d == null) this.circle3d = this.getRenderer ("Circle");
break;
case 553648145:
if (this.hermite3d == null) this.hermite3d = this.getRenderer ("Hermite");
case 1073742182:
if (this.triangle3d == null) {
this.triangle3d = this.getRenderer ("Triangle");
(this.triangle3d).isOrthographic = !this.vwr.tm.perspectiveDepth;
}break;
}
}, "~N");
Clazz.defineMethod (c$, "getRenderer", 
 function (type) {
var r = (J.api.Interface.getOption ("g3d." + type + "Renderer", this.vwr, "render"));
if (r == null) throw  new NullPointerException ("Interface");
r.set (this, this);
return r;
}, "~S");
Clazz.overrideMethod (c$, "setWindowParameters", 
function (width, height, antialias) {
this.setWinParams (width, height, antialias);
if (this.currentlyRendering) this.endRendering ();
}, "~N,~N,~B");
Clazz.overrideMethod (c$, "checkTranslucent", 
function (isAlphaTranslucent) {
if (isAlphaTranslucent) this.$haveTranslucentObjects = true;
return (!this.twoPass || this.twoPass && (this.isPass2 == isAlphaTranslucent));
}, "~B");
Clazz.overrideMethod (c$, "beginRendering", 
function (rotationMatrix, translucentMode, isImageWrite, renderLow) {
if (this.currentlyRendering) this.endRendering ();
this.renderLow = renderLow;
if (this.windowWidth != this.newWindowWidth || this.windowHeight != this.newWindowHeight || this.newAntialiasing != this.isFullSceneAntialiasingEnabled) {
this.windowWidth = this.newWindowWidth;
this.windowHeight = this.newWindowHeight;
this.isFullSceneAntialiasingEnabled = this.newAntialiasing;
this.releaseBuffers ();
}this.setRotationMatrix (rotationMatrix);
(this.line3d).isOrthographic = !this.vwr.tm.perspectiveDepth;
if (this.triangle3d != null) (this.triangle3d).isOrthographic = !this.vwr.tm.perspectiveDepth;
this.antialiasEnabled = this.antialiasThisFrame = this.newAntialiasing;
this.currentlyRendering = true;
if (this.strings != null) for (var i = Math.min (this.strings.length, this.stringCount); --i >= 0; ) this.strings[i] = null;

this.stringCount = 0;
this.twoPass = true;
this.isPass2 = false;
this.pass2Flag01 = 0;
this.colixCurrent = 0;
this.$haveTranslucentObjects = this.wasScreened = false;
this.pixel = this.pixel0;
this.pixel.bgcolor = this.bgcolor;
this.translucentCoverOnly = !translucentMode;
if (this.pbuf == null) {
this.platform.allocateBuffers (this.windowWidth, this.windowHeight, this.antialiasThisFrame, isImageWrite);
this.pbuf = this.platform.pBuffer;
this.zbuf = this.platform.zBuffer;
this.aobuf = null;
this.pixel0.setBuf ();
if (this.pixelT0 != null) this.pixelT0.setBuf ();
if (this.pixelShaded != null) this.pixelShaded.setBuf ();
}this.setWidthHeight (this.antialiasThisFrame);
if (this.pixelScreened != null) this.pixelScreened.width = this.width;
this.platform.clearBuffer ();
if (this.backgroundImage != null) this.plotImage (-2147483648, 0, -2147483648, this.backgroundImage, null, 0, 0, 0);
this.textY = 0;
}, "JU.M3,~B,~B,~B");
Clazz.overrideMethod (c$, "setBackgroundTransparent", 
function (TF) {
if (this.platform != null) this.platform.setBackgroundTransparent (TF);
}, "~B");
Clazz.defineMethod (c$, "releaseBuffers", 
 function () {
this.pbuf = null;
this.zbuf = null;
this.pbufT = null;
this.zbufT = null;
this.aobuf = null;
this.platform.releaseBuffers ();
this.line3d.clearLineCache ();
});
Clazz.overrideMethod (c$, "setPass2", 
function (antialiasTranslucent) {
if (!this.$haveTranslucentObjects || !this.currentlyRendering) return false;
this.isPass2 = true;
this.pass2Flag01 = 1;
this.colixCurrent = 0;
if (this.pbufT == null || this.antialias2 != antialiasTranslucent) {
this.platform.allocateTBuffers (antialiasTranslucent);
this.pbufT = this.platform.pBufferT;
this.zbufT = this.platform.zBufferT;
}this.antialias2 = antialiasTranslucent;
if (this.antialiasThisFrame && !this.antialias2) this.downsampleFullSceneAntialiasing (true);
this.platform.clearTBuffer ();
if (this.pixelT0 == null) this.pixelT0 =  new J.g3d.PixelatorT (this);
if (this.pixel.p0 == null) this.pixel = this.pixelT0;
 else this.pixel.p0 = this.pixelT0;
return true;
}, "~B");
Clazz.overrideMethod (c$, "endRendering", 
function () {
if (!this.currentlyRendering) return;
if (this.pbuf != null) {
if (this.isPass2 && this.pbufT != null) for (var offset = this.pbufT.length; --offset >= 0; ) this.pbuf[offset] = J.g3d.Graphics3D.mergeBufferPixel (this.pbuf[offset], this.pbufT[offset], this.bgcolor);

if (this.pixel === this.pixelShaded && this.pixelShaded.zShadePower == 0) this.pixelShaded.showZBuffer ();
if (this.antialiasThisFrame) this.downsampleFullSceneAntialiasing (false);
}this.platform.setBackgroundColor (this.bgcolor);
this.platform.notifyEndOfRendering ();
this.currentlyRendering = this.isPass2 = false;
});
c$.mergeBufferPixel = Clazz.defineMethod (c$, "mergeBufferPixel", 
function (argbA, argbB, bgcolor) {
if (argbB == 0 || argbA == argbB) return argbA;
if (argbA == 0) argbA = bgcolor;
var rbA = (argbA & 0x00FF00FF);
var gA = (argbA & 0x0000FF00);
var rbB = (argbB & 0x00FF00FF);
var gB = (argbB & 0x0000FF00);
var logAlpha = (argbB >> 24) & 0xF;
switch (logAlpha) {
case 0:
rbA = rbB;
gA = gB;
break;
case 1:
rbA = (((rbB << 2) + (rbB << 1) + rbB + rbA) >> 3) & 0x00FF00FF;
gA = (((gB << 2) + +(gB << 1) + gB + gA) >> 3) & 0x0000FF00;
break;
case 2:
rbA = (((rbB << 1) + rbB + rbA) >> 2) & 0x00FF00FF;
gA = (((gB << 1) + gB + gA) >> 2) & 0x0000FF00;
break;
case 3:
rbA = (((rbB << 2) + rbB + (rbA << 1) + rbA) >> 3) & 0x00FF00FF;
gA = (((gB << 2) + gB + (gA << 1) + gA) >> 3) & 0x0000FF00;
break;
case 4:
rbA = ((rbA + rbB) >> 1) & 0x00FF00FF;
gA = ((gA + gB) >> 1) & 0x0000FF00;
break;
case 5:
rbA = (((rbB << 1) + rbB + (rbA << 2) + rbA) >> 3) & 0x00FF00FF;
gA = (((gB << 1) + gB + (gA << 2) + gA) >> 3) & 0x0000FF00;
break;
case 6:
rbA = (((rbA << 1) + rbA + rbB) >> 2) & 0x00FF00FF;
gA = (((gA << 1) + gA + gB) >> 2) & 0x0000FF00;
break;
case 7:
rbA = (((rbA << 2) + (rbA << 1) + rbA + rbB) >> 3) & 0x00FF00FF;
gA = (((gA << 2) + (gA << 1) + gA + gB) >> 3) & 0x0000FF00;
break;
}
return 0xFF000000 | rbA | gA;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "getScreenImage", 
function (isImageWrite) {
{
var obj = this.platform.bufferedImage; if (isImageWrite) {
this.releaseBuffers(); } return obj;
}}, "~B");
Clazz.overrideMethod (c$, "applyAnaglygh", 
function (stereoMode, stereoColors) {
switch (stereoMode) {
case J.c.STER.REDCYAN:
for (var i = this.anaglyphLength; --i >= 0; ) {
var blue = this.anaglyphChannelBytes[i] & 0x000000FF;
var cyan = (blue << 8) | blue;
this.pbuf[i] = this.pbuf[i] & 0xFFFF0000 | cyan;
}
break;
case J.c.STER.CUSTOM:
var color1 = stereoColors[0];
var color2 = stereoColors[1] & 0x00FFFFFF;
for (var i = this.anaglyphLength; --i >= 0; ) {
var a = this.anaglyphChannelBytes[i] & 0x000000FF;
a = (a | ((a | (a << 8)) << 8)) & color2;
this.pbuf[i] = (this.pbuf[i] & color1) | a;
}
break;
case J.c.STER.REDBLUE:
for (var i = this.anaglyphLength; --i >= 0; ) {
var blue = this.anaglyphChannelBytes[i] & 0x000000FF;
this.pbuf[i] = (this.pbuf[i] & 0xFFFF0000) | blue;
}
break;
case J.c.STER.REDGREEN:
for (var i = this.anaglyphLength; --i >= 0; ) {
var green = (this.anaglyphChannelBytes[i] & 0x000000FF) << 8;
this.pbuf[i] = (this.pbuf[i] & 0xFFFF0000) | green;
}
break;
case J.c.STER.DTI:
case J.c.STER.DOUBLE:
case J.c.STER.NONE:
break;
}
}, "J.c.STER,~A");
Clazz.overrideMethod (c$, "snapshotAnaglyphChannelBytes", 
function () {
if (this.currentlyRendering) throw  new NullPointerException ();
this.anaglyphLength = this.windowWidth * this.windowHeight;
if (this.anaglyphChannelBytes == null || this.anaglyphChannelBytes.length != this.anaglyphLength) this.anaglyphChannelBytes =  Clazz.newByteArray (this.anaglyphLength, 0);
for (var i = this.anaglyphLength; --i >= 0; ) this.anaglyphChannelBytes[i] = this.pbuf[i];

});
Clazz.overrideMethod (c$, "releaseScreenImage", 
function () {
this.platform.clearScreenBufferThreaded ();
});
Clazz.overrideMethod (c$, "haveTranslucentObjects", 
function () {
return this.$haveTranslucentObjects;
});
Clazz.overrideMethod (c$, "setSlabAndZShade", 
function (slabValue, depthValue, zSlab, zDepth, zShadePower) {
this.setSlab (slabValue);
this.setDepth (depthValue);
if (zSlab < zDepth) {
if (this.pixelShaded == null) this.pixelShaded =  new J.g3d.PixelatorShaded (this);
this.pixel = this.pixelShaded.set (zSlab, zDepth, zShadePower);
} else {
this.pixel = this.pixel0;
}}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "downsampleFullSceneAntialiasing", 
 function (downsampleZBuffer) {
var bgcheck = this.bgcolor;
if (downsampleZBuffer) bgcheck += ((bgcheck & 0xFF) == 0xFF ? -1 : 1);
J.g3d.Graphics3D.downsample2d (this.pbuf, this.windowWidth, this.windowHeight, bgcheck);
if (downsampleZBuffer) {
J.g3d.Graphics3D.downsample2dZ (this.pbuf, this.zbuf, this.windowWidth, this.windowHeight, bgcheck);
this.antialiasThisFrame = false;
this.setWidthHeight (false);
}}, "~B");
c$.downsample2d = Clazz.defineMethod (c$, "downsample2d", 
function (pbuf, width, height, bgcheck) {
var width4 = width << 1;
if (bgcheck != 0) {
bgcheck &= 0xFFFFFF;
for (var i = pbuf.length; --i >= 0; ) if (pbuf[i] == 0) pbuf[i] = bgcheck;

}var bg0 = ((bgcheck >> 2) & 0x3F3F3F3F) << 2;
bg0 += (bg0 & 0xC0C0C0C0) >> 6;
var offset1 = 0;
var offset4 = 0;
for (var i = height; --i >= 0; offset4 += width4) for (var j = width; --j >= 0; ++offset1) {
var argb = ((pbuf[offset4] >> 2) & 0x3F3F3F3F) + ((pbuf[offset4++ + width4] >> 2) & 0x3F3F3F3F) + ((pbuf[offset4] >> 2) & 0x3F3F3F3F) + ((pbuf[offset4++ + width4] >> 2) & 0x3F3F3F3F);
argb += (argb & 0xC0C0C0C0) >> 6;
if (argb == bg0) argb = bgcheck;
{
pbuf[offset1] = argb & 0x00FFFFFF | 0xFF000000;
}}

}, "~A,~N,~N,~N");
c$.downsample2dZ = Clazz.defineMethod (c$, "downsample2dZ", 
 function (pbuf, zbuf, width, height, bgcheck) {
var width4 = width << 1;
var offset1 = 0;
var offset4 = 0;
for (var i = height; --i >= 0; offset4 += width4) for (var j = width; --j >= 0; ++offset1, ++offset4) {
var z = Math.min (zbuf[offset4], zbuf[offset4 + width4]);
z = Math.min (z, zbuf[++offset4]);
z = Math.min (z, zbuf[offset4 + width4]);
if (z != 2147483647) z >>= 1;
zbuf[offset1] = (pbuf[offset1] == bgcheck ? 2147483647 : z);
}

}, "~A,~A,~N,~N,~N");
Clazz.defineMethod (c$, "hasContent", 
function () {
return this.platform.hasContent ();
});
Clazz.overrideMethod (c$, "setC", 
function (colix) {
var isLast = JU.C.isColixLastAvailable (colix);
if (!isLast && colix == this.colixCurrent && this.currentShadeIndex == -1) return true;
var mask = colix & 30720;
if (mask == 16384) return false;
if (this.renderLow) mask = 0;
var isTranslucent = (mask != 0);
var isScreened = (isTranslucent && mask == 30720);
this.setScreened (isScreened);
if (!this.checkTranslucent (isTranslucent && !isScreened)) return false;
if (this.isPass2) {
this.translucencyMask = (mask << 13) | 0xFFFFFF;
this.translucencyLog = mask >> 11;
} else {
this.translucencyLog = 0;
}this.colixCurrent = colix;
if (isLast) {
if (this.argbCurrent != this.lastRawColor) {
if (this.argbCurrent == 0) this.argbCurrent = 0xFFFFFFFF;
this.lastRawColor = this.argbCurrent;
this.shader.setLastColix (this.argbCurrent, this.inGreyscaleMode);
}}this.shadesCurrent = this.getShades (colix);
this.currentShadeIndex = -1;
this.setColor (this.getColorArgbOrGray (colix));
return true;
}, "~N");
Clazz.defineMethod (c$, "setScreened", 
function (isScreened) {
if (this.wasScreened != isScreened) {
this.wasScreened = isScreened;
if (isScreened) {
if (this.pixelScreened == null) this.pixelScreened =  new J.g3d.PixelatorScreened (this, this.pixel0);
if (this.pixel.p0 == null) this.pixel = this.pixelScreened;
 else this.pixel.p0 = this.pixelScreened;
} else if (this.pixel.p0 == null || this.pixel === this.pixelScreened) {
this.pixel = (this.isPass2 ? this.pixelT0 : this.pixel0);
} else {
this.pixel.p0 = (this.isPass2 ? this.pixelT0 : this.pixel0);
}}return this.pixel;
}, "~B");
Clazz.overrideMethod (c$, "drawFilledCircle", 
function (colixRing, colixFill, diameter, x, y, z) {
if (this.isClippedZ (z)) return;
var r = Clazz.doubleToInt ((diameter + 1) / 2);
var isClipped = x < r || x + r >= this.width || y < r || y + r >= this.height;
if (isClipped && this.isClippedXY (diameter, x, y)) return;
if (colixRing != 0 && this.setC (colixRing)) {
if (isClipped) {
if (!this.isClippedXY (diameter, x, y)) (this.circle3d).plotCircleCenteredClipped (x, y, z, diameter);
} else {
(this.circle3d).plotCircleCenteredUnclipped (x, y, z, diameter);
}}if (colixFill != 0 && this.setC (colixFill)) {
if (isClipped) (this.circle3d).plotFilledCircleCenteredClipped (x, y, z, diameter);
 else (this.circle3d).plotFilledCircleCenteredUnclipped (x, y, z, diameter);
}}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "volumeRender4", 
function (diameter, x, y, z) {
if (diameter == 1) {
this.plotPixelClippedArgb (this.argbCurrent, x, y, z, this.width, this.zbuf, this.pixel);
return;
}if (this.isClippedZ (z)) return;
var r = Clazz.doubleToInt ((diameter + 1) / 2);
var isClipped = x < r || x + r >= this.width || y < r || y + r >= this.height;
if (isClipped && this.isClippedXY (diameter, x, y)) return;
if (isClipped) (this.circle3d).plotFilledCircleCenteredClipped (x, y, z, diameter);
 else (this.circle3d).plotFilledCircleCenteredUnclipped (x, y, z, diameter);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillSphereXYZ", 
function (diameter, x, y, z) {
switch (diameter) {
case 1:
this.plotPixelClippedArgb (this.argbCurrent, x, y, z, this.width, this.zbuf, this.pixel);
return;
case 0:
return;
}
if (diameter <= (this.antialiasThisFrame ? 2000 : 1000)) this.sphere3d.render (this.shadesCurrent, diameter, x, y, z, null, null, null, -1, null);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "volumeRender", 
function (TF) {
if (TF) {
this.saveAmbient = this.getAmbientPercent ();
this.saveDiffuse = this.getDiffusePercent ();
this.setAmbientPercent (100);
this.setDiffusePercent (0);
this.addRenderer (1073741880);
} else {
this.setAmbientPercent (this.saveAmbient);
this.setDiffusePercent (this.saveDiffuse);
}}, "~B");
Clazz.overrideMethod (c$, "fillSphereI", 
function (diameter, center) {
this.fillSphereXYZ (diameter, center.x, center.y, center.z);
}, "~N,JU.P3i");
Clazz.overrideMethod (c$, "fillSphereBits", 
function (diameter, center) {
this.fillSphereXYZ (diameter, Math.round (center.x), Math.round (center.y), Math.round (center.z));
}, "~N,JU.P3");
Clazz.overrideMethod (c$, "fillEllipsoid", 
function (center, points, x, y, z, diameter, mToEllipsoidal, coef, mDeriv, selectedOctant, octantPoints) {
switch (diameter) {
case 1:
this.plotPixelClippedArgb (this.argbCurrent, x, y, z, this.width, this.zbuf, this.pixel);
return;
case 0:
return;
}
if (diameter <= (this.antialiasThisFrame ? 2000 : 1000)) this.sphere3d.render (this.shadesCurrent, diameter, x, y, z, mToEllipsoidal, coef, mDeriv, selectedOctant, octantPoints);
}, "JU.P3,~A,~N,~N,~N,~N,JU.M3,~A,JU.M4,~N,~A");
Clazz.overrideMethod (c$, "drawRect", 
function (x, y, z, zSlab, rWidth, rHeight) {
if (zSlab != 0 && this.isClippedZ (zSlab)) return;
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
if (w < 0) {
x += w;
w = -w;
}if (x < 0) {
w += x;
x = 0;
}if (x + w >= this.width) w = this.width - 1 - x;
var p = this.pixel;
var c = this.argbCurrent;
var offset = x + this.width * y;
for (var i = 0; i <= w; i++) {
if (z < this.zbuf[offset]) p.addPixel (offset, z, c);
offset++;
}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawVLine", 
 function (x, y, z, h) {
if (h < 0) {
y += h;
h = -h;
}if (y < 0) {
h += y;
y = 0;
}if (y + h >= this.height) {
h = this.height - 1 - y;
}var offset = x + this.width * y;
var p = this.pixel;
var c = this.argbCurrent;
for (var i = 0; i <= h; i++) {
if (z < this.zbuf[offset]) p.addPixel (offset, z, c);
offset += this.width;
}
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillTextRect", 
function (x, y, z, zSlab, widthFill, heightFill) {
if (this.isClippedZ (zSlab)) return;
var w = this.width;
if (x < 0) {
widthFill += x;
if (widthFill <= 0) return;
x = 0;
}if (x + widthFill > w) {
widthFill = w - x;
if (widthFill <= 0) return;
}if (y < 0) {
heightFill += y;
if (heightFill <= 0) return;
y = 0;
}if (y + heightFill > this.height) heightFill = this.height - y;
var c = this.argbCurrent;
var zb = this.zbuf;
var p = this.pixel;
while (--heightFill >= 0) this.plotPixelsUnclippedCount (c, widthFill, x, y++, z, w, zb, p);

}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawString", 
function (str, font3d, xBaseline, yBaseline, z, zSlab, bgColix) {
this.currentShadeIndex = 0;
if (str == null) return;
if (this.isClippedZ (zSlab)) return;
this.drawStringNoSlab (str, font3d, xBaseline, yBaseline, z, bgColix);
}, "~S,JU.Font,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawStringNoSlab", 
function (str, font3d, xBaseline, yBaseline, z, bgColix) {
if (str == null) return;
if (this.strings == null) this.strings =  new Array (10);
if (this.stringCount == this.strings.length) this.strings = JU.AU.doubleLength (this.strings);
var t =  new J.g3d.TextString ();
t.setText (str, font3d == null ? this.currentFont : (this.currentFont = font3d), this.argbCurrent, JU.C.isColixTranslucent (bgColix) ? (this.getColorArgbOrGray (bgColix) & 0xFFFFFF) | ((bgColix & 30720) << 13) : 0, xBaseline, yBaseline, z);
this.strings[this.stringCount++] = t;
}, "~S,JU.Font,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "renderAllStrings", 
function (jmolRenderer) {
if (this.strings == null) return;
if (this.stringCount >= 2) {
if (J.g3d.Graphics3D.sort == null) J.g3d.Graphics3D.sort =  new J.g3d.TextString ();
java.util.Arrays.sort (this.strings, J.g3d.Graphics3D.sort);
}for (var i = 0; i < this.stringCount; i++) {
var ts = this.strings[i];
this.plotText (ts.x, ts.y, ts.z, ts.argb, ts.bgargb, ts.text, ts.font, jmolRenderer);
}
this.strings = null;
this.stringCount = 0;
}, "~O");
Clazz.overrideMethod (c$, "plotText", 
function (x, y, z, argb, bgargb, text, font3d, jmolRenderer) {
J.g3d.TextRenderer.plot (x, y, z, argb, bgargb, text, font3d, this, jmolRenderer, this.antialiasThisFrame);
}, "~N,~N,~N,~N,~N,~S,JU.Font,J.api.JmolRendererInterface");
Clazz.overrideMethod (c$, "drawImage", 
function (objImage, x, y, z, zSlab, bgcolix, width, height) {
if (objImage != null && width > 0 && height > 0 && !this.isClippedZ (zSlab)) this.plotImage (x, y, z, objImage, null, bgcolix, width, height);
}, "~O,~N,~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "plotImage", 
function (x, y, z, image, jmolRenderer, bgcolix, imageWidth, imageHeight) {
this.setC (bgcolix);
if (!this.isPass2) this.translucencyMask = -1;
if (bgcolix == 0) this.argbCurrent = 0;
var isBackground = (x == -2147483648);
var bg = (isBackground ? this.bgcolor : this.argbCurrent);
if (isBackground) {
x = 0;
z = 2147483646;
imageWidth = this.width;
imageHeight = this.height;
}if (x + imageWidth <= 0 || x >= this.width || y + imageHeight <= 0 || y >= this.height) return;
var g;
{
g = null;
}var buffer = this.apiPlatform.drawImageToBuffer (g, this.platform.offscreenImage, image, imageWidth, imageHeight, isBackground ? bg : 0);
if (buffer == null) return;
var zb = this.zbuf;
var w = this.width;
var p = this.pixel;
var h = this.height;
var t = this.translucencyLog;
if (jmolRenderer == null && (x >= 0 && x + imageWidth <= w && y >= 0 && y + imageHeight <= h)) {
for (var i = 0, offset = 0, pbufOffset = y * w + x; i < imageHeight; i++, pbufOffset += (w - imageWidth)) {
for (var j = 0; j < imageWidth; j++, offset++, pbufOffset++) {
if (z < zb[pbufOffset]) {
var b = buffer[offset];
if ((b & 0xFF000000) == (-16777216)) p.addPixel (pbufOffset, z, b);
}}
}
} else {
if (jmolRenderer == null) jmolRenderer = this;
for (var i = 0, offset = 0; i < imageHeight; i++) for (var j = 0; j < imageWidth; j++) {
var b = buffer[offset++];
if ((b & 0xFF000000) == (-16777216)) jmolRenderer.plotImagePixel (b, x + j, y + i, z, 8, bg, w, h, zb, p, t);
}

}}, "~N,~N,~N,~O,J.api.JmolRendererInterface,~N,~N,~N");
Clazz.overrideMethod (c$, "setFontFid", 
function (fid) {
this.currentFont = JU.Font.getFont3D (fid);
}, "~N");
Clazz.overrideMethod (c$, "setFont", 
function (font3d) {
this.currentFont = font3d;
}, "JU.Font");
Clazz.overrideMethod (c$, "drawPixel", 
function (x, y, z) {
this.plotPixelClippedArgb (this.argbCurrent, x, y, z, this.width, this.zbuf, this.pixel);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "drawPoints", 
function (count, coordinates, scale) {
if (scale > 1) {
var s2 = scale * scale * 0.8;
for (var i = -scale; i < scale; i++) {
for (var j = -scale; j < scale; j++) {
if (i * i + j * j > s2) continue;
this.plotPoints (count, coordinates, i, j);
this.plotPoints (count, coordinates, i, j);
}
}
} else {
this.plotPoints (count, coordinates, 0, 0);
}}, "~N,~A,~N");
Clazz.overrideMethod (c$, "drawDashedLineBits", 
function (run, rise, pointA, pointB) {
if (this.isAntialiased ()) {
run += run;
rise += rise;
}this.setScreeni (pointA, this.sA);
this.setScreeni (pointB, this.sB);
this.line3d.plotLineBits (this.argbCurrent, this.argbCurrent, this.sA, this.sB, run, rise, true);
if (this.isAntialiased ()) {
if (Math.abs (pointA.x - pointB.x) < Math.abs (pointA.y - pointB.y)) {
this.sA.x += 1;
this.sB.x += 1;
this.line3d.plotLineBits (this.argbCurrent, this.argbCurrent, this.sA, this.sB, run, rise, true);
} else {
this.sA.y += 1;
this.sB.y += 1;
this.line3d.plotLineBits (this.argbCurrent, this.argbCurrent, this.sA, this.sB, run, rise, true);
}}}, "~N,~N,JU.P3,JU.P3");
Clazz.defineMethod (c$, "setScreeni", 
 function (pt, p) {
p.x = Math.round (pt.x);
p.y = Math.round (pt.y);
p.z = Math.round (pt.z);
}, "JU.P3,JU.P3i");
Clazz.overrideMethod (c$, "drawLineXYZ", 
function (x1, y1, z1, x2, y2, z2) {
this.line3d.plotLineOld (this.argbCurrent, this.argbCurrent, x1, y1, z1, x2, y2, z2);
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawLine", 
function (colixA, colixB, x1, y1, z1, x2, y2, z2) {
if (!this.setC (colixA)) colixA = 0;
var argbA = this.argbCurrent;
if (!this.setC (colixB)) colixB = 0;
if (colixA != 0 || colixB != 0) this.line3d.plotLineOld (argbA, this.argbCurrent, x1, y1, z1, x2, y2, z2);
}, "~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawLineBits", 
function (colixA, colixB, pointA, pointB) {
if (!this.setC (colixA)) colixA = 0;
var argbA = this.argbCurrent;
if (!this.setC (colixB)) colixB = 0;
if (colixA != 0 || colixB != 0) {
this.setScreeni (pointA, this.sA);
this.setScreeni (pointB, this.sB);
this.line3d.plotLineBits (argbA, this.argbCurrent, this.sA, this.sB, 0, 0, false);
}}, "~N,~N,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "drawLineAB", 
function (pointA, pointB) {
this.setScreeni (pointA, this.sA);
this.setScreeni (pointB, this.sB);
this.line3d.plotLineBits (this.argbCurrent, this.argbCurrent, this.sA, this.sB, 0, 0, false);
}, "JU.P3,JU.P3");
Clazz.overrideMethod (c$, "fillCylinderXYZ", 
function (colixA, colixB, endcaps, diameter, xA, yA, zA, xB, yB, zB) {
if (diameter > this.ht3) return;
var screen = 0;
this.currentShadeIndex = 0;
if (!this.setC (colixB)) colixB = 0;
if (this.wasScreened) screen = 2;
if (!this.setC (colixA)) colixA = 0;
if (this.wasScreened) screen += 1;
if (colixA == 0 && colixB == 0) return;
this.cylinder3d.renderOld (colixA, colixB, screen, endcaps, diameter, xA, yA, zA, xB, yB, zB);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillCylinderScreen3I", 
function (endcaps, diameter, screenA, screenB, pt0f, pt1f, radius) {
if (diameter <= this.ht3) this.cylinder3d.renderOld (this.colixCurrent, this.colixCurrent, 0, endcaps, diameter, Clazz.floatToInt (screenA.x), Clazz.floatToInt (screenA.y), Clazz.floatToInt (screenA.z), Clazz.floatToInt (screenB.x), Clazz.floatToInt (screenB.y), Clazz.floatToInt (screenB.z));
}, "~N,~N,JU.P3,JU.P3,JU.P3,JU.P3,~N");
Clazz.overrideMethod (c$, "fillCylinder", 
function (endcaps, diameter, screenA, screenB) {
if (diameter <= this.ht3) this.cylinder3d.renderOld (this.colixCurrent, this.colixCurrent, 0, endcaps, diameter, screenA.x, screenA.y, screenA.z, screenB.x, screenB.y, screenB.z);
}, "~N,~N,JU.P3i,JU.P3i");
Clazz.overrideMethod (c$, "fillCylinderBits", 
function (endcaps, diameter, screenA, screenB) {
if (diameter <= this.ht3 && screenA.z != 1 && screenB.z != 1) {
if (diameter == 0 || diameter == 1) {
this.setScreeni (screenA, this.sA);
this.setScreeni (screenB, this.sB);
this.line3d.plotLineBits (this.getColorArgbOrGray (this.colixCurrent), this.getColorArgbOrGray (this.colixCurrent), this.sA, this.sB, 0, 0, false);
return;
}this.cylinder3d.renderBitsFloat (this.colixCurrent, this.colixCurrent, 0, endcaps, diameter, screenA, screenB);
}}, "~N,~N,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "fillCylinderBits2", 
function (colixA, colixB, endcaps, diameter, screenA, screenB) {
if (diameter > this.ht3) return;
var screen = 0;
this.currentShadeIndex = 0;
if (!this.setC (colixB)) colixB = 0;
if (this.wasScreened) screen = 2;
if (!this.setC (colixA)) colixA = 0;
if (this.wasScreened) screen += 1;
if (colixA == 0 && colixB == 0) return;
this.setScreeni (screenA, this.sA);
this.setScreeni (screenB, this.sB);
this.cylinder3d.renderBits (colixA, colixB, screen, endcaps, diameter, this.sA, this.sB);
}, "~N,~N,~N,~N,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "fillConeScreen3f", 
function (endcap, screenDiameter, screenBase, screenTip, isBarb) {
if (screenDiameter <= this.ht3) this.cylinder3d.renderConeOld (this.colixCurrent, endcap, screenDiameter, screenBase.x, screenBase.y, screenBase.z, screenTip.x, screenTip.y, screenTip.z, true, isBarb);
}, "~N,~N,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "drawHermite4", 
function (tension, s0, s1, s2, s3) {
(this.hermite3d).renderHermiteRope (false, tension, 0, 0, 0, s0, s1, s2, s3);
}, "~N,JU.P3,JU.P3,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "drawHermite7", 
function (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, colixBack) {
if (colixBack == 0) {
(this.hermite3d).renderHermiteRibbon (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, 0);
return;
}(this.hermite3d).renderHermiteRibbon (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, 1);
var colix = this.colixCurrent;
this.setC (colixBack);
(this.hermite3d).renderHermiteRibbon (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, -1);
this.setC (colix);
}, "~B,~B,~N,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,JU.P3,~N,~N");
Clazz.overrideMethod (c$, "fillHermite", 
function (tension, diameterBeg, diameterMid, diameterEnd, s0, s1, s2, s3) {
(this.hermite3d).renderHermiteRope (true, tension, diameterBeg, diameterMid, diameterEnd, s0, s1, s2, s3);
}, "~N,~N,~N,~N,JU.P3,JU.P3,JU.P3,JU.P3");
Clazz.overrideMethod (c$, "drawTriangle3C", 
function (screenA, colixA, screenB, colixB, screenC, colixC, check) {
if ((check & 1) == 1) this.drawLine (colixA, colixB, screenA.x, screenA.y, screenA.z, screenB.x, screenB.y, screenB.z);
if ((check & 2) == 2) this.drawLine (colixB, colixC, screenB.x, screenB.y, screenB.z, screenC.x, screenC.y, screenC.z);
if ((check & 4) == 4) this.drawLine (colixA, colixC, screenA.x, screenA.y, screenA.z, screenC.x, screenC.y, screenC.z);
}, "JU.P3i,~N,JU.P3i,~N,JU.P3i,~N,~N");
Clazz.overrideMethod (c$, "fillTriangleTwoSided", 
function (normix, screenA, screenB, screenC) {
this.setColorNoisy (this.getShadeIndex (normix));
this.fillTriangleP3f (screenA, screenB, screenC, false);
}, "~N,JU.P3,JU.P3,JU.P3");
Clazz.defineMethod (c$, "fillTriangleP3f", 
 function (screenA, screenB, screenC, useGouraud) {
this.setScreeni (screenA, this.sA);
this.setScreeni (screenB, this.sB);
this.setScreeni (screenC, this.sC);
(this.triangle3d).fillTriangle (this.sA, this.sB, this.sC, useGouraud);
}, "JU.P3,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "fillTriangle3f", 
function (screenA, screenB, screenC, isSolid) {
var i = this.getShadeIndexP3 (screenA, screenB, screenC, isSolid);
if (i < 0) return;
if (isSolid) this.setColorNoisy (i);
 else this.setColor (this.shadesCurrent[i]);
this.fillTriangleP3f (screenA, screenB, screenC, false);
}, "JU.P3,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "fillTriangle3i", 
function (screenA, screenB, screenC, ptA, ptB, ptC, doShade) {
if (doShade) {
var v = this.vectorAB;
v.set (screenB.x - screenA.x, screenB.y - screenA.y, screenB.z - screenA.z);
var shadeIndex;
if (screenC == null) {
shadeIndex = this.shader.getShadeIndex (-v.x, -v.y, v.z);
} else {
this.vectorAC.set (screenC.x - screenA.x, screenC.y - screenA.y, screenC.z - screenA.z);
v.cross (v, this.vectorAC);
shadeIndex = v.z >= 0 ? this.shader.getShadeIndex (-v.x, -v.y, v.z) : this.shader.getShadeIndex (v.x, v.y, -v.z);
}if (shadeIndex > 56) shadeIndex = 56;
this.setColorNoisy (shadeIndex);
}this.fillTriangleP3f (screenA, screenB, screenC, false);
}, "JU.P3,JU.P3,JU.P3,JU.T3,JU.T3,JU.T3,~B");
Clazz.overrideMethod (c$, "fillTriangle3CN", 
function (screenA, colixA, normixA, screenB, colixB, normixB, screenC, colixC, normixC) {
(this.triangle3d).fillTriangle (screenA, screenB, screenC, this.checkGouraud (colixA, colixB, colixC, normixA, normixB, normixC));
}, "JU.P3i,~N,~N,JU.P3i,~N,~N,JU.P3i,~N,~N");
Clazz.overrideMethod (c$, "fillTriangle3CNBits", 
function (screenA, colixA, normixA, screenB, colixB, normixB, screenC, colixC, normixC, twoSided) {
this.fillTriangleP3f (screenA, screenB, screenC, this.checkGouraud (colixA, colixB, colixC, normixA, normixB, normixC));
}, "JU.P3,~N,~N,JU.P3,~N,~N,JU.P3,~N,~N,~B");
Clazz.defineMethod (c$, "checkGouraud", 
 function (colixA, colixB, colixC, normixA, normixB, normixC) {
if (!this.isPass2 && normixA == normixB && normixA == normixC && colixA == colixB && colixA == colixC) {
var shadeIndex = this.getShadeIndex (normixA);
if (colixA != this.colixCurrent || this.currentShadeIndex != shadeIndex) {
this.currentShadeIndex = -1;
this.setC (colixA);
this.setColorNoisy (shadeIndex);
}return false;
}this.setTriangleTranslucency (colixA, colixB, colixC);
(this.triangle3d).setGouraud (this.getShades (colixA)[this.getShadeIndex (normixA)], this.getShades (colixB)[this.getShadeIndex (normixB)], this.getShades (colixC)[this.getShadeIndex (normixC)]);
return true;
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getShadeIndex", 
function (normix) {
return (normix == -10000 || normix == 9999 ? J.g3d.Graphics3D.nullShadeIndex : normix < 0 ? this.shadeIndexes2Sided[~normix] : this.shadeIndexes[normix]);
}, "~N");
Clazz.defineMethod (c$, "setTriangleTranslucency", 
 function (colixA, colixB, colixC) {
if (this.isPass2) {
var maskA = colixA & 30720;
var maskB = colixB & 30720;
var maskC = colixC & 30720;
maskA &= -16385;
maskB &= -16385;
maskC &= -16385;
var mask = JU.GData.roundInt (Clazz.doubleToInt ((maskA + maskB + maskC) / 3)) & 30720;
this.translucencyMask = (mask << 13) | 0xFFFFFF;
}}, "~N,~N,~N");
Clazz.overrideMethod (c$, "fillQuadrilateral", 
function (screenA, screenB, screenC, screenD, isSolid) {
var i = this.getShadeIndexP3 (screenA, screenB, screenC, isSolid);
if (i < 0) return;
this.setColorNoisy (i);
this.fillTriangleP3f (screenA, screenB, screenC, false);
this.fillTriangleP3f (screenA, screenC, screenD, false);
}, "JU.P3,JU.P3,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "drawSurface", 
function (meshSurface, colix) {
}, "JU.MeshSurface,~N");
Clazz.overrideMethod (c$, "plotPixelClippedP3i", 
function (screen) {
this.plotPixelClippedArgb (this.argbCurrent, screen.x, screen.y, screen.z, this.width, this.zbuf, this.pixel);
}, "JU.P3i");
Clazz.defineMethod (c$, "plotPixelClippedArgb", 
function (argb, x, y, z, width, zbuf, p) {
if (this.isClipped3 (x, y, z)) return;
var offset = y * width + x;
if (z < zbuf[offset]) p.addPixel (offset, z, argb);
}, "~N,~N,~N,~N,~N,~A,J.g3d.Pixelator");
Clazz.defineMethod (c$, "plotPixelUnclipped", 
function (argb, x, y, z, width, zbuf, p) {
var offset = y * width + x;
if (z < zbuf[offset]) p.addPixel (offset, z, argb);
}, "~N,~N,~N,~N,~N,~A,J.g3d.Pixelator");
Clazz.defineMethod (c$, "plotImagePixel", 
function (argb, x, y, z, shade, bgargb, width, height, zbuf, p, transpLog) {
if (x < 0 || x >= width || y < 0 || y >= height) return;
(p).addImagePixel (shade, transpLog, y * width + x, z, argb, bgargb);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~A,~O,~N");
Clazz.defineMethod (c$, "plotPixelsClippedRaster", 
function (count, x, y, zAtLeft, zPastRight, rgb16Left, rgb16Right) {
var depth;
var slab;
if (count <= 0 || y < 0 || y >= this.height || x >= this.width || (zAtLeft < (slab = this.slab) && zPastRight < slab) || (zAtLeft > (depth = this.depth) && zPastRight > depth)) return;
var zb = this.zbuf;
var seed = (x << 16) + (y << 1) ^ 0x33333333;
var zScaled = (zAtLeft << 10) + (512);
var dz = zPastRight - zAtLeft;
var roundFactor = Clazz.doubleToInt (count / 2);
var zIncrementScaled = JU.GData.roundInt (Clazz.doubleToInt (((dz << 10) + (dz >= 0 ? roundFactor : -roundFactor)) / count));
if (x < 0) {
x = -x;
zScaled += zIncrementScaled * x;
count -= x;
if (count <= 0) return;
x = 0;
}if (count + x > this.width) count = this.width - x;
var offsetPbuf = y * this.width + x;
var p = this.pixel;
if (rgb16Left == null) {
var adn = this.argbNoisyDn;
var aup = this.argbNoisyUp;
var ac = this.argbCurrent;
while (--count >= 0) {
var z = zScaled >> 10;
if (z >= slab && z <= depth && z < zb[offsetPbuf]) {
seed = ((seed << 16) + (seed << 1) + seed) & 0x7FFFFFFF;
var bits = (seed >> 16) & 0x07;
p.addPixel (offsetPbuf, z, bits == 0 ? adn : (bits == 1 ? aup : ac));
}++offsetPbuf;
zScaled += zIncrementScaled;
}
} else {
var rScaled = rgb16Left.r << 8;
var rIncrement = Clazz.doubleToInt (((rgb16Right.r - rgb16Left.r) << 8) / count);
var gScaled = rgb16Left.g;
var gIncrement = Clazz.doubleToInt ((rgb16Right.g - gScaled) / count);
var bScaled = rgb16Left.b;
var bIncrement = Clazz.doubleToInt ((rgb16Right.b - bScaled) / count);
while (--count >= 0) {
var z = zScaled >> 10;
if (z >= slab && z <= depth && z < zb[offsetPbuf]) p.addPixel (offsetPbuf, z, 0xFF000000 | (rScaled & 0xFF0000) | (gScaled & 0xFF00) | ((bScaled >> 8) & 0xFF));
++offsetPbuf;
zScaled += zIncrementScaled;
rScaled += rIncrement;
gScaled += gIncrement;
bScaled += bIncrement;
}
}}, "~N,~N,~N,~N,~N,JU.Rgb16,JU.Rgb16");
Clazz.defineMethod (c$, "plotPixelsUnclippedRaster", 
function (count, x, y, zAtLeft, zPastRight, rgb16Left, rgb16Right) {
if (count <= 0) return;
var seed = ((x << 16) + (y << 1) ^ 0x33333333) & 0x7FFFFFFF;
var zScaled = (zAtLeft << 10) + (512);
var dz = zPastRight - zAtLeft;
var roundFactor = Clazz.doubleToInt (count / 2);
var zIncrementScaled = JU.GData.roundInt (Clazz.doubleToInt (((dz << 10) + (dz >= 0 ? roundFactor : -roundFactor)) / count));
var offsetPbuf = y * this.width + x;
var zb = this.zbuf;
var p = this.pixel;
if (rgb16Left == null) {
var adn = this.argbNoisyDn;
var aup = this.argbNoisyUp;
var ac = this.argbCurrent;
while (--count >= 0) {
var z = zScaled >> 10;
if (z < zb[offsetPbuf]) {
seed = ((seed << 16) + (seed << 1) + seed) & 0x7FFFFFFF;
var bits = (seed >> 16) & 0x07;
p.addPixel (offsetPbuf, z, bits == 0 ? adn : (bits == 1 ? aup : ac));
}++offsetPbuf;
zScaled += zIncrementScaled;
}
} else {
var rScaled = rgb16Left.r << 8;
var rIncrement = JU.GData.roundInt (Clazz.doubleToInt (((rgb16Right.r - rgb16Left.r) << 8) / count));
var gScaled = rgb16Left.g;
var gIncrement = JU.GData.roundInt (Clazz.doubleToInt ((rgb16Right.g - gScaled) / count));
var bScaled = rgb16Left.b;
var bIncrement = JU.GData.roundInt (Clazz.doubleToInt ((rgb16Right.b - bScaled) / count));
while (--count >= 0) {
var z = zScaled >> 10;
if (z < zb[offsetPbuf]) p.addPixel (offsetPbuf, z, 0xFF000000 | (rScaled & 0xFF0000) | (gScaled & 0xFF00) | ((bScaled >> 8) & 0xFF));
++offsetPbuf;
zScaled += zIncrementScaled;
rScaled += rIncrement;
gScaled += gIncrement;
bScaled += bIncrement;
}
}}, "~N,~N,~N,~N,~N,JU.Rgb16,JU.Rgb16");
Clazz.defineMethod (c$, "plotPixelsClippedRasterBits", 
function (count, x, y, zAtLeft, zPastRight, rgb16Left, rgb16Right, a, b) {
var depth;
var slab;
if (count <= 0 || y < 0 || y >= this.height || x >= this.width || (zAtLeft < (slab = this.slab) && zPastRight < slab) || (zAtLeft > (depth = this.depth) && zPastRight > depth)) return;
var zb = this.zbuf;
var seed = (x << 16) + (y << 1) ^ 0x33333333;
if (x < 0) {
x = -x;
count -= x;
if (count <= 0) return;
x = 0;
}if (count + x > this.width) count = this.width - x;
var offsetPbuf = y * this.width + x;
var p = this.pixel;
if (rgb16Left == null) {
var adn = this.argbNoisyDn;
var aup = this.argbNoisyUp;
var ac = this.argbCurrent;
while (--count >= 0) {
var zCurrent = this.line3d.getZCurrent (a, b, x++);
if (zCurrent >= slab && zCurrent <= depth && zCurrent < zb[offsetPbuf]) {
seed = ((seed << 16) + (seed << 1) + seed) & 0x7FFFFFFF;
var bits = (seed >> 16) & 0x07;
p.addPixel (offsetPbuf, zCurrent, bits < 2 ? adn : bits < 6 ? aup : ac);
}++offsetPbuf;
}
} else {
var rScaled = rgb16Left.r << 8;
var rIncrement = Clazz.doubleToInt (((rgb16Right.r - rgb16Left.r) << 8) / count);
var gScaled = rgb16Left.g;
var gIncrement = Clazz.doubleToInt ((rgb16Right.g - gScaled) / count);
var bScaled = rgb16Left.b;
var bIncrement = Clazz.doubleToInt ((rgb16Right.b - bScaled) / count);
while (--count >= 0) {
var zCurrent = this.line3d.getZCurrent (a, b, x++);
if (zCurrent >= slab && zCurrent <= depth && zCurrent < zb[offsetPbuf]) p.addPixel (offsetPbuf, zCurrent, 0xFF000000 | (rScaled & 0xFF0000) | (gScaled & 0xFF00) | ((bScaled >> 8) & 0xFF));
++offsetPbuf;
rScaled += rIncrement;
gScaled += gIncrement;
bScaled += bIncrement;
}
}}, "~N,~N,~N,~N,~N,JU.Rgb16,JU.Rgb16,~N,~N");
Clazz.defineMethod (c$, "plotPixelsUnclippedRasterBits", 
function (count, x, y, rgb16Left, rgb16Right, a, b) {
if (count <= 0) return;
var seed = ((x << 16) + (y << 1) ^ 0x33333333) & 0x7FFFFFFF;
var offsetPbuf = y * this.width + x;
var zb = this.zbuf;
var p = this.pixel;
if (rgb16Left == null) {
var adn = this.argbNoisyDn;
var aup = this.argbNoisyUp;
var ac = this.argbCurrent;
while (--count >= 0) {
var zCurrent = this.line3d.getZCurrent (a, b, x++);
if (zCurrent < zb[offsetPbuf]) {
seed = ((seed << 16) + (seed << 1) + seed) & 0x7FFFFFFF;
var bits = (seed >> 16) & 0x07;
var c = (bits == 0 ? adn : bits == 1 ? aup : ac);
p.addPixel (offsetPbuf, zCurrent, c);
}++offsetPbuf;
}
} else {
var rScaled = rgb16Left.r << 8;
var rIncrement = JU.GData.roundInt (Clazz.doubleToInt (((rgb16Right.r - rgb16Left.r) << 8) / count));
var gScaled = rgb16Left.g;
var gIncrement = JU.GData.roundInt (Clazz.doubleToInt ((rgb16Right.g - gScaled) / count));
var bScaled = rgb16Left.b;
var bIncrement = JU.GData.roundInt (Clazz.doubleToInt ((rgb16Right.b - bScaled) / count));
while (--count >= 0) {
var zCurrent = this.line3d.getZCurrent (a, b, x++);
if (zCurrent < zb[offsetPbuf]) p.addPixel (offsetPbuf, zCurrent, 0xFF000000 | (rScaled & 0xFF0000) | (gScaled & 0xFF00) | ((bScaled >> 8) & 0xFF));
++offsetPbuf;
rScaled += rIncrement;
gScaled += gIncrement;
bScaled += bIncrement;
}
}}, "~N,~N,~N,JU.Rgb16,JU.Rgb16,~N,~N");
Clazz.defineMethod (c$, "plotPixelsUnclippedCount", 
function (c, count, x, y, z, width, zbuf, p) {
var offsetPbuf = y * width + x;
while (--count >= 0) {
if (z < zbuf[offsetPbuf]) p.addPixel (offsetPbuf, z, c);
++offsetPbuf;
}
}, "~N,~N,~N,~N,~N,~N,~A,J.g3d.Pixelator");
Clazz.defineMethod (c$, "plotPoints", 
 function (count, coordinates, xOffset, yOffset) {
var p = this.pixel;
var c = this.argbCurrent;
var zb = this.zbuf;
var w = this.width;
var antialias = this.antialiasThisFrame;
for (var i = count * 3; i > 0; ) {
var z = coordinates[--i];
var y = coordinates[--i] + yOffset;
var x = coordinates[--i] + xOffset;
if (this.isClipped3 (x, y, z)) continue;
var offset = y * w + x++;
if (z < zb[offset]) p.addPixel (offset, z, c);
if (antialias) {
offset = y * w + x;
if (!this.isClipped3 (x, y, z) && z < zb[offset]) p.addPixel (offset, z, c);
offset = (++y) * w + x;
if (!this.isClipped3 (x, y, z) && z < zb[offset]) p.addPixel (offset, z, c);
offset = y * w + (--x);
if (!this.isClipped3 (x, y, z) && z < zb[offset]) p.addPixel (offset, z, c);
}}
}, "~N,~A,~N,~N");
Clazz.defineMethod (c$, "setColorNoisy", 
function (shadeIndex) {
this.currentShadeIndex = shadeIndex;
this.argbCurrent = this.shadesCurrent[shadeIndex];
this.argbNoisyUp = this.shadesCurrent[shadeIndex < 63 ? shadeIndex + 1 : 63];
this.argbNoisyDn = this.shadesCurrent[shadeIndex > 0 ? shadeIndex - 1 : 0];
}, "~N");
Clazz.defineMethod (c$, "getShadeIndexP3", 
 function (screenA, screenB, screenC, isSolid) {
this.vectorAB.sub2 (screenB, screenA);
this.vectorAC.sub2 (screenC, screenA);
var v = this.vectorNormal;
v.cross (this.vectorAB, this.vectorAC);
var i = (v.z < 0 ? this.shader.getShadeIndex (v.x, v.y, -v.z) : isSolid ? -1 : this.shader.getShadeIndex (-v.x, -v.y, v.z));
return i;
}, "JU.P3,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "renderBackground", 
function (jmolRenderer) {
if (this.backgroundImage != null) this.plotImage (-2147483648, 0, -2147483648, this.backgroundImage, jmolRenderer, 0, 0, 0);
}, "J.api.JmolRendererInterface");
Clazz.overrideMethod (c$, "drawAtom", 
function (atom, radius) {
this.fillSphereXYZ (atom.sD, atom.sX, atom.sY, atom.sZ);
}, "JM.Atom,~N");
Clazz.overrideMethod (c$, "getExportType", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getExportName", 
function () {
return null;
});
Clazz.defineMethod (c$, "canDoTriangles", 
function () {
return true;
});
Clazz.defineMethod (c$, "isCartesianExport", 
function () {
return false;
});
Clazz.overrideMethod (c$, "initializeExporter", 
function (vwr, privateKey, g3d, params) {
return null;
}, "JV.Viewer,~N,JU.GData,java.util.Map");
Clazz.overrideMethod (c$, "finalizeOutput", 
function () {
return null;
});
Clazz.overrideMethod (c$, "drawBond", 
function (atomA, atomB, colixA, colixB, endcaps, mad, bondOrder) {
}, "JU.P3,JU.P3,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawEllipse", 
function (ptAtom, ptX, ptY, fillArc, wireframeOnly) {
return false;
}, "JU.P3,JU.P3,JU.P3,~B,~B");
Clazz.defineMethod (c$, "getPrivateKey", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "clearFontCache", 
function () {
J.g3d.TextRenderer.clearFontCache ();
});
Clazz.defineMethod (c$, "setRotationMatrix", 
function (rotationMatrix) {
var vertexVectors = JU.Normix.getVertexVectors ();
for (var i = JU.GData.normixCount; --i >= 0; ) {
var tv = this.transformedVectors[i];
rotationMatrix.rotate2 (vertexVectors[i], tv);
this.shadeIndexes[i] = this.shader.getShadeB (tv.x, -tv.y, tv.z);
this.shadeIndexes2Sided[i] = (tv.z >= 0 ? this.shadeIndexes[i] : this.shader.getShadeB (-tv.x, tv.y, -tv.z));
}
}, "JU.M3");
Clazz.overrideMethod (c$, "renderCrossHairs", 
function (minMax, screenWidth, screenHeight, navOffset, navDepth) {
var antialiased = this.isAntialiased ();
this.setC (navDepth < 0 ? 10 : navDepth > 100 ? 11 : 23);
var x = Math.max (Math.min (this.width, Math.round (navOffset.x)), 0);
var y = Math.max (Math.min (this.height, Math.round (navOffset.y)), 0);
var z = Math.round (navOffset.z) + 1;
var off = (antialiased ? 8 : 4);
var h = (antialiased ? 20 : 10);
var w = (antialiased ? 2 : 1);
this.drawRect (x - off, y, z, 0, h, w);
this.drawRect (x, y - off, z, 0, w, h);
this.drawRect (x - off, y - off, z, 0, h, h);
off = h;
h = h >> 1;
this.setC (minMax[1] < navOffset.x ? 21 : 11);
this.drawRect (x - off, y, z, 0, h, w);
this.setC (minMax[0] > navOffset.x ? 21 : 11);
this.drawRect (x + h, y, z, 0, h, w);
this.setC (minMax[3] < navOffset.y ? 21 : 11);
this.drawRect (x, y - off, z, 0, w, h);
this.setC (minMax[2] > navOffset.y ? 21 : 11);
this.drawRect (x, y + h, z, 0, w, h);
}, "~A,~N,~N,JU.P3,~N");
Clazz.overrideMethod (c$, "initializeOutput", 
function (vwr, privateKey, params) {
return false;
}, "JV.Viewer,~N,java.util.Map");
Clazz.defineStatics (c$,
"sort", null,
"nullShadeIndex", 50);
});
