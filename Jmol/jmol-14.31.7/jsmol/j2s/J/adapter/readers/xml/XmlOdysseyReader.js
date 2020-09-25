Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.readers.xml.XmlReader"], "J.adapter.readers.xml.XmlOdysseyReader", ["java.lang.Float", "JU.P3", "$.PT", "J.adapter.smarter.Atom"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelName = null;
this.formula = null;
this.phase = null;
this.formalCharge = -2147483648;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xml, "XmlOdysseyReader", J.adapter.readers.xml.XmlReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.xml.XmlOdysseyReader, []);
});
Clazz.overrideMethod (c$, "processStartElement", 
function (localName, nodeName) {
if ("structure".equals (localName)) {
this.asc.newAtomSet ();
return;
}if ("atom".equals (localName)) {
var id = this.atts.get ("id");
(this.atom =  new J.adapter.smarter.Atom ()).atomName = this.atts.get (this.atts.containsKey ("label") ? "label" : "id");
if (id != null && this.stateScriptVersionInt >= 140400) this.asc.atomSymbolicMap.put (id, this.atom);
if (this.atts.containsKey ("xyz")) {
var xyz = this.atts.get ("xyz");
var tokens = JU.PT.getTokens (xyz);
this.atom.set (this.parseFloatStr (tokens[0]), this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]));
}if (this.atts.containsKey ("element")) {
this.atom.elementSymbol = this.atts.get ("element");
}return;
}if ("bond".equals (localName)) {
var atom1 = this.atts.get ("a");
var atom2 = this.atts.get ("b");
var order = 1;
if (this.atts.containsKey ("order")) order = this.parseBondToken (this.atts.get ("order"));
this.asc.addNewBondFromNames (atom1, atom2, order);
return;
}if ("group".equals (localName)) {
var charge = this.atts.get ("charge");
if (charge != null && charge.indexOf (".") < 0) {
this.formalCharge = JU.PT.parseInt (charge);
}return;
}if ("member".equals (localName) && this.formalCharge != -2147483648) {
var atom = this.asc.getAtomFromName (this.atts.get ("entity"));
if (atom != null) atom.formalCharge = this.formalCharge;
return;
}if ("boundary".equals (localName)) {
var boxDim = JU.PT.getTokens (this.atts.get ("box"));
var x = this.parseFloatStr (boxDim[0]);
var y = this.parseFloatStr (boxDim[1]);
var z = this.parseFloatStr (boxDim[2]);
this.parent.setUnitCellItem (0, x);
this.parent.setUnitCellItem (1, y);
this.parent.setUnitCellItem (2, z);
this.parent.setUnitCellItem (3, 90);
this.parent.setUnitCellItem (4, 90);
this.parent.setUnitCellItem (5, 90);
var pt = JU.P3.new3 (-x / 2, -y / 2, -z / 2);
var atoms = this.asc.atoms;
for (var i = this.asc.ac; --i >= 0; ) {
atoms[i].sub (pt);
this.parent.setAtomCoord (atoms[i]);
}
if (this.parent.latticeCells[0] == 0) this.parent.latticeCells[0] = this.parent.latticeCells[1] = this.parent.latticeCells[2] = 1;
return;
}if ("odyssey_simulation".equals (localName)) {
if (this.modelName != null && this.phase != null) this.modelName += " - " + this.phase;
if (this.modelName != null) this.asc.setAtomSetName (this.modelName);
if (this.formula != null) this.asc.setCurrentModelInfo ("formula", this.formula);
}if ("title".equals (localName) || "formula".equals (localName) || "phase".equals (localName)) this.setKeepChars (true);
}, "~S,~S");
Clazz.defineMethod (c$, "parseBondToken", 
 function (str) {
if (str.length >= 1) {
switch (str.charAt (0)) {
case 's':
return 1;
case 'd':
return 2;
case 't':
return 3;
case 'a':
return 515;
}
return this.parseIntStr (str);
}return 1;
}, "~S");
Clazz.overrideMethod (c$, "processEndElement", 
function (localName) {
if ("atom".equals (localName)) {
if (this.atom.elementSymbol != null && !Float.isNaN (this.atom.z)) {
this.asc.addAtomWithMappedName (this.atom);
}this.atom = null;
return;
}if ("group".equals (localName)) {
this.formalCharge = -2147483648;
} else if ("title".equals (localName)) {
this.modelName = this.chars.toString ();
} else if ("formula".equals (localName)) {
this.formula = this.chars.toString ();
} else if ("phase".equals (localName)) {
this.phase = this.chars.toString ();
}this.setKeepChars (false);
}, "~S");
});
