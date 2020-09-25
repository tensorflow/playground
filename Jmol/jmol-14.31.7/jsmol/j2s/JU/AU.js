Clazz.declarePackage ("JU");
Clazz.load (null, "JU.AU", ["java.lang.reflect.Array", "java.util.Arrays", "JU.Lst"], function () {
c$ = Clazz.declareType (JU, "AU");
c$.ensureLength = Clazz.defineMethod (c$, "ensureLength", 
function (array, minimumLength) {
return (array != null && JU.AU.getLength (array) >= minimumLength ? array : JU.AU.arrayCopyObject (array, minimumLength));
}, "~O,~N");
c$.ensureLengthS = Clazz.defineMethod (c$, "ensureLengthS", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyS (array, minimumLength));
}, "~A,~N");
c$.ensureLengthA = Clazz.defineMethod (c$, "ensureLengthA", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyF (array, minimumLength));
}, "~A,~N");
c$.ensureLengthI = Clazz.defineMethod (c$, "ensureLengthI", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyI (array, minimumLength));
}, "~A,~N");
c$.ensureLengthShort = Clazz.defineMethod (c$, "ensureLengthShort", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyShort (array, minimumLength));
}, "~A,~N");
c$.ensureLengthByte = Clazz.defineMethod (c$, "ensureLengthByte", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyByte (array, minimumLength));
}, "~A,~N");
c$.doubleLength = Clazz.defineMethod (c$, "doubleLength", 
function (array) {
return JU.AU.arrayCopyObject (array, (array == null ? 16 : 2 * JU.AU.getLength (array)));
}, "~O");
c$.doubleLengthS = Clazz.defineMethod (c$, "doubleLengthS", 
function (array) {
return JU.AU.arrayCopyS (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthF = Clazz.defineMethod (c$, "doubleLengthF", 
function (array) {
return JU.AU.arrayCopyF (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthI = Clazz.defineMethod (c$, "doubleLengthI", 
function (array) {
return JU.AU.arrayCopyI (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthShort = Clazz.defineMethod (c$, "doubleLengthShort", 
function (array) {
return JU.AU.arrayCopyShort (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthByte = Clazz.defineMethod (c$, "doubleLengthByte", 
function (array) {
return JU.AU.arrayCopyByte (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthBool = Clazz.defineMethod (c$, "doubleLengthBool", 
function (array) {
return JU.AU.arrayCopyBool (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.deleteElements = Clazz.defineMethod (c$, "deleteElements", 
function (array, firstElement, nElements) {
if (nElements == 0 || array == null) return array;
var oldLength = JU.AU.getLength (array);
if (firstElement >= oldLength) return array;
var n = oldLength - (firstElement + nElements);
if (n < 0) n = 0;
var t = JU.AU.newInstanceO (array, firstElement + n);
if (firstElement > 0) System.arraycopy (array, 0, t, 0, firstElement);
if (n > 0) System.arraycopy (array, firstElement + nElements, t, firstElement, n);
return t;
}, "~O,~N,~N");
c$.arrayCopyObject = Clazz.defineMethod (c$, "arrayCopyObject", 
function (array, newLength) {
var oldLength = (array == null ? -1 : JU.AU.getLength (array));
if (newLength < 0) newLength = oldLength;
if (newLength == oldLength) return array;
{
if (newLength < oldLength) return Clazz.newArray(-1, array, 0, newLength);
}var t = JU.AU.newInstanceO (array, newLength);
if (oldLength > 0) System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
return t;
}, "~O,~N");
c$.newInstanceO = Clazz.defineMethod (c$, "newInstanceO", 
 function (array, n) {
if (JU.AU.isAI (array)) return  Clazz.newIntArray (n, 0);
{
if (!array.getClass || !array.getClass().getComponentType)
return new Array(n);
}return java.lang.reflect.Array.newInstance (array.getClass ().getComponentType (), n);
}, "~O,~N");
c$.getLength = Clazz.defineMethod (c$, "getLength", 
function (array) {
{
return array.length
}}, "~O");
c$.arrayCopyS = Clazz.defineMethod (c$, "arrayCopyS", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz.newArray(-1, array, 0, newLength);
}var t =  new Array (newLength);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyII = Clazz.defineMethod (c$, "arrayCopyII", 
function (array, newLength) {
var t = JU.AU.newInt2 (newLength);
if (array != null) {
var oldLength = array.length;
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyPt = Clazz.defineMethod (c$, "arrayCopyPt", 
function (array, newLength) {
if (newLength < 0) newLength = array.length;
var t =  new Array (newLength);
if (array != null) {
var oldLength = array.length;
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyF = Clazz.defineMethod (c$, "arrayCopyF", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz.newArray(-1, array, 0, newLength);
}var t =  Clazz.newFloatArray (newLength, 0);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyI = Clazz.defineMethod (c$, "arrayCopyI", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz.newArray(-1, array, 0, newLength);
}var t =  Clazz.newIntArray (newLength, 0);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyRangeI = Clazz.defineMethod (c$, "arrayCopyRangeI", 
function (array, i0, n) {
if (array == null) return null;
var oldLength = array.length;
if (n == -1) n = oldLength;
if (n == -2) n = Clazz.doubleToInt (oldLength / 2);
{
return Clazz.newArray(-1, array, i0, n);
}}, "~A,~N,~N");
c$.arrayCopyRangeRevI = Clazz.defineMethod (c$, "arrayCopyRangeRevI", 
function (array, i0, n) {
if (array == null) return null;
{
return Clazz.newArray(-1, array, i0, n).reverse();
}}, "~A,~N,~N");
c$.arrayCopyShort = Clazz.defineMethod (c$, "arrayCopyShort", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz.newArray(-1, array, 0, newLength);
}var t =  Clazz.newShortArray (newLength, 0);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyByte = Clazz.defineMethod (c$, "arrayCopyByte", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz.newArray(-1, array, 0, newLength);
}var t =  Clazz.newByteArray (newLength, 0);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyBool = Clazz.defineMethod (c$, "arrayCopyBool", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz.newArray(-1, array, 0, newLength);
}var t =  Clazz.newBooleanArray (newLength, false);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.swapInt = Clazz.defineMethod (c$, "swapInt", 
function (array, indexA, indexB) {
var t = array[indexA];
array[indexA] = array[indexB];
array[indexB] = t;
}, "~A,~N,~N");
c$.dumpArray = Clazz.defineMethod (c$, "dumpArray", 
function (msg, A, x1, x2, y1, y2) {
var s = "dumpArray: " + msg + "\n";
for (var x = x1; x <= x2; x++) s += "\t*" + x + "*";

for (var y = y2; y >= y1; y--) {
s += "\n*" + y + "*";
for (var x = x1; x <= x2; x++) s += "\t" + (x < A.length && y < A[x].length ? A[x][y] : NaN);

}
return s;
}, "~S,~A,~N,~N,~N,~N");
c$.dumpIntArray = Clazz.defineMethod (c$, "dumpIntArray", 
function (A, n) {
var str = "";
for (var i = 0; i < n; i++) str += " " + A[i];

return str;
}, "~A,~N");
c$.sortedItem = Clazz.defineMethod (c$, "sortedItem", 
function (v, n) {
if (v.size () == 0) return null;
if (v.size () == 1) return v.get (0);
var keys = v.toArray ( new Array (v.size ()));
java.util.Arrays.sort (keys);
return keys[n % keys.length];
}, "JU.Lst,~N");
c$.createArrayOfArrayList = Clazz.defineMethod (c$, "createArrayOfArrayList", 
function (size) {
return  new Array (size);
}, "~N");
c$.createArrayOfHashtable = Clazz.defineMethod (c$, "createArrayOfHashtable", 
function (size) {
return  new Array (size);
}, "~N");
c$.swap = Clazz.defineMethod (c$, "swap", 
function (o, i, j) {
var oi = o[i];
o[i] = o[j];
o[j] = oi;
}, "~A,~N,~N");
c$.newFloat2 = Clazz.defineMethod (c$, "newFloat2", 
function (n) {
{
return Clazz.newArray(n, null);
}}, "~N");
c$.newInt2 = Clazz.defineMethod (c$, "newInt2", 
function (n) {
{
return Clazz.newArray(n, null);
}}, "~N");
c$.newInt3 = Clazz.defineMethod (c$, "newInt3", 
function (nx, ny) {
{
return Clazz.newArray(nx, null);
}}, "~N,~N");
c$.newFloat3 = Clazz.defineMethod (c$, "newFloat3", 
function (nx, ny) {
{
return Clazz.newArray(nx, null);
}}, "~N,~N");
c$.newInt4 = Clazz.defineMethod (c$, "newInt4", 
function (n) {
{
return Clazz.newArray(n, null);
}}, "~N");
c$.newShort2 = Clazz.defineMethod (c$, "newShort2", 
function (n) {
{
return Clazz.newArray(n, null);
}}, "~N");
c$.newByte2 = Clazz.defineMethod (c$, "newByte2", 
function (n) {
{
return Clazz.newArray(n, null);
}}, "~N");
c$.newDouble2 = Clazz.defineMethod (c$, "newDouble2", 
function (n) {
{
return Clazz.newArray(n, null);
}}, "~N");
c$.removeMapKeys = Clazz.defineMethod (c$, "removeMapKeys", 
function (map, root) {
var list =  new JU.Lst ();
for (var key, $key = map.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) if (key.startsWith (root)) list.addLast (key);

for (var i = list.size (); --i >= 0; ) map.remove (list.get (i));

return list.size ();
}, "java.util.Map,~S");
c$.isAS = Clazz.defineMethod (c$, "isAS", 
function (x) {
{
return Clazz.isAS(x);
}}, "~O");
c$.isASS = Clazz.defineMethod (c$, "isASS", 
function (x) {
{
return Clazz.isASS(x);
}}, "~O");
c$.isAP = Clazz.defineMethod (c$, "isAP", 
function (x) {
{
return Clazz.isAP(x);
}}, "~O");
c$.isAF = Clazz.defineMethod (c$, "isAF", 
function (x) {
{
return Clazz.isAF(x);
}}, "~O");
c$.isAFloat = Clazz.defineMethod (c$, "isAFloat", 
function (x) {
{
return Clazz.isAFloat(x);
}}, "~O");
c$.isAD = Clazz.defineMethod (c$, "isAD", 
function (x) {
{
return Clazz.isAF(x);
}}, "~O");
c$.isADD = Clazz.defineMethod (c$, "isADD", 
function (x) {
{
return Clazz.isAFF(x);
}}, "~O");
c$.isAB = Clazz.defineMethod (c$, "isAB", 
function (x) {
{
return Clazz.isAB(x);
}}, "~O");
c$.isAI = Clazz.defineMethod (c$, "isAI", 
function (x) {
{
return Clazz.isAI(x);
}}, "~O");
c$.isAII = Clazz.defineMethod (c$, "isAII", 
function (x) {
{
return Clazz.isAII(x);
}}, "~O");
c$.isAFF = Clazz.defineMethod (c$, "isAFF", 
function (x) {
{
return Clazz.isAFF(x);
}}, "~O");
c$.isAFFF = Clazz.defineMethod (c$, "isAFFF", 
function (x) {
{
return Clazz.isAFFF(x);
}}, "~O");
c$.ensureSignedBytes = Clazz.defineMethod (c$, "ensureSignedBytes", 
function (b) {
if (b != null) {
{
for (var i = b.length; --i >= 0;) { var j = b[i] & 0xFF; if
(j >= 0x80) j -= 0x100; b[i] = j; }
}}return b;
}, "~A");
});
