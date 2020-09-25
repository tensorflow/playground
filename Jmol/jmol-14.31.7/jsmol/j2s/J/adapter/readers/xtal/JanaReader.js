Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.JanaReader", ["java.lang.Boolean", "$.Exception", "$.Float", "java.util.Hashtable", "JU.A4", "$.BS", "$.Lst", "$.Matrix", "$.P3", "$.PT", "$.Quat", "$.Rdr", "$.V3", "J.adapter.smarter.Atom", "J.api.Interface", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lattvecs = null;
this.thisSub = 0;
this.modAxes = null;
this.haveM40Data = false;
this.qicount = 0;
this.molName = null;
this.molAtoms = null;
this.molTtypes = null;
this.modelMolecule = null;
this.molHasTLS = false;
this.matR = null;
this.rho = null;
this.firstPosition = false;
this.vR = null;
this.v0Cart = null;
this.isLegendre = false;
this.floats = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "JanaReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.floats =  Clazz.newFloatArray (6, 0);
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.modAxes = this.getFilter ("MODAXES=");
this.setFractionalCoordinates (true);
this.asc.newAtomSet ();
this.asc.setCurrentModelInfo ("autoBondUsingOccupation", Boolean.TRUE);
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.length < 3) return true;
JU.Logger.info (this.line);
this.parseTokenStr (this.line);
switch ("tit  cell ndim qi   lat  sym  spg  end  wma".indexOf (this.line.substring (0, 3))) {
case 0:
this.asc.setAtomSetName (this.line.substring (5).trim ());
break;
case 5:
this.cell ();
this.setSymmetryOperator ("x,y,z");
break;
case 10:
this.ndim ();
break;
case 20:
if (this.lattvecs == null) this.lattvecs =  new JU.Lst ();
if (!this.ms.addLatticeVector (this.lattvecs, this.line.substring (8))) this.appendLoadNote (this.line + " not supported");
break;
case 30:
this.setSpaceGroupName (this.getTokens ()[1]);
break;
case 25:
this.symmetry ();
break;
case 15:
this.qi ();
break;
case 35:
while (this.rd () != null) {
if (this.line.startsWith ("command") || this.parseIntStr (this.line) >= 0) {
this.readM40Data (true);
break;
}}
this.continuing = false;
break;
case 40:
var n = 3 + this.modDim;
var m;
if (this.thisSub++ == 0) {
m = JU.Matrix.identity (n, n);
this.ms.addSubsystem ("" + this.thisSub++, m);
}m =  new JU.Matrix (null, n, n);
var a = m.getArray ();
var data =  Clazz.newFloatArray (n * n, 0);
this.fillFloatArray (null, 0, data);
for (var i = 0, pt = 0; i < n; i++) for (var j = 0; j < n; j++, pt++) a[i][j] = data[pt];


this.ms.addSubsystem ("" + this.thisSub, m);
}
return true;
});
Clazz.overrideMethod (c$, "doPreSymmetry", 
function () {
if (this.ms != null) this.ms.setModulation (false, null);
if (this.vibsFractional) this.asc.getXSymmetry ().scaleFractionalVibs ();
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
if (!this.haveM40Data) this.readM40Data (false);
if (this.lattvecs != null && this.lattvecs.size () > 0) this.asc.getSymmetry ().addLatticeVectors (this.lattvecs);
this.applySymmetryAndSetTrajectory ();
this.finalizeReaderASCR ();
});
Clazz.overrideMethod (c$, "finalizeSubclassSymmetry", 
function (haveSymmetry) {
this.adjustM40Occupancies ();
if (this.ms != null && haveSymmetry) {
this.ms.setModulation (true, this.asc.getXSymmetry ().getBaseSymmetry ());
this.ms.finalizeModulation ();
}}, "~B");
Clazz.defineMethod (c$, "cell", 
 function () {
for (var ipt = 0; ipt < 6; ipt++) this.setUnitCellItem (ipt, this.parseFloat ());

});
Clazz.defineMethod (c$, "ndim", 
 function () {
this.ms = J.api.Interface.getOption ("adapter.readers.cif.MSRdr", this.vwr, "file");
this.modDim = this.ms.initialize (this, (this.parseIntStr (this.getTokens ()[1]) - 3));
});
Clazz.defineMethod (c$, "qi", 
 function () {
var pt =  Clazz.newDoubleArray (this.modDim, 0);
pt[this.qicount] = 1;
var a =  Clazz.newDoubleArray (-1, [this.parseFloat (), this.parseFloat (), this.parseFloat ()]);
this.parseTokenStr (this.rd ());
for (var i = 0; i < 3; i++) a[i] += this.parseFloat ();

this.ms.addModulation (null, "W_" + (++this.qicount), a, -1);
this.ms.addModulation (null, "F_" + this.qicount + "_coefs_", pt, -1);
});
Clazz.defineMethod (c$, "symmetry", 
 function () {
this.setSymmetryOperator (JU.PT.rep (this.line.substring (9).trim (), " ", ","));
});
Clazz.defineMethod (c$, "readM40Data", 
 function (haveReader) {
if (haveReader) {
this.parseM40Floats ();
} else {
var m40File = this.filePath;
var ipt = m40File.lastIndexOf (".");
if (ipt < 0) return;
m40File = m40File.substring (0, ipt + 2) + "40";
var id = m40File.substring (0, ipt);
this.reader.close ();
this.reader = JU.Rdr.getBR (this.vwr.getLigandModel (id, m40File, "_file", "----"));
if (this.out != null) this.out.append ("******************************* M40 DATA *******************************\n");
this.readM40Floats ();
}this.haveM40Data = true;
if (this.line.startsWith ("command")) this.readM40WaveVectors ();
var nFree = 0;
var nGroups = 0;
var isAxial = false;
var newSub = (this.thisSub == 0 ? null :  new JU.BS ());
var iSub = (this.thisSub == 0 ? 1 : this.thisSub);
for (var i = 0, n = 0, pt = 0; i < iSub; i++, pt += 10) {
nFree = this.getInt (pt, pt + 5);
nGroups = this.getInt (pt + 5, pt + 10);
isAxial = (this.getInt (pt + 15, pt + 20) == 1);
if (nGroups != 0 && i > 0) {
throw  new Exception ("Jmol cannot read rigid body M40 files for composites");
}if (newSub != null) newSub.set (n = n + nFree);
}
iSub = (newSub == null ? 0 : 1);
var nAtoms = -1;
var refAtomName = null;
this.rho = null;
if (nGroups > 0) {
JU.Logger.info ("JanaReader found " + nFree + " free atoms and " + nGroups + " groups");
this.molName = null;
this.molAtoms =  new JU.Lst ();
this.molTtypes =  new JU.Lst ();
}while (this.skipToNextAtom () != null) {
nAtoms++;
var atom =  new J.adapter.smarter.Atom ();
JU.Logger.info (this.line);
var name = this.line.substring (0, 9).trim ();
atom.atomName = name;
var isRefAtom = name.equals (refAtomName);
atom.foccupancy = this.floats[2];
var isJanaMolecule = Float.isNaN (atom.foccupancy);
if (isJanaMolecule) {
var pointGroup = this.getStr (12, 18);
if (pointGroup.length > 0 && !pointGroup.equals ("1")) {
throw  new Exception ("Jmol cannot process M40 files with molecule positions based on point-group symmetry.");
}refAtomName = null;
if (Float.isNaN (this.floats[4])) refAtomName = this.getStr (28, 37);
 else this.rho = JU.P3.new3 (this.floats[3], this.floats[4], this.floats[5]);
this.molName = name;
this.molAtoms.clear ();
this.molTtypes.clear ();
this.molHasTLS = false;
this.firstPosition = true;
this.modelMolecule =  new JU.Lst ();
continue;
}var isExcluded = false;
var posName = (name.startsWith ("pos#") ? name : null);
if (posName == null) {
if (!this.filterAtom (atom, 0)) {
if (!isRefAtom) continue;
isExcluded = true;
}this.setAtomCoordXYZ (atom, this.floats[3], this.floats[4], this.floats[5]);
if (isRefAtom) {
this.rho = JU.P3.newP (atom);
if (isExcluded) continue;
}this.asc.addAtom (atom);
if (iSub > 0) {
if (newSub.get (nAtoms)) iSub++;
atom.altLoc = ("" + iSub).charAt (0);
}this.readAtomRecord (atom, null, null, false);
if (this.molAtoms != null) this.molAtoms.addLast (atom);
} else {
if (this.molAtoms.size () == 0) continue;
this.processPosition (posName, atom, isAxial);
}}
}, "~B");
Clazz.defineMethod (c$, "getInt", 
 function (col1, col2) {
var n = this.line.length;
return (n > col1 ? this.parseIntStr (this.getStr (col1, col2)) : 0);
}, "~N,~N");
Clazz.defineMethod (c$, "getStr", 
 function (col1, col2) {
var n = this.line.length;
return (n > col1 ? this.line.substring (col1, Math.min (n, col2)).trim () : "");
}, "~N,~N");
Clazz.defineMethod (c$, "getFlag", 
 function (i) {
return (this.getInt (i, i + 1) > 0);
}, "~N");
Clazz.defineMethod (c$, "skipToNextAtom", 
 function () {
while (this.readM40Floats () != null && (this.line.length == 0 || this.line.charAt (0) == ' ' || this.line.charAt (0) == '-')) {
}
return this.line;
});
Clazz.defineMethod (c$, "readM40WaveVectors", 
 function () {
while (!this.readM40Floats ().contains ("end")) if (this.line.startsWith ("wave")) {
var tokens = this.getTokens ();
var pt =  Clazz.newDoubleArray (this.modDim, 0);
for (var i = 0; i < this.modDim; i++) pt[i] = this.parseFloatStr (tokens[i + 2]);

this.ms.addModulation (null, "F_" + this.parseIntStr (tokens[1]) + "_coefs_", pt, -1);
}
this.readM40Floats ();
});
Clazz.defineMethod (c$, "processPosition", 
 function (posName, pos, isAxial) {
pos.atomName = this.molName + "_" + posName;
var isImproper = (this.getInt (9, 11) == -1);
var systType = this.getInt (13, 14);
var rm = (systType == 0 ? null :  new JU.P3 ());
var rp = (systType == 0 ? null :  new JU.P3 ());
if (systType != 0) {
throw  new Exception ("Jmol can only read rigid body groups with basic crystallographic settings.");
}var rotData = this.readAtomRecord (pos, rm, rp, true);
var name = pos.atomName;
var n = this.molAtoms.size ();
JU.Logger.info (name + " Molecular group " + this.molName + " has " + n + " atoms");
var ext = "_" + posName.substring (4);
var vTrans = JU.V3.new3 (pos.anisoBorU[3], pos.anisoBorU[4], pos.anisoBorU[5]);
var phi = JU.Quat.newAA (JU.A4.newVA (JU.V3.new3 (0, 0, 1), (pos.anisoBorU[0] / 180 * 3.141592653589793)));
var chi = JU.Quat.newAA (JU.A4.newVA (isAxial ? JU.V3.new3 (0, 1, 0) : JU.V3.new3 (1, 0, 0), (pos.anisoBorU[1] / 180 * 3.141592653589793)));
var psi = JU.Quat.newAA (JU.A4.newVA (isAxial ? JU.V3.new3 (1, 0, 0) : JU.V3.new3 (0, 0, 1), (pos.anisoBorU[2] / 180 * 3.141592653589793)));
this.matR = phi.mulQ (chi).mulQ (psi).getMatrix ();
if (isImproper) this.matR.scale (-1);
var script = "";
for (var i = 0; i < n; i++) {
var a = this.molAtoms.get (i);
var newName = a.atomName;
script += ", " + newName;
if (this.firstPosition) {
newName += ext;
this.modelMolecule.addLast (JU.P3.newP (a));
} else {
a = this.asc.newCloneAtom (a);
newName = newName.substring (0, newName.lastIndexOf ("_")) + ext;
}a.atomName = newName;
var v0 = JU.V3.newVsub (this.modelMolecule.get (i), this.rho);
this.getSymmetry ().toCartesian (this.v0Cart = JU.V3.newV (v0), true);
this.vR = JU.V3.newV (v0);
this.cartesianProduct (this.vR, null);
a.setT (this.rho);
a.add (vTrans);
a.add (this.vR);
this.copyModulations (";" + pos.atomName, ";" + newName);
if (rotData != null) this.setRigidBodyRotations (";" + newName, rotData);
}
this.firstPosition = false;
script = "@" + this.molName + ext + script.substring (1);
this.addJmolScript (script);
this.appendLoadNote (script);
}, "~S,J.adapter.smarter.Atom,~B");
Clazz.defineMethod (c$, "cartesianProduct", 
 function (vA, vB) {
this.symmetry.toCartesian (vA, true);
if (vB == null) this.matR.rotate2 (vA, vA);
 else vA.cross (vA, vB);
this.symmetry.toFractional (vA, true);
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "readAtomRecord", 
 function (atom, rm, rp, isPos) {
var label = ";" + atom.atomName;
var tType = (isPos ? -1 : this.getInt (13, 14));
if (!isPos && this.molTtypes != null) this.molTtypes.addLast (Integer.$valueOf (tType));
var haveSpecialOcc = this.getFlag (60);
var haveSpecialDisp = this.getFlag (61);
var haveSpecialUij = this.getFlag (62);
var nOcc = this.getInt (65, 68);
var nDisp = this.getInt (68, 71);
var nUij = this.getInt (71, 74);
if (rm != null) {
this.readM40Floats ();
rm.set (this.floats[0], this.floats[1], this.floats[2]);
rp.set (this.floats[3], this.floats[4], this.floats[5]);
}if (tType > 2) this.readM40Floats ();
this.readM40Floats ();
switch (tType) {
case 6:
case 5:
case 4:
case 3:
this.readLines (tType - 1);
this.appendLoadNote ("Skipping temperature factors with order > 2");
case 2:
case -1:
for (var j = 0; j < 6; j++) this.asc.setU (atom, j, this.floats[j]);

break;
case 1:
if (this.floats[0] != 0) this.asc.setU (atom, 7, this.floats[0]);
break;
case 0:
this.molHasTLS = true;
this.appendLoadNote ("Jmol cannot process molecular TLS parameters");
break;
}
if (this.modDim == 0) return null;
if (isPos && this.molHasTLS) this.readLines (4);
var pt;
var o_0 = (nOcc > 0 && !haveSpecialOcc ? this.parseFloatStr (this.rd ()) : 1);
if (o_0 != 1) this.ms.addModulation (null, "J_O#0" + label,  Clazz.newDoubleArray (-1, [atom.foccupancy, o_0, 0]), -1);
atom.foccupancy *= o_0;
var wv = 0;
var a1;
var a2;
this.isLegendre = false;
for (var j = 0; j < nOcc; j++) {
if (haveSpecialOcc) {
var data = this.readM40FloatLines (2, 1);
a2 = data[0][0];
a1 = data[1][0];
} else {
wv = j + 1;
this.readM40Floats ();
a1 = this.floats[0];
a2 = this.floats[1];
}pt =  Clazz.newDoubleArray (-1, [a1, a2, 0]);
if (a1 != 0 || a2 != 0) this.ms.addModulation (null, "O_" + wv + "#0" + label, pt, -1);
}
for (var j = 0; j < nDisp; j++) {
if (haveSpecialDisp) {
this.readM40Floats ();
var c = this.floats[3];
var w = this.floats[4];
for (var k = 0; k < 3; k++) if (this.floats[k] != 0) this.ms.addModulation (null, "D_S#" + J.adapter.readers.xtal.JanaReader.XYZ[k] + label,  Clazz.newDoubleArray (-1, [c, w, this.floats[k]]), -1);

} else {
this.addSinCos (j, "D_", label, isPos);
}}
var rotData = (isPos && nDisp > 0 ? this.readM40FloatLines (nDisp, 6) : null);
if (!isPos) {
if (this.isLegendre) nUij *= 2;
for (var j = 0; j < nUij; j++) {
if (tType == 1) {
this.addSinCos (j, "U_", label, false);
} else {
if (haveSpecialUij) {
JU.Logger.error ("JanaReader -- not interpreting SpecialUij flag: " + this.line);
} else if (this.isLegendre) {
var data = this.readM40FloatLines (1, 6);
var order = j + 1;
var coeff = 0;
for (var k = 0, p = 0; k < 6; k++, p += 3) {
if ((coeff = data[0][k]) != 0) this.ms.addModulation (null, "U_L" + order + "#" + "U11U22U33U12U13U23UISO".substring (p, p + 3) + label,  Clazz.newDoubleArray (-1, [coeff, order, 0]), -1);
}
} else {
var data = this.readM40FloatLines (2, 6);
for (var k = 0, p = 0; k < 6; k++, p += 3) {
var csin = data[1][k];
var ccos = data[0][k];
this.ms.addModulation (null, "U_" + (j + 1) + "#" + "U11U22U33U12U13U23UISO".substring (p, p + 3) + label,  Clazz.newDoubleArray (-1, [csin, ccos, 0]), -1);
}
}}}
}return rotData;
}, "J.adapter.smarter.Atom,JU.P3,JU.P3,~B");
Clazz.defineMethod (c$, "addSinCos", 
 function (j, key, label, isPos) {
this.readM40Floats ();
if (this.isLegendre) {
for (var i = 0; i < 2; i++) {
var order = (j * 2 + i + 1);
for (var k = 0; k < 3; ++k) {
var coeff = this.floats[3 * i + k];
if (coeff == 0) {
continue;
}var axis = J.adapter.readers.xtal.JanaReader.XYZ[k % 3];
if (this.modAxes != null && this.modAxes.indexOf (axis.toUpperCase ()) < 0) continue;
var id = key + "L#" + axis + order + label;
this.ms.addModulation (null, id,  Clazz.newDoubleArray (-1, [coeff, order, 0]), -1);
}
}
return;
}this.ensureFourier (j);
for (var k = 0; k < 3; ++k) {
var csin = this.floats[k];
var ccos = this.floats[k + 3];
if (csin == 0 && ccos == 0) {
if (!isPos) continue;
csin = 1e-10;
}var axis = J.adapter.readers.xtal.JanaReader.XYZ[k % 3];
if (this.modAxes != null && this.modAxes.indexOf (axis.toUpperCase ()) < 0) continue;
var id = key + (j + 1) + "#" + axis + label;
this.ms.addModulation (null, id,  Clazz.newDoubleArray (-1, [csin, ccos, 0]), -1);
}
}, "~N,~S,~S,~B");
Clazz.defineMethod (c$, "ensureFourier", 
 function (j) {
var pt;
if (j > 0 && this.ms.getMod ("F_" + (++j) + "_coefs_") == null && (pt = this.ms.getMod ("F_1_coefs_")) != null) {
var p =  Clazz.newDoubleArray (this.modDim, 0);
for (var i = this.modDim; --i >= 0; ) p[i] = pt[i] * j;

this.ms.addModulation (null, "F_" + j + "_coefs_", p, -1);
}}, "~N");
Clazz.defineMethod (c$, "readM40Floats", 
 function () {
if ((this.line = this.rd ()) == null || this.line.indexOf ("-------") >= 0) return (this.line = null);
if (this.debugging) JU.Logger.debug (this.line);
this.parseM40Floats ();
return this.line;
});
Clazz.defineMethod (c$, "parseM40Floats", 
 function () {
var ptLast = this.line.length - 9;
for (var i = 0, pt = 0; i < 6; i++, pt += 9) {
this.floats[i] = (pt <= ptLast ? this.parseFloatStr (this.line.substring (pt, pt + 9)) : NaN);
}
});
Clazz.defineMethod (c$, "readM40FloatLines", 
 function (nLines, nFloats) {
var data =  Clazz.newFloatArray (nLines, nFloats, 0);
for (var i = 0; i < nLines; i++) {
this.readM40Floats ();
if (this.line.indexOf ("Legendre") == 19) this.isLegendre = true;
for (var j = 0; j < nFloats; j++) data[i][j] = this.floats[j];

}
return data;
}, "~N,~N");
Clazz.defineMethod (c$, "adjustM40Occupancies", 
 function () {
var htSiteMult =  new java.util.Hashtable ();
var atoms = this.asc.atoms;
var symmetry = this.asc.getSymmetry ();
for (var i = this.asc.ac; --i >= 0; ) {
var a = atoms[i];
var ii = htSiteMult.get (a.atomName);
if (ii == null) htSiteMult.put (a.atomName, ii = Integer.$valueOf (symmetry.getSiteMultiplicity (a)));
a.foccupancy *= ii.intValue ();
}
});
Clazz.defineMethod (c$, "copyModulations", 
 function (label, newLabel) {
var mapTemp =  new java.util.Hashtable ();
for (var e, $e = this.ms.getModulationMap ().entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var key = e.getKey ();
if (!key.contains (label)) continue;
key = JU.PT.rep (key, label, newLabel);
var val = e.getValue ();
switch (key.charAt (0)) {
case 'O':
this.setRigidBodyPhase (key, val =  Clazz.newDoubleArray (-1, [val[0], val[1], 0]));
break;
case 'D':
break;
case 'U':
continue;
}
mapTemp.put (key, val);
}
for (var e, $e = mapTemp.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) this.ms.addModulation (null, e.getKey (), e.getValue (), -1);

}, "~S,~S");
Clazz.defineMethod (c$, "setRigidBodyPhase", 
 function (key, v) {
var isCenter = false;
switch (this.ms.getModType (key)) {
case 'o':
case 'f':
case 'u':
break;
case 'c':
case 's':
isCenter = true;
break;
}
var nqDotD = 0;
var n = -1;
var qcoefs = this.ms.getQCoefs (key);
for (var i = this.modDim; --i >= 0; ) {
if (qcoefs[i] != 0) {
n = qcoefs[i];
var q = this.ms.getMod ("W_" + (i + 1));
nqDotD = n * (q[0] * this.vR.x + q[1] * this.vR.y + q[2] * this.vR.z);
break;
}}
if (isCenter) {
v[0] += nqDotD;
} else {
var sA = v[0];
var cA = v[1];
var sX = Math.sin (2 * 3.141592653589793 * nqDotD);
var cX = Math.cos (2 * 3.141592653589793 * nqDotD);
v[0] = sA * cX + cA * sX;
v[1] = -sA * sX + cA * cX;
}return v;
}, "~S,~A");
Clazz.defineMethod (c$, "setRigidBodyRotations", 
 function (label, params) {
var n = params.length;
for (var i = 0; i < n; i++) {
this.ensureFourier (i);
var key = "D_" + (i + 1);
var data = params[i];
var vsin = JU.V3.new3 (data[0], data[1], data[2]);
var vcos = JU.V3.new3 (data[3], data[4], data[5]);
this.cartesianProduct (vcos, this.v0Cart);
this.cartesianProduct (vsin, this.v0Cart);
var keyx = key + "#x" + label;
var keyy = key + "#y" + label;
var keyz = key + "#z" + label;
var vx = this.combineModulation (keyx, vsin.x, vcos.x);
var vy = this.combineModulation (keyy, vsin.y, vcos.y);
var vz = this.combineModulation (keyz, vsin.z, vcos.z);
vsin.set (vx[0], vy[0], vz[0]);
vcos.set (vx[1], vy[1], vz[1]);
this.cartesianProduct (vsin, null);
this.cartesianProduct (vcos, null);
this.setMolecularModulation (keyx, vsin.x, vcos.x);
this.setMolecularModulation (keyy, vsin.y, vcos.y);
this.setMolecularModulation (keyz, vsin.z, vcos.z);
}
}, "~S,~A");
Clazz.defineMethod (c$, "combineModulation", 
 function (key, csin, ccos) {
var v = this.ms.getMod (key);
return  Clazz.newDoubleArray (-1, [v[0] + csin, v[1] + ccos, 0]);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "setMolecularModulation", 
 function (key, csin, ccos) {
this.ms.addModulation (null, key, this.setRigidBodyPhase (key,  Clazz.newDoubleArray (-1, [csin, ccos, 0])), -1);
}, "~S,~N,~N");
Clazz.defineStatics (c$,
"records", "tit  cell ndim qi   lat  sym  spg  end  wma",
"TITLE", 0,
"CELL", 5,
"NDIM", 10,
"QI", 15,
"LATT", 20,
"SYM", 25,
"SPG", 30,
"END", 35,
"WMATRIX", 40,
"U_LIST", "U11U22U33U12U13U23UISO",
"XYZ",  Clazz.newArray (-1, ["x", "y", "z"]));
});
