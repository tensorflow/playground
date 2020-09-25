Clazz.declarePackage ("J.render");
Clazz.load (["J.render.FontLineShapeRenderer", "JU.BS", "$.P3", "$.V3"], "J.render.SticksRenderer", ["java.lang.Float", "JU.A4", "$.M3", "J.c.PAL", "JU.C", "$.Edge"], function () {
c$ = Clazz.decorateAsClass (function () {
this.showMultipleBonds = false;
this.multipleBondSpacing = 0;
this.multipleBondRadiusFactor = 0;
this.bondsPerp = false;
this.useBananas = false;
this.modeMultipleBond = 0;
this.isCartesian = false;
this.endcaps = 0;
this.ssbondsBackbone = false;
this.hbondsBackbone = false;
this.bondsBackbone = false;
this.hbondsSolid = false;
this.a = null;
this.b = null;
this.bond = null;
this.xA = 0;
this.yA = 0;
this.zA = 0;
this.xB = 0;
this.yB = 0;
this.zB = 0;
this.dx = 0;
this.dy = 0;
this.mag2d = 0;
this.bondOrder = 0;
this.wireframeOnly = false;
this.isAntialiased = false;
this.slabbing = false;
this.slabByAtom = false;
this.x = null;
this.y = null;
this.z = null;
this.p1 = null;
this.p2 = null;
this.bsForPass2 = null;
this.isPass2 = false;
this.rTheta = 0;
this.xAxis1 = 0;
this.yAxis1 = 0;
this.xAxis2 = 0;
this.yAxis2 = 0;
this.dxStep = 0;
this.dyStep = 0;
this.rot = null;
this.a4 = null;
Clazz.instantialize (this, arguments);
}, J.render, "SticksRenderer", J.render.FontLineShapeRenderer);
Clazz.prepareFields (c$, function () {
this.x =  new JU.V3 ();
this.y =  new JU.V3 ();
this.z =  new JU.V3 ();
this.p1 =  new JU.P3 ();
this.p2 =  new JU.P3 ();
this.bsForPass2 = JU.BS.newN (64);
});
Clazz.overrideMethod (c$, "render", 
function () {
var bonds = this.ms.bo;
if (bonds == null) return false;
this.isPass2 = this.vwr.gdata.isPass2;
if (!this.isPass2) this.bsForPass2.clearAll ();
this.slabbing = this.tm.slabEnabled;
this.slabByAtom = this.vwr.getBoolean (603979939);
this.endcaps = 3;
this.dashDots = (this.vwr.getBoolean (603979893) ? J.render.FontLineShapeRenderer.sixdots : J.render.FontLineShapeRenderer.dashes);
this.isCartesian = (this.exportType == 1);
this.getMultipleBondSettings (false);
this.wireframeOnly = !this.vwr.checkMotionRendering (1677721602);
this.ssbondsBackbone = this.vwr.getBoolean (603979952);
this.hbondsBackbone = this.vwr.getBoolean (603979852);
this.bondsBackbone =  new Boolean (this.hbondsBackbone | this.ssbondsBackbone).valueOf ();
this.hbondsSolid = this.vwr.getBoolean (603979854);
this.isAntialiased = this.g3d.isAntialiased ();
var needTranslucent = false;
if (this.isPass2) {
if (!this.isExport) for (var i = this.bsForPass2.nextSetBit (0); i >= 0; i = this.bsForPass2.nextSetBit (i + 1)) {
this.bond = bonds[i];
this.renderBond ();
}
} else {
for (var i = this.ms.bondCount; --i >= 0; ) {
this.bond = bonds[i];
if ((this.bond.shapeVisibilityFlags & this.myVisibilityFlag) != 0 && this.renderBond ()) {
needTranslucent = true;
this.bsForPass2.set (i);
}}
}return needTranslucent;
});
Clazz.defineMethod (c$, "getMultipleBondSettings", 
 function (isPymol) {
this.useBananas = (this.vwr.getBoolean (603979886) && !isPymol);
this.multipleBondSpacing = (isPymol ? 0.15 : this.vwr.getFloat (570425370));
this.multipleBondRadiusFactor = (isPymol ? 0.4 : this.vwr.getFloat (570425369));
this.bondsPerp = (this.useBananas || this.multipleBondSpacing > 0 && this.multipleBondRadiusFactor < 0);
if (this.useBananas) this.multipleBondSpacing = (this.multipleBondSpacing < 0 ? -this.multipleBondSpacing * 0.4 : this.multipleBondSpacing);
this.multipleBondRadiusFactor = Math.abs (this.multipleBondRadiusFactor);
if (this.multipleBondSpacing == 0 && this.isCartesian) this.multipleBondSpacing = 0.2;
this.modeMultipleBond = this.vwr.g.modeMultipleBond;
this.showMultipleBonds = (this.multipleBondSpacing != 0 && this.modeMultipleBond != 0 && this.vwr.getBoolean (603979928));
}, "~B");
Clazz.defineMethod (c$, "renderBond", 
 function () {
var atomA0;
var atomB0;
this.a = atomA0 = this.bond.atom1;
this.b = atomB0 = this.bond.atom2;
var order = this.bond.order & -131073;
if (this.bondsBackbone) {
if (this.ssbondsBackbone && (order & 256) != 0) {
this.a = this.a.group.getLeadAtomOr (this.a);
this.b = this.b.group.getLeadAtomOr (this.b);
} else if (this.hbondsBackbone && JU.Edge.isOrderH (order)) {
this.a = this.a.group.getLeadAtomOr (this.a);
this.b = this.b.group.getLeadAtomOr (this.b);
}}if (!this.isPass2 && (!this.a.isVisible (9) || !this.b.isVisible (9) || !this.g3d.isInDisplayRange (this.a.sX, this.a.sY) || !this.g3d.isInDisplayRange (this.b.sX, this.b.sY))) return false;
if (this.slabbing) {
var ba = this.vwr.gdata.isClippedZ (this.a.sZ);
if (ba && this.vwr.gdata.isClippedZ (this.b.sZ) || this.slabByAtom && (ba || this.vwr.gdata.isClippedZ (this.b.sZ))) return false;
}this.zA = this.a.sZ;
this.zB = this.b.sZ;
if (this.zA == 1 || this.zB == 1) return false;
this.colixA = atomA0.colixAtom;
this.colixB = atomB0.colixAtom;
if (((this.colix = this.bond.colix) & -30721) == 2) {
this.colix = (this.colix & 30720);
this.colixA = JU.C.getColixInherited ((this.colix | this.vwr.cm.getColixAtomPalette (atomA0, J.c.PAL.CPK.id)), this.colixA);
this.colixB = JU.C.getColixInherited ((this.colix | this.vwr.cm.getColixAtomPalette (atomB0, J.c.PAL.CPK.id)), this.colixB);
} else {
this.colixA = JU.C.getColixInherited (this.colix, this.colixA);
this.colixB = JU.C.getColixInherited (this.colix, this.colixB);
}var needTranslucent = false;
if (!this.isExport && !this.isPass2) {
var doA = !JU.C.renderPass2 (this.colixA);
var doB = !JU.C.renderPass2 (this.colixB);
if (!doA || !doB) {
if (!doA && !doB && !needTranslucent) {
this.g3d.setC (!doA ? this.colixA : this.colixB);
return true;
}needTranslucent = true;
}}this.bondOrder = order & -131073;
if ((this.bondOrder & 224) == 0) {
if ((this.bondOrder & 256) != 0) this.bondOrder &= -257;
if ((this.bondOrder & 1023) != 0) {
if (!this.showMultipleBonds || (this.modeMultipleBond == 2 && this.mad > 500) || (this.bondOrder & 98304) == 65536) {
this.bondOrder = 1;
}}}var mask = 0;
switch (this.bondOrder) {
case 1025:
case 1041:
this.bondOrder = 1;
case 1:
case 2:
case 3:
case 4:
case 5:
case 6:
break;
case 17:
case 513:
this.bondOrder = 1;
mask = (order == 513 ? 0 : 1);
break;
case 515:
case 514:
this.bondOrder = 2;
mask = (order == 515 ? this.getAromaticDottedBondMask () : 0);
break;
default:
if ((this.bondOrder & 224) != 0) {
this.bondOrder = JU.Edge.getPartialBondOrder (order);
mask = JU.Edge.getPartialBondDotted (order);
} else if (JU.Edge.isOrderH (this.bondOrder)) {
this.bondOrder = 1;
if (!this.hbondsSolid) mask = -1;
} else if (this.bondOrder == 32768) {
this.bondOrder = 1;
} else if ((this.bondOrder & 98304) == 98304) {
this.getMultipleBondSettings (true);
this.bondOrder &= 3;
mask = -2;
}}
this.xA = this.a.sX;
this.yA = this.a.sY;
this.xB = this.b.sX;
this.yB = this.b.sY;
this.mad = this.bond.mad;
if (this.multipleBondRadiusFactor > 0 && this.bondOrder > 1) this.mad *= this.multipleBondRadiusFactor;
this.dx = this.xB - this.xA;
this.dy = this.yB - this.yA;
this.width = Clazz.floatToInt (this.vwr.tm.scaleToScreen (Clazz.doubleToInt ((this.zA + this.zB) / 2), this.mad));
if (this.wireframeOnly && this.width > 0) this.width = 1;
if (!this.isCartesian) {
this.asLineOnly = (this.width <= 1);
if (this.asLineOnly && (this.isAntialiased)) {
this.width = 3;
this.asLineOnly = false;
}}switch (mask) {
case -2:
this.drawBond (0);
this.getMultipleBondSettings (false);
break;
case -1:
this.drawDashed (this.xA, this.yA, this.zA, this.xB, this.yB, this.zB, J.render.FontLineShapeRenderer.hDashes);
break;
default:
switch (this.bondOrder) {
case 4:
{
this.bondOrder = 2;
var f = this.multipleBondRadiusFactor;
if (f == 0 && this.width > 1) this.width = Clazz.doubleToInt (this.width * 0.5);
var m = this.multipleBondSpacing;
if (m < 0) this.multipleBondSpacing = 0.30;
this.drawBond (mask);
this.bondsPerp = !this.bondsPerp;
this.bondOrder = 2;
this.drawBond (mask >> 2);
this.bondsPerp = !this.bondsPerp;
this.multipleBondSpacing = m;
}break;
case 5:
{
this.bondOrder = 3;
var f = this.multipleBondRadiusFactor;
if (f == 0 && this.width > 1) this.width = Clazz.doubleToInt (this.width * 0.5);
var m = this.multipleBondSpacing;
if (m < 0) this.multipleBondSpacing = 0.20;
this.drawBond (mask);
this.bondsPerp = !this.bondsPerp;
this.bondOrder = 2;
this.multipleBondSpacing *= 1.5;
this.drawBond (mask >> 3);
this.bondsPerp = !this.bondsPerp;
this.multipleBondSpacing = m;
}break;
case 6:
{
this.bondOrder = 4;
var f = this.multipleBondRadiusFactor;
if (f == 0 && this.width > 1) this.width = Clazz.doubleToInt (this.width * 0.5);
var m = this.multipleBondSpacing;
if (m < 0) this.multipleBondSpacing = 0.15;
this.drawBond (mask);
this.bondsPerp = !this.bondsPerp;
this.bondOrder = 2;
this.multipleBondSpacing *= 1.5;
this.drawBond (mask >> 4);
this.bondsPerp = !this.bondsPerp;
this.multipleBondSpacing = m;
}break;
default:
this.drawBond (mask);
}
break;
}
return needTranslucent;
});
Clazz.defineMethod (c$, "drawBond", 
 function (dottedMask) {
var isDashed = (dottedMask & 1) != 0;
if (this.isCartesian && this.bondOrder == 1 && !isDashed) {
this.g3d.drawBond (this.a, this.b, this.colixA, this.colixB, this.endcaps, this.mad, -1);
return;
}var isEndOn = (this.dx == 0 && this.dy == 0);
if (isEndOn && this.asLineOnly && !this.isCartesian) return;
var doFixedSpacing = (this.bondOrder > 1 && this.multipleBondSpacing > 0);
var isPiBonded = doFixedSpacing && (this.vwr.getHybridizationAndAxes (this.a.i, this.z, this.x, "pz") != null || this.vwr.getHybridizationAndAxes (this.b.i, this.z, this.x, "pz") != null) && !Float.isNaN (this.x.x);
if (isEndOn && !doFixedSpacing) {
var space = Clazz.doubleToInt (this.width / 8) + 3;
var step = this.width + space;
var y = this.yA - Clazz.doubleToInt ((this.bondOrder - 1) * step / 2);
do {
this.fillCylinder (this.colixA, this.colixB, this.endcaps, this.width, this.xA, y, this.zA, this.xB, y, this.zB);
y += step;
} while (--this.bondOrder > 0);
return;
}if (this.bondOrder == 1) {
if (isDashed) this.drawDashed (this.xA, this.yA, this.zA, this.xB, this.yB, this.zB, this.dashDots);
 else this.fillCylinder (this.colixA, this.colixB, this.endcaps, this.width, this.xA, this.yA, this.zA, this.xB, this.yB, this.zB);
return;
}if (doFixedSpacing) {
if (!isPiBonded) this.z.setT (JU.P3.getUnlikely ());
this.x.sub2 (this.b, this.a);
this.y.cross (this.x, this.z);
this.y.normalize ();
if (Float.isNaN (this.y.x)) {
this.z.setT (JU.P3.getUnlikely ());
this.y.cross (this.x, this.z);
this.y.cross (this.y, this.x);
this.y.normalize ();
}if (this.bondsPerp) this.y.cross (this.y, this.x);
this.y.scale (this.multipleBondSpacing);
this.x.setT (this.y);
this.x.scale ((this.bondOrder - 1) / 2);
if (this.useBananas) {
this.drawBanana (this.a, this.b, this.x, 0);
switch (this.bondOrder) {
case 4:
this.drawBanana (this.a, this.b, this.x, 90);
this.drawBanana (this.a, this.b, this.x, -90);
case 2:
default:
this.drawBanana (this.a, this.b, this.x, 180);
break;
case 3:
this.drawBanana (this.a, this.b, this.x, 120);
this.drawBanana (this.a, this.b, this.x, -120);
break;
}
return;
}this.p1.sub2 (this.a, this.x);
this.p2.sub2 (this.b, this.x);
while (true) {
if (this.isCartesian) {
this.g3d.drawBond (this.p1, this.p2, this.colixA, this.colixB, this.endcaps, this.mad, -2);
} else {
this.tm.transformPtScr (this.p1, this.s1);
this.tm.transformPtScr (this.p2, this.s2);
if (isDashed) this.drawDashed (this.s1.x, this.s1.y, this.s1.z, this.s2.x, this.s2.y, this.s2.z, this.dashDots);
 else this.fillCylinder (this.colixA, this.colixB, this.endcaps, this.width, this.s1.x, this.s1.y, this.s1.z, this.s2.x, this.s2.y, this.s2.z);
}dottedMask >>= 1;
isDashed = (dottedMask & 1) != 0;
if (--this.bondOrder <= 0) break;
this.p1.add (this.y);
this.p2.add (this.y);
this.stepAxisCoordinates ();
}
return;
}var dxB = this.dx * this.dx;
var dyB = this.dy * this.dy;
this.mag2d = Math.round (Math.sqrt (dxB + dyB));
this.resetAxisCoordinates ();
if (this.isCartesian && this.bondOrder == 3) {
this.fillCylinder (this.colixA, this.colixB, this.endcaps, this.width, this.xAxis1, this.yAxis1, this.zA, this.xAxis2, this.yAxis2, this.zB);
this.stepAxisCoordinates ();
this.x.sub2 (this.b, this.a);
this.x.scale (0.05);
this.p1.sub2 (this.a, this.x);
this.p2.add2 (this.b, this.x);
this.g3d.drawBond (this.p1, this.p2, this.colixA, this.colixB, this.endcaps, this.mad, -2);
this.stepAxisCoordinates ();
this.fillCylinder (this.colixA, this.colixB, this.endcaps, this.width, this.xAxis1, this.yAxis1, this.zA, this.xAxis2, this.yAxis2, this.zB);
return;
}while (true) {
if ((dottedMask & 1) != 0) this.drawDashed (this.xAxis1, this.yAxis1, this.zA, this.xAxis2, this.yAxis2, this.zB, this.dashDots);
 else this.fillCylinder (this.colixA, this.colixB, this.endcaps, this.width, this.xAxis1, this.yAxis1, this.zA, this.xAxis2, this.yAxis2, this.zB);
dottedMask >>= 1;
if (--this.bondOrder <= 0) break;
this.stepAxisCoordinates ();
}
}, "~N");
Clazz.defineMethod (c$, "resetAxisCoordinates", 
 function () {
var space = this.mag2d >> 3;
if (this.multipleBondSpacing != -1 && this.multipleBondSpacing < 0) space *= -this.multipleBondSpacing;
var step = this.width + space;
this.dxStep = Clazz.doubleToInt (step * this.dy / this.mag2d);
this.dyStep = Clazz.doubleToInt (step * -this.dx / this.mag2d);
this.xAxis1 = this.xA;
this.yAxis1 = this.yA;
this.xAxis2 = this.xB;
this.yAxis2 = this.yB;
var f = (this.bondOrder - 1);
this.xAxis1 -= Clazz.doubleToInt (this.dxStep * f / 2);
this.yAxis1 -= Clazz.doubleToInt (this.dyStep * f / 2);
this.xAxis2 -= Clazz.doubleToInt (this.dxStep * f / 2);
this.yAxis2 -= Clazz.doubleToInt (this.dyStep * f / 2);
});
Clazz.defineMethod (c$, "stepAxisCoordinates", 
 function () {
this.xAxis1 += this.dxStep;
this.yAxis1 += this.dyStep;
this.xAxis2 += this.dxStep;
this.yAxis2 += this.dyStep;
});
Clazz.defineMethod (c$, "getAromaticDottedBondMask", 
 function () {
var atomC = this.b.findAromaticNeighbor (this.a.i);
if (atomC == null) return 1;
var dxAC = atomC.sX - this.xA;
var dyAC = atomC.sY - this.yA;
return ((this.dx * dyAC - this.dy * dxAC) < 0 ? 2 : 1);
});
Clazz.defineMethod (c$, "drawBanana", 
 function (a, b, x, deg) {
this.g3d.addRenderer (553648145);
this.vectorT.sub2 (b, a);
if (this.rot == null) {
this.rot =  new JU.M3 ();
this.a4 =  new JU.A4 ();
}this.a4.setVA (this.vectorT, (deg * 3.141592653589793 / 180));
this.rot.setAA (this.a4);
this.pointT.setT (a);
this.pointT3.setT (b);
this.pointT2.ave (a, b);
this.rot.rotate2 (x, this.vectorT);
this.pointT2.add (this.vectorT);
this.tm.transformPtScrT3 (a, this.pointT);
this.tm.transformPtScrT3 (this.pointT2, this.pointT2);
this.tm.transformPtScrT3 (b, this.pointT3);
var w = Math.max (this.width, 1);
this.g3d.setC (this.colixA);
this.g3d.fillHermite (5, w, w, w, this.pointT, this.pointT, this.pointT2, this.pointT3);
this.g3d.setC (this.colixB);
this.g3d.fillHermite (5, w, w, w, this.pointT, this.pointT2, this.pointT3, this.pointT3);
}, "JM.Atom,JM.Atom,JU.V3,~N");
});
