Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.SiestaReader", ["java.lang.Double", "java.util.Hashtable", "JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.noAtoms = 0;
this.acfUnits = "bohr";
this.tokens = null;
this.STATE_UNKNOWN = 0;
this.STATE_INPUT = 1;
this.STATE_OUTPUT = 2;
this.state = 0;
this.acfFactor = 0;
this.htSpecies = null;
this.unitCellVectors = null;
this.unitCellParamsS = null;
this.latticeConstant = 1;
this.latticeUnits = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "SiestaReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.doApplySymmetry = true;
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.length == 0 || this.line.charAt (0) == '#' || this.line.indexOf (' ') < 0) return true;
switch (this.state) {
case 0:
if (this.line.indexOf ("Dump of input data file") >= 0) {
this.state = 1;
return true;
}this.tokens = this.getTokens ();
if (this.fixToken (0).equals ("numberofspecies")) {
this.state = 1;
return false;
}return true;
case 1:
if (this.line.indexOf ("End of input data file") >= 0) {
this.state = 2;
return true;
}this.tokens = this.getTokens ();
if (this.tokens[0].equals ("%block")) {
this.readBlock (this.fixToken (1));
} else {
this.readValue (this.fixToken (0));
}return true;
}
if (this.line.contains ("outcoor: Atomic coordinates")) {
if (this.doGetModel (++this.modelNumber, null)) this.readAtomsCartGeomThenCell ();
return true;
}return true;
});
Clazz.defineMethod (c$, "readValue", 
 function (key) {
if (key.equals ("latticeconstant")) {
this.setCell ("constant");
} else if (key.equals ("atomiccoordinatesformat")) {
this.readAtomicCoordinatesFormat ();
}}, "~S");
Clazz.defineMethod (c$, "readBlock", 
 function (key) {
if (key.equals ("latticevectors")) return this.setCell ("vectors");
if (key.equals ("latticeparameters")) return this.setCell ("parameters");
if (key.equals ("chemicalspecieslabel")) return this.readSpecies ();
if (key.equals ("atomiccoordinatesandatomicspecies")) {
if (!this.doGetModel (++this.modelNumber, null)) {
this.skipModel ();
return false;
}return this.readAtoms ();
}this.discardLinesUntilContains ("%endblock");
return true;
}, "~S");
Clazz.defineMethod (c$, "readSpecies", 
 function () {
this.htSpecies =  new java.util.Hashtable ();
while (this.rdSiesta ().indexOf ("%") < 0) {
this.tokens = this.getTokens ();
this.htSpecies.put (this.tokens[0], this.tokens);
}
return false;
});
Clazz.defineMethod (c$, "fixToken", 
 function (i) {
var s = this.tokens[i];
return JU.PT.replaceAllCharacters (this.tokens[i], "_.-", "").toLowerCase ();
}, "~N");
Clazz.defineMethod (c$, "rdSiesta", 
function () {
var s = this.rd ();
var pt = s.indexOf ("#");
return (pt < 0 ? s : s.substring (pt)).trim ();
});
Clazz.defineMethod (c$, "getACFValue", 
 function (v) {
if (this.acfFactor == 0) {
var isScaledCartesian = (this.acfUnits === "scaledcartesian");
if (isScaledCartesian) this.acfUnits = this.latticeUnits;
this.acfUnits = JU.PT.rep (this.acfUnits, "notscaledcartesian", "");
switch (this.acfUnits.charAt (0)) {
default:
case 'b':
this.setFractionalCoordinates (isScaledCartesian);
this.acfFactor = (1.8897268777743552);
break;
case 'm':
this.setFractionalCoordinates (isScaledCartesian);
this.acfFactor = (1.0E-10);
break;
case 'n':
this.setFractionalCoordinates (isScaledCartesian);
this.acfFactor = (0.1);
break;
case 'a':
this.setFractionalCoordinates (isScaledCartesian);
this.acfFactor = 1;
break;
case 'f':
case 's':
this.setFractionalCoordinates (true);
this.acfFactor = 1;
break;
}
if (isScaledCartesian) {
this.acfFactor /= this.latticeConstant;
this.setFractionalCoordinates (true);
}}return (this.acfFactor * v);
}, "~N");
Clazz.defineMethod (c$, "readAtomicCoordinatesFormat", 
 function () {
this.acfUnits = this.tokens[1].toLowerCase ().intern ();
});
Clazz.defineMethod (c$, "skipModel", 
 function () {
this.discardLinesUntilContains ("%endblock AtomicCoordinatesAndAtomicSpecies");
});
Clazz.defineMethod (c$, "setCell", 
 function (key) {
if (key.equals ("vectors")) {
this.unitCellVectors =  Clazz.newFloatArray (9, 0);
this.fillFloatArray (null, 0, this.unitCellVectors);
} else if (key.equals ("constant")) {
var tokens = this.getTokens ();
this.latticeConstant = this.parseFloatStr (tokens[1]);
this.latticeUnits = tokens[2].toLowerCase ();
} else if (key.equals ("parameters")) {
this.unitCellParamsS =  Clazz.newFloatArray (6, 0);
this.fillFloatArray (this.line.substring (this.line.indexOf ("ters") + 4), 0, this.unitCellParamsS);
}return true;
}, "~S");
Clazz.defineMethod (c$, "readAtoms", 
 function () {
this.newAtomSet ();
if (this.unitCellVectors != null) {
this.addExplicitLatticeVector (0, this.unitCellVectors, 0);
this.addExplicitLatticeVector (1, this.unitCellVectors, 3);
this.addExplicitLatticeVector (2, this.unitCellVectors, 6);
} else if (this.unitCellParamsS != null) {
this.setUnitCell (this.unitCellParamsS[0] * this.latticeConstant, this.unitCellParamsS[1] * this.latticeConstant, this.unitCellParamsS[2] * this.latticeConstant, this.unitCellParamsS[3], this.unitCellParamsS[4], this.unitCellParamsS[5]);
}while (this.rdSiesta () != null && this.line.indexOf ("%endblock Atomic") < 0) {
var tokens = this.getTokens ();
var species = (this.htSpecies == null ?  Clazz.newArray (-1, [null, null, tokens[4]]) : this.htSpecies.get (tokens[3]));
var name = species[2];
var sym = (species[1] == null ? name : J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (this.parseIntStr (species[1])));
this.addAtomXYZSymName (tokens, 0, sym, name);
}
this.noAtoms = this.asc.ac;
return true;
});
Clazz.defineMethod (c$, "setAtomCoordXYZ", 
function (atom, x, y, z) {
Clazz.superCall (this, J.adapter.readers.xtal.SiestaReader, "setAtomCoordXYZ", [atom, this.getACFValue (x), this.getACFValue (y), this.getACFValue (z)]);
}, "J.adapter.smarter.Atom,~N,~N,~N");
Clazz.defineMethod (c$, "newAtomSet", 
 function () {
this.applySymmetryAndSetTrajectory ();
this.asc.newAtomSet ();
this.setSpaceGroupName ("P1");
this.setFractionalCoordinates (false);
});
Clazz.defineMethod (c$, "readAtomsCartGeomThenCell", 
 function () {
this.readLines (1);
this.newAtomSet ();
var atom0 = this.asc.ac;
for (var i = 0; i < this.noAtoms; i++) {
var tokens = this.getTokens ();
var atom = this.asc.addNewAtom ();
atom.atomName = tokens[4];
var x = this.parseFloatStr (tokens[0]);
var y = this.parseFloatStr (tokens[1]);
var z = this.parseFloatStr (tokens[2]);
atom.set (x, y, z);
this.rdSiesta ();
}
this.discardLinesUntilContains ("outcell: Unit cell vectors");
this.setCell ("vectors");
var atoms = this.asc.atoms;
var ac = this.asc.ac;
for (var i = atom0; i < ac; i++) this.setAtomCoord (atoms[i]);

this.discardLinesUntilContains ("siesta: E_KS(eV) = ");
var tokens = this.getTokens ();
var energy = Double.$valueOf (Double.parseDouble (tokens[3]));
this.asc.setAtomSetEnergy ("" + energy, energy.floatValue ());
this.asc.setCurrentModelInfo ("Energy", energy);
this.asc.setInfo ("Energy", energy);
this.asc.setAtomSetName ("Energy = " + energy + " eV");
});
Clazz.defineStatics (c$,
"ACF_M", 1.0E10,
"ACF_NM", 10.0,
"ACF_ANG", 1.0,
"ACF_BOHR", 0.529177);
});
