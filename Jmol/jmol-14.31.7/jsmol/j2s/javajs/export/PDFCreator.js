Clazz.declarePackage ("javajs.export");
Clazz.load (null, "javajs.export.PDFCreator", ["java.lang.Double", "java.util.Hashtable", "javajs.export.PDFObject", "JU.Lst", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.os = null;
this.indirectObjects = null;
this.root = null;
this.graphics = null;
this.pt = 0;
this.xrefPt = 0;
this.count = 0;
this.height = 0;
this.width = 0;
this.fonts = null;
this.images = null;
Clazz.instantialize (this, arguments);
}, javajs["export"], "PDFCreator");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setOutputStream", 
function (os) {
this.os = os;
}, "java.io.OutputStream");
Clazz.defineMethod (c$, "newDocument", 
function (paperWidth, paperHeight, isLandscape) {
this.width = (isLandscape ? paperHeight : paperWidth);
this.height = (isLandscape ? paperWidth : paperHeight);
System.out.println ("Creating PDF with width=" + this.width + " and height=" + this.height);
this.fonts =  new java.util.Hashtable ();
this.indirectObjects =  new JU.Lst ();
this.root = this.newObject ("Catalog");
var pages = this.newObject ("Pages");
var page = this.newObject ("Page");
var pageContents = this.newObject (null);
this.graphics = this.newObject ("XObject");
this.root.addDef ("Pages", pages.getRef ());
pages.addDef ("Count", "1");
pages.addDef ("Kids", "[ " + page.getRef () + " ]");
page.addDef ("Parent", pages.getRef ());
page.addDef ("MediaBox", "[ 0 0 " + paperWidth + " " + paperHeight + " ]");
if (isLandscape) page.addDef ("Rotate", "90");
pageContents.addDef ("Length", "?");
pageContents.append ((isLandscape ? "q 0 1 1 0 0 0 " : "q 1 0 0 -1 0 " + (paperHeight)) + " cm /" + this.graphics.getID () + " Do Q");
page.addDef ("Contents", pageContents.getRef ());
this.addProcSet (page);
this.addProcSet (this.graphics);
this.graphics.addDef ("Subtype", "/Form");
this.graphics.addDef ("FormType", "1");
this.graphics.addDef ("BBox", "[0 0 " + this.width + " " + this.height + "]");
this.graphics.addDef ("Matrix", "[1 0 0 1 0 0]");
this.graphics.addDef ("Length", "?");
page.addResource ("XObject", this.graphics.getID (), this.graphics.getRef ());
this.g ("q 1 w 1 J 1 j 10 M []0 d q ");
this.clip (0, 0, this.width, this.height);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "addProcSet", 
 function (o) {
o.addResource (null, "ProcSet", "[/PDF /Text /ImageB /ImageC /ImageI]");
}, "javajs.export.PDFObject");
Clazz.defineMethod (c$, "clip", 
 function (x1, y1, x2, y2) {
this.moveto (x1, y1);
this.lineto (x2, y1);
this.lineto (x2, y2);
this.lineto (x1, y2);
this.g ("h W n");
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "moveto", 
function (x, y) {
this.g (x + " " + y + " m");
}, "~N,~N");
Clazz.defineMethod (c$, "lineto", 
function (x, y) {
this.g (x + " " + y + " l");
}, "~N,~N");
Clazz.defineMethod (c$, "newObject", 
 function (type) {
var o =  new javajs["export"].PDFObject (++this.count);
if (type != null) o.addDef ("Type", "/" + type);
this.indirectObjects.addLast (o);
return o;
}, "~S");
Clazz.defineMethod (c$, "addInfo", 
function (data) {
var info =  new java.util.Hashtable ();
for (var e, $e = data.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var value = "(" + e.getValue ().$replace (')', '_').$replace ('(', '_') + ")";
info.put (e.getKey (), value);
}
this.root.addDef ("Info", info);
}, "java.util.Map");
Clazz.defineMethod (c$, "addFontResource", 
 function (fname) {
var f = this.newObject ("Font");
this.fonts.put (fname, f);
f.addDef ("BaseFont", fname);
f.addDef ("Encoding", "/WinAnsiEncoding");
f.addDef ("Subtype", "/Type1");
this.graphics.addResource ("Font", f.getID (), f.getRef ());
return f;
}, "~S");
Clazz.defineMethod (c$, "addImageResource", 
function (newImage, width, height, buffer, isRGB) {
var imageObj = this.newObject ("XObject");
if (this.images == null) this.images =  new java.util.Hashtable ();
this.images.put (newImage, imageObj);
imageObj.addDef ("Subtype", "/Image");
imageObj.addDef ("Length", "?");
imageObj.addDef ("ColorSpace", isRGB ? "/DeviceRGB" : "/DeviceGray");
imageObj.addDef ("BitsPerComponent", "8");
imageObj.addDef ("Width", "" + width);
imageObj.addDef ("Height", "" + height);
this.graphics.addResource ("XObject", imageObj.getID (), imageObj.getRef ());
var n = buffer.length;
var stream =  Clazz.newByteArray (n * (isRGB ? 3 : 1), 0);
if (isRGB) {
for (var i = 0, pt = 0; i < n; i++) {
stream[pt++] = ((buffer[i] >> 16) & 0xFF);
stream[pt++] = ((buffer[i] >> 8) & 0xFF);
stream[pt++] = (buffer[i] & 0xFF);
}
} else {
for (var i = 0; i < n; i++) stream[i] = buffer[i];

}imageObj.setStream (stream);
this.graphics.addResource ("XObject", imageObj.getID (), imageObj.getRef ());
}, "~O,~N,~N,~A,~B");
Clazz.defineMethod (c$, "g", 
function (cmd) {
this.graphics.append (cmd).appendC ('\n');
}, "~S");
Clazz.defineMethod (c$, "output", 
 function (s) {
var b = s.getBytes ();
this.os.write (b, 0, b.length);
this.pt += b.length;
}, "~S");
Clazz.defineMethod (c$, "closeDocument", 
function () {
this.g ("Q Q");
this.outputHeader ();
this.writeObjects ();
this.writeXRefTable ();
this.writeTrailer ();
this.os.flush ();
this.os.close ();
});
Clazz.defineMethod (c$, "outputHeader", 
 function () {
this.output ("%PDF-1.3\n%");
var b =  Clazz.newByteArray (-1, [-1, -1, -1, -1]);
this.os.write (b, 0, b.length);
this.pt += 4;
this.output ("\n");
});
Clazz.defineMethod (c$, "writeTrailer", 
 function () {
var trailer =  new javajs["export"].PDFObject (-2);
this.output ("trailer");
trailer.addDef ("Size", "" + this.indirectObjects.size ());
trailer.addDef ("Root", this.root.getRef ());
trailer.output (this.os);
this.output ("startxref\n");
this.output ("" + this.xrefPt + "\n");
this.output ("%%EOF\n");
});
Clazz.defineMethod (c$, "writeObjects", 
 function () {
var nObj = this.indirectObjects.size ();
for (var i = 0; i < nObj; i++) {
var o = this.indirectObjects.get (i);
if (!o.isFont ()) continue;
o.pt = this.pt;
this.pt += o.output (this.os);
}
for (var i = 0; i < nObj; i++) {
var o = this.indirectObjects.get (i);
if (o.isFont ()) continue;
o.pt = this.pt;
this.pt += o.output (this.os);
}
});
Clazz.defineMethod (c$, "writeXRefTable", 
 function () {
this.xrefPt = this.pt;
var nObj = this.indirectObjects.size ();
var sb =  new JU.SB ();
sb.append ("xref\n0 " + (nObj + 1) + "\n0000000000 65535 f\r\n");
for (var i = 0; i < nObj; i++) {
var o = this.indirectObjects.get (i);
var s = "0000000000" + o.pt;
sb.append (s.substring (s.length - 10));
sb.append (" 00000 n\r\n");
}
this.output (sb.toString ());
});
Clazz.defineMethod (c$, "canDoLineTo", 
function () {
return true;
});
Clazz.defineMethod (c$, "fill", 
function () {
this.g ("f");
});
Clazz.defineMethod (c$, "stroke", 
function () {
this.g ("S");
});
Clazz.defineMethod (c$, "doCircle", 
function (x, y, r, doFill) {
var d = r * 4 * (Math.sqrt (2) - 1) / 3;
var dx = x;
var dy = y;
this.g ((dx + r) + " " + dy + " m");
this.g ((dx + r) + " " + (dy + d) + " " + (dx + d) + " " + (dy + r) + " " + (dx) + " " + (dy + r) + " " + " c");
this.g ((dx - d) + " " + (dy + r) + " " + (dx - r) + " " + (dy + d) + " " + (dx - r) + " " + (dy) + " c");
this.g ((dx - r) + " " + (dy - d) + " " + (dx - d) + " " + (dy - r) + " " + (dx) + " " + (dy - r) + " c");
this.g ((dx + d) + " " + (dy - r) + " " + (dx + r) + " " + (dy - d) + " " + (dx + r) + " " + (dy) + " c");
this.g (doFill ? "f" : "s");
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "doPolygon", 
function (axPoints, ayPoints, nPoints, doFill) {
this.moveto (axPoints[0], ayPoints[0]);
for (var i = 1; i < nPoints; i++) this.lineto (axPoints[i], ayPoints[i]);

this.g (doFill ? "f" : "s");
}, "~A,~A,~N,~B");
Clazz.defineMethod (c$, "doRect", 
function (x, y, width, height, doFill) {
this.g (x + " " + y + " " + width + " " + height + " re " + (doFill ? "f" : "s"));
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "drawImage", 
function (image, destX0, destY0, destX1, destY1, srcX0, srcY0, srcX1, srcY1) {
var imageObj = this.images.get (image);
if (imageObj == null) return;
this.g ("q");
this.clip (destX0, destY0, destX1, destY1);
var iw = Double.parseDouble (imageObj.getDef ("Width"));
var ih = Double.parseDouble (imageObj.getDef ("Height"));
var dw = (destX1 - destX0 + 1);
var dh = (destY1 - destY0 + 1);
var sw = (srcX1 - srcX0 + 1);
var sh = (srcY1 - srcY0 + 1);
var scaleX = dw / sw;
var scaleY = dh / sh;
var transX = destX0 - srcX0 * scaleX;
var transY = destY0 + (ih - srcY0) * scaleY;
this.g (scaleX * iw + " 0 0 " + -scaleY * ih + " " + transX + " " + transY + " cm");
this.g ("/" + imageObj.getID () + " Do");
this.g ("Q");
}, "~O,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawStringRotated", 
function (s, x, y, angle) {
this.g ("q " + this.getRotation (angle) + " " + x + " " + y + " cm BT(" + s + ")Tj ET Q");
}, "~S,~N,~N,~N");
Clazz.defineMethod (c$, "getRotation", 
function (angle) {
var cos = 0;
var sin = 0;
switch (angle) {
case 0:
cos = 1;
break;
case 90:
sin = 1;
break;
case -90:
sin = -1;
break;
case 180:
cos = -1;
break;
default:
var a = (angle / 180.0 * 3.141592653589793);
cos = Math.cos (a);
sin = Math.sin (a);
if (Math.abs (cos) < 0.0001) cos = 0;
if (Math.abs (sin) < 0.0001) sin = 0;
}
return cos + " " + sin + " " + sin + " " + -cos;
}, "~N");
Clazz.defineMethod (c$, "setColor", 
function (rgb, isFill) {
this.g (rgb[0] + " " + rgb[1] + " " + rgb[2] + (isFill ? " rg" : " RG"));
}, "~A,~B");
Clazz.defineMethod (c$, "setFont", 
function (fname, size) {
var f = this.fonts.get (fname);
if (f == null) f = this.addFontResource (fname);
this.g ("/" + f.getID () + " " + size + " Tf");
}, "~S,~N");
Clazz.defineMethod (c$, "setLineWidth", 
function (width) {
this.g (width + " w");
}, "~N");
Clazz.defineMethod (c$, "translateScale", 
function (x, y, scale) {
this.g (scale + " 0 0 " + scale + " " + x + " " + y + " cm");
}, "~N,~N,~N");
});
