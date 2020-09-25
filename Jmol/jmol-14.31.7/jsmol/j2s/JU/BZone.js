Clazz.declarePackage ("JU");
Clazz.load (["JU.P3"], "JU.BZone", ["java.lang.Boolean", "$.Double", "$.Float", "java.util.Hashtable", "JU.Lst", "$.Measure", "$.P4", "$.V3", "J.bspt.PointIterator"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bzDrawPointsAndEdges = false;
this.bzSavePmeshes = false;
this.bzones = null;
this.bzGamma = null;
this.bzFaceCenters = null;
this.bzLatticePts = null;
this.bzLatticePtsAll = null;
this.bzPlanePts = null;
this.subzones = null;
this.isWignerSeitz = false;
this.vwr = null;
this.eval = null;
this.id = null;
this.index = 0;
this.color = null;
this.latticePts = null;
this.newLatticePts = null;
this.newPlanePts = null;
this.planes = null;
this.newPlanes = null;
this.volume = 0;
this.zoneIndex = 0;
this.offset = null;
this.center = null;
this.planesUnused = null;
this.ptsUnused = null;
this.pmeshes = null;
this.areas = null;
this.faces = null;
this.$faceIndices = null;
this.faceCenters = null;
this.totalArea = 0;
this.ret = null;
this.polyid = null;
this.pts = null;
Clazz.instantialize (this, arguments);
}, JU, "BZone");
Clazz.prepareFields (c$, function () {
this.bzGamma =  new JU.P3 ();
this.ret =  new Array (1);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
this.eval = vwr.eval;
return this;
}, "JV.Viewer");
Clazz.defineMethod (c$, "createBZ", 
function (zone, array, isK, id, scale) {
if (this.vwr == null) return;
if (array != null) this.demoBZ (array, isK);
 else this.createAllBZs (zone, true, id, scale);
}, "~N,~A,~B,~S,~N");
Clazz.defineMethod (c$, "createWS", 
function (id) {
if (this.vwr == null) return;
this.createAllBZs (-1, false, id, 1);
}, "~S");
Clazz.defineMethod (c$, "createAllBZs", 
 function (n, discardPrev, id, scale) {
this.cmd ("unitcell reset");
this.cmd ("unitcell primitive");
if (n < 0) {
n = -n;
this.isWignerSeitz = true;
} else {
if (n == 0) n = 1;
if (Float.isNaN (scale)) scale = 2;
this.cmd ("unitcell 'reciprocal' " + scale);
}this.cmd ("polyhedra pbz* delete");
this.cmd ("pmesh fbz* delete");
if (!this.isWignerSeitz) {
this.cmd ("axes unitcell; axes on; axes scale 2.0;axes 0.01;axes labels \"b1\" \"b2\" \"b3\" \"\"");
}this.bzones =  new JU.Lst ();
this.bzLatticePts =  new JU.Lst ();
this.bzPlanePts =  new JU.Lst ();
this.bzFaceCenters =  new JU.Lst ();
var wasPrecise = this.vwr.getBoolean (603979874);
this.vwr.setBooleanProperty ("legacyJavaFloat", true);
this.getLatticePoints (n);
this.bzones.addLast (null);
for (var i = 1; i <= n; i++) {
this.bzones.add (i, this.newBZ (i));
this.createNextBZ (this.bzones.get (i), this.bzones.get (i - 1), id);
if (discardPrev && i > 1) this.cmd ("polyhedra id \"pbz" + (i - 1) + "_*\" delete");
}
this.vwr.setBooleanProperty ("legacyJavaFloat", wasPrecise);
if (this.bzSavePmeshes) {
this.cmd ("polyhedra * off;pmesh * on;");
}}, "~N,~B,~S,~N");
Clazz.defineMethod (c$, "createNextBZ", 
 function (zone, zonePrev, id) {
this.getNewLatticePoints (zone);
if (this.bzDrawPointsAndEdges) this.drawZoneCenters (zone);
this.getSubzones (zone, zonePrev);
for (var i = 0; i < zone.subzones.size (); i++) {
var subzone = zone.subzones.get (i);
if (!this.getSubzonePmeshes (subzone)) continue;
if (this.bzDrawPointsAndEdges) this.drawSubzonePolygons (subzone);
this.createSubzonePolyhedron (subzone, id);
}
this.finalizeZone (zone);
}, "JU.BZone,JU.BZone,~S");
Clazz.defineMethod (c$, "newSubZone", 
 function (zone, id, index) {
var subzone =  new JU.BZone ();
subzone.index = index;
subzone.id = zone.id + id + index + "_";
subzone.zoneIndex = zone.index;
subzone.newLatticePts = zone.newLatticePts;
subzone.planes =  new JU.Lst ();
subzone.latticePts =  new JU.Lst ();
subzone.planesUnused =  new JU.Lst ();
subzone.ptsUnused =  new JU.Lst ();
subzone.pmeshes =  new JU.Lst ();
subzone.areas =  new JU.Lst ();
subzone.faces =  new JU.Lst ();
subzone.$faceIndices =  new JU.Lst ();
subzone.faceCenters =  new JU.Lst ();
subzone.volume = 0;
subzone.color = zone.color;
subzone.offset =  new JU.P3 ();
subzone.center =  new JU.P3 ();
zone.subzones.addLast (subzone);
return subzone;
}, "JU.BZone,~S,~N");
Clazz.defineMethod (c$, "getSubzones", 
 function (zone, zonePrev) {
if (zone.index == 1) {
var subzone = this.newSubZone (zone, "", 1);
subzone.latticePts = zone.newLatticePts;
subzone.planes = zone.newPlanes;
return;
}for (var i = 0; i < zonePrev.subzones.size (); i++) {
var planesNew = zone.newPlanes;
var ptsNew = zone.newLatticePts;
var prev = zonePrev.subzones.get (i);
var planesPrev = prev.planes;
var ptsPrev = prev.latticePts;
var planesUnusedPrev = prev.planesUnused;
var ptsUnusedPrev = prev.ptsUnused;
var centersPrev = prev.faceCenters;
var id = prev.id.substring (4);
for (var j0 = (zonePrev.index == 1 ? 0 : 1), j = j0; j < planesPrev.size (); j++) {
if (j0 == 1 && this.within (0.01, centersPrev.get (j), this.bzFaceCenters).size () > 1) continue;
var subzone = this.newSubZone (zone, id, j + 1);
this.addBZ (subzone.planes, subzone.latticePts, planesPrev, ptsPrev, j);
this.addBZ (subzone.planes, subzone.latticePts, planesUnusedPrev, ptsUnusedPrev, -1);
this.addBZ (subzone.planes, subzone.latticePts, planesNew, ptsNew, -1);
}
}
}, "JU.BZone,JU.BZone");
Clazz.defineMethod (c$, "addBZ", 
 function (planes, pts, planes0, pts0, j) {
if (j >= 0) {
var pt4 = JU.P4.newPt (planes0.get (j));
pt4.scale4 (-1.0);
planes.addLast (pt4);
pts.addLast (pts0.get (j));
}var n = planes0.size ();
for (var k = 0; k < n; k++) {
if (k != j) {
planes.addLast (planes0.get (k));
pts.addLast (pts0.get (k));
}}
}, "JU.Lst,JU.Lst,JU.Lst,JU.Lst,~N");
Clazz.defineMethod (c$, "getNewLatticePoints", 
 function (zone) {
var unusedPts =  new JU.Lst ();
var unusedLatticePts =  new JU.Lst ();
var centers = zone.newPlanePts;
var zoneLPs = zone.newLatticePts;
var planes = zone.newPlanes;
var ap;
var al;
for (var i = 0; i < this.bzPlanePts.size (); i++) {
var p = this.bzPlanePts.get (i);
var center = JU.P3.newP (p);
center.scale (0.5);
var radius = 0.501 * p.length ();
var inSphere = this.within (radius, center, this.bzPlanePts);
if (inSphere.size () == 1) {
ap = centers;
al = zoneLPs;
planes.addLast (this.plane (this.bzGamma, p, 1));
} else {
ap = unusedPts;
al = unusedLatticePts;
}ap.addLast (p);
al.addLast (this.bzLatticePts.get (i));
}
this.bzPlanePts = unusedPts;
this.bzLatticePts = unusedLatticePts;
}, "JU.BZone");
Clazz.defineMethod (c$, "plane", 
 function (pt1, pt2, f) {
var norm = JU.V3.newVsub (pt2, pt1);
var pt3 =  new JU.P3 ();
pt3.scaleAdd2 (f, norm, pt1);
var plane =  new JU.P4 ();
JU.Measure.getPlaneThroughPoint (pt3, norm, plane);
return plane;
}, "JU.P3,JU.P3,~N");
Clazz.defineMethod (c$, "within", 
 function (radius, center, pts) {
var ret =  new JU.Lst ();
var r2 = radius * radius;
for (var i = 0, n = pts.size (); i < n; i++) {
var pt = pts.get (i);
if (center.distanceSquared (pt) < r2) ret.addLast (pt);
}
return ret;
}, "~N,JU.P3,JU.Lst");
Clazz.defineMethod (c$, "newBZ", 
 function (i) {
var bzone =  new JU.BZone ();
bzone.id = "bz" + i + "_";
bzone.index = i;
bzone.color = this.bzColor (i);
bzone.subzones =  new JU.Lst ();
bzone.newLatticePts =  new JU.Lst ();
bzone.newPlanePts =  new JU.Lst ();
bzone.newPlanes =  new JU.Lst ();
bzone.volume = 0;
return bzone;
}, "~N");
Clazz.defineMethod (c$, "bzColor", 
 function (i) {
return JU.BZone.bzColors[(i - 1) % JU.BZone.bzColors.length];
}, "~N");
Clazz.defineMethod (c$, "getLatticePoints", 
 function (n) {
var minmax =  Clazz.newIntArray (3, 3, 0);
var pt =  new JU.P3 ();
var abc =  Clazz.newFloatArray (-1, [this.newPoint (1, 0, 0, pt).length (), this.newPoint (0, 1, 0, pt).length (), this.newPoint (0, 0, 1, pt).length ()]);
var abcmax = Math.max (abc[0], Math.max (abc[1], abc[2]));
for (var i = 0; i < 3; i++) {
var m = Clazz.floatToInt (n * abcmax / abc[i]);
minmax[i] =  Clazz.newIntArray (-1, [-m, m]);
}
var pts =  new JU.Lst ();
for (var i = minmax[0][0]; i <= minmax[0][1]; i++) {
for (var j = minmax[1][0]; j <= minmax[1][1]; j++) {
for (var k = minmax[2][0]; k <= minmax[2][1]; k++) {
if (i != 0 || j != 0 || k != 0) {
var lppt = this.newPoint (i, j, k,  new JU.P3 ());
pts.addLast (JU.P3.newP (lppt));
this.bzLatticePts.addLast (lppt);
var ppt = JU.P3.newP (lppt);
ppt.scale (0.5);
this.bzPlanePts.addLast (ppt);
System.out.println ("draw ID 'pt" + i + j + k + "' " + lppt);
}}
}
}
this.bzLatticePtsAll = pts.toArray ( new Array (pts.size ()));
}, "~N");
Clazz.defineMethod (c$, "newPoint", 
 function (i, j, k, pt) {
pt.x = i;
pt.y = j;
pt.z = k;
this.vwr.toCartesian (pt, false);
return pt;
}, "~N,~N,~N,JU.P3");
Clazz.defineMethod (c$, "cmd", 
 function (cmd) {
System.out.println (cmd);
try {
this.eval.runScript (cmd);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "demoBZ", 
 function (array, isK) {
}, "~A,~B");
Clazz.defineMethod (c$, "getSubzonePmeshes", 
 function (subzone) {
this.planes = subzone.planes;
this.latticePts = subzone.latticePts;
this.planesUnused = subzone.planesUnused;
this.ptsUnused = subzone.ptsUnused;
this.faces = subzone.faces;
this.faceCenters = subzone.faceCenters;
var nPlanes = this.planes.size ();
var planesUsed =  new JU.Lst ();
var ptsUsed =  new JU.Lst ();
var totalArea = 0;
for (var i = 0; i < nPlanes; i++) {
var pid = "f" + subzone.id + i;
this.cmd ("pmesh ID " + pid + " silent resolution 0.001 boundingbox {-2/1 -2/1 -2/1} {2/1 2/1 2/1} plane   " + this.toScript (this.planes.get (i)) + " off");
var area = 0;
for (var j = 0; j < nPlanes; j++) {
if (j == i) continue;
this.cmd ("pmesh slab plane " + this.toScript (this.planes.get (j)));
var a = this.getProperty (pid, "area");
area = (a == null ? 0 : a[0]);
if (area == 0) {
break;
}totalArea += area;
}
var a = null;
var face = null;
if (area > 0) {
face = this.getProperty (pid, "face");
a = this.average (face);
if (i == 0 && this.within (0.01, a, this.bzFaceCenters).size () >= 2) {
area = 0;
totalArea = 0;
i = nPlanes;
}}if (area > 0) {
this.faces.addLast (this.cleanFace (face));
this.faceCenters.addLast (a);
this.bzFaceCenters.addLast (a);
if (this.bzSavePmeshes) {
subzone.pmeshes.addLast (pid);
} else {
this.cmd ("pmesh ID " + pid + " delete");
}planesUsed.addLast (this.planes.get (i));
ptsUsed.addLast (this.latticePts.get (i));
subzone.areas.addLast (Double.$valueOf (area));
} else {
this.cmd ("pmesh ID " + pid + " delete");
this.planesUnused.addLast (this.planes.get (i));
this.ptsUnused.addLast (this.latticePts.get (i));
}subzone.planes = planesUsed;
subzone.latticePts = ptsUsed;
}
subzone.totalArea = totalArea;
return (totalArea > 0);
}, "JU.BZone");
Clazz.defineMethod (c$, "toScript", 
 function (p4) {
return "{" + p4.x + " " + p4.y + " " + p4.z + " " + p4.w + "}";
}, "JU.P4");
Clazz.defineMethod (c$, "getProperty", 
 function (name, key) {
var data =  new Array (3);
var shapeID;
shapeID = this.vwr.shm.getShapeIdFromObjectName (name);
if (shapeID >= 0) {
data[0] = name;
this.vwr.shm.getShapePropertyData (shapeID, "index", data);
if (data[1] != null && !key.equals ("index")) {
var index = (data[1]).intValue ();
data[1] = this.vwr.shm.getShapePropertyIndex (shapeID, key.intern (), index);
}}return data[1];
}, "~S,~S");
Clazz.defineMethod (c$, "createSubzonePolyhedron", 
 function (subzone, id) {
if (id == null) id = "p" + subzone.id;
subzone.polyid = id;
var apts = this.join (subzone.faces);
var pts = this.cleanFace (apts);
subzone.pts = pts;
subzone.center = this.average (pts);
subzone.offset = this.closest (subzone.center, this.bzLatticePtsAll);
subzone.$faceIndices =  new JU.Lst ();
var ifaces = subzone.$faceIndices;
var faces = subzone.faces;
for (var i = 0, n = faces.size (); i < n; i++) {
ifaces.addLast (this.faceIndices (faces.get (i), pts));
}
for (var i = ifaces.size (); --i >= 0; ) {
if (ifaces.get (i).length < 3) {
subzone.faces.removeItemAt (i);
subzone.$faceIndices.removeItemAt (i);
subzone.faceCenters.removeItemAt (i);
subzone.planes.removeItemAt (i);
}}
var p =  new java.util.Hashtable ();
p.put ("id", id);
p.put ("center", subzone.center);
var lst =  new JU.Lst ();
for (var i = 0, n = pts.length; i < n; i++) lst.addLast (pts[i]);

p.put ("vertices", lst);
p.put ("faces", ifaces);
p.put ("color", subzone.color);
this.vwr.setShapeProperty (21, "init", Boolean.TRUE);
this.vwr.setShapeProperty (21, "info", p);
this.vwr.setShapeProperty (21, "generate", null);
this.vwr.setShapeProperty (21, "init", Boolean.FALSE);
if (this.bzDrawPointsAndEdges) {
this.cmd ("color $" + id + " translucent");
this.cmd ("draw pts points " + pts + " dots nofill nomesh");
}}, "JU.BZone,~S");
Clazz.defineMethod (c$, "faceIndices", 
 function (p3s, pts) {
J.bspt.PointIterator.withinDistPoints (0, null, pts, p3s, this.ret);
return this.ret[0];
}, "~A,~A");
Clazz.defineMethod (c$, "closest", 
 function (center, ap3) {
J.bspt.PointIterator.withinDistPoints (0, center, ap3, null, this.ret);
return this.ret[0];
}, "JU.P3,~A");
Clazz.defineMethod (c$, "cleanFace", 
 function (face) {
J.bspt.PointIterator.withinDistPoints (0.01, JU.BZone.ptInner, face, null, this.ret);
var l = this.ret[0];
return l.toArray ( new Array (l.size ()));
}, "~A");
Clazz.defineMethod (c$, "average", 
 function (face) {
var a =  new JU.P3 ();
for (var i = face.length; --i >= 0; ) a.add (face[i]);

a.scale (1 / face.length);
return a;
}, "~A");
Clazz.defineMethod (c$, "join", 
 function (faces) {
var n = 0;
for (var i = faces.size (); --i >= 0; ) n += faces.get (i).length;

var pts =  new Array (n);
n = 0;
for (var i = faces.size (); --i >= 0; ) {
var face = faces.get (i);
for (var j = face.length; --j >= 0; ) pts[n++] = face[j];

}
return pts;
}, "JU.Lst");
Clazz.defineMethod (c$, "drawZoneCenters", 
 function (zone) {
}, "JU.BZone");
Clazz.defineMethod (c$, "drawSubzonePolygons", 
 function (subzone) {
}, "JU.BZone");
Clazz.defineMethod (c$, "finalizeZone", 
 function (zone) {
for (var i = zone.subzones.size (); --i >= 0; ) if (zone.subzones.get (i).totalArea == 0) zone.subzones.removeItemAt (i);

}, "JU.BZone");
c$.bzColors = c$.prototype.bzColors =  Clazz.newArray (-1, ["red", "green", "skyblue", "orange", "yellow", "indigo", "violet"]);
c$.ptInner = c$.prototype.ptInner = JU.P3.new3 (NaN, 0, 0);
});
