Clazz.declarePackage ("JM");
Clazz.load (["JM.ProteinStructure"], "JM.Sheet", ["JU.Measure", "$.P3", "$.V3", "J.c.STR", "JM.AminoPolymer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.widthUnitVector = null;
this.heightUnitVector = null;
Clazz.instantialize (this, arguments);
}, JM, "Sheet", JM.ProteinStructure);
Clazz.overrideConstructor (c$, 
function (apolymer, monomerIndex, monomerCount, subtype) {
this.setupPS (apolymer, J.c.STR.SHEET, monomerIndex, monomerCount);
this.subtype = subtype;
}, "JM.AlphaPolymer,~N,~N,J.c.STR");
Clazz.overrideMethod (c$, "calcAxis", 
function () {
if (this.axisA != null) return;
if (this.nRes == 2) {
this.axisA = this.apolymer.getLeadPoint (this.monomerIndexFirst);
this.axisB = this.apolymer.getLeadPoint (this.monomerIndexFirst + 1);
} else {
this.axisA =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst + 1, this.axisA);
this.axisB =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst + this.nRes - 1, this.axisB);
}this.axisUnitVector =  new JU.V3 ();
this.axisUnitVector.sub2 (this.axisB, this.axisA);
this.axisUnitVector.normalize ();
var tempA =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst, tempA);
if (this.notHelixOrSheet (this.monomerIndexFirst - 1)) JU.Measure.projectOntoAxis (tempA, this.axisA, this.axisUnitVector, this.vectorProjection);
var tempB =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst + this.nRes, tempB);
if (this.notHelixOrSheet (this.monomerIndexFirst + this.nRes)) JU.Measure.projectOntoAxis (tempB, this.axisA, this.axisUnitVector, this.vectorProjection);
this.axisA = tempA;
this.axisB = tempB;
});
Clazz.defineMethod (c$, "notHelixOrSheet", 
 function (i) {
return (i < 0 || i >= this.apolymer.monomerCount || !this.apolymer.monomers[i].isHelix () && !this.apolymer.monomers[i].isSheet ());
}, "~N");
Clazz.defineMethod (c$, "calcSheetUnitVectors", 
function () {
if (!(Clazz.instanceOf (this.apolymer, JM.AminoPolymer))) return;
if (this.widthUnitVector == null) {
var vectorCO =  new JU.V3 ();
var vectorCOSum =  new JU.V3 ();
var amino = this.apolymer.monomers[this.monomerIndexFirst];
vectorCOSum.sub2 (amino.getCarbonylOxygenAtom (), amino.getCarbonylCarbonAtom ());
for (var i = this.nRes; --i > this.monomerIndexFirst; ) {
amino = this.apolymer.monomers[i];
vectorCO.sub2 (amino.getCarbonylOxygenAtom (), amino.getCarbonylCarbonAtom ());
if (vectorCOSum.angle (vectorCO) < 1.5707964) vectorCOSum.add (vectorCO);
 else vectorCOSum.sub (vectorCO);
}
this.heightUnitVector = vectorCO;
this.heightUnitVector.cross (this.axisUnitVector, vectorCOSum);
this.heightUnitVector.normalize ();
this.widthUnitVector = vectorCOSum;
this.widthUnitVector.cross (this.axisUnitVector, this.heightUnitVector);
}});
Clazz.defineMethod (c$, "setBox", 
function (w, h, pt, vW, vH, ptC, scale) {
if (this.heightUnitVector == null) this.calcSheetUnitVectors ();
vW.setT (this.widthUnitVector);
vW.scale (scale * w);
vH.setT (this.heightUnitVector);
vH.scale (scale * h);
ptC.ave (vW, vH);
ptC.sub2 (pt, ptC);
}, "~N,~N,JU.P3,JU.V3,JU.V3,JU.P3,~N");
});
