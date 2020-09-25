Clazz.declarePackage ("JS");
Clazz.load (null, "JS.HallInfo", ["JU.P3i", "$.SB", "JS.HallRotationTerm", "$.HallTranslation", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hallSymbol = null;
this.primitiveHallSymbol = null;
this.latticeCode = '\0';
this.latticeExtension = null;
this.isCentrosymmetric = false;
this.nRotations = 0;
this.rotationTerms = null;
this.vector12ths = null;
this.vectorCode = null;
Clazz.instantialize (this, arguments);
}, JS, "HallInfo");
Clazz.prepareFields (c$, function () {
this.rotationTerms =  new Array (16);
});
Clazz.makeConstructor (c$, 
function (hallSymbol) {
try {
var str = this.hallSymbol = hallSymbol.trim ();
str = this.extractLatticeInfo (str);
if (JS.HallTranslation.getLatticeIndex (this.latticeCode) == 0) return;
this.latticeExtension = JS.HallTranslation.getLatticeExtension (this.latticeCode, this.isCentrosymmetric);
str = this.extractVectorInfo (str) + this.latticeExtension;
if (JU.Logger.debugging) JU.Logger.debug ("Hallinfo: " + hallSymbol + " " + str);
var prevOrder = 0;
var prevAxisType = '\u0000';
this.primitiveHallSymbol = "P";
while (str.length > 0 && this.nRotations < 16) {
str = this.extractRotationInfo (str, prevOrder, prevAxisType);
var r = this.rotationTerms[this.nRotations - 1];
prevOrder = r.order;
prevAxisType = r.axisType;
this.primitiveHallSymbol += " " + r.primitiveCode;
}
this.primitiveHallSymbol += this.vectorCode;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Invalid Hall symbol " + e);
this.nRotations = 0;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "dumpInfo", 
function () {
var sb =  new JU.SB ();
sb.append ("\nHall symbol: ").append (this.hallSymbol).append ("\nprimitive Hall symbol: ").append (this.primitiveHallSymbol).append ("\nlattice type: ").append (this.getLatticeDesignation ());
for (var i = 0; i < this.nRotations; i++) {
sb.append ("\n\nrotation term ").appendI (i + 1).append (this.rotationTerms[i].dumpInfo (this.vectorCode));
}
return sb.toString ();
});
Clazz.defineMethod (c$, "getLatticeDesignation", 
 function () {
return JS.HallTranslation.getLatticeDesignation2 (this.latticeCode, this.isCentrosymmetric);
});
Clazz.defineMethod (c$, "extractLatticeInfo", 
 function (name) {
var i = name.indexOf (" ");
if (i < 0) return "";
var term = name.substring (0, i).toUpperCase ();
this.latticeCode = term.charAt (0);
if (this.latticeCode == '-') {
this.isCentrosymmetric = true;
this.latticeCode = term.charAt (1);
}return name.substring (i + 1).trim ();
}, "~S");
Clazz.defineMethod (c$, "extractVectorInfo", 
 function (name) {
this.vector12ths =  new JU.P3i ();
this.vectorCode = "";
var i = name.indexOf ("(");
var j = name.indexOf (")", i);
if (i > 0 && j > i) {
var term = name.substring (i + 1, j);
this.vectorCode = " (" + term + ")";
name = name.substring (0, i).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.x = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.y = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
}}this.vector12ths.z = Integer.parseInt (term);
}return name;
}, "~S");
Clazz.defineMethod (c$, "extractRotationInfo", 
 function (name, prevOrder, prevAxisType) {
var i = name.indexOf (" ");
var code;
if (i >= 0) {
code = name.substring (0, i);
name = name.substring (i + 1).trim ();
} else {
code = name;
name = "";
}this.rotationTerms[this.nRotations] =  new JS.HallRotationTerm (this, code, prevOrder, prevAxisType);
this.nRotations++;
return name;
}, "~S,~N,~S");
});
