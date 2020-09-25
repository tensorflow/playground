Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "java.util.Hashtable", "JU.Lst", "$.SB"], "J.adapter.readers.xtal.MagresReader", ["java.lang.Double", "JU.PT", "J.adapter.smarter.Atom", "JU.Escape", "$.Logger", "$.Tensor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.currentBlock = -1;
this.cellParams = null;
this.magresUnits = null;
this.interactionTensors = null;
this.header = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "MagresReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.magresUnits =  new java.util.Hashtable ();
this.interactionTensors =  new JU.Lst ();
this.header =  new JU.SB ();
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.setFractionalCoordinates (false);
this.ignoreFileSpaceGroupName = true;
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.asc.setInfo ("fileHeader", this.header.toString ());
this.finalizeReaderASCR ();
if (this.interactionTensors.size () > 0) this.asc.setCurrentModelInfo ("interactionTensors", this.interactionTensors);
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (!this.trimLine ()) return true;
switch (this.checkBlock ()) {
case 0:
this.header.append (this.line).append ("\n");
this.appendLoadNote (this.line);
break;
case 1:
if (this.cellParams == null && this.line.startsWith ("lattice")) return this.readCellParams ();
if (this.line.startsWith ("symmetry")) return this.readSymmetry ();
if (this.line.startsWith ("units")) return this.setUnits (false);
if (this.line.startsWith ("atom")) return this.readAtom ();
break;
case 2:
if (this.line.startsWith ("units")) return this.setUnits (true);
return this.readTensor ();
}
return true;
});
Clazz.defineMethod (c$, "trimLine", 
 function () {
var pt = this.line.indexOf ("#");
if (pt >= 0) this.line = this.line.substring (0, pt);
this.line = this.line.trim ();
return (this.line.length > 0);
});
Clazz.defineMethod (c$, "checkBlock", 
 function () {
if (!(this.line.startsWith ("<") && this.line.endsWith (">")) && !(this.line.startsWith ("[") && this.line.endsWith ("]"))) return this.currentBlock;
this.line = JU.PT.rep (this.line, "<", "[");
this.line = JU.PT.rep (this.line, ">", "]");
switch (Clazz.doubleToInt (("...............[calculation]..[/calculation].[atoms]........[/atoms].......[magres].......[/magres]......").indexOf (this.line + ".") / 15)) {
case 0:
JU.Logger.info ("block indicator ignored: " + this.line);
break;
case 1:
if (this.currentBlock == -1) this.currentBlock = 0;
break;
case 2:
if (this.currentBlock == 0) this.currentBlock = -1;
break;
case 3:
if (this.currentBlock == -1) {
this.currentBlock = 1;
this.asc.newAtomSet ();
this.magresUnits =  new java.util.Hashtable ();
}break;
case 4:
if (this.currentBlock == 1) this.currentBlock = -1;
break;
case 5:
if (this.currentBlock == -1) {
this.currentBlock = 2;
this.magresUnits =  new java.util.Hashtable ();
this.asc.setCurrentModelInfo ("magresUnits", this.magresUnits);
}break;
case 6:
if (this.currentBlock == 2) this.currentBlock = -1;
break;
}
return -2;
});
Clazz.defineMethod (c$, "setUnits", 
 function (isMagresBlock) {
var tokens = this.getTokens ();
var id = tokens[1];
if (isMagresBlock) this.appendLoadNote ("Ellipsoid set " + JU.PT.esc (id) + ": " + (id.startsWith ("ms") ? "Magnetic Shielding" : id.startsWith ("efg") ? "Electric Field Gradient" : id.startsWith ("isc") ? "J-Coupling" : "?"));
this.magresUnits.put (id, tokens[2]);
return true;
}, "~B");
Clazz.defineMethod (c$, "readSymmetry", 
 function () {
this.setSymmetryOperator (this.getTokens ()[1]);
return true;
});
Clazz.defineMethod (c$, "readCellParams", 
 function () {
var tokens = this.getTokens ();
this.cellParams =  Clazz.newFloatArray (9, 0);
for (var i = 0; i < 9; i++) this.cellParams[i] = this.parseFloatStr (tokens[i + 1]);

this.addExplicitLatticeVector (0, this.cellParams, 0);
this.addExplicitLatticeVector (1, this.cellParams, 3);
this.addExplicitLatticeVector (2, this.cellParams, 6);
this.setSpaceGroupName ("P1");
return true;
});
Clazz.defineMethod (c$, "readAtom", 
 function () {
var units = this.magresUnits.get ("atom");
if (units == null) return true;
var f = (units.startsWith ("A") ? 1 : 0.5291772);
var tokens = this.getTokens ();
var atom =  new J.adapter.smarter.Atom ();
var pt = 1;
atom.elementSymbol = tokens[pt++];
atom.atomName = J.adapter.readers.xtal.MagresReader.getAtomName (tokens[pt++], tokens[pt++]);
this.asc.addAtomWithMappedName (atom);
var x = this.parseFloatStr (tokens[pt++]) * f;
var y = this.parseFloatStr (tokens[pt++]) * f;
var z = this.parseFloatStr (tokens[pt++]) * f;
atom.set (x, y, z);
this.setAtomCoord (atom);
return true;
});
c$.getAtomName = Clazz.defineMethod (c$, "getAtomName", 
 function (name, index) {
return name + "_" + index;
}, "~S,~S");
Clazz.defineMethod (c$, "readTensor", 
 function () {
var tokens = this.getTokens ();
var type = tokens[0];
var units = this.magresUnits.get (type);
if (units == null) {
JU.Logger.warn (type + " ignored; no units defined; line: " + this.line);
return true;
}var isIsc = type.startsWith ("isc");
if (tokens.length == 10) {
this.magresUnits.remove (type);
var data =  Clazz.newFloatArray (9, 0);
for (var i = 0; i < 9; ) data[i] = this.parseFloatStr (tokens[++i]);

JU.Logger.info ("Magres reader creating magres_" + type + ": " + JU.Escape.eAF (data));
this.asc.setCurrentModelInfo ("magres_" + type, data);
}var atomName1 = J.adapter.readers.xtal.MagresReader.getAtomName (tokens[1], tokens[2]);
var pt = 3;
var atomName2 = (isIsc ? J.adapter.readers.xtal.MagresReader.getAtomName (tokens[pt++], tokens[pt++]) : null);
if (atomName1.equals (atomName2)) {
JU.Logger.warn (type + " ignored; atom1 == atom2 for " + atomName1 + " line: " + this.line);
return true;
}var id = atomName1;
if (atomName2 != null) id += "//" + atomName2;
var a =  Clazz.newDoubleArray (3, 3, 0);
for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) a[i][j] = Double.$valueOf (tokens[pt++]).doubleValue ();


var a1 = this.asc.getAtomFromName (atomName1);
if (a1 == null) return true;
var a2 = null;
var t =  new JU.Tensor ().setFromAsymmetricTensor (a, type, id);
if (atomName2 == null) {
a1.addTensor (t, null, false);
} else {
a2 = this.asc.getAtomFromName (atomName2);
if (a2 == null) return true;
this.interactionTensors.addLast (t);
}t.setAtomIndexes (a1.index, (a2 == null ? -1 : a2.index));
return true;
});
Clazz.defineStatics (c$,
"BLOCK_NEW", -2,
"BLOCK_NONE", -1,
"BLOCK_CALC", 0,
"BLOCK_ATOMS", 1,
"BLOCK_MAGRES", 2);
});
