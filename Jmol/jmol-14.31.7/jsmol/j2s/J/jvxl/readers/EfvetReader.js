Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.PolygonFileReader"], "J.jvxl.readers.EfvetReader", ["JU.CU", "$.P3", "J.jvxl.data.JvxlCoder", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vertexMap = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "EfvetReader", J.jvxl.readers.PolygonFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.EfvetReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2PFR (sg, br);
this.jvxlFileHeaderBuffer.append ("efvet file format\nvertices and triangles only\n");
J.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
this.hasColorData = true;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "getSurfaceData", 
function () {
this.getHeader ();
this.getVertices ();
this.getTriangles ();
JU.Logger.info ("efvet file contains " + this.nVertices + " vertices and " + this.nTriangles + " triangles");
});
Clazz.defineMethod (c$, "getHeader", 
 function () {
this.skipTo ("<efvet", null);
while (this.rd ().length > 0 && this.line.indexOf (">") < 0) this.jvxlFileHeaderBuffer.append ("# " + this.line + "\n");

JU.Logger.info (this.jvxlFileHeaderBuffer.toString ());
});
Clazz.defineMethod (c$, "getVertices", 
 function () {
var pt =  new JU.P3 ();
var value = 0;
this.skipTo ("<vertices", "count");
this.jvxlData.vertexCount = this.nVertices = this.parseInt ();
this.vertexMap =  Clazz.newIntArray (this.nVertices + 1, 0);
this.jvxlData.vertexColors = null;
if (this.params.fileIndex == 0) {
this.jvxlData.vertexColors =  Clazz.newIntArray (this.nVertices, 0);
this.jvxlData.nVertexColors = 0;
}var values =  Clazz.newFloatArray (this.jvxlData.vertexColors == null ? 3 : 9, 0);
this.skipTo ("property=", null);
this.line = this.line.$replace ('"', ' ');
var tokens = this.getTokens ();
var dataIndex = this.params.fileIndex;
if (dataIndex > 0 && dataIndex < tokens.length) JU.Logger.info ("property " + tokens[dataIndex]);
 else JU.Logger.info (this.line);
for (var i = 0; i < this.nVertices; i++) {
this.skipTo ("<vertex", "image");
this.parseFloatArray (values, null, ">");
pt.set (values[0], values[1], values[2]);
this.skipTo (null, "property");
for (var j = 0; j < dataIndex; j++) value = this.parseFloat ();

if (this.isAnisotropic) this.setVertexAnisotropy (pt);
var v = this.vertexMap[i + 1] = this.addVC (pt, value, i, true);
if (v >= 0 && this.jvxlData.vertexColors != null) {
this.jvxlData.vertexColors[v] = JU.CU.colorTriadToFFRGB (values[6], values[7], values[8]);
this.jvxlData.nVertexColors++;
}}
});
Clazz.defineMethod (c$, "getTriangles", 
 function () {
this.skipTo ("<triangle_array", "count");
this.nTriangles = this.parseInt ();
for (var i = 0; i < this.nTriangles; i++) {
this.skipTo ("<triangle", "vertex");
var a = this.getInt ();
var b = this.getInt ();
var c = this.getInt ();
if (a >= 0 && b >= 0 && c >= 0) this.addTriangleCheck (a, b, c, 7, 0, false, 0);
}
});
Clazz.defineMethod (c$, "getInt", 
 function () {
return this.vertexMap[this.parseInt ()];
});
});
