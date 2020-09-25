Clazz.declarePackage ("JSV.common");
Clazz.load (["java.lang.Enum", "JSV.source.JDXDataObject", "JU.Lst"], "JSV.common.Spectrum", ["java.lang.Boolean", "$.Double", "java.util.Hashtable", "JU.PT", "JSV.common.Coordinate", "$.Parameters", "$.PeakInfo", "JSV.source.JDXSourceStreamTokenizer", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.subSpectra = null;
this.peakList = null;
this.piUnitsX = null;
this.piUnitsY = null;
this.selectedPeak = null;
this.highlightedPeak = null;
this.specShift = 0;
this.currentSubSpectrumIndex = 0;
this.$isForcedSubset = false;
this.id = "";
this.convertedSpectrum = null;
this.userYFactor = 1;
this.exportXAxisLeftToRight = false;
this.fillColor = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "Spectrum", JSV.source.JDXDataObject);
Clazz.prepareFields (c$, function () {
this.peakList =  new JU.Lst ();
});
Clazz.overrideMethod (c$, "finalize", 
function () {
System.out.println ("JDXSpectrum " + this + " finalized " + this.title);
});
Clazz.defineMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "isForcedSubset", 
function () {
return this.$isForcedSubset;
});
Clazz.defineMethod (c$, "setId", 
function (id) {
this.id = id;
}, "~S");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.common.Spectrum, []);
this.headerTable =  new JU.Lst ();
this.xyCoords =  new Array (0);
this.parent = this;
});
Clazz.defineMethod (c$, "copy", 
function () {
var newSpectrum =  new JSV.common.Spectrum ();
this.copyTo (newSpectrum);
newSpectrum.setPeakList (this.peakList, this.piUnitsX, null);
newSpectrum.fillColor = this.fillColor;
return newSpectrum;
});
Clazz.defineMethod (c$, "getXYCoords", 
function () {
return this.getCurrentSubSpectrum ().xyCoords;
});
Clazz.defineMethod (c$, "getPeakList", 
function () {
return this.peakList;
});
Clazz.defineMethod (c$, "setPeakList", 
function (list, piUnitsX, piUnitsY) {
this.peakList = list;
this.piUnitsX = piUnitsX;
this.piUnitsY = piUnitsY;
for (var i = list.size (); --i >= 0; ) this.peakList.get (i).spectrum = this;

if (JU.Logger.debugging) JU.Logger.info ("Spectrum " + this.getTitle () + " peaks: " + list.size ());
return list.size ();
}, "JU.Lst,~S,~S");
Clazz.defineMethod (c$, "selectPeakByFileIndex", 
function (filePath, index, atomKey) {
if (this.peakList != null && this.peakList.size () > 0 && (atomKey == null || this.sourceID.equals (index))) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkFileIndex (filePath, index, atomKey)) {
System.out.println ("selecting peak by FileIndex " + this + " " + this.peakList.get (i));
return (this.selectedPeak = this.peakList.get (i));
}
return null;
}, "~S,~S,~S");
Clazz.defineMethod (c$, "selectPeakByFilePathTypeModel", 
function (filePath, type, model) {
if (this.peakList != null && this.peakList.size () > 0) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkFileTypeModel (filePath, type, model)) {
System.out.println ("selecting peak byFilePathTypeModel " + this + " " + this.peakList.get (i));
return (this.selectedPeak = this.peakList.get (i));
}
return null;
}, "~S,~S,~S");
Clazz.defineMethod (c$, "matchesPeakTypeModel", 
function (type, model) {
if (type.equals ("ID")) return (this.sourceID.equalsIgnoreCase (model));
if (this.peakList != null && this.peakList.size () > 0) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkTypeModel (type, model)) return true;

return false;
}, "~S,~S");
Clazz.defineMethod (c$, "setSelectedPeak", 
function (peak) {
this.selectedPeak = peak;
}, "JSV.common.PeakInfo");
Clazz.defineMethod (c$, "setHighlightedPeak", 
function (peak) {
this.highlightedPeak = peak;
}, "JSV.common.PeakInfo");
Clazz.defineMethod (c$, "getSelectedPeak", 
function () {
return this.selectedPeak;
});
Clazz.defineMethod (c$, "getModelPeakInfoForAutoSelectOnLoad", 
function () {
if (this.peakList != null) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).autoSelectOnLoad ()) return this.peakList.get (i);

return null;
});
Clazz.defineMethod (c$, "getAssociatedPeakInfo", 
function (xPixel, coord) {
this.selectedPeak = this.findPeakByCoord (xPixel, coord);
return (this.selectedPeak == null ? this.getBasePeakInfo () : this.selectedPeak);
}, "~N,JSV.common.Coordinate");
Clazz.defineMethod (c$, "findPeakByCoord", 
function (xPixel, coord) {
if (coord != null && this.peakList != null && this.peakList.size () > 0) {
var xVal = coord.getXVal ();
var iBest = -1;
var dBest = 1e100;
for (var i = 0; i < this.peakList.size (); i++) {
var d = this.peakList.get (i).checkRange (xPixel, xVal);
if (d < dBest) {
dBest = d;
iBest = i;
}}
if (iBest >= 0) return this.peakList.get (iBest);
}return null;
}, "~N,JSV.common.Coordinate");
Clazz.defineMethod (c$, "getPeakTitle", 
function () {
return (this.selectedPeak != null ? this.selectedPeak.getTitle () : this.highlightedPeak != null ? this.highlightedPeak.getTitle () : this.getTitleLabel ());
});
Clazz.defineMethod (c$, "getTitleLabel", 
function () {
var type = (this.peakList == null || this.peakList.size () == 0 ? this.getQualifiedDataType () : this.peakList.get (0).getType ());
if (type != null && type.startsWith ("NMR")) {
if (this.nucleusY != null && !this.nucleusY.equals ("?")) {
type = "2D" + type;
} else {
type = this.nucleusX + type;
}}return (type != null && type.length > 0 ? type + " " : "") + this.getTitle ();
});
Clazz.defineMethod (c$, "setNextPeak", 
function (coord, istep) {
if (this.peakList == null || this.peakList.size () == 0) return -1;
var x0 = coord.getXVal () + istep * 0.000001;
var ipt1 = -1;
var ipt2 = -1;
var dmin1 = 1.7976931348623157E308 * istep;
var dmin2 = 0;
for (var i = this.peakList.size (); --i >= 0; ) {
var x = this.peakList.get (i).getX ();
if (istep > 0) {
if (x > x0 && x < dmin1) {
ipt1 = i;
dmin1 = x;
} else if (x < x0 && x - x0 < dmin2) {
ipt2 = i;
dmin2 = x - x0;
}} else {
if (x < x0 && x > dmin1) {
ipt1 = i;
dmin1 = x;
} else if (x > x0 && x - x0 > dmin2) {
ipt2 = i;
dmin2 = x - x0;
}}}
if (ipt1 < 0) {
if (ipt2 < 0) return -1;
ipt1 = ipt2;
}return ipt1;
}, "JSV.common.Coordinate,~N");
Clazz.defineMethod (c$, "getPercentYValueAt", 
function (x) {
if (!this.isContinuous ()) return NaN;
return this.getYValueAt (x);
}, "~N");
Clazz.defineMethod (c$, "getYValueAt", 
function (x) {
return JSV.common.Coordinate.getYValueAt (this.xyCoords, x);
}, "~N");
Clazz.defineMethod (c$, "setUserYFactor", 
function (userYFactor) {
this.userYFactor = userYFactor;
}, "~N");
Clazz.defineMethod (c$, "getUserYFactor", 
function () {
return this.userYFactor;
});
Clazz.defineMethod (c$, "getConvertedSpectrum", 
function () {
return this.convertedSpectrum;
});
Clazz.defineMethod (c$, "setConvertedSpectrum", 
function (spectrum) {
this.convertedSpectrum = spectrum;
}, "JSV.common.Spectrum");
c$.taConvert = Clazz.defineMethod (c$, "taConvert", 
function (spectrum, mode) {
if (!spectrum.isContinuous ()) return spectrum;
switch (mode) {
case JSV.common.Spectrum.IRMode.NO_CONVERT:
return spectrum;
case JSV.common.Spectrum.IRMode.TO_ABS:
if (!spectrum.isTransmittance ()) return spectrum;
break;
case JSV.common.Spectrum.IRMode.TO_TRANS:
if (!spectrum.isAbsorbance ()) return spectrum;
break;
case JSV.common.Spectrum.IRMode.TOGGLE:
break;
}
var spec = spectrum.getConvertedSpectrum ();
return (spec != null ? spec : spectrum.isAbsorbance () ? JSV.common.Spectrum.toT (spectrum) : JSV.common.Spectrum.toA (spectrum));
}, "JSV.common.Spectrum,JSV.common.Spectrum.IRMode");
c$.toT = Clazz.defineMethod (c$, "toT", 
 function (spectrum) {
if (!spectrum.isAbsorbance ()) return null;
var xyCoords = spectrum.getXYCoords ();
var newXYCoords =  new Array (xyCoords.length);
if (!JSV.common.Coordinate.isYInRange (xyCoords, 0, 4.0)) xyCoords = JSV.common.Coordinate.normalise (xyCoords, 0, 4.0);
for (var i = 0; i < xyCoords.length; i++) newXYCoords[i] =  new JSV.common.Coordinate ().set (xyCoords[i].getXVal (), JSV.common.Spectrum.toTransmittance (xyCoords[i].getYVal ()));

return JSV.common.Spectrum.newSpectrum (spectrum, newXYCoords, "TRANSMITTANCE");
}, "JSV.common.Spectrum");
c$.toA = Clazz.defineMethod (c$, "toA", 
 function (spectrum) {
if (!spectrum.isTransmittance ()) return null;
var xyCoords = spectrum.getXYCoords ();
var newXYCoords =  new Array (xyCoords.length);
var isPercent = JSV.common.Coordinate.isYInRange (xyCoords, -2, 2);
for (var i = 0; i < xyCoords.length; i++) newXYCoords[i] =  new JSV.common.Coordinate ().set (xyCoords[i].getXVal (), JSV.common.Spectrum.toAbsorbance (xyCoords[i].getYVal (), isPercent));

return JSV.common.Spectrum.newSpectrum (spectrum, newXYCoords, "ABSORBANCE");
}, "JSV.common.Spectrum");
c$.newSpectrum = Clazz.defineMethod (c$, "newSpectrum", 
function (spectrum, newXYCoords, units) {
var specNew = spectrum.copy ();
specNew.setOrigin ("JSpecView Converted");
specNew.setOwner ("JSpecView Generated");
specNew.setXYCoords (newXYCoords);
specNew.setYUnits (units);
spectrum.setConvertedSpectrum (specNew);
specNew.setConvertedSpectrum (spectrum);
return specNew;
}, "JSV.common.Spectrum,~A,~S");
c$.toAbsorbance = Clazz.defineMethod (c$, "toAbsorbance", 
 function (x, isPercent) {
return (Math.min (4.0, isPercent ? 2 - JSV.common.Spectrum.log10 (x) : -JSV.common.Spectrum.log10 (x)));
}, "~N,~B");
c$.toTransmittance = Clazz.defineMethod (c$, "toTransmittance", 
 function (x) {
return (x <= 0 ? 1 : Math.pow (10, -x));
}, "~N");
c$.log10 = Clazz.defineMethod (c$, "log10", 
 function (value) {
return Math.log (value) / Math.log (10);
}, "~N");
c$.process = Clazz.defineMethod (c$, "process", 
function (specs, irMode) {
if (irMode === JSV.common.Spectrum.IRMode.TO_ABS || irMode === JSV.common.Spectrum.IRMode.TO_TRANS) for (var i = 0; i < specs.size (); i++) specs.set (i, JSV.common.Spectrum.taConvert (specs.get (i), irMode));

return true;
}, "JU.Lst,JSV.common.Spectrum.IRMode");
Clazz.defineMethod (c$, "getSubSpectra", 
function () {
return this.subSpectra;
});
Clazz.defineMethod (c$, "getCurrentSubSpectrum", 
function () {
return (this.subSpectra == null ? this : this.subSpectra.get (this.currentSubSpectrumIndex));
});
Clazz.defineMethod (c$, "advanceSubSpectrum", 
function (dir) {
return this.setCurrentSubSpectrum (this.currentSubSpectrumIndex + dir);
}, "~N");
Clazz.defineMethod (c$, "setCurrentSubSpectrum", 
function (n) {
return (this.currentSubSpectrumIndex = JSV.common.Coordinate.intoRange (n, 0, this.subSpectra.size () - 1));
}, "~N");
Clazz.defineMethod (c$, "addSubSpectrum", 
function (spectrum, forceSub) {
if (!forceSub && (this.numDim < 2 || this.blockID != spectrum.blockID) || !JSV.common.Spectrum.allowSubSpec (this, spectrum)) return false;
this.$isForcedSubset = forceSub;
if (this.subSpectra == null) {
this.subSpectra =  new JU.Lst ();
this.addSubSpectrum (this, true);
}this.subSpectra.addLast (spectrum);
spectrum.parent = this;
return true;
}, "JSV.common.Spectrum,~B");
Clazz.defineMethod (c$, "getSubIndex", 
function () {
return (this.subSpectra == null ? -1 : this.currentSubSpectrumIndex);
});
Clazz.defineMethod (c$, "setExportXAxisDirection", 
function (leftToRight) {
this.exportXAxisLeftToRight = leftToRight;
}, "~B");
Clazz.defineMethod (c$, "isExportXAxisLeftToRight", 
function () {
return this.exportXAxisLeftToRight;
});
Clazz.defineMethod (c$, "getInfo", 
function (key) {
var info =  new java.util.Hashtable ();
if ("id".equalsIgnoreCase (key)) {
info.put (key, this.id);
return info;
}var keys = null;
if ("".equals (key)) {
keys = "id specShift header";
}info.put ("id", this.id);
JSV.common.Parameters.putInfo (key, info, "specShift", Double.$valueOf (this.specShift));
var justHeader = ("header".equals (key));
if (!justHeader && key != null && keys == null) {
for (var i = this.headerTable.size (); --i >= 0; ) {
var entry = this.headerTable.get (i);
if (entry[0].equalsIgnoreCase (key) || entry[2].equalsIgnoreCase (key)) {
info.put (key, entry[1]);
return info;
}}
}var head =  new java.util.Hashtable ();
var list = this.getHeaderRowDataAsArray ();
for (var i = 0; i < list.length; i++) {
var label = JSV.source.JDXSourceStreamTokenizer.cleanLabel (list[i][0]);
if (keys != null) {
keys += " " + label;
continue;
}if (key != null && !justHeader && !label.equals (key)) continue;
var val = JSV.common.Spectrum.fixInfoValue (list[i][1]);
if (key == null) {
var data =  new java.util.Hashtable ();
data.put ("value", val);
data.put ("index", Integer.$valueOf (i + 1));
info.put (label, data);
} else {
info.put (label, val);
}}
if (head.size () > 0) info.put ("header", head);
if (!justHeader) {
if (keys != null) {
keys += "  titleLabel type isHZToPPM subSpectrumCount";
} else {
JSV.common.Parameters.putInfo (key, info, "titleLabel", this.getTitleLabel ());
JSV.common.Parameters.putInfo (key, info, "type", this.getDataType ());
JSV.common.Parameters.putInfo (key, info, "isHZToPPM", Boolean.$valueOf (this.$isHZtoPPM));
JSV.common.Parameters.putInfo (key, info, "subSpectrumCount", Integer.$valueOf (this.subSpectra == null ? 0 : this.subSpectra.size ()));
}}if (keys != null) info.put ("KEYS", keys);
return info;
}, "~S");
c$.fixInfoValue = Clazz.defineMethod (c$, "fixInfoValue", 
 function (info) {
try {
return (Integer.$valueOf (info));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
try {
return (Double.$valueOf (info));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return info;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getTitleLabel ();
});
Clazz.defineMethod (c$, "findMatchingPeakInfo", 
function (pi) {
for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkTypeMatch (pi)) return this.peakList.get (i);

return null;
}, "JSV.common.PeakInfo");
Clazz.defineMethod (c$, "getBasePeakInfo", 
function () {
return (this.peakList.size () == 0 ?  new JSV.common.PeakInfo () :  new JSV.common.PeakInfo (" baseModel=\"\" " + this.peakList.get (0)));
});
Clazz.defineMethod (c$, "getAxisLabel", 
function (isX) {
var units = (isX ? this.piUnitsX : this.piUnitsY);
if (units == null) units = (isX ? this.xLabel : this.yLabel);
if (units == null) units = (isX ? this.xUnits : this.yUnits);
return (units == null ? "" : units.equalsIgnoreCase ("WAVENUMBERS") ? "1/cm" : units.equalsIgnoreCase ("nanometers") ? "nm" : units);
}, "~B");
Clazz.defineMethod (c$, "findXForPeakNearest", 
function (x) {
return JSV.common.Coordinate.findXForPeakNearest (this.xyCoords, x, this.isInverted ());
}, "~N");
Clazz.defineMethod (c$, "addSpecShift", 
function (dx) {
if (dx != 0) {
this.specShift += dx;
JSV.common.Coordinate.shiftX (this.xyCoords, dx);
if (this.subSpectra != null) for (var i = this.subSpectra.size (); --i >= 0; ) {
var spec = this.subSpectra.get (i);
if (spec !== this && spec !== this.parent) spec.addSpecShift (dx);
}
}return this.specShift;
}, "~N");
c$.allowSubSpec = Clazz.defineMethod (c$, "allowSubSpec", 
function (s1, s2) {
return (s1.is1D () == s2.is1D () && s1.xUnits.equalsIgnoreCase (s2.xUnits) && s1.isHNMR () == s2.isHNMR ());
}, "JSV.common.Spectrum,JSV.common.Spectrum");
c$.areXScalesCompatible = Clazz.defineMethod (c$, "areXScalesCompatible", 
function (s1, s2, isSubspecCheck, isLinkCheck) {
var isNMR1 = s1.isNMR ();
if (isNMR1 != s2.isNMR () || s1.isContinuous () != s2.isContinuous () || !isLinkCheck && !JSV.common.Spectrum.areUnitsCompatible (s1.xUnits, s2.xUnits)) return false;
if (isSubspecCheck) {
if (s1.is1D () != s2.is1D ()) return false;
} else if (isLinkCheck) {
if (!isNMR1) return true;
} else if (!s1.is1D () || !s2.is1D ()) {
return false;
}return (!isNMR1 || s2.is1D () && s1.parent.nucleusX.equals (s2.parent.nucleusX));
}, "JSV.common.Spectrum,JSV.common.Spectrum,~B,~B");
c$.areUnitsCompatible = Clazz.defineMethod (c$, "areUnitsCompatible", 
 function (u1, u2) {
if (u1.equalsIgnoreCase (u2)) return true;
u1 = u1.toUpperCase ();
u2 = u2.toUpperCase ();
return (u1.equals ("HZ") && u2.equals ("PPM") || u1.equals ("PPM") && u2.equals ("HZ"));
}, "~S,~S");
c$.areLinkableX = Clazz.defineMethod (c$, "areLinkableX", 
function (s1, s2) {
return (s1.isNMR () && s2.isNMR () && s1.nucleusX.equals (s2.nucleusX));
}, "JSV.common.Spectrum,JSV.common.Spectrum");
c$.areLinkableY = Clazz.defineMethod (c$, "areLinkableY", 
function (s1, s2) {
return (s1.isNMR () && s2.isNMR () && s1.nucleusX.equals (s2.nucleusY));
}, "JSV.common.Spectrum,JSV.common.Spectrum");
Clazz.defineMethod (c$, "setNHydrogens", 
function (nH) {
this.nH = nH;
}, "~N");
Clazz.defineMethod (c$, "getPeakWidth", 
function () {
var w = this.getLastX () - this.getFirstX ();
return (w / 100);
});
Clazz.defineMethod (c$, "setSimulated", 
function (filePath) {
this.isSimulation = true;
var s = this.sourceID;
if (s.length == 0) s = JU.PT.rep (filePath, "http://SIMULATION/", "");
if (s.indexOf ("MOL=") >= 0) s = "";
this.title = "SIMULATED " + JU.PT.rep (s, "$", "");
}, "~S");
Clazz.defineMethod (c$, "setFillColor", 
function (color) {
this.fillColor = color;
if (this.convertedSpectrum != null) this.convertedSpectrum.fillColor = color;
}, "javajs.api.GenericColor");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (JSV.common.Spectrum, "IRMode", Enum);
c$.getMode = Clazz.defineMethod (c$, "getMode", 
function (a) {
switch (a == null ? 'I' : a.toUpperCase ().charAt (0)) {
case 'A':
return JSV.common.Spectrum.IRMode.TO_ABS;
case 'T':
return (a.equalsIgnoreCase ("TOGGLE") ? JSV.common.Spectrum.IRMode.TOGGLE : JSV.common.Spectrum.IRMode.TO_TRANS);
case 'N':
return JSV.common.Spectrum.IRMode.NO_CONVERT;
default:
return JSV.common.Spectrum.IRMode.TOGGLE;
}
}, "~S");
Clazz.defineEnumConstant (c$, "NO_CONVERT", 0, []);
Clazz.defineEnumConstant (c$, "TO_TRANS", 1, []);
Clazz.defineEnumConstant (c$, "TO_ABS", 2, []);
Clazz.defineEnumConstant (c$, "TOGGLE", 3, []);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"MAXABS", 4);
});
