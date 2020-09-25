Clazz.declarePackage ("JS");
Clazz.load (["JU.BS"], "JS.SmilesRing", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$set = null;
this.edges = null;
this.bsEdgesToCheck = null;
this.isOK = false;
this.n = 0;
Clazz.instantialize (this, arguments);
}, JS, "SmilesRing", JU.BS);
Clazz.makeConstructor (c$, 
function (n, atoms, edges, isOK) {
Clazz.superConstructor (this, JS.SmilesRing, []);
this.or (atoms);
this.edges = edges;
this.isOK = isOK;
this.n = n;
}, "~N,JU.BS,JU.Lst,~B");
Clazz.defineMethod (c$, "addEdges", 
function (htEdgeMap) {
for (var i = this.edges.size (); --i >= 0; ) htEdgeMap.put (JS.SmilesRing.getKey (this.edges.get (i)), this.$set);

}, "java.util.Hashtable");
c$.getSetByEdge = Clazz.defineMethod (c$, "getSetByEdge", 
function (edge, htEdgeMap) {
return htEdgeMap.get (JS.SmilesRing.getKey (edge));
}, "JU.Edge,java.util.Hashtable");
c$.getKey = Clazz.defineMethod (c$, "getKey", 
 function (e) {
var i = e.getAtomIndex1 ();
var j = e.getAtomIndex2 ();
return (i < j ? i + "_" + j : j + "_" + i);
}, "JU.Edge");
});
