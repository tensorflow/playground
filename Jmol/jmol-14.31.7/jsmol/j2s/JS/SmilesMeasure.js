Clazz.declarePackage ("JS");
Clazz.load (null, "JS.SmilesMeasure", ["JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.search = null;
this.nPoints = 0;
this.type = 0;
this.index = 0;
this.isNot = false;
this.indices = null;
this.minmax = null;
this.points = null;
Clazz.instantialize (this, arguments);
}, JS, "SmilesMeasure");
Clazz.prepareFields (c$, function () {
this.indices =  Clazz.newIntArray (4, 0);
this.points =  new Array (4);
});
Clazz.makeConstructor (c$, 
function (search, index, type, isNot, minmax) {
this.search = search;
this.type = Math.min (4, Math.max (type, 2));
this.index = index;
this.isNot = isNot;
this.minmax = minmax;
for (var i = minmax.length - 2; i >= 0; i -= 2) if (minmax[i] > minmax[i + 1]) {
var min = minmax[i + 1];
minmax[i + 1] = minmax[i];
minmax[i] = min;
}
}, "JS.SmilesSearch,~N,~N,~B,~A");
Clazz.defineMethod (c$, "addPoint", 
function (index) {
if (this.nPoints == this.type) return false;
if (this.nPoints == 0) for (var i = 1; i < this.type; i++) this.indices[i] = index + i;

this.indices[this.nPoints++] = index;
return true;
}, "~N");
Clazz.defineMethod (c$, "check", 
function () {
for (var i = 0; i < this.type; i++) {
var iAtom = this.search.patternAtoms[this.indices[i]].getMatchingAtomIndex ();
this.points[i] = this.search.targetAtoms[iAtom];
}
var d = 0;
switch (this.type) {
case 2:
d = this.points[0].distance (this.points[1]);
break;
case 3:
this.search.v.vA.sub2 (this.points[0], this.points[1]);
this.search.v.vB.sub2 (this.points[2], this.points[1]);
d = this.search.v.vA.angle (this.search.v.vB) / 0.017453292;
break;
case 4:
d = JS.SmilesMeasure.setTorsionData (this.points[0], this.points[1], this.points[2], this.points[3], this.search.v, true);
break;
}
for (var i = this.minmax.length - 2; i >= 0; i -= 2) if (d >= this.minmax[i] && d <= this.minmax[i + 1]) return !this.isNot;

return this.isNot;
});
c$.setTorsionData = Clazz.defineMethod (c$, "setTorsionData", 
function (pt1a, pt1, pt2, pt2a, v, withDihedral) {
v.vTemp1.sub2 (pt1a, pt1);
v.vTemp2.sub2 (pt2a, pt2);
if (!withDihedral) return 0;
v.vNorm2.sub2 (pt1, pt2);
v.vNorm2.normalize ();
v.vTemp1.cross (v.vTemp1, v.vNorm2);
v.vTemp1.normalize ();
v.vTemp2.cross (v.vTemp2, v.vNorm2);
v.vTemp2.normalize ();
v.vNorm3.cross (v.vTemp1, v.vTemp2);
return v.vTemp1.angle (v.vTemp2) / 0.017453292 * (v.vNorm2.dot (v.vNorm3) < 0 ? 1 : -1);
}, "JU.T3,JU.T3,JU.T3,JU.T3,JS.VTemp,~B");
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "(." + "__dat".charAt (this.type) + this.index + ":" + JU.PT.toJSON (null, this.minmax) + ") for";
for (var i = 0; i < this.type; i++) s += " " + (i >= this.nPoints ? "?" : "" + this.indices[i]);

return s;
});
Clazz.defineStatics (c$,
"TYPES", "__dat",
"radiansPerDegree", (0.017453292519943295));
});
