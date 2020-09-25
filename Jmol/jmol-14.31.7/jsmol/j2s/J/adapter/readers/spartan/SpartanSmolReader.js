Clazz.declarePackage ("J.adapter.readers.spartan");
Clazz.load (["J.adapter.readers.spartan.SpartanInputReader"], "J.adapter.readers.spartan.SpartanSmolReader", ["java.lang.Boolean", "java.util.Hashtable", "JU.BC", "$.PT", "$.SB", "J.adapter.readers.spartan.SpartanArchive", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.iHaveModelStatement = false;
this.isCompoundDocument = false;
this.inputOnly = false;
this.espCharges = false;
this.natCharges = false;
this.isInputFirst = false;
this.iHaveNewDir = false;
this.title = null;
this.spartanArchive = null;
this.titles = null;
this.haveCharges = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.spartan, "SpartanSmolReader", J.adapter.readers.spartan.SpartanInputReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.isCompoundDocument = (this.rd ().indexOf ("Compound Document File Directory") >= 0);
this.inputOnly = this.checkFilterKey ("INPUT");
this.natCharges = this.checkFilterKey ("NATCHAR");
this.espCharges = !this.natCharges && !this.checkFilterKey ("MULLIKEN");
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
var pt = 3;
var isNewDir = (this.isCompoundDocument && this.line.startsWith ("NEW Directory M") && !this.line.startsWith ("NEW Directory Molecules"));
if (isNewDir) this.iHaveNewDir = true;
var isMolecule = (!this.iHaveNewDir && !isNewDir && this.isCompoundDocument && this.line.equals ("BEGIN Directory Entry Molecule"));
var isMacDir = (!this.isCompoundDocument && (pt = this.line.indexOf ("#JMOL_MODEL")) >= 0);
if (isNewDir || isMolecule || isMacDir) {
if (this.modelNumber > 0 && !this.isInputFirst) this.applySymmetryAndSetTrajectory ();
this.iHaveModelStatement = true;
var modelNo = (isMolecule ? 0 : this.parseIntAt (this.line, pt + 12));
this.modelNumber = (this.bsModels == null && modelNo != -2147483648 && modelNo != 0 ? modelNo : this.modelNumber + 1);
this.bondData = "";
if (!this.doGetModel (this.modelNumber, null)) {
if (this.isInputFirst) {
this.asc.removeCurrentAtomSet ();
this.discardLinesUntilContains ("BEGIN Directory Entry Input");
} else if (isNewDir) {
this.discardLinesUntilContains ("NEW Directory M");
} else if (isMolecule) {
this.discardLinesUntilContains ("BEGIN Directory Entry M");
} else {
this.discardLinesUntilContains ("#JMOL_MODEL");
}this.checkLastModel ();
return false;
}if (!this.isInputFirst) {
this.makeNewAtomSet ();
}this.moData =  new java.util.Hashtable ();
this.moData.put ("isNormalized", Boolean.TRUE);
var isOK = false;
if (modelNo == -2147483648 || this.titles == null) {
modelNo = this.modelNumber;
this.title = "Model " + modelNo;
} else {
isOK = true;
this.title = this.titles.get ("Title" + modelNo);
this.title = "Profile " + modelNo + (this.title == null ? "" : ": " + this.title);
}if (this.constraints == null && (isOK || !this.isInputFirst)) this.asc.setAtomSetName (this.title);
this.setModelPDB (false);
this.asc.setCurrentAtomSetNumber (modelNo);
if (isMolecule) this.readMyTransform ();
return true;
}if (this.iHaveModelStatement && !this.doProcessLines) return true;
if ((this.line.indexOf ("BEGIN") == 0)) {
var lcline = this.line.toLowerCase ();
if (lcline.endsWith ("input")) {
if (!this.iHaveModelStatement) this.isInputFirst = true;
if (this.isInputFirst) {
this.makeNewAtomSet ();
}this.bondData = "";
this.title = this.readInputRecords ();
if (this.asc.errorMessage != null) {
this.continuing = false;
return false;
}if (this.title != null && this.constraints == null) this.asc.setAtomSetName (this.title);
this.setCharges ();
if (this.inputOnly) {
this.continuing = false;
return false;
}} else if (lcline.endsWith ("_output")) {
return true;
} else if (lcline.endsWith ("output")) {
this.readOutput ();
return false;
} else if (lcline.endsWith ("molecule") || lcline.endsWith ("molecule:asbinarystring")) {
this.readMyTransform ();
return false;
} else if (lcline.endsWith ("proparc") || lcline.endsWith ("propertyarchive")) {
this.readProperties ();
return false;
} else if (lcline.endsWith ("archive")) {
this.asc.setAtomSetName (this.readArchive ());
return false;
}return true;
}if (this.line.indexOf ("5D shell") >= 0) this.moData.put ("calculationType", this.calculationType = this.line);
return true;
});
Clazz.defineMethod (c$, "makeNewAtomSet", 
 function () {
if (this.asc.ac == 0) this.asc.removeCurrentAtomSet ();
this.asc.newAtomSet ();
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.finalizeReaderASCR ();
if (this.asc.ac > 0 && this.spartanArchive != null && this.asc.bondCount == 0 && this.bondData != null) this.spartanArchive.addBonds (this.bondData, 0);
if (this.moData != null) {
var n = this.asc.atomSetInfo.get ("HOMO_N");
if (n != null) {
var i = n.intValue ();
this.moData.put ("HOMO", Integer.$valueOf (i));
}}});
Clazz.defineMethod (c$, "readMyTransform", 
 function () {
var mat;
var binaryCodes = this.rd ();
var tokens = JU.PT.getTokens (binaryCodes.trim ());
if (tokens.length < 16) return;
var bytes =  Clazz.newByteArray (tokens.length, 0);
for (var i = 0; i < tokens.length; i++) bytes[i] = JU.PT.parseIntRadix (tokens[i], 16);

mat =  Clazz.newFloatArray (16, 0);
for (var i = 16, j = bytes.length - 8; --i >= 0; j -= 8) mat[i] = JU.BC.bytesToDoubleToFloat (bytes, j, false);

this.setTransform (mat[0], mat[1], mat[2], mat[4], mat[5], mat[6], mat[8], mat[9], mat[10]);
});
Clazz.defineMethod (c$, "readOutput", 
 function () {
this.titles =  new java.util.Hashtable ();
var header =  new JU.SB ();
var pt;
while (this.rd () != null && !this.line.startsWith ("END ")) {
header.append (this.line).append ("\n");
if ((pt = this.line.indexOf (")")) > 0) this.titles.put ("Title" + this.parseIntRange (this.line, 0, pt), (this.line.substring (pt + 1).trim ()));
}
this.asc.setInfo ("fileHeader", header.toString ());
});
Clazz.defineMethod (c$, "readArchive", 
 function () {
this.spartanArchive =  new J.adapter.readers.spartan.SpartanArchive (this, this.bondData, "END Directory Entry ", 0);
var modelName = this.readArchiveHeader ();
if (modelName != null) this.modelAtomCount = this.spartanArchive.readArchive (this.line, false, this.asc.ac, false);
return (this.constraints == null ? modelName : null);
});
Clazz.defineMethod (c$, "setCharges", 
 function () {
if (this.haveCharges || this.asc.ac == 0) return;
this.haveCharges = (this.espCharges && this.asc.setAtomSetCollectionPartialCharges ("ESPCHARGES") || this.natCharges && this.asc.setAtomSetCollectionPartialCharges ("NATCHARGES") || this.asc.setAtomSetCollectionPartialCharges ("MULCHARGES") || this.asc.setAtomSetCollectionPartialCharges ("Q1_CHARGES") || this.asc.setAtomSetCollectionPartialCharges ("ESPCHARGES"));
});
Clazz.defineMethod (c$, "readProperties", 
 function () {
if (this.modelAtomCount == 0) {
this.rd ();
return;
}if (this.spartanArchive == null) this.spartanArchive =  new J.adapter.readers.spartan.SpartanArchive (this, this.bondData, "END Directory Entry ", this.modelAtomCount);
this.spartanArchive.readProperties ();
this.rd ();
this.setCharges ();
});
Clazz.defineMethod (c$, "readArchiveHeader", 
 function () {
var modelInfo = this.rd ();
if (this.debugging) JU.Logger.debug (modelInfo);
if (modelInfo.indexOf ("Error:") == 0) return null;
this.asc.setCollectionName (modelInfo);
this.asc.setAtomSetName (modelInfo);
var modelName = this.rd ();
if (this.debugging) JU.Logger.debug (modelName);
this.rd ();
return modelName;
});
Clazz.defineMethod (c$, "setEnergy", 
function (value) {
this.asc.setAtomSetName (this.constraints + (this.constraints.length == 0 ? "" : " ") + "Energy=" + value + " KJ");
}, "~N");
Clazz.defineStatics (c$,
"endCheck", "END Directory Entry ");
});
