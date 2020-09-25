Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.PeakInfo", ["JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.xMin = 0;
this.xMax = 0;
this.yMin = 0;
this.yMax = 0;
this.px0 = 0;
this.px1 = 0;
this.stringInfo = null;
this.type = null;
this.type2 = null;
this.index = null;
this.file = null;
this.filePathForwardSlash = null;
this.title = null;
this.model = null;
this.atoms = null;
this.id = null;
this.spectrum = null;
this._match = null;
this.atomKey = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "PeakInfo");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (s) {
this.stringInfo = s;
this.type = JU.PT.getQuotedAttribute (s, "type");
if (this.type == null) this.type = "";
this.type = this.type.toUpperCase ();
var pt = this.type.indexOf ('/');
this.type2 = (pt < 0 ? "" : JSV.common.PeakInfo.fixType (this.type.substring (this.type.indexOf ('/') + 1)));
if (pt >= 0) this.type = JSV.common.PeakInfo.fixType (this.type.substring (0, pt)) + "/" + this.type2;
 else this.type = JSV.common.PeakInfo.fixType (this.type);
this.id = JU.PT.getQuotedAttribute (s, "id");
this.index = JU.PT.getQuotedAttribute (s, "index");
this.file = JU.PT.getQuotedAttribute (s, "file");
System.out.println ("pi file=" + this.file);
this.filePathForwardSlash = (this.file == null ? null : this.file.$replace ('\\', '/'));
this.model = JU.PT.getQuotedAttribute (s, "model");
var isBaseModel = s.contains ("baseModel=\"\"");
if (!isBaseModel) this.atoms = JU.PT.getQuotedAttribute (s, "atoms");
this.atomKey = "," + this.atoms + ",";
this.title = JU.PT.getQuotedAttribute (s, "title");
this._match = JU.PT.getQuotedAttribute (s, "_match");
this.xMax = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "xMax"));
this.xMin = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "xMin"));
this.yMax = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "yMax"));
this.yMin = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "yMin"));
}, "~S");
Clazz.defineMethod (c$, "isClearAll", 
function () {
return (this.spectrum == null);
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getAtoms", 
function () {
return this.atoms;
});
Clazz.defineMethod (c$, "getXMax", 
function () {
return this.xMax;
});
Clazz.defineMethod (c$, "getXMin", 
function () {
return this.xMin;
});
Clazz.defineMethod (c$, "getYMin", 
function () {
return this.yMin;
});
Clazz.defineMethod (c$, "getYMax", 
function () {
return this.yMax;
});
Clazz.defineMethod (c$, "getX", 
function () {
return (this.xMax + this.xMin) / 2;
});
Clazz.defineMethod (c$, "getMatch", 
function () {
return this._match;
});
c$.fixType = Clazz.defineMethod (c$, "fixType", 
 function (type) {
return (type.equals ("HNMR") ? "1HNMR" : type.equals ("CNMR") ? "13CNMR" : type);
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.stringInfo;
});
Clazz.defineMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz.defineMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz.defineMethod (c$, "checkFileIndex", 
function (filePath, sIndex, sAtomKey) {
return (sAtomKey != null ? this.atomKey.indexOf (sAtomKey) >= 0 : sIndex.equals (this.index) && (filePath.equals (this.file) || filePath.equals (this.filePathForwardSlash)));
}, "~S,~S,~S");
Clazz.defineMethod (c$, "checkFileTypeModel", 
function (filePath, type, model) {
return filePath.equals (this.file) && this.checkModel (model) && this.type.endsWith (type);
}, "~S,~S,~S");
Clazz.defineMethod (c$, "checkTypeModel", 
function (type, model) {
return this.checkType (type) && this.checkModel (model);
}, "~S,~S");
Clazz.defineMethod (c$, "checkModel", 
 function (model) {
return (model != null && model.equals (this.model));
}, "~S");
Clazz.defineMethod (c$, "checkType", 
 function (type) {
return (type.endsWith (this.type));
}, "~S");
Clazz.defineMethod (c$, "checkTypeMatch", 
function (pi) {
return (this.checkType (pi.type) && (this.checkId (pi._match) || this.checkModel (pi._match) || this.title.toUpperCase ().indexOf (pi._match) >= 0));
}, "JSV.common.PeakInfo");
Clazz.defineMethod (c$, "checkId", 
 function (match) {
if (match == null) return false;
return (this.id != null && match.toUpperCase ().startsWith ("ID=") && match.substring (3).equals (this.id) || (match = match.toUpperCase ()).startsWith ("INDEX=") && match.equals ("INDEX=" + this.index) || match.startsWith ("#=") && match.equals ("#=" + this.index));
}, "~S");
Clazz.defineMethod (c$, "getModel", 
function () {
return this.model;
});
Clazz.defineMethod (c$, "getFilePath", 
function () {
return this.file;
});
Clazz.defineMethod (c$, "autoSelectOnLoad", 
function () {
return (this.type.startsWith ("GC"));
});
Clazz.defineMethod (c$, "setPixelRange", 
function (x0, x1) {
this.px0 = x0;
this.px1 = x1;
}, "~N,~N");
Clazz.defineMethod (c$, "checkRange", 
function (xPixel, xVal) {
if (xPixel != 2147483647 ? (this.px0 <= xPixel && this.px1 >= xPixel) : xVal >= this.xMin && xVal <= this.xMax) {
return Math.abs (xVal - this.getX ());
}return 1e100;
}, "~N,~N");
Clazz.defineMethod (c$, "getXPixel", 
function () {
return Clazz.doubleToInt ((this.px0 + this.px1) / 2);
});
c$.nullPeakInfo = c$.prototype.nullPeakInfo =  new JSV.common.PeakInfo ();
});
