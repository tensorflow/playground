Clazz.declarePackage ("J.modelkit");
Clazz.load (["J.popup.JmolGenericPopup", "java.util.Hashtable", "JU.BS", "$.P3", "J.i18n.GT", "J.modelkit.ModelKitPopupResourceBundle"], "J.modelkit.ModelKitPopup", ["java.lang.Boolean", "$.Float", "JU.PT", "$.SB", "$.V3", "JM.Atom", "JU.BSUtil", "$.Edge", "$.Elements", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hasUnitCell = false;
this.allOperators = null;
this.currentModelIndex = -1;
this.alertedNoEdit = false;
this.atomHoverLabel = "C";
this.bondHoverLabel = J.i18n.GT.$ ("increase order");
this.xtalHoverLabel = null;
this.activeMenu = null;
this.lastModelSet = null;
this.pickAtomAssignType = "C";
this.pickBondAssignType = "p";
this.$isPickAtomAssignCharge = false;
this.bsHighlight = null;
this.bondIndex = -1;
this.bondAtomIndex1 = -1;
this.bondAtomIndex2 = -1;
this.bsRotateBranch = null;
this.branchAtomIndex = 0;
this.isRotateBond = false;
this.screenXY = null;
this.mkdata = null;
this.showSymopInfo = true;
this.addXtalHydrogens = true;
this.clickToSetElement = true;
this.centerPoint = null;
this.spherePoint = null;
this.viewOffset = null;
this.centerDistance = 0;
this.symop = null;
this.centerAtomIndex = -1;
this.secondAtomIndex = -1;
this.atomIndexSphere = -1;
this.drawData = null;
this.drawScript = null;
this.iatom0 = 0;
this.state = 0;
this.rotationDeg = 0;
this.lastCenter = "0 0 0";
this.lastOffset = "0 0 0";
Clazz.instantialize (this, arguments);
}, J.modelkit, "ModelKitPopup", J.popup.JmolGenericPopup);
Clazz.prepareFields (c$, function () {
this.bsHighlight =  new JU.BS ();
this.screenXY =  Clazz.newIntArray (2, 0);
this.mkdata =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.modelkit.ModelKitPopup, []);
});
Clazz.defineMethod (c$, "initialize", 
function (vwr, bundle, title) {
Clazz.superCall (this, J.modelkit.ModelKitPopup, "initialize", [vwr, bundle, title]);
this.initializeForModel ();
}, "JV.Viewer,J.popup.PopupResource,~S");
Clazz.overrideMethod (c$, "getBundle", 
function (menu) {
return J.modelkit.ModelKitPopup.bundle;
}, "~S");
Clazz.defineMethod (c$, "initializeForModel", 
function () {
this.resetBondFields ("init");
this.allOperators = null;
this.currentModelIndex = -999;
this.iatom0 = 0;
this.atomIndexSphere = this.centerAtomIndex = this.secondAtomIndex = -1;
this.centerPoint = this.spherePoint = null;
this.hasUnitCell = (this.vwr.getCurrentUnitCell () != null);
this.symop = null;
this.setDefaultState (this.hasUnitCell ? 1 : 0);
});
Clazz.overrideMethod (c$, "jpiUpdateComputedMenus", 
function () {
this.hasUnitCell = (this.vwr.getCurrentUnitCell () != null);
if (!this.checkUpdateSymmetryInfo ()) this.updateAllXtalMenus ();
});
Clazz.overrideMethod (c$, "appUpdateForShow", 
function () {
this.updateAllXtalMenuOptions ();
});
Clazz.defineMethod (c$, "checkUpdateSymmetryInfo", 
 function () {
this.htMenus.get ("xtalMenu").setEnabled (this.hasUnitCell);
var isOK = true;
if (this.vwr.ms !== this.lastModelSet) {
this.lastModelSet = this.vwr.ms;
isOK = false;
} else if (this.currentModelIndex == -1 || this.currentModelIndex != this.vwr.am.cmi) {
isOK = false;
}this.currentModelIndex = Math.max (this.vwr.am.cmi, 0);
this.iatom0 = this.vwr.ms.am[this.currentModelIndex].firstAtomIndex;
if (!isOK) {
this.allOperators = null;
}return isOK;
});
Clazz.defineMethod (c$, "updateAllXtalMenus", 
 function () {
this.updateOperatorMenu ();
this.updateAllXtalMenuOptions ();
});
Clazz.defineMethod (c$, "updateOperatorMenu", 
 function () {
if (this.allOperators != null) return;
var data = this.runScriptBuffered ("show symop");
this.allOperators = JU.PT.split (data.trim ().$replace ('\t', ' '), "\n");
this.addAllCheckboxItems (this.htMenus.get ("xtalOp!PersistMenu"), this.allOperators);
});
Clazz.defineMethod (c$, "addAllCheckboxItems", 
 function (menu, labels) {
this.menuRemoveAll (menu, 0);
var subMenu = menu;
var pt = (labels.length > 32 ? 0 : -2147483648);
for (var i = 0; i < labels.length; i++) {
if (pt >= 0 && (pt++ % 32) == 0) {
var id = "mtsymop" + pt + "Menu";
subMenu = this.menuNewSubMenu ((i + 1) + "..." + Math.min (i + 32, labels.length), this.menuGetId (menu) + "." + id);
this.menuAddSubMenu (menu, subMenu);
this.htMenus.put (id, subMenu);
pt = 1;
}if (i == 0) this.menuEnable (this.menuCreateItem (subMenu, J.i18n.GT.$ ("none"), "draw sym_* delete", null), true);
var sym = labels[i];
this.menuEnable (this.menuCreateItem (subMenu, sym, sym, subMenu.getName () + "." + "mkop_" + (i + 1)), true);
}
}, "J.api.SC,~A");
Clazz.defineMethod (c$, "updateAllXtalMenuOptions", 
 function () {
var text = "";
switch (this.getMKState ()) {
case 0:
text = " (not enabled)";
break;
case 1:
text = " (view)";
break;
case 2:
text = " (edit)";
break;
}
this.setLabel ("xtalModePersistMenu", "Crystal Mode: " + text);
text = (this.centerAtomIndex < 0 && this.centerPoint == null ? "(not selected)" : this.centerAtomIndex >= 0 ? this.vwr.getAtomInfo (this.centerAtomIndex) : this.centerPoint.toString ());
this.setLabel ("xtalSelPersistMenu", "Center: " + text);
text = (this.symop == null || this.allOperators == null ? "(no operator selected)" : Clazz.instanceOf (this.symop, Integer) ? this.allOperators[(this.symop).intValue () - 1] : this.symop.toString ());
this.setLabel ("operator", text);
switch (this.getSymEditState ()) {
case 0:
text = "do not apply symmetry";
break;
case 64:
text = "retain local symmetry";
break;
case 32:
text = "apply local symmetry";
break;
case 128:
text = "apply full symmetry";
break;
}
this.setLabel ("xtalEditOptPersistMenu", "Edit option: " + text);
switch (this.getUnitCellState ()) {
case 0:
text = "packed";
break;
case 256:
text = "unpacked" + (this.viewOffset == null ? "(no view offset)" : "(view offset=" + this.viewOffset + ")");
break;
}
this.setLabel ("xtalPackingPersistMenu", "Packing: " + text);
});
Clazz.defineMethod (c$, "setLabel", 
 function (key, label) {
this.menuSetLabel (this.htMenus.get (key), label);
}, "~S,~S");
Clazz.defineMethod (c$, "getActiveMenu", 
function () {
return this.activeMenu;
});
Clazz.defineMethod (c$, "setActiveMenu", 
function (name) {
var active = (name.indexOf ("xtalMenu") >= 0 ? "xtalMenu" : name.indexOf ("atomMenu") >= 0 ? "atomMenu" : name.indexOf ("bondMenu") >= 0 ? "bondMenu" : null);
if (active != null) {
this.activeMenu = active;
if ((active === "xtalMenu") == (this.getMKState () == 0)) this.setMKState (active === "xtalMenu" ? 1 : 0);
this.vwr.refresh (1, "modelkit");
}return active;
}, "~S");
Clazz.overrideMethod (c$, "appUpdateSpecialCheckBoxValue", 
function (source, actionCommand, selected) {
var name = source.getName ();
if (!this.updatingForShow && this.setActiveMenu (name) != null) {
var text = source.getText ();
if (name.indexOf ("Bond") >= 0) {
this.bondHoverLabel = text;
} else if (name.indexOf ("assignAtom") >= 0) this.atomHoverLabel = text;
 else if (this.activeMenu === "xtalMenu") this.xtalHoverLabel = this.atomHoverLabel = text;
}}, "J.api.SC,~S,~B");
Clazz.defineMethod (c$, "isXtalState", 
 function () {
return ((this.state & 3) != 0);
});
Clazz.defineMethod (c$, "setMKState", 
 function (bits) {
this.state = (this.state & -4) | (this.hasUnitCell ? bits : 0);
}, "~N");
Clazz.defineMethod (c$, "getMKState", 
 function () {
return this.state & 3;
});
Clazz.defineMethod (c$, "setSymEdit", 
 function (bits) {
this.state = (this.state & -225) | bits;
}, "~N");
Clazz.defineMethod (c$, "getSymEditState", 
 function () {
return this.state & 224;
});
Clazz.defineMethod (c$, "setSymViewState", 
 function (bits) {
this.state = (this.state & -29) | bits;
}, "~N");
Clazz.defineMethod (c$, "getSymViewState", 
 function () {
return this.state & 28;
});
Clazz.defineMethod (c$, "setUnitCell", 
 function (bits) {
this.state = (this.state & -1793) | bits;
}, "~N");
Clazz.defineMethod (c$, "getUnitCellState", 
 function () {
return this.state & 1792;
});
Clazz.defineMethod (c$, "isPickAtomAssignCharge", 
function () {
return this.$isPickAtomAssignCharge;
});
Clazz.defineMethod (c$, "getProperty", 
function (data) {
var key = (Clazz.instanceOf (data, String) ? data : (data)[0]).toString ();
var value = (Clazz.instanceOf (data, String) ? null : (data)[1]);
return this.setProperty (key, value);
}, "~O");
Clazz.defineMethod (c$, "setProperty", 
function (name, value) {
name = name.toLowerCase ().intern ();
if (name === "isMolecular") {
return Boolean.$valueOf (this.getMKState () == 0);
}if (name === "hoverlabel") {
return this.getHoverLabel ((value).intValue ());
}if (name === "alloperators") {
return this.allOperators;
}if (name === "data") {
return this.getData (value == null ? null : value.toString ());
}if (name === "invariant") {
var iatom = (Clazz.instanceOf (value, JU.BS) ? (value).nextSetBit (0) : -1);
var atom = this.vwr.ms.getAtom (iatom);
if (atom == null) return null;
return this.vwr.getSymmetryInfo (iatom, null, -1, atom, atom, 1275068418, null, 0, 0, 0);
}if (name === "assignatom") {
var o = (value);
var type = o[0];
var data = o[1];
var atomIndex = data[0];
if (this.isVwrRotateBond ()) {
this.bondAtomIndex1 = atomIndex;
} else if (!this.processAtomClick (data[0]) && (this.clickToSetElement || this.vwr.ms.getAtom (atomIndex).getElementNumber () == 1)) this.assignAtom (atomIndex, type, data[1] >= 0, data[2] >= 0);
return null;
}if (name === "bondatomindex") {
var i = (value).intValue ();
if (i != this.bondAtomIndex2) this.bondAtomIndex1 = i;
this.bsRotateBranch = null;
return null;
}if (name === "highlight") {
if (value == null) this.bsHighlight =  new JU.BS ();
 else this.bsHighlight = value;
return null;
}if (name === "mode") {
var isEdit = ("edit".equals (value));
this.setMKState ("view".equals (value) ? 1 : isEdit ? 2 : 0);
if (isEdit) this.addXtalHydrogens = false;
return null;
}if (name === "symmetry") {
this.setDefaultState (2);
name = (value).toLowerCase ().intern ();
this.setSymEdit (name === "applylocal" ? 32 : name === "retainlocal" ? 64 : name === "applyfull" ? 128 : 0);
this.showXtalSymmetry ();
return null;
}if (name === "unitcell") {
var isPacked = "packed".equals (value);
this.setUnitCell (isPacked ? 0 : 256);
this.viewOffset = (isPacked ? J.modelkit.ModelKitPopup.Pt000 : null);
return null;
}if (name === "symop") {
this.setDefaultState (1);
if (value != null) {
this.symop = value;
this.showSymop (this.symop);
}return this.symop;
}if (name === "center") {
this.setDefaultState (1);
var centerAtom = value;
this.lastCenter = centerAtom.x + " " + centerAtom.y + " " + centerAtom.z;
this.centerAtomIndex = (Clazz.instanceOf (centerAtom, JM.Atom) ? (centerAtom).i : -1);
this.atomIndexSphere = -1;
this.secondAtomIndex = -1;
this.processAtomClick (this.centerAtomIndex);
return null;
}if (name === "scriptassignbond") {
this.appRunScript ("assign bond [{" + value + "}] \"" + this.pickBondAssignType + "\"");
return null;
}if (name === "assignbond") {
var data = value;
return this.assignBond (data[0], data[1]);
}if (name === "atomtype") {
if (value != null) {
this.pickAtomAssignType = value;
this.$isPickAtomAssignCharge = (this.pickAtomAssignType.equals ("pl") || this.pickAtomAssignType.equals ("mi"));
}return this.pickAtomAssignType;
}if (name === "bondtype") {
if (value != null) {
this.pickBondAssignType = (value).substring (0, 1).toLowerCase ();
}return this.pickBondAssignType;
}if (name === "bondindex") {
if (value != null) {
this.setBondIndex ((value).intValue (), false);
}return (this.bondIndex < 0 ? null : Integer.$valueOf (this.bondIndex));
}if (name === "rotatebondindex") {
if (value != null) {
this.setBondIndex ((value).intValue (), true);
}return (this.bondIndex < 0 ? null : Integer.$valueOf (this.bondIndex));
}if (name === "addhydrogen" || name === "addhydrogens") {
if (value != null) this.addXtalHydrogens = J.modelkit.ModelKitPopup.isTrue (value);
return Boolean.$valueOf (this.addXtalHydrogens);
}if (name === "clicktosetelement") {
if (value != null) this.clickToSetElement = J.modelkit.ModelKitPopup.isTrue (value);
return Boolean.$valueOf (this.clickToSetElement);
}if (name === "showsymopinfo") {
if (value != null) this.showSymopInfo = J.modelkit.ModelKitPopup.isTrue (value);
return Boolean.$valueOf (this.showSymopInfo);
}if (name === "offset") {
if (value === "none") {
this.viewOffset = null;
} else if (value != null) {
this.viewOffset = (Clazz.instanceOf (value, JU.P3) ? value : J.modelkit.ModelKitPopup.pointFromTriad (value.toString ()));
if (this.viewOffset != null) this.setSymViewState (8);
}this.showXtalSymmetry ();
return this.viewOffset;
}if (name === "distance") {
this.setDefaultState (2);
var d = (value == null ? NaN : Clazz.instanceOf (value, Float) ? (value).floatValue () : JU.PT.parseFloat (value));
if (!Float.isNaN (d)) {
J.modelkit.ModelKitPopup.notImplemented ("setProperty: distance");
this.centerDistance = d;
}return Float.$valueOf (this.centerDistance);
}if (name === "point") {
if (value != null) {
J.modelkit.ModelKitPopup.notImplemented ("setProperty: point");
this.setDefaultState (2);
this.spherePoint = value;
this.atomIndexSphere = (Clazz.instanceOf (this.spherePoint, JM.Atom) ? (this.spherePoint).i : -1);
}return this.spherePoint;
}if (name === "screenxy") {
if (value != null) {
this.screenXY = value;
}return this.screenXY;
}if (name === "addconstraint") {
J.modelkit.ModelKitPopup.notImplemented ("setProperty: addConstraint");
}if (name === "removeconstraint") {
J.modelkit.ModelKitPopup.notImplemented ("setProperty: removeConstraint");
}if (name === "removeallconstraints") {
J.modelkit.ModelKitPopup.notImplemented ("setProperty: removeAllConstraints");
}System.err.println ("ModelKitPopup.setProperty? " + name + " " + value);
return null;
}, "~S,~O");
c$.isTrue = Clazz.defineMethod (c$, "isTrue", 
 function (value) {
return (Boolean.$valueOf (value.toString ()) === Boolean.TRUE);
}, "~O");
Clazz.defineMethod (c$, "getData", 
 function (key) {
this.addData ("centerPoint", this.centerPoint);
this.addData ("centerAtomIndex", Integer.$valueOf (this.centerAtomIndex));
this.addData ("secondAtomIndex", Integer.$valueOf (this.secondAtomIndex));
this.addData ("symop", this.symop);
this.addData ("offset", this.viewOffset);
this.addData ("drawData", this.drawData);
this.addData ("drawScript", this.drawScript);
return this.mkdata;
}, "~S");
Clazz.defineMethod (c$, "addData", 
 function (key, value) {
this.mkdata.put (key, value == null ? "null" : value);
}, "~S,~O");
Clazz.defineMethod (c$, "processAtomClick", 
 function (atomIndex) {
switch (this.getMKState ()) {
case 0:
return this.isVwrRotateBond ();
case 1:
this.centerAtomIndex = atomIndex;
if (this.getSymViewState () == 0) this.setSymViewState (8);
this.showXtalSymmetry ();
return true;
case 2:
if (atomIndex == this.centerAtomIndex) return true;
J.modelkit.ModelKitPopup.notImplemented ("edit click");
return false;
}
J.modelkit.ModelKitPopup.notImplemented ("atom click unknown XTAL state");
return false;
}, "~N");
Clazz.defineMethod (c$, "getHoverLabel", 
 function (atomIndex) {
var state = this.getMKState ();
if (state != 1 && atomIndex >= 0 && !this.vwr.ms.isAtomInLastModel (atomIndex)) {
return "Only atoms in the last model may be edited.";
}var msg = null;
switch (state) {
case 1:
if (this.symop == null) this.symop = Integer.$valueOf (1);
msg = "view symop " + this.symop + " for " + this.vwr.getAtomInfo (atomIndex);
break;
case 2:
msg = "start editing for " + this.vwr.getAtomInfo (atomIndex);
break;
case 0:
if (this.isRotateBond) {
if (atomIndex == this.bondAtomIndex1 || atomIndex == this.bondAtomIndex2) {
msg = "rotate branch";
this.branchAtomIndex = atomIndex;
this.bsRotateBranch = null;
} else {
msg = "rotate bond";
this.bsRotateBranch = null;
this.branchAtomIndex = -1;
}}if (this.bondIndex < 0) {
if (this.atomHoverLabel.length <= 2) {
msg = this.atomHoverLabel = "Click to change to " + this.atomHoverLabel + " or drag to add " + this.atomHoverLabel;
} else {
msg = this.atomHoverLabel;
this.vwr.highlight (JU.BSUtil.newAndSetBit (atomIndex));
}} else {
if (msg == null) {
switch (this.bsHighlight.cardinality ()) {
case 0:
this.vwr.highlight (JU.BSUtil.newAndSetBit (atomIndex));
case 1:
msg = this.atomHoverLabel;
break;
case 2:
msg = this.bondHoverLabel;
break;
}
}}break;
}
return msg;
}, "~N");
Clazz.defineMethod (c$, "setDefaultState", 
 function (mode) {
if (!this.hasUnitCell) mode = 0;
if (!this.hasUnitCell || this.isXtalState () != this.hasUnitCell) {
this.setMKState (mode);
switch (mode) {
case 0:
break;
case 1:
if (this.getSymViewState () == 0) this.setSymViewState (8);
break;
case 2:
break;
}
}}, "~N");
Clazz.overrideMethod (c$, "appGetBooleanProperty", 
function (name) {
if (name.startsWith ("mk")) {
return (this.getProperty (name.substring (2))).booleanValue ();
}return this.vwr.getBooleanProperty (name);
}, "~S");
Clazz.overrideMethod (c$, "getUnknownCheckBoxScriptToRun", 
function (item, name, what, TF) {
if (name.startsWith ("mk")) {
this.processMKPropertyItem (name, TF);
return null;
}var element = this.promptUser (J.i18n.GT.$ ("Element?"), "");
if (element == null || JU.Elements.elementNumberFromSymbol (element, true) == 0) return null;
this.menuSetLabel (item, element);
item.setActionCommand ("assignAtom_" + element + "P!:??");
this.atomHoverLabel = "Click or click+drag for " + element;
return "set picking assignAtom_" + element;
}, "J.api.SC,~S,~S,~B");
Clazz.defineMethod (c$, "processMKPropertyItem", 
 function (name, TF) {
name = name.substring (2);
var pt = name.indexOf ("_");
if (pt > 0) {
this.setProperty (name.substring (0, pt), name.substring (pt + 1));
} else {
this.setProperty (name, Boolean.$valueOf (TF));
}}, "~S,~B");
Clazz.defineMethod (c$, "showXtalSymmetry", 
 function () {
var script = null;
switch (this.getSymViewState ()) {
case 0:
script = "draw * delete";
break;
case 8:
default:
var offset = null;
if (this.secondAtomIndex >= 0) {
script = "draw ID sym symop " + (this.centerAtomIndex < 0 ? this.centerPoint : " {atomindex=" + this.centerAtomIndex + "}") + " {atomindex=" + this.secondAtomIndex + "}";
} else {
offset = this.viewOffset;
if (this.symop == null) this.symop = Integer.$valueOf (1);
var iatom = (this.centerAtomIndex >= 0 ? this.centerAtomIndex : this.centerPoint != null ? -1 : this.iatom0);
script = "draw ID sym symop " + (this.symop == null ? "1" : Clazz.instanceOf (this.symop, String) ? "'" + this.symop + "'" : JU.PT.toJSON (null, this.symop)) + (iatom < 0 ? this.centerPoint : " {atomindex=" + iatom + "}") + (offset == null ? "" : " offset " + offset);
}this.drawData = this.runScriptBuffered (script);
this.drawScript = script;
this.drawData = (this.showSymopInfo ? this.drawData.substring (0, this.drawData.indexOf ("\n") + 1) : "");
this.appRunScript (";refresh;set echo top right;echo " + this.drawData.$replace ('\t', ' '));
break;
}
});
Clazz.defineMethod (c$, "assignAtom", 
 function (atomIndex, type, autoBond, addHsAndBond) {
this.vwr.ms.clearDB (atomIndex);
if (type == null) type = "C";
var atom = this.vwr.ms.at[atomIndex];
var bs =  new JU.BS ();
var wasH = (atom.getElementNumber () == 1);
var atomicNumber = (JU.PT.isUpperCase (type.charAt (0)) ? JU.Elements.elementNumberFromSymbol (type, true) : -1);
var isDelete = false;
if (atomicNumber > 0) {
this.vwr.ms.setElement (atom, atomicNumber, !addHsAndBond);
this.vwr.shm.setShapeSizeBs (0, 0, this.vwr.rd, JU.BSUtil.newAndSetBit (atomIndex));
this.vwr.ms.setAtomName (atomIndex, type + atom.getAtomNumber (), !addHsAndBond);
if (this.vwr.getBoolean (603983903)) this.vwr.ms.am[atom.mi].isModelKit = true;
if (!this.vwr.ms.am[atom.mi].isModelKit) this.vwr.ms.taintAtom (atomIndex, 0);
} else if (type.toLowerCase ().equals ("pl")) {
atom.setFormalCharge (atom.getFormalCharge () + 1);
} else if (type.toLowerCase ().equals ("mi")) {
atom.setFormalCharge (atom.getFormalCharge () - 1);
} else if (type.equals ("X")) {
isDelete = true;
} else if (!type.equals (".")) {
return;
}if (!addHsAndBond) return;
this.vwr.ms.removeUnnecessaryBonds (atom, isDelete);
var dx = 0;
if (atom.getCovalentBondCount () == 1) if (wasH) {
dx = 1.50;
} else if (!wasH && atomicNumber == 1) {
dx = 1.0;
}if (dx != 0) {
var v = JU.V3.newVsub (atom, this.vwr.ms.at[atom.getBondedAtomIndex (0)]);
var d = v.length ();
v.normalize ();
v.scale (dx - d);
this.vwr.ms.setAtomCoordRelative (atomIndex, v.x, v.y, v.z);
}var bsA = JU.BSUtil.newAndSetBit (atomIndex);
if (isDelete) {
this.vwr.deleteAtoms (bsA, false);
}if (atomicNumber != 1 && autoBond) {
this.vwr.ms.validateBspf (false);
bs = this.vwr.ms.getAtomsWithinRadius (1.0, bsA, false, null);
bs.andNot (bsA);
if (bs.nextSetBit (0) >= 0) this.vwr.deleteAtoms (bs, false);
bs = this.vwr.getModelUndeletedAtomsBitSet (atom.mi);
bs.andNot (this.vwr.ms.getAtomBitsMDa (1612709900, null,  new JU.BS ()));
this.vwr.ms.makeConnections2 (0.1, 1.8, 1, 1073741904, bsA, bs, null, false, false, 0);
}if (this.addXtalHydrogens) this.vwr.addHydrogens (bsA, false, true);
}, "~N,~S,~B,~B");
Clazz.defineMethod (c$, "assignBond", 
 function (bondIndex, type) {
var bondOrder = type - 48;
var bond = this.vwr.ms.bo[bondIndex];
this.vwr.ms.clearDB (bond.atom1.i);
switch (type) {
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
break;
case 'p':
case 'm':
bondOrder = JU.Edge.getBondOrderNumberFromOrder (bond.getCovalentOrder ()).charCodeAt (0) - 48 + (type == 112 ? 1 : -1);
if (bondOrder > 3) bondOrder = 1;
 else if (bondOrder < 0) bondOrder = 3;
break;
default:
return null;
}
var bsAtoms =  new JU.BS ();
try {
if (bondOrder == 0) {
var bs =  new JU.BS ();
bs.set (bond.index);
bsAtoms.set (bond.atom1.i);
bsAtoms.set (bond.atom2.i);
this.vwr.ms.deleteBonds (bs, false);
} else {
bond.setOrder (bondOrder | 131072);
if (bond.atom1.getElementNumber () != 1 && bond.atom2.getElementNumber () != 1) {
this.vwr.ms.removeUnnecessaryBonds (bond.atom1, false);
this.vwr.ms.removeUnnecessaryBonds (bond.atom2, false);
}bsAtoms.set (bond.atom1.i);
bsAtoms.set (bond.atom2.i);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("Exception in seBondOrder: " + e.toString ());
} else {
throw e;
}
}
if (type != 48 && this.addXtalHydrogens) this.vwr.addHydrogens (bsAtoms, false, true);
return bsAtoms;
}, "~N,~N");
Clazz.defineMethod (c$, "isVwrRotateBond", 
 function () {
return (this.vwr.acm.getBondPickingMode () == 34);
});
Clazz.defineMethod (c$, "getRotateBondIndex", 
function () {
return (this.getMKState () == 0 && this.isRotateBond ? this.bondIndex : -1);
});
Clazz.defineMethod (c$, "resetBondFields", 
 function (where) {
this.bsRotateBranch = null;
this.branchAtomIndex = this.bondAtomIndex1 = this.bondAtomIndex2 = -1;
}, "~S");
Clazz.defineMethod (c$, "setBondIndex", 
 function (index, isRotate) {
if (!isRotate && this.isVwrRotateBond ()) {
this.vwr.setModelKitRotateBondIndex (index);
return;
}var haveBond = (this.bondIndex >= 0);
if (!haveBond && index < 0) return;
if (index < 0) {
this.resetBondFields ("setbondindex<0");
return;
}this.bsRotateBranch = null;
this.branchAtomIndex = -1;
this.bondIndex = index;
this.isRotateBond = isRotate;
this.bondAtomIndex1 = this.vwr.ms.bo[index].getAtomIndex1 ();
this.bondAtomIndex2 = this.vwr.ms.bo[index].getAtomIndex2 ();
this.setActiveMenu ("bondMenu");
}, "~N,~B");
Clazz.defineMethod (c$, "actionRotateBond", 
function (deltaX, deltaY, x, y, forceFull) {
if (this.bondIndex < 0) return;
var bsBranch = this.bsRotateBranch;
var atomFix;
var atomMove;
var ms = this.vwr.ms;
if (forceFull) {
bsBranch = null;
this.branchAtomIndex = -1;
}if (bsBranch == null) {
var b = ms.bo[this.bondIndex];
atomMove = (this.branchAtomIndex == b.atom1.i ? b.atom1 : b.atom2);
atomFix = (atomMove === b.atom1 ? b.atom2 : b.atom1);
this.vwr.undoMoveActionClear (atomFix.i, 2, true);
if (this.branchAtomIndex >= 0) bsBranch = this.vwr.getBranchBitSet (atomMove.i, atomFix.i, true);
if (bsBranch != null) for (var n = 0, i = atomFix.bonds.length; --i >= 0; ) {
if (bsBranch.get (atomFix.getBondedAtomIndex (i)) && ++n == 2) {
bsBranch = null;
break;
}}
if (bsBranch == null) {
bsBranch = ms.getMoleculeBitSetForAtom (atomFix.i);
}this.bsRotateBranch = bsBranch;
this.bondAtomIndex1 = atomFix.i;
this.bondAtomIndex2 = atomMove.i;
} else {
atomFix = ms.at[this.bondAtomIndex1];
atomMove = ms.at[this.bondAtomIndex2];
}var v1 = JU.V3.new3 (atomMove.sX - atomFix.sX, atomMove.sY - atomFix.sY, 0);
var v2 = JU.V3.new3 (deltaX, deltaY, 0);
v1.cross (v1, v2);
var degrees = (v1.z > 0 ? 1 : -1) * v2.length ();
var bs = JU.BSUtil.copy (bsBranch);
bs.andNot (this.vwr.slm.getMotionFixedAtoms ());
this.vwr.rotateAboutPointsInternal (null, atomFix, atomMove, 0, degrees, false, bs, null, null, null, null);
}, "~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "menuFocusCallback", 
function (name, actionCommand, gained) {
if (gained && !this.processSymop (name, true)) this.setActiveMenu (name);
}, "~S,~S,~B");
Clazz.overrideMethod (c$, "menuClickCallback", 
function (source, script) {
this.doMenuClickCallbackMK (source, script);
}, "J.api.SC,~S");
Clazz.defineMethod (c$, "doMenuClickCallbackMK", 
function (source, script) {
if (this.processSymop (source.getName (), false)) return;
if (script.equals ("clearQPersist")) {
for (var item, $item = this.htCheckbox.values ().iterator (); $item.hasNext () && ((item = $item.next ()) || true);) {
if (item.getActionCommand ().indexOf (":??") < 0) continue;
this.menuSetLabel (item, "??");
item.setActionCommand ("_??P!:");
item.setSelected (false);
}
this.appRunScript ("set picking assignAtom_C");
return;
}this.doMenuClickCallback (source, script);
}, "J.api.SC,~S");
Clazz.overrideMethod (c$, "getScriptForCallback", 
function (source, id, script) {
if (script.startsWith ("mk")) {
this.processXtalClick (id, script);
script = null;
}return script;
}, "J.api.SC,~S,~S");
Clazz.defineMethod (c$, "processXtalClick", 
 function (id, action) {
if (this.processSymop (id, false)) return;
action = action.intern ();
if (action.startsWith ("mkmode_")) {
if (!this.alertedNoEdit && action === "mkmode_edit") {
this.alertedNoEdit = true;
this.vwr.alert ("ModelKit xtal edit has not been implemented");
return;
}this.processModeClick (action);
} else if (action.startsWith ("mksel_")) {
this.processSelClick (action);
} else if (action.startsWith ("mkselop_")) {
this.processSelOpClick (action);
} else if (action.startsWith ("mksymmetry_")) {
this.processSymClick (action);
} else if (action.startsWith ("mkunitcell_")) {
this.processUCClick (action);
} else {
J.modelkit.ModelKitPopup.notImplemented ("XTAL click " + action);
}this.updateAllXtalMenuOptions ();
}, "~S,~S");
Clazz.defineMethod (c$, "processSelOpClick", 
 function (action) {
this.secondAtomIndex = -1;
if (action === "mkselop_addoffset") {
var pos = this.promptUser ("Enter i j k for an offset for viewing the operator - leave blank to clear", this.lastOffset);
if (pos == null) return;
this.lastOffset = pos;
if (pos.length == 0 || pos === "none") {
this.setProperty ("offset", "none");
return;
}var p = J.modelkit.ModelKitPopup.pointFromTriad (pos);
if (p == null) {
this.processSelOpClick (action);
} else {
this.setProperty ("offset", p);
}} else if (action === "mkselop_atom2") {
J.modelkit.ModelKitPopup.notImplemented (action);
}}, "~S");
Clazz.defineMethod (c$, "processSymop", 
 function (id, isFocus) {
var pt = id.indexOf (".mkop_");
if (pt >= 0) {
var op = this.symop;
this.symop = Integer.$valueOf (id.substring (pt + 6));
this.showSymop (this.symop);
if (isFocus) this.symop = op;
return true;
}return false;
}, "~S,~B");
Clazz.defineMethod (c$, "showSymop", 
 function (symop) {
this.secondAtomIndex = -1;
this.symop = symop;
this.showXtalSymmetry ();
}, "~O");
Clazz.defineMethod (c$, "processModeClick", 
 function (action) {
this.processMKPropertyItem (action, false);
}, "~S");
Clazz.defineMethod (c$, "processSelClick", 
 function (action) {
if (action === "mksel_atom") {
this.centerPoint = null;
this.centerAtomIndex = -1;
this.secondAtomIndex = -1;
} else if (action === "mksel_position") {
var pos = this.promptUser ("Enter three fractional coordinates", this.lastCenter);
if (pos == null) return;
this.lastCenter = pos;
var p = J.modelkit.ModelKitPopup.pointFromTriad (pos);
if (p == null) {
this.processSelClick (action);
return;
}this.centerAtomIndex = -2147483647;
this.centerPoint = p;
this.showXtalSymmetry ();
}}, "~S");
Clazz.defineMethod (c$, "processSymClick", 
 function (action) {
if (action === "mksymmetry_none") {
this.setSymEdit (0);
} else {
this.processMKPropertyItem (action, false);
}}, "~S");
Clazz.defineMethod (c$, "processUCClick", 
 function (action) {
this.processMKPropertyItem (action, false);
this.showXtalSymmetry ();
}, "~S");
Clazz.defineMethod (c$, "handleDragAtom", 
function (pressed, dragged, countPlusIndices) {
switch (this.getMKState ()) {
case 0:
return false;
case 2:
if (countPlusIndices[0] > 2) return true;
J.modelkit.ModelKitPopup.notImplemented ("drag atom for XTAL edit");
break;
case 1:
if (this.getSymViewState () == 0) this.setSymViewState (8);
switch (countPlusIndices[0]) {
case 1:
this.centerAtomIndex = countPlusIndices[1];
this.secondAtomIndex = -1;
break;
case 2:
this.centerAtomIndex = countPlusIndices[1];
this.secondAtomIndex = countPlusIndices[2];
break;
}
this.showXtalSymmetry ();
return true;
}
return true;
}, "JV.MouseState,JV.MouseState,~A");
c$.pointFromTriad = Clazz.defineMethod (c$, "pointFromTriad", 
 function (pos) {
var a = JU.PT.parseFloatArray (JU.PT.replaceAllCharacters (pos, "{,}", " "));
return (a.length == 3 && !Float.isNaN (a[2]) ? JU.P3.new3 (a[0], a[1], a[2]) : null);
}, "~S");
c$.notImplemented = Clazz.defineMethod (c$, "notImplemented", 
 function (action) {
System.err.println ("ModelKitPopup.notImplemented(" + action + ")");
}, "~S");
Clazz.defineMethod (c$, "promptUser", 
 function (msg, def) {
return this.vwr.prompt (msg, def, null, false);
}, "~S,~S");
Clazz.defineMethod (c$, "runScriptBuffered", 
 function (script) {
var sb =  new JU.SB ();
try {
System.out.println ("MKP\n" + script);
(this.vwr.eval).runBufferedSafely (script, sb);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
return sb.toString ();
}, "~S");
Clazz.defineMethod (c$, "handleAssignNew", 
function (pressed, dragged, mp, dragAtomIndex) {
var inRange = pressed.inRange (10, dragged.x, dragged.y);
if (inRange) {
dragged.x = pressed.x;
dragged.y = pressed.y;
}if (this.handleDragAtom (pressed, dragged, mp.countPlusIndices)) return true;
var isCharge = this.$isPickAtomAssignCharge;
var atomType = this.pickAtomAssignType;
if (mp.count == 2) {
this.vwr.undoMoveActionClear (-1, 4146, true);
this.appRunScript ("assign connect " + mp.getMeasurementScript (" ", false));
} else if (atomType.equals ("Xx")) {
return false;
} else {
if (inRange) {
var s = "assign atom ({" + dragAtomIndex + "}) \"" + atomType + "\"";
if (isCharge) {
s += ";{atomindex=" + dragAtomIndex + "}.label='%C'; ";
this.vwr.undoMoveActionClear (dragAtomIndex, 4, true);
} else {
this.vwr.undoMoveActionClear (-1, 4146, true);
}this.appRunScript (s);
} else if (!isCharge) {
this.vwr.undoMoveActionClear (-1, 4146, true);
var a = this.vwr.ms.at[dragAtomIndex];
if (a.getElementNumber () == 1) {
this.vwr.assignAtom (dragAtomIndex, "X", null);
} else {
var x = dragged.x;
var y = dragged.y;
if (this.vwr.antialiased) {
x <<= 1;
y <<= 1;
}var ptNew = JU.P3.new3 (x, y, a.sZ);
this.vwr.tm.unTransformPoint (ptNew, ptNew);
this.vwr.assignAtom (dragAtomIndex, atomType, ptNew);
}}}return true;
}, "JV.MouseState,JV.MouseState,JM.MeasurementPending,~N");
Clazz.defineStatics (c$,
"MAX_LABEL", 32);
c$.bundle = c$.prototype.bundle =  new J.modelkit.ModelKitPopupResourceBundle (null, null);
Clazz.defineStatics (c$,
"STATE_BITS_XTAL", 0x03,
"STATE_MOLECULAR", 0x00,
"STATE_XTALVIEW", 0x01,
"STATE_XTALEDIT", 0x02,
"STATE_BITS_SYM_VIEW", 0x1c,
"STATE_SYM_NONE", 0x00,
"STATE_SYM_SHOW", 0x08,
"STATE_BITS_SYM_EDIT", 0xe0,
"STATE_SYM_APPLYLOCAL", 0x20,
"STATE_SYM_RETAINLOCAL", 0x40,
"STATE_SYM_APPLYFULL", 0x80,
"STATE_BITS_UNITCELL", 0x700,
"STATE_UNITCELL_PACKED", 0x000,
"STATE_UNITCELL_EXTEND", 0x100,
"MODE_OPTIONS", ";view;edit;molecular;",
"SYMMETRY_OPTIONS", ";none;applylocal;retainlocal;applyfull;",
"UNITCELL_OPTIONS", ";packed;extend;",
"BOOLEAN_OPTIONS", ";showsymopinfo;clicktosetelement;addhydrogen;addhydrogens;",
"SET_OPTIONS", ";element;");
c$.Pt000 = c$.prototype.Pt000 =  new JU.P3 ();
});
