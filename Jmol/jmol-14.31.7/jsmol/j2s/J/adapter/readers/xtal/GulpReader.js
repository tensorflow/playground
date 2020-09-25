Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.GulpReader", ["java.lang.Double", "$.Float", "java.util.Hashtable", "JU.PT", "$.V3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isSlab = false;
this.isPolymer = false;
this.$isPrimitive = false;
this.sep = "-------";
this.coordinatesArePrimitive = false;
this.atomCharges = null;
this.bTest = false;
this.a = 0;
this.b = 0;
this.c = 0;
this.alpha = 0;
this.beta = 0;
this.gamma = 0;
this.primitiveData = null;
this.totEnergy = null;
this.energyUnits = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "GulpReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.$isPrimitive = !this.checkFilterKey ("CONV");
this.coordinatesArePrimitive = true;
this.setFractionalCoordinates (this.readDimensionality ());
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
if (this.atomCharges == null) return;
var atoms = this.asc.atoms;
var f;
for (var i = this.asc.ac; --i >= 0; ) if ((f = this.atomCharges.get (atoms[i].atomName)) != null || (f = this.atomCharges.get (atoms[i].getElementSymbol ())) != null) atoms[i].partialCharge = f.floatValue ();

});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.contains ("Space group ")) {
this.readSpaceGroup ();
return true;
}if (this.isSlab ? this.line.contains ("Surface cell parameters") : this.isPolymer ? this.line.contains ("Polymer cell parameter") : (this.bTest = this.line.contains ("Cartesian lattice vectors")) || this.line.contains ("Cell parameters (Angstroms/Degrees)") || this.line.contains ("Primitive cell parameters")) {
this.readCellParameters (this.bTest);
return true;
}if (this.line.contains ("Monopole - monopole (total)")) {
this.readEnergy ();
return true;
}if (this.line.contains ("Fractional coordinates of asymmetric unit :") || (this.bTest = this.line.contains ("Final asymmetric unit coordinates")) || (this.bTest = this.line.contains ("Final fractional coordinates ")) || this.line.contains ("Mixed fractional/Cartesian coordinates") || this.line.contains ("Cartesian coordinates of cluster ") || this.line.contains ("Final cartesian coordinates of atoms :") && this.isMolecular) {
if (this.doGetModel (++this.modelNumber, null)) this.readAtomicPos (!this.bTest);
return true;
}if (this.line.contains ("Species output for all configurations")) {
this.readPartialCharges ();
return true;
}if (!this.doProcessLines) return true;
if (this.line.contains ("Final cell parameters and derivatives")) {
this.readFinalCell ();
return true;
}return true;
});
Clazz.defineMethod (c$, "readDimensionality", 
 function () {
this.discardLinesUntilContains ("Dimensionality");
var tokens = this.getTokens ();
switch (this.parseIntStr (tokens[2])) {
case 0:
this.isMolecular = true;
this.$isPrimitive = false;
return false;
case 1:
this.isPolymer = true;
this.$isPrimitive = false;
break;
case 2:
this.isSlab = true;
this.$isPrimitive = false;
break;
}
return true;
});
Clazz.defineMethod (c$, "readSpaceGroup", 
 function () {
this.sgName = this.line.substring (this.line.indexOf (":") + 1).trim ();
});
c$.parameterIndex = Clazz.defineMethod (c$, "parameterIndex", 
 function (key) {
for (var i = J.adapter.readers.xtal.GulpReader.tags.length; --i >= 0; ) if (J.adapter.readers.xtal.GulpReader.tags[i].equals (key)) return i;

return -1;
}, "~S");
Clazz.defineMethod (c$, "setParameter", 
 function (key, value) {
switch (J.adapter.readers.xtal.GulpReader.parameterIndex (key)) {
case 0:
this.a = value;
break;
case 1:
this.b = value;
break;
case 2:
this.c = value;
break;
case 3:
this.alpha = value;
break;
case 4:
this.beta = value;
break;
case 5:
this.gamma = value;
break;
}
}, "~S,~N");
Clazz.defineMethod (c$, "newAtomSet", 
 function (doSetUnitCell) {
this.asc.newAtomSet ();
if (doSetUnitCell) {
this.setModelParameters (this.coordinatesArePrimitive);
if (this.totEnergy != null) this.setEnergy ();
}}, "~B");
Clazz.defineMethod (c$, "setModelParameters", 
 function (isPrimitive) {
if (this.sgName != null) this.setSpaceGroupName (isPrimitive ? "P1" : this.sgName);
if (isPrimitive && this.primitiveData != null) {
this.addExplicitLatticeVector (0, this.primitiveData, 0);
this.addExplicitLatticeVector (1, this.primitiveData, 3);
this.addExplicitLatticeVector (2, this.primitiveData, 6);
} else if (this.a != 0) {
if (this.isSlab) {
this.c = -1;
this.beta = this.gamma = 90;
} else if (this.isPolymer) {
this.b = this.c = -1;
this.alpha = this.beta = this.gamma = 90;
}this.setUnitCell (this.a, this.b, this.c, this.alpha, this.beta, this.gamma);
}}, "~B");
Clazz.defineMethod (c$, "readCellParameters", 
 function (isLatticeVectors) {
if (isLatticeVectors) {
this.rd ();
this.primitiveData = this.fillFloatArray (null, 0,  Clazz.newFloatArray (9, 0));
this.a = 0;
return;
}var i0 = (this.line.indexOf ("Full cell") < 0 ? 0 : 4);
this.coordinatesArePrimitive = (i0 == 0);
this.rd ();
while (this.rd () != null && this.line.contains ("=")) {
var tokens = JU.PT.getTokens (this.line.$replace ('=', ' '));
for (var i = i0; i < i0 + 4; i += 2) if (tokens.length > i + 1) this.setParameter (tokens[i], this.parseFloatStr (tokens[i + 1]));

}
}, "~B");
Clazz.defineMethod (c$, "readFinalCell", 
 function () {
this.discardLinesUntilContains (this.sep);
var tokens;
while (this.rd () != null && (tokens = this.getTokens ()).length >= 2) this.setParameter (tokens[0], this.parseFloatStr (tokens[1]));

if (this.primitiveData != null) {
this.scalePrimitiveData (0, this.a);
this.scalePrimitiveData (3, this.b);
this.scalePrimitiveData (6, this.c);
if (!this.coordinatesArePrimitive) while (this.rd () != null && this.line.indexOf ("Final") < 0) if (this.line.indexOf ("Non-primitive lattice parameters") > 0) {
this.rd ();
for (var i = 0; i < 2; i++) {
tokens = JU.PT.getTokens (this.rd ().$replace ('=', ' '));
this.setParameter (tokens[0], this.parseFloatStr (tokens[1]));
this.setParameter (tokens[2], this.parseFloatStr (tokens[3]));
this.setParameter (tokens[4], this.parseFloatStr (tokens[5]));
}
break;
}
}this.setModelParameters (this.coordinatesArePrimitive);
this.applySymmetryAndSetTrajectory ();
if (this.totEnergy != null) this.setEnergy ();
});
Clazz.defineMethod (c$, "scalePrimitiveData", 
 function (i, value) {
var v = JU.V3.new3 (this.primitiveData[i], this.primitiveData[i + 1], this.primitiveData[i + 2]);
v.normalize ();
v.scale (value);
this.primitiveData[i++] = v.x;
this.primitiveData[i++] = v.y;
this.primitiveData[i++] = v.z;
}, "~N,~N");
Clazz.overrideMethod (c$, "applySymmetryAndSetTrajectory", 
function () {
if (this.coordinatesArePrimitive && this.iHaveUnitCell && this.doCheckUnitCell && this.primitiveData != null && !this.$isPrimitive) {
this.setModelParameters (false);
var symFull = this.symmetry;
this.setModelParameters (true);
var atoms = this.asc.atoms;
var i0 = this.asc.getLastAtomSetAtomIndex ();
var i1 = this.asc.ac;
for (var i = i0; i < i1; i++) {
var atom = atoms[i];
this.symmetry.toCartesian (atom, true);
symFull.toFractional (atom, true);
if (this.fixJavaFloat) JU.PT.fixPtFloats (atom, 100000.0);
}
this.setModelParameters (false);
}this.applySymTrajASCR ();
});
Clazz.defineMethod (c$, "readAtomicPos", 
 function (finalizeSymmetry) {
this.newAtomSet (finalizeSymmetry);
this.discardLinesUntilContains (this.sep);
this.discardLinesUntilContains (this.sep);
while (this.rd () != null) {
if (this.line.indexOf (this.sep) >= 0 && this.rd ().indexOf ("Region") < 0) break;
if (this.line.indexOf ("Region") >= 0) {
this.rd ();
continue;
}this.line = this.line.$replace ('*', ' ');
var tokens = this.getTokens ();
if (tokens[2].equals ("c")) this.addAtomXYZSymName (tokens, 3, null, tokens[1]);
}
if (finalizeSymmetry) this.applySymmetryAndSetTrajectory ();
}, "~B");
Clazz.defineMethod (c$, "readPartialCharges", 
 function () {
this.atomCharges =  new java.util.Hashtable ();
this.discardLinesUntilContains (this.sep);
this.discardLinesUntilContains (this.sep);
var tokens;
while ((tokens = JU.PT.getTokens (this.rd ())).length > 5) {
var species = tokens[0];
var charge = this.atomCharges.get (species);
var f = (charge == null ? 0 : charge.floatValue ());
this.atomCharges.put (species, Float.$valueOf ((f + this.parseFloatStr (tokens[4]))));
}
});
Clazz.defineMethod (c$, "readEnergy", 
 function () {
if (this.line.indexOf ("=") < 0) this.discardLinesUntilContains ("=");
var tokens = JU.PT.getTokens (this.line.substring (this.line.indexOf ("=")));
this.totEnergy = Double.$valueOf (Double.parseDouble (tokens[1]));
this.energyUnits = tokens[2];
this.discardLinesUntilContains (this.sep);
});
Clazz.defineMethod (c$, "setEnergy", 
 function () {
this.asc.setAtomSetEnergy ("" + this.totEnergy, this.totEnergy.floatValue ());
this.asc.setInfo ("Energy", this.totEnergy);
this.asc.setAtomSetName ("E = " + this.totEnergy + " " + this.energyUnits);
this.totEnergy = null;
});
Clazz.defineStatics (c$,
"tags",  Clazz.newArray (-1, ["a", "b", "c", "alpha", "beta", "gamma"]));
});
