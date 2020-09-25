Clazz.declarePackage ("JU");
Clazz.load (["java.io.BufferedReader"], "JU.DataReader", ["java.io.StringReader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ptMark = 0;
Clazz.instantialize (this, arguments);
}, JU, "DataReader", java.io.BufferedReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JU.DataReader, [ new java.io.StringReader ("")]);
});
Clazz.defineMethod (c$, "getBufferedReader", 
function () {
return this;
});
Clazz.defineMethod (c$, "readBuf", 
function (buf, off, len) {
var nRead = 0;
var line = this.readLine ();
if (line == null) return 0;
var linept = 0;
var linelen = line.length;
for (var i = off; i < len && linelen >= 0; i++) {
if (linept >= linelen) {
linept = 0;
buf[i] = '\n';
line = this.readLine ();
linelen = (line == null ? -1 : line.length);
} else {
buf[i] = line.charAt (linept++);
}nRead++;
}
return nRead;
}, "~A,~N,~N");
});
