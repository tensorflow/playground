Clazz.declarePackage ("org.apache.tools.bzip2");
Clazz.load (["java.io.InputStream", "org.apache.tools.bzip2.BZip2Constants", "$.CRC"], "org.apache.tools.bzip2.CBZip2InputStream", ["java.io.IOException", "java.lang.IllegalStateException", "$.IndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.last = 0;
this.origPtr = 0;
this.blockSize100k = 0;
this.blockRandomised = false;
this.bsBuff = 0;
this.bsLive = 0;
this.crc = null;
this.nInUse = 0;
this.$in = null;
this.decompressConcatenated = false;
this.currentChar = -1;
this.currentState = 1;
this.storedBlockCRC = 0;
this.storedCombinedCRC = 0;
this.computedBlockCRC = 0;
this.computedCombinedCRC = 0;
this.su_count = 0;
this.su_ch2 = 0;
this.su_chPrev = 0;
this.su_i2 = 0;
this.su_j2 = 0;
this.su_rNToGo = 0;
this.su_rTPos = 0;
this.su_tPos = 0;
this.su_z = '\0';
this.data = null;
Clazz.instantialize (this, arguments);
}, org.apache.tools.bzip2, "CBZip2InputStream", java.io.InputStream, org.apache.tools.bzip2.BZip2Constants);
Clazz.prepareFields (c$, function () {
this.crc =  new org.apache.tools.bzip2.CRC ();
});
Clazz.makeConstructor (c$, 
function ($in) {
this.construct ($in, false);
}, "java.io.InputStream");
Clazz.makeConstructor (c$, 
function ($in, decompressConcatenated) {
Clazz.superConstructor (this, org.apache.tools.bzip2.CBZip2InputStream);
this.$in = $in;
this.decompressConcatenated = decompressConcatenated;
this.init (true);
this.initBlock ();
this.setupBlock ();
}, "java.io.InputStream,~B");
Clazz.defineMethod (c$, "read", 
function () {
if (this.$in == null) throw  new java.io.IOException ("stream closed");
return this.read0 ();
});
Clazz.defineMethod (c$, "read", 
function (dest, offs, len) {
if (offs < 0) {
throw  new IndexOutOfBoundsException ("offs(" + offs + ") < 0.");
}if (len < 0) {
throw  new IndexOutOfBoundsException ("len(" + len + ") < 0.");
}if (offs + len > dest.length) {
throw  new IndexOutOfBoundsException ("offs(" + offs + ") + len(" + len + ") > dest.length(" + dest.length + ").");
}if (this.$in == null) {
throw  new java.io.IOException ("stream closed");
}var hi = offs + len;
var destOffs = offs;
for (var b; (destOffs < hi) && ((b = this.read0 ()) >= 0); ) {
dest[destOffs++] = b;
}
return (destOffs == offs) ? -1 : (destOffs - offs);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "makeMaps", 
 function () {
var inUse = this.data.inUse;
var seqToUnseq = this.data.seqToUnseq;
var nInUseShadow = 0;
for (var i = 0; i < 256; i++) {
if (inUse[i]) {
seqToUnseq[nInUseShadow++] = i;
}}
this.nInUse = nInUseShadow;
});
Clazz.defineMethod (c$, "read0", 
 function () {
var retChar = this.currentChar;
switch (this.currentState) {
case 0:
return -1;
case 1:
throw  new IllegalStateException ();
case 2:
throw  new IllegalStateException ();
case 3:
this.setupRandPartB ();
break;
case 4:
this.setupRandPartC ();
break;
case 5:
throw  new IllegalStateException ();
case 6:
this.setupNoRandPartB ();
break;
case 7:
this.setupNoRandPartC ();
break;
default:
throw  new IllegalStateException ();
}
return retChar;
});
Clazz.defineMethod (c$, "init", 
 function (isFirstStream) {
if (null == this.$in) {
throw  new java.io.IOException ("No InputStream");
}if (isFirstStream) {
if (this.$in.available () == 0) {
throw  new java.io.IOException ("Empty InputStream");
}} else {
var magic0 = this.readByteAsInt ();
if (magic0 == -1) {
return false;
}var magic1 = this.readByteAsInt ();
if (magic0 != 66 || magic1 != 90) {
throw  new java.io.IOException ("Garbage after a valid BZip2 stream");
}}var magic2 = this.readByteAsInt ();
if (magic2 != 104) {
throw  new java.io.IOException (isFirstStream ? "Stream is not in the BZip2 format" : "Garbage after a valid BZip2 stream");
}var blockSize = this.readByteAsInt ();
if ((blockSize < 49) || (blockSize > 57)) {
throw  new java.io.IOException ("Stream is not BZip2 formatted: illegal " + "blocksize " + String.fromCharCode (blockSize));
}this.blockSize100k = blockSize - 48;
this.bsLive = 0;
this.computedCombinedCRC = 0;
return true;
}, "~B");
Clazz.overrideMethod (c$, "readByteAsInt", 
function () {
{
return(this.in.readByteAsInt());
}});
Clazz.defineMethod (c$, "initBlock", 
 function () {
var magic0;
var magic1;
var magic2;
var magic3;
var magic4;
var magic5;
while (true) {
magic0 = this.bsGetUByte ();
magic1 = this.bsGetUByte ();
magic2 = this.bsGetUByte ();
magic3 = this.bsGetUByte ();
magic4 = this.bsGetUByte ();
magic5 = this.bsGetUByte ();
if (magic0.charCodeAt (0) != 0x17 || magic1.charCodeAt (0) != 0x72 || magic2.charCodeAt (0) != 0x45 || magic3.charCodeAt (0) != 0x38 || magic4.charCodeAt (0) != 0x50 || magic5.charCodeAt (0) != 0x90) {
break;
}if (this.complete ()) {
return;
}}
if (magic0.charCodeAt (0) != 0x31 || magic1.charCodeAt (0) != 0x41 || magic2.charCodeAt (0) != 0x59 || magic3.charCodeAt (0) != 0x26 || magic4.charCodeAt (0) != 0x53 || magic5.charCodeAt (0) != 0x59) {
this.currentState = 0;
throw  new java.io.IOException ("bad block header");
}this.storedBlockCRC = this.bsGetInt ();
this.blockRandomised = this.bsR (1) == 1;
if (this.data == null) {
this.data =  new org.apache.tools.bzip2.CBZip2InputStream.Data (this.blockSize100k);
}this.getAndMoveToFrontDecode ();
this.crc.initialiseCRC ();
this.currentState = 1;
});
Clazz.defineMethod (c$, "endBlock", 
 function () {
this.computedBlockCRC = this.crc.getFinalCRC ();
if (this.storedBlockCRC != this.computedBlockCRC) {
this.computedCombinedCRC = (this.storedCombinedCRC << 1) | (this.storedCombinedCRC >>> 31);
this.computedCombinedCRC ^= this.storedBlockCRC;
org.apache.tools.bzip2.CBZip2InputStream.reportCRCError ();
}this.computedCombinedCRC = (this.computedCombinedCRC << 1) | (this.computedCombinedCRC >>> 31);
this.computedCombinedCRC ^= this.computedBlockCRC;
});
Clazz.defineMethod (c$, "complete", 
 function () {
this.storedCombinedCRC = this.bsGetInt ();
this.currentState = 0;
this.data = null;
if (this.storedCombinedCRC != this.computedCombinedCRC) {
org.apache.tools.bzip2.CBZip2InputStream.reportCRCError ();
}return !this.decompressConcatenated || !this.init (false);
});
Clazz.defineMethod (c$, "close", 
function () {
var inShadow = this.$in;
if (inShadow != null) {
try {
if (inShadow !== System.$in) {
inShadow.close ();
}} finally {
this.data = null;
this.$in = null;
}
}});
Clazz.defineMethod (c$, "bsR", 
 function (n) {
var bsLiveShadow = this.bsLive;
var bsBuffShadow = this.bsBuff;
if (bsLiveShadow < n) {
var inShadow = this.$in;
do {
var thech = this.readByteAsInt ();
if (thech < 0) {
throw  new java.io.IOException ("unexpected end of stream");
}bsBuffShadow = (bsBuffShadow << 8) | thech;
bsLiveShadow += 8;
} while (bsLiveShadow < n);
this.bsBuff = bsBuffShadow;
}this.bsLive = bsLiveShadow - n;
return (bsBuffShadow >> (bsLiveShadow - n)) & ((1 << n) - 1);
}, "~N");
Clazz.defineMethod (c$, "bsGetBit", 
 function () {
var bsLiveShadow = this.bsLive;
var bsBuffShadow = this.bsBuff;
if (bsLiveShadow < 1) {
var thech = this.readByteAsInt ();
if (thech < 0) {
throw  new java.io.IOException ("unexpected end of stream");
}bsBuffShadow = (bsBuffShadow << 8) | thech;
bsLiveShadow += 8;
this.bsBuff = bsBuffShadow;
}this.bsLive = bsLiveShadow - 1;
return ((bsBuffShadow >> (bsLiveShadow - 1)) & 1) != 0;
});
Clazz.defineMethod (c$, "bsGetUByte", 
 function () {
return String.fromCharCode (this.bsR (8));
});
Clazz.defineMethod (c$, "bsGetInt", 
 function () {
return (((((this.bsR (8) << 8) | this.bsR (8)) << 8) | this.bsR (8)) << 8) | this.bsR (8);
});
c$.hbCreateDecodeTables = Clazz.defineMethod (c$, "hbCreateDecodeTables", 
 function (limit, base, perm, length, minLen, maxLen, alphaSize) {
for (var i = minLen, pp = 0; i <= maxLen; i++) {
for (var j = 0; j < alphaSize; j++) {
if ((length[j]).charCodeAt (0) == i) {
perm[pp++] = j;
}}
}
for (var i = 23; --i > 0; ) {
base[i] = 0;
limit[i] = 0;
}
for (var i = 0; i < alphaSize; i++) {
base[(length[i]).charCodeAt (0) + 1]++;
}
for (var i = 1, b = base[0]; i < 23; i++) {
b += base[i];
base[i] = b;
}
for (var i = minLen, vec = 0, b = base[i]; i <= maxLen; i++) {
var nb = base[i + 1];
vec += nb - b;
b = nb;
limit[i] = vec - 1;
vec <<= 1;
}
for (var i = minLen + 1; i <= maxLen; i++) {
base[i] = ((limit[i - 1] + 1) << 1) - base[i];
}
}, "~A,~A,~A,~A,~N,~N,~N");
Clazz.defineMethod (c$, "recvDecodingTables", 
 function () {
var dataShadow = this.data;
var inUse = dataShadow.inUse;
var pos = dataShadow.recvDecodingTables_pos;
var selector = dataShadow.selector;
var selectorMtf = dataShadow.selectorMtf;
var inUse16 = 0;
for (var i = 0; i < 16; i++) {
if (this.bsGetBit ()) {
inUse16 |= 1 << i;
}}
for (var i = 256; --i >= 0; ) {
inUse[i] = false;
}
for (var i = 0; i < 16; i++) {
if ((inUse16 & (1 << i)) != 0) {
var i16 = i << 4;
for (var j = 0; j < 16; j++) {
if (this.bsGetBit ()) {
inUse[i16 + j] = true;
}}
}}
this.makeMaps ();
var alphaSize = this.nInUse + 2;
var nGroups = this.bsR (3);
var nSelectors = this.bsR (15);
for (var i = 0; i < nSelectors; i++) {
var j = 0;
while (this.bsGetBit ()) {
j++;
}
selectorMtf[i] = j;
}
for (var v = nGroups; --v >= 0; ) {
pos[v] = v;
}
for (var i = 0; i < nSelectors; i++) {
var v = selectorMtf[i] & 0xff;
var tmp = pos[v];
while (v > 0) {
pos[v] = pos[v - 1];
v--;
}
pos[0] = tmp;
selector[i] = tmp;
}
var len = dataShadow.temp_charArray2d;
for (var t = 0; t < nGroups; t++) {
var curr = this.bsR (5);
var len_t = len[t];
for (var i = 0; i < alphaSize; i++) {
while (this.bsGetBit ()) {
curr += this.bsGetBit () ? -1 : 1;
}
len_t[i] = String.fromCharCode (curr);
}
}
this.createHuffmanDecodingTables (alphaSize, nGroups);
});
Clazz.defineMethod (c$, "createHuffmanDecodingTables", 
 function (alphaSize, nGroups) {
var dataShadow = this.data;
var len = dataShadow.temp_charArray2d;
var minLens = dataShadow.minLens;
var limit = dataShadow.limit;
var base = dataShadow.base;
var perm = dataShadow.perm;
for (var t = 0; t < nGroups; t++) {
var minLen = 32;
var maxLen = 0;
var len_t = len[t];
for (var i = alphaSize; --i >= 0; ) {
var lent = len_t[i];
if (lent.charCodeAt (0) > maxLen) {
maxLen = (lent).charCodeAt (0);
}if (lent.charCodeAt (0) < minLen) {
minLen = (lent).charCodeAt (0);
}}
org.apache.tools.bzip2.CBZip2InputStream.hbCreateDecodeTables (limit[t], base[t], perm[t], len[t], minLen, maxLen, alphaSize);
minLens[t] = minLen;
}
}, "~N,~N");
Clazz.defineMethod (c$, "getAndMoveToFrontDecode", 
 function () {
this.origPtr = this.bsR (24);
this.recvDecodingTables ();
var inShadow = this.$in;
var dataShadow = this.data;
var ll8 = dataShadow.ll8;
var unzftab = dataShadow.unzftab;
var selector = dataShadow.selector;
var seqToUnseq = dataShadow.seqToUnseq;
var yy = dataShadow.getAndMoveToFrontDecode_yy;
var minLens = dataShadow.minLens;
var limit = dataShadow.limit;
var base = dataShadow.base;
var perm = dataShadow.perm;
var limitLast = this.blockSize100k * 100000;
for (var i = 256; --i >= 0; ) {
yy[i] = String.fromCharCode (i);
unzftab[i] = 0;
}
var groupNo = 0;
var groupPos = 49;
var eob = this.nInUse + 1;
var nextSym = this.getAndMoveToFrontDecode0 (0);
var bsBuffShadow = this.bsBuff;
var bsLiveShadow = this.bsLive;
var lastShadow = -1;
var zt = selector[groupNo] & 0xff;
var base_zt = base[zt];
var limit_zt = limit[zt];
var perm_zt = perm[zt];
var minLens_zt = minLens[zt];
while (nextSym != eob) {
if ((nextSym == 0) || (nextSym == 1)) {
var s = -1;
for (var n = 1; true; n <<= 1) {
if (nextSym == 0) {
s += n;
} else if (nextSym == 1) {
s += n << 1;
} else {
break;
}if (groupPos == 0) {
groupPos = 49;
zt = selector[++groupNo] & 0xff;
base_zt = base[zt];
limit_zt = limit[zt];
perm_zt = perm[zt];
minLens_zt = minLens[zt];
} else {
groupPos--;
}var zn = minLens_zt;
while (bsLiveShadow < zn) {
var thech = this.readByteAsInt ();
if (thech < 0) throw  new java.io.IOException ("unexpected end of stream");
bsBuffShadow = (bsBuffShadow << 8) | thech;
bsLiveShadow += 8;
continue;
}
var zvec = (bsBuffShadow >> (bsLiveShadow - zn)) & ((1 << zn) - 1);
bsLiveShadow -= zn;
while (zvec > limit_zt[zn]) {
zn++;
while (bsLiveShadow < 1) {
var thech = this.readByteAsInt ();
if (thech < 0) throw  new java.io.IOException ("unexpected end of stream");
bsBuffShadow = (bsBuffShadow << 8) | thech;
bsLiveShadow += 8;
continue;
}
bsLiveShadow--;
zvec = (zvec << 1) | ((bsBuffShadow >> bsLiveShadow) & 1);
}
nextSym = perm_zt[zvec - base_zt[zn]];
}
var ch = seqToUnseq[yy[0].charCodeAt (0)];
unzftab[ch & 0xff] += s + 1;
while (s-- >= 0) {
ll8[++lastShadow] = ch;
}
if (lastShadow >= limitLast) {
throw  new java.io.IOException ("block overrun");
}} else {
if (++lastShadow >= limitLast) {
throw  new java.io.IOException ("block overrun");
}var tmp = yy[nextSym - 1];
unzftab[seqToUnseq[tmp.charCodeAt (0)] & 0xff]++;
ll8[lastShadow] = seqToUnseq[tmp.charCodeAt (0)];
if (nextSym <= 16) {
for (var j = nextSym - 1; j > 0; ) {
yy[j] = yy[--j];
}
} else {
System.arraycopy (yy, 0, yy, 1, nextSym - 1);
}yy[0] = tmp;
if (groupPos == 0) {
groupPos = 49;
zt = selector[++groupNo] & 0xff;
base_zt = base[zt];
limit_zt = limit[zt];
perm_zt = perm[zt];
minLens_zt = minLens[zt];
} else {
groupPos--;
}var zn = minLens_zt;
while (bsLiveShadow < zn) {
var thech = this.readByteAsInt ();
if (thech < 0) throw  new java.io.IOException ("unexpected end of stream");
bsBuffShadow = (bsBuffShadow << 8) | thech;
bsLiveShadow += 8;
continue;
}
var zvec = (bsBuffShadow >> (bsLiveShadow - zn)) & ((1 << zn) - 1);
bsLiveShadow -= zn;
while (zvec > limit_zt[zn]) {
zn++;
while (bsLiveShadow < 1) {
var thech = this.readByteAsInt ();
if (thech < 0) throw  new java.io.IOException ("unexpected end of stream");
bsBuffShadow = (bsBuffShadow << 8) | thech;
bsLiveShadow += 8;
continue;
}
bsLiveShadow--;
zvec = (zvec << 1) | ((bsBuffShadow >> bsLiveShadow) & 1);
}
nextSym = perm_zt[zvec - base_zt[zn]];
}}
this.last = lastShadow;
this.bsLive = bsLiveShadow;
this.bsBuff = bsBuffShadow;
});
Clazz.defineMethod (c$, "getAndMoveToFrontDecode0", 
 function (groupNo) {
var inShadow = this.$in;
var dataShadow = this.data;
var zt = dataShadow.selector[groupNo] & 0xff;
var limit_zt = dataShadow.limit[zt];
var zn = dataShadow.minLens[zt];
var zvec = this.bsR (zn);
var bsLiveShadow = this.bsLive;
var bsBuffShadow = this.bsBuff;
while (zvec > limit_zt[zn]) {
zn++;
while (bsLiveShadow < 1) {
var thech = this.readByteAsInt ();
if (thech < 0) throw  new java.io.IOException ("unexpected end of stream");
bsBuffShadow = (bsBuffShadow << 8) | thech;
bsLiveShadow += 8;
continue;
}
bsLiveShadow--;
zvec = (zvec << 1) | ((bsBuffShadow >> bsLiveShadow) & 1);
}
this.bsLive = bsLiveShadow;
this.bsBuff = bsBuffShadow;
return dataShadow.perm[zt][zvec - dataShadow.base[zt][zn]];
}, "~N");
Clazz.defineMethod (c$, "setupBlock", 
 function () {
if (this.data == null) {
return;
}var cftab = this.data.cftab;
var tt = this.data.initTT (this.last + 1);
var ll8 = this.data.ll8;
cftab[0] = 0;
System.arraycopy (this.data.unzftab, 0, cftab, 1, 256);
for (var i = 1, c = cftab[0]; i <= 256; i++) {
c += cftab[i];
cftab[i] = c;
}
for (var i = 0, lastShadow = this.last; i <= lastShadow; i++) {
tt[cftab[ll8[i] & 0xff]++] = i;
}
if ((this.origPtr < 0) || (this.origPtr >= tt.length)) {
throw  new java.io.IOException ("stream corrupted");
}this.su_tPos = tt[this.origPtr];
this.su_count = 0;
this.su_i2 = 0;
this.su_ch2 = 256;
if (this.blockRandomised) {
this.su_rNToGo = 0;
this.su_rTPos = 0;
this.setupRandPartA ();
} else {
this.setupNoRandPartA ();
}});
Clazz.defineMethod (c$, "setupRandPartA", 
 function () {
if (this.su_i2 <= this.last) {
this.su_chPrev = this.su_ch2;
var su_ch2Shadow = this.data.ll8[this.su_tPos] & 0xff;
this.su_tPos = this.data.tt[this.su_tPos];
if (this.su_rNToGo == 0) {
this.su_rNToGo = org.apache.tools.bzip2.BZip2Constants.rNums[this.su_rTPos] - 1;
if (++this.su_rTPos == 512) {
this.su_rTPos = 0;
}} else {
this.su_rNToGo--;
}this.su_ch2 = su_ch2Shadow ^= (this.su_rNToGo == 1) ? 1 : 0;
this.su_i2++;
this.currentChar = su_ch2Shadow;
this.currentState = 3;
this.crc.updateCRC (su_ch2Shadow);
} else {
this.endBlock ();
this.initBlock ();
this.setupBlock ();
}});
Clazz.defineMethod (c$, "setupNoRandPartA", 
 function () {
if (this.su_i2 <= this.last) {
this.su_chPrev = this.su_ch2;
var su_ch2Shadow = this.data.ll8[this.su_tPos] & 0xff;
this.su_ch2 = su_ch2Shadow;
this.su_tPos = this.data.tt[this.su_tPos];
this.su_i2++;
this.currentChar = su_ch2Shadow;
this.currentState = 6;
this.crc.updateCRC (su_ch2Shadow);
} else {
this.currentState = 5;
this.endBlock ();
this.initBlock ();
this.setupBlock ();
}});
Clazz.defineMethod (c$, "setupRandPartB", 
 function () {
if (this.su_ch2 != this.su_chPrev) {
this.currentState = 2;
this.su_count = 1;
this.setupRandPartA ();
} else if (++this.su_count >= 4) {
this.su_z = String.fromCharCode (this.data.ll8[this.su_tPos] & 0xff);
this.su_tPos = this.data.tt[this.su_tPos];
if (this.su_rNToGo == 0) {
this.su_rNToGo = org.apache.tools.bzip2.BZip2Constants.rNums[this.su_rTPos] - 1;
if (++this.su_rTPos == 512) {
this.su_rTPos = 0;
}} else {
this.su_rNToGo--;
}this.su_j2 = 0;
this.currentState = 4;
if (this.su_rNToGo == 1) {
this.su_z = String.fromCharCode ((this.su_z).charCodeAt (0) ^ 1);
}this.setupRandPartC ();
} else {
this.currentState = 2;
this.setupRandPartA ();
}});
Clazz.defineMethod (c$, "setupRandPartC", 
 function () {
if (this.su_j2 < (this.su_z).charCodeAt (0)) {
this.currentChar = this.su_ch2;
this.crc.updateCRC (this.su_ch2);
this.su_j2++;
} else {
this.currentState = 2;
this.su_i2++;
this.su_count = 0;
this.setupRandPartA ();
}});
Clazz.defineMethod (c$, "setupNoRandPartB", 
 function () {
if (this.su_ch2 != this.su_chPrev) {
this.su_count = 1;
this.setupNoRandPartA ();
} else if (++this.su_count >= 4) {
this.su_z = String.fromCharCode (this.data.ll8[this.su_tPos] & 0xff);
this.su_tPos = this.data.tt[this.su_tPos];
this.su_j2 = 0;
this.setupNoRandPartC ();
} else {
this.setupNoRandPartA ();
}});
Clazz.defineMethod (c$, "setupNoRandPartC", 
 function () {
if (this.su_j2 < (this.su_z).charCodeAt (0)) {
var su_ch2Shadow = this.su_ch2;
this.currentChar = su_ch2Shadow;
this.crc.updateCRC (su_ch2Shadow);
this.su_j2++;
this.currentState = 7;
} else {
this.su_i2++;
this.su_count = 0;
this.setupNoRandPartA ();
}});
c$.reportCRCError = Clazz.defineMethod (c$, "reportCRCError", 
 function () {
System.err.println ("BZip2 CRC error");
});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.inUse = null;
this.seqToUnseq = null;
this.selector = null;
this.selectorMtf = null;
this.unzftab = null;
this.limit = null;
this.base = null;
this.perm = null;
this.minLens = null;
this.cftab = null;
this.getAndMoveToFrontDecode_yy = null;
this.temp_charArray2d = null;
this.recvDecodingTables_pos = null;
this.tt = null;
this.ll8 = null;
Clazz.instantialize (this, arguments);
}, org.apache.tools.bzip2.CBZip2InputStream, "Data");
Clazz.prepareFields (c$, function () {
this.inUse =  Clazz.newBooleanArray (256, false);
this.seqToUnseq =  Clazz.newByteArray (256, 0);
this.selector =  Clazz.newByteArray (18002, 0);
this.selectorMtf =  Clazz.newByteArray (18002, 0);
this.unzftab =  Clazz.newIntArray (256, 0);
this.limit =  Clazz.newIntArray (6, 258, 0);
this.base =  Clazz.newIntArray (6, 258, 0);
this.perm =  Clazz.newIntArray (6, 258, 0);
this.minLens =  Clazz.newIntArray (6, 0);
this.cftab =  Clazz.newIntArray (257, 0);
this.getAndMoveToFrontDecode_yy =  Clazz.newCharArray (256, '\0');
this.temp_charArray2d =  Clazz.newCharArray (6, 258, '\0');
this.recvDecodingTables_pos =  Clazz.newByteArray (6, 0);
});
Clazz.makeConstructor (c$, 
function (a) {
this.ll8 =  Clazz.newByteArray (a * 100000, 0);
}, "~N");
Clazz.defineMethod (c$, "initTT", 
function (a) {
var b = this.tt;
if ((b == null) || (b.length < a)) {
this.tt = b =  Clazz.newIntArray (a, 0);
}return b;
}, "~N");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"EOF", 0,
"START_BLOCK_STATE", 1,
"RAND_PART_A_STATE", 2,
"RAND_PART_B_STATE", 3,
"RAND_PART_C_STATE", 4,
"NO_RAND_PART_A_STATE", 5,
"NO_RAND_PART_B_STATE", 6,
"NO_RAND_PART_C_STATE", 7);
});
