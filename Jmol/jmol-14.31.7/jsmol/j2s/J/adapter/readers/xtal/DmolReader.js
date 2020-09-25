Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.DmolReader", ["java.lang.Double", "JU.DF", "$.PT", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.unitCellData = null;
this.totE = null;
this.geomOpt = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "DmolReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.contains ("** GEOMETRY OPTIMIZATION IN DELOCALIZED COORDINATES **")) {
this.geomOpt = true;
} else if (this.line.contains ("INCOOR, atomic coordinates")) {
this.geomOpt = false;
} else if (!this.geomOpt ? this.line.contains ("$cell vectors") : this.line.contains ("Lattice:")) {
this.readCellParam ();
} else if (!this.geomOpt ? this.line.contains ("$coordinates") : this.line.contains ("Input Coordinates")) {
this.readCoord ();
} else if (this.line.contains (" Total Energy")) {
this.readEnergy ();
} else if (this.line.contains ("Frequencies (cm-1)")) {
this.readFreq ();
}return true;
});
Clazz.defineMethod (c$, "readCellParam", 
 function () {
this.unitCellData =  Clazz.newFloatArray (9, 0);
for (var n = 0, i = 0; n < 3; n++) {
var tokens = JU.PT.getTokens (this.rd ());
this.unitCellData[i++] = this.parseFloatStr (!this.geomOpt ? tokens[0] : tokens[4]) * 0.5291772;
this.unitCellData[i++] = this.parseFloatStr (!this.geomOpt ? tokens[1] : tokens[5]) * 0.5291772;
this.unitCellData[i++] = this.parseFloatStr (!this.geomOpt ? tokens[2] : tokens[6]) * 0.5291772;
}
});
Clazz.defineMethod (c$, "newAtomSet", 
 function () {
this.applySymmetryAndSetTrajectory ();
this.asc.newAtomSet ();
if (this.totE != null) this.setEnergy ();
this.doApplySymmetry = true;
if (this.unitCellData != null) {
this.addExplicitLatticeVector (0, this.unitCellData, 0);
this.addExplicitLatticeVector (1, this.unitCellData, 3);
this.addExplicitLatticeVector (2, this.unitCellData, 6);
this.setSpaceGroupName ("P1");
}this.setFractionalCoordinates (false);
});
Clazz.defineMethod (c$, "readCoord", 
 function () {
this.newAtomSet ();
if (this.geomOpt) this.readLines (2);
while (this.rd () != null && !this.geomOpt ? !this.line.contains ("$end") : !this.line.contains ("-----")) {
var tokens = this.getTokens ();
var atom = this.asc.addNewAtom ();
atom.atomName = !this.geomOpt ? tokens[0] : tokens[1];
var factor = (!this.geomOpt ? 0.5291772 : 1.00);
var x = this.parseFloatStr (!this.geomOpt ? tokens[1] : tokens[2]) * factor;
var y = this.parseFloatStr (!this.geomOpt ? tokens[2] : tokens[3]) * factor;
var z = this.parseFloatStr (!this.geomOpt ? tokens[3] : tokens[4]) * factor;
atom.set (x, y, z);
this.setAtomCoord (atom);
}
});
Clazz.defineMethod (c$, "readEnergy", 
 function () {
this.rd ();
if (this.line.contains ("Ef")) this.totE = Double.$valueOf (Double.parseDouble (JU.PT.getTokens (this.line.substring (this.line.indexOf ("Ef") + 1, this.line.indexOf ("Ha")))[1]));
});
Clazz.defineMethod (c$, "setEnergy", 
 function () {
this.asc.setAtomSetEnergy ("" + this.totE, this.totE.floatValue ());
this.asc.setInfo ("Energy", this.totE);
this.asc.setAtomSetName ("E = " + this.totE + " Hartree");
});
Clazz.defineMethod (c$, "readFreq", 
 function () {
var lastAtomCount = 0;
var ac = this.asc.getLastAtomSetAtomCount ();
while (this.rd () != null && this.line.charAt (1) == ' ') {
var tokens = this.getTokens ();
var frequencyCount = Clazz.doubleToInt (tokens.length / 2);
var frequencies =  Clazz.newFloatArray (frequencyCount, 0);
for (var i = 1, n = 0; i < tokens.length; i += 2, n++) {
frequencies[n] = this.parseFloatStr (tokens[i]);
if (this.debugging) JU.Logger.debug ((this.vibrationNumber + n) + " frequency=" + frequencies[n]);
}
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
var iAtom0 = 0;
for (var i = 0; i < frequencyCount; i++) {
ignore[i] = (!this.doGetVibration (++this.vibrationNumber));
if (ignore[i]) continue;
this.applySymmetryAndSetTrajectory ();
lastAtomCount = this.cloneLastAtomSet (ac, null);
if (i == 0) iAtom0 = this.asc.getLastAtomSetAtomIndex ();
this.asc.setAtomSetFrequency (this.vibrationNumber, null, null, String.valueOf (frequencies[i]), null);
this.asc.setAtomSetName (JU.DF.formatDecimal (frequencies[i], 2) + " cm-1");
}
this.rd ();
this.fillFrequencyData (iAtom0, ac, lastAtomCount, ignore, false, 5, 13, null, 0, null);
this.readLines (2);
}
});
});
