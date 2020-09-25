Clazz.declarePackage ("J.shapespecial");
Clazz.load (["J.shape.AtomShape", "JU.AU", "$.BS", "$.P3", "$.V3"], "J.shapespecial.Polyhedra", ["java.lang.Boolean", "$.Float", "java.util.Arrays", "$.Hashtable", "JU.Lst", "$.Measure", "$.P4", "$.PT", "$.SB", "J.api.Interface", "J.c.PAL", "JS.SV", "J.shapespecial.Polyhedron", "JU.BSUtil", "$.C", "$.Logger", "$.Normix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.otherAtoms = null;
this.normalsT = null;
this.planesT = null;
this.polyhedronCount = 0;
this.polyhedrons = null;
this.drawEdges = 0;
this.radius = 0;
this.radiusMin = 0;
this.pointScale = 0;
this.nVertices = 0;
this.faceCenterOffset = 0;
this.isCollapsed = false;
this.isFull = false;
this.iHaveCenterBitSet = false;
this.bondedOnly = false;
this.haveBitSetVertices = false;
this.centers = null;
this.thisID = null;
this.center = null;
this.bsVertices = null;
this.bsVertexCount = null;
this.useUnitCell = false;
this.nPoints = 0;
this.planarParam = 0;
this.info = null;
this.distanceRef = 0;
this.modelIndex = 0;
this.isAuto = false;
this.explicitFaces = null;
this.bsPolys = null;
this.vAB = null;
this.vAC = null;
this.vBC = null;
Clazz.instantialize (this, arguments);
}, J.shapespecial, "Polyhedra", J.shape.AtomShape, java.util.Comparator);
Clazz.prepareFields (c$, function () {
this.otherAtoms =  new Array (498);
this.normalsT =  new Array (251);
this.planesT = JU.AU.newInt2 (250);
this.polyhedrons =  new Array (32);
this.bsPolys =  new JU.BS ();
this.vAB =  new JU.V3 ();
this.vAC =  new JU.V3 ();
this.vBC =  new JU.V3 ();
});
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
var da = (a[0] == null ? 3.4028235E38 : (a[0]).floatValue ());
var db = (b[0] == null ? 3.4028235E38 : (b[0]).floatValue ());
return (da < db ? -1 : da > db ? 1 : 0);
}, "~A,~A");
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if (this.thisID != null) bs =  new JU.BS ();
if ("init" === propertyName) {
this.faceCenterOffset = 0.25;
this.planarParam = NaN;
this.radius = this.radiusMin = this.pointScale = 0.0;
this.nVertices = this.nPoints = 0;
this.modelIndex = -1;
this.bsVertices = null;
this.thisID = null;
this.center = null;
this.centers = null;
this.info = null;
this.bsVertexCount =  new JU.BS ();
this.bondedOnly = this.isCollapsed = this.isFull = this.iHaveCenterBitSet = this.useUnitCell = this.isAuto = this.haveBitSetVertices = false;
if (Boolean.TRUE === value) this.drawEdges = 0;
return;
}if ("definedFaces" === propertyName) {
this.setDefinedFaces ((value)[1], (value)[0]);
return;
}if ("generate" === propertyName) {
if (!this.iHaveCenterBitSet && bs != null && !bs.isEmpty ()) {
this.centers = bs;
this.iHaveCenterBitSet = true;
}this.deletePolyhedra ();
this.buildPolyhedra ();
return;
}if ("thisID" === propertyName) {
this.thisID = value;
return;
}if ("center" === propertyName) {
this.center = value;
return;
}if ("offset" === propertyName) {
if (this.thisID != null) this.offsetPolyhedra (value);
return;
}if ("scale" === propertyName) {
if (this.thisID != null) this.scalePolyhedra ((value).floatValue ());
return;
}if ("model" === propertyName) {
this.modelIndex = (value).intValue ();
return;
}if ("collapsed" === propertyName) {
this.isCollapsed = true;
return;
}if ("full" === propertyName) {
this.isFull = true;
return;
}if ("nVertices" === propertyName) {
var n = (value).intValue ();
if (n < 0) {
if (-n >= this.nVertices) {
this.bsVertexCount.setBits (this.nVertices, 1 - n);
this.nVertices = -n;
}} else {
this.bsVertexCount.set (this.nVertices = n);
}return;
}if ("centers" === propertyName) {
this.centers = value;
this.iHaveCenterBitSet = true;
return;
}if ("unitCell" === propertyName) {
this.useUnitCell = true;
return;
}if ("to" === propertyName) {
this.bsVertices = value;
return;
}if ("toBitSet" === propertyName) {
this.bsVertices = value;
this.haveBitSetVertices = true;
return;
}if ("toVertices" === propertyName) {
var points = value;
this.nPoints = Math.min (points.length, 250);
for (var i = this.nPoints; --i >= 0; ) this.otherAtoms[i] = points[i];

return;
}if ("faceCenterOffset" === propertyName) {
this.faceCenterOffset = (value).floatValue ();
return;
}if ("distanceFactor" === propertyName) {
return;
}if ("planarParam" === propertyName) {
this.planarParam = (value).floatValue ();
return;
}if ("bonds" === propertyName) {
this.bondedOnly = true;
return;
}if ("info" === propertyName) {
this.info = value;
this.centers = (this.info.containsKey ("center") ? null : JU.BSUtil.newAndSetBit ((this.info.get ("atomIndex")).intValue));
this.iHaveCenterBitSet = (this.centers != null);
return;
}if ("delete" === propertyName) {
if (!this.iHaveCenterBitSet) this.centers = bs;
this.deletePolyhedra ();
return;
}if ("on" === propertyName) {
if (!this.iHaveCenterBitSet) this.centers = bs;
this.setVisible (true);
return;
}if ("off" === propertyName) {
if (!this.iHaveCenterBitSet) this.centers = bs;
this.setVisible (false);
return;
}if ("noedges" === propertyName) {
this.drawEdges = 0;
return;
}if ("edges" === propertyName) {
this.drawEdges = 1;
return;
}if ("edgesOnly" === propertyName) {
this.drawEdges = 3;
return;
}if ("frontedges" === propertyName) {
this.drawEdges = 2;
return;
}if (propertyName.indexOf ("color") == 0) {
bs = ("colorThis" === propertyName && this.iHaveCenterBitSet ? this.centers : this.andBitSet (bs));
var isPhase = ("colorPhase" === propertyName);
var cvalue = (isPhase ? (value)[1] : value);
var colixEdge = (isPhase ? JU.C.getColix (((value)[0]).intValue ()) : 0);
var colix = JU.C.getColixO (isPhase ? cvalue : value);
var p;
var bs1 = this.findPolyBS (bs);
for (var i = bs1.nextSetBit (0); i >= 0; i = bs1.nextSetBit (i + 1)) {
p = this.polyhedrons[i];
if (p.id == null) {
p.colixEdge = colixEdge;
} else {
p.colixEdge = colixEdge;
p.colix = colix;
}}
if (this.thisID != null) return;
value = cvalue;
propertyName = "color";
}if (propertyName.indexOf ("translucency") == 0) {
var isTranslucent = (value.equals ("translucent"));
if (this.thisID != null) {
var bs1 = this.findPolyBS (bs);
var p;
for (var i = bs1.nextSetBit (0); i >= 0; i = bs1.nextSetBit (i + 1)) {
p = this.polyhedrons[i];
p.colix = JU.C.getColixTranslucent3 (p.colix, isTranslucent, this.translucentLevel);
if (p.colixEdge != 0) p.colixEdge = JU.C.getColixTranslucent3 (p.colixEdge, isTranslucent, this.translucentLevel);
}
return;
}bs = ("translucentThis".equals (value) && this.iHaveCenterBitSet ? this.centers : this.andBitSet (bs));
if (value.equals ("translucentThis")) value = "translucent";
}if ("radius" === propertyName) {
var v = (value).floatValue ();
if (v <= 0) {
this.isAuto = true;
v = (v == 0 ? 6 : -v);
}this.radius = v;
return;
}if ("radius1" === propertyName) {
this.radiusMin = this.radius;
this.radius = (value).floatValue ();
return;
}if ("points" === propertyName) {
this.pointScale = (value).floatValue ();
this.pointsPolyhedra (bs, this.pointScale);
return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
for (var i = this.polyhedronCount; --i >= 0; ) {
var p = this.polyhedrons[i];
p.info = null;
if (p.modelIndex > modelIndex) {
p.modelIndex--;
} else if (p.modelIndex == modelIndex) {
this.polyhedronCount--;
this.polyhedrons = JU.AU.deleteElements (this.polyhedrons, i, 1);
}}
}this.setPropAS (propertyName, value, bs);
}, "~S,~O,JU.BS");
Clazz.defineMethod (c$, "setDefinedFaces", 
 function (points, faces) {
var bsUsed =  new JU.BS ();
for (var i = faces.length; --i >= 0; ) {
var face = faces[i];
for (var j = face.length; --j >= 0; ) bsUsed.set (face[j]);

}
var bsNot = JU.BSUtil.newBitSet2 (0, bsUsed.length ());
bsNot.andNot (bsUsed);
var nNot = bsNot.cardinality ();
if (nNot > 0) {
var np = points.length;
var mapOldToNew =  Clazz.newIntArray (np, 0);
var mapNewToOld =  Clazz.newIntArray (np, 0);
var n = 0;
for (var i = 0; i < np; i++) if (!bsNot.get (i)) {
mapNewToOld[n] = i;
mapOldToNew[i] = n++;
}
var pnew =  new Array (n);
for (var i = 0; i < n; i++) pnew[i] = points[mapNewToOld[i]];

points = pnew;
for (var i = faces.length; --i >= 0; ) {
var face = faces[i];
for (var j = face.length; --j >= 0; ) face[j] = mapOldToNew[face[j]];

}
}var n = this.nPoints = points.length;
this.center =  new JU.P3 ();
this.otherAtoms =  new Array (n + 1);
if (n > 0) {
this.otherAtoms[n] = this.center;
for (var i = 0; i < n; i++) this.center.add (this.otherAtoms[i] = points[i]);

this.center.scale (1 / n);
}this.explicitFaces = faces;
}, "~A,~A");
Clazz.defineMethod (c$, "pointsPolyhedra", 
 function (bs, pointScale) {
bs = this.findPolyBS (this.thisID == null ? bs : null);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.polyhedrons[i].pointScale = pointScale;

}, "JU.BS,~N");
Clazz.defineMethod (c$, "scalePolyhedra", 
 function (scale) {
var bs = this.findPolyBS (null);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.polyhedrons[i].scale = scale;

}, "~N");
Clazz.defineMethod (c$, "offsetPolyhedra", 
 function (value) {
var bs = this.findPolyBS (null);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.polyhedrons[i].setOffset (JU.P3.newP (value));

}, "JU.P3");
Clazz.overrideMethod (c$, "getIndexFromName", 
function (id) {
if (id != null) for (var i = this.polyhedronCount; --i >= 0; ) if (id.equalsIgnoreCase (this.polyhedrons[i].id)) return i;

return -1;
}, "~S");
Clazz.overrideMethod (c$, "getProperty", 
function (property, i) {
var info = this.polyhedrons[i].getInfo (this.vwr, property);
return (property.equalsIgnoreCase ("info") ? info : info.get (property));
}, "~S,~N");
Clazz.overrideMethod (c$, "getPropertyData", 
function (property, data) {
var iatom = (Clazz.instanceOf (data[0], Integer) ? (data[0]).intValue () : -2147483648);
var id = (Clazz.instanceOf (data[0], String) ? data[0] : null);
var p;
if (property === "index") {
var i = this.getIndexFromName (id);
if (i >= 0) data[1] = Integer.$valueOf (i);
return (i >= 0);
}if (property === "checkID") {
return this.checkID (id);
}if (property === "getAtomsWithin") {
p = this.findPoly (id, iatom, true);
if (p == null) return false;
data[2] = this.getAtomsWithin (p, (data[1]).floatValue ());
return true;
}if (property === "info") {
p = this.findPoly (id, iatom, true);
if (p == null) return false;
data[1] = p.getInfo (this.vwr, "info");
return true;
}if (property === "points") {
p = this.findPoly (id, iatom, false);
if (p == null) return false;
data[1] = p.vertices;
return true;
}if (property === "symmetry") {
var bsSelected = data[2];
var s = "";
for (var i = 0; i < this.polyhedronCount; i++) {
p = this.polyhedrons[i];
if (p.id == null ? id != null || bsSelected != null && !bsSelected.get (p.centralAtom.i) : id != null && !JU.PT.isLike (p.id, id)) continue;
s += (i + 1) + "\t" + p.getSymmetry (this.vwr, true) + "\n";
}
data[1] = s;
return true;
}if (property === "move") {
var mat = data[1];
if (mat == null) return false;
var bsMoved = data[0];
var bs = this.findPolyBS (bsMoved);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.polyhedrons[i].move (mat, bsMoved);

return true;
}if (property === "getCenters") {
var smiles = data[1];
var bsSelected = data[2];
var sm = (smiles == null ? null : this.vwr.getSmilesMatcher ());
if (sm != null) smiles = sm.cleanSmiles (smiles);
var nv = (smiles != null ? JU.PT.countChar (smiles, '*') : iatom);
if (nv == 0) nv = -2147483648;
var bs =  new JU.BS ();
if (smiles == null || sm != null) for (var i = this.polyhedronCount; --i >= 0; ) {
p = this.polyhedrons[i];
if (p.id != null) continue;
if (nv != (nv > 0 ? p.nVertices : nv > -2147483648 ? -p.faces.length : nv)) continue;
iatom = p.centralAtom.i;
if (bsSelected != null && !bsSelected.get (iatom)) continue;
if (smiles == null) {
bs.set (iatom);
continue;
}p.getSymmetry (this.vwr, false);
var smiles0 = p.polySmiles;
try {
if (sm.areEqual (smiles, smiles0) > 0) bs.set (iatom);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
}
data[1] = bs;
return true;
}if (property === "allInfo") {
var info =  new JU.Lst ();
for (var i = this.polyhedronCount; --i >= 0; ) info.addLast (this.polyhedrons[i].getInfo (this.vwr, "info"));

data[1] = info;
return true;
}return this.getPropShape (property, data);
}, "~S,~A");
Clazz.defineMethod (c$, "getAtomsWithin", 
 function (p, offset) {
var faces = p.faces;
var vertices = p.vertices;
var center = (p.center == null ? p.centralAtom : p.center);
if (p.planes == null) {
var vNorm =  new JU.V3 ();
var vAB =  new JU.V3 ();
p.planes =  new Array (faces.length);
for (var iface = faces.length; --iface >= 0; ) {
var plane = p.planes[iface] =  new JU.P4 ();
JU.Measure.getPlaneThroughPoints (vertices[faces[iface][0]], vertices[faces[iface][1]], vertices[faces[iface][2]], vNorm, vAB, plane);
}
}var maxDistance = 0;
for (var i = p.nVertices; --i >= 0; ) {
var d = vertices[i].distance (center);
if (d > maxDistance) maxDistance = d;
}
var bsAtoms = JU.BSUtil.copy (this.vwr.getAtomsNearPt (maxDistance + offset, center));
var atoms = this.vwr.ms.at;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
for (var f = faces.length; --f >= 0; ) {
System.out.println (JU.Measure.distanceToPlane (p.planes[f], atoms[i]));
if (JU.Measure.distanceToPlane (p.planes[f], atoms[i]) > offset + 0.001) {
bsAtoms.clear (i);
break;
}}
}
return bsAtoms;
}, "J.shapespecial.Polyhedron,~N");
Clazz.defineMethod (c$, "checkID", 
 function (thisID) {
this.thisID = thisID;
return (this.findPolyBS (null).cardinality () > 0);
}, "~S");
Clazz.defineMethod (c$, "findPoly", 
 function (id, iatom, allowCollapsed) {
for (var i = this.polyhedronCount; --i >= 0; ) {
var p = this.polyhedrons[i];
if (p.id == null ? p.centralAtom.i == iatom : p.id.equalsIgnoreCase (id)) return (allowCollapsed || !this.polyhedrons[i].collapsed ? this.polyhedrons[i] : null);
}
return null;
}, "~S,~N,~B");
Clazz.defineMethod (c$, "findPolyBS", 
 function (bsCenters) {
var bs = this.bsPolys;
bs.clearAll ();
var p;
for (var i = this.polyhedronCount; --i >= 0; ) {
p = this.polyhedrons[i];
if (p.id == null ? bsCenters != null && bsCenters.get (p.centralAtom.i) : this.isMatch (p.id)) bs.set (i);
}
return bs;
}, "JU.BS");
Clazz.defineMethod (c$, "isMatch", 
 function (id) {
return this.thisID != null && JU.PT.isMatch (id.toLowerCase (), this.thisID.toLowerCase (), true, true);
}, "~S");
Clazz.overrideMethod (c$, "getShapeDetail", 
function () {
var lst =  new JU.Lst ();
for (var i = 0; i < this.polyhedronCount; i++) lst.addLast (this.polyhedrons[i].getInfo (this.vwr, "info"));

return lst;
});
Clazz.defineMethod (c$, "andBitSet", 
 function (bs) {
var bsCenters =  new JU.BS ();
for (var i = this.polyhedronCount; --i >= 0; ) {
var p = this.polyhedrons[i];
if (p.id == null) bsCenters.set (p.centralAtom.i);
}
bsCenters.and (bs);
return bsCenters;
}, "JU.BS");
Clazz.defineMethod (c$, "deletePolyhedra", 
 function () {
var newCount = 0;
var pid = J.c.PAL.pidOf (null);
var bs = this.findPolyBS (this.centers);
for (var i = 0; i < this.polyhedronCount; ++i) {
var p = this.polyhedrons[i];
if (bs.get (i)) {
if (this.colixes != null && p.id == null) this.setColixAndPalette (0, pid, p.centralAtom.i);
continue;
}this.polyhedrons[newCount++] = p;
}
for (var i = newCount; i < this.polyhedronCount; ++i) this.polyhedrons[i] = null;

this.polyhedronCount = newCount;
});
Clazz.defineMethod (c$, "setVisible", 
 function (visible) {
var bs = this.findPolyBS (this.centers);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var p = this.polyhedrons[i];
p.visible = visible;
if (p.centralAtom != null) this.atoms[p.centralAtom.i].setShapeVisibility (this.vf, visible);
}
}, "~B");
Clazz.defineMethod (c$, "buildPolyhedra", 
 function () {
var p = null;
if (this.thisID != null) {
if (JU.PT.isWild (this.thisID)) return;
if (this.center != null) {
if (this.nPoints == 0) this.setPointsFromBitset ();
p = this.validatePolyhedron (this.center, this.nPoints);
}} else if (this.info != null && this.info.containsKey ("id")) {
var o = this.info.get ("id");
this.thisID = (Clazz.instanceOf (o, JS.SV) ? (o).asString () : o.toString ());
p =  new J.shapespecial.Polyhedron ().setInfo (this.vwr, this.info, this.vwr.ms.at);
}if (p != null) {
this.addPolyhedron (p);
return;
}var useBondAlgorithm = (this.radius == 0 || this.bondedOnly);
var buildMode = (this.info != null ? 6 : this.nPoints > 0 ? 2 : this.haveBitSetVertices ? 4 : this.useUnitCell ? 5 : useBondAlgorithm ? 1 : 3);
var iter = (buildMode == 3 ? this.ms.getSelectedAtomIterator (null, false, false, false, false) : null);
for (var i = this.centers.nextSetBit (0); i >= 0; i = this.centers.nextSetBit (i + 1)) {
var atom = this.atoms[i];
p = null;
switch (buildMode) {
case 4:
p = this.constructBitSetPolyhedron (atom);
break;
case 5:
p = this.constructUnitCellPolygon (atom, useBondAlgorithm);
break;
case 1:
p = this.constructBondsPolyhedron (atom, 0);
break;
case 3:
this.vwr.setIteratorForAtom (iter, i, this.radius);
p = this.constructRadiusPolyhedron (atom, iter);
break;
case 6:
p =  new J.shapespecial.Polyhedron ().setInfo (this.vwr, this.info, this.vwr.ms.at);
break;
case 2:
p = this.validatePolyhedron (atom, this.nPoints);
break;
}
if (p != null) this.addPolyhedron (p);
if (this.haveBitSetVertices) break;
}
if (iter != null) iter.release ();
});
Clazz.defineMethod (c$, "setPointsFromBitset", 
 function () {
if (this.bsVertices != null) for (var i = this.bsVertices.nextSetBit (0); i >= 0 && this.nPoints < 250; i = this.bsVertices.nextSetBit (i + 1)) this.otherAtoms[this.nPoints++] = this.atoms[i];

});
Clazz.defineMethod (c$, "addPolyhedron", 
 function (p) {
if (this.polyhedronCount == this.polyhedrons.length) this.polyhedrons = JU.AU.doubleLength (this.polyhedrons);
this.polyhedrons[this.polyhedronCount++] = p;
}, "J.shapespecial.Polyhedron");
Clazz.defineMethod (c$, "constructBondsPolyhedron", 
 function (atom, otherAtomCount) {
this.distanceRef = 0;
if (otherAtomCount == 0) {
var bonds = atom.bonds;
if (bonds == null) return null;
var r2 = this.radius * this.radius;
var r1 = this.radiusMin * this.radiusMin;
var r;
for (var i = bonds.length; --i >= 0; ) {
var bond = bonds[i];
if (!bond.isCovalent ()) continue;
var other = bond.getOtherAtom (atom);
if (this.bsVertices != null && !this.bsVertices.get (other.i) || this.radius > 0 && ((r = other.distanceSquared (atom)) > r2 || r < r1)) continue;
this.otherAtoms[otherAtomCount++] = other;
if (otherAtomCount >= 250) return null;
}
}if (this.isAuto) otherAtomCount = this.setGap (atom, otherAtomCount);
return (otherAtomCount < 3 || this.nVertices > 0 && !this.bsVertexCount.get (otherAtomCount) ? null : this.validatePolyhedron (atom, otherAtomCount));
}, "JM.Atom,~N");
Clazz.defineMethod (c$, "constructUnitCellPolygon", 
 function (atom, useBondAlgorithm) {
var unitcell = this.vwr.ms.getUnitCellForAtom (atom.i);
if (unitcell == null) return null;
var bsAtoms = JU.BSUtil.copy (this.vwr.getModelUndeletedAtomsBitSet (atom.mi));
if (this.bsVertices != null) bsAtoms.and (this.bsVertices);
if (bsAtoms.isEmpty ()) return null;
var iter = unitcell.getIterator (this.vwr, atom, this.atoms, bsAtoms, useBondAlgorithm ? 5 : this.radius);
if (!useBondAlgorithm) return this.constructRadiusPolyhedron (atom, iter);
var myBondingRadius = atom.getBondingRadius ();
if (myBondingRadius == 0) return null;
var bondTolerance = this.vwr.getFloat (570425348);
var minBondDistance = (this.radiusMin == 0 ? this.vwr.getFloat (570425364) : this.radiusMin);
var minBondDistance2 = minBondDistance * minBondDistance;
var otherAtomCount = 0;
outer : while (iter.hasNext ()) {
var other = this.atoms[iter.next ()];
var otherRadius = other.getBondingRadius ();
var pt = iter.getPosition ();
var distance2 = atom.distanceSquared (pt);
if (!this.vwr.ms.isBondable (myBondingRadius, otherRadius, distance2, minBondDistance2, bondTolerance)) continue;
for (var i = 0; i < otherAtomCount; i++) if (this.otherAtoms[i].distanceSquared (pt) < 0.01) continue outer;

this.otherAtoms[otherAtomCount++] = pt;
if (otherAtomCount >= 250) return null;
}
return this.constructBondsPolyhedron (atom, otherAtomCount);
}, "JM.Atom,~B");
Clazz.defineMethod (c$, "constructBitSetPolyhedron", 
 function (atom) {
this.bsVertices.clear (atom.i);
if (this.bsVertices.cardinality () >= 250) return null;
var otherAtomCount = 0;
this.distanceRef = 0;
for (var i = this.bsVertices.nextSetBit (0); i >= 0; i = this.bsVertices.nextSetBit (i + 1)) this.otherAtoms[otherAtomCount++] = this.atoms[i];

return this.validatePolyhedron (atom, otherAtomCount);
}, "JM.Atom");
Clazz.defineMethod (c$, "constructRadiusPolyhedron", 
 function (atom, iter) {
var otherAtomCount = 0;
this.distanceRef = this.radius;
var r2 = this.radius * this.radius;
var r2min = this.radiusMin * this.radiusMin;
outer : while (iter.hasNext ()) {
var other = this.atoms[iter.next ()];
var pt = iter.getPosition ();
if (pt == null) {
pt = other;
if (this.bsVertices != null && !this.bsVertices.get (other.i)) continue;
}var r = atom.distanceSquared (pt);
if (other.altloc != atom.altloc && other.altloc.charCodeAt (0) != 0 && atom.altloc.charCodeAt (0) != 0 || r > r2 || r < r2min) continue;
if (otherAtomCount == 250) break;
for (var i = 0; i < otherAtomCount; i++) if (this.otherAtoms[i].distanceSquared (pt) < 0.01) continue outer;

this.otherAtoms[otherAtomCount++] = pt;
}
if (this.isAuto) otherAtomCount = this.setGap (atom, otherAtomCount);
return (otherAtomCount < 3 || this.nVertices > 0 && !this.bsVertexCount.get (otherAtomCount) ? null : this.validatePolyhedron (atom, otherAtomCount));
}, "JM.Atom,J.api.AtomIndexIterator");
Clazz.defineMethod (c$, "setGap", 
 function (atom, otherAtomCount) {
if (otherAtomCount < 4) return otherAtomCount;
var dist =  Clazz.newArray (250, 2, null);
for (var i = 0; i < otherAtomCount; i++) dist[i][0] = Float.$valueOf (atom.distance ((dist[i][1] = this.otherAtoms[i])));

java.util.Arrays.sort (dist, this);
var maxGap = 0;
var iMax = 0;
var n = otherAtomCount;
var dlast = (dist[0][0]).floatValue ();
this.otherAtoms[0] = dist[0][1];
for (var i = 1; i < n; i++) {
var d = (dist[i][0]).floatValue ();
var gap = d - dlast;
this.otherAtoms[i] = dist[i][1];
if (JU.Logger.debugging) JU.Logger.info ("polyhedron d=" + d + " " + this.otherAtoms[i]);
if (gap > maxGap) {
if (JU.Logger.debugging) JU.Logger.info ("polyhedron maxGap=" + gap + " for i=" + i + " d=" + d + " " + this.otherAtoms[i]);
maxGap = gap;
iMax = i;
}dlast = d;
}
return (iMax == 0 ? otherAtomCount : iMax);
}, "JU.P3,~N");
Clazz.defineMethod (c$, "validatePolyhedron", 
 function (atomOrPt, vertexCount) {
var points = this.otherAtoms;
var faces = this.explicitFaces;
var faceTriangles;
var normals;
var collapsed = this.isCollapsed;
var triangleCount = 0;
var bsCenterPlanes =  new JU.BS ();
var triangles;
if (faces != null) {
collapsed = false;
faceTriangles = JU.AU.newInt2 (faces.length);
normals =  new Array (faces.length);
for (var i = faces.length; --i >= 0; ) faces[i] = this.fixExplicitFaceWinding (faces[i], i, points, normals);

triangles = (J.api.Interface.getInterface ("JU.MeshCapper", this.vwr, "script")).set (null).triangulateFaces (faces, points, faceTriangles);
triangleCount = triangles.length;
} else {
this.nPoints = vertexCount + 1;
var ni = vertexCount - 2;
var nj = vertexCount - 1;
var planarParam = (Float.isNaN (this.planarParam) ? 0.98 : this.planarParam);
points[vertexCount] = atomOrPt;
var ptAve = JU.P3.newP (atomOrPt);
for (var i = 0; i < vertexCount; i++) ptAve.add (points[i]);

ptAve.scale (1 / (vertexCount + 1));
var ptRef = JU.P3.newP (ptAve);
var bsThroughCenter =  new JU.BS ();
if (this.thisID == null) for (var pt = 0, i = 0; i < ni; i++) for (var j = i + 1; j < nj; j++) for (var k = j + 1; k < vertexCount; k++, pt++) if (this.isPlanar (points[i], points[j], points[k], ptRef)) bsThroughCenter.set (pt);



triangles = this.planesT;
var pTemp =  new JU.P4 ();
var nTemp =  new JU.V3 ();
var offset = this.faceCenterOffset;
var fmax = 247;
var vmax = 250;
var bsTemp = JU.Normix.newVertexBitSet ();
normals = this.normalsT;
var htNormMap =  new java.util.Hashtable ();
var htEdgeMap =  new java.util.Hashtable ();
var lstRejected = (this.isFull ?  new JU.Lst () : null);
var edgeTest =  new Array (3);
var vAC = this.vAC;
for (var i = 0, pt = 0; i < ni; i++) for (var j = i + 1; j < nj; j++) {
for (var k = j + 1; k < vertexCount; k++, pt++) {
if (triangleCount >= fmax) {
JU.Logger.error ("Polyhedron error: maximum face(" + fmax + ") -- reduce RADIUS");
return null;
}if (this.nPoints >= vmax) {
JU.Logger.error ("Polyhedron error: maximum vertex count(" + vmax + ") -- reduce RADIUS");
return null;
}var isThroughCenter = bsThroughCenter.get (pt);
var rpt = (isThroughCenter ? J.shapespecial.Polyhedra.randomPoint : ptAve);
var normal =  new JU.V3 ();
var isWindingOK = JU.Measure.getNormalFromCenter (rpt, points[i], points[j], points[k], !isThroughCenter, normal, vAC);
var t =  Clazz.newIntArray (-1, [isWindingOK ? i : j, isWindingOK ? j : i, k, -7]);
var err = this.checkFacet (points, vertexCount, t, triangleCount, normal, pTemp, nTemp, vAC, htNormMap, htEdgeMap, planarParam, bsTemp, edgeTest);
if (err != 0) {
if (this.isFull && err != 3.4028235E38 && err < 0.5) {
t[3] = Clazz.floatToInt (err * 100);
lstRejected.addLast (t);
}continue;
}normals[triangleCount] = normal;
triangles[triangleCount] = t;
if (isThroughCenter) {
bsCenterPlanes.set (triangleCount++);
} else if (collapsed) {
points[this.nPoints] =  new JU.P3 ();
points[this.nPoints].scaleAdd2 (offset, normal, atomOrPt);
ptRef.setT (points[this.nPoints]);
this.addFacet (i, j, k, ptRef, points, normals, triangles, triangleCount++, this.nPoints, isWindingOK, vAC);
this.addFacet (k, i, j, ptRef, points, normals, triangles, triangleCount++, this.nPoints, isWindingOK, vAC);
this.addFacet (j, k, i, ptRef, points, normals, triangles, triangleCount++, this.nPoints, isWindingOK, vAC);
this.nPoints++;
} else {
triangleCount++;
}}
}

this.nPoints--;
if (JU.Logger.debugging) {
JU.Logger.info ("Polyhedron planeCount=" + triangleCount + " nPoints=" + this.nPoints);
for (var i = 0; i < triangleCount; i++) JU.Logger.info ("Polyhedron " + JU.PT.toJSON ("face[" + i + "]", triangles[i]));

}faces = this.getFaces (triangles, triangleCount, htNormMap);
faceTriangles = this.getFaceTriangles (faces.length, htNormMap, triangleCount);
}return  new J.shapespecial.Polyhedron ().set (this.thisID, this.modelIndex, atomOrPt, points, this.nPoints, vertexCount, triangles, triangleCount, faces, faceTriangles, normals, bsCenterPlanes, collapsed, this.distanceRef, this.pointScale);
}, "JU.P3,~N");
Clazz.defineMethod (c$, "fixExplicitFaceWinding", 
 function (face, ipt, points, normals) {
var n = face.length;
for (var i = 0, nlast = n - 2; i < nlast; i++) {
var a = points[face[i]];
var b = points[face[(i + 1) % n]];
var c = points[face[(i + 2) % n]];
if (JU.Measure.computeAngleABC (a, b, c, true) < 178) {
if (!JU.Measure.getNormalFromCenter (this.center, a, b, c, true, normals[ipt] =  new JU.V3 (), this.vAC)) face = JU.AU.arrayCopyRangeRevI (face, 0, -1);
break;
}}
return face;
}, "~A,~N,~A,~A");
Clazz.defineMethod (c$, "getFaceTriangles", 
 function (n, htNormMap, triangleCount) {
var faceTriangles = JU.AU.newInt2 (n);
if (triangleCount == n) {
for (var i = triangleCount; --i >= 0; ) faceTriangles[i] =  Clazz.newIntArray (-1, [i]);

return faceTriangles;
}var i = 0;
for (var e, $e = htNormMap.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var eo = e.getValue ();
if (eo[2] != null && eo[2] !== e.getKey ()) continue;
var lst = e.getValue ()[1];
n = lst.size ();
var a =  Clazz.newIntArray (n, 0);
for (var j = n; --j >= 0; ) a[j] = lst.get (j).intValue ();

faceTriangles[i++] = a;
}
return faceTriangles;
}, "~N,java.util.Map,~N");
Clazz.defineMethod (c$, "addFacet", 
 function (i, j, k, ptRef, points, normals, faces, planeCount, nRef, isWindingOK, vTemp) {
var normal =  new JU.V3 ();
var ii = isWindingOK ? i : j;
var jj = isWindingOK ? j : i;
JU.Measure.getNormalFromCenter (points[k], ptRef, points[ii], points[jj], false, normal, vTemp);
normals[planeCount] = normal;
faces[planeCount] =  Clazz.newIntArray (-1, [nRef, ii, jj, -2]);
}, "~N,~N,~N,JU.P3,~A,~A,~A,~N,~N,~B,JU.V3");
Clazz.defineMethod (c$, "checkFacet", 
 function (points, nPoints, t, index, norm, pTemp, vNorm, vAC, htNormMap, htEdgeMap, planarParam, bsTemp, edgeTest) {
var i0 = t[0];
JU.Measure.getPlaneThroughPoints (points[i0], points[t[1]], points[t[2]], vNorm, vAC, pTemp);
var pt = points[i0];
for (var j = 0; j < nPoints; j++) {
if (j == i0) continue;
vAC.sub2 (points[j], pt);
vAC.normalize ();
var v = vAC.dot (vNorm);
if (v > 0.05) {
return v;
}if (JU.Logger.debugging) JU.Logger.info ("checkFacet " + j + " " + v + " " + JU.PT.toJSON (null, t));
}
var normix = Integer.$valueOf (JU.Normix.getNormixV (norm, bsTemp));
var o = htNormMap.get (normix);
if (o == null) {
var norms = JU.Normix.getVertexVectors ();
for (var e, $e = htNormMap.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var n = e.getKey ();
if (norms[n.intValue ()].dot (norm) > planarParam) {
o = e.getValue ();
o[2] = n;
htNormMap.put (normix, o);
break;
}}
if (o == null) htNormMap.put (normix, o =  Clazz.newArray (-1, [ new JU.Lst (),  new JU.Lst (), normix]));
}normix = o[2];
var faceEdgeList = o[0];
var faceTriList = o[1];
for (var i = 0; i < 3; i++) if ((edgeTest[i] = this.addEdge (faceEdgeList, htEdgeMap, normix, t, i, points)) == null) return 3.4028235E38;

for (var i = 0; i < 3; i++) {
var oo = edgeTest[i];
if (oo === Boolean.TRUE) continue;
var oe = oo;
faceEdgeList.addLast (oe[2]);
htEdgeMap.put (oe[3], oe);
}
faceTriList.addLast (Integer.$valueOf (index));
return 0;
}, "~A,~N,~A,~N,JU.V3,JU.P4,JU.V3,JU.V3,java.util.Map,java.util.Map,~N,JU.BS,~A");
Clazz.defineMethod (c$, "addEdge", 
 function (faceEdgeList, htEdgeMap, normix, p1, i, points) {
var pt = p1[i];
var pt1 = p1[(i + 1) % 3];
var s1 = "_" + pt1;
var s = "_" + pt;
var edge = normix + s + s1;
if (htEdgeMap.containsKey (edge)) return null;
var edge0 = normix + s1 + s;
var o = htEdgeMap.get (edge0);
var b;
if (o == null) {
var coord2 = points[pt1];
var coord1 = points[pt];
this.vAB.sub2 (coord2, coord1);
for (var j = faceEdgeList.size (); --j >= 0; ) {
var e = faceEdgeList.get (j);
var c1 = points[e[0]];
var c2 = points[e[1]];
if (c1 !== coord1 && c1 !== coord2 && c2 !== coord1 && c2 !== coord2 && this.testDiff (c1, c2, coord1, coord2) && this.testDiff (coord1, coord2, c1, c2)) return null;
}
return  Clazz.newArray (-1, [p1, Integer.$valueOf (i),  Clazz.newIntArray (-1, [pt, pt1, 0]), edge]);
}var p10 = (o)[0];
if (p10 == null) return null;
var i0 = ((o)[1]).intValue ();
p10[3] = -((-p10[3]) ^ (1 << i0));
p1[3] = -((-p1[3]) ^ (1 << i));
b = (o)[2];
for (var j = faceEdgeList.size (); --j >= 0; ) {
var f = faceEdgeList.get (j);
if (f[0] == b[0] && f[1] == b[1]) {
f[2] = -1;
break;
}}
htEdgeMap.put (edge,  Clazz.newArray (-1, [null]));
htEdgeMap.put (edge0,  Clazz.newArray (-1, [null]));
return Boolean.TRUE;
}, "JU.Lst,java.util.Map,Integer,~A,~N,~A");
Clazz.defineMethod (c$, "testDiff", 
 function (a1, b1, a2, b2) {
this.vAB.sub2 (b1, a1);
this.vAC.sub2 (a2, a1);
this.vAC.cross (this.vAC, this.vAB);
this.vBC.sub2 (b2, a1);
this.vBC.cross (this.vBC, this.vAB);
return (this.vBC.dot (this.vAC) < 0);
}, "JU.P3,JU.P3,JU.P3,JU.P3");
Clazz.defineMethod (c$, "isPlanar", 
 function (pt1, pt2, pt3, ptX) {
var norm =  new JU.V3 ();
var w = JU.Measure.getNormalThroughPoints (pt1, pt2, pt3, norm, this.vAB);
var d = JU.Measure.distanceToPlaneV (norm, w, ptX);
return (Math.abs (d) < J.shapespecial.Polyhedra.MAX_DISTANCE_TO_PLANE);
}, "JU.P3,JU.P3,JU.P3,JU.P3");
Clazz.defineMethod (c$, "getFaces", 
 function (triangles, triangleCount, htNormMap) {
var n = 0;
for (var e, $e = htNormMap.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var eo = e.getValue ();
if (eo[2] === e.getKey ()) n++;
}
var faces = JU.AU.newInt2 (n);
if (triangleCount == n) {
for (var i = triangleCount; --i >= 0; ) faces[i] = JU.AU.arrayCopyI (triangles[i], 3);

return faces;
}var fpt = 0;
for (var e, $e = htNormMap.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var eo = e.getValue ();
if (eo[2] != null && eo[2] !== e.getKey ()) continue;
var faceEdgeList = e.getValue ()[0];
n = faceEdgeList.size ();
var nOK = 0;
for (var i = faceEdgeList.size (); --i >= 0; ) if (faceEdgeList.get (i)[2] >= 0) nOK++;

var face = faces[fpt++] =  Clazz.newIntArray (nOK, 0);
if (n < 2) continue;
var edge = null;
var pt = 0;
do {
edge = faceEdgeList.get (pt);
} while (pt++ < nOK && edge[2] == -1);
face[0] = edge[0];
face[1] = edge[1];
pt = 2;
var i0 = 1;
var pt0 = -1;
while (pt < nOK && pt0 != pt) {
pt0 = pt;
for (var i = i0; i < n; i++) {
edge = faceEdgeList.get (i);
if (edge[2] != -1 && edge[0] == face[pt - 1]) {
face[pt++] = edge[1];
if (i == i0) i0++;
break;
}}
}
}
return faces;
}, "~A,~N,java.util.Map");
Clazz.overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
for (var i = this.polyhedronCount; --i >= 0; ) {
var p = this.polyhedrons[i];
if (p.id == null) {
var ia = p.centralAtom.i;
if (this.ms.at[ia].isDeleted ()) p.isValid = false;
p.visibilityFlags = (p.visible && bsModels.get (p.modelIndex) && !this.ms.isAtomHidden (ia) && !this.ms.at[ia].isDeleted () ? this.vf : 0);
this.atoms[ia].setShapeVisibility (this.vf, p.visibilityFlags != 0);
} else {
p.visibilityFlags = (p.visible && (p.modelIndex < 0 || bsModels.get (p.modelIndex)) ? this.vf : 0);
}}
}, "JU.BS");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
if (this.polyhedronCount == 0) return "";
var s =  new JU.SB ();
for (var i = 0; i < this.polyhedronCount; i++) if (this.polyhedrons[i].isValid) s.append (this.polyhedrons[i].getState (this.vwr));

if (this.drawEdges == 2) J.shape.Shape.appendCmd (s, "polyhedra frontedges");
 else if (this.drawEdges == 1) J.shape.Shape.appendCmd (s, "polyhedra edges");
 else if (this.drawEdges == 3) J.shape.Shape.appendCmd (s, "polyhedra edgesOnly");
s.append (this.vwr.getStateCreator ().getAtomShapeState (this));
var ia;
for (var i = 0; i < this.polyhedronCount; i++) {
var p = this.polyhedrons[i];
if (p.isValid && p.id == null && p.colixEdge != 0 && this.bsColixSet.get (ia = p.centralAtom.i)) J.shape.Shape.appendCmd (s, "select ({" + ia + "}); color polyhedra " + (JU.C.isColixTranslucent (this.colixes[ia]) ? "translucent " : "") + JU.C.getHexCode (this.colixes[ia]) + " " + JU.C.getHexCode (p.colixEdge));
}
return s.toString ();
});
Clazz.defineStatics (c$,
"DEFAULT_FACECENTEROFFSET", 0.25,
"EDGES_NONE", 0,
"EDGES_ALL", 1,
"EDGES_FRONT", 2,
"EDGES_ONLY", 3,
"MAX_VERTICES", 250,
"FACE_COUNT_MAX", 247,
"MAX_OTHER", 498);
c$.randomPoint = c$.prototype.randomPoint = JU.P3.new3 (3141, 2718, 1414);
Clazz.defineStatics (c$,
"MODE_BONDING", 1,
"MODE_POINTS", 2,
"MODE_RADIUS", 3,
"MODE_BITSET", 4,
"MODE_UNITCELL", 5,
"MODE_INFO", 6,
"DEFAULT_PLANAR_PARAM", 0.98,
"CONVEX_HULL_MAX", 0.05,
"MAX_DISTANCE_TO_PLANE", 0.1);
});
