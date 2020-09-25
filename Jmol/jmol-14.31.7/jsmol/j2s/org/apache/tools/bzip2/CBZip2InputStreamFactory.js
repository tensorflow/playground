Clazz.declarePackage ("org.apache.tools.bzip2");
Clazz.load (null, "org.apache.tools.bzip2.CBZip2InputStreamFactory", ["org.apache.tools.bzip2.CBZip2InputStream"], function () {
c$ = Clazz.declareType (org.apache.tools.bzip2, "CBZip2InputStreamFactory");
Clazz.defineMethod (c$, "getStream", 
function (is) {
is.read ( Clazz.newByteArray (2, 0), 0, 2);
return  new org.apache.tools.bzip2.CBZip2InputStream (is);
}, "java.io.InputStream");
});
