Clazz.declarePackage ("J.adapter.readers.pymol");
Clazz.load (["java.util.Hashtable", "JU.Lst"], "J.adapter.readers.pymol.PickleReader", ["java.lang.Double", "$.Long", "JU.AU", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.binaryDoc = null;
this.stack = null;
this.marks = null;
this.build = null;
this.memo = null;
this.logging = false;
this.id = 0;
this.markCount = 0;
this.filePt = 0;
this.emptyListPt = 0;
this.thisSection = null;
this.inMovie = false;
this.inNames = false;
this.thisName = null;
this.lastMark = 0;
this.retrieveCount = 0;
this.ipt = 0;
this.aTemp = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.pymol, "PickleReader");
Clazz.prepareFields (c$, function () {
this.stack =  new JU.Lst ();
this.marks =  new JU.Lst ();
this.build =  new JU.Lst ();
this.memo =  new java.util.Hashtable ();
this.aTemp =  Clazz.newByteArray (16, 0);
});
Clazz.makeConstructor (c$, 
function (doc, vwr) {
this.binaryDoc = doc;
this.vwr = vwr;
this.stack.ensureCapacity (1000);
}, "javajs.api.GenericBinaryDocument,JV.Viewer");
Clazz.defineMethod (c$, "log", 
 function (s) {
this.vwr.log (s + "\0");
}, "~S");
Clazz.defineMethod (c$, "getMap", 
function (logging) {
this.logging = logging;
var b;
var i;
var mark;
var d;
var o;
var a;
var map;
var l;
this.ipt = 0;
var going = true;
while (going) {
b = this.binaryDoc.readByte ();
this.ipt++;
switch (b) {
case 125:
this.push ( new java.util.Hashtable ());
break;
case 97:
o = this.pop ();
(this.peek ()).addLast (o);
break;
case 101:
l = this.getObjects (this.getMark ());
if (this.inNames && this.markCount == 2) {
var pt = this.binaryDoc.getPosition ();
var l2 =  new JU.Lst ();
l2.addLast (Integer.$valueOf (this.filePt));
l2.addLast (Integer.$valueOf (pt - this.filePt));
l.addLast (l2);
}(this.peek ()).addAll (l);
break;
case 71:
d = this.binaryDoc.readDouble ();
this.push (Double.$valueOf (d));
break;
case 74:
i = this.binaryDoc.readIntLE ();
this.push (Integer.$valueOf (i));
break;
case 75:
i = this.binaryDoc.readByte () & 0xff;
this.push (Integer.$valueOf (i));
break;
case 77:
i = (this.binaryDoc.readByte () & 0xff | ((this.binaryDoc.readByte () & 0xff) << 8)) & 0xffff;
this.push (Integer.$valueOf (i));
break;
case 113:
i = this.binaryDoc.readByte ();
this.putMemo (i, false);
break;
case 114:
i = this.binaryDoc.readIntLE ();
this.putMemo (i, true);
break;
case 104:
i = this.binaryDoc.readByte ();
o = this.getMemo (i);
this.push (o == null ? "BINGET" + (++this.id) : o);
break;
case 106:
i = this.binaryDoc.readIntLE ();
o = this.getMemo (i);
this.push (o == null ? "LONG_BINGET" + (++this.id) : o);
break;
case 85:
i = this.binaryDoc.readByte () & 0xff;
a =  Clazz.newByteArray (i, 0);
this.binaryDoc.readByteArray (a, 0, i);
if (this.inNames && this.markCount == 3 && this.lastMark == this.stack.size ()) {
this.thisName = this.bytesToString (a);
this.filePt = this.emptyListPt;
}this.push (a);
break;
case 84:
i = this.binaryDoc.readIntLE ();
a =  Clazz.newByteArray (i, 0);
this.binaryDoc.readByteArray (a, 0, i);
this.push (a);
break;
case 88:
i = this.binaryDoc.readIntLE ();
a =  Clazz.newByteArray (i, 0);
this.binaryDoc.readByteArray (a, 0, i);
this.push (a);
break;
case 93:
this.emptyListPt = this.binaryDoc.getPosition () - 1;
this.push ( new JU.Lst ());
break;
case 99:
l =  new JU.Lst ();
l.addLast ("global");
l.addLast (this.readStringAsBytes ());
l.addLast (this.readStringAsBytes ());
this.push (l);
break;
case 98:
o = this.pop ();
this.build.addLast (o);
break;
case 40:
this.putMark (this.stack.size ());
break;
case 78:
this.push (null);
break;
case 111:
this.push (this.getObjects (this.getMark ()));
break;
case 115:
o = this.pop ();
var s = this.bytesToString (this.pop ());
(this.peek ()).put (s, o);
break;
case 117:
mark = this.getMark ();
l = this.getObjects (mark);
o = this.peek ();
if (Clazz.instanceOf (o, JU.Lst)) {
for (i = 0; i < l.size (); i++) {
var oo = l.get (i);
(o).addLast (oo);
}
} else {
map = o;
for (i = l.size (); --i >= 0; ) {
o = l.get (i);
var key = this.bytesToString (l.get (--i));
map.put (key, o);
}
}break;
case 46:
going = false;
break;
case 116:
this.push (this.getObjects (this.getMark ()));
break;
case 76:
var val =  String.instantialize (this.readStringAsBytes ());
if (val != null && val.endsWith ("L")) {
val = val.substring (0, val.length - 1);
}this.push (Long.$valueOf (val));
break;
case 82:
this.pop ();
break;
case 73:
s = this.bytesToString (this.readStringAsBytes ());
try {
this.push (Integer.$valueOf (Integer.parseInt (s)));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
var ll = Long.parseLong (s);
this.push (Integer.$valueOf ((ll & 0xFFFFFFFF)));
} else {
throw e;
}
}
break;
case 41:
this.push ( new JU.Lst ());
break;
default:
JU.Logger.error ("Pickle reader error: " + b + " " + this.binaryDoc.getPosition ());
}
}
if (logging) this.log ("");
JU.Logger.info ("PyMOL Pickle reader cached " + this.memo.size () + " tokens; retrieved " + this.retrieveCount);
map = this.stack.removeItemAt (0);
if (map.size () == 0) for (i = this.stack.size (); --i >= 0; ) {
o = this.stack.get (i--);
a = this.stack.get (i);
map.put (this.bytesToString (a), o);
}
this.memo = null;
return map;
}, "~B");
Clazz.defineMethod (c$, "bytesToString", 
 function (o) {
try {
return (JU.AU.isAB (o) ?  String.instantialize (o, "UTF-8") : o.toString ());
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
return "";
} else {
throw e;
}
}
}, "~O");
Clazz.defineMethod (c$, "putMemo", 
 function (i, doCheck) {
var o = this.peek ();
if (JU.AU.isAB (o)) o = this.bytesToString (o);
if (Clazz.instanceOf (o, String)) {
this.memo.put (Integer.$valueOf (i), o);
}}, "~N,~B");
Clazz.defineMethod (c$, "getMemo", 
 function (i) {
var o = this.memo.get (Integer.$valueOf (i));
if (o == null) return o;
this.retrieveCount++;
return o;
}, "~N");
Clazz.defineMethod (c$, "getObjects", 
 function (mark) {
var n = this.stack.size () - mark;
var args =  new JU.Lst ();
args.ensureCapacity (n);
for (var i = mark; i < this.stack.size (); ++i) {
var oo = this.stack.get (i);
args.addLast (oo);
}
for (var i = this.stack.size (); --i >= mark; ) this.stack.removeItemAt (i);

return args;
}, "~N");
Clazz.defineMethod (c$, "readStringAsBytes", 
 function () {
var n = 0;
var a = this.aTemp;
while (true) {
var b = this.binaryDoc.readByte ();
if (b == 0xA) break;
if (n >= a.length) a = this.aTemp = JU.AU.arrayCopyByte (a, a.length * 2);
a[n++] = b;
}
return JU.AU.arrayCopyByte (a, n);
});
Clazz.defineMethod (c$, "putMark", 
 function (i) {
if (this.logging) this.log ("\n " + Integer.toHexString (this.binaryDoc.getPosition ()) + " [");
this.marks.addLast (Integer.$valueOf (this.lastMark = i));
this.markCount++;
switch (this.markCount) {
case 2:
var o = this.stack.get (i - 2);
if (JU.AU.isAB (o)) {
this.thisSection = this.bytesToString (o);
this.inMovie = "movie".equals (this.thisSection);
this.inNames = "names".equals (this.thisSection);
}break;
default:
break;
}
}, "~N");
Clazz.defineMethod (c$, "getMark", 
 function () {
return this.marks.removeItemAt (--this.markCount).intValue ();
});
Clazz.defineMethod (c$, "push", 
 function (o) {
if (this.logging && (Clazz.instanceOf (o, String) || Clazz.instanceOf (o, Double) || Clazz.instanceOf (o, Integer))) this.log ((Clazz.instanceOf (o, String) ? "'" + o + "'" : o) + ", ");
this.stack.addLast (o);
}, "~O");
Clazz.defineMethod (c$, "peek", 
 function () {
return this.stack.get (this.stack.size () - 1);
});
Clazz.defineMethod (c$, "pop", 
 function () {
return this.stack.removeItemAt (this.stack.size () - 1);
});
Clazz.defineStatics (c$,
"APPEND", 97,
"APPENDS", 101,
"BINFLOAT", 71,
"BININT", 74,
"BININT1", 75,
"BININT2", 77,
"BINPUT", 113,
"BINSTRING", 84,
"BINUNICODE", 88,
"BUILD", 98,
"EMPTY_DICT", 125,
"EMPTY_LIST", 93,
"GLOBAL", 99,
"LONG_BINPUT", 114,
"MARK", 40,
"NONE", 78,
"OBJ", 111,
"SETITEM", 115,
"SETITEMS", 117,
"SHORT_BINSTRING", 85,
"STOP", 46,
"BINGET", 104,
"LONG_BINGET", 106,
"TUPLE", 116,
"INT", 73,
"EMPTY_TUPLE", 41,
"LONG", 76,
"REDUCE", 82);
});
