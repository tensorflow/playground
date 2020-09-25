Clazz.declarePackage ("J.adapter.readers.more");
Clazz.load (["J.adapter.readers.molxyz.MolReader", "J.api.JmolJDXMOLReader", "JU.Lst"], "J.adapter.readers.more.JcampdxReader", ["java.lang.Float", "JU.BS", "$.PT", "$.Rdr", "J.adapter.smarter.SmarterJmolAdapter", "J.api.Interface", "JU.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selectedModel = 0;
this.mpr = null;
this.acdMolFile = null;
this.nPeaks = 0;
this.acdAssignments = null;
this.title = null;
this.nucleus = "";
this.type = null;
this.peakData = null;
this.allTypes = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.more, "JcampdxReader", J.adapter.readers.molxyz.MolReader, J.api.JmolJDXMOLReader);
Clazz.prepareFields (c$, function () {
this.peakData =  new JU.Lst ();
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.vwr.setBooleanProperty ("_JSpecView".toLowerCase (), true);
if (this.isTrajectory) {
JU.Logger.warn ("TRAJECTORY keyword ignored");
this.isTrajectory = false;
}if (this.reverseModels) {
JU.Logger.warn ("REVERSE keyword ignored");
this.reverseModels = false;
}this.selectedModel = this.desiredModelNumber;
this.desiredModelNumber = -2147483648;
if (!this.checkFilterKey ("NOSYNC")) this.addJmolScript ("sync on");
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
var i = this.line.indexOf ("=");
if (i < 0 || !this.line.startsWith ("##")) return true;
var label = JU.PT.replaceAllCharacters (this.line.substring (0, i).trim (), " ", "").toUpperCase ();
if (label.length > 12) label = label.substring (0, 12);
var pt = ("##$MODELS   ##$PEAKS    ##$SIGNALS  ##$MOLFILE  ##NPOINTS   ##TITLE     ##PEAKASSIGN##$UVIR_ASSI##$MS_FRAGME##.OBSERVENU##DATATYPE  ").indexOf (label);
if (pt < 0) return true;
if (this.mpr == null) this.mpr = (J.api.Interface.getOption ("jsv.JDXMOLParser", this.vwr, "file")).set (this, this.filePath, this.htParams);
var value = this.line.substring (i + 1).trim ();
this.mpr.setLine (value);
switch (pt) {
case 0:
this.mpr.readModels ();
break;
case 12:
case 24:
this.mpr.readPeaks (pt == 24, -1);
break;
case 36:
this.acdMolFile = this.mpr.readACDMolFile ();
this.processModelData (this.acdMolFile, this.title + " (assigned)", "MOL", "mol", "", 0.01, NaN, true);
if (this.asc.errorMessage != null) {
this.continuing = false;
return false;
}break;
case 48:
this.nPeaks = JU.PT.parseInt (value);
break;
case 60:
this.title = JU.PT.split (value, "$$")[0].trim ();
break;
case 72:
case 84:
case 96:
this.acdAssignments = this.mpr.readACDAssignments (this.nPeaks, pt == 72);
break;
case 108:
this.nucleus = value.substring (1);
break;
case 120:
this.type = value;
if ((pt = this.type.indexOf (" ")) >= 0) this.type = this.type.substring (0, pt);
break;
}
return true;
});
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
if (this.mpr != null) this.processPeakData ();
this.finalizeReaderMR ();
});
Clazz.overrideMethod (c$, "processModelData", 
function (data, id, type, base, last, modelScale, vibScale, isFirst) {
var model0 = this.asc.iSet;
var model = null;
while (true) {
var ret = J.adapter.smarter.SmarterJmolAdapter.staticGetAtomSetCollectionReader (this.filePath, type, JU.Rdr.getBR (data), this.htParams);
if (Clazz.instanceOf (ret, String)) {
JU.Logger.warn ("" + ret);
if ((ret).startsWith (JV.JC.READER_NOT_FOUND)) this.asc.errorMessage = ret;
break;
}ret = J.adapter.smarter.SmarterJmolAdapter.staticGetAtomSetCollection (ret);
if (Clazz.instanceOf (ret, String)) {
JU.Logger.warn ("" + ret);
break;
}model = ret;
var baseModel = base;
if (baseModel.length == 0) baseModel = last;
if (baseModel.length != 0) {
var ibase = this.findModelById (baseModel);
if (ibase >= 0) {
this.asc.setModelInfoForSet ("jdxModelID", baseModel, ibase);
for (var i = model.atomSetCount; --i >= 0; ) model.setModelInfoForSet ("jdxBaseModel", baseModel, i);

if (model.bondCount == 0) this.setBonding (model, ibase);
}}if (!Float.isNaN (vibScale)) {
JU.Logger.info ("JcampdxReader applying vibration scaling of " + vibScale + " to " + model.ac + " atoms");
var atoms = model.atoms;
for (var i = model.ac; --i >= 0; ) {
if (atoms[i].vib != null && !Float.isNaN (atoms[i].vib.z)) atoms[i].vib.scale (vibScale);
}
}if (!Float.isNaN (modelScale)) {
JU.Logger.info ("JcampdxReader applying model scaling of " + modelScale + " to " + model.ac + " atoms");
var atoms = model.atoms;
for (var i = model.ac; --i >= 0; ) atoms[i].scale (modelScale);

}JU.Logger.info ("jdx model=" + id + " type=" + model.fileTypeName);
this.asc.appendAtomSetCollection (-1, model);
break;
}
this.updateModelIDs (id, model0, isFirst);
}, "~S,~S,~S,~S,~S,~N,~N,~B");
Clazz.defineMethod (c$, "setBonding", 
 function (a, ibase) {
var n0 = this.asc.getAtomSetAtomCount (ibase);
var n = a.ac;
if (n % n0 != 0) {
JU.Logger.warn ("atom count in secondary model (" + n + ") is not a multiple of " + n0 + " -- bonding ignored");
return;
}var bonds = this.asc.bonds;
var b0 = 0;
for (var i = 0; i < ibase; i++) b0 += this.asc.getAtomSetBondCount (i);

var b1 = b0 + this.asc.getAtomSetBondCount (ibase);
var ii0 = this.asc.getAtomSetAtomIndex (ibase);
var nModels = a.atomSetCount;
for (var j = 0; j < nModels; j++) {
var i0 = a.getAtomSetAtomIndex (j) - ii0;
if (a.getAtomSetAtomCount (j) != n0) {
JU.Logger.warn ("atom set atom count in secondary model (" + a.getAtomSetAtomCount (j) + ") is not equal to " + n0 + " -- bonding ignored");
return;
}for (var i = b0; i < b1; i++) a.addNewBondWithOrder (bonds[i].atomIndex1 + i0, bonds[i].atomIndex2 + i0, bonds[i].order);

}
}, "J.adapter.smarter.AtomSetCollection,~N");
Clazz.defineMethod (c$, "updateModelIDs", 
 function (id, model0, isFirst) {
var n = this.asc.atomSetCount;
if (isFirst && n == model0 + 2) {
this.asc.setCurrentModelInfo ("modelID", id);
return;
}for (var pt = 0, i = model0; ++i < n; ) this.asc.setModelInfoForSet ("modelID", id + "." + (++pt), i);

}, "~S,~N,~B");
Clazz.overrideMethod (c$, "addPeakData", 
function (info) {
this.peakData.addLast (info);
}, "~S");
Clazz.defineMethod (c$, "processPeakData", 
 function () {
if (this.acdAssignments != null) {
try {
this.mpr.setACDAssignments (this.title, this.nucleus + this.type, 0, this.acdAssignments, this.acdMolFile);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}var n = this.peakData.size ();
if (n == 0) return;
var bsModels =  new JU.BS ();
var havePeaks = (n > 0);
for (var p = 0; p < n; p++) {
this.line = this.peakData.get (p);
var type = this.mpr.getAttribute (this.line, "type");
var id = this.mpr.getAttribute (this.line, "model");
var i = this.findModelById (id);
if (i < 0) {
JU.Logger.warn ("cannot find model " + id + " required for " + this.line);
continue;
}this.addType (i, type);
var title = type + ": " + this.mpr.getAttribute (this.line, "title");
var key = "jdxAtomSelect_" + this.mpr.getAttribute (this.line, "type");
bsModels.set (i);
var s;
if (this.mpr.getAttribute (this.line, "atoms").length != 0) {
this.processPeakSelectAtom (i, key, this.line);
s = type + ": ";
} else if (this.processPeakSelectModel (i, title)) {
s = "model: ";
} else {
s = "ignored: ";
}JU.Logger.info (s + this.line);
}
n = this.asc.atomSetCount;
for (var i = n; --i >= 0; ) {
var id = this.asc.getAtomSetAuxiliaryInfoValue (i, "modelID");
if (havePeaks && !bsModels.get (i) && id.indexOf (".") >= 0) {
this.asc.removeAtomSet (i);
n--;
}}
if (this.selectedModel == -2147483648) {
if (this.allTypes != null) this.appendLoadNote (this.allTypes);
} else {
if (this.selectedModel == 0) this.selectedModel = n - 1;
for (var i = this.asc.atomSetCount; --i >= 0; ) if (i + 1 != this.selectedModel) this.asc.removeAtomSet (i);

if (n > 0) this.appendLoadNote (this.asc.getAtomSetAuxiliaryInfoValue (0, "name"));
}for (var i = this.asc.atomSetCount; --i >= 0; ) this.asc.setAtomSetNumber (i, i + 1);

this.asc.centralize ();
});
Clazz.defineMethod (c$, "findModelById", 
 function (modelID) {
for (var i = this.asc.atomSetCount; --i >= 0; ) {
var id = this.asc.getAtomSetAuxiliaryInfoValue (i, "modelID");
if (modelID.equals (id)) return i;
}
return -1;
}, "~S");
Clazz.defineMethod (c$, "addType", 
 function (imodel, type) {
var types = this.addTypeStr (this.asc.getAtomSetAuxiliaryInfoValue (imodel, "spectrumTypes"), type);
if (types == null) return;
this.asc.setModelInfoForSet ("spectrumTypes", types, imodel);
var s = this.addTypeStr (this.allTypes, type);
if (s != null) this.allTypes = s;
}, "~N,~S");
Clazz.defineMethod (c$, "addTypeStr", 
 function (types, type) {
if (types != null && types.contains (type)) return null;
if (types == null) types = "";
 else types += ",";
return types + type;
}, "~S,~S");
Clazz.defineMethod (c$, "processPeakSelectAtom", 
 function (i, key, data) {
var peaks = this.asc.getAtomSetAuxiliaryInfoValue (i, key);
if (peaks == null) this.asc.setModelInfoForSet (key, peaks =  new JU.Lst (), i);
peaks.addLast (data);
}, "~N,~S,~S");
Clazz.defineMethod (c$, "processPeakSelectModel", 
 function (i, title) {
if (this.asc.getAtomSetAuxiliaryInfoValue (i, "jdxModelSelect") != null) return false;
this.asc.setModelInfoForSet ("name", title, i);
this.asc.setModelInfoForSet ("jdxModelSelect", this.line, i);
return true;
}, "~N,~S");
Clazz.overrideMethod (c$, "setSpectrumPeaks", 
function (nH, piUnitsX, piUnitsY) {
}, "~N,~S,~S");
});
