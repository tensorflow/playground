Clazz.declarePackage ("java.util.zip");
Clazz.load (["java.io.FilterInputStream"], "java.util.zip.CheckedInputStream", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.cksum = null;
Clazz.instantialize (this, arguments);
}, java.util.zip, "CheckedInputStream", java.io.FilterInputStream);
Clazz.defineMethod (c$, "set", 
function (cksum) {
this.$in = this.$in;
this.cksum = cksum;
return this;
}, "JU.Checksum");
Clazz.overrideMethod (c$, "readByteAsInt", 
function () {
var b = this.$in.readByteAsInt ();
if (b != -1) {
this.cksum.updateByteAsInt (b);
}return b;
});
Clazz.defineMethod (c$, "read", 
function (buf, off, len) {
len = this.$in.read (buf, off, len);
if (len != -1) {
this.cksum.update (buf, off, len);
}return len;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "skip", 
function (n) {
var buf =  Clazz.newByteArray (512, 0);
var total = 0;
while (total < n) {
var len = n - total;
len = this.read (buf, 0, len < buf.length ? len : buf.length);
if (len == -1) {
return total;
}total += len;
}
return total;
}, "~N");
Clazz.defineMethod (c$, "getChecksum", 
function () {
return this.cksum;
});
});
