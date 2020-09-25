Clazz.declarePackage ("JM");
Clazz.load (null, "JM.Measurement", ["java.lang.Float", "JU.Measure", "$.PT", "$.SB", "J.atomdata.RadiusData", "J.c.VDW", "JM.LabelToken", "JU.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.thisID = null;
this.ms = null;
this.index = 0;
this.isVisible = true;
this.isHidden = false;
this.isTrajectory = false;
this.$isValid = true;
this.colix = 0;
this.labelColix = -1;
this.mad = 0;
this.tickInfo = null;
this.traceX = -2147483648;
this.traceY = 0;
this.count = 0;
this.countPlusIndices = null;
this.pts = null;
this.value = 0;
this.strFormat = null;
this.property = null;
this.units = null;
this.text = null;
this.vwr = null;
this.strMeasurement = null;
this.type = null;
this.tainted = false;
this.renderAxis = null;
this.renderArc = null;
this.newUnits = null;
this.fixedValue = NaN;
this.isPending = false;
Clazz.instantialize (this, arguments);
}, JM, "Measurement");
Clazz.prepareFields (c$, function () {
this.countPlusIndices =  Clazz.newIntArray (5, 0);
});
Clazz.defineMethod (c$, "isTainted", 
function () {
return (this.tainted && !(this.tainted = false));
});
Clazz.defineMethod (c$, "setM", 
function (modelSet, m, value, colix, strFormat, index) {
this.ms = modelSet;
this.index = index;
this.vwr = modelSet.vwr;
this.colix = colix;
this.strFormat = strFormat;
if (m != null) {
this.tickInfo = m.tickInfo;
this.pts = m.pts;
this.mad = m.mad;
this.thisID = m.thisID;
this.text = m.text;
this.property = m.property;
this.units = m.units;
if (this.property == null && "+hz".equals (this.units)) {
this.property = "property_J";
}if (this.thisID != null && this.text != null) this.labelColix = this.text.colix;
}if (this.pts == null) this.pts =  new Array (4);
var indices = (m == null ? null : m.countPlusIndices);
this.count = (indices == null ? 0 : indices[0]);
if (this.count > 0) {
System.arraycopy (indices, 0, this.countPlusIndices, 0, this.count + 1);
this.isTrajectory = modelSet.isTrajectoryMeasurement (this.countPlusIndices);
}this.isPending = Float.isNaN (value);
this.value = (this.isPending || this.isTrajectory ? this.getMeasurement (null) : value);
this.formatMeasurement (null);
return this;
}, "JM.ModelSet,JM.Measurement,~N,~N,~S,~N");
Clazz.defineMethod (c$, "setPoints", 
function (modelSet, indices, points, tickInfo) {
this.ms = modelSet;
this.countPlusIndices = indices;
this.count = indices[0];
this.pts = (points == null ?  new Array (4) : points);
this.vwr = modelSet.vwr;
this.tickInfo = tickInfo;
return this;
}, "JM.ModelSet,~A,~A,JM.TickInfo");
Clazz.defineMethod (c$, "setCount", 
function (count) {
this.setCountM (count);
}, "~N");
Clazz.defineMethod (c$, "setCountM", 
function (count) {
this.count = this.countPlusIndices[0] = count;
}, "~N");
Clazz.defineMethod (c$, "getAtomIndex", 
function (n) {
return (n > 0 && n <= this.count ? this.countPlusIndices[n] : -1);
}, "~N");
Clazz.defineMethod (c$, "getAtom", 
function (n) {
var pt = this.countPlusIndices[n];
return (pt < -1 ? this.pts[-2 - pt] : this.ms.at[pt]);
}, "~N");
Clazz.defineMethod (c$, "getLastIndex", 
function () {
return (this.count > 0 ? this.countPlusIndices[this.count] : -1);
});
Clazz.defineMethod (c$, "getString", 
function () {
return this.strMeasurement;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getString ();
});
Clazz.defineMethod (c$, "getStringUsing", 
function (vwr, strFormat, units) {
this.vwr = vwr;
this.value = this.getMeasurement (null);
this.formatMeasurementAs (strFormat, units, true);
if (strFormat == null) return this.getInfoAsString (units);
return this.strMeasurement;
}, "JV.Viewer,~S,~S");
Clazz.defineMethod (c$, "getStringDetail", 
function () {
return (this.count == 2 ? "Distance" : this.count == 3 ? "Angle" : "Torsion") + this.getMeasurementScript (" - ", false) + " : " + this.value;
});
Clazz.defineMethod (c$, "refresh", 
function (pts) {
this.value = this.getMeasurement (pts);
this.isTrajectory = this.ms.isTrajectoryMeasurement (this.countPlusIndices);
this.formatMeasurement (null);
}, "~A");
Clazz.defineMethod (c$, "getMeasurementScript", 
function (sep, withModelIndex) {
var sb =  new JU.SB ();
var asBitSet = (sep.equals (" "));
for (var i = 1; i <= this.count; i++) sb.append (i > 1 ? sep : " ").append (this.getLabel (i, asBitSet, withModelIndex));

return sb.toString ();
}, "~S,~B");
Clazz.defineMethod (c$, "formatMeasurementAs", 
function (strFormat, units, useDefault) {
if (strFormat != null && strFormat.length == 0) strFormat = null;
if (!useDefault && strFormat != null && strFormat.indexOf (this.countPlusIndices[0] + ":") != 0) return;
this.strFormat = strFormat;
this.formatMeasurement (units);
}, "~S,~S,~B");
Clazz.defineMethod (c$, "formatMeasurement", 
function (units) {
this.tainted = true;
switch (Float.isNaN (this.value) ? 0 : this.count) {
default:
this.strMeasurement = null;
return;
case 2:
this.strMeasurement = this.formatDistance (units);
return;
case 3:
case 4:
this.strMeasurement = this.formatAngle (this.value);
return;
}
}, "~S");
Clazz.defineMethod (c$, "reformatDistanceIfSelected", 
function () {
if (this.count != 2) return;
if (this.vwr.slm.isSelected (this.countPlusIndices[1]) && this.vwr.slm.isSelected (this.countPlusIndices[2])) this.formatMeasurement (null);
});
Clazz.defineMethod (c$, "formatDistance", 
 function (units) {
var label = this.getLabelString ();
if (label == null) return "";
var pt = this.strFormat.indexOf ("//");
if (units == null) {
units = this.units;
if (units == null) {
if (pt >= 0) {
units = this.strFormat.substring (pt + 2);
this.strFormat = this.strFormat.substring (0, pt);
} else {
units = (this.property == null ? this.vwr.g.measureDistanceUnits : "");
}}} else if (pt >= 0) {
this.strFormat = this.strFormat.substring (0, pt);
}this.strFormat += "//" + units;
units = JM.Measurement.fixUnits (units);
pt = label.indexOf ("//");
if (pt >= 0) {
label = label.substring (0, pt);
if (label.length == 0) label = "%VALUE";
}var f = this.fixValue (units, (label.indexOf ("%V") >= 0));
return this.formatString (f, this.newUnits, label);
}, "~S");
c$.fixUnits = Clazz.defineMethod (c$, "fixUnits", 
 function (units) {
if (units.equals ("nanometers")) return "nm";
 else if (units.equals ("picometers")) return "pm";
 else if (units.equals ("angstroms")) return "\u00C5";
 else if (units.equals ("vanderwaals") || units.equals ("vdw")) return "%";
return units;
}, "~S");
Clazz.defineMethod (c$, "fixValue", 
function (units, andRound) {
this.checkJ (units);
if (units != null && units.startsWith ("+")) {
if (!this.isPending) this.value = Math.abs (this.value);
units = units.substring (1);
}this.newUnits = units;
if (this.count != 2) return this.value;
var dist = this.value;
if (units == null && this.property != null) units = "";
if (units != null) {
var isPercent = units.equals ("%");
if (this.property == null && (isPercent || units.endsWith ("hz"))) {
var i1 = this.getAtomIndex (1);
var i2 = this.getAtomIndex (2);
if (i1 >= 0 && i2 >= 0) {
var a1 = this.getAtom (1);
var a2 = this.getAtom (2);
var itype = JM.Measurement.nmrType (units);
var isDC = (!isPercent && itype == 1);
this.type = (isPercent ? "percent" : isDC ? "dipoleCouplingConstant" : itype == 3 ? "NOE or 3JHH" : "J-CouplingConstant");
if (itype == 3) {
var result = this.vwr.getNMRCalculation ().getNOEorJHH ( Clazz.newArray (-1, [a1, null, null, a2]), 11);
if (result == null) {
dist = NaN;
this.newUnits = units = "";
} else {
dist = result[1];
units = this.newUnits = (result.length == 2 ? "noe" : "hz");
}} else {
dist = (isPercent ? dist / (a1.getVanderwaalsRadiusFloat (this.vwr, J.c.VDW.AUTO) + a2.getVanderwaalsRadiusFloat (this.vwr, J.c.VDW.AUTO)) : isDC ? this.vwr.getNMRCalculation ().getDipolarConstantHz (a1, a2) : this.vwr.getNMRCalculation ().getIsoOrAnisoHz (true, a1, a2, units, null));
}this.$isValid = !Float.isNaN (dist);
if (isPercent) units = "pm";
}}if (Float.isNaN (dist)) return NaN;
if (units.equals ("hz")) return (andRound ? Math.round (dist * 10) / 10 : dist);
if (units.equals ("noe")) return (andRound ? Math.round (dist * 100) / 100 : dist);
if (units.equals ("nm")) return (andRound ? Math.round (dist * 100) / 1000 : dist / 10);
if (units.equals ("pm")) return (andRound ? Math.round (dist * 1000) / 10 : dist * 100);
if (units.equals ("au")) return (andRound ? Math.round (dist / 0.5291772 * 1000) / 1000 : dist / 0.5291772);
if (units.endsWith ("khz")) return (andRound ? Math.round (dist / 10) / 100 : dist / 1000);
}return (andRound ? Math.round (dist * 100) / 100 : dist);
}, "~S,~B");
Clazz.defineMethod (c$, "checkJ", 
 function (units) {
if (this.property != null || units != null || this.units != null) return;
units = this.vwr.g.measureDistanceUnits;
if ("+hz".equals (units)) {
this.property = "property_J";
this.units = units;
}}, "~S");
c$.nmrType = Clazz.defineMethod (c$, "nmrType", 
function (units) {
return (units.indexOf ("hz") < 0 ? 0 : units.equals ("noe_hz") ? 3 : units.startsWith ("dc_") || units.equals ("khz") ? 1 : 2);
}, "~S");
Clazz.defineMethod (c$, "formatAngle", 
 function (angle) {
var label = this.getLabelString ();
if (label.indexOf ("%V") >= 0) angle = Math.round (angle * 10) / 10;
return this.formatString (angle, "\u00B0", label);
}, "~N");
Clazz.defineMethod (c$, "getLabelString", 
 function () {
var s = this.countPlusIndices[0] + ":";
var label = null;
if (this.strFormat != null) {
if (this.strFormat.length == 0) return null;
label = (this.strFormat.length > 2 && this.strFormat.indexOf (s) == 0 ? this.strFormat : null);
}if (label == null) {
this.strFormat = null;
label = this.vwr.getDefaultMeasurementLabel (this.countPlusIndices[0]);
}if (label.indexOf (s) == 0) label = label.substring (2);
if (this.strFormat == null) this.strFormat = s + label;
return label;
});
Clazz.defineMethod (c$, "formatString", 
 function (value, units, label) {
return JM.LabelToken.formatLabelMeasure (this.vwr, this, label, value, units);
}, "~N,~S,~S");
Clazz.defineMethod (c$, "sameAsPoints", 
function (indices, points) {
if (this.count != indices[0]) return false;
var isSame = true;
for (var i = 1; i <= this.count && isSame; i++) isSame = (this.countPlusIndices[i] == indices[i]);

if (isSame) for (var i = 0; i < this.count && isSame; i++) {
if (points[i] != null) isSame = (this.pts[i].distance (points[i]) < 0.01);
}
if (isSame) return true;
switch (this.count) {
default:
return true;
case 2:
return this.sameAsIJ (indices, points, 1, 2) && this.sameAsIJ (indices, points, 2, 1);
case 3:
return this.sameAsIJ (indices, points, 1, 3) && this.sameAsIJ (indices, points, 2, 2) && this.sameAsIJ (indices, points, 3, 1);
case 4:
return this.sameAsIJ (indices, points, 1, 4) && this.sameAsIJ (indices, points, 2, 3) && this.sameAsIJ (indices, points, 3, 2) && this.sameAsIJ (indices, points, 4, 1);
}
}, "~A,~A");
Clazz.defineMethod (c$, "sameAsIJ", 
 function (atoms, points, i, j) {
var ipt = this.countPlusIndices[i];
var jpt = atoms[j];
return (ipt >= 0 || jpt >= 0 ? ipt == jpt : this.pts[-2 - ipt].distance (points[-2 - jpt]) < 0.01);
}, "~A,~A,~N,~N");
Clazz.defineMethod (c$, "sameAs", 
function (i, j) {
return this.sameAsIJ (this.countPlusIndices, this.pts, i, j);
}, "~N,~N");
Clazz.defineMethod (c$, "getPropMeasurement", 
function (pts) {
if (this.countPlusIndices == null || this.count != 2) return NaN;
for (var i = this.count; --i >= 0; ) if (this.countPlusIndices[i + 1] < 0) {
return NaN;
}
try {
var ptA = (pts == null ? this.getAtom (1) : pts[0]);
var ptB = (pts == null ? this.getAtom (2) : pts[1]);
var props = this.vwr.getDataObj (this.property, null, 2);
var ia = ptA.i;
var ib = ptB.i;
return (props == null || ib >= props.length || ia >= props.length ? NaN : props[ia][ib]);
} catch (t) {
return NaN;
}
}, "~A");
Clazz.defineMethod (c$, "getMeasurement", 
function (pts) {
this.checkJ (null);
if (!Float.isNaN (this.fixedValue)) return this.fixedValue;
if (this.property != null) return this.getPropMeasurement (pts);
if (this.countPlusIndices == null) return NaN;
if (this.count < 2) return NaN;
for (var i = this.count; --i >= 0; ) if (this.countPlusIndices[i + 1] == -1) {
return NaN;
}
var ptA = (pts == null ? this.getAtom (1) : pts[0]);
var ptB = (pts == null ? this.getAtom (2) : pts[1]);
var ptC;
switch (this.count) {
case 2:
return ptA.distance (ptB);
case 3:
ptC = (pts == null ? this.getAtom (3) : pts[2]);
return JU.Measure.computeAngleABC (ptA, ptB, ptC, true);
case 4:
ptC = (pts == null ? this.getAtom (3) : pts[2]);
var ptD = (pts == null ? this.getAtom (4) : pts[3]);
return JU.Measure.computeTorsion (ptA, ptB, ptC, ptD, true);
default:
return NaN;
}
}, "~A");
Clazz.defineMethod (c$, "getLabel", 
function (i, asBitSet, withModelIndex) {
var atomIndex = this.countPlusIndices[i];
return (atomIndex < 0 ? (withModelIndex ? "modelIndex " + this.getAtom (i).mi + " " : "") + JU.Escape.eP (this.getAtom (i)) : asBitSet ? "({" + atomIndex + "})" : this.vwr.getAtomInfo (atomIndex));
}, "~N,~B,~B");
Clazz.defineMethod (c$, "setModelIndex", 
function (modelIndex) {
if (this.pts == null) return;
for (var i = 0; i < this.count; i++) {
if (this.pts[i] != null) this.pts[i].mi = modelIndex;
}
}, "~N");
Clazz.defineMethod (c$, "isValid", 
function () {
return !(this.sameAs (1, 2) || this.count > 2 && this.sameAs (1, 3) || this.count == 4 && this.sameAs (2, 4));
});
c$.find = Clazz.defineMethod (c$, "find", 
function (measurements, m) {
var indices = m.countPlusIndices;
var points = m.pts;
for (var i = measurements.size (); --i >= 0; ) if (measurements.get (i).sameAsPoints (indices, points)) return i;

return -1;
}, "JU.Lst,JM.Measurement");
Clazz.defineMethod (c$, "isConnected", 
function (atoms, count) {
var atomIndexLast = -1;
for (var i = 1; i <= count; i++) {
var atomIndex = this.getAtomIndex (i);
if (atomIndex < 0) continue;
if (atomIndexLast >= 0 && !atoms[atomIndex].isBonded (atoms[atomIndexLast])) return false;
atomIndexLast = atomIndex;
}
return true;
}, "~A,~N");
Clazz.defineMethod (c$, "getInfoAsString", 
function (units) {
var f = this.fixValue (units, true);
var sb =  new JU.SB ();
sb.append (this.count == 2 ? (this.property != null ? this.property : this.type == null ? "distance" : this.type) : this.count == 3 ? "angle" : "dihedral");
sb.append (" \t").appendF (f);
sb.append (" \t").append (JU.PT.esc (this.strMeasurement));
for (var i = 1; i <= this.count; i++) sb.append (" \t").append (this.getLabel (i, false, false));

if (this.thisID != null) sb.append (" \t").append (this.thisID);
return sb.toString ();
}, "~S");
Clazz.defineMethod (c$, "isInRange", 
function (radiusData, value) {
if (radiusData.factorType === J.atomdata.RadiusData.EnumType.FACTOR) {
var atom1 = this.getAtom (1);
var atom2 = this.getAtom (2);
var d = (atom1.getVanderwaalsRadiusFloat (this.vwr, radiusData.vdwType) + atom2.getVanderwaalsRadiusFloat (this.vwr, radiusData.vdwType)) * radiusData.value;
return (value <= d);
}return (radiusData.values[0] == 3.4028235E38 || value >= radiusData.values[0] && value <= radiusData.values[1]);
}, "J.atomdata.RadiusData,~N");
Clazz.defineMethod (c$, "isIntramolecular", 
function (atoms, count) {
var molecule = -1;
for (var i = 1; i <= count; i++) {
var atomIndex = this.getAtomIndex (i);
if (atomIndex < 0) continue;
var m = atoms[atomIndex].getMoleculeNumber (false);
if (molecule < 0) molecule = m;
 else if (m != molecule) return false;
}
return true;
}, "~A,~N");
Clazz.defineMethod (c$, "isMin", 
function (htMin) {
var a1 = this.getAtom (1);
var a2 = this.getAtom (2);
var d = Clazz.floatToInt (a2.distanceSquared (a1) * 100);
var n1 = a1.getAtomName ();
var n2 = a2.getAtomName ();
var key = (n1.compareTo (n2) < 0 ? n1 + n2 : n2 + n1);
var min = htMin.get (key);
return (min != null && d == min.intValue ());
}, "java.util.Map");
c$.isUnits = Clazz.defineMethod (c$, "isUnits", 
function (s) {
return (JU.PT.isOneOf ((s.startsWith ("+") ? s.substring (1) : s).toLowerCase (), ";nm;nanometers;pm;picometers;angstroms;angstroms;ang;\u00C5;au;vanderwaals;vdw;%;noe;") || s.indexOf (" ") < 0 && s.endsWith ("hz"));
}, "~S");
Clazz.defineStatics (c$,
"NMR_NOT", 0,
"NMR_DC", 1,
"NMR_JC", 2,
"NMR_NOE_OR_J", 3);
});
