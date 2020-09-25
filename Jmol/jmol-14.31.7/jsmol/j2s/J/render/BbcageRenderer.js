Clazz.declarePackage ("J.render");
Clazz.load (["J.render.CageRenderer"], "J.render.BbcageRenderer", ["JU.BoxInfo"], function () {
c$ = Clazz.declareType (J.render, "BbcageRenderer", J.render.CageRenderer);
Clazz.overrideMethod (c$, "initRenderer", 
function () {
this.tickEdges = JU.BoxInfo.bbcageTickEdges;
});
Clazz.overrideMethod (c$, "render", 
function () {
var bbox = this.shape;
var hiddenLines = (this.vwr.getBoolean (603979856));
if (bbox.isVisible && (this.isExport || this.g3d.checkTranslucent (false)) && !this.vwr.isJmolDataFrame ()) {
this.colix = this.vwr.getObjectColix (4);
this.renderCage (this.vwr.getObjectMad10 (4), this.ms.getBBoxVertices (), (hiddenLines ? JU.BoxInfo.facePoints : null), null, 0, 0xFF, 0xFF, 1);
}return false;
});
});
