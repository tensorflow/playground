Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.VolumeFileReader"], "J.jvxl.readers.CubeReader", ["JU.PT", "$.SB", "JU.Logger"], function () {
c$ = Clazz.declareType (J.jvxl.readers, "CubeReader", J.jvxl.readers.VolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.CubeReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2VFR (sg, br);
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.jvxlFileHeaderBuffer =  new JU.SB ();
this.jvxlFileHeaderBuffer.append (this.rd ()).appendC ('\n');
this.jvxlFileHeaderBuffer.append (this.rd ()).appendC ('\n');
var atomLine = this.rd ();
var tokens = JU.PT.getTokensAt (atomLine, 0);
this.ac = this.parseIntStr (tokens[0]);
this.negativeAtomCount = (this.ac < 0);
if (this.negativeAtomCount) this.ac = -this.ac;
this.volumetricOrigin.set (this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]));
J.jvxl.readers.VolumeFileReader.checkAtomLine (this.isXLowToHigh, this.isAngstroms, tokens[0], atomLine, this.jvxlFileHeaderBuffer);
if (!this.isAngstroms) this.volumetricOrigin.scale (0.5291772);
for (var i = 0; i < 3; ++i) this.readVoxelVector (i);

for (var i = 0; i < this.ac; ++i) this.jvxlFileHeaderBuffer.append (this.rd () + "\n");

if (!this.negativeAtomCount) {
this.nSurfaces = 1;
} else {
this.rd ();
JU.Logger.info ("Reading extra CUBE information line: " + this.line);
this.nSurfaces = this.parseIntStr (this.line);
}});
});
