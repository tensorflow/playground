Clazz.declarePackage ("J.quantum");
Clazz.load (null, "J.quantum.NMRNoeMatrix", ["java.lang.Exception", "$.StringBuffer", "java.util.Hashtable", "JU.BS", "$.DF", "$.Lst", "JM.Atom"], function () {
c$ = Clazz.decorateAsClass (function () {
this.eigenValues = null;
this.eigenVectors = null;
this.relaxMatrix = null;
this.noeM = null;
this.distanceMatrix = null;
this.atoms = null;
this.nHAtoms = 0;
this.atomCounter = 0;
this.i = 0;
this.j = 0;
this.k = 0;
this.m = 0;
this.n = 0;
this.p = 0;
this.q = 0;
this.atomMap = null;
this.baseIndex = 0;
this.params = null;
Clazz.instantialize (this, arguments);
}, J.quantum, "NMRNoeMatrix");
c$.createMatrix = Clazz.defineMethod (c$, "createMatrix", 
function (viewer, bsMol, labelArray, params) {
var bsH = null;
try {
bsH = (bsMol.cardinality () == 0 ?  new JU.BS () : viewer.getSmartsMatch ("[H]", bsMol));
} catch (e1) {
if (Clazz.exceptionOf (e1, Exception)) {
} else {
throw e1;
}
}
var labels =  new java.util.Hashtable ();
var indexAtomInMol =  new java.util.Hashtable ();
var labelMap = J.quantum.NMRNoeMatrix.createLabelMapAndIndex (viewer, bsMol, labelArray, bsH, labels, indexAtomInMol);
var hAtoms = J.quantum.NMRNoeMatrix.createHAtomList (viewer, bsMol, bsH, labels, labelMap);
var noeMatrix = J.quantum.NMRNoeMatrix.createNOEMatrix (hAtoms, indexAtomInMol, bsMol.cardinality (), bsMol.nextSetBit (0), (params == null ?  new J.quantum.NMRNoeMatrix.NOEParams () : params));
if (!bsMol.isEmpty ()) {
viewer.getCurrentModelAuxInfo ().put ("noeMatrix", noeMatrix);
}return noeMatrix;
}, "JV.Viewer,JU.BS,~A,J.quantum.NMRNoeMatrix.NOEParams");
Clazz.defineMethod (c$, "getParams", 
function () {
return this.params;
});
c$.createNOEMatrix = Clazz.defineMethod (c$, "createNOEMatrix", 
 function (hAtoms, indexAtomInMol, atomCount, baseIndex, params) {
var map =  Clazz.newIntArray (atomCount, 0);
var nHAtoms = hAtoms.size ();
var noeMatrix =  new J.quantum.NMRNoeMatrix (params);
noeMatrix.baseIndex = baseIndex;
noeMatrix.initArrays (nHAtoms);
for (var i = 0; i < nHAtoms; i++) {
var aobj = hAtoms.get (i);
if (Clazz.instanceOf (aobj, JM.Atom)) {
var a = hAtoms.get (i);
map[(indexAtomInMol.get (a)).intValue ()] = i;
noeMatrix.addAtom (a.x, a.y, a.z);
} else if (Clazz.instanceOf (aobj, JU.Lst)) {
var lst = aobj;
var nEquiv = lst.size ();
for (var j = 0; j < nEquiv; j++) {
map[(indexAtomInMol.get (lst.get (j))).intValue ()] = i;
}
var xa =  Clazz.newDoubleArray (nEquiv, 0);
var ya =  Clazz.newDoubleArray (nEquiv, 0);
var za =  Clazz.newDoubleArray (nEquiv, 0);
for (var j = 0; j < nEquiv; j++) {
var a = lst.get (j);
xa[j] = a.x;
ya[j] = a.y;
za[j] = a.z;
}
noeMatrix.addEquiv (xa, ya, za);
} else {
var a = aobj;
map[(indexAtomInMol.get (a[0])).intValue ()] = i;
map[(indexAtomInMol.get (a[1])).intValue ()] = i;
map[(indexAtomInMol.get (a[2])).intValue ()] = i;
noeMatrix.addMethyl (a[0].x, a[0].y, a[0].z, a[1].x, a[1].y, a[1].z, a[2].x, a[2].y, a[2].z);
}}
noeMatrix.atomMap = map;
return noeMatrix;
}, "JU.Lst,java.util.Map,~N,~N,J.quantum.NMRNoeMatrix.NOEParams");
Clazz.makeConstructor (c$, 
 function (params) {
this.params = params;
params.id = ++J.quantum.NMRNoeMatrix.id;
}, "J.quantum.NMRNoeMatrix.NOEParams");
Clazz.defineMethod (c$, "calcNOEs", 
function () {
if (this.nHAtoms == 0 || this.atoms == null) {
this.noeM =  Clazz.newDoubleArray (0, 0, 0);
return;
}if (this.nHAtoms != this.atomCounter) {
throw  new Exception ("Not all atoms have been read in yet!");
}var isNew = false;
if (this.params.tainted) {
this.calcRelaxMatrix ();
this.Diagonalise ();
isNew = true;
}if (this.params.tainted || this.params.mixingChanged) {
this.calcNoeMatrix ();
this.params.mixingChanged = false;
isNew = true;
}this.params.tainted = false;
});
Clazz.defineMethod (c$, "initArrays", 
function (n) {
this.nHAtoms = n;
this.atoms =  new Array (this.nHAtoms);
this.atomCounter = 0;
this.relaxMatrix =  Clazz.newDoubleArray (this.nHAtoms, this.nHAtoms, 0);
this.eigenValues =  Clazz.newDoubleArray (this.nHAtoms, this.nHAtoms, 0);
this.eigenVectors =  Clazz.newDoubleArray (this.nHAtoms, this.nHAtoms, 0);
this.noeM =  Clazz.newDoubleArray (this.nHAtoms, this.nHAtoms, 0);
this.distanceMatrix =  Clazz.newDoubleArray (this.nHAtoms, this.nHAtoms, 0);
}, "~N");
Clazz.defineMethod (c$, "addAtom", 
function (x, y, z) {
this.atoms[this.atomCounter] =  new J.quantum.NMRNoeMatrix.NOEAtom ();
this.atoms[this.atomCounter].x = x;
this.atoms[this.atomCounter].y = y;
this.atoms[this.atomCounter].z = z;
this.atoms[this.atomCounter].methyl = false;
this.atomCounter++;
this.params.tainted = true;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "addMethyl", 
function (x, y, z, x1, y1, z1, x2, y2, z2) {
this.atoms[this.atomCounter] =  new J.quantum.NMRNoeMatrix.NOEAtom ();
this.atoms[this.atomCounter].x = x;
this.atoms[this.atomCounter].y = y;
this.atoms[this.atomCounter].z = z;
this.atoms[this.atomCounter].x1 = x1;
this.atoms[this.atomCounter].y1 = y1;
this.atoms[this.atomCounter].z1 = z1;
this.atoms[this.atomCounter].x2 = x2;
this.atoms[this.atomCounter].y2 = y2;
this.atoms[this.atomCounter].z2 = z2;
this.atoms[this.atomCounter].methyl = true;
this.atomCounter++;
this.params.tainted = true;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addEquiv", 
function (xa, ya, za) {
this.atoms[this.atomCounter] =  new J.quantum.NMRNoeMatrix.NOEAtom ();
this.atoms[this.atomCounter].xa = xa;
this.atoms[this.atomCounter].ya = ya;
this.atoms[this.atomCounter].za = za;
this.atoms[this.atomCounter].equiv = true;
this.atomCounter++;
this.params.tainted = true;
}, "~A,~A,~A");
Clazz.defineMethod (c$, "calcRelaxMatrix", 
 function () {
var alpha = 5.6965E10;
var rho;
var JValSigma;
var JValRho;
var rhoStar = this.params.rhoStar;
var freq = this.params.freq;
var cutoff2 = this.params.cutoff * this.params.cutoff;
var tau = this.params.tau;
if (this.params.noesy) {
JValSigma = 6.0 * J.quantum.NMRNoeMatrix.J (2 * freq, tau) - J.quantum.NMRNoeMatrix.J (0, tau);
JValRho = 6.0 * J.quantum.NMRNoeMatrix.J (2 * freq, tau) + 3.0 * J.quantum.NMRNoeMatrix.J (freq, tau) + J.quantum.NMRNoeMatrix.J (0, tau);
} else {
JValSigma = 3.0 * J.quantum.NMRNoeMatrix.J (freq, tau) + 2.0 * J.quantum.NMRNoeMatrix.J (0, tau);
JValRho = 3.0 * J.quantum.NMRNoeMatrix.J (2 * freq, tau) + 4.5 * J.quantum.NMRNoeMatrix.J (freq, tau) + 2.5 * J.quantum.NMRNoeMatrix.J (0, tau);
}for (this.i = 0; this.i < this.nHAtoms; this.i++) {
rho = 0.0;
for (this.j = 0; this.j < this.nHAtoms; this.j++) {
var distSqrd = this.distanceSqrd (this.atoms[this.i], this.atoms[this.j]);
this.distanceMatrix[this.i][this.j] = Math.sqrt (distSqrd);
var aOverR6;
if (distSqrd < cutoff2) {
aOverR6 = alpha / (distSqrd * distSqrd * distSqrd);
} else {
aOverR6 = 0;
}if (this.i < this.j) {
this.relaxMatrix[this.i][this.j] = aOverR6 * JValSigma;
this.relaxMatrix[this.j][this.i] = this.relaxMatrix[this.i][this.j];
}if (this.i != this.j) {
rho = rho + aOverR6 * JValRho;
}}
this.relaxMatrix[this.i][this.i] = rho + rhoStar;
}
});
c$.J = Clazz.defineMethod (c$, "J", 
 function (w, tau) {
return tau / (1 + (w * w * tau * tau));
}, "~N,~N");
Clazz.defineMethod (c$, "sign", 
 function (x) {
if (x < 0) {
return -1;
}return 1;
}, "~N");
Clazz.defineMethod (c$, "calcNoeMatrix", 
 function () {
var tempEVs =  Clazz.newDoubleArray (this.nHAtoms, 0);
var tMix = this.params.tMix;
for (this.i = 0; this.i < this.nHAtoms; this.i++) {
tempEVs[this.i] = Math.exp (-this.eigenValues[this.i][this.i] * tMix);
}
for (this.i = 0; this.i < this.nHAtoms; this.i++) {
for (this.j = 0; this.j <= this.i; this.j++) {
var sum = 0;
for (this.k = 0; this.k < this.nHAtoms; this.k++) {
sum += this.eigenVectors[this.i][this.k] * this.eigenVectors[this.j][this.k] * tempEVs[this.k];
}
this.noeM[this.i][this.j] = sum;
this.noeM[this.j][this.i] = sum;
}
}
});
Clazz.defineMethod (c$, "Diagonalise", 
 function () {
var iter = 0;
for (var i = 0; i < this.nHAtoms; i++) {
for (var z = 0; z < this.nHAtoms; z++) {
this.eigenVectors[i][z] = 0.0;
this.eigenValues[i][z] = this.relaxMatrix[i][z];
}
}
for (var i = 0; i < this.nHAtoms; i++) {
this.eigenVectors[i][i] = 1.0;
}
var state = "ITERATING";
var maxIter = 100000;
while (state === "ITERATING") {
var max = this.maxOffDiag ();
if (max > 0.0) {
this.rotate ();
iter++;
if (iter >= maxIter) {
state = "STOP";
System.out.println ("maximum iteration reached");
}} else {
state = "SUCCESS";
}}
return iter;
});
Clazz.defineMethod (c$, "maxOffDiag", 
 function () {
var max = 0.0;
for (var i = 0; i < this.nHAtoms - 1; i++) {
for (var j = i + 1; j < this.nHAtoms; j++) {
var aij = Math.abs (this.eigenValues[i][j]);
if (aij > max) {
max = aij;
this.p = i;
this.q = j;
}}
}
return max;
});
Clazz.defineMethod (c$, "rotate", 
 function () {
var d = (this.eigenValues[this.p][this.p] - this.eigenValues[this.q][this.q]) / (2.0 * this.eigenValues[this.p][this.q]);
var t = this.sign (d) / (Math.abs (d) + Math.sqrt (d * d + 1));
var c = 1.0 / Math.sqrt (t * t + 1);
var s = t * c;
this.eigenValues[this.p][this.p] += t * this.eigenValues[this.p][this.q];
this.eigenValues[this.q][this.q] -= t * this.eigenValues[this.p][this.q];
this.eigenValues[this.p][this.q] = this.eigenValues[this.q][this.p] = 0.0;
for (var k = 0; k < this.nHAtoms; k++) {
if (k != this.p && k != this.q) {
var akp = c * this.eigenValues[k][this.p] + s * this.eigenValues[k][this.q];
var akq = -s * this.eigenValues[k][this.p] + c * this.eigenValues[k][this.q];
this.eigenValues[k][this.p] = this.eigenValues[this.p][k] = akp;
this.eigenValues[k][this.q] = this.eigenValues[this.q][k] = akq;
}}
for (var k = 0; k < this.nHAtoms; k++) {
var rkp = c * this.eigenVectors[k][this.p] + s * this.eigenVectors[k][this.q];
var rkq = -s * this.eigenVectors[k][this.p] + c * this.eigenVectors[k][this.q];
this.eigenVectors[k][this.p] = rkp;
this.eigenVectors[k][this.q] = rkq;
}
});
Clazz.overrideMethod (c$, "toString", 
function () {
var sb;
sb =  new StringBuffer ();
for (this.i = 0; this.i < this.nHAtoms; this.i++) {
for (this.j = 0; this.j < this.nHAtoms; this.j++) {
sb.append (JU.DF.formatDecimalDbl (this.noeM[this.i][this.j], 4) + "\t");
}
sb.append ("\n");
}
sb.append (this.params.toString ());
return sb.toString ();
});
Clazz.defineMethod (c$, "toStringNormRow", 
function () {
var sb;
sb =  new StringBuffer ();
for (this.i = 0; this.i < this.nHAtoms; this.i++) {
for (this.j = 0; this.j < this.nHAtoms; this.j++) {
var val = this.noeM[this.i][this.j] / this.noeM[this.i][this.i];
sb.append (JU.DF.formatDecimalDbl (val, 4) + "\t");
}
sb.append ("\n");
}
return sb.toString ();
});
Clazz.defineMethod (c$, "distanceSqrd", 
 function (a, b) {
var atom1;
var atom2;
var d;
var d1;
var d2;
var d3;
var prod12;
var prod13;
var prod23;
var d15;
var d25;
var d35;
if (b.methyl && !a.methyl) {
atom1 = b;
atom2 = a;
} else if (b.equiv && !a.equiv) {
atom1 = b;
atom2 = a;
} else {
atom1 = a;
atom2 = b;
}if (atom1.methyl) {
var a2x;
var a2y;
var a2z;
if (atom2.methyl) {
a2x = (atom2.x + atom2.x1 + atom2.x2) / 3.0;
a2y = (atom2.y + atom2.y1 + atom2.y2) / 3.0;
a2z = (atom2.z + atom2.z1 + atom2.z2) / 3.0;
} else if (atom2.equiv) {
a2x = 0.0;
a2y = 0.0;
a2z = 0.0;
for (var j = 0; j < atom2.xa.length; j++) {
a2x += atom2.xa[j] / atom2.xa.length;
a2y += atom2.ya[j] / atom2.xa.length;
a2z += atom2.za[j] / atom2.xa.length;
}
} else {
a2x = atom2.x;
a2y = atom2.y;
a2z = atom2.z;
}var x1 = atom1.x - a2x;
var y1 = atom1.y - a2y;
var z1 = atom1.z - a2z;
var x2 = atom1.x1 - a2x;
var y2 = atom1.y1 - a2y;
var z2 = atom1.z1 - a2z;
var x3 = atom1.x2 - a2x;
var y3 = atom1.y2 - a2y;
var z3 = atom1.z2 - a2z;
d1 = (x1 * x1) + (y1 * y1) + (z1 * z1);
d2 = (x2 * x2) + (y2 * y2) + (z2 * z2);
d3 = (x3 * x3) + (y3 * y3) + (z3 * z3);
d15 = d1 * d1 * Math.sqrt (d1);
d25 = d2 * d2 * Math.sqrt (d2);
d35 = d3 * d3 * Math.sqrt (d3);
prod12 = x1 * x2 + y1 * y2 + z1 * z2;
prod13 = x1 * x3 + y1 * y3 + z1 * z3;
prod23 = x2 * x3 + y2 * y3 + z2 * z3;
d = (2 * d1 * d1) / (d15 * d15);
d += ((3 * (prod12 * prod12)) - (d1 * d2)) / (d15 * d25);
d += ((3 * (prod13 * prod13)) - (d1 * d3)) / (d15 * d35);
d += ((3 * (prod12 * prod12)) - (d2 * d1)) / (d25 * d15);
d += (2 * d2 * d2) / (d25 * d25);
d += ((3 * (prod23 * prod23)) - (d2 * d3)) / (d25 * d35);
d += ((3 * (prod13 * prod13)) - (d3 * d1)) / (d35 * d15);
d += ((3 * (prod23 * prod23)) - (d3 * d2)) / (d35 * d25);
d += (2 * d3 * d3) / (d35 * d35);
return (Math.pow (d / 18.0, -0.3333333333333333));
} else if (atom1.equiv) {
if (atom2.equiv) {
var dd = 0.0;
for (var i = 0; i < atom1.xa.length; i++) {
for (var j = 0; j < atom2.xa.length; j++) {
var x1 = atom1.xa[i] - atom2.xa[j];
var y1 = atom1.ya[i] - atom2.ya[j];
var z1 = atom1.za[i] - atom2.za[j];
dd += Math.pow ((x1 * x1) + (y1 * y1) + (z1 * z1), -3.0);
}
}
return Math.pow (dd / (atom1.xa.length * atom2.xa.length), -0.3333333333333333);
}var dd = 0.0;
for (var i = 0; i < atom1.xa.length; i++) {
var x1 = atom1.xa[i] - atom2.x;
var y1 = atom1.ya[i] - atom2.y;
var z1 = atom1.za[i] - atom2.z;
dd += Math.pow ((x1 * x1) + (y1 * y1) + (z1 * z1), -3.0);
}
return Math.pow (dd / atom1.xa.length, -0.3333333333333333);
} else {
var x1 = atom1.x - atom2.x;
var y1 = atom1.y - atom2.y;
var z1 = atom1.z - atom2.z;
return (x1 * x1) + (y1 * y1) + (z1 * z1);
}}, "J.quantum.NMRNoeMatrix.NOEAtom,J.quantum.NMRNoeMatrix.NOEAtom");
c$.createLabelMapAndIndex = Clazz.defineMethod (c$, "createLabelMapAndIndex", 
 function (viewer, bsMol, labelArray, bsH, labels, indexAtomInMol) {
var labelMap =  new java.util.Hashtable ();
for (var pt = 0, i = bsMol.nextSetBit (0); i >= 0; i = bsMol.nextSetBit (i + 1), pt++) {
var a = viewer.ms.at[i];
indexAtomInMol.put (a, Integer.$valueOf (pt));
if (labelArray != null) {
var label = labelArray[pt];
if (labelArray[pt] == null) {
labels.put (a, "");
} else {
var lst = labelMap.get (label);
if (lst == null) {
labelMap.put (label, lst =  new JU.Lst ());
} else {
bsH.clear (i);
}lst.addLast (a);
labels.put (a, label);
}}}
return labelMap;
}, "JV.Viewer,JU.BS,~A,JU.BS,java.util.Map,java.util.Map");
c$.createHAtomList = Clazz.defineMethod (c$, "createHAtomList", 
 function (viewer, bsMol, bsH, labels, labelMap) {
var hAtoms =  new JU.Lst ();
try {
if (!bsMol.isEmpty ()) {
var methyls = viewer.getSmartsMap ("C({[H]})({[H]}){[H]}", bsMol, 130);
for (var i = methyls.length; --i >= 0; ) {
var methyl =  new Array (3);
for (var j = 0; j < 3; j++) {
var pt = methyls[i][j];
methyl[j] = viewer.ms.at[pt];
bsH.clear (pt);
}
hAtoms.addLast (methyl);
}
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
for (var i = bsH.nextSetBit (0); i >= 0; i = bsH.nextSetBit (i + 1)) {
var a = viewer.ms.at[i];
var label = labels.get (a);
var atoms = (label == null ? null : labelMap.get (labels.get (a)));
if (atoms != null && atoms.size () > 1) {
hAtoms.addLast (atoms);
} else {
hAtoms.addLast (a);
}}
return hAtoms;
}, "JV.Viewer,JU.BS,JU.BS,java.util.Map,java.util.Map");
Clazz.defineMethod (c$, "getJmolDistance", 
function (a, b) {
return this.getDistance (this.atomMap[a - this.baseIndex], this.atomMap[b - this.baseIndex]);
}, "~N,~N");
Clazz.defineMethod (c$, "getDistance", 
 function (i, j) {
return (i < 0 || j < 0 || i >= this.nHAtoms ? NaN : this.distanceMatrix[i][j]);
}, "~N,~N");
Clazz.defineMethod (c$, "getJmolNoe", 
function (a, b) {
return this.getNoe (this.atomMap[a - this.baseIndex], this.atomMap[b - this.baseIndex]);
}, "~N,~N");
Clazz.defineMethod (c$, "getNoe", 
 function (i, j) {
return (i < 0 || j < 0 || i >= this.nHAtoms ? NaN : this.noeM[i][j]);
}, "~N,~N");
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.noesy = false;
this.tau = 0;
this.freq = 0;
this.tMix = 0;
this.cutoff = 0;
this.rhoStar = 0;
this.tainted = true;
this.mixingChanged = true;
this.id = 0;
Clazz.instantialize (this, arguments);
}, J.quantum.NMRNoeMatrix, "NOEParams");
Clazz.prepareFields (c$, function () {
{
this.freq = 2.5132741228718348E9;
this.tau = 80E-12;
this.tMix = 0.5;
this.cutoff = 10;
this.rhoStar = 0.1;
this.noesy = true;
}});
Clazz.overrideMethod (c$, "toString", 
function () {
return "[id=" + this.id + " freq=" + this.getNMRfreqMHz () + " tau=" + this.tau + " tMix=" + this.tMix + " cutoff=" + this.cutoff + " rhoStar=" + this.rhoStar + " noesy=" + this.noesy + "]";
});
Clazz.defineMethod (c$, "setCorrelationTimeTauPS", 
function (a) {
this.tau = a * 1E-12;
this.tainted = true;
}, "~N");
Clazz.defineMethod (c$, "setMixingTimeSec", 
function (a) {
this.tMix = a;
this.mixingChanged = true;
}, "~N");
Clazz.defineMethod (c$, "setNMRfreqMHz", 
function (a) {
this.freq = a * 2 * 3.141592653589793 * 1E6;
this.tainted = true;
}, "~N");
Clazz.defineMethod (c$, "setCutoffAng", 
function (a) {
this.cutoff = a;
this.tainted = true;
}, "~N");
Clazz.defineMethod (c$, "setRhoStar", 
function (a) {
this.rhoStar = a;
this.tainted = true;
}, "~N");
Clazz.defineMethod (c$, "setNoesy", 
function (a) {
this.noesy = a;
this.tainted = true;
}, "~B");
Clazz.defineMethod (c$, "getCorrelationTimeTauPS", 
function () {
return this.tau;
});
Clazz.defineMethod (c$, "getMixingTimeSec", 
function () {
return this.tMix;
});
Clazz.defineMethod (c$, "getNoesy", 
function () {
return this.noesy;
});
Clazz.defineMethod (c$, "getNMRfreqMHz", 
function () {
return this.freq / 2 / 3.141592653589793 / 1E6;
});
Clazz.defineMethod (c$, "getCutoffAng", 
function () {
return this.cutoff;
});
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
this.x1 = 0;
this.y1 = 0;
this.z1 = 0;
this.x2 = 0;
this.y2 = 0;
this.z2 = 0;
this.xa = null;
this.ya = null;
this.za = null;
this.methyl = false;
this.equiv = false;
Clazz.instantialize (this, arguments);
}, J.quantum.NMRNoeMatrix, "NOEAtom");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"id", 0);
});
