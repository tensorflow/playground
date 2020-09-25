Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.PolygonFileReader", "java.util.Hashtable", "JU.P3"], "J.jvxl.readers.NffReader", ["java.lang.Float", "JU.CU", "J.jvxl.data.JvxlCoder", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nPolygons = 0;
this.vertexMap = null;
this.pt = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "NffReader", J.jvxl.readers.PolygonFileReader);
Clazz.prepareFields (c$, function () {
this.vertexMap =  new java.util.Hashtable ();
this.pt =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.NffReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2PFR (sg, br);
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "setHeader", 
function () {
this.jvxlFileHeaderBuffer.append ("NFF file format\nvertices and triangles only\n");
J.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
});
Clazz.overrideMethod (c$, "getSurfaceData", 
function () {
if (this.readVerticesAndPolygons ()) JU.Logger.info ("NFF file contains " + this.nVertices + " vertices and " + this.nTriangles + " triangles");
 else JU.Logger.error (this.params.fileName + ": Error reading Nff data ");
});
Clazz.defineMethod (c$, "readVerticesAndPolygons", 
function () {
var color = 0xFF0000;
try {
while (this.rd () != null) {
if (this.line.length == 0) continue;
var tokens = this.getTokens ();
switch (this.line.charAt (0)) {
case '#':
this.vertexMap.clear ();
continue;
case 'f':
color = JU.CU.colorTriadToFFRGB (this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]));
continue;
case 'p':
if (this.line.equals ("pp 3")) {
var i1 = this.getVertex ();
var i2 = this.getVertex ();
var i3 = this.getVertex ();
this.nTriangles++;
this.addTriangleCheck (i1, i2, i3, 7, 0, false, color);
}continue;
}
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return true;
});
Clazz.defineMethod (c$, "getVertex", 
 function () {
var i = this.vertexMap.get (this.rd ());
if (i == null) {
var tokens = this.getTokens ();
this.pt.set (this.parseFloatStr (tokens[0]), this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]));
if (!Float.isNaN (this.params.scale)) this.pt.scale (this.params.scale);
if (this.isAnisotropic) this.setVertexAnisotropy (this.pt);
i = Integer.$valueOf (this.addVertexCopy (this.pt, 0, this.nVertices++, true));
this.vertexMap.put (this.line, i);
}return i.intValue ();
});
});
