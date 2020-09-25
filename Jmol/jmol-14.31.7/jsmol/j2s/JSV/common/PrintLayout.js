Clazz.declarePackage ("JSV.common");
c$ = Clazz.decorateAsClass (function () {
this.imageableX = 0;
this.imageableY = 0;
this.paperHeight = 0;
this.paperWidth = 0;
this.imageableHeight = 0;
this.imageableWidth = 0;
this.layout = "landscape";
this.position = "fit to page";
this.showGrid = true;
this.showXScale = true;
this.showYScale = true;
this.showTitle = true;
this.font = "Helvetica";
this.paper = null;
this.asPDF = true;
this.title = null;
this.date = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "PrintLayout");
Clazz.prepareFields (c$, function () {
this.paperHeight = Clazz.floatToInt (Math.min (11, 11.69) * 72);
this.paperWidth = Clazz.floatToInt (Math.min (8.5, 8.27) * 72);
this.imageableHeight = this.paperHeight;
this.imageableWidth = this.paperWidth;
});
Clazz.makeConstructor (c$, 
function (pd) {
if (pd != null) {
this.asPDF = true;
pd.setDefaultPrintOptions (this);
}}, "JSV.common.PanelData");
