Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.simple.CubeReader", ["JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ac = 0;
this.isAngstroms = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.simple, "CubeReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.asc.newAtomSet ();
this.readTitleLines ();
this.readAtomCountAndOrigin ();
this.readLines (3);
this.readAtoms ();
this.applySymmetryAndSetTrajectory ();
this.continuing = false;
});
Clazz.defineMethod (c$, "readTitleLines", 
 function () {
if (this.rd ().indexOf ("#JVXL") == 0) while (this.rd ().indexOf ("#") == 0) {
}
this.checkCurrentLineForScript ();
var name = this.line.trim ();
this.rd ();
this.checkCurrentLineForScript ();
this.asc.setAtomSetName (name + " - " + this.line.trim ());
});
Clazz.defineMethod (c$, "readAtomCountAndOrigin", 
 function () {
this.rd ();
this.isAngstroms = (this.line.indexOf ("ANGSTROMS") >= 0);
var tokens = this.getTokens ();
if (tokens[0].charAt (0) == '+') tokens[0] = tokens[0].substring (1);
this.ac = Math.abs (this.parseIntStr (tokens[0]));
});
Clazz.defineMethod (c$, "readAtoms", 
 function () {
var f = (this.isAngstroms ? 1 : 0.5291772);
for (var i = 0; i < this.ac; ++i) {
var tokens = JU.PT.getTokens (this.rd ());
this.setAtomCoordScaled (null, tokens, 2, f).elementNumber = this.parseIntStr (tokens[0]);
}
});
});
