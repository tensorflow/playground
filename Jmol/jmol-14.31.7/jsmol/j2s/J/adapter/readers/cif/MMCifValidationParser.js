Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (null, "J.adapter.readers.cif.MMCifValidationParser", ["java.lang.Character", "java.util.Hashtable", "JU.Lst", "$.PT", "JS.SV", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.asResidues = false;
this.reader = null;
this.resMap = null;
this.atomMap = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "MMCifValidationParser");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (reader) {
this.reader = reader;
this.asResidues = reader.checkFilterKey ("ASRES");
return this;
}, "J.adapter.smarter.AtomSetCollectionReader");
Clazz.defineMethod (c$, "finalizeValidations", 
function (vwr, modelMap) {
var map = this.reader.dssr;
if (map != null) return vwr.getAnnotationParser (true).fixDSSRJSONMap (map);
this.mapAtomResIDs (modelMap);
var svMap = this.reader.validation;
var retProps = this.reader.vwr.getAnnotationParser (false).catalogValidations (this.reader.vwr, svMap, this.getModelAtomIndices (), this.resMap, (this.asResidues ? null : this.atomMap), modelMap);
var note = (retProps == null || retProps.size () == 0 ? null : this.setProperties (retProps));
svMap.mapPut ("_note", JS.SV.newS (note));
return note;
}, "JV.Viewer,java.util.Map");
Clazz.defineMethod (c$, "finalizeRna3d", 
function (modelMap) {
this.mapAtomResIDs (modelMap);
var svMap = this.getRna3dMap (this.reader.addedData);
var note = this.reader.vwr.getAnnotationParser (false).catalogStructureUnits (this.reader.vwr, svMap, this.getModelAtomIndices (), this.resMap, null, modelMap);
svMap.mapPut ("_note", JS.SV.newS (note));
for (var i = this.reader.asc.atomSetCount; --i >= 0; ) {
var info = this.reader.asc.getAtomSetAuxiliaryInfo (i);
info.put ("rna3d", svMap);
}
return note;
}, "java.util.Map");
Clazz.defineMethod (c$, "getRna3dMap", 
 function (addedData) {
var map =  new java.util.Hashtable ();
var next =  Clazz.newIntArray (1, 0);
var id = "";
while ((id = JU.PT.getQuotedStringNext (addedData, next)).length > 0) {
var units = JU.PT.getQuotedStringNext (addedData, next);
var type = "?";
switch (id.charAt (0)) {
case 'H':
type = "hairpinLoops";
break;
case 'I':
type = "internalLoops";
break;
case 'J':
type = "junctions";
break;
default:
JU.Logger.error ("MMCif could not read: " + id + " " + units);
continue;
}
var list = map.get (type);
if (list == null) map.put (type, list =  new JU.Lst ());
var m =  new java.util.Hashtable ();
m.put ("index", Integer.$valueOf (JU.PT.parseInt (id.substring (id.lastIndexOf ("_") + 1))));
m.put ("units", units);
list.addLast (m);
}
return JS.SV.getVariableMap (map);
}, "~S");
Clazz.defineMethod (c$, "mapAtomResIDs", 
 function (modelMap) {
var atoms = this.reader.asc.atoms;
this.resMap =  new java.util.Hashtable ();
this.atomMap =  new java.util.Hashtable ();
var iresLast = -1;
var resLast = null;
var smodel = "" + modelMap.get ("_0");
for (var i = 0, model = 1, i0 = 0, n = this.reader.asc.getAtomSetAtomCount (0); i < n; i++) {
var a = atoms[i];
var ires = a.sequenceNumber;
var res = smodel + "_" + a.chainID + "_" + ires + "_" + (a.insertionCode == '\0' ? "" : "" + a.insertionCode);
var atom = res + "_" + a.atomName.toUpperCase () + "_" + (a.altLoc == '\0' ? "" : "" + Character.toLowerCase (a.altLoc));
var ia = Integer.$valueOf (i - i0);
if (ires != iresLast) {
iresLast = ires;
if (resLast != null) resLast[1] = i - i0;
this.resMap.put (res, resLast =  Clazz.newIntArray (-1, [i - i0, n]));
}this.atomMap.put (atom, ia);
if (i == n - 1) {
i0 += n;
n = this.reader.asc.getAtomSetAtomCount (model++);
}}
}, "java.util.Map");
Clazz.defineMethod (c$, "getModelAtomIndices", 
 function () {
var indices =  Clazz.newIntArray (this.reader.asc.atomSetCount + 1, 0);
for (var m = indices.length - 1; --m >= 0; ) indices[m] = this.reader.baseAtomIndex + this.reader.asc.getAtomSetAtomIndex (m);

indices[indices.length - 1] = this.reader.asc.ac;
return indices;
});
Clazz.defineMethod (c$, "setProperties", 
 function (propList) {
var note = "Validations loaded:";
for (var i = 0, n = propList.size (); i < n; ) {
var key = propList.get (i++);
var f = propList.get (i++);
var model = (propList.get (i++)).intValue ();
var isGroup = (propList.get (i++)).booleanValue ();
var count = 0;
var max = 0;
var reslast = -1;
var i0 = this.reader.asc.getAtomSetAtomIndex (model);
for (var j = f.length; --j >= 0; ) if (f[j] != 0) {
if (isGroup) {
var res = this.reader.asc.atoms[i0 + j].sequenceNumber;
if (res != reslast) {
reslast = res;
count++;
}} else {
count++;
}max = Math.max (f[j], max);
}
note += "\n  property_" + key + " (" + (isGroup ? "residues: " : "atoms: ") + count + (max == 1 ? "" : ", max: " + (Clazz.floatToInt (max * 100)) / 100) + ")";
this.reader.asc.setAtomProperties (key, f, model, isGroup);
}
return note;
}, "JU.Lst");
});
