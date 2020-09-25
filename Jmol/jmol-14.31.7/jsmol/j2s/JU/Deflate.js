Clazz.declarePackage ("JU");
Clazz.load (["JU.Tree"], "JU.Deflate", ["JU.CRC32", "$.GZIPHeader", "$.StaticTree"], function () {
c$ = Clazz.decorateAsClass (function () {
this.strm = null;
this.status = 0;
this.pending_buf = null;
this.pending_buf_size = 0;
this.pending_out = 0;
this.pending = 0;
this.wrap = 1;
this.data_type = 0;
this.method = 0;
this.last_flush = 0;
this.w_size = 0;
this.w_bits = 0;
this.w_mask = 0;
this.window = null;
this.window_size = 0;
this.prev = null;
this.head = null;
this.ins_h = 0;
this.hash_size = 0;
this.hash_bits = 0;
this.hash_mask = 0;
this.hash_shift = 0;
this.block_start = 0;
this.match_length = 0;
this.prev_match = 0;
this.match_available = 0;
this.strstart = 0;
this.match_start = 0;
this.lookahead = 0;
this.prev_length = 0;
this.max_chain_length = 0;
this.max_lazy_match = 0;
this.level = 0;
this.strategy = 0;
this.good_match = 0;
this.nice_match = 0;
this.dyn_ltree = null;
this.dyn_dtree = null;
this.bl_tree = null;
this.l_desc = null;
this.d_desc = null;
this.bl_desc = null;
this.bl_count = null;
this.heap = null;
this.heap_len = 0;
this.heap_max = 0;
this.depth = null;
this.l_buf = 0;
this.lit_bufsize = 0;
this.last_lit = 0;
this.d_buf = 0;
this.opt_len = 0;
this.static_len = 0;
this.matches = 0;
this.last_eob_len = 0;
this.bi_buf = 0;
this.bi_valid = 0;
this.gheader = null;
Clazz.instantialize (this, arguments);
}, JU, "Deflate");
Clazz.prepareFields (c$, function () {
this.l_desc =  new JU.Tree ();
this.d_desc =  new JU.Tree ();
this.bl_desc =  new JU.Tree ();
this.bl_count =  Clazz.newShortArray (16, 0);
this.heap =  Clazz.newIntArray (573, 0);
this.depth =  Clazz.newByteArray (573, 0);
});
Clazz.makeConstructor (c$, 
function (strm) {
this.strm = strm;
this.dyn_ltree =  Clazz.newShortArray (1146, 0);
this.dyn_dtree =  Clazz.newShortArray (122, 0);
this.bl_tree =  Clazz.newShortArray (78, 0);
}, "JU.ZStream");
Clazz.defineMethod (c$, "deflateInit", 
function (level) {
return this.deflateInit2 (level, 15);
}, "~N");
Clazz.defineMethod (c$, "deflateInit2", 
function (level, bits) {
return this.deflateInit5 (level, 8, bits, 8, 0);
}, "~N,~N");
Clazz.defineMethod (c$, "deflateInit3", 
function (level, bits, memlevel) {
return this.deflateInit5 (level, 8, bits, memlevel, 0);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "lm_init", 
function () {
this.window_size = 2 * this.w_size;
this.head[this.hash_size - 1] = 0;
for (var i = 0; i < this.hash_size - 1; i++) {
this.head[i] = 0;
}
this.max_lazy_match = JU.Deflate.config_table[this.level].max_lazy;
this.good_match = JU.Deflate.config_table[this.level].good_length;
this.nice_match = JU.Deflate.config_table[this.level].nice_length;
this.max_chain_length = JU.Deflate.config_table[this.level].max_chain;
this.strstart = 0;
this.block_start = 0;
this.lookahead = 0;
this.match_length = this.prev_length = 2;
this.match_available = 0;
this.ins_h = 0;
});
Clazz.defineMethod (c$, "tr_init", 
function () {
this.l_desc.dyn_tree = this.dyn_ltree;
this.l_desc.stat_desc = JU.StaticTree.static_l_desc;
this.d_desc.dyn_tree = this.dyn_dtree;
this.d_desc.stat_desc = JU.StaticTree.static_d_desc;
this.bl_desc.dyn_tree = this.bl_tree;
this.bl_desc.stat_desc = JU.StaticTree.static_bl_desc;
this.bi_buf = 0;
this.bi_valid = 0;
this.last_eob_len = 8;
this.init_block ();
});
Clazz.defineMethod (c$, "init_block", 
function () {
for (var i = 0; i < 286; i++) this.dyn_ltree[i * 2] = 0;

for (var i = 0; i < 30; i++) this.dyn_dtree[i * 2] = 0;

for (var i = 0; i < 19; i++) this.bl_tree[i * 2] = 0;

this.dyn_ltree[512] = 1;
this.opt_len = this.static_len = 0;
this.last_lit = this.matches = 0;
});
Clazz.defineMethod (c$, "pqdownheap", 
function (tree, k) {
var v = this.heap[k];
var j = k << 1;
while (j <= this.heap_len) {
if (j < this.heap_len && JU.Deflate.smaller (tree, this.heap[j + 1], this.heap[j], this.depth)) {
j++;
}if (JU.Deflate.smaller (tree, v, this.heap[j], this.depth)) break;
this.heap[k] = this.heap[j];
k = j;
j <<= 1;
}
this.heap[k] = v;
}, "~A,~N");
c$.smaller = Clazz.defineMethod (c$, "smaller", 
function (tree, n, m, depth) {
var tn2 = tree[n * 2];
var tm2 = tree[m * 2];
return (tn2 < tm2 || (tn2 == tm2 && depth[n] <= depth[m]));
}, "~A,~N,~N,~A");
Clazz.defineMethod (c$, "scan_tree", 
function (tree, max_code) {
var n;
var prevlen = -1;
var curlen;
var nextlen = tree[1];
var count = 0;
var max_count = 7;
var min_count = 4;
if (nextlen == 0) {
max_count = 138;
min_count = 3;
}tree[(max_code + 1) * 2 + 1] = 0xffff;
for (n = 0; n <= max_code; n++) {
curlen = nextlen;
nextlen = tree[(n + 1) * 2 + 1];
if (++count < max_count && curlen == nextlen) {
continue;
} else if (count < min_count) {
this.bl_tree[curlen * 2] += count;
} else if (curlen != 0) {
if (curlen != prevlen) this.bl_tree[curlen * 2]++;
this.bl_tree[32]++;
} else if (count <= 10) {
this.bl_tree[34]++;
} else {
this.bl_tree[36]++;
}count = 0;
prevlen = curlen;
if (nextlen == 0) {
max_count = 138;
min_count = 3;
} else if (curlen == nextlen) {
max_count = 6;
min_count = 3;
} else {
max_count = 7;
min_count = 4;
}}
}, "~A,~N");
Clazz.defineMethod (c$, "build_bl_tree", 
function () {
var max_blindex;
this.scan_tree (this.dyn_ltree, this.l_desc.max_code);
this.scan_tree (this.dyn_dtree, this.d_desc.max_code);
this.bl_desc.build_tree (this);
for (max_blindex = 18; max_blindex >= 3; max_blindex--) {
if (this.bl_tree[JU.Tree.bl_order[max_blindex] * 2 + 1] != 0) break;
}
this.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
return max_blindex;
});
Clazz.defineMethod (c$, "send_all_trees", 
function (lcodes, dcodes, blcodes) {
var rank;
this.send_bits (lcodes - 257, 5);
this.send_bits (dcodes - 1, 5);
this.send_bits (blcodes - 4, 4);
for (rank = 0; rank < blcodes; rank++) {
this.send_bits (this.bl_tree[JU.Tree.bl_order[rank] * 2 + 1], 3);
}
this.send_tree (this.dyn_ltree, lcodes - 1);
this.send_tree (this.dyn_dtree, dcodes - 1);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "send_tree", 
function (tree, max_code) {
var n;
var prevlen = -1;
var curlen;
var nextlen = tree[1];
var count = 0;
var max_count = 7;
var min_count = 4;
if (nextlen == 0) {
max_count = 138;
min_count = 3;
}for (n = 0; n <= max_code; n++) {
curlen = nextlen;
nextlen = tree[(n + 1) * 2 + 1];
if (++count < max_count && curlen == nextlen) {
continue;
} else if (count < min_count) {
do {
this.send_code (curlen, this.bl_tree);
} while (--count != 0);
} else if (curlen != 0) {
if (curlen != prevlen) {
this.send_code (curlen, this.bl_tree);
count--;
}this.send_code (16, this.bl_tree);
this.send_bits (count - 3, 2);
} else if (count <= 10) {
this.send_code (17, this.bl_tree);
this.send_bits (count - 3, 3);
} else {
this.send_code (18, this.bl_tree);
this.send_bits (count - 11, 7);
}count = 0;
prevlen = curlen;
if (nextlen == 0) {
max_count = 138;
min_count = 3;
} else if (curlen == nextlen) {
max_count = 6;
min_count = 3;
} else {
max_count = 7;
min_count = 4;
}}
}, "~A,~N");
Clazz.defineMethod (c$, "put_byte", 
function (p, start, len) {
System.arraycopy (p, start, this.pending_buf, this.pending, len);
this.pending += len;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "put_byteB", 
function (c) {
{
this.pending_buf[this.pending++] = c&0xff;
}}, "~N");
Clazz.defineMethod (c$, "put_short", 
function (w) {
this.put_byteB ((w));
this.put_byteB ((w >>> 8));
}, "~N");
Clazz.defineMethod (c$, "putShortMSB", 
function (b) {
this.put_byteB ((b >> 8));
this.put_byteB ((b));
}, "~N");
Clazz.defineMethod (c$, "send_code", 
function (c, tree) {
var c2 = c * 2;
this.send_bits ((tree[c2] & 0xffff), (tree[c2 + 1] & 0xffff));
}, "~N,~A");
Clazz.defineMethod (c$, "send_bits", 
function (value, length) {
var len = length;
if (this.bi_valid > 16 - len) {
var val = value;
this.bi_buf |= ((val << this.bi_valid) & 0xffff);
this.put_short (this.bi_buf);
this.bi_buf = ((val >>> (16 - this.bi_valid)) & 0xffff);
this.bi_valid += len - 16;
} else {
this.bi_buf |= (((value) << this.bi_valid) & 0xffff);
this.bi_valid += len;
}}, "~N,~N");
Clazz.defineMethod (c$, "_tr_align", 
function () {
this.send_bits (2, 3);
this.send_code (256, JU.StaticTree.static_ltree);
this.bi_flush ();
if (1 + this.last_eob_len + 10 - this.bi_valid < 9) {
this.send_bits (2, 3);
this.send_code (256, JU.StaticTree.static_ltree);
this.bi_flush ();
}this.last_eob_len = 7;
});
Clazz.defineMethod (c$, "_tr_tally", 
function (dist, lc) {
this.pending_buf[this.d_buf + this.last_lit * 2] = (dist >>> 8);
this.pending_buf[this.d_buf + this.last_lit * 2 + 1] = dist;
this.pending_buf[this.l_buf + this.last_lit] = lc;
this.last_lit++;
if (dist == 0) {
this.dyn_ltree[lc * 2]++;
} else {
this.matches++;
dist--;
this.dyn_ltree[(JU.Tree._length_code[lc] + 256 + 1) * 2]++;
this.dyn_dtree[JU.Tree.d_code (dist) * 2]++;
}if ((this.last_lit & 0x1fff) == 0 && this.level > 2) {
var out_length = this.last_lit * 8;
var in_length = this.strstart - this.block_start;
var dcode;
for (dcode = 0; dcode < 30; dcode++) {
out_length += this.dyn_dtree[dcode * 2] * (5 + JU.Tree.extra_dbits[dcode]);
}
out_length >>>= 3;
if ((this.matches < (Clazz.doubleToInt (this.last_lit / 2))) && out_length < Clazz.doubleToInt (in_length / 2)) return true;
}return (this.last_lit == this.lit_bufsize - 1);
}, "~N,~N");
Clazz.defineMethod (c$, "compress_block", 
function (ltree, dtree) {
var dist;
var lc;
var lx = 0;
var code;
var extra;
if (this.last_lit != 0) {
do {
dist = ((this.pending_buf[this.d_buf + lx * 2] << 8) & 0xff00) | (this.pending_buf[this.d_buf + lx * 2 + 1] & 0xff);
lc = (this.pending_buf[this.l_buf + lx]) & 0xff;
lx++;
if (dist == 0) {
this.send_code (lc, ltree);
} else {
code = JU.Tree._length_code[lc];
this.send_code (code + 256 + 1, ltree);
extra = JU.Tree.extra_lbits[code];
if (extra != 0) {
lc -= JU.Tree.base_length[code];
this.send_bits (lc, extra);
}dist--;
code = JU.Tree.d_code (dist);
this.send_code (code, dtree);
extra = JU.Tree.extra_dbits[code];
if (extra != 0) {
dist -= JU.Tree.base_dist[code];
this.send_bits (dist, extra);
}}} while (lx < this.last_lit);
}this.send_code (256, ltree);
this.last_eob_len = ltree[513];
}, "~A,~A");
Clazz.defineMethod (c$, "set_data_type", 
function () {
var n = 0;
var ascii_freq = 0;
var bin_freq = 0;
while (n < 7) {
bin_freq += this.dyn_ltree[n * 2];
n++;
}
while (n < 128) {
ascii_freq += this.dyn_ltree[n * 2];
n++;
}
while (n < 256) {
bin_freq += this.dyn_ltree[n * 2];
n++;
}
this.data_type = (bin_freq > (ascii_freq >>> 2) ? 0 : 1);
});
Clazz.defineMethod (c$, "bi_flush", 
function () {
if (this.bi_valid == 16) {
this.put_short (this.bi_buf);
this.bi_buf = 0;
this.bi_valid = 0;
} else if (this.bi_valid >= 8) {
this.put_byteB (this.bi_buf);
this.bi_buf >>>= 8;
this.bi_valid -= 8;
}});
Clazz.defineMethod (c$, "bi_windup", 
function () {
if (this.bi_valid > 8) {
this.put_short (this.bi_buf);
} else if (this.bi_valid > 0) {
this.put_byteB (this.bi_buf);
}this.bi_buf = 0;
this.bi_valid = 0;
});
Clazz.defineMethod (c$, "copy_block", 
function (buf, len, header) {
this.bi_windup ();
this.last_eob_len = 8;
if (header) {
this.put_short (len);
this.put_short (~len);
}this.put_byte (this.window, buf, len);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "flush_block_only", 
function (eof) {
this._tr_flush_block (this.block_start >= 0 ? this.block_start : -1, this.strstart - this.block_start, eof);
this.block_start = this.strstart;
this.strm.flush_pending ();
}, "~B");
Clazz.defineMethod (c$, "deflate_stored", 
function (flush) {
var max_block_size = 0xffff;
var max_start;
if (max_block_size > this.pending_buf_size - 5) {
max_block_size = this.pending_buf_size - 5;
}while (true) {
if (this.lookahead <= 1) {
this.fill_window ();
if (this.lookahead == 0 && flush == 0) return 0;
if (this.lookahead == 0) break;
}this.strstart += this.lookahead;
this.lookahead = 0;
max_start = this.block_start + max_block_size;
if (this.strstart == 0 || this.strstart >= max_start) {
this.lookahead = (this.strstart - max_start);
this.strstart = max_start;
this.flush_block_only (false);
if (this.strm.avail_out == 0) return 0;
}if (this.strstart - this.block_start >= this.w_size - 262) {
this.flush_block_only (false);
if (this.strm.avail_out == 0) return 0;
}}
this.flush_block_only (flush == 4);
if (this.strm.avail_out == 0) return (flush == 4) ? 2 : 0;
return flush == 4 ? 3 : 1;
}, "~N");
Clazz.defineMethod (c$, "_tr_stored_block", 
function (buf, stored_len, eof) {
this.send_bits ((0) + (eof ? 1 : 0), 3);
this.copy_block (buf, stored_len, true);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "_tr_flush_block", 
function (buf, stored_len, eof) {
var opt_lenb;
var static_lenb;
var max_blindex = 0;
if (this.level > 0) {
if (this.data_type == 2) this.set_data_type ();
this.l_desc.build_tree (this);
this.d_desc.build_tree (this);
max_blindex = this.build_bl_tree ();
opt_lenb = (this.opt_len + 3 + 7) >>> 3;
static_lenb = (this.static_len + 3 + 7) >>> 3;
if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
} else {
opt_lenb = static_lenb = stored_len + 5;
}if (stored_len + 4 <= opt_lenb && buf != -1) {
this._tr_stored_block (buf, stored_len, eof);
} else if (static_lenb == opt_lenb) {
this.send_bits ((2) + (eof ? 1 : 0), 3);
this.compress_block (JU.StaticTree.static_ltree, JU.StaticTree.static_dtree);
} else {
this.send_bits ((4) + (eof ? 1 : 0), 3);
this.send_all_trees (this.l_desc.max_code + 1, this.d_desc.max_code + 1, max_blindex + 1);
this.compress_block (this.dyn_ltree, this.dyn_dtree);
}this.init_block ();
if (eof) {
this.bi_windup ();
}}, "~N,~N,~B");
Clazz.defineMethod (c$, "fill_window", 
function () {
var n;
var m;
var p;
var more;
do {
more = (this.window_size - this.lookahead - this.strstart);
if (more == 0 && this.strstart == 0 && this.lookahead == 0) {
more = this.w_size;
} else if (more == -1) {
more--;
} else if (this.strstart >= this.w_size + this.w_size - 262) {
System.arraycopy (this.window, this.w_size, this.window, 0, this.w_size);
this.match_start -= this.w_size;
this.strstart -= this.w_size;
this.block_start -= this.w_size;
n = this.hash_size;
p = n;
do {
m = (this.head[--p] & 0xffff);
this.head[p] = (m >= this.w_size ? (m - this.w_size) : 0);
} while (--n != 0);
n = this.w_size;
p = n;
do {
m = (this.prev[--p] & 0xffff);
this.prev[p] = (m >= this.w_size ? (m - this.w_size) : 0);
} while (--n != 0);
more += this.w_size;
}if (this.strm.avail_in == 0) return;
n = this.strm.read_buf (this.window, this.strstart + this.lookahead, more);
this.lookahead += n;
if (this.lookahead >= 3) {
this.ins_h = this.window[this.strstart] & 0xff;
this.ins_h = (((this.ins_h) << this.hash_shift) ^ (this.window[this.strstart + 1] & 0xff)) & this.hash_mask;
}} while (this.lookahead < 262 && this.strm.avail_in != 0);
});
Clazz.defineMethod (c$, "deflate_fast", 
function (flush) {
var hash_head = 0;
var bflush;
while (true) {
if (this.lookahead < 262) {
this.fill_window ();
if (this.lookahead < 262 && flush == 0) {
return 0;
}if (this.lookahead == 0) break;
}if (this.lookahead >= 3) {
this.ins_h = (((this.ins_h) << this.hash_shift) ^ (this.window[(this.strstart) + (2)] & 0xff)) & this.hash_mask;
hash_head = (this.head[this.ins_h] & 0xffff);
this.prev[this.strstart & this.w_mask] = this.head[this.ins_h];
this.head[this.ins_h] = this.strstart;
}if (hash_head != 0 && ((this.strstart - hash_head) & 0xffff) <= this.w_size - 262) {
if (this.strategy != 2) {
this.match_length = this.longest_match (hash_head);
}}if (this.match_length >= 3) {
bflush = this._tr_tally (this.strstart - this.match_start, this.match_length - 3);
this.lookahead -= this.match_length;
if (this.match_length <= this.max_lazy_match && this.lookahead >= 3) {
this.match_length--;
do {
this.strstart++;
this.ins_h = ((this.ins_h << this.hash_shift) ^ (this.window[(this.strstart) + (2)] & 0xff)) & this.hash_mask;
hash_head = (this.head[this.ins_h] & 0xffff);
this.prev[this.strstart & this.w_mask] = this.head[this.ins_h];
this.head[this.ins_h] = this.strstart;
} while (--this.match_length != 0);
this.strstart++;
} else {
this.strstart += this.match_length;
this.match_length = 0;
this.ins_h = this.window[this.strstart] & 0xff;
this.ins_h = (((this.ins_h) << this.hash_shift) ^ (this.window[this.strstart + 1] & 0xff)) & this.hash_mask;
}} else {
bflush = this._tr_tally (0, this.window[this.strstart] & 0xff);
this.lookahead--;
this.strstart++;
}if (bflush) {
this.flush_block_only (false);
if (this.strm.avail_out == 0) return 0;
}}
this.flush_block_only (flush == 4);
if (this.strm.avail_out == 0) {
if (flush == 4) return 2;
return 0;
}return flush == 4 ? 3 : 1;
}, "~N");
Clazz.defineMethod (c$, "deflate_slow", 
function (flush) {
var hash_head = 0;
var bflush;
while (true) {
if (this.lookahead < 262) {
this.fill_window ();
if (this.lookahead < 262 && flush == 0) {
return 0;
}if (this.lookahead == 0) break;
}if (this.lookahead >= 3) {
this.ins_h = (((this.ins_h) << this.hash_shift) ^ (this.window[(this.strstart) + (2)] & 0xff)) & this.hash_mask;
hash_head = (this.head[this.ins_h] & 0xffff);
this.prev[this.strstart & this.w_mask] = this.head[this.ins_h];
this.head[this.ins_h] = this.strstart;
}this.prev_length = this.match_length;
this.prev_match = this.match_start;
this.match_length = 2;
if (hash_head != 0 && this.prev_length < this.max_lazy_match && ((this.strstart - hash_head) & 0xffff) <= this.w_size - 262) {
if (this.strategy != 2) {
this.match_length = this.longest_match (hash_head);
}if (this.match_length <= 5 && (this.strategy == 1 || (this.match_length == 3 && this.strstart - this.match_start > 4096))) {
this.match_length = 2;
}}if (this.prev_length >= 3 && this.match_length <= this.prev_length) {
var max_insert = this.strstart + this.lookahead - 3;
bflush = this._tr_tally (this.strstart - 1 - this.prev_match, this.prev_length - 3);
this.lookahead -= this.prev_length - 1;
this.prev_length -= 2;
do {
if (++this.strstart <= max_insert) {
this.ins_h = (((this.ins_h) << this.hash_shift) ^ (this.window[(this.strstart) + (2)] & 0xff)) & this.hash_mask;
hash_head = (this.head[this.ins_h] & 0xffff);
this.prev[this.strstart & this.w_mask] = this.head[this.ins_h];
this.head[this.ins_h] = this.strstart;
}} while (--this.prev_length != 0);
this.match_available = 0;
this.match_length = 2;
this.strstart++;
if (bflush) {
this.flush_block_only (false);
if (this.strm.avail_out == 0) return 0;
}} else if (this.match_available != 0) {
bflush = this._tr_tally (0, this.window[this.strstart - 1] & 0xff);
if (bflush) {
this.flush_block_only (false);
}this.strstart++;
this.lookahead--;
if (this.strm.avail_out == 0) return 0;
} else {
this.match_available = 1;
this.strstart++;
this.lookahead--;
}}
if (this.match_available != 0) {
bflush = this._tr_tally (0, this.window[this.strstart - 1] & 0xff);
this.match_available = 0;
}this.flush_block_only (flush == 4);
if (this.strm.avail_out == 0) {
if (flush == 4) return 2;
return 0;
}return flush == 4 ? 3 : 1;
}, "~N");
Clazz.defineMethod (c$, "longest_match", 
function (cur_match) {
var chain_length = this.max_chain_length;
var scan = this.strstart;
var match;
var len;
var best_len = this.prev_length;
var limit = this.strstart > (this.w_size - 262) ? this.strstart - (this.w_size - 262) : 0;
var nice_match = this.nice_match;
var wmask = this.w_mask;
var strend = this.strstart + 258;
var scan_end1 = this.window[scan + best_len - 1];
var scan_end = this.window[scan + best_len];
if (this.prev_length >= this.good_match) {
chain_length >>= 2;
}if (nice_match > this.lookahead) nice_match = this.lookahead;
do {
match = cur_match;
if (this.window[match + best_len] != scan_end || this.window[match + best_len - 1] != scan_end1 || this.window[match] != this.window[scan] || this.window[++match] != this.window[scan + 1]) continue;
scan += 2;
match++;
do {
} while (this.window[++scan] == this.window[++match] && this.window[++scan] == this.window[++match] && this.window[++scan] == this.window[++match] && this.window[++scan] == this.window[++match] && this.window[++scan] == this.window[++match] && this.window[++scan] == this.window[++match] && this.window[++scan] == this.window[++match] && this.window[++scan] == this.window[++match] && scan < strend);
len = 258 - (strend - scan);
scan = strend - 258;
if (len > best_len) {
this.match_start = cur_match;
best_len = len;
if (len >= nice_match) break;
scan_end1 = this.window[scan + best_len - 1];
scan_end = this.window[scan + best_len];
}} while ((cur_match = (this.prev[cur_match & wmask] & 0xffff)) > limit && --chain_length != 0);
if (best_len <= this.lookahead) return best_len;
return this.lookahead;
}, "~N");
Clazz.defineMethod (c$, "deflateInit5", 
 function (level, method, windowBits, memLevel, strategy) {
var wrap = 1;
this.strm.msg = null;
if (level == -1) level = 6;
if (windowBits < 0) {
wrap = 0;
windowBits = -windowBits;
} else if (windowBits > 15) {
wrap = 2;
windowBits -= 16;
this.strm.checksum =  new JU.CRC32 ();
}if (memLevel < 1 || memLevel > 9 || method != 8 || windowBits < 9 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > 2) {
return -2;
}this.strm.dstate = this;
this.wrap = wrap;
this.w_bits = windowBits;
this.w_size = 1 << this.w_bits;
this.w_mask = this.w_size - 1;
this.hash_bits = memLevel + 7;
this.hash_size = 1 << this.hash_bits;
this.hash_mask = this.hash_size - 1;
this.hash_shift = (Clazz.doubleToInt ((this.hash_bits + 3 - 1) / 3));
this.window =  Clazz.newByteArray (this.w_size * 2, 0);
this.prev =  Clazz.newShortArray (this.w_size, 0);
this.head =  Clazz.newShortArray (this.hash_size, 0);
this.lit_bufsize = 1 << (memLevel + 6);
this.pending_buf =  Clazz.newByteArray (this.lit_bufsize * 4, 0);
this.pending_buf_size = this.lit_bufsize * 4;
this.d_buf = Clazz.doubleToInt (this.lit_bufsize / 2);
this.l_buf = (3) * this.lit_bufsize;
this.level = level;
this.strategy = strategy;
this.method = method;
return this.deflateReset ();
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "deflateReset", 
function () {
this.strm.total_in = this.strm.total_out = 0;
this.strm.msg = null;
this.strm.data_type = 2;
this.pending = 0;
this.pending_out = 0;
if (this.wrap < 0) {
this.wrap = -this.wrap;
}this.status = (this.wrap == 0) ? 113 : 42;
this.strm.checksum.reset ();
this.last_flush = 0;
this.tr_init ();
this.lm_init ();
return 0;
});
Clazz.defineMethod (c$, "deflateEnd", 
function () {
if (this.status != 42 && this.status != 113 && this.status != 666) {
return -2;
}this.pending_buf = null;
this.head = null;
this.prev = null;
this.window = null;
return this.status == 113 ? -3 : 0;
});
Clazz.defineMethod (c$, "deflateParams", 
function (_level, _strategy) {
var err = 0;
if (_level == -1) {
_level = 6;
}if (_level < 0 || _level > 9 || _strategy < 0 || _strategy > 2) {
return -2;
}if (JU.Deflate.config_table[this.level].func != JU.Deflate.config_table[_level].func && this.strm.total_in != 0) {
err = this.strm.deflate (1);
}if (this.level != _level) {
this.level = _level;
this.max_lazy_match = JU.Deflate.config_table[this.level].max_lazy;
this.good_match = JU.Deflate.config_table[this.level].good_length;
this.nice_match = JU.Deflate.config_table[this.level].nice_length;
this.max_chain_length = JU.Deflate.config_table[this.level].max_chain;
}this.strategy = _strategy;
return err;
}, "~N,~N");
Clazz.defineMethod (c$, "deflateSetDictionary", 
function (dictionary, dictLength) {
var length = dictLength;
var index = 0;
if (dictionary == null || this.status != 42) return -2;
this.strm.checksum.update (dictionary, 0, dictLength);
if (length < 3) return 0;
if (length > this.w_size - 262) {
length = this.w_size - 262;
index = dictLength - length;
}System.arraycopy (dictionary, index, this.window, 0, length);
this.strstart = length;
this.block_start = length;
this.ins_h = this.window[0] & 0xff;
this.ins_h = (((this.ins_h) << this.hash_shift) ^ (this.window[1] & 0xff)) & this.hash_mask;
for (var n = 0; n <= length - 3; n++) {
this.ins_h = (((this.ins_h) << this.hash_shift) ^ (this.window[(n) + (2)] & 0xff)) & this.hash_mask;
this.prev[n & this.w_mask] = this.head[this.ins_h];
this.head[this.ins_h] = n;
}
return 0;
}, "~A,~N");
Clazz.defineMethod (c$, "deflate", 
function (flush) {
var old_flush;
if (flush > 4 || flush < 0) {
return -2;
}if (this.strm.next_out == null || (this.strm.next_in == null && this.strm.avail_in != 0) || (this.status == 666 && flush != 4)) {
this.strm.msg = JU.Deflate.z_errmsg[4];
return -2;
}if (this.strm.avail_out == 0) {
this.strm.msg = JU.Deflate.z_errmsg[7];
return -5;
}old_flush = this.last_flush;
this.last_flush = flush;
if (this.status == 42) {
if (this.wrap == 2) {
this.getGZIPHeader ().put (this);
this.status = 113;
this.strm.checksum.reset ();
} else {
var header = (8 + ((this.w_bits - 8) << 4)) << 8;
var level_flags = ((this.level - 1) & 0xff) >> 1;
if (level_flags > 3) level_flags = 3;
header |= (level_flags << 6);
if (this.strstart != 0) header |= 32;
header += 31 - (header % 31);
this.status = 113;
this.putShortMSB (header);
if (this.strstart != 0) {
var adler = this.strm.checksum.getValue ();
this.putShortMSB ((adler >>> 16));
this.putShortMSB ((adler & 0xffff));
}this.strm.checksum.reset ();
}}if (this.pending != 0) {
this.strm.flush_pending ();
if (this.strm.avail_out == 0) {
this.last_flush = -1;
return 0;
}} else if (this.strm.avail_in == 0 && flush <= old_flush && flush != 4) {
this.strm.msg = JU.Deflate.z_errmsg[7];
return -5;
}if (this.status == 666 && this.strm.avail_in != 0) {
this.strm.msg = JU.Deflate.z_errmsg[7];
return -5;
}if (this.strm.avail_in != 0 || this.lookahead != 0 || (flush != 0 && this.status != 666)) {
var bstate = -1;
switch (JU.Deflate.config_table[this.level].func) {
case 0:
bstate = this.deflate_stored (flush);
break;
case 1:
bstate = this.deflate_fast (flush);
break;
case 2:
bstate = this.deflate_slow (flush);
break;
default:
}
if (bstate == 2 || bstate == 3) {
this.status = 666;
}if (bstate == 0 || bstate == 2) {
if (this.strm.avail_out == 0) {
this.last_flush = -1;
}return 0;
}if (bstate == 1) {
if (flush == 1) {
this._tr_align ();
} else {
this._tr_stored_block (0, 0, false);
if (flush == 3) {
for (var i = 0; i < this.hash_size; i++) this.head[i] = 0;

}}this.strm.flush_pending ();
if (this.strm.avail_out == 0) {
this.last_flush = -1;
return 0;
}}}if (flush != 4) return 0;
if (this.wrap <= 0) return 1;
if (this.wrap == 2) {
var adler = this.strm.checksum.getValue ();
this.put_byteB ((adler & 0xff));
this.put_byteB (((adler >> 8) & 0xff));
this.put_byteB (((adler >> 16) & 0xff));
this.put_byteB (((adler >> 24) & 0xff));
this.put_byteB ((this.strm.total_in & 0xff));
this.put_byteB (((this.strm.total_in >> 8) & 0xff));
this.put_byteB (((this.strm.total_in >> 16) & 0xff));
this.put_byteB (((this.strm.total_in >> 24) & 0xff));
this.getGZIPHeader ().setCRC (adler);
} else {
var adler = this.strm.checksum.getValue ();
this.putShortMSB ((adler >>> 16));
this.putShortMSB ((adler & 0xffff));
}this.strm.flush_pending ();
if (this.wrap > 0) this.wrap = -this.wrap;
return this.pending != 0 ? 0 : 1;
}, "~N");
Clazz.defineMethod (c$, "getGZIPHeader", 
function () {
if (this.gheader == null) {
this.gheader =  new JU.GZIPHeader ();
}return this.gheader;
});
Clazz.defineMethod (c$, "getBytesRead", 
function () {
return this.strm.total_in;
});
Clazz.defineMethod (c$, "getBytesWritten", 
function () {
return this.strm.total_out;
});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.good_length = 0;
this.max_lazy = 0;
this.nice_length = 0;
this.max_chain = 0;
this.func = 0;
Clazz.instantialize (this, arguments);
}, JU.Deflate, "Config");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
this.good_length = a;
this.max_lazy = b;
this.nice_length = c;
this.max_chain = d;
this.func = e;
}, "~N,~N,~N,~N,~N");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"MAX_MEM_LEVEL", 9,
"Z_DEFAULT_COMPRESSION", -1,
"MAX_WBITS", 15,
"DEF_MEM_LEVEL", 8,
"STORED", 0,
"FAST", 1,
"SLOW", 2,
"config_table", null);
{
JU.Deflate.config_table =  new Array (10);
JU.Deflate.config_table[0] =  new JU.Deflate.Config (0, 0, 0, 0, 0);
JU.Deflate.config_table[1] =  new JU.Deflate.Config (4, 4, 8, 4, 1);
JU.Deflate.config_table[2] =  new JU.Deflate.Config (4, 5, 16, 8, 1);
JU.Deflate.config_table[3] =  new JU.Deflate.Config (4, 6, 32, 32, 1);
JU.Deflate.config_table[4] =  new JU.Deflate.Config (4, 4, 16, 16, 2);
JU.Deflate.config_table[5] =  new JU.Deflate.Config (8, 16, 32, 32, 2);
JU.Deflate.config_table[6] =  new JU.Deflate.Config (8, 16, 128, 128, 2);
JU.Deflate.config_table[7] =  new JU.Deflate.Config (8, 32, 128, 256, 2);
JU.Deflate.config_table[8] =  new JU.Deflate.Config (32, 128, 258, 1024, 2);
JU.Deflate.config_table[9] =  new JU.Deflate.Config (32, 258, 258, 4096, 2);
}Clazz.defineStatics (c$,
"z_errmsg",  Clazz.newArray (-1, ["need dictionary", "stream end", "", "file error", "stream error", "data error", "insufficient memory", "buffer error", "incompatible version", ""]),
"NeedMore", 0,
"BlockDone", 1,
"FinishStarted", 2,
"FinishDone", 3,
"PRESET_DICT", 0x20,
"Z_FILTERED", 1,
"Z_HUFFMAN_ONLY", 2,
"Z_DEFAULT_STRATEGY", 0,
"Z_NO_FLUSH", 0,
"Z_PARTIAL_FLUSH", 1,
"Z_FULL_FLUSH", 3,
"Z_FINISH", 4,
"Z_OK", 0,
"Z_STREAM_END", 1,
"Z_NEED_DICT", 2,
"Z_STREAM_ERROR", -2,
"Z_DATA_ERROR", -3,
"Z_BUF_ERROR", -5,
"INIT_STATE", 42,
"BUSY_STATE", 113,
"FINISH_STATE", 666,
"Z_DEFLATED", 8,
"STORED_BLOCK", 0,
"STATIC_TREES", 1,
"DYN_TREES", 2,
"Z_BINARY", 0,
"Z_ASCII", 1,
"Z_UNKNOWN", 2,
"Buf_size", 16,
"REP_3_6", 16,
"REPZ_3_10", 17,
"REPZ_11_138", 18,
"MIN_MATCH", 3,
"MAX_MATCH", 258,
"MIN_LOOKAHEAD", (262),
"MAX_BITS", 15,
"D_CODES", 30,
"BL_CODES", 19,
"LENGTH_CODES", 29,
"LITERALS", 256,
"L_CODES", (286),
"HEAP_SIZE", (573),
"END_BLOCK", 256);
});
