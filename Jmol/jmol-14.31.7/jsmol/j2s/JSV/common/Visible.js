Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.api.VisibleInterface"], "JSV.common.Visible", ["JU.CU"], function () {
c$ = Clazz.declareType (JSV.common, "Visible", null, JSV.api.VisibleInterface);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "getColour", 
function (spec, useFitted) {
var xyCoords = spec.getXYCoords ();
var isAbsorbance = spec.isAbsorbance ();
var xyzd =  Clazz.newDoubleArray (4, 0);
JSV.common.Visible.getXYZfitted (xyCoords, isAbsorbance, xyzd);
xyzd[0] /= xyzd[3];
xyzd[1] /= xyzd[3];
xyzd[2] /= xyzd[3];
var rgb =  Clazz.newDoubleArray (-1, [xyzd[0] * 3.2410 + xyzd[1] * -1.5374 + xyzd[2] * -0.4986, xyzd[0] * -0.9692 + xyzd[1] * 1.8760 + xyzd[2] * 0.0416, xyzd[0] * 0.0556 + xyzd[1] * -0.204 + xyzd[2] * 1.0570]);
var gamma = 2.4;
for (var i = 0; i < 3; i++) rgb[i] = (rgb[i] > 0.00304 ? 1.055 * Math.pow (rgb[i], 1 / gamma) - 0.055 : 12.92 * rgb[i]);

var c = JU.CU.rgb (JSV.common.Visible.fix (rgb[0]), JSV.common.Visible.fix (rgb[1]), JSV.common.Visible.fix (rgb[2]));
return c;
}, "JSV.common.Spectrum,~B");
c$.fix = Clazz.defineMethod (c$, "fix", 
 function (d) {
return (d <= 0 ? 0 : d >= 1 ? 255 : Math.round (255 * d));
}, "~N");
c$.getXYZfitted = Clazz.defineMethod (c$, "getXYZfitted", 
 function (xyCoords, isAbsorbance, xyzd) {
var cie;
var xb;
var yb;
var zb;
for (var i = xyCoords.length; --i >= 0; ) {
var x = xyCoords[i].getXVal ();
if (x < 400 || x > 700) continue;
cie = JSV.common.Visible.gauss (85.7145, 2.05719E-5, x - 607.263) + JSV.common.Visible.gauss (57.7256, 0.000126451, x - 457.096);
xb = JSV.common.Visible.gauss (1.06561, 0.000500819, x - 598.623) + JSV.common.Visible.gauss (0.283831, 0.00292745, x - 435.734) + JSV.common.Visible.gauss (0.113771, 0.00192849, x - 549.271) + JSV.common.Visible.gauss (0.239103, 0.00255944, x - 460.547);
yb = JSV.common.Visible.gauss (0.239617, 0.00117296, x - 530.517) + JSV.common.Visible.gauss (0.910377, 0.000300984, x - 565.635) + JSV.common.Visible.gauss (0.0311013, 0.00152386, x - 463.833);
zb = JSV.common.Visible.gauss (0.988366, 0.00220336, x - 456.345) + JSV.common.Visible.gauss (0.381551, 0.000848554, x - 450.871) + JSV.common.Visible.gauss (0.355693, 0.000628546, x - 470.668) + JSV.common.Visible.gauss (0.81862, 0.00471059, x - 433.144);
var y = xyCoords[i].getYVal ();
if (isAbsorbance) y = Math.pow (10, -Math.max (y, 0));
xyzd[0] += y * xb * cie;
xyzd[1] += y * yb * cie;
xyzd[2] += y * zb * cie;
xyzd[3] += yb * cie;
}
}, "~A,~B,~A");
c$.gauss = Clazz.defineMethod (c$, "gauss", 
 function (a, b, x) {
return a * Math.exp (-b * x * x);
}, "~N,~N,~N");
});
