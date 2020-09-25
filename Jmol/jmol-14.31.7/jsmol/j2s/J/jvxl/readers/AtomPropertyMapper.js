Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.AtomDataReader"], "J.jvxl.readers.AtomPropertyMapper", ["java.lang.Float", "J.api.Interface", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mepCalc = null;
this.mepType = null;
this.calcType = 0;
this.doSmoothProperty = false;
this.iter = null;
this.smoothingPower = 0;
this.iAtomSurface = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "AtomPropertyMapper", J.jvxl.readers.AtomDataReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.AtomPropertyMapper, []);
});
Clazz.overrideMethod (c$, "init", 
function (sg) {
this.initADR (sg);
this.mepType = sg.getReaderData ();
}, "J.jvxl.readers.SurfaceGenerator");
Clazz.overrideMethod (c$, "setup", 
function (isMapData) {
this.setup2 ();
this.haveSurfaceAtoms = true;
this.volumeData.sr = this;
this.volumeData.doIterate = false;
this.point = this.params.point;
this.doSmoothProperty = this.params.propertySmoothing;
this.doUseIterator = true;
if (this.doSmoothProperty) {
this.smoothingPower = this.params.propertySmoothingPower;
if (this.smoothingPower < 0) this.smoothingPower = 0;
 else if (this.smoothingPower > 10) this.smoothingPower = 10;
if (this.smoothingPower == 0) this.doSmoothProperty = false;
this.smoothingPower = (this.smoothingPower - 11) / 2;
}this.maxDistance = this.params.propertyDistanceMax;
if (this.mepType != null) {
this.doSmoothProperty = true;
if (this.params.mep_calcType >= 0) this.calcType = this.params.mep_calcType;
this.mepCalc = J.api.Interface.getOption ("quantum." + this.mepType + "Calculation", this.sg.atomDataServer, "file");
}if (!this.doSmoothProperty && this.maxDistance == 2147483647) this.maxDistance = 5;
this.getAtoms (this.params.bsSelected, this.doAddHydrogens, true, false, false, true, false, NaN, null);
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
if (!this.doSmoothProperty && this.meshData.vertexSource != null) {
this.hasColorData = true;
for (var i = this.meshData.vc; --i >= 0; ) {
var iAtom = this.meshData.vertexSource[i];
if (iAtom >= 0) {
this.meshData.vvs[i] = this.params.theProperty[iAtom];
} else {
this.hasColorData = false;
break;
}}
}this.setHeader ("property", this.params.calculationType);
this.setRanges (this.params.solvent_ptsPerAngstrom, this.params.solvent_gridMax, 0);
this.params.cutoff = 0;
}, "~B");
Clazz.overrideMethod (c$, "setVolumeData", 
function () {
if (this.params.thePlane != null) this.setVolumeDataADR ();
});
Clazz.overrideMethod (c$, "initializeMapping", 
function () {
if (this.params.showTiming) JU.Logger.startTimer ("property mapping");
if (this.bsNearby != null) this.bsMySelected.or (this.bsNearby);
this.iter = this.sg.atomDataServer.getSelectedAtomIterator (this.bsMySelected, false, false, false);
});
Clazz.overrideMethod (c$, "finalizeMapping", 
function () {
this.iter.release ();
this.iter = null;
if (this.params.showTiming) JU.Logger.checkTimer ("property mapping", false);
});
Clazz.overrideMethod (c$, "generateCube", 
function () {
});
Clazz.overrideMethod (c$, "getSurfaceAtomIndex", 
function () {
return this.iAtomSurface;
});
Clazz.overrideMethod (c$, "getValueAtPoint", 
function (pt, getSource) {
if (this.haveOneProperty && !getSource) return this.theProperty;
var dmin = 3.4028235E38;
var dminNearby = 3.4028235E38;
var value = (this.doSmoothProperty ? 0 : NaN);
var vdiv = 0;
this.sg.atomDataServer.setIteratorForPoint (this.iter, this.modelIndex, pt, this.maxDistance);
this.iAtomSurface = -1;
while (this.iter.hasNext ()) {
var ia = this.iter.next ();
var myAtom = this.myIndex[ia];
var isNearby = (myAtom >= this.firstNearbyAtom);
var ptA = this.atomXyzTruncated[myAtom];
var p = this.atomProp[myAtom];
if (Float.isNaN (p)) continue;
var d2 = pt.distanceSquared (ptA);
if (isNearby) {
if (d2 < dminNearby) {
dminNearby = d2;
if (!this.doSmoothProperty && dminNearby < dmin) {
dmin = d2;
value = NaN;
}}} else if (d2 < dmin) {
dmin = d2;
this.iAtomSurface = ia;
if (!this.doSmoothProperty) value = p;
}if (this.mepCalc != null) {
value += this.mepCalc.valueFor (p, d2, this.calcType);
} else if (this.doSmoothProperty) {
d2 = Math.pow (d2, this.smoothingPower);
vdiv += d2;
value += d2 * p;
}}
return (this.mepCalc != null ? value : this.doSmoothProperty ? (vdiv == 0 || dminNearby < dmin ? NaN : value / vdiv) : value);
}, "JU.T3,~B");
});
