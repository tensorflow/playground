Clazz.declarePackage ("JSV.export");
Clazz.load (null, "JSV.export.JDXCompressor", ["JU.DF", "$.SB", "JSV.export.Exporter", "JU.Logger"], function () {
c$ = Clazz.declareType (JSV["export"], "JDXCompressor");
c$.compressDIF = Clazz.defineMethod (c$, "compressDIF", 
function (xyCoords, startIndex, endIndex, step, xFactor, yFactor, isDIFDUP) {
var yStr =  new JU.SB ();
var buffer =  new JU.SB ();
for (var i = startIndex; i != endIndex; ) {
buffer.append (JSV["export"].JDXCompressor.fixIntNoExponent (xyCoords[i].getXVal () / xFactor));
yStr.setLength (0);
if (JU.Logger.debugging) JU.Logger.info ("" + i + '\t' + xyCoords[i].getXVal () + '\t' + xyCoords[i].getYVal ());
var y1 = Math.round (xyCoords[i].getYVal () / yFactor);
yStr.append (JSV["export"].JDXCompressor.makeSQZ (y1));
var lastDif = "";
var nDif = 0;
i += step;
if (i == endIndex) {
i -= step;
} else {
while (i + step != endIndex && yStr.length () < 50) {
var y2 = Math.round (xyCoords[i].getYVal () / yFactor);
var temp = JSV["export"].JDXCompressor.makeDIF (y2 - y1);
if (isDIFDUP && temp.equals (lastDif)) {
nDif++;
} else {
lastDif = temp;
if (nDif > 0) {
yStr.append (JSV["export"].JDXCompressor.makeDUP (nDif + 1));
nDif = 0;
}yStr.append (temp);
}if (JU.Logger.debugging) JU.Logger.info ("" + i + '\t' + xyCoords[i].getXVal () + '\t' + xyCoords[i].getYVal () + '\t' + y2 + '\t' + nDif + '\t' + yStr);
y1 = y2;
i += step;
}
if (nDif > 0) yStr.append (JSV["export"].JDXCompressor.makeDUP (nDif + 1));
yStr.append (JSV["export"].JDXCompressor.makeSQZ (xyCoords[i], yFactor));
if (JU.Logger.debugging) JU.Logger.info ("" + i + '\t' + xyCoords[i].getXVal () + '\t' + xyCoords[i].getYVal () + '\t' + nDif + '\t' + yStr);
}buffer.append (yStr.toString ()).append (JSV.export.Exporter.newLine);
i += step;
}
buffer.append (JSV["export"].JDXCompressor.fixIntNoExponent (xyCoords[endIndex].getXVal () / xFactor)).append (JSV["export"].JDXCompressor.makeSQZ (xyCoords[endIndex], yFactor));
buffer.append ("  $$checkpoint").append (JSV.export.Exporter.newLine);
return buffer.toString ();
}, "~A,~N,~N,~N,~N,~N,~B");
c$.compressFIX = Clazz.defineMethod (c$, "compressFIX", 
function (xyCoords, startIndex, endIndex, step, xFactor, yFactor) {
endIndex += step;
var buffer =  new JU.SB ();
for (var i = startIndex; i != endIndex; ) {
JSV["export"].JDXCompressor.leftJustify (buffer, "              ", JSV["export"].JDXCompressor.fixIntNoExponent (xyCoords[i].getXVal () / xFactor));
for (var j = 0; j < 6 && i != endIndex; j++) {
JSV["export"].JDXCompressor.rightJustify (buffer, "          ", "" + Math.round (xyCoords[i].getYVal () / yFactor));
buffer.append (" ");
i += step;
}
buffer.append (JSV.export.Exporter.newLine);
}
return buffer.toString ();
}, "~A,~N,~N,~N,~N,~N");
c$.leftJustify = Clazz.defineMethod (c$, "leftJustify", 
function (s, s1, s2) {
s.append (s2);
var n = s1.length - s2.length;
if (n > 0) s.append (s1.substring (0, n));
}, "JU.SB,~S,~S");
c$.rightJustify = Clazz.defineMethod (c$, "rightJustify", 
function (s, s1, s2) {
var n = s1.length - s2.length;
if (n > 0) s.append (s1.substring (0, n));
s.append (s2);
}, "JU.SB,~S,~S");
c$.compressSQZ = Clazz.defineMethod (c$, "compressSQZ", 
function (xyCoords, startIndex, endIndex, step, xFactor, yFactor) {
var yStr =  new JU.SB ();
endIndex += step;
var buffer =  new JU.SB ();
for (var i = startIndex; i == startIndex || i != endIndex; ) {
buffer.append (JSV["export"].JDXCompressor.fixIntNoExponent (xyCoords[i].getXVal () / xFactor));
yStr.setLength (0);
yStr.append (JSV["export"].JDXCompressor.makeSQZ (xyCoords[i], yFactor));
i += step;
while ((yStr.length () < 60) && i != endIndex) {
yStr.append (JSV["export"].JDXCompressor.makeSQZ (xyCoords[i], yFactor));
i += step;
}
buffer.append (yStr.toString ()).append (JSV.export.Exporter.newLine);
}
return buffer.toString ();
}, "~A,~N,~N,~N,~N,~N");
c$.compressPAC = Clazz.defineMethod (c$, "compressPAC", 
function (xyCoords, startIndex, endIndex, step, xFactor, yFactor) {
var buffer =  new JU.SB ();
endIndex += step;
for (var i = startIndex; i != endIndex; ) {
buffer.append (JSV["export"].JDXCompressor.fixIntNoExponent (xyCoords[i].getXVal () / xFactor)).append (JSV["export"].JDXCompressor.fixPacY (xyCoords[i].getYVal () / yFactor));
i += step;
for (var j = 0; j < 4 && i != endIndex; j++) {
buffer.append (JSV["export"].JDXCompressor.fixPacY (xyCoords[i].getYVal () / yFactor));
i += step;
}
buffer.append (JSV.export.Exporter.newLine);
}
return buffer.toString ();
}, "~A,~N,~N,~N,~N,~N");
c$.fixPacY = Clazz.defineMethod (c$, "fixPacY", 
 function (y) {
return (y < 0 ? "" : " ") + JSV["export"].JDXCompressor.fixIntNoExponent (y);
}, "~N");
c$.makeSQZ = Clazz.defineMethod (c$, "makeSQZ", 
 function (pt, yFactor) {
return JSV["export"].JDXCompressor.makeSQZ (Math.round (pt.getYVal () / yFactor));
}, "JSV.common.Coordinate,~N");
c$.makeSQZ = Clazz.defineMethod (c$, "makeSQZ", 
 function (y) {
return JSV["export"].JDXCompressor.compress (y, "@ABCDEFGHI", "abcdefghi");
}, "~N");
c$.makeDIF = Clazz.defineMethod (c$, "makeDIF", 
 function (dy) {
return JSV["export"].JDXCompressor.compress (dy, "%JKLMNOPQR", "jklmnopqr");
}, "~N");
c$.makeDUP = Clazz.defineMethod (c$, "makeDUP", 
 function (y) {
return JSV["export"].JDXCompressor.compress (y, "0STUVWXYZs", "");
}, "~N");
c$.compress = Clazz.defineMethod (c$, "compress", 
 function (y, strPos, strNeg) {
var negative = false;
var yStr = String.valueOf (y);
var ch = yStr.charAt (0);
if (ch == '-') {
negative = true;
yStr = yStr.substring (1);
ch = yStr.charAt (0);
}var yStrArray = yStr.toCharArray ();
yStrArray[0] = (negative ? strNeg.charAt (ch.charCodeAt (0) - 49) : strPos.charAt (ch.charCodeAt (0) - 48));
return  String.instantialize (yStrArray);
}, "~N,~S,~S");
c$.getXYList = Clazz.defineMethod (c$, "getXYList", 
function (xyCoords, startIndex, endIndex, step) {
endIndex += step;
var buffer =  new JU.SB ();
for (var i = startIndex; i != endIndex; i += step) {
var point = xyCoords[i];
buffer.append (JSV["export"].JDXCompressor.fixIntNoExponent (point.getXVal ())).append (", ").append (JSV["export"].JDXCompressor.fixIntNoExponent (point.getYVal ())).append (JSV.export.Exporter.newLine);
}
return buffer.toString ();
}, "~A,~N,~N,~N");
c$.fixIntNoExponent = Clazz.defineMethod (c$, "fixIntNoExponent", 
 function (x) {
return (x == Math.floor (x) ? String.valueOf (Clazz.doubleToInt (x)) : JU.DF.formatDecimalTrimmed (x, 10));
}, "~N");
Clazz.defineStatics (c$,
"spaces", "                    ");
});
