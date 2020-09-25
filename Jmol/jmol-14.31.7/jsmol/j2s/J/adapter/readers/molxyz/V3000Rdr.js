Clazz.declarePackage ("J.adapter.readers.molxyz");
Clazz.load (null, "J.adapter.readers.molxyz.V3000Rdr", ["java.util.Hashtable", "JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mr = null;
this.line = null;
this.userData = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.molxyz, "V3000Rdr");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (mr) {
this.mr = mr;
return this;
}, "J.adapter.smarter.AtomSetCollectionReader");
Clazz.defineMethod (c$, "readAtomsAndBonds", 
function (tokens) {
var ac = this.mr.parseIntStr (tokens[3]);
this.readAtoms (ac);
this.readBonds (this.mr.parseIntStr (tokens[4]));
this.readUserData (ac);
}, "~A");
Clazz.defineMethod (c$, "readAtoms", 
 function (ac) {
this.mr.discardLinesUntilContains ("BEGIN ATOM");
for (var i = 0; i < ac; ++i) {
this.rd ();
this.checkLineContinuation ();
var tokens = this.mr.getTokens ();
var iAtom = this.mr.parseIntStr (tokens[2]);
var elementSymbol = tokens[3];
if (elementSymbol.equals ("*")) continue;
var x = this.mr.parseFloatStr (tokens[4]);
var y = this.mr.parseFloatStr (tokens[5]);
var z = this.mr.parseFloatStr (tokens[6]);
var charge = 0;
var isotope = 0;
for (var j = 7; j < tokens.length; j++) {
var s = tokens[j].toUpperCase ();
if (s.startsWith ("CHG=")) charge = this.mr.parseIntAt (tokens[j], 4);
 else if (s.startsWith ("MASS=")) isotope = this.mr.parseIntAt (tokens[j], 5);
}
if (isotope > 1 && elementSymbol.equals ("H")) isotope = 1 - isotope;
this.mr.addMolAtom (iAtom, isotope, elementSymbol, charge, x, y, z);
}
this.mr.discardLinesUntilContains ("END ATOM");
}, "~N");
Clazz.defineMethod (c$, "readBonds", 
 function (bondCount) {
this.mr.discardLinesUntilContains ("BEGIN BOND");
if (bondCount == 0) this.mr.asc.setNoAutoBond ();
for (var i = 0; i < bondCount; ++i) {
this.rd ();
var stereo = 0;
this.checkLineContinuation ();
var tokens = this.mr.getTokens ();
var order = this.mr.parseIntStr (tokens[3]);
var iAtom1 = tokens[4];
var iAtom2 = tokens[5];
var cfg = this.getField ("CFG");
if (cfg == null) {
var endpts = this.getField ("ENDPTS");
if (endpts != null && this.line.indexOf ("ATTACH=ALL") >= 0) {
tokens = JU.PT.getTokens (endpts);
var n = this.mr.parseIntStr (tokens[0]);
var o = this.mr.fixOrder (order, 0);
for (var k = 1; k <= n; k++) this.mr.asc.addNewBondFromNames (iAtom1, tokens[k], o);

}} else {
stereo = this.mr.parseIntStr (cfg);
}this.mr.addMolBond (iAtom1, iAtom2, order, stereo);
}
this.mr.discardLinesUntilContains ("END BOND");
}, "~N");
Clazz.defineMethod (c$, "readUserData", 
 function (ac) {
this.userData = null;
var pc = null;
while (!this.rd ().contains ("END CTAB")) {
if (!this.line.contains ("BEGIN SGROUP")) continue;
var atoms;
var name;
var data;
while (!this.rd ().contains ("END SGROUP")) {
if (this.userData == null) this.userData =  new java.util.Hashtable ();
if ((atoms = this.getField ("ATOMS")) == null || (name = this.getField ("FIELDNAME")) == null || (data = this.getField ("FIELDDATA")) == null) continue;
name = name.toLowerCase ();
var isPartial = (name.indexOf ("partial") >= 0);
if (isPartial) {
if (pc == null) pc = name;
 else if (!pc.equals (name)) isPartial = false;
}if (isPartial) {
var at = this.mr.asc.atoms;
for (var i = this.mr.asc.getLastAtomSetAtomIndex (), n = this.mr.asc.ac; i < n; i++) at[i].partialCharge = 0;

}var a = null;
var f = 0;
if (isPartial) f = this.mr.parseFloatStr (data);
 else if ((a = this.userData.get (name)) == null) this.userData.put (name, a =  new Array (ac));
try {
var tokens = JU.PT.getTokens (atoms);
for (var i = tokens.length; --i >= 1; ) {
var atom = tokens[i];
if (isPartial) this.mr.asc.getAtomFromName (atom).partialCharge = f;
 else a[this.mr.parseIntStr (atom) - 1] = data;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}
}
if (this.userData == null) return;
for (var key, $key = this.userData.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
var a = this.userData.get (key);
var f =  Clazz.newFloatArray (a.length, 0);
for (var i = 0; i < a.length; i++) f[i] = (a[i] == null ? 0 : this.mr.parseFloatStr (a[i]));

this.mr.asc.setAtomProperties (key, f, -1, false);
}
}, "~N");
Clazz.defineMethod (c$, "getField", 
 function (key) {
var pt = this.line.indexOf (key + "=");
if (pt < 0) return null;
pt += key.length + 1;
var term = ' ';
switch (this.line.charAt (pt)) {
case '"':
term = '"';
break;
case '(':
term = ')';
break;
case '+':
break;
default:
pt--;
break;
}
return this.line.substring (pt + 1, (this.line + term).indexOf (term, pt + 1));
}, "~S");
Clazz.defineMethod (c$, "rd", 
 function () {
return (this.line = this.mr.rd ());
});
Clazz.defineMethod (c$, "checkLineContinuation", 
 function () {
while (this.line.endsWith ("-")) {
var s = this.line;
this.rd ();
this.line = s + this.line;
}
});
});
