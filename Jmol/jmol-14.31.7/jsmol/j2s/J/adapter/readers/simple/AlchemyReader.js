Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.simple.AlchemyReader", ["java.lang.Character", "JU.PT", "J.adapter.smarter.Atom"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isM3D = false;
this.ac = 0;
this.bondCount = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.simple, "AlchemyReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.asc.newAtomSet ();
this.rd ();
if (this.line.indexOf ("ATOMS") < 0) {
this.isM3D = true;
this.rd ();
}var tokens = this.getTokens ();
this.ac = this.parseIntStr (tokens[0]);
this.bondCount = this.parseIntStr (tokens[this.isM3D ? 1 : 2]);
this.readAtoms ();
this.readBonds ();
this.continuing = false;
});
Clazz.defineMethod (c$, "readAtoms", 
 function () {
var pt = (this.isM3D ? 3 : 2);
for (var i = this.ac; --i >= 0; ) {
var tokens = JU.PT.getTokens (this.rd ());
var atom =  new J.adapter.smarter.Atom ();
atom.atomSerial = this.parseIntStr (tokens[0]);
var name = tokens[1];
if (!this.isM3D) {
atom.atomName = name;
atom.elementSymbol = name.substring (0, 1);
var c1 = name.charAt (0);
var c2 = ' ';
var nChar = (name.length == 2 && (J.adapter.smarter.Atom.isValidSym2 (c1, c2 = Character.toLowerCase (name.charAt (1))) || name.equals ("Du")) ? 2 : 1);
name = (nChar == 1 ? "" + c1 : "" + c1 + c2);
}atom.elementSymbol = name;
this.setAtomCoordTokens (atom, tokens, pt);
atom.partialCharge = (tokens.length >= 6 ? this.parseFloatStr (tokens[pt + 3]) : 0);
this.asc.addAtomWithMappedSerialNumber (atom);
}
});
Clazz.defineMethod (c$, "readBonds", 
 function () {
for (var i = this.bondCount; --i >= 0; ) {
var tokens = JU.PT.getTokens (this.rd ());
var atomSerial1 = tokens[1];
var atomSerial2 = tokens[2];
var sOrder = (tokens.length < 4 ? "1" : tokens[3].toUpperCase ());
var order = 0;
switch (sOrder.charAt (0)) {
default:
case '1':
case 'S':
order = 1;
break;
case '2':
case 'D':
order = 2;
break;
case '3':
case 'T':
order = 3;
break;
case 'A':
order = 515;
break;
case 'H':
order = 2048;
break;
}
this.asc.addNewBondFromNames (atomSerial1, atomSerial2, order);
}
});
});
