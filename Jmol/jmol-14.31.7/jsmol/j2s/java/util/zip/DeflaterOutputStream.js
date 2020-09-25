Clazz.declarePackage ("java.util.zip");
Clazz.load (["JU.DeflaterOutputStream"], "java.util.zip.DeflaterOutputStream", null, function () {
c$ = Clazz.declareType (java.util.zip, "DeflaterOutputStream", JU.DeflaterOutputStream);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.util.zip.DeflaterOutputStream, []);
});
Clazz.makeConstructor (c$, 
function (bos, deflater) {
Clazz.superConstructor (this, java.util.zip.DeflaterOutputStream, []);
this.setDOS (bos, deflater);
}, "java.io.ByteArrayOutputStream,java.util.zip.Deflater");
Clazz.defineMethod (c$, "setDOS", 
function (out, deflater) {
this.jzSetDOS (out, deflater, 0, true);
}, "java.io.OutputStream,java.util.zip.Deflater");
});
