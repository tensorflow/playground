(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Clazz_load (["java.io.FilterInputStream"], "java.io.PushbackInputStream", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.NullPointerException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.buf = null;
this.pos = 0;
Clazz_instantialize (this, arguments);
}, java.io, "PushbackInputStream", java.io.FilterInputStream);
Clazz_defineMethod (c$, "ensureOpen", 
 function () {
if (this.$in == null) throw  new java.io.IOException ("Stream closed");
});
Clazz_makeConstructor (c$, 
function ($in, size) {
Clazz_superConstructor (this, java.io.PushbackInputStream, [$in]);
if (size <= 0) {
throw  new IllegalArgumentException ("size <= 0");
}this.buf =  Clazz_newByteArray (size, 0);
this.pos = size;
}, "java.io.InputStream,~N");
Clazz_overrideMethod (c$, "readByteAsInt", 
function () {
this.ensureOpen ();
if (this.pos < this.buf.length) {
return this.buf[this.pos++] & 0xff;
}return this.$in.readByteAsInt ();
});
Clazz_defineMethod (c$, "read", 
function (b, off, len) {
this.ensureOpen ();
if (b == null) {
throw  new NullPointerException ();
} else if (off < 0 || len < 0 || len > b.length - off) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}var avail = this.buf.length - this.pos;
if (avail > 0) {
if (len < avail) {
avail = len;
}System.arraycopy (this.buf, this.pos, b, off, avail);
this.pos += avail;
off += avail;
len -= avail;
}if (len > 0) {
len = this.$in.read (b, off, len);
if (len == -1) {
return avail == 0 ? -1 : avail;
}return avail + len;
}return avail;
}, "~A,~N,~N");
Clazz_defineMethod (c$, "unreadByte", 
function (b) {
this.ensureOpen ();
if (this.pos == 0) {
throw  new java.io.IOException ("Push back buffer is full");
}this.buf[--this.pos] = b;
}, "~N");
Clazz_defineMethod (c$, "unread", 
function (b, off, len) {
this.ensureOpen ();
if (len > this.pos) {
throw  new java.io.IOException ("Push back buffer is full");
}this.pos -= len;
System.arraycopy (b, off, this.buf, this.pos, len);
}, "~A,~N,~N");
Clazz_overrideMethod (c$, "available", 
function () {
this.ensureOpen ();
var n = this.buf.length - this.pos;
var avail = this.$in.available ();
return n > (2147483647 - avail) ? 2147483647 : n + avail;
});
Clazz_overrideMethod (c$, "skip", 
function (n) {
this.ensureOpen ();
if (n <= 0) {
return 0;
}var pskip = this.buf.length - this.pos;
if (pskip > 0) {
if (n < pskip) {
pskip = n;
}this.pos += pskip;
n -= pskip;
}if (n > 0) {
pskip += this.$in.skip (n);
}return pskip;
}, "~N");
Clazz_overrideMethod (c$, "markSupported", 
function () {
return false;
});
Clazz_overrideMethod (c$, "mark", 
function (readlimit) {
}, "~N");
Clazz_overrideMethod (c$, "reset", 
function () {
throw  new java.io.IOException ("mark/reset not supported");
});
Clazz_overrideMethod (c$, "close", 
function () {
if (this.$in == null) return;
this.$in.close ();
this.$in = null;
this.buf = null;
});
});
Clazz_load (["java.io.DataInput", "$.FilterInputStream"], "java.io.DataInputStream", ["java.io.EOFException", "$.PushbackInputStream", "$.UTFDataFormatException", "java.lang.Double", "$.Float", "$.IndexOutOfBoundsException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bytearr = null;
this.chararr = null;
this.readBuffer = null;
this.lineBuffer = null;
Clazz_instantialize (this, arguments);
}, java.io, "DataInputStream", java.io.FilterInputStream, java.io.DataInput);
Clazz_prepareFields (c$, function () {
this.bytearr =  Clazz_newByteArray (80, 0);
this.chararr =  Clazz_newCharArray (80, '\0');
this.readBuffer =  Clazz_newByteArray (8, 0);
});
Clazz_defineMethod (c$, "read", 
function (b, off, len) {
return this.$in.read (b, off, len);
}, "~A,~N,~N");
Clazz_defineMethod (c$, "readFully", 
function (b, off, len) {
if (len < 0) throw  new IndexOutOfBoundsException ();
var n = 0;
while (n < len) {
var count = this.$in.read (b, off + n, len - n);
if (count < 0) throw  new java.io.EOFException ();
n += count;
}
}, "~A,~N,~N");
Clazz_overrideMethod (c$, "skipBytes", 
function (n) {
var total = 0;
var cur = 0;
while ((total < n) && ((cur = this.$in.skip (n - total)) > 0)) {
total += cur;
}
return total;
}, "~N");
Clazz_overrideMethod (c$, "readBoolean", 
function () {
var ch = this.$in.readByteAsInt ();
if (ch < 0) throw  new java.io.EOFException ();
return (ch != 0);
});
Clazz_overrideMethod (c$, "readByte", 
function () {
var ch = this.$in.readByteAsInt ();
if (ch < 0) throw  new java.io.EOFException ();
return (ch);
});
Clazz_overrideMethod (c$, "readUnsignedByte", 
function () {
var ch = this.$in.readByteAsInt ();
if (ch < 0) throw  new java.io.EOFException ();
return ch;
});
Clazz_overrideMethod (c$, "readShort", 
function () {
var ch1 = this.$in.readByteAsInt ();
var ch2 = this.$in.readByteAsInt ();
if ((ch1 | ch2) < 0) throw  new java.io.EOFException ();
var n = ((ch1 << 8) + (ch2 << 0));
{
return (n > 0x7FFF ? n - 0x10000 : n);
}});
Clazz_defineMethod (c$, "readUnsignedShort", 
function () {
var ch1 = this.$in.readByteAsInt ();
var ch2 = this.$in.readByteAsInt ();
if ((ch1 | ch2) < 0) throw  new java.io.EOFException ();
return (ch1 << 8) + (ch2 << 0);
});
Clazz_overrideMethod (c$, "readChar", 
function () {
var ch1 = this.$in.readByteAsInt ();
var ch2 = this.$in.readByteAsInt ();
if ((ch1 | ch2) < 0) throw  new java.io.EOFException ();
return String.fromCharCode ((ch1 << 8) + (ch2 << 0));
});
Clazz_overrideMethod (c$, "readInt", 
function () {
var ch1 = this.$in.readByteAsInt ();
var ch2 = this.$in.readByteAsInt ();
var ch3 = this.$in.readByteAsInt ();
var ch4 = this.$in.readByteAsInt ();
if ((ch1 | ch2 | ch3 | ch4) < 0) throw  new java.io.EOFException ();
var n = ((ch1 << 24) + (ch2 << 16) + (ch3 << 8) + (ch4 << 0));
{
return (n > 0x7FFFFFFF ? n - 0x100000000 : n);
}});
Clazz_overrideMethod (c$, "readLong", 
function () {
this.readFully (this.readBuffer, 0, 8);
return ((this.readBuffer[0] << 56) + ((this.readBuffer[1] & 255) << 48) + ((this.readBuffer[2] & 255) << 40) + ((this.readBuffer[3] & 255) << 32) + ((this.readBuffer[4] & 255) << 24) + ((this.readBuffer[5] & 255) << 16) + ((this.readBuffer[6] & 255) << 8) + ((this.readBuffer[7] & 255) << 0));
});
Clazz_overrideMethod (c$, "readFloat", 
function () {
return Float.intBitsToFloat (this.readInt ());
});
Clazz_overrideMethod (c$, "readDouble", 
function () {
return Double.longBitsToDouble (this.readLong ());
});
Clazz_overrideMethod (c$, "readLine", 
function () {
var buf = this.lineBuffer;
if (buf == null) {
buf = this.lineBuffer =  Clazz_newCharArray (128, '\0');
}var room = buf.length;
var offset = 0;
var c;
loop : while (true) {
switch (c = this.$in.readByteAsInt ()) {
case -1:
case '\n':
break loop;
case '\r':
var c2 = this.$in.readByteAsInt ();
if ((c2 != 10) && (c2 != -1)) {
if (!(Clazz_instanceOf (this.$in, java.io.PushbackInputStream))) {
this.$in =  new java.io.PushbackInputStream (this.$in, 1);
}(this.$in).unreadByte (c2);
}break loop;
default:
if (--room < 0) {
buf =  Clazz_newCharArray (offset + 128, '\0');
room = buf.length - offset - 1;
System.arraycopy (this.lineBuffer, 0, buf, 0, offset);
this.lineBuffer = buf;
}buf[offset++] = String.fromCharCode (c);
break;
}
}
if ((c == -1) && (offset == 0)) {
return null;
}return String.copyValueOf (buf, 0, offset);
});
Clazz_overrideMethod (c$, "readUTF", 
function () {
return java.io.DataInputStream.readUTFBytes (this, -1);
});
c$.readUTFBytes = Clazz_defineMethod (c$, "readUTFBytes", 
function ($in, utflen) {
var isByteArray = (utflen >= 0);
if (!isByteArray) utflen = $in.readUnsignedShort ();
var bytearr = null;
var chararr = null;
if (Clazz_instanceOf ($in, java.io.DataInputStream)) {
var dis = $in;
if (dis.bytearr.length < utflen) {
dis.bytearr =  Clazz_newByteArray (isByteArray ? utflen : utflen * 2, 0);
dis.chararr =  Clazz_newCharArray (dis.bytearr.length, '\0');
}chararr = dis.chararr;
bytearr = dis.bytearr;
} else {
bytearr =  Clazz_newByteArray (utflen, 0);
chararr =  Clazz_newCharArray (utflen, '\0');
}var c;
var char2;
var char3;
var count = 0;
var chararr_count = 0;
$in.readFully (bytearr, 0, utflen);
while (count < utflen) {
c = bytearr[count] & 0xff;
if (c > 127) break;
count++;
chararr[chararr_count++] = String.fromCharCode (c);
}
while (count < utflen) {
c = bytearr[count] & 0xff;
switch (c >> 4) {
case 0:
case 1:
case 2:
case 3:
case 4:
case 5:
case 6:
case 7:
count++;
chararr[chararr_count++] = String.fromCharCode (c);
break;
case 12:
case 13:
count += 2;
if (count > utflen) throw  new java.io.UTFDataFormatException ("malformed input: partial character at end");
char2 = bytearr[count - 1];
if ((char2 & 0xC0) != 0x80) throw  new java.io.UTFDataFormatException ("malformed input around byte " + count);
chararr[chararr_count++] = String.fromCharCode (((c & 0x1F) << 6) | (char2 & 0x3F));
break;
case 14:
count += 3;
if (count > utflen) throw  new java.io.UTFDataFormatException ("malformed input: partial character at end");
char2 = bytearr[count - 2];
char3 = bytearr[count - 1];
if (((char2 & 0xC0) != 0x80) || ((char3 & 0xC0) != 0x80)) throw  new java.io.UTFDataFormatException ("malformed input around byte " + (count - 1));
chararr[chararr_count++] = String.fromCharCode (((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
break;
default:
throw  new java.io.UTFDataFormatException ("malformed input around byte " + count);
}
}
return  String.instantialize (chararr, 0, chararr_count);
}, "java.io.DataInput,~N");
});
Clazz_declarePackage ("JU");
c$ = Clazz_declareType (JU, "BC");
Clazz_makeConstructor (c$, 
function () {
});
c$.bytesToFloat = Clazz_defineMethod (c$, "bytesToFloat", 
function (bytes, j, isBigEndian) {
return JU.BC.intToFloat (JU.BC.bytesToInt (bytes, j, isBigEndian));
}, "~A,~N,~B");
c$.bytesToShort = Clazz_defineMethod (c$, "bytesToShort", 
function (bytes, j, isBigEndian) {
var n = (isBigEndian ? (bytes[j + 1] & 0xff) | (bytes[j] & 0xff) << 8 : (bytes[j++] & 0xff) | (bytes[j++] & 0xff) << 8);
return (n > 0x7FFF ? n - 0x10000 : n);
}, "~A,~N,~B");
c$.bytesToInt = Clazz_defineMethod (c$, "bytesToInt", 
function (bytes, j, isBigEndian) {
var n = (isBigEndian ? (bytes[j + 3] & 0xff) | (bytes[j + 2] & 0xff) << 8 | (bytes[j + 1] & 0xff) << 16 | (bytes[j] & 0xff) << 24 : (bytes[j++] & 0xff) | (bytes[j++] & 0xff) << 8 | (bytes[j++] & 0xff) << 16 | (bytes[j++] & 0xff) << 24);
{
return (n > 0x7FFFFFFF ? n - 0x100000000 : n);
}}, "~A,~N,~B");
c$.intToSignedInt = Clazz_defineMethod (c$, "intToSignedInt", 
function (n) {
{
return (n > 0x7FFFFFFF ? n - 0x100000000 : n);
}}, "~N");
c$.intToFloat = Clazz_defineMethod (c$, "intToFloat", 
function (x) {
{
if (x == 0) return 0;
var o = JU.BC;
if (o.fracIEEE == null)
o.setFracIEEE();
var m = ((x & 0x7F800000) >> 23);
return ((x & 0x80000000) == 0 ? 1 : -1) * o.shiftIEEE((x & 0x7FFFFF) | 0x800000, m - 149);
}}, "~N");
c$.bytesToDoubleToFloat = Clazz_defineMethod (c$, "bytesToDoubleToFloat", 
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
c$.setFracIEEE = Clazz_defineMethod (c$, "setFracIEEE", 
 function () {
JU.BC.fracIEEE =  Clazz_newFloatArray (270, 0);
for (var i = 0; i < 270; i++) JU.BC.fracIEEE[i] = Math.pow (2, i - 141);

});
c$.shiftIEEE = Clazz_defineMethod (c$, "shiftIEEE", 
function (f, i) {
if (f == 0 || i < -140) return 0;
if (i > 128) return 3.4028235E38;
return f * JU.BC.fracIEEE[i + 140];
}, "~N,~N");
Clazz_defineStatics (c$,
"fracIEEE", null);
Clazz_declarePackage ("JU");
Clazz_load (["javajs.api.GenericBinaryDocument", "JU.BC"], "JU.BinaryDocument", ["java.io.DataInputStream", "java.lang.Double"], function () {
c$ = Clazz_decorateAsClass (function () {
this.stream = null;
this.isRandom = false;
this.isBigEndian = true;
this.bis = null;
this.nBytes = 0;
this.out = null;
this.t8 = null;
Clazz_instantialize (this, arguments);
}, JU, "BinaryDocument", JU.BC, javajs.api.GenericBinaryDocument);
Clazz_prepareFields (c$, function () {
this.t8 =  Clazz_newByteArray (8, 0);
});
Clazz_overrideMethod (c$, "close", 
function () {
if (this.stream != null) try {
this.stream.close ();
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.out != null) this.out.closeChannel ();
});
Clazz_overrideMethod (c$, "setStream", 
function (bis, isBigEndian) {
this.bis = bis;
if (bis != null) {
this.stream =  new java.io.DataInputStream (bis);
}this.isBigEndian = isBigEndian;
return this;
}, "java.io.BufferedInputStream,~B");
Clazz_overrideMethod (c$, "getInputStream", 
function () {
return this.bis;
});
Clazz_overrideMethod (c$, "setStreamData", 
function (stream, isBigEndian) {
if (stream != null) this.stream = stream;
this.isBigEndian = isBigEndian;
}, "java.io.DataInputStream,~B");
Clazz_overrideMethod (c$, "setOutputChannel", 
function (out) {
this.out = out;
}, "javajs.api.GenericOutputChannel");
Clazz_defineMethod (c$, "setRandom", 
function (TF) {
this.isRandom = TF;
}, "~B");
Clazz_overrideMethod (c$, "readByte", 
function () {
this.nBytes++;
return this.ioReadByte ();
});
Clazz_overrideMethod (c$, "readUInt8", 
function () {
this.nBytes++;
var b = this.stream.readUnsignedByte ();
if (this.out != null) this.out.writeByteAsInt (b);
return b;
});
Clazz_defineMethod (c$, "ioReadByte", 
 function () {
var b = this.stream.readByte ();
if (this.out != null) this.out.writeByteAsInt (b);
return b;
});
Clazz_overrideMethod (c$, "readBytes", 
function (n) {
var b =  Clazz_newByteArray (n, 0);
this.readByteArray (b, 0, n);
return b;
}, "~N");
Clazz_overrideMethod (c$, "readByteArray", 
function (b, off, len) {
var n = this.ioRead (b, off, len);
this.nBytes += n;
return n;
}, "~A,~N,~N");
Clazz_defineMethod (c$, "ioRead", 
 function (b, off, len) {
var m = 0;
while (len > 0) {
var n = this.stream.read (b, off, len);
m += n;
if (n > 0 && this.out != null) this.out.write (b, off, n);
if (n >= len) break;
off += n;
len -= n;
}
return m;
}, "~A,~N,~N");
Clazz_overrideMethod (c$, "readString", 
function (nChar) {
var temp =  Clazz_newByteArray (nChar, 0);
var n = this.readByteArray (temp, 0, nChar);
return  String.instantialize (temp, 0, n, "UTF-8");
}, "~N");
Clazz_overrideMethod (c$, "readShort", 
function () {
this.nBytes += 2;
var n = (this.isBigEndian ? this.ioReadShort () : ((this.ioReadByte () & 0xff) | (this.ioReadByte () & 0xff) << 8));
{
return (n > 0x7FFF ? n - 0x10000 : n);
}});
Clazz_defineMethod (c$, "ioReadShort", 
 function () {
var b = this.stream.readShort ();
if (this.out != null) this.out.writeShort (b);
return b;
});
Clazz_overrideMethod (c$, "readIntLE", 
function () {
this.nBytes += 4;
return this.readLEInt ();
});
Clazz_overrideMethod (c$, "readInt", 
function () {
this.nBytes += 4;
return (this.isBigEndian ? this.ioReadInt () : this.readLEInt ());
});
Clazz_defineMethod (c$, "ioReadInt", 
 function () {
var i = this.stream.readInt ();
if (this.out != null) this.out.writeInt (i);
return i;
});
Clazz_overrideMethod (c$, "swapBytesI", 
function (n) {
return (((n >> 24) & 0xff) | ((n >> 16) & 0xff) << 8 | ((n >> 8) & 0xff) << 16 | (n & 0xff) << 24);
}, "~N");
Clazz_overrideMethod (c$, "swapBytesS", 
function (n) {
return ((((n >> 8) & 0xff) | (n & 0xff) << 8));
}, "~N");
Clazz_overrideMethod (c$, "readUnsignedShort", 
function () {
this.nBytes += 2;
var a = (this.ioReadByte () & 0xff);
var b = (this.ioReadByte () & 0xff);
return (this.isBigEndian ? (a << 8) + b : (b << 8) + a);
});
Clazz_overrideMethod (c$, "readLong", 
function () {
this.nBytes += 8;
return (this.isBigEndian ? this.ioReadLong () : (((this.ioReadByte ()) & 0xff) | ((this.ioReadByte ()) & 0xff) << 8 | ((this.ioReadByte ()) & 0xff) << 16 | ((this.ioReadByte ()) & 0xff) << 24 | ((this.ioReadByte ()) & 0xff) << 32 | ((this.ioReadByte ()) & 0xff) << 40 | ((this.ioReadByte ()) & 0xff) << 48 | ((this.ioReadByte ()) & 0xff) << 54));
});
Clazz_defineMethod (c$, "ioReadLong", 
 function () {
var b = this.stream.readLong ();
if (this.out != null) this.out.writeLong (b);
return b;
});
Clazz_defineMethod (c$, "readLEInt", 
 function () {
this.ioRead (this.t8, 0, 4);
return JU.BC.bytesToInt (this.t8, 0, false);
});
Clazz_overrideMethod (c$, "readFloat", 
function () {
return JU.BC.intToFloat (this.readInt ());
});
Clazz_overrideMethod (c$, "readDouble", 
function () {
{
this.readByteArray(this.t8, 0, 8);
return this.bytesToDoubleToFloat(this.t8, 0, this.isBigEndian);
}});
Clazz_defineMethod (c$, "ioReadDouble", 
 function () {
var d = this.stream.readDouble ();
if (this.out != null) this.out.writeLong (Double.doubleToRawLongBits (d));
return d;
});
Clazz_defineMethod (c$, "readLELong", 
 function () {
return (((this.ioReadByte ()) & 0xff) | ((this.ioReadByte ()) & 0xff) << 8 | ((this.ioReadByte ()) & 0xff) << 16 | ((this.ioReadByte ()) & 0xff) << 24 | ((this.ioReadByte ()) & 0xff) << 32 | ((this.ioReadByte ()) & 0xff) << 40 | ((this.ioReadByte ()) & 0xff) << 48 | ((this.ioReadByte ()) & 0xff) << 56);
});
Clazz_overrideMethod (c$, "seek", 
function (offset) {
try {
if (offset == this.nBytes) return;
if (offset < this.nBytes) {
this.stream.reset ();
if (this.out != null && this.nBytes != 0) this.out.reset ();
this.nBytes = 0;
} else {
offset -= this.nBytes;
}if (this.out == null) {
this.stream.skipBytes (offset);
} else {
this.readByteArray ( Clazz_newByteArray (offset, 0), 0, offset);
}this.nBytes += offset;
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
}, "~N");
Clazz_overrideMethod (c$, "getPosition", 
function () {
return this.nBytes;
});
Clazz_overrideMethod (c$, "getAllDataFiles", 
function (binaryFileList, firstFile) {
return null;
}, "~S,~S");
Clazz_overrideMethod (c$, "getAllDataMapped", 
function (replace, string, fileData) {
}, "~S,~S,java.util.Map");
});
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
