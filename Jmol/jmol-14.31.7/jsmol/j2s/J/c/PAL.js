Clazz.declarePackage ("J.c");
Clazz.load (["java.lang.Enum"], "J.c.PAL", ["java.lang.Byte"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$$name = null;
this.id = 0;
Clazz.instantialize (this, arguments);
}, J.c, "PAL", Enum);
Clazz.makeConstructor (c$, 
 function (name, id) {
this.$$name = name;
this.id = id;
}, "~S,~N");
c$.pidOf = Clazz.defineMethod (c$, "pidOf", 
function (value) {
return (Clazz.instanceOf (value, J.c.PAL) ? (value).id : Clazz.instanceOf (value, Byte) ? (value).byteValue () : J.c.PAL.UNKNOWN.id);
}, "~O");
c$.isPaletteVariable = Clazz.defineMethod (c$, "isPaletteVariable", 
function (pid) {
return ((pid & 64) != 0);
}, "~N");
c$.getPalette = Clazz.defineMethod (c$, "getPalette", 
function (paletteName) {
if (paletteName.indexOf ('_') < 0) for (var item, $item = 0, $$item = J.c.PAL.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) if (paletteName.equalsIgnoreCase (item.$$name)) return item;

return (paletteName.indexOf ("property_") == 0 ? J.c.PAL.PROPERTY : J.c.PAL.UNKNOWN);
}, "~S");
c$.getPaletteID = Clazz.defineMethod (c$, "getPaletteID", 
function (paletteName) {
if (paletteName.indexOf ('_') < 0) for (var item, $item = 0, $$item = J.c.PAL.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) if (paletteName.equalsIgnoreCase (item.$$name)) return item.id;

return (paletteName.indexOf ("property_") == 0 ? J.c.PAL.PROPERTY.id : J.c.PAL.UNKNOWN.id);
}, "~S");
c$.getPaletteName = Clazz.defineMethod (c$, "getPaletteName", 
function (pid) {
for (var item, $item = 0, $$item = J.c.PAL.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) if (item.id == pid) return item.$$name;

return null;
}, "~N");
c$.PALETTE_VOLATILE = 0x40;
c$.PALETTE_NONE = 0;
c$.PALETTE_CPK = 1;
c$.PALETTE_PARTIAL_CHARGE = 2;
c$.PALETTE_FORMAL_CHARGE = 3;
c$.PALETTE_TEMP = 68;
c$.PALETTE_FIXEDTEMP = 5;
c$.PALETTE_SURFACE = 70;
c$.PALETTE_STRUCTURE = 7;
c$.PALETTE_AMINO = 8;
c$.PALETTE_SHAPELY = 9;
c$.PALETTE_CHAIN = 10;
c$.PALETTE_GROUP = 75;
c$.PALETTE_MONOMER = 76;
c$.PALETTE_MOLECULE = 77;
c$.PALETTE_ALTLOC = 14;
c$.PALETTE_INSERTION = 15;
c$.PALETTE_JMOL = 16;
c$.PALETTE_RASMOL = 17;
c$.PALETTE_TYPE = 18;
c$.PALETTE_ENERGY = 19;
c$.PALETTE_PROPERTY = 84;
c$.PALETTE_VARIABLE = 85;
c$.PALETTE_STRAIGHTNESS = 86;
c$.PALETTE_POLYMER = 87;
c$.PALETTE_NUCLEIC = 24;
c$.argbsCpkRasmol =  Clazz.newIntArray (-1, [16716947, 33554431, 50315467, 62005794, 83951360, 113821896, 126849023, 149946368, 165324064, 184549631, 203590434, 226525328, 249210144, 268412160, 285198386, 285277952, 343965840, 377520272, 411074704, 427851920, 452961536, 480586282, 497363498, 514140714, 598026794, 796950672, 899686640, 956278016, 1339729184]);
c$.argbsCpk =  Clazz.newIntArray (-1, [0xFFFF1493, 0xFFFFFFFF, 0xFFD9FFFF, 0xFFCC80FF, 0xFFC2FF00, 0xFFFFB5B5, 0xFF909090, 0xFF3050F8, 0xFFFF0D0D, 0xFF90E050, 0xFFB3E3F5, 0xFFAB5CF2, 0xFF8AFF00, 0xFFBFA6A6, 0xFFF0C8A0, 0xFFFF8000, 0xFFFFFF30, 0xFF1FF01F, 0xFF80D1E3, 0xFF8F40D4, 0xFF3DFF00, 0xFFE6E6E6, 0xFFBFC2C7, 0xFFA6A6AB, 0xFF8A99C7, 0xFF9C7AC7, 0xFFE06633, 0xFFF090A0, 0xFF50D050, 0xFFC88033, 0xFF7D80B0, 0xFFC28F8F, 0xFF668F8F, 0xFFBD80E3, 0xFFFFA100, 0xFFA62929, 0xFF5CB8D1, 0xFF702EB0, 0xFF00FF00, 0xFF94FFFF, 0xFF94E0E0, 0xFF73C2C9, 0xFF54B5B5, 0xFF3B9E9E, 0xFF248F8F, 0xFF0A7D8C, 0xFF006985, 0xFFC0C0C0, 0xFFFFD98F, 0xFFA67573, 0xFF668080, 0xFF9E63B5, 0xFFD47A00, 0xFF940094, 0xFF429EB0, 0xFF57178F, 0xFF00C900, 0xFF70D4FF, 0xFFFFFFC7, 0xFFD9FFC7, 0xFFC7FFC7, 0xFFA3FFC7, 0xFF8FFFC7, 0xFF61FFC7, 0xFF45FFC7, 0xFF30FFC7, 0xFF1FFFC7, 0xFF00FF9C, 0xFF00E675, 0xFF00D452, 0xFF00BF38, 0xFF00AB24, 0xFF4DC2FF, 0xFF4DA6FF, 0xFF2194D6, 0xFF267DAB, 0xFF266696, 0xFF175487, 0xFFD0D0E0, 0xFFFFD123, 0xFFB8B8D0, 0xFFA6544D, 0xFF575961, 0xFF9E4FB5, 0xFFAB5C00, 0xFF754F45, 0xFF428296, 0xFF420066, 0xFF007D00, 0xFF70ABFA, 0xFF00BAFF, 0xFF00A1FF, 0xFF008FFF, 0xFF0080FF, 0xFF006BFF, 0xFF545CF2, 0xFF785CE3, 0xFF8A4FE3, 0xFFA136D4, 0xFFB31FD4, 0xFFB31FBA, 0xFFB30DA6, 0xFFBD0D87, 0xFFC70066, 0xFFCC0059, 0xFFD1004F, 0xFFD90045, 0xFFE00038, 0xFFE6002E, 0xFFEB0026]);
Clazz.defineEnumConstant (c$, "UNKNOWN", 0, [null, 0xFF]);
Clazz.defineEnumConstant (c$, "NONE", 1, ["none", 0]);
Clazz.defineEnumConstant (c$, "CPK", 2, ["cpk", 1]);
Clazz.defineEnumConstant (c$, "PARTIAL_CHARGE", 3, ["partialcharge", 2]);
Clazz.defineEnumConstant (c$, "FORMAL_CHARGE", 4, ["formalcharge", 3]);
Clazz.defineEnumConstant (c$, "TEMP", 5, ["temperature", 68]);
Clazz.defineEnumConstant (c$, "FIXEDTEMP", 6, ["fixedtemperature", 5]);
Clazz.defineEnumConstant (c$, "SURFACE", 7, ["surfacedistance", 70]);
Clazz.defineEnumConstant (c$, "STRUCTURE", 8, ["structure", 7]);
Clazz.defineEnumConstant (c$, "AMINO", 9, ["amino", 8]);
Clazz.defineEnumConstant (c$, "SHAPELY", 10, ["shapely", 9]);
Clazz.defineEnumConstant (c$, "CHAIN", 11, ["chain", 10]);
Clazz.defineEnumConstant (c$, "GROUP", 12, ["group", 75]);
Clazz.defineEnumConstant (c$, "MONOMER", 13, ["monomer", 76]);
Clazz.defineEnumConstant (c$, "MOLECULE", 14, ["molecule", 77]);
Clazz.defineEnumConstant (c$, "ALTLOC", 15, ["altloc", 14]);
Clazz.defineEnumConstant (c$, "INSERTION", 16, ["insertion", 15]);
Clazz.defineEnumConstant (c$, "JMOL", 17, ["jmol", 16]);
Clazz.defineEnumConstant (c$, "RASMOL", 18, ["rasmol", 17]);
Clazz.defineEnumConstant (c$, "TYPE", 19, ["type", 18]);
Clazz.defineEnumConstant (c$, "ENERGY", 20, ["energy", 19]);
Clazz.defineEnumConstant (c$, "PROPERTY", 21, ["property", 84]);
Clazz.defineEnumConstant (c$, "VARIABLE", 22, ["variable", 85]);
Clazz.defineEnumConstant (c$, "STRAIGHTNESS", 23, ["straightness", 86]);
Clazz.defineEnumConstant (c$, "POLYMER", 24, ["polymer", 87]);
Clazz.defineEnumConstant (c$, "NUCLEIC", 25, ["nucleic", 24]);
});
