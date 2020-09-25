Clazz.declarePackage ("JM");
Clazz.load (["JM.AtomIteratorWithinModel"], "JM.AtomIteratorWithinModelSet", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bsModels = null;
this.center = null;
this.distance = 0;
Clazz.instantialize (this, arguments);
}, JM, "AtomIteratorWithinModelSet", JM.AtomIteratorWithinModel);
Clazz.makeConstructor (c$, 
function (bsModels) {
Clazz.superConstructor (this, JM.AtomIteratorWithinModelSet, []);
this.bsModels = bsModels;
}, "JU.BS");
Clazz.overrideMethod (c$, "setCenter", 
function (center, distance) {
this.center = center;
this.distance = distance;
this.set (0);
}, "JU.T3,~N");
Clazz.defineMethod (c$, "set", 
 function (iModel) {
if ((this.modelIndex = this.bsModels.nextSetBit (iModel)) < 0 || (this.cubeIterator = this.bspf.getCubeIterator (this.modelIndex)) == null) return false;
this.setCenter2 (this.center, this.distance);
return true;
}, "~N");
Clazz.overrideMethod (c$, "hasNext", 
function () {
if (this.hasNext2 ()) return true;
if (!this.set (this.modelIndex + 1)) return false;
return this.hasNext ();
});
});
