Clazz.declarePackage ("JU");
Clazz.load (["javajs.api.JSONEncodable"], "JU.T3", ["java.lang.Float"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
Clazz.instantialize (this, arguments);
}, JU, "T3", null, [javajs.api.JSONEncodable, java.io.Serializable]);
Clazz.defineMethod (c$, "set", 
function (x, y, z) {
this.x = x;
this.y = y;
this.z = z;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setA", 
function (t) {
this.x = t[0];
this.y = t[1];
this.z = t[2];
}, "~A");
Clazz.defineMethod (c$, "setT", 
function (t1) {
this.x = t1.x;
this.y = t1.y;
this.z = t1.z;
}, "JU.T3");
Clazz.defineMethod (c$, "add2", 
function (t1, t2) {
this.x = t1.x + t2.x;
this.y = t1.y + t2.y;
this.z = t1.z + t2.z;
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "add", 
function (t1) {
this.x += t1.x;
this.y += t1.y;
this.z += t1.z;
}, "JU.T3");
Clazz.defineMethod (c$, "distanceSquared", 
function (p1) {
var dx = this.x - p1.x;
var dy = this.y - p1.y;
var dz = this.z - p1.z;
return (dx * dx + dy * dy + dz * dz);
}, "JU.T3");
Clazz.defineMethod (c$, "distance", 
function (p1) {
return Math.sqrt (this.distanceSquared (p1));
}, "JU.T3");
Clazz.defineMethod (c$, "sub2", 
function (t1, t2) {
this.x = t1.x - t2.x;
this.y = t1.y - t2.y;
this.z = t1.z - t2.z;
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "sub", 
function (t1) {
this.x -= t1.x;
this.y -= t1.y;
this.z -= t1.z;
}, "JU.T3");
Clazz.defineMethod (c$, "scale", 
function (s) {
this.x *= s;
this.y *= s;
this.z *= s;
}, "~N");
Clazz.defineMethod (c$, "add3", 
function (a, b, c) {
this.x += a;
this.y += b;
this.z += c;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "scaleT", 
function (p) {
this.x *= p.x;
this.y *= p.y;
this.z *= p.z;
}, "JU.T3");
Clazz.defineMethod (c$, "scaleAdd2", 
function (s, t1, t2) {
this.x = s * t1.x + t2.x;
this.y = s * t1.y + t2.y;
this.z = s * t1.z + t2.z;
}, "~N,JU.T3,JU.T3");
Clazz.defineMethod (c$, "ave", 
function (a, b) {
this.x = (a.x + b.x) / 2;
this.y = (a.y + b.y) / 2;
this.z = (a.z + b.z) / 2;
}, "JU.T3,JU.T3");
Clazz.defineMethod (c$, "dot", 
function (v) {
return this.x * v.x + this.y * v.y + this.z * v.z;
}, "JU.T3");
Clazz.defineMethod (c$, "lengthSquared", 
function () {
return this.x * this.x + this.y * this.y + this.z * this.z;
});
Clazz.defineMethod (c$, "length", 
function () {
return Math.sqrt (this.lengthSquared ());
});
Clazz.defineMethod (c$, "normalize", 
function () {
var d = this.length ();
this.x /= d;
this.y /= d;
this.z /= d;
});
Clazz.defineMethod (c$, "cross", 
function (v1, v2) {
this.set (v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
}, "JU.T3,JU.T3");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var bits = 1;
bits = 31 * bits + JU.T3.floatToIntBits (this.x);
bits = 31 * bits + JU.T3.floatToIntBits (this.y);
bits = 31 * bits + JU.T3.floatToIntBits (this.z);
return (bits ^ (bits >> 32));
});
c$.floatToIntBits = Clazz.defineMethod (c$, "floatToIntBits", 
function (x) {
return (x == 0 ? 0 : Float.floatToIntBits (x));
}, "~N");
Clazz.overrideMethod (c$, "equals", 
function (t1) {
if (!(Clazz.instanceOf (t1, JU.T3))) return false;
var t2 = t1;
return (this.x == t2.x && this.y == t2.y && this.z == t2.z);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return "{" + this.x + ", " + this.y + ", " + this.z + "}";
});
Clazz.overrideMethod (c$, "toJSON", 
function () {
return "[" + this.x + "," + this.y + "," + this.z + "]";
});
});
