Clazz.declarePackage ("JM");
Clazz.load (["JM.ProteinStructure"], "JM.Helix", ["JU.Measure", "$.P3", "$.V3", "J.c.STR"], function () {
c$ = Clazz.declareType (JM, "Helix", JM.ProteinStructure);
Clazz.overrideConstructor (c$, 
function (apolymer, monomerIndex, monomerCount, subtype) {
this.setupPS (apolymer, J.c.STR.HELIX, monomerIndex, monomerCount);
this.subtype = subtype;
}, "JM.AlphaPolymer,~N,~N,J.c.STR");
Clazz.overrideMethod (c$, "calcAxis", 
function () {
if (this.axisA != null) return;
var points =  new Array (this.nRes + 1);
for (var i = 0; i <= this.nRes; i++) this.apolymer.getLeadMidPoint (this.monomerIndexFirst + i, points[i] =  new JU.P3 ());

this.axisA =  new JU.P3 ();
this.axisUnitVector =  new JU.V3 ();
JU.Measure.calcBestAxisThroughPoints (points, this.axisA, this.axisUnitVector, this.vectorProjection, 4);
this.axisB = JU.P3.newP (points[this.nRes]);
JU.Measure.projectOntoAxis (this.axisB, this.axisA, this.axisUnitVector, this.vectorProjection);
});
});
