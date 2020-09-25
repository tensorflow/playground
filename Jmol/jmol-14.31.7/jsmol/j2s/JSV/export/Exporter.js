Clazz.declarePackage ("JSV.export");
Clazz.load (["JSV.api.ExportInterface"], "JSV.export.Exporter", ["JU.OC", "$.PT", "JSV.common.ExportType", "$.JSVFileManager", "$.JSViewer"], function () {
c$ = Clazz.declareType (JSV["export"], "Exporter", null, JSV.api.ExportInterface);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "write", 
function (viewer, tokens, forInkscape) {
if (tokens == null) return this.printPDF (viewer, null, false);
var type = null;
var fileName = null;
var eType;
var out;
var jsvp = viewer.selectedPanel;
try {
switch (tokens.size ()) {
default:
return "WRITE what?";
case 1:
fileName = JU.PT.trimQuotes (tokens.get (0));
if (fileName.indexOf (".") >= 0) type = "XY";
if (jsvp == null) return null;
eType = JSV.common.ExportType.getType (fileName);
switch (eType) {
case JSV.common.ExportType.PDF:
case JSV.common.ExportType.PNG:
case JSV.common.ExportType.JPG:
return this.exportTheSpectrum (viewer, eType, null, null, -1, -1, null, false);
default:
viewer.fileHelper.setFileChooser (eType);
var items = this.getExportableItems (viewer, eType.equals (JSV.common.ExportType.SOURCE));
var index = (items == null ? -1 : viewer.getOptionFromDialog (items, "Export", "Choose a spectrum to export"));
if (index == -2147483648) return null;
var file = viewer.fileHelper.getFile (this.getSuggestedFileName (viewer, eType), jsvp, true);
if (file == null) return null;
out = viewer.getOutputChannel (file.getFullPath (), false);
var msg = this.exportSpectrumOrImage (viewer, eType, index, out);
var isOK = msg.startsWith ("OK");
if (isOK) viewer.si.siUpdateRecentMenus (file.getFullPath ());
return msg;
}
case 2:
type = tokens.get (0).toUpperCase ();
fileName = JU.PT.trimQuotes (tokens.get (1));
break;
}
var ext = fileName.substring (fileName.lastIndexOf (".") + 1).toUpperCase ();
if (ext.equals ("BASE64")) {
fileName = ";base64,";
} else if (ext.equals ("JDX")) {
if (type == null) type = "XY";
} else if (JSV.common.ExportType.isExportMode (ext)) {
type = ext;
} else if (JSV.common.ExportType.isExportMode (type)) {
fileName += "." + type;
}eType = JSV.common.ExportType.getType (type);
if (forInkscape && eType === JSV.common.ExportType.SVG) eType = JSV.common.ExportType.SVGI;
out = viewer.getOutputChannel (fileName, false);
return this.exportSpectrumOrImage (viewer, eType, -1, out);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e);
return null;
} else {
throw e;
}
}
}, "JSV.common.JSViewer,JU.Lst,~B");
Clazz.defineMethod (c$, "exportSpectrumOrImage", 
 function (viewer, eType, index, out) {
var spec;
var pd = viewer.pd ();
if (index < 0 && (index = pd.getCurrentSpectrumIndex ()) < 0) return "Error exporting spectrum: No spectrum selected";
spec = pd.getSpectrumAt (index);
var startIndex = pd.getStartingPointIndex (index);
var endIndex = pd.getEndingPointIndex (index);
var msg = null;
try {
var asBase64 = out.isBase64 ();
msg = this.exportTheSpectrum (viewer, eType, out, spec, startIndex, endIndex, pd, asBase64);
if (asBase64) return msg;
if (msg.startsWith ("OK")) return "OK - Exported " + eType.name () + ": " + out.getFileName () + msg.substring (2);
} catch (ioe) {
if (Clazz.exceptionOf (ioe, Exception)) {
msg = ioe.toString ();
} else {
throw ioe;
}
}
return "Error exporting " + out.getFileName () + ": " + msg;
}, "JSV.common.JSViewer,JSV.common.ExportType,~N,JU.OC");
Clazz.defineMethod (c$, "exportTheSpectrum", 
function (viewer, mode, out, spec, startIndex, endIndex, pd, asBase64) {
var jsvp = viewer.selectedPanel;
var type = mode.name ();
switch (mode) {
case JSV.common.ExportType.AML:
case JSV.common.ExportType.CML:
case JSV.common.ExportType.SVG:
case JSV.common.ExportType.SVGI:
break;
case JSV.common.ExportType.DIF:
case JSV.common.ExportType.DIFDUP:
case JSV.common.ExportType.FIX:
case JSV.common.ExportType.PAC:
case JSV.common.ExportType.SQZ:
case JSV.common.ExportType.XY:
type = "JDX";
break;
case JSV.common.ExportType.JPG:
case JSV.common.ExportType.PNG:
if (jsvp == null) return null;
viewer.fileHelper.setFileChooser (mode);
var name = this.getSuggestedFileName (viewer, mode);
var file = viewer.fileHelper.getFile (name, jsvp, true);
if (file == null) return null;
return jsvp.saveImage (type.toLowerCase (), file, out);
case JSV.common.ExportType.PDF:
return this.printPDF (viewer, "PDF", asBase64);
case JSV.common.ExportType.SOURCE:
if (jsvp == null) return null;
var data = jsvp.getPanelData ().getSpectrum ().getInlineData ();
if (data != null) {
out.append (data);
out.closeChannel ();
return "OK " + out.getByteCount () + " bytes";
}var path = jsvp.getPanelData ().getSpectrum ().getFilePath ();
return JSV["export"].Exporter.fileCopy (path, out);
case JSV.common.ExportType.UNK:
return null;
}
return (JSV.common.JSViewer.getInterface ("JSV.export." + type.toUpperCase () + "Exporter")).exportTheSpectrum (viewer, mode, out, spec, startIndex, endIndex, null, false);
}, "JSV.common.JSViewer,JSV.common.ExportType,JU.OC,JSV.common.Spectrum,~N,~N,JSV.common.PanelData,~B");
Clazz.defineMethod (c$, "printPDF", 
 function (viewer, pdfFileName, isBase64) {
var isJob = (pdfFileName == null || pdfFileName.length == 0);
if (!isBase64 && !viewer.si.isSigned ()) return "Error: Applet must be signed for the PRINT command.";
var pd = viewer.pd ();
if (pd == null) return null;
var useDialog = false;
var pl;
{
useDialog = false;
}pl = viewer.getDialogPrint (isJob);
if (pl == null) return null;
if (!useDialog) pl.asPDF = true;
if (isJob && pl.asPDF) {
isJob = false;
pdfFileName = "PDF";
}var jsvp = viewer.selectedPanel;
if (!isBase64 && !isJob) {
var helper = viewer.fileHelper;
helper.setFileChooser (JSV.common.ExportType.PDF);
if (pdfFileName.equals ("?") || pdfFileName.equalsIgnoreCase ("PDF")) pdfFileName = this.getSuggestedFileName (viewer, JSV.common.ExportType.PDF);
var file = helper.getFile (pdfFileName, jsvp, true);
if (file == null) return null;
if (!JSV.common.JSViewer.isJS) viewer.setProperty ("directoryLastExportedFile", helper.setDirLastExported (file.getParentAsFile ().getFullPath ()));
pdfFileName = file.getFullPath ();
}var s = null;
try {
var out = (isJob ? null : isBase64 ?  new JU.OC ().setParams (null, ";base64,", false, null) : viewer.getOutputChannel (pdfFileName, true));
var printJobTitle = pd.getPrintJobTitle (true);
if (pl.showTitle) {
printJobTitle = jsvp.getInput ("Title?", "Title for Printing", printJobTitle);
if (printJobTitle == null) return null;
}jsvp.printPanel (pl, out, printJobTitle);
s = out.toString ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
jsvp.showMessage (e.toString (), "File Error");
} else {
throw e;
}
}
return s;
}, "JSV.common.JSViewer,~S,~B");
Clazz.defineMethod (c$, "getExportableItems", 
 function (viewer, isSameType) {
var pd = viewer.pd ();
var isView = viewer.currentSource.isView;
var nSpectra = pd.getNumberOfSpectraInCurrentSet ();
if (nSpectra == 1 || !isView && isSameType || pd.getCurrentSpectrumIndex () >= 0) return null;
var items =  new Array (nSpectra);
for (var i = 0; i < nSpectra; i++) items[i] = pd.getSpectrumAt (i).getTitle ();

return items;
}, "JSV.common.JSViewer,~B");
Clazz.defineMethod (c$, "getSuggestedFileName", 
 function (viewer, imode) {
var pd = viewer.pd ();
var sourcePath = pd.getSpectrum ().getFilePath ();
var newName = JSV.common.JSVFileManager.getTagName (sourcePath);
if (newName.startsWith ("$")) newName = newName.substring (1);
var pt = newName.lastIndexOf (".");
var name = (pt < 0 ? newName : newName.substring (0, pt));
var ext = ".jdx";
var isPrint = false;
switch (imode) {
case JSV.common.ExportType.XY:
case JSV.common.ExportType.FIX:
case JSV.common.ExportType.PAC:
case JSV.common.ExportType.SQZ:
case JSV.common.ExportType.DIF:
case JSV.common.ExportType.DIFDUP:
case JSV.common.ExportType.SOURCE:
if (!(name.endsWith ("_" + imode))) name += "_" + imode;
ext = ".jdx";
break;
case JSV.common.ExportType.AML:
ext = ".xml";
break;
case JSV.common.ExportType.JPG:
case JSV.common.ExportType.PNG:
case JSV.common.ExportType.PDF:
isPrint = true;
default:
ext = "." + imode.toString ().toLowerCase ();
}
if (viewer.currentSource.isView) name = pd.getPrintJobTitle (isPrint);
name += ext;
return name;
}, "JSV.common.JSViewer,JSV.common.ExportType");
c$.fileCopy = Clazz.defineMethod (c$, "fileCopy", 
 function (name, out) {
try {
var br = JSV.common.JSVFileManager.getBufferedReaderFromName (name, null);
var line = null;
while ((line = br.readLine ()) != null) {
out.append (line);
out.append (JSV["export"].Exporter.newLine);
}
out.closeChannel ();
return "OK " + out.getByteCount () + " bytes";
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return e.toString ();
} else {
throw e;
}
}
}, "~S,JU.OC");
c$.newLine = c$.prototype.newLine = System.getProperty ("line.separator");
});
