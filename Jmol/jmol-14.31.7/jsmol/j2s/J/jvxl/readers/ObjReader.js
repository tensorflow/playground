Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.PmeshReader"], "J.jvxl.readers.ObjReader", ["java.util.Hashtable", "JU.BS", "$.CU", "$.P3", "$.PT"], function () {
c$ = Clazz.declareType (J.jvxl.readers, "ObjReader", J.jvxl.readers.PmeshReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.ObjReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init2PR (sg, br);
this.type = "obj";
this.setHeader ();
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readVertices", 
function () {
this.pmeshError = "pmesh ERROR: invalid vertex/face list";
var pt =  new JU.P3 ();
var color = 0;
var ia;
var ib;
var ic;
var id = 0;
var i = 0;
var nPts = 0;
var htPymol =  new java.util.Hashtable ();
var ipt = null;
var spt = null;
var pymolMap =  Clazz.newIntArray (3, 0);
var bsOK =  new JU.BS ();
while (this.rd () != null) {
if (this.line.length < 2 || this.line.charAt (1) != ' ') {
if (this.params.readAllData && this.line.startsWith ("usemtl")) color = JU.CU.getArgbFromString ("[x" + this.line.substring (8) + "]");
continue;
}switch (this.line.charAt (0)) {
case 'v':
this.next[0] = 2;
pt.set (JU.PT.parseFloatNext (this.line, this.next), JU.PT.parseFloatNext (this.line, this.next), JU.PT.parseFloatNext (this.line, this.next));
var addHt = false;
if (htPymol == null) {
i = this.nVertices;
} else if ((ipt = htPymol.get (spt = "" + pt)) == null) {
addHt = true;
i = this.nVertices;
} else {
i = ipt.intValue ();
}var j = i;
if (i == this.nVertices) {
if (this.isAnisotropic) this.setVertexAnisotropy (pt);
j = this.addVertexCopy (pt, 0, this.nVertices++, true);
if (j >= 0) bsOK.set (i);
}pymolMap[nPts % 3] = j;
if (addHt) htPymol.put (spt, Integer.$valueOf (i));
nPts++;
if (htPymol != null && nPts > 3) htPymol = null;
break;
case 'f':
if (nPts == 3 && this.line.indexOf ("//") < 0) htPymol = null;
nPts = 0;
this.nPolygons++;
var tokens = JU.PT.getTokens (this.line);
var vertexCount = tokens.length - 1;
if (vertexCount == 4) htPymol = null;
if (htPymol == null) {
ia = JU.PT.parseInt (tokens[1]) - 1;
ib = JU.PT.parseInt (tokens[2]) - 1;
ic = JU.PT.parseInt (tokens[3]) - 1;
this.pmeshError = " " + ia + " " + ib + " " + ic + " " + this.line;
if (!bsOK.get (ia) || !bsOK.get (ib) || !bsOK.get (ic)) continue;
if (vertexCount == 4) {
id = JU.PT.parseInt (tokens[4]) - 1;
var isOK = (bsOK.get (id));
this.nTriangles = this.addTriangleCheck (ia, ib, ic, (isOK ? 3 : 7), 0, false, color);
if (isOK) this.nTriangles = this.addTriangleCheck (ia, ic, id, 6, 0, false, color);
continue;
}} else {
ia = pymolMap[0];
ib = pymolMap[1];
ic = pymolMap[2];
if (ia < 0 || ib < 0 || ic < 0) continue;
}this.nTriangles = this.addTriangleCheck (ia, ib, ic, 7, 0, false, color);
break;
case 'g':
htPymol = null;
if (this.params.readAllData) try {
color = JU.PT.parseIntRadix (this.line.substring (3), 16);
} catch (e) {
color = 0;
}
break;
}
}
this.pmeshError = null;
return true;
});
Clazz.overrideMethod (c$, "readPolygons", 
function () {
return true;
});
});
