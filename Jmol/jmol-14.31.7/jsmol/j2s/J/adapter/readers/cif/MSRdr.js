Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (["J.adapter.smarter.MSInterface"], "J.adapter.readers.cif.MSRdr", ["java.lang.Boolean", "$.Exception", "$.Float", "java.util.Hashtable", "JU.Lst", "$.M3", "$.Matrix", "$.P3", "$.PT", "J.adapter.readers.cif.Subsystem", "J.adapter.smarter.AtomSetCollectionReader", "JU.BSUtil", "$.BoxInfo", "$.Escape", "$.Logger", "$.Modulation", "$.ModulationSet", "$.Vibration"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cr = null;
this.modDim = 0;
this.modAxes = null;
this.modAverage = false;
this.isCommensurate = false;
this.commensurateSection1 = 0;
this.modPack = false;
this.modVib = false;
this.modType = null;
this.modCell = null;
this.modDebug = false;
this.modSelected = -1;
this.modLast = false;
this.sigma = null;
this.htModulation = null;
this.htAtomMods = null;
this.iopLast = -1;
this.gammaE = null;
this.nOps = 0;
this.haveOccupancy = false;
this.atoms = null;
this.ac = 0;
this.haveAtomMods = false;
this.modCoord = false;
this.finalized = false;
this.symmetry = null;
this.supercellSymmetry = null;
this.legendres = null;
this.atModel = "@0";
this.modMatrices = null;
this.qlist100 = null;
this.qs = null;
this.modCount = 0;
this.modTUV = null;
this.htSubsystems = null;
this.minXYZ0 = null;
this.maxXYZ0 = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "MSRdr", null, J.adapter.smarter.MSInterface);
Clazz.defineMethod (c$, "getSigma", 
function () {
return this.sigma;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "initialize", 
function (r, modDim) {
this.cr = r;
this.modCoord = r.checkFilterKey ("MODCOORD");
this.modDebug = r.checkFilterKey ("MODDEBUG");
this.modPack = !r.checkFilterKey ("MODNOPACK");
this.modLast = r.checkFilterKey ("MODLAST");
this.modAxes = r.getFilter ("MODAXES=");
this.modType = r.getFilter ("MODTYPE=");
this.modCell = r.getFilter ("MODCELL=");
this.modSelected = r.parseIntStr ("" + r.getFilter ("MOD="));
this.modVib = r.checkFilterKey ("MODVIB");
this.modAverage = r.checkFilterKey ("MODAVE");
var smodTUV = r.getFilter ("MODT=");
if (smodTUV != null || (smodTUV = r.getFilter ("MODTUV=")) != null) {
this.modTUV =  new JU.P3 ();
var tuv = (JU.PT.replaceAllCharacters (smodTUV, "{}()", "") + ",0,0,0").$plit (",");
this.modTUV.x = JU.PT.parseFloatFraction (tuv[0]);
this.modTUV.y = JU.PT.parseFloatFraction (tuv[1]);
this.modTUV.z = JU.PT.parseFloatFraction (tuv[2]);
if (Float.isNaN (this.modTUV.lengthSquared ())) {
JU.Logger.error ("MSRdr cannot read modTUV=" + smodTUV);
this.modTUV = null;
}}this.setModDim (modDim);
return modDim;
}, "J.adapter.smarter.AtomSetCollectionReader,~N");
Clazz.defineMethod (c$, "setSubsystemOptions", 
 function () {
this.cr.forceSymmetry (this.modPack);
if (this.modCell != null) this.cr.addJmolScript ("unitcell {%" + this.modCell + "}");
});
Clazz.defineMethod (c$, "setModDim", 
function (ndim) {
this.htModulation =  new java.util.Hashtable ();
this.modDim = ndim;
this.cr.appendLoadNote ("Modulation dimension = " + this.modDim);
}, "~N");
Clazz.overrideMethod (c$, "addModulation", 
function (map, id, pt, iModel) {
var ch = id.charAt (0);
switch (ch) {
case 'O':
case 'D':
case 'M':
case 'U':
if (this.modType != null && this.modType.indexOf (ch) < 0 || this.modSelected > 0 && this.modSelected != 1) return;
break;
}
var isOK = false;
for (var i = pt.length; --i >= 0; ) {
if (this.modSelected > 0 && i + 1 != this.modSelected && id.contains ("_coefs_")) {
pt[i] = 0;
} else if (pt[i] != 0) {
isOK = true;
break;
}}
if (!isOK) return;
if (map == null) map = this.htModulation;
if (id.indexOf ("@") < 0) id += "@" + (iModel >= 0 ? iModel : this.cr.asc.iSet);
if (id.startsWith ("D_L#") || id.startsWith ("U_L")) {
if (this.legendres == null) this.legendres =  new JU.Lst ();
this.legendres.addLast (id);
}JU.Logger.info ("Adding " + id + " " + JU.Escape.e (pt));
map.put (id, pt);
}, "java.util.Map,~S,~A,~N");
Clazz.overrideMethod (c$, "setModulation", 
function (isPost, symmetry) {
if (this.modDim == 0 || this.htModulation == null) return;
if (this.modDebug) JU.Logger.debugging = JU.Logger.debuggingHigh = true;
this.cr.asc.setInfo ("someModelsAreModulated", Boolean.TRUE);
this.symmetry = symmetry;
this.setModulationForStructure (this.cr.asc.iSet, isPost);
if (this.modDebug) JU.Logger.debugging = JU.Logger.debuggingHigh = false;
}, "~B,J.api.SymmetryInterface");
Clazz.overrideMethod (c$, "finalizeModulation", 
function () {
if (!this.finalized && this.modDim > 0 && !this.modVib) {
if (this.modTUV != null) this.cr.appendLoadNote ("modTUV=" + this.modTUV);
this.cr.asc.setInfo ("modulationOn", this.modTUV == null ? Boolean.TRUE : this.modTUV);
this.cr.addJmolScript ("set modulateOccupancy " + (this.haveOccupancy && !this.isCommensurate ? true : false));
}this.finalized = true;
});
Clazz.defineMethod (c$, "checkKey", 
 function (key, checkQ) {
var pt = key.indexOf (this.atModel);
return (pt < 0 || key.indexOf ("_pos#") >= 0 || key.indexOf ("*;*") >= 0 || checkQ && key.indexOf ("?") >= 0 ? null : key.substring (0, pt));
}, "~S,~B");
Clazz.overrideMethod (c$, "getMod", 
function (key) {
return this.htModulation.get (key + this.atModel);
}, "~S");
Clazz.overrideMethod (c$, "getModulationMap", 
function () {
return this.htModulation;
});
Clazz.defineMethod (c$, "setModulationForStructure", 
 function (iModel, isPost) {
this.atModel = "@" + iModel;
if (this.htModulation.containsKey ("X_" + this.atModel)) return;
if (!isPost) {
this.initModForStructure (iModel);
return;
}this.htModulation.put ("X_" + this.atModel,  Clazz.newDoubleArray (0, 0));
this.cr.appendLoadNote (this.modCount + " modulations for " + this.ac + " modulated atoms");
if (!this.haveAtomMods) return;
var n = this.cr.asc.ac;
this.atoms = this.cr.asc.atoms;
if (this.symmetry != null) this.nOps = this.symmetry.getSpaceGroupOperationCount ();
this.supercellSymmetry = this.cr.asc.getXSymmetry ().symmetry;
if (this.supercellSymmetry === this.symmetry) this.supercellSymmetry = null;
this.iopLast = -1;
var i0 = this.cr.asc.getLastAtomSetAtomIndex ();
for (var i = i0; i < n; i++) this.modulateAtom (this.atoms[i]);

this.htAtomMods = null;
if (this.minXYZ0 != null) this.trimAtomSet ();
this.htSubsystems = null;
}, "~N,~B");
Clazz.defineMethod (c$, "initModForStructure", 
 function (iModel) {
var key;
if (this.legendres != null) this.fixLegendre ();
this.sigma =  new JU.Matrix (null, this.modDim, 3);
this.qs = null;
this.modMatrices =  Clazz.newArray (-1, [this.sigma, null]);
var pt;
for (var i = 0; i < this.modDim; i++) {
pt = this.getMod ("W_" + (i + 1));
if (pt == null) {
this.cr.appendLoadNote ("NOTE!: Not enough cell wave vectors for d=" + this.modDim);
return;
}this.fixDouble (pt);
this.cr.appendLoadNote ("W_" + (i + 1) + " = " + JU.Escape.e (pt));
this.cr.appendUunitCellInfo ("q" + (i + 1) + "=" + pt[0] + " " + pt[1] + " " + pt[2]);
this.sigma.getArray ()[i] =  Clazz.newDoubleArray (-1, [pt[0], pt[1], pt[2]]);
}
var map =  new java.util.Hashtable ();
for (var e, $e = this.htModulation.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
if ((key = this.checkKey (e.getKey (), false)) == null) continue;
pt = e.getValue ();
switch (key.charAt (0)) {
case 'O':
this.haveOccupancy = true;
case 'D':
case 'M':
case 'U':
if (pt[2] == 1 && key.charAt (2) != 'S' && key.charAt (2) != 'T' && key.charAt (2) != 'L') {
var ipt = key.indexOf ("?");
if (ipt >= 0) {
var s = key.substring (ipt + 1);
pt = this.getMod (key.substring (0, 2) + s + "#*;*");
if (pt != null) this.addModulation (map, key = key.substring (0, ipt), pt, iModel);
} else {
var a = pt[0];
var d = 2 * 3.141592653589793 * pt[1];
pt[0] = (a * Math.cos (d));
pt[1] = (a * Math.sin (-d));
pt[2] = 0;
JU.Logger.info ("msCIF setting " + key + " " + JU.Escape.e (pt));
}}break;
case 'W':
if (this.modDim > 1) {
continue;
}case 'F':
if (key.indexOf ("_coefs_") >= 0) {
this.cr.appendLoadNote ("Wave vector " + key + "=" + JU.Escape.eAD (pt));
} else {
var ptHarmonic = this.calculateQCoefs (pt);
if (ptHarmonic == null) {
this.cr.appendLoadNote ("Cannot match atom wave vector " + key + " " + JU.Escape.eAD (pt) + " to a cell wave vector or its harmonic");
} else {
var k2 = key + "_coefs_";
if (!this.htModulation.containsKey (k2 + this.atModel)) {
this.addModulation (map, k2, ptHarmonic, iModel);
if (key.startsWith ("F_")) this.cr.appendLoadNote ("atom wave vector " + key + " = " + JU.Escape.e (pt) + " fn = " + JU.Escape.e (ptHarmonic));
}}}break;
}
}
if (!map.isEmpty ()) this.htModulation.putAll (map);
if (this.htSubsystems == null) {
this.haveAtomMods = false;
} else {
this.cr.strSupercell = null;
this.haveAtomMods = true;
this.htAtomMods =  new java.util.Hashtable ();
}for (var e, $e = this.htModulation.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
if ((key = this.checkKey (e.getKey (), true)) == null) continue;
var params = e.getValue ();
var atomName = key.substring (key.indexOf (";") + 1);
var pt_ = atomName.indexOf ("#=");
if (pt_ >= 0) {
params = this.getMod (atomName.substring (pt_ + 2));
atomName = atomName.substring (0, pt_);
}if (JU.Logger.debuggingHigh) JU.Logger.debug ("SetModulation: " + key + " " + JU.Escape.e (params));
var type = key.charAt (0);
pt_ = key.indexOf ("#") + 1;
var utens = null;
switch (type) {
case 'U':
utens = key.substring (pt_, key.indexOf (";"));
case 'O':
case 'D':
case 'M':
if (this.modAverage) break;
var axis = key.charAt (pt_);
type = this.getModType (key);
if (this.htAtomMods == null) this.htAtomMods =  new java.util.Hashtable ();
var p =  Clazz.newDoubleArray (params.length, 0);
for (var i = p.length; --i >= 0; ) p[i] = params[i];

var qcoefs = this.getQCoefs (key);
if (qcoefs == null) throw  new Exception ("Missing cell wave vector for atom wave vector for " + key + " " + JU.Escape.e (params));
this.addAtomModulation (atomName, axis, type, p, utens, qcoefs);
this.haveAtomMods = true;
break;
}
}
}, "~N");
Clazz.defineMethod (c$, "fixLegendre", 
 function () {
for (var i = this.legendres.size (); --i >= 0; ) {
var key = this.legendres.get (i);
var pt = this.htModulation.get (key);
if (pt != null) {
var key1 = "O_0#0" + key.substring (key.indexOf (";"));
var pt1 = this.htModulation.get (key1);
if (pt1 == null) {
JU.Logger.error ("Crenel " + key1 + " not found for legendre modulation " + key);
pt[2] = NaN;
} else {
this.htModulation.put (key,  Clazz.newDoubleArray (-1, [pt1[0], pt1[1], pt[0], pt[1]]));
}}}
});
Clazz.defineMethod (c$, "fixDouble", 
 function (pt) {
if (this.cr.fixJavaFloat) for (var i = pt.length; --i >= 0; ) pt[i] = JU.PT.fixDouble (pt[i], 100000.0);

}, "~A");
Clazz.overrideMethod (c$, "getQCoefs", 
function (key) {
var fn = Math.max (0, this.cr.parseIntAt (key, 2));
if (fn == 0) {
if (this.qlist100 == null) {
this.qlist100 =  Clazz.newDoubleArray (this.modDim, 0);
this.qlist100[0] = 1;
}return this.qlist100;
}var p = this.getMod ("F_coefs_" + fn);
if (p == null) p = this.getMod ("F_" + fn + "_coefs_");
return p;
}, "~S");
Clazz.overrideMethod (c$, "getModType", 
function (key) {
var type = key.charAt (0);
var id = key.charAt (2);
return (id == 'S' ? 's' : id == 'T' ? 't' : id == 'L' ? (type == 'D' ? 'l' : 'L') : id == '0' ? 'c' : type == 'D' ? 'f' : type == 'O' ? 'o' : type == 'M' ? 'm' : type == 'U' ? 'u' : '?');
}, "~S");
Clazz.defineMethod (c$, "calculateQCoefs", 
 function (p) {
if (this.qs == null) {
this.qs =  new Array (this.modDim);
for (var i = 0; i < this.modDim; i++) {
this.qs[i] = this.toP3 (this.getMod ("W_" + (i + 1)));
}
}var pt = this.toP3 (p);
for (var i = 0; i < this.modDim; i++) if (this.qs[i] != null) {
var ifn = this.approxInt (pt.dot (this.qs[i]) / this.qs[i].dot (this.qs[i]));
if (ifn != 0) {
p =  Clazz.newDoubleArray (this.modDim, 0);
p[i] = ifn;
return p;
}}
var p3 = this.toP3 (p);
var jmin = (this.modDim < 2 ? 0 : -3);
var jmax = (this.modDim < 2 ? 0 : 3);
var kmin = (this.modDim < 3 ? 0 : -3);
var kmax = (this.modDim < 3 ? 0 : 3);
for (var i = -3; i <= 3; i++) for (var j = jmin; j <= jmax; j++) for (var k = kmin; k <= kmax; k++) {
pt.setT (this.qs[0]);
pt.scale (i);
if (this.modDim > 1 && this.qs[1] != null) pt.scaleAdd2 (j, this.qs[1], pt);
if (this.modDim > 2 && this.qs[2] != null) pt.scaleAdd2 (k, this.qs[2], pt);
if (pt.distanceSquared (p3) < 0.0001) {
p =  Clazz.newDoubleArray (this.modDim, 0);
switch (this.modDim) {
default:
p[2] = k;
case 2:
p[1] = j;
case 1:
p[0] = i;
break;
}
return p;
}pt.setT (this.qs[0]);
pt.scale (1 / i);
if (this.modDim > 1 && this.qs[1] != null) pt.scaleAdd2 (1 / j, this.qs[1], pt);
if (this.modDim > 2 && this.qs[2] != null) pt.scaleAdd2 (1 / k, this.qs[2], pt);
if (pt.distanceSquared (p3) < 0.0001) {
p =  Clazz.newDoubleArray (this.modDim, 0);
switch (this.modDim) {
default:
p[2] = 1 / k;
case 2:
p[1] = 1 / j;
case 1:
p[0] = 1 / i;
break;
}
return p;
}}


pt = this.toP3 (p);
for (var i = 0; i < this.modDim; i++) if (this.qs[i] != null) {
p3 = this.qs[i];
var ifn = 0;
if (pt.x != 0) ifn = this.approxInt (pt.x / p3.x);
if (pt.y != 0) ifn = Math.max (this.approxInt (pt.y / p3.y), ifn);
if (ifn == 0 && pt.z != 0) ifn = Math.max (this.approxInt (pt.z / p3.z), ifn);
if (ifn == 0) continue;
if (p3.x != 0 && this.approxInt (10 + p3.x * ifn - pt.x) == 0 || p3.y != 0 && this.approxInt (10 + p3.y * ifn - pt.y) == 0 || p3.z != 0 && this.approxInt (10 + p3.z * ifn - pt.z) == 0) continue;
p =  Clazz.newDoubleArray (this.modDim, 0);
p[i] = ifn;
return p;
}
return null;
}, "~A");
Clazz.defineMethod (c$, "approxInt", 
 function (fn) {
var ifn = Math.round (fn);
return (Math.abs (fn - ifn) < 0.001 ? ifn : 0);
}, "~N");
Clazz.defineMethod (c$, "toP3", 
 function (x) {
return JU.P3.new3 (x[0], x[1], x[2]);
}, "~A");
Clazz.defineMethod (c$, "addAtomModulation", 
 function (atomName, axis, type, params, utens, qcoefs) {
var list = this.htAtomMods.get (atomName);
if (list == null) {
this.ac++;
this.htAtomMods.put (atomName, list =  new JU.Lst ());
}list.addLast ( new JU.Modulation (axis, type, params, utens, qcoefs));
this.modCount++;
}, "~S,~S,~S,~A,~S,~A");
Clazz.overrideMethod (c$, "addSubsystem", 
function (code, w) {
if (code == null) return;
var ss =  new J.adapter.readers.cif.Subsystem (this, code, w);
this.cr.appendLoadNote ("subsystem " + code + "\n" + w);
this.setSubsystem (code, ss);
}, "~S,JU.Matrix");
Clazz.defineMethod (c$, "addUStr", 
 function (atom, id, val) {
var i = Clazz.doubleToInt ("U11U22U33U12U13U23UISO".indexOf (id) / 3);
if (JU.Logger.debuggingHigh) JU.Logger.debug ("MOD RDR adding " + id + " " + i + " " + val + " to " + atom.anisoBorU[i]);
this.cr.asc.setU (atom, i, val + atom.anisoBorU[i]);
}, "J.adapter.smarter.Atom,~S,~N");
Clazz.defineMethod (c$, "modulateAtom", 
 function (a) {
if (this.modCoord && this.htSubsystems != null) {
var ptc = JU.P3.newP (a);
var spt = this.getSymmetry (a);
spt.toCartesian (ptc, true);
}var list = this.htAtomMods.get (a.atomName);
if (list == null && a.altLoc != '\0' && this.htSubsystems != null) {
list =  new JU.Lst ();
}if (list == null || this.symmetry == null || a.bsSymmetry == null) return;
var iop = Math.max (a.bsSymmetry.nextSetBit (0), 0);
if (this.modLast) iop = Math.max ((a.bsSymmetry.length () - 1) % this.nOps, iop);
if (JU.Logger.debuggingHigh) JU.Logger.debug ("\nsetModulation: i=" + a.index + " " + a.atomName + " xyz=" + a + " occ=" + a.foccupancy);
if (iop != this.iopLast) {
this.iopLast = iop;
this.gammaE =  new JU.M3 ();
this.getSymmetry (a).getSpaceGroupOperation (iop).getRotationScale (this.gammaE);
}if (JU.Logger.debugging) {
JU.Logger.debug ("setModulation iop = " + iop + " " + this.symmetry.getSpaceGroupXyz (iop, false) + " " + a.bsSymmetry);
}var ms =  new JU.ModulationSet ().setMod (a.index + " " + a.atomName, this.getAtomR0 (this.cr.asc.atoms[a.atomSite]), this.getAtomR0 (a), this.modDim, list, this.gammaE, this.getMatrices (a), this.getSymmetry (a), this.nOps, iop, Clazz.instanceOf (a.vib, JU.Vibration) ? a.vib : null, this.isCommensurate);
ms.calculate (this.modTUV, false);
if (!Float.isNaN (ms.vOcc)) {
a.foccupancy = ms.setOccupancy (this.getMod ("J_O#0;" + a.atomName), a.foccupancy, (a.vib == null ? 0 : a.vib.x));
}if (ms.htUij != null) {
var t = (a.tensors == null ? null : a.tensors.get (0));
if (t != null && t.parBorU != null) {
a.anisoBorU =  Clazz.newFloatArray (8, 0);
for (var i = 0; i < 8; i++) a.anisoBorU[i] = t.parBorU[i];

t.isUnmodulated = true;
}if (a.anisoBorU == null) {
JU.Logger.error ("MOD RDR cannot modulate nonexistent atom anisoBorU for atom " + a.atomName);
} else {
if (JU.Logger.debuggingHigh) {
JU.Logger.debug ("setModulation Uij(initial)=" + JU.Escape.eAF (a.anisoBorU));
JU.Logger.debug ("setModulation tensor=" + JU.Escape.e ((a.tensors.get (0)).getInfo ("all")));
}for (var e, $e = ms.htUij.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) this.addUStr (a, e.getKey (), e.getValue ().floatValue ());

var sym = this.getAtomSymmetry (a, this.symmetry);
t = this.cr.asc.getXSymmetry ().addRotatedTensor (a, sym.getTensor (this.cr.vwr, a.anisoBorU), iop, false, sym);
t.isModulated = true;
t.id = JU.Escape.e (a.anisoBorU);
a.bfactor = a.anisoBorU[7] * 100;
a.anisoBorU = null;
if (JU.Logger.debuggingHigh) {
JU.Logger.debug ("setModulation Uij(final)=" + JU.Escape.eAF (a.anisoBorU) + "\n");
JU.Logger.debug ("setModulation tensor=" + JU.Escape.e ((a.tensors.get (1)).getInfo ("all")));
}}}if (Float.isNaN (ms.x)) ms.set (0, 0, 0);
a.vib = ms;
}, "J.adapter.smarter.Atom");
Clazz.defineMethod (c$, "getAtomR0", 
 function (atom) {
var r0 = JU.P3.newP (atom);
if (this.supercellSymmetry != null) {
this.supercellSymmetry.toCartesian (r0, true);
this.symmetry.toFractional (r0, true);
}return r0;
}, "J.adapter.smarter.Atom");
Clazz.overrideMethod (c$, "getAtomSymmetry", 
function (a, defaultSymmetry) {
var ss;
return (this.htSubsystems == null || (ss = this.getSubsystem (a)) == null ? defaultSymmetry : ss.getSymmetry ());
}, "J.adapter.smarter.Atom,J.api.SymmetryInterface");
Clazz.defineMethod (c$, "setSubsystem", 
 function (code, system) {
if (this.htSubsystems == null) this.htSubsystems =  new java.util.Hashtable ();
this.htSubsystems.put (code, system);
this.setSubsystemOptions ();
}, "~S,J.adapter.readers.cif.Subsystem");
Clazz.defineMethod (c$, "getMatrices", 
 function (a) {
var ss = this.getSubsystem (a);
return (ss == null ? this.modMatrices : ss.getModMatrices ());
}, "J.adapter.smarter.Atom");
Clazz.defineMethod (c$, "getSymmetry", 
 function (a) {
var ss = this.getSubsystem (a);
return (ss == null ? this.symmetry : ss.getSymmetry ());
}, "J.adapter.smarter.Atom");
Clazz.defineMethod (c$, "getSubsystem", 
 function (a) {
return (this.htSubsystems == null ? null : this.htSubsystems.get ("" + a.altLoc));
}, "J.adapter.smarter.Atom");
Clazz.overrideMethod (c$, "setMinMax0", 
function (minXYZ, maxXYZ) {
if (this.htSubsystems == null) return;
var symmetry = this.getDefaultUnitCell ();
this.minXYZ0 = JU.P3.newP (minXYZ);
this.maxXYZ0 = JU.P3.newP (maxXYZ);
var pt0 = JU.P3.newP (minXYZ);
var pt1 = JU.P3.newP (maxXYZ);
var pt =  new JU.P3 ();
symmetry.toCartesian (pt0, true);
symmetry.toCartesian (pt1, true);
var pts = JU.BoxInfo.unitCubePoints;
if (this.sigma == null) {
JU.Logger.error ("Why are we in MSRdr.setMinMax0 without modulation init?");
return;
}for (var e, $e = this.htSubsystems.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var sym = e.getValue ().getSymmetry ();
for (var i = 8; --i >= 0; ) {
pt.x = (pts[i].x == 0 ? pt0.x : pt1.x);
pt.y = (pts[i].y == 0 ? pt0.y : pt1.y);
pt.z = (pts[i].z == 0 ? pt0.z : pt1.z);
this.expandMinMax (pt, sym, minXYZ, maxXYZ);
}
}
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "expandMinMax", 
 function (pt, sym, minXYZ, maxXYZ) {
var pt2 = JU.P3.newP (pt);
var slop = 0.0001;
sym.toFractional (pt2, false);
if (minXYZ.x > pt2.x + slop) minXYZ.x = Clazz.doubleToInt (Math.floor (pt2.x)) - 1;
if (minXYZ.y > pt2.y + slop) minXYZ.y = Clazz.doubleToInt (Math.floor (pt2.y)) - 1;
if (minXYZ.z > pt2.z + slop) minXYZ.z = Clazz.doubleToInt (Math.floor (pt2.z)) - 1;
if (maxXYZ.x < pt2.x - slop) maxXYZ.x = Clazz.doubleToInt (Math.ceil (pt2.x)) + 1;
if (maxXYZ.y < pt2.y - slop) maxXYZ.y = Clazz.doubleToInt (Math.ceil (pt2.y)) + 1;
if (maxXYZ.z < pt2.z - slop) maxXYZ.z = Clazz.doubleToInt (Math.ceil (pt2.z)) + 1;
}, "JU.P3,J.api.SymmetryInterface,JU.P3,JU.P3");
Clazz.defineMethod (c$, "trimAtomSet", 
 function () {
if (!this.cr.doApplySymmetry) return;
var asc = this.cr.asc;
var bs = asc.bsAtoms;
var sym = this.getDefaultUnitCell ();
var atoms = asc.atoms;
var pt =  new JU.P3 ();
if (bs == null) bs = asc.bsAtoms = JU.BSUtil.newBitSet2 (0, asc.ac);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var a = atoms[i];
var isOK = (!this.isCommensurate || this.modAverage || a.foccupancy >= 0.5);
if (isOK) {
pt.setT (a);
if (a.vib != null) pt.add (a.vib);
this.getSymmetry (a).toCartesian (pt, false);
sym.toFractional (pt, false);
if (this.cr.fixJavaFloat) JU.PT.fixPtFloats (pt, 100000.0);
isOK = asc.xtalSymmetry.isWithinCell (3, pt, this.minXYZ0.x, this.maxXYZ0.x, this.minXYZ0.y, this.maxXYZ0.y, this.minXYZ0.z, this.maxXYZ0.z, 0.001);
}if (isOK) {
if (this.cr.fixJavaFloat) JU.PT.fixPtFloats (a, 100000.0);
} else {
bs.clear (i);
}}
});
Clazz.defineMethod (c$, "getDefaultUnitCell", 
 function () {
return (this.modCell != null && this.htSubsystems.containsKey (this.modCell) ? this.htSubsystems.get (this.modCell).getSymmetry () : this.cr.asc.getSymmetry ());
});
Clazz.overrideMethod (c$, "getSymmetryFromCode", 
function (code) {
return this.htSubsystems.get (code).getSymmetry ();
}, "~S");
Clazz.overrideMethod (c$, "addLatticeVector", 
function (lattvecs, data) {
var a = null;
var c = data.charAt (0);
var dim = this.modDim + 3;
switch (c) {
case 'P':
case 'X':
break;
case 'A':
case 'B':
case 'C':
case 'I':
a =  Clazz.newFloatArray (-1, [0.5, 0.5, 0.5]);
if (c != 'I') a[c.charCodeAt (0) - 65] = 0;
break;
case 'F':
this.addLatticeVector (lattvecs, "A");
this.addLatticeVector (lattvecs, "B");
this.addLatticeVector (lattvecs, "C");
break;
case 'M':
dim++;
case '0':
if (data.indexOf (".") >= 0) a = J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (data, null, dim);
break;
default:
return false;
}
if (a != null) lattvecs.addLast (a);
return true;
}, "JU.Lst,~S");
Clazz.defineStatics (c$,
"U_LIST", "U11U22U33U12U13U23UISO");
});
