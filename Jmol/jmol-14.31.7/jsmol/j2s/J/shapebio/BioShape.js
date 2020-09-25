Clazz.declarePackage ("J.shapebio");
Clazz.load (["J.shape.AtomShape"], "J.shapebio.BioShape", ["java.lang.Float", "JU.AU", "$.BS", "$.PT", "J.c.PAL", "$.STR", "JM.AlphaPolymer", "$.NucleicPolymer", "JU.BSUtil", "$.C", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelIndex = 0;
this.modelVisibilityFlags = 0;
this.shape = null;
this.bioPolymer = null;
this.meshes = null;
this.meshReady = null;
this.colixesBack = null;
this.monomers = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.hasBfactorRange = false;
this.bfactorMin = 0;
this.bfactorMax = 0;
this.range = 0;
this.floatRange = 0;
Clazz.instantialize (this, arguments);
}, J.shapebio, "BioShape", J.shape.AtomShape);
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.setPropAS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz.makeConstructor (c$, 
function (shape, modelIndex, bioPolymer) {
Clazz.superConstructor (this, J.shapebio.BioShape, []);
this.shape = shape;
this.modelIndex = modelIndex;
this.bioPolymer = bioPolymer;
this.isActive = shape.isActive;
this.bsSizeDefault =  new JU.BS ();
this.monomerCount = bioPolymer.monomerCount;
if (this.monomerCount > 0) {
this.colixes =  Clazz.newShortArray (this.monomerCount, 0);
this.paletteIDs =  Clazz.newByteArray (this.monomerCount, 0);
this.mads =  Clazz.newShortArray (this.monomerCount + 1, 0);
this.monomers = bioPolymer.monomers;
this.meshReady =  Clazz.newBooleanArray (this.monomerCount, false);
this.meshes =  new Array (this.monomerCount);
this.wingVectors = bioPolymer.getWingVectors ();
this.leadAtomIndices = bioPolymer.getLeadAtomIndices ();
}}, "J.shapebio.BioShapeCollection,~N,JM.BioPolymer");
Clazz.defineMethod (c$, "calcBfactorRange", 
function () {
this.bfactorMin = this.bfactorMax = this.monomers[0].getLeadAtom ().getBfactor100 ();
for (var i = this.monomerCount; --i > 0; ) {
var bfactor = this.monomers[i].getLeadAtom ().getBfactor100 ();
if (bfactor < this.bfactorMin) this.bfactorMin = bfactor;
 else if (bfactor > this.bfactorMax) this.bfactorMax = bfactor;
}
this.range = this.bfactorMax - this.bfactorMin;
this.floatRange = this.range;
this.hasBfactorRange = true;
});
Clazz.defineMethod (c$, "calcMeanPositionalDisplacement", 
function (bFactor100) {
return Clazz.doubleToShort (Math.sqrt (bFactor100 / 7895.6835208714865) * 1000);
}, "~N");
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
this.bioPolymer.findNearestAtomIndex (xMouse, yMouse, closest, this.mads, this.shape.vf, bsNot);
}, "~N,~N,~A,JU.BS");
Clazz.defineMethod (c$, "setMad", 
function (mad, bsSelected, values) {
if (this.monomerCount < 2) return;
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new JU.BS ();
var flag = this.shape.vf;
var setRingVis = (flag == 32768 && Clazz.instanceOf (this.bioPolymer, JM.NucleicPolymer));
for (var i = this.monomerCount; --i >= 0; ) {
var leadAtomIndex = this.leadAtomIndices[i];
if (bsSelected.get (leadAtomIndex)) {
if (values != null && leadAtomIndex < values.length) {
if (Float.isNaN (values[leadAtomIndex])) continue;
mad = Clazz.floatToShort (values[leadAtomIndex] * 2000);
}var isVisible = ((this.mads[i] = this.getMad (i, mad)) > 0);
this.bsSizeSet.setBitTo (i, isVisible);
this.monomers[i].setShapeVisibility (flag, isVisible);
this.shape.atoms[leadAtomIndex].setShapeVisibility (flag, isVisible);
if (setRingVis) (this.monomers[i]).setRingsVisible (isVisible);
this.falsifyNearbyMesh (i);
}}
if (this.monomerCount > 1) this.mads[this.monomerCount] = this.mads[this.monomerCount - 1];
}, "~N,JU.BS,~A");
Clazz.defineMethod (c$, "getMad", 
 function (groupIndex, mad) {
this.bsSizeDefault.setBitTo (groupIndex, mad == -1 || mad == -2);
if (mad >= 0) return mad;
switch (mad) {
case -1:
case -2:
if (mad == -1 && this.shape.madOn >= 0) return this.shape.madOn;
switch (this.monomers[groupIndex].getProteinStructureType ()) {
case J.c.STR.SHEET:
case J.c.STR.HELIX:
return this.shape.madHelixSheet;
case J.c.STR.DNA:
case J.c.STR.RNA:
return this.shape.madDnaRna;
default:
return this.shape.madTurnRandom;
}
case -3:
{
if (!this.hasBfactorRange) this.calcBfactorRange ();
var atom = this.monomers[groupIndex].getLeadAtom ();
var bfactor100 = atom.getBfactor100 ();
var scaled = bfactor100 - this.bfactorMin;
if (this.range == 0) return 0;
var percentile = scaled / this.floatRange;
if (percentile < 0 || percentile > 1) JU.Logger.error ("Que ha ocurrido? " + percentile);
return Clazz.floatToShort ((1750 * percentile) + 250);
}case -4:
{
var atom = this.monomers[groupIndex].getLeadAtom ();
return (2 * this.calcMeanPositionalDisplacement (atom.getBfactor100 ()));
}}
JU.Logger.error ("unrecognized setMad(" + mad + ")");
return 0;
}, "~N,~N");
Clazz.defineMethod (c$, "falsifyMesh", 
function () {
if (this.meshReady == null) return;
for (var i = 0; i < this.monomerCount; i++) this.meshReady[i] = false;

});
Clazz.defineMethod (c$, "falsifyNearbyMesh", 
 function (index) {
if (this.meshReady == null) return;
this.meshReady[index] = false;
if (index > 0) this.meshReady[index - 1] = false;
if (index < this.monomerCount - 1) this.meshReady[index + 1] = false;
}, "~N");
Clazz.defineMethod (c$, "setColixBS", 
function (colix, pid, bsSelected) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet = JU.BS.newN (this.monomerCount);
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex)) {
this.colixes[i] = this.shape.getColixI (colix, pid, atomIndex);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = 0;
this.paletteIDs[i] = pid;
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}}
}, "~N,~N,JU.BS");
Clazz.defineMethod (c$, "setColixBack", 
function (colix, bsSelected) {
if (this.colixesBack == null) this.colixesBack =  Clazz.newShortArray (this.colixes.length, 0);
if (this.colixesBack.length < this.colixes.length) this.colixesBack = JU.AU.ensureLengthShort (this.colixesBack, this.colixes.length);
for (var i = this.monomerCount; --i >= 0; ) if (bsSelected.get (this.leadAtomIndices[i])) this.colixesBack[i] = colix;

}, "~N,JU.BS");
Clazz.defineMethod (c$, "setColixes", 
function (atomColixes, bsSelected) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet = JU.BS.newN (this.monomerCount);
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex) && i < this.colixes.length && atomIndex < atomColixes.length) {
this.colixes[i] = this.shape.getColixI (atomColixes[atomIndex], J.c.PAL.UNKNOWN.id, atomIndex);
if (this.colixesBack != null && i < this.colixesBack.length) this.colixesBack[i] = 0;
this.paletteIDs[i] = J.c.PAL.UNKNOWN.id;
this.bsColixSet.set (i);
}}
}, "~A,JU.BS");
Clazz.defineMethod (c$, "setParams", 
function (data, atomMap, bsSelected) {
if (this.monomerCount == 0) return;
var c = data[0];
var atrans = data[1];
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet = JU.BS.newN (this.monomerCount);
var n = atomMap.length;
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex) && i < this.colixes.length && atomIndex < n) {
var pt = atomMap[atomIndex];
var colix = (c == null ? 0 : c[pt]);
var f = (atrans == null ? 0 : atrans[pt]);
if (f > 0.01) colix = JU.C.getColixTranslucent3 (colix, true, f);
this.colixes[i] = this.shape.getColixI (colix, J.c.PAL.UNKNOWN.id, atomIndex);
if (this.colixesBack != null && i < this.colixesBack.length) this.colixesBack[i] = 0;
this.paletteIDs[i] = J.c.PAL.UNKNOWN.id;
this.bsColixSet.set (i);
}}
}, "~A,~A,JU.BS");
Clazz.defineMethod (c$, "setTranslucent", 
function (isTranslucent, bsSelected, translucentLevel) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet = JU.BS.newN (this.monomerCount);
for (var i = this.monomerCount; --i >= 0; ) if (bsSelected.get (this.leadAtomIndices[i])) {
this.colixes[i] = JU.C.getColixTranslucent3 (this.colixes[i], isTranslucent, translucentLevel);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = JU.C.getColixTranslucent3 (this.colixesBack[i], isTranslucent, translucentLevel);
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}
}, "~B,JU.BS,~N");
Clazz.overrideMethod (c$, "setAtomClickability", 
function () {
if (!this.isActive || this.wingVectors == null || this.monomerCount == 0) return;
var setRingsClickable = (Clazz.instanceOf (this.bioPolymer, JM.NucleicPolymer) && this.shape.shapeID == 11);
var setAlphaClickable = (Clazz.instanceOf (this.bioPolymer, JM.AlphaPolymer) || this.shape.shapeID != 15);
var ms = this.monomers[0].chain.model.ms;
for (var i = this.monomerCount; --i >= 0; ) {
if (this.mads[i] <= 0) continue;
var iAtom = this.leadAtomIndices[i];
if (ms.isAtomHidden (iAtom)) continue;
if (setAlphaClickable) ms.at[iAtom].setClickable (1040384);
if (setRingsClickable) (this.monomers[i]).setRingsClickable ();
}
});
Clazz.defineMethod (c$, "getBioShapeState", 
function (type, translucentAllowed, temp, temp2) {
if (this.monomerCount > 0) {
if (!this.isActive || this.bsSizeSet == null && this.bsColixSet == null) return;
for (var i = 0; i < this.monomerCount; i++) {
var atomIndex1 = this.monomers[i].firstAtomIndex;
var atomIndex2 = this.monomers[i].lastAtomIndex;
if (this.bsSizeSet != null && (this.bsSizeSet.get (i) || this.bsColixSet != null && this.bsColixSet.get (i))) {
if (this.bsSizeDefault.get (i)) {
JU.BSUtil.setMapBitSet (temp, atomIndex1, atomIndex2, type + (this.bsSizeSet.get (i) ? " on" : " off"));
} else {
JU.BSUtil.setMapBitSet (temp, atomIndex1, atomIndex2, type + " " + JU.PT.escF (this.mads[i] / 2000));
}}if (this.bsColixSet == null || !this.bsColixSet.get (i)) continue;
var s = J.shape.Shape.getColorCommand (type, this.paletteIDs[i], this.colixes[i], translucentAllowed);
if (this.colixesBack != null && this.colixesBack.length > i && this.colixesBack[i] != 0) s += " " + JU.C.getHexCode (this.colixesBack[i]);
JU.BSUtil.setMapBitSet (temp2, atomIndex1, atomIndex2, s);
}
}}, "~S,~B,java.util.Map,java.util.Map");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
return null;
});
Clazz.defineStatics (c$,
"eightPiSquared100", 7895.6835208714865);
});
