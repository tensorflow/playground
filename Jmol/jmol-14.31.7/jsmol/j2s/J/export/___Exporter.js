Clazz.declarePackage ("J.export");
Clazz.load (["JU.P3", "$.V3"], "J.export.___Exporter", ["java.lang.Float", "$.Short", "java.util.Hashtable", "JU.AU", "$.Lst", "$.M3", "$.Quat", "$.SB", "JU.C", "$.Logger", "$.MeshSurface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.solidOnly = false;
this.vwr = null;
this.tm = null;
this.privateKey = 0;
this.export3D = null;
this.out = null;
this.fileName = null;
this.commandLineOptions = null;
this.gdata = null;
this.backgroundColix = 0;
this.screenWidth = 0;
this.screenHeight = 0;
this.slabZ = 0;
this.depthZ = 0;
this.lightSource = null;
this.fixedRotationCenter = null;
this.referenceCenter = null;
this.cameraPosition = null;
this.cameraDistance = 0;
this.apertureAngle = 0;
this.scalePixelsPerAngstrom = 0;
this.exportScale = 1;
this.exportType = 0;
this.tempP1 = null;
this.tempP2 = null;
this.tempP3 = null;
this.center = null;
this.tempV1 = null;
this.tempV2 = null;
this.isWebGL = false;
this.commentChar = null;
this.tempC = null;
this.nText = 0;
this.nImage = 0;
this.lineWidthMad = 0;
Clazz.instantialize (this, arguments);
}, J["export"], "___Exporter");
Clazz.prepareFields (c$, function () {
this.tempP1 =  new JU.P3 ();
this.tempP2 =  new JU.P3 ();
this.tempP3 =  new JU.P3 ();
this.center =  new JU.P3 ();
this.tempV1 =  new JU.V3 ();
this.tempV2 =  new JU.V3 ();
this.tempC =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "initializeOutput", 
function (vwr, privateKey, gdata, params) {
return this.initOutput (vwr, privateKey, gdata, params);
}, "JV.Viewer,~N,JU.GData,java.util.Map");
Clazz.defineMethod (c$, "initOutput", 
function (vwr, privateKey, g3d, params) {
this.vwr = vwr;
this.tm = vwr.tm;
this.isWebGL = params.get ("type").equals ("JS");
this.gdata = g3d;
this.privateKey = privateKey;
this.backgroundColix = vwr.getObjectColix (0);
this.center.setT (this.tm.fixedRotationCenter);
this.exportScale = vwr.getFloat (570425358);
if (this.exportScale == 0) {
this.exportScale = 10;
}JU.Logger.info ("__Exporter exportScale: " + this.exportScale);
if ((this.screenWidth <= 0) || (this.screenHeight <= 0)) {
this.screenWidth = vwr.getScreenWidth ();
this.screenHeight = vwr.getScreenHeight ();
}this.slabZ = g3d.slab;
this.depthZ = g3d.depth;
this.lightSource = g3d.getLightSource ();
var cameraFactors = vwr.tm.getCameraFactors ();
this.referenceCenter = cameraFactors[0];
this.cameraPosition = cameraFactors[1];
this.fixedRotationCenter = cameraFactors[2];
this.cameraDistance = cameraFactors[3].x;
this.apertureAngle = cameraFactors[3].y;
this.scalePixelsPerAngstrom = cameraFactors[3].z;
this.out = params.get ("outputChannel");
this.commandLineOptions = params.get ("params");
if (this.out != null) this.fileName = this.out.getFileName ();
this.outputHeader ();
return true;
}, "JV.Viewer,~N,JU.GData,java.util.Map");
Clazz.defineMethod (c$, "output", 
function (data) {
this.out.append (data);
}, "~S");
Clazz.defineMethod (c$, "getByteCount", 
function () {
return this.out.getByteCount ();
});
Clazz.defineMethod (c$, "outputComment", 
function (comment) {
if (this.commentChar != null) this.output (this.commentChar + comment + "\n");
}, "~S");
c$.setTempVertex = Clazz.defineMethod (c$, "setTempVertex", 
function (pt, offset, ptTemp) {
ptTemp.setT (pt);
if (offset != null) ptTemp.add (offset);
}, "JU.T3,JU.T3,JU.T3");
Clazz.defineMethod (c$, "outputVertices", 
function (vertices, nVertices, offset) {
for (var i = 0; i < nVertices; i++) {
if (Float.isNaN (vertices[i].x)) continue;
this.outputVertex (vertices[i], offset);
this.output ("\n");
}
}, "~A,~N,JU.T3");
Clazz.defineMethod (c$, "outputVertex", 
function (pt, offset) {
J["export"].___Exporter.setTempVertex (pt, offset, this.tempV1);
this.output (this.tempV1);
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "outputJmolPerspective", 
function () {
this.outputComment (this.getJmolPerspective ());
});
Clazz.defineMethod (c$, "getJmolPerspective", 
function () {
if (this.commentChar == null) return "";
var sb =  new JU.SB ();
sb.append (this.commentChar).append ("Jmol perspective:");
sb.append ("\n").append (this.commentChar).append ("screen width height dim: " + this.screenWidth + " " + this.screenHeight + " " + this.vwr.getScreenDim ());
sb.append ("\n").append (this.commentChar).append ("perspectiveDepth: " + this.vwr.tm.perspectiveDepth);
sb.append ("\n").append (this.commentChar).append ("cameraDistance(angstroms): " + this.cameraDistance);
sb.append ("\n").append (this.commentChar).append ("aperatureAngle(degrees): " + this.apertureAngle);
sb.append ("\n").append (this.commentChar).append ("scalePixelsPerAngstrom: " + this.scalePixelsPerAngstrom);
sb.append ("\n").append (this.commentChar).append ("light source: " + this.lightSource);
sb.append ("\n").append (this.commentChar).append ("lighting: " + this.vwr.getLightingState ().$replace ('\n', ' '));
sb.append ("\n").append (this.commentChar).append ("center: " + this.center);
sb.append ("\n").append (this.commentChar).append ("rotationRadius: " + this.vwr.getFloat (570425388));
sb.append ("\n").append (this.commentChar).append ("boundboxCenter: " + this.vwr.getBoundBoxCenter ());
sb.append ("\n").append (this.commentChar).append ("translationOffset: " + this.tm.getTranslationScript ());
sb.append ("\n").append (this.commentChar).append ("zoom: " + this.vwr.tm.zmPct);
sb.append ("\n").append (this.commentChar).append ("moveto command: " + this.vwr.getOrientationText (4129, null, null));
sb.append ("\n");
return sb.toString ();
});
Clazz.defineMethod (c$, "outputFooter", 
function () {
});
Clazz.defineMethod (c$, "finalizeOutput", 
function () {
return this.finalizeOutput2 ();
});
Clazz.defineMethod (c$, "finalizeOutput2", 
function () {
this.outputFooter ();
if (this.out == null) return null;
var ret = this.out.closeChannel ();
if (this.fileName == null) return ret;
if (ret != null) {
JU.Logger.info (ret);
return "ERROR EXPORTING FILE: " + ret;
}return "OK " + this.out.getByteCount () + " " + this.export3D.getExportName () + " " + this.fileName;
});
Clazz.defineMethod (c$, "getExportDate", 
function () {
return this.vwr.apiPlatform.getDateFormat (null);
});
Clazz.defineMethod (c$, "rgbFractionalFromColix", 
function (colix) {
return this.rgbFractionalFromArgb (this.gdata.getColorArgbOrGray (colix));
}, "~N");
Clazz.defineMethod (c$, "getTriadC", 
function (t) {
return this.getTriad (t);
}, "JU.T3");
Clazz.defineMethod (c$, "getTriad", 
function (t) {
return J["export"].___Exporter.round (t.x) + " " + J["export"].___Exporter.round (t.y) + " " + J["export"].___Exporter.round (t.z);
}, "JU.T3");
Clazz.defineMethod (c$, "rgbFractionalFromArgb", 
function (argb) {
var red = (argb >> 16) & 0xFF;
var green = (argb >> 8) & 0xFF;
var blue = argb & 0xFF;
this.tempC.set (red == 0 ? 0 : (red + 1) / 256, green == 0 ? 0 : (green + 1) / 256, blue == 0 ? 0 : (blue + 1) / 256);
return this.getTriadC (this.tempC);
}, "~N");
c$.translucencyFractionalFromColix = Clazz.defineMethod (c$, "translucencyFractionalFromColix", 
function (colix) {
return J["export"].___Exporter.round (JU.C.getColixTranslucencyFractional (colix));
}, "~N");
c$.opacityFractionalFromColix = Clazz.defineMethod (c$, "opacityFractionalFromColix", 
function (colix) {
return J["export"].___Exporter.round (1 - JU.C.getColixTranslucencyFractional (colix));
}, "~N");
c$.opacityFractionalFromArgb = Clazz.defineMethod (c$, "opacityFractionalFromArgb", 
function (argb) {
var opacity = (argb >> 24) & 0xFF;
return J["export"].___Exporter.round (opacity == 0 ? 0 : (opacity + 1) / 256);
}, "~N");
c$.round = Clazz.defineMethod (c$, "round", 
function (number) {
var s;
return (number == 0 ? "0" : number == 1 ? "1" : (s = "" + (Math.round (number * 1000) / 1000)).startsWith ("0.") ? s.substring (1) : s.startsWith ("-0.") ? "-" + s.substring (2) : s.endsWith (".0") ? s.substring (0, s.length - 2) : s);
}, "~N");
c$.round = Clazz.defineMethod (c$, "round", 
function (pt) {
return J["export"].___Exporter.round (pt.x) + " " + J["export"].___Exporter.round (pt.y) + " " + J["export"].___Exporter.round (pt.z);
}, "JU.T3");
Clazz.defineMethod (c$, "getColorList", 
function (i00, colixes, nVertices, bsSelected, htColixes) {
var nColix = 0;
var list =  new JU.Lst ();
var isAll = (bsSelected == null);
var i0 = (isAll ? nVertices - 1 : bsSelected.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsSelected.nextSetBit (i + 1))) {
var color = Short.$valueOf (colixes[i]);
if (!htColixes.containsKey (color)) {
list.addLast (color);
htColixes.put (color, Integer.$valueOf (i00 + nColix++));
}}
return list;
}, "~N,~A,~N,JU.BS,java.util.Map");
c$.getConeMesh = Clazz.defineMethod (c$, "getConeMesh", 
function (centerBase, matRotateScale, colix) {
var ms =  new JU.MeshSurface ();
var ndeg = 10;
var n = Clazz.doubleToInt (360 / ndeg);
ms.colix = colix;
ms.vs =  new Array (ms.vc = n + 1);
ms.pis = JU.AU.newInt2 (ms.pc = n);
for (var i = 0; i < n; i++) ms.pis[i] =  Clazz.newIntArray (-1, [i, (i + 1) % n, n]);

var d = ndeg / 180. * 3.141592653589793;
for (var i = 0; i < n; i++) {
var x = (Math.cos (i * d));
var y = (Math.sin (i * d));
ms.vs[i] = JU.P3.new3 (x, y, 0);
}
ms.vs[n] = JU.P3.new3 (0, 0, 1);
if (matRotateScale != null) {
ms.normals =  new Array (ms.vc);
for (var i = 0; i < ms.vc; i++) {
matRotateScale.rotate (ms.vs[i]);
ms.normals[i] = JU.V3.newV (ms.vs[i]);
ms.normals[i].normalize ();
ms.vs[i].add (centerBase);
}
}return ms;
}, "JU.P3,JU.M3,~N");
Clazz.defineMethod (c$, "getRotationMatrix", 
function (pt1, pt2, radius) {
var m =  new JU.M3 ();
var m1;
if (pt2.x == pt1.x && pt2.y == pt1.y) {
m1 = JU.M3.newM3 (null);
if (pt1.z > pt2.z) m1.m11 = m1.m22 = -1;
} else {
this.tempV1.sub2 (pt2, pt1);
this.tempV2.set (0, 0, 1);
this.tempV2.cross (this.tempV2, this.tempV1);
this.tempV1.cross (this.tempV1, this.tempV2);
var q = JU.Quat.getQuaternionFrameV (this.tempV2, this.tempV1, null, false);
m1 = q.getMatrix ();
}m.m00 = radius;
m.m11 = radius;
m.m22 = pt2.distance (pt1);
m1.mul (m);
return m1;
}, "JU.P3,JU.P3,~N");
Clazz.defineMethod (c$, "getRotationMatrix", 
function (pt1, ptZ, radius, ptX, ptY) {
var m =  new JU.M3 ();
m.m00 = ptX.distance (pt1) * radius;
m.m11 = ptY.distance (pt1) * radius;
m.m22 = ptZ.distance (pt1) * 2;
var q = JU.Quat.getQuaternionFrame (pt1, ptX, ptY);
var m1 = q.getMatrix ();
m1.mul (m);
return m1;
}, "JU.P3,JU.P3,~N,JU.P3,JU.P3");
Clazz.defineMethod (c$, "drawSurface", 
function (meshSurface, colix) {
var nVertices = meshSurface.vc;
if (nVertices == 0) return;
var nTriangles = 0;
var nPolygons = meshSurface.pc;
var bsPolygons = meshSurface.bsPolygons;
var faceVertexMax = (meshSurface.haveQuads ? 4 : 3);
var indices = meshSurface.pis;
var isAll = (bsPolygons == null);
var i0 = (isAll ? nPolygons - 1 : bsPolygons.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsPolygons.nextSetBit (i + 1))) nTriangles += (faceVertexMax == 4 && indices[i].length == 4 ? 2 : 1);

if (nTriangles == 0) return;
var vertices = meshSurface.getVertices ();
var normals = meshSurface.normals;
var colorSolid = (colix != 0);
var colixes = (colorSolid ? null : meshSurface.vcs);
var polygonColixes = (colorSolid ? meshSurface.pcs : null);
var htColixes = null;
var colorList = null;
if (!this.isWebGL) {
htColixes =  new java.util.Hashtable ();
if (polygonColixes != null) colorList = this.getColorList (0, polygonColixes, nPolygons, bsPolygons, htColixes);
 else if (colixes != null) colorList = this.getColorList (0, colixes, nVertices, null, htColixes);
}this.outputSurface (vertices, normals, colixes, indices, polygonColixes, nVertices, nPolygons, nTriangles, bsPolygons, faceVertexMax, colix, colorList, htColixes, meshSurface.offset);
}, "JU.MeshSurface,~N");
Clazz.defineMethod (c$, "outputSurface", 
function (vertices, normals, colixes, indices, polygonColixes, nVertices, nPolygons, nTriangles, bsPolygons, faceVertexMax, colix, colorList, htColixes, offset) {
}, "~A,~A,~A,~A,~A,~N,~N,~N,JU.BS,~N,~N,JU.Lst,java.util.Map,JU.P3");
Clazz.defineMethod (c$, "drawFilledCircle", 
function (colixRing, colixFill, diameter, x, y, z) {
if (colixRing != 0) this.drawCircle (x, y, z, diameter, colixRing, false);
if (colixFill != 0) this.drawCircle (x, y, z, diameter, colixFill, true);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "fixScreenZ", 
function (z) {
return (z <= 3 ? z + Clazz.floatToInt (this.tm.cameraDistance) : z);
}, "~N");
Clazz.defineMethod (c$, "plotImage", 
function (x, y, z, image, bgcolix, width, height) {
this.outputComment ("start image " + (++this.nImage));
this.gdata.plotImage (x, y, z, image, this.export3D, bgcolix, width, height);
this.outputComment ("end image " + this.nImage);
}, "~N,~N,~N,~O,~N,~N,~N");
Clazz.defineMethod (c$, "plotText", 
function (x, y, z, colix, text, font3d) {
this.outputComment ("start text " + (++this.nText) + ": " + text);
this.gdata.plotText (x, y, z, this.gdata.getColorArgbOrGray (colix), 0, text, font3d, this.export3D);
this.outputComment ("end text " + this.nText + ": " + text);
}, "~N,~N,~N,~N,~S,JU.Font");
Clazz.defineStatics (c$,
"degreesPerRadian", (57.29577951308232));
});
