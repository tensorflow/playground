Clazz.declarePackage ("JU");
Clazz.load (["java.util.Hashtable"], "JU.CU", ["JU.P3", "$.PT"], function () {
c$ = Clazz.declareType (JU, "CU");
c$.toRGBHexString = Clazz.defineMethod (c$, "toRGBHexString", 
function (c) {
var rgb = c.getRGB ();
if (rgb == 0) return "000000";
var r = "00" + Integer.toHexString ((rgb >> 16) & 0xFF);
r = r.substring (r.length - 2);
var g = "00" + Integer.toHexString ((rgb >> 8) & 0xFF);
g = g.substring (g.length - 2);
var b = "00" + Integer.toHexString (rgb & 0xFF);
b = b.substring (b.length - 2);
return r + g + b;
}, "javajs.api.GenericColor");
c$.toCSSString = Clazz.defineMethod (c$, "toCSSString", 
function (c) {
var opacity = c.getOpacity255 ();
if (opacity == 255) return "#" + JU.CU.toRGBHexString (c);
var rgb = c.getRGB ();
return "rgba(" + ((rgb >> 16) & 0xFF) + "," + ((rgb >> 8) & 0xff) + "," + (rgb & 0xff) + "," + opacity / 255 + ")";
}, "javajs.api.GenericColor");
c$.getArgbFromString = Clazz.defineMethod (c$, "getArgbFromString", 
function (strColor) {
var len = 0;
if (strColor == null || (len = strColor.length) == 0) return 0;
strColor = strColor.toLowerCase ();
if (strColor.charAt (0) == '[' && strColor.charAt (len - 1) == ']') {
var check;
if (strColor.indexOf (",") >= 0) {
var tokens = JU.PT.split (strColor.substring (1, strColor.length - 1), ",");
if (tokens.length != 3) return 0;
var red = JU.PT.parseFloat (tokens[0]);
var grn = JU.PT.parseFloat (tokens[1]);
var blu = JU.PT.parseFloat (tokens[2]);
return JU.CU.colorTriadToFFRGB (red, grn, blu);
}switch (len) {
case 9:
check = "x";
break;
case 10:
check = "0x";
break;
default:
return 0;
}
if (strColor.indexOf (check) != 1) return 0;
strColor = "#" + strColor.substring (len - 7, len - 1);
len = 7;
}if (len == 7 && strColor.charAt (0) == '#') {
try {
return JU.PT.parseIntRadix (strColor.substring (1, 7), 16) | 0xFF000000;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}var boxedArgb = JU.CU.mapJavaScriptColors.get (strColor);
return (boxedArgb == null ? 0 : boxedArgb.intValue ());
}, "~S");
c$.colorTriadToFFRGB = Clazz.defineMethod (c$, "colorTriadToFFRGB", 
function (x, y, z) {
if (x <= 1 && y <= 1 && z <= 1) {
if (x > 0) x = x * 256 - 1;
if (y > 0) y = y * 256 - 1;
if (z > 0) z = z * 256 - 1;
}return JU.CU.rgb (Clazz.floatToInt (x), Clazz.floatToInt (y), Clazz.floatToInt (z));
}, "~N,~N,~N");
c$.rgb = Clazz.defineMethod (c$, "rgb", 
function (red, grn, blu) {
return 0xFF000000 | (red << 16) | (grn << 8) | blu;
}, "~N,~N,~N");
c$.colorPtFromString = Clazz.defineMethod (c$, "colorPtFromString", 
function (colorName) {
return JU.CU.colorPtFromInt (JU.CU.getArgbFromString (colorName), null);
}, "~S");
c$.colorPtFromInt = Clazz.defineMethod (c$, "colorPtFromInt", 
function (color, pt) {
if (pt == null) pt =  new JU.P3 ();
pt.set ((color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF);
return pt;
}, "~N,JU.P3");
c$.colorPtToFFRGB = Clazz.defineMethod (c$, "colorPtToFFRGB", 
function (pt) {
return JU.CU.colorTriadToFFRGB (pt.x, pt.y, pt.z);
}, "JU.T3");
c$.toRGB3f = Clazz.defineMethod (c$, "toRGB3f", 
function (c, f) {
f[0] = ((c >> 16) & 0xFF) / 255;
f[1] = ((c >> 8) & 0xFF) / 255;
f[2] = (c & 0xFF) / 255;
}, "~N,~A");
c$.toFFGGGfromRGB = Clazz.defineMethod (c$, "toFFGGGfromRGB", 
function (rgb) {
var grey = (Clazz.doubleToInt (((2989 * ((rgb >> 16) & 0xFF)) + (5870 * ((rgb >> 8) & 0xFF)) + (1140 * (rgb & 0xFF)) + 5000) / 10000)) & 0xFFFFFF;
return JU.CU.rgb (grey, grey, grey);
}, "~N");
c$.rgbToHSL = Clazz.defineMethod (c$, "rgbToHSL", 
function (rgb, doRound) {
var r = rgb.x / 255;
var g = rgb.y / 255;
var b = rgb.z / 255;
var min = Math.min (r, Math.min (g, b));
var max = Math.max (r, Math.max (g, b));
var p = (max + min);
var q = (max - min);
var h = (60 * ((q == 0 ? 0 : max == r ? ((g - b) / q + 6) : max == g ? (b - r) / q + 2 : (r - g) / q + 4))) % 360;
var s = q / (q == 0 ? 1 : p <= 1 ? p : 2 - p);
return (doRound ? JU.P3.new3 (Math.round (h * 10) / 10, Math.round (s * 1000) / 10, Math.round (p * 500) / 10) : JU.P3.new3 (h, s * 100, p * 50));
}, "JU.P3,~B");
c$.hslToRGB = Clazz.defineMethod (c$, "hslToRGB", 
function (hsl) {
var h = Math.max (0, Math.min (360, hsl.x)) / 60;
var s = Math.max (0, Math.min (100, hsl.y)) / 100;
var l = Math.max (0, Math.min (100, hsl.z)) / 100;
var p = l - (l < 0.5 ? l : 1 - l) * s;
var q = 2 * (l - p);
var r = JU.CU.toRGB (p, q, h + 2);
var g = JU.CU.toRGB (p, q, h);
var b = JU.CU.toRGB (p, q, h - 2);
return JU.P3.new3 (Math.round (r * 255), Math.round (g * 255), Math.round (b * 255));
}, "JU.P3");
c$.toRGB = Clazz.defineMethod (c$, "toRGB", 
 function (p, q, h) {
return ((h = (h + (h < 0 ? 6 : h > 6 ? -6 : 0))) < 1 ? p + q * h : h < 3 ? p + q : h < 4 ? p + q * (4 - h) : p);
}, "~N,~N,~N");
Clazz.defineStatics (c$,
"colorNames",  Clazz.newArray (-1, ["black", "pewhite", "pecyan", "pepurple", "pegreen", "peblue", "peviolet", "pebrown", "pepink", "peyellow", "pedarkgreen", "peorange", "pelightblue", "pedarkcyan", "pedarkgray", "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgreen", "lightgrey", "lightgray", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen", "bluetint", "greenblue", "greentint", "grey", "gray", "pinktint", "redorange", "yellowtint"]),
"colorArgbs",  Clazz.newIntArray (-1, [0xFF000000, 0xFFffffff, 0xFF00ffff, 0xFFd020ff, 0xFF00ff00, 0xFF6060ff, 0xFFff80c0, 0xFFa42028, 0xFFffd8d8, 0xFFffff00, 0xFF00c000, 0xFFffb000, 0xFFb0b0ff, 0xFF00a0a0, 0xFF606060, 0xFFF0F8FF, 0xFFFAEBD7, 0xFF00FFFF, 0xFF7FFFD4, 0xFFF0FFFF, 0xFFF5F5DC, 0xFFFFE4C4, 0xFFFFEBCD, 0xFF0000FF, 0xFF8A2BE2, 0xFFA52A2A, 0xFFDEB887, 0xFF5F9EA0, 0xFF7FFF00, 0xFFD2691E, 0xFFFF7F50, 0xFF6495ED, 0xFFFFF8DC, 0xFFDC143C, 0xFF00FFFF, 0xFF00008B, 0xFF008B8B, 0xFFB8860B, 0xFFA9A9A9, 0xFF006400, 0xFFBDB76B, 0xFF8B008B, 0xFF556B2F, 0xFFFF8C00, 0xFF9932CC, 0xFF8B0000, 0xFFE9967A, 0xFF8FBC8F, 0xFF483D8B, 0xFF2F4F4F, 0xFF00CED1, 0xFF9400D3, 0xFFFF1493, 0xFF00BFFF, 0xFF696969, 0xFF1E90FF, 0xFFB22222, 0xFFFFFAF0, 0xFF228B22, 0xFFFF00FF, 0xFFDCDCDC, 0xFFF8F8FF, 0xFFFFD700, 0xFFDAA520, 0xFF808080, 0xFF008000, 0xFFADFF2F, 0xFFF0FFF0, 0xFFFF69B4, 0xFFCD5C5C, 0xFF4B0082, 0xFFFFFFF0, 0xFFF0E68C, 0xFFE6E6FA, 0xFFFFF0F5, 0xFF7CFC00, 0xFFFFFACD, 0xFFADD8E6, 0xFFF08080, 0xFFE0FFFF, 0xFFFAFAD2, 0xFF90EE90, 0xFFD3D3D3, 0xFFD3D3D3, 0xFFFFB6C1, 0xFFFFA07A, 0xFF20B2AA, 0xFF87CEFA, 0xFF778899, 0xFFB0C4DE, 0xFFFFFFE0, 0xFF00FF00, 0xFF32CD32, 0xFFFAF0E6, 0xFFFF00FF, 0xFF800000, 0xFF66CDAA, 0xFF0000CD, 0xFFBA55D3, 0xFF9370DB, 0xFF3CB371, 0xFF7B68EE, 0xFF00FA9A, 0xFF48D1CC, 0xFFC71585, 0xFF191970, 0xFFF5FFFA, 0xFFFFE4E1, 0xFFFFE4B5, 0xFFFFDEAD, 0xFF000080, 0xFFFDF5E6, 0xFF808000, 0xFF6B8E23, 0xFFFFA500, 0xFFFF4500, 0xFFDA70D6, 0xFFEEE8AA, 0xFF98FB98, 0xFFAFEEEE, 0xFFDB7093, 0xFFFFEFD5, 0xFFFFDAB9, 0xFFCD853F, 0xFFFFC0CB, 0xFFDDA0DD, 0xFFB0E0E6, 0xFF800080, 0xFFFF0000, 0xFFBC8F8F, 0xFF4169E1, 0xFF8B4513, 0xFFFA8072, 0xFFF4A460, 0xFF2E8B57, 0xFFFFF5EE, 0xFFA0522D, 0xFFC0C0C0, 0xFF87CEEB, 0xFF6A5ACD, 0xFF708090, 0xFFFFFAFA, 0xFF00FF7F, 0xFF4682B4, 0xFFD2B48C, 0xFF008080, 0xFFD8BFD8, 0xFFFF6347, 0xFF40E0D0, 0xFFEE82EE, 0xFFF5DEB3, 0xFFFFFFFF, 0xFFF5F5F5, 0xFFFFFF00, 0xFF9ACD32, 0xFFAFD7FF, 0xFF2E8B57, 0xFF98FFB3, 0xFF808080, 0xFF808080, 0xFFFFABBB, 0xFFFF4500, 0xFFF6F675]));
c$.mapJavaScriptColors = c$.prototype.mapJavaScriptColors =  new java.util.Hashtable ();
{
for (var i = JU.CU.colorNames.length; --i >= 0; ) JU.CU.mapJavaScriptColors.put (JU.CU.colorNames[i], Integer.$valueOf (JU.CU.colorArgbs[i]));

}});
