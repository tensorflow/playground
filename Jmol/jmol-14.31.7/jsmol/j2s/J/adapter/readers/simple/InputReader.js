Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "java.util.Hashtable", "JU.Lst", "$.P3", "$.P4", "$.V3"], "J.adapter.readers.simple.InputReader", ["java.lang.Exception", "$.Float", "JU.Measure", "$.PT", "$.Quat", "J.adapter.smarter.Atom", "$.Bond", "J.api.JmolAdapter", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ac = 0;
this.vAtoms = null;
this.atomMap = null;
this.tokens = null;
this.isJmolZformat = false;
this.lineBuffer = null;
this.symbolicMap = null;
this.isMopac = false;
this.isHeader = true;
this.firstLine = true;
this.pt0 = null;
this.v1 = null;
this.v2 = null;
this.plane1 = null;
this.plane2 = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.simple, "InputReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.vAtoms =  new JU.Lst ();
this.atomMap =  new java.util.Hashtable ();
this.lineBuffer =  new JU.Lst ();
this.symbolicMap =  new java.util.Hashtable ();
this.pt0 =  new JU.P3 ();
this.v1 =  new JU.V3 ();
this.v2 =  new JU.V3 ();
this.plane1 =  new JU.P4 ();
this.plane2 =  new JU.P4 ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.firstLine) {
this.firstLine = false;
var tokens = this.getTokens ();
if (tokens.length == 3 && this.parseIntStr (tokens[0]) > 0 && this.parseIntStr (tokens[1]) > 0 && this.parseIntStr (tokens[2]) > 0) {
this.readConFile ();
return this.continuing = false;
}}this.cleanLine ();
if (this.line.length <= 2) this.isHeader = false;
if (this.line.startsWith ("#") || this.line.startsWith ("*") || this.isMopac && this.isHeader) {
if (this.line.startsWith ("#ZMATRIX")) this.isJmolZformat = this.line.toUpperCase ().indexOf ("GAUSSIAN") < 0 && !(this.isMopac = (this.line.toUpperCase ().indexOf ("MOPAC") >= 0));
this.checkCurrentLineForScript ();
return true;
}if (this.line.indexOf ("#") >= 0) this.line = this.line.substring (0, this.line.indexOf ("#"));
if (this.line.indexOf (":") >= 0) return true;
if (this.line.contains ("$molecule")) {
this.rd ();
return this.readBlock ("$end");
}if (this.line.startsWith ("$")) return true;
if (this.line.contains ("%mem")) {
this.discardLinesUntilBlank ();
this.discardLinesUntilBlank ();
this.rd ();
return this.readBlock (null);
}if (this.line.contains ("ATOMS cartesian")) {
return this.readBlock ("END");
}if (this.line.contains ("geometry units angstroms")) {
return this.readBlock ("end");
}if (this.line.contains ("&zmat")) {
return this.readBlock ("&");
}if (this.line.contains ("%coords")) {
this.discardLinesUntilContains ("coords");
return this.readBlock ("end");
}if (this.line.contains ("GEOM=PQS")) {
return this.readBlock ("BASIS");
}if (this.line.contains ("geometry={")) {
this.readLines (2);
return this.readBlock ("}");
}this.tokens = this.getTokens ();
if (this.tokens.length > 10) return this.readVFI ();
switch (this.tokens.length) {
case 1:
if (this.tokens[0].indexOf ("=") < 0) {
this.lineBuffer.clear ();
break;
}this.tokens = JU.PT.split (this.tokens[0], "=");
case 2:
if (this.parseIntStr (this.line) > 0 && this.parseInt () >= 0) {
this.readCFI ();
return (this.continuing = false);
}this.getSymbolic ();
return true;
case 10:
if (this.tokens[0].equals ("0")) return (this.continuing = false);
if (this.tokens[1].indexOf (".") < 0) return true;
if (this.lineBuffer.size () > 0 && this.lineBuffer.get (this.lineBuffer.size () - 1).length < 8) this.lineBuffer.clear ();
break;
}
this.lineBuffer.addLast (this.tokens);
return true;
});
Clazz.defineMethod (c$, "readConFile", 
 function () {
this.rd ();
var map =  new java.util.Hashtable ();
var lstTokens =  new JU.Lst ();
var n = 0;
while (this.rd () != null && this.line.length > 40) {
n++;
var tokens = this.getTokens ();
lstTokens.addLast (tokens);
map.put (tokens[1], this.addAtomXYZSymName (tokens, 2, tokens[0], null));
}
for (var i = 0; i < n; i++) {
var tokens = lstTokens.get (i);
var a = map.get (tokens[1]);
for (var j = 6; j < tokens.length; j++) this.asc.addBond ( new J.adapter.smarter.Bond (a.index, map.get (tokens[j]).index, 1));

}
});
Clazz.defineMethod (c$, "readCFI", 
 function () {
this.tokens = this.getTokens ();
var nAtoms = Clazz.floatToInt (this.getValue (0));
var nBonds = Clazz.floatToInt (this.getValue (1));
var map =  new java.util.Hashtable ();
for (var i = 0; i < nAtoms; i++) {
this.tokens = JU.PT.getTokens (this.rd ());
if (this.tokens[1].equals ("0") || this.tokens[1].equals ("2")) continue;
var a = this.addAtomXYZSymName (this.tokens, 2, null, null);
a.elementNumber = Clazz.floatToShort (this.getValue (1));
map.put (this.tokens[0], a);
}
var bonds = this.fillFloatArray (null, 0,  Clazz.newFloatArray (nBonds * 2, 0));
var orders = this.fillFloatArray (null, 0,  Clazz.newFloatArray (nBonds, 0));
for (var i = 0, pt = 0; i < nBonds; i++) this.asc.addBond ( new J.adapter.smarter.Bond (map.get ("" + Clazz.floatToInt (bonds[pt++])).index, map.get ("" + Clazz.floatToInt (bonds[pt++])).index, Clazz.floatToInt (orders[i])));

});
Clazz.defineMethod (c$, "readVFI", 
 function () {
var map =  new java.util.Hashtable ();
var bonds =  new JU.Lst ();
while (this.tokens != null && this.tokens.length > 0) {
for (var i = this.tokens.length; --i >= 11; ) bonds.addLast ( Clazz.newArray (-1, [this.tokens[3], this.tokens[i]]));

var id = this.tokens[3];
this.tokens = (this.tokens[2].equals ("0") ?  Clazz.newArray (-1, [this.tokens[4]]) : this.tokens[1].equals ("0") ?  Clazz.newArray (-1, [this.tokens[4], this.tokens[2], this.tokens[5]]) : this.tokens[0].equals ("0") ?  Clazz.newArray (-1, [this.tokens[4], this.tokens[2], this.tokens[5], this.tokens[1], this.tokens[7]]) :  Clazz.newArray (-1, [this.tokens[4], this.tokens[2], this.tokens[5], this.tokens[1], this.tokens[7], this.tokens[0], this.tokens[9]]));
var atom = this.getAtom ();
map.put (id, atom);
this.tokens = JU.PT.getTokens (this.rd ());
}
for (var i = bonds.size (); --i >= 0; ) {
var b = bonds.get (i);
this.asc.addBond ( new J.adapter.smarter.Bond (map.get (b[0]).index, map.get (b[1]).index, 1));
}
return (this.continuing = false);
});
Clazz.defineMethod (c$, "readBlock", 
 function (strEnd) {
this.lineBuffer.clear ();
while (this.rd () != null && this.cleanLine () != null && (strEnd == null ? this.line.length > 0 : this.line.indexOf (strEnd) < 0)) this.lineBuffer.addLast (this.getTokens ());

return (this.continuing = false);
}, "~S");
Clazz.defineMethod (c$, "cleanLine", 
 function () {
this.line = this.line.$replace (',', ' ');
var pt1;
var pt2;
while ((pt1 = this.line.indexOf ('(')) >= 0 && (pt2 = this.line.indexOf ('(', pt1)) >= 0) this.line = this.line.substring (0, pt1) + " " + this.line.substring (pt2 + 1);

return (this.line = this.line.trim ());
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
var firstLine = 0;
for (var i = firstLine; i < this.lineBuffer.size (); i++) if ((this.tokens = this.lineBuffer.get (i)).length > 0) this.getAtom ();

this.finalizeReaderASCR ();
});
Clazz.defineMethod (c$, "getSymbolic", 
 function () {
if (this.symbolicMap.containsKey (this.tokens[0])) return;
var f = this.parseFloatStr (this.tokens[1]);
this.symbolicMap.put (this.tokens[0], Float.$valueOf (f));
JU.Logger.info ("symbolic " + this.tokens[0] + " = " + f);
});
Clazz.defineMethod (c$, "getAtom", 
 function () {
var atom =  new J.adapter.smarter.Atom ();
var element = this.tokens[0];
var i = element.length;
while (--i >= 0 && JU.PT.isDigit (element.charAt (i))) {
}
if (++i == 0) element = J.api.JmolAdapter.getElementSymbol (this.parseIntStr (element));
if (i == 0 || i == element.length) {
atom.atomName = element + (this.ac + 1);
} else {
atom.atomName = element;
element = element.substring (0, i);
}if (this.isMopac && i != this.tokens[0].length) element = this.tokens[0].substring (i) + element;
this.parseAtomTokens (atom, element);
return atom;
});
Clazz.defineMethod (c$, "parseAtomTokens", 
 function (atom, element) {
this.setElementAndIsotope (atom, element);
if (this.tokens.length > 5 && this.tokens[1].indexOf (".") >= 0) {
var t = this.tokens;
var l = t.length;
this.tokens = (t[l - 3].equals ("0") ?  Clazz.newArray (-1, [t[0]]) : t[l - 2].equals ("0") ?  Clazz.newArray (-1, [t[0], t[l - 3], t[1]]) : t[l - 1].equals ("0") ?  Clazz.newArray (-1, [t[0], t[l - 3], t[1], t[l - 2], t[3]]) :  Clazz.newArray (-1, [t[0], t[l - 3], t[1], t[l - 2], t[3], t[l - 1], t[5]]));
}var ia = this.getAtomIndex (1);
var bondOrder = 0;
switch (this.tokens.length) {
case 8:
case 6:
atom = this.getAtomGeneral (atom, ia, bondOrder = Clazz.floatToInt (this.getValue (this.tokens.length - 1)));
break;
case 5:
if (this.tokens[1].equals ("0")) {
atom.set (this.getValue (2), this.getValue (3), this.getValue (4));
break;
}case 7:
atom = this.getAtomGeneral (atom, ia, 0);
break;
case 4:
if (this.getAtomIndex (1) < 0) {
atom.set (this.getValue (1), this.getValue (2), this.getValue (3));
break;
}bondOrder = Clazz.floatToInt (this.getValue (3));
case 3:
if (this.ac != 1 || (ia = this.getAtomIndex (1)) != 0) {
atom = null;
} else {
atom.set (this.getValue (2), 0, 0);
}break;
case 1:
if (this.ac != 0) atom = null;
 else atom.set (0, 0, 0);
break;
default:
atom = null;
}
if (atom == null) throw  new Exception ("bad Z-Matrix line");
this.vAtoms.addLast (atom);
this.atomMap.put (atom.atomName, Integer.$valueOf (this.ac++));
if (element.startsWith ("X") && J.api.JmolAdapter.getElementNumber (element) < 1) {
JU.Logger.info ("#dummy atom ignored: atom " + this.ac + " - " + atom.atomName);
} else {
this.asc.addAtom (atom);
this.setAtomCoord (atom);
JU.Logger.info (atom.atomName + " " + atom.x + " " + atom.y + " " + atom.z);
if (bondOrder < 0 || this.isJmolZformat && bondOrder > 0) this.asc.addBond ( new J.adapter.smarter.Bond (atom.index, this.vAtoms.get (ia).index, Math.abs (bondOrder)));
}}, "J.adapter.smarter.Atom,~S");
Clazz.defineMethod (c$, "getAtomGeneral", 
 function (atom, ia, bondOrder) {
var ib;
var ic;
if (this.tokens.length < 7 && this.ac != 2 || (ib = this.getAtomIndex (3)) < 0 || (ic = (this.tokens.length < 7 ? -2 : this.getAtomIndex (5))) == -1) {
return null;
}var d = this.getValue (2);
var theta1 = this.getValue (4);
var theta2 = (this.tokens.length < 7 ? 3.4028235E38 : this.getValue (6));
if (this.tokens.length == 8 && !this.isJmolZformat && !this.isMopac && bondOrder == 1) d = -Math.abs (d);
return atom = this.setAtom (atom, ia, ib, ic, d, theta1, theta2);
}, "J.adapter.smarter.Atom,~N,~N");
Clazz.defineMethod (c$, "getSymbolic", 
 function (key) {
var isNeg = key.startsWith ("-");
var F = this.symbolicMap.get (isNeg ? key.substring (1) : key);
if (F == null) return NaN;
var f = F.floatValue ();
return (isNeg ? -f : f);
}, "~S");
Clazz.defineMethod (c$, "getValue", 
 function (i) {
var f = this.getSymbolic (this.tokens[i]);
if (Float.isNaN (f)) {
f = this.parseFloatStr (this.tokens[i]);
if (Float.isNaN (f)) throw  new Exception ("Bad Z-matrix value: " + this.tokens[i]);
}return f;
}, "~N");
Clazz.defineMethod (c$, "getAtomIndex", 
 function (i) {
var name;
if (i >= this.tokens.length || (name = this.tokens[i]).indexOf (".") >= 0 || !JU.PT.isLetterOrDigit (name.charAt (0))) return -1;
var ia = this.parseIntStr (name);
if (ia <= 0 || name.length != ("" + ia).length) {
var I = this.atomMap.get (name);
if (I == null) {
for (i = this.vAtoms.size (); --i >= 0; ) {
var atom = this.vAtoms.get (i);
if (atom.atomName.startsWith (name) && atom.atomName.length > name.length && JU.PT.isDigit (atom.atomName.charAt (name.length))) {
I = this.atomMap.get (atom.atomName);
break;
}}
}if (I == null) ia = -1;
 else ia = I.intValue ();
} else {
ia--;
}return ia;
}, "~N");
Clazz.defineMethod (c$, "setAtom", 
function (atom, ia, ib, ic, d, theta1, theta2) {
if (Float.isNaN (theta1) || Float.isNaN (theta2)) return null;
this.pt0.setT (this.vAtoms.get (ia));
this.v1.sub2 (this.vAtoms.get (ib), this.pt0);
this.v1.normalize ();
if (theta2 == 3.4028235E38) {
this.v2.set (0, 0, 1);
(JU.Quat.newVA (this.v2, theta1)).transform2 (this.v1, this.v2);
} else if (d >= 0) {
this.v2.sub2 (this.vAtoms.get (ic), this.pt0);
this.v2.cross (this.v1, this.v2);
(JU.Quat.newVA (this.v2, theta1)).transform2 (this.v1, this.v2);
(JU.Quat.newVA (this.v1, -theta2)).transform2 (this.v2, this.v2);
} else {
JU.Measure.getPlaneThroughPoint (this.setAtom (atom, ia, ib, ic, -d, theta1, 0), this.v1, this.plane1);
JU.Measure.getPlaneThroughPoint (this.setAtom (atom, ia, ic, ib, -d, theta2, 0), this.v1, this.plane2);
var list = JU.Measure.getIntersectionPP (this.plane1, this.plane2);
if (list.size () == 0) return null;
this.pt0.setT (list.get (0));
d = Math.sqrt (d * d - this.pt0.distanceSquared (this.vAtoms.get (ia))) * Math.signum (theta1) * Math.signum (theta2);
this.v2.setT (list.get (1));
}atom.scaleAdd2 (d, this.v2, this.pt0);
return atom;
}, "J.adapter.smarter.Atom,~N,~N,~N,~N,~N,~N");
});
