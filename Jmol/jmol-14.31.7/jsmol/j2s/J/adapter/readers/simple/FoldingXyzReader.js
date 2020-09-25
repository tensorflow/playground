Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.simple.FoldingXyzReader", ["java.util.Hashtable", "JU.PT", "J.adapter.smarter.Atom"], function () {
c$ = Clazz.declareType (J.adapter.readers.simple, "FoldingXyzReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
if (this.asc.bondCount > 0) this.asc.setNoAutoBond ();
this.isTrajectory = false;
this.finalizeReaderASCR ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
var next =  Clazz.newIntArray (-1, [0]);
var token = JU.PT.parseTokenNext (this.line, next);
if (token == null) return true;
var addAtoms = this.doGetModel (++this.modelNumber, null);
var modelAtomCount = this.parseIntStr (token);
if (addAtoms) {
this.asc.newAtomSet ();
var tokens = this.getTokens ();
this.asc.setAtomSetName (tokens.length == 2 ? "Protein " + tokens[1] : this.line.substring (next[0]).trim ());
}var readLine = this.readAtoms (modelAtomCount + 1, addAtoms);
this.continuing = !addAtoms || !this.isLastModel (this.modelNumber);
return readLine;
});
Clazz.defineMethod (c$, "readAtoms", 
function (ac, addAtoms) {
var htBondCounts =  new java.util.Hashtable ();
var bonds =  new Array (ac);
var haveAtomTypes = true;
var checking = true;
var lastAtom = null;
var readNextLine = true;
for (var i = 0; i < ac; i++) {
this.discardLinesUntilNonBlank ();
if (this.line == null) break;
var tokens = this.getTokens ();
var sIndex = tokens[0];
if (sIndex.equals (lastAtom)) {
readNextLine = false;
break;
}lastAtom = sIndex;
if (!addAtoms) continue;
var atom =  new J.adapter.smarter.Atom ();
atom.atomName = tokens[1];
atom.elementSymbol = this.getElement (tokens[1]);
atom.atomSerial = this.parseIntStr (sIndex);
if (!this.filterAtom (atom, i)) continue;
this.setAtomCoordTokens (atom, tokens, 2);
this.asc.addAtomWithMappedSerialNumber (atom);
var n = tokens.length - 5;
bonds[i] =  new Array (n + 1);
bonds[i][n] = sIndex;
for (var j = 0; j < n; j++) {
var t = tokens[j + 5];
var i2 = this.parseIntStr (t);
bonds[i][j] = t;
if (checking) {
if (n == 0 || t.equals (sIndex) || i2 <= 0 || i2 > ac) {
haveAtomTypes = (n > 0);
checking = false;
} else {
var count = htBondCounts.get (t);
if (count == null) htBondCounts.put (t, count =  Clazz.newIntArray (1, 0));
if (++count[0] > 10) haveAtomTypes = !(checking = false);
}}}
}
if (addAtoms) {
this.makeBonds (bonds, !checking && haveAtomTypes);
this.applySymmetryAndSetTrajectory ();
}return readNextLine;
}, "~N,~B");
Clazz.defineMethod (c$, "makeBonds", 
 function (bonds, haveAtomTypes) {
for (var i = bonds.length; --i >= 0; ) {
var b = bonds[i];
if (b == null) continue;
var a1 = this.asc.getAtomFromName (b[b.length - 1]);
var b0 = 0;
if (haveAtomTypes) a1.atomName += "\0" + b[b0++];
for (var j = b.length - 1; --j >= b0; ) {
var a2 = this.asc.getAtomFromName (b[j]);
if (a1.index < a2.index) this.asc.addNewBondWithOrderA (a1, a2, 1);
}
}
}, "~A,~B");
Clazz.defineMethod (c$, "getElement", 
 function (name) {
var n = name.length;
switch (n) {
case 1:
break;
default:
var c1 = name.charAt (0);
var c2 = name.charAt (1);
n = (J.adapter.smarter.Atom.isValidSym2 (c1, c2) || c1 == 'C' && c2 == 'L' ? 2 : 1);
}
return name.substring (0, n);
}, "~S");
});
