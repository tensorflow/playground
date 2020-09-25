Clazz.declarePackage ("J.shapespecial");
Clazz.load (["J.shape.AtomShape", "java.util.Hashtable", "JU.P3i"], "J.shapespecial.Ellipsoids", ["java.lang.Float", "JU.BS", "$.Lst", "$.PT", "$.SB", "$.V3", "J.api.Interface", "J.c.PAL", "J.shapespecial.Ellipsoid", "JU.BSUtil", "$.C", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ptXY = null;
this.simpleEllipsoids = null;
this.atomEllipsoids = null;
this.typeSelected = "1";
this.selectedAtoms = null;
this.ellipsoidSet = null;
this.scale = 0;
Clazz.instantialize (this, arguments);
}, J.shapespecial, "Ellipsoids", J.shape.AtomShape);
Clazz.prepareFields (c$, function () {
this.ptXY =  new JU.P3i ();
this.simpleEllipsoids =  new java.util.Hashtable ();
this.atomEllipsoids =  new java.util.Hashtable ();
});
Clazz.overrideMethod (c$, "checkObjectHovered", 
function (x, y, bsModels) {
if (!this.vwr.getDrawHover () || this.simpleEllipsoids == null || this.simpleEllipsoids.isEmpty ()) return false;
var e = this.findPickedObject (x, y, false, bsModels);
if (e == null) return false;
if (this.vwr.gdata.antialiasEnabled) {
x <<= 1;
y <<= 1;
}this.vwr.hoverOnPt (x, y, e.label, e.id, e.center);
return true;
}, "~N,~N,JU.BS");
Clazz.overrideMethod (c$, "checkObjectClicked", 
function (x, y, action, bsModels, drawPicking) {
if (action == 0 || !drawPicking || this.simpleEllipsoids == null || this.simpleEllipsoids.isEmpty ()) return null;
var e = this.findPickedObject (x, y, false, bsModels);
if (e == null) return null;
var map = null;
map =  new java.util.Hashtable ();
map.put ("id", e.id);
if (e.label != null) map.put ("label", e.label);
map.put ("pt", e.center);
map.put ("modelIndex", Integer.$valueOf (e.modelIndex));
map.put ("model", this.vwr.getModelNumberDotted (e.modelIndex));
map.put ("type", "ellipsoid");
if (action != 0) this.vwr.setStatusAtomPicked (-2, "[\"ellipsoid\"," + JU.PT.esc (e.id) + "," + +e.modelIndex + ",1," + e.center.x + "," + e.center.y + "," + e.center.z + "," + (e.label == null ? "\"\"" : JU.PT.esc (e.label)) + "]", map, false);
return map;
}, "~N,~N,~N,JU.BS,~B");
Clazz.defineMethod (c$, "findPickedObject", 
 function (x, y, isPicking, bsModels) {
var dmin2 = 100;
if (this.vwr.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
dmin2 <<= 1;
}var picked = null;
for (var id, $id = this.simpleEllipsoids.keySet ().iterator (); $id.hasNext () && ((id = $id.next ()) || true);) {
var e = this.simpleEllipsoids.get (id);
if (!e.visible || !bsModels.get (e.modelIndex)) continue;
var d2 = this.coordinateInRange (x, y, e.center, dmin2, this.ptXY);
if (d2 >= 0) {
dmin2 = d2;
picked = e;
}}
return picked;
}, "~N,~N,~B,JU.BS");
Clazz.defineMethod (c$, "isActive", 
function () {
return !this.atomEllipsoids.isEmpty () || !this.simpleEllipsoids.isEmpty ();
});
Clazz.overrideMethod (c$, "getIndexFromName", 
function (thisID) {
return (this.checkID (thisID) ? 1 : -1);
}, "~S");
Clazz.overrideMethod (c$, "setSize", 
function (size, bsSelected) {
if (this.atoms == null || size == 0 && this.ms.atomTensors == null) return;
var isAll = (bsSelected == null);
if (!isAll && this.selectedAtoms != null) bsSelected = this.selectedAtoms;
var tensors = this.vwr.ms.getAllAtomTensors (this.typeSelected);
if (tensors == null) return;
for (var i = tensors.size (); --i >= 0; ) {
var t = tensors.get (i);
if (isAll || t.isSelected (bsSelected, -1)) {
var e = this.atomEllipsoids.get (t);
var isNew = (size != 0 && e == null);
if (isNew) this.atomEllipsoids.put (t, e = J.shapespecial.Ellipsoid.getEllipsoidForAtomTensor (t, this.atoms[t.atomIndex1]));
if (e != null) {
e.setScale (size, true);
}}}
}, "~N,JU.BS");
Clazz.overrideMethod (c$, "getPropertyData", 
function (property, data) {
if (property === "checkID") {
return (this.checkID (data[0]));
}return this.getPropShape (property, data);
}, "~S,~A");
Clazz.defineMethod (c$, "checkID", 
 function (thisID) {
this.ellipsoidSet =  new JU.Lst ();
if (thisID == null) return false;
thisID = thisID.toLowerCase ();
if (JU.PT.isWild (thisID)) {
for (var e, $e = this.simpleEllipsoids.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var key = e.getKey ().toLowerCase ();
if (JU.PT.isMatch (key, thisID, true, true)) this.ellipsoidSet.addLast (e.getValue ());
}
}var e = this.simpleEllipsoids.get (thisID);
if (e != null) this.ellipsoidSet.addLast (e);
return (this.ellipsoidSet.size () > 0);
}, "~S");
Clazz.defineMethod (c$, "initEllipsoids", 
 function (value) {
var haveID = (value != null);
this.checkID (value);
if (haveID) this.typeSelected = null;
this.selectedAtoms = null;
return haveID;
}, "~O");
Clazz.overrideMethod (c$, "initShape", 
function () {
this.setProperty ("thisID", null, null);
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if (propertyName === "thisID") {
this.scale = NaN;
if (this.initEllipsoids (value) && this.ellipsoidSet.size () == 0) {
var id = value;
var e = J.shapespecial.Ellipsoid.getEmptyEllipsoid (id, this.vwr.am.cmi);
this.ellipsoidSet.addLast (e);
this.simpleEllipsoids.put (id, e);
}return;
}if ("atoms" === propertyName) {
this.selectedAtoms = value;
return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
var e = this.simpleEllipsoids.values ().iterator ();
while (e.hasNext ()) if (e.next ().tensor.modelIndex == modelIndex) e.remove ();

e = this.atomEllipsoids.values ().iterator ();
while (e.hasNext ()) if (e.next ().modelIndex == modelIndex) e.remove ();

this.ellipsoidSet.clear ();
return;
}var mode = "ax ce co de eq mo on op sc tr la".indexOf ((propertyName + "  ").substring (0, 2));
if (this.ellipsoidSet.size () > 0) {
if ("translucentLevel" === propertyName) {
this.setPropS (propertyName, value, bs);
return;
}if (mode >= 0) for (var i = this.ellipsoidSet.size (); --i >= 0; ) this.setProp (this.ellipsoidSet.get (i), Clazz.doubleToInt (mode / 3), value);

return;
}if ("color" === propertyName) {
var colix = JU.C.getColixO (value);
var pid = J.c.PAL.pidOf (value);
if (this.selectedAtoms != null) bs = this.selectedAtoms;
for (var e, $e = this.atomEllipsoids.values ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e.tensor.type.equals (this.typeSelected) && e.tensor.isSelected (bs, -1)) {
e.colix = this.getColixI (colix, pid, e.tensor.atomIndex1);
e.pid = pid;
}
return;
}if ("on" === propertyName) {
var isOn = (value).booleanValue ();
if (this.selectedAtoms != null) bs = this.selectedAtoms;
if (isOn) {
this.setSize (Float.isNaN (this.scale) ? 2147483647 : Clazz.floatToInt (this.scale * 100), bs);
}for (var e, $e = this.atomEllipsoids.values ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var t = e.tensor;
if ((t.type.equals (this.typeSelected) || this.typeSelected.equals (t.altType)) && t.isSelected (bs, -1)) {
e.isOn = isOn;
}(e.center).setShapeVisibility (this.vf, isOn);
}
return;
}if ("options" === propertyName) {
var options = (value).toLowerCase ().trim ();
if (options.length == 0) options = null;
if (this.selectedAtoms != null) bs = this.selectedAtoms;
if (options != null) this.setSize (2147483647, bs);
for (var e, $e = this.atomEllipsoids.values ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e.tensor.type.equals (this.typeSelected) && e.tensor.isSelected (bs, -1)) e.options = options;

return;
}if ("params" === propertyName) {
var data = value;
data[2] = null;
this.typeSelected = "0";
this.setSize (50, bs);
}if ("points" === propertyName) {
return;
}if ("scale" === propertyName) {
this.scale = (value).floatValue ();
this.setSize (Clazz.floatToInt (this.scale * 100), bs);
return;
}if ("select" === propertyName) {
this.typeSelected = (value).toLowerCase ();
return;
}if ("translucency" === propertyName) {
var isTranslucent = (value.equals ("translucent"));
for (var e, $e = this.atomEllipsoids.values ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e.tensor.type.equals (this.typeSelected) && e.tensor.isSelected (bs, -1)) e.colix = JU.C.getColixTranslucent3 (e.colix, isTranslucent, this.translucentLevel);

return;
}this.setPropS (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "setProp", 
 function (e, mode, value) {
switch (mode) {
case 0:
e.setTensor ((J.api.Interface.getUtil ("Tensor", this.vwr, "script")).setFromAxes (value));
break;
case 1:
e.setCenter (value);
break;
case 2:
e.colix = JU.C.getColixO (value);
break;
case 3:
this.simpleEllipsoids.remove (e.id);
break;
case 4:
e.setTensor ((J.api.Interface.getUtil ("Tensor", this.vwr, "script")).setFromThermalEquation (value, null));
e.tensor.modelIndex = e.modelIndex;
break;
case 5:
e.modelIndex = (value).intValue ();
if (e.tensor != null) e.tensor.modelIndex = e.modelIndex;
break;
case 6:
e.isOn = (value).booleanValue ();
break;
case 7:
e.options = (value).toLowerCase ();
break;
case 8:
if (Clazz.instanceOf (value, Float)) {
e.setScale ((value).floatValue (), false);
} else {
e.scaleAxes (value);
}break;
case 9:
e.colix = JU.C.getColixTranslucent3 (e.colix, value.equals ("translucent"), this.translucentLevel);
break;
case 10:
e.label = value;
break;
}
return;
}, "J.shapespecial.Ellipsoid,~N,~O");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
if (!this.isActive ()) return "";
var sb =  new JU.SB ();
sb.append ("\n");
if (!this.simpleEllipsoids.isEmpty ()) this.getStateID (sb);
if (!this.atomEllipsoids.isEmpty ()) this.getStateAtoms (sb);
return sb.toString ();
});
Clazz.defineMethod (c$, "getStateID", 
 function (sb) {
var v1 =  new JU.V3 ();
for (var ellipsoid, $ellipsoid = this.simpleEllipsoids.values ().iterator (); $ellipsoid.hasNext () && ((ellipsoid = $ellipsoid.next ()) || true);) {
var t = ellipsoid.tensor;
if (!ellipsoid.isValid || t == null) continue;
sb.append ("  Ellipsoid ID ").append (ellipsoid.id).append (" modelIndex ").appendI (t.modelIndex).append (" center ").append (JU.Escape.eP (ellipsoid.center)).append (" axes");
for (var i = 0; i < 3; i++) {
v1.setT (t.eigenVectors[i]);
v1.scale (ellipsoid.lengths[i]);
sb.append (" ").append (JU.Escape.eP (v1));
}
sb.append (" " + J.shape.Shape.getColorCommandUnk ("", ellipsoid.colix, this.translucentAllowed));
if (ellipsoid.label != null) sb.append (" label " + JU.PT.esc (ellipsoid.label));
if (ellipsoid.options != null) sb.append (" options ").append (JU.PT.esc (ellipsoid.options));
if (!ellipsoid.isOn) sb.append (" off");
sb.append (";\n");
}
}, "JU.SB");
Clazz.defineMethod (c$, "getStateAtoms", 
 function (sb) {
var bsDone =  new JU.BS ();
var temp =  new java.util.Hashtable ();
var temp2 =  new java.util.Hashtable ();
for (var e, $e = this.atomEllipsoids.values ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var iType = e.tensor.iType;
if (bsDone.get (iType + 1)) continue;
bsDone.set (iType + 1);
var isADP = (e.tensor.iType == 1);
var cmd = (isADP ? null : "Ellipsoids set " + JU.PT.esc (e.tensor.type));
for (var e2, $e2 = this.atomEllipsoids.values ().iterator (); $e2.hasNext () && ((e2 = $e2.next ()) || true);) {
if (e2.tensor.iType != iType || isADP && !e2.isOn) continue;
var i = e2.tensor.atomIndex1;
JU.BSUtil.setMapBitSet (temp, i, i, (isADP ? "Ellipsoids " + e2.percent : cmd + " scale " + e2.scale + (e2.options == null ? "" : " options " + JU.PT.esc (e2.options)) + (e2.isOn ? " ON" : " OFF")));
if (e2.colix != 0) JU.BSUtil.setMapBitSet (temp2, i, i, J.shape.Shape.getColorCommand (cmd, e2.pid, e2.colix, this.translucentAllowed));
}
}
sb.append (this.vwr.getCommands (temp, temp2, "select"));
}, "JU.SB");
Clazz.overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
if (!this.isActive ()) return;
this.setVis (this.simpleEllipsoids, bsModels, this.atoms);
this.setVis (this.atomEllipsoids, bsModels, this.atoms);
}, "JU.BS");
Clazz.defineMethod (c$, "setVis", 
 function (ellipsoids, bs, atoms) {
for (var e, $e = ellipsoids.values ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var t = e.tensor;
var isOK = (t != null && e.isValid && e.isOn);
if (isOK && t.atomIndex1 >= 0) {
if (t.iType == 1) {
var isModTensor = t.isModulated;
var isUnmodTensor = t.isUnmodulated;
var isModAtom = this.ms.isModulated (t.atomIndex1);
isOK = (!isModTensor && !isUnmodTensor || isModTensor == isModAtom);
}atoms[t.atomIndex1].setShapeVisibility (this.vf, true);
}e.visible = isOK && (e.modelIndex < 0 || bs.get (e.modelIndex));
}
}, "java.util.Map,JU.BS,~A");
Clazz.overrideMethod (c$, "setAtomClickability", 
function () {
if (this.atomEllipsoids.isEmpty ()) return;
for (var e, $e = this.atomEllipsoids.values ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var i = e.tensor.atomIndex1;
var atom = this.atoms[i];
if ((atom.shapeVisibilityFlags & this.vf) == 0 || this.ms.isAtomHidden (i)) continue;
atom.setClickable (this.vf);
}
});
Clazz.defineStatics (c$,
"MAX_OBJECT_CLICK_DISTANCE_SQUARED", 100,
"PROPERTY_MODES", "ax ce co de eq mo on op sc tr la");
});
