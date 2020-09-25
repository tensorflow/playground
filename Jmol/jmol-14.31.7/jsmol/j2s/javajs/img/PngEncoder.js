Clazz.declarePackage ("javajs.img");
Clazz.load (["javajs.img.CRCEncoder"], "javajs.img.PngEncoder", ["java.io.ByteArrayOutputStream", "java.util.zip.Deflater", "$.DeflaterOutputStream"], function () {
c$ = Clazz.decorateAsClass (function () {
this.encodeAlpha = false;
this.filter = 0;
this.bytesPerPixel = 0;
this.compressionLevel = 0;
this.type = null;
this.transparentColor = null;
this.appData = null;
this.appPrefix = null;
this.comment = null;
this.bytes = null;
this.scanLines = null;
this.byteWidth = 0;
Clazz.instantialize (this, arguments);
}, javajs.img, "PngEncoder", javajs.img.CRCEncoder);
Clazz.overrideMethod (c$, "setParams", 
function (params) {
if (this.quality < 0) this.quality = (params.containsKey ("qualityPNG") ? (params.get ("qualityPNG")).intValue () : 2);
if (this.quality > 9) this.quality = 9;
this.encodeAlpha = false;
this.filter = 0;
this.compressionLevel = this.quality;
this.transparentColor = params.get ("transparentColor");
this.comment = params.get ("comment");
this.type = (params.get ("type") + "0000").substring (0, 4);
this.bytes = params.get ("pngImgData");
this.appData = params.get ("pngAppData");
this.appPrefix = params.get ("pngAppPrefix");
}, "java.util.Map");
Clazz.overrideMethod (c$, "generate", 
function () {
if (this.bytes == null) {
if (!this.pngEncode ()) {
this.out.cancel ();
return;
}this.bytes = this.getBytes ();
} else {
this.dataLen = this.bytes.length;
}var len = this.dataLen;
if (this.appData != null) {
javajs.img.PngEncoder.setJmolTypeText (this.appPrefix, this.bytes, len, this.appData.length, this.type);
this.out.write (this.bytes, 0, len);
len = (this.bytes = this.appData).length;
}this.out.write (this.bytes, 0, len);
});
Clazz.defineMethod (c$, "pngEncode", 
 function () {
var pngIdBytes =  Clazz.newByteArray (-1, [-119, 80, 78, 71, 13, 10, 26, 10]);
this.writeBytes (pngIdBytes);
this.writeHeader ();
this.writeText (javajs.img.PngEncoder.getApplicationText (this.appPrefix, this.type, 0, 0));
this.writeText ("Software\0Jmol " + this.comment);
this.writeText ("Creation Time\0" + this.date);
if (!this.encodeAlpha && this.transparentColor != null) this.writeTransparentColor (this.transparentColor.intValue ());
return this.writeImageData ();
});
c$.setJmolTypeText = Clazz.defineMethod (c$, "setJmolTypeText", 
 function (prefix, b, nPNG, nState, type) {
var s = "tEXt" + javajs.img.PngEncoder.getApplicationText (prefix, type, nPNG, nState);
var encoder =  new javajs.img.PngEncoder ();
var test = s.substring (0, 4 + prefix.length).getBytes ();
for (var i = test.length; --i >= 0; ) if (b[i + 37] != test[i]) {
System.out.println ("image is not of the right form; appending data, but not adding tEXt tag.");
return;
}
encoder.setData (b, 37);
encoder.writeString (s);
encoder.writeCRC ();
}, "~S,~A,~N,~N,~S");
c$.getApplicationText = Clazz.defineMethod (c$, "getApplicationText", 
 function (prefix, type, nPNG, nState) {
var sPNG = "000000000" + nPNG;
sPNG = sPNG.substring (sPNG.length - 9);
var sState = "000000000" + nState;
sState = sState.substring (sState.length - 9);
return prefix + "\0" + type + (type.equals ("PNG") ? "0" : "") + sPNG + "+" + sState;
}, "~S,~S,~N,~N");
Clazz.defineMethod (c$, "writeHeader", 
 function () {
this.writeInt4 (13);
this.startPos = this.bytePos;
this.writeString ("IHDR");
this.writeInt4 (this.width);
this.writeInt4 (this.height);
this.writeByte (8);
this.writeByte (this.encodeAlpha ? 6 : 2);
this.writeByte (0);
this.writeByte (0);
this.writeByte (0);
this.writeCRC ();
});
Clazz.defineMethod (c$, "writeText", 
 function (msg) {
this.writeInt4 (msg.length);
this.startPos = this.bytePos;
this.writeString ("tEXt" + msg);
this.writeCRC ();
}, "~S");
Clazz.defineMethod (c$, "writeTransparentColor", 
 function (icolor) {
this.writeInt4 (6);
this.startPos = this.bytePos;
this.writeString ("tRNS");
this.writeInt2 ((icolor >> 16) & 0xFF);
this.writeInt2 ((icolor >> 8) & 0xFF);
this.writeInt2 (icolor & 0xFF);
this.writeCRC ();
}, "~N");
Clazz.defineMethod (c$, "writeImageData", 
 function () {
this.bytesPerPixel = (this.encodeAlpha ? 4 : 3);
this.byteWidth = this.width * this.bytesPerPixel;
var scanWidth = this.byteWidth + 1;
var rowsLeft = this.height;
var nRows;
var scanPos;
var deflater =  new java.util.zip.Deflater (this.compressionLevel);
var outBytes =  new java.io.ByteArrayOutputStream (1024);
var compBytes =  new java.util.zip.DeflaterOutputStream (outBytes, deflater);
var pt = 0;
try {
while (rowsLeft > 0) {
nRows = Math.max (1, Math.min (Clazz.doubleToInt (32767 / scanWidth), rowsLeft));
this.scanLines =  Clazz.newByteArray (scanWidth * nRows, 0);
var nPixels = this.width * nRows;
scanPos = 0;
for (var i = 0; i < nPixels; i++, pt++) {
if (i % this.width == 0) {
this.scanLines[scanPos++] = this.filter;
}this.scanLines[scanPos++] = ((this.pixels[pt] >> 16) & 0xff);
this.scanLines[scanPos++] = ((this.pixels[pt] >> 8) & 0xff);
this.scanLines[scanPos++] = ((this.pixels[pt]) & 0xff);
if (this.encodeAlpha) {
this.scanLines[scanPos++] = ((this.pixels[pt] >> 24) & 0xff);
}}
compBytes.write (this.scanLines, 0, scanPos);
rowsLeft -= nRows;
}
compBytes.close ();
var compressedLines = outBytes.toByteArray ();
this.writeInt4 (compressedLines.length);
this.startPos = this.bytePos;
this.writeString ("IDAT");
this.writeBytes (compressedLines);
this.writeCRC ();
this.writeEnd ();
deflater.finish ();
return true;
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.err.println (e.toString ());
return false;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "writeEnd", 
 function () {
this.writeInt4 (0);
this.startPos = this.bytePos;
this.writeString ("IEND");
this.writeCRC ();
});
Clazz.defineStatics (c$,
"FILTER_NONE", 0,
"FILTER_SUB", 1,
"FILTER_UP", 2,
"FILTER_LAST", 2,
"PT_FIRST_TAG", 37);
});
