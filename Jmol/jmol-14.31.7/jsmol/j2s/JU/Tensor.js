Clazz.declarePackage ("JU");
Clazz.load (null, "JU.Tensor", ["java.lang.Float", "java.util.Arrays", "$.Hashtable", "JU.Eigen", "$.M3", "$.P3", "$.PT", "$.Quat", "$.V3", "JU.EigenSort", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.id = null;
this.type = null;
this.iType = -1;
this.asymMatrix = null;
this.symMatrix = null;
this.eigenVectors = null;
this.eigenValues = null;
this.parBorU = null;
this.altType = null;
this.isIsotropic = false;
this.forThermalEllipsoid = false;
this.eigenSignMask = 7;
this.typeFactor = 1;
this.sortIso = false;
this.modelIndex = 0;
this.atomIndex1 = -1;
this.atomIndex2 = -1;
this.isModulated = false;
this.isUnmodulated = false;
Clazz.instantialize (this, arguments);
}, JU, "Tensor");
c$.getType = Clazz.defineMethod (c$, "getType", 
 function (type) {
var pt = type.indexOf ("_");
if (pt >= 0) type = type.substring (0, pt);
pt = ";iso........;adp........;tls-u......;tls-r......;ms.........;efg........;isc........;charge.....;quadrupole.;raman......;csa........".indexOf (";" + type.toLowerCase () + ".");
return (pt < 0 ? -1 : Clazz.doubleToInt (pt / 11));
}, "~S");
c$.getInfoIndex = Clazz.defineMethod (c$, "getInfoIndex", 
 function (infoType) {
if (infoType.charAt (0) != ';') infoType = ";" + infoType + ".";
return Clazz.doubleToInt (";.............;eigenvalues..;eigenvectors.;asymmatrix...;symmatrix....;value........;isotropy.....;anisotropy...;asymmetry....;eulerzyz.....;eulerzxz.....;quaternion...;indices......;string.......;type.........;id...........;span.........;skew.........".indexOf (infoType) / 14);
}, "~S");
c$.isFloatInfo = Clazz.defineMethod (c$, "isFloatInfo", 
function (infoType) {
switch (JU.Tensor.getInfoIndex (infoType)) {
default:
return false;
case 5:
case 6:
case 7:
case 8:
case 16:
case 17:
return true;
}
}, "~S");
Clazz.defineMethod (c$, "getInfo", 
function (infoType) {
switch (JU.Tensor.getInfoIndex (infoType)) {
default:
var info =  new java.util.Hashtable ();
var s = JU.PT.getTokens (JU.PT.replaceWithCharacter (";.............;eigenvalues..;eigenvectors.;asymmatrix...;symmatrix....;value........;isotropy.....;anisotropy...;asymmetry....;eulerzyz.....;eulerzxz.....;quaternion...;indices......;string.......;type.........;id...........;span.........;skew.........", ";.", ' ').trim ());
java.util.Arrays.sort (s);
for (var i = 0; i < s.length; i++) {
var o = this.getInfo (s[i]);
if (o != null) info.put (s[i], o);
}
return info;
case 1:
return this.eigenValues;
case 2:
var list =  new Array (3);
for (var i = 0; i < 3; i++) list[i] = JU.P3.newP (this.eigenVectors[i]);

return list;
case 3:
if (this.asymMatrix == null) return null;
var a =  Clazz.newFloatArray (9, 0);
var pt = 0;
for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) a[pt++] = this.asymMatrix[i][j];


return JU.M3.newA9 (a);
case 4:
if (this.symMatrix == null) return null;
var b =  Clazz.newFloatArray (9, 0);
var p2 = 0;
for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) b[p2++] = this.symMatrix[i][j];


return JU.M3.newA9 (b);
case 5:
return Float.$valueOf (this.eigenValues[2]);
case 6:
return Float.$valueOf (this.isotropy ());
case 7:
return Float.$valueOf (this.anisotropy ());
case 8:
return Float.$valueOf (this.asymmetry ());
case 9:
return (this.getInfo ("quaternion")).getEulerZYZ ();
case 10:
return (this.getInfo ("quaternion")).getEulerZXZ ();
case 11:
return JU.Quat.getQuaternionFrame (null, this.eigenVectors[0], this.eigenVectors[1]);
case 12:
return  Clazz.newIntArray (-1, [this.modelIndex, this.atomIndex1, this.atomIndex2]);
case 13:
return this.toString ();
case 14:
return this.type;
case 15:
return this.id;
case 16:
return Float.$valueOf (this.span ());
case 17:
return Float.$valueOf (this.skew ());
}
}, "~S");
Clazz.defineMethod (c$, "isotropy", 
function () {
return (this.eigenValues[0] + this.eigenValues[1] + this.eigenValues[2]) / 3;
});
Clazz.defineMethod (c$, "span", 
function () {
return Math.abs (this.eigenValues[2] - this.eigenValues[0]);
});
Clazz.defineMethod (c$, "skew", 
function () {
return (this.span () == 0 ? 0 : 3 * (this.eigenValues[1] - this.isotropy ()) / this.span ());
});
Clazz.defineMethod (c$, "anisotropy", 
function () {
return this.eigenValues[2] - (this.eigenValues[0] + this.eigenValues[1]) / 2;
});
Clazz.defineMethod (c$, "reducedAnisotropy", 
function () {
return this.anisotropy () * 2 / 3;
});
Clazz.defineMethod (c$, "asymmetry", 
function () {
return this.span () == 0 ? 0 : (this.eigenValues[1] - this.eigenValues[0]) / this.reducedAnisotropy ();
});
Clazz.defineMethod (c$, "copyTensor", 
function () {
var t =  new JU.Tensor ();
t.setType (this.type);
t.eigenValues = this.eigenValues;
t.eigenVectors = this.eigenVectors;
t.asymMatrix = this.asymMatrix;
t.symMatrix = this.symMatrix;
t.eigenSignMask = this.eigenSignMask;
t.modelIndex = this.modelIndex;
t.atomIndex1 = this.atomIndex1;
t.atomIndex2 = this.atomIndex2;
t.parBorU = this.parBorU;
t.id = this.id;
return t;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setFromAsymmetricTensor", 
function (asymmetricTensor, type, id) {
var a =  Clazz.newDoubleArray (3, 3, 0);
for (var i = 3; --i >= 0; ) for (var j = 3; --j >= 0; ) a[i][j] = asymmetricTensor[i][j];


if (a[0][1] != a[1][0]) {
a[0][1] = a[1][0] = (a[0][1] + a[1][0]) / 2;
}if (a[1][2] != a[2][1]) {
a[1][2] = a[2][1] = (a[1][2] + a[2][1]) / 2;
}if (a[0][2] != a[2][0]) {
a[0][2] = a[2][0] = (a[0][2] + a[2][0]) / 2;
}var m =  new JU.M3 ();
var mm =  Clazz.newFloatArray (9, 0);
for (var i = 0, p = 0; i < 3; i++) for (var j = 0; j < 3; j++) mm[p++] = a[i][j];


m.setA (mm);
var vectors =  new Array (3);
var values =  Clazz.newFloatArray (3, 0);
 new JU.Eigen ().setM (a).fillFloatArrays (vectors, values);
this.newTensorType (vectors, values, type, id);
this.asymMatrix = asymmetricTensor;
this.symMatrix = a;
this.id = id;
return this;
}, "~A,~S,~S");
Clazz.defineMethod (c$, "setFromEigenVectors", 
function (eigenVectors, eigenValues, type, id, t) {
var values =  Clazz.newFloatArray (3, 0);
var vectors =  new Array (3);
for (var i = 0; i < 3; i++) {
vectors[i] = JU.V3.newV (eigenVectors[i]);
values[i] = eigenValues[i];
}
this.newTensorType (vectors, values, type, id);
if (t != null) {
this.isModulated = t.isModulated;
this.isUnmodulated = t.isUnmodulated;
this.parBorU = t.parBorU;
}return this;
}, "~A,~A,~S,~S,JU.Tensor");
Clazz.defineMethod (c$, "setFromAxes", 
function (axes) {
this.eigenValues =  Clazz.newFloatArray (3, 0);
this.eigenVectors =  new Array (3);
for (var i = 0; i < 3; i++) {
this.eigenVectors[i] = JU.V3.newV (axes[i]);
this.eigenValues[i] = axes[i].length ();
if (this.eigenValues[i] == 0) return null;
this.eigenVectors[i].normalize ();
}
if (Math.abs (this.eigenVectors[0].dot (this.eigenVectors[1])) > 0.0001 || Math.abs (this.eigenVectors[1].dot (this.eigenVectors[2])) > 0.0001 || Math.abs (this.eigenVectors[2].dot (this.eigenVectors[0])) > 0.0001) return null;
this.setType ("other");
this.sortAndNormalize ();
return this;
}, "~A");
Clazz.defineMethod (c$, "setFromThermalEquation", 
function (coefs, id) {
this.eigenValues =  Clazz.newFloatArray (3, 0);
this.eigenVectors =  new Array (3);
this.id = (id == null ? "coefs=" + JU.Escape.eAD (coefs) : id);
var mat =  Clazz.newDoubleArray (3, 3, 0);
mat[0][0] = coefs[0];
mat[1][1] = coefs[1];
mat[2][2] = coefs[2];
mat[0][1] = mat[1][0] = coefs[3] / 2;
mat[0][2] = mat[2][0] = coefs[4] / 2;
mat[1][2] = mat[2][1] = coefs[5] / 2;
 new JU.Eigen ().setM (mat).fillFloatArrays (this.eigenVectors, this.eigenValues);
this.setType ("adp");
this.sortAndNormalize ();
return this;
}, "~A,~S");
Clazz.defineMethod (c$, "setType", 
function (type) {
if (this.type == null || type == null) this.type = type;
if (type != null) this.processType ();
return this;
}, "~S");
Clazz.defineMethod (c$, "getFactoredValue", 
function (i) {
var f = Math.abs (this.eigenValues[i]);
return (this.forThermalEllipsoid ? Math.sqrt (f) : f) * this.typeFactor;
}, "~N");
Clazz.defineMethod (c$, "setAtomIndexes", 
function (index1, index2) {
this.atomIndex1 = index1;
this.atomIndex2 = index2;
}, "~N,~N");
Clazz.defineMethod (c$, "isSelected", 
function (bsSelected, iAtom) {
return (iAtom >= 0 ? (this.atomIndex1 == iAtom || this.atomIndex2 == iAtom) : bsSelected.get (this.atomIndex1) && (this.atomIndex2 < 0 || bsSelected.get (this.atomIndex2)));
}, "JU.BS,~N");
Clazz.defineMethod (c$, "newTensorType", 
 function (vectors, values, type, id) {
this.eigenValues = values;
this.eigenVectors = vectors;
for (var i = 0; i < 3; i++) this.eigenVectors[i].normalize ();

this.setType (type);
this.id = id;
this.sortAndNormalize ();
this.eigenSignMask = (this.eigenValues[0] >= 0 ? 1 : 0) + (this.eigenValues[1] >= 0 ? 2 : 0) + (this.eigenValues[2] >= 0 ? 4 : 0);
}, "~A,~A,~S,~S");
Clazz.defineMethod (c$, "processType", 
 function () {
this.forThermalEllipsoid = false;
this.isIsotropic = false;
this.altType = null;
this.typeFactor = 1;
this.sortIso = false;
switch (this.iType = JU.Tensor.getType (this.type)) {
case 0:
this.forThermalEllipsoid = true;
this.isIsotropic = true;
this.altType = "1";
this.type = "adp";
break;
case 1:
this.forThermalEllipsoid = true;
this.typeFactor = JU.Tensor.ADP_FACTOR;
this.altType = "1";
break;
case 10:
this.sortIso = true;
this.typeFactor = 0.01;
case 4:
this.sortIso = true;
this.typeFactor = 0.01;
break;
case 5:
this.sortIso = true;
break;
case 6:
this.sortIso = true;
this.typeFactor = 0.04;
break;
case 3:
this.altType = "2";
break;
case 2:
this.altType = "3";
break;
case 7:
case 8:
break;
}
});
Clazz.defineMethod (c$, "sortAndNormalize", 
 function () {
var o =  Clazz.newArray (-1, [ Clazz.newArray (-1, [JU.V3.newV (this.eigenVectors[0]), Float.$valueOf (this.eigenValues[0])]),  Clazz.newArray (-1, [JU.V3.newV (this.eigenVectors[1]), Float.$valueOf (this.eigenValues[1])]),  Clazz.newArray (-1, [JU.V3.newV (this.eigenVectors[2]), Float.$valueOf (this.eigenValues[2])])]);
java.util.Arrays.sort (o, JU.Tensor.getEigenSort ());
for (var i = 0; i < 3; i++) {
var pt = i;
this.eigenVectors[i] = (o[pt])[0];
this.eigenValues[i] = ((o[pt])[1]).floatValue ();
}
if (this.sortIso && this.eigenValues[2] - this.eigenValues[1] < this.eigenValues[1] - this.eigenValues[0]) {
var vTemp = this.eigenVectors[0];
this.eigenVectors[0] = this.eigenVectors[2];
this.eigenVectors[2] = vTemp;
var f = this.eigenValues[0];
this.eigenValues[0] = this.eigenValues[2];
this.eigenValues[2] = f;
}for (var i = 0; i < 3; i++) this.eigenVectors[i].normalize ();

});
Clazz.defineMethod (c$, "isEquiv", 
function (t) {
if (t.iType != this.iType) return false;
var f = Math.abs (this.eigenValues[0] + this.eigenValues[1] + this.eigenValues[2]);
for (var i = 0; i < 3; i++) if (Math.abs (t.eigenValues[i] - this.eigenValues[i]) / f > 0.0003) return false;

return true;
}, "JU.Tensor");
c$.getEigenSort = Clazz.defineMethod (c$, "getEigenSort", 
 function () {
return (JU.Tensor.tSort == null ? (JU.Tensor.tSort =  new JU.EigenSort ()) : JU.Tensor.tSort);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return (this.type + " " + this.modelIndex + " " + this.atomIndex1 + " " + this.atomIndex2 + "\n" + (this.eigenVectors == null ? "" + this.eigenValues[0] : this.eigenVectors[0] + "\t" + this.eigenValues[0] + "\t" + "\n" + this.eigenVectors[1] + "\t" + this.eigenValues[1] + "\t" + "\n" + this.eigenVectors[2] + "\t" + this.eigenValues[2] + "\t" + "\n"));
});
c$.ADP_FACTOR = c$.prototype.ADP_FACTOR = (Math.sqrt (0.5) / 3.141592653589793);
Clazz.defineStatics (c$,
"MAGNETIC_SUSCEPTIBILITY_FACTOR", 0.01,
"INTERACTION_FACTOR", 0.04,
"CHEMICAL_SHIFT_ANISOTROPY_FACTOR", 0.01,
"tSort", null,
"KNOWN_TYPES", ";iso........;adp........;tls-u......;tls-r......;ms.........;efg........;isc........;charge.....;quadrupole.;raman......;csa........",
"TYPE_OTHER", -1,
"TYPE_ISO", 0,
"TYPE_ADP", 1,
"TYPE_TLS_U", 2,
"TYPE_TLS_R", 3,
"TYPE_MS", 4,
"TYPE_EFG", 5,
"TYPE_ISC", 6,
"TYPE_CHARGE", 7,
"TYPE_QUADRUPOLE", 8,
"TYPE_RAMAN", 9,
"TYPE_CSA", 10,
"infoList", ";.............;eigenvalues..;eigenvectors.;asymmatrix...;symmatrix....;value........;isotropy.....;anisotropy...;asymmetry....;eulerzyz.....;eulerzxz.....;quaternion...;indices......;string.......;type.........;id...........;span.........;skew.........");
});
