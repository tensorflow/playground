Clazz.declarePackage ("JS");
Clazz.load (["JU.V3"], "JS.PolyhedronStereoSorter", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.vTemp = null;
this.vRef = null;
this.align1 = null;
this.align2 = null;
Clazz.instantialize (this, arguments);
}, JS, "PolyhedronStereoSorter", null, java.util.Comparator);
Clazz.prepareFields (c$, function () {
this.vTemp =  new JU.V3 ();
this.align1 =  new JU.V3 ();
this.align2 =  new JU.V3 ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setRef", 
function (vRef) {
this.vRef = vRef;
}, "JU.V3");
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
var torA = (a[1]).floatValue ();
var torB = (b[1]).floatValue ();
if (Math.abs (torA - torB) < 1) {
torA = 0;
this.vTemp.sub2 (b[2], a[2]);
torB = this.vRef.dot (this.vTemp);
}return (torA < torB ? 1 : torA > torB ? -1 : 0);
}, "~A,~A");
Clazz.defineMethod (c$, "isAligned", 
function (pt1, pt2, pt3) {
this.align1.sub2 (pt1, pt2);
this.align2.sub2 (pt2, pt3);
var angle = this.align1.angle (this.align2);
return (angle < 0.17453292);
}, "JU.T3,JU.T3,JU.T3");
Clazz.defineStatics (c$,
"MIN_ALIGNED", (0.17453292649980456));
});
