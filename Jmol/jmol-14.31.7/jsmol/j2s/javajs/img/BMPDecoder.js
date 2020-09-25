Clazz.declarePackage ("javajs.img");
Clazz.load (null, "javajs.img.BMPDecoder", ["JU.Rdr"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bis = null;
this.temp = null;
Clazz.instantialize (this, arguments);
}, javajs.img, "BMPDecoder");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "decodeWindowsBMP", 
function (bytes) {
try {
this.bis = JU.Rdr.getBIS (bytes);
this.temp =  Clazz.newByteArray (4, 0);
if (this.readByte () != 66 || this.readByte () != 77) return null;
this.readInt ();
this.readShort ();
this.readShort ();
this.readInt ();
var imageWidth;
var imageHeight;
var bitsPerPixel;
var nColors = 0;
var imageSize = 0;
var headerSize = this.readInt ();
switch (headerSize) {
case 12:
imageWidth = this.readShort ();
imageHeight = this.readShort ();
this.readShort ();
bitsPerPixel = this.readShort ();
break;
case 40:
imageWidth = this.readInt ();
imageHeight = this.readInt ();
this.readShort ();
bitsPerPixel = this.readShort ();
var ncompression = this.readInt ();
if (ncompression != 0) {
System.out.println ("BMP Compression is :" + ncompression + " -- aborting");
return null;
}imageSize = this.readInt ();
this.readInt ();
this.readInt ();
nColors = this.readInt ();
this.readInt ();
break;
default:
System.out.println ("BMP Header unrecognized, length=" + headerSize + " -- aborting");
return null;
}
var isYReversed = (imageHeight < 0);
if (isYReversed) imageHeight = -imageHeight;
var nPixels = imageHeight * imageWidth;
var bytesPerPixel = Clazz.doubleToInt (bitsPerPixel / 8);
nColors = (nColors > 0 ? nColors : 1 << bitsPerPixel);
var npad = (bytesPerPixel == 4 ? 0 : imageSize == 0 ? 4 - (imageWidth % 4) : (Clazz.doubleToInt (imageSize / imageHeight)) - imageWidth * bytesPerPixel) % 4;
var palette;
var buf =  Clazz.newIntArray (nPixels, 0);
var dpt = (isYReversed ? imageWidth : -imageWidth);
var pt0 = (isYReversed ? 0 : nPixels + dpt);
var pt1 = (isYReversed ? nPixels : dpt);
switch (bitsPerPixel) {
case 32:
case 24:
for (var pt = pt0; pt != pt1; pt += dpt, this.pad (npad)) for (var i = 0; i < imageWidth; i++) buf[pt + i] = this.readColor (bytesPerPixel);


break;
case 8:
palette =  Clazz.newIntArray (nColors, 0);
for (var i = 0; i < nColors; i++) palette[i] = this.readColor (4);

for (var pt = pt0; pt != pt1; pt += dpt, this.pad (npad)) for (var i = 0; i < imageWidth; i++) buf[pt + i] = palette[this.readByte ()];


break;
case 4:
npad = (4 - ((Clazz.doubleToInt ((imageWidth + 1) / 2)) % 4)) % 4;
palette =  Clazz.newIntArray (nColors, 0);
for (var i = 0; i < nColors; i++) palette[i] = this.readColor (4);

var b4 = 0;
for (var pt = pt0; pt != pt1; pt += dpt, this.pad (npad)) for (var i = 0, shift = 4; i < imageWidth; i++, shift = 4 - shift) buf[pt + i] = palette[((shift == 4 ? (b4 = this.readByte ()) : b4) >> shift) & 0xF];


break;
case 1:
var color1 = this.readColor (3);
var color2 = this.readColor (3);
npad = (4 - ((Clazz.doubleToInt ((imageWidth + 7) / 8)) % 4)) % 4;
var b = 0;
for (var pt = pt0; pt != pt1; pt += dpt, this.pad (npad)) for (var i = 0, bpt = -1; i < imageWidth; i++, bpt--) {
if (bpt < 0) {
b = this.readByte ();
bpt = 7;
}buf[pt + i] = ((b & (1 << bpt)) == 0 ? color1 : color2);
}

break;
case 64:
case 2:
default:
System.out.println ("Not a 32-, 24-, 8-, 4-, or 1-bit Windows Bitmap, aborting...");
return null;
}
return  Clazz.newArray (-1, [buf, Integer.$valueOf (imageWidth), Integer.$valueOf (imageHeight)]);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("Caught exception in loadbitmap!");
} else {
throw e;
}
}
return null;
}, "~A");
Clazz.defineMethod (c$, "pad", 
 function (npad) {
for (var i = 0; i < npad; i++) this.readByte ();

return true;
}, "~N");
Clazz.defineMethod (c$, "readColor", 
 function (n) {
this.bis.read (this.temp, 0, n);
return -16777216 | ((this.temp[2] & 0xff) << 16) | ((this.temp[1] & 0xff) << 8) | this.temp[0] & 0xff;
}, "~N");
Clazz.defineMethod (c$, "readInt", 
 function () {
this.bis.read (this.temp, 0, 4);
return ((this.temp[3] & 0xff) << 24) | ((this.temp[2] & 0xff) << 16) | ((this.temp[1] & 0xff) << 8) | this.temp[0] & 0xff;
});
Clazz.defineMethod (c$, "readShort", 
 function () {
this.bis.read (this.temp, 0, 2);
return ((this.temp[1] & 0xff) << 8) | this.temp[0] & 0xff;
});
Clazz.defineMethod (c$, "readByte", 
 function () {
this.bis.read (this.temp, 0, 1);
return this.temp[0] & 0xff;
});
});
