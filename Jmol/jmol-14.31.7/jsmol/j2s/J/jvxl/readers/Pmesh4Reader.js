Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.PolygonFileReader"], "J.jvxl.readers.Pmesh4Reader", ["JU.CU", "$.P4", "J.jvxl.data.JvxlCoder", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nPolygons = 0;
this.pmeshError = null;
this.type = null;
this.color = 0;
this.transparency = 0;
this.nX = 0;
this.nY = 0;
this.tokens = null;
this.iToken = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "Pmesh4Reader", J.jvxl.readers.PolygonFileReader);
Clazz.prepareFields (c$, function () {
this.tokens =  new Array (0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.Pmesh4Reader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2PFR (sg, br);
var fileName = (sg.getReaderData ())[0];
if (fileName == null) return;
this.params.fullyLit = true;
this.type = "pmesh4";
this.jvxlFileHeaderBuffer.append (this.type + " file format\nvertices and triangles only\n");
J.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "getSurfaceData", 
function () {
this.rd ();
if (this.readVerticesAndPolygons ()) JU.Logger.info (this.type + " file contains " + this.nVertices + " 4D vertices and " + this.nPolygons + " polygons for " + this.nTriangles + " triangles");
 else JU.Logger.error (this.params.fileName + ": " + (this.pmeshError == null ? "Error reading pmesh4 data " : this.pmeshError));
});
Clazz.defineMethod (c$, "readVerticesAndPolygons", 
 function () {
try {
this.readColor ();
this.nY = this.getInt ();
this.nX = this.getInt ();
this.readVertices ();
this.createMesh ();
return true;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (this.pmeshError == null) this.pmeshError = this.type + " ERROR: " + e;
} else {
throw e;
}
}
return false;
});
Clazz.defineMethod (c$, "readColor", 
 function () {
this.color = JU.CU.colorTriadToFFRGB (this.getFloat (), this.getFloat (), this.getFloat ());
this.transparency = this.getFloat ();
});
Clazz.defineMethod (c$, "readVertices", 
 function () {
this.nVertices = this.nX * this.nY;
this.iToken = 2147483647;
this.pmeshError = this.type + " ERROR: invalid vertex list";
for (var i = 0; i < this.nVertices; i++) {
var pt = JU.P4.new4 (this.getFloat (), this.getFloat (), this.getFloat (), this.getFloat ());
if (JU.Logger.debugging) JU.Logger.debug (i + ": " + pt);
this.addVertexCopy (pt, 0, i, false);
this.iToken = 2147483647;
}
this.pmeshError = null;
return true;
});
Clazz.defineMethod (c$, "createMesh", 
 function () {
for (var i = 0; i < this.nX - 1; i++) {
for (var j = 0; j < this.nY - 1; j++) {
this.nTriangles += 2;
this.addTriangleCheck (i * this.nY + j, (i + 1) * this.nY + j, (i + 1) * this.nY + j + 1, 3, 0, false, this.color);
this.addTriangleCheck ((i + 1) * this.nY + j + 1, i * this.nY + j + 1, i * this.nY + j, 3, 0, false, this.color);
}
}
});
Clazz.defineMethod (c$, "nextToken", 
 function () {
while (this.iToken >= this.tokens.length) {
this.iToken = 0;
this.rd ();
this.tokens = this.getTokens ();
}
return this.tokens[this.iToken++];
});
Clazz.defineMethod (c$, "getInt", 
 function () {
return this.parseIntStr (this.nextToken ());
});
Clazz.defineMethod (c$, "getFloat", 
 function () {
return this.parseFloatStr (this.nextToken ());
});
});
