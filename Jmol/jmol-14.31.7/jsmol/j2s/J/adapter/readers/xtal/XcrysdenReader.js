Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.XcrysdenReader", ["JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nAtoms = 0;
this.animation = false;
this.unitCellData = null;
this.animationStep = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "XcrysdenReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.unitCellData =  Clazz.newFloatArray (9, 0);
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.doApplySymmetry = true;
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.contains ("ANIMSTEP")) {
this.readNostep ();
} else if (this.line.contains ("CRYSTAL")) {
this.setFractionalCoordinates (false);
} else if (this.line.contains ("PRIMVEC")) {
this.readUnitCell ();
} else if (this.line.contains ("PRIMCOORD")) {
this.readCoordinates ();
}return true;
});
Clazz.defineMethod (c$, "readNostep", 
 function () {
this.animation = true;
});
Clazz.defineMethod (c$, "readUnitCell", 
 function () {
this.setSymmetry ();
this.fillFloatArray (null, 0, this.unitCellData);
this.setUnitCell ();
});
Clazz.defineMethod (c$, "setUnitCell", 
 function () {
this.addExplicitLatticeVector (0, this.unitCellData, 0);
this.addExplicitLatticeVector (1, this.unitCellData, 3);
this.addExplicitLatticeVector (2, this.unitCellData, 6);
});
Clazz.defineMethod (c$, "setSymmetry", 
 function () {
this.applySymmetryAndSetTrajectory ();
this.asc.newAtomSet ();
this.setSpaceGroupName ("P1");
this.setFractionalCoordinates (false);
});
Clazz.defineMethod (c$, "readCoordinates", 
 function () {
var atomStr = JU.PT.getTokens (this.rd ());
this.nAtoms = Integer.parseInt (atomStr[0]);
this.setFractionalCoordinates (false);
var counter = 0;
while (counter < this.nAtoms && this.rd () != null) {
var tokens = this.getTokens ();
this.addAtomXYZSymName (tokens, 1, null, J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (Integer.parseInt (tokens[0])));
counter++;
}
this.asc.setAtomSetName (this.animation ? "Structure " + (this.animationStep++) : "Initial coordinates");
});
});
