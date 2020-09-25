Clazz.declarePackage ("J.jvxl.calc");
Clazz.load (["JU.P3", "java.util.Hashtable"], "J.jvxl.calc.MarchingSquares", ["java.lang.Float", "JU.AU", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.surfaceReader = null;
this.volumeData = null;
this.nContourSegments = 0;
this.contourType = 0;
this.thisContour = 0;
this.valueMin = 0;
this.valueMax = 0;
this.pointA = null;
this.pointB = null;
this.contourFromZero = true;
this.contoursDiscrete = null;
this.contourVertexCount = 0;
this.contourVertexes = null;
if (!Clazz.isClassDefined ("J.jvxl.calc.MarchingSquares.ContourVertex")) {
J.jvxl.calc.MarchingSquares.$MarchingSquares$ContourVertex$ ();
}
this.contourPlaneMinimumValue = 0;
this.contourPlaneMaximumValue = 0;
this.contourValuesUsed = null;
this.ptTemp = null;
this.triangleCount = 0;
this.triangles = null;
this.htPts = null;
if (!Clazz.isClassDefined ("J.jvxl.calc.MarchingSquares.Triangle")) {
J.jvxl.calc.MarchingSquares.$MarchingSquares$Triangle$ ();
}
Clazz.instantialize (this, arguments);
}, J.jvxl.calc, "MarchingSquares");
Clazz.prepareFields (c$, function () {
this.pointA =  new JU.P3 ();
this.pointB =  new JU.P3 ();
this.contourVertexes =  new Array (1000);
this.ptTemp =  new JU.P3 ();
this.triangles =  new Array (1000);
this.htPts =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (surfaceReader, volumeData, thePlane, contoursDiscrete, nContours, thisContour, contourFromZero) {
this.surfaceReader = surfaceReader;
this.volumeData = volumeData;
this.thisContour = thisContour;
this.contoursDiscrete = contoursDiscrete;
this.contourFromZero = contourFromZero;
if (contoursDiscrete == null) {
var i = 0;
this.nContourSegments = (nContours == 0 ? 9 : nContours) + i;
if (this.nContourSegments > 100) this.nContourSegments = 100;
} else {
nContours = contoursDiscrete.length;
this.nContourSegments = nContours;
this.contourFromZero = false;
}}, "J.jvxl.api.VertexDataServer,J.jvxl.data.VolumeData,JU.P4,~A,~N,~N,~B");
Clazz.defineMethod (c$, "setMinMax", 
function (valueMin, valueMax) {
this.valueMin = valueMin;
this.valueMax = valueMax;
}, "~N,~N");
Clazz.defineMethod (c$, "addContourVertex", 
function (vertexXYZ, value) {
if (this.contourVertexCount == this.contourVertexes.length) this.contourVertexes = JU.AU.doubleLength (this.contourVertexes);
var vPt = this.surfaceReader.addVertexCopy (vertexXYZ, value, -2, true);
this.contourVertexes[this.contourVertexCount++] = Clazz.innerTypeInstance (J.jvxl.calc.MarchingSquares.ContourVertex, this, null, vertexXYZ);
return vPt;
}, "JU.P3,~N");
Clazz.defineMethod (c$, "setContourData", 
function (i, value) {
this.contourVertexes[i].setValue (value);
}, "~N,~N");
Clazz.defineMethod (c$, "calcContourPoint", 
function (cutoff, valueA, valueB, pt) {
return this.volumeData.calculateFractionalPoint (cutoff, this.pointA, this.pointB, valueA, valueB, pt);
}, "~N,~N,~N,JU.P3");
Clazz.defineMethod (c$, "addTriangle", 
function (iA, iB, iC, check, iContour) {
if (this.triangleCount == this.triangles.length) this.triangles = JU.AU.doubleLength (this.triangles);
this.triangles[this.triangleCount++] = Clazz.innerTypeInstance (J.jvxl.calc.MarchingSquares.Triangle, this, null, iA, iB, iC, check, iContour);
return 0;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "generateContourData", 
function (haveData, zeroOffset) {
JU.Logger.info ("generateContours: " + this.nContourSegments + " segments");
this.getVertexValues (haveData);
this.createContours (this.valueMin, this.valueMax, zeroOffset);
this.addAllTriangles ();
return this.contourVertexCount;
}, "~B,~N");
Clazz.defineMethod (c$, "getVertexValues", 
 function (haveData) {
this.contourPlaneMinimumValue = 3.4028235E38;
this.contourPlaneMaximumValue = -3.4028235E38;
for (var i = 0; i < this.contourVertexCount; i++) {
var c = this.contourVertexes[i];
var value;
if (haveData) {
value = c.value;
} else {
value = this.volumeData.lookupInterpolatedVoxelValue (c, false);
c.setValue (value);
}if (value < this.contourPlaneMinimumValue) this.contourPlaneMinimumValue = value;
if (value > this.contourPlaneMaximumValue) this.contourPlaneMaximumValue = value;
}
}, "~B");
Clazz.defineMethod (c$, "createContours", 
 function (min, max, zeroOffset) {
var diff = max - min;
this.contourValuesUsed =  Clazz.newFloatArray (this.nContourSegments, 0);
for (var i = this.triangleCount; --i >= 0; ) this.triangles[i].check = 0;

var minCutoff = -3.4028235E38;
var cutoff = minCutoff;
for (var i = 0; i < this.nContourSegments; i++) {
cutoff = (this.contoursDiscrete != null ? this.contoursDiscrete[i] : this.contourFromZero ? min + (i * 1 / this.nContourSegments) * diff : i == 0 ? -3.4028235E38 : i == this.nContourSegments - 1 ? 3.4028235E38 : min + ((i - 1) * 1 / (this.nContourSegments - 1)) * diff);
if (this.contoursDiscrete == null && Math.abs (cutoff) < zeroOffset) cutoff = (cutoff < 0 ? -zeroOffset : zeroOffset);
this.contourValuesUsed[i] = cutoff;
JU.Logger.info ("#contour " + (i + 1) + " " + cutoff + " " + this.triangleCount);
this.htPts.clear ();
for (var ii = this.triangleCount; --ii >= 0; ) {
if (this.triangles[ii].isValid) this.checkContour (this.triangles[ii], i, cutoff);
}
if (this.thisContour > 0) {
if (i + 1 == this.thisContour) minCutoff = cutoff;
} else {
}}
if (this.contoursDiscrete != null) {
minCutoff = this.contoursDiscrete[0];
}this.valueMin = this.contourValuesUsed[0];
this.valueMax = (this.contourValuesUsed.length == 0 ? this.valueMin : this.contourValuesUsed[this.contourValuesUsed.length - 1]);
return true;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "intercept", 
 function (t, i, value) {
var iA = t.pts[i];
var iB = t.pts[(i + 1) % 3];
if (iA == 2147483647 || iB == 2147483647) return -1;
var key = (iA < iB ? iA + "_" + iB : iB + "_" + iA);
if (this.htPts.containsKey (key)) return this.htPts.get (key).intValue ();
var valueA = this.contourVertexes[iA].value;
var valueB = this.contourVertexes[iB].value;
var iPt = -1;
if (valueA != valueB) {
var f = (value - valueA) / (valueB - valueA);
if (f >= 0 && f <= 1) {
this.pointA.setT (this.contourVertexes[iA]);
this.pointB.setT (this.contourVertexes[iB]);
value = this.calcContourPoint (value, valueA, valueB, this.ptTemp);
if (!Float.isNaN (value)) {
iPt = this.addContourVertex (this.ptTemp, value);
if (iPt < 0) return -1;
this.contourVertexes[iPt].setValue (value);
} else {
}}}this.htPts.put (key, Integer.$valueOf (iPt));
return iPt;
}, "J.jvxl.calc.MarchingSquares.Triangle,~N,~N");
Clazz.defineMethod (c$, "checkContour", 
 function (t, i, value) {
if (this.thisContour > 0 && i + 1 != this.thisContour) return;
var ipt0 = this.intercept (t, 0, value);
var ipt1 = this.intercept (t, 1, value);
var ipt2 = this.intercept (t, 2, value);
var pts = t.pts;
var mode = 0;
if (ipt0 >= 0) {
mode += 1;
}if (ipt1 >= 0) {
mode += 2;
}if (ipt2 >= 0) {
mode += 4;
}switch (mode) {
case 3:
this.addTriangle (pts[0], ipt0, ipt1, 2 | (t.check & 1), i);
this.addTriangle (ipt0, pts[1], ipt1, 4 | (t.check & 3), i);
this.addTriangle (pts[0], ipt1, pts[2], (t.check & 6), i);
break;
case 5:
this.addTriangle (pts[0], ipt0, ipt2, 2 | (t.check & 5), i);
this.addTriangle (ipt0, pts[1], ipt2, 4 | (t.check & 1), i);
this.addTriangle (ipt2, pts[1], pts[2], (t.check & 6), i);
break;
case 6:
this.addTriangle (pts[0], pts[1], ipt2, (t.check & 5), i);
this.addTriangle (ipt2, pts[1], ipt1, 4 | (t.check & 2), i);
this.addTriangle (ipt2, ipt1, pts[2], 1 | (t.check & 6), i);
break;
default:
return;
}
t.isValid = false;
}, "J.jvxl.calc.MarchingSquares.Triangle,~N,~N");
Clazz.defineMethod (c$, "getMinMax", 
function () {
return  Clazz.newFloatArray (-1, [this.valueMin, this.valueMax]);
});
Clazz.defineMethod (c$, "addAllTriangles", 
 function () {
for (var i = 0; i < this.triangleCount; i++) if (this.triangles[i].isValid) {
var t = this.triangles[i];
this.surfaceReader.addTriangleCheck (t.pts[0], t.pts[1], t.pts[2], t.check, t.contourIndex, false, -1);
}
});
c$.$MarchingSquares$ContourVertex$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.value = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.calc.MarchingSquares, "ContourVertex", JU.P3);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, J.jvxl.calc.MarchingSquares.ContourVertex, []);
this.setT (a);
}, "JU.P3");
Clazz.defineMethod (c$, "setValue", 
function (a) {
this.value = a;
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.value + " " + this.x + " " + this.y + " " + this.z;
});
c$ = Clazz.p0p ();
};
c$.$MarchingSquares$Triangle$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pts = null;
this.check = 0;
this.isValid = true;
this.contourIndex = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.calc.MarchingSquares, "Triangle");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
this.pts =  Clazz.newIntArray (-1, [a, b, c]);
this.check = d;
this.contourIndex = e;
}, "~N,~N,~N,~N,~N");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"CONTOUR_POINT", -1,
"VERTEX_POINT", -2,
"EDGE_POINT", -3,
"nContourMax", 100,
"defaultContourCount", 9);
});
