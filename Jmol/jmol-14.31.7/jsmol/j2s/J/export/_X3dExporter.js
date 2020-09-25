Clazz.declarePackage ("J.export");
Clazz.load (["J.export._VrmlExporter"], "J.export._X3dExporter", ["JU.Lst", "$.PT", "J.export.UseTable", "JV.Viewer"], function () {
c$ = Clazz.declareType (J["export"], "_X3dExporter", J["export"]._VrmlExporter);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J["export"]._X3dExporter);
this.useTable =  new J["export"].UseTable ("USE='");
});
Clazz.overrideMethod (c$, "outputHeader", 
function () {
this.output ("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n");
this.output ("<!DOCTYPE X3D PUBLIC \"ISO//Web3D//DTD X3D 3.1//EN\" \"http://www.web3d.org/specifications/x3d-3.1.dtd\">\n");
this.output ("<X3D profile=\'Immersive\' version=\'3.1\' xmlns:xsd=\'http://www.w3.org/2001/XMLSchema-instance\' xsd:noNamespaceSchemaLocation=\' http://www.web3d.org/specifications/x3d-3.1.xsd \'>\n");
this.output ("<head>\n");
this.output ("<meta name='title' content=" + JU.PT.esc (this.vwr.ms.modelSetName).$replace ('<', ' ').$replace ('>', ' ').$replace ('&', ' ') + "/>\n");
this.output ("<meta name='description' content='Jmol rendering'/>\n");
this.output ("<meta name='creator' content=' '/>\n");
this.output ("<meta name='created' content='" + this.getExportDate () + "'/>\n");
this.output ("<meta name='generator' content='Jmol " + JV.Viewer.getJmolVersion () + ", http://www.jmol.org'/>\n");
this.output ("<meta name='license' content='http://www.gnu.org/licenses/licenses.html#LGPL'/>\n");
this.output ("</head>\n");
this.output ("<Scene>\n");
this.output ("<NavigationInfo type='EXAMINE'/>\n");
this.output ("<Background skyColor='" + this.rgbFractionalFromColix (this.backgroundColix) + "'/>\n");
var angle = this.getViewpoint ();
this.output ("<Viewpoint fieldOfView='" + angle);
this.output ("' position='");
this.cameraPosition.z *= this.exportScale;
this.output (this.cameraPosition);
this.output ("' orientation='");
this.output (this.tempP1);
this.output (" " + -this.viewpoint.angle + "'\n jump='true' description='v1'/>\n");
this.output ("\n  <!-- \n");
this.output (this.getJmolPerspective ());
this.output ("\n  -->\n\n");
this.commentChar = null;
this.outputInitialTransform ();
});
Clazz.overrideMethod (c$, "outputAttrPt", 
function (attr, pt) {
this.output (" " + attr + "='" + pt.x + " " + pt.y + " " + pt.z + "'");
}, "~S,JU.T3");
Clazz.overrideMethod (c$, "pushMatrix", 
function () {
this.output ("<Transform ");
});
Clazz.overrideMethod (c$, "popMatrix", 
function () {
this.output ("</Transform>\n");
});
Clazz.overrideMethod (c$, "outputAttr", 
function (attr, x, y, z) {
this.output (" " + attr + "='" + J["export"].___Exporter.round (x) + " " + J["export"].___Exporter.round (y) + " " + J["export"].___Exporter.round (z) + "'");
}, "~S,~N,~N,~N");
Clazz.overrideMethod (c$, "outputRotation", 
function (a) {
this.output (" rotation='" + a.x + " " + a.y + " " + a.z + " " + a.angle + "'");
}, "JU.A4");
Clazz.overrideMethod (c$, "outputFooter", 
function () {
this.useTable = null;
this.popMatrix ();
this.popMatrix ();
this.output ("</Scene>\n");
this.output ("</X3D>\n");
});
Clazz.overrideMethod (c$, "outputAppearance", 
function (colix, isText) {
var def = this.getDef ((isText ? "T" : "") + colix);
this.output ("<Appearance ");
if (def.charAt (0) == '_') {
var color = this.rgbFractionalFromColix (colix);
this.output ("DEF='" + def + "'><Material diffuseColor='");
if (isText) this.output ("0 0 0' specularColor='0 0 0' ambientIntensity='0.0' shininess='0.0' emissiveColor='" + color + "'/>");
 else this.output (color + "' transparency='" + J["export"].___Exporter.translucencyFractionalFromColix (colix) + "'/>");
} else this.output (def + ">");
this.output ("</Appearance>");
}, "~N,~B");
Clazz.overrideMethod (c$, "outputChildShapeStart", 
function () {
this.outputShapeStart ();
});
Clazz.overrideMethod (c$, "outputShapeStart", 
function () {
this.output ("<Shape>");
this.outputFaceSetStart ();
});
Clazz.overrideMethod (c$, "outputChildStart", 
function () {
});
Clazz.overrideMethod (c$, "outputChildClose", 
function () {
});
Clazz.overrideMethod (c$, "outputDefChildFaceSet", 
function (child) {
if (child != null) this.output ("DEF='" + child + "'");
}, "~S");
Clazz.overrideMethod (c$, "outputFaceSetStart", 
function () {
this.output ("<IndexedFaceSet ");
});
Clazz.overrideMethod (c$, "outputFaceSetClose", 
function () {
this.output ("</IndexedFaceSet>\n");
});
Clazz.overrideMethod (c$, "outputUseChildClose", 
function (child) {
this.output (child + "/>");
}, "~S");
Clazz.overrideMethod (c$, "outputChildShapeClose", 
function () {
this.outputShapeClose ();
});
Clazz.overrideMethod (c$, "outputShapeClose", 
function () {
this.output ("</Shape>\n");
});
Clazz.overrideMethod (c$, "outputCloseTag", 
function () {
this.output (">\n");
});
Clazz.overrideMethod (c$, "outputTriangle", 
function (pt1, pt2, pt3, colix) {
this.output ("<Shape>\n");
this.output ("<IndexedFaceSet solid='false' ");
this.output ("coordIndex='0 1 2 -1'>");
this.output ("<Coordinate point='");
this.output (pt1);
this.output (" ");
this.output (pt2);
this.output (" ");
this.output (pt3);
this.output ("'/>");
this.output ("</IndexedFaceSet>\n");
this.outputAppearance (colix, false);
this.output ("\n</Shape>\n");
}, "JU.T3,JU.T3,JU.T3,~N");
Clazz.overrideMethod (c$, "outputCircle", 
function (pt1, pt2, radius, colix, doFill) {
if (doFill) {
this.pushMatrix ();
this.output ("translation='");
this.tempV1.ave (this.tempP3, pt1);
this.output (this.tempV1);
this.output ("'><Billboard axisOfRotation='0 0 0'>");
this.pushMatrix ();
this.output ("rotation='1 0 0 1.5708'");
var height = pt1.distance (pt2);
this.outputAttr ("scale", radius, height, radius);
this.output (">");
this.outputCylinderChildScaled (colix, 2);
this.popMatrix ();
this.output ("</Billboard>");
this.popMatrix ();
return;
}var child = this.getDef ("C" + colix + "_" + radius);
this.pushMatrix ();
this.outputTransRot (this.tempP3, pt1, 0, 0, 1);
this.tempP3.set (1, 1, 1);
this.tempP3.scale (radius);
this.outputAttr ("scale", this.tempP3.x, this.tempP3.y, this.tempP3.z);
this.output (">\n<Billboard ");
if (child.charAt (0) == '_') {
this.output ("DEF='" + child + "'");
this.output (" axisOfRotation='0 0 0'>");
this.pushMatrix ();
this.output ("<Shape><Extrusion beginCap='false' convex='false' endCap='false' creaseAngle='1.57'");
this.output (" crossSection='");
var rpd = 0.017453292;
var scale = 0.02 / radius;
for (var i = 0; i <= 360; i += 10) {
this.output (J["export"].___Exporter.round (Math.cos (i * rpd) * scale) + " ");
this.output (J["export"].___Exporter.round (Math.sin (i * rpd) * scale) + " ");
}
this.output ("' spine='");
for (var i = 0; i <= 360; i += 10) {
this.output (J["export"].___Exporter.round (Math.cos (i * rpd)) + " ");
this.output (J["export"].___Exporter.round (Math.sin (i * rpd)) + " 0 ");
}
this.output ("'/>");
this.outputAppearance (colix, false);
this.output ("</Shape>");
this.popMatrix ();
} else {
this.output (child + ">");
}this.output ("</Billboard>\n");
this.popMatrix ();
}, "JU.P3,JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputGeometry", 
function (vertices, normals, colixes, indices, polygonColixes, nVertices, nPolygons, bsPolygons, faceVertexMax, colorList, htColixes, offset) {
this.output (" creaseAngle='0.5'\n");
if (polygonColixes != null) this.output (" colorPerVertex='false'\n");
this.output ("coordIndex='\n");
var map =  Clazz.newIntArray (nVertices, 0);
this.getCoordinateMap (vertices, map, null);
this.outputIndices (indices, map, nPolygons, bsPolygons, faceVertexMax);
this.output ("'\n");
var vNormals = null;
if (normals != null) {
vNormals =  new JU.Lst ();
map = this.getNormalMap (normals, nVertices, null, vNormals);
this.output ("  solid='false'\n  normalPerVertex='true'\n  normalIndex='\n");
this.outputIndices (indices, map, nPolygons, bsPolygons, faceVertexMax);
this.output ("'\n");
}map = null;
if (colorList != null) {
this.output ("  colorIndex='\n");
this.outputColorIndices (indices, nPolygons, bsPolygons, faceVertexMax, htColixes, colixes, polygonColixes);
this.output ("'\n");
}this.output (">\n");
this.output ("<Coordinate point='\n");
this.outputVertices (vertices, nVertices, offset);
this.output ("'/>\n");
if (normals != null) {
this.output ("<Normal vector='\n");
this.outputNormals (vNormals);
vNormals = null;
this.output ("'/>\n");
}if (colorList != null) {
this.output ("<Color color='\n");
this.outputColors (colorList);
this.output ("'/>\n");
}}, "~A,~A,~A,~A,~A,~N,~N,JU.BS,~N,JU.Lst,java.util.Map,JU.P3");
Clazz.overrideMethod (c$, "outputTextPixel", 
function (pt, argb) {
}, "JU.P3,~N");
Clazz.overrideMethod (c$, "plotText", 
function (x, y, z, colix, text, font3d) {
}, "~N,~N,~N,~N,~S,JU.Font");
});
