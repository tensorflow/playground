Clazz.declarePackage ("JV");
Clazz.load (["JU.BS"], "JV.SelectionManager", ["JU.AU", "J.i18n.GT", "JU.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.listeners = null;
this.bsHidden = null;
this.bsSelection = null;
this.bsFixed = null;
this.bsSubset = null;
this.bsDeleted = null;
this.noneSelected = null;
this.empty = 1;
this.hideNotSelected = false;
this.bsTemp = null;
Clazz.instantialize (this, arguments);
}, JV, "SelectionManager");
Clazz.prepareFields (c$, function () {
this.listeners =  new Array (0);
this.bsHidden =  new JU.BS ();
this.bsSelection =  new JU.BS ();
this.bsFixed =  new JU.BS ();
this.bsTemp =  new JU.BS ();
});
Clazz.makeConstructor (c$, 
function (vwr) {
this.vwr = vwr;
}, "JV.Viewer");
Clazz.defineMethod (c$, "processDeletedModelAtoms", 
function (bsAtoms) {
JU.BSUtil.deleteBits (this.bsDeleted, bsAtoms);
JU.BSUtil.deleteBits (this.bsSubset, bsAtoms);
JU.BSUtil.deleteBits (this.bsFixed, bsAtoms);
JU.BSUtil.deleteBits (this.bsHidden, bsAtoms);
var bs = JU.BSUtil.copy (this.bsSelection);
JU.BSUtil.deleteBits (bs, bsAtoms);
this.setSelectionSet (bs, 0);
this.selectionChanged (false);
}, "JU.BS");
Clazz.defineMethod (c$, "clear", 
function () {
this.clearSelection (true);
this.setSelectionSubset (null);
this.hide (null, null, 0, true);
this.bsDeleted = null;
this.setMotionFixedAtoms (null);
});
Clazz.defineMethod (c$, "display", 
function (modelSet, bs, addRemove, isQuiet) {
switch (addRemove) {
default:
var bsNotSubset = (this.bsSubset == null ? null : JU.BSUtil.andNot (JU.BSUtil.copy (this.bsHidden), this.bsSubset));
var bsAll = modelSet.getModelAtomBitSetIncludingDeleted (-1, false);
this.bsHidden.or (bsAll);
if (bsNotSubset != null) {
this.bsHidden.and (this.bsSubset);
this.bsHidden.or (bsNotSubset);
}case 1275069441:
if (bs != null) this.bsHidden.andNot (bs);
break;
case 1073742119:
if (bs != null) this.bsHidden.or (bs);
break;
}
JU.BSUtil.andNot (this.bsHidden, this.bsDeleted);
modelSet.setBsHidden (this.bsHidden);
if (!isQuiet) this.vwr.reportSelection (J.i18n.GT.i (J.i18n.GT.$ ("{0} atoms hidden"), this.bsHidden.cardinality ()));
}, "JM.ModelSet,JU.BS,~N,~B");
Clazz.defineMethod (c$, "hide", 
function (modelSet, bs, addRemove, isQuiet) {
var bsNotSubset = (addRemove == 0 || this.bsSubset == null ? null : JU.BSUtil.andNot (JU.BSUtil.copy (this.bsHidden), this.bsSubset));
JV.SelectionManager.setBitSet (this.bsHidden, bs, addRemove);
if (bsNotSubset != null) this.bsHidden.or (bsNotSubset);
if (modelSet != null) modelSet.setBsHidden (this.bsHidden);
if (!isQuiet) this.vwr.reportSelection (J.i18n.GT.i (J.i18n.GT.$ ("{0} atoms hidden"), this.bsHidden.cardinality ()));
}, "JM.ModelSet,JU.BS,~N,~B");
Clazz.defineMethod (c$, "setSelectionSet", 
function (set, addRemove) {
JV.SelectionManager.setBitSet (this.bsSelection, set, addRemove);
this.empty = -1;
}, "JU.BS,~N");
c$.setBitSet = Clazz.defineMethod (c$, "setBitSet", 
 function (bsWhat, bs, addRemove) {
switch (addRemove) {
default:
bsWhat.clearAll ();
case 1275069441:
if (bs != null) bsWhat.or (bs);
break;
case 1073742119:
if (bs != null) bsWhat.andNot (bs);
break;
}
}, "JU.BS,JU.BS,~N");
Clazz.defineMethod (c$, "getHiddenSet", 
function () {
return this.bsHidden;
});
Clazz.defineMethod (c$, "getHideNotSelected", 
function () {
return this.hideNotSelected;
});
Clazz.defineMethod (c$, "setHideNotSelected", 
function (TF) {
this.hideNotSelected = TF;
if (TF) this.selectionChanged (false);
}, "~B");
Clazz.defineMethod (c$, "isSelected", 
function (atomIndex) {
return (atomIndex >= 0 && this.bsSelection.get (atomIndex));
}, "~N");
Clazz.defineMethod (c$, "select", 
function (bs, addRemove, isQuiet) {
if (bs == null) {
this.selectAll (true);
if (!this.vwr.getBoolean (1612709900)) this.excludeSelectionSet (this.vwr.ms.getAtoms (1612709900, null));
if (!this.vwr.getBoolean (1612709894)) this.excludeSelectionSet (this.vwr.ms.getAtoms (1612709894, null));
} else {
this.setSelectionSet (bs, addRemove);
if (!this.vwr.getBoolean (1612709900)) this.excludeSelectionSet (this.vwr.ms.getAtoms (1612709900, null));
if (!this.vwr.getBoolean (1612709894)) this.excludeSelectionSet (this.vwr.ms.getAtoms (1612709894, null));
}this.selectionChanged (false);
var reportChime = this.vwr.getBoolean (603979879);
if (!reportChime && isQuiet) return;
var n = this.getSelectionCount ();
if (reportChime) this.vwr.getChimeMessenger ().reportSelection (n);
 else if (!isQuiet) this.vwr.reportSelection (J.i18n.GT.i (J.i18n.GT.$ ("{0} atoms selected"), n));
}, "JU.BS,~N,~B");
Clazz.defineMethod (c$, "selectAll", 
function (isQuiet) {
var count = this.vwr.ms.ac;
this.empty = (count == 0) ? 1 : 0;
for (var i = count; --i >= 0; ) this.bsSelection.set (i);

JU.BSUtil.andNot (this.bsSelection, this.bsDeleted);
this.selectionChanged (isQuiet);
}, "~B");
Clazz.defineMethod (c$, "clearSelection", 
function (isQuiet) {
this.setHideNotSelected (false);
this.bsSelection.clearAll ();
this.empty = 1;
this.selectionChanged (isQuiet);
}, "~B");
Clazz.defineMethod (c$, "isAtomSelected", 
function (atomIndex) {
return ((this.bsSubset == null || this.bsSubset.get (atomIndex)) && this.bsDeleted == null || !this.bsDeleted.get (atomIndex)) && this.bsSelection.get (atomIndex);
}, "~N");
Clazz.defineMethod (c$, "setSelectedAtom", 
function (atomIndex, TF) {
if (atomIndex < 0) {
this.selectionChanged (true);
return;
}if (this.bsSubset != null && !this.bsSubset.get (atomIndex) || this.bsDeleted != null && this.bsDeleted.get (atomIndex)) return;
this.bsSelection.setBitTo (atomIndex, TF);
if (TF) this.empty = 0;
 else this.empty = -1;
}, "~N,~B");
Clazz.defineMethod (c$, "setSelectionSubset", 
function (bs) {
this.bsSubset = bs;
}, "JU.BS");
Clazz.defineMethod (c$, "isInSelectionSubset", 
function (atomIndex) {
return (atomIndex < 0 || this.bsSubset == null || this.bsSubset.get (atomIndex));
}, "~N");
Clazz.defineMethod (c$, "invertSelection", 
function () {
JU.BSUtil.invertInPlace (this.bsSelection, this.vwr.ms.ac);
this.empty = (this.bsSelection.length () > 0 ? 0 : 1);
this.selectionChanged (false);
});
Clazz.defineMethod (c$, "excludeSelectionSet", 
 function (setExclude) {
if (setExclude == null || this.empty == 1) return;
this.bsSelection.andNot (setExclude);
this.empty = -1;
}, "JU.BS");
Clazz.defineMethod (c$, "getSelectionCount", 
function () {
if (this.empty == 1) return 0;
this.empty = 1;
var bs;
if (this.bsSubset == null) {
bs = this.bsSelection;
} else {
this.bsTemp.clearAll ();
this.bsTemp.or (this.bsSubset);
this.bsTemp.and (this.bsSelection);
bs = this.bsTemp;
}var count = bs.cardinality ();
if (count > 0) this.empty = 0;
return count;
});
Clazz.defineMethod (c$, "addListener", 
function (listener) {
for (var i = this.listeners.length; --i >= 0; ) if (this.listeners[i] === listener) {
this.listeners[i] = null;
break;
}
var len = this.listeners.length;
for (var i = len; --i >= 0; ) if (this.listeners[i] == null) {
this.listeners[i] = listener;
return;
}
if (this.listeners.length == 0) this.listeners =  new Array (1);
 else this.listeners = JU.AU.doubleLength (this.listeners);
this.listeners[len] = listener;
}, "J.api.JmolSelectionListener");
Clazz.defineMethod (c$, "selectionChanged", 
 function (isQuiet) {
if (this.hideNotSelected) this.hide (this.vwr.ms, JU.BSUtil.copyInvert (this.bsSelection, this.vwr.ms.ac), 0, isQuiet);
if (isQuiet || this.listeners.length == 0) return;
for (var i = this.listeners.length; --i >= 0; ) if (this.listeners[i] != null) this.listeners[i].selectionChanged (this.bsSelection);

}, "~B");
Clazz.defineMethod (c$, "deleteAtoms", 
function (bs) {
var bsNew = JU.BSUtil.copy (bs);
if (this.bsDeleted == null) {
this.bsDeleted = bsNew;
} else {
bsNew.andNot (this.bsDeleted);
this.bsDeleted.or (bs);
}this.bsHidden.andNot (this.bsDeleted);
this.bsSelection.andNot (this.bsDeleted);
return bsNew.cardinality ();
}, "JU.BS");
Clazz.defineMethod (c$, "getSelectedAtoms", 
function () {
if (this.bsSubset == null) return this.bsSelection;
var bs = JU.BSUtil.copy (this.bsSelection);
bs.and (this.bsSubset);
return bs;
});
Clazz.defineMethod (c$, "getSelectedAtomsNoSubset", 
function () {
return JU.BSUtil.copy (this.bsSelection);
});
Clazz.defineMethod (c$, "excludeAtoms", 
function (bs, ignoreSubset) {
if (this.bsDeleted != null) bs.andNot (this.bsDeleted);
if (!ignoreSubset && this.bsSubset != null) (bs = JU.BSUtil.copy (bs)).and (this.bsSubset);
return bs;
}, "JU.BS,~B");
Clazz.defineMethod (c$, "setMotionFixedAtoms", 
function (bs) {
this.bsFixed.clearAll ();
if (bs != null) this.bsFixed.or (bs);
}, "JU.BS");
Clazz.defineMethod (c$, "getMotionFixedAtoms", 
function () {
return this.bsFixed;
});
Clazz.defineStatics (c$,
"TRUE", 1,
"FALSE", 0,
"UNKNOWN", -1);
});
