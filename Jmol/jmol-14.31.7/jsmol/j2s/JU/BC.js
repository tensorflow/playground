Clazz.declarePackage ("JU");
c$ = Clazz.declareType (JU, "BC");
Clazz.makeConstructor (c$, 
function () {
});
c$.bytesToFloat = Clazz.defineMethod (c$, "bytesToFloat", 
function (bytes, j, isBigEndian) {
return JU.BC.intToFloat (JU.BC.bytesToInt (bytes, j, isBigEndian));
}, "~A,~N,~B");
c$.bytesToShort = Clazz.defineMethod (c$, "bytesToShort", 
function (bytes, j, isBigEndian) {
var n = (isBigEndian ? (bytes[j + 1] & 0xff) | (bytes[j] & 0xff) << 8 : (bytes[j++] & 0xff) | (bytes[j++] & 0xff) << 8);
return (n > 0x7FFF ? n - 0x10000 : n);
}, "~A,~N,~B");
c$.bytesToInt = Clazz.defineMethod (c$, "bytesToInt", 
function (bytes, j, isBigEndian) {
var n = (isBigEndian ? (bytes[j + 3] & 0xff) | (bytes[j + 2] & 0xff) << 8 | (bytes[j + 1] & 0xff) << 16 | (bytes[j] & 0xff) << 24 : (bytes[j++] & 0xff) | (bytes[j++] & 0xff) << 8 | (bytes[j++] & 0xff) << 16 | (bytes[j++] & 0xff) << 24);
{
return (n > 0x7FFFFFFF ? n - 0x100000000 : n);
}}, "~A,~N,~B");
c$.intToSignedInt = Clazz.defineMethod (c$, "intToSignedInt", 
function (n) {
{
return (n > 0x7FFFFFFF ? n - 0x100000000 : n);
}}, "~N");
c$.intToFloat = Clazz.defineMethod (c$, "intToFloat", 
function (x) {
{
if (x == 0) return 0;
var o = JU.BC;
if (o.fracIEEE == null)
o.setFracIEEE();
var m = ((x & 0x7F800000) >> 23);
return ((x & 0x80000000) == 0 ? 1 : -1) * o.shiftIEEE((x & 0x7FFFFF) | 0x800000, m - 149);
}}, "~N");
c$.bytesToDoubleToFloat = Clazz.defineMethod (c$, "bytesToDoubleToFloat", 
function (bytes, j, isBigEndian) {
{
if (JU.BC.fracIEEE == null) JU.BC.setFracIEEE ();
{
var o = JU.BC;
var b1, b2, b3, b4, b5;
if (isBigEndian) {
b1 = bytes[j] & 0xFF;
b2 = bytes[j + 1] & 0xFF;
b3 = bytes[j + 2] & 0xFF;
b4 = bytes[j + 3] & 0xFF;
b5 = bytes[j + 4] & 0xFF;
} else {
b1 = bytes[j + 7] & 0xFF;
b2 = bytes[j + 6] & 0xFF;
b3 = bytes[j + 5] & 0xFF;
b4 = bytes[j + 4] & 0xFF;
b5 = bytes[j + 3] & 0xFF;
}
var s = ((b1 & 0x80) == 0 ? 1 : -1);
var e = (((b1 & 0x7F) << 4) | (b2 >> 4)) - 1026;
b2 = (b2 & 0xF) | 0x10;
return s * (o.shiftIEEE(b2, e) + o.shiftIEEE(b3, e - 8) + o.shiftIEEE(b4, e - 16)
+ o.shiftIEEE(b5, e - 24));
}}}, "~A,~N,~B");
c$.setFracIEEE = Clazz.defineMethod (c$, "setFracIEEE", 
 function () {
JU.BC.fracIEEE =  Clazz.newFloatArray (270, 0);
for (var i = 0; i < 270; i++) JU.BC.fracIEEE[i] = Math.pow (2, i - 141);

});
c$.shiftIEEE = Clazz.defineMethod (c$, "shiftIEEE", 
function (f, i) {
if (f == 0 || i < -140) return 0;
if (i > 128) return 3.4028235E38;
return f * JU.BC.fracIEEE[i + 140];
}, "~N,~N");
Clazz.defineStatics (c$,
"fracIEEE", null);
