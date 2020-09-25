Clazz.declarePackage ("JSV.common");
Clazz.load (["java.lang.Enum"], "JSV.common.ExportType", null, function () {
c$ = Clazz.declareType (JSV.common, "ExportType", Enum);
c$.getType = Clazz.defineMethod (c$, "getType", 
function (type) {
type = type.toUpperCase ();
if (type.equalsIgnoreCase ("Original...")) return JSV.common.ExportType.SOURCE;
if (type.startsWith ("XML")) return JSV.common.ExportType.AML;
for (var mode, $mode = 0, $$mode = JSV.common.ExportType.values (); $mode < $$mode.length && ((mode = $$mode[$mode]) || true); $mode++) if (mode.name ().equals (type)) return mode;

return JSV.common.ExportType.UNK;
}, "~S");
c$.isExportMode = Clazz.defineMethod (c$, "isExportMode", 
function (ext) {
return (JSV.common.ExportType.getType (ext) !== JSV.common.ExportType.UNK);
}, "~S");
Clazz.defineEnumConstant (c$, "UNK", 0, []);
Clazz.defineEnumConstant (c$, "SOURCE", 1, []);
Clazz.defineEnumConstant (c$, "DIF", 2, []);
Clazz.defineEnumConstant (c$, "FIX", 3, []);
Clazz.defineEnumConstant (c$, "SQZ", 4, []);
Clazz.defineEnumConstant (c$, "PAC", 5, []);
Clazz.defineEnumConstant (c$, "XY", 6, []);
Clazz.defineEnumConstant (c$, "DIFDUP", 7, []);
Clazz.defineEnumConstant (c$, "PNG", 8, []);
Clazz.defineEnumConstant (c$, "JPG", 9, []);
Clazz.defineEnumConstant (c$, "SVG", 10, []);
Clazz.defineEnumConstant (c$, "SVGI", 11, []);
Clazz.defineEnumConstant (c$, "CML", 12, []);
Clazz.defineEnumConstant (c$, "AML", 13, []);
Clazz.defineEnumConstant (c$, "PDF", 14, []);
});
