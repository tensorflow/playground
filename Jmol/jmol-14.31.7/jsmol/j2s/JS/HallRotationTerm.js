Clazz.declarePackage ("JS");
Clazz.load (["JU.M4"], "JS.HallRotationTerm", ["JU.SB", "JS.HallRotation", "$.HallTranslation", "$.SymmetryOperation", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inputCode = null;
this.primitiveCode = null;
this.lookupCode = null;
this.translationString = null;
this.rotation = null;
this.translation = null;
this.seitzMatrix12ths = null;
this.isImproper = false;
this.order = 0;
this.axisType = '\0';
this.diagonalReferenceAxis = '\0';
this.allPositive = true;
Clazz.instantialize (this, arguments);
}, JS, "HallRotationTerm");
Clazz.prepareFields (c$, function () {
this.seitzMatrix12ths =  new JU.M4 ();
});
Clazz.makeConstructor (c$, 
function (hallInfo, code, prevOrder, prevAxisType) {
this.inputCode = code;
code += "   ";
if (code.charAt (0) == '-') {
this.isImproper = true;
code = code.substring (1);
}this.primitiveCode = "";
this.order = code.charCodeAt (0) - 48;
this.diagonalReferenceAxis = '\0';
this.axisType = '\0';
var ptr = 2;
var c;
switch (c = code.charAt (1)) {
case 'x':
case 'y':
case 'z':
switch (code.charAt (2)) {
case '\'':
case '"':
this.diagonalReferenceAxis = c;
c = code.charAt (2);
ptr++;
}
case '*':
this.axisType = c;
break;
case '\'':
case '"':
this.axisType = c;
switch (code.charAt (2)) {
case 'x':
case 'y':
case 'z':
this.diagonalReferenceAxis = code.charAt (2);
ptr++;
break;
default:
this.diagonalReferenceAxis = prevAxisType;
}
break;
default:
this.axisType = (this.order == 1 ? '_' : hallInfo.nRotations == 0 ? 'z' : hallInfo.nRotations == 2 ? '*' : prevOrder == 2 || prevOrder == 4 ? 'x' : '\'');
code = code.substring (0, 1) + this.axisType + code.substring (1);
}
this.primitiveCode += (this.axisType == '_' ? "1" : code.substring (0, 2));
if (this.diagonalReferenceAxis != '\0') {
code = code.substring (0, 1) + this.diagonalReferenceAxis + this.axisType + code.substring (ptr);
this.primitiveCode += this.diagonalReferenceAxis;
ptr = 3;
}this.lookupCode = code.substring (0, ptr);
this.rotation = JS.HallRotation.lookup (this.lookupCode);
if (this.rotation == null) {
JU.Logger.error ("Rotation lookup could not find " + this.inputCode + " ? " + this.lookupCode);
return;
}this.translation =  new JS.HallTranslation ('\0', null);
this.translationString = "";
var len = code.length;
for (var i = ptr; i < len; i++) {
var translationCode = code.charAt (i);
var t = JS.HallTranslation.getHallTranslation (translationCode, this.order);
if (t != null) {
this.translationString += "" + t.translationCode;
this.translation.rotationShift12ths += t.rotationShift12ths;
this.translation.vectorShift12ths.add (t.vectorShift12ths);
}}
this.primitiveCode = (this.isImproper ? "-" : "") + this.primitiveCode + this.translationString;
this.seitzMatrix12ths.setM4 (this.isImproper ? this.rotation.seitzMatrixInv : this.rotation.seitzMatrix);
this.seitzMatrix12ths.m03 = this.translation.vectorShift12ths.x;
this.seitzMatrix12ths.m13 = this.translation.vectorShift12ths.y;
this.seitzMatrix12ths.m23 = this.translation.vectorShift12ths.z;
switch (this.axisType) {
case 'x':
this.seitzMatrix12ths.m03 += this.translation.rotationShift12ths;
break;
case 'y':
this.seitzMatrix12ths.m13 += this.translation.rotationShift12ths;
break;
case 'z':
this.seitzMatrix12ths.m23 += this.translation.rotationShift12ths;
break;
}
if (hallInfo.vectorCode.length > 0) {
var m1 = JU.M4.newM4 (null);
var m2 = JU.M4.newM4 (null);
var v = hallInfo.vector12ths;
m1.m03 = v.x;
m1.m13 = v.y;
m1.m23 = v.z;
m2.m03 = -v.x;
m2.m13 = -v.y;
m2.m23 = -v.z;
this.seitzMatrix12ths.mul2 (m1, this.seitzMatrix12ths);
this.seitzMatrix12ths.mul (m2);
}if (JU.Logger.debugging) {
JU.Logger.debug ("code = " + code + "; primitive code =" + this.primitiveCode + "\n Seitz Matrix(12ths):" + this.seitzMatrix12ths);
}}, "JS.HallInfo,~S,~N,~S");
Clazz.defineMethod (c$, "dumpInfo", 
function (vectorCode) {
var sb =  new JU.SB ();
sb.append ("\ninput code: ").append (this.inputCode).append ("; primitive code: ").append (this.primitiveCode).append ("\norder: ").appendI (this.order).append (this.isImproper ? " (improper axis)" : "");
if (this.axisType != '_') {
sb.append ("; axisType: ").appendC (this.axisType);
if (this.diagonalReferenceAxis != '\0') sb.appendC (this.diagonalReferenceAxis);
}if (this.translationString.length > 0) sb.append ("; translation: ").append (this.translationString);
if (vectorCode.length > 0) sb.append ("; vector offset: ").append (vectorCode);
if (this.rotation != null) sb.append ("\noperator: ").append (this.getXYZ (this.allPositive)).append ("\nSeitz matrix:\n").append (JS.SymmetryOperation.dumpSeitz (this.seitzMatrix12ths, false));
return sb.toString ();
}, "~S");
Clazz.defineMethod (c$, "getXYZ", 
function (allPositive) {
return JS.SymmetryOperation.getXYZFromMatrix (this.seitzMatrix12ths, true, allPositive, true);
}, "~B");
});
