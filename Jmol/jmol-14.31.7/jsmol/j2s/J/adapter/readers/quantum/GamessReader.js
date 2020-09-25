Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.MOReader"], "J.adapter.readers.quantum.GamessReader", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "J.adapter.readers.quantum.BasisFunctionReader", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atomNames = null;
this.calcOptions = null;
this.isTypeSet = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "GamessReader", J.adapter.readers.quantum.MOReader);
Clazz.defineMethod (c$, "readEnergy", 
function () {
var tokens = JU.PT.getTokens (this.line.substring (this.line.indexOf ("ENERGY")));
if (tokens.length < 3) return;
var strEnergy = tokens[2];
var e = this.parseFloatStr (strEnergy);
if (!Float.isNaN (e)) this.asc.setAtomSetEnergy (strEnergy, e);
});
Clazz.defineMethod (c$, "readGaussianBasis", 
function (initiator, terminator) {
var gdata =  new JU.Lst ();
this.gaussianCount = 0;
var nGaussians = 0;
this.shellCount = 0;
var thisShell = "0";
var tokens;
this.discardLinesUntilContains (initiator);
this.rd ();
var slater = null;
var shellsByAtomType =  new java.util.Hashtable ();
var slatersByAtomType =  new JU.Lst ();
var atomType = null;
while (this.rd () != null && this.line.indexOf (terminator) < 0) {
if (this.line.indexOf ("(") >= 0) this.line = J.adapter.readers.quantum.GamessReader.fixBasisLine (this.line);
tokens = this.getTokens ();
switch (tokens.length) {
case 1:
if (atomType != null) {
if (slater != null) {
slater[2] = nGaussians;
slatersByAtomType.addLast (slater);
slater = null;
}shellsByAtomType.put (atomType, slatersByAtomType);
}slatersByAtomType =  new JU.Lst ();
atomType = tokens[0];
break;
case 0:
break;
default:
if (!tokens[0].equals (thisShell)) {
if (slater != null) {
slater[2] = nGaussians;
slatersByAtomType.addLast (slater);
}thisShell = tokens[0];
this.shellCount++;
slater =  Clazz.newIntArray (-1, [J.adapter.readers.quantum.BasisFunctionReader.getQuantumShellTagID (this.fixShellTag (tokens[1])), this.gaussianCount, 0]);
nGaussians = 0;
}++nGaussians;
++this.gaussianCount;
gdata.addLast (tokens);
}
}
if (slater != null) {
slater[2] = nGaussians;
slatersByAtomType.addLast (slater);
}if (atomType != null) shellsByAtomType.put (atomType, slatersByAtomType);
this.gaussians = JU.AU.newFloat2 (this.gaussianCount);
for (var i = 0; i < this.gaussianCount; i++) {
tokens = gdata.get (i);
this.gaussians[i] =  Clazz.newFloatArray (tokens.length - 3, 0);
for (var j = 3; j < tokens.length; j++) this.gaussians[i][j - 3] = this.parseFloatStr (tokens[j]);

}
var ac = this.atomNames.size ();
if (this.shells == null && ac > 0) {
this.shells =  new JU.Lst ();
for (var i = 0; i < ac; i++) {
atomType = this.atomNames.get (i);
var slaters = shellsByAtomType.get (atomType);
if (slaters == null) {
JU.Logger.error ("slater for atom " + i + " atomType " + atomType + " was not found in listing. Ignoring molecular orbitals");
return;
}for (var j = 0; j < slaters.size (); j++) {
slater = slaters.get (j);
this.shells.addLast ( Clazz.newIntArray (-1, [i + 1, slater[0], slater[1] + 1, slater[2]]));
}
}
}if (this.debugging) {
JU.Logger.debug (this.shellCount + " slater shells read");
JU.Logger.debug (this.gaussianCount + " gaussian primitives read");
}}, "~S,~S");
Clazz.defineMethod (c$, "readFrequencies", 
function () {
this.discardLinesUntilContains ("FREQUENCY:");
var haveFreq = false;
while (this.line != null && this.line.indexOf ("FREQUENCY:") >= 0) {
var frequencyCount = 0;
var tokens = this.getTokens ();
var frequencies =  Clazz.newFloatArray (tokens.length, 0);
for (var i = 0; i < tokens.length; i++) {
var frequency = this.parseFloatStr (tokens[i]);
if (tokens[i].equals ("I")) frequencies[frequencyCount - 1] = -frequencies[frequencyCount - 1];
if (Float.isNaN (frequency)) continue;
frequencies[frequencyCount++] = frequency;
if (this.debugging) {
JU.Logger.debug ((this.vibrationNumber + 1) + " frequency=" + frequency);
}}
var red_masses = null;
var intensities = null;
this.rd ();
if (this.line.indexOf ("MASS") >= 0) {
red_masses = this.getTokens ();
this.rd ();
}if (this.line.indexOf ("INTENS") >= 0) {
intensities = this.getTokens ();
}var ac = this.asc.getLastAtomSetAtomCount ();
var iAtom0 = this.asc.ac;
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
for (var i = 0; i < frequencyCount; i++) {
ignore[i] = !this.doGetVibration (++this.vibrationNumber);
if (ignore[i]) continue;
if (haveFreq) {
this.asc.cloneLastAtomSet ();
} else {
haveFreq = true;
iAtom0 -= ac;
}this.asc.setAtomSetFrequency (this.vibrationNumber, null, null, "" + frequencies[i], null);
if (red_masses != null) this.asc.setAtomSetModelProperty ("ReducedMass", red_masses[red_masses.length - frequencyCount + i] + " AMU");
if (intensities != null) this.asc.setAtomSetModelProperty ("IRIntensity", intensities[intensities.length - frequencyCount + i] + " D^2/AMU-Angstrom^2");
}
this.discardLinesUntilBlank ();
this.fillFrequencyData (iAtom0, ac, ac, ignore, false, 20, 12, null, 0, null);
this.readLines (13);
}
});
c$.fixBasisLine = Clazz.defineMethod (c$, "fixBasisLine", 
function (line) {
var pt;
var pt1;
line = line.$replace (')', ' ');
while ((pt = line.indexOf ("(")) >= 0) {
pt1 = pt;
while (line.charAt (--pt1) == ' ') {
}
while (line.charAt (--pt1) != ' ') {
}
line = line.substring (0, ++pt1) + line.substring (pt + 1);
}
return line;
}, "~S");
Clazz.defineMethod (c$, "setCalculationType", 
function () {
if (this.calcOptions == null || this.isTypeSet) return;
this.isTypeSet = true;
var SCFtype = this.calcOptions.get ("contrl_options_SCFTYP");
var Runtype = this.calcOptions.get ("contrl_options_RUNTYP");
var igauss = this.calcOptions.get ("basis_options_IGAUSS");
var gbasis = this.calcOptions.get ("basis_options_GBASIS");
var DFunc = !"0".equals (this.calcOptions.get ("basis_options_NDFUNC"));
var PFunc = !"0".equals (this.calcOptions.get ("basis_options_NPFUNC"));
var FFunc = !"0".equals (this.calcOptions.get ("basis_options_NFFUNC"));
var DFTtype = this.calcOptions.get ("contrl_options_DFTTYP");
var perturb = this.parseIntStr (this.calcOptions.get ("contrl_options_MPLEVL"));
var CItype = this.calcOptions.get ("contrl_options_CITYP");
var CCtype = this.calcOptions.get ("contrl_options_CCTYP");
if (igauss == null && SCFtype == null) return;
if (this.calculationType.equals ("?")) this.calculationType = "";
if (igauss != null) {
if ("0".equals (igauss)) {
var recognized = false;
if (this.calculationType.length > 0) this.calculationType += " ";
if (gbasis.startsWith ("ACC")) this.calculationType += "aug-cc-p";
if (gbasis.startsWith ("CC")) this.calculationType += "cc-p";
if ((gbasis.startsWith ("ACC") || gbasis.startsWith ("CC")) && gbasis.endsWith ("C")) this.calculationType += "C";
if (gbasis.indexOf ("CCD") >= 0) {
this.calculationType += "VDZ";
recognized = true;
}if (gbasis.indexOf ("CCT") >= 0) {
this.calculationType += "VTZ";
recognized = true;
}if (gbasis.indexOf ("CCQ") >= 0) {
this.calculationType += "VQZ";
recognized = true;
}if (gbasis.indexOf ("CC5") >= 0) {
this.calculationType += "V5Z";
recognized = true;
}if (gbasis.indexOf ("CC6") >= 0) {
this.calculationType += "V6Z";
recognized = true;
}if (!recognized) this.calculationType += gbasis;
} else {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += igauss + "-" + JU.PT.rep (gbasis, "N", "");
if ("T".equals (this.calcOptions.get ("basis_options_DIFFSP"))) {
if ("T".equals (this.calcOptions.get ("basis_options_DIFFS"))) this.calculationType += "+";
this.calculationType += "+";
}this.calculationType += "G";
if (DFunc || PFunc || FFunc) {
this.calculationType += "(";
if (FFunc) {
this.calculationType += "f";
if (DFunc || PFunc) this.calculationType += ",";
}if (DFunc) {
this.calculationType += "d";
if (PFunc) this.calculationType += ",";
}if (PFunc) this.calculationType += "p";
this.calculationType += ")";
}}if (DFTtype != null && DFTtype.indexOf ("NONE") < 0) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += DFTtype;
}if (CItype != null && CItype.indexOf ("NONE") < 0) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += CItype;
}if (CCtype != null && CCtype.indexOf ("NONE") < 0) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += CCtype;
}if (perturb > 0) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += "MP" + perturb;
}if (SCFtype != null) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += SCFtype + " " + Runtype;
}}});
Clazz.defineMethod (c$, "readControlInfo", 
function () {
this.readCalculationInfo ("contrl_options_");
});
Clazz.defineMethod (c$, "readBasisInfo", 
function () {
this.readCalculationInfo ("basis_options_");
});
Clazz.defineMethod (c$, "readCalculationInfo", 
 function (type) {
if (this.calcOptions == null) {
this.calcOptions =  new java.util.Hashtable ();
this.asc.setInfo ("calculationOptions", this.calcOptions);
}while (this.rd () != null && (this.line = this.line.trim ()).length > 0) {
if (this.line.indexOf ("=") < 0) continue;
var tokens = JU.PT.getTokens (JU.PT.rep (this.line, "=", " = ") + " ?");
for (var i = 0; i < tokens.length; i++) {
if (!tokens[i].equals ("=")) continue;
try {
var key = type + tokens[i - 1];
var value = (key.equals ("basis_options_SPLIT3") ? tokens[++i] + " " + tokens[++i] + " " + tokens[++i] : tokens[++i]);
if (this.debugging) JU.Logger.debug (key + " = " + value);
this.calcOptions.put (key, value);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}
}
}, "~S");
});
