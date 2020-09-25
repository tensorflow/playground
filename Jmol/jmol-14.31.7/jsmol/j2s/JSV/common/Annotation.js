Clazz.declarePackage ("JSV.common");
Clazz.load (["java.lang.Enum", "JSV.common.Coordinate"], "JSV.common.Annotation", ["java.lang.Double", "JU.CU"], function () {
c$ = Clazz.decorateAsClass (function () {
this.text = "";
this.$isPixels = false;
this.is2D = false;
this.offsetX = 0;
this.offsetY = 0;
this.spec = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "Annotation", JSV.common.Coordinate);
Clazz.defineMethod (c$, "setA", 
function (x, y, spec, text, isPixels, is2D, offsetX, offsetY) {
this.set (x, y);
this.spec = spec;
this.text = text;
this.$isPixels = isPixels;
this.is2D = is2D;
this.offsetX = offsetX;
this.offsetY = offsetY;
return this;
}, "~N,~N,JSV.common.Spectrum,~S,~B,~B,~N,~N");
Clazz.defineMethod (c$, "setSpec", 
function (spec) {
this.spec = spec;
return this;
}, "JSV.common.Spectrum");
Clazz.defineMethod (c$, "addSpecShift", 
function (dx) {
this.setXVal (this.getXVal () + dx);
}, "~N");
Clazz.defineMethod (c$, "isPixels", 
function () {
return this.$isPixels;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "[" + this.getXVal () + ", " + this.getYVal () + "," + this.text + "]";
});
c$.getColoredAnnotation = Clazz.defineMethod (c$, "getColoredAnnotation", 
function (g2d, spec, args, lastAnnotation) {
var arg;
var xPt = 0;
var yPt = 1;
var colorPt = 2;
var textPt = 3;
var nArgs = args.size ();
try {
switch (nArgs) {
default:
return null;
case 1:
arg = args.get (0);
xPt = yPt = -1;
if (arg.charAt (0) == '\"') {
textPt = 0;
colorPt = -1;
} else {
colorPt = 0;
textPt = -1;
}break;
case 2:
xPt = yPt = -1;
arg = args.get (0);
if (arg.charAt (0) == '\"') {
textPt = 0;
colorPt = 1;
} else {
colorPt = 0;
textPt = 1;
}break;
case 3:
case 4:
arg = args.get (2);
if (arg.charAt (0) == '\"') {
textPt = 2;
colorPt = (nArgs == 4 ? 3 : -1);
} else {
colorPt = 2;
textPt = (nArgs == 4 ? 3 : -1);
}arg = args.get (2);
if (arg.charAt (0) == '\"') {
textPt = 2;
colorPt = -1;
} else {
colorPt = 2;
textPt = -1;
}}
if (lastAnnotation == null && (xPt < 0 || yPt < 0 || textPt < 0 || colorPt < 0)) return null;
var x = (xPt < 0 ? lastAnnotation.getXVal () : Double.$valueOf (args.get (xPt)).doubleValue ());
var y = (yPt < 0 ? lastAnnotation.getYVal () : Double.$valueOf (args.get (yPt)).doubleValue ());
var color = (colorPt < 0 ? (lastAnnotation).getColor () : g2d.getColor1 (JU.CU.getArgbFromString (args.get (colorPt))));
var text;
if (textPt < 0) {
text = lastAnnotation.text;
} else {
text = args.get (textPt);
if (text.charAt (0) == '\"') text = text.substring (1, text.length - 1);
}return  new JSV.common.ColoredAnnotation ().setCA (x, y, spec, text, color, false, false, 0, 0);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "J.api.GenericGraphics,JSV.common.Spectrum,JU.Lst,JSV.common.Annotation");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (JSV.common.Annotation, "AType", Enum);
Clazz.defineEnumConstant (c$, "Integration", 0, []);
Clazz.defineEnumConstant (c$, "PeakList", 1, []);
Clazz.defineEnumConstant (c$, "Measurements", 2, []);
Clazz.defineEnumConstant (c$, "OverlayLegend", 3, []);
Clazz.defineEnumConstant (c$, "Views", 4, []);
Clazz.defineEnumConstant (c$, "NONE", 5, []);
c$ = Clazz.p0p ();
});
