Clazz.declarePackage ("JU");
Clazz.load (["javajs.api.JSONEncodable"], "JU.BS", ["java.lang.IndexOutOfBoundsException", "$.NegativeArraySizeException", "JU.PT", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.words = null;
this.wordsInUse = 0;
this.sizeIsSticky = false;
Clazz.instantialize (this, arguments);
}, JU, "BS", null, [Cloneable, javajs.api.JSONEncodable]);
c$.wordIndex = Clazz.defineMethod (c$, "wordIndex", 
 function (bitIndex) {
return bitIndex >> 5;
}, "~N");
Clazz.defineMethod (c$, "recalculateWordsInUse", 
 function () {
var i;
for (i = this.wordsInUse - 1; i >= 0; i--) if (this.words[i] != 0) break;

this.wordsInUse = i + 1;
});
Clazz.makeConstructor (c$, 
function () {
this.initWords (32);
this.sizeIsSticky = false;
});
c$.newN = Clazz.defineMethod (c$, "newN", 
function (nbits) {
var bs =  new JU.BS ();
bs.init (nbits);
return bs;
}, "~N");
Clazz.defineMethod (c$, "init", 
 function (nbits) {
if (nbits < 0) throw  new NegativeArraySizeException ("nbits < 0: " + nbits);
this.initWords (nbits);
this.sizeIsSticky = true;
}, "~N");
Clazz.defineMethod (c$, "initWords", 
 function (nbits) {
this.words =  Clazz.newIntArray (JU.BS.wordIndex (nbits - 1) + 1, 0);
}, "~N");
Clazz.defineMethod (c$, "ensureCapacity", 
 function (wordsRequired) {
if (this.words.length < wordsRequired) {
var request = Math.max (2 * this.words.length, wordsRequired);
this.setLength (request);
this.sizeIsSticky = false;
}}, "~N");
Clazz.defineMethod (c$, "expandTo", 
 function (wordIndex) {
var wordsRequired = wordIndex + 1;
if (this.wordsInUse < wordsRequired) {
this.ensureCapacity (wordsRequired);
this.wordsInUse = wordsRequired;
}}, "~N");
Clazz.defineMethod (c$, "set", 
function (bitIndex) {
if (bitIndex < 0) throw  new IndexOutOfBoundsException ("bitIndex < 0: " + bitIndex);
var wordIndex = JU.BS.wordIndex (bitIndex);
this.expandTo (wordIndex);
this.words[wordIndex] |= (1 << bitIndex);
}, "~N");
Clazz.defineMethod (c$, "setBitTo", 
function (bitIndex, value) {
if (value) this.set (bitIndex);
 else this.clear (bitIndex);
}, "~N,~B");
Clazz.defineMethod (c$, "setBits", 
function (fromIndex, toIndex) {
if (fromIndex == toIndex) return;
var startWordIndex = JU.BS.wordIndex (fromIndex);
var endWordIndex = JU.BS.wordIndex (toIndex - 1);
this.expandTo (endWordIndex);
var firstWordMask = -1 << fromIndex;
var lastWordMask = -1 >>> -toIndex;
if (startWordIndex == endWordIndex) {
this.words[startWordIndex] |= (firstWordMask & lastWordMask);
} else {
this.words[startWordIndex] |= firstWordMask;
for (var i = startWordIndex + 1; i < endWordIndex; i++) this.words[i] = -1;

this.words[endWordIndex] |= lastWordMask;
}}, "~N,~N");
Clazz.defineMethod (c$, "clear", 
function (bitIndex) {
if (bitIndex < 0) throw  new IndexOutOfBoundsException ("bitIndex < 0: " + bitIndex);
var wordIndex = JU.BS.wordIndex (bitIndex);
if (wordIndex >= this.wordsInUse) return;
this.words[wordIndex] &= ~(1 << bitIndex);
this.recalculateWordsInUse ();
}, "~N");
Clazz.defineMethod (c$, "clearBits", 
function (fromIndex, toIndex) {
if (fromIndex == toIndex) return;
var startWordIndex = JU.BS.wordIndex (fromIndex);
if (startWordIndex >= this.wordsInUse) return;
var endWordIndex = JU.BS.wordIndex (toIndex - 1);
if (endWordIndex >= this.wordsInUse) {
toIndex = this.length ();
endWordIndex = this.wordsInUse - 1;
}var firstWordMask = -1 << fromIndex;
var lastWordMask = -1 >>> -toIndex;
if (startWordIndex == endWordIndex) {
this.words[startWordIndex] &= ~(firstWordMask & lastWordMask);
} else {
this.words[startWordIndex] &= ~firstWordMask;
for (var i = startWordIndex + 1; i < endWordIndex; i++) this.words[i] = 0;

this.words[endWordIndex] &= ~lastWordMask;
}this.recalculateWordsInUse ();
}, "~N,~N");
Clazz.defineMethod (c$, "clearAll", 
function () {
while (this.wordsInUse > 0) this.words[--this.wordsInUse] = 0;

});
Clazz.defineMethod (c$, "get", 
function (bitIndex) {
if (bitIndex < 0) throw  new IndexOutOfBoundsException ("bitIndex < 0: " + bitIndex);
var wordIndex = JU.BS.wordIndex (bitIndex);
return (wordIndex < this.wordsInUse) && ((this.words[wordIndex] & (1 << bitIndex)) != 0);
}, "~N");
Clazz.defineMethod (c$, "nextSetBit", 
function (fromIndex) {
if (fromIndex < 0) throw  new IndexOutOfBoundsException ("fromIndex < 0: " + fromIndex);
var u = JU.BS.wordIndex (fromIndex);
if (u >= this.wordsInUse) return -1;
var word = this.words[u] & (-1 << fromIndex);
while (true) {
if (word != 0) return (u * 32) + Integer.numberOfTrailingZeros (word);
if (++u == this.wordsInUse) return -1;
word = this.words[u];
}
}, "~N");
Clazz.defineMethod (c$, "nextClearBit", 
function (fromIndex) {
if (fromIndex < 0) throw  new IndexOutOfBoundsException ("fromIndex < 0: " + fromIndex);
var u = JU.BS.wordIndex (fromIndex);
if (u >= this.wordsInUse) return fromIndex;
var word = ~this.words[u] & (-1 << fromIndex);
while (true) {
if (word != 0) return (u * 32) + Integer.numberOfTrailingZeros (word);
if (++u == this.wordsInUse) return this.wordsInUse * 32;
word = ~this.words[u];
}
}, "~N");
Clazz.defineMethod (c$, "length", 
function () {
if (this.wordsInUse == 0) return 0;
return 32 * (this.wordsInUse - 1) + (32 - Integer.numberOfLeadingZeros (this.words[this.wordsInUse - 1]));
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.wordsInUse == 0;
});
Clazz.defineMethod (c$, "intersects", 
function (set) {
for (var i = Math.min (this.wordsInUse, set.wordsInUse) - 1; i >= 0; i--) if ((this.words[i] & set.words[i]) != 0) return true;

return false;
}, "JU.BS");
Clazz.defineMethod (c$, "cardinality", 
function () {
var sum = 0;
for (var i = 0; i < this.wordsInUse; i++) sum += Integer.bitCount (this.words[i]);

return sum;
});
Clazz.defineMethod (c$, "and", 
function (set) {
if (this === set) return;
while (this.wordsInUse > set.wordsInUse) this.words[--this.wordsInUse] = 0;

for (var i = 0; i < this.wordsInUse; i++) this.words[i] &= set.words[i];

this.recalculateWordsInUse ();
}, "JU.BS");
Clazz.defineMethod (c$, "or", 
function (set) {
if (this === set) return;
var wordsInCommon = Math.min (this.wordsInUse, set.wordsInUse);
if (this.wordsInUse < set.wordsInUse) {
this.ensureCapacity (set.wordsInUse);
this.wordsInUse = set.wordsInUse;
}for (var i = 0; i < wordsInCommon; i++) this.words[i] |= set.words[i];

if (wordsInCommon < set.wordsInUse) System.arraycopy (set.words, wordsInCommon, this.words, wordsInCommon, this.wordsInUse - wordsInCommon);
}, "JU.BS");
Clazz.defineMethod (c$, "xor", 
function (set) {
var wordsInCommon = Math.min (this.wordsInUse, set.wordsInUse);
if (this.wordsInUse < set.wordsInUse) {
this.ensureCapacity (set.wordsInUse);
this.wordsInUse = set.wordsInUse;
}for (var i = 0; i < wordsInCommon; i++) this.words[i] ^= set.words[i];

if (wordsInCommon < set.wordsInUse) System.arraycopy (set.words, wordsInCommon, this.words, wordsInCommon, set.wordsInUse - wordsInCommon);
this.recalculateWordsInUse ();
}, "JU.BS");
Clazz.defineMethod (c$, "andNot", 
function (set) {
for (var i = Math.min (this.wordsInUse, set.wordsInUse) - 1; i >= 0; i--) this.words[i] &= ~set.words[i];

this.recalculateWordsInUse ();
}, "JU.BS");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var h = 1234;
for (var i = this.wordsInUse; --i >= 0; ) h ^= this.words[i] * (i + 1);

return ((h >> 32) ^ h);
});
Clazz.defineMethod (c$, "size", 
function () {
return this.words.length * 32;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, JU.BS))) return false;
if (this === obj) return true;
var set = obj;
if (this.wordsInUse != set.wordsInUse) return false;
for (var i = 0; i < this.wordsInUse; i++) if (this.words[i] != set.words[i]) return false;

return true;
}, "~O");
Clazz.overrideMethod (c$, "clone", 
function () {
if (!this.sizeIsSticky && this.wordsInUse != this.words.length) this.setLength (this.wordsInUse);
return JU.BS.copy (this);
});
Clazz.defineMethod (c$, "setLength", 
 function (n) {
{
if (n == this.words.length) return;
if (n == this.wordsInUse) {
this.words = Clazz.newArray(-1, this.words, 0, n);
return;
}
}var a =  Clazz.newIntArray (n, 0);
System.arraycopy (this.words, 0, a, 0, this.wordsInUse);
this.words = a;
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return JU.BS.escape (this, '(', ')');
});
c$.copy = Clazz.defineMethod (c$, "copy", 
function (bitsetToCopy) {
var bs;
{
bs = Clazz.clone(bitsetToCopy);
}var wordCount = bitsetToCopy.wordsInUse;
if (wordCount == 0) {
bs.words = JU.BS.emptyBitmap;
} else {
{
bs.words = Clazz.newArray(-1, bitsetToCopy.words, 0, bs.wordsInUse = wordCount);
}}return bs;
}, "JU.BS");
Clazz.defineMethod (c$, "cardinalityN", 
function (max) {
var n = this.cardinality ();
for (var i = this.length (); --i >= max; ) if (this.get (i)) n--;

return n;
}, "~N");
Clazz.overrideMethod (c$, "toJSON", 
function () {
var numBits = (this.wordsInUse > 128 ? this.cardinality () : this.wordsInUse * 32);
var b = JU.SB.newN (6 * numBits + 2);
b.appendC ('[');
var i = this.nextSetBit (0);
if (i != -1) {
b.appendI (i);
for (i = this.nextSetBit (i + 1); i >= 0; i = this.nextSetBit (i + 1)) {
var endOfRun = this.nextClearBit (i);
do {
b.append (", ").appendI (i);
} while (++i < endOfRun);
}
}b.appendC (']');
return b.toString ();
});
c$.escape = Clazz.defineMethod (c$, "escape", 
function (bs, chOpen, chClose) {
if (bs == null) return chOpen + "{}" + chClose;
var s =  new JU.SB ();
s.append (chOpen + "{");
var imax = bs.length ();
var iLast = -1;
var iFirst = -2;
var i = -1;
while (++i <= imax) {
var isSet = bs.get (i);
if (i == imax || iLast >= 0 && !isSet) {
if (iLast >= 0 && iFirst != iLast) s.append ((iFirst == iLast - 1 ? " " : ":") + iLast);
if (i == imax) break;
iLast = -1;
}if (bs.get (i)) {
if (iLast < 0) {
s.append ((iFirst == -2 ? "" : " ") + i);
iFirst = i;
}iLast = i;
}}
s.append ("}").appendC (chClose);
return s.toString ();
}, "JU.BS,~S,~S");
c$.unescape = Clazz.defineMethod (c$, "unescape", 
function (str) {
var ch;
var len;
if (str == null || (len = (str = str.trim ()).length) < 4 || str.equalsIgnoreCase ("({null})") || (ch = str.charAt (0)) != '(' && ch != '[' || str.charAt (len - 1) != (ch == '(' ? ')' : ']') || str.charAt (1) != '{' || str.indexOf ('}') != len - 2) return null;
len -= 2;
for (var i = len; --i >= 2; ) if (!JU.PT.isDigit (ch = str.charAt (i)) && ch != ' ' && ch != '\t' && ch != ':') return null;

var lastN = len;
while (JU.PT.isDigit (str.charAt (--lastN))) {
}
if (++lastN == len) lastN = 0;
 else try {
lastN = Integer.parseInt (str.substring (lastN, len));
} catch (e) {
if (Clazz.exceptionOf (e, NumberFormatException)) {
return null;
} else {
throw e;
}
}
var bs = JU.BS.newN (lastN);
lastN = -1;
var iPrev = -1;
var iThis = -2;
for (var i = 2; i <= len; i++) {
switch (ch = str.charAt (i)) {
case '\t':
case ' ':
case '}':
if (iThis < 0) break;
if (iThis < lastN) return null;
lastN = iThis;
if (iPrev < 0) iPrev = iThis;
bs.setBits (iPrev, iThis + 1);
iPrev = -1;
iThis = -2;
break;
case ':':
iPrev = lastN = iThis;
iThis = -2;
break;
default:
if (JU.PT.isDigit (ch)) {
if (iThis < 0) iThis = 0;
iThis = (iThis * 10) + (ch.charCodeAt (0) - 48);
}}
}
return (iPrev >= 0 ? null : bs);
}, "~S");
Clazz.defineStatics (c$,
"ADDRESS_BITS_PER_WORD", 5,
"BITS_PER_WORD", 32,
"WORD_MASK", 0xffffffff,
"emptyBitmap",  Clazz.newIntArray (0, 0));
});
