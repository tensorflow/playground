Clazz.declarePackage ("J.render");
Clazz.load (["J.render.FontLineShapeRenderer", "JU.P3"], "J.render.CageRenderer", ["JU.BS", "$.Measure", "J.shape.Bbcage", "JU.BoxInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.p3Screens = null;
this.tickEdges = null;
this.isSlab = false;
this.isPolymer = false;
this.pt = null;
Clazz.instantialize (this, arguments);
}, J.render, "CageRenderer", J.render.FontLineShapeRenderer);
Clazz.prepareFields (c$, function () {
this.p3Screens =  new Array (8);
{
for (var i = 8; --i >= 0; ) this.p3Screens[i] =  new JU.P3 ();

}this.pt =  new JU.P3 ();
});
Clazz.defineMethod (c$, "renderCage", 
function (mad, vertices, faces, axisPoints, firstLine, allowedEdges0, allowedEdges1, scale) {
this.g3d.setC (this.colix);
var fls = this.shape;
var hiddenLines = (faces != null);
this.imageFontScaling = this.vwr.imageFontScaling;
this.font3d = this.vwr.gdata.getFont3DScaled (fls.font3d, this.imageFontScaling);
var zSum = 0;
for (var i = 8; --i >= 0; ) {
this.pt.setT (vertices[i]);
if (scale != 1) {
this.pt.sub (vertices[0]);
this.pt.scaleAdd2 (scale, this.pt, vertices[0]);
}this.tm.transformPtNoClip (this.pt, this.p3Screens[i]);
zSum += this.p3Screens[i].z;
}
var bsSolid = null;
if (hiddenLines) {
bsSolid =  new JU.BS ();
for (var i = 12; --i >= 0; ) {
var face = faces[i];
JU.Measure.getNormalThroughPoints (this.p3Screens[face[0]], this.p3Screens[face[1]], this.p3Screens[face[2]], this.pt1, this.pt);
if (this.pt1.z <= 0) {
bsSolid.set (face[0]);
bsSolid.set (face[1]);
bsSolid.set (face[2]);
}}
}var diameter = this.getDiameter (Clazz.doubleToInt (Math.floor (zSum / 8)), mad);
var axisPt = 2;
var edge = String.fromCharCode (0);
allowedEdges0 &= (this.isPolymer ? 0x1 : this.isSlab ? 0x55 : 0xFF);
allowedEdges1 &= (this.isPolymer ? 0x10 : this.isSlab ? 0x55 : 0xFF);
for (var i = firstLine * 2; i < 24; i += 2) {
var d = diameter;
var edge0 = JU.BoxInfo.edges[i];
var edge1 = JU.BoxInfo.edges[i + 1];
if (hiddenLines && (!bsSolid.get (edge0) || !bsSolid.get (edge1))) d = -Math.abs (diameter);
if (axisPoints != null && edge0 == 0) this.tm.transformPtNoClip (axisPoints[axisPt--], this.p3Screens[0]);
if ((allowedEdges0 & (1 << edge0)) == 0 || (allowedEdges1 & (1 << edge1)) == 0) continue;
var drawTicks = (fls.tickInfos != null && (edge = this.tickEdges[i >> 1]).charCodeAt (0) != 0);
if (drawTicks) {
this.checkTickTemps ();
this.tickA.setT (vertices[edge0]);
this.tickB.setT (vertices[edge1]);
var start = 0;
if (Clazz.instanceOf (this.shape, J.shape.Bbcage)) switch (edge) {
case 'x':
start = this.tickA.x;
break;
case 'y':
start = this.tickA.y;
break;
case 'z':
start = this.tickA.z;
break;
}
this.tickInfo = fls.tickInfos["xyz".indexOf (edge) + 1];
if (this.tickInfo == null) this.tickInfo = fls.tickInfos[0];
if (this.tickInfo == null) drawTicks = false;
 else this.tickInfo.first = start;
}this.renderLine (this.p3Screens[edge0], this.p3Screens[edge1], d, drawTicks);
}
}, "~N,~A,~A,~A,~N,~N,~N,~N");
});
