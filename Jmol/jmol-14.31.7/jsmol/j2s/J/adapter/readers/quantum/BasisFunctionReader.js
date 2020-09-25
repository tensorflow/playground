Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "java.util.Hashtable", "JU.Lst", "J.quantum.QS"], "J.adapter.readers.quantum.BasisFunctionReader", ["java.util.Arrays", "JU.PT", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.shells = null;
this.moData = null;
this.orbitals = null;
this.nOrbitals = 0;
this.ignoreMOs = false;
this.alphaBeta = "";
this.dfCoefMaps = null;
this.filterTokens = null;
this.filterIsNot = false;
this.spin = null;
if (!Clazz.isClassDefined ("J.adapter.readers.quantum.BasisFunctionReader.MOEnergySorter")) {
J.adapter.readers.quantum.BasisFunctionReader.$BasisFunctionReader$MOEnergySorter$ ();
}
this.orbitalMaps = null;
this.highLEnabled = null;
this.nCoef = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "BasisFunctionReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.moData =  new java.util.Hashtable ();
this.orbitals =  new JU.Lst ();
this.orbitalMaps =  new java.util.Hashtable ();
this.highLEnabled =  Clazz.newIntArray (J.quantum.QS.idSpherical.length, 0);
});
Clazz.defineMethod (c$, "filterMO", 
function () {
var isHeader = (this.line.indexOf ('\n') == 0);
if (!isHeader && !this.doReadMolecularOrbitals) return false;
var isOK = true;
this.line += " " + this.alphaBeta;
var ucline = this.line.toUpperCase ();
if (this.filter != null) {
var nOK = 0;
if (this.filterTokens == null) {
this.filterIsNot = (this.filter.indexOf ("!") >= 0);
this.filterTokens = JU.PT.getTokens (this.filter.$replace ('!', ' ').$replace (',', ' ').$replace (';', ' '));
}for (var i = 0; i < this.filterTokens.length; i++) if (ucline.indexOf (this.filterTokens[i]) >= 0) {
if (!this.filterIsNot) {
nOK = this.filterTokens.length;
break;
}} else if (this.filterIsNot) {
nOK++;
}
isOK = (nOK == this.filterTokens.length);
if (!isHeader) JU.Logger.info ("filter MOs: " + isOK + " for \"" + this.line + "\"");
}this.spin = (ucline.indexOf ("ALPHA") >= 0 ? "alpha" : ucline.indexOf ("BETA") >= 0 ? "beta" : null);
return isOK;
});
Clazz.defineMethod (c$, "setMO", 
function (mo) {
if (this.dfCoefMaps != null) mo.put ("dfCoefMaps", this.dfCoefMaps);
this.orbitals.addLast (mo);
mo.put ("index", Integer.$valueOf (this.orbitals.size ()));
if (this.spin != null) mo.put ("spin", this.spin);
this.moData.put ("highLEnabled", this.highLEnabled);
}, "java.util.Map");
Clazz.defineMethod (c$, "getDFMap", 
function (shell, fileList, shellType, jmolList, minLength) {
this.orbitalMaps.put (shell, fileList);
this.moData.put ("orbitalMaps", this.orbitalMaps);
this.enableShell (shellType);
if (fileList.equals (jmolList)) return true;
this.getDfCoefMaps ();
var isOK = J.quantum.QS.createDFMap (this.dfCoefMaps[shellType], fileList, jmolList, minLength);
if (!isOK) JU.Logger.error ("Disabling orbitals of type " + shellType + " -- Cannot read orbital order for: " + fileList + "\n expecting: " + jmolList);
return isOK;
}, "~S,~S,~N,~S,~N");
Clazz.defineMethod (c$, "enableShell", 
function (shellType) {
this.highLEnabled[shellType] = 1;
}, "~N");
Clazz.defineMethod (c$, "getDfCoefMaps", 
function () {
return (this.dfCoefMaps == null ? (this.dfCoefMaps = J.quantum.QS.getNewDfCoefMap ()) : this.dfCoefMaps);
});
c$.canonicalizeQuantumSubshellTag = Clazz.defineMethod (c$, "canonicalizeQuantumSubshellTag", 
function (tag) {
var firstChar = tag.charAt (0);
if (firstChar == 'X' || firstChar == 'Y' || firstChar == 'Z') {
var sorted = tag.toCharArray ();
java.util.Arrays.sort (sorted);
return  String.instantialize (sorted);
}return tag;
}, "~S");
Clazz.defineMethod (c$, "fixSlaterTypes", 
function (typeOld, typeNew) {
if (this.shells == null) return 0;
this.nCoef = 0;
for (var i = this.shells.size (); --i >= 0; ) {
var slater = this.shells.get (i);
if (slater[1] == typeOld) slater[1] = typeNew;
var m = this.getDfCoefMaps ()[slater[1]].length;
this.nCoef += m;
}
return this.nCoef;
}, "~N,~N");
c$.getQuantumShellTagIDSpherical = Clazz.defineMethod (c$, "getQuantumShellTagIDSpherical", 
function (tag) {
return J.quantum.QS.getQuantumShellTagIDSpherical (tag);
}, "~S");
c$.getQuantumShellTagID = Clazz.defineMethod (c$, "getQuantumShellTagID", 
function (tag) {
return J.quantum.QS.getQuantumShellTagID (tag);
}, "~S");
c$.getQuantumShellTag = Clazz.defineMethod (c$, "getQuantumShellTag", 
function (id) {
return J.quantum.QS.getQuantumShellTag (id);
}, "~N");
Clazz.overrideMethod (c$, "discardPreviousAtoms", 
function () {
this.asc.discardPreviousAtoms ();
this.moData.remove ("mos");
this.orbitals.clear ();
});
Clazz.defineMethod (c$, "clearOrbitals", 
function () {
this.orbitals =  new JU.Lst ();
this.moData =  new java.util.Hashtable ();
this.alphaBeta = "";
});
c$.$BasisFunctionReader$MOEnergySorter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum.BasisFunctionReader, "MOEnergySorter", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
var c = ((a).get ("energy")).floatValue ();
var d = ((b).get ("energy")).floatValue ();
return (c < d ? -1 : c > d ? 1 : 0);
}, "~O,~O");
c$ = Clazz.p0p ();
};
});
