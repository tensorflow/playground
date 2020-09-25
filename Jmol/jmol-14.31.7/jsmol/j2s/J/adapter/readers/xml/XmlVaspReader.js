Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.readers.xml.XmlReader"], "J.adapter.readers.xml.XmlVaspReader", ["java.lang.Double", "JU.PT", "$.SB", "$.V3", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.name = null;
this.ac = 0;
this.iAtom = 0;
this.isE_wo_entrp = false;
this.isE_fr_energy = false;
this.enthalpy = null;
this.gibbsEnergy = null;
this.haveUnitCell = false;
this.atomNames = null;
this.atomSyms = null;
this.atomName = null;
this.atomSym = null;
this.a = 0;
this.b = 0;
this.c = 0;
this.alpha = 0;
this.beta = 0;
this.gamma = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xml, "XmlVaspReader", J.adapter.readers.xml.XmlReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.xml.XmlVaspReader, []);
});
Clazz.overrideMethod (c$, "processXml", 
function (parent, saxReader) {
parent.doProcessLines = true;
this.processXml2 (parent, saxReader);
}, "J.adapter.readers.xml.XmlReader,~O");
Clazz.overrideMethod (c$, "processStartElement", 
function (localName, nodeName) {
if (this.debugging) JU.Logger.debug ("xmlvasp: start " + localName);
if (!this.parent.continuing) return;
if ("calculation".equals (localName)) {
this.enthalpy = null;
this.gibbsEnergy = null;
return;
}if ("i".equals (localName)) {
var s = this.atts.get ("name");
if (s.charAt (0) != 'e') return;
this.isE_wo_entrp = s.equals ("e_wo_entrp");
this.isE_fr_energy = s.equals ("e_fr_energy");
this.setKeepChars (this.isE_wo_entrp || this.isE_fr_energy);
return;
}if ("structure".equals (localName)) {
if (!this.parent.doGetModel (++this.parent.modelNumber, null)) {
this.parent.checkLastModel ();
return;
}this.parent.setFractionalCoordinates (true);
this.asc.doFixPeriodic = true;
this.asc.newAtomSet ();
if (this.enthalpy != null) {
this.asc.setCurrentModelInfo ("enthalpy", Double.$valueOf (this.enthalpy));
}if (this.gibbsEnergy != null) {
this.asc.setAtomSetEnergy ("" + this.gibbsEnergy, this.parseFloatStr (this.gibbsEnergy));
this.asc.setCurrentModelInfo ("gibbsEnergy", Double.$valueOf (this.gibbsEnergy));
}if (this.enthalpy != null && this.gibbsEnergy != null) this.asc.setAtomSetName ("Enthalpy = " + this.enthalpy + " eV Gibbs Energy = " + this.gibbsEnergy + " eV");
return;
}if (!this.parent.doProcessLines) return;
if ("v".equals (localName)) {
this.setKeepChars (this.data != null);
return;
}if ("c".equals (localName)) {
this.setKeepChars (this.iAtom < this.ac);
return;
}if ("varray".equals (localName)) {
this.name = this.atts.get ("name");
if (this.name != null && JU.PT.isOneOf (this.name, ";basis;positions;forces;")) this.data =  new JU.SB ();
return;
}if ("atoms".equals (localName)) {
this.setKeepChars (true);
return;
}}, "~S,~S");
Clazz.overrideMethod (c$, "processEndElement", 
function (localName) {
if (this.debugging) JU.Logger.debug ("xmlvasp: end " + localName);
while (true) {
if (!this.parent.doProcessLines) break;
if (this.isE_wo_entrp) {
this.isE_wo_entrp = false;
this.enthalpy = this.chars.toString ().trim ();
break;
}if (this.isE_fr_energy) {
this.isE_fr_energy = false;
this.gibbsEnergy = this.chars.toString ().trim ();
break;
}if ("v".equals (localName) && this.data != null) {
this.data.append (this.chars.toString ());
break;
}if ("c".equals (localName)) {
if (this.iAtom < this.ac) {
if (this.atomName == null) {
this.atomName = this.atomSym = this.chars.toString ().trim ();
} else {
this.atomNames[this.iAtom++] = this.atomName + this.chars.toString ().trim ();
this.atomName = null;
}}break;
}if ("atoms".equals (localName)) {
this.ac = this.parseIntStr (this.chars.toString ());
this.atomNames =  new Array (this.ac);
this.atomSyms =  new Array (this.ac);
this.iAtom = 0;
break;
}if ("varray".equals (localName) && this.data != null) {
if (this.name == null) {
} else if ("basis".equals (this.name) && !this.haveUnitCell) {
this.haveUnitCell = true;
var ijk = J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (this.data.toString (), null, 9);
var va = JU.V3.new3 (ijk[0], ijk[1], ijk[2]);
var vb = JU.V3.new3 (ijk[3], ijk[4], ijk[5]);
var vc = JU.V3.new3 (ijk[6], ijk[7], ijk[8]);
this.a = va.length ();
this.b = vb.length ();
this.c = vc.length ();
va.normalize ();
vb.normalize ();
vc.normalize ();
this.alpha = (Math.acos (vb.dot (vc)) * 180 / 3.141592653589793);
this.beta = (Math.acos (va.dot (vc)) * 180 / 3.141592653589793);
this.gamma = (Math.acos (va.dot (vb)) * 180 / 3.141592653589793);
} else if ("positions".equals (this.name)) {
this.parent.setUnitCell (this.a, this.b, this.c, this.alpha, this.beta, this.gamma);
var fdata =  Clazz.newFloatArray (this.ac * 3, 0);
J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (this.data.toString (), fdata, this.ac * 3);
var fpt = 0;
for (var i = 0; i < this.ac; i++) {
var atom = this.asc.addNewAtom ();
this.parent.setAtomCoordXYZ (atom, fdata[fpt++], fdata[fpt++], fdata[fpt++]);
atom.elementSymbol = this.atomSyms[i];
atom.atomName = this.atomNames[i];
}
} else if ("forces".equals (this.name)) {
var fdata =  Clazz.newFloatArray (this.ac * 3, 0);
J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (this.data.toString (), fdata, this.ac * 3);
var fpt = 0;
var i0 = this.asc.getLastAtomSetAtomIndex ();
for (var i = 0; i < this.ac; i++) this.asc.addVibrationVector (i0 + i, fdata[fpt++], fdata[fpt++], fdata[fpt++]);

}this.data = null;
break;
}if ("structure".equals (localName)) {
try {
this.parent.applySymmetryAndSetTrajectory ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
break;
}return;
}
this.setKeepChars (false);
}, "~S");
});
