Clazz.declarePackage ("JM");
Clazz.load (["JM.MinObject"], "JM.MinBond", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.rawIndex = 0;
this.index = 0;
this.order = 0;
this.isAromatic = false;
this.isAmide = false;
Clazz.instantialize (this, arguments);
}, JM, "MinBond", JM.MinObject);
Clazz.makeConstructor (c$, 
function (rawIndex, index, atomIndex1, atomIndex2, order, type, key) {
Clazz.superConstructor (this, JM.MinBond, []);
this.rawIndex = rawIndex;
this.index = index;
this.type = type;
this.data =  Clazz.newIntArray (-1, [atomIndex1, atomIndex2]);
this.order = order;
this.key = key;
}, "~N,~N,~N,~N,~N,~N,Integer");
Clazz.defineMethod (c$, "getOtherAtom", 
function (index) {
return this.data[this.data[0] == index ? 1 : 0];
}, "~N");
});
