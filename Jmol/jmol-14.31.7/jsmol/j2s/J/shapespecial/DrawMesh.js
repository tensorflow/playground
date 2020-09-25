Clazz.declarePackage ("J.shapespecial");
Clazz.load (["J.shape.Mesh"], "J.shapespecial.DrawMesh", ["JU.AU", "$.BS", "$.P3", "$.V3", "J.shapespecial.Draw", "JU.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bsMeshesVisible = null;
this.modelFlags = null;
this.drawType = null;
this.drawTypes = null;
this.ptCenters = null;
this.axis = null;
this.axes = null;
this.drawVertexCount = 0;
this.drawVertexCounts = null;
this.isFixed = false;
this.isVector = false;
this.drawArrowScale = 0;
this.noHead = false;
this.isBarb = false;
this.scale = 1;
this.isScaleSet = false;
Clazz.instantialize (this, arguments);
}, J.shapespecial, "DrawMesh", J.shape.Mesh);
Clazz.makeConstructor (c$, 
function (vwr, thisID, colix, index) {
this.drawType = J.shapespecial.Draw.EnumDrawType.NONE;
this.axis = JU.V3.new3 (1, 0, 0);
this.bsMeshesVisible =  new JU.BS ();
this.mesh1 (vwr, thisID, colix, index);
}, "JV.Viewer,~S,~N,~N");
Clazz.overrideMethod (c$, "clear", 
function (meshType) {
this.clearMesh (meshType);
this.scale = 1;
this.isScaleSet = false;
}, "~S");
Clazz.defineMethod (c$, "setCenters", 
function () {
if (this.ptCenters == null) this.setCenter (-1);
 else for (var i = this.ptCenters.length; --i >= 0; ) this.setCenter (i);

});
Clazz.defineMethod (c$, "setCenter", 
function (iModel) {
var center = JU.P3.new3 (0, 0, 0);
var iptlast = -1;
var ipt = 0;
var n = 0;
for (var i = this.pc; --i >= 0; ) {
if (iModel >= 0 && i != iModel || this.pis[i] == null) continue;
iptlast = -1;
for (var iV = (this.drawType === J.shapespecial.Draw.EnumDrawType.POLYGON) ? 3 : this.pis[i].length; --iV >= 0; ) {
ipt = this.pis[i][iV];
if (ipt == iptlast) continue;
iptlast = ipt;
center.add (this.vs[ipt]);
n++;
}
if (n > 0 && (i == iModel || i == 0)) {
center.scale (1.0 / n);
if (this.mat4 != null) this.mat4.rotTrans (center);
break;
}}
if (iModel < 0) {
this.ptCenter.setT (center);
} else {
this.ptCenters[iModel] = center;
}}, "~N");
Clazz.defineMethod (c$, "offset", 
function (offset) {
this.rotateTranslate (null, offset, false);
this.setCenters ();
}, "JU.V3");
Clazz.defineMethod (c$, "deleteAtoms", 
function (modelIndex) {
if (modelIndex >= this.pc) return;
this.pc--;
this.pis = JU.AU.deleteElements (this.pis, modelIndex, 1);
this.drawTypes = JU.AU.deleteElements (this.drawTypes, modelIndex, 1);
this.drawVertexCounts = JU.AU.deleteElements (this.drawVertexCounts, modelIndex, 1);
this.ptCenters = JU.AU.deleteElements (this.ptCenters, modelIndex, 1);
this.axes = JU.AU.deleteElements (this.axes, modelIndex, 1);
var bs = JU.BSUtil.newAndSetBit (modelIndex);
JU.BSUtil.deleteBits (this.modelFlags, bs);
}, "~N");
Clazz.defineMethod (c$, "isRenderScalable", 
function () {
switch (this.drawType) {
case J.shapespecial.Draw.EnumDrawType.ARROW:
return (this.connectedAtoms != null);
case J.shapespecial.Draw.EnumDrawType.ARC:
case J.shapespecial.Draw.EnumDrawType.CIRCLE:
case J.shapespecial.Draw.EnumDrawType.CIRCULARPLANE:
return true;
default:
return this.haveXyPoints;
}
});
});
