(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Clazz_declarePackage ("JM");
Clazz_load (null, "JM.Text", ["java.lang.Float", "JU.PT", "J.shape.Shape", "JU.C", "$.Font", "$.Txt", "JV.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.doFormatText = false;
this.font = null;
this.fid = 0;
this.ascent = 0;
this.descent = 0;
this.lineHeight = 0;
this.offsetX = 0;
this.offsetY = 0;
this.boxYoff2 = 0;
this.widths = null;
this.textWidth = 0;
this.textHeight = 0;
this.text = null;
this.textUnformatted = null;
this.lines = null;
this.image = null;
this.imageScale = 1;
this.xAdj = 0;
this.yAdj = 0;
this.y0 = 0;
this.pointerPt = null;
this.isMeasure = false;
this.isEcho = false;
this.xyz = null;
this.target = null;
this.script = null;
this.colix = 0;
this.bgcolix = 0;
this.pointer = 0;
this.fontScale = 0;
this.align = 0;
this.valign = 0;
this.atomX = 0;
this.atomY = 0;
this.atomZ = 2147483647;
this.movableX = 0;
this.movableY = 0;
this.movableZ = 0;
this.movableXPercent = 2147483647;
this.movableYPercent = 2147483647;
this.movableZPercent = 2147483647;
this.z = 1;
this.zSlab = -2147483648;
this.pymolOffset = null;
this.windowWidth = 0;
this.windowHeight = 0;
this.adjustForWindow = false;
this.boxWidth = 0;
this.boxHeight = 0;
this.boxX = 0;
this.boxY = 0;
this.modelIndex = -1;
this.visible = true;
this.hidden = false;
this.boxXY = null;
this.scalePixelsPerMicron = 0;
Clazz_instantialize (this, arguments);
}, JM, "Text");
Clazz_makeConstructor (c$, 
function () {
this.boxXY =  Clazz_newFloatArray (5, 0);
});
c$.newLabel = Clazz_defineMethod (c$, "newLabel", 
function (vwr, font, text, colix, bgcolix, align, scalePixelsPerMicron) {
var t =  new JM.Text ();
t.vwr = vwr;
t.set (font, colix, align, scalePixelsPerMicron);
t.setText (text);
t.bgcolix = bgcolix;
return t;
}, "JV.Viewer,JU.Font,~S,~N,~N,~N,~N");
c$.newMeasure = Clazz_defineMethod (c$, "newMeasure", 
function (vwr, font, colix) {
var t =  new JM.Text ();
t.vwr = vwr;
t.set (font, colix, 0, 0);
t.isMeasure = true;
return t;
}, "JV.Viewer,JU.Font,~N");
c$.newEcho = Clazz_defineMethod (c$, "newEcho", 
function (vwr, font, target, colix, valign, align, scalePixelsPerMicron) {
var t =  new JM.Text ();
t.isEcho = true;
t.vwr = vwr;
t.set (font, colix, align, scalePixelsPerMicron);
t.target = target;
t.valign = valign;
t.z = 2;
t.zSlab = -2147483648;
return t;
}, "JV.Viewer,JU.Font,~S,~N,~N,~N,~N");
Clazz_defineMethod (c$, "set", 
 function (font, colix, align, scalePixelsPerMicron) {
this.scalePixelsPerMicron = scalePixelsPerMicron;
this.isEcho = this.isEcho;
this.colix = colix;
this.align = align;
this.setFont (font, !this.isEcho);
}, "JU.Font,~N,~N,~N");
Clazz_defineMethod (c$, "setOffset", 
function (offset) {
this.offsetX = JV.JC.getXOffset (offset);
this.offsetY = JV.JC.getYOffset (offset);
this.pymolOffset = null;
this.valign = 3;
}, "~N");
Clazz_defineMethod (c$, "getFontMetrics", 
 function () {
this.descent = this.font.getDescent ();
this.ascent = this.font.getAscent ();
this.lineHeight = this.ascent + this.descent;
});
Clazz_defineMethod (c$, "setFontFromFid", 
function (fid) {
if (this.fid == fid) return;
this.fontScale = 0;
this.setFont (JU.Font.getFont3D (fid), true);
}, "~N");
Clazz_defineMethod (c$, "setText", 
function (text) {
if (this.image != null) this.getFontMetrics ();
this.image = null;
if (text != null && text.length == 0) text = null;
if (this.text != null && this.text.equals (text)) return;
this.text = this.textUnformatted = text;
this.doFormatText = (this.isEcho && text != null && (text.indexOf ("%{") >= 0 || text.indexOf ("@{") >= 0));
if (!this.doFormatText) this.recalc ();
}, "~S");
Clazz_defineMethod (c$, "setImage", 
function (image) {
this.image = image;
this.recalc ();
}, "~O");
Clazz_defineMethod (c$, "setScale", 
function (scale) {
this.imageScale = scale;
this.recalc ();
}, "~N");
Clazz_defineMethod (c$, "setFont", 
function (f3d, doAll) {
this.font = f3d;
if (this.font == null) return;
this.getFontMetrics ();
if (!doAll) return;
this.fid = this.font.fid;
this.recalc ();
}, "JU.Font,~B");
Clazz_defineMethod (c$, "setFontScale", 
function (scale) {
if (this.fontScale == scale) return;
this.fontScale = scale;
if (this.fontScale != 0) this.setFont (this.vwr.gdata.getFont3DScaled (this.font, scale), true);
}, "~N");
Clazz_defineMethod (c$, "recalc", 
 function () {
if (this.image != null) {
this.textWidth = this.textHeight = 0;
this.boxWidth = this.vwr.apiPlatform.getImageWidth (this.image) * this.fontScale * this.imageScale;
this.boxHeight = this.vwr.apiPlatform.getImageHeight (this.image) * this.fontScale * this.imageScale;
this.ascent = 0;
return;
}if (this.text == null) {
this.text = null;
this.lines = null;
this.widths = null;
return;
}if (this.font == null) return;
this.lines = JU.PT.split (this.text, (this.text.indexOf ("\n") >= 0 ? "\n" : "|"));
this.textWidth = 0;
this.widths =  Clazz_newIntArray (this.lines.length, 0);
for (var i = this.lines.length; --i >= 0; ) this.textWidth = Math.max (this.textWidth, this.widths[i] = this.stringWidth (this.lines[i]));

this.textHeight = this.lines.length * this.lineHeight;
this.boxWidth = this.textWidth + (this.fontScale >= 2 ? 16 : 8);
this.boxHeight = this.textHeight + (this.fontScale >= 2 ? 16 : 8);
});
Clazz_defineMethod (c$, "setPosition", 
function (scalePixelsPerMicron, imageFontScaling, isAbsolute, boxXY) {
if (boxXY == null) boxXY = this.boxXY;
 else this.boxXY = boxXY;
this.setWindow (this.vwr.gdata.width, this.vwr.gdata.height, scalePixelsPerMicron);
if (scalePixelsPerMicron != 0 && this.scalePixelsPerMicron != 0) this.setFontScale (scalePixelsPerMicron / this.scalePixelsPerMicron);
 else if (this.fontScale != imageFontScaling) this.setFontScale (imageFontScaling);
if (this.doFormatText) {
this.text = (this.isEcho ? JU.Txt.formatText (this.vwr, this.textUnformatted) : this.textUnformatted);
this.recalc ();
}var dx = this.offsetX * imageFontScaling;
var dy = this.offsetY * imageFontScaling;
this.xAdj = (this.fontScale >= 2 ? 8 : 4);
this.yAdj = this.ascent - this.lineHeight + this.xAdj;
if (!this.isEcho || this.pymolOffset != null) {
boxXY[0] = this.movableX;
boxXY[1] = this.movableY;
if (this.pymolOffset != null && this.pymolOffset[0] != 2 && this.pymolOffset[0] != 3) {
var pixelsPerAngstrom = this.vwr.tm.scaleToScreen (this.z, 1000);
var pz = this.pymolOffset[3];
var dz = (pz < 0 ? -1 : 1) * Math.max (pz == 0 ? 0.5 : 0, Math.abs (pz) - 1) * pixelsPerAngstrom;
this.z -= Clazz_floatToInt (dz);
pixelsPerAngstrom = this.vwr.tm.scaleToScreen (this.z, 1000);
dx = this.getPymolXYOffset (this.pymolOffset[1], this.textWidth, pixelsPerAngstrom);
var dh = this.ascent - this.descent;
dy = -this.getPymolXYOffset (-this.pymolOffset[2], dh, pixelsPerAngstrom) - Clazz_doubleToInt ((this.textHeight + dh) / 2);
if (this.pymolOffset[0] == 1) {
dy -= this.descent;
}this.xAdj = (this.fontScale >= 2 ? 8 : 4);
this.yAdj = -this.descent;
boxXY[0] = this.movableX - this.xAdj;
boxXY[1] = this.movableY - this.yAdj;
isAbsolute = true;
this.boxYoff2 = -2;
} else {
this.boxYoff2 = 0;
}if (this.pymolOffset == null) switch (this.align) {
case 8:
dy = 0;
dx = 0;
break;
case 12:
boxXY[0] -= this.boxWidth;
case 4:
dy = 0;
}
JM.Text.setBoxXY (this.boxWidth, this.boxHeight, dx, dy, boxXY, isAbsolute);
} else {
this.setPos (this.fontScale);
}this.boxX = boxXY[0];
this.boxY = boxXY[1];
if (this.adjustForWindow) this.setBoxOffsetsInWindow (0, this.isEcho ? 0 : 16 * this.fontScale + this.lineHeight, this.boxY - this.textHeight);
this.y0 = this.boxY + this.yAdj;
if (this.isMeasure && this.align != 8) this.y0 += this.ascent + (this.lines.length - 1) / 2 * this.lineHeight;
}, "~N,~N,~B,~A");
Clazz_defineMethod (c$, "getPymolXYOffset", 
 function (off, width, ppa) {
var f = (off < -1 ? -1 : off > 1 ? 0 : (off - 1) / 2);
off = (off < -1 || off > 1 ? off + (off < 0 ? 1 : -1) : 0);
return f * width + off * ppa;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "setPos", 
 function (scale) {
var xLeft;
var xCenter;
var xRight;
var is3dEcho = (this.xyz != null);
if (this.valign == 3 || this.valign == 4) {
var x = (this.movableXPercent != 2147483647 ? Clazz_doubleToInt (this.movableXPercent * this.windowWidth / 100) : is3dEcho ? this.movableX : this.movableX * scale);
var offsetX = this.offsetX * scale;
xLeft = xRight = xCenter = x + offsetX;
} else {
xLeft = 5 * scale;
xCenter = Clazz_doubleToInt (this.windowWidth / 2);
xRight = this.windowWidth - xLeft;
}this.boxXY[0] = xLeft;
switch (this.align) {
case 8:
this.boxXY[0] = xCenter - this.boxWidth / 2;
break;
case 12:
this.boxXY[0] = xRight - this.boxWidth;
}
this.boxXY[1] = 0;
switch (this.valign) {
case 0:
break;
case 2:
this.boxXY[1] = Clazz_doubleToInt (this.windowHeight / 2);
break;
case 1:
this.boxXY[1] = this.windowHeight;
break;
default:
var y = (this.movableYPercent != 2147483647 ? Clazz_doubleToInt (this.movableYPercent * this.windowHeight / 100) : is3dEcho ? this.movableY : this.movableY * scale);
this.boxXY[1] = (is3dEcho ? y : (this.windowHeight - y)) + this.offsetY * scale;
}
if (this.align == 8) this.boxXY[1] -= (this.image != null ? this.boxHeight : this.xyz != null ? this.boxHeight : this.ascent - this.boxHeight) / 2;
 else if (this.image != null) this.boxXY[1] -= 0;
 else if (this.xyz != null) this.boxXY[1] -= Clazz_doubleToInt (this.ascent / 2);
}, "~N");
c$.setBoxXY = Clazz_defineMethod (c$, "setBoxXY", 
function (boxWidth, boxHeight, xOffset, yOffset, boxXY, isAbsolute) {
var xBoxOffset;
var yBoxOffset;
if (xOffset > 0 || isAbsolute) {
xBoxOffset = xOffset;
} else {
xBoxOffset = -boxWidth;
if (xOffset == 0) xBoxOffset /= 2;
 else xBoxOffset += xOffset;
}if (isAbsolute || yOffset > 0) {
yBoxOffset = -boxHeight - yOffset;
} else if (yOffset == 0) {
yBoxOffset = -boxHeight / 2;
} else {
yBoxOffset = -yOffset;
}boxXY[0] += xBoxOffset;
boxXY[1] += yBoxOffset;
boxXY[2] = boxWidth;
boxXY[3] = boxHeight;
}, "~N,~N,~N,~N,~A,~B");
Clazz_defineMethod (c$, "stringWidth", 
 function (str) {
var w = 0;
var f = 1;
var subscale = 1;
if (str == null) return 0;
if (str.indexOf ("<su") < 0 && str.indexOf ("<color") < 0) return this.font.stringWidth (str);
var len = str.length;
var s;
for (var i = 0; i < len; i++) {
if (str.charAt (i) == '<') {
if (i + 8 <= len && (str.substring (i, i + 7).equals ("<color ") || str.substring (i, i + 8).equals ("</color>"))) {
var i1 = str.indexOf (">", i);
if (i1 >= 0) {
i = i1;
continue;
}}if (i + 5 <= len && ((s = str.substring (i, i + 5)).equals ("<sub>") || s.equals ("<sup>"))) {
i += 4;
f = subscale;
continue;
}if (i + 6 <= len && ((s = str.substring (i, i + 6)).equals ("</sub>") || s.equals ("</sup>"))) {
i += 5;
f = 1;
continue;
}}w += this.font.stringWidth (str.substring (i, i + 1)) * f;
}
return w;
}, "~S");
Clazz_defineMethod (c$, "setXYA", 
function (xy, i) {
if (i == 0) {
xy[2] = this.boxX;
switch (this.align) {
case 8:
xy[2] += this.boxWidth / 2;
break;
case 12:
xy[2] += this.boxWidth - this.xAdj;
break;
default:
xy[2] += this.xAdj;
}
xy[0] = xy[2];
xy[1] = this.y0;
}switch (this.align) {
case 8:
xy[0] = xy[2] - Clazz_doubleToInt (this.widths[i] / 2);
break;
case 12:
xy[0] = xy[2] - this.widths[i];
}
xy[1] += this.lineHeight;
}, "~A,~N");
Clazz_defineMethod (c$, "appendFontCmd", 
function (s) {
s.append ("  " + J.shape.Shape.getFontCommand ("echo", this.font));
if (this.scalePixelsPerMicron > 0) s.append (" " + (10000 / this.scalePixelsPerMicron));
}, "JU.SB");
Clazz_defineMethod (c$, "setScalePixelsPerMicron", 
function (scalePixelsPerMicron) {
this.fontScale = 0;
this.scalePixelsPerMicron = scalePixelsPerMicron;
}, "~N");
Clazz_defineMethod (c$, "setXYZ", 
function (xyz, doAdjust) {
this.xyz = xyz;
if (xyz == null) this.zSlab = -2147483648;
if (doAdjust) {
this.valign = (xyz == null ? 3 : 4);
this.adjustForWindow = (xyz == null);
}}, "JU.P3,~B");
Clazz_defineMethod (c$, "setTranslucent", 
function (level, isBackground) {
if (isBackground) {
if (this.bgcolix != 0) this.bgcolix = JU.C.getColixTranslucent3 (this.bgcolix, !Float.isNaN (level), level);
} else {
this.colix = JU.C.getColixTranslucent3 (this.colix, !Float.isNaN (level), level);
}}, "~N,~B");
Clazz_defineMethod (c$, "setMovableX", 
function (x) {
this.valign = (this.valign == 4 ? 4 : 3);
this.movableX = x;
this.movableXPercent = 2147483647;
}, "~N");
Clazz_defineMethod (c$, "setMovableY", 
function (y) {
this.valign = (this.valign == 4 ? 4 : 3);
this.movableY = y;
this.movableYPercent = 2147483647;
}, "~N");
Clazz_defineMethod (c$, "setMovableXPercent", 
function (x) {
this.valign = (this.valign == 4 ? 4 : 3);
this.movableX = 2147483647;
this.movableXPercent = x;
}, "~N");
Clazz_defineMethod (c$, "setMovableYPercent", 
function (y) {
this.valign = (this.valign == 4 ? 4 : 3);
this.movableY = 2147483647;
this.movableYPercent = y;
}, "~N");
Clazz_defineMethod (c$, "setMovableZPercent", 
function (z) {
if (this.valign != 4) this.valign = 3;
this.movableZ = 2147483647;
this.movableZPercent = z;
}, "~N");
Clazz_defineMethod (c$, "setZs", 
function (z, zSlab) {
this.z = z;
this.zSlab = zSlab;
}, "~N,~N");
Clazz_defineMethod (c$, "setXYZs", 
function (x, y, z, zSlab) {
this.setMovableX (x);
this.setMovableY (y);
this.setZs (z, zSlab);
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "setScript", 
function (script) {
this.script = (script == null || script.length == 0 ? null : script);
}, "~S");
Clazz_defineMethod (c$, "setAlignmentLCR", 
function (align) {
if ("left".equals (align)) return this.setAlignment (4);
if ("center".equals (align)) return this.setAlignment (8);
if ("right".equals (align)) return this.setAlignment (12);
return false;
}, "~S");
Clazz_defineMethod (c$, "setAlignment", 
function (align) {
if (this.align != align) {
this.align = align;
this.recalc ();
}return true;
}, "~N");
Clazz_defineMethod (c$, "setBoxOffsetsInWindow", 
function (margin, vMargin, vTop) {
var bw = this.boxWidth + margin;
var x = this.boxX;
if (x + bw > this.windowWidth) x = this.windowWidth - bw;
if (x < margin) x = margin;
this.boxX = x;
var bh = this.boxHeight;
var y = vTop;
if (y + bh > this.windowHeight) y = this.windowHeight - bh;
if (y < vMargin) y = vMargin;
this.boxY = y;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "setWindow", 
function (width, height, scalePixelsPerMicron) {
this.windowWidth = width;
this.windowHeight = height;
if (this.pymolOffset == null && this.scalePixelsPerMicron < 0 && scalePixelsPerMicron != 0) this.setScalePixelsPerMicron (scalePixelsPerMicron);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "checkObjectClicked", 
function (isAntialiased, x, y, bsVisible) {
if (this.hidden || this.script == null || this.modelIndex >= 0 && !bsVisible.get (this.modelIndex)) return false;
if (isAntialiased) {
x <<= 1;
y <<= 1;
}return (x >= this.boxX && x <= this.boxX + this.boxWidth && y >= this.boxY && y <= this.boxY + this.boxHeight);
}, "~B,~N,~N,JU.BS");
Clazz_defineMethod (c$, "getPymolScreenOffset", 
function (atomPt, screen, zSlab, pTemp, sppm) {
var mode = this.pymolOffset[0];
if (atomPt != null && (Math.abs (mode) % 2) == 1) pTemp.setT (atomPt);
 else pTemp.set (0, 0, 0);
pTemp.add3 (this.pymolOffset[4], this.pymolOffset[5], this.pymolOffset[6]);
this.vwr.tm.transformPtScr (pTemp, screen);
if (mode == 2 || mode == 3) {
screen.x += this.pymolOffset[1];
screen.y += this.pymolOffset[2];
screen.z += this.pymolOffset[3];
}this.setXYZs (screen.x, screen.y, screen.z, zSlab);
this.setScalePixelsPerMicron (sppm);
}, "JU.P3,JU.P3i,~N,JU.P3,~N");
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.shape.Shape", "java.util.Hashtable"], "J.shape.TextShape", ["JU.P3", "$.PT", "JU.C", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.objects = null;
this.currentObject = null;
this.currentFont = null;
this.currentColor = null;
this.currentBgColor = null;
this.currentTranslucentLevel = 0;
this.currentBgTranslucentLevel = 0;
this.thisID = null;
this.isHover = false;
this.isAll = false;
Clazz_instantialize (this, arguments);
}, J.shape, "TextShape", J.shape.Shape);
Clazz_prepareFields (c$, function () {
this.objects =  new java.util.Hashtable ();
});
Clazz_defineMethod (c$, "setPropTS", 
function (propertyName, value, bsSelected) {
if ("text" === propertyName) {
var text = value;
if (this.currentObject != null) {
this.currentObject.setText (text);
} else if (this.isAll) {
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setText (text);

}return;
}if ("font" === propertyName) {
this.currentFont = value;
if (this.currentObject != null) {
this.currentObject.setFont (this.currentFont, true);
this.currentObject.setFontScale (0);
} else if (this.isAll) {
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setFont (this.currentFont, true);

}return;
}if ("allOff" === propertyName) {
this.currentObject = null;
this.isAll = true;
this.objects =  new java.util.Hashtable ();
return;
}if ("delete" === propertyName) {
if (this.currentObject != null) {
this.objects.remove (this.currentObject.target);
this.currentObject = null;
} else if (this.isAll || this.thisID != null) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (this.isAll || JU.PT.isMatch (text.target.toUpperCase (), this.thisID, true, true)) {
e.remove ();
}}
}return;
}if ("off" === propertyName) {
if (this.isAll) {
this.objects =  new java.util.Hashtable ();
this.isAll = false;
this.currentObject = null;
}if (this.currentObject == null) {
return;
}this.objects.remove (this.currentObject.target);
this.currentObject = null;
return;
}if ("model" === propertyName) {
var modelIndex = (value).intValue ();
if (this.currentObject != null) {
this.currentObject.modelIndex = modelIndex;
} else if (this.isAll) {
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.modelIndex = modelIndex;

}return;
}if ("align" === propertyName) {
var align = value;
if (this.currentObject != null) {
if (!this.currentObject.setAlignmentLCR (align)) JU.Logger.error ("unrecognized align:" + align);
} else if (this.isAll) {
for (var obj, $obj = this.objects.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) obj.setAlignmentLCR (align);

}return;
}if ("bgcolor" === propertyName) {
this.currentBgColor = value;
if (this.currentObject != null) {
this.currentObject.bgcolix = JU.C.getColixO (value);
} else if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().bgcolix = JU.C.getColixO (value);
}
}return;
}if ("color" === propertyName) {
this.currentColor = value;
if (this.currentObject != null) {
this.currentObject.colix = JU.C.getColixO (value);
} else if (this.isAll || this.thisID != null) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (this.isAll || JU.PT.isMatch (text.target.toUpperCase (), this.thisID, true, true)) {
text.colix = JU.C.getColixO (value);
}}
}return;
}if ("target" === propertyName) {
var target = value;
this.isAll = target.equals ("all");
if (this.isAll || target.equals ("none")) {
this.currentObject = null;
}return;
}var isBackground;
if ((isBackground = ("bgtranslucency" === propertyName)) || "translucency" === propertyName) {
var isTranslucent = ("translucent" === value);
if (isBackground) this.currentBgTranslucentLevel = (isTranslucent ? this.translucentLevel : 0);
 else this.currentTranslucentLevel = (isTranslucent ? this.translucentLevel : 0);
if (this.currentObject != null) {
this.currentObject.setTranslucent (this.translucentLevel, isBackground);
} else if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().setTranslucent (this.translucentLevel, isBackground);
}
}return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (text.modelIndex == modelIndex) {
e.remove ();
} else if (text.modelIndex > modelIndex) {
text.modelIndex--;
}}
return;
}this.setPropS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz_overrideMethod (c$, "getShapeState", 
function () {
return null;
});
Clazz_overrideMethod (c$, "initModelSet", 
function () {
this.currentObject = null;
this.isAll = false;
});
Clazz_overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
if (!this.isHover) for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.visible = (t.modelIndex < 0 || bsModels.get (t.modelIndex));

}, "JU.BS");
Clazz_overrideMethod (c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible, drawPicking) {
if (this.isHover || modifiers == 0) return null;
var isAntialiased = this.vwr.antialiased;
for (var obj, $obj = this.objects.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) {
if (obj.checkObjectClicked (isAntialiased, x, y, bsVisible)) {
if (obj.script != null) this.vwr.evalStringQuiet (obj.script);
var map =  new java.util.Hashtable ();
map.put ("pt", (obj.xyz == null ?  new JU.P3 () : obj.xyz));
var modelIndex = obj.modelIndex;
if (modelIndex < 0) modelIndex = 0;
map.put ("modelIndex", Integer.$valueOf (modelIndex));
map.put ("model", this.vwr.getModelNumberDotted (modelIndex));
map.put ("id", obj.target);
map.put ("type", "echo");
return map;
}}
return null;
}, "~N,~N,~N,JU.BS,~B");
Clazz_overrideMethod (c$, "checkObjectHovered", 
function (x, y, bsVisible) {
if (this.isHover) return false;
var haveScripts = false;
var isAntialiased = this.vwr.antialiased;
for (var obj, $obj = this.objects.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) {
if (obj.script != null) {
haveScripts = true;
if (obj.checkObjectClicked (isAntialiased, x, y, bsVisible)) {
this.vwr.setCursor (12);
return true;
}}}
if (haveScripts) this.vwr.setCursor (0);
return false;
}, "~N,~N,JU.BS");
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.shape.AtomShape", "java.util.Hashtable", "JU.P3"], "J.shape.Labels", ["JU.AU", "$.BS", "$.Lst", "$.PT", "J.c.PAL", "JM.LabelToken", "$.Text", "JS.SV", "JU.BSUtil", "$.C", "$.Font", "JV.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.strings = null;
this.formats = null;
this.bgcolixes = null;
this.fids = null;
this.offsets = null;
this.atomLabels = null;
this.labelBoxes = null;
this.bsFontSet = null;
this.bsBgColixSet = null;
this.defaultOffset = 0;
this.defaultAlignment = 0;
this.defaultZPos = 0;
this.defaultFontId = 0;
this.defaultColix = 0;
this.defaultBgcolix = 0;
this.defaultPaletteID = 0;
this.defaultPointer = 0;
this.zeroFontId = 0;
this.defaultsOnlyForNone = true;
this.setDefaults = false;
this.isScaled = false;
this.scalePixelsPerMicron = 0;
this.ptTemp = null;
this.pickedAtom = -1;
this.lastPicked = -1;
this.pickedOffset = 0;
this.pickedX = 0;
this.pickedY = 0;
Clazz_instantialize (this, arguments);
}, J.shape, "Labels", J.shape.AtomShape);
Clazz_prepareFields (c$, function () {
this.atomLabels =  new java.util.Hashtable ();
this.ptTemp =  new JU.P3 ();
});
Clazz_overrideMethod (c$, "initShape", 
function () {
this.defaultFontId = this.zeroFontId = this.vwr.gdata.getFont3DFSS ("SansSerif", "Plain", 13).fid;
this.defaultColix = 0;
this.defaultBgcolix = 0;
this.defaultOffset = JV.JC.LABEL_DEFAULT_OFFSET;
this.defaultAlignment = 4;
this.defaultPointer = 0;
this.defaultZPos = 0;
this.translucentAllowed = false;
});
Clazz_overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.isActive = true;
if ("setDefaults" === propertyName) {
this.setDefaults = (value).booleanValue ();
return;
}if ("color" === propertyName) {
var pid = J.c.PAL.pidOf (value);
var colix = JU.C.getColixO (value);
if (!this.setDefaults) {
var n = this.checkColixLength (colix, bsSelected.length ());
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < n; i = bsSelected.nextSetBit (i + 1)) this.setLabelColix (i, colix, pid);

}if (this.setDefaults || !this.defaultsOnlyForNone) {
this.defaultColix = colix;
this.defaultPaletteID = pid;
}return;
}if ("scalereference" === propertyName) {
if (this.strings == null) return;
var val = (value).floatValue ();
var scalePixelsPerMicron = (val == 0 ? 0 : 10000 / val);
var n = Math.min (this.ac, this.strings.length);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < n; i = bsSelected.nextSetBit (i + 1)) {
var text = this.getLabel (i);
if (text == null) {
text = JM.Text.newLabel (this.vwr, null, this.strings[i], 0, 0, 0, scalePixelsPerMicron);
this.putLabel (i, text);
} else {
text.setScalePixelsPerMicron (scalePixelsPerMicron);
}}
return;
}if ("label" === propertyName) {
var isPicked = (this.isPickingMode () && bsSelected.cardinality () == 1 && bsSelected.nextSetBit (0) == this.lastPicked);
this.setScaling ();
var tokens = null;
var nbs = this.checkStringLength (bsSelected.length ());
if (this.defaultColix != 0 || this.defaultPaletteID != 0) this.checkColixLength (this.defaultColix, bsSelected.length ());
if (this.defaultBgcolix != 0) this.checkBgColixLength (this.defaultBgcolix, bsSelected.length ());
if (Clazz_instanceOf (value, JU.Lst)) {
var list = value;
var n = list.size ();
tokens =  Clazz_newArray (-1, [null]);
for (var pt = 0, i = bsSelected.nextSetBit (0); i >= 0 && i < nbs; i = bsSelected.nextSetBit (i + 1)) {
if (pt >= n) {
this.setLabel (J.shape.Labels.nullToken, "", i, !isPicked);
continue;
}tokens[0] = null;
this.setLabel (tokens, JS.SV.sValue (list.get (pt++)), i, !isPicked);
}
} else {
var strLabel = value;
tokens = (strLabel == null || strLabel.length == 0 ? J.shape.Labels.nullToken :  Clazz_newArray (-1, [null]));
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setLabel (tokens, strLabel, i, !isPicked);

}return;
}if (propertyName.startsWith ("label:")) {
this.setScaling ();
this.checkStringLength (this.ac);
var label = propertyName.substring (6);
if (label.length == 0) label = null;
this.setLabel ( Clazz_newArray (-1, [null]), label, (value).intValue (), false);
return;
}if ("clearBoxes" === propertyName) {
this.labelBoxes = null;
return;
}if ("translucency" === propertyName || "bgtranslucency" === propertyName) {
return;
}if ("bgcolor" === propertyName) {
this.isActive = true;
if (this.bsBgColixSet == null) this.bsBgColixSet = JU.BS.newN (this.ac);
var bgcolix = JU.C.getColixO (value);
if (!this.setDefaults) {
var n = this.checkBgColixLength (bgcolix, bsSelected.length ());
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < n; i = bsSelected.nextSetBit (i + 1)) this.setBgcolix (i, bgcolix);

}if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultBgcolix = bgcolix;
return;
}if (this.bsFontSet == null) this.bsFontSet = JU.BS.newN (this.ac);
if ("fontsize" === propertyName) {
var fontsize = (value).intValue ();
if (fontsize < 0) {
this.fids = null;
return;
}var fid = this.vwr.gdata.getFontFid (fontsize);
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setFont (i, fid);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultFontId = fid;
return;
}if ("font" === propertyName) {
var fid = (value).fid;
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setFont (i, fid);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultFontId = fid;
return;
}if ("offset" === propertyName) {
if (!(Clazz_instanceOf (value, Integer))) {
if (!this.setDefaults) {
this.checkColixLength (-1, this.ac);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setPymolOffset (i, value);

}return;
}var offset = (value).intValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setOffsets (i, offset);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultOffset = offset;
return;
}if ("align" === propertyName) {
var type = value;
var hAlignment = (type.equalsIgnoreCase ("right") ? 12 : type.equalsIgnoreCase ("center") ? 8 : 4);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setHorizAlignment (i, hAlignment);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultAlignment = hAlignment;
return;
}if ("pointer" === propertyName) {
var pointer = (value).intValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setPointer (i, pointer);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultPointer = pointer;
return;
}if ("front" === propertyName) {
var TF = (value).booleanValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setZPos (i, 32, TF);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultZPos = (TF ? 32 : 0);
return;
}if ("group" === propertyName) {
var TF = (value).booleanValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setZPos (i, 16, TF);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultZPos = (TF ? 16 : 0);
return;
}if ("display" === propertyName || "toggleLabel" === propertyName) {
var mode = ("toggleLabel" === propertyName ? 0 : (value).booleanValue () ? 1 : -1);
if (this.mads == null) this.mads =  Clazz_newShortArray (this.ac, 0);
var strLabelPDB = null;
var tokensPDB = null;
var strLabelUNK = null;
var tokensUNK = null;
var strLabel;
var tokens;
var nstr = this.checkStringLength (bsSelected.length ());
var bgcolix = this.defaultBgcolix;
var nbg = this.checkBgColixLength (bgcolix, bsSelected.length ());
var thisMad = (mode >= 0 ? 1 : -1);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) {
var atom = this.atoms[i];
if (i < nstr && this.strings[i] != null) {
this.mads[i] = (mode == 1 || mode == 0 && this.mads[i] < 0 ? 1 : -1);
} else {
this.mads[i] = thisMad;
if (atom.getGroup3 (false).equals ("UNK")) {
if (strLabelUNK == null) {
strLabelUNK = this.vwr.getStandardLabelFormat (1);
tokensUNK = JM.LabelToken.compile (this.vwr, strLabelUNK, '\0', null);
}strLabel = strLabelUNK;
tokens = tokensUNK;
} else {
if (strLabelPDB == null) {
strLabelPDB = this.vwr.getStandardLabelFormat (2);
tokensPDB = JM.LabelToken.compile (this.vwr, strLabelPDB, '\0', null);
}strLabel = strLabelPDB;
tokens = tokensPDB;
}this.strings[i] = JM.LabelToken.formatLabelAtomArray (this.vwr, atom, tokens, '\0', null, this.ptTemp);
this.formats[i] = strLabel;
this.bsSizeSet.set (i);
if (i < nbg && !this.bsBgColixSet.get (i)) this.setBgcolix (i, this.defaultBgcolix);
}atom.setShapeVisibility (this.vf, this.strings != null && i < this.strings.length && this.strings[i] != null && this.mads[i] >= 0);
}
return;
}if ("pymolLabels" === propertyName) {
this.setPymolLabels (value, bsSelected);
return;
}if (propertyName === "deleteModelAtoms") {
this.labelBoxes = null;
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
this.fids = JU.AU.deleteElements (this.fids, firstAtomDeleted, nAtomsDeleted);
this.bgcolixes = JU.AU.deleteElements (this.bgcolixes, firstAtomDeleted, nAtomsDeleted);
this.offsets = JU.AU.deleteElements (this.offsets, firstAtomDeleted, nAtomsDeleted);
this.formats = JU.AU.deleteElements (this.formats, firstAtomDeleted, nAtomsDeleted);
this.strings = JU.AU.deleteElements (this.strings, firstAtomDeleted, nAtomsDeleted);
JU.BSUtil.deleteBits (this.bsFontSet, bsSelected);
JU.BSUtil.deleteBits (this.bsBgColixSet, bsSelected);
}this.setPropAS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz_defineMethod (c$, "isPickingMode", 
 function () {
return (this.vwr.getPickingMode () == 2 && this.labelBoxes != null);
});
Clazz_defineMethod (c$, "checkStringLength", 
 function (n) {
n = Math.min (this.ac, n);
if (this.strings == null || n > this.strings.length) {
this.formats = JU.AU.ensureLengthS (this.formats, n);
this.strings = JU.AU.ensureLengthS (this.strings, n);
if (this.bsSizeSet == null) this.bsSizeSet = JU.BS.newN (n);
}return n;
}, "~N");
Clazz_defineMethod (c$, "checkBgColixLength", 
 function (colix, n) {
n = Math.min (this.ac, n);
if (colix == 0) return (this.bgcolixes == null ? 0 : this.bgcolixes.length);
if (this.bgcolixes == null || n > this.bgcolixes.length) this.bgcolixes = JU.AU.ensureLengthShort (this.bgcolixes, n);
return n;
}, "~N,~N");
Clazz_defineMethod (c$, "setPymolLabels", 
 function (labels, bsSelected) {
this.setScaling ();
var n = this.checkStringLength (this.ac);
this.checkColixLength (-1, n);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < n; i = bsSelected.nextSetBit (i + 1)) this.setPymolLabel (i, labels.get (Integer.$valueOf (i)), null);

}, "java.util.Map,JU.BS");
Clazz_defineMethod (c$, "setPymolOffset", 
 function (i, value) {
var text = this.getLabel (i);
if (text == null) {
if (this.strings == null || i >= this.strings.length || this.strings[i] == null) return;
var fid = (this.bsFontSet != null && this.bsFontSet.get (i) ? this.fids[i] : -1);
if (fid < 0) this.setFont (i, fid = this.defaultFontId);
text = JM.Text.newLabel (this.vwr, JU.Font.getFont3D (fid), this.strings[i], this.getColix2 (i, this.atoms[i], false), this.getColix2 (i, this.atoms[i], true), 0, this.scalePixelsPerMicron);
this.setPymolLabel (i, text, this.formats[i]);
}text.pymolOffset = value;
}, "~N,~A");
Clazz_defineMethod (c$, "setScaling", 
 function () {
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet = JU.BS.newN (this.ac);
this.isScaled = this.vwr.getBoolean (603979845);
this.scalePixelsPerMicron = (this.isScaled ? this.vwr.getScalePixelsPerAngstrom (false) * 10000 : 0);
});
Clazz_defineMethod (c$, "setPymolLabel", 
 function (i, t, format) {
if (t == null) return;
var label = t.text;
var atom = this.atoms[i];
this.addString (atom, i, label, format == null ? JU.PT.rep (label, "%", "%%") : format);
atom.setShapeVisibility (this.vf, true);
if (t.colix >= 0) this.setLabelColix (i, t.colix, J.c.PAL.UNKNOWN.id);
this.setFont (i, t.font.fid);
this.putLabel (i, t);
}, "~N,JM.Text,~S");
Clazz_defineMethod (c$, "setLabel", 
 function (temp, strLabel, i, doAll) {
var atom = this.atoms[i];
var tokens = temp[0];
if (tokens == null) tokens = temp[0] = JM.LabelToken.compile (this.vwr, strLabel, '\0', null);
var label = (tokens == null ? null : JM.LabelToken.formatLabelAtomArray (this.vwr, atom, tokens, '\0', null, this.ptTemp));
var isNew = this.addString (atom, i, label, strLabel);
doAll = new Boolean (doAll | (isNew || label == null)).valueOf ();
var text = this.getLabel (i);
if (this.isScaled && doAll) {
text = JM.Text.newLabel (this.vwr, null, label, 0, 0, 0, this.scalePixelsPerMicron);
this.putLabel (i, text);
} else if (text != null && label != null) {
text.setText (label);
text.textUnformatted = strLabel;
}if (!doAll) return;
if (this.defaultOffset != JV.JC.LABEL_DEFAULT_OFFSET) this.setOffsets (i, this.defaultOffset);
if (this.defaultAlignment != 4) this.setHorizAlignment (i, this.defaultAlignment);
if ((this.defaultZPos & 32) != 0) this.setZPos (i, 32, true);
 else if ((this.defaultZPos & 16) != 0) this.setZPos (i, 16, true);
if (this.defaultPointer != 0) this.setPointer (i, this.defaultPointer);
if (this.defaultColix != 0 || this.defaultPaletteID != 0) this.setLabelColix (i, this.defaultColix, this.defaultPaletteID);
if (this.defaultBgcolix != 0) this.setBgcolix (i, this.defaultBgcolix);
if (this.defaultFontId != this.zeroFontId) this.setFont (i, this.defaultFontId);
}, "~A,~S,~N,~B");
Clazz_defineMethod (c$, "addString", 
 function (atom, i, label, strLabel) {
atom.setShapeVisibility (this.vf, label != null);
var notNull = (strLabel != null);
var isNew = (this.strings[i] == null);
this.strings[i] = label;
this.formats[i] = (notNull && strLabel.indexOf ("%{") >= 0 ? label : strLabel);
this.bsSizeSet.setBitTo (i, notNull);
return isNew;
}, "JM.Atom,~N,~S,~S");
Clazz_overrideMethod (c$, "getProperty", 
function (property, index) {
if (property.equals ("offsets")) return this.offsets;
if (property.equals ("label")) return (this.strings != null && index < this.strings.length && this.strings[index] != null ? this.strings[index] : "");
return null;
}, "~S,~N");
Clazz_defineMethod (c$, "putLabel", 
function (i, text) {
if (text == null) this.atomLabels.remove (Integer.$valueOf (i));
 else {
this.atomLabels.put (Integer.$valueOf (i), text);
text.textUnformatted = this.formats[i];
}}, "~N,JM.Text");
Clazz_defineMethod (c$, "getLabel", 
function (i) {
return this.atomLabels.get (Integer.$valueOf (i));
}, "~N");
Clazz_defineMethod (c$, "putBox", 
function (i, boxXY) {
if (this.labelBoxes == null) this.labelBoxes =  new java.util.Hashtable ();
this.labelBoxes.put (Integer.$valueOf (i), boxXY);
}, "~N,~A");
Clazz_defineMethod (c$, "getBox", 
function (i) {
if (this.labelBoxes == null) return null;
return this.labelBoxes.get (Integer.$valueOf (i));
}, "~N");
Clazz_defineMethod (c$, "setLabelColix", 
 function (i, colix, pid) {
this.setColixAndPalette (colix, pid, i);
var text;
if (this.colixes != null && ((text = this.getLabel (i)) != null)) text.colix = this.colixes[i];
}, "~N,~N,~N");
Clazz_defineMethod (c$, "setBgcolix", 
 function (i, bgcolix) {
this.bgcolixes[i] = bgcolix;
this.bsBgColixSet.setBitTo (i, bgcolix != 0);
var text = this.getLabel (i);
if (text != null) text.bgcolix = bgcolix;
}, "~N,~N");
Clazz_defineMethod (c$, "setOffsets", 
 function (i, offset) {
if (this.offsets == null || i >= this.offsets.length) {
if (offset == JV.JC.LABEL_DEFAULT_OFFSET) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, this.ac);
}this.offsets[i] = (this.offsets[i] & 63) | offset;
var text = this.getLabel (i);
if (text != null) text.setOffset (offset);
}, "~N,~N");
Clazz_defineMethod (c$, "setHorizAlignment", 
 function (i, hAlign) {
if (this.offsets == null || i >= this.offsets.length) {
switch (hAlign) {
case 0:
case 4:
return;
}
this.offsets = JU.AU.ensureLengthI (this.offsets, this.ac);
}if (hAlign == 0) hAlign = 4;
this.offsets[i] = JV.JC.setHorizAlignment (this.offsets[i], hAlign);
var text = this.getLabel (i);
if (text != null) text.setAlignment (hAlign);
}, "~N,~N");
Clazz_defineMethod (c$, "setPointer", 
 function (i, pointer) {
if (this.offsets == null || i >= this.offsets.length) {
if (pointer == 0) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, this.ac);
}this.offsets[i] = JV.JC.setPointer (this.offsets[i], pointer);
var text = this.getLabel (i);
if (text != null) text.pointer = pointer;
}, "~N,~N");
Clazz_defineMethod (c$, "setZPos", 
 function (i, flag, TF) {
if (this.offsets == null || i >= this.offsets.length) {
if (!TF) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, this.ac);
}this.offsets[i] = JV.JC.setZPosition (this.offsets[i], TF ? flag : 0);
}, "~N,~N,~B");
Clazz_defineMethod (c$, "setFont", 
 function (i, fid) {
if (this.fids == null || i >= this.fids.length) {
if (fid == this.zeroFontId) return;
this.fids = JU.AU.ensureLengthByte (this.fids, this.ac);
}this.fids[i] = fid;
this.bsFontSet.set (i);
var text = this.getLabel (i);
if (text != null) {
text.setFontFromFid (fid);
}}, "~N,~N");
Clazz_overrideMethod (c$, "setAtomClickability", 
function () {
if (this.strings == null) return;
for (var i = this.strings.length; --i >= 0; ) {
var label = this.strings[i];
if (label != null && this.ms.at.length > i && !this.ms.isAtomHidden (i)) this.ms.at[i].setClickable (this.vf);
}
});
Clazz_overrideMethod (c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible, drawPicking) {
if (!this.isPickingMode ()) return null;
var iAtom = this.findNearestLabel (x, y);
if (iAtom < 0) return null;
var map =  new java.util.Hashtable ();
map.put ("type", "label");
map.put ("atomIndex", Integer.$valueOf (iAtom));
this.lastPicked = iAtom;
return map;
}, "~N,~N,~N,JU.BS,~B");
Clazz_overrideMethod (c$, "checkObjectDragged", 
function (prevX, prevY, x, y, dragAction, bsVisible) {
if (!this.isPickingMode ()) return false;
if (prevX == -2147483648) {
var iAtom = this.findNearestLabel (x, y);
if (iAtom >= 0) {
this.pickedAtom = iAtom;
this.lastPicked = this.pickedAtom;
this.vwr.acm.setDragAtomIndex (iAtom);
this.pickedX = x;
this.pickedY = y;
this.pickedOffset = (this.offsets == null || this.pickedAtom >= this.offsets.length ? JV.JC.LABEL_DEFAULT_OFFSET : this.offsets[this.pickedAtom]);
return true;
}return false;
}if (prevX == 2147483647) this.pickedAtom = -1;
if (this.pickedAtom < 0) return false;
this.move2D (this.pickedAtom, x, y);
return true;
}, "~N,~N,~N,~N,~N,JU.BS");
Clazz_defineMethod (c$, "findNearestLabel", 
 function (x, y) {
if (this.labelBoxes == null) return -1;
var dmin = 3.4028235E38;
var imin = -1;
var zmin = 3.4028235E38;
var afactor = (this.vwr.antialiased ? 2 : 1);
for (var entry, $entry = this.labelBoxes.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
if (!this.atoms[entry.getKey ().intValue ()].isVisible (this.vf | 9)) continue;
var boxXY = entry.getValue ();
var dx = (x - boxXY[0]) * afactor;
var dy = (y - boxXY[1]) * afactor;
if (dx <= 0 || dy <= 0 || dx >= boxXY[2] || dy >= boxXY[3] || boxXY[4] > zmin) continue;
zmin = boxXY[4];
var d = Math.min (Math.abs (dx - boxXY[2] / 2), Math.abs (dy - boxXY[3] / 2));
if (d <= dmin) {
dmin = d;
imin = entry.getKey ().intValue ();
}}
return imin;
}, "~N,~N");
Clazz_defineMethod (c$, "move2D", 
 function (pickedAtom, x, y) {
var xOffset = JV.JC.getXOffset (this.pickedOffset);
var yOffset = JV.JC.getYOffset (this.pickedOffset);
xOffset += x - this.pickedX;
yOffset -= y - this.pickedY;
var offset = JV.JC.getOffset (xOffset, yOffset, true);
this.setOffsets (pickedAtom, offset);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "getColix2", 
function (i, atom, isBg) {
var colix;
if (isBg) {
colix = (this.bgcolixes == null || i >= this.bgcolixes.length) ? 0 : this.bgcolixes[i];
} else {
colix = (this.colixes == null || i >= this.colixes.length) ? 0 : this.colixes[i];
colix = JU.C.getColixInherited (colix, atom.colixAtom);
if (JU.C.isColixTranslucent (colix)) colix = JU.C.getColixTranslucent3 (colix, false, 0);
}return colix;
}, "~N,JM.Atom,~B");
c$.nullToken = c$.prototype.nullToken =  Clazz_newArray (-1, [null]);
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.api.JmolMeasurementClient", "J.shape.AtomShape", "JU.Lst"], "J.shape.Measures", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.PT", "$.SB", "JM.Measurement", "$.MeasurementData", "JU.BSUtil", "$.C", "$.Escape"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bsSelected = null;
this.strFormat = null;
this.mustBeConnected = false;
this.mustNotBeConnected = false;
this.radiusData = null;
this.intramolecular = null;
this.measureAllModels = false;
this.measurementCount = 0;
this.measurements = null;
this.mPending = null;
this.colix = 0;
this.tickInfo = null;
this.defaultTickInfo = null;
this.htMin = null;
this.tokAction = 0;
Clazz_instantialize (this, arguments);
}, J.shape, "Measures", J.shape.AtomShape, J.api.JmolMeasurementClient);
Clazz_prepareFields (c$, function () {
this.measurements =  new JU.Lst ();
});
Clazz_overrideMethod (c$, "initModelSet", 
function () {
for (var i = this.measurements.size (); --i >= 0; ) {
var m = this.measurements.get (i);
if (m != null) m.ms = this.ms;
}
this.atoms = this.ms.at;
});
Clazz_overrideMethod (c$, "initShape", 
function () {
if (J.shape.Measures.font3d == null) J.shape.Measures.font3d = this.vwr.gdata.getFont3D (18);
});
Clazz_overrideMethod (c$, "setSize", 
function (size, bsSelected) {
this.mad = size;
}, "~N,JU.BS");
Clazz_overrideMethod (c$, "setProperty", 
function (propertyName, value, bsIgnored) {
var mt;
if ("clearModelIndex" === propertyName) {
for (var i = 0; i < this.measurementCount; i++) this.measurements.get (i).setModelIndex (0);

return;
}if ("color" === propertyName) {
this.setColor (JU.C.getColixO (value));
return;
}if ("font" === propertyName) {
J.shape.Measures.font3d = value;
return;
}if ("hideAll" === propertyName) {
this.showHide ((value).booleanValue ());
return;
}if ("pending" === propertyName) {
this.mPending = value;
if (this.mPending == null) return;
if (this.mPending.count > 1) this.vwr.setStatusMeasuring ("measurePending", this.mPending.count, J.shape.Measures.getMessage (this.mPending, false), this.mPending.value);
return;
}var isRefresh;
if ((isRefresh = ("refresh" === propertyName)) || "refreshTrajectories" === propertyName) {
for (var i = this.measurements.size (); --i >= 0; ) if ((mt = this.measurements.get (i)) != null && (isRefresh || mt.isTrajectory)) mt.refresh (null);

return;
}if ("select" === propertyName) {
var bs = value;
if (JU.BSUtil.cardinalityOf (bs) == 0) {
this.bsSelected = null;
} else {
this.bsSelected =  new JU.BS ();
this.bsSelected.or (bs);
}return;
}if ("setFormats" === propertyName) {
this.setFormats (value);
return;
}this.measureAllModels = this.vwr.getBoolean (603979877);
if ("delete" === propertyName) {
this.deleteO (value);
this.setIndices ();
return;
}this.bsSelected = null;
if ("maps" === propertyName) {
var maps = value;
for (var i = 0; i < maps.length; i++) {
var len = maps[i].length;
if (len < 2 || len > 4) continue;
var v =  Clazz_newIntArray (len + 1, 0);
v[0] = len;
System.arraycopy (maps[i], 0, v, 1, len);
this.toggleOn (v);
}
} else if ("measure" === propertyName) {
var md = value;
this.tickInfo = md.tickInfo;
if (md.tickInfo != null && md.tickInfo.id.equals ("default")) {
this.defaultTickInfo = md.tickInfo;
return;
}if (md.isAll && md.points.size () == 2 && Clazz_instanceOf (md.points.get (0), JU.BS)) {
var type = JM.Measurement.nmrType (this.vwr.getDistanceUnits (md.strFormat));
switch (type) {
case 2:
md.htMin = this.vwr.getNMRCalculation ().getMinDistances (md);
}
}this.tickInfo = md.tickInfo;
this.radiusData = md.radiusData;
this.htMin = md.htMin;
this.mustBeConnected = md.mustBeConnected;
this.mustNotBeConnected = md.mustNotBeConnected;
this.intramolecular = md.intramolecular;
this.strFormat = md.strFormat;
if (md.isAll) {
if (this.tickInfo != null) this.define (md, 12291);
this.define (md, md.tokAction);
this.setIndices ();
return;
}var m = this.setSingleItem (md.points);
if (md.thisID != null) {
m.thisID = md.thisID;
m.mad = md.mad;
if (md.colix != 0) m.colix = md.colix;
m.strFormat = md.strFormat;
m.text = md.text;
}m.units = md.units;
m.property = md.property;
m.fixedValue = md.fixedValue;
switch (md.tokAction) {
case 266284:
this.doAction (md, md.thisID, 266284);
break;
case 12291:
this.defineAll (-2147483648, m, true, false, false);
this.setIndices ();
break;
case 1073742335:
this.showHideM (m, false);
break;
case 1073742334:
this.showHideM (m, true);
break;
case 1665140738:
if (md.thisID != null) this.doAction (md, md.thisID, 1665140738);
break;
case 12290:
if (md.thisID == null) {
this.deleteM (m);
} else {
this.deleteO (md.thisID);
}this.toggle (m);
break;
case 268435538:
this.toggle (m);
}
return;
}if ("clear" === propertyName) {
this.clear ();
return;
}if ("deleteModelAtoms" === propertyName) {
this.atoms = (value)[1];
var modelIndex = ((value)[2])[0];
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
var atomMax = firstAtomDeleted + nAtomsDeleted;
for (var i = this.measurementCount; --i >= 0; ) {
mt = this.measurements.get (i);
var indices = mt.countPlusIndices;
for (var j = 1; j <= indices[0]; j++) {
var iAtom = indices[j];
if (iAtom >= firstAtomDeleted) {
if (iAtom < atomMax) {
this.deleteI (i);
break;
}indices[j] -= nAtomsDeleted;
} else if (iAtom < 0) {
var pt = mt.getAtom (j);
if (pt.mi > modelIndex) {
pt.mi--;
} else if (pt.mi == modelIndex) {
this.deleteI (i);
break;
}}}
}
return;
}if ("reformatDistances" === propertyName) {
this.reformatDistances ();
return;
}if ("hide" === propertyName) {
if (Clazz_instanceOf (value, String)) {
this.doAction (null, value, 12294);
} else {
this.showHideM ( new JM.Measurement ().setPoints (this.ms, value, null, null), true);
}return;
}if ("refresh" === propertyName) {
this.doAction (value, null, 266284);
return;
}if ("show" === propertyName) {
if (Clazz_instanceOf (value, String)) {
this.doAction (null, value, 134222350);
} else {
this.showHideM ( new JM.Measurement ().setPoints (this.ms, value, null, null), false);
}return;
}if ("toggle" === propertyName) {
if (Clazz_instanceOf (value, String)) {
this.doAction (null, value, 268435538);
} else {
this.toggle ( new JM.Measurement ().setPoints (this.ms, value, null, null));
}return;
}if ("toggleOn" === propertyName) {
if (Clazz_instanceOf (value, String)) {
this.doAction (null, value, 1073742335);
} else {
this.toggleOn (value);
}return;
}}, "~S,~O,JU.BS");
Clazz_defineMethod (c$, "setSingleItem", 
 function (vector) {
var points =  new Array (4);
var indices =  Clazz_newIntArray (5, 0);
indices[0] = vector.size ();
for (var i = vector.size (); --i >= 0; ) {
var value = vector.get (i);
if (Clazz_instanceOf (value, JU.BS)) {
var atomIndex = (value).nextSetBit (0);
if (atomIndex < 0) return null;
indices[i + 1] = atomIndex;
} else {
points[i] = value;
indices[i + 1] = -2 - i;
}}
return  new JM.Measurement ().setPoints (this.ms, indices, points, this.tickInfo == null ? this.defaultTickInfo : this.tickInfo);
}, "JU.Lst");
Clazz_overrideMethod (c$, "getProperty", 
function (property, index) {
if ("pending".equals (property)) return this.mPending;
if ("count".equals (property)) return Integer.$valueOf (this.measurementCount);
if ("countPlusIndices".equals (property)) return (index < this.measurementCount ? this.measurements.get (index).countPlusIndices : null);
if ("stringValue".equals (property)) return (index < this.measurementCount ? this.measurements.get (index).getString () : null);
if ("pointInfo".equals (property)) return this.measurements.get (Clazz_doubleToInt (index / 10)).getLabel (index % 10, false, false);
if ("info".equals (property)) return this.getAllInfo ();
if ("infostring".equals (property)) return this.getAllInfoAsString ();
return null;
}, "~S,~N");
Clazz_defineMethod (c$, "clear", 
function () {
if (this.measurementCount == 0) return;
this.measurementCount = 0;
this.measurements.clear ();
this.mPending = null;
this.vwr.setStatusMeasuring ("measureDeleted", -1, "all", 0);
});
Clazz_defineMethod (c$, "setColor", 
 function (colix) {
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
if (this.bsSelected == null) this.colix = colix;
var mt;
for (var i = this.measurements.size (); --i >= 0; ) if ((mt = this.measurements.get (i)) != null && (this.bsSelected != null && this.bsSelected.get (i) || this.bsSelected == null && (colix == 0 || mt.colix == 0))) {
mt.colix = colix;
this.bsColixSet.set (i);
}
}, "~N");
Clazz_defineMethod (c$, "setFormats", 
 function (format) {
if (format != null && format.length == 0) format = null;
for (var i = this.measurements.size (); --i >= 0; ) if (this.bsSelected == null || this.bsSelected.get (i)) this.measurements.get (i).formatMeasurementAs (format, null, false);

}, "~S");
Clazz_defineMethod (c$, "showHide", 
 function (isHide) {
for (var i = this.measurements.size (); --i >= 0; ) if (this.bsSelected == null || this.bsSelected.get (i)) this.measurements.get (i).isHidden = isHide;

}, "~B");
Clazz_defineMethod (c$, "showHideM", 
 function (m, isHide) {
var i = this.find (m);
if (i >= 0) this.measurements.get (i).isHidden = isHide;
}, "JM.Measurement,~B");
Clazz_defineMethod (c$, "toggle", 
 function (m) {
this.radiusData = null;
this.htMin = null;
var i = this.find (m);
var mt;
if (i >= 0 && !(mt = this.measurements.get (i)).isHidden) this.defineAll (i, mt, true, false, false);
 else this.defineAll (-1, m, false, true, false);
this.setIndices ();
}, "JM.Measurement");
Clazz_defineMethod (c$, "toggleOn", 
 function (indices) {
this.radiusData = null;
this.htMin = null;
this.bsSelected =  new JU.BS ();
var m =  new JM.Measurement ().setPoints (this.ms, indices, null, this.defaultTickInfo);
this.defineAll (-2147483648, m, false, true, true);
var i = this.find (m);
if (i >= 0) this.bsSelected.set (i);
this.setIndices ();
this.reformatDistances ();
}, "~A");
Clazz_defineMethod (c$, "deleteM", 
 function (m) {
this.radiusData = null;
this.htMin = null;
var i = this.find (m);
if (i >= 0) this.defineAll (i, this.measurements.get (i), true, false, false);
this.setIndices ();
}, "JM.Measurement");
Clazz_defineMethod (c$, "deleteO", 
 function (value) {
if (Clazz_instanceOf (value, Integer)) {
this.deleteI ((value).intValue ());
} else if (Clazz_instanceOf (value, String)) {
this.doAction (null, value, 12291);
} else if (JU.AU.isAI (value)) {
this.defineAll (-2147483648,  new JM.Measurement ().setPoints (this.ms, value, null, null), true, false, false);
}}, "~O");
Clazz_defineMethod (c$, "defineAll", 
 function (iPt, m, isDelete, isShow, doSelect) {
if (!this.measureAllModels) {
if (isDelete) {
if (iPt == -2147483648) iPt = this.find (m);
if (iPt >= 0) this.deleteI (iPt);
return;
}this.defineMeasurement (iPt, m, doSelect);
return;
}if (isShow) {
this.defineAll (iPt, m, true, false, false);
if (isDelete) return;
}var points =  new JU.Lst ();
var nPoints = m.count;
for (var i = 1; i <= nPoints; i++) {
var atomIndex = m.getAtomIndex (i);
points.addLast (atomIndex >= 0 ? this.vwr.ms.getAtoms (1094715393, Integer.$valueOf (this.atoms[atomIndex].getAtomNumber ())) : m.getAtom (i));
}
this.define (( new JM.MeasurementData ().init (null, this.vwr, points)).set (this.tokAction, this.htMin, this.radiusData, m.property, this.strFormat, null, this.tickInfo, this.mustBeConnected, this.mustNotBeConnected, this.intramolecular, true, 0, 0, null, NaN), (isDelete ? 12291 : 12290));
}, "~N,JM.Measurement,~B,~B,~B");
Clazz_defineMethod (c$, "find", 
 function (m) {
return (m.thisID == null ? JM.Measurement.find (this.measurements, m) : -1);
}, "JM.Measurement");
Clazz_defineMethod (c$, "setIndices", 
 function () {
for (var i = 0; i < this.measurementCount; i++) this.measurements.get (i).index = i;

});
Clazz_defineMethod (c$, "define", 
 function (md, tokAction) {
this.tokAction = tokAction;
md.define (this, this.ms);
}, "JM.MeasurementData,~N");
Clazz_overrideMethod (c$, "processNextMeasure", 
function (m) {
var iThis = this.find (m);
if (iThis >= 0) {
if (this.tokAction == 12291) {
this.deleteI (iThis);
} else if (this.strFormat != null) {
this.measurements.get (iThis).formatMeasurementAs (this.strFormat, null, true);
} else {
this.measurements.get (iThis).isHidden = (this.tokAction == 1073742334);
}} else if (this.tokAction == 12290 || this.tokAction == 268435538) {
m.tickInfo = (this.tickInfo == null ? this.defaultTickInfo : this.tickInfo);
this.defineMeasurement (-1, m, true);
}}, "JM.Measurement");
Clazz_defineMethod (c$, "defineMeasurement", 
 function (i, m, doSelect) {
var value = m.getMeasurement (null);
if (this.htMin != null && !m.isMin (this.htMin) || this.radiusData != null && !m.isInRange (this.radiusData, value)) return;
if (i == -2147483648) i = this.find (m);
if (i >= 0) {
this.measurements.get (i).isHidden = false;
if (doSelect) this.bsSelected.set (i);
return;
}var measureNew =  new JM.Measurement ().setM (this.ms, m, value, (m.colix == 0 ? this.colix : m.colix), this.strFormat, this.measurementCount);
if (!measureNew.$isValid) return;
this.measurements.addLast (measureNew);
this.vwr.setStatusMeasuring ("measureCompleted", this.measurementCount++, J.shape.Measures.getMessage (measureNew, false), measureNew.value);
}, "~N,JM.Measurement,~B");
c$.getMessage = Clazz_defineMethod (c$, "getMessage", 
 function (m, asBitSet) {
var sb =  new JU.SB ();
sb.append ("[");
for (var i = 1; i <= m.count; i++) {
if (i > 1) sb.append (", ");
sb.append (m.getLabel (i, asBitSet, false));
}
sb.append (", ");
sb.append (m.getString ());
sb.append ("]");
return sb.toString ();
}, "JM.Measurement,~B");
Clazz_defineMethod (c$, "deleteI", 
 function (i) {
if (i >= this.measurements.size () || i < 0) return;
var msg = J.shape.Measures.getMessage (this.measurements.get (i), true);
this.measurements.removeItemAt (i);
this.measurementCount--;
this.vwr.setStatusMeasuring ("measureDeleted", i, msg, 0);
}, "~N");
Clazz_defineMethod (c$, "doAction", 
 function (md, id, tok) {
id = id.toUpperCase ().$replace ('?', '*');
var isWild = JU.PT.isWild (id);
for (var i = this.measurements.size (); --i >= 0; ) {
var m = this.measurements.get (i);
if (m.thisID != null && (m.thisID.equalsIgnoreCase (id) || isWild && JU.PT.isMatch (m.thisID.toUpperCase (), id, true, true))) switch (tok) {
case 266284:
if (md.colix != 0) m.colix = md.colix;
if (md.mad != 0) m.mad = md.mad;
if (md.strFormat != null) {
m.strFormat = m.strFormat.substring (0, 2) + md.strFormat.substring (2);
}if (md.text != null) {
if (m.text == null) {
m.text = md.text;
} else {
if (md.text.font != null) m.text.font = md.text.font;
m.text.text = null;
if (md.text.align != 0) m.text.align = md.text.align;
if (md.colix != 0) m.labelColix = m.text.colix = md.text.colix;
}}m.formatMeasurement (null);
break;
case 1665140738:
m.mad = md.mad;
break;
case 12291:
var msg = J.shape.Measures.getMessage (this.measurements.get (i), true);
this.measurements.removeItemAt (i);
this.measurementCount--;
this.vwr.setStatusMeasuring ("measureDeleted", i, msg, 0);
break;
case 134222350:
m.isHidden = false;
break;
case 12294:
m.isHidden = true;
break;
case 268435538:
m.isHidden = !m.isHidden;
break;
case 1073742335:
m.isHidden = false;
break;
}
}
}, "JM.MeasurementData,~S,~N");
Clazz_defineMethod (c$, "reformatDistances", 
 function () {
for (var i = this.measurementCount; --i >= 0; ) this.measurements.get (i).reformatDistanceIfSelected ();

});
Clazz_defineMethod (c$, "getAllInfo", 
 function () {
var info =  new JU.Lst ();
for (var i = 0; i < this.measurementCount; i++) {
info.addLast (this.getInfo (i));
}
return info;
});
Clazz_defineMethod (c$, "getAllInfoAsString", 
 function () {
var info = "Measurement Information";
for (var i = 0; i < this.measurementCount; i++) {
info += "\n" + this.getInfoAsString (i);
}
return info;
});
Clazz_defineMethod (c$, "getInfo", 
 function (index) {
var m = this.measurements.get (index);
var count = m.count;
var info =  new java.util.Hashtable ();
info.put ("index", Integer.$valueOf (index));
info.put ("type", (count == 2 ? "distance" : count == 3 ? "angle" : "dihedral"));
info.put ("strMeasurement", m.getString ());
info.put ("count", Integer.$valueOf (count));
info.put ("id", "" + m.thisID);
info.put ("value", Float.$valueOf (m.value));
info.put ("hidden", Boolean.$valueOf (m.isHidden));
info.put ("visible", Boolean.$valueOf (m.isVisible));
var tickInfo = m.tickInfo;
if (tickInfo != null) {
info.put ("ticks", tickInfo.ticks);
if (tickInfo.scale != null) info.put ("tickScale", tickInfo.scale);
if (tickInfo.tickLabelFormats != null) info.put ("tickLabelFormats", tickInfo.tickLabelFormats);
if (!Float.isNaN (tickInfo.first)) info.put ("tickStart", Float.$valueOf (tickInfo.first));
}var atomsInfo =  new JU.Lst ();
for (var i = 1; i <= count; i++) {
var atomInfo =  new java.util.Hashtable ();
var atomIndex = m.getAtomIndex (i);
atomInfo.put ("_ipt", Integer.$valueOf (atomIndex));
atomInfo.put ("coord", JU.Escape.eP (m.getAtom (i)));
atomInfo.put ("atomno", Integer.$valueOf (atomIndex < 0 ? -1 : this.atoms[atomIndex].getAtomNumber ()));
atomInfo.put ("info", (atomIndex < 0 ? "<point>" : this.atoms[atomIndex].getInfo ()));
atomsInfo.addLast (atomInfo);
}
info.put ("atoms", atomsInfo);
return info;
}, "~N");
Clazz_overrideMethod (c$, "getInfoAsString", 
function (index) {
return this.measurements.get (index).getInfoAsString (null);
}, "~N");
Clazz_defineMethod (c$, "setVisibilityInfo", 
function () {
var bsModels = this.vwr.getVisibleFramesBitSet ();
out : for (var i = this.measurementCount; --i >= 0; ) {
var m = this.measurements.get (i);
m.isVisible = false;
if (this.mad == 0 || m.isHidden) continue;
for (var iAtom = m.count; iAtom > 0; iAtom--) {
var atomIndex = m.getAtomIndex (iAtom);
if (atomIndex >= 0) {
if (!this.ms.at[atomIndex].isClickable ()) continue out;
} else {
var modelIndex = m.getAtom (iAtom).mi;
if (modelIndex >= 0 && !bsModels.get (modelIndex)) continue out;
}}
m.isVisible = true;
}
});
Clazz_defineStatics (c$,
"font3d", null);
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.shape.TextShape"], "J.shape.Echo", ["java.util.Hashtable", "JU.Lst", "$.PT", "JM.Text", "JU.C"], function () {
c$ = Clazz_declareType (J.shape, "Echo", J.shape.TextShape);
Clazz_overrideMethod (c$, "initShape", 
function () {
this.setProperty ("target", "top", null);
});
Clazz_overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("scalereference" === propertyName) {
if (this.currentObject != null) {
var val = (value).floatValue ();
this.currentObject.setScalePixelsPerMicron (val == 0 ? 0 : 10000 / val);
}return;
}if ("point" === propertyName) {
if (this.currentObject != null) {
var t = this.currentObject;
t.pointerPt = (value == null ? null : value);
t.pointer = (value == null ? 0 : 1);
}return;
}if ("xyz" === propertyName) {
if (this.currentObject != null && this.vwr.getBoolean (603979845)) this.currentObject.setScalePixelsPerMicron (this.vwr.getScalePixelsPerAngstrom (false) * 10000);
}if ("scale" === propertyName) {
if (this.currentObject != null) {
(this.currentObject).setScale ((value).floatValue ());
} else if (this.isAll) {
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setScale ((value).floatValue ());

}return;
}if ("image" === propertyName) {
if (this.currentObject != null) {
(this.currentObject).setImage (value);
} else if (this.isAll) {
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setImage (value);

}return;
}if ("thisID" === propertyName) {
var target = value;
this.currentObject = this.objects.get (target);
if (this.currentObject == null && JU.PT.isWild (target)) this.thisID = target.toUpperCase ();
return;
}if ("hidden" === propertyName) {
var isHidden = (value).booleanValue ();
if (this.currentObject != null) {
(this.currentObject).hidden = isHidden;
} else if (this.isAll || this.thisID != null) {
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) if (this.isAll || JU.PT.isMatch (t.target.toUpperCase (), this.thisID, true, true)) t.hidden = isHidden;

}return;
}if ("script" === propertyName) {
if (this.currentObject != null) this.currentObject.setScript (value);
return;
}if ("xpos" === propertyName) {
if (this.currentObject != null) this.currentObject.setMovableX ((value).intValue ());
return;
}if ("ypos" === propertyName) {
if (this.currentObject != null) this.currentObject.setMovableY ((value).intValue ());
return;
}if ("%xpos" === propertyName) {
if (this.currentObject != null) this.currentObject.setMovableXPercent ((value).intValue ());
return;
}if ("%ypos" === propertyName) {
if (this.currentObject != null) this.currentObject.setMovableYPercent ((value).intValue ());
return;
}if ("%zpos" === propertyName) {
if (this.currentObject != null) this.currentObject.setMovableZPercent ((value).intValue ());
return;
}if ("xypos" === propertyName) {
if (this.currentObject != null) {
var pt = value;
this.currentObject.setXYZ (null, true);
if (pt.z == 3.4028235E38) {
this.currentObject.setMovableX (Clazz_floatToInt (pt.x));
this.currentObject.setMovableY (Clazz_floatToInt (pt.y));
} else {
this.currentObject.setMovableXPercent (Clazz_floatToInt (pt.x));
this.currentObject.setMovableYPercent (Clazz_floatToInt (pt.y));
}}return;
}if ("xyz" === propertyName) {
if (this.currentObject != null) {
this.currentObject.setXYZ (value, true);
}return;
}if ("offset" === propertyName) {
if (this.currentObject != null) {
this.currentObject.pymolOffset = value;
}return;
}if ("target" === propertyName) {
this.thisID = null;
var target = (value).intern ().toLowerCase ();
if (target !== "none" && target !== "all") {
this.isAll = false;
var text = this.objects.get (target);
if (text == null) {
var valign = 3;
var halign = 4;
if ("top" === target) {
valign = 0;
halign = 8;
} else if ("middle" === target) {
valign = 2;
halign = 8;
} else if ("bottom" === target) {
valign = 1;
} else if ("error" === target) {
valign = 0;
}text = JM.Text.newEcho (this.vwr, this.vwr.gdata.getFont3DFS ("Serif", 20), target, 10, valign, halign, 0);
text.adjustForWindow = true;
this.objects.put (target, text);
if (this.currentFont != null) text.setFont (this.currentFont, true);
if (this.currentColor != null) text.colix = JU.C.getColixO (this.currentColor);
if (this.currentBgColor != null) text.bgcolix = JU.C.getColixO (this.currentBgColor);
if (this.currentTranslucentLevel != 0) text.setTranslucent (this.currentTranslucentLevel, false);
if (this.currentBgTranslucentLevel != 0) text.setTranslucent (this.currentBgTranslucentLevel, true);
}this.currentObject = text;
return;
}}this.setPropTS (propertyName, value, null);
}, "~S,~O,JU.BS");
Clazz_overrideMethod (c$, "getPropertyData", 
function (property, data) {
if ("currentTarget" === property) {
return (this.currentObject != null && (data[0] = this.currentObject.target) != null);
}if (property === "checkID") {
var key = (data[0]).toUpperCase ();
var isWild = JU.PT.isWild (key);
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) {
var id = t.target;
if (id.equalsIgnoreCase (key) || isWild && JU.PT.isMatch (id.toUpperCase (), key, true, true)) {
data[1] = id;
return true;
}}
return false;
}return this.getPropShape (property, data);
}, "~S,~A");
Clazz_overrideMethod (c$, "getShapeDetail", 
function () {
var lst =  new java.util.Hashtable ();
for (var e, $e = this.objects.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var info =  new java.util.Hashtable ();
var t = e.getValue ();
var name = e.getKey ();
info.put ("boxXY", t.boxXY);
if (t.xyz != null) info.put ("xyz", t.xyz);
var o = t.image;
if (o == null) {
info.put ("text", t.text == null ? "" : t.text);
} else {
info.put ("imageFile", t.text);
info.put ("imageWidth", Integer.$valueOf (this.vwr.apiPlatform.getImageWidth (o)));
info.put ("imageHeight", Integer.$valueOf (this.vwr.apiPlatform.getImageHeight (o)));
}lst.put (name, info);
}
var lst2 =  new JU.Lst ();
lst2.addLast (lst);
return lst2;
});
Clazz_defineStatics (c$,
"FONTFACE", "Serif",
"FONTSIZE", 20,
"COLOR", 10);
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.shape.TextShape"], "J.shape.Hover", ["JU.AU", "JM.Text", "JU.C"], function () {
c$ = Clazz_decorateAsClass (function () {
this.hoverText = null;
this.atomIndex = -1;
this.xy = null;
this.text = null;
this.labelFormat = "%U";
this.atomFormats = null;
this.specialLabel = null;
Clazz_instantialize (this, arguments);
}, J.shape, "Hover", J.shape.TextShape);
Clazz_overrideMethod (c$, "initShape", 
function () {
this.isHover = true;
var font3d = this.vwr.gdata.getFont3DFSS ("SansSerif", "Plain", 12);
var bgcolix = JU.C.getColixS ("#FFFFC3");
var colix = 4;
this.currentObject = this.hoverText = JM.Text.newLabel (this.vwr, font3d, null, colix, bgcolix, 4, 0);
this.hoverText.adjustForWindow = true;
});
Clazz_overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if ("target" === propertyName) {
if (value == null) this.atomIndex = -1;
 else {
this.atomIndex = (value).intValue ();
}return;
}if ("text" === propertyName) {
this.text = value;
if (this.text != null && this.text.length == 0) this.text = null;
return;
}if ("specialLabel" === propertyName) {
this.specialLabel = value;
return;
}if ("atomLabel" === propertyName) {
var text = value;
if (text != null && text.length == 0) text = null;
var count = this.vwr.ms.ac;
if (this.atomFormats == null || this.atomFormats.length < count) this.atomFormats =  new Array (count);
for (var i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1)) this.atomFormats[i] = text;

return;
}if ("xy" === propertyName) {
this.xy = value;
return;
}if ("label" === propertyName) {
this.labelFormat = value;
if (this.labelFormat != null && this.labelFormat.length == 0) this.labelFormat = null;
return;
}if (propertyName === "deleteModelAtoms") {
if (this.atomFormats != null) {
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
this.atomFormats = JU.AU.deleteElements (this.atomFormats, firstAtomDeleted, nAtomsDeleted);
}this.atomIndex = -1;
return;
}this.setPropTS (propertyName, value, null);
}, "~S,~O,JU.BS");
Clazz_defineStatics (c$,
"FONTFACE", "SansSerif",
"FONTSTYLE", "Plain",
"FONTSIZE", 12);
});
Clazz_declarePackage ("J.render");
Clazz_load (null, "J.render.TextRenderer", ["java.lang.Float", "JM.Text"], function () {
c$ = Clazz_declareType (J.render, "TextRenderer");
c$.render = Clazz_defineMethod (c$, "render", 
function (text, g3d, scalePixelsPerMicron, imageFontScaling, isAbsolute, boxXY, temp) {
if (text == null || text.image == null && !text.doFormatText && text.lines == null) return false;
var showText = g3d.setC (text.colix);
if (!showText && (text.image == null && (text.bgcolix == 0 || !g3d.setC (text.bgcolix)))) return false;
text.setPosition (scalePixelsPerMicron, imageFontScaling, isAbsolute, boxXY);
if (text.image == null && text.bgcolix != 0) {
if (g3d.setC (text.bgcolix)) J.render.TextRenderer.showBox (g3d, text.colix, Clazz_floatToInt (text.boxX), Clazz_floatToInt (text.boxY) + text.boxYoff2 * 2, text.z + 2, text.zSlab, Clazz_floatToInt (text.boxWidth), Clazz_floatToInt (text.boxHeight), text.fontScale, !text.isEcho);
if (!showText) return false;
}if (text.image == null) {
for (var i = 0; i < text.lines.length; i++) {
text.setXYA (temp, i);
g3d.drawString (text.lines[i], text.font, Clazz_floatToInt (temp[0]), Clazz_floatToInt (temp[1]), text.z, text.zSlab, text.bgcolix);
}
} else {
g3d.drawImage (text.image, Clazz_floatToInt (text.boxX), Clazz_floatToInt (text.boxY), text.z, text.zSlab, text.bgcolix, Clazz_floatToInt (text.boxWidth), Clazz_floatToInt (text.boxHeight));
}if ((text.pointer & 1) == 0 || !g3d.setC ((text.pointer & 2) != 0 && text.bgcolix != 0 ? text.bgcolix : text.colix)) return true;
var w = text.boxWidth;
var h = text.boxHeight;
var pt = NaN;
var x = text.boxX + (text.boxX > text.atomX + w ? 0 : text.boxX + w < text.atomX - w ? w : (pt = w / 2));
var setY = !Float.isNaN (pt);
var y = text.boxY + (setY && text.boxY > text.atomY ? 0 : setY && text.boxY + h < text.atomY ? h : h / 2);
g3d.drawLineXYZ (text.atomX, text.atomY, text.atomZ, Clazz_floatToInt (x), Clazz_floatToInt (y), text.zSlab);
return true;
}, "JM.Text,J.api.JmolRendererInterface,~N,~N,~B,~A,~A");
c$.renderSimpleLabel = Clazz_defineMethod (c$, "renderSimpleLabel", 
function (g3d, font, strLabel, colix, bgcolix, boxXY, z, zSlab, xOffset, yOffset, ascent, descent, doPointer, pointerColix, isAbsolute) {
var boxWidth = font.stringWidth (strLabel) + 8;
var boxHeight = ascent + descent + 8;
var x0 = Clazz_floatToInt (boxXY[0]);
var y0 = Clazz_floatToInt (boxXY[1]);
JM.Text.setBoxXY (boxWidth, boxHeight, xOffset, yOffset, boxXY, isAbsolute);
var x = boxXY[0];
var y = boxXY[1];
if (bgcolix != 0 && g3d.setC (bgcolix)) J.render.TextRenderer.showBox (g3d, colix, Clazz_floatToInt (x), Clazz_floatToInt (y), z, zSlab, Clazz_floatToInt (boxWidth), Clazz_floatToInt (boxHeight), 1, true);
 else g3d.setC (colix);
g3d.drawString (strLabel, font, Clazz_floatToInt (x + 4), Clazz_floatToInt (y + 4 + ascent), z - 1, zSlab, bgcolix);
if (doPointer) {
g3d.setC (pointerColix);
if (xOffset > 0) g3d.drawLineXYZ (x0, y0, zSlab, Clazz_floatToInt (x), Clazz_floatToInt (y + boxHeight / 2), zSlab);
 else if (xOffset < 0) g3d.drawLineXYZ (x0, y0, zSlab, Clazz_floatToInt (x + boxWidth), Clazz_floatToInt (y + boxHeight / 2), zSlab);
}}, "J.api.JmolRendererInterface,JU.Font,~S,~N,~N,~A,~N,~N,~N,~N,~N,~N,~B,~N,~B");
c$.showBox = Clazz_defineMethod (c$, "showBox", 
 function (g3d, colix, x, y, z, zSlab, boxWidth, boxHeight, imageFontScaling, atomBased) {
g3d.fillTextRect (x, y, z, zSlab, boxWidth, boxHeight);
g3d.setC (colix);
if (!atomBased) return;
if (imageFontScaling >= 2) {
g3d.drawRect (x + 3, y + 3, z - 1, zSlab, boxWidth - 6, boxHeight - 6);
} else {
g3d.drawRect (x + 1, y + 1, z - 1, zSlab, boxWidth - 2, boxHeight - 2);
}}, "J.api.JmolRendererInterface,~N,~N,~N,~N,~N,~N,~N,~N,~B");
});
Clazz_declarePackage ("J.render");
Clazz_load (["J.render.FontLineShapeRenderer", "JU.P3", "$.P3i"], "J.render.LabelsRenderer", ["JM.Text", "J.render.TextRenderer", "JV.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.minZ = null;
this.ascent = 0;
this.descent = 0;
this.sppm = 0;
this.xy = null;
this.screen = null;
this.fidPrevious = 0;
this.pTemp = null;
this.bgcolix = 0;
this.labelColix = 0;
this.fid = 0;
this.atom = null;
this.atomPt = null;
this.isAbsolute = false;
this.offset = 0;
this.textAlign = 0;
this.pointer = 0;
this.zSlab = -2147483648;
this.zBox = 0;
this.boxXY = null;
this.scalePixelsPerMicron = 0;
Clazz_instantialize (this, arguments);
}, J.render, "LabelsRenderer", J.render.FontLineShapeRenderer);
Clazz_prepareFields (c$, function () {
this.minZ =  Clazz_newIntArray (1, 0);
this.xy =  Clazz_newFloatArray (3, 0);
this.screen =  new JU.P3i ();
this.pTemp =  new JU.P3 ();
});
Clazz_overrideMethod (c$, "render", 
function () {
this.fidPrevious = 0;
var labels = this.shape;
var labelStrings = labels.strings;
var fids = labels.fids;
var offsets = labels.offsets;
if (labelStrings == null) return false;
var atoms = this.ms.at;
var backgroundColixContrast = this.vwr.cm.colixBackgroundContrast;
var backgroundColor = this.vwr.getBackgroundArgb ();
this.sppm = this.vwr.getScalePixelsPerAngstrom (true);
this.scalePixelsPerMicron = (this.vwr.getBoolean (603979845) ? this.sppm * 10000 : 0);
this.imageFontScaling = this.vwr.imageFontScaling;
var iGroup = -1;
this.minZ[0] = 2147483647;
var isAntialiased = this.g3d.isAntialiased ();
for (var i = labelStrings.length; --i >= 0; ) {
this.atomPt = this.atom = atoms[i];
if (!this.isVisibleForMe (this.atom)) continue;
var label = labelStrings[i];
if (label == null || label.length == 0 || labels.mads != null && labels.mads[i] < 0) continue;
this.labelColix = labels.getColix2 (i, this.atom, false);
this.bgcolix = labels.getColix2 (i, this.atom, true);
if (this.bgcolix == 0 && this.vwr.gdata.getColorArgbOrGray (this.labelColix) == backgroundColor) this.labelColix = backgroundColixContrast;
this.fid = ((fids == null || i >= fids.length || fids[i] == 0) ? labels.zeroFontId : fids[i]);
this.offset = (offsets == null || i >= offsets.length ? 0 : offsets[i]);
var labelsFront = ((this.offset & 32) != 0);
var labelsGroup = ((this.offset & 16) != 0);
this.textAlign = JV.JC.getAlignment (this.offset);
this.isAbsolute = JV.JC.isOffsetAbsolute (this.offset);
this.pointer = JV.JC.getPointer (this.offset);
this.zSlab = this.atom.sZ - Clazz_doubleToInt (this.atom.sD / 2) - 3;
if (this.zSlab < 1) this.zSlab = 1;
this.zBox = this.zSlab;
if (labelsGroup) {
var group = this.atom.group;
var ig = group.groupIndex;
if (ig != iGroup) {
group.getMinZ (atoms, this.minZ);
iGroup = ig;
}this.zBox = this.minZ[0];
} else if (labelsFront) {
this.zBox = 1;
}if (this.zBox < 1) this.zBox = 1;
var text = labels.getLabel (i);
this.boxXY = (!this.isExport || this.vwr.creatingImage ? labels.getBox (i) :  Clazz_newFloatArray (5, 0));
if (this.boxXY == null) labels.putBox (i, this.boxXY =  Clazz_newFloatArray (5, 0));
text = this.renderLabelOrMeasure (text, label);
if (text != null) {
labels.putLabel (i, text);
}if (isAntialiased) {
this.boxXY[0] /= 2;
this.boxXY[1] /= 2;
}this.boxXY[4] = this.zBox;
}
return false;
});
Clazz_defineMethod (c$, "renderLabelOrMeasure", 
function (text, label) {
var newText = false;
if (text != null) {
if (text.font == null) text.setFontFromFid (this.fid);
text.atomX = this.atomPt.sX;
text.atomY = this.atomPt.sY;
text.atomZ = this.zSlab;
if (text.pymolOffset == null) {
text.setXYZs (this.atomPt.sX, this.atomPt.sY, this.zBox, this.zSlab);
text.colix = this.labelColix;
text.bgcolix = this.bgcolix;
} else {
text.getPymolScreenOffset (this.atomPt, this.screen, this.zSlab, this.pTemp, this.sppm);
}} else {
var isLeft = (this.textAlign == 4 || this.textAlign == 0);
if (this.fid != this.fidPrevious || this.ascent == 0) {
this.vwr.gdata.setFontFid (this.fid);
this.fidPrevious = this.fid;
this.font3d = this.vwr.gdata.getFont3DCurrent ();
if (isLeft) {
this.ascent = this.font3d.getAscent ();
this.descent = this.font3d.getDescent ();
}}var isSimple = isLeft && (this.imageFontScaling == 1 && this.scalePixelsPerMicron == 0 && label.indexOf ("|") < 0 && label.indexOf ("\n") < 0 && label.indexOf ("<su") < 0 && label.indexOf ("<co") < 0);
if (isSimple) {
var doPointer = ((this.pointer & 1) != 0);
var pointerColix = ((this.pointer & 2) != 0 && this.bgcolix != 0 ? this.bgcolix : this.labelColix);
this.boxXY[0] = this.atomPt.sX;
this.boxXY[1] = this.atomPt.sY;
J.render.TextRenderer.renderSimpleLabel (this.g3d, this.font3d, label, this.labelColix, this.bgcolix, this.boxXY, this.zBox, this.zSlab, JV.JC.getXOffset (this.offset), JV.JC.getYOffset (this.offset), this.ascent, this.descent, doPointer, pointerColix, this.isAbsolute);
return null;
}text = JM.Text.newLabel (this.vwr, this.font3d, label, this.labelColix, this.bgcolix, this.textAlign, 0);
text.atomX = this.atomPt.sX;
text.atomY = this.atomPt.sY;
text.atomZ = this.zSlab;
text.setXYZs (this.atomPt.sX, this.atomPt.sY, this.zBox, this.zSlab);
newText = true;
}if (text.pymolOffset == null) {
if (text.font == null) text.setFontFromFid (this.font3d.fid);
text.setOffset (this.offset);
if (this.textAlign != 0) text.setAlignment (this.textAlign);
}text.pointer = this.pointer;
J.render.TextRenderer.render (text, this.g3d, this.scalePixelsPerMicron, this.imageFontScaling, this.isAbsolute, this.boxXY, this.xy);
return (newText ? text : null);
}, "JM.Text,~S");
});
Clazz_declarePackage ("J.render");
Clazz_load (["J.render.LabelsRenderer"], "J.render.MeasuresRenderer", ["java.util.Hashtable", "JU.A4", "$.M3", "$.Measure", "$.P3", "J.render.FontLineShapeRenderer", "J.shape.Measures", "JU.Point3fi"], function () {
c$ = Clazz_decorateAsClass (function () {
this.doJustify = false;
this.modulating = false;
this.mad0 = 0;
this.mpts = null;
this.m = null;
this.p = null;
this.count = 0;
this.aaT = null;
this.matrixT = null;
Clazz_instantialize (this, arguments);
}, J.render, "MeasuresRenderer", J.render.LabelsRenderer);
Clazz_overrideMethod (c$, "initRenderer", 
function () {
this.mpts =  new java.util.Hashtable ();
this.p =  new Array (4);
});
Clazz_overrideMethod (c$, "render", 
function () {
if (!this.g3d.checkTranslucent (false)) return false;
if (this.atomPt == null) this.atomPt =  new JU.Point3fi ();
var measures = this.shape;
if (measures.ms !== this.ms) {
System.out.println ("!measure wrong modelset!");
measures.clear ();
return false;
}this.doJustify = this.vwr.getBoolean (603979870);
this.modulating = this.ms.bsModulated != null;
this.imageFontScaling = this.vwr.imageFontScaling;
this.mad0 = measures.mad;
this.font3d = this.vwr.gdata.getFont3DScaled (J.shape.Measures.font3d, this.imageFontScaling);
this.m = measures.mPending;
if (!this.isExport && this.m != null && (this.count = this.m.count) != 0) this.renderPendingMeasurement ();
if (!this.vwr.getBoolean (603979926)) return false;
var showMeasurementLabels = this.vwr.getBoolean (603979878);
measures.setVisibilityInfo ();
for (var i = measures.measurementCount; --i >= 0; ) {
this.m = measures.measurements.get (i);
if (!this.m.isVisible || !this.m.$isValid || (this.count = this.m.count) == 1 && this.m.traceX == -2147483648) continue;
this.getPoints ();
this.colix = this.m.colix;
if (this.colix == 0) this.colix = measures.colix;
if (this.colix == 0) this.colix = this.vwr.cm.colixBackgroundContrast;
this.labelColix = this.m.labelColix;
if (this.labelColix == 0) this.labelColix = this.vwr.cm.colixBackgroundContrast;
 else if (this.labelColix == -1) this.labelColix = this.colix;
this.g3d.setC (this.colix);
this.colixA = this.colixB = this.colix;
this.renderMeasurement (showMeasurementLabels);
}
return false;
});
Clazz_defineMethod (c$, "getPoints", 
 function () {
for (var j = this.count; --j >= 0; ) {
var i = this.m.getAtomIndex (j + 1);
var pt = (i >= 0 && this.modulating ? this.getModAtom (i) : this.m.getAtom (j + 1));
if (pt.sD < 0) {
this.tm.transformPtScr (pt, this.pt0i);
pt.sX = this.pt0i.x;
pt.sY = this.pt0i.y;
pt.sZ = this.pt0i.z;
}this.p[j] = pt;
}
if (this.modulating) this.m.refresh (this.p);
});
Clazz_defineMethod (c$, "getModAtom", 
 function (i) {
var ii = Integer.$valueOf (i);
var pt = this.mpts.get (ii);
if (pt != null) ii = null;
var v = this.ms.getModulation (i);
if (v == null) {
pt = this.ms.at[i];
} else {
if (pt == null) pt =  new JU.Point3fi ();
pt.setT (this.ms.at[i]);
if (this.vwr.tm.vibrationOn) this.vwr.tm.getVibrationPoint (v, pt, NaN);
pt.sD = -1;
}if (ii != null) this.mpts.put (ii, pt);
return pt;
}, "~N");
Clazz_defineMethod (c$, "renderMeasurement", 
 function (renderLabel) {
var s = (renderLabel ? this.m.getString () : null);
if (s != null) {
if (s.length == 0) {
s = null;
} else if (this.m.text != null) {
this.m.text.setText (s);
this.m.text.colix = this.labelColix;
}}if (this.m.mad == 0) {
this.dotsOrDashes = false;
this.mad = this.mad0;
} else {
this.mad = this.m.mad;
this.dotsOrDashes = true;
this.dashDots = (this.mad < 0 ? null : J.render.FontLineShapeRenderer.ndots);
}switch (this.count) {
case 1:
this.drawLine (this.p[0].sX, this.p[0].sY, this.p[0].sZ, this.m.traceX, this.m.traceY, this.p[0].sZ, this.mad);
break;
case 2:
this.renderDistance (s, this.p[0], this.p[1]);
break;
case 3:
this.renderAngle (s, this.p[0], this.p[1], this.p[2]);
break;
case 4:
this.renderTorsion (s, this.p[0], this.p[1], this.p[2], this.p[3]);
break;
}
this.p[0] = this.p[1] = this.p[2] = this.p[3] = null;
}, "~B");
Clazz_defineMethod (c$, "renderDistance", 
function (s, a, b) {
if ((this.tickInfo = this.m.tickInfo) != null) {
this.drawLine (a.sX, a.sY, a.sZ, b.sX, b.sY, b.sZ, this.mad);
this.tickA = a;
this.tickB = b;
if (this.tickAs == null) {
this.tickAs =  new JU.P3 ();
this.tickBs =  new JU.P3 ();
}this.tickAs.set (a.sX, a.sY, a.sZ);
this.tickBs.set (b.sX, b.sY, b.sZ);
this.drawTicks (this.mad, s != null);
return;
}var zA = a.sZ - a.sD - 10;
var zB = b.sZ - b.sD - 10;
var radius = this.drawLine (a.sX, a.sY, zA, b.sX, b.sY, zB, this.mad);
if (s == null) return;
if (this.mad > 0) radius <<= 1;
var z = Clazz_doubleToInt ((zA + zB) / 2);
if (z < 1) z = 1;
var x = Clazz_doubleToInt ((a.sX + b.sX) / 2);
var y = Clazz_doubleToInt ((a.sY + b.sY) / 2);
if (this.m.text == null) {
this.g3d.setC (this.labelColix);
this.drawString (x, y, z, radius, this.doJustify && (x - a.sX) * (y - a.sY) > 0, false, true, (this.doJustify ? 0 : 2147483647), s);
} else {
this.atomPt.ave (a, b);
this.atomPt.sX = Clazz_doubleToInt ((a.sX + b.sX) / 2);
this.atomPt.sY = Clazz_doubleToInt ((a.sY + b.sY) / 2);
this.renderLabelOrMeasure (this.m.text, s);
}}, "~S,JU.Point3fi,JU.Point3fi");
Clazz_defineMethod (c$, "renderAngle", 
 function (s, a, b, c) {
var zOffset = b.sD + 10;
var zA = a.sZ - a.sD - 10;
var zB = b.sZ - zOffset;
var zC = c.sZ - c.sD - 10;
var radius = this.drawLine (a.sX, a.sY, zA, b.sX, b.sY, zB, this.mad);
radius += this.drawLine (b.sX, b.sY, zB, c.sX, c.sY, zC, this.mad);
if (s == null) return;
radius = Clazz_doubleToInt ((radius + 1) / 2);
if (this.m.value > 175) {
if (this.m.text == null) {
var offset = Clazz_doubleToInt (Math.floor (5 * this.imageFontScaling));
this.g3d.setC (this.labelColix);
this.drawString (b.sX + offset, b.sY - offset, zB, radius, false, false, false, (this.doJustify ? 0 : 2147483647), s);
} else {
this.atomPt.setT (b);
this.renderLabelOrMeasure (this.m.text, s);
}return;
}if (this.m.isTainted ()) {
var radians = JU.Measure.computeAngle (this.p[0], this.p[1], this.p[2], this.vectorT2, this.vectorT3, false);
this.vectorT.cross (this.vectorT2, this.vectorT3);
this.m.renderAxis = JU.A4.new4 (this.vectorT.x, this.vectorT.y, this.vectorT.z, radians);
this.vectorT2.normalize ();
this.vectorT2.scale (0.5);
this.m.renderArc = JU.P3.newP (this.vectorT2);
}if (this.aaT == null) {
this.aaT =  new JU.A4 ();
this.matrixT =  new JU.M3 ();
}var dotCount = Clazz_doubleToInt (Math.floor ((this.m.renderAxis.angle / (6.283185307179586)) * 64));
var stepAngle = this.m.renderAxis.angle / dotCount;
this.aaT.setAA (this.m.renderAxis);
var iMid = Clazz_doubleToInt (dotCount / 2);
for (var i = dotCount; --i >= 0; ) {
this.aaT.angle = i * stepAngle;
this.pointT.setT (this.m.renderArc);
this.matrixT.setAA (this.aaT).rotate (this.pointT);
this.pointT.add (b);
var p3i = this.tm.transformPt (this.pointT);
var zArc = p3i.z - zOffset;
if (zArc < 0) zArc = 0;
this.g3d.drawPixel (p3i.x, p3i.y, zArc);
if (i != iMid) continue;
this.pointT.setT (this.m.renderArc);
this.pointT.scale (1.1);
this.matrixT.rotate (this.pointT);
this.pointT.add (b);
this.tm.transformPt (this.pointT);
var zLabel = p3i.z - zOffset;
if (this.m.text == null) {
this.g3d.setC (this.labelColix);
this.drawString (p3i.x, p3i.y, zLabel, radius, p3i.x < b.sX, false, false, (this.doJustify ? b.sY : 2147483647), s);
} else {
this.atomPt.setT (this.pointT);
this.renderLabelOrMeasure (this.m.text, s);
}}
}, "~S,JU.Point3fi,JU.Point3fi,JU.Point3fi");
Clazz_defineMethod (c$, "renderTorsion", 
 function (s, a, b, c, d) {
var zA = a.sZ - a.sD - 10;
var zB = b.sZ - b.sD - 10;
var zC = c.sZ - c.sD - 10;
var zD = d.sZ - d.sD - 10;
var radius = this.drawLine (a.sX, a.sY, zA, b.sX, b.sY, zB, this.mad);
radius += this.drawLine (b.sX, b.sY, zB, c.sX, c.sY, zC, this.mad);
radius += this.drawLine (c.sX, c.sY, zC, d.sX, d.sY, zD, this.mad);
if (s == null) return;
var zLabel = Clazz_doubleToInt ((zA + zB + zC + zD) / 4);
radius /= 3;
if (this.m.text == null) {
this.g3d.setC (this.labelColix);
this.drawString (Clazz_doubleToInt ((a.sX + b.sX + c.sX + d.sX) / 4), Clazz_doubleToInt ((a.sY + b.sY + c.sY + d.sY) / 4), zLabel, radius, false, false, false, (this.doJustify ? 0 : 2147483647), s);
} else {
this.atomPt.add2 (a, b);
this.atomPt.add (c);
this.atomPt.add (d);
this.atomPt.scale (0.25);
this.renderLabelOrMeasure (this.m.text, s);
}}, "~S,JU.Point3fi,JU.Point3fi,JU.Point3fi,JU.Point3fi");
Clazz_defineMethod (c$, "renderPendingMeasurement", 
 function () {
try {
this.getPoints ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
(this.shape).mPending = null;
return;
} else {
throw e;
}
}
var renderLabel = (this.m.traceX == -2147483648);
this.g3d.setC (this.labelColix = (renderLabel ? this.vwr.cm.colixRubberband : this.count == 2 ? 20 : 23));
if ((this.m).haveTarget) {
this.renderMeasurement (renderLabel);
return;
}var atomLast = this.p[this.count - 1];
if (this.count > 1) this.renderMeasurement (false);
var lastZ = atomLast.sZ - atomLast.sD - 10;
var x = this.vwr.getCursorX ();
var y = this.vwr.getCursorY ();
if (this.g3d.isAntialiased ()) {
x <<= 1;
y <<= 1;
}this.drawLine (atomLast.sX, atomLast.sY, lastZ, x, y, lastZ, this.mad);
});
Clazz_overrideMethod (c$, "drawLine", 
function (x1, y1, z1, x2, y2, z2, mad) {
var diameter = Clazz_floatToInt (mad >= 20 && this.exportType != 1 ? this.vwr.tm.scaleToScreen (Clazz_doubleToInt ((z1 + z2) / 2), mad) : mad);
if (this.dotsOrDashes && (this.dashDots == null || this.dashDots === J.render.FontLineShapeRenderer.ndots)) this.width = diameter;
return this.drawLine2 (x1, y1, z1, x2, y2, z2, diameter);
}, "~N,~N,~N,~N,~N,~N,~N");
});
Clazz_declarePackage ("J.render");
Clazz_load (["J.render.LabelsRenderer"], "J.render.EchoRenderer", ["JM.Atom", "J.render.TextRenderer", "JU.C", "$.Txt"], function () {
c$ = Clazz_declareType (J.render, "EchoRenderer", J.render.LabelsRenderer);
Clazz_overrideMethod (c$, "render", 
function () {
if (this.vwr.isPreviewOnly) return false;
var echo = this.shape;
this.sppm = (this.vwr.getBoolean (603979845) ? this.vwr.getScalePixelsPerAngstrom (true) * 10000 : 0);
this.imageFontScaling = this.vwr.imageFontScaling;
var haveTranslucent = false;
for (var t, $t = echo.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) {
if (!t.visible || t.hidden) {
continue;
}if (Clazz_instanceOf (t.pointerPt, JM.Atom)) {
if (!(t.pointerPt).checkVisible ()) continue;
}if (t.valign == 4) {
this.tm.transformPtScr (t.xyz, this.pt0i);
t.setXYZs (this.pt0i.x, this.pt0i.y, this.pt0i.z, this.pt0i.z);
}if (t.pymolOffset != null) t.getPymolScreenOffset (t.xyz, this.pt0i, this.zSlab, this.pTemp, this.sppm);
 else if (t.movableZPercent != 2147483647) {
var z = this.vwr.tm.zValueFromPercent (t.movableZPercent % 1000);
if (t.valign == 4 && Math.abs (t.movableZPercent) >= 1000) z = this.pt0i.z - this.vwr.tm.zValueFromPercent (0) + z;
t.setZs (z, z);
}if (t.pointerPt == null) {
t.pointer = 0;
} else {
t.pointer = 1;
this.tm.transformPtScr (t.pointerPt, this.pt0i);
t.atomX = this.pt0i.x;
t.atomY = this.pt0i.y;
t.atomZ = this.pt0i.z;
if (t.zSlab == -2147483648) t.zSlab = 1;
}if (J.render.TextRenderer.render (t, this.g3d, this.sppm, this.imageFontScaling, false, null, this.xy) && t.valign == 1 && t.align == 12) this.vwr.noFrankEcho = false;
if (JU.C.renderPass2 (t.bgcolix) || JU.C.renderPass2 (t.colix)) haveTranslucent = true;
}
if (!this.isExport) {
var frameTitle = this.vwr.getFrameTitle ();
if (frameTitle != null && frameTitle.length > 0) {
if (this.g3d.setC (this.vwr.cm.colixBackgroundContrast)) {
if (frameTitle.indexOf ("%{") >= 0 || frameTitle.indexOf ("@{") >= 0) frameTitle = JU.Txt.formatText (this.vwr, frameTitle);
this.renderFrameTitle (frameTitle);
}}}return haveTranslucent;
});
Clazz_defineMethod (c$, "renderFrameTitle", 
 function (frameTitle) {
this.vwr.gdata.setFontFid (this.vwr.gdata.getFontFidFS ("arial", Clazz_floatToInt (24 * this.imageFontScaling)));
var y = Clazz_doubleToInt (Math.floor (this.vwr.getScreenHeight () * (this.g3d.isAntialiased () ? 2 : 1) - 10 * this.imageFontScaling));
var x = Clazz_doubleToInt (Math.floor (5 * this.imageFontScaling));
this.g3d.drawStringNoSlab (frameTitle, null, x, y, 0, 0);
}, "~S");
});
Clazz_declarePackage ("J.render");
Clazz_load (["J.render.ShapeRenderer"], "J.render.HoverRenderer", ["JU.P3", "J.render.TextRenderer", "JU.Txt"], function () {
c$ = Clazz_decorateAsClass (function () {
this.tempXY = null;
this.ptTemp = null;
Clazz_instantialize (this, arguments);
}, J.render, "HoverRenderer", J.render.ShapeRenderer);
Clazz_prepareFields (c$, function () {
this.tempXY =  Clazz_newFloatArray (3, 0);
});
Clazz_overrideMethod (c$, "render", 
function () {
if (this.tm.isNavigating ()) return false;
if (this.ptTemp == null) this.ptTemp =  new JU.P3 ();
var hover = this.shape;
var antialias = this.g3d.isAntialiased ();
var text = hover.hoverText;
var label;
if (hover.atomIndex >= 0) {
var atom = this.ms.at[hover.atomIndex];
label = (hover.specialLabel != null ? hover.specialLabel : hover.atomFormats != null && hover.atomFormats[hover.atomIndex] != null ? this.vwr.ms.getLabeler ().formatLabel (this.vwr, atom, hover.atomFormats[hover.atomIndex], this.ptTemp) : hover.labelFormat != null ? this.vwr.ms.getLabeler ().formatLabel (this.vwr, atom, this.fixLabel (atom, hover.labelFormat), this.ptTemp) : null);
if (label == null) return false;
text.setXYZs (atom.sX, atom.sY, 1, -2147483648);
} else if (hover.text != null) {
label = hover.text;
text.setXYZs (hover.xy.x, hover.xy.y, 1, -2147483648);
} else {
return true;
}if (this.vwr != null && (label.indexOf ("%{") >= 0 || label.indexOf ("@{") >= 0)) label = JU.Txt.formatText (this.vwr, label);
text.setText (label);
J.render.TextRenderer.render (text, this.g3d, 0, antialias ? 2 : 1, false, null, this.tempXY);
return true;
});
Clazz_defineMethod (c$, "fixLabel", 
function (atom, label) {
if (label == null) return null;
return (this.vwr.ms.isJmolDataFrameForModel (atom.mi) && label.equals ("%U") ? "%W" : label);
}, "JM.Atom,~S");
});
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
