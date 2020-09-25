Clazz.declarePackage ("JSV.export");
Clazz.load (["JSV.api.JSVExporter"], "JSV.export.JDXExporter", ["JU.DF", "$.PT", "JSV.common.Coordinate", "$.ExportType", "JSV.export.JDXCompressor", "JSV.source.JDXReader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.out = null;
this.type = null;
this.spectrum = null;
this.vwr = null;
Clazz.instantialize (this, arguments);
}, JSV["export"], "JDXExporter", null, JSV.api.JSVExporter);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "exportTheSpectrum", 
function (viewer, type, out, spectrum, startIndex, endIndex, pd, asBase64) {
this.out = out;
this.type = type;
this.spectrum = spectrum;
this.vwr = viewer;
this.toStringAux (startIndex, endIndex);
out.closeChannel ();
return "OK " + out.getByteCount () + " bytes";
}, "JSV.common.JSViewer,JSV.common.ExportType,JU.OC,JSV.common.Spectrum,~N,~N,JSV.common.PanelData,~B");
Clazz.defineMethod (c$, "toStringAux", 
 function (startIndex, endIndex) {
var newXYCoords = this.spectrum.getXYCoords ();
var tabDataSet = "";
var tmpDataClass = "XYDATA";
if (this.spectrum.isHZtoPPM ()) {
var xyCoords = newXYCoords;
newXYCoords =  new Array (xyCoords.length);
for (var i = 0; i < xyCoords.length; i++) newXYCoords[i] = xyCoords[i].copy ();

JSV.common.Coordinate.applyScale (newXYCoords, this.spectrum.getObservedFreq (), 1);
}var xCompFactor = this.spectrum.getXFactor ();
var isIntegerX = JSV["export"].JDXExporter.areIntegers (newXYCoords, startIndex, endIndex, 1.0, true);
if (!isIntegerX && !JSV["export"].JDXExporter.areIntegers (newXYCoords, startIndex, endIndex, xCompFactor, true)) xCompFactor = 1;
var minY = JSV.common.Coordinate.getMinY (newXYCoords, startIndex, endIndex);
var maxY = JSV.common.Coordinate.getMaxY (newXYCoords, startIndex, endIndex);
var yCompFactor = this.spectrum.getYFactor ();
switch (this.type) {
case JSV.common.ExportType.XY:
yCompFactor = 1;
tmpDataClass = (this.spectrum.isContinuous () ? "XYDATA" : "XYPOINTS");
break;
case JSV.common.ExportType.PAC:
yCompFactor = 1;
break;
default:
var isIntegerY = JSV["export"].JDXExporter.areIntegers (newXYCoords, startIndex, endIndex, 1.0, false);
if (!isIntegerY && !JSV["export"].JDXExporter.areIntegers (newXYCoords, startIndex, endIndex, yCompFactor, false)) {
yCompFactor = (maxY - minY) / 1000000.0;
}break;
}
var step = 1;
if (this.spectrum.isExportXAxisLeftToRight () != (this.spectrum.getFirstX () < this.spectrum.getLastX ())) {
var t = startIndex;
startIndex = endIndex;
endIndex = t;
step = -1;
}switch (this.type) {
case JSV.common.ExportType.DIF:
case JSV.common.ExportType.DIFDUP:
tabDataSet = JSV["export"].JDXCompressor.compressDIF (newXYCoords, startIndex, endIndex, step, xCompFactor, yCompFactor, this.type === JSV.common.ExportType.DIFDUP);
break;
case JSV.common.ExportType.FIX:
tabDataSet = JSV["export"].JDXCompressor.compressFIX (newXYCoords, startIndex, endIndex, step, xCompFactor, yCompFactor);
break;
case JSV.common.ExportType.PAC:
tabDataSet = JSV["export"].JDXCompressor.compressPAC (newXYCoords, startIndex, endIndex, step, xCompFactor, yCompFactor);
break;
case JSV.common.ExportType.SQZ:
tabDataSet = JSV["export"].JDXCompressor.compressSQZ (newXYCoords, startIndex, endIndex, step, xCompFactor, yCompFactor);
break;
case JSV.common.ExportType.XY:
tabDataSet = JSV["export"].JDXCompressor.getXYList (newXYCoords, startIndex, endIndex, step);
break;
default:
break;
}
var varList = JSV.source.JDXReader.getVarList (tmpDataClass);
this.getHeaderString (tmpDataClass, minY, maxY, xCompFactor, yCompFactor, startIndex, endIndex);
this.out.append ("##" + tmpDataClass + "= " + varList + JSV["export"].JDXExporter.newLine);
this.out.append (tabDataSet);
this.out.append ("##END=");
}, "~N,~N");
Clazz.defineMethod (c$, "getHeaderString", 
 function (tmpDataClass, minY, maxY, tmpXFactor, tmpYFactor, startIndex, endIndex) {
this.out.append ("##TITLE= ").append (this.spectrum.getTitle ()).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##JCAMP-DX= 5.01").append (JSV["export"].JDXExporter.newLine);
this.out.append ("##DATA TYPE= ").append (this.spectrum.getDataType ()).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##DATA CLASS= ").append (tmpDataClass).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##ORIGIN= ").append (this.spectrum.getOrigin ()).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##OWNER= ").append (this.spectrum.getOwner ()).append (JSV["export"].JDXExporter.newLine);
var d = this.spectrum.getDate ();
var longdate = "";
var currentTime = this.vwr.apiPlatform.getDateFormat (null);
if (this.spectrum.getLongDate ().equals ("") || d.length != 8) {
longdate = currentTime + " $$ export date from JSpecView";
} else if (d.length == 8) {
longdate = (d.charAt (0) < '5' ? "20" : "19") + d + " " + this.spectrum.getTime ();
} else {
longdate = this.spectrum.getLongDate ();
}this.out.append ("##LONGDATE= ").append (longdate).append (JSV["export"].JDXExporter.newLine);
var headerTable = this.spectrum.getHeaderTable ();
for (var i = 0; i < headerTable.size (); i++) {
var entry = headerTable.get (i);
var label = entry[0];
var dataSet = entry[1];
var nl = (dataSet.startsWith ("<") && dataSet.contains ("</") ? JSV["export"].JDXExporter.newLine : "");
this.out.append (label).append ("= ").append (nl).append (dataSet).append (JSV["export"].JDXExporter.newLine);
}
var observedFreq = this.spectrum.getObservedFreq ();
if (!this.spectrum.is1D ()) this.out.append ("##NUM DIM= ").append ("" + this.spectrum.numDim).append (JSV["export"].JDXExporter.newLine);
if (observedFreq != 1.7976931348623157E308) this.out.append ("##.OBSERVE FREQUENCY= ").append ("" + observedFreq).append (JSV["export"].JDXExporter.newLine);
if (this.spectrum.observedNucl !== "") this.out.append ("##.OBSERVE NUCLEUS= ").append (this.spectrum.observedNucl).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##XUNITS= ").append (this.spectrum.isHZtoPPM () ? "HZ" : this.spectrum.getXUnits ()).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##YUNITS= ").append (this.spectrum.getYUnits ()).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##XFACTOR= ").append (JSV["export"].JDXExporter.fixExponentInt (tmpXFactor)).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##YFACTOR= ").append (JSV["export"].JDXExporter.fixExponentInt (tmpYFactor)).append (JSV["export"].JDXExporter.newLine);
var f = (this.spectrum.isHZtoPPM () ? observedFreq : 1);
var xyCoords = this.spectrum.getXYCoords ();
this.out.append ("##FIRSTX= ").append (JSV["export"].JDXExporter.fixExponentInt (xyCoords[startIndex].getXVal () * f)).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##FIRSTY= ").append (JSV["export"].JDXExporter.fixExponentInt (xyCoords[startIndex].getYVal ())).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##LASTX= ").append (JSV["export"].JDXExporter.fixExponentInt (xyCoords[endIndex].getXVal () * f)).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##NPOINTS= ").append ("" + (Math.abs (endIndex - startIndex) + 1)).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##MINY= ").append (JSV["export"].JDXExporter.fixExponentInt (minY)).append (JSV["export"].JDXExporter.newLine);
this.out.append ("##MAXY= ").append (JSV["export"].JDXExporter.fixExponentInt (maxY)).append (JSV["export"].JDXExporter.newLine);
}, "~S,~N,~N,~N,~N,~N,~N");
c$.areIntegers = Clazz.defineMethod (c$, "areIntegers", 
 function (xyCoords, startIndex, endIndex, factor, isX) {
for (var i = startIndex; i <= endIndex; i++) {
var x = (isX ? xyCoords[i].getXVal () : xyCoords[i].getYVal ()) / factor;
if (JSV["export"].JDXExporter.isAlmostInteger (x)) return false;
}
return true;
}, "~A,~N,~N,~N,~B");
c$.isAlmostInteger = Clazz.defineMethod (c$, "isAlmostInteger", 
 function (x) {
return (x != 0 && Math.abs (x - Math.floor (x)) / x > 1e-8);
}, "~N");
c$.fixExponentInt = Clazz.defineMethod (c$, "fixExponentInt", 
 function (x) {
return (x == Math.floor (x) ? String.valueOf (Clazz.doubleToInt (x)) : JU.PT.rep (JSV["export"].JDXExporter.fixExponent (x), "E+00", ""));
}, "~N");
c$.fixExponent = Clazz.defineMethod (c$, "fixExponent", 
 function (x) {
var s = JU.DF.formatDecimalDbl (x, -7);
var pt = s.indexOf ("E");
if (pt < 0) {
return s;
}if (s.length == pt + 3) s = s.substring (0, pt + 2) + "0" + s.substring (pt + 2);
return s;
}, "~N");
c$.newLine = c$.prototype.newLine = System.getProperty ("line.separator");
Clazz.defineStatics (c$,
"FACTOR_DIVISOR", 1000000);
});
