Clazz.declarePackage ("J.quantum");
Clazz.load (["J.api.JmolNMRInterface", "java.util.Hashtable"], "J.quantum.NMRCalculation", ["java.lang.Double", "$.Float", "$.IllegalArgumentException", "$.NullPointerException", "JU.BS", "$.Lst", "$.Measure", "$.PT", "$.V3", "J.quantum.NMRNoeMatrix", "JU.Escape", "$.Logger", "$.Tensor", "JV.FileManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.isotopeData = null;
this.shiftRefsPPM = null;
Clazz.instantialize (this, arguments);
}, J.quantum, "NMRCalculation", null, J.api.JmolNMRInterface);
Clazz.prepareFields (c$, function () {
this.shiftRefsPPM =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
this.getData ();
return this;
}, "JV.Viewer");
Clazz.overrideMethod (c$, "getQuadrupolarConstant", 
function (efg) {
if (efg == null) return 0;
var a = this.vwr.ms.at[efg.atomIndex1];
return (this.getIsotopeData (a, 2) * efg.eigenValues[2] * 2.349647144641375E8);
}, "JU.Tensor");
Clazz.defineMethod (c$, "getInteractionTensorList", 
 function (type, bsA) {
if (type != null) type = type.toLowerCase ();
var bsModels = this.vwr.ms.getModelBS (bsA, false);
var bs1 = this.getAtomSiteBS (bsA);
var iAtom = (bs1.cardinality () == 1 ? bs1.nextSetBit (0) : -1);
var list =  new JU.Lst ();
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) {
var tensors = this.vwr.ms.getInfo (i, "interactionTensors");
if (tensors == null) continue;
var n = tensors.size ();
for (var j = 0; j < n; j++) {
var t = tensors.get (j);
if (type == null || t.type.equals (type) && t.isSelected (bs1, iAtom)) list.addLast (t);
}
}
return list;
}, "~S,JU.BS");
Clazz.defineMethod (c$, "getAtomSiteBS", 
 function (bsA) {
if (bsA == null) return null;
var bs =  new JU.BS ();
var atoms = this.vwr.ms.at;
var models = this.vwr.ms.am;
for (var i = bsA.nextSetBit (0); i >= 0; i = bsA.nextSetBit (i + 1)) {
if (!bsA.get (i)) continue;
var a = atoms[i];
bs.set (models[a.mi].firstAtomIndex - 1 + a.atomSite);
}
return bs;
}, "JU.BS");
Clazz.overrideMethod (c$, "getUniqueTensorSet", 
function (bsAtoms) {
var bs =  new JU.BS ();
var atoms = this.vwr.ms.at;
for (var i = this.vwr.ms.mc; --i >= 0; ) {
var bsModelAtoms = this.vwr.getModelUndeletedAtomsBitSet (i);
bsModelAtoms.and (bsAtoms);
if (this.vwr.ms.getUnitCell (i) == null) continue;
for (var j = bsModelAtoms.nextSetBit (0); j >= 0; j = bsModelAtoms.nextSetBit (j + 1)) if (atoms[j].atomSite != atoms[j].i + 1) bsModelAtoms.clear (j);

bs.or (bsModelAtoms);
for (var j = bsModelAtoms.nextSetBit (0); j >= 0; j = bsModelAtoms.nextSetBit (j + 1)) {
var ta = atoms[j].getTensors ();
if (ta == null) continue;
for (var jj = ta.length; --jj >= 0; ) {
var t = ta[jj];
if (t == null) continue;
for (var k = bsModelAtoms.nextSetBit (j + 1); k >= 0; k = bsModelAtoms.nextSetBit (k + 1)) {
var tb = atoms[k].getTensors ();
if (tb == null) continue;
for (var kk = tb.length; --kk >= 0; ) {
if (t.isEquiv (tb[kk])) {
bsModelAtoms.clear (k);
bs.clear (k);
break;
}}
}
}
}
}
return bs;
}, "JU.BS");
Clazz.defineMethod (c$, "getJCouplingHz", 
function (a1, a2, type, isc) {
return this.getIsoOrAnisoHz (true, a1, a2, type, isc);
}, "JM.Atom,JM.Atom,~S,JU.Tensor");
Clazz.overrideMethod (c$, "getIsoOrAnisoHz", 
function (isIso, a1, a2, units, isc) {
if (isc == null) {
var type = this.getISCtype (a1, units);
if (type == null || a1.mi != a2.mi) {
if (!units.equals ("hz")) return 0;
var data = J.quantum.NMRCalculation.calc2or3JorNOE (this.vwr,  Clazz.newArray (-1, [a1, null, null, a2]), null, 3);
return (data == null ? NaN : data[1]);
}var bs =  new JU.BS ();
bs.set (a1.i);
bs.set (a2.i);
var list = this.getInteractionTensorList (type, bs);
if (list.size () == 0) return NaN;
isc = list.get (0);
} else {
a1 = this.vwr.ms.at[isc.atomIndex1];
a2 = this.vwr.ms.at[isc.atomIndex2];
}return (this.getIsotopeData (a1, 1) * this.getIsotopeData (a2, 1) * (isIso ? isc.isotropy () : isc.anisotropy ()) * 0.0167840302932219);
}, "~B,JM.Atom,JM.Atom,~S,JU.Tensor");
Clazz.defineMethod (c$, "getISCtype", 
 function (a1, type) {
var tensors = this.vwr.ms.getInfo (a1.mi, "interactionTensors");
if (tensors == null) return null;
type = (type == null ? "" : type.toLowerCase ());
var pt = -1;
if ((pt = type.indexOf ("_hz")) >= 0 || (pt = type.indexOf ("_khz")) >= 0 || (pt = type.indexOf ("hz")) >= 0 || (pt = type.indexOf ("khz")) >= 0) type = type.substring (0, pt);
if (type.length == 0) type = "isc";
return type;
}, "JM.Atom,~S");
Clazz.overrideMethod (c$, "getDipolarConstantHz", 
function (a1, a2) {
if (JU.Logger.debugging) JU.Logger.debug (a1 + " g=" + this.getIsotopeData (a1, 1) + "; " + a2 + " g=" + this.getIsotopeData (a2, 1));
var v = (-this.getIsotopeData (a1, 1) * this.getIsotopeData (a2, 1) / Math.pow (a1.distance (a2), 3) * 1054.5717253362893);
return (v == 0 || a1 === a2 ? NaN : v);
}, "JM.Atom,JM.Atom");
Clazz.overrideMethod (c$, "getDipolarCouplingHz", 
function (a1, a2, vField) {
var v12 = JU.V3.newVsub (a2, a1);
var r = v12.length ();
var costheta = v12.dot (vField) / r / vField.length ();
return (this.getDipolarConstantHz (a1, a2) * (3 * costheta - 1) / 2);
}, "JM.Atom,JM.Atom,JU.V3");
Clazz.defineMethod (c$, "getIsotopeData", 
 function (a, iType) {
var iso = a.getIsotopeNumber ();
var sym = a.getElementSymbolIso (false);
var d = this.isotopeData.get (iso == 0 ? sym : "" + iso + sym);
return (d == null ? 0 : d[iType]);
}, "JM.Atom,~N");
Clazz.defineMethod (c$, "getData", 
 function () {
var br = null;
try {
var debugging = JU.Logger.debugging;
br = JV.FileManager.getBufferedReaderForResource (this.vwr, this, "J/quantum/", "nmr_data.txt");
this.isotopeData =  new java.util.Hashtable ();
var line;
while ((line = br.readLine ()) != null) {
if (debugging) JU.Logger.info (line);
if (line.indexOf ("#") >= 0) continue;
var tokens = JU.PT.getTokens (line);
var name = tokens[0];
var defaultIso = tokens[2] + name;
if (debugging) JU.Logger.info (name + " default isotope " + defaultIso);
for (var i = 3; i < tokens.length; i += 3) {
var n = Integer.parseInt (tokens[i]);
var isoname = n + name;
var dataGQ =  Clazz.newDoubleArray (-1, [n, Double.parseDouble (tokens[i + 1]), Double.parseDouble (tokens[i + 2])]);
if (debugging) JU.Logger.info (isoname + "  " + JU.Escape.eAD (dataGQ));
this.isotopeData.put (isoname, dataGQ);
}
var defdata = this.isotopeData.get (defaultIso);
if (defdata == null) {
JU.Logger.error ("Cannot find default NMR data in nmr_data.txt for " + defaultIso);
throw  new NullPointerException ();
}defdata[0] = -defdata[0];
this.isotopeData.put (name, defdata);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Exception " + e.toString () + " reading " + "nmr_data.txt");
} else {
throw e;
}
} finally {
try {
br.close ();
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
}
});
Clazz.overrideMethod (c$, "getInfo", 
function (what) {
if (what.equals ("all")) {
var map =  new java.util.Hashtable ();
map.put ("isotopes", this.isotopeData);
map.put ("shiftRefsPPM", this.shiftRefsPPM);
return map;
}if (JU.PT.isDigit (what.charAt (0))) return this.isotopeData.get (what);
var info =  new JU.Lst ();
for (var e, $e = this.isotopeData.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var key = e.getKey ();
if (JU.PT.isDigit (key.charAt (0)) && key.endsWith (what)) info.addLast (e.getValue ());
}
return info;
}, "~S");
Clazz.overrideMethod (c$, "getChemicalShift", 
function (atom) {
var v = this.getMagneticShielding (atom);
if (Float.isNaN (v)) return v;
var ref = this.shiftRefsPPM.get (atom.getElementSymbol ());
return (ref == null ? 0 : ref.floatValue ()) - v;
}, "JM.Atom");
Clazz.overrideMethod (c$, "getMagneticShielding", 
function (atom) {
var t = this.vwr.ms.getAtomTensor (atom.i, "ms");
return (t == null ? NaN : t.isotropy ());
}, "JM.Atom");
Clazz.overrideMethod (c$, "getState", 
function (sb) {
if (this.shiftRefsPPM.isEmpty ()) return false;
for (var nuc, $nuc = this.shiftRefsPPM.entrySet ().iterator (); $nuc.hasNext () && ((nuc = $nuc.next ()) || true);) sb.append ("  set shift_").append (nuc.getKey ()).append (" ").appendO (nuc.getValue ()).append ("\n");

return true;
}, "JU.SB");
Clazz.overrideMethod (c$, "setChemicalShiftReference", 
function (element, value) {
if (element == null) {
this.shiftRefsPPM.clear ();
return false;
}element = element.substring (0, 1).toUpperCase () + element.substring (1);
this.shiftRefsPPM.put (element, Float.$valueOf (value));
return true;
}, "~S,~N");
Clazz.overrideMethod (c$, "getTensorInfo", 
function (tensorType, infoType, bs) {
if ("".equals (tensorType)) tensorType = null;
infoType = (infoType == null ? ";all." : ";" + infoType + ".");
var data =  new JU.Lst ();
var list1;
if (";dc.".equals (infoType)) {
var atoms = this.vwr.ms.at;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) for (var j = bs.nextSetBit (i + 1); j >= 0; j = bs.nextSetBit (j + 1)) {
list1 =  new JU.Lst ();
list1.addLast (Integer.$valueOf (atoms[i].i));
list1.addLast (Integer.$valueOf (atoms[j].i));
list1.addLast (Float.$valueOf (this.getDipolarConstantHz (atoms[i], atoms[j])));
data.addLast (list1);
}

return data;
}if (tensorType == null || tensorType.startsWith ("isc")) {
var isJ = infoType.equals (";j.");
var isEta = infoType.equals (";eta.");
var list = this.getInteractionTensorList (tensorType, bs);
var n = (list == null ? 0 : list.size ());
for (var i = 0; i < n; i++) {
var t = list.get (i);
list1 =  new JU.Lst ();
list1.addLast (Integer.$valueOf (t.atomIndex1));
list1.addLast (Integer.$valueOf (t.atomIndex2));
list1.addLast (isEta || isJ ? Float.$valueOf (this.getIsoOrAnisoHz (isJ, null, null, null, t)) : t.getInfo (infoType));
data.addLast (list1);
}
if (tensorType != null) return data;
}var isChi = tensorType != null && tensorType.startsWith ("efg") && infoType.equals (";chi.");
var isFloat = (isChi || JU.Tensor.isFloatInfo (infoType));
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (tensorType == null) {
var a = this.vwr.ms.getAtomTensorList (i);
if (a != null) for (var j = 0; j < a.length; j++) data.addLast ((a[j]).getInfo (infoType));

} else {
var t = this.vwr.ms.getAtomTensor (i, tensorType);
data.addLast (t == null ? (isFloat ? Float.$valueOf (0) : "") : isChi ? Float.$valueOf (this.getQuadrupolarConstant (t)) : t.getInfo (infoType));
}}
return data;
}, "~S,~S,JU.BS");
Clazz.overrideMethod (c$, "getMinDistances", 
function (md) {
var bsPoints1 = md.points.get (0);
var n1 = bsPoints1.cardinality ();
if (n1 == 0 || !(Clazz.instanceOf (md.points.get (1), JU.BS))) return null;
var bsPoints2 = md.points.get (1);
var n2 = bsPoints2.cardinality ();
if (n1 < 2 && n2 < 2) return null;
var htMin =  new java.util.Hashtable ();
var atoms = this.vwr.ms.at;
for (var i = bsPoints1.nextSetBit (0); i >= 0; i = bsPoints1.nextSetBit (i + 1)) {
var a1 = atoms[i];
var name = a1.getAtomName ();
for (var j = bsPoints2.nextSetBit (0); j >= 0; j = bsPoints2.nextSetBit (j + 1)) {
var a2 = atoms[j];
var d = Clazz.floatToInt (a2.distanceSquared (a1) * 100);
if (d == 0) continue;
var name1 = a2.getAtomName ();
var key = (name.compareTo (name1) < 0 ? name + name1 : name1 + name);
var min = htMin.get (key);
if (min == null) {
min = Integer.$valueOf (d);
htMin.put (key, min);
continue;
}if (d < min.intValue ()) htMin.put (key, Integer.$valueOf (d));
}
}
return htMin;
}, "JM.MeasurementData");
c$.calcJKarplus = Clazz.defineMethod (c$, "calcJKarplus", 
function (theta) {
var j0 = 8.5;
var j180 = 9.5;
var jconst = 0.28;
var cos = Math.cos (theta);
var jab = 0;
if (theta >= -90.0 && theta < 90.0) {
jab = j0 * cos * cos - jconst;
} else {
jab = j180 * cos * cos - jconst;
}return jab;
}, "~N");
c$.getInitialJValue = Clazz.defineMethod (c$, "getInitialJValue", 
 function (nNonH, theta) {
var p = J.quantum.NMRCalculation.pAltona[nNonH];
var cos = Math.cos (theta);
return p[1] * cos * cos + p[2] * cos + p[3];
}, "~N,~N");
c$.getIncrementalJValue = Clazz.defineMethod (c$, "getIncrementalJValue", 
 function (nNonH, element, sA_cA, v21, v23, theta, f) {
if (nNonH < 0 || nNonH > 5) return 0;
var de = J.quantum.NMRCalculation.deltaElectro.get (element);
if (de == null) return 0;
var e = de.doubleValue ();
var sign = J.quantum.NMRCalculation.getSubSign (sA_cA, v21, v23, f);
var p = J.quantum.NMRCalculation.pAltona[nNonH];
var cos = Math.cos (sign * theta + p[6] * Math.abs (e));
return e * (p[4] + p[5] * cos * cos);
}, "~N,~S,JU.V3,JU.V3,JU.V3,~N,~N");
c$.getSubSign = Clazz.defineMethod (c$, "getSubSign", 
 function (sA_cA, v21, v23, f) {
var cross =  new JU.V3 ();
cross.cross (v23, v21);
return (cross.dot (sA_cA) > 0 ? f : -f);
}, "JU.V3,JU.V3,JU.V3,~N");
c$.calc3JHHOnly = Clazz.defineMethod (c$, "calc3JHHOnly", 
 function (subElements, subVectors, v21, v34, v23, theta, is23Double) {
var nNonH = 0;
for (var i = 0, n = (is23Double ? 2 : 3); i < n; i++) {
if (!subElements[0][i].equals ("H")) {
nNonH++;
}if (!subElements[1][i].equals ("H")) {
nNonH++;
}}
var jvalue = J.quantum.NMRCalculation.getInitialJValue (nNonH, theta);
for (var i = 0, n = (is23Double ? 2 : 3); i < n; i++) {
var element = subElements[0][i];
if (!element.equals ("H")) {
jvalue += J.quantum.NMRCalculation.getIncrementalJValue (nNonH, element, subVectors[0][i], v21, v23, theta, 1);
}element = subElements[1][i];
if (!element.equals ("H")) {
jvalue += J.quantum.NMRCalculation.getIncrementalJValue (nNonH, element, subVectors[1][i], v34, v23, theta, -1);
}}
if (is23Double) {
if (Math.abs (theta) < 1.5707963267948966) jvalue *= 0.75;
 else jvalue *= 1.33;
}return jvalue;
}, "~A,~A,JU.V3,JU.V3,JU.V3,~N,~B");
c$.calc3JCH = Clazz.defineMethod (c$, "calc3JCH", 
function (CHequation, theta, is23Double) {
if (CHequation == null) CHequation = "was";
if (!JU.PT.isOneOf (CHequation, ";was;tva;ayd;")) throw  new IllegalArgumentException ("Equation must be one of was, tva, or ayd");
if (CHequation.equals ("was")) {
var A = 3.56;
var C = 4.26;
var j = 3.56 * Math.cos (2 * theta) - Math.cos (theta) + 4.26;
return j;
} else if (CHequation.equals ("tva")) {
var j = 4.5 - 0.87 * Math.cos (theta) + Math.cos (2.0 * theta);
return j;
} else if (CHequation.equals ("ayd")) {
var j = 5.8 * Math.pow (Math.cos (theta), 2) - 1.6 * Math.cos (theta) + 0.28 * Math.sin (2.0 * theta) - 0.02 * Math.sin (theta) + 0.52;
return j;
} else {
return 0.0;
}}, "~S,~N,~B");
c$.calcNOE = Clazz.defineMethod (c$, "calcNOE", 
function (viewer, atom1, atom2) {
return J.quantum.NMRCalculation.calc2or3JorNOE (viewer,  Clazz.newArray (-1, [atom1, null, null, atom2]), null, 7);
}, "JV.Viewer,JM.Atom,JM.Atom");
c$.calc2or3JorNOE = Clazz.defineMethod (c$, "calc2or3JorNOE", 
function (viewer, atoms, CHEquation, mode) {
if (CHEquation == null || CHEquation.equals ("none")) mode &= -5;
var elements =  new Array (4);
mode = J.quantum.NMRCalculation.getCalcType (atoms, elements, mode);
switch (mode) {
default:
case 0:
return null;
case 8:
return J.quantum.NMRCalculation.calcNOEImpl (viewer, atoms[0], atoms[3]);
case 1:
return J.quantum.NMRCalculation.calc2JHH (atoms[0], atoms[1], atoms[3]);
case 4:
case 2:
break;
}
var subElements =  Clazz.newArray (2, 3, null);
var subVectors =  Clazz.newArray (2, 3, null);
var v23 = JU.V3.newVsub (atoms[2], atoms[1]);
var v21 = JU.V3.newVsub (atoms[0], atoms[1]);
var v34 = JU.V3.newVsub (atoms[3], atoms[2]);
var subs =  new JU.Lst ();
var bonds = atoms[1].bonds;
var is23Double = false;
for (var pt = 0, i = Math.min (bonds.length, 4); --i >= 0; ) {
var sub = bonds[i].getOtherAtom (atoms[1]);
if (sub === atoms[2]) {
is23Double = (bonds[i].order == 2);
continue;
}subElements[0][pt] = sub.getElementSymbol ();
subVectors[0][pt] = JU.V3.newVsub (sub, atoms[1]);
pt++;
}
subs.clear ();
bonds = atoms[2].bonds;
for (var pt = 0, i = Math.min (bonds.length, 4); --i >= 0; ) {
var sub = bonds[i].getOtherAtom (atoms[2]);
if (sub === atoms[1]) continue;
subElements[1][pt] = sub.getElementSymbol ();
subVectors[1][pt] = JU.V3.newVsub (sub, atoms[2]);
pt++;
}
var theta = JU.Measure.computeTorsion (atoms[0], atoms[1], atoms[2], atoms[3], false);
var jvalue = NaN;
if (is23Double || subElements[0][2] != null && subElements[1][2] != null) {
switch (mode) {
case 2:
jvalue = J.quantum.NMRCalculation.calc3JHHOnly (subElements, subVectors, v21, v34, v23, theta, is23Double);
break;
case 4:
if (is23Double) return null;
jvalue = J.quantum.NMRCalculation.calc3JCH (CHEquation, theta, is23Double);
break;
}
} else {
jvalue = J.quantum.NMRCalculation.calcJKarplus (theta);
}return  Clazz.newDoubleArray (-1, [theta, jvalue, atoms[1].i, atoms[2].i]);
}, "JV.Viewer,~A,~S,~N");
c$.getCalcType = Clazz.defineMethod (c$, "getCalcType", 
function (atoms, elementsToFill, mode) {
var atom1 = atoms[0];
var atom4 = atoms[3];
var bonds1 = atom1.bonds;
var bonds4 = atom4.bonds;
if (bonds1 == null || bonds4 == null || atom1.isCovalentlyBonded (atom4)) return 0;
var allowNOE = ((mode & 8) == 8);
var allow3JHH = ((mode & 2) == 2);
var allow2JHH = ((mode & 1) == 1);
var allow3JCH = ((mode & 4) == 4);
var isGeminal = false;
var atom2 = atoms[1];
var atom3 = atoms[2];
if (atom2 == null) {
for (var i = 0; i < bonds1.length; i++) {
atom2 = bonds1[i].getOtherAtom (atom1);
if (atom2.isCovalentlyBonded (atom4)) {
isGeminal = true;
break;
}for (var j = 0; j < bonds4.length; j++) {
atom3 = bonds4[j].getOtherAtom (atom4);
if (atom2.isCovalentlyBonded (atom3)) break;
atom3 = null;
}
}
atoms[1] = atom2;
atoms[2] = atom3;
} else if (atom2.isCovalentlyBonded (atom4)) {
isGeminal = true;
}var e1 = atom4.getElementSymbol ();
var e2 = (atom2 == null ? null : atom2.getElementSymbol ());
var e3 = (atom3 == null ? null : atom3.getElementSymbol ());
var e4 = atom1.getElementSymbol ();
var isHH = e1.equals ("H") && e4.equals ("H");
if (isGeminal) {
mode = (allow2JHH && isHH && e2.equals ("C") ? 1 : 0);
} else if (atom3 == null) {
mode = (allowNOE && isHH ? 8 : 0);
} else if (allow3JHH && isHH) {
mode = 2;
} else if (allow3JCH && e2.equals ("C") && e3.equals ("C") && (e1.equals ("H") && e4.equals ("C") || e1.equals ("C") && e4.equals ("H"))) {
mode = 4;
} else {
mode = 0;
}if (mode != 0 && elementsToFill != null) {
elementsToFill[0] = e1;
elementsToFill[1] = e2;
elementsToFill[2] = e3;
elementsToFill[3] = e4;
}return mode;
}, "~A,~A,~N");
c$.calc2JHH = Clazz.defineMethod (c$, "calc2JHH", 
 function (h1, c, h2) {
var val = NaN;
switch (c.getCovalentBondCount ()) {
case 3:
val = 1.5;
break;
case 4:
val = 12.0;
break;
default:
return null;
}
var angle = JU.Measure.computeAngle (h1, c, h2,  new JU.V3 (),  new JU.V3 (), false);
return  Clazz.newDoubleArray (-1, [angle, val, c.i]);
}, "JM.Atom,JM.Atom,JM.Atom");
c$.calcNOEImpl = Clazz.defineMethod (c$, "calcNOEImpl", 
 function (viewer, atom1, atom2) {
try {
var noeMatrix = viewer.ms.getInfo (atom1.mi, "noeMatrix");
var dist = 0;
var noe = NaN;
if (noeMatrix == null) {
noeMatrix = J.quantum.NMRNoeMatrix.createMatrix (viewer, viewer.getModelUndeletedAtomsBitSet (atom1.mi), viewer.ms.getInfo (atom1.mi, "noeLabels"), viewer.ms.getInfo (atom1.mi, "noeParams"));
}dist = noeMatrix.getJmolDistance (atom1.i, atom2.i);
noe = noeMatrix.getJmolNoe (atom1.i, atom2.i);
return (Double.isNaN (noe) ? null :  Clazz.newDoubleArray (-1, [dist, noe]));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
return null;
} else {
throw e;
}
}
}, "JV.Viewer,JM.Atom,JM.Atom");
Clazz.overrideMethod (c$, "getNOEorJHH", 
function (atoms, mode) {
return J.quantum.NMRCalculation.calc2or3JorNOE (this.vwr, atoms, null, mode);
}, "~A,~N");
Clazz.defineStatics (c$,
"MAGNETOGYRIC_RATIO", 1,
"QUADRUPOLE_MOMENT", 2,
"e_charge", 1.60217646e-19,
"h_planck", 6.62606957e-34,
"h_bar_planck", 1.0545717253362894E-34,
"DIPOLAR_FACTOR", 1054.5717253362893,
"J_FACTOR", 0.0167840302932219,
"Q_FACTOR", 2.349647144641375E8,
"MODE_CALC_INVALID", 0,
"MODE_CALC_2JHH", 1,
"MODE_CALC_3JHH", 2,
"MODE_CALC_JHH", 3,
"MODE_CALC_3JCH", 4,
"MODE_CALC_J", 7,
"MODE_CALC_NOE", 8,
"MODE_CALC_ALL", 0xF,
"resource", "nmr_data.txt");
c$.deltaElectro = c$.prototype.deltaElectro =  new java.util.Hashtable ();
{
var enegH = 2.20;
J.quantum.NMRCalculation.deltaElectro.put ("C",  new Double (2.60 - enegH));
J.quantum.NMRCalculation.deltaElectro.put ("O",  new Double (3.50 - enegH));
J.quantum.NMRCalculation.deltaElectro.put ("N",  new Double (3.05 - enegH));
J.quantum.NMRCalculation.deltaElectro.put ("F",  new Double (3.90 - enegH));
J.quantum.NMRCalculation.deltaElectro.put ("Cl",  new Double (3.15 - enegH));
J.quantum.NMRCalculation.deltaElectro.put ("Br",  new Double (2.95 - enegH));
J.quantum.NMRCalculation.deltaElectro.put ("I",  new Double (2.65 - enegH));
J.quantum.NMRCalculation.deltaElectro.put ("S",  new Double (2.58 - enegH));
J.quantum.NMRCalculation.deltaElectro.put ("Si",  new Double (1.90 - enegH));
}Clazz.defineStatics (c$,
"pAltona",  Clazz.newDoubleArray (5, 8, 0));
{
for (var nNonH = 0; nNonH < 5; nNonH++) {
var p = J.quantum.NMRCalculation.pAltona[nNonH];
switch (nNonH) {
case 0:
case 1:
case 2:
p[1] = 13.7;
p[2] = -0.73;
p[3] = 0;
p[4] = 0.56;
p[5] = -2.47;
p[6] = 16.9;
p[7] = 0.14;
break;
case 3:
p[1] = 13.22;
p[2] = -0.99;
p[3] = 0;
p[4] = 0.87;
p[5] = -2.46;
p[6] = 19.9;
p[7] = 0;
break;
case 4:
p[1] = 13.24;
p[2] = -0.91;
p[3] = 0;
p[4] = 0.53;
p[5] = -2.41;
p[6] = 15.5;
p[7] = 0.19;
break;
}
p[6] = p[6] * 3.141592653589793 / 180.0;
}
}Clazz.defineStatics (c$,
"JCH3_NONE", "none",
"JCH3_WASYLISHEN_SCHAEFER", "was",
"JCH3_TVAROSKA_TARAVEL", "tva",
"JCH3_AYDIN_GUETHER", "ayd");
});
