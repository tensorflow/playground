Clazz.declarePackage ("JU");
c$ = Clazz.decorateAsClass (function () {
this.mode = 0;
this.len = 0;
this.tree = null;
this.tree_index = 0;
this.need = 0;
this.lit = 0;
this.get = 0;
this.dist = 0;
this.lbits = 0;
this.dbits = 0;
this.ltree = null;
this.ltree_index = 0;
this.dtree = null;
this.dtree_index = 0;
this.z = null;
this.s = null;
Clazz.instantialize (this, arguments);
}, JU, "InfCodes");
Clazz.makeConstructor (c$, 
function (z, s) {
this.z = z;
this.s = s;
}, "JU.ZStream,JU.InfBlocks");
Clazz.defineMethod (c$, "init", 
function (bl, bd, tl, tl_index, td, td_index) {
this.mode = 0;
this.lbits = bl;
this.dbits = bd;
this.ltree = tl;
this.ltree_index = tl_index;
this.dtree = td;
this.dtree_index = td_index;
this.tree = null;
}, "~N,~N,~A,~N,~A,~N");
Clazz.defineMethod (c$, "proc", 
function (r) {
var j;
var tindex;
var e;
var b = 0;
var k = 0;
var p = 0;
var n;
var q;
var m;
var f;
p = this.z.next_in_index;
n = this.z.avail_in;
b = this.s.bitb;
k = this.s.bitk;
q = this.s.write;
m = q < this.s.read ? this.s.read - q - 1 : this.s.end - q;
while (true) {
switch (this.mode) {
case 0:
if (m >= 258 && n >= 10) {
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
r = this.inflate_fast (this.lbits, this.dbits, this.ltree, this.ltree_index, this.dtree, this.dtree_index, this.s, this.z);
p = this.z.next_in_index;
n = this.z.avail_in;
b = this.s.bitb;
k = this.s.bitk;
q = this.s.write;
m = q < this.s.read ? this.s.read - q - 1 : this.s.end - q;
if (r != 0) {
this.mode = r == 1 ? 7 : 9;
break;
}}this.need = this.lbits;
this.tree = this.ltree;
this.tree_index = this.ltree_index;
this.mode = 1;
case 1:
j = this.need;
while (k < (j)) {
if (n != 0) r = 0;
 else {
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
tindex = (this.tree_index + (b & JU.InfCodes.inflate_mask[j])) * 3;
b >>>= (this.tree[tindex + 1]);
k -= (this.tree[tindex + 1]);
e = this.tree[tindex];
if (e == 0) {
this.lit = this.tree[tindex + 2];
this.mode = 6;
break;
}if ((e & 16) != 0) {
this.get = e & 15;
this.len = this.tree[tindex + 2];
this.mode = 2;
break;
}if ((e & 64) == 0) {
this.need = e;
this.tree_index = Clazz.doubleToInt (tindex / 3) + this.tree[tindex + 2];
break;
}if ((e & 32) != 0) {
this.mode = 7;
break;
}this.mode = 9;
this.z.msg = "invalid literal/length code";
r = -3;
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
case 2:
j = this.get;
while (k < (j)) {
if (n != 0) r = 0;
 else {
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
this.len += (b & JU.InfCodes.inflate_mask[j]);
b >>= j;
k -= j;
this.need = this.dbits;
this.tree = this.dtree;
this.tree_index = this.dtree_index;
this.mode = 3;
case 3:
j = this.need;
while (k < (j)) {
if (n != 0) r = 0;
 else {
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
tindex = (this.tree_index + (b & JU.InfCodes.inflate_mask[j])) * 3;
b >>= this.tree[tindex + 1];
k -= this.tree[tindex + 1];
e = (this.tree[tindex]);
if ((e & 16) != 0) {
this.get = e & 15;
this.dist = this.tree[tindex + 2];
this.mode = 4;
break;
}if ((e & 64) == 0) {
this.need = e;
this.tree_index = Clazz.doubleToInt (tindex / 3) + this.tree[tindex + 2];
break;
}this.mode = 9;
this.z.msg = "invalid distance code";
r = -3;
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
case 4:
j = this.get;
while (k < (j)) {
if (n != 0) r = 0;
 else {
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
}n--;
b |= (this.z.next_in[p++] & 0xff) << k;
k += 8;
}
this.dist += (b & JU.InfCodes.inflate_mask[j]);
b >>= j;
k -= j;
this.mode = 5;
case 5:
f = q - this.dist;
while (f < 0) {
f += this.s.end;
}
while (this.len != 0) {
if (m == 0) {
if (q == this.s.end && this.s.read != 0) {
q = 0;
m = q < this.s.read ? this.s.read - q - 1 : this.s.end - q;
}if (m == 0) {
this.s.write = q;
r = this.s.inflate_flush (r);
q = this.s.write;
m = q < this.s.read ? this.s.read - q - 1 : this.s.end - q;
if (q == this.s.end && this.s.read != 0) {
q = 0;
m = q < this.s.read ? this.s.read - q - 1 : this.s.end - q;
}if (m == 0) {
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
}}}this.s.window[q++] = this.s.window[f++];
m--;
if (f == this.s.end) f = 0;
this.len--;
}
this.mode = 0;
break;
case 6:
if (m == 0) {
if (q == this.s.end && this.s.read != 0) {
q = 0;
m = q < this.s.read ? this.s.read - q - 1 : this.s.end - q;
}if (m == 0) {
this.s.write = q;
r = this.s.inflate_flush (r);
q = this.s.write;
m = q < this.s.read ? this.s.read - q - 1 : this.s.end - q;
if (q == this.s.end && this.s.read != 0) {
q = 0;
m = q < this.s.read ? this.s.read - q - 1 : this.s.end - q;
}if (m == 0) {
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
}}}r = 0;
this.s.window[q++] = this.lit;
m--;
this.mode = 0;
break;
case 7:
if (k > 7) {
k -= 8;
n++;
p--;
}this.s.write = q;
r = this.s.inflate_flush (r);
q = this.s.write;
m = q < this.s.read ? this.s.read - q - 1 : this.s.end - q;
if (this.s.read != this.s.write) {
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
}this.mode = 8;
case 8:
r = 1;
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
case 9:
r = -3;
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
default:
r = -2;
this.s.bitb = b;
this.s.bitk = k;
this.z.avail_in = n;
this.z.total_in += p - this.z.next_in_index;
this.z.next_in_index = p;
this.s.write = q;
return this.s.inflate_flush (r);
}
}
}, "~N");
Clazz.defineMethod (c$, "free", 
function (z) {
}, "JU.ZStream");
Clazz.defineMethod (c$, "inflate_fast", 
function (bl, bd, tl, tl_index, td, td_index, s, z) {
var t;
var tp;
var tp_index;
var e;
var b;
var k;
var p;
var n;
var q;
var m;
var ml;
var md;
var c;
var d;
var r;
var tp_index_t_3;
p = z.next_in_index;
n = z.avail_in;
b = s.bitb;
k = s.bitk;
q = s.write;
m = q < s.read ? s.read - q - 1 : s.end - q;
ml = JU.InfCodes.inflate_mask[bl];
md = JU.InfCodes.inflate_mask[bd];
do {
while (k < (20)) {
n--;
b |= (z.next_in[p++] & 0xff) << k;
k += 8;
}
t = b & ml;
tp = tl;
tp_index = tl_index;
tp_index_t_3 = (tp_index + t) * 3;
if ((e = tp[tp_index_t_3]) == 0) {
b >>= (tp[tp_index_t_3 + 1]);
k -= (tp[tp_index_t_3 + 1]);
s.window[q++] = tp[tp_index_t_3 + 2];
m--;
continue;
}do {
b >>= (tp[tp_index_t_3 + 1]);
k -= (tp[tp_index_t_3 + 1]);
if ((e & 16) != 0) {
e &= 15;
c = tp[tp_index_t_3 + 2] + (b & JU.InfCodes.inflate_mask[e]);
b >>= e;
k -= e;
while (k < (15)) {
n--;
b |= (z.next_in[p++] & 0xff) << k;
k += 8;
}
t = b & md;
tp = td;
tp_index = td_index;
tp_index_t_3 = (tp_index + t) * 3;
e = tp[tp_index_t_3];
do {
b >>= (tp[tp_index_t_3 + 1]);
k -= (tp[tp_index_t_3 + 1]);
if ((e & 16) != 0) {
e &= 15;
while (k < (e)) {
n--;
b |= (z.next_in[p++] & 0xff) << k;
k += 8;
}
d = tp[tp_index_t_3 + 2] + (b & JU.InfCodes.inflate_mask[e]);
b >>= (e);
k -= (e);
m -= c;
if (q >= d) {
r = q - d;
if (q - r > 0 && 2 > (q - r)) {
s.window[q++] = s.window[r++];
s.window[q++] = s.window[r++];
c -= 2;
} else {
System.arraycopy (s.window, r, s.window, q, 2);
q += 2;
r += 2;
c -= 2;
}} else {
r = q - d;
do {
r += s.end;
} while (r < 0);
e = s.end - r;
if (c > e) {
c -= e;
if (q - r > 0 && e > (q - r)) {
do {
s.window[q++] = s.window[r++];
} while (--e != 0);
} else {
System.arraycopy (s.window, r, s.window, q, e);
q += e;
r += e;
e = 0;
}r = 0;
}}if (q - r > 0 && c > (q - r)) {
do {
s.window[q++] = s.window[r++];
} while (--c != 0);
} else {
System.arraycopy (s.window, r, s.window, q, c);
q += c;
r += c;
c = 0;
}break;
} else if ((e & 64) == 0) {
t += tp[tp_index_t_3 + 2];
t += (b & JU.InfCodes.inflate_mask[e]);
tp_index_t_3 = (tp_index + t) * 3;
e = tp[tp_index_t_3];
} else {
z.msg = "invalid distance code";
c = z.avail_in - n;
c = (k >> 3) < c ? k >> 3 : c;
n += c;
p -= c;
k -= c << 3;
s.bitb = b;
s.bitk = k;
z.avail_in = n;
z.total_in += p - z.next_in_index;
z.next_in_index = p;
s.write = q;
return -3;
}} while (true);
break;
}if ((e & 64) == 0) {
t += tp[tp_index_t_3 + 2];
t += (b & JU.InfCodes.inflate_mask[e]);
tp_index_t_3 = (tp_index + t) * 3;
if ((e = tp[tp_index_t_3]) == 0) {
b >>= (tp[tp_index_t_3 + 1]);
k -= (tp[tp_index_t_3 + 1]);
s.window[q++] = tp[tp_index_t_3 + 2];
m--;
break;
}} else if ((e & 32) != 0) {
c = z.avail_in - n;
c = (k >> 3) < c ? k >> 3 : c;
n += c;
p -= c;
k -= c << 3;
s.bitb = b;
s.bitk = k;
z.avail_in = n;
z.total_in += p - z.next_in_index;
z.next_in_index = p;
s.write = q;
return 1;
} else {
z.msg = "invalid literal/length code";
c = z.avail_in - n;
c = (k >> 3) < c ? k >> 3 : c;
n += c;
p -= c;
k -= c << 3;
s.bitb = b;
s.bitk = k;
z.avail_in = n;
z.total_in += p - z.next_in_index;
z.next_in_index = p;
s.write = q;
return -3;
}} while (true);
} while (m >= 258 && n >= 10);
c = z.avail_in - n;
c = (k >> 3) < c ? k >> 3 : c;
n += c;
p -= c;
k -= c << 3;
s.bitb = b;
s.bitk = k;
z.avail_in = n;
z.total_in += p - z.next_in_index;
z.next_in_index = p;
s.write = q;
return 0;
}, "~N,~N,~A,~N,~A,~N,JU.InfBlocks,JU.ZStream");
Clazz.defineStatics (c$,
"inflate_mask",  Clazz.newIntArray (-1, [0x00000000, 0x00000001, 0x00000003, 0x00000007, 0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f, 0x000000ff, 0x000001ff, 0x000003ff, 0x000007ff, 0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff, 0x0000ffff]),
"Z_OK", 0,
"Z_STREAM_END", 1,
"Z_STREAM_ERROR", -2,
"Z_DATA_ERROR", -3,
"START", 0,
"LEN", 1,
"LENEXT", 2,
"DIST", 3,
"DISTEXT", 4,
"COPY", 5,
"LIT", 6,
"WASH", 7,
"END", 8,
"BADCODE", 9);
