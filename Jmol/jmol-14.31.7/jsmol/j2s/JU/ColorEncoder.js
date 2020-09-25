Clazz.declarePackage ("JU");
Clazz.load (null, "JU.ColorEncoder", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.CU", "$.Lst", "$.PT", "J.c.PAL", "JU.C", "$.Escape", "$.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.paletteBW = null;
this.paletteWB = null;
this.paletteFriendly = null;
this.argbsCpk = null;
this.argbsRoygb = null;
this.argbsRwb = null;
this.argbsShapely = null;
this.argbsAmino = null;
this.argbsNucleic = null;
this.ihalf = 0;
this.schemes = null;
this.currentPalette = 0;
this.currentSegmentCount = 1;
this.isTranslucent = false;
this.lo = 0;
this.hi = 0;
this.isReversed = false;
this.userScale = null;
this.thisScale = null;
this.thisName = "scheme";
this.isColorIndex = false;
this.ce = null;
Clazz.instantialize (this, arguments);
}, JU, "ColorEncoder");
Clazz.prepareFields (c$, function () {
this.userScale =  Clazz.newIntArray (-1, [-8355712]);
this.thisScale =  Clazz.newIntArray (-1, [-8355712]);
});
Clazz.makeConstructor (c$, 
function (ce, vwr) {
if (ce == null) {
this.vwr = vwr;
this.schemes =  new java.util.Hashtable ();
this.argbsCpk = J.c.PAL.argbsCpk;
this.argbsRoygb = JV.JC.argbsRoygbScale;
this.argbsRwb = JV.JC.argbsRwbScale;
this.argbsAmino = this.argbsNucleic = this.argbsShapely = null;
this.ihalf = Clazz.doubleToInt (JV.JC.argbsRoygbScale.length / 3);
this.ce = this;
} else {
this.ce = ce;
this.vwr = ce.vwr;
this.schemes = ce.schemes;
}}, "JU.ColorEncoder,JV.Viewer");
c$.getSchemeIndex = Clazz.defineMethod (c$, "getSchemeIndex", 
 function (colorScheme) {
for (var i = 0; i < JU.ColorEncoder.colorSchemes.length; i++) if (JU.ColorEncoder.colorSchemes[i].equalsIgnoreCase (colorScheme)) return (i >= 16 ? i - 16 : i < 13 ? i : -i);

return -1;
}, "~S");
c$.fixName = Clazz.defineMethod (c$, "fixName", 
 function (name) {
if (name.equalsIgnoreCase ("byelement")) return "byelement_jmol";
var ipt = JU.ColorEncoder.getSchemeIndex (name);
return (ipt >= 0 ? JU.ColorEncoder.colorSchemes[ipt] : name.toLowerCase ());
}, "~S");
Clazz.defineMethod (c$, "makeColorScheme", 
 function (name, scale, isOverloaded) {
name = JU.ColorEncoder.fixName (name);
if (scale == null) {
this.schemes.remove (name);
var iScheme = this.createColorScheme (name, false, isOverloaded);
if (isOverloaded) switch (iScheme) {
case 2147483647:
return 0;
case 12:
this.paletteFriendly = this.getPaletteAC ();
break;
case 10:
this.paletteBW = this.getPaletteBW ();
break;
case 11:
this.paletteWB = this.getPaletteWB ();
break;
case 0:
case 1:
this.argbsRoygb = JV.JC.argbsRoygbScale;
break;
case 6:
case 7:
this.argbsRwb = JV.JC.argbsRwbScale;
break;
case 2:
this.argbsCpk = J.c.PAL.argbsCpk;
break;
case 3:
JU.ColorEncoder.getRasmolScale ();
break;
case 17:
this.getNucleic ();
break;
case 5:
this.getAmino ();
break;
case 4:
this.getShapely ();
break;
}
return iScheme;
}this.schemes.put (name, scale);
this.setThisScheme (name, scale);
var iScheme = this.createColorScheme (name, false, isOverloaded);
if (isOverloaded) switch (iScheme) {
case 10:
this.paletteBW = this.thisScale;
break;
case 11:
this.paletteWB = this.thisScale;
break;
case 0:
case 1:
this.argbsRoygb = this.thisScale;
this.ihalf = Clazz.doubleToInt (this.argbsRoygb.length / 3);
break;
case 6:
case 7:
this.argbsRwb = this.thisScale;
break;
case 2:
this.argbsCpk = this.thisScale;
break;
case 3:
break;
case 5:
this.argbsAmino = this.thisScale;
break;
case 17:
this.argbsNucleic = this.thisScale;
break;
case 4:
this.argbsShapely = this.thisScale;
break;
}
return -1;
}, "~S,~A,~B");
Clazz.defineMethod (c$, "getShapely", 
 function () {
return (this.argbsShapely == null ? this.argbsShapely = this.vwr.getJBR ().getArgbs (1073742144) : this.argbsShapely);
});
Clazz.defineMethod (c$, "getAmino", 
 function () {
return (this.argbsAmino == null ? this.argbsAmino = this.vwr.getJBR ().getArgbs (2097154) : this.argbsAmino);
});
Clazz.defineMethod (c$, "getNucleic", 
 function () {
return (this.argbsNucleic == null ? this.argbsNucleic = this.vwr.getJBR ().getArgbs (2097166) : this.argbsNucleic);
});
Clazz.defineMethod (c$, "createColorScheme", 
function (colorScheme, defaultToRoygb, isOverloaded) {
colorScheme = colorScheme.toLowerCase ();
if (colorScheme.equals ("inherit")) return 15;
var pt = Math.max (colorScheme.indexOf ("="), colorScheme.indexOf ("["));
if (pt >= 0) {
var name = JU.PT.replaceAllCharacters (colorScheme.substring (0, pt), " =", "");
if (name.length > 0) isOverloaded = true;
var n = 0;
if (colorScheme.length > pt + 1 && !colorScheme.contains ("[")) {
colorScheme = "[" + colorScheme.substring (pt + 1).trim () + "]";
colorScheme = JU.PT.rep (colorScheme.$replace ('\n', ' '), "  ", " ");
colorScheme = JU.PT.rep (colorScheme, ", ", ",").$replace (' ', ',');
colorScheme = JU.PT.rep (colorScheme, ",", "][");
}pt = -1;
while ((pt = colorScheme.indexOf ("[", pt + 1)) >= 0) n++;

if (n == 0) return this.makeColorScheme (name, null, isOverloaded);
var scale =  Clazz.newIntArray (n, 0);
n = 0;
while ((pt = colorScheme.indexOf ("[", pt + 1)) >= 0) {
var pt2 = colorScheme.indexOf ("]", pt);
if (pt2 < 0) pt2 = colorScheme.length - 1;
var c = JU.CU.getArgbFromString (colorScheme.substring (pt, pt2 + 1));
if (c == 0) c = JU.CU.getArgbFromString (colorScheme.substring (pt + 1, pt2).trim ());
if (c == 0) {
JU.Logger.error ("error in color value: " + colorScheme.substring (pt, pt2 + 1));
return 0;
}scale[n++] = c;
}
if (name.equals ("user")) {
this.setUserScale (scale);
return -13;
}return this.makeColorScheme (name, scale, isOverloaded);
}colorScheme = JU.ColorEncoder.fixName (colorScheme);
var ipt = JU.ColorEncoder.getSchemeIndex (colorScheme);
if (this.schemes.containsKey (colorScheme)) {
this.setThisScheme (colorScheme, this.schemes.get (colorScheme));
return ipt;
}return (ipt != -1 ? ipt : defaultToRoygb ? 0 : 2147483647);
}, "~S,~B,~B");
Clazz.defineMethod (c$, "setUserScale", 
function (scale) {
this.ce.userScale = scale;
this.makeColorScheme ("user", scale, false);
}, "~A");
Clazz.defineMethod (c$, "getColorSchemeArray", 
function (palette) {
var b;
switch (palette) {
case -1:
return this.thisScale;
case 0:
return this.ce.argbsRoygb;
case 1:
return JU.AU.arrayCopyRangeRevI (this.ce.argbsRoygb, 0, -1);
case 8:
return JU.AU.arrayCopyRangeI (this.ce.argbsRoygb, 0, this.ce.ihalf);
case 9:
var a = JU.AU.arrayCopyRangeI (this.ce.argbsRoygb, this.ce.argbsRoygb.length - 2 * this.ce.ihalf, -1);
b =  Clazz.newIntArray (this.ce.ihalf, 0);
for (var i = b.length, j = a.length; --i >= 0 && --j >= 0; ) b[i] = a[j--];

return b;
case 12:
return this.getPaletteAC ();
case 10:
return this.getPaletteBW ();
case 11:
return this.getPaletteWB ();
case 6:
return this.ce.argbsRwb;
case 7:
return JU.AU.arrayCopyRangeRevI (this.ce.argbsRwb, 0, -1);
case 2:
return this.ce.argbsCpk;
case 3:
return JU.ColorEncoder.getRasmolScale ();
case 4:
return this.ce.getShapely ();
case 17:
return this.ce.getNucleic ();
case 5:
return this.ce.getAmino ();
case -13:
return this.ce.userScale;
case -14:
return JU.AU.arrayCopyRangeRevI (this.ce.userScale, 0, -1);
default:
return null;
}
}, "~N");
Clazz.defineMethod (c$, "getColorIndexFromPalette", 
function (val, lo, hi, palette, isTranslucent) {
var colix = JU.C.getColix (this.getArgbFromPalette (val, lo, hi, palette));
if (isTranslucent) {
var f = (hi - val) / (hi - lo);
if (f > 1) f = 1;
 else if (f < 0.125) f = 0.125;
colix = JU.C.getColixTranslucent3 (colix, true, f);
}return colix;
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "getPaletteColorCount", 
 function (palette) {
switch (palette) {
case -1:
return this.thisScale.length;
case 10:
case 11:
return this.getPaletteBW ().length;
case 0:
case 1:
return this.ce.argbsRoygb.length;
case 8:
case 9:
return this.ce.ihalf;
case 6:
case 7:
return this.ce.argbsRwb.length;
case -13:
case -14:
return this.ce.userScale.length;
case 2:
return this.ce.argbsCpk.length;
case 3:
return JU.ColorEncoder.getRasmolScale ().length;
case 4:
return this.ce.getShapely ().length;
case 17:
return this.ce.getNucleic ().length;
case 5:
return this.ce.getAmino ().length;
case 12:
return this.getPaletteAC ().length;
default:
return 0;
}
}, "~N");
Clazz.defineMethod (c$, "getArgbFromPalette", 
function (val, lo, hi, palette) {
if (Float.isNaN (val)) return -8355712;
var n = this.getPaletteColorCount (palette);
switch (palette) {
case -1:
if (this.isColorIndex) {
lo = 0;
hi = this.thisScale.length;
}return this.thisScale[JU.ColorEncoder.quantize4 (val, lo, hi, n)];
case 10:
return this.getPaletteBW ()[JU.ColorEncoder.quantize4 (val, lo, hi, n)];
case 11:
return this.getPaletteWB ()[JU.ColorEncoder.quantize4 (val, lo, hi, n)];
case 0:
return this.ce.argbsRoygb[JU.ColorEncoder.quantize4 (val, lo, hi, n)];
case 1:
return this.ce.argbsRoygb[JU.ColorEncoder.quantize4 (-val, -hi, -lo, n)];
case 8:
return this.ce.argbsRoygb[JU.ColorEncoder.quantize4 (val, lo, hi, n)];
case 9:
return this.ce.argbsRoygb[this.ce.ihalf + JU.ColorEncoder.quantize4 (val, lo, hi, n) * 2];
case 6:
return this.ce.argbsRwb[JU.ColorEncoder.quantize4 (val, lo, hi, n)];
case 7:
return this.ce.argbsRwb[JU.ColorEncoder.quantize4 (-val, -hi, -lo, n)];
case -13:
return (this.ce.userScale.length == 0 ? -8355712 : this.ce.userScale[JU.ColorEncoder.quantize4 (val, lo, hi, n)]);
case -14:
return (this.ce.userScale.length == 0 ? -8355712 : this.ce.userScale[JU.ColorEncoder.quantize4 (-val, -hi, -lo, n)]);
case 2:
return this.ce.argbsCpk[JU.ColorEncoder.colorIndex (val, n)];
case 3:
return JU.ColorEncoder.getRasmolScale ()[JU.ColorEncoder.colorIndex (val, n)];
case 4:
return this.ce.getShapely ()[JU.ColorEncoder.colorIndex (val, n)];
case 5:
return this.ce.getAmino ()[JU.ColorEncoder.colorIndex (val, n)];
case 17:
return this.ce.getNucleic ()[JU.ColorEncoder.colorIndex (val - 24 + 2, n)];
case 12:
return this.getPaletteAC ()[JU.ColorEncoder.colorIndexRepeat (val, n)];
default:
return -8355712;
}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setThisScheme", 
 function (name, scale) {
this.thisName = name;
this.thisScale = scale;
if (name.equals ("user")) this.userScale = scale;
this.isColorIndex = (name.indexOf ("byelement") == 0 || name.indexOf ("byresidue") == 0);
}, "~S,~A");
Clazz.defineMethod (c$, "getArgb", 
function (val) {
return (this.isReversed ? this.getArgbFromPalette (-val, -this.hi, -this.lo, this.currentPalette) : this.getArgbFromPalette (val, this.lo, this.hi, this.currentPalette));
}, "~N");
Clazz.defineMethod (c$, "getArgbMinMax", 
function (val, min, max) {
return (this.isReversed ? this.getArgbFromPalette (-val, -max, -min, this.currentPalette) : this.getArgbFromPalette (val, min, max, this.currentPalette));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getColorIndex", 
function (val) {
return (this.isReversed ? this.getColorIndexFromPalette (-val, -this.hi, -this.lo, this.currentPalette, this.isTranslucent) : this.getColorIndexFromPalette (val, this.lo, this.hi, this.currentPalette, this.isTranslucent));
}, "~N");
Clazz.defineMethod (c$, "getColorKey", 
function () {
var info =  new java.util.Hashtable ();
var segmentCount = this.getPaletteColorCount (this.currentPalette);
var colors =  new JU.Lst ();
var values =  Clazz.newFloatArray (segmentCount + 1, 0);
var quantum = (this.hi - this.lo) / segmentCount;
var f = quantum * (this.isReversed ? -0.5 : 0.5);
for (var i = 0; i < segmentCount; i++) {
values[i] = (this.isReversed ? this.hi - i * quantum : this.lo + i * quantum);
colors.addLast (JU.CU.colorPtFromInt (this.getArgb (values[i] + f), null));
}
values[segmentCount] = (this.isReversed ? this.lo : this.hi);
info.put ("values", values);
info.put ("colors", colors);
info.put ("min", Float.$valueOf (this.lo));
info.put ("max", Float.$valueOf (this.hi));
info.put ("reversed", Boolean.$valueOf (this.isReversed));
info.put ("name", this.getCurrentColorSchemeName ());
return info;
});
Clazz.defineMethod (c$, "getColorScheme", 
function () {
return (this.isTranslucent ? "translucent " : "") + (this.currentPalette < 0 ? JU.ColorEncoder.getColorSchemeList (this.getColorSchemeArray (this.currentPalette)) : this.getColorSchemeName (this.currentPalette));
});
Clazz.defineMethod (c$, "setColorScheme", 
function (colorScheme, isTranslucent) {
this.isTranslucent = isTranslucent;
if (colorScheme != null) this.currentPalette = this.createColorScheme (colorScheme, true, false);
}, "~S,~B");
Clazz.defineMethod (c$, "setRange", 
function (lo, hi, isReversed) {
if (hi == 3.4028235E38) {
lo = 1;
hi = this.getPaletteColorCount (this.currentPalette) + 1;
}this.lo = Math.min (lo, hi);
this.hi = Math.max (lo, hi);
this.isReversed = isReversed;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "getCurrentColorSchemeName", 
function () {
return this.getColorSchemeName (this.currentPalette);
});
Clazz.defineMethod (c$, "getColorSchemeName", 
function (i) {
var absi = Math.abs (i);
return (i == -1 ? this.thisName : absi < JU.ColorEncoder.colorSchemes.length && absi >= 0 ? JU.ColorEncoder.colorSchemes[absi] : null);
}, "~N");
c$.getColorSchemeList = Clazz.defineMethod (c$, "getColorSchemeList", 
function (scheme) {
if (scheme == null) return "";
var colors = "";
for (var i = 0; i < scheme.length; i++) colors += (i == 0 ? "" : " ") + JU.Escape.escapeColor (scheme[i]);

return colors;
}, "~A");
c$.getRasmolScale = Clazz.defineMethod (c$, "getRasmolScale", 
function () {
if (JU.ColorEncoder.rasmolScale != null) return JU.ColorEncoder.rasmolScale;
JU.ColorEncoder.rasmolScale =  Clazz.newIntArray (J.c.PAL.argbsCpk.length, 0);
var argb = J.c.PAL.argbsCpkRasmol[0] | 0xFF000000;
for (var i = JU.ColorEncoder.rasmolScale.length; --i >= 0; ) JU.ColorEncoder.rasmolScale[i] = argb;

for (var i = J.c.PAL.argbsCpkRasmol.length; --i >= 0; ) {
argb = J.c.PAL.argbsCpkRasmol[i];
JU.ColorEncoder.rasmolScale[argb >> 24] = argb | 0xFF000000;
}
return JU.ColorEncoder.rasmolScale;
});
Clazz.defineMethod (c$, "getPaletteAC", 
 function () {
return (this.ce.paletteFriendly == null ? this.ce.paletteFriendly =  Clazz.newIntArray (-1, [0x808080, 0x104BA9, 0xAA00A2, 0xC9F600, 0xFFA200, 0x284A7E, 0x7F207B, 0x9FB82E, 0xBF8B30, 0x052D6E, 0x6E0069, 0x83A000, 0xA66A00, 0x447BD4, 0xD435CD, 0xD8FA3F, 0xFFBA40, 0x6A93D4, 0xD460CF, 0xE1FA71, 0xFFCC73]) : this.ce.paletteFriendly);
});
Clazz.defineMethod (c$, "getPaletteWB", 
 function () {
if (this.ce.paletteWB != null) return this.ce.paletteWB;
var b =  Clazz.newIntArray (JV.JC.argbsRoygbScale.length, 0);
for (var i = 0; i < b.length; i++) {
var xff = (1 / b.length * (b.length - i));
b[i] = JU.CU.colorTriadToFFRGB (xff, xff, xff);
}
return this.ce.paletteWB = b;
});
c$.getPaletteAtoB = Clazz.defineMethod (c$, "getPaletteAtoB", 
function (color1, color2, n) {
if (n < 2) n = JV.JC.argbsRoygbScale.length;
var b =  Clazz.newIntArray (n, 0);
var rgb1 =  Clazz.newFloatArray (3, 0);
var rgb2 =  Clazz.newFloatArray (3, 0);
JU.CU.toRGB3f (color1, rgb1);
JU.CU.toRGB3f (color2, rgb2);
var dr = (rgb2[0] - rgb1[0]) / (n - 1);
var dg = (rgb2[1] - rgb1[1]) / (n - 1);
var db = (rgb2[2] - rgb1[2]) / (n - 1);
for (var i = 0; i < n; i++) b[i] = JU.CU.colorTriadToFFRGB (rgb1[0] + dr * i, rgb1[1] + dg * i, rgb1[2] + db * i);

return b;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getPaletteBW", 
 function () {
if (this.ce.paletteBW != null) return this.ce.paletteBW;
var b =  Clazz.newIntArray (JV.JC.argbsRoygbScale.length, 0);
for (var i = 0; i < b.length; i++) {
var xff = (1 / b.length * i);
b[i] = JU.CU.colorTriadToFFRGB (xff, xff, xff);
}
return this.ce.paletteBW = b;
});
Clazz.defineMethod (c$, "quantize", 
function (x, isLowEnd) {
var n = this.getPaletteColorCount (this.currentPalette);
x = ((Clazz.floatToInt (x * n)) + (isLowEnd ? 0 : 1)) / n;
return (x <= 0 ? this.lo : x >= 1 ? this.hi : this.lo + (this.hi - this.lo) * x);
}, "~N,~B");
c$.quantize4 = Clazz.defineMethod (c$, "quantize4", 
function (val, lo, hi, segmentCount) {
var range = hi - lo;
if (range <= 0 || Float.isNaN (val)) return Clazz.doubleToInt (segmentCount / 2);
var t = val - lo;
if (t <= 0) return 0;
var quanta = range / segmentCount;
var q = Clazz.floatToInt (t / quanta + 0.0001);
if (q >= segmentCount) q = segmentCount - 1;
return q;
}, "~N,~N,~N,~N");
c$.colorIndex = Clazz.defineMethod (c$, "colorIndex", 
 function (q, segmentCount) {
return Clazz.doubleToInt (Math.floor (q <= 0 || q >= segmentCount ? 0 : q));
}, "~N,~N");
c$.colorIndexRepeat = Clazz.defineMethod (c$, "colorIndexRepeat", 
 function (q, segmentCount) {
var i = Clazz.doubleToInt (Math.floor (q <= 0 ? 0 : q));
return i % segmentCount;
}, "~N,~N");
Clazz.defineStatics (c$,
"GRAY", 0xFF808080,
"BYELEMENT_PREFIX", "byelement",
"BYRESIDUE_PREFIX", "byresidue");
c$.BYELEMENT_JMOL = c$.prototype.BYELEMENT_JMOL = "byelement_jmol";
c$.BYELEMENT_RASMOL = c$.prototype.BYELEMENT_RASMOL = "byelement_rasmol";
c$.BYRESIDUE_SHAPELY = c$.prototype.BYRESIDUE_SHAPELY = "byresidue_shapely";
c$.BYRESIDUE_AMINO = c$.prototype.BYRESIDUE_AMINO = "byresidue_amino";
c$.BYRESIDUE_NUCLEIC = c$.prototype.BYRESIDUE_NUCLEIC = "byresidue_nucleic";
Clazz.defineStatics (c$,
"CUSTOM", -1,
"ROYGB", 0,
"BGYOR", 1,
"JMOL", 2,
"RASMOL", 3,
"SHAPELY", 4,
"AMINO", 5,
"RWB", 6,
"BWR", 7,
"LOW", 8,
"HIGH", 9,
"BW", 10,
"WB", 11,
"FRIENDLY", 12,
"USER", -13,
"RESU", -14,
"INHERIT", 15,
"ALT", 16,
"NUCLEIC", 17);
c$.colorSchemes = c$.prototype.colorSchemes =  Clazz.newArray (-1, ["roygb", "bgyor", "byelement_jmol", "byelement_rasmol", "byresidue_shapely", "byresidue_amino", "rwb", "bwr", "low", "high", "bw", "wb", "friendly", "user", "resu", "inherit", "rgb", "bgr", "jmol", "rasmol", "byresidue", "byresidue_nucleic"]);
Clazz.defineStatics (c$,
"rasmolScale", null,
"argbsChainAtom", null,
"argbsChainHetero", null);
});
