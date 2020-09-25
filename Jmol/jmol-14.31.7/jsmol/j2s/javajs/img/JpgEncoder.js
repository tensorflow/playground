Clazz.declarePackage ("javajs.img");
Clazz.load (["javajs.img.ImageEncoder", "JU.AU"], ["javajs.img.DCT", "$.Huffman", "$.JpgEncoder", "$.JpegObj"], null, function () {
c$ = Clazz.decorateAsClass (function () {
this.jpegObj = null;
this.huf = null;
this.dct = null;
this.defaultQuality = 100;
this.applicationTag = null;
Clazz.instantialize (this, arguments);
}, javajs.img, "JpgEncoder", javajs.img.ImageEncoder);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javajs.img.JpgEncoder, []);
});
Clazz.overrideMethod (c$, "setParams", 
function (params) {
if (this.quality <= 0) this.quality = (params.containsKey ("qualityJPG") ? (params.get ("qualityJPG")).intValue () : this.defaultQuality);
this.jpegObj =  new javajs.img.JpegObj ();
this.jpegObj.comment = params.get ("comment");
this.applicationTag = params.get ("jpgAppTag");
}, "java.util.Map");
Clazz.overrideMethod (c$, "generate", 
function () {
this.jpegObj.imageWidth = this.width;
this.jpegObj.imageHeight = this.height;
this.dct =  new javajs.img.DCT (this.quality);
this.huf =  new javajs.img.Huffman (this.width, this.height);
if (this.jpegObj == null) return;
this.jpegObj.getYCCArray (this.pixels);
var longState = this.writeHeaders (this.jpegObj, this.dct);
this.writeCompressedData (this.jpegObj, this.dct, this.huf);
this.writeMarker (javajs.img.JpgEncoder.eoi);
if (longState != null) {
var b = longState.getBytes ();
this.out.write (b, 0, b.length);
}});
Clazz.defineMethod (c$, "writeCompressedData", 
 function (jpegObj, dct, huf) {
var i;
var j;
var r;
var c;
var a;
var b;
var comp;
var xpos;
var ypos;
var xblockoffset;
var yblockoffset;
var inputArray;
var dctArray1 =  Clazz.newFloatArray (8, 8, 0);
var dctArray2 =  Clazz.newDoubleArray (8, 8, 0);
var dctArray3 =  Clazz.newIntArray (64, 0);
var lastDCvalue =  Clazz.newIntArray (jpegObj.numberOfComponents, 0);
var minBlockWidth;
var minBlockHeight;
minBlockWidth = ((huf.imageWidth % 8 != 0) ? Clazz.doubleToInt (Math.floor (huf.imageWidth / 8.0) + 1) * 8 : huf.imageWidth);
minBlockHeight = ((huf.imageHeight % 8 != 0) ? Clazz.doubleToInt (Math.floor (huf.imageHeight / 8.0) + 1) * 8 : huf.imageHeight);
for (comp = 0; comp < jpegObj.numberOfComponents; comp++) {
minBlockWidth = Math.min (minBlockWidth, jpegObj.blockWidth[comp]);
minBlockHeight = Math.min (minBlockHeight, jpegObj.blockHeight[comp]);
}
xpos = 0;
for (r = 0; r < minBlockHeight; r++) {
for (c = 0; c < minBlockWidth; c++) {
xpos = c * 8;
ypos = r * 8;
for (comp = 0; comp < jpegObj.numberOfComponents; comp++) {
inputArray = jpegObj.components[comp];
var vsampF = jpegObj.vsampFactor[comp];
var hsampF = jpegObj.hsampFactor[comp];
var qNumber = jpegObj.qtableNumber[comp];
var dcNumber = jpegObj.dctableNumber[comp];
var acNumber = jpegObj.actableNumber[comp];
for (i = 0; i < vsampF; i++) {
for (j = 0; j < hsampF; j++) {
xblockoffset = j * 8;
yblockoffset = i * 8;
for (a = 0; a < 8; a++) {
for (b = 0; b < 8; b++) {
dctArray1[a][b] = inputArray[ypos + yblockoffset + a][xpos + xblockoffset + b];
}
}
dctArray2 = javajs.img.DCT.forwardDCT (dctArray1);
dctArray3 = javajs.img.DCT.quantizeBlock (dctArray2, dct.divisors[qNumber]);
huf.HuffmanBlockEncoder (this.out, dctArray3, lastDCvalue[comp], dcNumber, acNumber);
lastDCvalue[comp] = dctArray3[0];
}
}
}
}
}
huf.flushBuffer (this.out);
}, "javajs.img.JpegObj,javajs.img.DCT,javajs.img.Huffman");
Clazz.defineMethod (c$, "writeHeaders", 
 function (jpegObj, dct) {
var i;
var j;
var index;
var offset;
var tempArray;
this.writeMarker (javajs.img.JpgEncoder.soi);
this.writeArray (javajs.img.JpgEncoder.jfif);
var comment = null;
if (jpegObj.comment.length > 0) this.writeString (jpegObj.comment, 0xE1);
this.writeString ("JPEG Encoder Copyright 1998, James R. Weeks and BioElectroMech.\n\n", 0xFE);
var dqt =  Clazz.newByteArray (134, 0);
dqt[0] = 0xFF;
dqt[1] = 0xDB;
dqt[2] = 0;
dqt[3] = 132;
offset = 4;
for (i = 0; i < 2; i++) {
dqt[offset++] = ((0) + i);
tempArray = dct.quantum[i];
for (j = 0; j < 64; j++) {
dqt[offset++] = tempArray[javajs.img.Huffman.jpegNaturalOrder[j]];
}
}
this.writeArray (dqt);
var sof =  Clazz.newByteArray (19, 0);
sof[0] = 0xFF;
sof[1] = 0xC0;
sof[2] = 0;
sof[3] = 17;
sof[4] = jpegObj.precision;
sof[5] = ((jpegObj.imageHeight >> 8) & 0xFF);
sof[6] = ((jpegObj.imageHeight) & 0xFF);
sof[7] = ((jpegObj.imageWidth >> 8) & 0xFF);
sof[8] = ((jpegObj.imageWidth) & 0xFF);
sof[9] = jpegObj.numberOfComponents;
index = 10;
for (i = 0; i < sof[9]; i++) {
sof[index++] = jpegObj.compID[i];
sof[index++] = ((jpegObj.hsampFactor[i] << 4) + jpegObj.vsampFactor[i]);
sof[index++] = jpegObj.qtableNumber[i];
}
this.writeArray (sof);
this.WriteDHTHeader (javajs.img.Huffman.bitsDCluminance, javajs.img.Huffman.valDCluminance);
this.WriteDHTHeader (javajs.img.Huffman.bitsACluminance, javajs.img.Huffman.valACluminance);
this.WriteDHTHeader (javajs.img.Huffman.bitsDCchrominance, javajs.img.Huffman.valDCchrominance);
this.WriteDHTHeader (javajs.img.Huffman.bitsACchrominance, javajs.img.Huffman.valACchrominance);
var sos =  Clazz.newByteArray (14, 0);
sos[0] = 0xFF;
sos[1] = 0xDA;
sos[2] = 0;
sos[3] = 12;
sos[4] = jpegObj.numberOfComponents;
index = 5;
for (i = 0; i < sos[4]; i++) {
sos[index++] = jpegObj.compID[i];
sos[index++] = ((jpegObj.dctableNumber[i] << 4) + jpegObj.actableNumber[i]);
}
sos[index++] = jpegObj.ss;
sos[index++] = jpegObj.se;
sos[index++] = ((jpegObj.ah << 4) + jpegObj.al);
this.writeArray (sos);
return comment;
}, "javajs.img.JpegObj,javajs.img.DCT");
Clazz.defineMethod (c$, "writeString", 
 function (s, id) {
var len = s.length;
var i0 = 0;
var suffix = this.applicationTag;
while (i0 < len) {
var nBytes = len - i0;
if (nBytes > 65510) {
nBytes = 65500;
var pt = s.lastIndexOf ('\n', i0 + nBytes);
if (pt > i0 + 1) nBytes = pt - i0;
}if (i0 + nBytes == len) suffix = "";
this.writeTag (nBytes + suffix.length, id);
this.writeArray (s.substring (i0, i0 + nBytes).getBytes ());
if (suffix.length > 0) this.writeArray (suffix.getBytes ());
i0 += nBytes;
}
}, "~S,~N");
Clazz.defineMethod (c$, "writeTag", 
 function (length, id) {
length += 2;
var com =  Clazz.newByteArray (4, 0);
com[0] = 0xFF;
com[1] = id;
com[2] = ((length >> 8) & 0xFF);
com[3] = (length & 0xFF);
this.writeArray (com);
}, "~N,~N");
Clazz.defineMethod (c$, "WriteDHTHeader", 
function (bits, val) {
var dht;
var bytes = 0;
for (var j = 1; j < 17; j++) bytes += bits[j];

dht =  Clazz.newByteArray (21 + bytes, 0);
dht[0] = 0xFF;
dht[1] = 0xC4;
var index = 4;
for (var j = 0; j < 17; j++) dht[index++] = bits[j];

for (var j = 0; j < bytes; j++) dht[index++] = val[j];

dht[2] = (((index - 2) >> 8) & 0xFF);
dht[3] = ((index - 2) & 0xFF);
this.writeArray (dht);
}, "~A,~A");
Clazz.defineMethod (c$, "writeMarker", 
function (data) {
this.out.write (data, 0, 2);
}, "~A");
Clazz.defineMethod (c$, "writeArray", 
function (data) {
this.out.write (data, 0, data.length);
}, "~A");
Clazz.defineStatics (c$,
"CONTINUE_MAX", 65500,
"CONTINUE_MAX_BUFFER", 65510,
"eoi",  Clazz.newByteArray (-1, [0xFF, 0xD9]),
"jfif",  Clazz.newByteArray (-1, [0xff, 0xe0, 0, 16, 0x4a, 0x46, 0x49, 0x46, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0]),
"soi",  Clazz.newByteArray (-1, [0xFF, 0xD8]));
c$ = Clazz.decorateAsClass (function () {
this.quantum = null;
this.divisors = null;
this.quantum_luminance = null;
this.DivisorsLuminance = null;
this.quantum_chrominance = null;
this.DivisorsChrominance = null;
Clazz.instantialize (this, arguments);
}, javajs.img, "DCT");
Clazz.prepareFields (c$, function () {
this.quantum = JU.AU.newInt2 (2);
this.divisors = JU.AU.newDouble2 (2);
this.quantum_luminance =  Clazz.newIntArray (64, 0);
this.DivisorsLuminance =  Clazz.newDoubleArray (64, 0);
this.quantum_chrominance =  Clazz.newIntArray (64, 0);
this.DivisorsChrominance =  Clazz.newDoubleArray (64, 0);
});
Clazz.makeConstructor (c$, 
function (quality) {
this.initMatrix (quality);
}, "~N");
Clazz.defineMethod (c$, "initMatrix", 
 function (quality) {
quality = (quality < 1 ? 1 : quality > 100 ? 100 : quality);
quality = (quality < 50 ? Clazz.doubleToInt (5000 / quality) : 200 - quality * 2);
this.quantum_luminance[0] = 16;
this.quantum_luminance[1] = 11;
this.quantum_luminance[2] = 10;
this.quantum_luminance[3] = 16;
this.quantum_luminance[4] = 24;
this.quantum_luminance[5] = 40;
this.quantum_luminance[6] = 51;
this.quantum_luminance[7] = 61;
this.quantum_luminance[8] = 12;
this.quantum_luminance[9] = 12;
this.quantum_luminance[10] = 14;
this.quantum_luminance[11] = 19;
this.quantum_luminance[12] = 26;
this.quantum_luminance[13] = 58;
this.quantum_luminance[14] = 60;
this.quantum_luminance[15] = 55;
this.quantum_luminance[16] = 14;
this.quantum_luminance[17] = 13;
this.quantum_luminance[18] = 16;
this.quantum_luminance[19] = 24;
this.quantum_luminance[20] = 40;
this.quantum_luminance[21] = 57;
this.quantum_luminance[22] = 69;
this.quantum_luminance[23] = 56;
this.quantum_luminance[24] = 14;
this.quantum_luminance[25] = 17;
this.quantum_luminance[26] = 22;
this.quantum_luminance[27] = 29;
this.quantum_luminance[28] = 51;
this.quantum_luminance[29] = 87;
this.quantum_luminance[30] = 80;
this.quantum_luminance[31] = 62;
this.quantum_luminance[32] = 18;
this.quantum_luminance[33] = 22;
this.quantum_luminance[34] = 37;
this.quantum_luminance[35] = 56;
this.quantum_luminance[36] = 68;
this.quantum_luminance[37] = 109;
this.quantum_luminance[38] = 103;
this.quantum_luminance[39] = 77;
this.quantum_luminance[40] = 24;
this.quantum_luminance[41] = 35;
this.quantum_luminance[42] = 55;
this.quantum_luminance[43] = 64;
this.quantum_luminance[44] = 81;
this.quantum_luminance[45] = 104;
this.quantum_luminance[46] = 113;
this.quantum_luminance[47] = 92;
this.quantum_luminance[48] = 49;
this.quantum_luminance[49] = 64;
this.quantum_luminance[50] = 78;
this.quantum_luminance[51] = 87;
this.quantum_luminance[52] = 103;
this.quantum_luminance[53] = 121;
this.quantum_luminance[54] = 120;
this.quantum_luminance[55] = 101;
this.quantum_luminance[56] = 72;
this.quantum_luminance[57] = 92;
this.quantum_luminance[58] = 95;
this.quantum_luminance[59] = 98;
this.quantum_luminance[60] = 112;
this.quantum_luminance[61] = 100;
this.quantum_luminance[62] = 103;
this.quantum_luminance[63] = 99;
javajs.img.DCT.AANscale (this.DivisorsLuminance, this.quantum_luminance, quality);
for (var i = 4; i < 64; i++) this.quantum_chrominance[i] = 99;

this.quantum_chrominance[0] = 17;
this.quantum_chrominance[1] = 18;
this.quantum_chrominance[2] = 24;
this.quantum_chrominance[3] = 47;
this.quantum_chrominance[8] = 18;
this.quantum_chrominance[9] = 21;
this.quantum_chrominance[10] = 26;
this.quantum_chrominance[11] = 66;
this.quantum_chrominance[16] = 24;
this.quantum_chrominance[17] = 26;
this.quantum_chrominance[18] = 56;
this.quantum_chrominance[24] = 47;
this.quantum_chrominance[25] = 66;
javajs.img.DCT.AANscale (this.DivisorsChrominance, this.quantum_chrominance, quality);
this.quantum[0] = this.quantum_luminance;
this.quantum[1] = this.quantum_chrominance;
this.divisors[0] = this.DivisorsLuminance;
this.divisors[1] = this.DivisorsChrominance;
}, "~N");
c$.AANscale = Clazz.defineMethod (c$, "AANscale", 
 function (divisors, values, quality) {
for (var j = 0; j < 64; j++) {
var temp = Clazz.doubleToInt ((values[j] * quality + 50) / 100);
values[j] = (temp < 1 ? 1 : temp > 255 ? 255 : temp);
}
for (var i = 0, index = 0; i < 8; i++) for (var j = 0; j < 8; j++, index++) divisors[index] = (0.125 / (values[index] * javajs.img.DCT.AANscaleFactor[i] * javajs.img.DCT.AANscaleFactor[j]));


}, "~A,~A,~N");
c$.forwardDCT = Clazz.defineMethod (c$, "forwardDCT", 
function (input) {
var output =  Clazz.newDoubleArray (8, 8, 0);
var tmp0;
var tmp1;
var tmp2;
var tmp3;
var tmp4;
var tmp5;
var tmp6;
var tmp7;
var tmp10;
var tmp11;
var tmp12;
var tmp13;
var z1;
var z2;
var z3;
var z4;
var z5;
var z11;
var z13;
for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++) output[i][j] = (input[i][j] - 128.0);


for (var i = 0; i < 8; i++) {
tmp0 = output[i][0] + output[i][7];
tmp7 = output[i][0] - output[i][7];
tmp1 = output[i][1] + output[i][6];
tmp6 = output[i][1] - output[i][6];
tmp2 = output[i][2] + output[i][5];
tmp5 = output[i][2] - output[i][5];
tmp3 = output[i][3] + output[i][4];
tmp4 = output[i][3] - output[i][4];
tmp10 = tmp0 + tmp3;
tmp13 = tmp0 - tmp3;
tmp11 = tmp1 + tmp2;
tmp12 = tmp1 - tmp2;
output[i][0] = tmp10 + tmp11;
output[i][4] = tmp10 - tmp11;
z1 = (tmp12 + tmp13) * 0.707106781;
output[i][2] = tmp13 + z1;
output[i][6] = tmp13 - z1;
tmp10 = tmp4 + tmp5;
tmp11 = tmp5 + tmp6;
tmp12 = tmp6 + tmp7;
z5 = (tmp10 - tmp12) * 0.382683433;
z2 = 0.541196100 * tmp10 + z5;
z4 = 1.306562965 * tmp12 + z5;
z3 = tmp11 * 0.707106781;
z11 = tmp7 + z3;
z13 = tmp7 - z3;
output[i][5] = z13 + z2;
output[i][3] = z13 - z2;
output[i][1] = z11 + z4;
output[i][7] = z11 - z4;
}
for (var i = 0; i < 8; i++) {
tmp0 = output[0][i] + output[7][i];
tmp7 = output[0][i] - output[7][i];
tmp1 = output[1][i] + output[6][i];
tmp6 = output[1][i] - output[6][i];
tmp2 = output[2][i] + output[5][i];
tmp5 = output[2][i] - output[5][i];
tmp3 = output[3][i] + output[4][i];
tmp4 = output[3][i] - output[4][i];
tmp10 = tmp0 + tmp3;
tmp13 = tmp0 - tmp3;
tmp11 = tmp1 + tmp2;
tmp12 = tmp1 - tmp2;
output[0][i] = tmp10 + tmp11;
output[4][i] = tmp10 - tmp11;
z1 = (tmp12 + tmp13) * 0.707106781;
output[2][i] = tmp13 + z1;
output[6][i] = tmp13 - z1;
tmp10 = tmp4 + tmp5;
tmp11 = tmp5 + tmp6;
tmp12 = tmp6 + tmp7;
z5 = (tmp10 - tmp12) * 0.382683433;
z2 = 0.541196100 * tmp10 + z5;
z4 = 1.306562965 * tmp12 + z5;
z3 = tmp11 * 0.707106781;
z11 = tmp7 + z3;
z13 = tmp7 - z3;
output[5][i] = z13 + z2;
output[3][i] = z13 - z2;
output[1][i] = z11 + z4;
output[7][i] = z11 - z4;
}
return output;
}, "~A");
c$.quantizeBlock = Clazz.defineMethod (c$, "quantizeBlock", 
function (inputData, divisorsCode) {
var outputData =  Clazz.newIntArray (64, 0);
for (var i = 0, index = 0; i < 8; i++) for (var j = 0; j < 8; j++, index++) outputData[index] = (Math.round (inputData[i][j] * divisorsCode[index]));


return outputData;
}, "~A,~A");
Clazz.defineStatics (c$,
"N", 8,
"NN", 64,
"AANscaleFactor",  Clazz.newDoubleArray (-1, [1.0, 1.387039845, 1.306562965, 1.175875602, 1.0, 0.785694958, 0.541196100, 0.275899379]));
c$ = Clazz.decorateAsClass (function () {
this.bufferPutBits = 0;
this.bufferPutBuffer = 0;
this.imageHeight = 0;
this.imageWidth = 0;
this.dc_matrix0 = null;
this.ac_matrix0 = null;
this.dc_matrix1 = null;
this.ac_matrix1 = null;
this.dc_matrix = null;
this.ac_matrix = null;
this.numOfDCTables = 0;
this.numOfACTables = 0;
Clazz.instantialize (this, arguments);
}, javajs.img, "Huffman");
Clazz.makeConstructor (c$, 
function (width, height) {
this.initHuf ();
this.imageWidth = width;
this.imageHeight = height;
}, "~N,~N");
Clazz.defineMethod (c$, "HuffmanBlockEncoder", 
function (out, zigzag, prec, dcCode, acCode) {
var temp;
var temp2;
var nbits;
var k;
var r;
var i;
this.numOfDCTables = 2;
this.numOfACTables = 2;
var matrixDC = this.dc_matrix[dcCode];
var matrixAC = this.ac_matrix[acCode];
temp = temp2 = zigzag[0] - prec;
if (temp < 0) {
temp = -temp;
temp2--;
}nbits = 0;
while (temp != 0) {
nbits++;
temp >>= 1;
}
this.bufferIt (out, matrixDC[nbits][0], matrixDC[nbits][1]);
if (nbits != 0) {
this.bufferIt (out, temp2, nbits);
}r = 0;
for (k = 1; k < 64; k++) {
if ((temp = zigzag[javajs.img.Huffman.jpegNaturalOrder[k]]) == 0) {
r++;
} else {
while (r > 15) {
this.bufferIt (out, matrixAC[0xF0][0], matrixAC[0xF0][1]);
r -= 16;
}
temp2 = temp;
if (temp < 0) {
temp = -temp;
temp2--;
}nbits = 1;
while ((temp >>= 1) != 0) {
nbits++;
}
i = (r << 4) + nbits;
this.bufferIt (out, matrixAC[i][0], matrixAC[i][1]);
this.bufferIt (out, temp2, nbits);
r = 0;
}}
if (r > 0) {
this.bufferIt (out, matrixAC[0][0], matrixAC[0][1]);
}}, "JU.OC,~A,~N,~N,~N");
Clazz.defineMethod (c$, "bufferIt", 
function (out, code, size) {
var putBuffer = code;
var putBits = this.bufferPutBits;
putBuffer &= (1 << size) - 1;
putBits += size;
putBuffer <<= 24 - putBits;
putBuffer |= this.bufferPutBuffer;
while (putBits >= 8) {
var c = ((putBuffer >> 16) & 0xFF);
out.writeByteAsInt (c);
if (c == 0xFF) {
out.writeByteAsInt (0);
}putBuffer <<= 8;
putBits -= 8;
}
this.bufferPutBuffer = putBuffer;
this.bufferPutBits = putBits;
}, "JU.OC,~N,~N");
Clazz.defineMethod (c$, "flushBuffer", 
function (out) {
var putBuffer = this.bufferPutBuffer;
var putBits = this.bufferPutBits;
while (putBits >= 8) {
var c = ((putBuffer >> 16) & 0xFF);
out.writeByteAsInt (c);
if (c == 0xFF) {
out.writeByteAsInt (0);
}putBuffer <<= 8;
putBits -= 8;
}
if (putBits > 0) {
var c = ((putBuffer >> 16) & 0xFF);
out.writeByteAsInt (c);
}}, "JU.OC");
Clazz.defineMethod (c$, "initHuf", 
 function () {
this.dc_matrix0 =  Clazz.newIntArray (12, 2, 0);
this.dc_matrix1 =  Clazz.newIntArray (12, 2, 0);
this.ac_matrix0 =  Clazz.newIntArray (255, 2, 0);
this.ac_matrix1 =  Clazz.newIntArray (255, 2, 0);
this.dc_matrix = JU.AU.newInt3 (2, -1);
this.ac_matrix = JU.AU.newInt3 (2, -1);
var p;
var l;
var i;
var lastp;
var si;
var code;
var huffsize =  Clazz.newIntArray (257, 0);
var huffcode =  Clazz.newIntArray (257, 0);
p = 0;
for (l = 1; l <= 16; l++) {
for (i = javajs.img.Huffman.bitsDCchrominance[l]; --i >= 0; ) {
huffsize[p++] = l;
}
}
huffsize[p] = 0;
lastp = p;
code = 0;
si = huffsize[0];
p = 0;
while (huffsize[p] != 0) {
while (huffsize[p] == si) {
huffcode[p++] = code;
code++;
}
code <<= 1;
si++;
}
for (p = 0; p < lastp; p++) {
this.dc_matrix1[javajs.img.Huffman.valDCchrominance[p]][0] = huffcode[p];
this.dc_matrix1[javajs.img.Huffman.valDCchrominance[p]][1] = huffsize[p];
}
p = 0;
for (l = 1; l <= 16; l++) {
for (i = javajs.img.Huffman.bitsACchrominance[l]; --i >= 0; ) {
huffsize[p++] = l;
}
}
huffsize[p] = 0;
lastp = p;
code = 0;
si = huffsize[0];
p = 0;
while (huffsize[p] != 0) {
while (huffsize[p] == si) {
huffcode[p++] = code;
code++;
}
code <<= 1;
si++;
}
for (p = 0; p < lastp; p++) {
this.ac_matrix1[javajs.img.Huffman.valACchrominance[p]][0] = huffcode[p];
this.ac_matrix1[javajs.img.Huffman.valACchrominance[p]][1] = huffsize[p];
}
p = 0;
for (l = 1; l <= 16; l++) {
for (i = javajs.img.Huffman.bitsDCluminance[l]; --i >= 0; ) {
huffsize[p++] = l;
}
}
huffsize[p] = 0;
lastp = p;
code = 0;
si = huffsize[0];
p = 0;
while (huffsize[p] != 0) {
while (huffsize[p] == si) {
huffcode[p++] = code;
code++;
}
code <<= 1;
si++;
}
for (p = 0; p < lastp; p++) {
this.dc_matrix0[javajs.img.Huffman.valDCluminance[p]][0] = huffcode[p];
this.dc_matrix0[javajs.img.Huffman.valDCluminance[p]][1] = huffsize[p];
}
p = 0;
for (l = 1; l <= 16; l++) {
for (i = javajs.img.Huffman.bitsACluminance[l]; --i >= 0; ) {
huffsize[p++] = l;
}
}
huffsize[p] = 0;
lastp = p;
code = 0;
si = huffsize[0];
p = 0;
while (huffsize[p] != 0) {
while (huffsize[p] == si) {
huffcode[p++] = code;
code++;
}
code <<= 1;
si++;
}
for (var q = 0; q < lastp; q++) {
this.ac_matrix0[javajs.img.Huffman.valACluminance[q]][0] = huffcode[q];
this.ac_matrix0[javajs.img.Huffman.valACluminance[q]][1] = huffsize[q];
}
this.dc_matrix[0] = this.dc_matrix0;
this.dc_matrix[1] = this.dc_matrix1;
this.ac_matrix[0] = this.ac_matrix0;
this.ac_matrix[1] = this.ac_matrix1;
});
Clazz.defineStatics (c$,
"bitsDCluminance",  Clazz.newIntArray (-1, [0x00, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]),
"valDCluminance",  Clazz.newIntArray (-1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
"bitsDCchrominance",  Clazz.newIntArray (-1, [0x01, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]),
"valDCchrominance",  Clazz.newIntArray (-1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
"bitsACluminance",  Clazz.newIntArray (-1, [0x10, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 0x7d]),
"valACluminance",  Clazz.newIntArray (-1, [0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06, 0x13, 0x51, 0x61, 0x07, 0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xa1, 0x08, 0x23, 0x42, 0xb1, 0xc1, 0x15, 0x52, 0xd1, 0xf0, 0x24, 0x33, 0x62, 0x72, 0x82, 0x09, 0x0a, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe1, 0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa]),
"bitsACchrominance",  Clazz.newIntArray (-1, [0x11, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 0x77]),
"valACchrominance",  Clazz.newIntArray (-1, [0x00, 0x01, 0x02, 0x03, 0x11, 0x04, 0x05, 0x21, 0x31, 0x06, 0x12, 0x41, 0x51, 0x07, 0x61, 0x71, 0x13, 0x22, 0x32, 0x81, 0x08, 0x14, 0x42, 0x91, 0xa1, 0xb1, 0xc1, 0x09, 0x23, 0x33, 0x52, 0xf0, 0x15, 0x62, 0x72, 0xd1, 0x0a, 0x16, 0x24, 0x34, 0xe1, 0x25, 0xf1, 0x17, 0x18, 0x19, 0x1a, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa]),
"jpegNaturalOrder",  Clazz.newIntArray (-1, [0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]));
c$ = Clazz.decorateAsClass (function () {
this.comment = null;
this.imageHeight = 0;
this.imageWidth = 0;
this.blockWidth = null;
this.blockHeight = null;
this.precision = 8;
this.numberOfComponents = 3;
this.components = null;
this.compID = null;
this.hsampFactor = null;
this.vsampFactor = null;
this.qtableNumber = null;
this.dctableNumber = null;
this.actableNumber = null;
this.lastColumnIsDummy = null;
this.lastRowIsDummy = null;
this.ss = 0;
this.se = 63;
this.ah = 0;
this.al = 0;
this.compWidth = null;
this.compHeight = null;
this.maxHsampFactor = 0;
this.maxVsampFactor = 0;
Clazz.instantialize (this, arguments);
}, javajs.img, "JpegObj");
Clazz.prepareFields (c$, function () {
this.compID =  Clazz.newIntArray (-1, [1, 2, 3]);
this.hsampFactor =  Clazz.newIntArray (-1, [1, 1, 1]);
this.vsampFactor =  Clazz.newIntArray (-1, [1, 1, 1]);
this.qtableNumber =  Clazz.newIntArray (-1, [0, 1, 1]);
this.dctableNumber =  Clazz.newIntArray (-1, [0, 1, 1]);
this.actableNumber =  Clazz.newIntArray (-1, [0, 1, 1]);
this.lastColumnIsDummy =  Clazz.newBooleanArray (-1, [false, false, false]);
this.lastRowIsDummy =  Clazz.newBooleanArray (-1, [false, false, false]);
});
Clazz.makeConstructor (c$, 
function () {
this.components = JU.AU.newFloat3 (this.numberOfComponents, -1);
this.compWidth =  Clazz.newIntArray (this.numberOfComponents, 0);
this.compHeight =  Clazz.newIntArray (this.numberOfComponents, 0);
this.blockWidth =  Clazz.newIntArray (this.numberOfComponents, 0);
this.blockHeight =  Clazz.newIntArray (this.numberOfComponents, 0);
});
Clazz.defineMethod (c$, "getYCCArray", 
function (pixels) {
this.maxHsampFactor = 1;
this.maxVsampFactor = 1;
for (var y = 0; y < this.numberOfComponents; y++) {
this.maxHsampFactor = Math.max (this.maxHsampFactor, this.hsampFactor[y]);
this.maxVsampFactor = Math.max (this.maxVsampFactor, this.vsampFactor[y]);
}
for (var y = 0; y < this.numberOfComponents; y++) {
this.compWidth[y] = (Clazz.doubleToInt (((this.imageWidth % 8 != 0) ? (Clazz.doubleToInt (Math.ceil (this.imageWidth / 8.0))) * 8 : this.imageWidth) / this.maxHsampFactor)) * this.hsampFactor[y];
if (this.compWidth[y] != ((Clazz.doubleToInt (this.imageWidth / this.maxHsampFactor)) * this.hsampFactor[y])) {
this.lastColumnIsDummy[y] = true;
}this.blockWidth[y] = Clazz.doubleToInt (Math.ceil (this.compWidth[y] / 8.0));
this.compHeight[y] = (Clazz.doubleToInt (((this.imageHeight % 8 != 0) ? (Clazz.doubleToInt (Math.ceil (this.imageHeight / 8.0))) * 8 : this.imageHeight) / this.maxVsampFactor)) * this.vsampFactor[y];
if (this.compHeight[y] != ((Clazz.doubleToInt (this.imageHeight / this.maxVsampFactor)) * this.vsampFactor[y])) {
this.lastRowIsDummy[y] = true;
}this.blockHeight[y] = Clazz.doubleToInt (Math.ceil (this.compHeight[y] / 8.0));
}
var Y =  Clazz.newFloatArray (this.compHeight[0], this.compWidth[0], 0);
var Cr1 =  Clazz.newFloatArray (this.compHeight[0], this.compWidth[0], 0);
var Cb1 =  Clazz.newFloatArray (this.compHeight[0], this.compWidth[0], 0);
for (var pt = 0, y = 0; y < this.imageHeight; ++y) {
for (var x = 0; x < this.imageWidth; ++x, pt++) {
var p = pixels[pt];
var r = ((p >> 16) & 0xff);
var g = ((p >> 8) & 0xff);
var b = (p & 0xff);
Y[y][x] = ((0.299 * r + 0.587 * g + 0.114 * b));
Cb1[y][x] = 128 + ((-0.16874 * r - 0.33126 * g + 0.5 * b));
Cr1[y][x] = 128 + ((0.5 * r - 0.41869 * g - 0.08131 * b));
}
}
this.components[0] = Y;
this.components[1] = Cb1;
this.components[2] = Cr1;
}, "~A");
});
