Clazz.declarePackage ("J.bspt");
Clazz.load (null, "J.bspt.CubeIterator", ["J.bspt.Node"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bspt = null;
this.stack = null;
this.sp = 0;
this.leafIndex = 0;
this.leaf = null;
this.radius = 0;
this.cx = 0;
this.cy = 0;
this.cz = 0;
this.dx = 0;
this.dy = 0;
this.dz = 0;
this.tHemisphere = false;
Clazz.instantialize (this, arguments);
}, J.bspt, "CubeIterator");
Clazz.makeConstructor (c$, 
function (bspt) {
this.set (bspt);
}, "J.bspt.Bspt");
Clazz.defineMethod (c$, "set", 
function (bspt) {
this.bspt = bspt;
this.stack =  new Array (bspt.treeDepth);
}, "J.bspt.Bspt");
Clazz.defineMethod (c$, "initialize", 
function (center, radius, hemisphereOnly) {
this.radius = radius;
this.tHemisphere = false;
this.cx = center.x;
this.cy = center.y;
this.cz = center.z;
this.leaf = null;
if (this.stack.length < this.bspt.treeDepth) this.set (this.bspt);
this.stack[0] = this.bspt.eleRoot;
this.sp = 1;
this.findLeftLeaf ();
this.tHemisphere = hemisphereOnly;
}, "JU.T3,~N,~B");
Clazz.defineMethod (c$, "release", 
function () {
this.set (this.bspt);
});
Clazz.defineMethod (c$, "hasMoreElements", 
function () {
while (this.leaf != null) {
for (; this.leafIndex < this.leaf.count; ++this.leafIndex) if (this.isWithinRadius (this.leaf.tuples[this.leafIndex])) return true;

this.findLeftLeaf ();
}
return false;
});
Clazz.defineMethod (c$, "nextElement", 
function () {
return this.leaf.tuples[this.leafIndex++];
});
Clazz.defineMethod (c$, "foundDistance2", 
function () {
return this.dx * this.dx + this.dy * this.dy + this.dz * this.dz;
});
Clazz.defineMethod (c$, "findLeftLeaf", 
 function () {
this.leaf = null;
if (this.sp == 0) return;
var ele = this.stack[--this.sp];
while (Clazz.instanceOf (ele, J.bspt.Node)) {
var node = ele;
var minValue;
switch (node.dim) {
case 0:
minValue = this.cx;
break;
case 1:
minValue = this.cy;
break;
case 2:
default:
minValue = this.cz;
break;
}
var maxValue = minValue + this.radius;
if (!this.tHemisphere || node.dim != 0) minValue -= this.radius;
if (minValue <= node.maxLeft && maxValue >= node.minLeft) {
if (maxValue >= node.minRight && minValue <= node.maxRight) {
this.stack[this.sp++] = node.eleRight;
}ele = node.eleLeft;
} else if (maxValue >= node.minRight && minValue <= node.maxRight) {
ele = node.eleRight;
} else {
if (this.sp == 0) return;
ele = this.stack[--this.sp];
}}
this.leaf = ele;
this.leafIndex = 0;
});
Clazz.defineMethod (c$, "isWithinRadius", 
 function (t) {
this.dx = t.x - this.cx;
return ((!this.tHemisphere || this.dx >= 0) && (this.dx = Math.abs (this.dx)) <= this.radius && (this.dy = Math.abs (t.y - this.cy)) <= this.radius && (this.dz = Math.abs (t.z - this.cz)) <= this.radius);
}, "JU.T3");
});
