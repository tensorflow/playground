Clazz.load (["java.io.DataInput", "$.FilterInputStream"], "java.io.DataInputStream", ["java.io.EOFException", "$.PushbackInputStream", "$.UTFDataFormatException", "java.lang.Double", "$.Float", "$.IndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bytearr = null;
this.chararr = null;
this.readBuffer = null;
this.lineBuffer = null;
Clazz.instantialize (this, arguments);
}, java.io, "DataInputStream", java.io.FilterInputStream, java.io.DataInput);
Clazz.prepareFields (c$, function () {
this.bytearr =  Clazz.newByteArray (80, 0);
this.chararr =  Clazz.newCharArray (80, '\0');
this.readBuffer =  Clazz.newByteArray (8, 0);
});
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
return this.$in.read (b, off, len);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "readFully", 
function (b, off, len) {
if (len < 0) throw  new IndexOutOfBoundsException ();
var n = 0;
while (n < len) {
var count = this.$in.read (b, off + n, len - n);
if (count < 0) throw  new java.io.EOFException ();
n += count;
}
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "skipBytes", 
function (n) {
var total = 0;
var cur = 0;
while ((total < n) && ((cur = this.$in.skip (n - total)) > 0)) {
total += cur;
}
return total;
}, "~N");
Clazz.overrideMethod (c$, "readBoolean", 
function () {
var ch = this.$in.readByteAsInt ();
if (ch < 0) throw  new java.io.EOFException ();
return (ch != 0);
});
Clazz.overrideMethod (c$, "readByte", 
function () {
var ch = this.$in.readByteAsInt ();
if (ch < 0) throw  new java.io.EOFException ();
return (ch);
});
Clazz.overrideMethod (c$, "readUnsignedByte", 
function () {
var ch = this.$in.readByteAsInt ();
if (ch < 0) throw  new java.io.EOFException ();
return ch;
});
Clazz.overrideMethod (c$, "readShort", 
function () {
var ch1 = this.$in.readByteAsInt ();
var ch2 = this.$in.readByteAsInt ();
if ((ch1 | ch2) < 0) throw  new java.io.EOFException ();
var n = ((ch1 << 8) + (ch2 << 0));
{
return (n > 0x7FFF ? n - 0x10000 : n);
}});
Clazz.defineMethod (c$, "readUnsignedShort", 
function () {
var ch1 = this.$in.readByteAsInt ();
var ch2 = this.$in.readByteAsInt ();
if ((ch1 | ch2) < 0) throw  new java.io.EOFException ();
return (ch1 << 8) + (ch2 << 0);
});
Clazz.overrideMethod (c$, "readChar", 
function () {
var ch1 = this.$in.readByteAsInt ();
var ch2 = this.$in.readByteAsInt ();
if ((ch1 | ch2) < 0) throw  new java.io.EOFException ();
return String.fromCharCode ((ch1 << 8) + (ch2 << 0));
});
Clazz.overrideMethod (c$, "readInt", 
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
Clazz.overrideMethod (c$, "readLong", 
function () {
this.readFully (this.readBuffer, 0, 8);
return ((this.readBuffer[0] << 56) + ((this.readBuffer[1] & 255) << 48) + ((this.readBuffer[2] & 255) << 40) + ((this.readBuffer[3] & 255) << 32) + ((this.readBuffer[4] & 255) << 24) + ((this.readBuffer[5] & 255) << 16) + ((this.readBuffer[6] & 255) << 8) + ((this.readBuffer[7] & 255) << 0));
});
Clazz.overrideMethod (c$, "readFloat", 
function () {
return Float.intBitsToFloat (this.readInt ());
});
Clazz.overrideMethod (c$, "readDouble", 
function () {
return Double.longBitsToDouble (this.readLong ());
});
Clazz.overrideMethod (c$, "readLine", 
function () {
var buf = this.lineBuffer;
if (buf == null) {
buf = this.lineBuffer =  Clazz.newCharArray (128, '\0');
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
if (!(Clazz.instanceOf (this.$in, java.io.PushbackInputStream))) {
this.$in =  new java.io.PushbackInputStream (this.$in, 1);
}(this.$in).unreadByte (c2);
}break loop;
default:
if (--room < 0) {
buf =  Clazz.newCharArray (offset + 128, '\0');
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
Clazz.overrideMethod (c$, "readUTF", 
function () {
return java.io.DataInputStream.readUTFBytes (this, -1);
});
c$.readUTFBytes = Clazz.defineMethod (c$, "readUTFBytes", 
function ($in, utflen) {
var isByteArray = (utflen >= 0);
if (!isByteArray) utflen = $in.readUnsignedShort ();
var bytearr = null;
var chararr = null;
if (Clazz.instanceOf ($in, java.io.DataInputStream)) {
var dis = $in;
if (dis.bytearr.length < utflen) {
dis.bytearr =  Clazz.newByteArray (isByteArray ? utflen : utflen * 2, 0);
dis.chararr =  Clazz.newCharArray (dis.bytearr.length, '\0');
}chararr = dis.chararr;
bytearr = dis.bytearr;
} else {
bytearr =  Clazz.newByteArray (utflen, 0);
chararr =  Clazz.newCharArray (utflen, '\0');
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
