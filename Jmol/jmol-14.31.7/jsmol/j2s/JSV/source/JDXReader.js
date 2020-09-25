Clazz.declarePackage ("JSV.source");
Clazz.load (["J.api.JmolJDXMOLReader"], "JSV.source.JDXReader", ["java.io.BufferedReader", "$.InputStream", "$.StringReader", "java.lang.Double", "$.Float", "java.util.Hashtable", "$.StringTokenizer", "JU.AU", "$.Lst", "$.PT", "$.SB", "JSV.api.JSVZipReader", "JSV.common.Coordinate", "$.JSVFileManager", "$.JSViewer", "$.PeakInfo", "$.Spectrum", "JSV.exception.JSVException", "JSV.source.JDXDecompressor", "$.JDXSource", "$.JDXSourceStreamTokenizer", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nmrMaxY = NaN;
this.source = null;
this.t = null;
this.errorLog = null;
this.obscure = false;
this.done = false;
this.isZipFile = false;
this.filePath = null;
this.loadImaginary = true;
this.isSimulation = false;
this.ignoreShiftReference = false;
this.isTabularData = false;
this.firstSpec = 0;
this.lastSpec = 0;
this.nSpec = 0;
this.blockID = 0;
this.mpr = null;
this.reader = null;
this.modelSpectrum = null;
this.acdAssignments = null;
this.acdMolFile = null;
this.peakData = null;
Clazz.instantialize (this, arguments);
}, JSV.source, "JDXReader", null, J.api.JmolJDXMOLReader);
c$.getVarList = Clazz.defineMethod (c$, "getVarList", 
function (dataClass) {
var index = JSV.source.JDXReader.VAR_LIST_TABLE[0].indexOf (dataClass);
return JSV.source.JDXReader.VAR_LIST_TABLE[1].substring (index + 1, index + 12).trim ();
}, "~S");
Clazz.makeConstructor (c$, 
 function (filePath, obscure, loadImaginary, iSpecFirst, iSpecLast, nmrNormalization) {
filePath = JU.PT.trimQuotes (filePath);
this.isSimulation = (filePath != null && filePath.startsWith ("http://SIMULATION/"));
if (this.isSimulation) {
this.nmrMaxY = (Float.isNaN (nmrNormalization) ? 10000 : nmrNormalization);
}this.filePath = filePath;
this.obscure = obscure;
this.firstSpec = iSpecFirst;
this.lastSpec = iSpecLast;
this.loadImaginary = loadImaginary;
}, "~S,~B,~B,~N,~N,~N");
c$.createJDXSourceFromStream = Clazz.defineMethod (c$, "createJDXSourceFromStream", 
function ($in, obscure, loadImaginary, nmrMaxY) {
return JSV.source.JDXReader.createJDXSource ($in, "stream", obscure, loadImaginary, -1, -1, nmrMaxY);
}, "java.io.InputStream,~B,~B,~N");
c$.createJDXSource = Clazz.defineMethod (c$, "createJDXSource", 
function ($in, filePath, obscure, loadImaginary, iSpecFirst, iSpecLast, nmrMaxY) {
var data = null;
var br;
if (Clazz.instanceOf ($in, String) || JU.AU.isAB ($in)) {
if (Clazz.instanceOf ($in, String)) data = $in;
br = JSV.common.JSVFileManager.getBufferedReaderForStringOrBytes ($in);
} else if (Clazz.instanceOf ($in, java.io.InputStream)) {
br = JSV.common.JSVFileManager.getBufferedReaderForInputStream ($in);
} else {
br = $in;
}var header = null;
try {
if (br == null) br = JSV.common.JSVFileManager.getBufferedReaderFromName (filePath, "##TITLE");
br.mark (400);
var chs =  Clazz.newCharArray (400, '\0');
br.read (chs, 0, 400);
br.reset ();
header =  String.instantialize (chs);
var source = null;
var pt1 = header.indexOf ('#');
var pt2 = header.indexOf ('<');
if (pt1 < 0 || pt2 >= 0 && pt2 < pt1) {
var xmlType = header.toLowerCase ();
xmlType = (xmlType.contains ("<animl") || xmlType.contains ("<!doctype technique") ? "AnIML" : xmlType.contains ("xml-cml") ? "CML" : null);
if (xmlType != null) source = (JSV.common.JSViewer.getInterface ("JSV.source." + xmlType + "Reader")).getSource (filePath, br);
br.close ();
if (source == null) {
JU.Logger.error (header + "...");
throw  new JSV.exception.JSVException ("File type not recognized");
}} else {
source = ( new JSV.source.JDXReader (filePath, obscure, loadImaginary, iSpecFirst, iSpecLast, nmrMaxY)).getJDXSource (br);
}if (data != null) source.setInlineData (data);
return source;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (br != null) br.close ();
if (header != null) JU.Logger.error (header + "...");
var s = e.getMessage ();
{
}throw  new JSV.exception.JSVException ("Error reading data: " + s);
} else {
throw e;
}
}
}, "~O,~S,~B,~B,~N,~N,~N");
Clazz.defineMethod (c$, "getJDXSource", 
 function (reader) {
this.source =  new JSV.source.JDXSource (0, this.filePath);
this.isZipFile = (Clazz.instanceOf (reader, JSV.api.JSVZipReader));
this.t =  new JSV.source.JDXSourceStreamTokenizer (reader);
this.errorLog =  new JU.SB ();
var label = null;
var value = null;
var isOK = false;
while (!this.done && "##TITLE".equals (this.t.peakLabel ())) {
isOK = true;
if (label != null && !this.isZipFile) this.errorLog.append ("Warning - file is a concatenation without LINK record -- does not conform to IUPAC standards!\n");
var spectrum =  new JSV.common.Spectrum ();
var dataLDRTable =  new JU.Lst ();
while (!this.done && (label = this.t.getLabel ()) != null && (value = this.getValue (label)) != null) {
if (this.isTabularData) {
this.setTabularDataType (spectrum, label);
if (!this.processTabularData (spectrum, dataLDRTable)) throw  new JSV.exception.JSVException ("Unable to read JDX file");
this.addSpectrum (spectrum, false);
if (this.isSimulation && spectrum.getXUnits ().equals ("PPM")) spectrum.setHZtoPPM (true);
spectrum = null;
continue;
}if (label.equals ("##DATATYPE") && value.toUpperCase ().equals ("LINK")) {
this.getBlockSpectra (dataLDRTable);
spectrum = null;
continue;
}if (label.equals ("##NTUPLES") || label.equals ("##VARNAME")) {
this.getNTupleSpectra (dataLDRTable, spectrum, label);
spectrum = null;
continue;
}if (label.equals ("##JCAMPDX")) {
this.setVenderSpecificValues (this.t.rawLine);
}if (spectrum == null) spectrum =  new JSV.common.Spectrum ();
if (this.readDataLabel (spectrum, label, value, this.errorLog, this.obscure)) continue;
JSV.source.JDXReader.addHeader (dataLDRTable, this.t.rawLabel, value);
if (this.checkCustomTags (spectrum, label, value)) continue;
}
}
if (!isOK) throw  new JSV.exception.JSVException ("##TITLE record not found");
this.source.setErrorLog (this.errorLog.toString ());
return this.source;
}, "~O");
Clazz.defineMethod (c$, "setVenderSpecificValues", 
 function (rawLine) {
if (rawLine.indexOf ("JEOL") >= 0) {
System.out.println ("Skipping ##SHIFTREFERENCE for JEOL " + rawLine);
this.ignoreShiftReference = true;
}}, "~S");
Clazz.defineMethod (c$, "getValue", 
 function (label) {
var value = (this.isTabularDataLabel (label) ? "" : this.t.getValue ());
return ("##END".equals (label) ? null : value);
}, "~S");
Clazz.defineMethod (c$, "isTabularDataLabel", 
 function (label) {
return (this.isTabularData = ("##DATATABLE##PEAKTABLE##XYDATA##XYPOINTS#".indexOf (label + "#") >= 0));
}, "~S");
Clazz.defineMethod (c$, "addSpectrum", 
 function (spectrum, forceSub) {
if (!this.loadImaginary && spectrum.isImaginary ()) {
JU.Logger.info ("FileReader skipping imaginary spectrum -- use LOADIMAGINARY TRUE to load this spectrum.");
return true;
}if (this.acdAssignments != null) {
if (!spectrum.dataType.equals ("MASS SPECTRUM") && !spectrum.isContinuous ()) {
JU.Logger.info ("Skipping ACD Labs line spectrum for " + spectrum);
return true;
}if (this.acdAssignments.size () > 0) {
try {
this.mpr.setACDAssignments (spectrum.title, spectrum.getTypeLabel (), this.source.peakCount, this.acdAssignments, this.acdMolFile);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.info ("Failed to create peak data: " + e);
} else {
throw e;
}
}
}if (this.acdMolFile != null) JSV.common.JSVFileManager.cachePut ("mol", this.acdMolFile);
}if (!Float.isNaN (this.nmrMaxY)) spectrum.doNormalize (this.nmrMaxY);
 else if (spectrum.getMaxY () >= 10000) spectrum.doNormalize (1000);
if (this.isSimulation) spectrum.setSimulated (this.filePath);
this.nSpec++;
if (this.firstSpec > 0 && this.nSpec < this.firstSpec) return true;
if (this.lastSpec > 0 && this.nSpec > this.lastSpec) return !(this.done = true);
spectrum.setBlockID (this.blockID);
this.source.addJDXSpectrum (null, spectrum, forceSub);
return true;
}, "JSV.common.Spectrum,~B");
Clazz.defineMethod (c$, "getBlockSpectra", 
 function (sourceLDRTable) {
JU.Logger.debug ("--JDX block start--");
var label = "";
var value = null;
var isNew = (this.source.type == 0);
var forceSub = false;
while ((label = this.t.getLabel ()) != null && !label.equals ("##TITLE")) {
value = this.getValue (label);
if (isNew && !JSV.source.JDXReader.readHeaderLabel (this.source, label, value, this.errorLog, this.obscure)) JSV.source.JDXReader.addHeader (sourceLDRTable, this.t.rawLabel, value);
if (label.equals ("##BLOCKS")) {
var nBlocks = JU.PT.parseInt (value);
if (nBlocks > 100 && this.firstSpec <= 0) forceSub = true;
}}
value = this.getValue (label);
if (!"##TITLE".equals (label)) throw  new JSV.exception.JSVException ("Unable to read block source");
if (isNew) this.source.setHeaderTable (sourceLDRTable);
this.source.type = 1;
this.source.isCompoundSource = true;
var dataLDRTable;
var spectrum =  new JSV.common.Spectrum ();
dataLDRTable =  new JU.Lst ();
this.readDataLabel (spectrum, label, value, this.errorLog, this.obscure);
try {
var tmp;
while ((tmp = this.t.getLabel ()) != null) {
if ((value = this.getValue (tmp)) == null && "##END".equals (label)) {
JU.Logger.debug ("##END= " + this.t.getValue ());
break;
}label = tmp;
if (this.isTabularData) {
this.setTabularDataType (spectrum, label);
if (!this.processTabularData (spectrum, dataLDRTable)) throw  new JSV.exception.JSVException ("Unable to read Block Source");
continue;
}if (label.equals ("##DATATYPE") && value.toUpperCase ().equals ("LINK")) {
this.getBlockSpectra (dataLDRTable);
spectrum = null;
label = null;
} else if (label.equals ("##NTUPLES") || label.equals ("##VARNAME")) {
this.getNTupleSpectra (dataLDRTable, spectrum, label);
spectrum = null;
label = "";
}if (this.done) break;
if (spectrum == null) {
spectrum =  new JSV.common.Spectrum ();
dataLDRTable =  new JU.Lst ();
if (label === "") continue;
if (label == null) {
label = "##END";
continue;
}}if (value == null) {
if (spectrum.getXYCoords ().length > 0 && !this.addSpectrum (spectrum, forceSub)) return this.source;
spectrum =  new JSV.common.Spectrum ();
dataLDRTable =  new JU.Lst ();
continue;
}if (this.readDataLabel (spectrum, label, value, this.errorLog, this.obscure)) continue;
JSV.source.JDXReader.addHeader (dataLDRTable, this.t.rawLabel, value);
if (this.checkCustomTags (spectrum, label, value)) continue;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.getMessage ());
} else {
throw e;
}
}
this.addErrorLogSeparator ();
this.source.setErrorLog (this.errorLog.toString ());
JU.Logger.debug ("--JDX block end--");
return this.source;
}, "JU.Lst");
Clazz.defineMethod (c$, "addErrorLogSeparator", 
 function () {
if (this.errorLog.length () > 0 && this.errorLog.lastIndexOf ("=====================\n") != this.errorLog.length () - "=====================\n".length) this.errorLog.append ("=====================\n");
});
Clazz.defineMethod (c$, "getNTupleSpectra", 
 function (sourceLDRTable, spectrum0, label) {
var minMaxY =  Clazz.newDoubleArray (-1, [1.7976931348623157E308, 4.9E-324]);
this.blockID = Math.random ();
var isOK = true;
if (this.firstSpec > 0) spectrum0.numDim = 1;
var isVARNAME = label.equals ("##VARNAME");
if (!isVARNAME) {
label = "";
}var nTupleTable =  new java.util.Hashtable ();
var plotSymbols =  new Array (2);
var isNew = (this.source.type == 0);
if (isNew) {
this.source.type = 2;
this.source.isCompoundSource = true;
this.source.setHeaderTable (sourceLDRTable);
}while (!(label = (isVARNAME ? label : this.t.getLabel ())).equals ("##PAGE")) {
isVARNAME = false;
var st =  new java.util.StringTokenizer (this.t.getValue (), ",");
var attrList =  new JU.Lst ();
while (st.hasMoreTokens ()) attrList.addLast (st.nextToken ().trim ());

nTupleTable.put (label, attrList);
}
var symbols = nTupleTable.get ("##SYMBOL");
if (!label.equals ("##PAGE")) throw  new JSV.exception.JSVException ("Error Reading NTuple Source");
var page = this.t.getValue ();
var spectrum = null;
var isFirst = true;
while (!this.done) {
if ((label = this.t.getLabel ()).equals ("##ENDNTUPLES")) {
this.t.getValue ();
break;
}if (label.equals ("##PAGE")) {
page = this.t.getValue ();
continue;
}if (spectrum == null) {
spectrum =  new JSV.common.Spectrum ();
spectrum0.copyTo (spectrum);
spectrum.setTitle (spectrum0.getTitle ());
if (!spectrum.is1D ()) {
var pt = page.indexOf ('=');
if (pt >= 0) try {
spectrum.setY2D (Double.parseDouble (page.substring (pt + 1).trim ()));
var y2dUnits = page.substring (0, pt).trim ();
var i = symbols.indexOf (y2dUnits);
if (i >= 0) spectrum.setY2DUnits (nTupleTable.get ("##UNITS").get (i));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}}var dataLDRTable =  new JU.Lst ();
spectrum.setHeaderTable (dataLDRTable);
while (!label.equals ("##DATATABLE")) {
JSV.source.JDXReader.addHeader (dataLDRTable, this.t.rawLabel, this.t.getValue ());
label = this.t.getLabel ();
}
var continuous = true;
var line = this.t.flushLine ();
if (line.trim ().indexOf ("PEAKS") > 0) continuous = false;
var index1 = line.indexOf ('(');
var index2 = line.lastIndexOf (')');
if (index1 == -1 || index2 == -1) throw  new JSV.exception.JSVException ("Variable List not Found");
var varList = line.substring (index1, index2 + 1);
var countSyms = 0;
for (var i = 0; i < symbols.size (); i++) {
var sym = symbols.get (i).trim ();
if (varList.indexOf (sym) != -1) {
plotSymbols[countSyms++] = sym;
}if (countSyms == 2) break;
}
this.setTabularDataType (spectrum, "##" + (continuous ? "XYDATA" : "PEAKTABLE"));
if (!this.readNTUPLECoords (spectrum, nTupleTable, plotSymbols, minMaxY)) throw  new JSV.exception.JSVException ("Unable to read Ntuple Source");
if (!spectrum.nucleusX.equals ("?")) spectrum0.nucleusX = spectrum.nucleusX;
spectrum0.nucleusY = spectrum.nucleusY;
spectrum0.freq2dX = spectrum.freq2dX;
spectrum0.freq2dY = spectrum.freq2dY;
spectrum0.y2DUnits = spectrum.y2DUnits;
for (var i = 0; i < sourceLDRTable.size (); i++) {
var entry = sourceLDRTable.get (i);
var key = JSV.source.JDXSourceStreamTokenizer.cleanLabel (entry[0]);
if (!key.equals ("##TITLE") && !key.equals ("##DATACLASS") && !key.equals ("##NTUPLES")) dataLDRTable.addLast (entry);
}
if (isOK) this.addSpectrum (spectrum, !isFirst);
isFirst = false;
spectrum = null;
}
this.addErrorLogSeparator ();
this.source.setErrorLog (this.errorLog.toString ());
JU.Logger.info ("NTUPLE MIN/MAX Y = " + minMaxY[0] + " " + minMaxY[1]);
return this.source;
}, "JU.Lst,JSV.source.JDXDataObject,~S");
Clazz.defineMethod (c$, "readDataLabel", 
 function (spectrum, label, value, errorLog, obscure) {
if (JSV.source.JDXReader.readHeaderLabel (spectrum, label, value, errorLog, obscure)) return true;
label += " ";
if (("##MINX ##MINY ##MAXX ##MAXY ##FIRSTY ##DELTAX ##DATACLASS ").indexOf (label) >= 0) return true;
switch (("##FIRSTX  ##LASTX   ##NPOINTS ##XFACTOR ##YFACTOR ##XUNITS  ##YUNITS  ##XLABEL  ##YLABEL  ##NUMDIM  ##OFFSET  ").indexOf (label)) {
case 0:
spectrum.fileFirstX = Double.parseDouble (value);
return true;
case 10:
spectrum.fileLastX = Double.parseDouble (value);
return true;
case 20:
spectrum.nPointsFile = Integer.parseInt (value);
return true;
case 30:
spectrum.xFactor = Double.parseDouble (value);
return true;
case 40:
spectrum.yFactor = Double.parseDouble (value);
return true;
case 50:
spectrum.setXUnits (value);
return true;
case 60:
spectrum.setYUnits (value);
return true;
case 70:
spectrum.setXLabel (value);
return false;
case 80:
spectrum.setYLabel (value);
return false;
case 90:
spectrum.numDim = Integer.parseInt (value);
return true;
case 100:
if (spectrum.shiftRefType != 0) {
if (spectrum.offset == 1.7976931348623157E308) spectrum.offset = Double.parseDouble (value);
spectrum.dataPointNum = 1;
spectrum.shiftRefType = 1;
}return false;
default:
if (label.length < 17) return false;
if (label.equals ("##.OBSERVEFREQUENCY ")) {
spectrum.observedFreq = Double.parseDouble (value);
return true;
}if (label.equals ("##.OBSERVENUCLEUS ")) {
spectrum.setObservedNucleus (value);
return true;
}if ((label.equals ("##$REFERENCEPOINT ")) && (spectrum.shiftRefType != 0)) {
spectrum.offset = Double.parseDouble (value);
spectrum.dataPointNum = 1;
spectrum.shiftRefType = 2;
return false;
}if (label.equals ("##.SHIFTREFERENCE ")) {
if (this.ignoreShiftReference || !(spectrum.dataType.toUpperCase ().contains ("SPECTRUM"))) return true;
value = JU.PT.replaceAllCharacters (value, ")(", "");
var srt =  new java.util.StringTokenizer (value, ",");
if (srt.countTokens () != 4) return true;
try {
srt.nextToken ();
srt.nextToken ();
spectrum.dataPointNum = Integer.parseInt (srt.nextToken ().trim ());
spectrum.offset = Double.parseDouble (srt.nextToken ().trim ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return true;
} else {
throw e;
}
}
if (spectrum.dataPointNum <= 0) spectrum.dataPointNum = 1;
spectrum.shiftRefType = 0;
return true;
}}
return false;
}, "JSV.source.JDXDataObject,~S,~S,JU.SB,~B");
c$.readHeaderLabel = Clazz.defineMethod (c$, "readHeaderLabel", 
 function (jdxHeader, label, value, errorLog, obscure) {
switch (("##TITLE#####JCAMPDX###ORIGIN####OWNER#####DATATYPE##LONGDATE##DATE######TIME####").indexOf (label + "#")) {
case 0:
jdxHeader.setTitle (obscure || value == null || value.equals ("") ? "Unknown" : value);
return true;
case 10:
jdxHeader.jcampdx = value;
var version = JU.PT.parseFloat (value);
if (version >= 6.0 || Float.isNaN (version)) {
if (errorLog != null) errorLog.append ("Warning: JCAMP-DX version may not be fully supported: " + value + "\n");
}return true;
case 20:
jdxHeader.origin = (value != null && !value.equals ("") ? value : "Unknown");
return true;
case 30:
jdxHeader.owner = (value != null && !value.equals ("") ? value : "Unknown");
return true;
case 40:
jdxHeader.dataType = value;
return true;
case 50:
jdxHeader.longDate = value;
return true;
case 60:
jdxHeader.date = value;
return true;
case 70:
jdxHeader.time = value;
return true;
}
return false;
}, "JSV.source.JDXHeader,~S,~S,JU.SB,~B");
Clazz.defineMethod (c$, "setTabularDataType", 
 function (spectrum, label) {
if (label.equals ("##PEAKASSIGNMENTS")) spectrum.setDataClass ("PEAKASSIGNMENTS");
 else if (label.equals ("##PEAKTABLE")) spectrum.setDataClass ("PEAKTABLE");
 else if (label.equals ("##XYDATA")) spectrum.setDataClass ("XYDATA");
 else if (label.equals ("##XYPOINTS")) spectrum.setDataClass ("XYPOINTS");
}, "JSV.source.JDXDataObject,~S");
Clazz.defineMethod (c$, "processTabularData", 
 function (spec, table) {
spec.setHeaderTable (table);
if (spec.dataClass.equals ("XYDATA")) {
spec.checkRequiredTokens ();
this.decompressData (spec, null);
return true;
}if (spec.dataClass.equals ("PEAKTABLE") || spec.dataClass.equals ("XYPOINTS")) {
spec.setContinuous (spec.dataClass.equals ("XYPOINTS"));
try {
this.t.readLineTrimmed ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
var xyCoords;
if (spec.xFactor != 1.7976931348623157E308 && spec.yFactor != 1.7976931348623157E308) xyCoords = JSV.common.Coordinate.parseDSV (this.t.getValue (), spec.xFactor, spec.yFactor);
 else xyCoords = JSV.common.Coordinate.parseDSV (this.t.getValue (), 1, 1);
spec.setXYCoords (xyCoords);
var fileDeltaX = JSV.common.Coordinate.deltaX (xyCoords[xyCoords.length - 1].getXVal (), xyCoords[0].getXVal (), xyCoords.length);
spec.setIncreasing (fileDeltaX > 0);
return true;
}return false;
}, "JSV.source.JDXDataObject,JU.Lst");
Clazz.defineMethod (c$, "readNTUPLECoords", 
 function (spec, nTupleTable, plotSymbols, minMaxY) {
var list;
if (spec.dataClass.equals ("XYDATA")) {
list = nTupleTable.get ("##SYMBOL");
var index1 = list.indexOf (plotSymbols[0]);
var index2 = list.indexOf (plotSymbols[1]);
list = nTupleTable.get ("##VARNAME");
spec.varName = list.get (index2).toUpperCase ();
list = nTupleTable.get ("##FACTOR");
spec.xFactor = Double.parseDouble (list.get (index1));
spec.yFactor = Double.parseDouble (list.get (index2));
list = nTupleTable.get ("##LAST");
spec.fileLastX = Double.parseDouble (list.get (index1));
list = nTupleTable.get ("##FIRST");
spec.fileFirstX = Double.parseDouble (list.get (index1));
list = nTupleTable.get ("##VARDIM");
spec.nPointsFile = Integer.parseInt (list.get (index1));
list = nTupleTable.get ("##UNITS");
spec.setXUnits (list.get (index1));
spec.setYUnits (list.get (index2));
if (spec.nucleusX == null && (list = nTupleTable.get ("##.NUCLEUS")) != null) {
spec.setNucleusAndFreq (list.get (0), false);
spec.setNucleusAndFreq (list.get (index1), true);
} else {
if (spec.nucleusX == null) spec.nucleusX = "?";
}this.decompressData (spec, minMaxY);
return true;
}if (spec.dataClass.equals ("PEAKTABLE") || spec.dataClass.equals ("XYPOINTS")) {
spec.setContinuous (spec.dataClass.equals ("XYPOINTS"));
list = nTupleTable.get ("##SYMBOL");
var index1 = list.indexOf (plotSymbols[0]);
var index2 = list.indexOf (plotSymbols[1]);
list = nTupleTable.get ("##UNITS");
spec.setXUnits (list.get (index1));
spec.setYUnits (list.get (index2));
spec.setXYCoords (JSV.common.Coordinate.parseDSV (this.t.getValue (), spec.xFactor, spec.yFactor));
return true;
}return false;
}, "JSV.source.JDXDataObject,java.util.Map,~A,~A");
Clazz.defineMethod (c$, "decompressData", 
 function (spec, minMaxY) {
var errPt = this.errorLog.length ();
var fileDeltaX = JSV.common.Coordinate.deltaX (spec.fileLastX, spec.fileFirstX, spec.nPointsFile);
spec.setIncreasing (fileDeltaX > 0);
spec.setContinuous (true);
var decompressor =  new JSV.source.JDXDecompressor (this.t, spec.fileFirstX, spec.xFactor, spec.yFactor, fileDeltaX, spec.nPointsFile);
var firstLastX =  Clazz.newDoubleArray (2, 0);
var t = System.currentTimeMillis ();
var xyCoords = decompressor.decompressData (this.errorLog, firstLastX);
if (JU.Logger.debugging) JU.Logger.debug ("decompression time = " + (System.currentTimeMillis () - t) + " ms");
spec.setXYCoords (xyCoords);
var d = decompressor.getMinY ();
if (minMaxY != null) {
if (d < minMaxY[0]) minMaxY[0] = d;
d = decompressor.getMaxY ();
if (d > minMaxY[1]) minMaxY[1] = d;
}var freq = (Double.isNaN (spec.freq2dX) ? spec.observedFreq : spec.freq2dX);
var isHz = freq != 1.7976931348623157E308 && spec.getXUnits ().toUpperCase ().equals ("HZ");
if (spec.offset != 1.7976931348623157E308 && freq != 1.7976931348623157E308 && spec.dataType.toUpperCase ().contains ("SPECTRUM") && spec.jcampdx.indexOf ("JEOL") < 0) {
JSV.common.Coordinate.applyShiftReference (xyCoords, spec.dataPointNum, spec.fileFirstX, spec.fileLastX, spec.offset, isHz ? freq : 1, spec.shiftRefType);
}if (isHz) {
JSV.common.Coordinate.applyScale (xyCoords, (1.0 / freq), 1);
spec.setXUnits ("PPM");
spec.setHZtoPPM (true);
}if (this.errorLog.length () != errPt) {
this.errorLog.append (spec.getTitle ()).append ("\n");
this.errorLog.append ("firstX: " + spec.fileFirstX + " Found " + firstLastX[0] + "\n");
this.errorLog.append ("lastX from Header " + spec.fileLastX + " Found " + firstLastX[1] + "\n");
this.errorLog.append ("deltaX from Header " + fileDeltaX + "\n");
this.errorLog.append ("Number of points in Header " + spec.nPointsFile + " Found " + xyCoords.length + "\n");
} else {
}if (JU.Logger.debugging) {
System.err.println (this.errorLog.toString ());
}}, "JSV.source.JDXDataObject,~A");
c$.addHeader = Clazz.defineMethod (c$, "addHeader", 
function (table, label, value) {
var entry;
for (var i = 0; i < table.size (); i++) if ((entry = table.get (i))[0].equals (label)) {
entry[1] = value;
return;
}
table.addLast ( Clazz.newArray (-1, [label, value, JSV.source.JDXSourceStreamTokenizer.cleanLabel (label)]));
}, "JU.Lst,~S,~S");
Clazz.defineMethod (c$, "checkCustomTags", 
 function (spectrum, label, value) {
if (label.length > 10) label = label.substring (0, 10);
if (spectrum == null) System.out.println (label);
 else this.modelSpectrum = spectrum;
var pt = "##$MODELS ##$PEAKS  ##$SIGNALS##$MOLFILE##PEAKASSI##$UVIRASS##$MSFRAGM".indexOf (label);
if (pt < 0) return false;
this.getMpr ().set (this, this.filePath, null);
try {
this.reader =  new java.io.BufferedReader ( new java.io.StringReader (value));
switch (pt) {
case 0:
this.mpr.readModels ();
break;
case 10:
case 20:
this.peakData =  new JU.Lst ();
this.source.peakCount += this.mpr.readPeaks (pt == 20, this.source.peakCount);
break;
case 30:
this.acdAssignments =  new JU.Lst ();
this.acdMolFile = JU.PT.rep (value, "$$ Empty String", "");
break;
case 40:
case 50:
case 60:
this.acdAssignments = this.mpr.readACDAssignments (spectrum.nPointsFile, pt == 40);
break;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.getMessage ());
} else {
throw e;
}
} finally {
this.reader = null;
}
return true;
}, "JSV.common.Spectrum,~S,~S");
Clazz.defineMethod (c$, "getMpr", 
 function () {
return (this.mpr == null ? this.mpr = JSV.common.JSViewer.getInterface ("J.jsv.JDXMOLParser") : this.mpr);
});
Clazz.overrideMethod (c$, "rd", 
function () {
return this.reader.readLine ();
});
Clazz.overrideMethod (c$, "setSpectrumPeaks", 
function (nH, piUnitsX, piUnitsY) {
this.modelSpectrum.setPeakList (this.peakData, piUnitsX, piUnitsY);
if (this.modelSpectrum.isNMR ()) this.modelSpectrum.setNHydrogens (nH);
}, "~N,~S,~S");
Clazz.overrideMethod (c$, "addPeakData", 
function (info) {
if (this.peakData == null) this.peakData =  new JU.Lst ();
this.peakData.addLast ( new JSV.common.PeakInfo (info));
}, "~S");
Clazz.overrideMethod (c$, "processModelData", 
function (id, data, type, base, last, modelScale, vibScale, isFirst) {
}, "~S,~S,~S,~S,~S,~N,~N,~B");
Clazz.overrideMethod (c$, "discardLinesUntilContains", 
function (containsMatch) {
var line;
while ((line = this.rd ()) != null && line.indexOf (containsMatch) < 0) {
}
return line;
}, "~S");
Clazz.overrideMethod (c$, "discardLinesUntilContains2", 
function (s1, s2) {
var line;
while ((line = this.rd ()) != null && line.indexOf (s1) < 0 && line.indexOf (s2) < 0) {
}
return line;
}, "~S,~S");
Clazz.overrideMethod (c$, "discardLinesUntilNonBlank", 
function () {
var line;
while ((line = this.rd ()) != null && line.trim ().length == 0) {
}
return line;
});
Clazz.defineStatics (c$,
"VAR_LIST_TABLE",  Clazz.newArray (-1, ["PEAKTABLE   XYDATA      XYPOINTS", " (XY..XY)    (X++(Y..Y)) (XY..XY)    "]),
"ERROR_SEPARATOR", "=====================\n");
});
