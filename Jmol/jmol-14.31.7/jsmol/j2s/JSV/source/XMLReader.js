Clazz.declarePackage ("JSV.source");
Clazz.load (["JSV.api.SourceReader", "JU.SB"], "JSV.source.XMLReader", ["java.io.IOException", "JU.Lst", "JSV.common.Coordinate", "$.Spectrum", "JSV.source.JDXReader", "$.XMLParser", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.source = null;
this.filePath = "";
this.parser = null;
this.tagName = "START";
this.attrList = "";
this.title = "";
this.owner = "UNKNOWN";
this.origin = "UNKNOWN";
this.tmpEnd = "END";
this.molForm = "";
this.techname = "";
this.npoints = -1;
this.samplenum = -1;
this.yaxisData = null;
this.xaxisData = null;
this.xUnits = "";
this.yUnits = "ARBITRARY UNITS";
this.vendor = "na";
this.modelType = "MODEL UNKNOWN";
this.LongDate = "";
this.pathlength = "na";
this.identifier = "";
this.plLabel = "";
this.resolution = "na";
this.resLabel = "";
this.LocName = "";
this.LocContact = "";
this.casName = "";
this.sampleowner = "";
this.obNucleus = "";
this.StrObFreq = "";
this.increasing = false;
this.continuous = false;
this.ivspoints = 0;
this.evspoints = 0;
this.sampleRefNum = 0;
this.deltaX = 1.7976931348623157E308;
this.xFactor = 1.7976931348623157E308;
this.yFactor = 1.7976931348623157E308;
this.firstX = 1.7976931348623157E308;
this.lastX = 1.7976931348623157E308;
this.firstY = 1.7976931348623157E308;
this.obFreq = 1.7976931348623157E308;
this.refPoint = 1.7976931348623157E308;
this.casRN = "";
this.sampleID = null;
this.errorLog = null;
Clazz.instantialize (this, arguments);
}, JSV.source, "XMLReader", null, JSV.api.SourceReader);
Clazz.prepareFields (c$, function () {
this.errorLog =  new JU.SB ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "getSource", 
function (filePath, br) {
this.filePath = filePath;
return this.getXML (br);
}, "~S,java.io.BufferedReader");
Clazz.defineMethod (c$, "getSimpleXmlReader", 
function (br) {
this.parser =  new JSV.source.XMLParser (br);
}, "java.io.BufferedReader");
Clazz.defineMethod (c$, "checkStart", 
function () {
if (this.parser.peek () == 1) return;
var errMsg = "Error: XML <xxx> not found at beginning of file; not an XML document?";
this.errorLog.append (errMsg);
throw  new java.io.IOException (errMsg);
});
Clazz.defineMethod (c$, "populateVariables", 
function () {
var LDRTable =  new JU.Lst ();
var spectrum =  new JSV.common.Spectrum ();
spectrum.setTitle (this.title);
spectrum.setJcampdx ("5.01");
spectrum.setDataClass ("XYDATA");
spectrum.setDataType (this.techname);
spectrum.setContinuous (this.continuous);
spectrum.setIncreasing (this.increasing);
spectrum.setXFactor (this.xFactor);
spectrum.setYFactor (this.yFactor);
spectrum.setLongDate (this.LongDate);
spectrum.setOrigin (this.origin);
spectrum.setOwner (this.owner);
JSV.source.JDXReader.addHeader (LDRTable, "##PATHLENGTH", this.pathlength);
JSV.source.JDXReader.addHeader (LDRTable, "##RESOLUTION", this.resolution);
if (!this.StrObFreq.equals ("")) JSV.source.JDXReader.addHeader (LDRTable, "##.OBSERVEFREQUENCY", this.StrObFreq);
if (!this.obNucleus.equals ("")) JSV.source.JDXReader.addHeader (LDRTable, "##.OBSERVENUCLEUS", this.obNucleus);
JSV.source.JDXReader.addHeader (LDRTable, "##$MANUFACTURER", this.vendor);
if (!this.casRN.equals ("")) JSV.source.JDXReader.addHeader (LDRTable, "##CASREGISTRYNO", this.casRN);
if (!this.molForm.equals ("")) JSV.source.JDXReader.addHeader (LDRTable, "##MOLFORM", this.molForm);
if (!this.modelType.equals ("")) JSV.source.JDXReader.addHeader (LDRTable, "##SPECTROMETER/DATA SYSTEM", this.modelType);
spectrum.setHeaderTable (LDRTable);
var xScale = 1;
if (this.obFreq != 1.7976931348623157E308) {
spectrum.setObservedFreq (this.obFreq);
if (this.xUnits.toUpperCase ().equals ("HZ")) {
this.xUnits = "PPM";
spectrum.setHZtoPPM (true);
xScale = this.obFreq;
}}var xyCoords =  new Array (this.npoints);
for (var x = 0; x < this.npoints; x++) xyCoords[x] =  new JSV.common.Coordinate ().set (this.xaxisData[x] / xScale, this.yaxisData[x]);

if (!this.increasing) xyCoords = JSV.common.Coordinate.reverse (xyCoords);
spectrum.setXUnits (this.xUnits);
spectrum.setYUnits (this.yUnits);
spectrum.setXYCoords (xyCoords);
this.source.addJDXSpectrum (this.filePath, spectrum, false);
});
Clazz.defineMethod (c$, "checkPointCount", 
function () {
if (this.continuous && this.npoints < 5) {
System.err.println ("Insufficient points to plot");
this.errorLog.append ("Insufficient points to plot \n");
this.source.setErrorLog (this.errorLog.toString ());
return false;
}return true;
});
Clazz.defineMethod (c$, "processErrors", 
function (type) {
this.parser = null;
if (this.errorLog.length () > 0) {
this.errorLog.append ("these errors were found in " + type + " \n");
this.errorLog.append ("=====================\n");
}this.source.setErrorLog (this.errorLog.toString ());
}, "~S");
Clazz.defineMethod (c$, "processXML", 
function (i0, i1) {
while (this.parser.hasNext ()) {
if (this.parser.nextEvent () != 1) continue;
var theTag = this.parser.getTagName ();
var requiresEndTag = this.parser.requiresEndTag ();
if (JU.Logger.debugging) JU.Logger.info (this.tagName);
for (var i = i0; i <= i1; i++) if (theTag.equals (JSV.source.XMLReader.tagNames[i])) {
this.process (i, requiresEndTag);
break;
}
}
}, "~N,~N");
Clazz.defineMethod (c$, "process", 
function (tagId, requiresEndTag) {
var thisTagName = JSV.source.XMLReader.tagNames[tagId];
try {
this.tagName = this.parser.getTagName ();
this.attrList = this.parser.getAttributeList ();
if (!this.processTag (tagId) || !requiresEndTag) return;
while (this.parser.hasNext ()) {
switch (this.parser.nextEvent ()) {
default:
continue;
case 2:
if (this.parser.getEndTag ().equals (thisTagName)) {
this.processEndTag (tagId);
return;
}continue;
case 1:
break;
}
this.tagName = this.parser.getTagName ();
if (this.tagName.startsWith ("!--")) continue;
this.attrList = this.parser.getAttributeList ();
if (!this.processTag (tagId)) return;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
var msg = "error reading " + this.tagName + " section: " + e + "\n" + e.getStackTrace ();
JU.Logger.error (msg);
this.errorLog.append (msg + "\n");
} else {
throw e;
}
}
}, "~N,~B");
Clazz.defineStatics (c$,
"tagNames",  Clazz.newArray (-1, ["audittrail", "experimentstepset", "sampleset", "xx result", "spectrum", "metadatalist", "conditionlist", "parameterlist", "sample", "spectrumdata", "peaklist", "author", "peaklist"]),
"AML_0", 0,
"AML_AUDITTRAIL", 0,
"AML_EXPERIMENTSTEPSET", 1,
"AML_SAMPLESET", 2,
"AML_RESULT", 3,
"AML_1", 3,
"CML_0", 4,
"CML_SPECTRUM", 4,
"CML_METADATALIST", 5,
"CML_CONDITIONLIST", 6,
"CML_PARAMETERLIST", 7,
"CML_SAMPLE", 8,
"CML_SPECTRUMDATA", 9,
"CML_PEAKLIST", 10,
"CML_1", 10,
"AML_AUTHOR", 11,
"CML_PEAKLIST2", 12);
});
