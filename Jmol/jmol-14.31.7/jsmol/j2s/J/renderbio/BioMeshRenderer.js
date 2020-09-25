Clazz.declarePackage ("J.renderbio");
Clazz.load (["J.render.MeshRenderer", "JU.A4", "$.M3", "$.P3", "$.V3"], "J.renderbio.BioMeshRenderer", ["JU.BS", "J.shape.Mesh", "JU.GData", "$.Logger", "$.Normix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.meshes = null;
this.meshReady = null;
this.bsRenderMesh = null;
this.bsr = null;
this.doCap0 = false;
this.doCap1 = false;
this.controlHermites = null;
this.wingHermites = null;
this.radiusHermites = null;
this.norm = null;
this.wing = null;
this.wing1 = null;
this.wingT = null;
this.aa = null;
this.pt = null;
this.pt1 = null;
this.ptPrev = null;
this.ptNext = null;
this.mat = null;
this.bsTemp = null;
this.norml = null;
Clazz.instantialize (this, arguments);
}, J.renderbio, "BioMeshRenderer", J.render.MeshRenderer);
Clazz.prepareFields (c$, function () {
this.norm =  new JU.V3 ();
this.wing =  new JU.V3 ();
this.wing1 =  new JU.V3 ();
this.wingT =  new JU.V3 ();
this.aa =  new JU.A4 ();
this.pt =  new JU.P3 ();
this.pt1 =  new JU.P3 ();
this.ptPrev =  new JU.P3 ();
this.ptNext =  new JU.P3 ();
this.mat =  new JU.M3 ();
this.norml =  new JU.V3 ();
});
Clazz.overrideMethod (c$, "render", 
function () {
return false;
});
Clazz.defineMethod (c$, "initialize", 
function (bsr, bioShape, monomerCount) {
this.bsr = bsr;
this.bsRenderMesh = JU.BS.newN (monomerCount);
this.meshReady = bioShape.meshReady;
this.meshes = bioShape.meshes;
}, "J.render.ShapeRenderer,J.shapebio.BioShape,~N");
Clazz.defineMethod (c$, "renderBioMesh", 
 function (mesh) {
if (mesh.normalsTemp != null) {
mesh.setNormixes (mesh.normalsTemp);
mesh.normalsTemp = null;
} else if (mesh.normixes == null) {
mesh.initialize (1073741958, null, null);
}this.renderMesh2 (mesh);
}, "J.shape.Mesh");
Clazz.defineMethod (c$, "setFancyRibbon", 
function (i) {
try {
if ((this.meshes[i] == null || !this.meshReady[i]) && !this.createMesh (i, this.bsr.madBeg, this.bsr.madMid, this.bsr.madEnd, this.bsr.aspectRatio, this.bsr.isNucleic ? 4 : 7)) return;
this.meshes[i].setColix (this.bsr.colix);
this.meshes[i].setColixBack (this.bsr.colixBack);
this.bsRenderMesh.set (i);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.bsRenderMesh.clear (i);
this.meshes[i] = null;
JU.Logger.error ("render mesh error hermiteRibbon: " + e.toString ());
} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "setFancyConic", 
function (i, tension) {
try {
if ((this.meshes[i] == null || !this.meshReady[i]) && !this.createMesh (i, this.bsr.madBeg, this.bsr.madMid, this.bsr.madEnd, 1, tension)) return;
this.meshes[i].setColix (this.bsr.colix);
this.bsRenderMesh.set (i);
return;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.bsRenderMesh.clear (i);
this.meshes[i] = null;
JU.Logger.error ("render mesh error hermiteConic: " + e.toString ());
} else {
throw e;
}
}
}, "~N,~N");
Clazz.defineMethod (c$, "setFancyArrowHead", 
function (i) {
try {
this.doCap0 = true;
this.doCap1 = false;
if ((this.meshes[i] == null || !this.meshReady[i]) && !this.createMesh (i, Clazz.doubleToInt (Math.floor (this.bsr.madBeg * 1.2)), Clazz.doubleToInt (Math.floor (this.bsr.madBeg * 0.6)), 0, (this.bsr.aspectRatio == 1 ? this.bsr.aspectRatio : this.bsr.aspectRatio / 2), 7)) return;
this.meshes[i].setColix (this.bsr.colix);
this.bsRenderMesh.set (i);
return;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.bsRenderMesh.clear (i);
this.meshes[i] = null;
JU.Logger.error ("render mesh error hermiteArrowHead: " + e.toString ());
} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "createMesh", 
 function (i, madBeg, madMid, madEnd, aspectRatio, tension) {
this.bsr.setNeighbors (i);
var cp = this.bsr.controlPoints;
if (cp[i].distanceSquared (cp[this.bsr.iNext]) == 0) return false;
var isEccentric = (aspectRatio != 1 && this.bsr.wingVectors != null);
var isFlatMesh = (aspectRatio == 0);
var isElliptical = (this.bsr.cartoonsFancy || this.bsr.hermiteLevel >= 6);
var nHermites = (this.bsr.hermiteLevel + 1) * 2 + 1;
var nPer = (isFlatMesh ? 4 : (this.bsr.hermiteLevel + 1) * 4 - 2);
var angle = ((isFlatMesh ? 3.141592653589793 / (nPer - 1) : 6.283185307179586 / nPer));
var mesh = this.meshes[i] =  new J.shape.Mesh ().mesh1 (this.vwr, "mesh_" + this.shapeID + "_" + i, 0, i);
var variableRadius = (madBeg != madMid || madMid != madEnd);
if (this.controlHermites == null || this.controlHermites.length < nHermites + 1) {
this.controlHermites =  new Array (nHermites + 1);
}JU.GData.getHermiteList (tension, cp[this.bsr.iPrev], cp[i], cp[this.bsr.iNext], cp[this.bsr.iNext2], cp[this.bsr.iNext3], this.controlHermites, 0, nHermites, true);
if (this.wingHermites == null || this.wingHermites.length < nHermites + 1) {
this.wingHermites =  new Array (nHermites + 1);
}this.wing.setT (this.bsr.wingVectors[this.bsr.iPrev]);
if (madEnd == 0) this.wing.scale (2.0);
JU.GData.getHermiteList (tension, this.wing, this.bsr.wingVectors[i], this.bsr.wingVectors[this.bsr.iNext], this.bsr.wingVectors[this.bsr.iNext2], this.bsr.wingVectors[this.bsr.iNext3], this.wingHermites, 0, nHermites, false);
var radius1 = madBeg / 2000;
var radius2 = madMid / 2000;
var radius3 = madEnd / 2000;
if (variableRadius) {
if (this.radiusHermites == null || this.radiusHermites.length < ((nHermites + 1) >> 1) + 1) {
this.radiusHermites =  new Array (((nHermites + 1) >> 1) + 1);
}this.ptPrev.set (radius1, radius1, 0);
this.pt.set (radius1, radius2, 0);
this.pt1.set (radius2, radius3, 0);
this.ptNext.set (radius3, radius3, 0);
JU.GData.getHermiteList (4, this.ptPrev, this.pt, this.pt1, this.ptNext, this.ptNext, this.radiusHermites, 0, (nHermites + 1) >> 1, true);
}var nPoints = 0;
var iMid = nHermites >> 1;
var kpt1 = Clazz.doubleToInt ((nPer + 2) / 4);
var kpt2 = Clazz.doubleToInt ((3 * nPer + 2) / 4);
var mode = (!isEccentric ? 0 : isFlatMesh ? 1 : isElliptical ? 2 : 3);
var useMat = (mode == 0 || mode == 3);
for (var p = 0; p < nHermites; p++) {
this.norm.sub2 (this.controlHermites[p + 1], this.controlHermites[p]);
var scale = (!variableRadius ? radius1 : p < iMid ? this.radiusHermites[p].x : this.radiusHermites[p - iMid].y);
this.wing.setT (this.wingHermites[p]);
this.wing1.setT (this.wing);
switch (mode) {
case 1:
break;
case 2:
this.wing1.cross (this.norm, this.wing);
this.wing1.normalize ();
this.wing1.scale (this.wing.length () / aspectRatio);
break;
case 3:
this.wing.scale (2 / aspectRatio);
this.wing1.sub (this.wing);
break;
case 0:
this.wing.cross (this.wing, this.norm);
this.wing.normalize ();
break;
}
this.wing.scale (scale);
this.wing1.scale (scale);
if (useMat) {
this.aa.setVA (this.norm, angle);
this.mat.setAA (this.aa);
}this.pt1.setT (this.controlHermites[p]);
var theta = (isFlatMesh ? 0 : angle);
for (var k = 0; k < nPer; k++, theta += angle) {
if (useMat && k > 0) this.mat.rotate (this.wing);
switch (mode) {
case 1:
this.wingT.setT (this.wing1);
this.wingT.scale (Math.cos (theta));
break;
case 2:
this.wingT.setT (this.wing1);
this.wingT.scale (Math.sin (theta));
this.wingT.scaleAdd2 (Math.cos (theta), this.wing, this.wingT);
break;
case 3:
this.wingT.setT (this.wing);
if (k == kpt1 || k == kpt2) this.wing1.scale (-1);
this.wingT.add (this.wing1);
break;
case 0:
this.wingT.setT (this.wing);
break;
}
this.pt.add2 (this.pt1, this.wingT);
mesh.addV (this.pt, true);
}
if (p > 0) {
var nLast = (isFlatMesh ? nPer - 1 : nPer);
for (var k = 0; k < nLast; k++) {
var a = nPoints - nPer + k;
var b = nPoints - nPer + ((k + 1) % nPer);
var c = nPoints + ((k + 1) % nPer);
var d = nPoints + k;
if (k < Clazz.doubleToInt (nLast / 2)) mesh.addQuad (a, b, c, d);
 else mesh.addQuad (b, c, d, a);
}
}nPoints += nPer;
}
if (!isFlatMesh) {
var nPointsPreCap = nPoints;
if (this.doCap0) {
var vs = mesh.getVertices ();
for (var l = 0; l < nPer; l++) mesh.addV (vs[l], true);

nPoints += nPer;
for (var k = this.bsr.hermiteLevel * 2; --k >= 0; ) mesh.addQuad (nPoints - nPer + k + 2, nPoints - nPer + k + 1, nPoints - nPer + (nPer - k) % nPer, nPoints - k - 1);

}if (this.doCap1) {
var vs = mesh.getVertices ();
for (var l = 0; l < nPer; l++) mesh.addV (vs[nPointsPreCap - nPer + l], true);

nPoints += nPer;
for (var k = this.bsr.hermiteLevel * 2; --k >= 0; ) mesh.addQuad (nPoints - k - 1, nPoints - nPer + (nPer - k) % nPer, nPoints - nPer + k + 1, nPoints - nPer + k + 2);

}}this.meshReady[i] = true;
this.adjustCartoonSeamNormals (i, nPer);
mesh.setVisibilityFlags (1);
return true;
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "adjustCartoonSeamNormals", 
function (i, nPer) {
if (this.bsTemp == null) this.bsTemp = JU.Normix.newVertexBitSet ();
if (i == this.bsr.iNext - 1 && this.bsr.iNext < this.bsr.monomerCount && this.bsr.monomers[i].getStrucNo () == this.bsr.monomers[this.bsr.iNext].getStrucNo () && this.meshReady[i] && this.meshReady[this.bsr.iNext]) {
try {
var normals2 = this.meshes[this.bsr.iNext].getNormalsTemp ();
var normals = this.meshes[i].getNormalsTemp ();
var normixCount = normals.length;
if (this.doCap0) normixCount -= nPer;
for (var j = 1; j <= nPer; ++j) {
this.norml.add2 (normals[normixCount - j], normals2[nPer - j]);
this.norml.normalize ();
normals[normixCount - j].setT (this.norml);
normals2[nPer - j].setT (this.norml);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}}, "~N,~N");
Clazz.defineMethod (c$, "renderMeshes", 
function () {
if (this.bsRenderMesh.isEmpty ()) return;
this.setColix (this.bsr.colix);
for (var i = this.bsRenderMesh.nextSetBit (0); i >= 0; i = this.bsRenderMesh.nextSetBit (i + 1)) this.renderBioMesh (this.meshes[i]);

});
Clazz.defineMethod (c$, "initBS", 
function () {
this.bsRenderMesh.clearAll ();
});
Clazz.defineMethod (c$, "check", 
function (doCap0, doCap1) {
this.doCap0 = doCap0;
this.doCap1 = doCap1;
return (this.exportType == 1 || this.checkDiameter (this.bsr.diameterBeg) || this.checkDiameter (this.bsr.diameterMid) || this.checkDiameter (this.bsr.diameterEnd));
}, "~B,~B");
Clazz.defineMethod (c$, "checkDiameter", 
 function (d) {
return (this.bsr.isHighRes && d > 3 || d >= 8);
}, "~N");
Clazz.defineStatics (c$,
"ABSOLUTE_MIN_MESH_SIZE", 3,
"MIN_MESH_RENDER_SIZE", 8,
"MODE_TUBE", 0,
"MODE_FLAT", 1,
"MODE_ELLIPTICAL", 2,
"MODE_NONELLIPTICAL", 3);
});
