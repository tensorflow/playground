Clazz.declarePackage ("JS");
Clazz.load (["JU.M4"], "JS.SymmetryOperation", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.Matrix", "$.P3", "$.PT", "$.SB", "$.V3", "JU.Logger", "$.Parser"], function () {
c$ = Clazz.decorateAsClass (function () {
this.xyzOriginal = null;
this.xyz = null;
this.doNormalize = true;
this.isFinalized = false;
this.opId = 0;
this.centering = null;
this.myLabels = null;
this.modDim = 0;
this.linearRotTrans = null;
this.rsvs = null;
this.isBio = false;
this.sigma = null;
this.index = 0;
this.subsystemCode = null;
this.timeReversal = 0;
this.unCentered = false;
this.isCenteringOp = false;
this.magOp = 3.4028235E38;
this.info = null;
Clazz.instantialize (this, arguments);
}, JS, "SymmetryOperation", JU.M4);
Clazz.defineMethod (c$, "setSigma", 
function (subsystemCode, sigma) {
this.subsystemCode = subsystemCode;
this.sigma = sigma;
}, "~S,JU.Matrix");
Clazz.overrideConstructor (c$, 
function (op, atoms, atomIndex, countOrId, doNormalize) {
this.doNormalize = doNormalize;
if (op == null) {
this.opId = countOrId;
return;
}this.xyzOriginal = op.xyzOriginal;
this.xyz = op.xyz;
this.opId = op.opId;
this.modDim = op.modDim;
this.myLabels = op.myLabels;
this.index = op.index;
this.linearRotTrans = op.linearRotTrans;
this.sigma = op.sigma;
this.subsystemCode = op.subsystemCode;
this.timeReversal = op.timeReversal;
this.setMatrix (false);
if (!op.isFinalized) this.doFinalize ();
if (doNormalize && this.sigma == null) JS.SymmetryOperation.setOffset (this, atoms, atomIndex, countOrId);
}, "JS.SymmetryOperation,~A,~N,~N,~B");
Clazz.defineMethod (c$, "setGamma", 
 function (isReverse) {
var n = 3 + this.modDim;
var a = (this.rsvs =  new JU.Matrix (null, n + 1, n + 1)).getArray ();
var t =  Clazz.newDoubleArray (n, 0);
var pt = 0;
for (var i = 0; i < n; i++) {
for (var j = 0; j < n; j++) a[i][j] = this.linearRotTrans[pt++];

t[i] = (isReverse ? -1 : 1) * this.linearRotTrans[pt++];
}
a[n][n] = 1;
if (isReverse) this.rsvs = this.rsvs.inverse ();
for (var i = 0; i < n; i++) a[i][n] = t[i];

a = this.rsvs.getSubmatrix (0, 0, 3, 3).getArray ();
for (var i = 0; i < 3; i++) for (var j = 0; j < 4; j++) this.setElement (i, j, (j < 3 ? a[i][j] : t[i]));


this.setElement (3, 3, 1);
}, "~B");
Clazz.defineMethod (c$, "doFinalize", 
function () {
JS.SymmetryOperation.div12 (this);
if (this.modDim > 0) {
var a = this.rsvs.getArray ();
for (var i = a.length - 1; --i >= 0; ) a[i][3 + this.modDim] /= 12;

}this.isFinalized = true;
});
c$.div12 = Clazz.defineMethod (c$, "div12", 
 function (op) {
op.m03 /= 12;
op.m13 /= 12;
op.m23 /= 12;
return op;
}, "JU.M4");
Clazz.defineMethod (c$, "getXyz", 
function (normalized) {
return (normalized && this.modDim == 0 || this.xyzOriginal == null ? this.xyz : this.xyzOriginal);
}, "~B");
c$.newPoint = Clazz.defineMethod (c$, "newPoint", 
function (m, atom1, atom2, x, y, z) {
m.rotTrans2 (atom1, atom2);
atom2.add3 (x, y, z);
}, "JU.M4,JU.P3,JU.P3,~N,~N,~N");
Clazz.defineMethod (c$, "dumpInfo", 
function () {
return "\n" + this.xyz + "\ninternal matrix representation:\n" + this.toString ();
});
c$.dumpSeitz = Clazz.defineMethod (c$, "dumpSeitz", 
function (s, isCanonical) {
var sb =  new JU.SB ();
var r =  Clazz.newFloatArray (4, 0);
for (var i = 0; i < 3; i++) {
s.getRow (i, r);
sb.append ("[\t");
for (var j = 0; j < 3; j++) sb.appendI (Clazz.floatToInt (r[j])).append ("\t");

var trans = r[3];
if (trans != Clazz.floatToInt (trans)) trans = 12 * trans;
sb.append (JS.SymmetryOperation.twelfthsOf (isCanonical ? (Clazz.floatToInt (trans) + 12) % 12 : Clazz.floatToInt (trans))).append ("\t]\n");
}
return sb.toString ();
}, "JU.M4,~B");
Clazz.defineMethod (c$, "setMatrixFromXYZ", 
function (xyz, modDim, allowScaling) {
if (xyz == null) return false;
this.xyzOriginal = xyz;
xyz = xyz.toLowerCase ();
this.setModDim (modDim);
var isReverse = (xyz.startsWith ("!"));
if (isReverse) xyz = xyz.substring (1);
if (xyz.indexOf ("xyz matrix:") == 0) {
this.xyz = xyz;
JU.Parser.parseStringInfestedFloatArray (xyz, null, this.linearRotTrans);
return this.setFromMatrix (null, isReverse);
}if (xyz.indexOf ("[[") == 0) {
xyz = xyz.$replace ('[', ' ').$replace (']', ' ').$replace (',', ' ');
JU.Parser.parseStringInfestedFloatArray (xyz, null, this.linearRotTrans);
for (var i = this.linearRotTrans.length; --i >= 0; ) if (Float.isNaN (this.linearRotTrans[i])) return false;

this.setMatrix (isReverse);
this.isFinalized = true;
this.isBio = (xyz.indexOf ("bio") >= 0);
this.xyz = (this.isBio ? this.toString () : JS.SymmetryOperation.getXYZFromMatrix (this, false, false, false));
return true;
}if (modDim == 0 && xyz.indexOf ("x4") >= 0) {
for (var i = 14; --i >= 4; ) {
if (xyz.indexOf ("x" + i) >= 0) {
this.setModDim (i - 3);
break;
}}
}var mxyz = null;
if (xyz.endsWith ("m")) {
this.timeReversal = (xyz.indexOf ("-m") >= 0 ? -1 : 1);
allowScaling = true;
} else if (xyz.indexOf ("mz)") >= 0) {
var pt = xyz.indexOf ("(");
mxyz = xyz.substring (pt + 1, xyz.length - 1);
xyz = xyz.substring (0, pt);
allowScaling = false;
}var strOut = JS.SymmetryOperation.getMatrixFromString (this, xyz, this.linearRotTrans, allowScaling);
if (strOut == null) return false;
if (mxyz != null) {
var isProper = (JU.M4.newA16 (this.linearRotTrans).determinant3 () == 1);
this.timeReversal = (((xyz.indexOf ("-x") < 0) == (mxyz.indexOf ("-mx") < 0)) == isProper ? 1 : -1);
}this.setMatrix (isReverse);
this.xyz = (isReverse ? JS.SymmetryOperation.getXYZFromMatrix (this, true, false, false) : strOut);
if (this.timeReversal != 0) this.xyz += (this.timeReversal == 1 ? ",m" : ",-m");
if (JU.Logger.debugging) JU.Logger.debug ("" + this);
return true;
}, "~S,~N,~B");
Clazz.defineMethod (c$, "setModDim", 
 function (dim) {
var n = (dim + 4) * (dim + 4);
this.modDim = dim;
if (dim > 0) this.myLabels = JS.SymmetryOperation.labelsXn;
this.linearRotTrans =  Clazz.newFloatArray (n, 0);
}, "~N");
Clazz.defineMethod (c$, "setMatrix", 
 function (isReverse) {
if (this.linearRotTrans.length > 16) {
this.setGamma (isReverse);
} else {
this.setA (this.linearRotTrans);
if (isReverse) {
var p3 = JU.P3.new3 (this.m03, this.m13, this.m23);
this.invert ();
this.rotate (p3);
p3.scale (-1);
this.setTranslation (p3);
}}}, "~B");
Clazz.defineMethod (c$, "setFromMatrix", 
function (offset, isReverse) {
var v = 0;
var pt = 0;
this.myLabels = (this.modDim == 0 ? JS.SymmetryOperation.labelsXYZ : JS.SymmetryOperation.labelsXn);
var rowPt = 0;
var n = 3 + this.modDim;
for (var i = 0; rowPt < n; i++) {
if (Float.isNaN (this.linearRotTrans[i])) return false;
v = this.linearRotTrans[i];
if (Math.abs (v) < 0.00001) v = 0;
var isTrans = ((i + 1) % (n + 1) == 0);
if (isTrans) {
if (offset != null) {
v /= 12;
if (pt < offset.length) v += offset[pt++];
}v = JS.SymmetryOperation.normalizeTwelfths ((v < 0 ? -1 : 1) * Math.abs (v * 12) / 12, this.doNormalize);
rowPt++;
}this.linearRotTrans[i] = v;
}
this.linearRotTrans[this.linearRotTrans.length - 1] = 1;
this.setMatrix (isReverse);
this.isFinalized = (offset == null);
this.xyz = JS.SymmetryOperation.getXYZFromMatrix (this, true, false, false);
return true;
}, "~A,~B");
c$.getMatrixFromXYZ = Clazz.defineMethod (c$, "getMatrixFromXYZ", 
function (xyz) {
var linearRotTrans =  Clazz.newFloatArray (16, 0);
xyz = JS.SymmetryOperation.getMatrixFromString (null, xyz, linearRotTrans, false);
return (xyz == null ? null : JS.SymmetryOperation.div12 (JU.M4.newA16 (linearRotTrans)));
}, "~S");
c$.getMatrixFromString = Clazz.defineMethod (c$, "getMatrixFromString", 
function (op, xyz, linearRotTrans, allowScaling) {
var isDenominator = false;
var isDecimal = false;
var isNegative = false;
var modDim = (op == null ? 0 : op.modDim);
var nRows = 4 + modDim;
var doNormalize = (op != null && op.doNormalize);
var dimOffset = (modDim > 0 ? 3 : 0);
linearRotTrans[linearRotTrans.length - 1] = 1;
var transPt = xyz.indexOf (';') + 1;
if (transPt != 0) {
allowScaling = true;
if (transPt == xyz.length) xyz += "0,0,0";
}var rotPt = -1;
var myLabels = (op == null || modDim == 0 ? null : op.myLabels);
if (myLabels == null) myLabels = JS.SymmetryOperation.labelsXYZ;
xyz = xyz.toLowerCase () + ",";
xyz = xyz.$replace ('(', ',');
if (modDim > 0) xyz = JS.SymmetryOperation.replaceXn (xyz, modDim + 3);
var xpt = 0;
var tpt0 = 0;
var rowPt = 0;
var ch;
var iValue = 0;
var tensDenom = 0;
var decimalMultiplier = 1;
var strT = "";
var strOut = "";
for (var i = 0; i < xyz.length; i++) {
switch (ch = xyz.charAt (i)) {
case ';':
break;
case '\'':
case ' ':
case '{':
case '}':
case '!':
continue;
case '-':
isNegative = true;
continue;
case '+':
isNegative = false;
continue;
case '/':
tensDenom = 0;
isDenominator = true;
continue;
case 'x':
case 'y':
case 'z':
case 'a':
case 'b':
case 'c':
case 'd':
case 'e':
case 'f':
case 'g':
case 'h':
tpt0 = rowPt * nRows;
var ipt = (ch >= 'x' ? ch.charCodeAt (0) - 120 : ch.charCodeAt (0) - 97 + dimOffset);
xpt = tpt0 + ipt;
var val = (isNegative ? -1 : 1);
if (allowScaling && iValue != 0) {
linearRotTrans[xpt] = iValue;
val = Clazz.floatToInt (iValue);
iValue = 0;
} else {
linearRotTrans[xpt] = val;
}strT += JS.SymmetryOperation.plusMinus (strT, val, myLabels[ipt]);
break;
case ',':
if (transPt != 0) {
if (transPt > 0) {
rotPt = i;
i = transPt - 1;
transPt = -i;
iValue = 0;
tensDenom = 0;
continue;
}transPt = i + 1;
i = rotPt;
}iValue = JS.SymmetryOperation.normalizeTwelfths (iValue, doNormalize);
linearRotTrans[tpt0 + nRows - 1] = iValue;
strT += JS.SymmetryOperation.xyzFraction12 (iValue, false, true);
strOut += (strOut === "" ? "" : ",") + strT;
if (rowPt == nRows - 2) return strOut;
iValue = 0;
strT = "";
if (rowPt++ > 2 && modDim == 0) {
JU.Logger.warn ("Symmetry Operation? " + xyz);
return null;
}break;
case '.':
isDecimal = true;
decimalMultiplier = 1;
continue;
case '0':
if (!isDecimal && (isDenominator || !allowScaling)) continue;
default:
var ich = ch.charCodeAt (0) - 48;
if (ich >= 0 && ich <= 9) {
if (isDecimal) {
decimalMultiplier /= 10;
if (iValue < 0) isNegative = true;
iValue += decimalMultiplier * ich * (isNegative ? -1 : 1);
continue;
}if (isDenominator) {
if (ich == 1) {
tensDenom = 1;
continue;
}if (tensDenom == 1) {
ich += tensDenom * 10;
}if (iValue == 0) {
linearRotTrans[xpt] /= ich;
} else {
iValue /= ich;
}} else {
iValue = iValue * 10 + (isNegative ? -1 : 1) * ich;
isNegative = false;
}} else {
JU.Logger.warn ("symmetry character?" + ch);
}}
isDecimal = isDenominator = isNegative = false;
}
return null;
}, "JS.SymmetryOperation,~S,~A,~B");
c$.replaceXn = Clazz.defineMethod (c$, "replaceXn", 
function (xyz, n) {
for (var i = n; --i >= 0; ) xyz = JU.PT.rep (xyz, JS.SymmetryOperation.labelsXn[i], JS.SymmetryOperation.labelsXnSub[i]);

return xyz;
}, "~S,~N");
c$.xyzFraction12 = Clazz.defineMethod (c$, "xyzFraction12", 
 function (n12ths, allPositive, halfOrLess) {
var n = n12ths;
if (allPositive) {
while (n < 0) n += 12;

} else if (halfOrLess) {
while (n > 6) n -= 12;

while (n < -6.0) n += 12;

}var s = JS.SymmetryOperation.twelfthsOf (n);
return (s.charAt (0) == '0' ? "" : n > 0 ? "+" + s : s);
}, "~N,~B,~B");
c$.twelfthsOf = Clazz.defineMethod (c$, "twelfthsOf", 
function (n12ths) {
var str = "";
if (n12ths < 0) {
n12ths = -n12ths;
str = "-";
}var m = 12;
var n = Math.round (n12ths);
if (Math.abs (n - n12ths) > 0.01) {
var f = n12ths / 12;
var max = 20;
for (m = 3; m < max; m++) {
var fm = f * m;
n = Math.round (fm);
if (Math.abs (n - fm) < 0.01) break;
}
if (m == max) return str + f;
} else {
if (n == 12) return str + "1";
if (n < 12) return str + JS.SymmetryOperation.twelfths[n % 12];
switch (n % 12) {
case 0:
return "" + Clazz.doubleToInt (n / 12);
case 2:
case 10:
m = 6;
break;
case 3:
case 9:
m = 4;
break;
case 4:
case 8:
m = 3;
break;
case 6:
m = 2;
break;
default:
break;
}
n = (Clazz.doubleToInt (n * m / 12));
}return str + n + "/" + m;
}, "~N");
c$.fortyEighthsOf = Clazz.defineMethod (c$, "fortyEighthsOf", 
function (n48ths) {
var str = "";
if (n48ths < 0) {
n48ths = -n48ths;
str = "-";
}var m = 12;
var n = Math.round (n48ths);
if (Math.abs (n - n48ths) > 0.01) {
var f = n48ths / 48;
var max = 20;
for (m = 5; m < max; m++) {
var fm = f * m;
n = Math.round (fm);
if (Math.abs (n - fm) < 0.01) break;
}
if (m == max) return str + f;
} else {
if (n == 48) return str + "1";
if (n < 48) return str + JS.SymmetryOperation.twelfths[n % 48];
switch (n % 48) {
case 0:
return "" + Clazz.doubleToInt (n / 48);
case 2:
case 10:
m = 6;
break;
case 3:
case 9:
m = 4;
break;
case 4:
case 8:
m = 3;
break;
case 6:
m = 2;
break;
default:
break;
}
n = (Clazz.doubleToInt (n * m / 12));
}return str + n + "/" + m;
}, "~N");
c$.plusMinus = Clazz.defineMethod (c$, "plusMinus", 
 function (strT, x, sx) {
return (x == 0 ? "" : (x < 0 ? "-" : strT.length == 0 ? "" : "+") + (x == 1 || x == -1 ? "" : "" + Clazz.floatToInt (Math.abs (x))) + sx);
}, "~S,~N,~S");
c$.normalizeTwelfths = Clazz.defineMethod (c$, "normalizeTwelfths", 
 function (iValue, doNormalize) {
iValue *= 12;
if (doNormalize) {
while (iValue > 6) iValue -= 12;

while (iValue <= -6) iValue += 12;

}return iValue;
}, "~N,~B");
c$.getXYZFromMatrix = Clazz.defineMethod (c$, "getXYZFromMatrix", 
function (mat, is12ths, allPositive, halfOrLess) {
var str = "";
var op = (Clazz.instanceOf (mat, JS.SymmetryOperation) ? mat : null);
if (op != null && op.modDim > 0) return JS.SymmetryOperation.getXYZFromRsVs (op.rsvs.getRotation (), op.rsvs.getTranslation (), is12ths);
var row =  Clazz.newFloatArray (4, 0);
for (var i = 0; i < 3; i++) {
var lpt = (i < 3 ? 0 : 3);
mat.getRow (i, row);
var term = "";
for (var j = 0; j < 3; j++) if (row[j] != 0) term += JS.SymmetryOperation.plusMinus (term, row[j], JS.SymmetryOperation.labelsXYZ[j + lpt]);

term += JS.SymmetryOperation.xyzFraction12 ((is12ths ? row[3] : row[3] * 12), allPositive, halfOrLess);
str += "," + term;
}
return str.substring (1);
}, "JU.M4,~B,~B,~B");
c$.setOffset = Clazz.defineMethod (c$, "setOffset", 
function (m, atoms, atomIndex, count) {
if (count == 0) return;
var x = 0;
var y = 0;
var z = 0;
if (JS.SymmetryOperation.atomTest == null) JS.SymmetryOperation.atomTest =  new JU.P3 ();
for (var i = atomIndex, i2 = i + count; i < i2; i++) {
JS.SymmetryOperation.newPoint (m, atoms[i], JS.SymmetryOperation.atomTest, 0, 0, 0);
x += JS.SymmetryOperation.atomTest.x;
y += JS.SymmetryOperation.atomTest.y;
z += JS.SymmetryOperation.atomTest.z;
}
x /= count;
y /= count;
z /= count;
while (x < -0.001 || x >= 1.001) {
m.m03 += (x < 0 ? 1 : -1);
x += (x < 0 ? 1 : -1);
}
while (y < -0.001 || y >= 1.001) {
m.m13 += (y < 0 ? 1 : -1);
y += (y < 0 ? 1 : -1);
}
while (z < -0.001 || z >= 1.001) {
m.m23 += (z < 0 ? 1 : -1);
z += (z < 0 ? 1 : -1);
}
}, "JU.M4,~A,~N,~N");
Clazz.defineMethod (c$, "rotateAxes", 
function (vectors, unitcell, ptTemp, mTemp) {
var vRot =  new Array (3);
this.getRotationScale (mTemp);
for (var i = vectors.length; --i >= 0; ) {
ptTemp.setT (vectors[i]);
unitcell.toFractional (ptTemp, true);
mTemp.rotate (ptTemp);
unitcell.toCartesian (ptTemp, true);
vRot[i] = JU.V3.newV (ptTemp);
}
return vRot;
}, "~A,JS.UnitCell,JU.P3,JU.M3");
c$.fcoord = Clazz.defineMethod (c$, "fcoord", 
function (p) {
return JS.SymmetryOperation.fc (p.x) + " " + JS.SymmetryOperation.fc (p.y) + " " + JS.SymmetryOperation.fc (p.z);
}, "JU.T3");
c$.fc = Clazz.defineMethod (c$, "fc", 
 function (x) {
var xabs = Math.abs (x);
var m = (x < 0 ? "-" : "");
var x24 = Clazz.floatToInt (JS.SymmetryOperation.approxF (xabs * 24));
if (x24 / 24 == Clazz.floatToInt (x24 / 24)) return m + (Clazz.doubleToInt (x24 / 24));
if (x24 % 8 != 0) return m + JS.SymmetryOperation.twelfthsOf (x24 >> 1);
return (x24 == 0 ? "0" : x24 == 24 ? m + "1" : m + (Clazz.doubleToInt (x24 / 8)) + "/3");
}, "~N");
c$.approxF = Clazz.defineMethod (c$, "approxF", 
function (f) {
return JU.PT.approx (f, 100);
}, "~N");
c$.getXYZFromRsVs = Clazz.defineMethod (c$, "getXYZFromRsVs", 
function (rs, vs, is12ths) {
var ra = rs.getArray ();
var va = vs.getArray ();
var d = ra.length;
var s = "";
for (var i = 0; i < d; i++) {
s += ",";
for (var j = 0; j < d; j++) {
var r = ra[i][j];
if (r != 0) {
s += (r < 0 ? "-" : s.endsWith (",") ? "" : "+") + (Math.abs (r) == 1 ? "" : "" + Clazz.doubleToInt (Math.abs (r))) + "x" + (j + 1);
}}
s += JS.SymmetryOperation.xyzFraction12 (Clazz.doubleToInt (va[i][0] * (is12ths ? 1 : 12)), false, true);
}
return JU.PT.rep (s.substring (1), ",+", ",");
}, "JU.Matrix,JU.Matrix,~B");
Clazz.defineMethod (c$, "toString", 
function () {
return (this.rsvs == null ? Clazz.superCall (this, JS.SymmetryOperation, "toString", []) : Clazz.superCall (this, JS.SymmetryOperation, "toString", []) + " " + this.rsvs.toString ());
});
Clazz.defineMethod (c$, "getMagneticOp", 
function () {
return (this.magOp == 3.4028235E38 ? this.magOp = this.determinant3 () * this.timeReversal : this.magOp);
});
Clazz.defineMethod (c$, "setTimeReversal", 
function (magRev) {
this.timeReversal = magRev;
if (this.xyz.indexOf ("m") >= 0) this.xyz = this.xyz.substring (0, this.xyz.indexOf ("m"));
if (magRev != 0) {
this.xyz += (magRev == 1 ? ",m" : ",-m");
}}, "~N");
Clazz.defineMethod (c$, "getCentering", 
function () {
if (!this.isFinalized) this.doFinalize ();
if (this.centering == null && !this.unCentered) {
if (this.modDim == 0 && this.m00 == 1 && this.m11 == 1 && this.m22 == 1 && this.m01 == 0 && this.m02 == 0 && this.m10 == 0 && this.m12 == 0 && this.m20 == 0 && this.m21 == 0 && (this.m03 != 0 || this.m13 != 0 || this.m23 != 0)) {
this.isCenteringOp = true;
this.centering = JU.V3.new3 (this.m03, this.m13, this.m23);
} else {
this.unCentered = true;
this.centering = null;
}}return this.centering;
});
Clazz.defineMethod (c$, "fixMagneticXYZ", 
function (m, xyz, addMag) {
if (this.timeReversal == 0) return xyz;
var pt = xyz.indexOf ("m");
pt -= Clazz.doubleToInt ((3 - this.timeReversal) / 2);
xyz = (pt < 0 ? xyz : xyz.substring (0, pt));
if (!addMag) return xyz + (this.timeReversal > 0 ? " +1" : " -1");
var m2 = JU.M4.newM4 (m);
m2.m03 = m2.m13 = m2.m23 = 0;
if (this.getMagneticOp () < 0) m2.scale (-1);
xyz += "(" + JU.PT.rep (JU.PT.rep (JU.PT.rep (JS.SymmetryOperation.getXYZFromMatrix (m2, false, false, false), "x", "mx"), "y", "my"), "z", "mz") + ")";
return xyz;
}, "JU.M4,~S,~B");
Clazz.defineMethod (c$, "getInfo", 
function () {
if (this.info == null) {
this.info =  new java.util.Hashtable ();
this.info.put ("xyz", this.xyz);
if (this.centering != null) this.info.put ("centering", this.centering);
this.info.put ("index", Integer.$valueOf (this.index));
this.info.put ("isCenteringOp", Boolean.$valueOf (this.isCenteringOp));
if (this.linearRotTrans != null) this.info.put ("linearRotTrans", this.linearRotTrans);
this.info.put ("modulationDimension", Integer.$valueOf (this.modDim));
this.info.put ("matrix", JU.M4.newM4 (this));
if (this.magOp != 3.4028235E38) this.info.put ("magOp", Float.$valueOf (this.magOp));
this.info.put ("id", Integer.$valueOf (this.opId));
this.info.put ("timeReversal", Integer.$valueOf (this.timeReversal));
if (this.xyzOriginal != null) this.info.put ("xyzOriginal", this.xyzOriginal);
}return this.info;
});
Clazz.defineStatics (c$,
"atomTest", null,
"twelfths",  Clazz.newArray (-1, ["0", "1/12", "1/6", "1/4", "1/3", "5/12", "1/2", "7/12", "2/3", "3/4", "5/6", "11/12"]),
"fortyeigths",  Clazz.newArray (-1, ["0", "1/48", "1/24", "1/16", "1/12", "5/48", "1/8", "7/48", "1/6", "3/16", "5/24", "11/48", "1/4", "13/48", "7/24", "5/16", "1/3", "17/48", "3/8", "19/48", "5/12", "7/16", "11/24", "23/48", "1/2", "25/48", "13/24", "9/16", "7/12", "29/48", "15/24", "31/48", "2/3", "11/12", "17/16", "35/48", "3/4", "37/48", "19/24", "13/16", "5/6", "41/48", "7/8", "43/48", "11/12", "15/16", "23/24", "47/48"]));
c$.labelsXYZ = c$.prototype.labelsXYZ =  Clazz.newArray (-1, ["x", "y", "z"]);
c$.labelsXn = c$.prototype.labelsXn =  Clazz.newArray (-1, ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11", "x12", "x13"]);
c$.labelsXnSub = c$.prototype.labelsXnSub =  Clazz.newArray (-1, ["x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);
});
