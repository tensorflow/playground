Clazz.declarePackage ("J.atomdata");
Clazz.load (null, "J.atomdata.AtomData", ["JU.P3", "JU.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.programInfo = null;
this.fileName = null;
this.modelName = null;
this.modelIndex = 0;
this.bsSelected = null;
this.bsIgnored = null;
this.bsMolecules = null;
this.radiusData = null;
this.firstAtomIndex = 0;
this.firstModelIndex = 0;
this.lastModelIndex = 0;
this.hAtomRadius = 0;
this.atomIndex = null;
this.atoms = null;
this.xyz = null;
this.atomRadius = null;
this.atomicNumber = null;
this.atomMolecule = null;
this.hAtoms = null;
this.ac = 0;
this.hydrogenAtomCount = 0;
this.adpMode = 0;
Clazz.instantialize (this, arguments);
}, J.atomdata, "AtomData");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "transformXYZ", 
function (mat, bs) {
var p =  new Array (this.xyz.length);
if (bs == null) bs = JU.BSUtil.newBitSet2 (0, this.xyz.length);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (this.xyz[i] == null) continue;
p[i] = JU.P3.newP (this.xyz[i]);
mat.rotTrans (p[i]);
}
this.xyz = p;
}, "JU.M4,JU.BS");
Clazz.defineStatics (c$,
"MODE_FILL_MODEL", 0,
"MODE_FILL_COORDS", 1,
"MODE_FILL_RADII", 2,
"MODE_FILL_MOLECULES", 4,
"MODE_GET_ATTACHED_HYDROGENS", 8,
"MODE_FILL_MULTIMODEL", 16);
});
