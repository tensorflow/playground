Clazz.load (["java.io.Reader"], "java.io.InputStreamReader", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$in = null;
this.isOpen = true;
this.charsetName = null;
this.isUTF8 = false;
this.bytearr = null;
this.pos = 0;
Clazz.instantialize (this, arguments);
}, java.io, "InputStreamReader", java.io.Reader);
Clazz.makeConstructor (c$, 
function ($in, charsetName) {
Clazz.superConstructor (this, java.io.InputStreamReader, [$in]);
this.$in = $in;
this.charsetName = charsetName;
if (!(this.isUTF8 = "UTF-8".equals (charsetName)) && !"ISO-8859-1".equals (charsetName)) throw  new NullPointerException ("charsetName");
}, "java.io.InputStream,~S");
Clazz.defineMethod (c$, "getEncoding", 
function () {
return this.charsetName;
});
Clazz.overrideMethod (c$, "read", 
function (cbuf, offset, length) {
if (this.bytearr == null || this.bytearr.length < length) this.bytearr =  Clazz.newByteArray (length, 0);
var c;
var char2;
var char3;
var byteCount = 0;
var charCount = offset;
var byteLen = this.$in.read (this.bytearr, this.pos, length - this.pos);
var nAvail = this.$in.available ();
if (byteLen < 0) return -1;
var nMax = byteLen;
while (byteCount < nMax) {
c = this.bytearr[byteCount] & 0xff;
if (this.isUTF8) switch (c >> 4) {
case 0xC:
case 0xD:
if (byteCount + 1 >= byteLen) {
if (nAvail >= 1) {
nMax = byteCount;
continue;
}} else if (((char2 = this.bytearr[byteCount + 1]) & 0xC0) == 0x80) {
cbuf[charCount++] = String.fromCharCode (((c & 0x1F) << 6) | (char2 & 0x3F));
byteCount += 2;
continue;
}this.isUTF8 = false;
break;
case 0xE:
if (byteCount + 2 >= byteLen) {
if (nAvail >= 2) {
nMax = byteCount;
continue;
}} else if (((char2 = this.bytearr[byteCount + 1]) & 0xC0) == 0x80 && ((char3 = this.bytearr[byteCount + 2]) & 0xC0) == 0x80) {
cbuf[charCount++] = String.fromCharCode (((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | (char3 & 0x3F));
byteCount += 3;
continue;
}this.isUTF8 = false;
break;
}
byteCount++;
cbuf[charCount++] = String.fromCharCode (c);
}
this.pos = byteLen - byteCount;
for (var i = 0; i < this.pos; i++) {
this.bytearr[i] = this.bytearr[byteCount++];
}
return charCount - offset;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "ready", 
function () {
return this.isOpen;
});
Clazz.overrideMethod (c$, "close", 
function () {
this.$in.close ();
this.isOpen = false;
});
});
