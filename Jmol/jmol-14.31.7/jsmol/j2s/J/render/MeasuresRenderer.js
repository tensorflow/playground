Clazz.declarePackage ("J.render");
Clazz.load (["J.render.LabelsRenderer"], "J.render.MeasuresRenderer", ["java.util.Hashtable", "JU.A4", "$.M3", "$.Measure", "$.P3", "J.render.FontLineShapeRenderer", "J.shape.Measures", "JU.Point3fi"], function () {
c$ = Clazz.decorateAsClass (function () {
this.doJustify = false;
this.modulating = false;
this.mad0 = 0;
this.mpts = null;
this.m = null;
this.p = null;
this.count = 0;
this.aaT = null;
this.matrixT = null;
Clazz.instantialize (this, arguments);
}, J.render, "MeasuresRenderer", J.render.LabelsRenderer);
Clazz.overrideMethod (c$, "initRenderer", 
function () {
this.mpts =  new java.util.Hashtable ();
this.p =  new Array (4);
});
Clazz.overrideMethod (c$, "render", 
function () {
if (!this.g3d.checkTranslucent (false)) return false;
if (this.atomPt == null) this.atomPt =  new JU.Point3fi ();
var measures = this.shape;
if (measures.ms !== this.ms) {
System.out.println ("!measure wrong modelset!");
measures.clear ();
return false;
}this.doJustify = this.vwr.getBoolean (603979870);
this.modulating = this.ms.bsModulated != null;
this.imageFontScaling = this.vwr.imageFontScaling;
this.mad0 = measures.mad;
this.font3d = this.vwr.gdata.getFont3DScaled (J.shape.Measures.font3d, this.imageFontScaling);
this.m = measures.mPending;
if (!this.isExport && this.m != null && (this.count = this.m.count) != 0) this.renderPendingMeasurement ();
if (!this.vwr.getBoolean (603979926)) return false;
var showMeasurementLabels = this.vwr.getBoolean (603979878);
measures.setVisibilityInfo ();
for (var i = measures.measurementCount; --i >= 0; ) {
this.m = measures.measurements.get (i);
if (!this.m.isVisible || !this.m.$isValid || (this.count = this.m.count) == 1 && this.m.traceX == -2147483648) continue;
this.getPoints ();
this.colix = this.m.colix;
if (this.colix == 0) this.colix = measures.colix;
if (this.colix == 0) this.colix = this.vwr.cm.colixBackgroundContrast;
this.labelColix = this.m.labelColix;
if (this.labelColix == 0) this.labelColix = this.vwr.cm.colixBackgroundContrast;
 else if (this.labelColix == -1) this.labelColix = this.colix;
this.g3d.setC (this.colix);
this.colixA = this.colixB = this.colix;
this.renderMeasurement (showMeasurementLabels);
}
return false;
});
Clazz.defineMethod (c$, "getPoints", 
 function () {
for (var j = this.count; --j >= 0; ) {
var i = this.m.getAtomIndex (j + 1);
var pt = (i >= 0 && this.modulating ? this.getModAtom (i) : this.m.getAtom (j + 1));
if (pt.sD < 0) {
this.tm.transformPtScr (pt, this.pt0i);
pt.sX = this.pt0i.x;
pt.sY = this.pt0i.y;
pt.sZ = this.pt0i.z;
}this.p[j] = pt;
}
if (this.modulating) this.m.refresh (this.p);
});
Clazz.defineMethod (c$, "getModAtom", 
 function (i) {
var ii = Integer.$valueOf (i);
var pt = this.mpts.get (ii);
if (pt != null) ii = null;
var v = this.ms.getModulation (i);
if (v == null) {
pt = this.ms.at[i];
} else {
if (pt == null) pt =  new JU.Point3fi ();
pt.setT (this.ms.at[i]);
if (this.vwr.tm.vibrationOn) this.vwr.tm.getVibrationPoint (v, pt, NaN);
pt.sD = -1;
}if (ii != null) this.mpts.put (ii, pt);
return pt;
}, "~N");
Clazz.defineMethod (c$, "renderMeasurement", 
 function (renderLabel) {
var s = (renderLabel ? this.m.getString () : null);
if (s != null) {
if (s.length == 0) {
s = null;
} else if (this.m.text != null) {
this.m.text.setText (s);
this.m.text.colix = this.labelColix;
}}if (this.m.mad == 0) {
this.dotsOrDashes = false;
this.mad = this.mad0;
} else {
this.mad = this.m.mad;
this.dotsOrDashes = true;
this.dashDots = (this.mad < 0 ? null : J.render.FontLineShapeRenderer.ndots);
}switch (this.count) {
case 1:
this.drawLine (this.p[0].sX, this.p[0].sY, this.p[0].sZ, this.m.traceX, this.m.traceY, this.p[0].sZ, this.mad);
break;
case 2:
this.renderDistance (s, this.p[0], this.p[1]);
break;
case 3:
this.renderAngle (s, this.p[0], this.p[1], this.p[2]);
break;
case 4:
this.renderTorsion (s, this.p[0], this.p[1], this.p[2], this.p[3]);
break;
}
this.p[0] = this.p[1] = this.p[2] = this.p[3] = null;
}, "~B");
Clazz.defineMethod (c$, "renderDistance", 
function (s, a, b) {
if ((this.tickInfo = this.m.tickInfo) != null) {
this.drawLine (a.sX, a.sY, a.sZ, b.sX, b.sY, b.sZ, this.mad);
this.tickA = a;
this.tickB = b;
if (this.tickAs == null) {
this.tickAs =  new JU.P3 ();
this.tickBs =  new JU.P3 ();
}this.tickAs.set (a.sX, a.sY, a.sZ);
this.tickBs.set (b.sX, b.sY, b.sZ);
this.drawTicks (this.mad, s != null);
return;
}var zA = a.sZ - a.sD - 10;
var zB = b.sZ - b.sD - 10;
var radius = this.drawLine (a.sX, a.sY, zA, b.sX, b.sY, zB, this.mad);
if (s == null) return;
if (this.mad > 0) radius <<= 1;
var z = Clazz.doubleToInt ((zA + zB) / 2);
if (z < 1) z = 1;
var x = Clazz.doubleToInt ((a.sX + b.sX) / 2);
var y = Clazz.doubleToInt ((a.sY + b.sY) / 2);
if (this.m.text == null) {
this.g3d.setC (this.labelColix);
this.drawString (x, y, z, radius, this.doJustify && (x - a.sX) * (y - a.sY) > 0, false, true, (this.doJustify ? 0 : 2147483647), s);
} else {
this.atomPt.ave (a, b);
this.atomPt.sX = Clazz.doubleToInt ((a.sX + b.sX) / 2);
this.atomPt.sY = Clazz.doubleToInt ((a.sY + b.sY) / 2);
this.renderLabelOrMeasure (this.m.text, s);
}}, "~S,JU.Point3fi,JU.Point3fi");
Clazz.defineMethod (c$, "renderAngle", 
 function (s, a, b, c) {
var zOffset = b.sD + 10;
var zA = a.sZ - a.sD - 10;
var zB = b.sZ - zOffset;
var zC = c.sZ - c.sD - 10;
var radius = this.drawLine (a.sX, a.sY, zA, b.sX, b.sY, zB, this.mad);
radius += this.drawLine (b.sX, b.sY, zB, c.sX, c.sY, zC, this.mad);
if (s == null) return;
radius = Clazz.doubleToInt ((radius + 1) / 2);
if (this.m.value > 175) {
if (this.m.text == null) {
var offset = Clazz.doubleToInt (Math.floor (5 * this.imageFontScaling));
this.g3d.setC (this.labelColix);
this.drawString (b.sX + offset, b.sY - offset, zB, radius, false, false, false, (this.doJustify ? 0 : 2147483647), s);
} else {
this.atomPt.setT (b);
this.renderLabelOrMeasure (this.m.text, s);
}return;
}if (this.m.isTainted ()) {
var radians = JU.Measure.computeAngle (this.p[0], this.p[1], this.p[2], this.vectorT2, this.vectorT3, false);
this.vectorT.cross (this.vectorT2, this.vectorT3);
this.m.renderAxis = JU.A4.new4 (this.vectorT.x, this.vectorT.y, this.vectorT.z, radians);
this.vectorT2.normalize ();
this.vectorT2.scale (0.5);
this.m.renderArc = JU.P3.newP (this.vectorT2);
}if (this.aaT == null) {
this.aaT =  new JU.A4 ();
this.matrixT =  new JU.M3 ();
}var dotCount = Clazz.doubleToInt (Math.floor ((this.m.renderAxis.angle / (6.283185307179586)) * 64));
var stepAngle = this.m.renderAxis.angle / dotCount;
this.aaT.setAA (this.m.renderAxis);
var iMid = Clazz.doubleToInt (dotCount / 2);
for (var i = dotCount; --i >= 0; ) {
this.aaT.angle = i * stepAngle;
this.pointT.setT (this.m.renderArc);
this.matrixT.setAA (this.aaT).rotate (this.pointT);
this.pointT.add (b);
var p3i = this.tm.transformPt (this.pointT);
var zArc = p3i.z - zOffset;
if (zArc < 0) zArc = 0;
this.g3d.drawPixel (p3i.x, p3i.y, zArc);
if (i != iMid) continue;
this.pointT.setT (this.m.renderArc);
this.pointT.scale (1.1);
this.matrixT.rotate (this.pointT);
this.pointT.add (b);
this.tm.transformPt (this.pointT);
var zLabel = p3i.z - zOffset;
if (this.m.text == null) {
this.g3d.setC (this.labelColix);
this.drawString (p3i.x, p3i.y, zLabel, radius, p3i.x < b.sX, false, false, (this.doJustify ? b.sY : 2147483647), s);
} else {
this.atomPt.setT (this.pointT);
this.renderLabelOrMeasure (this.m.text, s);
}}
}, "~S,JU.Point3fi,JU.Point3fi,JU.Point3fi");
Clazz.defineMethod (c$, "renderTorsion", 
 function (s, a, b, c, d) {
var zA = a.sZ - a.sD - 10;
var zB = b.sZ - b.sD - 10;
var zC = c.sZ - c.sD - 10;
var zD = d.sZ - d.sD - 10;
var radius = this.drawLine (a.sX, a.sY, zA, b.sX, b.sY, zB, this.mad);
radius += this.drawLine (b.sX, b.sY, zB, c.sX, c.sY, zC, this.mad);
radius += this.drawLine (c.sX, c.sY, zC, d.sX, d.sY, zD, this.mad);
if (s == null) return;
var zLabel = Clazz.doubleToInt ((zA + zB + zC + zD) / 4);
radius /= 3;
if (this.m.text == null) {
this.g3d.setC (this.labelColix);
this.drawString (Clazz.doubleToInt ((a.sX + b.sX + c.sX + d.sX) / 4), Clazz.doubleToInt ((a.sY + b.sY + c.sY + d.sY) / 4), zLabel, radius, false, false, false, (this.doJustify ? 0 : 2147483647), s);
} else {
this.atomPt.add2 (a, b);
this.atomPt.add (c);
this.atomPt.add (d);
this.atomPt.scale (0.25);
this.renderLabelOrMeasure (this.m.text, s);
}}, "~S,JU.Point3fi,JU.Point3fi,JU.Point3fi,JU.Point3fi");
Clazz.defineMethod (c$, "renderPendingMeasurement", 
 function () {
try {
this.getPoints ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
(this.shape).mPending = null;
return;
} else {
throw e;
}
}
var renderLabel = (this.m.traceX == -2147483648);
this.g3d.setC (this.labelColix = (renderLabel ? this.vwr.cm.colixRubberband : this.count == 2 ? 20 : 23));
if ((this.m).haveTarget) {
this.renderMeasurement (renderLabel);
return;
}var atomLast = this.p[this.count - 1];
if (this.count > 1) this.renderMeasurement (false);
var lastZ = atomLast.sZ - atomLast.sD - 10;
var x = this.vwr.getCursorX ();
var y = this.vwr.getCursorY ();
if (this.g3d.isAntialiased ()) {
x <<= 1;
y <<= 1;
}this.drawLine (atomLast.sX, atomLast.sY, lastZ, x, y, lastZ, this.mad);
});
Clazz.overrideMethod (c$, "drawLine", 
function (x1, y1, z1, x2, y2, z2, mad) {
var diameter = Clazz.floatToInt (mad >= 20 && this.exportType != 1 ? this.vwr.tm.scaleToScreen (Clazz.doubleToInt ((z1 + z2) / 2), mad) : mad);
if (this.dotsOrDashes && (this.dashDots == null || this.dashDots === J.render.FontLineShapeRenderer.ndots)) this.width = diameter;
return this.drawLine2 (x1, y1, z1, x2, y2, z2, diameter);
}, "~N,~N,~N,~N,~N,~N,~N");
});
