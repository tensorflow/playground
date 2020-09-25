Clazz.declarePackage ("JSV.export");
Clazz.load (["JSV.export.FormExporter", "JU.Lst"], "JSV.export.XMLExporter", ["java.lang.Boolean", "$.Double"], function () {
c$ = Clazz.decorateAsClass (function () {
this.continuous = false;
this.title = null;
this.ident = null;
this.state = null;
this.xUnits = null;
this.yUnits = null;
this.xUnitFactor = "";
this.xUnitExponent = "1";
this.xUnitLabel = null;
this.yUnitLabel = null;
this.datatype = null;
this.owner = null;
this.origin = null;
this.spectypeInitials = "";
this.longdate = null;
this.date = null;
this.time = null;
this.vendor = "";
this.model = "";
this.resolution = "";
this.pathlength = "";
this.molform = "";
this.bp = "";
this.mp = "";
this.casRN = "";
this.casName = "";
this.obNucleus = "";
this.obFreq = 0;
this.firstX = 0;
this.lastX = 0;
this.deltaX = 0;
this.solvRef = "";
this.solvName = "";
this.startIndex = 0;
this.endIndex = 0;
this.xyCoords = null;
this.npoints = 0;
this.newXYCoords = null;
Clazz.instantialize (this, arguments);
}, JSV["export"], "XMLExporter", JSV["export"].FormExporter);
Clazz.prepareFields (c$, function () {
this.newXYCoords =  new JU.Lst ();
});
Clazz.defineMethod (c$, "setup", 
function (viewer, spec, out, startIndex, endIndex) {
this.startIndex = startIndex;
this.endIndex = endIndex;
this.initForm (viewer, out);
return this.setParameters (spec);
}, "JSV.common.JSViewer,JSV.common.Spectrum,JU.OC,~N,~N");
Clazz.defineMethod (c$, "setParameters", 
function (spec) {
this.continuous = spec.isContinuous ();
if (!this.continuous) return false;
this.xyCoords = spec.getXYCoords ();
this.npoints = this.endIndex - this.startIndex + 1;
for (var i = this.startIndex; i <= this.endIndex; i++) this.newXYCoords.addLast (this.xyCoords[i]);

this.title = spec.getTitle ();
this.xUnits = spec.getXUnits ().toUpperCase ();
this.yUnits = spec.getYUnits ().toUpperCase ();
if (this.xUnits.equals ("1/CM")) {
this.xUnitLabel = "1/cm";
this.xUnitFactor = "0.01";
this.xUnitExponent = "-1";
} else if (this.xUnits.equals ("UM") || this.xUnits.equals ("MICROMETERS")) {
this.xUnitLabel = "um";
this.xUnitFactor = "0.000001";
} else if (this.xUnits.equals ("NM") || this.xUnits.equals ("NANOMETERS") || this.xUnits.equals ("WAVELENGTH")) {
this.xUnitLabel = "nm";
this.xUnitFactor = "0.000000001";
} else if (this.xUnits.equals ("PM") || this.xUnits.equals ("PICOMETERS")) {
this.xUnitLabel = "pm";
this.xUnitFactor = "0.000000000001";
} else {
this.xUnitLabel = "Arb. Units";
this.xUnitFactor = "";
}this.yUnitLabel = (this.yUnits.equals ("A") || this.yUnits.equals ("ABS") || this.yUnits.equals ("ABSORBANCE") || this.yUnits.equals ("AU") || this.yUnits.equals ("AUFS") || this.yUnits.equals ("OPTICAL DENSITY") ? "Absorbance" : this.yUnits.equals ("T") || this.yUnits.equals ("TRANSMITTANCE") ? "Transmittance" : this.yUnits.equals ("COUNTS") || this.yUnits.equals ("CTS") ? "Counts" : "Arb. Units");
this.owner = spec.getOwner ();
this.origin = spec.getOrigin ();
this.time = spec.getTime ();
this.longdate = spec.getLongDate ();
this.date = spec.getDate ();
if ((this.longdate.equals ("")) || (this.date.equals (""))) this.longdate = this.currentTime;
if ((this.date.length == 8) && (this.date.charAt (0) < '5')) this.longdate = "20" + this.date + " " + this.time;
if ((this.date.length == 8) && (this.date.charAt (0) > '5')) this.longdate = "19" + this.date + " " + this.time;
this.obFreq = spec.getObservedFreq ();
this.firstX = this.xyCoords[this.startIndex].getXVal ();
this.lastX = this.xyCoords[this.endIndex].getXVal ();
this.deltaX = spec.getDeltaX ();
this.datatype = spec.getDataType ();
if (this.datatype.contains ("NMR")) {
this.firstX *= this.obFreq;
this.lastX *= this.obFreq;
this.deltaX *= this.obFreq;
}this.setParams (spec.getHeaderTable ());
return true;
}, "JSV.common.Spectrum");
c$.getParamIndex = Clazz.defineMethod (c$, "getParamIndex", 
 function (label) {
for (var i = 0; i < JSV["export"].XMLExporter.params.length; i++) if (JSV["export"].XMLExporter.params[i].equalsIgnoreCase (label)) return i;

return -1;
}, "~S");
Clazz.defineMethod (c$, "setParams", 
 function (table) {
for (var i = 0; i < table.size (); i++) {
var entry = table.get (i);
var val = entry[1];
switch (JSV["export"].XMLExporter.getParamIndex (entry[0])) {
case 0:
this.state = val;
break;
case 1:
this.resolution = val;
break;
case 2:
this.model = val;
break;
case 3:
this.vendor = val;
break;
case 4:
this.molform = val;
break;
case 5:
this.casRN = val;
break;
case 6:
this.casName = val;
break;
case 7:
this.mp = val;
break;
case 8:
this.bp = val;
break;
case 9:
this.obNucleus = val;
break;
case 10:
this.solvName = val;
break;
case 11:
this.solvRef = val;
break;
}
}
}, "JU.Lst");
Clazz.defineMethod (c$, "setContext", 
function () {
this.context.put ("continuous", Boolean.$valueOf (this.continuous));
this.context.put ("file", this.out.getFileName () + "");
this.context.put ("title", this.title);
this.context.put ("ident", this.ident);
this.context.put ("state", this.state);
this.context.put ("firstX",  new Double (this.firstX));
this.context.put ("lastX",  new Double (this.lastX));
this.context.put ("xyCoords", this.newXYCoords);
this.context.put ("xdata_type", "Float32");
this.context.put ("ydata_type", "Float32");
this.context.put ("npoints", Integer.$valueOf (this.npoints));
this.context.put ("xencode", "avs");
this.context.put ("yencode", "ivs");
this.context.put ("xUnits", this.xUnits);
this.context.put ("yUnits", this.yUnits);
this.context.put ("xUnitLabel", this.xUnitLabel);
this.context.put ("yUnitLabel", this.yUnitLabel);
this.context.put ("specinits", this.spectypeInitials);
this.context.put ("deltaX",  new Double (this.deltaX));
this.context.put ("owner", this.owner);
this.context.put ("origin", this.origin);
this.context.put ("timestamp", this.longdate);
this.context.put ("DataType", this.datatype);
this.context.put ("currenttime", this.currentTime);
this.context.put ("resolution", this.resolution);
this.context.put ("pathlength", this.pathlength);
this.context.put ("molform", this.molform);
this.context.put ("CASrn", this.casRN);
this.context.put ("CASn", this.casName);
this.context.put ("mp", this.mp);
this.context.put ("bp", this.bp);
this.context.put ("ObFreq",  new Double (this.obFreq));
this.context.put ("ObNucleus", this.obNucleus);
this.context.put ("SolvName", this.solvName);
this.context.put ("SolvRef", this.solvRef);
this.context.put ("vendor", this.vendor);
this.context.put ("model", this.model);
});
Clazz.defineMethod (c$, "writeFormType", 
function (type) {
return this.writeForm (type + (this.datatype.contains ("NMR") ? "_nmr" : "_tmp") + ".vm");
}, "~S");
Clazz.defineStatics (c$,
"params",  Clazz.newArray (-1, ["##STATE", "##RESOLUTION", "##SPECTROMETER", "##$MANUFACTURER", "##MOLFORM", "##CASREGISTRYNO", "##CASNAME", "##MP", "##BP", "##.OBSERVENUCLEUS", "##.SOLVENTNAME", "##.SOLVENTREFERENCE"]),
"PARAM_STATE", 0,
"PARAM_RESOLUTION", 1,
"PARAM_SPECTROMETER", 2,
"PARAM_MANUFACTURER", 3,
"PARAM_MOLFORM", 4,
"PARAM_CASREGISTRYNO", 5,
"PARAM_CASNAME", 6,
"PARAM_MP", 7,
"PARAM_BP", 8,
"PARAM_OBSERVENUCLEUS", 9,
"PARAM_SOLVENTNAME", 10,
"PARAM_SOLVENTREFERENCE", 11);
});
