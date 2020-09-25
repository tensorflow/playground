Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.api.JSVPdfWriter", "J.api.GenericGraphics"], "JSV.common.PDFWriter", ["java.util.Hashtable", "javajs.export.PDFCreator", "JU.CU", "JSV.common.JSVersion"], function () {
c$ = Clazz.decorateAsClass (function () {
this.g2d = null;
this.date = null;
this.pdf = null;
this.inPath = false;
this.rgb = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "PDFWriter", null, [J.api.GenericGraphics, JSV.api.JSVPdfWriter]);
Clazz.prepareFields (c$, function () {
this.rgb =  Clazz.newFloatArray (3, 0);
});
Clazz.makeConstructor (c$, 
function () {
this.pdf =  new javajs["export"].PDFCreator ();
});
Clazz.overrideMethod (c$, "createPdfDocument", 
function (panel, pl, os) {
var isLandscape = pl.layout.equals ("landscape");
this.date = pl.date;
this.pdf.setOutputStream (os);
this.g2d = panel.getPanelData ().g2d;
try {
this.pdf.newDocument (pl.paperWidth, pl.paperHeight, isLandscape);
var ht =  new java.util.Hashtable ();
ht.put ("Producer", JSV.common.JSVersion.VERSION);
ht.put ("Creator", "JSpecView " + JSV.common.JSVersion.VERSION);
ht.put ("Author", "JSpecView");
if (this.date != null) ht.put ("CreationDate", this.date);
this.pdf.addInfo (ht);
panel.getPanelData ().printPdf (this, pl);
this.pdf.closeDocument ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
panel.showMessage (e.toString (), "PDF Creation Error");
} else {
throw e;
}
}
}, "JSV.api.JSVPanel,JSV.common.PrintLayout,java.io.OutputStream");
Clazz.overrideMethod (c$, "canDoLineTo", 
function () {
return true;
});
Clazz.overrideMethod (c$, "doStroke", 
function (g, isBegin) {
this.inPath = isBegin;
if (!this.inPath) this.pdf.stroke ();
}, "~O,~B");
Clazz.overrideMethod (c$, "drawCircle", 
function (g, x, y, diameter) {
this.pdf.doCircle (x, y, Clazz.doubleToInt (diameter / 2.0), false);
}, "~O,~N,~N,~N");
Clazz.overrideMethod (c$, "drawLine", 
function (g, x0, y0, x1, y1) {
this.pdf.moveto (x0, y0);
this.pdf.lineto (x1, y1);
if (!this.inPath) this.pdf.stroke ();
}, "~O,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawPolygon", 
function (g, axPoints, ayPoints, nPoints) {
this.pdf.doPolygon (axPoints, ayPoints, nPoints, false);
}, "~O,~A,~A,~N");
Clazz.overrideMethod (c$, "drawRect", 
function (g, x, y, width, height) {
this.pdf.doRect (x, y, width, height, false);
}, "~O,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawString", 
function (g, s, x, y) {
this.pdf.drawStringRotated (s, x, y, 0);
}, "~O,~S,~N,~N");
Clazz.overrideMethod (c$, "drawStringRotated", 
function (g, s, x, y, angle) {
this.pdf.drawStringRotated (s, x, y, Clazz.doubleToInt (angle));
}, "~O,~S,~N,~N,~N");
Clazz.overrideMethod (c$, "fillBackground", 
function (g, bgcolor) {
}, "~O,javajs.api.GenericColor");
Clazz.overrideMethod (c$, "fillCircle", 
function (g, x, y, diameter) {
this.pdf.doCircle (x, y, Clazz.doubleToInt (diameter / 2.0), true);
}, "~O,~N,~N,~N");
Clazz.overrideMethod (c$, "fillPolygon", 
function (g, ayPoints, axPoints, nPoints) {
this.pdf.doPolygon (axPoints, ayPoints, nPoints, true);
}, "~O,~A,~A,~N");
Clazz.overrideMethod (c$, "fillRect", 
function (g, x, y, width, height) {
this.pdf.doRect (x, y, width, height, true);
}, "~O,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "lineTo", 
function (g, x, y) {
this.pdf.lineto (x, y);
}, "~O,~N,~N");
Clazz.overrideMethod (c$, "setGraphicsColor", 
function (g, c) {
JU.CU.toRGB3f (c.getRGB (), this.rgb);
this.pdf.setColor (this.rgb, true);
this.pdf.setColor (this.rgb, false);
}, "~O,javajs.api.GenericColor");
Clazz.overrideMethod (c$, "setFont", 
function (g, font) {
var fname = "/Helvetica";
switch (font.idFontStyle) {
case 1:
fname += "-Bold";
break;
case 3:
fname += "-BoldOblique";
break;
case 2:
fname += "-Oblique";
break;
}
this.pdf.setFont (fname, font.fontSizeNominal);
return font;
}, "~O,JU.Font");
Clazz.overrideMethod (c$, "setStrokeBold", 
function (g, tf) {
this.pdf.setLineWidth (tf ? 2 : 1);
}, "~O,~B");
Clazz.overrideMethod (c$, "translateScale", 
function (g, x, y, scale) {
this.pdf.translateScale (x, y, scale);
}, "~O,~N,~N,~N");
Clazz.overrideMethod (c$, "newGrayScaleImage", 
function (g, image, width, height, buffer) {
this.pdf.addImageResource (image, width, height, buffer, false);
return image;
}, "~O,~O,~N,~N,~A");
Clazz.overrideMethod (c$, "drawGrayScaleImage", 
function (g, image, destX0, destY0, destX1, destY1, srcX0, srcY0, srcX1, srcY1) {
this.pdf.drawImage (image, destX0, destY0, destX1, destY1, srcX0, srcY0, srcX1, srcY1);
}, "~O,~O,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "setWindowParameters", 
function (width, height) {
}, "~N,~N");
Clazz.defineMethod (c$, "getColor1", 
function (argb) {
return this.g2d.getColor1 (argb);
}, "~N");
Clazz.defineMethod (c$, "getColor3", 
function (red, green, blue) {
return this.g2d.getColor3 (red, green, blue);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getColor4", 
function (r, g, b, a) {
return this.g2d.getColor4 (r, g, b, a);
}, "~N,~N,~N,~N");
});
