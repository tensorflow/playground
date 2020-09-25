Clazz.declarePackage ("JSV.export");
Clazz.load (["JSV.export.XMLExporter"], "JSV.export.AMLExporter", null, function () {
c$ = Clazz.declareType (JSV["export"], "AMLExporter", JSV["export"].XMLExporter);
Clazz.overrideMethod (c$, "exportTheSpectrum", 
function (viewer, mode, out, spec, startIndex, endIndex, pd, asBase64) {
if (!this.setup (viewer, spec, out, startIndex, endIndex)) return null;
if (this.solvName == null || this.solvName.equals ("")) this.solvName = "unknown";
if (this.datatype.contains ("MASS")) {
this.spectypeInitials = "MS";
} else if (this.datatype.contains ("INFRARED")) {
this.spectypeInitials = "IR";
} else if (this.datatype.contains ("UV") || (this.datatype.contains ("VIS"))) {
this.spectypeInitials = "UV";
} else if (this.datatype.contains ("NMR")) {
this.spectypeInitials = "NMR";
}this.pathlength = (this.pathlength.equals ("") && this.spectypeInitials.equals ("UV") ? "1.0" : "-1");
if (this.vendor == null || this.vendor.equals ("")) this.vendor = "not available from JCAMP-DX file";
if (this.model == null || this.model.equals ("")) this.model = "not available from JCAMP-DX file";
if (this.resolution == null || this.resolution.equals ("")) this.resolution = "not available in JCAMP-DX file";
this.setContext ();
return this.writeFormType ("animl");
}, "JSV.common.JSViewer,JSV.common.ExportType,JU.OC,JSV.common.Spectrum,~N,~N,JSV.common.PanelData,~B");
});
