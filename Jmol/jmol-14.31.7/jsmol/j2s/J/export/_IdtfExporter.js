Clazz.declarePackage ("J.export");
Clazz.load (["J.export.__CartesianExporter", "java.util.Hashtable", "JU.AU", "$.M4", "$.P3", "$.SB"], "J.export._IdtfExporter", ["java.lang.Boolean", "JU.Lst", "$.Quat", "JU.C", "$.Geodesic", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.haveSphere = false;
this.haveCylinder = false;
this.haveCylinderIn = false;
this.haveCone = false;
this.haveCircle = false;
this.ptMin = null;
this.ptMax = null;
this.iObj = 0;
this.htDefs = null;
this.m = null;
this.models = null;
this.resources = null;
this.modifiers = null;
this.htNodes = null;
this.cylinderMatrix = null;
this.sbTemp = null;
this.triangleFace = null;
Clazz.instantialize (this, arguments);
}, J["export"], "_IdtfExporter", J["export"].__CartesianExporter);
Clazz.prepareFields (c$, function () {
this.ptMin = JU.P3.new3 (1e10, 1e10, 1e10);
this.ptMax = JU.P3.new3 (-1.0E10, -1.0E10, -1.0E10);
this.htDefs =  new java.util.Hashtable ();
this.m =  new JU.M4 ();
this.models =  new JU.SB ();
this.resources =  new JU.SB ();
this.modifiers =  new JU.SB ();
this.htNodes =  new java.util.Hashtable ();
this.cylinderMatrix =  new JU.M4 ();
this.triangleFace = JU.AU.newInt2 (1);
{
this.triangleFace[0] =  Clazz.newIntArray (-1, [0, 1, 2]);
}});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J["export"]._IdtfExporter, []);
this.commentChar = "% ";
});
Clazz.defineMethod (c$, "output", 
function (pt) {
this.output (pt, this.sbTemp, true);
}, "JU.T3");
Clazz.defineMethod (c$, "output", 
 function (pt, sb, checkpt) {
if (checkpt) this.checkPoint (pt);
sb.append (J["export"].___Exporter.round (pt.x)).append (" ").append (J["export"].___Exporter.round (pt.y)).append (" ").append (J["export"].___Exporter.round (pt.z)).append (" ");
}, "JU.T3,JU.SB,~B");
Clazz.defineMethod (c$, "checkPoint", 
 function (pt) {
if (pt.x < this.ptMin.x) this.ptMin.x = pt.x;
if (pt.y < this.ptMin.y) this.ptMin.y = pt.y;
if (pt.z < this.ptMin.z) this.ptMin.z = pt.z;
if (pt.x > this.ptMax.x) this.ptMax.x = pt.x;
if (pt.y > this.ptMax.y) this.ptMax.y = pt.y;
if (pt.z > this.ptMax.z) this.ptMax.z = pt.z;
}, "JU.T3");
Clazz.overrideMethod (c$, "outputHeader", 
function () {
this.output ("FILE_FORMAT \"IDTF\"\nFORMAT_VERSION 100\n");
this.m.setIdentity ();
this.m.setToM3 (this.tm.matrixRotate);
this.m.rotate2 (this.referenceCenter, this.tempP1);
this.m.m03 = -this.tempP1.x;
this.m.m13 = -this.tempP1.y;
this.m.m23 = -this.tempP1.z;
this.m.m33 = 1;
this.output ("NODE \"GROUP\" {\n");
this.output ("NODE_NAME \"Jmol\"\n");
this.output ("PARENT_LIST {\nPARENT_COUNT 1\n");
this.output ("PARENT 0 {\n");
this.output (this.getParentItem ("", this.m));
this.output ("}}}\n");
});
Clazz.overrideMethod (c$, "finalizeOutput", 
function () {
this.finalizeOutput2 ();
return this.getAuxiliaryFileData ();
});
Clazz.defineMethod (c$, "getAuxiliaryFileData", 
 function () {
var fName = this.fileName.substring (this.fileName.lastIndexOf ("/") + 1);
fName = fName.substring (fName.lastIndexOf ("\\") + 1);
var name = fName + ".";
name = name.substring (0, name.indexOf ("."));
return "% Created by: Jmol " + JV.Viewer.getJmolVersion () + "\n% Creation date: " + this.getExportDate () + "\n% File created: " + this.fileName + " (" + this.getByteCount () + " bytes)\n\n" + "\n\\documentclass[12pt,letter]{article}" + "\n\\usepackage{hyperref}" + "\n\\usepackage{media9}" + "\n\\usepackage{verbatim}" + "\n\\pagestyle{empty}" + "\n\\begin{document}" + "\n    \\begin{center}" + "\n        \\addmediapath{./} % here you can set the path where is been saved the u3d file" + "\n        \\includemedia[" + "\n            label=" + name + "," + "\n            width=0.9\\textwidth," + "\n            height=0.9\\textheight," + "\n            activate=pageopen," + "\n            deactivate=pageclose," + "\n            3Dtoolbar=false," + "\n            3Dnavpane=false," + "\n            3Dmenu," + "\n            3Droo=" + this.cameraDistance + "," + "\n            3Dcoo= 0.0 0.0 0.0," + "\n            3Dc2c=0.0 0.0 1.0," + "\n            3Daac=" + this.apertureAngle + "," + "\n            3Droll=0.0," + "\n            3Dbg=" + this.rgbFractionalFromColix (this.backgroundColix) + ", % to set the background color for 3D vwr; white = 1 1 1; so, you need to do the proportion: '255:1=[RGB]:x'" + "\n            transparent=false," + "\n            3Dlights=Headlamp," + "\n            3Drender=Solid," + "\n            3Dpartsattrs=restore," + "\n        ]{}{" + name + ".u3d}" + "\n%  \\\\" + "\n%\\movieref[3Dcalculate]{" + name + "}{Click here!}" + "\n\\end{center}" + "\n\\end{document}" + "\n\\begin{comment}" + this.vwr.getWrappedStateScript () + "\n\\end{comment}";
});
Clazz.defineMethod (c$, "getParentItem", 
 function (name, m) {
var sb =  new JU.SB ();
sb.append ("PARENT_NAME \"" + name + "\"\n");
sb.append ("PARENT_TM {\n");
sb.append (m.m00 + " " + m.m10 + " " + m.m20 + " 0.0\n");
sb.append (m.m01 + " " + m.m11 + " " + m.m21 + " 0.0\n");
sb.append (m.m02 + " " + m.m12 + " " + m.m22 + " 0.0\n");
sb.append (m.m03 + " " + m.m13 + " " + m.m23 + " " + m.m33 + "\n");
sb.append ("}\n");
return sb.toString ();
}, "~S,JU.M4");
Clazz.defineMethod (c$, "addColix", 
 function (colix, haveColors) {
var key = "_" + colix;
if (this.htDefs.containsKey (key)) return;
var color = (haveColors ? "1.0 1.0 1.0" : this.rgbFractionalFromColix (colix));
this.htDefs.put (key, Boolean.TRUE);
this.resources.append ("RESOURCE_LIST \"SHADER\" {\n");
this.resources.append ("RESOURCE_COUNT 1\n");
this.resources.append ("RESOURCE 0 {\n");
this.resources.append ("RESOURCE_NAME \"Shader" + key + "\"\n");
this.resources.append ("ATTRIBUTE_USE_VERTEX_COLOR \"FALSE\"\n");
this.resources.append ("SHADER_MATERIAL_NAME \"Mat" + key + "\"\n");
this.resources.append ("SHADER_ACTIVE_TEXTURE_COUNT 0\n");
this.resources.append ("}}\n");
this.resources.append ("RESOURCE_LIST \"MATERIAL\" {\n");
this.resources.append ("RESOURCE_COUNT 1\n");
this.resources.append ("RESOURCE 0 {\n");
this.resources.append ("RESOURCE_NAME \"Mat" + key + "\"\n");
this.resources.append ("MATERIAL_AMBIENT " + color + "\n");
this.resources.append ("MATERIAL_DIFFUSE " + color + "\n");
this.resources.append ("MATERIAL_SPECULAR 0.0 0.0 0.0\n");
this.resources.append ("MATERIAL_EMISSIVE 0.0 0.0 0.0\n");
this.resources.append ("MATERIAL_REFLECTIVITY 0.00000\n");
this.resources.append ("MATERIAL_OPACITY " + J["export"].___Exporter.opacityFractionalFromColix (colix) + "\n");
this.resources.append ("}}\n");
}, "~N,~B");
Clazz.defineMethod (c$, "addShader", 
 function (key, colix) {
this.modifiers.append ("MODIFIER \"SHADING\" {\n");
this.modifiers.append ("MODIFIER_NAME \"" + key + "\"\n");
this.modifiers.append ("PARAMETERS {\n");
this.modifiers.append ("SHADER_LIST_COUNT 1\n");
this.modifiers.append ("SHADING_GROUP {\n");
this.modifiers.append ("SHADER_LIST 0 {\n");
this.modifiers.append ("SHADER_COUNT 1\n");
this.modifiers.append ("SHADER_NAME_LIST {\n");
this.modifiers.append ("SHADER 0 NAME: \"Shader_" + colix + "\"\n");
this.modifiers.append ("}}}}}\n");
}, "~S,~N");
Clazz.overrideMethod (c$, "outputFooter", 
function () {
this.htDefs = null;
this.outputNodes ();
this.output (this.models.toString ());
this.output (this.resources.toString ());
this.output ("RESOURCE_LIST \"VIEW\" {\n");
this.output ("\tRESOURCE_COUNT 1\n");
this.output ("\tRESOURCE 0 {\n");
this.output ("\t\tRESOURCE_NAME \"View0\"\n");
this.output ("\t\tVIEW_PASS_COUNT 1\n");
this.output ("\t\tVIEW_ROOT_NODE_LIST {\n");
this.output ("\t\t\tROOT_NODE 0 {\n");
this.output ("\t\t\t\tROOT_NODE_NAME \"\"\n");
this.output ("\t\t\t}\n");
this.output ("\t\t}\n");
this.output ("\t}\n");
this.output ("}\n\n");
this.output (this.modifiers.toString ());
});
Clazz.defineMethod (c$, "outputNodes", 
 function () {
for (var entry, $entry = this.htNodes.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var v = entry.getValue ();
this.output ("NODE \"MODEL\" {\n");
this.output ("NODE_NAME \"" + key + "\"\n");
System.out.println ("output idtf " + key);
var n = v.size ();
this.output ("PARENT_LIST {\nPARENT_COUNT " + n + "\n");
for (var i = 0; i < n; i++) {
this.output ("PARENT " + i + " {\n");
this.output (v.get (i));
this.output ("}\n");
}
this.output ("}\n");
var i = key.indexOf ("_");
if (i > 0) {
key = key.substring (0, i);
}if (key.equals ("Ellipse")) {
key = "Circle";
}this.output ("RESOURCE_NAME \"" + key + "_Mesh\"\n}\n");
}
});
Clazz.defineMethod (c$, "outputEllipsoid", 
function (center, points, colix) {
var a = JU.Quat.getQuaternionFrame (center, points[1], points[3]).toAxisAngle4f ();
var sx = points[1].distance (center);
var sy = points[3].distance (center);
var sz = points[5].distance (center);
this.setSphereMatrix (center, sx, sy, sz, a, this.sphereMatrix);
this.outputEllipsoid (center, this.sphereMatrix, colix);
}, "JU.P3,~A,~N");
Clazz.defineMethod (c$, "outputEllipsoid", 
 function (center, sphereMatrix, colix) {
if (!this.haveSphere) {
this.models.append (this.getSphereResource ());
this.haveSphere = true;
}this.checkPoint (center);
this.addColix (colix, false);
var key = "Sphere_" + colix;
var v = this.htNodes.get (key);
if (v == null) {
v =  new JU.Lst ();
this.htNodes.put (key, v);
this.addShader (key, colix);
}v.addLast (this.getParentItem ("Jmol", sphereMatrix));
}, "JU.T3,JU.M4,~N");
Clazz.defineMethod (c$, "getSphereResource", 
 function () {
var sb =  new JU.SB ();
sb.append ("RESOURCE_LIST \"MODEL\" {\n").append ("RESOURCE_COUNT 1\n").append ("RESOURCE 0 {\n").append ("RESOURCE_NAME \"Sphere_Mesh\"\n").append ("MODEL_TYPE \"MESH\"\n").append ("MESH {\n");
var vertexCount = JU.Geodesic.getVertexCount (2);
var f = JU.Geodesic.getFaceVertexes (2);
var nFaces = Clazz.doubleToInt (f.length / 3);
var faces =  Clazz.newIntArray (nFaces, 3, 0);
for (var i = 0, p = 0; i < nFaces; i++) for (var j = 0; j < 3; j++) faces[i][j] = f[p++];


var vertexes =  new Array (vertexCount);
for (var i = 0; i < vertexCount; i++) vertexes[i] = JU.Geodesic.getVertexVector (i);

return this.getMeshData ("Sphere", faces, vertexes, vertexes);
});
Clazz.defineMethod (c$, "getMeshData", 
 function (type, indices, vertexes, normals) {
var nFaces = indices.length;
var vertexCount = vertexes.length;
var normalCount = normals.length;
var sb =  new JU.SB ();
this.getMeshHeader (type, nFaces, vertexCount, normalCount, 0, sb);
var sb1 =  new JU.SB ();
for (var i = 0; i < indices.length; i++) {
sb1.appendI (indices[i][0]).append (" ");
sb1.appendI (indices[i][1]).append (" ");
sb1.appendI (indices[i][2]).append (" ");
}
sb.append ("MESH_FACE_POSITION_LIST { ");
sb.appendSB (sb1);
sb.append ("}\n");
sb.append ("MESH_FACE_NORMAL_LIST { ");
sb.appendSB (sb1);
sb.append ("}\n");
sb.append ("MESH_FACE_SHADING_LIST { ");
for (var i = 0; i < nFaces; i++) sb.append ("0 ");

sb.append ("}\n");
sb.append ("MODEL_POSITION_LIST { ");
for (var i = 0; i < vertexCount; i++) this.output (vertexes[i], sb, false);

sb.append ("}\n");
sb.append ("MODEL_NORMAL_LIST { ");
for (var i = 0; i < normalCount; i++) this.output (normals[i], sb, false);

sb.append ("}\n}}}\n");
return sb.toString ();
}, "~S,~A,~A,~A");
Clazz.defineMethod (c$, "getMeshHeader", 
 function (type, nFaces, vertexCount, normalCount, colorCount, sb) {
sb.append ("RESOURCE_LIST \"MODEL\" {\n").append ("RESOURCE_COUNT 1\n").append ("RESOURCE 0 {\n").append ("RESOURCE_NAME \"").append (type).append ("_Mesh\"\n").append ("MODEL_TYPE \"MESH\"\n").append ("MESH {\n").append ("FACE_COUNT ").appendI (nFaces).append ("\n").append ("MODEL_POSITION_COUNT ").appendI (vertexCount).append ("\n").append ("MODEL_NORMAL_COUNT ").appendI (normalCount).append ("\n").append ("MODEL_DIFFUSE_COLOR_COUNT ").appendI (colorCount).append ("\n").append ("MODEL_SPECULAR_COLOR_COUNT 0\n").append ("MODEL_TEXTURE_COORD_COUNT 0\n").append ("MODEL_BONE_COUNT 0\n").append ("MODEL_SHADING_COUNT 1\n").append ("MODEL_SHADING_DESCRIPTION_LIST {\n").append ("SHADING_DESCRIPTION 0 {\n").append ("TEXTURE_LAYER_COUNT 0\n").append ("SHADER_ID 0\n}}\n");
}, "~S,~N,~N,~N,~N,JU.SB");
Clazz.overrideMethod (c$, "outputCylinder", 
function (ptCenter, pt1, pt2, colix, endcaps, radius, ptX, ptY, checkRadius) {
if (ptX != null) {
if (endcaps == 2) {
this.outputEllipse (ptCenter, pt1, ptX, ptY, colix);
this.tempP3.add2 (ptCenter, ptCenter);
this.tempP3.sub (ptX);
this.outputEllipse (ptCenter, pt2, this.tempP3, ptY, colix);
}} else if (endcaps == 3) {
this.outputSphere (pt1, radius * 1.01, colix, true);
this.outputSphere (pt2, radius * 1.01, colix, true);
} else if (endcaps == 2) {
this.outputCircle (pt1, pt2, colix, radius);
this.outputCircle (pt2, pt1, colix, radius);
}if (!this.haveCylinder) {
this.models.append (this.getCylinderResource (false));
this.haveCylinder = true;
}if (ptX != null && endcaps == 0 && !this.haveCylinderIn) {
this.models.append (this.getCylinderResource (true));
this.haveCylinderIn = true;
}this.checkPoint (pt1);
this.checkPoint (pt2);
this.addColix (colix, false);
var n = (ptX != null && endcaps == 0 ? 2 : 1);
for (var i = 0; i < n; i++) {
var key = "Cylinder" + (i == 0 ? "_" : "In_") + colix;
var v = this.htNodes.get (key);
if (v == null) {
v =  new JU.Lst ();
this.htNodes.put (key, v);
this.addShader (key, colix);
}if (ptX == null) this.cylinderMatrix.setToM3 (this.getRotationMatrix (pt1, pt2, radius));
 else this.cylinderMatrix.setToM3 (this.getRotationMatrix (ptCenter, pt2, radius, ptX, ptY));
this.cylinderMatrix.m03 = pt1.x;
this.cylinderMatrix.m13 = pt1.y;
this.cylinderMatrix.m23 = pt1.z;
this.cylinderMatrix.m33 = 1;
v.addLast (this.getParentItem ("Jmol", this.cylinderMatrix));
radius *= 0.95;
}
return true;
}, "JU.P3,JU.P3,JU.P3,~N,~N,~N,JU.P3,JU.P3,~B");
Clazz.defineMethod (c$, "outputCircle", 
function (pt1, pt2, radius, colix, doFill) {
if (doFill) {
this.outputCircle (pt1, pt2, colix, radius);
return;
}}, "JU.P3,JU.P3,~N,~N,~B");
Clazz.defineMethod (c$, "outputEllipse", 
 function (ptCenter, ptZ, ptX, ptY, colix) {
if (!this.haveCircle) {
this.models.append (this.getCircleResource ());
this.haveCircle = true;
this.cylinderMatrix =  new JU.M4 ();
}this.addColix (colix, false);
var key = "Ellipse_" + colix;
var v = this.htNodes.get (key);
if (v == null) {
v =  new JU.Lst ();
this.htNodes.put (key, v);
this.addShader (key, colix);
}this.checkPoint (ptCenter);
this.cylinderMatrix.setToM3 (this.getRotationMatrix (ptCenter, ptZ, 1, ptX, ptY));
this.cylinderMatrix.m03 = ptZ.x;
this.cylinderMatrix.m13 = ptZ.y;
this.cylinderMatrix.m23 = ptZ.z;
this.cylinderMatrix.m33 = 1;
v.addLast (this.getParentItem ("Jmol", this.cylinderMatrix));
return true;
}, "JU.P3,JU.P3,JU.P3,JU.P3,~N");
Clazz.defineMethod (c$, "outputCircle", 
 function (ptCenter, ptPerp, colix, radius) {
if (!this.haveCircle) {
this.models.append (this.getCircleResource ());
this.haveCircle = true;
this.cylinderMatrix =  new JU.M4 ();
}this.addColix (colix, false);
var key = "Circle_" + colix;
var v = this.htNodes.get (key);
if (v == null) {
v =  new JU.Lst ();
this.htNodes.put (key, v);
this.addShader (key, colix);
}this.checkPoint (ptCenter);
this.cylinderMatrix.setToM3 (this.getRotationMatrix (ptCenter, ptPerp, radius));
this.cylinderMatrix.m03 = ptCenter.x;
this.cylinderMatrix.m13 = ptCenter.y;
this.cylinderMatrix.m23 = ptCenter.z;
this.cylinderMatrix.m33 = 1;
v.addLast (this.getParentItem ("Jmol", this.cylinderMatrix));
}, "JU.P3,JU.P3,~N,~N");
Clazz.defineMethod (c$, "getCylinderResource", 
 function (inSide) {
var ndeg = 10;
var vertexCount = Clazz.doubleToInt (360 / ndeg) * 2;
var n = Clazz.doubleToInt (vertexCount / 2);
var faces = JU.AU.newInt2 (vertexCount);
var fpt = -1;
for (var i = 0; i < n; i++) {
if (inSide) {
faces[++fpt] =  Clazz.newIntArray (-1, [i + n, (i + 1) % n, i]);
faces[++fpt] =  Clazz.newIntArray (-1, [i + n, (i + 1) % n + n, (i + 1) % n]);
} else {
faces[++fpt] =  Clazz.newIntArray (-1, [i, (i + 1) % n, i + n]);
faces[++fpt] =  Clazz.newIntArray (-1, [(i + 1) % n, (i + 1) % n + n, i + n]);
}}
var vertexes =  new Array (vertexCount);
var normals =  new Array (vertexCount);
for (var i = 0; i < n; i++) {
var x = (Math.cos (i * ndeg / 180. * 3.141592653589793));
var y = (Math.sin (i * ndeg / 180. * 3.141592653589793));
vertexes[i] = JU.P3.new3 (x, y, 0);
normals[i] = JU.P3.new3 (x, y, 0);
}
for (var i = 0; i < n; i++) {
var x = (Math.cos ((i + 0.5) * ndeg / 180 * 3.141592653589793));
var y = (Math.sin ((i + 0.5) * ndeg / 180 * 3.141592653589793));
vertexes[i + n] = JU.P3.new3 (x, y, 1);
normals[i + n] = normals[i];
}
if (inSide) for (var i = 0; i < n; i++) normals[i].scale (-1);

return this.getMeshData (inSide ? "CylinderIn" : "Cylinder", faces, vertexes, normals);
}, "~B");
Clazz.overrideMethod (c$, "outputFace", 
function (face, map, faceVertexMax) {
this.sbTemp.append (" " + map[face[0]] + " " + map[face[1]] + " " + map[face[2]]);
if (faceVertexMax == 4 && face.length == 4) {
this.sbTemp.append (" " + map[face[0]] + " " + map[face[2]] + " " + map[face[3]]);
}}, "~A,~A,~N");
Clazz.overrideMethod (c$, "outputSurface", 
function (vertices, normals, colixes, indices, polygonColixes, nVertices, nPolygons, nTriangles, bsPolygons, faceVertexMax, colix, colorList, htColixes, offset) {
this.addColix (colix, polygonColixes != null || colixes != null);
if (polygonColixes != null) {
return;
}var sbFaceCoordIndices = this.sbTemp =  new JU.SB ();
var map =  Clazz.newIntArray (nVertices, 0);
var nCoord = this.getCoordinateMap (vertices, map, null);
this.outputIndices (indices, map, nPolygons, bsPolygons, faceVertexMax);
var sbFaceNormalIndices = this.sbTemp =  new JU.SB ();
var vNormals = null;
if (normals != null) {
vNormals =  new JU.Lst ();
map = this.getNormalMap (normals, nVertices, null, vNormals);
this.outputIndices (indices, map, nPolygons, bsPolygons, faceVertexMax);
}map = null;
var sbColorIndexes =  new JU.SB ();
if (colorList != null) {
var isAll = (bsPolygons == null);
var i0 = (isAll ? nPolygons - 1 : bsPolygons.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsPolygons.nextSetBit (i + 1))) {
sbColorIndexes.append (" " + htColixes.get ("" + colixes[indices[i][0]]) + " " + htColixes.get ("" + colixes[indices[i][1]]) + " " + htColixes.get ("" + colixes[indices[i][2]]));
if (faceVertexMax == 4 && indices[i].length == 4) sbColorIndexes.append (" " + htColixes.get ("" + colixes[indices[i][0]]) + " " + htColixes.get ("" + colixes[indices[i][2]]) + " " + htColixes.get ("" + colixes[indices[i][3]]));
}
}var sbCoords = this.sbTemp =  new JU.SB ();
this.outputVertices (vertices, nVertices, offset);
var sbNormals =  new JU.SB ();
var nNormals = 0;
if (normals != null) {
nNormals = vNormals.size ();
for (var i = 0; i < nNormals; i++) sbNormals.append (vNormals.get (i));

vNormals = null;
}var sbColors =  new JU.SB ();
var nColors = 0;
if (colorList != null) {
nColors = colorList.size ();
for (var i = 0; i < nColors; i++) {
var c = colorList.get (i).shortValue ();
sbColors.append (this.rgbFractionalFromColix (c)).append (" ").append (J["export"].___Exporter.translucencyFractionalFromColix (c)).append (" ");
}
}var key = "mesh" + (++this.iObj);
this.addMeshData (key, nTriangles, nCoord, nNormals, nColors, sbFaceCoordIndices, sbFaceNormalIndices, sbColorIndexes, sbCoords, sbNormals, sbColors);
var v =  new JU.Lst ();
this.htNodes.put (key, v);
this.addShader (key, colix);
this.cylinderMatrix.setIdentity ();
v.addLast (this.getParentItem ("Jmol", this.cylinderMatrix));
}, "~A,~A,~A,~A,~A,~N,~N,~N,JU.BS,~N,~N,JU.Lst,java.util.Map,JU.P3");
Clazz.defineMethod (c$, "addMeshData", 
 function (key, nFaces, nCoord, nNormals, nColors, sbFaceCoordIndices, sbFaceNormalIndices, sbColorIndices, sbCoords, sbNormals, sbColors) {
this.getMeshHeader (key, nFaces, nCoord, nNormals, nColors, this.models);
this.models.append ("MESH_FACE_POSITION_LIST { ").appendSB (sbFaceCoordIndices).append (" }\n").append ("MESH_FACE_NORMAL_LIST { ").appendSB (sbFaceNormalIndices).append (" }\n");
this.models.append ("MESH_FACE_SHADING_LIST { ");
for (var i = 0; i < nFaces; i++) this.models.append ("0 ");

this.models.append ("}\n");
if (nColors > 0) this.models.append ("MESH_FACE_DIFFUSE_COLOR_LIST { ").appendSB (sbColorIndices).append (" }\n");
this.models.append ("MODEL_POSITION_LIST { ").appendSB (sbCoords).append (" }\n").append ("MODEL_NORMAL_LIST { ").appendSB (sbNormals).append (" }\n");
if (nColors > 0) this.models.append ("MODEL_DIFFUSE_COLOR_LIST { ").appendSB (sbColors).append (" }\n");
this.models.append ("}}}\n");
}, "~S,~N,~N,~N,~N,JU.SB,JU.SB,JU.SB,JU.SB,JU.SB,JU.SB");
Clazz.overrideMethod (c$, "outputCone", 
function (ptBase, ptTip, radius, colix) {
if (!this.haveCone) {
this.models.append (this.getConeResource ());
this.haveCone = true;
}this.checkPoint (ptBase);
this.checkPoint (ptTip);
this.addColix (colix, false);
var key = "Cone_" + colix;
var v = this.htNodes.get (key);
if (v == null) {
v =  new JU.Lst ();
this.htNodes.put (key, v);
this.addShader (key, colix);
}this.cylinderMatrix.setToM3 (this.getRotationMatrix (ptBase, ptTip, radius));
this.cylinderMatrix.m03 = ptBase.x;
this.cylinderMatrix.m13 = ptBase.y;
this.cylinderMatrix.m23 = ptBase.z;
this.cylinderMatrix.m33 = 1;
v.addLast (this.getParentItem ("Jmol", this.cylinderMatrix));
}, "JU.P3,JU.P3,~N,~N");
Clazz.defineMethod (c$, "getConeResource", 
 function () {
var m = J["export"].___Exporter.getConeMesh (null, null, 0);
return this.getMeshData ("Cone", m.pis, m.vs, m.vs);
});
Clazz.defineMethod (c$, "getCircleResource", 
 function () {
var ndeg = 10;
var n = Clazz.doubleToInt (360 / ndeg);
var vertexCount = n + 1;
var faces = JU.AU.newInt2 (n);
for (var i = 0; i < n; i++) faces[i] =  Clazz.newIntArray (-1, [i, (i + 1) % n, n]);

var vertexes =  new Array (vertexCount);
var normals =  new Array (vertexCount);
for (var i = 0; i < n; i++) {
var x = (Math.cos (i * ndeg / 180. * 3.141592653589793));
var y = (Math.sin (i * ndeg / 180. * 3.141592653589793));
vertexes[i] = JU.P3.new3 (x, y, 0);
normals[i] = JU.P3.new3 (0, 0, 1);
}
vertexes[n] = JU.P3.new3 (0, 0, 0);
normals[n] = JU.P3.new3 (0, 0, 1);
return this.getMeshData ("Circle", faces, vertexes, normals);
});
Clazz.overrideMethod (c$, "outputSphere", 
function (center, radius, colix, checkRadius) {
this.setSphereMatrix (center, radius, radius, radius, null, this.sphereMatrix);
this.outputEllipsoid (center, this.sphereMatrix, colix);
}, "JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputTextPixel", 
function (pt, argb) {
var colix = JU.C.getColix (argb);
this.outputSphere (pt, 0.02, colix, true);
}, "JU.P3,~N");
Clazz.overrideMethod (c$, "outputTriangle", 
function (pt1, pt2, pt3, colix) {
this.addColix (colix, false);
var key = "T" + (++this.iObj);
this.models.append (this.getTriangleResource (key, pt1, pt2, pt3));
var v =  new JU.Lst ();
this.htNodes.put (key, v);
this.addShader (key, colix);
if (this.cylinderMatrix == null) this.cylinderMatrix =  new JU.M4 ();
this.cylinderMatrix.setIdentity ();
v.addLast (this.getParentItem ("Jmol", this.cylinderMatrix));
}, "JU.T3,JU.T3,JU.T3,~N");
Clazz.defineMethod (c$, "getTriangleResource", 
 function (key, pt1, pt2, pt3) {
var vertexes =  Clazz.newArray (-1, [pt1, pt2, pt3]);
this.tempV1.sub2 (pt3, pt1);
this.tempV2.sub2 (pt2, pt1);
this.tempV2.cross (this.tempV2, this.tempV1);
this.tempV2.normalize ();
var normals =  Clazz.newArray (-1, [this.tempV2, this.tempV2, this.tempV2]);
return this.getMeshData (key, this.triangleFace, vertexes, normals);
}, "~S,JU.T3,JU.T3,JU.T3");
});
