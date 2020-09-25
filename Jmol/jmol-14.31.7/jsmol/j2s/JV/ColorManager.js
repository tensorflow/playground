Clazz.declarePackage ("JV");
Clazz.load (null, "JV.ColorManager", ["java.lang.Character", "$.Float", "JU.AU", "J.c.PAL", "JU.C", "$.ColorEncoder", "$.Elements", "$.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ce = null;
this.vwr = null;
this.g3d = null;
this.argbsCpk = null;
this.altArgbsCpk = null;
this.colorData = null;
this.isDefaultColorRasmol = false;
this.colixRubberband = 22;
this.colixBackgroundContrast = 0;
Clazz.instantialize (this, arguments);
}, JV, "ColorManager");
Clazz.makeConstructor (c$, 
function (vwr, gdata) {
this.vwr = vwr;
this.ce =  new JU.ColorEncoder (null, vwr);
this.g3d = gdata;
this.argbsCpk = J.c.PAL.argbsCpk;
this.altArgbsCpk = JU.AU.arrayCopyRangeI (JV.JC.altArgbsCpk, 0, -1);
}, "JV.Viewer,JU.GData");
Clazz.defineMethod (c$, "setDefaultColors", 
function (isRasmol) {
if (isRasmol) {
this.isDefaultColorRasmol = true;
this.argbsCpk = JU.AU.arrayCopyI (JU.ColorEncoder.getRasmolScale (), -1);
} else {
this.isDefaultColorRasmol = false;
this.argbsCpk = J.c.PAL.argbsCpk;
}this.altArgbsCpk = JU.AU.arrayCopyRangeI (JV.JC.altArgbsCpk, 0, -1);
this.ce.createColorScheme ((isRasmol ? "Rasmol=" : "Jmol="), true, true);
for (var i = J.c.PAL.argbsCpk.length; --i >= 0; ) this.g3d.changeColixArgb (i, this.argbsCpk[i]);

for (var i = JV.JC.altArgbsCpk.length; --i >= 0; ) this.g3d.changeColixArgb (JU.Elements.elementNumberMax + i, this.altArgbsCpk[i]);

}, "~B");
Clazz.defineMethod (c$, "setRubberbandArgb", 
function (argb) {
this.colixRubberband = (argb == 0 ? 0 : JU.C.getColix (argb));
}, "~N");
Clazz.defineMethod (c$, "setColixBackgroundContrast", 
function (argb) {
this.colixBackgroundContrast = JU.C.getBgContrast (argb);
}, "~N");
Clazz.defineMethod (c$, "getColixBondPalette", 
function (bond, pid) {
var argb = 0;
switch (pid) {
case 19:
return this.ce.getColorIndexFromPalette (bond.getEnergy (), -2.5, -0.5, 7, false);
}
return (argb == 0 ? 10 : JU.C.getColix (argb));
}, "JM.Bond,~N");
Clazz.defineMethod (c$, "getColixAtomPalette", 
function (atom, pid) {
var argb = 0;
var index;
var id;
var modelSet = this.vwr.ms;
var modelIndex;
var lo;
var hi;
switch (pid) {
case 84:
return (this.colorData == null || atom.i >= this.colorData.length || Float.isNaN (this.colorData[atom.i]) ? 12 : this.ce.getColorIndex (this.colorData[atom.i]));
case 0:
case 1:
id = atom.getAtomicAndIsotopeNumber ();
if (id < JU.Elements.elementNumberMax) return this.g3d.getChangeableColix (id, this.argbsCpk[id]);
var id0 = id;
id = JU.Elements.altElementIndexFromNumber (id);
if (id > 0) return this.g3d.getChangeableColix (JU.Elements.elementNumberMax + id, this.altArgbsCpk[id]);
id = JU.Elements.getElementNumber (id0);
return this.g3d.getChangeableColix (id, this.argbsCpk[id]);
case 2:
index = JU.ColorEncoder.quantize4 (atom.getPartialCharge (), -1, 1, JV.JC.PARTIAL_CHARGE_RANGE_SIZE);
return this.g3d.getChangeableColix (JV.JC.PARTIAL_CHARGE_COLIX_RED + index, JV.JC.argbsRwbScale[index]);
case 3:
index = atom.getFormalCharge () - -4;
return this.g3d.getChangeableColix (JV.JC.FORMAL_CHARGE_COLIX_RED + index, JV.JC.argbsFormalCharge[index]);
case 68:
case 5:
if (pid == 68) {
lo = this.vwr.ms.getBfactor100Lo ();
hi = this.vwr.ms.getBfactor100Hi ();
} else {
lo = 0;
hi = 10000;
}return this.ce.getColorIndexFromPalette (atom.getBfactor100 (), lo, hi, 7, false);
case 86:
return this.ce.getColorIndexFromPalette (atom.group.getGroupParameter (1111490574), -1, 1, 7, false);
case 70:
hi = this.vwr.ms.getSurfaceDistanceMax ();
return this.ce.getColorIndexFromPalette (atom.getSurfaceDistance100 (), 0, hi, 7, false);
case 24:
id = atom.group.groupID;
if (id >= 42) id = 24 + "PGCATU".indexOf (Character.toUpperCase (atom.group.group1)) - 1;
return this.ce.getColorIndexFromPalette (id, 0, 0, 17, false);
case 8:
return this.ce.getColorIndexFromPalette (atom.group.groupID, 0, 0, 5, false);
case 9:
return this.ce.getColorIndexFromPalette (atom.group.groupID, 0, 0, 4, false);
case 75:
return this.ce.getColorIndexFromPalette (atom.group.selectedIndex, 0, atom.group.chain.selectedGroupCount - 1, 1, false);
case 87:
var m = this.vwr.ms.am[atom.mi];
return this.ce.getColorIndexFromPalette (atom.group.getBioPolymerIndexInModel (), 0, (m.isBioModel ? (m).getBioPolymerCount () : 0) - 1, 1, false);
case 76:
return this.ce.getColorIndexFromPalette (atom.group.getSelectedMonomerIndex (), 0, atom.group.getSelectedMonomerCount () - 1, 1, false);
case 77:
return this.ce.getColorIndexFromPalette (modelSet.getMoleculeIndex (atom.i, true), 0, modelSet.getMoleculeCountInModel (atom.mi) - 1, 0, false);
case 14:
modelIndex = atom.mi;
return this.ce.getColorIndexFromPalette (modelSet.getAltLocIndexInModel (modelIndex, atom.altloc), 0, modelSet.getAltLocCountInModel (modelIndex), 0, false);
case 15:
modelIndex = atom.mi;
return this.ce.getColorIndexFromPalette (modelSet.getInsertionCodeIndexInModel (modelIndex, atom.group.getInsertionCode ()), 0, modelSet.getInsertionCountInModel (modelIndex), 0, false);
case 16:
id = atom.getAtomicAndIsotopeNumber ();
argb = this.getJmolOrRasmolArgb (id, 1073741991);
break;
case 17:
id = atom.getAtomicAndIsotopeNumber ();
argb = this.getJmolOrRasmolArgb (id, 1073742116);
break;
case 7:
argb = atom.group.getProteinStructureSubType ().getColor ();
break;
case 10:
var chain = atom.getChainID ();
if (JU.ColorEncoder.argbsChainAtom == null) {
JU.ColorEncoder.argbsChainAtom = this.getArgbs (1140850689);
JU.ColorEncoder.argbsChainHetero = this.getArgbs (1612709894);
}chain = ((chain < 0 ? 0 : chain >= 256 ? chain - 256 : chain) & 0x1F) % JU.ColorEncoder.argbsChainAtom.length;
argb = (atom.isHetero () ? JU.ColorEncoder.argbsChainHetero : JU.ColorEncoder.argbsChainAtom)[chain];
break;
}
return (argb == 0 ? 22 : JU.C.getColix (argb));
}, "JM.Atom,~N");
Clazz.defineMethod (c$, "getArgbs", 
 function (tok) {
return this.vwr.getJBR ().getArgbs (tok);
}, "~N");
Clazz.defineMethod (c$, "getJmolOrRasmolArgb", 
 function (id, argb) {
switch (argb) {
case 1073741991:
if (id >= JU.Elements.elementNumberMax) break;
return this.ce.getArgbFromPalette (id, 0, 0, 2);
case 1073742116:
if (id >= JU.Elements.elementNumberMax) break;
return this.ce.getArgbFromPalette (id, 0, 0, 3);
default:
return argb;
}
return JV.JC.altArgbsCpk[JU.Elements.altElementIndexFromNumber (id)];
}, "~N,~N");
Clazz.defineMethod (c$, "setElementArgb", 
function (id, argb) {
if (argb == 1073741991 && this.argbsCpk === J.c.PAL.argbsCpk) return 0;
argb = this.getJmolOrRasmolArgb (id, argb);
if (this.argbsCpk === J.c.PAL.argbsCpk) {
this.argbsCpk = JU.AU.arrayCopyRangeI (J.c.PAL.argbsCpk, 0, -1);
this.altArgbsCpk = JU.AU.arrayCopyRangeI (JV.JC.altArgbsCpk, 0, -1);
}if (id < JU.Elements.elementNumberMax) {
if (argb == 2147483647) return JU.C.getColix (this.argbsCpk[id]);
this.argbsCpk[id] = argb;
this.g3d.changeColixArgb (id, argb);
return 0;
}id = JU.Elements.altElementIndexFromNumber (id);
this.altArgbsCpk[id] = argb;
this.g3d.changeColixArgb (JU.Elements.elementNumberMax + id, argb);
return 0;
}, "~N,~N");
Clazz.defineMethod (c$, "getPropertyColorRange", 
function () {
return (this.ce.isReversed ?  Clazz.newFloatArray (-1, [this.ce.hi, this.ce.lo]) :  Clazz.newFloatArray (-1, [this.ce.lo, this.ce.hi]));
});
Clazz.defineMethod (c$, "setPropertyColorRangeData", 
function (data, bs) {
this.colorData = data;
this.ce.currentPalette = this.ce.createColorScheme (this.vwr.g.propertyColorScheme, true, false);
this.ce.hi = -3.4028235E38;
this.ce.lo = 3.4028235E38;
if (data == null) return;
var isAll = (bs == null);
var d;
var i0 = (isAll ? data.length - 1 : bs.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bs.nextSetBit (i + 1))) {
if (Float.isNaN (d = data[i])) continue;
this.ce.hi = Math.max (this.ce.hi, d);
this.ce.lo = Math.min (this.ce.lo, d);
}
this.setPropertyColorRange (this.ce.lo, this.ce.hi);
}, "~A,JU.BS");
Clazz.defineMethod (c$, "setPropertyColorRange", 
function (min, max) {
this.ce.setRange (min, max, min > max);
if (JU.Logger.debugging) JU.Logger.debug ("ColorManager: color \"" + this.ce.getCurrentColorSchemeName () + "\" range " + min + " " + max);
}, "~N,~N");
Clazz.defineMethod (c$, "setPropertyColorScheme", 
function (colorScheme, isTranslucent, isOverloaded) {
var isReset = (colorScheme.length == 0);
if (isReset) colorScheme = "=";
var range = this.getPropertyColorRange ();
this.ce.currentPalette = this.ce.createColorScheme (colorScheme, true, isOverloaded);
if (!isReset) this.setPropertyColorRange (range[0], range[1]);
this.ce.isTranslucent = isTranslucent;
}, "~S,~B,~B");
Clazz.defineMethod (c$, "getColorSchemeList", 
function (colorScheme) {
var iPt = (colorScheme == null || colorScheme.length == 0) ? this.ce.currentPalette : this.ce.createColorScheme (colorScheme, true, false);
return JU.ColorEncoder.getColorSchemeList (this.ce.getColorSchemeArray (iPt));
}, "~S");
Clazz.defineMethod (c$, "getColorEncoder", 
function (colorScheme) {
if (colorScheme == null || colorScheme.length == 0) return this.ce;
var c =  new JU.ColorEncoder (this.ce, this.vwr);
c.currentPalette = c.createColorScheme (colorScheme, false, true);
return (c.currentPalette == 2147483647 ? null : c);
}, "~S");
});
