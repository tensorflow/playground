Clazz.declarePackage ("J.export");
Clazz.load (["J.export.__RayTracerExporter"], "J.export._PovrayExporter", ["java.lang.Float", "$.Short", "JU.Measure", "$.P4", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.haveMacros = false;
Clazz.instantialize (this, arguments);
}, J["export"], "_PovrayExporter", J["export"].__RayTracerExporter);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J["export"]._PovrayExporter, []);
this.commentChar = "// ";
});
Clazz.overrideMethod (c$, "finalizeOutput", 
function () {
this.finalizeOutput2 ();
return this.getAuxiliaryFileData ();
});
Clazz.overrideMethod (c$, "outputHeader", 
function () {
this.initVars ();
this.output ("// ******************************************************\n");
this.output ("// Created by Jmol " + JV.Viewer.getJmolVersion () + "\n");
this.output ("//\n");
this.output ("// This script was generated on " + this.getExportDate () + "\n");
this.output ("// ******************************************************\n");
try {
this.output (this.vwr.getWrappedStateScript ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.output ("\n");
this.output (this.getJmolPerspective ());
this.output ("\n");
this.output ("// ******************************************************\n");
this.output ("// Declare the resolution, camera, and light sources.\n");
this.output ("// ******************************************************\n");
this.output ("\n");
this.output ("// NOTE: if you plan to render at a different resolution,\n");
this.output ("// be sure to update the following two lines to maintain\n");
this.output ("// the correct aspect ratio.\n\n");
this.output ("#declare Width = " + this.screenWidth + ";\n");
this.output ("#declare Height = " + this.screenHeight + ";\n");
this.output ("#declare minScreenDimension = " + this.minScreenDimension + ";\n");
this.output ("#declare showAtoms = true;\n");
this.output ("#declare showBonds = true;\n");
this.output ("#declare noShadows = true;\n");
this.output ("camera{\n");
var offsetX;
var offsetY;
var f;
if (this.wasPerspective) {
offsetX = this.vwr.tm.getTranslationXPercent () / 100 * this.screenWidth;
offsetY = this.vwr.tm.getTranslationYPercent () / 100 * this.screenHeight;
f = 1 / this.vwr.tm.getPerspectiveFactor ((this.vwr.tm.getCameraDepth () - 0.5) * this.vwr.getScreenDim ());
this.output ("  perspective\n");
this.output ("  angle " + this.apertureAngle + "\n");
this.output ("  right < " + this.screenWidth + ", 0, 0>\n");
this.output ("  up < 0, " + -this.screenHeight + ", 0 >\n");
} else {
offsetX = offsetY = f = 0;
this.output ("  orthographic\n");
this.output ("  right < " + -this.screenWidth + ", 0, 0>\n");
this.output ("  up < 0, " + this.screenHeight + ", 0 >\n");
}this.output ("  sky < 0, -1, 0 >\n");
this.output ("  location < " + (this.screenWidth / 2 + offsetX) + ", " + (this.screenHeight / 2 + offsetY) + ", 0>\n");
this.output ("  look_at < " + (this.screenWidth / 2 + f * offsetX) + ", " + (this.screenHeight / 2 + f * offsetY) + ", 1000 >\n");
this.output ("}\n");
this.output ("\n");
this.output ("background { color rgb <" + this.rgbFractionalFromColix (this.backgroundColix) + "> }\n");
this.output ("\n");
var distance = Math.max (this.screenWidth, this.screenHeight);
this.output ("light_source { <" + this.lightSource.x * distance + "," + this.lightSource.y * distance + ", " + (-1 * this.lightSource.z * distance) + "> " + " rgb <0.6,0.6,0.6> }\n");
this.output ("\n");
this.output ("\n");
this.output ("// ***********************************************\n");
this.output ("// macros for common shapes\n");
this.output ("// ***********************************************\n");
this.output ("\n");
this.writeMacros ();
});
Clazz.defineMethod (c$, "writeMacros", 
 function () {
this.output ("#default { finish {\n" + "  ambient " + this.gdata.getAmbientPercent () / 100 + "\n" + "  diffuse " + this.gdata.getDiffusePercent () / 100 + "\n" + "  specular " + this.gdata.getSpecularPercent () / 100 + "\n" + "  roughness .00001\n  metallic\n  phong 0.9\n  phong_size 120\n}}" + "\n\n");
this.output ("#macro check_shadow()\n #if (noShadows)\n  no_shadow \n #end\n#end\n\n");
this.output ("#declare slabZ = " + this.slabZ + ";\n" + "#declare depthZ = " + this.depthZ + ";\n" + "#declare dzSlab = 10;\n" + "#declare dzDepth = dzSlab;\n" + "#declare dzStep = 0.001;\n\n");
this.output ("#macro clip()\n  clipped_by { box {<0,0,slabZ>,<Width,Height,depthZ>} }\n#end\n\n");
this.output ("#macro circleCap(Z,RADIUS,R,G,B,T)\n// cap for lower clip\n #local cutDiff = Z - slabZ;\n #local cutRadius2 = (RADIUS*RADIUS) - (cutDiff*cutDiff);\n #if (cutRadius2 > 0)\n  #local cutRadius = sqrt(cutRadius2);\n  #if (dzSlab > 0)\n   #declare dzSlab = dzSlab - dzStep;\n  #end\n  cylinder{<X,Y,slabZ-dzSlab>,<X,Y,(slabZ+1)>,cutRadius\n   pigment{rgbt<R,G,B,T>}\n   translucentFinish(T)\n   check_shadow()}\n #end\n// cap for upper clip\n #declare cutDiff = Z - depthZ;\n #declare cutRadius2 = (RADIUS*RADIUS) - (cutDiff*cutDiff);\n #if (cutRadius2 > 0)\n  #local cutRadius = sqrt(cutRadius2);\n  #if (dzDepth > 0)\n   #declare dzDepth = dzDepth - dzStep;\n  #end\n  cylinder{<X,Y,depthZ+dzDepth>,<X,Y,(depthZ-1)>,cutRadius\n   pigment{rgbt<R,G,B,T>}\n   translucentFinish(T)\n   check_shadow()}\n #end\n#end\n\n");
this.writeMacrosFinish ();
this.writeMacrosAtom ();
this.writeMacrosBond ();
});
Clazz.defineMethod (c$, "writeMacrosFinish", 
 function () {
this.output ("#macro translucentFinish(T)\n" + " #local shineFactor = T;\n" + " #if (T <= 0.25)\n" + "  #declare shineFactor = (1.0-4*T);\n" + " #end\n" + " #if (T > 0.25)\n" + "  #declare shineFactor = 0;\n" + " #end\n" + " finish {\n" + "  ambient " + this.gdata.getAmbientPercent () / 100 + "\n" + "  diffuse " + this.gdata.getDiffusePercent () / 100 + "\n" + "  specular " + this.gdata.getSpecularPercent () / 100 + "\n" + "  roughness .00001\n" + "  metallic shineFactor\n" + "  phong 0.9*shineFactor\n" + "  phong_size 120*shineFactor\n}" + "#end\n\n");
});
Clazz.defineMethod (c$, "writeMacrosAtom", 
 function () {
this.output ("#macro a(X,Y,Z,RADIUS,R,G,B,T)\n sphere{<X,Y,Z>,RADIUS\n  pigment{rgbt<R,G,B,T>}\n  translucentFinish(T)\n  clip()\n  check_shadow()}\n" + (this.isSlabEnabled ? " circleCap(Z,RADIUS,R,G,B,T)\n" : "") + "#end\n\n");
this.output ("#macro q(XX,YY,ZZ,XY,XZ,YZ,X,Y,Z,J,R,G,B,T)\n quadric{<XX,YY,ZZ>,<XY,XZ,YZ>,<X,Y,Z>,J\n  pigment{rgbt<R,G,B,T>}\n  translucentFinish(T)\n  clip()\n  check_shadow()}\n#end\n\n");
});
Clazz.defineMethod (c$, "writeMacrosBond", 
 function () {
this.output ("#macro b(X1,Y1,Z1,RADIUS1,X2,Y2,Z2,RADIUS2,R,G,B,T)\n cone{<X1,Y1,Z1>,RADIUS1,<X2,Y2,Z2>,RADIUS2\n  pigment{rgbt<R,G,B,T>}\n  translucentFinish(T)\n  clip()\n  check_shadow()}\n#end\n\n");
this.output ("#macro c(X1,Y1,Z1,RADIUS1,X2,Y2,Z2,RADIUS2,R,G,B,T)\n cone{<X1,Y1,Z1>,RADIUS1,<X2,Y2,Z2>,RADIUS2 open\n  pigment{rgbt<R,G,B,T>}\n  translucentFinish(T)\n  clip()\n  check_shadow()}\n#end\n\n");
});
Clazz.defineMethod (c$, "writeMacros2", 
 function () {
this.output ("#macro r(X1,Y1,Z1,X2,Y2,Z2,X3,Y3,Z3,R,G,B,T)\n triangle{<X1,Y1,Z1>,<X2,Y2,Z2>,<X3,Y3,Z3>\n  pigment{rgbt<R,G,B,T>}\n  translucentFinish(T)\n  clip()\n  check_shadow()}\n#end\n\n");
this.output ("#macro p(X,Y,Z,R,G,B,T)\n box{<X,Y,Z>,<X+1,Y+1,Z+1>\n  pigment{rgbt<R,G,B,T>}\n  clip()\n  check_shadow()}\n#end\n\n");
this.output ("#macro barb(X1,Y1,Z1,RADIUS1,X2,Y2,Z2,RADIUS2,R,G,B,T,X3,Y3,Z3,W3)\n cone{<X1,Y1,Z1>,RADIUS1,<X2,Y2,Z2>,RADIUS2\n  pigment{rgbt<R,G,B,T>}\n  translucentFinish(T)\n  clip()\n  clipped_by{plane{<X3,Y3,Z3>,W3}}\n  check_shadow()}\n#end\n\n");
this.haveMacros = true;
});
Clazz.defineMethod (c$, "getTriad", 
function (pt) {
if (Float.isNaN (pt.x)) return "0,0,0";
return pt.x + "," + pt.y + "," + pt.z;
}, "JU.T3");
Clazz.defineMethod (c$, "getTriad", 
 function (i) {
return i[0] + "," + i[1] + "," + i[2];
}, "~A");
Clazz.defineMethod (c$, "color4", 
 function (colix) {
return this.rgbFractionalFromColix (colix) + "," + J["export"].___Exporter.translucencyFractionalFromColix (colix);
}, "~N");
Clazz.defineMethod (c$, "getAuxiliaryFileData", 
 function () {
var fName = this.fileName.substring (this.fileName.lastIndexOf ("/") + 1);
fName = fName.substring (fName.lastIndexOf ("\\") + 1);
return "; Created by: Jmol " + JV.Viewer.getJmolVersion () + "\n; Creation date: " + this.getExportDate () + "\n; File created: " + this.fileName + " (" + this.getByteCount () + " bytes)\n\n" + (this.commandLineOptions != null ? this.commandLineOptions : "\n; Jmol state: (embedded in input file)\nInput_File_Name=" + fName + "\nOutput_to_File=true" + "\nOutput_File_Type=N" + "\nOutput_File_Name=" + fName + ".png" + "\nWidth=" + this.screenWidth + "\nHeight=" + this.screenHeight + "\nAntialias=true" + "\nAntialias_Threshold=0.1" + "\nDisplay=true" + "\nPause_When_Done=true" + "\nWarning_Level=5" + "\nVerbose=false" + "\n");
});
Clazz.defineMethod (c$, "output", 
function (pt) {
this.output (", <" + this.getTriad (pt) + ">");
}, "JU.T3");
Clazz.overrideMethod (c$, "outputCircle", 
function (x, y, z, radius, colix, doFill) {
this.output ((doFill ? "b(" : "c(") + x + "," + y + "," + z + "," + radius + "," + x + "," + y + "," + (z + 1) + "," + (radius + (doFill ? 0 : 2)) + "," + this.color4 (colix) + ")\n");
}, "~N,~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCone", 
function (screenBase, screenTip, radius, colix, isBarb) {
if (isBarb) {
if (!this.haveMacros) this.writeMacros2 ();
this.tempP1.set (screenBase.x, screenTip.y, 12345.6789);
var plane = JU.Measure.getPlaneThroughPoints (screenBase, screenTip, this.tempP1, this.tempV1, this.tempV2,  new JU.P4 ());
this.output ("barb(" + this.getTriad (screenBase) + "," + radius + "," + this.getTriad (screenTip) + ",0" + "," + this.color4 (colix) + "," + plane.x + "," + plane.y + "," + plane.z + "," + -plane.w + ")\n");
} else {
this.output ("b(" + this.getTriad (screenBase) + "," + radius + "," + this.getTriad (screenTip) + ",0" + "," + this.color4 (colix) + ")\n");
}}, "JU.P3,JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCylinder", 
function (screenA, screenB, radius, colix, withCaps) {
var color = this.color4 (colix);
this.output ((withCaps ? "b(" : "c(") + this.getTriad (screenA) + "," + radius + "," + this.getTriad (screenB) + "," + radius + "," + color + ")\n");
}, "JU.P3,JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCylinderConical", 
function (screenA, screenB, radius1, radius2, colix) {
this.output ("b(" + this.getTriad (screenA) + "," + radius1 + "," + this.getTriad (screenB) + "," + radius2 + "," + this.color4 (colix) + ")\n");
}, "JU.P3,JU.P3,~N,~N,~N");
Clazz.overrideMethod (c$, "outputEllipsoid", 
function (center, radius, coef, colix) {
var s = coef[0] + "," + coef[1] + "," + coef[2] + "," + coef[3] + "," + coef[4] + "," + coef[5] + "," + coef[6] + "," + coef[7] + "," + coef[8] + "," + coef[9] + "," + this.color4 (colix);
this.output ("q(" + s + ")\n");
}, "JU.P3,~N,~A,~N");
Clazz.overrideMethod (c$, "outputSurface", 
function (vertices, normals, colixes, indices, polygonColixes, nVertices, nPolygons, nTriangles, bsPolygons, faceVertexMax, colix, colorList, htColixes, offset) {
if (polygonColixes != null) {
var isAll = (bsPolygons == null);
var i0 = (isAll ? nPolygons - 1 : bsPolygons.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsPolygons.nextSetBit (i + 1))) {
this.output ("polygon { 4\n");
for (var j = 0; j <= 3; j++) this.outputVertex (vertices[indices[i][j % 3]], offset);

this.output ("\n");
this.output ("pigment{rgbt<" + this.color4 (colix = polygonColixes[i]) + ">}\n");
this.output ("  translucentFinish(" + J["export"].___Exporter.translucencyFractionalFromColix (colix) + ")\n");
this.output ("  check_shadow()\n");
this.output ("  clip()\n");
this.output ("}\n");
}
return;
}this.output ("mesh2 {\n");
this.output ("vertex_vectors { " + nVertices);
for (var i = 0; i < nVertices; i++) this.outputVertex (vertices[i], offset);

this.output ("\n}\n");
var haveNormals = (normals != null);
if (haveNormals) {
this.output ("normal_vectors { " + nVertices);
for (var i = 0; i < nVertices; i++) {
J["export"].___Exporter.setTempVertex (vertices[i], offset, this.tempP2);
this.output (this.getScreenNormal (this.tempP2, normals[i], 1));
this.output ("\n");
}
this.output ("\n}\n");
}if (colixes != null) {
var nColix = colorList.size ();
this.output ("texture_list { " + nColix);
var finish = ">} translucentFinish(" + J["export"].___Exporter.translucencyFractionalFromColix (colixes[0]) + ")}";
for (var i = 0; i < nColix; i++) this.output ("\n, texture{pigment{rgbt<" + this.color4 (colorList.get (i).shortValue ()) + finish);

this.output ("\n}\n");
}this.output ("face_indices { " + nTriangles);
var isAll = (bsPolygons == null);
var i0 = (isAll ? nPolygons - 1 : bsPolygons.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsPolygons.nextSetBit (i + 1))) {
this.output (", <" + this.getTriad (indices[i]) + ">");
if (colixes != null) {
this.output ("," + htColixes.get (Short.$valueOf (colixes[indices[i][0]])));
this.output ("," + htColixes.get (Short.$valueOf (colixes[indices[i][1]])));
this.output ("," + htColixes.get (Short.$valueOf (colixes[indices[i][2]])));
}if (faceVertexMax == 4 && indices[i].length == 4) {
this.output (", <" + indices[i][0] + "," + indices[i][2] + "," + indices[i][3] + ">");
if (colixes != null) {
this.output ("," + htColixes.get (Short.$valueOf (colixes[indices[i][0]])));
this.output ("," + htColixes.get (Short.$valueOf (colixes[indices[i][2]])));
this.output ("," + htColixes.get (Short.$valueOf (colixes[indices[i][3]])));
}}this.output ("\n");
}
this.output ("\n}\n");
if (colixes == null) {
this.output ("pigment{rgbt<" + this.color4 (colix) + ">}\n");
this.output ("  translucentFinish(" + J["export"].___Exporter.translucencyFractionalFromColix (colix) + ")\n");
}this.output ("  check_shadow()\n");
this.output ("  clip()\n");
this.output ("}\n");
}, "~A,~A,~A,~A,~A,~N,~N,~N,JU.BS,~N,~N,JU.Lst,java.util.Map,JU.P3");
Clazz.overrideMethod (c$, "outputSphere", 
function (x, y, z, radius, colix) {
this.output ("a(" + x + "," + y + "," + z + "," + radius + "," + this.color4 (colix) + ")\n");
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "outputTextPixel", 
function (x, y, z, argb) {
if (!this.haveMacros) this.writeMacros2 ();
var tr = ((argb >> 24) & 0xFF);
tr = (255 - tr) / 255;
this.output ("p(" + x + "," + y + "," + z + "," + this.rgbFractionalFromArgb (argb) + "," + tr + ")\n");
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "outputTriangle", 
function (ptA, ptB, ptC, colix) {
if (!this.haveMacros) this.writeMacros2 ();
this.output ("r(" + this.getTriad (ptA) + "," + this.getTriad (ptB) + "," + this.getTriad (ptC) + "," + this.color4 (colix) + ")\n");
}, "JU.T3,JU.T3,JU.T3,~N");
});
