Clazz.declarePackage ("J.renderbio");
Clazz.load (["J.renderbio.BioShapeRenderer"], "J.renderbio.BackboneRenderer", ["JU.C"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isDataFrame = false;
Clazz.instantialize (this, arguments);
}, J.renderbio, "BackboneRenderer", J.renderbio.BioShapeRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
var checkPass2 = (!this.isExport && !this.vwr.gdata.isPass2);
this.isDataFrame = this.vwr.ms.isJmolDataFrameForModel (bioShape.modelIndex);
var n = this.monomerCount;
var atoms = this.ms.at;
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) {
var atomA = atoms[this.leadAtomIndices[i]];
var cA = this.colixes[i];
this.mad = this.mads[i];
var i1 = (i + 1) % n;
var atomB = atoms[this.leadAtomIndices[i1]];
var cB = this.colixes[i1];
if (atomA.nBackbonesDisplayed > 0 && atomB.nBackbonesDisplayed > 0 && !this.ms.isAtomHidden (atomB.i) && (this.isDataFrame || atomA.distanceSquared (atomB) < 100)) {
cA = JU.C.getColixInherited (cA, atomA.colixAtom);
cB = JU.C.getColixInherited (cB, atomB.colixAtom);
if (!checkPass2 || this.setBioColix (cA) || this.setBioColix (cB)) this.drawSegmentAB (atomA, atomB, cA, cB, 100);
}}
}, "J.shapebio.BioShape");
});
