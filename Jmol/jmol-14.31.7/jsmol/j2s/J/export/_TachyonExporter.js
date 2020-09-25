Clazz.declarePackage ("J.export");
Clazz.load (["J.export.__RayTracerExporter", "$.UseTable"], "J.export._TachyonExporter", ["java.lang.Float", "JU.SB", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lighting = null;
this.phong = null;
this.textures = null;
this.textureCode = null;
Clazz.instantialize (this, arguments);
}, J["export"], "_TachyonExporter", J["export"].__RayTracerExporter);
Clazz.prepareFields (c$, function () {
this.textures =  new J["export"].UseTable (" ");
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J["export"]._TachyonExporter, []);
this.commentChar = "# ";
});
Clazz.overrideMethod (c$, "initializeOutput", 
function (vwr, privateKey, gdata, params) {
this.getLightingInfo ();
return this.initOutput (vwr, privateKey, gdata, params);
}, "JV.Viewer,~N,JU.GData,java.util.Map");
Clazz.defineMethod (c$, "getLightingInfo", 
 function () {
this.lighting = " AMBIENT " + J["export"].___Exporter.round (this.gdata.getAmbientPercent () / 100) + " DIFFUSE " + J["export"].___Exporter.round (this.gdata.getDiffusePercent () / 100) + " SPECULAR " + J["export"].___Exporter.round (this.gdata.getSpecularPercent () / 100);
this.phong = " Phong Plastic 0.5 Phong_size " + this.gdata.getSpecularExponent ();
});
Clazz.overrideMethod (c$, "outputHeader", 
function () {
this.initVars ();
this.output ("# ******************************************************\n");
this.output ("# Created by Jmol " + JV.Viewer.getJmolVersion () + "\n");
this.output ("#\n");
this.output ("# This script was generated on " + this.getExportDate () + "\n");
this.output ("#\n");
this.output ("# Requires Tachyon version 0.98.7 or newer\n");
this.output ("#\n");
this.output ("# Default tachyon rendering command for this scene:\n");
this.output ("#   tachyon  -aasamples 12 %s -format TARGA -o %s.tga\n");
this.output ("#\n");
this.output ("# ******************************************************\n");
this.output ("\n");
this.output (this.getJmolPerspective ());
this.output ("\n");
this.output ("Begin_Scene\n");
this.output ("Resolution " + this.screenWidth + " " + this.screenHeight + "\n");
this.output ("Shader_Mode Medium\n");
this.output ("  Trans_VMD\n");
this.output ("  Fog_VMD\n");
this.output ("End_Shader_Mode\n");
this.output ("Camera\n");
this.output ("  Zoom 3.0\n");
this.output ("  Aspectratio 1\n");
this.output ("  Antialiasing 12\n");
this.output ("  Raydepth 8\n");
this.output ("  Center " + this.triad (Clazz.doubleToInt (this.screenWidth / 2), Clazz.doubleToInt (this.screenHeight / 2), 0) + "\n");
this.output ("  Viewdir 0 0 1\n");
this.output ("  Updir   0 1 0\n");
this.output ("End_Camera\n");
this.output ("Directional_Light Direction " + J["export"].___Exporter.round (this.lightSource) + " Color 1 1 1\n");
this.output ("\n");
this.output ("Background " + this.rgbFractionalFromColix (this.backgroundColix) + "\n");
this.output ("\n");
});
Clazz.overrideMethod (c$, "outputFooter", 
function () {
this.output ("End_Scene\n");
});
Clazz.defineMethod (c$, "output", 
function (pt) {
this.output (this.triad (pt));
}, "JU.T3");
Clazz.defineMethod (c$, "triad", 
 function (x, y, z) {
return Clazz.floatToInt (x) + " " + Clazz.floatToInt (-y) + " " + Clazz.floatToInt (z);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "triad", 
 function (pt) {
if (Float.isNaN (pt.x)) return "0 0 0";
return this.triad (pt.x, pt.y, pt.z);
}, "JU.T3");
Clazz.defineMethod (c$, "outputTextureCode", 
 function () {
this.output (this.textureCode);
this.output ("\n");
});
Clazz.defineMethod (c$, "outputTexture", 
 function (colix, useTexDef) {
this.outputTexture2 (this.rgbFractionalFromColix (colix), J["export"].___Exporter.opacityFractionalFromColix (colix), useTexDef);
}, "~N,~B");
Clazz.defineMethod (c$, "outputTexture", 
 function (argb, useTexDef) {
this.outputTexture2 (this.rgbFractionalFromArgb (argb), J["export"].___Exporter.opacityFractionalFromArgb (argb), useTexDef);
}, "~N,~B");
Clazz.defineMethod (c$, "outputTexture2", 
 function (rgb, opacity, useTexDef) {
this.textureCode = (useTexDef ? this.textures.getDef ("t" + rgb + opacity) : null);
if (useTexDef && this.textureCode.startsWith (" ")) return;
var sb =  new JU.SB ();
sb.append (this.lighting);
sb.append (" Opacity " + opacity);
sb.append (this.phong);
sb.append (" Color " + rgb);
sb.append (" TexFunc 0\n");
if (!useTexDef) {
this.textureCode = "Texture " + sb;
return;
}this.output ("TexDef " + this.textureCode);
this.output (sb.toString ());
this.textureCode = " " + this.textureCode;
}, "~S,~S,~B");
Clazz.overrideMethod (c$, "outputCircle", 
function (x, y, z, radius, colix, doFill) {
this.tempV1.set (0, 0, -1);
this.outputRing (x, y, z, this.tempV1, radius, colix, doFill);
}, "~N,~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "outputRing", 
 function (x, y, z, tempV1, radius, colix, doFill) {
this.outputTexture (colix, true);
this.output ("Ring Center ");
this.output (this.triad (x, y, z));
this.output (" Normal " + this.triad (tempV1));
this.output (" Inner " + J["export"].___Exporter.round ((doFill ? 0 : radius * 0.95)));
this.output (" Outer " + J["export"].___Exporter.round (radius));
this.outputTextureCode ();
}, "~N,~N,~N,JU.V3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCone", 
function (screenBase, screenTip, radius, colix, isBarb) {
this.tm.unTransformPoint (screenBase, this.tempP1);
this.tm.unTransformPoint (screenTip, this.tempP2);
radius = this.vwr.tm.unscaleToScreen (screenBase.z, radius);
var matRotateScale = this.getRotationMatrix (this.tempP1, this.tempP2, radius);
this.export3D.drawSurface (J["export"].___Exporter.getConeMesh (this.tempP1, matRotateScale, colix), colix);
}, "JU.P3,JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCylinder", 
function (screenA, screenB, radius, colix, withCaps) {
this.outputTexture (colix, true);
this.output ("FCylinder Base ");
this.output (this.triad (screenA));
this.output (" Apex ");
this.output (this.triad (screenB));
this.output (" Rad " + J["export"].___Exporter.round (radius));
this.outputTextureCode ();
if (withCaps && radius > 1) {
this.tempV1.sub2 (screenA, screenB);
this.outputRing (Clazz.floatToInt (screenA.x), Clazz.floatToInt (screenA.y), Clazz.floatToInt (screenA.z), this.tempV1, radius, colix, true);
this.tempV1.scale (-1);
this.outputRing (Clazz.floatToInt (screenB.x), Clazz.floatToInt (screenB.y), Clazz.floatToInt (screenB.z), this.tempV1, radius, colix, true);
}}, "JU.P3,JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "fillConicalCylinder", 
function (screenA, screenB, madBond, colix, endcaps) {
var diameter = Clazz.floatToInt (this.vwr.tm.scaleToScreen (Clazz.floatToInt ((screenA.z + screenB.z) / 2), madBond));
this.fillCylinderScreenMad (colix, endcaps, diameter, screenA, screenB);
}, "JU.P3,JU.P3,~N,~N,~N");
Clazz.overrideMethod (c$, "outputCylinderConical", 
function (screenA, screenB, radius1, radius2, colix) {
}, "JU.P3,JU.P3,~N,~N,~N");
Clazz.overrideMethod (c$, "outputEllipsoid", 
function (center, radius, coef, colix) {
this.tm.transformPt3f (center, this.tempP1);
this.outputSphere (this.tempP1.x, this.tempP1.y, this.tempP1.z, radius, colix);
}, "JU.P3,~N,~A,~N");
Clazz.overrideMethod (c$, "outputSurface", 
function (vertices, normals, colixes, indices, polygonColixes, nVertices, nPolygons, nTriangles, bsPolygons, faceVertexMax, colix, colorList, htColixes, offset) {
if (polygonColixes != null) {
var isAll = (bsPolygons == null);
var i0 = (isAll ? nPolygons - 1 : bsPolygons.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsPolygons.nextSetBit (i + 1))) {
J["export"].___Exporter.setTempVertex (vertices[indices[i][0]], offset, this.tempP1);
J["export"].___Exporter.setTempVertex (vertices[indices[i][1]], offset, this.tempP2);
J["export"].___Exporter.setTempVertex (vertices[indices[i][2]], offset, this.tempP3);
this.tm.transformPt3f (this.tempP1, this.tempP1);
this.tm.transformPt3f (this.tempP2, this.tempP2);
this.tm.transformPt3f (this.tempP3, this.tempP3);
this.outputTriangle (this.tempP1, this.tempP2, this.tempP3, colix);
}
return;
}this.outputTexture (colixes == null ? colix : colixes[0], false);
this.output ("VertexArray  Numverts " + nVertices + "\nCoords\n");
for (var i = 0; i < nVertices; i++) this.outputVertex (vertices[i], offset);

this.output ("\nNormals\n");
for (var i = 0; i < nVertices; i++) {
J["export"].___Exporter.setTempVertex (vertices[i], offset, this.tempP1);
this.output (this.triad (this.getScreenNormal (this.tempP1, normals[i], 10)) + "\n");
}
var rgb = (colixes == null ? this.rgbFractionalFromColix (colix) : null);
this.output ("\nColors\n");
for (var i = 0; i < nVertices; i++) {
this.output ((colixes == null ? rgb : this.rgbFractionalFromColix (colixes[i])) + "\n");
}
this.outputTextureCode ();
this.output ("\nTriMesh " + nTriangles + "\n");
var isAll = (bsPolygons == null);
var i0 = (isAll ? nPolygons - 1 : bsPolygons.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsPolygons.nextSetBit (i + 1))) {
this.output (indices[i][0] + " " + indices[i][1] + " " + indices[i][2] + "\n");
if (faceVertexMax == 4 && indices[i].length == 4) this.output (indices[i][0] + " " + indices[i][2] + " " + indices[i][3] + "\n");
}
this.output ("\nEnd_VertexArray\n");
}, "~A,~A,~A,~A,~A,~N,~N,~N,JU.BS,~N,~N,JU.Lst,java.util.Map,JU.P3");
Clazz.overrideMethod (c$, "outputSphere", 
function (x, y, z, radius, colix) {
this.outputTexture (colix, true);
this.output ("Sphere Center ");
this.output (this.triad (x, y, z));
this.output (" Rad " + J["export"].___Exporter.round (radius));
this.outputTextureCode ();
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "outputTextPixel", 
function (x, y, z, argb) {
this.outputTexture (argb, true);
this.output ("Sphere Center ");
this.output (this.triad (x, y, z));
this.output (" Rad 1");
this.outputTextureCode ();
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "outputTriangle", 
function (ptA, ptB, ptC, colix) {
this.outputTexture (colix, true);
this.output ("TRI");
this.output (" V0 " + this.triad (ptA));
this.output (" V1 " + this.triad (ptB));
this.output (" V2 " + this.triad (ptC));
this.outputTextureCode ();
}, "JU.T3,JU.T3,JU.T3,~N");
});
