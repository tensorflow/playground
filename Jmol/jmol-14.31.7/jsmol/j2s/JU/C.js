Clazz.declarePackage ("JU");
Clazz.load (["JU.Int2IntHash"], "JU.C", ["java.lang.Byte", "$.Float", "JU.AU", "$.CU", "$.PT", "$.SB", "J.c.PAL", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.declareType (JU, "C");
Clazz.makeConstructor (c$, 
function () {
});
c$.getColix = Clazz.defineMethod (c$, "getColix", 
function (argb) {
if (argb == 0) return 0;
var translucentFlag = 0;
if ((argb & 0xFF000000) != (-16777216)) {
translucentFlag = JU.C.getTranslucentFlag ((argb >> 24) & 0xFF);
argb |= 0xFF000000;
}var c = JU.C.colixHash.get (argb);
if ((c & 3) == 3) translucentFlag = 0;
return ((c > 0 ? c : JU.C.allocateColix (argb, false)) | translucentFlag);
}, "~N");
c$.allocateColix = Clazz.defineMethod (c$, "allocateColix", 
function (argb, forceLast) {
var n;
if (forceLast) {
n = 2047;
} else {
for (var i = JU.C.colixMax; --i >= 4; ) if ((argb & 0xFFFFFF) == (JU.C.argbs[i] & 0xFFFFFF)) return i;

n = JU.C.colixMax;
}if (n >= JU.C.argbs.length) {
var newSize = (forceLast ? n + 1 : JU.C.colixMax * 2);
if (newSize > 2048) newSize = 2048;
JU.C.argbs = JU.AU.arrayCopyI (JU.C.argbs, newSize);
if (JU.C.argbsGreyscale != null) JU.C.argbsGreyscale = JU.AU.arrayCopyI (JU.C.argbsGreyscale, newSize);
}JU.C.argbs[n] = argb;
if (JU.C.argbsGreyscale != null) JU.C.argbsGreyscale[n] = JU.CU.toFFGGGfromRGB (argb);
JU.C.colixHash.put (argb, n);
return (n < 2047 ? JU.C.colixMax++ : JU.C.colixMax);
}, "~N,~B");
c$.setLastGrey = Clazz.defineMethod (c$, "setLastGrey", 
function (argb) {
JU.C.calcArgbsGreyscale ();
JU.C.argbsGreyscale[2047] = JU.CU.toFFGGGfromRGB (argb);
}, "~N");
c$.calcArgbsGreyscale = Clazz.defineMethod (c$, "calcArgbsGreyscale", 
function () {
if (JU.C.argbsGreyscale != null) return;
var a =  Clazz.newIntArray (JU.C.argbs.length, 0);
for (var i = JU.C.argbs.length; --i >= 4; ) a[i] = JU.CU.toFFGGGfromRGB (JU.C.argbs[i]);

JU.C.argbsGreyscale = a;
});
c$.getArgbGreyscale = Clazz.defineMethod (c$, "getArgbGreyscale", 
function (colix) {
if (JU.C.argbsGreyscale == null) JU.C.calcArgbsGreyscale ();
return JU.C.argbsGreyscale[colix & -30721];
}, "~N");
c$.getColixO = Clazz.defineMethod (c$, "getColixO", 
function (obj) {
if (obj == null) return 0;
if (Clazz.instanceOf (obj, J.c.PAL)) return ((obj) === J.c.PAL.NONE ? 0 : 2);
if (Clazz.instanceOf (obj, Integer)) return JU.C.getColix ((obj).intValue ());
if (Clazz.instanceOf (obj, String)) return JU.C.getColixS (obj);
if (Clazz.instanceOf (obj, Byte)) return ((obj).byteValue () == 0 ? 0 : 2);
if (JU.Logger.debugging) {
JU.Logger.debug ("?? getColix(" + obj + ")");
}return 22;
}, "~O");
c$.getTranslucentFlag = Clazz.defineMethod (c$, "getTranslucentFlag", 
 function (translucentLevel) {
if (translucentLevel == 0) return 0;
if (translucentLevel < 0) return 30720;
if (Float.isNaN (translucentLevel) || translucentLevel >= 255 || translucentLevel == 1.0) return 16384;
var iLevel = Clazz.doubleToInt (Math.floor (translucentLevel < 1 ? translucentLevel * 256 : translucentLevel >= 15 ? translucentLevel : translucentLevel <= 9 ? (Clazz.doubleToInt (Math.floor (translucentLevel - 1))) << 5 : 256));
return (((iLevel >> 5) & 0xF) << 11);
}, "~N");
c$.isColixLastAvailable = Clazz.defineMethod (c$, "isColixLastAvailable", 
function (colix) {
return (colix > 0 && (colix & 2047) == 2047);
}, "~N");
c$.getArgb = Clazz.defineMethod (c$, "getArgb", 
function (colix) {
return JU.C.argbs[colix & -30721];
}, "~N");
c$.isColixColorInherited = Clazz.defineMethod (c$, "isColixColorInherited", 
function (colix) {
switch (colix) {
case 0:
case 1:
return true;
default:
return (colix & -30721) == 1;
}
}, "~N");
c$.getColixInherited = Clazz.defineMethod (c$, "getColixInherited", 
function (myColix, parentColix) {
switch (myColix) {
case 0:
return parentColix;
case 1:
return (parentColix & -30721);
default:
return ((myColix & -30721) == 1 ? (parentColix & -30721 | myColix & 30720) : myColix);
}
}, "~N,~N");
c$.renderPass2 = Clazz.defineMethod (c$, "renderPass2", 
function (colix) {
var c = colix & 30720;
return (c != 0 && c != 30720);
}, "~N");
c$.isColixTranslucent = Clazz.defineMethod (c$, "isColixTranslucent", 
function (colix) {
return ((colix & 30720) != 0);
}, "~N");
c$.getChangeableColixIndex = Clazz.defineMethod (c$, "getChangeableColixIndex", 
function (colix) {
return (colix >= 0 ? -1 : (colix & 2047));
}, "~N");
c$.getColixTranslucent3 = Clazz.defineMethod (c$, "getColixTranslucent3", 
function (colix, isTranslucent, translucentLevel) {
colix &= -30721;
if (colix == 0) colix = 1;
return (isTranslucent ? (colix | JU.C.getTranslucentFlag (translucentLevel)) : colix);
}, "~N,~B,~N");
c$.copyColixTranslucency = Clazz.defineMethod (c$, "copyColixTranslucency", 
function (colixFrom, colixTo) {
return JU.C.getColixTranslucent3 (colixTo, JU.C.isColixTranslucent (colixFrom), JU.C.getColixTranslucencyLevel (colixFrom));
}, "~N,~N");
c$.getColixTranslucencyFractional = Clazz.defineMethod (c$, "getColixTranslucencyFractional", 
function (colix) {
var translevel = JU.C.getColixTranslucencyLevel (colix);
return (translevel == -1 ? 0.5 : translevel == 0 ? 0 : translevel == 255 ? 1 : translevel / 256);
}, "~N");
c$.getColixTranslucencyLabel = Clazz.defineMethod (c$, "getColixTranslucencyLabel", 
function (colix) {
return "translucent " + ((colix & 30720) == 30720 ? -1 : JU.C.getColixTranslucencyFractional (colix));
}, "~N");
c$.getColixTranslucencyLevel = Clazz.defineMethod (c$, "getColixTranslucencyLevel", 
function (colix) {
var logAlpha = (colix >> 11) & 0xF;
switch (logAlpha) {
case 0:
return 0;
case 1:
case 2:
case 3:
case 4:
case 5:
case 6:
case 7:
return logAlpha << 5;
case 15:
return -1;
default:
return 255;
}
}, "~N");
c$.getColixS = Clazz.defineMethod (c$, "getColixS", 
function (colorName) {
var argb = JU.CU.getArgbFromString (colorName);
if (argb != 0) return JU.C.getColix (argb);
if ("none".equalsIgnoreCase (colorName)) return 0;
if ("opaque".equalsIgnoreCase (colorName)) return 1;
return 2;
}, "~S");
c$.getColixArray = Clazz.defineMethod (c$, "getColixArray", 
function (colorNames) {
if (colorNames == null || colorNames.length == 0) return null;
var colors = JU.PT.getTokens (colorNames);
var colixes =  Clazz.newShortArray (colors.length, 0);
for (var j = 0; j < colors.length; j++) {
colixes[j] = JU.C.getColix (JU.CU.getArgbFromString (colors[j]));
if (colixes[j] == 0) return null;
}
return colixes;
}, "~S");
c$.getHexCode = Clazz.defineMethod (c$, "getHexCode", 
function (colix) {
return JU.Escape.escapeColor (JU.C.getArgb (colix));
}, "~N");
c$.getHexCodes = Clazz.defineMethod (c$, "getHexCodes", 
function (colixes) {
if (colixes == null) return null;
var s =  new JU.SB ();
for (var i = 0; i < colixes.length; i++) s.append (i == 0 ? "" : " ").append (JU.C.getHexCode (colixes[i]));

return s.toString ();
}, "~A");
c$.getColixTranslucent = Clazz.defineMethod (c$, "getColixTranslucent", 
function (argb) {
var a = (argb >> 24) & 0xFF;
return (a == 0xFF ? JU.C.getColix (argb) : JU.C.getColixTranslucent3 (JU.C.getColix (argb), true, a / 255));
}, "~N");
c$.getBgContrast = Clazz.defineMethod (c$, "getBgContrast", 
function (argb) {
return ((JU.CU.toFFGGGfromRGB (argb) & 0xFF) < 128 ? 8 : 4);
}, "~N");
Clazz.defineStatics (c$,
"INHERIT_ALL", 0,
"INHERIT_COLOR", 1,
"USE_PALETTE", 2,
"RAW_RGB", 3,
"SPECIAL_COLIX_MAX", 4,
"colixMax", 4,
"argbs",  Clazz.newIntArray (128, 0),
"argbsGreyscale", null);
c$.colixHash = c$.prototype.colixHash =  new JU.Int2IntHash (256);
Clazz.defineStatics (c$,
"RAW_RGB_INT", 3,
"UNMASK_CHANGEABLE_TRANSLUCENT", 0x07FF,
"CHANGEABLE_MASK", 0x8000,
"LAST_AVAILABLE_COLIX", 2047,
"TRANSLUCENT_SHIFT", 11,
"ALPHA_SHIFT", 13,
"TRANSLUCENT_MASK", 30720,
"TRANSLUCENT_SCREENED", 30720,
"TRANSPARENT", 16384,
"OPAQUE_MASK", -30721,
"BLACK", 4,
"ORANGE", 5,
"PINK", 6,
"BLUE", 7,
"WHITE", 8,
"CYAN", 9,
"RED", 10,
"GREEN", 11,
"GRAY", 12,
"SILVER", 13,
"LIME", 14,
"MAROON", 15,
"NAVY", 16,
"OLIVE", 17,
"PURPLE", 18,
"TEAL", 19,
"MAGENTA", 20,
"YELLOW", 21,
"HOTPINK", 22,
"GOLD", 23);
{
var predefinedArgbs =  Clazz.newIntArray (-1, [0xFF000000, 0xFFFFA500, 0xFFFFC0CB, 0xFF0000FF, 0xFFFFFFFF, 0xFF00FFFF, 0xFFFF0000, 0xFF008000, 0xFF808080, 0xFFC0C0C0, 0xFF00FF00, 0xFF800000, 0xFF000080, 0xFF808000, 0xFF800080, 0xFF008080, 0xFFFF00FF, 0xFFFFFF00, 0xFFFF69B4, 0xFFFFD700]);
for (var i = 0; i < predefinedArgbs.length; ++i) JU.C.getColix (predefinedArgbs[i]);

}});
