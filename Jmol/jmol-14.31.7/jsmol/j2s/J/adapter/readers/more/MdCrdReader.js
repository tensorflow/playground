Clazz.declarePackage ("J.adapter.readers.more");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.more.MdCrdReader", ["java.lang.Float", "JU.P3", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ptFloat = 0;
this.lenLine = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.more, "MdCrdReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "setup", 
function (fullPath, htParams, readerOrDocument) {
this.requiresBSFilter = true;
this.setupASCR (fullPath, htParams, readerOrDocument);
}, "~S,java.util.Map,~O");
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.initializeTrajectoryFile ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
this.readCoordinates ();
JU.Logger.info ("Total number of trajectory steps=" + this.trajectorySteps.size ());
this.continuing = false;
return false;
});
Clazz.defineMethod (c$, "readCoordinates", 
 function () {
this.line = null;
var ac = (this.bsFilter == null ? this.templateAtomCount : (this.htParams.get ("filteredAtomCount")).intValue ());
var isPeriodic = this.htParams.containsKey ("isPeriodic");
var floatCount = this.templateAtomCount * 3 + (isPeriodic ? 3 : 0);
while (true) if (this.doGetModel (++this.modelNumber, null)) {
var trajectoryStep =  new Array (ac);
if (!this.getTrajectoryStep (trajectoryStep, isPeriodic)) return;
this.trajectorySteps.addLast (trajectoryStep);
if (this.isLastModel (this.modelNumber)) return;
} else {
if (!this.skipFloats (floatCount)) return;
}
});
Clazz.defineMethod (c$, "getFloat", 
 function () {
while (this.line == null || this.ptFloat >= this.lenLine) {
if (this.rd () == null) return NaN;
this.ptFloat = 0;
this.lenLine = this.line.length;
}
this.ptFloat += 8;
return this.parseFloatRange (this.line, this.ptFloat - 8, this.ptFloat);
});
Clazz.defineMethod (c$, "getPoint", 
 function () {
var x = this.getFloat ();
var y = this.getFloat ();
var z = this.getFloat ();
return (Float.isNaN (z) ? null : JU.P3.new3 (x, y, z));
});
Clazz.defineMethod (c$, "getTrajectoryStep", 
 function (trajectoryStep, isPeriodic) {
var ac = trajectoryStep.length;
var n = -1;
for (var i = 0; i < this.templateAtomCount; i++) {
var pt = this.getPoint ();
if (pt == null) return false;
if (this.bsFilter == null || this.bsFilter.get (i)) {
if (++n == ac) return false;
trajectoryStep[n] = pt;
}}
if (isPeriodic) this.getPoint ();
return (this.line != null);
}, "~A,~B");
Clazz.defineMethod (c$, "skipFloats", 
 function (n) {
var i = 0;
while (i < n && this.rd () != null) i += this.getTokens ().length;

return (this.line != null);
}, "~N");
});
