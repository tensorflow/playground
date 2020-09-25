Clazz.declarePackage ("JM");
Clazz.load (["JU.BS"], "JM.BondSet", ["JU.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.associatedAtoms = null;
Clazz.instantialize (this, arguments);
}, JM, "BondSet", JU.BS);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JM.BondSet, []);
});
c$.newBS = Clazz.defineMethod (c$, "newBS", 
function (bs, atoms) {
var b =  new JM.BondSet ();
JU.BSUtil.copy2 (bs, b);
b.associatedAtoms = atoms;
return b;
}, "JU.BS,~A");
});
