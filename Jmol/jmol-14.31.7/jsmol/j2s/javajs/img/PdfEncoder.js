Clazz.declarePackage ("javajs.img");
Clazz.load (["javajs.img.ImageEncoder"], "javajs.img.PdfEncoder", ["java.util.Hashtable", "javajs.export.PDFCreator"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isLandscape = false;
this.pdf = null;
this.comment = null;
Clazz.instantialize (this, arguments);
}, javajs.img, "PdfEncoder", javajs.img.ImageEncoder);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javajs.img.PdfEncoder, []);
});
Clazz.overrideMethod (c$, "setParams", 
function (params) {
this.isLandscape = (this.quality > 1);
this.comment = "Jmol " + params.get ("comment");
}, "java.util.Map");
Clazz.overrideMethod (c$, "generate", 
function () {
this.pdf =  new javajs["export"].PDFCreator ();
var pageWidth = 576;
var pageHeight = 792;
this.pdf.setOutputStream (this.out);
this.pdf.newDocument (pageWidth, pageHeight, this.isLandscape);
this.addMyImage (pageWidth, pageHeight);
var ht =  new java.util.Hashtable ();
if (this.comment != null) ht.put ("Producer", this.comment);
ht.put ("Author", "JMol");
ht.put ("CreationDate", this.date);
this.pdf.addInfo (ht);
this.pdf.closeDocument ();
});
Clazz.defineMethod (c$, "addMyImage", 
 function (pageWidth, pageHeight) {
this.pdf.addImageResource ("img1", this.width, this.height, this.pixels, true);
var w = (this.isLandscape ? pageHeight : pageWidth);
var h = (this.isLandscape ? pageWidth : pageHeight);
var iw = this.width;
var ih = this.height;
if (iw > 0.9 * w) {
ih = Clazz.doubleToInt (ih * 0.9 * w / iw);
iw = Clazz.doubleToInt (w * 0.9);
}if (ih > 0.9 * h) {
iw = Clazz.doubleToInt (iw * 0.9 * h / ih);
ih = Clazz.doubleToInt (h * 0.9);
}var x = 0;
var y = 0;
var x1 = iw;
var y1 = ih;
if (w > iw) {
x = Clazz.doubleToInt ((w - iw) / 2);
x1 = iw + x;
}if (h > ih) {
y = Clazz.doubleToInt ((h - ih) / 2);
y1 = ih + y;
}this.pdf.drawImage ("img1", x, y, x1, y1, 0, 0, this.width, this.height);
}, "~N,~N");
});
