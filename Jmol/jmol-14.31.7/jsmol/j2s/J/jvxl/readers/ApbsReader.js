Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.VolumeFileReader"], "J.jvxl.readers.ApbsReader", ["JU.PT", "$.SB"], function () {
c$ = Clazz.declareType (J.jvxl.readers, "ApbsReader", J.jvxl.readers.VolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.ApbsReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2VFR (sg, br);
if (this.params.thePlane == null) this.params.insideOut = !this.params.insideOut;
this.isAngstroms = true;
this.nSurfaces = 1;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.jvxlFileHeaderBuffer = JU.SB.newS (this.skipComments (false));
while (this.line != null && this.line.length == 0) this.rd ();

this.jvxlFileHeaderBuffer.append ("APBS OpenDx DATA ").append (this.line).append ("\n");
this.jvxlFileHeaderBuffer.append ("see http://apbs.sourceforge.net\n");
var atomLine = this.rd ();
var tokens = JU.PT.getTokens (atomLine);
if (tokens.length >= 4) {
this.volumetricOrigin.set (this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]));
}J.jvxl.readers.VolumeFileReader.checkAtomLine (this.isXLowToHigh, this.isAngstroms, tokens[0], atomLine, this.jvxlFileHeaderBuffer);
this.readVoxelVector (0);
this.readVoxelVector (1);
this.readVoxelVector (2);
this.rd ();
tokens = this.getTokens ();
for (var i = 0; i < 3; i++) this.voxelCounts[i] = this.parseIntStr (tokens[i + 5]);

this.rd ();
});
});
