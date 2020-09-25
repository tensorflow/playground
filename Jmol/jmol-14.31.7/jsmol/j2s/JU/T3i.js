Clazz.declarePackage ("JU");
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
Clazz.instantialize (this, arguments);
}, JU, "T3i", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (x, y, z) {
this.x = x;
this.y = y;
this.z = z;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setT", 
function (t1) {
this.x = t1.x;
this.y = t1.y;
this.z = t1.z;
}, "JU.T3i");
Clazz.defineMethod (c$, "add", 
function (t) {
this.x += t.x;
this.y += t.y;
this.z += t.z;
}, "JU.T3i");
Clazz.defineMethod (c$, "scaleAdd", 
function (s, t1, t2) {
this.x = s * t1.x + t2.x;
this.y = s * t1.y + t2.y;
this.z = s * t1.z + t2.z;
}, "~N,JU.T3i,JU.T3i");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.x ^ this.y ^ this.z;
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, JU.T3i))) return false;
var t = o;
return (this.x == t.x && this.y == t.y && this.z == t.z);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ")";
});
