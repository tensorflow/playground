Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["JU.P3"], "J.adapter.smarter.Atom", ["JU.AU", "$.Lst", "$.V3", "JU.Vibration"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atomSetIndex = 0;
this.index = 0;
this.bsSymmetry = null;
this.atomSite = 0;
this.elementSymbol = null;
this.elementNumber = -1;
this.atomName = null;
this.formalCharge = -2147483648;
this.partialCharge = NaN;
this.vib = null;
this.bfactor = NaN;
this.foccupancy = 1;
this.radius = NaN;
this.isHetero = false;
this.atomSerial = -2147483648;
this.chainID = 0;
this.altLoc = '\0';
this.group3 = null;
this.sequenceNumber = -2147483648;
this.insertionCode = '\0';
this.anisoBorU = null;
this.tensors = null;
this.ignoreSymmetry = false;
Clazz.instantialize (this, arguments);
}, J.adapter.smarter, "Atom", JU.P3, Cloneable);
Clazz.defineMethod (c$, "addTensor", 
function (tensor, type, reset) {
if (tensor == null) return null;
if (reset || this.tensors == null) this.tensors =  new JU.Lst ();
this.tensors.addLast (tensor);
if (type != null) tensor.setType (type);
return tensor;
}, "JU.Tensor,~S,~B");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.smarter.Atom, []);
this.set (NaN, NaN, NaN);
});
Clazz.defineMethod (c$, "getClone", 
function () {
var a = this.clone ();
if (this.vib != null) {
if (Clazz.instanceOf (this.vib, JU.Vibration)) {
a.vib = (this.vib).clone ();
} else {
a.vib = JU.V3.newV (a.vib);
}}if (this.anisoBorU != null) a.anisoBorU = JU.AU.arrayCopyF (this.anisoBorU, -1);
if (this.tensors != null) {
a.tensors =  new JU.Lst ();
for (var i = this.tensors.size (); --i >= 0; ) a.tensors.addLast ((this.tensors.get (i)).copyTensor ());

}return a;
});
Clazz.defineMethod (c$, "getElementSymbol", 
function () {
if (this.elementSymbol == null && this.atomName != null) {
var len = this.atomName.length;
var ichFirst = 0;
var chFirst = String.fromCharCode (0);
while (ichFirst < len && !J.adapter.smarter.Atom.isValidSymChar1 (chFirst = this.atomName.charAt (ichFirst))) ++ichFirst;

switch (len - ichFirst) {
case 0:
break;
default:
var chSecond = this.atomName.charAt (ichFirst + 1);
if (J.adapter.smarter.Atom.isValidSymNoCase (chFirst, chSecond)) {
this.elementSymbol = "" + chFirst + chSecond;
break;
}case 1:
if (J.adapter.smarter.Atom.isValidSym1 (chFirst)) this.elementSymbol = "" + chFirst;
break;
}
}return this.elementSymbol;
});
c$.isValidSym1 = Clazz.defineMethod (c$, "isValidSym1", 
function (ch) {
return (ch >= 'A' && ch <= 'Z' && J.adapter.smarter.Atom.elementCharMasks[ch.charCodeAt (0) - 65] < 0);
}, "~S");
c$.isValidSym2 = Clazz.defineMethod (c$, "isValidSym2", 
function (ch1, ch2) {
return (ch1 >= 'A' && ch1 <= 'Z' && ch2 >= 'a' && ch2 <= 'z' && ((J.adapter.smarter.Atom.elementCharMasks[ch1.charCodeAt (0) - 65] >> (ch2.charCodeAt (0) - 97)) & 1) != 0);
}, "~S,~S");
c$.isValidSymNoCase = Clazz.defineMethod (c$, "isValidSymNoCase", 
function (ch1, ch2) {
return J.adapter.smarter.Atom.isValidSym2 (ch1, ch2 < 'a' ? String.fromCharCode (ch2.charCodeAt (0) + 32) : ch2);
}, "~S,~S");
c$.isValidSymChar1 = Clazz.defineMethod (c$, "isValidSymChar1", 
 function (ch) {
return (ch >= 'A' && ch <= 'Z' && J.adapter.smarter.Atom.elementCharMasks[ch.charCodeAt (0) - 65] != 0);
}, "~S");
Clazz.defineStatics (c$,
"elementCharMasks",  Clazz.newIntArray (-1, [1972292, -2147351151, -2146019271, -2130706430, 1441792, -2147348464, 25, -2147205008, -2147344384, 0, -2147352576, 1179905, 548936, -2147434213, -2147221504, -2145759221, 0, 1056947, -2147339946, -2147477097, -2147483648, -2147483648, -2147483648, 8388624, -2147483646, 139264]));
});
