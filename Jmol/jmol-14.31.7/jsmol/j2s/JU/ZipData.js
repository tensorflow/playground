Clazz.declarePackage ("JU");
Clazz.load (null, "JU.ZipData", ["JU.Rdr", "$.ZipTools"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isEnabled = true;
this.buf = null;
this.pt = 0;
this.nBytes = 0;
Clazz.instantialize (this, arguments);
}, JU, "ZipData");
Clazz.makeConstructor (c$, 
function (nBytes) {
this.nBytes = nBytes;
}, "~N");
Clazz.defineMethod (c$, "addBytes", 
function (byteBuf, nSectorBytes, nBytesRemaining) {
if (this.pt == 0) {
if (!JU.Rdr.isGzipB (byteBuf)) {
this.isEnabled = false;
return -1;
}this.buf =  Clazz.newByteArray (nBytesRemaining, 0);
}var nToAdd = Math.min (nSectorBytes, nBytesRemaining);
System.arraycopy (byteBuf, 0, this.buf, this.pt, nToAdd);
this.pt += nToAdd;
return nBytesRemaining - nToAdd;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "addTo", 
function (jzt, data) {
data.append (JU.ZipData.getGzippedBytesAsString (jzt, this.buf));
}, "javajs.api.GenericZipTools,JU.SB");
c$.getGzippedBytesAsString = Clazz.defineMethod (c$, "getGzippedBytesAsString", 
function (jzt, bytes) {
try {
var bis = jzt.getUnGzippedInputStream (bytes);
var s = JU.ZipTools.getStreamAsString (bis);
bis.close ();
return s;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return "";
} else {
throw e;
}
}
}, "javajs.api.GenericZipTools,~A");
});
