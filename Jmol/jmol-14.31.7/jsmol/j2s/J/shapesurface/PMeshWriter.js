Clazz.declarePackage ("J.shapesurface");
Clazz.load (null, "J.shapesurface.PMeshWriter", ["java.lang.Float", "JU.BS", "JU.C"], function () {
c$ = Clazz.decorateAsClass (function () {
this.imesh = null;
this.isBinary = false;
this.oc = null;
this.i0 = 0;
this.polygonIndexes = null;
this.selectedPolyOnly = false;
this.bsPolygons = null;
this.haveBsDisplay = false;
this.colorSolid = false;
this.colorArrayed = false;
this.cx = 0;
this.vertexColixes = null;
this.noColor = false;
this.contourColixes = null;
this.vertexValues = null;
this.vertexCount = 0;
this.imap = null;
Clazz.instantialize (this, arguments);
}, J.shapesurface, "PMeshWriter");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "write", 
function (isosurfaceMesh, isBinary) {
this.imesh = isosurfaceMesh;
this.isBinary = isBinary;
var bsPoly =  new JU.BS ();
var bsVert =  new JU.BS ();
var bsPoints =  new JU.BS ();
if (this.imesh.showPoints || this.imesh.pc <= 0) this.checkPoints (bsPoints);
bsVert.or (bsPoints);
if (this.imesh.drawTriangles) this.checkTriangles (false, bsPoly, bsVert);
if (this.imesh.pc > 0 && this.imesh.fillTriangles) this.checkTriangles (true, bsPoly, bsVert);
this.imap =  Clazz.newIntArray (this.vertexCount, 0);
var iimap =  Clazz.newIntArray (this.vertexCount, 0);
var nV = 0;
for (var i = bsVert.nextSetBit (0); i >= 0; i = bsVert.nextSetBit (i + 1)) {
iimap[nV] = i;
this.imap[i] = nV++;
}
this.writePmeshHeader (nV);
if (!isBinary) this.outputInt (nV);
for (var i = 0; i < nV; i++) this.outputXYZ (this.imesh.vs[iimap[i]]);

if (!isBinary) this.outputInt (-1);
if (this.imesh.showPoints || this.imesh.pc <= 0) this.outputPoints (bsPoints);
bsVert.or (bsPoints);
var bsDone =  new JU.BS ();
if (this.imesh.drawTriangles) this.outputTriangles (false, bsPoly, bsDone);
if (this.imesh.pc > 0 && this.imesh.fillTriangles) this.outputTriangles (true, bsPoly, bsDone);
if (isBinary) this.oc.writeInt (0);
 else this.oc.append ("0\n");
this.oc.closeChannel ();
return (isBinary ? this.oc.toByteArray () : this.oc.toString ());
}, "J.shapesurface.IsosurfaceMesh,~B");
Clazz.defineMethod (c$, "outputPoints", 
 function (bsPoints) {
var color = JU.C.getArgb (this.cx);
for (var i = bsPoints.nextSetBit (0); i >= 0; i = bsPoints.nextSetBit (i + 1)) {
if (!this.imesh.isColorSolid && this.imesh.vcs != null) {
this.cx = this.imesh.vcs[i];
color = JU.C.getArgb (this.cx);
}this.outputPoint (this.imap[i], color);
}
}, "JU.BS");
Clazz.defineMethod (c$, "outputTriangles", 
 function (fill, bsPoly, bsDone) {
var color = JU.C.getArgb (this.cx);
for (var i = bsPoly.nextSetBit (0); i >= 0; i = bsPoly.nextSetBit (i + 1)) {
var polygon = this.polygonIndexes[i];
var iA = this.imap[polygon[0]];
var iB = this.imap[polygon[1]];
var iC = this.imap[polygon[2]];
if (this.colorSolid) {
if (this.colorArrayed && i < this.imesh.pcs.length) this.cx = this.imesh.pcs[i];
} else {
this.cx = this.vertexColixes[polygon[0]];
}color = JU.C.getArgb (this.cx);
if (fill) {
if (iB == iC) {
if (iA == iB) this.outputPoint (iA, color);
 else this.outputEdge (iA, iB, color);
bsDone.set (i);
} else {
if (this.imesh.colorsExplicit) color = polygon[4];
this.outputTriangle (iA, iB, iC, color, 999);
}} else if (!bsDone.get (i)) {
var check = 7 & polygon[3];
if (check == 0) continue;
if (this.noColor) {
} else if (this.colorArrayed) {
color = JU.C.getArgb (this.imesh.fillTriangles ? 4 : this.contourColixes[polygon[4] % this.contourColixes.length]);
}this.outputTriangle (iA, iB, iC, color, check);
}}
}, "~B,JU.BS,JU.BS");
Clazz.defineMethod (c$, "checkPoints", 
 function (bsVert) {
var slabPoints = ((this.imesh.pc == 0) && this.selectedPolyOnly);
var incr = this.imesh.vertexIncrement;
for (var i = (!this.imesh.hasGridPoints || this.imesh.firstRealVertex < 0 ? 0 : this.imesh.firstRealVertex); i < this.vertexCount; i += incr) {
if (this.vertexValues != null && Float.isNaN (this.vertexValues[i]) || this.imesh.jvxlData.thisSet >= 0 && this.imesh.vertexSets[i] != this.imesh.jvxlData.thisSet || !this.imesh.isColorSolid || this.haveBsDisplay && !this.imesh.bsDisplay.get (i) || slabPoints && !this.bsPolygons.get (i)) continue;
bsVert.set (i);
}
}, "JU.BS");
Clazz.defineMethod (c$, "checkTriangles", 
 function (fill, bsPoly, bsVert) {
this.setup (fill);
for (var i = this.imesh.pc; --i >= 0; ) {
var polygon = this.polygonIndexes[i];
if (polygon == null || this.selectedPolyOnly && !this.bsPolygons.get (i)) continue;
var iA = polygon[0];
if (this.imesh.jvxlData.thisSet >= 0 && this.imesh.vertexSets != null && this.imesh.vertexSets[iA] != this.imesh.jvxlData.thisSet) continue;
var iB = polygon[1];
var iC = polygon[2];
if (this.haveBsDisplay && (!this.imesh.bsDisplay.get (iA) || !this.imesh.bsDisplay.get (iB) || !this.imesh.bsDisplay.get (iC))) continue;
if (this.colorSolid && this.colorArrayed && i < this.imesh.pcs.length && this.imesh.pcs[i] == 0) continue;
bsPoly.set (i);
bsVert.set (iA);
bsVert.set (iB);
bsVert.set (iC);
}
}, "~B,JU.BS,JU.BS");
Clazz.defineMethod (c$, "setup", 
 function (fill) {
this.vertexCount = this.imesh.vc;
this.vertexValues = this.imesh.vvs;
this.polygonIndexes = this.imesh.pis;
this.cx = (!fill && this.imesh.meshColix != 0 ? this.imesh.meshColix : this.imesh.colix);
this.vertexColixes = (!fill && this.imesh.meshColix != 0 ? null : this.imesh.vcs);
this.colorSolid = (this.vertexColixes == null);
this.noColor = (this.vertexColixes == null || !fill && this.imesh.meshColix != 0);
this.colorArrayed = (this.colorSolid && this.imesh.pcs != null);
if (this.colorArrayed && !fill && this.imesh.fillTriangles) this.colorArrayed = false;
this.contourColixes = this.imesh.jvxlData.contourColixes;
this.haveBsDisplay = (this.imesh.bsDisplay != null);
this.selectedPolyOnly = (this.imesh.bsSlabDisplay != null);
this.bsPolygons = (this.selectedPolyOnly ? this.imesh.bsSlabDisplay : null);
}, "~B");
Clazz.defineMethod (c$, "writePmeshHeader", 
 function (nV) {
this.oc = this.imesh.vwr.getOutputChannel (null, null);
if (this.isBinary) {
this.oc.writeByteAsInt (80);
this.oc.writeByteAsInt (77);
this.oc.writeByteAsInt (1);
this.oc.writeByteAsInt (0);
this.oc.writeInt (1);
this.oc.writeInt (nV);
this.oc.writeInt (-1);
for (var i = 0; i < 16; i++) this.oc.writeInt (0);

} else {
this.oc.append ("#JmolPmesh\n");
}}, "~N");
Clazz.defineMethod (c$, "outputInt", 
 function (i) {
if (this.isBinary) this.oc.writeInt (i);
 else this.oc.append ("" + i + "\n");
}, "~N");
Clazz.defineMethod (c$, "outputPoint", 
 function (iA, color) {
this.outputInt (-1);
this.outputInt (iA);
this.outputInt (color);
return 1;
}, "~N,~N");
Clazz.defineMethod (c$, "outputXYZ", 
 function (pt) {
if (this.isBinary) {
this.oc.writeFloat (pt.x);
this.oc.writeFloat (pt.y);
this.oc.writeFloat (pt.z);
} else {
this.oc.append (pt.x + " " + pt.y + " " + pt.z + "\n");
}}, "JU.T3");
Clazz.defineMethod (c$, "outputEdge", 
 function (iA, iB, color) {
this.outputInt (-2);
this.outputInt (iA);
this.outputInt (iB);
this.outputInt (color);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "outputTriangle", 
 function (iA, iB, iC, color, check) {
if (check == 999) {
this.outputInt (-3);
this.outputInt (iA);
this.outputInt (iB);
this.outputInt (iC);
this.outputInt (color);
return;
}if ((check & 1) != 0) this.outputEdge (iA, iB, color);
if ((check & 2) != 0) this.outputEdge (iB, iC, color);
if ((check & 4) != 0) this.outputEdge (iC, iA, color);
}, "~N,~N,~N,~N,~N");
});
