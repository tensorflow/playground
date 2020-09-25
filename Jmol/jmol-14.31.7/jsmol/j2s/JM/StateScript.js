Clazz.declarePackage ("JM");
Clazz.load (null, "JM.StateScript", ["JU.SB", "JU.BSUtil", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelIndex = 0;
this.bsBonds = null;
this.bsAtoms1 = null;
this.bsAtoms2 = null;
this.script1 = null;
this.script2 = null;
this.inDefinedStateBlock = false;
Clazz.instantialize (this, arguments);
}, JM, "StateScript");
Clazz.makeConstructor (c$, 
function (modelIndex, script1, bsBonds, bsAtoms1, bsAtoms2, script2, inDefinedStateBlock) {
this.modelIndex = modelIndex;
this.script1 = script1;
this.bsBonds = JU.BSUtil.copy (bsBonds);
this.bsAtoms1 = JU.BSUtil.copy (bsAtoms1);
this.bsAtoms2 = JU.BSUtil.copy (bsAtoms2);
this.script2 = script2;
this.inDefinedStateBlock = inDefinedStateBlock;
}, "~N,~S,JU.BS,JU.BS,JU.BS,~S,~B");
Clazz.defineMethod (c$, "isValid", 
function () {
return this.script1 != null && this.script1.length > 0 && (this.bsBonds == null || this.bsBonds.nextSetBit (0) >= 0) && (this.bsAtoms1 == null || this.bsAtoms1.nextSetBit (0) >= 0) && (this.bsAtoms2 == null || this.bsAtoms2.nextSetBit (0) >= 0);
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (!this.isValid ()) return "";
var sb = JU.SB.newS (this.script1);
if (this.bsBonds != null) sb.append (" ").append (JU.Escape.eBond (this.bsBonds));
if (this.bsAtoms1 != null) sb.append (" ").append (JU.Escape.eBS (this.bsAtoms1));
if (this.bsAtoms2 != null) sb.append (" ").append (JU.Escape.eBS (this.bsAtoms2));
if (this.script2 != null) sb.append (" ").append (this.script2);
var s = sb.toString ();
if (!s.endsWith (";")) s += ";";
return s;
});
Clazz.defineMethod (c$, "isConnect", 
function () {
return (this.script1.indexOf ("connect") >= 0);
});
Clazz.defineMethod (c$, "deleteAtoms", 
function (modelIndex, bsBonds, bsAtoms) {
if (modelIndex == this.modelIndex) return false;
if (modelIndex > this.modelIndex) {
return true;
}JU.BSUtil.deleteBits (this.bsBonds, bsBonds);
JU.BSUtil.deleteBits (this.bsAtoms1, bsAtoms);
JU.BSUtil.deleteBits (this.bsAtoms2, bsAtoms);
return this.isValid ();
}, "~N,JU.BS,JU.BS");
Clazz.defineMethod (c$, "setModelIndex", 
function (index) {
this.modelIndex = index;
}, "~N");
});
