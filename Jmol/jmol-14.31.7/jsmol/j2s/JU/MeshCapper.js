Clazz.declarePackage ("JU");
Clazz.load (["JU.T3"], "JU.MeshCapper", ["java.util.Arrays", "$.Hashtable", "JU.AU", "$.Lst", "$.M3", "$.P3", "$.Quat", "$.V3", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.slicer = null;
this.dumping = false;
this.capMap = null;
this.vertices = null;
this.lstRegions = null;
this.nTriangles = 0;
this.nRegions = 0;
this.lstTriangles = null;
this.nPoints = 0;
this.m3 = null;
this.m3inv = null;
if (!Clazz.isClassDefined ("JU.MeshCapper.MeshCapperSorter")) {
JU.MeshCapper.$MeshCapper$MeshCapperSorter$ ();
}
if (!Clazz.isClassDefined ("JU.MeshCapper.CapVertex")) {
JU.MeshCapper.$MeshCapper$CapVertex$ ();
}
Clazz.instantialize (this, arguments);
}, JU, "MeshCapper");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (slicer) {
this.slicer = slicer;
this.dumping = JU.Logger.debugging;
return this;
}, "JU.MeshSlicer");
Clazz.defineMethod (c$, "clear", 
function () {
this.capMap =  new java.util.Hashtable ();
this.vertices =  new JU.Lst ();
});
Clazz.defineMethod (c$, "triangulateFaces", 
function (faces, vertices, faceTriangles) {
this.lstTriangles =  new JU.Lst ();
var points =  new Array (10);
for (var f = 0, n = faces.length; f < n; f++) {
var face = faces[f];
var npts = face.length;
if (points.length < npts) points =  new Array (npts);
var n0 = this.lstTriangles.size ();
for (var i = npts; --i >= 0; ) points[i] = vertices[face[i]];

this.triangulatePolygon (points, npts);
var n1 = this.lstTriangles.size ();
var ft =  Clazz.newIntArray (n1 - n0, 0);
if (faceTriangles != null) faceTriangles[f] = ft;
for (var i = n0; i < n1; i++) {
var t = this.lstTriangles.get (i);
ft[i - n0] = i;
for (var j = 3; --j >= 0; ) t[j] = face[t[j]];

t[3] = -t[3];
}
}
var triangles = JU.AU.newInt2 (this.lstTriangles.size ());
this.lstTriangles.toArray (triangles);
return triangles;
}, "~A,~A,~A");
Clazz.defineMethod (c$, "triangulatePolygon", 
function (points, nPoints) {
this.clear ();
var haveList = (nPoints >= 0);
if (!haveList || this.lstTriangles == null) this.lstTriangles =  new JU.Lst ();
nPoints = this.nPoints = (haveList ? nPoints : points.length);
var v0 = null;
for (var i = 0; i < nPoints; i++) {
if (points[i] == null) return null;
var v = Clazz.innerTypeInstance (JU.MeshCapper.CapVertex, this, null, points[i], i);
this.vertices.addLast (v);
if (v0 != null) {
v0.link (v);
}v0 = v;
}
v0.link (this.vertices.get (0));
this.createCap (null);
if (haveList) return null;
var a = JU.AU.newInt2 (this.lstTriangles.size ());
for (var i = this.lstTriangles.size (); --i >= 0; ) a[i] = this.lstTriangles.get (i);

return a;
}, "~A,~N");
Clazz.defineMethod (c$, "addEdge", 
function (ipt1, ipt2, thisSet) {
var v1 = this.addPoint (thisSet, ipt1);
var v2 = this.addPoint (thisSet, ipt2);
v1.link (v2);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "addPoint", 
 function (thisSet, i) {
var ii = Integer.$valueOf (i);
var v = this.capMap.get (ii);
if (v == null) {
var pt = this.slicer.m.vs[i];
i = this.slicer.addIntersectionVertex (pt, 0, -1, thisSet, null, -1, -1);
v = Clazz.innerTypeInstance (JU.MeshCapper.CapVertex, this, null, pt, i);
this.vertices.addLast (v);
this.capMap.put (ii, v);
}if (this.dumping) JU.Logger.info (i + "\t" + this.slicer.m.vs[i]);
return v;
}, "~N,~N");
Clazz.defineMethod (c$, "getInputPoint", 
 function (v) {
return (this.slicer == null ? JU.P3.newP (v) : this.slicer.m.vs[v.ipt]);
}, "JU.MeshCapper.CapVertex");
Clazz.defineMethod (c$, "outputTriangle", 
 function (ipt1, ipt2, ipt3) {
if (this.slicer == null) {
var mask = 0;
if (this.isEdge (ipt1, ipt2)) mask |= 1;
if (this.isEdge (ipt2, ipt3)) mask |= 2;
if (this.isEdge (ipt3, ipt1)) mask |= 4;
this.lstTriangles.addLast ( Clazz.newIntArray (-1, [ipt1, ipt2, ipt3, mask]));
} else {
this.slicer.addTriangle (ipt1, ipt2, ipt3);
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "isEdge", 
 function (i, j) {
return (j == (i + 1) % this.nPoints);
}, "~N,~N");
Clazz.defineMethod (c$, "createCap", 
function (norm) {
this.capMap = null;
this.lstRegions =  new JU.Lst ();
var vs =  new Array (this.vertices.size ());
if (vs.length < 3) return;
if (JU.Logger.debugging) JU.Logger.info ("MeshCapper using " + vs.length + " vertices");
this.vertices.toArray (vs);
this.vertices = null;
var vab = JU.V3.newVsub (vs[0], vs[1]);
var vac;
if (norm == null) {
vac = JU.V3.newVsub (vs[0], vs[vs.length - 1]);
} else {
vac = JU.V3.newV (norm);
vac.cross (vac, vab);
}var q = JU.Quat.getQuaternionFrameV (vab, vac, null, false);
this.m3 = q.getMatrix ();
this.m3inv = JU.M3.newM3 (this.m3);
this.m3inv.invert ();
for (var i = vs.length; --i >= 0; ) this.m3inv.rotate (vs[i]);

this.fixEndsAndSortVertices (vs);
var v0 = vs[0];
var v = v0;
try {
do {
v = this.process (v);
} while (v !== v0);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("MeshCapper exception " + e);
e.printStackTrace ();
} else {
throw e;
}
}
if (this.slicer != null) this.clear ();
if (JU.Logger.debugging) JU.Logger.info ("MeshCapper created " + this.nTriangles + " triangles " + this.nRegions + " regions");
}, "JU.V3");
Clazz.defineMethod (c$, "fixEndsAndSortVertices", 
 function (vs) {
var v0s =  new JU.Lst ();
var v1s =  new JU.Lst ();
var n = vs.length;
for (var i = n; --i >= 0; ) {
if (vs[i].next == null) {
v0s.addLast (vs[i]);
} else if (vs[i].prev == null) {
v1s.addLast (vs[i]);
}}
for (var i = v0s.size (); --i >= 0; ) {
var v0 = v0s.get (i);
var v1 = this.findNearestVertex (v1s, v0);
if (v1 == null) {
System.out.println ("MESHCAPPER OHOH");
} else {
v0.link (v1);
if (v0.distanceSquared (v1) < 1e-6) v1.link (null);
}}
java.util.Arrays.sort (vs, Clazz.innerTypeInstance (JU.MeshCapper.MeshCapperSorter, this, null));
for (var i = n; --i >= 0; ) vs[i].yxNext = vs[(i + 1) % n];

vs[n - 1].yxNext = vs[0];
}, "~A");
Clazz.defineMethod (c$, "findNearestVertex", 
 function (v1s, v0) {
var min = 3.4028235E38;
var vmin = null;
var imin = -1;
for (var i = v1s.size (); --i >= 0; ) {
var v1 = v1s.get (i);
var d = v1.distanceSquared (v0);
if (d < min) {
min = d;
vmin = v1;
imin = i;
}}
if (imin >= 0) v1s.removeItemAt (imin);
return vmin;
}, "JU.Lst,JU.MeshCapper.CapVertex");
Clazz.defineMethod (c$, "process", 
 function (v) {
var q = v.yxNext;
v.yxNext = null;
if (this.dumping) JU.Logger.info (v.toString ());
if (v.prev === v.next) return q;
var isDescending = (v.prev.region != null);
var isAscending = (v.next.region != null);
if (this.dumping) JU.Logger.info ("#" + (isAscending ? v.next.id : "    ") + "    " + (isDescending ? v.prev.id : "") + "\n#" + (isAscending ? "   \\" : "    ") + (isDescending ? "    /\n" : "\n") + "#    " + v.id);
if (!isDescending && !isAscending) {
var last = this.getLastPoint (v);
if (last == null) {
this.newRegion (v);
return q;
}var p = this.processSplit (v, last);
p.yxNext = q;
q = p;
isAscending = true;
}if (isDescending) {
this.processMonotonic (v, true);
}if (isAscending) {
this.processMonotonic (v, false);
}if (isDescending && isAscending) {
if (v.prev.prev === v.next) {
this.lstRegions.removeObj (v.region);
this.addTriangle (v.prev, v, v.next, "end");
JU.MeshCapper.clearV (v.prev);
JU.MeshCapper.clearV (v.next);
} else {
v.region = null;
}}return q;
}, "JU.MeshCapper.CapVertex");
c$.clearV = Clazz.defineMethod (c$, "clearV", 
 function (v) {
if (v != null) v.clear ();
}, "JU.MeshCapper.CapVertex");
Clazz.defineMethod (c$, "processMonotonic", 
 function (v, isDescending) {
var vEdge = (isDescending ? v.prev : v.next);
v.region = vEdge.region;
var last = v.region[2];
if (last === v) {
this.lstRegions.removeObj (v.region);
return;
}var v2;
var v1;
if (last === vEdge) {
v1 = last;
v2 = (isDescending ? v1.prev : v1.next);
while (v2 !== v && v2.yxNext == null && isDescending == (v.x > v.interpolateX (v2, v1))) {
if (isDescending) {
this.addTriangle (v2, v1, v, "same desc " + v.ipt);
v1 = v2;
v2 = v2.prev;
} else {
this.addTriangle (v, v1, v2, "same asc " + v.ipt);
v1 = v2;
v2 = v2.next;
}}
} else {
v2 = vEdge;
do {
v1 = v2;
if (isDescending) {
v2 = v1.prev;
this.addTriangle (v2, v1, v, "opp desc " + v.id);
} else {
v2 = v1.next;
this.addTriangle (v, v1, v2, "opp asc " + v.id);
}} while (v2 !== last && v2 !== v && v2.yxNext == null);
if (last.region == null) {
this.lstRegions.removeObj (v.region);
v.region = last.region = (isDescending ? last.prev : last.next).region;
}}v.region[2] = v.region[isDescending ? 0 : 1] = v;
}, "JU.MeshCapper.CapVertex,~B");
Clazz.defineMethod (c$, "processSplit", 
 function (v, last) {
var pv = last.cloneV ();
if (this.dumping) pv.id += "a";
var p = v.cloneV ();
if (this.dumping) p.id += "a";
if (last.region == null) {
last.region = last.next.region;
pv.region = last.prev.region;
} else {
this.newRegion (last);
var cv = last;
while (cv.next.region != null) {
cv.next.region = cv.region;
cv = cv.next;
cv.region[0] = cv;
}
}var r = pv.region;
if (r[2] === last) r[2] = pv;
r[0] = pv;
if (r[1] === last) r[1] = pv;
v.link (last);
pv.prev.link (pv);
pv.link (p);
p.link (p.next);
return p;
}, "JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex");
Clazz.defineMethod (c$, "newRegion", 
 function (v) {
this.nRegions++;
this.lstRegions.addLast (v.region =  Clazz.newArray (-1, [v, v, v]));
}, "JU.MeshCapper.CapVertex");
Clazz.defineMethod (c$, "getLastPoint", 
 function (v) {
var closest = null;
var ymin = 3.4028235E38;
for (var i = this.lstRegions.size (); --i >= 0; ) {
var r = this.lstRegions.get (i);
var d = r[0];
if (d === r[1]) continue;
var isEdge = (d.region != null);
var isOK = ((isEdge ? v.interpolateX (d, d.next) : d.x) < v.x);
if (isEdge && closest != null && closest.x != d.x && isOK == (closest.x < d.x)) {
closest = null;
ymin = 3.4028235E38;
}if (!isOK) continue;
var a = r[1];
isEdge = (a.region != null);
isOK = ((isEdge ? v.interpolateX (a, a.prev) : a.x) >= v.x);
if (isEdge && closest != null && closest.x != a.x && isOK == (closest.x > a.x)) {
closest = null;
ymin = 3.4028235E38;
}if (!isOK) continue;
if (r[2].y < ymin) {
ymin = r[2].y;
closest = r[2];
}}
return closest;
}, "JU.MeshCapper.CapVertex");
Clazz.defineMethod (c$, "checkWinding", 
 function (v0, v1, v2) {
return (v1.x - v0.x) * (v2.y - v0.y) > (v1.y - v0.y) * (v2.x - v0.x);
}, "JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex");
Clazz.defineMethod (c$, "addTriangle", 
 function (v0, v1, v2, note) {
++this.nTriangles;
if (this.checkWinding (v0, v1, v2)) {
if (this.dumping) this.drawTriangle (this.nTriangles, v0, v1, v2, "red");
this.outputTriangle (v0.ipt, v1.ipt, v2.ipt);
} else if (this.dumping) {
JU.Logger.info ("#!!!BAD WINDING " + note);
}v1.link (null);
}, "JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex,~S");
Clazz.defineMethod (c$, "drawTriangle", 
 function (index, v0, v1, v2, color) {
var p0 = this.getInputPoint (v0);
var p1 = this.getInputPoint (v1);
var p2 = this.getInputPoint (v2);
JU.Logger.info ("draw " + color + index + "/* " + v0.id + " " + v1.id + " " + v2.id + " */" + p0 + p1 + p2 + " color " + color);
}, "~N,JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex,~S");
c$.$MeshCapper$MeshCapperSorter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, JU.MeshCapper, "MeshCapperSorter", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (a.y < b.y ? 1 : a.y > b.y || a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
}, "JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex");
c$ = Clazz.p0p ();
};
c$.$MeshCapper$CapVertex$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ipt = 0;
this.id = "";
this.yxNext = null;
this.prev = null;
this.next = null;
this.region = null;
Clazz.instantialize (this, arguments);
}, JU.MeshCapper, "CapVertex", JU.T3, Cloneable);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, JU.MeshCapper.CapVertex, []);
this.ipt = b;
this.id = "" + b;
this.setT (a);
}, "JU.T3,~N");
Clazz.defineMethod (c$, "cloneV", 
function () {
try {
return this.clone ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "interpolateX", 
function (a, b) {
var c = b.y - a.y;
var d = b.x - a.x;
return (c != 0 ? a.x + (this.y - a.y) * d / c : d > 0 ? 3.4028235E38 : -3.4028235E38);
}, "JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex");
Clazz.defineMethod (c$, "link", 
function (a) {
if (a == null) {
this.prev.next = this.next;
this.next.prev = this.prev;
this.clear ();
} else {
this.next = a;
a.prev = this;
}}, "JU.MeshCapper.CapVertex");
Clazz.defineMethod (c$, "clear", 
function () {
this.yxNext = this.next = this.prev = null;
this.region = null;
});
Clazz.defineMethod (c$, "dumpRegion", 
 function () {
var a = "\n#REGION d=" + this.region[0].id + " a=" + this.region[1].id + " last=" + this.region[2].id + "\n# ";
var b = this.region[1];
while (true) {
a += b.id + " ";
if (b === this.region[0]) break;
b = b.next;
}
return a + "\n";
});
Clazz.overrideMethod (c$, "toString", 
function () {
var a = (this.b$["JU.MeshCapper"].m3 == null ? this :  new JU.P3 ());
if (this.b$["JU.MeshCapper"].m3 != null) this.b$["JU.MeshCapper"].m3.rotate2 (this, a);
return "draw p" + this.id + " {" + a.x + " " + a.y + " " + a.z + "} # " + (this.prev == null ? "null" : this.prev.id) + (this.next == null ? " null" : " " + this.next.id) + (this.region == null ? "" : this.dumpRegion ());
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"DESCENDER", 0,
"ASCENDER", 1,
"LAST", 2);
});
