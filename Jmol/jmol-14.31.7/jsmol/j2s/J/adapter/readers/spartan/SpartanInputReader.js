Clazz.declarePackage ("J.adapter.readers.spartan");
Clazz.load (["J.adapter.readers.quantum.BasisFunctionReader"], "J.adapter.readers.spartan.SpartanInputReader", ["JU.PT", "J.adapter.smarter.Bond", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelAtomCount = 0;
this.bondData = "";
this.constraints = "";
Clazz.instantialize (this, arguments);
}, J.adapter.readers.spartan, "SpartanInputReader", J.adapter.readers.quantum.BasisFunctionReader);
Clazz.defineMethod (c$, "readInputRecords", 
function () {
var ac0 = this.asc.ac;
var modelName = this.readInputHeader ();
while (this.rd () != null) {
var tokens = this.getTokens ();
if (tokens.length == 2 && this.parseIntStr (tokens[0]) != -2147483648 && this.parseIntStr (tokens[1]) >= 0) break;
}
if (this.line == null) return null;
this.readInputAtoms ();
this.discardLinesUntilContains ("ATOMLABELS");
if (this.line != null) this.readAtomNames ();
if (this.modelAtomCount > 1) {
this.discardLinesUntilContains ("HESSIAN");
if (this.line != null) this.readBonds (ac0);
if (this.line != null && this.line.indexOf ("BEGINCONSTRAINTS") >= 0) this.readConstraints ();
}while (this.line != null && this.line.indexOf ("END ") < 0 && this.line.indexOf ("MOLSTATE") < 0) this.rd ();

if (this.line != null && this.line.indexOf ("MOLSTATE") >= 0) this.readTransform ();
return modelName;
});
Clazz.defineMethod (c$, "readConstraints", 
 function () {
this.constraints = "";
while (this.rd () != null && this.line.indexOf ("END") < 0) this.constraints += (this.constraints === "" ? "" : "\n") + this.line;

this.rd ();
if (this.constraints.length == 0) return;
this.asc.setCurrentModelInfo ("constraints", this.constraints);
this.asc.setAtomSetModelProperty (".PATH", "EnergyProfile");
this.asc.setAtomSetModelProperty ("Constraint", this.constraints);
});
Clazz.defineMethod (c$, "readTransform", 
 function () {
this.rd ();
var tokens = JU.PT.getTokens (this.rd () + " " + this.rd ());
this.setTransform (this.parseFloatStr (tokens[0]), this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[4]), this.parseFloatStr (tokens[5]), this.parseFloatStr (tokens[6]), this.parseFloatStr (tokens[8]), this.parseFloatStr (tokens[9]), this.parseFloatStr (tokens[10]));
});
Clazz.defineMethod (c$, "readInputHeader", 
 function () {
while (this.rd () != null && !this.line.startsWith (" ")) {
}
this.rd ();
return this.line.substring (0, (this.line + ";").indexOf (";")).trim ();
});
Clazz.defineMethod (c$, "readInputAtoms", 
 function () {
this.modelAtomCount = 0;
while (this.rd () != null && !this.line.startsWith ("ENDCART")) {
var tokens = this.getTokens ();
this.addAtomXYZSymName (tokens, 1, J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (this.parseIntStr (tokens[0])), null);
this.modelAtomCount++;
}
if (this.debugging) JU.Logger.debug (this.asc.ac + " atoms read");
});
Clazz.defineMethod (c$, "readAtomNames", 
 function () {
var atom0 = this.asc.ac - this.modelAtomCount;
for (var i = 0; i < this.modelAtomCount; i++) {
this.line = this.rd ().trim ();
var name = this.line.substring (1, this.line.length - 1);
this.asc.atoms[atom0 + i].atomName = name;
}
});
Clazz.defineMethod (c$, "readBonds", 
 function (ac0) {
var nAtoms = this.modelAtomCount;
this.bondData = "";
while (this.rd () != null && !this.line.startsWith ("ENDHESS")) {
var tokens = this.getTokens ();
this.bondData += this.line + " ";
if (nAtoms == 0) {
var sourceIndex = this.parseIntStr (tokens[0]) - 1 + ac0;
var targetIndex = this.parseIntStr (tokens[1]) - 1 + ac0;
var bondOrder = this.parseIntStr (tokens[2]);
if (bondOrder > 0) {
this.asc.addBond ( new J.adapter.smarter.Bond (sourceIndex, targetIndex, bondOrder < 4 ? bondOrder : bondOrder == 5 ? 515 : 1));
}} else {
nAtoms -= tokens.length;
}}
this.rd ();
if (this.debugging) JU.Logger.debug (this.asc.bondCount + " bonds read");
}, "~N");
});
