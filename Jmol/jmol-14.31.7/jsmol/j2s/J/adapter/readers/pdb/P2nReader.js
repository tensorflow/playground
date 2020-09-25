Clazz.declarePackage ("J.adapter.readers.pdb");
Clazz.load (["J.adapter.readers.pdb.PdbReader", "JU.Lst"], "J.adapter.readers.pdb.P2nReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.altNames = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.pdb, "P2nReader", J.adapter.readers.pdb.PdbReader);
Clazz.prepareFields (c$, function () {
this.altNames =  new JU.Lst ();
});
Clazz.overrideMethod (c$, "setAdditionalAtomParameters", 
function (atom) {
var altName = this.line.substring (69, 72).trim ();
if (altName.length == 0) altName = atom.atomName;
if (this.useAltNames) atom.atomName = altName;
 else this.altNames.addLast (altName);
}, "J.adapter.smarter.Atom");
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.finalizeReaderPDB ();
if (!this.useAltNames) this.asc.setCurrentModelInfo ("altName", this.altNames.toArray ( new Array (this.altNames.size ())));
});
});
