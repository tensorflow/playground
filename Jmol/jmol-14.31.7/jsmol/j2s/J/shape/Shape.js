Clazz.declarePackage ("J.shape");
Clazz.load (null, "J.shape.Shape", ["J.c.PAL", "JU.C", "$.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.myType = null;
this.vwr = null;
this.ms = null;
this.shapeID = 0;
this.vf = 0;
this.translucentLevel = 0;
this.translucentAllowed = true;
this.isBioShape = false;
this.bsSizeSet = null;
this.bsColixSet = null;
Clazz.instantialize (this, arguments);
}, J.shape, "Shape");
Clazz.defineMethod (c$, "initializeShape", 
function (vwr, modelSet, shapeID) {
this.vwr = vwr;
this.shapeID = shapeID;
this.vf = JV.JC.getShapeVisibilityFlag (shapeID);
this.setModelSet (modelSet);
this.initShape ();
}, "JV.Viewer,JM.ModelSet,~N");
Clazz.defineMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
}, "JU.BS");
Clazz.defineMethod (c$, "getSize", 
function (atomIndex) {
return 0;
}, "~N");
Clazz.defineMethod (c$, "getSizeG", 
function (group) {
return 0;
}, "JM.Group");
Clazz.defineMethod (c$, "replaceGroup", 
function (g0, g1) {
}, "JM.Group,JM.Group");
Clazz.defineMethod (c$, "setModelSet", 
function (modelSet) {
this.ms = modelSet;
this.initModelSet ();
}, "JM.ModelSet");
Clazz.defineMethod (c$, "initModelSet", 
function () {
});
Clazz.defineMethod (c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
if (rd == null) this.setSize (size, bsSelected);
 else this.setSizeRD (rd, bsSelected);
}, "~N,J.atomdata.RadiusData,JU.BS");
Clazz.defineMethod (c$, "setSize", 
function (size, bsSelected) {
}, "~N,JU.BS");
Clazz.defineMethod (c$, "setSizeRD", 
function (rd, bsSelected) {
}, "J.atomdata.RadiusData,JU.BS");
Clazz.defineMethod (c$, "setPropS", 
function (propertyName, value, bsSelected) {
if (propertyName === "setProperties") {
if (bsSelected == null) bsSelected = this.vwr.bsA ();
var propertyList = value;
while (propertyList.size () > 0) {
var data = propertyList.removeItemAt (0);
this.setProperty ((data[0]).intern (), data[1], bsSelected);
}
return;
}if (propertyName === "translucentLevel") {
this.translucentLevel = (value).floatValue ();
return;
}if (propertyName === "refreshTrajectories") {
return;
}JU.Logger.warn ("unassigned " + JV.JC.shapeClassBases[this.shapeID] + " + shape setProperty:" + propertyName + ":" + value);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "getPropertyData", 
function (property, data) {
return this.getPropShape (property, data);
}, "~S,~A");
Clazz.defineMethod (c$, "getPropShape", 
function (property, data) {
if (Clazz.instanceOf (data[1], Integer)) {
var index = (data[1]).intValue ();
data[1] = this.getProperty (property, index);
return (data[1] != null);
}return false;
}, "~S,~A");
Clazz.defineMethod (c$, "getProperty", 
function (property, index) {
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "getIndexFromName", 
function (thisID) {
return -1;
}, "~S");
Clazz.defineMethod (c$, "wasClicked", 
function (x, y) {
return false;
}, "~N,~N");
Clazz.defineMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
}, "~N,~N,~A,JU.BS");
Clazz.defineMethod (c$, "checkBoundsMinMax", 
function (pointMin, pointMax) {
}, "JU.P3,JU.P3");
Clazz.defineMethod (c$, "setAtomClickability", 
function () {
});
Clazz.defineMethod (c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible, drawPicking) {
return null;
}, "~N,~N,~N,JU.BS,~B");
Clazz.defineMethod (c$, "checkObjectHovered", 
function (x, y, bsVisible) {
return false;
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "checkObjectDragged", 
function (prevX, prevY, x, y, dragAction, bsVisible) {
return false;
}, "~N,~N,~N,~N,~N,JU.BS");
Clazz.defineMethod (c$, "coordinateInRange", 
function (x, y, vertex, dmin2, ptXY) {
this.vwr.tm.transformPtScr (vertex, ptXY);
var d2 = (x - ptXY.x) * (x - ptXY.x) + (y - ptXY.y) * (y - ptXY.y);
return (d2 < dmin2 ? d2 : -1);
}, "~N,~N,JU.T3,~N,JU.P3i");
Clazz.defineMethod (c$, "getColixI", 
function (colix, paletteID, atomIndex) {
return this.getColixA (colix, paletteID, this.ms.at[atomIndex]);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getColixA", 
function (colix, paletteID, atom) {
return (colix == 2 ? this.vwr.cm.getColixAtomPalette (atom, paletteID) : colix);
}, "~N,~N,JM.Atom");
Clazz.defineMethod (c$, "getColixB", 
function (colix, pid, bond) {
return (colix == 2 ? this.vwr.cm.getColixBondPalette (bond, pid) : colix);
}, "~N,~N,JM.Bond");
Clazz.defineMethod (c$, "getShapeDetail", 
function () {
return null;
});
c$.getColix = Clazz.defineMethod (c$, "getColix", 
function (colixes, i, atom) {
return JU.C.getColixInherited ((colixes == null || i >= colixes.length ? 0 : colixes[i]), atom.colixAtom);
}, "~A,~N,JM.Atom");
c$.getFontCommand = Clazz.defineMethod (c$, "getFontCommand", 
function (type, font) {
if (font == null) return "";
return "font " + type + " " + font.getInfo ();
}, "~S,JU.Font");
c$.getColorCommandUnk = Clazz.defineMethod (c$, "getColorCommandUnk", 
function (type, colix, translucentAllowed) {
return J.shape.Shape.getColorCommand (type, J.c.PAL.UNKNOWN.id, colix, translucentAllowed);
}, "~S,~N,~B");
c$.getColorCommand = Clazz.defineMethod (c$, "getColorCommand", 
function (type, pid, colix, translucentAllowed) {
if (pid == J.c.PAL.UNKNOWN.id && colix == 0) return "";
var s = (pid == J.c.PAL.UNKNOWN.id && colix == 0 ? "" : (translucentAllowed ? J.shape.Shape.getTranslucentLabel (colix) + " " : "") + (pid != J.c.PAL.UNKNOWN.id && !J.c.PAL.isPaletteVariable (pid) ? J.c.PAL.getPaletteName (pid) : J.shape.Shape.encodeColor (colix)));
return "color " + type + " " + s;
}, "~S,~N,~N,~B");
c$.encodeColor = Clazz.defineMethod (c$, "encodeColor", 
function (colix) {
return (JU.C.isColixColorInherited (colix) ? "none" : JU.C.getHexCode (colix));
}, "~N");
c$.getTranslucentLabel = Clazz.defineMethod (c$, "getTranslucentLabel", 
function (colix) {
return (JU.C.isColixTranslucent (colix) ? JU.C.getColixTranslucencyLabel (colix) : "opaque");
}, "~N");
c$.appendCmd = Clazz.defineMethod (c$, "appendCmd", 
function (s, cmd) {
if (cmd.length == 0) return;
s.append ("  ").append (cmd).append (";\n");
}, "JU.SB,~S");
Clazz.defineStatics (c$,
"RADIUS_MAX", 4);
});
