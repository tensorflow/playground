Clazz.declarePackage ("J.render");
Clazz.load (["J.render.ShapeRenderer"], "J.render.FrankRenderer", ["JV.Viewer"], function () {
c$ = Clazz.declareType (J.render, "FrankRenderer", J.render.ShapeRenderer);
Clazz.overrideMethod (c$, "render", 
function () {
var frank = this.shape;
var allowKeys = this.vwr.getBooleanProperty ("allowKeyStrokes");
var modelKitMode = this.vwr.getBoolean (603983903);
this.colix = (modelKitMode ? 20 : this.vwr.isSignedApplet ? (allowKeys || (JV.Viewer.isJS || JV.Viewer.isSwingJS) && !JV.Viewer.isWebGL ? 5 : 10) : allowKeys ? 7 : 12);
if (this.isExport || !this.vwr.getShowFrank () || !this.g3d.setC (this.colix)) return false;
if (this.vwr.frankOn && !this.vwr.noFrankEcho) return this.vwr.noFrankEcho;
this.vwr.noFrankEcho = true;
var imageFontScaling = this.vwr.imageFontScaling;
frank.getFont (imageFontScaling);
var dx = Clazz.floatToInt (frank.frankWidth + 4 * imageFontScaling);
var dy = frank.frankDescent;
this.g3d.drawStringNoSlab (frank.frankString, frank.font3d, this.vwr.gdata.width - dx, this.vwr.gdata.height - dy, 0, 0);
if (modelKitMode) {
this.g3d.setC (12);
var w = 10;
var h = 26;
this.g3d.fillTextRect (0, 0, 1, 0, w, h * 4);
var kit = this.vwr.getModelkit (false);
var active = kit.getActiveMenu ();
if (active != null) {
if ("atomMenu".equals (active)) {
this.g3d.setC (21);
this.g3d.fillTextRect (0, 0, 0, 0, w, h);
} else if ("bondMenu".equals (active)) {
this.g3d.setC (7);
this.g3d.fillTextRect (0, h, 0, 0, w, h);
} else if ("xtalMenu".equals (active)) {
this.g3d.setC (8);
this.g3d.fillTextRect (0, h << 1, 0, 0, w, h);
}}}return false;
});
});
