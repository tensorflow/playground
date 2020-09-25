Clazz.declarePackage ("J.render");
Clazz.load (["J.render.CageRenderer", "JU.P3"], "J.render.UccageRenderer", ["JU.DF", "$.PT", "$.T4", "JU.BoxInfo", "$.C", "$.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.verticesT = null;
this.fset0 = null;
this.cell0 = null;
this.cell1 = null;
this.offset = null;
this.offsetT = null;
this.unitcell = null;
this.lineheight = 0;
this.xpos = 0;
this.ypos = 0;
Clazz.instantialize (this, arguments);
}, J.render, "UccageRenderer", J.render.CageRenderer);
Clazz.prepareFields (c$, function () {
this.verticesT =  new Array (8);
this.fset0 = JU.P3.new3 (555, 555, 1);
this.cell0 =  new JU.P3 ();
this.cell1 =  new JU.P3 ();
this.offset =  new JU.P3 ();
this.offsetT =  new JU.P3 ();
});
Clazz.overrideMethod (c$, "initRenderer", 
function () {
for (var i = 8; --i >= 0; ) this.verticesT[i] =  new JU.P3 ();

this.tickEdges = JU.BoxInfo.uccageTickEdges;
this.draw000 = false;
});
Clazz.overrideMethod (c$, "render", 
function () {
this.imageFontScaling = this.vwr.imageFontScaling;
this.font3d = this.vwr.gdata.getFont3DScaled ((this.shape).font3d, this.imageFontScaling);
var mad10 = this.vwr.getObjectMad10 (5);
if (mad10 == 0 || this.vwr.isJmolDataFrame () || this.tm.isNavigating () && this.vwr.getBoolean (603979890)) return false;
this.colix = this.vwr.getObjectColix (5);
var needTranslucent = JU.C.renderPass2 (this.colix);
if (!this.isExport && needTranslucent != this.vwr.gdata.isPass2) return needTranslucent;
this.render1 (mad10);
return false;
});
Clazz.defineMethod (c$, "render1", 
 function (mad10) {
this.g3d.setC (this.colix);
this.unitcell = this.vwr.getCurrentUnitCell ();
if (this.unitcell == null) return;
this.isPolymer = this.unitcell.isPolymer ();
this.isSlab = this.unitcell.isSlab ();
var vertices = this.unitcell.getUnitCellVerticesNoOffset ();
this.offset.setT (this.unitcell.getCartesianOffset ());
this.offsetT.setT (this.unitcell.getFractionalOrigin ());
this.unitcell.toCartesian (this.offsetT, true);
this.offset.sub (this.offsetT);
var hiddenLines = this.vwr.getBoolean (603979856);
var fset = this.unitcell.getUnitCellMultiplier ();
var haveMultiple = (fset != null && fset.distanceSquared (this.fset0) != 0);
if (!haveMultiple) fset = this.fset0;
var t3w = (Clazz.instanceOf (fset, JU.T4) ? Clazz.floatToInt ((fset).w) : 0);
JU.SimpleUnitCell.ijkToPoint3f (Clazz.floatToInt (fset.x), this.cell0, 0, t3w);
JU.SimpleUnitCell.ijkToPoint3f (Clazz.floatToInt (fset.y), this.cell1, 1, t3w);
var firstLine;
var allow0;
var allow1;
if (fset.z < 0) {
this.cell0.scale (-1 / fset.z);
this.cell1.scale (-1 / fset.z);
}var scale = Math.abs (fset.z);
var axes = this.vwr.shm.getShape (34);
if (axes != null && this.vwr.areAxesTainted ()) axes.reinitShape ();
var axisPoints = (axes == null || this.vwr.getObjectMad10 (1) == 0 || axes.axisXY.z != 0 || axes.fixedOrigin != null || axes.fixedOriginUC.lengthSquared () > 0 ? null : axes.axisPoints);
var drawAllLines = (this.isExport || this.vwr.getObjectMad10 (1) == 0 || this.vwr.getFloat (570425346) < 2 || axisPoints == null);
var aPoints = axisPoints;
var faces = (hiddenLines ? JU.BoxInfo.facePoints : null);
if (fset.z == 0) {
this.offsetT.setT (this.cell0);
this.unitcell.toCartesian (this.offsetT, true);
this.offsetT.add (this.offset);
aPoints = (this.cell0.x == 0 && this.cell0.y == 0 && this.cell0.z == 0 ? axisPoints : null);
firstLine = 0;
allow0 = 0xFF;
allow1 = 0xFF;
var pts = JU.BoxInfo.unitCubePoints;
for (var i = 8; --i >= 0; ) {
var v = JU.P3.new3 (pts[i].x * (this.cell1.x - this.cell0.x), pts[i].y * (this.cell1.y - this.cell0.y), pts[i].z * (this.cell1.z - this.cell0.z));
this.unitcell.toCartesian (v, true);
this.verticesT[i].add2 (v, this.offsetT);
}
this.renderCage (mad10, this.verticesT, faces, aPoints, firstLine, allow0, allow1, 1);
} else for (var x = Clazz.floatToInt (this.cell0.x); x < this.cell1.x; x++) {
for (var y = Clazz.floatToInt (this.cell0.y); y < this.cell1.y; y++) {
for (var z = Clazz.floatToInt (this.cell0.z); z < this.cell1.z; z++) {
if (haveMultiple) {
this.offsetT.set (x, y, z);
this.offsetT.scale (scale);
this.unitcell.toCartesian (this.offsetT, true);
this.offsetT.add (this.offset);
aPoints = (x == 0 && y == 0 && z == 0 ? axisPoints : null);
firstLine = (drawAllLines || aPoints == null ? 0 : 3);
} else {
this.offsetT.setT (this.offset);
firstLine = (drawAllLines ? 0 : 3);
}allow0 = 0xFF;
allow1 = 0xFF;
for (var i = 8; --i >= 0; ) this.verticesT[i].add2 (vertices[i], this.offsetT);

this.renderCage (mad10, this.verticesT, faces, aPoints, firstLine, allow0, allow1, scale);
}
}
}
this.renderInfo ();
}, "~N");
Clazz.defineMethod (c$, "renderInfo", 
 function () {
if (this.isExport || !this.vwr.getBoolean (603979828) || this.unitcell.isSimple () || this.vwr.isPreviewOnly || !this.vwr.gdata.setC (this.vwr.cm.colixBackgroundContrast) || this.vwr.gdata.getTextPosition () != 0) return;
this.vwr.gdata.setFontFid (this.vwr.gdata.getFontFidFS ("Monospaced", 14 * this.imageFontScaling));
this.xpos = Clazz.doubleToInt (Math.floor (10 * this.imageFontScaling));
this.ypos = this.lineheight = Clazz.doubleToInt (Math.floor (15 * this.imageFontScaling));
var sgName = (this.isPolymer ? "polymer" : this.isSlab ? "slab" : this.unitcell.getSpaceGroupName ());
if (sgName != null) {
if (sgName.startsWith ("cell=!")) sgName = "cell=inverse[" + sgName.substring (6) + "]";
sgName = JU.PT.rep (sgName, ";0,0,0", "");
if (sgName.indexOf ("#") < 0) {
var intTab = this.unitcell.getIntTableNumber ();
if (intTab != null) sgName += " #" + intTab;
}if (!sgName.equals ("-- [--]")) {
this.drawInfo (sgName, 0, null);
}}var info = this.unitcell.getMoreInfo ();
if (info != null) for (var i = 0; i < info.size (); i++) this.drawInfo (info.get (i), 0, null);

if (!this.vwr.getBoolean (603979937)) return;
this.drawInfo ("a=", 0, "\u00C5");
if (!this.isPolymer) this.drawInfo ("b=", 1, "\u00C5");
if (!this.isPolymer && !this.isSlab) this.drawInfo ("c=", 2, "\u00C5");
if (!this.isPolymer) {
if (!this.isSlab) {
this.drawInfo ("\u03B1=", 3, "\u00B0");
this.drawInfo ("\u03B2=", 4, "\u00B0");
}this.drawInfo ("\u03B3=", 5, "\u00B0");
}});
Clazz.defineMethod (c$, "drawInfo", 
 function (s, type, post) {
this.ypos += this.lineheight;
if (post != null) s += JU.DF.formatDecimal (this.unitcell.getUnitCellInfoType (type), 3) + post;
this.g3d.drawStringNoSlab (s, null, this.xpos, this.ypos, 0, 0);
}, "~S,~N,~S");
});
