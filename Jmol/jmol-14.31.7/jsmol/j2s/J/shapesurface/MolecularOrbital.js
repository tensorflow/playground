Clazz.declarePackage ("J.shapesurface");
Clazz.load (["J.shapesurface.Isosurface"], "J.shapesurface.MolecularOrbital", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.Lst", "$.PT", "$.SB", "J.jvxl.data.JvxlCoder", "J.quantum.QS", "JU.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.moTranslucency = null;
this.moTranslucentLevel = null;
this.moPlane = null;
this.moCutoff = null;
this.moResolution = null;
this.moScale = null;
this.moColorPos = null;
this.moColorNeg = null;
this.moMonteCarloCount = null;
this.moIsPositiveOnly = false;
this.moSquareData = null;
this.moSquareLinear = null;
this.moRandomSeed = null;
this.moFill = 1073742046;
this.moMesh = 1073742018;
this.moDots = 1073742042;
this.moFrontOnly = 1073741960;
this.moShell = 1073742057;
this.moTitleFormat = null;
this.moDebug = false;
this.myColorPt = 0;
this.strID = null;
this.$moNumber = 0;
this.$moLinearCombination = null;
this.htModels = null;
this.thisModel = null;
this.moSlab = null;
this.moSlabValue = null;
this.nboType = null;
Clazz.instantialize (this, arguments);
}, J.shapesurface, "MolecularOrbital", J.shapesurface.Isosurface);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapesurface.MolecularOrbital, "initShape", []);
this.myType = "mo";
this.setPropI ("thisID", this.myType, null);
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("init" === propertyName) {
this.myColorPt = 0;
this.moDebug = false;
var modelIndex = (value).intValue ();
this.strID = this.getId (modelIndex);
this.setPropI ("init", null, null);
this.setPropI ("modelIndex", Integer.$valueOf (modelIndex), null);
if (this.htModels == null) this.htModels =  new java.util.Hashtable ();
if (!this.htModels.containsKey (this.strID)) this.htModels.put (this.strID,  new java.util.Hashtable ());
this.thisModel = this.htModels.get (this.strID);
this.$moNumber = (!this.thisModel.containsKey ("moNumber") ? 0 : (this.thisModel.get ("moNumber")).intValue ());
this.$moLinearCombination = this.thisModel.get ("moLinearCombination");
this.moSquareData = (this.$moLinearCombination != null ? null : this.thisModel.get ("moSquareData"));
this.moSquareLinear = (this.$moLinearCombination == null ? null : this.thisModel.get ("moSquareLinear"));
return;
}if (this.htModels != null && this.strID != null) this.thisModel = this.htModels.get (this.strID);
if ("slab" === propertyName) {
if (Clazz.instanceOf (value, Integer)) {
this.thisModel.put ("slabValue", value);
} else {
var slabInfo = value;
var tok = (slabInfo[0]).intValue ();
this.moSlab = this.thisModel.get ("slab");
if (this.moSlab == null) this.thisModel.put ("slab", this.moSlab =  new JU.Lst ());
if (tok == 1073742333) {
this.moSlab = null;
this.thisModel.remove ("slab");
return;
}this.moSlab.addLast (value);
}return;
}if ("cutoff" === propertyName) {
this.thisModel.put ("moCutoff", value);
this.thisModel.put ("moIsPositiveOnly", Boolean.FALSE);
return;
}if ("scale" === propertyName) {
this.thisModel.put ("moScale", value);
return;
}if ("squareData" === propertyName) {
if (value === Boolean.TRUE) this.thisModel.put ("moSquareData", Boolean.TRUE);
 else this.thisModel.remove ("moSquareData");
this.moSquareData = value;
return;
}if ("squareLinear" === propertyName) {
if (value === Boolean.TRUE) this.thisModel.put ("moSquareLinear", Boolean.TRUE);
 else this.thisModel.remove ("moSquareLinear");
this.moSquareLinear = value;
return;
}if ("cutoffPositive" === propertyName) {
this.thisModel.put ("moCutoff", value);
this.thisModel.put ("moIsPositiveOnly", Boolean.TRUE);
return;
}if ("resolution" === propertyName) {
this.thisModel.put ("moResolution", value);
return;
}if ("titleFormat" === propertyName) {
this.moTitleFormat = value;
return;
}if ("color" === propertyName) {
if (!(Clazz.instanceOf (value, Integer))) return;
this.thisModel.remove ("moTranslucency");
this.setPropI ("color", value, bs);
propertyName = "colorRGB";
this.myColorPt = 0;
}if ("colorRGB" === propertyName) {
this.moColorPos = value;
if (this.myColorPt++ == 0) this.moColorNeg = this.moColorPos;
this.thisModel.put ("moColorNeg", this.moColorNeg);
this.thisModel.put ("moColorPos", this.moColorPos);
return;
}if ("plane" === propertyName) {
if (value == null) this.thisModel.remove ("moPlane");
 else this.thisModel.put ("moPlane", value);
return;
}if ("monteCarloCount" === propertyName) {
this.thisModel.put ("monteCarloCount", value);
return;
}if ("randomSeed" === propertyName) {
if (value == null) this.thisModel.remove ("randomSeed");
 else this.thisModel.put ("randomSeed", value);
return;
}if ("molecularOrbital" === propertyName) {
if (Clazz.instanceOf (value, Integer)) {
this.$moNumber = (value).intValue ();
this.thisModel.put ("moNumber", value);
this.thisModel.remove ("moLinearCombination");
this.$moLinearCombination = null;
} else {
this.$moNumber = 0;
this.$moLinearCombination = value;
this.thisModel.put ("moNumber", Integer.$valueOf (0));
this.thisModel.put ("moLinearCombination", this.$moLinearCombination);
}if (this.moSquareData === Boolean.TRUE) this.thisModel.put ("moSquareData", Boolean.TRUE);
 else this.thisModel.remove ("moSquareData");
if (this.moSquareLinear === Boolean.TRUE) this.thisModel.put ("moSquareLinear", Boolean.TRUE);
 else this.thisModel.remove ("moSquareLinear");
this.setOrbital (this.$moNumber, this.$moLinearCombination);
return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
var htModelsNew =  new java.util.Hashtable ();
for (var i = this.meshCount; --i >= 0; ) {
if (this.meshes[i] == null) continue;
if (this.meshes[i].modelIndex == modelIndex) {
this.meshCount--;
if (this.meshes[i] === this.currentMesh) {
this.currentMesh = null;
this.thisModel = null;
}this.meshes = JU.AU.deleteElements (this.meshes, i, 1);
continue;
}var htModel = this.htModels.get (this.meshes[i].thisID);
if (this.meshes[i].modelIndex > modelIndex) {
this.meshes[i].modelIndex--;
this.meshes[i].thisID = this.getId (this.meshes[i].modelIndex);
}htModelsNew.put (this.meshes[i].thisID, htModel);
}
this.htModels = htModelsNew;
return;
}if ("moData" === propertyName) {
var moData = value;
this.nboType = moData.get ("nboType");
this.thisModel = this.htModels.get (this.strID);
if (this.nboType == null) this.thisModel.remove ("nboType");
 else this.thisModel.put ("nboType", this.nboType);
} else if ("translucentLevel" === propertyName) {
if (this.thisModel == null) {
if (this.currentMesh == null) return;
this.thisModel = this.htModels.get (this.currentMesh.thisID);
}this.thisModel.put ("moTranslucentLevel", value);
} else if ("delete" === propertyName) {
this.htModels.remove (this.strID);
this.$moNumber = 0;
this.$moLinearCombination = null;
} else if ("token" === propertyName) {
var tok = (value).intValue ();
switch (tok) {
case 1112150019:
case 1073742042:
this.moDots = tok;
break;
case 1073741938:
case 1073742046:
this.moFill = tok;
break;
case 1073742018:
case 1073742052:
this.moMesh = tok;
break;
case 1073741862:
case 1073742057:
this.moShell = tok;
break;
case 1073741960:
case 1073742058:
this.moFrontOnly = tok;
break;
}
} else if ("translucency" === propertyName) {
if (this.thisModel == null) {
if (this.currentMesh == null) return;
this.thisModel = this.htModels.get (this.currentMesh.thisID);
}this.thisModel.put ("moTranslucency", value);
}this.setPropI (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "getId", 
 function (modelIndex) {
return "mo_model" + this.vwr.getModelNumberDotted (modelIndex);
}, "~N");
Clazz.overrideMethod (c$, "getProperty", 
function (propertyName, index) {
if (propertyName.startsWith ("list")) {
var s = "";
if (propertyName.equals ("list")) {
s = this.getPropI ("list", index);
if (s.length > 1) s += "cutoff = " + this.jvxlData.cutoff + "\n";
s = "\n" + s;
}return this.getMoInfo (-1) + s;
}if (propertyName === "moLabel") {
var labels = this.sg.params.moData.get ("nboLabels");
if (this.$moNumber > 0 && labels != null && labels.length != 0) return labels[(this.$moNumber - 1) % labels.length];
return "";
}if (propertyName === "moNumber") return Integer.$valueOf (this.$moNumber);
if (propertyName === "moLinearCombination") return this.$moLinearCombination;
if (propertyName === "moSquareData") return this.moSquareData;
if (propertyName === "moSquareLinear") return this.moSquareLinear;
if (propertyName === "showMO") {
var str =  new JU.SB ();
var mos = (this.sg.params.moData.get ("mos"));
var nOrb = (mos == null ? 0 : mos.size ());
var thisMO = index;
var currentMO = this.$moNumber;
var isShowCurrent = (thisMO == -2147483648 || thisMO == 2147483647);
if (isShowCurrent) thisMO = currentMO;
if (nOrb == 0 || isShowCurrent && currentMO == 0) return "";
var doOneMo = (thisMO != 0);
if (currentMO == 0) thisMO = 0;
var haveHeader = false;
var nTotal = (thisMO > 0 ? 1 : nOrb);
var i0 = (nTotal == 1 && currentMO > 0 ? currentMO : 1);
for (var i = i0; i <= nOrb; i++) if (thisMO == 0 || thisMO == i || !doOneMo && i == currentMO) {
if (!doOneMo) {
this.setPropI ("init", this.sg.params, null);
this.setOrbital (i, null);
}this.jvxlData.moleculeXml = this.vwr.getModelCml (this.vwr.getModelUndeletedAtomsBitSet (this.thisMesh.modelIndex), 100, true, false);
if (!haveHeader) {
str.append (J.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, null, null, "HEADERONLY", true, nTotal, null, null));
haveHeader = true;
}str.append (J.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, null, this.jvxlData.title, null, false, 1, this.thisMesh.getState (this.myType), (this.thisMesh.scriptCommand == null ? "" : this.thisMesh.scriptCommand)));
if (!doOneMo) this.setPropI ("delete", "mo_show", null);
if (nTotal == 1) break;
}
str.append (J.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, null, null, "TRAILERONLY", true, 0, null, null));
return str.toString ();
}return this.getPropI (propertyName, index);
}, "~S,~N");
Clazz.defineMethod (c$, "getMoInfo", 
function (modelIndex) {
var sb =  new JU.SB ();
for (var m = 0, mc = this.vwr.ms.mc; m < mc; m++) {
if (modelIndex >= 0 && m != modelIndex) continue;
var moData = this.vwr.ms.getInfo (m, "moData");
if (moData == null) continue;
var mos = (moData.get ("mos"));
var nOrb = (mos == null ? 0 : mos.size ());
if (nOrb == 0) continue;
var moType = moData.get ("nboType");
if (moType == null) moType = "mo";
for (var i = nOrb; --i >= 0; ) {
var mo = mos.get (i);
var type = mo.get ("type");
if (type == null) type = "";
var units = mo.get ("energyUnits");
if (units == null) units = "";
var occ = mo.get ("occupancy");
if (occ != null) type = "occupancy " + occ.floatValue () + " " + type;
var sym = mo.get ("symmetry");
if (sym != null) type += sym;
var energy = "" + mo.get ("energy");
if (Float.isNaN (JU.PT.parseFloat (energy))) sb.append (JU.PT.sprintf ("model %-2s; %s %-2i # %s\n", "ssis",  Clazz.newArray (-1, [this.vwr.ms.getModelNumberDotted (m), moType, Integer.$valueOf (i + 1), type])));
 else sb.append (JU.PT.sprintf ("model %-2s;  %s %-2i # energy %-8.3f %s %s\n", "ssifss",  Clazz.newArray (-1, [this.vwr.ms.getModelNumberDotted (m), moType, Integer.$valueOf (i + 1), mo.get ("energy"), units, type])));
}
}
return sb.toString ();
}, "~N");
Clazz.overrideMethod (c$, "clearSg", 
function () {
});
Clazz.defineMethod (c$, "getSettings", 
 function (strID) {
this.thisModel = this.htModels.get (strID);
if (this.thisModel == null || this.thisModel.get ("moNumber") == null) return false;
this.moTranslucency = this.thisModel.get ("moTranslucency");
this.moTranslucentLevel = this.thisModel.get ("moTranslucentLevel");
this.moPlane = this.thisModel.get ("moPlane");
this.moCutoff = this.thisModel.get ("moCutoff");
if (this.moCutoff == null) this.moCutoff = this.sg.params.moData.get ("defaultCutoff");
if (this.moCutoff == null) {
this.moCutoff = Float.$valueOf (0.05);
}this.thisModel.put ("moCutoff", Float.$valueOf (this.moCutoff.floatValue ()));
this.moResolution = this.thisModel.get ("moResolution");
this.moScale = this.thisModel.get ("moScale");
this.nboType = this.thisModel.get ("moType");
this.moColorPos = this.thisModel.get ("moColorPos");
this.moColorNeg = this.thisModel.get ("moColorNeg");
this.moSquareData = this.thisModel.get ("moSquareData");
this.moSquareLinear = this.thisModel.get ("moSquareLinear");
this.moMonteCarloCount = this.thisModel.get ("monteCarloCount");
this.moRandomSeed = this.thisModel.get ("randomSeed");
this.moSlabValue = this.thisModel.get ("slabValue");
this.moSlab = this.thisModel.get ("slab");
if (this.moRandomSeed == null) this.thisModel.put ("randomSeed", this.moRandomSeed = Integer.$valueOf ((-System.currentTimeMillis ()) % 10000));
this.$moNumber = (this.thisModel.get ("moNumber")).intValue ();
this.$moLinearCombination = this.thisModel.get ("moLinearCombination");
var b = this.thisModel.get ("moIsPositiveOnly");
this.moIsPositiveOnly = (b != null && ((b)).booleanValue ());
return true;
}, "~S");
Clazz.defineMethod (c$, "setOrbital", 
 function (moNumber, linearCombination) {
this.setPropI ("reset", this.strID, null);
if (this.moDebug) this.setPropI ("debug", Boolean.TRUE, null);
this.getSettings (this.strID);
if (this.moScale != null) this.setPropI ("scale", this.moScale, null);
if (this.moResolution != null) this.setPropI ("resolution", this.moResolution, null);
if (this.moPlane != null) {
this.setPropI ("plane", this.moPlane, null);
if (this.moCutoff != null) {
var max = this.moCutoff.floatValue ();
if (this.moSquareData === Boolean.TRUE || this.moSquareLinear === Boolean.TRUE) max = max * max;
this.setPropI ("red", Float.$valueOf (-max), null);
this.setPropI ("blue", Float.$valueOf (max), null);
}} else {
if (this.moCutoff != null) this.setPropI ((this.moIsPositiveOnly ? "cutoffPositive" : "cutoff"), this.moCutoff, null);
if (this.moColorNeg != null) this.setPropI ("colorRGB", this.moColorNeg, null);
if (this.moColorPos != null) this.setPropI ("colorRGB", this.moColorPos, null);
if (this.moMonteCarloCount != null) {
this.setPropI ("randomSeed", this.moRandomSeed, null);
this.setPropI ("monteCarloCount", this.moMonteCarloCount, null);
}}this.setPropI ("squareData", this.moSquareData, null);
this.setPropI ("squareLinear", this.moSquareLinear, null);
this.setPropI ("title", this.moTitleFormat, null);
this.setPropI ("fileName", this.vwr.fm.getFileName (), null);
this.currentMesh.modelIndex = this.modelIndex;
this.setPropI ("molecularOrbital", linearCombination == null ? Integer.$valueOf (moNumber) : linearCombination, null);
if (this.moPlane != null && this.moColorNeg != null) this.setPropI ("colorRGB", this.moColorNeg, null);
if (this.moPlane != null && this.moColorPos != null) this.setPropI ("colorRGB", this.moColorPos, null);
this.currentMesh.isColorSolid = false;
if (this.moSlabValue != null) this.setPropI ("slab", this.moSlabValue, null);
if (this.moSlab != null) for (var i = 0; i < this.moSlab.size (); i++) this.setPropI ("slab", this.moSlab.get (i), null);

if (this.moTranslucentLevel != null) this.setPropI ("translucentLevel", this.moTranslucentLevel, null);
if (this.moTranslucency != null) this.setPropI ("translucency", this.moTranslucency, null);
this.setPropI ("token", Integer.$valueOf (this.moFill), null);
this.setPropI ("token", Integer.$valueOf (this.moMesh), null);
this.setPropI ("token", Integer.$valueOf (this.moShell), null);
this.setPropI ("token", Integer.$valueOf (this.moDots), null);
this.setPropI ("token", Integer.$valueOf (this.moFrontOnly), null);
this.thisModel.put ("mesh", this.currentMesh);
return;
}, "~N,~A");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
if (this.htModels == null) return "";
var s =  new JU.SB ();
var modelCount = this.vwr.ms.mc;
for (var iModel = 0; iModel < modelCount; iModel++) {
if (!this.getSettings (this.getId (iModel))) continue;
if (modelCount > 1) J.shape.Shape.appendCmd (s, "frame " + this.vwr.getModelNumberDotted (iModel));
if (this.nboType != null) J.shape.Shape.appendCmd (s, "nbo type " + this.nboType);
if (this.moCutoff != null) J.shape.Shape.appendCmd (s, this.myType + " cutoff " + (this.sg.params.isPositiveOnly ? "+" : "") + this.moCutoff);
if (this.moScale != null) J.shape.Shape.appendCmd (s, this.myType + " scale " + this.moScale);
if (this.moMonteCarloCount != null) J.shape.Shape.appendCmd (s, this.myType + " points " + this.moMonteCarloCount + " " + this.moRandomSeed);
if (this.moResolution != null) J.shape.Shape.appendCmd (s, this.myType + " resolution " + this.moResolution);
if (this.moPlane != null) J.shape.Shape.appendCmd (s, this.myType + " plane {" + this.moPlane.x + " " + this.moPlane.y + " " + this.moPlane.z + " " + this.moPlane.w + "}");
if (this.moTitleFormat != null) J.shape.Shape.appendCmd (s, this.myType + " titleFormat " + JU.PT.esc (this.moTitleFormat));
if (this.moColorNeg != null) J.shape.Shape.appendCmd (s, this.myType + " color " + JU.Escape.escapeColor (this.moColorNeg.intValue ()) + (this.moColorNeg.equals (this.moColorPos) ? "" : " " + JU.Escape.escapeColor (this.moColorPos.intValue ())));
if (this.moSlab != null) {
if (this.thisMesh.slabOptions != null) J.shape.Shape.appendCmd (s, this.thisMesh.slabOptions.toString ());
if (this.thisMesh.jvxlData.slabValue != -2147483648) J.shape.Shape.appendCmd (s, this.myType + " slab " + this.thisMesh.jvxlData.slabValue);
}if (this.$moLinearCombination == null) {
J.shape.Shape.appendCmd (s, this.myType + " " + (this.moSquareData === Boolean.TRUE ? "squared " : "") + this.$moNumber);
} else {
J.shape.Shape.appendCmd (s, this.myType + " " + J.quantum.QS.getMOString (this.$moLinearCombination) + (this.moSquareLinear === Boolean.TRUE ? " squared" : ""));
}if (this.moTranslucency != null) J.shape.Shape.appendCmd (s, this.myType + " translucent " + this.moTranslucentLevel);
J.shape.Shape.appendCmd (s, (this.thisModel.get ("mesh")).getState (this.myType));
}
return s.toString ();
});
Clazz.defineMethod (c$, "merge", 
function (shape) {
var mo = shape;
this.moColorNeg = mo.moColorNeg;
this.moColorPos = mo.moColorPos;
this.moCutoff = mo.moCutoff;
this.moPlane = mo.moPlane;
this.moResolution = mo.moResolution;
this.moScale = mo.moScale;
this.moSlab = mo.moSlab;
this.moSlabValue = mo.moSlabValue;
this.moTitleFormat = mo.moTitleFormat;
this.moTranslucency = mo.moTranslucency;
if (this.htModels == null) this.htModels =  new java.util.Hashtable ();
var ht = mo.htModels;
if (ht != null) {
for (var entry, $entry = ht.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
this.htModels.put (key, entry.getValue ());
}
}Clazz.superCall (this, J.shapesurface.MolecularOrbital, "merge", [shape]);
}, "J.shape.MeshCollection");
});
