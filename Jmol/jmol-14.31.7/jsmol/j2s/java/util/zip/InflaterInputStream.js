Clazz.declarePackage ("java.util.zip");
Clazz.load (["JU.InflaterInputStream"], "java.util.zip.InflaterInputStream", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.inf = null;
Clazz.instantialize (this, arguments);
}, java.util.zip, "InflaterInputStream", JU.InflaterInputStream);
Clazz.makeConstructor (c$, 
function ($in, inflater, size) {
Clazz.superConstructor (this, java.util.zip.InflaterInputStream, [$in, inflater, size, true]);
this.inf = inflater;
}, "java.io.InputStream,java.util.zip.Inflater,~N");
});
