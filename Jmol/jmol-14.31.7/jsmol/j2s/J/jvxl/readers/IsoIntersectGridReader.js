Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.VolumeFileReader"], "J.jvxl.readers.IsoIntersectGridReader", ["JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.readers = null;
this.factors = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "IsoIntersectGridReader", J.jvxl.readers.VolumeFileReader);
Clazz.overrideMethod (c$, "init", 
function (sg) {
this.initSR (sg);
var data = sg.getReaderData ();
this.readers = data[0];
this.factors = data[1];
}, "J.jvxl.readers.SurfaceGenerator");
Clazz.defineMethod (c$, "readVolumeParameters", 
function (isMapData) {
for (var i = this.readers.length; --i >= 0; ) if (!this.readers[i].readVolumeParameters (isMapData)) return false;

return true;
}, "~B");
Clazz.defineMethod (c$, "getNextVoxelValue", 
function () {
var f = 0;
for (var i = this.readers.length; --i >= 0; ) f += this.factors[i] * this.readers[i].getNextVoxelValue ();

return f;
});
Clazz.overrideMethod (c$, "closeReader", 
function () {
if (this.readerClosed) return;
this.readerClosed = true;
for (var i = this.readers.length; --i >= 0; ) this.readers[i].closeReaderSFR ();

if (this.nData == 0 || this.dataMax == -3.4028235E38) return;
this.dataMean /= this.nData;
JU.Logger.info ("IsoIntersectFileReader closing file: " + this.nData + " points read \ndata min/max/mean = " + this.dataMin + "/" + this.dataMax + "/" + this.dataMean);
});
Clazz.overrideMethod (c$, "readParameters", 
function () {
});
});
