Clazz.declarePackage ("javajs.img");
Clazz.load (["javajs.img.ImageEncoder", "JU.Lst", "$.P3"], "javajs.img.GifEncoder", ["java.lang.Boolean", "java.util.Hashtable", "JU.CU", "$.M3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.params = null;
this.palette = null;
this.backgroundColor = 0;
this.interlaced = false;
this.addHeader = true;
this.addImage = true;
this.addTrailer = true;
this.isTransparent = false;
this.floydSteinberg = true;
this.capturing = false;
this.looping = false;
this.delayTime100ths = -1;
this.bitsPerPixel = 1;
this.byteCount = 0;
if (!Clazz.isClassDefined ("javajs.img.GifEncoder.ColorItem")) {
javajs.img.GifEncoder.$GifEncoder$ColorItem$ ();
}
if (!Clazz.isClassDefined ("javajs.img.GifEncoder.ColorCell")) {
javajs.img.GifEncoder.$GifEncoder$ColorCell$ ();
}
this.initCodeSize = 0;
this.curpt = 0;
this.nBits = 0;
this.maxbits = 12;
this.maxcode = 0;
this.maxmaxcode = 4096;
this.htab = null;
this.codetab = null;
this.hsize = 5003;
this.freeEnt = 0;
this.clearFlag = false;
this.clearCode = 0;
this.EOFCode = 0;
this.countDown = 0;
this.pass = 0;
this.curx = 0;
this.cury = 0;
this.curAccum = 0;
this.curBits = 0;
this.masks = null;
this.bufPt = 0;
this.buf = null;
Clazz.instantialize (this, arguments);
}, javajs.img, "GifEncoder", javajs.img.ImageEncoder);
Clazz.prepareFields (c$, function () {
this.htab =  Clazz.newIntArray (5003, 0);
this.codetab =  Clazz.newIntArray (5003, 0);
this.masks =  Clazz.newIntArray (-1, [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF]);
this.buf =  Clazz.newByteArray (256, 0);
});
Clazz.overrideMethod (c$, "setParams", 
function (params) {
this.params = params;
var ic = params.get ("transparentColor");
if (ic == null) {
ic = params.get ("backgroundColor");
if (ic != null) this.backgroundColor = ic.intValue ();
} else {
this.backgroundColor = ic.intValue ();
this.isTransparent = true;
}this.interlaced = (Boolean.TRUE === params.get ("interlaced"));
if (params.containsKey ("captureRootExt") || !params.containsKey ("captureMode")) return;
this.interlaced = false;
this.capturing = true;
try {
this.byteCount = (params.get ("captureByteCount")).intValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
switch ("maec".indexOf ((params.get ("captureMode")).substring (0, 1))) {
case 0:
params.put ("captureMode", "add");
this.addImage = false;
this.addTrailer = false;
break;
case 1:
this.addHeader = false;
this.addTrailer = false;
var msDelay = params.get ("captureDelayMS");
if (msDelay == null) {
var fps = Math.abs ((params.get ("captureFps")).intValue ());
this.delayTime100ths = (fps == 0 ? 0 : Clazz.doubleToInt (100 / fps));
} else {
this.delayTime100ths = Clazz.doubleToInt (msDelay.intValue () / 10);
params.remove ("captureDelayMS");
}this.looping = (Boolean.FALSE !== params.get ("captureLooping"));
break;
case 2:
this.addHeader = false;
this.addImage = false;
break;
case 3:
this.addHeader = false;
this.addImage = false;
this.out.cancel ();
break;
}
}, "java.util.Map");
Clazz.overrideMethod (c$, "generate", 
function () {
if (this.addHeader) this.writeHeader ();
this.addHeader = false;
if (this.addImage) {
this.createPalette ();
this.writeGraphicControlExtension ();
if (this.delayTime100ths >= 0 && this.looping) this.writeNetscapeLoopExtension ();
this.writeImage ();
}});
Clazz.overrideMethod (c$, "close", 
function () {
if (this.addTrailer) {
this.writeTrailer ();
} else {
this.doClose = false;
}if (this.capturing) this.params.put ("captureByteCount", Integer.$valueOf (this.byteCount));
});
Clazz.defineMethod (c$, "createPalette", 
 function () {
var tempColors =  new JU.Lst ();
var ciHash =  new java.util.Hashtable ();
for (var i = 0, n = this.pixels.length; i < n; i++) {
var rgb = this.pixels[i];
var key = Integer.$valueOf (rgb);
var item = ciHash.get (key);
if (item == null) {
item = Clazz.innerTypeInstance (javajs.img.GifEncoder.ColorItem, this, null, rgb, rgb == this.backgroundColor);
ciHash.put (key, item);
tempColors.addLast (item);
}}
var nColors = tempColors.size ();
System.out.println ("GIF total image colors: " + nColors);
ciHash = null;
var cells = this.quantizeColors (tempColors);
nColors = cells.size ();
System.out.println ("GIF final color count: " + nColors);
var colorMap =  new java.util.Hashtable ();
this.bitsPerPixel = (nColors <= 2 ? 1 : nColors <= 4 ? 2 : nColors <= 16 ? 4 : 8);
this.palette =  new Array (1 << this.bitsPerPixel);
for (var i = 0; i < nColors; i++) {
var c = cells.get (i);
colorMap.put (Integer.$valueOf (JU.CU.colorPtToFFRGB (this.palette[i] = c.setColor ())), c);
}
this.pixels = this.indexPixels (cells, colorMap);
});
Clazz.defineMethod (c$, "quantizeColors", 
 function (tempColors) {
var n = tempColors.size ();
var cells =  new JU.Lst ();
var cc = Clazz.innerTypeInstance (javajs.img.GifEncoder.ColorCell, this, null, 0);
cc.addLast (Clazz.innerTypeInstance (javajs.img.GifEncoder.ColorItem, this, null, this.backgroundColor, true));
cells.addLast (cc);
cc = Clazz.innerTypeInstance (javajs.img.GifEncoder.ColorCell, this, null, 1);
if (n > 256) cells.addLast (cc);
for (var i = 0; i < n; i++) {
var c = tempColors.get (i);
if (c.isBackground) continue;
cc.addLast (c);
if (n <= 256) {
cells.addLast (cc);
cc = Clazz.innerTypeInstance (javajs.img.GifEncoder.ColorCell, this, null, cells.size ());
}}
tempColors.clear ();
if (n > 256) while ((n = cells.size ()) < 256) {
var maxVol = 0;
var maxCell = null;
for (var i = n; --i >= 1; ) {
var c = cells.get (i);
var v = c.getVolume (false);
if (v > maxVol) {
maxVol = v;
maxCell = c;
}}
if (maxCell == null || !maxCell.splitCell (cells)) break;
}
return cells;
}, "JU.Lst");
Clazz.defineMethod (c$, "indexPixels", 
 function (cells, colorMap) {
var w2 = this.width + 2;
var errors =  new Array (w2);
var newPixels =  Clazz.newIntArray (this.pixels.length, 0);
var err =  new JU.P3 ();
var lab;
var rgb;
var nearestCell =  new java.util.Hashtable ();
for (var i = 0, p = 0; i < this.height; ++i) {
var notLastRow = (i != this.height - 1);
for (var j = 0; j < this.width; ++j, p++) {
if (this.pixels[p] == this.backgroundColor) {
continue;
}var pe = errors[p % w2];
if (pe == null || pe.x == 3.4028235E38) {
lab = null;
rgb = this.pixels[p];
} else {
lab = this.toLABnorm (this.pixels[p]);
err = pe;
err.x = this.clamp (err.x, -75, 75);
err.y = this.clamp (err.y, -75, 75);
err.z = this.clamp (err.z, -75, 75);
lab.add (err);
rgb = JU.CU.colorPtToFFRGB (this.toRGB (lab));
}var key = Integer.$valueOf (rgb);
var cell = colorMap.get (key);
if (cell == null) {
lab = this.toLABnorm (rgb);
cell = nearestCell.get (key);
if (cell == null) {
var maxerr = 3.4028235E38;
for (var ib = cells.size (); --ib >= 1; ) {
var c = cells.get (ib);
err.sub2 (lab, c.center);
var d = err.lengthSquared ();
if (d < maxerr) {
maxerr = d;
cell = c;
}}
nearestCell.put (key, cell);
}if (this.floydSteinberg) {
err.sub2 (lab, cell.center);
var notLastCol = (j < this.width - 1);
if (notLastCol) this.addError (err, 7, errors, p + 1, w2);
if (notLastRow) {
if (j > 0) this.addError (err, 3, errors, p + this.width - 1, w2);
this.addError (err, 5, errors, p + this.width, w2);
if (notLastCol) this.addError (err, 1, errors, p + this.width + 1, w2);
}}err.x = 3.4028235E38;
}newPixels[p] = cell.index;
}
}
return newPixels;
}, "JU.Lst,java.util.Map");
Clazz.defineMethod (c$, "addError", 
 function (err, f, errors, p, w2) {
if (this.pixels[p] == this.backgroundColor) return;
p %= w2;
var errp = errors[p];
if (errp == null) errp = errors[p] =  new JU.P3 ();
 else if (errp.x == 3.4028235E38) errp.set (0, 0, 0);
errp.scaleAdd2 (f / 16, err, errp);
}, "JU.P3,~N,~A,~N,~N");
Clazz.defineMethod (c$, "toLABnorm", 
function (rgb) {
var lab = JU.CU.colorPtFromInt (rgb, null);
this.rgbToXyz (lab, lab);
this.xyzToLab (lab, lab);
lab.y = (lab.y + 86.185) / (184.439) * 100;
lab.z = (lab.z + 107.863) / (202.345) * 100;
return lab;
}, "~N");
Clazz.defineMethod (c$, "toRGB", 
function (lab) {
var xyz = JU.P3.newP (lab);
xyz.y = xyz.y / 100 * (184.439) - 86.185;
xyz.z = xyz.z / 100 * (202.345) - 107.863;
this.labToXyz (xyz, xyz);
return this.xyzToRgb (xyz, xyz);
}, "JU.P3");
Clazz.defineMethod (c$, "rgbToXyz", 
function (rgb, xyz) {
if (xyz == null) xyz =  new JU.P3 ();
xyz.x = this.sxyz (rgb.x);
xyz.y = this.sxyz (rgb.y);
xyz.z = this.sxyz (rgb.z);
javajs.img.GifEncoder.rgb2xyz.rotate (xyz);
return xyz;
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "sxyz", 
 function (x) {
x /= 255;
return (x <= 0.04045 ? x / 12.92 : Math.pow (((x + 0.055) / 1.055), 2.4)) * 100;
}, "~N");
Clazz.defineMethod (c$, "xyzToRgb", 
function (xyz, rgb) {
if (rgb == null) rgb =  new JU.P3 ();
rgb.setT (xyz);
rgb.scale (0.01);
javajs.img.GifEncoder.xyz2rgb.rotate (rgb);
rgb.x = this.clamp (this.srgb (rgb.x), 0, 255);
rgb.y = this.clamp (this.srgb (rgb.y), 0, 255);
rgb.z = this.clamp (this.srgb (rgb.z), 0, 255);
return rgb;
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "srgb", 
 function (x) {
return (x > 0.0031308 ? (1.055 * Math.pow (x, 0.4166666666666667)) - 0.055 : x * 12.92) * 255;
}, "~N");
Clazz.defineMethod (c$, "xyzToLab", 
function (xyz, lab) {
if (lab == null) lab =  new JU.P3 ();
var x = this.flab (xyz.x / 95.0429);
var y = this.flab (xyz.y / 100);
var z = this.flab (xyz.z / 108.89);
lab.x = (116 * y) - 16;
lab.y = 500 * (x - y);
lab.z = 200 * (y - z);
return lab;
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "flab", 
 function (t) {
return (t > 8.85645168E-3 ? Math.pow (t, 0.333333333) : 7.78703704 * t + 0.137931034);
}, "~N");
Clazz.defineMethod (c$, "labToXyz", 
function (lab, xyz) {
if (xyz == null) xyz =  new JU.P3 ();
xyz.setT (lab);
var y = (xyz.x + 16) / 116;
var x = xyz.y / 500 + y;
var z = y - xyz.z / 200;
xyz.x = this.fxyz (x) * 95.0429;
xyz.y = this.fxyz (y) * 100;
xyz.z = this.fxyz (z) * 108.89;
return xyz;
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "fxyz", 
 function (t) {
return (t > 0.206896552 ? t * t * t : 0.128418549 * (t - 0.137931034));
}, "~N");
Clazz.defineMethod (c$, "clamp", 
 function (c, min, max) {
c = (c < min ? min : c > max ? max : c);
return (min == 0 ? Math.round (c) : c);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "writeHeader", 
 function () {
this.putString ("GIF89a");
this.putWord (this.width);
this.putWord (this.height);
this.putByte (0);
this.putByte (0);
this.putByte (0);
});
Clazz.defineMethod (c$, "writeGraphicControlExtension", 
 function () {
if (this.isTransparent || this.delayTime100ths >= 0) {
this.putByte (0x21);
this.putByte (0xf9);
this.putByte (4);
this.putByte ((this.isTransparent ? 9 : 0) | (this.delayTime100ths > 0 ? 2 : 0));
this.putWord (this.delayTime100ths > 0 ? this.delayTime100ths : 0);
this.putByte (0);
this.putByte (0);
}});
Clazz.defineMethod (c$, "writeNetscapeLoopExtension", 
 function () {
this.putByte (0x21);
this.putByte (0xff);
this.putByte (0x0B);
this.putString ("NETSCAPE2.0");
this.putByte (3);
this.putByte (1);
this.putWord (0);
this.putByte (0);
});
Clazz.defineMethod (c$, "writeImage", 
 function () {
this.putByte (0x2C);
this.putWord (0);
this.putWord (0);
this.putWord (this.width);
this.putWord (this.height);
var packedFields = 0x80 | (this.interlaced ? 0x40 : 0) | (this.bitsPerPixel - 1);
this.putByte (packedFields);
var colorMapSize = 1 << this.bitsPerPixel;
var p =  new JU.P3 ();
for (var i = 0; i < colorMapSize; i++) {
if (this.palette[i] != null) p = this.palette[i];
this.putByte (Clazz.floatToInt (p.x));
this.putByte (Clazz.floatToInt (p.y));
this.putByte (Clazz.floatToInt (p.z));
}
this.putByte (this.initCodeSize = (this.bitsPerPixel <= 1 ? 2 : this.bitsPerPixel));
this.compress ();
this.putByte (0);
});
Clazz.defineMethod (c$, "writeTrailer", 
 function () {
this.putByte (0x3B);
});
Clazz.defineMethod (c$, "nextPixel", 
 function () {
if (this.countDown-- == 0) return -1;
var colorIndex = this.pixels[this.curpt];
++this.curx;
if (this.curx == this.width) {
this.curx = 0;
if (this.interlaced) this.updateY (javajs.img.GifEncoder.INTERLACE_PARAMS[this.pass], javajs.img.GifEncoder.INTERLACE_PARAMS[this.pass + 4]);
 else ++this.cury;
}this.curpt = this.cury * this.width + this.curx;
return colorIndex & 0xff;
});
Clazz.defineMethod (c$, "updateY", 
 function (yNext, yNew) {
this.cury += yNext;
if (yNew >= 0 && this.cury >= this.height) {
this.cury = yNew;
++this.pass;
}}, "~N,~N");
Clazz.defineMethod (c$, "putWord", 
 function (w) {
this.putByte (w);
this.putByte (w >> 8);
}, "~N");
c$.MAXCODE = Clazz.defineMethod (c$, "MAXCODE", 
 function (nBits) {
return (1 << nBits) - 1;
}, "~N");
Clazz.defineMethod (c$, "compress", 
 function () {
this.countDown = this.width * this.height;
this.pass = 0;
this.curx = 0;
this.cury = 0;
this.clearFlag = false;
this.nBits = this.initCodeSize + 1;
this.maxcode = javajs.img.GifEncoder.MAXCODE (this.nBits);
this.clearCode = 1 << this.initCodeSize;
this.EOFCode = this.clearCode + 1;
this.freeEnt = this.clearCode + 2;
this.bufPt = 0;
var ent = this.nextPixel ();
var hshift = 0;
var fcode;
for (fcode = this.hsize; fcode < 65536; fcode *= 2) ++hshift;

hshift = 8 - hshift;
var hsizeReg = this.hsize;
this.clearHash (hsizeReg);
this.output (this.clearCode);
var c;
outer_loop : while ((c = this.nextPixel ()) != -1) {
fcode = (c << this.maxbits) + ent;
var i = (c << hshift) ^ ent;
if (this.htab[i] == fcode) {
ent = this.codetab[i];
continue;
} else if (this.htab[i] >= 0) {
var disp = hsizeReg - i;
if (i == 0) disp = 1;
do {
if ((i -= disp) < 0) i += hsizeReg;
if (this.htab[i] == fcode) {
ent = this.codetab[i];
continue outer_loop;
}} while (this.htab[i] >= 0);
}this.output (ent);
ent = c;
if (this.freeEnt < this.maxmaxcode) {
this.codetab[i] = this.freeEnt++;
this.htab[i] = fcode;
} else {
this.clearBlock ();
}}
this.output (ent);
this.output (this.EOFCode);
});
Clazz.defineMethod (c$, "output", 
 function (code) {
this.curAccum &= this.masks[this.curBits];
if (this.curBits > 0) this.curAccum |= (code << this.curBits);
 else this.curAccum = code;
this.curBits += this.nBits;
while (this.curBits >= 8) {
this.byteOut ((this.curAccum & 0xff));
this.curAccum >>= 8;
this.curBits -= 8;
}
if (this.freeEnt > this.maxcode || this.clearFlag) {
if (this.clearFlag) {
this.maxcode = javajs.img.GifEncoder.MAXCODE (this.nBits = this.initCodeSize + 1);
this.clearFlag = false;
} else {
++this.nBits;
if (this.nBits == this.maxbits) this.maxcode = this.maxmaxcode;
 else this.maxcode = javajs.img.GifEncoder.MAXCODE (this.nBits);
}}if (code == this.EOFCode) {
while (this.curBits > 0) {
this.byteOut ((this.curAccum & 0xff));
this.curAccum >>= 8;
this.curBits -= 8;
}
this.flushBytes ();
}}, "~N");
Clazz.defineMethod (c$, "clearBlock", 
 function () {
this.clearHash (this.hsize);
this.freeEnt = this.clearCode + 2;
this.clearFlag = true;
this.output (this.clearCode);
});
Clazz.defineMethod (c$, "clearHash", 
 function (hsize) {
for (var i = 0; i < hsize; ++i) this.htab[i] = -1;

}, "~N");
Clazz.defineMethod (c$, "byteOut", 
 function (c) {
this.buf[this.bufPt++] = c;
if (this.bufPt >= 254) this.flushBytes ();
}, "~N");
Clazz.defineMethod (c$, "flushBytes", 
function () {
if (this.bufPt > 0) {
this.putByte (this.bufPt);
this.out.write (this.buf, 0, this.bufPt);
this.byteCount += this.bufPt;
this.bufPt = 0;
}});
c$.$GifEncoder$ColorItem$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.isBackground = false;
Clazz.instantialize (this, arguments);
}, javajs.img.GifEncoder, "ColorItem", JU.P3);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javajs.img.GifEncoder.ColorItem, []);
this.isBackground = b;
this.setT (this.b$["javajs.img.GifEncoder"].toLABnorm (a));
}, "~N,~B");
c$ = Clazz.p0p ();
};
c$.$GifEncoder$ColorCell$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.index = 0;
this.center = null;
this.volume = 0;
Clazz.instantialize (this, arguments);
}, javajs.img.GifEncoder, "ColorCell", JU.Lst);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javajs.img.GifEncoder.ColorCell, []);
this.index = a;
}, "~N");
Clazz.defineMethod (c$, "getVolume", 
function (a) {
if (this.volume != 0) return this.volume;
if (this.size () < 2) return -1;
var b = -2147483647;
var c = 2147483647;
var d = -2147483647;
var e = 2147483647;
var f = -2147483647;
var g = 2147483647;
var h = this.size ();
for (var i = h; --i >= 0; ) {
var j = this.get (i);
if (j.x < c) c = j.x;
if (j.y < e) e = j.y;
if (j.z < g) g = j.z;
if (j.x > b) b = j.x;
if (j.y > d) d = j.y;
if (j.z > f) f = j.z;
}
var j = (b - c);
var k = (d - e);
var l = (f - g);
return this.volume = j * j + k * k + l * l;
}, "~B");
Clazz.defineMethod (c$, "setColor", 
function () {
var a = this.size ();
this.center =  new JU.P3 ();
for (var b = a; --b >= 0; ) this.center.add (this.get (b));

this.center.scale (1 / a);
return this.b$["javajs.img.GifEncoder"].toRGB (this.center);
});
Clazz.defineMethod (c$, "splitCell", 
function (a) {
var b = this.size ();
if (b < 2) return false;
var c = a.size ();
var d = Clazz.innerTypeInstance (javajs.img.GifEncoder.ColorCell, this, null, c);
a.addLast (d);
var e =  Clazz.newFloatArray (3, 3, 0);
for (var f = 0; f < 3; f++) {
var g = 3.4028235E38;
var h = -3.4028235E38;
for (var i = b; --i >= 0; ) {
var j = this.get (i);
var k = (f == 0 ? j.x : f == 1 ? j.y : j.z);
if (g > k) g = k;
if (h < k) h = k;
}
e[0][f] = g;
e[1][f] = h;
e[2][f] = h - g;
}
var g = e[2];
var h = (g[0] >= g[1] ? (g[0] >= g[2] ? 0 : 2) : g[1] >= g[2] ? 1 : 2);
var i = e[0][h] + e[2][h] / 2;
this.volume = 0;
switch (h) {
case 0:
for (var j = b; --j >= 0; ) if (this.get (j).x >= i) d.addLast (this.removeItemAt (j));

break;
case 1:
for (var k = b; --k >= 0; ) if (this.get (k).y >= i) d.addLast (this.removeItemAt (k));

break;
case 2:
for (var l = this.size (); --l >= 0; ) if (this.get (l).z >= i) d.addLast (this.removeItemAt (l));

break;
}
return true;
}, "JU.Lst");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"xyz2rgb", null,
"rgb2xyz", null);
{
javajs.img.GifEncoder.rgb2xyz = JU.M3.newA9 ( Clazz.newFloatArray (-1, [0.4124, 0.3576, 0.1805, 0.2126, 0.7152, 0.0722, 0.0193, 0.1192, 0.9505]));
javajs.img.GifEncoder.xyz2rgb = JU.M3.newA9 ( Clazz.newFloatArray (-1, [3.2406, -1.5372, -0.4986, -0.9689, 1.8758, 0.0415, 0.0557, -0.204, 1.0570]));
}Clazz.defineStatics (c$,
"EOF", -1,
"INTERLACE_PARAMS",  Clazz.newIntArray (-1, [8, 8, 4, 2, 4, 2, 1, 0]),
"BITS", 12,
"HSIZE", 5003);
});
