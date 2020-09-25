Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.AtomShape", "java.util.Hashtable", "JU.P3"], "J.shape.Labels", ["JU.AU", "$.BS", "$.Lst", "$.PT", "J.c.PAL", "JM.LabelToken", "$.Text", "JS.SV", "JU.BSUtil", "$.C", "$.Font", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.strings = null;
this.formats = null;
this.bgcolixes = null;
this.fids = null;
this.offsets = null;
this.atomLabels = null;
this.labelBoxes = null;
this.bsFontSet = null;
this.bsBgColixSet = null;
this.defaultOffset = 0;
this.defaultAlignment = 0;
this.defaultZPos = 0;
this.defaultFontId = 0;
this.defaultColix = 0;
this.defaultBgcolix = 0;
this.defaultPaletteID = 0;
this.defaultPointer = 0;
this.zeroFontId = 0;
this.defaultsOnlyForNone = true;
this.setDefaults = false;
this.isScaled = false;
this.scalePixelsPerMicron = 0;
this.ptTemp = null;
this.pickedAtom = -1;
this.lastPicked = -1;
this.pickedOffset = 0;
this.pickedX = 0;
this.pickedY = 0;
Clazz.instantialize (this, arguments);
}, J.shape, "Labels", J.shape.AtomShape);
Clazz.prepareFields (c$, function () {
this.atomLabels =  new java.util.Hashtable ();
this.ptTemp =  new JU.P3 ();
});
Clazz.overrideMethod (c$, "initShape", 
function () {
this.defaultFontId = this.zeroFontId = this.vwr.gdata.getFont3DFSS ("SansSerif", "Plain", 13).fid;
this.defaultColix = 0;
this.defaultBgcolix = 0;
this.defaultOffset = JV.JC.LABEL_DEFAULT_OFFSET;
this.defaultAlignment = 4;
this.defaultPointer = 0;
this.defaultZPos = 0;
this.translucentAllowed = false;
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.isActive = true;
if ("setDefaults" === propertyName) {
this.setDefaults = (value).booleanValue ();
return;
}if ("color" === propertyName) {
var pid = J.c.PAL.pidOf (value);
var colix = JU.C.getColixO (value);
if (!this.setDefaults) {
var n = this.checkColixLength (colix, bsSelected.length ());
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < n; i = bsSelected.nextSetBit (i + 1)) this.setLabelColix (i, colix, pid);

}if (this.setDefaults || !this.defaultsOnlyForNone) {
this.defaultColix = colix;
this.defaultPaletteID = pid;
}return;
}if ("scalereference" === propertyName) {
if (this.strings == null) return;
var val = (value).floatValue ();
var scalePixelsPerMicron = (val == 0 ? 0 : 10000 / val);
var n = Math.min (this.ac, this.strings.length);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < n; i = bsSelected.nextSetBit (i + 1)) {
var text = this.getLabel (i);
if (text == null) {
text = JM.Text.newLabel (this.vwr, null, this.strings[i], 0, 0, 0, scalePixelsPerMicron);
this.putLabel (i, text);
} else {
text.setScalePixelsPerMicron (scalePixelsPerMicron);
}}
return;
}if ("label" === propertyName) {
var isPicked = (this.isPickingMode () && bsSelected.cardinality () == 1 && bsSelected.nextSetBit (0) == this.lastPicked);
this.setScaling ();
var tokens = null;
var nbs = this.checkStringLength (bsSelected.length ());
if (this.defaultColix != 0 || this.defaultPaletteID != 0) this.checkColixLength (this.defaultColix, bsSelected.length ());
if (this.defaultBgcolix != 0) this.checkBgColixLength (this.defaultBgcolix, bsSelected.length ());
if (Clazz.instanceOf (value, JU.Lst)) {
var list = value;
var n = list.size ();
tokens =  Clazz.newArray (-1, [null]);
for (var pt = 0, i = bsSelected.nextSetBit (0); i >= 0 && i < nbs; i = bsSelected.nextSetBit (i + 1)) {
if (pt >= n) {
this.setLabel (J.shape.Labels.nullToken, "", i, !isPicked);
continue;
}tokens[0] = null;
this.setLabel (tokens, JS.SV.sValue (list.get (pt++)), i, !isPicked);
}
} else {
var strLabel = value;
tokens = (strLabel == null || strLabel.length == 0 ? J.shape.Labels.nullToken :  Clazz.newArray (-1, [null]));
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setLabel (tokens, strLabel, i, !isPicked);

}return;
}if (propertyName.startsWith ("label:")) {
this.setScaling ();
this.checkStringLength (this.ac);
var label = propertyName.substring (6);
if (label.length == 0) label = null;
this.setLabel ( Clazz.newArray (-1, [null]), label, (value).intValue (), false);
return;
}if ("clearBoxes" === propertyName) {
this.labelBoxes = null;
return;
}if ("translucency" === propertyName || "bgtranslucency" === propertyName) {
return;
}if ("bgcolor" === propertyName) {
this.isActive = true;
if (this.bsBgColixSet == null) this.bsBgColixSet = JU.BS.newN (this.ac);
var bgcolix = JU.C.getColixO (value);
if (!this.setDefaults) {
var n = this.checkBgColixLength (bgcolix, bsSelected.length ());
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < n; i = bsSelected.nextSetBit (i + 1)) this.setBgcolix (i, bgcolix);

}if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultBgcolix = bgcolix;
return;
}if (this.bsFontSet == null) this.bsFontSet = JU.BS.newN (this.ac);
if ("fontsize" === propertyName) {
var fontsize = (value).intValue ();
if (fontsize < 0) {
this.fids = null;
return;
}var fid = this.vwr.gdata.getFontFid (fontsize);
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setFont (i, fid);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultFontId = fid;
return;
}if ("font" === propertyName) {
var fid = (value).fid;
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setFont (i, fid);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultFontId = fid;
return;
}if ("offset" === propertyName) {
if (!(Clazz.instanceOf (value, Integer))) {
if (!this.setDefaults) {
this.checkColixLength (-1, this.ac);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setPymolOffset (i, value);

}return;
}var offset = (value).intValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setOffsets (i, offset);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultOffset = offset;
return;
}if ("align" === propertyName) {
var type = value;
var hAlignment = (type.equalsIgnoreCase ("right") ? 12 : type.equalsIgnoreCase ("center") ? 8 : 4);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setHorizAlignment (i, hAlignment);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultAlignment = hAlignment;
return;
}if ("pointer" === propertyName) {
var pointer = (value).intValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setPointer (i, pointer);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultPointer = pointer;
return;
}if ("front" === propertyName) {
var TF = (value).booleanValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setZPos (i, 32, TF);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultZPos = (TF ? 32 : 0);
return;
}if ("group" === propertyName) {
var TF = (value).booleanValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) this.setZPos (i, 16, TF);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultZPos = (TF ? 16 : 0);
return;
}if ("display" === propertyName || "toggleLabel" === propertyName) {
var mode = ("toggleLabel" === propertyName ? 0 : (value).booleanValue () ? 1 : -1);
if (this.mads == null) this.mads =  Clazz.newShortArray (this.ac, 0);
var strLabelPDB = null;
var tokensPDB = null;
var strLabelUNK = null;
var tokensUNK = null;
var strLabel;
var tokens;
var nstr = this.checkStringLength (bsSelected.length ());
var bgcolix = this.defaultBgcolix;
var nbg = this.checkBgColixLength (bgcolix, bsSelected.length ());
var thisMad = (mode >= 0 ? 1 : -1);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.ac; i = bsSelected.nextSetBit (i + 1)) {
var atom = this.atoms[i];
if (i < nstr && this.strings[i] != null) {
this.mads[i] = (mode == 1 || mode == 0 && this.mads[i] < 0 ? 1 : -1);
} else {
this.mads[i] = thisMad;
if (atom.getGroup3 (false).equals ("UNK")) {
if (strLabelUNK == null) {
strLabelUNK = this.vwr.getStandardLabelFormat (1);
tokensUNK = JM.LabelToken.compile (this.vwr, strLabelUNK, '\0', null);
}strLabel = strLabelUNK;
tokens = tokensUNK;
} else {
if (strLabelPDB == null) {
strLabelPDB = this.vwr.getStandardLabelFormat (2);
tokensPDB = JM.LabelToken.compile (this.vwr, strLabelPDB, '\0', null);
}strLabel = strLabelPDB;
tokens = tokensPDB;
}this.strings[i] = JM.LabelToken.formatLabelAtomArray (this.vwr, atom, tokens, '\0', null, this.ptTemp);
this.formats[i] = strLabel;
this.bsSizeSet.set (i);
if (i < nbg && !this.bsBgColixSet.get (i)) this.setBgcolix (i, this.defaultBgcolix);
}atom.setShapeVisibility (this.vf, this.strings != null && i < this.strings.length && this.strings[i] != null && this.mads[i] >= 0);
}
return;
}if ("pymolLabels" === propertyName) {
this.setPymolLabels (value, bsSelected);
return;
}if (propertyName === "deleteModelAtoms") {
this.labelBoxes = null;
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
this.fids = JU.AU.deleteElements (this.fids, firstAtomDeleted, nAtomsDeleted);
this.bgcolixes = JU.AU.deleteElements (this.bgcolixes, firstAtomDeleted, nAtomsDeleted);
this.offsets = JU.AU.deleteElements (this.offsets, firstAtomDeleted, nAtomsDeleted);
this.formats = JU.AU.deleteElements (this.formats, firstAtomDeleted, nAtomsDeleted);
this.strings = JU.AU.deleteElements (this.strings, firstAtomDeleted, nAtomsDeleted);
JU.BSUtil.deleteBits (this.bsFontSet, bsSelected);
JU.BSUtil.deleteBits (this.bsBgColixSet, bsSelected);
}this.setPropAS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "isPickingMode", 
 function () {
return (this.vwr.getPickingMode () == 2 && this.labelBoxes != null);
});
Clazz.defineMethod (c$, "checkStringLength", 
 function (n) {
n = Math.min (this.ac, n);
if (this.strings == null || n > this.strings.length) {
this.formats = JU.AU.ensureLengthS (this.formats, n);
this.strings = JU.AU.ensureLengthS (this.strings, n);
if (this.bsSizeSet == null) this.bsSizeSet = JU.BS.newN (n);
}return n;
}, "~N");
Clazz.defineMethod (c$, "checkBgColixLength", 
 function (colix, n) {
n = Math.min (this.ac, n);
if (colix == 0) return (this.bgcolixes == null ? 0 : this.bgcolixes.length);
if (this.bgcolixes == null || n > this.bgcolixes.length) this.bgcolixes = JU.AU.ensureLengthShort (this.bgcolixes, n);
return n;
}, "~N,~N");
Clazz.defineMethod (c$, "setPymolLabels", 
 function (labels, bsSelected) {
this.setScaling ();
var n = this.checkStringLength (this.ac);
this.checkColixLength (-1, n);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < n; i = bsSelected.nextSetBit (i + 1)) this.setPymolLabel (i, labels.get (Integer.$valueOf (i)), null);

}, "java.util.Map,JU.BS");
Clazz.defineMethod (c$, "setPymolOffset", 
 function (i, value) {
var text = this.getLabel (i);
if (text == null) {
if (this.strings == null || i >= this.strings.length || this.strings[i] == null) return;
var fid = (this.bsFontSet != null && this.bsFontSet.get (i) ? this.fids[i] : -1);
if (fid < 0) this.setFont (i, fid = this.defaultFontId);
text = JM.Text.newLabel (this.vwr, JU.Font.getFont3D (fid), this.strings[i], this.getColix2 (i, this.atoms[i], false), this.getColix2 (i, this.atoms[i], true), 0, this.scalePixelsPerMicron);
this.setPymolLabel (i, text, this.formats[i]);
}text.pymolOffset = value;
}, "~N,~A");
Clazz.defineMethod (c$, "setScaling", 
 function () {
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet = JU.BS.newN (this.ac);
this.isScaled = this.vwr.getBoolean (603979845);
this.scalePixelsPerMicron = (this.isScaled ? this.vwr.getScalePixelsPerAngstrom (false) * 10000 : 0);
});
Clazz.defineMethod (c$, "setPymolLabel", 
 function (i, t, format) {
if (t == null) return;
var label = t.text;
var atom = this.atoms[i];
this.addString (atom, i, label, format == null ? JU.PT.rep (label, "%", "%%") : format);
atom.setShapeVisibility (this.vf, true);
if (t.colix >= 0) this.setLabelColix (i, t.colix, J.c.PAL.UNKNOWN.id);
this.setFont (i, t.font.fid);
this.putLabel (i, t);
}, "~N,JM.Text,~S");
Clazz.defineMethod (c$, "setLabel", 
 function (temp, strLabel, i, doAll) {
var atom = this.atoms[i];
var tokens = temp[0];
if (tokens == null) tokens = temp[0] = JM.LabelToken.compile (this.vwr, strLabel, '\0', null);
var label = (tokens == null ? null : JM.LabelToken.formatLabelAtomArray (this.vwr, atom, tokens, '\0', null, this.ptTemp));
var isNew = this.addString (atom, i, label, strLabel);
doAll = new Boolean (doAll | (isNew || label == null)).valueOf ();
var text = this.getLabel (i);
if (this.isScaled && doAll) {
text = JM.Text.newLabel (this.vwr, null, label, 0, 0, 0, this.scalePixelsPerMicron);
this.putLabel (i, text);
} else if (text != null && label != null) {
text.setText (label);
text.textUnformatted = strLabel;
}if (!doAll) return;
if (this.defaultOffset != JV.JC.LABEL_DEFAULT_OFFSET) this.setOffsets (i, this.defaultOffset);
if (this.defaultAlignment != 4) this.setHorizAlignment (i, this.defaultAlignment);
if ((this.defaultZPos & 32) != 0) this.setZPos (i, 32, true);
 else if ((this.defaultZPos & 16) != 0) this.setZPos (i, 16, true);
if (this.defaultPointer != 0) this.setPointer (i, this.defaultPointer);
if (this.defaultColix != 0 || this.defaultPaletteID != 0) this.setLabelColix (i, this.defaultColix, this.defaultPaletteID);
if (this.defaultBgcolix != 0) this.setBgcolix (i, this.defaultBgcolix);
if (this.defaultFontId != this.zeroFontId) this.setFont (i, this.defaultFontId);
}, "~A,~S,~N,~B");
Clazz.defineMethod (c$, "addString", 
 function (atom, i, label, strLabel) {
atom.setShapeVisibility (this.vf, label != null);
var notNull = (strLabel != null);
var isNew = (this.strings[i] == null);
this.strings[i] = label;
this.formats[i] = (notNull && strLabel.indexOf ("%{") >= 0 ? label : strLabel);
this.bsSizeSet.setBitTo (i, notNull);
return isNew;
}, "JM.Atom,~N,~S,~S");
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
if (property.equals ("offsets")) return this.offsets;
if (property.equals ("label")) return (this.strings != null && index < this.strings.length && this.strings[index] != null ? this.strings[index] : "");
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "putLabel", 
function (i, text) {
if (text == null) this.atomLabels.remove (Integer.$valueOf (i));
 else {
this.atomLabels.put (Integer.$valueOf (i), text);
text.textUnformatted = this.formats[i];
}}, "~N,JM.Text");
Clazz.defineMethod (c$, "getLabel", 
function (i) {
return this.atomLabels.get (Integer.$valueOf (i));
}, "~N");
Clazz.defineMethod (c$, "putBox", 
function (i, boxXY) {
if (this.labelBoxes == null) this.labelBoxes =  new java.util.Hashtable ();
this.labelBoxes.put (Integer.$valueOf (i), boxXY);
}, "~N,~A");
Clazz.defineMethod (c$, "getBox", 
function (i) {
if (this.labelBoxes == null) return null;
return this.labelBoxes.get (Integer.$valueOf (i));
}, "~N");
Clazz.defineMethod (c$, "setLabelColix", 
 function (i, colix, pid) {
this.setColixAndPalette (colix, pid, i);
var text;
if (this.colixes != null && ((text = this.getLabel (i)) != null)) text.colix = this.colixes[i];
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setBgcolix", 
 function (i, bgcolix) {
this.bgcolixes[i] = bgcolix;
this.bsBgColixSet.setBitTo (i, bgcolix != 0);
var text = this.getLabel (i);
if (text != null) text.bgcolix = bgcolix;
}, "~N,~N");
Clazz.defineMethod (c$, "setOffsets", 
 function (i, offset) {
if (this.offsets == null || i >= this.offsets.length) {
if (offset == JV.JC.LABEL_DEFAULT_OFFSET) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, this.ac);
}this.offsets[i] = (this.offsets[i] & 63) | offset;
var text = this.getLabel (i);
if (text != null) text.setOffset (offset);
}, "~N,~N");
Clazz.defineMethod (c$, "setHorizAlignment", 
 function (i, hAlign) {
if (this.offsets == null || i >= this.offsets.length) {
switch (hAlign) {
case 0:
case 4:
return;
}
this.offsets = JU.AU.ensureLengthI (this.offsets, this.ac);
}if (hAlign == 0) hAlign = 4;
this.offsets[i] = JV.JC.setHorizAlignment (this.offsets[i], hAlign);
var text = this.getLabel (i);
if (text != null) text.setAlignment (hAlign);
}, "~N,~N");
Clazz.defineMethod (c$, "setPointer", 
 function (i, pointer) {
if (this.offsets == null || i >= this.offsets.length) {
if (pointer == 0) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, this.ac);
}this.offsets[i] = JV.JC.setPointer (this.offsets[i], pointer);
var text = this.getLabel (i);
if (text != null) text.pointer = pointer;
}, "~N,~N");
Clazz.defineMethod (c$, "setZPos", 
 function (i, flag, TF) {
if (this.offsets == null || i >= this.offsets.length) {
if (!TF) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, this.ac);
}this.offsets[i] = JV.JC.setZPosition (this.offsets[i], TF ? flag : 0);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "setFont", 
 function (i, fid) {
if (this.fids == null || i >= this.fids.length) {
if (fid == this.zeroFontId) return;
this.fids = JU.AU.ensureLengthByte (this.fids, this.ac);
}this.fids[i] = fid;
this.bsFontSet.set (i);
var text = this.getLabel (i);
if (text != null) {
text.setFontFromFid (fid);
}}, "~N,~N");
Clazz.overrideMethod (c$, "setAtomClickability", 
function () {
if (this.strings == null) return;
for (var i = this.strings.length; --i >= 0; ) {
var label = this.strings[i];
if (label != null && this.ms.at.length > i && !this.ms.isAtomHidden (i)) this.ms.at[i].setClickable (this.vf);
}
});
Clazz.overrideMethod (c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible, drawPicking) {
if (!this.isPickingMode ()) return null;
var iAtom = this.findNearestLabel (x, y);
if (iAtom < 0) return null;
var map =  new java.util.Hashtable ();
map.put ("type", "label");
map.put ("atomIndex", Integer.$valueOf (iAtom));
this.lastPicked = iAtom;
return map;
}, "~N,~N,~N,JU.BS,~B");
Clazz.overrideMethod (c$, "checkObjectDragged", 
function (prevX, prevY, x, y, dragAction, bsVisible) {
if (!this.isPickingMode ()) return false;
if (prevX == -2147483648) {
var iAtom = this.findNearestLabel (x, y);
if (iAtom >= 0) {
this.pickedAtom = iAtom;
this.lastPicked = this.pickedAtom;
this.vwr.acm.setDragAtomIndex (iAtom);
this.pickedX = x;
this.pickedY = y;
this.pickedOffset = (this.offsets == null || this.pickedAtom >= this.offsets.length ? JV.JC.LABEL_DEFAULT_OFFSET : this.offsets[this.pickedAtom]);
return true;
}return false;
}if (prevX == 2147483647) this.pickedAtom = -1;
if (this.pickedAtom < 0) return false;
this.move2D (this.pickedAtom, x, y);
return true;
}, "~N,~N,~N,~N,~N,JU.BS");
Clazz.defineMethod (c$, "findNearestLabel", 
 function (x, y) {
if (this.labelBoxes == null) return -1;
var dmin = 3.4028235E38;
var imin = -1;
var zmin = 3.4028235E38;
var afactor = (this.vwr.antialiased ? 2 : 1);
for (var entry, $entry = this.labelBoxes.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
if (!this.atoms[entry.getKey ().intValue ()].isVisible (this.vf | 9)) continue;
var boxXY = entry.getValue ();
var dx = (x - boxXY[0]) * afactor;
var dy = (y - boxXY[1]) * afactor;
if (dx <= 0 || dy <= 0 || dx >= boxXY[2] || dy >= boxXY[3] || boxXY[4] > zmin) continue;
zmin = boxXY[4];
var d = Math.min (Math.abs (dx - boxXY[2] / 2), Math.abs (dy - boxXY[3] / 2));
if (d <= dmin) {
dmin = d;
imin = entry.getKey ().intValue ();
}}
return imin;
}, "~N,~N");
Clazz.defineMethod (c$, "move2D", 
 function (pickedAtom, x, y) {
var xOffset = JV.JC.getXOffset (this.pickedOffset);
var yOffset = JV.JC.getYOffset (this.pickedOffset);
xOffset += x - this.pickedX;
yOffset -= y - this.pickedY;
var offset = JV.JC.getOffset (xOffset, yOffset, true);
this.setOffsets (pickedAtom, offset);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getColix2", 
function (i, atom, isBg) {
var colix;
if (isBg) {
colix = (this.bgcolixes == null || i >= this.bgcolixes.length) ? 0 : this.bgcolixes[i];
} else {
colix = (this.colixes == null || i >= this.colixes.length) ? 0 : this.colixes[i];
colix = JU.C.getColixInherited (colix, atom.colixAtom);
if (JU.C.isColixTranslucent (colix)) colix = JU.C.getColixTranslucent3 (colix, false, 0);
}return colix;
}, "~N,JM.Atom,~B");
c$.nullToken = c$.prototype.nullToken =  Clazz.newArray (-1, [null]);
});
