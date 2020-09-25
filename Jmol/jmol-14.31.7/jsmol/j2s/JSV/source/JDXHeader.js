Clazz.declarePackage ("JSV.source");
Clazz.load (["JU.Lst"], "JSV.source.JDXHeader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.title = "";
this.jcampdx = "5.01";
this.dataType = "";
this.dataClass = "";
this.origin = "";
this.owner = "PUBLIC DOMAIN";
this.longDate = "";
this.date = "";
this.time = "";
this.qualifiedType = null;
this.headerTable = null;
Clazz.instantialize (this, arguments);
}, JSV.source, "JDXHeader");
Clazz.prepareFields (c$, function () {
this.headerTable =  new JU.Lst ();
});
Clazz.defineMethod (c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
Clazz.defineMethod (c$, "setJcampdx", 
function (versionNum) {
this.jcampdx = versionNum;
}, "~S");
Clazz.defineMethod (c$, "setDataType", 
function (dataType) {
this.dataType = dataType;
}, "~S");
Clazz.defineMethod (c$, "setDataClass", 
function (dataClass) {
this.dataClass = dataClass;
}, "~S");
Clazz.defineMethod (c$, "setOrigin", 
function (origin) {
this.origin = origin;
}, "~S");
Clazz.defineMethod (c$, "setOwner", 
function (owner) {
this.owner = owner;
}, "~S");
Clazz.defineMethod (c$, "setLongDate", 
function (longDate) {
this.longDate = longDate;
}, "~S");
Clazz.defineMethod (c$, "setDate", 
function (date) {
this.date = date;
}, "~S");
Clazz.defineMethod (c$, "setTime", 
function (time) {
this.time = time;
}, "~S");
Clazz.defineMethod (c$, "getTitle", 
function () {
return this.title;
});
c$.getTypeName = Clazz.defineMethod (c$, "getTypeName", 
function (type) {
type = type.toUpperCase ();
for (var i = 0; i < JSV.source.JDXHeader.typeNames.length; i++) if (JSV.source.JDXHeader.typeNames[i].startsWith (type)) {
return JSV.source.JDXHeader.typeNames[i].substring (18);
}
return type;
}, "~S");
Clazz.defineMethod (c$, "getQualifiedDataType", 
function () {
return (this.qualifiedType == null ? (this.qualifiedType = JSV.source.JDXHeader.getTypeName (this.dataType)) : this.qualifiedType);
});
Clazz.defineMethod (c$, "getJcampdx", 
function () {
return this.jcampdx;
});
Clazz.defineMethod (c$, "getDataType", 
function () {
return this.dataType;
});
Clazz.defineMethod (c$, "getOrigin", 
function () {
return this.origin;
});
Clazz.defineMethod (c$, "getOwner", 
function () {
return this.owner;
});
Clazz.defineMethod (c$, "getLongDate", 
function () {
return this.longDate;
});
Clazz.defineMethod (c$, "getDate", 
function () {
return this.date;
});
Clazz.defineMethod (c$, "getTime", 
function () {
return this.time;
});
Clazz.defineMethod (c$, "getDataClass", 
function () {
return this.dataClass;
});
Clazz.defineMethod (c$, "setHeaderTable", 
function (table) {
this.headerTable = table;
}, "JU.Lst");
Clazz.defineMethod (c$, "getHeaderTable", 
function () {
return this.headerTable;
});
Clazz.defineMethod (c$, "getHeaderRowDataAsArray", 
function (addDataClass, nMore) {
var rowData =  new Array ((addDataClass ? 6 : 5) + this.headerTable.size () + nMore);
var i = 0;
rowData[i++] =  Clazz.newArray (-1, ["##TITLE", this.title]);
rowData[i++] =  Clazz.newArray (-1, ["##JCAMP-DX", this.jcampdx]);
rowData[i++] =  Clazz.newArray (-1, ["##DATA TYPE", this.dataType]);
if (addDataClass) rowData[i++] =  Clazz.newArray (-1, ["##DATA CLASS", this.dataClass]);
rowData[i++] =  Clazz.newArray (-1, ["##ORIGIN", this.origin]);
rowData[i++] =  Clazz.newArray (-1, ["##OWNER", this.owner]);
for (var j = 0; j < this.headerTable.size (); j++) rowData[i++] = this.getRow (j);

return rowData;
}, "~B,~N");
Clazz.defineMethod (c$, "getRow", 
 function (j) {
var s = this.headerTable.get (j);
{
return [s[0], JU.PT.rep(s[1], "<", "&lt;")];
}}, "~N");
Clazz.defineStatics (c$,
"typeNames",  Clazz.newArray (-1, ["ND NMR SPECTRUM   NMR", "NMR SPECTRUM      NMR", "INFRARED SPECTRUM IR", "MASS SPECTRUM     MS", "RAMAN SPECTRUM    RAMAN", "GAS CHROMATOGRAM  GC", "UV/VIS SPECTRUM   UV/VIS"]));
});
