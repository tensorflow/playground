Clazz.declarePackage ("JU");
Clazz.load (["JU.InfTree"], "JU.InfBlocks", ["JU.InfCodes"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mode = 0;
this.left = 0;
this.table = 0;
this.index = 0;
this.blens = null;
this.bb = null;
this.tb = null;
this.bl = null;
this.bd = null;
this.tl = null;
this.td = null;
this.tli = null;
this.tdi = null;
this.codes = null;
this.last = 0;
this.bitk = 0;
this.bitb = 0;
this.hufts = null;
this.window = null;
this.end = 0;
this.read = 0;
this.write = 0;
this.check = false;
this.inftree = null;
this.z = null;
Clazz.instantialize (this, arguments);
}, JU, "InfBlocks");
Clazz.prepareFields (c$, function () {
this.bb =  Clazz.newIntArray (1, 0);
this.tb =  Clazz.newIntArray (1, 0);
this.bl =  Clazz.newIntArray (1, 0);
this.bd =  Clazz.newIntArray (1, 0);
this.tli =  Clazz.newIntArray (1, 0);
this.tdi =  Clazz.newIntArray (1, 0);
this.inftree =  new JU.InfTree ();
});
Clazz.makeConstructor (c$, 
function (z, w) {
this.z = z;
this.codes =  new JU.InfCodes (this.z, this);
this.hufts =  Clazz.newIntArray (4320, 0);
this.window =  Clazz.newByteArray (w, 0);
this.end = w;
this.check = (z.istate.wrap == 0) ? false : true;
this.mode = 0;
{
this.tl = Clazz.newArray(1, null);
this.td = Clazz.newArray(1, null);
}this.reset ();
}, "JU.ZStream,~N");
Clazz.defineMethod (c$, "reset", 
function () {
if (this.mode == 6) {
this.codes.free (this.z);
}this.mode = 0;
this.bitk = 0;
this.bitb = 0;
this.read = this.write = 0;
if (this.check) {
this.z.checksum.reset ();
}});
Clazz.defineMethod (c$, "proc", 
function (r) {
var t;
var b;
var k;
var p;
var n;
var q;
var m;
{
p = this.z.next_in_index;
n = this.z.avail_in;
b = this.bitb;
k = this.bitk;
}{
q = this.write;
m = (q < this.read ? this.read - q - 1 : this.end - q);
}while (true) {
switch (this.mode) {
case 0:
while (k < (3)) {
if (n != 0) {
r = 0;
} else {
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
t = (b & 7);
this.last = t & 1;
switch (t >>> 1) {
case 0:
{
b >>>= (3);
k -= (3);
}t = k & 7;
{
b >>>= (t);
k -= (t);
}this.mode = 1;
break;
case 1:
JU.InfTree.inflate_trees_fixed (this.bl, this.bd, this.tl, this.td, this.z);
this.codes.init (this.bl[0], this.bd[0], this.tl[0], 0, this.td[0], 0);
{
b >>>= (3);
k -= (3);
}this.mode = 6;
break;
case 2:
{
b >>>= (3);
k -= (3);
}this.mode = 3;
break;
case 3:
{
b >>>= (3);
k -= (3);
}this.mode = 9;
this.z.msg = "invalid block type";
r = -3;
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}
break;
case 1:
while (k < (32)) {
if (n != 0) {
r = 0;
} else {
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
if ((((~b) >>> 16) & 0xffff) != (b & 0xffff)) {
this.mode = 9;
this.z.msg = "invalid stored block lengths";
r = -3;
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}this.left = (b & 0xffff);
b = k = 0;
this.mode = this.left != 0 ? 2 : (this.last != 0 ? 7 : 0);
break;
case 2:
if (n == 0) {
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}if (m == 0) {
if (q == this.end && this.read != 0) {
q = 0;
m = (q < this.read ? this.read - q - 1 : this.end - q);
}if (m == 0) {
this.write = q;
r = this.inflate_flush (r);
q = this.write;
m = (q < this.read ? this.read - q - 1 : this.end - q);
if (q == this.end && this.read != 0) {
q = 0;
m = (q < this.read ? this.read - q - 1 : this.end - q);
}if (m == 0) {
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}}}r = 0;
t = this.left;
if (t > n) t = n;
if (t > m) t = m;
System.arraycopy (this.z.next_in, p, this.window, q, t);
p += t;
n -= t;
q += t;
m -= t;
if ((this.left -= t) != 0) break;
this.mode = this.last != 0 ? 7 : 0;
break;
case 3:
while (k < (14)) {
if (n != 0) {
r = 0;
} else {
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
this.table = t = (b & 0x3fff);
if ((t & 0x1f) > 29 || ((t >> 5) & 0x1f) > 29) {
this.mode = 9;
this.z.msg = "too many length or distance symbols";
r = -3;
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}t = 258 + (t & 0x1f) + ((t >> 5) & 0x1f);
if (this.blens == null || this.blens.length < t) {
this.blens =  Clazz.newIntArray (t, 0);
} else {
for (var i = 0; i < t; i++) {
this.blens[i] = 0;
}
}{
b >>>= (14);
k -= (14);
}this.index = 0;
this.mode = 4;
case 4:
while (this.index < 4 + (this.table >>> 10)) {
while (k < (3)) {
if (n != 0) {
r = 0;
} else {
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
this.blens[JU.InfBlocks.border[this.index++]] = b & 7;
{
b >>>= (3);
k -= (3);
}}
while (this.index < 19) {
this.blens[JU.InfBlocks.border[this.index++]] = 0;
}
this.bb[0] = 7;
t = this.inftree.inflate_trees_bits (this.blens, this.bb, this.tb, this.hufts, this.z);
if (t != 0) {
r = t;
if (r == -3) {
this.blens = null;
this.mode = 9;
}this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}this.index = 0;
this.mode = 5;
case 5:
while (true) {
t = this.table;
if (!(this.index < 258 + (t & 0x1f) + ((t >> 5) & 0x1f))) {
break;
}var i;
var j;
var c;
t = this.bb[0];
while (k < (t)) {
if (n != 0) {
r = 0;
} else {
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
t = this.hufts[(this.tb[0] + (b & JU.InfBlocks.inflate_mask[t])) * 3 + 1];
c = this.hufts[(this.tb[0] + (b & JU.InfBlocks.inflate_mask[t])) * 3 + 2];
if (c < 16) {
b >>>= (t);
k -= (t);
this.blens[this.index++] = c;
} else {
i = c == 18 ? 7 : c - 14;
j = c == 18 ? 11 : 3;
while (k < (t + i)) {
if (n != 0) {
r = 0;
} else {
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
b >>>= (t);
k -= (t);
j += (b & JU.InfBlocks.inflate_mask[i]);
b >>>= (i);
k -= (i);
i = this.index;
t = this.table;
if (i + j > 258 + (t & 0x1f) + ((t >> 5) & 0x1f) || (c == 16 && i < 1)) {
this.blens = null;
this.mode = 9;
this.z.msg = "invalid bit length repeat";
r = -3;
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}c = c == 16 ? this.blens[i - 1] : 0;
do {
this.blens[i++] = c;
} while (--j != 0);
this.index = i;
}}
this.tb[0] = -1;
{
this.bl[0] = 9;
this.bd[0] = 6;
t = this.table;
t = this.inftree.inflate_trees_dynamic (257 + (t & 0x1f), 1 + ((t >> 5) & 0x1f), this.blens, this.bl, this.bd, this.tli, this.tdi, this.hufts, this.z);
if (t != 0) {
if (t == -3) {
this.blens = null;
this.mode = 9;
}r = t;
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}this.codes.init (this.bl[0], this.bd[0], this.hufts, this.tli[0], this.hufts, this.tdi[0]);
}this.mode = 6;
case 6:
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
if ((r = this.codes.proc (r)) != 1) {
return this.inflate_flush (r);
}r = 0;
this.codes.free (this.z);
p = this.z.next_in_index;
n = this.z.avail_in;
b = this.bitb;
k = this.bitk;
q = this.write;
m = (q < this.read ? this.read - q - 1 : this.end - q);
if (this.last == 0) {
this.mode = 0;
break;
}this.mode = 7;
case 7:
this.write = q;
r = this.inflate_flush (r);
q = this.write;
m = (q < this.read ? this.read - q - 1 : this.end - q);
if (this.read != this.write) {
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}this.mode = 8;
case 8:
r = 1;
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
case 9:
r = -3;
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
default:
r = -2;
this.bitb = b;
this.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.write = q;
return this.inflate_flush (r);
}
}
}, "~N");
Clazz.defineMethod (c$, "free", 
function () {
this.reset ();
this.window = null;
this.hufts = null;
});
Clazz.defineMethod (c$, "set_dictionary", 
function (d, start, n) {
System.arraycopy (d, start, this.window, 0, n);
this.read = this.write = n;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "sync_point", 
function () {
return this.mode == 1 ? 1 : 0;
});
Clazz.defineMethod (c$, "inflate_flush", 
function (r) {
var n;
var p;
var q;
p = this.z.next_out_index;
q = this.read;
n = ((q <= this.write ? this.write : this.end) - q);
if (n > this.z.avail_out) n = this.z.avail_out;
if (n != 0 && r == -5) r = 0;
this.z.avail_out -= n;
this.z.total_out += n;
if (this.check && n > 0) {
this.z.checksum.update (this.window, q, n);
}System.arraycopy (this.window, q, this.z.next_out, p, n);
p += n;
q += n;
if (q == this.end) {
q = 0;
if (this.write == this.end) this.write = 0;
n = this.write - q;
if (n > this.z.avail_out) n = this.z.avail_out;
if (n != 0 && r == -5) r = 0;
this.z.avail_out -= n;
this.z.total_out += n;
if (this.check && n > 0) {
this.z.checksum.update (this.window, q, n);
}System.arraycopy (this.window, q, this.z.next_out, p, n);
p += n;
q += n;
}this.z.next_out_index = p;
this.read = q;
return r;
}, "~N");
Clazz.defineStatics (c$,
"MANY", 1440,
"inflate_mask",  Clazz.newIntArray (-1, [0x00000000, 0x00000001, 0x00000003, 0x00000007, 0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f, 0x000000ff, 0x000001ff, 0x000003ff, 0x000007ff, 0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff, 0x0000ffff]),
"border",  Clazz.newIntArray (-1, [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
"Z_OK", 0,
"Z_STREAM_END", 1,
"Z_STREAM_ERROR", -2,
"Z_DATA_ERROR", -3,
"Z_BUF_ERROR", -5,
"TYPE", 0,
"LENS", 1,
"STORED", 2,
"TABLE", 3,
"BTREE", 4,
"DTREE", 5,
"CODES", 6,
"DRY", 7,
"DONE", 8,
"BAD", 9);
});
