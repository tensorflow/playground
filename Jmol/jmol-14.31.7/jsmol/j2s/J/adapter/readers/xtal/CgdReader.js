Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "JU.V3"], "J.adapter.readers.xtal.CgdReader", ["java.lang.Character", "java.util.Hashtable", "JU.Lst", "$.M3", "$.P3", "$.PT", "J.adapter.smarter.Bond", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.noBondSym = false;
this.tokens = null;
this.htEdges = null;
this.lastName = null;
this.edgeData = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "CgdReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.setFractionalCoordinates (true);
this.asc.setNoAutoBond ();
this.asc.vibScale = 1;
this.forceSymmetry (!this.checkFilterKey ("NOPACK"));
this.noBondSym = this.checkFilterKey ("NOBONDSYM");
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
this.line = this.line.trim ();
if (this.line.length == 0 || this.line.startsWith ("#")) return true;
if (!Character.isLetter (this.line.charAt (0))) this.line = this.lastName + " " + this.line;
this.tokens = this.getTokens ();
if (this.tokens.length > 0) {
this.lastName = this.tokens[0].toUpperCase ();
var pt = "NAME |CELL |GROUP|ATOM |EDGE |".indexOf (this.lastName);
if (this.tokens.length > 1 && (pt == 0 || this.doProcessLines)) switch (pt) {
case 0:
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.applySymmetryAndSetTrajectory ();
this.setFractionalCoordinates (true);
this.asc.newAtomSet ();
this.asc.setAtomSetName (this.line.substring (6).trim ());
this.htEdges = null;
this.edgeData = null;
break;
case 6:
for (var i = 0; i < 6; i++) this.setUnitCellItem (i, (i < 3 ? 10 : 1) * this.parseFloatStr (this.tokens[i + 1]));

break;
case 12:
this.setSpaceGroupName ("bilbao:" + this.group (this.tokens[1]));
break;
case 18:
this.atom ();
break;
case 24:
if (!this.doApplySymmetry) break;
if (this.edgeData == null) this.edgeData =  new JU.Lst ();
this.edgeData.addLast (this.line);
break;
}
}return true;
});
Clazz.defineMethod (c$, "group", 
 function (name) {
var name0 = null;
if (name.charAt (0) == '"') name = name.substring (1, name.length - 1);
var pt = ";P2=P121;P21=P1211;C2=C121;A2=A121;I2=I121;Pm=P1m1;Pc=P1c1;Pn=P1n1;Pa=P1a1;Cm=C1m1;Am=A1m1;Im=I1m1;Cc=C1c1;An=A1n1;Ia=I1a1;Aa=A1a1;Cn=C1n1;Ic=I1c1;P2/m=P12/m1;P21/m=P121/m1;C2/m=C12/m1;A2/m=A12/m1;I2/m=I12/m1;P2/c=P12/c1;P2/n=P12/n1;P2/a=P12/a1;P21/c=P121/c1;P21/n=P121/n1;P21/a=P121/a1;C2/c=C12/c1;A2/n=A12/n1;I2/a=I12/a1;A2/a=A12/a1;C2/n=C12/n1;I2/c=I12/c1;Pm3=Pm-3;Pn3=Pn-3;Fm3=Fm-3;Fd3=Fd-3;Im3=Im-3;Pa3=Pa-3;Ia3=Ia-3;Pm3m=Pm-3m;Pn3n=Pn-3n;Pm3n=Pm-3n;Pn3m=Pn-3m;Fm3m=Fm-3m;Fm3c=Fm-3c;Fd3m=Fd-3m;Fd3c=Fd-3c;Im3m=Im-3m;Ia3d=Ia-3d;".indexOf (";" + name + "=");
if (pt >= 0) {
name0 = name;
name = ";P2=P121;P21=P1211;C2=C121;A2=A121;I2=I121;Pm=P1m1;Pc=P1c1;Pn=P1n1;Pa=P1a1;Cm=C1m1;Am=A1m1;Im=I1m1;Cc=C1c1;An=A1n1;Ia=I1a1;Aa=A1a1;Cn=C1n1;Ic=I1c1;P2/m=P12/m1;P21/m=P121/m1;C2/m=C12/m1;A2/m=A12/m1;I2/m=I12/m1;P2/c=P12/c1;P2/n=P12/n1;P2/a=P12/a1;P21/c=P121/c1;P21/n=P121/n1;P21/a=P121/a1;C2/c=C12/c1;A2/n=A12/n1;I2/a=I12/a1;A2/a=A12/a1;C2/n=C12/n1;I2/c=I12/c1;Pm3=Pm-3;Pn3=Pn-3;Fm3=Fm-3;Fd3=Fd-3;Im3=Im-3;Pa3=Pa-3;Ia3=Ia-3;Pm3m=Pm-3m;Pn3n=Pn-3n;Pm3n=Pm-3n;Pn3m=Pn-3m;Fm3m=Fm-3m;Fm3c=Fm-3c;Fd3m=Fd-3m;Fd3c=Fd-3c;Im3m=Im-3m;Ia3d=Ia-3d;".substring (";P2=P121;P21=P1211;C2=C121;A2=A121;I2=I121;Pm=P1m1;Pc=P1c1;Pn=P1n1;Pa=P1a1;Cm=C1m1;Am=A1m1;Im=I1m1;Cc=C1c1;An=A1n1;Ia=I1a1;Aa=A1a1;Cn=C1n1;Ic=I1c1;P2/m=P12/m1;P21/m=P121/m1;C2/m=C12/m1;A2/m=A12/m1;I2/m=I12/m1;P2/c=P12/c1;P2/n=P12/n1;P2/a=P12/a1;P21/c=P121/c1;P21/n=P121/n1;P21/a=P121/a1;C2/c=C12/c1;A2/n=A12/n1;I2/a=I12/a1;A2/a=A12/a1;C2/n=C12/n1;I2/c=I12/c1;Pm3=Pm-3;Pn3=Pn-3;Fm3=Fm-3;Fd3=Fd-3;Im3=Im-3;Pa3=Pa-3;Ia3=Ia-3;Pm3m=Pm-3m;Pn3n=Pn-3n;Pm3n=Pm-3n;Pn3m=Pn-3m;Fm3m=Fm-3m;Fm3c=Fm-3c;Fd3m=Fd-3m;Fd3c=Fd-3c;Im3m=Im-3m;Ia3d=Ia-3d;".indexOf ("=", pt) + 1, ";P2=P121;P21=P1211;C2=C121;A2=A121;I2=I121;Pm=P1m1;Pc=P1c1;Pn=P1n1;Pa=P1a1;Cm=C1m1;Am=A1m1;Im=I1m1;Cc=C1c1;An=A1n1;Ia=I1a1;Aa=A1a1;Cn=C1n1;Ic=I1c1;P2/m=P12/m1;P21/m=P121/m1;C2/m=C12/m1;A2/m=A12/m1;I2/m=I12/m1;P2/c=P12/c1;P2/n=P12/n1;P2/a=P12/a1;P21/c=P121/c1;P21/n=P121/n1;P21/a=P121/a1;C2/c=C12/c1;A2/n=A12/n1;I2/a=I12/a1;A2/a=A12/a1;C2/n=C12/n1;I2/c=I12/c1;Pm3=Pm-3;Pn3=Pn-3;Fm3=Fm-3;Fd3=Fd-3;Im3=Im-3;Pa3=Pa-3;Ia3=Ia-3;Pm3m=Pm-3m;Pn3n=Pn-3n;Pm3n=Pm-3n;Pn3m=Pn-3m;Fm3m=Fm-3m;Fm3c=Fm-3c;Fd3m=Fd-3m;Fd3c=Fd-3c;Im3m=Im-3m;Ia3d=Ia-3d;".indexOf (";", pt + 1));
}JU.Logger.info ("CgdReader using GROUP " + name + (name0 == null ? "" : " alias of " + name0));
return name;
}, "~S");
Clazz.defineMethod (c$, "atom", 
 function () {
var name = this.getName (this.tokens[1]);
var edgeCount = this.parseIntStr (this.tokens[2]);
for (var i = 3; i < 6; i++) if (this.tokens[i].indexOf ("/") >= 0) this.tokens[i] = "" + JU.PT.parseFloatFraction (this.tokens[i]);

var a = this.addAtomXYZSymName (this.tokens, 3, null, name);
if (!this.doApplySymmetry) return;
this.asc.atomSymbolicMap.put (name, a);
this.asc.addVibrationVector (a.index, 1, 3, 7);
if (this.htEdges == null) this.htEdges =  new java.util.Hashtable ();
this.htEdges.put (a,  new Array (edgeCount));
});
Clazz.defineMethod (c$, "getName", 
 function (name) {
return (name.charAt (0) == '"' ? name.substring (1, name.length - 1) : Character.isDigit (name.charAt (0)) ? "C" + name : name);
}, "~S");
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.finalizeReaderASCR ();
if (this.doApplySymmetry) this.finalizeNet ();
});
Clazz.defineMethod (c$, "finalizeEdges", 
 function () {
var p;
var name;
var a;
var atomEdges;
for (var j = 0; j < this.edgeData.size (); j++) {
this.tokens = JU.PT.getTokens (this.line = this.edgeData.get (j));
switch (this.tokens.length) {
case 3:
name = this.getName (this.tokens[1]);
a = this.asc.getAtomFromName (name);
atomEdges = this.htEdges.get (a);
p = this.asc.getAtomFromName (this.getName (this.tokens[2]));
break;
case 5:
name = this.getName (this.tokens[1]);
a = this.asc.getAtomFromName (name);
atomEdges = this.htEdges.get (a);
p = this.getCoord (2);
break;
case 7:
atomEdges = this.htEdges.get (this.findAtom (this.getCoord (1)));
p = this.getCoord (4);
break;
default:
JU.Logger.error ("EDGE record skipped: " + this.line);
continue;
}
for (var i = 0, n = atomEdges.length; i < n; i++) if (atomEdges[i] == null) {
atomEdges[i] = JU.V3.newV (p);
break;
}
}
});
Clazz.defineMethod (c$, "getCoord", 
 function (i) {
return JU.P3.new3 (JU.PT.parseFloatFraction (this.tokens[i++]), JU.PT.parseFloatFraction (this.tokens[i++]), JU.PT.parseFloatFraction (this.tokens[i++]));
}, "~N");
Clazz.defineMethod (c$, "finalizeNet", 
 function () {
this.finalizeEdges ();
var m =  new JU.M3 ();
var pt =  new JU.P3 ();
for (var i = 0, n = this.asc.ac; i < n; i++) {
var a = this.asc.atoms[i];
var a0 = this.asc.atoms[a.atomSite];
if (this.noBondSym && a !== a0) continue;
var edges = this.htEdges.get (a0);
if (edges == null) continue;
var ix = Clazz.floatToInt (a.vib.x) + 7;
var iy = Clazz.floatToInt (a.vib.y) + 7;
var iz = Clazz.floatToInt (a.vib.z) + 7;
m.setRowV (0, J.adapter.readers.xtal.CgdReader.vecs[ix]);
m.setRowV (1, J.adapter.readers.xtal.CgdReader.vecs[iy]);
m.setRowV (2, J.adapter.readers.xtal.CgdReader.vecs[iz]);
for (var j = 0, n1 = edges.length; j < n1; j++) {
pt.sub2 (edges[j], a0);
m.rotate (pt);
pt.add (a);
var b = this.findAtom (pt);
if (b != null) this.asc.addBond ( new J.adapter.smarter.Bond (a.index, b.index, 1));
 else if (pt.x >= 0 && pt.x <= 1 && pt.y >= 0 && pt.y <= 1 && pt.z >= 0 && pt.z <= 1) JU.Logger.error (" not found: i=" + i + "  pt=" + pt + " for a=" + a + "\n a0=" + a0 + " edge[" + j + "]=" + edges[j] + "\n a.vib=" + a.vib + "\n m=" + m);
}
a.vib = null;
}
});
Clazz.defineMethod (c$, "findAtom", 
 function (pt) {
for (var i = this.asc.ac; --i >= 0; ) if (this.asc.atoms[i].distanceSquared (pt) < 0.00001) return this.asc.atoms[i];

return null;
}, "JU.P3");
Clazz.defineStatics (c$,
"SG_ALIASES", ";P2=P121;P21=P1211;C2=C121;A2=A121;I2=I121;Pm=P1m1;Pc=P1c1;Pn=P1n1;Pa=P1a1;Cm=C1m1;Am=A1m1;Im=I1m1;Cc=C1c1;An=A1n1;Ia=I1a1;Aa=A1a1;Cn=C1n1;Ic=I1c1;P2/m=P12/m1;P21/m=P121/m1;C2/m=C12/m1;A2/m=A12/m1;I2/m=I12/m1;P2/c=P12/c1;P2/n=P12/n1;P2/a=P12/a1;P21/c=P121/c1;P21/n=P121/n1;P21/a=P121/a1;C2/c=C12/c1;A2/n=A12/n1;I2/a=I12/a1;A2/a=A12/a1;C2/n=C12/n1;I2/c=I12/c1;Pm3=Pm-3;Pn3=Pn-3;Fm3=Fm-3;Fd3=Fd-3;Im3=Im-3;Pa3=Pa-3;Ia3=Ia-3;Pm3m=Pm-3m;Pn3n=Pn-3n;Pm3n=Pm-3n;Pn3m=Pn-3m;Fm3m=Fm-3m;Fm3c=Fm-3c;Fd3m=Fd-3m;Fd3c=Fd-3c;Im3m=Im-3m;Ia3d=Ia-3d;");
c$.vecs = c$.prototype.vecs =  Clazz.newArray (-1, [JU.V3.new3 (0, 0, -1), JU.V3.new3 (1, 0, -1), null, JU.V3.new3 (0, 1, -1), JU.V3.new3 (0, -1, 0), JU.V3.new3 (1, -1, 0), JU.V3.new3 (-1, 0, 0), null, JU.V3.new3 (1, 0, 0), JU.V3.new3 (-1, 1, 0), JU.V3.new3 (0, 1, 0), JU.V3.new3 (0, -1, 1), null, JU.V3.new3 (-1, 0, 1), JU.V3.new3 (0, 0, 1)]);
});
