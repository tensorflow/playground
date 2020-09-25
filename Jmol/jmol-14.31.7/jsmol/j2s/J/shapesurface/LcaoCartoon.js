Clazz.declarePackage ("J.shapesurface");
Clazz.load (["J.shapesurface.Isosurface"], "J.shapesurface.LcaoCartoon", ["java.lang.Float", "JU.PT", "$.SB", "$.V3", "JU.C", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.thisType = null;
this.myColorPt = 0;
this.lcaoID = null;
this.thisSet = null;
this.isMolecular = false;
this.rotationAxis = null;
this.lcaoScale = null;
this.lcaoTranslucent = false;
this.lcaoTranslucentLevel = 0;
this.lcaoColorPos = null;
this.lcaoColorNeg = null;
this.isLonePair = false;
this.isRadical = false;
this.cappingObject = null;
this.slabbingObject = null;
this.fullCommand = null;
Clazz.instantialize (this, arguments);
}, J.shapesurface, "LcaoCartoon", J.shapesurface.Isosurface);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, J.shapesurface.LcaoCartoon, "initShape", []);
this.myType = "lcaoCartoon";
this.allowMesh = false;
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
var setInfo = false;
if ("init" === propertyName) {
this.myColorPt = 0;
this.lcaoID = null;
this.thisSet = bs;
this.isMolecular = this.isLonePair = this.isRadical = false;
this.thisType = null;
this.rotationAxis = null;
this.fullCommand = value;
this.setPropI ("init", null, null);
return;
}if ("lcaoID" === propertyName) {
this.lcaoID = value;
return;
}if ("thisID" === propertyName) {
this.lcaoID = value;
}if ("selectType" === propertyName) {
this.thisType = value;
return;
}if ("rotationAxis" === propertyName) {
this.rotationAxis = value;
return;
}if ("scale" === propertyName) {
this.lcaoScale = value;
}if ("colorRGB" === propertyName) {
this.lcaoColorPos = value;
if (this.myColorPt++ == 0) this.lcaoColorNeg = this.lcaoColorPos;
}if ("select" === propertyName) {
this.thisSet = value;
}if ("translucentLevel" === propertyName) {
this.lcaoTranslucentLevel = (value).floatValue ();
}if ("settranslucency" === propertyName) {
this.lcaoTranslucent = ((value).equals ("translucent"));
return;
}if ("translucency" === propertyName) {
this.lcaoTranslucent = ((value).equals ("translucent"));
if (this.lcaoID == null) return;
}if ("molecular" === propertyName) {
this.isMolecular = true;
if (value == null) return;
propertyName = "create";
}if ("create" === propertyName) {
this.myColorPt = 0;
this.thisType = value;
this.createLcaoCartoon ();
return;
}if ("lonePair" === propertyName) {
this.isLonePair = true;
return;
}if ("lp" === propertyName) {
this.isLonePair = setInfo = true;
}if ("radical" === propertyName) {
this.isRadical = true;
return;
}if ("rad" === propertyName) {
this.isRadical = setInfo = true;
}if ("delete" === propertyName) {
this.deleteLcaoCartoon ();
return;
}if ("on" === propertyName) {
this.setLcaoOn (true);
return;
}if ("off" === propertyName) {
this.setLcaoOn (false);
return;
}if ("slab" === propertyName) {
this.slabbingObject = value;
}if ("cap" === propertyName) {
this.cappingObject = value;
}if ("lobe" === propertyName || "sphere" === propertyName) {
this.getCapSlabInfo (this.fullCommand);
}this.setPropI (propertyName, value, bs);
if (setInfo || "lobe" === propertyName || "sphere" === propertyName) {
this.setScriptInfo (null);
}}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "setLcaoOn", 
 function (TF) {
if (JU.PT.isWild (this.lcaoID)) {
var list = this.getMeshList (this.lcaoID, false);
for (var i = list.size (); --i >= 0; ) list.get (i).visible = TF;

return;
}var ac = this.vwr.ms.ac;
for (var i = ac; --i >= 0; ) if (this.lcaoID != null || this.thisSet.get (i)) this.setLcaoOn (i, TF);

}, "~B");
Clazz.defineMethod (c$, "setLcaoOn", 
 function (iAtom, TF) {
var id = this.getID (this.lcaoID, iAtom);
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].thisID.indexOf (id) == 0) this.meshes[i].visible = TF;

}, "~N,~B");
Clazz.defineMethod (c$, "deleteLcaoCartoon", 
 function () {
if (JU.PT.isWild (this.lcaoID)) {
this.deleteMeshKey (this.lcaoID);
return;
}var ac = this.vwr.ms.ac;
for (var i = ac; --i >= 0; ) if (this.lcaoID != null || this.thisSet.get (i)) this.deleteLcaoCartoon (i);

});
Clazz.defineMethod (c$, "deleteLcaoCartoon", 
 function (iAtom) {
var id = this.getID (this.lcaoID, iAtom);
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].thisID.indexOf (id) == 0) this.deleteMeshI (i);

}, "~N");
Clazz.defineMethod (c$, "createLcaoCartoon", 
 function () {
this.isMolecular = (this.isMolecular && (this.thisType.indexOf ("px") >= 0 || this.thisType.indexOf ("py") >= 0 || this.thisType.indexOf ("pz") >= 0));
var lcaoID0 = this.lcaoID;
for (var i = this.thisSet.nextSetBit (0); i >= 0; i = this.thisSet.nextSetBit (i + 1)) {
this.createLcaoCartoon (i);
this.lcaoID = lcaoID0;
}
});
Clazz.defineMethod (c$, "createLcaoCartoon", 
 function (iAtom) {
var id = this.getID (this.lcaoID, iAtom);
var isCpk = (this.thisType.equals ("cpk"));
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].thisID.indexOf (id) == 0) this.deleteMeshI (i);

this.setPropI ("init", null, null);
this.translucentLevel = this.lcaoTranslucentLevel;
this.setPropI ("thisID", id, null);
if (this.lcaoScale != null) this.setPropI ("scale", this.lcaoScale, null);
if (isCpk) {
this.setPropI ("colorRGB", Integer.$valueOf (this.vwr.gdata.getColorArgbOrGray (this.ms.at[iAtom].colixAtom)), null);
} else if (this.lcaoColorNeg != null) {
this.setPropI ("colorRGB", this.lcaoColorNeg, null);
this.setPropI ("colorRGB", this.lcaoColorPos, null);
}if (this.slabbingObject != null) this.setPropI ("slab", this.slabbingObject, null);
if (this.cappingObject != null) this.setPropI ("cap", this.cappingObject, null);
this.setPropI ("lcaoType", this.thisType, null);
this.setPropI ("atomIndex", Integer.$valueOf (iAtom), null);
var axes =  Clazz.newArray (-1, [ new JU.V3 (),  new JU.V3 (), JU.V3.newV (this.ms.at[iAtom]),  new JU.V3 ()]);
if (this.rotationAxis != null) axes[3].setT (this.rotationAxis);
if (this.isMolecular) {
if (this.thisType.indexOf ("px") >= 0) {
axes[0].set (0, -1, 0);
axes[1].set (1, 0, 0);
} else if (this.thisType.indexOf ("py") >= 0) {
axes[0].set (-1, 0, 0);
axes[1].set (0, 0, 1);
} else if (this.thisType.indexOf ("pz") >= 0) {
axes[0].set (0, 0, 1);
axes[1].set (1, 0, 0);
}if (this.thisType.indexOf ("-") == 0) axes[0].scale (-1);
}if (this.isMolecular || isCpk || this.thisType.equalsIgnoreCase ("s") || this.vwr.getHybridizationAndAxes (iAtom, axes[0], axes[1], this.thisType) != null) {
this.setPropI ((this.isRadical ? "radical" : this.isLonePair ? "lonePair" : "lcaoCartoon"), axes, null);
}if (isCpk) {
var colix = this.vwr.ms.at[iAtom].colixAtom;
if (JU.C.isColixTranslucent (colix)) {
this.setPropI ("translucentLevel", Float.$valueOf (JU.C.getColixTranslucencyLevel (colix)), null);
this.setPropI ("translucency", "translucent", null);
}} else if (this.lcaoTranslucent) for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].thisID.indexOf (id) == 0) this.meshes[i].setTranslucent (true, this.translucentLevel);

}, "~N");
Clazz.defineMethod (c$, "getID", 
 function (id, i) {
return (id != null ? id : (this.isLonePair || this.isRadical ? "lp_" : "lcao_") + (i + 1) + "_") + (this.thisType == null ? "" : JU.PT.rep (this.thisType, "-", (this.thisType.indexOf ("-p") == 0 ? "" : "_")));
}, "~S,~N");
Clazz.defineMethod (c$, "getShapeState", 
function () {
var sb =  new JU.SB ();
if (this.lcaoScale != null) J.shape.Shape.appendCmd (sb, "lcaoCartoon scale " + this.lcaoScale.floatValue ());
if (this.lcaoColorNeg != null) J.shape.Shape.appendCmd (sb, "lcaoCartoon color " + JU.Escape.escapeColor (this.lcaoColorNeg.intValue ()) + " " + JU.Escape.escapeColor (this.lcaoColorPos.intValue ()));
if (this.lcaoTranslucent) J.shape.Shape.appendCmd (sb, "lcaoCartoon translucent " + this.translucentLevel);
for (var i = this.meshCount; --i >= 0; ) if (!this.meshes[i].visible) J.shape.Shape.appendCmd (sb, "lcaoCartoon ID " + this.meshes[i].thisID + " off");

return Clazz.superCall (this, J.shapesurface.LcaoCartoon, "getShapeState", []) + sb.toString ();
});
Clazz.defineMethod (c$, "merge", 
function (shape) {
var lc = shape;
this.lcaoScale = lc.lcaoScale;
this.lcaoColorNeg = lc.lcaoColorNeg;
this.lcaoTranslucent = lc.lcaoTranslucent;
this.lcaoTranslucentLevel = lc.lcaoTranslucentLevel;
Clazz.superCall (this, J.shapesurface.LcaoCartoon, "merge", [shape]);
}, "J.shape.MeshCollection");
});
