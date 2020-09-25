Clazz.declarePackage ("JSV.common");
Clazz.load (["java.lang.Enum", "JSV.common.MeasurementData", "$.IntegralComparator"], "JSV.common.IntegralData", ["java.lang.Double", "java.util.Collections", "$.StringTokenizer", "JU.AU", "$.BS", "$.DF", "$.Lst", "$.PT", "JSV.common.Annotation", "$.Coordinate", "$.Integral", "$.ScriptToken"], function () {
c$ = Clazz.decorateAsClass (function () {
this.percentMinY = 0;
this.percentOffset = 0;
this.intRange = 0;
this.normalizationFactor = 1;
this.percentRange = 0;
this.offset = 0;
this.integralTotal = 0;
this.haveRegions = false;
this.xyCoords = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "IntegralData", JSV.common.MeasurementData);
Clazz.defineMethod (c$, "getPercentMinimumY", 
function () {
return this.percentMinY;
});
Clazz.defineMethod (c$, "getPercentOffset", 
function () {
return this.percentOffset;
});
Clazz.defineMethod (c$, "getIntegralFactor", 
function () {
return this.intRange;
});
Clazz.makeConstructor (c$, 
function (integralMinY, integralOffset, integralRange, spec) {
Clazz.superConstructor (this, JSV.common.IntegralData, [JSV.common.Annotation.AType.Integration, spec]);
this.percentMinY = integralMinY;
this.percentOffset = integralOffset;
this.percentRange = integralRange;
this.calculateIntegral ();
}, "~N,~N,~N,JSV.common.Spectrum");
Clazz.makeConstructor (c$, 
function (spec, p) {
Clazz.superConstructor (this, JSV.common.IntegralData, [JSV.common.Annotation.AType.Integration, spec]);
if (p == null) {
this.autoIntegrate ();
return;
}this.percentOffset = p.integralOffset;
this.percentRange = p.integralRange;
this.calculateIntegral ();
}, "JSV.common.Spectrum,JSV.common.Parameters");
Clazz.defineMethod (c$, "update", 
function (parameters) {
this.update (parameters.integralMinY, parameters.integralOffset, parameters.integralRange);
}, "JSV.common.Parameters");
Clazz.defineMethod (c$, "update", 
function (integralMinY, integralOffset, integralRange) {
var percentRange0 = this.percentRange;
if (integralRange <= 0 || integralRange == this.percentRange && integralOffset == this.percentOffset) return;
this.percentOffset = integralOffset;
this.percentRange = integralRange;
this.checkRange ();
var intRangeNew = integralRange / 100 / this.integralTotal;
var offsetNew = integralOffset / 100;
for (var i = 0; i < this.xyCoords.length; i++) {
var y = this.xyCoords[i].getYVal ();
y = (y - this.offset) / this.intRange;
this.xyCoords[i].setYVal (y * intRangeNew + offsetNew);
}
if (this.normalizationFactor != 1) this.normalizationFactor *= percentRange0 / integralRange;
if (this.haveRegions) {
for (var i = this.size (); --i >= 0; ) {
var ir = this.get (i);
var y1 = this.getYValueAt (ir.getXVal ());
var y2 = this.getYValueAt (ir.getXVal2 ());
ir.setYVal (y1);
ir.setYVal2 (y2);
ir.setValue (Math.abs (y2 - y1) * 100 * this.normalizationFactor);
}
}this.intRange = intRangeNew;
this.offset = offsetNew;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getYValueAt", 
function (x) {
return JSV.common.Coordinate.getYValueAt (this.xyCoords, x);
}, "~N");
Clazz.defineMethod (c$, "addIntegralRegion", 
function (x1, x2) {
if (Double.isNaN (x1)) {
this.haveRegions = false;
this.clear ();
return null;
}if (Double.isNaN (x2)) {
return this.splitIntegral (x1);
}if (x1 == x2) return null;
if (x1 < x2) {
this.clear (x1, x2);
return null;
}var y1 = this.getYValueAt (x1);
var y2 = this.getYValueAt (x2);
this.haveRegions = true;
var $in =  new JSV.common.Integral ().setInt (x1, y1, this.spec, Math.abs (y2 - y1) * 100 * this.normalizationFactor, x2, y2);
this.clear (x1, x2);
this.addLast ($in);
java.util.Collections.sort (this, JSV.common.IntegralData.c);
return $in;
}, "~N,~N");
Clazz.defineMethod (c$, "splitIntegral", 
 function (x) {
var i = this.find (x);
if (i < 0) return null;
var integral = this.removeItemAt (i);
var x0 = integral.getXVal ();
var x2 = integral.getXVal2 ();
this.addIntegralRegion (x0, x);
return this.addIntegralRegion (x, x2);
}, "~N");
Clazz.overrideMethod (c$, "setSpecShift", 
function (dx) {
JSV.common.Coordinate.shiftX (this.xyCoords, dx);
for (var i = this.size (); --i >= 1; ) {
this.get (i).addSpecShift (dx);
}
}, "~N");
Clazz.defineMethod (c$, "addMarks", 
function (ppms) {
ppms = JU.PT.rep (" " + ppms, ",", " ");
ppms = JU.PT.rep (ppms, " -", " #");
ppms = JU.PT.rep (ppms, "--", "-#");
ppms = ppms.$replace ('-', '^');
ppms = ppms.$replace ('#', '-');
var tokens = JSV.common.ScriptToken.getTokens (ppms);
for (var i = 0; i < tokens.size (); i++) {
try {
var s = tokens.get (i);
var norm = 0;
var pt = s.indexOf ('^');
if (pt < 0) continue;
var pt2 = s.indexOf (':');
if (pt2 > pt) {
norm = Double.$valueOf (s.substring (pt2 + 1).trim ()).doubleValue ();
s = s.substring (0, pt2).trim ();
}var x2 = Double.$valueOf (s.substring (0, pt).trim ()).doubleValue ();
var x1 = Double.$valueOf (s.substring (pt + 1).trim ()).doubleValue ();
if (x1 == 0 && x2 == 0) this.clear ();
if (x1 == x2) continue;
var m = this.addIntegralRegion (Math.max (x1, x2), Math.min (x1, x2));
if (m != null && norm > 0) this.setSelectedIntegral (m, norm);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
continue;
} else {
throw e;
}
}
}
}, "~S");
Clazz.defineMethod (c$, "calculateIntegral", 
function () {
var specXyCoords = this.spec.getXYCoords ();
this.xyCoords =  new Array (specXyCoords.length);
this.integralTotal = 0;
this.checkRange ();
var minY = 1E100;
for (var i = 0; i < specXyCoords.length; i++) {
var y = specXyCoords[i].getYVal ();
if (y < minY && y >= 0) minY = y;
}
var minI = 1E100;
var maxI = -1.0E100;
for (var i = 0; i < specXyCoords.length; i++) {
var y = specXyCoords[i].getYVal ();
this.integralTotal += (y - minY);
if (this.integralTotal < minI) minI = this.integralTotal;
if (this.integralTotal > maxI) maxI = this.integralTotal;
}
this.integralTotal = maxI - minI;
this.intRange = (this.percentRange / 100) / this.integralTotal;
this.offset = (this.percentOffset / 100);
var integral = 0;
for (var i = specXyCoords.length; --i >= 0; ) {
var y = specXyCoords[i].getYVal ();
integral += (y - minY);
this.xyCoords[i] =  new JSV.common.Coordinate ().set (specXyCoords[i].getXVal (), integral * this.intRange + this.offset);
}
return this.xyCoords;
});
Clazz.defineMethod (c$, "checkRange", 
 function () {
this.percentOffset = Math.max (5, this.percentOffset);
this.percentRange = Math.max (10, this.percentRange);
});
c$.getIntegrationRatiosFromString = Clazz.defineMethod (c$, "getIntegrationRatiosFromString", 
function (spec, key_values) {
var ratios =  new JU.Lst ();
var allParamTokens =  new java.util.StringTokenizer (key_values, ",");
while (allParamTokens.hasMoreTokens ()) {
var token = allParamTokens.nextToken ();
var eachParam =  new java.util.StringTokenizer (token, ":");
var ratio =  new JSV.common.Annotation ().setA (Double.parseDouble (eachParam.nextToken ()), 0.0, spec, eachParam.nextToken (), true, false, 0, 0);
ratios.addLast (ratio);
}
return ratios;
}, "JSV.common.Spectrum,~S");
Clazz.defineMethod (c$, "getXYCoords", 
function () {
return this.xyCoords;
});
Clazz.defineMethod (c$, "getPercentYValueAt", 
function (x) {
return this.getYValueAt (x) * 100;
}, "~N");
Clazz.defineMethod (c$, "dispose", 
function () {
this.spec = null;
this.xyCoords = null;
});
Clazz.defineMethod (c$, "setSelectedIntegral", 
function (integral, val) {
var val0 = integral.getValue ();
var factor = (val <= 0 ? 1 / this.normalizationFactor : val / val0);
this.factorAllIntegrals (factor, val <= 0);
}, "JSV.common.Measurement,~N");
Clazz.defineMethod (c$, "factorAllIntegrals", 
 function (factor, isReset) {
for (var i = 0; i < this.size (); i++) {
var m = this.get (i);
m.setValue (factor * m.getValue ());
}
this.normalizationFactor = (isReset ? 1 : this.normalizationFactor * factor);
}, "~N,~B");
Clazz.defineMethod (c$, "remove", 
function (i) {
return this.removeItemAt (i);
}, "~N");
Clazz.defineMethod (c$, "getBitSet", 
function () {
var bs = JU.BS.newN (this.xyCoords.length);
if (this.size () == 0) {
bs.setBits (0, this.xyCoords.length);
return bs;
}for (var i = this.size (); --i >= 0; ) {
var m = this.get (i);
var x1 = JSV.common.Coordinate.getNearestIndexForX (this.xyCoords, m.getXVal ());
var x2 = JSV.common.Coordinate.getNearestIndexForX (this.xyCoords, m.getXVal2 ());
bs.setBits (Math.min (x1, x2), Math.max (x1, x2));
}
return bs;
});
Clazz.overrideMethod (c$, "getMeasurementListArray", 
function (units) {
var data =  new Array (this.size ());
for (var pt = 0, i = this.size (); --i >= 0; ) data[pt++] =  Clazz.newArray (-1, ["" + pt, JU.DF.formatDecimalDbl (this.get (i).getXVal (), 2), JU.DF.formatDecimalDbl (this.get (i).getXVal2 (), 2), this.get (i).text]);

return data;
}, "~S");
Clazz.overrideMethod (c$, "getMeasurementListArrayReal", 
function (units) {
var data = JU.AU.newDouble2 (this.size ());
for (var pt = 0, i = this.size (); --i >= 0; pt++) data[pt] =  Clazz.newDoubleArray (-1, [this.get (i).getXVal (), this.get (i).getXVal2 (), this.get (i).getValue ()]);

return data;
}, "~S");
Clazz.overrideMethod (c$, "getDataHeader", 
function () {
return JSV.common.IntegralData.$HEADER;
});
Clazz.defineMethod (c$, "shiftY", 
function (yOld, yNew, yPixel0, yPixels) {
var pt = Clazz.doubleToInt (100.0 * (yPixel0 + yPixels - yNew) / yPixels);
if (yOld < 0) pt -= this.percentOffset;
if (yOld < 0) {
this.update (0, this.percentOffset, pt);
} else {
this.update (0, pt, this.percentRange);
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "autoIntegrate", 
function () {
if (this.xyCoords == null) this.calculateIntegral ();
if (this.xyCoords.length == 0) return;
this.clear ();
var iStart = -1;
var cutoff = 0.0001;
var nCount = 0;
var nMin = 20;
var y0 = this.xyCoords[this.xyCoords.length - 1].getYVal ();
for (var i = this.xyCoords.length - 1; --i >= 0; ) {
var y = this.xyCoords[i].getYVal ();
nCount++;
if ((y - y0) < cutoff && iStart < 0) {
if (y < y0) {
y0 = y;
nCount = 0;
}continue;
}if (iStart < 0) {
iStart = i + Math.min (nCount, nMin);
y0 = y;
nCount = 0;
continue;
}if ((y - y0) < cutoff) {
if (nCount == 1) y0 = y;
if (nCount >= nMin) {
this.addIntegralRegion (this.xyCoords[iStart].getXVal (), this.xyCoords[i].getXVal ());
iStart = -1;
y0 = y;
nCount = 0;
}} else {
nCount = 0;
y0 = y;
}}
if (this.spec.nH > 0) this.factorAllIntegrals (this.spec.nH / this.percentRange, false);
});
Clazz.defineMethod (c$, "getInfo", 
function (info) {
info.put ("offset", Double.$valueOf (this.myParams.integralOffset));
info.put ("range", Double.$valueOf (this.myParams.integralRange));
info.put ("normalizationFactor", Double.$valueOf (this.normalizationFactor));
info.put ("integralTotal", Double.$valueOf (this.integralTotal));
Clazz.superCall (this, JSV.common.IntegralData, "getInfo", [info]);
}, "java.util.Map");
Clazz.defineMethod (c$, "setMinimumIntegral", 
function (val) {
for (var i = this.size (); --i >= 0; ) if (this.get (i).getValue () < val) this.removeItemAt (i);

}, "~N");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (JSV.common.IntegralData, "IntMode", Enum);
c$.getMode = Clazz.defineMethod (c$, "getMode", 
function (a) {
for (var mode, $mode = 0, $$mode = JSV.common.IntegralData.IntMode.values (); $mode < $$mode.length && ((mode = $$mode[$mode]) || true); $mode++) if (a.startsWith (mode.name ())) return mode;

return JSV.common.IntegralData.IntMode.NA;
}, "~S");
Clazz.defineEnumConstant (c$, "OFF", 0, []);
Clazz.defineEnumConstant (c$, "ON", 1, []);
Clazz.defineEnumConstant (c$, "TOGGLE", 2, []);
Clazz.defineEnumConstant (c$, "AUTO", 3, []);
Clazz.defineEnumConstant (c$, "LIST", 4, []);
Clazz.defineEnumConstant (c$, "MARK", 5, []);
Clazz.defineEnumConstant (c$, "MIN", 6, []);
Clazz.defineEnumConstant (c$, "UPDATE", 7, []);
Clazz.defineEnumConstant (c$, "CLEAR", 8, []);
Clazz.defineEnumConstant (c$, "NA", 9, []);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"DEFAULT_OFFSET", 30,
"DEFAULT_RANGE", 50,
"DEFAULT_MINY", 0.1);
c$.c = c$.prototype.c =  new JSV.common.IntegralComparator ();
c$.$HEADER = c$.prototype.$HEADER =  Clazz.newArray (-1, ["peak", "start/ppm", "end/ppm", "value"]);
});
