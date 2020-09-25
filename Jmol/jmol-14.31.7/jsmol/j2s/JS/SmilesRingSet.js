Clazz.declarePackage ("JS");
Clazz.load (["JU.Lst", "$.BS"], "JS.SmilesRingSet", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bs = null;
Clazz.instantialize (this, arguments);
}, JS, "SmilesRingSet", JU.Lst);
Clazz.prepareFields (c$, function () {
this.bs =  new JU.BS ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JS.SmilesRingSet, []);
});
Clazz.defineMethod (c$, "addSet", 
function (set, htEdgeMap) {
for (var i = set.size (); --i >= 0; ) {
var r = set.get (i);
this.addRing (r);
r.addEdges (htEdgeMap);
}
}, "JS.SmilesRingSet,java.util.Hashtable");
Clazz.defineMethod (c$, "addRing", 
function (ring) {
this.addLast (ring);
ring.$set = this;
this.bs.or (ring);
}, "JS.SmilesRing");
Clazz.defineMethod (c$, "getElectronCount", 
function (eCounts) {
var eCount = 0;
for (var j = this.bs.nextSetBit (0); j >= 0; j = this.bs.nextSetBit (j + 1)) eCount += eCounts[j];

return eCount;
}, "~A");
});
