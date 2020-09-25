Clazz.declarePackage ("J.export");
Clazz.load (["J.export.__CartesianExporter", "java.util.HashSet", "JU.P3"], "J.export._ObjExporter", ["java.lang.Short", "java.util.Hashtable", "JU.AU", "$.BS", "$.CU", "$.Lst", "$.M4", "$.PT", "$.Quat", "$.SB", "$.V3", "J.export.MeshData", "JM.Atom", "JU.Escape", "$.Logger", "$.MeshSurface", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.surfacesOnly = false;
this.normalizeUV = true;
this.mtlout = null;
this.objFileRootName = null;
this.nMtlBytes = 0;
this.textures = null;
this.textureFiles = null;
this.sphereNum = 1;
this.cylinderNum = 1;
this.ellipseNum = 1;
this.circleNum = 1;
this.ellipsoidNum = 1;
this.coneNum = 1;
this.triangleNum = 1;
this.surfaceNum = 1;
this.currentVertexOrigin = 1;
this.currentNormalOrigin = 1;
this.currentTextureOrigin = 1;
this.ptTemp = null;
Clazz.instantialize (this, arguments);
}, J["export"], "_ObjExporter", J["export"].__CartesianExporter);
Clazz.prepareFields (c$, function () {
this.textures =  new java.util.HashSet ();
this.ptTemp =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J["export"]._ObjExporter, []);
this.debugPrint ("_WavefrontObjExporter CTOR");
this.commentChar = "# ";
});
Clazz.defineMethod (c$, "debugPrint", 
function (string) {
if (false) {
JU.Logger.debug (string);
}}, "~S");
Clazz.overrideMethod (c$, "outputFace", 
function (face, map, faceVertexMax) {
}, "~A,~A,~N");
Clazz.overrideMethod (c$, "outputCircle", 
function (pt1, pt2, radius, colix, doFill) {
this.debugPrint ("outputCircle");
if (this.surfacesOnly) {
this.debugPrint ("  Not done owing to surfacesOnly");
return;
}if (doFill) {
this.outputCircle1 (pt1, pt2, colix, radius);
}}, "JU.P3,JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCone", 
function (ptBase, ptTip, radius, colix) {
this.debugPrint ("outputCone");
if (this.surfacesOnly) {
this.debugPrint ("  Not done owing to surfacesOnly");
return;
}this.outputCone1 (ptBase, ptTip, radius, colix);
}, "JU.P3,JU.P3,~N,~N");
Clazz.overrideMethod (c$, "outputCylinder", 
function (ptCenter, pt1, pt2, colix, endcaps, radius, ptX, ptY, checkRadius) {
if (false) {
this.debugPrint ("outputCylinder: colix=" + String.format ("%04x", [Short.$valueOf (colix)]));
this.debugPrint ("  ptCenter=" + ptCenter);
this.debugPrint ("  pt1=" + pt1);
this.debugPrint ("  endcaps=" + endcaps + " NONE=" + 0 + " FLAT=" + 2 + " SPHERICAL=" + 3);
this.debugPrint ("  radius=" + radius);
this.debugPrint ("  pt2=" + pt2);
this.debugPrint ("  ptX=" + ptX);
this.debugPrint ("  ptY=" + ptY);
}if (this.surfacesOnly) {
this.debugPrint ("  Not done owing to surfacesOnly");
return true;
}if (ptX != null) {
if (endcaps == 2) {
this.outputEllipse1 (ptCenter, pt1, ptX, ptY, colix);
this.tempP3.add2 (ptCenter, ptCenter);
this.tempP3.sub (ptX);
this.outputEllipse1 (ptCenter, pt2, this.tempP3, ptY, colix);
}} else if (endcaps == 3) {
this.outputSphere (pt1, radius * 1.01, colix, true);
this.outputSphere (pt2, radius * 1.01, colix, true);
} else if (endcaps == 2) {
this.outputCircle1 (pt1, pt2, colix, radius);
this.outputCircle1 (pt2, pt1, colix, radius);
}this.outputCylinder1 (ptCenter, pt1, pt2, colix, endcaps, radius, ptX, ptY);
return true;
}, "JU.P3,JU.P3,JU.P3,~N,~N,~N,JU.P3,JU.P3,~B");
Clazz.overrideMethod (c$, "outputEllipsoid", 
function (center, points, colix) {
if (false) {
this.debugPrint ("outputEllipsoid: colix=" + String.format ("%04x", [Short.$valueOf (colix)]));
this.debugPrint ("  center=" + center);
this.debugPrint ("  points[0]=" + points[0]);
this.debugPrint ("  points[1]=" + points[1]);
this.debugPrint ("  points[2]=" + points[2]);
}if (this.surfacesOnly) {
this.debugPrint ("  Not done owing to surfacesOnly");
return;
}var a = JU.Quat.getQuaternionFrame (center, points[1], points[3]).toAxisAngle4f ();
var sx = points[1].distance (center);
var sy = points[3].distance (center);
var sz = points[5].distance (center);
this.outputEllipsoid1 (center, sx, sy, sz, a, colix);
}, "JU.P3,~A,~N");
Clazz.overrideMethod (c$, "outputSphere", 
function (center, radius, colix, checkRadius) {
if (false) {
this.debugPrint ("outputSphere: colix=" + String.format ("%04x", [Short.$valueOf (colix)]));
this.debugPrint ("  center.getClass().getName()=" + center.getClass ().getName ());
this.debugPrint ("  center=" + center);
this.debugPrint ("  center.x=" + center.x);
this.debugPrint ("  center.y=" + center.y);
this.debugPrint ("  center.z=" + center.z);
this.debugPrint ("  radius=" + radius);
}if (this.surfacesOnly) {
this.debugPrint ("  Not done owing to surfacesOnly");
return;
}this.outputEllipsoid1 (center, radius, radius, radius, null, colix);
}, "JU.P3,~N,~N,~B");
Clazz.overrideMethod (c$, "outputTextPixel", 
function (pt, argb) {
}, "JU.P3,~N");
Clazz.overrideMethod (c$, "outputTriangle", 
function (pt1, pt2, pt3, colix) {
if (this.surfacesOnly) {
return;
}this.outputTriangle1 (pt1, pt2, pt3, colix);
}, "JU.T3,JU.T3,JU.T3,~N");
Clazz.overrideMethod (c$, "outputHeader", 
function () {
this.debugPrint ("outputHeader");
this.output ("#obj Created by Jmol " + JV.Viewer.getJmolVersion () + "\n");
});
Clazz.defineMethod (c$, "output", 
function (pt) {
this.debugPrint ("output");
}, "JU.T3");
Clazz.overrideMethod (c$, "drawSurface", 
function (meshSurface, colix) {
if (JU.Logger.debugging) {
this.debugPrint ("outputSurface");
this.debugPrint ("  nVertices=" + meshSurface.vc);
if (meshSurface.normals == null) {
this.debugPrint ("  no vertex normals");
} else {
this.debugPrint ("  nNormals=" + meshSurface.vc);
}if (meshSurface.vcs == null) {
this.debugPrint ("  no vertex colors");
} else {
this.debugPrint ("  nColixes=" + meshSurface.vc);
}this.debugPrint ("  number of triangles or quads=" + meshSurface.pc);
if (meshSurface.pcs == null) {
this.debugPrint ("  no face colors");
} else {
this.debugPrint ("  nPolygonColixes=" + meshSurface.pc);
}if (meshSurface.bsPolygons == null) {
this.debugPrint ("  all polygons used");
} else {
this.debugPrint ("  number of polygons used=" + meshSurface.bsPolygons.cardinality ());
}this.debugPrint ("  solid color=" + this.gdata.getColorArgbOrGray (colix));
}var bsPolygons = meshSurface.bsPolygons;
var nPolygons = meshSurface.pc;
if (meshSurface.normals != null) meshSurface.normalCount = meshSurface.vc;
var isAll = (bsPolygons == null);
var faces = JU.AU.newInt2 (isAll ? nPolygons : bsPolygons.cardinality ());
var i0 = (isAll ? nPolygons - 1 : bsPolygons.nextSetBit (0));
for (var i = i0, ipt = 0; i >= 0; i = isAll ? i - 1 : bsPolygons.nextSetBit (i + 1)) {
var polygon = meshSurface.pis[i];
faces[ipt++] = (meshSurface.haveQuads ? polygon :  Clazz.newIntArray (-1, [polygon[0], polygon[1], polygon[2]]));
}
var data = JU.MeshSurface.newMesh (false, meshSurface.vs, meshSurface.vc, faces, meshSurface.normals, 0);
data.vcs = meshSurface.vcs;
var name = "Surface" + this.surfaceNum++;
var isSolidColor = (colix != 0);
this.addTexture (colix, isSolidColor ? null : name);
var dim = null;
if (isSolidColor) {
this.debugPrint ("outputSurface: coloring solid");
this.debugPrint ("  Omitting texture map");
} else {
var nFaces = faces.length;
var width = Clazz.doubleToInt (Math.ceil (Math.sqrt (nFaces)));
var height = Clazz.doubleToInt (nFaces / width);
if (nFaces % width != 0) {
height++;
}dim =  Clazz.newIntArray (-1, [width, height]);
this.debugPrint ("  width=" + width + " height=" + height + " size = " + (width * height));
var file = this.createTextureFile (name, data, dim);
if (file == null || file.getByteCount () == 0) {
System.out.println ("Error creating texture file: " + name);
this.textureFiles.addLast ("Error creating texture file: " + name);
return;
}this.textureFiles.addLast (file.getByteCount () + " (" + width + "x" + height + ") " + name);
var shortName = file.getName ();
this.outputMtl (" map_Kd " + shortName + "\n");
this.outputMtl (" map_Ka " + shortName + "\n");
}var matrix = JU.M4.newM4 (null);
matrix.setTranslation (JU.V3.newV (meshSurface.offset));
var bsValid =  new JU.BS ();
this.addMesh (name, data, matrix, null, colix, dim, bsValid);
}, "JU.MeshSurface,~N");
Clazz.overrideMethod (c$, "initializeOutput", 
function (vwr, privateKey, gdata, params) {
this.debugPrint ("initializeOutput: + output");
var retVal = this.initOutput (vwr, privateKey, gdata, params);
if (!retVal) {
this.debugPrint ("End initializeOutput (error in super):");
return false;
}var dot = this.fileName.lastIndexOf (".");
if (dot < 0) {
this.debugPrint ("End initializeOutput (Error creating .mtl file):");
return false;
}this.objFileRootName = this.fileName.substring (0, dot);
try {
var mtlFileName = this.objFileRootName + ".mtl";
this.mtlout = vwr.openExportChannel (privateKey, mtlFileName, true);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.debugPrint ("End initializeOutput (" + ex.getMessage () + "):");
return false;
} else {
throw ex;
}
}
this.outputMtl ("# Created by Jmol " + JV.Viewer.getJmolVersion () + "\n");
this.output ("\nmtllib " + this.mtlout.getName () + "\n");
this.textureFiles =  new JU.Lst ();
this.debugPrint ("End initializeOutput:");
return true;
}, "JV.Viewer,~N,JU.GData,java.util.Map");
Clazz.overrideMethod (c$, "finalizeOutput", 
function () {
this.debugPrint ("finalizeOutput");
var retVal = this.finalizeOutput2 ();
var ret = this.mtlout.closeChannel ();
if (ret != null) {
JU.Logger.info (ret);
ret = "ERROR EXPORTING MTL FILE: " + ret;
if (retVal.startsWith ("OK")) return ret;
return retVal + " and " + ret;
}retVal += ", " + this.nMtlBytes + " " + this.mtlout.getFileName ();
for (var string, $string = this.textureFiles.iterator (); $string.hasNext () && ((string = $string.next ()) || true);) {
retVal += ", " + string;
}
this.debugPrint (retVal);
this.debugPrint ("End finalizeOutput:");
return retVal;
});
Clazz.defineMethod (c$, "outputMtl", 
 function (data) {
this.nMtlBytes += data.length;
this.mtlout.append (data);
}, "~S");
Clazz.defineMethod (c$, "getTextureName", 
 function (colix) {
return "k" + JU.Escape.getHexColorFromRGB (this.gdata.getColorArgbOrGray (colix));
}, "~N");
Clazz.defineMethod (c$, "outputCircle1", 
 function (ptCenter, ptPerp, colix, radius) {
var data = J["export"].MeshData.getCircleData ();
var matrix =  new JU.M4 ();
this.addTexture (colix, null);
var name = "Circle" + this.circleNum++;
matrix.setToM3 (this.getRotationMatrix (ptCenter, ptPerp, radius));
matrix.m03 = ptCenter.x;
matrix.m13 = ptCenter.y;
matrix.m23 = ptCenter.z;
matrix.m33 = 1;
this.addMesh (name, data, matrix, matrix, colix, null, null);
}, "JU.P3,JU.P3,~N,~N");
Clazz.defineMethod (c$, "outputCone1", 
 function (ptBase, ptTip, radius, colix) {
var data = J["export"].MeshData.getConeData ();
var matrix =  new JU.M4 ();
this.addTexture (colix, null);
var name = "Cone" + this.coneNum++;
matrix.setToM3 (this.getRotationMatrix (ptBase, ptTip, radius));
matrix.m03 = ptBase.x;
matrix.m13 = ptBase.y;
matrix.m23 = ptBase.z;
matrix.m33 = 1;
this.addMesh (name, data, matrix, matrix, colix, null, null);
}, "JU.P3,JU.P3,~N,~N");
Clazz.defineMethod (c$, "outputEllipse1", 
 function (ptCenter, ptZ, ptX, ptY, colix) {
var data = J["export"].MeshData.getCircleData ();
var matrix =  new JU.M4 ();
this.addTexture (colix, null);
var name = "Ellipse" + this.ellipseNum++;
matrix.setToM3 (this.getRotationMatrix (ptCenter, ptZ, 1, ptX, ptY));
matrix.m03 = ptZ.x;
matrix.m13 = ptZ.y;
matrix.m23 = ptZ.z;
matrix.m33 = 1;
this.addMesh (name, data, matrix, matrix, colix, null, null);
return true;
}, "JU.P3,JU.P3,JU.P3,JU.P3,~N");
Clazz.defineMethod (c$, "outputEllipsoid1", 
 function (center, rx, ry, rz, a, colix) {
var data = JU.MeshSurface.getSphereData (3);
this.addTexture (colix, null);
var name;
if (Clazz.instanceOf (center, JM.Atom)) {
var atom = center;
name = JU.PT.replaceAllCharacters (atom.getAtomName (), " \t", "") + "_Atom";
} else if (rx == ry && rx == rz) {
name = "Sphere" + this.sphereNum++;
} else {
name = "Ellipsoid" + this.ellipsoidNum++;
}this.setSphereMatrix (center, rx, ry, rz, a, this.sphereMatrix);
this.addMesh (name, data, this.sphereMatrix, this.sphereMatrix, colix, null, null);
}, "JU.T3,~N,~N,~N,JU.A4,~N");
Clazz.defineMethod (c$, "outputCylinder1", 
 function (ptCenter, pt1, pt2, colix, endcaps, radius, ptX, ptY) {
var data = J["export"].MeshData.getCylinderData (false);
var matrix =  new JU.M4 ();
this.addTexture (colix, null);
var name = "Cylinder" + this.cylinderNum++;
var n = (ptX != null && endcaps == 0 ? 2 : 1);
for (var i = 0; i < n; i++) {
if (ptX == null) matrix.setToM3 (this.getRotationMatrix (pt1, pt2, radius));
 else matrix.setToM3 (this.getRotationMatrix (ptCenter, pt2, radius, ptX, ptY));
matrix.m03 = pt1.x;
matrix.m13 = pt1.y;
matrix.m23 = pt1.z;
matrix.m33 = 1;
}
this.addMesh (name, data, matrix, matrix, colix, null, null);
}, "JU.P3,JU.P3,JU.P3,~N,~N,~N,JU.P3,JU.P3");
Clazz.defineMethod (c$, "outputTriangle1", 
 function (pt1, pt2, pt3, colix) {
var data = J["export"].MeshData.getTriangleData (pt1, pt2, pt3);
this.addTexture (colix, null);
var name = "Triangle" + this.triangleNum++;
var matrix = JU.M4.newM4 (null);
this.addMesh (name, data, matrix, matrix, colix, null, null);
}, "JU.T3,JU.T3,JU.T3,~N");
Clazz.defineMethod (c$, "addTexture", 
 function (colix, name) {
var scolix = Short.$valueOf (colix);
if (name == null && this.textures.contains (scolix)) {
return;
}this.textures.add (scolix);
var sb =  new JU.SB ();
sb.append ("\nnewmtl " + (name == null ? this.getTextureName (colix) : name) + "\n");
sb.append (" Ns 163\n");
sb.append (" Tr " + J["export"].___Exporter.opacityFractionalFromColix (colix) + "\n");
sb.append (" Ni 0.001\n");
sb.append (" illum 2\n");
sb.append (" Ka 0.20 0.20 0.20\n");
sb.append (" Kd " + this.rgbFractionalFromColix (colix) + "\n");
sb.append (" Ks 0.25 0.25 0.25\n");
this.outputMtl (sb.toString ());
}, "~N,~S");
Clazz.defineMethod (c$, "addMesh", 
 function (name, data, matrix, matrix1, colix, dim, bsValid) {
if (this.surfacesOnly) {
if (name == null || !name.startsWith ("Surface")) {
return;
}}this.output ("\ng " + name + "\n");
this.output ("usemtl " + (dim == null ? this.getTextureName (colix) : name) + "\n");
var faces = data.getFaces ();
var nFaces = faces.length;
if (bsValid != null) for (var face, $face = 0, $$face = faces; $face < $$face.length && ((face = $$face[$face]) || true); $face++) for (var i, $i = 0, $$i = face; $i < $$i.length && ((i = $$i[$i]) || true); $i++) bsValid.set (i);


var vertices = data.getVertices ();
var nVertices = data.vc;
var map =  Clazz.newIntArray (nVertices, 0);
var nCoord = this.getCoordinateMap (vertices, map, bsValid);
this.output ("# Number of vertices: " + nCoord + "\n");
this.outputList (vertices, nVertices, matrix, "v ", bsValid);
nVertices = nCoord;
var normals = data.normals;
var nNormals = data.normalCount;
var map2 = null;
var vNormals = null;
if (normals != null) {
vNormals =  new JU.Lst ();
map2 = this.getNormalMap (normals, nNormals, bsValid, vNormals);
nNormals = vNormals.size ();
this.output ("# Number of normals: " + nNormals + "\n");
for (var i = 0; i < nNormals; i++) this.output ("vn " + vNormals.get (i));

}if (dim != null) {
this.output ("# Number of texture coordinates: " + nFaces + "\n");
var width = dim[0];
var height = dim[1];
var u;
var v;
for (var row = 0, iFace = 0; row < height; row++) {
v = row + .5;
if (this.normalizeUV) v /= height;
for (var col = 0; col < width; col++) {
u = col + .5;
if (this.normalizeUV) u /= width;
this.output ("vt " + u + " " + v + "\n");
if (++iFace == nFaces) break;
}
}
if (!this.normalizeUV) {
this.output ("vt 0.0 0.0\n");
this.output ("vt " + width + " " + height + "\n");
}}this.output ("# Number of faces: " + nFaces + "\n");
for (var i = 0; i < nFaces; i++) if (dim != null) this.outputFace2 (faces[i], i, map, map2);
 else this.outputFace1 (faces[i], map, map2);

if (dim != null) this.currentTextureOrigin += nFaces;
this.currentVertexOrigin += nVertices;
this.currentNormalOrigin += nNormals;
}, "~S,JU.MeshSurface,JU.M4,JU.M4,~N,~A,JU.BS");
Clazz.defineMethod (c$, "outputList", 
 function (pts, nPts, m, prefix, bsValid) {
for (var i = 0; i < nPts; i++) {
if (bsValid != null && !bsValid.get (i)) continue;
this.ptTemp.setT (pts[i]);
if (m != null) m.rotTrans (this.ptTemp);
this.output (prefix + this.ptTemp.x + " " + this.ptTemp.y + " " + this.ptTemp.z + "\n");
}
}, "~A,~N,JU.M4,~S,JU.BS");
Clazz.defineMethod (c$, "outputFace1", 
 function (face, map, map2) {
this.output ("f");
for (var i, $i = 0, $$i = face; $i < $$i.length && ((i = $$i[$i]) || true); $i++) this.output (" " + ((map == null ? i : map[i]) + this.currentVertexOrigin) + "//" + ((map2 == null ? i : map2[i]) + this.currentNormalOrigin));

this.output ("\n");
}, "~A,~A,~A");
Clazz.defineMethod (c$, "outputFace2", 
 function (face, vt, map, map2) {
this.output ("f");
for (var i, $i = 0, $$i = face; $i < $$i.length && ((i = $$i[$i]) || true); $i++) {
this.output (" " + ((map == null ? i : map[i]) + this.currentVertexOrigin) + "/" + (this.currentTextureOrigin + vt) + "/" + ((map2 == null ? i : map2[i]) + this.currentNormalOrigin));
}
this.output ("\n");
}, "~A,~N,~A,~A");
Clazz.defineMethod (c$, "createTextureFile", 
 function (name, data, dim) {
this.debugPrint ("createTextureFile: " + name);
var colixes = (data.pcs == null ? data.vcs : data.pcs);
if (colixes == null || colixes.length == 0) {
this.debugPrint ("createTextureFile: Array problem");
this.debugPrint ("  colixes=" + colixes + " data=" + data);
if (colixes != null) {
this.debugPrint ("  colixes.length=" + colixes.length);
}return null;
}var nUsed = data.pis.length;
if (nUsed <= 0) {
this.debugPrint ("createTextureFile: nFaces = 0");
return null;
}var width = dim[0];
var height = dim[1];
var textureType = "png";
var row = height - 1;
var col = 0;
var sum =  new JU.P3 ();
var w = width * 3;
var h = height * 3;
var bytes = (textureType.equals ("tga") ?  Clazz.newByteArray (h, w * 3, 0) : null);
var rgbbuf = (bytes == null ?  Clazz.newIntArray (h * w, 0) : null);
var ptTemp =  new JU.P3 ();
for (var i = 0; i < data.pis.length; i++) {
var rgb;
if (data.pcs == null) {
var face = data.pis[i];
sum.set (0, 0, 0);
for (var iVertex, $iVertex = 0, $$iVertex = face; $iVertex < $$iVertex.length && ((iVertex = $$iVertex[$iVertex]) || true); $iVertex++) sum.add (JU.CU.colorPtFromInt (this.gdata.getColorArgbOrGray (colixes[iVertex]), ptTemp));

sum.scale (1.0 / face.length);
rgb = JU.CU.colorPtToFFRGB (sum);
} else {
rgb = this.gdata.getColorArgbOrGray (colixes[i]);
}if (bytes == null) {
for (var j = 0; j < 3; j++) for (var k = 0; k < 3; k++) rgbbuf[(row * 3 + k) * w + col * 3 + j] = rgb;


} else {
}if ((col = (col + 1) % width) == 0) row--;
}
try {
var params =  new java.util.Hashtable ();
var fname = this.fileName;
if (rgbbuf != null) {
params.put ("rgbbuf", rgbbuf);
params.put ("fileName", this.objFileRootName + "_" + name + "." + textureType);
params.put ("type", textureType);
params.put ("width", Integer.$valueOf (w));
params.put ("height", Integer.$valueOf (h));
fname = this.fileName = this.vwr.outputToFile (params);
}this.debugPrint ("End createTextureFile: " + fname);
return params.get ("outputChannel");
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.debugPrint ("End createTextureFile (" + ex.getMessage () + "):");
return null;
} else {
throw ex;
}
}
}, "~S,JU.MeshSurface,~A");
Clazz.defineStatics (c$,
"debug", false);
});
