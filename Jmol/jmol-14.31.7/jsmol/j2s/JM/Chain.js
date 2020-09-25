Clazz.declarePackage ("JM");
Clazz.load (["JM.Structure"], "JM.Chain", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.model = null;
this.chainID = 0;
this.chainNo = 0;
this.groups = null;
this.groupCount = 0;
this.selectedGroupCount = 0;
Clazz.instantialize (this, arguments);
}, JM, "Chain", null, JM.Structure);
Clazz.makeConstructor (c$, 
function (model, chainID, chainNo) {
this.model = model;
this.chainID = chainID;
this.chainNo = chainNo;
this.groups =  new Array (16);
}, "JM.Model,~N,~N");
Clazz.defineMethod (c$, "getIDStr", 
function () {
return (this.chainID == 0 ? "" : this.chainID < 256 ? "" + String.fromCharCode (this.chainID) : this.model.ms.vwr.getChainIDStr (this.chainID));
});
Clazz.defineMethod (c$, "calcSelectedGroupsCount", 
function (bsSelected) {
this.selectedGroupCount = 0;
for (var i = 0; i < this.groupCount; i++) this.groups[i].selectedIndex = (this.groups[i].isSelected (bsSelected) ? this.selectedGroupCount++ : -1);

}, "JU.BS");
Clazz.defineMethod (c$, "fixIndices", 
function (atomsDeleted, bsDeleted) {
for (var i = 0; i < this.groupCount; i++) this.groups[i].fixIndices (atomsDeleted, bsDeleted);

}, "~N,JU.BS");
Clazz.overrideMethod (c$, "setAtomBits", 
function (bs) {
for (var i = 0; i < this.groupCount; i++) this.groups[i].setAtomBits (bs);

}, "JU.BS");
Clazz.overrideMethod (c$, "setAtomBitsAndClear", 
function (bs, bsOut) {
for (var i = 0; i < this.groupCount; i++) this.groups[i].setAtomBitsAndClear (bs, bsOut);

}, "JU.BS,JU.BS");
});
