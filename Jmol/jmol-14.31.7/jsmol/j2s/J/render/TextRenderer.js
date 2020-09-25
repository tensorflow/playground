Clazz.declarePackage ("J.render");
Clazz.load (null, "J.render.TextRenderer", ["java.lang.Float", "JM.Text"], function () {
c$ = Clazz.declareType (J.render, "TextRenderer");
c$.render = Clazz.defineMethod (c$, "render", 
function (text, g3d, scalePixelsPerMicron, imageFontScaling, isAbsolute, boxXY, temp) {
if (text == null || text.image == null && !text.doFormatText && text.lines == null) return false;
var showText = g3d.setC (text.colix);
if (!showText && (text.image == null && (text.bgcolix == 0 || !g3d.setC (text.bgcolix)))) return false;
text.setPosition (scalePixelsPerMicron, imageFontScaling, isAbsolute, boxXY);
if (text.image == null && text.bgcolix != 0) {
if (g3d.setC (text.bgcolix)) J.render.TextRenderer.showBox (g3d, text.colix, Clazz.floatToInt (text.boxX), Clazz.floatToInt (text.boxY) + text.boxYoff2 * 2, text.z + 2, text.zSlab, Clazz.floatToInt (text.boxWidth), Clazz.floatToInt (text.boxHeight), text.fontScale, !text.isEcho);
if (!showText) return false;
}if (text.image == null) {
for (var i = 0; i < text.lines.length; i++) {
text.setXYA (temp, i);
g3d.drawString (text.lines[i], text.font, Clazz.floatToInt (temp[0]), Clazz.floatToInt (temp[1]), text.z, text.zSlab, text.bgcolix);
}
} else {
g3d.drawImage (text.image, Clazz.floatToInt (text.boxX), Clazz.floatToInt (text.boxY), text.z, text.zSlab, text.bgcolix, Clazz.floatToInt (text.boxWidth), Clazz.floatToInt (text.boxHeight));
}if ((text.pointer & 1) == 0 || !g3d.setC ((text.pointer & 2) != 0 && text.bgcolix != 0 ? text.bgcolix : text.colix)) return true;
var w = text.boxWidth;
var h = text.boxHeight;
var pt = NaN;
var x = text.boxX + (text.boxX > text.atomX + w ? 0 : text.boxX + w < text.atomX - w ? w : (pt = w / 2));
var setY = !Float.isNaN (pt);
var y = text.boxY + (setY && text.boxY > text.atomY ? 0 : setY && text.boxY + h < text.atomY ? h : h / 2);
g3d.drawLineXYZ (text.atomX, text.atomY, text.atomZ, Clazz.floatToInt (x), Clazz.floatToInt (y), text.zSlab);
return true;
}, "JM.Text,J.api.JmolRendererInterface,~N,~N,~B,~A,~A");
c$.renderSimpleLabel = Clazz.defineMethod (c$, "renderSimpleLabel", 
function (g3d, font, strLabel, colix, bgcolix, boxXY, z, zSlab, xOffset, yOffset, ascent, descent, doPointer, pointerColix, isAbsolute) {
var boxWidth = font.stringWidth (strLabel) + 8;
var boxHeight = ascent + descent + 8;
var x0 = Clazz.floatToInt (boxXY[0]);
var y0 = Clazz.floatToInt (boxXY[1]);
JM.Text.setBoxXY (boxWidth, boxHeight, xOffset, yOffset, boxXY, isAbsolute);
var x = boxXY[0];
var y = boxXY[1];
if (bgcolix != 0 && g3d.setC (bgcolix)) J.render.TextRenderer.showBox (g3d, colix, Clazz.floatToInt (x), Clazz.floatToInt (y), z, zSlab, Clazz.floatToInt (boxWidth), Clazz.floatToInt (boxHeight), 1, true);
 else g3d.setC (colix);
g3d.drawString (strLabel, font, Clazz.floatToInt (x + 4), Clazz.floatToInt (y + 4 + ascent), z - 1, zSlab, bgcolix);
if (doPointer) {
g3d.setC (pointerColix);
if (xOffset > 0) g3d.drawLineXYZ (x0, y0, zSlab, Clazz.floatToInt (x), Clazz.floatToInt (y + boxHeight / 2), zSlab);
 else if (xOffset < 0) g3d.drawLineXYZ (x0, y0, zSlab, Clazz.floatToInt (x + boxWidth), Clazz.floatToInt (y + boxHeight / 2), zSlab);
}}, "J.api.JmolRendererInterface,JU.Font,~S,~N,~N,~A,~N,~N,~N,~N,~N,~N,~B,~N,~B");
c$.showBox = Clazz.defineMethod (c$, "showBox", 
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
