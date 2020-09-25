Clazz.declarePackage ("J.shapebio");
Clazz.load (["J.shape.Shape"], "J.shapebio.BioShapeCollection", ["java.util.Hashtable", "JU.AU", "J.c.PAL", "J.shapebio.BioShape", "JU.BSUtil", "$.C", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atoms = null;
this.madOn = -2;
this.madHelixSheet = 3000;
this.madTurnRandom = 800;
this.madDnaRna = 5000;
this.isActive = false;
this.bioShapes = null;
Clazz.instantialize (this, arguments);
}, J.shapebio, "BioShapeCollection", J.shape.Shape);
Clazz.overrideMethod (c$, "initModelSet", 
function () {
this.isBioShape = true;
this.atoms = this.ms.at;
this.initialize ();
});
Clazz.overrideMethod (c$, "initShape", 
function () {
});
Clazz.overrideMethod (c$, "getSizeG", 
function (group) {
var m = group;
var groupIndex = m.groupIndex;
var leadAtomIndex = m.getLeadAtom ().i;
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
for (var j = 0; j < bioShape.monomerCount; j++) {
if (bioShape.monomers[j].groupIndex == groupIndex && bioShape.monomers[j].getLeadAtom ().i == leadAtomIndex) return bioShape.mads[j];
}
}
return 0;
}, "JM.Group");
Clazz.overrideMethod (c$, "replaceGroup", 
function (g0, g1) {
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
for (var j = 0; j < bioShape.monomerCount; j++) if (bioShape.monomers[j] === g0) {
bioShape.monomers[j] = g1;
break;
}
}
}, "JM.Group,JM.Group");
Clazz.overrideMethod (c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
var mad = size;
this.initialize ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setMad (mad, bsSelected, (rd == null ? null : rd.values));
}
}, "~N,J.atomdata.RadiusData,JU.BS");
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.setPropBSC (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "setPropBSC", 
function (propertyName, value, bsSelected) {
if (propertyName === "refreshTrajectories") {
var modelIndex = ((value)[0]).intValue ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex == modelIndex) b.falsifyMesh ();
}
return;
}if (propertyName === "deleteModelAtoms") {
this.atoms = (value)[1];
var modelIndex = ((value)[2])[0];
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex > modelIndex) {
b.modelIndex--;
b.leadAtomIndices = b.bioPolymer.getLeadAtomIndices ();
} else if (b.modelIndex == modelIndex) {
this.bioShapes = JU.AU.deleteElements (this.bioShapes, i, 1);
}}
return;
}this.initialize ();
if ("color" === propertyName) {
var pid = J.c.PAL.pidOf (value);
var colix = JU.C.getColixO (value);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setColixBS (colix, pid, bsSelected);
}
return;
}if ("params" === propertyName) {
var n = bsSelected.length ();
var atomMap =  Clazz.newIntArray (n, 0);
for (var pt = 0, i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1), pt++) atomMap[i] = pt;

for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].setParams (value, atomMap, bsSelected);

return;
}if ("colorPhase" === propertyName) {
var twoColors = value;
var colixBack = JU.C.getColixO (twoColors[0]);
var colix = JU.C.getColixO (twoColors[1]);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) {
bioShape.setColixBS (colix, 64, bsSelected);
bioShape.setColixBack (colixBack, bsSelected);
}}
return;
}if ("translucency" === propertyName) {
var isTranslucent = ("translucent".equals (value));
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setTranslucent (isTranslucent, bsSelected, this.translucentLevel);
}
return;
}this.setPropS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var temp =  new java.util.Hashtable ();
var temp2 =  new java.util.Hashtable ();
var type = JV.JC.shapeClassBases[this.shapeID];
for (var iShape = this.bioShapes.length; --iShape >= 0; ) this.bioShapes[iShape].getBioShapeState (type, this.translucentAllowed, temp, temp2);

var s = "\n" + this.vwr.getCommands (temp, temp2, this.shapeID == 9 ? "Backbone" : "select");
return s;
});
Clazz.defineMethod (c$, "initialize", 
function () {
var modelCount = this.ms.mc;
var models = this.ms.am;
var n = this.ms.getBioPolymerCountInModel (-1);
var shapes =  new Array (n--);
for (var i = modelCount; --i >= 0; ) for (var j = this.ms.getBioPolymerCountInModel (i); --j >= 0; n--) {
var bp = (models[i]).bioPolymers[j];
shapes[n] = (this.bioShapes == null || this.bioShapes.length <= n || this.bioShapes[n] == null || this.bioShapes[n].bioPolymer !== bp ?  new J.shapebio.BioShape (this, i, bp) : this.bioShapes[n]);
}

this.bioShapes = shapes;
});
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].findNearestAtomIndex (xMouse, yMouse, closest, bsNot);

}, "~N,~N,~A,JU.BS");
Clazz.overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
if (this.bioShapes == null) return;
bsModels = JU.BSUtil.copy (bsModels);
if (this.ms.trajectory != null) this.ms.trajectory.setBaseModels (bsModels);
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
b.modelVisibilityFlags = (bsModels.get (b.modelIndex) ? this.vf : 0);
}
}, "JU.BS");
Clazz.overrideMethod (c$, "setAtomClickability", 
function () {
if (this.bioShapes == null) return;
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].setAtomClickability ();

});
Clazz.defineMethod (c$, "getMpsShapeCount", 
function () {
return this.bioShapes.length;
});
Clazz.defineMethod (c$, "getBioShape", 
function (i) {
return this.bioShapes[i];
}, "~N");
});
