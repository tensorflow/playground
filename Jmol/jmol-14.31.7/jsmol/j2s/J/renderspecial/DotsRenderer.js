Clazz.declarePackage ("J.renderspecial");
Clazz.load (["J.render.ShapeRenderer", "JU.P3i", "$.V3"], "J.renderspecial.DotsRenderer", ["J.shapespecial.Dots", "JU.C", "$.Geodesic"], function () {
c$ = Clazz.decorateAsClass (function () {
this.iShowSolid = false;
this.screenLevel = 0;
this.screenDotCount = 0;
this.scrCoords = null;
this.faceMap = null;
this.v3temp = null;
this.scrTemp = null;
this.dotScale = 0;
Clazz.instantialize (this, arguments);
}, J.renderspecial, "DotsRenderer", J.render.ShapeRenderer);
Clazz.prepareFields (c$, function () {
this.v3temp =  new JU.V3 ();
this.scrTemp =  new JU.P3i ();
});
Clazz.overrideMethod (c$, "initRenderer", 
function () {
this.screenLevel = J.shapespecial.Dots.MAX_LEVEL;
this.screenDotCount = JU.Geodesic.getVertexCount (J.shapespecial.Dots.MAX_LEVEL);
this.scrCoords =  Clazz.newIntArray (3 * this.screenDotCount, 0);
});
Clazz.overrideMethod (c$, "render", 
function () {
this.render1 (this.shape);
return false;
});
Clazz.defineMethod (c$, "render1", 
function (dots) {
if (!this.iShowSolid && !this.g3d.setC (4)) return;
var sppa = Clazz.floatToInt (this.vwr.getScalePixelsPerAngstrom (true));
this.screenLevel = (this.iShowSolid || sppa > 20 ? 3 : sppa > 10 ? 2 : sppa > 5 ? 1 : 0);
if (!this.iShowSolid) this.screenLevel += this.vwr.getInt (553648141) - 3;
this.screenLevel = Math.max (Math.min (this.screenLevel, J.shapespecial.Dots.MAX_LEVEL), 0);
this.screenDotCount = JU.Geodesic.getVertexCount (this.screenLevel);
this.dotScale = this.vwr.getInt (553648142);
var maps = dots.ec.getDotsConvexMaps ();
for (var i = dots.ec.getDotsConvexMax (); --i >= 0; ) {
var atom = this.ms.at[i];
var map = maps[i];
if (map == null || !this.isVisibleForMe (atom) || !this.g3d.isInDisplayRange (atom.sX, atom.sY)) continue;
try {
var radius = dots.ec.getAppropriateRadius (i);
if (this.iShowSolid && this.exportType == 1) {
this.g3d.drawAtom (atom, radius);
continue;
}var nPoints = 0;
var j = 0;
var iDot = Math.min (map.size (), this.screenDotCount);
while (--iDot >= 0) {
if (!map.get (iDot)) continue;
this.v3temp.scaleAdd2 (radius, JU.Geodesic.getVertexVector (iDot), atom);
this.tm.transformPtScr (this.v3temp, this.scrTemp);
if (this.faceMap != null) this.faceMap[iDot] = j;
this.scrCoords[j++] = this.scrTemp.x;
this.scrCoords[j++] = this.scrTemp.y;
this.scrCoords[j++] = this.scrTemp.z;
++nPoints;
}
if (nPoints != 0) this.renderConvex (JU.C.getColixInherited (dots.colixes[i], atom.colixAtom), map, nPoints);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("Dots rendering error");
System.out.println (e.toString ());
} else {
throw e;
}
}
}
}, "J.shapespecial.Dots");
Clazz.defineMethod (c$, "renderConvex", 
function (colix, map, nPoints) {
this.colix = JU.C.getColixTranslucent3 (colix, false, 0);
this.renderDots (nPoints);
}, "~N,JU.BS,~N");
Clazz.defineMethod (c$, "renderDots", 
function (nPoints) {
this.g3d.setC (this.colix);
this.g3d.drawPoints (nPoints, this.scrCoords, this.dotScale);
}, "~N");
});
