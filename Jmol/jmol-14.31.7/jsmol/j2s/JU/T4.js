Clazz.declarePackage ("JU");
Clazz.load (["JU.T3"], "JU.T4", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.w = 0;
Clazz.instantialize (this, arguments);
}, JU, "T4", JU.T3);
Clazz.defineMethod (c$, "set4", 
function (x, y, z, w) {
this.x = x;
this.y = y;
this.z = z;
this.w = w;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "scale4", 
function (s) {
this.scale (s);
this.w *= s;
}, "~N");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return JU.T3.floatToIntBits (this.x) ^ JU.T3.floatToIntBits (this.y) ^ JU.T3.floatToIntBits (this.z) ^ JU.T3.floatToIntBits (this.w);
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, JU.T4))) return false;
var t = o;
return (this.x == t.x && this.y == t.y && this.z == t.z && this.w == t.w);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
});
Clazz.overrideMethod (c$, "toJSON", 
function () {
return "[" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + "]";
});
});
