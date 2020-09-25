Clazz.declarePackage ("JU");
Clazz.load (["JU.BS"], "JU.BSUtil", null, function () {
c$ = Clazz.declareType (JU, "BSUtil");
c$.newAndSetBit = Clazz.defineMethod (c$, "newAndSetBit", 
function (i) {
var bs = JU.BS.newN (i + 1);
bs.set (i);
return bs;
}, "~N");
c$.areEqual = Clazz.defineMethod (c$, "areEqual", 
function (a, b) {
return (a == null || b == null ? a == null && b == null : a.equals (b));
}, "JU.BS,JU.BS");
c$.haveCommon = Clazz.defineMethod (c$, "haveCommon", 
function (a, b) {
return (a == null || b == null ? false : a.intersects (b));
}, "JU.BS,JU.BS");
c$.cardinalityOf = Clazz.defineMethod (c$, "cardinalityOf", 
function (bs) {
return (bs == null ? 0 : bs.cardinality ());
}, "JU.BS");
c$.newBitSet2 = Clazz.defineMethod (c$, "newBitSet2", 
function (i0, i1) {
var bs = JU.BS.newN (i1);
bs.setBits (i0, i1);
return bs;
}, "~N,~N");
c$.setAll = Clazz.defineMethod (c$, "setAll", 
function (n) {
var bs = JU.BS.newN (n);
bs.setBits (0, n);
return bs;
}, "~N");
c$.andNot = Clazz.defineMethod (c$, "andNot", 
function (a, b) {
if (b != null && a != null) a.andNot (b);
return a;
}, "JU.BS,JU.BS");
c$.copy = Clazz.defineMethod (c$, "copy", 
function (bs) {
return bs == null ? null : bs.clone ();
}, "JU.BS");
c$.copy2 = Clazz.defineMethod (c$, "copy2", 
function (a, b) {
if (a == null || b == null) return null;
b.clearAll ();
b.or (a);
return b;
}, "JU.BS,JU.BS");
c$.copyInvert = Clazz.defineMethod (c$, "copyInvert", 
function (bs, n) {
return (bs == null ? null : JU.BSUtil.andNot (JU.BSUtil.setAll (n), bs));
}, "JU.BS,~N");
c$.invertInPlace = Clazz.defineMethod (c$, "invertInPlace", 
function (bs, n) {
return JU.BSUtil.copy2 (JU.BSUtil.copyInvert (bs, n), bs);
}, "JU.BS,~N");
c$.toggleInPlace = Clazz.defineMethod (c$, "toggleInPlace", 
function (a, b) {
if (a.equals (b)) {
a.clearAll ();
} else if (JU.BSUtil.andNot (JU.BSUtil.copy (b), a).length () == 0) {
JU.BSUtil.andNot (a, b);
} else {
a.or (b);
}return a;
}, "JU.BS,JU.BS");
c$.deleteBits = Clazz.defineMethod (c$, "deleteBits", 
function (bs, bsDelete) {
if (bs == null || bsDelete == null) return bs;
var ipt = bsDelete.nextSetBit (0);
if (ipt < 0) return bs;
var len = bs.length ();
var lend = Math.min (len, bsDelete.length ());
var i;
for (i = bsDelete.nextClearBit (ipt); i < lend && i >= 0; i = bsDelete.nextClearBit (i + 1)) bs.setBitTo (ipt++, bs.get (i));

for (i = lend; i < len; i++) bs.setBitTo (ipt++, bs.get (i));

if (ipt < len) bs.clearBits (ipt, len);
return bs;
}, "JU.BS,JU.BS");
c$.shiftBits = Clazz.defineMethod (c$, "shiftBits", 
function (bs, bsAdded, setIfFound, iLast) {
if (bs == null || bsAdded == null) return;
var n = bsAdded.length ();
var bsNew = JU.BS.newN (n);
var isFound = false;
var doSet = false;
var checkFound = setIfFound;
for (var j = 0, i = 0; j < n && i < iLast; j++) {
if (bsAdded.get (j)) {
if (doSet) bsNew.set (j);
checkFound = setIfFound;
isFound = false;
} else if (bs.get (i++)) {
bsNew.set (j);
if (checkFound) {
checkFound = false;
isFound = true;
doSet = true;
}} else if (checkFound && !isFound) {
doSet = false;
}}
bs.clearAll ();
bs.or (bsNew);
}, "JU.BS,JU.BS,~B,~N");
c$.offset = Clazz.defineMethod (c$, "offset", 
function (bs0, pos, offset) {
if (bs0 == null) return;
var bsTemp = JU.BS.newN (bs0.length () + offset);
for (var i = bs0.nextSetBit (0); i >= pos; i = bs0.nextSetBit (i + 1)) bsTemp.set (i + offset);

JU.BSUtil.copy2 (bsTemp, bs0);
}, "JU.BS,~N,~N");
c$.setMapBitSet = Clazz.defineMethod (c$, "setMapBitSet", 
function (ht, i1, i2, key) {
var bs;
if (ht.containsKey (key)) bs = ht.get (key);
 else ht.put (key, bs =  new JU.BS ());
bs.setBits (i1, i2 + 1);
}, "java.util.Map,~N,~N,~S");
c$.emptySet = c$.prototype.emptySet =  new JU.BS ();
});
