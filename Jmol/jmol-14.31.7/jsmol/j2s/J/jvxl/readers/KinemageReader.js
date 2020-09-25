Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.PmeshReader"], "J.jvxl.readers.KinemageReader", ["java.lang.Float", "JU.CU", "$.P3", "$.PT", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nDots = 0;
this.vMin = -3.4028235E38;
this.vMax = 3.4028235E38;
this.pointType = 0;
this.findString = null;
this.lastAtom = "";
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "KinemageReader", J.jvxl.readers.PmeshReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.KinemageReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2PR (sg, br);
this.type = "kinemage";
this.setHeader ();
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readVolumeParameters", 
function (isMapData) {
if (this.params.parameters != null && this.params.parameters.length >= 2) {
this.vMin = this.params.parameters[1];
this.vMax = (this.params.parameters.length >= 3 ? this.params.parameters[2] : this.vMin);
this.pointType = (this.params.parameters.length >= 4 ? Clazz.floatToInt (this.params.parameters[3]) : 0);
this.findString = this.params.calculationType;
}return true;
}, "~B");
Clazz.overrideMethod (c$, "readVertices", 
function () {
this.rd ();
var n0;
while (this.line != null) {
if (this.line.length != 0 && this.line.charAt (0) == '@') {
JU.Logger.info (this.line);
if (this.line.indexOf ("contact}") >= 0 || this.line.indexOf ("overlap}") >= 0 || this.line.indexOf ("H-bonds}") >= 0) {
if (this.line.indexOf ("@dotlist") == 0) {
n0 = this.nDots;
this.readDots ();
if (this.nDots > n0) JU.Logger.info ("dots: " + (this.nDots - n0) + "/" + this.nDots);
continue;
} else if (this.line.indexOf ("@vectorlist") == 0) {
n0 = this.nPolygons;
this.readVectors ();
if (this.nPolygons > n0) JU.Logger.info ("lines: " + (this.nPolygons - n0) + "/" + this.nPolygons);
continue;
}}}this.rd ();
}
return true;
});
Clazz.defineMethod (c$, "readDots", 
 function () {
var color =  Clazz.newIntArray (1, 0);
while (this.rd () != null && this.line.indexOf ('@') < 0) {
var i = this.getPoint (this.line, 2, color, true);
if (i < 0) continue;
this.nDots++;
this.nTriangles = this.addTriangleCheck (i, i, i, 7, 0, false, color[0]);
}
});
Clazz.defineMethod (c$, "readVectors", 
 function () {
var color =  Clazz.newIntArray (1, 0);
while (this.rd () != null && this.line.indexOf ('@') < 0) {
var ia = this.getPoint (this.line, 3, color, true);
var ib = this.getPoint (this.line.substring (this.line.lastIndexOf ('{')), 2, color, false);
if (ia < 0 || ib < 0) continue;
this.nPolygons++;
this.nTriangles = this.addTriangleCheck (ia, ib, ib, 7, 0, false, color[0]);
}
});
Clazz.defineMethod (c$, "getPoint", 
 function (line, i, retColor, checkType) {
if (this.findString != null) {
var atom = line.substring (0, line.indexOf ("}") + 1);
if (atom.length < 4) atom = this.lastAtom;
 else this.lastAtom = atom;
if (atom.indexOf (this.findString) < 0) return -1;
}var tokens = JU.PT.getTokens (line.substring (line.indexOf ("}") + 1));
var value = this.assignValueFromGapColorForKin (tokens[0]);
if (Float.isNaN (value)) return -1;
if (checkType && this.pointType != 0) {
switch (tokens[i - 1].charAt (1)) {
case 'M':
if (this.pointType != 1) return -1;
break;
case 'S':
if (this.pointType != 2) return -1;
break;
case 'P':
if (this.pointType != 3) return -1;
break;
case 'O':
if (this.pointType != 4) return -1;
break;
default:
return -1;
}
}retColor[0] = this.getColor (tokens[0]);
tokens = JU.PT.getTokens (tokens[i].$replace (',', ' '));
var pt = JU.P3.new3 (JU.PT.parseFloat (tokens[0]), JU.PT.parseFloat (tokens[1]), JU.PT.parseFloat (tokens[2]));
if (this.isAnisotropic) this.setVertexAnisotropy (pt);
return this.addVertexCopy (pt, value, this.nVertices++, false);
}, "~S,~N,~A,~B");
Clazz.defineMethod (c$, "getColor", 
 function (color) {
if (color.equals ("sky")) color = "skyblue";
 else if (color.equals ("sea")) color = "seagreen";
return JU.CU.getArgbFromString (color);
}, "~S");
Clazz.defineMethod (c$, "assignValueFromGapColorForKin", 
 function (color) {
var value = (color.equals ("greentint") ? 4 : color.equals ("blue") ? 0.35 : color.equals ("sky") ? 0.25 : color.equals ("sea") ? 0.15 : color.equals ("green") ? 0.0 : color.equals ("yellowtint") ? -0.1 : color.equals ("yellow") ? -0.2 : color.equals ("orange") ? -0.3 : color.equals ("red") ? -0.4 : -0.5);
return (value >= this.vMin && value <= this.vMax ? value : NaN);
}, "~S");
Clazz.overrideMethod (c$, "readPolygons", 
function () {
return true;
});
Clazz.defineStatics (c$,
"POINTS_ALL", 0,
"POINTS_MCMC", 1,
"POINTS_SCSC", 2,
"POINTS_MCSC", 3,
"POINTS_HETS", 4);
});
