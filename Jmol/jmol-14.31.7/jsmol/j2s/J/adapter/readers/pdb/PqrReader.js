Clazz.declarePackage ("J.adapter.readers.pdb");
Clazz.load (["J.adapter.readers.pdb.PdbReader"], "J.adapter.readers.pdb.PqrReader", null, function () {
c$ = Clazz.declareType (J.adapter.readers.pdb, "PqrReader", J.adapter.readers.pdb.PdbReader);
Clazz.overrideMethod (c$, "setAdditionalAtomParameters", 
function (atom) {
if (this.gromacsWideFormat) {
atom.partialCharge = this.parseFloatRange (this.line, 60, 68);
atom.radius = J.adapter.readers.pdb.PdbReader.fixRadius (this.parseFloatRange (this.line, 68, 76));
} else {
var tokens = this.getTokens ();
var pt = tokens.length - 2 - (this.line.length > 75 ? 1 : 0);
atom.partialCharge = this.parseFloatStr (tokens[pt++]);
atom.radius = J.adapter.readers.pdb.PdbReader.fixRadius (this.parseFloatStr (tokens[pt]));
}}, "J.adapter.smarter.Atom");
});
