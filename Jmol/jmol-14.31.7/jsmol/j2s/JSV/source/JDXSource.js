Clazz.declarePackage ("JSV.source");
Clazz.load (["JSV.source.JDXHeader"], "JSV.source.JDXSource", ["JU.Lst"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = 0;
this.isCompoundSource = false;
this.jdxSpectra = null;
this.errors = "";
this.filePath = null;
this.peakCount = 0;
this.isView = false;
this.inlineData = null;
Clazz.instantialize (this, arguments);
}, JSV.source, "JDXSource", JSV.source.JDXHeader);
Clazz.defineMethod (c$, "dispose", 
function () {
this.headerTable = null;
this.jdxSpectra = null;
});
Clazz.makeConstructor (c$, 
function (type, filePath) {
Clazz.superConstructor (this, JSV.source.JDXSource, []);
this.type = type;
this.setFilePath (filePath);
this.headerTable =  new JU.Lst ();
this.jdxSpectra =  new JU.Lst ();
this.isCompoundSource = (type != 0);
}, "~N,~S");
Clazz.defineMethod (c$, "getJDXSpectrum", 
function (index) {
return (this.jdxSpectra.size () <= index ? null : this.jdxSpectra.get (index));
}, "~N");
Clazz.defineMethod (c$, "addJDXSpectrum", 
function (filePath, spectrum, forceSub) {
if (filePath == null) filePath = this.filePath;
spectrum.setFilePath (filePath);
if (this.inlineData != null) spectrum.setInlineData (this.inlineData);
var n = this.jdxSpectra.size ();
if (n == 0 || !this.jdxSpectra.get (n - 1).addSubSpectrum (spectrum, forceSub)) this.jdxSpectra.addLast (spectrum);
}, "~S,JSV.common.Spectrum,~B");
Clazz.defineMethod (c$, "getNumberOfSpectra", 
function () {
return this.jdxSpectra.size ();
});
Clazz.defineMethod (c$, "getSpectra", 
function () {
return this.jdxSpectra;
});
Clazz.defineMethod (c$, "getSpectraAsArray", 
function () {
return (this.jdxSpectra == null ? null : this.jdxSpectra.toArray ());
});
Clazz.defineMethod (c$, "getErrorLog", 
function () {
return this.errors;
});
Clazz.defineMethod (c$, "setErrorLog", 
function (errors) {
this.errors = errors;
}, "~S");
Clazz.defineMethod (c$, "setFilePath", 
function (filePath) {
this.filePath = filePath;
}, "~S");
Clazz.defineMethod (c$, "getFilePath", 
function () {
return this.filePath;
});
c$.createView = Clazz.defineMethod (c$, "createView", 
function (specs) {
var source =  new JSV.source.JDXSource (-2, "view");
source.isView = true;
for (var i = 0; i < specs.size (); i++) source.addJDXSpectrum (specs.get (i).getFilePath (), specs.get (i), false);

return source;
}, "JU.Lst");
Clazz.defineMethod (c$, "getHeaderRowDataAsArray", 
function (addDataClass, rowData) {
if (rowData == null) rowData =  Clazz.newArray (0, 0, null);
var data = this.getHeaderRowDataAsArray (addDataClass, rowData.length);
for (var i = rowData.length; --i >= 0; ) data[data.length - rowData.length + i] = rowData[i];

return data;
}, "~B,~A");
Clazz.defineMethod (c$, "setID", 
function (id) {
this.jdxSpectra.get (0).sourceID = id;
}, "~S");
Clazz.defineMethod (c$, "matchesFilePath", 
function (filePath) {
return this.filePath.equals (filePath) || this.filePath.$replace ('\\', '/').equals (filePath);
}, "~S");
Clazz.defineMethod (c$, "setInlineData", 
function (data) {
this.inlineData = data;
if (this.jdxSpectra != null) for (var i = this.jdxSpectra.size (); --i >= 0; ) this.jdxSpectra.get (i).setInlineData (data);

}, "~S");
Clazz.defineStatics (c$,
"TYPE_VIEW", -2,
"TYPE_UNKNOWN", -1,
"TYPE_SIMPLE", 0,
"TYPE_BLOCK", 1,
"TYPE_NTUPLE", 2);
});
