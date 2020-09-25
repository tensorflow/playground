Clazz.declarePackage ("J.shape");
Clazz.load (["J.api.JmolMeasurementClient", "J.shape.AtomShape", "JU.Lst"], "J.shape.Measures", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.PT", "$.SB", "JM.Measurement", "$.MeasurementData", "JU.BSUtil", "$.C", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bsSelected = null;
this.strFormat = null;
this.mustBeConnected = false;
this.mustNotBeConnected = false;
this.radiusData = null;
this.intramolecular = null;
this.measureAllModels = false;
this.measurementCount = 0;
this.measurements = null;
this.mPending = null;
this.colix = 0;
this.tickInfo = null;
this.defaultTickInfo = null;
this.htMin = null;
this.tokAction = 0;
Clazz.instantialize (this, arguments);
}, J.shape, "Measures", J.shape.AtomShape, J.api.JmolMeasurementClient);
Clazz.prepareFields (c$, function () {
this.measurements =  new JU.Lst ();
});
Clazz.overrideMethod (c$, "initModelSet", 
function () {
for (var i = this.measurements.size (); --i >= 0; ) {
var m = this.measurements.get (i);
if (m != null) m.ms = this.ms;
}
this.atoms = this.ms.at;
});
Clazz.overrideMethod (c$, "initShape", 
function () {
if (J.shape.Measures.font3d == null) J.shape.Measures.font3d = this.vwr.gdata.getFont3D (18);
});
Clazz.overrideMethod (c$, "setSize", 
function (size, bsSelected) {
this.mad = size;
}, "~N,JU.BS");
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bsIgnored) {
var mt;
if ("clearModelIndex" === propertyName) {
for (var i = 0; i < this.measurementCount; i++) this.measurements.get (i).setModelIndex (0);

return;
}if ("color" === propertyName) {
this.setColor (JU.C.getColixO (value));
return;
}if ("font" === propertyName) {
J.shape.Measures.font3d = value;
return;
}if ("hideAll" === propertyName) {
this.showHide ((value).booleanValue ());
return;
}if ("pending" === propertyName) {
this.mPending = value;
if (this.mPending == null) return;
if (this.mPending.count > 1) this.vwr.setStatusMeasuring ("measurePending", this.mPending.count, J.shape.Measures.getMessage (this.mPending, false), this.mPending.value);
return;
}var isRefresh;
if ((isRefresh = ("refresh" === propertyName)) || "refreshTrajectories" === propertyName) {
for (var i = this.measurements.size (); --i >= 0; ) if ((mt = this.measurements.get (i)) != null && (isRefresh || mt.isTrajectory)) mt.refresh (null);

return;
}if ("select" === propertyName) {
var bs = value;
if (JU.BSUtil.cardinalityOf (bs) == 0) {
this.bsSelected = null;
} else {
this.bsSelected =  new JU.BS ();
this.bsSelected.or (bs);
}return;
}if ("setFormats" === propertyName) {
this.setFormats (value);
return;
}this.measureAllModels = this.vwr.getBoolean (603979877);
if ("delete" === propertyName) {
this.deleteO (value);
this.setIndices ();
return;
}this.bsSelected = null;
if ("maps" === propertyName) {
var maps = value;
for (var i = 0; i < maps.length; i++) {
var len = maps[i].length;
if (len < 2 || len > 4) continue;
var v =  Clazz.newIntArray (len + 1, 0);
v[0] = len;
System.arraycopy (maps[i], 0, v, 1, len);
this.toggleOn (v);
}
} else if ("measure" === propertyName) {
var md = value;
this.tickInfo = md.tickInfo;
if (md.tickInfo != null && md.tickInfo.id.equals ("default")) {
this.defaultTickInfo = md.tickInfo;
return;
}if (md.isAll && md.points.size () == 2 && Clazz.instanceOf (md.points.get (0), JU.BS)) {
var type = JM.Measurement.nmrType (this.vwr.getDistanceUnits (md.strFormat));
switch (type) {
case 2:
md.htMin = this.vwr.getNMRCalculation ().getMinDistances (md);
}
}this.tickInfo = md.tickInfo;
this.radiusData = md.radiusData;
this.htMin = md.htMin;
this.mustBeConnected = md.mustBeConnected;
this.mustNotBeConnected = md.mustNotBeConnected;
this.intramolecular = md.intramolecular;
this.strFormat = md.strFormat;
if (md.isAll) {
if (this.tickInfo != null) this.define (md, 12291);
this.define (md, md.tokAction);
this.setIndices ();
return;
}var m = this.setSingleItem (md.points);
if (md.thisID != null) {
m.thisID = md.thisID;
m.mad = md.mad;
if (md.colix != 0) m.colix = md.colix;
m.strFormat = md.strFormat;
m.text = md.text;
}m.units = md.units;
m.property = md.property;
m.fixedValue = md.fixedValue;
switch (md.tokAction) {
case 266284:
this.doAction (md, md.thisID, 266284);
break;
case 12291:
this.defineAll (-2147483648, m, true, false, false);
this.setIndices ();
break;
case 1073742335:
this.showHideM (m, false);
break;
case 1073742334:
this.showHideM (m, true);
break;
case 1665140738:
if (md.thisID != null) this.doAction (md, md.thisID, 1665140738);
break;
case 12290:
if (md.thisID == null) {
this.deleteM (m);
} else {
this.deleteO (md.thisID);
}this.toggle (m);
break;
case 268435538:
this.toggle (m);
}
return;
}if ("clear" === propertyName) {
this.clear ();
return;
}if ("deleteModelAtoms" === propertyName) {
this.atoms = (value)[1];
var modelIndex = ((value)[2])[0];
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
var atomMax = firstAtomDeleted + nAtomsDeleted;
for (var i = this.measurementCount; --i >= 0; ) {
mt = this.measurements.get (i);
var indices = mt.countPlusIndices;
for (var j = 1; j <= indices[0]; j++) {
var iAtom = indices[j];
if (iAtom >= firstAtomDeleted) {
if (iAtom < atomMax) {
this.deleteI (i);
break;
}indices[j] -= nAtomsDeleted;
} else if (iAtom < 0) {
var pt = mt.getAtom (j);
if (pt.mi > modelIndex) {
pt.mi--;
} else if (pt.mi == modelIndex) {
this.deleteI (i);
break;
}}}
}
return;
}if ("reformatDistances" === propertyName) {
this.reformatDistances ();
return;
}if ("hide" === propertyName) {
if (Clazz.instanceOf (value, String)) {
this.doAction (null, value, 12294);
} else {
this.showHideM ( new JM.Measurement ().setPoints (this.ms, value, null, null), true);
}return;
}if ("refresh" === propertyName) {
this.doAction (value, null, 266284);
return;
}if ("show" === propertyName) {
if (Clazz.instanceOf (value, String)) {
this.doAction (null, value, 134222350);
} else {
this.showHideM ( new JM.Measurement ().setPoints (this.ms, value, null, null), false);
}return;
}if ("toggle" === propertyName) {
if (Clazz.instanceOf (value, String)) {
this.doAction (null, value, 268435538);
} else {
this.toggle ( new JM.Measurement ().setPoints (this.ms, value, null, null));
}return;
}if ("toggleOn" === propertyName) {
if (Clazz.instanceOf (value, String)) {
this.doAction (null, value, 1073742335);
} else {
this.toggleOn (value);
}return;
}}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "setSingleItem", 
 function (vector) {
var points =  new Array (4);
var indices =  Clazz.newIntArray (5, 0);
indices[0] = vector.size ();
for (var i = vector.size (); --i >= 0; ) {
var value = vector.get (i);
if (Clazz.instanceOf (value, JU.BS)) {
var atomIndex = (value).nextSetBit (0);
if (atomIndex < 0) return null;
indices[i + 1] = atomIndex;
} else {
points[i] = value;
indices[i + 1] = -2 - i;
}}
return  new JM.Measurement ().setPoints (this.ms, indices, points, this.tickInfo == null ? this.defaultTickInfo : this.tickInfo);
}, "JU.Lst");
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
if ("pending".equals (property)) return this.mPending;
if ("count".equals (property)) return Integer.$valueOf (this.measurementCount);
if ("countPlusIndices".equals (property)) return (index < this.measurementCount ? this.measurements.get (index).countPlusIndices : null);
if ("stringValue".equals (property)) return (index < this.measurementCount ? this.measurements.get (index).getString () : null);
if ("pointInfo".equals (property)) return this.measurements.get (Clazz.doubleToInt (index / 10)).getLabel (index % 10, false, false);
if ("info".equals (property)) return this.getAllInfo ();
if ("infostring".equals (property)) return this.getAllInfoAsString ();
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "clear", 
function () {
if (this.measurementCount == 0) return;
this.measurementCount = 0;
this.measurements.clear ();
this.mPending = null;
this.vwr.setStatusMeasuring ("measureDeleted", -1, "all", 0);
});
Clazz.defineMethod (c$, "setColor", 
 function (colix) {
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
if (this.bsSelected == null) this.colix = colix;
var mt;
for (var i = this.measurements.size (); --i >= 0; ) if ((mt = this.measurements.get (i)) != null && (this.bsSelected != null && this.bsSelected.get (i) || this.bsSelected == null && (colix == 0 || mt.colix == 0))) {
mt.colix = colix;
this.bsColixSet.set (i);
}
}, "~N");
Clazz.defineMethod (c$, "setFormats", 
 function (format) {
if (format != null && format.length == 0) format = null;
for (var i = this.measurements.size (); --i >= 0; ) if (this.bsSelected == null || this.bsSelected.get (i)) this.measurements.get (i).formatMeasurementAs (format, null, false);

}, "~S");
Clazz.defineMethod (c$, "showHide", 
 function (isHide) {
for (var i = this.measurements.size (); --i >= 0; ) if (this.bsSelected == null || this.bsSelected.get (i)) this.measurements.get (i).isHidden = isHide;

}, "~B");
Clazz.defineMethod (c$, "showHideM", 
 function (m, isHide) {
var i = this.find (m);
if (i >= 0) this.measurements.get (i).isHidden = isHide;
}, "JM.Measurement,~B");
Clazz.defineMethod (c$, "toggle", 
 function (m) {
this.radiusData = null;
this.htMin = null;
var i = this.find (m);
var mt;
if (i >= 0 && !(mt = this.measurements.get (i)).isHidden) this.defineAll (i, mt, true, false, false);
 else this.defineAll (-1, m, false, true, false);
this.setIndices ();
}, "JM.Measurement");
Clazz.defineMethod (c$, "toggleOn", 
 function (indices) {
this.radiusData = null;
this.htMin = null;
this.bsSelected =  new JU.BS ();
var m =  new JM.Measurement ().setPoints (this.ms, indices, null, this.defaultTickInfo);
this.defineAll (-2147483648, m, false, true, true);
var i = this.find (m);
if (i >= 0) this.bsSelected.set (i);
this.setIndices ();
this.reformatDistances ();
}, "~A");
Clazz.defineMethod (c$, "deleteM", 
 function (m) {
this.radiusData = null;
this.htMin = null;
var i = this.find (m);
if (i >= 0) this.defineAll (i, this.measurements.get (i), true, false, false);
this.setIndices ();
}, "JM.Measurement");
Clazz.defineMethod (c$, "deleteO", 
 function (value) {
if (Clazz.instanceOf (value, Integer)) {
this.deleteI ((value).intValue ());
} else if (Clazz.instanceOf (value, String)) {
this.doAction (null, value, 12291);
} else if (JU.AU.isAI (value)) {
this.defineAll (-2147483648,  new JM.Measurement ().setPoints (this.ms, value, null, null), true, false, false);
}}, "~O");
Clazz.defineMethod (c$, "defineAll", 
 function (iPt, m, isDelete, isShow, doSelect) {
if (!this.measureAllModels) {
if (isDelete) {
if (iPt == -2147483648) iPt = this.find (m);
if (iPt >= 0) this.deleteI (iPt);
return;
}this.defineMeasurement (iPt, m, doSelect);
return;
}if (isShow) {
this.defineAll (iPt, m, true, false, false);
if (isDelete) return;
}var points =  new JU.Lst ();
var nPoints = m.count;
for (var i = 1; i <= nPoints; i++) {
var atomIndex = m.getAtomIndex (i);
points.addLast (atomIndex >= 0 ? this.vwr.ms.getAtoms (1094715393, Integer.$valueOf (this.atoms[atomIndex].getAtomNumber ())) : m.getAtom (i));
}
this.define (( new JM.MeasurementData ().init (null, this.vwr, points)).set (this.tokAction, this.htMin, this.radiusData, m.property, this.strFormat, null, this.tickInfo, this.mustBeConnected, this.mustNotBeConnected, this.intramolecular, true, 0, 0, null, NaN), (isDelete ? 12291 : 12290));
}, "~N,JM.Measurement,~B,~B,~B");
Clazz.defineMethod (c$, "find", 
 function (m) {
return (m.thisID == null ? JM.Measurement.find (this.measurements, m) : -1);
}, "JM.Measurement");
Clazz.defineMethod (c$, "setIndices", 
 function () {
for (var i = 0; i < this.measurementCount; i++) this.measurements.get (i).index = i;

});
Clazz.defineMethod (c$, "define", 
 function (md, tokAction) {
this.tokAction = tokAction;
md.define (this, this.ms);
}, "JM.MeasurementData,~N");
Clazz.overrideMethod (c$, "processNextMeasure", 
function (m) {
var iThis = this.find (m);
if (iThis >= 0) {
if (this.tokAction == 12291) {
this.deleteI (iThis);
} else if (this.strFormat != null) {
this.measurements.get (iThis).formatMeasurementAs (this.strFormat, null, true);
} else {
this.measurements.get (iThis).isHidden = (this.tokAction == 1073742334);
}} else if (this.tokAction == 12290 || this.tokAction == 268435538) {
m.tickInfo = (this.tickInfo == null ? this.defaultTickInfo : this.tickInfo);
this.defineMeasurement (-1, m, true);
}}, "JM.Measurement");
Clazz.defineMethod (c$, "defineMeasurement", 
 function (i, m, doSelect) {
var value = m.getMeasurement (null);
if (this.htMin != null && !m.isMin (this.htMin) || this.radiusData != null && !m.isInRange (this.radiusData, value)) return;
if (i == -2147483648) i = this.find (m);
if (i >= 0) {
this.measurements.get (i).isHidden = false;
if (doSelect) this.bsSelected.set (i);
return;
}var measureNew =  new JM.Measurement ().setM (this.ms, m, value, (m.colix == 0 ? this.colix : m.colix), this.strFormat, this.measurementCount);
if (!measureNew.$isValid) return;
this.measurements.addLast (measureNew);
this.vwr.setStatusMeasuring ("measureCompleted", this.measurementCount++, J.shape.Measures.getMessage (measureNew, false), measureNew.value);
}, "~N,JM.Measurement,~B");
c$.getMessage = Clazz.defineMethod (c$, "getMessage", 
 function (m, asBitSet) {
var sb =  new JU.SB ();
sb.append ("[");
for (var i = 1; i <= m.count; i++) {
if (i > 1) sb.append (", ");
sb.append (m.getLabel (i, asBitSet, false));
}
sb.append (", ");
sb.append (m.getString ());
sb.append ("]");
return sb.toString ();
}, "JM.Measurement,~B");
Clazz.defineMethod (c$, "deleteI", 
 function (i) {
if (i >= this.measurements.size () || i < 0) return;
var msg = J.shape.Measures.getMessage (this.measurements.get (i), true);
this.measurements.removeItemAt (i);
this.measurementCount--;
this.vwr.setStatusMeasuring ("measureDeleted", i, msg, 0);
}, "~N");
Clazz.defineMethod (c$, "doAction", 
 function (md, id, tok) {
id = id.toUpperCase ().$replace ('?', '*');
var isWild = JU.PT.isWild (id);
for (var i = this.measurements.size (); --i >= 0; ) {
var m = this.measurements.get (i);
if (m.thisID != null && (m.thisID.equalsIgnoreCase (id) || isWild && JU.PT.isMatch (m.thisID.toUpperCase (), id, true, true))) switch (tok) {
case 266284:
if (md.colix != 0) m.colix = md.colix;
if (md.mad != 0) m.mad = md.mad;
if (md.strFormat != null) {
m.strFormat = m.strFormat.substring (0, 2) + md.strFormat.substring (2);
}if (md.text != null) {
if (m.text == null) {
m.text = md.text;
} else {
if (md.text.font != null) m.text.font = md.text.font;
m.text.text = null;
if (md.text.align != 0) m.text.align = md.text.align;
if (md.colix != 0) m.labelColix = m.text.colix = md.text.colix;
}}m.formatMeasurement (null);
break;
case 1665140738:
m.mad = md.mad;
break;
case 12291:
var msg = J.shape.Measures.getMessage (this.measurements.get (i), true);
this.measurements.removeItemAt (i);
this.measurementCount--;
this.vwr.setStatusMeasuring ("measureDeleted", i, msg, 0);
break;
case 134222350:
m.isHidden = false;
break;
case 12294:
m.isHidden = true;
break;
case 268435538:
m.isHidden = !m.isHidden;
break;
case 1073742335:
m.isHidden = false;
break;
}
}
}, "JM.MeasurementData,~S,~N");
Clazz.defineMethod (c$, "reformatDistances", 
 function () {
for (var i = this.measurementCount; --i >= 0; ) this.measurements.get (i).reformatDistanceIfSelected ();

});
Clazz.defineMethod (c$, "getAllInfo", 
 function () {
var info =  new JU.Lst ();
for (var i = 0; i < this.measurementCount; i++) {
info.addLast (this.getInfo (i));
}
return info;
});
Clazz.defineMethod (c$, "getAllInfoAsString", 
 function () {
var info = "Measurement Information";
for (var i = 0; i < this.measurementCount; i++) {
info += "\n" + this.getInfoAsString (i);
}
return info;
});
Clazz.defineMethod (c$, "getInfo", 
 function (index) {
var m = this.measurements.get (index);
var count = m.count;
var info =  new java.util.Hashtable ();
info.put ("index", Integer.$valueOf (index));
info.put ("type", (count == 2 ? "distance" : count == 3 ? "angle" : "dihedral"));
info.put ("strMeasurement", m.getString ());
info.put ("count", Integer.$valueOf (count));
info.put ("id", "" + m.thisID);
info.put ("value", Float.$valueOf (m.value));
info.put ("hidden", Boolean.$valueOf (m.isHidden));
info.put ("visible", Boolean.$valueOf (m.isVisible));
var tickInfo = m.tickInfo;
if (tickInfo != null) {
info.put ("ticks", tickInfo.ticks);
if (tickInfo.scale != null) info.put ("tickScale", tickInfo.scale);
if (tickInfo.tickLabelFormats != null) info.put ("tickLabelFormats", tickInfo.tickLabelFormats);
if (!Float.isNaN (tickInfo.first)) info.put ("tickStart", Float.$valueOf (tickInfo.first));
}var atomsInfo =  new JU.Lst ();
for (var i = 1; i <= count; i++) {
var atomInfo =  new java.util.Hashtable ();
var atomIndex = m.getAtomIndex (i);
atomInfo.put ("_ipt", Integer.$valueOf (atomIndex));
atomInfo.put ("coord", JU.Escape.eP (m.getAtom (i)));
atomInfo.put ("atomno", Integer.$valueOf (atomIndex < 0 ? -1 : this.atoms[atomIndex].getAtomNumber ()));
atomInfo.put ("info", (atomIndex < 0 ? "<point>" : this.atoms[atomIndex].getInfo ()));
atomsInfo.addLast (atomInfo);
}
info.put ("atoms", atomsInfo);
return info;
}, "~N");
Clazz.overrideMethod (c$, "getInfoAsString", 
function (index) {
return this.measurements.get (index).getInfoAsString (null);
}, "~N");
Clazz.defineMethod (c$, "setVisibilityInfo", 
function () {
var bsModels = this.vwr.getVisibleFramesBitSet ();
out : for (var i = this.measurementCount; --i >= 0; ) {
var m = this.measurements.get (i);
m.isVisible = false;
if (this.mad == 0 || m.isHidden) continue;
for (var iAtom = m.count; iAtom > 0; iAtom--) {
var atomIndex = m.getAtomIndex (iAtom);
if (atomIndex >= 0) {
if (!this.ms.at[atomIndex].isClickable ()) continue out;
} else {
var modelIndex = m.getAtom (iAtom).mi;
if (modelIndex >= 0 && !bsModels.get (modelIndex)) continue out;
}}
m.isVisible = true;
}
});
Clazz.defineStatics (c$,
"font3d", null);
});
