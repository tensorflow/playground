Clazz.declarePackage ("J.dssx");
Clazz.load (null, "J.dssx.Bridge", ["java.lang.Boolean", "JU.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.a = null;
this.b = null;
this.ladder = null;
this.isAntiparallel = false;
Clazz.instantialize (this, arguments);
}, J.dssx, "Bridge");
Clazz.makeConstructor (c$, 
function (a, b, htLadders) {
this.a = a;
this.b = b;
this.ladder =  Clazz.newIntArray (2, 2, 0);
this.ladder[0][0] = this.ladder[0][1] = Math.min (a.i, b.i);
this.ladder[1][0] = this.ladder[1][1] = Math.max (a.i, b.i);
this.addLadder (htLadders);
}, "JM.Atom,JM.Atom,java.util.Map");
Clazz.defineMethod (c$, "addBridge", 
function (bridge, htLadders) {
if (bridge.isAntiparallel != this.isAntiparallel || !this.canAdd (bridge) || !bridge.canAdd (this)) return false;
this.extendLadder (bridge.ladder[0][0], bridge.ladder[1][0]);
this.extendLadder (bridge.ladder[0][1], bridge.ladder[1][1]);
bridge.ladder = this.ladder;
if (bridge.ladder !== this.ladder) {
htLadders.remove (bridge.ladder);
this.addLadder (htLadders);
}return true;
}, "J.dssx.Bridge,java.util.Map");
Clazz.defineMethod (c$, "addLadder", 
 function (htLadders) {
htLadders.put (this.ladder, (this.isAntiparallel ? Boolean.TRUE : Boolean.FALSE));
}, "java.util.Map");
Clazz.defineMethod (c$, "canAdd", 
 function (bridge) {
var index1 = bridge.a.i;
var index2 = bridge.b.i;
return (this.isAntiparallel ? (index1 >= this.ladder[0][1] && index2 <= this.ladder[1][0] || index1 <= this.ladder[0][0] && index2 >= this.ladder[1][1]) : (index1 <= this.ladder[0][0] && index2 <= this.ladder[1][0] || index1 >= this.ladder[0][1] && index2 >= this.ladder[1][1]));
}, "J.dssx.Bridge");
Clazz.defineMethod (c$, "extendLadder", 
 function (index1, index2) {
if (this.ladder[0][0] > index1) this.ladder[0][0] = index1;
if (this.ladder[0][1] < index1) this.ladder[0][1] = index1;
if (this.ladder[1][0] > index2) this.ladder[1][0] = index2;
if (this.ladder[1][1] < index2) this.ladder[1][1] = index2;
}, "~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return (this.isAntiparallel ? "a " : "p ") + this.a + " - " + this.b + "\t" + JU.Escape.e (this.ladder);
});
});
