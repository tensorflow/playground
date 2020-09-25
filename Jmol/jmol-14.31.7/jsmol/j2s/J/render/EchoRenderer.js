Clazz.declarePackage ("J.render");
Clazz.load (["J.render.LabelsRenderer"], "J.render.EchoRenderer", ["JM.Atom", "J.render.TextRenderer", "JU.C", "$.Txt"], function () {
c$ = Clazz.declareType (J.render, "EchoRenderer", J.render.LabelsRenderer);
Clazz.overrideMethod (c$, "render", 
function () {
if (this.vwr.isPreviewOnly) return false;
var echo = this.shape;
this.sppm = (this.vwr.getBoolean (603979845) ? this.vwr.getScalePixelsPerAngstrom (true) * 10000 : 0);
this.imageFontScaling = this.vwr.imageFontScaling;
var haveTranslucent = false;
for (var t, $t = echo.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) {
if (!t.visible || t.hidden) {
continue;
}if (Clazz.instanceOf (t.pointerPt, JM.Atom)) {
if (!(t.pointerPt).checkVisible ()) continue;
}if (t.valign == 4) {
this.tm.transformPtScr (t.xyz, this.pt0i);
t.setXYZs (this.pt0i.x, this.pt0i.y, this.pt0i.z, this.pt0i.z);
}if (t.pymolOffset != null) t.getPymolScreenOffset (t.xyz, this.pt0i, this.zSlab, this.pTemp, this.sppm);
 else if (t.movableZPercent != 2147483647) {
var z = this.vwr.tm.zValueFromPercent (t.movableZPercent % 1000);
if (t.valign == 4 && Math.abs (t.movableZPercent) >= 1000) z = this.pt0i.z - this.vwr.tm.zValueFromPercent (0) + z;
t.setZs (z, z);
}if (t.pointerPt == null) {
t.pointer = 0;
} else {
t.pointer = 1;
this.tm.transformPtScr (t.pointerPt, this.pt0i);
t.atomX = this.pt0i.x;
t.atomY = this.pt0i.y;
t.atomZ = this.pt0i.z;
if (t.zSlab == -2147483648) t.zSlab = 1;
}if (J.render.TextRenderer.render (t, this.g3d, this.sppm, this.imageFontScaling, false, null, this.xy) && t.valign == 1 && t.align == 12) this.vwr.noFrankEcho = false;
if (JU.C.renderPass2 (t.bgcolix) || JU.C.renderPass2 (t.colix)) haveTranslucent = true;
}
if (!this.isExport) {
var frameTitle = this.vwr.getFrameTitle ();
if (frameTitle != null && frameTitle.length > 0) {
if (this.g3d.setC (this.vwr.cm.colixBackgroundContrast)) {
if (frameTitle.indexOf ("%{") >= 0 || frameTitle.indexOf ("@{") >= 0) frameTitle = JU.Txt.formatText (this.vwr, frameTitle);
this.renderFrameTitle (frameTitle);
}}}return haveTranslucent;
});
Clazz.defineMethod (c$, "renderFrameTitle", 
 function (frameTitle) {
this.vwr.gdata.setFontFid (this.vwr.gdata.getFontFidFS ("arial", Clazz.floatToInt (24 * this.imageFontScaling)));
var y = Clazz.doubleToInt (Math.floor (this.vwr.getScreenHeight () * (this.g3d.isAntialiased () ? 2 : 1) - 10 * this.imageFontScaling));
var x = Clazz.doubleToInt (Math.floor (5 * this.imageFontScaling));
this.g3d.drawStringNoSlab (frameTitle, null, x, y, 0, 0);
}, "~S");
});
