Clazz.declarePackage ("JU");
Clazz.load (["JU.Checksum"], "JU.Adler32", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.s1 = 1;
this.s2 = 0;
this.b1 = null;
Clazz.instantialize (this, arguments);
}, JU, "Adler32", null, JU.Checksum);
Clazz.prepareFields (c$, function () {
this.b1 =  Clazz.newByteArray (1, 0);
});
Clazz.overrideMethod (c$, "resetLong", 
function (init) {
this.s1 = init & 0xffff;
this.s2 = (init >> 16) & 0xffff;
}, "~N");
Clazz.overrideMethod (c$, "reset", 
function () {
this.s1 = 1;
this.s2 = 0;
});
Clazz.overrideMethod (c$, "getValue", 
function () {
return ((this.s2 << 16) | this.s1);
});
Clazz.overrideMethod (c$, "update", 
function (buf, index, len) {
if (len == 1) {
this.s1 += buf[index++] & 0xff;
this.s2 += this.s1;
this.s1 %= 65521;
this.s2 %= 65521;
return;
}var len1 = Clazz.doubleToInt (len / 5552);
var len2 = len % 5552;
while (len1-- > 0) {
var k = 5552;
len -= k;
while (k-- > 0) {
this.s1 += buf[index++] & 0xff;
this.s2 += this.s1;
}
this.s1 %= 65521;
this.s2 %= 65521;
}
var k = len2;
len -= k;
while (k-- > 0) {
this.s1 += buf[index++] & 0xff;
this.s2 += this.s1;
}
this.s1 %= 65521;
this.s2 %= 65521;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "updateByteAsInt", 
function (b) {
this.b1[0] = b;
this.update (this.b1, 0, 1);
}, "~N");
Clazz.defineStatics (c$,
"BASE", 65521,
"NMAX", 5552);
});
