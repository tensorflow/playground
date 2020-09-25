Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.PolygonFileReader"], "J.jvxl.readers.Ras3DReader", ["java.util.Hashtable", "JU.CU", "$.P3", "J.jvxl.data.JvxlCoder", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pmeshError = null;
this.type = null;
this.asQuads = false;
this.nPolygons = 0;
this.htVertices = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "Ras3DReader", J.jvxl.readers.PolygonFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.Ras3DReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2PR (sg, br);
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "init2PR", 
function (sg, br) {
this.init2PFR (sg, br);
var fileName = (sg.getReaderData ())[0];
if (fileName == null) return;
this.type = "ras3d";
this.setHeader ();
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "setHeader", 
function () {
this.jvxlFileHeaderBuffer.append (this.type + " file format\nvertices and triangles only\n");
J.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
});
Clazz.overrideMethod (c$, "getSurfaceData", 
function () {
if (this.readVerticesAndPolygons ()) JU.Logger.info (this.type + " file contains " + this.nVertices + " vertices and " + this.nPolygons + " polygons for " + this.nTriangles + " triangles");
 else JU.Logger.error (this.params.fileName + ": " + (this.pmeshError == null ? "Error reading pmesh data " : this.pmeshError));
});
Clazz.defineMethod (c$, "readVerticesAndPolygons", 
function () {
try {
if (this.readVertices ()) return true;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (this.pmeshError == null) this.pmeshError = this.type + " ERROR: " + e;
} else {
throw e;
}
}
return false;
});
Clazz.defineMethod (c$, "readVertices", 
 function () {
this.htVertices =  new java.util.Hashtable ();
var v0 =  Clazz.newIntArray (3, 0);
var v1 =  Clazz.newIntArray (3, 0);
var v2;
var c0 = 0;
var c1 = 0;
var c2;
if (this.rd ().indexOf ("DSSR") >= 0) this.asQuads = true;
while (this.rd () != null) {
while (!this.line.equals ("1")) {
this.rd ();
}
this.rd ();
var tokens = this.getTokens ();
v0[0] = this.getPoint (tokens, 0);
v0[1] = this.getPoint (tokens, 3);
v0[2] = this.getPoint (tokens, 6);
this.nTriangles++;
c0 = JU.CU.colorTriadToFFRGB (this.parseFloatStr (tokens[9]), this.parseFloatStr (tokens[10]), this.parseFloatStr (tokens[11]));
if (this.asQuads) {
if (this.nTriangles % 2 == 1) {
v2 = v1;
v1 = v0;
v0 = v2;
c2 = c1;
c1 = c0;
c0 = c2;
continue;
}this.addTriangleCheck (v0[0], v0[1], v0[2], 6, 0, false, c0);
this.addTriangleCheck (v1[0], v1[1], v1[2], 3, 0, false, c1);
} else {
this.addTriangleCheck (v0[0], v0[1], v0[2], 7, 0, false, c0);
}this.nPolygons++;
}
return true;
});
Clazz.defineMethod (c$, "getPoint", 
 function (tokens, i) {
var key = tokens[i] + ";" + tokens[i + 1] + ";" + tokens[i + 2];
var v = this.htVertices.get (key);
if (v == null) {
this.addVertexCopy (JU.P3.new3 (this.parseFloatStr (tokens[i]), this.parseFloatStr (tokens[i + 1]), this.parseFloatStr (tokens[i + 2])), 0, this.nVertices, false);
this.htVertices.put (key, v = Integer.$valueOf (this.nVertices++));
}return v.intValue ();
}, "~A,~N");
});
