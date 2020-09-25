Clazz.declarePackage ("JSV.source");
Clazz.load (null, "JSV.source.JDXDecompressor", ["java.lang.Double", "JSV.common.Coordinate", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.xFactor = 0;
this.yFactor = 0;
this.deltaX = 0;
this.nPoints = 0;
this.ich = 0;
this.lineNumber = 0;
this.t = null;
this.firstX = 0;
this.dx = 0;
this.maxY = 4.9E-324;
this.minY = 1.7976931348623157E308;
this.debugging = false;
this.xyCoords = null;
this.ipt = 0;
this.line = null;
this.lastLine = null;
this.lineLen = 0;
this.errorLog = null;
this.difVal = -2147483648;
this.lastDif = -2147483648;
this.dupCount = 0;
this.xval = 0;
this.yval = 0;
this.firstLastX = null;
Clazz.instantialize (this, arguments);
}, JSV.source, "JDXDecompressor");
Clazz.defineMethod (c$, "getMinY", 
function () {
return this.minY;
});
Clazz.defineMethod (c$, "getMaxY", 
function () {
return this.maxY;
});
Clazz.makeConstructor (c$, 
function (t, firstX, xFactor, yFactor, deltaX, nPoints) {
this.t = t;
this.firstX = firstX;
this.xFactor = xFactor;
this.yFactor = yFactor;
this.deltaX = deltaX;
this.nPoints = nPoints;
this.lineNumber = t.labelLineNo;
this.debugging = JU.Logger.isActiveLevel (6);
}, "JSV.source.JDXSourceStreamTokenizer,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addPoint", 
 function (pt) {
if (this.ipt == this.xyCoords.length) {
var t =  new Array (this.ipt * 2);
System.arraycopy (this.xyCoords, 0, t, 0, this.ipt);
this.xyCoords = t;
}var d = pt.getYVal ();
if (d > this.maxY) this.maxY = d;
 else if (d < this.minY) this.minY = d;
if (this.debugging) this.logError ("Coord: " + this.ipt + pt);
this.xyCoords[this.ipt++] = pt;
this.firstLastX[1] = pt.getXVal ();
}, "JSV.common.Coordinate");
Clazz.defineMethod (c$, "decompressData", 
function (errorLog, firstLastX) {
this.errorLog = errorLog;
this.firstLastX = firstLastX;
if (this.debugging) this.logError ("firstX=" + this.firstX + " xFactor=" + this.xFactor + " yFactor=" + this.yFactor + " deltaX=" + this.deltaX + " nPoints=" + this.nPoints);
this.testAlgorithm ();
this.xyCoords =  new Array (this.nPoints);
var difMax = Math.abs (0.35 * this.deltaX);
var dif14 = Math.abs (1.4 * this.deltaX);
var dif06 = Math.abs (0.6 * this.deltaX);
try {
while ((this.line = this.t.readLineTrimmed ()) != null && this.line.indexOf ("##") < 0) {
this.lineNumber++;
if (this.debugging) this.logError (this.lineNumber + "\t" + this.line);
if ((this.lineLen = this.line.length) == 0) continue;
this.ich = 0;
var isCheckPoint = (this.lastDif != -2147483648);
this.xval = this.getValueDelim () * this.xFactor;
if (this.ipt == 0) {
firstLastX[0] = this.xval;
this.dx = this.firstX - this.xval;
}this.xval += this.dx;
var point =  new JSV.common.Coordinate ().set (this.xval, (this.yval = this.getYValue ()) * this.yFactor);
if (this.ipt == 0) {
this.addPoint (point);
} else {
var lastPoint = this.xyCoords[this.ipt - 1];
var xdif = Math.abs (lastPoint.getXVal () - point.getXVal ());
if (isCheckPoint && xdif < difMax) {
this.xyCoords[this.ipt - 1] = point;
var y = lastPoint.getYVal ();
var y1 = point.getYVal ();
if (y1 != y) this.logError (this.lastLine + "\n" + this.line + "\nY-value Checkpoint Error! Line " + this.lineNumber + " for y1=" + y1 + " y0=" + y);
} else {
this.addPoint (point);
if (xdif < dif06 || xdif > dif14) this.logError (this.lastLine + "\n" + this.line + "\nX-sequence Checkpoint Error! Line " + this.lineNumber + " |x1-x0|=" + xdif + " instead of " + Math.abs (this.deltaX) + " for x1=" + point.getXVal () + " x0=" + lastPoint.getXVal ());
}}while (this.ich < this.lineLen || this.difVal != -2147483648 || this.dupCount > 0) {
this.xval += this.deltaX;
if (!Double.isNaN (this.yval = this.getYValue ())) this.addPoint ( new JSV.common.Coordinate ().set (this.xval, this.yval * this.yFactor));
}
this.lastLine = this.line;
}
} catch (ioe) {
if (Clazz.exceptionOf (ioe, java.io.IOException)) {
} else {
throw ioe;
}
}
if (this.nPoints != this.ipt) {
this.logError ("Decompressor did not find " + this.nPoints + " points -- instead " + this.ipt);
var temp =  new Array (this.ipt);
System.arraycopy (this.xyCoords, 0, temp, 0, this.ipt);
this.xyCoords = temp;
}return (this.deltaX > 0 ? this.xyCoords : JSV.common.Coordinate.reverse (this.xyCoords));
}, "JU.SB,~A");
Clazz.defineMethod (c$, "logError", 
 function (s) {
if (this.debugging) JU.Logger.debug (s);
this.errorLog.append (s).appendC ('\n');
}, "~S");
Clazz.defineMethod (c$, "getYValue", 
 function () {
if (this.dupCount > 0) {
--this.dupCount;
this.yval = (this.lastDif == -2147483648 ? this.yval : this.yval + this.lastDif);
return this.yval;
}if (this.difVal != -2147483648) {
this.yval += this.difVal;
this.lastDif = this.difVal;
this.difVal = -2147483648;
return this.yval;
}if (this.ich == this.lineLen) return NaN;
var ch = this.line.charAt (this.ich);
if (this.debugging) JU.Logger.info ("" + ch);
switch (ch) {
case '%':
this.difVal = 0;
break;
case 'J':
case 'K':
case 'L':
case 'M':
case 'N':
case 'O':
case 'P':
case 'Q':
case 'R':
this.difVal = ch.charCodeAt (0) - 73;
break;
case 'j':
case 'k':
case 'l':
case 'm':
case 'n':
case 'o':
case 'p':
case 'q':
case 'r':
this.difVal = 105 - ch.charCodeAt (0);
break;
case 'S':
case 'T':
case 'U':
case 'V':
case 'W':
case 'X':
case 'Y':
case 'Z':
this.dupCount = ch.charCodeAt (0) - 82;
break;
case 's':
this.dupCount = 9;
break;
case '+':
case '-':
case '.':
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
case '@':
case 'A':
case 'B':
case 'C':
case 'D':
case 'E':
case 'F':
case 'G':
case 'H':
case 'I':
case 'a':
case 'b':
case 'c':
case 'd':
case 'e':
case 'f':
case 'g':
case 'h':
case 'i':
this.lastDif = -2147483648;
return this.getValue ();
case '?':
this.lastDif = -2147483648;
return NaN;
default:
this.ich++;
this.lastDif = -2147483648;
return this.getYValue ();
}
this.ich++;
if (this.difVal != -2147483648) this.difVal = this.getDifDup (this.difVal);
 else this.dupCount = this.getDifDup (this.dupCount) - 1;
return this.getYValue ();
});
Clazz.defineMethod (c$, "getDifDup", 
 function (i) {
var ich0 = this.ich;
this.next ();
var s = i + this.line.substring (ich0, this.ich);
return (ich0 == this.ich ? i : Integer.$valueOf (s).intValue ());
}, "~N");
Clazz.defineMethod (c$, "getValue", 
 function () {
var ich0 = this.ich;
if (this.ich == this.lineLen) return NaN;
var ch = this.line.charAt (this.ich);
var leader = 0;
switch (ch) {
case '+':
case '-':
case '.':
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
return this.getValueDelim ();
case '@':
case 'A':
case 'B':
case 'C':
case 'D':
case 'E':
case 'F':
case 'G':
case 'H':
case 'I':
leader = ch.charCodeAt (0) - 64;
ich0 = ++this.ich;
break;
case 'a':
case 'b':
case 'c':
case 'd':
case 'e':
case 'f':
case 'g':
case 'h':
case 'i':
leader = 96 - ch.charCodeAt (0);
ich0 = ++this.ich;
break;
default:
this.ich++;
return this.getValue ();
}
this.next ();
return Double.$valueOf (leader + this.line.substring (ich0, this.ich)).doubleValue ();
});
Clazz.defineMethod (c$, "getValueDelim", 
 function () {
var ich0 = this.ich;
var ch = '\u0000';
while (this.ich < this.lineLen && " ,\t\n".indexOf (ch = this.line.charAt (this.ich)) >= 0) this.ich++;

var factor = 1;
switch (ch) {
case '-':
factor = -1;
case '+':
ich0 = ++this.ich;
break;
}
ch = this.next ();
if (ch == 'E' && this.ich + 3 < this.lineLen) switch (this.line.charAt (this.ich + 1)) {
case '-':
case '+':
this.ich += 4;
if (this.ich < this.lineLen && (ch = this.line.charAt (this.ich)) >= '0' && ch <= '9') this.ich++;
break;
}
return factor * ((Double.$valueOf (this.line.substring (ich0, this.ich))).doubleValue ());
});
Clazz.defineMethod (c$, "next", 
 function () {
while (this.ich < this.lineLen && "+-%@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrs? ,\t\n".indexOf (this.line.charAt (this.ich)) < 0) this.ich++;

return (this.ich == this.lineLen ? '\0' : this.line.charAt (this.ich));
});
Clazz.defineMethod (c$, "testAlgorithm", 
 function () {
});
Clazz.defineStatics (c$,
"allDelim", "+-%@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrs? ,\t\n",
"WHITE_SPACE", " ,\t\n");
});
