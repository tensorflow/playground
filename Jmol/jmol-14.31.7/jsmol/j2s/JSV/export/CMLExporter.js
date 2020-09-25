Clazz.declarePackage ("JSV.export");
Clazz.load (["JSV.export.XMLExporter"], "JSV.export.CMLExporter", null, function () {
c$ = Clazz.declareType (JSV["export"], "CMLExporter", JSV["export"].XMLExporter);
Clazz.overrideMethod (c$, "exportTheSpectrum", 
function (viewer, mode, out, spec, startIndex, endIndex, pd, asBase64) {
if (!this.setup (viewer, spec, out, startIndex, endIndex)) return null;
if (this.model == null || this.model.equals ("")) this.model = "unknown";
if (this.datatype.contains ("MASS")) this.spectypeInitials = "massSpectrum";
 else if (this.datatype.contains ("INFRARED")) {
this.spectypeInitials = "infrared";
} else if (this.datatype.contains ("UV") || (this.datatype.contains ("VIS"))) {
this.spectypeInitials = "UV/VIS";
} else if (this.datatype.contains ("NMR")) {
this.spectypeInitials = "NMR";
}this.ident = this.spectypeInitials + "_" + this.title.substring (0, Math.min (10, this.title.length));
if (this.xUnits.toLowerCase ().equals ("m/z")) this.xUnits = "moverz";
 else if (this.xUnits.toLowerCase ().equals ("1/cm")) this.xUnits = "cm-1";
 else if (this.xUnits.toLowerCase ().equals ("nanometers")) this.xUnits = "nm";
this.setContext ();
return this.writeFormType ("cml");
}, "JSV.common.JSViewer,JSV.common.ExportType,JU.OC,JSV.common.Spectrum,~N,~N,JSV.common.PanelData,~B");
});
