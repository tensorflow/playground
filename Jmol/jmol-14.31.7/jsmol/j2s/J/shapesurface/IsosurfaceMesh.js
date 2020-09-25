Clazz.declarePackage ("J.shapesurface");
Clazz.load (["J.shape.Mesh"], "J.shapesurface.IsosurfaceMesh", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.CU", "$.Lst", "$.M4", "$.P3", "$.P3i", "$.PT", "$.SB", "$.V3", "J.api.Interface", "J.jvxl.data.JvxlCoder", "$.JvxlData", "JS.T", "JU.C", "$.ColorEncoder", "$.Logger", "$.SimpleUnitCell", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.jvxlData = null;
this.vertexIncrement = 1;
this.firstRealVertex = -1;
this.dataType = 0;
this.hasGridPoints = false;
this.calculatedArea = null;
this.calculatedVolume = null;
this.info = null;
this.assocGridPointMap = null;
this.assocGridPointNormals = null;
this.mergeAssociatedNormalCount = 0;
this.centers = null;
this.contourValues = null;
this.contourColixes = null;
this.colorEncoder = null;
this.bsVdw = null;
this.colorPhased = false;
this.probeValues = null;
Clazz.instantialize (this, arguments);
}, J.shapesurface, "IsosurfaceMesh", J.shape.Mesh);
Clazz.overrideMethod (c$, "getResolution", 
function () {
return 1 / this.jvxlData.pointsPerAngstrom;
});
Clazz.makeConstructor (c$, 
function (vwr, thisID, colix, index) {
Clazz.superConstructor (this, J.shapesurface.IsosurfaceMesh, []);
this.mesh1 (vwr, thisID, colix, index);
this.jvxlData =  new J.jvxl.data.JvxlData ();
this.checkByteCount = 2;
this.jvxlData.version = JV.Viewer.getJmolVersion ();
}, "JV.Viewer,~S,~N,~N");
Clazz.defineMethod (c$, "clearType", 
function (meshType, iAddGridPoints) {
this.clear (meshType);
this.jvxlData.clear ();
this.assocGridPointMap = null;
this.assocGridPointNormals = null;
this.bsVdw = null;
this.calculatedVolume = null;
this.calculatedArea = null;
this.centers = null;
this.colorEncoder = null;
this.colorPhased = false;
this.colorsExplicit = false;
this.firstRealVertex = -1;
this.hasGridPoints = iAddGridPoints;
this.isColorSolid = true;
this.mergeAssociatedNormalCount = 0;
this.nSets = 0;
this.pcs = null;
this.showPoints = iAddGridPoints;
this.surfaceSet = null;
this.vcs = null;
this.vertexColorMap = null;
this.vertexIncrement = 1;
this.vertexSets = null;
this.vvs = null;
}, "~S,~B");
Clazz.defineMethod (c$, "allocVertexColixes", 
function () {
if (this.vcs == null) {
this.vcs =  Clazz.newShortArray (this.vc, 0);
for (var i = this.vc; --i >= 0; ) this.vcs[i] = this.colix;

}this.isColorSolid = false;
});
Clazz.defineMethod (c$, "addVertexCopy", 
function (vertex, value, assocVertex, associateNormals, asCopy) {
var vPt = this.addVCVal (vertex, value, asCopy);
switch (assocVertex) {
case -1:
if (this.firstRealVertex < 0) this.firstRealVertex = vPt;
break;
case -2:
this.hasGridPoints = true;
break;
case -3:
this.vertexIncrement = 3;
break;
default:
if (this.firstRealVertex < 0) this.firstRealVertex = vPt;
if (associateNormals) {
if (this.assocGridPointMap == null) this.assocGridPointMap =  new java.util.Hashtable ();
this.assocGridPointMap.put (Integer.$valueOf (vPt), Integer.$valueOf (assocVertex + this.mergeAssociatedNormalCount));
}}
return vPt;
}, "JU.T3,~N,~N,~B,~B");
Clazz.overrideMethod (c$, "setTranslucent", 
function (isTranslucent, iLevel) {
this.colix = JU.C.getColixTranslucent3 (this.colix, isTranslucent, iLevel);
if (this.vcs != null) for (var i = this.vc; --i >= 0; ) this.vcs[i] = JU.C.getColixTranslucent3 (this.vcs[i], isTranslucent, iLevel);

}, "~B,~N");
Clazz.defineMethod (c$, "setMerged", 
function (TF) {
this.isMerged = TF;
this.mergePolygonCount0 = (TF ? this.pc : 0);
this.mergeVertexCount0 = (TF ? this.vc : 0);
if (TF) {
this.mergeAssociatedNormalCount += this.jvxlData.nPointsX * this.jvxlData.nPointsY * this.jvxlData.nPointsZ;
this.assocGridPointNormals = null;
}}, "~B");
Clazz.overrideMethod (c$, "sumVertexNormals", 
function (vertices, vectorSums) {
J.shape.Mesh.sumVertexNormals2 (this, vertices, vectorSums);
if (this.assocGridPointMap != null && vectorSums.length > 0 && !this.isMerged) {
if (this.assocGridPointNormals == null) this.assocGridPointNormals =  new java.util.Hashtable ();
for (var entry, $entry = this.assocGridPointMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var gridPoint = entry.getValue ();
if (!this.assocGridPointNormals.containsKey (gridPoint)) this.assocGridPointNormals.put (gridPoint, JU.V3.new3 (0, 0, 0));
this.assocGridPointNormals.get (gridPoint).add (vectorSums[entry.getKey ().intValue ()]);
}
for (var entry, $entry = this.assocGridPointMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) vectorSums[entry.getKey ().intValue ()] = this.assocGridPointNormals.get (entry.getValue ());

}}, "~A,~A");
Clazz.defineMethod (c$, "getCenters", 
function () {
if (this.centers != null) return this.centers;
this.centers =  new Array (this.pc);
for (var i = 0; i < this.pc; i++) {
var p = this.pis[i];
if (p == null) continue;
var pt = this.centers[i] = JU.P3.newP (this.vs[p[0]]);
pt.add (this.vs[p[1]]);
pt.add (this.vs[p[2]]);
pt.scale (0.33333334);
}
return this.centers;
});
Clazz.defineMethod (c$, "getContours", 
function () {
var n = this.jvxlData.nContours;
if (n == 0 || this.pis == null) return null;
this.havePlanarContours = (this.jvxlData.jvxlPlane != null);
if (this.havePlanarContours) return null;
if (n < 0) n = -1 - n;
var vContours = this.jvxlData.vContours;
if (vContours != null) {
for (var i = 0; i < n; i++) {
if (vContours[i].size () > 6) return this.jvxlData.vContours;
J.jvxl.data.JvxlCoder.set3dContourVector (vContours[i], this.pis, this.vs);
}
return this.jvxlData.vContours;
}vContours =  new Array (n);
for (var i = 0; i < n; i++) {
vContours[i] =  new JU.Lst ();
}
if (this.jvxlData.contourValuesUsed == null) {
var dv = (this.jvxlData.valueMappedToBlue - this.jvxlData.valueMappedToRed) / (n + 1);
for (var i = 0; i < n; i++) {
var value = this.jvxlData.valueMappedToRed + (i + 1) * dv;
J.shapesurface.IsosurfaceMesh.get3dContour (this, vContours[i], value, this.jvxlData.contourColixes[i]);
}
JU.Logger.info (n + " contour lines; separation = " + dv);
} else {
for (var i = 0; i < n; i++) {
var value = this.jvxlData.contourValuesUsed[i];
J.shapesurface.IsosurfaceMesh.get3dContour (this, vContours[i], value, this.jvxlData.contourColixes[i]);
}
}this.jvxlData.contourColixes =  Clazz.newShortArray (n, 0);
this.jvxlData.contourValues =  Clazz.newFloatArray (n, 0);
for (var i = 0; i < n; i++) {
this.jvxlData.contourValues[i] = (vContours[i].get (2)).floatValue ();
this.jvxlData.contourColixes[i] = (vContours[i].get (3))[0];
}
return this.jvxlData.vContours = vContours;
});
Clazz.defineMethod (c$, "getPmeshData", 
function (isBinary) {
var mw = J.api.Interface.getInterface ("J.shapesurface.PMeshWriter", this.vwr, "script");
return mw.write (this, isBinary);
}, "~B");
c$.get3dContour = Clazz.defineMethod (c$, "get3dContour", 
 function (m, v, value, colix) {
var bsContour = JU.BS.newN (m.pc);
var fData =  new JU.SB ();
var color = JU.C.getArgb (colix);
J.shapesurface.IsosurfaceMesh.setContourVector (v, m.pc, bsContour, value, colix, color, fData);
for (var i = 0; i < m.pc; i++) if (m.setABC (i) != null) J.shapesurface.IsosurfaceMesh.addContourPoints (v, bsContour, i, fData, m.vs, m.vvs, m.iA, m.iB, m.iC, value);

}, "J.shapesurface.IsosurfaceMesh,JU.Lst,~N,~N");
c$.setContourVector = Clazz.defineMethod (c$, "setContourVector", 
function (v, nPolygons, bsContour, value, colix, color, fData) {
v.add (0, Integer.$valueOf (nPolygons));
v.add (1, bsContour);
v.add (2, Float.$valueOf (value));
v.add (3,  Clazz.newShortArray (-1, [colix]));
v.add (4,  Clazz.newIntArray (-1, [color]));
v.add (5, fData);
}, "JU.Lst,~N,JU.BS,~N,~N,~N,JU.SB");
c$.addContourPoints = Clazz.defineMethod (c$, "addContourPoints", 
function (v, bsContour, i, fData, vertices, vertexValues, iA, iB, iC, value) {
var pt1 = null;
var pt2 = null;
var type = 0;
var f1 = J.shapesurface.IsosurfaceMesh.checkPt (vertexValues, iA, iB, value);
if (!Float.isNaN (f1)) {
pt1 = J.shapesurface.IsosurfaceMesh.getContourPoint (vertices, iA, iB, f1);
type |= 1;
}var f2 = (f1 == 1 ? NaN : J.shapesurface.IsosurfaceMesh.checkPt (vertexValues, iB, iC, value));
if (!Float.isNaN (f2)) {
pt2 = J.shapesurface.IsosurfaceMesh.getContourPoint (vertices, iB, iC, f2);
if (type == 0) {
pt1 = pt2;
f1 = f2;
}type |= 2;
}switch (type) {
case 0:
return;
case 1:
if (f1 == 0) return;
case 2:
f2 = (f2 == 1 ? NaN : J.shapesurface.IsosurfaceMesh.checkPt (vertexValues, iC, iA, value));
if (!Float.isNaN (f2)) {
pt2 = J.shapesurface.IsosurfaceMesh.getContourPoint (vertices, iC, iA, f2);
type |= 4;
}break;
}
switch (type) {
case 3:
case 5:
case 6:
break;
default:
return;
}
bsContour.set (i);
J.jvxl.data.JvxlCoder.appendContourTriangleIntersection (type, f1, f2, fData);
v.addLast (pt1);
v.addLast (pt2);
}, "JU.Lst,JU.BS,~N,JU.SB,~A,~A,~N,~N,~N,~N");
c$.checkPt = Clazz.defineMethod (c$, "checkPt", 
 function (vertexValues, i, j, v) {
var v1;
var v2;
return (v == (v1 = vertexValues[i]) ? 0 : v == (v2 = vertexValues[j]) ? 1 : (v1 < v) == (v < v2) ? (v - v1) / (v2 - v1) : NaN);
}, "~A,~N,~N,~N");
c$.getContourPoint = Clazz.defineMethod (c$, "getContourPoint", 
 function (vertices, i, j, f) {
var pt =  new JU.P3 ();
pt.sub2 (vertices[j], vertices[i]);
pt.scaleAdd2 (f, pt, vertices[i]);
return pt;
}, "~A,~N,~N,~N");
Clazz.defineMethod (c$, "setDiscreteColixes", 
function (values, colixes) {
if (values != null) this.jvxlData.contourValues = values;
if (values == null || values.length == 0) values = this.jvxlData.contourValues = this.jvxlData.contourValuesUsed;
if (colixes == null && this.jvxlData.contourColixes != null) {
colixes = this.jvxlData.contourColixes;
} else {
this.jvxlData.contourColixes = colixes;
this.jvxlData.contourColors = JU.C.getHexCodes (colixes);
}if (this.vs == null || this.vvs == null || values == null) return;
var n = values.length;
var vMax = values[n - 1];
this.colorCommand = null;
var haveColixes = (colixes != null && colixes.length > 0);
this.isColorSolid = (haveColixes && this.jvxlData.jvxlPlane != null);
if (this.jvxlData.vContours != null) {
if (haveColixes) for (var i = 0; i < this.jvxlData.vContours.length; i++) {
var colix = colixes[i % colixes.length];
(this.jvxlData.vContours[i].get (3))[0] = colix;
(this.jvxlData.vContours[i].get (4))[0] = JU.C.getArgb (colix);
}
return;
}var defaultColix = 0;
this.pcs =  Clazz.newShortArray (this.pc, 0);
this.colorsExplicit = false;
for (var i = 0; i < this.pc; i++) {
var p = this.pis[i];
if (p == null) continue;
this.pcs[i] = defaultColix;
var v = (this.vvs[p[0]] + this.vvs[p[1]] + this.vvs[p[2]]) / 3;
for (var j = n; --j >= 0; ) {
if (v >= values[j] && v < vMax) {
this.pcs[i] = (haveColixes ? colixes[j % colixes.length] : 0);
break;
}}
}
}, "~A,~A");
Clazz.defineMethod (c$, "getContourList", 
function (vwr) {
var ht =  new java.util.Hashtable ();
ht.put ("values", (this.jvxlData.contourValuesUsed == null ? this.jvxlData.contourValues : this.jvxlData.contourValuesUsed));
var colors =  new JU.Lst ();
if (this.jvxlData.contourColixes != null) {
for (var i = 0; i < this.jvxlData.contourColixes.length; i++) {
colors.addLast (JU.CU.colorPtFromInt (JU.C.getArgb (this.jvxlData.contourColixes[i]), null));
}
ht.put ("colors", colors);
}return ht;
}, "JV.Viewer");
Clazz.defineMethod (c$, "deleteContours", 
function () {
this.jvxlData.contourValuesUsed = null;
this.jvxlData.contourValues = null;
this.jvxlData.contourColixes = null;
this.jvxlData.vContours = null;
});
Clazz.defineMethod (c$, "setVertexColorMap", 
function () {
this.vertexColorMap =  new java.util.Hashtable ();
var lastColix = -999;
var bs = null;
for (var i = this.vc; --i >= 0; ) {
var c = this.vcs[i];
if (c != lastColix) {
var color = JU.C.getHexCode (lastColix = c);
bs = this.vertexColorMap.get (color);
if (bs == null) this.vertexColorMap.put (color, bs =  new JU.BS ());
}bs.set (i);
}
});
Clazz.defineMethod (c$, "setVertexColixesForAtoms", 
function (vwr, colixes, atomMap, bs) {
this.jvxlData.vertexDataOnly = true;
this.jvxlData.vertexColors =  Clazz.newIntArray (this.vc, 0);
this.jvxlData.nVertexColors = this.vc;
var atoms = vwr.ms.at;
var gdata = vwr.gdata;
for (var i = this.mergeVertexCount0; i < this.vc; i++) {
var iAtom = this.vertexSource[i];
if (iAtom < 0 || !bs.get (iAtom)) continue;
this.jvxlData.vertexColors[i] = gdata.getColorArgbOrGray (this.vcs[i] = JU.C.copyColixTranslucency (this.colix, atoms[iAtom].colixAtom));
var colix = (colixes == null ? 0 : colixes[atomMap[iAtom]]);
if (colix == 0) colix = atoms[iAtom].colixAtom;
this.vcs[i] = JU.C.copyColixTranslucency (this.colix, colix);
}
}, "JV.Viewer,~A,~A,JU.BS");
Clazz.defineMethod (c$, "colorVertices", 
function (colix, bs, isAtoms) {
if (this.vertexSource == null) return;
colix = JU.C.copyColixTranslucency (this.colix, colix);
var bsVertices = (isAtoms ?  new JU.BS () : bs);
this.checkAllocColixes ();
if (isAtoms) for (var i = 0; i < this.vc; i++) {
var pt = this.vertexSource[i];
if (pt >= 0 && bs.get (pt)) {
this.vcs[i] = colix;
if (bsVertices != null) bsVertices.set (i);
}}
 else for (var i = 0; i < this.vc; i++) if (bsVertices.get (i)) this.vcs[i] = colix;

if (!isAtoms) {
return;
}var color = JU.C.getHexCode (colix);
if (this.vertexColorMap == null) this.vertexColorMap =  new java.util.Hashtable ();
J.shapesurface.IsosurfaceMesh.addColorToMap (this.vertexColorMap, color, bs);
}, "~N,JU.BS,~B");
Clazz.defineMethod (c$, "checkAllocColixes", 
function () {
if (this.vcs == null || this.vertexColorMap == null && this.isColorSolid) this.allocVertexColixes ();
this.isColorSolid = false;
});
c$.addColorToMap = Clazz.defineMethod (c$, "addColorToMap", 
 function (colorMap, color, bs) {
var bsMap = null;
for (var entry, $entry = colorMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) if (entry.getKey () === color) {
bsMap = entry.getValue ();
bsMap.or (bs);
} else {
entry.getValue ().andNot (bs);
}
if (bsMap == null) colorMap.put (color, bs);
}, "java.util.Map,~S,JU.BS");
Clazz.defineMethod (c$, "setJvxlColorMap", 
function (isAll) {
this.jvxlData.diameter = this.diameter;
this.jvxlData.color = JU.C.getHexCode (this.colix);
this.jvxlData.meshColor = (this.meshColix == 0 ? null : JU.C.getHexCode (this.meshColix));
this.jvxlData.translucency = ((this.colix & 30720) == 30720 ? -1 : JU.C.getColixTranslucencyFractional (this.colix));
this.jvxlData.rendering = this.getRendering ().substring (1);
this.jvxlData.colorScheme = (this.colorEncoder == null ? null : this.colorEncoder.getColorScheme ());
if (this.jvxlData.vertexColors == null) this.jvxlData.nVertexColors = (this.vertexColorMap == null ? 0 : this.vertexColorMap.size ());
if (this.vertexColorMap == null || this.vertexSource == null || !isAll) return;
if (this.jvxlData.vertexColorMap == null) this.jvxlData.vertexColorMap =  new java.util.Hashtable ();
for (var entry, $entry = this.vertexColorMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var bsMap = entry.getValue ();
if (bsMap.isEmpty ()) continue;
var color = entry.getKey ();
var bs =  new JU.BS ();
for (var i = 0; i < this.vc; i++) if (bsMap.get (this.vertexSource[i])) bs.set (i);

J.shapesurface.IsosurfaceMesh.addColorToMap (this.jvxlData.vertexColorMap, color, bs);
}
this.jvxlData.nVertexColors = this.jvxlData.vertexColorMap.size ();
if (this.jvxlData.vertexColorMap.size () == 0) this.jvxlData.vertexColorMap = null;
}, "~B");
Clazz.defineMethod (c$, "setColorCommand", 
function () {
if (this.colorEncoder == null || (this.colorCommand = this.colorEncoder.getColorScheme ()) == null) return;
if (this.colorCommand.equals ("inherit")) {
this.colorCommand = "#inherit;";
return;
}this.colorCommand = "color $" + JU.PT.esc (this.thisID) + JU.PT.esc (this.colorCommand) + " range " + (this.jvxlData.isColorReversed ? this.jvxlData.valueMappedToBlue + " " + this.jvxlData.valueMappedToRed : this.jvxlData.valueMappedToRed + " " + this.jvxlData.valueMappedToBlue);
});
Clazz.defineMethod (c$, "setColorsFromJvxlData", 
function (colorRgb) {
this.diameter = this.jvxlData.diameter;
if (colorRgb == -1) {
} else if (colorRgb != -2147483648 && colorRgb != 2147483647) {
this.colix = JU.C.getColix (colorRgb);
} else if (this.jvxlData.color != null) {
this.colix = JU.C.getColixS (this.jvxlData.color);
}if (this.colix == 0) this.colix = 5;
this.colix = JU.C.getColixTranslucent3 (this.colix, this.jvxlData.translucency != 0, this.jvxlData.translucency);
var translucencyLevel = (this.jvxlData.translucency == 0 ? NaN : this.jvxlData.translucency);
if (this.jvxlData.meshColor != null) this.meshColix = JU.C.getColixS (this.jvxlData.meshColor);
this.setJvxlDataRendering ();
this.isColorSolid = !this.jvxlData.isBicolorMap && this.jvxlData.vertexColors == null && this.jvxlData.vertexColorMap == null;
if (this.colorEncoder == null) return false;
if (this.jvxlData.vertexColorMap == null) {
if (this.jvxlData.colorScheme != null) {
var colorScheme = this.jvxlData.colorScheme;
var isTranslucent = colorScheme.startsWith ("translucent ");
if (isTranslucent) {
colorScheme = colorScheme.substring (12);
translucencyLevel = NaN;
}this.colorEncoder.setColorScheme (colorScheme, isTranslucent);
this.remapColors (null, null, translucencyLevel);
}} else {
if (this.jvxlData.baseColor != null) {
for (var i = this.vc; --i >= 0; ) this.vcs[i] = this.colix;

}for (var entry, $entry = this.jvxlData.vertexColorMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var bsMap = entry.getValue ();
var colix = JU.C.copyColixTranslucency (this.colix, JU.C.getColixS (entry.getKey ()));
for (var i = bsMap.nextSetBit (0); i >= 0; i = bsMap.nextSetBit (i + 1)) this.vcs[i] = colix;

}
}return true;
}, "~N");
Clazz.defineMethod (c$, "setJvxlDataRendering", 
function () {
if (this.jvxlData.rendering != null) {
var tokens = JU.PT.getTokens (this.jvxlData.rendering);
for (var i = 0; i < tokens.length; i++) this.setTokenProperty (JS.T.getTokFromName (tokens[i]), true);

}});
Clazz.defineMethod (c$, "remapColors", 
function (vwr, ce, translucentLevel) {
if (ce == null) ce = this.colorEncoder;
if (ce == null) ce = this.colorEncoder =  new JU.ColorEncoder (null, vwr);
this.colorEncoder = ce;
this.setColorCommand ();
if (Float.isNaN (translucentLevel)) {
translucentLevel = JU.C.getColixTranslucencyLevel (this.colix);
} else {
this.colix = JU.C.getColixTranslucent3 (this.colix, true, translucentLevel);
}var min = ce.lo;
var max = ce.hi;
var inherit = (this.vertexSource != null && ce.currentPalette == 15);
this.vertexColorMap = null;
this.pcs = null;
this.colorsExplicit = false;
this.jvxlData.baseColor = null;
this.jvxlData.vertexCount = this.vc;
if (this.vvs == null || this.jvxlData.vertexCount == 0) return;
if (this.vcs == null || this.vcs.length != this.vc) this.allocVertexColixes ();
if (inherit) {
this.jvxlData.vertexDataOnly = true;
this.jvxlData.vertexColors =  Clazz.newIntArray (this.vc, 0);
this.jvxlData.nVertexColors = this.vc;
var atoms = vwr.ms.at;
var gdata = vwr.gdata;
for (var i = this.mergeVertexCount0; i < this.vc; i++) {
var pt = this.vertexSource[i];
if (pt >= 0 && pt < atoms.length) this.jvxlData.vertexColors[i] = gdata.getColorArgbOrGray (this.vcs[i] = JU.C.copyColixTranslucency (this.colix, atoms[pt].colixAtom));
}
return;
}this.jvxlData.vertexColors = null;
this.jvxlData.vertexColorMap = null;
if (this.jvxlData.isBicolorMap) {
for (var i = this.mergeVertexCount0; i < this.vc; i++) this.vcs[i] = JU.C.copyColixTranslucency (this.colix, this.vvs[i] < 0 ? this.jvxlData.minColorIndex : this.jvxlData.maxColorIndex);

return;
}this.jvxlData.isColorReversed = ce.isReversed;
if (max != 3.4028235E38) {
this.jvxlData.valueMappedToRed = min;
this.jvxlData.valueMappedToBlue = max;
}ce.setRange (this.jvxlData.valueMappedToRed, this.jvxlData.valueMappedToBlue, this.jvxlData.isColorReversed);
var isTranslucent = JU.C.isColixTranslucent (this.colix);
if (ce.isTranslucent) {
if (!isTranslucent) this.colix = JU.C.getColixTranslucent3 (this.colix, true, 0.5);
isTranslucent = false;
}this.vcs = JU.AU.ensureLengthShort (this.vcs, this.vc);
for (var i = this.vc; --i >= this.mergeVertexCount0; ) this.vcs[i] = ce.getColorIndex (this.vvs[i]);

this.setTranslucent (isTranslucent, translucentLevel);
this.colorEncoder = ce;
var contours = this.getContours ();
if (contours != null) {
for (var i = contours.length; --i >= 0; ) {
var value = (contours[i].get (2)).floatValue ();
var colix = (contours[i].get (3));
colix[0] = ce.getColorIndex (value);
var color = (contours[i].get (4));
color[0] = JU.C.getArgb (colix[0]);
}
}if (this.contourValues != null) {
this.contourColixes =  Clazz.newShortArray (this.contourValues.length, 0);
for (var i = 0; i < this.contourValues.length; i++) this.contourColixes[i] = ce.getColorIndex (this.contourValues[i]);

this.setDiscreteColixes (null, null);
}this.jvxlData.isJvxlPrecisionColor = true;
J.jvxl.data.JvxlCoder.jvxlCreateColorData (this.jvxlData, this.vvs);
this.setColorCommand ();
this.isColorSolid = false;
}, "JV.Viewer,JU.ColorEncoder,~N");
Clazz.defineMethod (c$, "reinitializeLightingAndColor", 
function (vwr) {
this.initialize (this.lighting, null, null);
if (this.colorEncoder != null || this.jvxlData.isBicolorMap) {
this.vcs = null;
this.remapColors (vwr, null, NaN);
}}, "JV.Viewer");
Clazz.overrideMethod (c$, "getBoundingBox", 
function () {
return this.jvxlData.boundingBox;
});
Clazz.overrideMethod (c$, "setBoundingBox", 
function (pts) {
this.jvxlData.boundingBox = pts;
}, "~A");
Clazz.defineMethod (c$, "merge", 
function (m) {
var nV = this.vc + (m == null ? 0 : m.vc);
if (this.pis == null) this.pis =  Clazz.newIntArray (0, 0, 0);
if (m != null && m.pis == null) m.pis =  Clazz.newIntArray (0, 0, 0);
var nP = (this.bsSlabDisplay == null || this.pc == 0 ? this.pc : this.bsSlabDisplay.cardinality ()) + (m == null || m.pc == 0 ? 0 : m.bsSlabDisplay == null ? m.pc : m.bsSlabDisplay.cardinality ());
if (this.vs == null) this.vs =  new Array (0);
this.vs = JU.AU.ensureLength (this.vs, nV);
this.vvs = JU.AU.ensureLengthA (this.vvs, nV);
var haveSources = (this.vertexSource != null && (m == null || m.vertexSource != null));
this.vertexSource = JU.AU.ensureLengthI (this.vertexSource, nV);
var newPolygons = JU.AU.newInt2 (nP);
var ipt = J.shapesurface.IsosurfaceMesh.mergePolygons (this, 0, 0, newPolygons);
if (m != null) {
ipt = J.shapesurface.IsosurfaceMesh.mergePolygons (m, ipt, this.vc, newPolygons);
for (var i = 0; i < m.vc; i++, this.vc++) {
this.vs[this.vc] = m.vs[i];
this.vvs[this.vc] = m.vvs[i];
if (haveSources) this.vertexSource[this.vc] = m.vertexSource[i];
}
}this.pc = this.polygonCount0 = nP;
this.vc = this.vertexCount0 = nV;
if (nP > 0) this.resetSlab ();
this.pis = newPolygons;
}, "J.jvxl.data.MeshData");
c$.mergePolygons = Clazz.defineMethod (c$, "mergePolygons", 
 function (m, ipt, vertexCount, newPolygons) {
var p;
for (var i = 0; i < m.pc; i++) {
if ((p = m.pis[i]) == null || m.bsSlabDisplay != null && !m.bsSlabDisplay.get (i)) continue;
newPolygons[ipt++] = m.pis[i];
if (vertexCount > 0) for (var j = 0; j < 3; j++) p[j] += vertexCount;

}
return ipt;
}, "JU.MeshSurface,~N,~N,~A");
Clazz.overrideMethod (c$, "getUnitCell", 
function () {
return (this.unitCell != null || (this.unitCell = this.vwr.ms.am[this.modelIndex].biosymmetry) != null || (this.unitCell = this.vwr.ms.getUnitCell (this.modelIndex)) != null || this.oabc != null && (this.unitCell = J.api.Interface.getSymmetry (this.vwr, "symmetry").getUnitCell (this.oabc, true, null)) != null ? this.unitCell : null);
});
Clazz.defineMethod (c$, "fixLattice", 
function () {
if (this.getUnitCell () == null) return;
var minXYZ =  new JU.P3i ();
var maxXYZ = JU.P3i.new3 (Clazz.floatToInt (this.lattice.x), Clazz.floatToInt (this.lattice.y), Clazz.floatToInt (this.lattice.z));
this.jvxlData.fixedLattice = this.lattice;
this.lattice = null;
JU.SimpleUnitCell.setMinMaxLatticeParameters (Clazz.floatToInt (this.unitCell.getUnitCellInfoType (6)), minXYZ, maxXYZ, 0);
var nCells = (maxXYZ.x - minXYZ.x) * (maxXYZ.y - minXYZ.y) * (maxXYZ.z - minXYZ.z);
var latticeOffset =  new JU.P3 ();
var vc0 = this.vc;
var vcNew = nCells * this.vc;
this.vs = JU.AU.arrayCopyPt (this.vs, vcNew);
this.vvs = (this.vvs == null ? null : JU.AU.ensureLengthA (this.vvs, vcNew));
var pc0 = this.pc;
var pcNew = nCells * this.pc;
this.pis = JU.AU.arrayCopyII (this.pis, pcNew);
var off = 0;
this.normixes = JU.AU.arrayCopyShort (this.normixes, vcNew);
for (var tx = minXYZ.x; tx < maxXYZ.x; tx++) for (var ty = minXYZ.y; ty < maxXYZ.y; ty++) for (var tz = minXYZ.z; tz < maxXYZ.z; tz++) {
if (tx == 0 && ty == 0 && tz == 0) continue;
latticeOffset.set (tx, ty, tz);
this.unitCell.toCartesian (latticeOffset, false);
for (var i = 0; i < vc0; i++) {
this.normixes[this.vc] = this.normixes[i];
var v = JU.P3.newP (this.vs[i]);
v.add (latticeOffset);
this.addVCVal (v, this.vvs[i], false);
}
off += vc0;
for (var i = 0; i < pc0; i++) {
var p = JU.AU.arrayCopyI (this.pis[i], -1);
p[0] += off;
p[1] += off;
p[2] += off;
this.addPolygon (p, null);
}
}


var xyzMin =  new JU.P3 ();
var xyzMax =  new JU.P3 ();
this.setBox (xyzMin, xyzMax);
this.jvxlData.boundingBox =  Clazz.newArray (-1, [xyzMin, xyzMax]);
});
Clazz.overrideMethod (c$, "getMinDistance2ForVertexGrouping", 
function () {
if (this.jvxlData.boundingBox != null && this.jvxlData.boundingBox[0] != null) {
var d2 = this.jvxlData.boundingBox[1].distanceSquared (this.jvxlData.boundingBox[0]);
if (d2 < 5) return 1e-10;
}return 1e-8;
});
Clazz.overrideMethod (c$, "getVisibleVertexBitSet", 
function () {
var bs = this.getVisibleVBS ();
if (this.jvxlData.thisSet >= 0) for (var i = 0; i < this.vc; i++) if (this.vertexSets[i] != this.jvxlData.thisSet) bs.clear (i);

return bs;
});
Clazz.defineMethod (c$, "updateCoordinates", 
function (m, bs) {
var doUpdate = (bs == null || this.isModelConnected);
if (!doUpdate) for (var i = 0; i < this.connectedAtoms.length; i++) if (this.connectedAtoms[i] >= 0 && bs.get (this.connectedAtoms[i])) {
doUpdate = true;
break;
}
if (!doUpdate) return;
if (this.isModelConnected) {
this.mat4 = this.vwr.ms.am[this.modelIndex].mat4;
} else {
if (this.mat4 == null) this.mat4 = JU.M4.newM4 (null);
this.mat4.mul2 (m, this.mat4);
}this.recalcAltVertices = true;
}, "JU.M4,JU.BS");
Clazz.defineMethod (c$, "getDataMinMax", 
function () {
var min = 3.4028235E38;
var max = 1.4E-45;
for (var i = this.vvs.length; --i >= 0; ) {
var v = this.vvs[i];
if (v < min) min = v;
if (v > max) max = v;
}
return  Clazz.newFloatArray (-1, [min, max]);
});
Clazz.defineMethod (c$, "getDataRange", 
function () {
return (this.jvxlData.jvxlPlane != null && this.colorEncoder == null ? null :  Clazz.newFloatArray (-1, [this.jvxlData.mappedDataMin, this.jvxlData.mappedDataMax, (this.jvxlData.isColorReversed ? this.jvxlData.valueMappedToBlue : this.jvxlData.valueMappedToRed), (this.jvxlData.isColorReversed ? this.jvxlData.valueMappedToRed : this.jvxlData.valueMappedToBlue)]));
});
});
