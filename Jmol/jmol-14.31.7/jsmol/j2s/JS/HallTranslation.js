Clazz.declarePackage ("JS");
Clazz.load (null, "JS.HallTranslation", ["JU.P3i"], function () {
c$ = Clazz.decorateAsClass (function () {
this.translationCode = '\0';
this.rotationOrder = 0;
this.rotationShift12ths = 0;
this.vectorShift12ths = null;
Clazz.instantialize (this, arguments);
}, JS, "HallTranslation");
Clazz.makeConstructor (c$, 
function (translationCode, params) {
this.translationCode = translationCode;
if (params != null) {
if (params.z >= 0) {
this.vectorShift12ths = params;
return;
}this.rotationOrder = params.x;
this.rotationShift12ths = params.y;
}this.vectorShift12ths =  new JU.P3i ();
}, "~S,JU.P3i");
c$.getHallLatticeEquivalent = Clazz.defineMethod (c$, "getHallLatticeEquivalent", 
function (latticeParameter) {
var latticeCode = JS.HallTranslation.getLatticeCode (latticeParameter);
var isCentrosymmetric = (latticeParameter > 0);
return (isCentrosymmetric ? "-" : "") + latticeCode + " 1";
}, "~N");
c$.getLatticeIndex = Clazz.defineMethod (c$, "getLatticeIndex", 
function (latt) {
for (var i = 1, ipt = 3; i <= JS.HallTranslation.nLatticeTypes; i++, ipt += 3) if (JS.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return i;

return 0;
}, "~S");
c$.getLatticeCode = Clazz.defineMethod (c$, "getLatticeCode", 
function (latt) {
if (latt < 0) latt = -latt;
return (latt == 0 ? '\0' : latt > JS.HallTranslation.nLatticeTypes ? JS.HallTranslation.getLatticeCode (JS.HallTranslation.getLatticeIndex (String.fromCharCode (latt))) : JS.HallTranslation.latticeTranslationData[latt * 3].charAt (0));
}, "~N");
c$.getLatticeDesignation = Clazz.defineMethod (c$, "getLatticeDesignation", 
function (latt) {
var isCentrosymmetric = (latt > 0);
var str = (isCentrosymmetric ? "-" : "");
if (latt < 0) latt = -latt;
if (latt == 0 || latt > JS.HallTranslation.nLatticeTypes) return "";
return str + JS.HallTranslation.getLatticeCode (latt) + ": " + (isCentrosymmetric ? "centrosymmetric " : "") + JS.HallTranslation.latticeTranslationData[latt * 3 + 1];
}, "~N");
c$.getLatticeDesignation2 = Clazz.defineMethod (c$, "getLatticeDesignation2", 
function (latticeCode, isCentrosymmetric) {
var latt = JS.HallTranslation.getLatticeIndex (latticeCode);
if (!isCentrosymmetric) latt = -latt;
return JS.HallTranslation.getLatticeDesignation (latt);
}, "~S,~B");
c$.getLatticeExtension = Clazz.defineMethod (c$, "getLatticeExtension", 
function (latt, isCentrosymmetric) {
for (var i = 1, ipt = 3; i <= JS.HallTranslation.nLatticeTypes; i++, ipt += 3) if (JS.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return JS.HallTranslation.latticeTranslationData[ipt + 2] + (isCentrosymmetric ? " -1" : "");

return "";
}, "~S,~B");
c$.getHallTerms = Clazz.defineMethod (c$, "getHallTerms", 
 function () {
return (JS.HallTranslation.hallTranslationTerms == null ? JS.HallTranslation.hallTranslationTerms =  Clazz.newArray (-1, [ new JS.HallTranslation ('a', JU.P3i.new3 (6, 0, 0)),  new JS.HallTranslation ('b', JU.P3i.new3 (0, 6, 0)),  new JS.HallTranslation ('c', JU.P3i.new3 (0, 0, 6)),  new JS.HallTranslation ('n', JU.P3i.new3 (6, 6, 6)),  new JS.HallTranslation ('u', JU.P3i.new3 (3, 0, 0)),  new JS.HallTranslation ('v', JU.P3i.new3 (0, 3, 0)),  new JS.HallTranslation ('w', JU.P3i.new3 (0, 0, 3)),  new JS.HallTranslation ('d', JU.P3i.new3 (3, 3, 3)),  new JS.HallTranslation ('1', JU.P3i.new3 (2, 6, -1)),  new JS.HallTranslation ('1', JU.P3i.new3 (3, 4, -1)),  new JS.HallTranslation ('2', JU.P3i.new3 (3, 8, -1)),  new JS.HallTranslation ('1', JU.P3i.new3 (4, 3, -1)),  new JS.HallTranslation ('3', JU.P3i.new3 (4, 9, -1)),  new JS.HallTranslation ('1', JU.P3i.new3 (6, 2, -1)),  new JS.HallTranslation ('2', JU.P3i.new3 (6, 4, -1)),  new JS.HallTranslation ('4', JU.P3i.new3 (6, 8, -1)),  new JS.HallTranslation ('5', JU.P3i.new3 (6, 10, -1)),  new JS.HallTranslation ('r', JU.P3i.new3 (4, 8, 8)),  new JS.HallTranslation ('s', JU.P3i.new3 (8, 8, 4)),  new JS.HallTranslation ('t', JU.P3i.new3 (8, 4, 8))]) : JS.HallTranslation.hallTranslationTerms);
});
c$.getHallTranslation = Clazz.defineMethod (c$, "getHallTranslation", 
function (translationCode, order) {
var ht = null;
for (var i = JS.HallTranslation.getHallTerms ().length; --i >= 0; ) {
var h = JS.HallTranslation.hallTranslationTerms[i];
if (h.translationCode == translationCode) {
if (h.rotationOrder == 0 || h.rotationOrder == order) {
ht =  new JS.HallTranslation (translationCode, null);
ht.translationCode = translationCode;
ht.rotationShift12ths = h.rotationShift12ths;
ht.vectorShift12ths = h.vectorShift12ths;
return ht;
}}}
return ht;
}, "~S,~N");
Clazz.defineStatics (c$,
"latticeTranslationData",  Clazz.newArray (-1, ["\0", "unknown", "", "P", "primitive", "", "I", "body-centered", " 1n", "R", "rhombohedral", " 1r 1r", "F", "face-centered", " 1ab 1bc 1ac", "A", "A-centered", " 1bc", "B", "B-centered", " 1ac", "C", "C-centered", " 1ab", "S", "rhombohedral(S)", " 1s 1s", "T", "rhombohedral(T)", " 1t 1t"]));
c$.nLatticeTypes = c$.prototype.nLatticeTypes = Clazz.doubleToInt (JS.HallTranslation.latticeTranslationData.length / 3) - 1;
Clazz.defineStatics (c$,
"hallTranslationTerms", null);
});
