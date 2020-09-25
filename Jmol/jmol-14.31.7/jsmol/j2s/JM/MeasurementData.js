Clazz.declarePackage ("JM");
Clazz.load (["J.api.JmolMeasurementClient"], "JM.MeasurementData", ["java.lang.Float", "JU.BS", "$.Lst", "JM.Measurement", "JU.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.client = null;
this.measurementStrings = null;
this.measurements = null;
this.points = null;
this.mustBeConnected = false;
this.mustNotBeConnected = false;
this.tickInfo = null;
this.tokAction = 12290;
this.radiusData = null;
this.strFormat = null;
this.property = null;
this.note = null;
this.isAll = false;
this.colix = 0;
this.intramolecular = null;
this.mad = 0;
this.thisID = null;
this.text = null;
this.units = null;
this.fixedValue = 0;
this.atoms = null;
this.minArray = null;
this.ms = null;
this.allowSelf = false;
this.vwr = null;
this.iFirstAtom = 0;
this.justOneModel = true;
this.htMin = null;
Clazz.instantialize (this, arguments);
}, JM, "MeasurementData", null, J.api.JmolMeasurementClient);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "init", 
function (id, vwr, points) {
this.vwr = vwr;
this.points = points;
this.thisID = id;
return this;
}, "~S,JV.Viewer,JU.Lst");
Clazz.defineMethod (c$, "setModelSet", 
function (m) {
this.ms = m;
return this;
}, "JM.ModelSet");
Clazz.defineMethod (c$, "set", 
function (tokAction, htMin, radiusData, property, strFormat, units, tickInfo, mustBeConnected, mustNotBeConnected, intramolecular, isAll, mad, colix, text, value) {
this.ms = this.vwr.ms;
this.tokAction = tokAction;
if (this.points.size () >= 2 && Clazz.instanceOf (this.points.get (0), JU.BS) && Clazz.instanceOf (this.points.get (1), JU.BS)) {
this.justOneModel = JU.BSUtil.haveCommon (this.vwr.ms.getModelBS (this.points.get (0), false), this.vwr.ms.getModelBS (this.points.get (1), false));
}this.htMin = htMin;
this.radiusData = radiusData;
this.property = property;
this.strFormat = strFormat;
this.units = units;
this.tickInfo = tickInfo;
this.mustBeConnected = mustBeConnected;
this.mustNotBeConnected = mustNotBeConnected;
this.intramolecular = intramolecular;
this.isAll = isAll;
this.mad = mad;
this.colix = colix;
this.text = text;
this.fixedValue = value;
return this;
}, "~N,java.util.Map,J.atomdata.RadiusData,~S,~S,~S,JM.TickInfo,~B,~B,Boolean,~B,~N,~N,JM.Text,~N");
Clazz.defineMethod (c$, "processNextMeasure", 
function (m) {
var value = m.getMeasurement (null);
if (this.htMin != null && !m.isMin (this.htMin) || this.radiusData != null && !m.isInRange (this.radiusData, value)) return;
if (this.measurementStrings == null && this.measurements == null) {
var f = this.minArray[this.iFirstAtom];
m.value = value;
value = m.fixValue (this.units, false);
this.minArray[this.iFirstAtom] = (1 / f == -Infinity ? value : Math.min (f, value));
return;
}if (this.measurementStrings != null) this.measurementStrings.addLast (m.getStringUsing (this.vwr, this.strFormat, this.units));
 else this.measurements.addLast (Float.$valueOf (m.getMeasurement (null)));
}, "JM.Measurement");
Clazz.defineMethod (c$, "getMeasurements", 
function (asFloatArray, asMinArray) {
if (asMinArray) {
this.minArray =  Clazz.newFloatArray ((this.points.get (0)).cardinality (), 0);
for (var i = 0; i < this.minArray.length; i++) this.minArray[i] = -0.0;

this.define (null, this.ms);
return this.minArray;
}if (asFloatArray) {
this.allowSelf = true;
this.measurements =  new JU.Lst ();
this.define (null, this.ms);
return this.measurements;
}this.measurementStrings =  new JU.Lst ();
this.define (null, this.ms);
return this.measurementStrings;
}, "~B,~B");
Clazz.defineMethod (c$, "define", 
function (client, modelSet) {
this.client = (client == null ? this : client);
this.atoms = modelSet.at;
var nPoints = this.points.size ();
if (nPoints < 2) return;
var modelIndex = -1;
var pts =  new Array (4);
var indices =  Clazz.newIntArray (5, 0);
var m =  new JM.Measurement ().setPoints (modelSet, indices, pts, null);
m.setCount (nPoints);
m.property = this.property;
m.strFormat = this.strFormat;
m.units = this.units;
m.fixedValue = this.fixedValue;
var ptLastAtom = -1;
for (var i = 0; i < nPoints; i++) {
var obj = this.points.get (i);
if (Clazz.instanceOf (obj, JU.BS)) {
var bs = obj;
var nAtoms = bs.cardinality ();
if (nAtoms == 0) return;
if (nAtoms > 1) modelIndex = 0;
ptLastAtom = i;
if (i == 0) this.iFirstAtom = 0;
indices[i + 1] = bs.nextSetBit (0);
} else {
pts[i] = obj;
indices[i + 1] = -2 - i;
}}
this.nextMeasure (0, ptLastAtom, m, modelIndex);
}, "J.api.JmolMeasurementClient,JM.ModelSet");
Clazz.defineMethod (c$, "nextMeasure", 
 function (thispt, ptLastAtom, m, thisModel) {
if (thispt > ptLastAtom) {
if ((this.allowSelf && !this.mustBeConnected && !this.mustNotBeConnected || m.isValid ()) && (!this.mustBeConnected || m.isConnected (this.atoms, thispt)) && (!this.mustNotBeConnected || !m.isConnected (this.atoms, thispt)) && (this.intramolecular == null || m.isIntramolecular (this.atoms, thispt) == this.intramolecular.booleanValue ())) this.client.processNextMeasure (m);
return;
}var bs = this.points.get (thispt);
var indices = m.countPlusIndices;
var thisAtomIndex = (thispt == 0 ? 2147483647 : indices[thispt]);
if (thisAtomIndex < 0) {
this.nextMeasure (thispt + 1, ptLastAtom, m, thisModel);
return;
}var haveNext = false;
for (var i = bs.nextSetBit (0), pt = 0; i >= 0; i = bs.nextSetBit (i + 1), pt++) {
if (i == thisAtomIndex && !this.allowSelf) continue;
var modelIndex = this.atoms[i].mi;
if (thisModel >= 0 && this.justOneModel) {
if (thispt == 0) thisModel = modelIndex;
 else if (thisModel != modelIndex) continue;
}indices[thispt + 1] = i;
if (thispt == 0) this.iFirstAtom = pt;
haveNext = true;
this.nextMeasure (thispt + 1, ptLastAtom, m, thisModel);
}
if (!haveNext) this.nextMeasure (thispt + 1, ptLastAtom, m, thisModel);
}, "~N,~N,JM.Measurement,~N");
});
