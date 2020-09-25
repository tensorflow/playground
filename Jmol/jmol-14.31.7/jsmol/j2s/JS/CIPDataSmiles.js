Clazz.declarePackage ("JS");
Clazz.load (["JS.CIPData"], "JS.CIPDataSmiles", ["JU.Lst", "$.Measure", "JU.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.smiles = null;
this.nodes = null;
Clazz.instantialize (this, arguments);
}, JS, "CIPDataSmiles", JS.CIPData);
Clazz.prepareFields (c$, function () {
this.nodes =  new Array (6);
});
Clazz.overrideMethod (c$, "isSmiles", 
function () {
return true;
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JS.CIPDataSmiles, []);
});
Clazz.defineMethod (c$, "setAtomsForSmiles", 
function (vwr, smiles) {
this.vwr = vwr;
this.smiles = smiles;
this.atoms = vwr.getSmilesAtoms (smiles);
this.bsAtoms = JU.BSUtil.newBitSet2 (0, this.atoms.length);
this.bsMolecule = this.bsAtoms.clone ();
this.init ();
return this;
}, "JV.Viewer,~S");
Clazz.overrideMethod (c$, "getList", 
function (smarts) {
return this.vwr.getSubstructureSetArrayForNodes (smarts, this.atoms, 2);
}, "~S");
Clazz.overrideMethod (c$, "match", 
function (smarts) {
return this.vwr.getSmartsMatchForNodes (smarts, this.atoms);
}, "~S");
Clazz.overrideMethod (c$, "getBondOrder", 
function (bond) {
return (bond).getRealCovalentOrder ();
}, "JU.SimpleEdge");
Clazz.overrideMethod (c$, "isCis", 
function (a, b, c, d) {
var stereo1 = this.getStereoEdge (b.atom, a.atom);
var stereo2 = this.getStereoEdge (c.atom, d.atom);
return (stereo1 == 0 || stereo2 == 0 ? 0 : stereo1 != stereo2 ? 14 : 13);
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "getStereoEdge", 
 function (atom, winner) {
var edges = atom.getEdges ();
var order = 0;
for (var i = edges.length; --i >= 0; ) {
var edge = edges[i];
switch (order = edge.getCovalentOrder ()) {
case 1025:
return (edge.getOtherNode (atom) === winner) == (edge.getAtom1 () === atom) ? 1041 : order;
case 1041:
return (edges[i].getOtherNode (atom) === winner) == (edge.getAtom1 () === atom) ? 1025 : order;
}
}
return 0;
}, "JU.SimpleNode,JU.SimpleNode");
Clazz.overrideMethod (c$, "isPositiveTorsion", 
function (a, b, c, d) {
var center = this.findCumulativeCenter (b, c);
if (center == null) return 0;
var jn = center.stereo.getAlleneAtoms (center, b.atom);
if (jn == null) return 0;
center.stereo.setTopoCoordinates (center, null, null, jn);
var angle = JU.Measure.computeTorsion (jn[0].getXYZ (), jn[1].getXYZ (), jn[2].getXYZ (), jn[3].getXYZ (), true);
return ((angle > 0) == ((a.atom.getIndex () == jn[0].getIndex ()) && (d.atom.getIndex () == jn[3].getIndex ()) || (a.atom.getIndex () == jn[1].getIndex ()) && (d.atom.getIndex () == jn[2].getIndex ())) ? 18 : 17);
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom");
Clazz.defineMethod (c$, "findCumulativeCenter", 
 function (a, a2) {
var center = a.atom;
var c = null;
var b = null;
while (center != null && center !== a2.atom) {
var edges = center.getEdges ();
for (var i = edges.length; --i >= 0; ) {
if (edges[i].getCovalentOrder () == 2 && (c = edges[i].getOtherNode (center)) !== b) {
var sa = c;
if (sa.stereo != null) {
return sa;
}}}
b = center;
center = c;
}
return null;
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom");
Clazz.overrideMethod (c$, "setCoord", 
function (atom, atoms) {
var a = atom;
if (a.stereo == null) return false;
var edges = a.getEdges ();
for (var i = edges.length; --i >= 0; ) this.nodes[i] = edges[i].getOtherNode (a);

a.stereo.setTopoCoordinates (a, null, null, this.nodes);
return true;
}, "JU.SimpleNode,~A");
Clazz.defineMethod (c$, "getSmilesChiralityArray", 
function () {
var chirality =  new JU.Lst ();
for (var i = 0; i < this.atoms.length; i++) {
var a = this.atoms[i];
var pt = a.getPatternIndex ();
if (pt >= 0) {
var c = a.getCIPChirality (false);
chirality.addLast (c);
}}
return chirality.toArray ( new Array (chirality.size ()));
});
});
