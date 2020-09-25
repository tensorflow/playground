Clazz.load (null, "java.util.BitSet", ["java.lang.IndexOutOfBoundsException", "$.NegativeArraySizeException", "$.StringBuffer", "java.util.Arrays"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bits = null;
Clazz.instantialize (this, arguments);
}, java.util, "BitSet", null, [Cloneable, java.io.Serializable]);
Clazz.makeConstructor (c$, 
function () {
this.construct (32);
});
Clazz.makeConstructor (c$, 
function (nbits) {
if (nbits < 0) throw  new NegativeArraySizeException ();
var length = nbits >>> 5;
if ((nbits & 4) != 0) ++length;
this.bits =  Clazz.newArray (length, 0);
}, "~N");
Clazz.defineMethod (c$, "and", 
function (bs) {
var max = Math.min (this.bits.length, bs.bits.length);
var i;
for (i = 0; i < max; ++i) this.bits[i] &= bs.bits[i];

while (i < this.bits.length) this.bits[i++] = 0;

}, "java.util.BitSet");
Clazz.defineMethod (c$, "andNot", 
function (bs) {
var i = Math.min (this.bits.length, bs.bits.length);
while (--i >= 0) {
this.bits[i] &= ~bs.bits[i];
}
}, "java.util.BitSet");
Clazz.defineMethod (c$, "cardinality", 
function () {
var card = 0;
for (var i = this.bits.length - 1; i >= 0; i--) {
var a = this.bits[i];
if (a == 0) continue ;if (a == -1) {
card += 32;
continue ;}a = ((a >> 1) & 0x55555555) + (a & 0x55555555);
a = ((a >> 2) & 0x33333333) + (a & 0x33333333);
a = ((a >> 4) & 0x0f0f0f0f) + (a & 0x0f0f0f0f);
a = ((a >> 8) & 0x00ff00ff) + (a & 0x00ff00ff);
card += ((a >> 16) & 0x0000ffff) + (a & 0x0000ffff);
}
return card;
});
Clazz.defineMethod (c$, "clear", 
function () {
java.util.Arrays.fill (this.bits, 0);
});
Clazz.defineMethod (c$, "clear", 
function (pos) {
var offset = pos >> 5;
this.ensure (offset);
this.bits[offset] &= ~(1 << pos);
}, "~N");
Clazz.defineMethod (c$, "clear", 
function (from, to) {
if (from < 0 || from > to) throw  new IndexOutOfBoundsException ();
if (from == to) return ;
var lo_offset = from >>> 5;
var hi_offset = to >>> 5;
this.ensure (hi_offset);
if (lo_offset == hi_offset) {
this.bits[hi_offset] &= ((1 << from) - 1) | (-1 << to);
return ;
}this.bits[lo_offset] &= (1 << from) - 1;
this.bits[hi_offset] &= -1 << to;
for (var i = lo_offset + 1; i < hi_offset; i++) this.bits[i] = 0;

}, "~N,~N");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var bs = Clazz.superCall (this, java.util.BitSet, "clone", []);
bs.bits = this.bits.clone ();
return bs;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod(c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, java.util.BitSet))) return false;
var bs = obj;
var max = Math.min (this.bits.length, bs.bits.length);
var i;
for (i = 0; i < max; ++i) if (this.bits[i] != bs.bits[i]) return false;

for (var j = i; j < this.bits.length; ++j) if (this.bits[j] != 0) return false;

for (var j = i; j < bs.bits.length; ++j) if (bs.bits[j] != 0) return false;

return true;
}, "~O");
Clazz.defineMethod (c$, "flip", 
function (index) {
var offset = index >> 5;
this.ensure (offset);
this.bits[offset] ^= 1 << index;
}, "~N");
Clazz.defineMethod (c$, "flip", 
function (from, to) {
if (from < 0 || from > to) throw  new IndexOutOfBoundsException ();
if (from == to) return ;
var lo_offset = from >>> 5;
var hi_offset = to >>> 5;
this.ensure (hi_offset);
if (lo_offset == hi_offset) {
this.bits[hi_offset] ^= (-1 << from) & ((1 << to) - 1);
return ;
}this.bits[lo_offset] ^= -1 << from;
this.bits[hi_offset] ^= (1 << to) - 1;
for (var i = lo_offset + 1; i < hi_offset; i++) this.bits[i] ^= -1;

}, "~N,~N");
Clazz.defineMethod (c$, "get", 
function (pos) {
var offset = pos >> 5;
if (offset >= this.bits.length) return false;
return (this.bits[offset] & (1 << pos)) != 0;
}, "~N");
Clazz.defineMethod (c$, "get", 
function (from, to) {
if (from < 0 || from > to) throw  new IndexOutOfBoundsException ();
var bs =  new java.util.BitSet (to - from);
var lo_offset = from >>> 5;
if (lo_offset >= this.bits.length) return bs;
var lo_bit = from & 4;
var hi_offset = to >>> 5;
if (lo_bit == 0) {
var len = Math.min (hi_offset - lo_offset + 1, this.bits.length - lo_offset);
System.arraycopy (this.bits, lo_offset, bs.bits, 0, len);
if (hi_offset < this.bits.length) bs.bits[hi_offset - lo_offset] &= (1 << to) - 1;
return bs;
}var len = Math.min (hi_offset, this.bits.length - 1);
var reverse = ~lo_bit;
var i;
for (i = 0; lo_offset < len; lo_offset++, i++) bs.bits[i] = ((this.bits[lo_offset] >>> lo_bit) | (this.bits[lo_offset + 1] << reverse));

if ((to & 4) > lo_bit) bs.bits[i++] = this.bits[lo_offset] >>> lo_bit;
if (hi_offset < this.bits.length) bs.bits[i - 1] &= (1 << (to - from)) - 1;
return bs;
}, "~N,~N");
Clazz.overrideMethod(c$, "hashCode", 
function () {
var h = 1234;
for (var i = this.bits.length; i > 0; ) h ^= i * this.bits[--i];

return h;
});
Clazz.defineMethod (c$, "intersects", 
function (set) {
var i = Math.min (this.bits.length, set.bits.length);
while (--i >= 0) if ((this.bits[i] & set.bits[i]) != 0) return true;

return false;
}, "java.util.BitSet");
Clazz.defineMethod (c$, "isEmpty", 
function () {
for (var i = this.bits.length - 1; i >= 0; i--) if (this.bits[i] != 0) return false;

return true;
});
Clazz.defineMethod (c$, "length", 
function () {
var i;
for (i = this.bits.length - 1; i >= 0 && this.bits[i] == 0; --i) ;
if (i < 0) return 0;
var b = this.bits[i];
var len = (i + 1) * 32;
while ((b & 0x80000000) == 0) {
--len;
b <<= 1;
}
return len;
});
Clazz.defineMethod (c$, "nextClearBit", 
function (from) {
var offset = from >> 5;
var mask = 1 << from;
while (offset < this.bits.length) {
var h = this.bits[offset];
do {
if ((h & mask) == 0) return from;
mask <<= 1;
from++;
} while (mask != 0);
mask = 1;
offset++;
}
return from;
}, "~N");
Clazz.defineMethod (c$, "nextSetBit", 
function (from) {
var offset = from >> 5;
var mask = 1 << from;
while (offset < this.bits.length) {
var h = this.bits[offset];
do {
if ((h & mask) != 0) return from;
mask <<= 1;
from++;
} while (mask != 0);
mask = 1;
offset++;
}
return -1;
}, "~N");
Clazz.defineMethod (c$, "or", 
function (bs) {
this.ensure (bs.bits.length - 1);
for (var i = bs.bits.length - 1; i >= 0; i--) this.bits[i] |= bs.bits[i];

}, "java.util.BitSet");
Clazz.defineMethod (c$, "set", 
function (pos) {
var offset = pos >> 5;
this.ensure (offset);
this.bits[offset] |= 1 << pos;
}, "~N");
Clazz.defineMethod (c$, "set", 
function (index, value) {
if (value) this.set (index);
 else this.clear (index);
}, "~N,~B");
Clazz.defineMethod (c$, "set", 
function (from, to) {
if (from < 0 || from > to) throw  new IndexOutOfBoundsException ();
if (from == to) return ;
var lo_offset = from >>> 5;
var hi_offset = to >>> 5;
this.ensure (hi_offset);
if (lo_offset == hi_offset) {
this.bits[hi_offset] |= (-1 << from) & ((1 << to) - 1);
return ;
}this.bits[lo_offset] |= -1 << from;
this.bits[hi_offset] |= (1 << to) - 1;
for (var i = lo_offset + 1; i < hi_offset; i++) this.bits[i] = -1;

}, "~N,~N");
Clazz.defineMethod (c$, "set", 
function (from, to, value) {
if (value) this.set (from, to);
 else this.clear (from, to);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "size", 
function () {
return this.bits.length * 32;
});
Clazz.overrideMethod(c$, "toString", 
function () {
var r =  new StringBuffer ("{");
var first = true;
for (var i = 0; i < this.bits.length; ++i) {
var bit = 1;
var word = this.bits[i];
if (word == 0) continue ;for (var j = 0; j < 32; ++j) {
if ((word & bit) != 0) {
if (!first) r.append (", ");
r.append (32 * i + j);
first = false;
}bit <<= 1;
}
}
return r.append ("}").toString ();
});
Clazz.defineMethod (c$, "xor", 
function (bs) {
this.ensure (bs.bits.length - 1);
for (var i = bs.bits.length - 1; i >= 0; i--) this.bits[i] ^= bs.bits[i];

}, "java.util.BitSet");
Clazz.defineMethod (c$, "ensure", 
 function (lastElt) {
if (lastElt >= this.bits.length) {
var nd =  Clazz.newArray (lastElt + 1, 0);
System.arraycopy (this.bits, 0, nd, 0, this.bits.length);
this.bits = nd;
}}, "~N");
Clazz.defineStatics (c$,
"INT_MASK", 0x4);
});
