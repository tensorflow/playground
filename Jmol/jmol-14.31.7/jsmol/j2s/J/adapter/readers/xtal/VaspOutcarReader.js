Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "JU.Lst"], "J.adapter.readers.xtal.VaspOutcarReader", ["java.lang.Double", "JU.DF", "$.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atomNames = null;
this.ac = 0;
this.inputOnly = false;
this.mDsimulation = false;
this.isVersion5 = false;
this.elementNames = null;
this.gibbsEnergy = null;
this.gibbsEntropy = null;
this.electronEne = null;
this.kinEne = null;
this.totEne = null;
this.temp = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "VaspOutcarReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.elementNames =  new JU.Lst ();
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.isPrimitive = true;
this.setSpaceGroupName ("P1");
this.setFractionalCoordinates (true);
this.inputOnly = this.checkFilterKey ("INPUT");
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.contains (" vasp.5")) {
this.isVersion5 = true;
} else if (this.line.toUpperCase ().contains ("TITEL")) {
this.readElementNames ();
} else if (this.line.contains ("ions per type")) {
this.readAtomCountAndSetNames ();
} else if (this.line.contains ("molecular dynamics for ions")) {
this.mDsimulation = true;
} else if (this.line.contains ("direct lattice vectors")) {
this.readUnitCellVectors ();
} else if (this.line.contains ("position of ions in fractional coordinates")) {
this.readInitialCoordinates ();
if (this.inputOnly) this.continuing = false;
} else if (this.line.contains ("POSITION")) {
this.readPOSITION ();
return true;
} else if (this.line.startsWith ("  FREE ENERGIE") && !this.mDsimulation) {
this.readEnergy ();
} else if (this.line.contains ("ENERGIE OF THE ELECTRON-ION-THERMOSTAT") && this.mDsimulation) {
this.readMdyn ();
} else if (this.line.startsWith (" Eigenvectors and eigenvalues of the dynamical matrix")) {
this.readFrequency ();
}return true;
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.setSymmetry ();
});
Clazz.defineMethod (c$, "readElementNames", 
 function () {
this.elementNames.addLast (this.getTokens ()[3]);
});
Clazz.defineMethod (c$, "readAtomCountAndSetNames", 
 function () {
var numofElement =  Clazz.newIntArray (100, 0);
var tokens = JU.PT.getTokens (this.line.substring (this.line.indexOf ("=") + 1));
this.ac = 0;
for (var i = 0; i < tokens.length; i++) this.ac += (numofElement[i] = this.parseIntStr (tokens[i]));

this.atomNames =  new Array (this.ac);
var nElements = this.elementNames.size ();
for (var pt = 0, i = 0; i < nElements; i++) for (var j = 0; j < numofElement[i]; j++) this.atomNames[pt++] = this.elementNames.get (i);


});
Clazz.defineMethod (c$, "readUnitCellVectors", 
 function () {
if (this.asc.ac > 0) {
this.setSymmetry ();
this.asc.newAtomSet ();
this.setAtomSetInfo ();
}var f =  Clazz.newFloatArray (3, 0);
for (var i = 0; i < 3; i++) this.addExplicitLatticeVector (i, this.fillFloatArray (this.fixMinus (this.rd ()), 0, f), 0);

});
Clazz.defineMethod (c$, "fixMinus", 
 function (line) {
return JU.PT.rep (line, "-", " -");
}, "~S");
Clazz.defineMethod (c$, "setSymmetry", 
 function () {
this.applySymmetryAndSetTrajectory ();
this.setSpaceGroupName ("P1");
this.setFractionalCoordinates (false);
});
Clazz.defineMethod (c$, "readInitialCoordinates", 
 function () {
var counter = 0;
while (this.rd () != null && this.line.length > 10) {
this.addAtomXYZSymName (JU.PT.getTokens (this.fixMinus (this.line)), 0, null, this.atomNames[counter++]);
}
this.asc.setAtomSetName ("Initial Coordinates");
});
Clazz.defineMethod (c$, "readPOSITION", 
 function () {
var counter = 0;
this.readLines (1);
while (this.rd () != null && this.line.indexOf ("----------") < 0) this.addAtomXYZSymName (this.getTokens (), 0, null, this.atomNames[counter++]);

});
Clazz.defineMethod (c$, "readEnergy", 
 function () {
this.rd ();
var tokens = JU.PT.getTokens (this.rd ());
this.gibbsEnergy = Double.$valueOf (Double.parseDouble (tokens[4]));
this.rd ();
tokens = JU.PT.getTokens (this.rd ());
var enthalpy = Double.parseDouble (tokens[3]);
this.gibbsEntropy = Double.$valueOf (enthalpy - this.gibbsEnergy.doubleValue ());
});
Clazz.defineMethod (c$, "setAtomSetInfo", 
 function () {
if (this.gibbsEnergy == null) return;
this.asc.setAtomSetEnergy ("" + this.gibbsEnergy, this.gibbsEnergy.floatValue ());
this.asc.setCurrentModelInfo ("Energy", this.gibbsEnergy);
this.asc.setCurrentModelInfo ("Entropy", this.gibbsEntropy);
this.asc.setInfo ("Energy", this.gibbsEnergy);
this.asc.setInfo ("Entropy", this.gibbsEntropy);
this.asc.setAtomSetName ("G = " + this.gibbsEnergy + " eV, T*S = " + this.gibbsEntropy + " eV");
});
Clazz.defineMethod (c$, "readMdyn", 
 function () {
var tokens = this.getTokens ();
this.rd ();
tokens = JU.PT.getTokens (this.rd ());
this.electronEne = Double.$valueOf (Double.parseDouble (tokens[4]));
tokens = JU.PT.getTokens (this.rd ());
this.kinEne = Double.$valueOf (Double.parseDouble (tokens[4]));
this.temp = this.parseFloatStr (tokens[6]);
this.readLines (3);
tokens = JU.PT.getTokens (this.rd ());
this.totEne = Double.$valueOf (Double.parseDouble (tokens[4]));
this.setAtomSetInfoMd ();
});
Clazz.defineMethod (c$, "setAtomSetInfoMd", 
 function () {
this.asc.setAtomSetName ("Temp. = " + JU.DF.formatDecimal ((this.temp), 2) + " K, Energy = " + this.totEne + " eV");
this.asc.setCurrentModelInfo ("Energy", this.totEne);
this.asc.setInfo ("Energy", this.totEne);
this.asc.setCurrentModelInfo ("EleEnergy", this.kinEne);
this.asc.setInfo ("EleEnergy", this.electronEne);
this.asc.setCurrentModelInfo ("Kinetic", this.electronEne);
this.asc.setInfo ("Kinetic", this.kinEne);
this.asc.setCurrentModelInfo ("Temperature", JU.DF.formatDecimal ((this.temp), 2));
this.asc.setInfo ("Temperature", JU.DF.formatDecimal ((this.temp), 2));
});
Clazz.defineMethod (c$, "readFrequency", 
 function () {
var pt = this.asc.iSet;
this.asc.baseSymmetryAtomCount = this.ac;
if (this.isVersion5) {
this.readLines (3);
} else {
this.discardLinesUntilContains ("Eigenvectors after division by SQRT(mass)");
this.readLines (5);
}var ignore =  Clazz.newBooleanArray (1, false);
while (this.rd () != null && (this.line.contains ("f  = ") || this.line.contains ("f/i= "))) {
this.applySymmetryAndSetTrajectory ();
var iAtom0 = this.asc.ac;
this.cloneLastAtomSet (this.ac, null);
if (!ignore[0]) {
this.asc.iSet = ++pt;
this.asc.setAtomSetFrequency (this.vibrationNumber, null, null, this.line.substring (this.line.indexOf ("2PiTHz") + 6, this.line.indexOf ("c") - 1).trim (), null);
}this.rd ();
this.fillFrequencyData (iAtom0, this.ac, this.ac, ignore, true, 35, 12, null, 0, null);
this.rd ();
}
});
});
